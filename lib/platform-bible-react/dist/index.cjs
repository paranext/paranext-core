"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const c=require("react/jsx-runtime"),T=require("react"),le=require("lucide-react"),Se=require("clsx"),Ql=require("tailwind-merge"),ys=require("@radix-ui/react-dropdown-menu"),Je=require("platform-bible-utils"),Ce=require("@tanstack/react-table"),ec=require("@radix-ui/react-slot"),yo=require("class-variance-authority"),tc=require("@radix-ui/react-select"),ke=require("@mui/material"),nc=require("@radix-ui/react-popover"),Ie=require("cmdk"),rc=require("@radix-ui/react-dialog"),no=require("@mui/styled-engine"),xn=require("react-dom"),oc=require("@radix-ui/react-label"),ac=require("@radix-ui/react-tabs"),sc=require("@radix-ui/react-slider"),ic=require("@radix-ui/react-switch");function nt(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const N=nt(T),he=nt(ys),ye=nt(tc),Pn=nt(nc),Qe=nt(rc),lc=nt(xn),ws=nt(oc),De=nt(ac),kn=nt(sc),ro=nt(ic);const cc=Ql.extendTailwindMerge({prefix:"pr-"});function F(...e){return cc(Se.clsx(e))}const Ln=T.forwardRef(({className:e,type:t,...n},r)=>c.jsx("input",{type:t,className:F("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));Ln.displayName="Input";const pc=T.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},a)=>c.jsxs("div",{className:"pr-relative",children:[c.jsx(Ln,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r(),t(s)},onClick:n,ref:a}),c.jsx(le.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));var dc=Object.defineProperty,uc=(e,t,n)=>t in e?dc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t,n)=>uc(e,typeof t!="symbol"?t+"":t,n);const Mt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],wo=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],xs=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],fa=kc();function an(e,t=!0){return t&&(e=e.toUpperCase()),e in fa?fa[e]:0}function xo(e){return an(e)>0}function fc(e){const t=typeof e=="string"?an(e):e;return t>=40&&t<=66}function mc(e){return(typeof e=="string"?an(e):e)<=39}function ks(e){return e<=66}function hc(e){const t=typeof e=="string"?an(e):e;return Ns(t)&&!ks(t)}function*gc(){for(let e=1;e<=Mt.length;e++)yield e}const bc=1,Es=Mt.length;function vc(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function ko(e,t="***"){const n=e-1;return n<0||n>=Mt.length?t:Mt[n]}function Ts(e){return e<=0||e>Es?"******":xs[e-1]}function yc(e){return Ts(an(e))}function Ns(e){const t=typeof e=="number"?ko(e):e;return xo(t)&&!wo.includes(t)}function wc(e){const t=typeof e=="number"?ko(e):e;return xo(t)&&wo.includes(t)}function xc(e){return xs[e-1].includes("*obsolete*")}function kc(){const e={};for(let t=0;t<Mt.length;t++)e[Mt[t]]=t+1;return e}const fe={allBookIds:Mt,nonCanonicalIds:wo,bookIdToNumber:an,isBookIdValid:xo,isBookNT:fc,isBookOT:mc,isBookOTNT:ks,isBookDC:hc,allBookNumbers:gc,firstBook:bc,lastBook:Es,extraBooks:vc,bookNumberToId:ko,bookNumberToEnglishName:Ts,bookIdToEnglishName:yc,isCanonical:Ns,isExtraMaterial:wc,isObsolete:xc};var Ke=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ke||{});const Le=class{constructor(t){if(re(this,"name"),re(this,"fullPath"),re(this,"isPresent"),re(this,"hasVerseSegments"),re(this,"isCustomized"),re(this,"baseVersification"),re(this,"scriptureBooks"),re(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Ke[t]):(this._type=t,this.name=Ke[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};re(Le,"Original",new Le(Ke.Original)),re(Le,"Septuagint",new Le(Ke.Septuagint)),re(Le,"Vulgate",new Le(Ke.Vulgate)),re(Le,"English",new Le(Ke.English)),re(Le,"RussianProtestant",new Le(Ke.RussianProtestant)),re(Le,"RussianOrthodox",new Le(Ke.RussianOrthodox));let St=Le;function ma(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var Ss=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Ss||{});const $e=class ie{constructor(t,n,r,o){if(re(this,"firstChapter"),re(this,"lastChapter"),re(this,"lastVerse"),re(this,"hasSegmentsDefined"),re(this,"text"),re(this,"BBBCCCVVVS"),re(this,"longHashCode"),re(this,"versification"),re(this,"rtlMark","‏"),re(this,"_bookNum",0),re(this,"_chapterNum",0),re(this,"_verseNum",0),re(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const a=t,s=n!=null&&n instanceof St?n:void 0;this.setEmpty(s),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=n!=null&&n instanceof St?n:void 0;this.setEmpty(a),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ie){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof St?t:ie.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new ie(t),{success:!0,verseRef:n}}catch(r){if(r instanceof mn)return n=new ie,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ie.bcvMaxValue*ie.bookDigitShifter+(n>=0?n%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(r>=0?r%ie.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:a,versificationStr:s}=t,l=a||o.toString();let p;return s&&(p=new St(s)),n?new ie(n,r.toString(),l,p):new ie}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>ie.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return fe.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=fe.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ie.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>fe.lastBook)throw new mn("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new St(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const s=+a[1].trim();this.versification=new St(Ke[s])}catch{throw new mn("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new mn("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||fe.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(r[1]))throw new mn("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete n.verse,n}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=ie.verseRangeSeparators,r=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=ma(this._verse,r);for(const s of a.map(l=>ma(l,n))){const l=this.clone();l.verse=s[0];const p=l.verseNum;if(o.push(l),s.length>1){const f=this.clone();if(f.verse=s[1],!t)for(let m=p+1;m<f.verseNum;m++){const v=new ie(this._bookNum,this._chapterNum,m,this.versification);this.isExcluded||o.push(v)}o.push(f)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const a=o.internalValid;if(a!==0)return a;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>fe.lastBook?2:(fe.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=fe.bookIdToNumber(t),this.chapter=n,this.verse=r}};re($e,"defaultVersification",St.English),re($e,"verseRangeSeparator","-"),re($e,"verseSequenceIndicator",","),re($e,"verseRangeSeparators",[$e.verseRangeSeparator]),re($e,"verseSequenceIndicators",[$e.verseSequenceIndicator]),re($e,"chapterDigitShifter",1e3),re($e,"bookDigitShifter",$e.chapterDigitShifter*$e.chapterDigitShifter),re($e,"bcvMaxValue",$e.chapterDigitShifter-1),re($e,"ValidStatusType",Ss);let mn=class extends Error{};const wr=he.Root,Eo=he.Trigger,Cs=he.Group,Ec=he.Portal,Tc=he.Sub,Nc=he.RadioGroup,Os=T.forwardRef(({className:e,inset:t,children:n,...r},o)=>c.jsxs(he.SubTrigger,{ref:o,className:F("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,c.jsx(le.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Os.displayName=he.SubTrigger.displayName;const Rs=T.forwardRef(({className:e,...t},n)=>c.jsx(he.SubContent,{ref:n,className:F("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));Rs.displayName=he.SubContent.displayName;const Vn=T.forwardRef(({className:e,sideOffset:t=4,...n},r)=>c.jsx(he.Portal,{children:c.jsx(he.Content,{ref:r,sideOffset:t,className:F("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));Vn.displayName=he.Content.displayName;const To=T.forwardRef(({className:e,inset:t,...n},r)=>c.jsx(he.Item,{ref:r,className:F("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));To.displayName=he.Item.displayName;const xr=T.forwardRef(({className:e,children:t,checked:n,...r},o)=>c.jsxs(he.CheckboxItem,{ref:o,className:F("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[c.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:c.jsx(he.ItemIndicator,{children:c.jsx(le.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));xr.displayName=he.CheckboxItem.displayName;const No=T.forwardRef(({className:e,children:t,...n},r)=>c.jsxs(he.RadioItem,{ref:r,className:F("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[c.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:c.jsx(he.ItemIndicator,{children:c.jsx(le.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));No.displayName=he.RadioItem.displayName;const sn=T.forwardRef(({className:e,inset:t,...n},r)=>c.jsx(he.Label,{ref:r,className:F("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));sn.displayName=he.Label.displayName;const Fn=T.forwardRef(({className:e,...t},n)=>c.jsx(he.Separator,{ref:n,className:F("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Fn.displayName=he.Separator.displayName;function js({className:e,...t}){return c.jsx("span",{className:F("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}js.displayName="DropdownMenuShortcut";const Sc=T.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:a,children:s},l)=>c.jsxs(To,{ref:l,textValue:e,className:F("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:p=>{p.preventDefault(),t()},onKeyDown:p=>{o(p)},onFocus:r,onMouseMove:r,children:[c.jsx("span",{className:F("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":a.toLowerCase()==="ot","pr-border-l-purple-200":a.toLowerCase()==="nt","pr-border-l-indigo-200":a.toLowerCase()==="dc"}),children:fe.bookIdToEnglishName(e)}),n&&c.jsx("div",{children:s})]},e));function Cc({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const a=Array.from({length:t},(l,p)=>p+1),s=T.useCallback(l=>{o(l)},[o]);return c.jsx("div",{className:F("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:a.map(l=>c.jsx("div",{className:F("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===n,"pr-bg-amber-200":l===r}),onClick:p=>{p.preventDefault(),p.stopPropagation(),e(l)},role:"button",onKeyDown:p=>{p.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>s(l),children:l},l))})}function Oc({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return c.jsxs(sn,{className:"pr-flex pr-justify-between",children:[c.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),c.jsxs("div",{className:"pr-flex pr-items-center",children:[c.jsx(le.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),c.jsx(le.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),c.jsx(le.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const Sn=fe.allBookIds,Rc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ha=["OT","NT","DC"],jc=32+32+32,Pc=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],$c=e=>({OT:Sn.filter(n=>fe.isBookOT(n)),NT:Sn.filter(n=>fe.isBookNT(n)),DC:Sn.filter(n=>fe.isBookDC(n))})[e],hn=e=>Je.getChaptersForBook(fe.bookIdToNumber(e));function _c(){return Sn.map(t=>fe.bookIdToEnglishName(t))}function Mc(e){return _c().includes(e)}function Ic(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(Mc(t))return Sn.find(r=>fe.bookIdToEnglishName(r)===t)}function Dc({scrRef:e,handleSubmit:t}){const[n,r]=T.useState(""),[o,a]=T.useState(fe.bookNumberToId(e.bookNum)),[s,l]=T.useState(e.chapterNum??0),[p,f]=T.useState(fe.bookNumberToId(e.bookNum)),[m,v]=T.useState(!1),[g,d]=T.useState(m),h=T.useRef(void 0),u=T.useRef(void 0),b=T.useRef(void 0),x=T.useCallback(E=>$c(E).filter(O=>{const $=fe.bookIdToEnglishName(O).toLowerCase(),z=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return $.includes(z)||O.toLowerCase().includes(z)}),[n]),R=E=>{r(E)},w=T.useRef(!1),k=T.useCallback(E=>{if(w.current){w.current=!1;return}v(E)},[]),y=T.useCallback((E,O,$,z)=>{if(l(fe.bookNumberToId(e.bookNum)!==E?1:e.chapterNum),O||hn(E)===-1){t({bookNum:fe.bookIdToNumber(E),chapterNum:$||1,verseNum:z||1}),v(!1),r("");return}a(o!==E?E:""),v(!O)},[t,e.bookNum,e.chapterNum,o]),S=E=>{E<=0||E>hn(o)||y(o,!0,E)},C=T.useCallback(()=>{Pc.forEach(E=>{const O=n.match(E);if(O){const[$,z=void 0,H=void 0]=O.slice(1),A=Ic($);(fe.isBookIdValid($)||A)&&y(A??$,!0,z?parseInt(z,10):1,H?parseInt(H,10):1)}})},[y,n]),_=T.useCallback(E=>{m?(E.key==="ArrowDown"||E.key==="ArrowUp")&&(typeof b<"u"&&b.current!==null?b.current.focus():typeof u<"u"&&u.current!==null&&u.current.focus(),E.preventDefault()):v(!0)},[m]),D=E=>{const{key:O}=E;O==="ArrowRight"||O==="ArrowLeft"||O==="ArrowDown"||O==="ArrowUp"||O==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:O})),h.current.focus())},V=E=>{const{key:O}=E;if(p===o){if(O==="Enter"){E.preventDefault(),y(o,!0,s);return}let $=0;if(O==="ArrowRight")if(s<hn(p))$=1;else{E.preventDefault();return}else if(O==="ArrowLeft")if(s>1)$=-1;else{E.preventDefault();return}else O==="ArrowDown"?$=6:O==="ArrowUp"&&($=-6);s+$<=0||s+$>hn(p)?l(0):$!==0&&(l(s+$),E.preventDefault())}};return T.useEffect(()=>{o===p?o===fe.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[p,e.bookNum,e.chapterNum,o]),T.useLayoutEffect(()=>{d(m)},[m]),T.useLayoutEffect(()=>{const E=setTimeout(()=>{if(g&&u.current&&b.current){const $=b.current.offsetTop-jc;u.current.scrollTo({top:$,behavior:"instant"})}},10);return()=>{clearTimeout(E)}},[g]),c.jsx("div",{className:"pr-flex",children:c.jsxs(wr,{modal:!1,open:m,onOpenChange:k,children:[c.jsx(Eo,{asChild:!0,children:c.jsx(pc,{ref:h,value:n,handleSearch:R,handleKeyDown:_,handleOnClick:()=>{a(fe.bookNumberToId(e.bookNum)),f(fe.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),v(!0),h.current.focus()},onFocus:()=>{w.current=!0},handleSubmit:C,placeholder:`${fe.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),c.jsxs(Vn,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:D,align:"start",ref:u,children:[c.jsx(Oc,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),ha.map((E,O)=>x(E).length>0&&c.jsxs("div",{children:[c.jsx(sn,{className:"pr-font-semibold pr-text-slate-700",children:Rc[E]}),x(E).map($=>c.jsx("div",{children:c.jsx(Sc,{bookId:$,handleSelectBook:()=>y($,!1),isSelected:o===$,handleHighlightBook:()=>f($),handleKeyDown:V,bookType:E,ref:z=>{o===$&&(b.current=z)},children:c.jsx(Cc,{handleSelectChapter:S,endChapter:hn($),activeChapter:e.bookNum===fe.bookIdToNumber($)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:z=>{l(z)}})})},$)),ha.length-1!==O?c.jsx(Fn,{}):void 0]},E))]})]})})}const Ps=yo.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),Ne=T.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},a)=>{const s=r?ec.Slot:"button";return c.jsx(s,{className:F(Ps({variant:t,size:n,className:e})),ref:a,...o})});Ne.displayName="Button";function Ac({table:e}){return c.jsxs(wr,{children:[c.jsx(ys.DropdownMenuTrigger,{asChild:!0,children:c.jsxs(Ne,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[c.jsx(le.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),c.jsxs(Vn,{align:"end",className:"pr-w-[150px]",children:[c.jsx(sn,{children:"Toggle columns"}),c.jsx(Fn,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>c.jsx(xr,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}const $n=ye.Root,$s=ye.Group,_n=ye.Value,Kt=T.forwardRef(({className:e,children:t,...n},r)=>c.jsxs(ye.Trigger,{ref:r,className:F("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...n,children:[t,c.jsx(ye.Icon,{asChild:!0,children:c.jsx(le.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));Kt.displayName=ye.Trigger.displayName;const So=T.forwardRef(({className:e,...t},n)=>c.jsx(ye.ScrollUpButton,{ref:n,className:F("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:c.jsx(le.ChevronUp,{className:"pr-h-4 pr-w-4"})}));So.displayName=ye.ScrollUpButton.displayName;const Co=T.forwardRef(({className:e,...t},n)=>c.jsx(ye.ScrollDownButton,{ref:n,className:F("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:c.jsx(le.ChevronDown,{className:"pr-h-4 pr-w-4"})}));Co.displayName=ye.ScrollDownButton.displayName;const Jt=T.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>c.jsx(ye.Portal,{children:c.jsxs(ye.Content,{ref:o,className:F("pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:n,...r,children:[c.jsx(So,{}),c.jsx(ye.Viewport,{className:F("pr-p-1",n==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),c.jsx(Co,{})]})}));Jt.displayName=ye.Content.displayName;const _s=T.forwardRef(({className:e,...t},n)=>c.jsx(ye.Label,{ref:n,className:F("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));_s.displayName=ye.Label.displayName;const Ye=T.forwardRef(({className:e,children:t,...n},r)=>c.jsxs(ye.Item,{ref:r,className:F("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[c.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:c.jsx(ye.ItemIndicator,{children:c.jsx(le.Check,{className:"pr-h-4 pr-w-4"})})}),c.jsx(ye.ItemText,{children:t})]}));Ye.displayName=ye.Item.displayName;const Ms=T.forwardRef(({className:e,...t},n)=>c.jsx(ye.Separator,{ref:n,className:F("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Ms.displayName=ye.Separator.displayName;function Bc({table:e}){return c.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:c.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[c.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),c.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[c.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),c.jsxs($n,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[c.jsx(Kt,{className:"pr-h-8 pr-w-[70px]",children:c.jsx(_n,{placeholder:e.getState().pagination.pageSize})}),c.jsx(Jt,{side:"top",children:[10,20,30,40,50].map(t=>c.jsx(Ye,{value:`${t}`,children:t},t))})]})]}),c.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),c.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[c.jsxs(Ne,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[c.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),c.jsx(le.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),c.jsxs(Ne,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[c.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),c.jsx(le.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),c.jsxs(Ne,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[c.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),c.jsx(le.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),c.jsxs(Ne,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[c.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),c.jsx(le.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}const zn=T.forwardRef(({className:e,stickyHeader:t,...n},r)=>c.jsx("div",{className:F("pr-relative pr-w-full",{"pr-overflow-auto":!t}),children:c.jsx("table",{ref:r,className:F("pr-w-full pr-caption-bottom pr-text-sm",e),...n})}));zn.displayName="Table";const Hn=T.forwardRef(({className:e,stickyHeader:t,...n},r)=>c.jsx("thead",{ref:r,className:F({"pr-sticky pr-top-0 pr-bg-secondary":t},"[&_tr]:pr-border-b",e),...n}));Hn.displayName="TableHeader";const Un=T.forwardRef(({className:e,...t},n)=>c.jsx("tbody",{ref:n,className:F("[&_tr:last-child]:pr-border-0",e),...t}));Un.displayName="TableBody";const Is=T.forwardRef(({className:e,...t},n)=>c.jsx("tfoot",{ref:n,className:F("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));Is.displayName="TableFooter";const lt=T.forwardRef(({className:e,...t},n)=>c.jsx("tr",{ref:n,className:F("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));lt.displayName="TableRow";const Zt=T.forwardRef(({className:e,...t},n)=>c.jsx("th",{ref:n,className:F("pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",e),...t}));Zt.displayName="TableHead";const It=T.forwardRef(({className:e,...t},n)=>c.jsx("td",{ref:n,className:F("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0",e),...t}));It.displayName="TableCell";const Ds=T.forwardRef(({className:e,...t},n)=>c.jsx("caption",{ref:n,className:F("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));Ds.displayName="TableCaption";function As({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,stickyHeader:a=!1,onRowClickHandler:s=()=>{}}){var b;const[l,p]=T.useState([]),[f,m]=T.useState([]),[v,g]=T.useState({}),[d,h]=T.useState({}),u=Ce.useReactTable({data:t,columns:e,getCoreRowModel:Ce.getCoreRowModel(),...n&&{getPaginationRowModel:Ce.getPaginationRowModel()},onSortingChange:p,getSortedRowModel:Ce.getSortedRowModel(),onColumnFiltersChange:m,getFilteredRowModel:Ce.getFilteredRowModel(),onColumnVisibilityChange:g,onRowSelectionChange:h,state:{sorting:l,columnFilters:f,columnVisibility:v,rowSelection:d}});return c.jsxs("div",{className:"pr-twp pr-font-sans",children:[o&&c.jsx(Ac,{table:u}),c.jsxs(zn,{stickyHeader:a,children:[c.jsx(Hn,{stickyHeader:a,children:u.getHeaderGroups().map(x=>c.jsx(lt,{children:x.headers.map(R=>c.jsx(Zt,{children:R.isPlaceholder?void 0:Ce.flexRender(R.column.columnDef.header,R.getContext())},R.id))},x.id))}),c.jsx(Un,{children:(b=u.getRowModel().rows)!=null&&b.length?u.getRowModel().rows.map(x=>c.jsx(lt,{onClick:()=>s(x,u),"data-state":x.getIsSelected()&&"selected",children:x.getVisibleCells().map(R=>c.jsx(It,{children:Ce.flexRender(R.column.columnDef.cell,R.getContext())},R.id))},x.id)):c.jsx(lt,{children:c.jsx(It,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]}),n&&c.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[c.jsx(Ne,{variant:"outline",size:"sm",onClick:()=>u.previousPage(),disabled:!u.getCanPreviousPage(),children:"Previous"}),c.jsx(Ne,{variant:"outline",size:"sm",onClick:()=>u.nextPage(),disabled:!u.getCanNextPage(),children:"Next"})]}),n&&r&&c.jsx(Bc,{table:u})]})}const ga=e=>{const t=/^\\[vc]\s+(\d+)/,n=e.match(t);return n?+n[1]:0},ba=(e,t,n,r)=>{if(!e||e===""||t==="")return[];const o=[],a=e.split(/(?=\n|\\(?:v|c|id))/g);let s=r.chapterNum,l=r.verseNum,p=0;return a.forEach(f=>{f.startsWith("\\id")&&(s=0,l=0),f.startsWith("\\c")&&(s=ga(f),l=0),f.startsWith("\\v")&&(l=ga(f),s===0&&(s=r.chapterNum));const m=n(f,t);for(let v=0;v<m.length;v++){const g={reference:{...r,chapterNum:+s,verseNum:+l},snippet:f,key:p};p+=1,o.push(g)}}),o};function Lc({selectedItem:e,text:t,extractItems:n,scriptureReference:r,setScriptureReference:o,localizedStrings:a}){const s=a["%webView_inventory_occurrences_table_header_reference%"],l=a["%webView_inventory_occurrences_table_header_occurrence%"],[p,f]=T.useState(ba(t,e,n,r));return T.useEffect(()=>f(ba(t,e,n,r)),[t,e,r,n]),c.jsxs(zn,{stickyHeader:!0,children:[c.jsx(Hn,{stickyHeader:!0,children:c.jsxs(lt,{children:[c.jsx(Zt,{children:s}),c.jsx(Zt,{children:l})]})}),c.jsx(Un,{children:p.map(m=>c.jsxs(lt,{onClick:()=>{o(m.reference)},children:[c.jsx(It,{children:`${fe.bookNumberToEnglishName(m.reference.bookNum)} ${m.reference.chapterNum}:${m.reference.verseNum}`}),c.jsx(It,{children:m.snippet})]},m.key))})]})}const Vc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_book%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),Fc=e=>e==="asc"?c.jsx(le.ArrowUpIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):e==="desc"?c.jsx(le.ArrowDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):c.jsx(le.ArrowUpDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}),zc=(e,t,n)=>{let r=e;return t!=="all"&&(r=r.filter(o=>t==="approved"&&o.status==="approved"||t==="unapproved"&&o.status==="unapproved"||t==="unknown"&&o.status==="unknown")),n!==""&&(r=r.filter(o=>o.item.includes(n))),r},Hc=(e,t,n)=>{const r=[],o=t(e);for(let a=0;a<o.length;a++){const s=o[a],l=r.find(p=>p.item===s);if(l)l.count+=1;else{const p={item:s,count:1,status:n(s)};r.push(p)}}return r},gt=(e,t)=>e[t]??t;function Uc({scriptureReference:e,setScriptureReference:t,localizedStrings:n,extractItems:r,approvedItems:o,onApprovedItemsChange:a,unapprovedItems:s,onUnapprovedItemsChange:l,text:p,scope:f,onScopeChange:m,getColumns:v}){const g=gt(n,"%webView_inventory_all%"),d=gt(n,"%webView_inventory_approved%"),h=gt(n,"%webView_inventory_unapproved%"),u=gt(n,"%webView_inventory_unknown%"),b=gt(n,"%webView_inventory_scope_book%"),x=gt(n,"%webView_inventory_scope_chapter%"),R=gt(n,"%webView_inventory_scope_verse%"),w=gt(n,"%webView_inventory_filter_text%"),[k,y]=T.useState([]),[S,C]=T.useState("all"),[_,D]=T.useState(""),[V,E]=T.useState(""),O=T.useCallback((B,J)=>{y(M=>{let U=[];return B.forEach(K=>{U=M.map(G=>G.item===K&&G.status!==J?{...G,status:J}:G)}),U});let Z=[...o];B.forEach(M=>{J==="approved"?Z.includes(M)||Z.push(M):Z=Z.filter(U=>U!==M)}),a(Z);let j=[...s];B.forEach(M=>{J==="unapproved"?j.includes(M)||j.push(M):j=j.filter(U=>U!==M)}),l(j)},[o,a,s,l]),$=T.useCallback(B=>o.includes(B)?"approved":s.includes(B)?"unapproved":"unknown",[o,s]);T.useEffect(()=>{p&&y(Hc(p,r,$))},[r,e,p,$]);const z=T.useMemo(()=>zc(k,S,_),[k,S,_]);T.useEffect(()=>{E("")},[z]);const H=(B,J)=>{J.toggleAllRowsSelected(!1),B.toggleSelected(void 0),E(B.getValue("item"))},A=T.useMemo(()=>v(O),[v,O]);return c.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-flex-col",children:[c.jsxs("div",{className:"pr-flex",children:[c.jsxs($n,{onValueChange:B=>C(B),defaultValue:S,children:[c.jsx(Kt,{className:"pr-m-1",children:c.jsx(_n,{placeholder:"Select filter"})}),c.jsxs(Jt,{className:"pr-font-sans",children:[c.jsx(Ye,{value:"all",children:g}),c.jsx(Ye,{value:"approved",children:d}),c.jsx(Ye,{value:"unapproved",children:h}),c.jsx(Ye,{value:"unknown",children:u})]})]}),c.jsxs($n,{onValueChange:B=>m(B),defaultValue:f,children:[c.jsx(Kt,{className:"pr-m-1",children:c.jsx(_n,{placeholder:"Select scope"})}),c.jsxs(Jt,{className:"pr-font-sans",children:[c.jsx(Ye,{value:"book",children:b}),c.jsx(Ye,{value:"chapter",children:x}),c.jsx(Ye,{value:"verse",children:R})]})]}),c.jsx(Ln,{className:"pr-m-1 pr-rounded-md pr-border",placeholder:w,value:_,onChange:B=>{D(B.target.value)}})]}),c.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:c.jsx(As,{columns:A,data:z,onRowClickHandler:H,stickyHeader:!0})}),V!==""&&c.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:c.jsx(Lc,{selectedItem:V,text:p,extractItems:r,scriptureReference:e,setScriptureReference:B=>t(B),localizedStrings:n})})]})}const Gc=Pn.Root,qc=Pn.Trigger,Bs=T.forwardRef(({className:e,align:t="center",sideOffset:n=4,...r},o)=>c.jsx(Pn.Portal,{children:c.jsx(Pn.Content,{ref:o,align:t,sideOffset:n,className:F("pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r})}));Bs.displayName=Pn.Content.displayName;const Wc=Qe.Portal,Ls=T.forwardRef(({className:e,...t},n)=>c.jsx(Qe.Overlay,{ref:n,className:F("pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",e),...t}));Ls.displayName=Qe.Overlay.displayName;const Xc=T.forwardRef(({className:e,children:t,...n},r)=>c.jsxs(Wc,{children:[c.jsx(Ls,{}),c.jsxs(Qe.Content,{ref:r,className:F("pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",e),...n,children:[t,c.jsxs(Qe.Close,{className:"pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground",children:[c.jsx(le.X,{className:"pr-h-4 pr-w-4"}),c.jsx("span",{className:"pr-sr-only",children:"Close"})]})]})]}));Xc.displayName=Qe.Content.displayName;const Yc=T.forwardRef(({className:e,...t},n)=>c.jsx(Qe.Title,{ref:n,className:F("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight",e),...t}));Yc.displayName=Qe.Title.displayName;const Kc=T.forwardRef(({className:e,...t},n)=>c.jsx(Qe.Description,{ref:n,className:F("pr-text-sm pr-text-muted-foreground",e),...t}));Kc.displayName=Qe.Description.displayName;const Vs=T.forwardRef(({className:e,...t},n)=>c.jsx(Ie.Command,{ref:n,className:F("pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",e),...t}));Vs.displayName=Ie.Command.displayName;const Fs=T.forwardRef(({className:e,...t},n)=>c.jsxs("div",{className:"pr-flex pr-items-center pr-border-b pr-px-3",children:[c.jsx(le.Search,{className:"pr-mr-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"}),c.jsx(Ie.Command.Input,{ref:n,className:F("pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...t})]}));Fs.displayName=Ie.Command.Input.displayName;const zs=T.forwardRef(({className:e,...t},n)=>c.jsx(Ie.Command.List,{ref:n,className:F("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden",e),...t}));zs.displayName=Ie.Command.List.displayName;const Hs=T.forwardRef((e,t)=>c.jsx(Ie.Command.Empty,{ref:t,className:"pr-py-6 pr-text-center pr-text-sm",...e}));Hs.displayName=Ie.Command.Empty.displayName;const Jc=T.forwardRef(({className:e,...t},n)=>c.jsx(Ie.Command.Group,{ref:n,className:F("pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",e),...t}));Jc.displayName=Ie.Command.Group.displayName;const Zc=T.forwardRef(({className:e,...t},n)=>c.jsx(Ie.Command.Separator,{ref:n,className:F("pr--mx-1 pr-h-px pr-bg-border",e),...t}));Zc.displayName=Ie.Command.Separator.displayName;const Us=T.forwardRef(({className:e,...t},n)=>c.jsx(Ie.Command.Item,{ref:n,className:F("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",e),...t}));Us.displayName=Ie.Command.Item.displayName;function Qc(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function oo({id:e,options:t=[],className:n,value:r,onChange:o=()=>{},getOptionLabel:a=Qc,buttonPlaceholder:s="",textPlaceholder:l="",commandEmptyMessage:p="No option found",buttonVariant:f="outline"}){const[m,v]=T.useState(!1);return c.jsxs(Gc,{open:m,onOpenChange:v,children:[c.jsx(qc,{asChild:!0,children:c.jsxs(Ne,{variant:f,role:"combobox","aria-expanded":m,id:e,className:F("pr-w-[200px] pr-justify-between",n),children:[r?a(r):s,c.jsx(le.ChevronsUpDown,{className:"pr-ml-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"})]})}),c.jsx(Bs,{className:"pr-w-[200px] pr-p-0",children:c.jsxs(Vs,{children:[c.jsx(Fs,{placeholder:l,className:"pr-text-inherit"}),c.jsx(Hs,{children:p}),c.jsx(zs,{children:t.map(g=>c.jsxs(Us,{value:a(g),onSelect:()=>{o(g),v(!1)},children:[c.jsx(le.Check,{className:F("pr-mr-2 pr-h-4 pr-w-4",{"pr-opacity-0":!r||a(r)!==a(g)})}),a(g)]},a(g)))})]})})]})}function ep({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,a]=T.useState(1),[s,l]=T.useState(r),[p,f]=T.useState(Array.from({length:r},(g,d)=>d+1));T.useEffect(()=>{a(1),e(1),l(r),t(r),f(Array.from({length:r},(g,d)=>d+1))},[r,t,e]);const m=g=>{a(g),e(g),g>s&&(l(g),t(g))},v=g=>{l(g),t(g),g<o&&(a(g),e(g))};return c.jsxs(c.Fragment,{children:[c.jsx(ke.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:c.jsx(oo,{onChange:m,className:"book-selection-chapter",options:p,getOptionLabel:g=>g.toString(),value:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),c.jsx(ke.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:c.jsx(oo,{onChange:v,className:"book-selection-chapter",options:p,getOptionLabel:g=>g.toString(),value:s},"end chapter"),label:"to",labelPlacement:"start"})]})}var jt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(jt||{});function Gs({id:e,isChecked:t,labelText:n="",labelPosition:r=jt.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:s=!1,hasError:l=!1,className:p,onChange:f}){const m=c.jsx(ke.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:a,disabled:s,className:`papi-checkbox ${l?"error":""} ${p??""}`,onChange:f});let v;if(n){const g=r===jt.Before||r===jt.Above,d=c.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${p??""}`,children:n}),h=r===jt.Before||r===jt.After,u=h?d:c.jsx("div",{children:d}),b=h?m:c.jsx("div",{children:m});v=c.jsxs(ke.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:l,children:[g&&u,b,!g&&u]})}else v=m;return v}function tp({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:a,createLabel:s}){return c.jsxs("fieldset",{id:e,className:t,children:[n&&c.jsx("legend",{children:n}),r.map(l=>c.jsx(Gs,{className:"check-item",isChecked:o.includes(l),labelText:s?s(l):l,onChange:()=>a(l)},l))]})}function np(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function rp(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Oo={},qs={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(qs);var op=qs.exports,Lr={};function ln(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},P.apply(this,arguments)}function Pt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Ws(e){if(!Pt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Ws(e[n])}),t}function ct(e,t,n={clone:!0}){const r=n.clone?P({},e):e;return Pt(e)&&Pt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Pt(t[o])&&o in e&&Pt(e[o])?r[o]=ct(e[o],t[o],n):n.clone?r[o]=Pt(t[o])?Ws(t[o]):t[o]:r[o]=t[o])}),r}var ao={exports:{}},tr={exports:{}},ce={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var va;function ap(){if(va)return ce;va=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,f=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,u=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,R=e?Symbol.for("react.scope"):60119;function w(y){if(typeof y=="object"&&y!==null){var S=y.$$typeof;switch(S){case t:switch(y=y.type,y){case p:case f:case r:case a:case o:case v:return y;default:switch(y=y&&y.$$typeof,y){case l:case m:case h:case d:case s:return y;default:return S}}case n:return S}}}function k(y){return w(y)===f}return ce.AsyncMode=p,ce.ConcurrentMode=f,ce.ContextConsumer=l,ce.ContextProvider=s,ce.Element=t,ce.ForwardRef=m,ce.Fragment=r,ce.Lazy=h,ce.Memo=d,ce.Portal=n,ce.Profiler=a,ce.StrictMode=o,ce.Suspense=v,ce.isAsyncMode=function(y){return k(y)||w(y)===p},ce.isConcurrentMode=k,ce.isContextConsumer=function(y){return w(y)===l},ce.isContextProvider=function(y){return w(y)===s},ce.isElement=function(y){return typeof y=="object"&&y!==null&&y.$$typeof===t},ce.isForwardRef=function(y){return w(y)===m},ce.isFragment=function(y){return w(y)===r},ce.isLazy=function(y){return w(y)===h},ce.isMemo=function(y){return w(y)===d},ce.isPortal=function(y){return w(y)===n},ce.isProfiler=function(y){return w(y)===a},ce.isStrictMode=function(y){return w(y)===o},ce.isSuspense=function(y){return w(y)===v},ce.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===r||y===f||y===a||y===o||y===v||y===g||typeof y=="object"&&y!==null&&(y.$$typeof===h||y.$$typeof===d||y.$$typeof===s||y.$$typeof===l||y.$$typeof===m||y.$$typeof===b||y.$$typeof===x||y.$$typeof===R||y.$$typeof===u)},ce.typeOf=w,ce}var pe={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ya;function sp(){return ya||(ya=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,f=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,u=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,R=e?Symbol.for("react.scope"):60119;function w(L){return typeof L=="string"||typeof L=="function"||L===r||L===f||L===a||L===o||L===v||L===g||typeof L=="object"&&L!==null&&(L.$$typeof===h||L.$$typeof===d||L.$$typeof===s||L.$$typeof===l||L.$$typeof===m||L.$$typeof===b||L.$$typeof===x||L.$$typeof===R||L.$$typeof===u)}function k(L){if(typeof L=="object"&&L!==null){var te=L.$$typeof;switch(te){case t:var I=L.type;switch(I){case p:case f:case r:case a:case o:case v:return I;default:var se=I&&I.$$typeof;switch(se){case l:case m:case h:case d:case s:return se;default:return te}}case n:return te}}}var y=p,S=f,C=l,_=s,D=t,V=m,E=r,O=h,$=d,z=n,H=a,A=o,B=v,J=!1;function Z(L){return J||(J=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),j(L)||k(L)===p}function j(L){return k(L)===f}function M(L){return k(L)===l}function U(L){return k(L)===s}function K(L){return typeof L=="object"&&L!==null&&L.$$typeof===t}function G(L){return k(L)===m}function q(L){return k(L)===r}function X(L){return k(L)===h}function Y(L){return k(L)===d}function W(L){return k(L)===n}function Q(L){return k(L)===a}function ee(L){return k(L)===o}function ae(L){return k(L)===v}pe.AsyncMode=y,pe.ConcurrentMode=S,pe.ContextConsumer=C,pe.ContextProvider=_,pe.Element=D,pe.ForwardRef=V,pe.Fragment=E,pe.Lazy=O,pe.Memo=$,pe.Portal=z,pe.Profiler=H,pe.StrictMode=A,pe.Suspense=B,pe.isAsyncMode=Z,pe.isConcurrentMode=j,pe.isContextConsumer=M,pe.isContextProvider=U,pe.isElement=K,pe.isForwardRef=G,pe.isFragment=q,pe.isLazy=X,pe.isMemo=Y,pe.isPortal=W,pe.isProfiler=Q,pe.isStrictMode=ee,pe.isSuspense=ae,pe.isValidElementType=w,pe.typeOf=k}()),pe}var wa;function Xs(){return wa||(wa=1,process.env.NODE_ENV==="production"?tr.exports=ap():tr.exports=sp()),tr.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Vr,xa;function ip(){if(xa)return Vr;xa=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var s={},l=0;l<10;l++)s["_"+String.fromCharCode(l)]=l;var p=Object.getOwnPropertyNames(s).map(function(m){return s[m]});if(p.join("")!=="0123456789")return!1;var f={};return"abcdefghijklmnopqrst".split("").forEach(function(m){f[m]=m}),Object.keys(Object.assign({},f)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Vr=o()?Object.assign:function(a,s){for(var l,p=r(a),f,m=1;m<arguments.length;m++){l=Object(arguments[m]);for(var v in l)t.call(l,v)&&(p[v]=l[v]);if(e){f=e(l);for(var g=0;g<f.length;g++)n.call(l,f[g])&&(p[f[g]]=l[f[g]])}}return p},Vr}var Fr,ka;function Ro(){if(ka)return Fr;ka=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Fr=e,Fr}var zr,Ea;function Ys(){return Ea||(Ea=1,zr=Function.call.bind(Object.prototype.hasOwnProperty)),zr}var Hr,Ta;function lp(){if(Ta)return Hr;Ta=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Ro(),n={},r=Ys();e=function(a){var s="Warning: "+a;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(a,s,l,p,f){if(process.env.NODE_ENV!=="production"){for(var m in a)if(r(a,m)){var v;try{if(typeof a[m]!="function"){var g=Error((p||"React class")+": "+l+" type `"+m+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[m]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw g.name="Invariant Violation",g}v=a[m](s,m,p,l,null,t)}catch(h){v=h}if(v&&!(v instanceof Error)&&e((p||"React class")+": type specification of "+l+" `"+m+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof v+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),v instanceof Error&&!(v.message in n)){n[v.message]=!0;var d=f?f():"";e("Failed "+l+" type: "+v.message+(d??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Hr=o,Hr}var Ur,Na;function cp(){if(Na)return Ur;Na=1;var e=Xs(),t=ip(),n=Ro(),r=Ys(),o=lp(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(l){var p="Warning: "+l;typeof console<"u"&&console.error(p);try{throw new Error(p)}catch{}});function s(){return null}return Ur=function(l,p){var f=typeof Symbol=="function"&&Symbol.iterator,m="@@iterator";function v(j){var M=j&&(f&&j[f]||j[m]);if(typeof M=="function")return M}var g="<<anonymous>>",d={array:x("array"),bigint:x("bigint"),bool:x("boolean"),func:x("function"),number:x("number"),object:x("object"),string:x("string"),symbol:x("symbol"),any:R(),arrayOf:w,element:k(),elementType:y(),instanceOf:S,node:V(),objectOf:_,oneOf:C,oneOfType:D,shape:O,exact:$};function h(j,M){return j===M?j!==0||1/j===1/M:j!==j&&M!==M}function u(j,M){this.message=j,this.data=M&&typeof M=="object"?M:{},this.stack=""}u.prototype=Error.prototype;function b(j){if(process.env.NODE_ENV!=="production")var M={},U=0;function K(q,X,Y,W,Q,ee,ae){if(W=W||g,ee=ee||Y,ae!==n){if(p){var L=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw L.name="Invariant Violation",L}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var te=W+":"+Y;!M[te]&&U<3&&(a("You are manually calling a React.PropTypes validation function for the `"+ee+"` prop on `"+W+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),M[te]=!0,U++)}}return X[Y]==null?q?X[Y]===null?new u("The "+Q+" `"+ee+"` is marked as required "+("in `"+W+"`, but its value is `null`.")):new u("The "+Q+" `"+ee+"` is marked as required in "+("`"+W+"`, but its value is `undefined`.")):null:j(X,Y,W,Q,ee)}var G=K.bind(null,!1);return G.isRequired=K.bind(null,!0),G}function x(j){function M(U,K,G,q,X,Y){var W=U[K],Q=A(W);if(Q!==j){var ee=B(W);return new u("Invalid "+q+" `"+X+"` of type "+("`"+ee+"` supplied to `"+G+"`, expected ")+("`"+j+"`."),{expectedType:j})}return null}return b(M)}function R(){return b(s)}function w(j){function M(U,K,G,q,X){if(typeof j!="function")return new u("Property `"+X+"` of component `"+G+"` has invalid PropType notation inside arrayOf.");var Y=U[K];if(!Array.isArray(Y)){var W=A(Y);return new u("Invalid "+q+" `"+X+"` of type "+("`"+W+"` supplied to `"+G+"`, expected an array."))}for(var Q=0;Q<Y.length;Q++){var ee=j(Y,Q,G,q,X+"["+Q+"]",n);if(ee instanceof Error)return ee}return null}return b(M)}function k(){function j(M,U,K,G,q){var X=M[U];if(!l(X)){var Y=A(X);return new u("Invalid "+G+" `"+q+"` of type "+("`"+Y+"` supplied to `"+K+"`, expected a single ReactElement."))}return null}return b(j)}function y(){function j(M,U,K,G,q){var X=M[U];if(!e.isValidElementType(X)){var Y=A(X);return new u("Invalid "+G+" `"+q+"` of type "+("`"+Y+"` supplied to `"+K+"`, expected a single ReactElement type."))}return null}return b(j)}function S(j){function M(U,K,G,q,X){if(!(U[K]instanceof j)){var Y=j.name||g,W=Z(U[K]);return new u("Invalid "+q+" `"+X+"` of type "+("`"+W+"` supplied to `"+G+"`, expected ")+("instance of `"+Y+"`."))}return null}return b(M)}function C(j){if(!Array.isArray(j))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),s;function M(U,K,G,q,X){for(var Y=U[K],W=0;W<j.length;W++)if(h(Y,j[W]))return null;var Q=JSON.stringify(j,function(ae,L){var te=B(L);return te==="symbol"?String(L):L});return new u("Invalid "+q+" `"+X+"` of value `"+String(Y)+"` "+("supplied to `"+G+"`, expected one of "+Q+"."))}return b(M)}function _(j){function M(U,K,G,q,X){if(typeof j!="function")return new u("Property `"+X+"` of component `"+G+"` has invalid PropType notation inside objectOf.");var Y=U[K],W=A(Y);if(W!=="object")return new u("Invalid "+q+" `"+X+"` of type "+("`"+W+"` supplied to `"+G+"`, expected an object."));for(var Q in Y)if(r(Y,Q)){var ee=j(Y,Q,G,q,X+"."+Q,n);if(ee instanceof Error)return ee}return null}return b(M)}function D(j){if(!Array.isArray(j))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var M=0;M<j.length;M++){var U=j[M];if(typeof U!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+J(U)+" at index "+M+"."),s}function K(G,q,X,Y,W){for(var Q=[],ee=0;ee<j.length;ee++){var ae=j[ee],L=ae(G,q,X,Y,W,n);if(L==null)return null;L.data&&r(L.data,"expectedType")&&Q.push(L.data.expectedType)}var te=Q.length>0?", expected one of type ["+Q.join(", ")+"]":"";return new u("Invalid "+Y+" `"+W+"` supplied to "+("`"+X+"`"+te+"."))}return b(K)}function V(){function j(M,U,K,G,q){return z(M[U])?null:new u("Invalid "+G+" `"+q+"` supplied to "+("`"+K+"`, expected a ReactNode."))}return b(j)}function E(j,M,U,K,G){return new u((j||"React class")+": "+M+" type `"+U+"."+K+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+G+"`.")}function O(j){function M(U,K,G,q,X){var Y=U[K],W=A(Y);if(W!=="object")return new u("Invalid "+q+" `"+X+"` of type `"+W+"` "+("supplied to `"+G+"`, expected `object`."));for(var Q in j){var ee=j[Q];if(typeof ee!="function")return E(G,q,X,Q,B(ee));var ae=ee(Y,Q,G,q,X+"."+Q,n);if(ae)return ae}return null}return b(M)}function $(j){function M(U,K,G,q,X){var Y=U[K],W=A(Y);if(W!=="object")return new u("Invalid "+q+" `"+X+"` of type `"+W+"` "+("supplied to `"+G+"`, expected `object`."));var Q=t({},U[K],j);for(var ee in Q){var ae=j[ee];if(r(j,ee)&&typeof ae!="function")return E(G,q,X,ee,B(ae));if(!ae)return new u("Invalid "+q+" `"+X+"` key `"+ee+"` supplied to `"+G+"`.\nBad object: "+JSON.stringify(U[K],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(j),null,"  "));var L=ae(Y,ee,G,q,X+"."+ee,n);if(L)return L}return null}return b(M)}function z(j){switch(typeof j){case"number":case"string":case"undefined":return!0;case"boolean":return!j;case"object":if(Array.isArray(j))return j.every(z);if(j===null||l(j))return!0;var M=v(j);if(M){var U=M.call(j),K;if(M!==j.entries){for(;!(K=U.next()).done;)if(!z(K.value))return!1}else for(;!(K=U.next()).done;){var G=K.value;if(G&&!z(G[1]))return!1}}else return!1;return!0;default:return!1}}function H(j,M){return j==="symbol"?!0:M?M["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&M instanceof Symbol:!1}function A(j){var M=typeof j;return Array.isArray(j)?"array":j instanceof RegExp?"object":H(M,j)?"symbol":M}function B(j){if(typeof j>"u"||j===null)return""+j;var M=A(j);if(M==="object"){if(j instanceof Date)return"date";if(j instanceof RegExp)return"regexp"}return M}function J(j){var M=B(j);switch(M){case"array":case"object":return"an "+M;case"boolean":case"date":case"regexp":return"a "+M;default:return M}}function Z(j){return!j.constructor||!j.constructor.name?g:j.constructor.name}return d.checkPropTypes=o,d.resetWarningCache=o.resetWarningCache,d.PropTypes=d,d},Ur}var Gr,Sa;function pp(){if(Sa)return Gr;Sa=1;var e=Ro();function t(){}function n(){}return n.resetWarningCache=t,Gr=function(){function r(s,l,p,f,m,v){if(v!==e){var g=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw g.name="Invariant Violation",g}}r.isRequired=r;function o(){return r}var a={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return a.PropTypes=a,a},Gr}if(process.env.NODE_ENV!=="production"){var dp=Xs(),up=!0;ao.exports=cp()(dp.isElement,up)}else ao.exports=pp()();var fp=ao.exports;const i=np(fp);function mp(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ks(e,t,n,r,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let l;const p=a.type;return typeof p=="function"&&!mp(p)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Js=ln(i.element,Ks);Js.isRequired=ln(i.element.isRequired,Ks);const Gn=Js;function hp(e){const{prototype:t={}}=e;return!!t.isReactComponent}function gp(e,t,n,r,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let l;return typeof a=="function"&&!hp(a)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const bp=ln(i.elementType,gp),vp="exact-prop: ​";function Zs(e){return process.env.NODE_ENV==="production"?e:P({},e,{[vp]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Qt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var so={exports:{}},de={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ca;function yp(){if(Ca)return de;Ca=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function u(b){if(typeof b=="object"&&b!==null){var x=b.$$typeof;switch(x){case e:switch(b=b.type,b){case n:case o:case r:case f:case m:return b;default:switch(b=b&&b.$$typeof,b){case l:case s:case p:case g:case v:case a:return b;default:return x}}case t:return x}}}return de.ContextConsumer=s,de.ContextProvider=a,de.Element=e,de.ForwardRef=p,de.Fragment=n,de.Lazy=g,de.Memo=v,de.Portal=t,de.Profiler=o,de.StrictMode=r,de.Suspense=f,de.SuspenseList=m,de.isAsyncMode=function(){return!1},de.isConcurrentMode=function(){return!1},de.isContextConsumer=function(b){return u(b)===s},de.isContextProvider=function(b){return u(b)===a},de.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===e},de.isForwardRef=function(b){return u(b)===p},de.isFragment=function(b){return u(b)===n},de.isLazy=function(b){return u(b)===g},de.isMemo=function(b){return u(b)===v},de.isPortal=function(b){return u(b)===t},de.isProfiler=function(b){return u(b)===o},de.isStrictMode=function(b){return u(b)===r},de.isSuspense=function(b){return u(b)===f},de.isSuspenseList=function(b){return u(b)===m},de.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===n||b===o||b===r||b===f||b===m||b===d||typeof b=="object"&&b!==null&&(b.$$typeof===g||b.$$typeof===v||b.$$typeof===a||b.$$typeof===s||b.$$typeof===p||b.$$typeof===h||b.getModuleId!==void 0)},de.typeOf=u,de}var ue={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Oa;function wp(){return Oa||(Oa=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h=!1,u=!1,b=!1,x=!1,R=!1,w;w=Symbol.for("react.module.reference");function k(I){return!!(typeof I=="string"||typeof I=="function"||I===n||I===o||R||I===r||I===f||I===m||x||I===d||h||u||b||typeof I=="object"&&I!==null&&(I.$$typeof===g||I.$$typeof===v||I.$$typeof===a||I.$$typeof===s||I.$$typeof===p||I.$$typeof===w||I.getModuleId!==void 0))}function y(I){if(typeof I=="object"&&I!==null){var se=I.$$typeof;switch(se){case e:var Ee=I.type;switch(Ee){case n:case o:case r:case f:case m:return Ee;default:var je=Ee&&Ee.$$typeof;switch(je){case l:case s:case p:case g:case v:case a:return je;default:return se}}case t:return se}}}var S=s,C=a,_=e,D=p,V=n,E=g,O=v,$=t,z=o,H=r,A=f,B=m,J=!1,Z=!1;function j(I){return J||(J=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function M(I){return Z||(Z=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function U(I){return y(I)===s}function K(I){return y(I)===a}function G(I){return typeof I=="object"&&I!==null&&I.$$typeof===e}function q(I){return y(I)===p}function X(I){return y(I)===n}function Y(I){return y(I)===g}function W(I){return y(I)===v}function Q(I){return y(I)===t}function ee(I){return y(I)===o}function ae(I){return y(I)===r}function L(I){return y(I)===f}function te(I){return y(I)===m}ue.ContextConsumer=S,ue.ContextProvider=C,ue.Element=_,ue.ForwardRef=D,ue.Fragment=V,ue.Lazy=E,ue.Memo=O,ue.Portal=$,ue.Profiler=z,ue.StrictMode=H,ue.Suspense=A,ue.SuspenseList=B,ue.isAsyncMode=j,ue.isConcurrentMode=M,ue.isContextConsumer=U,ue.isContextProvider=K,ue.isElement=G,ue.isForwardRef=q,ue.isFragment=X,ue.isLazy=Y,ue.isMemo=W,ue.isPortal=Q,ue.isProfiler=ee,ue.isStrictMode=ae,ue.isSuspense=L,ue.isSuspenseList=te,ue.isValidElementType=k,ue.typeOf=y}()),ue}process.env.NODE_ENV==="production"?so.exports=yp():so.exports=wp();var dr=so.exports;const xp=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function kp(e){const t=`${e}`.match(xp);return t&&t[1]||""}function Qs(e,t=""){return e.displayName||e.name||kp(e)||t}function Ra(e,t,n){const r=Qs(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Ep(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Qs(e,"Component");if(typeof e=="object")switch(e.$$typeof){case dr.ForwardRef:return Ra(e,e.render,"ForwardRef");case dr.Memo:return Ra(e,e.type,"memo");default:return}}}function pt(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=e[t],s=o||t;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Tp=i.oneOfType([i.func,i.object]),jo=Tp;function et(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Qt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function io(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function ei(e,t=166){let n;function r(...o){const a=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(a,t)}return r.clear=()=>{clearTimeout(n)},r}function Np(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,a,s)=>{const l=o||"<<anonymous>>",p=s||r;return typeof n[r]<"u"?new Error(`The ${a} \`${p}\` of \`${l}\` is deprecated. ${t}`):null}}function Sp(e,t){var n,r;return N.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Oe(e){return e&&e.ownerDocument||document}function en(e){return Oe(e).defaultView||window}function Cp(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?P({},t.propTypes):null;return o=>(a,s,l,p,f,...m)=>{const v=f||s,g=n==null?void 0:n[v];if(g){const d=g(a,s,l,p,f,...m);if(d)return d}return typeof a[s]<"u"&&!a[o]?new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function ur(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Op=typeof window<"u"?N.useLayoutEffect:N.useEffect,Dt=Op;let ja=0;function Rp(e){const[t,n]=N.useState(e),r=e||t;return N.useEffect(()=>{t==null&&(ja+=1,n(`mui-${ja}`))},[t]),r}const Pa=N["useId".toString()];function ti(e){if(Pa!==void 0){const t=Pa();return e??t}return Rp(e)}function jp(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=o||t;return typeof e[t]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function ni({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=N.useRef(e!==void 0),[a,s]=N.useState(t),l=o?e:a;if(process.env.NODE_ENV!=="production"){N.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:f}=N.useRef(t);N.useEffect(()=>{!o&&f!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const p=N.useCallback(f=>{o||s(f)},[]);return[l,p]}function Mn(e){const t=N.useRef(e);return Dt(()=>{t.current=e}),N.useRef((...n)=>(0,t.current)(...n)).current}function Ge(...e){return N.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{ur(n,t)})},e)}const $a={};function Pp(e,t){const n=N.useRef($a);return n.current===$a&&(n.current=e(t)),n}const $p=[];function _p(e){N.useEffect(e,$p)}class qn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new qn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function En(){const e=Pp(qn.create).current;return _p(e.disposeEffect),e}let kr=!0,lo=!1;const Mp=new qn,Ip={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Dp(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Ip[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Ap(e){e.metaKey||e.altKey||e.ctrlKey||(kr=!0)}function qr(){kr=!1}function Bp(){this.visibilityState==="hidden"&&lo&&(kr=!0)}function Lp(e){e.addEventListener("keydown",Ap,!0),e.addEventListener("mousedown",qr,!0),e.addEventListener("pointerdown",qr,!0),e.addEventListener("touchstart",qr,!0),e.addEventListener("visibilitychange",Bp,!0)}function Vp(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return kr||Dp(t)}function ri(){const e=N.useCallback(o=>{o!=null&&Lp(o.ownerDocument)},[]),t=N.useRef(!1);function n(){return t.current?(lo=!0,Mp.start(100,()=>{lo=!1}),t.current=!1,!0):!1}function r(o){return Vp(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function oi(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Fp(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function zp(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Hp=Number.isInteger||zp;function ai(e,t,n,r){const o=e[t];if(o==null||!Hp(o)){const a=Fp(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function si(e,t,...n){return e[t]===void 0?null:ai(e,t,...n)}function co(){return null}si.isRequired=ai;co.isRequired=co;const ii=process.env.NODE_ENV==="production"?co:si;function li(e,t){const n=P({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=P({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},a=t[r];n[r]={},!a||!Object.keys(a)?n[r]=o:!o||!Object.keys(o)?n[r]=a:(n[r]=P({},a),Object.keys(o).forEach(s=>{n[r][s]=li(o[s],a[s])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function ft(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((a,s)=>{if(s){const l=t(s);l!==""&&a.push(l),n&&n[s]&&a.push(n[s])}return a},[]).join(" ")}),r}const _a=e=>e,Up=()=>{let e=_a;return{configure(t){e=t},generate(t){return e(t)},reset(){e=_a}}},Gp=Up(),ci=Gp,pi={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function rt(e,t,n="Mui"){const r=pi[t];return r?`${n}-${r}`:`${ci.generate(e)}-${t}`}function xt(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=rt(e,o,n)}),r}function qp(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function me(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,a;for(a=0;a<r.length;a++)o=r[a],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}const Wp=["values","unit","step"],Xp=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>P({},n,{[r.key]:r.val}),{})};function Yp(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=me(e,Wp),a=Xp(t),s=Object.keys(a);function l(g){return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${n})`}function p(g){return`@media (max-width:${(typeof t[g]=="number"?t[g]:g)-r/100}${n})`}function f(g,d){const h=s.indexOf(d);return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${n}) and (max-width:${(h!==-1&&typeof t[s[h]]=="number"?t[s[h]]:d)-r/100}${n})`}function m(g){return s.indexOf(g)+1<s.length?f(g,s[s.indexOf(g)+1]):l(g)}function v(g){const d=s.indexOf(g);return d===0?l(s[1]):d===s.length-1?p(s[d]):f(g,s[s.indexOf(g)+1]).replace("@media","@media not all and")}return P({keys:s,values:a,up:l,down:p,between:f,only:m,not:v,unit:n},o)}const Kp={borderRadius:4},Jp=Kp,Zp=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.string,i.object,i.array]):{},kt=Zp;function Cn(e,t){return t?ct(e,t,{clone:!1}):e}const Po={xs:0,sm:600,md:900,lg:1200,xl:1536},Ma={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Po[e]}px)`};function dt(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const a=r.breakpoints||Ma;return t.reduce((s,l,p)=>(s[a.up(a.keys[p])]=n(t[p]),s),{})}if(typeof t=="object"){const a=r.breakpoints||Ma;return Object.keys(t).reduce((s,l)=>{if(Object.keys(a.values||Po).indexOf(l)!==-1){const p=a.up(l);s[p]=n(t[l],l)}else{const p=l;s[p]=t[p]}return s},{})}return n(t)}function Qp(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const a=e.up(o);return r[a]={},r},{}))||{}}function ed(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Er(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function fr(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Er(e,n)||r,t&&(o=t(o,r,e)),o}function xe(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,a=s=>{if(s[t]==null)return null;const l=s[t],p=s.theme,f=Er(p,r)||{};return dt(s,l,v=>{let g=fr(f,o,v);return v===g&&typeof v=="string"&&(g=fr(f,o,`${t}${v==="default"?"":et(v)}`,v)),n===!1?g:{[n]:g}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[t]:kt}:{},a.filterProps=[t],a}function td(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const nd={m:"margin",p:"padding"},rd={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Ia={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},od=td(e=>{if(e.length>2)if(Ia[e])e=Ia[e];else return[e];const[t,n]=e.split(""),r=nd[t],o=rd[n]||"";return Array.isArray(o)?o.map(a=>r+a):[r+o]}),Tr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Nr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],ad=[...Tr,...Nr];function Wn(e,t,n,r){var o;const a=(o=Er(e,t,!1))!=null?o:n;return typeof a=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),a*s):Array.isArray(a)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>a.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${s} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),a[s]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function di(e){return Wn(e,"spacing",8,"spacing")}function Xn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function sd(e,t){return n=>e.reduce((r,o)=>(r[o]=Xn(t,n),r),{})}function id(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=od(n),a=sd(o,r),s=e[n];return dt(e,s,a)}function ui(e,t){const n=di(e.theme);return Object.keys(e).map(r=>id(e,t,r,n)).reduce(Cn,{})}function be(e){return ui(e,Tr)}be.propTypes=process.env.NODE_ENV!=="production"?Tr.reduce((e,t)=>(e[t]=kt,e),{}):{};be.filterProps=Tr;function ve(e){return ui(e,Nr)}ve.propTypes=process.env.NODE_ENV!=="production"?Nr.reduce((e,t)=>(e[t]=kt,e),{}):{};ve.filterProps=Nr;process.env.NODE_ENV!=="production"&&ad.reduce((e,t)=>(e[t]=kt,e),{});function ld(e=8){if(e.mui)return e;const t=di({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(a=>{const s=t(a);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function Sr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(a=>{r[a]=o}),r),{}),n=r=>Object.keys(r).reduce((o,a)=>t[a]?Cn(o,t[a](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function He(e){return typeof e!="number"?e:`${e}px solid`}function Xe(e,t){return xe({prop:e,themeKey:"borders",transform:t})}const cd=Xe("border",He),pd=Xe("borderTop",He),dd=Xe("borderRight",He),ud=Xe("borderBottom",He),fd=Xe("borderLeft",He),md=Xe("borderColor"),hd=Xe("borderTopColor"),gd=Xe("borderRightColor"),bd=Xe("borderBottomColor"),vd=Xe("borderLeftColor"),yd=Xe("outline",He),wd=Xe("outlineColor"),Cr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Wn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:Xn(t,r)});return dt(e,e.borderRadius,n)}return null};Cr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:kt}:{};Cr.filterProps=["borderRadius"];Sr(cd,pd,dd,ud,fd,md,hd,gd,bd,vd,Cr,yd,wd);const Or=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Wn(e.theme,"spacing",8,"gap"),n=r=>({gap:Xn(t,r)});return dt(e,e.gap,n)}return null};Or.propTypes=process.env.NODE_ENV!=="production"?{gap:kt}:{};Or.filterProps=["gap"];const Rr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Wn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:Xn(t,r)});return dt(e,e.columnGap,n)}return null};Rr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:kt}:{};Rr.filterProps=["columnGap"];const jr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Wn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:Xn(t,r)});return dt(e,e.rowGap,n)}return null};jr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:kt}:{};jr.filterProps=["rowGap"];const xd=xe({prop:"gridColumn"}),kd=xe({prop:"gridRow"}),Ed=xe({prop:"gridAutoFlow"}),Td=xe({prop:"gridAutoColumns"}),Nd=xe({prop:"gridAutoRows"}),Sd=xe({prop:"gridTemplateColumns"}),Cd=xe({prop:"gridTemplateRows"}),Od=xe({prop:"gridTemplateAreas"}),Rd=xe({prop:"gridArea"});Sr(Or,Rr,jr,xd,kd,Ed,Td,Nd,Sd,Cd,Od,Rd);function Yt(e,t){return t==="grey"?t:e}const jd=xe({prop:"color",themeKey:"palette",transform:Yt}),Pd=xe({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Yt}),$d=xe({prop:"backgroundColor",themeKey:"palette",transform:Yt});Sr(jd,Pd,$d);function Ve(e){return e<=1&&e!==0?`${e*100}%`:e}const _d=xe({prop:"width",transform:Ve}),$o=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const a=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Po[n];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:Ve(n)}};return dt(e,e.maxWidth,t)}return null};$o.filterProps=["maxWidth"];const Md=xe({prop:"minWidth",transform:Ve}),Id=xe({prop:"height",transform:Ve}),Dd=xe({prop:"maxHeight",transform:Ve}),Ad=xe({prop:"minHeight",transform:Ve});xe({prop:"size",cssProperty:"width",transform:Ve});xe({prop:"size",cssProperty:"height",transform:Ve});const Bd=xe({prop:"boxSizing"});Sr(_d,$o,Md,Id,Dd,Ad,Bd);const Ld={border:{themeKey:"borders",transform:He},borderTop:{themeKey:"borders",transform:He},borderRight:{themeKey:"borders",transform:He},borderBottom:{themeKey:"borders",transform:He},borderLeft:{themeKey:"borders",transform:He},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:He},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Cr},color:{themeKey:"palette",transform:Yt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Yt},backgroundColor:{themeKey:"palette",transform:Yt},p:{style:ve},pt:{style:ve},pr:{style:ve},pb:{style:ve},pl:{style:ve},px:{style:ve},py:{style:ve},padding:{style:ve},paddingTop:{style:ve},paddingRight:{style:ve},paddingBottom:{style:ve},paddingLeft:{style:ve},paddingX:{style:ve},paddingY:{style:ve},paddingInline:{style:ve},paddingInlineStart:{style:ve},paddingInlineEnd:{style:ve},paddingBlock:{style:ve},paddingBlockStart:{style:ve},paddingBlockEnd:{style:ve},m:{style:be},mt:{style:be},mr:{style:be},mb:{style:be},ml:{style:be},mx:{style:be},my:{style:be},margin:{style:be},marginTop:{style:be},marginRight:{style:be},marginBottom:{style:be},marginLeft:{style:be},marginX:{style:be},marginY:{style:be},marginInline:{style:be},marginInlineStart:{style:be},marginInlineEnd:{style:be},marginBlock:{style:be},marginBlockStart:{style:be},marginBlockEnd:{style:be},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Or},rowGap:{style:jr},columnGap:{style:Rr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ve},maxWidth:{style:$o},minWidth:{transform:Ve},height:{transform:Ve},maxHeight:{transform:Ve},minHeight:{transform:Ve},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},_o=Ld;function Vd(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Fd(e,t){return typeof e=="function"?e(t):e}function zd(){function e(n,r,o,a){const s={[n]:r,theme:o},l=a[n];if(!l)return{[n]:r};const{cssProperty:p=n,themeKey:f,transform:m,style:v}=l;if(r==null)return null;if(f==="typography"&&r==="inherit")return{[n]:r};const g=Er(o,f)||{};return v?v(s):dt(s,r,h=>{let u=fr(g,m,h);return h===u&&typeof h=="string"&&(u=fr(g,m,`${n}${h==="default"?"":et(h)}`,h)),p===!1?u:{[p]:u}})}function t(n){var r;const{sx:o,theme:a={}}=n||{};if(!o)return null;const s=(r=a.unstable_sxConfig)!=null?r:_o;function l(p){let f=p;if(typeof p=="function")f=p(a);else if(typeof p!="object")return p;if(!f)return null;const m=Qp(a.breakpoints),v=Object.keys(m);let g=m;return Object.keys(f).forEach(d=>{const h=Fd(f[d],a);if(h!=null)if(typeof h=="object")if(s[d])g=Cn(g,e(d,h,a,s));else{const u=dt({theme:a},h,b=>({[d]:b}));Vd(u,h)?g[d]=t({sx:h,theme:a}):g=Cn(g,u)}else g=Cn(g,e(d,h,a,s))}),ed(v,g)}return Array.isArray(o)?o.map(l):l(o)}return t}const fi=zd();fi.filterProps=["sx"];const Mo=fi;function Hd(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Ud=["breakpoints","palette","spacing","shape"];function Io(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:a={}}=e,s=me(e,Ud),l=Yp(n),p=ld(o);let f=ct({breakpoints:l,direction:"ltr",components:{},palette:P({mode:"light"},r),spacing:p,shape:P({},Jp,a)},s);return f.applyStyles=Hd,f=t.reduce((m,v)=>ct(m,v),f),f.unstable_sxConfig=P({},_o,s==null?void 0:s.unstable_sxConfig),f.unstable_sx=function(v){return Mo({sx:v,theme:this})},f}function Gd(e){return Object.keys(e).length===0}function mi(e=null){const t=N.useContext(no.ThemeContext);return!t||Gd(t)?e:t}const qd=Io();function hi(e=qd){return mi(e)}const Wd=["ownerState"],Xd=["variants"],Yd=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Kd(e){return Object.keys(e).length===0}function Jd(e){return typeof e=="string"&&e.charCodeAt(0)>96}function sr(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Zd=Io(),Da=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function nr({defaultTheme:e,theme:t,themeId:n}){return Kd(t)?e:t[n]||t}function Qd(e){return e?(t,n)=>n[e]:null}function ir(e,t){let{ownerState:n}=t,r=me(t,Wd);const o=typeof e=="function"?e(P({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(a=>ir(a,P({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let l=me(o,Xd);return a.forEach(p=>{let f=!0;typeof p.props=="function"?f=p.props(P({ownerState:n},r,n)):Object.keys(p.props).forEach(m=>{(n==null?void 0:n[m])!==p.props[m]&&r[m]!==p.props[m]&&(f=!1)}),f&&(Array.isArray(l)||(l=[l]),l.push(typeof p.style=="function"?p.style(P({ownerState:n},r,n)):p.style))}),l}return o}function eu(e={}){const{themeId:t,defaultTheme:n=Zd,rootShouldForwardProp:r=sr,slotShouldForwardProp:o=sr}=e,a=s=>Mo(P({},s,{theme:nr(P({},s,{defaultTheme:n,themeId:t}))}));return a.__mui_systemSx=!0,(s,l={})=>{no.internal_processStyles(s,y=>y.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:p,slot:f,skipVariantsResolver:m,skipSx:v,overridesResolver:g=Qd(Da(f))}=l,d=me(l,Yd),h=m!==void 0?m:f&&f!=="Root"&&f!=="root"||!1,u=v||!1;let b;process.env.NODE_ENV!=="production"&&p&&(b=`${p}-${Da(f||"Root")}`);let x=sr;f==="Root"||f==="root"?x=r:f?x=o:Jd(s)&&(x=void 0);const R=no(s,P({shouldForwardProp:x,label:b},d)),w=y=>typeof y=="function"&&y.__emotion_real!==y||Pt(y)?S=>ir(y,P({},S,{theme:nr({theme:S.theme,defaultTheme:n,themeId:t})})):y,k=(y,...S)=>{let C=w(y);const _=S?S.map(w):[];p&&g&&_.push(E=>{const O=nr(P({},E,{defaultTheme:n,themeId:t}));if(!O.components||!O.components[p]||!O.components[p].styleOverrides)return null;const $=O.components[p].styleOverrides,z={};return Object.entries($).forEach(([H,A])=>{z[H]=ir(A,P({},E,{theme:O}))}),g(E,z)}),p&&!h&&_.push(E=>{var O;const $=nr(P({},E,{defaultTheme:n,themeId:t})),z=$==null||(O=$.components)==null||(O=O[p])==null?void 0:O.variants;return ir({variants:z},P({},E,{theme:$}))}),u||_.push(a);const D=_.length-S.length;if(Array.isArray(y)&&D>0){const E=new Array(D).fill("");C=[...y,...E],C.raw=[...y.raw,...E]}const V=R(C,..._);if(process.env.NODE_ENV!=="production"){let E;p&&(E=`${p}${et(f||"")}`),E===void 0&&(E=`Styled(${Ep(s)})`),V.displayName=E}return s.muiName&&(V.muiName=s.muiName),V};return R.withConfig&&(k.withConfig=R.withConfig),k}}function tu(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:li(t.components[n].defaultProps,r)}function nu({props:e,name:t,defaultTheme:n,themeId:r}){let o=hi(n);return r&&(o=o[r]||o),tu({theme:o,name:t,props:e})}function Do(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),qp(e,t,n)}function ru(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function At(e){if(e.type)return e;if(e.charAt(0)==="#")return At(ru(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Qt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Qt(10,o))}else r=r.split(",");return r=r.map(a=>parseFloat(a)),{type:n,values:r,colorSpace:o}}function Pr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,a)=>a<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function ou(e){e=At(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,a=r*Math.min(o,1-o),s=(f,m=(f+n/30)%12)=>o-a*Math.max(Math.min(m-3,9-m,1),-1);let l="rgb";const p=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(l+="a",p.push(t[3])),Pr({type:l,values:p})}function Aa(e){e=At(e);let t=e.type==="hsl"||e.type==="hsla"?At(ou(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Ba(e,t){const n=Aa(e),r=Aa(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function mr(e,t){return e=At(e),t=Do(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Pr(e)}function au(e,t){if(e=At(e),t=Do(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return Pr(e)}function su(e,t){if(e=At(e),t=Do(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return Pr(e)}function iu(e,t){return P({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const lu={black:"#000",white:"#fff"},In=lu,cu={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},pu=cu,du={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ft=du,uu={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},zt=uu,fu={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},gn=fu,mu={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ht=mu,hu={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Ut=hu,gu={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Gt=gu,bu=["mode","contrastThreshold","tonalOffset"],La={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:In.white,default:In.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Wr={text:{primary:In.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:In.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Va(e,t,n,r){const o=r.light||r,a=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=su(e.main,o):t==="dark"&&(e.dark=au(e.main,a)))}function vu(e="light"){return e==="dark"?{main:Ht[200],light:Ht[50],dark:Ht[400]}:{main:Ht[700],light:Ht[400],dark:Ht[800]}}function yu(e="light"){return e==="dark"?{main:Ft[200],light:Ft[50],dark:Ft[400]}:{main:Ft[500],light:Ft[300],dark:Ft[700]}}function wu(e="light"){return e==="dark"?{main:zt[500],light:zt[300],dark:zt[700]}:{main:zt[700],light:zt[400],dark:zt[800]}}function xu(e="light"){return e==="dark"?{main:Ut[400],light:Ut[300],dark:Ut[700]}:{main:Ut[700],light:Ut[500],dark:Ut[900]}}function ku(e="light"){return e==="dark"?{main:Gt[400],light:Gt[300],dark:Gt[700]}:{main:Gt[800],light:Gt[500],dark:Gt[900]}}function Eu(e="light"){return e==="dark"?{main:gn[400],light:gn[300],dark:gn[700]}:{main:"#ed6c02",light:gn[500],dark:gn[900]}}function Tu(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=me(e,bu),a=e.primary||vu(t),s=e.secondary||yu(t),l=e.error||wu(t),p=e.info||xu(t),f=e.success||ku(t),m=e.warning||Eu(t);function v(u){const b=Ba(u,Wr.text.primary)>=n?Wr.text.primary:La.text.primary;if(process.env.NODE_ENV!=="production"){const x=Ba(u,b);x<3&&console.error([`MUI: The contrast ratio of ${x}:1 for ${b} on ${u}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return b}const g=({color:u,name:b,mainShade:x=500,lightShade:R=300,darkShade:w=700})=>{if(u=P({},u),!u.main&&u[x]&&(u.main=u[x]),!u.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.`:Qt(11,b?` (${b})`:"",x));if(typeof u.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(u.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Qt(12,b?` (${b})`:"",JSON.stringify(u.main)));return Va(u,"light",R,r),Va(u,"dark",w,r),u.contrastText||(u.contrastText=v(u.main)),u},d={dark:Wr,light:La};return process.env.NODE_ENV!=="production"&&(d[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),ct(P({common:P({},In),mode:t,primary:g({color:a,name:"primary"}),secondary:g({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:g({color:l,name:"error"}),warning:g({color:m,name:"warning"}),info:g({color:p,name:"info"}),success:g({color:f,name:"success"}),grey:pu,contrastThreshold:n,getContrastText:v,augmentColor:g,tonalOffset:r},d[t]),o)}const Nu=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Su(e){return Math.round(e*1e5)/1e5}const Fa={textTransform:"uppercase"},za='"Roboto", "Helvetica", "Arial", sans-serif';function Cu(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=za,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:s=400,fontWeightMedium:l=500,fontWeightBold:p=700,htmlFontSize:f=16,allVariants:m,pxToRem:v}=n,g=me(n,Nu);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof f!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const d=o/14,h=v||(x=>`${x/f*d}rem`),u=(x,R,w,k,y)=>P({fontFamily:r,fontWeight:x,fontSize:h(R),lineHeight:w},r===za?{letterSpacing:`${Su(k/R)}em`}:{},y,m),b={h1:u(a,96,1.167,-1.5),h2:u(a,60,1.2,-.5),h3:u(s,48,1.167,0),h4:u(s,34,1.235,.25),h5:u(s,24,1.334,0),h6:u(l,20,1.6,.15),subtitle1:u(s,16,1.75,.15),subtitle2:u(l,14,1.57,.1),body1:u(s,16,1.5,.15),body2:u(s,14,1.43,.15),button:u(l,14,1.75,.4,Fa),caption:u(s,12,1.66,.4),overline:u(s,12,2.66,1,Fa),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return ct(P({htmlFontSize:f,pxToRem:h,fontFamily:r,fontSize:o,fontWeightLight:a,fontWeightRegular:s,fontWeightMedium:l,fontWeightBold:p},b),g,{clone:!1})}const Ou=.2,Ru=.14,ju=.12;function ge(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Ou})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Ru})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${ju})`].join(",")}const Pu=["none",ge(0,2,1,-1,0,1,1,0,0,1,3,0),ge(0,3,1,-2,0,2,2,0,0,1,5,0),ge(0,3,3,-2,0,3,4,0,0,1,8,0),ge(0,2,4,-1,0,4,5,0,0,1,10,0),ge(0,3,5,-1,0,5,8,0,0,1,14,0),ge(0,3,5,-1,0,6,10,0,0,1,18,0),ge(0,4,5,-2,0,7,10,1,0,2,16,1),ge(0,5,5,-3,0,8,10,1,0,3,14,2),ge(0,5,6,-3,0,9,12,1,0,3,16,2),ge(0,6,6,-3,0,10,14,1,0,4,18,3),ge(0,6,7,-4,0,11,15,1,0,4,20,3),ge(0,7,8,-4,0,12,17,2,0,5,22,4),ge(0,7,8,-4,0,13,19,2,0,5,24,4),ge(0,7,9,-4,0,14,21,2,0,5,26,4),ge(0,8,9,-5,0,15,22,2,0,6,28,5),ge(0,8,10,-5,0,16,24,2,0,6,30,5),ge(0,8,11,-5,0,17,26,2,0,6,32,5),ge(0,9,11,-5,0,18,28,2,0,7,34,6),ge(0,9,12,-6,0,19,29,2,0,7,36,6),ge(0,10,13,-6,0,20,31,3,0,8,38,7),ge(0,10,13,-6,0,21,33,3,0,8,40,7),ge(0,10,14,-6,0,22,35,3,0,8,42,7),ge(0,11,14,-7,0,23,36,3,0,9,44,8),ge(0,11,15,-7,0,24,38,3,0,9,46,8)],$u=Pu,_u=["duration","easing","delay"],Mu={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Iu={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Ha(e){return`${Math.round(e)}ms`}function Du(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Au(e){const t=P({},Mu,e.easing),n=P({},Iu,e.duration);return P({getAutoHeightDuration:Du,create:(o=["all"],a={})=>{const{duration:s=n.standard,easing:l=t.easeInOut,delay:p=0}=a,f=me(a,_u);if(process.env.NODE_ENV!=="production"){const m=g=>typeof g=="string",v=g=>!isNaN(parseFloat(g));!m(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!v(s)&&!m(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),m(l)||console.error('MUI: Argument "easing" must be a string.'),!v(p)&&!m(p)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(f).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(f).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(m=>`${m} ${typeof s=="string"?s:Ha(s)} ${l} ${typeof p=="string"?p:Ha(p)}`).join(",")}},e,{easing:t,duration:n})}const Bu={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Lu=Bu,Vu=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Fu(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:a={}}=e,s=me(e,Vu);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Qt(18));const l=Tu(r),p=Io(e);let f=ct(p,{mixins:iu(p.breakpoints,n),palette:l,shadows:$u.slice(),typography:Cu(l,a),transitions:Au(o),zIndex:P({},Lu)});if(f=ct(f,s),f=t.reduce((m,v)=>ct(m,v),f),process.env.NODE_ENV!=="production"){const m=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],v=(g,d)=>{let h;for(h in g){const u=g[h];if(m.indexOf(h)!==-1&&Object.keys(u).length>0){if(process.env.NODE_ENV!=="production"){const b=rt("",h);console.error([`MUI: The \`${d}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(g,null,2),"",`Instead, you need to use the '&.${b}' syntax:`,JSON.stringify({root:{[`&.${b}`]:u}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}g[h]={}}}};Object.keys(f.components).forEach(g=>{const d=f.components[g].styleOverrides;d&&g.indexOf("Mui")===0&&v(d,g)})}return f.unstable_sxConfig=P({},_o,s==null?void 0:s.unstable_sxConfig),f.unstable_sx=function(v){return Mo({sx:v,theme:this})},f}const zu=Fu(),Ao=zu,Bo="$$material";function mt({props:e,name:t}){return nu({props:e,name:t,defaultTheme:Ao,themeId:Bo})}const gi=e=>sr(e)&&e!=="classes",Hu=eu({themeId:Bo,defaultTheme:Ao,rootShouldForwardProp:gi}),Re=Hu;function Uu(e){return rt("MuiSvgIcon",e)}xt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Gu=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],qu=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${et(t)}`,`fontSize${et(n)}`]};return ft(o,Uu,r)},Wu=Re("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${et(n.color)}`],t[`fontSize${et(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,a,s,l,p,f,m,v,g,d,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((l=e.typography)==null||(p=l.pxToRem)==null?void 0:p.call(l,24))||"1.5rem",large:((f=e.typography)==null||(m=f.pxToRem)==null?void 0:m.call(f,35))||"2.1875rem"}[t.fontSize],color:(v=(g=(e.vars||e).palette)==null||(g=g[t.color])==null?void 0:g.main)!=null?v:{action:(d=(e.vars||e).palette)==null||(d=d.action)==null?void 0:d.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),Lo=N.forwardRef(function(t,n){const r=mt({props:t,name:"MuiSvgIcon"}),{children:o,className:a,color:s="inherit",component:l="svg",fontSize:p="medium",htmlColor:f,inheritViewBox:m=!1,titleAccess:v,viewBox:g="0 0 24 24"}=r,d=me(r,Gu),h=N.isValidElement(o)&&o.type==="svg",u=P({},r,{color:s,component:l,fontSize:p,instanceFontSize:t.fontSize,inheritViewBox:m,viewBox:g,hasSvgAsChild:h}),b={};m||(b.viewBox=g);const x=qu(u);return c.jsxs(Wu,P({as:l,className:Se(x.root,a),focusable:"false",color:f,"aria-hidden":v?void 0:!0,role:v?"img":void 0,ref:n},b,d,h&&o.props,{ownerState:u,children:[h?o.props.children:o,v?c.jsx("title",{children:v}):null]}))});process.env.NODE_ENV!=="production"&&(Lo.propTypes={children:i.node,classes:i.object,className:i.string,color:i.oneOfType([i.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),i.string]),component:i.elementType,fontSize:i.oneOfType([i.oneOf(["inherit","large","medium","small"]),i.string]),htmlColor:i.string,inheritViewBox:i.bool,shapeRendering:i.string,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),titleAccess:i.string,viewBox:i.string});Lo.muiName="SvgIcon";const Ua=Lo;function bi(e,t){function n(r,o){return c.jsx(Ua,P({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Ua.muiName,N.memo(N.forwardRef(n))}const Xu={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),ci.configure(e)}},Yu=Object.freeze(Object.defineProperty({__proto__:null,capitalize:et,createChainedFunction:io,createSvgIcon:bi,debounce:ei,deprecatedPropType:Np,isMuiElement:Sp,ownerDocument:Oe,ownerWindow:en,requirePropFactory:Cp,setRef:ur,unstable_ClassNameGenerator:Xu,unstable_useEnhancedEffect:Dt,unstable_useId:ti,unsupportedProp:jp,useControlled:ni,useEventCallback:Mn,useForkRef:Ge,useIsFocusVisible:ri},Symbol.toStringTag,{value:"Module"})),Ku=rp(Yu);var Ga;function Ju(){return Ga||(Ga=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Ku}(Lr)),Lr}var Zu=op;Object.defineProperty(Oo,"__esModule",{value:!0});var vi=Oo.default=void 0,Qu=Zu(Ju()),ef=c;vi=Oo.default=(0,Qu.default)((0,ef.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function yi(e){return typeof e=="string"}function Tn(e,t,n){return e===void 0||yi(e)?t:P({},t,{ownerState:P({},t.ownerState,n)})}const tf={disableDefaultClasses:!1},nf=N.createContext(tf);function rf(e){const{disableDefaultClasses:t}=N.useContext(nf);return n=>t?"":e(n)}function wi(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function of(e,t,n){return typeof e=="function"?e(t,n):e}function qa(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function af(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:a}=e;if(!t){const d=Se(n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),h=P({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),u=P({},n,o,r);return d.length>0&&(u.className=d),Object.keys(h).length>0&&(u.style=h),{props:u,internalRef:void 0}}const s=wi(P({},o,r)),l=qa(r),p=qa(o),f=t(s),m=Se(f==null?void 0:f.className,n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),v=P({},f==null?void 0:f.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),g=P({},f,n,p,l);return m.length>0&&(g.className=m),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:f.ref}}const sf=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Bt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:a=!1}=e,s=me(e,sf),l=a?{}:of(r,o),{props:p,internalRef:f}=af(P({},s,{externalSlotProps:l})),m=Ge(f,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return Tn(n,P({},p,{ref:m}),o)}const xi="base";function lf(e){return`${xi}--${e}`}function cf(e,t){return`${xi}-${e}-${t}`}function ki(e,t){const n=pi[t];return n?lf(n):cf(e,t)}function pf(e,t){const n={};return t.forEach(r=>{n[r]=ki(e,r)}),n}const df=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function uf(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function ff(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function mf(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||ff(e))}function hf(e){const t=[],n=[];return Array.from(e.querySelectorAll(df)).forEach((r,o)=>{const a=uf(r);a===-1||!mf(r)||(a===0?t.push(r):n.push({documentOrder:o,tabIndex:a,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function gf(){return!0}function hr(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:a=hf,isEnabled:s=gf,open:l}=e,p=N.useRef(!1),f=N.useRef(null),m=N.useRef(null),v=N.useRef(null),g=N.useRef(null),d=N.useRef(!1),h=N.useRef(null),u=Ge(t.ref,h),b=N.useRef(null);N.useEffect(()=>{!l||!h.current||(d.current=!n)},[n,l]),N.useEffect(()=>{if(!l||!h.current)return;const w=Oe(h.current);return h.current.contains(w.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),d.current&&h.current.focus()),()=>{o||(v.current&&v.current.focus&&(p.current=!0,v.current.focus()),v.current=null)}},[l]),N.useEffect(()=>{if(!l||!h.current)return;const w=Oe(h.current),k=C=>{b.current=C,!(r||!s()||C.key!=="Tab")&&w.activeElement===h.current&&C.shiftKey&&(p.current=!0,m.current&&m.current.focus())},y=()=>{const C=h.current;if(C===null)return;if(!w.hasFocus()||!s()||p.current){p.current=!1;return}if(C.contains(w.activeElement)||r&&w.activeElement!==f.current&&w.activeElement!==m.current)return;if(w.activeElement!==g.current)g.current=null;else if(g.current!==null)return;if(!d.current)return;let _=[];if((w.activeElement===f.current||w.activeElement===m.current)&&(_=a(h.current)),_.length>0){var D,V;const E=!!((D=b.current)!=null&&D.shiftKey&&((V=b.current)==null?void 0:V.key)==="Tab"),O=_[0],$=_[_.length-1];typeof O!="string"&&typeof $!="string"&&(E?$.focus():O.focus())}else C.focus()};w.addEventListener("focusin",y),w.addEventListener("keydown",k,!0);const S=setInterval(()=>{w.activeElement&&w.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(S),w.removeEventListener("focusin",y),w.removeEventListener("keydown",k,!0)}},[n,r,o,s,l,a]);const x=w=>{v.current===null&&(v.current=w.relatedTarget),d.current=!0,g.current=w.target;const k=t.props.onFocus;k&&k(w)},R=w=>{v.current===null&&(v.current=w.relatedTarget),d.current=!0};return c.jsxs(N.Fragment,{children:[c.jsx("div",{tabIndex:l?0:-1,onFocus:R,ref:f,"data-testid":"sentinelStart"}),N.cloneElement(t,{ref:u,onFocus:x}),c.jsx("div",{tabIndex:l?0:-1,onFocus:R,ref:m,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(hr.propTypes={children:Gn,disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableRestoreFocus:i.bool,getTabbable:i.func,isEnabled:i.func,open:i.bool.isRequired});process.env.NODE_ENV!=="production"&&(hr["propTypes"]=Zs(hr.propTypes));function bf(e){return typeof e=="function"?e():e}const Dn=N.forwardRef(function(t,n){const{children:r,container:o,disablePortal:a=!1}=t,[s,l]=N.useState(null),p=Ge(N.isValidElement(r)?r.ref:null,n);if(Dt(()=>{a||l(bf(o)||document.body)},[o,a]),Dt(()=>{if(s&&!a)return ur(n,s),()=>{ur(n,null)}},[n,s,a]),a){if(N.isValidElement(r)){const f={ref:p};return N.cloneElement(r,f)}return c.jsx(N.Fragment,{children:r})}return c.jsx(N.Fragment,{children:s&&lc.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&(Dn.propTypes={children:i.node,container:i.oneOfType([pt,i.func]),disablePortal:i.bool});process.env.NODE_ENV!=="production"&&(Dn["propTypes"]=Zs(Dn.propTypes));function vf(e){const t=Oe(e);return t.body===e?en(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function On(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Wa(e){return parseInt(en(e).getComputedStyle(e).paddingRight,10)||0}function yf(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Xa(e,t,n,r,o){const a=[t,n,...r];[].forEach.call(e.children,s=>{const l=a.indexOf(s)===-1,p=!yf(s);l&&p&&On(s,o)})}function Xr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function wf(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(vf(r)){const s=oi(Oe(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Wa(r)+s}px`;const l=Oe(r).querySelectorAll(".mui-fixed");[].forEach.call(l,p=>{n.push({value:p.style.paddingRight,property:"padding-right",el:p}),p.style.paddingRight=`${Wa(p)+s}px`})}let a;if(r.parentNode instanceof DocumentFragment)a=Oe(r).body;else{const s=r.parentElement,l=en(r);a=(s==null?void 0:s.nodeName)==="HTML"&&l.getComputedStyle(s).overflowY==="scroll"?s:r}n.push({value:a.style.overflow,property:"overflow",el:a},{value:a.style.overflowX,property:"overflow-x",el:a},{value:a.style.overflowY,property:"overflow-y",el:a}),a.style.overflow="hidden"}return()=>{n.forEach(({value:a,el:s,property:l})=>{a?s.style.setProperty(l,a):s.style.removeProperty(l)})}}function xf(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class kf{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&On(t.modalRef,!1);const o=xf(n);Xa(n,t.mount,t.modalRef,o,!0);const a=Xr(this.containers,s=>s.container===n);return a!==-1?(this.containers[a].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=Xr(this.containers,a=>a.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=wf(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=Xr(this.containers,s=>s.modals.indexOf(t)!==-1),a=this.containers[o];if(a.modals.splice(a.modals.indexOf(t),1),this.modals.splice(r,1),a.modals.length===0)a.restore&&a.restore(),t.modalRef&&On(t.modalRef,n),Xa(a.container,t.mount,t.modalRef,a.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=a.modals[a.modals.length-1];s.modalRef&&On(s.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Ef(e){return typeof e=="function"?e():e}function Tf(e){return e?e.props.hasOwnProperty("in"):!1}const Nf=new kf;function Sf(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Nf,closeAfterTransition:a=!1,onTransitionEnter:s,onTransitionExited:l,children:p,onClose:f,open:m,rootRef:v}=e,g=N.useRef({}),d=N.useRef(null),h=N.useRef(null),u=Ge(h,v),[b,x]=N.useState(!m),R=Tf(p);let w=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(w=!1);const k=()=>Oe(d.current),y=()=>(g.current.modalRef=h.current,g.current.mount=d.current,g.current),S=()=>{o.mount(y(),{disableScrollLock:r}),h.current&&(h.current.scrollTop=0)},C=Mn(()=>{const A=Ef(t)||k().body;o.add(y(),A),h.current&&S()}),_=N.useCallback(()=>o.isTopModal(y()),[o]),D=Mn(A=>{d.current=A,A&&(m&&_()?S():h.current&&On(h.current,w))}),V=N.useCallback(()=>{o.remove(y(),w)},[w,o]);N.useEffect(()=>()=>{V()},[V]),N.useEffect(()=>{m?C():(!R||!a)&&V()},[m,V,R,a,C]);const E=A=>B=>{var J;(J=A.onKeyDown)==null||J.call(A,B),!(B.key!=="Escape"||B.which===229||!_())&&(n||(B.stopPropagation(),f&&f(B,"escapeKeyDown")))},O=A=>B=>{var J;(J=A.onClick)==null||J.call(A,B),B.target===B.currentTarget&&f&&f(B,"backdropClick")};return{getRootProps:(A={})=>{const B=wi(e);delete B.onTransitionEnter,delete B.onTransitionExited;const J=P({},B,A);return P({role:"presentation"},J,{onKeyDown:E(J),ref:u})},getBackdropProps:(A={})=>{const B=A;return P({"aria-hidden":!0},B,{onClick:O(B),open:m})},getTransitionProps:()=>{const A=()=>{x(!1),s&&s()},B=()=>{x(!0),l&&l(),a&&V()};return{onEnter:io(A,p==null?void 0:p.props.onEnter),onExited:io(B,p==null?void 0:p.props.onExited)}},rootRef:u,portalRef:D,isTopModal:_,exited:b,hasTransition:R}}var _e="top",qe="bottom",We="right",Me="left",Vo="auto",Yn=[_e,qe,We,Me],tn="start",An="end",Cf="clippingParents",Ei="viewport",bn="popper",Of="reference",Ya=Yn.reduce(function(e,t){return e.concat([t+"-"+tn,t+"-"+An])},[]),Ti=[].concat(Yn,[Vo]).reduce(function(e,t){return e.concat([t,t+"-"+tn,t+"-"+An])},[]),Rf="beforeRead",jf="read",Pf="afterRead",$f="beforeMain",_f="main",Mf="afterMain",If="beforeWrite",Df="write",Af="afterWrite",Bf=[Rf,jf,Pf,$f,_f,Mf,If,Df,Af];function tt(e){return e?(e.nodeName||"").toLowerCase():null}function Fe(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Lt(e){var t=Fe(e).Element;return e instanceof t||e instanceof Element}function Ue(e){var t=Fe(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Fo(e){if(typeof ShadowRoot>"u")return!1;var t=Fe(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Lf(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},a=t.elements[n];!Ue(a)||!tt(a)||(Object.assign(a.style,r),Object.keys(o).forEach(function(s){var l=o[s];l===!1?a.removeAttribute(s):a.setAttribute(s,l===!0?"":l)}))})}function Vf(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],a=t.attributes[r]||{},s=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=s.reduce(function(p,f){return p[f]="",p},{});!Ue(o)||!tt(o)||(Object.assign(o.style,l),Object.keys(a).forEach(function(p){o.removeAttribute(p)}))})}}const Ff={name:"applyStyles",enabled:!0,phase:"write",fn:Lf,effect:Vf,requires:["computeStyles"]};function Ze(e){return e.split("-")[0]}var _t=Math.max,gr=Math.min,nn=Math.round;function po(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ni(){return!/^((?!chrome|android).)*safari/i.test(po())}function rn(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,a=1;t&&Ue(e)&&(o=e.offsetWidth>0&&nn(r.width)/e.offsetWidth||1,a=e.offsetHeight>0&&nn(r.height)/e.offsetHeight||1);var s=Lt(e)?Fe(e):window,l=s.visualViewport,p=!Ni()&&n,f=(r.left+(p&&l?l.offsetLeft:0))/o,m=(r.top+(p&&l?l.offsetTop:0))/a,v=r.width/o,g=r.height/a;return{width:v,height:g,top:m,right:f+v,bottom:m+g,left:f,x:f,y:m}}function zo(e){var t=rn(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Si(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Fo(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function ut(e){return Fe(e).getComputedStyle(e)}function zf(e){return["table","td","th"].indexOf(tt(e))>=0}function Et(e){return((Lt(e)?e.ownerDocument:e.document)||window.document).documentElement}function $r(e){return tt(e)==="html"?e:e.assignedSlot||e.parentNode||(Fo(e)?e.host:null)||Et(e)}function Ka(e){return!Ue(e)||ut(e).position==="fixed"?null:e.offsetParent}function Hf(e){var t=/firefox/i.test(po()),n=/Trident/i.test(po());if(n&&Ue(e)){var r=ut(e);if(r.position==="fixed")return null}var o=$r(e);for(Fo(o)&&(o=o.host);Ue(o)&&["html","body"].indexOf(tt(o))<0;){var a=ut(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function Kn(e){for(var t=Fe(e),n=Ka(e);n&&zf(n)&&ut(n).position==="static";)n=Ka(n);return n&&(tt(n)==="html"||tt(n)==="body"&&ut(n).position==="static")?t:n||Hf(e)||t}function Ho(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Rn(e,t,n){return _t(e,gr(t,n))}function Uf(e,t,n){var r=Rn(e,t,n);return r>n?n:r}function Ci(){return{top:0,right:0,bottom:0,left:0}}function Oi(e){return Object.assign({},Ci(),e)}function Ri(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Gf=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Oi(typeof t!="number"?t:Ri(t,Yn))};function qf(e){var t,n=e.state,r=e.name,o=e.options,a=n.elements.arrow,s=n.modifiersData.popperOffsets,l=Ze(n.placement),p=Ho(l),f=[Me,We].indexOf(l)>=0,m=f?"height":"width";if(!(!a||!s)){var v=Gf(o.padding,n),g=zo(a),d=p==="y"?_e:Me,h=p==="y"?qe:We,u=n.rects.reference[m]+n.rects.reference[p]-s[p]-n.rects.popper[m],b=s[p]-n.rects.reference[p],x=Kn(a),R=x?p==="y"?x.clientHeight||0:x.clientWidth||0:0,w=u/2-b/2,k=v[d],y=R-g[m]-v[h],S=R/2-g[m]/2+w,C=Rn(k,S,y),_=p;n.modifiersData[r]=(t={},t[_]=C,t.centerOffset=C-S,t)}}function Wf(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Si(t.elements.popper,o)&&(t.elements.arrow=o))}const Xf={name:"arrow",enabled:!0,phase:"main",fn:qf,effect:Wf,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function on(e){return e.split("-")[1]}var Yf={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Kf(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:nn(n*o)/o||0,y:nn(r*o)/o||0}}function Ja(e){var t,n=e.popper,r=e.popperRect,o=e.placement,a=e.variation,s=e.offsets,l=e.position,p=e.gpuAcceleration,f=e.adaptive,m=e.roundOffsets,v=e.isFixed,g=s.x,d=g===void 0?0:g,h=s.y,u=h===void 0?0:h,b=typeof m=="function"?m({x:d,y:u}):{x:d,y:u};d=b.x,u=b.y;var x=s.hasOwnProperty("x"),R=s.hasOwnProperty("y"),w=Me,k=_e,y=window;if(f){var S=Kn(n),C="clientHeight",_="clientWidth";if(S===Fe(n)&&(S=Et(n),ut(S).position!=="static"&&l==="absolute"&&(C="scrollHeight",_="scrollWidth")),S=S,o===_e||(o===Me||o===We)&&a===An){k=qe;var D=v&&S===y&&y.visualViewport?y.visualViewport.height:S[C];u-=D-r.height,u*=p?1:-1}if(o===Me||(o===_e||o===qe)&&a===An){w=We;var V=v&&S===y&&y.visualViewport?y.visualViewport.width:S[_];d-=V-r.width,d*=p?1:-1}}var E=Object.assign({position:l},f&&Yf),O=m===!0?Kf({x:d,y:u},Fe(n)):{x:d,y:u};if(d=O.x,u=O.y,p){var $;return Object.assign({},E,($={},$[k]=R?"0":"",$[w]=x?"0":"",$.transform=(y.devicePixelRatio||1)<=1?"translate("+d+"px, "+u+"px)":"translate3d("+d+"px, "+u+"px, 0)",$))}return Object.assign({},E,(t={},t[k]=R?u+"px":"",t[w]=x?d+"px":"",t.transform="",t))}function Jf(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,a=n.adaptive,s=a===void 0?!0:a,l=n.roundOffsets,p=l===void 0?!0:l,f={placement:Ze(t.placement),variation:on(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Ja(Object.assign({},f,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:p})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Ja(Object.assign({},f,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:p})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Zf={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Jf,data:{}};var rr={passive:!0};function Qf(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,a=o===void 0?!0:o,s=r.resize,l=s===void 0?!0:s,p=Fe(t.elements.popper),f=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&f.forEach(function(m){m.addEventListener("scroll",n.update,rr)}),l&&p.addEventListener("resize",n.update,rr),function(){a&&f.forEach(function(m){m.removeEventListener("scroll",n.update,rr)}),l&&p.removeEventListener("resize",n.update,rr)}}const em={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Qf,data:{}};var tm={left:"right",right:"left",bottom:"top",top:"bottom"};function lr(e){return e.replace(/left|right|bottom|top/g,function(t){return tm[t]})}var nm={start:"end",end:"start"};function Za(e){return e.replace(/start|end/g,function(t){return nm[t]})}function Uo(e){var t=Fe(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Go(e){return rn(Et(e)).left+Uo(e).scrollLeft}function rm(e,t){var n=Fe(e),r=Et(e),o=n.visualViewport,a=r.clientWidth,s=r.clientHeight,l=0,p=0;if(o){a=o.width,s=o.height;var f=Ni();(f||!f&&t==="fixed")&&(l=o.offsetLeft,p=o.offsetTop)}return{width:a,height:s,x:l+Go(e),y:p}}function om(e){var t,n=Et(e),r=Uo(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=_t(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=_t(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Go(e),p=-r.scrollTop;return ut(o||n).direction==="rtl"&&(l+=_t(n.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:l,y:p}}function qo(e){var t=ut(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function ji(e){return["html","body","#document"].indexOf(tt(e))>=0?e.ownerDocument.body:Ue(e)&&qo(e)?e:ji($r(e))}function jn(e,t){var n;t===void 0&&(t=[]);var r=ji(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),a=Fe(r),s=o?[a].concat(a.visualViewport||[],qo(r)?r:[]):r,l=t.concat(s);return o?l:l.concat(jn($r(s)))}function uo(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function am(e,t){var n=rn(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Qa(e,t,n){return t===Ei?uo(rm(e,n)):Lt(t)?am(t,n):uo(om(Et(e)))}function sm(e){var t=jn($r(e)),n=["absolute","fixed"].indexOf(ut(e).position)>=0,r=n&&Ue(e)?Kn(e):e;return Lt(r)?t.filter(function(o){return Lt(o)&&Si(o,r)&&tt(o)!=="body"}):[]}function im(e,t,n,r){var o=t==="clippingParents"?sm(e):[].concat(t),a=[].concat(o,[n]),s=a[0],l=a.reduce(function(p,f){var m=Qa(e,f,r);return p.top=_t(m.top,p.top),p.right=gr(m.right,p.right),p.bottom=gr(m.bottom,p.bottom),p.left=_t(m.left,p.left),p},Qa(e,s,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function Pi(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ze(r):null,a=r?on(r):null,s=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,p;switch(o){case _e:p={x:s,y:t.y-n.height};break;case qe:p={x:s,y:t.y+t.height};break;case We:p={x:t.x+t.width,y:l};break;case Me:p={x:t.x-n.width,y:l};break;default:p={x:t.x,y:t.y}}var f=o?Ho(o):null;if(f!=null){var m=f==="y"?"height":"width";switch(a){case tn:p[f]=p[f]-(t[m]/2-n[m]/2);break;case An:p[f]=p[f]+(t[m]/2-n[m]/2);break}}return p}function Bn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,a=n.strategy,s=a===void 0?e.strategy:a,l=n.boundary,p=l===void 0?Cf:l,f=n.rootBoundary,m=f===void 0?Ei:f,v=n.elementContext,g=v===void 0?bn:v,d=n.altBoundary,h=d===void 0?!1:d,u=n.padding,b=u===void 0?0:u,x=Oi(typeof b!="number"?b:Ri(b,Yn)),R=g===bn?Of:bn,w=e.rects.popper,k=e.elements[h?R:g],y=im(Lt(k)?k:k.contextElement||Et(e.elements.popper),p,m,s),S=rn(e.elements.reference),C=Pi({reference:S,element:w,strategy:"absolute",placement:o}),_=uo(Object.assign({},w,C)),D=g===bn?_:S,V={top:y.top-D.top+x.top,bottom:D.bottom-y.bottom+x.bottom,left:y.left-D.left+x.left,right:D.right-y.right+x.right},E=e.modifiersData.offset;if(g===bn&&E){var O=E[o];Object.keys(V).forEach(function($){var z=[We,qe].indexOf($)>=0?1:-1,H=[_e,qe].indexOf($)>=0?"y":"x";V[$]+=O[H]*z})}return V}function lm(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,a=n.rootBoundary,s=n.padding,l=n.flipVariations,p=n.allowedAutoPlacements,f=p===void 0?Ti:p,m=on(r),v=m?l?Ya:Ya.filter(function(h){return on(h)===m}):Yn,g=v.filter(function(h){return f.indexOf(h)>=0});g.length===0&&(g=v);var d=g.reduce(function(h,u){return h[u]=Bn(e,{placement:u,boundary:o,rootBoundary:a,padding:s})[Ze(u)],h},{});return Object.keys(d).sort(function(h,u){return d[h]-d[u]})}function cm(e){if(Ze(e)===Vo)return[];var t=lr(e);return[Za(e),t,Za(t)]}function pm(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,a=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!0:s,p=n.fallbackPlacements,f=n.padding,m=n.boundary,v=n.rootBoundary,g=n.altBoundary,d=n.flipVariations,h=d===void 0?!0:d,u=n.allowedAutoPlacements,b=t.options.placement,x=Ze(b),R=x===b,w=p||(R||!h?[lr(b)]:cm(b)),k=[b].concat(w).reduce(function(G,q){return G.concat(Ze(q)===Vo?lm(t,{placement:q,boundary:m,rootBoundary:v,padding:f,flipVariations:h,allowedAutoPlacements:u}):q)},[]),y=t.rects.reference,S=t.rects.popper,C=new Map,_=!0,D=k[0],V=0;V<k.length;V++){var E=k[V],O=Ze(E),$=on(E)===tn,z=[_e,qe].indexOf(O)>=0,H=z?"width":"height",A=Bn(t,{placement:E,boundary:m,rootBoundary:v,altBoundary:g,padding:f}),B=z?$?We:Me:$?qe:_e;y[H]>S[H]&&(B=lr(B));var J=lr(B),Z=[];if(a&&Z.push(A[O]<=0),l&&Z.push(A[B]<=0,A[J]<=0),Z.every(function(G){return G})){D=E,_=!1;break}C.set(E,Z)}if(_)for(var j=h?3:1,M=function(q){var X=k.find(function(Y){var W=C.get(Y);if(W)return W.slice(0,q).every(function(Q){return Q})});if(X)return D=X,"break"},U=j;U>0;U--){var K=M(U);if(K==="break")break}t.placement!==D&&(t.modifiersData[r]._skip=!0,t.placement=D,t.reset=!0)}}const dm={name:"flip",enabled:!0,phase:"main",fn:pm,requiresIfExists:["offset"],data:{_skip:!1}};function es(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ts(e){return[_e,We,qe,Me].some(function(t){return e[t]>=0})}function um(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,s=Bn(t,{elementContext:"reference"}),l=Bn(t,{altBoundary:!0}),p=es(s,r),f=es(l,o,a),m=ts(p),v=ts(f);t.modifiersData[n]={referenceClippingOffsets:p,popperEscapeOffsets:f,isReferenceHidden:m,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":m,"data-popper-escaped":v})}const fm={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:um};function mm(e,t,n){var r=Ze(e),o=[Me,_e].indexOf(r)>=0?-1:1,a=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,s=a[0],l=a[1];return s=s||0,l=(l||0)*o,[Me,We].indexOf(r)>=0?{x:l,y:s}:{x:s,y:l}}function hm(e){var t=e.state,n=e.options,r=e.name,o=n.offset,a=o===void 0?[0,0]:o,s=Ti.reduce(function(m,v){return m[v]=mm(v,t.rects,a),m},{}),l=s[t.placement],p=l.x,f=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=p,t.modifiersData.popperOffsets.y+=f),t.modifiersData[r]=s}const gm={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:hm};function bm(e){var t=e.state,n=e.name;t.modifiersData[n]=Pi({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const vm={name:"popperOffsets",enabled:!0,phase:"read",fn:bm,data:{}};function ym(e){return e==="x"?"y":"x"}function wm(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,a=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!1:s,p=n.boundary,f=n.rootBoundary,m=n.altBoundary,v=n.padding,g=n.tether,d=g===void 0?!0:g,h=n.tetherOffset,u=h===void 0?0:h,b=Bn(t,{boundary:p,rootBoundary:f,padding:v,altBoundary:m}),x=Ze(t.placement),R=on(t.placement),w=!R,k=Ho(x),y=ym(k),S=t.modifiersData.popperOffsets,C=t.rects.reference,_=t.rects.popper,D=typeof u=="function"?u(Object.assign({},t.rects,{placement:t.placement})):u,V=typeof D=="number"?{mainAxis:D,altAxis:D}:Object.assign({mainAxis:0,altAxis:0},D),E=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,O={x:0,y:0};if(S){if(a){var $,z=k==="y"?_e:Me,H=k==="y"?qe:We,A=k==="y"?"height":"width",B=S[k],J=B+b[z],Z=B-b[H],j=d?-_[A]/2:0,M=R===tn?C[A]:_[A],U=R===tn?-_[A]:-C[A],K=t.elements.arrow,G=d&&K?zo(K):{width:0,height:0},q=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Ci(),X=q[z],Y=q[H],W=Rn(0,C[A],G[A]),Q=w?C[A]/2-j-W-X-V.mainAxis:M-W-X-V.mainAxis,ee=w?-C[A]/2+j+W+Y+V.mainAxis:U+W+Y+V.mainAxis,ae=t.elements.arrow&&Kn(t.elements.arrow),L=ae?k==="y"?ae.clientTop||0:ae.clientLeft||0:0,te=($=E==null?void 0:E[k])!=null?$:0,I=B+Q-te-L,se=B+ee-te,Ee=Rn(d?gr(J,I):J,B,d?_t(Z,se):Z);S[k]=Ee,O[k]=Ee-B}if(l){var je,we=k==="x"?_e:Me,Tt=k==="x"?qe:We,Pe=S[y],ot=y==="y"?"height":"width",Ae=Pe+b[we],at=Pe-b[Tt],Te=[_e,Me].indexOf(x)!==-1,Vt=(je=E==null?void 0:E[y])!=null?je:0,Nt=Te?Ae:Pe-C[ot]-_[ot]-Vt+V.altAxis,cn=Te?Pe+C[ot]+_[ot]-Vt-V.altAxis:at,Zn=d&&Te?Uf(Nt,Pe,cn):Rn(d?Nt:Ae,Pe,d?cn:at);S[y]=Zn,O[y]=Zn-Pe}t.modifiersData[r]=O}}const xm={name:"preventOverflow",enabled:!0,phase:"main",fn:wm,requiresIfExists:["offset"]};function km(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Em(e){return e===Fe(e)||!Ue(e)?Uo(e):km(e)}function Tm(e){var t=e.getBoundingClientRect(),n=nn(t.width)/e.offsetWidth||1,r=nn(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Nm(e,t,n){n===void 0&&(n=!1);var r=Ue(t),o=Ue(t)&&Tm(t),a=Et(t),s=rn(e,o,n),l={scrollLeft:0,scrollTop:0},p={x:0,y:0};return(r||!r&&!n)&&((tt(t)!=="body"||qo(a))&&(l=Em(t)),Ue(t)?(p=rn(t,!0),p.x+=t.clientLeft,p.y+=t.clientTop):a&&(p.x=Go(a))),{x:s.left+l.scrollLeft-p.x,y:s.top+l.scrollTop-p.y,width:s.width,height:s.height}}function Sm(e){var t=new Map,n=new Set,r=[];e.forEach(function(a){t.set(a.name,a)});function o(a){n.add(a.name);var s=[].concat(a.requires||[],a.requiresIfExists||[]);s.forEach(function(l){if(!n.has(l)){var p=t.get(l);p&&o(p)}}),r.push(a)}return e.forEach(function(a){n.has(a.name)||o(a)}),r}function Cm(e){var t=Sm(e);return Bf.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Om(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Rm(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var ns={placement:"bottom",modifiers:[],strategy:"absolute"};function rs(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function jm(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,a=o===void 0?ns:o;return function(l,p,f){f===void 0&&(f=a);var m={placement:"bottom",orderedModifiers:[],options:Object.assign({},ns,a),modifiersData:{},elements:{reference:l,popper:p},attributes:{},styles:{}},v=[],g=!1,d={state:m,setOptions:function(x){var R=typeof x=="function"?x(m.options):x;u(),m.options=Object.assign({},a,m.options,R),m.scrollParents={reference:Lt(l)?jn(l):l.contextElement?jn(l.contextElement):[],popper:jn(p)};var w=Cm(Rm([].concat(r,m.options.modifiers)));return m.orderedModifiers=w.filter(function(k){return k.enabled}),h(),d.update()},forceUpdate:function(){if(!g){var x=m.elements,R=x.reference,w=x.popper;if(rs(R,w)){m.rects={reference:Nm(R,Kn(w),m.options.strategy==="fixed"),popper:zo(w)},m.reset=!1,m.placement=m.options.placement,m.orderedModifiers.forEach(function(V){return m.modifiersData[V.name]=Object.assign({},V.data)});for(var k=0;k<m.orderedModifiers.length;k++){if(m.reset===!0){m.reset=!1,k=-1;continue}var y=m.orderedModifiers[k],S=y.fn,C=y.options,_=C===void 0?{}:C,D=y.name;typeof S=="function"&&(m=S({state:m,options:_,name:D,instance:d})||m)}}}},update:Om(function(){return new Promise(function(b){d.forceUpdate(),b(m)})}),destroy:function(){u(),g=!0}};if(!rs(l,p))return d;d.setOptions(f).then(function(b){!g&&f.onFirstUpdate&&f.onFirstUpdate(b)});function h(){m.orderedModifiers.forEach(function(b){var x=b.name,R=b.options,w=R===void 0?{}:R,k=b.effect;if(typeof k=="function"){var y=k({state:m,name:x,instance:d,options:w}),S=function(){};v.push(y||S)}})}function u(){v.forEach(function(b){return b()}),v=[]}return d}}var Pm=[em,vm,Zf,Ff,gm,dm,xm,Xf,fm],$m=jm({defaultModifiers:Pm});const $i="Popper";function _m(e){return ki($i,e)}pf($i,["root"]);const Mm=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Im=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Dm(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function br(e){return typeof e=="function"?e():e}function _r(e){return e.nodeType!==void 0}function Am(e){return!_r(e)}const Bm=()=>ft({root:["root"]},rf(_m)),Lm={},Vm=N.forwardRef(function(t,n){var r;const{anchorEl:o,children:a,direction:s,disablePortal:l,modifiers:p,open:f,placement:m,popperOptions:v,popperRef:g,slotProps:d={},slots:h={},TransitionProps:u}=t,b=me(t,Mm),x=N.useRef(null),R=Ge(x,n),w=N.useRef(null),k=Ge(w,g),y=N.useRef(k);Dt(()=>{y.current=k},[k]),N.useImperativeHandle(g,()=>w.current,[]);const S=Dm(m,s),[C,_]=N.useState(S),[D,V]=N.useState(br(o));N.useEffect(()=>{w.current&&w.current.forceUpdate()}),N.useEffect(()=>{o&&V(br(o))},[o]),Dt(()=>{if(!D||!f)return;const H=J=>{_(J.placement)};if(process.env.NODE_ENV!=="production"&&D&&_r(D)&&D.nodeType===1){const J=D.getBoundingClientRect();process.env.NODE_ENV!=="test"&&J.top===0&&J.left===0&&J.right===0&&J.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let A=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:J})=>{H(J)}}];p!=null&&(A=A.concat(p)),v&&v.modifiers!=null&&(A=A.concat(v.modifiers));const B=$m(D,x.current,P({placement:S},v,{modifiers:A}));return y.current(B),()=>{B.destroy(),y.current(null)}},[D,l,p,f,v,S]);const E={placement:C};u!==null&&(E.TransitionProps=u);const O=Bm(),$=(r=h.root)!=null?r:"div",z=Bt({elementType:$,externalSlotProps:d.root,externalForwardedProps:b,additionalProps:{role:"tooltip",ref:R},ownerState:t,className:O.root});return c.jsx($,P({},z,{children:typeof a=="function"?a(E):a}))}),_i=N.forwardRef(function(t,n){const{anchorEl:r,children:o,container:a,direction:s="ltr",disablePortal:l=!1,keepMounted:p=!1,modifiers:f,open:m,placement:v="bottom",popperOptions:g=Lm,popperRef:d,style:h,transition:u=!1,slotProps:b={},slots:x={}}=t,R=me(t,Im),[w,k]=N.useState(!0),y=()=>{k(!1)},S=()=>{k(!0)};if(!p&&!m&&(!u||w))return null;let C;if(a)C=a;else if(r){const V=br(r);C=V&&_r(V)?Oe(V).body:Oe(null).body}const _=!m&&p&&(!u||w)?"none":void 0,D=u?{in:m,onEnter:y,onExited:S}:void 0;return c.jsx(Dn,{disablePortal:l,container:C,children:c.jsx(Vm,P({anchorEl:r,direction:s,disablePortal:l,modifiers:f,ref:n,open:u?!w:m,placement:v,popperOptions:g,popperRef:d,slotProps:b,slots:x},R,{style:P({position:"fixed",top:0,left:0,display:_},h),TransitionProps:D,children:o}))})});process.env.NODE_ENV!=="production"&&(_i.propTypes={anchorEl:ln(i.oneOfType([pt,i.object,i.func]),e=>{if(e.open){const t=br(e.anchorEl);if(t&&_r(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Am(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:i.oneOfType([i.node,i.func]),container:i.oneOfType([pt,i.func]),direction:i.oneOf(["ltr","rtl"]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:jo,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),transition:i.bool});function Jn(){const e=hi(Ao);return process.env.NODE_ENV!=="production"&&N.useDebugValue(e),e[Bo]||e}function fo(e,t){return fo=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},fo(e,t)}function Fm(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,fo(e,t)}const os={disabled:!1};var zm=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.shape({enter:i.number,exit:i.number,appear:i.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&i.oneOfType([i.string,i.shape({enter:i.string,exit:i.string,active:i.string}),i.shape({enter:i.string,enterDone:i.string,enterActive:i.string,exit:i.string,exitDone:i.string,exitActive:i.string})]);const Mi=T.createContext(null);var Hm=function(t){return t.scrollTop},Nn="unmounted",Ct="exited",Ot="entering",Xt="entered",mo="exiting",ht=function(e){Fm(t,e);function t(r,o){var a;a=e.call(this,r,o)||this;var s=o,l=s&&!s.isMounting?r.enter:r.appear,p;return a.appearStatus=null,r.in?l?(p=Ct,a.appearStatus=Ot):p=Xt:r.unmountOnExit||r.mountOnEnter?p=Nn:p=Ct,a.state={status:p},a.nextCallback=null,a}t.getDerivedStateFromProps=function(o,a){var s=o.in;return s&&a.status===Nn?{status:Ct}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var a=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==Ot&&s!==Xt&&(a=Ot):(s===Ot||s===Xt)&&(a=mo)}this.updateStatus(!1,a)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,a,s,l;return a=s=l=o,o!=null&&typeof o!="number"&&(a=o.exit,s=o.enter,l=o.appear!==void 0?o.appear:s),{exit:a,enter:s,appear:l}},n.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===Ot){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:xn.findDOMNode(this);s&&Hm(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Ct&&this.setState({status:Nn})},n.performEnter=function(o){var a=this,s=this.props.enter,l=this.context?this.context.isMounting:o,p=this.props.nodeRef?[l]:[xn.findDOMNode(this),l],f=p[0],m=p[1],v=this.getTimeouts(),g=l?v.appear:v.enter;if(!o&&!s||os.disabled){this.safeSetState({status:Xt},function(){a.props.onEntered(f)});return}this.props.onEnter(f,m),this.safeSetState({status:Ot},function(){a.props.onEntering(f,m),a.onTransitionEnd(g,function(){a.safeSetState({status:Xt},function(){a.props.onEntered(f,m)})})})},n.performExit=function(){var o=this,a=this.props.exit,s=this.getTimeouts(),l=this.props.nodeRef?void 0:xn.findDOMNode(this);if(!a||os.disabled){this.safeSetState({status:Ct},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:mo},function(){o.props.onExiting(l),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:Ct},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},n.setNextCallback=function(o){var a=this,s=!0;return this.nextCallback=function(l){s&&(s=!1,a.nextCallback=null,o(l))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},n.onTransitionEnd=function(o,a){this.setNextCallback(a);var s=this.props.nodeRef?this.props.nodeRef.current:xn.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!s||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var p=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],f=p[0],m=p[1];this.props.addEndListener(f,m)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===Nn)return null;var a=this.props,s=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var l=me(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return T.createElement(Mi.Provider,{value:null},typeof s=="function"?s(o,l):T.cloneElement(T.Children.only(s),l))},t}(T.Component);ht.contextType=Mi;ht.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:i.shape({current:typeof Element>"u"?i.any:function(e,t,n,r,o,a){var s=e[t];return i.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,a)}}),children:i.oneOfType([i.func.isRequired,i.element.isRequired]).isRequired,in:i.bool,mountOnEnter:i.bool,unmountOnExit:i.bool,appear:i.bool,enter:i.bool,exit:i.bool,timeout:function(t){var n=zm;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),a=1;a<r;a++)o[a-1]=arguments[a];return n.apply(void 0,[t].concat(o))},addEndListener:i.func,onEnter:i.func,onEntering:i.func,onEntered:i.func,onExit:i.func,onExiting:i.func,onExited:i.func}:{};function qt(){}ht.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:qt,onEntering:qt,onEntered:qt,onExit:qt,onExiting:qt,onExited:qt};ht.UNMOUNTED=Nn;ht.EXITED=Ct;ht.ENTERING=Ot;ht.ENTERED=Xt;ht.EXITING=mo;const Ii=ht,Di=e=>e.scrollTop;function vr(e,t){var n,r;const{timeout:o,easing:a,style:s={}}=e;return{duration:(n=s.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof a=="object"?a[t.mode]:a,delay:s.transitionDelay}}const Um=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function ho(e){return`scale(${e}, ${e**2})`}const Gm={entering:{opacity:1,transform:ho(1)},entered:{opacity:1,transform:"none"}},Yr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Wo=N.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:a,easing:s,in:l,onEnter:p,onEntered:f,onEntering:m,onExit:v,onExited:g,onExiting:d,style:h,timeout:u="auto",TransitionComponent:b=Ii}=t,x=me(t,Um),R=En(),w=N.useRef(),k=Jn(),y=N.useRef(null),S=Ge(y,a.ref,n),C=H=>A=>{if(H){const B=y.current;A===void 0?H(B):H(B,A)}},_=C(m),D=C((H,A)=>{Di(H);const{duration:B,delay:J,easing:Z}=vr({style:h,timeout:u,easing:s},{mode:"enter"});let j;u==="auto"?(j=k.transitions.getAutoHeightDuration(H.clientHeight),w.current=j):j=B,H.style.transition=[k.transitions.create("opacity",{duration:j,delay:J}),k.transitions.create("transform",{duration:Yr?j:j*.666,delay:J,easing:Z})].join(","),p&&p(H,A)}),V=C(f),E=C(d),O=C(H=>{const{duration:A,delay:B,easing:J}=vr({style:h,timeout:u,easing:s},{mode:"exit"});let Z;u==="auto"?(Z=k.transitions.getAutoHeightDuration(H.clientHeight),w.current=Z):Z=A,H.style.transition=[k.transitions.create("opacity",{duration:Z,delay:B}),k.transitions.create("transform",{duration:Yr?Z:Z*.666,delay:Yr?B:B||Z*.333,easing:J})].join(","),H.style.opacity=0,H.style.transform=ho(.75),v&&v(H)}),$=C(g),z=H=>{u==="auto"&&R.start(w.current||0,H),r&&r(y.current,H)};return c.jsx(b,P({appear:o,in:l,nodeRef:y,onEnter:D,onEntered:V,onEntering:_,onExit:O,onExited:$,onExiting:E,addEndListener:z,timeout:u==="auto"?null:u},x,{children:(H,A)=>N.cloneElement(a,P({style:P({opacity:0,transform:ho(.75),visibility:H==="exited"&&!l?"hidden":void 0},Gm[H],h,a.props.style),ref:S},A))}))});process.env.NODE_ENV!=="production"&&(Wo.propTypes={addEndListener:i.func,appear:i.bool,children:Gn.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});Wo.muiSupportAuto=!0;const go=Wo,qm=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},as=qm,Wm=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Xm=Re(_i,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ai=N.forwardRef(function(t,n){var r;const o=mi(),a=mt({props:t,name:"MuiPopper"}),{anchorEl:s,component:l,components:p,componentsProps:f,container:m,disablePortal:v,keepMounted:g,modifiers:d,open:h,placement:u,popperOptions:b,popperRef:x,transition:R,slots:w,slotProps:k}=a,y=me(a,Wm),S=(r=w==null?void 0:w.root)!=null?r:p==null?void 0:p.Root,C=P({anchorEl:s,container:m,disablePortal:v,keepMounted:g,modifiers:d,open:h,placement:u,popperOptions:b,popperRef:x,transition:R},y);return c.jsx(Xm,P({as:l,direction:o==null?void 0:o.direction,slots:{root:S},slotProps:k??f},C,{ref:n}))});process.env.NODE_ENV!=="production"&&(Ai.propTypes={anchorEl:i.oneOfType([pt,i.object,i.func]),children:i.oneOfType([i.node,i.func]),component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:jo,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transition:i.bool});const Bi=Ai;function Ym(e){return rt("MuiTooltip",e)}const Km=xt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),wt=Km,Jm=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Zm(e){return Math.round(e*1e5)/1e5}const Qm=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:a}=e,s={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${et(a.split("-")[0])}`],arrow:["arrow"]};return ft(s,Ym,t)},eh=Re(Bi,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>P({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${wt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${wt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${wt.arrow}`]:P({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${wt.arrow}`]:P({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),th=Re("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${et(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>P({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:mr(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Zm(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${wt.popper}[data-popper-placement*="left"] &`]:P({transformOrigin:"right center"},t.isRtl?P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):P({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${wt.popper}[data-popper-placement*="right"] &`]:P({transformOrigin:"left center"},t.isRtl?P({marginRight:"14px"},t.touch&&{marginRight:"24px"}):P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${wt.popper}[data-popper-placement*="top"] &`]:P({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${wt.popper}[data-popper-placement*="bottom"] &`]:P({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),nh=Re("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:mr(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let or=!1;const ss=new qn;let vn={x:0,y:0};function ar(e,t){return n=>{t&&t(n),e(n)}}const Li=N.forwardRef(function(t,n){var r,o,a,s,l,p,f,m,v,g,d,h,u,b,x,R,w,k,y;const S=mt({props:t,name:"MuiTooltip"}),{arrow:C=!1,children:_,components:D={},componentsProps:V={},describeChild:E=!1,disableFocusListener:O=!1,disableHoverListener:$=!1,disableInteractive:z=!1,disableTouchListener:H=!1,enterDelay:A=100,enterNextDelay:B=0,enterTouchDelay:J=700,followCursor:Z=!1,id:j,leaveDelay:M=0,leaveTouchDelay:U=1500,onClose:K,onOpen:G,open:q,placement:X="bottom",PopperComponent:Y,PopperProps:W={},slotProps:Q={},slots:ee={},title:ae,TransitionComponent:L=go,TransitionProps:te}=S,I=me(S,Jm),se=N.isValidElement(_)?_:c.jsx("span",{children:_}),Ee=Jn(),je=Ee.direction==="rtl",[we,Tt]=N.useState(),[Pe,ot]=N.useState(null),Ae=N.useRef(!1),at=z||Z,Te=En(),Vt=En(),Nt=En(),cn=En(),[Zn,Qo]=ni({controlled:q,default:!1,name:"Tooltip",state:"open"});let st=Zn;if(process.env.NODE_ENV!=="production"){const{current:ne}=N.useRef(q!==void 0);N.useEffect(()=>{we&&we.disabled&&!ne&&ae!==""&&we.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ae,we,ne])}const Mr=ti(j),pn=N.useRef(),Qn=Mn(()=>{pn.current!==void 0&&(document.body.style.WebkitUserSelect=pn.current,pn.current=void 0),cn.clear()});N.useEffect(()=>Qn,[Qn]);const ea=ne=>{ss.clear(),or=!0,Qo(!0),G&&!st&&G(ne)},er=Mn(ne=>{ss.start(800+M,()=>{or=!1}),Qo(!1),K&&st&&K(ne),Te.start(Ee.transitions.duration.shortest,()=>{Ae.current=!1})}),Ir=ne=>{Ae.current&&ne.type!=="touchstart"||(we&&we.removeAttribute("title"),Vt.clear(),Nt.clear(),A||or&&B?Vt.start(or?B:A,()=>{ea(ne)}):ea(ne))},ta=ne=>{Vt.clear(),Nt.start(M,()=>{er(ne)})},{isFocusVisibleRef:na,onBlur:Fl,onFocus:zl,ref:Hl}=ri(),[,ra]=N.useState(!1),oa=ne=>{Fl(ne),na.current===!1&&(ra(!1),ta(ne))},aa=ne=>{we||Tt(ne.currentTarget),zl(ne),na.current===!0&&(ra(!0),Ir(ne))},sa=ne=>{Ae.current=!0;const Be=se.props;Be.onTouchStart&&Be.onTouchStart(ne)},ia=Ir,la=ta,Ul=ne=>{sa(ne),Nt.clear(),Te.clear(),Qn(),pn.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",cn.start(J,()=>{document.body.style.WebkitUserSelect=pn.current,Ir(ne)})},Gl=ne=>{se.props.onTouchEnd&&se.props.onTouchEnd(ne),Qn(),Nt.start(U,()=>{er(ne)})};N.useEffect(()=>{if(!st)return;function ne(Be){(Be.key==="Escape"||Be.key==="Esc")&&er(Be)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[er,st]);const ql=Ge(se.ref,Hl,Tt,n);!ae&&ae!==0&&(st=!1);const Dr=N.useRef(),Wl=ne=>{const Be=se.props;Be.onMouseMove&&Be.onMouseMove(ne),vn={x:ne.clientX,y:ne.clientY},Dr.current&&Dr.current.update()},dn={},Ar=typeof ae=="string";E?(dn.title=!st&&Ar&&!$?ae:null,dn["aria-describedby"]=st?Mr:null):(dn["aria-label"]=Ar?ae:null,dn["aria-labelledby"]=st&&!Ar?Mr:null);const ze=P({},dn,I,se.props,{className:Se(I.className,se.props.className),onTouchStart:sa,ref:ql},Z?{onMouseMove:Wl}:{});process.env.NODE_ENV!=="production"&&(ze["data-mui-internal-clone-element"]=!0,N.useEffect(()=>{we&&!we.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[we]));const un={};H||(ze.onTouchStart=Ul,ze.onTouchEnd=Gl),$||(ze.onMouseOver=ar(ia,ze.onMouseOver),ze.onMouseLeave=ar(la,ze.onMouseLeave),at||(un.onMouseOver=ia,un.onMouseLeave=la)),O||(ze.onFocus=ar(aa,ze.onFocus),ze.onBlur=ar(oa,ze.onBlur),at||(un.onFocus=aa,un.onBlur=oa)),process.env.NODE_ENV!=="production"&&se.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));const Xl=N.useMemo(()=>{var ne;let Be=[{name:"arrow",enabled:!!Pe,options:{element:Pe,padding:4}}];return(ne=W.popperOptions)!=null&&ne.modifiers&&(Be=Be.concat(W.popperOptions.modifiers)),P({},W.popperOptions,{modifiers:Be})},[Pe,W]),fn=P({},S,{isRtl:je,arrow:C,disableInteractive:at,placement:X,PopperComponentProp:Y,touch:Ae.current}),Br=Qm(fn),ca=(r=(o=ee.popper)!=null?o:D.Popper)!=null?r:eh,pa=(a=(s=(l=ee.transition)!=null?l:D.Transition)!=null?s:L)!=null?a:go,da=(p=(f=ee.tooltip)!=null?f:D.Tooltip)!=null?p:th,ua=(m=(v=ee.arrow)!=null?v:D.Arrow)!=null?m:nh,Yl=Tn(ca,P({},W,(g=Q.popper)!=null?g:V.popper,{className:Se(Br.popper,W==null?void 0:W.className,(d=(h=Q.popper)!=null?h:V.popper)==null?void 0:d.className)}),fn),Kl=Tn(pa,P({},te,(u=Q.transition)!=null?u:V.transition),fn),Jl=Tn(da,P({},(b=Q.tooltip)!=null?b:V.tooltip,{className:Se(Br.tooltip,(x=(R=Q.tooltip)!=null?R:V.tooltip)==null?void 0:x.className)}),fn),Zl=Tn(ua,P({},(w=Q.arrow)!=null?w:V.arrow,{className:Se(Br.arrow,(k=(y=Q.arrow)!=null?y:V.arrow)==null?void 0:k.className)}),fn);return c.jsxs(N.Fragment,{children:[N.cloneElement(se,ze),c.jsx(ca,P({as:Y??Bi,placement:X,anchorEl:Z?{getBoundingClientRect:()=>({top:vn.y,left:vn.x,right:vn.x,bottom:vn.y,width:0,height:0})}:we,popperRef:Dr,open:we?st:!1,id:Mr,transition:!0},un,Yl,{popperOptions:Xl,children:({TransitionProps:ne})=>c.jsx(pa,P({timeout:Ee.transitions.duration.shorter},ne,Kl,{children:c.jsxs(da,P({},Jl,{children:[ae,C?c.jsx(ua,P({},Zl,{ref:ot})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Li.propTypes={arrow:i.bool,children:Gn.isRequired,classes:i.object,className:i.string,components:i.shape({Arrow:i.elementType,Popper:i.elementType,Tooltip:i.elementType,Transition:i.elementType}),componentsProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),describeChild:i.bool,disableFocusListener:i.bool,disableHoverListener:i.bool,disableInteractive:i.bool,disableTouchListener:i.bool,enterDelay:i.number,enterNextDelay:i.number,enterTouchDelay:i.number,followCursor:i.bool,id:i.string,leaveDelay:i.number,leaveTouchDelay:i.number,onClose:i.func,onOpen:i.func,open:i.bool,placement:i.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:i.elementType,PopperProps:i.object,slotProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),slots:i.shape({arrow:i.elementType,popper:i.elementType,tooltip:i.elementType,transition:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),title:i.node,TransitionComponent:i.elementType,TransitionProps:i.object});const rh=Li;function is(e,t,n){return e?c.jsx(ke.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:c.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Xo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:s=void 0,hasAutoFocus:l=!1,className:p,isDisabled:f=!1,isDense:m=!0,isSubMenuParent:v=!1,hasDisabledGutters:g=!1,hasDivider:d=!1,focusVisibleClassName:h,id:u,children:b}=e,x=c.jsx(ke.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:p,disabled:f,dense:m,disableGutters:g,divider:d,focusVisibleClassName:h,onClick:t,id:u,children:n?c.jsxs(c.Fragment,{children:[is(a,n,!0),c.jsx(ke.ListItemText,{primary:n,inset:!a&&o}),v?c.jsx(ke.ListItemIcon,{className:"papi-menu-icon-trailing",children:c.jsx(vi,{})}):is(s,n,!1)]}):b});return r?c.jsx(rh,{title:r,placement:"right",children:c.jsx("div",{children:x})}):x}function Vi(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function oh(e){const[t,n]=T.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:a}=e,s=f=>{n(f.currentTarget)},l=()=>{n(void 0)},p=()=>{let f=Vi(a).filter(m=>"menuItem"in m.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return f=f.filter(m=>"menuItem"in m.group&&m.group.menuItem===r.id),c.jsx(Yo,{...e,includedGroups:f})};return c.jsxs(c.Fragment,{children:[c.jsx(Xo,{onClick:s,...o,isSubMenuParent:!0}),c.jsx(ke.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:p()},r.id)]})}const ah=(e,t)=>t.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function Yo(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:a,allowForLeadingIcons:s}=T.useMemo(()=>{const m=o&&o.length>0?o:Vi(t).filter(h=>!("menuItem"in h.group)),v=Object.values(m).sort((h,u)=>(h.group.order||0)-(u.group.order||0)),g=[];v.forEach(h=>{ah(h.id,t.items).forEach(u=>g.push({item:u,isLastItemInGroup:!1})),g.length>0&&(g[g.length-1].isLastItemInGroup=!0)}),g.length>0&&(g[g.length-1].isLastItemInGroup=!1);const d=g.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:g,allowForLeadingIcons:d}},[o,t]),l=({item:m,isLastItemInGroup:v})=>({className:"papi-menu-item",label:m.label,tooltip:m.tooltip,iconPathBefore:"iconPathBefore"in m?m.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in m?m.iconPathAfter:void 0,hasDivider:v,allowForLeadingIcons:s}),[p]=a;if(!p)return c.jsx("div",{});const f=p.item.group;return c.jsx("div",{role:"menu","aria-label":f,children:a.map((m,v)=>{const{item:g}=m,d=l(m);if("command"in g){const h=g.group+v;return c.jsx(Xo,{onClick:u=>{n==null||n(u),r(g)},...d},h)}return c.jsx(oh,{parentMenuItem:g,parentItemProps:d,...e},f+g.id)})},f)}function sh(e){const{menuDefinition:t,columnId:n}=e;let a=Object.entries(t.groups).map(([s,l])=>({id:s,group:l})).filter(s=>"column"in s.group);return n&&"columns"in t&&t.columns[n]&&(a=a.filter(s=>"column"in s.group&&s.group.column===n)),c.jsx(Yo,{...e,includedGroups:a})}function ih({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:a}){return c.jsxs(ke.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${a??""}`,children:[c.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${a??""}`,children:r.label}),c.jsx(ke.List,{id:n,dense:!0,className:a??"",children:c.jsx(sh,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Fi({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,a=T.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const p=l,f=o[p];typeof f=="object"&&typeof f.order=="number"&&!Number.isNaN(f.order)?s.set(f.order,{id:p,metadata:f}):console.warn(`Property ${l} (${typeof f}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((l,p)=>(l.metadata.order||0)-(p.metadata.order||0))},[o,r]);return c.jsx(ke.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:r,children:a.map((s,l)=>c.jsx(ih,{commandHandler:e,menuDefinition:n,...s,className:t},l))})}const zi=N.createContext({});process.env.NODE_ENV!=="production"&&(zi.displayName="ListContext");const lh=zi;function ch(e){return rt("MuiList",e)}xt("MuiList",["root","padding","dense","subheader"]);const ph=["children","className","component","dense","disablePadding","subheader"],dh=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return ft({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},ch,t)},uh=Re("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>P({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Hi=N.forwardRef(function(t,n){const r=mt({props:t,name:"MuiList"}),{children:o,className:a,component:s="ul",dense:l=!1,disablePadding:p=!1,subheader:f}=r,m=me(r,ph),v=N.useMemo(()=>({dense:l}),[l]),g=P({},r,{component:s,dense:l,disablePadding:p}),d=dh(g);return c.jsx(lh.Provider,{value:v,children:c.jsxs(uh,P({as:s,className:Se(d.root,a),ref:n,ownerState:g},m,{children:[f,o]}))})});process.env.NODE_ENV!=="production"&&(Hi.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,dense:i.bool,disablePadding:i.bool,subheader:i.node,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const fh=Hi,mh=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Kr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function ls(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function Ui(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function yn(e,t,n,r,o,a){let s=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(s)return!1;s=!0}const p=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!Ui(l,a)||p)l=o(e,l,n);else return l.focus(),!0}return!1}const Gi=N.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:a=!1,children:s,className:l,disabledItemsFocusable:p=!1,disableListWrap:f=!1,onKeyDown:m,variant:v="selectedMenu"}=t,g=me(t,mh),d=N.useRef(null),h=N.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Dt(()=>{o&&d.current.focus()},[o]),N.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(w,k)=>{const y=!d.current.style.width;if(w.clientHeight<d.current.clientHeight&&y){const S=`${oi(Oe(w))}px`;d.current.style[k.direction==="rtl"?"paddingLeft":"paddingRight"]=S,d.current.style.width=`calc(100% + ${S})`}return d.current}}),[]);const u=w=>{const k=d.current,y=w.key,S=Oe(k).activeElement;if(y==="ArrowDown")w.preventDefault(),yn(k,S,f,p,Kr);else if(y==="ArrowUp")w.preventDefault(),yn(k,S,f,p,ls);else if(y==="Home")w.preventDefault(),yn(k,null,f,p,Kr);else if(y==="End")w.preventDefault(),yn(k,null,f,p,ls);else if(y.length===1){const C=h.current,_=y.toLowerCase(),D=performance.now();C.keys.length>0&&(D-C.lastTime>500?(C.keys=[],C.repeating=!0,C.previousKeyMatched=!0):C.repeating&&_!==C.keys[0]&&(C.repeating=!1)),C.lastTime=D,C.keys.push(_);const V=S&&!C.repeating&&Ui(S,C);C.previousKeyMatched&&(V||yn(k,S,!1,p,Kr,C))?w.preventDefault():C.previousKeyMatched=!1}m&&m(w)},b=Ge(d,n);let x=-1;N.Children.forEach(s,(w,k)=>{if(!N.isValidElement(w)){x===k&&(x+=1,x>=s.length&&(x=-1));return}process.env.NODE_ENV!=="production"&&dr.isFragment(w)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),w.props.disabled||(v==="selectedMenu"&&w.props.selected||x===-1)&&(x=k),x===k&&(w.props.disabled||w.props.muiSkipListHighlight||w.type.muiSkipListHighlight)&&(x+=1,x>=s.length&&(x=-1))});const R=N.Children.map(s,(w,k)=>{if(k===x){const y={};return a&&(y.autoFocus=!0),w.props.tabIndex===void 0&&v==="selectedMenu"&&(y.tabIndex=0),N.cloneElement(w,y)}return w});return c.jsx(fh,P({role:"menu",ref:b,className:l,onKeyDown:u,tabIndex:o?0:-1},g,{children:R}))});process.env.NODE_ENV!=="production"&&(Gi.propTypes={autoFocus:i.bool,autoFocusItem:i.bool,children:i.node,className:i.string,disabledItemsFocusable:i.bool,disableListWrap:i.bool,onKeyDown:i.func,variant:i.oneOf(["menu","selectedMenu"])});const hh=Gi,gh=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],bh={entering:{opacity:1},entered:{opacity:1}},qi=N.forwardRef(function(t,n){const r=Jn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:a,appear:s=!0,children:l,easing:p,in:f,onEnter:m,onEntered:v,onEntering:g,onExit:d,onExited:h,onExiting:u,style:b,timeout:x=o,TransitionComponent:R=Ii}=t,w=me(t,gh),k=N.useRef(null),y=Ge(k,l.ref,n),S=z=>H=>{if(z){const A=k.current;H===void 0?z(A):z(A,H)}},C=S(g),_=S((z,H)=>{Di(z);const A=vr({style:b,timeout:x,easing:p},{mode:"enter"});z.style.webkitTransition=r.transitions.create("opacity",A),z.style.transition=r.transitions.create("opacity",A),m&&m(z,H)}),D=S(v),V=S(u),E=S(z=>{const H=vr({style:b,timeout:x,easing:p},{mode:"exit"});z.style.webkitTransition=r.transitions.create("opacity",H),z.style.transition=r.transitions.create("opacity",H),d&&d(z)}),O=S(h),$=z=>{a&&a(k.current,z)};return c.jsx(R,P({appear:s,in:f,nodeRef:k,onEnter:_,onEntered:D,onEntering:C,onExit:E,onExited:O,onExiting:V,addEndListener:$,timeout:x},w,{children:(z,H)=>N.cloneElement(l,P({style:P({opacity:0,visibility:z==="exited"&&!f?"hidden":void 0},bh[z],b,l.props.style),ref:y},H))}))});process.env.NODE_ENV!=="production"&&(qi.propTypes={addEndListener:i.func,appear:i.bool,children:Gn.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const vh=qi;function yh(e){return rt("MuiBackdrop",e)}xt("MuiBackdrop",["root","invisible"]);const wh=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],xh=e=>{const{classes:t,invisible:n}=e;return ft({root:["root",n&&"invisible"]},yh,t)},kh=Re("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>P({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),Wi=N.forwardRef(function(t,n){var r,o,a;const s=mt({props:t,name:"MuiBackdrop"}),{children:l,className:p,component:f="div",components:m={},componentsProps:v={},invisible:g=!1,open:d,slotProps:h={},slots:u={},TransitionComponent:b=vh,transitionDuration:x}=s,R=me(s,wh),w=P({},s,{component:f,invisible:g}),k=xh(w),y=(r=h.root)!=null?r:v.root;return c.jsx(b,P({in:d,timeout:x},R,{children:c.jsx(kh,P({"aria-hidden":!0},y,{as:(o=(a=u.root)!=null?a:m.Root)!=null?o:f,className:Se(k.root,p,y==null?void 0:y.className),ownerState:P({},w,y==null?void 0:y.ownerState),classes:k,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(Wi.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.object}),invisible:i.bool,open:i.bool.isRequired,slotProps:i.shape({root:i.object}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Eh=Wi;function Th(e){return rt("MuiModal",e)}xt("MuiModal",["root","hidden","backdrop"]);const Nh=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Sh=e=>{const{open:t,exited:n,classes:r}=e;return ft({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},Th,r)},Ch=Re("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>P({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Oh=Re(Eh,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Xi=N.forwardRef(function(t,n){var r,o,a,s,l,p;const f=mt({name:"MuiModal",props:t}),{BackdropComponent:m=Oh,BackdropProps:v,className:g,closeAfterTransition:d=!1,children:h,container:u,component:b,components:x={},componentsProps:R={},disableAutoFocus:w=!1,disableEnforceFocus:k=!1,disableEscapeKeyDown:y=!1,disablePortal:S=!1,disableRestoreFocus:C=!1,disableScrollLock:_=!1,hideBackdrop:D=!1,keepMounted:V=!1,onBackdropClick:E,open:O,slotProps:$,slots:z}=f,H=me(f,Nh),A=P({},f,{closeAfterTransition:d,disableAutoFocus:w,disableEnforceFocus:k,disableEscapeKeyDown:y,disablePortal:S,disableRestoreFocus:C,disableScrollLock:_,hideBackdrop:D,keepMounted:V}),{getRootProps:B,getBackdropProps:J,getTransitionProps:Z,portalRef:j,isTopModal:M,exited:U,hasTransition:K}=Sf(P({},A,{rootRef:n})),G=P({},A,{exited:U}),q=Sh(G),X={};if(h.props.tabIndex===void 0&&(X.tabIndex="-1"),K){const{onEnter:te,onExited:I}=Z();X.onEnter=te,X.onExited=I}const Y=(r=(o=z==null?void 0:z.root)!=null?o:x.Root)!=null?r:Ch,W=(a=(s=z==null?void 0:z.backdrop)!=null?s:x.Backdrop)!=null?a:m,Q=(l=$==null?void 0:$.root)!=null?l:R.root,ee=(p=$==null?void 0:$.backdrop)!=null?p:R.backdrop,ae=Bt({elementType:Y,externalSlotProps:Q,externalForwardedProps:H,getSlotProps:B,additionalProps:{ref:n,as:b},ownerState:G,className:Se(g,Q==null?void 0:Q.className,q==null?void 0:q.root,!G.open&&G.exited&&(q==null?void 0:q.hidden))}),L=Bt({elementType:W,externalSlotProps:ee,additionalProps:v,getSlotProps:te=>J(P({},te,{onClick:I=>{E&&E(I),te!=null&&te.onClick&&te.onClick(I)}})),className:Se(ee==null?void 0:ee.className,v==null?void 0:v.className,q==null?void 0:q.backdrop),ownerState:G});return!V&&!O&&(!K||U)?null:c.jsx(Dn,{ref:j,container:u,disablePortal:S,children:c.jsxs(Y,P({},ae,{children:[!D&&m?c.jsx(W,P({},L)):null,c.jsx(hr,{disableEnforceFocus:k,disableAutoFocus:w,disableRestoreFocus:C,isEnabled:M,open:O,children:N.cloneElement(h,X)})]}))})});process.env.NODE_ENV!=="production"&&(Xi.propTypes={BackdropComponent:i.elementType,BackdropProps:i.object,children:Gn.isRequired,classes:i.object,className:i.string,closeAfterTransition:i.bool,component:i.elementType,components:i.shape({Backdrop:i.elementType,Root:i.elementType}),componentsProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableEscapeKeyDown:i.bool,disablePortal:i.bool,disableRestoreFocus:i.bool,disableScrollLock:i.bool,hideBackdrop:i.bool,keepMounted:i.bool,onBackdropClick:i.func,onClose:i.func,onTransitionEnter:i.func,onTransitionExited:i.func,open:i.bool.isRequired,slotProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({backdrop:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const Rh=Xi;function jh(e){return rt("MuiPaper",e)}xt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Ph=["className","component","elevation","square","variant"],$h=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,a={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return ft(a,jh,o)},_h=Re("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return P({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&P({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${mr("#fff",as(t.elevation))}, ${mr("#fff",as(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Yi=N.forwardRef(function(t,n){const r=mt({props:t,name:"MuiPaper"}),{className:o,component:a="div",elevation:s=1,square:l=!1,variant:p="elevation"}=r,f=me(r,Ph),m=P({},r,{component:a,elevation:s,square:l,variant:p}),v=$h(m);return process.env.NODE_ENV!=="production"&&Jn().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),c.jsx(_h,P({as:a,ownerState:m,className:Se(v.root,o),ref:n},f))});process.env.NODE_ENV!=="production"&&(Yi.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,elevation:ln(ii,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:i.bool,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),variant:i.oneOfType([i.oneOf(["elevation","outlined"]),i.string])});const Mh=Yi;function Ih(e){return rt("MuiPopover",e)}xt("MuiPopover",["root","paper"]);const Dh=["onEntering"],Ah=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Bh=["slotProps"];function cs(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function ps(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function ds(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function cr(e){return typeof e=="function"?e():e}const Lh=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"]},Ih,t)},Vh=Re(Rh,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ki=Re(Mh,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Ji=N.forwardRef(function(t,n){var r,o,a;const s=mt({props:t,name:"MuiPopover"}),{action:l,anchorEl:p,anchorOrigin:f={vertical:"top",horizontal:"left"},anchorPosition:m,anchorReference:v="anchorEl",children:g,className:d,container:h,elevation:u=8,marginThreshold:b=16,open:x,PaperProps:R={},slots:w,slotProps:k,transformOrigin:y={vertical:"top",horizontal:"left"},TransitionComponent:S=go,transitionDuration:C="auto",TransitionProps:{onEntering:_}={},disableScrollLock:D=!1}=s,V=me(s.TransitionProps,Dh),E=me(s,Ah),O=(r=k==null?void 0:k.paper)!=null?r:R,$=N.useRef(),z=Ge($,O.ref),H=P({},s,{anchorOrigin:f,anchorReference:v,elevation:u,marginThreshold:b,externalPaperSlotProps:O,transformOrigin:y,TransitionComponent:S,transitionDuration:C,TransitionProps:V}),A=Lh(H),B=N.useCallback(()=>{if(v==="anchorPosition")return process.env.NODE_ENV!=="production"&&(m||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),m;const te=cr(p),I=te&&te.nodeType===1?te:Oe($.current).body,se=I.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Ee=I.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Ee.top===0&&Ee.left===0&&Ee.right===0&&Ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:se.top+cs(se,f.vertical),left:se.left+ps(se,f.horizontal)}},[p,f.horizontal,f.vertical,m,v]),J=N.useCallback(te=>({vertical:cs(te,y.vertical),horizontal:ps(te,y.horizontal)}),[y.horizontal,y.vertical]),Z=N.useCallback(te=>{const I={width:te.offsetWidth,height:te.offsetHeight},se=J(I);if(v==="none")return{top:null,left:null,transformOrigin:ds(se)};const Ee=B();let je=Ee.top-se.vertical,we=Ee.left-se.horizontal;const Tt=je+I.height,Pe=we+I.width,ot=en(cr(p)),Ae=ot.innerHeight-b,at=ot.innerWidth-b;if(b!==null&&je<b){const Te=je-b;je-=Te,se.vertical+=Te}else if(b!==null&&Tt>Ae){const Te=Tt-Ae;je-=Te,se.vertical+=Te}if(process.env.NODE_ENV!=="production"&&I.height>Ae&&I.height&&Ae&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${I.height-Ae}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),b!==null&&we<b){const Te=we-b;we-=Te,se.horizontal+=Te}else if(Pe>at){const Te=Pe-at;we-=Te,se.horizontal+=Te}return{top:`${Math.round(je)}px`,left:`${Math.round(we)}px`,transformOrigin:ds(se)}},[p,v,B,J,b]),[j,M]=N.useState(x),U=N.useCallback(()=>{const te=$.current;if(!te)return;const I=Z(te);I.top!==null&&(te.style.top=I.top),I.left!==null&&(te.style.left=I.left),te.style.transformOrigin=I.transformOrigin,M(!0)},[Z]);N.useEffect(()=>(D&&window.addEventListener("scroll",U),()=>window.removeEventListener("scroll",U)),[p,D,U]);const K=(te,I)=>{_&&_(te,I),U()},G=()=>{M(!1)};N.useEffect(()=>{x&&U()}),N.useImperativeHandle(l,()=>x?{updatePosition:()=>{U()}}:null,[x,U]),N.useEffect(()=>{if(!x)return;const te=ei(()=>{U()}),I=en(p);return I.addEventListener("resize",te),()=>{te.clear(),I.removeEventListener("resize",te)}},[p,x,U]);let q=C;C==="auto"&&!S.muiSupportAuto&&(q=void 0);const X=h||(p?Oe(cr(p)).body:void 0),Y=(o=w==null?void 0:w.root)!=null?o:Vh,W=(a=w==null?void 0:w.paper)!=null?a:Ki,Q=Bt({elementType:W,externalSlotProps:P({},O,{style:j?O.style:P({},O.style,{opacity:0})}),additionalProps:{elevation:u,ref:z},ownerState:H,className:Se(A.paper,O==null?void 0:O.className)}),ee=Bt({elementType:Y,externalSlotProps:(k==null?void 0:k.root)||{},externalForwardedProps:E,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:X,open:x},ownerState:H,className:Se(A.root,d)}),{slotProps:ae}=ee,L=me(ee,Bh);return c.jsx(Y,P({},L,!yi(Y)&&{slotProps:ae,disableScrollLock:D},{children:c.jsx(S,P({appear:!0,in:x,onEntering:K,onExited:G,timeout:q},V,{children:c.jsx(W,P({},Q,{children:g}))}))}))});process.env.NODE_ENV!=="production"&&(Ji.propTypes={action:jo,anchorEl:ln(i.oneOfType([pt,i.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=cr(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),anchorPosition:i.shape({left:i.number.isRequired,top:i.number.isRequired}),anchorReference:i.oneOf(["anchorEl","anchorPosition","none"]),children:i.node,classes:i.object,className:i.string,container:i.oneOfType([pt,i.func]),disableScrollLock:i.bool,elevation:ii,marginThreshold:i.number,onClose:i.func,open:i.bool.isRequired,PaperProps:i.shape({component:bp}),slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transformOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object});const Fh=Ji;function zh(e){return rt("MuiMenu",e)}xt("MuiMenu",["root","paper","list"]);const Hh=["onEntering"],Uh=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Gh={vertical:"top",horizontal:"right"},qh={vertical:"top",horizontal:"left"},Wh=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"],list:["list"]},zh,t)},Xh=Re(Fh,{shouldForwardProp:e=>gi(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Yh=Re(Ki,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),Kh=Re(hh,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Zi=N.forwardRef(function(t,n){var r,o;const a=mt({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:l,className:p,disableAutoFocusItem:f=!1,MenuListProps:m={},onClose:v,open:g,PaperProps:d={},PopoverClasses:h,transitionDuration:u="auto",TransitionProps:{onEntering:b}={},variant:x="selectedMenu",slots:R={},slotProps:w={}}=a,k=me(a.TransitionProps,Hh),y=me(a,Uh),S=Jn(),C=S.direction==="rtl",_=P({},a,{autoFocus:s,disableAutoFocusItem:f,MenuListProps:m,onEntering:b,PaperProps:d,transitionDuration:u,TransitionProps:k,variant:x}),D=Wh(_),V=s&&!f&&g,E=N.useRef(null),O=(Z,j)=>{E.current&&E.current.adjustStyleForScrollbar(Z,S),b&&b(Z,j)},$=Z=>{Z.key==="Tab"&&(Z.preventDefault(),v&&v(Z,"tabKeyDown"))};let z=-1;N.Children.map(l,(Z,j)=>{N.isValidElement(Z)&&(process.env.NODE_ENV!=="production"&&dr.isFragment(Z)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Z.props.disabled||(x==="selectedMenu"&&Z.props.selected||z===-1)&&(z=j))});const H=(r=R.paper)!=null?r:Yh,A=(o=w.paper)!=null?o:d,B=Bt({elementType:R.root,externalSlotProps:w.root,ownerState:_,className:[D.root,p]}),J=Bt({elementType:H,externalSlotProps:A,ownerState:_,className:D.paper});return c.jsx(Xh,P({onClose:v,anchorOrigin:{vertical:"bottom",horizontal:C?"right":"left"},transformOrigin:C?Gh:qh,slots:{paper:H,root:R.root},slotProps:{root:B,paper:J},open:g,ref:n,transitionDuration:u,TransitionProps:P({onEntering:O},k),ownerState:_},y,{classes:h,children:c.jsx(Kh,P({onKeyDown:$,actions:E,autoFocus:s&&(z===-1||f),autoFocusItem:V,variant:x},m,{className:Se(D.list,m.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(Zi.propTypes={anchorEl:i.oneOfType([pt,i.func]),autoFocus:i.bool,children:i.node,classes:i.object,className:i.string,disableAutoFocusItem:i.bool,MenuListProps:i.object,onClose:i.func,open:i.bool.isRequired,PaperProps:i.object,PopoverClasses:i.object,slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object,variant:i.oneOf(["menu","selectedMenu"])});const Jh=Zi;function Zh({className:e,commandHandler:t,menuDefinition:n,children:r}){var f;const[o,a]=T.useState(void 0),s=T.useCallback(m=>{m.preventDefault(),a(o===void 0?{mouseX:m.clientX+2,mouseY:m.clientY-6}:void 0)},[o]),l=T.useCallback(()=>{a(void 0)},[]),p=T.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((f=n==null?void 0:n.items)==null?void 0:f.length)??0)===0||!r?r:c.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[r,c.jsx(Jh,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:p,children:c.jsx(Yo,{menuDefinition:n,commandHandler:t,onClick:l})})]})}function Qh(e){return{preserveValue:!0,...e}}const yr=(e,t,n={})=>{const r=T.useRef(t);r.current=t;const o=T.useRef(n);o.current=Qh(o.current);const[a,s]=T.useState(()=>r.current),[l,p]=T.useState(!0);return T.useEffect(()=>{let f=!0;return p(!!e),(async()=>{if(e){const m=await e();f&&(s(()=>m),p(!1))}})(),()=>{f=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[a,l]},eg=bi(c.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Qi({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:a,ariaLabelPrefix:s,children:l}){const[p,f]=T.useState(!1),[m,v]=T.useState(!1),g=T.useCallback(()=>{p&&f(!1),v(!1)},[p]),d=T.useCallback(k=>{k.stopPropagation(),f(y=>{const S=!y;return S&&k.shiftKey?v(!0):S||v(!1),S})},[]),h=T.useCallback(k=>(g(),r(k)),[r,g]),[u,b]=T.useState({top:1,left:1});T.useEffect(()=>{if(p){const k=o==null?void 0:o.current;if(k){const y=k.getBoundingClientRect(),S=window.scrollY,C=window.scrollX,_=y.top+S+k.clientHeight,D=y.left+C;b({top:_,left:D})}}},[p,o]);const[x]=yr(T.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,p]),t),[R]=yr(T.useCallback(async()=>(e==null?void 0:e(!0))??n??x,[e,n,x,p]),n??x),w=m&&R?R:x;return c.jsxs(c.Fragment,{children:[c.jsx(ke.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:d,children:l??c.jsx(eg,{})}),c.jsx(ke.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:p,onClose:g,PaperProps:{className:"papi-menu-drawer-paper",style:{top:u.top,left:u.left}},children:w?c.jsx(Fi,{className:a,id:`${s??""} main menu`,commandHandler:h,multiColumnMenu:w}):void 0})]})}function tg({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:s="medium",className:l,onClick:p,children:f}){return c.jsx(ke.IconButton,{id:e,disabled:n,edge:a,size:s,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:p,children:f})}const yt="scrBook",ng="scrRef",Rt="source",rg="details",og="Scripture Reference",ag="Scripture Book",el="Type",sg="Details";function ig(e,t){const n=t??!1;return[{accessorFn:r=>`${fe.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:yt,header:(e==null?void 0:e.scriptureReferenceColumnName)??og,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?fe.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===yt?Je.formatScrRef(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>Je.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>Je.formatScrRef(r.start),id:ng,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:Je.formatScrRef(o.start)},sortingFn:(r,o)=>Je.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:Rt,header:n?(e==null?void 0:e.typeColumnName)??el:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:rg,header:(e==null?void 0:e.detailsColumnName)??sg,cell:r=>r.getValue(),enableGrouping:!1}]}function lg({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:a,detailsColumnName:s,onRowSelected:l}){const[p,f]=T.useState([]),[m,v]=T.useState([{id:yt,desc:!1}]),[g,d]=T.useState(()=>e.flatMap(E=>{const O=E.source;return E.data.map($=>({...$,source:O}))})),[h,u]=T.useState({});T.useEffect(()=>{d(()=>e.flatMap(E=>{const O=E.source;return E.data.map($=>({...$,source:O}))}))},[e]);const b=T.useMemo(()=>ig({scriptureReferenceColumnName:r,typeColumnName:a,detailsColumnName:s},n),[r,a,s,n]);T.useEffect(()=>{p.includes(Rt)?v([{id:Rt,desc:!1},{id:yt,desc:!1}]):v([{id:yt,desc:!1}])},[p]);const x=T.useCallback((E,O)=>!O||Je.compareScrRefs(E,O)===0?`${Je.scrRefToBBBCCCVVV(E)}`:`${Je.scrRefToBBBCCCVVV(E)}-${Je.scrRefToBBBCCCVVV(O)}`,[]),R=T.useCallback(E=>`${x(E.start,E.end)} ${E.source} ${E.detail}`,[x]),w=Ce.useReactTable({data:g,columns:b,state:{grouping:p,sorting:m,rowSelection:h},onGroupingChange:f,onSortingChange:v,onRowSelectionChange:u,getExpandedRowModel:Ce.getExpandedRowModel(),getGroupedRowModel:Ce.getGroupedRowModel(),getCoreRowModel:Ce.getCoreRowModel(),getSortedRowModel:Ce.getSortedRowModel(),getRowId:R,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});T.useEffect(()=>{if(l){const E=w.getSelectedRowModel().rowsById,O=Object.keys(E);if(O.length===1){const $=g.find(z=>R(z)===O[0])||void 0;$&&l($)}}},[h,g,R,l,w]);const k=o??ag,y=a??el,S=[{label:"No Grouping",value:[]},{label:`Group by ${k}`,value:[yt]},{label:`Group by ${y}`,value:[Rt]},{label:`Group by ${k} and ${y}`,value:[yt,Rt]},{label:`Group by ${y} and ${k}`,value:[Rt,yt]}],C=E=>{f(JSON.parse(E))},_=(E,O)=>{!E.getIsGrouped()&&!E.getIsSelected()&&E.getToggleSelectedHandler()(O)},D=(E,O)=>E.getIsGrouped()?"":F("banded-row",O%2===0?"even":"odd"),V=(E,O,$)=>{if(!((E==null?void 0:E.length)===0||O.depth<$.column.getGroupedIndex())){if(O.getIsGrouped())switch(O.depth){case 1:return"pr-ps-4";default:return}switch(O.depth){case 1:return"pr-ps-8";case 2:return"pr-ps-12";default:return}}};return c.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-w-full pr-flex-col",children:[!t&&c.jsxs($n,{value:JSON.stringify(p),onValueChange:E=>{C(E)},children:[c.jsx(Kt,{className:"pr-mb-1 pr-mt-2",children:c.jsx(_n,{})}),c.jsx(Jt,{position:"item-aligned",children:c.jsx($s,{children:S.map(E=>c.jsx(Ye,{value:JSON.stringify(E.value),children:E.label},E.label))})})]}),c.jsxs(zn,{className:"pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0",children:[t&&c.jsx(Hn,{children:w.getHeaderGroups().map(E=>c.jsx(lt,{children:E.headers.filter(O=>O.column.columnDef.header).map(O=>c.jsx(Zt,{colSpan:O.colSpan,className:"top-0 pr-sticky",children:O.isPlaceholder?void 0:c.jsxs("div",{children:[O.column.getCanGroup()?c.jsx(Ne,{variant:"ghost",title:`Toggle grouping by ${O.column.columnDef.header}`,onClick:O.column.getToggleGroupingHandler(),type:"button",children:O.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Ce.flexRender(O.column.columnDef.header,O.getContext())]})},O.id))},E.id))}),c.jsx(Un,{children:w.getRowModel().rows.map((E,O)=>c.jsx(lt,{"data-state":E.getIsSelected()?"selected":"",className:F(D(E,O)),onClick:$=>_(E,$),children:E.getVisibleCells().map($=>{if(!($.getIsPlaceholder()||$.column.columnDef.enableGrouping&&!$.getIsGrouped()&&($.column.columnDef.id!==Rt||!n)))return c.jsx(It,{className:F($.column.columnDef.id,"pr-p-[1px]",V(p,E,$)),children:(()=>$.getIsGrouped()?c.jsxs(Ne,{variant:"ghost",onClick:E.getToggleExpandedHandler(),type:"button",children:[E.getIsExpanded()?"👇":"👉"," ",Ce.flexRender($.column.columnDef.cell,$.getContext())," (",E.subRows.length,")"]}):Ce.flexRender($.column.columnDef.cell,$.getContext()))()},$.id)})},E.id))})]})]})}const cg=yo.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),Ko=T.forwardRef(({className:e,...t},n)=>c.jsx(ws.Root,{ref:n,className:F(cg(),e),...t}));Ko.displayName=ws.Root.displayName;function tl({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:a,placeholder:s,isRequired:l=!1,className:p,defaultValue:f,value:m,onChange:v,onFocus:g,onBlur:d}){return c.jsxs("div",{className:F("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":r}),children:[c.jsx(Ko,{htmlFor:e,className:F({"pr-text-red-600":n,"pr-hidden":!a}),children:`${a}${l?"*":""}`}),c.jsx(Ln,{id:e,disabled:t,placeholder:s,required:l,className:F(p,{"pr-border-red-600":n}),defaultValue:f,value:m,onChange:v,onFocus:g,onBlur:d}),c.jsx("p",{className:F({"pr-hidden":!o}),children:o})]})}function pg({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=T.useState(""),a=s=>{o(s),e(s)};return c.jsx(tl,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:s=>a(s.target.value)})}function dg({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:a=1,showMarks:s=!1,defaultValue:l,value:p,valueLabelDisplay:f="off",className:m,onChange:v,onChangeCommitted:g}){return c.jsx(ke.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:a,marks:s,defaultValue:l,value:p,valueLabelDisplay:f,className:`papi-slider ${n} ${m??""}`,onChange:v,onChangeCommitted:g})}function ug({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:s,children:l}){const p={action:(s==null?void 0:s.action)||l,message:s==null?void 0:s.message,className:r};return c.jsx(ke.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:a,id:t,ContentProps:p})}function fg({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:a}){return c.jsx(ke.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:a})}function mg({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const a=T.useRef(void 0);return c.jsx("div",{ref:a,style:{position:"relative"},children:c.jsx(ke.AppBar,{position:"static",id:r,children:c.jsxs(ke.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?c.jsx(Qi,{commandHandler:t,containerRef:a,menuProvider:e}):void 0,o?c.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const hg=De.Root,nl=T.forwardRef(({className:e,...t},n)=>c.jsx(De.List,{ref:n,className:F("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));nl.displayName=De.List.displayName;const rl=T.forwardRef(({className:e,...t},n)=>c.jsx(De.Trigger,{ref:n,className:F("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));rl.displayName=De.Trigger.displayName;const ol=T.forwardRef(({className:e,...t},n)=>c.jsx(De.Content,{ref:n,className:F("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));ol.displayName=De.Content.displayName;const al=T.forwardRef(({className:e,...t},n)=>c.jsx(De.Root,{orientation:"vertical",ref:n,className:F("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));al.displayName=De.List.displayName;const sl=T.forwardRef(({className:e,...t},n)=>c.jsx(De.List,{ref:n,className:F("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));sl.displayName=De.List.displayName;const gg=T.forwardRef(({className:e,...t},n)=>c.jsx(De.Trigger,{ref:n,...t,className:F("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),il=T.forwardRef(({className:e,...t},n)=>c.jsx(De.Content,{ref:n,className:F("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));il.displayName=De.Content.displayName;function bg({isInstalling:e,handleClick:t,buttonText:n}){return c.jsx(Ne,{className:F("pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e,"pr-bg-blue-600":!e,"pr-bg-white pr-text-blue-600 hover:pr-text-white":!n,"pr-w-20":n}),onClick:t,children:e?c.jsx(le.LoaderCircle,{size:15,className:"pr-animate-spin"}):c.jsxs(c.Fragment,{children:[c.jsx(le.Download,{size:25,className:F("pr-h-4 pr-w-4",{"pr-mr-1":n})}),n]})})}function vg({isEnabling:e,handleClick:t}){return c.jsx(Ne,{className:F("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e}),onClick:t,children:e?c.jsxs(c.Fragment,{children:[c.jsx(le.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-white"}),"Enabling..."]}):"Enable"})}function yg({isDisabling:e,handleClick:t}){return c.jsx(Ne,{className:F("pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-gray-400",{"pr-cursor-not-allowed pr-bg-gray-400":e}),onClick:t,children:e?c.jsxs(c.Fragment,{children:[c.jsx(le.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-black"}),"Disabling..."]}):"Disable"})}function wg({isUpdating:e,handleClick:t}){return c.jsx(Ne,{className:F("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700 hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e}),onClick:t,children:e?c.jsxs(c.Fragment,{children:[c.jsx(le.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-white"}),"Updating..."]}):"Update"})}function $t(){return $t=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},$t.apply(this,arguments)}const xg=["children","options"],us=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,t)=>(e[t.toLowerCase()]=t,e),{for:"htmlFor"}),fs={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},kg=["style","script"],Eg=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,Tg=/mailto:/i,Ng=/\n{2,}$/,ll=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,Sg=/^ *> ?/gm,Cg=/^ {2,}\n/,Og=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,cl=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,pl=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,Rg=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,jg=/^(?:\n *)*\n/,Pg=/\r\n?/g,$g=/^\[\^([^\]]+)](:.*)\n/,_g=/^\[\^([^\]]+)]/,Mg=/\f/g,Ig=/^\s*?\[(x|\s)\]/,dl=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,ul=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,fl=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,bo=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,Dg=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,ml=/^<!--[\s\S]*?(?:-->)/,Ag=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,vo=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,Bg=/^\{.*\}$/,Lg=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,Vg=/^<([^ >]+@[^ >]+)>/,Fg=/^<([^ >]+:\/[^ >]+)>/,zg=/-([a-z])?/gi,hl=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,Hg=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,Ug=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,Gg=/^\[([^\]]*)\] ?\[([^\]]*)\]/,qg=/(\[|\])/g,Wg=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,Xg=/\t/g,Yg=/^ *\| */,Kg=/(^ *\||\| *$)/g,Jg=/ *$/,Zg=/^ *:-+: *$/,Qg=/^ *:-+ *$/,eb=/^ *-+: *$/,tb=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,nb=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,rb=/^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,ob=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,ab=/^\\([^0-9A-Za-z\s])/,sb=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,ib=/^\n+/,lb=/^([ \t]*)/,cb=/\\([^\\])/g,ms=/ *\n+$/,pb=/(?:^|\n)( *)$/,Jo="(?:\\d+\\.)",Zo="(?:[*+-])";function gl(e){return"( *)("+(e===1?Jo:Zo)+") +"}const bl=gl(1),vl=gl(2);function yl(e){return new RegExp("^"+(e===1?bl:vl))}const db=yl(1),ub=yl(2);function wl(e){return new RegExp("^"+(e===1?bl:vl)+"[^\\n]*(?:\\n(?!\\1"+(e===1?Jo:Zo)+" )[^\\n]*)*(\\n|$)","gm")}const xl=wl(1),kl=wl(2);function El(e){const t=e===1?Jo:Zo;return new RegExp("^( *)("+t+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+t+" (?!"+t+" ))\\n*|\\s*\\n*$)")}const Tl=El(1),Nl=El(2);function hs(e,t){const n=t===1,r=n?Tl:Nl,o=n?xl:kl,a=n?db:ub;return{t(s,l,p){const f=pb.exec(p);return f&&(l.o||!l._&&!l.u)?r.exec(s=f[1]+s):null},i:oe.HIGH,l(s,l,p){const f=n?+s[2]:void 0,m=s[0].replace(Ng,`
`).match(o);let v=!1;return{p:m.map(function(g,d){const h=a.exec(g)[0].length,u=new RegExp("^ {1,"+h+"}","gm"),b=g.replace(u,"").replace(a,""),x=d===m.length-1,R=b.indexOf(`

`)!==-1||x&&v;v=R;const w=p._,k=p.o;let y;p.o=!0,R?(p._=!1,y=b.replace(ms,`

`)):(p._=!0,y=b.replace(ms,""));const S=l(y,p);return p._=w,p.o=k,S}),m:n,g:f}},h:(s,l,p)=>e(s.m?"ol":"ul",{key:p.k,start:s.g},s.p.map(function(f,m){return e("li",{key:m},l(f,p))}))}}const fb=/^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,mb=/^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Sl=[ll,cl,pl,dl,fl,ul,ml,hl,xl,Tl,kl,Nl],hb=[...Sl,/^[^\n]+(?:  \n|\n{2,})/,bo,vo];function gb(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function bb(e){return eb.test(e)?"right":Zg.test(e)?"center":Qg.test(e)?"left":null}function gs(e,t,n){const r=n.$;n.$=!0;const o=t(e.trim(),n);n.$=r;let a=[[]];return o.forEach(function(s,l){s.type==="tableSeparator"?l!==0&&l!==o.length-1&&a.push([]):(s.type!=="text"||o[l+1]!=null&&o[l+1].type!=="tableSeparator"||(s.v=s.v.replace(Jg,"")),a[a.length-1].push(s))}),a}function vb(e,t,n){n._=!0;const r=gs(e[1],t,n),o=e[2].replace(Kg,"").split("|").map(bb),a=function(s,l,p){return s.trim().split(`
`).map(function(f){return gs(f,l,p)})}(e[3],t,n);return n._=!1,{S:o,A:a,L:r,type:"table"}}function bs(e,t){return e.S[t]==null?{}:{textAlign:e.S[t]}}function bt(e){return function(t,n){return n._?e.exec(t):null}}function vt(e){return function(t,n){return n._||n.u?e.exec(t):null}}function it(e){return function(t,n){return n._||n.u?null:e.exec(t)}}function wn(e){return function(t){return e.exec(t)}}function yb(e,t,n){if(t._||t.u||n&&!n.endsWith(`
`))return null;let r="";e.split(`
`).every(a=>!Sl.some(s=>s.test(a))&&(r+=a+`
`,a.trim()));const o=r.trimEnd();return o==""?null:[r,o]}function Wt(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch{return null}return e}function vs(e){return e.replace(cb,"$1")}function pr(e,t,n){const r=n._||!1,o=n.u||!1;n._=!0,n.u=!0;const a=e(t,n);return n._=r,n.u=o,a}function wb(e,t,n){const r=n._||!1,o=n.u||!1;n._=!1,n.u=!0;const a=e(t,n);return n._=r,n.u=o,a}function xb(e,t,n){return n._=!1,e(t,n)}const Jr=(e,t,n)=>({v:pr(t,e[1],n)});function Zr(){return{}}function Qr(){return null}function kb(...e){return e.filter(Boolean).join(" ")}function eo(e,t,n){let r=e;const o=t.split(".");for(;o.length&&(r=r[o[0]],r!==void 0);)o.shift();return r||n}var oe;function Eb(e,t={}){t.overrides=t.overrides||{},t.slugify=t.slugify||gb,t.namedCodesToUnicode=t.namedCodesToUnicode?$t({},fs,t.namedCodesToUnicode):fs;const n=t.createElement||N.createElement;function r(d,h,...u){const b=eo(t.overrides,`${d}.props`,{});return n(function(x,R){const w=eo(R,x);return w?typeof w=="function"||typeof w=="object"&&"render"in w?w:eo(R,`${x}.component`,x):x}(d,t.overrides),$t({},h,b,{className:kb(h==null?void 0:h.className,b.className)||void 0}),...u)}function o(d){let h=!1;t.forceInline?h=!0:t.forceBlock||(h=Wg.test(d)===!1);const u=m(f(h?d:`${d.trimEnd().replace(ib,"")}

`,{_:h}));for(;typeof u[u.length-1]=="string"&&!u[u.length-1].trim();)u.pop();if(t.wrapper===null)return u;const b=t.wrapper||(h?"span":"div");let x;if(u.length>1||t.forceWrapper)x=u;else{if(u.length===1)return x=u[0],typeof x=="string"?r("span",{key:"outer"},x):x;x=null}return N.createElement(b,{key:"outer"},x)}function a(d){const h=d.match(Eg);return h?h.reduce(function(u,b,x){const R=b.indexOf("=");if(R!==-1){const w=function(C){return C.indexOf("-")!==-1&&C.match(Ag)===null&&(C=C.replace(zg,function(_,D){return D.toUpperCase()})),C}(b.slice(0,R)).trim(),k=function(C){const _=C[0];return(_==='"'||_==="'")&&C.length>=2&&C[C.length-1]===_?C.slice(1,-1):C}(b.slice(R+1).trim()),y=us[w]||w,S=u[y]=function(C,_){return C==="style"?_.split(/;\s?/).reduce(function(D,V){const E=V.slice(0,V.indexOf(":"));return D[E.replace(/(-[a-z])/g,O=>O[1].toUpperCase())]=V.slice(E.length+1).trim(),D},{}):C==="href"?Wt(_):(_.match(Bg)&&(_=_.slice(1,_.length-1)),_==="true"||_!=="false"&&_)}(w,k);typeof S=="string"&&(bo.test(S)||vo.test(S))&&(u[y]=N.cloneElement(o(S.trim()),{key:x}))}else b!=="style"&&(u[us[b]||b]=!0);return u},{}):null}const s=[],l={},p={blockQuote:{t:it(ll),i:oe.HIGH,l:(d,h,u)=>({v:h(d[0].replace(Sg,""),u)}),h:(d,h,u)=>r("blockquote",{key:u.k},h(d.v,u))},breakLine:{t:wn(Cg),i:oe.HIGH,l:Zr,h:(d,h,u)=>r("br",{key:u.k})},breakThematic:{t:it(Og),i:oe.HIGH,l:Zr,h:(d,h,u)=>r("hr",{key:u.k})},codeBlock:{t:it(pl),i:oe.MAX,l:d=>({v:d[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),M:void 0}),h:(d,h,u)=>r("pre",{key:u.k},r("code",$t({},d.O,{className:d.M?`lang-${d.M}`:""}),d.v))},codeFenced:{t:it(cl),i:oe.MAX,l:d=>({O:a(d[3]||""),v:d[4],M:d[2]||void 0,type:"codeBlock"})},codeInline:{t:vt(Rg),i:oe.LOW,l:d=>({v:d[2]}),h:(d,h,u)=>r("code",{key:u.k},d.v)},footnote:{t:it($g),i:oe.MAX,l:d=>(s.push({I:d[2],j:d[1]}),{}),h:Qr},footnoteReference:{t:bt(_g),i:oe.HIGH,l:d=>({v:d[1],B:`#${t.slugify(d[1])}`}),h:(d,h,u)=>r("a",{key:u.k,href:Wt(d.B)},r("sup",{key:u.k},d.v))},gfmTask:{t:bt(Ig),i:oe.HIGH,l:d=>({R:d[1].toLowerCase()==="x"}),h:(d,h,u)=>r("input",{checked:d.R,key:u.k,readOnly:!0,type:"checkbox"})},heading:{t:it(t.enforceAtxHeadings?ul:dl),i:oe.HIGH,l:(d,h,u)=>({v:pr(h,d[2],u),T:t.slugify(d[2]),C:d[1].length}),h:(d,h,u)=>r(`h${d.C}`,{id:d.T,key:u.k},h(d.v,u))},headingSetext:{t:it(fl),i:oe.MAX,l:(d,h,u)=>({v:pr(h,d[1],u),C:d[2]==="="?1:2,type:"heading"})},htmlComment:{t:wn(ml),i:oe.HIGH,l:()=>({}),h:Qr},image:{t:vt(mb),i:oe.HIGH,l:d=>({D:d[1],B:vs(d[2]),F:d[3]}),h:(d,h,u)=>r("img",{key:u.k,alt:d.D||void 0,title:d.F||void 0,src:Wt(d.B)})},link:{t:bt(fb),i:oe.LOW,l:(d,h,u)=>({v:wb(h,d[1],u),B:vs(d[2]),F:d[3]}),h:(d,h,u)=>r("a",{key:u.k,href:Wt(d.B),title:d.F},h(d.v,u))},linkAngleBraceStyleDetector:{t:bt(Fg),i:oe.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],type:"link"})},linkBareUrlDetector:{t:(d,h)=>h.N?null:bt(Lg)(d,h),i:oe.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],F:void 0,type:"link"})},linkMailtoDetector:{t:bt(Vg),i:oe.MAX,l(d){let h=d[1],u=d[1];return Tg.test(u)||(u="mailto:"+u),{v:[{v:h.replace("mailto:",""),type:"text"}],B:u,type:"link"}}},orderedList:hs(r,1),unorderedList:hs(r,2),newlineCoalescer:{t:it(jg),i:oe.LOW,l:Zr,h:()=>`
`},paragraph:{t:yb,i:oe.LOW,l:Jr,h:(d,h,u)=>r("p",{key:u.k},h(d.v,u))},ref:{t:bt(Hg),i:oe.MAX,l:d=>(l[d[1]]={B:d[2],F:d[4]},{}),h:Qr},refImage:{t:vt(Ug),i:oe.MAX,l:d=>({D:d[1]||void 0,P:d[2]}),h:(d,h,u)=>r("img",{key:u.k,alt:d.D,src:Wt(l[d.P].B),title:l[d.P].F})},refLink:{t:bt(Gg),i:oe.MAX,l:(d,h,u)=>({v:h(d[1],u),Z:h(d[0].replace(qg,"\\$1"),u),P:d[2]}),h:(d,h,u)=>l[d.P]?r("a",{key:u.k,href:Wt(l[d.P].B),title:l[d.P].F},h(d.v,u)):r("span",{key:u.k},h(d.Z,u))},table:{t:it(hl),i:oe.HIGH,l:vb,h:(d,h,u)=>r("table",{key:u.k},r("thead",null,r("tr",null,d.L.map(function(b,x){return r("th",{key:x,style:bs(d,x)},h(b,u))}))),r("tbody",null,d.A.map(function(b,x){return r("tr",{key:x},b.map(function(R,w){return r("td",{key:w,style:bs(d,w)},h(R,u))}))})))},tableSeparator:{t:function(d,h){return h.$?(h._=!0,Yg.exec(d)):null},i:oe.HIGH,l:function(){return{type:"tableSeparator"}},h:()=>" | "},text:{t:wn(sb),i:oe.MIN,l:d=>({v:d[0].replace(Dg,(h,u)=>t.namedCodesToUnicode[u]?t.namedCodesToUnicode[u]:h)}),h:d=>d.v},textBolded:{t:vt(tb),i:oe.MED,l:(d,h,u)=>({v:h(d[2],u)}),h:(d,h,u)=>r("strong",{key:u.k},h(d.v,u))},textEmphasized:{t:vt(nb),i:oe.LOW,l:(d,h,u)=>({v:h(d[2],u)}),h:(d,h,u)=>r("em",{key:u.k},h(d.v,u))},textEscaped:{t:vt(ab),i:oe.HIGH,l:d=>({v:d[1],type:"text"})},textMarked:{t:vt(rb),i:oe.LOW,l:Jr,h:(d,h,u)=>r("mark",{key:u.k},h(d.v,u))},textStrikethroughed:{t:vt(ob),i:oe.LOW,l:Jr,h:(d,h,u)=>r("del",{key:u.k},h(d.v,u))}};t.disableParsingRawHTML!==!0&&(p.htmlBlock={t:wn(bo),i:oe.HIGH,l(d,h,u){const[,b]=d[3].match(lb),x=new RegExp(`^${b}`,"gm"),R=d[3].replace(x,""),w=(k=R,hb.some(_=>_.test(k))?xb:pr);var k;const y=d[1].toLowerCase(),S=kg.indexOf(y)!==-1;u.N=u.N||y==="a";const C=S?d[3]:w(h,R,u);return u.N=!1,{O:a(d[2]),v:C,G:S,H:S?y:d[1]}},h:(d,h,u)=>r(d.H,$t({key:u.k},d.O),d.G?d.v:h(d.v,u))},p.htmlSelfClosing={t:wn(vo),i:oe.HIGH,l:d=>({O:a(d[2]||""),H:d[1]}),h:(d,h,u)=>r(d.H,$t({},d.O,{key:u.k}))});const f=function(d){let h=Object.keys(d);function u(b,x){let R=[],w="";for(;b;){let k=0;for(;k<h.length;){const y=h[k],S=d[y],C=S.t(b,x,w);if(C){const _=C[0];b=b.substring(_.length);const D=S.l(C,u,x);D.type==null&&(D.type=y),R.push(D),w=_;break}k++}}return R}return h.sort(function(b,x){let R=d[b].i,w=d[x].i;return R!==w?R-w:b<x?-1:1}),function(b,x){return u(function(R){return R.replace(Pg,`
`).replace(Mg,"").replace(Xg,"    ")}(b),x)}}(p),m=(v=function(d){return function(h,u,b){return d[h.type].h(h,u,b)}}(p),function d(h,u={}){if(Array.isArray(h)){const b=u.k,x=[];let R=!1;for(let w=0;w<h.length;w++){u.k=w;const k=d(h[w],u),y=typeof k=="string";y&&R?x[x.length-1]+=k:k!==null&&x.push(k),R=y}return u.k=b,x}return v(h,d,u)});var v;const g=o(e);return s.length?r("div",null,g,r("footer",{key:"footer"},s.map(function(d){return r("div",{id:t.slugify(d.j),key:d.j},d.j,m(f(d.I,{_:!0})))}))):g}(function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"})(oe||(oe={}));const Tb=e=>{let{children:t,options:n}=e,r=function(o,a){if(o==null)return{};var s,l,p={},f=Object.keys(o);for(l=0;l<f.length;l++)a.indexOf(s=f[l])>=0||(p[s]=o[s]);return p}(e,xg);return N.cloneElement(Eb(t,n),r)};function Nb({id:e,markdown:t}){return c.jsx("div",{id:e,className:"pr-prose",children:c.jsx(Tb,{children:t})})}const Cl=T.forwardRef((e,t)=>c.jsxs(Ne,{ref:t,className:"pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600",...e,children:[c.jsx(le.Filter,{size:16,className:"pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"}),"Filter",c.jsx(le.ChevronDown,{size:16,className:"pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"})]}));var Ol=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(Ol||{});function Sb({groups:e}){return c.jsxs(wr,{children:[c.jsx(Eo,{asChild:!0,children:c.jsx(Cl,{})}),c.jsx(Vn,{children:e.map(t=>c.jsxs("div",{children:[c.jsx(sn,{children:t.label}),c.jsx(Cs,{children:t.items.map(n=>c.jsx("div",{children:n.itemType===0?c.jsx(xr,{onClick:n.onClick,children:n.label}):c.jsx(No,{onClick:n.onClick,value:n.label,children:n.label})},n.label))}),c.jsx(Fn,{})]},t.label))})]})}function Cb({id:e,message:t}){return c.jsx("div",{id:e,className:"pr-mb-20 pr-mt-20 pr-flex pr-items-center pr-justify-center",children:c.jsx("div",{className:"pr-w-3/4 pr-rounded-lg pr-bg-gray-100 pr-p-8 pr-text-center",children:c.jsx("p",{className:"pr-text-lg pr-text-gray-800",children:t})})})}function Ob({id:e,category:t,downloads:n,languages:r,moreInfoUrl:o}){const a=()=>{window.scrollTo(0,document.body.scrollHeight)};return c.jsxs("div",{id:e,className:"pr-flex pr-flex-wrap pr-items-start pr-space-x-4 pr-border-b pr-border-t pr-bg-white pr-pb-4 pr-pt-4",children:[c.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[c.jsx("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:c.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:t})}),c.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"CATEGORY"})]}),c.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),c.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[c.jsxs("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:[c.jsx(le.User,{className:"pr-mr-1 pr-h-4 pr-w-4"}),c.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:Object.values(n).reduce((s,l)=>s+l,0)})]}),c.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"USERS"})]}),c.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),c.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[c.jsx("div",{className:"pr-flex pr-items-center",children:r.slice(0,3).map(s=>c.jsx("span",{className:"pr-ml-1 pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1 pr-text-xs pr-font-semibold pr-text-gray-700",children:s.toUpperCase()},s))}),r.length>3&&c.jsxs("button",{type:"button",onClick:()=>a(),className:"pr-text-xs pr-text-gray-500 pr-underline",children:["+",r.length-3," more languages"]})]}),c.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),c.jsxs("div",{className:"pr-ml-auto pr-flex pr-flex-col pr-space-y-2",children:[c.jsxs("a",{href:o,className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Website",c.jsx(le.Link,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]}),c.jsxs("a",{href:"https://placeholder.com",className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Support",c.jsx(le.CircleHelp,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]})]})]})}function Rl({id:e,versionHistory:t}){const[n,r]=T.useState(!1),o=new Date;function a(l){const p=new Date(l),f=new Date(o.getTime()-p.getTime()),m=f.getUTCFullYear()-1970,v=f.getUTCMonth(),g=f.getUTCDate()-1;let d="";return m>0?d=`${m.toString()} year${m===1?"":"s"} ago`:v>0?d=`${v.toString()} month${v===1?"":"s"} ago`:g===0?d="today":d=`${g.toString()} day${g===1?"":"s"} ago`,d}const s=Object.entries(t).sort((l,p)=>p[0].localeCompare(l[0]));return c.jsxs("div",{id:e,children:[c.jsx("h3",{className:"pr-text-md pr-font-semibold",children:"What`s New"}),c.jsx("ul",{className:"pr-list-disc pr-pl-5 pr-pr-4 pr-text-xs pr-text-gray-600",children:(n?s:s.slice(0,5)).map(l=>c.jsxs("div",{className:"pr-mt-3 pr-flex pr-justify-between",children:[c.jsx("div",{className:"pr-text-gray-600",children:c.jsx("li",{className:"pr-prose pr-text-xs",children:c.jsx("span",{children:l[1].description})})}),c.jsxs("div",{className:"pr-justify-end pr-text-right",children:[c.jsxs("div",{children:["Version ",l[0]]}),c.jsx("div",{children:a(l[1].date)})]})]},l[0]))}),s.length>5&&c.jsx("button",{type:"button",onClick:()=>r(!n),className:"pr-text-xs pr-text-gray-500 pr-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function Rb({id:e,publisherDisplayName:t,fileSize:n,locales:r,versionHistory:o}){const s=(l=>{const p=new Intl.DisplayNames(navigator.language,{type:"language"});return l.map(f=>p.of(f))})(r);return c.jsx("div",{id:e,className:"pr-border-t pr-pb-4 pr-pt-4",children:c.jsxs("div",{className:"pr-md:flex-row pr-md:space-x-8 pr-flex pr-flex-col pr-space-x-0",children:[c.jsx(Rl,{versionHistory:o}),c.jsx("div",{className:"pr-md:border-t-0 pr-md:border-l pr-md-h-auto pr-md-ml-8 pr-mt-4 pr-border-t pr-border-gray-300"}),c.jsxs("div",{className:"pr-md:mt-0 pr-mt-4 pr-flex-1 pr-space-y-3",children:[c.jsx("h2",{className:"pr-text-md pr-font-semibold",children:"Information"}),c.jsxs("div",{className:"pr-flex pr-items-start pr-justify-between pr-pr-4 pr-text-xs pr-text-gray-600",children:[c.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[c.jsx("span",{className:"pr-mb-2",children:"Publisher"}),c.jsx("span",{className:"pr-font-semibold",children:t}),c.jsx("span",{className:"pr-mb-2 pr-mt-4",children:"Size"}),c.jsxs("span",{className:"pr-font-semibold",children:[(n/1e6).toPrecision(3)," MB"]})]}),c.jsx("div",{className:"pr-flex pr-w-3/4 pr-items-center pr-justify-between pr-text-xs pr-text-gray-600",children:c.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[c.jsx("span",{className:"pr-mb-2",children:"Languages"}),c.jsx("span",{className:"pr-font-semibold",children:s.join(", ")})]})})]})]})]})})}const jb=(e,t)=>{T.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},to=()=>!1,Pb=(e,t)=>{const[n]=yr(T.useCallback(async()=>{if(!e)return to;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),to,{preserveValue:!1});T.useEffect(()=>()=>{n!==to&&n()},[n])},jl=T.forwardRef(({className:e,...t},n)=>c.jsx("div",{ref:n,className:F("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));jl.displayName="Card";const Pl=T.forwardRef(({className:e,...t},n)=>c.jsx("div",{ref:n,className:F("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));Pl.displayName="CardHeader";const $l=T.forwardRef(({className:e,...t},n)=>c.jsx("h3",{ref:n,className:F("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));$l.displayName="CardTitle";const _l=T.forwardRef(({className:e,...t},n)=>c.jsx("p",{ref:n,className:F("pr-text-sm pr-text-muted-foreground",e),...t}));_l.displayName="CardDescription";const Ml=T.forwardRef(({className:e,...t},n)=>c.jsx("div",{ref:n,className:F("pr-p-6 pr-pt-0",e),...t}));Ml.displayName="CardContent";const Il=T.forwardRef(({className:e,...t},n)=>c.jsx("div",{ref:n,className:F("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));Il.displayName="CardFooter";const $b=yo.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),Dl=T.forwardRef(({className:e,variant:t,...n},r)=>c.jsx("div",{ref:r,role:"alert",className:F($b({variant:t}),e),...n}));Dl.displayName="Alert";const Al=T.forwardRef(({className:e,...t},n)=>c.jsxs("h5",{ref:n,className:F("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));Al.displayName="AlertTitle";const Bl=T.forwardRef(({className:e,...t},n)=>c.jsx("div",{ref:n,className:F("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));Bl.displayName="AlertDescription";const Ll=T.forwardRef(({className:e,...t},n)=>c.jsxs(kn.Root,{ref:n,className:F("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[c.jsx(kn.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:c.jsx(kn.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),c.jsx(kn.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));Ll.displayName=kn.Root.displayName;const Vl=T.forwardRef(({className:e,...t},n)=>c.jsx(ro.Root,{className:F("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:n,children:c.jsx(ro.Thumb,{className:F("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));Vl.displayName=ro.Root.displayName;exports.Alert=Dl;exports.AlertDescription=Bl;exports.AlertTitle=Al;exports.BookChapterControl=Dc;exports.Button=Ne;exports.Card=jl;exports.CardContent=Ml;exports.CardDescription=_l;exports.CardFooter=Il;exports.CardHeader=Pl;exports.CardTitle=$l;exports.ChapterRangeSelector=ep;exports.Checkbox=Gs;exports.Checklist=tp;exports.ComboBox=oo;exports.ContextMenu=Zh;exports.DataTable=As;exports.DisableButton=yg;exports.DropdownMenu=wr;exports.DropdownMenuCheckboxItem=xr;exports.DropdownMenuContent=Vn;exports.DropdownMenuGroup=Cs;exports.DropdownMenuItem=To;exports.DropdownMenuItemType=Ol;exports.DropdownMenuLabel=sn;exports.DropdownMenuPortal=Ec;exports.DropdownMenuRadioGroup=Nc;exports.DropdownMenuRadioItem=No;exports.DropdownMenuSeparator=Fn;exports.DropdownMenuShortcut=js;exports.DropdownMenuSub=Tc;exports.DropdownMenuSubContent=Rs;exports.DropdownMenuSubTrigger=Os;exports.DropdownMenuTrigger=Eo;exports.EnableButton=vg;exports.FilterButton=Cl;exports.FilterDropdown=Sb;exports.Footer=Rb;exports.GridMenu=Fi;exports.HamburgerMenuButton=Qi;exports.INVENTORY_STRING_KEYS=Vc;exports.IconButton=tg;exports.Input=Ln;exports.InstallButton=bg;exports.Inventory=Uc;exports.Label=Ko;exports.LabelPosition=jt;exports.MarkdownRenderer=Nb;exports.MenuItem=Xo;exports.Message=Cb;exports.MoreInfo=Ob;exports.ScriptureResultsViewer=lg;exports.SearchBar=pg;exports.Select=$n;exports.SelectContent=Jt;exports.SelectGroup=$s;exports.SelectItem=Ye;exports.SelectLabel=_s;exports.SelectScrollDownButton=Co;exports.SelectScrollUpButton=So;exports.SelectSeparator=Ms;exports.SelectTrigger=Kt;exports.SelectValue=_n;exports.ShadCnSlider=Ll;exports.ShadCnSwitch=Vl;exports.Slider=dg;exports.Snackbar=ug;exports.Switch=fg;exports.Table=zn;exports.TableBody=Un;exports.TableCaption=Ds;exports.TableCell=It;exports.TableFooter=Is;exports.TableHead=Zt;exports.TableHeader=Hn;exports.TableRow=lt;exports.Tabs=hg;exports.TabsContent=ol;exports.TabsList=nl;exports.TabsTrigger=rl;exports.TextField=tl;exports.Toolbar=mg;exports.UpdateButton=wg;exports.VersionHistory=Rl;exports.VerticalTabs=al;exports.VerticalTabsContent=il;exports.VerticalTabsList=sl;exports.VerticalTabsTrigger=gg;exports.buttonVariants=Ps;exports.getSortingIcon=Fc;exports.useEvent=jb;exports.useEventAsync=Pb;exports.usePromise=yr;function _b(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}_b(`/*
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
[hidden]:where(.pr-twp,.pr-twp *) {
  display: none;
}
  @font-face {
    font-family: 'Inter';
    font-display: 'swap';
    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  }

  /* Adding the preflight selector (pr-twp) to components was not changing the font as desired.
  So this piece of code adds pr-font-sans everywhere we include preflight. */
  .pr-twp {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }

  /* using color palette https://supercolorpalette.com/?scp=G0-hsl-99827A-E7DDD0-FEF4E7-FEFAF1-FFFFFF-D8E9E3-719892-07463D-0A433D-083030-041616-000000-85DBB8-F2F52E-CD3737 */
  .paratext-light {
    --background: 0, 0%, 100%;
    --foreground: 0, 0%, 0%;
    --muted: 33.9, 32.4%, 86.1%;
    --muted-foreground: 15.5, 13.2%, 53.9%;
    --popover: 0, 0%, 100%;
    --popover-foreground: 0, 0%, 0%;
    --card: 0 0% 100%;
    --card-foreground: 0, 0%, 0%;
    --border: 220 13% 91%;
    --input: 161.3, 26.7%, 88.2%;
    --primary: 173.4, 82.1%, 15.3%;
    --primary-foreground: 40, 85.7%, 97.3%;
    --secondary: 161.3, 26.7%, 88.2%;
    --secondary-foreground: 173.4, 82.1%, 15.3%;
    --accent: 161.3, 26.7%, 88.2%;
    --accent-foreground: 173.4, 82.1%, 15.3%;
    --destructive: 0, 60%, 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5, 13.2%, 53.9%;

    /* work around for hsl(var(--xx) / 0.y) not working */
    /* stylelint-disable selector-class-pattern */
    .hover\\:pr-bg-primary\\/90:hover {
      background-color: hsl(173, 82%, 15%, 0.9);
    }

    .hover\\:pr-bg-secondary\\/80:hover {
      background-color: hsl(161, 26%, 88%, 0.8);
    }

    .hover\\:pr-bg-destructive\\/90:hover {
      background-color: hsl(0, 60%, 51%, 0.9);
    }

    .pr-bg-muted\\/50,
    .hover\\:pr-bg-muted\\/50:hover {
      background-color: hsl(33.9, 32.4%, 86.1%, 0.5);
    }

    .pr-bg-muted\\/40 {
      background-color: hsl(33.9, 32.4%, 86.1%, 0.4);
    }
  }

  .paratext-dark {
    --background: 0, 0%, 0%;
    --foreground: 0, 0%, 100%;
    --muted: 15.5, 13.2%, 53.9%;
    --muted-foreground: 33.9, 32.4%, 86.1%;
    --popover: 180, 71.4%, 5%;
    --popover-foreground: 0, 0%, 100%;
    --card: 0 0% 0%;
    --card-foreground: 0, 0%, 100%;
    --border: 220 13% 20%;
    --input: 220 13% 20%;
    --primary: 161.3, 26.7%, 88.2%;
    --primary-foreground: 173.4, 82.1%, 15.3%;
    --secondary: 180, 71.4%, 11%;
    --secondary-foreground: 161.3, 26.7%, 88.2%;
    --accent: 180, 71.4%, 11%;
    --accent-foreground: 161.3, 26.7%, 88.2%;
    --destructive: 0, 60%, 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5, 13.2%, 53.9%;

    /* work around for hsl(var(--xx) / 0.y) not working */
    .hover\\:pr-bg-primary\\/90:hover {
      background-color: hsl(161.3, 26.7%, 88.2%, 0.9);
    }

    .hover\\:pr-bg-secondary\\/80:hover {
      background-color: hsl(180, 71.4%, 11%, 0.8);
    }

    .hover\\:pr-bg-destructive\\/90:hover {
      background-color: hsl(0, 60%, 51%, 0.9);
    }

    .pr-bg-muted\\/50,
    .hover\\:pr-bg-muted\\/50:hover {
      background-color: hsl(15.5, 13.2%, 53.9%, 0.5);
    }

    .pr-bg-muted\\/40 {
      background-color: hsl(15.5, 13.2%, 53.9%, 0.4);
    }
  }
  * {
  border-color: hsl(var(--border));
}

  body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

*, ::before, ::after {
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
}
.pr-sr-only {
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
.pr-pointer-events-none {
  pointer-events: none;
}
.pr-fixed {
  position: fixed;
}
.pr-absolute {
  position: absolute;
}
.pr-relative {
  position: relative;
}
.pr-sticky {
  position: sticky;
}
.pr-inset-0 {
  inset: 0px;
}
.pr-inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.pr-left-2 {
  left: 0.5rem;
}
.pr-left-2\\.5 {
  left: 0.625rem;
}
.pr-left-\\[50\\%\\] {
  left: 50%;
}
.pr-right-3 {
  right: 0.75rem;
}
.pr-right-4 {
  right: 1rem;
}
.pr-top-0 {
  top: 0px;
}
.pr-top-1\\/2 {
  top: 50%;
}
.pr-top-2 {
  top: 0.5rem;
}
.pr-top-2\\.5 {
  top: 0.625rem;
}
.pr-top-4 {
  top: 1rem;
}
.pr-top-\\[50\\%\\] {
  top: 50%;
}
.pr-z-10 {
  z-index: 10;
}
.pr-z-30 {
  z-index: 30;
}
.pr-z-50 {
  z-index: 50;
}
.pr-col-span-2 {
  grid-column: span 2 / span 2;
}
.pr-m-1 {
  margin: 0.25rem;
}
.pr-m-2 {
  margin: 0.5rem;
}
.pr--mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
.pr-mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.pr-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.pr-my-2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.pr-my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.pr-mb-1 {
  margin-bottom: 0.25rem;
}
.pr-mb-2 {
  margin-bottom: 0.5rem;
}
.pr-mb-20 {
  margin-bottom: 5rem;
}
.pr-me-2 {
  margin-inline-end: 0.5rem;
}
.pr-ml-1 {
  margin-left: 0.25rem;
}
.pr-ml-2 {
  margin-left: 0.5rem;
}
.pr-ml-auto {
  margin-left: auto;
}
.pr-mr-1 {
  margin-right: 0.25rem;
}
.pr-mr-2 {
  margin-right: 0.5rem;
}
.pr-ms-2 {
  margin-inline-start: 0.5rem;
}
.pr-ms-5 {
  margin-inline-start: 1.25rem;
}
.pr-mt-2 {
  margin-top: 0.5rem;
}
.pr-mt-20 {
  margin-top: 5rem;
}
.pr-mt-3 {
  margin-top: 0.75rem;
}
.pr-mt-4 {
  margin-top: 1rem;
}
.pr-mt-auto {
  margin-top: auto;
}
.pr-box-border {
  box-sizing: border-box;
}
.pr-block {
  display: block;
}
.pr-inline-block {
  display: inline-block;
}
.pr-inline {
  display: inline;
}
.pr-flex {
  display: flex;
}
.pr-inline-flex {
  display: inline-flex;
}
.pr-grid {
  display: grid;
}
.pr-inline-grid {
  display: inline-grid;
}
.pr-hidden {
  display: none;
}
.pr-h-10 {
  height: 2.5rem;
}
.pr-h-11 {
  height: 2.75rem;
}
.pr-h-12 {
  height: 3rem;
}
.pr-h-14 {
  height: 3.5rem;
}
.pr-h-2 {
  height: 0.5rem;
}
.pr-h-24 {
  height: 6rem;
}
.pr-h-3 {
  height: 0.75rem;
}
.pr-h-3\\.5 {
  height: 0.875rem;
}
.pr-h-4 {
  height: 1rem;
}
.pr-h-5 {
  height: 1.25rem;
}
.pr-h-6 {
  height: 1.5rem;
}
.pr-h-7 {
  height: 1.75rem;
}
.pr-h-8 {
  height: 2rem;
}
.pr-h-9 {
  height: 2.25rem;
}
.pr-h-96 {
  height: 24rem;
}
.pr-h-\\[1\\.2rem\\] {
  height: 1.2rem;
}
.pr-h-\\[100\\%\\] {
  height: 100%;
}
.pr-h-\\[405px\\] {
  height: 405px;
}
.pr-h-\\[var\\(--radix-select-trigger-height\\)\\] {
  height: var(--radix-select-trigger-height);
}
.pr-h-full {
  height: 100%;
}
.pr-h-px {
  height: 1px;
}
.pr-max-h-96 {
  max-height: 24rem;
}
.pr-max-h-\\[300px\\] {
  max-height: 300px;
}
.pr-w-0 {
  width: 0px;
}
.pr-w-1\\/3 {
  width: 33.333333%;
}
.pr-w-10 {
  width: 2.5rem;
}
.pr-w-11 {
  width: 2.75rem;
}
.pr-w-14 {
  width: 3.5rem;
}
.pr-w-2 {
  width: 0.5rem;
}
.pr-w-20 {
  width: 5rem;
}
.pr-w-3 {
  width: 0.75rem;
}
.pr-w-3\\.5 {
  width: 0.875rem;
}
.pr-w-3\\/4 {
  width: 75%;
}
.pr-w-4 {
  width: 1rem;
}
.pr-w-5 {
  width: 1.25rem;
}
.pr-w-6 {
  width: 1.5rem;
}
.pr-w-72 {
  width: 18rem;
}
.pr-w-8 {
  width: 2rem;
}
.pr-w-9 {
  width: 2.25rem;
}
.pr-w-\\[1\\.2rem\\] {
  width: 1.2rem;
}
.pr-w-\\[100px\\] {
  width: 100px;
}
.pr-w-\\[116px\\] {
  width: 116px;
}
.pr-w-\\[124px\\] {
  width: 124px;
}
.pr-w-\\[150px\\] {
  width: 150px;
}
.pr-w-\\[200px\\] {
  width: 200px;
}
.pr-w-\\[350px\\] {
  width: 350px;
}
.pr-w-\\[70px\\] {
  width: 70px;
}
.pr-w-auto {
  width: auto;
}
.pr-w-full {
  width: 100%;
}
.pr-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.pr-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
}
.pr-max-w-64 {
  max-width: 16rem;
}
.pr-max-w-lg {
  max-width: 32rem;
}
.pr-flex-1 {
  flex: 1 1 0%;
}
.pr-shrink-0 {
  flex-shrink: 0;
}
.pr-flex-grow {
  flex-grow: 1;
}
.pr-grow {
  flex-grow: 1;
}
.pr-caption-bottom {
  caption-side: bottom;
}
.pr--translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-translate-x-\\[-50\\%\\] {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-translate-y-\\[-50\\%\\] {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-rotate-0 {
  --tw-rotate: 0deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-rotate-90 {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-scale-0 {
  --tw-scale-x: 0;
  --tw-scale-y: 0;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-scale-100 {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes pr-spin {

  to {
    transform: rotate(360deg);
  }
}
.pr-animate-spin {
  animation: pr-spin 1s linear infinite;
}
.pr-cursor-default {
  cursor: default;
}
.pr-cursor-not-allowed {
  cursor: not-allowed;
}
.pr-cursor-pointer {
  cursor: pointer;
}
.pr-touch-none {
  touch-action: none;
}
.pr-select-none {
  user-select: none;
}
.pr-list-disc {
  list-style-type: disc;
}
.pr-auto-rows-max {
  grid-auto-rows: max-content;
}
.pr-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.pr-flex-row {
  flex-direction: row;
}
.pr-flex-col {
  flex-direction: column;
}
.pr-flex-col-reverse {
  flex-direction: column-reverse;
}
.pr-flex-wrap {
  flex-wrap: wrap;
}
.pr-items-start {
  align-items: flex-start;
}
.pr-items-center {
  align-items: center;
}
.pr-justify-start {
  justify-content: flex-start;
}
.pr-justify-end {
  justify-content: flex-end;
}
.pr-justify-center {
  justify-content: center;
}
.pr-justify-between {
  justify-content: space-between;
}
.pr-gap-0 {
  gap: 0px;
}
.pr-gap-0\\.5 {
  gap: 0.125rem;
}
.pr-gap-1 {
  gap: 0.25rem;
}
.pr-gap-1\\.5 {
  gap: 0.375rem;
}
.pr-gap-2 {
  gap: 0.5rem;
}
.pr-gap-2\\.5 {
  gap: 0.625rem;
}
.pr-gap-3 {
  gap: 0.75rem;
}
.pr-gap-4 {
  gap: 1rem;
}
.pr-gap-6 {
  gap: 1.5rem;
}
.pr-space-x-0 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0px * var(--tw-space-x-reverse));
  margin-left: calc(0px * calc(1 - var(--tw-space-x-reverse)));
}
.pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.pr-space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}
.pr-space-x-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1.5rem * var(--tw-space-x-reverse));
  margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.pr-space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}
.pr-space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.375rem * var(--tw-space-y-reverse));
}
.pr-space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.pr-space-y-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}
.pr-space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
.pr-self-stretch {
  align-self: stretch;
}
.pr-overflow-auto {
  overflow: auto;
}
.pr-overflow-hidden {
  overflow: hidden;
}
.pr-overflow-y-auto {
  overflow-y: auto;
}
.pr-overflow-x-hidden {
  overflow-x: hidden;
}
.pr-overflow-y-hidden {
  overflow-y: hidden;
}
.pr-whitespace-nowrap {
  white-space: nowrap;
}
.pr-text-nowrap {
  text-wrap: nowrap;
}
.pr-text-balance {
  text-wrap: balance;
}
.pr-break-words {
  overflow-wrap: break-word;
}
.pr-rounded-full {
  border-radius: 9999px;
}
.pr-rounded-lg {
  border-radius: var(--radius);
}
.pr-rounded-md {
  border-radius: calc(var(--radius) - 2px);
}
.pr-rounded-sm {
  border-radius: calc(var(--radius) - 4px);
}
.pr-rounded-s-md {
  border-start-start-radius: calc(var(--radius) - 2px);
  border-end-start-radius: calc(var(--radius) - 2px);
}
.pr-rounded-t-none {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.pr-rounded-ee-none {
  border-end-end-radius: 0px;
}
.pr-rounded-ss-none {
  border-start-start-radius: 0px;
}
.pr-border {
  border-width: 1px;
}
.pr-border-0 {
  border-width: 0px;
}
.pr-border-2 {
  border-width: 2px;
}
.pr-border-b {
  border-bottom-width: 1px;
}
.pr-border-b-0 {
  border-bottom-width: 0px;
}
.pr-border-e {
  border-inline-end-width: 1px;
}
.pr-border-l {
  border-left-width: 1px;
}
.pr-border-l-2 {
  border-left-width: 2px;
}
.pr-border-r-0 {
  border-right-width: 0px;
}
.pr-border-t {
  border-top-width: 1px;
}
.pr-border-t-0 {
  border-top-width: 0px;
}
.pr-border-solid {
  border-style: solid;
}
.pr-border-dashed {
  border-style: dashed;
}
.pr-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
}
.pr-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.pr-border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
}
.pr-border-gray-400 {
  --tw-border-opacity: 1;
  border-color: rgb(156 163 175 / var(--tw-border-opacity));
}
.pr-border-input {
  border-color: hsl(var(--input));
}
.pr-border-primary {
  border-color: hsl(var(--primary));
}
.pr-border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity));
}
.pr-border-transparent {
  border-color: transparent;
}
.pr-border-l-indigo-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(199 210 254 / var(--tw-border-opacity));
}
.pr-border-l-purple-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(233 213 255 / var(--tw-border-opacity));
}
.pr-border-l-red-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(254 202 202 / var(--tw-border-opacity));
}
.pr-bg-accent {
  background-color: hsl(var(--accent));
}
.pr-bg-accent-foreground {
  background-color: hsl(var(--accent-foreground));
}
.pr-bg-amber-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
}
.pr-bg-amber-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(253 230 138 / var(--tw-bg-opacity));
}
.pr-bg-amber-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 251 235 / var(--tw-bg-opacity));
}
.pr-bg-background {
  background-color: hsl(var(--background));
}
.pr-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.pr-bg-blue-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity));
}
.pr-bg-blue-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
}
.pr-bg-border {
  background-color: hsl(var(--border));
}
.pr-bg-card {
  background-color: hsl(var(--card));
}
.pr-bg-card-foreground {
  background-color: hsl(var(--card-foreground));
}
.pr-bg-destructive {
  background-color: hsl(var(--destructive));
}
.pr-bg-destructive-foreground {
  background-color: hsl(var(--destructive-foreground));
}
.pr-bg-foreground {
  background-color: hsl(var(--foreground));
}
.pr-bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}
.pr-bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity));
}
.pr-bg-gray-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity));
}
.pr-bg-input {
  background-color: hsl(var(--input));
}
.pr-bg-muted {
  background-color: hsl(var(--muted));
}
.pr-bg-muted-foreground {
  background-color: hsl(var(--muted-foreground));
}
.pr-bg-muted\\/40 {
  background-color: hsl(var(--muted) / 0.4);
}
.pr-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.pr-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity));
}
.pr-bg-popover {
  background-color: hsl(var(--popover));
}
.pr-bg-popover-foreground {
  background-color: hsl(var(--popover-foreground));
}
.pr-bg-primary {
  background-color: hsl(var(--primary));
}
.pr-bg-primary-foreground {
  background-color: hsl(var(--primary-foreground));
}
.pr-bg-ring {
  background-color: hsl(var(--ring));
}
.pr-bg-secondary {
  background-color: hsl(var(--secondary));
}
.pr-bg-secondary-foreground {
  background-color: hsl(var(--secondary-foreground));
}
.pr-bg-transparent {
  background-color: transparent;
}
.pr-bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.pr-fill-current {
  fill: currentColor;
}
.pr-p-0 {
  padding: 0px;
}
.pr-p-1 {
  padding: 0.25rem;
}
.pr-p-2 {
  padding: 0.5rem;
}
.pr-p-4 {
  padding: 1rem;
}
.pr-p-6 {
  padding: 1.5rem;
}
.pr-p-8 {
  padding: 2rem;
}
.pr-p-\\[1px\\] {
  padding: 1px;
}
.pr-px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.pr-px-2\\.5 {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.pr-px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.pr-px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.pr-px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.pr-px-7 {
  padding-left: 1.75rem;
  padding-right: 1.75rem;
}
.pr-px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.pr-py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.pr-py-1\\.5 {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.pr-py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.pr-py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.pr-py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.pr-py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.pr-pb-3 {
  padding-bottom: 0.75rem;
}
.pr-pb-4 {
  padding-bottom: 1rem;
}
.pr-pl-4 {
  padding-left: 1rem;
}
.pr-pl-5 {
  padding-left: 1.25rem;
}
.pr-pl-8 {
  padding-left: 2rem;
}
.pr-pr-2 {
  padding-right: 0.5rem;
}
.pr-pr-3 {
  padding-right: 0.75rem;
}
.pr-pr-4 {
  padding-right: 1rem;
}
.pr-ps-12 {
  padding-inline-start: 3rem;
}
.pr-ps-4 {
  padding-inline-start: 1rem;
}
.pr-ps-8 {
  padding-inline-start: 2rem;
}
.pr-pt-0 {
  padding-top: 0px;
}
.pr-pt-3 {
  padding-top: 0.75rem;
}
.pr-pt-4 {
  padding-top: 1rem;
}
.pr-text-left {
  text-align: left;
}
.pr-text-center {
  text-align: center;
}
.pr-text-right {
  text-align: right;
}
.pr-align-middle {
  vertical-align: middle;
}
.pr-font-sans {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.pr-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.pr-text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.pr-text-5xl {
  font-size: 3rem;
  line-height: 1;
}
.pr-text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.pr-text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.pr-text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.pr-font-bold {
  font-weight: 700;
}
.pr-font-medium {
  font-weight: 500;
}
.pr-font-normal {
  font-weight: 400;
}
.pr-font-semibold {
  font-weight: 600;
}
.pr-uppercase {
  text-transform: uppercase;
}
.pr-capitalize {
  text-transform: capitalize;
}
.pr-not-italic {
  font-style: normal;
}
.pr-leading-none {
  line-height: 1;
}
.pr-leading-relaxed {
  line-height: 1.625;
}
.pr-tracking-tight {
  letter-spacing: -0.025em;
}
.pr-tracking-widest {
  letter-spacing: 0.1em;
}
.pr-text-accent-foreground {
  color: hsl(var(--accent-foreground));
}
.pr-text-amber-800 {
  --tw-text-opacity: 1;
  color: rgb(146 64 14 / var(--tw-text-opacity));
}
.pr-text-amber-900 {
  --tw-text-opacity: 1;
  color: rgb(120 53 15 / var(--tw-text-opacity));
}
.pr-text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}
.pr-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}
.pr-text-card-foreground {
  color: hsl(var(--card-foreground));
}
.pr-text-current {
  color: currentColor;
}
.pr-text-destructive {
  color: hsl(var(--destructive));
}
.pr-text-destructive-foreground {
  color: hsl(var(--destructive-foreground));
}
.pr-text-foreground {
  color: hsl(var(--foreground));
}
.pr-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
.pr-text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity));
}
.pr-text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
}
.pr-text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity));
}
.pr-text-inherit {
  color: inherit;
}
.pr-text-muted-foreground {
  color: hsl(var(--muted-foreground));
}
.pr-text-popover-foreground {
  color: hsl(var(--popover-foreground));
}
.pr-text-primary {
  color: hsl(var(--primary));
}
.pr-text-primary-foreground {
  color: hsl(var(--primary-foreground));
}
.pr-text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity));
}
.pr-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}
.pr-text-slate-700 {
  --tw-text-opacity: 1;
  color: rgb(51 65 85 / var(--tw-text-opacity));
}
.pr-text-slate-900 {
  --tw-text-opacity: 1;
  color: rgb(15 23 42 / var(--tw-text-opacity));
}
.pr-text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.pr-text-yellow-900 {
  --tw-text-opacity: 1;
  color: rgb(113 63 18 / var(--tw-text-opacity));
}
.pr-underline {
  text-decoration-line: underline;
}
.pr-underline-offset-4 {
  text-underline-offset: 4px;
}
.pr-opacity-0 {
  opacity: 0;
}
.pr-opacity-50 {
  opacity: 0.5;
}
.pr-opacity-60 {
  opacity: 0.6;
}
.pr-opacity-70 {
  opacity: 0.7;
}
.pr-shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.pr-shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.pr-shadow-none {
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.pr-shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.pr-outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.pr-ring-0 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.pr-ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background));
}
.pr-transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.pr-transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.pr-transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.pr-transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.pr-transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.pr-duration-200 {
  transition-duration: 200ms;
}
.pr-duration-300 {
  transition-duration: 300ms;
}
.pr-ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
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
.pr-duration-200 {
  animation-duration: 200ms;
}
.pr-duration-300 {
  animation-duration: 300ms;
}
.pr-ease-in-out {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.file\\:pr-border-0::file-selector-button {
  border-width: 0px;
}
.file\\:pr-bg-transparent::file-selector-button {
  background-color: transparent;
}
.file\\:pr-text-sm::file-selector-button {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.file\\:pr-font-medium::file-selector-button {
  font-weight: 500;
}
.placeholder\\:pr-text-muted-foreground::placeholder {
  color: hsl(var(--muted-foreground));
}
.hover\\:pr-border-blue-600:hover {
  --tw-border-opacity: 1;
  border-color: rgb(37 99 235 / var(--tw-border-opacity));
}
.hover\\:pr-bg-accent:hover {
  background-color: hsl(var(--accent));
}
.hover\\:pr-bg-blue-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
}
.hover\\:pr-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}
.hover\\:pr-bg-gray-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity));
}
.hover\\:pr-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
}
.hover\\:pr-bg-primary\\/90:hover {
  background-color: hsl(var(--primary) / 0.9);
}
.hover\\:pr-bg-secondary\\/80:hover {
  background-color: hsl(var(--secondary) / 0.8);
}
.hover\\:pr-bg-white:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.hover\\:pr-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}
.hover\\:pr-text-blue-600:hover {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}
.hover\\:pr-text-foreground:hover {
  color: hsl(var(--foreground));
}
.hover\\:pr-text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.hover\\:pr-underline:hover {
  text-decoration-line: underline;
}
.hover\\:pr-opacity-100:hover {
  opacity: 1;
}
.focus\\:pr-bg-accent:focus {
  background-color: hsl(var(--accent));
}
.focus\\:pr-text-accent-foreground:focus {
  color: hsl(var(--accent-foreground));
}
.focus\\:pr-outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus\\:pr-ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus\\:pr-ring-ring:focus {
  --tw-ring-color: hsl(var(--ring));
}
.focus\\:pr-ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}
.focus-visible\\:pr-outline-none:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus-visible\\:pr-ring-2:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus-visible\\:pr-ring-\\[color\\:hsl\\(2400o2c 5\\%0o2c 64\\.9\\%\\)\\]:focus-visible {
  --tw-ring-opacity: 1;
  --tw-ring-color: hsl(240 5% 64.9% / var(--tw-ring-opacity));
}
.focus-visible\\:pr-ring-ring:focus-visible {
  --tw-ring-color: hsl(var(--ring));
}
.focus-visible\\:pr-ring-offset-2:focus-visible {
  --tw-ring-offset-width: 2px;
}
.focus-visible\\:pr-ring-offset-background:focus-visible {
  --tw-ring-offset-color: hsl(var(--background));
}
.disabled\\:pr-pointer-events-none:disabled {
  pointer-events: none;
}
.disabled\\:pr-cursor-not-allowed:disabled {
  cursor: not-allowed;
}
.disabled\\:pr-opacity-50:disabled {
  opacity: 0.5;
}
.pr-group:hover .group-hover\\:pr-opacity-100 {
  opacity: 1;
}
.pr-peer:disabled ~ .peer-disabled\\:pr-cursor-not-allowed {
  cursor: not-allowed;
}
.pr-peer:disabled ~ .peer-disabled\\:pr-opacity-70 {
  opacity: 0.7;
}
.data-\\[disabled\\=true\\]\\:pr-pointer-events-none[data-disabled=true] {
  pointer-events: none;
}
.data-\\[disabled\\]\\:pr-pointer-events-none[data-disabled] {
  pointer-events: none;
}
.data-\\[side\\=bottom\\]\\:pr-translate-y-1[data-side=bottom] {
  --tw-translate-y: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=left\\]\\:pr--translate-x-1[data-side=left] {
  --tw-translate-x: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=right\\]\\:pr-translate-x-1[data-side=right] {
  --tw-translate-x: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=top\\]\\:pr--translate-y-1[data-side=top] {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=checked\\]\\:pr-translate-x-5[data-state=checked] {
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=unchecked\\]\\:pr-translate-x-0[data-state=unchecked] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[highlighted\\]\\:pr-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
}
.data-\\[selected\\=true\\]\\:pr-bg-accent[data-selected=true] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=active\\]\\:pr-bg-background[data-state=active] {
  background-color: hsl(var(--background));
}
.data-\\[state\\=checked\\]\\:pr-bg-primary[data-state=checked] {
  background-color: hsl(var(--primary));
}
.data-\\[state\\=open\\]\\:pr-bg-accent[data-state=open] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=selected\\]\\:pr-bg-muted[data-state=selected] {
  background-color: hsl(var(--muted));
}
.data-\\[state\\=unchecked\\]\\:pr-bg-input[data-state=unchecked] {
  background-color: hsl(var(--input));
}
.data-\\[selected\\=true\\]\\:pr-text-accent-foreground[data-selected=true] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=active\\]\\:pr-text-foreground[data-state=active] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=checked\\]\\:pr-text-primary-foreground[data-state=checked] {
  color: hsl(var(--primary-foreground));
}
.data-\\[state\\=open\\]\\:pr-text-muted-foreground[data-state=open] {
  color: hsl(var(--muted-foreground));
}
.data-\\[disabled\\=true\\]\\:pr-opacity-50[data-disabled=true] {
  opacity: 0.5;
}
.data-\\[disabled\\]\\:pr-opacity-50[data-disabled] {
  opacity: 0.5;
}
.data-\\[state\\=active\\]\\:pr-shadow-sm[data-state=active] {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.data-\\[state\\=open\\]\\:pr-animate-in[data-state=open] {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:pr-animate-out[data-state=closed] {
  animation-name: exit;
  animation-duration: 150ms;
  --tw-exit-opacity: initial;
  --tw-exit-scale: initial;
  --tw-exit-rotate: initial;
  --tw-exit-translate-x: initial;
  --tw-exit-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:pr-fade-out-0[data-state=closed] {
  --tw-exit-opacity: 0;
}
.data-\\[state\\=open\\]\\:pr-fade-in-0[data-state=open] {
  --tw-enter-opacity: 0;
}
.data-\\[state\\=closed\\]\\:pr-zoom-out-95[data-state=closed] {
  --tw-exit-scale: .95;
}
.data-\\[state\\=open\\]\\:pr-zoom-in-95[data-state=open] {
  --tw-enter-scale: .95;
}
.data-\\[side\\=bottom\\]\\:pr-slide-in-from-top-2[data-side=bottom] {
  --tw-enter-translate-y: -0.5rem;
}
.data-\\[side\\=left\\]\\:pr-slide-in-from-right-2[data-side=left] {
  --tw-enter-translate-x: 0.5rem;
}
.data-\\[side\\=right\\]\\:pr-slide-in-from-left-2[data-side=right] {
  --tw-enter-translate-x: -0.5rem;
}
.data-\\[side\\=top\\]\\:pr-slide-in-from-bottom-2[data-side=top] {
  --tw-enter-translate-y: 0.5rem;
}
.data-\\[state\\=closed\\]\\:pr-slide-out-to-left-1\\/2[data-state=closed] {
  --tw-exit-translate-x: -50%;
}
.data-\\[state\\=closed\\]\\:pr-slide-out-to-top-\\[48\\%\\][data-state=closed] {
  --tw-exit-translate-y: -48%;
}
.data-\\[state\\=open\\]\\:pr-slide-in-from-left-1\\/2[data-state=open] {
  --tw-enter-translate-x: -50%;
}
.data-\\[state\\=open\\]\\:pr-slide-in-from-top-\\[48\\%\\][data-state=open] {
  --tw-enter-translate-y: -48%;
}
@media (min-width: 640px) {

  .sm\\:pr-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .sm\\:pr-static {
    position: static;
  }

  .sm\\:pr-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .sm\\:pr-flex {
    display: flex;
  }

  .sm\\:pr-table-cell {
    display: table-cell;
  }

  .sm\\:pr-hidden {
    display: none;
  }

  .sm\\:pr-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sm\\:pr-flex-row {
    flex-direction: row;
  }

  .sm\\:pr-justify-end {
    justify-content: flex-end;
  }

  .sm\\:pr-gap-4 {
    gap: 1rem;
  }

  .sm\\:pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:pr-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:pr-border-0 {
    border-width: 0px;
  }

  .sm\\:pr-bg-transparent {
    background-color: transparent;
  }

  .sm\\:pr-px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .sm\\:pr-py-0 {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .sm\\:pr-py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .sm\\:pr-py-5 {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .sm\\:pr-pl-14 {
    padding-left: 3.5rem;
  }

  .sm\\:pr-text-left {
    text-align: left;
  }
}
@media (min-width: 768px) {

  .md\\:pr-inline {
    display: inline;
  }

  .md\\:pr-flex {
    display: flex;
  }

  .md\\:pr-table-cell {
    display: table-cell;
  }

  .md\\:pr-h-8 {
    height: 2rem;
  }

  .md\\:pr-w-8 {
    width: 2rem;
  }

  .md\\:pr-w-\\[200px\\] {
    width: 200px;
  }

  .md\\:pr-grow-0 {
    flex-grow: 0;
  }

  .md\\:pr-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .md\\:pr-gap-8 {
    gap: 2rem;
  }

  .md\\:pr-text-base {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}
@media (min-width: 1024px) {

  .lg\\:pr-sr-only {
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

  .lg\\:pr-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .lg\\:pr-flex {
    display: flex;
  }

  .lg\\:pr-w-\\[336px\\] {
    width: 336px;
  }

  .lg\\:pr-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\\:pr-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lg\\:pr-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }
}
@media (min-width: 1280px) {

  .xl\\:pr-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .xl\\:pr-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .xl\\:pr-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .xl\\:pr-whitespace-nowrap {
    white-space: nowrap;
  }
}
@media (prefers-color-scheme: dark) {

  .dark\\:pr--rotate-90 {
    --tw-rotate: -90deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:pr-rotate-0 {
    --tw-rotate: 0deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:pr-scale-0 {
    --tw-scale-x: 0;
    --tw-scale-y: 0;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:pr-scale-100 {
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:pr-border-destructive {
    border-color: hsl(var(--destructive));
  }
}
.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-pr-0:has([role=checkbox]) {
  padding-right: 0px;
}
.\\[\\&\\>span\\]\\:pr-line-clamp-1>span {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.\\[\\&\\>svg\\+div\\]\\:pr-translate-y-\\[-3px\\]>svg+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&\\>svg\\]\\:pr-absolute>svg {
  position: absolute;
}
.\\[\\&\\>svg\\]\\:pr-left-4>svg {
  left: 1rem;
}
.\\[\\&\\>svg\\]\\:pr-top-4>svg {
  top: 1rem;
}
.\\[\\&\\>svg\\]\\:pr-text-destructive>svg {
  color: hsl(var(--destructive));
}
.\\[\\&\\>svg\\]\\:pr-text-foreground>svg {
  color: hsl(var(--foreground));
}
.\\[\\&\\>svg\\~\\*\\]\\:pr-pl-7>svg~* {
  padding-left: 1.75rem;
}
.\\[\\&\\>tr\\]\\:last\\:pr-border-b-0:last-child>tr {
  border-bottom-width: 0px;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-px-2 [cmdk-group-heading] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-py-1\\.5 [cmdk-group-heading] {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-text-xs [cmdk-group-heading] {
  font-size: 0.75rem;
  line-height: 1rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-font-medium [cmdk-group-heading] {
  font-weight: 500;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-text-muted-foreground [cmdk-group-heading] {
  color: hsl(var(--muted-foreground));
}
.\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:pr-pt-0 [cmdk-group]:not([hidden]) ~[cmdk-group] {
  padding-top: 0px;
}
.\\[\\&_\\[cmdk-group\\]\\]\\:pr-px-2 [cmdk-group] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:pr-h-5 [cmdk-input-wrapper] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:pr-w-5 [cmdk-input-wrapper] svg {
  width: 1.25rem;
}
.\\[\\&_\\[cmdk-input\\]\\]\\:pr-h-12 [cmdk-input] {
  height: 3rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:pr-px-2 [cmdk-item] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:pr-py-3 [cmdk-item] {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:pr-h-5 [cmdk-item] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:pr-w-5 [cmdk-item] svg {
  width: 1.25rem;
}
.\\[\\&_p\\]\\:pr-leading-relaxed p {
  line-height: 1.625;
}
.\\[\\&_tr\\:last-child\\]\\:pr-border-0 tr:last-child {
  border-width: 0px;
}
.\\[\\&_tr\\]\\:pr-border-b tr {
  border-bottom-width: 1px;
}
.papi-icon-button {
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
}

.papi-icon-button.primary {
  background-color: #1ea7fd;
  color: white;
}

.papi-icon-button.secondary {
  background-color: transparent;
  color: #333;
}

.papi-icon-button.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-icon-button.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-slider {
  background-color: transparent;
  color: #1ea7fd;
}

.papi-slider.vertical {
  min-height: 200px;
}

.papi-slider.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-slider.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
}
.papi-checkbox {
  background-color: transparent;
}

.papi-checkbox.error {
  color: #f00;
}

.papi-checkbox.error:hover {
  background-color: rgba(255, 0, 0, 0.2);
}

.papi-checkbox.paratext {
  color: greenyellow;
}

.papi-checkbox-label.paratext {
  color: darkgreen;
}

.papi-checkbox.paratext:hover {
  background-color: rgba(0, 100, 0, 0.3);
}

.papi-checkbox.paratext.bright {
  color: darkgreen;
}

.papi-checkbox-label.paratext.bright {
  background-color: greenyellow;
}

.papi-checkbox.paratext.bright:hover {
  background-color: rgba(173, 255, 47, 0.3);
}

.papi-checkbox.below,
.papi-checkbox.above {
  text-align: center;
}
.papi-switch {
  background-color: transparent;
}

.papi-switch.primary {
  background-color: #1ea7fd;
}

.papi-switch.secondary {
  background-color: #6fc8ff;
}

.papi-switch.error {
  background-color: #f00;
}

.papi-switch.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-switch.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-menu-item {
  background-color: transparent;
}

.papi-menu-icon-trailing {
  margin-left: 10px;
  place-content: flex-end;
}

.papi-menu-item img {
  max-width: 24px;
  max-height: 24px;
}
.papi-context-menu-target {
  white-space: nowrap;
  cursor: context-menu;
}

.papi-context-menu-target * {
  white-space: normal;
}

.papi-context-menu-target:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.07); /* Faint shadowy background */
}

.papi-context-menu-target.paratext:hover {
  box-shadow: 0 0 10px rgba(0, 100, 0, 0.07); /* Faint shadowy background */
}

.papi-context-menu-target.paratext.bright:hover {
  box-shadow: 0 0 10px rgba(173, 255, 47, 0.07); /* Faint shadowy background */
}

.papi-context-menu.paratext ul {
  background-color: rgb(76, 106, 76);
  color: rgb(214, 255, 152);
}

.papi-context-menu.paratext.bright ul {
  color: rgb(76, 106, 76);
  background-color: rgb(214, 255, 152);
}
.papi-multi-column-menu {
  background-color: rgb(222, 222, 222);
  display: flex;
  flex-direction: column;
  padding-left: 3px;
  padding-right: 3px;
}

.papi-menu-column {
  font-size: 11pt;
  font-weight: 600;
  padding-bottom: 2px;
}

.papi-menu-column ul {
  padding-top: 0;
}

.papi-menu-column-header {
  background-color: rgb(181, 181, 181);
  padding-left: 24px;
  margin-top: 0;
  margin-bottom: 0;
}

.papi-multi-column-menu.paratext {
  background-color: rgb(76, 106, 76);
  color: rgb(214, 255, 152);
}

.papi-multi-column-menu.paratext.bright {
  color: rgb(76, 106, 76);
  background-color: rgb(214, 255, 152);
}
.papi-snackbar {
  font-family: Arial, Helvetica, sans-serif;
}

.papi-snackbar.primary {
  background: #1ea7fd;
  color: white;
}

.papi-snackbar.external {
  background-color: lightsteelblue;
  border-color: white;
  border-style: dotted;
  padding: 2%;
  width: 30%;
}

.papi-snackbar.secondary {
  background: transparent;
  color: #333;
}

.papi-snackbar.alert {
  background: lightcoral;
}

.papi-snackbar.paratext {
  background: darkgreen;
  color: greenyellow;
}

.papi-snackbar.bright {
  background: greenyellow;
  color: darkgreen;
}
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state="selected"]:hover {
  cursor: default;
}
.papi-toolbar {
  background-color: #eee;
  color: black;
}

.papi-toolbar.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-toolbar.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}

.papi-menu-drawer-paper {
  height: fit-content !important;
  position: absolute !important;
}

.papi-toolbar-children {
  padding: 10px;
  position: relative;
}
`,"top");
//# sourceMappingURL=index.cjs.map
