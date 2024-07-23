"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const u=require("react/jsx-runtime"),T=require("react"),Ye=require("platform-bible-utils"),fs=require("@radix-ui/react-dropdown-menu"),fe=require("lucide-react"),Ne=require("clsx"),Bl=require("tailwind-merge"),Ce=require("@tanstack/react-table"),Ll=require("@radix-ui/react-slot"),ho=require("class-variance-authority"),Vl=require("@radix-ui/react-select"),ye=require("@mui/material"),Jr=require("@mui/styled-engine"),bn=require("react-dom"),Fl=require("@radix-ui/react-label"),zl=require("@radix-ui/react-tabs"),Ul=require("@radix-ui/react-slider"),Hl=require("@radix-ui/react-switch");function bt(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const S=bt(T),me=bt(fs),we=bt(Vl),Gl=bt(bn),hs=bt(Fl),_e=bt(zl),vn=bt(Ul),Zr=bt(Hl);var ql=Object.defineProperty,Wl=(e,t,n)=>t in e?ql(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t,n)=>Wl(e,typeof t!="symbol"?t+"":t,n);const jt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],mo=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ms=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],la=rc();function nn(e,t=!0){return t&&(e=e.toUpperCase()),e in la?la[e]:0}function go(e){return nn(e)>0}function Xl(e){const t=typeof e=="string"?nn(e):e;return t>=40&&t<=66}function Yl(e){return(typeof e=="string"?nn(e):e)<=39}function gs(e){return e<=66}function Kl(e){const t=typeof e=="string"?nn(e):e;return ys(t)&&!gs(t)}function*Jl(){for(let e=1;e<=jt.length;e++)yield e}const Zl=1,bs=jt.length;function Ql(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function bo(e,t="***"){const n=e-1;return n<0||n>=jt.length?t:jt[n]}function vs(e){return e<=0||e>bs?"******":ms[e-1]}function ec(e){return vs(nn(e))}function ys(e){const t=typeof e=="number"?bo(e):e;return go(t)&&!mo.includes(t)}function tc(e){const t=typeof e=="number"?bo(e):e;return go(t)&&mo.includes(t)}function nc(e){return ms[e-1].includes("*obsolete*")}function rc(){const e={};for(let t=0;t<jt.length;t++)e[jt[t]]=t+1;return e}const de={allBookIds:jt,nonCanonicalIds:mo,bookIdToNumber:nn,isBookIdValid:go,isBookNT:Xl,isBookOT:Yl,isBookOTNT:gs,isBookDC:Kl,allBookNumbers:Jl,firstBook:Zl,lastBook:bs,extraBooks:Ql,bookNumberToId:bo,bookNumberToEnglishName:vs,bookIdToEnglishName:ec,isCanonical:ys,isExtraMaterial:tc,isObsolete:nc};var Ke=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ke||{});const Be=class{constructor(t){if(re(this,"name"),re(this,"fullPath"),re(this,"isPresent"),re(this,"hasVerseSegments"),re(this,"isCustomized"),re(this,"baseVersification"),re(this,"scriptureBooks"),re(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Ke[t]):(this._type=t,this.name=Ke[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};re(Be,"Original",new Be(Ke.Original)),re(Be,"Septuagint",new Be(Ke.Septuagint)),re(Be,"Vulgate",new Be(Ke.Vulgate)),re(Be,"English",new Be(Ke.English)),re(Be,"RussianProtestant",new Be(Ke.RussianProtestant)),re(Be,"RussianOrthodox",new Be(Ke.RussianOrthodox));let kt=Be;function ca(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var ws=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(ws||{});const $e=class ie{constructor(t,n,r,o){if(re(this,"firstChapter"),re(this,"lastChapter"),re(this,"lastVerse"),re(this,"hasSegmentsDefined"),re(this,"text"),re(this,"BBBCCCVVVS"),re(this,"longHashCode"),re(this,"versification"),re(this,"rtlMark","‏"),re(this,"_bookNum",0),re(this,"_chapterNum",0),re(this,"_verseNum",0),re(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const a=t,s=n!=null&&n instanceof kt?n:void 0;this.setEmpty(s),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=n!=null&&n instanceof kt?n:void 0;this.setEmpty(a),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ie){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof kt?t:ie.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new ie(t),{success:!0,verseRef:n}}catch(r){if(r instanceof pn)return n=new ie,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ie.bcvMaxValue*ie.bookDigitShifter+(n>=0?n%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(r>=0?r%ie.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:a,versificationStr:s}=t,l=a||o.toString();let c;return s&&(c=new kt(s)),n?new ie(n,r.toString(),l,c):new ie}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>ie.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return de.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=de.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ie.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>de.lastBook)throw new pn("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new kt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const s=+a[1].trim();this.versification=new kt(Ke[s])}catch{throw new pn("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new pn("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||de.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(r[1]))throw new pn("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;return(t===""||t===this.verseNum.toString())&&(t=void 0),{book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr}}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=ie.verseRangeSeparators,r=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=ca(this._verse,r);for(const s of a.map(l=>ca(l,n))){const l=this.clone();l.verse=s[0];const c=l.verseNum;if(o.push(l),s.length>1){const d=this.clone();if(d.verse=s[1],!t)for(let h=c+1;h<d.verseNum;h++){const v=new ie(this._bookNum,this._chapterNum,h,this.versification);this.isExcluded||o.push(v)}o.push(d)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const a=o.internalValid;if(a!==0)return a;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>de.lastBook?2:(de.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=de.bookIdToNumber(t),this.chapter=n,this.verse=r}};re($e,"defaultVersification",kt.English),re($e,"verseRangeSeparator","-"),re($e,"verseSequenceIndicator",","),re($e,"verseRangeSeparators",[$e.verseRangeSeparator]),re($e,"verseSequenceIndicators",[$e.verseSequenceIndicator]),re($e,"chapterDigitShifter",1e3),re($e,"bookDigitShifter",$e.chapterDigitShifter*$e.chapterDigitShifter),re($e,"bcvMaxValue",$e.chapterDigitShifter-1),re($e,"ValidStatusType",ws);let pn=class extends Error{};const oc=Bl.extendTailwindMerge({prefix:"pr-"});function H(...e){return oc(Ne.clsx(e))}const vo=me.Root,xs=me.Trigger,ac=me.Group,sc=me.Portal,ic=me.Sub,lc=me.RadioGroup,Es=T.forwardRef(({className:e,inset:t,children:n,...r},o)=>u.jsxs(me.SubTrigger,{ref:o,className:H("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,u.jsx(fe.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Es.displayName=me.SubTrigger.displayName;const ks=T.forwardRef(({className:e,...t},n)=>u.jsx(me.SubContent,{ref:n,className:H("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));ks.displayName=me.SubContent.displayName;const mr=T.forwardRef(({className:e,sideOffset:t=4,...n},r)=>u.jsx(me.Portal,{children:u.jsx(me.Content,{ref:r,sideOffset:t,className:H("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));mr.displayName=me.Content.displayName;const yo=T.forwardRef(({className:e,inset:t,...n},r)=>u.jsx(me.Item,{ref:r,className:H("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));yo.displayName=me.Item.displayName;const wo=T.forwardRef(({className:e,children:t,checked:n,...r},o)=>u.jsxs(me.CheckboxItem,{ref:o,className:H("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[u.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:u.jsx(me.ItemIndicator,{children:u.jsx(fe.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));wo.displayName=me.CheckboxItem.displayName;const Ts=T.forwardRef(({className:e,children:t,...n},r)=>u.jsxs(me.RadioItem,{ref:r,className:H("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[u.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:u.jsx(me.ItemIndicator,{children:u.jsx(fe.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));Ts.displayName=me.RadioItem.displayName;const In=T.forwardRef(({className:e,inset:t,...n},r)=>u.jsx(me.Label,{ref:r,className:H("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));In.displayName=me.Label.displayName;const gr=T.forwardRef(({className:e,...t},n)=>u.jsx(me.Separator,{ref:n,className:H("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));gr.displayName=me.Separator.displayName;function Ss({className:e,...t}){return u.jsx("span",{className:H("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Ss.displayName="DropdownMenuShortcut";const _n=T.forwardRef(({className:e,type:t,...n},r)=>u.jsx("input",{type:t,className:H("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));_n.displayName="Input";const cc=T.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},a)=>u.jsxs("div",{className:"pr-relative",children:[u.jsx(_n,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r(),t(s)},onClick:n,ref:a}),u.jsx(fe.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function pc({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const a=Array.from({length:t},(l,c)=>c+1),s=T.useCallback(l=>{o(l)},[o]);return u.jsx("div",{className:H("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:a.map(l=>u.jsx("div",{className:H("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===n,"pr-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>s(l),children:l},l))})}const uc=T.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:a,children:s},l)=>u.jsxs(yo,{ref:l,textValue:e,className:H("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[u.jsx("span",{className:H("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":a.toLowerCase()==="ot","pr-border-l-purple-200":a.toLowerCase()==="nt","pr-border-l-indigo-200":a.toLowerCase()==="dc"}),children:de.bookIdToEnglishName(e)}),n&&u.jsx("div",{children:s})]},e));function dc({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return u.jsxs(In,{className:"pr-flex pr-justify-between",children:[u.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),u.jsxs("div",{className:"pr-flex pr-items-center",children:[u.jsx(fe.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),u.jsx(fe.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),u.jsx(fe.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const En=de.allBookIds,fc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},pa=["OT","NT","DC"],hc=32+32+32,mc=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],gc=e=>({OT:En.filter(n=>de.isBookOT(n)),NT:En.filter(n=>de.isBookNT(n)),DC:En.filter(n=>de.isBookDC(n))})[e],un=e=>Ye.getChaptersForBook(de.bookIdToNumber(e));function bc(){return En.map(t=>de.bookIdToEnglishName(t))}function vc(e){return bc().includes(e)}function yc(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(vc(t))return En.find(r=>de.bookIdToEnglishName(r)===t)}function wc({scrRef:e,handleSubmit:t}){const[n,r]=T.useState(""),[o,a]=T.useState(de.bookNumberToId(e.bookNum)),[s,l]=T.useState(e.chapterNum??0),[c,d]=T.useState(de.bookNumberToId(e.bookNum)),[h,v]=T.useState(!1),[b,p]=T.useState(h),m=T.useRef(void 0),f=T.useRef(void 0),g=T.useRef(void 0),x=T.useCallback(k=>gc(k).filter(C=>{const $=de.bookIdToEnglishName(C).toLowerCase(),V=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return $.includes(V)||C.toLowerCase().includes(V)}),[n]),j=k=>{r(k)},w=T.useRef(!1),E=T.useCallback(k=>{if(w.current){w.current=!1;return}v(k)},[]),y=T.useCallback((k,C,$,V)=>{if(l(de.bookNumberToId(e.bookNum)!==k?1:e.chapterNum),C||un(k)===-1){t({bookNum:de.bookIdToNumber(k),chapterNum:$||1,verseNum:V||1}),v(!1),r("");return}a(o!==k?k:""),v(!C)},[t,e.bookNum,e.chapterNum,o]),O=k=>{k<=0||k>un(o)||y(o,!0,k)},N=T.useCallback(()=>{mc.forEach(k=>{const C=n.match(k);if(C){const[$,V=void 0,U=void 0]=C.slice(1),M=yc($);(de.isBookIdValid($)||M)&&y(M??$,!0,V?parseInt(V,10):1,U?parseInt(U,10):1)}})},[y,n]),_=T.useCallback(k=>{h?(k.key==="ArrowDown"||k.key==="ArrowUp")&&(typeof g<"u"&&g.current!==null?g.current.focus():typeof f<"u"&&f.current!==null&&f.current.focus(),k.preventDefault()):v(!0)},[h]),D=k=>{const{key:C}=k;C==="ArrowRight"||C==="ArrowLeft"||C==="ArrowDown"||C==="ArrowUp"||C==="Enter"||(m.current.dispatchEvent(new KeyboardEvent("keydown",{key:C})),m.current.focus())},L=k=>{const{key:C}=k;if(c===o){if(C==="Enter"){k.preventDefault(),y(o,!0,s);return}let $=0;if(C==="ArrowRight")if(s<un(c))$=1;else{k.preventDefault();return}else if(C==="ArrowLeft")if(s>1)$=-1;else{k.preventDefault();return}else C==="ArrowDown"?$=6:C==="ArrowUp"&&($=-6);s+$<=0||s+$>un(c)?l(0):$!==0&&(l(s+$),k.preventDefault())}};return T.useEffect(()=>{o===c?o===de.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),T.useLayoutEffect(()=>{p(h)},[h]),T.useLayoutEffect(()=>{const k=setTimeout(()=>{if(b&&f.current&&g.current){const $=g.current.offsetTop-hc;f.current.scrollTo({top:$,behavior:"instant"})}},10);return()=>{clearTimeout(k)}},[b]),u.jsx("div",{className:"pr-flex",children:u.jsxs(vo,{modal:!1,open:h,onOpenChange:E,children:[u.jsx(xs,{asChild:!0,children:u.jsx(cc,{ref:m,value:n,handleSearch:j,handleKeyDown:_,handleOnClick:()=>{a(de.bookNumberToId(e.bookNum)),d(de.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),v(!0),m.current.focus()},onFocus:()=>{w.current=!0},handleSubmit:N,placeholder:`${de.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),u.jsxs(mr,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:D,align:"start",ref:f,children:[u.jsx(dc,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),pa.map((k,C)=>x(k).length>0&&u.jsxs("div",{children:[u.jsx(In,{className:"pr-font-semibold pr-text-slate-700",children:fc[k]}),x(k).map($=>u.jsx("div",{children:u.jsx(uc,{bookId:$,handleSelectBook:()=>y($,!1),isSelected:o===$,handleHighlightBook:()=>d($),handleKeyDown:L,bookType:k,ref:V=>{o===$&&(g.current=V)},children:u.jsx(pc,{handleSelectChapter:O,endChapter:un($),activeChapter:e.bookNum===de.bookIdToNumber($)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:V=>{l(V)}})})},$)),pa.length-1!==C?u.jsx(gr,{}):void 0]},k))]})]})})}const An=T.forwardRef(({className:e,...t},n)=>u.jsx("div",{className:"pr-relative pr-w-full pr-overflow-auto",children:u.jsx("table",{ref:n,className:H("pr-w-full pr-caption-bottom pr-text-sm",e),...t})}));An.displayName="Table";const Dn=T.forwardRef(({className:e,...t},n)=>u.jsx("thead",{ref:n,className:H("[&_tr]:pr-border-b",e),...t}));Dn.displayName="TableHeader";const Bn=T.forwardRef(({className:e,...t},n)=>u.jsx("tbody",{ref:n,className:H("[&_tr:last-child]:pr-border-0",e),...t}));Bn.displayName="TableBody";const Ns=T.forwardRef(({className:e,...t},n)=>u.jsx("tfoot",{ref:n,className:H("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));Ns.displayName="TableFooter";const at=T.forwardRef(({className:e,...t},n)=>u.jsx("tr",{ref:n,className:H("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));at.displayName="TableRow";const Wt=T.forwardRef(({className:e,...t},n)=>u.jsx("th",{ref:n,className:H("pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",e),...t}));Wt.displayName="TableHead";const $t=T.forwardRef(({className:e,...t},n)=>u.jsx("td",{ref:n,className:H("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0",e),...t}));$t.displayName="TableCell";const Cs=T.forwardRef(({className:e,...t},n)=>u.jsx("caption",{ref:n,className:H("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));Cs.displayName="TableCaption";const Os=ho.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),Ee=T.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},a)=>{const s=r?Ll.Slot:"button";return u.jsx(s,{className:H(Os({variant:t,size:n,className:e})),ref:a,...o})});Ee.displayName="Button";const Cn=we.Root,Rs=we.Group,On=we.Value,Xt=T.forwardRef(({className:e,children:t,...n},r)=>u.jsxs(we.Trigger,{ref:r,className:H("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...n,children:[t,u.jsx(we.Icon,{asChild:!0,children:u.jsx(fe.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));Xt.displayName=we.Trigger.displayName;const xo=T.forwardRef(({className:e,...t},n)=>u.jsx(we.ScrollUpButton,{ref:n,className:H("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:u.jsx(fe.ChevronUp,{className:"pr-h-4 pr-w-4"})}));xo.displayName=we.ScrollUpButton.displayName;const Eo=T.forwardRef(({className:e,...t},n)=>u.jsx(we.ScrollDownButton,{ref:n,className:H("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:u.jsx(fe.ChevronDown,{className:"pr-h-4 pr-w-4"})}));Eo.displayName=we.ScrollDownButton.displayName;const Yt=T.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>u.jsx(we.Portal,{children:u.jsxs(we.Content,{ref:o,className:H("pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:n,...r,children:[u.jsx(xo,{}),u.jsx(we.Viewport,{className:H("pr-p-1",n==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),u.jsx(Eo,{})]})}));Yt.displayName=we.Content.displayName;const Ps=T.forwardRef(({className:e,...t},n)=>u.jsx(we.Label,{ref:n,className:H("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));Ps.displayName=we.Label.displayName;const Xe=T.forwardRef(({className:e,children:t,...n},r)=>u.jsxs(we.Item,{ref:r,className:H("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[u.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:u.jsx(we.ItemIndicator,{children:u.jsx(fe.Check,{className:"pr-h-4 pr-w-4"})})}),u.jsx(we.ItemText,{children:t})]}));Xe.displayName=we.Item.displayName;const js=T.forwardRef(({className:e,...t},n)=>u.jsx(we.Separator,{ref:n,className:H("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));js.displayName=we.Separator.displayName;function xc({table:e}){return u.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:u.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[u.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),u.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[u.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),u.jsxs(Cn,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[u.jsx(Xt,{className:"pr-h-8 pr-w-[70px]",children:u.jsx(On,{placeholder:e.getState().pagination.pageSize})}),u.jsx(Yt,{side:"top",children:[10,20,30,40,50].map(t=>u.jsx(Xe,{value:`${t}`,children:t},t))})]})]}),u.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),u.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[u.jsxs(Ee,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),u.jsx(fe.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),u.jsxs(Ee,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),u.jsx(fe.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),u.jsxs(Ee,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),u.jsx(fe.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),u.jsxs(Ee,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),u.jsx(fe.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}function Ec({table:e}){return u.jsxs(vo,{children:[u.jsx(fs.DropdownMenuTrigger,{asChild:!0,children:u.jsxs(Ee,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[u.jsx(fe.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),u.jsxs(mr,{align:"end",className:"pr-w-[150px]",children:[u.jsx(In,{children:"Toggle columns"}),u.jsx(gr,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>u.jsx(wo,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}function $s({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,onRowClickHandler:a=()=>{}}){var f;const[s,l]=T.useState([]),[c,d]=T.useState([]),[h,v]=T.useState({}),[b,p]=T.useState({}),m=Ce.useReactTable({data:t,columns:e,getCoreRowModel:Ce.getCoreRowModel(),...n&&{getPaginationRowModel:Ce.getPaginationRowModel()},onSortingChange:l,getSortedRowModel:Ce.getSortedRowModel(),onColumnFiltersChange:d,getFilteredRowModel:Ce.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:p,state:{sorting:s,columnFilters:c,columnVisibility:h,rowSelection:b}});return u.jsxs("div",{children:[o&&u.jsx(Ec,{table:m}),u.jsx("div",{className:"pr-twp pr-font-sans",children:u.jsxs(An,{children:[u.jsx(Dn,{children:m.getHeaderGroups().map(g=>u.jsx(at,{children:g.headers.map(x=>u.jsx(Wt,{children:x.isPlaceholder?void 0:Ce.flexRender(x.column.columnDef.header,x.getContext())},x.id))},g.id))}),u.jsx(Bn,{children:(f=m.getRowModel().rows)!=null&&f.length?m.getRowModel().rows.map(g=>u.jsx(at,{onClick:()=>a(g,m),"data-state":g.getIsSelected()&&"selected",children:g.getVisibleCells().map(x=>u.jsx($t,{children:Ce.flexRender(x.column.columnDef.cell,x.getContext())},x.id))},g.id)):u.jsx(at,{children:u.jsx($t,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]})}),n&&u.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[u.jsx(Ee,{variant:"outline",size:"sm",onClick:()=>m.previousPage(),disabled:!m.getCanPreviousPage(),children:"Previous"}),u.jsx(Ee,{variant:"outline",size:"sm",onClick:()=>m.nextPage(),disabled:!m.getCanNextPage(),children:"Next"})]}),n&&r&&u.jsx(xc,{table:m})]})}function Qr({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:a=!1,width:s,options:l=[],className:c,value:d,onChange:h,onFocus:v,onBlur:b,getOptionLabel:p}){return u.jsx(ye.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:a,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:d,onChange:h,onFocus:v,onBlur:b,getOptionLabel:p,renderInput:m=>u.jsx(ye.TextField,{...m,error:o,fullWidth:a,disabled:n,label:t,style:{width:s}})})}function kc({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,a]=T.useState(1),[s,l]=T.useState(r),[c,d]=T.useState(Array.from({length:r},(b,p)=>p+1));T.useEffect(()=>{a(1),e(1),l(r),t(r),d(Array.from({length:r},(b,p)=>p+1))},[r,t,e]);const h=(b,p)=>{a(p),e(p),p>s&&(l(p),t(p))},v=(b,p)=>{l(p),t(p),p<o&&(a(p),e(p))};return u.jsxs(u.Fragment,{children:[u.jsx(ye.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:u.jsx(Qr,{onChange:(b,p)=>h(b,p),className:"book-selection-chapter",isClearable:!1,options:c,getOptionLabel:b=>b.toString(),value:o,isDisabled:n},"start chapter"),label:"Chapters",labelPlacement:"start"}),u.jsx(ye.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:u.jsx(Qr,{onChange:(b,p)=>v(b,p),className:"book-selection-chapter",isClearable:!1,options:c,getOptionLabel:b=>b.toString(),value:s,isDisabled:n},"end chapter"),label:"to",labelPlacement:"start"})]})}var Ct=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Ct||{});function Ms({id:e,isChecked:t,labelText:n="",labelPosition:r=Ct.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:s=!1,hasError:l=!1,className:c,onChange:d}){const h=u.jsx(ye.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:a,disabled:s,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:d});let v;if(n){const b=r===Ct.Before||r===Ct.Above,p=u.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),m=r===Ct.Before||r===Ct.After,f=m?p:u.jsx("div",{children:p}),g=m?h:u.jsx("div",{children:h});v=u.jsxs(ye.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:l,children:[b&&f,g,!b&&f]})}else v=h;return v}function Tc({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:a,createLabel:s}){return u.jsxs("fieldset",{id:e,className:t,children:[n&&u.jsx("legend",{children:n}),r.map(l=>u.jsx(Ms,{className:"check-item",isChecked:o.includes(l),labelText:s?s(l):l,onChange:()=>a(l)},l))]})}function he(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,a;for(a=0;a<r.length;a++)o=r[a],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},P.apply(this,arguments)}function Sc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Nc(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var eo={exports:{}},Yn={exports:{}},le={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ua;function Cc(){if(ua)return le;ua=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,h=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,b=e?Symbol.for("react.suspense_list"):60120,p=e?Symbol.for("react.memo"):60115,m=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,g=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,j=e?Symbol.for("react.scope"):60119;function w(y){if(typeof y=="object"&&y!==null){var O=y.$$typeof;switch(O){case t:switch(y=y.type,y){case c:case d:case r:case a:case o:case v:return y;default:switch(y=y&&y.$$typeof,y){case l:case h:case m:case p:case s:return y;default:return O}}case n:return O}}}function E(y){return w(y)===d}return le.AsyncMode=c,le.ConcurrentMode=d,le.ContextConsumer=l,le.ContextProvider=s,le.Element=t,le.ForwardRef=h,le.Fragment=r,le.Lazy=m,le.Memo=p,le.Portal=n,le.Profiler=a,le.StrictMode=o,le.Suspense=v,le.isAsyncMode=function(y){return E(y)||w(y)===c},le.isConcurrentMode=E,le.isContextConsumer=function(y){return w(y)===l},le.isContextProvider=function(y){return w(y)===s},le.isElement=function(y){return typeof y=="object"&&y!==null&&y.$$typeof===t},le.isForwardRef=function(y){return w(y)===h},le.isFragment=function(y){return w(y)===r},le.isLazy=function(y){return w(y)===m},le.isMemo=function(y){return w(y)===p},le.isPortal=function(y){return w(y)===n},le.isProfiler=function(y){return w(y)===a},le.isStrictMode=function(y){return w(y)===o},le.isSuspense=function(y){return w(y)===v},le.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===r||y===d||y===a||y===o||y===v||y===b||typeof y=="object"&&y!==null&&(y.$$typeof===m||y.$$typeof===p||y.$$typeof===s||y.$$typeof===l||y.$$typeof===h||y.$$typeof===g||y.$$typeof===x||y.$$typeof===j||y.$$typeof===f)},le.typeOf=w,le}var ce={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var da;function Oc(){return da||(da=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,h=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,b=e?Symbol.for("react.suspense_list"):60120,p=e?Symbol.for("react.memo"):60115,m=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,g=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,j=e?Symbol.for("react.scope"):60119;function w(B){return typeof B=="string"||typeof B=="function"||B===r||B===d||B===a||B===o||B===v||B===b||typeof B=="object"&&B!==null&&(B.$$typeof===m||B.$$typeof===p||B.$$typeof===s||B.$$typeof===l||B.$$typeof===h||B.$$typeof===g||B.$$typeof===x||B.$$typeof===j||B.$$typeof===f)}function E(B){if(typeof B=="object"&&B!==null){var te=B.$$typeof;switch(te){case t:var A=B.type;switch(A){case c:case d:case r:case a:case o:case v:return A;default:var se=A&&A.$$typeof;switch(se){case l:case h:case m:case p:case s:return se;default:return te}}case n:return te}}}var y=c,O=d,N=l,_=s,D=t,L=h,k=r,C=m,$=p,V=n,U=a,M=o,F=v,ee=!1;function Z(B){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),R(B)||E(B)===c}function R(B){return E(B)===d}function I(B){return E(B)===l}function z(B){return E(B)===s}function X(B){return typeof B=="object"&&B!==null&&B.$$typeof===t}function G(B){return E(B)===h}function q(B){return E(B)===r}function Y(B){return E(B)===m}function K(B){return E(B)===p}function W(B){return E(B)===n}function J(B){return E(B)===a}function Q(B){return E(B)===o}function ae(B){return E(B)===v}ce.AsyncMode=y,ce.ConcurrentMode=O,ce.ContextConsumer=N,ce.ContextProvider=_,ce.Element=D,ce.ForwardRef=L,ce.Fragment=k,ce.Lazy=C,ce.Memo=$,ce.Portal=V,ce.Profiler=U,ce.StrictMode=M,ce.Suspense=F,ce.isAsyncMode=Z,ce.isConcurrentMode=R,ce.isContextConsumer=I,ce.isContextProvider=z,ce.isElement=X,ce.isForwardRef=G,ce.isFragment=q,ce.isLazy=Y,ce.isMemo=K,ce.isPortal=W,ce.isProfiler=J,ce.isStrictMode=Q,ce.isSuspense=ae,ce.isValidElementType=w,ce.typeOf=E}()),ce}var fa;function Is(){return fa||(fa=1,process.env.NODE_ENV==="production"?Yn.exports=Cc():Yn.exports=Oc()),Yn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Ir,ha;function Rc(){if(ha)return Ir;ha=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var s={},l=0;l<10;l++)s["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(s).map(function(h){return s[h]});if(c.join("")!=="0123456789")return!1;var d={};return"abcdefghijklmnopqrst".split("").forEach(function(h){d[h]=h}),Object.keys(Object.assign({},d)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Ir=o()?Object.assign:function(a,s){for(var l,c=r(a),d,h=1;h<arguments.length;h++){l=Object(arguments[h]);for(var v in l)t.call(l,v)&&(c[v]=l[v]);if(e){d=e(l);for(var b=0;b<d.length;b++)n.call(l,d[b])&&(c[d[b]]=l[d[b]])}}return c},Ir}var _r,ma;function ko(){if(ma)return _r;ma=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return _r=e,_r}var Ar,ga;function _s(){return ga||(ga=1,Ar=Function.call.bind(Object.prototype.hasOwnProperty)),Ar}var Dr,ba;function Pc(){if(ba)return Dr;ba=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=ko(),n={},r=_s();e=function(a){var s="Warning: "+a;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(a,s,l,c,d){if(process.env.NODE_ENV!=="production"){for(var h in a)if(r(a,h)){var v;try{if(typeof a[h]!="function"){var b=Error((c||"React class")+": "+l+" type `"+h+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[h]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw b.name="Invariant Violation",b}v=a[h](s,h,c,l,null,t)}catch(m){v=m}if(v&&!(v instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+h+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof v+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),v instanceof Error&&!(v.message in n)){n[v.message]=!0;var p=d?d():"";e("Failed "+l+" type: "+v.message+(p??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Dr=o,Dr}var Br,va;function jc(){if(va)return Br;va=1;var e=Is(),t=Rc(),n=ko(),r=_s(),o=Pc(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function s(){return null}return Br=function(l,c){var d=typeof Symbol=="function"&&Symbol.iterator,h="@@iterator";function v(R){var I=R&&(d&&R[d]||R[h]);if(typeof I=="function")return I}var b="<<anonymous>>",p={array:x("array"),bigint:x("bigint"),bool:x("boolean"),func:x("function"),number:x("number"),object:x("object"),string:x("string"),symbol:x("symbol"),any:j(),arrayOf:w,element:E(),elementType:y(),instanceOf:O,node:L(),objectOf:_,oneOf:N,oneOfType:D,shape:C,exact:$};function m(R,I){return R===I?R!==0||1/R===1/I:R!==R&&I!==I}function f(R,I){this.message=R,this.data=I&&typeof I=="object"?I:{},this.stack=""}f.prototype=Error.prototype;function g(R){if(process.env.NODE_ENV!=="production")var I={},z=0;function X(q,Y,K,W,J,Q,ae){if(W=W||b,Q=Q||K,ae!==n){if(c){var B=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw B.name="Invariant Violation",B}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var te=W+":"+K;!I[te]&&z<3&&(a("You are manually calling a React.PropTypes validation function for the `"+Q+"` prop on `"+W+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),I[te]=!0,z++)}}return Y[K]==null?q?Y[K]===null?new f("The "+J+" `"+Q+"` is marked as required "+("in `"+W+"`, but its value is `null`.")):new f("The "+J+" `"+Q+"` is marked as required in "+("`"+W+"`, but its value is `undefined`.")):null:R(Y,K,W,J,Q)}var G=X.bind(null,!1);return G.isRequired=X.bind(null,!0),G}function x(R){function I(z,X,G,q,Y,K){var W=z[X],J=M(W);if(J!==R){var Q=F(W);return new f("Invalid "+q+" `"+Y+"` of type "+("`"+Q+"` supplied to `"+G+"`, expected ")+("`"+R+"`."),{expectedType:R})}return null}return g(I)}function j(){return g(s)}function w(R){function I(z,X,G,q,Y){if(typeof R!="function")return new f("Property `"+Y+"` of component `"+G+"` has invalid PropType notation inside arrayOf.");var K=z[X];if(!Array.isArray(K)){var W=M(K);return new f("Invalid "+q+" `"+Y+"` of type "+("`"+W+"` supplied to `"+G+"`, expected an array."))}for(var J=0;J<K.length;J++){var Q=R(K,J,G,q,Y+"["+J+"]",n);if(Q instanceof Error)return Q}return null}return g(I)}function E(){function R(I,z,X,G,q){var Y=I[z];if(!l(Y)){var K=M(Y);return new f("Invalid "+G+" `"+q+"` of type "+("`"+K+"` supplied to `"+X+"`, expected a single ReactElement."))}return null}return g(R)}function y(){function R(I,z,X,G,q){var Y=I[z];if(!e.isValidElementType(Y)){var K=M(Y);return new f("Invalid "+G+" `"+q+"` of type "+("`"+K+"` supplied to `"+X+"`, expected a single ReactElement type."))}return null}return g(R)}function O(R){function I(z,X,G,q,Y){if(!(z[X]instanceof R)){var K=R.name||b,W=Z(z[X]);return new f("Invalid "+q+" `"+Y+"` of type "+("`"+W+"` supplied to `"+G+"`, expected ")+("instance of `"+K+"`."))}return null}return g(I)}function N(R){if(!Array.isArray(R))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),s;function I(z,X,G,q,Y){for(var K=z[X],W=0;W<R.length;W++)if(m(K,R[W]))return null;var J=JSON.stringify(R,function(ae,B){var te=F(B);return te==="symbol"?String(B):B});return new f("Invalid "+q+" `"+Y+"` of value `"+String(K)+"` "+("supplied to `"+G+"`, expected one of "+J+"."))}return g(I)}function _(R){function I(z,X,G,q,Y){if(typeof R!="function")return new f("Property `"+Y+"` of component `"+G+"` has invalid PropType notation inside objectOf.");var K=z[X],W=M(K);if(W!=="object")return new f("Invalid "+q+" `"+Y+"` of type "+("`"+W+"` supplied to `"+G+"`, expected an object."));for(var J in K)if(r(K,J)){var Q=R(K,J,G,q,Y+"."+J,n);if(Q instanceof Error)return Q}return null}return g(I)}function D(R){if(!Array.isArray(R))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var I=0;I<R.length;I++){var z=R[I];if(typeof z!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ee(z)+" at index "+I+"."),s}function X(G,q,Y,K,W){for(var J=[],Q=0;Q<R.length;Q++){var ae=R[Q],B=ae(G,q,Y,K,W,n);if(B==null)return null;B.data&&r(B.data,"expectedType")&&J.push(B.data.expectedType)}var te=J.length>0?", expected one of type ["+J.join(", ")+"]":"";return new f("Invalid "+K+" `"+W+"` supplied to "+("`"+Y+"`"+te+"."))}return g(X)}function L(){function R(I,z,X,G,q){return V(I[z])?null:new f("Invalid "+G+" `"+q+"` supplied to "+("`"+X+"`, expected a ReactNode."))}return g(R)}function k(R,I,z,X,G){return new f((R||"React class")+": "+I+" type `"+z+"."+X+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+G+"`.")}function C(R){function I(z,X,G,q,Y){var K=z[X],W=M(K);if(W!=="object")return new f("Invalid "+q+" `"+Y+"` of type `"+W+"` "+("supplied to `"+G+"`, expected `object`."));for(var J in R){var Q=R[J];if(typeof Q!="function")return k(G,q,Y,J,F(Q));var ae=Q(K,J,G,q,Y+"."+J,n);if(ae)return ae}return null}return g(I)}function $(R){function I(z,X,G,q,Y){var K=z[X],W=M(K);if(W!=="object")return new f("Invalid "+q+" `"+Y+"` of type `"+W+"` "+("supplied to `"+G+"`, expected `object`."));var J=t({},z[X],R);for(var Q in J){var ae=R[Q];if(r(R,Q)&&typeof ae!="function")return k(G,q,Y,Q,F(ae));if(!ae)return new f("Invalid "+q+" `"+Y+"` key `"+Q+"` supplied to `"+G+"`.\nBad object: "+JSON.stringify(z[X],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(R),null,"  "));var B=ae(K,Q,G,q,Y+"."+Q,n);if(B)return B}return null}return g(I)}function V(R){switch(typeof R){case"number":case"string":case"undefined":return!0;case"boolean":return!R;case"object":if(Array.isArray(R))return R.every(V);if(R===null||l(R))return!0;var I=v(R);if(I){var z=I.call(R),X;if(I!==R.entries){for(;!(X=z.next()).done;)if(!V(X.value))return!1}else for(;!(X=z.next()).done;){var G=X.value;if(G&&!V(G[1]))return!1}}else return!1;return!0;default:return!1}}function U(R,I){return R==="symbol"?!0:I?I["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&I instanceof Symbol:!1}function M(R){var I=typeof R;return Array.isArray(R)?"array":R instanceof RegExp?"object":U(I,R)?"symbol":I}function F(R){if(typeof R>"u"||R===null)return""+R;var I=M(R);if(I==="object"){if(R instanceof Date)return"date";if(R instanceof RegExp)return"regexp"}return I}function ee(R){var I=F(R);switch(I){case"array":case"object":return"an "+I;case"boolean":case"date":case"regexp":return"a "+I;default:return I}}function Z(R){return!R.constructor||!R.constructor.name?b:R.constructor.name}return p.checkPropTypes=o,p.resetWarningCache=o.resetWarningCache,p.PropTypes=p,p},Br}var Lr,ya;function $c(){if(ya)return Lr;ya=1;var e=ko();function t(){}function n(){}return n.resetWarningCache=t,Lr=function(){function r(s,l,c,d,h,v){if(v!==e){var b=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw b.name="Invariant Violation",b}}r.isRequired=r;function o(){return r}var a={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return a.PropTypes=a,a},Lr}if(process.env.NODE_ENV!=="production"){var Mc=Is(),Ic=!0;eo.exports=jc()(Mc.isElement,Ic)}else eo.exports=$c()();var _c=eo.exports;const i=Sc(_c);function rn(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function Ot(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function As(e){if(!Ot(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=As(e[n])}),t}function st(e,t,n={clone:!0}){const r=n.clone?P({},e):e;return Ot(e)&&Ot(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Ot(t[o])&&o in e&&Ot(e[o])?r[o]=st(e[o],t[o],n):n.clone?r[o]=Ot(t[o])?As(t[o]):t[o]:r[o]=t[o])}),r}function Ac(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ds(e,t,n,r,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let l;const c=a.type;return typeof c=="function"&&!Ac(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Bs=rn(i.element,Ds);Bs.isRequired=rn(i.element.isRequired,Ds);const Ln=Bs;function Dc(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Bc(e,t,n,r,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let l;return typeof a=="function"&&!Dc(a)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Lc=rn(i.elementType,Bc),Vc="exact-prop: ​";function Ls(e){return process.env.NODE_ENV==="production"?e:P({},e,{[Vc]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Kt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var to={exports:{}},pe={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wa;function Fc(){if(wa)return pe;wa=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),h=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),p=Symbol.for("react.offscreen"),m;m=Symbol.for("react.module.reference");function f(g){if(typeof g=="object"&&g!==null){var x=g.$$typeof;switch(x){case e:switch(g=g.type,g){case n:case o:case r:case d:case h:return g;default:switch(g=g&&g.$$typeof,g){case l:case s:case c:case b:case v:case a:return g;default:return x}}case t:return x}}}return pe.ContextConsumer=s,pe.ContextProvider=a,pe.Element=e,pe.ForwardRef=c,pe.Fragment=n,pe.Lazy=b,pe.Memo=v,pe.Portal=t,pe.Profiler=o,pe.StrictMode=r,pe.Suspense=d,pe.SuspenseList=h,pe.isAsyncMode=function(){return!1},pe.isConcurrentMode=function(){return!1},pe.isContextConsumer=function(g){return f(g)===s},pe.isContextProvider=function(g){return f(g)===a},pe.isElement=function(g){return typeof g=="object"&&g!==null&&g.$$typeof===e},pe.isForwardRef=function(g){return f(g)===c},pe.isFragment=function(g){return f(g)===n},pe.isLazy=function(g){return f(g)===b},pe.isMemo=function(g){return f(g)===v},pe.isPortal=function(g){return f(g)===t},pe.isProfiler=function(g){return f(g)===o},pe.isStrictMode=function(g){return f(g)===r},pe.isSuspense=function(g){return f(g)===d},pe.isSuspenseList=function(g){return f(g)===h},pe.isValidElementType=function(g){return typeof g=="string"||typeof g=="function"||g===n||g===o||g===r||g===d||g===h||g===p||typeof g=="object"&&g!==null&&(g.$$typeof===b||g.$$typeof===v||g.$$typeof===a||g.$$typeof===s||g.$$typeof===c||g.$$typeof===m||g.getModuleId!==void 0)},pe.typeOf=f,pe}var ue={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xa;function zc(){return xa||(xa=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),h=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),p=Symbol.for("react.offscreen"),m=!1,f=!1,g=!1,x=!1,j=!1,w;w=Symbol.for("react.module.reference");function E(A){return!!(typeof A=="string"||typeof A=="function"||A===n||A===o||j||A===r||A===d||A===h||x||A===p||m||f||g||typeof A=="object"&&A!==null&&(A.$$typeof===b||A.$$typeof===v||A.$$typeof===a||A.$$typeof===s||A.$$typeof===c||A.$$typeof===w||A.getModuleId!==void 0))}function y(A){if(typeof A=="object"&&A!==null){var se=A.$$typeof;switch(se){case e:var Te=A.type;switch(Te){case n:case o:case r:case d:case h:return Te;default:var Pe=Te&&Te.$$typeof;switch(Pe){case l:case s:case c:case b:case v:case a:return Pe;default:return se}}case t:return se}}}var O=s,N=a,_=e,D=c,L=n,k=b,C=v,$=t,V=o,U=r,M=d,F=h,ee=!1,Z=!1;function R(A){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function I(A){return Z||(Z=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function z(A){return y(A)===s}function X(A){return y(A)===a}function G(A){return typeof A=="object"&&A!==null&&A.$$typeof===e}function q(A){return y(A)===c}function Y(A){return y(A)===n}function K(A){return y(A)===b}function W(A){return y(A)===v}function J(A){return y(A)===t}function Q(A){return y(A)===o}function ae(A){return y(A)===r}function B(A){return y(A)===d}function te(A){return y(A)===h}ue.ContextConsumer=O,ue.ContextProvider=N,ue.Element=_,ue.ForwardRef=D,ue.Fragment=L,ue.Lazy=k,ue.Memo=C,ue.Portal=$,ue.Profiler=V,ue.StrictMode=U,ue.Suspense=M,ue.SuspenseList=F,ue.isAsyncMode=R,ue.isConcurrentMode=I,ue.isContextConsumer=z,ue.isContextProvider=X,ue.isElement=G,ue.isForwardRef=q,ue.isFragment=Y,ue.isLazy=K,ue.isMemo=W,ue.isPortal=J,ue.isProfiler=Q,ue.isStrictMode=ae,ue.isSuspense=B,ue.isSuspenseList=te,ue.isValidElementType=E,ue.typeOf=y}()),ue}process.env.NODE_ENV==="production"?to.exports=Fc():to.exports=zc();var sr=to.exports;const Uc=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Hc(e){const t=`${e}`.match(Uc);return t&&t[1]||""}function Vs(e,t=""){return e.displayName||e.name||Hc(e)||t}function Ea(e,t,n){const r=Vs(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Gc(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Vs(e,"Component");if(typeof e=="object")switch(e.$$typeof){case sr.ForwardRef:return Ea(e,e.render,"ForwardRef");case sr.Memo:return Ea(e,e.type,"memo");default:return}}}function it(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=e[t],s=o||t;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const qc=i.oneOfType([i.func,i.object]),To=qc;function Ze(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Kt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function no(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Fs(e,t=166){let n;function r(...o){const a=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(a,t)}return r.clear=()=>{clearTimeout(n)},r}function Wc(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,a,s)=>{const l=o||"<<anonymous>>",c=s||r;return typeof n[r]<"u"?new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function Xc(e,t){var n,r;return S.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Oe(e){return e&&e.ownerDocument||document}function Jt(e){return Oe(e).defaultView||window}function Yc(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?P({},t.propTypes):null;return o=>(a,s,l,c,d,...h)=>{const v=d||s,b=n==null?void 0:n[v];if(b){const p=b(a,s,l,c,d,...h);if(p)return p}return typeof a[s]<"u"&&!a[o]?new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function ir(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Kc=typeof window<"u"?S.useLayoutEffect:S.useEffect,Mt=Kc;let ka=0;function Jc(e){const[t,n]=S.useState(e),r=e||t;return S.useEffect(()=>{t==null&&(ka+=1,n(`mui-${ka}`))},[t]),r}const Ta=S["useId".toString()];function zs(e){if(Ta!==void 0){const t=Ta();return e??t}return Jc(e)}function Zc(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=o||t;return typeof e[t]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function Us({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=S.useRef(e!==void 0),[a,s]=S.useState(t),l=o?e:a;if(process.env.NODE_ENV!=="production"){S.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:d}=S.useRef(t);S.useEffect(()=>{!o&&d!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=S.useCallback(d=>{o||s(d)},[]);return[l,c]}function Rn(e){const t=S.useRef(e);return Mt(()=>{t.current=e}),S.useRef((...n)=>(0,t.current)(...n)).current}function He(...e){return S.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{ir(n,t)})},e)}const Sa={};function Qc(e,t){const n=S.useRef(Sa);return n.current===Sa&&(n.current=e(t)),n}const ep=[];function tp(e){S.useEffect(e,ep)}class Vn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Vn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function yn(){const e=Qc(Vn.create).current;return tp(e.disposeEffect),e}let br=!0,ro=!1;const np=new Vn,rp={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function op(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&rp[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function ap(e){e.metaKey||e.altKey||e.ctrlKey||(br=!0)}function Vr(){br=!1}function sp(){this.visibilityState==="hidden"&&ro&&(br=!0)}function ip(e){e.addEventListener("keydown",ap,!0),e.addEventListener("mousedown",Vr,!0),e.addEventListener("pointerdown",Vr,!0),e.addEventListener("touchstart",Vr,!0),e.addEventListener("visibilitychange",sp,!0)}function lp(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return br||op(t)}function Hs(){const e=S.useCallback(o=>{o!=null&&ip(o.ownerDocument)},[]),t=S.useRef(!1);function n(){return t.current?(ro=!0,np.start(100,()=>{ro=!1}),t.current=!1,!0):!1}function r(o){return lp(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Gs(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function cp(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function pp(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const up=Number.isInteger||pp;function qs(e,t,n,r){const o=e[t];if(o==null||!up(o)){const a=cp(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function Ws(e,t,...n){return e[t]===void 0?null:qs(e,t,...n)}function oo(){return null}Ws.isRequired=qs;oo.isRequired=oo;const Xs=process.env.NODE_ENV==="production"?oo:Ws;function Ys(e,t){const n=P({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=P({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},a=t[r];n[r]={},!a||!Object.keys(a)?n[r]=o:!o||!Object.keys(o)?n[r]=a:(n[r]=P({},a),Object.keys(o).forEach(s=>{n[r][s]=Ys(o[s],a[s])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function pt(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((a,s)=>{if(s){const l=t(s);l!==""&&a.push(l),n&&n[s]&&a.push(n[s])}return a},[]).join(" ")}),r}const Na=e=>e,dp=()=>{let e=Na;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Na}}},fp=dp(),Ks=fp,Js={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function et(e,t,n="Mui"){const r=Js[t];return r?`${n}-${r}`:`${Ks.generate(e)}-${t}`}function vt(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=et(e,o,n)}),r}function hp(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Zs(e){return typeof e=="string"}function wn(e,t,n){return e===void 0||Zs(e)?t:P({},t,{ownerState:P({},t.ownerState,n)})}const mp={disableDefaultClasses:!1},gp=S.createContext(mp);function bp(e){const{disableDefaultClasses:t}=S.useContext(gp);return n=>t?"":e(n)}function Qs(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function vp(e,t,n){return typeof e=="function"?e(t,n):e}function Ca(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function yp(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:a}=e;if(!t){const p=Ne(n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),m=P({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=P({},n,o,r);return p.length>0&&(f.className=p),Object.keys(m).length>0&&(f.style=m),{props:f,internalRef:void 0}}const s=Qs(P({},o,r)),l=Ca(r),c=Ca(o),d=t(s),h=Ne(d==null?void 0:d.className,n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),v=P({},d==null?void 0:d.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),b=P({},d,n,c,l);return h.length>0&&(b.className=h),Object.keys(v).length>0&&(b.style=v),{props:b,internalRef:d.ref}}const wp=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function It(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:a=!1}=e,s=he(e,wp),l=a?{}:vp(r,o),{props:c,internalRef:d}=yp(P({},s,{externalSlotProps:l})),h=He(d,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return wn(n,P({},c,{ref:h}),o)}const ei="base";function xp(e){return`${ei}--${e}`}function Ep(e,t){return`${ei}-${e}-${t}`}function ti(e,t){const n=Js[t];return n?xp(n):Ep(e,t)}function kp(e,t){const n={};return t.forEach(r=>{n[r]=ti(e,r)}),n}const Tp=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Sp(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function Np(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Cp(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Np(e))}function Op(e){const t=[],n=[];return Array.from(e.querySelectorAll(Tp)).forEach((r,o)=>{const a=Sp(r);a===-1||!Cp(r)||(a===0?t.push(r):n.push({documentOrder:o,tabIndex:a,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function Rp(){return!0}function lr(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:a=Op,isEnabled:s=Rp,open:l}=e,c=S.useRef(!1),d=S.useRef(null),h=S.useRef(null),v=S.useRef(null),b=S.useRef(null),p=S.useRef(!1),m=S.useRef(null),f=He(t.ref,m),g=S.useRef(null);S.useEffect(()=>{!l||!m.current||(p.current=!n)},[n,l]),S.useEffect(()=>{if(!l||!m.current)return;const w=Oe(m.current);return m.current.contains(w.activeElement)||(m.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),m.current.setAttribute("tabIndex","-1")),p.current&&m.current.focus()),()=>{o||(v.current&&v.current.focus&&(c.current=!0,v.current.focus()),v.current=null)}},[l]),S.useEffect(()=>{if(!l||!m.current)return;const w=Oe(m.current),E=N=>{g.current=N,!(r||!s()||N.key!=="Tab")&&w.activeElement===m.current&&N.shiftKey&&(c.current=!0,h.current&&h.current.focus())},y=()=>{const N=m.current;if(N===null)return;if(!w.hasFocus()||!s()||c.current){c.current=!1;return}if(N.contains(w.activeElement)||r&&w.activeElement!==d.current&&w.activeElement!==h.current)return;if(w.activeElement!==b.current)b.current=null;else if(b.current!==null)return;if(!p.current)return;let _=[];if((w.activeElement===d.current||w.activeElement===h.current)&&(_=a(m.current)),_.length>0){var D,L;const k=!!((D=g.current)!=null&&D.shiftKey&&((L=g.current)==null?void 0:L.key)==="Tab"),C=_[0],$=_[_.length-1];typeof C!="string"&&typeof $!="string"&&(k?$.focus():C.focus())}else N.focus()};w.addEventListener("focusin",y),w.addEventListener("keydown",E,!0);const O=setInterval(()=>{w.activeElement&&w.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(O),w.removeEventListener("focusin",y),w.removeEventListener("keydown",E,!0)}},[n,r,o,s,l,a]);const x=w=>{v.current===null&&(v.current=w.relatedTarget),p.current=!0,b.current=w.target;const E=t.props.onFocus;E&&E(w)},j=w=>{v.current===null&&(v.current=w.relatedTarget),p.current=!0};return u.jsxs(S.Fragment,{children:[u.jsx("div",{tabIndex:l?0:-1,onFocus:j,ref:d,"data-testid":"sentinelStart"}),S.cloneElement(t,{ref:f,onFocus:x}),u.jsx("div",{tabIndex:l?0:-1,onFocus:j,ref:h,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(lr.propTypes={children:Ln,disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableRestoreFocus:i.bool,getTabbable:i.func,isEnabled:i.func,open:i.bool.isRequired});process.env.NODE_ENV!=="production"&&(lr["propTypes"]=Ls(lr.propTypes));function Pp(e){return typeof e=="function"?e():e}const Pn=S.forwardRef(function(t,n){const{children:r,container:o,disablePortal:a=!1}=t,[s,l]=S.useState(null),c=He(S.isValidElement(r)?r.ref:null,n);if(Mt(()=>{a||l(Pp(o)||document.body)},[o,a]),Mt(()=>{if(s&&!a)return ir(n,s),()=>{ir(n,null)}},[n,s,a]),a){if(S.isValidElement(r)){const d={ref:c};return S.cloneElement(r,d)}return u.jsx(S.Fragment,{children:r})}return u.jsx(S.Fragment,{children:s&&Gl.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&(Pn.propTypes={children:i.node,container:i.oneOfType([it,i.func]),disablePortal:i.bool});process.env.NODE_ENV!=="production"&&(Pn["propTypes"]=Ls(Pn.propTypes));function jp(e){const t=Oe(e);return t.body===e?Jt(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function kn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Oa(e){return parseInt(Jt(e).getComputedStyle(e).paddingRight,10)||0}function $p(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Ra(e,t,n,r,o){const a=[t,n,...r];[].forEach.call(e.children,s=>{const l=a.indexOf(s)===-1,c=!$p(s);l&&c&&kn(s,o)})}function Fr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function Mp(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(jp(r)){const s=Gs(Oe(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Oa(r)+s}px`;const l=Oe(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${Oa(c)+s}px`})}let a;if(r.parentNode instanceof DocumentFragment)a=Oe(r).body;else{const s=r.parentElement,l=Jt(r);a=(s==null?void 0:s.nodeName)==="HTML"&&l.getComputedStyle(s).overflowY==="scroll"?s:r}n.push({value:a.style.overflow,property:"overflow",el:a},{value:a.style.overflowX,property:"overflow-x",el:a},{value:a.style.overflowY,property:"overflow-y",el:a}),a.style.overflow="hidden"}return()=>{n.forEach(({value:a,el:s,property:l})=>{a?s.style.setProperty(l,a):s.style.removeProperty(l)})}}function Ip(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class _p{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&kn(t.modalRef,!1);const o=Ip(n);Ra(n,t.mount,t.modalRef,o,!0);const a=Fr(this.containers,s=>s.container===n);return a!==-1?(this.containers[a].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=Fr(this.containers,a=>a.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=Mp(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=Fr(this.containers,s=>s.modals.indexOf(t)!==-1),a=this.containers[o];if(a.modals.splice(a.modals.indexOf(t),1),this.modals.splice(r,1),a.modals.length===0)a.restore&&a.restore(),t.modalRef&&kn(t.modalRef,n),Ra(a.container,t.mount,t.modalRef,a.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=a.modals[a.modals.length-1];s.modalRef&&kn(s.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Ap(e){return typeof e=="function"?e():e}function Dp(e){return e?e.props.hasOwnProperty("in"):!1}const Bp=new _p;function Lp(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Bp,closeAfterTransition:a=!1,onTransitionEnter:s,onTransitionExited:l,children:c,onClose:d,open:h,rootRef:v}=e,b=S.useRef({}),p=S.useRef(null),m=S.useRef(null),f=He(m,v),[g,x]=S.useState(!h),j=Dp(c);let w=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(w=!1);const E=()=>Oe(p.current),y=()=>(b.current.modalRef=m.current,b.current.mount=p.current,b.current),O=()=>{o.mount(y(),{disableScrollLock:r}),m.current&&(m.current.scrollTop=0)},N=Rn(()=>{const M=Ap(t)||E().body;o.add(y(),M),m.current&&O()}),_=S.useCallback(()=>o.isTopModal(y()),[o]),D=Rn(M=>{p.current=M,M&&(h&&_()?O():m.current&&kn(m.current,w))}),L=S.useCallback(()=>{o.remove(y(),w)},[w,o]);S.useEffect(()=>()=>{L()},[L]),S.useEffect(()=>{h?N():(!j||!a)&&L()},[h,L,j,a,N]);const k=M=>F=>{var ee;(ee=M.onKeyDown)==null||ee.call(M,F),!(F.key!=="Escape"||F.which===229||!_())&&(n||(F.stopPropagation(),d&&d(F,"escapeKeyDown")))},C=M=>F=>{var ee;(ee=M.onClick)==null||ee.call(M,F),F.target===F.currentTarget&&d&&d(F,"backdropClick")};return{getRootProps:(M={})=>{const F=Qs(e);delete F.onTransitionEnter,delete F.onTransitionExited;const ee=P({},F,M);return P({role:"presentation"},ee,{onKeyDown:k(ee),ref:f})},getBackdropProps:(M={})=>{const F=M;return P({"aria-hidden":!0},F,{onClick:C(F),open:h})},getTransitionProps:()=>{const M=()=>{x(!1),s&&s()},F=()=>{x(!0),l&&l(),a&&L()};return{onEnter:no(M,c==null?void 0:c.props.onEnter),onExited:no(F,c==null?void 0:c.props.onExited)}},rootRef:f,portalRef:D,isTopModal:_,exited:g,hasTransition:j}}var Me="top",Ge="bottom",qe="right",Ie="left",So="auto",Fn=[Me,Ge,qe,Ie],Zt="start",jn="end",Vp="clippingParents",ni="viewport",dn="popper",Fp="reference",Pa=Fn.reduce(function(e,t){return e.concat([t+"-"+Zt,t+"-"+jn])},[]),ri=[].concat(Fn,[So]).reduce(function(e,t){return e.concat([t,t+"-"+Zt,t+"-"+jn])},[]),zp="beforeRead",Up="read",Hp="afterRead",Gp="beforeMain",qp="main",Wp="afterMain",Xp="beforeWrite",Yp="write",Kp="afterWrite",Jp=[zp,Up,Hp,Gp,qp,Wp,Xp,Yp,Kp];function Qe(e){return e?(e.nodeName||"").toLowerCase():null}function Ve(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function _t(e){var t=Ve(e).Element;return e instanceof t||e instanceof Element}function Ue(e){var t=Ve(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function No(e){if(typeof ShadowRoot>"u")return!1;var t=Ve(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Zp(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},a=t.elements[n];!Ue(a)||!Qe(a)||(Object.assign(a.style,r),Object.keys(o).forEach(function(s){var l=o[s];l===!1?a.removeAttribute(s):a.setAttribute(s,l===!0?"":l)}))})}function Qp(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],a=t.attributes[r]||{},s=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=s.reduce(function(c,d){return c[d]="",c},{});!Ue(o)||!Qe(o)||(Object.assign(o.style,l),Object.keys(a).forEach(function(c){o.removeAttribute(c)}))})}}const eu={name:"applyStyles",enabled:!0,phase:"write",fn:Zp,effect:Qp,requires:["computeStyles"]};function Je(e){return e.split("-")[0]}var Pt=Math.max,cr=Math.min,Qt=Math.round;function ao(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function oi(){return!/^((?!chrome|android).)*safari/i.test(ao())}function en(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,a=1;t&&Ue(e)&&(o=e.offsetWidth>0&&Qt(r.width)/e.offsetWidth||1,a=e.offsetHeight>0&&Qt(r.height)/e.offsetHeight||1);var s=_t(e)?Ve(e):window,l=s.visualViewport,c=!oi()&&n,d=(r.left+(c&&l?l.offsetLeft:0))/o,h=(r.top+(c&&l?l.offsetTop:0))/a,v=r.width/o,b=r.height/a;return{width:v,height:b,top:h,right:d+v,bottom:h+b,left:d,x:d,y:h}}function Co(e){var t=en(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function ai(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&No(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function lt(e){return Ve(e).getComputedStyle(e)}function tu(e){return["table","td","th"].indexOf(Qe(e))>=0}function yt(e){return((_t(e)?e.ownerDocument:e.document)||window.document).documentElement}function vr(e){return Qe(e)==="html"?e:e.assignedSlot||e.parentNode||(No(e)?e.host:null)||yt(e)}function ja(e){return!Ue(e)||lt(e).position==="fixed"?null:e.offsetParent}function nu(e){var t=/firefox/i.test(ao()),n=/Trident/i.test(ao());if(n&&Ue(e)){var r=lt(e);if(r.position==="fixed")return null}var o=vr(e);for(No(o)&&(o=o.host);Ue(o)&&["html","body"].indexOf(Qe(o))<0;){var a=lt(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function zn(e){for(var t=Ve(e),n=ja(e);n&&tu(n)&&lt(n).position==="static";)n=ja(n);return n&&(Qe(n)==="html"||Qe(n)==="body"&&lt(n).position==="static")?t:n||nu(e)||t}function Oo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Tn(e,t,n){return Pt(e,cr(t,n))}function ru(e,t,n){var r=Tn(e,t,n);return r>n?n:r}function si(){return{top:0,right:0,bottom:0,left:0}}function ii(e){return Object.assign({},si(),e)}function li(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var ou=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,ii(typeof t!="number"?t:li(t,Fn))};function au(e){var t,n=e.state,r=e.name,o=e.options,a=n.elements.arrow,s=n.modifiersData.popperOffsets,l=Je(n.placement),c=Oo(l),d=[Ie,qe].indexOf(l)>=0,h=d?"height":"width";if(!(!a||!s)){var v=ou(o.padding,n),b=Co(a),p=c==="y"?Me:Ie,m=c==="y"?Ge:qe,f=n.rects.reference[h]+n.rects.reference[c]-s[c]-n.rects.popper[h],g=s[c]-n.rects.reference[c],x=zn(a),j=x?c==="y"?x.clientHeight||0:x.clientWidth||0:0,w=f/2-g/2,E=v[p],y=j-b[h]-v[m],O=j/2-b[h]/2+w,N=Tn(E,O,y),_=c;n.modifiersData[r]=(t={},t[_]=N,t.centerOffset=N-O,t)}}function su(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||ai(t.elements.popper,o)&&(t.elements.arrow=o))}const iu={name:"arrow",enabled:!0,phase:"main",fn:au,effect:su,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function tn(e){return e.split("-")[1]}var lu={top:"auto",right:"auto",bottom:"auto",left:"auto"};function cu(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Qt(n*o)/o||0,y:Qt(r*o)/o||0}}function $a(e){var t,n=e.popper,r=e.popperRect,o=e.placement,a=e.variation,s=e.offsets,l=e.position,c=e.gpuAcceleration,d=e.adaptive,h=e.roundOffsets,v=e.isFixed,b=s.x,p=b===void 0?0:b,m=s.y,f=m===void 0?0:m,g=typeof h=="function"?h({x:p,y:f}):{x:p,y:f};p=g.x,f=g.y;var x=s.hasOwnProperty("x"),j=s.hasOwnProperty("y"),w=Ie,E=Me,y=window;if(d){var O=zn(n),N="clientHeight",_="clientWidth";if(O===Ve(n)&&(O=yt(n),lt(O).position!=="static"&&l==="absolute"&&(N="scrollHeight",_="scrollWidth")),O=O,o===Me||(o===Ie||o===qe)&&a===jn){E=Ge;var D=v&&O===y&&y.visualViewport?y.visualViewport.height:O[N];f-=D-r.height,f*=c?1:-1}if(o===Ie||(o===Me||o===Ge)&&a===jn){w=qe;var L=v&&O===y&&y.visualViewport?y.visualViewport.width:O[_];p-=L-r.width,p*=c?1:-1}}var k=Object.assign({position:l},d&&lu),C=h===!0?cu({x:p,y:f},Ve(n)):{x:p,y:f};if(p=C.x,f=C.y,c){var $;return Object.assign({},k,($={},$[E]=j?"0":"",$[w]=x?"0":"",$.transform=(y.devicePixelRatio||1)<=1?"translate("+p+"px, "+f+"px)":"translate3d("+p+"px, "+f+"px, 0)",$))}return Object.assign({},k,(t={},t[E]=j?f+"px":"",t[w]=x?p+"px":"",t.transform="",t))}function pu(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,a=n.adaptive,s=a===void 0?!0:a,l=n.roundOffsets,c=l===void 0?!0:l,d={placement:Je(t.placement),variation:tn(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,$a(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,$a(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const uu={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:pu,data:{}};var Kn={passive:!0};function du(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,a=o===void 0?!0:o,s=r.resize,l=s===void 0?!0:s,c=Ve(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&d.forEach(function(h){h.addEventListener("scroll",n.update,Kn)}),l&&c.addEventListener("resize",n.update,Kn),function(){a&&d.forEach(function(h){h.removeEventListener("scroll",n.update,Kn)}),l&&c.removeEventListener("resize",n.update,Kn)}}const fu={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:du,data:{}};var hu={left:"right",right:"left",bottom:"top",top:"bottom"};function tr(e){return e.replace(/left|right|bottom|top/g,function(t){return hu[t]})}var mu={start:"end",end:"start"};function Ma(e){return e.replace(/start|end/g,function(t){return mu[t]})}function Ro(e){var t=Ve(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Po(e){return en(yt(e)).left+Ro(e).scrollLeft}function gu(e,t){var n=Ve(e),r=yt(e),o=n.visualViewport,a=r.clientWidth,s=r.clientHeight,l=0,c=0;if(o){a=o.width,s=o.height;var d=oi();(d||!d&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:a,height:s,x:l+Po(e),y:c}}function bu(e){var t,n=yt(e),r=Ro(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=Pt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=Pt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Po(e),c=-r.scrollTop;return lt(o||n).direction==="rtl"&&(l+=Pt(n.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:l,y:c}}function jo(e){var t=lt(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function ci(e){return["html","body","#document"].indexOf(Qe(e))>=0?e.ownerDocument.body:Ue(e)&&jo(e)?e:ci(vr(e))}function Sn(e,t){var n;t===void 0&&(t=[]);var r=ci(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),a=Ve(r),s=o?[a].concat(a.visualViewport||[],jo(r)?r:[]):r,l=t.concat(s);return o?l:l.concat(Sn(vr(s)))}function so(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function vu(e,t){var n=en(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Ia(e,t,n){return t===ni?so(gu(e,n)):_t(t)?vu(t,n):so(bu(yt(e)))}function yu(e){var t=Sn(vr(e)),n=["absolute","fixed"].indexOf(lt(e).position)>=0,r=n&&Ue(e)?zn(e):e;return _t(r)?t.filter(function(o){return _t(o)&&ai(o,r)&&Qe(o)!=="body"}):[]}function wu(e,t,n,r){var o=t==="clippingParents"?yu(e):[].concat(t),a=[].concat(o,[n]),s=a[0],l=a.reduce(function(c,d){var h=Ia(e,d,r);return c.top=Pt(h.top,c.top),c.right=cr(h.right,c.right),c.bottom=cr(h.bottom,c.bottom),c.left=Pt(h.left,c.left),c},Ia(e,s,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function pi(e){var t=e.reference,n=e.element,r=e.placement,o=r?Je(r):null,a=r?tn(r):null,s=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Me:c={x:s,y:t.y-n.height};break;case Ge:c={x:s,y:t.y+t.height};break;case qe:c={x:t.x+t.width,y:l};break;case Ie:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var d=o?Oo(o):null;if(d!=null){var h=d==="y"?"height":"width";switch(a){case Zt:c[d]=c[d]-(t[h]/2-n[h]/2);break;case jn:c[d]=c[d]+(t[h]/2-n[h]/2);break}}return c}function $n(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,a=n.strategy,s=a===void 0?e.strategy:a,l=n.boundary,c=l===void 0?Vp:l,d=n.rootBoundary,h=d===void 0?ni:d,v=n.elementContext,b=v===void 0?dn:v,p=n.altBoundary,m=p===void 0?!1:p,f=n.padding,g=f===void 0?0:f,x=ii(typeof g!="number"?g:li(g,Fn)),j=b===dn?Fp:dn,w=e.rects.popper,E=e.elements[m?j:b],y=wu(_t(E)?E:E.contextElement||yt(e.elements.popper),c,h,s),O=en(e.elements.reference),N=pi({reference:O,element:w,strategy:"absolute",placement:o}),_=so(Object.assign({},w,N)),D=b===dn?_:O,L={top:y.top-D.top+x.top,bottom:D.bottom-y.bottom+x.bottom,left:y.left-D.left+x.left,right:D.right-y.right+x.right},k=e.modifiersData.offset;if(b===dn&&k){var C=k[o];Object.keys(L).forEach(function($){var V=[qe,Ge].indexOf($)>=0?1:-1,U=[Me,Ge].indexOf($)>=0?"y":"x";L[$]+=C[U]*V})}return L}function xu(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,a=n.rootBoundary,s=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,d=c===void 0?ri:c,h=tn(r),v=h?l?Pa:Pa.filter(function(m){return tn(m)===h}):Fn,b=v.filter(function(m){return d.indexOf(m)>=0});b.length===0&&(b=v);var p=b.reduce(function(m,f){return m[f]=$n(e,{placement:f,boundary:o,rootBoundary:a,padding:s})[Je(f)],m},{});return Object.keys(p).sort(function(m,f){return p[m]-p[f]})}function Eu(e){if(Je(e)===So)return[];var t=tr(e);return[Ma(e),t,Ma(t)]}function ku(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,a=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!0:s,c=n.fallbackPlacements,d=n.padding,h=n.boundary,v=n.rootBoundary,b=n.altBoundary,p=n.flipVariations,m=p===void 0?!0:p,f=n.allowedAutoPlacements,g=t.options.placement,x=Je(g),j=x===g,w=c||(j||!m?[tr(g)]:Eu(g)),E=[g].concat(w).reduce(function(G,q){return G.concat(Je(q)===So?xu(t,{placement:q,boundary:h,rootBoundary:v,padding:d,flipVariations:m,allowedAutoPlacements:f}):q)},[]),y=t.rects.reference,O=t.rects.popper,N=new Map,_=!0,D=E[0],L=0;L<E.length;L++){var k=E[L],C=Je(k),$=tn(k)===Zt,V=[Me,Ge].indexOf(C)>=0,U=V?"width":"height",M=$n(t,{placement:k,boundary:h,rootBoundary:v,altBoundary:b,padding:d}),F=V?$?qe:Ie:$?Ge:Me;y[U]>O[U]&&(F=tr(F));var ee=tr(F),Z=[];if(a&&Z.push(M[C]<=0),l&&Z.push(M[F]<=0,M[ee]<=0),Z.every(function(G){return G})){D=k,_=!1;break}N.set(k,Z)}if(_)for(var R=m?3:1,I=function(q){var Y=E.find(function(K){var W=N.get(K);if(W)return W.slice(0,q).every(function(J){return J})});if(Y)return D=Y,"break"},z=R;z>0;z--){var X=I(z);if(X==="break")break}t.placement!==D&&(t.modifiersData[r]._skip=!0,t.placement=D,t.reset=!0)}}const Tu={name:"flip",enabled:!0,phase:"main",fn:ku,requiresIfExists:["offset"],data:{_skip:!1}};function _a(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Aa(e){return[Me,qe,Ge,Ie].some(function(t){return e[t]>=0})}function Su(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,s=$n(t,{elementContext:"reference"}),l=$n(t,{altBoundary:!0}),c=_a(s,r),d=_a(l,o,a),h=Aa(c),v=Aa(d);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:d,isReferenceHidden:h,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":h,"data-popper-escaped":v})}const Nu={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Su};function Cu(e,t,n){var r=Je(e),o=[Ie,Me].indexOf(r)>=0?-1:1,a=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,s=a[0],l=a[1];return s=s||0,l=(l||0)*o,[Ie,qe].indexOf(r)>=0?{x:l,y:s}:{x:s,y:l}}function Ou(e){var t=e.state,n=e.options,r=e.name,o=n.offset,a=o===void 0?[0,0]:o,s=ri.reduce(function(h,v){return h[v]=Cu(v,t.rects,a),h},{}),l=s[t.placement],c=l.x,d=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=d),t.modifiersData[r]=s}const Ru={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Ou};function Pu(e){var t=e.state,n=e.name;t.modifiersData[n]=pi({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const ju={name:"popperOffsets",enabled:!0,phase:"read",fn:Pu,data:{}};function $u(e){return e==="x"?"y":"x"}function Mu(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,a=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!1:s,c=n.boundary,d=n.rootBoundary,h=n.altBoundary,v=n.padding,b=n.tether,p=b===void 0?!0:b,m=n.tetherOffset,f=m===void 0?0:m,g=$n(t,{boundary:c,rootBoundary:d,padding:v,altBoundary:h}),x=Je(t.placement),j=tn(t.placement),w=!j,E=Oo(x),y=$u(E),O=t.modifiersData.popperOffsets,N=t.rects.reference,_=t.rects.popper,D=typeof f=="function"?f(Object.assign({},t.rects,{placement:t.placement})):f,L=typeof D=="number"?{mainAxis:D,altAxis:D}:Object.assign({mainAxis:0,altAxis:0},D),k=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,C={x:0,y:0};if(O){if(a){var $,V=E==="y"?Me:Ie,U=E==="y"?Ge:qe,M=E==="y"?"height":"width",F=O[E],ee=F+g[V],Z=F-g[U],R=p?-_[M]/2:0,I=j===Zt?N[M]:_[M],z=j===Zt?-_[M]:-N[M],X=t.elements.arrow,G=p&&X?Co(X):{width:0,height:0},q=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:si(),Y=q[V],K=q[U],W=Tn(0,N[M],G[M]),J=w?N[M]/2-R-W-Y-L.mainAxis:I-W-Y-L.mainAxis,Q=w?-N[M]/2+R+W+K+L.mainAxis:z+W+K+L.mainAxis,ae=t.elements.arrow&&zn(t.elements.arrow),B=ae?E==="y"?ae.clientTop||0:ae.clientLeft||0:0,te=($=k==null?void 0:k[E])!=null?$:0,A=F+J-te-B,se=F+Q-te,Te=Tn(p?cr(ee,A):ee,F,p?Pt(Z,se):Z);O[E]=Te,C[E]=Te-F}if(l){var Pe,xe=E==="x"?Me:Ie,xt=E==="x"?Ge:qe,je=O[y],tt=y==="y"?"height":"width",Ae=je+g[xe],nt=je-g[xt],Se=[Me,Ie].indexOf(x)!==-1,Dt=(Pe=k==null?void 0:k[y])!=null?Pe:0,Et=Se?Ae:je-N[tt]-_[tt]-Dt+L.altAxis,on=Se?je+N[tt]+_[tt]-Dt-L.altAxis:nt,qn=p&&Se?ru(Et,je,on):Tn(p?Et:Ae,je,p?on:nt);O[y]=qn,C[y]=qn-je}t.modifiersData[r]=C}}const Iu={name:"preventOverflow",enabled:!0,phase:"main",fn:Mu,requiresIfExists:["offset"]};function _u(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Au(e){return e===Ve(e)||!Ue(e)?Ro(e):_u(e)}function Du(e){var t=e.getBoundingClientRect(),n=Qt(t.width)/e.offsetWidth||1,r=Qt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Bu(e,t,n){n===void 0&&(n=!1);var r=Ue(t),o=Ue(t)&&Du(t),a=yt(t),s=en(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((Qe(t)!=="body"||jo(a))&&(l=Au(t)),Ue(t)?(c=en(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):a&&(c.x=Po(a))),{x:s.left+l.scrollLeft-c.x,y:s.top+l.scrollTop-c.y,width:s.width,height:s.height}}function Lu(e){var t=new Map,n=new Set,r=[];e.forEach(function(a){t.set(a.name,a)});function o(a){n.add(a.name);var s=[].concat(a.requires||[],a.requiresIfExists||[]);s.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(a)}return e.forEach(function(a){n.has(a.name)||o(a)}),r}function Vu(e){var t=Lu(e);return Jp.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Fu(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function zu(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var Da={placement:"bottom",modifiers:[],strategy:"absolute"};function Ba(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Uu(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,a=o===void 0?Da:o;return function(l,c,d){d===void 0&&(d=a);var h={placement:"bottom",orderedModifiers:[],options:Object.assign({},Da,a),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},v=[],b=!1,p={state:h,setOptions:function(x){var j=typeof x=="function"?x(h.options):x;f(),h.options=Object.assign({},a,h.options,j),h.scrollParents={reference:_t(l)?Sn(l):l.contextElement?Sn(l.contextElement):[],popper:Sn(c)};var w=Vu(zu([].concat(r,h.options.modifiers)));return h.orderedModifiers=w.filter(function(E){return E.enabled}),m(),p.update()},forceUpdate:function(){if(!b){var x=h.elements,j=x.reference,w=x.popper;if(Ba(j,w)){h.rects={reference:Bu(j,zn(w),h.options.strategy==="fixed"),popper:Co(w)},h.reset=!1,h.placement=h.options.placement,h.orderedModifiers.forEach(function(L){return h.modifiersData[L.name]=Object.assign({},L.data)});for(var E=0;E<h.orderedModifiers.length;E++){if(h.reset===!0){h.reset=!1,E=-1;continue}var y=h.orderedModifiers[E],O=y.fn,N=y.options,_=N===void 0?{}:N,D=y.name;typeof O=="function"&&(h=O({state:h,options:_,name:D,instance:p})||h)}}}},update:Fu(function(){return new Promise(function(g){p.forceUpdate(),g(h)})}),destroy:function(){f(),b=!0}};if(!Ba(l,c))return p;p.setOptions(d).then(function(g){!b&&d.onFirstUpdate&&d.onFirstUpdate(g)});function m(){h.orderedModifiers.forEach(function(g){var x=g.name,j=g.options,w=j===void 0?{}:j,E=g.effect;if(typeof E=="function"){var y=E({state:h,name:x,instance:p,options:w}),O=function(){};v.push(y||O)}})}function f(){v.forEach(function(g){return g()}),v=[]}return p}}var Hu=[fu,ju,uu,eu,Ru,Tu,Iu,iu,Nu],Gu=Uu({defaultModifiers:Hu});const ui="Popper";function qu(e){return ti(ui,e)}kp(ui,["root"]);const Wu=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Xu=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Yu(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function pr(e){return typeof e=="function"?e():e}function yr(e){return e.nodeType!==void 0}function Ku(e){return!yr(e)}const Ju=()=>pt({root:["root"]},bp(qu)),Zu={},Qu=S.forwardRef(function(t,n){var r;const{anchorEl:o,children:a,direction:s,disablePortal:l,modifiers:c,open:d,placement:h,popperOptions:v,popperRef:b,slotProps:p={},slots:m={},TransitionProps:f}=t,g=he(t,Wu),x=S.useRef(null),j=He(x,n),w=S.useRef(null),E=He(w,b),y=S.useRef(E);Mt(()=>{y.current=E},[E]),S.useImperativeHandle(b,()=>w.current,[]);const O=Yu(h,s),[N,_]=S.useState(O),[D,L]=S.useState(pr(o));S.useEffect(()=>{w.current&&w.current.forceUpdate()}),S.useEffect(()=>{o&&L(pr(o))},[o]),Mt(()=>{if(!D||!d)return;const U=ee=>{_(ee.placement)};if(process.env.NODE_ENV!=="production"&&D&&yr(D)&&D.nodeType===1){const ee=D.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ee.top===0&&ee.left===0&&ee.right===0&&ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let M=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ee})=>{U(ee)}}];c!=null&&(M=M.concat(c)),v&&v.modifiers!=null&&(M=M.concat(v.modifiers));const F=Gu(D,x.current,P({placement:O},v,{modifiers:M}));return y.current(F),()=>{F.destroy(),y.current(null)}},[D,l,c,d,v,O]);const k={placement:N};f!==null&&(k.TransitionProps=f);const C=Ju(),$=(r=m.root)!=null?r:"div",V=It({elementType:$,externalSlotProps:p.root,externalForwardedProps:g,additionalProps:{role:"tooltip",ref:j},ownerState:t,className:C.root});return u.jsx($,P({},V,{children:typeof a=="function"?a(k):a}))}),di=S.forwardRef(function(t,n){const{anchorEl:r,children:o,container:a,direction:s="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:d,open:h,placement:v="bottom",popperOptions:b=Zu,popperRef:p,style:m,transition:f=!1,slotProps:g={},slots:x={}}=t,j=he(t,Xu),[w,E]=S.useState(!0),y=()=>{E(!1)},O=()=>{E(!0)};if(!c&&!h&&(!f||w))return null;let N;if(a)N=a;else if(r){const L=pr(r);N=L&&yr(L)?Oe(L).body:Oe(null).body}const _=!h&&c&&(!f||w)?"none":void 0,D=f?{in:h,onEnter:y,onExited:O}:void 0;return u.jsx(Pn,{disablePortal:l,container:N,children:u.jsx(Qu,P({anchorEl:r,direction:s,disablePortal:l,modifiers:d,ref:n,open:f?!w:h,placement:v,popperOptions:b,popperRef:p,slotProps:g,slots:x},j,{style:P({position:"fixed",top:0,left:0,display:_},m),TransitionProps:D,children:o}))})});process.env.NODE_ENV!=="production"&&(di.propTypes={anchorEl:rn(i.oneOfType([it,i.object,i.func]),e=>{if(e.open){const t=pr(e.anchorEl);if(t&&yr(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Ku(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:i.oneOfType([i.node,i.func]),container:i.oneOfType([it,i.func]),direction:i.oneOf(["ltr","rtl"]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:To,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),transition:i.bool});const ed=["values","unit","step"],td=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>P({},n,{[r.key]:r.val}),{})};function nd(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=he(e,ed),a=td(t),s=Object.keys(a);function l(b){return`@media (min-width:${typeof t[b]=="number"?t[b]:b}${n})`}function c(b){return`@media (max-width:${(typeof t[b]=="number"?t[b]:b)-r/100}${n})`}function d(b,p){const m=s.indexOf(p);return`@media (min-width:${typeof t[b]=="number"?t[b]:b}${n}) and (max-width:${(m!==-1&&typeof t[s[m]]=="number"?t[s[m]]:p)-r/100}${n})`}function h(b){return s.indexOf(b)+1<s.length?d(b,s[s.indexOf(b)+1]):l(b)}function v(b){const p=s.indexOf(b);return p===0?l(s[1]):p===s.length-1?c(s[p]):d(b,s[s.indexOf(b)+1]).replace("@media","@media not all and")}return P({keys:s,values:a,up:l,down:c,between:d,only:h,not:v,unit:n},o)}const rd={borderRadius:4},od=rd,ad=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.string,i.object,i.array]):{},wt=ad;function Nn(e,t){return t?st(e,t,{clone:!1}):e}const $o={xs:0,sm:600,md:900,lg:1200,xl:1536},La={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${$o[e]}px)`};function ct(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const a=r.breakpoints||La;return t.reduce((s,l,c)=>(s[a.up(a.keys[c])]=n(t[c]),s),{})}if(typeof t=="object"){const a=r.breakpoints||La;return Object.keys(t).reduce((s,l)=>{if(Object.keys(a.values||$o).indexOf(l)!==-1){const c=a.up(l);s[c]=n(t[l],l)}else{const c=l;s[c]=t[c]}return s},{})}return n(t)}function sd(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const a=e.up(o);return r[a]={},r},{}))||{}}function id(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function wr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function ur(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=wr(e,n)||r,t&&(o=t(o,r,e)),o}function ke(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,a=s=>{if(s[t]==null)return null;const l=s[t],c=s.theme,d=wr(c,r)||{};return ct(s,l,v=>{let b=ur(d,o,v);return v===b&&typeof v=="string"&&(b=ur(d,o,`${t}${v==="default"?"":Ze(v)}`,v)),n===!1?b:{[n]:b}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[t]:wt}:{},a.filterProps=[t],a}function ld(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const cd={m:"margin",p:"padding"},pd={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Va={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},ud=ld(e=>{if(e.length>2)if(Va[e])e=Va[e];else return[e];const[t,n]=e.split(""),r=cd[t],o=pd[n]||"";return Array.isArray(o)?o.map(a=>r+a):[r+o]}),xr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Er=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],dd=[...xr,...Er];function Un(e,t,n,r){var o;const a=(o=wr(e,t,!1))!=null?o:n;return typeof a=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),a*s):Array.isArray(a)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>a.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${s} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),a[s]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function fi(e){return Un(e,"spacing",8,"spacing")}function Hn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function fd(e,t){return n=>e.reduce((r,o)=>(r[o]=Hn(t,n),r),{})}function hd(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=ud(n),a=fd(o,r),s=e[n];return ct(e,s,a)}function hi(e,t){const n=fi(e.theme);return Object.keys(e).map(r=>hd(e,t,r,n)).reduce(Nn,{})}function be(e){return hi(e,xr)}be.propTypes=process.env.NODE_ENV!=="production"?xr.reduce((e,t)=>(e[t]=wt,e),{}):{};be.filterProps=xr;function ve(e){return hi(e,Er)}ve.propTypes=process.env.NODE_ENV!=="production"?Er.reduce((e,t)=>(e[t]=wt,e),{}):{};ve.filterProps=Er;process.env.NODE_ENV!=="production"&&dd.reduce((e,t)=>(e[t]=wt,e),{});function md(e=8){if(e.mui)return e;const t=fi({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(a=>{const s=t(a);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function kr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(a=>{r[a]=o}),r),{}),n=r=>Object.keys(r).reduce((o,a)=>t[a]?Nn(o,t[a](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function ze(e){return typeof e!="number"?e:`${e}px solid`}function We(e,t){return ke({prop:e,themeKey:"borders",transform:t})}const gd=We("border",ze),bd=We("borderTop",ze),vd=We("borderRight",ze),yd=We("borderBottom",ze),wd=We("borderLeft",ze),xd=We("borderColor"),Ed=We("borderTopColor"),kd=We("borderRightColor"),Td=We("borderBottomColor"),Sd=We("borderLeftColor"),Nd=We("outline",ze),Cd=We("outlineColor"),Tr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Un(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:Hn(t,r)});return ct(e,e.borderRadius,n)}return null};Tr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:wt}:{};Tr.filterProps=["borderRadius"];kr(gd,bd,vd,yd,wd,xd,Ed,kd,Td,Sd,Tr,Nd,Cd);const Sr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Un(e.theme,"spacing",8,"gap"),n=r=>({gap:Hn(t,r)});return ct(e,e.gap,n)}return null};Sr.propTypes=process.env.NODE_ENV!=="production"?{gap:wt}:{};Sr.filterProps=["gap"];const Nr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Un(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:Hn(t,r)});return ct(e,e.columnGap,n)}return null};Nr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:wt}:{};Nr.filterProps=["columnGap"];const Cr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Un(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:Hn(t,r)});return ct(e,e.rowGap,n)}return null};Cr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:wt}:{};Cr.filterProps=["rowGap"];const Od=ke({prop:"gridColumn"}),Rd=ke({prop:"gridRow"}),Pd=ke({prop:"gridAutoFlow"}),jd=ke({prop:"gridAutoColumns"}),$d=ke({prop:"gridAutoRows"}),Md=ke({prop:"gridTemplateColumns"}),Id=ke({prop:"gridTemplateRows"}),_d=ke({prop:"gridTemplateAreas"}),Ad=ke({prop:"gridArea"});kr(Sr,Nr,Cr,Od,Rd,Pd,jd,$d,Md,Id,_d,Ad);function qt(e,t){return t==="grey"?t:e}const Dd=ke({prop:"color",themeKey:"palette",transform:qt}),Bd=ke({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:qt}),Ld=ke({prop:"backgroundColor",themeKey:"palette",transform:qt});kr(Dd,Bd,Ld);function Le(e){return e<=1&&e!==0?`${e*100}%`:e}const Vd=ke({prop:"width",transform:Le}),Mo=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const a=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||$o[n];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:Le(n)}};return ct(e,e.maxWidth,t)}return null};Mo.filterProps=["maxWidth"];const Fd=ke({prop:"minWidth",transform:Le}),zd=ke({prop:"height",transform:Le}),Ud=ke({prop:"maxHeight",transform:Le}),Hd=ke({prop:"minHeight",transform:Le});ke({prop:"size",cssProperty:"width",transform:Le});ke({prop:"size",cssProperty:"height",transform:Le});const Gd=ke({prop:"boxSizing"});kr(Vd,Mo,Fd,zd,Ud,Hd,Gd);const qd={border:{themeKey:"borders",transform:ze},borderTop:{themeKey:"borders",transform:ze},borderRight:{themeKey:"borders",transform:ze},borderBottom:{themeKey:"borders",transform:ze},borderLeft:{themeKey:"borders",transform:ze},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:ze},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Tr},color:{themeKey:"palette",transform:qt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:qt},backgroundColor:{themeKey:"palette",transform:qt},p:{style:ve},pt:{style:ve},pr:{style:ve},pb:{style:ve},pl:{style:ve},px:{style:ve},py:{style:ve},padding:{style:ve},paddingTop:{style:ve},paddingRight:{style:ve},paddingBottom:{style:ve},paddingLeft:{style:ve},paddingX:{style:ve},paddingY:{style:ve},paddingInline:{style:ve},paddingInlineStart:{style:ve},paddingInlineEnd:{style:ve},paddingBlock:{style:ve},paddingBlockStart:{style:ve},paddingBlockEnd:{style:ve},m:{style:be},mt:{style:be},mr:{style:be},mb:{style:be},ml:{style:be},mx:{style:be},my:{style:be},margin:{style:be},marginTop:{style:be},marginRight:{style:be},marginBottom:{style:be},marginLeft:{style:be},marginX:{style:be},marginY:{style:be},marginInline:{style:be},marginInlineStart:{style:be},marginInlineEnd:{style:be},marginBlock:{style:be},marginBlockStart:{style:be},marginBlockEnd:{style:be},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Sr},rowGap:{style:Cr},columnGap:{style:Nr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Le},maxWidth:{style:Mo},minWidth:{transform:Le},height:{transform:Le},maxHeight:{transform:Le},minHeight:{transform:Le},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Io=qd;function Wd(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Xd(e,t){return typeof e=="function"?e(t):e}function Yd(){function e(n,r,o,a){const s={[n]:r,theme:o},l=a[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:d,transform:h,style:v}=l;if(r==null)return null;if(d==="typography"&&r==="inherit")return{[n]:r};const b=wr(o,d)||{};return v?v(s):ct(s,r,m=>{let f=ur(b,h,m);return m===f&&typeof m=="string"&&(f=ur(b,h,`${n}${m==="default"?"":Ze(m)}`,m)),c===!1?f:{[c]:f}})}function t(n){var r;const{sx:o,theme:a={}}=n||{};if(!o)return null;const s=(r=a.unstable_sxConfig)!=null?r:Io;function l(c){let d=c;if(typeof c=="function")d=c(a);else if(typeof c!="object")return c;if(!d)return null;const h=sd(a.breakpoints),v=Object.keys(h);let b=h;return Object.keys(d).forEach(p=>{const m=Xd(d[p],a);if(m!=null)if(typeof m=="object")if(s[p])b=Nn(b,e(p,m,a,s));else{const f=ct({theme:a},m,g=>({[p]:g}));Wd(f,m)?b[p]=t({sx:m,theme:a}):b=Nn(b,f)}else b=Nn(b,e(p,m,a,s))}),id(v,b)}return Array.isArray(o)?o.map(l):l(o)}return t}const mi=Yd();mi.filterProps=["sx"];const _o=mi;function Kd(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Jd=["breakpoints","palette","spacing","shape"];function Ao(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:a={}}=e,s=he(e,Jd),l=nd(n),c=md(o);let d=st({breakpoints:l,direction:"ltr",components:{},palette:P({mode:"light"},r),spacing:c,shape:P({},od,a)},s);return d.applyStyles=Kd,d=t.reduce((h,v)=>st(h,v),d),d.unstable_sxConfig=P({},Io,s==null?void 0:s.unstable_sxConfig),d.unstable_sx=function(v){return _o({sx:v,theme:this})},d}function Zd(e){return Object.keys(e).length===0}function gi(e=null){const t=S.useContext(Jr.ThemeContext);return!t||Zd(t)?e:t}const Qd=Ao();function bi(e=Qd){return gi(e)}const ef=["ownerState"],tf=["variants"],nf=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function rf(e){return Object.keys(e).length===0}function of(e){return typeof e=="string"&&e.charCodeAt(0)>96}function nr(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const af=Ao(),Fa=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Jn({defaultTheme:e,theme:t,themeId:n}){return rf(t)?e:t[n]||t}function sf(e){return e?(t,n)=>n[e]:null}function rr(e,t){let{ownerState:n}=t,r=he(t,ef);const o=typeof e=="function"?e(P({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(a=>rr(a,P({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let l=he(o,tf);return a.forEach(c=>{let d=!0;typeof c.props=="function"?d=c.props(P({ownerState:n},r,n)):Object.keys(c.props).forEach(h=>{(n==null?void 0:n[h])!==c.props[h]&&r[h]!==c.props[h]&&(d=!1)}),d&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(P({ownerState:n},r,n)):c.style))}),l}return o}function lf(e={}){const{themeId:t,defaultTheme:n=af,rootShouldForwardProp:r=nr,slotShouldForwardProp:o=nr}=e,a=s=>_o(P({},s,{theme:Jn(P({},s,{defaultTheme:n,themeId:t}))}));return a.__mui_systemSx=!0,(s,l={})=>{Jr.internal_processStyles(s,y=>y.filter(O=>!(O!=null&&O.__mui_systemSx)));const{name:c,slot:d,skipVariantsResolver:h,skipSx:v,overridesResolver:b=sf(Fa(d))}=l,p=he(l,nf),m=h!==void 0?h:d&&d!=="Root"&&d!=="root"||!1,f=v||!1;let g;process.env.NODE_ENV!=="production"&&c&&(g=`${c}-${Fa(d||"Root")}`);let x=nr;d==="Root"||d==="root"?x=r:d?x=o:of(s)&&(x=void 0);const j=Jr(s,P({shouldForwardProp:x,label:g},p)),w=y=>typeof y=="function"&&y.__emotion_real!==y||Ot(y)?O=>rr(y,P({},O,{theme:Jn({theme:O.theme,defaultTheme:n,themeId:t})})):y,E=(y,...O)=>{let N=w(y);const _=O?O.map(w):[];c&&b&&_.push(k=>{const C=Jn(P({},k,{defaultTheme:n,themeId:t}));if(!C.components||!C.components[c]||!C.components[c].styleOverrides)return null;const $=C.components[c].styleOverrides,V={};return Object.entries($).forEach(([U,M])=>{V[U]=rr(M,P({},k,{theme:C}))}),b(k,V)}),c&&!m&&_.push(k=>{var C;const $=Jn(P({},k,{defaultTheme:n,themeId:t})),V=$==null||(C=$.components)==null||(C=C[c])==null?void 0:C.variants;return rr({variants:V},P({},k,{theme:$}))}),f||_.push(a);const D=_.length-O.length;if(Array.isArray(y)&&D>0){const k=new Array(D).fill("");N=[...y,...k],N.raw=[...y.raw,...k]}const L=j(N,..._);if(process.env.NODE_ENV!=="production"){let k;c&&(k=`${c}${Ze(d||"")}`),k===void 0&&(k=`Styled(${Gc(s)})`),L.displayName=k}return s.muiName&&(L.muiName=s.muiName),L};return j.withConfig&&(E.withConfig=j.withConfig),E}}function cf(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:Ys(t.components[n].defaultProps,r)}function pf({props:e,name:t,defaultTheme:n,themeId:r}){let o=bi(n);return r&&(o=o[r]||o),cf({theme:o,name:t,props:e})}function Do(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),hp(e,t,n)}function uf(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function At(e){if(e.type)return e;if(e.charAt(0)==="#")return At(uf(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Kt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Kt(10,o))}else r=r.split(",");return r=r.map(a=>parseFloat(a)),{type:n,values:r,colorSpace:o}}function Or(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,a)=>a<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function df(e){e=At(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,a=r*Math.min(o,1-o),s=(d,h=(d+n/30)%12)=>o-a*Math.max(Math.min(h-3,9-h,1),-1);let l="rgb";const c=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),Or({type:l,values:c})}function za(e){e=At(e);let t=e.type==="hsl"||e.type==="hsla"?At(df(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Ua(e,t){const n=za(e),r=za(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function dr(e,t){return e=At(e),t=Do(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Or(e)}function ff(e,t){if(e=At(e),t=Do(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return Or(e)}function hf(e,t){if(e=At(e),t=Do(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return Or(e)}function mf(e,t){return P({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const gf={black:"#000",white:"#fff"},Mn=gf,bf={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},vf=bf,yf={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Bt=yf,wf={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Lt=wf,xf={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},fn=xf,Ef={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Vt=Ef,kf={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Ft=kf,Tf={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},zt=Tf,Sf=["mode","contrastThreshold","tonalOffset"],Ha={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Mn.white,default:Mn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},zr={text:{primary:Mn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Mn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Ga(e,t,n,r){const o=r.light||r,a=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=hf(e.main,o):t==="dark"&&(e.dark=ff(e.main,a)))}function Nf(e="light"){return e==="dark"?{main:Vt[200],light:Vt[50],dark:Vt[400]}:{main:Vt[700],light:Vt[400],dark:Vt[800]}}function Cf(e="light"){return e==="dark"?{main:Bt[200],light:Bt[50],dark:Bt[400]}:{main:Bt[500],light:Bt[300],dark:Bt[700]}}function Of(e="light"){return e==="dark"?{main:Lt[500],light:Lt[300],dark:Lt[700]}:{main:Lt[700],light:Lt[400],dark:Lt[800]}}function Rf(e="light"){return e==="dark"?{main:Ft[400],light:Ft[300],dark:Ft[700]}:{main:Ft[700],light:Ft[500],dark:Ft[900]}}function Pf(e="light"){return e==="dark"?{main:zt[400],light:zt[300],dark:zt[700]}:{main:zt[800],light:zt[500],dark:zt[900]}}function jf(e="light"){return e==="dark"?{main:fn[400],light:fn[300],dark:fn[700]}:{main:"#ed6c02",light:fn[500],dark:fn[900]}}function $f(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=he(e,Sf),a=e.primary||Nf(t),s=e.secondary||Cf(t),l=e.error||Of(t),c=e.info||Rf(t),d=e.success||Pf(t),h=e.warning||jf(t);function v(f){const g=Ua(f,zr.text.primary)>=n?zr.text.primary:Ha.text.primary;if(process.env.NODE_ENV!=="production"){const x=Ua(f,g);x<3&&console.error([`MUI: The contrast ratio of ${x}:1 for ${g} on ${f}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return g}const b=({color:f,name:g,mainShade:x=500,lightShade:j=300,darkShade:w=700})=>{if(f=P({},f),!f.main&&f[x]&&(f.main=f[x]),!f.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${g?` (${g})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.`:Kt(11,g?` (${g})`:"",x));if(typeof f.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${g?` (${g})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(f.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Kt(12,g?` (${g})`:"",JSON.stringify(f.main)));return Ga(f,"light",j,r),Ga(f,"dark",w,r),f.contrastText||(f.contrastText=v(f.main)),f},p={dark:zr,light:Ha};return process.env.NODE_ENV!=="production"&&(p[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),st(P({common:P({},Mn),mode:t,primary:b({color:a,name:"primary"}),secondary:b({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:b({color:l,name:"error"}),warning:b({color:h,name:"warning"}),info:b({color:c,name:"info"}),success:b({color:d,name:"success"}),grey:vf,contrastThreshold:n,getContrastText:v,augmentColor:b,tonalOffset:r},p[t]),o)}const Mf=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function If(e){return Math.round(e*1e5)/1e5}const qa={textTransform:"uppercase"},Wa='"Roboto", "Helvetica", "Arial", sans-serif';function _f(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Wa,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:s=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:d=16,allVariants:h,pxToRem:v}=n,b=he(n,Mf);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof d!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const p=o/14,m=v||(x=>`${x/d*p}rem`),f=(x,j,w,E,y)=>P({fontFamily:r,fontWeight:x,fontSize:m(j),lineHeight:w},r===Wa?{letterSpacing:`${If(E/j)}em`}:{},y,h),g={h1:f(a,96,1.167,-1.5),h2:f(a,60,1.2,-.5),h3:f(s,48,1.167,0),h4:f(s,34,1.235,.25),h5:f(s,24,1.334,0),h6:f(l,20,1.6,.15),subtitle1:f(s,16,1.75,.15),subtitle2:f(l,14,1.57,.1),body1:f(s,16,1.5,.15),body2:f(s,14,1.43,.15),button:f(l,14,1.75,.4,qa),caption:f(s,12,1.66,.4),overline:f(s,12,2.66,1,qa),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return st(P({htmlFontSize:d,pxToRem:m,fontFamily:r,fontSize:o,fontWeightLight:a,fontWeightRegular:s,fontWeightMedium:l,fontWeightBold:c},g),b,{clone:!1})}const Af=.2,Df=.14,Bf=.12;function ge(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Af})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Df})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Bf})`].join(",")}const Lf=["none",ge(0,2,1,-1,0,1,1,0,0,1,3,0),ge(0,3,1,-2,0,2,2,0,0,1,5,0),ge(0,3,3,-2,0,3,4,0,0,1,8,0),ge(0,2,4,-1,0,4,5,0,0,1,10,0),ge(0,3,5,-1,0,5,8,0,0,1,14,0),ge(0,3,5,-1,0,6,10,0,0,1,18,0),ge(0,4,5,-2,0,7,10,1,0,2,16,1),ge(0,5,5,-3,0,8,10,1,0,3,14,2),ge(0,5,6,-3,0,9,12,1,0,3,16,2),ge(0,6,6,-3,0,10,14,1,0,4,18,3),ge(0,6,7,-4,0,11,15,1,0,4,20,3),ge(0,7,8,-4,0,12,17,2,0,5,22,4),ge(0,7,8,-4,0,13,19,2,0,5,24,4),ge(0,7,9,-4,0,14,21,2,0,5,26,4),ge(0,8,9,-5,0,15,22,2,0,6,28,5),ge(0,8,10,-5,0,16,24,2,0,6,30,5),ge(0,8,11,-5,0,17,26,2,0,6,32,5),ge(0,9,11,-5,0,18,28,2,0,7,34,6),ge(0,9,12,-6,0,19,29,2,0,7,36,6),ge(0,10,13,-6,0,20,31,3,0,8,38,7),ge(0,10,13,-6,0,21,33,3,0,8,40,7),ge(0,10,14,-6,0,22,35,3,0,8,42,7),ge(0,11,14,-7,0,23,36,3,0,9,44,8),ge(0,11,15,-7,0,24,38,3,0,9,46,8)],Vf=Lf,Ff=["duration","easing","delay"],zf={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Uf={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Xa(e){return`${Math.round(e)}ms`}function Hf(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Gf(e){const t=P({},zf,e.easing),n=P({},Uf,e.duration);return P({getAutoHeightDuration:Hf,create:(o=["all"],a={})=>{const{duration:s=n.standard,easing:l=t.easeInOut,delay:c=0}=a,d=he(a,Ff);if(process.env.NODE_ENV!=="production"){const h=b=>typeof b=="string",v=b=>!isNaN(parseFloat(b));!h(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!v(s)&&!h(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),h(l)||console.error('MUI: Argument "easing" must be a string.'),!v(c)&&!h(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(d).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(h=>`${h} ${typeof s=="string"?s:Xa(s)} ${l} ${typeof c=="string"?c:Xa(c)}`).join(",")}},e,{easing:t,duration:n})}const qf={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Wf=qf,Xf=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Yf(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:a={}}=e,s=he(e,Xf);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Kt(18));const l=$f(r),c=Ao(e);let d=st(c,{mixins:mf(c.breakpoints,n),palette:l,shadows:Vf.slice(),typography:_f(l,a),transitions:Gf(o),zIndex:P({},Wf)});if(d=st(d,s),d=t.reduce((h,v)=>st(h,v),d),process.env.NODE_ENV!=="production"){const h=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],v=(b,p)=>{let m;for(m in b){const f=b[m];if(h.indexOf(m)!==-1&&Object.keys(f).length>0){if(process.env.NODE_ENV!=="production"){const g=et("",m);console.error([`MUI: The \`${p}\` component increases the CSS specificity of the \`${m}\` internal state.`,"You can not override it like this: ",JSON.stringify(b,null,2),"",`Instead, you need to use the '&.${g}' syntax:`,JSON.stringify({root:{[`&.${g}`]:f}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}b[m]={}}}};Object.keys(d.components).forEach(b=>{const p=d.components[b].styleOverrides;p&&b.indexOf("Mui")===0&&v(p,b)})}return d.unstable_sxConfig=P({},Io,s==null?void 0:s.unstable_sxConfig),d.unstable_sx=function(v){return _o({sx:v,theme:this})},d}const Kf=Yf(),Bo=Kf,Lo="$$material",vi=e=>nr(e)&&e!=="classes",Jf=lf({themeId:Lo,defaultTheme:Bo,rootShouldForwardProp:vi}),Re=Jf;function Gn(){const e=bi(Bo);return process.env.NODE_ENV!=="production"&&S.useDebugValue(e),e[Lo]||e}function ut({props:e,name:t}){return pf({props:e,name:t,defaultTheme:Bo,themeId:Lo})}function io(e,t){return io=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},io(e,t)}function Zf(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,io(e,t)}const Ya={disabled:!1};var Qf=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.shape({enter:i.number,exit:i.number,appear:i.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&i.oneOfType([i.string,i.shape({enter:i.string,exit:i.string,active:i.string}),i.shape({enter:i.string,enterDone:i.string,enterActive:i.string,exit:i.string,exitDone:i.string,exitActive:i.string})]);const yi=T.createContext(null);var eh=function(t){return t.scrollTop},xn="unmounted",Tt="exited",St="entering",Gt="entered",lo="exiting",dt=function(e){Zf(t,e);function t(r,o){var a;a=e.call(this,r,o)||this;var s=o,l=s&&!s.isMounting?r.enter:r.appear,c;return a.appearStatus=null,r.in?l?(c=Tt,a.appearStatus=St):c=Gt:r.unmountOnExit||r.mountOnEnter?c=xn:c=Tt,a.state={status:c},a.nextCallback=null,a}t.getDerivedStateFromProps=function(o,a){var s=o.in;return s&&a.status===xn?{status:Tt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var a=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==St&&s!==Gt&&(a=St):(s===St||s===Gt)&&(a=lo)}this.updateStatus(!1,a)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,a,s,l;return a=s=l=o,o!=null&&typeof o!="number"&&(a=o.exit,s=o.enter,l=o.appear!==void 0?o.appear:s),{exit:a,enter:s,appear:l}},n.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===St){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:bn.findDOMNode(this);s&&eh(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Tt&&this.setState({status:xn})},n.performEnter=function(o){var a=this,s=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[bn.findDOMNode(this),l],d=c[0],h=c[1],v=this.getTimeouts(),b=l?v.appear:v.enter;if(!o&&!s||Ya.disabled){this.safeSetState({status:Gt},function(){a.props.onEntered(d)});return}this.props.onEnter(d,h),this.safeSetState({status:St},function(){a.props.onEntering(d,h),a.onTransitionEnd(b,function(){a.safeSetState({status:Gt},function(){a.props.onEntered(d,h)})})})},n.performExit=function(){var o=this,a=this.props.exit,s=this.getTimeouts(),l=this.props.nodeRef?void 0:bn.findDOMNode(this);if(!a||Ya.disabled){this.safeSetState({status:Tt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:lo},function(){o.props.onExiting(l),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:Tt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},n.setNextCallback=function(o){var a=this,s=!0;return this.nextCallback=function(l){s&&(s=!1,a.nextCallback=null,o(l))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},n.onTransitionEnd=function(o,a){this.setNextCallback(a);var s=this.props.nodeRef?this.props.nodeRef.current:bn.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!s||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],d=c[0],h=c[1];this.props.addEndListener(d,h)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===xn)return null;var a=this.props,s=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var l=he(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return T.createElement(yi.Provider,{value:null},typeof s=="function"?s(o,l):T.cloneElement(T.Children.only(s),l))},t}(T.Component);dt.contextType=yi;dt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:i.shape({current:typeof Element>"u"?i.any:function(e,t,n,r,o,a){var s=e[t];return i.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,a)}}),children:i.oneOfType([i.func.isRequired,i.element.isRequired]).isRequired,in:i.bool,mountOnEnter:i.bool,unmountOnExit:i.bool,appear:i.bool,enter:i.bool,exit:i.bool,timeout:function(t){var n=Qf;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),a=1;a<r;a++)o[a-1]=arguments[a];return n.apply(void 0,[t].concat(o))},addEndListener:i.func,onEnter:i.func,onEntering:i.func,onEntered:i.func,onExit:i.func,onExiting:i.func,onExited:i.func}:{};function Ut(){}dt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Ut,onEntering:Ut,onEntered:Ut,onExit:Ut,onExiting:Ut,onExited:Ut};dt.UNMOUNTED=xn;dt.EXITED=Tt;dt.ENTERING=St;dt.ENTERED=Gt;dt.EXITING=lo;const wi=dt,xi=e=>e.scrollTop;function fr(e,t){var n,r;const{timeout:o,easing:a,style:s={}}=e;return{duration:(n=s.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof a=="object"?a[t.mode]:a,delay:s.transitionDelay}}const th=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function co(e){return`scale(${e}, ${e**2})`}const nh={entering:{opacity:1,transform:co(1)},entered:{opacity:1,transform:"none"}},Ur=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Vo=S.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:a,easing:s,in:l,onEnter:c,onEntered:d,onEntering:h,onExit:v,onExited:b,onExiting:p,style:m,timeout:f="auto",TransitionComponent:g=wi}=t,x=he(t,th),j=yn(),w=S.useRef(),E=Gn(),y=S.useRef(null),O=He(y,a.ref,n),N=U=>M=>{if(U){const F=y.current;M===void 0?U(F):U(F,M)}},_=N(h),D=N((U,M)=>{xi(U);const{duration:F,delay:ee,easing:Z}=fr({style:m,timeout:f,easing:s},{mode:"enter"});let R;f==="auto"?(R=E.transitions.getAutoHeightDuration(U.clientHeight),w.current=R):R=F,U.style.transition=[E.transitions.create("opacity",{duration:R,delay:ee}),E.transitions.create("transform",{duration:Ur?R:R*.666,delay:ee,easing:Z})].join(","),c&&c(U,M)}),L=N(d),k=N(p),C=N(U=>{const{duration:M,delay:F,easing:ee}=fr({style:m,timeout:f,easing:s},{mode:"exit"});let Z;f==="auto"?(Z=E.transitions.getAutoHeightDuration(U.clientHeight),w.current=Z):Z=M,U.style.transition=[E.transitions.create("opacity",{duration:Z,delay:F}),E.transitions.create("transform",{duration:Ur?Z:Z*.666,delay:Ur?F:F||Z*.333,easing:ee})].join(","),U.style.opacity=0,U.style.transform=co(.75),v&&v(U)}),$=N(b),V=U=>{f==="auto"&&j.start(w.current||0,U),r&&r(y.current,U)};return u.jsx(g,P({appear:o,in:l,nodeRef:y,onEnter:D,onEntered:L,onEntering:_,onExit:C,onExited:$,onExiting:k,addEndListener:V,timeout:f==="auto"?null:f},x,{children:(U,M)=>S.cloneElement(a,P({style:P({opacity:0,transform:co(.75),visibility:U==="exited"&&!l?"hidden":void 0},nh[U],m,a.props.style),ref:O},M))}))});process.env.NODE_ENV!=="production"&&(Vo.propTypes={addEndListener:i.func,appear:i.bool,children:Ln.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});Vo.muiSupportAuto=!0;const po=Vo,rh=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},Ka=rh,oh=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],ah=Re(di,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ei=S.forwardRef(function(t,n){var r;const o=gi(),a=ut({props:t,name:"MuiPopper"}),{anchorEl:s,component:l,components:c,componentsProps:d,container:h,disablePortal:v,keepMounted:b,modifiers:p,open:m,placement:f,popperOptions:g,popperRef:x,transition:j,slots:w,slotProps:E}=a,y=he(a,oh),O=(r=w==null?void 0:w.root)!=null?r:c==null?void 0:c.Root,N=P({anchorEl:s,container:h,disablePortal:v,keepMounted:b,modifiers:p,open:m,placement:f,popperOptions:g,popperRef:x,transition:j},y);return u.jsx(ah,P({as:l,direction:o==null?void 0:o.direction,slots:{root:O},slotProps:E??d},N,{ref:n}))});process.env.NODE_ENV!=="production"&&(Ei.propTypes={anchorEl:i.oneOfType([it,i.object,i.func]),children:i.oneOfType([i.node,i.func]),component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([it,i.func]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:To,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transition:i.bool});const ki=Ei;function sh(e){return et("MuiTooltip",e)}const ih=vt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),gt=ih,lh=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function ch(e){return Math.round(e*1e5)/1e5}const ph=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:a}=e,s={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Ze(a.split("-")[0])}`],arrow:["arrow"]};return pt(s,sh,t)},uh=Re(ki,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>P({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${gt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${gt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${gt.arrow}`]:P({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${gt.arrow}`]:P({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),dh=Re("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Ze(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>P({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:dr(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${ch(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${gt.popper}[data-popper-placement*="left"] &`]:P({transformOrigin:"right center"},t.isRtl?P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):P({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${gt.popper}[data-popper-placement*="right"] &`]:P({transformOrigin:"left center"},t.isRtl?P({marginRight:"14px"},t.touch&&{marginRight:"24px"}):P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${gt.popper}[data-popper-placement*="top"] &`]:P({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${gt.popper}[data-popper-placement*="bottom"] &`]:P({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),fh=Re("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:dr(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Zn=!1;const Ja=new Vn;let hn={x:0,y:0};function Qn(e,t){return n=>{t&&t(n),e(n)}}const Ti=S.forwardRef(function(t,n){var r,o,a,s,l,c,d,h,v,b,p,m,f,g,x,j,w,E,y;const O=ut({props:t,name:"MuiTooltip"}),{arrow:N=!1,children:_,components:D={},componentsProps:L={},describeChild:k=!1,disableFocusListener:C=!1,disableHoverListener:$=!1,disableInteractive:V=!1,disableTouchListener:U=!1,enterDelay:M=100,enterNextDelay:F=0,enterTouchDelay:ee=700,followCursor:Z=!1,id:R,leaveDelay:I=0,leaveTouchDelay:z=1500,onClose:X,onOpen:G,open:q,placement:Y="bottom",PopperComponent:K,PopperProps:W={},slotProps:J={},slots:Q={},title:ae,TransitionComponent:B=po,TransitionProps:te}=O,A=he(O,lh),se=S.isValidElement(_)?_:u.jsx("span",{children:_}),Te=Gn(),Pe=Te.direction==="rtl",[xe,xt]=S.useState(),[je,tt]=S.useState(null),Ae=S.useRef(!1),nt=V||Z,Se=yn(),Dt=yn(),Et=yn(),on=yn(),[qn,Xo]=Us({controlled:q,default:!1,name:"Tooltip",state:"open"});let rt=qn;if(process.env.NODE_ENV!=="production"){const{current:ne}=S.useRef(q!==void 0);S.useEffect(()=>{xe&&xe.disabled&&!ne&&ae!==""&&xe.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ae,xe,ne])}const Rr=zs(R),an=S.useRef(),Wn=Rn(()=>{an.current!==void 0&&(document.body.style.WebkitUserSelect=an.current,an.current=void 0),on.clear()});S.useEffect(()=>Wn,[Wn]);const Yo=ne=>{Ja.clear(),Zn=!0,Xo(!0),G&&!rt&&G(ne)},Xn=Rn(ne=>{Ja.start(800+I,()=>{Zn=!1}),Xo(!1),X&&rt&&X(ne),Se.start(Te.transitions.duration.shortest,()=>{Ae.current=!1})}),Pr=ne=>{Ae.current&&ne.type!=="touchstart"||(xe&&xe.removeAttribute("title"),Dt.clear(),Et.clear(),M||Zn&&F?Dt.start(Zn?F:M,()=>{Yo(ne)}):Yo(ne))},Ko=ne=>{Dt.clear(),Et.start(I,()=>{Xn(ne)})},{isFocusVisibleRef:Jo,onBlur:Nl,onFocus:Cl,ref:Ol}=Hs(),[,Zo]=S.useState(!1),Qo=ne=>{Nl(ne),Jo.current===!1&&(Zo(!1),Ko(ne))},ea=ne=>{xe||xt(ne.currentTarget),Cl(ne),Jo.current===!0&&(Zo(!0),Pr(ne))},ta=ne=>{Ae.current=!0;const De=se.props;De.onTouchStart&&De.onTouchStart(ne)},na=Pr,ra=Ko,Rl=ne=>{ta(ne),Et.clear(),Se.clear(),Wn(),an.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",on.start(ee,()=>{document.body.style.WebkitUserSelect=an.current,Pr(ne)})},Pl=ne=>{se.props.onTouchEnd&&se.props.onTouchEnd(ne),Wn(),Et.start(z,()=>{Xn(ne)})};S.useEffect(()=>{if(!rt)return;function ne(De){(De.key==="Escape"||De.key==="Esc")&&Xn(De)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[Xn,rt]);const jl=He(se.ref,Ol,xt,n);!ae&&ae!==0&&(rt=!1);const jr=S.useRef(),$l=ne=>{const De=se.props;De.onMouseMove&&De.onMouseMove(ne),hn={x:ne.clientX,y:ne.clientY},jr.current&&jr.current.update()},sn={},$r=typeof ae=="string";k?(sn.title=!rt&&$r&&!$?ae:null,sn["aria-describedby"]=rt?Rr:null):(sn["aria-label"]=$r?ae:null,sn["aria-labelledby"]=rt&&!$r?Rr:null);const Fe=P({},sn,A,se.props,{className:Ne(A.className,se.props.className),onTouchStart:ta,ref:jl},Z?{onMouseMove:$l}:{});process.env.NODE_ENV!=="production"&&(Fe["data-mui-internal-clone-element"]=!0,S.useEffect(()=>{xe&&!xe.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[xe]));const ln={};U||(Fe.onTouchStart=Rl,Fe.onTouchEnd=Pl),$||(Fe.onMouseOver=Qn(na,Fe.onMouseOver),Fe.onMouseLeave=Qn(ra,Fe.onMouseLeave),nt||(ln.onMouseOver=na,ln.onMouseLeave=ra)),C||(Fe.onFocus=Qn(ea,Fe.onFocus),Fe.onBlur=Qn(Qo,Fe.onBlur),nt||(ln.onFocus=ea,ln.onBlur=Qo)),process.env.NODE_ENV!=="production"&&se.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));const Ml=S.useMemo(()=>{var ne;let De=[{name:"arrow",enabled:!!je,options:{element:je,padding:4}}];return(ne=W.popperOptions)!=null&&ne.modifiers&&(De=De.concat(W.popperOptions.modifiers)),P({},W.popperOptions,{modifiers:De})},[je,W]),cn=P({},O,{isRtl:Pe,arrow:N,disableInteractive:nt,placement:Y,PopperComponentProp:K,touch:Ae.current}),Mr=ph(cn),oa=(r=(o=Q.popper)!=null?o:D.Popper)!=null?r:uh,aa=(a=(s=(l=Q.transition)!=null?l:D.Transition)!=null?s:B)!=null?a:po,sa=(c=(d=Q.tooltip)!=null?d:D.Tooltip)!=null?c:dh,ia=(h=(v=Q.arrow)!=null?v:D.Arrow)!=null?h:fh,Il=wn(oa,P({},W,(b=J.popper)!=null?b:L.popper,{className:Ne(Mr.popper,W==null?void 0:W.className,(p=(m=J.popper)!=null?m:L.popper)==null?void 0:p.className)}),cn),_l=wn(aa,P({},te,(f=J.transition)!=null?f:L.transition),cn),Al=wn(sa,P({},(g=J.tooltip)!=null?g:L.tooltip,{className:Ne(Mr.tooltip,(x=(j=J.tooltip)!=null?j:L.tooltip)==null?void 0:x.className)}),cn),Dl=wn(ia,P({},(w=J.arrow)!=null?w:L.arrow,{className:Ne(Mr.arrow,(E=(y=J.arrow)!=null?y:L.arrow)==null?void 0:E.className)}),cn);return u.jsxs(S.Fragment,{children:[S.cloneElement(se,Fe),u.jsx(oa,P({as:K??ki,placement:Y,anchorEl:Z?{getBoundingClientRect:()=>({top:hn.y,left:hn.x,right:hn.x,bottom:hn.y,width:0,height:0})}:xe,popperRef:jr,open:xe?rt:!1,id:Rr,transition:!0},ln,Il,{popperOptions:Ml,children:({TransitionProps:ne})=>u.jsx(aa,P({timeout:Te.transitions.duration.shorter},ne,_l,{children:u.jsxs(sa,P({},Al,{children:[ae,N?u.jsx(ia,P({},Dl,{ref:tt})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Ti.propTypes={arrow:i.bool,children:Ln.isRequired,classes:i.object,className:i.string,components:i.shape({Arrow:i.elementType,Popper:i.elementType,Tooltip:i.elementType,Transition:i.elementType}),componentsProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),describeChild:i.bool,disableFocusListener:i.bool,disableHoverListener:i.bool,disableInteractive:i.bool,disableTouchListener:i.bool,enterDelay:i.number,enterNextDelay:i.number,enterTouchDelay:i.number,followCursor:i.bool,id:i.string,leaveDelay:i.number,leaveTouchDelay:i.number,onClose:i.func,onOpen:i.func,open:i.bool,placement:i.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:i.elementType,PopperProps:i.object,slotProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),slots:i.shape({arrow:i.elementType,popper:i.elementType,tooltip:i.elementType,transition:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),title:i.node,TransitionComponent:i.elementType,TransitionProps:i.object});const hh=Ti;var Fo={},Si={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Si);var mh=Si.exports,Hr={};function gh(e){return et("MuiSvgIcon",e)}vt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const bh=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],vh=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Ze(t)}`,`fontSize${Ze(n)}`]};return pt(o,gh,r)},yh=Re("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Ze(n.color)}`],t[`fontSize${Ze(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,a,s,l,c,d,h,v,b,p,m;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((d=e.typography)==null||(h=d.pxToRem)==null?void 0:h.call(d,35))||"2.1875rem"}[t.fontSize],color:(v=(b=(e.vars||e).palette)==null||(b=b[t.color])==null?void 0:b.main)!=null?v:{action:(p=(e.vars||e).palette)==null||(p=p.action)==null?void 0:p.active,disabled:(m=(e.vars||e).palette)==null||(m=m.action)==null?void 0:m.disabled,inherit:void 0}[t.color]}}),zo=S.forwardRef(function(t,n){const r=ut({props:t,name:"MuiSvgIcon"}),{children:o,className:a,color:s="inherit",component:l="svg",fontSize:c="medium",htmlColor:d,inheritViewBox:h=!1,titleAccess:v,viewBox:b="0 0 24 24"}=r,p=he(r,bh),m=S.isValidElement(o)&&o.type==="svg",f=P({},r,{color:s,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:h,viewBox:b,hasSvgAsChild:m}),g={};h||(g.viewBox=b);const x=vh(f);return u.jsxs(yh,P({as:l,className:Ne(x.root,a),focusable:"false",color:d,"aria-hidden":v?void 0:!0,role:v?"img":void 0,ref:n},g,p,m&&o.props,{ownerState:f,children:[m?o.props.children:o,v?u.jsx("title",{children:v}):null]}))});process.env.NODE_ENV!=="production"&&(zo.propTypes={children:i.node,classes:i.object,className:i.string,color:i.oneOfType([i.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),i.string]),component:i.elementType,fontSize:i.oneOfType([i.oneOf(["inherit","large","medium","small"]),i.string]),htmlColor:i.string,inheritViewBox:i.bool,shapeRendering:i.string,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),titleAccess:i.string,viewBox:i.string});zo.muiName="SvgIcon";const Za=zo;function Ni(e,t){function n(r,o){return u.jsx(Za,P({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Za.muiName,S.memo(S.forwardRef(n))}const wh={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Ks.configure(e)}},xh=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Ze,createChainedFunction:no,createSvgIcon:Ni,debounce:Fs,deprecatedPropType:Wc,isMuiElement:Xc,ownerDocument:Oe,ownerWindow:Jt,requirePropFactory:Yc,setRef:ir,unstable_ClassNameGenerator:wh,unstable_useEnhancedEffect:Mt,unstable_useId:zs,unsupportedProp:Zc,useControlled:Us,useEventCallback:Rn,useForkRef:He,useIsFocusVisible:Hs},Symbol.toStringTag,{value:"Module"})),Eh=Nc(xh);var Qa;function kh(){return Qa||(Qa=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Eh}(Hr)),Hr}var Th=mh;Object.defineProperty(Fo,"__esModule",{value:!0});var Ci=Fo.default=void 0,Sh=Th(kh()),Nh=u;Ci=Fo.default=(0,Sh.default)((0,Nh.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function es(e,t,n){return e?u.jsx(ye.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:u.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Uo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:s=void 0,hasAutoFocus:l=!1,className:c,isDisabled:d=!1,isDense:h=!0,isSubMenuParent:v=!1,hasDisabledGutters:b=!1,hasDivider:p=!1,focusVisibleClassName:m,id:f,children:g}=e,x=u.jsx(ye.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:d,dense:h,disableGutters:b,divider:p,focusVisibleClassName:m,onClick:t,id:f,children:n?u.jsxs(u.Fragment,{children:[es(a,n,!0),u.jsx(ye.ListItemText,{primary:n,inset:!a&&o}),v?u.jsx(ye.ListItemIcon,{className:"papi-menu-icon-trailing",children:u.jsx(Ci,{})}):es(s,n,!1)]}):g});return r?u.jsx(hh,{title:r,placement:"right",children:u.jsx("div",{children:x})}):x}function Oi(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Ch(e){const[t,n]=T.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:a}=e,s=d=>{n(d.currentTarget)},l=()=>{n(void 0)},c=()=>{let d=Oi(a).filter(h=>"menuItem"in h.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return d=d.filter(h=>"menuItem"in h.group&&h.group.menuItem===r.id),u.jsx(Ho,{...e,includedGroups:d})};return u.jsxs(u.Fragment,{children:[u.jsx(Uo,{onClick:s,...o,isSubMenuParent:!0}),u.jsx(ye.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Oh=(e,t)=>t.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function Ho(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:a,allowForLeadingIcons:s}=T.useMemo(()=>{const h=o&&o.length>0?o:Oi(t).filter(m=>!("menuItem"in m.group)),v=Object.values(h).sort((m,f)=>(m.group.order||0)-(f.group.order||0)),b=[];v.forEach(m=>{Oh(m.id,t.items).forEach(f=>b.push({item:f,isLastItemInGroup:!1})),b.length>0&&(b[b.length-1].isLastItemInGroup=!0)}),b.length>0&&(b[b.length-1].isLastItemInGroup=!1);const p=b.some(m=>"iconPathBefore"in m.item&&m.item.iconPathBefore);return{items:b,allowForLeadingIcons:p}},[o,t]),l=({item:h,isLastItemInGroup:v})=>({className:"papi-menu-item",label:h.label,tooltip:h.tooltip,iconPathBefore:"iconPathBefore"in h?h.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in h?h.iconPathAfter:void 0,hasDivider:v,allowForLeadingIcons:s}),[c]=a;if(!c)return u.jsx("div",{});const d=c.item.group;return u.jsx("div",{role:"menu","aria-label":d,children:a.map((h,v)=>{const{item:b}=h,p=l(h);if("command"in b){const m=b.group+v;return u.jsx(Uo,{onClick:f=>{n==null||n(f),r(b)},...p},m)}return u.jsx(Ch,{parentMenuItem:b,parentItemProps:p,...e},d+b.id)})},d)}function Rh(e){const{menuDefinition:t,columnId:n}=e;let a=Object.entries(t.groups).map(([s,l])=>({id:s,group:l})).filter(s=>"column"in s.group);return n&&"columns"in t&&t.columns[n]&&(a=a.filter(s=>"column"in s.group&&s.group.column===n)),u.jsx(Ho,{...e,includedGroups:a})}function Ph({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:a}){return u.jsxs(ye.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${a??""}`,children:[u.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${a??""}`,children:r.label}),u.jsx(ye.List,{id:n,dense:!0,className:a??"",children:u.jsx(Rh,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Ri({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,a=T.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,d=o[c];typeof d=="object"&&typeof d.order=="number"&&!Number.isNaN(d.order)?s.set(d.order,{id:c,metadata:d}):console.warn(`Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return u.jsx(ye.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:r,children:a.map((s,l)=>u.jsx(Ph,{commandHandler:e,menuDefinition:n,...s,className:t},l))})}const Pi=S.createContext({});process.env.NODE_ENV!=="production"&&(Pi.displayName="ListContext");const jh=Pi;function $h(e){return et("MuiList",e)}vt("MuiList",["root","padding","dense","subheader"]);const Mh=["children","className","component","dense","disablePadding","subheader"],Ih=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return pt({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},$h,t)},_h=Re("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>P({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),ji=S.forwardRef(function(t,n){const r=ut({props:t,name:"MuiList"}),{children:o,className:a,component:s="ul",dense:l=!1,disablePadding:c=!1,subheader:d}=r,h=he(r,Mh),v=S.useMemo(()=>({dense:l}),[l]),b=P({},r,{component:s,dense:l,disablePadding:c}),p=Ih(b);return u.jsx(jh.Provider,{value:v,children:u.jsxs(_h,P({as:s,className:Ne(p.root,a),ref:n,ownerState:b},h,{children:[d,o]}))})});process.env.NODE_ENV!=="production"&&(ji.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,dense:i.bool,disablePadding:i.bool,subheader:i.node,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const Ah=ji,Dh=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Gr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function ts(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function $i(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function mn(e,t,n,r,o,a){let s=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(s)return!1;s=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!$i(l,a)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const Mi=S.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:a=!1,children:s,className:l,disabledItemsFocusable:c=!1,disableListWrap:d=!1,onKeyDown:h,variant:v="selectedMenu"}=t,b=he(t,Dh),p=S.useRef(null),m=S.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Mt(()=>{o&&p.current.focus()},[o]),S.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(w,E)=>{const y=!p.current.style.width;if(w.clientHeight<p.current.clientHeight&&y){const O=`${Gs(Oe(w))}px`;p.current.style[E.direction==="rtl"?"paddingLeft":"paddingRight"]=O,p.current.style.width=`calc(100% + ${O})`}return p.current}}),[]);const f=w=>{const E=p.current,y=w.key,O=Oe(E).activeElement;if(y==="ArrowDown")w.preventDefault(),mn(E,O,d,c,Gr);else if(y==="ArrowUp")w.preventDefault(),mn(E,O,d,c,ts);else if(y==="Home")w.preventDefault(),mn(E,null,d,c,Gr);else if(y==="End")w.preventDefault(),mn(E,null,d,c,ts);else if(y.length===1){const N=m.current,_=y.toLowerCase(),D=performance.now();N.keys.length>0&&(D-N.lastTime>500?(N.keys=[],N.repeating=!0,N.previousKeyMatched=!0):N.repeating&&_!==N.keys[0]&&(N.repeating=!1)),N.lastTime=D,N.keys.push(_);const L=O&&!N.repeating&&$i(O,N);N.previousKeyMatched&&(L||mn(E,O,!1,c,Gr,N))?w.preventDefault():N.previousKeyMatched=!1}h&&h(w)},g=He(p,n);let x=-1;S.Children.forEach(s,(w,E)=>{if(!S.isValidElement(w)){x===E&&(x+=1,x>=s.length&&(x=-1));return}process.env.NODE_ENV!=="production"&&sr.isFragment(w)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),w.props.disabled||(v==="selectedMenu"&&w.props.selected||x===-1)&&(x=E),x===E&&(w.props.disabled||w.props.muiSkipListHighlight||w.type.muiSkipListHighlight)&&(x+=1,x>=s.length&&(x=-1))});const j=S.Children.map(s,(w,E)=>{if(E===x){const y={};return a&&(y.autoFocus=!0),w.props.tabIndex===void 0&&v==="selectedMenu"&&(y.tabIndex=0),S.cloneElement(w,y)}return w});return u.jsx(Ah,P({role:"menu",ref:g,className:l,onKeyDown:f,tabIndex:o?0:-1},b,{children:j}))});process.env.NODE_ENV!=="production"&&(Mi.propTypes={autoFocus:i.bool,autoFocusItem:i.bool,children:i.node,className:i.string,disabledItemsFocusable:i.bool,disableListWrap:i.bool,onKeyDown:i.func,variant:i.oneOf(["menu","selectedMenu"])});const Bh=Mi,Lh=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Vh={entering:{opacity:1},entered:{opacity:1}},Ii=S.forwardRef(function(t,n){const r=Gn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:a,appear:s=!0,children:l,easing:c,in:d,onEnter:h,onEntered:v,onEntering:b,onExit:p,onExited:m,onExiting:f,style:g,timeout:x=o,TransitionComponent:j=wi}=t,w=he(t,Lh),E=S.useRef(null),y=He(E,l.ref,n),O=V=>U=>{if(V){const M=E.current;U===void 0?V(M):V(M,U)}},N=O(b),_=O((V,U)=>{xi(V);const M=fr({style:g,timeout:x,easing:c},{mode:"enter"});V.style.webkitTransition=r.transitions.create("opacity",M),V.style.transition=r.transitions.create("opacity",M),h&&h(V,U)}),D=O(v),L=O(f),k=O(V=>{const U=fr({style:g,timeout:x,easing:c},{mode:"exit"});V.style.webkitTransition=r.transitions.create("opacity",U),V.style.transition=r.transitions.create("opacity",U),p&&p(V)}),C=O(m),$=V=>{a&&a(E.current,V)};return u.jsx(j,P({appear:s,in:d,nodeRef:E,onEnter:_,onEntered:D,onEntering:N,onExit:k,onExited:C,onExiting:L,addEndListener:$,timeout:x},w,{children:(V,U)=>S.cloneElement(l,P({style:P({opacity:0,visibility:V==="exited"&&!d?"hidden":void 0},Vh[V],g,l.props.style),ref:y},U))}))});process.env.NODE_ENV!=="production"&&(Ii.propTypes={addEndListener:i.func,appear:i.bool,children:Ln.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Fh=Ii;function zh(e){return et("MuiBackdrop",e)}vt("MuiBackdrop",["root","invisible"]);const Uh=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Hh=e=>{const{classes:t,invisible:n}=e;return pt({root:["root",n&&"invisible"]},zh,t)},Gh=Re("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>P({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),_i=S.forwardRef(function(t,n){var r,o,a;const s=ut({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:d="div",components:h={},componentsProps:v={},invisible:b=!1,open:p,slotProps:m={},slots:f={},TransitionComponent:g=Fh,transitionDuration:x}=s,j=he(s,Uh),w=P({},s,{component:d,invisible:b}),E=Hh(w),y=(r=m.root)!=null?r:v.root;return u.jsx(g,P({in:p,timeout:x},j,{children:u.jsx(Gh,P({"aria-hidden":!0},y,{as:(o=(a=f.root)!=null?a:h.Root)!=null?o:d,className:Ne(E.root,c,y==null?void 0:y.className),ownerState:P({},w,y==null?void 0:y.ownerState),classes:E,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(_i.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.object}),invisible:i.bool,open:i.bool.isRequired,slotProps:i.shape({root:i.object}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const qh=_i;function Wh(e){return et("MuiModal",e)}vt("MuiModal",["root","hidden","backdrop"]);const Xh=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Yh=e=>{const{open:t,exited:n,classes:r}=e;return pt({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},Wh,r)},Kh=Re("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>P({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Jh=Re(qh,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Ai=S.forwardRef(function(t,n){var r,o,a,s,l,c;const d=ut({name:"MuiModal",props:t}),{BackdropComponent:h=Jh,BackdropProps:v,className:b,closeAfterTransition:p=!1,children:m,container:f,component:g,components:x={},componentsProps:j={},disableAutoFocus:w=!1,disableEnforceFocus:E=!1,disableEscapeKeyDown:y=!1,disablePortal:O=!1,disableRestoreFocus:N=!1,disableScrollLock:_=!1,hideBackdrop:D=!1,keepMounted:L=!1,onBackdropClick:k,open:C,slotProps:$,slots:V}=d,U=he(d,Xh),M=P({},d,{closeAfterTransition:p,disableAutoFocus:w,disableEnforceFocus:E,disableEscapeKeyDown:y,disablePortal:O,disableRestoreFocus:N,disableScrollLock:_,hideBackdrop:D,keepMounted:L}),{getRootProps:F,getBackdropProps:ee,getTransitionProps:Z,portalRef:R,isTopModal:I,exited:z,hasTransition:X}=Lp(P({},M,{rootRef:n})),G=P({},M,{exited:z}),q=Yh(G),Y={};if(m.props.tabIndex===void 0&&(Y.tabIndex="-1"),X){const{onEnter:te,onExited:A}=Z();Y.onEnter=te,Y.onExited=A}const K=(r=(o=V==null?void 0:V.root)!=null?o:x.Root)!=null?r:Kh,W=(a=(s=V==null?void 0:V.backdrop)!=null?s:x.Backdrop)!=null?a:h,J=(l=$==null?void 0:$.root)!=null?l:j.root,Q=(c=$==null?void 0:$.backdrop)!=null?c:j.backdrop,ae=It({elementType:K,externalSlotProps:J,externalForwardedProps:U,getSlotProps:F,additionalProps:{ref:n,as:g},ownerState:G,className:Ne(b,J==null?void 0:J.className,q==null?void 0:q.root,!G.open&&G.exited&&(q==null?void 0:q.hidden))}),B=It({elementType:W,externalSlotProps:Q,additionalProps:v,getSlotProps:te=>ee(P({},te,{onClick:A=>{k&&k(A),te!=null&&te.onClick&&te.onClick(A)}})),className:Ne(Q==null?void 0:Q.className,v==null?void 0:v.className,q==null?void 0:q.backdrop),ownerState:G});return!L&&!C&&(!X||z)?null:u.jsx(Pn,{ref:R,container:f,disablePortal:O,children:u.jsxs(K,P({},ae,{children:[!D&&h?u.jsx(W,P({},B)):null,u.jsx(lr,{disableEnforceFocus:E,disableAutoFocus:w,disableRestoreFocus:N,isEnabled:I,open:C,children:S.cloneElement(m,Y)})]}))})});process.env.NODE_ENV!=="production"&&(Ai.propTypes={BackdropComponent:i.elementType,BackdropProps:i.object,children:Ln.isRequired,classes:i.object,className:i.string,closeAfterTransition:i.bool,component:i.elementType,components:i.shape({Backdrop:i.elementType,Root:i.elementType}),componentsProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([it,i.func]),disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableEscapeKeyDown:i.bool,disablePortal:i.bool,disableRestoreFocus:i.bool,disableScrollLock:i.bool,hideBackdrop:i.bool,keepMounted:i.bool,onBackdropClick:i.func,onClose:i.func,onTransitionEnter:i.func,onTransitionExited:i.func,open:i.bool.isRequired,slotProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({backdrop:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const Zh=Ai;function Qh(e){return et("MuiPaper",e)}vt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const em=["className","component","elevation","square","variant"],tm=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,a={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return pt(a,Qh,o)},nm=Re("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return P({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&P({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${dr("#fff",Ka(t.elevation))}, ${dr("#fff",Ka(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Di=S.forwardRef(function(t,n){const r=ut({props:t,name:"MuiPaper"}),{className:o,component:a="div",elevation:s=1,square:l=!1,variant:c="elevation"}=r,d=he(r,em),h=P({},r,{component:a,elevation:s,square:l,variant:c}),v=tm(h);return process.env.NODE_ENV!=="production"&&Gn().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),u.jsx(nm,P({as:a,ownerState:h,className:Ne(v.root,o),ref:n},d))});process.env.NODE_ENV!=="production"&&(Di.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,elevation:rn(Xs,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:i.bool,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),variant:i.oneOfType([i.oneOf(["elevation","outlined"]),i.string])});const rm=Di;function om(e){return et("MuiPopover",e)}vt("MuiPopover",["root","paper"]);const am=["onEntering"],sm=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],im=["slotProps"];function ns(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function rs(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function os(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function or(e){return typeof e=="function"?e():e}const lm=e=>{const{classes:t}=e;return pt({root:["root"],paper:["paper"]},om,t)},cm=Re(Zh,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Bi=Re(rm,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Li=S.forwardRef(function(t,n){var r,o,a;const s=ut({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:d={vertical:"top",horizontal:"left"},anchorPosition:h,anchorReference:v="anchorEl",children:b,className:p,container:m,elevation:f=8,marginThreshold:g=16,open:x,PaperProps:j={},slots:w,slotProps:E,transformOrigin:y={vertical:"top",horizontal:"left"},TransitionComponent:O=po,transitionDuration:N="auto",TransitionProps:{onEntering:_}={},disableScrollLock:D=!1}=s,L=he(s.TransitionProps,am),k=he(s,sm),C=(r=E==null?void 0:E.paper)!=null?r:j,$=S.useRef(),V=He($,C.ref),U=P({},s,{anchorOrigin:d,anchorReference:v,elevation:f,marginThreshold:g,externalPaperSlotProps:C,transformOrigin:y,TransitionComponent:O,transitionDuration:N,TransitionProps:L}),M=lm(U),F=S.useCallback(()=>{if(v==="anchorPosition")return process.env.NODE_ENV!=="production"&&(h||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),h;const te=or(c),A=te&&te.nodeType===1?te:Oe($.current).body,se=A.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Te=A.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Te.top===0&&Te.left===0&&Te.right===0&&Te.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:se.top+ns(se,d.vertical),left:se.left+rs(se,d.horizontal)}},[c,d.horizontal,d.vertical,h,v]),ee=S.useCallback(te=>({vertical:ns(te,y.vertical),horizontal:rs(te,y.horizontal)}),[y.horizontal,y.vertical]),Z=S.useCallback(te=>{const A={width:te.offsetWidth,height:te.offsetHeight},se=ee(A);if(v==="none")return{top:null,left:null,transformOrigin:os(se)};const Te=F();let Pe=Te.top-se.vertical,xe=Te.left-se.horizontal;const xt=Pe+A.height,je=xe+A.width,tt=Jt(or(c)),Ae=tt.innerHeight-g,nt=tt.innerWidth-g;if(g!==null&&Pe<g){const Se=Pe-g;Pe-=Se,se.vertical+=Se}else if(g!==null&&xt>Ae){const Se=xt-Ae;Pe-=Se,se.vertical+=Se}if(process.env.NODE_ENV!=="production"&&A.height>Ae&&A.height&&Ae&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${A.height-Ae}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),g!==null&&xe<g){const Se=xe-g;xe-=Se,se.horizontal+=Se}else if(je>nt){const Se=je-nt;xe-=Se,se.horizontal+=Se}return{top:`${Math.round(Pe)}px`,left:`${Math.round(xe)}px`,transformOrigin:os(se)}},[c,v,F,ee,g]),[R,I]=S.useState(x),z=S.useCallback(()=>{const te=$.current;if(!te)return;const A=Z(te);A.top!==null&&(te.style.top=A.top),A.left!==null&&(te.style.left=A.left),te.style.transformOrigin=A.transformOrigin,I(!0)},[Z]);S.useEffect(()=>(D&&window.addEventListener("scroll",z),()=>window.removeEventListener("scroll",z)),[c,D,z]);const X=(te,A)=>{_&&_(te,A),z()},G=()=>{I(!1)};S.useEffect(()=>{x&&z()}),S.useImperativeHandle(l,()=>x?{updatePosition:()=>{z()}}:null,[x,z]),S.useEffect(()=>{if(!x)return;const te=Fs(()=>{z()}),A=Jt(c);return A.addEventListener("resize",te),()=>{te.clear(),A.removeEventListener("resize",te)}},[c,x,z]);let q=N;N==="auto"&&!O.muiSupportAuto&&(q=void 0);const Y=m||(c?Oe(or(c)).body:void 0),K=(o=w==null?void 0:w.root)!=null?o:cm,W=(a=w==null?void 0:w.paper)!=null?a:Bi,J=It({elementType:W,externalSlotProps:P({},C,{style:R?C.style:P({},C.style,{opacity:0})}),additionalProps:{elevation:f,ref:V},ownerState:U,className:Ne(M.paper,C==null?void 0:C.className)}),Q=It({elementType:K,externalSlotProps:(E==null?void 0:E.root)||{},externalForwardedProps:k,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:Y,open:x},ownerState:U,className:Ne(M.root,p)}),{slotProps:ae}=Q,B=he(Q,im);return u.jsx(K,P({},B,!Zs(K)&&{slotProps:ae,disableScrollLock:D},{children:u.jsx(O,P({appear:!0,in:x,onEntering:X,onExited:G,timeout:q},L,{children:u.jsx(W,P({},J,{children:b}))}))}))});process.env.NODE_ENV!=="production"&&(Li.propTypes={action:To,anchorEl:rn(i.oneOfType([it,i.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=or(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),anchorPosition:i.shape({left:i.number.isRequired,top:i.number.isRequired}),anchorReference:i.oneOf(["anchorEl","anchorPosition","none"]),children:i.node,classes:i.object,className:i.string,container:i.oneOfType([it,i.func]),disableScrollLock:i.bool,elevation:Xs,marginThreshold:i.number,onClose:i.func,open:i.bool.isRequired,PaperProps:i.shape({component:Lc}),slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transformOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object});const pm=Li;function um(e){return et("MuiMenu",e)}vt("MuiMenu",["root","paper","list"]);const dm=["onEntering"],fm=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],hm={vertical:"top",horizontal:"right"},mm={vertical:"top",horizontal:"left"},gm=e=>{const{classes:t}=e;return pt({root:["root"],paper:["paper"],list:["list"]},um,t)},bm=Re(pm,{shouldForwardProp:e=>vi(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),vm=Re(Bi,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),ym=Re(Bh,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Vi=S.forwardRef(function(t,n){var r,o;const a=ut({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:l,className:c,disableAutoFocusItem:d=!1,MenuListProps:h={},onClose:v,open:b,PaperProps:p={},PopoverClasses:m,transitionDuration:f="auto",TransitionProps:{onEntering:g}={},variant:x="selectedMenu",slots:j={},slotProps:w={}}=a,E=he(a.TransitionProps,dm),y=he(a,fm),O=Gn(),N=O.direction==="rtl",_=P({},a,{autoFocus:s,disableAutoFocusItem:d,MenuListProps:h,onEntering:g,PaperProps:p,transitionDuration:f,TransitionProps:E,variant:x}),D=gm(_),L=s&&!d&&b,k=S.useRef(null),C=(Z,R)=>{k.current&&k.current.adjustStyleForScrollbar(Z,O),g&&g(Z,R)},$=Z=>{Z.key==="Tab"&&(Z.preventDefault(),v&&v(Z,"tabKeyDown"))};let V=-1;S.Children.map(l,(Z,R)=>{S.isValidElement(Z)&&(process.env.NODE_ENV!=="production"&&sr.isFragment(Z)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Z.props.disabled||(x==="selectedMenu"&&Z.props.selected||V===-1)&&(V=R))});const U=(r=j.paper)!=null?r:vm,M=(o=w.paper)!=null?o:p,F=It({elementType:j.root,externalSlotProps:w.root,ownerState:_,className:[D.root,c]}),ee=It({elementType:U,externalSlotProps:M,ownerState:_,className:D.paper});return u.jsx(bm,P({onClose:v,anchorOrigin:{vertical:"bottom",horizontal:N?"right":"left"},transformOrigin:N?hm:mm,slots:{paper:U,root:j.root},slotProps:{root:F,paper:ee},open:b,ref:n,transitionDuration:f,TransitionProps:P({onEntering:C},E),ownerState:_},y,{classes:m,children:u.jsx(ym,P({onKeyDown:$,actions:k,autoFocus:s&&(V===-1||d),autoFocusItem:L,variant:x},h,{className:Ne(D.list,h.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(Vi.propTypes={anchorEl:i.oneOfType([it,i.func]),autoFocus:i.bool,children:i.node,classes:i.object,className:i.string,disableAutoFocusItem:i.bool,MenuListProps:i.object,onClose:i.func,open:i.bool.isRequired,PaperProps:i.object,PopoverClasses:i.object,slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object,variant:i.oneOf(["menu","selectedMenu"])});const wm=Vi;function xm({className:e,commandHandler:t,menuDefinition:n,children:r}){var d;const[o,a]=T.useState(void 0),s=T.useCallback(h=>{h.preventDefault(),a(o===void 0?{mouseX:h.clientX+2,mouseY:h.clientY-6}:void 0)},[o]),l=T.useCallback(()=>{a(void 0)},[]),c=T.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((d=n==null?void 0:n.items)==null?void 0:d.length)??0)===0||!r?r:u.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[r,u.jsx(wm,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:u.jsx(Ho,{menuDefinition:n,commandHandler:t,onClick:l})})]})}const Em=Ni(u.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function km(e){return{preserveValue:!0,...e}}const hr=(e,t,n={})=>{const r=T.useRef(t);r.current=t;const o=T.useRef(n);o.current=km(o.current);const[a,s]=T.useState(()=>r.current),[l,c]=T.useState(!0);return T.useEffect(()=>{let d=!0;return c(!!e),(async()=>{if(e){const h=await e();d&&(s(()=>h),c(!1))}})(),()=>{d=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[a,l]};function Fi({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:a,ariaLabelPrefix:s,children:l}){const[c,d]=T.useState(!1),[h,v]=T.useState(!1),b=T.useCallback(()=>{c&&d(!1),v(!1)},[c]),p=T.useCallback(E=>{E.stopPropagation(),d(y=>{const O=!y;return O&&E.shiftKey?v(!0):O||v(!1),O})},[]),m=T.useCallback(E=>(b(),r(E)),[r,b]),[f,g]=T.useState({top:1,left:1});T.useEffect(()=>{if(c){const E=o==null?void 0:o.current;if(E){const y=E.getBoundingClientRect(),O=window.scrollY,N=window.scrollX,_=y.top+O+E.clientHeight,D=y.left+N;g({top:_,left:D})}}},[c,o]);const[x]=hr(T.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[j]=hr(T.useCallback(async()=>(e==null?void 0:e(!0))??n??x,[e,n,x,c]),n??x),w=h&&j?j:x;return u.jsxs(u.Fragment,{children:[u.jsx(ye.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:p,children:l??u.jsx(Em,{})}),u.jsx(ye.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:c,onClose:b,PaperProps:{className:"papi-menu-drawer-paper",style:{top:f.top,left:f.left}},children:w?u.jsx(Ri,{className:a,id:`${s??""} main menu`,commandHandler:m,multiColumnMenu:w}):void 0})]})}function Tm({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:s="medium",className:l,onClick:c,children:d}){return u.jsx(ye.IconButton,{id:e,disabled:n,edge:a,size:s,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:d})}const mt="scrBook",Sm="scrRef",Nt="source",Nm="details",Cm="Scripture Reference",Om="Scripture Book",zi="Type",Rm="Details";function Pm(e,t){const n=t??!1;return[{accessorFn:r=>`${de.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:mt,header:(e==null?void 0:e.scriptureReferenceColumnName)??Cm,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?de.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===mt?Ye.formatScrRef(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>Ye.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>Ye.formatScrRef(r.start),id:Sm,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:Ye.formatScrRef(o.start)},sortingFn:(r,o)=>Ye.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:Nt,header:n?(e==null?void 0:e.typeColumnName)??zi:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:Nm,header:(e==null?void 0:e.detailsColumnName)??Rm,cell:r=>r.getValue(),enableGrouping:!1}]}function jm({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:a,detailsColumnName:s,onRowSelected:l}){const[c,d]=T.useState([]),[h,v]=T.useState([{id:mt,desc:!1}]),[b,p]=T.useState(()=>e.flatMap(k=>{const C=k.source;return k.data.map($=>({...$,source:C}))})),[m,f]=T.useState({});T.useEffect(()=>{p(()=>e.flatMap(k=>{const C=k.source;return k.data.map($=>({...$,source:C}))}))},[e]);const g=T.useMemo(()=>Pm({scriptureReferenceColumnName:r,typeColumnName:a,detailsColumnName:s},n),[r,a,s,n]);T.useEffect(()=>{c.includes(Nt)?v([{id:Nt,desc:!1},{id:mt,desc:!1}]):v([{id:mt,desc:!1}])},[c]);const x=T.useCallback((k,C)=>!C||Ye.compareScrRefs(k,C)===0?`${Ye.scrRefToBBBCCCVVV(k)}`:`${Ye.scrRefToBBBCCCVVV(k)}-${Ye.scrRefToBBBCCCVVV(C)}`,[]),j=T.useCallback(k=>`${x(k.start,k.end)} ${k.source} ${k.detail}`,[x]),w=Ce.useReactTable({data:b,columns:g,state:{grouping:c,sorting:h,rowSelection:m},onGroupingChange:d,onSortingChange:v,onRowSelectionChange:f,getExpandedRowModel:Ce.getExpandedRowModel(),getGroupedRowModel:Ce.getGroupedRowModel(),getCoreRowModel:Ce.getCoreRowModel(),getSortedRowModel:Ce.getSortedRowModel(),getRowId:j,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});T.useEffect(()=>{if(l){const k=w.getSelectedRowModel().rowsById,C=Object.keys(k);if(C.length===1){const $=b.find(V=>j(V)===C[0])||void 0;$&&l($)}}},[m,b,j,l,w]);const E=o??Om,y=a??zi,O=[{label:"No Grouping",value:[]},{label:`Group by ${E}`,value:[mt]},{label:`Group by ${y}`,value:[Nt]},{label:`Group by ${E} and ${y}`,value:[mt,Nt]},{label:`Group by ${y} and ${E}`,value:[Nt,mt]}],N=k=>{d(JSON.parse(k))},_=(k,C)=>{!k.getIsGrouped()&&!k.getIsSelected()&&k.getToggleSelectedHandler()(C)},D=(k,C)=>k.getIsGrouped()?"":H("banded-row",C%2===0?"even":"odd"),L=(k,C,$)=>{if(!((k==null?void 0:k.length)===0||C.depth<$.column.getGroupedIndex())){if(C.getIsGrouped())switch(C.depth){case 1:return"pr-ps-4";default:return}switch(C.depth){case 1:return"pr-ps-8";case 2:return"pr-ps-12";default:return}}};return u.jsxs("div",{className:"pr-twp pr-w-full",children:[!t&&u.jsxs(Cn,{value:JSON.stringify(c),onValueChange:k=>{N(k)},children:[u.jsx(Xt,{className:"pr-mb-1 pr-mt-2",children:u.jsx(On,{})}),u.jsx(Yt,{position:"item-aligned",children:u.jsx(Rs,{children:O.map(k=>u.jsx(Xe,{value:JSON.stringify(k.value),children:k.label},k.label))})})]}),u.jsxs(An,{className:"pr-p-0",children:[t&&u.jsx(Dn,{children:w.getHeaderGroups().map(k=>u.jsx(at,{children:k.headers.filter(C=>C.column.columnDef.header).map(C=>u.jsx(Wt,{colSpan:C.colSpan,children:C.isPlaceholder?void 0:u.jsxs("div",{children:[C.column.getCanGroup()?u.jsx(Ee,{variant:"ghost",title:`Toggle grouping by ${C.column.columnDef.header}`,onClick:C.column.getToggleGroupingHandler(),type:"button",children:C.column.getIsGrouped()?`🛑(${C.column.getGroupedIndex()}) `:"👊 "}):void 0," ",Ce.flexRender(C.column.columnDef.header,C.getContext())]})},C.id))},k.id))}),u.jsx(Bn,{children:w.getRowModel().rows.map((k,C)=>u.jsx(at,{"data-state":k.getIsSelected()?"selected":"",className:H(D(k,C)),onClick:$=>_(k,$),children:k.getVisibleCells().map($=>{if(!($.getIsPlaceholder()||$.column.columnDef.enableGrouping&&!$.getIsGrouped()&&($.column.columnDef.id!==Nt||!n)))return u.jsx($t,{className:H($.column.columnDef.id,"pr-p-[1px]",L(c,k,$)),children:(()=>$.getIsGrouped()?u.jsxs(Ee,{variant:"ghost",onClick:k.getToggleExpandedHandler(),type:"button",children:[k.getIsExpanded()?"👇":"👉"," ",Ce.flexRender($.column.columnDef.cell,$.getContext())," (",k.subRows.length,")"]}):Ce.flexRender($.column.columnDef.cell,$.getContext()))()},$.id)})},k.id))})]})]})}const $m=ho.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),Go=T.forwardRef(({className:e,...t},n)=>u.jsx(hs.Root,{ref:n,className:H($m(),e),...t}));Go.displayName=hs.Root.displayName;function Ui({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:a,placeholder:s,isRequired:l=!1,className:c,defaultValue:d,value:h,onChange:v,onFocus:b,onBlur:p}){return u.jsxs("div",{className:H("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":r}),children:[u.jsx(Go,{htmlFor:e,className:H({"pr-text-red-600":n,"pr-hidden":!a}),children:`${a}${l?"*":""}`}),u.jsx(_n,{id:e,disabled:t,placeholder:s,required:l,className:H(c,{"pr-border-red-600":n}),defaultValue:d,value:h,onChange:v,onFocus:b,onBlur:p}),u.jsx("p",{className:H({"pr-hidden":!o}),children:o})]})}function Mm({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=T.useState(""),a=s=>{o(s),e(s)};return u.jsx(Ui,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:s=>a(s.target.value)})}function Im({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:a=1,showMarks:s=!1,defaultValue:l,value:c,valueLabelDisplay:d="off",className:h,onChange:v,onChangeCommitted:b}){return u.jsx(ye.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:a,marks:s,defaultValue:l,value:c,valueLabelDisplay:d,className:`papi-slider ${n} ${h??""}`,onChange:v,onChangeCommitted:b})}function _m({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:s,children:l}){const c={action:(s==null?void 0:s.action)||l,message:s==null?void 0:s.message,className:r};return u.jsx(ye.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:a,id:t,ContentProps:c})}function Am({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:a}){return u.jsx(ye.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:a})}function Dm({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const a=T.useRef(void 0);return u.jsx("div",{ref:a,style:{position:"relative"},children:u.jsx(ye.AppBar,{position:"static",id:r,children:u.jsxs(ye.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?u.jsx(Fi,{commandHandler:t,containerRef:a,menuProvider:e}):void 0,o?u.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Bm=_e.Root,Hi=T.forwardRef(({className:e,...t},n)=>u.jsx(_e.List,{ref:n,className:H("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Hi.displayName=_e.List.displayName;const Gi=T.forwardRef(({className:e,...t},n)=>u.jsx(_e.Trigger,{ref:n,className:H("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));Gi.displayName=_e.Trigger.displayName;const qi=T.forwardRef(({className:e,...t},n)=>u.jsx(_e.Content,{ref:n,className:H("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));qi.displayName=_e.Content.displayName;const Wi=T.forwardRef(({className:e,...t},n)=>u.jsx(_e.Root,{orientation:"vertical",ref:n,className:H("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));Wi.displayName=_e.List.displayName;const Xi=T.forwardRef(({className:e,...t},n)=>u.jsx(_e.List,{ref:n,className:H("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Xi.displayName=_e.List.displayName;const Lm=T.forwardRef(({className:e,...t},n)=>u.jsx(_e.Trigger,{ref:n,...t,className:H("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),Yi=T.forwardRef(({className:e,...t},n)=>u.jsx(_e.Content,{ref:n,className:H("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));Yi.displayName=_e.Content.displayName;const er=e=>e==="asc"?u.jsx(fe.ArrowUpIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):e==="desc"?u.jsx(fe.ArrowDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):u.jsx(fe.ArrowUpDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}),Vm=(e,t,n,r,o)=>[{accessorKey:"character",header:({column:a})=>u.jsxs(Ee,{onClick:()=>a.toggleSorting(void 0),children:[e,er(a.getIsSorted())]})},{accessorKey:"unicodeValue",header:({column:a})=>u.jsxs(Ee,{onClick:()=>a.toggleSorting(void 0),children:[t,er(a.getIsSorted())]}),cell:({row:a})=>a.getValue("character").charCodeAt(0).toString(16).toUpperCase().padStart(4,"0")},{accessorKey:"count",header:({column:a})=>u.jsxs(Ee,{onClick:()=>a.toggleSorting(void 0),children:[n,er(a.getIsSorted())]})},{accessorKey:"status",header:({column:a,table:s})=>{const l=s.getSelectedRowModel().rows,c=[];return l.forEach(d=>{c.push(d.getValue("character"))}),u.jsxs("div",{children:[u.jsx("div",{className:"pr-flex pr-justify-center",children:u.jsxs(Ee,{onClick:()=>a.toggleSorting(void 0),children:[r,er(a.getIsSorted())]})}),u.jsxs("div",{className:"pr-flex pr-justify-center",children:[u.jsx(Ee,{children:u.jsx(fe.CircleCheckIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,!0)}})}),u.jsx(Ee,{children:u.jsx(fe.CircleXIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,!1)}})}),u.jsx(Ee,{children:u.jsx(fe.CircleHelpIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,void 0)}})})]})]})},cell:({row:a})=>{const s=a.getValue("status");return s===!0?u.jsx(fe.CircleCheckIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):s===!1?u.jsx(fe.CircleXIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):u.jsx(fe.CircleHelpIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"})}}];function Fm({tableData:e,onStatusChange:t,onSelectCharacter:n,localizedStrings:r}){const o=r["%webView_inventory_table_header_character%"],a=r["%webView_inventory_table_header_unicode_value%"],s=r["%webView_inventory_table_header_count%"],l=r["%webView_inventory_table_header_status%"],c=(d,h)=>{h.toggleAllRowsSelected(!1),d.toggleSelected(void 0),n(d.getValue("character"))};return u.jsx("div",{className:"pr-overflow-y-auto",children:u.jsx($s,{columns:Vm(o,a,s,l,t),data:e,onRowClickHandler:c})})}const as=(e,t,n)=>{if(!e||e===""||t==="")return[];const r=[],o=e.split(`
`);let a="0",s="0",l=0;return o.forEach(c=>{const d=c.split(/\s+/);c.startsWith("\\c")&&([,a]=d,s="0"),c.startsWith("\\v")&&([,s]=d,a==="0"&&(a=n.chapterNum.toString()));for(let h=0;h<d.length;h++)if(d[h].includes(t)){const v=Math.max(0,h-2),b=Math.min(d.length,h+3),p=d.slice(v,b).join(" "),m={reference:{...n,chapterNum:+a,verseNum:+s},snippet:p,key:l};l+=1,r.push(m)}}),r};function zm({selectedCharacter:e,text:t,scriptureReference:n,setScriptureReference:r,localizedStrings:o}){const a=o["%webView_inventory_occurrences_table_header_reference%"],s=o["%webView_inventory_occurrences_table_header_occurrence%"],[l,c]=T.useState(as(t,e,n));return T.useEffect(()=>c(as(t,e,n)),[t,e,n]),u.jsxs(An,{children:[u.jsx(Dn,{children:u.jsxs(at,{children:[u.jsx(Wt,{children:a}),u.jsx(Wt,{children:s})]})}),u.jsx(Bn,{children:l.map(d=>u.jsxs(at,{onClick:()=>{r(d.reference)},children:[u.jsx($t,{children:`${de.bookNumberToEnglishName(d.reference.bookNum)} ${d.reference.chapterNum}:${d.reference.verseNum}`}),u.jsx($t,{children:d.snippet})]},d.key))})]})}const Um=async(e,t,n,r,o)=>{const a=[];return Ye.split(e,"").forEach(s=>{if(n!==""&&!s.includes(n))return;const l=a.find(c=>c.character===s);if(l)l.count+=1;else{let c;if(r.includes(s)&&(c=!0),o.includes(s)&&(c=!1),t==="all"||t==="approved"&&c===!0||t==="unapproved"&&c===!1||t==="unknown"&&c===void 0){const d={character:s,count:1,status:c};a.push(d)}}}),a};function Hm({scriptureReference:e,setScriptureReference:t,localizedStrings:n,projectId:r,getSetting:o,setSetting:a,getText:s}){const l=n["%webView_characterInventory_characters_all%"],c=n["%webView_characterInventory_characters_approved%"],d=n["%webView_characterInventory_characters_unapproved%"],h=n["%webView_characterInventory_characters_unknown%"],v=n["%webView_inventory_scope_book%"],b=n["%webView_inventory_scope_chapter%"],p=n["%webView_inventory_scope_verse%"],m=n["%webView_inventory_filter_text%"],[f,g]=T.useState([]),[x,j]=T.useState([]),[w,E]=T.useState(void 0),[y,O]=T.useState("book"),[N,_]=T.useState("all"),[D,L]=T.useState(""),[k,C]=T.useState([]),[$,V]=T.useState(""),U=(M,F)=>{C(ee=>{let Z=[];return M.forEach(R=>{Z=ee.map(I=>I.character===R&&I.status!==F?{...I,status:F}:I)}),g(R=>{let I=[...R];return M.forEach(z=>{F===!0?I.includes(z)||I.push(z):I=I.filter(X=>X!==z)}),a("validCharacters",r,I),I}),j(R=>{let I=[...R];return M.forEach(z=>{F===!1?I.includes(z)||I.push(z):I=I.filter(X=>X!==z)}),a("invalidCharacters",r,I),I}),Z})};return T.useEffect(()=>{(async()=>{try{g(await o("validCharacters",r)),j(await o("invalidCharacters",r))}catch{throw new Error("Failed to fetch characters from project settings")}})()},[r,o]),T.useEffect(()=>{(async()=>{try{const F=await s(r,e,y);E(F)}catch{throw new Error("Failed getting scripture text")}})()},[r,e,y,s]),T.useEffect(()=>{if(!w){C([]);return}(async()=>{try{C(await Um(w,N,D,f,x))}catch{throw new Error("Failed building table data")}})()},[f,x,w,N,D]),u.jsxs("div",{className:"pr-twp",children:[u.jsxs("div",{className:"pr-flex",children:[u.jsxs(Cn,{onValueChange:M=>_(M),defaultValue:N,children:[u.jsx(Xt,{children:u.jsx(On,{placeholder:"Select filter"})}),u.jsxs(Yt,{children:[u.jsx(Xe,{value:"all",children:l}),u.jsx(Xe,{value:"approved",children:c}),u.jsx(Xe,{value:"unapproved",children:d}),u.jsx(Xe,{value:"unknown",children:h})]})]}),u.jsxs(Cn,{onValueChange:M=>O(M),defaultValue:y,children:[u.jsx(Xt,{children:u.jsx(On,{placeholder:"Select scope"})}),u.jsxs(Yt,{children:[u.jsx(Xe,{value:"book",children:v}),u.jsx(Xe,{value:"chapter",children:b}),u.jsx(Xe,{value:"verse",children:p})]})]}),u.jsx(_n,{className:"pr-rounded-md pr-border",placeholder:m,value:D,onChange:M=>{L(M.target.value)}})]}),u.jsx("div",{className:`pr-overflow-y-auto pr-rounded-md pr-border ${$!==""&&"pr-max-h-96"}`,children:u.jsx(Fm,{tableData:k,onStatusChange:U,onSelectCharacter:M=>{V(M)},localizedStrings:n})}),$!==""&&u.jsx("div",{className:"pr-mt-4 pr-rounded-md pr-border",children:u.jsx(zm,{selectedCharacter:$,text:w,scriptureReference:e,setScriptureReference:M=>t(M),localizedStrings:n})})]})}function Gm({isDownloading:e,handleClick:t,buttonText:n}){return u.jsx(Ee,{className:H("pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out",{"pr-cursor-not-allowed pr-bg-blue-700":e,"pr-bg-blue-600":!e,"pr-bg-white pr-text-blue-600":!n,"pr-w-20":n}),onClick:t,children:e?u.jsx(fe.LoaderCircle,{size:15,className:"pr-animate-spin"}):u.jsxs(u.Fragment,{children:[u.jsx(fe.Download,{size:25,className:"pr-h-4 pr-w-4"}),n]})})}function qm({isRemoving:e,handleClick:t}){return u.jsx(Ee,{className:H("pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-gray-400":e}),onClick:t,children:e?u.jsxs(u.Fragment,{children:[u.jsx(fe.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-black"}),"Removing..."]}):"Remove"})}function Wm({isUpdating:e,handleClick:t}){return u.jsx(Ee,{className:H("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e}),onClick:t,children:e?u.jsxs(u.Fragment,{children:[u.jsx(fe.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-white"}),"Updating..."]}):"Update"})}function Rt(){return Rt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Rt.apply(this,arguments)}const Xm=["children","options"],ss=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,t)=>(e[t.toLowerCase()]=t,e),{for:"htmlFor"}),is={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},Ym=["style","script"],Km=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,Jm=/mailto:/i,Zm=/\n{2,}$/,Ki=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,Qm=/^ *> ?/gm,eg=/^ {2,}\n/,tg=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,Ji=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,Zi=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,ng=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,rg=/^(?:\n *)*\n/,og=/\r\n?/g,ag=/^\[\^([^\]]+)](:.*)\n/,sg=/^\[\^([^\]]+)]/,ig=/\f/g,lg=/^\s*?\[(x|\s)\]/,Qi=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,el=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,tl=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,uo=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,cg=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,nl=/^<!--[\s\S]*?(?:-->)/,pg=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,fo=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,ug=/^\{.*\}$/,dg=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,fg=/^<([^ >]+@[^ >]+)>/,hg=/^<([^ >]+:\/[^ >]+)>/,mg=/-([a-z])?/gi,rl=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,gg=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,bg=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,vg=/^\[([^\]]*)\] ?\[([^\]]*)\]/,yg=/(\[|\])/g,wg=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,xg=/\t/g,Eg=/^ *\| */,kg=/(^ *\||\| *$)/g,Tg=/ *$/,Sg=/^ *:-+: *$/,Ng=/^ *:-+ *$/,Cg=/^ *-+: *$/,Og=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,Rg=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,Pg=/^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,jg=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,$g=/^\\([^0-9A-Za-z\s])/,Mg=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,Ig=/^\n+/,_g=/^([ \t]*)/,Ag=/\\([^\\])/g,ls=/ *\n+$/,Dg=/(?:^|\n)( *)$/,qo="(?:\\d+\\.)",Wo="(?:[*+-])";function ol(e){return"( *)("+(e===1?qo:Wo)+") +"}const al=ol(1),sl=ol(2);function il(e){return new RegExp("^"+(e===1?al:sl))}const Bg=il(1),Lg=il(2);function ll(e){return new RegExp("^"+(e===1?al:sl)+"[^\\n]*(?:\\n(?!\\1"+(e===1?qo:Wo)+" )[^\\n]*)*(\\n|$)","gm")}const cl=ll(1),pl=ll(2);function ul(e){const t=e===1?qo:Wo;return new RegExp("^( *)("+t+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+t+" (?!"+t+" ))\\n*|\\s*\\n*$)")}const dl=ul(1),fl=ul(2);function cs(e,t){const n=t===1,r=n?dl:fl,o=n?cl:pl,a=n?Bg:Lg;return{t(s,l,c){const d=Dg.exec(c);return d&&(l.o||!l._&&!l.u)?r.exec(s=d[1]+s):null},i:oe.HIGH,l(s,l,c){const d=n?+s[2]:void 0,h=s[0].replace(Zm,`
`).match(o);let v=!1;return{p:h.map(function(b,p){const m=a.exec(b)[0].length,f=new RegExp("^ {1,"+m+"}","gm"),g=b.replace(f,"").replace(a,""),x=p===h.length-1,j=g.indexOf(`

`)!==-1||x&&v;v=j;const w=c._,E=c.o;let y;c.o=!0,j?(c._=!1,y=g.replace(ls,`

`)):(c._=!0,y=g.replace(ls,""));const O=l(y,c);return c._=w,c.o=E,O}),m:n,g:d}},h:(s,l,c)=>e(s.m?"ol":"ul",{key:c.k,start:s.g},s.p.map(function(d,h){return e("li",{key:h},l(d,c))}))}}const Vg=/^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Fg=/^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,hl=[Ki,Ji,Zi,Qi,tl,el,nl,rl,cl,dl,pl,fl],zg=[...hl,/^[^\n]+(?:  \n|\n{2,})/,uo,fo];function Ug(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function Hg(e){return Cg.test(e)?"right":Sg.test(e)?"center":Ng.test(e)?"left":null}function ps(e,t,n){const r=n.$;n.$=!0;const o=t(e.trim(),n);n.$=r;let a=[[]];return o.forEach(function(s,l){s.type==="tableSeparator"?l!==0&&l!==o.length-1&&a.push([]):(s.type!=="text"||o[l+1]!=null&&o[l+1].type!=="tableSeparator"||(s.v=s.v.replace(Tg,"")),a[a.length-1].push(s))}),a}function Gg(e,t,n){n._=!0;const r=ps(e[1],t,n),o=e[2].replace(kg,"").split("|").map(Hg),a=function(s,l,c){return s.trim().split(`
`).map(function(d){return ps(d,l,c)})}(e[3],t,n);return n._=!1,{S:o,A:a,L:r,type:"table"}}function us(e,t){return e.S[t]==null?{}:{textAlign:e.S[t]}}function ft(e){return function(t,n){return n._?e.exec(t):null}}function ht(e){return function(t,n){return n._||n.u?e.exec(t):null}}function ot(e){return function(t,n){return n._||n.u?null:e.exec(t)}}function gn(e){return function(t){return e.exec(t)}}function qg(e,t,n){if(t._||t.u||n&&!n.endsWith(`
`))return null;let r="";e.split(`
`).every(a=>!hl.some(s=>s.test(a))&&(r+=a+`
`,a.trim()));const o=r.trimEnd();return o==""?null:[r,o]}function Ht(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch{return null}return e}function ds(e){return e.replace(Ag,"$1")}function ar(e,t,n){const r=n._||!1,o=n.u||!1;n._=!0,n.u=!0;const a=e(t,n);return n._=r,n.u=o,a}function Wg(e,t,n){const r=n._||!1,o=n.u||!1;n._=!1,n.u=!0;const a=e(t,n);return n._=r,n.u=o,a}function Xg(e,t,n){return n._=!1,e(t,n)}const qr=(e,t,n)=>({v:ar(t,e[1],n)});function Wr(){return{}}function Xr(){return null}function Yg(...e){return e.filter(Boolean).join(" ")}function Yr(e,t,n){let r=e;const o=t.split(".");for(;o.length&&(r=r[o[0]],r!==void 0);)o.shift();return r||n}var oe;function Kg(e,t={}){t.overrides=t.overrides||{},t.slugify=t.slugify||Ug,t.namedCodesToUnicode=t.namedCodesToUnicode?Rt({},is,t.namedCodesToUnicode):is;const n=t.createElement||S.createElement;function r(p,m,...f){const g=Yr(t.overrides,`${p}.props`,{});return n(function(x,j){const w=Yr(j,x);return w?typeof w=="function"||typeof w=="object"&&"render"in w?w:Yr(j,`${x}.component`,x):x}(p,t.overrides),Rt({},m,g,{className:Yg(m==null?void 0:m.className,g.className)||void 0}),...f)}function o(p){let m=!1;t.forceInline?m=!0:t.forceBlock||(m=wg.test(p)===!1);const f=h(d(m?p:`${p.trimEnd().replace(Ig,"")}

`,{_:m}));for(;typeof f[f.length-1]=="string"&&!f[f.length-1].trim();)f.pop();if(t.wrapper===null)return f;const g=t.wrapper||(m?"span":"div");let x;if(f.length>1||t.forceWrapper)x=f;else{if(f.length===1)return x=f[0],typeof x=="string"?r("span",{key:"outer"},x):x;x=null}return S.createElement(g,{key:"outer"},x)}function a(p){const m=p.match(Km);return m?m.reduce(function(f,g,x){const j=g.indexOf("=");if(j!==-1){const w=function(N){return N.indexOf("-")!==-1&&N.match(pg)===null&&(N=N.replace(mg,function(_,D){return D.toUpperCase()})),N}(g.slice(0,j)).trim(),E=function(N){const _=N[0];return(_==='"'||_==="'")&&N.length>=2&&N[N.length-1]===_?N.slice(1,-1):N}(g.slice(j+1).trim()),y=ss[w]||w,O=f[y]=function(N,_){return N==="style"?_.split(/;\s?/).reduce(function(D,L){const k=L.slice(0,L.indexOf(":"));return D[k.replace(/(-[a-z])/g,C=>C[1].toUpperCase())]=L.slice(k.length+1).trim(),D},{}):N==="href"?Ht(_):(_.match(ug)&&(_=_.slice(1,_.length-1)),_==="true"||_!=="false"&&_)}(w,E);typeof O=="string"&&(uo.test(O)||fo.test(O))&&(f[y]=S.cloneElement(o(O.trim()),{key:x}))}else g!=="style"&&(f[ss[g]||g]=!0);return f},{}):null}const s=[],l={},c={blockQuote:{t:ot(Ki),i:oe.HIGH,l:(p,m,f)=>({v:m(p[0].replace(Qm,""),f)}),h:(p,m,f)=>r("blockquote",{key:f.k},m(p.v,f))},breakLine:{t:gn(eg),i:oe.HIGH,l:Wr,h:(p,m,f)=>r("br",{key:f.k})},breakThematic:{t:ot(tg),i:oe.HIGH,l:Wr,h:(p,m,f)=>r("hr",{key:f.k})},codeBlock:{t:ot(Zi),i:oe.MAX,l:p=>({v:p[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),M:void 0}),h:(p,m,f)=>r("pre",{key:f.k},r("code",Rt({},p.O,{className:p.M?`lang-${p.M}`:""}),p.v))},codeFenced:{t:ot(Ji),i:oe.MAX,l:p=>({O:a(p[3]||""),v:p[4],M:p[2]||void 0,type:"codeBlock"})},codeInline:{t:ht(ng),i:oe.LOW,l:p=>({v:p[2]}),h:(p,m,f)=>r("code",{key:f.k},p.v)},footnote:{t:ot(ag),i:oe.MAX,l:p=>(s.push({I:p[2],j:p[1]}),{}),h:Xr},footnoteReference:{t:ft(sg),i:oe.HIGH,l:p=>({v:p[1],B:`#${t.slugify(p[1])}`}),h:(p,m,f)=>r("a",{key:f.k,href:Ht(p.B)},r("sup",{key:f.k},p.v))},gfmTask:{t:ft(lg),i:oe.HIGH,l:p=>({R:p[1].toLowerCase()==="x"}),h:(p,m,f)=>r("input",{checked:p.R,key:f.k,readOnly:!0,type:"checkbox"})},heading:{t:ot(t.enforceAtxHeadings?el:Qi),i:oe.HIGH,l:(p,m,f)=>({v:ar(m,p[2],f),T:t.slugify(p[2]),C:p[1].length}),h:(p,m,f)=>r(`h${p.C}`,{id:p.T,key:f.k},m(p.v,f))},headingSetext:{t:ot(tl),i:oe.MAX,l:(p,m,f)=>({v:ar(m,p[1],f),C:p[2]==="="?1:2,type:"heading"})},htmlComment:{t:gn(nl),i:oe.HIGH,l:()=>({}),h:Xr},image:{t:ht(Fg),i:oe.HIGH,l:p=>({D:p[1],B:ds(p[2]),F:p[3]}),h:(p,m,f)=>r("img",{key:f.k,alt:p.D||void 0,title:p.F||void 0,src:Ht(p.B)})},link:{t:ft(Vg),i:oe.LOW,l:(p,m,f)=>({v:Wg(m,p[1],f),B:ds(p[2]),F:p[3]}),h:(p,m,f)=>r("a",{key:f.k,href:Ht(p.B),title:p.F},m(p.v,f))},linkAngleBraceStyleDetector:{t:ft(hg),i:oe.MAX,l:p=>({v:[{v:p[1],type:"text"}],B:p[1],type:"link"})},linkBareUrlDetector:{t:(p,m)=>m.N?null:ft(dg)(p,m),i:oe.MAX,l:p=>({v:[{v:p[1],type:"text"}],B:p[1],F:void 0,type:"link"})},linkMailtoDetector:{t:ft(fg),i:oe.MAX,l(p){let m=p[1],f=p[1];return Jm.test(f)||(f="mailto:"+f),{v:[{v:m.replace("mailto:",""),type:"text"}],B:f,type:"link"}}},orderedList:cs(r,1),unorderedList:cs(r,2),newlineCoalescer:{t:ot(rg),i:oe.LOW,l:Wr,h:()=>`
`},paragraph:{t:qg,i:oe.LOW,l:qr,h:(p,m,f)=>r("p",{key:f.k},m(p.v,f))},ref:{t:ft(gg),i:oe.MAX,l:p=>(l[p[1]]={B:p[2],F:p[4]},{}),h:Xr},refImage:{t:ht(bg),i:oe.MAX,l:p=>({D:p[1]||void 0,P:p[2]}),h:(p,m,f)=>r("img",{key:f.k,alt:p.D,src:Ht(l[p.P].B),title:l[p.P].F})},refLink:{t:ft(vg),i:oe.MAX,l:(p,m,f)=>({v:m(p[1],f),Z:m(p[0].replace(yg,"\\$1"),f),P:p[2]}),h:(p,m,f)=>l[p.P]?r("a",{key:f.k,href:Ht(l[p.P].B),title:l[p.P].F},m(p.v,f)):r("span",{key:f.k},m(p.Z,f))},table:{t:ot(rl),i:oe.HIGH,l:Gg,h:(p,m,f)=>r("table",{key:f.k},r("thead",null,r("tr",null,p.L.map(function(g,x){return r("th",{key:x,style:us(p,x)},m(g,f))}))),r("tbody",null,p.A.map(function(g,x){return r("tr",{key:x},g.map(function(j,w){return r("td",{key:w,style:us(p,w)},m(j,f))}))})))},tableSeparator:{t:function(p,m){return m.$?(m._=!0,Eg.exec(p)):null},i:oe.HIGH,l:function(){return{type:"tableSeparator"}},h:()=>" | "},text:{t:gn(Mg),i:oe.MIN,l:p=>({v:p[0].replace(cg,(m,f)=>t.namedCodesToUnicode[f]?t.namedCodesToUnicode[f]:m)}),h:p=>p.v},textBolded:{t:ht(Og),i:oe.MED,l:(p,m,f)=>({v:m(p[2],f)}),h:(p,m,f)=>r("strong",{key:f.k},m(p.v,f))},textEmphasized:{t:ht(Rg),i:oe.LOW,l:(p,m,f)=>({v:m(p[2],f)}),h:(p,m,f)=>r("em",{key:f.k},m(p.v,f))},textEscaped:{t:ht($g),i:oe.HIGH,l:p=>({v:p[1],type:"text"})},textMarked:{t:ht(Pg),i:oe.LOW,l:qr,h:(p,m,f)=>r("mark",{key:f.k},m(p.v,f))},textStrikethroughed:{t:ht(jg),i:oe.LOW,l:qr,h:(p,m,f)=>r("del",{key:f.k},m(p.v,f))}};t.disableParsingRawHTML!==!0&&(c.htmlBlock={t:gn(uo),i:oe.HIGH,l(p,m,f){const[,g]=p[3].match(_g),x=new RegExp(`^${g}`,"gm"),j=p[3].replace(x,""),w=(E=j,zg.some(_=>_.test(E))?Xg:ar);var E;const y=p[1].toLowerCase(),O=Ym.indexOf(y)!==-1;f.N=f.N||y==="a";const N=O?p[3]:w(m,j,f);return f.N=!1,{O:a(p[2]),v:N,G:O,H:O?y:p[1]}},h:(p,m,f)=>r(p.H,Rt({key:f.k},p.O),p.G?p.v:m(p.v,f))},c.htmlSelfClosing={t:gn(fo),i:oe.HIGH,l:p=>({O:a(p[2]||""),H:p[1]}),h:(p,m,f)=>r(p.H,Rt({},p.O,{key:f.k}))});const d=function(p){let m=Object.keys(p);function f(g,x){let j=[],w="";for(;g;){let E=0;for(;E<m.length;){const y=m[E],O=p[y],N=O.t(g,x,w);if(N){const _=N[0];g=g.substring(_.length);const D=O.l(N,f,x);D.type==null&&(D.type=y),j.push(D),w=_;break}E++}}return j}return m.sort(function(g,x){let j=p[g].i,w=p[x].i;return j!==w?j-w:g<x?-1:1}),function(g,x){return f(function(j){return j.replace(og,`
`).replace(ig,"").replace(xg,"    ")}(g),x)}}(c),h=(v=function(p){return function(m,f,g){return p[m.type].h(m,f,g)}}(c),function p(m,f={}){if(Array.isArray(m)){const g=f.k,x=[];let j=!1;for(let w=0;w<m.length;w++){f.k=w;const E=p(m[w],f),y=typeof E=="string";y&&j?x[x.length-1]+=E:E!==null&&x.push(E),j=y}return f.k=g,x}return v(m,p,f)});var v;const b=o(e);return s.length?r("div",null,b,r("footer",{key:"footer"},s.map(function(p){return r("div",{id:t.slugify(p.j),key:p.j},p.j,h(d(p.I,{_:!0})))}))):b}(function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"})(oe||(oe={}));const Jg=e=>{let{children:t,options:n}=e,r=function(o,a){if(o==null)return{};var s,l,c={},d=Object.keys(o);for(l=0;l<d.length;l++)a.indexOf(s=d[l])>=0||(c[s]=o[s]);return c}(e,Xm);return S.cloneElement(Kg(t,n),r)};function Zg({markdown:e}){return u.jsx("div",{className:"pr-prose",children:u.jsx(Jg,{children:e})})}const Qg=(e,t)=>{T.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Kr=()=>!1,eb=(e,t)=>{const[n]=hr(T.useCallback(async()=>{if(!e)return Kr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Kr,{preserveValue:!1});T.useEffect(()=>()=>{n!==Kr&&n()},[n])},ml=T.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:H("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));ml.displayName="Card";const gl=T.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:H("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));gl.displayName="CardHeader";const bl=T.forwardRef(({className:e,...t},n)=>u.jsx("h3",{ref:n,className:H("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));bl.displayName="CardTitle";const vl=T.forwardRef(({className:e,...t},n)=>u.jsx("p",{ref:n,className:H("pr-text-sm pr-text-muted-foreground",e),...t}));vl.displayName="CardDescription";const yl=T.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:H("pr-p-6 pr-pt-0",e),...t}));yl.displayName="CardContent";const wl=T.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:H("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));wl.displayName="CardFooter";const tb=ho.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),xl=T.forwardRef(({className:e,variant:t,...n},r)=>u.jsx("div",{ref:r,role:"alert",className:H(tb({variant:t}),e),...n}));xl.displayName="Alert";const El=T.forwardRef(({className:e,...t},n)=>u.jsxs("h5",{ref:n,className:H("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));El.displayName="AlertTitle";const kl=T.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:H("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));kl.displayName="AlertDescription";const Tl=T.forwardRef(({className:e,...t},n)=>u.jsxs(vn.Root,{ref:n,className:H("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[u.jsx(vn.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:u.jsx(vn.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),u.jsx(vn.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));Tl.displayName=vn.Root.displayName;const Sl=T.forwardRef(({className:e,...t},n)=>u.jsx(Zr.Root,{className:H("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:n,children:u.jsx(Zr.Thumb,{className:H("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));Sl.displayName=Zr.Root.displayName;exports.Alert=xl;exports.AlertDescription=kl;exports.AlertTitle=El;exports.BookChapterControl=wc;exports.Button=Ee;exports.Card=ml;exports.CardContent=yl;exports.CardDescription=vl;exports.CardFooter=wl;exports.CardHeader=gl;exports.CardTitle=bl;exports.ChapterRangeSelector=kc;exports.CharacterInventory=Hm;exports.Checkbox=Ms;exports.Checklist=Tc;exports.ComboBox=Qr;exports.ContextMenu=xm;exports.DataTable=$s;exports.DownloadButton=Gm;exports.DropdownMenu=vo;exports.DropdownMenuCheckboxItem=wo;exports.DropdownMenuContent=mr;exports.DropdownMenuGroup=ac;exports.DropdownMenuItem=yo;exports.DropdownMenuLabel=In;exports.DropdownMenuPortal=sc;exports.DropdownMenuRadioGroup=lc;exports.DropdownMenuRadioItem=Ts;exports.DropdownMenuSeparator=gr;exports.DropdownMenuShortcut=Ss;exports.DropdownMenuSub=ic;exports.DropdownMenuSubContent=ks;exports.DropdownMenuSubTrigger=Es;exports.DropdownMenuTrigger=xs;exports.GridMenu=Ri;exports.HamburgerMenuButton=Fi;exports.IconButton=Tm;exports.Input=_n;exports.Label=Go;exports.LabelPosition=Ct;exports.MarkdownRenderer=Zg;exports.MenuItem=Uo;exports.RemoveButton=qm;exports.ScriptureResultsViewer=jm;exports.SearchBar=Mm;exports.Select=Cn;exports.SelectContent=Yt;exports.SelectGroup=Rs;exports.SelectItem=Xe;exports.SelectLabel=Ps;exports.SelectScrollDownButton=Eo;exports.SelectScrollUpButton=xo;exports.SelectSeparator=js;exports.SelectTrigger=Xt;exports.SelectValue=On;exports.ShadCnSlider=Tl;exports.ShadCnSwitch=Sl;exports.Slider=Im;exports.Snackbar=_m;exports.Switch=Am;exports.Table=An;exports.TableBody=Bn;exports.TableCaption=Cs;exports.TableCell=$t;exports.TableFooter=Ns;exports.TableHead=Wt;exports.TableHeader=Dn;exports.TableRow=at;exports.Tabs=Bm;exports.TabsContent=qi;exports.TabsList=Hi;exports.TabsTrigger=Gi;exports.TextField=Ui;exports.Toolbar=Dm;exports.UpdateButton=Wm;exports.VerticalTabs=Wi;exports.VerticalTabsContent=Yi;exports.VerticalTabsList=Xi;exports.VerticalTabsTrigger=Lm;exports.buttonVariants=Os;exports.useEvent=Qg;exports.useEventAsync=eb;exports.usePromise=hr;function nb(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}nb(`/*
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
.pr-left-2 {
  left: 0.5rem;
}
.pr-right-3 {
  right: 0.75rem;
}
.pr-right-4 {
  right: 1rem;
}
.pr-top-1\\/2 {
  top: 50%;
}
.pr-top-4 {
  top: 1rem;
}
.pr-z-50 {
  z-index: 50;
}
.pr-col-span-2 {
  grid-column: span 2 / span 2;
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
.pr-h-\\[1\\.2rem\\] {
  height: 1.2rem;
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
.pr-w-8 {
  width: 2rem;
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
.pr-w-\\[350px\\] {
  width: 350px;
}
.pr-w-\\[70px\\] {
  width: 70px;
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
.pr-flex-row {
  flex-direction: row;
}
.pr-flex-col {
  flex-direction: column;
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
.pr-gap-4 {
  gap: 1rem;
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
.pr-rounded-b-none {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
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
.pr-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
}
.pr-border-border {
  border-color: hsl(var(--border));
}
.pr-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
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
.pr-px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.pr-px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
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
.pr-py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
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
.pr-text-5xl {
  font-size: 3rem;
  line-height: 1;
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
.pr-opacity-50 {
  opacity: 0.5;
}
.pr-opacity-60 {
  opacity: 0.6;
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
.pr-transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
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
.hover\\:pr-bg-accent:hover {
  background-color: hsl(var(--accent));
}
.hover\\:pr-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
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
.hover\\:pr-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
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
.pr-peer:disabled ~ .peer-disabled\\:pr-cursor-not-allowed {
  cursor: not-allowed;
}
.pr-peer:disabled ~ .peer-disabled\\:pr-opacity-70 {
  opacity: 0.7;
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
.data-\\[state\\=active\\]\\:pr-text-foreground[data-state=active] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=checked\\]\\:pr-text-primary-foreground[data-state=checked] {
  color: hsl(var(--primary-foreground));
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
@media (min-width: 1024px) {

  .lg\\:pr-flex {
    display: flex;
  }

  .lg\\:pr-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
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
.\\[\\&_p\\]\\:pr-leading-relaxed p {
  line-height: 1.625;
}
.\\[\\&_tr\\:last-child\\]\\:pr-border-0 tr:last-child {
  border-width: 0px;
}
.\\[\\&_tr\\]\\:pr-border-b tr {
  border-bottom-width: 1px;
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
.papi-combo-box {
  background-color: transparent;
}

.papi-combo-box.fullwidth {
  width: 100%;
}

.papi-combo-box.error {
  background-color: #f00;
}

.papi-combo-box.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-combo-box.paratext.bright {
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state="selected"]:hover {
  cursor: default;
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
