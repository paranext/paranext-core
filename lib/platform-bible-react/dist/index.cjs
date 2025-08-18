"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),s=require("react"),at=require("cmdk"),x=require("lucide-react"),Ro=require("clsx"),To=require("tailwind-merge"),Mo=require("@radix-ui/react-dialog"),f=require("platform-bible-utils"),zt=require("@radix-ui/react-slot"),jt=require("class-variance-authority"),Eo=require("@radix-ui/react-popover"),Do=require("@radix-ui/react-label"),Vo=require("@radix-ui/react-radio-group"),et=require("@tanstack/react-table"),Cn=require("@radix-ui/react-dropdown-menu"),Io=require("@radix-ui/react-select"),Oo=require("markdown-to-jsx"),Po=require("@radix-ui/react-checkbox"),Ao=require("@radix-ui/react-toggle-group"),zo=require("@radix-ui/react-toggle"),Lo=require("@radix-ui/react-separator"),Bo=require("@radix-ui/react-tooltip"),Fo=require("@radix-ui/react-tabs"),Go=require("@radix-ui/react-menubar"),$o=require("react-hotkeys-hook"),Xo=require("@radix-ui/react-avatar"),Ko=require("@radix-ui/react-context-menu"),lt=require("vaul"),Ho=require("@radix-ui/react-progress"),Sn=require("sonner"),qo=require("@radix-ui/react-slider"),Uo=require("@radix-ui/react-switch");function W(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const ut=W(Mo),Qt=W(Eo),_n=W(Do),te=W(Vo),L=W(Cn),X=W(Io),Pe=W(Po),be=W(Ao),Rn=W(zo),Tn=W(Lo),oe=W(Bo),st=W(Fo),B=W(Go),Lt=W(Xo),F=W(Ko),Ae=W(Ho),Wt=W(qo),ze=W(Uo),Yo=To.extendTailwindMerge({prefix:"tw-"});function c(...t){return Yo(Ro.clsx(t))}const Jo="layoutDirection";function Z(){const t=localStorage.getItem(Jo);return t==="rtl"?t:"ltr"}const Wo=ut.Portal,Mn=s.forwardRef(({className:t,...e},r)=>n.jsx(ut.Overlay,{ref:r,className:c("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...e}));Mn.displayName=ut.Overlay.displayName;const Zo=s.forwardRef(({className:t,children:e,...r},o)=>{const a=Z();return n.jsxs(Wo,{children:[n.jsx(Mn,{}),n.jsxs(ut.Content,{ref:o,className:c("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:a,children:[e,n.jsxs(ut.Close,{className:c("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":a==="ltr"},{"tw-left-4":a==="rtl"}),children:[n.jsx(x.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Zo.displayName=ut.Content.displayName;const Qo=s.forwardRef(({className:t,...e},r)=>n.jsx(ut.Title,{ref:r,className:c("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Qo.displayName=ut.Title.displayName;const ta=s.forwardRef(({className:t,...e},r)=>n.jsx(ut.Description,{ref:r,className:c("tw-text-sm tw-text-muted-foreground",t),...e}));ta.displayName=ut.Description.displayName;const Bt=s.forwardRef(({className:t,...e},r)=>n.jsx(at.Command,{ref:r,className:c("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));Bt.displayName=at.Command.displayName;const Ft=s.forwardRef(({className:t,...e},r)=>{const o=Z();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(x.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(at.Command.Input,{ref:r,className:c("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});Ft.displayName=at.Command.Input.displayName;const Gt=s.forwardRef(({className:t,...e},r)=>n.jsx(at.Command.List,{ref:r,className:c("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));Gt.displayName=at.Command.List.displayName;const ae=s.forwardRef((t,e)=>n.jsx(at.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));ae.displayName=at.Command.Empty.displayName;const Tt=s.forwardRef(({className:t,...e},r)=>n.jsx(at.Command.Group,{ref:r,className:c("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));Tt.displayName=at.Command.Group.displayName;const En=s.forwardRef(({className:t,...e},r)=>n.jsx(at.Command.Separator,{ref:r,className:c("tw--mx-1 tw-h-px tw-bg-border",t),...e}));En.displayName=at.Command.Separator.displayName;const It=s.forwardRef(({className:t,...e},r)=>n.jsx(at.Command.Item,{ref:r,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));It.displayName=at.Command.Item.displayName;var ea=Object.defineProperty,na=(t,e,r)=>e in t?ea(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,M=(t,e,r)=>na(t,typeof e!="symbol"?e+"":e,r);const Mt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Ge=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Dn=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],gn=pa();function $t(t,e=!0){return e&&(t=t.toUpperCase()),t in gn?gn[t]:0}function $e(t){return $t(t)>0}function ra(t){const e=typeof t=="string"?$t(t):t;return e>=40&&e<=66}function oa(t){return(typeof t=="string"?$t(t):t)<=39}function Vn(t){return t<=66}function aa(t){const e=typeof t=="string"?$t(t):t;return Pn(e)&&!Vn(e)}function*sa(){for(let t=1;t<=Mt.length;t++)yield t}const ia=1,In=Mt.length;function wa(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Xe(t,e="***"){const r=t-1;return r<0||r>=Mt.length?e:Mt[r]}function On(t){return t<=0||t>In?"******":Dn[t-1]}function la(t){return On($t(t))}function Pn(t){const e=typeof t=="number"?Xe(t):t;return $e(e)&&!Ge.includes(e)}function ca(t){const e=typeof t=="number"?Xe(t):t;return $e(e)&&Ge.includes(e)}function da(t){return Dn[t-1].includes("*obsolete*")}function pa(){const t={};for(let e=0;e<Mt.length;e++)t[Mt[e]]=e+1;return t}const O={allBookIds:Mt,nonCanonicalIds:Ge,bookIdToNumber:$t,isBookIdValid:$e,isBookNT:ra,isBookOT:oa,isBookOTNT:Vn,isBookDC:aa,allBookNumbers:sa,firstBook:ia,lastBook:In,extraBooks:wa,bookNumberToId:Xe,bookNumberToEnglishName:On,bookIdToEnglishName:la,isCanonical:Pn,isExtraMaterial:ca,isObsolete:da};var dt=(t=>(t[t.Unknown=0]="Unknown",t[t.Original=1]="Original",t[t.Septuagint=2]="Septuagint",t[t.Vulgate=3]="Vulgate",t[t.English=4]="English",t[t.RussianProtestant=5]="RussianProtestant",t[t.RussianOrthodox=6]="RussianOrthodox",t))(dt||{});const it=class{constructor(e){if(M(this,"name"),M(this,"fullPath"),M(this,"isPresent"),M(this,"hasVerseSegments"),M(this,"isCustomized"),M(this,"baseVersification"),M(this,"scriptureBooks"),M(this,"_type"),e==null)throw new Error("Argument undefined");typeof e=="string"?(this.name=e,this._type=dt[e]):(this._type=e,this.name=dt[e])}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};M(it,"Original",new it(dt.Original)),M(it,"Septuagint",new it(dt.Septuagint)),M(it,"Vulgate",new it(dt.Vulgate)),M(it,"English",new it(dt.English)),M(it,"RussianProtestant",new it(dt.RussianProtestant)),M(it,"RussianOrthodox",new it(dt.RussianOrthodox));let St=it;function bn(t,e){const r=e[0];for(let o=1;o<e.length;o++)t=t.split(e[o]).join(r);return t.split(r)}var An=(t=>(t[t.Valid=0]="Valid",t[t.UnknownVersification=1]="UnknownVersification",t[t.OutOfRange=2]="OutOfRange",t[t.VerseOutOfOrder=3]="VerseOutOfOrder",t[t.VerseRepeated=4]="VerseRepeated",t))(An||{});const ot=class E{constructor(e,r,o,a){if(M(this,"firstChapter"),M(this,"lastChapter"),M(this,"lastVerse"),M(this,"hasSegmentsDefined"),M(this,"text"),M(this,"BBBCCCVVVS"),M(this,"longHashCode"),M(this,"versification"),M(this,"rtlMark","‏"),M(this,"_bookNum",0),M(this,"_chapterNum",0),M(this,"_verseNum",0),M(this,"_verse"),o==null&&a==null)if(e!=null&&typeof e=="string"){const i=e,w=r!=null&&r instanceof St?r:void 0;this.setEmpty(w),this.parse(i)}else if(e!=null&&typeof e=="number"){const i=r!=null&&r instanceof St?r:void 0;this.setEmpty(i),this._verseNum=e%E.chapterDigitShifter,this._chapterNum=Math.floor(e%E.bookDigitShifter/E.chapterDigitShifter),this._bookNum=Math.floor(e/E.bookDigitShifter)}else if(r==null)if(e!=null&&e instanceof E){const i=e;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(e==null)return;const i=e instanceof St?e:E.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(e!=null&&r!=null&&o!=null)if(typeof e=="string"&&typeof r=="string"&&typeof o=="string")this.setEmpty(a),this.updateInternal(e,r,o);else if(typeof e=="number"&&typeof r=="number"&&typeof o=="number")this._bookNum=e,this._chapterNum=r,this._verseNum=o,this.versification=a??E.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(e){return e.length>0&&"0123456789".includes(e[0])&&!e.endsWith(this.verseRangeSeparator)&&!e.endsWith(this.verseSequenceIndicator)}static tryParse(e){let r;try{return r=new E(e),{success:!0,verseRef:r}}catch(o){if(o instanceof Yt)return r=new E,{success:!1,verseRef:r};throw o}}static getBBBCCCVVV(e,r,o){return e%E.bcvMaxValue*E.bookDigitShifter+(r>=0?r%E.bcvMaxValue*E.chapterDigitShifter:0)+(o>=0?o%E.bcvMaxValue:0)}static fromJSON(e){const{book:r,chapterNum:o,verseNum:a,verse:i,versificationStr:w}=e,l=i||a.toString();let p;return w&&(p=new St(w)),r?new E(r,o.toString(),l,p):new E}static tryGetVerseNum(e){let r;if(!e)return r=-1,{success:!0,vNum:r};r=0;let o;for(let a=0;a<e.length;a++){if(o=e[a],o<"0"||o>"9")return a===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +o-0,r>E.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(E.verseRangeSeparator)||this._verse.includes(E.verseSequenceIndicator))}get book(){return O.bookNumberToId(this.bookNum,"")}set book(e){this.bookNum=O.bookIdToNumber(e)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(e){const r=+e;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(e){const{success:r,vNum:o}=E.tryGetVerseNum(e);this._verse=r?void 0:e.replace(this.rtlMark,""),this._verseNum=o,!(this._verseNum>=0)&&({vNum:this._verseNum}=E.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(e){if(e<=0||e>O.lastBook)throw new Yt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=e}get chapterNum(){return this._chapterNum}set chapterNum(e){this.chapterNum=e}get verseNum(){return this._verseNum}set verseNum(e){this._verseNum=e}get versificationStr(){var e;return(e=this.versification)==null?void 0:e.name}set versificationStr(e){this.versification=this.versification!=null?new St(e):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(E.verseRangeSeparators,E.verseSequenceIndicators)}get BBBCCC(){return E.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return E.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(e){if(e=e.replace(this.rtlMark,""),e.includes("/")){const i=e.split("/");if(e=i[0],i.length>1)try{const w=+i[1].trim();this.versification=new St(dt[w])}catch{throw new Yt("Invalid reference : "+e)}}const r=e.trim().split(" ");if(r.length!==2)throw new Yt("Invalid reference : "+e);const o=r[1].split(":"),a=+o[0];if(o.length!==2||O.bookIdToNumber(r[0])===0||!Number.isInteger(a)||a<0||!E.isVerseParseable(o[1]))throw new Yt("Invalid reference : "+e);this.updateInternal(r[0],o[0],o[1])}simplify(){this._verse=void 0}clone(){return new E(this)}toString(){const e=this.book;return e===""?"":`${e} ${this.chapter}:${this.verse}`}toJSON(){let e=this.verse;(e===""||e===this.verseNum.toString())&&(e=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:e,versificationStr:this.versificationStr};return e||delete r.verse,r}equals(e){return e instanceof E?e._bookNum===this._bookNum&&e._chapterNum===this._chapterNum&&e._verseNum===this._verseNum&&e.verse===this.verse&&(e.versification==null&&this.versification==null||e.versification!=null&&this.versification!=null&&e.versification.equals(this.versification)):!1}allVerses(e=!1,r=E.verseRangeSeparators,o=E.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const a=[],i=bn(this._verse,o);for(const w of i.map(l=>bn(l,r))){const l=this.clone();l.verse=w[0];const p=l.verseNum;if(a.push(l),w.length>1){const d=this.clone();if(d.verse=w[1],!e)for(let u=p+1;u<d.verseNum;u++){const g=new E(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||a.push(g)}a.push(d)}}return a}validateVerse(e,r){if(!this.verse)return this.internalValid;let o=0;for(const a of this.allVerses(!0,e,r)){const i=a.internalValid;if(i!==0)return i;const w=a.BBBCCCVVV;if(o>w)return 3;if(o===w)return 4;o=w}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>O.lastBook?2:(O.isCanonical(this._bookNum),0)}setEmpty(e=E.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=e}updateInternal(e,r,o){this.bookNum=O.bookIdToNumber(e),this.chapter=r,this.verse=o}};M(ot,"defaultVersification",St.English),M(ot,"verseRangeSeparator","-"),M(ot,"verseSequenceIndicator",","),M(ot,"verseRangeSeparators",[ot.verseRangeSeparator]),M(ot,"verseSequenceIndicators",[ot.verseSequenceIndicator]),M(ot,"chapterDigitShifter",1e3),M(ot,"bookDigitShifter",ot.chapterDigitShifter*ot.chapterDigitShifter),M(ot,"bcvMaxValue",ot.chapterDigitShifter-1),M(ot,"ValidStatusType",An);class Yt extends Error{}const zn=(t,e,r,o,a)=>{switch(t){case f.Section.OT:return e??"Old Testament";case f.Section.NT:return r??"New Testament";case f.Section.DC:return o??"Deuterocanon";case f.Section.Extra:return a??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},ua=(t,e,r,o,a)=>{switch(t){case f.Section.OT:return e??"OT";case f.Section.NT:return r??"NT";case f.Section.DC:return o??"DC";case f.Section.Extra:return a??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function Pt(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??O.bookIdToEnglishName(t)}function Ke(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const Ln=O.allBookIds.filter(t=>!O.isObsolete(O.bookIdToNumber(t))),Rt=Object.fromEntries(Ln.map(t=>[t,O.bookIdToEnglishName(t)])),Bn=s.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:a,className:i,showCheck:w=!1,localizedBookNames:l,commandValue:p},d)=>{const u=s.useRef(!1),g=()=>{u.current||r==null||r(t),setTimeout(()=>{u.current=!1},100)},m=v=>{u.current=!0,o?o(v):r==null||r(t)},h=s.useMemo(()=>Pt(t,l),[t,l]),b=s.useMemo(()=>Ke(t,l),[t,l]);return n.jsx("div",{className:c("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":a===f.Section.OT,"tw-border-s-purple-200":a===f.Section.NT,"tw-border-s-indigo-200":a===f.Section.DC,"tw-border-s-amber-200":a===f.Section.Extra}),children:n.jsxs(It,{ref:d,value:p||`${t} ${O.bookIdToEnglishName(t)}`,onSelect:g,onMouseDown:m,role:"option","aria-selected":e,"aria-label":`${O.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:i,children:[w&&n.jsx(x.Check,{className:c("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:h}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:b})]})})}),Fn=jt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),D=s.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...a},i)=>{const w=o?zt.Slot:"button";return n.jsx(w,{className:c(Fn({variant:e,size:r,className:t})),ref:i,...a})});D.displayName="Button";const Xt=Qt.Root,Kt=Qt.Trigger,Ot=s.forwardRef(({className:t,align:e="center",sideOffset:r=4,...o},a)=>{const i=Z();return n.jsx(Qt.Portal,{children:n.jsx(Qt.Content,{ref:a,align:e,sideOffset:r,className:c("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,dir:i})})});Ot.displayName=Qt.Content.displayName;function Le(t,e,r){return`${t} ${Rt[t]}${e?` ${Ke(t,e)} ${Pt(t,e)}`:""}${r?` ${r}`:""}`}const Me={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},ma=[Me.BOOK_ONLY,Me.BOOK_CHAPTER,Me.BOOK_CHAPTER_VERSE];function xn(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function pt(t){return f.getChaptersForBook(O.bookIdToNumber(t))}function ha(t,e,r){if(!t.trim()||e.length===0)return;const o=ma.reduce((a,i)=>{if(a)return a;const w=i.exec(t.trim());if(w){const[l,p=void 0,d=void 0]=w.slice(1);let u;const g=e.filter(m=>f.doesBookMatchQuery(m,l,r));if(g.length===1&&([u]=g),!u&&p){if(O.isBookIdValid(l)){const m=l.toUpperCase();e.includes(m)&&(u=m)}if(!u&&r){const m=Array.from(r.entries()).find(([,h])=>h.localizedId.toLowerCase()===l.toLowerCase());m&&e.includes(m[0])&&([u]=m)}}if(!u&&p){const h=(b=>Object.keys(Rt).find(v=>Rt[v].toLowerCase()===b.toLowerCase()))(l);if(h&&e.includes(h)&&(u=h),!u&&r){const b=Array.from(r.entries()).find(([,v])=>v.localizedName.toLowerCase()===l.toLowerCase());b&&e.includes(b[0])&&([u]=b)}}if(u){let m=p?parseInt(p,10):void 0;m&&m>pt(u)&&(m=Math.max(pt(u),1));const h=d?parseInt(d,10):void 0;return{book:u,chapterNum:m,verseNum:h}}}},void 0);if(o)return o}function fa(t,e,r,o){const a=s.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const p=e.indexOf(t.book);if(p>0){const d=e[p-1],u=Math.max(pt(d),1);o({book:d,chapterNum:u,verseNum:1})}}},[t,e,o]),i=s.useCallback(()=>{const p=pt(t.book);if(t.chapterNum<p)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const d=e.indexOf(t.book);if(d<e.length-1){const u=e[d+1];o({book:u,chapterNum:1,verseNum:1})}}},[t,e,o]),w=s.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),l=s.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return s.useMemo(()=>[{onClick:a,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?x.ChevronsLeft:x.ChevronsRight},{onClick:w,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?x.ChevronLeft:x.ChevronRight},{onClick:l,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?x.ChevronRight:x.ChevronLeft},{onClick:i,disabled:e.length===0||(t.chapterNum===pt(t.book)||pt(t.book)===-1)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?x.ChevronsRight:x.ChevronsLeft}],[t,e,r,a,w,l,i])}function vn({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:a,className:i}){if(t)return n.jsx(Tt,{children:n.jsx("div",{className:c("tw-grid tw-grid-cols-6 tw-gap-1",i),children:Array.from({length:pt(t)},(w,l)=>l+1).map(w=>n.jsx(It,{value:`${t} ${Rt[t]||""} ${w}`,onSelect:()=>r(w),ref:o(w),className:c("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&w===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(a==null?void 0:a(w))??!1}),children:w},w))})})}function ga({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:a,localizedStrings:i}){const w=Z(),[l,p]=s.useState(!1),[d,u]=s.useState(""),[g,m]=s.useState(""),[h,b]=s.useState("books"),[v,y]=s.useState(void 0),[C,N]=s.useState(!1),V=s.useRef(void 0),A=s.useRef(void 0),U=s.useRef(void 0),G=s.useRef(void 0),mt=s.useRef({}),k=s.useMemo(()=>o?o():Ln,[o]),T=s.useMemo(()=>({[f.Section.OT]:k.filter(I=>O.isBookOT(I)),[f.Section.NT]:k.filter(I=>O.isBookNT(I)),[f.Section.DC]:k.filter(I=>O.isBookDC(I)),[f.Section.Extra]:k.filter(I=>O.extraBooks().includes(I))}),[k]),Q=s.useMemo(()=>Object.values(T).flat(),[T]),P=s.useMemo(()=>{if(!g.trim())return T;const j={[f.Section.OT]:[],[f.Section.NT]:[],[f.Section.DC]:[],[f.Section.Extra]:[]};return[f.Section.OT,f.Section.NT,f.Section.DC,f.Section.Extra].forEach(H=>{j[H]=T[H].filter(tt=>f.doesBookMatchQuery(tt,g,a))}),j},[T,g,a]),S=s.useMemo(()=>ha(g,Q,a),[g,Q,a]),qt=s.useCallback(()=>{S&&(e({book:S.book,chapterNum:S.chapterNum??1,verseNum:S.verseNum??1}),p(!1),m(""),u(""))},[e,S]),R=s.useCallback(j=>{if(pt(j)<=1){e({book:j,chapterNum:1,verseNum:1}),p(!1),m("");return}y(j),b("chapters")},[e]),J=s.useCallback(j=>{const I=h==="chapters"?v:S==null?void 0:S.book;I&&(e({book:I,chapterNum:j,verseNum:1}),p(!1),b("books"),y(void 0),m(""))},[e,h,v,S]),$=fa(t,Q,w,e),z=s.useCallback(()=>{b("books"),y(void 0),setTimeout(()=>{A.current&&A.current.focus()},0)},[]),_=s.useCallback(j=>{if(!j&&h==="chapters"){z();return}p(j),j&&(b("books"),y(void 0),m(""))},[h,z]),{otLong:Y,ntLong:nt,dcLong:K,extraLong:ht}={otLong:i==null?void 0:i["%scripture_section_ot_long%"],ntLong:i==null?void 0:i["%scripture_section_nt_long%"],dcLong:i==null?void 0:i["%scripture_section_dc_long%"],extraLong:i==null?void 0:i["%scripture_section_extra_long%"]},No=s.useCallback(j=>zn(j,Y,nt,K,ht),[Y,nt,K,ht]),jo=s.useCallback(j=>S?!!S.chapterNum&&!j.toString().includes(S.chapterNum.toString()):!1,[S]),ko=s.useMemo(()=>f.formatScrRef(t,a?Pt(t.book,a):"English"),[t,a]),hn=s.useCallback(j=>I=>{mt.current[j]=I},[]),Co=s.useCallback(j=>{(j.key==="Home"||j.key==="End")&&j.stopPropagation()},[]),So=s.useCallback(j=>{if(j.ctrlKey)return;const{isLetter:I,isDigit:H}=xn(j.key);if(h==="chapters"){if(j.key==="Backspace"){j.preventDefault(),j.stopPropagation(),z();return}if(I||H){if(j.preventDefault(),j.stopPropagation(),b("books"),y(void 0),H&&v){const tt=Rt[v];m(`${tt} ${j.key}`)}else m(j.key);setTimeout(()=>{A.current&&A.current.focus()},0);return}}if((h==="chapters"||h==="books"&&S)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(j.key)){const tt=h==="chapters"?v:S==null?void 0:S.book;if(!tt)return;const rt=(()=>{if(!d)return 1;const Ut=d.match(/(\d+)$/);return Ut?parseInt(Ut[1],10):0})(),kt=pt(tt);if(!kt)return;let ft=rt;const fn=6;switch(j.key){case"ArrowLeft":rt!==0&&(ft=rt>1?rt-1:kt);break;case"ArrowRight":rt!==0&&(ft=rt<kt?rt+1:1);break;case"ArrowUp":ft=rt===0?kt:Math.max(1,rt-fn);break;case"ArrowDown":ft=rt===0?1:Math.min(kt,rt+fn);break;default:return}ft!==rt&&(j.preventDefault(),j.stopPropagation(),u(Le(tt,a,ft)),setTimeout(()=>{const Ut=mt.current[ft];Ut&&Ut.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[h,S,z,v,d,a]),_o=s.useCallback(j=>{if(j.shiftKey||j.key==="Tab"||j.key===" ")return;const{isLetter:I,isDigit:H}=xn(j.key);(I||H)&&(j.preventDefault(),m(tt=>tt+j.key),A.current.focus(),N(!1))},[]);return s.useLayoutEffect(()=>{const j=setTimeout(()=>{if(l&&h==="books"&&U.current&&G.current){const I=U.current,H=G.current,tt=H.offsetTop,rt=I.clientHeight,kt=H.clientHeight,ft=tt-rt/2+kt/2;I.scrollTo({top:Math.max(0,ft),behavior:"smooth"}),u(Le(t.book))}},0);return()=>{clearTimeout(j)}},[l,h,g,S,t.book]),s.useLayoutEffect(()=>{if(h==="chapters"&&v){const j=v===t.book;setTimeout(()=>{if(U.current)if(j){const I=mt.current[t.chapterNum];I&&I.scrollIntoView({block:"center",behavior:"smooth"})}else U.current.scrollTo({top:0});V.current&&V.current.focus()},0)}},[h,v,S,t.book,t.chapterNum]),n.jsxs(Xt,{open:l,onOpenChange:_,children:[n.jsx(Kt,{asChild:!0,children:n.jsx(D,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":l,className:c("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:ko})})}),n.jsx(Ot,{forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(Bt,{ref:V,onKeyDown:So,loop:!0,value:d,onValueChange:u,shouldFilter:!1,children:[h==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsx(Ft,{ref:A,value:g,onValueChange:m,onKeyDown:Co,onFocus:()=>N(!1)}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:$.map(({onClick:j,disabled:I,title:H,icon:tt})=>n.jsx(D,{variant:"ghost",size:"sm",onClick:()=>{N(!0),j()},disabled:I,className:"tw-h-10 tw-w-4 tw-p-0",title:H,onKeyDown:_o,children:n.jsx(tt,{})},H))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(D,{variant:"ghost",size:"sm",onClick:z,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:w==="ltr"?n.jsx(x.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(x.ArrowRight,{className:"tw-h-4 tw-w-4"})}),v&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:Pt(v,a)})]}),!C&&n.jsxs(Gt,{ref:U,children:[h==="books"&&n.jsxs(n.Fragment,{children:[!S&&Object.entries(P).map(([j,I])=>{if(I.length!==0)return n.jsx(Tt,{heading:No(j),children:I.map(H=>n.jsx(Bn,{bookId:H,onSelect:tt=>R(tt),section:f.getSectionForBook(H),commandValue:`${H} ${Rt[H]}`,ref:H===t.book?G:void 0,localizedBookNames:a},H))},j)}),S&&n.jsx(Tt,{children:n.jsx(It,{value:`${S.book} ${Rt[S.book]} ${S.chapterNum||""}:${S.verseNum||""})}`,onSelect:qt,className:"tw-font-semibold tw-text-primary",children:f.formatScrRef({book:S.book,chapterNum:S.chapterNum??1,verseNum:S.verseNum??1},a?Ke(S.book,a):void 0)},"top-match")}),S&&pt(S.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:Pt(S.book,a)}),n.jsx(vn,{bookId:S.book,scrRef:t,onChapterSelect:J,setChapterRef:hn,isChapterDimmed:jo,className:"tw-px-4 tw-pb-4"})]})]}),h==="chapters"&&v&&n.jsx(vn,{bookId:v,scrRef:t,onChapterSelect:J,setChapterRef:hn,className:"tw-p-4"})]})]})})]})}const ba=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%"]),xa=jt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),q=s.forwardRef(({className:t,...e},r)=>n.jsx(_n.Root,{ref:r,className:c("pr-twp",xa(),t),...e}));q.displayName=_n.Root.displayName;const xe=s.forwardRef(({className:t,...e},r)=>{const o=Z();return n.jsx(te.Root,{className:c("pr-twp tw-grid tw-gap-2",t),...e,ref:r,dir:o})});xe.displayName=te.Root.displayName;const ee=s.forwardRef(({className:t,...e},r)=>n.jsx(te.Item,{ref:r,className:c("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(te.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(x.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));ee.displayName=te.Item.displayName;function va(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function ue({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:a,value:i,onChange:w=()=>{},getOptionLabel:l=va,icon:p=void 0,buttonPlaceholder:d="",textPlaceholder:u="",commandEmptyMessage:g="No option found",buttonVariant:m="outline",alignDropDown:h="start",isDisabled:b=!1,...v}){const[y,C]=s.useState(!1);return n.jsxs(Xt,{open:y,onOpenChange:C,...v,children:[n.jsx(Kt,{asChild:!0,children:n.jsxs(D,{variant:m,role:"combobox","aria-expanded":y,id:t,className:c("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:b,children:[n.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[p&&n.jsx("div",{className:"tw-pe-2",children:p}),n.jsx("span",{className:c("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"),children:i?l(i):d})]}),n.jsx(x.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Ot,{align:h,className:c("tw-w-[200px] tw-p-0",a),children:n.jsxs(Bt,{children:[n.jsx(Ft,{placeholder:u,className:"tw-text-inherit"}),n.jsx(ae,{children:g}),n.jsx(Gt,{children:e.map(N=>n.jsxs(It,{value:l(N),onSelect:()=>{w(N),C(!1)},children:[n.jsx(x.Check,{className:c("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!i||l(i)!==l(N)})}),l(N)]},l(N)))})]})})]})}function Gn({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:a=!1,chapterCount:i}){const w=s.useMemo(()=>Array.from({length:i},(d,u)=>u+1),[i]),l=d=>{r(d),d>e&&o(d)},p=d=>{o(d),d<t&&r(d)};return n.jsxs(n.Fragment,{children:[n.jsx(q,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(ue,{isDisabled:a,onChange:l,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:w,getOptionLabel:d=>d.toString(),value:t},"start chapter"),n.jsx(q,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(ue,{isDisabled:a,onChange:p,buttonClassName:"tw-ms-2 tw-w-20",options:w,getOptionLabel:d=>d.toString(),value:e},"end chapter")]})}var $n=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))($n||{});const ya=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Ee=(t,e)=>t[e]??e;function Na({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:a,endChapter:i,handleSelectEndChapter:w,startChapter:l,handleSelectStartChapter:p,localizedStrings:d}){const u=Ee(d,"%webView_bookSelector_currentBook%"),g=Ee(d,"%webView_bookSelector_choose%"),m=Ee(d,"%webView_bookSelector_chooseBooks%"),[h,b]=s.useState("current book"),v=y=>{b(y),t(y)};return n.jsx(xe,{className:"pr-twp tw-flex",value:h,onValueChange:y=>v(y),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ee,{value:"current book"}),n.jsx(q,{className:"tw-ms-1",children:u})]}),n.jsx(q,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(Gn,{isDisabled:h==="choose books",handleSelectStartChapter:p,handleSelectEndChapter:w,chapterCount:a,startChapter:l,endChapter:i})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ee,{value:"choose books"}),n.jsx(q,{className:"tw-ms-1",children:m})]}),n.jsx(q,{className:"tw-flex tw-items-center",children:o.map(y=>O.bookIdToEnglishName(y)).join(", ")}),n.jsx(D,{disabled:h==="current book",onClick:()=>r(),children:g})]})]})})}const He=s.createContext(void 0);function ct(){const t=s.useContext(He);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const xt=jt.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),qe=L.Trigger,Ue=L.Group,Xn=L.Portal,Kn=L.Sub,Hn=L.RadioGroup;function ve({variant:t="default",...e}){const r=s.useMemo(()=>({variant:t}),[t]);return n.jsx(He.Provider,{value:r,children:n.jsx(L.Root,{...e})})}const Ye=s.forwardRef(({className:t,inset:e,children:r,...o},a)=>{const i=ct();return n.jsxs(L.SubTrigger,{ref:a,className:c("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,xt({variant:i.variant})),...o,children:[r,n.jsx(x.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Ye.displayName=L.SubTrigger.displayName;const Je=s.forwardRef(({className:t,...e},r)=>n.jsx(L.SubContent,{ref:r,className:c("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));Je.displayName=L.SubContent.displayName;const se=s.forwardRef(({className:t,sideOffset:e=4,children:r,...o},a)=>{const i=Z();return n.jsx(L.Portal,{children:n.jsx(L.Content,{ref:a,sideOffset:e,className:c("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:i,children:r})})})});se.displayName=L.Content.displayName;const We=s.forwardRef(({className:t,inset:e,...r},o)=>{const a=Z(),i=ct();return n.jsx(L.Item,{ref:o,className:c("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,xt({variant:i.variant})),...r,dir:a})});We.displayName=L.Item.displayName;const ye=s.forwardRef(({className:t,children:e,checked:r,...o},a)=>{const i=ct();return n.jsxs(L.CheckboxItem,{ref:a,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,xt({variant:i.variant})),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(L.ItemIndicator,{children:n.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});ye.displayName=L.CheckboxItem.displayName;const Ze=s.forwardRef(({className:t,children:e,...r},o)=>{const a=ct();return n.jsxs(L.RadioItem,{ref:o,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,xt({variant:a.variant})),...r,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(L.ItemIndicator,{children:n.jsx(x.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});Ze.displayName=L.RadioItem.displayName;const Ne=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(L.Label,{ref:o,className:c("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Ne.displayName=L.Label.displayName;const ie=s.forwardRef(({className:t,...e},r)=>n.jsx(L.Separator,{ref:r,className:c("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));ie.displayName=L.Separator.displayName;function qn({className:t,...e}){return n.jsx("span",{className:c("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}qn.displayName="DropdownMenuShortcut";function ja({table:t}){return n.jsxs(ve,{children:[n.jsx(Cn.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(D,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(x.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(se,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Ne,{children:"Toggle columns"}),n.jsx(ie,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(ye,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const Et=X.Root,Un=X.Group,Dt=X.Value,Yn=jt.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),yt=s.forwardRef(({className:t,children:e,size:r,...o},a)=>{const i=Z();return n.jsxs(X.Trigger,{className:c(Yn({size:r,className:t})),ref:a,...o,dir:i,children:[e,n.jsx(X.Icon,{asChild:!0,children:n.jsx(x.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});yt.displayName=X.Trigger.displayName;const Qe=s.forwardRef(({className:t,...e},r)=>n.jsx(X.ScrollUpButton,{ref:r,className:c("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(x.ChevronUp,{className:"tw-h-4 tw-w-4"})}));Qe.displayName=X.ScrollUpButton.displayName;const tn=s.forwardRef(({className:t,...e},r)=>n.jsx(X.ScrollDownButton,{ref:r,className:c("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(x.ChevronDown,{className:"tw-h-4 tw-w-4"})}));tn.displayName=X.ScrollDownButton.displayName;const Nt=s.forwardRef(({className:t,children:e,position:r="popper",...o},a)=>{const i=Z();return n.jsx(X.Portal,{children:n.jsxs(X.Content,{ref:a,className:c("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(Qe,{}),n.jsx(X.Viewport,{className:c("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:i,children:e})}),n.jsx(tn,{})]})})});Nt.displayName=X.Content.displayName;const Jn=s.forwardRef(({className:t,...e},r)=>n.jsx(X.Label,{ref:r,className:c("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));Jn.displayName=X.Label.displayName;const wt=s.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(X.Item,{ref:o,className:c("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(X.ItemIndicator,{children:n.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(X.ItemText,{children:e})]}));wt.displayName=X.Item.displayName;const Wn=s.forwardRef(({className:t,...e},r)=>n.jsx(X.Separator,{ref:r,className:c("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Wn.displayName=X.Separator.displayName;function ka({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(Et,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(yt,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(Dt,{placeholder:t.getState().pagination.pageSize})}),n.jsx(Nt,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(wt,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(D,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(x.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(D,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(x.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(D,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(x.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(D,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(x.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const yn=`
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
`;function Ca(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function ne(t,e){const r=e?`${yn}, ${e}`:yn;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&Ca(o))}const we=s.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const a=s.useRef(null);s.useEffect(()=>{typeof o=="function"?o(a.current):o&&"current"in o&&(o.current=a.current)},[o]),s.useEffect(()=>{const w=a.current;if(!w)return;const l=()=>{requestAnimationFrame(()=>{ne(w,'[tabindex]:not([tabindex="-1"])').forEach(u=>{u.setAttribute("tabindex","-1")})})};l();const p=new MutationObserver(()=>{l()});return p.observe(w,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{p.disconnect()}},[]);const i=w=>{const{current:l}=a;if(l){if(w.key==="ArrowDown"){w.preventDefault(),ne(l)[0].focus();return}w.key===" "&&document.activeElement===l&&w.preventDefault()}};return n.jsx("div",{className:c("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:i,ref:a,className:c("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});we.displayName="Table";const le=s.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:c({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));le.displayName="TableHeader";const ce=s.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:c("[&_tr:last-child]:tw-border-0",t),...e}));ce.displayName="TableBody";const Zn=s.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:c("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));Zn.displayName="TableFooter";function Sa(t){s.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const a=t.current?ne(t.current):[],i=a.indexOf(document.activeElement),w=o.key==="ArrowRight"?i+1:i-1;w>=0&&w<a.length&&a[w].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function _a(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function Ra(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const bt=s.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...a},i)=>{const w=s.useRef(null);s.useEffect(()=>{typeof i=="function"?i(w.current):i&&"current"in i&&(i.current=w.current)},[i]),Sa(w);const l=s.useMemo(()=>w.current?ne(w.current):[],[w]),p=s.useCallback(u=>{const{current:g}=w;if(!g||!g.parentElement)return;const m=g.closest("table"),h=m?ne(m).filter(y=>y.tagName==="TR"):[],b=h.indexOf(g),v=l.indexOf(document.activeElement);if(u.key==="ArrowDown"||u.key==="ArrowUp")u.preventDefault(),Ra(h,b,u.key);else if(u.key==="ArrowLeft"||u.key==="ArrowRight")u.preventDefault(),_a(l,v,u.key);else if(u.key==="Escape"){u.preventDefault();const y=g.closest("table");y&&y.focus()}e==null||e(u)},[w,l,e]),d=s.useCallback(u=>{o&&(r==null||r(u))},[o,r]);return n.jsx("tr",{ref:w,tabIndex:-1,onKeyDown:p,onFocus:d,className:c("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...a})});bt.displayName="TableRow";const At=s.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:c("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));At.displayName="TableHead";const Vt=s.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:c("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));Vt.displayName="TableCell";const Qn=s.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:c("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));Qn.displayName="TableCaption";function tr({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:a=!1,stickyHeader:i=!1,onRowClickHandler:w=()=>{}}){var y;const[l,p]=s.useState([]),[d,u]=s.useState([]),[g,m]=s.useState({}),[h,b]=s.useState({}),v=et.useReactTable({data:e,columns:t,getCoreRowModel:et.getCoreRowModel(),...r&&{getPaginationRowModel:et.getPaginationRowModel()},onSortingChange:p,getSortedRowModel:et.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:et.getFilteredRowModel(),onColumnVisibilityChange:m,onRowSelectionChange:b,state:{sorting:l,columnFilters:d,columnVisibility:g,rowSelection:h}});return n.jsxs("div",{className:"pr-twp",children:[a&&n.jsx(ja,{table:v}),n.jsxs(we,{stickyHeader:i,children:[n.jsx(le,{stickyHeader:i,children:v.getHeaderGroups().map(C=>n.jsx(bt,{children:C.headers.map(N=>n.jsx(At,{children:N.isPlaceholder?void 0:et.flexRender(N.column.columnDef.header,N.getContext())},N.id))},C.id))}),n.jsx(ce,{children:(y=v.getRowModel().rows)!=null&&y.length?v.getRowModel().rows.map(C=>n.jsx(bt,{onClick:()=>w(C,v),"data-state":C.getIsSelected()&&"selected",children:C.getVisibleCells().map(N=>n.jsx(Vt,{children:et.flexRender(N.column.columnDef.cell,N.getContext())},N.id))},C.id)):n.jsx(bt,{children:n.jsx(Vt,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(D,{variant:"outline",size:"sm",onClick:()=>v.previousPage(),disabled:!v.getCanPreviousPage(),children:"Previous"}),n.jsx(D,{variant:"outline",size:"sm",onClick:()=>v.nextPage(),disabled:!v.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(ka,{table:v})]})}function Ta({id:t,markdown:e,className:r,anchorTarget:o}){const a=s.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:c("pr-twp tw-prose",r),children:n.jsx(Oo,{options:a,children:e})})}const er=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Nn=(t,e)=>t[e]??e;function nr({errorDetails:t,handleCopyNotify:e,localizedStrings:r}){const o=Nn(r,"%webView_error_dump_header%"),a=Nn(r,"%webView_error_dump_info_message%");function i(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:o}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:a})]}),n.jsx(D,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>i(),children:n.jsx(x.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const Ma=Object.freeze([...er,"%webView_error_dump_copied_message%"]);function Ea({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:a}){const[i,w]=s.useState(!1),l=()=>{w(!0),e&&e()},p=d=>{d||w(!1)};return n.jsxs(Xt,{onOpenChange:p,children:[n.jsx(Kt,{asChild:!0,children:o}),n.jsxs(Ot,{className:c("tw-min-w-80 tw-max-w-96",a),children:[i&&r["%webView_error_dump_copied_message%"]&&n.jsx(q,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(nr,{errorDetails:t,handleCopyNotify:l,localizedStrings:r})]})]})}var rr=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(rr||{});function Da({id:t,label:e,groups:r}){const[o,a]=s.useState(Object.fromEntries(r.map((d,u)=>d.itemType===0?[u,[]]:void 0).filter(d=>!!d))),[i,w]=s.useState({}),l=(d,u)=>{const g=!o[d][u];a(h=>(h[d][u]=g,{...h}));const m=r[d].items[u];m.onUpdate(m.id,g)},p=(d,u)=>{w(m=>(m[d]=u,{...m}));const g=r[d].items.find(m=>m.id===u);g?g.onUpdate(u):console.error(`Could not find dropdown radio item with id '${u}'!`)};return n.jsx("div",{id:t,children:n.jsxs(ve,{children:[n.jsx(qe,{asChild:!0,children:n.jsxs(D,{variant:"default",children:[n.jsx(x.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(x.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(se,{children:r.map((d,u)=>n.jsxs("div",{children:[n.jsx(Ne,{children:d.label}),n.jsx(Ue,{children:d.itemType===0?n.jsx(n.Fragment,{children:d.items.map((g,m)=>n.jsx("div",{children:n.jsx(ye,{checked:o[u][m],onCheckedChange:()=>l(u,m),children:g.label})},g.id))}):n.jsx(Hn,{value:i[u],onValueChange:g=>p(u,g),children:d.items.map(g=>n.jsx("div",{children:n.jsx(Ze,{value:g.id,children:g.label})},g.id))})}),n.jsx(ie,{})]},d.label))})]})})}function Va({id:t,category:e,downloads:r,languages:o,moreInfoUrl:a,handleMoreInfoLinkClick:i,supportUrl:w,handleSupportLinkClick:l}){const p=new f.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((u,g)=>u+g,0)),d=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(x.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(u=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:u.toUpperCase()},u))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>d(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(a||w)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[a&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(D,{onClick:()=>i(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(x.Link,{className:"tw-h-4 tw-w-4"})]})}),w&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(D,{onClick:()=>l(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(x.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function Ia({id:t,versionHistory:e}){const[r,o]=s.useState(!1),a=new Date;function i(l){const p=new Date(l),d=new Date(a.getTime()-p.getTime()),u=d.getUTCFullYear()-1970,g=d.getUTCMonth(),m=d.getUTCDate()-1;let h="";return u>0?h=`${u.toString()} year${u===1?"":"s"} ago`:g>0?h=`${g.toString()} month${g===1?"":"s"} ago`:m===0?h="today":h=`${m.toString()} day${m===1?"":"s"} ago`,h}const w=Object.entries(e).sort((l,p)=>p[0].localeCompare(l[0]));return n.jsxs("div",{id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?w:w.slice(0,5)).map(l=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:l[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",l[0]]}),n.jsx("div",{children:i(l[1].date)})]})]},l[0]))}),w.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Oa({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:a,currentVersion:i}){const w=s.useMemo(()=>f.formatBytes(r),[r]),p=(d=>{const u=new Intl.DisplayNames(f.getCurrentLocale(),{type:"language"});return d.map(g=>u.of(g))})(o);return n.jsx("div",{id:t,className:"tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(a).length>0&&n.jsx(Ia,{versionHistory:a}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:w})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:i}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:p.join(", ")})]})})]})]})]})})}const or=jt.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),re=s.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,className:c("pr-twp",or({variant:e}),t),...r}));re.displayName="Badge";function ar({entries:t,getEntriesCount:e=void 0,selected:r,onChange:o,placeholder:a,commandEmptyMessage:i="No entries found",customSelectedText:w,isDisabled:l=!1,sortSelected:p=!1,icon:d=void 0,className:u=void 0}){const[g,m]=s.useState(!1),h=s.useCallback(y=>{var N;const C=(N=t.find(V=>V.label===y))==null?void 0:N.value;C&&o(r.includes(C)?r.filter(V=>V!==C):[...r,C])},[t,r,o]),b=()=>w||a,v=s.useMemo(()=>{if(!p)return t;const y=t.filter(N=>N.starred).sort((N,V)=>N.label.localeCompare(V.label)),C=t.filter(N=>!N.starred).sort((N,V)=>{const A=r.includes(N.value),U=r.includes(V.value);return A&&!U?-1:!A&&U?1:N.label.localeCompare(V.label)});return[...y,...C]},[t,r,p]);return n.jsx("div",{className:u,children:n.jsxs(Xt,{open:g,onOpenChange:m,children:[n.jsx(Kt,{asChild:!0,children:n.jsxs(D,{variant:"ghost",role:"combobox","aria-expanded":g,className:c("tw-w-full tw-justify-between",r.length>0&&r.length<t.length&&"tw-border-primary","tw-group"),disabled:l,children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:d})}),n.jsx("div",{className:c({"tw-text-muted-foreground group-hover:tw-text-secondary-foreground":r.length===0||r.length===t.length}),children:n.jsx("div",{className:"tw-font-normal",children:b()})})]}),n.jsx(x.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Ot,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(Bt,{children:[n.jsx(Ft,{placeholder:`Search ${a.toLowerCase()}...`}),n.jsxs(Gt,{children:[n.jsx(ae,{children:i}),n.jsx(Tt,{children:v.map(y=>{const C=e?e(y):void 0;return n.jsxs(It,{value:y.label,onSelect:h,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(x.Check,{className:c("tw-h-4 tw-w-4",r.includes(y.value)?"tw-opacity-100":"tw-opacity-0")})}),n.jsx("div",{className:"tw-w-4",children:y.starred&&n.jsx(x.Star,{className:"tw-h-4 tw-w-4"})}),n.jsx("div",{className:"tw-flex-grow",children:y.label}),e&&n.jsx("div",{className:"tw-w-10 tw-text-end tw-text-muted-foreground",children:C})]},y.label)})})]})]})})]})})}function Pa({entries:t,getEntriesCount:e,selected:r,onChange:o,placeholder:a,commandEmptyMessage:i,customSelectedText:w,isDisabled:l,sortSelected:p,icon:d,className:u,badgesPlaceholder:g}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(ar,{entries:t,getEntriesCount:e,selected:r,onChange:o,placeholder:a,commandEmptyMessage:i,customSelectedText:w,isDisabled:l,sortSelected:p,icon:d,className:u}),r.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:r.map(m=>{var h;return n.jsxs(re,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(D,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>o(r.filter(b=>b!==m)),children:n.jsx(x.X,{className:"tw-h-3 tw-w-3"})}),(h=t.find(b=>b.value===m))==null?void 0:h.label]},m)})}):n.jsx(q,{children:g})]})}function Aa({occurrenceData:t,setScriptureReference:e,localizedStrings:r}){const o=r["%webView_inventory_occurrences_table_header_reference%"],a=r["%webView_inventory_occurrences_table_header_occurrence%"],i=s.useMemo(()=>{const w=[];return t.forEach(l=>{w.some(p=>f.deepEqual(p,l))||w.push(l)}),w},[t]);return n.jsxs(we,{stickyHeader:!0,children:[n.jsx(le,{stickyHeader:!0,children:n.jsxs(bt,{children:[n.jsx(At,{children:o}),n.jsx(At,{children:a})]})}),n.jsx(ce,{children:i.length>0&&i.map(w=>n.jsxs(bt,{onClick:()=>{e(w.reference)},children:[n.jsx(Vt,{children:`${O.bookIdToEnglishName(w.reference.book)} ${w.reference.chapterNum}:${w.reference.verseNum}`}),n.jsx(Vt,{children:w.text})]},`${w.reference.book} ${w.reference.chapterNum}:${w.reference.verseNum}-${w.text}`))})]})}const je=s.forwardRef(({className:t,...e},r)=>n.jsx(Pe.Root,{ref:r,className:c("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(Pe.Indicator,{className:c("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}));je.displayName=Pe.Root.displayName;const Ht=s.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:c("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));Ht.displayName="Input";const sr=jt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),za=s.forwardRef(({className:t,variant:e,size:r,...o},a)=>n.jsx(Rn.Root,{ref:a,className:c(sr({variant:e,size:r,className:t})),...o}));za.displayName=Rn.Root.displayName;const ir=s.createContext({size:"default",variant:"default"}),en=s.forwardRef(({className:t,variant:e,size:r,children:o,...a},i)=>{const w=Z();return n.jsx(be.Root,{ref:i,className:c("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...a,dir:w,children:n.jsx(ir.Provider,{value:{variant:e,size:r},children:o})})});en.displayName=be.Root.displayName;const Zt=s.forwardRef(({className:t,children:e,variant:r,size:o,...a},i)=>{const w=s.useContext(ir);return n.jsx(be.Item,{ref:i,className:c(sr({variant:w.variant||r,size:w.size||o}),t),...a,children:e})});Zt.displayName=be.Item.displayName;const ke=t=>t==="asc"?n.jsx(x.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?n.jsx(x.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):n.jsx(x.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),La=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>n.jsxs(D,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,ke(e.getIsSorted())]})}),Ba=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>n.jsxs(D,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[t,ke(r.getIsSorted())]})}),Fa=t=>({accessorKey:"count",header:({column:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:n.jsxs(D,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,ke(e.getIsSorted())]})}),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end",children:e.getValue("count")})}),De=(t,e,r,o,a,i)=>{let w=[...r];t.forEach(p=>{e==="approved"?w.includes(p)||w.push(p):w=w.filter(d=>d!==p)}),o(w);let l=[...a];t.forEach(p=>{e==="unapproved"?l.includes(p)||l.push(p):l=l.filter(d=>d!==p)}),i(l)},Ga=(t,e,r,o,a)=>({accessorKey:"status",header:({column:i})=>n.jsx("div",{className:"tw-flex tw-justify-center",children:n.jsxs(D,{variant:"ghost",onClick:()=>i.toggleSorting(void 0),children:[t,ke(i.getIsSorted())]})}),cell:({row:i})=>{const w=i.getValue("status"),l=i.getValue("item");return n.jsxs(en,{value:w,variant:"outline",type:"single",children:[n.jsx(Zt,{onClick:p=>{p.stopPropagation(),De([l],"approved",e,r,o,a)},value:"approved",children:n.jsx(x.CircleCheckIcon,{})}),n.jsx(Zt,{onClick:p=>{p.stopPropagation(),De([l],"unapproved",e,r,o,a)},value:"unapproved",children:n.jsx(x.CircleXIcon,{})}),n.jsx(Zt,{onClick:p=>{p.stopPropagation(),De([l],"unknown",e,r,o,a)},value:"unknown",children:n.jsx(x.CircleHelpIcon,{})})]})}}),$a=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Xa=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},Ka=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},wr=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",Ha=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),qa=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(a=>e==="approved"&&a.status==="approved"||e==="unapproved"&&a.status==="unapproved"||e==="unknown"&&a.status==="unknown")),r!==""&&(o=o.filter(a=>a.items[0].includes(r))),o},Ua=(t,e,r)=>{const o=[];return t.forEach(a=>{const i=o.find(w=>f.deepEqual(w.items,f.isString(a.inventoryText)?[a.inventoryText]:a.inventoryText));if(i)i.count+=1,i.occurrences.push({reference:a.verseRef,text:a.verse});else{const w={items:f.isString(a.inventoryText)?[a.inventoryText]:a.inventoryText,count:1,status:wr(f.isString(a.inventoryText)?a.inventoryText:a.inventoryText[0],e,r),occurrences:[{reference:a.verseRef,text:a.verse}]};o.push(w)}}),o},gt=(t,e)=>t[e]??e;function Ya({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:a,unapprovedItems:i,scope:w,onScopeChange:l,columns:p}){const d=gt(r,"%webView_inventory_all%"),u=gt(r,"%webView_inventory_approved%"),g=gt(r,"%webView_inventory_unapproved%"),m=gt(r,"%webView_inventory_unknown%"),h=gt(r,"%webView_inventory_scope_currentBook%"),b=gt(r,"%webView_inventory_scope_chapter%"),v=gt(r,"%webView_inventory_scope_verse%"),y=gt(r,"%webView_inventory_filter_text%"),C=gt(r,"%webView_inventory_show_additional_items%"),[N,V]=s.useState(!1),[A,U]=s.useState("all"),[G,mt]=s.useState(""),[k,T]=s.useState([]),Q=s.useMemo(()=>t.length===0?[]:Ua(t,a,i),[t,a,i]),P=s.useMemo(()=>{if(N)return Q;const _=[];return Q.forEach(Y=>{const nt=Y.items[0],K=_.find(ht=>ht.items[0]===nt);K?(K.count+=Y.count,K.occurrences=K.occurrences.concat(Y.occurrences)):_.push({items:[nt],count:Y.count,occurrences:Y.occurrences,status:Y.status})}),_},[N,Q]),S=s.useMemo(()=>qa(P,A,G),[P,A,G]),qt=s.useMemo(()=>{var nt,K;if(!N)return p;const _=(nt=o==null?void 0:o.tableHeaders)==null?void 0:nt.length;if(!_)return p;const Y=[];for(let ht=0;ht<_;ht++)Y.push(Ba(((K=o==null?void 0:o.tableHeaders)==null?void 0:K[ht])||"Additional Item",ht+1));return[...Y,...p]},[o==null?void 0:o.tableHeaders,p,N]);s.useEffect(()=>{S.length===0?T([]):S.length===1&&T(S[0].items)},[S]);const R=(_,Y)=>{Y.setRowSelection(()=>{const nt={};return nt[_.index]=!0,nt}),T(_.original.items)},J=_=>{if(_==="book"||_==="chapter"||_==="verse")l(_);else throw new Error(`Invalid scope value: ${_}`)},$=_=>{if(_==="all"||_==="approved"||_==="unapproved"||_==="unknown")U(_);else throw new Error(`Invalid status filter value: ${_}`)},z=s.useMemo(()=>{if(P.length===0||k.length===0)return[];const _=P.filter(Y=>f.deepEqual(N?Y.items:[Y.items[0]],k));if(_.length>1)throw new Error("Selected item is not unique");return _.length===0?[]:_[0].occurrences},[k,N,P]);return n.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",children:[n.jsxs(Et,{onValueChange:_=>$(_),defaultValue:A,children:[n.jsx(yt,{className:"tw-m-1",children:n.jsx(Dt,{placeholder:"Select filter"})}),n.jsxs(Nt,{children:[n.jsx(wt,{value:"all",children:d}),n.jsx(wt,{value:"approved",children:u}),n.jsx(wt,{value:"unapproved",children:g}),n.jsx(wt,{value:"unknown",children:m})]})]}),n.jsxs(Et,{onValueChange:_=>J(_),defaultValue:w,children:[n.jsx(yt,{className:"tw-m-1",children:n.jsx(Dt,{placeholder:"Select scope"})}),n.jsxs(Nt,{children:[n.jsx(wt,{value:"book",children:h}),n.jsx(wt,{value:"chapter",children:b}),n.jsx(wt,{value:"verse",children:v})]})]}),n.jsx(Ht,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:y,value:G,onChange:_=>{mt(_.target.value)}}),o&&n.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[n.jsx(je,{className:"tw-m-1",checked:N,onCheckedChange:_=>{V(_)}}),n.jsx(q,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??C})]})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(tr,{columns:qt,data:S,onRowClickHandler:R,stickyHeader:!0})}),z.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Aa,{occurrenceData:z,setScriptureReference:e,localizedStrings:r})})]})}const Ce=s.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},a)=>n.jsx(Tn.Root,{ref:a,decorative:r,orientation:e,className:c("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));Ce.displayName=Tn.Root.displayName;function Be({className:t,...e}){return n.jsx("div",{className:c("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}const Se=oe.Provider,_e=oe.Root,Re=oe.Trigger,de=s.forwardRef(({className:t,sideOffset:e=4,...r},o)=>n.jsx(oe.Content,{ref:o,sideOffset:e,className:c("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r}));de.displayName=oe.Content.displayName;const Ja="16rem",Wa="3rem",lr=s.createContext(void 0);function pe(){const t=s.useContext(lr);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const nn=s.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:a,children:i,side:w="primary",...l},p)=>{const[d,u]=s.useState(t),g=e??d,m=s.useCallback(V=>{const A=typeof V=="function"?V(g):V;r?r(A):u(A)},[r,g]),h=s.useCallback(()=>m(V=>!V),[m]),b=g?"expanded":"collapsed",C=Z()==="ltr"?w:w==="primary"?"secondary":"primary",N=s.useMemo(()=>({state:b,open:g,setOpen:m,toggleSidebar:h,side:C}),[b,g,m,h,C]);return n.jsx(lr.Provider,{value:N,children:n.jsx(Se,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":Ja,"--sidebar-width-icon":Wa,...a},className:c("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:p,...l,children:i})})})});nn.displayName="SidebarProvider";const rn=s.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...a},i)=>{const w=pe();return e==="none"?n.jsx("div",{className:c("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:i,...a,children:o}):n.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":w.state,"data-collapsible":w.state==="collapsed"?e:"","data-variant":t,"data-side":w.side,children:[n.jsx("div",{className:c("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:c("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",w.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...a,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});rn.displayName="Sidebar";const cr=s.forwardRef(({className:t,onClick:e,...r},o)=>{const a=pe();return n.jsxs(D,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:c("tw-h-7 tw-w-7",t),onClick:i=>{e==null||e(i),a.toggleSidebar()},...r,children:[a.side==="primary"?n.jsx(x.PanelLeft,{}):n.jsx(x.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});cr.displayName="SidebarTrigger";const dr=s.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=pe();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:c("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});dr.displayName="SidebarRail";const on=s.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:c("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));on.displayName="SidebarInset";const pr=s.forwardRef(({className:t,...e},r)=>n.jsx(Ht,{ref:r,"data-sidebar":"input",className:c("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));pr.displayName="SidebarInput";const ur=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:c("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));ur.displayName="SidebarHeader";const mr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:c("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));mr.displayName="SidebarFooter";const hr=s.forwardRef(({className:t,...e},r)=>n.jsx(Ce,{ref:r,"data-sidebar":"separator",className:c("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));hr.displayName="SidebarSeparator";const an=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:c("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));an.displayName="SidebarContent";const me=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:c("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));me.displayName="SidebarGroup";const he=s.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const a=e?zt.Slot:"div";return n.jsx(a,{ref:o,"data-sidebar":"group-label",className:c("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});he.displayName="SidebarGroupLabel";const fr=s.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const a=e?zt.Slot:"button";return n.jsx(a,{ref:o,"data-sidebar":"group-action",className:c("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});fr.displayName="SidebarGroupAction";const fe=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:c("tw-w-full tw-text-sm",t),...e}));fe.displayName="SidebarGroupContent";const sn=s.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:c("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));sn.displayName="SidebarMenu";const wn=s.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:c("tw-group/menu-item tw-relative",t),...e}));wn.displayName="SidebarMenuItem";const Za=jt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),ln=s.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:a,className:i,...w},l)=>{const p=t?zt.Slot:"button",{state:d}=pe(),u=n.jsx(p,{ref:l,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:c(Za({variant:r,size:o}),i),...w});return a?(typeof a=="string"&&(a={children:a}),n.jsxs(_e,{children:[n.jsx(Re,{asChild:!0,children:u}),n.jsx(de,{side:"right",align:"center",hidden:d!=="collapsed",...a})]})):u});ln.displayName="SidebarMenuButton";const gr=s.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},a)=>{const i=e?zt.Slot:"button";return n.jsx(i,{ref:a,"data-sidebar":"menu-action",className:c("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});gr.displayName="SidebarMenuAction";const br=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:c("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));br.displayName="SidebarMenuBadge";const xr=s.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const a=s.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:c("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(Be,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(Be,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":a}})]})});xr.displayName="SidebarMenuSkeleton";const vr=s.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:c("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));vr.displayName="SidebarMenuSub";const yr=s.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));yr.displayName="SidebarMenuSubItem";const Nr=s.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...a},i)=>{const w=t?zt.Slot:"a";return n.jsx(w,{ref:i,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:c("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...a})});Nr.displayName="SidebarMenuSubButton";function jr({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:a,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:w,buttonPlaceholderText:l,className:p}){const d=s.useCallback((m,h)=>{o(m,h)},[o]),u=s.useCallback(m=>{const h=r.find(b=>b.projectId===m);return h?h.projectName:m},[r]),g=s.useCallback(m=>!a.projectId&&m===a.label,[a]);return n.jsx(rn,{id:t,collapsible:"none",variant:"inset",className:c("tw-w-96 tw-gap-2 tw-overflow-y-auto",p),children:n.jsxs(an,{children:[n.jsxs(me,{children:[n.jsx(he,{className:"tw-text-sm",children:i}),n.jsx(fe,{children:n.jsx(sn,{children:Object.entries(e).map(([m,h])=>n.jsx(wn,{children:n.jsx(ln,{onClick:()=>d(m),isActive:g(m),children:n.jsx("span",{className:"tw-pl-3",children:h})})},m))})})]}),n.jsxs(me,{children:[n.jsx(he,{className:"tw-text-sm",children:w}),n.jsx(fe,{className:"tw-pl-3",children:n.jsx(ue,{buttonVariant:"ghost",buttonClassName:c("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":a==null?void 0:a.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(m=>m.projectId),getOptionLabel:u,buttonPlaceholder:l,onChange:m=>{const h=u(m);d(h,m)},value:(a==null?void 0:a.projectId)??void 0,icon:n.jsx(x.ScrollText,{})})})]})]})})}const Te=s.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:a,isDisabled:i=!1},w)=>{const l=Z();return n.jsxs("div",{className:c("tw-relative",{"tw-w-full":o},a),children:[n.jsx(x.Search,{className:c("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":l==="rtl"},{"tw-left-3":l==="ltr"})}),n.jsx(Ht,{ref:w,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:p=>e(p.target.value),disabled:i}),t&&n.jsxs(D,{variant:"ghost",size:"icon",className:c("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":l==="rtl"},{"tw-right-0":l==="ltr"}),onClick:()=>{e("")},children:[n.jsx(x.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});Te.displayName="SearchBar";function Qa({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:a,selectedSidebarItem:i,searchValue:w,onSearch:l,extensionsSidebarGroupLabel:p,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(Te,{className:"tw-w-9/12",value:w,onSearch:l,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(nn,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(jr,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:a,selectedSidebarItem:i,extensionsSidebarGroupLabel:p,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}),n.jsx(on,{className:"tw-min-w-[215px]",children:o})]})]})}const vt="scrBook",ts="scrRef",_t="source",es="details",ns="Scripture Reference",rs="Scripture Book",kr="Type",os="Details";function as(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:vt,header:(t==null?void 0:t.scriptureReferenceColumnName)??ns,cell:o=>{const a=o.row.original;return o.row.getIsGrouped()?O.bookIdToEnglishName(a.start.book):o.row.groupingColumnId===vt?f.formatScrRef(a.start):void 0},getGroupingValue:o=>O.bookIdToNumber(o.start.book),sortingFn:(o,a)=>f.compareScrRefs(o.original.start,a.original.start),enableGrouping:!0},{accessorFn:o=>f.formatScrRef(o.start),id:ts,header:void 0,cell:o=>{const a=o.row.original;return o.row.getIsGrouped()?void 0:f.formatScrRef(a.start)},sortingFn:(o,a)=>f.compareScrRefs(o.original.start,a.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:_t,header:r?(t==null?void 0:t.typeColumnName)??kr:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,a)=>o.original.source.displayName.localeCompare(a.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:es,header:(t==null?void 0:t.detailsColumnName)??os,cell:o=>o.getValue(),enableGrouping:!1}]}const ss=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||f.compareScrRefs(t.start,t.end)===0?`${f.scrRefToBBBCCCVVV(t.start)}+${e}`:`${f.scrRefToBBBCCCVVV(t.start)}+${e}-${f.scrRefToBBBCCCVVV(t.end)}+${r}`},jn=t=>`${ss({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function is({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:a,typeColumnName:i,detailsColumnName:w,onRowSelected:l}){const[p,d]=s.useState([]),[u,g]=s.useState([{id:vt,desc:!1}]),[m,h]=s.useState({}),b=s.useMemo(()=>t.flatMap(k=>k.data.map(T=>({...T,source:k.source}))),[t]),v=s.useMemo(()=>as({scriptureReferenceColumnName:o,typeColumnName:i,detailsColumnName:w},r),[o,i,w,r]);s.useEffect(()=>{p.includes(_t)?g([{id:_t,desc:!1},{id:vt,desc:!1}]):g([{id:vt,desc:!1}])},[p]);const y=et.useReactTable({data:b,columns:v,state:{grouping:p,sorting:u,rowSelection:m},onGroupingChange:d,onSortingChange:g,onRowSelectionChange:h,getExpandedRowModel:et.getExpandedRowModel(),getGroupedRowModel:et.getGroupedRowModel(),getCoreRowModel:et.getCoreRowModel(),getSortedRowModel:et.getSortedRowModel(),getRowId:jn,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});s.useEffect(()=>{if(l){const k=y.getSelectedRowModel().rowsById,T=Object.keys(k);if(T.length===1){const Q=b.find(P=>jn(P)===T[0])||void 0;Q&&l(Q)}}},[m,b,l,y]);const C=a??rs,N=i??kr,V=[{label:"No Grouping",value:[]},{label:`Group by ${C}`,value:[vt]},{label:`Group by ${N}`,value:[_t]},{label:`Group by ${C} and ${N}`,value:[vt,_t]},{label:`Group by ${N} and ${C}`,value:[_t,vt]}],A=k=>{d(JSON.parse(k))},U=(k,T)=>{!k.getIsGrouped()&&!k.getIsSelected()&&k.getToggleSelectedHandler()(T)},G=(k,T)=>k.getIsGrouped()?"":c("banded-row",T%2===0?"even":"odd"),mt=(k,T,Q)=>{if(!((k==null?void 0:k.length)===0||T.depth<Q.column.getGroupedIndex())){if(T.getIsGrouped())switch(T.depth){case 1:return"tw-ps-4";default:return}switch(T.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(Et,{value:JSON.stringify(p),onValueChange:k=>{A(k)},children:[n.jsx(yt,{className:"tw-mb-1 tw-mt-2",children:n.jsx(Dt,{})}),n.jsx(Nt,{position:"item-aligned",children:n.jsx(Un,{children:V.map(k=>n.jsx(wt,{value:JSON.stringify(k.value),children:k.label},k.label))})})]}),n.jsxs(we,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(le,{children:y.getHeaderGroups().map(k=>n.jsx(bt,{children:k.headers.filter(T=>T.column.columnDef.header).map(T=>n.jsx(At,{colSpan:T.colSpan,className:"top-0 tw-sticky",children:T.isPlaceholder?void 0:n.jsxs("div",{children:[T.column.getCanGroup()?n.jsx(D,{variant:"ghost",title:`Toggle grouping by ${T.column.columnDef.header}`,onClick:T.column.getToggleGroupingHandler(),type:"button",children:T.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",et.flexRender(T.column.columnDef.header,T.getContext())]})},T.id))},k.id))}),n.jsx(ce,{children:y.getRowModel().rows.map((k,T)=>{const Q=Z();return n.jsx(bt,{"data-state":k.getIsSelected()?"selected":"",className:c(G(k,T)),onClick:P=>U(k,P),children:k.getVisibleCells().map(P=>{if(!(P.getIsPlaceholder()||P.column.columnDef.enableGrouping&&!P.getIsGrouped()&&(P.column.columnDef.id!==_t||!r)))return n.jsx(Vt,{className:c(P.column.columnDef.id,"tw-p-[1px]",mt(p,k,P)),children:P.getIsGrouped()?n.jsxs(D,{variant:"link",onClick:k.getToggleExpandedHandler(),type:"button",children:[k.getIsExpanded()&&n.jsx(x.ChevronDown,{}),!k.getIsExpanded()&&(Q==="ltr"?n.jsx(x.ChevronRight,{}):n.jsx(x.ChevronLeft,{}))," ",et.flexRender(P.column.columnDef.cell,P.getContext())," (",k.subRows.length,")"]}):et.flexRender(P.column.columnDef.cell,P.getContext())},P.id)})},k.id)})})]})]})}const cn=(t,e)=>t.filter(r=>{try{return f.getSectionForBook(r)===e}catch{return!1}}),Cr=(t,e,r)=>cn(t,e).every(o=>r.includes(o));function ws({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:a}){const i=cn(e,t).length===0,w=a["%scripture_section_ot_short%"],l=a["%scripture_section_nt_short%"],p=a["%scripture_section_dc_short%"],d=a["%scripture_section_extra_short%"];return n.jsx(D,{variant:"outline",size:"sm",onClick:()=>o(t),className:c(Cr(e,t,r)&&!i&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:i,children:ua(t,w,l,p,d)})}const kn=5,Ve=6;function ls({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:a}){const i=o["%webView_book_selector_books_selected%"],w=o["%webView_book_selector_select_books%"],l=o["%webView_book_selector_search_books%"],p=o["%webView_book_selector_select_all%"],d=o["%webView_book_selector_clear_all%"],u=o["%webView_book_selector_no_book_found%"],g=o["%webView_book_selector_more%"],{otLong:m,ntLong:h,dcLong:b,extraLong:v}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[y,C]=s.useState(!1),[N,V]=s.useState(""),A=s.useRef(void 0),U=s.useRef(!1);if(t.length!==O.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const G=s.useMemo(()=>O.allBookIds.filter((R,J)=>t[J]==="1"&&!O.isObsolete(O.bookIdToNumber(R))),[t]),mt=s.useMemo(()=>{if(!N.trim()){const $={[f.Section.OT]:[],[f.Section.NT]:[],[f.Section.DC]:[],[f.Section.Extra]:[]};return G.forEach(z=>{const _=f.getSectionForBook(z);$[_].push(z)}),$}const R=G.filter($=>f.doesBookMatchQuery($,N,a)),J={[f.Section.OT]:[],[f.Section.NT]:[],[f.Section.DC]:[],[f.Section.Extra]:[]};return R.forEach($=>{const z=f.getSectionForBook($);J[z].push($)}),J},[G,N,a]),k=s.useCallback((R,J=!1)=>{if(!J||!A.current){r(e.includes(R)?e.filter(K=>K!==R):[...e,R]),A.current=R;return}const $=G.findIndex(K=>K===A.current),z=G.findIndex(K=>K===R);if($===-1||z===-1)return;const[_,Y]=[Math.min($,z),Math.max($,z)],nt=G.slice(_,Y+1).map(K=>K);r(e.includes(R)?e.filter(K=>!nt.includes(K)):[...new Set([...e,...nt])])},[e,r,G]),T=R=>{k(R,U.current),U.current=!1},Q=(R,J)=>{R.preventDefault(),k(J,R.shiftKey)},P=s.useCallback(R=>{const J=cn(G,R).map($=>$);r(Cr(G,R,e)?e.filter($=>!J.includes($)):[...new Set([...e,...J])])},[e,r,G]),S=()=>{r(G.map(R=>R))},qt=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(f.Section).map(R=>n.jsx(ws,{section:R,availableBookIds:G,selectedBookIds:e,onToggle:P,localizedStrings:o},R))}),n.jsxs(Xt,{open:y,onOpenChange:R=>{C(R),R||V("")},children:[n.jsx(Kt,{asChild:!0,children:n.jsxs(D,{variant:"outline",role:"combobox","aria-expanded":y,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${i}: ${e.length}`:w,n.jsx(x.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Ot,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(Bt,{shouldFilter:!1,onKeyDown:R=>{R.key==="Enter"&&(U.current=R.shiftKey)},children:[n.jsx(Ft,{placeholder:l,value:N,onValueChange:V}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(D,{variant:"ghost",size:"sm",onClick:S,children:p}),n.jsx(D,{variant:"ghost",size:"sm",onClick:qt,children:d})]}),n.jsxs(Gt,{children:[n.jsx(ae,{children:u}),Object.values(f.Section).map((R,J)=>{const $=mt[R];if($.length!==0)return n.jsxs(s.Fragment,{children:[n.jsx(Tt,{heading:zn(R,m,h,b,v),children:$.map(z=>n.jsx(Bn,{bookId:z,isSelected:e.includes(z),onSelect:()=>T(z),onMouseDown:_=>Q(_,z),section:f.getSectionForBook(z),showCheck:!0,localizedBookNames:a,commandValue:Le(z,a),className:"tw-flex tw-items-center"},z))}),J<Object.values(f.Section).length-1&&n.jsx(En,{})]},R)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===Ve?Ve:kn).map(R=>n.jsx(re,{className:"hover:tw-bg-secondary",variant:"secondary",children:Pt(R,a)},R)),e.length>Ve&&n.jsx(re,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-kn} ${g}`})]})]})}const cs=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),Ct=(t,e)=>t[e]??e;function ds({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:a,onSelectedBookIdsChange:i,localizedStrings:w,localizedBookNames:l}){const p=Ct(w,"%webView_scope_selector_selected_text%"),d=Ct(w,"%webView_scope_selector_current_verse%"),u=Ct(w,"%webView_scope_selector_current_chapter%"),g=Ct(w,"%webView_scope_selector_current_book%"),m=Ct(w,"%webView_scope_selector_choose_books%"),h=Ct(w,"%webView_scope_selector_scope%"),b=Ct(w,"%webView_scope_selector_select_books%"),v=[{value:"selectedText",label:p,id:"scope-selected-text"},{value:"verse",label:d,id:"scope-verse"},{value:"chapter",label:u,id:"scope-chapter"},{value:"book",label:g,id:"scope-book"},{value:"selectedBooks",label:m,id:"scope-selected"}],y=e?v.filter(C=>e.includes(C.value)):v;return n.jsxs("div",{className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(q,{children:h}),n.jsx(xe,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:y.map(({value:C,label:N,id:V})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ee,{className:"tw-me-2",value:C,id:V}),n.jsx(q,{htmlFor:V,children:N})]},V))})]}),t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(q,{children:b}),n.jsx(ls,{availableBookInfo:o,selectedBookIds:a,onChangeSelectedBookIds:i,localizedStrings:w,localizedBookNames:l})]})]})}const Ie={[f.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[f.getLocalizeKeyForScrollGroupId(0)]:"A",[f.getLocalizeKeyForScrollGroupId(1)]:"B",[f.getLocalizeKeyForScrollGroupId(2)]:"C",[f.getLocalizeKeyForScrollGroupId(3)]:"D",[f.getLocalizeKeyForScrollGroupId(4)]:"E",[f.getLocalizeKeyForScrollGroupId(5)]:"F",[f.getLocalizeKeyForScrollGroupId(6)]:"G",[f.getLocalizeKeyForScrollGroupId(7)]:"H",[f.getLocalizeKeyForScrollGroupId(8)]:"I",[f.getLocalizeKeyForScrollGroupId(9)]:"J",[f.getLocalizeKeyForScrollGroupId(10)]:"K",[f.getLocalizeKeyForScrollGroupId(11)]:"L",[f.getLocalizeKeyForScrollGroupId(12)]:"M",[f.getLocalizeKeyForScrollGroupId(13)]:"N",[f.getLocalizeKeyForScrollGroupId(14)]:"O",[f.getLocalizeKeyForScrollGroupId(15)]:"P",[f.getLocalizeKeyForScrollGroupId(16)]:"Q",[f.getLocalizeKeyForScrollGroupId(17)]:"R",[f.getLocalizeKeyForScrollGroupId(18)]:"S",[f.getLocalizeKeyForScrollGroupId(19)]:"T",[f.getLocalizeKeyForScrollGroupId(20)]:"U",[f.getLocalizeKeyForScrollGroupId(21)]:"V",[f.getLocalizeKeyForScrollGroupId(22)]:"W",[f.getLocalizeKeyForScrollGroupId(23)]:"X",[f.getLocalizeKeyForScrollGroupId(24)]:"Y",[f.getLocalizeKeyForScrollGroupId(25)]:"Z"};function ps({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:a="sm",className:i}){const w={...Ie,...Object.fromEntries(Object.entries(o).map(([p,d])=>[p,p===d&&p in Ie?Ie[p]:d]))},l=Z();return n.jsxs(Et,{value:`${e}`,onValueChange:p=>r(p==="undefined"?void 0:parseInt(p,10)),children:[n.jsx(yt,{size:a,className:c("pr-twp tw-w-auto",i),children:n.jsx(Dt,{placeholder:w[f.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(Nt,{align:l==="rtl"?"end":"start",style:{zIndex:250},children:t.map(p=>n.jsx(wt,{value:`${p}`,children:w[f.getLocalizeKeyForScrollGroupId(p)]},`${p}`))})]})}function us({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function ms({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:a}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:a}):n.jsx("div",{children:r})]})}function hs({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(Ce,{}):""]})}function Sr(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function ge({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:c("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const _r=(t,e,r,o)=>r?Object.entries(t).filter(([i,w])=>"column"in w&&w.column===r||i===r).sort(([,i],[,w])=>i.order-w.order).flatMap(([i])=>e.filter(l=>l.group===i).sort((l,p)=>l.order-p.order).map(l=>n.jsxs(_e,{children:[n.jsx(Re,{asChild:!0,children:"command"in l?n.jsxs(We,{onClick:()=>{o(l)},children:[l.iconPathBefore&&n.jsx(ge,{icon:l.iconPathBefore,menuLabel:l.label,leading:!0}),l.label,l.iconPathAfter&&n.jsx(ge,{icon:l.iconPathAfter,menuLabel:l.label})]},`dropdown-menu-item-${l.label}-${l.command}`):n.jsxs(Kn,{children:[n.jsx(Ye,{children:l.label}),n.jsx(Xn,{children:n.jsx(Je,{children:_r(t,e,Sr(t,l.id),o)})})]},`dropdown-menu-sub-${l.label}-${l.id}`)}),l.tooltip&&n.jsx(de,{children:l.tooltip})]},`tooltip-${l.label}-${"command"in l?l.command:l.id}`))):void 0;function Fe({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:a,variant:i,id:w}){return n.jsxs(ve,{variant:i,children:[n.jsx(qe,{"aria-label":r,className:a,asChild:!0,id:w,children:n.jsx(D,{variant:"ghost",size:"icon",children:o??n.jsx(x.MenuIcon,{})})}),n.jsx(se,{align:"start",className:"tw-z-[250]",children:Object.entries(e.columns).filter(([,l])=>typeof l=="object").sort(([,l],[,p])=>typeof l=="boolean"||typeof p=="boolean"?0:l.order-p.order).map(([l],p,d)=>n.jsxs(s.Fragment,{children:[n.jsx(Ue,{children:n.jsx(Se,{children:_r(e.groups,e.items,l,t)})}),p<d.length-1&&n.jsx(ie,{})]},l))})]})}function fs({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:a,className:i,startAreaChildren:w,centerAreaChildren:l,endAreaChildren:p}){return n.jsxs("div",{className:c("tw-box-border tw-flex tw-h-12 tw-w-full tw-flex-row tw-items-start tw-justify-between tw-overflow-clip tw-border-b tw-border-border tw-text-foreground tw-@container/toolbar *:tw-p-2",i),id:a,children:[r&&n.jsx("div",{children:n.jsx(Fe,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:n.jsx(x.Menu,{}),className:"tw-h-8 tw-w-8"})}),w&&n.jsx("div",{className:"tw-flex tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:w}),l&&n.jsx("div",{className:"tw-flex tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:l}),n.jsxs("div",{className:"tw-flex tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[o&&n.jsx("div",{children:n.jsx(Fe,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(x.EllipsisVertical,{}),className:"tw-h-8"})}),p]})]})}const dn=s.forwardRef(({className:t,...e},r)=>{const o=Z();return n.jsx(st.Root,{orientation:"vertical",ref:r,className:c("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});dn.displayName=st.List.displayName;const pn=s.forwardRef(({className:t,...e},r)=>n.jsx(st.List,{ref:r,className:c("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));pn.displayName=st.List.displayName;const Rr=s.forwardRef(({className:t,...e},r)=>n.jsx(st.Trigger,{ref:r,...e,className:c("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),un=s.forwardRef(({className:t,...e},r)=>n.jsx(st.Content,{ref:r,className:c("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));un.displayName=st.Content.displayName;function gs({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:a,searchClassName:i}){return n.jsxs("div",{className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[a?n.jsx("h1",{children:a}):"",n.jsx(Te,{className:i,value:e,onSearch:r,placeholder:o})]}),n.jsxs(dn,{children:[n.jsx(pn,{children:t.map(w=>n.jsx(Rr,{value:w.value,children:w.value},w.key))}),t.map(w=>n.jsx(un,{value:w.value,children:w.content},w.key))]})]})}function bs({...t}){return n.jsx(B.Menu,{...t})}function xs({...t}){return n.jsx(B.Sub,{"data-slot":"menubar-sub",...t})}const Tr=s.forwardRef(({className:t,variant:e="default",...r},o)=>{const a=s.useMemo(()=>({variant:e}),[e]);return n.jsx(He.Provider,{value:a,children:n.jsx(B.Root,{ref:o,className:c("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Tr.displayName=B.Root.displayName;const Mr=s.forwardRef(({className:t,...e},r)=>{const o=ct();return n.jsx(B.Trigger,{ref:r,className:c("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",xt({variant:o.variant,className:t})),...e})});Mr.displayName=B.Trigger.displayName;const Er=s.forwardRef(({className:t,inset:e,children:r,...o},a)=>{const i=ct();return n.jsxs(B.SubTrigger,{ref:a,className:c("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",xt({variant:i.variant,className:t}),t),...o,children:[r,n.jsx(x.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Er.displayName=B.SubTrigger.displayName;const Dr=s.forwardRef(({className:t,...e},r)=>{const o=ct();return n.jsx(B.SubContent,{ref:r,className:c("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});Dr.displayName=B.SubContent.displayName;const Vr=s.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...a},i)=>{const w=ct();return n.jsx(B.Portal,{children:n.jsx(B.Content,{ref:i,align:e,alignOffset:r,sideOffset:o,className:c("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":w.variant==="muted"},t),...a})})});Vr.displayName=B.Content.displayName;const Ir=s.forwardRef(({className:t,inset:e,...r},o)=>{const a=ct();return n.jsx(B.Item,{ref:o,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",xt({variant:a.variant,className:t}),t),...r})});Ir.displayName=B.Item.displayName;const vs=s.forwardRef(({className:t,children:e,checked:r,...o},a)=>{const i=ct();return n.jsxs(B.CheckboxItem,{ref:a,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",xt({variant:i.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(B.ItemIndicator,{children:n.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});vs.displayName=B.CheckboxItem.displayName;const ys=s.forwardRef(({className:t,children:e,...r},o)=>{const a=ct();return n.jsxs(B.RadioItem,{ref:o,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",xt({variant:a.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(B.ItemIndicator,{children:n.jsx(x.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});ys.displayName=B.RadioItem.displayName;const Ns=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(B.Label,{ref:o,className:c("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Ns.displayName=B.Label.displayName;const Or=s.forwardRef(({className:t,...e},r)=>n.jsx(B.Separator,{ref:r,className:c("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Or.displayName=B.Separator.displayName;const Jt=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Pr=(t,e,r,o)=>{if(!r)return;const a=Object.entries(t).filter(([i,w])=>"column"in w&&w.column===r||i===r).sort(([,i],[,w])=>i.order-w.order);return a.flatMap(([i],w)=>{const l=e.filter(d=>d.group===i).sort((d,u)=>d.order-u.order).map(d=>n.jsxs(_e,{children:[n.jsx(Re,{asChild:!0,children:"command"in d?n.jsxs(Ir,{onClick:()=>{o(d)},children:[d.iconPathBefore&&n.jsx(ge,{icon:d.iconPathBefore,menuLabel:d.label,leading:!0}),d.label,d.iconPathAfter&&n.jsx(ge,{icon:d.iconPathAfter,menuLabel:d.label})]},`menubar-item-${d.label}-${d.command}`):n.jsxs(xs,{children:[n.jsx(Er,{children:d.label}),n.jsx(Dr,{children:Pr(t,e,Sr(t,d.id),o)})]},`menubar-sub-${d.label}-${d.id}`)}),d.tooltip&&n.jsx(de,{children:d.tooltip})]},`tooltip-${d.label}-${"command"in d?d.command:d.id}`)),p=[...l];return l.length>0&&w<a.length-1&&p.push(n.jsx(Or,{},`separator-${i}`)),p})};function js({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const a=s.useRef(void 0),i=s.useRef(void 0),w=s.useRef(void 0),l=s.useRef(void 0),p=s.useRef(void 0),d=u=>{switch(u){case"platform.app":return i;case"platform.window":return w;case"platform.layout":return l;case"platform.help":return p;default:return}};if($o.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(u,g)=>{var b,v,y,C;u.preventDefault();const m={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},h={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(g.hotkey){case"alt":Jt(i,[m]);break;case"alt+p":(b=i.current)==null||b.focus(),Jt(i,[m,h]);break;case"alt+l":(v=w.current)==null||v.focus(),Jt(w,[m,h]);break;case"alt+n":(y=l.current)==null||y.focus(),Jt(l,[m,h]);break;case"alt+h":(C=p.current)==null||C.focus(),Jt(p,[m,h]);break}}),s.useEffect(()=>{if(!r||!a.current)return;const u=new MutationObserver(h=>{h.forEach(b=>{if(b.attributeName==="data-state"&&b.target instanceof HTMLElement){const v=b.target.getAttribute("data-state");r(v==="open")}})});return a.current.querySelectorAll("[data-state]").forEach(h=>{u.observe(h,{attributes:!0})}),()=>u.disconnect()},[r]),!!t)return n.jsx(Tr,{ref:a,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,u])=>typeof u=="object").sort(([,u],[,g])=>typeof u=="boolean"||typeof g=="boolean"?0:u.order-g.order).map(([u,g])=>n.jsxs(bs,{children:[n.jsx(Mr,{ref:d(u),children:typeof g=="object"&&"label"in g&&g.label}),n.jsx(Vr,{className:"tw-z-[250]",children:n.jsx(Se,{children:Pr(t.groups,t.items,u,e)})})]},u))})}function ks(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function Cs({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:a,children:i,appMenuAreaChildren:w,configAreaChildren:l,shouldUseAsAppDragArea:p,menubarVariant:d="default"}){const u=s.useRef(void 0);return n.jsx("div",{className:c("tw-border tw-px-4 tw-text-foreground",o),ref:u,style:{position:"relative"},id:a,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:p?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:p?{WebkitAppRegion:"no-drag"}:void 0,children:[w,t&&n.jsx(js,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:d})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:p?{WebkitAppRegion:"no-drag"}:void 0,children:i}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:p?{WebkitAppRegion:"no-drag"}:void 0,children:l})})]})})}const Ss=(t,e)=>t[e]??e;function _s({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:a,onFallbackLanguagesChange:i,localizedStrings:w,className:l}){const p=Ss(w,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[d,u]=s.useState(!1),g=h=>{a&&a(h),o&&o([h,...r.filter(b=>b!==h)]),i&&r.find(b=>b===h)&&i([...r.filter(b=>b!==h)]),u(!1)},m=(h,b)=>{var y,C,N,V,A,U;const v=b!==h?((C=(y=t[h])==null?void 0:y.uiNames)==null?void 0:C[b])??((V=(N=t[h])==null?void 0:N.uiNames)==null?void 0:V.en):void 0;return v?`${(A=t[h])==null?void 0:A.autonym} (${v})`:(U=t[h])==null?void 0:U.autonym};return n.jsxs("div",{className:c("pr-twp tw-max-w-sm",l),children:[n.jsxs(Et,{name:"uiLanguage",value:e,onValueChange:g,open:d,onOpenChange:h=>u(h),children:[n.jsx(yt,{children:n.jsx(Dt,{})}),n.jsx(Nt,{className:"tw-z-[250]",children:Object.keys(t).map(h=>n.jsx(wt,{value:h,children:m(h,e)},h))})]}),e!=="en"&&n.jsxs(n.Fragment,{children:[n.jsx(q,{className:"tw-ms-3",children:p}),n.jsx("div",{className:"tw-ms-3",children:n.jsxs(q,{children:["Currently:"," ",(r==null?void 0:r.length)>0?`${r.map(h=>m(h,e)).join(", ")}`:`default (${t.en.autonym})`]})})]})]})}function Rs({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(q,{children:e(t)}):r?n.jsx(q,{children:r(t)}):n.jsx(q,{children:t})}function Ts({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:a,createLabel:i,createComplexLabel:w}){return n.jsx("div",{id:t,className:e,children:r.map(l=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(je,{className:"tw-me-2 tw-align-middle",checked:o.includes(l),onCheckedChange:p=>a(l,p)}),n.jsx(Rs,{item:l,createLabel:i,createComplexLabel:w})]},l))})}const Ar=s.forwardRef(({className:t,...e},r)=>n.jsx(x.LoaderCircle,{size:35,className:c("tw-animate-spin",t),...e,ref:r}));Ar.displayName="Spinner";function Ms({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:a,label:i,placeholder:w,isRequired:l=!1,className:p,defaultValue:d,value:u,onChange:g,onFocus:m,onBlur:h}){return n.jsxs("div",{className:c("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(q,{htmlFor:t,className:c({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${l?"*":""}`}),n.jsx(Ht,{id:t,disabled:e,placeholder:w,required:l,className:c(p,{"tw-border-red-600":r}),defaultValue:d,value:u,onChange:g,onFocus:m,onBlur:h}),n.jsx("p",{className:c({"tw-hidden":!a}),children:a})]})}const Es=jt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),zr=s.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:c(Es({variant:e}),t),...r}));zr.displayName="Alert";const Lr=s.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:c("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));Lr.displayName="AlertTitle";const Br=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:c("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));Br.displayName="AlertDescription";const Fr=s.forwardRef(({className:t,...e},r)=>n.jsx(Lt.Root,{ref:r,className:c("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));Fr.displayName=Lt.Root.displayName;const Gr=s.forwardRef(({className:t,...e},r)=>n.jsx(Lt.Image,{ref:r,className:c("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));Gr.displayName=Lt.Image.displayName;const $r=s.forwardRef(({className:t,...e},r)=>n.jsx(Lt.Fallback,{ref:r,className:c("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));$r.displayName=Lt.Fallback.displayName;const Xr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:c("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));Xr.displayName="Card";const Kr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:c("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));Kr.displayName="CardHeader";const Hr=s.forwardRef(({className:t,...e},r)=>n.jsx("h3",{ref:r,className:c("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));Hr.displayName="CardTitle";const qr=s.forwardRef(({className:t,...e},r)=>n.jsx("p",{ref:r,className:c("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));qr.displayName="CardDescription";const Ur=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:c("pr-twp tw-p-6 tw-pt-0",t),...e}));Ur.displayName="CardContent";const Yr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:c("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));Yr.displayName="CardFooter";const Ds=F.Root,Vs=F.Trigger,Is=F.Group,Os=F.Portal,Ps=F.Sub,As=F.RadioGroup,Jr=s.forwardRef(({className:t,inset:e,children:r,...o},a)=>n.jsxs(F.SubTrigger,{ref:a,className:c("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(x.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));Jr.displayName=F.SubTrigger.displayName;const Wr=s.forwardRef(({className:t,...e},r)=>n.jsx(F.SubContent,{ref:r,className:c("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));Wr.displayName=F.SubContent.displayName;const Zr=s.forwardRef(({className:t,...e},r)=>n.jsx(F.Portal,{children:n.jsx(F.Content,{ref:r,className:c("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));Zr.displayName=F.Content.displayName;const Qr=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(F.Item,{ref:o,className:c("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));Qr.displayName=F.Item.displayName;const to=s.forwardRef(({className:t,children:e,checked:r,...o},a)=>n.jsxs(F.CheckboxItem,{ref:a,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(F.ItemIndicator,{children:n.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));to.displayName=F.CheckboxItem.displayName;const eo=s.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(F.RadioItem,{ref:o,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(F.ItemIndicator,{children:n.jsx(x.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));eo.displayName=F.RadioItem.displayName;const no=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(F.Label,{ref:o,className:c("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));no.displayName=F.Label.displayName;const ro=s.forwardRef(({className:t,...e},r)=>n.jsx(F.Separator,{ref:r,className:c("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));ro.displayName=F.Separator.displayName;function oo({className:t,...e}){return n.jsx("span",{className:c("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}oo.displayName="ContextMenuShortcut";const ao=s.createContext({direction:"bottom"});function so({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=s.useMemo(()=>({direction:e}),[e]);return n.jsx(ao.Provider,{value:o,children:n.jsx(lt.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}so.displayName="Drawer";const zs=lt.Drawer.Trigger,io=lt.Drawer.Portal,Ls=lt.Drawer.Close,mn=s.forwardRef(({className:t,...e},r)=>n.jsx(lt.Drawer.Overlay,{ref:r,className:c("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));mn.displayName=lt.Drawer.Overlay.displayName;const wo=s.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},a)=>{const{direction:i="bottom"}=s.useContext(ao),w={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},l={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(io,{children:[n.jsx(mn,{}),n.jsxs(lt.Drawer.Content,{ref:a,className:c("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",i==="bottom"||i==="top"?"tw-flex-col":"tw-flex-row",w[i],t),...o,children:[!r&&(i==="bottom"||i==="right")&&n.jsx("div",{className:l[i]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(i==="top"||i==="left")&&n.jsx("div",{className:l[i]})]})]})});wo.displayName="DrawerContent";function lo({className:t,...e}){return n.jsx("div",{className:c("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}lo.displayName="DrawerHeader";function co({className:t,...e}){return n.jsx("div",{className:c("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}co.displayName="DrawerFooter";const po=s.forwardRef(({className:t,...e},r)=>n.jsx(lt.Drawer.Title,{ref:r,className:c("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));po.displayName=lt.Drawer.Title.displayName;const uo=s.forwardRef(({className:t,...e},r)=>n.jsx(lt.Drawer.Description,{ref:r,className:c("tw-text-sm tw-text-muted-foreground",t),...e}));uo.displayName=lt.Drawer.Description.displayName;const mo=s.forwardRef(({className:t,value:e,...r},o)=>n.jsx(Ae.Root,{ref:o,className:c("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx(Ae.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));mo.displayName=Ae.Root.displayName;function Bs({...t}){return n.jsx(Sn.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const ho=s.forwardRef(({className:t,...e},r)=>{const o=Z();return n.jsxs(Wt.Root,{ref:r,className:c("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(Wt.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(Wt.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(Wt.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});ho.displayName=Wt.Root.displayName;const fo=s.forwardRef(({className:t,...e},r)=>{const o=Z();return n.jsx(ze.Root,{className:c("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(ze.Thumb,{className:c("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});fo.displayName=ze.Root.displayName;const Fs=st.Root,go=s.forwardRef(({className:t,...e},r)=>{const o=Z();return n.jsx(st.List,{ref:r,className:c("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});go.displayName=st.List.displayName;const bo=s.forwardRef(({className:t,...e},r)=>n.jsx(st.Trigger,{ref:r,className:c("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));bo.displayName=st.Trigger.displayName;const xo=s.forwardRef(({className:t,...e},r)=>n.jsx(st.Content,{ref:r,className:c("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));xo.displayName=st.Content.displayName;const vo=s.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:c("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));vo.displayName="Textarea";const Gs=(t,e)=>{s.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function $s(t){return{preserveValue:!0,...t}}const yo=(t,e,r={})=>{const o=s.useRef(e);o.current=e;const a=s.useRef(r);a.current=$s(a.current);const[i,w]=s.useState(()=>o.current),[l,p]=s.useState(!0);return s.useEffect(()=>{let d=!0;return p(!!t),(async()=>{if(t){const u=await t();d&&(w(()=>u),p(!1))}})(),()=>{d=!1,a.current.preserveValue||w(()=>o.current)}},[t]),[i,l]},Oe=()=>!1,Xs=(t,e)=>{const[r]=yo(s.useCallback(async()=>{if(!t)return Oe;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),Oe,{preserveValue:!1});s.useEffect(()=>()=>{r!==Oe&&r()},[r])},Ks=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const a=s.useRef(null),[i,w]=s.useState(void 0),[l,p]=s.useState(void 0),d=s.useCallback(m=>{w(m);const h=t.find(v=>v.id===m);h&&(e==null||e(h));const b=document.getElementById(m);b&&(b.scrollIntoView({block:"center"}),b.focus()),a.current&&a.current.setAttribute("aria-activedescendant",m)},[e,t]),u=s.useCallback(m=>{const h=t.find(b=>b.id===m);h&&(p(b=>b===m?void 0:m),r==null||r(h))},[r,t]),g=s.useCallback(m=>{const h=t.findIndex(y=>y.id===i);let b=h;switch(m.key){case"ArrowDown":b=Math.min(h+1,t.length-1),m.preventDefault();break;case"ArrowUp":b=Math.max(h-1,0),m.preventDefault();break;case"Home":b=0,m.preventDefault();break;case"End":b=t.length-1,m.preventDefault();break;case" ":case"Enter":i&&u(i),m.preventDefault(),m.stopPropagation();return;default:m.key.length===1&&!m.metaKey&&!m.ctrlKey&&!m.altKey&&(o==null||o(m.key),m.preventDefault());return}const v=t[b];v&&d(v.id)},[t,d,i,u,o]);return{listboxRef:a,activeId:i,selectedId:l,handleKeyDown:g,focusOption:d}};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Sn.toast});exports.Alert=zr;exports.AlertDescription=Br;exports.AlertTitle=Lr;exports.Avatar=Fr;exports.AvatarFallback=$r;exports.AvatarImage=Gr;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=ba;exports.BOOK_SELECTOR_STRING_KEYS=ya;exports.Badge=re;exports.BookChapterControl=ga;exports.BookSelectionMode=$n;exports.BookSelector=Na;exports.Button=D;exports.Card=Xr;exports.CardContent=Ur;exports.CardDescription=qr;exports.CardFooter=Yr;exports.CardHeader=Kr;exports.CardTitle=Hr;exports.ChapterRangeSelector=Gn;exports.Checkbox=je;exports.Checklist=Ts;exports.ComboBox=ue;exports.Command=Bt;exports.CommandEmpty=ae;exports.CommandGroup=Tt;exports.CommandInput=Ft;exports.CommandItem=It;exports.CommandList=Gt;exports.ContextMenu=Ds;exports.ContextMenuCheckboxItem=to;exports.ContextMenuContent=Zr;exports.ContextMenuGroup=Is;exports.ContextMenuItem=Qr;exports.ContextMenuLabel=no;exports.ContextMenuPortal=Os;exports.ContextMenuRadioGroup=As;exports.ContextMenuRadioItem=eo;exports.ContextMenuSeparator=ro;exports.ContextMenuShortcut=oo;exports.ContextMenuSub=Ps;exports.ContextMenuSubContent=Wr;exports.ContextMenuSubTrigger=Jr;exports.ContextMenuTrigger=Vs;exports.DataTable=tr;exports.Drawer=so;exports.DrawerClose=Ls;exports.DrawerContent=wo;exports.DrawerDescription=uo;exports.DrawerFooter=co;exports.DrawerHeader=lo;exports.DrawerOverlay=mn;exports.DrawerPortal=io;exports.DrawerTitle=po;exports.DrawerTrigger=zs;exports.DropdownMenu=ve;exports.DropdownMenuCheckboxItem=ye;exports.DropdownMenuContent=se;exports.DropdownMenuGroup=Ue;exports.DropdownMenuItem=We;exports.DropdownMenuItemType=rr;exports.DropdownMenuLabel=Ne;exports.DropdownMenuPortal=Xn;exports.DropdownMenuRadioGroup=Hn;exports.DropdownMenuRadioItem=Ze;exports.DropdownMenuSeparator=ie;exports.DropdownMenuShortcut=qn;exports.DropdownMenuSub=Kn;exports.DropdownMenuSubContent=Je;exports.DropdownMenuSubTrigger=Ye;exports.DropdownMenuTrigger=qe;exports.ERROR_DUMP_STRING_KEYS=er;exports.ERROR_POPOVER_STRING_KEYS=Ma;exports.ErrorDump=nr;exports.ErrorPopover=Ea;exports.Filter=Pa;exports.FilterDropdown=Da;exports.Footer=Oa;exports.INVENTORY_STRING_KEYS=Ha;exports.Input=Ht;exports.Inventory=Ya;exports.Label=q;exports.MarkdownRenderer=Ta;exports.MoreInfo=Va;exports.MultiSelectComboBox=ar;exports.NavigationContentSearch=gs;exports.Popover=Xt;exports.PopoverContent=Ot;exports.PopoverTrigger=Kt;exports.Progress=mo;exports.RadioGroup=xe;exports.RadioGroupItem=ee;exports.SCOPE_SELECTOR_STRING_KEYS=cs;exports.ScopeSelector=ds;exports.ScriptureResultsViewer=is;exports.ScrollGroupSelector=ps;exports.SearchBar=Te;exports.Select=Et;exports.SelectContent=Nt;exports.SelectGroup=Un;exports.SelectItem=wt;exports.SelectLabel=Jn;exports.SelectScrollDownButton=tn;exports.SelectScrollUpButton=Qe;exports.SelectSeparator=Wn;exports.SelectTrigger=yt;exports.SelectValue=Dt;exports.Separator=Ce;exports.SettingsList=us;exports.SettingsListHeader=hs;exports.SettingsListItem=ms;exports.SettingsSidebar=jr;exports.SettingsSidebarContentSearch=Qa;exports.Sidebar=rn;exports.SidebarContent=an;exports.SidebarFooter=mr;exports.SidebarGroup=me;exports.SidebarGroupAction=fr;exports.SidebarGroupContent=fe;exports.SidebarGroupLabel=he;exports.SidebarHeader=ur;exports.SidebarInput=pr;exports.SidebarInset=on;exports.SidebarMenu=sn;exports.SidebarMenuAction=gr;exports.SidebarMenuBadge=br;exports.SidebarMenuButton=ln;exports.SidebarMenuItem=wn;exports.SidebarMenuSkeleton=xr;exports.SidebarMenuSub=vr;exports.SidebarMenuSubButton=Nr;exports.SidebarMenuSubItem=yr;exports.SidebarProvider=nn;exports.SidebarRail=dr;exports.SidebarSeparator=hr;exports.SidebarTrigger=cr;exports.Skeleton=Be;exports.Slider=ho;exports.Sonner=Bs;exports.Spinner=Ar;exports.Switch=fo;exports.TabDropdownMenu=Fe;exports.TabToolbar=fs;exports.Table=we;exports.TableBody=ce;exports.TableCaption=Qn;exports.TableCell=Vt;exports.TableFooter=Zn;exports.TableHead=At;exports.TableHeader=le;exports.TableRow=bt;exports.Tabs=Fs;exports.TabsContent=xo;exports.TabsList=go;exports.TabsTrigger=bo;exports.TextField=Ms;exports.Textarea=vo;exports.ToggleGroup=en;exports.ToggleGroupItem=Zt;exports.Toolbar=Cs;exports.Tooltip=_e;exports.TooltipContent=de;exports.TooltipProvider=Se;exports.TooltipTrigger=Re;exports.UiLanguageSelector=_s;exports.VerticalTabs=dn;exports.VerticalTabsContent=un;exports.VerticalTabsList=pn;exports.VerticalTabsTrigger=Rr;exports.badgeVariants=or;exports.buttonVariants=Fn;exports.cn=c;exports.getBookIdFromUSFM=Ka;exports.getLinesFromUSFM=$a;exports.getNumberFromUSFM=Xa;exports.getStatusForItem=wr;exports.getToolbarOSReservedSpaceClassName=ks;exports.inventoryCountColumn=Fa;exports.inventoryItemColumn=La;exports.inventoryStatusColumn=Ga;exports.selectTriggerVariants=Yn;exports.useEvent=Gs;exports.useEventAsync=Xs;exports.useListbox=Ks;exports.usePromise=yo;exports.useSidebar=pe;function Hs(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),a=document.createElement("style");a.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(a,o):r.appendChild(a)}Hs(`*, ::before, ::after {
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

  /* using color palette https://supercolorpalette.com/?scp=G0-hsl-99827A-E7DDD0-FEF4E7-FEFAF1-FFFFFF-D8E9E3-719892-07463D-0A433D-083030-041616-000000-85DBB8-F2F52E-CD3737 */
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
.tw-ms-3 {
  margin-inline-start: 0.75rem;
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
.tw-h-10 {
  height: 2.5rem;
}
.tw-h-11 {
  height: 2.75rem;
}
.tw-h-12 {
  height: 3rem;
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
.tw-h-\\[100px\\] {
  height: 100px;
}
.tw-h-\\[1px\\] {
  height: 1px;
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
.tw-w-full {
  width: 100%;
}
.tw-min-w-0 {
  min-width: 0px;
}
.tw-min-w-16 {
  min-width: 4rem;
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
.tw-grid-cols-5 {
  grid-template-columns: repeat(5, minmax(0, 1fr));
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
.tw-rounded-l-\\[10px\\] {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.tw-rounded-r-\\[10px\\] {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
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
.tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
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
.tw-bg-orange-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 247 237 / var(--tw-bg-opacity, 1));
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
.tw-fill-yellow-400 {
  fill: #facc15;
}
.tw-fill-yellow-400\\/50 {
  fill: rgb(250 204 21 / 0.5);
}
.tw-p-0 {
  padding: 0px;
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
.\\*\\:tw-p-2 > * {
  padding: 0.5rem;
}
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
.after\\:tw-w-\\[2px\\]::after {
  content: var(--tw-content);
  width: 2px;
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
.tw-group:hover .group-hover\\:tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
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
`,"after-all");
//# sourceMappingURL=index.cjs.map
