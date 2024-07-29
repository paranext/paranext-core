"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const p=require("react/jsx-runtime"),T=require("react"),de=require("lucide-react"),Se=require("clsx"),Zl=require("tailwind-merge"),ys=require("@radix-ui/react-dropdown-menu"),Je=require("platform-bible-utils"),Ce=require("@tanstack/react-table"),Ql=require("@radix-ui/react-slot"),yo=require("class-variance-authority"),ec=require("@radix-ui/react-select"),ke=require("@mui/material"),tc=require("@radix-ui/react-popover"),Ie=require("cmdk"),nc=require("@radix-ui/react-dialog"),no=require("@mui/styled-engine"),xn=require("react-dom"),rc=require("@radix-ui/react-label"),oc=require("@radix-ui/react-tabs"),ac=require("@radix-ui/react-slider"),sc=require("@radix-ui/react-switch");function nt(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const N=nt(T),he=nt(ys),ye=nt(ec),jn=nt(tc),Qe=nt(nc),ic=nt(xn),ws=nt(rc),Ae=nt(oc),kn=nt(ac),ro=nt(sc);const lc=Zl.extendTailwindMerge({prefix:"pr-"});function V(...e){return lc(Se.clsx(e))}const Ln=T.forwardRef(({className:e,type:t,...n},r)=>p.jsx("input",{type:t,className:V("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));Ln.displayName="Input";const cc=T.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},a)=>p.jsxs("div",{className:"pr-relative",children:[p.jsx(Ln,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r(),t(s)},onClick:n,ref:a}),p.jsx(de.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));var pc=Object.defineProperty,uc=(e,t,n)=>t in e?pc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t,n)=>uc(e,typeof t!="symbol"?t+"":t,n);const Mt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],wo=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],xs=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],fa=xc();function an(e,t=!0){return t&&(e=e.toUpperCase()),e in fa?fa[e]:0}function xo(e){return an(e)>0}function dc(e){const t=typeof e=="string"?an(e):e;return t>=40&&t<=66}function fc(e){return(typeof e=="string"?an(e):e)<=39}function ks(e){return e<=66}function mc(e){const t=typeof e=="string"?an(e):e;return Ns(t)&&!ks(t)}function*hc(){for(let e=1;e<=Mt.length;e++)yield e}const gc=1,Es=Mt.length;function bc(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function ko(e,t="***"){const n=e-1;return n<0||n>=Mt.length?t:Mt[n]}function Ts(e){return e<=0||e>Es?"******":xs[e-1]}function vc(e){return Ts(an(e))}function Ns(e){const t=typeof e=="number"?ko(e):e;return xo(t)&&!wo.includes(t)}function yc(e){const t=typeof e=="number"?ko(e):e;return xo(t)&&wo.includes(t)}function wc(e){return xs[e-1].includes("*obsolete*")}function xc(){const e={};for(let t=0;t<Mt.length;t++)e[Mt[t]]=t+1;return e}const fe={allBookIds:Mt,nonCanonicalIds:wo,bookIdToNumber:an,isBookIdValid:xo,isBookNT:dc,isBookOT:fc,isBookOTNT:ks,isBookDC:mc,allBookNumbers:hc,firstBook:gc,lastBook:Es,extraBooks:bc,bookNumberToId:ko,bookNumberToEnglishName:Ts,bookIdToEnglishName:vc,isCanonical:Ns,isExtraMaterial:yc,isObsolete:wc};var Ke=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ke||{});const Le=class{constructor(t){if(re(this,"name"),re(this,"fullPath"),re(this,"isPresent"),re(this,"hasVerseSegments"),re(this,"isCustomized"),re(this,"baseVersification"),re(this,"scriptureBooks"),re(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Ke[t]):(this._type=t,this.name=Ke[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};re(Le,"Original",new Le(Ke.Original)),re(Le,"Septuagint",new Le(Ke.Septuagint)),re(Le,"Vulgate",new Le(Ke.Vulgate)),re(Le,"English",new Le(Ke.English)),re(Le,"RussianProtestant",new Le(Ke.RussianProtestant)),re(Le,"RussianOrthodox",new Le(Ke.RussianOrthodox));let St=Le;function ma(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var Ss=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Ss||{});const $e=class ie{constructor(t,n,r,o){if(re(this,"firstChapter"),re(this,"lastChapter"),re(this,"lastVerse"),re(this,"hasSegmentsDefined"),re(this,"text"),re(this,"BBBCCCVVVS"),re(this,"longHashCode"),re(this,"versification"),re(this,"rtlMark","‏"),re(this,"_bookNum",0),re(this,"_chapterNum",0),re(this,"_verseNum",0),re(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const a=t,s=n!=null&&n instanceof St?n:void 0;this.setEmpty(s),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=n!=null&&n instanceof St?n:void 0;this.setEmpty(a),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ie){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof St?t:ie.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new ie(t),{success:!0,verseRef:n}}catch(r){if(r instanceof mn)return n=new ie,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ie.bcvMaxValue*ie.bookDigitShifter+(n>=0?n%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(r>=0?r%ie.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:a,versificationStr:s}=t,l=a||o.toString();let c;return s&&(c=new St(s)),n?new ie(n,r.toString(),l,c):new ie}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>ie.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return fe.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=fe.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ie.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>fe.lastBook)throw new mn("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new St(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const s=+a[1].trim();this.versification=new St(Ke[s])}catch{throw new mn("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new mn("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||fe.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(r[1]))throw new mn("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete n.verse,n}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=ie.verseRangeSeparators,r=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=ma(this._verse,r);for(const s of a.map(l=>ma(l,n))){const l=this.clone();l.verse=s[0];const c=l.verseNum;if(o.push(l),s.length>1){const f=this.clone();if(f.verse=s[1],!t)for(let m=c+1;m<f.verseNum;m++){const v=new ie(this._bookNum,this._chapterNum,m,this.versification);this.isExcluded||o.push(v)}o.push(f)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const a=o.internalValid;if(a!==0)return a;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>fe.lastBook?2:(fe.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=fe.bookIdToNumber(t),this.chapter=n,this.verse=r}};re($e,"defaultVersification",St.English),re($e,"verseRangeSeparator","-"),re($e,"verseSequenceIndicator",","),re($e,"verseRangeSeparators",[$e.verseRangeSeparator]),re($e,"verseSequenceIndicators",[$e.verseSequenceIndicator]),re($e,"chapterDigitShifter",1e3),re($e,"bookDigitShifter",$e.chapterDigitShifter*$e.chapterDigitShifter),re($e,"bcvMaxValue",$e.chapterDigitShifter-1),re($e,"ValidStatusType",Ss);let mn=class extends Error{};const wr=he.Root,Eo=he.Trigger,Cs=he.Group,kc=he.Portal,Ec=he.Sub,Tc=he.RadioGroup,Os=T.forwardRef(({className:e,inset:t,children:n,...r},o)=>p.jsxs(he.SubTrigger,{ref:o,className:V("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,p.jsx(de.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Os.displayName=he.SubTrigger.displayName;const Rs=T.forwardRef(({className:e,...t},n)=>p.jsx(he.SubContent,{ref:n,className:V("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));Rs.displayName=he.SubContent.displayName;const Vn=T.forwardRef(({className:e,sideOffset:t=4,...n},r)=>p.jsx(he.Portal,{children:p.jsx(he.Content,{ref:r,sideOffset:t,className:V("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));Vn.displayName=he.Content.displayName;const To=T.forwardRef(({className:e,inset:t,...n},r)=>p.jsx(he.Item,{ref:r,className:V("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));To.displayName=he.Item.displayName;const xr=T.forwardRef(({className:e,children:t,checked:n,...r},o)=>p.jsxs(he.CheckboxItem,{ref:o,className:V("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[p.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:p.jsx(he.ItemIndicator,{children:p.jsx(de.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));xr.displayName=he.CheckboxItem.displayName;const No=T.forwardRef(({className:e,children:t,...n},r)=>p.jsxs(he.RadioItem,{ref:r,className:V("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[p.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:p.jsx(he.ItemIndicator,{children:p.jsx(de.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));No.displayName=he.RadioItem.displayName;const sn=T.forwardRef(({className:e,inset:t,...n},r)=>p.jsx(he.Label,{ref:r,className:V("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));sn.displayName=he.Label.displayName;const Fn=T.forwardRef(({className:e,...t},n)=>p.jsx(he.Separator,{ref:n,className:V("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Fn.displayName=he.Separator.displayName;function Ps({className:e,...t}){return p.jsx("span",{className:V("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Ps.displayName="DropdownMenuShortcut";const Nc=T.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:a,children:s},l)=>p.jsxs(To,{ref:l,textValue:e,className:V("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[p.jsx("span",{className:V("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":a.toLowerCase()==="ot","pr-border-l-purple-200":a.toLowerCase()==="nt","pr-border-l-indigo-200":a.toLowerCase()==="dc"}),children:fe.bookIdToEnglishName(e)}),n&&p.jsx("div",{children:s})]},e));function Sc({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const a=Array.from({length:t},(l,c)=>c+1),s=T.useCallback(l=>{o(l)},[o]);return p.jsx("div",{className:V("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:a.map(l=>p.jsx("div",{className:V("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===n,"pr-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>s(l),children:l},l))})}function Cc({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return p.jsxs(sn,{className:"pr-flex pr-justify-between",children:[p.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),p.jsxs("div",{className:"pr-flex pr-items-center",children:[p.jsx(de.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),p.jsx(de.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),p.jsx(de.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const Sn=fe.allBookIds,Oc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ha=["OT","NT","DC"],Rc=32+32+32,Pc=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],jc=e=>({OT:Sn.filter(n=>fe.isBookOT(n)),NT:Sn.filter(n=>fe.isBookNT(n)),DC:Sn.filter(n=>fe.isBookDC(n))})[e],hn=e=>Je.getChaptersForBook(fe.bookIdToNumber(e));function $c(){return Sn.map(t=>fe.bookIdToEnglishName(t))}function _c(e){return $c().includes(e)}function Mc(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(_c(t))return Sn.find(r=>fe.bookIdToEnglishName(r)===t)}function Ic({scrRef:e,handleSubmit:t}){const[n,r]=T.useState(""),[o,a]=T.useState(fe.bookNumberToId(e.bookNum)),[s,l]=T.useState(e.chapterNum??0),[c,f]=T.useState(fe.bookNumberToId(e.bookNum)),[m,v]=T.useState(!1),[g,u]=T.useState(m),h=T.useRef(void 0),d=T.useRef(void 0),b=T.useRef(void 0),x=T.useCallback(E=>jc(E).filter(P=>{const $=fe.bookIdToEnglishName(P).toLowerCase(),F=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return $.includes(F)||P.toLowerCase().includes(F)}),[n]),R=E=>{r(E)},w=T.useRef(!1),k=T.useCallback(E=>{if(w.current){w.current=!1;return}v(E)},[]),y=T.useCallback((E,P,$,F)=>{if(l(fe.bookNumberToId(e.bookNum)!==E?1:e.chapterNum),P||hn(E)===-1){t({bookNum:fe.bookIdToNumber(E),chapterNum:$||1,verseNum:F||1}),v(!1),r("");return}a(o!==E?E:""),v(!P)},[t,e.bookNum,e.chapterNum,o]),S=E=>{E<=0||E>hn(o)||y(o,!0,E)},O=T.useCallback(()=>{Pc.forEach(E=>{const P=n.match(E);if(P){const[$,F=void 0,H=void 0]=P.slice(1),_=Mc($);(fe.isBookIdValid($)||_)&&y(_??$,!0,F?parseInt(F,10):1,H?parseInt(H,10):1)}})},[y,n]),M=T.useCallback(E=>{m?(E.key==="ArrowDown"||E.key==="ArrowUp")&&(typeof b<"u"&&b.current!==null?b.current.focus():typeof d<"u"&&d.current!==null&&d.current.focus(),E.preventDefault()):v(!0)},[m]),D=E=>{const{key:P}=E;P==="ArrowRight"||P==="ArrowLeft"||P==="ArrowDown"||P==="ArrowUp"||P==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:P})),h.current.focus())},L=E=>{const{key:P}=E;if(c===o){if(P==="Enter"){E.preventDefault(),y(o,!0,s);return}let $=0;if(P==="ArrowRight")if(s<hn(c))$=1;else{E.preventDefault();return}else if(P==="ArrowLeft")if(s>1)$=-1;else{E.preventDefault();return}else P==="ArrowDown"?$=6:P==="ArrowUp"&&($=-6);s+$<=0||s+$>hn(c)?l(0):$!==0&&(l(s+$),E.preventDefault())}};return T.useEffect(()=>{o===c?o===fe.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),T.useLayoutEffect(()=>{u(m)},[m]),T.useLayoutEffect(()=>{const E=setTimeout(()=>{if(g&&d.current&&b.current){const $=b.current.offsetTop-Rc;d.current.scrollTo({top:$,behavior:"instant"})}},10);return()=>{clearTimeout(E)}},[g]),p.jsx("div",{className:"pr-flex",children:p.jsxs(wr,{modal:!1,open:m,onOpenChange:k,children:[p.jsx(Eo,{asChild:!0,children:p.jsx(cc,{ref:h,value:n,handleSearch:R,handleKeyDown:M,handleOnClick:()=>{a(fe.bookNumberToId(e.bookNum)),f(fe.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),v(!0),h.current.focus()},onFocus:()=>{w.current=!0},handleSubmit:O,placeholder:`${fe.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),p.jsxs(Vn,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:D,align:"start",ref:d,children:[p.jsx(Cc,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),ha.map((E,P)=>x(E).length>0&&p.jsxs("div",{children:[p.jsx(sn,{className:"pr-font-semibold pr-text-slate-700",children:Oc[E]}),x(E).map($=>p.jsx("div",{children:p.jsx(Nc,{bookId:$,handleSelectBook:()=>y($,!1),isSelected:o===$,handleHighlightBook:()=>f($),handleKeyDown:L,bookType:E,ref:F=>{o===$&&(b.current=F)},children:p.jsx(Sc,{handleSelectChapter:S,endChapter:hn($),activeChapter:e.bookNum===fe.bookIdToNumber($)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:F=>{l(F)}})})},$)),ha.length-1!==P?p.jsx(Fn,{}):void 0]},E))]})]})})}const js=yo.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),Ne=T.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},a)=>{const s=r?Ql.Slot:"button";return p.jsx(s,{className:V(js({variant:t,size:n,className:e})),ref:a,...o})});Ne.displayName="Button";function Ac({table:e}){return p.jsxs(wr,{children:[p.jsx(ys.DropdownMenuTrigger,{asChild:!0,children:p.jsxs(Ne,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[p.jsx(de.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),p.jsxs(Vn,{align:"end",className:"pr-w-[150px]",children:[p.jsx(sn,{children:"Toggle columns"}),p.jsx(Fn,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>p.jsx(xr,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}const $n=ye.Root,$s=ye.Group,_n=ye.Value,Kt=T.forwardRef(({className:e,children:t,...n},r)=>p.jsxs(ye.Trigger,{ref:r,className:V("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...n,children:[t,p.jsx(ye.Icon,{asChild:!0,children:p.jsx(de.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));Kt.displayName=ye.Trigger.displayName;const So=T.forwardRef(({className:e,...t},n)=>p.jsx(ye.ScrollUpButton,{ref:n,className:V("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:p.jsx(de.ChevronUp,{className:"pr-h-4 pr-w-4"})}));So.displayName=ye.ScrollUpButton.displayName;const Co=T.forwardRef(({className:e,...t},n)=>p.jsx(ye.ScrollDownButton,{ref:n,className:V("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:p.jsx(de.ChevronDown,{className:"pr-h-4 pr-w-4"})}));Co.displayName=ye.ScrollDownButton.displayName;const Jt=T.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>p.jsx(ye.Portal,{children:p.jsxs(ye.Content,{ref:o,className:V("pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:n,...r,children:[p.jsx(So,{}),p.jsx(ye.Viewport,{className:V("pr-p-1",n==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),p.jsx(Co,{})]})}));Jt.displayName=ye.Content.displayName;const _s=T.forwardRef(({className:e,...t},n)=>p.jsx(ye.Label,{ref:n,className:V("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));_s.displayName=ye.Label.displayName;const Ye=T.forwardRef(({className:e,children:t,...n},r)=>p.jsxs(ye.Item,{ref:r,className:V("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[p.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:p.jsx(ye.ItemIndicator,{children:p.jsx(de.Check,{className:"pr-h-4 pr-w-4"})})}),p.jsx(ye.ItemText,{children:t})]}));Ye.displayName=ye.Item.displayName;const Ms=T.forwardRef(({className:e,...t},n)=>p.jsx(ye.Separator,{ref:n,className:V("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Ms.displayName=ye.Separator.displayName;function Dc({table:e}){return p.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:p.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[p.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),p.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[p.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),p.jsxs($n,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[p.jsx(Kt,{className:"pr-h-8 pr-w-[70px]",children:p.jsx(_n,{placeholder:e.getState().pagination.pageSize})}),p.jsx(Jt,{side:"top",children:[10,20,30,40,50].map(t=>p.jsx(Ye,{value:`${t}`,children:t},t))})]})]}),p.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),p.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[p.jsxs(Ne,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),p.jsx(de.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),p.jsxs(Ne,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),p.jsx(de.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),p.jsxs(Ne,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),p.jsx(de.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),p.jsxs(Ne,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),p.jsx(de.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}const zn=T.forwardRef(({className:e,stickyHeader:t,...n},r)=>p.jsx("div",{className:V("pr-relative pr-w-full",{"pr-overflow-auto":!t}),children:p.jsx("table",{ref:r,className:V("pr-w-full pr-caption-bottom pr-text-sm",e),...n})}));zn.displayName="Table";const Hn=T.forwardRef(({className:e,stickyHeader:t,...n},r)=>p.jsx("thead",{ref:r,className:V({"pr-sticky pr-top-0 pr-bg-white":t},"[&_tr]:pr-border-b",e),...n}));Hn.displayName="TableHeader";const Un=T.forwardRef(({className:e,...t},n)=>p.jsx("tbody",{ref:n,className:V("[&_tr:last-child]:pr-border-0",e),...t}));Un.displayName="TableBody";const Is=T.forwardRef(({className:e,...t},n)=>p.jsx("tfoot",{ref:n,className:V("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));Is.displayName="TableFooter";const lt=T.forwardRef(({className:e,...t},n)=>p.jsx("tr",{ref:n,className:V("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));lt.displayName="TableRow";const Zt=T.forwardRef(({className:e,...t},n)=>p.jsx("th",{ref:n,className:V("pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",e),...t}));Zt.displayName="TableHead";const It=T.forwardRef(({className:e,...t},n)=>p.jsx("td",{ref:n,className:V("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0",e),...t}));It.displayName="TableCell";const As=T.forwardRef(({className:e,...t},n)=>p.jsx("caption",{ref:n,className:V("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));As.displayName="TableCaption";function Ds({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,stickyHeader:a=!1,onRowClickHandler:s=()=>{}}){var b;const[l,c]=T.useState([]),[f,m]=T.useState([]),[v,g]=T.useState({}),[u,h]=T.useState({}),d=Ce.useReactTable({data:t,columns:e,getCoreRowModel:Ce.getCoreRowModel(),...n&&{getPaginationRowModel:Ce.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:Ce.getSortedRowModel(),onColumnFiltersChange:m,getFilteredRowModel:Ce.getFilteredRowModel(),onColumnVisibilityChange:g,onRowSelectionChange:h,state:{sorting:l,columnFilters:f,columnVisibility:v,rowSelection:u}});return p.jsxs("div",{className:"pr-twp pr-font-sans",children:[o&&p.jsx(Ac,{table:d}),p.jsxs(zn,{stickyHeader:a,children:[p.jsx(Hn,{stickyHeader:a,children:d.getHeaderGroups().map(x=>p.jsx(lt,{children:x.headers.map(R=>p.jsx(Zt,{children:R.isPlaceholder?void 0:Ce.flexRender(R.column.columnDef.header,R.getContext())},R.id))},x.id))}),p.jsx(Un,{children:(b=d.getRowModel().rows)!=null&&b.length?d.getRowModel().rows.map(x=>p.jsx(lt,{onClick:()=>s(x,d),"data-state":x.getIsSelected()&&"selected",children:x.getVisibleCells().map(R=>p.jsx(It,{children:Ce.flexRender(R.column.columnDef.cell,R.getContext())},R.id))},x.id)):p.jsx(lt,{children:p.jsx(It,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]}),n&&p.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[p.jsx(Ne,{variant:"outline",size:"sm",onClick:()=>d.previousPage(),disabled:!d.getCanPreviousPage(),children:"Previous"}),p.jsx(Ne,{variant:"outline",size:"sm",onClick:()=>d.nextPage(),disabled:!d.getCanNextPage(),children:"Next"})]}),n&&r&&p.jsx(Dc,{table:d})]})}const ga=e=>{const t=/^\\[vc]\s+(\d+)/,n=e.match(t);return n?+n[1]:0},ba=(e,t,n,r)=>{if(!e||e===""||t==="")return[];const o=[],a=e.split(`
`);let s=r.chapterNum,l=r.verseNum,c=0;return a.forEach(f=>{f.startsWith("\\id")&&(s=0,l=0),f.startsWith("\\c")&&(s=ga(f),l=0),f.startsWith("\\v")&&(l=ga(f),s===0&&(s=r.chapterNum));const m=n(f,t);for(let v=0;v<m.length;v++){const g={reference:{...r,chapterNum:+s,verseNum:+l},snippet:f,key:c};c+=1,o.push(g)}}),o};function Bc({selectedItem:e,text:t,extractItems:n,scriptureReference:r,setScriptureReference:o,localizedStrings:a}){const s=a["%webView_inventory_occurrences_table_header_reference%"],l=a["%webView_inventory_occurrences_table_header_occurrence%"],[c,f]=T.useState(ba(t,e,n,r));return T.useEffect(()=>f(ba(t,e,n,r)),[t,e,r,n]),p.jsxs(zn,{stickyHeader:!0,children:[p.jsx(Hn,{stickyHeader:!0,children:p.jsxs(lt,{children:[p.jsx(Zt,{children:s}),p.jsx(Zt,{children:l})]})}),p.jsx(Un,{children:c.map(m=>p.jsxs(lt,{onClick:()=>{o(m.reference)},children:[p.jsx(It,{children:`${fe.bookNumberToEnglishName(m.reference.bookNum)} ${m.reference.chapterNum}:${m.reference.verseNum}`}),p.jsx(It,{children:m.snippet})]},m.key))})]})}const Lc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_book%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),Vc=e=>e==="asc"?p.jsx(de.ArrowUpIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):e==="desc"?p.jsx(de.ArrowDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):p.jsx(de.ArrowUpDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}),Fc=(e,t,n)=>{let r=e;return t!=="all"&&(r=r.filter(o=>t==="approved"&&o.status===!0||t==="unapproved"&&o.status===!1||t==="unknown"&&o.status===void 0)),n!==""&&(r=r.filter(o=>o.item.includes(n))),r},zc=(e,t,n)=>{const r=[],o=t(e);for(let a=0;a<o.length;a++){const s=o[a],l=r.find(c=>c.item===s);if(l)l.count+=1;else{const c={item:s,count:1,status:n(s)};r.push(c)}}return r},gt=(e,t)=>e[t]??t;function Hc({scriptureReference:e,setScriptureReference:t,localizedStrings:n,extractItems:r,approvedItems:o,onApprovedItemsChange:a,unapprovedItems:s,onUnapprovedItemsChange:l,text:c,scope:f,onScopeChange:m,columns:v}){const g=gt(n,"%webView_inventory_all%"),u=gt(n,"%webView_inventory_approved%"),h=gt(n,"%webView_inventory_unapproved%"),d=gt(n,"%webView_inventory_unknown%"),b=gt(n,"%webView_inventory_scope_book%"),x=gt(n,"%webView_inventory_scope_chapter%"),R=gt(n,"%webView_inventory_scope_verse%"),w=gt(n,"%webView_inventory_filter_text%"),[k,y]=T.useState([]),[S,O]=T.useState("all"),[M,D]=T.useState(""),[L,E]=T.useState(""),P=(_,z)=>{y(C=>{let A=[];return _.forEach(U=>{A=C.map(q=>q.item===U&&q.status!==z?{...q,status:z}:q)}),A});let Z=[...o];_.forEach(C=>{z===!0?Z.includes(C)||Z.push(C):Z=Z.filter(A=>A!==C)}),a(Z);let J=[...s];_.forEach(C=>{z===!1?J.includes(C)||J.push(C):J=J.filter(A=>A!==C)}),l(J)},$=T.useCallback(_=>{if(o.includes(_))return!0;if(s.includes(_))return!1},[o,s]);T.useEffect(()=>{c&&y(zc(c,r,$))},[r,e,c,$]);const F=T.useMemo(()=>Fc(k,S,M),[k,S,M]),H=(_,z)=>{z.toggleAllRowsSelected(!1),_.toggleSelected(void 0),E(_.getValue("item"))};return p.jsxs("div",{className:"pr-flex pr-h-full pr-flex-col",children:[p.jsxs("div",{className:"pr-flex",children:[p.jsxs($n,{onValueChange:_=>O(_),defaultValue:S,children:[p.jsx(Kt,{className:"pr-m-1",children:p.jsx(_n,{placeholder:"Select filter"})}),p.jsxs(Jt,{className:"pr-font-sans",children:[p.jsx(Ye,{value:"all",children:g}),p.jsx(Ye,{value:"approved",children:u}),p.jsx(Ye,{value:"unapproved",children:h}),p.jsx(Ye,{value:"unknown",children:d})]})]}),p.jsxs($n,{onValueChange:_=>m(_),defaultValue:f,children:[p.jsx(Kt,{className:"pr-m-1",children:p.jsx(_n,{placeholder:"Select scope"})}),p.jsxs(Jt,{className:"pr-font-sans",children:[p.jsx(Ye,{value:"book",children:b}),p.jsx(Ye,{value:"chapter",children:x}),p.jsx(Ye,{value:"verse",children:R})]})]}),p.jsx(Ln,{className:"pr-m-1 pr-rounded-md pr-border",placeholder:w,value:M,onChange:_=>{D(_.target.value)}})]}),p.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:p.jsx(Ds,{columns:v(P),data:F,onRowClickHandler:H,stickyHeader:!0})}),L!==""&&p.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:p.jsx(Bc,{selectedItem:L,text:c,extractItems:r,scriptureReference:e,setScriptureReference:_=>t(_),localizedStrings:n})})]})}const Uc=jn.Root,Gc=jn.Trigger,Bs=T.forwardRef(({className:e,align:t="center",sideOffset:n=4,...r},o)=>p.jsx(jn.Portal,{children:p.jsx(jn.Content,{ref:o,align:t,sideOffset:n,className:V("pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r})}));Bs.displayName=jn.Content.displayName;const qc=Qe.Portal,Ls=T.forwardRef(({className:e,...t},n)=>p.jsx(Qe.Overlay,{ref:n,className:V("pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",e),...t}));Ls.displayName=Qe.Overlay.displayName;const Wc=T.forwardRef(({className:e,children:t,...n},r)=>p.jsxs(qc,{children:[p.jsx(Ls,{}),p.jsxs(Qe.Content,{ref:r,className:V("pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",e),...n,children:[t,p.jsxs(Qe.Close,{className:"pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground",children:[p.jsx(de.X,{className:"pr-h-4 pr-w-4"}),p.jsx("span",{className:"pr-sr-only",children:"Close"})]})]})]}));Wc.displayName=Qe.Content.displayName;const Xc=T.forwardRef(({className:e,...t},n)=>p.jsx(Qe.Title,{ref:n,className:V("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight",e),...t}));Xc.displayName=Qe.Title.displayName;const Yc=T.forwardRef(({className:e,...t},n)=>p.jsx(Qe.Description,{ref:n,className:V("pr-text-sm pr-text-muted-foreground",e),...t}));Yc.displayName=Qe.Description.displayName;const Vs=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Command,{ref:n,className:V("pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",e),...t}));Vs.displayName=Ie.Command.displayName;const Fs=T.forwardRef(({className:e,...t},n)=>p.jsxs("div",{className:"pr-flex pr-items-center pr-border-b pr-px-3",children:[p.jsx(de.Search,{className:"pr-mr-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"}),p.jsx(Ie.Command.Input,{ref:n,className:V("pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...t})]}));Fs.displayName=Ie.Command.Input.displayName;const zs=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Command.List,{ref:n,className:V("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden",e),...t}));zs.displayName=Ie.Command.List.displayName;const Hs=T.forwardRef((e,t)=>p.jsx(Ie.Command.Empty,{ref:t,className:"pr-py-6 pr-text-center pr-text-sm",...e}));Hs.displayName=Ie.Command.Empty.displayName;const Kc=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Command.Group,{ref:n,className:V("pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",e),...t}));Kc.displayName=Ie.Command.Group.displayName;const Jc=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Command.Separator,{ref:n,className:V("pr--mx-1 pr-h-px pr-bg-border",e),...t}));Jc.displayName=Ie.Command.Separator.displayName;const Us=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Command.Item,{ref:n,className:V("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",e),...t}));Us.displayName=Ie.Command.Item.displayName;function Zc(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function oo({id:e,options:t=[],className:n,value:r,onChange:o=()=>{},getOptionLabel:a=Zc,buttonPlaceholder:s="",textPlaceholder:l="",commandEmptyMessage:c="No option found",buttonVariant:f="outline"}){const[m,v]=T.useState(!1);return p.jsxs(Uc,{open:m,onOpenChange:v,children:[p.jsx(Gc,{asChild:!0,children:p.jsxs(Ne,{variant:f,role:"combobox","aria-expanded":m,id:e,className:V("pr-w-[200px] pr-justify-between",n),children:[r?a(r):s,p.jsx(de.ChevronsUpDown,{className:"pr-ml-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"})]})}),p.jsx(Bs,{className:"pr-w-[200px] pr-p-0",children:p.jsxs(Vs,{children:[p.jsx(Fs,{placeholder:l,className:"pr-text-inherit"}),p.jsx(Hs,{children:c}),p.jsx(zs,{children:t.map(g=>p.jsxs(Us,{value:a(g),onSelect:()=>{o(g),v(!1)},children:[p.jsx(de.Check,{className:V("pr-mr-2 pr-h-4 pr-w-4",{"pr-opacity-0":!r||a(r)!==a(g)})}),a(g)]},a(g)))})]})})]})}function Qc({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,a]=T.useState(1),[s,l]=T.useState(r),[c,f]=T.useState(Array.from({length:r},(g,u)=>u+1));T.useEffect(()=>{a(1),e(1),l(r),t(r),f(Array.from({length:r},(g,u)=>u+1))},[r,t,e]);const m=g=>{a(g),e(g),g>s&&(l(g),t(g))},v=g=>{l(g),t(g),g<o&&(a(g),e(g))};return p.jsxs(p.Fragment,{children:[p.jsx(ke.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:p.jsx(oo,{onChange:m,className:"book-selection-chapter",options:c,getOptionLabel:g=>g.toString(),value:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),p.jsx(ke.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:p.jsx(oo,{onChange:v,className:"book-selection-chapter",options:c,getOptionLabel:g=>g.toString(),value:s},"end chapter"),label:"to",labelPlacement:"start"})]})}var Pt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Pt||{});function Gs({id:e,isChecked:t,labelText:n="",labelPosition:r=Pt.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:s=!1,hasError:l=!1,className:c,onChange:f}){const m=p.jsx(ke.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:a,disabled:s,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:f});let v;if(n){const g=r===Pt.Before||r===Pt.Above,u=p.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),h=r===Pt.Before||r===Pt.After,d=h?u:p.jsx("div",{children:u}),b=h?m:p.jsx("div",{children:m});v=p.jsxs(ke.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:l,children:[g&&d,b,!g&&d]})}else v=m;return v}function ep({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:a,createLabel:s}){return p.jsxs("fieldset",{id:e,className:t,children:[n&&p.jsx("legend",{children:n}),r.map(l=>p.jsx(Gs,{className:"check-item",isChecked:o.includes(l),labelText:s?s(l):l,onChange:()=>a(l)},l))]})}function tp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function np(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Oo={},qs={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(qs);var rp=qs.exports,Lr={};function ln(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function j(){return j=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},j.apply(this,arguments)}function jt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Ws(e){if(!jt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Ws(e[n])}),t}function ct(e,t,n={clone:!0}){const r=n.clone?j({},e):e;return jt(e)&&jt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(jt(t[o])&&o in e&&jt(e[o])?r[o]=ct(e[o],t[o],n):n.clone?r[o]=jt(t[o])?Ws(t[o]):t[o]:r[o]=t[o])}),r}var ao={exports:{}},tr={exports:{}},le={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var va;function op(){if(va)return le;va=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,f=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,u=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,d=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,R=e?Symbol.for("react.scope"):60119;function w(y){if(typeof y=="object"&&y!==null){var S=y.$$typeof;switch(S){case t:switch(y=y.type,y){case c:case f:case r:case a:case o:case v:return y;default:switch(y=y&&y.$$typeof,y){case l:case m:case h:case u:case s:return y;default:return S}}case n:return S}}}function k(y){return w(y)===f}return le.AsyncMode=c,le.ConcurrentMode=f,le.ContextConsumer=l,le.ContextProvider=s,le.Element=t,le.ForwardRef=m,le.Fragment=r,le.Lazy=h,le.Memo=u,le.Portal=n,le.Profiler=a,le.StrictMode=o,le.Suspense=v,le.isAsyncMode=function(y){return k(y)||w(y)===c},le.isConcurrentMode=k,le.isContextConsumer=function(y){return w(y)===l},le.isContextProvider=function(y){return w(y)===s},le.isElement=function(y){return typeof y=="object"&&y!==null&&y.$$typeof===t},le.isForwardRef=function(y){return w(y)===m},le.isFragment=function(y){return w(y)===r},le.isLazy=function(y){return w(y)===h},le.isMemo=function(y){return w(y)===u},le.isPortal=function(y){return w(y)===n},le.isProfiler=function(y){return w(y)===a},le.isStrictMode=function(y){return w(y)===o},le.isSuspense=function(y){return w(y)===v},le.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===r||y===f||y===a||y===o||y===v||y===g||typeof y=="object"&&y!==null&&(y.$$typeof===h||y.$$typeof===u||y.$$typeof===s||y.$$typeof===l||y.$$typeof===m||y.$$typeof===b||y.$$typeof===x||y.$$typeof===R||y.$$typeof===d)},le.typeOf=w,le}var ce={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ya;function ap(){return ya||(ya=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,f=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,u=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,d=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,R=e?Symbol.for("react.scope"):60119;function w(B){return typeof B=="string"||typeof B=="function"||B===r||B===f||B===a||B===o||B===v||B===g||typeof B=="object"&&B!==null&&(B.$$typeof===h||B.$$typeof===u||B.$$typeof===s||B.$$typeof===l||B.$$typeof===m||B.$$typeof===b||B.$$typeof===x||B.$$typeof===R||B.$$typeof===d)}function k(B){if(typeof B=="object"&&B!==null){var te=B.$$typeof;switch(te){case t:var I=B.type;switch(I){case c:case f:case r:case a:case o:case v:return I;default:var se=I&&I.$$typeof;switch(se){case l:case m:case h:case u:case s:return se;default:return te}}case n:return te}}}var y=c,S=f,O=l,M=s,D=t,L=m,E=r,P=h,$=u,F=n,H=a,_=o,z=v,Z=!1;function J(B){return Z||(Z=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),C(B)||k(B)===c}function C(B){return k(B)===f}function A(B){return k(B)===l}function U(B){return k(B)===s}function q(B){return typeof B=="object"&&B!==null&&B.$$typeof===t}function G(B){return k(B)===m}function W(B){return k(B)===r}function Y(B){return k(B)===h}function K(B){return k(B)===u}function X(B){return k(B)===n}function Q(B){return k(B)===a}function ee(B){return k(B)===o}function ae(B){return k(B)===v}ce.AsyncMode=y,ce.ConcurrentMode=S,ce.ContextConsumer=O,ce.ContextProvider=M,ce.Element=D,ce.ForwardRef=L,ce.Fragment=E,ce.Lazy=P,ce.Memo=$,ce.Portal=F,ce.Profiler=H,ce.StrictMode=_,ce.Suspense=z,ce.isAsyncMode=J,ce.isConcurrentMode=C,ce.isContextConsumer=A,ce.isContextProvider=U,ce.isElement=q,ce.isForwardRef=G,ce.isFragment=W,ce.isLazy=Y,ce.isMemo=K,ce.isPortal=X,ce.isProfiler=Q,ce.isStrictMode=ee,ce.isSuspense=ae,ce.isValidElementType=w,ce.typeOf=k}()),ce}var wa;function Xs(){return wa||(wa=1,process.env.NODE_ENV==="production"?tr.exports=op():tr.exports=ap()),tr.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Vr,xa;function sp(){if(xa)return Vr;xa=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var s={},l=0;l<10;l++)s["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(s).map(function(m){return s[m]});if(c.join("")!=="0123456789")return!1;var f={};return"abcdefghijklmnopqrst".split("").forEach(function(m){f[m]=m}),Object.keys(Object.assign({},f)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Vr=o()?Object.assign:function(a,s){for(var l,c=r(a),f,m=1;m<arguments.length;m++){l=Object(arguments[m]);for(var v in l)t.call(l,v)&&(c[v]=l[v]);if(e){f=e(l);for(var g=0;g<f.length;g++)n.call(l,f[g])&&(c[f[g]]=l[f[g]])}}return c},Vr}var Fr,ka;function Ro(){if(ka)return Fr;ka=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Fr=e,Fr}var zr,Ea;function Ys(){return Ea||(Ea=1,zr=Function.call.bind(Object.prototype.hasOwnProperty)),zr}var Hr,Ta;function ip(){if(Ta)return Hr;Ta=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Ro(),n={},r=Ys();e=function(a){var s="Warning: "+a;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(a,s,l,c,f){if(process.env.NODE_ENV!=="production"){for(var m in a)if(r(a,m)){var v;try{if(typeof a[m]!="function"){var g=Error((c||"React class")+": "+l+" type `"+m+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[m]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw g.name="Invariant Violation",g}v=a[m](s,m,c,l,null,t)}catch(h){v=h}if(v&&!(v instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+m+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof v+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),v instanceof Error&&!(v.message in n)){n[v.message]=!0;var u=f?f():"";e("Failed "+l+" type: "+v.message+(u??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Hr=o,Hr}var Ur,Na;function lp(){if(Na)return Ur;Na=1;var e=Xs(),t=sp(),n=Ro(),r=Ys(),o=ip(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function s(){return null}return Ur=function(l,c){var f=typeof Symbol=="function"&&Symbol.iterator,m="@@iterator";function v(C){var A=C&&(f&&C[f]||C[m]);if(typeof A=="function")return A}var g="<<anonymous>>",u={array:x("array"),bigint:x("bigint"),bool:x("boolean"),func:x("function"),number:x("number"),object:x("object"),string:x("string"),symbol:x("symbol"),any:R(),arrayOf:w,element:k(),elementType:y(),instanceOf:S,node:L(),objectOf:M,oneOf:O,oneOfType:D,shape:P,exact:$};function h(C,A){return C===A?C!==0||1/C===1/A:C!==C&&A!==A}function d(C,A){this.message=C,this.data=A&&typeof A=="object"?A:{},this.stack=""}d.prototype=Error.prototype;function b(C){if(process.env.NODE_ENV!=="production")var A={},U=0;function q(W,Y,K,X,Q,ee,ae){if(X=X||g,ee=ee||K,ae!==n){if(c){var B=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw B.name="Invariant Violation",B}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var te=X+":"+K;!A[te]&&U<3&&(a("You are manually calling a React.PropTypes validation function for the `"+ee+"` prop on `"+X+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),A[te]=!0,U++)}}return Y[K]==null?W?Y[K]===null?new d("The "+Q+" `"+ee+"` is marked as required "+("in `"+X+"`, but its value is `null`.")):new d("The "+Q+" `"+ee+"` is marked as required in "+("`"+X+"`, but its value is `undefined`.")):null:C(Y,K,X,Q,ee)}var G=q.bind(null,!1);return G.isRequired=q.bind(null,!0),G}function x(C){function A(U,q,G,W,Y,K){var X=U[q],Q=_(X);if(Q!==C){var ee=z(X);return new d("Invalid "+W+" `"+Y+"` of type "+("`"+ee+"` supplied to `"+G+"`, expected ")+("`"+C+"`."),{expectedType:C})}return null}return b(A)}function R(){return b(s)}function w(C){function A(U,q,G,W,Y){if(typeof C!="function")return new d("Property `"+Y+"` of component `"+G+"` has invalid PropType notation inside arrayOf.");var K=U[q];if(!Array.isArray(K)){var X=_(K);return new d("Invalid "+W+" `"+Y+"` of type "+("`"+X+"` supplied to `"+G+"`, expected an array."))}for(var Q=0;Q<K.length;Q++){var ee=C(K,Q,G,W,Y+"["+Q+"]",n);if(ee instanceof Error)return ee}return null}return b(A)}function k(){function C(A,U,q,G,W){var Y=A[U];if(!l(Y)){var K=_(Y);return new d("Invalid "+G+" `"+W+"` of type "+("`"+K+"` supplied to `"+q+"`, expected a single ReactElement."))}return null}return b(C)}function y(){function C(A,U,q,G,W){var Y=A[U];if(!e.isValidElementType(Y)){var K=_(Y);return new d("Invalid "+G+" `"+W+"` of type "+("`"+K+"` supplied to `"+q+"`, expected a single ReactElement type."))}return null}return b(C)}function S(C){function A(U,q,G,W,Y){if(!(U[q]instanceof C)){var K=C.name||g,X=J(U[q]);return new d("Invalid "+W+" `"+Y+"` of type "+("`"+X+"` supplied to `"+G+"`, expected ")+("instance of `"+K+"`."))}return null}return b(A)}function O(C){if(!Array.isArray(C))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),s;function A(U,q,G,W,Y){for(var K=U[q],X=0;X<C.length;X++)if(h(K,C[X]))return null;var Q=JSON.stringify(C,function(ae,B){var te=z(B);return te==="symbol"?String(B):B});return new d("Invalid "+W+" `"+Y+"` of value `"+String(K)+"` "+("supplied to `"+G+"`, expected one of "+Q+"."))}return b(A)}function M(C){function A(U,q,G,W,Y){if(typeof C!="function")return new d("Property `"+Y+"` of component `"+G+"` has invalid PropType notation inside objectOf.");var K=U[q],X=_(K);if(X!=="object")return new d("Invalid "+W+" `"+Y+"` of type "+("`"+X+"` supplied to `"+G+"`, expected an object."));for(var Q in K)if(r(K,Q)){var ee=C(K,Q,G,W,Y+"."+Q,n);if(ee instanceof Error)return ee}return null}return b(A)}function D(C){if(!Array.isArray(C))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var A=0;A<C.length;A++){var U=C[A];if(typeof U!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+Z(U)+" at index "+A+"."),s}function q(G,W,Y,K,X){for(var Q=[],ee=0;ee<C.length;ee++){var ae=C[ee],B=ae(G,W,Y,K,X,n);if(B==null)return null;B.data&&r(B.data,"expectedType")&&Q.push(B.data.expectedType)}var te=Q.length>0?", expected one of type ["+Q.join(", ")+"]":"";return new d("Invalid "+K+" `"+X+"` supplied to "+("`"+Y+"`"+te+"."))}return b(q)}function L(){function C(A,U,q,G,W){return F(A[U])?null:new d("Invalid "+G+" `"+W+"` supplied to "+("`"+q+"`, expected a ReactNode."))}return b(C)}function E(C,A,U,q,G){return new d((C||"React class")+": "+A+" type `"+U+"."+q+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+G+"`.")}function P(C){function A(U,q,G,W,Y){var K=U[q],X=_(K);if(X!=="object")return new d("Invalid "+W+" `"+Y+"` of type `"+X+"` "+("supplied to `"+G+"`, expected `object`."));for(var Q in C){var ee=C[Q];if(typeof ee!="function")return E(G,W,Y,Q,z(ee));var ae=ee(K,Q,G,W,Y+"."+Q,n);if(ae)return ae}return null}return b(A)}function $(C){function A(U,q,G,W,Y){var K=U[q],X=_(K);if(X!=="object")return new d("Invalid "+W+" `"+Y+"` of type `"+X+"` "+("supplied to `"+G+"`, expected `object`."));var Q=t({},U[q],C);for(var ee in Q){var ae=C[ee];if(r(C,ee)&&typeof ae!="function")return E(G,W,Y,ee,z(ae));if(!ae)return new d("Invalid "+W+" `"+Y+"` key `"+ee+"` supplied to `"+G+"`.\nBad object: "+JSON.stringify(U[q],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(C),null,"  "));var B=ae(K,ee,G,W,Y+"."+ee,n);if(B)return B}return null}return b(A)}function F(C){switch(typeof C){case"number":case"string":case"undefined":return!0;case"boolean":return!C;case"object":if(Array.isArray(C))return C.every(F);if(C===null||l(C))return!0;var A=v(C);if(A){var U=A.call(C),q;if(A!==C.entries){for(;!(q=U.next()).done;)if(!F(q.value))return!1}else for(;!(q=U.next()).done;){var G=q.value;if(G&&!F(G[1]))return!1}}else return!1;return!0;default:return!1}}function H(C,A){return C==="symbol"?!0:A?A["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&A instanceof Symbol:!1}function _(C){var A=typeof C;return Array.isArray(C)?"array":C instanceof RegExp?"object":H(A,C)?"symbol":A}function z(C){if(typeof C>"u"||C===null)return""+C;var A=_(C);if(A==="object"){if(C instanceof Date)return"date";if(C instanceof RegExp)return"regexp"}return A}function Z(C){var A=z(C);switch(A){case"array":case"object":return"an "+A;case"boolean":case"date":case"regexp":return"a "+A;default:return A}}function J(C){return!C.constructor||!C.constructor.name?g:C.constructor.name}return u.checkPropTypes=o,u.resetWarningCache=o.resetWarningCache,u.PropTypes=u,u},Ur}var Gr,Sa;function cp(){if(Sa)return Gr;Sa=1;var e=Ro();function t(){}function n(){}return n.resetWarningCache=t,Gr=function(){function r(s,l,c,f,m,v){if(v!==e){var g=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw g.name="Invariant Violation",g}}r.isRequired=r;function o(){return r}var a={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return a.PropTypes=a,a},Gr}if(process.env.NODE_ENV!=="production"){var pp=Xs(),up=!0;ao.exports=lp()(pp.isElement,up)}else ao.exports=cp()();var dp=ao.exports;const i=tp(dp);function fp(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ks(e,t,n,r,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let l;const c=a.type;return typeof c=="function"&&!fp(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Js=ln(i.element,Ks);Js.isRequired=ln(i.element.isRequired,Ks);const Gn=Js;function mp(e){const{prototype:t={}}=e;return!!t.isReactComponent}function hp(e,t,n,r,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let l;return typeof a=="function"&&!mp(a)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const gp=ln(i.elementType,hp),bp="exact-prop: ​";function Zs(e){return process.env.NODE_ENV==="production"?e:j({},e,{[bp]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Qt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var so={exports:{}},pe={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ca;function vp(){if(Ca)return pe;Ca=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),u=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function d(b){if(typeof b=="object"&&b!==null){var x=b.$$typeof;switch(x){case e:switch(b=b.type,b){case n:case o:case r:case f:case m:return b;default:switch(b=b&&b.$$typeof,b){case l:case s:case c:case g:case v:case a:return b;default:return x}}case t:return x}}}return pe.ContextConsumer=s,pe.ContextProvider=a,pe.Element=e,pe.ForwardRef=c,pe.Fragment=n,pe.Lazy=g,pe.Memo=v,pe.Portal=t,pe.Profiler=o,pe.StrictMode=r,pe.Suspense=f,pe.SuspenseList=m,pe.isAsyncMode=function(){return!1},pe.isConcurrentMode=function(){return!1},pe.isContextConsumer=function(b){return d(b)===s},pe.isContextProvider=function(b){return d(b)===a},pe.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===e},pe.isForwardRef=function(b){return d(b)===c},pe.isFragment=function(b){return d(b)===n},pe.isLazy=function(b){return d(b)===g},pe.isMemo=function(b){return d(b)===v},pe.isPortal=function(b){return d(b)===t},pe.isProfiler=function(b){return d(b)===o},pe.isStrictMode=function(b){return d(b)===r},pe.isSuspense=function(b){return d(b)===f},pe.isSuspenseList=function(b){return d(b)===m},pe.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===n||b===o||b===r||b===f||b===m||b===u||typeof b=="object"&&b!==null&&(b.$$typeof===g||b.$$typeof===v||b.$$typeof===a||b.$$typeof===s||b.$$typeof===c||b.$$typeof===h||b.getModuleId!==void 0)},pe.typeOf=d,pe}var ue={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Oa;function yp(){return Oa||(Oa=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),u=Symbol.for("react.offscreen"),h=!1,d=!1,b=!1,x=!1,R=!1,w;w=Symbol.for("react.module.reference");function k(I){return!!(typeof I=="string"||typeof I=="function"||I===n||I===o||R||I===r||I===f||I===m||x||I===u||h||d||b||typeof I=="object"&&I!==null&&(I.$$typeof===g||I.$$typeof===v||I.$$typeof===a||I.$$typeof===s||I.$$typeof===c||I.$$typeof===w||I.getModuleId!==void 0))}function y(I){if(typeof I=="object"&&I!==null){var se=I.$$typeof;switch(se){case e:var Ee=I.type;switch(Ee){case n:case o:case r:case f:case m:return Ee;default:var Pe=Ee&&Ee.$$typeof;switch(Pe){case l:case s:case c:case g:case v:case a:return Pe;default:return se}}case t:return se}}}var S=s,O=a,M=e,D=c,L=n,E=g,P=v,$=t,F=o,H=r,_=f,z=m,Z=!1,J=!1;function C(I){return Z||(Z=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function A(I){return J||(J=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function U(I){return y(I)===s}function q(I){return y(I)===a}function G(I){return typeof I=="object"&&I!==null&&I.$$typeof===e}function W(I){return y(I)===c}function Y(I){return y(I)===n}function K(I){return y(I)===g}function X(I){return y(I)===v}function Q(I){return y(I)===t}function ee(I){return y(I)===o}function ae(I){return y(I)===r}function B(I){return y(I)===f}function te(I){return y(I)===m}ue.ContextConsumer=S,ue.ContextProvider=O,ue.Element=M,ue.ForwardRef=D,ue.Fragment=L,ue.Lazy=E,ue.Memo=P,ue.Portal=$,ue.Profiler=F,ue.StrictMode=H,ue.Suspense=_,ue.SuspenseList=z,ue.isAsyncMode=C,ue.isConcurrentMode=A,ue.isContextConsumer=U,ue.isContextProvider=q,ue.isElement=G,ue.isForwardRef=W,ue.isFragment=Y,ue.isLazy=K,ue.isMemo=X,ue.isPortal=Q,ue.isProfiler=ee,ue.isStrictMode=ae,ue.isSuspense=B,ue.isSuspenseList=te,ue.isValidElementType=k,ue.typeOf=y}()),ue}process.env.NODE_ENV==="production"?so.exports=vp():so.exports=yp();var ur=so.exports;const wp=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function xp(e){const t=`${e}`.match(wp);return t&&t[1]||""}function Qs(e,t=""){return e.displayName||e.name||xp(e)||t}function Ra(e,t,n){const r=Qs(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function kp(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Qs(e,"Component");if(typeof e=="object")switch(e.$$typeof){case ur.ForwardRef:return Ra(e,e.render,"ForwardRef");case ur.Memo:return Ra(e,e.type,"memo");default:return}}}function pt(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=e[t],s=o||t;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Ep=i.oneOfType([i.func,i.object]),Po=Ep;function et(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Qt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function io(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function ei(e,t=166){let n;function r(...o){const a=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(a,t)}return r.clear=()=>{clearTimeout(n)},r}function Tp(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,a,s)=>{const l=o||"<<anonymous>>",c=s||r;return typeof n[r]<"u"?new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function Np(e,t){var n,r;return N.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Oe(e){return e&&e.ownerDocument||document}function en(e){return Oe(e).defaultView||window}function Sp(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?j({},t.propTypes):null;return o=>(a,s,l,c,f,...m)=>{const v=f||s,g=n==null?void 0:n[v];if(g){const u=g(a,s,l,c,f,...m);if(u)return u}return typeof a[s]<"u"&&!a[o]?new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function dr(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Cp=typeof window<"u"?N.useLayoutEffect:N.useEffect,At=Cp;let Pa=0;function Op(e){const[t,n]=N.useState(e),r=e||t;return N.useEffect(()=>{t==null&&(Pa+=1,n(`mui-${Pa}`))},[t]),r}const ja=N["useId".toString()];function ti(e){if(ja!==void 0){const t=ja();return e??t}return Op(e)}function Rp(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=o||t;return typeof e[t]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function ni({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=N.useRef(e!==void 0),[a,s]=N.useState(t),l=o?e:a;if(process.env.NODE_ENV!=="production"){N.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:f}=N.useRef(t);N.useEffect(()=>{!o&&f!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=N.useCallback(f=>{o||s(f)},[]);return[l,c]}function Mn(e){const t=N.useRef(e);return At(()=>{t.current=e}),N.useRef((...n)=>(0,t.current)(...n)).current}function Ge(...e){return N.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{dr(n,t)})},e)}const $a={};function Pp(e,t){const n=N.useRef($a);return n.current===$a&&(n.current=e(t)),n}const jp=[];function $p(e){N.useEffect(e,jp)}class qn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new qn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function En(){const e=Pp(qn.create).current;return $p(e.disposeEffect),e}let kr=!0,lo=!1;const _p=new qn,Mp={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Ip(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Mp[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Ap(e){e.metaKey||e.altKey||e.ctrlKey||(kr=!0)}function qr(){kr=!1}function Dp(){this.visibilityState==="hidden"&&lo&&(kr=!0)}function Bp(e){e.addEventListener("keydown",Ap,!0),e.addEventListener("mousedown",qr,!0),e.addEventListener("pointerdown",qr,!0),e.addEventListener("touchstart",qr,!0),e.addEventListener("visibilitychange",Dp,!0)}function Lp(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return kr||Ip(t)}function ri(){const e=N.useCallback(o=>{o!=null&&Bp(o.ownerDocument)},[]),t=N.useRef(!1);function n(){return t.current?(lo=!0,_p.start(100,()=>{lo=!1}),t.current=!1,!0):!1}function r(o){return Lp(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function oi(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Vp(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function Fp(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const zp=Number.isInteger||Fp;function ai(e,t,n,r){const o=e[t];if(o==null||!zp(o)){const a=Vp(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function si(e,t,...n){return e[t]===void 0?null:ai(e,t,...n)}function co(){return null}si.isRequired=ai;co.isRequired=co;const ii=process.env.NODE_ENV==="production"?co:si;function li(e,t){const n=j({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=j({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},a=t[r];n[r]={},!a||!Object.keys(a)?n[r]=o:!o||!Object.keys(o)?n[r]=a:(n[r]=j({},a),Object.keys(o).forEach(s=>{n[r][s]=li(o[s],a[s])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function ft(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((a,s)=>{if(s){const l=t(s);l!==""&&a.push(l),n&&n[s]&&a.push(n[s])}return a},[]).join(" ")}),r}const _a=e=>e,Hp=()=>{let e=_a;return{configure(t){e=t},generate(t){return e(t)},reset(){e=_a}}},Up=Hp(),ci=Up,pi={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function rt(e,t,n="Mui"){const r=pi[t];return r?`${n}-${r}`:`${ci.generate(e)}-${t}`}function xt(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=rt(e,o,n)}),r}function Gp(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function me(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,a;for(a=0;a<r.length;a++)o=r[a],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}const qp=["values","unit","step"],Wp=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>j({},n,{[r.key]:r.val}),{})};function Xp(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=me(e,qp),a=Wp(t),s=Object.keys(a);function l(g){return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${n})`}function c(g){return`@media (max-width:${(typeof t[g]=="number"?t[g]:g)-r/100}${n})`}function f(g,u){const h=s.indexOf(u);return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${n}) and (max-width:${(h!==-1&&typeof t[s[h]]=="number"?t[s[h]]:u)-r/100}${n})`}function m(g){return s.indexOf(g)+1<s.length?f(g,s[s.indexOf(g)+1]):l(g)}function v(g){const u=s.indexOf(g);return u===0?l(s[1]):u===s.length-1?c(s[u]):f(g,s[s.indexOf(g)+1]).replace("@media","@media not all and")}return j({keys:s,values:a,up:l,down:c,between:f,only:m,not:v,unit:n},o)}const Yp={borderRadius:4},Kp=Yp,Jp=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.string,i.object,i.array]):{},kt=Jp;function Cn(e,t){return t?ct(e,t,{clone:!1}):e}const jo={xs:0,sm:600,md:900,lg:1200,xl:1536},Ma={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${jo[e]}px)`};function ut(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const a=r.breakpoints||Ma;return t.reduce((s,l,c)=>(s[a.up(a.keys[c])]=n(t[c]),s),{})}if(typeof t=="object"){const a=r.breakpoints||Ma;return Object.keys(t).reduce((s,l)=>{if(Object.keys(a.values||jo).indexOf(l)!==-1){const c=a.up(l);s[c]=n(t[l],l)}else{const c=l;s[c]=t[c]}return s},{})}return n(t)}function Zp(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const a=e.up(o);return r[a]={},r},{}))||{}}function Qp(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Er(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function fr(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Er(e,n)||r,t&&(o=t(o,r,e)),o}function xe(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,a=s=>{if(s[t]==null)return null;const l=s[t],c=s.theme,f=Er(c,r)||{};return ut(s,l,v=>{let g=fr(f,o,v);return v===g&&typeof v=="string"&&(g=fr(f,o,`${t}${v==="default"?"":et(v)}`,v)),n===!1?g:{[n]:g}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[t]:kt}:{},a.filterProps=[t],a}function eu(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const tu={m:"margin",p:"padding"},nu={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Ia={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},ru=eu(e=>{if(e.length>2)if(Ia[e])e=Ia[e];else return[e];const[t,n]=e.split(""),r=tu[t],o=nu[n]||"";return Array.isArray(o)?o.map(a=>r+a):[r+o]}),Tr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Nr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],ou=[...Tr,...Nr];function Wn(e,t,n,r){var o;const a=(o=Er(e,t,!1))!=null?o:n;return typeof a=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),a*s):Array.isArray(a)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>a.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${s} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),a[s]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function ui(e){return Wn(e,"spacing",8,"spacing")}function Xn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function au(e,t){return n=>e.reduce((r,o)=>(r[o]=Xn(t,n),r),{})}function su(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=ru(n),a=au(o,r),s=e[n];return ut(e,s,a)}function di(e,t){const n=ui(e.theme);return Object.keys(e).map(r=>su(e,t,r,n)).reduce(Cn,{})}function be(e){return di(e,Tr)}be.propTypes=process.env.NODE_ENV!=="production"?Tr.reduce((e,t)=>(e[t]=kt,e),{}):{};be.filterProps=Tr;function ve(e){return di(e,Nr)}ve.propTypes=process.env.NODE_ENV!=="production"?Nr.reduce((e,t)=>(e[t]=kt,e),{}):{};ve.filterProps=Nr;process.env.NODE_ENV!=="production"&&ou.reduce((e,t)=>(e[t]=kt,e),{});function iu(e=8){if(e.mui)return e;const t=ui({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(a=>{const s=t(a);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function Sr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(a=>{r[a]=o}),r),{}),n=r=>Object.keys(r).reduce((o,a)=>t[a]?Cn(o,t[a](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function He(e){return typeof e!="number"?e:`${e}px solid`}function Xe(e,t){return xe({prop:e,themeKey:"borders",transform:t})}const lu=Xe("border",He),cu=Xe("borderTop",He),pu=Xe("borderRight",He),uu=Xe("borderBottom",He),du=Xe("borderLeft",He),fu=Xe("borderColor"),mu=Xe("borderTopColor"),hu=Xe("borderRightColor"),gu=Xe("borderBottomColor"),bu=Xe("borderLeftColor"),vu=Xe("outline",He),yu=Xe("outlineColor"),Cr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Wn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:Xn(t,r)});return ut(e,e.borderRadius,n)}return null};Cr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:kt}:{};Cr.filterProps=["borderRadius"];Sr(lu,cu,pu,uu,du,fu,mu,hu,gu,bu,Cr,vu,yu);const Or=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Wn(e.theme,"spacing",8,"gap"),n=r=>({gap:Xn(t,r)});return ut(e,e.gap,n)}return null};Or.propTypes=process.env.NODE_ENV!=="production"?{gap:kt}:{};Or.filterProps=["gap"];const Rr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Wn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:Xn(t,r)});return ut(e,e.columnGap,n)}return null};Rr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:kt}:{};Rr.filterProps=["columnGap"];const Pr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Wn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:Xn(t,r)});return ut(e,e.rowGap,n)}return null};Pr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:kt}:{};Pr.filterProps=["rowGap"];const wu=xe({prop:"gridColumn"}),xu=xe({prop:"gridRow"}),ku=xe({prop:"gridAutoFlow"}),Eu=xe({prop:"gridAutoColumns"}),Tu=xe({prop:"gridAutoRows"}),Nu=xe({prop:"gridTemplateColumns"}),Su=xe({prop:"gridTemplateRows"}),Cu=xe({prop:"gridTemplateAreas"}),Ou=xe({prop:"gridArea"});Sr(Or,Rr,Pr,wu,xu,ku,Eu,Tu,Nu,Su,Cu,Ou);function Yt(e,t){return t==="grey"?t:e}const Ru=xe({prop:"color",themeKey:"palette",transform:Yt}),Pu=xe({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Yt}),ju=xe({prop:"backgroundColor",themeKey:"palette",transform:Yt});Sr(Ru,Pu,ju);function Ve(e){return e<=1&&e!==0?`${e*100}%`:e}const $u=xe({prop:"width",transform:Ve}),$o=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const a=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||jo[n];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:Ve(n)}};return ut(e,e.maxWidth,t)}return null};$o.filterProps=["maxWidth"];const _u=xe({prop:"minWidth",transform:Ve}),Mu=xe({prop:"height",transform:Ve}),Iu=xe({prop:"maxHeight",transform:Ve}),Au=xe({prop:"minHeight",transform:Ve});xe({prop:"size",cssProperty:"width",transform:Ve});xe({prop:"size",cssProperty:"height",transform:Ve});const Du=xe({prop:"boxSizing"});Sr($u,$o,_u,Mu,Iu,Au,Du);const Bu={border:{themeKey:"borders",transform:He},borderTop:{themeKey:"borders",transform:He},borderRight:{themeKey:"borders",transform:He},borderBottom:{themeKey:"borders",transform:He},borderLeft:{themeKey:"borders",transform:He},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:He},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Cr},color:{themeKey:"palette",transform:Yt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Yt},backgroundColor:{themeKey:"palette",transform:Yt},p:{style:ve},pt:{style:ve},pr:{style:ve},pb:{style:ve},pl:{style:ve},px:{style:ve},py:{style:ve},padding:{style:ve},paddingTop:{style:ve},paddingRight:{style:ve},paddingBottom:{style:ve},paddingLeft:{style:ve},paddingX:{style:ve},paddingY:{style:ve},paddingInline:{style:ve},paddingInlineStart:{style:ve},paddingInlineEnd:{style:ve},paddingBlock:{style:ve},paddingBlockStart:{style:ve},paddingBlockEnd:{style:ve},m:{style:be},mt:{style:be},mr:{style:be},mb:{style:be},ml:{style:be},mx:{style:be},my:{style:be},margin:{style:be},marginTop:{style:be},marginRight:{style:be},marginBottom:{style:be},marginLeft:{style:be},marginX:{style:be},marginY:{style:be},marginInline:{style:be},marginInlineStart:{style:be},marginInlineEnd:{style:be},marginBlock:{style:be},marginBlockStart:{style:be},marginBlockEnd:{style:be},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Or},rowGap:{style:Pr},columnGap:{style:Rr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ve},maxWidth:{style:$o},minWidth:{transform:Ve},height:{transform:Ve},maxHeight:{transform:Ve},minHeight:{transform:Ve},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},_o=Bu;function Lu(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Vu(e,t){return typeof e=="function"?e(t):e}function Fu(){function e(n,r,o,a){const s={[n]:r,theme:o},l=a[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:f,transform:m,style:v}=l;if(r==null)return null;if(f==="typography"&&r==="inherit")return{[n]:r};const g=Er(o,f)||{};return v?v(s):ut(s,r,h=>{let d=fr(g,m,h);return h===d&&typeof h=="string"&&(d=fr(g,m,`${n}${h==="default"?"":et(h)}`,h)),c===!1?d:{[c]:d}})}function t(n){var r;const{sx:o,theme:a={}}=n||{};if(!o)return null;const s=(r=a.unstable_sxConfig)!=null?r:_o;function l(c){let f=c;if(typeof c=="function")f=c(a);else if(typeof c!="object")return c;if(!f)return null;const m=Zp(a.breakpoints),v=Object.keys(m);let g=m;return Object.keys(f).forEach(u=>{const h=Vu(f[u],a);if(h!=null)if(typeof h=="object")if(s[u])g=Cn(g,e(u,h,a,s));else{const d=ut({theme:a},h,b=>({[u]:b}));Lu(d,h)?g[u]=t({sx:h,theme:a}):g=Cn(g,d)}else g=Cn(g,e(u,h,a,s))}),Qp(v,g)}return Array.isArray(o)?o.map(l):l(o)}return t}const fi=Fu();fi.filterProps=["sx"];const Mo=fi;function zu(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Hu=["breakpoints","palette","spacing","shape"];function Io(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:a={}}=e,s=me(e,Hu),l=Xp(n),c=iu(o);let f=ct({breakpoints:l,direction:"ltr",components:{},palette:j({mode:"light"},r),spacing:c,shape:j({},Kp,a)},s);return f.applyStyles=zu,f=t.reduce((m,v)=>ct(m,v),f),f.unstable_sxConfig=j({},_o,s==null?void 0:s.unstable_sxConfig),f.unstable_sx=function(v){return Mo({sx:v,theme:this})},f}function Uu(e){return Object.keys(e).length===0}function mi(e=null){const t=N.useContext(no.ThemeContext);return!t||Uu(t)?e:t}const Gu=Io();function hi(e=Gu){return mi(e)}const qu=["ownerState"],Wu=["variants"],Xu=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Yu(e){return Object.keys(e).length===0}function Ku(e){return typeof e=="string"&&e.charCodeAt(0)>96}function sr(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Ju=Io(),Aa=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function nr({defaultTheme:e,theme:t,themeId:n}){return Yu(t)?e:t[n]||t}function Zu(e){return e?(t,n)=>n[e]:null}function ir(e,t){let{ownerState:n}=t,r=me(t,qu);const o=typeof e=="function"?e(j({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(a=>ir(a,j({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let l=me(o,Wu);return a.forEach(c=>{let f=!0;typeof c.props=="function"?f=c.props(j({ownerState:n},r,n)):Object.keys(c.props).forEach(m=>{(n==null?void 0:n[m])!==c.props[m]&&r[m]!==c.props[m]&&(f=!1)}),f&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(j({ownerState:n},r,n)):c.style))}),l}return o}function Qu(e={}){const{themeId:t,defaultTheme:n=Ju,rootShouldForwardProp:r=sr,slotShouldForwardProp:o=sr}=e,a=s=>Mo(j({},s,{theme:nr(j({},s,{defaultTheme:n,themeId:t}))}));return a.__mui_systemSx=!0,(s,l={})=>{no.internal_processStyles(s,y=>y.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:c,slot:f,skipVariantsResolver:m,skipSx:v,overridesResolver:g=Zu(Aa(f))}=l,u=me(l,Xu),h=m!==void 0?m:f&&f!=="Root"&&f!=="root"||!1,d=v||!1;let b;process.env.NODE_ENV!=="production"&&c&&(b=`${c}-${Aa(f||"Root")}`);let x=sr;f==="Root"||f==="root"?x=r:f?x=o:Ku(s)&&(x=void 0);const R=no(s,j({shouldForwardProp:x,label:b},u)),w=y=>typeof y=="function"&&y.__emotion_real!==y||jt(y)?S=>ir(y,j({},S,{theme:nr({theme:S.theme,defaultTheme:n,themeId:t})})):y,k=(y,...S)=>{let O=w(y);const M=S?S.map(w):[];c&&g&&M.push(E=>{const P=nr(j({},E,{defaultTheme:n,themeId:t}));if(!P.components||!P.components[c]||!P.components[c].styleOverrides)return null;const $=P.components[c].styleOverrides,F={};return Object.entries($).forEach(([H,_])=>{F[H]=ir(_,j({},E,{theme:P}))}),g(E,F)}),c&&!h&&M.push(E=>{var P;const $=nr(j({},E,{defaultTheme:n,themeId:t})),F=$==null||(P=$.components)==null||(P=P[c])==null?void 0:P.variants;return ir({variants:F},j({},E,{theme:$}))}),d||M.push(a);const D=M.length-S.length;if(Array.isArray(y)&&D>0){const E=new Array(D).fill("");O=[...y,...E],O.raw=[...y.raw,...E]}const L=R(O,...M);if(process.env.NODE_ENV!=="production"){let E;c&&(E=`${c}${et(f||"")}`),E===void 0&&(E=`Styled(${kp(s)})`),L.displayName=E}return s.muiName&&(L.muiName=s.muiName),L};return R.withConfig&&(k.withConfig=R.withConfig),k}}function ed(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:li(t.components[n].defaultProps,r)}function td({props:e,name:t,defaultTheme:n,themeId:r}){let o=hi(n);return r&&(o=o[r]||o),ed({theme:o,name:t,props:e})}function Ao(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Gp(e,t,n)}function nd(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Dt(e){if(e.type)return e;if(e.charAt(0)==="#")return Dt(nd(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Qt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Qt(10,o))}else r=r.split(",");return r=r.map(a=>parseFloat(a)),{type:n,values:r,colorSpace:o}}function jr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,a)=>a<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function rd(e){e=Dt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,a=r*Math.min(o,1-o),s=(f,m=(f+n/30)%12)=>o-a*Math.max(Math.min(m-3,9-m,1),-1);let l="rgb";const c=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),jr({type:l,values:c})}function Da(e){e=Dt(e);let t=e.type==="hsl"||e.type==="hsla"?Dt(rd(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Ba(e,t){const n=Da(e),r=Da(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function mr(e,t){return e=Dt(e),t=Ao(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,jr(e)}function od(e,t){if(e=Dt(e),t=Ao(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return jr(e)}function ad(e,t){if(e=Dt(e),t=Ao(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return jr(e)}function sd(e,t){return j({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const id={black:"#000",white:"#fff"},In=id,ld={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},cd=ld,pd={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ft=pd,ud={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},zt=ud,dd={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},gn=dd,fd={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ht=fd,md={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Ut=md,hd={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Gt=hd,gd=["mode","contrastThreshold","tonalOffset"],La={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:In.white,default:In.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Wr={text:{primary:In.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:In.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Va(e,t,n,r){const o=r.light||r,a=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=ad(e.main,o):t==="dark"&&(e.dark=od(e.main,a)))}function bd(e="light"){return e==="dark"?{main:Ht[200],light:Ht[50],dark:Ht[400]}:{main:Ht[700],light:Ht[400],dark:Ht[800]}}function vd(e="light"){return e==="dark"?{main:Ft[200],light:Ft[50],dark:Ft[400]}:{main:Ft[500],light:Ft[300],dark:Ft[700]}}function yd(e="light"){return e==="dark"?{main:zt[500],light:zt[300],dark:zt[700]}:{main:zt[700],light:zt[400],dark:zt[800]}}function wd(e="light"){return e==="dark"?{main:Ut[400],light:Ut[300],dark:Ut[700]}:{main:Ut[700],light:Ut[500],dark:Ut[900]}}function xd(e="light"){return e==="dark"?{main:Gt[400],light:Gt[300],dark:Gt[700]}:{main:Gt[800],light:Gt[500],dark:Gt[900]}}function kd(e="light"){return e==="dark"?{main:gn[400],light:gn[300],dark:gn[700]}:{main:"#ed6c02",light:gn[500],dark:gn[900]}}function Ed(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=me(e,gd),a=e.primary||bd(t),s=e.secondary||vd(t),l=e.error||yd(t),c=e.info||wd(t),f=e.success||xd(t),m=e.warning||kd(t);function v(d){const b=Ba(d,Wr.text.primary)>=n?Wr.text.primary:La.text.primary;if(process.env.NODE_ENV!=="production"){const x=Ba(d,b);x<3&&console.error([`MUI: The contrast ratio of ${x}:1 for ${b} on ${d}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return b}const g=({color:d,name:b,mainShade:x=500,lightShade:R=300,darkShade:w=700})=>{if(d=j({},d),!d.main&&d[x]&&(d.main=d[x]),!d.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.`:Qt(11,b?` (${b})`:"",x));if(typeof d.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(d.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Qt(12,b?` (${b})`:"",JSON.stringify(d.main)));return Va(d,"light",R,r),Va(d,"dark",w,r),d.contrastText||(d.contrastText=v(d.main)),d},u={dark:Wr,light:La};return process.env.NODE_ENV!=="production"&&(u[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),ct(j({common:j({},In),mode:t,primary:g({color:a,name:"primary"}),secondary:g({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:g({color:l,name:"error"}),warning:g({color:m,name:"warning"}),info:g({color:c,name:"info"}),success:g({color:f,name:"success"}),grey:cd,contrastThreshold:n,getContrastText:v,augmentColor:g,tonalOffset:r},u[t]),o)}const Td=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Nd(e){return Math.round(e*1e5)/1e5}const Fa={textTransform:"uppercase"},za='"Roboto", "Helvetica", "Arial", sans-serif';function Sd(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=za,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:s=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:f=16,allVariants:m,pxToRem:v}=n,g=me(n,Td);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof f!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const u=o/14,h=v||(x=>`${x/f*u}rem`),d=(x,R,w,k,y)=>j({fontFamily:r,fontWeight:x,fontSize:h(R),lineHeight:w},r===za?{letterSpacing:`${Nd(k/R)}em`}:{},y,m),b={h1:d(a,96,1.167,-1.5),h2:d(a,60,1.2,-.5),h3:d(s,48,1.167,0),h4:d(s,34,1.235,.25),h5:d(s,24,1.334,0),h6:d(l,20,1.6,.15),subtitle1:d(s,16,1.75,.15),subtitle2:d(l,14,1.57,.1),body1:d(s,16,1.5,.15),body2:d(s,14,1.43,.15),button:d(l,14,1.75,.4,Fa),caption:d(s,12,1.66,.4),overline:d(s,12,2.66,1,Fa),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return ct(j({htmlFontSize:f,pxToRem:h,fontFamily:r,fontSize:o,fontWeightLight:a,fontWeightRegular:s,fontWeightMedium:l,fontWeightBold:c},b),g,{clone:!1})}const Cd=.2,Od=.14,Rd=.12;function ge(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Cd})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Od})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Rd})`].join(",")}const Pd=["none",ge(0,2,1,-1,0,1,1,0,0,1,3,0),ge(0,3,1,-2,0,2,2,0,0,1,5,0),ge(0,3,3,-2,0,3,4,0,0,1,8,0),ge(0,2,4,-1,0,4,5,0,0,1,10,0),ge(0,3,5,-1,0,5,8,0,0,1,14,0),ge(0,3,5,-1,0,6,10,0,0,1,18,0),ge(0,4,5,-2,0,7,10,1,0,2,16,1),ge(0,5,5,-3,0,8,10,1,0,3,14,2),ge(0,5,6,-3,0,9,12,1,0,3,16,2),ge(0,6,6,-3,0,10,14,1,0,4,18,3),ge(0,6,7,-4,0,11,15,1,0,4,20,3),ge(0,7,8,-4,0,12,17,2,0,5,22,4),ge(0,7,8,-4,0,13,19,2,0,5,24,4),ge(0,7,9,-4,0,14,21,2,0,5,26,4),ge(0,8,9,-5,0,15,22,2,0,6,28,5),ge(0,8,10,-5,0,16,24,2,0,6,30,5),ge(0,8,11,-5,0,17,26,2,0,6,32,5),ge(0,9,11,-5,0,18,28,2,0,7,34,6),ge(0,9,12,-6,0,19,29,2,0,7,36,6),ge(0,10,13,-6,0,20,31,3,0,8,38,7),ge(0,10,13,-6,0,21,33,3,0,8,40,7),ge(0,10,14,-6,0,22,35,3,0,8,42,7),ge(0,11,14,-7,0,23,36,3,0,9,44,8),ge(0,11,15,-7,0,24,38,3,0,9,46,8)],jd=Pd,$d=["duration","easing","delay"],_d={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Md={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Ha(e){return`${Math.round(e)}ms`}function Id(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Ad(e){const t=j({},_d,e.easing),n=j({},Md,e.duration);return j({getAutoHeightDuration:Id,create:(o=["all"],a={})=>{const{duration:s=n.standard,easing:l=t.easeInOut,delay:c=0}=a,f=me(a,$d);if(process.env.NODE_ENV!=="production"){const m=g=>typeof g=="string",v=g=>!isNaN(parseFloat(g));!m(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!v(s)&&!m(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),m(l)||console.error('MUI: Argument "easing" must be a string.'),!v(c)&&!m(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(f).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(f).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(m=>`${m} ${typeof s=="string"?s:Ha(s)} ${l} ${typeof c=="string"?c:Ha(c)}`).join(",")}},e,{easing:t,duration:n})}const Dd={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Bd=Dd,Ld=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Vd(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:a={}}=e,s=me(e,Ld);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Qt(18));const l=Ed(r),c=Io(e);let f=ct(c,{mixins:sd(c.breakpoints,n),palette:l,shadows:jd.slice(),typography:Sd(l,a),transitions:Ad(o),zIndex:j({},Bd)});if(f=ct(f,s),f=t.reduce((m,v)=>ct(m,v),f),process.env.NODE_ENV!=="production"){const m=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],v=(g,u)=>{let h;for(h in g){const d=g[h];if(m.indexOf(h)!==-1&&Object.keys(d).length>0){if(process.env.NODE_ENV!=="production"){const b=rt("",h);console.error([`MUI: The \`${u}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(g,null,2),"",`Instead, you need to use the '&.${b}' syntax:`,JSON.stringify({root:{[`&.${b}`]:d}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}g[h]={}}}};Object.keys(f.components).forEach(g=>{const u=f.components[g].styleOverrides;u&&g.indexOf("Mui")===0&&v(u,g)})}return f.unstable_sxConfig=j({},_o,s==null?void 0:s.unstable_sxConfig),f.unstable_sx=function(v){return Mo({sx:v,theme:this})},f}const Fd=Vd(),Do=Fd,Bo="$$material";function mt({props:e,name:t}){return td({props:e,name:t,defaultTheme:Do,themeId:Bo})}const gi=e=>sr(e)&&e!=="classes",zd=Qu({themeId:Bo,defaultTheme:Do,rootShouldForwardProp:gi}),Re=zd;function Hd(e){return rt("MuiSvgIcon",e)}xt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Ud=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Gd=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${et(t)}`,`fontSize${et(n)}`]};return ft(o,Hd,r)},qd=Re("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${et(n.color)}`],t[`fontSize${et(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,a,s,l,c,f,m,v,g,u,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((f=e.typography)==null||(m=f.pxToRem)==null?void 0:m.call(f,35))||"2.1875rem"}[t.fontSize],color:(v=(g=(e.vars||e).palette)==null||(g=g[t.color])==null?void 0:g.main)!=null?v:{action:(u=(e.vars||e).palette)==null||(u=u.action)==null?void 0:u.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),Lo=N.forwardRef(function(t,n){const r=mt({props:t,name:"MuiSvgIcon"}),{children:o,className:a,color:s="inherit",component:l="svg",fontSize:c="medium",htmlColor:f,inheritViewBox:m=!1,titleAccess:v,viewBox:g="0 0 24 24"}=r,u=me(r,Ud),h=N.isValidElement(o)&&o.type==="svg",d=j({},r,{color:s,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:m,viewBox:g,hasSvgAsChild:h}),b={};m||(b.viewBox=g);const x=Gd(d);return p.jsxs(qd,j({as:l,className:Se(x.root,a),focusable:"false",color:f,"aria-hidden":v?void 0:!0,role:v?"img":void 0,ref:n},b,u,h&&o.props,{ownerState:d,children:[h?o.props.children:o,v?p.jsx("title",{children:v}):null]}))});process.env.NODE_ENV!=="production"&&(Lo.propTypes={children:i.node,classes:i.object,className:i.string,color:i.oneOfType([i.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),i.string]),component:i.elementType,fontSize:i.oneOfType([i.oneOf(["inherit","large","medium","small"]),i.string]),htmlColor:i.string,inheritViewBox:i.bool,shapeRendering:i.string,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),titleAccess:i.string,viewBox:i.string});Lo.muiName="SvgIcon";const Ua=Lo;function bi(e,t){function n(r,o){return p.jsx(Ua,j({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Ua.muiName,N.memo(N.forwardRef(n))}const Wd={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),ci.configure(e)}},Xd=Object.freeze(Object.defineProperty({__proto__:null,capitalize:et,createChainedFunction:io,createSvgIcon:bi,debounce:ei,deprecatedPropType:Tp,isMuiElement:Np,ownerDocument:Oe,ownerWindow:en,requirePropFactory:Sp,setRef:dr,unstable_ClassNameGenerator:Wd,unstable_useEnhancedEffect:At,unstable_useId:ti,unsupportedProp:Rp,useControlled:ni,useEventCallback:Mn,useForkRef:Ge,useIsFocusVisible:ri},Symbol.toStringTag,{value:"Module"})),Yd=np(Xd);var Ga;function Kd(){return Ga||(Ga=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Yd}(Lr)),Lr}var Jd=rp;Object.defineProperty(Oo,"__esModule",{value:!0});var vi=Oo.default=void 0,Zd=Jd(Kd()),Qd=p;vi=Oo.default=(0,Zd.default)((0,Qd.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function yi(e){return typeof e=="string"}function Tn(e,t,n){return e===void 0||yi(e)?t:j({},t,{ownerState:j({},t.ownerState,n)})}const ef={disableDefaultClasses:!1},tf=N.createContext(ef);function nf(e){const{disableDefaultClasses:t}=N.useContext(tf);return n=>t?"":e(n)}function wi(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function rf(e,t,n){return typeof e=="function"?e(t,n):e}function qa(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function of(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:a}=e;if(!t){const u=Se(n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),h=j({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),d=j({},n,o,r);return u.length>0&&(d.className=u),Object.keys(h).length>0&&(d.style=h),{props:d,internalRef:void 0}}const s=wi(j({},o,r)),l=qa(r),c=qa(o),f=t(s),m=Se(f==null?void 0:f.className,n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),v=j({},f==null?void 0:f.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),g=j({},f,n,c,l);return m.length>0&&(g.className=m),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:f.ref}}const af=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Bt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:a=!1}=e,s=me(e,af),l=a?{}:rf(r,o),{props:c,internalRef:f}=of(j({},s,{externalSlotProps:l})),m=Ge(f,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return Tn(n,j({},c,{ref:m}),o)}const xi="base";function sf(e){return`${xi}--${e}`}function lf(e,t){return`${xi}-${e}-${t}`}function ki(e,t){const n=pi[t];return n?sf(n):lf(e,t)}function cf(e,t){const n={};return t.forEach(r=>{n[r]=ki(e,r)}),n}const pf=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function uf(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function df(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function ff(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||df(e))}function mf(e){const t=[],n=[];return Array.from(e.querySelectorAll(pf)).forEach((r,o)=>{const a=uf(r);a===-1||!ff(r)||(a===0?t.push(r):n.push({documentOrder:o,tabIndex:a,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function hf(){return!0}function hr(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:a=mf,isEnabled:s=hf,open:l}=e,c=N.useRef(!1),f=N.useRef(null),m=N.useRef(null),v=N.useRef(null),g=N.useRef(null),u=N.useRef(!1),h=N.useRef(null),d=Ge(t.ref,h),b=N.useRef(null);N.useEffect(()=>{!l||!h.current||(u.current=!n)},[n,l]),N.useEffect(()=>{if(!l||!h.current)return;const w=Oe(h.current);return h.current.contains(w.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),u.current&&h.current.focus()),()=>{o||(v.current&&v.current.focus&&(c.current=!0,v.current.focus()),v.current=null)}},[l]),N.useEffect(()=>{if(!l||!h.current)return;const w=Oe(h.current),k=O=>{b.current=O,!(r||!s()||O.key!=="Tab")&&w.activeElement===h.current&&O.shiftKey&&(c.current=!0,m.current&&m.current.focus())},y=()=>{const O=h.current;if(O===null)return;if(!w.hasFocus()||!s()||c.current){c.current=!1;return}if(O.contains(w.activeElement)||r&&w.activeElement!==f.current&&w.activeElement!==m.current)return;if(w.activeElement!==g.current)g.current=null;else if(g.current!==null)return;if(!u.current)return;let M=[];if((w.activeElement===f.current||w.activeElement===m.current)&&(M=a(h.current)),M.length>0){var D,L;const E=!!((D=b.current)!=null&&D.shiftKey&&((L=b.current)==null?void 0:L.key)==="Tab"),P=M[0],$=M[M.length-1];typeof P!="string"&&typeof $!="string"&&(E?$.focus():P.focus())}else O.focus()};w.addEventListener("focusin",y),w.addEventListener("keydown",k,!0);const S=setInterval(()=>{w.activeElement&&w.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(S),w.removeEventListener("focusin",y),w.removeEventListener("keydown",k,!0)}},[n,r,o,s,l,a]);const x=w=>{v.current===null&&(v.current=w.relatedTarget),u.current=!0,g.current=w.target;const k=t.props.onFocus;k&&k(w)},R=w=>{v.current===null&&(v.current=w.relatedTarget),u.current=!0};return p.jsxs(N.Fragment,{children:[p.jsx("div",{tabIndex:l?0:-1,onFocus:R,ref:f,"data-testid":"sentinelStart"}),N.cloneElement(t,{ref:d,onFocus:x}),p.jsx("div",{tabIndex:l?0:-1,onFocus:R,ref:m,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(hr.propTypes={children:Gn,disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableRestoreFocus:i.bool,getTabbable:i.func,isEnabled:i.func,open:i.bool.isRequired});process.env.NODE_ENV!=="production"&&(hr["propTypes"]=Zs(hr.propTypes));function gf(e){return typeof e=="function"?e():e}const An=N.forwardRef(function(t,n){const{children:r,container:o,disablePortal:a=!1}=t,[s,l]=N.useState(null),c=Ge(N.isValidElement(r)?r.ref:null,n);if(At(()=>{a||l(gf(o)||document.body)},[o,a]),At(()=>{if(s&&!a)return dr(n,s),()=>{dr(n,null)}},[n,s,a]),a){if(N.isValidElement(r)){const f={ref:c};return N.cloneElement(r,f)}return p.jsx(N.Fragment,{children:r})}return p.jsx(N.Fragment,{children:s&&ic.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&(An.propTypes={children:i.node,container:i.oneOfType([pt,i.func]),disablePortal:i.bool});process.env.NODE_ENV!=="production"&&(An["propTypes"]=Zs(An.propTypes));function bf(e){const t=Oe(e);return t.body===e?en(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function On(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Wa(e){return parseInt(en(e).getComputedStyle(e).paddingRight,10)||0}function vf(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Xa(e,t,n,r,o){const a=[t,n,...r];[].forEach.call(e.children,s=>{const l=a.indexOf(s)===-1,c=!vf(s);l&&c&&On(s,o)})}function Xr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function yf(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(bf(r)){const s=oi(Oe(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Wa(r)+s}px`;const l=Oe(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${Wa(c)+s}px`})}let a;if(r.parentNode instanceof DocumentFragment)a=Oe(r).body;else{const s=r.parentElement,l=en(r);a=(s==null?void 0:s.nodeName)==="HTML"&&l.getComputedStyle(s).overflowY==="scroll"?s:r}n.push({value:a.style.overflow,property:"overflow",el:a},{value:a.style.overflowX,property:"overflow-x",el:a},{value:a.style.overflowY,property:"overflow-y",el:a}),a.style.overflow="hidden"}return()=>{n.forEach(({value:a,el:s,property:l})=>{a?s.style.setProperty(l,a):s.style.removeProperty(l)})}}function wf(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class xf{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&On(t.modalRef,!1);const o=wf(n);Xa(n,t.mount,t.modalRef,o,!0);const a=Xr(this.containers,s=>s.container===n);return a!==-1?(this.containers[a].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=Xr(this.containers,a=>a.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=yf(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=Xr(this.containers,s=>s.modals.indexOf(t)!==-1),a=this.containers[o];if(a.modals.splice(a.modals.indexOf(t),1),this.modals.splice(r,1),a.modals.length===0)a.restore&&a.restore(),t.modalRef&&On(t.modalRef,n),Xa(a.container,t.mount,t.modalRef,a.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=a.modals[a.modals.length-1];s.modalRef&&On(s.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function kf(e){return typeof e=="function"?e():e}function Ef(e){return e?e.props.hasOwnProperty("in"):!1}const Tf=new xf;function Nf(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Tf,closeAfterTransition:a=!1,onTransitionEnter:s,onTransitionExited:l,children:c,onClose:f,open:m,rootRef:v}=e,g=N.useRef({}),u=N.useRef(null),h=N.useRef(null),d=Ge(h,v),[b,x]=N.useState(!m),R=Ef(c);let w=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(w=!1);const k=()=>Oe(u.current),y=()=>(g.current.modalRef=h.current,g.current.mount=u.current,g.current),S=()=>{o.mount(y(),{disableScrollLock:r}),h.current&&(h.current.scrollTop=0)},O=Mn(()=>{const _=kf(t)||k().body;o.add(y(),_),h.current&&S()}),M=N.useCallback(()=>o.isTopModal(y()),[o]),D=Mn(_=>{u.current=_,_&&(m&&M()?S():h.current&&On(h.current,w))}),L=N.useCallback(()=>{o.remove(y(),w)},[w,o]);N.useEffect(()=>()=>{L()},[L]),N.useEffect(()=>{m?O():(!R||!a)&&L()},[m,L,R,a,O]);const E=_=>z=>{var Z;(Z=_.onKeyDown)==null||Z.call(_,z),!(z.key!=="Escape"||z.which===229||!M())&&(n||(z.stopPropagation(),f&&f(z,"escapeKeyDown")))},P=_=>z=>{var Z;(Z=_.onClick)==null||Z.call(_,z),z.target===z.currentTarget&&f&&f(z,"backdropClick")};return{getRootProps:(_={})=>{const z=wi(e);delete z.onTransitionEnter,delete z.onTransitionExited;const Z=j({},z,_);return j({role:"presentation"},Z,{onKeyDown:E(Z),ref:d})},getBackdropProps:(_={})=>{const z=_;return j({"aria-hidden":!0},z,{onClick:P(z),open:m})},getTransitionProps:()=>{const _=()=>{x(!1),s&&s()},z=()=>{x(!0),l&&l(),a&&L()};return{onEnter:io(_,c==null?void 0:c.props.onEnter),onExited:io(z,c==null?void 0:c.props.onExited)}},rootRef:d,portalRef:D,isTopModal:M,exited:b,hasTransition:R}}var _e="top",qe="bottom",We="right",Me="left",Vo="auto",Yn=[_e,qe,We,Me],tn="start",Dn="end",Sf="clippingParents",Ei="viewport",bn="popper",Cf="reference",Ya=Yn.reduce(function(e,t){return e.concat([t+"-"+tn,t+"-"+Dn])},[]),Ti=[].concat(Yn,[Vo]).reduce(function(e,t){return e.concat([t,t+"-"+tn,t+"-"+Dn])},[]),Of="beforeRead",Rf="read",Pf="afterRead",jf="beforeMain",$f="main",_f="afterMain",Mf="beforeWrite",If="write",Af="afterWrite",Df=[Of,Rf,Pf,jf,$f,_f,Mf,If,Af];function tt(e){return e?(e.nodeName||"").toLowerCase():null}function Fe(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Lt(e){var t=Fe(e).Element;return e instanceof t||e instanceof Element}function Ue(e){var t=Fe(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Fo(e){if(typeof ShadowRoot>"u")return!1;var t=Fe(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Bf(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},a=t.elements[n];!Ue(a)||!tt(a)||(Object.assign(a.style,r),Object.keys(o).forEach(function(s){var l=o[s];l===!1?a.removeAttribute(s):a.setAttribute(s,l===!0?"":l)}))})}function Lf(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],a=t.attributes[r]||{},s=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=s.reduce(function(c,f){return c[f]="",c},{});!Ue(o)||!tt(o)||(Object.assign(o.style,l),Object.keys(a).forEach(function(c){o.removeAttribute(c)}))})}}const Vf={name:"applyStyles",enabled:!0,phase:"write",fn:Bf,effect:Lf,requires:["computeStyles"]};function Ze(e){return e.split("-")[0]}var _t=Math.max,gr=Math.min,nn=Math.round;function po(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ni(){return!/^((?!chrome|android).)*safari/i.test(po())}function rn(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,a=1;t&&Ue(e)&&(o=e.offsetWidth>0&&nn(r.width)/e.offsetWidth||1,a=e.offsetHeight>0&&nn(r.height)/e.offsetHeight||1);var s=Lt(e)?Fe(e):window,l=s.visualViewport,c=!Ni()&&n,f=(r.left+(c&&l?l.offsetLeft:0))/o,m=(r.top+(c&&l?l.offsetTop:0))/a,v=r.width/o,g=r.height/a;return{width:v,height:g,top:m,right:f+v,bottom:m+g,left:f,x:f,y:m}}function zo(e){var t=rn(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Si(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Fo(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function dt(e){return Fe(e).getComputedStyle(e)}function Ff(e){return["table","td","th"].indexOf(tt(e))>=0}function Et(e){return((Lt(e)?e.ownerDocument:e.document)||window.document).documentElement}function $r(e){return tt(e)==="html"?e:e.assignedSlot||e.parentNode||(Fo(e)?e.host:null)||Et(e)}function Ka(e){return!Ue(e)||dt(e).position==="fixed"?null:e.offsetParent}function zf(e){var t=/firefox/i.test(po()),n=/Trident/i.test(po());if(n&&Ue(e)){var r=dt(e);if(r.position==="fixed")return null}var o=$r(e);for(Fo(o)&&(o=o.host);Ue(o)&&["html","body"].indexOf(tt(o))<0;){var a=dt(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function Kn(e){for(var t=Fe(e),n=Ka(e);n&&Ff(n)&&dt(n).position==="static";)n=Ka(n);return n&&(tt(n)==="html"||tt(n)==="body"&&dt(n).position==="static")?t:n||zf(e)||t}function Ho(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Rn(e,t,n){return _t(e,gr(t,n))}function Hf(e,t,n){var r=Rn(e,t,n);return r>n?n:r}function Ci(){return{top:0,right:0,bottom:0,left:0}}function Oi(e){return Object.assign({},Ci(),e)}function Ri(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Uf=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Oi(typeof t!="number"?t:Ri(t,Yn))};function Gf(e){var t,n=e.state,r=e.name,o=e.options,a=n.elements.arrow,s=n.modifiersData.popperOffsets,l=Ze(n.placement),c=Ho(l),f=[Me,We].indexOf(l)>=0,m=f?"height":"width";if(!(!a||!s)){var v=Uf(o.padding,n),g=zo(a),u=c==="y"?_e:Me,h=c==="y"?qe:We,d=n.rects.reference[m]+n.rects.reference[c]-s[c]-n.rects.popper[m],b=s[c]-n.rects.reference[c],x=Kn(a),R=x?c==="y"?x.clientHeight||0:x.clientWidth||0:0,w=d/2-b/2,k=v[u],y=R-g[m]-v[h],S=R/2-g[m]/2+w,O=Rn(k,S,y),M=c;n.modifiersData[r]=(t={},t[M]=O,t.centerOffset=O-S,t)}}function qf(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Si(t.elements.popper,o)&&(t.elements.arrow=o))}const Wf={name:"arrow",enabled:!0,phase:"main",fn:Gf,effect:qf,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function on(e){return e.split("-")[1]}var Xf={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Yf(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:nn(n*o)/o||0,y:nn(r*o)/o||0}}function Ja(e){var t,n=e.popper,r=e.popperRect,o=e.placement,a=e.variation,s=e.offsets,l=e.position,c=e.gpuAcceleration,f=e.adaptive,m=e.roundOffsets,v=e.isFixed,g=s.x,u=g===void 0?0:g,h=s.y,d=h===void 0?0:h,b=typeof m=="function"?m({x:u,y:d}):{x:u,y:d};u=b.x,d=b.y;var x=s.hasOwnProperty("x"),R=s.hasOwnProperty("y"),w=Me,k=_e,y=window;if(f){var S=Kn(n),O="clientHeight",M="clientWidth";if(S===Fe(n)&&(S=Et(n),dt(S).position!=="static"&&l==="absolute"&&(O="scrollHeight",M="scrollWidth")),S=S,o===_e||(o===Me||o===We)&&a===Dn){k=qe;var D=v&&S===y&&y.visualViewport?y.visualViewport.height:S[O];d-=D-r.height,d*=c?1:-1}if(o===Me||(o===_e||o===qe)&&a===Dn){w=We;var L=v&&S===y&&y.visualViewport?y.visualViewport.width:S[M];u-=L-r.width,u*=c?1:-1}}var E=Object.assign({position:l},f&&Xf),P=m===!0?Yf({x:u,y:d},Fe(n)):{x:u,y:d};if(u=P.x,d=P.y,c){var $;return Object.assign({},E,($={},$[k]=R?"0":"",$[w]=x?"0":"",$.transform=(y.devicePixelRatio||1)<=1?"translate("+u+"px, "+d+"px)":"translate3d("+u+"px, "+d+"px, 0)",$))}return Object.assign({},E,(t={},t[k]=R?d+"px":"",t[w]=x?u+"px":"",t.transform="",t))}function Kf(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,a=n.adaptive,s=a===void 0?!0:a,l=n.roundOffsets,c=l===void 0?!0:l,f={placement:Ze(t.placement),variation:on(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Ja(Object.assign({},f,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Ja(Object.assign({},f,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Jf={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Kf,data:{}};var rr={passive:!0};function Zf(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,a=o===void 0?!0:o,s=r.resize,l=s===void 0?!0:s,c=Fe(t.elements.popper),f=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&f.forEach(function(m){m.addEventListener("scroll",n.update,rr)}),l&&c.addEventListener("resize",n.update,rr),function(){a&&f.forEach(function(m){m.removeEventListener("scroll",n.update,rr)}),l&&c.removeEventListener("resize",n.update,rr)}}const Qf={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Zf,data:{}};var em={left:"right",right:"left",bottom:"top",top:"bottom"};function lr(e){return e.replace(/left|right|bottom|top/g,function(t){return em[t]})}var tm={start:"end",end:"start"};function Za(e){return e.replace(/start|end/g,function(t){return tm[t]})}function Uo(e){var t=Fe(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Go(e){return rn(Et(e)).left+Uo(e).scrollLeft}function nm(e,t){var n=Fe(e),r=Et(e),o=n.visualViewport,a=r.clientWidth,s=r.clientHeight,l=0,c=0;if(o){a=o.width,s=o.height;var f=Ni();(f||!f&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:a,height:s,x:l+Go(e),y:c}}function rm(e){var t,n=Et(e),r=Uo(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=_t(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=_t(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Go(e),c=-r.scrollTop;return dt(o||n).direction==="rtl"&&(l+=_t(n.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:l,y:c}}function qo(e){var t=dt(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Pi(e){return["html","body","#document"].indexOf(tt(e))>=0?e.ownerDocument.body:Ue(e)&&qo(e)?e:Pi($r(e))}function Pn(e,t){var n;t===void 0&&(t=[]);var r=Pi(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),a=Fe(r),s=o?[a].concat(a.visualViewport||[],qo(r)?r:[]):r,l=t.concat(s);return o?l:l.concat(Pn($r(s)))}function uo(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function om(e,t){var n=rn(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Qa(e,t,n){return t===Ei?uo(nm(e,n)):Lt(t)?om(t,n):uo(rm(Et(e)))}function am(e){var t=Pn($r(e)),n=["absolute","fixed"].indexOf(dt(e).position)>=0,r=n&&Ue(e)?Kn(e):e;return Lt(r)?t.filter(function(o){return Lt(o)&&Si(o,r)&&tt(o)!=="body"}):[]}function sm(e,t,n,r){var o=t==="clippingParents"?am(e):[].concat(t),a=[].concat(o,[n]),s=a[0],l=a.reduce(function(c,f){var m=Qa(e,f,r);return c.top=_t(m.top,c.top),c.right=gr(m.right,c.right),c.bottom=gr(m.bottom,c.bottom),c.left=_t(m.left,c.left),c},Qa(e,s,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function ji(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ze(r):null,a=r?on(r):null,s=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case _e:c={x:s,y:t.y-n.height};break;case qe:c={x:s,y:t.y+t.height};break;case We:c={x:t.x+t.width,y:l};break;case Me:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var f=o?Ho(o):null;if(f!=null){var m=f==="y"?"height":"width";switch(a){case tn:c[f]=c[f]-(t[m]/2-n[m]/2);break;case Dn:c[f]=c[f]+(t[m]/2-n[m]/2);break}}return c}function Bn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,a=n.strategy,s=a===void 0?e.strategy:a,l=n.boundary,c=l===void 0?Sf:l,f=n.rootBoundary,m=f===void 0?Ei:f,v=n.elementContext,g=v===void 0?bn:v,u=n.altBoundary,h=u===void 0?!1:u,d=n.padding,b=d===void 0?0:d,x=Oi(typeof b!="number"?b:Ri(b,Yn)),R=g===bn?Cf:bn,w=e.rects.popper,k=e.elements[h?R:g],y=sm(Lt(k)?k:k.contextElement||Et(e.elements.popper),c,m,s),S=rn(e.elements.reference),O=ji({reference:S,element:w,strategy:"absolute",placement:o}),M=uo(Object.assign({},w,O)),D=g===bn?M:S,L={top:y.top-D.top+x.top,bottom:D.bottom-y.bottom+x.bottom,left:y.left-D.left+x.left,right:D.right-y.right+x.right},E=e.modifiersData.offset;if(g===bn&&E){var P=E[o];Object.keys(L).forEach(function($){var F=[We,qe].indexOf($)>=0?1:-1,H=[_e,qe].indexOf($)>=0?"y":"x";L[$]+=P[H]*F})}return L}function im(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,a=n.rootBoundary,s=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,f=c===void 0?Ti:c,m=on(r),v=m?l?Ya:Ya.filter(function(h){return on(h)===m}):Yn,g=v.filter(function(h){return f.indexOf(h)>=0});g.length===0&&(g=v);var u=g.reduce(function(h,d){return h[d]=Bn(e,{placement:d,boundary:o,rootBoundary:a,padding:s})[Ze(d)],h},{});return Object.keys(u).sort(function(h,d){return u[h]-u[d]})}function lm(e){if(Ze(e)===Vo)return[];var t=lr(e);return[Za(e),t,Za(t)]}function cm(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,a=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!0:s,c=n.fallbackPlacements,f=n.padding,m=n.boundary,v=n.rootBoundary,g=n.altBoundary,u=n.flipVariations,h=u===void 0?!0:u,d=n.allowedAutoPlacements,b=t.options.placement,x=Ze(b),R=x===b,w=c||(R||!h?[lr(b)]:lm(b)),k=[b].concat(w).reduce(function(G,W){return G.concat(Ze(W)===Vo?im(t,{placement:W,boundary:m,rootBoundary:v,padding:f,flipVariations:h,allowedAutoPlacements:d}):W)},[]),y=t.rects.reference,S=t.rects.popper,O=new Map,M=!0,D=k[0],L=0;L<k.length;L++){var E=k[L],P=Ze(E),$=on(E)===tn,F=[_e,qe].indexOf(P)>=0,H=F?"width":"height",_=Bn(t,{placement:E,boundary:m,rootBoundary:v,altBoundary:g,padding:f}),z=F?$?We:Me:$?qe:_e;y[H]>S[H]&&(z=lr(z));var Z=lr(z),J=[];if(a&&J.push(_[P]<=0),l&&J.push(_[z]<=0,_[Z]<=0),J.every(function(G){return G})){D=E,M=!1;break}O.set(E,J)}if(M)for(var C=h?3:1,A=function(W){var Y=k.find(function(K){var X=O.get(K);if(X)return X.slice(0,W).every(function(Q){return Q})});if(Y)return D=Y,"break"},U=C;U>0;U--){var q=A(U);if(q==="break")break}t.placement!==D&&(t.modifiersData[r]._skip=!0,t.placement=D,t.reset=!0)}}const pm={name:"flip",enabled:!0,phase:"main",fn:cm,requiresIfExists:["offset"],data:{_skip:!1}};function es(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ts(e){return[_e,We,qe,Me].some(function(t){return e[t]>=0})}function um(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,s=Bn(t,{elementContext:"reference"}),l=Bn(t,{altBoundary:!0}),c=es(s,r),f=es(l,o,a),m=ts(c),v=ts(f);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:f,isReferenceHidden:m,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":m,"data-popper-escaped":v})}const dm={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:um};function fm(e,t,n){var r=Ze(e),o=[Me,_e].indexOf(r)>=0?-1:1,a=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,s=a[0],l=a[1];return s=s||0,l=(l||0)*o,[Me,We].indexOf(r)>=0?{x:l,y:s}:{x:s,y:l}}function mm(e){var t=e.state,n=e.options,r=e.name,o=n.offset,a=o===void 0?[0,0]:o,s=Ti.reduce(function(m,v){return m[v]=fm(v,t.rects,a),m},{}),l=s[t.placement],c=l.x,f=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=f),t.modifiersData[r]=s}const hm={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:mm};function gm(e){var t=e.state,n=e.name;t.modifiersData[n]=ji({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const bm={name:"popperOffsets",enabled:!0,phase:"read",fn:gm,data:{}};function vm(e){return e==="x"?"y":"x"}function ym(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,a=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!1:s,c=n.boundary,f=n.rootBoundary,m=n.altBoundary,v=n.padding,g=n.tether,u=g===void 0?!0:g,h=n.tetherOffset,d=h===void 0?0:h,b=Bn(t,{boundary:c,rootBoundary:f,padding:v,altBoundary:m}),x=Ze(t.placement),R=on(t.placement),w=!R,k=Ho(x),y=vm(k),S=t.modifiersData.popperOffsets,O=t.rects.reference,M=t.rects.popper,D=typeof d=="function"?d(Object.assign({},t.rects,{placement:t.placement})):d,L=typeof D=="number"?{mainAxis:D,altAxis:D}:Object.assign({mainAxis:0,altAxis:0},D),E=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,P={x:0,y:0};if(S){if(a){var $,F=k==="y"?_e:Me,H=k==="y"?qe:We,_=k==="y"?"height":"width",z=S[k],Z=z+b[F],J=z-b[H],C=u?-M[_]/2:0,A=R===tn?O[_]:M[_],U=R===tn?-M[_]:-O[_],q=t.elements.arrow,G=u&&q?zo(q):{width:0,height:0},W=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Ci(),Y=W[F],K=W[H],X=Rn(0,O[_],G[_]),Q=w?O[_]/2-C-X-Y-L.mainAxis:A-X-Y-L.mainAxis,ee=w?-O[_]/2+C+X+K+L.mainAxis:U+X+K+L.mainAxis,ae=t.elements.arrow&&Kn(t.elements.arrow),B=ae?k==="y"?ae.clientTop||0:ae.clientLeft||0:0,te=($=E==null?void 0:E[k])!=null?$:0,I=z+Q-te-B,se=z+ee-te,Ee=Rn(u?gr(Z,I):Z,z,u?_t(J,se):J);S[k]=Ee,P[k]=Ee-z}if(l){var Pe,we=k==="x"?_e:Me,Tt=k==="x"?qe:We,je=S[y],ot=y==="y"?"height":"width",De=je+b[we],at=je-b[Tt],Te=[_e,Me].indexOf(x)!==-1,Vt=(Pe=E==null?void 0:E[y])!=null?Pe:0,Nt=Te?De:je-O[ot]-M[ot]-Vt+L.altAxis,cn=Te?je+O[ot]+M[ot]-Vt-L.altAxis:at,Zn=u&&Te?Hf(Nt,je,cn):Rn(u?Nt:De,je,u?cn:at);S[y]=Zn,P[y]=Zn-je}t.modifiersData[r]=P}}const wm={name:"preventOverflow",enabled:!0,phase:"main",fn:ym,requiresIfExists:["offset"]};function xm(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function km(e){return e===Fe(e)||!Ue(e)?Uo(e):xm(e)}function Em(e){var t=e.getBoundingClientRect(),n=nn(t.width)/e.offsetWidth||1,r=nn(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Tm(e,t,n){n===void 0&&(n=!1);var r=Ue(t),o=Ue(t)&&Em(t),a=Et(t),s=rn(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((tt(t)!=="body"||qo(a))&&(l=km(t)),Ue(t)?(c=rn(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):a&&(c.x=Go(a))),{x:s.left+l.scrollLeft-c.x,y:s.top+l.scrollTop-c.y,width:s.width,height:s.height}}function Nm(e){var t=new Map,n=new Set,r=[];e.forEach(function(a){t.set(a.name,a)});function o(a){n.add(a.name);var s=[].concat(a.requires||[],a.requiresIfExists||[]);s.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(a)}return e.forEach(function(a){n.has(a.name)||o(a)}),r}function Sm(e){var t=Nm(e);return Df.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Cm(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Om(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var ns={placement:"bottom",modifiers:[],strategy:"absolute"};function rs(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Rm(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,a=o===void 0?ns:o;return function(l,c,f){f===void 0&&(f=a);var m={placement:"bottom",orderedModifiers:[],options:Object.assign({},ns,a),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},v=[],g=!1,u={state:m,setOptions:function(x){var R=typeof x=="function"?x(m.options):x;d(),m.options=Object.assign({},a,m.options,R),m.scrollParents={reference:Lt(l)?Pn(l):l.contextElement?Pn(l.contextElement):[],popper:Pn(c)};var w=Sm(Om([].concat(r,m.options.modifiers)));return m.orderedModifiers=w.filter(function(k){return k.enabled}),h(),u.update()},forceUpdate:function(){if(!g){var x=m.elements,R=x.reference,w=x.popper;if(rs(R,w)){m.rects={reference:Tm(R,Kn(w),m.options.strategy==="fixed"),popper:zo(w)},m.reset=!1,m.placement=m.options.placement,m.orderedModifiers.forEach(function(L){return m.modifiersData[L.name]=Object.assign({},L.data)});for(var k=0;k<m.orderedModifiers.length;k++){if(m.reset===!0){m.reset=!1,k=-1;continue}var y=m.orderedModifiers[k],S=y.fn,O=y.options,M=O===void 0?{}:O,D=y.name;typeof S=="function"&&(m=S({state:m,options:M,name:D,instance:u})||m)}}}},update:Cm(function(){return new Promise(function(b){u.forceUpdate(),b(m)})}),destroy:function(){d(),g=!0}};if(!rs(l,c))return u;u.setOptions(f).then(function(b){!g&&f.onFirstUpdate&&f.onFirstUpdate(b)});function h(){m.orderedModifiers.forEach(function(b){var x=b.name,R=b.options,w=R===void 0?{}:R,k=b.effect;if(typeof k=="function"){var y=k({state:m,name:x,instance:u,options:w}),S=function(){};v.push(y||S)}})}function d(){v.forEach(function(b){return b()}),v=[]}return u}}var Pm=[Qf,bm,Jf,Vf,hm,pm,wm,Wf,dm],jm=Rm({defaultModifiers:Pm});const $i="Popper";function $m(e){return ki($i,e)}cf($i,["root"]);const _m=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Mm=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Im(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function br(e){return typeof e=="function"?e():e}function _r(e){return e.nodeType!==void 0}function Am(e){return!_r(e)}const Dm=()=>ft({root:["root"]},nf($m)),Bm={},Lm=N.forwardRef(function(t,n){var r;const{anchorEl:o,children:a,direction:s,disablePortal:l,modifiers:c,open:f,placement:m,popperOptions:v,popperRef:g,slotProps:u={},slots:h={},TransitionProps:d}=t,b=me(t,_m),x=N.useRef(null),R=Ge(x,n),w=N.useRef(null),k=Ge(w,g),y=N.useRef(k);At(()=>{y.current=k},[k]),N.useImperativeHandle(g,()=>w.current,[]);const S=Im(m,s),[O,M]=N.useState(S),[D,L]=N.useState(br(o));N.useEffect(()=>{w.current&&w.current.forceUpdate()}),N.useEffect(()=>{o&&L(br(o))},[o]),At(()=>{if(!D||!f)return;const H=Z=>{M(Z.placement)};if(process.env.NODE_ENV!=="production"&&D&&_r(D)&&D.nodeType===1){const Z=D.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Z.top===0&&Z.left===0&&Z.right===0&&Z.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let _=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:Z})=>{H(Z)}}];c!=null&&(_=_.concat(c)),v&&v.modifiers!=null&&(_=_.concat(v.modifiers));const z=jm(D,x.current,j({placement:S},v,{modifiers:_}));return y.current(z),()=>{z.destroy(),y.current(null)}},[D,l,c,f,v,S]);const E={placement:O};d!==null&&(E.TransitionProps=d);const P=Dm(),$=(r=h.root)!=null?r:"div",F=Bt({elementType:$,externalSlotProps:u.root,externalForwardedProps:b,additionalProps:{role:"tooltip",ref:R},ownerState:t,className:P.root});return p.jsx($,j({},F,{children:typeof a=="function"?a(E):a}))}),_i=N.forwardRef(function(t,n){const{anchorEl:r,children:o,container:a,direction:s="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:f,open:m,placement:v="bottom",popperOptions:g=Bm,popperRef:u,style:h,transition:d=!1,slotProps:b={},slots:x={}}=t,R=me(t,Mm),[w,k]=N.useState(!0),y=()=>{k(!1)},S=()=>{k(!0)};if(!c&&!m&&(!d||w))return null;let O;if(a)O=a;else if(r){const L=br(r);O=L&&_r(L)?Oe(L).body:Oe(null).body}const M=!m&&c&&(!d||w)?"none":void 0,D=d?{in:m,onEnter:y,onExited:S}:void 0;return p.jsx(An,{disablePortal:l,container:O,children:p.jsx(Lm,j({anchorEl:r,direction:s,disablePortal:l,modifiers:f,ref:n,open:d?!w:m,placement:v,popperOptions:g,popperRef:u,slotProps:b,slots:x},R,{style:j({position:"fixed",top:0,left:0,display:M},h),TransitionProps:D,children:o}))})});process.env.NODE_ENV!=="production"&&(_i.propTypes={anchorEl:ln(i.oneOfType([pt,i.object,i.func]),e=>{if(e.open){const t=br(e.anchorEl);if(t&&_r(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Am(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:i.oneOfType([i.node,i.func]),container:i.oneOfType([pt,i.func]),direction:i.oneOf(["ltr","rtl"]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:Po,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),transition:i.bool});function Jn(){const e=hi(Do);return process.env.NODE_ENV!=="production"&&N.useDebugValue(e),e[Bo]||e}function fo(e,t){return fo=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},fo(e,t)}function Vm(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,fo(e,t)}const os={disabled:!1};var Fm=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.shape({enter:i.number,exit:i.number,appear:i.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&i.oneOfType([i.string,i.shape({enter:i.string,exit:i.string,active:i.string}),i.shape({enter:i.string,enterDone:i.string,enterActive:i.string,exit:i.string,exitDone:i.string,exitActive:i.string})]);const Mi=T.createContext(null);var zm=function(t){return t.scrollTop},Nn="unmounted",Ct="exited",Ot="entering",Xt="entered",mo="exiting",ht=function(e){Vm(t,e);function t(r,o){var a;a=e.call(this,r,o)||this;var s=o,l=s&&!s.isMounting?r.enter:r.appear,c;return a.appearStatus=null,r.in?l?(c=Ct,a.appearStatus=Ot):c=Xt:r.unmountOnExit||r.mountOnEnter?c=Nn:c=Ct,a.state={status:c},a.nextCallback=null,a}t.getDerivedStateFromProps=function(o,a){var s=o.in;return s&&a.status===Nn?{status:Ct}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var a=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==Ot&&s!==Xt&&(a=Ot):(s===Ot||s===Xt)&&(a=mo)}this.updateStatus(!1,a)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,a,s,l;return a=s=l=o,o!=null&&typeof o!="number"&&(a=o.exit,s=o.enter,l=o.appear!==void 0?o.appear:s),{exit:a,enter:s,appear:l}},n.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===Ot){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:xn.findDOMNode(this);s&&zm(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Ct&&this.setState({status:Nn})},n.performEnter=function(o){var a=this,s=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[xn.findDOMNode(this),l],f=c[0],m=c[1],v=this.getTimeouts(),g=l?v.appear:v.enter;if(!o&&!s||os.disabled){this.safeSetState({status:Xt},function(){a.props.onEntered(f)});return}this.props.onEnter(f,m),this.safeSetState({status:Ot},function(){a.props.onEntering(f,m),a.onTransitionEnd(g,function(){a.safeSetState({status:Xt},function(){a.props.onEntered(f,m)})})})},n.performExit=function(){var o=this,a=this.props.exit,s=this.getTimeouts(),l=this.props.nodeRef?void 0:xn.findDOMNode(this);if(!a||os.disabled){this.safeSetState({status:Ct},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:mo},function(){o.props.onExiting(l),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:Ct},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},n.setNextCallback=function(o){var a=this,s=!0;return this.nextCallback=function(l){s&&(s=!1,a.nextCallback=null,o(l))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},n.onTransitionEnd=function(o,a){this.setNextCallback(a);var s=this.props.nodeRef?this.props.nodeRef.current:xn.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!s||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],f=c[0],m=c[1];this.props.addEndListener(f,m)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===Nn)return null;var a=this.props,s=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var l=me(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return T.createElement(Mi.Provider,{value:null},typeof s=="function"?s(o,l):T.cloneElement(T.Children.only(s),l))},t}(T.Component);ht.contextType=Mi;ht.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:i.shape({current:typeof Element>"u"?i.any:function(e,t,n,r,o,a){var s=e[t];return i.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,a)}}),children:i.oneOfType([i.func.isRequired,i.element.isRequired]).isRequired,in:i.bool,mountOnEnter:i.bool,unmountOnExit:i.bool,appear:i.bool,enter:i.bool,exit:i.bool,timeout:function(t){var n=Fm;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),a=1;a<r;a++)o[a-1]=arguments[a];return n.apply(void 0,[t].concat(o))},addEndListener:i.func,onEnter:i.func,onEntering:i.func,onEntered:i.func,onExit:i.func,onExiting:i.func,onExited:i.func}:{};function qt(){}ht.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:qt,onEntering:qt,onEntered:qt,onExit:qt,onExiting:qt,onExited:qt};ht.UNMOUNTED=Nn;ht.EXITED=Ct;ht.ENTERING=Ot;ht.ENTERED=Xt;ht.EXITING=mo;const Ii=ht,Ai=e=>e.scrollTop;function vr(e,t){var n,r;const{timeout:o,easing:a,style:s={}}=e;return{duration:(n=s.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof a=="object"?a[t.mode]:a,delay:s.transitionDelay}}const Hm=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function ho(e){return`scale(${e}, ${e**2})`}const Um={entering:{opacity:1,transform:ho(1)},entered:{opacity:1,transform:"none"}},Yr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Wo=N.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:a,easing:s,in:l,onEnter:c,onEntered:f,onEntering:m,onExit:v,onExited:g,onExiting:u,style:h,timeout:d="auto",TransitionComponent:b=Ii}=t,x=me(t,Hm),R=En(),w=N.useRef(),k=Jn(),y=N.useRef(null),S=Ge(y,a.ref,n),O=H=>_=>{if(H){const z=y.current;_===void 0?H(z):H(z,_)}},M=O(m),D=O((H,_)=>{Ai(H);const{duration:z,delay:Z,easing:J}=vr({style:h,timeout:d,easing:s},{mode:"enter"});let C;d==="auto"?(C=k.transitions.getAutoHeightDuration(H.clientHeight),w.current=C):C=z,H.style.transition=[k.transitions.create("opacity",{duration:C,delay:Z}),k.transitions.create("transform",{duration:Yr?C:C*.666,delay:Z,easing:J})].join(","),c&&c(H,_)}),L=O(f),E=O(u),P=O(H=>{const{duration:_,delay:z,easing:Z}=vr({style:h,timeout:d,easing:s},{mode:"exit"});let J;d==="auto"?(J=k.transitions.getAutoHeightDuration(H.clientHeight),w.current=J):J=_,H.style.transition=[k.transitions.create("opacity",{duration:J,delay:z}),k.transitions.create("transform",{duration:Yr?J:J*.666,delay:Yr?z:z||J*.333,easing:Z})].join(","),H.style.opacity=0,H.style.transform=ho(.75),v&&v(H)}),$=O(g),F=H=>{d==="auto"&&R.start(w.current||0,H),r&&r(y.current,H)};return p.jsx(b,j({appear:o,in:l,nodeRef:y,onEnter:D,onEntered:L,onEntering:M,onExit:P,onExited:$,onExiting:E,addEndListener:F,timeout:d==="auto"?null:d},x,{children:(H,_)=>N.cloneElement(a,j({style:j({opacity:0,transform:ho(.75),visibility:H==="exited"&&!l?"hidden":void 0},Um[H],h,a.props.style),ref:S},_))}))});process.env.NODE_ENV!=="production"&&(Wo.propTypes={addEndListener:i.func,appear:i.bool,children:Gn.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});Wo.muiSupportAuto=!0;const go=Wo,Gm=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},as=Gm,qm=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Wm=Re(_i,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Di=N.forwardRef(function(t,n){var r;const o=mi(),a=mt({props:t,name:"MuiPopper"}),{anchorEl:s,component:l,components:c,componentsProps:f,container:m,disablePortal:v,keepMounted:g,modifiers:u,open:h,placement:d,popperOptions:b,popperRef:x,transition:R,slots:w,slotProps:k}=a,y=me(a,qm),S=(r=w==null?void 0:w.root)!=null?r:c==null?void 0:c.Root,O=j({anchorEl:s,container:m,disablePortal:v,keepMounted:g,modifiers:u,open:h,placement:d,popperOptions:b,popperRef:x,transition:R},y);return p.jsx(Wm,j({as:l,direction:o==null?void 0:o.direction,slots:{root:S},slotProps:k??f},O,{ref:n}))});process.env.NODE_ENV!=="production"&&(Di.propTypes={anchorEl:i.oneOfType([pt,i.object,i.func]),children:i.oneOfType([i.node,i.func]),component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:Po,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transition:i.bool});const Bi=Di;function Xm(e){return rt("MuiTooltip",e)}const Ym=xt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),wt=Ym,Km=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Jm(e){return Math.round(e*1e5)/1e5}const Zm=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:a}=e,s={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${et(a.split("-")[0])}`],arrow:["arrow"]};return ft(s,Xm,t)},Qm=Re(Bi,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>j({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${wt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${wt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${wt.arrow}`]:j({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${wt.arrow}`]:j({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),eh=Re("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${et(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>j({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:mr(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Jm(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${wt.popper}[data-popper-placement*="left"] &`]:j({transformOrigin:"right center"},t.isRtl?j({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):j({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${wt.popper}[data-popper-placement*="right"] &`]:j({transformOrigin:"left center"},t.isRtl?j({marginRight:"14px"},t.touch&&{marginRight:"24px"}):j({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${wt.popper}[data-popper-placement*="top"] &`]:j({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${wt.popper}[data-popper-placement*="bottom"] &`]:j({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),th=Re("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:mr(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let or=!1;const ss=new qn;let vn={x:0,y:0};function ar(e,t){return n=>{t&&t(n),e(n)}}const Li=N.forwardRef(function(t,n){var r,o,a,s,l,c,f,m,v,g,u,h,d,b,x,R,w,k,y;const S=mt({props:t,name:"MuiTooltip"}),{arrow:O=!1,children:M,components:D={},componentsProps:L={},describeChild:E=!1,disableFocusListener:P=!1,disableHoverListener:$=!1,disableInteractive:F=!1,disableTouchListener:H=!1,enterDelay:_=100,enterNextDelay:z=0,enterTouchDelay:Z=700,followCursor:J=!1,id:C,leaveDelay:A=0,leaveTouchDelay:U=1500,onClose:q,onOpen:G,open:W,placement:Y="bottom",PopperComponent:K,PopperProps:X={},slotProps:Q={},slots:ee={},title:ae,TransitionComponent:B=go,TransitionProps:te}=S,I=me(S,Km),se=N.isValidElement(M)?M:p.jsx("span",{children:M}),Ee=Jn(),Pe=Ee.direction==="rtl",[we,Tt]=N.useState(),[je,ot]=N.useState(null),De=N.useRef(!1),at=F||J,Te=En(),Vt=En(),Nt=En(),cn=En(),[Zn,Qo]=ni({controlled:W,default:!1,name:"Tooltip",state:"open"});let st=Zn;if(process.env.NODE_ENV!=="production"){const{current:ne}=N.useRef(W!==void 0);N.useEffect(()=>{we&&we.disabled&&!ne&&ae!==""&&we.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ae,we,ne])}const Mr=ti(C),pn=N.useRef(),Qn=Mn(()=>{pn.current!==void 0&&(document.body.style.WebkitUserSelect=pn.current,pn.current=void 0),cn.clear()});N.useEffect(()=>Qn,[Qn]);const ea=ne=>{ss.clear(),or=!0,Qo(!0),G&&!st&&G(ne)},er=Mn(ne=>{ss.start(800+A,()=>{or=!1}),Qo(!1),q&&st&&q(ne),Te.start(Ee.transitions.duration.shortest,()=>{De.current=!1})}),Ir=ne=>{De.current&&ne.type!=="touchstart"||(we&&we.removeAttribute("title"),Vt.clear(),Nt.clear(),_||or&&z?Vt.start(or?z:_,()=>{ea(ne)}):ea(ne))},ta=ne=>{Vt.clear(),Nt.start(A,()=>{er(ne)})},{isFocusVisibleRef:na,onBlur:Vl,onFocus:Fl,ref:zl}=ri(),[,ra]=N.useState(!1),oa=ne=>{Vl(ne),na.current===!1&&(ra(!1),ta(ne))},aa=ne=>{we||Tt(ne.currentTarget),Fl(ne),na.current===!0&&(ra(!0),Ir(ne))},sa=ne=>{De.current=!0;const Be=se.props;Be.onTouchStart&&Be.onTouchStart(ne)},ia=Ir,la=ta,Hl=ne=>{sa(ne),Nt.clear(),Te.clear(),Qn(),pn.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",cn.start(Z,()=>{document.body.style.WebkitUserSelect=pn.current,Ir(ne)})},Ul=ne=>{se.props.onTouchEnd&&se.props.onTouchEnd(ne),Qn(),Nt.start(U,()=>{er(ne)})};N.useEffect(()=>{if(!st)return;function ne(Be){(Be.key==="Escape"||Be.key==="Esc")&&er(Be)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[er,st]);const Gl=Ge(se.ref,zl,Tt,n);!ae&&ae!==0&&(st=!1);const Ar=N.useRef(),ql=ne=>{const Be=se.props;Be.onMouseMove&&Be.onMouseMove(ne),vn={x:ne.clientX,y:ne.clientY},Ar.current&&Ar.current.update()},un={},Dr=typeof ae=="string";E?(un.title=!st&&Dr&&!$?ae:null,un["aria-describedby"]=st?Mr:null):(un["aria-label"]=Dr?ae:null,un["aria-labelledby"]=st&&!Dr?Mr:null);const ze=j({},un,I,se.props,{className:Se(I.className,se.props.className),onTouchStart:sa,ref:Gl},J?{onMouseMove:ql}:{});process.env.NODE_ENV!=="production"&&(ze["data-mui-internal-clone-element"]=!0,N.useEffect(()=>{we&&!we.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[we]));const dn={};H||(ze.onTouchStart=Hl,ze.onTouchEnd=Ul),$||(ze.onMouseOver=ar(ia,ze.onMouseOver),ze.onMouseLeave=ar(la,ze.onMouseLeave),at||(dn.onMouseOver=ia,dn.onMouseLeave=la)),P||(ze.onFocus=ar(aa,ze.onFocus),ze.onBlur=ar(oa,ze.onBlur),at||(dn.onFocus=aa,dn.onBlur=oa)),process.env.NODE_ENV!=="production"&&se.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));const Wl=N.useMemo(()=>{var ne;let Be=[{name:"arrow",enabled:!!je,options:{element:je,padding:4}}];return(ne=X.popperOptions)!=null&&ne.modifiers&&(Be=Be.concat(X.popperOptions.modifiers)),j({},X.popperOptions,{modifiers:Be})},[je,X]),fn=j({},S,{isRtl:Pe,arrow:O,disableInteractive:at,placement:Y,PopperComponentProp:K,touch:De.current}),Br=Zm(fn),ca=(r=(o=ee.popper)!=null?o:D.Popper)!=null?r:Qm,pa=(a=(s=(l=ee.transition)!=null?l:D.Transition)!=null?s:B)!=null?a:go,ua=(c=(f=ee.tooltip)!=null?f:D.Tooltip)!=null?c:eh,da=(m=(v=ee.arrow)!=null?v:D.Arrow)!=null?m:th,Xl=Tn(ca,j({},X,(g=Q.popper)!=null?g:L.popper,{className:Se(Br.popper,X==null?void 0:X.className,(u=(h=Q.popper)!=null?h:L.popper)==null?void 0:u.className)}),fn),Yl=Tn(pa,j({},te,(d=Q.transition)!=null?d:L.transition),fn),Kl=Tn(ua,j({},(b=Q.tooltip)!=null?b:L.tooltip,{className:Se(Br.tooltip,(x=(R=Q.tooltip)!=null?R:L.tooltip)==null?void 0:x.className)}),fn),Jl=Tn(da,j({},(w=Q.arrow)!=null?w:L.arrow,{className:Se(Br.arrow,(k=(y=Q.arrow)!=null?y:L.arrow)==null?void 0:k.className)}),fn);return p.jsxs(N.Fragment,{children:[N.cloneElement(se,ze),p.jsx(ca,j({as:K??Bi,placement:Y,anchorEl:J?{getBoundingClientRect:()=>({top:vn.y,left:vn.x,right:vn.x,bottom:vn.y,width:0,height:0})}:we,popperRef:Ar,open:we?st:!1,id:Mr,transition:!0},dn,Xl,{popperOptions:Wl,children:({TransitionProps:ne})=>p.jsx(pa,j({timeout:Ee.transitions.duration.shorter},ne,Yl,{children:p.jsxs(ua,j({},Kl,{children:[ae,O?p.jsx(da,j({},Jl,{ref:ot})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Li.propTypes={arrow:i.bool,children:Gn.isRequired,classes:i.object,className:i.string,components:i.shape({Arrow:i.elementType,Popper:i.elementType,Tooltip:i.elementType,Transition:i.elementType}),componentsProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),describeChild:i.bool,disableFocusListener:i.bool,disableHoverListener:i.bool,disableInteractive:i.bool,disableTouchListener:i.bool,enterDelay:i.number,enterNextDelay:i.number,enterTouchDelay:i.number,followCursor:i.bool,id:i.string,leaveDelay:i.number,leaveTouchDelay:i.number,onClose:i.func,onOpen:i.func,open:i.bool,placement:i.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:i.elementType,PopperProps:i.object,slotProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),slots:i.shape({arrow:i.elementType,popper:i.elementType,tooltip:i.elementType,transition:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),title:i.node,TransitionComponent:i.elementType,TransitionProps:i.object});const nh=Li;function is(e,t,n){return e?p.jsx(ke.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:p.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Xo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:s=void 0,hasAutoFocus:l=!1,className:c,isDisabled:f=!1,isDense:m=!0,isSubMenuParent:v=!1,hasDisabledGutters:g=!1,hasDivider:u=!1,focusVisibleClassName:h,id:d,children:b}=e,x=p.jsx(ke.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:f,dense:m,disableGutters:g,divider:u,focusVisibleClassName:h,onClick:t,id:d,children:n?p.jsxs(p.Fragment,{children:[is(a,n,!0),p.jsx(ke.ListItemText,{primary:n,inset:!a&&o}),v?p.jsx(ke.ListItemIcon,{className:"papi-menu-icon-trailing",children:p.jsx(vi,{})}):is(s,n,!1)]}):b});return r?p.jsx(nh,{title:r,placement:"right",children:p.jsx("div",{children:x})}):x}function Vi(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function rh(e){const[t,n]=T.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:a}=e,s=f=>{n(f.currentTarget)},l=()=>{n(void 0)},c=()=>{let f=Vi(a).filter(m=>"menuItem"in m.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return f=f.filter(m=>"menuItem"in m.group&&m.group.menuItem===r.id),p.jsx(Yo,{...e,includedGroups:f})};return p.jsxs(p.Fragment,{children:[p.jsx(Xo,{onClick:s,...o,isSubMenuParent:!0}),p.jsx(ke.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const oh=(e,t)=>t.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function Yo(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:a,allowForLeadingIcons:s}=T.useMemo(()=>{const m=o&&o.length>0?o:Vi(t).filter(h=>!("menuItem"in h.group)),v=Object.values(m).sort((h,d)=>(h.group.order||0)-(d.group.order||0)),g=[];v.forEach(h=>{oh(h.id,t.items).forEach(d=>g.push({item:d,isLastItemInGroup:!1})),g.length>0&&(g[g.length-1].isLastItemInGroup=!0)}),g.length>0&&(g[g.length-1].isLastItemInGroup=!1);const u=g.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:g,allowForLeadingIcons:u}},[o,t]),l=({item:m,isLastItemInGroup:v})=>({className:"papi-menu-item",label:m.label,tooltip:m.tooltip,iconPathBefore:"iconPathBefore"in m?m.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in m?m.iconPathAfter:void 0,hasDivider:v,allowForLeadingIcons:s}),[c]=a;if(!c)return p.jsx("div",{});const f=c.item.group;return p.jsx("div",{role:"menu","aria-label":f,children:a.map((m,v)=>{const{item:g}=m,u=l(m);if("command"in g){const h=g.group+v;return p.jsx(Xo,{onClick:d=>{n==null||n(d),r(g)},...u},h)}return p.jsx(rh,{parentMenuItem:g,parentItemProps:u,...e},f+g.id)})},f)}function ah(e){const{menuDefinition:t,columnId:n}=e;let a=Object.entries(t.groups).map(([s,l])=>({id:s,group:l})).filter(s=>"column"in s.group);return n&&"columns"in t&&t.columns[n]&&(a=a.filter(s=>"column"in s.group&&s.group.column===n)),p.jsx(Yo,{...e,includedGroups:a})}function sh({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:a}){return p.jsxs(ke.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${a??""}`,children:[p.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${a??""}`,children:r.label}),p.jsx(ke.List,{id:n,dense:!0,className:a??"",children:p.jsx(ah,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Fi({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,a=T.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,f=o[c];typeof f=="object"&&typeof f.order=="number"&&!Number.isNaN(f.order)?s.set(f.order,{id:c,metadata:f}):console.warn(`Property ${l} (${typeof f}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return p.jsx(ke.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:r,children:a.map((s,l)=>p.jsx(sh,{commandHandler:e,menuDefinition:n,...s,className:t},l))})}const zi=N.createContext({});process.env.NODE_ENV!=="production"&&(zi.displayName="ListContext");const ih=zi;function lh(e){return rt("MuiList",e)}xt("MuiList",["root","padding","dense","subheader"]);const ch=["children","className","component","dense","disablePadding","subheader"],ph=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return ft({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},lh,t)},uh=Re("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>j({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Hi=N.forwardRef(function(t,n){const r=mt({props:t,name:"MuiList"}),{children:o,className:a,component:s="ul",dense:l=!1,disablePadding:c=!1,subheader:f}=r,m=me(r,ch),v=N.useMemo(()=>({dense:l}),[l]),g=j({},r,{component:s,dense:l,disablePadding:c}),u=ph(g);return p.jsx(ih.Provider,{value:v,children:p.jsxs(uh,j({as:s,className:Se(u.root,a),ref:n,ownerState:g},m,{children:[f,o]}))})});process.env.NODE_ENV!=="production"&&(Hi.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,dense:i.bool,disablePadding:i.bool,subheader:i.node,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const dh=Hi,fh=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Kr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function ls(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function Ui(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function yn(e,t,n,r,o,a){let s=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(s)return!1;s=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!Ui(l,a)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const Gi=N.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:a=!1,children:s,className:l,disabledItemsFocusable:c=!1,disableListWrap:f=!1,onKeyDown:m,variant:v="selectedMenu"}=t,g=me(t,fh),u=N.useRef(null),h=N.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});At(()=>{o&&u.current.focus()},[o]),N.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(w,k)=>{const y=!u.current.style.width;if(w.clientHeight<u.current.clientHeight&&y){const S=`${oi(Oe(w))}px`;u.current.style[k.direction==="rtl"?"paddingLeft":"paddingRight"]=S,u.current.style.width=`calc(100% + ${S})`}return u.current}}),[]);const d=w=>{const k=u.current,y=w.key,S=Oe(k).activeElement;if(y==="ArrowDown")w.preventDefault(),yn(k,S,f,c,Kr);else if(y==="ArrowUp")w.preventDefault(),yn(k,S,f,c,ls);else if(y==="Home")w.preventDefault(),yn(k,null,f,c,Kr);else if(y==="End")w.preventDefault(),yn(k,null,f,c,ls);else if(y.length===1){const O=h.current,M=y.toLowerCase(),D=performance.now();O.keys.length>0&&(D-O.lastTime>500?(O.keys=[],O.repeating=!0,O.previousKeyMatched=!0):O.repeating&&M!==O.keys[0]&&(O.repeating=!1)),O.lastTime=D,O.keys.push(M);const L=S&&!O.repeating&&Ui(S,O);O.previousKeyMatched&&(L||yn(k,S,!1,c,Kr,O))?w.preventDefault():O.previousKeyMatched=!1}m&&m(w)},b=Ge(u,n);let x=-1;N.Children.forEach(s,(w,k)=>{if(!N.isValidElement(w)){x===k&&(x+=1,x>=s.length&&(x=-1));return}process.env.NODE_ENV!=="production"&&ur.isFragment(w)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),w.props.disabled||(v==="selectedMenu"&&w.props.selected||x===-1)&&(x=k),x===k&&(w.props.disabled||w.props.muiSkipListHighlight||w.type.muiSkipListHighlight)&&(x+=1,x>=s.length&&(x=-1))});const R=N.Children.map(s,(w,k)=>{if(k===x){const y={};return a&&(y.autoFocus=!0),w.props.tabIndex===void 0&&v==="selectedMenu"&&(y.tabIndex=0),N.cloneElement(w,y)}return w});return p.jsx(dh,j({role:"menu",ref:b,className:l,onKeyDown:d,tabIndex:o?0:-1},g,{children:R}))});process.env.NODE_ENV!=="production"&&(Gi.propTypes={autoFocus:i.bool,autoFocusItem:i.bool,children:i.node,className:i.string,disabledItemsFocusable:i.bool,disableListWrap:i.bool,onKeyDown:i.func,variant:i.oneOf(["menu","selectedMenu"])});const mh=Gi,hh=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],gh={entering:{opacity:1},entered:{opacity:1}},qi=N.forwardRef(function(t,n){const r=Jn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:a,appear:s=!0,children:l,easing:c,in:f,onEnter:m,onEntered:v,onEntering:g,onExit:u,onExited:h,onExiting:d,style:b,timeout:x=o,TransitionComponent:R=Ii}=t,w=me(t,hh),k=N.useRef(null),y=Ge(k,l.ref,n),S=F=>H=>{if(F){const _=k.current;H===void 0?F(_):F(_,H)}},O=S(g),M=S((F,H)=>{Ai(F);const _=vr({style:b,timeout:x,easing:c},{mode:"enter"});F.style.webkitTransition=r.transitions.create("opacity",_),F.style.transition=r.transitions.create("opacity",_),m&&m(F,H)}),D=S(v),L=S(d),E=S(F=>{const H=vr({style:b,timeout:x,easing:c},{mode:"exit"});F.style.webkitTransition=r.transitions.create("opacity",H),F.style.transition=r.transitions.create("opacity",H),u&&u(F)}),P=S(h),$=F=>{a&&a(k.current,F)};return p.jsx(R,j({appear:s,in:f,nodeRef:k,onEnter:M,onEntered:D,onEntering:O,onExit:E,onExited:P,onExiting:L,addEndListener:$,timeout:x},w,{children:(F,H)=>N.cloneElement(l,j({style:j({opacity:0,visibility:F==="exited"&&!f?"hidden":void 0},gh[F],b,l.props.style),ref:y},H))}))});process.env.NODE_ENV!=="production"&&(qi.propTypes={addEndListener:i.func,appear:i.bool,children:Gn.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const bh=qi;function vh(e){return rt("MuiBackdrop",e)}xt("MuiBackdrop",["root","invisible"]);const yh=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],wh=e=>{const{classes:t,invisible:n}=e;return ft({root:["root",n&&"invisible"]},vh,t)},xh=Re("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>j({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),Wi=N.forwardRef(function(t,n){var r,o,a;const s=mt({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:f="div",components:m={},componentsProps:v={},invisible:g=!1,open:u,slotProps:h={},slots:d={},TransitionComponent:b=bh,transitionDuration:x}=s,R=me(s,yh),w=j({},s,{component:f,invisible:g}),k=wh(w),y=(r=h.root)!=null?r:v.root;return p.jsx(b,j({in:u,timeout:x},R,{children:p.jsx(xh,j({"aria-hidden":!0},y,{as:(o=(a=d.root)!=null?a:m.Root)!=null?o:f,className:Se(k.root,c,y==null?void 0:y.className),ownerState:j({},w,y==null?void 0:y.ownerState),classes:k,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(Wi.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.object}),invisible:i.bool,open:i.bool.isRequired,slotProps:i.shape({root:i.object}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const kh=Wi;function Eh(e){return rt("MuiModal",e)}xt("MuiModal",["root","hidden","backdrop"]);const Th=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Nh=e=>{const{open:t,exited:n,classes:r}=e;return ft({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},Eh,r)},Sh=Re("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>j({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Ch=Re(kh,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Xi=N.forwardRef(function(t,n){var r,o,a,s,l,c;const f=mt({name:"MuiModal",props:t}),{BackdropComponent:m=Ch,BackdropProps:v,className:g,closeAfterTransition:u=!1,children:h,container:d,component:b,components:x={},componentsProps:R={},disableAutoFocus:w=!1,disableEnforceFocus:k=!1,disableEscapeKeyDown:y=!1,disablePortal:S=!1,disableRestoreFocus:O=!1,disableScrollLock:M=!1,hideBackdrop:D=!1,keepMounted:L=!1,onBackdropClick:E,open:P,slotProps:$,slots:F}=f,H=me(f,Th),_=j({},f,{closeAfterTransition:u,disableAutoFocus:w,disableEnforceFocus:k,disableEscapeKeyDown:y,disablePortal:S,disableRestoreFocus:O,disableScrollLock:M,hideBackdrop:D,keepMounted:L}),{getRootProps:z,getBackdropProps:Z,getTransitionProps:J,portalRef:C,isTopModal:A,exited:U,hasTransition:q}=Nf(j({},_,{rootRef:n})),G=j({},_,{exited:U}),W=Nh(G),Y={};if(h.props.tabIndex===void 0&&(Y.tabIndex="-1"),q){const{onEnter:te,onExited:I}=J();Y.onEnter=te,Y.onExited=I}const K=(r=(o=F==null?void 0:F.root)!=null?o:x.Root)!=null?r:Sh,X=(a=(s=F==null?void 0:F.backdrop)!=null?s:x.Backdrop)!=null?a:m,Q=(l=$==null?void 0:$.root)!=null?l:R.root,ee=(c=$==null?void 0:$.backdrop)!=null?c:R.backdrop,ae=Bt({elementType:K,externalSlotProps:Q,externalForwardedProps:H,getSlotProps:z,additionalProps:{ref:n,as:b},ownerState:G,className:Se(g,Q==null?void 0:Q.className,W==null?void 0:W.root,!G.open&&G.exited&&(W==null?void 0:W.hidden))}),B=Bt({elementType:X,externalSlotProps:ee,additionalProps:v,getSlotProps:te=>Z(j({},te,{onClick:I=>{E&&E(I),te!=null&&te.onClick&&te.onClick(I)}})),className:Se(ee==null?void 0:ee.className,v==null?void 0:v.className,W==null?void 0:W.backdrop),ownerState:G});return!L&&!P&&(!q||U)?null:p.jsx(An,{ref:C,container:d,disablePortal:S,children:p.jsxs(K,j({},ae,{children:[!D&&m?p.jsx(X,j({},B)):null,p.jsx(hr,{disableEnforceFocus:k,disableAutoFocus:w,disableRestoreFocus:O,isEnabled:A,open:P,children:N.cloneElement(h,Y)})]}))})});process.env.NODE_ENV!=="production"&&(Xi.propTypes={BackdropComponent:i.elementType,BackdropProps:i.object,children:Gn.isRequired,classes:i.object,className:i.string,closeAfterTransition:i.bool,component:i.elementType,components:i.shape({Backdrop:i.elementType,Root:i.elementType}),componentsProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableEscapeKeyDown:i.bool,disablePortal:i.bool,disableRestoreFocus:i.bool,disableScrollLock:i.bool,hideBackdrop:i.bool,keepMounted:i.bool,onBackdropClick:i.func,onClose:i.func,onTransitionEnter:i.func,onTransitionExited:i.func,open:i.bool.isRequired,slotProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({backdrop:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const Oh=Xi;function Rh(e){return rt("MuiPaper",e)}xt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Ph=["className","component","elevation","square","variant"],jh=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,a={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return ft(a,Rh,o)},$h=Re("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return j({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&j({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${mr("#fff",as(t.elevation))}, ${mr("#fff",as(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Yi=N.forwardRef(function(t,n){const r=mt({props:t,name:"MuiPaper"}),{className:o,component:a="div",elevation:s=1,square:l=!1,variant:c="elevation"}=r,f=me(r,Ph),m=j({},r,{component:a,elevation:s,square:l,variant:c}),v=jh(m);return process.env.NODE_ENV!=="production"&&Jn().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),p.jsx($h,j({as:a,ownerState:m,className:Se(v.root,o),ref:n},f))});process.env.NODE_ENV!=="production"&&(Yi.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,elevation:ln(ii,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:i.bool,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),variant:i.oneOfType([i.oneOf(["elevation","outlined"]),i.string])});const _h=Yi;function Mh(e){return rt("MuiPopover",e)}xt("MuiPopover",["root","paper"]);const Ih=["onEntering"],Ah=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Dh=["slotProps"];function cs(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function ps(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function us(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function cr(e){return typeof e=="function"?e():e}const Bh=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"]},Mh,t)},Lh=Re(Oh,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ki=Re(_h,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Ji=N.forwardRef(function(t,n){var r,o,a;const s=mt({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:f={vertical:"top",horizontal:"left"},anchorPosition:m,anchorReference:v="anchorEl",children:g,className:u,container:h,elevation:d=8,marginThreshold:b=16,open:x,PaperProps:R={},slots:w,slotProps:k,transformOrigin:y={vertical:"top",horizontal:"left"},TransitionComponent:S=go,transitionDuration:O="auto",TransitionProps:{onEntering:M}={},disableScrollLock:D=!1}=s,L=me(s.TransitionProps,Ih),E=me(s,Ah),P=(r=k==null?void 0:k.paper)!=null?r:R,$=N.useRef(),F=Ge($,P.ref),H=j({},s,{anchorOrigin:f,anchorReference:v,elevation:d,marginThreshold:b,externalPaperSlotProps:P,transformOrigin:y,TransitionComponent:S,transitionDuration:O,TransitionProps:L}),_=Bh(H),z=N.useCallback(()=>{if(v==="anchorPosition")return process.env.NODE_ENV!=="production"&&(m||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),m;const te=cr(c),I=te&&te.nodeType===1?te:Oe($.current).body,se=I.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Ee=I.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Ee.top===0&&Ee.left===0&&Ee.right===0&&Ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:se.top+cs(se,f.vertical),left:se.left+ps(se,f.horizontal)}},[c,f.horizontal,f.vertical,m,v]),Z=N.useCallback(te=>({vertical:cs(te,y.vertical),horizontal:ps(te,y.horizontal)}),[y.horizontal,y.vertical]),J=N.useCallback(te=>{const I={width:te.offsetWidth,height:te.offsetHeight},se=Z(I);if(v==="none")return{top:null,left:null,transformOrigin:us(se)};const Ee=z();let Pe=Ee.top-se.vertical,we=Ee.left-se.horizontal;const Tt=Pe+I.height,je=we+I.width,ot=en(cr(c)),De=ot.innerHeight-b,at=ot.innerWidth-b;if(b!==null&&Pe<b){const Te=Pe-b;Pe-=Te,se.vertical+=Te}else if(b!==null&&Tt>De){const Te=Tt-De;Pe-=Te,se.vertical+=Te}if(process.env.NODE_ENV!=="production"&&I.height>De&&I.height&&De&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${I.height-De}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),b!==null&&we<b){const Te=we-b;we-=Te,se.horizontal+=Te}else if(je>at){const Te=je-at;we-=Te,se.horizontal+=Te}return{top:`${Math.round(Pe)}px`,left:`${Math.round(we)}px`,transformOrigin:us(se)}},[c,v,z,Z,b]),[C,A]=N.useState(x),U=N.useCallback(()=>{const te=$.current;if(!te)return;const I=J(te);I.top!==null&&(te.style.top=I.top),I.left!==null&&(te.style.left=I.left),te.style.transformOrigin=I.transformOrigin,A(!0)},[J]);N.useEffect(()=>(D&&window.addEventListener("scroll",U),()=>window.removeEventListener("scroll",U)),[c,D,U]);const q=(te,I)=>{M&&M(te,I),U()},G=()=>{A(!1)};N.useEffect(()=>{x&&U()}),N.useImperativeHandle(l,()=>x?{updatePosition:()=>{U()}}:null,[x,U]),N.useEffect(()=>{if(!x)return;const te=ei(()=>{U()}),I=en(c);return I.addEventListener("resize",te),()=>{te.clear(),I.removeEventListener("resize",te)}},[c,x,U]);let W=O;O==="auto"&&!S.muiSupportAuto&&(W=void 0);const Y=h||(c?Oe(cr(c)).body:void 0),K=(o=w==null?void 0:w.root)!=null?o:Lh,X=(a=w==null?void 0:w.paper)!=null?a:Ki,Q=Bt({elementType:X,externalSlotProps:j({},P,{style:C?P.style:j({},P.style,{opacity:0})}),additionalProps:{elevation:d,ref:F},ownerState:H,className:Se(_.paper,P==null?void 0:P.className)}),ee=Bt({elementType:K,externalSlotProps:(k==null?void 0:k.root)||{},externalForwardedProps:E,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:Y,open:x},ownerState:H,className:Se(_.root,u)}),{slotProps:ae}=ee,B=me(ee,Dh);return p.jsx(K,j({},B,!yi(K)&&{slotProps:ae,disableScrollLock:D},{children:p.jsx(S,j({appear:!0,in:x,onEntering:q,onExited:G,timeout:W},L,{children:p.jsx(X,j({},Q,{children:g}))}))}))});process.env.NODE_ENV!=="production"&&(Ji.propTypes={action:Po,anchorEl:ln(i.oneOfType([pt,i.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=cr(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),anchorPosition:i.shape({left:i.number.isRequired,top:i.number.isRequired}),anchorReference:i.oneOf(["anchorEl","anchorPosition","none"]),children:i.node,classes:i.object,className:i.string,container:i.oneOfType([pt,i.func]),disableScrollLock:i.bool,elevation:ii,marginThreshold:i.number,onClose:i.func,open:i.bool.isRequired,PaperProps:i.shape({component:gp}),slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transformOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object});const Vh=Ji;function Fh(e){return rt("MuiMenu",e)}xt("MuiMenu",["root","paper","list"]);const zh=["onEntering"],Hh=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Uh={vertical:"top",horizontal:"right"},Gh={vertical:"top",horizontal:"left"},qh=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"],list:["list"]},Fh,t)},Wh=Re(Vh,{shouldForwardProp:e=>gi(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Xh=Re(Ki,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),Yh=Re(mh,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Zi=N.forwardRef(function(t,n){var r,o;const a=mt({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:l,className:c,disableAutoFocusItem:f=!1,MenuListProps:m={},onClose:v,open:g,PaperProps:u={},PopoverClasses:h,transitionDuration:d="auto",TransitionProps:{onEntering:b}={},variant:x="selectedMenu",slots:R={},slotProps:w={}}=a,k=me(a.TransitionProps,zh),y=me(a,Hh),S=Jn(),O=S.direction==="rtl",M=j({},a,{autoFocus:s,disableAutoFocusItem:f,MenuListProps:m,onEntering:b,PaperProps:u,transitionDuration:d,TransitionProps:k,variant:x}),D=qh(M),L=s&&!f&&g,E=N.useRef(null),P=(J,C)=>{E.current&&E.current.adjustStyleForScrollbar(J,S),b&&b(J,C)},$=J=>{J.key==="Tab"&&(J.preventDefault(),v&&v(J,"tabKeyDown"))};let F=-1;N.Children.map(l,(J,C)=>{N.isValidElement(J)&&(process.env.NODE_ENV!=="production"&&ur.isFragment(J)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),J.props.disabled||(x==="selectedMenu"&&J.props.selected||F===-1)&&(F=C))});const H=(r=R.paper)!=null?r:Xh,_=(o=w.paper)!=null?o:u,z=Bt({elementType:R.root,externalSlotProps:w.root,ownerState:M,className:[D.root,c]}),Z=Bt({elementType:H,externalSlotProps:_,ownerState:M,className:D.paper});return p.jsx(Wh,j({onClose:v,anchorOrigin:{vertical:"bottom",horizontal:O?"right":"left"},transformOrigin:O?Uh:Gh,slots:{paper:H,root:R.root},slotProps:{root:z,paper:Z},open:g,ref:n,transitionDuration:d,TransitionProps:j({onEntering:P},k),ownerState:M},y,{classes:h,children:p.jsx(Yh,j({onKeyDown:$,actions:E,autoFocus:s&&(F===-1||f),autoFocusItem:L,variant:x},m,{className:Se(D.list,m.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(Zi.propTypes={anchorEl:i.oneOfType([pt,i.func]),autoFocus:i.bool,children:i.node,classes:i.object,className:i.string,disableAutoFocusItem:i.bool,MenuListProps:i.object,onClose:i.func,open:i.bool.isRequired,PaperProps:i.object,PopoverClasses:i.object,slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object,variant:i.oneOf(["menu","selectedMenu"])});const Kh=Zi;function Jh({className:e,commandHandler:t,menuDefinition:n,children:r}){var f;const[o,a]=T.useState(void 0),s=T.useCallback(m=>{m.preventDefault(),a(o===void 0?{mouseX:m.clientX+2,mouseY:m.clientY-6}:void 0)},[o]),l=T.useCallback(()=>{a(void 0)},[]),c=T.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((f=n==null?void 0:n.items)==null?void 0:f.length)??0)===0||!r?r:p.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[r,p.jsx(Kh,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:p.jsx(Yo,{menuDefinition:n,commandHandler:t,onClick:l})})]})}function Zh(e){return{preserveValue:!0,...e}}const yr=(e,t,n={})=>{const r=T.useRef(t);r.current=t;const o=T.useRef(n);o.current=Zh(o.current);const[a,s]=T.useState(()=>r.current),[l,c]=T.useState(!0);return T.useEffect(()=>{let f=!0;return c(!!e),(async()=>{if(e){const m=await e();f&&(s(()=>m),c(!1))}})(),()=>{f=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[a,l]},Qh=bi(p.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Qi({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:a,ariaLabelPrefix:s,children:l}){const[c,f]=T.useState(!1),[m,v]=T.useState(!1),g=T.useCallback(()=>{c&&f(!1),v(!1)},[c]),u=T.useCallback(k=>{k.stopPropagation(),f(y=>{const S=!y;return S&&k.shiftKey?v(!0):S||v(!1),S})},[]),h=T.useCallback(k=>(g(),r(k)),[r,g]),[d,b]=T.useState({top:1,left:1});T.useEffect(()=>{if(c){const k=o==null?void 0:o.current;if(k){const y=k.getBoundingClientRect(),S=window.scrollY,O=window.scrollX,M=y.top+S+k.clientHeight,D=y.left+O;b({top:M,left:D})}}},[c,o]);const[x]=yr(T.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[R]=yr(T.useCallback(async()=>(e==null?void 0:e(!0))??n??x,[e,n,x,c]),n??x),w=m&&R?R:x;return p.jsxs(p.Fragment,{children:[p.jsx(ke.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:u,children:l??p.jsx(Qh,{})}),p.jsx(ke.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:c,onClose:g,PaperProps:{className:"papi-menu-drawer-paper",style:{top:d.top,left:d.left}},children:w?p.jsx(Fi,{className:a,id:`${s??""} main menu`,commandHandler:h,multiColumnMenu:w}):void 0})]})}function eg({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:s="medium",className:l,onClick:c,children:f}){return p.jsx(ke.IconButton,{id:e,disabled:n,edge:a,size:s,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:f})}const yt="scrBook",tg="scrRef",Rt="source",ng="details",rg="Scripture Reference",og="Scripture Book",el="Type",ag="Details";function sg(e,t){const n=t??!1;return[{accessorFn:r=>`${fe.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:yt,header:(e==null?void 0:e.scriptureReferenceColumnName)??rg,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?fe.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===yt?Je.formatScrRef(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>Je.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>Je.formatScrRef(r.start),id:tg,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:Je.formatScrRef(o.start)},sortingFn:(r,o)=>Je.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:Rt,header:n?(e==null?void 0:e.typeColumnName)??el:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:ng,header:(e==null?void 0:e.detailsColumnName)??ag,cell:r=>r.getValue(),enableGrouping:!1}]}function ig({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:a,detailsColumnName:s,onRowSelected:l}){const[c,f]=T.useState([]),[m,v]=T.useState([{id:yt,desc:!1}]),[g,u]=T.useState(()=>e.flatMap(E=>{const P=E.source;return E.data.map($=>({...$,source:P}))})),[h,d]=T.useState({});T.useEffect(()=>{u(()=>e.flatMap(E=>{const P=E.source;return E.data.map($=>({...$,source:P}))}))},[e]);const b=T.useMemo(()=>sg({scriptureReferenceColumnName:r,typeColumnName:a,detailsColumnName:s},n),[r,a,s,n]);T.useEffect(()=>{c.includes(Rt)?v([{id:Rt,desc:!1},{id:yt,desc:!1}]):v([{id:yt,desc:!1}])},[c]);const x=T.useCallback((E,P)=>!P||Je.compareScrRefs(E,P)===0?`${Je.scrRefToBBBCCCVVV(E)}`:`${Je.scrRefToBBBCCCVVV(E)}-${Je.scrRefToBBBCCCVVV(P)}`,[]),R=T.useCallback(E=>`${x(E.start,E.end)} ${E.source} ${E.detail}`,[x]),w=Ce.useReactTable({data:g,columns:b,state:{grouping:c,sorting:m,rowSelection:h},onGroupingChange:f,onSortingChange:v,onRowSelectionChange:d,getExpandedRowModel:Ce.getExpandedRowModel(),getGroupedRowModel:Ce.getGroupedRowModel(),getCoreRowModel:Ce.getCoreRowModel(),getSortedRowModel:Ce.getSortedRowModel(),getRowId:R,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});T.useEffect(()=>{if(l){const E=w.getSelectedRowModel().rowsById,P=Object.keys(E);if(P.length===1){const $=g.find(F=>R(F)===P[0])||void 0;$&&l($)}}},[h,g,R,l,w]);const k=o??og,y=a??el,S=[{label:"No Grouping",value:[]},{label:`Group by ${k}`,value:[yt]},{label:`Group by ${y}`,value:[Rt]},{label:`Group by ${k} and ${y}`,value:[yt,Rt]},{label:`Group by ${y} and ${k}`,value:[Rt,yt]}],O=E=>{f(JSON.parse(E))},M=(E,P)=>{!E.getIsGrouped()&&!E.getIsSelected()&&E.getToggleSelectedHandler()(P)},D=(E,P)=>E.getIsGrouped()?"":V("banded-row",P%2===0?"even":"odd"),L=(E,P,$)=>{if(!((E==null?void 0:E.length)===0||P.depth<$.column.getGroupedIndex())){if(P.getIsGrouped())switch(P.depth){case 1:return"pr-ps-4";default:return}switch(P.depth){case 1:return"pr-ps-8";case 2:return"pr-ps-12";default:return}}};return p.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-w-full pr-flex-col",children:[!t&&p.jsxs($n,{value:JSON.stringify(c),onValueChange:E=>{O(E)},children:[p.jsx(Kt,{className:"pr-mb-1 pr-mt-2",children:p.jsx(_n,{})}),p.jsx(Jt,{position:"item-aligned",children:p.jsx($s,{children:S.map(E=>p.jsx(Ye,{value:JSON.stringify(E.value),children:E.label},E.label))})})]}),p.jsxs(zn,{className:"pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0",children:[t&&p.jsx(Hn,{children:w.getHeaderGroups().map(E=>p.jsx(lt,{children:E.headers.filter(P=>P.column.columnDef.header).map(P=>p.jsx(Zt,{colSpan:P.colSpan,className:"top-0 pr-sticky",children:P.isPlaceholder?void 0:p.jsxs("div",{children:[P.column.getCanGroup()?p.jsx(Ne,{variant:"ghost",title:`Toggle grouping by ${P.column.columnDef.header}`,onClick:P.column.getToggleGroupingHandler(),type:"button",children:P.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Ce.flexRender(P.column.columnDef.header,P.getContext())]})},P.id))},E.id))}),p.jsx(Un,{children:w.getRowModel().rows.map((E,P)=>p.jsx(lt,{"data-state":E.getIsSelected()?"selected":"",className:V(D(E,P)),onClick:$=>M(E,$),children:E.getVisibleCells().map($=>{if(!($.getIsPlaceholder()||$.column.columnDef.enableGrouping&&!$.getIsGrouped()&&($.column.columnDef.id!==Rt||!n)))return p.jsx(It,{className:V($.column.columnDef.id,"pr-p-[1px]",L(c,E,$)),children:(()=>$.getIsGrouped()?p.jsxs(Ne,{variant:"ghost",onClick:E.getToggleExpandedHandler(),type:"button",children:[E.getIsExpanded()?"👇":"👉"," ",Ce.flexRender($.column.columnDef.cell,$.getContext())," (",E.subRows.length,")"]}):Ce.flexRender($.column.columnDef.cell,$.getContext()))()},$.id)})},E.id))})]})]})}const lg=yo.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),Ko=T.forwardRef(({className:e,...t},n)=>p.jsx(ws.Root,{ref:n,className:V(lg(),e),...t}));Ko.displayName=ws.Root.displayName;function tl({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:a,placeholder:s,isRequired:l=!1,className:c,defaultValue:f,value:m,onChange:v,onFocus:g,onBlur:u}){return p.jsxs("div",{className:V("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":r}),children:[p.jsx(Ko,{htmlFor:e,className:V({"pr-text-red-600":n,"pr-hidden":!a}),children:`${a}${l?"*":""}`}),p.jsx(Ln,{id:e,disabled:t,placeholder:s,required:l,className:V(c,{"pr-border-red-600":n}),defaultValue:f,value:m,onChange:v,onFocus:g,onBlur:u}),p.jsx("p",{className:V({"pr-hidden":!o}),children:o})]})}function cg({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=T.useState(""),a=s=>{o(s),e(s)};return p.jsx(tl,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:s=>a(s.target.value)})}function pg({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:a=1,showMarks:s=!1,defaultValue:l,value:c,valueLabelDisplay:f="off",className:m,onChange:v,onChangeCommitted:g}){return p.jsx(ke.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:a,marks:s,defaultValue:l,value:c,valueLabelDisplay:f,className:`papi-slider ${n} ${m??""}`,onChange:v,onChangeCommitted:g})}function ug({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:s,children:l}){const c={action:(s==null?void 0:s.action)||l,message:s==null?void 0:s.message,className:r};return p.jsx(ke.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:a,id:t,ContentProps:c})}function dg({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:a}){return p.jsx(ke.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:a})}function fg({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const a=T.useRef(void 0);return p.jsx("div",{ref:a,style:{position:"relative"},children:p.jsx(ke.AppBar,{position:"static",id:r,children:p.jsxs(ke.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?p.jsx(Qi,{commandHandler:t,containerRef:a,menuProvider:e}):void 0,o?p.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const mg=Ae.Root,nl=T.forwardRef(({className:e,...t},n)=>p.jsx(Ae.List,{ref:n,className:V("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));nl.displayName=Ae.List.displayName;const rl=T.forwardRef(({className:e,...t},n)=>p.jsx(Ae.Trigger,{ref:n,className:V("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));rl.displayName=Ae.Trigger.displayName;const ol=T.forwardRef(({className:e,...t},n)=>p.jsx(Ae.Content,{ref:n,className:V("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));ol.displayName=Ae.Content.displayName;const al=T.forwardRef(({className:e,...t},n)=>p.jsx(Ae.Root,{orientation:"vertical",ref:n,className:V("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));al.displayName=Ae.List.displayName;const sl=T.forwardRef(({className:e,...t},n)=>p.jsx(Ae.List,{ref:n,className:V("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));sl.displayName=Ae.List.displayName;const hg=T.forwardRef(({className:e,...t},n)=>p.jsx(Ae.Trigger,{ref:n,...t,className:V("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),il=T.forwardRef(({className:e,...t},n)=>p.jsx(Ae.Content,{ref:n,className:V("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));il.displayName=Ae.Content.displayName;function gg({isInstalling:e,handleClick:t,buttonText:n}){return p.jsx(Ne,{className:V("pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e,"pr-bg-blue-600":!e,"pr-bg-white pr-text-blue-600 hover:pr-text-white":!n,"pr-w-20":n}),onClick:t,children:e?p.jsx(de.LoaderCircle,{size:15,className:"pr-animate-spin"}):p.jsxs(p.Fragment,{children:[p.jsx(de.Download,{size:25,className:V("pr-h-4 pr-w-4",{"pr-mr-1":n})}),n]})})}function bg({isEnabling:e,handleClick:t}){return p.jsx(Ne,{className:V("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e}),onClick:t,children:e?p.jsxs(p.Fragment,{children:[p.jsx(de.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-white"}),"Enabling..."]}):"Enable"})}function vg({isDisabling:e,handleClick:t}){return p.jsx(Ne,{className:V("pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-gray-400",{"pr-cursor-not-allowed pr-bg-gray-400":e}),onClick:t,children:e?p.jsxs(p.Fragment,{children:[p.jsx(de.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-black"}),"Disabling..."]}):"Disable"})}function yg({isUpdating:e,handleClick:t}){return p.jsx(Ne,{className:V("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700 hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e}),onClick:t,children:e?p.jsxs(p.Fragment,{children:[p.jsx(de.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-white"}),"Updating..."]}):"Update"})}function $t(){return $t=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},$t.apply(this,arguments)}const wg=["children","options"],ds=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,t)=>(e[t.toLowerCase()]=t,e),{for:"htmlFor"}),fs={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},xg=["style","script"],kg=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,Eg=/mailto:/i,Tg=/\n{2,}$/,ll=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,Ng=/^ *> ?/gm,Sg=/^ {2,}\n/,Cg=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,cl=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,pl=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,Og=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,Rg=/^(?:\n *)*\n/,Pg=/\r\n?/g,jg=/^\[\^([^\]]+)](:.*)\n/,$g=/^\[\^([^\]]+)]/,_g=/\f/g,Mg=/^\s*?\[(x|\s)\]/,ul=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,dl=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,fl=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,bo=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,Ig=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,ml=/^<!--[\s\S]*?(?:-->)/,Ag=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,vo=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,Dg=/^\{.*\}$/,Bg=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,Lg=/^<([^ >]+@[^ >]+)>/,Vg=/^<([^ >]+:\/[^ >]+)>/,Fg=/-([a-z])?/gi,hl=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,zg=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,Hg=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,Ug=/^\[([^\]]*)\] ?\[([^\]]*)\]/,Gg=/(\[|\])/g,qg=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,Wg=/\t/g,Xg=/^ *\| */,Yg=/(^ *\||\| *$)/g,Kg=/ *$/,Jg=/^ *:-+: *$/,Zg=/^ *:-+ *$/,Qg=/^ *-+: *$/,eb=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,tb=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,nb=/^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,rb=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,ob=/^\\([^0-9A-Za-z\s])/,ab=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,sb=/^\n+/,ib=/^([ \t]*)/,lb=/\\([^\\])/g,ms=/ *\n+$/,cb=/(?:^|\n)( *)$/,Jo="(?:\\d+\\.)",Zo="(?:[*+-])";function gl(e){return"( *)("+(e===1?Jo:Zo)+") +"}const bl=gl(1),vl=gl(2);function yl(e){return new RegExp("^"+(e===1?bl:vl))}const pb=yl(1),ub=yl(2);function wl(e){return new RegExp("^"+(e===1?bl:vl)+"[^\\n]*(?:\\n(?!\\1"+(e===1?Jo:Zo)+" )[^\\n]*)*(\\n|$)","gm")}const xl=wl(1),kl=wl(2);function El(e){const t=e===1?Jo:Zo;return new RegExp("^( *)("+t+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+t+" (?!"+t+" ))\\n*|\\s*\\n*$)")}const Tl=El(1),Nl=El(2);function hs(e,t){const n=t===1,r=n?Tl:Nl,o=n?xl:kl,a=n?pb:ub;return{t(s,l,c){const f=cb.exec(c);return f&&(l.o||!l._&&!l.u)?r.exec(s=f[1]+s):null},i:oe.HIGH,l(s,l,c){const f=n?+s[2]:void 0,m=s[0].replace(Tg,`
`).match(o);let v=!1;return{p:m.map(function(g,u){const h=a.exec(g)[0].length,d=new RegExp("^ {1,"+h+"}","gm"),b=g.replace(d,"").replace(a,""),x=u===m.length-1,R=b.indexOf(`

`)!==-1||x&&v;v=R;const w=c._,k=c.o;let y;c.o=!0,R?(c._=!1,y=b.replace(ms,`

`)):(c._=!0,y=b.replace(ms,""));const S=l(y,c);return c._=w,c.o=k,S}),m:n,g:f}},h:(s,l,c)=>e(s.m?"ol":"ul",{key:c.k,start:s.g},s.p.map(function(f,m){return e("li",{key:m},l(f,c))}))}}const db=/^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,fb=/^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Sl=[ll,cl,pl,ul,fl,dl,ml,hl,xl,Tl,kl,Nl],mb=[...Sl,/^[^\n]+(?:  \n|\n{2,})/,bo,vo];function hb(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function gb(e){return Qg.test(e)?"right":Jg.test(e)?"center":Zg.test(e)?"left":null}function gs(e,t,n){const r=n.$;n.$=!0;const o=t(e.trim(),n);n.$=r;let a=[[]];return o.forEach(function(s,l){s.type==="tableSeparator"?l!==0&&l!==o.length-1&&a.push([]):(s.type!=="text"||o[l+1]!=null&&o[l+1].type!=="tableSeparator"||(s.v=s.v.replace(Kg,"")),a[a.length-1].push(s))}),a}function bb(e,t,n){n._=!0;const r=gs(e[1],t,n),o=e[2].replace(Yg,"").split("|").map(gb),a=function(s,l,c){return s.trim().split(`
`).map(function(f){return gs(f,l,c)})}(e[3],t,n);return n._=!1,{S:o,A:a,L:r,type:"table"}}function bs(e,t){return e.S[t]==null?{}:{textAlign:e.S[t]}}function bt(e){return function(t,n){return n._?e.exec(t):null}}function vt(e){return function(t,n){return n._||n.u?e.exec(t):null}}function it(e){return function(t,n){return n._||n.u?null:e.exec(t)}}function wn(e){return function(t){return e.exec(t)}}function vb(e,t,n){if(t._||t.u||n&&!n.endsWith(`
`))return null;let r="";e.split(`
`).every(a=>!Sl.some(s=>s.test(a))&&(r+=a+`
`,a.trim()));const o=r.trimEnd();return o==""?null:[r,o]}function Wt(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch{return null}return e}function vs(e){return e.replace(lb,"$1")}function pr(e,t,n){const r=n._||!1,o=n.u||!1;n._=!0,n.u=!0;const a=e(t,n);return n._=r,n.u=o,a}function yb(e,t,n){const r=n._||!1,o=n.u||!1;n._=!1,n.u=!0;const a=e(t,n);return n._=r,n.u=o,a}function wb(e,t,n){return n._=!1,e(t,n)}const Jr=(e,t,n)=>({v:pr(t,e[1],n)});function Zr(){return{}}function Qr(){return null}function xb(...e){return e.filter(Boolean).join(" ")}function eo(e,t,n){let r=e;const o=t.split(".");for(;o.length&&(r=r[o[0]],r!==void 0);)o.shift();return r||n}var oe;function kb(e,t={}){t.overrides=t.overrides||{},t.slugify=t.slugify||hb,t.namedCodesToUnicode=t.namedCodesToUnicode?$t({},fs,t.namedCodesToUnicode):fs;const n=t.createElement||N.createElement;function r(u,h,...d){const b=eo(t.overrides,`${u}.props`,{});return n(function(x,R){const w=eo(R,x);return w?typeof w=="function"||typeof w=="object"&&"render"in w?w:eo(R,`${x}.component`,x):x}(u,t.overrides),$t({},h,b,{className:xb(h==null?void 0:h.className,b.className)||void 0}),...d)}function o(u){let h=!1;t.forceInline?h=!0:t.forceBlock||(h=qg.test(u)===!1);const d=m(f(h?u:`${u.trimEnd().replace(sb,"")}

`,{_:h}));for(;typeof d[d.length-1]=="string"&&!d[d.length-1].trim();)d.pop();if(t.wrapper===null)return d;const b=t.wrapper||(h?"span":"div");let x;if(d.length>1||t.forceWrapper)x=d;else{if(d.length===1)return x=d[0],typeof x=="string"?r("span",{key:"outer"},x):x;x=null}return N.createElement(b,{key:"outer"},x)}function a(u){const h=u.match(kg);return h?h.reduce(function(d,b,x){const R=b.indexOf("=");if(R!==-1){const w=function(O){return O.indexOf("-")!==-1&&O.match(Ag)===null&&(O=O.replace(Fg,function(M,D){return D.toUpperCase()})),O}(b.slice(0,R)).trim(),k=function(O){const M=O[0];return(M==='"'||M==="'")&&O.length>=2&&O[O.length-1]===M?O.slice(1,-1):O}(b.slice(R+1).trim()),y=ds[w]||w,S=d[y]=function(O,M){return O==="style"?M.split(/;\s?/).reduce(function(D,L){const E=L.slice(0,L.indexOf(":"));return D[E.replace(/(-[a-z])/g,P=>P[1].toUpperCase())]=L.slice(E.length+1).trim(),D},{}):O==="href"?Wt(M):(M.match(Dg)&&(M=M.slice(1,M.length-1)),M==="true"||M!=="false"&&M)}(w,k);typeof S=="string"&&(bo.test(S)||vo.test(S))&&(d[y]=N.cloneElement(o(S.trim()),{key:x}))}else b!=="style"&&(d[ds[b]||b]=!0);return d},{}):null}const s=[],l={},c={blockQuote:{t:it(ll),i:oe.HIGH,l:(u,h,d)=>({v:h(u[0].replace(Ng,""),d)}),h:(u,h,d)=>r("blockquote",{key:d.k},h(u.v,d))},breakLine:{t:wn(Sg),i:oe.HIGH,l:Zr,h:(u,h,d)=>r("br",{key:d.k})},breakThematic:{t:it(Cg),i:oe.HIGH,l:Zr,h:(u,h,d)=>r("hr",{key:d.k})},codeBlock:{t:it(pl),i:oe.MAX,l:u=>({v:u[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),M:void 0}),h:(u,h,d)=>r("pre",{key:d.k},r("code",$t({},u.O,{className:u.M?`lang-${u.M}`:""}),u.v))},codeFenced:{t:it(cl),i:oe.MAX,l:u=>({O:a(u[3]||""),v:u[4],M:u[2]||void 0,type:"codeBlock"})},codeInline:{t:vt(Og),i:oe.LOW,l:u=>({v:u[2]}),h:(u,h,d)=>r("code",{key:d.k},u.v)},footnote:{t:it(jg),i:oe.MAX,l:u=>(s.push({I:u[2],j:u[1]}),{}),h:Qr},footnoteReference:{t:bt($g),i:oe.HIGH,l:u=>({v:u[1],B:`#${t.slugify(u[1])}`}),h:(u,h,d)=>r("a",{key:d.k,href:Wt(u.B)},r("sup",{key:d.k},u.v))},gfmTask:{t:bt(Mg),i:oe.HIGH,l:u=>({R:u[1].toLowerCase()==="x"}),h:(u,h,d)=>r("input",{checked:u.R,key:d.k,readOnly:!0,type:"checkbox"})},heading:{t:it(t.enforceAtxHeadings?dl:ul),i:oe.HIGH,l:(u,h,d)=>({v:pr(h,u[2],d),T:t.slugify(u[2]),C:u[1].length}),h:(u,h,d)=>r(`h${u.C}`,{id:u.T,key:d.k},h(u.v,d))},headingSetext:{t:it(fl),i:oe.MAX,l:(u,h,d)=>({v:pr(h,u[1],d),C:u[2]==="="?1:2,type:"heading"})},htmlComment:{t:wn(ml),i:oe.HIGH,l:()=>({}),h:Qr},image:{t:vt(fb),i:oe.HIGH,l:u=>({D:u[1],B:vs(u[2]),F:u[3]}),h:(u,h,d)=>r("img",{key:d.k,alt:u.D||void 0,title:u.F||void 0,src:Wt(u.B)})},link:{t:bt(db),i:oe.LOW,l:(u,h,d)=>({v:yb(h,u[1],d),B:vs(u[2]),F:u[3]}),h:(u,h,d)=>r("a",{key:d.k,href:Wt(u.B),title:u.F},h(u.v,d))},linkAngleBraceStyleDetector:{t:bt(Vg),i:oe.MAX,l:u=>({v:[{v:u[1],type:"text"}],B:u[1],type:"link"})},linkBareUrlDetector:{t:(u,h)=>h.N?null:bt(Bg)(u,h),i:oe.MAX,l:u=>({v:[{v:u[1],type:"text"}],B:u[1],F:void 0,type:"link"})},linkMailtoDetector:{t:bt(Lg),i:oe.MAX,l(u){let h=u[1],d=u[1];return Eg.test(d)||(d="mailto:"+d),{v:[{v:h.replace("mailto:",""),type:"text"}],B:d,type:"link"}}},orderedList:hs(r,1),unorderedList:hs(r,2),newlineCoalescer:{t:it(Rg),i:oe.LOW,l:Zr,h:()=>`
`},paragraph:{t:vb,i:oe.LOW,l:Jr,h:(u,h,d)=>r("p",{key:d.k},h(u.v,d))},ref:{t:bt(zg),i:oe.MAX,l:u=>(l[u[1]]={B:u[2],F:u[4]},{}),h:Qr},refImage:{t:vt(Hg),i:oe.MAX,l:u=>({D:u[1]||void 0,P:u[2]}),h:(u,h,d)=>r("img",{key:d.k,alt:u.D,src:Wt(l[u.P].B),title:l[u.P].F})},refLink:{t:bt(Ug),i:oe.MAX,l:(u,h,d)=>({v:h(u[1],d),Z:h(u[0].replace(Gg,"\\$1"),d),P:u[2]}),h:(u,h,d)=>l[u.P]?r("a",{key:d.k,href:Wt(l[u.P].B),title:l[u.P].F},h(u.v,d)):r("span",{key:d.k},h(u.Z,d))},table:{t:it(hl),i:oe.HIGH,l:bb,h:(u,h,d)=>r("table",{key:d.k},r("thead",null,r("tr",null,u.L.map(function(b,x){return r("th",{key:x,style:bs(u,x)},h(b,d))}))),r("tbody",null,u.A.map(function(b,x){return r("tr",{key:x},b.map(function(R,w){return r("td",{key:w,style:bs(u,w)},h(R,d))}))})))},tableSeparator:{t:function(u,h){return h.$?(h._=!0,Xg.exec(u)):null},i:oe.HIGH,l:function(){return{type:"tableSeparator"}},h:()=>" | "},text:{t:wn(ab),i:oe.MIN,l:u=>({v:u[0].replace(Ig,(h,d)=>t.namedCodesToUnicode[d]?t.namedCodesToUnicode[d]:h)}),h:u=>u.v},textBolded:{t:vt(eb),i:oe.MED,l:(u,h,d)=>({v:h(u[2],d)}),h:(u,h,d)=>r("strong",{key:d.k},h(u.v,d))},textEmphasized:{t:vt(tb),i:oe.LOW,l:(u,h,d)=>({v:h(u[2],d)}),h:(u,h,d)=>r("em",{key:d.k},h(u.v,d))},textEscaped:{t:vt(ob),i:oe.HIGH,l:u=>({v:u[1],type:"text"})},textMarked:{t:vt(nb),i:oe.LOW,l:Jr,h:(u,h,d)=>r("mark",{key:d.k},h(u.v,d))},textStrikethroughed:{t:vt(rb),i:oe.LOW,l:Jr,h:(u,h,d)=>r("del",{key:d.k},h(u.v,d))}};t.disableParsingRawHTML!==!0&&(c.htmlBlock={t:wn(bo),i:oe.HIGH,l(u,h,d){const[,b]=u[3].match(ib),x=new RegExp(`^${b}`,"gm"),R=u[3].replace(x,""),w=(k=R,mb.some(M=>M.test(k))?wb:pr);var k;const y=u[1].toLowerCase(),S=xg.indexOf(y)!==-1;d.N=d.N||y==="a";const O=S?u[3]:w(h,R,d);return d.N=!1,{O:a(u[2]),v:O,G:S,H:S?y:u[1]}},h:(u,h,d)=>r(u.H,$t({key:d.k},u.O),u.G?u.v:h(u.v,d))},c.htmlSelfClosing={t:wn(vo),i:oe.HIGH,l:u=>({O:a(u[2]||""),H:u[1]}),h:(u,h,d)=>r(u.H,$t({},u.O,{key:d.k}))});const f=function(u){let h=Object.keys(u);function d(b,x){let R=[],w="";for(;b;){let k=0;for(;k<h.length;){const y=h[k],S=u[y],O=S.t(b,x,w);if(O){const M=O[0];b=b.substring(M.length);const D=S.l(O,d,x);D.type==null&&(D.type=y),R.push(D),w=M;break}k++}}return R}return h.sort(function(b,x){let R=u[b].i,w=u[x].i;return R!==w?R-w:b<x?-1:1}),function(b,x){return d(function(R){return R.replace(Pg,`
`).replace(_g,"").replace(Wg,"    ")}(b),x)}}(c),m=(v=function(u){return function(h,d,b){return u[h.type].h(h,d,b)}}(c),function u(h,d={}){if(Array.isArray(h)){const b=d.k,x=[];let R=!1;for(let w=0;w<h.length;w++){d.k=w;const k=u(h[w],d),y=typeof k=="string";y&&R?x[x.length-1]+=k:k!==null&&x.push(k),R=y}return d.k=b,x}return v(h,u,d)});var v;const g=o(e);return s.length?r("div",null,g,r("footer",{key:"footer"},s.map(function(u){return r("div",{id:t.slugify(u.j),key:u.j},u.j,m(f(u.I,{_:!0})))}))):g}(function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"})(oe||(oe={}));const Eb=e=>{let{children:t,options:n}=e,r=function(o,a){if(o==null)return{};var s,l,c={},f=Object.keys(o);for(l=0;l<f.length;l++)a.indexOf(s=f[l])>=0||(c[s]=o[s]);return c}(e,wg);return N.cloneElement(kb(t,n),r)};function Tb({markdown:e}){return p.jsx("div",{className:"pr-prose",children:p.jsx(Eb,{children:e})})}const Cl=T.forwardRef((e,t)=>p.jsxs(Ne,{ref:t,className:"pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600",...e,children:[p.jsx(de.Filter,{size:16,className:"pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"}),"Filter",p.jsx(de.ChevronDown,{size:16,className:"pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"})]}));var Ol=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(Ol||{});function Nb({groups:e}){return p.jsxs(wr,{children:[p.jsx(Eo,{asChild:!0,children:p.jsx(Cl,{})}),p.jsx(Vn,{children:e.map(t=>p.jsxs(p.Fragment,{children:[p.jsx(sn,{children:t.label}),p.jsx(Cs,{children:t.items.map(n=>p.jsx("div",{children:n.itemType===0?p.jsx(xr,{onClick:n.onClick,children:n.label}):p.jsx(No,{onClick:n.onClick,value:n.label,children:n.label})}))}),p.jsx(Fn,{})]}))})]})}const Sb=(e,t)=>{T.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},to=()=>!1,Cb=(e,t)=>{const[n]=yr(T.useCallback(async()=>{if(!e)return to;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),to,{preserveValue:!1});T.useEffect(()=>()=>{n!==to&&n()},[n])},Rl=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:V("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));Rl.displayName="Card";const Pl=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:V("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));Pl.displayName="CardHeader";const jl=T.forwardRef(({className:e,...t},n)=>p.jsx("h3",{ref:n,className:V("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));jl.displayName="CardTitle";const $l=T.forwardRef(({className:e,...t},n)=>p.jsx("p",{ref:n,className:V("pr-text-sm pr-text-muted-foreground",e),...t}));$l.displayName="CardDescription";const _l=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:V("pr-p-6 pr-pt-0",e),...t}));_l.displayName="CardContent";const Ml=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:V("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));Ml.displayName="CardFooter";const Ob=yo.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),Il=T.forwardRef(({className:e,variant:t,...n},r)=>p.jsx("div",{ref:r,role:"alert",className:V(Ob({variant:t}),e),...n}));Il.displayName="Alert";const Al=T.forwardRef(({className:e,...t},n)=>p.jsxs("h5",{ref:n,className:V("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));Al.displayName="AlertTitle";const Dl=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:V("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));Dl.displayName="AlertDescription";const Bl=T.forwardRef(({className:e,...t},n)=>p.jsxs(kn.Root,{ref:n,className:V("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[p.jsx(kn.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:p.jsx(kn.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),p.jsx(kn.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));Bl.displayName=kn.Root.displayName;const Ll=T.forwardRef(({className:e,...t},n)=>p.jsx(ro.Root,{className:V("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:n,children:p.jsx(ro.Thumb,{className:V("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));Ll.displayName=ro.Root.displayName;exports.Alert=Il;exports.AlertDescription=Dl;exports.AlertTitle=Al;exports.BookChapterControl=Ic;exports.Button=Ne;exports.Card=Rl;exports.CardContent=_l;exports.CardDescription=$l;exports.CardFooter=Ml;exports.CardHeader=Pl;exports.CardTitle=jl;exports.ChapterRangeSelector=Qc;exports.Checkbox=Gs;exports.Checklist=ep;exports.ComboBox=oo;exports.ContextMenu=Jh;exports.DataTable=Ds;exports.DisableButton=vg;exports.DropdownMenu=wr;exports.DropdownMenuCheckboxItem=xr;exports.DropdownMenuContent=Vn;exports.DropdownMenuGroup=Cs;exports.DropdownMenuItem=To;exports.DropdownMenuItemType=Ol;exports.DropdownMenuLabel=sn;exports.DropdownMenuPortal=kc;exports.DropdownMenuRadioGroup=Tc;exports.DropdownMenuRadioItem=No;exports.DropdownMenuSeparator=Fn;exports.DropdownMenuShortcut=Ps;exports.DropdownMenuSub=Ec;exports.DropdownMenuSubContent=Rs;exports.DropdownMenuSubTrigger=Os;exports.DropdownMenuTrigger=Eo;exports.EnableButton=bg;exports.FilterButton=Cl;exports.FilterDropdown=Nb;exports.GridMenu=Fi;exports.HamburgerMenuButton=Qi;exports.INVENTORY_STRING_KEYS=Lc;exports.IconButton=eg;exports.Input=Ln;exports.InstallButton=gg;exports.Inventory=Hc;exports.Label=Ko;exports.LabelPosition=Pt;exports.MarkdownRenderer=Tb;exports.MenuItem=Xo;exports.ScriptureResultsViewer=ig;exports.SearchBar=cg;exports.Select=$n;exports.SelectContent=Jt;exports.SelectGroup=$s;exports.SelectItem=Ye;exports.SelectLabel=_s;exports.SelectScrollDownButton=Co;exports.SelectScrollUpButton=So;exports.SelectSeparator=Ms;exports.SelectTrigger=Kt;exports.SelectValue=_n;exports.ShadCnSlider=Bl;exports.ShadCnSwitch=Ll;exports.Slider=pg;exports.Snackbar=ug;exports.Switch=dg;exports.Table=zn;exports.TableBody=Un;exports.TableCaption=As;exports.TableCell=It;exports.TableFooter=Is;exports.TableHead=Zt;exports.TableHeader=Hn;exports.TableRow=lt;exports.Tabs=mg;exports.TabsContent=ol;exports.TabsList=nl;exports.TabsTrigger=rl;exports.TextField=tl;exports.Toolbar=fg;exports.UpdateButton=yg;exports.VerticalTabs=al;exports.VerticalTabsContent=il;exports.VerticalTabsList=sl;exports.VerticalTabsTrigger=hg;exports.buttonVariants=js;exports.getSortingIcon=Vc;exports.useEvent=Sb;exports.useEventAsync=Cb;exports.usePromise=yr;function Rb(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Rb(`/*
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
.pr-me-2 {
  margin-inline-end: 0.5rem;
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
.pr-pl-8 {
  padding-left: 2rem;
}
.pr-pr-2 {
  padding-right: 0.5rem;
}
.pr-pr-3 {
  padding-right: 0.75rem;
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
.pr-text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
