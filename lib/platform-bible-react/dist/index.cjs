"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const v=require("react/jsx-runtime"),H=require("react"),Xe=require("platform-bible-utils"),as=require("@radix-ui/react-dropdown-menu"),Te=require("lucide-react"),ke=require("clsx"),tl=require("tailwind-merge"),me=require("@mui/material"),Wr=require("@mui/styled-engine"),un=require("react-dom"),ii=require("react-data-grid"),nl=require("@radix-ui/react-slot"),rl=require("class-variance-authority"),ol=require("@radix-ui/react-select");function or(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const C=or(H),xe=or(as),il=or(un),we=or(ol);var sl=Object.defineProperty,al=(e,t,n)=>t in e?sl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,oe=(e,t,n)=>(al(e,typeof t!="symbol"?t+"":t,n),n);const kt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],po=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ls=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],si=vl();function Xt(e,t=!0){return t&&(e=e.toUpperCase()),e in si?si[e]:0}function fo(e){return Xt(e)>0}function ll(e){const t=typeof e=="string"?Xt(e):e;return t>=40&&t<=66}function ul(e){return(typeof e=="string"?Xt(e):e)<=39}function us(e){return e<=66}function cl(e){const t=typeof e=="string"?Xt(e):e;return ps(t)&&!us(t)}function*dl(){for(let e=1;e<=kt.length;e++)yield e}const pl=1,cs=kt.length;function fl(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function go(e,t="***"){const n=e-1;return n<0||n>=kt.length?t:kt[n]}function ds(e){return e<=0||e>cs?"******":ls[e-1]}function gl(e){return ds(Xt(e))}function ps(e){const t=typeof e=="number"?go(e):e;return fo(t)&&!po.includes(t)}function ml(e){const t=typeof e=="number"?go(e):e;return fo(t)&&po.includes(t)}function hl(e){return ls[e-1].includes("*obsolete*")}function vl(){const e={};for(let t=0;t<kt.length;t++)e[kt[t]]=t+1;return e}const fe={allBookIds:kt,nonCanonicalIds:po,bookIdToNumber:Xt,isBookIdValid:fo,isBookNT:ll,isBookOT:ul,isBookOTNT:us,isBookDC:cl,allBookNumbers:dl,firstBook:pl,lastBook:cs,extraBooks:fl,bookNumberToId:go,bookNumberToEnglishName:ds,bookIdToEnglishName:gl,isCanonical:ps,isExtraMaterial:ml,isObsolete:hl};var pt=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(pt||{});const Ae=class{constructor(t){if(oe(this,"name"),oe(this,"fullPath"),oe(this,"isPresent"),oe(this,"hasVerseSegments"),oe(this,"isCustomized"),oe(this,"baseVersification"),oe(this,"scriptureBooks"),oe(this,"_type"),t!=null)typeof t=="string"?this.name=t:this._type=t;else throw new Error("Argument null")}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};oe(Ae,"Original",new Ae(pt.Original)),oe(Ae,"Septuagint",new Ae(pt.Septuagint)),oe(Ae,"Vulgate",new Ae(pt.Vulgate)),oe(Ae,"English",new Ae(pt.English)),oe(Ae,"RussianProtestant",new Ae(pt.RussianProtestant)),oe(Ae,"RussianOrthodox",new Ae(pt.RussianOrthodox));let Vt=Ae;function ai(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var fs=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(fs||{});const $e=class ae{constructor(t,n,r,o){if(oe(this,"firstChapter"),oe(this,"lastChapter"),oe(this,"lastVerse"),oe(this,"hasSegmentsDefined"),oe(this,"text"),oe(this,"BBBCCCVVVS"),oe(this,"longHashCode"),oe(this,"versification"),oe(this,"rtlMark","‏"),oe(this,"_bookNum",0),oe(this,"_chapterNum",0),oe(this,"_verseNum",0),oe(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,s=n!=null&&n instanceof Vt?n:void 0;this.setEmpty(s),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof Vt?n:void 0;this.setEmpty(i),this._verseNum=t%ae.chapterDigitShifter,this._chapterNum=Math.floor(t%ae.bookDigitShifter/ae.chapterDigitShifter),this._bookNum=Math.floor(t/ae.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ae){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof Vt?t:ae.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ae.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(t,n=ae.defaultVersification){const r=new ae(n);return r.parse(t),r}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=ae.parse(t),{success:!0,verseRef:n}}catch(r){if(r instanceof tn)return n=new ae,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ae.bcvMaxValue*ae.bookDigitShifter+(n>=0?n%ae.bcvMaxValue*ae.chapterDigitShifter:0)+(r>=0?r%ae.bcvMaxValue:0)}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>ae.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ae.verseRangeSeparator)||this._verse.includes(ae.verseSequenceIndicator))}get book(){return fe.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=fe.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ae.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ae.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>fe.lastBook)throw new tn("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Vt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ae.verseRangeSeparators,ae.verseSequenceIndicators)}get BBBCCC(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const s=+i[1].trim();this.versification=new Vt(pt[s])}catch{throw new tn("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new tn("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||fe.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ae.isVerseParseable(r[1]))throw new tn("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ae(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}equals(t){return t instanceof ae?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification):!1}allVerses(t=!1,n=ae.verseRangeSeparators,r=ae.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=ai(this._verse,r);for(const s of i.map(a=>ai(a,n))){const a=this.clone();a.verse=s[0];const u=a.verseNum;if(o.push(a),s.length>1){const c=this.clone();if(c.verse=s[1],!t)for(let d=u+1;d<c.verseNum;d++){const g=new ae(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(g)}o.push(c)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>fe.lastBook?2:(fe.isCanonical(this._bookNum),0)}setEmpty(t=ae.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=fe.bookIdToNumber(t),this.chapter=n,this.verse=r}};oe($e,"defaultVersification",Vt.English),oe($e,"verseRangeSeparator","-"),oe($e,"verseSequenceIndicator",","),oe($e,"verseRangeSeparators",[$e.verseRangeSeparator]),oe($e,"verseSequenceIndicators",[$e.verseSequenceIndicator]),oe($e,"chapterDigitShifter",1e3),oe($e,"bookDigitShifter",$e.chapterDigitShifter*$e.chapterDigitShifter),oe($e,"bcvMaxValue",$e.chapterDigitShifter-1),oe($e,"ValidStatusType",fs);class tn extends Error{}function pe(...e){return tl.twMerge(ke.clsx(e))}const mo=xe.Root,gs=xe.Trigger,bl=C.forwardRef(({className:e,inset:t,children:n,...r},o)=>v.jsxs(xe.SubTrigger,{ref:o,className:pe("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,v.jsx(Te.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));bl.displayName=xe.SubTrigger.displayName;const yl=C.forwardRef(({className:e,...t},n)=>v.jsx(xe.SubContent,{ref:n,className:pe("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));yl.displayName=xe.SubContent.displayName;const ir=C.forwardRef(({className:e,sideOffset:t=4,...n},r)=>v.jsx(xe.Portal,{children:v.jsx(xe.Content,{ref:r,sideOffset:t,className:pe("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));ir.displayName=xe.Content.displayName;const ms=C.forwardRef(({className:e,inset:t,...n},r)=>v.jsx(xe.Item,{ref:r,className:pe("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));ms.displayName=xe.Item.displayName;const ho=C.forwardRef(({className:e,children:t,checked:n,...r},o)=>v.jsxs(xe.CheckboxItem,{ref:o,className:pe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[v.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:v.jsx(xe.ItemIndicator,{children:v.jsx(Te.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));ho.displayName=xe.CheckboxItem.displayName;const wl=C.forwardRef(({className:e,children:t,...n},r)=>v.jsxs(xe.RadioItem,{ref:r,className:pe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[v.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:v.jsx(xe.ItemIndicator,{children:v.jsx(Te.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));wl.displayName=xe.RadioItem.displayName;const sr=C.forwardRef(({className:e,inset:t,...n},r)=>v.jsx(xe.Label,{ref:r,className:pe("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));sr.displayName=xe.Label.displayName;const vo=C.forwardRef(({className:e,...t},n)=>v.jsx(xe.Separator,{ref:n,className:pe("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));vo.displayName=xe.Separator.displayName;const bo=C.forwardRef(({className:e,type:t,...n},r)=>v.jsx("input",{type:t,className:pe("pr-flex pr-h-10 pr-w-full pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));bo.displayName="Input";const xl=H.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},i)=>v.jsxs("div",{className:"pr-relative",children:[v.jsx(bo,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r(),t(s)},onClick:n,ref:i}),v.jsx(Te.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function Sl({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const i=Array.from({length:t},(a,u)=>u+1),s=H.useCallback(a=>{o(a)},[o]);return v.jsx("div",{className:pe("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:i.map(a=>v.jsx("div",{className:pe("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":a===n,"pr-bg-amber-200":a===r}),onClick:u=>{u.preventDefault(),u.stopPropagation(),e(a)},role:"button",onKeyDown:u=>{u.key==="Enter"&&e(a)},tabIndex:0,onMouseMove:()=>s(a),children:a},a))})}const Cl=H.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:i,children:s},a)=>v.jsxs(ms,{ref:a,textValue:e,className:pe("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:u=>{u.preventDefault(),t()},onKeyDown:u=>{o(u)},onFocus:r,onMouseMove:r,children:[v.jsx("span",{className:pe("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":i.toLowerCase()==="ot","pr-border-l-purple-200":i.toLowerCase()==="nt","pr-border-l-indigo-200":i.toLowerCase()==="dc"}),children:fe.bookIdToEnglishName(e)}),n&&v.jsx("div",{children:s})]},e));function El({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return v.jsxs(sr,{className:"pr-flex pr-justify-between",children:[v.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),v.jsxs("div",{className:"pr-flex pr-items-center",children:[v.jsx(Te.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),v.jsx(Te.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),v.jsx(Te.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const fn=fe.allBookIds,Rl={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},li=["OT","NT","DC"],Tl=32+32+32,kl=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Pl=e=>({OT:fn.filter(n=>fe.isBookOT(n)),NT:fn.filter(n=>fe.isBookNT(n)),DC:fn.filter(n=>fe.isBookDC(n))})[e],nn=e=>Xe.getChaptersForBook(fe.bookIdToNumber(e));function Ol(){return fn.map(t=>fe.bookIdToEnglishName(t))}function _l(e){return Ol().includes(e)}function Nl(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(_l(t))return fn.find(r=>fe.bookIdToEnglishName(r)===t)}function $l({scrRef:e,handleSubmit:t}){const[n,r]=H.useState(""),[o,i]=H.useState(fe.bookNumberToId(e.bookNum)),[s,a]=H.useState(e.chapterNum??0),[u,c]=H.useState(fe.bookNumberToId(e.bookNum)),[d,g]=H.useState(!1),[f,p]=H.useState(d),m=H.useRef(void 0),h=H.useRef(void 0),b=H.useRef(void 0),w=H.useCallback(k=>Pl(k).filter($=>{const N=fe.bookIdToEnglishName($).toLowerCase(),V=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return N.includes(V)||$.toLowerCase().includes(V)}),[n]),P=k=>{r(k)},x=H.useRef(!1),S=H.useCallback(k=>{if(x.current){x.current=!1;return}g(k)},[]),y=H.useCallback((k,$,N,V)=>{if(a(fe.bookNumberToId(e.bookNum)!==k?1:e.chapterNum),$||nn(k)===-1){t({bookNum:fe.bookIdToNumber(k),chapterNum:N||1,verseNum:V||1}),g(!1),r("");return}i(o!==k?k:""),g(!$)},[t,e.bookNum,e.chapterNum,o]),T=k=>{k<=0||k>nn(o)||y(o,!0,k)},O=H.useCallback(()=>{kl.forEach(k=>{const $=n.match(k);if($){const[N,V=void 0,F=void 0]=$.slice(1),M=Nl(N);(fe.isBookIdValid(N)||M)&&y(M??N,!0,V?parseInt(V,10):1,F?parseInt(F,10):1)}})},[y,n]),A=H.useCallback(k=>{d?(k.key==="ArrowDown"||k.key==="ArrowUp")&&(typeof b<"u"&&b.current!==null?b.current.focus():typeof h<"u"&&h.current!==null&&h.current.focus(),k.preventDefault()):g(!0)},[d]),D=k=>{const{key:$}=k;$==="ArrowRight"||$==="ArrowLeft"||$==="ArrowDown"||$==="ArrowUp"||$==="Enter"||(m.current.dispatchEvent(new KeyboardEvent("keydown",{key:$})),m.current.focus())},L=k=>{const{key:$}=k;if(u===o){if($==="Enter"){k.preventDefault(),y(o,!0,s);return}let N=0;if($==="ArrowRight")if(s<nn(u))N=1;else{k.preventDefault();return}else if($==="ArrowLeft")if(s>1)N=-1;else{k.preventDefault();return}else $==="ArrowDown"?N=6:$==="ArrowUp"&&(N=-6);s+N<=0||s+N>nn(u)?a(0):N!==0&&(a(s+N),k.preventDefault())}};return H.useEffect(()=>{o===u?o===fe.bookNumberToId(e.bookNum)?a(e.chapterNum):a(1):a(0)},[u,e.bookNum,e.chapterNum,o]),H.useLayoutEffect(()=>{p(d)},[d]),H.useLayoutEffect(()=>{const k=setTimeout(()=>{if(f&&h.current&&b.current){const N=b.current.offsetTop-Tl;h.current.scrollTo({top:N,behavior:"instant"})}},10);return()=>{clearTimeout(k)}},[f]),v.jsx("div",{children:v.jsxs(mo,{modal:!1,open:d,onOpenChange:S,children:[v.jsx(gs,{asChild:!0,children:v.jsx(xl,{ref:m,value:n,handleSearch:P,handleKeyDown:A,handleOnClick:()=>{i(fe.bookNumberToId(e.bookNum)),c(fe.bookNumberToId(e.bookNum)),a(e.chapterNum>0?e.chapterNum:0),g(!0),m.current.focus()},onFocus:()=>{x.current=!0},handleSubmit:O,placeholder:`${fe.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),v.jsxs(ir,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:D,align:"start",ref:h,children:[v.jsx(El,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),li.map((k,$)=>w(k).length>0&&v.jsxs("div",{children:[v.jsx(sr,{className:"pr-font-semibold pr-text-slate-700",children:Rl[k]}),w(k).map(N=>v.jsx("div",{children:v.jsx(Cl,{bookId:N,handleSelectBook:()=>y(N,!1),isSelected:o===N,handleHighlightBook:()=>c(N),handleKeyDown:L,bookType:k,ref:V=>{o===N&&(b.current=V)},children:v.jsx(Sl,{handleSelectChapter:T,endChapter:nn(N),activeChapter:e.bookNum===fe.bookIdToNumber(N)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:V=>{a(V)}})})},N)),li.length-1!==$?v.jsx(vo,{}):void 0]},k))]})]})})}function xt({id:e,isDisabled:t=!1,className:n,onClick:r,onContextMenu:o,children:i}){return v.jsx(me.Button,{id:e,disabled:t,className:`papi-button ${n??""}`,onClick:r,onContextMenu:o,children:i})}function Xn({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:s,options:a=[],className:u,value:c,onChange:d,onFocus:g,onBlur:f,getOptionLabel:p}){return v.jsx(me.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:i,options:a,className:`papi-combo-box ${o?"error":""} ${u??""}`,value:c,onChange:d,onFocus:g,onBlur:f,getOptionLabel:p,renderInput:m=>v.jsx(me.TextField,{...m,error:o,fullWidth:i,disabled:n,label:t,style:{width:s}})})}function Ml({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o,chapterCount:i}){const s=H.useMemo(()=>Array.from({length:i},(c,d)=>d+1),[i]),a=(c,d)=>{n(d),d>t&&r(d)},u=(c,d)=>{r(d),d<e&&n(d)};return v.jsxs(v.Fragment,{children:[v.jsx(me.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:v.jsx(Xn,{onChange:(c,d)=>a(c,d),className:"book-selection-chapter",isClearable:!1,options:s,getOptionLabel:c=>c.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),v.jsx(me.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:v.jsx(Xn,{onChange:(c,d)=>u(c,d),className:"book-selection-chapter",isClearable:!1,options:s,getOptionLabel:c=>c.toString(),value:t,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var Et=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Et||{});function hs({id:e,isChecked:t,labelText:n="",labelPosition:r=Et.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:s=!1,hasError:a=!1,className:u,onChange:c}){const d=v.jsx(me.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:s,className:`papi-checkbox ${a?"error":""} ${u??""}`,onChange:c});let g;if(n){const f=r===Et.Before||r===Et.Above,p=v.jsx("span",{className:`papi-checkbox-label ${a?"error":""} ${u??""}`,children:n}),m=r===Et.Before||r===Et.After,h=m?p:v.jsx("div",{children:p}),b=m?d:v.jsx("div",{children:d});g=v.jsxs(me.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:a,children:[f&&h,b,!f&&h]})}else g=d;return g}function ge(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function E(){return E=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},E.apply(this,arguments)}function Il(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function jl(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Xr={exports:{}},jn={exports:{}},le={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ui;function Fl(){if(ui)return le;ui=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,a=e?Symbol.for("react.context"):60110,u=e?Symbol.for("react.async_mode"):60111,c=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,g=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,p=e?Symbol.for("react.memo"):60115,m=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,P=e?Symbol.for("react.scope"):60119;function x(y){if(typeof y=="object"&&y!==null){var T=y.$$typeof;switch(T){case t:switch(y=y.type,y){case u:case c:case r:case i:case o:case g:return y;default:switch(y=y&&y.$$typeof,y){case a:case d:case m:case p:case s:return y;default:return T}}case n:return T}}}function S(y){return x(y)===c}return le.AsyncMode=u,le.ConcurrentMode=c,le.ContextConsumer=a,le.ContextProvider=s,le.Element=t,le.ForwardRef=d,le.Fragment=r,le.Lazy=m,le.Memo=p,le.Portal=n,le.Profiler=i,le.StrictMode=o,le.Suspense=g,le.isAsyncMode=function(y){return S(y)||x(y)===u},le.isConcurrentMode=S,le.isContextConsumer=function(y){return x(y)===a},le.isContextProvider=function(y){return x(y)===s},le.isElement=function(y){return typeof y=="object"&&y!==null&&y.$$typeof===t},le.isForwardRef=function(y){return x(y)===d},le.isFragment=function(y){return x(y)===r},le.isLazy=function(y){return x(y)===m},le.isMemo=function(y){return x(y)===p},le.isPortal=function(y){return x(y)===n},le.isProfiler=function(y){return x(y)===i},le.isStrictMode=function(y){return x(y)===o},le.isSuspense=function(y){return x(y)===g},le.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===r||y===c||y===i||y===o||y===g||y===f||typeof y=="object"&&y!==null&&(y.$$typeof===m||y.$$typeof===p||y.$$typeof===s||y.$$typeof===a||y.$$typeof===d||y.$$typeof===b||y.$$typeof===w||y.$$typeof===P||y.$$typeof===h)},le.typeOf=x,le}var ue={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ci;function Al(){return ci||(ci=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,a=e?Symbol.for("react.context"):60110,u=e?Symbol.for("react.async_mode"):60111,c=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,g=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,p=e?Symbol.for("react.memo"):60115,m=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,P=e?Symbol.for("react.scope"):60119;function x(I){return typeof I=="string"||typeof I=="function"||I===r||I===c||I===i||I===o||I===g||I===f||typeof I=="object"&&I!==null&&(I.$$typeof===m||I.$$typeof===p||I.$$typeof===s||I.$$typeof===a||I.$$typeof===d||I.$$typeof===b||I.$$typeof===w||I.$$typeof===P||I.$$typeof===h)}function S(I){if(typeof I=="object"&&I!==null){var ee=I.$$typeof;switch(ee){case t:var _=I.type;switch(_){case u:case c:case r:case i:case o:case g:return _;default:var se=_&&_.$$typeof;switch(se){case a:case d:case m:case p:case s:return se;default:return ee}}case n:return ee}}}var y=u,T=c,O=a,A=s,D=t,L=d,k=r,$=m,N=p,V=n,F=i,M=o,B=g,ne=!1;function te(I){return ne||(ne=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),R(I)||S(I)===u}function R(I){return S(I)===c}function j(I){return S(I)===a}function G(I){return S(I)===s}function K(I){return typeof I=="object"&&I!==null&&I.$$typeof===t}function z(I){return S(I)===d}function U(I){return S(I)===r}function W(I){return S(I)===m}function X(I){return S(I)===p}function q(I){return S(I)===n}function Y(I){return S(I)===i}function Q(I){return S(I)===o}function ie(I){return S(I)===g}ue.AsyncMode=y,ue.ConcurrentMode=T,ue.ContextConsumer=O,ue.ContextProvider=A,ue.Element=D,ue.ForwardRef=L,ue.Fragment=k,ue.Lazy=$,ue.Memo=N,ue.Portal=V,ue.Profiler=F,ue.StrictMode=M,ue.Suspense=B,ue.isAsyncMode=te,ue.isConcurrentMode=R,ue.isContextConsumer=j,ue.isContextProvider=G,ue.isElement=K,ue.isForwardRef=z,ue.isFragment=U,ue.isLazy=W,ue.isMemo=X,ue.isPortal=q,ue.isProfiler=Y,ue.isStrictMode=Q,ue.isSuspense=ie,ue.isValidElementType=x,ue.typeOf=S}()),ue}var di;function vs(){return di||(di=1,process.env.NODE_ENV==="production"?jn.exports=Fl():jn.exports=Al()),jn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Rr,pi;function Dl(){if(pi)return Rr;pi=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var s={},a=0;a<10;a++)s["_"+String.fromCharCode(a)]=a;var u=Object.getOwnPropertyNames(s).map(function(d){return s[d]});if(u.join("")!=="0123456789")return!1;var c={};return"abcdefghijklmnopqrst".split("").forEach(function(d){c[d]=d}),Object.keys(Object.assign({},c)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Rr=o()?Object.assign:function(i,s){for(var a,u=r(i),c,d=1;d<arguments.length;d++){a=Object(arguments[d]);for(var g in a)t.call(a,g)&&(u[g]=a[g]);if(e){c=e(a);for(var f=0;f<c.length;f++)n.call(a,c[f])&&(u[c[f]]=a[c[f]])}}return u},Rr}var Tr,fi;function yo(){if(fi)return Tr;fi=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Tr=e,Tr}var kr,gi;function bs(){return gi||(gi=1,kr=Function.call.bind(Object.prototype.hasOwnProperty)),kr}var Pr,mi;function Vl(){if(mi)return Pr;mi=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=yo(),n={},r=bs();e=function(i){var s="Warning: "+i;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(i,s,a,u,c){if(process.env.NODE_ENV!=="production"){for(var d in i)if(r(i,d)){var g;try{if(typeof i[d]!="function"){var f=Error((u||"React class")+": "+a+" type `"+d+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[d]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw f.name="Invariant Violation",f}g=i[d](s,d,u,a,null,t)}catch(m){g=m}if(g&&!(g instanceof Error)&&e((u||"React class")+": type specification of "+a+" `"+d+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof g+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),g instanceof Error&&!(g.message in n)){n[g.message]=!0;var p=c?c():"";e("Failed "+a+" type: "+g.message+(p??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Pr=o,Pr}var Or,hi;function Ll(){if(hi)return Or;hi=1;var e=vs(),t=Dl(),n=yo(),r=bs(),o=Vl(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(a){var u="Warning: "+a;typeof console<"u"&&console.error(u);try{throw new Error(u)}catch{}});function s(){return null}return Or=function(a,u){var c=typeof Symbol=="function"&&Symbol.iterator,d="@@iterator";function g(R){var j=R&&(c&&R[c]||R[d]);if(typeof j=="function")return j}var f="<<anonymous>>",p={array:w("array"),bigint:w("bigint"),bool:w("boolean"),func:w("function"),number:w("number"),object:w("object"),string:w("string"),symbol:w("symbol"),any:P(),arrayOf:x,element:S(),elementType:y(),instanceOf:T,node:L(),objectOf:A,oneOf:O,oneOfType:D,shape:$,exact:N};function m(R,j){return R===j?R!==0||1/R===1/j:R!==R&&j!==j}function h(R,j){this.message=R,this.data=j&&typeof j=="object"?j:{},this.stack=""}h.prototype=Error.prototype;function b(R){if(process.env.NODE_ENV!=="production")var j={},G=0;function K(U,W,X,q,Y,Q,ie){if(q=q||f,Q=Q||X,ie!==n){if(u){var I=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw I.name="Invariant Violation",I}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var ee=q+":"+X;!j[ee]&&G<3&&(i("You are manually calling a React.PropTypes validation function for the `"+Q+"` prop on `"+q+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),j[ee]=!0,G++)}}return W[X]==null?U?W[X]===null?new h("The "+Y+" `"+Q+"` is marked as required "+("in `"+q+"`, but its value is `null`.")):new h("The "+Y+" `"+Q+"` is marked as required in "+("`"+q+"`, but its value is `undefined`.")):null:R(W,X,q,Y,Q)}var z=K.bind(null,!1);return z.isRequired=K.bind(null,!0),z}function w(R){function j(G,K,z,U,W,X){var q=G[K],Y=M(q);if(Y!==R){var Q=B(q);return new h("Invalid "+U+" `"+W+"` of type "+("`"+Q+"` supplied to `"+z+"`, expected ")+("`"+R+"`."),{expectedType:R})}return null}return b(j)}function P(){return b(s)}function x(R){function j(G,K,z,U,W){if(typeof R!="function")return new h("Property `"+W+"` of component `"+z+"` has invalid PropType notation inside arrayOf.");var X=G[K];if(!Array.isArray(X)){var q=M(X);return new h("Invalid "+U+" `"+W+"` of type "+("`"+q+"` supplied to `"+z+"`, expected an array."))}for(var Y=0;Y<X.length;Y++){var Q=R(X,Y,z,U,W+"["+Y+"]",n);if(Q instanceof Error)return Q}return null}return b(j)}function S(){function R(j,G,K,z,U){var W=j[G];if(!a(W)){var X=M(W);return new h("Invalid "+z+" `"+U+"` of type "+("`"+X+"` supplied to `"+K+"`, expected a single ReactElement."))}return null}return b(R)}function y(){function R(j,G,K,z,U){var W=j[G];if(!e.isValidElementType(W)){var X=M(W);return new h("Invalid "+z+" `"+U+"` of type "+("`"+X+"` supplied to `"+K+"`, expected a single ReactElement type."))}return null}return b(R)}function T(R){function j(G,K,z,U,W){if(!(G[K]instanceof R)){var X=R.name||f,q=te(G[K]);return new h("Invalid "+U+" `"+W+"` of type "+("`"+q+"` supplied to `"+z+"`, expected ")+("instance of `"+X+"`."))}return null}return b(j)}function O(R){if(!Array.isArray(R))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),s;function j(G,K,z,U,W){for(var X=G[K],q=0;q<R.length;q++)if(m(X,R[q]))return null;var Y=JSON.stringify(R,function(ie,I){var ee=B(I);return ee==="symbol"?String(I):I});return new h("Invalid "+U+" `"+W+"` of value `"+String(X)+"` "+("supplied to `"+z+"`, expected one of "+Y+"."))}return b(j)}function A(R){function j(G,K,z,U,W){if(typeof R!="function")return new h("Property `"+W+"` of component `"+z+"` has invalid PropType notation inside objectOf.");var X=G[K],q=M(X);if(q!=="object")return new h("Invalid "+U+" `"+W+"` of type "+("`"+q+"` supplied to `"+z+"`, expected an object."));for(var Y in X)if(r(X,Y)){var Q=R(X,Y,z,U,W+"."+Y,n);if(Q instanceof Error)return Q}return null}return b(j)}function D(R){if(!Array.isArray(R))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var j=0;j<R.length;j++){var G=R[j];if(typeof G!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ne(G)+" at index "+j+"."),s}function K(z,U,W,X,q){for(var Y=[],Q=0;Q<R.length;Q++){var ie=R[Q],I=ie(z,U,W,X,q,n);if(I==null)return null;I.data&&r(I.data,"expectedType")&&Y.push(I.data.expectedType)}var ee=Y.length>0?", expected one of type ["+Y.join(", ")+"]":"";return new h("Invalid "+X+" `"+q+"` supplied to "+("`"+W+"`"+ee+"."))}return b(K)}function L(){function R(j,G,K,z,U){return V(j[G])?null:new h("Invalid "+z+" `"+U+"` supplied to "+("`"+K+"`, expected a ReactNode."))}return b(R)}function k(R,j,G,K,z){return new h((R||"React class")+": "+j+" type `"+G+"."+K+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+z+"`.")}function $(R){function j(G,K,z,U,W){var X=G[K],q=M(X);if(q!=="object")return new h("Invalid "+U+" `"+W+"` of type `"+q+"` "+("supplied to `"+z+"`, expected `object`."));for(var Y in R){var Q=R[Y];if(typeof Q!="function")return k(z,U,W,Y,B(Q));var ie=Q(X,Y,z,U,W+"."+Y,n);if(ie)return ie}return null}return b(j)}function N(R){function j(G,K,z,U,W){var X=G[K],q=M(X);if(q!=="object")return new h("Invalid "+U+" `"+W+"` of type `"+q+"` "+("supplied to `"+z+"`, expected `object`."));var Y=t({},G[K],R);for(var Q in Y){var ie=R[Q];if(r(R,Q)&&typeof ie!="function")return k(z,U,W,Q,B(ie));if(!ie)return new h("Invalid "+U+" `"+W+"` key `"+Q+"` supplied to `"+z+"`.\nBad object: "+JSON.stringify(G[K],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(R),null,"  "));var I=ie(X,Q,z,U,W+"."+Q,n);if(I)return I}return null}return b(j)}function V(R){switch(typeof R){case"number":case"string":case"undefined":return!0;case"boolean":return!R;case"object":if(Array.isArray(R))return R.every(V);if(R===null||a(R))return!0;var j=g(R);if(j){var G=j.call(R),K;if(j!==R.entries){for(;!(K=G.next()).done;)if(!V(K.value))return!1}else for(;!(K=G.next()).done;){var z=K.value;if(z&&!V(z[1]))return!1}}else return!1;return!0;default:return!1}}function F(R,j){return R==="symbol"?!0:j?j["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&j instanceof Symbol:!1}function M(R){var j=typeof R;return Array.isArray(R)?"array":R instanceof RegExp?"object":F(j,R)?"symbol":j}function B(R){if(typeof R>"u"||R===null)return""+R;var j=M(R);if(j==="object"){if(R instanceof Date)return"date";if(R instanceof RegExp)return"regexp"}return j}function ne(R){var j=B(R);switch(j){case"array":case"object":return"an "+j;case"boolean":case"date":case"regexp":return"a "+j;default:return j}}function te(R){return!R.constructor||!R.constructor.name?f:R.constructor.name}return p.checkPropTypes=o,p.resetWarningCache=o.resetWarningCache,p.PropTypes=p,p},Or}var _r,vi;function Bl(){if(vi)return _r;vi=1;var e=yo();function t(){}function n(){}return n.resetWarningCache=t,_r=function(){function r(s,a,u,c,d,g){if(g!==e){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},_r}if(process.env.NODE_ENV!=="production"){var zl=vs(),Hl=!0;Xr.exports=Ll()(zl.isElement,Hl)}else Xr.exports=Bl()();var Gl=Xr.exports;const l=Il(Gl);function Kt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function Rt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function ys(e){if(!Rt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=ys(e[n])}),t}function it(e,t,n={clone:!0}){const r=n.clone?E({},e):e;return Rt(e)&&Rt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Rt(t[o])&&o in e&&Rt(e[o])?r[o]=it(e[o],t[o],n):n.clone?r[o]=Rt(t[o])?ys(t[o]):t[o]:r[o]=t[o])}),r}function Ul(e){const{prototype:t={}}=e;return!!t.isReactComponent}function ws(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let a;const u=i.type;return typeof u=="function"&&!Ul(u)&&(a="Did you accidentally use a plain function component for an element instead?"),a!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const xs=Kt(l.element,ws);xs.isRequired=Kt(l.element.isRequired,ws);const Rn=xs;function ql(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Wl(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let a;return typeof i=="function"&&!ql(i)&&(a="Did you accidentally provide a plain function component instead?"),a!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Xl=Kt(l.elementType,Wl),Kl="exact-prop: ​";function Ss(e){return process.env.NODE_ENV==="production"?e:E({},e,{[Kl]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function zt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Kr={exports:{}},ce={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bi;function Yl(){if(bi)return ce;bi=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),a=Symbol.for("react.server_context"),u=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),g=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),p=Symbol.for("react.offscreen"),m;m=Symbol.for("react.module.reference");function h(b){if(typeof b=="object"&&b!==null){var w=b.$$typeof;switch(w){case e:switch(b=b.type,b){case n:case o:case r:case c:case d:return b;default:switch(b=b&&b.$$typeof,b){case a:case s:case u:case f:case g:case i:return b;default:return w}}case t:return w}}}return ce.ContextConsumer=s,ce.ContextProvider=i,ce.Element=e,ce.ForwardRef=u,ce.Fragment=n,ce.Lazy=f,ce.Memo=g,ce.Portal=t,ce.Profiler=o,ce.StrictMode=r,ce.Suspense=c,ce.SuspenseList=d,ce.isAsyncMode=function(){return!1},ce.isConcurrentMode=function(){return!1},ce.isContextConsumer=function(b){return h(b)===s},ce.isContextProvider=function(b){return h(b)===i},ce.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===e},ce.isForwardRef=function(b){return h(b)===u},ce.isFragment=function(b){return h(b)===n},ce.isLazy=function(b){return h(b)===f},ce.isMemo=function(b){return h(b)===g},ce.isPortal=function(b){return h(b)===t},ce.isProfiler=function(b){return h(b)===o},ce.isStrictMode=function(b){return h(b)===r},ce.isSuspense=function(b){return h(b)===c},ce.isSuspenseList=function(b){return h(b)===d},ce.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===n||b===o||b===r||b===c||b===d||b===p||typeof b=="object"&&b!==null&&(b.$$typeof===f||b.$$typeof===g||b.$$typeof===i||b.$$typeof===s||b.$$typeof===u||b.$$typeof===m||b.getModuleId!==void 0)},ce.typeOf=h,ce}var de={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yi;function Jl(){return yi||(yi=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),a=Symbol.for("react.server_context"),u=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),g=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),p=Symbol.for("react.offscreen"),m=!1,h=!1,b=!1,w=!1,P=!1,x;x=Symbol.for("react.module.reference");function S(_){return!!(typeof _=="string"||typeof _=="function"||_===n||_===o||P||_===r||_===c||_===d||w||_===p||m||h||b||typeof _=="object"&&_!==null&&(_.$$typeof===f||_.$$typeof===g||_.$$typeof===i||_.$$typeof===s||_.$$typeof===u||_.$$typeof===x||_.getModuleId!==void 0))}function y(_){if(typeof _=="object"&&_!==null){var se=_.$$typeof;switch(se){case e:var Ce=_.type;switch(Ce){case n:case o:case r:case c:case d:return Ce;default:var _e=Ce&&Ce.$$typeof;switch(_e){case a:case s:case u:case f:case g:case i:return _e;default:return se}}case t:return se}}}var T=s,O=i,A=e,D=u,L=n,k=f,$=g,N=t,V=o,F=r,M=c,B=d,ne=!1,te=!1;function R(_){return ne||(ne=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function j(_){return te||(te=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function G(_){return y(_)===s}function K(_){return y(_)===i}function z(_){return typeof _=="object"&&_!==null&&_.$$typeof===e}function U(_){return y(_)===u}function W(_){return y(_)===n}function X(_){return y(_)===f}function q(_){return y(_)===g}function Y(_){return y(_)===t}function Q(_){return y(_)===o}function ie(_){return y(_)===r}function I(_){return y(_)===c}function ee(_){return y(_)===d}de.ContextConsumer=T,de.ContextProvider=O,de.Element=A,de.ForwardRef=D,de.Fragment=L,de.Lazy=k,de.Memo=$,de.Portal=N,de.Profiler=V,de.StrictMode=F,de.Suspense=M,de.SuspenseList=B,de.isAsyncMode=R,de.isConcurrentMode=j,de.isContextConsumer=G,de.isContextProvider=K,de.isElement=z,de.isForwardRef=U,de.isFragment=W,de.isLazy=X,de.isMemo=q,de.isPortal=Y,de.isProfiler=Q,de.isStrictMode=ie,de.isSuspense=I,de.isSuspenseList=ee,de.isValidElementType=S,de.typeOf=y}()),de}process.env.NODE_ENV==="production"?Kr.exports=Yl():Kr.exports=Jl();var Kn=Kr.exports;const Zl=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Ql(e){const t=`${e}`.match(Zl);return t&&t[1]||""}function Cs(e,t=""){return e.displayName||e.name||Ql(e)||t}function wi(e,t,n){const r=Cs(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function eu(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Cs(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Kn.ForwardRef:return wi(e,e.render,"ForwardRef");case Kn.Memo:return wi(e,e.type,"memo");default:return}}}function st(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],s=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const tu=l.oneOfType([l.func,l.object]),wo=tu;function Je(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":zt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Yr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Es(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function nu(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,s)=>{const a=o||"<<anonymous>>",u=s||r;return typeof n[r]<"u"?new Error(`The ${i} \`${u}\` of \`${a}\` is deprecated. ${t}`):null}}function ru(e,t){var n,r;return C.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Pe(e){return e&&e.ownerDocument||document}function Ht(e){return Pe(e).defaultView||window}function ou(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?E({},t.propTypes):null;return o=>(i,s,a,u,c,...d)=>{const g=c||s,f=n==null?void 0:n[g];if(f){const p=f(i,s,a,u,c,...d);if(p)return p}return typeof i[s]<"u"&&!i[o]?new Error(`The prop \`${g}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Yn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const iu=typeof window<"u"?C.useLayoutEffect:C.useEffect,Pt=iu;let xi=0;function su(e){const[t,n]=C.useState(e),r=e||t;return C.useEffect(()=>{t==null&&(xi+=1,n(`mui-${xi}`))},[t]),r}const Si=C["useId".toString()];function Rs(e){if(Si!==void 0){const t=Si();return e??t}return su(e)}function au(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function Ts({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=C.useRef(e!==void 0),[i,s]=C.useState(t),a=o?e:i;if(process.env.NODE_ENV!=="production"){C.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:c}=C.useRef(t);C.useEffect(()=>{!o&&c!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const u=C.useCallback(c=>{o||s(c)},[]);return[a,u]}function yn(e){const t=C.useRef(e);return Pt(()=>{t.current=e}),C.useRef((...n)=>(0,t.current)(...n)).current}function Ge(...e){return C.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Yn(n,t)})},e)}const Ci={};function lu(e,t){const n=C.useRef(Ci);return n.current===Ci&&(n.current=e(t)),n}const uu=[];function cu(e){C.useEffect(e,uu)}class Tn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Tn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function cn(){const e=lu(Tn.create).current;return cu(e.disposeEffect),e}let ar=!0,Jr=!1;const du=new Tn,pu={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function fu(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&pu[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function gu(e){e.metaKey||e.altKey||e.ctrlKey||(ar=!0)}function Nr(){ar=!1}function mu(){this.visibilityState==="hidden"&&Jr&&(ar=!0)}function hu(e){e.addEventListener("keydown",gu,!0),e.addEventListener("mousedown",Nr,!0),e.addEventListener("pointerdown",Nr,!0),e.addEventListener("touchstart",Nr,!0),e.addEventListener("visibilitychange",mu,!0)}function vu(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return ar||fu(t)}function ks(){const e=C.useCallback(o=>{o!=null&&hu(o.ownerDocument)},[]),t=C.useRef(!1);function n(){return t.current?(Jr=!0,du.start(100,()=>{Jr=!1}),t.current=!1,!0):!1}function r(o){return vu(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Ps(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function bu(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function yu(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const wu=Number.isInteger||yu;function Os(e,t,n,r){const o=e[t];if(o==null||!wu(o)){const i=bu(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function _s(e,t,...n){return e[t]===void 0?null:Os(e,t,...n)}function Zr(){return null}_s.isRequired=Os;Zr.isRequired=Zr;const Ns=process.env.NODE_ENV==="production"?Zr:_s;function $s(e,t){const n=E({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=E({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=E({},i),Object.keys(o).forEach(s=>{n[r][s]=$s(o[s],i[s])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function ut(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,s)=>{if(s){const a=t(s);a!==""&&i.push(a),n&&n[s]&&i.push(n[s])}return i},[]).join(" ")}),r}const Ei=e=>e,xu=()=>{let e=Ei;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Ei}}},Su=xu(),Ms=Su,Is={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Qe(e,t,n="Mui"){const r=Is[t];return r?`${n}-${r}`:`${Ms.generate(e)}-${t}`}function ht(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=Qe(e,o,n)}),r}function Cu(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function js(e){return typeof e=="string"}function dn(e,t,n){return e===void 0||js(e)?t:E({},t,{ownerState:E({},t.ownerState,n)})}const Eu={disableDefaultClasses:!1},Ru=C.createContext(Eu);function Tu(e){const{disableDefaultClasses:t}=C.useContext(Ru);return n=>t?"":e(n)}function Fs(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function ku(e,t,n){return typeof e=="function"?e(t,n):e}function Ri(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function Pu(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const p=ke(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),m=E({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),h=E({},n,o,r);return p.length>0&&(h.className=p),Object.keys(m).length>0&&(h.style=m),{props:h,internalRef:void 0}}const s=Fs(E({},o,r)),a=Ri(r),u=Ri(o),c=t(s),d=ke(c==null?void 0:c.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),g=E({},c==null?void 0:c.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=E({},c,n,u,a);return d.length>0&&(f.className=d),Object.keys(g).length>0&&(f.style=g),{props:f,internalRef:c.ref}}const Ou=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Ot(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,s=ge(e,Ou),a=i?{}:ku(r,o),{props:u,internalRef:c}=Pu(E({},s,{externalSlotProps:a})),d=Ge(c,a==null?void 0:a.ref,(t=e.additionalProps)==null?void 0:t.ref);return dn(n,E({},u,{ref:d}),o)}const As="base";function _u(e){return`${As}--${e}`}function Nu(e,t){return`${As}-${e}-${t}`}function Ds(e,t){const n=Is[t];return n?_u(n):Nu(e,t)}function $u(e,t){const n={};return t.forEach(r=>{n[r]=Ds(e,r)}),n}const Mu=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Iu(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function ju(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Fu(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||ju(e))}function Au(e){const t=[],n=[];return Array.from(e.querySelectorAll(Mu)).forEach((r,o)=>{const i=Iu(r);i===-1||!Fu(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function Du(){return!0}function Jn(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=Au,isEnabled:s=Du,open:a}=e,u=C.useRef(!1),c=C.useRef(null),d=C.useRef(null),g=C.useRef(null),f=C.useRef(null),p=C.useRef(!1),m=C.useRef(null),h=Ge(t.ref,m),b=C.useRef(null);C.useEffect(()=>{!a||!m.current||(p.current=!n)},[n,a]),C.useEffect(()=>{if(!a||!m.current)return;const x=Pe(m.current);return m.current.contains(x.activeElement)||(m.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),m.current.setAttribute("tabIndex","-1")),p.current&&m.current.focus()),()=>{o||(g.current&&g.current.focus&&(u.current=!0,g.current.focus()),g.current=null)}},[a]),C.useEffect(()=>{if(!a||!m.current)return;const x=Pe(m.current),S=O=>{b.current=O,!(r||!s()||O.key!=="Tab")&&x.activeElement===m.current&&O.shiftKey&&(u.current=!0,d.current&&d.current.focus())},y=()=>{const O=m.current;if(O===null)return;if(!x.hasFocus()||!s()||u.current){u.current=!1;return}if(O.contains(x.activeElement)||r&&x.activeElement!==c.current&&x.activeElement!==d.current)return;if(x.activeElement!==f.current)f.current=null;else if(f.current!==null)return;if(!p.current)return;let A=[];if((x.activeElement===c.current||x.activeElement===d.current)&&(A=i(m.current)),A.length>0){var D,L;const k=!!((D=b.current)!=null&&D.shiftKey&&((L=b.current)==null?void 0:L.key)==="Tab"),$=A[0],N=A[A.length-1];typeof $!="string"&&typeof N!="string"&&(k?N.focus():$.focus())}else O.focus()};x.addEventListener("focusin",y),x.addEventListener("keydown",S,!0);const T=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(T),x.removeEventListener("focusin",y),x.removeEventListener("keydown",S,!0)}},[n,r,o,s,a,i]);const w=x=>{g.current===null&&(g.current=x.relatedTarget),p.current=!0,f.current=x.target;const S=t.props.onFocus;S&&S(x)},P=x=>{g.current===null&&(g.current=x.relatedTarget),p.current=!0};return v.jsxs(C.Fragment,{children:[v.jsx("div",{tabIndex:a?0:-1,onFocus:P,ref:c,"data-testid":"sentinelStart"}),C.cloneElement(t,{ref:h,onFocus:w}),v.jsx("div",{tabIndex:a?0:-1,onFocus:P,ref:d,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(Jn.propTypes={children:Rn,disableAutoFocus:l.bool,disableEnforceFocus:l.bool,disableRestoreFocus:l.bool,getTabbable:l.func,isEnabled:l.func,open:l.bool.isRequired});process.env.NODE_ENV!=="production"&&(Jn["propTypes"]=Ss(Jn.propTypes));function Vu(e){return typeof e=="function"?e():e}const wn=C.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[s,a]=C.useState(null),u=Ge(C.isValidElement(r)?r.ref:null,n);if(Pt(()=>{i||a(Vu(o)||document.body)},[o,i]),Pt(()=>{if(s&&!i)return Yn(n,s),()=>{Yn(n,null)}},[n,s,i]),i){if(C.isValidElement(r)){const c={ref:u};return C.cloneElement(r,c)}return v.jsx(C.Fragment,{children:r})}return v.jsx(C.Fragment,{children:s&&il.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&(wn.propTypes={children:l.node,container:l.oneOfType([st,l.func]),disablePortal:l.bool});process.env.NODE_ENV!=="production"&&(wn["propTypes"]=Ss(wn.propTypes));function Lu(e){const t=Pe(e);return t.body===e?Ht(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function gn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Ti(e){return parseInt(Ht(e).getComputedStyle(e).paddingRight,10)||0}function Bu(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function ki(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,s=>{const a=i.indexOf(s)===-1,u=!Bu(s);a&&u&&gn(s,o)})}function $r(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function zu(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(Lu(r)){const s=Ps(Pe(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Ti(r)+s}px`;const a=Pe(r).querySelectorAll(".mui-fixed");[].forEach.call(a,u=>{n.push({value:u.style.paddingRight,property:"padding-right",el:u}),u.style.paddingRight=`${Ti(u)+s}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=Pe(r).body;else{const s=r.parentElement,a=Ht(r);i=(s==null?void 0:s.nodeName)==="HTML"&&a.getComputedStyle(s).overflowY==="scroll"?s:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:s,property:a})=>{i?s.style.setProperty(a,i):s.style.removeProperty(a)})}}function Hu(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class Gu{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&gn(t.modalRef,!1);const o=Hu(n);ki(n,t.mount,t.modalRef,o,!0);const i=$r(this.containers,s=>s.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=$r(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=zu(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=$r(this.containers,s=>s.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&gn(t.modalRef,n),ki(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=i.modals[i.modals.length-1];s.modalRef&&gn(s.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Uu(e){return typeof e=="function"?e():e}function qu(e){return e?e.props.hasOwnProperty("in"):!1}const Wu=new Gu;function Xu(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Wu,closeAfterTransition:i=!1,onTransitionEnter:s,onTransitionExited:a,children:u,onClose:c,open:d,rootRef:g}=e,f=C.useRef({}),p=C.useRef(null),m=C.useRef(null),h=Ge(m,g),[b,w]=C.useState(!d),P=qu(u);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const S=()=>Pe(p.current),y=()=>(f.current.modalRef=m.current,f.current.mount=p.current,f.current),T=()=>{o.mount(y(),{disableScrollLock:r}),m.current&&(m.current.scrollTop=0)},O=yn(()=>{const M=Uu(t)||S().body;o.add(y(),M),m.current&&T()}),A=C.useCallback(()=>o.isTopModal(y()),[o]),D=yn(M=>{p.current=M,M&&(d&&A()?T():m.current&&gn(m.current,x))}),L=C.useCallback(()=>{o.remove(y(),x)},[x,o]);C.useEffect(()=>()=>{L()},[L]),C.useEffect(()=>{d?O():(!P||!i)&&L()},[d,L,P,i,O]);const k=M=>B=>{var ne;(ne=M.onKeyDown)==null||ne.call(M,B),!(B.key!=="Escape"||B.which===229||!A())&&(n||(B.stopPropagation(),c&&c(B,"escapeKeyDown")))},$=M=>B=>{var ne;(ne=M.onClick)==null||ne.call(M,B),B.target===B.currentTarget&&c&&c(B,"backdropClick")};return{getRootProps:(M={})=>{const B=Fs(e);delete B.onTransitionEnter,delete B.onTransitionExited;const ne=E({},B,M);return E({role:"presentation"},ne,{onKeyDown:k(ne),ref:h})},getBackdropProps:(M={})=>{const B=M;return E({"aria-hidden":!0},B,{onClick:$(B),open:d})},getTransitionProps:()=>{const M=()=>{w(!1),s&&s()},B=()=>{w(!0),a&&a(),i&&L()};return{onEnter:Yr(M,u==null?void 0:u.props.onEnter),onExited:Yr(B,u==null?void 0:u.props.onExited)}},rootRef:h,portalRef:D,isTopModal:A,exited:b,hasTransition:P}}var Me="top",Ue="bottom",qe="right",Ie="left",xo="auto",kn=[Me,Ue,qe,Ie],Gt="start",xn="end",Ku="clippingParents",Vs="viewport",rn="popper",Yu="reference",Pi=kn.reduce(function(e,t){return e.concat([t+"-"+Gt,t+"-"+xn])},[]),Ls=[].concat(kn,[xo]).reduce(function(e,t){return e.concat([t,t+"-"+Gt,t+"-"+xn])},[]),Ju="beforeRead",Zu="read",Qu="afterRead",ec="beforeMain",tc="main",nc="afterMain",rc="beforeWrite",oc="write",ic="afterWrite",sc=[Ju,Zu,Qu,ec,tc,nc,rc,oc,ic];function Ze(e){return e?(e.nodeName||"").toLowerCase():null}function Ve(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function _t(e){var t=Ve(e).Element;return e instanceof t||e instanceof Element}function He(e){var t=Ve(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function So(e){if(typeof ShadowRoot>"u")return!1;var t=Ve(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function ac(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!He(i)||!Ze(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(s){var a=o[s];a===!1?i.removeAttribute(s):i.setAttribute(s,a===!0?"":a)}))})}function lc(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},s=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),a=s.reduce(function(u,c){return u[c]="",u},{});!He(o)||!Ze(o)||(Object.assign(o.style,a),Object.keys(i).forEach(function(u){o.removeAttribute(u)}))})}}const uc={name:"applyStyles",enabled:!0,phase:"write",fn:ac,effect:lc,requires:["computeStyles"]};function Ye(e){return e.split("-")[0]}var Tt=Math.max,Zn=Math.min,Ut=Math.round;function Qr(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Bs(){return!/^((?!chrome|android).)*safari/i.test(Qr())}function qt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&He(e)&&(o=e.offsetWidth>0&&Ut(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&Ut(r.height)/e.offsetHeight||1);var s=_t(e)?Ve(e):window,a=s.visualViewport,u=!Bs()&&n,c=(r.left+(u&&a?a.offsetLeft:0))/o,d=(r.top+(u&&a?a.offsetTop:0))/i,g=r.width/o,f=r.height/i;return{width:g,height:f,top:d,right:c+g,bottom:d+f,left:c,x:c,y:d}}function Co(e){var t=qt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function zs(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&So(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function at(e){return Ve(e).getComputedStyle(e)}function cc(e){return["table","td","th"].indexOf(Ze(e))>=0}function vt(e){return((_t(e)?e.ownerDocument:e.document)||window.document).documentElement}function lr(e){return Ze(e)==="html"?e:e.assignedSlot||e.parentNode||(So(e)?e.host:null)||vt(e)}function Oi(e){return!He(e)||at(e).position==="fixed"?null:e.offsetParent}function dc(e){var t=/firefox/i.test(Qr()),n=/Trident/i.test(Qr());if(n&&He(e)){var r=at(e);if(r.position==="fixed")return null}var o=lr(e);for(So(o)&&(o=o.host);He(o)&&["html","body"].indexOf(Ze(o))<0;){var i=at(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function Pn(e){for(var t=Ve(e),n=Oi(e);n&&cc(n)&&at(n).position==="static";)n=Oi(n);return n&&(Ze(n)==="html"||Ze(n)==="body"&&at(n).position==="static")?t:n||dc(e)||t}function Eo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function mn(e,t,n){return Tt(e,Zn(t,n))}function pc(e,t,n){var r=mn(e,t,n);return r>n?n:r}function Hs(){return{top:0,right:0,bottom:0,left:0}}function Gs(e){return Object.assign({},Hs(),e)}function Us(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var fc=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Gs(typeof t!="number"?t:Us(t,kn))};function gc(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,s=n.modifiersData.popperOffsets,a=Ye(n.placement),u=Eo(a),c=[Ie,qe].indexOf(a)>=0,d=c?"height":"width";if(!(!i||!s)){var g=fc(o.padding,n),f=Co(i),p=u==="y"?Me:Ie,m=u==="y"?Ue:qe,h=n.rects.reference[d]+n.rects.reference[u]-s[u]-n.rects.popper[d],b=s[u]-n.rects.reference[u],w=Pn(i),P=w?u==="y"?w.clientHeight||0:w.clientWidth||0:0,x=h/2-b/2,S=g[p],y=P-f[d]-g[m],T=P/2-f[d]/2+x,O=mn(S,T,y),A=u;n.modifiersData[r]=(t={},t[A]=O,t.centerOffset=O-T,t)}}function mc(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||zs(t.elements.popper,o)&&(t.elements.arrow=o))}const hc={name:"arrow",enabled:!0,phase:"main",fn:gc,effect:mc,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Wt(e){return e.split("-")[1]}var vc={top:"auto",right:"auto",bottom:"auto",left:"auto"};function bc(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Ut(n*o)/o||0,y:Ut(r*o)/o||0}}function _i(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,s=e.offsets,a=e.position,u=e.gpuAcceleration,c=e.adaptive,d=e.roundOffsets,g=e.isFixed,f=s.x,p=f===void 0?0:f,m=s.y,h=m===void 0?0:m,b=typeof d=="function"?d({x:p,y:h}):{x:p,y:h};p=b.x,h=b.y;var w=s.hasOwnProperty("x"),P=s.hasOwnProperty("y"),x=Ie,S=Me,y=window;if(c){var T=Pn(n),O="clientHeight",A="clientWidth";if(T===Ve(n)&&(T=vt(n),at(T).position!=="static"&&a==="absolute"&&(O="scrollHeight",A="scrollWidth")),T=T,o===Me||(o===Ie||o===qe)&&i===xn){S=Ue;var D=g&&T===y&&y.visualViewport?y.visualViewport.height:T[O];h-=D-r.height,h*=u?1:-1}if(o===Ie||(o===Me||o===Ue)&&i===xn){x=qe;var L=g&&T===y&&y.visualViewport?y.visualViewport.width:T[A];p-=L-r.width,p*=u?1:-1}}var k=Object.assign({position:a},c&&vc),$=d===!0?bc({x:p,y:h},Ve(n)):{x:p,y:h};if(p=$.x,h=$.y,u){var N;return Object.assign({},k,(N={},N[S]=P?"0":"",N[x]=w?"0":"",N.transform=(y.devicePixelRatio||1)<=1?"translate("+p+"px, "+h+"px)":"translate3d("+p+"px, "+h+"px, 0)",N))}return Object.assign({},k,(t={},t[S]=P?h+"px":"",t[x]=w?p+"px":"",t.transform="",t))}function yc(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,s=i===void 0?!0:i,a=n.roundOffsets,u=a===void 0?!0:a,c={placement:Ye(t.placement),variation:Wt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,_i(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:u})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,_i(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:u})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const wc={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:yc,data:{}};var Fn={passive:!0};function xc(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,s=r.resize,a=s===void 0?!0:s,u=Ve(t.elements.popper),c=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&c.forEach(function(d){d.addEventListener("scroll",n.update,Fn)}),a&&u.addEventListener("resize",n.update,Fn),function(){i&&c.forEach(function(d){d.removeEventListener("scroll",n.update,Fn)}),a&&u.removeEventListener("resize",n.update,Fn)}}const Sc={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:xc,data:{}};var Cc={left:"right",right:"left",bottom:"top",top:"bottom"};function Hn(e){return e.replace(/left|right|bottom|top/g,function(t){return Cc[t]})}var Ec={start:"end",end:"start"};function Ni(e){return e.replace(/start|end/g,function(t){return Ec[t]})}function Ro(e){var t=Ve(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function To(e){return qt(vt(e)).left+Ro(e).scrollLeft}function Rc(e,t){var n=Ve(e),r=vt(e),o=n.visualViewport,i=r.clientWidth,s=r.clientHeight,a=0,u=0;if(o){i=o.width,s=o.height;var c=Bs();(c||!c&&t==="fixed")&&(a=o.offsetLeft,u=o.offsetTop)}return{width:i,height:s,x:a+To(e),y:u}}function Tc(e){var t,n=vt(e),r=Ro(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=Tt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=Tt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),a=-r.scrollLeft+To(e),u=-r.scrollTop;return at(o||n).direction==="rtl"&&(a+=Tt(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:s,x:a,y:u}}function ko(e){var t=at(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function qs(e){return["html","body","#document"].indexOf(Ze(e))>=0?e.ownerDocument.body:He(e)&&ko(e)?e:qs(lr(e))}function hn(e,t){var n;t===void 0&&(t=[]);var r=qs(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=Ve(r),s=o?[i].concat(i.visualViewport||[],ko(r)?r:[]):r,a=t.concat(s);return o?a:a.concat(hn(lr(s)))}function eo(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function kc(e,t){var n=qt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function $i(e,t,n){return t===Vs?eo(Rc(e,n)):_t(t)?kc(t,n):eo(Tc(vt(e)))}function Pc(e){var t=hn(lr(e)),n=["absolute","fixed"].indexOf(at(e).position)>=0,r=n&&He(e)?Pn(e):e;return _t(r)?t.filter(function(o){return _t(o)&&zs(o,r)&&Ze(o)!=="body"}):[]}function Oc(e,t,n,r){var o=t==="clippingParents"?Pc(e):[].concat(t),i=[].concat(o,[n]),s=i[0],a=i.reduce(function(u,c){var d=$i(e,c,r);return u.top=Tt(d.top,u.top),u.right=Zn(d.right,u.right),u.bottom=Zn(d.bottom,u.bottom),u.left=Tt(d.left,u.left),u},$i(e,s,r));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function Ws(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ye(r):null,i=r?Wt(r):null,s=t.x+t.width/2-n.width/2,a=t.y+t.height/2-n.height/2,u;switch(o){case Me:u={x:s,y:t.y-n.height};break;case Ue:u={x:s,y:t.y+t.height};break;case qe:u={x:t.x+t.width,y:a};break;case Ie:u={x:t.x-n.width,y:a};break;default:u={x:t.x,y:t.y}}var c=o?Eo(o):null;if(c!=null){var d=c==="y"?"height":"width";switch(i){case Gt:u[c]=u[c]-(t[d]/2-n[d]/2);break;case xn:u[c]=u[c]+(t[d]/2-n[d]/2);break}}return u}function Sn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,s=i===void 0?e.strategy:i,a=n.boundary,u=a===void 0?Ku:a,c=n.rootBoundary,d=c===void 0?Vs:c,g=n.elementContext,f=g===void 0?rn:g,p=n.altBoundary,m=p===void 0?!1:p,h=n.padding,b=h===void 0?0:h,w=Gs(typeof b!="number"?b:Us(b,kn)),P=f===rn?Yu:rn,x=e.rects.popper,S=e.elements[m?P:f],y=Oc(_t(S)?S:S.contextElement||vt(e.elements.popper),u,d,s),T=qt(e.elements.reference),O=Ws({reference:T,element:x,strategy:"absolute",placement:o}),A=eo(Object.assign({},x,O)),D=f===rn?A:T,L={top:y.top-D.top+w.top,bottom:D.bottom-y.bottom+w.bottom,left:y.left-D.left+w.left,right:D.right-y.right+w.right},k=e.modifiersData.offset;if(f===rn&&k){var $=k[o];Object.keys(L).forEach(function(N){var V=[qe,Ue].indexOf(N)>=0?1:-1,F=[Me,Ue].indexOf(N)>=0?"y":"x";L[N]+=$[F]*V})}return L}function _c(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,s=n.padding,a=n.flipVariations,u=n.allowedAutoPlacements,c=u===void 0?Ls:u,d=Wt(r),g=d?a?Pi:Pi.filter(function(m){return Wt(m)===d}):kn,f=g.filter(function(m){return c.indexOf(m)>=0});f.length===0&&(f=g);var p=f.reduce(function(m,h){return m[h]=Sn(e,{placement:h,boundary:o,rootBoundary:i,padding:s})[Ye(h)],m},{});return Object.keys(p).sort(function(m,h){return p[m]-p[h]})}function Nc(e){if(Ye(e)===xo)return[];var t=Hn(e);return[Ni(e),t,Ni(t)]}function $c(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,a=s===void 0?!0:s,u=n.fallbackPlacements,c=n.padding,d=n.boundary,g=n.rootBoundary,f=n.altBoundary,p=n.flipVariations,m=p===void 0?!0:p,h=n.allowedAutoPlacements,b=t.options.placement,w=Ye(b),P=w===b,x=u||(P||!m?[Hn(b)]:Nc(b)),S=[b].concat(x).reduce(function(z,U){return z.concat(Ye(U)===xo?_c(t,{placement:U,boundary:d,rootBoundary:g,padding:c,flipVariations:m,allowedAutoPlacements:h}):U)},[]),y=t.rects.reference,T=t.rects.popper,O=new Map,A=!0,D=S[0],L=0;L<S.length;L++){var k=S[L],$=Ye(k),N=Wt(k)===Gt,V=[Me,Ue].indexOf($)>=0,F=V?"width":"height",M=Sn(t,{placement:k,boundary:d,rootBoundary:g,altBoundary:f,padding:c}),B=V?N?qe:Ie:N?Ue:Me;y[F]>T[F]&&(B=Hn(B));var ne=Hn(B),te=[];if(i&&te.push(M[$]<=0),a&&te.push(M[B]<=0,M[ne]<=0),te.every(function(z){return z})){D=k,A=!1;break}O.set(k,te)}if(A)for(var R=m?3:1,j=function(U){var W=S.find(function(X){var q=O.get(X);if(q)return q.slice(0,U).every(function(Y){return Y})});if(W)return D=W,"break"},G=R;G>0;G--){var K=j(G);if(K==="break")break}t.placement!==D&&(t.modifiersData[r]._skip=!0,t.placement=D,t.reset=!0)}}const Mc={name:"flip",enabled:!0,phase:"main",fn:$c,requiresIfExists:["offset"],data:{_skip:!1}};function Mi(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Ii(e){return[Me,qe,Ue,Ie].some(function(t){return e[t]>=0})}function Ic(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,s=Sn(t,{elementContext:"reference"}),a=Sn(t,{altBoundary:!0}),u=Mi(s,r),c=Mi(a,o,i),d=Ii(u),g=Ii(c);t.modifiersData[n]={referenceClippingOffsets:u,popperEscapeOffsets:c,isReferenceHidden:d,hasPopperEscaped:g},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":d,"data-popper-escaped":g})}const jc={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Ic};function Fc(e,t,n){var r=Ye(e),o=[Ie,Me].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,s=i[0],a=i[1];return s=s||0,a=(a||0)*o,[Ie,qe].indexOf(r)>=0?{x:a,y:s}:{x:s,y:a}}function Ac(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,s=Ls.reduce(function(d,g){return d[g]=Fc(g,t.rects,i),d},{}),a=s[t.placement],u=a.x,c=a.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=u,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=s}const Dc={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Ac};function Vc(e){var t=e.state,n=e.name;t.modifiersData[n]=Ws({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Lc={name:"popperOffsets",enabled:!0,phase:"read",fn:Vc,data:{}};function Bc(e){return e==="x"?"y":"x"}function zc(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,a=s===void 0?!1:s,u=n.boundary,c=n.rootBoundary,d=n.altBoundary,g=n.padding,f=n.tether,p=f===void 0?!0:f,m=n.tetherOffset,h=m===void 0?0:m,b=Sn(t,{boundary:u,rootBoundary:c,padding:g,altBoundary:d}),w=Ye(t.placement),P=Wt(t.placement),x=!P,S=Eo(w),y=Bc(S),T=t.modifiersData.popperOffsets,O=t.rects.reference,A=t.rects.popper,D=typeof h=="function"?h(Object.assign({},t.rects,{placement:t.placement})):h,L=typeof D=="number"?{mainAxis:D,altAxis:D}:Object.assign({mainAxis:0,altAxis:0},D),k=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,$={x:0,y:0};if(T){if(i){var N,V=S==="y"?Me:Ie,F=S==="y"?Ue:qe,M=S==="y"?"height":"width",B=T[S],ne=B+b[V],te=B-b[F],R=p?-A[M]/2:0,j=P===Gt?O[M]:A[M],G=P===Gt?-A[M]:-O[M],K=t.elements.arrow,z=p&&K?Co(K):{width:0,height:0},U=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Hs(),W=U[V],X=U[F],q=mn(0,O[M],z[M]),Y=x?O[M]/2-R-q-W-L.mainAxis:j-q-W-L.mainAxis,Q=x?-O[M]/2+R+q+X+L.mainAxis:G+q+X+L.mainAxis,ie=t.elements.arrow&&Pn(t.elements.arrow),I=ie?S==="y"?ie.clientTop||0:ie.clientLeft||0:0,ee=(N=k==null?void 0:k[S])!=null?N:0,_=B+Y-ee-I,se=B+Q-ee,Ce=mn(p?Zn(ne,_):ne,B,p?Tt(te,se):te);T[S]=Ce,$[S]=Ce-B}if(a){var _e,ye=S==="x"?Me:Ie,yt=S==="x"?Ue:qe,Ne=T[y],et=y==="y"?"height":"width",je=Ne+b[ye],tt=Ne-b[yt],Ee=[Me,Ie].indexOf(w)!==-1,$t=(_e=k==null?void 0:k[y])!=null?_e:0,wt=Ee?je:Ne-O[et]-A[et]-$t+L.altAxis,Yt=Ee?Ne+O[et]+A[et]-$t-L.altAxis:tt,$n=p&&Ee?pc(wt,Ne,Yt):mn(p?wt:je,Ne,p?Yt:tt);T[y]=$n,$[y]=$n-Ne}t.modifiersData[r]=$}}const Hc={name:"preventOverflow",enabled:!0,phase:"main",fn:zc,requiresIfExists:["offset"]};function Gc(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Uc(e){return e===Ve(e)||!He(e)?Ro(e):Gc(e)}function qc(e){var t=e.getBoundingClientRect(),n=Ut(t.width)/e.offsetWidth||1,r=Ut(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Wc(e,t,n){n===void 0&&(n=!1);var r=He(t),o=He(t)&&qc(t),i=vt(t),s=qt(e,o,n),a={scrollLeft:0,scrollTop:0},u={x:0,y:0};return(r||!r&&!n)&&((Ze(t)!=="body"||ko(i))&&(a=Uc(t)),He(t)?(u=qt(t,!0),u.x+=t.clientLeft,u.y+=t.clientTop):i&&(u.x=To(i))),{x:s.left+a.scrollLeft-u.x,y:s.top+a.scrollTop-u.y,width:s.width,height:s.height}}function Xc(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var s=[].concat(i.requires||[],i.requiresIfExists||[]);s.forEach(function(a){if(!n.has(a)){var u=t.get(a);u&&o(u)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function Kc(e){var t=Xc(e);return sc.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Yc(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Jc(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var ji={placement:"bottom",modifiers:[],strategy:"absolute"};function Fi(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Zc(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?ji:o;return function(a,u,c){c===void 0&&(c=i);var d={placement:"bottom",orderedModifiers:[],options:Object.assign({},ji,i),modifiersData:{},elements:{reference:a,popper:u},attributes:{},styles:{}},g=[],f=!1,p={state:d,setOptions:function(w){var P=typeof w=="function"?w(d.options):w;h(),d.options=Object.assign({},i,d.options,P),d.scrollParents={reference:_t(a)?hn(a):a.contextElement?hn(a.contextElement):[],popper:hn(u)};var x=Kc(Jc([].concat(r,d.options.modifiers)));return d.orderedModifiers=x.filter(function(S){return S.enabled}),m(),p.update()},forceUpdate:function(){if(!f){var w=d.elements,P=w.reference,x=w.popper;if(Fi(P,x)){d.rects={reference:Wc(P,Pn(x),d.options.strategy==="fixed"),popper:Co(x)},d.reset=!1,d.placement=d.options.placement,d.orderedModifiers.forEach(function(L){return d.modifiersData[L.name]=Object.assign({},L.data)});for(var S=0;S<d.orderedModifiers.length;S++){if(d.reset===!0){d.reset=!1,S=-1;continue}var y=d.orderedModifiers[S],T=y.fn,O=y.options,A=O===void 0?{}:O,D=y.name;typeof T=="function"&&(d=T({state:d,options:A,name:D,instance:p})||d)}}}},update:Yc(function(){return new Promise(function(b){p.forceUpdate(),b(d)})}),destroy:function(){h(),f=!0}};if(!Fi(a,u))return p;p.setOptions(c).then(function(b){!f&&c.onFirstUpdate&&c.onFirstUpdate(b)});function m(){d.orderedModifiers.forEach(function(b){var w=b.name,P=b.options,x=P===void 0?{}:P,S=b.effect;if(typeof S=="function"){var y=S({state:d,name:w,instance:p,options:x}),T=function(){};g.push(y||T)}})}function h(){g.forEach(function(b){return b()}),g=[]}return p}}var Qc=[Sc,Lc,wc,uc,Dc,Mc,Hc,hc,jc],ed=Zc({defaultModifiers:Qc});const Xs="Popper";function td(e){return Ds(Xs,e)}$u(Xs,["root"]);const nd=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],rd=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function od(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function Qn(e){return typeof e=="function"?e():e}function ur(e){return e.nodeType!==void 0}function id(e){return!ur(e)}const sd=()=>ut({root:["root"]},Tu(td)),ad={},ld=C.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:s,disablePortal:a,modifiers:u,open:c,placement:d,popperOptions:g,popperRef:f,slotProps:p={},slots:m={},TransitionProps:h}=t,b=ge(t,nd),w=C.useRef(null),P=Ge(w,n),x=C.useRef(null),S=Ge(x,f),y=C.useRef(S);Pt(()=>{y.current=S},[S]),C.useImperativeHandle(f,()=>x.current,[]);const T=od(d,s),[O,A]=C.useState(T),[D,L]=C.useState(Qn(o));C.useEffect(()=>{x.current&&x.current.forceUpdate()}),C.useEffect(()=>{o&&L(Qn(o))},[o]),Pt(()=>{if(!D||!c)return;const F=ne=>{A(ne.placement)};if(process.env.NODE_ENV!=="production"&&D&&ur(D)&&D.nodeType===1){const ne=D.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ne.top===0&&ne.left===0&&ne.right===0&&ne.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let M=[{name:"preventOverflow",options:{altBoundary:a}},{name:"flip",options:{altBoundary:a}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ne})=>{F(ne)}}];u!=null&&(M=M.concat(u)),g&&g.modifiers!=null&&(M=M.concat(g.modifiers));const B=ed(D,w.current,E({placement:T},g,{modifiers:M}));return y.current(B),()=>{B.destroy(),y.current(null)}},[D,a,u,c,g,T]);const k={placement:O};h!==null&&(k.TransitionProps=h);const $=sd(),N=(r=m.root)!=null?r:"div",V=Ot({elementType:N,externalSlotProps:p.root,externalForwardedProps:b,additionalProps:{role:"tooltip",ref:P},ownerState:t,className:$.root});return v.jsx(N,E({},V,{children:typeof i=="function"?i(k):i}))}),Ks=C.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:s="ltr",disablePortal:a=!1,keepMounted:u=!1,modifiers:c,open:d,placement:g="bottom",popperOptions:f=ad,popperRef:p,style:m,transition:h=!1,slotProps:b={},slots:w={}}=t,P=ge(t,rd),[x,S]=C.useState(!0),y=()=>{S(!1)},T=()=>{S(!0)};if(!u&&!d&&(!h||x))return null;let O;if(i)O=i;else if(r){const L=Qn(r);O=L&&ur(L)?Pe(L).body:Pe(null).body}const A=!d&&u&&(!h||x)?"none":void 0,D=h?{in:d,onEnter:y,onExited:T}:void 0;return v.jsx(wn,{disablePortal:a,container:O,children:v.jsx(ld,E({anchorEl:r,direction:s,disablePortal:a,modifiers:c,ref:n,open:h?!x:d,placement:g,popperOptions:f,popperRef:p,slotProps:b,slots:w},P,{style:E({position:"fixed",top:0,left:0,display:A},m),TransitionProps:D,children:o}))})});process.env.NODE_ENV!=="production"&&(Ks.propTypes={anchorEl:Kt(l.oneOfType([st,l.object,l.func]),e=>{if(e.open){const t=Qn(e.anchorEl);if(t&&ur(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||id(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:l.oneOfType([l.node,l.func]),container:l.oneOfType([st,l.func]),direction:l.oneOf(["ltr","rtl"]),disablePortal:l.bool,keepMounted:l.bool,modifiers:l.arrayOf(l.shape({data:l.object,effect:l.func,enabled:l.bool,fn:l.func,name:l.any,options:l.object,phase:l.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:l.arrayOf(l.string),requiresIfExists:l.arrayOf(l.string)})),open:l.bool.isRequired,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:l.shape({modifiers:l.array,onFirstUpdate:l.func,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:l.oneOf(["absolute","fixed"])}),popperRef:wo,slotProps:l.shape({root:l.oneOfType([l.func,l.object])}),slots:l.shape({root:l.elementType}),transition:l.bool});const ud=["values","unit","step"],cd=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>E({},n,{[r.key]:r.val}),{})};function dd(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=ge(e,ud),i=cd(t),s=Object.keys(i);function a(f){return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n})`}function u(f){return`@media (max-width:${(typeof t[f]=="number"?t[f]:f)-r/100}${n})`}function c(f,p){const m=s.indexOf(p);return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n}) and (max-width:${(m!==-1&&typeof t[s[m]]=="number"?t[s[m]]:p)-r/100}${n})`}function d(f){return s.indexOf(f)+1<s.length?c(f,s[s.indexOf(f)+1]):a(f)}function g(f){const p=s.indexOf(f);return p===0?a(s[1]):p===s.length-1?u(s[p]):c(f,s[s.indexOf(f)+1]).replace("@media","@media not all and")}return E({keys:s,values:i,up:a,down:u,between:c,only:d,not:g,unit:n},o)}const pd={borderRadius:4},fd=pd,gd=process.env.NODE_ENV!=="production"?l.oneOfType([l.number,l.string,l.object,l.array]):{},bt=gd;function vn(e,t){return t?it(e,t,{clone:!1}):e}const Po={xs:0,sm:600,md:900,lg:1200,xl:1536},Ai={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Po[e]}px)`};function lt(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||Ai;return t.reduce((s,a,u)=>(s[i.up(i.keys[u])]=n(t[u]),s),{})}if(typeof t=="object"){const i=r.breakpoints||Ai;return Object.keys(t).reduce((s,a)=>{if(Object.keys(i.values||Po).indexOf(a)!==-1){const u=i.up(a);s[u]=n(t[a],a)}else{const u=a;s[u]=t[u]}return s},{})}return n(t)}function md(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function hd(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function cr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function er(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=cr(e,n)||r,t&&(o=t(o,r,e)),o}function Se(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=s=>{if(s[t]==null)return null;const a=s[t],u=s.theme,c=cr(u,r)||{};return lt(s,a,g=>{let f=er(c,o,g);return g===f&&typeof g=="string"&&(f=er(c,o,`${t}${g==="default"?"":Je(g)}`,g)),n===!1?f:{[n]:f}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:bt}:{},i.filterProps=[t],i}function vd(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const bd={m:"margin",p:"padding"},yd={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Di={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},wd=vd(e=>{if(e.length>2)if(Di[e])e=Di[e];else return[e];const[t,n]=e.split(""),r=bd[t],o=yd[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),dr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],pr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],xd=[...dr,...pr];function On(e,t,n,r){var o;const i=(o=cr(e,t,!1))!=null?o:n;return typeof i=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),i*s):Array.isArray(i)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>i.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${s} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[s]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Ys(e){return On(e,"spacing",8,"spacing")}function _n(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Sd(e,t){return n=>e.reduce((r,o)=>(r[o]=_n(t,n),r),{})}function Cd(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=wd(n),i=Sd(o,r),s=e[n];return lt(e,s,i)}function Js(e,t){const n=Ys(e.theme);return Object.keys(e).map(r=>Cd(e,t,r,n)).reduce(vn,{})}function ve(e){return Js(e,dr)}ve.propTypes=process.env.NODE_ENV!=="production"?dr.reduce((e,t)=>(e[t]=bt,e),{}):{};ve.filterProps=dr;function be(e){return Js(e,pr)}be.propTypes=process.env.NODE_ENV!=="production"?pr.reduce((e,t)=>(e[t]=bt,e),{}):{};be.filterProps=pr;process.env.NODE_ENV!=="production"&&xd.reduce((e,t)=>(e[t]=bt,e),{});function Ed(e=8){if(e.mui)return e;const t=Ys({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const s=t(i);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function fr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?vn(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function ze(e){return typeof e!="number"?e:`${e}px solid`}function We(e,t){return Se({prop:e,themeKey:"borders",transform:t})}const Rd=We("border",ze),Td=We("borderTop",ze),kd=We("borderRight",ze),Pd=We("borderBottom",ze),Od=We("borderLeft",ze),_d=We("borderColor"),Nd=We("borderTopColor"),$d=We("borderRightColor"),Md=We("borderBottomColor"),Id=We("borderLeftColor"),jd=We("outline",ze),Fd=We("outlineColor"),gr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=On(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:_n(t,r)});return lt(e,e.borderRadius,n)}return null};gr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:bt}:{};gr.filterProps=["borderRadius"];fr(Rd,Td,kd,Pd,Od,_d,Nd,$d,Md,Id,gr,jd,Fd);const mr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=On(e.theme,"spacing",8,"gap"),n=r=>({gap:_n(t,r)});return lt(e,e.gap,n)}return null};mr.propTypes=process.env.NODE_ENV!=="production"?{gap:bt}:{};mr.filterProps=["gap"];const hr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=On(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:_n(t,r)});return lt(e,e.columnGap,n)}return null};hr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:bt}:{};hr.filterProps=["columnGap"];const vr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=On(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:_n(t,r)});return lt(e,e.rowGap,n)}return null};vr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:bt}:{};vr.filterProps=["rowGap"];const Ad=Se({prop:"gridColumn"}),Dd=Se({prop:"gridRow"}),Vd=Se({prop:"gridAutoFlow"}),Ld=Se({prop:"gridAutoColumns"}),Bd=Se({prop:"gridAutoRows"}),zd=Se({prop:"gridTemplateColumns"}),Hd=Se({prop:"gridTemplateRows"}),Gd=Se({prop:"gridTemplateAreas"}),Ud=Se({prop:"gridArea"});fr(mr,hr,vr,Ad,Dd,Vd,Ld,Bd,zd,Hd,Gd,Ud);function Bt(e,t){return t==="grey"?t:e}const qd=Se({prop:"color",themeKey:"palette",transform:Bt}),Wd=Se({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Bt}),Xd=Se({prop:"backgroundColor",themeKey:"palette",transform:Bt});fr(qd,Wd,Xd);function De(e){return e<=1&&e!==0?`${e*100}%`:e}const Kd=Se({prop:"width",transform:De}),Oo=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Po[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:De(n)}};return lt(e,e.maxWidth,t)}return null};Oo.filterProps=["maxWidth"];const Yd=Se({prop:"minWidth",transform:De}),Jd=Se({prop:"height",transform:De}),Zd=Se({prop:"maxHeight",transform:De}),Qd=Se({prop:"minHeight",transform:De});Se({prop:"size",cssProperty:"width",transform:De});Se({prop:"size",cssProperty:"height",transform:De});const ep=Se({prop:"boxSizing"});fr(Kd,Oo,Yd,Jd,Zd,Qd,ep);const tp={border:{themeKey:"borders",transform:ze},borderTop:{themeKey:"borders",transform:ze},borderRight:{themeKey:"borders",transform:ze},borderBottom:{themeKey:"borders",transform:ze},borderLeft:{themeKey:"borders",transform:ze},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:ze},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:gr},color:{themeKey:"palette",transform:Bt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Bt},backgroundColor:{themeKey:"palette",transform:Bt},p:{style:be},pt:{style:be},pr:{style:be},pb:{style:be},pl:{style:be},px:{style:be},py:{style:be},padding:{style:be},paddingTop:{style:be},paddingRight:{style:be},paddingBottom:{style:be},paddingLeft:{style:be},paddingX:{style:be},paddingY:{style:be},paddingInline:{style:be},paddingInlineStart:{style:be},paddingInlineEnd:{style:be},paddingBlock:{style:be},paddingBlockStart:{style:be},paddingBlockEnd:{style:be},m:{style:ve},mt:{style:ve},mr:{style:ve},mb:{style:ve},ml:{style:ve},mx:{style:ve},my:{style:ve},margin:{style:ve},marginTop:{style:ve},marginRight:{style:ve},marginBottom:{style:ve},marginLeft:{style:ve},marginX:{style:ve},marginY:{style:ve},marginInline:{style:ve},marginInlineStart:{style:ve},marginInlineEnd:{style:ve},marginBlock:{style:ve},marginBlockStart:{style:ve},marginBlockEnd:{style:ve},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:mr},rowGap:{style:vr},columnGap:{style:hr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:De},maxWidth:{style:Oo},minWidth:{transform:De},height:{transform:De},maxHeight:{transform:De},minHeight:{transform:De},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},_o=tp;function np(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function rp(e,t){return typeof e=="function"?e(t):e}function op(){function e(n,r,o,i){const s={[n]:r,theme:o},a=i[n];if(!a)return{[n]:r};const{cssProperty:u=n,themeKey:c,transform:d,style:g}=a;if(r==null)return null;if(c==="typography"&&r==="inherit")return{[n]:r};const f=cr(o,c)||{};return g?g(s):lt(s,r,m=>{let h=er(f,d,m);return m===h&&typeof m=="string"&&(h=er(f,d,`${n}${m==="default"?"":Je(m)}`,m)),u===!1?h:{[u]:h}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const s=(r=i.unstable_sxConfig)!=null?r:_o;function a(u){let c=u;if(typeof u=="function")c=u(i);else if(typeof u!="object")return u;if(!c)return null;const d=md(i.breakpoints),g=Object.keys(d);let f=d;return Object.keys(c).forEach(p=>{const m=rp(c[p],i);if(m!=null)if(typeof m=="object")if(s[p])f=vn(f,e(p,m,i,s));else{const h=lt({theme:i},m,b=>({[p]:b}));np(h,m)?f[p]=t({sx:m,theme:i}):f=vn(f,h)}else f=vn(f,e(p,m,i,s))}),hd(g,f)}return Array.isArray(o)?o.map(a):a(o)}return t}const Zs=op();Zs.filterProps=["sx"];const No=Zs;function ip(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const sp=["breakpoints","palette","spacing","shape"];function $o(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,s=ge(e,sp),a=dd(n),u=Ed(o);let c=it({breakpoints:a,direction:"ltr",components:{},palette:E({mode:"light"},r),spacing:u,shape:E({},fd,i)},s);return c.applyStyles=ip,c=t.reduce((d,g)=>it(d,g),c),c.unstable_sxConfig=E({},_o,s==null?void 0:s.unstable_sxConfig),c.unstable_sx=function(g){return No({sx:g,theme:this})},c}function ap(e){return Object.keys(e).length===0}function Qs(e=null){const t=C.useContext(Wr.ThemeContext);return!t||ap(t)?e:t}const lp=$o();function ea(e=lp){return Qs(e)}const up=["ownerState"],cp=["variants"],dp=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function pp(e){return Object.keys(e).length===0}function fp(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Gn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const gp=$o(),Vi=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function An({defaultTheme:e,theme:t,themeId:n}){return pp(t)?e:t[n]||t}function mp(e){return e?(t,n)=>n[e]:null}function Un(e,t){let{ownerState:n}=t,r=ge(t,up);const o=typeof e=="function"?e(E({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>Un(i,E({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let a=ge(o,cp);return i.forEach(u=>{let c=!0;typeof u.props=="function"?c=u.props(E({ownerState:n},r,n)):Object.keys(u.props).forEach(d=>{(n==null?void 0:n[d])!==u.props[d]&&r[d]!==u.props[d]&&(c=!1)}),c&&(Array.isArray(a)||(a=[a]),a.push(typeof u.style=="function"?u.style(E({ownerState:n},r,n)):u.style))}),a}return o}function hp(e={}){const{themeId:t,defaultTheme:n=gp,rootShouldForwardProp:r=Gn,slotShouldForwardProp:o=Gn}=e,i=s=>No(E({},s,{theme:An(E({},s,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(s,a={})=>{Wr.internal_processStyles(s,y=>y.filter(T=>!(T!=null&&T.__mui_systemSx)));const{name:u,slot:c,skipVariantsResolver:d,skipSx:g,overridesResolver:f=mp(Vi(c))}=a,p=ge(a,dp),m=d!==void 0?d:c&&c!=="Root"&&c!=="root"||!1,h=g||!1;let b;process.env.NODE_ENV!=="production"&&u&&(b=`${u}-${Vi(c||"Root")}`);let w=Gn;c==="Root"||c==="root"?w=r:c?w=o:fp(s)&&(w=void 0);const P=Wr(s,E({shouldForwardProp:w,label:b},p)),x=y=>typeof y=="function"&&y.__emotion_real!==y||Rt(y)?T=>Un(y,E({},T,{theme:An({theme:T.theme,defaultTheme:n,themeId:t})})):y,S=(y,...T)=>{let O=x(y);const A=T?T.map(x):[];u&&f&&A.push(k=>{const $=An(E({},k,{defaultTheme:n,themeId:t}));if(!$.components||!$.components[u]||!$.components[u].styleOverrides)return null;const N=$.components[u].styleOverrides,V={};return Object.entries(N).forEach(([F,M])=>{V[F]=Un(M,E({},k,{theme:$}))}),f(k,V)}),u&&!m&&A.push(k=>{var $;const N=An(E({},k,{defaultTheme:n,themeId:t})),V=N==null||($=N.components)==null||($=$[u])==null?void 0:$.variants;return Un({variants:V},E({},k,{theme:N}))}),h||A.push(i);const D=A.length-T.length;if(Array.isArray(y)&&D>0){const k=new Array(D).fill("");O=[...y,...k],O.raw=[...y.raw,...k]}const L=P(O,...A);if(process.env.NODE_ENV!=="production"){let k;u&&(k=`${u}${Je(c||"")}`),k===void 0&&(k=`Styled(${eu(s)})`),L.displayName=k}return s.muiName&&(L.muiName=s.muiName),L};return P.withConfig&&(S.withConfig=P.withConfig),S}}function vp(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:$s(t.components[n].defaultProps,r)}function bp({props:e,name:t,defaultTheme:n,themeId:r}){let o=ea(n);return r&&(o=o[r]||o),vp({theme:o,name:t,props:e})}function Mo(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Cu(e,t,n)}function yp(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Nt(e){if(e.type)return e;if(e.charAt(0)==="#")return Nt(yp(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:zt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:zt(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function br(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function wp(e){e=Nt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),s=(c,d=(c+n/30)%12)=>o-i*Math.max(Math.min(d-3,9-d,1),-1);let a="rgb";const u=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(a+="a",u.push(t[3])),br({type:a,values:u})}function Li(e){e=Nt(e);let t=e.type==="hsl"||e.type==="hsla"?Nt(wp(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Bi(e,t){const n=Li(e),r=Li(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function tr(e,t){return e=Nt(e),t=Mo(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,br(e)}function xp(e,t){if(e=Nt(e),t=Mo(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return br(e)}function Sp(e,t){if(e=Nt(e),t=Mo(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return br(e)}function Cp(e,t){return E({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const Ep={black:"#000",white:"#fff"},Cn=Ep,Rp={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Tp=Rp,kp={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Mt=kp,Pp={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},It=Pp,Op={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},on=Op,_p={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},jt=_p,Np={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Ft=Np,$p={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},At=$p,Mp=["mode","contrastThreshold","tonalOffset"],zi={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Cn.white,default:Cn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Mr={text:{primary:Cn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Cn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Hi(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=Sp(e.main,o):t==="dark"&&(e.dark=xp(e.main,i)))}function Ip(e="light"){return e==="dark"?{main:jt[200],light:jt[50],dark:jt[400]}:{main:jt[700],light:jt[400],dark:jt[800]}}function jp(e="light"){return e==="dark"?{main:Mt[200],light:Mt[50],dark:Mt[400]}:{main:Mt[500],light:Mt[300],dark:Mt[700]}}function Fp(e="light"){return e==="dark"?{main:It[500],light:It[300],dark:It[700]}:{main:It[700],light:It[400],dark:It[800]}}function Ap(e="light"){return e==="dark"?{main:Ft[400],light:Ft[300],dark:Ft[700]}:{main:Ft[700],light:Ft[500],dark:Ft[900]}}function Dp(e="light"){return e==="dark"?{main:At[400],light:At[300],dark:At[700]}:{main:At[800],light:At[500],dark:At[900]}}function Vp(e="light"){return e==="dark"?{main:on[400],light:on[300],dark:on[700]}:{main:"#ed6c02",light:on[500],dark:on[900]}}function Lp(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=ge(e,Mp),i=e.primary||Ip(t),s=e.secondary||jp(t),a=e.error||Fp(t),u=e.info||Ap(t),c=e.success||Dp(t),d=e.warning||Vp(t);function g(h){const b=Bi(h,Mr.text.primary)>=n?Mr.text.primary:zi.text.primary;if(process.env.NODE_ENV!=="production"){const w=Bi(h,b);w<3&&console.error([`MUI: The contrast ratio of ${w}:1 for ${b} on ${h}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return b}const f=({color:h,name:b,mainShade:w=500,lightShade:P=300,darkShade:x=700})=>{if(h=E({},h),!h.main&&h[w]&&(h.main=h[w]),!h.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${w}\` property.`:zt(11,b?` (${b})`:"",w));if(typeof h.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:zt(12,b?` (${b})`:"",JSON.stringify(h.main)));return Hi(h,"light",P,r),Hi(h,"dark",x,r),h.contrastText||(h.contrastText=g(h.main)),h},p={dark:Mr,light:zi};return process.env.NODE_ENV!=="production"&&(p[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),it(E({common:E({},Cn),mode:t,primary:f({color:i,name:"primary"}),secondary:f({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:f({color:a,name:"error"}),warning:f({color:d,name:"warning"}),info:f({color:u,name:"info"}),success:f({color:c,name:"success"}),grey:Tp,contrastThreshold:n,getContrastText:g,augmentColor:f,tonalOffset:r},p[t]),o)}const Bp=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function zp(e){return Math.round(e*1e5)/1e5}const Gi={textTransform:"uppercase"},Ui='"Roboto", "Helvetica", "Arial", sans-serif';function Hp(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Ui,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:s=400,fontWeightMedium:a=500,fontWeightBold:u=700,htmlFontSize:c=16,allVariants:d,pxToRem:g}=n,f=ge(n,Bp);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof c!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const p=o/14,m=g||(w=>`${w/c*p}rem`),h=(w,P,x,S,y)=>E({fontFamily:r,fontWeight:w,fontSize:m(P),lineHeight:x},r===Ui?{letterSpacing:`${zp(S/P)}em`}:{},y,d),b={h1:h(i,96,1.167,-1.5),h2:h(i,60,1.2,-.5),h3:h(s,48,1.167,0),h4:h(s,34,1.235,.25),h5:h(s,24,1.334,0),h6:h(a,20,1.6,.15),subtitle1:h(s,16,1.75,.15),subtitle2:h(a,14,1.57,.1),body1:h(s,16,1.5,.15),body2:h(s,14,1.43,.15),button:h(a,14,1.75,.4,Gi),caption:h(s,12,1.66,.4),overline:h(s,12,2.66,1,Gi),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return it(E({htmlFontSize:c,pxToRem:m,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:s,fontWeightMedium:a,fontWeightBold:u},b),f,{clone:!1})}const Gp=.2,Up=.14,qp=.12;function he(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Gp})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Up})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${qp})`].join(",")}const Wp=["none",he(0,2,1,-1,0,1,1,0,0,1,3,0),he(0,3,1,-2,0,2,2,0,0,1,5,0),he(0,3,3,-2,0,3,4,0,0,1,8,0),he(0,2,4,-1,0,4,5,0,0,1,10,0),he(0,3,5,-1,0,5,8,0,0,1,14,0),he(0,3,5,-1,0,6,10,0,0,1,18,0),he(0,4,5,-2,0,7,10,1,0,2,16,1),he(0,5,5,-3,0,8,10,1,0,3,14,2),he(0,5,6,-3,0,9,12,1,0,3,16,2),he(0,6,6,-3,0,10,14,1,0,4,18,3),he(0,6,7,-4,0,11,15,1,0,4,20,3),he(0,7,8,-4,0,12,17,2,0,5,22,4),he(0,7,8,-4,0,13,19,2,0,5,24,4),he(0,7,9,-4,0,14,21,2,0,5,26,4),he(0,8,9,-5,0,15,22,2,0,6,28,5),he(0,8,10,-5,0,16,24,2,0,6,30,5),he(0,8,11,-5,0,17,26,2,0,6,32,5),he(0,9,11,-5,0,18,28,2,0,7,34,6),he(0,9,12,-6,0,19,29,2,0,7,36,6),he(0,10,13,-6,0,20,31,3,0,8,38,7),he(0,10,13,-6,0,21,33,3,0,8,40,7),he(0,10,14,-6,0,22,35,3,0,8,42,7),he(0,11,14,-7,0,23,36,3,0,9,44,8),he(0,11,15,-7,0,24,38,3,0,9,46,8)],Xp=Wp,Kp=["duration","easing","delay"],Yp={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Jp={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function qi(e){return`${Math.round(e)}ms`}function Zp(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Qp(e){const t=E({},Yp,e.easing),n=E({},Jp,e.duration);return E({getAutoHeightDuration:Zp,create:(o=["all"],i={})=>{const{duration:s=n.standard,easing:a=t.easeInOut,delay:u=0}=i,c=ge(i,Kp);if(process.env.NODE_ENV!=="production"){const d=f=>typeof f=="string",g=f=>!isNaN(parseFloat(f));!d(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!g(s)&&!d(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),d(a)||console.error('MUI: Argument "easing" must be a string.'),!g(u)&&!d(u)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(c).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(c).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(d=>`${d} ${typeof s=="string"?s:qi(s)} ${a} ${typeof u=="string"?u:qi(u)}`).join(",")}},e,{easing:t,duration:n})}const ef={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},tf=ef,nf=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function rf(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,s=ge(e,nf);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":zt(18));const a=Lp(r),u=$o(e);let c=it(u,{mixins:Cp(u.breakpoints,n),palette:a,shadows:Xp.slice(),typography:Hp(a,i),transitions:Qp(o),zIndex:E({},tf)});if(c=it(c,s),c=t.reduce((d,g)=>it(d,g),c),process.env.NODE_ENV!=="production"){const d=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],g=(f,p)=>{let m;for(m in f){const h=f[m];if(d.indexOf(m)!==-1&&Object.keys(h).length>0){if(process.env.NODE_ENV!=="production"){const b=Qe("",m);console.error([`MUI: The \`${p}\` component increases the CSS specificity of the \`${m}\` internal state.`,"You can not override it like this: ",JSON.stringify(f,null,2),"",`Instead, you need to use the '&.${b}' syntax:`,JSON.stringify({root:{[`&.${b}`]:h}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}f[m]={}}}};Object.keys(c.components).forEach(f=>{const p=c.components[f].styleOverrides;p&&f.indexOf("Mui")===0&&g(p,f)})}return c.unstable_sxConfig=E({},_o,s==null?void 0:s.unstable_sxConfig),c.unstable_sx=function(g){return No({sx:g,theme:this})},c}const of=rf(),Io=of,jo="$$material",ta=e=>Gn(e)&&e!=="classes",sf=hp({themeId:jo,defaultTheme:Io,rootShouldForwardProp:ta}),Oe=sf;function Nn(){const e=ea(Io);return process.env.NODE_ENV!=="production"&&C.useDebugValue(e),e[jo]||e}function ct({props:e,name:t}){return bp({props:e,name:t,defaultTheme:Io,themeId:jo})}function to(e,t){return to=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},to(e,t)}function af(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,to(e,t)}const Wi={disabled:!1};var lf=process.env.NODE_ENV!=="production"?l.oneOfType([l.number,l.shape({enter:l.number,exit:l.number,appear:l.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&l.oneOfType([l.string,l.shape({enter:l.string,exit:l.string,active:l.string}),l.shape({enter:l.string,enterDone:l.string,enterActive:l.string,exit:l.string,exitDone:l.string,exitActive:l.string})]);const na=H.createContext(null);var uf=function(t){return t.scrollTop},pn="unmounted",St="exited",Ct="entering",Lt="entered",no="exiting",dt=function(e){af(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var s=o,a=s&&!s.isMounting?r.enter:r.appear,u;return i.appearStatus=null,r.in?a?(u=St,i.appearStatus=Ct):u=Lt:r.unmountOnExit||r.mountOnEnter?u=pn:u=St,i.state={status:u},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var s=o.in;return s&&i.status===pn?{status:St}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==Ct&&s!==Lt&&(i=Ct):(s===Ct||s===Lt)&&(i=no)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,s,a;return i=s=a=o,o!=null&&typeof o!="number"&&(i=o.exit,s=o.enter,a=o.appear!==void 0?o.appear:s),{exit:i,enter:s,appear:a}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===Ct){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:un.findDOMNode(this);s&&uf(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===St&&this.setState({status:pn})},n.performEnter=function(o){var i=this,s=this.props.enter,a=this.context?this.context.isMounting:o,u=this.props.nodeRef?[a]:[un.findDOMNode(this),a],c=u[0],d=u[1],g=this.getTimeouts(),f=a?g.appear:g.enter;if(!o&&!s||Wi.disabled){this.safeSetState({status:Lt},function(){i.props.onEntered(c)});return}this.props.onEnter(c,d),this.safeSetState({status:Ct},function(){i.props.onEntering(c,d),i.onTransitionEnd(f,function(){i.safeSetState({status:Lt},function(){i.props.onEntered(c,d)})})})},n.performExit=function(){var o=this,i=this.props.exit,s=this.getTimeouts(),a=this.props.nodeRef?void 0:un.findDOMNode(this);if(!i||Wi.disabled){this.safeSetState({status:St},function(){o.props.onExited(a)});return}this.props.onExit(a),this.safeSetState({status:no},function(){o.props.onExiting(a),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:St},function(){o.props.onExited(a)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,s=!0;return this.nextCallback=function(a){s&&(s=!1,i.nextCallback=null,o(a))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var s=this.props.nodeRef?this.props.nodeRef.current:un.findDOMNode(this),a=o==null&&!this.props.addEndListener;if(!s||a){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var u=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],c=u[0],d=u[1];this.props.addEndListener(c,d)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===pn)return null;var i=this.props,s=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var a=ge(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return H.createElement(na.Provider,{value:null},typeof s=="function"?s(o,a):H.cloneElement(H.Children.only(s),a))},t}(H.Component);dt.contextType=na;dt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:l.shape({current:typeof Element>"u"?l.any:function(e,t,n,r,o,i){var s=e[t];return l.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:l.oneOfType([l.func.isRequired,l.element.isRequired]).isRequired,in:l.bool,mountOnEnter:l.bool,unmountOnExit:l.bool,appear:l.bool,enter:l.bool,exit:l.bool,timeout:function(t){var n=lf;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:l.func,onEnter:l.func,onEntering:l.func,onEntered:l.func,onExit:l.func,onExiting:l.func,onExited:l.func}:{};function Dt(){}dt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Dt,onEntering:Dt,onEntered:Dt,onExit:Dt,onExiting:Dt,onExited:Dt};dt.UNMOUNTED=pn;dt.EXITED=St;dt.ENTERING=Ct;dt.ENTERED=Lt;dt.EXITING=no;const ra=dt,oa=e=>e.scrollTop;function nr(e,t){var n,r;const{timeout:o,easing:i,style:s={}}=e;return{duration:(n=s.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:s.transitionDelay}}const cf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function ro(e){return`scale(${e}, ${e**2})`}const df={entering:{opacity:1,transform:ro(1)},entered:{opacity:1,transform:"none"}},Ir=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Fo=C.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:s,in:a,onEnter:u,onEntered:c,onEntering:d,onExit:g,onExited:f,onExiting:p,style:m,timeout:h="auto",TransitionComponent:b=ra}=t,w=ge(t,cf),P=cn(),x=C.useRef(),S=Nn(),y=C.useRef(null),T=Ge(y,i.ref,n),O=F=>M=>{if(F){const B=y.current;M===void 0?F(B):F(B,M)}},A=O(d),D=O((F,M)=>{oa(F);const{duration:B,delay:ne,easing:te}=nr({style:m,timeout:h,easing:s},{mode:"enter"});let R;h==="auto"?(R=S.transitions.getAutoHeightDuration(F.clientHeight),x.current=R):R=B,F.style.transition=[S.transitions.create("opacity",{duration:R,delay:ne}),S.transitions.create("transform",{duration:Ir?R:R*.666,delay:ne,easing:te})].join(","),u&&u(F,M)}),L=O(c),k=O(p),$=O(F=>{const{duration:M,delay:B,easing:ne}=nr({style:m,timeout:h,easing:s},{mode:"exit"});let te;h==="auto"?(te=S.transitions.getAutoHeightDuration(F.clientHeight),x.current=te):te=M,F.style.transition=[S.transitions.create("opacity",{duration:te,delay:B}),S.transitions.create("transform",{duration:Ir?te:te*.666,delay:Ir?B:B||te*.333,easing:ne})].join(","),F.style.opacity=0,F.style.transform=ro(.75),g&&g(F)}),N=O(f),V=F=>{h==="auto"&&P.start(x.current||0,F),r&&r(y.current,F)};return v.jsx(b,E({appear:o,in:a,nodeRef:y,onEnter:D,onEntered:L,onEntering:A,onExit:$,onExited:N,onExiting:k,addEndListener:V,timeout:h==="auto"?null:h},w,{children:(F,M)=>C.cloneElement(i,E({style:E({opacity:0,transform:ro(.75),visibility:F==="exited"&&!a?"hidden":void 0},df[F],m,i.props.style),ref:T},M))}))});process.env.NODE_ENV!=="production"&&(Fo.propTypes={addEndListener:l.func,appear:l.bool,children:Rn.isRequired,easing:l.oneOfType([l.shape({enter:l.string,exit:l.string}),l.string]),in:l.bool,onEnter:l.func,onEntered:l.func,onEntering:l.func,onExit:l.func,onExited:l.func,onExiting:l.func,style:l.object,timeout:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});Fo.muiSupportAuto=!0;const oo=Fo,pf=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},Xi=pf,ff=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],gf=Oe(Ks,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),ia=C.forwardRef(function(t,n){var r;const o=Qs(),i=ct({props:t,name:"MuiPopper"}),{anchorEl:s,component:a,components:u,componentsProps:c,container:d,disablePortal:g,keepMounted:f,modifiers:p,open:m,placement:h,popperOptions:b,popperRef:w,transition:P,slots:x,slotProps:S}=i,y=ge(i,ff),T=(r=x==null?void 0:x.root)!=null?r:u==null?void 0:u.Root,O=E({anchorEl:s,container:d,disablePortal:g,keepMounted:f,modifiers:p,open:m,placement:h,popperOptions:b,popperRef:w,transition:P},y);return v.jsx(gf,E({as:a,direction:o==null?void 0:o.direction,slots:{root:T},slotProps:S??c},O,{ref:n}))});process.env.NODE_ENV!=="production"&&(ia.propTypes={anchorEl:l.oneOfType([st,l.object,l.func]),children:l.oneOfType([l.node,l.func]),component:l.elementType,components:l.shape({Root:l.elementType}),componentsProps:l.shape({root:l.oneOfType([l.func,l.object])}),container:l.oneOfType([st,l.func]),disablePortal:l.bool,keepMounted:l.bool,modifiers:l.arrayOf(l.shape({data:l.object,effect:l.func,enabled:l.bool,fn:l.func,name:l.any,options:l.object,phase:l.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:l.arrayOf(l.string),requiresIfExists:l.arrayOf(l.string)})),open:l.bool.isRequired,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:l.shape({modifiers:l.array,onFirstUpdate:l.func,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:l.oneOf(["absolute","fixed"])}),popperRef:wo,slotProps:l.shape({root:l.oneOfType([l.func,l.object])}),slots:l.shape({root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transition:l.bool});const sa=ia;function mf(e){return Qe("MuiTooltip",e)}const hf=ht("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),ft=hf,vf=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function bf(e){return Math.round(e*1e5)/1e5}const yf=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,s={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Je(i.split("-")[0])}`],arrow:["arrow"]};return ut(s,mf,t)},wf=Oe(sa,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>E({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${ft.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${ft.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${ft.arrow}`]:E({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${ft.arrow}`]:E({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),xf=Oe("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Je(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>E({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:tr(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${bf(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${ft.popper}[data-popper-placement*="left"] &`]:E({transformOrigin:"right center"},t.isRtl?E({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):E({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${ft.popper}[data-popper-placement*="right"] &`]:E({transformOrigin:"left center"},t.isRtl?E({marginRight:"14px"},t.touch&&{marginRight:"24px"}):E({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${ft.popper}[data-popper-placement*="top"] &`]:E({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${ft.popper}[data-popper-placement*="bottom"] &`]:E({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Sf=Oe("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:tr(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Dn=!1;const Ki=new Tn;let sn={x:0,y:0};function Vn(e,t){return n=>{t&&t(n),e(n)}}const aa=C.forwardRef(function(t,n){var r,o,i,s,a,u,c,d,g,f,p,m,h,b,w,P,x,S,y;const T=ct({props:t,name:"MuiTooltip"}),{arrow:O=!1,children:A,components:D={},componentsProps:L={},describeChild:k=!1,disableFocusListener:$=!1,disableHoverListener:N=!1,disableInteractive:V=!1,disableTouchListener:F=!1,enterDelay:M=100,enterNextDelay:B=0,enterTouchDelay:ne=700,followCursor:te=!1,id:R,leaveDelay:j=0,leaveTouchDelay:G=1500,onClose:K,onOpen:z,open:U,placement:W="bottom",PopperComponent:X,PopperProps:q={},slotProps:Y={},slots:Q={},title:ie,TransitionComponent:I=oo,TransitionProps:ee}=T,_=ge(T,vf),se=C.isValidElement(A)?A:v.jsx("span",{children:A}),Ce=Nn(),_e=Ce.direction==="rtl",[ye,yt]=C.useState(),[Ne,et]=C.useState(null),je=C.useRef(!1),tt=V||te,Ee=cn(),$t=cn(),wt=cn(),Yt=cn(),[$n,Uo]=Ts({controlled:U,default:!1,name:"Tooltip",state:"open"});let nt=$n;if(process.env.NODE_ENV!=="production"){const{current:re}=C.useRef(U!==void 0);C.useEffect(()=>{ye&&ye.disabled&&!re&&ie!==""&&ye.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ie,ye,re])}const wr=Rs(R),Jt=C.useRef(),Mn=yn(()=>{Jt.current!==void 0&&(document.body.style.WebkitUserSelect=Jt.current,Jt.current=void 0),Yt.clear()});C.useEffect(()=>Mn,[Mn]);const qo=re=>{Ki.clear(),Dn=!0,Uo(!0),z&&!nt&&z(re)},In=yn(re=>{Ki.start(800+j,()=>{Dn=!1}),Uo(!1),K&&nt&&K(re),Ee.start(Ce.transitions.duration.shortest,()=>{je.current=!1})}),xr=re=>{je.current&&re.type!=="touchstart"||(ye&&ye.removeAttribute("title"),$t.clear(),wt.clear(),M||Dn&&B?$t.start(Dn?B:M,()=>{qo(re)}):qo(re))},Wo=re=>{$t.clear(),wt.start(j,()=>{In(re)})},{isFocusVisibleRef:Xo,onBlur:Ha,onFocus:Ga,ref:Ua}=ks(),[,Ko]=C.useState(!1),Yo=re=>{Ha(re),Xo.current===!1&&(Ko(!1),Wo(re))},Jo=re=>{ye||yt(re.currentTarget),Ga(re),Xo.current===!0&&(Ko(!0),xr(re))},Zo=re=>{je.current=!0;const Fe=se.props;Fe.onTouchStart&&Fe.onTouchStart(re)},Qo=xr,ei=Wo,qa=re=>{Zo(re),wt.clear(),Ee.clear(),Mn(),Jt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Yt.start(ne,()=>{document.body.style.WebkitUserSelect=Jt.current,xr(re)})},Wa=re=>{se.props.onTouchEnd&&se.props.onTouchEnd(re),Mn(),wt.start(G,()=>{In(re)})};C.useEffect(()=>{if(!nt)return;function re(Fe){(Fe.key==="Escape"||Fe.key==="Esc")&&In(Fe)}return document.addEventListener("keydown",re),()=>{document.removeEventListener("keydown",re)}},[In,nt]);const Xa=Ge(se.ref,Ua,yt,n);!ie&&ie!==0&&(nt=!1);const Sr=C.useRef(),Ka=re=>{const Fe=se.props;Fe.onMouseMove&&Fe.onMouseMove(re),sn={x:re.clientX,y:re.clientY},Sr.current&&Sr.current.update()},Zt={},Cr=typeof ie=="string";k?(Zt.title=!nt&&Cr&&!N?ie:null,Zt["aria-describedby"]=nt?wr:null):(Zt["aria-label"]=Cr?ie:null,Zt["aria-labelledby"]=nt&&!Cr?wr:null);const Be=E({},Zt,_,se.props,{className:ke(_.className,se.props.className),onTouchStart:Zo,ref:Xa},te?{onMouseMove:Ka}:{});process.env.NODE_ENV!=="production"&&(Be["data-mui-internal-clone-element"]=!0,C.useEffect(()=>{ye&&!ye.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[ye]));const Qt={};F||(Be.onTouchStart=qa,Be.onTouchEnd=Wa),N||(Be.onMouseOver=Vn(Qo,Be.onMouseOver),Be.onMouseLeave=Vn(ei,Be.onMouseLeave),tt||(Qt.onMouseOver=Qo,Qt.onMouseLeave=ei)),$||(Be.onFocus=Vn(Jo,Be.onFocus),Be.onBlur=Vn(Yo,Be.onBlur),tt||(Qt.onFocus=Jo,Qt.onBlur=Yo)),process.env.NODE_ENV!=="production"&&se.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));const Ya=C.useMemo(()=>{var re;let Fe=[{name:"arrow",enabled:!!Ne,options:{element:Ne,padding:4}}];return(re=q.popperOptions)!=null&&re.modifiers&&(Fe=Fe.concat(q.popperOptions.modifiers)),E({},q.popperOptions,{modifiers:Fe})},[Ne,q]),en=E({},T,{isRtl:_e,arrow:O,disableInteractive:tt,placement:W,PopperComponentProp:X,touch:je.current}),Er=yf(en),ti=(r=(o=Q.popper)!=null?o:D.Popper)!=null?r:wf,ni=(i=(s=(a=Q.transition)!=null?a:D.Transition)!=null?s:I)!=null?i:oo,ri=(u=(c=Q.tooltip)!=null?c:D.Tooltip)!=null?u:xf,oi=(d=(g=Q.arrow)!=null?g:D.Arrow)!=null?d:Sf,Ja=dn(ti,E({},q,(f=Y.popper)!=null?f:L.popper,{className:ke(Er.popper,q==null?void 0:q.className,(p=(m=Y.popper)!=null?m:L.popper)==null?void 0:p.className)}),en),Za=dn(ni,E({},ee,(h=Y.transition)!=null?h:L.transition),en),Qa=dn(ri,E({},(b=Y.tooltip)!=null?b:L.tooltip,{className:ke(Er.tooltip,(w=(P=Y.tooltip)!=null?P:L.tooltip)==null?void 0:w.className)}),en),el=dn(oi,E({},(x=Y.arrow)!=null?x:L.arrow,{className:ke(Er.arrow,(S=(y=Y.arrow)!=null?y:L.arrow)==null?void 0:S.className)}),en);return v.jsxs(C.Fragment,{children:[C.cloneElement(se,Be),v.jsx(ti,E({as:X??sa,placement:W,anchorEl:te?{getBoundingClientRect:()=>({top:sn.y,left:sn.x,right:sn.x,bottom:sn.y,width:0,height:0})}:ye,popperRef:Sr,open:ye?nt:!1,id:wr,transition:!0},Qt,Ja,{popperOptions:Ya,children:({TransitionProps:re})=>v.jsx(ni,E({timeout:Ce.transitions.duration.shorter},re,Za,{children:v.jsxs(ri,E({},Qa,{children:[ie,O?v.jsx(oi,E({},el,{ref:et})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(aa.propTypes={arrow:l.bool,children:Rn.isRequired,classes:l.object,className:l.string,components:l.shape({Arrow:l.elementType,Popper:l.elementType,Tooltip:l.elementType,Transition:l.elementType}),componentsProps:l.shape({arrow:l.object,popper:l.object,tooltip:l.object,transition:l.object}),describeChild:l.bool,disableFocusListener:l.bool,disableHoverListener:l.bool,disableInteractive:l.bool,disableTouchListener:l.bool,enterDelay:l.number,enterNextDelay:l.number,enterTouchDelay:l.number,followCursor:l.bool,id:l.string,leaveDelay:l.number,leaveTouchDelay:l.number,onClose:l.func,onOpen:l.func,open:l.bool,placement:l.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:l.elementType,PopperProps:l.object,slotProps:l.shape({arrow:l.object,popper:l.object,tooltip:l.object,transition:l.object}),slots:l.shape({arrow:l.elementType,popper:l.elementType,tooltip:l.elementType,transition:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),title:l.node,TransitionComponent:l.elementType,TransitionProps:l.object});const Cf=aa;var Ao={},la={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(la);var Ef=la.exports,jr={};function Rf(e){return Qe("MuiSvgIcon",e)}ht("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Tf=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],kf=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Je(t)}`,`fontSize${Je(n)}`]};return ut(o,Rf,r)},Pf=Oe("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Je(n.color)}`],t[`fontSize${Je(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,s,a,u,c,d,g,f,p,m;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(s=i.pxToRem)==null?void 0:s.call(i,20))||"1.25rem",medium:((a=e.typography)==null||(u=a.pxToRem)==null?void 0:u.call(a,24))||"1.5rem",large:((c=e.typography)==null||(d=c.pxToRem)==null?void 0:d.call(c,35))||"2.1875rem"}[t.fontSize],color:(g=(f=(e.vars||e).palette)==null||(f=f[t.color])==null?void 0:f.main)!=null?g:{action:(p=(e.vars||e).palette)==null||(p=p.action)==null?void 0:p.active,disabled:(m=(e.vars||e).palette)==null||(m=m.action)==null?void 0:m.disabled,inherit:void 0}[t.color]}}),Do=C.forwardRef(function(t,n){const r=ct({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:s="inherit",component:a="svg",fontSize:u="medium",htmlColor:c,inheritViewBox:d=!1,titleAccess:g,viewBox:f="0 0 24 24"}=r,p=ge(r,Tf),m=C.isValidElement(o)&&o.type==="svg",h=E({},r,{color:s,component:a,fontSize:u,instanceFontSize:t.fontSize,inheritViewBox:d,viewBox:f,hasSvgAsChild:m}),b={};d||(b.viewBox=f);const w=kf(h);return v.jsxs(Pf,E({as:a,className:ke(w.root,i),focusable:"false",color:c,"aria-hidden":g?void 0:!0,role:g?"img":void 0,ref:n},b,p,m&&o.props,{ownerState:h,children:[m?o.props.children:o,g?v.jsx("title",{children:g}):null]}))});process.env.NODE_ENV!=="production"&&(Do.propTypes={children:l.node,classes:l.object,className:l.string,color:l.oneOfType([l.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),l.string]),component:l.elementType,fontSize:l.oneOfType([l.oneOf(["inherit","large","medium","small"]),l.string]),htmlColor:l.string,inheritViewBox:l.bool,shapeRendering:l.string,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),titleAccess:l.string,viewBox:l.string});Do.muiName="SvgIcon";const Yi=Do;function ua(e,t){function n(r,o){return v.jsx(Yi,E({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Yi.muiName,C.memo(C.forwardRef(n))}const Of={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Ms.configure(e)}},_f=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Je,createChainedFunction:Yr,createSvgIcon:ua,debounce:Es,deprecatedPropType:nu,isMuiElement:ru,ownerDocument:Pe,ownerWindow:Ht,requirePropFactory:ou,setRef:Yn,unstable_ClassNameGenerator:Of,unstable_useEnhancedEffect:Pt,unstable_useId:Rs,unsupportedProp:au,useControlled:Ts,useEventCallback:yn,useForkRef:Ge,useIsFocusVisible:ks},Symbol.toStringTag,{value:"Module"})),Nf=jl(_f);var Ji;function $f(){return Ji||(Ji=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Nf}(jr)),jr}var Mf=Ef;Object.defineProperty(Ao,"__esModule",{value:!0});var ca=Ao.default=void 0,If=Mf($f()),jf=v;ca=Ao.default=(0,If.default)((0,jf.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function Zi(e,t,n){return e?v.jsx(me.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:v.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Vo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:s=void 0,hasAutoFocus:a=!1,className:u,isDisabled:c=!1,isDense:d=!0,isSubMenuParent:g=!1,hasDisabledGutters:f=!1,hasDivider:p=!1,focusVisibleClassName:m,id:h,children:b}=e,w=v.jsx(me.MenuItem,{sx:{lineHeight:.8},autoFocus:a,className:u,disabled:c,dense:d,disableGutters:f,divider:p,focusVisibleClassName:m,onClick:t,id:h,children:n?v.jsxs(v.Fragment,{children:[Zi(i,n,!0),v.jsx(me.ListItemText,{primary:n,inset:!i&&o}),g?v.jsx(me.ListItemIcon,{className:"papi-menu-icon-trailing",children:v.jsx(ca,{})}):Zi(s,n,!1)]}):b});return r?v.jsx(Cf,{title:r,placement:"right",children:v.jsx("div",{children:w})}):w}function da(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Ff(e){const[t,n]=H.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,s=c=>{n(c.currentTarget)},a=()=>{n(void 0)},u=()=>{let c=da(i).filter(d=>"menuItem"in d.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return c=c.filter(d=>"menuItem"in d.group&&d.group.menuItem===r.id),v.jsx(Lo,{...e,includedGroups:c})};return v.jsxs(v.Fragment,{children:[v.jsx(Vo,{onClick:s,...o,isSubMenuParent:!0}),v.jsx(me.Menu,{anchorEl:t,open:!!t,onClose:a,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:u()},r.id)]})}const Af=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function Lo(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:s}=H.useMemo(()=>{const d=o&&o.length>0?o:da(t).filter(m=>!("menuItem"in m.group)),g=Object.values(d).sort((m,h)=>(m.group.order||0)-(h.group.order||0)),f=[];g.forEach(m=>{Af(m.id,t.items).forEach(h=>f.push({item:h,isLastItemInGroup:!1})),f.length>0&&(f[f.length-1].isLastItemInGroup=!0)}),f.length>0&&(f[f.length-1].isLastItemInGroup=!1);const p=f.some(m=>"iconPathBefore"in m.item&&m.item.iconPathBefore);return{items:f,allowForLeadingIcons:p}},[o,t]),a=({item:d,isLastItemInGroup:g})=>({className:"papi-menu-item",label:d.label,tooltip:d.tooltip,iconPathBefore:"iconPathBefore"in d?d.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in d?d.iconPathAfter:void 0,hasDivider:g,allowForLeadingIcons:s}),[u]=i;if(!u)return v.jsx("div",{});const c=u.item.group;return v.jsx("div",{role:"menu","aria-label":c,children:i.map((d,g)=>{const{item:f}=d,p=a(d);if("command"in f){const m=f.group+g;return v.jsx(Vo,{onClick:h=>{n==null||n(h),r(f)},...p},m)}return v.jsx(Ff,{parentMenuItem:f,parentItemProps:p,...e},c+f.id)})},c)}function Df(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([s,a])=>({id:s,group:a})).filter(s=>"column"in s.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(s=>"column"in s.group&&s.group.column===n)),v.jsx(Lo,{...e,includedGroups:i})}function Vf({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return v.jsxs(me.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[v.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),v.jsx(me.List,{id:n,dense:!0,className:i??"",children:v.jsx(Df,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function pa({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=H.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(a=>{if(a==="isExtensible")return;const u=a,c=o[u];typeof c=="object"&&typeof c.order=="number"&&!Number.isNaN(c.order)?s.set(c.order,{id:u,metadata:c}):console.warn(`Property ${a} (${typeof c}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((a,u)=>(a.metadata.order||0)-(u.metadata.order||0))},[o,r]);return v.jsx(me.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((s,a)=>v.jsx(Vf,{commandHandler:e,menuDefinition:n,...s,className:t},a))})}const fa=C.createContext({});process.env.NODE_ENV!=="production"&&(fa.displayName="ListContext");const Lf=fa;function Bf(e){return Qe("MuiList",e)}ht("MuiList",["root","padding","dense","subheader"]);const zf=["children","className","component","dense","disablePadding","subheader"],Hf=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return ut({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},Bf,t)},Gf=Oe("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>E({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),ga=C.forwardRef(function(t,n){const r=ct({props:t,name:"MuiList"}),{children:o,className:i,component:s="ul",dense:a=!1,disablePadding:u=!1,subheader:c}=r,d=ge(r,zf),g=C.useMemo(()=>({dense:a}),[a]),f=E({},r,{component:s,dense:a,disablePadding:u}),p=Hf(f);return v.jsx(Lf.Provider,{value:g,children:v.jsxs(Gf,E({as:s,className:ke(p.root,i),ref:n,ownerState:f},d,{children:[c,o]}))})});process.env.NODE_ENV!=="production"&&(ga.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,dense:l.bool,disablePadding:l.bool,subheader:l.node,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object])});const Uf=ga,qf=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Fr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function Qi(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function ma(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function an(e,t,n,r,o,i){let s=!1,a=o(e,t,t?n:!1);for(;a;){if(a===e.firstChild){if(s)return!1;s=!0}const u=r?!1:a.disabled||a.getAttribute("aria-disabled")==="true";if(!a.hasAttribute("tabindex")||!ma(a,i)||u)a=o(e,a,n);else return a.focus(),!0}return!1}const ha=C.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:s,className:a,disabledItemsFocusable:u=!1,disableListWrap:c=!1,onKeyDown:d,variant:g="selectedMenu"}=t,f=ge(t,qf),p=C.useRef(null),m=C.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Pt(()=>{o&&p.current.focus()},[o]),C.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(x,S)=>{const y=!p.current.style.width;if(x.clientHeight<p.current.clientHeight&&y){const T=`${Ps(Pe(x))}px`;p.current.style[S.direction==="rtl"?"paddingLeft":"paddingRight"]=T,p.current.style.width=`calc(100% + ${T})`}return p.current}}),[]);const h=x=>{const S=p.current,y=x.key,T=Pe(S).activeElement;if(y==="ArrowDown")x.preventDefault(),an(S,T,c,u,Fr);else if(y==="ArrowUp")x.preventDefault(),an(S,T,c,u,Qi);else if(y==="Home")x.preventDefault(),an(S,null,c,u,Fr);else if(y==="End")x.preventDefault(),an(S,null,c,u,Qi);else if(y.length===1){const O=m.current,A=y.toLowerCase(),D=performance.now();O.keys.length>0&&(D-O.lastTime>500?(O.keys=[],O.repeating=!0,O.previousKeyMatched=!0):O.repeating&&A!==O.keys[0]&&(O.repeating=!1)),O.lastTime=D,O.keys.push(A);const L=T&&!O.repeating&&ma(T,O);O.previousKeyMatched&&(L||an(S,T,!1,u,Fr,O))?x.preventDefault():O.previousKeyMatched=!1}d&&d(x)},b=Ge(p,n);let w=-1;C.Children.forEach(s,(x,S)=>{if(!C.isValidElement(x)){w===S&&(w+=1,w>=s.length&&(w=-1));return}process.env.NODE_ENV!=="production"&&Kn.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(g==="selectedMenu"&&x.props.selected||w===-1)&&(w=S),w===S&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(w+=1,w>=s.length&&(w=-1))});const P=C.Children.map(s,(x,S)=>{if(S===w){const y={};return i&&(y.autoFocus=!0),x.props.tabIndex===void 0&&g==="selectedMenu"&&(y.tabIndex=0),C.cloneElement(x,y)}return x});return v.jsx(Uf,E({role:"menu",ref:b,className:a,onKeyDown:h,tabIndex:o?0:-1},f,{children:P}))});process.env.NODE_ENV!=="production"&&(ha.propTypes={autoFocus:l.bool,autoFocusItem:l.bool,children:l.node,className:l.string,disabledItemsFocusable:l.bool,disableListWrap:l.bool,onKeyDown:l.func,variant:l.oneOf(["menu","selectedMenu"])});const Wf=ha,Xf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Kf={entering:{opacity:1},entered:{opacity:1}},va=C.forwardRef(function(t,n){const r=Nn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:s=!0,children:a,easing:u,in:c,onEnter:d,onEntered:g,onEntering:f,onExit:p,onExited:m,onExiting:h,style:b,timeout:w=o,TransitionComponent:P=ra}=t,x=ge(t,Xf),S=C.useRef(null),y=Ge(S,a.ref,n),T=V=>F=>{if(V){const M=S.current;F===void 0?V(M):V(M,F)}},O=T(f),A=T((V,F)=>{oa(V);const M=nr({style:b,timeout:w,easing:u},{mode:"enter"});V.style.webkitTransition=r.transitions.create("opacity",M),V.style.transition=r.transitions.create("opacity",M),d&&d(V,F)}),D=T(g),L=T(h),k=T(V=>{const F=nr({style:b,timeout:w,easing:u},{mode:"exit"});V.style.webkitTransition=r.transitions.create("opacity",F),V.style.transition=r.transitions.create("opacity",F),p&&p(V)}),$=T(m),N=V=>{i&&i(S.current,V)};return v.jsx(P,E({appear:s,in:c,nodeRef:S,onEnter:A,onEntered:D,onEntering:O,onExit:k,onExited:$,onExiting:L,addEndListener:N,timeout:w},x,{children:(V,F)=>C.cloneElement(a,E({style:E({opacity:0,visibility:V==="exited"&&!c?"hidden":void 0},Kf[V],b,a.props.style),ref:y},F))}))});process.env.NODE_ENV!=="production"&&(va.propTypes={addEndListener:l.func,appear:l.bool,children:Rn.isRequired,easing:l.oneOfType([l.shape({enter:l.string,exit:l.string}),l.string]),in:l.bool,onEnter:l.func,onEntered:l.func,onEntering:l.func,onExit:l.func,onExited:l.func,onExiting:l.func,style:l.object,timeout:l.oneOfType([l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});const Yf=va;function Jf(e){return Qe("MuiBackdrop",e)}ht("MuiBackdrop",["root","invisible"]);const Zf=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Qf=e=>{const{classes:t,invisible:n}=e;return ut({root:["root",n&&"invisible"]},Jf,t)},eg=Oe("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>E({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),ba=C.forwardRef(function(t,n){var r,o,i;const s=ct({props:t,name:"MuiBackdrop"}),{children:a,className:u,component:c="div",components:d={},componentsProps:g={},invisible:f=!1,open:p,slotProps:m={},slots:h={},TransitionComponent:b=Yf,transitionDuration:w}=s,P=ge(s,Zf),x=E({},s,{component:c,invisible:f}),S=Qf(x),y=(r=m.root)!=null?r:g.root;return v.jsx(b,E({in:p,timeout:w},P,{children:v.jsx(eg,E({"aria-hidden":!0},y,{as:(o=(i=h.root)!=null?i:d.Root)!=null?o:c,className:ke(S.root,u,y==null?void 0:y.className),ownerState:E({},x,y==null?void 0:y.ownerState),classes:S,ref:n,children:a}))}))});process.env.NODE_ENV!=="production"&&(ba.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,components:l.shape({Root:l.elementType}),componentsProps:l.shape({root:l.object}),invisible:l.bool,open:l.bool.isRequired,slotProps:l.shape({root:l.object}),slots:l.shape({root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),TransitionComponent:l.elementType,transitionDuration:l.oneOfType([l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});const tg=ba;function ng(e){return Qe("MuiModal",e)}ht("MuiModal",["root","hidden","backdrop"]);const rg=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],og=e=>{const{open:t,exited:n,classes:r}=e;return ut({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},ng,r)},ig=Oe("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>E({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),sg=Oe(tg,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),ya=C.forwardRef(function(t,n){var r,o,i,s,a,u;const c=ct({name:"MuiModal",props:t}),{BackdropComponent:d=sg,BackdropProps:g,className:f,closeAfterTransition:p=!1,children:m,container:h,component:b,components:w={},componentsProps:P={},disableAutoFocus:x=!1,disableEnforceFocus:S=!1,disableEscapeKeyDown:y=!1,disablePortal:T=!1,disableRestoreFocus:O=!1,disableScrollLock:A=!1,hideBackdrop:D=!1,keepMounted:L=!1,onBackdropClick:k,open:$,slotProps:N,slots:V}=c,F=ge(c,rg),M=E({},c,{closeAfterTransition:p,disableAutoFocus:x,disableEnforceFocus:S,disableEscapeKeyDown:y,disablePortal:T,disableRestoreFocus:O,disableScrollLock:A,hideBackdrop:D,keepMounted:L}),{getRootProps:B,getBackdropProps:ne,getTransitionProps:te,portalRef:R,isTopModal:j,exited:G,hasTransition:K}=Xu(E({},M,{rootRef:n})),z=E({},M,{exited:G}),U=og(z),W={};if(m.props.tabIndex===void 0&&(W.tabIndex="-1"),K){const{onEnter:ee,onExited:_}=te();W.onEnter=ee,W.onExited=_}const X=(r=(o=V==null?void 0:V.root)!=null?o:w.Root)!=null?r:ig,q=(i=(s=V==null?void 0:V.backdrop)!=null?s:w.Backdrop)!=null?i:d,Y=(a=N==null?void 0:N.root)!=null?a:P.root,Q=(u=N==null?void 0:N.backdrop)!=null?u:P.backdrop,ie=Ot({elementType:X,externalSlotProps:Y,externalForwardedProps:F,getSlotProps:B,additionalProps:{ref:n,as:b},ownerState:z,className:ke(f,Y==null?void 0:Y.className,U==null?void 0:U.root,!z.open&&z.exited&&(U==null?void 0:U.hidden))}),I=Ot({elementType:q,externalSlotProps:Q,additionalProps:g,getSlotProps:ee=>ne(E({},ee,{onClick:_=>{k&&k(_),ee!=null&&ee.onClick&&ee.onClick(_)}})),className:ke(Q==null?void 0:Q.className,g==null?void 0:g.className,U==null?void 0:U.backdrop),ownerState:z});return!L&&!$&&(!K||G)?null:v.jsx(wn,{ref:R,container:h,disablePortal:T,children:v.jsxs(X,E({},ie,{children:[!D&&d?v.jsx(q,E({},I)):null,v.jsx(Jn,{disableEnforceFocus:S,disableAutoFocus:x,disableRestoreFocus:O,isEnabled:j,open:$,children:C.cloneElement(m,W)})]}))})});process.env.NODE_ENV!=="production"&&(ya.propTypes={BackdropComponent:l.elementType,BackdropProps:l.object,children:Rn.isRequired,classes:l.object,className:l.string,closeAfterTransition:l.bool,component:l.elementType,components:l.shape({Backdrop:l.elementType,Root:l.elementType}),componentsProps:l.shape({backdrop:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),container:l.oneOfType([st,l.func]),disableAutoFocus:l.bool,disableEnforceFocus:l.bool,disableEscapeKeyDown:l.bool,disablePortal:l.bool,disableRestoreFocus:l.bool,disableScrollLock:l.bool,hideBackdrop:l.bool,keepMounted:l.bool,onBackdropClick:l.func,onClose:l.func,onTransitionEnter:l.func,onTransitionExited:l.func,open:l.bool.isRequired,slotProps:l.shape({backdrop:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({backdrop:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object])});const ag=ya;function lg(e){return Qe("MuiPaper",e)}ht("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const ug=["className","component","elevation","square","variant"],cg=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return ut(i,lg,o)},dg=Oe("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return E({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&E({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${tr("#fff",Xi(t.elevation))}, ${tr("#fff",Xi(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),wa=C.forwardRef(function(t,n){const r=ct({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:s=1,square:a=!1,variant:u="elevation"}=r,c=ge(r,ug),d=E({},r,{component:i,elevation:s,square:a,variant:u}),g=cg(d);return process.env.NODE_ENV!=="production"&&Nn().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),v.jsx(dg,E({as:i,ownerState:d,className:ke(g.root,o),ref:n},c))});process.env.NODE_ENV!=="production"&&(wa.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,elevation:Kt(Ns,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:l.bool,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),variant:l.oneOfType([l.oneOf(["elevation","outlined"]),l.string])});const pg=wa;function fg(e){return Qe("MuiPopover",e)}ht("MuiPopover",["root","paper"]);const gg=["onEntering"],mg=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],hg=["slotProps"];function es(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function ts(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function ns(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function qn(e){return typeof e=="function"?e():e}const vg=e=>{const{classes:t}=e;return ut({root:["root"],paper:["paper"]},fg,t)},bg=Oe(ag,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),xa=Oe(pg,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Sa=C.forwardRef(function(t,n){var r,o,i;const s=ct({props:t,name:"MuiPopover"}),{action:a,anchorEl:u,anchorOrigin:c={vertical:"top",horizontal:"left"},anchorPosition:d,anchorReference:g="anchorEl",children:f,className:p,container:m,elevation:h=8,marginThreshold:b=16,open:w,PaperProps:P={},slots:x,slotProps:S,transformOrigin:y={vertical:"top",horizontal:"left"},TransitionComponent:T=oo,transitionDuration:O="auto",TransitionProps:{onEntering:A}={},disableScrollLock:D=!1}=s,L=ge(s.TransitionProps,gg),k=ge(s,mg),$=(r=S==null?void 0:S.paper)!=null?r:P,N=C.useRef(),V=Ge(N,$.ref),F=E({},s,{anchorOrigin:c,anchorReference:g,elevation:h,marginThreshold:b,externalPaperSlotProps:$,transformOrigin:y,TransitionComponent:T,transitionDuration:O,TransitionProps:L}),M=vg(F),B=C.useCallback(()=>{if(g==="anchorPosition")return process.env.NODE_ENV!=="production"&&(d||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),d;const ee=qn(u),_=ee&&ee.nodeType===1?ee:Pe(N.current).body,se=_.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Ce=_.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Ce.top===0&&Ce.left===0&&Ce.right===0&&Ce.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:se.top+es(se,c.vertical),left:se.left+ts(se,c.horizontal)}},[u,c.horizontal,c.vertical,d,g]),ne=C.useCallback(ee=>({vertical:es(ee,y.vertical),horizontal:ts(ee,y.horizontal)}),[y.horizontal,y.vertical]),te=C.useCallback(ee=>{const _={width:ee.offsetWidth,height:ee.offsetHeight},se=ne(_);if(g==="none")return{top:null,left:null,transformOrigin:ns(se)};const Ce=B();let _e=Ce.top-se.vertical,ye=Ce.left-se.horizontal;const yt=_e+_.height,Ne=ye+_.width,et=Ht(qn(u)),je=et.innerHeight-b,tt=et.innerWidth-b;if(b!==null&&_e<b){const Ee=_e-b;_e-=Ee,se.vertical+=Ee}else if(b!==null&&yt>je){const Ee=yt-je;_e-=Ee,se.vertical+=Ee}if(process.env.NODE_ENV!=="production"&&_.height>je&&_.height&&je&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${_.height-je}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),b!==null&&ye<b){const Ee=ye-b;ye-=Ee,se.horizontal+=Ee}else if(Ne>tt){const Ee=Ne-tt;ye-=Ee,se.horizontal+=Ee}return{top:`${Math.round(_e)}px`,left:`${Math.round(ye)}px`,transformOrigin:ns(se)}},[u,g,B,ne,b]),[R,j]=C.useState(w),G=C.useCallback(()=>{const ee=N.current;if(!ee)return;const _=te(ee);_.top!==null&&(ee.style.top=_.top),_.left!==null&&(ee.style.left=_.left),ee.style.transformOrigin=_.transformOrigin,j(!0)},[te]);C.useEffect(()=>(D&&window.addEventListener("scroll",G),()=>window.removeEventListener("scroll",G)),[u,D,G]);const K=(ee,_)=>{A&&A(ee,_),G()},z=()=>{j(!1)};C.useEffect(()=>{w&&G()}),C.useImperativeHandle(a,()=>w?{updatePosition:()=>{G()}}:null,[w,G]),C.useEffect(()=>{if(!w)return;const ee=Es(()=>{G()}),_=Ht(u);return _.addEventListener("resize",ee),()=>{ee.clear(),_.removeEventListener("resize",ee)}},[u,w,G]);let U=O;O==="auto"&&!T.muiSupportAuto&&(U=void 0);const W=m||(u?Pe(qn(u)).body:void 0),X=(o=x==null?void 0:x.root)!=null?o:bg,q=(i=x==null?void 0:x.paper)!=null?i:xa,Y=Ot({elementType:q,externalSlotProps:E({},$,{style:R?$.style:E({},$.style,{opacity:0})}),additionalProps:{elevation:h,ref:V},ownerState:F,className:ke(M.paper,$==null?void 0:$.className)}),Q=Ot({elementType:X,externalSlotProps:(S==null?void 0:S.root)||{},externalForwardedProps:k,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:W,open:w},ownerState:F,className:ke(M.root,p)}),{slotProps:ie}=Q,I=ge(Q,hg);return v.jsx(X,E({},I,!js(X)&&{slotProps:ie,disableScrollLock:D},{children:v.jsx(T,E({appear:!0,in:w,onEntering:K,onExited:z,timeout:U},L,{children:v.jsx(q,E({},Y,{children:f}))}))}))});process.env.NODE_ENV!=="production"&&(Sa.propTypes={action:wo,anchorEl:Kt(l.oneOfType([st,l.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=qn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:l.shape({horizontal:l.oneOfType([l.oneOf(["center","left","right"]),l.number]).isRequired,vertical:l.oneOfType([l.oneOf(["bottom","center","top"]),l.number]).isRequired}),anchorPosition:l.shape({left:l.number.isRequired,top:l.number.isRequired}),anchorReference:l.oneOf(["anchorEl","anchorPosition","none"]),children:l.node,classes:l.object,className:l.string,container:l.oneOfType([st,l.func]),disableScrollLock:l.bool,elevation:Ns,marginThreshold:l.number,onClose:l.func,open:l.bool.isRequired,PaperProps:l.shape({component:Xl}),slotProps:l.shape({paper:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({paper:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transformOrigin:l.shape({horizontal:l.oneOfType([l.oneOf(["center","left","right"]),l.number]).isRequired,vertical:l.oneOfType([l.oneOf(["bottom","center","top"]),l.number]).isRequired}),TransitionComponent:l.elementType,transitionDuration:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})]),TransitionProps:l.object});const yg=Sa;function wg(e){return Qe("MuiMenu",e)}ht("MuiMenu",["root","paper","list"]);const xg=["onEntering"],Sg=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Cg={vertical:"top",horizontal:"right"},Eg={vertical:"top",horizontal:"left"},Rg=e=>{const{classes:t}=e;return ut({root:["root"],paper:["paper"],list:["list"]},wg,t)},Tg=Oe(yg,{shouldForwardProp:e=>ta(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),kg=Oe(xa,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),Pg=Oe(Wf,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Ca=C.forwardRef(function(t,n){var r,o;const i=ct({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:a,className:u,disableAutoFocusItem:c=!1,MenuListProps:d={},onClose:g,open:f,PaperProps:p={},PopoverClasses:m,transitionDuration:h="auto",TransitionProps:{onEntering:b}={},variant:w="selectedMenu",slots:P={},slotProps:x={}}=i,S=ge(i.TransitionProps,xg),y=ge(i,Sg),T=Nn(),O=T.direction==="rtl",A=E({},i,{autoFocus:s,disableAutoFocusItem:c,MenuListProps:d,onEntering:b,PaperProps:p,transitionDuration:h,TransitionProps:S,variant:w}),D=Rg(A),L=s&&!c&&f,k=C.useRef(null),$=(te,R)=>{k.current&&k.current.adjustStyleForScrollbar(te,T),b&&b(te,R)},N=te=>{te.key==="Tab"&&(te.preventDefault(),g&&g(te,"tabKeyDown"))};let V=-1;C.Children.map(a,(te,R)=>{C.isValidElement(te)&&(process.env.NODE_ENV!=="production"&&Kn.isFragment(te)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),te.props.disabled||(w==="selectedMenu"&&te.props.selected||V===-1)&&(V=R))});const F=(r=P.paper)!=null?r:kg,M=(o=x.paper)!=null?o:p,B=Ot({elementType:P.root,externalSlotProps:x.root,ownerState:A,className:[D.root,u]}),ne=Ot({elementType:F,externalSlotProps:M,ownerState:A,className:D.paper});return v.jsx(Tg,E({onClose:g,anchorOrigin:{vertical:"bottom",horizontal:O?"right":"left"},transformOrigin:O?Cg:Eg,slots:{paper:F,root:P.root},slotProps:{root:B,paper:ne},open:f,ref:n,transitionDuration:h,TransitionProps:E({onEntering:$},S),ownerState:A},y,{classes:m,children:v.jsx(Pg,E({onKeyDown:N,actions:k,autoFocus:s&&(V===-1||c),autoFocusItem:L,variant:w},d,{className:ke(D.list,d.className),children:a}))}))});process.env.NODE_ENV!=="production"&&(Ca.propTypes={anchorEl:l.oneOfType([st,l.func]),autoFocus:l.bool,children:l.node,classes:l.object,className:l.string,disableAutoFocusItem:l.bool,MenuListProps:l.object,onClose:l.func,open:l.bool.isRequired,PaperProps:l.object,PopoverClasses:l.object,slotProps:l.shape({paper:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({paper:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transitionDuration:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})]),TransitionProps:l.object,variant:l.oneOf(["menu","selectedMenu"])});const Og=Ca;function _g({className:e,commandHandler:t,menuDefinition:n,children:r}){var c;const[o,i]=H.useState(void 0),s=H.useCallback(d=>{d.preventDefault(),i(o===void 0?{mouseX:d.clientX+2,mouseY:d.clientY-6}:void 0)},[o]),a=H.useCallback(()=>{i(void 0)},[]),u=H.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((c=n==null?void 0:n.items)==null?void 0:c.length)??0)===0||!r?r:v.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[r,v.jsx(Og,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:a,anchorReference:"anchorPosition",anchorPosition:u,children:v.jsx(Lo,{menuDefinition:n,commandHandler:t,onClick:a})})]})}const Ng=ua(v.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function $g(e){return{preserveValue:!0,...e}}const rr=(e,t,n={})=>{const r=H.useRef(t);r.current=t;const o=H.useRef(n);o.current=$g(o.current);const[i,s]=H.useState(()=>r.current),[a,u]=H.useState(!0);return H.useEffect(()=>{let c=!0;return u(!!e),(async()=>{if(e){const d=await e();c&&(s(()=>d),u(!1))}})(),()=>{c=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[i,a]};function Ea({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:i,ariaLabelPrefix:s,children:a}){const[u,c]=H.useState(!1),[d,g]=H.useState(!1),f=H.useCallback(()=>{u&&c(!1),g(!1)},[u]),p=H.useCallback(S=>{S.stopPropagation(),c(y=>{const T=!y;return T&&S.shiftKey?g(!0):T||g(!1),T})},[]),m=H.useCallback(S=>(f(),r(S)),[r,f]),[h,b]=H.useState({top:1,left:1});H.useEffect(()=>{if(u){const S=o==null?void 0:o.current;if(S){const y=S.getBoundingClientRect(),T=window.scrollY,O=window.scrollX,A=y.top+T+S.clientHeight,D=y.left+O;b({top:A,left:D})}}},[u,o]);const[w]=rr(H.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,u]),t),[P]=rr(H.useCallback(async()=>(e==null?void 0:e(!0))??n??w,[e,n,w,u]),n??w),x=d&&P?P:w;return v.jsxs(v.Fragment,{children:[v.jsx(me.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${i??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:p,children:a??v.jsx(Ng,{})}),v.jsx(me.Drawer,{className:`papi-menu-drawer ${i??""}`,anchor:"left",variant:"temporary",open:u,onClose:f,PaperProps:{className:"papi-menu-drawer-paper",style:{top:h.top,left:h.left}},children:x?v.jsx(pa,{className:i,id:`${s??""} main menu`,commandHandler:m,multiColumnMenu:x}):void 0})]})}function Mg({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:s="medium",className:a,onClick:u,children:c}){return v.jsx(me.IconButton,{id:e,disabled:n,edge:i,size:s,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${a??""}`,onClick:u,children:c})}function En({variant:e="outlined",id:t,isDisabled:n=!1,hasError:r=!1,isFullWidth:o=!1,helperText:i,label:s,placeholder:a,isRequired:u=!1,className:c,defaultValue:d,value:g,onChange:f,onFocus:p,onBlur:m}){return v.jsx(me.TextField,{variant:e,id:t,disabled:n,error:r,fullWidth:o,helperText:i,label:s,placeholder:a,required:u,className:`papi-textfield ${c??""}`,defaultValue:d,value:g,onChange:f,onFocus:p,onBlur:m})}let Ar;const Dr=()=>(Ar||(Ar=fe.allBookIds.map(e=>({bookId:e,label:fe.bookIdToEnglishName(e)}))),Ar);function Ig({scrRef:e,handleSubmit:t,id:n}){const r=u=>{t(u)},o=(u,c)=>{const g={bookNum:fe.bookIdToNumber(c.bookId),chapterNum:1,verseNum:1};r(g)},i=u=>{t({...e,chapterNum:+u.target.value})},s=u=>{t({...e,verseNum:+u.target.value})},a=H.useMemo(()=>Dr()[e.bookNum-1],[e.bookNum]);return v.jsxs("span",{id:n,children:[v.jsx(Xn,{title:"Book",className:"papi-ref-selector book",value:a,options:Dr(),onChange:o,isClearable:!1,width:200}),v.jsx(xt,{onClick:()=>r(Xe.offsetBook(e,-1)),isDisabled:e.bookNum<=Xe.FIRST_SCR_BOOK_NUM,children:"<"}),v.jsx(xt,{onClick:()=>r(Xe.offsetBook(e,1)),isDisabled:e.bookNum>=Dr().length,children:">"}),v.jsx(En,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),v.jsx(xt,{onClick:()=>t(Xe.offsetChapter(e,-1)),isDisabled:e.chapterNum<=Xe.FIRST_SCR_CHAPTER_NUM,children:"<"}),v.jsx(xt,{onClick:()=>t(Xe.offsetChapter(e,1)),isDisabled:e.chapterNum>=Xe.getChaptersForBook(e.bookNum),children:">"}),v.jsx(En,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:s}),v.jsx(xt,{onClick:()=>t(Xe.offsetVerse(e,-1)),isDisabled:e.verseNum<=Xe.FIRST_SCR_VERSE_NUM,children:"<"}),v.jsx(xt,{onClick:()=>t(Xe.offsetVerse(e,1)),children:">"})]})}function jg({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=H.useState(""),i=s=>{o(s),e(s)};return v.jsx(me.Paper,{component:"form",className:"search-bar-paper",children:v.jsx(En,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:s=>i(s.target.value)})})}function Fg({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:s=!1,defaultValue:a,value:u,valueLabelDisplay:c="off",className:d,onChange:g,onChangeCommitted:f}){return v.jsx(me.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:s,defaultValue:a,value:u,valueLabelDisplay:c,className:`papi-slider ${n} ${d??""}`,onChange:g,onChangeCommitted:f})}function Ag({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:s,children:a}){const u={action:(s==null?void 0:s.action)||a,message:s==null?void 0:s.message,className:r};return v.jsx(me.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:u})}function Dg({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return v.jsx(me.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function rs({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return v.jsx(En,{defaultValue:t[n.key],onChange:r})}const Vg=({onChange:e,disabled:t,checked:n,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return v.jsx(hs,{...r,isChecked:n,isDisabled:t,onChange:o})};function Lg({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:s,defaultColumnSortable:a=!0,defaultColumnResizable:u=!0,rows:c,enableSelectColumn:d,selectColumnWidth:g=50,rowKeyGetter:f,rowHeight:p=35,headerRowHeight:m=35,selectedRows:h,onSelectedRowsChange:b,onRowsChange:w,onCellClick:P,onCellDoubleClick:x,onCellContextMenu:S,onCellKeyDown:y,direction:T="ltr",enableVirtualization:O=!0,onCopy:A,onPaste:D,onScroll:L,className:k,"data-testid":$}){const N=H.useMemo(()=>{const V=e.map(F=>typeof F.editable=="function"?{...F,editable:B=>!!F.editable(B),renderEditCell:F.renderEditCell||rs}:F.editable&&!F.renderEditCell?{...F,renderEditCell:rs}:F.renderEditCell&&!F.editable?{...F,editable:!1}:F);return d?[{...ii.SelectColumn,minWidth:g},...V]:V},[e,d,g]);return v.jsx(ii,{columns:N,defaultColumnOptions:{width:o,minWidth:i,maxWidth:s,sortable:a,resizable:u},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:c,rowKeyGetter:f,rowHeight:p,headerRowHeight:m,selectedRows:h,onSelectedRowsChange:b,onRowsChange:w,onCellClick:P,onCellDoubleClick:x,onCellContextMenu:S,onCellKeyDown:y,direction:T,enableVirtualization:O,onCopy:A,onPaste:D,onScroll:L,renderers:{renderCheckbox:Vg},className:`papi-table ${k??"rdg-light"}`,"data-testid":$})}/**
   * table-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function gt(e,t){return typeof e=="function"?e(t):e}function Le(e,t){return n=>{t.setState(r=>({...r,[e]:gt(n,r[e])}))}}function yr(e){return e instanceof Function}function Bg(e){return Array.isArray(e)&&e.every(t=>typeof t=="number")}function zg(e,t){const n=[],r=o=>{o.forEach(i=>{n.push(i);const s=t(i);s!=null&&s.length&&r(s)})};return r(e),n}function J(e,t,n){let r=[],o;return i=>{let s;n.key&&n.debug&&(s=Date.now());const a=e(i);if(!(a.length!==r.length||a.some((d,g)=>r[g]!==d)))return o;r=a;let c;if(n.key&&n.debug&&(c=Date.now()),o=t(...a),n==null||n.onChange==null||n.onChange(o),n.key&&n.debug&&n!=null&&n.debug()){const d=Math.round((Date.now()-s)*100)/100,g=Math.round((Date.now()-c)*100)/100,f=g/16,p=(m,h)=>{for(m=String(m);m.length<h;)m=" "+m;return m};console.info(`%c⏱ ${p(g,5)} /${p(d,5)} ms`,`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0,Math.min(120-120*f,120))}deg 100% 31%);`,n==null?void 0:n.key)}return o}}function Z(e,t,n,r){return{debug:()=>{var o;return(o=e==null?void 0:e.debugAll)!=null?o:e[t]},key:process.env.NODE_ENV==="development"&&n,onChange:r}}function Hg(e,t,n,r){const o=()=>{var s;return(s=i.getValue())!=null?s:e.options.renderFallbackValue},i={id:`${t.id}_${n.id}`,row:t,column:n,getValue:()=>t.getValue(r),renderValue:o,getContext:J(()=>[e,n,t,i],(s,a,u,c)=>({table:s,column:a,row:u,cell:c,getValue:c.getValue,renderValue:c.renderValue}),Z(e.options,"debugCells","cell.getContext"))};return e._features.forEach(s=>{s.createCell==null||s.createCell(i,n,t,e)},{}),i}function Gg(e,t,n,r){var o,i;const a={...e._getDefaultColumnDef(),...t},u=a.accessorKey;let c=(o=(i=a.id)!=null?i:u?u.replace(".","_"):void 0)!=null?o:typeof a.header=="string"?a.header:void 0,d;if(a.accessorFn?d=a.accessorFn:u&&(u.includes(".")?d=f=>{let p=f;for(const h of u.split(".")){var m;p=(m=p)==null?void 0:m[h],process.env.NODE_ENV!=="production"&&p===void 0&&console.warn(`"${h}" in deeply nested key "${u}" returned undefined.`)}return p}:d=f=>f[a.accessorKey]),!c)throw process.env.NODE_ENV!=="production"?new Error(a.accessorFn?"Columns require an id when using an accessorFn":"Columns require an id when using a non-string header"):new Error;let g={id:`${String(c)}`,accessorFn:d,parent:r,depth:n,columnDef:a,columns:[],getFlatColumns:J(()=>[!0],()=>{var f;return[g,...(f=g.columns)==null?void 0:f.flatMap(p=>p.getFlatColumns())]},Z(e.options,"debugColumns","column.getFlatColumns")),getLeafColumns:J(()=>[e._getOrderColumnsFn()],f=>{var p;if((p=g.columns)!=null&&p.length){let m=g.columns.flatMap(h=>h.getLeafColumns());return f(m)}return[g]},Z(e.options,"debugColumns","column.getLeafColumns"))};for(const f of e._features)f.createColumn==null||f.createColumn(g,e);return g}const Re="debugHeaders";function os(e,t,n){var r;let i={id:(r=n.id)!=null?r:t.id,column:t,index:n.index,isPlaceholder:!!n.isPlaceholder,placeholderId:n.placeholderId,depth:n.depth,subHeaders:[],colSpan:0,rowSpan:0,headerGroup:null,getLeafHeaders:()=>{const s=[],a=u=>{u.subHeaders&&u.subHeaders.length&&u.subHeaders.map(a),s.push(u)};return a(i),s},getContext:()=>({table:e,header:i,column:t})};return e._features.forEach(s=>{s.createHeader==null||s.createHeader(i,e)}),i}const Ug={createTable:e=>{e.getHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,o)=>{var i,s;const a=(i=r==null?void 0:r.map(g=>n.find(f=>f.id===g)).filter(Boolean))!=null?i:[],u=(s=o==null?void 0:o.map(g=>n.find(f=>f.id===g)).filter(Boolean))!=null?s:[],c=n.filter(g=>!(r!=null&&r.includes(g.id))&&!(o!=null&&o.includes(g.id)));return Ln(t,[...a,...c,...u],e)},Z(e.options,Re,"getHeaderGroups")),e.getCenterHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,o)=>(n=n.filter(i=>!(r!=null&&r.includes(i.id))&&!(o!=null&&o.includes(i.id))),Ln(t,n,e,"center")),Z(e.options,Re,"getCenterHeaderGroups")),e.getLeftHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left],(t,n,r)=>{var o;const i=(o=r==null?void 0:r.map(s=>n.find(a=>a.id===s)).filter(Boolean))!=null?o:[];return Ln(t,i,e,"left")},Z(e.options,Re,"getLeftHeaderGroups")),e.getRightHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.right],(t,n,r)=>{var o;const i=(o=r==null?void 0:r.map(s=>n.find(a=>a.id===s)).filter(Boolean))!=null?o:[];return Ln(t,i,e,"right")},Z(e.options,Re,"getRightHeaderGroups")),e.getFooterGroups=J(()=>[e.getHeaderGroups()],t=>[...t].reverse(),Z(e.options,Re,"getFooterGroups")),e.getLeftFooterGroups=J(()=>[e.getLeftHeaderGroups()],t=>[...t].reverse(),Z(e.options,Re,"getLeftFooterGroups")),e.getCenterFooterGroups=J(()=>[e.getCenterHeaderGroups()],t=>[...t].reverse(),Z(e.options,Re,"getCenterFooterGroups")),e.getRightFooterGroups=J(()=>[e.getRightHeaderGroups()],t=>[...t].reverse(),Z(e.options,Re,"getRightFooterGroups")),e.getFlatHeaders=J(()=>[e.getHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,Re,"getFlatHeaders")),e.getLeftFlatHeaders=J(()=>[e.getLeftHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,Re,"getLeftFlatHeaders")),e.getCenterFlatHeaders=J(()=>[e.getCenterHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,Re,"getCenterFlatHeaders")),e.getRightFlatHeaders=J(()=>[e.getRightHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,Re,"getRightFlatHeaders")),e.getCenterLeafHeaders=J(()=>[e.getCenterFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),Z(e.options,Re,"getCenterLeafHeaders")),e.getLeftLeafHeaders=J(()=>[e.getLeftFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),Z(e.options,Re,"getLeftLeafHeaders")),e.getRightLeafHeaders=J(()=>[e.getRightFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),Z(e.options,Re,"getRightLeafHeaders")),e.getLeafHeaders=J(()=>[e.getLeftHeaderGroups(),e.getCenterHeaderGroups(),e.getRightHeaderGroups()],(t,n,r)=>{var o,i,s,a,u,c;return[...(o=(i=t[0])==null?void 0:i.headers)!=null?o:[],...(s=(a=n[0])==null?void 0:a.headers)!=null?s:[],...(u=(c=r[0])==null?void 0:c.headers)!=null?u:[]].map(d=>d.getLeafHeaders()).flat()},Z(e.options,Re,"getLeafHeaders"))}};function Ln(e,t,n,r){var o,i;let s=0;const a=function(f,p){p===void 0&&(p=1),s=Math.max(s,p),f.filter(m=>m.getIsVisible()).forEach(m=>{var h;(h=m.columns)!=null&&h.length&&a(m.columns,p+1)},0)};a(e);let u=[];const c=(f,p)=>{const m={depth:p,id:[r,`${p}`].filter(Boolean).join("_"),headers:[]},h=[];f.forEach(b=>{const w=[...h].reverse()[0],P=b.column.depth===m.depth;let x,S=!1;if(P&&b.column.parent?x=b.column.parent:(x=b.column,S=!0),w&&(w==null?void 0:w.column)===x)w.subHeaders.push(b);else{const y=os(n,x,{id:[r,p,x.id,b==null?void 0:b.id].filter(Boolean).join("_"),isPlaceholder:S,placeholderId:S?`${h.filter(T=>T.column===x).length}`:void 0,depth:p,index:h.length});y.subHeaders.push(b),h.push(y)}m.headers.push(b),b.headerGroup=m}),u.push(m),p>0&&c(h,p-1)},d=t.map((f,p)=>os(n,f,{depth:s,index:p}));c(d,s-1),u.reverse();const g=f=>f.filter(m=>m.column.getIsVisible()).map(m=>{let h=0,b=0,w=[0];m.subHeaders&&m.subHeaders.length?(w=[],g(m.subHeaders).forEach(x=>{let{colSpan:S,rowSpan:y}=x;h+=S,w.push(y)})):h=1;const P=Math.min(...w);return b=b+P,m.colSpan=h,m.rowSpan=b,{colSpan:h,rowSpan:b}});return g((o=(i=u[0])==null?void 0:i.headers)!=null?o:[]),u}const Bo=(e,t,n,r,o,i,s)=>{let a={id:t,index:r,original:n,depth:o,parentId:s,_valuesCache:{},_uniqueValuesCache:{},getValue:u=>{if(a._valuesCache.hasOwnProperty(u))return a._valuesCache[u];const c=e.getColumn(u);if(c!=null&&c.accessorFn)return a._valuesCache[u]=c.accessorFn(a.original,r),a._valuesCache[u]},getUniqueValues:u=>{if(a._uniqueValuesCache.hasOwnProperty(u))return a._uniqueValuesCache[u];const c=e.getColumn(u);if(c!=null&&c.accessorFn)return c.columnDef.getUniqueValues?(a._uniqueValuesCache[u]=c.columnDef.getUniqueValues(a.original,r),a._uniqueValuesCache[u]):(a._uniqueValuesCache[u]=[a.getValue(u)],a._uniqueValuesCache[u])},renderValue:u=>{var c;return(c=a.getValue(u))!=null?c:e.options.renderFallbackValue},subRows:i??[],getLeafRows:()=>zg(a.subRows,u=>u.subRows),getParentRow:()=>a.parentId?e.getRow(a.parentId,!0):void 0,getParentRows:()=>{let u=[],c=a;for(;;){const d=c.getParentRow();if(!d)break;u.push(d),c=d}return u.reverse()},getAllCells:J(()=>[e.getAllLeafColumns()],u=>u.map(c=>Hg(e,a,c,c.id)),Z(e.options,"debugRows","getAllCells")),_getAllCellsByColumnId:J(()=>[a.getAllCells()],u=>u.reduce((c,d)=>(c[d.column.id]=d,c),{}),Z(e.options,"debugRows","getAllCellsByColumnId"))};for(let u=0;u<e._features.length;u++){const c=e._features[u];c==null||c.createRow==null||c.createRow(a,e)}return a},qg={createColumn:(e,t)=>{e._getFacetedRowModel=t.options.getFacetedRowModel&&t.options.getFacetedRowModel(t,e.id),e.getFacetedRowModel=()=>e._getFacetedRowModel?e._getFacetedRowModel():t.getPreFilteredRowModel(),e._getFacetedUniqueValues=t.options.getFacetedUniqueValues&&t.options.getFacetedUniqueValues(t,e.id),e.getFacetedUniqueValues=()=>e._getFacetedUniqueValues?e._getFacetedUniqueValues():new Map,e._getFacetedMinMaxValues=t.options.getFacetedMinMaxValues&&t.options.getFacetedMinMaxValues(t,e.id),e.getFacetedMinMaxValues=()=>{if(e._getFacetedMinMaxValues)return e._getFacetedMinMaxValues()}}},Ra=(e,t,n)=>{var r;const o=n.toLowerCase();return!!(!((r=e.getValue(t))==null||(r=r.toString())==null||(r=r.toLowerCase())==null)&&r.includes(o))};Ra.autoRemove=e=>Ke(e);const Ta=(e,t,n)=>{var r;return!!(!((r=e.getValue(t))==null||(r=r.toString())==null)&&r.includes(n))};Ta.autoRemove=e=>Ke(e);const ka=(e,t,n)=>{var r;return((r=e.getValue(t))==null||(r=r.toString())==null?void 0:r.toLowerCase())===(n==null?void 0:n.toLowerCase())};ka.autoRemove=e=>Ke(e);const Pa=(e,t,n)=>{var r;return(r=e.getValue(t))==null?void 0:r.includes(n)};Pa.autoRemove=e=>Ke(e)||!(e!=null&&e.length);const Oa=(e,t,n)=>!n.some(r=>{var o;return!((o=e.getValue(t))!=null&&o.includes(r))});Oa.autoRemove=e=>Ke(e)||!(e!=null&&e.length);const _a=(e,t,n)=>n.some(r=>{var o;return(o=e.getValue(t))==null?void 0:o.includes(r)});_a.autoRemove=e=>Ke(e)||!(e!=null&&e.length);const Na=(e,t,n)=>e.getValue(t)===n;Na.autoRemove=e=>Ke(e);const $a=(e,t,n)=>e.getValue(t)==n;$a.autoRemove=e=>Ke(e);const zo=(e,t,n)=>{let[r,o]=n;const i=e.getValue(t);return i>=r&&i<=o};zo.resolveFilterValue=e=>{let[t,n]=e,r=typeof t!="number"?parseFloat(t):t,o=typeof n!="number"?parseFloat(n):n,i=t===null||Number.isNaN(r)?-1/0:r,s=n===null||Number.isNaN(o)?1/0:o;if(i>s){const a=i;i=s,s=a}return[i,s]};zo.autoRemove=e=>Ke(e)||Ke(e[0])&&Ke(e[1]);const rt={includesString:Ra,includesStringSensitive:Ta,equalsString:ka,arrIncludes:Pa,arrIncludesAll:Oa,arrIncludesSome:_a,equals:Na,weakEquals:$a,inNumberRange:zo};function Ke(e){return e==null||e===""}const Wg={getDefaultColumnDef:()=>({filterFn:"auto"}),getInitialState:e=>({columnFilters:[],...e}),getDefaultOptions:e=>({onColumnFiltersChange:Le("columnFilters",e),filterFromLeafRows:!1,maxLeafRowFilterDepth:100}),createColumn:(e,t)=>{e.getAutoFilterFn=()=>{const n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);return typeof r=="string"?rt.includesString:typeof r=="number"?rt.inNumberRange:typeof r=="boolean"||r!==null&&typeof r=="object"?rt.equals:Array.isArray(r)?rt.arrIncludes:rt.weakEquals},e.getFilterFn=()=>{var n,r;return yr(e.columnDef.filterFn)?e.columnDef.filterFn:e.columnDef.filterFn==="auto"?e.getAutoFilterFn():(n=(r=t.options.filterFns)==null?void 0:r[e.columnDef.filterFn])!=null?n:rt[e.columnDef.filterFn]},e.getCanFilter=()=>{var n,r,o;return((n=e.columnDef.enableColumnFilter)!=null?n:!0)&&((r=t.options.enableColumnFilters)!=null?r:!0)&&((o=t.options.enableFilters)!=null?o:!0)&&!!e.accessorFn},e.getIsFiltered=()=>e.getFilterIndex()>-1,e.getFilterValue=()=>{var n;return(n=t.getState().columnFilters)==null||(n=n.find(r=>r.id===e.id))==null?void 0:n.value},e.getFilterIndex=()=>{var n,r;return(n=(r=t.getState().columnFilters)==null?void 0:r.findIndex(o=>o.id===e.id))!=null?n:-1},e.setFilterValue=n=>{t.setColumnFilters(r=>{const o=e.getFilterFn(),i=r==null?void 0:r.find(d=>d.id===e.id),s=gt(n,i?i.value:void 0);if(is(o,s,e)){var a;return(a=r==null?void 0:r.filter(d=>d.id!==e.id))!=null?a:[]}const u={id:e.id,value:s};if(i){var c;return(c=r==null?void 0:r.map(d=>d.id===e.id?u:d))!=null?c:[]}return r!=null&&r.length?[...r,u]:[u]})}},createRow:(e,t)=>{e.columnFilters={},e.columnFiltersMeta={}},createTable:e=>{e.setColumnFilters=t=>{const n=e.getAllLeafColumns(),r=o=>{var i;return(i=gt(t,o))==null?void 0:i.filter(s=>{const a=n.find(u=>u.id===s.id);if(a){const u=a.getFilterFn();if(is(u,s.value,a))return!1}return!0})};e.options.onColumnFiltersChange==null||e.options.onColumnFiltersChange(r)},e.resetColumnFilters=t=>{var n,r;e.setColumnFilters(t?[]:(n=(r=e.initialState)==null?void 0:r.columnFilters)!=null?n:[])},e.getPreFilteredRowModel=()=>e.getCoreRowModel(),e.getFilteredRowModel=()=>(!e._getFilteredRowModel&&e.options.getFilteredRowModel&&(e._getFilteredRowModel=e.options.getFilteredRowModel(e)),e.options.manualFiltering||!e._getFilteredRowModel?e.getPreFilteredRowModel():e._getFilteredRowModel())}};function is(e,t,n){return(e&&e.autoRemove?e.autoRemove(t,n):!1)||typeof t>"u"||typeof t=="string"&&!t}const Xg=(e,t,n)=>n.reduce((r,o)=>{const i=o.getValue(e);return r+(typeof i=="number"?i:0)},0),Kg=(e,t,n)=>{let r;return n.forEach(o=>{const i=o.getValue(e);i!=null&&(r>i||r===void 0&&i>=i)&&(r=i)}),r},Yg=(e,t,n)=>{let r;return n.forEach(o=>{const i=o.getValue(e);i!=null&&(r<i||r===void 0&&i>=i)&&(r=i)}),r},Jg=(e,t,n)=>{let r,o;return n.forEach(i=>{const s=i.getValue(e);s!=null&&(r===void 0?s>=s&&(r=o=s):(r>s&&(r=s),o<s&&(o=s)))}),[r,o]},Zg=(e,t)=>{let n=0,r=0;if(t.forEach(o=>{let i=o.getValue(e);i!=null&&(i=+i)>=i&&(++n,r+=i)}),n)return r/n},Qg=(e,t)=>{if(!t.length)return;const n=t.map(i=>i.getValue(e));if(!Bg(n))return;if(n.length===1)return n[0];const r=Math.floor(n.length/2),o=n.sort((i,s)=>i-s);return n.length%2!==0?o[r]:(o[r-1]+o[r])/2},em=(e,t)=>Array.from(new Set(t.map(n=>n.getValue(e))).values()),tm=(e,t)=>new Set(t.map(n=>n.getValue(e))).size,nm=(e,t)=>t.length,Vr={sum:Xg,min:Kg,max:Yg,extent:Jg,mean:Zg,median:Qg,unique:em,uniqueCount:tm,count:nm},rm={getDefaultColumnDef:()=>({aggregatedCell:e=>{var t,n;return(t=(n=e.getValue())==null||n.toString==null?void 0:n.toString())!=null?t:null},aggregationFn:"auto"}),getInitialState:e=>({grouping:[],...e}),getDefaultOptions:e=>({onGroupingChange:Le("grouping",e),groupedColumnMode:"reorder"}),createColumn:(e,t)=>{e.toggleGrouping=()=>{t.setGrouping(n=>n!=null&&n.includes(e.id)?n.filter(r=>r!==e.id):[...n??[],e.id])},e.getCanGroup=()=>{var n,r;return((n=e.columnDef.enableGrouping)!=null?n:!0)&&((r=t.options.enableGrouping)!=null?r:!0)&&(!!e.accessorFn||!!e.columnDef.getGroupingValue)},e.getIsGrouped=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.includes(e.id)},e.getGroupedIndex=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.indexOf(e.id)},e.getToggleGroupingHandler=()=>{const n=e.getCanGroup();return()=>{n&&e.toggleGrouping()}},e.getAutoAggregationFn=()=>{const n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);if(typeof r=="number")return Vr.sum;if(Object.prototype.toString.call(r)==="[object Date]")return Vr.extent},e.getAggregationFn=()=>{var n,r;if(!e)throw new Error;return yr(e.columnDef.aggregationFn)?e.columnDef.aggregationFn:e.columnDef.aggregationFn==="auto"?e.getAutoAggregationFn():(n=(r=t.options.aggregationFns)==null?void 0:r[e.columnDef.aggregationFn])!=null?n:Vr[e.columnDef.aggregationFn]}},createTable:e=>{e.setGrouping=t=>e.options.onGroupingChange==null?void 0:e.options.onGroupingChange(t),e.resetGrouping=t=>{var n,r;e.setGrouping(t?[]:(n=(r=e.initialState)==null?void 0:r.grouping)!=null?n:[])},e.getPreGroupedRowModel=()=>e.getFilteredRowModel(),e.getGroupedRowModel=()=>(!e._getGroupedRowModel&&e.options.getGroupedRowModel&&(e._getGroupedRowModel=e.options.getGroupedRowModel(e)),e.options.manualGrouping||!e._getGroupedRowModel?e.getPreGroupedRowModel():e._getGroupedRowModel())},createRow:(e,t)=>{e.getIsGrouped=()=>!!e.groupingColumnId,e.getGroupingValue=n=>{if(e._groupingValuesCache.hasOwnProperty(n))return e._groupingValuesCache[n];const r=t.getColumn(n);return r!=null&&r.columnDef.getGroupingValue?(e._groupingValuesCache[n]=r.columnDef.getGroupingValue(e.original),e._groupingValuesCache[n]):e.getValue(n)},e._groupingValuesCache={}},createCell:(e,t,n,r)=>{e.getIsGrouped=()=>t.getIsGrouped()&&t.id===n.groupingColumnId,e.getIsPlaceholder=()=>!e.getIsGrouped()&&t.getIsGrouped(),e.getIsAggregated=()=>{var o;return!e.getIsGrouped()&&!e.getIsPlaceholder()&&!!((o=n.subRows)!=null&&o.length)}}};function om(e,t,n){if(!(t!=null&&t.length)||!n)return e;const r=e.filter(i=>!t.includes(i.id));return n==="remove"?r:[...t.map(i=>e.find(s=>s.id===i)).filter(Boolean),...r]}const im={getInitialState:e=>({columnOrder:[],...e}),getDefaultOptions:e=>({onColumnOrderChange:Le("columnOrder",e)}),createColumn:(e,t)=>{e.getIndex=J(n=>[bn(t,n)],n=>n.findIndex(r=>r.id===e.id),Z(t.options,"debugColumns","getIndex")),e.getIsFirstColumn=n=>{var r;return((r=bn(t,n)[0])==null?void 0:r.id)===e.id},e.getIsLastColumn=n=>{var r;const o=bn(t,n);return((r=o[o.length-1])==null?void 0:r.id)===e.id}},createTable:e=>{e.setColumnOrder=t=>e.options.onColumnOrderChange==null?void 0:e.options.onColumnOrderChange(t),e.resetColumnOrder=t=>{var n;e.setColumnOrder(t?[]:(n=e.initialState.columnOrder)!=null?n:[])},e._getOrderColumnsFn=J(()=>[e.getState().columnOrder,e.getState().grouping,e.options.groupedColumnMode],(t,n,r)=>o=>{let i=[];if(!(t!=null&&t.length))i=o;else{const s=[...t],a=[...o];for(;a.length&&s.length;){const u=s.shift(),c=a.findIndex(d=>d.id===u);c>-1&&i.push(a.splice(c,1)[0])}i=[...i,...a]}return om(i,n,r)},Z(e.options,"debugTable","_getOrderColumnsFn"))}},Lr=()=>({left:[],right:[]}),sm={getInitialState:e=>({columnPinning:Lr(),...e}),getDefaultOptions:e=>({onColumnPinningChange:Le("columnPinning",e)}),createColumn:(e,t)=>{e.pin=n=>{const r=e.getLeafColumns().map(o=>o.id).filter(Boolean);t.setColumnPinning(o=>{var i,s;if(n==="right"){var a,u;return{left:((a=o==null?void 0:o.left)!=null?a:[]).filter(g=>!(r!=null&&r.includes(g))),right:[...((u=o==null?void 0:o.right)!=null?u:[]).filter(g=>!(r!=null&&r.includes(g))),...r]}}if(n==="left"){var c,d;return{left:[...((c=o==null?void 0:o.left)!=null?c:[]).filter(g=>!(r!=null&&r.includes(g))),...r],right:((d=o==null?void 0:o.right)!=null?d:[]).filter(g=>!(r!=null&&r.includes(g)))}}return{left:((i=o==null?void 0:o.left)!=null?i:[]).filter(g=>!(r!=null&&r.includes(g))),right:((s=o==null?void 0:o.right)!=null?s:[]).filter(g=>!(r!=null&&r.includes(g)))}})},e.getCanPin=()=>e.getLeafColumns().some(r=>{var o,i,s;return((o=r.columnDef.enablePinning)!=null?o:!0)&&((i=(s=t.options.enableColumnPinning)!=null?s:t.options.enablePinning)!=null?i:!0)}),e.getIsPinned=()=>{const n=e.getLeafColumns().map(a=>a.id),{left:r,right:o}=t.getState().columnPinning,i=n.some(a=>r==null?void 0:r.includes(a)),s=n.some(a=>o==null?void 0:o.includes(a));return i?"left":s?"right":!1},e.getPinnedIndex=()=>{var n,r;const o=e.getIsPinned();return o?(n=(r=t.getState().columnPinning)==null||(r=r[o])==null?void 0:r.indexOf(e.id))!=null?n:-1:0}},createRow:(e,t)=>{e.getCenterVisibleCells=J(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left,t.getState().columnPinning.right],(n,r,o)=>{const i=[...r??[],...o??[]];return n.filter(s=>!i.includes(s.column.id))},Z(t.options,"debugRows","getCenterVisibleCells")),e.getLeftVisibleCells=J(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left],(n,r)=>(r??[]).map(i=>n.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"left"})),Z(t.options,"debugRows","getLeftVisibleCells")),e.getRightVisibleCells=J(()=>[e._getAllVisibleCells(),t.getState().columnPinning.right],(n,r)=>(r??[]).map(i=>n.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"right"})),Z(t.options,"debugRows","getRightVisibleCells"))},createTable:e=>{e.setColumnPinning=t=>e.options.onColumnPinningChange==null?void 0:e.options.onColumnPinningChange(t),e.resetColumnPinning=t=>{var n,r;return e.setColumnPinning(t?Lr():(n=(r=e.initialState)==null?void 0:r.columnPinning)!=null?n:Lr())},e.getIsSomeColumnsPinned=t=>{var n;const r=e.getState().columnPinning;if(!t){var o,i;return!!((o=r.left)!=null&&o.length||(i=r.right)!=null&&i.length)}return!!((n=r[t])!=null&&n.length)},e.getLeftLeafColumns=J(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left],(t,n)=>(n??[]).map(r=>t.find(o=>o.id===r)).filter(Boolean),Z(e.options,"debugColumns","getLeftLeafColumns")),e.getRightLeafColumns=J(()=>[e.getAllLeafColumns(),e.getState().columnPinning.right],(t,n)=>(n??[]).map(r=>t.find(o=>o.id===r)).filter(Boolean),Z(e.options,"debugColumns","getRightLeafColumns")),e.getCenterLeafColumns=J(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r)=>{const o=[...n??[],...r??[]];return t.filter(i=>!o.includes(i.id))},Z(e.options,"debugColumns","getCenterLeafColumns"))}},Bn={size:150,minSize:20,maxSize:Number.MAX_SAFE_INTEGER},Br=()=>({startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,isResizingColumn:!1,columnSizingStart:[]}),am={getDefaultColumnDef:()=>Bn,getInitialState:e=>({columnSizing:{},columnSizingInfo:Br(),...e}),getDefaultOptions:e=>({columnResizeMode:"onEnd",columnResizeDirection:"ltr",onColumnSizingChange:Le("columnSizing",e),onColumnSizingInfoChange:Le("columnSizingInfo",e)}),createColumn:(e,t)=>{e.getSize=()=>{var n,r,o;const i=t.getState().columnSizing[e.id];return Math.min(Math.max((n=e.columnDef.minSize)!=null?n:Bn.minSize,(r=i??e.columnDef.size)!=null?r:Bn.size),(o=e.columnDef.maxSize)!=null?o:Bn.maxSize)},e.getStart=J(n=>[n,bn(t,n),t.getState().columnSizing],(n,r)=>r.slice(0,e.getIndex(n)).reduce((o,i)=>o+i.getSize(),0),Z(t.options,"debugColumns","getStart")),e.getAfter=J(n=>[n,bn(t,n),t.getState().columnSizing],(n,r)=>r.slice(e.getIndex(n)+1).reduce((o,i)=>o+i.getSize(),0),Z(t.options,"debugColumns","getAfter")),e.resetSize=()=>{t.setColumnSizing(n=>{let{[e.id]:r,...o}=n;return o})},e.getCanResize=()=>{var n,r;return((n=e.columnDef.enableResizing)!=null?n:!0)&&((r=t.options.enableColumnResizing)!=null?r:!0)},e.getIsResizing=()=>t.getState().columnSizingInfo.isResizingColumn===e.id},createHeader:(e,t)=>{e.getSize=()=>{let n=0;const r=o=>{if(o.subHeaders.length)o.subHeaders.forEach(r);else{var i;n+=(i=o.column.getSize())!=null?i:0}};return r(e),n},e.getStart=()=>{if(e.index>0){const n=e.headerGroup.headers[e.index-1];return n.getStart()+n.getSize()}return 0},e.getResizeHandler=n=>{const r=t.getColumn(e.column.id),o=r==null?void 0:r.getCanResize();return i=>{if(!r||!o||(i.persist==null||i.persist(),zr(i)&&i.touches&&i.touches.length>1))return;const s=e.getSize(),a=e?e.getLeafHeaders().map(w=>[w.column.id,w.column.getSize()]):[[r.id,r.getSize()]],u=zr(i)?Math.round(i.touches[0].clientX):i.clientX,c={},d=(w,P)=>{typeof P=="number"&&(t.setColumnSizingInfo(x=>{var S,y;const T=t.options.columnResizeDirection==="rtl"?-1:1,O=(P-((S=x==null?void 0:x.startOffset)!=null?S:0))*T,A=Math.max(O/((y=x==null?void 0:x.startSize)!=null?y:0),-.999999);return x.columnSizingStart.forEach(D=>{let[L,k]=D;c[L]=Math.round(Math.max(k+k*A,0)*100)/100}),{...x,deltaOffset:O,deltaPercentage:A}}),(t.options.columnResizeMode==="onChange"||w==="end")&&t.setColumnSizing(x=>({...x,...c})))},g=w=>d("move",w),f=w=>{d("end",w),t.setColumnSizingInfo(P=>({...P,isResizingColumn:!1,startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,columnSizingStart:[]}))},p=n||typeof document<"u"?document:null,m={moveHandler:w=>g(w.clientX),upHandler:w=>{p==null||p.removeEventListener("mousemove",m.moveHandler),p==null||p.removeEventListener("mouseup",m.upHandler),f(w.clientX)}},h={moveHandler:w=>(w.cancelable&&(w.preventDefault(),w.stopPropagation()),g(w.touches[0].clientX),!1),upHandler:w=>{var P;p==null||p.removeEventListener("touchmove",h.moveHandler),p==null||p.removeEventListener("touchend",h.upHandler),w.cancelable&&(w.preventDefault(),w.stopPropagation()),f((P=w.touches[0])==null?void 0:P.clientX)}},b=lm()?{passive:!1}:!1;zr(i)?(p==null||p.addEventListener("touchmove",h.moveHandler,b),p==null||p.addEventListener("touchend",h.upHandler,b)):(p==null||p.addEventListener("mousemove",m.moveHandler,b),p==null||p.addEventListener("mouseup",m.upHandler,b)),t.setColumnSizingInfo(w=>({...w,startOffset:u,startSize:s,deltaOffset:0,deltaPercentage:0,columnSizingStart:a,isResizingColumn:r.id}))}}},createTable:e=>{e.setColumnSizing=t=>e.options.onColumnSizingChange==null?void 0:e.options.onColumnSizingChange(t),e.setColumnSizingInfo=t=>e.options.onColumnSizingInfoChange==null?void 0:e.options.onColumnSizingInfoChange(t),e.resetColumnSizing=t=>{var n;e.setColumnSizing(t?{}:(n=e.initialState.columnSizing)!=null?n:{})},e.resetHeaderSizeInfo=t=>{var n;e.setColumnSizingInfo(t?Br():(n=e.initialState.columnSizingInfo)!=null?n:Br())},e.getTotalSize=()=>{var t,n;return(t=(n=e.getHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getLeftTotalSize=()=>{var t,n;return(t=(n=e.getLeftHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getCenterTotalSize=()=>{var t,n;return(t=(n=e.getCenterHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getRightTotalSize=()=>{var t,n;return(t=(n=e.getRightHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0}}};let zn=null;function lm(){if(typeof zn=="boolean")return zn;let e=!1;try{const t={get passive(){return e=!0,!1}},n=()=>{};window.addEventListener("test",n,t),window.removeEventListener("test",n)}catch{e=!1}return zn=e,zn}function zr(e){return e.type==="touchstart"}const um={getInitialState:e=>({columnVisibility:{},...e}),getDefaultOptions:e=>({onColumnVisibilityChange:Le("columnVisibility",e)}),createColumn:(e,t)=>{e.toggleVisibility=n=>{e.getCanHide()&&t.setColumnVisibility(r=>({...r,[e.id]:n??!e.getIsVisible()}))},e.getIsVisible=()=>{var n,r;const o=e.columns;return(n=o.length?o.some(i=>i.getIsVisible()):(r=t.getState().columnVisibility)==null?void 0:r[e.id])!=null?n:!0},e.getCanHide=()=>{var n,r;return((n=e.columnDef.enableHiding)!=null?n:!0)&&((r=t.options.enableHiding)!=null?r:!0)},e.getToggleVisibilityHandler=()=>n=>{e.toggleVisibility==null||e.toggleVisibility(n.target.checked)}},createRow:(e,t)=>{e._getAllVisibleCells=J(()=>[e.getAllCells(),t.getState().columnVisibility],n=>n.filter(r=>r.column.getIsVisible()),Z(t.options,"debugRows","_getAllVisibleCells")),e.getVisibleCells=J(()=>[e.getLeftVisibleCells(),e.getCenterVisibleCells(),e.getRightVisibleCells()],(n,r,o)=>[...n,...r,...o],Z(t.options,"debugRows","getVisibleCells"))},createTable:e=>{const t=(n,r)=>J(()=>[r(),r().filter(o=>o.getIsVisible()).map(o=>o.id).join("_")],o=>o.filter(i=>i.getIsVisible==null?void 0:i.getIsVisible()),Z(e.options,"debugColumns",n));e.getVisibleFlatColumns=t("getVisibleFlatColumns",()=>e.getAllFlatColumns()),e.getVisibleLeafColumns=t("getVisibleLeafColumns",()=>e.getAllLeafColumns()),e.getLeftVisibleLeafColumns=t("getLeftVisibleLeafColumns",()=>e.getLeftLeafColumns()),e.getRightVisibleLeafColumns=t("getRightVisibleLeafColumns",()=>e.getRightLeafColumns()),e.getCenterVisibleLeafColumns=t("getCenterVisibleLeafColumns",()=>e.getCenterLeafColumns()),e.setColumnVisibility=n=>e.options.onColumnVisibilityChange==null?void 0:e.options.onColumnVisibilityChange(n),e.resetColumnVisibility=n=>{var r;e.setColumnVisibility(n?{}:(r=e.initialState.columnVisibility)!=null?r:{})},e.toggleAllColumnsVisible=n=>{var r;n=(r=n)!=null?r:!e.getIsAllColumnsVisible(),e.setColumnVisibility(e.getAllLeafColumns().reduce((o,i)=>({...o,[i.id]:n||!(i.getCanHide!=null&&i.getCanHide())}),{}))},e.getIsAllColumnsVisible=()=>!e.getAllLeafColumns().some(n=>!(n.getIsVisible!=null&&n.getIsVisible())),e.getIsSomeColumnsVisible=()=>e.getAllLeafColumns().some(n=>n.getIsVisible==null?void 0:n.getIsVisible()),e.getToggleAllColumnsVisibilityHandler=()=>n=>{var r;e.toggleAllColumnsVisible((r=n.target)==null?void 0:r.checked)}}};function bn(e,t){return t?t==="center"?e.getCenterVisibleLeafColumns():t==="left"?e.getLeftVisibleLeafColumns():e.getRightVisibleLeafColumns():e.getVisibleLeafColumns()}const cm={createTable:e=>{e._getGlobalFacetedRowModel=e.options.getFacetedRowModel&&e.options.getFacetedRowModel(e,"__global__"),e.getGlobalFacetedRowModel=()=>e.options.manualFiltering||!e._getGlobalFacetedRowModel?e.getPreFilteredRowModel():e._getGlobalFacetedRowModel(),e._getGlobalFacetedUniqueValues=e.options.getFacetedUniqueValues&&e.options.getFacetedUniqueValues(e,"__global__"),e.getGlobalFacetedUniqueValues=()=>e._getGlobalFacetedUniqueValues?e._getGlobalFacetedUniqueValues():new Map,e._getGlobalFacetedMinMaxValues=e.options.getFacetedMinMaxValues&&e.options.getFacetedMinMaxValues(e,"__global__"),e.getGlobalFacetedMinMaxValues=()=>{if(e._getGlobalFacetedMinMaxValues)return e._getGlobalFacetedMinMaxValues()}}},dm={getInitialState:e=>({globalFilter:void 0,...e}),getDefaultOptions:e=>({onGlobalFilterChange:Le("globalFilter",e),globalFilterFn:"auto",getColumnCanGlobalFilter:t=>{var n;const r=(n=e.getCoreRowModel().flatRows[0])==null||(n=n._getAllCellsByColumnId()[t.id])==null?void 0:n.getValue();return typeof r=="string"||typeof r=="number"}}),createColumn:(e,t)=>{e.getCanGlobalFilter=()=>{var n,r,o,i;return((n=e.columnDef.enableGlobalFilter)!=null?n:!0)&&((r=t.options.enableGlobalFilter)!=null?r:!0)&&((o=t.options.enableFilters)!=null?o:!0)&&((i=t.options.getColumnCanGlobalFilter==null?void 0:t.options.getColumnCanGlobalFilter(e))!=null?i:!0)&&!!e.accessorFn}},createTable:e=>{e.getGlobalAutoFilterFn=()=>rt.includesString,e.getGlobalFilterFn=()=>{var t,n;const{globalFilterFn:r}=e.options;return yr(r)?r:r==="auto"?e.getGlobalAutoFilterFn():(t=(n=e.options.filterFns)==null?void 0:n[r])!=null?t:rt[r]},e.setGlobalFilter=t=>{e.options.onGlobalFilterChange==null||e.options.onGlobalFilterChange(t)},e.resetGlobalFilter=t=>{e.setGlobalFilter(t?void 0:e.initialState.globalFilter)}}},pm={getInitialState:e=>({expanded:{},...e}),getDefaultOptions:e=>({onExpandedChange:Le("expanded",e),paginateExpandedRows:!0}),createTable:e=>{let t=!1,n=!1;e._autoResetExpanded=()=>{var r,o;if(!t){e._queue(()=>{t=!0});return}if((r=(o=e.options.autoResetAll)!=null?o:e.options.autoResetExpanded)!=null?r:!e.options.manualExpanding){if(n)return;n=!0,e._queue(()=>{e.resetExpanded(),n=!1})}},e.setExpanded=r=>e.options.onExpandedChange==null?void 0:e.options.onExpandedChange(r),e.toggleAllRowsExpanded=r=>{r??!e.getIsAllRowsExpanded()?e.setExpanded(!0):e.setExpanded({})},e.resetExpanded=r=>{var o,i;e.setExpanded(r?{}:(o=(i=e.initialState)==null?void 0:i.expanded)!=null?o:{})},e.getCanSomeRowsExpand=()=>e.getPrePaginationRowModel().flatRows.some(r=>r.getCanExpand()),e.getToggleAllRowsExpandedHandler=()=>r=>{r.persist==null||r.persist(),e.toggleAllRowsExpanded()},e.getIsSomeRowsExpanded=()=>{const r=e.getState().expanded;return r===!0||Object.values(r).some(Boolean)},e.getIsAllRowsExpanded=()=>{const r=e.getState().expanded;return typeof r=="boolean"?r===!0:!(!Object.keys(r).length||e.getRowModel().flatRows.some(o=>!o.getIsExpanded()))},e.getExpandedDepth=()=>{let r=0;return(e.getState().expanded===!0?Object.keys(e.getRowModel().rowsById):Object.keys(e.getState().expanded)).forEach(i=>{const s=i.split(".");r=Math.max(r,s.length)}),r},e.getPreExpandedRowModel=()=>e.getSortedRowModel(),e.getExpandedRowModel=()=>(!e._getExpandedRowModel&&e.options.getExpandedRowModel&&(e._getExpandedRowModel=e.options.getExpandedRowModel(e)),e.options.manualExpanding||!e._getExpandedRowModel?e.getPreExpandedRowModel():e._getExpandedRowModel())},createRow:(e,t)=>{e.toggleExpanded=n=>{t.setExpanded(r=>{var o;const i=r===!0?!0:!!(r!=null&&r[e.id]);let s={};if(r===!0?Object.keys(t.getRowModel().rowsById).forEach(a=>{s[a]=!0}):s=r,n=(o=n)!=null?o:!i,!i&&n)return{...s,[e.id]:!0};if(i&&!n){const{[e.id]:a,...u}=s;return u}return r})},e.getIsExpanded=()=>{var n;const r=t.getState().expanded;return!!((n=t.options.getIsRowExpanded==null?void 0:t.options.getIsRowExpanded(e))!=null?n:r===!0||r!=null&&r[e.id])},e.getCanExpand=()=>{var n,r,o;return(n=t.options.getRowCanExpand==null?void 0:t.options.getRowCanExpand(e))!=null?n:((r=t.options.enableExpanding)!=null?r:!0)&&!!((o=e.subRows)!=null&&o.length)},e.getIsAllParentsExpanded=()=>{let n=!0,r=e;for(;n&&r.parentId;)r=t.getRow(r.parentId,!0),n=r.getIsExpanded();return n},e.getToggleExpandedHandler=()=>{const n=e.getCanExpand();return()=>{n&&e.toggleExpanded()}}}},io=0,so=10,Hr=()=>({pageIndex:io,pageSize:so}),fm={getInitialState:e=>({...e,pagination:{...Hr(),...e==null?void 0:e.pagination}}),getDefaultOptions:e=>({onPaginationChange:Le("pagination",e)}),createTable:e=>{let t=!1,n=!1;e._autoResetPageIndex=()=>{var r,o;if(!t){e._queue(()=>{t=!0});return}if((r=(o=e.options.autoResetAll)!=null?o:e.options.autoResetPageIndex)!=null?r:!e.options.manualPagination){if(n)return;n=!0,e._queue(()=>{e.resetPageIndex(),n=!1})}},e.setPagination=r=>{const o=i=>gt(r,i);return e.options.onPaginationChange==null?void 0:e.options.onPaginationChange(o)},e.resetPagination=r=>{var o;e.setPagination(r?Hr():(o=e.initialState.pagination)!=null?o:Hr())},e.setPageIndex=r=>{e.setPagination(o=>{let i=gt(r,o.pageIndex);const s=typeof e.options.pageCount>"u"||e.options.pageCount===-1?Number.MAX_SAFE_INTEGER:e.options.pageCount-1;return i=Math.max(0,Math.min(i,s)),{...o,pageIndex:i}})},e.resetPageIndex=r=>{var o,i;e.setPageIndex(r?io:(o=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageIndex)!=null?o:io)},e.resetPageSize=r=>{var o,i;e.setPageSize(r?so:(o=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageSize)!=null?o:so)},e.setPageSize=r=>{e.setPagination(o=>{const i=Math.max(1,gt(r,o.pageSize)),s=o.pageSize*o.pageIndex,a=Math.floor(s/i);return{...o,pageIndex:a,pageSize:i}})},e.setPageCount=r=>e.setPagination(o=>{var i;let s=gt(r,(i=e.options.pageCount)!=null?i:-1);return typeof s=="number"&&(s=Math.max(-1,s)),{...o,pageCount:s}}),e.getPageOptions=J(()=>[e.getPageCount()],r=>{let o=[];return r&&r>0&&(o=[...new Array(r)].fill(null).map((i,s)=>s)),o},Z(e.options,"debugTable","getPageOptions")),e.getCanPreviousPage=()=>e.getState().pagination.pageIndex>0,e.getCanNextPage=()=>{const{pageIndex:r}=e.getState().pagination,o=e.getPageCount();return o===-1?!0:o===0?!1:r<o-1},e.previousPage=()=>e.setPageIndex(r=>r-1),e.nextPage=()=>e.setPageIndex(r=>r+1),e.firstPage=()=>e.setPageIndex(0),e.lastPage=()=>e.setPageIndex(e.getPageCount()-1),e.getPrePaginationRowModel=()=>e.getExpandedRowModel(),e.getPaginationRowModel=()=>(!e._getPaginationRowModel&&e.options.getPaginationRowModel&&(e._getPaginationRowModel=e.options.getPaginationRowModel(e)),e.options.manualPagination||!e._getPaginationRowModel?e.getPrePaginationRowModel():e._getPaginationRowModel()),e.getPageCount=()=>{var r;return(r=e.options.pageCount)!=null?r:Math.ceil(e.getRowCount()/e.getState().pagination.pageSize)},e.getRowCount=()=>{var r;return(r=e.options.rowCount)!=null?r:e.getPrePaginationRowModel().rows.length}}},Gr=()=>({top:[],bottom:[]}),gm={getInitialState:e=>({rowPinning:Gr(),...e}),getDefaultOptions:e=>({onRowPinningChange:Le("rowPinning",e)}),createRow:(e,t)=>{e.pin=(n,r,o)=>{const i=r?e.getLeafRows().map(u=>{let{id:c}=u;return c}):[],s=o?e.getParentRows().map(u=>{let{id:c}=u;return c}):[],a=new Set([...s,e.id,...i]);t.setRowPinning(u=>{var c,d;if(n==="bottom"){var g,f;return{top:((g=u==null?void 0:u.top)!=null?g:[]).filter(h=>!(a!=null&&a.has(h))),bottom:[...((f=u==null?void 0:u.bottom)!=null?f:[]).filter(h=>!(a!=null&&a.has(h))),...Array.from(a)]}}if(n==="top"){var p,m;return{top:[...((p=u==null?void 0:u.top)!=null?p:[]).filter(h=>!(a!=null&&a.has(h))),...Array.from(a)],bottom:((m=u==null?void 0:u.bottom)!=null?m:[]).filter(h=>!(a!=null&&a.has(h)))}}return{top:((c=u==null?void 0:u.top)!=null?c:[]).filter(h=>!(a!=null&&a.has(h))),bottom:((d=u==null?void 0:u.bottom)!=null?d:[]).filter(h=>!(a!=null&&a.has(h)))}})},e.getCanPin=()=>{var n;const{enableRowPinning:r,enablePinning:o}=t.options;return typeof r=="function"?r(e):(n=r??o)!=null?n:!0},e.getIsPinned=()=>{const n=[e.id],{top:r,bottom:o}=t.getState().rowPinning,i=n.some(a=>r==null?void 0:r.includes(a)),s=n.some(a=>o==null?void 0:o.includes(a));return i?"top":s?"bottom":!1},e.getPinnedIndex=()=>{var n,r;const o=e.getIsPinned();if(!o)return-1;const i=(n=t._getPinnedRows(o))==null?void 0:n.map(s=>{let{id:a}=s;return a});return(r=i==null?void 0:i.indexOf(e.id))!=null?r:-1}},createTable:e=>{e.setRowPinning=t=>e.options.onRowPinningChange==null?void 0:e.options.onRowPinningChange(t),e.resetRowPinning=t=>{var n,r;return e.setRowPinning(t?Gr():(n=(r=e.initialState)==null?void 0:r.rowPinning)!=null?n:Gr())},e.getIsSomeRowsPinned=t=>{var n;const r=e.getState().rowPinning;if(!t){var o,i;return!!((o=r.top)!=null&&o.length||(i=r.bottom)!=null&&i.length)}return!!((n=r[t])!=null&&n.length)},e._getPinnedRows=J(t=>[e.getRowModel().rows,e.getState().rowPinning[t],t],(t,n,r)=>{var o;return((o=e.options.keepPinnedRows)==null||o?(n??[]).map(s=>{const a=e.getRow(s,!0);return a.getIsAllParentsExpanded()?a:null}):(n??[]).map(s=>t.find(a=>a.id===s))).filter(Boolean).map(s=>({...s,position:r}))},Z(e.options,"debugRows","_getPinnedRows")),e.getTopRows=()=>e._getPinnedRows("top"),e.getBottomRows=()=>e._getPinnedRows("bottom"),e.getCenterRows=J(()=>[e.getRowModel().rows,e.getState().rowPinning.top,e.getState().rowPinning.bottom],(t,n,r)=>{const o=new Set([...n??[],...r??[]]);return t.filter(i=>!o.has(i.id))},Z(e.options,"debugRows","getCenterRows"))}},mm={getInitialState:e=>({rowSelection:{},...e}),getDefaultOptions:e=>({onRowSelectionChange:Le("rowSelection",e),enableRowSelection:!0,enableMultiRowSelection:!0,enableSubRowSelection:!0}),createTable:e=>{e.setRowSelection=t=>e.options.onRowSelectionChange==null?void 0:e.options.onRowSelectionChange(t),e.resetRowSelection=t=>{var n;return e.setRowSelection(t?{}:(n=e.initialState.rowSelection)!=null?n:{})},e.toggleAllRowsSelected=t=>{e.setRowSelection(n=>{t=typeof t<"u"?t:!e.getIsAllRowsSelected();const r={...n},o=e.getPreGroupedRowModel().flatRows;return t?o.forEach(i=>{i.getCanSelect()&&(r[i.id]=!0)}):o.forEach(i=>{delete r[i.id]}),r})},e.toggleAllPageRowsSelected=t=>e.setRowSelection(n=>{const r=typeof t<"u"?t:!e.getIsAllPageRowsSelected(),o={...n};return e.getRowModel().rows.forEach(i=>{ao(o,i.id,r,!0,e)}),o}),e.getPreSelectedRowModel=()=>e.getCoreRowModel(),e.getSelectedRowModel=J(()=>[e.getState().rowSelection,e.getCoreRowModel()],(t,n)=>Object.keys(t).length?Ur(e,n):{rows:[],flatRows:[],rowsById:{}},Z(e.options,"debugTable","getSelectedRowModel")),e.getFilteredSelectedRowModel=J(()=>[e.getState().rowSelection,e.getFilteredRowModel()],(t,n)=>Object.keys(t).length?Ur(e,n):{rows:[],flatRows:[],rowsById:{}},Z(e.options,"debugTable","getFilteredSelectedRowModel")),e.getGroupedSelectedRowModel=J(()=>[e.getState().rowSelection,e.getSortedRowModel()],(t,n)=>Object.keys(t).length?Ur(e,n):{rows:[],flatRows:[],rowsById:{}},Z(e.options,"debugTable","getGroupedSelectedRowModel")),e.getIsAllRowsSelected=()=>{const t=e.getFilteredRowModel().flatRows,{rowSelection:n}=e.getState();let r=!!(t.length&&Object.keys(n).length);return r&&t.some(o=>o.getCanSelect()&&!n[o.id])&&(r=!1),r},e.getIsAllPageRowsSelected=()=>{const t=e.getPaginationRowModel().flatRows.filter(o=>o.getCanSelect()),{rowSelection:n}=e.getState();let r=!!t.length;return r&&t.some(o=>!n[o.id])&&(r=!1),r},e.getIsSomeRowsSelected=()=>{var t;const n=Object.keys((t=e.getState().rowSelection)!=null?t:{}).length;return n>0&&n<e.getFilteredRowModel().flatRows.length},e.getIsSomePageRowsSelected=()=>{const t=e.getPaginationRowModel().flatRows;return e.getIsAllPageRowsSelected()?!1:t.filter(n=>n.getCanSelect()).some(n=>n.getIsSelected()||n.getIsSomeSelected())},e.getToggleAllRowsSelectedHandler=()=>t=>{e.toggleAllRowsSelected(t.target.checked)},e.getToggleAllPageRowsSelectedHandler=()=>t=>{e.toggleAllPageRowsSelected(t.target.checked)}},createRow:(e,t)=>{e.toggleSelected=(n,r)=>{const o=e.getIsSelected();t.setRowSelection(i=>{var s;if(n=typeof n<"u"?n:!o,e.getCanSelect()&&o===n)return i;const a={...i};return ao(a,e.id,n,(s=r==null?void 0:r.selectChildren)!=null?s:!0,t),a})},e.getIsSelected=()=>{const{rowSelection:n}=t.getState();return Ho(e,n)},e.getIsSomeSelected=()=>{const{rowSelection:n}=t.getState();return lo(e,n)==="some"},e.getIsAllSubRowsSelected=()=>{const{rowSelection:n}=t.getState();return lo(e,n)==="all"},e.getCanSelect=()=>{var n;return typeof t.options.enableRowSelection=="function"?t.options.enableRowSelection(e):(n=t.options.enableRowSelection)!=null?n:!0},e.getCanSelectSubRows=()=>{var n;return typeof t.options.enableSubRowSelection=="function"?t.options.enableSubRowSelection(e):(n=t.options.enableSubRowSelection)!=null?n:!0},e.getCanMultiSelect=()=>{var n;return typeof t.options.enableMultiRowSelection=="function"?t.options.enableMultiRowSelection(e):(n=t.options.enableMultiRowSelection)!=null?n:!0},e.getToggleSelectedHandler=()=>{const n=e.getCanSelect();return r=>{var o;n&&e.toggleSelected((o=r.target)==null?void 0:o.checked)}}}},ao=(e,t,n,r,o)=>{var i;const s=o.getRow(t,!0);n?(s.getCanMultiSelect()||Object.keys(e).forEach(a=>delete e[a]),s.getCanSelect()&&(e[t]=!0)):delete e[t],r&&(i=s.subRows)!=null&&i.length&&s.getCanSelectSubRows()&&s.subRows.forEach(a=>ao(e,a.id,n,r,o))};function Ur(e,t){const n=e.getState().rowSelection,r=[],o={},i=function(s,a){return s.map(u=>{var c;const d=Ho(u,n);if(d&&(r.push(u),o[u.id]=u),(c=u.subRows)!=null&&c.length&&(u={...u,subRows:i(u.subRows)}),d)return u}).filter(Boolean)};return{rows:i(t.rows),flatRows:r,rowsById:o}}function Ho(e,t){var n;return(n=t[e.id])!=null?n:!1}function lo(e,t,n){var r;if(!((r=e.subRows)!=null&&r.length))return!1;let o=!0,i=!1;return e.subRows.forEach(s=>{if(!(i&&!o)&&(s.getCanSelect()&&(Ho(s,t)?i=!0:o=!1),s.subRows&&s.subRows.length)){const a=lo(s,t);a==="all"?i=!0:(a==="some"&&(i=!0),o=!1)}}),o?"all":i?"some":!1}const uo=/([0-9]+)/gm,hm=(e,t,n)=>Ma(mt(e.getValue(n)).toLowerCase(),mt(t.getValue(n)).toLowerCase()),vm=(e,t,n)=>Ma(mt(e.getValue(n)),mt(t.getValue(n))),bm=(e,t,n)=>Go(mt(e.getValue(n)).toLowerCase(),mt(t.getValue(n)).toLowerCase()),ym=(e,t,n)=>Go(mt(e.getValue(n)),mt(t.getValue(n))),wm=(e,t,n)=>{const r=e.getValue(n),o=t.getValue(n);return r>o?1:r<o?-1:0},xm=(e,t,n)=>Go(e.getValue(n),t.getValue(n));function Go(e,t){return e===t?0:e>t?1:-1}function mt(e){return typeof e=="number"?isNaN(e)||e===1/0||e===-1/0?"":String(e):typeof e=="string"?e:""}function Ma(e,t){const n=e.split(uo).filter(Boolean),r=t.split(uo).filter(Boolean);for(;n.length&&r.length;){const o=n.shift(),i=r.shift(),s=parseInt(o,10),a=parseInt(i,10),u=[s,a].sort();if(isNaN(u[0])){if(o>i)return 1;if(i>o)return-1;continue}if(isNaN(u[1]))return isNaN(s)?-1:1;if(s>a)return 1;if(a>s)return-1}return n.length-r.length}const ln={alphanumeric:hm,alphanumericCaseSensitive:vm,text:bm,textCaseSensitive:ym,datetime:wm,basic:xm},Sm={getInitialState:e=>({sorting:[],...e}),getDefaultColumnDef:()=>({sortingFn:"auto",sortUndefined:1}),getDefaultOptions:e=>({onSortingChange:Le("sorting",e),isMultiSortEvent:t=>t.shiftKey}),createColumn:(e,t)=>{e.getAutoSortingFn=()=>{const n=t.getFilteredRowModel().flatRows.slice(10);let r=!1;for(const o of n){const i=o==null?void 0:o.getValue(e.id);if(Object.prototype.toString.call(i)==="[object Date]")return ln.datetime;if(typeof i=="string"&&(r=!0,i.split(uo).length>1))return ln.alphanumeric}return r?ln.text:ln.basic},e.getAutoSortDir=()=>{const n=t.getFilteredRowModel().flatRows[0];return typeof(n==null?void 0:n.getValue(e.id))=="string"?"asc":"desc"},e.getSortingFn=()=>{var n,r;if(!e)throw new Error;return yr(e.columnDef.sortingFn)?e.columnDef.sortingFn:e.columnDef.sortingFn==="auto"?e.getAutoSortingFn():(n=(r=t.options.sortingFns)==null?void 0:r[e.columnDef.sortingFn])!=null?n:ln[e.columnDef.sortingFn]},e.toggleSorting=(n,r)=>{const o=e.getNextSortingOrder(),i=typeof n<"u"&&n!==null;t.setSorting(s=>{const a=s==null?void 0:s.find(p=>p.id===e.id),u=s==null?void 0:s.findIndex(p=>p.id===e.id);let c=[],d,g=i?n:o==="desc";if(s!=null&&s.length&&e.getCanMultiSort()&&r?a?d="toggle":d="add":s!=null&&s.length&&u!==s.length-1?d="replace":a?d="toggle":d="replace",d==="toggle"&&(i||o||(d="remove")),d==="add"){var f;c=[...s,{id:e.id,desc:g}],c.splice(0,c.length-((f=t.options.maxMultiSortColCount)!=null?f:Number.MAX_SAFE_INTEGER))}else d==="toggle"?c=s.map(p=>p.id===e.id?{...p,desc:g}:p):d==="remove"?c=s.filter(p=>p.id!==e.id):c=[{id:e.id,desc:g}];return c})},e.getFirstSortDir=()=>{var n,r;return((n=(r=e.columnDef.sortDescFirst)!=null?r:t.options.sortDescFirst)!=null?n:e.getAutoSortDir()==="desc")?"desc":"asc"},e.getNextSortingOrder=n=>{var r,o;const i=e.getFirstSortDir(),s=e.getIsSorted();return s?s!==i&&((r=t.options.enableSortingRemoval)==null||r)&&(!(n&&(o=t.options.enableMultiRemove)!=null)||o)?!1:s==="desc"?"asc":"desc":i},e.getCanSort=()=>{var n,r;return((n=e.columnDef.enableSorting)!=null?n:!0)&&((r=t.options.enableSorting)!=null?r:!0)&&!!e.accessorFn},e.getCanMultiSort=()=>{var n,r;return(n=(r=e.columnDef.enableMultiSort)!=null?r:t.options.enableMultiSort)!=null?n:!!e.accessorFn},e.getIsSorted=()=>{var n;const r=(n=t.getState().sorting)==null?void 0:n.find(o=>o.id===e.id);return r?r.desc?"desc":"asc":!1},e.getSortIndex=()=>{var n,r;return(n=(r=t.getState().sorting)==null?void 0:r.findIndex(o=>o.id===e.id))!=null?n:-1},e.clearSorting=()=>{t.setSorting(n=>n!=null&&n.length?n.filter(r=>r.id!==e.id):[])},e.getToggleSortingHandler=()=>{const n=e.getCanSort();return r=>{n&&(r.persist==null||r.persist(),e.toggleSorting==null||e.toggleSorting(void 0,e.getCanMultiSort()?t.options.isMultiSortEvent==null?void 0:t.options.isMultiSortEvent(r):!1))}}},createTable:e=>{e.setSorting=t=>e.options.onSortingChange==null?void 0:e.options.onSortingChange(t),e.resetSorting=t=>{var n,r;e.setSorting(t?[]:(n=(r=e.initialState)==null?void 0:r.sorting)!=null?n:[])},e.getPreSortedRowModel=()=>e.getGroupedRowModel(),e.getSortedRowModel=()=>(!e._getSortedRowModel&&e.options.getSortedRowModel&&(e._getSortedRowModel=e.options.getSortedRowModel(e)),e.options.manualSorting||!e._getSortedRowModel?e.getPreSortedRowModel():e._getSortedRowModel())}},Cm=[Ug,um,im,sm,qg,Wg,cm,dm,Sm,rm,pm,fm,gm,mm,am];function Em(e){var t,n;process.env.NODE_ENV!=="production"&&(e.debugAll||e.debugTable)&&console.info("Creating Table Instance...");const r=[...Cm,...(t=e._features)!=null?t:[]];let o={_features:r};const i=o._features.reduce((f,p)=>Object.assign(f,p.getDefaultOptions==null?void 0:p.getDefaultOptions(o)),{}),s=f=>o.options.mergeOptions?o.options.mergeOptions(i,f):{...i,...f};let u={...{},...(n=e.initialState)!=null?n:{}};o._features.forEach(f=>{var p;u=(p=f.getInitialState==null?void 0:f.getInitialState(u))!=null?p:u});const c=[];let d=!1;const g={_features:r,options:{...i,...e},initialState:u,_queue:f=>{c.push(f),d||(d=!0,Promise.resolve().then(()=>{for(;c.length;)c.shift()();d=!1}).catch(p=>setTimeout(()=>{throw p})))},reset:()=>{o.setState(o.initialState)},setOptions:f=>{const p=gt(f,o.options);o.options=s(p)},getState:()=>o.options.state,setState:f=>{o.options.onStateChange==null||o.options.onStateChange(f)},_getRowId:(f,p,m)=>{var h;return(h=o.options.getRowId==null?void 0:o.options.getRowId(f,p,m))!=null?h:`${m?[m.id,p].join("."):p}`},getCoreRowModel:()=>(o._getCoreRowModel||(o._getCoreRowModel=o.options.getCoreRowModel(o)),o._getCoreRowModel()),getRowModel:()=>o.getPaginationRowModel(),getRow:(f,p)=>{let m=(p?o.getPrePaginationRowModel():o.getRowModel()).rowsById[f];if(!m&&(m=o.getCoreRowModel().rowsById[f],!m))throw process.env.NODE_ENV!=="production"?new Error(`getRow could not find row with ID: ${f}`):new Error;return m},_getDefaultColumnDef:J(()=>[o.options.defaultColumn],f=>{var p;return f=(p=f)!=null?p:{},{header:m=>{const h=m.header.column.columnDef;return h.accessorKey?h.accessorKey:h.accessorFn?h.id:null},cell:m=>{var h,b;return(h=(b=m.renderValue())==null||b.toString==null?void 0:b.toString())!=null?h:null},...o._features.reduce((m,h)=>Object.assign(m,h.getDefaultColumnDef==null?void 0:h.getDefaultColumnDef()),{}),...f}},Z(e,"debugColumns","_getDefaultColumnDef")),_getColumnDefs:()=>o.options.columns,getAllColumns:J(()=>[o._getColumnDefs()],f=>{const p=function(m,h,b){return b===void 0&&(b=0),m.map(w=>{const P=Gg(o,w,b,h),x=w;return P.columns=x.columns?p(x.columns,P,b+1):[],P})};return p(f)},Z(e,"debugColumns","getAllColumns")),getAllFlatColumns:J(()=>[o.getAllColumns()],f=>f.flatMap(p=>p.getFlatColumns()),Z(e,"debugColumns","getAllFlatColumns")),_getAllFlatColumnsById:J(()=>[o.getAllFlatColumns()],f=>f.reduce((p,m)=>(p[m.id]=m,p),{}),Z(e,"debugColumns","getAllFlatColumnsById")),getAllLeafColumns:J(()=>[o.getAllColumns(),o._getOrderColumnsFn()],(f,p)=>{let m=f.flatMap(h=>h.getLeafColumns());return p(m)},Z(e,"debugColumns","getAllLeafColumns")),getColumn:f=>{const p=o._getAllFlatColumnsById()[f];return process.env.NODE_ENV!=="production"&&!p&&console.error(`[Table] Column with id '${f}' does not exist.`),p}};Object.assign(o,g);for(let f=0;f<o._features.length;f++){const p=o._features[f];p==null||p.createTable==null||p.createTable(o)}return o}function Rm(){return e=>J(()=>[e.options.data],t=>{const n={rows:[],flatRows:[],rowsById:{}},r=function(o,i,s){i===void 0&&(i=0);const a=[];for(let c=0;c<o.length;c++){const d=Bo(e,e._getRowId(o[c],c,s),o[c],c,i,void 0,s==null?void 0:s.id);if(n.flatRows.push(d),n.rowsById[d.id]=d,a.push(d),e.options.getSubRows){var u;d.originalSubRows=e.options.getSubRows(o[c],c),(u=d.originalSubRows)!=null&&u.length&&(d.subRows=r(d.originalSubRows,i+1,d))}}return a};return n.rows=r(t),n},Z(e.options,"debugTable","getRowModel",()=>e._autoResetPageIndex()))}function Tm(e){const t=[],n=r=>{var o;t.push(r),(o=r.subRows)!=null&&o.length&&r.getIsExpanded()&&r.subRows.forEach(n)};return e.rows.forEach(n),{rows:t,flatRows:e.flatRows,rowsById:e.rowsById}}function km(e,t,n){return n.options.filterFromLeafRows?Pm(e,t,n):Om(e,t,n)}function Pm(e,t,n){var r;const o=[],i={},s=(r=n.options.maxLeafRowFilterDepth)!=null?r:100,a=function(u,c){c===void 0&&(c=0);const d=[];for(let f=0;f<u.length;f++){var g;let p=u[f];const m=Bo(n,p.id,p.original,p.index,p.depth,void 0,p.parentId);if(m.columnFilters=p.columnFilters,(g=p.subRows)!=null&&g.length&&c<s){if(m.subRows=a(p.subRows,c+1),p=m,t(p)&&!m.subRows.length){d.push(p),i[p.id]=p,o.push(p);continue}if(t(p)||m.subRows.length){d.push(p),i[p.id]=p,o.push(p);continue}}else p=m,t(p)&&(d.push(p),i[p.id]=p,o.push(p))}return d};return{rows:a(e),flatRows:o,rowsById:i}}function Om(e,t,n){var r;const o=[],i={},s=(r=n.options.maxLeafRowFilterDepth)!=null?r:100,a=function(u,c){c===void 0&&(c=0);const d=[];for(let f=0;f<u.length;f++){let p=u[f];if(t(p)){var g;if((g=p.subRows)!=null&&g.length&&c<s){const h=Bo(n,p.id,p.original,p.index,p.depth,void 0,p.parentId);h.subRows=a(p.subRows,c+1),p=h}d.push(p),o.push(p),i[p.id]=p}}return d};return{rows:a(e),flatRows:o,rowsById:i}}function _m(){return e=>J(()=>[e.getPreFilteredRowModel(),e.getState().columnFilters,e.getState().globalFilter],(t,n,r)=>{if(!t.rows.length||!(n!=null&&n.length)&&!r){for(let f=0;f<t.flatRows.length;f++)t.flatRows[f].columnFilters={},t.flatRows[f].columnFiltersMeta={};return t}const o=[],i=[];(n??[]).forEach(f=>{var p;const m=e.getColumn(f.id);if(!m)return;const h=m.getFilterFn();if(!h){process.env.NODE_ENV!=="production"&&console.warn(`Could not find a valid 'column.filterFn' for column with the ID: ${m.id}.`);return}o.push({id:f.id,filterFn:h,resolvedValue:(p=h.resolveFilterValue==null?void 0:h.resolveFilterValue(f.value))!=null?p:f.value})});const s=n.map(f=>f.id),a=e.getGlobalFilterFn(),u=e.getAllLeafColumns().filter(f=>f.getCanGlobalFilter());r&&a&&u.length&&(s.push("__global__"),u.forEach(f=>{var p;i.push({id:f.id,filterFn:a,resolvedValue:(p=a.resolveFilterValue==null?void 0:a.resolveFilterValue(r))!=null?p:r})}));let c,d;for(let f=0;f<t.flatRows.length;f++){const p=t.flatRows[f];if(p.columnFilters={},o.length)for(let m=0;m<o.length;m++){c=o[m];const h=c.id;p.columnFilters[h]=c.filterFn(p,h,c.resolvedValue,b=>{p.columnFiltersMeta[h]=b})}if(i.length){for(let m=0;m<i.length;m++){d=i[m];const h=d.id;if(d.filterFn(p,h,d.resolvedValue,b=>{p.columnFiltersMeta[h]=b})){p.columnFilters.__global__=!0;break}}p.columnFilters.__global__!==!0&&(p.columnFilters.__global__=!1)}}const g=f=>{for(let p=0;p<s.length;p++)if(f.columnFilters[s[p]]===!1)return!1;return!0};return km(t.rows,g,e)},Z(e.options,"debugTable","getFilteredRowModel",()=>e._autoResetPageIndex()))}function Nm(e){return t=>J(()=>[t.getState().pagination,t.getPrePaginationRowModel(),t.options.paginateExpandedRows?void 0:t.getState().expanded],(n,r)=>{if(!r.rows.length)return r;const{pageSize:o,pageIndex:i}=n;let{rows:s,flatRows:a,rowsById:u}=r;const c=o*i,d=c+o;s=s.slice(c,d);let g;t.options.paginateExpandedRows?g={rows:s,flatRows:a,rowsById:u}:g=Tm({rows:s,flatRows:a,rowsById:u}),g.flatRows=[];const f=p=>{g.flatRows.push(p),p.subRows.length&&p.subRows.forEach(f)};return g.rows.forEach(f),g},Z(t.options,"debugTable","getPaginationRowModel"))}function $m(){return e=>J(()=>[e.getState().sorting,e.getPreSortedRowModel()],(t,n)=>{if(!n.rows.length||!(t!=null&&t.length))return n;const r=e.getState().sorting,o=[],i=r.filter(u=>{var c;return(c=e.getColumn(u.id))==null?void 0:c.getCanSort()}),s={};i.forEach(u=>{const c=e.getColumn(u.id);c&&(s[u.id]={sortUndefined:c.columnDef.sortUndefined,invertSorting:c.columnDef.invertSorting,sortingFn:c.getSortingFn()})});const a=u=>{const c=u.map(d=>({...d}));return c.sort((d,g)=>{for(let p=0;p<i.length;p+=1){var f;const m=i[p],h=s[m.id],b=h.sortUndefined,w=(f=m==null?void 0:m.desc)!=null?f:!1;let P=0;if(b){const x=d.getValue(m.id),S=g.getValue(m.id),y=x===void 0,T=S===void 0;if(y||T){if(b==="first")return y?-1:1;if(b==="last")return y?1:-1;P=y&&T?0:y?b:-b}}if(P===0&&(P=h.sortingFn(d,g,m.id)),P!==0)return w&&(P*=-1),h.invertSorting&&(P*=-1),P}return d.index-g.index}),c.forEach(d=>{var g;o.push(d),(g=d.subRows)!=null&&g.length&&(d.subRows=a(d.subRows))}),c};return{rows:a(n.rows),flatRows:o,rowsById:n.rowsById}},Z(e.options,"debugTable","getSortedRowModel",()=>e._autoResetPageIndex()))}/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function ss(e,t){return e?Mm(e)?C.createElement(e,t):e:null}function Mm(e){return Im(e)||typeof e=="function"||jm(e)}function Im(e){return typeof e=="function"&&(()=>{const t=Object.getPrototypeOf(e);return t.prototype&&t.prototype.isReactComponent})()}function jm(e){return typeof e=="object"&&typeof e.$$typeof=="symbol"&&["react.memo","react.forward_ref"].includes(e.$$typeof.description)}function Fm(e){const t={state:{},onStateChange:()=>{},renderFallbackValue:null,...e},[n]=C.useState(()=>({current:Em(t)})),[r,o]=C.useState(()=>n.current.initialState);return n.current.setOptions(i=>({...i,...e,state:{...r,...e.state},onStateChange:s=>{o(s),e.onStateChange==null||e.onStateChange(s)}})),n.current}const Ia=C.forwardRef(({className:e,...t},n)=>v.jsx("div",{className:"pr-relative pr-w-full pr-overflow-auto",children:v.jsx("table",{ref:n,className:pe("pr-w-full pr-caption-bottom pr-text-sm",e),...t})}));Ia.displayName="Table";const ja=C.forwardRef(({className:e,...t},n)=>v.jsx("thead",{ref:n,className:pe("[&_tr]:pr-border-b",e),...t}));ja.displayName="TableHeader";const Fa=C.forwardRef(({className:e,...t},n)=>v.jsx("tbody",{ref:n,className:pe("[&_tr:last-child]:pr-border-0",e),...t}));Fa.displayName="TableBody";const Am=C.forwardRef(({className:e,...t},n)=>v.jsx("tfoot",{ref:n,className:pe("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));Am.displayName="TableFooter";const Wn=C.forwardRef(({className:e,...t},n)=>v.jsx("tr",{ref:n,className:pe("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));Wn.displayName="TableRow";const Aa=C.forwardRef(({className:e,...t},n)=>v.jsx("th",{ref:n,className:pe("pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",e),...t}));Aa.displayName="TableHead";const co=C.forwardRef(({className:e,...t},n)=>v.jsx("td",{ref:n,className:pe("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0",e),...t}));co.displayName="TableCell";const Dm=C.forwardRef(({className:e,...t},n)=>v.jsx("caption",{ref:n,className:pe("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));Dm.displayName="TableCaption";const Vm=rl.cva("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),ot=C.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},i)=>{const s=r?nl.Slot:"button";return v.jsx(s,{className:pe(Vm({variant:t,size:n,className:e})),ref:i,...o})});ot.displayName="Button";const Lm=we.Root,Bm=we.Value,Da=C.forwardRef(({className:e,children:t,...n},r)=>v.jsxs(we.Trigger,{ref:r,className:pe("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...n,children:[t,v.jsx(we.Icon,{asChild:!0,children:v.jsx(Te.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));Da.displayName=we.Trigger.displayName;const Va=C.forwardRef(({className:e,...t},n)=>v.jsx(we.ScrollUpButton,{ref:n,className:pe("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:v.jsx(Te.ChevronUp,{className:"pr-h-4 pr-w-4"})}));Va.displayName=we.ScrollUpButton.displayName;const La=C.forwardRef(({className:e,...t},n)=>v.jsx(we.ScrollDownButton,{ref:n,className:pe("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:v.jsx(Te.ChevronDown,{className:"pr-h-4 pr-w-4"})}));La.displayName=we.ScrollDownButton.displayName;const Ba=C.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>v.jsx(we.Portal,{children:v.jsxs(we.Content,{ref:o,className:pe("pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:n,...r,children:[v.jsx(Va,{}),v.jsx(we.Viewport,{className:pe("pr-p-1",n==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),v.jsx(La,{})]})}));Ba.displayName=we.Content.displayName;const zm=C.forwardRef(({className:e,...t},n)=>v.jsx(we.Label,{ref:n,className:pe("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));zm.displayName=we.Label.displayName;const za=C.forwardRef(({className:e,children:t,...n},r)=>v.jsxs(we.Item,{ref:r,className:pe("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[v.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:v.jsx(we.ItemIndicator,{children:v.jsx(Te.Check,{className:"pr-h-4 pr-w-4"})})}),v.jsx(we.ItemText,{children:t})]}));za.displayName=we.Item.displayName;const Hm=C.forwardRef(({className:e,...t},n)=>v.jsx(we.Separator,{ref:n,className:pe("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Hm.displayName=we.Separator.displayName;function Gm({table:e}){return v.jsxs("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2",children:[v.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected."]}),v.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[v.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[v.jsx("p",{className:"pr-text-sm pr-font-medium",children:"Rows per page"}),v.jsxs(Lm,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[v.jsx(Da,{className:"pr-h-8 pr-w-[70px]",children:v.jsx(Bm,{placeholder:e.getState().pagination.pageSize})}),v.jsx(Ba,{side:"top",children:[10,20,30,40,50].map(t=>v.jsx(za,{value:`${t}`,children:t},t))})]})]}),v.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),v.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[v.jsxs(ot,{variant:"outline",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[v.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),v.jsx(Te.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),v.jsxs(ot,{variant:"outline",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[v.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),v.jsx(Te.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),v.jsxs(ot,{variant:"outline",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[v.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),v.jsx(Te.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),v.jsxs(ot,{variant:"outline",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[v.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),v.jsx(Te.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})]})}function Um({table:e}){return v.jsxs(mo,{children:[v.jsx(as.DropdownMenuTrigger,{asChild:!0,children:v.jsxs(ot,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[v.jsx(Te.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),v.jsxs(ir,{align:"end",className:"pr-w-[150px]",children:[v.jsx(sr,{children:"Toggle columns"}),v.jsx(vo,{}),e.getAllColumns().filter(t=>typeof t.accessorFn<"u"&&t.getCanHide()).map(t=>v.jsx(ho,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}function qm({columns:e,data:t}){var g,f;const[n,r]=H.useState([]),[o,i]=H.useState([]),[s,a]=H.useState({}),[u,c]=H.useState({}),d=Fm({data:t,columns:e,getCoreRowModel:Rm(),getPaginationRowModel:Nm(),onSortingChange:r,getSortedRowModel:$m(),onColumnFiltersChange:i,getFilteredRowModel:_m(),onColumnVisibilityChange:a,onRowSelectionChange:c,state:{sorting:n,columnFilters:o,columnVisibility:s,rowSelection:u}});return v.jsxs("div",{children:[v.jsx("div",{className:"pr-flex pr-items-center pr-py-4",children:v.jsx(bo,{placeholder:"Filter emails...",value:((g=d.getColumn("email"))==null?void 0:g.getFilterValue())??"",onChange:p=>{var m;return(m=d.getColumn("email"))==null?void 0:m.setFilterValue(p.target.value)},className:"pr-max-w-sm"})}),v.jsxs(mo,{children:[v.jsx(gs,{asChild:!0,children:v.jsx(ot,{variant:"outline",className:"pr-ml-auto",children:"Columns"})}),v.jsx(ir,{align:"end",children:d.getAllColumns().filter(p=>p.getCanHide()).map(p=>v.jsx(ho,{className:"pr-capitalize",checked:p.getIsVisible(),onCheckedChange:m=>p.toggleVisibility(!!m),children:p.id},p.id))})]}),v.jsx("div",{className:"pr-rounded-md pr-border",children:v.jsxs(Ia,{children:[v.jsx(ja,{children:d.getHeaderGroups().map(p=>v.jsx(Wn,{children:p.headers.map(m=>v.jsx(Aa,{children:m.isPlaceholder?null:ss(m.column.columnDef.header,m.getContext())},m.id))},p.id))}),v.jsx(Fa,{children:(f=d.getRowModel().rows)!=null&&f.length?d.getRowModel().rows.map(p=>v.jsx(Wn,{"data-state":p.getIsSelected()&&"selected",children:p.getVisibleCells().map(m=>v.jsx(co,{children:ss(m.column.columnDef.cell,m.getContext())},m.id))},p.id)):v.jsx(Wn,{children:v.jsx(co,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]})}),v.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[v.jsx(ot,{variant:"outline",size:"sm",onClick:()=>d.previousPage(),disabled:!d.getCanPreviousPage(),children:"Previous"}),v.jsx(ot,{variant:"outline",size:"sm",onClick:()=>d.nextPage(),disabled:!d.getCanNextPage(),children:"Next"})]}),v.jsx(Gm,{table:d}),v.jsx(Um,{table:d})]})}function Wm({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const i=H.useRef(void 0);return v.jsx("div",{ref:i,style:{position:"relative"},children:v.jsx(me.AppBar,{position:"static",id:r,children:v.jsxs(me.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?v.jsx(Ea,{commandHandler:t,containerRef:i,menuProvider:e}):void 0,o?v.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Xm=(e,t)=>{H.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},qr=()=>!1,Km=(e,t)=>{const[n]=rr(H.useCallback(async()=>{if(!e)return qr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),qr,{preserveValue:!1});H.useEffect(()=>()=>{n!==qr&&n()},[n])};exports.BookChapterControl=$l;exports.Button=xt;exports.ChapterRangeSelector=Ml;exports.Checkbox=hs;exports.ComboBox=Xn;exports.ContextMenu=_g;exports.DataTable=qm;exports.GridMenu=pa;exports.HamburgerMenuButton=Ea;exports.IconButton=Mg;exports.LabelPosition=Et;exports.MenuItem=Vo;exports.RefSelector=Ig;exports.SearchBar=jg;exports.Slider=Fg;exports.Snackbar=Ag;exports.Switch=Dg;exports.Table=Lg;exports.TextField=En;exports.Toolbar=Wm;exports.useEvent=Xm;exports.useEventAsync=Km;exports.usePromise=rr;function Ym(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Ym(`.papi-switch {
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
}
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.pr-m-10 {
    margin: 2.5rem;
}
.pr-m-3 {
    margin: 0.75rem;
}
.pr--mx-1 {
    margin-left: -0.25rem;
    margin-right: -0.25rem;
}
.pr-my-1 {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
}
.pr-ml-2 {
    margin-left: 0.5rem;
}
.pr-ml-3 {
    margin-left: 0.75rem;
}
.pr-ml-auto {
    margin-left: auto;
}
.pr-mr-2 {
    margin-right: 0.5rem;
}
.pr-mt-4 {
    margin-top: 1rem;
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
.pr-inline-flex {
    display: inline-flex;
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
.pr-h-8 {
    height: 2rem;
}
.pr-h-9 {
    height: 2.25rem;
}
.pr-h-\\[400px\\] {
    height: 400px;
}
.pr-h-\\[var\\(--radix-select-trigger-height\\)\\] {
    height: var(--radix-select-trigger-height);
}
.pr-h-px {
    height: 1px;
}
.pr-max-h-96 {
    max-height: 24rem;
}
.pr-w-10 {
    width: 2.5rem;
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
.pr-w-8 {
    width: 2rem;
}
.pr-w-\\[100px\\] {
    width: 100px;
}
.pr-w-\\[150px\\] {
    width: 150px;
}
.pr-w-\\[70px\\] {
    width: 70px;
}
.pr-w-\\[800px\\] {
    width: 800px;
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
.pr-max-w-sm {
    max-width: 24rem;
}
.pr-flex-1 {
    flex: 1 1 0%;
}
.pr-shrink-0 {
    flex-shrink: 0;
}
.pr-caption-bottom {
    caption-side: bottom;
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
.pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.pr-space-x-6 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(1.5rem * var(--tw-space-x-reverse));
    margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
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
.pr-border-input {
    border-color: hsl(var(--input));
}
.pr-border-primary {
    border-color: hsl(var(--primary));
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
.pr-bg-destructive {
    background-color: hsl(var(--destructive));
}
.pr-bg-muted {
    background-color: hsl(var(--muted));
}
.pr-bg-muted\\/50 {
    background-color: hsl(var(--muted) / 0.5);
}
.pr-bg-popover {
    background-color: hsl(var(--popover));
}
.pr-bg-primary {
    background-color: hsl(var(--primary));
}
.pr-bg-secondary {
    background-color: hsl(var(--secondary));
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
.pr-capitalize {
    text-transform: capitalize;
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
.pr-text-current {
    color: currentColor;
}
.pr-text-destructive-foreground {
    color: hsl(var(--destructive-foreground));
}
.pr-text-gray-500 {
    --tw-text-opacity: 1;
    color: rgb(107 114 128 / var(--tw-text-opacity));
}
.pr-text-muted-foreground {
    color: hsl(var(--muted-foreground));
}
.pr-text-muted-foreground\\/70 {
    color: hsl(var(--muted-foreground) / 0.7);
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
.focus-visible\\:pr-ring-ring:focus-visible {
    --tw-ring-color: hsl(var(--ring));
}
.focus-visible\\:pr-ring-offset-2:focus-visible {
    --tw-ring-offset-width: 2px;
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
.data-\\[highlighted\\]\\:pr-bg-amber-100[data-highlighted] {
    --tw-bg-opacity: 1;
    background-color: rgb(254 243 199 / var(--tw-bg-opacity));
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
.data-\\[state\\=checked\\]\\:pr-text-primary-foreground[data-state=checked] {
    color: hsl(var(--primary-foreground));
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
.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-pr-0:has([role=checkbox]) {
    padding-right: 0px;
}
.\\[\\&\\>span\\]\\:pr-line-clamp-1>span {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
.\\[\\&\\>tr\\]\\:last\\:pr-border-b-0:last-child>tr {
    border-bottom-width: 0px;
}
.\\[\\&_tr\\:last-child\\]\\:pr-border-0 tr:last-child {
    border-width: 0px;
}
.\\[\\&_tr\\]\\:pr-border-b tr {
    border-bottom-width: 1px;
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
