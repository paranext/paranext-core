"use strict";var ta=Object.defineProperty;var na=(e,t,n)=>t in e?ta(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var kt=(e,t,n)=>(na(e,typeof t!="symbol"?t+"":t,n),n);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const y=require("react/jsx-runtime"),z=require("react"),we=require("platform-bible-utils"),ra=require("@radix-ui/react-dropdown-menu"),gt=require("lucide-react"),Ee=require("clsx"),oa=require("tailwind-merge"),pe=require("@mui/material"),kr=require("@mui/styled-engine"),en=require("react-dom"),rt=require("@tanstack/react-table"),ko=require("react-data-grid");function Ar(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const T=Ar(z),be=Ar(ra),ia=Ar(en);var sa=Object.defineProperty,aa=(e,t,n)=>t in e?sa(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ne=(e,t,n)=>(aa(e,typeof t!="symbol"?t+"":t,n),n);const vt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Dr=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Ti=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Oo=ba();function Vt(e,t=!0){return t&&(e=e.toUpperCase()),e in Oo?Oo[e]:0}function Br(e){return Vt(e)>0}function la(e){const t=typeof e=="string"?Vt(e):e;return t>=40&&t<=66}function ca(e){return(typeof e=="string"?Vt(e):e)<=39}function ki(e){return e<=66}function ua(e){const t=typeof e=="string"?Vt(e):e;return Ci(t)&&!ki(t)}function*da(){for(let e=1;e<=vt.length;e++)yield e}const pa=1,Oi=vt.length;function fa(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Lr(e,t="***"){const n=e-1;return n<0||n>=vt.length?t:vt[n]}function Si(e){return e<=0||e>Oi?"******":Ti[e-1]}function ma(e){return Si(Vt(e))}function Ci(e){const t=typeof e=="number"?Lr(e):e;return Br(t)&&!Dr.includes(t)}function ha(e){const t=typeof e=="number"?Lr(e):e;return Br(t)&&Dr.includes(t)}function ga(e){return Ti[e-1].includes("*obsolete*")}function ba(){const e={};for(let t=0;t<vt.length;t++)e[vt[t]]=t+1;return e}const se={allBookIds:vt,nonCanonicalIds:Dr,bookIdToNumber:Vt,isBookIdValid:Br,isBookNT:la,isBookOT:ca,isBookOTNT:ki,isBookDC:ua,allBookNumbers:da,firstBook:pa,lastBook:Oi,extraBooks:fa,bookNumberToId:Lr,bookNumberToEnglishName:Si,bookIdToEnglishName:ma,isCanonical:Ci,isExtraMaterial:ha,isObsolete:ga};var ot=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(ot||{});const Me=class{constructor(t){if(ne(this,"name"),ne(this,"fullPath"),ne(this,"isPresent"),ne(this,"hasVerseSegments"),ne(this,"isCustomized"),ne(this,"baseVersification"),ne(this,"scriptureBooks"),ne(this,"_type"),t!=null)typeof t=="string"?this.name=t:this._type=t;else throw new Error("Argument null")}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ne(Me,"Original",new Me(ot.Original)),ne(Me,"Septuagint",new Me(ot.Septuagint)),ne(Me,"Vulgate",new Me(ot.Vulgate)),ne(Me,"English",new Me(ot.English)),ne(Me,"RussianProtestant",new Me(ot.RussianProtestant)),ne(Me,"RussianOrthodox",new Me(ot.RussianOrthodox));let $t=Me;function So(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var Pi=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Pi||{});const Ce=class ie{constructor(t,n,r,o){if(ne(this,"firstChapter"),ne(this,"lastChapter"),ne(this,"lastVerse"),ne(this,"hasSegmentsDefined"),ne(this,"text"),ne(this,"BBBCCCVVVS"),ne(this,"longHashCode"),ne(this,"versification"),ne(this,"rtlMark","‏"),ne(this,"_bookNum",0),ne(this,"_chapterNum",0),ne(this,"_verseNum",0),ne(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,a=n!=null&&n instanceof $t?n:void 0;this.setEmpty(a),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof $t?n:void 0;this.setEmpty(i),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ie){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof $t?t:ie.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(t,n=ie.defaultVersification){const r=new ie(n);return r.parse(t),r}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=ie.parse(t),{success:!0,verseRef:n}}catch(r){if(r instanceof Kt)return n=new ie,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ie.bcvMaxValue*ie.bookDigitShifter+(n>=0?n%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(r>=0?r%ie.bcvMaxValue:0)}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>ie.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return se.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=se.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ie.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>se.lastBook)throw new Kt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new $t(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const a=+i[1].trim();this.versification=new $t(ot[a])}catch{throw new Kt("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new Kt("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||se.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(r[1]))throw new Kt("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification):!1}allVerses(t=!1,n=ie.verseRangeSeparators,r=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=So(this._verse,r);for(const a of i.map(l=>So(l,n))){const l=this.clone();l.verse=a[0];const c=l.verseNum;if(o.push(l),a.length>1){const u=this.clone();if(u.verse=a[1],!t)for(let d=c+1;d<u.verseNum;d++){const m=new ie(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(m)}o.push(u)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const a=o.BBBCCCVVV;if(r>a)return 3;if(r===a)return 4;r=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>se.lastBook?2:(se.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=se.bookIdToNumber(t),this.chapter=n,this.verse=r}};ne(Ce,"defaultVersification",$t.English),ne(Ce,"verseRangeSeparator","-"),ne(Ce,"verseSequenceIndicator",","),ne(Ce,"verseRangeSeparators",[Ce.verseRangeSeparator]),ne(Ce,"verseSequenceIndicators",[Ce.verseSequenceIndicator]),ne(Ce,"chapterDigitShifter",1e3),ne(Ce,"bookDigitShifter",Ce.chapterDigitShifter*Ce.chapterDigitShifter),ne(Ce,"bcvMaxValue",Ce.chapterDigitShifter-1),ne(Ce,"ValidStatusType",Pi);class Kt extends Error{}function je(...e){return oa.twMerge(Ee.clsx(e))}const va=be.Root,ya=be.Trigger,xa=T.forwardRef(({className:e,inset:t,children:n,...r},o)=>y.jsxs(be.SubTrigger,{ref:o,className:je("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,y.jsx(gt.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));xa.displayName=be.SubTrigger.displayName;const wa=T.forwardRef(({className:e,...t},n)=>y.jsx(be.SubContent,{ref:n,className:je("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));wa.displayName=be.SubContent.displayName;const Ni=T.forwardRef(({className:e,sideOffset:t=4,...n},r)=>y.jsx(be.Portal,{children:y.jsx(be.Content,{ref:r,sideOffset:t,className:je("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));Ni.displayName=be.Content.displayName;const Ri=T.forwardRef(({className:e,inset:t,...n},r)=>y.jsx(be.Item,{ref:r,className:je("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));Ri.displayName=be.Item.displayName;const Ea=T.forwardRef(({className:e,children:t,checked:n,...r},o)=>y.jsxs(be.CheckboxItem,{ref:o,className:je("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[y.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:y.jsx(be.ItemIndicator,{children:y.jsx(gt.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));Ea.displayName=be.CheckboxItem.displayName;const Ta=T.forwardRef(({className:e,children:t,...n},r)=>y.jsxs(be.RadioItem,{ref:r,className:je("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[y.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:y.jsx(be.ItemIndicator,{children:y.jsx(gt.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));Ta.displayName=be.RadioItem.displayName;const Fr=T.forwardRef(({className:e,inset:t,...n},r)=>y.jsx(be.Label,{ref:r,className:je("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));Fr.displayName=be.Label.displayName;const $i=T.forwardRef(({className:e,...t},n)=>y.jsx(be.Separator,{ref:n,className:je("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));$i.displayName=be.Separator.displayName;const Mi=T.forwardRef(({className:e,type:t,...n},r)=>y.jsx("input",{type:t,className:je("pr-flex pr-h-10 pr-w-full pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));Mi.displayName="Input";const ka=z.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},i)=>y.jsxs("div",{className:"pr-relative",children:[y.jsx(Mi,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:a=>e(a.target.value),onKeyDown:a=>{a.key==="Enter"&&r(),t(a)},onClick:n,ref:i}),y.jsx(gt.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function Oa({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const i=Array.from({length:t},(l,c)=>c+1),a=z.useCallback(l=>{o(l)},[o]);return y.jsx("div",{className:je("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:i.map(l=>y.jsx("div",{className:je("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===n,"pr-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>a(l),children:l},l))})}const Sa=z.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:i,children:a},l)=>y.jsxs(Ri,{ref:l,textValue:e,className:je("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[y.jsx("span",{className:je("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":i.toLowerCase()==="ot","pr-border-l-purple-200":i.toLowerCase()==="nt","pr-border-l-indigo-200":i.toLowerCase()==="dc"}),children:se.bookIdToEnglishName(e)}),n&&y.jsx("div",{children:a})]},e));function Ca({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return y.jsxs(Fr,{className:"pr-flex pr-justify-between",children:[y.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),y.jsxs("div",{className:"pr-flex pr-items-center",children:[y.jsx(gt.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),y.jsx(gt.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),y.jsx(gt.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const on=se.allBookIds,Pa={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},Co=["OT","NT","DC"],Na=32+32+32,Ra=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],$a=e=>({OT:on.filter(n=>se.isBookOT(n)),NT:on.filter(n=>se.isBookNT(n)),DC:on.filter(n=>se.isBookDC(n))})[e],Xt=e=>we.getChaptersForBook(se.bookIdToNumber(e));function Ma(){return on.map(t=>se.bookIdToEnglishName(t))}function Ia(e){return Ma().includes(e)}function ja(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(Ia(t))return on.find(r=>se.bookIdToEnglishName(r)===t)}function _a({scrRef:e,handleSubmit:t}){const[n,r]=z.useState(""),[o,i]=z.useState(se.bookNumberToId(e.bookNum)),[a,l]=z.useState(e.chapterNum??0),[c,u]=z.useState(se.bookNumberToId(e.bookNum)),[d,m]=z.useState(!1),[f,b]=z.useState(d),v=z.useRef(void 0),g=z.useRef(void 0),h=z.useRef(void 0),E=z.useCallback(C=>$a(C).filter(R=>{const $=se.bookIdToEnglishName(R).toLowerCase(),F=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return $.includes(F)||R.toLowerCase().includes(F)}),[n]),I=C=>{r(C)},w=z.useRef(!1),x=z.useCallback(C=>{if(w.current){w.current=!1;return}m(C)},[]),p=z.useCallback((C,R,$,F)=>{if(l(se.bookNumberToId(e.bookNum)!==C?1:e.chapterNum),R||Xt(C)===-1){t({bookNum:se.bookIdToNumber(C),chapterNum:$||1,verseNum:F||1}),m(!1),r("");return}i(o!==C?C:""),m(!R)},[t,e.bookNum,e.chapterNum,o]),S=C=>{C<=0||C>Xt(o)||p(o,!0,C)},P=z.useCallback(()=>{Ra.forEach(C=>{const R=n.match(C);if(R){const[$,F=void 0,A=void 0]=R.slice(1),M=ja($);(se.isBookIdValid($)||M)&&p(M??$,!0,F?parseInt(F,10):1,A?parseInt(A,10):1)}})},[p,n]),B=z.useCallback(C=>{d?(C.key==="ArrowDown"||C.key==="ArrowUp")&&(typeof h<"u"&&h.current!==null?h.current.focus():typeof g<"u"&&g.current!==null&&g.current.focus(),C.preventDefault()):m(!0)},[d]),L=C=>{const{key:R}=C;R==="ArrowRight"||R==="ArrowLeft"||R==="ArrowDown"||R==="ArrowUp"||R==="Enter"||(v.current.dispatchEvent(new KeyboardEvent("keydown",{key:R})),v.current.focus())},D=C=>{const{key:R}=C;if(c===o){if(R==="Enter"){C.preventDefault(),p(o,!0,a);return}let $=0;if(R==="ArrowRight")if(a<Xt(c))$=1;else{C.preventDefault();return}else if(R==="ArrowLeft")if(a>1)$=-1;else{C.preventDefault();return}else R==="ArrowDown"?$=6:R==="ArrowUp"&&($=-6);a+$<=0||a+$>Xt(c)?l(0):$!==0&&(l(a+$),C.preventDefault())}};return z.useEffect(()=>{o===c?o===se.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),z.useLayoutEffect(()=>{b(d)},[d]),z.useLayoutEffect(()=>{const C=setTimeout(()=>{if(f&&g.current&&h.current){const $=h.current.offsetTop-Na;g.current.scrollTo({top:$,behavior:"instant"})}},10);return()=>{clearTimeout(C)}},[f]),y.jsx("div",{children:y.jsxs(va,{modal:!1,open:d,onOpenChange:x,children:[y.jsx(ya,{asChild:!0,children:y.jsx(ka,{ref:v,value:n,handleSearch:I,handleKeyDown:B,handleOnClick:()=>{i(se.bookNumberToId(e.bookNum)),u(se.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),m(!0),v.current.focus()},onFocus:()=>{w.current=!0},handleSubmit:P,placeholder:`${se.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),y.jsxs(Ni,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:L,align:"start",ref:g,children:[y.jsx(Ca,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),Co.map((C,R)=>E(C).length>0&&y.jsxs("div",{children:[y.jsx(Fr,{className:"pr-font-semibold pr-text-slate-700",children:Pa[C]}),E(C).map($=>y.jsx("div",{children:y.jsx(Sa,{bookId:$,handleSelectBook:()=>p($,!1),isSelected:o===$,handleHighlightBook:()=>u($),handleKeyDown:D,bookType:C,ref:F=>{o===$&&(h.current=F)},children:y.jsx(Oa,{handleSelectChapter:S,endChapter:Xt($),activeChapter:e.bookNum===se.bookIdToNumber($)?e.chapterNum:0,highlightedChapter:a,handleHighlightedChapter:F=>{l(F)}})})},$)),Co.length-1!==R?y.jsx($i,{}):void 0]},C))]})]})})}function dt({id:e,isDisabled:t=!1,className:n,onClick:r,onContextMenu:o,children:i}){return y.jsx(pe.Button,{id:e,disabled:t,className:`papi-button ${n??""}`,onClick:r,onContextMenu:o,children:i})}function An({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:a,options:l=[],className:c,value:u,onChange:d,onFocus:m,onBlur:f,getOptionLabel:b}){return y.jsx(pe.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:i,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:u,onChange:d,onFocus:m,onBlur:f,getOptionLabel:b,renderInput:v=>y.jsx(pe.TextField,{...v,error:o,fullWidth:i,disabled:n,label:t,style:{width:a}})})}function Aa({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o,chapterCount:i}){const a=z.useMemo(()=>Array.from({length:i},(u,d)=>d+1),[i]),l=(u,d)=>{n(d),d>t&&r(d)},c=(u,d)=>{r(d),d<e&&n(d)};return y.jsxs(y.Fragment,{children:[y.jsx(pe.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:y.jsx(An,{onChange:(u,d)=>l(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),y.jsx(pe.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:y.jsx(An,{onChange:(u,d)=>c(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:t,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var mt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(mt||{});function Ii({id:e,isChecked:t,labelText:n="",labelPosition:r=mt.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:a=!1,hasError:l=!1,className:c,onChange:u}){const d=y.jsx(pe.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:a,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:u});let m;if(n){const f=r===mt.Before||r===mt.Above,b=y.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),v=r===mt.Before||r===mt.After,g=v?b:y.jsx("div",{children:b}),h=v?d:y.jsx("div",{children:d});m=y.jsxs(pe.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:a,error:l,children:[f&&g,h,!f&&g]})}else m=d;return m}function de(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},k.apply(this,arguments)}function Da(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Ba(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Or={exports:{}},Sn={exports:{}},ae={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Po;function La(){if(Po)return ae;Po=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,m=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,E=e?Symbol.for("react.responder"):60118,I=e?Symbol.for("react.scope"):60119;function w(p){if(typeof p=="object"&&p!==null){var S=p.$$typeof;switch(S){case t:switch(p=p.type,p){case c:case u:case r:case i:case o:case m:return p;default:switch(p=p&&p.$$typeof,p){case l:case d:case v:case b:case a:return p;default:return S}}case n:return S}}}function x(p){return w(p)===u}return ae.AsyncMode=c,ae.ConcurrentMode=u,ae.ContextConsumer=l,ae.ContextProvider=a,ae.Element=t,ae.ForwardRef=d,ae.Fragment=r,ae.Lazy=v,ae.Memo=b,ae.Portal=n,ae.Profiler=i,ae.StrictMode=o,ae.Suspense=m,ae.isAsyncMode=function(p){return x(p)||w(p)===c},ae.isConcurrentMode=x,ae.isContextConsumer=function(p){return w(p)===l},ae.isContextProvider=function(p){return w(p)===a},ae.isElement=function(p){return typeof p=="object"&&p!==null&&p.$$typeof===t},ae.isForwardRef=function(p){return w(p)===d},ae.isFragment=function(p){return w(p)===r},ae.isLazy=function(p){return w(p)===v},ae.isMemo=function(p){return w(p)===b},ae.isPortal=function(p){return w(p)===n},ae.isProfiler=function(p){return w(p)===i},ae.isStrictMode=function(p){return w(p)===o},ae.isSuspense=function(p){return w(p)===m},ae.isValidElementType=function(p){return typeof p=="string"||typeof p=="function"||p===r||p===u||p===i||p===o||p===m||p===f||typeof p=="object"&&p!==null&&(p.$$typeof===v||p.$$typeof===b||p.$$typeof===a||p.$$typeof===l||p.$$typeof===d||p.$$typeof===h||p.$$typeof===E||p.$$typeof===I||p.$$typeof===g)},ae.typeOf=w,ae}var le={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var No;function Fa(){return No||(No=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,m=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,E=e?Symbol.for("react.responder"):60118,I=e?Symbol.for("react.scope"):60119;function w(j){return typeof j=="string"||typeof j=="function"||j===r||j===u||j===i||j===o||j===m||j===f||typeof j=="object"&&j!==null&&(j.$$typeof===v||j.$$typeof===b||j.$$typeof===a||j.$$typeof===l||j.$$typeof===d||j.$$typeof===h||j.$$typeof===E||j.$$typeof===I||j.$$typeof===g)}function x(j){if(typeof j=="object"&&j!==null){var Z=j.$$typeof;switch(Z){case t:var N=j.type;switch(N){case c:case u:case r:case i:case o:case m:return N;default:var oe=N&&N.$$typeof;switch(oe){case l:case d:case v:case b:case a:return oe;default:return Z}}case n:return Z}}}var p=c,S=u,P=l,B=a,L=t,D=d,C=r,R=v,$=b,F=n,A=i,M=o,V=m,ee=!1;function Q(j){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),O(j)||x(j)===c}function O(j){return x(j)===u}function _(j){return x(j)===l}function H(j){return x(j)===a}function X(j){return typeof j=="object"&&j!==null&&j.$$typeof===t}function U(j){return x(j)===d}function q(j){return x(j)===r}function G(j){return x(j)===v}function K(j){return x(j)===b}function W(j){return x(j)===n}function Y(j){return x(j)===i}function J(j){return x(j)===o}function re(j){return x(j)===m}le.AsyncMode=p,le.ConcurrentMode=S,le.ContextConsumer=P,le.ContextProvider=B,le.Element=L,le.ForwardRef=D,le.Fragment=C,le.Lazy=R,le.Memo=$,le.Portal=F,le.Profiler=A,le.StrictMode=M,le.Suspense=V,le.isAsyncMode=Q,le.isConcurrentMode=O,le.isContextConsumer=_,le.isContextProvider=H,le.isElement=X,le.isForwardRef=U,le.isFragment=q,le.isLazy=G,le.isMemo=K,le.isPortal=W,le.isProfiler=Y,le.isStrictMode=J,le.isSuspense=re,le.isValidElementType=w,le.typeOf=x}()),le}var Ro;function ji(){return Ro||(Ro=1,process.env.NODE_ENV==="production"?Sn.exports=La():Sn.exports=Fa()),Sn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var cr,$o;function Va(){if($o)return cr;$o=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var a={},l=0;l<10;l++)a["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(a).map(function(d){return a[d]});if(c.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(d){u[d]=d}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return cr=o()?Object.assign:function(i,a){for(var l,c=r(i),u,d=1;d<arguments.length;d++){l=Object(arguments[d]);for(var m in l)t.call(l,m)&&(c[m]=l[m]);if(e){u=e(l);for(var f=0;f<u.length;f++)n.call(l,u[f])&&(c[u[f]]=l[u[f]])}}return c},cr}var ur,Mo;function Vr(){if(Mo)return ur;Mo=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return ur=e,ur}var dr,Io;function _i(){return Io||(Io=1,dr=Function.call.bind(Object.prototype.hasOwnProperty)),dr}var pr,jo;function za(){if(jo)return pr;jo=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Vr(),n={},r=_i();e=function(i){var a="Warning: "+i;typeof console<"u"&&console.error(a);try{throw new Error(a)}catch{}}}function o(i,a,l,c,u){if(process.env.NODE_ENV!=="production"){for(var d in i)if(r(i,d)){var m;try{if(typeof i[d]!="function"){var f=Error((c||"React class")+": "+l+" type `"+d+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[d]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw f.name="Invariant Violation",f}m=i[d](a,d,c,l,null,t)}catch(v){m=v}if(m&&!(m instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+d+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof m+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),m instanceof Error&&!(m.message in n)){n[m.message]=!0;var b=u?u():"";e("Failed "+l+" type: "+m.message+(b??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},pr=o,pr}var fr,_o;function Ua(){if(_o)return fr;_o=1;var e=ji(),t=Va(),n=Vr(),r=_i(),o=za(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function a(){return null}return fr=function(l,c){var u=typeof Symbol=="function"&&Symbol.iterator,d="@@iterator";function m(O){var _=O&&(u&&O[u]||O[d]);if(typeof _=="function")return _}var f="<<anonymous>>",b={array:E("array"),bigint:E("bigint"),bool:E("boolean"),func:E("function"),number:E("number"),object:E("object"),string:E("string"),symbol:E("symbol"),any:I(),arrayOf:w,element:x(),elementType:p(),instanceOf:S,node:D(),objectOf:B,oneOf:P,oneOfType:L,shape:R,exact:$};function v(O,_){return O===_?O!==0||1/O===1/_:O!==O&&_!==_}function g(O,_){this.message=O,this.data=_&&typeof _=="object"?_:{},this.stack=""}g.prototype=Error.prototype;function h(O){if(process.env.NODE_ENV!=="production")var _={},H=0;function X(q,G,K,W,Y,J,re){if(W=W||f,J=J||K,re!==n){if(c){var j=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw j.name="Invariant Violation",j}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var Z=W+":"+K;!_[Z]&&H<3&&(i("You are manually calling a React.PropTypes validation function for the `"+J+"` prop on `"+W+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),_[Z]=!0,H++)}}return G[K]==null?q?G[K]===null?new g("The "+Y+" `"+J+"` is marked as required "+("in `"+W+"`, but its value is `null`.")):new g("The "+Y+" `"+J+"` is marked as required in "+("`"+W+"`, but its value is `undefined`.")):null:O(G,K,W,Y,J)}var U=X.bind(null,!1);return U.isRequired=X.bind(null,!0),U}function E(O){function _(H,X,U,q,G,K){var W=H[X],Y=M(W);if(Y!==O){var J=V(W);return new g("Invalid "+q+" `"+G+"` of type "+("`"+J+"` supplied to `"+U+"`, expected ")+("`"+O+"`."),{expectedType:O})}return null}return h(_)}function I(){return h(a)}function w(O){function _(H,X,U,q,G){if(typeof O!="function")return new g("Property `"+G+"` of component `"+U+"` has invalid PropType notation inside arrayOf.");var K=H[X];if(!Array.isArray(K)){var W=M(K);return new g("Invalid "+q+" `"+G+"` of type "+("`"+W+"` supplied to `"+U+"`, expected an array."))}for(var Y=0;Y<K.length;Y++){var J=O(K,Y,U,q,G+"["+Y+"]",n);if(J instanceof Error)return J}return null}return h(_)}function x(){function O(_,H,X,U,q){var G=_[H];if(!l(G)){var K=M(G);return new g("Invalid "+U+" `"+q+"` of type "+("`"+K+"` supplied to `"+X+"`, expected a single ReactElement."))}return null}return h(O)}function p(){function O(_,H,X,U,q){var G=_[H];if(!e.isValidElementType(G)){var K=M(G);return new g("Invalid "+U+" `"+q+"` of type "+("`"+K+"` supplied to `"+X+"`, expected a single ReactElement type."))}return null}return h(O)}function S(O){function _(H,X,U,q,G){if(!(H[X]instanceof O)){var K=O.name||f,W=Q(H[X]);return new g("Invalid "+q+" `"+G+"` of type "+("`"+W+"` supplied to `"+U+"`, expected ")+("instance of `"+K+"`."))}return null}return h(_)}function P(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),a;function _(H,X,U,q,G){for(var K=H[X],W=0;W<O.length;W++)if(v(K,O[W]))return null;var Y=JSON.stringify(O,function(re,j){var Z=V(j);return Z==="symbol"?String(j):j});return new g("Invalid "+q+" `"+G+"` of value `"+String(K)+"` "+("supplied to `"+U+"`, expected one of "+Y+"."))}return h(_)}function B(O){function _(H,X,U,q,G){if(typeof O!="function")return new g("Property `"+G+"` of component `"+U+"` has invalid PropType notation inside objectOf.");var K=H[X],W=M(K);if(W!=="object")return new g("Invalid "+q+" `"+G+"` of type "+("`"+W+"` supplied to `"+U+"`, expected an object."));for(var Y in K)if(r(K,Y)){var J=O(K,Y,U,q,G+"."+Y,n);if(J instanceof Error)return J}return null}return h(_)}function L(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),a;for(var _=0;_<O.length;_++){var H=O[_];if(typeof H!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ee(H)+" at index "+_+"."),a}function X(U,q,G,K,W){for(var Y=[],J=0;J<O.length;J++){var re=O[J],j=re(U,q,G,K,W,n);if(j==null)return null;j.data&&r(j.data,"expectedType")&&Y.push(j.data.expectedType)}var Z=Y.length>0?", expected one of type ["+Y.join(", ")+"]":"";return new g("Invalid "+K+" `"+W+"` supplied to "+("`"+G+"`"+Z+"."))}return h(X)}function D(){function O(_,H,X,U,q){return F(_[H])?null:new g("Invalid "+U+" `"+q+"` supplied to "+("`"+X+"`, expected a ReactNode."))}return h(O)}function C(O,_,H,X,U){return new g((O||"React class")+": "+_+" type `"+H+"."+X+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+U+"`.")}function R(O){function _(H,X,U,q,G){var K=H[X],W=M(K);if(W!=="object")return new g("Invalid "+q+" `"+G+"` of type `"+W+"` "+("supplied to `"+U+"`, expected `object`."));for(var Y in O){var J=O[Y];if(typeof J!="function")return C(U,q,G,Y,V(J));var re=J(K,Y,U,q,G+"."+Y,n);if(re)return re}return null}return h(_)}function $(O){function _(H,X,U,q,G){var K=H[X],W=M(K);if(W!=="object")return new g("Invalid "+q+" `"+G+"` of type `"+W+"` "+("supplied to `"+U+"`, expected `object`."));var Y=t({},H[X],O);for(var J in Y){var re=O[J];if(r(O,J)&&typeof re!="function")return C(U,q,G,J,V(re));if(!re)return new g("Invalid "+q+" `"+G+"` key `"+J+"` supplied to `"+U+"`.\nBad object: "+JSON.stringify(H[X],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(O),null,"  "));var j=re(K,J,U,q,G+"."+J,n);if(j)return j}return null}return h(_)}function F(O){switch(typeof O){case"number":case"string":case"undefined":return!0;case"boolean":return!O;case"object":if(Array.isArray(O))return O.every(F);if(O===null||l(O))return!0;var _=m(O);if(_){var H=_.call(O),X;if(_!==O.entries){for(;!(X=H.next()).done;)if(!F(X.value))return!1}else for(;!(X=H.next()).done;){var U=X.value;if(U&&!F(U[1]))return!1}}else return!1;return!0;default:return!1}}function A(O,_){return O==="symbol"?!0:_?_["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&_ instanceof Symbol:!1}function M(O){var _=typeof O;return Array.isArray(O)?"array":O instanceof RegExp?"object":A(_,O)?"symbol":_}function V(O){if(typeof O>"u"||O===null)return""+O;var _=M(O);if(_==="object"){if(O instanceof Date)return"date";if(O instanceof RegExp)return"regexp"}return _}function ee(O){var _=V(O);switch(_){case"array":case"object":return"an "+_;case"boolean":case"date":case"regexp":return"a "+_;default:return _}}function Q(O){return!O.constructor||!O.constructor.name?f:O.constructor.name}return b.checkPropTypes=o,b.resetWarningCache=o.resetWarningCache,b.PropTypes=b,b},fr}var mr,Ao;function Ha(){if(Ao)return mr;Ao=1;var e=Vr();function t(){}function n(){}return n.resetWarningCache=t,mr=function(){function r(a,l,c,u,d,m){if(m!==e){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},mr}if(process.env.NODE_ENV!=="production"){var qa=ji(),Wa=!0;Or.exports=Ua()(qa.isElement,Wa)}else Or.exports=Ha()();var Ga=Or.exports;const s=Da(Ga);function zt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function ht(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Ai(e){if(!ht(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Ai(e[n])}),t}function Ye(e,t,n={clone:!0}){const r=n.clone?k({},e):e;return ht(e)&&ht(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(ht(t[o])&&o in e&&ht(e[o])?r[o]=Ye(e[o],t[o],n):n.clone?r[o]=ht(t[o])?Ai(t[o]):t[o]:r[o]=t[o])}),r}function Ka(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Di(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let l;const c=i.type;return typeof c=="function"&&!Ka(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Bi=zt(s.element,Di);Bi.isRequired=zt(s.element.isRequired,Di);const gn=Bi;function Xa(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ya(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let l;return typeof i=="function"&&!Xa(i)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ja=zt(s.elementType,Ya),Za="exact-prop: ​";function Li(e){return process.env.NODE_ENV==="production"?e:k({},e,{[Za]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function _t(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Sr={exports:{}},ce={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Do;function Qa(){if(Do)return ce;Do=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),m=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),v;v=Symbol.for("react.module.reference");function g(h){if(typeof h=="object"&&h!==null){var E=h.$$typeof;switch(E){case e:switch(h=h.type,h){case n:case o:case r:case u:case d:return h;default:switch(h=h&&h.$$typeof,h){case l:case a:case c:case f:case m:case i:return h;default:return E}}case t:return E}}}return ce.ContextConsumer=a,ce.ContextProvider=i,ce.Element=e,ce.ForwardRef=c,ce.Fragment=n,ce.Lazy=f,ce.Memo=m,ce.Portal=t,ce.Profiler=o,ce.StrictMode=r,ce.Suspense=u,ce.SuspenseList=d,ce.isAsyncMode=function(){return!1},ce.isConcurrentMode=function(){return!1},ce.isContextConsumer=function(h){return g(h)===a},ce.isContextProvider=function(h){return g(h)===i},ce.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===e},ce.isForwardRef=function(h){return g(h)===c},ce.isFragment=function(h){return g(h)===n},ce.isLazy=function(h){return g(h)===f},ce.isMemo=function(h){return g(h)===m},ce.isPortal=function(h){return g(h)===t},ce.isProfiler=function(h){return g(h)===o},ce.isStrictMode=function(h){return g(h)===r},ce.isSuspense=function(h){return g(h)===u},ce.isSuspenseList=function(h){return g(h)===d},ce.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===n||h===o||h===r||h===u||h===d||h===b||typeof h=="object"&&h!==null&&(h.$$typeof===f||h.$$typeof===m||h.$$typeof===i||h.$$typeof===a||h.$$typeof===c||h.$$typeof===v||h.getModuleId!==void 0)},ce.typeOf=g,ce}var ue={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Bo;function el(){return Bo||(Bo=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),m=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),v=!1,g=!1,h=!1,E=!1,I=!1,w;w=Symbol.for("react.module.reference");function x(N){return!!(typeof N=="string"||typeof N=="function"||N===n||N===o||I||N===r||N===u||N===d||E||N===b||v||g||h||typeof N=="object"&&N!==null&&(N.$$typeof===f||N.$$typeof===m||N.$$typeof===i||N.$$typeof===a||N.$$typeof===c||N.$$typeof===w||N.getModuleId!==void 0))}function p(N){if(typeof N=="object"&&N!==null){var oe=N.$$typeof;switch(oe){case e:var ye=N.type;switch(ye){case n:case o:case r:case u:case d:return ye;default:var Oe=ye&&ye.$$typeof;switch(Oe){case l:case a:case c:case f:case m:case i:return Oe;default:return oe}}case t:return oe}}}var S=a,P=i,B=e,L=c,D=n,C=f,R=m,$=t,F=o,A=r,M=u,V=d,ee=!1,Q=!1;function O(N){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function _(N){return Q||(Q=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function H(N){return p(N)===a}function X(N){return p(N)===i}function U(N){return typeof N=="object"&&N!==null&&N.$$typeof===e}function q(N){return p(N)===c}function G(N){return p(N)===n}function K(N){return p(N)===f}function W(N){return p(N)===m}function Y(N){return p(N)===t}function J(N){return p(N)===o}function re(N){return p(N)===r}function j(N){return p(N)===u}function Z(N){return p(N)===d}ue.ContextConsumer=S,ue.ContextProvider=P,ue.Element=B,ue.ForwardRef=L,ue.Fragment=D,ue.Lazy=C,ue.Memo=R,ue.Portal=$,ue.Profiler=F,ue.StrictMode=A,ue.Suspense=M,ue.SuspenseList=V,ue.isAsyncMode=O,ue.isConcurrentMode=_,ue.isContextConsumer=H,ue.isContextProvider=X,ue.isElement=U,ue.isForwardRef=q,ue.isFragment=G,ue.isLazy=K,ue.isMemo=W,ue.isPortal=Y,ue.isProfiler=J,ue.isStrictMode=re,ue.isSuspense=j,ue.isSuspenseList=Z,ue.isValidElementType=x,ue.typeOf=p}()),ue}process.env.NODE_ENV==="production"?Sr.exports=Qa():Sr.exports=el();var Dn=Sr.exports;const tl=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function nl(e){const t=`${e}`.match(tl);return t&&t[1]||""}function Fi(e,t=""){return e.displayName||e.name||nl(e)||t}function Lo(e,t,n){const r=Fi(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function rl(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Fi(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Dn.ForwardRef:return Lo(e,e.render,"ForwardRef");case Dn.Memo:return Lo(e,e.type,"memo");default:return}}}function Je(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],a=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const ol=s.oneOfType([s.func,s.object]),zr=ol;function He(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":_t(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Cr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Vi(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function il(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,a)=>{const l=o||"<<anonymous>>",c=a||r;return typeof n[r]<"u"?new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function sl(e,t){var n,r;return T.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Te(e){return e&&e.ownerDocument||document}function At(e){return Te(e).defaultView||window}function al(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?k({},t.propTypes):null;return o=>(i,a,l,c,u,...d)=>{const m=u||a,f=n==null?void 0:n[m];if(f){const b=f(i,a,l,c,u,...d);if(b)return b}return typeof i[a]<"u"&&!i[o]?new Error(`The prop \`${m}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Bn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const ll=typeof window<"u"?T.useLayoutEffect:T.useEffect,yt=ll;let Fo=0;function cl(e){const[t,n]=T.useState(e),r=e||t;return T.useEffect(()=>{t==null&&(Fo+=1,n(`mui-${Fo}`))},[t]),r}const Vo=T["useId".toString()];function zi(e){if(Vo!==void 0){const t=Vo();return e??t}return cl(e)}function ul(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function Ui({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=T.useRef(e!==void 0),[i,a]=T.useState(t),l=o?e:i;if(process.env.NODE_ENV!=="production"){T.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:u}=T.useRef(t);T.useEffect(()=>{!o&&u!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=T.useCallback(u=>{o||a(u)},[]);return[l,c]}function un(e){const t=T.useRef(e);return yt(()=>{t.current=e}),T.useRef((...n)=>(0,t.current)(...n)).current}function Le(...e){return T.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Bn(n,t)})},e)}const zo={};function dl(e,t){const n=T.useRef(zo);return n.current===zo&&(n.current=e(t)),n}const pl=[];function fl(e){T.useEffect(e,pl)}class bn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new bn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function tn(){const e=dl(bn.create).current;return fl(e.disposeEffect),e}let Wn=!0,Pr=!1;const ml=new bn,hl={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function gl(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&hl[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function bl(e){e.metaKey||e.altKey||e.ctrlKey||(Wn=!0)}function hr(){Wn=!1}function vl(){this.visibilityState==="hidden"&&Pr&&(Wn=!0)}function yl(e){e.addEventListener("keydown",bl,!0),e.addEventListener("mousedown",hr,!0),e.addEventListener("pointerdown",hr,!0),e.addEventListener("touchstart",hr,!0),e.addEventListener("visibilitychange",vl,!0)}function xl(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Wn||gl(t)}function Hi(){const e=T.useCallback(o=>{o!=null&&yl(o.ownerDocument)},[]),t=T.useRef(!1);function n(){return t.current?(Pr=!0,ml.start(100,()=>{Pr=!1}),t.current=!1,!0):!1}function r(o){return xl(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function qi(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function wl(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function El(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Tl=Number.isInteger||El;function Wi(e,t,n,r){const o=e[t];if(o==null||!Tl(o)){const i=wl(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function Gi(e,t,...n){return e[t]===void 0?null:Wi(e,t,...n)}function Nr(){return null}Gi.isRequired=Wi;Nr.isRequired=Nr;const Ki=process.env.NODE_ENV==="production"?Nr:Gi;function Xi(e,t){const n=k({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=k({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=k({},i),Object.keys(o).forEach(a=>{n[r][a]=Xi(o[a],i[a])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function et(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,a)=>{if(a){const l=t(a);l!==""&&i.push(l),n&&n[a]&&i.push(n[a])}return i},[]).join(" ")}),r}const Uo=e=>e,kl=()=>{let e=Uo;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Uo}}},Ol=kl(),Yi=Ol,Ji={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function We(e,t,n="Mui"){const r=Ji[t];return r?`${n}-${r}`:`${Yi.generate(e)}-${t}`}function st(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=We(e,o,n)}),r}function Sl(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Zi(e){return typeof e=="string"}function nn(e,t,n){return e===void 0||Zi(e)?t:k({},t,{ownerState:k({},t.ownerState,n)})}const Cl={disableDefaultClasses:!1},Pl=T.createContext(Cl);function Nl(e){const{disableDefaultClasses:t}=T.useContext(Pl);return n=>t?"":e(n)}function Qi(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function Rl(e,t,n){return typeof e=="function"?e(t,n):e}function Ho(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function $l(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const b=Ee(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),v=k({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),g=k({},n,o,r);return b.length>0&&(g.className=b),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:void 0}}const a=Qi(k({},o,r)),l=Ho(r),c=Ho(o),u=t(a),d=Ee(u==null?void 0:u.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),m=k({},u==null?void 0:u.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=k({},u,n,c,l);return d.length>0&&(f.className=d),Object.keys(m).length>0&&(f.style=m),{props:f,internalRef:u.ref}}const Ml=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function xt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,a=de(e,Ml),l=i?{}:Rl(r,o),{props:c,internalRef:u}=$l(k({},a,{externalSlotProps:l})),d=Le(u,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return nn(n,k({},c,{ref:d}),o)}const es="base";function Il(e){return`${es}--${e}`}function jl(e,t){return`${es}-${e}-${t}`}function ts(e,t){const n=Ji[t];return n?Il(n):jl(e,t)}function _l(e,t){const n={};return t.forEach(r=>{n[r]=ts(e,r)}),n}const Al=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Dl(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function Bl(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Ll(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Bl(e))}function Fl(e){const t=[],n=[];return Array.from(e.querySelectorAll(Al)).forEach((r,o)=>{const i=Dl(r);i===-1||!Ll(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function Vl(){return!0}function Ln(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=Fl,isEnabled:a=Vl,open:l}=e,c=T.useRef(!1),u=T.useRef(null),d=T.useRef(null),m=T.useRef(null),f=T.useRef(null),b=T.useRef(!1),v=T.useRef(null),g=Le(t.ref,v),h=T.useRef(null);T.useEffect(()=>{!l||!v.current||(b.current=!n)},[n,l]),T.useEffect(()=>{if(!l||!v.current)return;const w=Te(v.current);return v.current.contains(w.activeElement)||(v.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),v.current.setAttribute("tabIndex","-1")),b.current&&v.current.focus()),()=>{o||(m.current&&m.current.focus&&(c.current=!0,m.current.focus()),m.current=null)}},[l]),T.useEffect(()=>{if(!l||!v.current)return;const w=Te(v.current),x=P=>{h.current=P,!(r||!a()||P.key!=="Tab")&&w.activeElement===v.current&&P.shiftKey&&(c.current=!0,d.current&&d.current.focus())},p=()=>{const P=v.current;if(P===null)return;if(!w.hasFocus()||!a()||c.current){c.current=!1;return}if(P.contains(w.activeElement)||r&&w.activeElement!==u.current&&w.activeElement!==d.current)return;if(w.activeElement!==f.current)f.current=null;else if(f.current!==null)return;if(!b.current)return;let B=[];if((w.activeElement===u.current||w.activeElement===d.current)&&(B=i(v.current)),B.length>0){var L,D;const C=!!((L=h.current)!=null&&L.shiftKey&&((D=h.current)==null?void 0:D.key)==="Tab"),R=B[0],$=B[B.length-1];typeof R!="string"&&typeof $!="string"&&(C?$.focus():R.focus())}else P.focus()};w.addEventListener("focusin",p),w.addEventListener("keydown",x,!0);const S=setInterval(()=>{w.activeElement&&w.activeElement.tagName==="BODY"&&p()},50);return()=>{clearInterval(S),w.removeEventListener("focusin",p),w.removeEventListener("keydown",x,!0)}},[n,r,o,a,l,i]);const E=w=>{m.current===null&&(m.current=w.relatedTarget),b.current=!0,f.current=w.target;const x=t.props.onFocus;x&&x(w)},I=w=>{m.current===null&&(m.current=w.relatedTarget),b.current=!0};return y.jsxs(T.Fragment,{children:[y.jsx("div",{tabIndex:l?0:-1,onFocus:I,ref:u,"data-testid":"sentinelStart"}),T.cloneElement(t,{ref:g,onFocus:E}),y.jsx("div",{tabIndex:l?0:-1,onFocus:I,ref:d,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(Ln.propTypes={children:gn,disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableRestoreFocus:s.bool,getTabbable:s.func,isEnabled:s.func,open:s.bool.isRequired});process.env.NODE_ENV!=="production"&&(Ln["propTypes"]=Li(Ln.propTypes));function zl(e){return typeof e=="function"?e():e}const dn=T.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[a,l]=T.useState(null),c=Le(T.isValidElement(r)?r.ref:null,n);if(yt(()=>{i||l(zl(o)||document.body)},[o,i]),yt(()=>{if(a&&!i)return Bn(n,a),()=>{Bn(n,null)}},[n,a,i]),i){if(T.isValidElement(r)){const u={ref:c};return T.cloneElement(r,u)}return y.jsx(T.Fragment,{children:r})}return y.jsx(T.Fragment,{children:a&&ia.createPortal(r,a)})});process.env.NODE_ENV!=="production"&&(dn.propTypes={children:s.node,container:s.oneOfType([Je,s.func]),disablePortal:s.bool});process.env.NODE_ENV!=="production"&&(dn["propTypes"]=Li(dn.propTypes));function Ul(e){const t=Te(e);return t.body===e?At(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function sn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function qo(e){return parseInt(At(e).getComputedStyle(e).paddingRight,10)||0}function Hl(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Wo(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,a=>{const l=i.indexOf(a)===-1,c=!Hl(a);l&&c&&sn(a,o)})}function gr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function ql(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(Ul(r)){const a=qi(Te(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${qo(r)+a}px`;const l=Te(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${qo(c)+a}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=Te(r).body;else{const a=r.parentElement,l=At(r);i=(a==null?void 0:a.nodeName)==="HTML"&&l.getComputedStyle(a).overflowY==="scroll"?a:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:a,property:l})=>{i?a.style.setProperty(l,i):a.style.removeProperty(l)})}}function Wl(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class Gl{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&sn(t.modalRef,!1);const o=Wl(n);Wo(n,t.mount,t.modalRef,o,!0);const i=gr(this.containers,a=>a.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=gr(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=ql(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=gr(this.containers,a=>a.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&sn(t.modalRef,n),Wo(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const a=i.modals[i.modals.length-1];a.modalRef&&sn(a.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Kl(e){return typeof e=="function"?e():e}function Xl(e){return e?e.props.hasOwnProperty("in"):!1}const Yl=new Gl;function Jl(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Yl,closeAfterTransition:i=!1,onTransitionEnter:a,onTransitionExited:l,children:c,onClose:u,open:d,rootRef:m}=e,f=T.useRef({}),b=T.useRef(null),v=T.useRef(null),g=Le(v,m),[h,E]=T.useState(!d),I=Xl(c);let w=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(w=!1);const x=()=>Te(b.current),p=()=>(f.current.modalRef=v.current,f.current.mount=b.current,f.current),S=()=>{o.mount(p(),{disableScrollLock:r}),v.current&&(v.current.scrollTop=0)},P=un(()=>{const M=Kl(t)||x().body;o.add(p(),M),v.current&&S()}),B=T.useCallback(()=>o.isTopModal(p()),[o]),L=un(M=>{b.current=M,M&&(d&&B()?S():v.current&&sn(v.current,w))}),D=T.useCallback(()=>{o.remove(p(),w)},[w,o]);T.useEffect(()=>()=>{D()},[D]),T.useEffect(()=>{d?P():(!I||!i)&&D()},[d,D,I,i,P]);const C=M=>V=>{var ee;(ee=M.onKeyDown)==null||ee.call(M,V),!(V.key!=="Escape"||V.which===229||!B())&&(n||(V.stopPropagation(),u&&u(V,"escapeKeyDown")))},R=M=>V=>{var ee;(ee=M.onClick)==null||ee.call(M,V),V.target===V.currentTarget&&u&&u(V,"backdropClick")};return{getRootProps:(M={})=>{const V=Qi(e);delete V.onTransitionEnter,delete V.onTransitionExited;const ee=k({},V,M);return k({role:"presentation"},ee,{onKeyDown:C(ee),ref:g})},getBackdropProps:(M={})=>{const V=M;return k({"aria-hidden":!0},V,{onClick:R(V),open:d})},getTransitionProps:()=>{const M=()=>{E(!1),a&&a()},V=()=>{E(!0),l&&l(),i&&D()};return{onEnter:Cr(M,c==null?void 0:c.props.onEnter),onExited:Cr(V,c==null?void 0:c.props.onExited)}},rootRef:g,portalRef:L,isTopModal:B,exited:h,hasTransition:I}}var Pe="top",Fe="bottom",Ve="right",Ne="left",Ur="auto",vn=[Pe,Fe,Ve,Ne],Dt="start",pn="end",Zl="clippingParents",ns="viewport",Yt="popper",Ql="reference",Go=vn.reduce(function(e,t){return e.concat([t+"-"+Dt,t+"-"+pn])},[]),rs=[].concat(vn,[Ur]).reduce(function(e,t){return e.concat([t,t+"-"+Dt,t+"-"+pn])},[]),ec="beforeRead",tc="read",nc="afterRead",rc="beforeMain",oc="main",ic="afterMain",sc="beforeWrite",ac="write",lc="afterWrite",cc=[ec,tc,nc,rc,oc,ic,sc,ac,lc];function qe(e){return e?(e.nodeName||"").toLowerCase():null}function _e(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function wt(e){var t=_e(e).Element;return e instanceof t||e instanceof Element}function Be(e){var t=_e(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Hr(e){if(typeof ShadowRoot>"u")return!1;var t=_e(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function uc(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!Be(i)||!qe(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(a){var l=o[a];l===!1?i.removeAttribute(a):i.setAttribute(a,l===!0?"":l)}))})}function dc(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},a=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=a.reduce(function(c,u){return c[u]="",c},{});!Be(o)||!qe(o)||(Object.assign(o.style,l),Object.keys(i).forEach(function(c){o.removeAttribute(c)}))})}}const pc={name:"applyStyles",enabled:!0,phase:"write",fn:uc,effect:dc,requires:["computeStyles"]};function Ue(e){return e.split("-")[0]}var bt=Math.max,Fn=Math.min,Bt=Math.round;function Rr(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function os(){return!/^((?!chrome|android).)*safari/i.test(Rr())}function Lt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&Be(e)&&(o=e.offsetWidth>0&&Bt(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&Bt(r.height)/e.offsetHeight||1);var a=wt(e)?_e(e):window,l=a.visualViewport,c=!os()&&n,u=(r.left+(c&&l?l.offsetLeft:0))/o,d=(r.top+(c&&l?l.offsetTop:0))/i,m=r.width/o,f=r.height/i;return{width:m,height:f,top:d,right:u+m,bottom:d+f,left:u,x:u,y:d}}function qr(e){var t=Lt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function is(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Hr(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function Ze(e){return _e(e).getComputedStyle(e)}function fc(e){return["table","td","th"].indexOf(qe(e))>=0}function at(e){return((wt(e)?e.ownerDocument:e.document)||window.document).documentElement}function Gn(e){return qe(e)==="html"?e:e.assignedSlot||e.parentNode||(Hr(e)?e.host:null)||at(e)}function Ko(e){return!Be(e)||Ze(e).position==="fixed"?null:e.offsetParent}function mc(e){var t=/firefox/i.test(Rr()),n=/Trident/i.test(Rr());if(n&&Be(e)){var r=Ze(e);if(r.position==="fixed")return null}var o=Gn(e);for(Hr(o)&&(o=o.host);Be(o)&&["html","body"].indexOf(qe(o))<0;){var i=Ze(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function yn(e){for(var t=_e(e),n=Ko(e);n&&fc(n)&&Ze(n).position==="static";)n=Ko(n);return n&&(qe(n)==="html"||qe(n)==="body"&&Ze(n).position==="static")?t:n||mc(e)||t}function Wr(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function an(e,t,n){return bt(e,Fn(t,n))}function hc(e,t,n){var r=an(e,t,n);return r>n?n:r}function ss(){return{top:0,right:0,bottom:0,left:0}}function as(e){return Object.assign({},ss(),e)}function ls(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var gc=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,as(typeof t!="number"?t:ls(t,vn))};function bc(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,l=Ue(n.placement),c=Wr(l),u=[Ne,Ve].indexOf(l)>=0,d=u?"height":"width";if(!(!i||!a)){var m=gc(o.padding,n),f=qr(i),b=c==="y"?Pe:Ne,v=c==="y"?Fe:Ve,g=n.rects.reference[d]+n.rects.reference[c]-a[c]-n.rects.popper[d],h=a[c]-n.rects.reference[c],E=yn(i),I=E?c==="y"?E.clientHeight||0:E.clientWidth||0:0,w=g/2-h/2,x=m[b],p=I-f[d]-m[v],S=I/2-f[d]/2+w,P=an(x,S,p),B=c;n.modifiersData[r]=(t={},t[B]=P,t.centerOffset=P-S,t)}}function vc(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||is(t.elements.popper,o)&&(t.elements.arrow=o))}const yc={name:"arrow",enabled:!0,phase:"main",fn:bc,effect:vc,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Ft(e){return e.split("-")[1]}var xc={top:"auto",right:"auto",bottom:"auto",left:"auto"};function wc(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Bt(n*o)/o||0,y:Bt(r*o)/o||0}}function Xo(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,a=e.offsets,l=e.position,c=e.gpuAcceleration,u=e.adaptive,d=e.roundOffsets,m=e.isFixed,f=a.x,b=f===void 0?0:f,v=a.y,g=v===void 0?0:v,h=typeof d=="function"?d({x:b,y:g}):{x:b,y:g};b=h.x,g=h.y;var E=a.hasOwnProperty("x"),I=a.hasOwnProperty("y"),w=Ne,x=Pe,p=window;if(u){var S=yn(n),P="clientHeight",B="clientWidth";if(S===_e(n)&&(S=at(n),Ze(S).position!=="static"&&l==="absolute"&&(P="scrollHeight",B="scrollWidth")),S=S,o===Pe||(o===Ne||o===Ve)&&i===pn){x=Fe;var L=m&&S===p&&p.visualViewport?p.visualViewport.height:S[P];g-=L-r.height,g*=c?1:-1}if(o===Ne||(o===Pe||o===Fe)&&i===pn){w=Ve;var D=m&&S===p&&p.visualViewport?p.visualViewport.width:S[B];b-=D-r.width,b*=c?1:-1}}var C=Object.assign({position:l},u&&xc),R=d===!0?wc({x:b,y:g},_e(n)):{x:b,y:g};if(b=R.x,g=R.y,c){var $;return Object.assign({},C,($={},$[x]=I?"0":"",$[w]=E?"0":"",$.transform=(p.devicePixelRatio||1)<=1?"translate("+b+"px, "+g+"px)":"translate3d("+b+"px, "+g+"px, 0)",$))}return Object.assign({},C,(t={},t[x]=I?g+"px":"",t[w]=E?b+"px":"",t.transform="",t))}function Ec(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,a=i===void 0?!0:i,l=n.roundOffsets,c=l===void 0?!0:l,u={placement:Ue(t.placement),variation:Ft(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Xo(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Xo(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Tc={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Ec,data:{}};var Cn={passive:!0};function kc(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,a=r.resize,l=a===void 0?!0:a,c=_e(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&u.forEach(function(d){d.addEventListener("scroll",n.update,Cn)}),l&&c.addEventListener("resize",n.update,Cn),function(){i&&u.forEach(function(d){d.removeEventListener("scroll",n.update,Cn)}),l&&c.removeEventListener("resize",n.update,Cn)}}const Oc={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:kc,data:{}};var Sc={left:"right",right:"left",bottom:"top",top:"bottom"};function $n(e){return e.replace(/left|right|bottom|top/g,function(t){return Sc[t]})}var Cc={start:"end",end:"start"};function Yo(e){return e.replace(/start|end/g,function(t){return Cc[t]})}function Gr(e){var t=_e(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Kr(e){return Lt(at(e)).left+Gr(e).scrollLeft}function Pc(e,t){var n=_e(e),r=at(e),o=n.visualViewport,i=r.clientWidth,a=r.clientHeight,l=0,c=0;if(o){i=o.width,a=o.height;var u=os();(u||!u&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:i,height:a,x:l+Kr(e),y:c}}function Nc(e){var t,n=at(e),r=Gr(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=bt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=bt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Kr(e),c=-r.scrollTop;return Ze(o||n).direction==="rtl"&&(l+=bt(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:l,y:c}}function Xr(e){var t=Ze(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function cs(e){return["html","body","#document"].indexOf(qe(e))>=0?e.ownerDocument.body:Be(e)&&Xr(e)?e:cs(Gn(e))}function ln(e,t){var n;t===void 0&&(t=[]);var r=cs(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=_e(r),a=o?[i].concat(i.visualViewport||[],Xr(r)?r:[]):r,l=t.concat(a);return o?l:l.concat(ln(Gn(a)))}function $r(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Rc(e,t){var n=Lt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Jo(e,t,n){return t===ns?$r(Pc(e,n)):wt(t)?Rc(t,n):$r(Nc(at(e)))}function $c(e){var t=ln(Gn(e)),n=["absolute","fixed"].indexOf(Ze(e).position)>=0,r=n&&Be(e)?yn(e):e;return wt(r)?t.filter(function(o){return wt(o)&&is(o,r)&&qe(o)!=="body"}):[]}function Mc(e,t,n,r){var o=t==="clippingParents"?$c(e):[].concat(t),i=[].concat(o,[n]),a=i[0],l=i.reduce(function(c,u){var d=Jo(e,u,r);return c.top=bt(d.top,c.top),c.right=Fn(d.right,c.right),c.bottom=Fn(d.bottom,c.bottom),c.left=bt(d.left,c.left),c},Jo(e,a,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function us(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ue(r):null,i=r?Ft(r):null,a=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Pe:c={x:a,y:t.y-n.height};break;case Fe:c={x:a,y:t.y+t.height};break;case Ve:c={x:t.x+t.width,y:l};break;case Ne:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var u=o?Wr(o):null;if(u!=null){var d=u==="y"?"height":"width";switch(i){case Dt:c[u]=c[u]-(t[d]/2-n[d]/2);break;case pn:c[u]=c[u]+(t[d]/2-n[d]/2);break}}return c}function fn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,a=i===void 0?e.strategy:i,l=n.boundary,c=l===void 0?Zl:l,u=n.rootBoundary,d=u===void 0?ns:u,m=n.elementContext,f=m===void 0?Yt:m,b=n.altBoundary,v=b===void 0?!1:b,g=n.padding,h=g===void 0?0:g,E=as(typeof h!="number"?h:ls(h,vn)),I=f===Yt?Ql:Yt,w=e.rects.popper,x=e.elements[v?I:f],p=Mc(wt(x)?x:x.contextElement||at(e.elements.popper),c,d,a),S=Lt(e.elements.reference),P=us({reference:S,element:w,strategy:"absolute",placement:o}),B=$r(Object.assign({},w,P)),L=f===Yt?B:S,D={top:p.top-L.top+E.top,bottom:L.bottom-p.bottom+E.bottom,left:p.left-L.left+E.left,right:L.right-p.right+E.right},C=e.modifiersData.offset;if(f===Yt&&C){var R=C[o];Object.keys(D).forEach(function($){var F=[Ve,Fe].indexOf($)>=0?1:-1,A=[Pe,Fe].indexOf($)>=0?"y":"x";D[$]+=R[A]*F})}return D}function Ic(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,u=c===void 0?rs:c,d=Ft(r),m=d?l?Go:Go.filter(function(v){return Ft(v)===d}):vn,f=m.filter(function(v){return u.indexOf(v)>=0});f.length===0&&(f=m);var b=f.reduce(function(v,g){return v[g]=fn(e,{placement:g,boundary:o,rootBoundary:i,padding:a})[Ue(g)],v},{});return Object.keys(b).sort(function(v,g){return b[v]-b[g]})}function jc(e){if(Ue(e)===Ur)return[];var t=$n(e);return[Yo(e),t,Yo(t)]}function _c(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!0:a,c=n.fallbackPlacements,u=n.padding,d=n.boundary,m=n.rootBoundary,f=n.altBoundary,b=n.flipVariations,v=b===void 0?!0:b,g=n.allowedAutoPlacements,h=t.options.placement,E=Ue(h),I=E===h,w=c||(I||!v?[$n(h)]:jc(h)),x=[h].concat(w).reduce(function(U,q){return U.concat(Ue(q)===Ur?Ic(t,{placement:q,boundary:d,rootBoundary:m,padding:u,flipVariations:v,allowedAutoPlacements:g}):q)},[]),p=t.rects.reference,S=t.rects.popper,P=new Map,B=!0,L=x[0],D=0;D<x.length;D++){var C=x[D],R=Ue(C),$=Ft(C)===Dt,F=[Pe,Fe].indexOf(R)>=0,A=F?"width":"height",M=fn(t,{placement:C,boundary:d,rootBoundary:m,altBoundary:f,padding:u}),V=F?$?Ve:Ne:$?Fe:Pe;p[A]>S[A]&&(V=$n(V));var ee=$n(V),Q=[];if(i&&Q.push(M[R]<=0),l&&Q.push(M[V]<=0,M[ee]<=0),Q.every(function(U){return U})){L=C,B=!1;break}P.set(C,Q)}if(B)for(var O=v?3:1,_=function(q){var G=x.find(function(K){var W=P.get(K);if(W)return W.slice(0,q).every(function(Y){return Y})});if(G)return L=G,"break"},H=O;H>0;H--){var X=_(H);if(X==="break")break}t.placement!==L&&(t.modifiersData[r]._skip=!0,t.placement=L,t.reset=!0)}}const Ac={name:"flip",enabled:!0,phase:"main",fn:_c,requiresIfExists:["offset"],data:{_skip:!1}};function Zo(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Qo(e){return[Pe,Ve,Fe,Ne].some(function(t){return e[t]>=0})}function Dc(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=fn(t,{elementContext:"reference"}),l=fn(t,{altBoundary:!0}),c=Zo(a,r),u=Zo(l,o,i),d=Qo(c),m=Qo(u);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:u,isReferenceHidden:d,hasPopperEscaped:m},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":d,"data-popper-escaped":m})}const Bc={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Dc};function Lc(e,t,n){var r=Ue(e),o=[Ne,Pe].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,a=i[0],l=i[1];return a=a||0,l=(l||0)*o,[Ne,Ve].indexOf(r)>=0?{x:l,y:a}:{x:a,y:l}}function Fc(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,a=rs.reduce(function(d,m){return d[m]=Lc(m,t.rects,i),d},{}),l=a[t.placement],c=l.x,u=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=u),t.modifiersData[r]=a}const Vc={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Fc};function zc(e){var t=e.state,n=e.name;t.modifiersData[n]=us({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Uc={name:"popperOffsets",enabled:!0,phase:"read",fn:zc,data:{}};function Hc(e){return e==="x"?"y":"x"}function qc(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!1:a,c=n.boundary,u=n.rootBoundary,d=n.altBoundary,m=n.padding,f=n.tether,b=f===void 0?!0:f,v=n.tetherOffset,g=v===void 0?0:v,h=fn(t,{boundary:c,rootBoundary:u,padding:m,altBoundary:d}),E=Ue(t.placement),I=Ft(t.placement),w=!I,x=Wr(E),p=Hc(x),S=t.modifiersData.popperOffsets,P=t.rects.reference,B=t.rects.popper,L=typeof g=="function"?g(Object.assign({},t.rects,{placement:t.placement})):g,D=typeof L=="number"?{mainAxis:L,altAxis:L}:Object.assign({mainAxis:0,altAxis:0},L),C=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,R={x:0,y:0};if(S){if(i){var $,F=x==="y"?Pe:Ne,A=x==="y"?Fe:Ve,M=x==="y"?"height":"width",V=S[x],ee=V+h[F],Q=V-h[A],O=b?-B[M]/2:0,_=I===Dt?P[M]:B[M],H=I===Dt?-B[M]:-P[M],X=t.elements.arrow,U=b&&X?qr(X):{width:0,height:0},q=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:ss(),G=q[F],K=q[A],W=an(0,P[M],U[M]),Y=w?P[M]/2-O-W-G-D.mainAxis:_-W-G-D.mainAxis,J=w?-P[M]/2+O+W+K+D.mainAxis:H+W+K+D.mainAxis,re=t.elements.arrow&&yn(t.elements.arrow),j=re?x==="y"?re.clientTop||0:re.clientLeft||0:0,Z=($=C==null?void 0:C[x])!=null?$:0,N=V+Y-Z-j,oe=V+J-Z,ye=an(b?Fn(ee,N):ee,V,b?bt(Q,oe):Q);S[x]=ye,R[x]=ye-V}if(l){var Oe,ge=x==="x"?Pe:Ne,ct=x==="x"?Fe:Ve,Se=S[p],Ge=p==="y"?"height":"width",Re=Se+h[ge],Ke=Se-h[ct],xe=[Pe,Ne].indexOf(E)!==-1,Tt=(Oe=C==null?void 0:C[p])!=null?Oe:0,ut=xe?Re:Se-P[Ge]-B[Ge]-Tt+D.altAxis,Ut=xe?Se+P[Ge]+B[Ge]-Tt-D.altAxis:Ke,Tn=b&&xe?hc(ut,Se,Ut):an(b?ut:Re,Se,b?Ut:Ke);S[p]=Tn,R[p]=Tn-Se}t.modifiersData[r]=R}}const Wc={name:"preventOverflow",enabled:!0,phase:"main",fn:qc,requiresIfExists:["offset"]};function Gc(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Kc(e){return e===_e(e)||!Be(e)?Gr(e):Gc(e)}function Xc(e){var t=e.getBoundingClientRect(),n=Bt(t.width)/e.offsetWidth||1,r=Bt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Yc(e,t,n){n===void 0&&(n=!1);var r=Be(t),o=Be(t)&&Xc(t),i=at(t),a=Lt(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((qe(t)!=="body"||Xr(i))&&(l=Kc(t)),Be(t)?(c=Lt(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):i&&(c.x=Kr(i))),{x:a.left+l.scrollLeft-c.x,y:a.top+l.scrollTop-c.y,width:a.width,height:a.height}}function Jc(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var a=[].concat(i.requires||[],i.requiresIfExists||[]);a.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function Zc(e){var t=Jc(e);return cc.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Qc(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function eu(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var ei={placement:"bottom",modifiers:[],strategy:"absolute"};function ti(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function tu(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?ei:o;return function(l,c,u){u===void 0&&(u=i);var d={placement:"bottom",orderedModifiers:[],options:Object.assign({},ei,i),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},m=[],f=!1,b={state:d,setOptions:function(E){var I=typeof E=="function"?E(d.options):E;g(),d.options=Object.assign({},i,d.options,I),d.scrollParents={reference:wt(l)?ln(l):l.contextElement?ln(l.contextElement):[],popper:ln(c)};var w=Zc(eu([].concat(r,d.options.modifiers)));return d.orderedModifiers=w.filter(function(x){return x.enabled}),v(),b.update()},forceUpdate:function(){if(!f){var E=d.elements,I=E.reference,w=E.popper;if(ti(I,w)){d.rects={reference:Yc(I,yn(w),d.options.strategy==="fixed"),popper:qr(w)},d.reset=!1,d.placement=d.options.placement,d.orderedModifiers.forEach(function(D){return d.modifiersData[D.name]=Object.assign({},D.data)});for(var x=0;x<d.orderedModifiers.length;x++){if(d.reset===!0){d.reset=!1,x=-1;continue}var p=d.orderedModifiers[x],S=p.fn,P=p.options,B=P===void 0?{}:P,L=p.name;typeof S=="function"&&(d=S({state:d,options:B,name:L,instance:b})||d)}}}},update:Qc(function(){return new Promise(function(h){b.forceUpdate(),h(d)})}),destroy:function(){g(),f=!0}};if(!ti(l,c))return b;b.setOptions(u).then(function(h){!f&&u.onFirstUpdate&&u.onFirstUpdate(h)});function v(){d.orderedModifiers.forEach(function(h){var E=h.name,I=h.options,w=I===void 0?{}:I,x=h.effect;if(typeof x=="function"){var p=x({state:d,name:E,instance:b,options:w}),S=function(){};m.push(p||S)}})}function g(){m.forEach(function(h){return h()}),m=[]}return b}}var nu=[Oc,Uc,Tc,pc,Vc,Ac,Wc,yc,Bc],ru=tu({defaultModifiers:nu});const ds="Popper";function ou(e){return ts(ds,e)}_l(ds,["root"]);const iu=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],su=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function au(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function Vn(e){return typeof e=="function"?e():e}function Kn(e){return e.nodeType!==void 0}function lu(e){return!Kn(e)}const cu=()=>et({root:["root"]},Nl(ou)),uu={},du=T.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:a,disablePortal:l,modifiers:c,open:u,placement:d,popperOptions:m,popperRef:f,slotProps:b={},slots:v={},TransitionProps:g}=t,h=de(t,iu),E=T.useRef(null),I=Le(E,n),w=T.useRef(null),x=Le(w,f),p=T.useRef(x);yt(()=>{p.current=x},[x]),T.useImperativeHandle(f,()=>w.current,[]);const S=au(d,a),[P,B]=T.useState(S),[L,D]=T.useState(Vn(o));T.useEffect(()=>{w.current&&w.current.forceUpdate()}),T.useEffect(()=>{o&&D(Vn(o))},[o]),yt(()=>{if(!L||!u)return;const A=ee=>{B(ee.placement)};if(process.env.NODE_ENV!=="production"&&L&&Kn(L)&&L.nodeType===1){const ee=L.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ee.top===0&&ee.left===0&&ee.right===0&&ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let M=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ee})=>{A(ee)}}];c!=null&&(M=M.concat(c)),m&&m.modifiers!=null&&(M=M.concat(m.modifiers));const V=ru(L,E.current,k({placement:S},m,{modifiers:M}));return p.current(V),()=>{V.destroy(),p.current(null)}},[L,l,c,u,m,S]);const C={placement:P};g!==null&&(C.TransitionProps=g);const R=cu(),$=(r=v.root)!=null?r:"div",F=xt({elementType:$,externalSlotProps:b.root,externalForwardedProps:h,additionalProps:{role:"tooltip",ref:I},ownerState:t,className:R.root});return y.jsx($,k({},F,{children:typeof i=="function"?i(C):i}))}),ps=T.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:a="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:u,open:d,placement:m="bottom",popperOptions:f=uu,popperRef:b,style:v,transition:g=!1,slotProps:h={},slots:E={}}=t,I=de(t,su),[w,x]=T.useState(!0),p=()=>{x(!1)},S=()=>{x(!0)};if(!c&&!d&&(!g||w))return null;let P;if(i)P=i;else if(r){const D=Vn(r);P=D&&Kn(D)?Te(D).body:Te(null).body}const B=!d&&c&&(!g||w)?"none":void 0,L=g?{in:d,onEnter:p,onExited:S}:void 0;return y.jsx(dn,{disablePortal:l,container:P,children:y.jsx(du,k({anchorEl:r,direction:a,disablePortal:l,modifiers:u,ref:n,open:g?!w:d,placement:m,popperOptions:f,popperRef:b,slotProps:h,slots:E},I,{style:k({position:"fixed",top:0,left:0,display:B},v),TransitionProps:L,children:o}))})});process.env.NODE_ENV!=="production"&&(ps.propTypes={anchorEl:zt(s.oneOfType([Je,s.object,s.func]),e=>{if(e.open){const t=Vn(e.anchorEl);if(t&&Kn(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||lu(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:s.oneOfType([s.node,s.func]),container:s.oneOfType([Je,s.func]),direction:s.oneOf(["ltr","rtl"]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:zr,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),transition:s.bool});const pu=["values","unit","step"],fu=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>k({},n,{[r.key]:r.val}),{})};function mu(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=de(e,pu),i=fu(t),a=Object.keys(i);function l(f){return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n})`}function c(f){return`@media (max-width:${(typeof t[f]=="number"?t[f]:f)-r/100}${n})`}function u(f,b){const v=a.indexOf(b);return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n}) and (max-width:${(v!==-1&&typeof t[a[v]]=="number"?t[a[v]]:b)-r/100}${n})`}function d(f){return a.indexOf(f)+1<a.length?u(f,a[a.indexOf(f)+1]):l(f)}function m(f){const b=a.indexOf(f);return b===0?l(a[1]):b===a.length-1?c(a[b]):u(f,a[a.indexOf(f)+1]).replace("@media","@media not all and")}return k({keys:a,values:i,up:l,down:c,between:u,only:d,not:m,unit:n},o)}const hu={borderRadius:4},gu=hu,bu=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.string,s.object,s.array]):{},lt=bu;function cn(e,t){return t?Ye(e,t,{clone:!1}):e}const Yr={xs:0,sm:600,md:900,lg:1200,xl:1536},ni={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Yr[e]}px)`};function Qe(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||ni;return t.reduce((a,l,c)=>(a[i.up(i.keys[c])]=n(t[c]),a),{})}if(typeof t=="object"){const i=r.breakpoints||ni;return Object.keys(t).reduce((a,l)=>{if(Object.keys(i.values||Yr).indexOf(l)!==-1){const c=i.up(l);a[c]=n(t[l],l)}else{const c=l;a[c]=t[c]}return a},{})}return n(t)}function vu(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function yu(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Xn(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function zn(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Xn(e,n)||r,t&&(o=t(o,r,e)),o}function ve(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=a=>{if(a[t]==null)return null;const l=a[t],c=a.theme,u=Xn(c,r)||{};return Qe(a,l,m=>{let f=zn(u,o,m);return m===f&&typeof m=="string"&&(f=zn(u,o,`${t}${m==="default"?"":He(m)}`,m)),n===!1?f:{[n]:f}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:lt}:{},i.filterProps=[t],i}function xu(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const wu={m:"margin",p:"padding"},Eu={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},ri={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Tu=xu(e=>{if(e.length>2)if(ri[e])e=ri[e];else return[e];const[t,n]=e.split(""),r=wu[t],o=Eu[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),Yn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Jn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],ku=[...Yn,...Jn];function xn(e,t,n,r){var o;const i=(o=Xn(e,t,!1))!=null?o:n;return typeof i=="number"?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&typeof a!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`),i*a):Array.isArray(i)?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&(Number.isInteger(a)?a>i.length-1&&console.error([`MUI: The value provided (${a}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${a} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[a]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function fs(e){return xn(e,"spacing",8,"spacing")}function wn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Ou(e,t){return n=>e.reduce((r,o)=>(r[o]=wn(t,n),r),{})}function Su(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=Tu(n),i=Ou(o,r),a=e[n];return Qe(e,a,i)}function ms(e,t){const n=fs(e.theme);return Object.keys(e).map(r=>Su(e,t,r,n)).reduce(cn,{})}function me(e){return ms(e,Yn)}me.propTypes=process.env.NODE_ENV!=="production"?Yn.reduce((e,t)=>(e[t]=lt,e),{}):{};me.filterProps=Yn;function he(e){return ms(e,Jn)}he.propTypes=process.env.NODE_ENV!=="production"?Jn.reduce((e,t)=>(e[t]=lt,e),{}):{};he.filterProps=Jn;process.env.NODE_ENV!=="production"&&ku.reduce((e,t)=>(e[t]=lt,e),{});function Cu(e=8){if(e.mui)return e;const t=fs({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const a=t(i);return typeof a=="number"?`${a}px`:a}).join(" "));return n.mui=!0,n}function Zn(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?cn(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function De(e){return typeof e!="number"?e:`${e}px solid`}function ze(e,t){return ve({prop:e,themeKey:"borders",transform:t})}const Pu=ze("border",De),Nu=ze("borderTop",De),Ru=ze("borderRight",De),$u=ze("borderBottom",De),Mu=ze("borderLeft",De),Iu=ze("borderColor"),ju=ze("borderTopColor"),_u=ze("borderRightColor"),Au=ze("borderBottomColor"),Du=ze("borderLeftColor"),Bu=ze("outline",De),Lu=ze("outlineColor"),Qn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=xn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:wn(t,r)});return Qe(e,e.borderRadius,n)}return null};Qn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:lt}:{};Qn.filterProps=["borderRadius"];Zn(Pu,Nu,Ru,$u,Mu,Iu,ju,_u,Au,Du,Qn,Bu,Lu);const er=e=>{if(e.gap!==void 0&&e.gap!==null){const t=xn(e.theme,"spacing",8,"gap"),n=r=>({gap:wn(t,r)});return Qe(e,e.gap,n)}return null};er.propTypes=process.env.NODE_ENV!=="production"?{gap:lt}:{};er.filterProps=["gap"];const tr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=xn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:wn(t,r)});return Qe(e,e.columnGap,n)}return null};tr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:lt}:{};tr.filterProps=["columnGap"];const nr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=xn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:wn(t,r)});return Qe(e,e.rowGap,n)}return null};nr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:lt}:{};nr.filterProps=["rowGap"];const Fu=ve({prop:"gridColumn"}),Vu=ve({prop:"gridRow"}),zu=ve({prop:"gridAutoFlow"}),Uu=ve({prop:"gridAutoColumns"}),Hu=ve({prop:"gridAutoRows"}),qu=ve({prop:"gridTemplateColumns"}),Wu=ve({prop:"gridTemplateRows"}),Gu=ve({prop:"gridTemplateAreas"}),Ku=ve({prop:"gridArea"});Zn(er,tr,nr,Fu,Vu,zu,Uu,Hu,qu,Wu,Gu,Ku);function jt(e,t){return t==="grey"?t:e}const Xu=ve({prop:"color",themeKey:"palette",transform:jt}),Yu=ve({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:jt}),Ju=ve({prop:"backgroundColor",themeKey:"palette",transform:jt});Zn(Xu,Yu,Ju);function Ie(e){return e<=1&&e!==0?`${e*100}%`:e}const Zu=ve({prop:"width",transform:Ie}),Jr=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Yr[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:Ie(n)}};return Qe(e,e.maxWidth,t)}return null};Jr.filterProps=["maxWidth"];const Qu=ve({prop:"minWidth",transform:Ie}),ed=ve({prop:"height",transform:Ie}),td=ve({prop:"maxHeight",transform:Ie}),nd=ve({prop:"minHeight",transform:Ie});ve({prop:"size",cssProperty:"width",transform:Ie});ve({prop:"size",cssProperty:"height",transform:Ie});const rd=ve({prop:"boxSizing"});Zn(Zu,Jr,Qu,ed,td,nd,rd);const od={border:{themeKey:"borders",transform:De},borderTop:{themeKey:"borders",transform:De},borderRight:{themeKey:"borders",transform:De},borderBottom:{themeKey:"borders",transform:De},borderLeft:{themeKey:"borders",transform:De},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:De},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Qn},color:{themeKey:"palette",transform:jt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:jt},backgroundColor:{themeKey:"palette",transform:jt},p:{style:he},pt:{style:he},pr:{style:he},pb:{style:he},pl:{style:he},px:{style:he},py:{style:he},padding:{style:he},paddingTop:{style:he},paddingRight:{style:he},paddingBottom:{style:he},paddingLeft:{style:he},paddingX:{style:he},paddingY:{style:he},paddingInline:{style:he},paddingInlineStart:{style:he},paddingInlineEnd:{style:he},paddingBlock:{style:he},paddingBlockStart:{style:he},paddingBlockEnd:{style:he},m:{style:me},mt:{style:me},mr:{style:me},mb:{style:me},ml:{style:me},mx:{style:me},my:{style:me},margin:{style:me},marginTop:{style:me},marginRight:{style:me},marginBottom:{style:me},marginLeft:{style:me},marginX:{style:me},marginY:{style:me},marginInline:{style:me},marginInlineStart:{style:me},marginInlineEnd:{style:me},marginBlock:{style:me},marginBlockStart:{style:me},marginBlockEnd:{style:me},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:er},rowGap:{style:nr},columnGap:{style:tr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ie},maxWidth:{style:Jr},minWidth:{transform:Ie},height:{transform:Ie},maxHeight:{transform:Ie},minHeight:{transform:Ie},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Zr=od;function id(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function sd(e,t){return typeof e=="function"?e(t):e}function ad(){function e(n,r,o,i){const a={[n]:r,theme:o},l=i[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:u,transform:d,style:m}=l;if(r==null)return null;if(u==="typography"&&r==="inherit")return{[n]:r};const f=Xn(o,u)||{};return m?m(a):Qe(a,r,v=>{let g=zn(f,d,v);return v===g&&typeof v=="string"&&(g=zn(f,d,`${n}${v==="default"?"":He(v)}`,v)),c===!1?g:{[c]:g}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const a=(r=i.unstable_sxConfig)!=null?r:Zr;function l(c){let u=c;if(typeof c=="function")u=c(i);else if(typeof c!="object")return c;if(!u)return null;const d=vu(i.breakpoints),m=Object.keys(d);let f=d;return Object.keys(u).forEach(b=>{const v=sd(u[b],i);if(v!=null)if(typeof v=="object")if(a[b])f=cn(f,e(b,v,i,a));else{const g=Qe({theme:i},v,h=>({[b]:h}));id(g,v)?f[b]=t({sx:v,theme:i}):f=cn(f,g)}else f=cn(f,e(b,v,i,a))}),yu(m,f)}return Array.isArray(o)?o.map(l):l(o)}return t}const hs=ad();hs.filterProps=["sx"];const Qr=hs;function ld(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const cd=["breakpoints","palette","spacing","shape"];function eo(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,a=de(e,cd),l=mu(n),c=Cu(o);let u=Ye({breakpoints:l,direction:"ltr",components:{},palette:k({mode:"light"},r),spacing:c,shape:k({},gu,i)},a);return u.applyStyles=ld,u=t.reduce((d,m)=>Ye(d,m),u),u.unstable_sxConfig=k({},Zr,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(m){return Qr({sx:m,theme:this})},u}function ud(e){return Object.keys(e).length===0}function gs(e=null){const t=T.useContext(kr.ThemeContext);return!t||ud(t)?e:t}const dd=eo();function bs(e=dd){return gs(e)}const pd=["ownerState"],fd=["variants"],md=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function hd(e){return Object.keys(e).length===0}function gd(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Mn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const bd=eo(),oi=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Pn({defaultTheme:e,theme:t,themeId:n}){return hd(t)?e:t[n]||t}function vd(e){return e?(t,n)=>n[e]:null}function In(e,t){let{ownerState:n}=t,r=de(t,pd);const o=typeof e=="function"?e(k({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>In(i,k({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let l=de(o,fd);return i.forEach(c=>{let u=!0;typeof c.props=="function"?u=c.props(k({ownerState:n},r,n)):Object.keys(c.props).forEach(d=>{(n==null?void 0:n[d])!==c.props[d]&&r[d]!==c.props[d]&&(u=!1)}),u&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(k({ownerState:n},r,n)):c.style))}),l}return o}function yd(e={}){const{themeId:t,defaultTheme:n=bd,rootShouldForwardProp:r=Mn,slotShouldForwardProp:o=Mn}=e,i=a=>Qr(k({},a,{theme:Pn(k({},a,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(a,l={})=>{kr.internal_processStyles(a,p=>p.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:c,slot:u,skipVariantsResolver:d,skipSx:m,overridesResolver:f=vd(oi(u))}=l,b=de(l,md),v=d!==void 0?d:u&&u!=="Root"&&u!=="root"||!1,g=m||!1;let h;process.env.NODE_ENV!=="production"&&c&&(h=`${c}-${oi(u||"Root")}`);let E=Mn;u==="Root"||u==="root"?E=r:u?E=o:gd(a)&&(E=void 0);const I=kr(a,k({shouldForwardProp:E,label:h},b)),w=p=>typeof p=="function"&&p.__emotion_real!==p||ht(p)?S=>In(p,k({},S,{theme:Pn({theme:S.theme,defaultTheme:n,themeId:t})})):p,x=(p,...S)=>{let P=w(p);const B=S?S.map(w):[];c&&f&&B.push(C=>{const R=Pn(k({},C,{defaultTheme:n,themeId:t}));if(!R.components||!R.components[c]||!R.components[c].styleOverrides)return null;const $=R.components[c].styleOverrides,F={};return Object.entries($).forEach(([A,M])=>{F[A]=In(M,k({},C,{theme:R}))}),f(C,F)}),c&&!v&&B.push(C=>{var R;const $=Pn(k({},C,{defaultTheme:n,themeId:t})),F=$==null||(R=$.components)==null||(R=R[c])==null?void 0:R.variants;return In({variants:F},k({},C,{theme:$}))}),g||B.push(i);const L=B.length-S.length;if(Array.isArray(p)&&L>0){const C=new Array(L).fill("");P=[...p,...C],P.raw=[...p.raw,...C]}const D=I(P,...B);if(process.env.NODE_ENV!=="production"){let C;c&&(C=`${c}${He(u||"")}`),C===void 0&&(C=`Styled(${rl(a)})`),D.displayName=C}return a.muiName&&(D.muiName=a.muiName),D};return I.withConfig&&(x.withConfig=I.withConfig),x}}function xd(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:Xi(t.components[n].defaultProps,r)}function wd({props:e,name:t,defaultTheme:n,themeId:r}){let o=bs(n);return r&&(o=o[r]||o),xd({theme:o,name:t,props:e})}function to(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Sl(e,t,n)}function Ed(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Et(e){if(e.type)return e;if(e.charAt(0)==="#")return Et(Ed(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:_t(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:_t(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function rr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function Td(e){e=Et(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),a=(u,d=(u+n/30)%12)=>o-i*Math.max(Math.min(d-3,9-d,1),-1);let l="rgb";const c=[Math.round(a(0)*255),Math.round(a(8)*255),Math.round(a(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),rr({type:l,values:c})}function ii(e){e=Et(e);let t=e.type==="hsl"||e.type==="hsla"?Et(Td(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function si(e,t){const n=ii(e),r=ii(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function Un(e,t){return e=Et(e),t=to(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,rr(e)}function kd(e,t){if(e=Et(e),t=to(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return rr(e)}function Od(e,t){if(e=Et(e),t=to(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return rr(e)}function Sd(e,t){return k({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const Cd={black:"#000",white:"#fff"},mn=Cd,Pd={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Nd=Pd,Rd={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ot=Rd,$d={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},St=$d,Md={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Jt=Md,Id={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ct=Id,jd={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Pt=jd,_d={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Nt=_d,Ad=["mode","contrastThreshold","tonalOffset"],ai={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:mn.white,default:mn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},br={text:{primary:mn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:mn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function li(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=Od(e.main,o):t==="dark"&&(e.dark=kd(e.main,i)))}function Dd(e="light"){return e==="dark"?{main:Ct[200],light:Ct[50],dark:Ct[400]}:{main:Ct[700],light:Ct[400],dark:Ct[800]}}function Bd(e="light"){return e==="dark"?{main:Ot[200],light:Ot[50],dark:Ot[400]}:{main:Ot[500],light:Ot[300],dark:Ot[700]}}function Ld(e="light"){return e==="dark"?{main:St[500],light:St[300],dark:St[700]}:{main:St[700],light:St[400],dark:St[800]}}function Fd(e="light"){return e==="dark"?{main:Pt[400],light:Pt[300],dark:Pt[700]}:{main:Pt[700],light:Pt[500],dark:Pt[900]}}function Vd(e="light"){return e==="dark"?{main:Nt[400],light:Nt[300],dark:Nt[700]}:{main:Nt[800],light:Nt[500],dark:Nt[900]}}function zd(e="light"){return e==="dark"?{main:Jt[400],light:Jt[300],dark:Jt[700]}:{main:"#ed6c02",light:Jt[500],dark:Jt[900]}}function Ud(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=de(e,Ad),i=e.primary||Dd(t),a=e.secondary||Bd(t),l=e.error||Ld(t),c=e.info||Fd(t),u=e.success||Vd(t),d=e.warning||zd(t);function m(g){const h=si(g,br.text.primary)>=n?br.text.primary:ai.text.primary;if(process.env.NODE_ENV!=="production"){const E=si(g,h);E<3&&console.error([`MUI: The contrast ratio of ${E}:1 for ${h} on ${g}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return h}const f=({color:g,name:h,mainShade:E=500,lightShade:I=300,darkShade:w=700})=>{if(g=k({},g),!g.main&&g[E]&&(g.main=g[E]),!g.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.`:_t(11,h?` (${h})`:"",E));if(typeof g.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(g.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:_t(12,h?` (${h})`:"",JSON.stringify(g.main)));return li(g,"light",I,r),li(g,"dark",w,r),g.contrastText||(g.contrastText=m(g.main)),g},b={dark:br,light:ai};return process.env.NODE_ENV!=="production"&&(b[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),Ye(k({common:k({},mn),mode:t,primary:f({color:i,name:"primary"}),secondary:f({color:a,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:f({color:l,name:"error"}),warning:f({color:d,name:"warning"}),info:f({color:c,name:"info"}),success:f({color:u,name:"success"}),grey:Nd,contrastThreshold:n,getContrastText:m,augmentColor:f,tonalOffset:r},b[t]),o)}const Hd=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function qd(e){return Math.round(e*1e5)/1e5}const ci={textTransform:"uppercase"},ui='"Roboto", "Helvetica", "Arial", sans-serif';function Wd(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=ui,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:a=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:u=16,allVariants:d,pxToRem:m}=n,f=de(n,Hd);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const b=o/14,v=m||(E=>`${E/u*b}rem`),g=(E,I,w,x,p)=>k({fontFamily:r,fontWeight:E,fontSize:v(I),lineHeight:w},r===ui?{letterSpacing:`${qd(x/I)}em`}:{},p,d),h={h1:g(i,96,1.167,-1.5),h2:g(i,60,1.2,-.5),h3:g(a,48,1.167,0),h4:g(a,34,1.235,.25),h5:g(a,24,1.334,0),h6:g(l,20,1.6,.15),subtitle1:g(a,16,1.75,.15),subtitle2:g(l,14,1.57,.1),body1:g(a,16,1.5,.15),body2:g(a,14,1.43,.15),button:g(l,14,1.75,.4,ci),caption:g(a,12,1.66,.4),overline:g(a,12,2.66,1,ci),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return Ye(k({htmlFontSize:u,pxToRem:v,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:a,fontWeightMedium:l,fontWeightBold:c},h),f,{clone:!1})}const Gd=.2,Kd=.14,Xd=.12;function fe(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Gd})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Kd})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Xd})`].join(",")}const Yd=["none",fe(0,2,1,-1,0,1,1,0,0,1,3,0),fe(0,3,1,-2,0,2,2,0,0,1,5,0),fe(0,3,3,-2,0,3,4,0,0,1,8,0),fe(0,2,4,-1,0,4,5,0,0,1,10,0),fe(0,3,5,-1,0,5,8,0,0,1,14,0),fe(0,3,5,-1,0,6,10,0,0,1,18,0),fe(0,4,5,-2,0,7,10,1,0,2,16,1),fe(0,5,5,-3,0,8,10,1,0,3,14,2),fe(0,5,6,-3,0,9,12,1,0,3,16,2),fe(0,6,6,-3,0,10,14,1,0,4,18,3),fe(0,6,7,-4,0,11,15,1,0,4,20,3),fe(0,7,8,-4,0,12,17,2,0,5,22,4),fe(0,7,8,-4,0,13,19,2,0,5,24,4),fe(0,7,9,-4,0,14,21,2,0,5,26,4),fe(0,8,9,-5,0,15,22,2,0,6,28,5),fe(0,8,10,-5,0,16,24,2,0,6,30,5),fe(0,8,11,-5,0,17,26,2,0,6,32,5),fe(0,9,11,-5,0,18,28,2,0,7,34,6),fe(0,9,12,-6,0,19,29,2,0,7,36,6),fe(0,10,13,-6,0,20,31,3,0,8,38,7),fe(0,10,13,-6,0,21,33,3,0,8,40,7),fe(0,10,14,-6,0,22,35,3,0,8,42,7),fe(0,11,14,-7,0,23,36,3,0,9,44,8),fe(0,11,15,-7,0,24,38,3,0,9,46,8)],Jd=Yd,Zd=["duration","easing","delay"],Qd={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},ep={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function di(e){return`${Math.round(e)}ms`}function tp(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function np(e){const t=k({},Qd,e.easing),n=k({},ep,e.duration);return k({getAutoHeightDuration:tp,create:(o=["all"],i={})=>{const{duration:a=n.standard,easing:l=t.easeInOut,delay:c=0}=i,u=de(i,Zd);if(process.env.NODE_ENV!=="production"){const d=f=>typeof f=="string",m=f=>!isNaN(parseFloat(f));!d(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!m(a)&&!d(a)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`),d(l)||console.error('MUI: Argument "easing" must be a string.'),!m(c)&&!d(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(d=>`${d} ${typeof a=="string"?a:di(a)} ${l} ${typeof c=="string"?c:di(c)}`).join(",")}},e,{easing:t,duration:n})}const rp={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},op=rp,ip=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function sp(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,a=de(e,ip);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":_t(18));const l=Ud(r),c=eo(e);let u=Ye(c,{mixins:Sd(c.breakpoints,n),palette:l,shadows:Jd.slice(),typography:Wd(l,i),transitions:np(o),zIndex:k({},op)});if(u=Ye(u,a),u=t.reduce((d,m)=>Ye(d,m),u),process.env.NODE_ENV!=="production"){const d=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],m=(f,b)=>{let v;for(v in f){const g=f[v];if(d.indexOf(v)!==-1&&Object.keys(g).length>0){if(process.env.NODE_ENV!=="production"){const h=We("",v);console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${v}\` internal state.`,"You can not override it like this: ",JSON.stringify(f,null,2),"",`Instead, you need to use the '&.${h}' syntax:`,JSON.stringify({root:{[`&.${h}`]:g}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}f[v]={}}}};Object.keys(u.components).forEach(f=>{const b=u.components[f].styleOverrides;b&&f.indexOf("Mui")===0&&m(b,f)})}return u.unstable_sxConfig=k({},Zr,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(m){return Qr({sx:m,theme:this})},u}const ap=sp(),no=ap,ro="$$material",vs=e=>Mn(e)&&e!=="classes",lp=yd({themeId:ro,defaultTheme:no,rootShouldForwardProp:vs}),ke=lp;function En(){const e=bs(no);return process.env.NODE_ENV!=="production"&&T.useDebugValue(e),e[ro]||e}function tt({props:e,name:t}){return wd({props:e,name:t,defaultTheme:no,themeId:ro})}function Mr(e,t){return Mr=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},Mr(e,t)}function cp(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Mr(e,t)}const pi={disabled:!1};var up=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.shape({enter:s.number,exit:s.number,appear:s.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&s.oneOfType([s.string,s.shape({enter:s.string,exit:s.string,active:s.string}),s.shape({enter:s.string,enterDone:s.string,enterActive:s.string,exit:s.string,exitDone:s.string,exitActive:s.string})]);const ys=z.createContext(null);var dp=function(t){return t.scrollTop},rn="unmounted",pt="exited",ft="entering",Mt="entered",Ir="exiting",nt=function(e){cp(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var a=o,l=a&&!a.isMounting?r.enter:r.appear,c;return i.appearStatus=null,r.in?l?(c=pt,i.appearStatus=ft):c=Mt:r.unmountOnExit||r.mountOnEnter?c=rn:c=pt,i.state={status:c},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var a=o.in;return a&&i.status===rn?{status:pt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var a=this.state.status;this.props.in?a!==ft&&a!==Mt&&(i=ft):(a===ft||a===Mt)&&(i=Ir)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,a,l;return i=a=l=o,o!=null&&typeof o!="number"&&(i=o.exit,a=o.enter,l=o.appear!==void 0?o.appear:a),{exit:i,enter:a,appear:l}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===ft){if(this.props.unmountOnExit||this.props.mountOnEnter){var a=this.props.nodeRef?this.props.nodeRef.current:en.findDOMNode(this);a&&dp(a)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===pt&&this.setState({status:rn})},n.performEnter=function(o){var i=this,a=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[en.findDOMNode(this),l],u=c[0],d=c[1],m=this.getTimeouts(),f=l?m.appear:m.enter;if(!o&&!a||pi.disabled){this.safeSetState({status:Mt},function(){i.props.onEntered(u)});return}this.props.onEnter(u,d),this.safeSetState({status:ft},function(){i.props.onEntering(u,d),i.onTransitionEnd(f,function(){i.safeSetState({status:Mt},function(){i.props.onEntered(u,d)})})})},n.performExit=function(){var o=this,i=this.props.exit,a=this.getTimeouts(),l=this.props.nodeRef?void 0:en.findDOMNode(this);if(!i||pi.disabled){this.safeSetState({status:pt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:Ir},function(){o.props.onExiting(l),o.onTransitionEnd(a.exit,function(){o.safeSetState({status:pt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,a=!0;return this.nextCallback=function(l){a&&(a=!1,i.nextCallback=null,o(l))},this.nextCallback.cancel=function(){a=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var a=this.props.nodeRef?this.props.nodeRef.current:en.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!a||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[a,this.nextCallback],u=c[0],d=c[1];this.props.addEndListener(u,d)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===rn)return null;var i=this.props,a=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var l=de(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return z.createElement(ys.Provider,{value:null},typeof a=="function"?a(o,l):z.cloneElement(z.Children.only(a),l))},t}(z.Component);nt.contextType=ys;nt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:s.shape({current:typeof Element>"u"?s.any:function(e,t,n,r,o,i){var a=e[t];return s.instanceOf(a&&"ownerDocument"in a?a.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:s.oneOfType([s.func.isRequired,s.element.isRequired]).isRequired,in:s.bool,mountOnEnter:s.bool,unmountOnExit:s.bool,appear:s.bool,enter:s.bool,exit:s.bool,timeout:function(t){var n=up;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:s.func,onEnter:s.func,onEntering:s.func,onEntered:s.func,onExit:s.func,onExiting:s.func,onExited:s.func}:{};function Rt(){}nt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Rt,onEntering:Rt,onEntered:Rt,onExit:Rt,onExiting:Rt,onExited:Rt};nt.UNMOUNTED=rn;nt.EXITED=pt;nt.ENTERING=ft;nt.ENTERED=Mt;nt.EXITING=Ir;const xs=nt,ws=e=>e.scrollTop;function Hn(e,t){var n,r;const{timeout:o,easing:i,style:a={}}=e;return{duration:(n=a.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=a.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:a.transitionDelay}}const pp=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function jr(e){return`scale(${e}, ${e**2})`}const fp={entering:{opacity:1,transform:jr(1)},entered:{opacity:1,transform:"none"}},vr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),oo=T.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:a,in:l,onEnter:c,onEntered:u,onEntering:d,onExit:m,onExited:f,onExiting:b,style:v,timeout:g="auto",TransitionComponent:h=xs}=t,E=de(t,pp),I=tn(),w=T.useRef(),x=En(),p=T.useRef(null),S=Le(p,i.ref,n),P=A=>M=>{if(A){const V=p.current;M===void 0?A(V):A(V,M)}},B=P(d),L=P((A,M)=>{ws(A);const{duration:V,delay:ee,easing:Q}=Hn({style:v,timeout:g,easing:a},{mode:"enter"});let O;g==="auto"?(O=x.transitions.getAutoHeightDuration(A.clientHeight),w.current=O):O=V,A.style.transition=[x.transitions.create("opacity",{duration:O,delay:ee}),x.transitions.create("transform",{duration:vr?O:O*.666,delay:ee,easing:Q})].join(","),c&&c(A,M)}),D=P(u),C=P(b),R=P(A=>{const{duration:M,delay:V,easing:ee}=Hn({style:v,timeout:g,easing:a},{mode:"exit"});let Q;g==="auto"?(Q=x.transitions.getAutoHeightDuration(A.clientHeight),w.current=Q):Q=M,A.style.transition=[x.transitions.create("opacity",{duration:Q,delay:V}),x.transitions.create("transform",{duration:vr?Q:Q*.666,delay:vr?V:V||Q*.333,easing:ee})].join(","),A.style.opacity=0,A.style.transform=jr(.75),m&&m(A)}),$=P(f),F=A=>{g==="auto"&&I.start(w.current||0,A),r&&r(p.current,A)};return y.jsx(h,k({appear:o,in:l,nodeRef:p,onEnter:L,onEntered:D,onEntering:B,onExit:R,onExited:$,onExiting:C,addEndListener:F,timeout:g==="auto"?null:g},E,{children:(A,M)=>T.cloneElement(i,k({style:k({opacity:0,transform:jr(.75),visibility:A==="exited"&&!l?"hidden":void 0},fp[A],v,i.props.style),ref:S},M))}))});process.env.NODE_ENV!=="production"&&(oo.propTypes={addEndListener:s.func,appear:s.bool,children:gn.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});oo.muiSupportAuto=!0;const _r=oo,mp=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},fi=mp,hp=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],gp=ke(ps,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Es=T.forwardRef(function(t,n){var r;const o=gs(),i=tt({props:t,name:"MuiPopper"}),{anchorEl:a,component:l,components:c,componentsProps:u,container:d,disablePortal:m,keepMounted:f,modifiers:b,open:v,placement:g,popperOptions:h,popperRef:E,transition:I,slots:w,slotProps:x}=i,p=de(i,hp),S=(r=w==null?void 0:w.root)!=null?r:c==null?void 0:c.Root,P=k({anchorEl:a,container:d,disablePortal:m,keepMounted:f,modifiers:b,open:v,placement:g,popperOptions:h,popperRef:E,transition:I},p);return y.jsx(gp,k({as:l,direction:o==null?void 0:o.direction,slots:{root:S},slotProps:x??u},P,{ref:n}))});process.env.NODE_ENV!=="production"&&(Es.propTypes={anchorEl:s.oneOfType([Je,s.object,s.func]),children:s.oneOfType([s.node,s.func]),component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Je,s.func]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:zr,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transition:s.bool});const Ts=Es;function bp(e){return We("MuiTooltip",e)}const vp=st("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),it=vp,yp=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function xp(e){return Math.round(e*1e5)/1e5}const wp=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,a={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${He(i.split("-")[0])}`],arrow:["arrow"]};return et(a,bp,t)},Ep=ke(Ts,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>k({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${it.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${it.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${it.arrow}`]:k({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${it.arrow}`]:k({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Tp=ke("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${He(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>k({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:Un(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${xp(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${it.popper}[data-popper-placement*="left"] &`]:k({transformOrigin:"right center"},t.isRtl?k({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):k({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${it.popper}[data-popper-placement*="right"] &`]:k({transformOrigin:"left center"},t.isRtl?k({marginRight:"14px"},t.touch&&{marginRight:"24px"}):k({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${it.popper}[data-popper-placement*="top"] &`]:k({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${it.popper}[data-popper-placement*="bottom"] &`]:k({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),kp=ke("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:Un(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Nn=!1;const mi=new bn;let Zt={x:0,y:0};function Rn(e,t){return n=>{t&&t(n),e(n)}}const ks=T.forwardRef(function(t,n){var r,o,i,a,l,c,u,d,m,f,b,v,g,h,E,I,w,x,p;const S=tt({props:t,name:"MuiTooltip"}),{arrow:P=!1,children:B,components:L={},componentsProps:D={},describeChild:C=!1,disableFocusListener:R=!1,disableHoverListener:$=!1,disableInteractive:F=!1,disableTouchListener:A=!1,enterDelay:M=100,enterNextDelay:V=0,enterTouchDelay:ee=700,followCursor:Q=!1,id:O,leaveDelay:_=0,leaveTouchDelay:H=1500,onClose:X,onOpen:U,open:q,placement:G="bottom",PopperComponent:K,PopperProps:W={},slotProps:Y={},slots:J={},title:re,TransitionComponent:j=_r,TransitionProps:Z}=S,N=de(S,yp),oe=T.isValidElement(B)?B:y.jsx("span",{children:B}),ye=En(),Oe=ye.direction==="rtl",[ge,ct]=T.useState(),[Se,Ge]=T.useState(null),Re=T.useRef(!1),Ke=F||Q,xe=tn(),Tt=tn(),ut=tn(),Ut=tn(),[Tn,co]=Ui({controlled:q,default:!1,name:"Tooltip",state:"open"});let Xe=Tn;if(process.env.NODE_ENV!=="production"){const{current:te}=T.useRef(q!==void 0);T.useEffect(()=>{ge&&ge.disabled&&!te&&re!==""&&ge.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[re,ge,te])}const or=zi(O),Ht=T.useRef(),kn=un(()=>{Ht.current!==void 0&&(document.body.style.WebkitUserSelect=Ht.current,Ht.current=void 0),Ut.clear()});T.useEffect(()=>kn,[kn]);const uo=te=>{mi.clear(),Nn=!0,co(!0),U&&!Xe&&U(te)},On=un(te=>{mi.start(800+_,()=>{Nn=!1}),co(!1),X&&Xe&&X(te),xe.start(ye.transitions.duration.shortest,()=>{Re.current=!1})}),ir=te=>{Re.current&&te.type!=="touchstart"||(ge&&ge.removeAttribute("title"),Tt.clear(),ut.clear(),M||Nn&&V?Tt.start(Nn?V:M,()=>{uo(te)}):uo(te))},po=te=>{Tt.clear(),ut.start(_,()=>{On(te)})},{isFocusVisibleRef:fo,onBlur:Us,onFocus:Hs,ref:qs}=Hi(),[,mo]=T.useState(!1),ho=te=>{Us(te),fo.current===!1&&(mo(!1),po(te))},go=te=>{ge||ct(te.currentTarget),Hs(te),fo.current===!0&&(mo(!0),ir(te))},bo=te=>{Re.current=!0;const $e=oe.props;$e.onTouchStart&&$e.onTouchStart(te)},vo=ir,yo=po,Ws=te=>{bo(te),ut.clear(),xe.clear(),kn(),Ht.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Ut.start(ee,()=>{document.body.style.WebkitUserSelect=Ht.current,ir(te)})},Gs=te=>{oe.props.onTouchEnd&&oe.props.onTouchEnd(te),kn(),ut.start(H,()=>{On(te)})};T.useEffect(()=>{if(!Xe)return;function te($e){($e.key==="Escape"||$e.key==="Esc")&&On($e)}return document.addEventListener("keydown",te),()=>{document.removeEventListener("keydown",te)}},[On,Xe]);const Ks=Le(oe.ref,qs,ct,n);!re&&re!==0&&(Xe=!1);const sr=T.useRef(),Xs=te=>{const $e=oe.props;$e.onMouseMove&&$e.onMouseMove(te),Zt={x:te.clientX,y:te.clientY},sr.current&&sr.current.update()},qt={},ar=typeof re=="string";C?(qt.title=!Xe&&ar&&!$?re:null,qt["aria-describedby"]=Xe?or:null):(qt["aria-label"]=ar?re:null,qt["aria-labelledby"]=Xe&&!ar?or:null);const Ae=k({},qt,N,oe.props,{className:Ee(N.className,oe.props.className),onTouchStart:bo,ref:Ks},Q?{onMouseMove:Xs}:{});process.env.NODE_ENV!=="production"&&(Ae["data-mui-internal-clone-element"]=!0,T.useEffect(()=>{ge&&!ge.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[ge]));const Wt={};A||(Ae.onTouchStart=Ws,Ae.onTouchEnd=Gs),$||(Ae.onMouseOver=Rn(vo,Ae.onMouseOver),Ae.onMouseLeave=Rn(yo,Ae.onMouseLeave),Ke||(Wt.onMouseOver=vo,Wt.onMouseLeave=yo)),R||(Ae.onFocus=Rn(go,Ae.onFocus),Ae.onBlur=Rn(ho,Ae.onBlur),Ke||(Wt.onFocus=go,Wt.onBlur=ho)),process.env.NODE_ENV!=="production"&&oe.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${oe.props.title}\` or the Tooltip component.`].join(`
`));const Ys=T.useMemo(()=>{var te;let $e=[{name:"arrow",enabled:!!Se,options:{element:Se,padding:4}}];return(te=W.popperOptions)!=null&&te.modifiers&&($e=$e.concat(W.popperOptions.modifiers)),k({},W.popperOptions,{modifiers:$e})},[Se,W]),Gt=k({},S,{isRtl:Oe,arrow:P,disableInteractive:Ke,placement:G,PopperComponentProp:K,touch:Re.current}),lr=wp(Gt),xo=(r=(o=J.popper)!=null?o:L.Popper)!=null?r:Ep,wo=(i=(a=(l=J.transition)!=null?l:L.Transition)!=null?a:j)!=null?i:_r,Eo=(c=(u=J.tooltip)!=null?u:L.Tooltip)!=null?c:Tp,To=(d=(m=J.arrow)!=null?m:L.Arrow)!=null?d:kp,Js=nn(xo,k({},W,(f=Y.popper)!=null?f:D.popper,{className:Ee(lr.popper,W==null?void 0:W.className,(b=(v=Y.popper)!=null?v:D.popper)==null?void 0:b.className)}),Gt),Zs=nn(wo,k({},Z,(g=Y.transition)!=null?g:D.transition),Gt),Qs=nn(Eo,k({},(h=Y.tooltip)!=null?h:D.tooltip,{className:Ee(lr.tooltip,(E=(I=Y.tooltip)!=null?I:D.tooltip)==null?void 0:E.className)}),Gt),ea=nn(To,k({},(w=Y.arrow)!=null?w:D.arrow,{className:Ee(lr.arrow,(x=(p=Y.arrow)!=null?p:D.arrow)==null?void 0:x.className)}),Gt);return y.jsxs(T.Fragment,{children:[T.cloneElement(oe,Ae),y.jsx(xo,k({as:K??Ts,placement:G,anchorEl:Q?{getBoundingClientRect:()=>({top:Zt.y,left:Zt.x,right:Zt.x,bottom:Zt.y,width:0,height:0})}:ge,popperRef:sr,open:ge?Xe:!1,id:or,transition:!0},Wt,Js,{popperOptions:Ys,children:({TransitionProps:te})=>y.jsx(wo,k({timeout:ye.transitions.duration.shorter},te,Zs,{children:y.jsxs(Eo,k({},Qs,{children:[re,P?y.jsx(To,k({},ea,{ref:Ge})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(ks.propTypes={arrow:s.bool,children:gn.isRequired,classes:s.object,className:s.string,components:s.shape({Arrow:s.elementType,Popper:s.elementType,Tooltip:s.elementType,Transition:s.elementType}),componentsProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),describeChild:s.bool,disableFocusListener:s.bool,disableHoverListener:s.bool,disableInteractive:s.bool,disableTouchListener:s.bool,enterDelay:s.number,enterNextDelay:s.number,enterTouchDelay:s.number,followCursor:s.bool,id:s.string,leaveDelay:s.number,leaveTouchDelay:s.number,onClose:s.func,onOpen:s.func,open:s.bool,placement:s.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:s.elementType,PopperProps:s.object,slotProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),slots:s.shape({arrow:s.elementType,popper:s.elementType,tooltip:s.elementType,transition:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),title:s.node,TransitionComponent:s.elementType,TransitionProps:s.object});const Op=ks;var io={},Os={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Os);var Sp=Os.exports,yr={};function Cp(e){return We("MuiSvgIcon",e)}st("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Pp=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Np=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${He(t)}`,`fontSize${He(n)}`]};return et(o,Cp,r)},Rp=ke("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${He(n.color)}`],t[`fontSize${He(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,a,l,c,u,d,m,f,b,v;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(a=i.pxToRem)==null?void 0:a.call(i,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((u=e.typography)==null||(d=u.pxToRem)==null?void 0:d.call(u,35))||"2.1875rem"}[t.fontSize],color:(m=(f=(e.vars||e).palette)==null||(f=f[t.color])==null?void 0:f.main)!=null?m:{action:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.active,disabled:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.disabled,inherit:void 0}[t.color]}}),so=T.forwardRef(function(t,n){const r=tt({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:a="inherit",component:l="svg",fontSize:c="medium",htmlColor:u,inheritViewBox:d=!1,titleAccess:m,viewBox:f="0 0 24 24"}=r,b=de(r,Pp),v=T.isValidElement(o)&&o.type==="svg",g=k({},r,{color:a,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:d,viewBox:f,hasSvgAsChild:v}),h={};d||(h.viewBox=f);const E=Np(g);return y.jsxs(Rp,k({as:l,className:Ee(E.root,i),focusable:"false",color:u,"aria-hidden":m?void 0:!0,role:m?"img":void 0,ref:n},h,b,v&&o.props,{ownerState:g,children:[v?o.props.children:o,m?y.jsx("title",{children:m}):null]}))});process.env.NODE_ENV!=="production"&&(so.propTypes={children:s.node,classes:s.object,className:s.string,color:s.oneOfType([s.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),s.string]),component:s.elementType,fontSize:s.oneOfType([s.oneOf(["inherit","large","medium","small"]),s.string]),htmlColor:s.string,inheritViewBox:s.bool,shapeRendering:s.string,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),titleAccess:s.string,viewBox:s.string});so.muiName="SvgIcon";const hi=so;function Ss(e,t){function n(r,o){return y.jsx(hi,k({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=hi.muiName,T.memo(T.forwardRef(n))}const $p={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Yi.configure(e)}},Mp=Object.freeze(Object.defineProperty({__proto__:null,capitalize:He,createChainedFunction:Cr,createSvgIcon:Ss,debounce:Vi,deprecatedPropType:il,isMuiElement:sl,ownerDocument:Te,ownerWindow:At,requirePropFactory:al,setRef:Bn,unstable_ClassNameGenerator:$p,unstable_useEnhancedEffect:yt,unstable_useId:zi,unsupportedProp:ul,useControlled:Ui,useEventCallback:un,useForkRef:Le,useIsFocusVisible:Hi},Symbol.toStringTag,{value:"Module"})),Ip=Ba(Mp);var gi;function jp(){return gi||(gi=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Ip}(yr)),yr}var _p=Sp;Object.defineProperty(io,"__esModule",{value:!0});var Cs=io.default=void 0,Ap=_p(jp()),Dp=y;Cs=io.default=(0,Ap.default)((0,Dp.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function bi(e,t,n){return e?y.jsx(pe.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:y.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function ao(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:a=void 0,hasAutoFocus:l=!1,className:c,isDisabled:u=!1,isDense:d=!0,isSubMenuParent:m=!1,hasDisabledGutters:f=!1,hasDivider:b=!1,focusVisibleClassName:v,id:g,children:h}=e,E=y.jsx(pe.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:u,dense:d,disableGutters:f,divider:b,focusVisibleClassName:v,onClick:t,id:g,children:n?y.jsxs(y.Fragment,{children:[bi(i,n,!0),y.jsx(pe.ListItemText,{primary:n,inset:!i&&o}),m?y.jsx(pe.ListItemIcon,{className:"papi-menu-icon-trailing",children:y.jsx(Cs,{})}):bi(a,n,!1)]}):h});return r?y.jsx(Op,{title:r,placement:"right",children:y.jsx("div",{children:E})}):E}function Ps(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Bp(e){const[t,n]=z.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,a=u=>{n(u.currentTarget)},l=()=>{n(void 0)},c=()=>{let u=Ps(i).filter(d=>"menuItem"in d.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return u=u.filter(d=>"menuItem"in d.group&&d.group.menuItem===r.id),y.jsx(lo,{...e,includedGroups:u})};return y.jsxs(y.Fragment,{children:[y.jsx(ao,{onClick:a,...o,isSubMenuParent:!0}),y.jsx(pe.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Lp=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function lo(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:a}=z.useMemo(()=>{const d=o&&o.length>0?o:Ps(t).filter(v=>!("menuItem"in v.group)),m=Object.values(d).sort((v,g)=>(v.group.order||0)-(g.group.order||0)),f=[];m.forEach(v=>{Lp(v.id,t.items).forEach(g=>f.push({item:g,isLastItemInGroup:!1})),f.length>0&&(f[f.length-1].isLastItemInGroup=!0)}),f.length>0&&(f[f.length-1].isLastItemInGroup=!1);const b=f.some(v=>"iconPathBefore"in v.item&&v.item.iconPathBefore);return{items:f,allowForLeadingIcons:b}},[o,t]),l=({item:d,isLastItemInGroup:m})=>({className:"papi-menu-item",label:d.label,tooltip:d.tooltip,iconPathBefore:"iconPathBefore"in d?d.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in d?d.iconPathAfter:void 0,hasDivider:m,allowForLeadingIcons:a}),[c]=i;if(!c)return y.jsx("div",{});const u=c.item.group;return y.jsx("div",{role:"menu","aria-label":u,children:i.map((d,m)=>{const{item:f}=d,b=l(d);if("command"in f){const v=f.group+m;return y.jsx(ao,{onClick:g=>{n==null||n(g),r(f)},...b},v)}return y.jsx(Bp,{parentMenuItem:f,parentItemProps:b,...e},u+f.id)})},u)}function Fp(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([a,l])=>({id:a,group:l})).filter(a=>"column"in a.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(a=>"column"in a.group&&a.group.column===n)),y.jsx(lo,{...e,includedGroups:i})}function Vp({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return y.jsxs(pe.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[y.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),y.jsx(pe.List,{id:n,dense:!0,className:i??"",children:y.jsx(Fp,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Ns({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=z.useMemo(()=>{const a=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,u=o[c];typeof u=="object"&&typeof u.order=="number"&&!Number.isNaN(u.order)?a.set(u.order,{id:c,metadata:u}):console.warn(`Property ${l} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(a.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return y.jsx(pe.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((a,l)=>y.jsx(Vp,{commandHandler:e,menuDefinition:n,...a,className:t},l))})}const Rs=T.createContext({});process.env.NODE_ENV!=="production"&&(Rs.displayName="ListContext");const zp=Rs;function Up(e){return We("MuiList",e)}st("MuiList",["root","padding","dense","subheader"]);const Hp=["children","className","component","dense","disablePadding","subheader"],qp=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return et({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},Up,t)},Wp=ke("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>k({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),$s=T.forwardRef(function(t,n){const r=tt({props:t,name:"MuiList"}),{children:o,className:i,component:a="ul",dense:l=!1,disablePadding:c=!1,subheader:u}=r,d=de(r,Hp),m=T.useMemo(()=>({dense:l}),[l]),f=k({},r,{component:a,dense:l,disablePadding:c}),b=qp(f);return y.jsx(zp.Provider,{value:m,children:y.jsxs(Wp,k({as:a,className:Ee(b.root,i),ref:n,ownerState:f},d,{children:[u,o]}))})});process.env.NODE_ENV!=="production"&&($s.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,dense:s.bool,disablePadding:s.bool,subheader:s.node,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const Gp=$s,Kp=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function xr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function vi(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function Ms(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function Qt(e,t,n,r,o,i){let a=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(a)return!1;a=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!Ms(l,i)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const Is=T.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:a,className:l,disabledItemsFocusable:c=!1,disableListWrap:u=!1,onKeyDown:d,variant:m="selectedMenu"}=t,f=de(t,Kp),b=T.useRef(null),v=T.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});yt(()=>{o&&b.current.focus()},[o]),T.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(w,x)=>{const p=!b.current.style.width;if(w.clientHeight<b.current.clientHeight&&p){const S=`${qi(Te(w))}px`;b.current.style[x.direction==="rtl"?"paddingLeft":"paddingRight"]=S,b.current.style.width=`calc(100% + ${S})`}return b.current}}),[]);const g=w=>{const x=b.current,p=w.key,S=Te(x).activeElement;if(p==="ArrowDown")w.preventDefault(),Qt(x,S,u,c,xr);else if(p==="ArrowUp")w.preventDefault(),Qt(x,S,u,c,vi);else if(p==="Home")w.preventDefault(),Qt(x,null,u,c,xr);else if(p==="End")w.preventDefault(),Qt(x,null,u,c,vi);else if(p.length===1){const P=v.current,B=p.toLowerCase(),L=performance.now();P.keys.length>0&&(L-P.lastTime>500?(P.keys=[],P.repeating=!0,P.previousKeyMatched=!0):P.repeating&&B!==P.keys[0]&&(P.repeating=!1)),P.lastTime=L,P.keys.push(B);const D=S&&!P.repeating&&Ms(S,P);P.previousKeyMatched&&(D||Qt(x,S,!1,c,xr,P))?w.preventDefault():P.previousKeyMatched=!1}d&&d(w)},h=Le(b,n);let E=-1;T.Children.forEach(a,(w,x)=>{if(!T.isValidElement(w)){E===x&&(E+=1,E>=a.length&&(E=-1));return}process.env.NODE_ENV!=="production"&&Dn.isFragment(w)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),w.props.disabled||(m==="selectedMenu"&&w.props.selected||E===-1)&&(E=x),E===x&&(w.props.disabled||w.props.muiSkipListHighlight||w.type.muiSkipListHighlight)&&(E+=1,E>=a.length&&(E=-1))});const I=T.Children.map(a,(w,x)=>{if(x===E){const p={};return i&&(p.autoFocus=!0),w.props.tabIndex===void 0&&m==="selectedMenu"&&(p.tabIndex=0),T.cloneElement(w,p)}return w});return y.jsx(Gp,k({role:"menu",ref:h,className:l,onKeyDown:g,tabIndex:o?0:-1},f,{children:I}))});process.env.NODE_ENV!=="production"&&(Is.propTypes={autoFocus:s.bool,autoFocusItem:s.bool,children:s.node,className:s.string,disabledItemsFocusable:s.bool,disableListWrap:s.bool,onKeyDown:s.func,variant:s.oneOf(["menu","selectedMenu"])});const Xp=Is,Yp=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Jp={entering:{opacity:1},entered:{opacity:1}},js=T.forwardRef(function(t,n){const r=En(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:a=!0,children:l,easing:c,in:u,onEnter:d,onEntered:m,onEntering:f,onExit:b,onExited:v,onExiting:g,style:h,timeout:E=o,TransitionComponent:I=xs}=t,w=de(t,Yp),x=T.useRef(null),p=Le(x,l.ref,n),S=F=>A=>{if(F){const M=x.current;A===void 0?F(M):F(M,A)}},P=S(f),B=S((F,A)=>{ws(F);const M=Hn({style:h,timeout:E,easing:c},{mode:"enter"});F.style.webkitTransition=r.transitions.create("opacity",M),F.style.transition=r.transitions.create("opacity",M),d&&d(F,A)}),L=S(m),D=S(g),C=S(F=>{const A=Hn({style:h,timeout:E,easing:c},{mode:"exit"});F.style.webkitTransition=r.transitions.create("opacity",A),F.style.transition=r.transitions.create("opacity",A),b&&b(F)}),R=S(v),$=F=>{i&&i(x.current,F)};return y.jsx(I,k({appear:a,in:u,nodeRef:x,onEnter:B,onEntered:L,onEntering:P,onExit:C,onExited:R,onExiting:D,addEndListener:$,timeout:E},w,{children:(F,A)=>T.cloneElement(l,k({style:k({opacity:0,visibility:F==="exited"&&!u?"hidden":void 0},Jp[F],h,l.props.style),ref:p},A))}))});process.env.NODE_ENV!=="production"&&(js.propTypes={addEndListener:s.func,appear:s.bool,children:gn.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const Zp=js;function Qp(e){return We("MuiBackdrop",e)}st("MuiBackdrop",["root","invisible"]);const ef=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],tf=e=>{const{classes:t,invisible:n}=e;return et({root:["root",n&&"invisible"]},Qp,t)},nf=ke("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>k({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),_s=T.forwardRef(function(t,n){var r,o,i;const a=tt({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:u="div",components:d={},componentsProps:m={},invisible:f=!1,open:b,slotProps:v={},slots:g={},TransitionComponent:h=Zp,transitionDuration:E}=a,I=de(a,ef),w=k({},a,{component:u,invisible:f}),x=tf(w),p=(r=v.root)!=null?r:m.root;return y.jsx(h,k({in:b,timeout:E},I,{children:y.jsx(nf,k({"aria-hidden":!0},p,{as:(o=(i=g.root)!=null?i:d.Root)!=null?o:u,className:Ee(x.root,c,p==null?void 0:p.className),ownerState:k({},w,p==null?void 0:p.ownerState),classes:x,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(_s.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.object}),invisible:s.bool,open:s.bool.isRequired,slotProps:s.shape({root:s.object}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const rf=_s;function of(e){return We("MuiModal",e)}st("MuiModal",["root","hidden","backdrop"]);const sf=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],af=e=>{const{open:t,exited:n,classes:r}=e;return et({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},of,r)},lf=ke("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>k({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),cf=ke(rf,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),As=T.forwardRef(function(t,n){var r,o,i,a,l,c;const u=tt({name:"MuiModal",props:t}),{BackdropComponent:d=cf,BackdropProps:m,className:f,closeAfterTransition:b=!1,children:v,container:g,component:h,components:E={},componentsProps:I={},disableAutoFocus:w=!1,disableEnforceFocus:x=!1,disableEscapeKeyDown:p=!1,disablePortal:S=!1,disableRestoreFocus:P=!1,disableScrollLock:B=!1,hideBackdrop:L=!1,keepMounted:D=!1,onBackdropClick:C,open:R,slotProps:$,slots:F}=u,A=de(u,sf),M=k({},u,{closeAfterTransition:b,disableAutoFocus:w,disableEnforceFocus:x,disableEscapeKeyDown:p,disablePortal:S,disableRestoreFocus:P,disableScrollLock:B,hideBackdrop:L,keepMounted:D}),{getRootProps:V,getBackdropProps:ee,getTransitionProps:Q,portalRef:O,isTopModal:_,exited:H,hasTransition:X}=Jl(k({},M,{rootRef:n})),U=k({},M,{exited:H}),q=af(U),G={};if(v.props.tabIndex===void 0&&(G.tabIndex="-1"),X){const{onEnter:Z,onExited:N}=Q();G.onEnter=Z,G.onExited=N}const K=(r=(o=F==null?void 0:F.root)!=null?o:E.Root)!=null?r:lf,W=(i=(a=F==null?void 0:F.backdrop)!=null?a:E.Backdrop)!=null?i:d,Y=(l=$==null?void 0:$.root)!=null?l:I.root,J=(c=$==null?void 0:$.backdrop)!=null?c:I.backdrop,re=xt({elementType:K,externalSlotProps:Y,externalForwardedProps:A,getSlotProps:V,additionalProps:{ref:n,as:h},ownerState:U,className:Ee(f,Y==null?void 0:Y.className,q==null?void 0:q.root,!U.open&&U.exited&&(q==null?void 0:q.hidden))}),j=xt({elementType:W,externalSlotProps:J,additionalProps:m,getSlotProps:Z=>ee(k({},Z,{onClick:N=>{C&&C(N),Z!=null&&Z.onClick&&Z.onClick(N)}})),className:Ee(J==null?void 0:J.className,m==null?void 0:m.className,q==null?void 0:q.backdrop),ownerState:U});return!D&&!R&&(!X||H)?null:y.jsx(dn,{ref:O,container:g,disablePortal:S,children:y.jsxs(K,k({},re,{children:[!L&&d?y.jsx(W,k({},j)):null,y.jsx(Ln,{disableEnforceFocus:x,disableAutoFocus:w,disableRestoreFocus:P,isEnabled:_,open:R,children:T.cloneElement(v,G)})]}))})});process.env.NODE_ENV!=="production"&&(As.propTypes={BackdropComponent:s.elementType,BackdropProps:s.object,children:gn.isRequired,classes:s.object,className:s.string,closeAfterTransition:s.bool,component:s.elementType,components:s.shape({Backdrop:s.elementType,Root:s.elementType}),componentsProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Je,s.func]),disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableEscapeKeyDown:s.bool,disablePortal:s.bool,disableRestoreFocus:s.bool,disableScrollLock:s.bool,hideBackdrop:s.bool,keepMounted:s.bool,onBackdropClick:s.func,onClose:s.func,onTransitionEnter:s.func,onTransitionExited:s.func,open:s.bool.isRequired,slotProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({backdrop:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const uf=As;function df(e){return We("MuiPaper",e)}st("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const pf=["className","component","elevation","square","variant"],ff=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return et(i,df,o)},mf=ke("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return k({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&k({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${Un("#fff",fi(t.elevation))}, ${Un("#fff",fi(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Ds=T.forwardRef(function(t,n){const r=tt({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:a=1,square:l=!1,variant:c="elevation"}=r,u=de(r,pf),d=k({},r,{component:i,elevation:a,square:l,variant:c}),m=ff(d);return process.env.NODE_ENV!=="production"&&En().shadows[a]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)),y.jsx(mf,k({as:i,ownerState:d,className:Ee(m.root,o),ref:n},u))});process.env.NODE_ENV!=="production"&&(Ds.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,elevation:zt(Ki,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:s.bool,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),variant:s.oneOfType([s.oneOf(["elevation","outlined"]),s.string])});const hf=Ds;function gf(e){return We("MuiPopover",e)}st("MuiPopover",["root","paper"]);const bf=["onEntering"],vf=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],yf=["slotProps"];function yi(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function xi(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function wi(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function jn(e){return typeof e=="function"?e():e}const xf=e=>{const{classes:t}=e;return et({root:["root"],paper:["paper"]},gf,t)},wf=ke(uf,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Bs=ke(hf,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Ls=T.forwardRef(function(t,n){var r,o,i;const a=tt({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:u={vertical:"top",horizontal:"left"},anchorPosition:d,anchorReference:m="anchorEl",children:f,className:b,container:v,elevation:g=8,marginThreshold:h=16,open:E,PaperProps:I={},slots:w,slotProps:x,transformOrigin:p={vertical:"top",horizontal:"left"},TransitionComponent:S=_r,transitionDuration:P="auto",TransitionProps:{onEntering:B}={},disableScrollLock:L=!1}=a,D=de(a.TransitionProps,bf),C=de(a,vf),R=(r=x==null?void 0:x.paper)!=null?r:I,$=T.useRef(),F=Le($,R.ref),A=k({},a,{anchorOrigin:u,anchorReference:m,elevation:g,marginThreshold:h,externalPaperSlotProps:R,transformOrigin:p,TransitionComponent:S,transitionDuration:P,TransitionProps:D}),M=xf(A),V=T.useCallback(()=>{if(m==="anchorPosition")return process.env.NODE_ENV!=="production"&&(d||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),d;const Z=jn(c),N=Z&&Z.nodeType===1?Z:Te($.current).body,oe=N.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const ye=N.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ye.top===0&&ye.left===0&&ye.right===0&&ye.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:oe.top+yi(oe,u.vertical),left:oe.left+xi(oe,u.horizontal)}},[c,u.horizontal,u.vertical,d,m]),ee=T.useCallback(Z=>({vertical:yi(Z,p.vertical),horizontal:xi(Z,p.horizontal)}),[p.horizontal,p.vertical]),Q=T.useCallback(Z=>{const N={width:Z.offsetWidth,height:Z.offsetHeight},oe=ee(N);if(m==="none")return{top:null,left:null,transformOrigin:wi(oe)};const ye=V();let Oe=ye.top-oe.vertical,ge=ye.left-oe.horizontal;const ct=Oe+N.height,Se=ge+N.width,Ge=At(jn(c)),Re=Ge.innerHeight-h,Ke=Ge.innerWidth-h;if(h!==null&&Oe<h){const xe=Oe-h;Oe-=xe,oe.vertical+=xe}else if(h!==null&&ct>Re){const xe=ct-Re;Oe-=xe,oe.vertical+=xe}if(process.env.NODE_ENV!=="production"&&N.height>Re&&N.height&&Re&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${N.height-Re}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),h!==null&&ge<h){const xe=ge-h;ge-=xe,oe.horizontal+=xe}else if(Se>Ke){const xe=Se-Ke;ge-=xe,oe.horizontal+=xe}return{top:`${Math.round(Oe)}px`,left:`${Math.round(ge)}px`,transformOrigin:wi(oe)}},[c,m,V,ee,h]),[O,_]=T.useState(E),H=T.useCallback(()=>{const Z=$.current;if(!Z)return;const N=Q(Z);N.top!==null&&(Z.style.top=N.top),N.left!==null&&(Z.style.left=N.left),Z.style.transformOrigin=N.transformOrigin,_(!0)},[Q]);T.useEffect(()=>(L&&window.addEventListener("scroll",H),()=>window.removeEventListener("scroll",H)),[c,L,H]);const X=(Z,N)=>{B&&B(Z,N),H()},U=()=>{_(!1)};T.useEffect(()=>{E&&H()}),T.useImperativeHandle(l,()=>E?{updatePosition:()=>{H()}}:null,[E,H]),T.useEffect(()=>{if(!E)return;const Z=Vi(()=>{H()}),N=At(c);return N.addEventListener("resize",Z),()=>{Z.clear(),N.removeEventListener("resize",Z)}},[c,E,H]);let q=P;P==="auto"&&!S.muiSupportAuto&&(q=void 0);const G=v||(c?Te(jn(c)).body:void 0),K=(o=w==null?void 0:w.root)!=null?o:wf,W=(i=w==null?void 0:w.paper)!=null?i:Bs,Y=xt({elementType:W,externalSlotProps:k({},R,{style:O?R.style:k({},R.style,{opacity:0})}),additionalProps:{elevation:g,ref:F},ownerState:A,className:Ee(M.paper,R==null?void 0:R.className)}),J=xt({elementType:K,externalSlotProps:(x==null?void 0:x.root)||{},externalForwardedProps:C,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:G,open:E},ownerState:A,className:Ee(M.root,b)}),{slotProps:re}=J,j=de(J,yf);return y.jsx(K,k({},j,!Zi(K)&&{slotProps:re,disableScrollLock:L},{children:y.jsx(S,k({appear:!0,in:E,onEntering:X,onExited:U,timeout:q},D,{children:y.jsx(W,k({},Y,{children:f}))}))}))});process.env.NODE_ENV!=="production"&&(Ls.propTypes={action:zr,anchorEl:zt(s.oneOfType([Je,s.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=jn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),anchorPosition:s.shape({left:s.number.isRequired,top:s.number.isRequired}),anchorReference:s.oneOf(["anchorEl","anchorPosition","none"]),children:s.node,classes:s.object,className:s.string,container:s.oneOfType([Je,s.func]),disableScrollLock:s.bool,elevation:Ki,marginThreshold:s.number,onClose:s.func,open:s.bool.isRequired,PaperProps:s.shape({component:Ja}),slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transformOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object});const Ef=Ls;function Tf(e){return We("MuiMenu",e)}st("MuiMenu",["root","paper","list"]);const kf=["onEntering"],Of=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Sf={vertical:"top",horizontal:"right"},Cf={vertical:"top",horizontal:"left"},Pf=e=>{const{classes:t}=e;return et({root:["root"],paper:["paper"],list:["list"]},Tf,t)},Nf=ke(Ef,{shouldForwardProp:e=>vs(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Rf=ke(Bs,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),$f=ke(Xp,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Fs=T.forwardRef(function(t,n){var r,o;const i=tt({props:t,name:"MuiMenu"}),{autoFocus:a=!0,children:l,className:c,disableAutoFocusItem:u=!1,MenuListProps:d={},onClose:m,open:f,PaperProps:b={},PopoverClasses:v,transitionDuration:g="auto",TransitionProps:{onEntering:h}={},variant:E="selectedMenu",slots:I={},slotProps:w={}}=i,x=de(i.TransitionProps,kf),p=de(i,Of),S=En(),P=S.direction==="rtl",B=k({},i,{autoFocus:a,disableAutoFocusItem:u,MenuListProps:d,onEntering:h,PaperProps:b,transitionDuration:g,TransitionProps:x,variant:E}),L=Pf(B),D=a&&!u&&f,C=T.useRef(null),R=(Q,O)=>{C.current&&C.current.adjustStyleForScrollbar(Q,S),h&&h(Q,O)},$=Q=>{Q.key==="Tab"&&(Q.preventDefault(),m&&m(Q,"tabKeyDown"))};let F=-1;T.Children.map(l,(Q,O)=>{T.isValidElement(Q)&&(process.env.NODE_ENV!=="production"&&Dn.isFragment(Q)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Q.props.disabled||(E==="selectedMenu"&&Q.props.selected||F===-1)&&(F=O))});const A=(r=I.paper)!=null?r:Rf,M=(o=w.paper)!=null?o:b,V=xt({elementType:I.root,externalSlotProps:w.root,ownerState:B,className:[L.root,c]}),ee=xt({elementType:A,externalSlotProps:M,ownerState:B,className:L.paper});return y.jsx(Nf,k({onClose:m,anchorOrigin:{vertical:"bottom",horizontal:P?"right":"left"},transformOrigin:P?Sf:Cf,slots:{paper:A,root:I.root},slotProps:{root:V,paper:ee},open:f,ref:n,transitionDuration:g,TransitionProps:k({onEntering:R},x),ownerState:B},p,{classes:v,children:y.jsx($f,k({onKeyDown:$,actions:C,autoFocus:a&&(F===-1||u),autoFocusItem:D,variant:E},d,{className:Ee(L.list,d.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(Fs.propTypes={anchorEl:s.oneOfType([Je,s.func]),autoFocus:s.bool,children:s.node,classes:s.object,className:s.string,disableAutoFocusItem:s.bool,MenuListProps:s.object,onClose:s.func,open:s.bool.isRequired,PaperProps:s.object,PopoverClasses:s.object,slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object,variant:s.oneOf(["menu","selectedMenu"])});const Mf=Fs;function If({className:e,commandHandler:t,menuDefinition:n,children:r}){var u;const[o,i]=z.useState(void 0),a=z.useCallback(d=>{d.preventDefault(),i(o===void 0?{mouseX:d.clientX+2,mouseY:d.clientY-6}:void 0)},[o]),l=z.useCallback(()=>{i(void 0)},[]),c=z.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((u=n==null?void 0:n.items)==null?void 0:u.length)??0)===0||!r?r:y.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:a,children:[r,y.jsx(Mf,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:y.jsx(lo,{menuDefinition:n,commandHandler:t,onClick:l})})]})}const jf=Ss(y.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function _f(e){return{preserveValue:!0,...e}}const qn=(e,t,n={})=>{const r=z.useRef(t);r.current=t;const o=z.useRef(n);o.current=_f(o.current);const[i,a]=z.useState(()=>r.current),[l,c]=z.useState(!0);return z.useEffect(()=>{let u=!0;return c(!!e),(async()=>{if(e){const d=await e();u&&(a(()=>d),c(!1))}})(),()=>{u=!1,o.current.preserveValue||a(()=>r.current)}},[e]),[i,l]};function Vs({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:i,ariaLabelPrefix:a,children:l}){const[c,u]=z.useState(!1),[d,m]=z.useState(!1),f=z.useCallback(()=>{c&&u(!1),m(!1)},[c]),b=z.useCallback(x=>{x.stopPropagation(),u(p=>{const S=!p;return S&&x.shiftKey?m(!0):S||m(!1),S})},[]),v=z.useCallback(x=>(f(),r(x)),[r,f]),[g,h]=z.useState({top:1,left:1});z.useEffect(()=>{if(c){const x=o==null?void 0:o.current;if(x){const p=x.getBoundingClientRect(),S=window.scrollY,P=window.scrollX,B=p.top+S+x.clientHeight,L=p.left+P;h({top:B,left:L})}}},[c,o]);const[E]=qn(z.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[I]=qn(z.useCallback(async()=>(e==null?void 0:e(!0))??n??E,[e,n,E,c]),n??E),w=d&&I?I:E;return y.jsxs(y.Fragment,{children:[y.jsx(pe.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${i??""}`,color:"inherit","aria-label":`${a??""} menu button`,onClick:b,children:l??y.jsx(jf,{})}),y.jsx(pe.Drawer,{className:`papi-menu-drawer ${i??""}`,anchor:"left",variant:"temporary",open:c,onClose:f,PaperProps:{className:"papi-menu-drawer-paper",style:{top:g.top,left:g.left}},children:w?y.jsx(Ns,{className:i,id:`${a??""} main menu`,commandHandler:v,multiColumnMenu:w}):void 0})]})}function Af({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:a="medium",className:l,onClick:c,children:u}){return y.jsx(pe.IconButton,{id:e,disabled:n,edge:i,size:a,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:u})}function hn({variant:e="outlined",id:t,isDisabled:n=!1,hasError:r=!1,isFullWidth:o=!1,helperText:i,label:a,placeholder:l,isRequired:c=!1,className:u,defaultValue:d,value:m,onChange:f,onFocus:b,onBlur:v}){return y.jsx(pe.TextField,{variant:e,id:t,disabled:n,error:r,fullWidth:o,helperText:i,label:a,placeholder:l,required:c,className:`papi-textfield ${u??""}`,defaultValue:d,value:m,onChange:f,onFocus:b,onBlur:v})}let wr;const Er=()=>(wr||(wr=se.allBookIds.map(e=>({bookId:e,label:se.bookIdToEnglishName(e)}))),wr);function Df({scrRef:e,handleSubmit:t,id:n}){const r=c=>{t(c)},o=(c,u)=>{const m={bookNum:se.bookIdToNumber(u.bookId),chapterNum:1,verseNum:1};r(m)},i=c=>{t({...e,chapterNum:+c.target.value})},a=c=>{t({...e,verseNum:+c.target.value})},l=z.useMemo(()=>Er()[e.bookNum-1],[e.bookNum]);return y.jsxs("span",{id:n,children:[y.jsx(An,{title:"Book",className:"papi-ref-selector book",value:l,options:Er(),onChange:o,isClearable:!1,width:200}),y.jsx(dt,{onClick:()=>r(we.offsetBook(e,-1)),isDisabled:e.bookNum<=we.FIRST_SCR_BOOK_NUM,children:"<"}),y.jsx(dt,{onClick:()=>r(we.offsetBook(e,1)),isDisabled:e.bookNum>=Er().length,children:">"}),y.jsx(hn,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),y.jsx(dt,{onClick:()=>t(we.offsetChapter(e,-1)),isDisabled:e.chapterNum<=we.FIRST_SCR_CHAPTER_NUM,children:"<"}),y.jsx(dt,{onClick:()=>t(we.offsetChapter(e,1)),isDisabled:e.chapterNum>=we.getChaptersForBook(e.bookNum),children:">"}),y.jsx(hn,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:a}),y.jsx(dt,{onClick:()=>t(we.offsetVerse(e,-1)),isDisabled:e.verseNum<=we.FIRST_SCR_VERSE_NUM,children:"<"}),y.jsx(dt,{onClick:()=>t(we.offsetVerse(e,1)),children:">"})]})}class Bf{constructor(){kt(this,"listeners",{})}addEventListener(t,n){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(n)}removeEventListener(t,n){var o;const r=(o=this.listeners[t])==null?void 0:o.indexOf(n);r!==void 0&&r!==-1&&this.listeners[t].splice(r,1)}dispatchEvent(t){const n=this.listeners[t.type];n&&n.forEach(r=>r(t))}}class Lf{constructor(t,n,r){kt(this,"id");kt(this,"checkDefinition");kt(this,"data");kt(this,"resultsUpdated");if(r)this.id=r.id,this.checkDefinition=r;else{if(!n)throw new Error("Either 'id' or 'checkDefinition' must be provided.");this.id=n}this.data=t,this.resultsUpdated=new Bf}updateData(t){this.data=t;const n=new CustomEvent("resultsUpdated",{detail:this});this.resultsUpdated.dispatchEvent(n)}addEventListener(t,n){this.resultsUpdated.addEventListener(t,n)}removeEventListener(t,n){this.resultsUpdated.removeEventListener(t,n)}}const It="scrBook",Ff="scrRef",_n="source",Vf="details",zf="Scripture Reference",Uf="Scripture Book",zs="Type",Hf="Details";function qf(e,t){const n=t??!1;return[{accessorFn:r=>`${se.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:It,header:(e==null?void 0:e.scriptureReferenceColumnName)??zf,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?se.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===It?we.format(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>we.compare(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>we.format(r.start),id:Ff,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:we.format(o.start)},sortingFn:(r,o)=>we.compare(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>typeof r.source=="object"&&"displayName"in r.source?r.source.displayName:r.source,id:_n,header:n?(e==null?void 0:e.typeColumnName)??zs:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,enableGrouping:!0},{accessorFn:r=>r.detail,id:Vf,header:(e==null?void 0:e.detailsColumnName)??Hf,cell:r=>r.getValue(),enableGrouping:!1}]}function Wf({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:i,detailsColumnName:a}){const[l,c]=z.useState([]),[u,d]=z.useState([{id:It,desc:!1}]),[m,f]=z.useState(()=>e.flatMap(x=>{const p=x.checkDefinition??x.id;return x.data.map(S=>({...S,source:p}))}));z.useEffect(()=>{const x=p=>{const{detail:S}=p,P=S,B=P.checkDefinition??P.id,L=P.data.map(D=>({...D,source:B}));S!==void 0&&f(D=>[...D.filter(R=>R.source!==B),...L])};return e.forEach(p=>{p.resultsUpdated.addEventListener("resultsUpdated",x)}),()=>{e.forEach(p=>{p.resultsUpdated.removeEventListener("resultsUpdated",x)})}},[e]);const b=z.useMemo(()=>qf({scriptureReferenceColumnName:r,typeColumnName:i,detailsColumnName:a},n),[r,i,a,n]),v=rt.useReactTable({data:m,columns:b,state:{grouping:l,sorting:u},onGroupingChange:c,onSortingChange:d,getExpandedRowModel:rt.getExpandedRowModel(),getGroupedRowModel:rt.getGroupedRowModel(),getCoreRowModel:rt.getCoreRowModel(),getSortedRowModel:rt.getSortedRowModel()}),g=o??Uf,h=i??zs,E=[{label:"No Grouping",value:[]},{label:`Group by ${g}`,value:[It]},{label:`Group by ${h}`,value:[_n]},{label:`Group by ${g} and ${h}`,value:[It,_n]},{label:`Group by ${h} and ${g}`,value:[_n,It]}],I=x=>{const p=JSON.parse(x.target.value);c(p)},w=(x,p)=>x.depth>=p.column.getIndex()?` indent${x.depth}`:"";return y.jsxs("div",{className:"p-2",children:[y.jsx("div",{className:"h-2"}),!t&&y.jsx("select",{onChange:I,children:E.map(x=>y.jsx("option",{value:JSON.stringify(x.value),children:x.label},x.label))}),y.jsxs("table",{children:[t&&y.jsx("thead",{children:v.getHeaderGroups().map(x=>y.jsx("tr",{children:x.headers.map(p=>y.jsx("th",{colSpan:p.colSpan,children:p.isPlaceholder?void 0:y.jsxs("div",{children:[p.column.getCanGroup()?y.jsx("button",{title:`Toggle grouping by ${p.column.columnDef.header}`,onClick:p.column.getToggleGroupingHandler(),style:{cursor:"pointer"},type:"button",children:p.column.getIsGrouped()?`🛑(${p.column.getGroupedIndex()}) `:"👊 "}):void 0," ",rt.flexRender(p.column.columnDef.header,p.getContext())]})},p.id))},x.id))}),y.jsx("tbody",{children:v.getRowModel().rows.map(x=>y.jsx("tr",{children:x.getVisibleCells().map(p=>{if(!(p.getIsPlaceholder()||p.column.columnDef.enableGrouping&&!p.getIsGrouped()))return y.jsx("td",{className:`${p.column.columnDef.id}${w(x,p)}`,children:(()=>p.getIsGrouped()?y.jsxs("button",{onClick:x.getToggleExpandedHandler(),style:{cursor:x.getCanExpand()?"pointer":"normal"},type:"button",children:[x.getIsExpanded()?"👇":"👉"," ",rt.flexRender(p.column.columnDef.cell,p.getContext())," (",x.subRows.length,")"]}):rt.flexRender(p.column.columnDef.cell,p.getContext()))()},p.id)})},x.id))})]})]})}function Gf({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=z.useState(""),i=a=>{o(a),e(a)};return y.jsx(pe.Paper,{component:"form",className:"search-bar-paper",children:y.jsx(hn,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:a=>i(a.target.value)})})}function Kf({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:a=!1,defaultValue:l,value:c,valueLabelDisplay:u="off",className:d,onChange:m,onChangeCommitted:f}){return y.jsx(pe.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:a,defaultValue:l,value:c,valueLabelDisplay:u,className:`papi-slider ${n} ${d??""}`,onChange:m,onChangeCommitted:f})}function Xf({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:a,children:l}){const c={action:(a==null?void 0:a.action)||l,message:a==null?void 0:a.message,className:r};return y.jsx(pe.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:c})}function Yf({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return y.jsx(pe.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function Ei({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return y.jsx(hn,{defaultValue:t[n.key],onChange:r})}const Jf=({onChange:e,disabled:t,checked:n,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return y.jsx(Ii,{...r,isChecked:n,isDisabled:t,onChange:o})};function Zf({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:a,defaultColumnSortable:l=!0,defaultColumnResizable:c=!0,rows:u,enableSelectColumn:d,selectColumnWidth:m=50,rowKeyGetter:f,rowHeight:b=35,headerRowHeight:v=35,selectedRows:g,onSelectedRowsChange:h,onRowsChange:E,onCellClick:I,onCellDoubleClick:w,onCellContextMenu:x,onCellKeyDown:p,direction:S="ltr",enableVirtualization:P=!0,onCopy:B,onPaste:L,onScroll:D,className:C,"data-testid":R}){const $=z.useMemo(()=>{const F=e.map(A=>typeof A.editable=="function"?{...A,editable:V=>!!A.editable(V),renderEditCell:A.renderEditCell||Ei}:A.editable&&!A.renderEditCell?{...A,renderEditCell:Ei}:A.renderEditCell&&!A.editable?{...A,editable:!1}:A);return d?[{...ko.SelectColumn,minWidth:m},...F]:F},[e,d,m]);return y.jsx(ko,{columns:$,defaultColumnOptions:{width:o,minWidth:i,maxWidth:a,sortable:l,resizable:c},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:u,rowKeyGetter:f,rowHeight:b,headerRowHeight:v,selectedRows:g,onSelectedRowsChange:h,onRowsChange:E,onCellClick:I,onCellDoubleClick:w,onCellContextMenu:x,onCellKeyDown:p,direction:S,enableVirtualization:P,onCopy:B,onPaste:L,onScroll:D,renderers:{renderCheckbox:Jf},className:`papi-table ${C??"rdg-light"}`,"data-testid":R})}function Qf({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const i=z.useRef(void 0);return y.jsx("div",{ref:i,style:{position:"relative"},children:y.jsx(pe.AppBar,{position:"static",id:r,children:y.jsxs(pe.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?y.jsx(Vs,{commandHandler:t,containerRef:i,menuProvider:e}):void 0,o?y.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const em=(e,t)=>{z.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Tr=()=>!1,tm=(e,t)=>{const[n]=qn(z.useCallback(async()=>{if(!e)return Tr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Tr,{preserveValue:!1});z.useEffect(()=>()=>{n!==Tr&&n()},[n])};exports.BookChapterControl=_a;exports.Button=dt;exports.ChapterRangeSelector=Aa;exports.Checkbox=Ii;exports.ComboBox=An;exports.ContextMenu=If;exports.GridMenu=Ns;exports.HamburgerMenuButton=Vs;exports.IconButton=Af;exports.LabelPosition=mt;exports.MenuItem=ao;exports.RefSelector=Df;exports.ResultsSource=Lf;exports.ScriptureRefKeyedList=Wf;exports.SearchBar=Gf;exports.Slider=Kf;exports.Snackbar=Xf;exports.Switch=Yf;exports.Table=Zf;exports.TextField=hn;exports.Toolbar=Qf;exports.useEvent=em;exports.useEventAsync=tm;exports.usePromise=qn;function nm(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}nm(`.papi-snackbar {
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
}
.papi-button {
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  line-height: 1;
}

.papi-button.primary {
  background-color: #1ea7fd;
  color: white;
}

.papi-button.secondary {
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.15) 0 0 0 1px inset;
  color: #333;
}

.papi-button.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-button.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}

.papi-button.video {
  background-color: red;
  color: white;
}

.papi-button.video a,
.papi-button.video a:visited {
  color: white;
  text-decoration: none;
}

.papi-button.video a:hover {
  color: white;
  text-decoration: underline;
}
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.basic-list-table {
  overflow: auto;

  .table-header {
    text-align: left;
  }
}

.basic-list-expand-button {
  cursor: pointer;
}

.indent1 {
  padding-left: 20px;
}

.indent2 {
  padding-left: 40px;
}
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
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
/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

/*
Remove the default font size and weight for headings.
*/

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

/*
Add the correct font weight in Edge and Safari.
*/

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

/*
Add the correct font size in all browsers.
*/

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

/*
Use the modern Firefox focus style for all focusable elements.
*/

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

/*
Add the correct display in Chrome and Safari.
*/

/*
Removes the default spacing and border for appropriate elements.
*/

/*
Reset default styling for dialogs.
*/

/*
Prevent resizing textareas horizontally by default.
*/

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

/*
Set the default cursor for buttons.
*/

/*
Make sure disabled buttons don't get the pointer cursor.
*/

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

/* Make elements with the HTML hidden attribute stay hidden by default */
  @font-face {
    font-family: 'Inter';
    font-display: 'swap';
    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
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
.pr-top-1\\/2 {
    top: 50%;
}
.pr-z-50 {
    z-index: 50;
}
.pr--mx-1 {
    margin-left: -0.25rem;
    margin-right: -0.25rem;
}
.pr-my-1 {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
}
.pr-ml-auto {
    margin-left: auto;
}
.pr-box-border {
    box-sizing: border-box;
}
.pr-inline-block {
    display: inline-block;
}
.pr-flex {
    display: flex;
}
.pr-h-10 {
    height: 2.5rem;
}
.pr-h-2 {
    height: 0.5rem;
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
.pr-h-px {
    height: 1px;
}
.pr-w-2 {
    width: 0.5rem;
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
.pr-w-full {
    width: 100%;
}
.pr-min-w-\\[8rem\\] {
    min-width: 8rem;
}
.pr--translate-y-1\\/2 {
    --tw-translate-y: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-transform {
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-cursor-default {
    cursor: default;
}
.pr-cursor-pointer {
    cursor: pointer;
}
.pr-select-none {
    user-select: none;
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
.pr-gap-2 {
    gap: 0.5rem;
}
.pr-gap-2\\.5 {
    gap: 0.625rem;
}
.pr-self-stretch {
    align-self: stretch;
}
.pr-overflow-hidden {
    overflow: hidden;
}
.pr-overflow-y-auto {
    overflow-y: auto;
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
.pr-border {
    border-width: 1px;
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
.pr-bg-muted {
    background-color: hsl(var(--muted));
}
.pr-bg-popover {
    background-color: hsl(var(--popover));
}
.pr-bg-white {
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.pr-fill-current {
    fill: currentColor;
}
.pr-p-1 {
    padding: 0.25rem;
}
.pr-p-2 {
    padding: 0.5rem;
}
.pr-px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}
.pr-px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
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
.pr-align-middle {
    vertical-align: middle;
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
.pr-text-gray-500 {
    --tw-text-opacity: 1;
    color: rgb(107 114 128 / var(--tw-text-opacity));
}
.pr-text-popover-foreground {
    color: hsl(var(--popover-foreground));
}
.pr-text-slate-700 {
    --tw-text-opacity: 1;
    color: rgb(51 65 85 / var(--tw-text-opacity));
}
.pr-text-slate-900 {
    --tw-text-opacity: 1;
    color: rgb(15 23 42 / var(--tw-text-opacity));
}
.pr-text-yellow-900 {
    --tw-text-opacity: 1;
    color: rgb(113 63 18 / var(--tw-text-opacity));
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
.pr-outline-none {
    outline: 2px solid transparent;
    outline-offset: 2px;
}
.pr-ring-offset-background {
    --tw-ring-offset-color: hsl(var(--background));
}
.pr-transition-colors {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
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
.focus\\:pr-bg-accent:focus {
    background-color: hsl(var(--accent));
}
.focus\\:pr-text-accent-foreground:focus {
    color: hsl(var(--accent-foreground));
}
.disabled\\:pr-cursor-not-allowed:disabled {
    cursor: not-allowed;
}
.disabled\\:pr-opacity-50:disabled {
    opacity: 0.5;
}
.data-\\[disabled\\]\\:pr-pointer-events-none[data-disabled] {
    pointer-events: none;
}
.data-\\[highlighted\\]\\:pr-bg-amber-100[data-highlighted] {
    --tw-bg-opacity: 1;
    background-color: rgb(254 243 199 / var(--tw-bg-opacity));
}
.data-\\[state\\=open\\]\\:pr-bg-accent[data-state=open] {
    background-color: hsl(var(--accent));
}
.data-\\[disabled\\]\\:pr-opacity-50[data-disabled] {
    opacity: 0.5;
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
@layer rdg {
  @layer Defaults,
    FocusSink,
    CheckboxInput,
    CheckboxIcon,
    CheckboxLabel,
    Cell,
    HeaderCell,
    SummaryCell,
    EditCell,
    Row,
    HeaderRow,
    SummaryRow,
    GroupedRow,
    Root;
}

.mlln6zg7-0-0-beta-42 {
  @layer rdg.MeasuringCell {
    contain: strict;
    grid-row: 1;
    visibility: hidden;
  }
}


.cj343x07-0-0-beta-42 {
  @layer rdg.Cell {
    /* max-content does not work with size containment
     * dynamically switching between different containment styles incurs a heavy relayout penalty
     * Chromium bug: at odd zoom levels or subpixel positioning,
     * layout/paint/style containment can make cell borders disappear
     *   https://bugs.chromium.org/p/chromium/issues/detail?id=1326946
     */
    position: relative; /* needed for absolute positioning to work */
    padding-block: 0;
    padding-inline: 8px;
    border-inline-end: 1px solid var(--rdg-border-color);
    border-block-end: 1px solid var(--rdg-border-color);
    grid-row-start: var(--rdg-grid-row-start);
    background-color: inherit;

    white-space: nowrap;
    overflow: clip;
    text-overflow: ellipsis;
    outline: none;

    &[aria-selected='true'] {
      outline: 2px solid var(--rdg-selection-color);
      outline-offset: -2px;
    }
  }
}

.csofj7r7-0-0-beta-42 {
  @layer rdg.Cell {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1;
  }
}

.ch2wcw87-0-0-beta-42 {
  @layer rdg.Cell {
    box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3);
  }
}


.c1bn88vv7-0-0-beta-42 {
  @layer rdg.CheckboxLabel {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    margin-inline-end: 1px; /* align checkbox in row group cell */
  }
}

.c1qt073l7-0-0-beta-42 {
  @layer rdg.CheckboxInput {
    all: unset;
  }
}

.cf71kmq7-0-0-beta-42 {
  @layer rdg.CheckboxIcon {
    content: '';
    inline-size: 20px;
    block-size: 20px;
    border: 2px solid var(--rdg-border-color);
    background-color: var(--rdg-background-color);

    .c1qt073l7-0-0-beta-42:checked + & {
      background-color: var(--rdg-checkbox-color);
      outline: 4px solid var(--rdg-background-color);
      outline-offset: -6px;
    }

    .c1qt073l7-0-0-beta-42:focus + & {
      border-color: var(--rdg-checkbox-focus-color);
    }
  }
}

.c1lwve4p7-0-0-beta-42 {
  @layer rdg.CheckboxLabel {
    cursor: default;

    .cf71kmq7-0-0-beta-42 {
      border-color: var(--rdg-checkbox-disabled-border-color);
      background-color: var(--rdg-checkbox-disabled-background-color);
    }
  }
}


.g1s9ylgp7-0-0-beta-42 {
  @layer rdg.GroupCellContent {
    outline: none;
  }
}

.cz54e4y7-0-0-beta-42 {
  @layer rdg.GroupCellCaret {
    margin-inline-start: 4px;
    stroke: currentColor;
    stroke-width: 1.5px;
    fill: transparent;
    vertical-align: middle;

    > path {
      transition: d 0.1s;
    }
  }
}


.c1w9bbhr7-0-0-beta-42 {
  @layer rdg.DragHandle {
    --rdg-drag-handle-size: 8px;
    z-index: 0;
    cursor: move;
    inline-size: var(--rdg-drag-handle-size);
    block-size: var(--rdg-drag-handle-size);
    background-color: var(--rdg-selection-color);
    place-self: end;

    &:hover {
      --rdg-drag-handle-size: 16px;
      border: 2px solid var(--rdg-selection-color);
      background-color: var(--rdg-background-color);
    }
  }
}

.c1creorc7-0-0-beta-42 {
  @layer rdg.DragHandle {
    z-index: 1;
    position: sticky;
  }
}


.cis5rrm7-0-0-beta-42 {
  @layer rdg.EditCell {
    padding: 0;
  }
}


.h44jtk67-0-0-beta-42 {
  @layer rdg.SortableHeaderCell {
    display: flex;
  }
}

.hcgkhxz7-0-0-beta-42 {
  @layer rdg.SortableHeaderCellName {
    flex-grow: 1;
    overflow: clip;
    text-overflow: ellipsis;
  }
}


.c6l2wv17-0-0-beta-42 {
  @layer rdg.HeaderCell {
    cursor: pointer;
  }
}

.c1kqdw7y7-0-0-beta-42 {
  @layer rdg.HeaderCell {
    touch-action: none;
  }
}

.r1y6ywlx7-0-0-beta-42 {
  @layer rdg.HeaderCell {
    cursor: col-resize;
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    inset-block-end: 0;
    inline-size: 10px;
  }
}

.c1bezg5o7-0-0-beta-42 {
  opacity: 0.5;
}

.c1vc96037-0-0-beta-42 {
  background-color: var(--rdg-header-draggable-background-color);
}


.r1upfr807-0-0-beta-42 {
  @layer rdg.Row {
    display: contents;
    line-height: var(--rdg-row-height);
    background-color: var(--rdg-background-color);

    &:hover {
      background-color: var(--rdg-row-hover-background-color);
    }

    &[aria-selected='true'] {
      background-color: var(--rdg-row-selected-background-color);

      &:hover {
        background-color: var(--rdg-row-selected-hover-background-color);
      }
    }
  }
}

.r190mhd37-0-0-beta-42 {
  @layer rdg.FocusSink {
    outline: 2px solid var(--rdg-selection-color);
    outline-offset: -2px;
  }
}

.r139qu9m7-0-0-beta-42 {
  @layer rdg.FocusSink {
    &::before {
      content: '';
      display: inline-block;
      height: 100%;
      position: sticky;
      inset-inline-start: 0;
      border-inline-start: 2px solid var(--rdg-selection-color);
    }
  }
}


.h10tskcx7-0-0-beta-42 {
  @layer rdg.HeaderRow {
    display: contents;
    line-height: var(--rdg-header-row-height);
    background-color: var(--rdg-header-background-color);
    font-weight: bold;

    & > .cj343x07-0-0-beta-42 {
      /* Should have a higher value than 1 to show up above regular cells and the focus sink */
      z-index: 2;
      position: sticky;
    }

    & > .csofj7r7-0-0-beta-42 {
      z-index: 3;
    }
  }
}


.c6ra8a37-0-0-beta-42 {
  @layer rdg.Cell {
    background-color: #ccccff;
  }
}

.cq910m07-0-0-beta-42 {
  @layer rdg.Cell {
    background-color: #ccccff;

    &.c6ra8a37-0-0-beta-42 {
      background-color: #9999ff;
    }
  }
}


.a3ejtar7-0-0-beta-42 {
  @layer rdg.SortIcon {
    fill: currentColor;

    > path {
      transition: d 0.1s;
    }
  }
}


.rnvodz57-0-0-beta-42 {
  @layer rdg.Defaults {
    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
  }

  @layer rdg.Root {
    --rdg-color: #000;   --rdg-border-color: #ddd;   --rdg-summary-border-color: #aaa;   --rdg-background-color: hsl(0deg 0% 100%);   --rdg-header-background-color: hsl(0deg 0% 97.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 90.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 96%);   --rdg-row-selected-background-color: hsl(207deg 76% 92%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 88%);   --rdg-checkbox-color: hsl(207deg 100% 29%);   --rdg-checkbox-focus-color: hsl(207deg 100% 69%);   --rdg-checkbox-disabled-border-color: #ccc;   --rdg-checkbox-disabled-background-color: #ddd;
    --rdg-selection-color: #66afe9;
    --rdg-font-size: 14px;

    display: grid;

    color-scheme: var(--rdg-color-scheme, light dark);

    /* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context */
    /* We set a stacking context so internal elements don't render on top of external elements. */
    /* size containment is not used as it could break "width: min-content" for example, and the grid would infinitely resize on Chromium browsers */
    contain: content;
    content-visibility: auto;
    block-size: 350px;
    border: 1px solid var(--rdg-border-color);
    box-sizing: border-box;
    overflow: auto;
    background-color: var(--rdg-background-color);
    color: var(--rdg-color);
    font-size: var(--rdg-font-size);

    /* needed on Firefox to fix scrollbars */
    &::before {
      content: '';
      grid-column: 1/-1;
      grid-row: 1/-1;
    }

    &.rdg-dark {
      --rdg-color-scheme: dark;
      --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 17.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
    }

    &.rdg-light {
      --rdg-color-scheme: light;
    }

    @media (prefers-color-scheme: dark) {
      &:not(.rdg-light) {
        --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 17.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
      }
    }
  }
}

.vlqv91k7-0-0-beta-42 {
  @layer rdg.Root {
    user-select: none;

    & .r1upfr807-0-0-beta-42 {
      cursor: move;
    }
  }
}

.f1lsfrzw7-0-0-beta-42 {
  @layer rdg.FocusSink {
    grid-column: 1/-1;
    pointer-events: none;
    /* Should have a higher value than 1 to show up above regular frozen cells */
    z-index: 1;
  }
}

.f1cte0lg7-0-0-beta-42 {
  @layer rdg.FocusSink {
    /* Should have a higher value than 3 to show up above header and summary rows */
    z-index: 3;
  }
}


.s8wc6fl7-0-0-beta-42 {
  @layer rdg.SummaryCell {
    inset-block-start: var(--rdg-summary-row-top);
    inset-block-end: var(--rdg-summary-row-bottom);
  }
}


.skuhp557-0-0-beta-42 {
  @layer rdg.SummaryRow {
    line-height: var(--rdg-summary-row-height);

    > .cj343x07-0-0-beta-42 {
      position: sticky;
    }
  }
}

.tf8l5ub7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      z-index: 2;
    }

    > .csofj7r7-0-0-beta-42 {
      z-index: 3;
    }
  }
}

.tb9ughf7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
  }
}

.b1yssfnt7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      border-block-start: 2px solid var(--rdg-summary-border-color);
    }
  }
}


.g1yxluv37-0-0-beta-42 {
  @layer rdg.GroupedRow {
    &:not([aria-selected='true']) {
      background-color: var(--rdg-header-background-color);
    }

    > .cj343x07-0-0-beta-42:not(:last-child):not(.ch2wcw87-0-0-beta-42) {
      border-inline-end: none;
    }
  }
}


.t7vyx3i7-0-0-beta-42 {
  @layer rdg.TextEditor {
    appearance: none;

    box-sizing: border-box;
    inline-size: 100%;
    block-size: 100%;
    padding-block: 0;
    padding-inline: 6px;
    border: 2px solid #ccc;
    vertical-align: top;
    color: var(--rdg-color);
    background-color: var(--rdg-background-color);

    font-family: inherit;
    font-size: var(--rdg-font-size);

    &:focus {
      border-color: var(--rdg-selection-color);
      outline: none;
    }

    &::placeholder {
      color: #999;
      opacity: 1;
    }
  }
}

`,"top");
//# sourceMappingURL=index.cjs.map
