"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const y=require("react/jsx-runtime"),G=require("react"),ze=require("platform-bible-utils"),Xs=require("@radix-ui/react-dropdown-menu"),ht=require("lucide-react"),we=require("clsx"),Ys=require("tailwind-merge"),pe=require("@mui/material"),xr=require("@mui/styled-engine"),Jt=require("react-dom"),xo=require("react-data-grid");function Mr(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const E=Mr(G),be=Mr(Xs),Js=Mr(Jt);var Zs=Object.defineProperty,Qs=(e,t,n)=>t in e?Zs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ne=(e,t,n)=>(Qs(e,typeof t!="symbol"?t+"":t,n),n);const bt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Ir=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],vi=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],wo=ca();function Bt(e,t=!0){return t&&(e=e.toUpperCase()),e in wo?wo[e]:0}function jr(e){return Bt(e)>0}function ea(e){const t=typeof e=="string"?Bt(e):e;return t>=40&&t<=66}function ta(e){return(typeof e=="string"?Bt(e):e)<=39}function yi(e){return e<=66}function na(e){const t=typeof e=="string"?Bt(e):e;return Ei(t)&&!yi(t)}function*ra(){for(let e=1;e<=bt.length;e++)yield e}const oa=1,xi=bt.length;function ia(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function _r(e,t="***"){const n=e-1;return n<0||n>=bt.length?t:bt[n]}function wi(e){return e<=0||e>xi?"******":vi[e-1]}function sa(e){return wi(Bt(e))}function Ei(e){const t=typeof e=="number"?_r(e):e;return jr(t)&&!Ir.includes(t)}function aa(e){const t=typeof e=="number"?_r(e):e;return jr(t)&&Ir.includes(t)}function la(e){return vi[e-1].includes("*obsolete*")}function ca(){const e={};for(let t=0;t<bt.length;t++)e[bt[t]]=t+1;return e}const de={allBookIds:bt,nonCanonicalIds:Ir,bookIdToNumber:Bt,isBookIdValid:jr,isBookNT:ea,isBookOT:ta,isBookOTNT:yi,isBookDC:na,allBookNumbers:ra,firstBook:oa,lastBook:xi,extraBooks:ia,bookNumberToId:_r,bookNumberToEnglishName:wi,bookIdToEnglishName:sa,isCanonical:Ei,isExtraMaterial:aa,isObsolete:la};var rt=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(rt||{});const $e=class{constructor(t){if(ne(this,"name"),ne(this,"fullPath"),ne(this,"isPresent"),ne(this,"hasVerseSegments"),ne(this,"isCustomized"),ne(this,"baseVersification"),ne(this,"scriptureBooks"),ne(this,"_type"),t!=null)typeof t=="string"?this.name=t:this._type=t;else throw new Error("Argument null")}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ne($e,"Original",new $e(rt.Original)),ne($e,"Septuagint",new $e(rt.Septuagint)),ne($e,"Vulgate",new $e(rt.Vulgate)),ne($e,"English",new $e(rt.English)),ne($e,"RussianProtestant",new $e(rt.RussianProtestant)),ne($e,"RussianOrthodox",new $e(rt.RussianOrthodox));let Nt=$e;function Eo(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var Ti=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Ti||{});const Se=class ie{constructor(t,n,r,o){if(ne(this,"firstChapter"),ne(this,"lastChapter"),ne(this,"lastVerse"),ne(this,"hasSegmentsDefined"),ne(this,"text"),ne(this,"BBBCCCVVVS"),ne(this,"longHashCode"),ne(this,"versification"),ne(this,"rtlMark","‏"),ne(this,"_bookNum",0),ne(this,"_chapterNum",0),ne(this,"_verseNum",0),ne(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,a=n!=null&&n instanceof Nt?n:void 0;this.setEmpty(a),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof Nt?n:void 0;this.setEmpty(i),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ie){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof Nt?t:ie.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(t,n=ie.defaultVersification){const r=new ie(n);return r.parse(t),r}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=ie.parse(t),{success:!0,verseRef:n}}catch(r){if(r instanceof qt)return n=new ie,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ie.bcvMaxValue*ie.bookDigitShifter+(n>=0?n%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(r>=0?r%ie.bcvMaxValue:0)}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>ie.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return de.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=de.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ie.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>de.lastBook)throw new qt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Nt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const a=+i[1].trim();this.versification=new Nt(rt[a])}catch{throw new qt("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new qt("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||de.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(r[1]))throw new qt("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification):!1}allVerses(t=!1,n=ie.verseRangeSeparators,r=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=Eo(this._verse,r);for(const a of i.map(l=>Eo(l,n))){const l=this.clone();l.verse=a[0];const c=l.verseNum;if(o.push(l),a.length>1){const u=this.clone();if(u.verse=a[1],!t)for(let d=c+1;d<u.verseNum;d++){const f=new ie(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(f)}o.push(u)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const a=o.BBBCCCVVV;if(r>a)return 3;if(r===a)return 4;r=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>de.lastBook?2:(de.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=de.bookIdToNumber(t),this.chapter=n,this.verse=r}};ne(Se,"defaultVersification",Nt.English),ne(Se,"verseRangeSeparator","-"),ne(Se,"verseSequenceIndicator",","),ne(Se,"verseRangeSeparators",[Se.verseRangeSeparator]),ne(Se,"verseSequenceIndicators",[Se.verseSequenceIndicator]),ne(Se,"chapterDigitShifter",1e3),ne(Se,"bookDigitShifter",Se.chapterDigitShifter*Se.chapterDigitShifter),ne(Se,"bcvMaxValue",Se.chapterDigitShifter-1),ne(Se,"ValidStatusType",Ti);class qt extends Error{}function Ie(...e){return Ys.twMerge(we.clsx(e))}const ua=be.Root,da=be.Trigger,pa=E.forwardRef(({className:e,inset:t,children:n,...r},o)=>y.jsxs(be.SubTrigger,{ref:o,className:Ie("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,y.jsx(ht.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));pa.displayName=be.SubTrigger.displayName;const fa=E.forwardRef(({className:e,...t},n)=>y.jsx(be.SubContent,{ref:n,className:Ie("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));fa.displayName=be.SubContent.displayName;const ki=E.forwardRef(({className:e,sideOffset:t=4,...n},r)=>y.jsx(be.Portal,{children:y.jsx(be.Content,{ref:r,sideOffset:t,className:Ie("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));ki.displayName=be.Content.displayName;const Oi=E.forwardRef(({className:e,inset:t,...n},r)=>y.jsx(be.Item,{ref:r,className:Ie("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));Oi.displayName=be.Item.displayName;const ma=E.forwardRef(({className:e,children:t,checked:n,...r},o)=>y.jsxs(be.CheckboxItem,{ref:o,className:Ie("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[y.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:y.jsx(be.ItemIndicator,{children:y.jsx(ht.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));ma.displayName=be.CheckboxItem.displayName;const ha=E.forwardRef(({className:e,children:t,...n},r)=>y.jsxs(be.RadioItem,{ref:r,className:Ie("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[y.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:y.jsx(be.ItemIndicator,{children:y.jsx(ht.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));ha.displayName=be.RadioItem.displayName;const Ar=E.forwardRef(({className:e,inset:t,...n},r)=>y.jsx(be.Label,{ref:r,className:Ie("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));Ar.displayName=be.Label.displayName;const Si=E.forwardRef(({className:e,...t},n)=>y.jsx(be.Separator,{ref:n,className:Ie("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Si.displayName=be.Separator.displayName;const Ci=E.forwardRef(({className:e,type:t,...n},r)=>y.jsx("input",{type:t,className:Ie("pr-flex pr-h-10 pr-w-full pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));Ci.displayName="Input";const ga=G.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},i)=>y.jsxs("div",{className:"pr-relative",children:[y.jsx(Ci,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:a=>e(a.target.value),onKeyDown:a=>{a.key==="Enter"&&r(),t(a)},onClick:n,ref:i}),y.jsx(ht.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function ba({handleSelectChapter:e,endChapter:t,activeChapter:n,isHighlighted:r,highlightedChapter:o,handleHighlightedChapter:i}){const a=Array.from({length:t},(c,u)=>u+1),l=G.useCallback(c=>{i(c)},[i]);return y.jsx("div",{className:Ie("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch",{"pr-bg-amber-50":!r,"pr-bg-amber-100":r}),children:a.map(c=>y.jsx("div",{className:Ie("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":c===n,"pr-bg-amber-200":c===o}),onClick:u=>{u.preventDefault(),e(c)},role:"button",onKeyDown:u=>{u.key==="Enter"&&e(c)},tabIndex:0,onMouseMove:()=>l(c),children:c},c))})}const va=G.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:i,children:a},l)=>{const c=n?l:void 0;return y.jsxs(Oi,{ref:c,textValue:e,className:Ie("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:u=>{u.preventDefault(),t()},onKeyDown:u=>{o(u)},onFocus:r,onMouseMove:r,children:[y.jsx("span",{className:Ie("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":i.toLowerCase()==="ot","pr-border-l-purple-200":i.toLowerCase()==="nt","pr-border-l-indigo-200":i.toLowerCase()==="dc"}),children:de.bookIdToEnglishName(e)}),n&&y.jsx("div",{children:a})]},e)});function ya({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return y.jsxs(Ar,{className:"pr-flex pr-justify-between",children:[y.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),y.jsxs("div",{className:"pr-flex pr-items-center",children:[y.jsx(ht.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),y.jsx(ht.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),y.jsx(ht.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const tn=de.allBookIds,xa={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},wa=["OT","NT","DC"],Ea=32+32+32,Ta=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],ka=e=>({OT:tn.filter(n=>de.isBookOT(n)),NT:tn.filter(n=>de.isBookNT(n)),DC:tn.filter(n=>de.isBookDC(n))})[e],Wt=e=>ze.getChaptersForBook(de.bookIdToNumber(e));function Oa(){return tn.map(t=>de.bookIdToEnglishName(t))}function Sa(e){return Oa().includes(e)}function Ca(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(Sa(t))return tn.find(r=>de.bookIdToEnglishName(r)===t)}function Pa({scrRef:e,handleSubmit:t}){const[n,r]=G.useState(""),[o,i]=G.useState(de.bookNumberToId(e.bookNum)),[a,l]=G.useState(0),[c,u]=G.useState(""),[d,f]=G.useState(!1),[p,b]=G.useState(d),v=G.useRef(void 0),g=G.useRef(void 0),m=G.useRef(void 0),T=G.useCallback(S=>ka(S).filter(N=>{const j=de.bookIdToEnglishName(N).toLowerCase(),V=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return j.includes(V)||N.toLowerCase().includes(V)}),[n]),$=S=>{r(S)},x=G.useCallback(S=>{!S&&document.activeElement===v.current?f(!0):f(S)},[]),w=G.useCallback((S,N,j,V)=>{if(i(o!==S?S:""),l(de.bookNumberToId(e.bookNum)!==S?1:e.chapterNum),N||Wt(S)===-1){t({bookNum:de.bookIdToNumber(S),chapterNum:j||1,verseNum:V||1}),f(!1),r("");return}f(!N)},[t,e.bookNum,e.chapterNum,o]),h=S=>{S<=0||S>Wt(o)||w(o,!0,S)},C=G.useCallback(()=>{Ta.forEach(S=>{const N=n.match(S);if(N){const[j,V=void 0,F=void 0]=N.slice(1),A=Ca(j);(de.isBookIdValid(j)||A)&&w(A??j,!0,V?parseInt(V,10):1,F?parseInt(F,10):1)}})},[w,n]),P=G.useCallback(S=>{d?(S.key==="ArrowDown"||S.key==="ArrowUp")&&(typeof m<"u"&&m.current!==null?m.current.focus():typeof g<"u"&&g.current!==null&&g.current.focus(),S.preventDefault()):f(!0)},[d]),B=S=>{const{key:N}=S;N==="ArrowRight"||N==="ArrowLeft"||N==="ArrowDown"||N==="ArrowUp"||N==="Enter"||v.current.focus()},D=S=>{const{key:N}=S;if(c===o){if(N==="Enter"){w(o,!0,a);return}let j=0;if(N==="ArrowRight")if(a<Wt(c))j=1;else{S.preventDefault();return}else if(N==="ArrowLeft")if(a>1)j=-1;else{S.preventDefault();return}else N==="ArrowDown"?j=6:N==="ArrowUp"&&(j=-6);a+j<=0||a+j>Wt(c)?l(0):(l(a+j),S.preventDefault())}};return G.useEffect(()=>{o===c?o===de.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),G.useLayoutEffect(()=>{b(d)},[d]),G.useLayoutEffect(()=>{const S=setTimeout(()=>{if(p&&g.current&&m.current){const j=m.current.offsetTop-Ea;g.current.scrollTo({top:j,behavior:"instant"}),m.current.focus()}},10);return()=>{clearTimeout(S)}},[p]),y.jsx("div",{children:y.jsxs(ua,{modal:!1,open:d,onOpenChange:x,children:[y.jsx(da,{asChild:!0,children:y.jsx(ga,{ref:v,value:n,handleSearch:$,handleKeyDown:P,handleOnClick:()=>{i(de.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0)},handleSubmit:C,placeholder:`${de.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),y.jsxs(ki,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:B,align:"start",ref:g,children:[y.jsx(ya,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),wa.map(S=>T(S).length>0&&y.jsxs("div",{children:[y.jsx(Ar,{className:"pr-font-semibold pr-text-slate-700",children:xa[S]}),T(S).map(N=>y.jsx("div",{children:y.jsx(va,{bookId:N,handleSelectBook:()=>w(N,!1),isSelected:o===N,handleHighlightBook:()=>u(N),handleKeyDown:D,bookType:S,ref:m,children:y.jsx(ba,{handleSelectChapter:h,endChapter:Wt(N),activeChapter:e.bookNum===de.bookIdToNumber(N)?e.chapterNum:0,isHighlighted:o===c,highlightedChapter:a,handleHighlightedChapter:j=>{l(j)}})})},N)),S==="OT"||S==="NT"?y.jsx(Si,{}):void 0]},S))]})]})})}function ut({id:e,isDisabled:t=!1,className:n,onClick:r,onContextMenu:o,children:i}){return y.jsx(pe.Button,{id:e,disabled:t,className:`papi-button ${n??""}`,onClick:r,onContextMenu:o,children:i})}function Mn({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:a,options:l=[],className:c,value:u,onChange:d,onFocus:f,onBlur:p,getOptionLabel:b}){return y.jsx(pe.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:i,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:u,onChange:d,onFocus:f,onBlur:p,getOptionLabel:b,renderInput:v=>y.jsx(pe.TextField,{...v,error:o,fullWidth:i,disabled:n,label:t,style:{width:a}})})}function Na({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o,chapterCount:i}){const a=G.useMemo(()=>Array.from({length:i},(u,d)=>d+1),[i]),l=(u,d)=>{n(d),d>t&&r(d)},c=(u,d)=>{r(d),d<e&&n(d)};return y.jsxs(y.Fragment,{children:[y.jsx(pe.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:y.jsx(Mn,{onChange:(u,d)=>l(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),y.jsx(pe.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:y.jsx(Mn,{onChange:(u,d)=>c(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:t,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var ft=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(ft||{});function Pi({id:e,isChecked:t,labelText:n="",labelPosition:r=ft.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:a=!1,hasError:l=!1,className:c,onChange:u}){const d=y.jsx(pe.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:a,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:u});let f;if(n){const p=r===ft.Before||r===ft.Above,b=y.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),v=r===ft.Before||r===ft.After,g=v?b:y.jsx("div",{children:b}),m=v?d:y.jsx("div",{children:d});f=y.jsxs(pe.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:a,error:l,children:[p&&g,m,!p&&g]})}else f=d;return f}function ue(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},k.apply(this,arguments)}function Ra(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function $a(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var wr={exports:{}},Tn={exports:{}},se={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var To;function Ma(){if(To)return se;To=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,m=e?Symbol.for("react.fundamental"):60117,T=e?Symbol.for("react.responder"):60118,$=e?Symbol.for("react.scope"):60119;function x(h){if(typeof h=="object"&&h!==null){var C=h.$$typeof;switch(C){case t:switch(h=h.type,h){case c:case u:case r:case i:case o:case f:return h;default:switch(h=h&&h.$$typeof,h){case l:case d:case v:case b:case a:return h;default:return C}}case n:return C}}}function w(h){return x(h)===u}return se.AsyncMode=c,se.ConcurrentMode=u,se.ContextConsumer=l,se.ContextProvider=a,se.Element=t,se.ForwardRef=d,se.Fragment=r,se.Lazy=v,se.Memo=b,se.Portal=n,se.Profiler=i,se.StrictMode=o,se.Suspense=f,se.isAsyncMode=function(h){return w(h)||x(h)===c},se.isConcurrentMode=w,se.isContextConsumer=function(h){return x(h)===l},se.isContextProvider=function(h){return x(h)===a},se.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===t},se.isForwardRef=function(h){return x(h)===d},se.isFragment=function(h){return x(h)===r},se.isLazy=function(h){return x(h)===v},se.isMemo=function(h){return x(h)===b},se.isPortal=function(h){return x(h)===n},se.isProfiler=function(h){return x(h)===i},se.isStrictMode=function(h){return x(h)===o},se.isSuspense=function(h){return x(h)===f},se.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===r||h===u||h===i||h===o||h===f||h===p||typeof h=="object"&&h!==null&&(h.$$typeof===v||h.$$typeof===b||h.$$typeof===a||h.$$typeof===l||h.$$typeof===d||h.$$typeof===m||h.$$typeof===T||h.$$typeof===$||h.$$typeof===g)},se.typeOf=x,se}var ae={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ko;function Ia(){return ko||(ko=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,m=e?Symbol.for("react.fundamental"):60117,T=e?Symbol.for("react.responder"):60118,$=e?Symbol.for("react.scope"):60119;function x(I){return typeof I=="string"||typeof I=="function"||I===r||I===u||I===i||I===o||I===f||I===p||typeof I=="object"&&I!==null&&(I.$$typeof===v||I.$$typeof===b||I.$$typeof===a||I.$$typeof===l||I.$$typeof===d||I.$$typeof===m||I.$$typeof===T||I.$$typeof===$||I.$$typeof===g)}function w(I){if(typeof I=="object"&&I!==null){var Z=I.$$typeof;switch(Z){case t:var R=I.type;switch(R){case c:case u:case r:case i:case o:case f:return R;default:var oe=R&&R.$$typeof;switch(oe){case l:case d:case v:case b:case a:return oe;default:return Z}}case n:return Z}}}var h=c,C=u,P=l,B=a,D=t,S=d,N=r,j=v,V=b,F=n,A=i,M=o,L=f,ee=!1;function Q(I){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),O(I)||w(I)===c}function O(I){return w(I)===u}function _(I){return w(I)===l}function U(I){return w(I)===a}function X(I){return typeof I=="object"&&I!==null&&I.$$typeof===t}function z(I){return w(I)===d}function H(I){return w(I)===r}function W(I){return w(I)===v}function K(I){return w(I)===b}function q(I){return w(I)===n}function Y(I){return w(I)===i}function J(I){return w(I)===o}function re(I){return w(I)===f}ae.AsyncMode=h,ae.ConcurrentMode=C,ae.ContextConsumer=P,ae.ContextProvider=B,ae.Element=D,ae.ForwardRef=S,ae.Fragment=N,ae.Lazy=j,ae.Memo=V,ae.Portal=F,ae.Profiler=A,ae.StrictMode=M,ae.Suspense=L,ae.isAsyncMode=Q,ae.isConcurrentMode=O,ae.isContextConsumer=_,ae.isContextProvider=U,ae.isElement=X,ae.isForwardRef=z,ae.isFragment=H,ae.isLazy=W,ae.isMemo=K,ae.isPortal=q,ae.isProfiler=Y,ae.isStrictMode=J,ae.isSuspense=re,ae.isValidElementType=x,ae.typeOf=w}()),ae}var Oo;function Ni(){return Oo||(Oo=1,process.env.NODE_ENV==="production"?Tn.exports=Ma():Tn.exports=Ia()),Tn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var ir,So;function ja(){if(So)return ir;So=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var a={},l=0;l<10;l++)a["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(a).map(function(d){return a[d]});if(c.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(d){u[d]=d}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return ir=o()?Object.assign:function(i,a){for(var l,c=r(i),u,d=1;d<arguments.length;d++){l=Object(arguments[d]);for(var f in l)t.call(l,f)&&(c[f]=l[f]);if(e){u=e(l);for(var p=0;p<u.length;p++)n.call(l,u[p])&&(c[u[p]]=l[u[p]])}}return c},ir}var sr,Co;function Dr(){if(Co)return sr;Co=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return sr=e,sr}var ar,Po;function Ri(){return Po||(Po=1,ar=Function.call.bind(Object.prototype.hasOwnProperty)),ar}var lr,No;function _a(){if(No)return lr;No=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Dr(),n={},r=Ri();e=function(i){var a="Warning: "+i;typeof console<"u"&&console.error(a);try{throw new Error(a)}catch{}}}function o(i,a,l,c,u){if(process.env.NODE_ENV!=="production"){for(var d in i)if(r(i,d)){var f;try{if(typeof i[d]!="function"){var p=Error((c||"React class")+": "+l+" type `"+d+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[d]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw p.name="Invariant Violation",p}f=i[d](a,d,c,l,null,t)}catch(v){f=v}if(f&&!(f instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+d+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in n)){n[f.message]=!0;var b=u?u():"";e("Failed "+l+" type: "+f.message+(b??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},lr=o,lr}var cr,Ro;function Aa(){if(Ro)return cr;Ro=1;var e=Ni(),t=ja(),n=Dr(),r=Ri(),o=_a(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function a(){return null}return cr=function(l,c){var u=typeof Symbol=="function"&&Symbol.iterator,d="@@iterator";function f(O){var _=O&&(u&&O[u]||O[d]);if(typeof _=="function")return _}var p="<<anonymous>>",b={array:T("array"),bigint:T("bigint"),bool:T("boolean"),func:T("function"),number:T("number"),object:T("object"),string:T("string"),symbol:T("symbol"),any:$(),arrayOf:x,element:w(),elementType:h(),instanceOf:C,node:S(),objectOf:B,oneOf:P,oneOfType:D,shape:j,exact:V};function v(O,_){return O===_?O!==0||1/O===1/_:O!==O&&_!==_}function g(O,_){this.message=O,this.data=_&&typeof _=="object"?_:{},this.stack=""}g.prototype=Error.prototype;function m(O){if(process.env.NODE_ENV!=="production")var _={},U=0;function X(H,W,K,q,Y,J,re){if(q=q||p,J=J||K,re!==n){if(c){var I=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw I.name="Invariant Violation",I}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var Z=q+":"+K;!_[Z]&&U<3&&(i("You are manually calling a React.PropTypes validation function for the `"+J+"` prop on `"+q+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),_[Z]=!0,U++)}}return W[K]==null?H?W[K]===null?new g("The "+Y+" `"+J+"` is marked as required "+("in `"+q+"`, but its value is `null`.")):new g("The "+Y+" `"+J+"` is marked as required in "+("`"+q+"`, but its value is `undefined`.")):null:O(W,K,q,Y,J)}var z=X.bind(null,!1);return z.isRequired=X.bind(null,!0),z}function T(O){function _(U,X,z,H,W,K){var q=U[X],Y=M(q);if(Y!==O){var J=L(q);return new g("Invalid "+H+" `"+W+"` of type "+("`"+J+"` supplied to `"+z+"`, expected ")+("`"+O+"`."),{expectedType:O})}return null}return m(_)}function $(){return m(a)}function x(O){function _(U,X,z,H,W){if(typeof O!="function")return new g("Property `"+W+"` of component `"+z+"` has invalid PropType notation inside arrayOf.");var K=U[X];if(!Array.isArray(K)){var q=M(K);return new g("Invalid "+H+" `"+W+"` of type "+("`"+q+"` supplied to `"+z+"`, expected an array."))}for(var Y=0;Y<K.length;Y++){var J=O(K,Y,z,H,W+"["+Y+"]",n);if(J instanceof Error)return J}return null}return m(_)}function w(){function O(_,U,X,z,H){var W=_[U];if(!l(W)){var K=M(W);return new g("Invalid "+z+" `"+H+"` of type "+("`"+K+"` supplied to `"+X+"`, expected a single ReactElement."))}return null}return m(O)}function h(){function O(_,U,X,z,H){var W=_[U];if(!e.isValidElementType(W)){var K=M(W);return new g("Invalid "+z+" `"+H+"` of type "+("`"+K+"` supplied to `"+X+"`, expected a single ReactElement type."))}return null}return m(O)}function C(O){function _(U,X,z,H,W){if(!(U[X]instanceof O)){var K=O.name||p,q=Q(U[X]);return new g("Invalid "+H+" `"+W+"` of type "+("`"+q+"` supplied to `"+z+"`, expected ")+("instance of `"+K+"`."))}return null}return m(_)}function P(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),a;function _(U,X,z,H,W){for(var K=U[X],q=0;q<O.length;q++)if(v(K,O[q]))return null;var Y=JSON.stringify(O,function(re,I){var Z=L(I);return Z==="symbol"?String(I):I});return new g("Invalid "+H+" `"+W+"` of value `"+String(K)+"` "+("supplied to `"+z+"`, expected one of "+Y+"."))}return m(_)}function B(O){function _(U,X,z,H,W){if(typeof O!="function")return new g("Property `"+W+"` of component `"+z+"` has invalid PropType notation inside objectOf.");var K=U[X],q=M(K);if(q!=="object")return new g("Invalid "+H+" `"+W+"` of type "+("`"+q+"` supplied to `"+z+"`, expected an object."));for(var Y in K)if(r(K,Y)){var J=O(K,Y,z,H,W+"."+Y,n);if(J instanceof Error)return J}return null}return m(_)}function D(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),a;for(var _=0;_<O.length;_++){var U=O[_];if(typeof U!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ee(U)+" at index "+_+"."),a}function X(z,H,W,K,q){for(var Y=[],J=0;J<O.length;J++){var re=O[J],I=re(z,H,W,K,q,n);if(I==null)return null;I.data&&r(I.data,"expectedType")&&Y.push(I.data.expectedType)}var Z=Y.length>0?", expected one of type ["+Y.join(", ")+"]":"";return new g("Invalid "+K+" `"+q+"` supplied to "+("`"+W+"`"+Z+"."))}return m(X)}function S(){function O(_,U,X,z,H){return F(_[U])?null:new g("Invalid "+z+" `"+H+"` supplied to "+("`"+X+"`, expected a ReactNode."))}return m(O)}function N(O,_,U,X,z){return new g((O||"React class")+": "+_+" type `"+U+"."+X+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+z+"`.")}function j(O){function _(U,X,z,H,W){var K=U[X],q=M(K);if(q!=="object")return new g("Invalid "+H+" `"+W+"` of type `"+q+"` "+("supplied to `"+z+"`, expected `object`."));for(var Y in O){var J=O[Y];if(typeof J!="function")return N(z,H,W,Y,L(J));var re=J(K,Y,z,H,W+"."+Y,n);if(re)return re}return null}return m(_)}function V(O){function _(U,X,z,H,W){var K=U[X],q=M(K);if(q!=="object")return new g("Invalid "+H+" `"+W+"` of type `"+q+"` "+("supplied to `"+z+"`, expected `object`."));var Y=t({},U[X],O);for(var J in Y){var re=O[J];if(r(O,J)&&typeof re!="function")return N(z,H,W,J,L(re));if(!re)return new g("Invalid "+H+" `"+W+"` key `"+J+"` supplied to `"+z+"`.\nBad object: "+JSON.stringify(U[X],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(O),null,"  "));var I=re(K,J,z,H,W+"."+J,n);if(I)return I}return null}return m(_)}function F(O){switch(typeof O){case"number":case"string":case"undefined":return!0;case"boolean":return!O;case"object":if(Array.isArray(O))return O.every(F);if(O===null||l(O))return!0;var _=f(O);if(_){var U=_.call(O),X;if(_!==O.entries){for(;!(X=U.next()).done;)if(!F(X.value))return!1}else for(;!(X=U.next()).done;){var z=X.value;if(z&&!F(z[1]))return!1}}else return!1;return!0;default:return!1}}function A(O,_){return O==="symbol"?!0:_?_["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&_ instanceof Symbol:!1}function M(O){var _=typeof O;return Array.isArray(O)?"array":O instanceof RegExp?"object":A(_,O)?"symbol":_}function L(O){if(typeof O>"u"||O===null)return""+O;var _=M(O);if(_==="object"){if(O instanceof Date)return"date";if(O instanceof RegExp)return"regexp"}return _}function ee(O){var _=L(O);switch(_){case"array":case"object":return"an "+_;case"boolean":case"date":case"regexp":return"a "+_;default:return _}}function Q(O){return!O.constructor||!O.constructor.name?p:O.constructor.name}return b.checkPropTypes=o,b.resetWarningCache=o.resetWarningCache,b.PropTypes=b,b},cr}var ur,$o;function Da(){if($o)return ur;$o=1;var e=Dr();function t(){}function n(){}return n.resetWarningCache=t,ur=function(){function r(a,l,c,u,d,f){if(f!==e){var p=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw p.name="Invariant Violation",p}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},ur}if(process.env.NODE_ENV!=="production"){var Ba=Ni(),La=!0;wr.exports=Aa()(Ba.isElement,La)}else wr.exports=Da()();var Fa=wr.exports;const s=Ra(Fa);function Lt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function mt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function $i(e){if(!mt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=$i(e[n])}),t}function Ye(e,t,n={clone:!0}){const r=n.clone?k({},e):e;return mt(e)&&mt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(mt(t[o])&&o in e&&mt(e[o])?r[o]=Ye(e[o],t[o],n):n.clone?r[o]=mt(t[o])?$i(t[o]):t[o]:r[o]=t[o])}),r}function Va(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Mi(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let l;const c=i.type;return typeof c=="function"&&!Va(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ii=Lt(s.element,Mi);Ii.isRequired=Lt(s.element.isRequired,Mi);const fn=Ii;function za(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ua(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let l;return typeof i=="function"&&!za(i)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ha=Lt(s.elementType,Ua),qa="exact-prop: ​";function ji(e){return process.env.NODE_ENV==="production"?e:k({},e,{[qa]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Mt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Er={exports:{}},le={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mo;function Wa(){if(Mo)return le;Mo=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),v;v=Symbol.for("react.module.reference");function g(m){if(typeof m=="object"&&m!==null){var T=m.$$typeof;switch(T){case e:switch(m=m.type,m){case n:case o:case r:case u:case d:return m;default:switch(m=m&&m.$$typeof,m){case l:case a:case c:case p:case f:case i:return m;default:return T}}case t:return T}}}return le.ContextConsumer=a,le.ContextProvider=i,le.Element=e,le.ForwardRef=c,le.Fragment=n,le.Lazy=p,le.Memo=f,le.Portal=t,le.Profiler=o,le.StrictMode=r,le.Suspense=u,le.SuspenseList=d,le.isAsyncMode=function(){return!1},le.isConcurrentMode=function(){return!1},le.isContextConsumer=function(m){return g(m)===a},le.isContextProvider=function(m){return g(m)===i},le.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===e},le.isForwardRef=function(m){return g(m)===c},le.isFragment=function(m){return g(m)===n},le.isLazy=function(m){return g(m)===p},le.isMemo=function(m){return g(m)===f},le.isPortal=function(m){return g(m)===t},le.isProfiler=function(m){return g(m)===o},le.isStrictMode=function(m){return g(m)===r},le.isSuspense=function(m){return g(m)===u},le.isSuspenseList=function(m){return g(m)===d},le.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===n||m===o||m===r||m===u||m===d||m===b||typeof m=="object"&&m!==null&&(m.$$typeof===p||m.$$typeof===f||m.$$typeof===i||m.$$typeof===a||m.$$typeof===c||m.$$typeof===v||m.getModuleId!==void 0)},le.typeOf=g,le}var ce={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Io;function Ga(){return Io||(Io=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),v=!1,g=!1,m=!1,T=!1,$=!1,x;x=Symbol.for("react.module.reference");function w(R){return!!(typeof R=="string"||typeof R=="function"||R===n||R===o||$||R===r||R===u||R===d||T||R===b||v||g||m||typeof R=="object"&&R!==null&&(R.$$typeof===p||R.$$typeof===f||R.$$typeof===i||R.$$typeof===a||R.$$typeof===c||R.$$typeof===x||R.getModuleId!==void 0))}function h(R){if(typeof R=="object"&&R!==null){var oe=R.$$typeof;switch(oe){case e:var ye=R.type;switch(ye){case n:case o:case r:case u:case d:return ye;default:var ke=ye&&ye.$$typeof;switch(ke){case l:case a:case c:case p:case f:case i:return ke;default:return oe}}case t:return oe}}}var C=a,P=i,B=e,D=c,S=n,N=p,j=f,V=t,F=o,A=r,M=u,L=d,ee=!1,Q=!1;function O(R){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function _(R){return Q||(Q=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function U(R){return h(R)===a}function X(R){return h(R)===i}function z(R){return typeof R=="object"&&R!==null&&R.$$typeof===e}function H(R){return h(R)===c}function W(R){return h(R)===n}function K(R){return h(R)===p}function q(R){return h(R)===f}function Y(R){return h(R)===t}function J(R){return h(R)===o}function re(R){return h(R)===r}function I(R){return h(R)===u}function Z(R){return h(R)===d}ce.ContextConsumer=C,ce.ContextProvider=P,ce.Element=B,ce.ForwardRef=D,ce.Fragment=S,ce.Lazy=N,ce.Memo=j,ce.Portal=V,ce.Profiler=F,ce.StrictMode=A,ce.Suspense=M,ce.SuspenseList=L,ce.isAsyncMode=O,ce.isConcurrentMode=_,ce.isContextConsumer=U,ce.isContextProvider=X,ce.isElement=z,ce.isForwardRef=H,ce.isFragment=W,ce.isLazy=K,ce.isMemo=q,ce.isPortal=Y,ce.isProfiler=J,ce.isStrictMode=re,ce.isSuspense=I,ce.isSuspenseList=Z,ce.isValidElementType=w,ce.typeOf=h}()),ce}process.env.NODE_ENV==="production"?Er.exports=Wa():Er.exports=Ga();var In=Er.exports;const Ka=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Xa(e){const t=`${e}`.match(Ka);return t&&t[1]||""}function _i(e,t=""){return e.displayName||e.name||Xa(e)||t}function jo(e,t,n){const r=_i(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Ya(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return _i(e,"Component");if(typeof e=="object")switch(e.$$typeof){case In.ForwardRef:return jo(e,e.render,"ForwardRef");case In.Memo:return jo(e,e.type,"memo");default:return}}}function Je(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],a=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Ja=s.oneOfType([s.func,s.object]),Br=Ja;function He(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Mt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Tr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Ai(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function Za(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,a)=>{const l=o||"<<anonymous>>",c=a||r;return typeof n[r]<"u"?new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function Qa(e,t){var n,r;return E.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Ee(e){return e&&e.ownerDocument||document}function It(e){return Ee(e).defaultView||window}function el(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?k({},t.propTypes):null;return o=>(i,a,l,c,u,...d)=>{const f=u||a,p=n==null?void 0:n[f];if(p){const b=p(i,a,l,c,u,...d);if(b)return b}return typeof i[a]<"u"&&!i[o]?new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function jn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const tl=typeof window<"u"?E.useLayoutEffect:E.useEffect,vt=tl;let _o=0;function nl(e){const[t,n]=E.useState(e),r=e||t;return E.useEffect(()=>{t==null&&(_o+=1,n(`mui-${_o}`))},[t]),r}const Ao=E["useId".toString()];function Di(e){if(Ao!==void 0){const t=Ao();return e??t}return nl(e)}function rl(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function Bi({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=E.useRef(e!==void 0),[i,a]=E.useState(t),l=o?e:i;if(process.env.NODE_ENV!=="production"){E.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:u}=E.useRef(t);E.useEffect(()=>{!o&&u!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=E.useCallback(u=>{o||a(u)},[]);return[l,c]}function an(e){const t=E.useRef(e);return vt(()=>{t.current=e}),E.useRef((...n)=>(0,t.current)(...n)).current}function Be(...e){return E.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{jn(n,t)})},e)}const Do={};function ol(e,t){const n=E.useRef(Do);return n.current===Do&&(n.current=e(t)),n}const il=[];function sl(e){E.useEffect(e,il)}class mn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new mn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function Zt(){const e=ol(mn.create).current;return sl(e.disposeEffect),e}let zn=!0,kr=!1;const al=new mn,ll={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function cl(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&ll[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function ul(e){e.metaKey||e.altKey||e.ctrlKey||(zn=!0)}function dr(){zn=!1}function dl(){this.visibilityState==="hidden"&&kr&&(zn=!0)}function pl(e){e.addEventListener("keydown",ul,!0),e.addEventListener("mousedown",dr,!0),e.addEventListener("pointerdown",dr,!0),e.addEventListener("touchstart",dr,!0),e.addEventListener("visibilitychange",dl,!0)}function fl(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return zn||cl(t)}function Li(){const e=E.useCallback(o=>{o!=null&&pl(o.ownerDocument)},[]),t=E.useRef(!1);function n(){return t.current?(kr=!0,al.start(100,()=>{kr=!1}),t.current=!1,!0):!1}function r(o){return fl(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Fi(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function ml(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function hl(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const gl=Number.isInteger||hl;function Vi(e,t,n,r){const o=e[t];if(o==null||!gl(o)){const i=ml(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function zi(e,t,...n){return e[t]===void 0?null:Vi(e,t,...n)}function Or(){return null}zi.isRequired=Vi;Or.isRequired=Or;const Ui=process.env.NODE_ENV==="production"?Or:zi;function Hi(e,t){const n=k({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=k({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=k({},i),Object.keys(o).forEach(a=>{n[r][a]=Hi(o[a],i[a])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function et(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,a)=>{if(a){const l=t(a);l!==""&&i.push(l),n&&n[a]&&i.push(n[a])}return i},[]).join(" ")}),r}const Bo=e=>e,bl=()=>{let e=Bo;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Bo}}},vl=bl(),qi=vl,Wi={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function We(e,t,n="Mui"){const r=Wi[t];return r?`${n}-${r}`:`${qi.generate(e)}-${t}`}function it(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=We(e,o,n)}),r}function yl(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Gi(e){return typeof e=="string"}function Qt(e,t,n){return e===void 0||Gi(e)?t:k({},t,{ownerState:k({},t.ownerState,n)})}const xl={disableDefaultClasses:!1},wl=E.createContext(xl);function El(e){const{disableDefaultClasses:t}=E.useContext(wl);return n=>t?"":e(n)}function Ki(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function Tl(e,t,n){return typeof e=="function"?e(t,n):e}function Lo(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function kl(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const b=we(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),v=k({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),g=k({},n,o,r);return b.length>0&&(g.className=b),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:void 0}}const a=Ki(k({},o,r)),l=Lo(r),c=Lo(o),u=t(a),d=we(u==null?void 0:u.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),f=k({},u==null?void 0:u.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),p=k({},u,n,c,l);return d.length>0&&(p.className=d),Object.keys(f).length>0&&(p.style=f),{props:p,internalRef:u.ref}}const Ol=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function yt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,a=ue(e,Ol),l=i?{}:Tl(r,o),{props:c,internalRef:u}=kl(k({},a,{externalSlotProps:l})),d=Be(u,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return Qt(n,k({},c,{ref:d}),o)}const Xi="base";function Sl(e){return`${Xi}--${e}`}function Cl(e,t){return`${Xi}-${e}-${t}`}function Yi(e,t){const n=Wi[t];return n?Sl(n):Cl(e,t)}function Pl(e,t){const n={};return t.forEach(r=>{n[r]=Yi(e,r)}),n}const Nl=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Rl(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function $l(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Ml(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||$l(e))}function Il(e){const t=[],n=[];return Array.from(e.querySelectorAll(Nl)).forEach((r,o)=>{const i=Rl(r);i===-1||!Ml(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function jl(){return!0}function _n(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=Il,isEnabled:a=jl,open:l}=e,c=E.useRef(!1),u=E.useRef(null),d=E.useRef(null),f=E.useRef(null),p=E.useRef(null),b=E.useRef(!1),v=E.useRef(null),g=Be(t.ref,v),m=E.useRef(null);E.useEffect(()=>{!l||!v.current||(b.current=!n)},[n,l]),E.useEffect(()=>{if(!l||!v.current)return;const x=Ee(v.current);return v.current.contains(x.activeElement)||(v.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),v.current.setAttribute("tabIndex","-1")),b.current&&v.current.focus()),()=>{o||(f.current&&f.current.focus&&(c.current=!0,f.current.focus()),f.current=null)}},[l]),E.useEffect(()=>{if(!l||!v.current)return;const x=Ee(v.current),w=P=>{m.current=P,!(r||!a()||P.key!=="Tab")&&x.activeElement===v.current&&P.shiftKey&&(c.current=!0,d.current&&d.current.focus())},h=()=>{const P=v.current;if(P===null)return;if(!x.hasFocus()||!a()||c.current){c.current=!1;return}if(P.contains(x.activeElement)||r&&x.activeElement!==u.current&&x.activeElement!==d.current)return;if(x.activeElement!==p.current)p.current=null;else if(p.current!==null)return;if(!b.current)return;let B=[];if((x.activeElement===u.current||x.activeElement===d.current)&&(B=i(v.current)),B.length>0){var D,S;const N=!!((D=m.current)!=null&&D.shiftKey&&((S=m.current)==null?void 0:S.key)==="Tab"),j=B[0],V=B[B.length-1];typeof j!="string"&&typeof V!="string"&&(N?V.focus():j.focus())}else P.focus()};x.addEventListener("focusin",h),x.addEventListener("keydown",w,!0);const C=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&h()},50);return()=>{clearInterval(C),x.removeEventListener("focusin",h),x.removeEventListener("keydown",w,!0)}},[n,r,o,a,l,i]);const T=x=>{f.current===null&&(f.current=x.relatedTarget),b.current=!0,p.current=x.target;const w=t.props.onFocus;w&&w(x)},$=x=>{f.current===null&&(f.current=x.relatedTarget),b.current=!0};return y.jsxs(E.Fragment,{children:[y.jsx("div",{tabIndex:l?0:-1,onFocus:$,ref:u,"data-testid":"sentinelStart"}),E.cloneElement(t,{ref:g,onFocus:T}),y.jsx("div",{tabIndex:l?0:-1,onFocus:$,ref:d,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(_n.propTypes={children:fn,disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableRestoreFocus:s.bool,getTabbable:s.func,isEnabled:s.func,open:s.bool.isRequired});process.env.NODE_ENV!=="production"&&(_n["propTypes"]=ji(_n.propTypes));function _l(e){return typeof e=="function"?e():e}const ln=E.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[a,l]=E.useState(null),c=Be(E.isValidElement(r)?r.ref:null,n);if(vt(()=>{i||l(_l(o)||document.body)},[o,i]),vt(()=>{if(a&&!i)return jn(n,a),()=>{jn(n,null)}},[n,a,i]),i){if(E.isValidElement(r)){const u={ref:c};return E.cloneElement(r,u)}return y.jsx(E.Fragment,{children:r})}return y.jsx(E.Fragment,{children:a&&Js.createPortal(r,a)})});process.env.NODE_ENV!=="production"&&(ln.propTypes={children:s.node,container:s.oneOfType([Je,s.func]),disablePortal:s.bool});process.env.NODE_ENV!=="production"&&(ln["propTypes"]=ji(ln.propTypes));function Al(e){const t=Ee(e);return t.body===e?It(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function nn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Fo(e){return parseInt(It(e).getComputedStyle(e).paddingRight,10)||0}function Dl(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Vo(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,a=>{const l=i.indexOf(a)===-1,c=!Dl(a);l&&c&&nn(a,o)})}function pr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function Bl(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(Al(r)){const a=Fi(Ee(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Fo(r)+a}px`;const l=Ee(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${Fo(c)+a}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=Ee(r).body;else{const a=r.parentElement,l=It(r);i=(a==null?void 0:a.nodeName)==="HTML"&&l.getComputedStyle(a).overflowY==="scroll"?a:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:a,property:l})=>{i?a.style.setProperty(l,i):a.style.removeProperty(l)})}}function Ll(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class Fl{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&nn(t.modalRef,!1);const o=Ll(n);Vo(n,t.mount,t.modalRef,o,!0);const i=pr(this.containers,a=>a.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=pr(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=Bl(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=pr(this.containers,a=>a.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&nn(t.modalRef,n),Vo(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const a=i.modals[i.modals.length-1];a.modalRef&&nn(a.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Vl(e){return typeof e=="function"?e():e}function zl(e){return e?e.props.hasOwnProperty("in"):!1}const Ul=new Fl;function Hl(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Ul,closeAfterTransition:i=!1,onTransitionEnter:a,onTransitionExited:l,children:c,onClose:u,open:d,rootRef:f}=e,p=E.useRef({}),b=E.useRef(null),v=E.useRef(null),g=Be(v,f),[m,T]=E.useState(!d),$=zl(c);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const w=()=>Ee(b.current),h=()=>(p.current.modalRef=v.current,p.current.mount=b.current,p.current),C=()=>{o.mount(h(),{disableScrollLock:r}),v.current&&(v.current.scrollTop=0)},P=an(()=>{const M=Vl(t)||w().body;o.add(h(),M),v.current&&C()}),B=E.useCallback(()=>o.isTopModal(h()),[o]),D=an(M=>{b.current=M,M&&(d&&B()?C():v.current&&nn(v.current,x))}),S=E.useCallback(()=>{o.remove(h(),x)},[x,o]);E.useEffect(()=>()=>{S()},[S]),E.useEffect(()=>{d?P():(!$||!i)&&S()},[d,S,$,i,P]);const N=M=>L=>{var ee;(ee=M.onKeyDown)==null||ee.call(M,L),!(L.key!=="Escape"||L.which===229||!B())&&(n||(L.stopPropagation(),u&&u(L,"escapeKeyDown")))},j=M=>L=>{var ee;(ee=M.onClick)==null||ee.call(M,L),L.target===L.currentTarget&&u&&u(L,"backdropClick")};return{getRootProps:(M={})=>{const L=Ki(e);delete L.onTransitionEnter,delete L.onTransitionExited;const ee=k({},L,M);return k({role:"presentation"},ee,{onKeyDown:N(ee),ref:g})},getBackdropProps:(M={})=>{const L=M;return k({"aria-hidden":!0},L,{onClick:j(L),open:d})},getTransitionProps:()=>{const M=()=>{T(!1),a&&a()},L=()=>{T(!0),l&&l(),i&&S()};return{onEnter:Tr(M,c==null?void 0:c.props.onEnter),onExited:Tr(L,c==null?void 0:c.props.onExited)}},rootRef:g,portalRef:D,isTopModal:B,exited:m,hasTransition:$}}var Ce="top",Le="bottom",Fe="right",Pe="left",Lr="auto",hn=[Ce,Le,Fe,Pe],jt="start",cn="end",ql="clippingParents",Ji="viewport",Gt="popper",Wl="reference",zo=hn.reduce(function(e,t){return e.concat([t+"-"+jt,t+"-"+cn])},[]),Zi=[].concat(hn,[Lr]).reduce(function(e,t){return e.concat([t,t+"-"+jt,t+"-"+cn])},[]),Gl="beforeRead",Kl="read",Xl="afterRead",Yl="beforeMain",Jl="main",Zl="afterMain",Ql="beforeWrite",ec="write",tc="afterWrite",nc=[Gl,Kl,Xl,Yl,Jl,Zl,Ql,ec,tc];function qe(e){return e?(e.nodeName||"").toLowerCase():null}function je(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function xt(e){var t=je(e).Element;return e instanceof t||e instanceof Element}function De(e){var t=je(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Fr(e){if(typeof ShadowRoot>"u")return!1;var t=je(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function rc(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!De(i)||!qe(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(a){var l=o[a];l===!1?i.removeAttribute(a):i.setAttribute(a,l===!0?"":l)}))})}function oc(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},a=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=a.reduce(function(c,u){return c[u]="",c},{});!De(o)||!qe(o)||(Object.assign(o.style,l),Object.keys(i).forEach(function(c){o.removeAttribute(c)}))})}}const ic={name:"applyStyles",enabled:!0,phase:"write",fn:rc,effect:oc,requires:["computeStyles"]};function Ue(e){return e.split("-")[0]}var gt=Math.max,An=Math.min,_t=Math.round;function Sr(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Qi(){return!/^((?!chrome|android).)*safari/i.test(Sr())}function At(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&De(e)&&(o=e.offsetWidth>0&&_t(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&_t(r.height)/e.offsetHeight||1);var a=xt(e)?je(e):window,l=a.visualViewport,c=!Qi()&&n,u=(r.left+(c&&l?l.offsetLeft:0))/o,d=(r.top+(c&&l?l.offsetTop:0))/i,f=r.width/o,p=r.height/i;return{width:f,height:p,top:d,right:u+f,bottom:d+p,left:u,x:u,y:d}}function Vr(e){var t=At(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function es(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Fr(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function Ze(e){return je(e).getComputedStyle(e)}function sc(e){return["table","td","th"].indexOf(qe(e))>=0}function st(e){return((xt(e)?e.ownerDocument:e.document)||window.document).documentElement}function Un(e){return qe(e)==="html"?e:e.assignedSlot||e.parentNode||(Fr(e)?e.host:null)||st(e)}function Uo(e){return!De(e)||Ze(e).position==="fixed"?null:e.offsetParent}function ac(e){var t=/firefox/i.test(Sr()),n=/Trident/i.test(Sr());if(n&&De(e)){var r=Ze(e);if(r.position==="fixed")return null}var o=Un(e);for(Fr(o)&&(o=o.host);De(o)&&["html","body"].indexOf(qe(o))<0;){var i=Ze(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function gn(e){for(var t=je(e),n=Uo(e);n&&sc(n)&&Ze(n).position==="static";)n=Uo(n);return n&&(qe(n)==="html"||qe(n)==="body"&&Ze(n).position==="static")?t:n||ac(e)||t}function zr(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function rn(e,t,n){return gt(e,An(t,n))}function lc(e,t,n){var r=rn(e,t,n);return r>n?n:r}function ts(){return{top:0,right:0,bottom:0,left:0}}function ns(e){return Object.assign({},ts(),e)}function rs(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var cc=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,ns(typeof t!="number"?t:rs(t,hn))};function uc(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,l=Ue(n.placement),c=zr(l),u=[Pe,Fe].indexOf(l)>=0,d=u?"height":"width";if(!(!i||!a)){var f=cc(o.padding,n),p=Vr(i),b=c==="y"?Ce:Pe,v=c==="y"?Le:Fe,g=n.rects.reference[d]+n.rects.reference[c]-a[c]-n.rects.popper[d],m=a[c]-n.rects.reference[c],T=gn(i),$=T?c==="y"?T.clientHeight||0:T.clientWidth||0:0,x=g/2-m/2,w=f[b],h=$-p[d]-f[v],C=$/2-p[d]/2+x,P=rn(w,C,h),B=c;n.modifiersData[r]=(t={},t[B]=P,t.centerOffset=P-C,t)}}function dc(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||es(t.elements.popper,o)&&(t.elements.arrow=o))}const pc={name:"arrow",enabled:!0,phase:"main",fn:uc,effect:dc,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Dt(e){return e.split("-")[1]}var fc={top:"auto",right:"auto",bottom:"auto",left:"auto"};function mc(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:_t(n*o)/o||0,y:_t(r*o)/o||0}}function Ho(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,a=e.offsets,l=e.position,c=e.gpuAcceleration,u=e.adaptive,d=e.roundOffsets,f=e.isFixed,p=a.x,b=p===void 0?0:p,v=a.y,g=v===void 0?0:v,m=typeof d=="function"?d({x:b,y:g}):{x:b,y:g};b=m.x,g=m.y;var T=a.hasOwnProperty("x"),$=a.hasOwnProperty("y"),x=Pe,w=Ce,h=window;if(u){var C=gn(n),P="clientHeight",B="clientWidth";if(C===je(n)&&(C=st(n),Ze(C).position!=="static"&&l==="absolute"&&(P="scrollHeight",B="scrollWidth")),C=C,o===Ce||(o===Pe||o===Fe)&&i===cn){w=Le;var D=f&&C===h&&h.visualViewport?h.visualViewport.height:C[P];g-=D-r.height,g*=c?1:-1}if(o===Pe||(o===Ce||o===Le)&&i===cn){x=Fe;var S=f&&C===h&&h.visualViewport?h.visualViewport.width:C[B];b-=S-r.width,b*=c?1:-1}}var N=Object.assign({position:l},u&&fc),j=d===!0?mc({x:b,y:g},je(n)):{x:b,y:g};if(b=j.x,g=j.y,c){var V;return Object.assign({},N,(V={},V[w]=$?"0":"",V[x]=T?"0":"",V.transform=(h.devicePixelRatio||1)<=1?"translate("+b+"px, "+g+"px)":"translate3d("+b+"px, "+g+"px, 0)",V))}return Object.assign({},N,(t={},t[w]=$?g+"px":"",t[x]=T?b+"px":"",t.transform="",t))}function hc(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,a=i===void 0?!0:i,l=n.roundOffsets,c=l===void 0?!0:l,u={placement:Ue(t.placement),variation:Dt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Ho(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Ho(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const gc={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:hc,data:{}};var kn={passive:!0};function bc(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,a=r.resize,l=a===void 0?!0:a,c=je(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&u.forEach(function(d){d.addEventListener("scroll",n.update,kn)}),l&&c.addEventListener("resize",n.update,kn),function(){i&&u.forEach(function(d){d.removeEventListener("scroll",n.update,kn)}),l&&c.removeEventListener("resize",n.update,kn)}}const vc={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:bc,data:{}};var yc={left:"right",right:"left",bottom:"top",top:"bottom"};function Pn(e){return e.replace(/left|right|bottom|top/g,function(t){return yc[t]})}var xc={start:"end",end:"start"};function qo(e){return e.replace(/start|end/g,function(t){return xc[t]})}function Ur(e){var t=je(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Hr(e){return At(st(e)).left+Ur(e).scrollLeft}function wc(e,t){var n=je(e),r=st(e),o=n.visualViewport,i=r.clientWidth,a=r.clientHeight,l=0,c=0;if(o){i=o.width,a=o.height;var u=Qi();(u||!u&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:i,height:a,x:l+Hr(e),y:c}}function Ec(e){var t,n=st(e),r=Ur(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=gt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=gt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Hr(e),c=-r.scrollTop;return Ze(o||n).direction==="rtl"&&(l+=gt(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:l,y:c}}function qr(e){var t=Ze(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function os(e){return["html","body","#document"].indexOf(qe(e))>=0?e.ownerDocument.body:De(e)&&qr(e)?e:os(Un(e))}function on(e,t){var n;t===void 0&&(t=[]);var r=os(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=je(r),a=o?[i].concat(i.visualViewport||[],qr(r)?r:[]):r,l=t.concat(a);return o?l:l.concat(on(Un(a)))}function Cr(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Tc(e,t){var n=At(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Wo(e,t,n){return t===Ji?Cr(wc(e,n)):xt(t)?Tc(t,n):Cr(Ec(st(e)))}function kc(e){var t=on(Un(e)),n=["absolute","fixed"].indexOf(Ze(e).position)>=0,r=n&&De(e)?gn(e):e;return xt(r)?t.filter(function(o){return xt(o)&&es(o,r)&&qe(o)!=="body"}):[]}function Oc(e,t,n,r){var o=t==="clippingParents"?kc(e):[].concat(t),i=[].concat(o,[n]),a=i[0],l=i.reduce(function(c,u){var d=Wo(e,u,r);return c.top=gt(d.top,c.top),c.right=An(d.right,c.right),c.bottom=An(d.bottom,c.bottom),c.left=gt(d.left,c.left),c},Wo(e,a,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function is(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ue(r):null,i=r?Dt(r):null,a=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Ce:c={x:a,y:t.y-n.height};break;case Le:c={x:a,y:t.y+t.height};break;case Fe:c={x:t.x+t.width,y:l};break;case Pe:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var u=o?zr(o):null;if(u!=null){var d=u==="y"?"height":"width";switch(i){case jt:c[u]=c[u]-(t[d]/2-n[d]/2);break;case cn:c[u]=c[u]+(t[d]/2-n[d]/2);break}}return c}function un(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,a=i===void 0?e.strategy:i,l=n.boundary,c=l===void 0?ql:l,u=n.rootBoundary,d=u===void 0?Ji:u,f=n.elementContext,p=f===void 0?Gt:f,b=n.altBoundary,v=b===void 0?!1:b,g=n.padding,m=g===void 0?0:g,T=ns(typeof m!="number"?m:rs(m,hn)),$=p===Gt?Wl:Gt,x=e.rects.popper,w=e.elements[v?$:p],h=Oc(xt(w)?w:w.contextElement||st(e.elements.popper),c,d,a),C=At(e.elements.reference),P=is({reference:C,element:x,strategy:"absolute",placement:o}),B=Cr(Object.assign({},x,P)),D=p===Gt?B:C,S={top:h.top-D.top+T.top,bottom:D.bottom-h.bottom+T.bottom,left:h.left-D.left+T.left,right:D.right-h.right+T.right},N=e.modifiersData.offset;if(p===Gt&&N){var j=N[o];Object.keys(S).forEach(function(V){var F=[Fe,Le].indexOf(V)>=0?1:-1,A=[Ce,Le].indexOf(V)>=0?"y":"x";S[V]+=j[A]*F})}return S}function Sc(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,u=c===void 0?Zi:c,d=Dt(r),f=d?l?zo:zo.filter(function(v){return Dt(v)===d}):hn,p=f.filter(function(v){return u.indexOf(v)>=0});p.length===0&&(p=f);var b=p.reduce(function(v,g){return v[g]=un(e,{placement:g,boundary:o,rootBoundary:i,padding:a})[Ue(g)],v},{});return Object.keys(b).sort(function(v,g){return b[v]-b[g]})}function Cc(e){if(Ue(e)===Lr)return[];var t=Pn(e);return[qo(e),t,qo(t)]}function Pc(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!0:a,c=n.fallbackPlacements,u=n.padding,d=n.boundary,f=n.rootBoundary,p=n.altBoundary,b=n.flipVariations,v=b===void 0?!0:b,g=n.allowedAutoPlacements,m=t.options.placement,T=Ue(m),$=T===m,x=c||($||!v?[Pn(m)]:Cc(m)),w=[m].concat(x).reduce(function(z,H){return z.concat(Ue(H)===Lr?Sc(t,{placement:H,boundary:d,rootBoundary:f,padding:u,flipVariations:v,allowedAutoPlacements:g}):H)},[]),h=t.rects.reference,C=t.rects.popper,P=new Map,B=!0,D=w[0],S=0;S<w.length;S++){var N=w[S],j=Ue(N),V=Dt(N)===jt,F=[Ce,Le].indexOf(j)>=0,A=F?"width":"height",M=un(t,{placement:N,boundary:d,rootBoundary:f,altBoundary:p,padding:u}),L=F?V?Fe:Pe:V?Le:Ce;h[A]>C[A]&&(L=Pn(L));var ee=Pn(L),Q=[];if(i&&Q.push(M[j]<=0),l&&Q.push(M[L]<=0,M[ee]<=0),Q.every(function(z){return z})){D=N,B=!1;break}P.set(N,Q)}if(B)for(var O=v?3:1,_=function(H){var W=w.find(function(K){var q=P.get(K);if(q)return q.slice(0,H).every(function(Y){return Y})});if(W)return D=W,"break"},U=O;U>0;U--){var X=_(U);if(X==="break")break}t.placement!==D&&(t.modifiersData[r]._skip=!0,t.placement=D,t.reset=!0)}}const Nc={name:"flip",enabled:!0,phase:"main",fn:Pc,requiresIfExists:["offset"],data:{_skip:!1}};function Go(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Ko(e){return[Ce,Fe,Le,Pe].some(function(t){return e[t]>=0})}function Rc(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=un(t,{elementContext:"reference"}),l=un(t,{altBoundary:!0}),c=Go(a,r),u=Go(l,o,i),d=Ko(c),f=Ko(u);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:u,isReferenceHidden:d,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":d,"data-popper-escaped":f})}const $c={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Rc};function Mc(e,t,n){var r=Ue(e),o=[Pe,Ce].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,a=i[0],l=i[1];return a=a||0,l=(l||0)*o,[Pe,Fe].indexOf(r)>=0?{x:l,y:a}:{x:a,y:l}}function Ic(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,a=Zi.reduce(function(d,f){return d[f]=Mc(f,t.rects,i),d},{}),l=a[t.placement],c=l.x,u=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=u),t.modifiersData[r]=a}const jc={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Ic};function _c(e){var t=e.state,n=e.name;t.modifiersData[n]=is({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Ac={name:"popperOffsets",enabled:!0,phase:"read",fn:_c,data:{}};function Dc(e){return e==="x"?"y":"x"}function Bc(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!1:a,c=n.boundary,u=n.rootBoundary,d=n.altBoundary,f=n.padding,p=n.tether,b=p===void 0?!0:p,v=n.tetherOffset,g=v===void 0?0:v,m=un(t,{boundary:c,rootBoundary:u,padding:f,altBoundary:d}),T=Ue(t.placement),$=Dt(t.placement),x=!$,w=zr(T),h=Dc(w),C=t.modifiersData.popperOffsets,P=t.rects.reference,B=t.rects.popper,D=typeof g=="function"?g(Object.assign({},t.rects,{placement:t.placement})):g,S=typeof D=="number"?{mainAxis:D,altAxis:D}:Object.assign({mainAxis:0,altAxis:0},D),N=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,j={x:0,y:0};if(C){if(i){var V,F=w==="y"?Ce:Pe,A=w==="y"?Le:Fe,M=w==="y"?"height":"width",L=C[w],ee=L+m[F],Q=L-m[A],O=b?-B[M]/2:0,_=$===jt?P[M]:B[M],U=$===jt?-B[M]:-P[M],X=t.elements.arrow,z=b&&X?Vr(X):{width:0,height:0},H=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:ts(),W=H[F],K=H[A],q=rn(0,P[M],z[M]),Y=x?P[M]/2-O-q-W-S.mainAxis:_-q-W-S.mainAxis,J=x?-P[M]/2+O+q+K+S.mainAxis:U+q+K+S.mainAxis,re=t.elements.arrow&&gn(t.elements.arrow),I=re?w==="y"?re.clientTop||0:re.clientLeft||0:0,Z=(V=N==null?void 0:N[w])!=null?V:0,R=L+Y-Z-I,oe=L+J-Z,ye=rn(b?An(ee,R):ee,L,b?gt(Q,oe):Q);C[w]=ye,j[w]=ye-L}if(l){var ke,ge=w==="x"?Ce:Pe,lt=w==="x"?Le:Fe,Oe=C[h],Ge=h==="y"?"height":"width",Ne=Oe+m[ge],Ke=Oe-m[lt],xe=[Ce,Pe].indexOf(T)!==-1,Et=(ke=N==null?void 0:N[h])!=null?ke:0,ct=xe?Ne:Oe-P[Ge]-B[Ge]-Et+S.altAxis,Ft=xe?Oe+P[Ge]+B[Ge]-Et-S.altAxis:Ke,xn=b&&xe?lc(ct,Oe,Ft):rn(b?ct:Ne,Oe,b?Ft:Ke);C[h]=xn,j[h]=xn-Oe}t.modifiersData[r]=j}}const Lc={name:"preventOverflow",enabled:!0,phase:"main",fn:Bc,requiresIfExists:["offset"]};function Fc(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Vc(e){return e===je(e)||!De(e)?Ur(e):Fc(e)}function zc(e){var t=e.getBoundingClientRect(),n=_t(t.width)/e.offsetWidth||1,r=_t(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Uc(e,t,n){n===void 0&&(n=!1);var r=De(t),o=De(t)&&zc(t),i=st(t),a=At(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((qe(t)!=="body"||qr(i))&&(l=Vc(t)),De(t)?(c=At(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):i&&(c.x=Hr(i))),{x:a.left+l.scrollLeft-c.x,y:a.top+l.scrollTop-c.y,width:a.width,height:a.height}}function Hc(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var a=[].concat(i.requires||[],i.requiresIfExists||[]);a.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function qc(e){var t=Hc(e);return nc.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Wc(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Gc(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var Xo={placement:"bottom",modifiers:[],strategy:"absolute"};function Yo(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Kc(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?Xo:o;return function(l,c,u){u===void 0&&(u=i);var d={placement:"bottom",orderedModifiers:[],options:Object.assign({},Xo,i),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},f=[],p=!1,b={state:d,setOptions:function(T){var $=typeof T=="function"?T(d.options):T;g(),d.options=Object.assign({},i,d.options,$),d.scrollParents={reference:xt(l)?on(l):l.contextElement?on(l.contextElement):[],popper:on(c)};var x=qc(Gc([].concat(r,d.options.modifiers)));return d.orderedModifiers=x.filter(function(w){return w.enabled}),v(),b.update()},forceUpdate:function(){if(!p){var T=d.elements,$=T.reference,x=T.popper;if(Yo($,x)){d.rects={reference:Uc($,gn(x),d.options.strategy==="fixed"),popper:Vr(x)},d.reset=!1,d.placement=d.options.placement,d.orderedModifiers.forEach(function(S){return d.modifiersData[S.name]=Object.assign({},S.data)});for(var w=0;w<d.orderedModifiers.length;w++){if(d.reset===!0){d.reset=!1,w=-1;continue}var h=d.orderedModifiers[w],C=h.fn,P=h.options,B=P===void 0?{}:P,D=h.name;typeof C=="function"&&(d=C({state:d,options:B,name:D,instance:b})||d)}}}},update:Wc(function(){return new Promise(function(m){b.forceUpdate(),m(d)})}),destroy:function(){g(),p=!0}};if(!Yo(l,c))return b;b.setOptions(u).then(function(m){!p&&u.onFirstUpdate&&u.onFirstUpdate(m)});function v(){d.orderedModifiers.forEach(function(m){var T=m.name,$=m.options,x=$===void 0?{}:$,w=m.effect;if(typeof w=="function"){var h=w({state:d,name:T,instance:b,options:x}),C=function(){};f.push(h||C)}})}function g(){f.forEach(function(m){return m()}),f=[]}return b}}var Xc=[vc,Ac,gc,ic,jc,Nc,Lc,pc,$c],Yc=Kc({defaultModifiers:Xc});const ss="Popper";function Jc(e){return Yi(ss,e)}Pl(ss,["root"]);const Zc=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Qc=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function eu(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function Dn(e){return typeof e=="function"?e():e}function Hn(e){return e.nodeType!==void 0}function tu(e){return!Hn(e)}const nu=()=>et({root:["root"]},El(Jc)),ru={},ou=E.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:a,disablePortal:l,modifiers:c,open:u,placement:d,popperOptions:f,popperRef:p,slotProps:b={},slots:v={},TransitionProps:g}=t,m=ue(t,Zc),T=E.useRef(null),$=Be(T,n),x=E.useRef(null),w=Be(x,p),h=E.useRef(w);vt(()=>{h.current=w},[w]),E.useImperativeHandle(p,()=>x.current,[]);const C=eu(d,a),[P,B]=E.useState(C),[D,S]=E.useState(Dn(o));E.useEffect(()=>{x.current&&x.current.forceUpdate()}),E.useEffect(()=>{o&&S(Dn(o))},[o]),vt(()=>{if(!D||!u)return;const A=ee=>{B(ee.placement)};if(process.env.NODE_ENV!=="production"&&D&&Hn(D)&&D.nodeType===1){const ee=D.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ee.top===0&&ee.left===0&&ee.right===0&&ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let M=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ee})=>{A(ee)}}];c!=null&&(M=M.concat(c)),f&&f.modifiers!=null&&(M=M.concat(f.modifiers));const L=Yc(D,T.current,k({placement:C},f,{modifiers:M}));return h.current(L),()=>{L.destroy(),h.current(null)}},[D,l,c,u,f,C]);const N={placement:P};g!==null&&(N.TransitionProps=g);const j=nu(),V=(r=v.root)!=null?r:"div",F=yt({elementType:V,externalSlotProps:b.root,externalForwardedProps:m,additionalProps:{role:"tooltip",ref:$},ownerState:t,className:j.root});return y.jsx(V,k({},F,{children:typeof i=="function"?i(N):i}))}),as=E.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:a="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:u,open:d,placement:f="bottom",popperOptions:p=ru,popperRef:b,style:v,transition:g=!1,slotProps:m={},slots:T={}}=t,$=ue(t,Qc),[x,w]=E.useState(!0),h=()=>{w(!1)},C=()=>{w(!0)};if(!c&&!d&&(!g||x))return null;let P;if(i)P=i;else if(r){const S=Dn(r);P=S&&Hn(S)?Ee(S).body:Ee(null).body}const B=!d&&c&&(!g||x)?"none":void 0,D=g?{in:d,onEnter:h,onExited:C}:void 0;return y.jsx(ln,{disablePortal:l,container:P,children:y.jsx(ou,k({anchorEl:r,direction:a,disablePortal:l,modifiers:u,ref:n,open:g?!x:d,placement:f,popperOptions:p,popperRef:b,slotProps:m,slots:T},$,{style:k({position:"fixed",top:0,left:0,display:B},v),TransitionProps:D,children:o}))})});process.env.NODE_ENV!=="production"&&(as.propTypes={anchorEl:Lt(s.oneOfType([Je,s.object,s.func]),e=>{if(e.open){const t=Dn(e.anchorEl);if(t&&Hn(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||tu(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:s.oneOfType([s.node,s.func]),container:s.oneOfType([Je,s.func]),direction:s.oneOf(["ltr","rtl"]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:Br,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),transition:s.bool});const iu=["values","unit","step"],su=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>k({},n,{[r.key]:r.val}),{})};function au(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=ue(e,iu),i=su(t),a=Object.keys(i);function l(p){return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n})`}function c(p){return`@media (max-width:${(typeof t[p]=="number"?t[p]:p)-r/100}${n})`}function u(p,b){const v=a.indexOf(b);return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n}) and (max-width:${(v!==-1&&typeof t[a[v]]=="number"?t[a[v]]:b)-r/100}${n})`}function d(p){return a.indexOf(p)+1<a.length?u(p,a[a.indexOf(p)+1]):l(p)}function f(p){const b=a.indexOf(p);return b===0?l(a[1]):b===a.length-1?c(a[b]):u(p,a[a.indexOf(p)+1]).replace("@media","@media not all and")}return k({keys:a,values:i,up:l,down:c,between:u,only:d,not:f,unit:n},o)}const lu={borderRadius:4},cu=lu,uu=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.string,s.object,s.array]):{},at=uu;function sn(e,t){return t?Ye(e,t,{clone:!1}):e}const Wr={xs:0,sm:600,md:900,lg:1200,xl:1536},Jo={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Wr[e]}px)`};function Qe(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||Jo;return t.reduce((a,l,c)=>(a[i.up(i.keys[c])]=n(t[c]),a),{})}if(typeof t=="object"){const i=r.breakpoints||Jo;return Object.keys(t).reduce((a,l)=>{if(Object.keys(i.values||Wr).indexOf(l)!==-1){const c=i.up(l);a[c]=n(t[l],l)}else{const c=l;a[c]=t[c]}return a},{})}return n(t)}function du(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function pu(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function qn(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function Bn(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=qn(e,n)||r,t&&(o=t(o,r,e)),o}function ve(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=a=>{if(a[t]==null)return null;const l=a[t],c=a.theme,u=qn(c,r)||{};return Qe(a,l,f=>{let p=Bn(u,o,f);return f===p&&typeof f=="string"&&(p=Bn(u,o,`${t}${f==="default"?"":He(f)}`,f)),n===!1?p:{[n]:p}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:at}:{},i.filterProps=[t],i}function fu(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const mu={m:"margin",p:"padding"},hu={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Zo={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},gu=fu(e=>{if(e.length>2)if(Zo[e])e=Zo[e];else return[e];const[t,n]=e.split(""),r=mu[t],o=hu[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),Wn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Gn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],bu=[...Wn,...Gn];function bn(e,t,n,r){var o;const i=(o=qn(e,t,!1))!=null?o:n;return typeof i=="number"?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&typeof a!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`),i*a):Array.isArray(i)?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&(Number.isInteger(a)?a>i.length-1&&console.error([`MUI: The value provided (${a}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${a} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[a]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function ls(e){return bn(e,"spacing",8,"spacing")}function vn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function vu(e,t){return n=>e.reduce((r,o)=>(r[o]=vn(t,n),r),{})}function yu(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=gu(n),i=vu(o,r),a=e[n];return Qe(e,a,i)}function cs(e,t){const n=ls(e.theme);return Object.keys(e).map(r=>yu(e,t,r,n)).reduce(sn,{})}function me(e){return cs(e,Wn)}me.propTypes=process.env.NODE_ENV!=="production"?Wn.reduce((e,t)=>(e[t]=at,e),{}):{};me.filterProps=Wn;function he(e){return cs(e,Gn)}he.propTypes=process.env.NODE_ENV!=="production"?Gn.reduce((e,t)=>(e[t]=at,e),{}):{};he.filterProps=Gn;process.env.NODE_ENV!=="production"&&bu.reduce((e,t)=>(e[t]=at,e),{});function xu(e=8){if(e.mui)return e;const t=ls({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const a=t(i);return typeof a=="number"?`${a}px`:a}).join(" "));return n.mui=!0,n}function Kn(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?sn(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Ae(e){return typeof e!="number"?e:`${e}px solid`}function Ve(e,t){return ve({prop:e,themeKey:"borders",transform:t})}const wu=Ve("border",Ae),Eu=Ve("borderTop",Ae),Tu=Ve("borderRight",Ae),ku=Ve("borderBottom",Ae),Ou=Ve("borderLeft",Ae),Su=Ve("borderColor"),Cu=Ve("borderTopColor"),Pu=Ve("borderRightColor"),Nu=Ve("borderBottomColor"),Ru=Ve("borderLeftColor"),$u=Ve("outline",Ae),Mu=Ve("outlineColor"),Xn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=bn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:vn(t,r)});return Qe(e,e.borderRadius,n)}return null};Xn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:at}:{};Xn.filterProps=["borderRadius"];Kn(wu,Eu,Tu,ku,Ou,Su,Cu,Pu,Nu,Ru,Xn,$u,Mu);const Yn=e=>{if(e.gap!==void 0&&e.gap!==null){const t=bn(e.theme,"spacing",8,"gap"),n=r=>({gap:vn(t,r)});return Qe(e,e.gap,n)}return null};Yn.propTypes=process.env.NODE_ENV!=="production"?{gap:at}:{};Yn.filterProps=["gap"];const Jn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=bn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:vn(t,r)});return Qe(e,e.columnGap,n)}return null};Jn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:at}:{};Jn.filterProps=["columnGap"];const Zn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=bn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:vn(t,r)});return Qe(e,e.rowGap,n)}return null};Zn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:at}:{};Zn.filterProps=["rowGap"];const Iu=ve({prop:"gridColumn"}),ju=ve({prop:"gridRow"}),_u=ve({prop:"gridAutoFlow"}),Au=ve({prop:"gridAutoColumns"}),Du=ve({prop:"gridAutoRows"}),Bu=ve({prop:"gridTemplateColumns"}),Lu=ve({prop:"gridTemplateRows"}),Fu=ve({prop:"gridTemplateAreas"}),Vu=ve({prop:"gridArea"});Kn(Yn,Jn,Zn,Iu,ju,_u,Au,Du,Bu,Lu,Fu,Vu);function $t(e,t){return t==="grey"?t:e}const zu=ve({prop:"color",themeKey:"palette",transform:$t}),Uu=ve({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:$t}),Hu=ve({prop:"backgroundColor",themeKey:"palette",transform:$t});Kn(zu,Uu,Hu);function Me(e){return e<=1&&e!==0?`${e*100}%`:e}const qu=ve({prop:"width",transform:Me}),Gr=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Wr[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:Me(n)}};return Qe(e,e.maxWidth,t)}return null};Gr.filterProps=["maxWidth"];const Wu=ve({prop:"minWidth",transform:Me}),Gu=ve({prop:"height",transform:Me}),Ku=ve({prop:"maxHeight",transform:Me}),Xu=ve({prop:"minHeight",transform:Me});ve({prop:"size",cssProperty:"width",transform:Me});ve({prop:"size",cssProperty:"height",transform:Me});const Yu=ve({prop:"boxSizing"});Kn(qu,Gr,Wu,Gu,Ku,Xu,Yu);const Ju={border:{themeKey:"borders",transform:Ae},borderTop:{themeKey:"borders",transform:Ae},borderRight:{themeKey:"borders",transform:Ae},borderBottom:{themeKey:"borders",transform:Ae},borderLeft:{themeKey:"borders",transform:Ae},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Ae},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Xn},color:{themeKey:"palette",transform:$t},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:$t},backgroundColor:{themeKey:"palette",transform:$t},p:{style:he},pt:{style:he},pr:{style:he},pb:{style:he},pl:{style:he},px:{style:he},py:{style:he},padding:{style:he},paddingTop:{style:he},paddingRight:{style:he},paddingBottom:{style:he},paddingLeft:{style:he},paddingX:{style:he},paddingY:{style:he},paddingInline:{style:he},paddingInlineStart:{style:he},paddingInlineEnd:{style:he},paddingBlock:{style:he},paddingBlockStart:{style:he},paddingBlockEnd:{style:he},m:{style:me},mt:{style:me},mr:{style:me},mb:{style:me},ml:{style:me},mx:{style:me},my:{style:me},margin:{style:me},marginTop:{style:me},marginRight:{style:me},marginBottom:{style:me},marginLeft:{style:me},marginX:{style:me},marginY:{style:me},marginInline:{style:me},marginInlineStart:{style:me},marginInlineEnd:{style:me},marginBlock:{style:me},marginBlockStart:{style:me},marginBlockEnd:{style:me},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Yn},rowGap:{style:Zn},columnGap:{style:Jn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Me},maxWidth:{style:Gr},minWidth:{transform:Me},height:{transform:Me},maxHeight:{transform:Me},minHeight:{transform:Me},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Kr=Ju;function Zu(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Qu(e,t){return typeof e=="function"?e(t):e}function ed(){function e(n,r,o,i){const a={[n]:r,theme:o},l=i[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:u,transform:d,style:f}=l;if(r==null)return null;if(u==="typography"&&r==="inherit")return{[n]:r};const p=qn(o,u)||{};return f?f(a):Qe(a,r,v=>{let g=Bn(p,d,v);return v===g&&typeof v=="string"&&(g=Bn(p,d,`${n}${v==="default"?"":He(v)}`,v)),c===!1?g:{[c]:g}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const a=(r=i.unstable_sxConfig)!=null?r:Kr;function l(c){let u=c;if(typeof c=="function")u=c(i);else if(typeof c!="object")return c;if(!u)return null;const d=du(i.breakpoints),f=Object.keys(d);let p=d;return Object.keys(u).forEach(b=>{const v=Qu(u[b],i);if(v!=null)if(typeof v=="object")if(a[b])p=sn(p,e(b,v,i,a));else{const g=Qe({theme:i},v,m=>({[b]:m}));Zu(g,v)?p[b]=t({sx:v,theme:i}):p=sn(p,g)}else p=sn(p,e(b,v,i,a))}),pu(f,p)}return Array.isArray(o)?o.map(l):l(o)}return t}const us=ed();us.filterProps=["sx"];const Xr=us;function td(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const nd=["breakpoints","palette","spacing","shape"];function Yr(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,a=ue(e,nd),l=au(n),c=xu(o);let u=Ye({breakpoints:l,direction:"ltr",components:{},palette:k({mode:"light"},r),spacing:c,shape:k({},cu,i)},a);return u.applyStyles=td,u=t.reduce((d,f)=>Ye(d,f),u),u.unstable_sxConfig=k({},Kr,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(f){return Xr({sx:f,theme:this})},u}function rd(e){return Object.keys(e).length===0}function ds(e=null){const t=E.useContext(xr.ThemeContext);return!t||rd(t)?e:t}const od=Yr();function ps(e=od){return ds(e)}const id=["ownerState"],sd=["variants"],ad=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function ld(e){return Object.keys(e).length===0}function cd(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Nn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const ud=Yr(),Qo=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function On({defaultTheme:e,theme:t,themeId:n}){return ld(t)?e:t[n]||t}function dd(e){return e?(t,n)=>n[e]:null}function Rn(e,t){let{ownerState:n}=t,r=ue(t,id);const o=typeof e=="function"?e(k({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>Rn(i,k({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let l=ue(o,sd);return i.forEach(c=>{let u=!0;typeof c.props=="function"?u=c.props(k({ownerState:n},r,n)):Object.keys(c.props).forEach(d=>{(n==null?void 0:n[d])!==c.props[d]&&r[d]!==c.props[d]&&(u=!1)}),u&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(k({ownerState:n},r,n)):c.style))}),l}return o}function pd(e={}){const{themeId:t,defaultTheme:n=ud,rootShouldForwardProp:r=Nn,slotShouldForwardProp:o=Nn}=e,i=a=>Xr(k({},a,{theme:On(k({},a,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(a,l={})=>{xr.internal_processStyles(a,h=>h.filter(C=>!(C!=null&&C.__mui_systemSx)));const{name:c,slot:u,skipVariantsResolver:d,skipSx:f,overridesResolver:p=dd(Qo(u))}=l,b=ue(l,ad),v=d!==void 0?d:u&&u!=="Root"&&u!=="root"||!1,g=f||!1;let m;process.env.NODE_ENV!=="production"&&c&&(m=`${c}-${Qo(u||"Root")}`);let T=Nn;u==="Root"||u==="root"?T=r:u?T=o:cd(a)&&(T=void 0);const $=xr(a,k({shouldForwardProp:T,label:m},b)),x=h=>typeof h=="function"&&h.__emotion_real!==h||mt(h)?C=>Rn(h,k({},C,{theme:On({theme:C.theme,defaultTheme:n,themeId:t})})):h,w=(h,...C)=>{let P=x(h);const B=C?C.map(x):[];c&&p&&B.push(N=>{const j=On(k({},N,{defaultTheme:n,themeId:t}));if(!j.components||!j.components[c]||!j.components[c].styleOverrides)return null;const V=j.components[c].styleOverrides,F={};return Object.entries(V).forEach(([A,M])=>{F[A]=Rn(M,k({},N,{theme:j}))}),p(N,F)}),c&&!v&&B.push(N=>{var j;const V=On(k({},N,{defaultTheme:n,themeId:t})),F=V==null||(j=V.components)==null||(j=j[c])==null?void 0:j.variants;return Rn({variants:F},k({},N,{theme:V}))}),g||B.push(i);const D=B.length-C.length;if(Array.isArray(h)&&D>0){const N=new Array(D).fill("");P=[...h,...N],P.raw=[...h.raw,...N]}const S=$(P,...B);if(process.env.NODE_ENV!=="production"){let N;c&&(N=`${c}${He(u||"")}`),N===void 0&&(N=`Styled(${Ya(a)})`),S.displayName=N}return a.muiName&&(S.muiName=a.muiName),S};return $.withConfig&&(w.withConfig=$.withConfig),w}}function fd(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:Hi(t.components[n].defaultProps,r)}function md({props:e,name:t,defaultTheme:n,themeId:r}){let o=ps(n);return r&&(o=o[r]||o),fd({theme:o,name:t,props:e})}function Jr(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),yl(e,t,n)}function hd(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function wt(e){if(e.type)return e;if(e.charAt(0)==="#")return wt(hd(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Mt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Mt(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function Qn(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function gd(e){e=wt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),a=(u,d=(u+n/30)%12)=>o-i*Math.max(Math.min(d-3,9-d,1),-1);let l="rgb";const c=[Math.round(a(0)*255),Math.round(a(8)*255),Math.round(a(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),Qn({type:l,values:c})}function ei(e){e=wt(e);let t=e.type==="hsl"||e.type==="hsla"?wt(gd(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function ti(e,t){const n=ei(e),r=ei(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function Ln(e,t){return e=wt(e),t=Jr(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Qn(e)}function bd(e,t){if(e=wt(e),t=Jr(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return Qn(e)}function vd(e,t){if(e=wt(e),t=Jr(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return Qn(e)}function yd(e,t){return k({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const xd={black:"#000",white:"#fff"},dn=xd,wd={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Ed=wd,Td={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Tt=Td,kd={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},kt=kd,Od={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Kt=Od,Sd={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ot=Sd,Cd={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},St=Cd,Pd={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Ct=Pd,Nd=["mode","contrastThreshold","tonalOffset"],ni={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:dn.white,default:dn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},fr={text:{primary:dn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:dn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function ri(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=vd(e.main,o):t==="dark"&&(e.dark=bd(e.main,i)))}function Rd(e="light"){return e==="dark"?{main:Ot[200],light:Ot[50],dark:Ot[400]}:{main:Ot[700],light:Ot[400],dark:Ot[800]}}function $d(e="light"){return e==="dark"?{main:Tt[200],light:Tt[50],dark:Tt[400]}:{main:Tt[500],light:Tt[300],dark:Tt[700]}}function Md(e="light"){return e==="dark"?{main:kt[500],light:kt[300],dark:kt[700]}:{main:kt[700],light:kt[400],dark:kt[800]}}function Id(e="light"){return e==="dark"?{main:St[400],light:St[300],dark:St[700]}:{main:St[700],light:St[500],dark:St[900]}}function jd(e="light"){return e==="dark"?{main:Ct[400],light:Ct[300],dark:Ct[700]}:{main:Ct[800],light:Ct[500],dark:Ct[900]}}function _d(e="light"){return e==="dark"?{main:Kt[400],light:Kt[300],dark:Kt[700]}:{main:"#ed6c02",light:Kt[500],dark:Kt[900]}}function Ad(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=ue(e,Nd),i=e.primary||Rd(t),a=e.secondary||$d(t),l=e.error||Md(t),c=e.info||Id(t),u=e.success||jd(t),d=e.warning||_d(t);function f(g){const m=ti(g,fr.text.primary)>=n?fr.text.primary:ni.text.primary;if(process.env.NODE_ENV!=="production"){const T=ti(g,m);T<3&&console.error([`MUI: The contrast ratio of ${T}:1 for ${m} on ${g}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return m}const p=({color:g,name:m,mainShade:T=500,lightShade:$=300,darkShade:x=700})=>{if(g=k({},g),!g.main&&g[T]&&(g.main=g[T]),!g.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${m?` (${m})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${T}\` property.`:Mt(11,m?` (${m})`:"",T));if(typeof g.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${m?` (${m})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(g.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Mt(12,m?` (${m})`:"",JSON.stringify(g.main)));return ri(g,"light",$,r),ri(g,"dark",x,r),g.contrastText||(g.contrastText=f(g.main)),g},b={dark:fr,light:ni};return process.env.NODE_ENV!=="production"&&(b[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),Ye(k({common:k({},dn),mode:t,primary:p({color:i,name:"primary"}),secondary:p({color:a,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:p({color:l,name:"error"}),warning:p({color:d,name:"warning"}),info:p({color:c,name:"info"}),success:p({color:u,name:"success"}),grey:Ed,contrastThreshold:n,getContrastText:f,augmentColor:p,tonalOffset:r},b[t]),o)}const Dd=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Bd(e){return Math.round(e*1e5)/1e5}const oi={textTransform:"uppercase"},ii='"Roboto", "Helvetica", "Arial", sans-serif';function Ld(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=ii,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:a=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:u=16,allVariants:d,pxToRem:f}=n,p=ue(n,Dd);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const b=o/14,v=f||(T=>`${T/u*b}rem`),g=(T,$,x,w,h)=>k({fontFamily:r,fontWeight:T,fontSize:v($),lineHeight:x},r===ii?{letterSpacing:`${Bd(w/$)}em`}:{},h,d),m={h1:g(i,96,1.167,-1.5),h2:g(i,60,1.2,-.5),h3:g(a,48,1.167,0),h4:g(a,34,1.235,.25),h5:g(a,24,1.334,0),h6:g(l,20,1.6,.15),subtitle1:g(a,16,1.75,.15),subtitle2:g(l,14,1.57,.1),body1:g(a,16,1.5,.15),body2:g(a,14,1.43,.15),button:g(l,14,1.75,.4,oi),caption:g(a,12,1.66,.4),overline:g(a,12,2.66,1,oi),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return Ye(k({htmlFontSize:u,pxToRem:v,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:a,fontWeightMedium:l,fontWeightBold:c},m),p,{clone:!1})}const Fd=.2,Vd=.14,zd=.12;function fe(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Fd})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Vd})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${zd})`].join(",")}const Ud=["none",fe(0,2,1,-1,0,1,1,0,0,1,3,0),fe(0,3,1,-2,0,2,2,0,0,1,5,0),fe(0,3,3,-2,0,3,4,0,0,1,8,0),fe(0,2,4,-1,0,4,5,0,0,1,10,0),fe(0,3,5,-1,0,5,8,0,0,1,14,0),fe(0,3,5,-1,0,6,10,0,0,1,18,0),fe(0,4,5,-2,0,7,10,1,0,2,16,1),fe(0,5,5,-3,0,8,10,1,0,3,14,2),fe(0,5,6,-3,0,9,12,1,0,3,16,2),fe(0,6,6,-3,0,10,14,1,0,4,18,3),fe(0,6,7,-4,0,11,15,1,0,4,20,3),fe(0,7,8,-4,0,12,17,2,0,5,22,4),fe(0,7,8,-4,0,13,19,2,0,5,24,4),fe(0,7,9,-4,0,14,21,2,0,5,26,4),fe(0,8,9,-5,0,15,22,2,0,6,28,5),fe(0,8,10,-5,0,16,24,2,0,6,30,5),fe(0,8,11,-5,0,17,26,2,0,6,32,5),fe(0,9,11,-5,0,18,28,2,0,7,34,6),fe(0,9,12,-6,0,19,29,2,0,7,36,6),fe(0,10,13,-6,0,20,31,3,0,8,38,7),fe(0,10,13,-6,0,21,33,3,0,8,40,7),fe(0,10,14,-6,0,22,35,3,0,8,42,7),fe(0,11,14,-7,0,23,36,3,0,9,44,8),fe(0,11,15,-7,0,24,38,3,0,9,46,8)],Hd=Ud,qd=["duration","easing","delay"],Wd={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Gd={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function si(e){return`${Math.round(e)}ms`}function Kd(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Xd(e){const t=k({},Wd,e.easing),n=k({},Gd,e.duration);return k({getAutoHeightDuration:Kd,create:(o=["all"],i={})=>{const{duration:a=n.standard,easing:l=t.easeInOut,delay:c=0}=i,u=ue(i,qd);if(process.env.NODE_ENV!=="production"){const d=p=>typeof p=="string",f=p=>!isNaN(parseFloat(p));!d(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!f(a)&&!d(a)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`),d(l)||console.error('MUI: Argument "easing" must be a string.'),!f(c)&&!d(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(d=>`${d} ${typeof a=="string"?a:si(a)} ${l} ${typeof c=="string"?c:si(c)}`).join(",")}},e,{easing:t,duration:n})}const Yd={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Jd=Yd,Zd=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Qd(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,a=ue(e,Zd);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Mt(18));const l=Ad(r),c=Yr(e);let u=Ye(c,{mixins:yd(c.breakpoints,n),palette:l,shadows:Hd.slice(),typography:Ld(l,i),transitions:Xd(o),zIndex:k({},Jd)});if(u=Ye(u,a),u=t.reduce((d,f)=>Ye(d,f),u),process.env.NODE_ENV!=="production"){const d=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],f=(p,b)=>{let v;for(v in p){const g=p[v];if(d.indexOf(v)!==-1&&Object.keys(g).length>0){if(process.env.NODE_ENV!=="production"){const m=We("",v);console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${v}\` internal state.`,"You can not override it like this: ",JSON.stringify(p,null,2),"",`Instead, you need to use the '&.${m}' syntax:`,JSON.stringify({root:{[`&.${m}`]:g}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}p[v]={}}}};Object.keys(u.components).forEach(p=>{const b=u.components[p].styleOverrides;b&&p.indexOf("Mui")===0&&f(b,p)})}return u.unstable_sxConfig=k({},Kr,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(f){return Xr({sx:f,theme:this})},u}const ep=Qd(),Zr=ep,Qr="$$material",fs=e=>Nn(e)&&e!=="classes",tp=pd({themeId:Qr,defaultTheme:Zr,rootShouldForwardProp:fs}),Te=tp;function yn(){const e=ps(Zr);return process.env.NODE_ENV!=="production"&&E.useDebugValue(e),e[Qr]||e}function tt({props:e,name:t}){return md({props:e,name:t,defaultTheme:Zr,themeId:Qr})}function Pr(e,t){return Pr=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},Pr(e,t)}function np(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Pr(e,t)}const ai={disabled:!1};var rp=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.shape({enter:s.number,exit:s.number,appear:s.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&s.oneOfType([s.string,s.shape({enter:s.string,exit:s.string,active:s.string}),s.shape({enter:s.string,enterDone:s.string,enterActive:s.string,exit:s.string,exitDone:s.string,exitActive:s.string})]);const ms=G.createContext(null);var op=function(t){return t.scrollTop},en="unmounted",dt="exited",pt="entering",Rt="entered",Nr="exiting",nt=function(e){np(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var a=o,l=a&&!a.isMounting?r.enter:r.appear,c;return i.appearStatus=null,r.in?l?(c=dt,i.appearStatus=pt):c=Rt:r.unmountOnExit||r.mountOnEnter?c=en:c=dt,i.state={status:c},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var a=o.in;return a&&i.status===en?{status:dt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var a=this.state.status;this.props.in?a!==pt&&a!==Rt&&(i=pt):(a===pt||a===Rt)&&(i=Nr)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,a,l;return i=a=l=o,o!=null&&typeof o!="number"&&(i=o.exit,a=o.enter,l=o.appear!==void 0?o.appear:a),{exit:i,enter:a,appear:l}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===pt){if(this.props.unmountOnExit||this.props.mountOnEnter){var a=this.props.nodeRef?this.props.nodeRef.current:Jt.findDOMNode(this);a&&op(a)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===dt&&this.setState({status:en})},n.performEnter=function(o){var i=this,a=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[Jt.findDOMNode(this),l],u=c[0],d=c[1],f=this.getTimeouts(),p=l?f.appear:f.enter;if(!o&&!a||ai.disabled){this.safeSetState({status:Rt},function(){i.props.onEntered(u)});return}this.props.onEnter(u,d),this.safeSetState({status:pt},function(){i.props.onEntering(u,d),i.onTransitionEnd(p,function(){i.safeSetState({status:Rt},function(){i.props.onEntered(u,d)})})})},n.performExit=function(){var o=this,i=this.props.exit,a=this.getTimeouts(),l=this.props.nodeRef?void 0:Jt.findDOMNode(this);if(!i||ai.disabled){this.safeSetState({status:dt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:Nr},function(){o.props.onExiting(l),o.onTransitionEnd(a.exit,function(){o.safeSetState({status:dt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,a=!0;return this.nextCallback=function(l){a&&(a=!1,i.nextCallback=null,o(l))},this.nextCallback.cancel=function(){a=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var a=this.props.nodeRef?this.props.nodeRef.current:Jt.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!a||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[a,this.nextCallback],u=c[0],d=c[1];this.props.addEndListener(u,d)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===en)return null;var i=this.props,a=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var l=ue(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return G.createElement(ms.Provider,{value:null},typeof a=="function"?a(o,l):G.cloneElement(G.Children.only(a),l))},t}(G.Component);nt.contextType=ms;nt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:s.shape({current:typeof Element>"u"?s.any:function(e,t,n,r,o,i){var a=e[t];return s.instanceOf(a&&"ownerDocument"in a?a.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:s.oneOfType([s.func.isRequired,s.element.isRequired]).isRequired,in:s.bool,mountOnEnter:s.bool,unmountOnExit:s.bool,appear:s.bool,enter:s.bool,exit:s.bool,timeout:function(t){var n=rp;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:s.func,onEnter:s.func,onEntering:s.func,onEntered:s.func,onExit:s.func,onExiting:s.func,onExited:s.func}:{};function Pt(){}nt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Pt,onEntering:Pt,onEntered:Pt,onExit:Pt,onExiting:Pt,onExited:Pt};nt.UNMOUNTED=en;nt.EXITED=dt;nt.ENTERING=pt;nt.ENTERED=Rt;nt.EXITING=Nr;const hs=nt,gs=e=>e.scrollTop;function Fn(e,t){var n,r;const{timeout:o,easing:i,style:a={}}=e;return{duration:(n=a.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=a.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:a.transitionDelay}}const ip=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function Rr(e){return`scale(${e}, ${e**2})`}const sp={entering:{opacity:1,transform:Rr(1)},entered:{opacity:1,transform:"none"}},mr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),eo=E.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:a,in:l,onEnter:c,onEntered:u,onEntering:d,onExit:f,onExited:p,onExiting:b,style:v,timeout:g="auto",TransitionComponent:m=hs}=t,T=ue(t,ip),$=Zt(),x=E.useRef(),w=yn(),h=E.useRef(null),C=Be(h,i.ref,n),P=A=>M=>{if(A){const L=h.current;M===void 0?A(L):A(L,M)}},B=P(d),D=P((A,M)=>{gs(A);const{duration:L,delay:ee,easing:Q}=Fn({style:v,timeout:g,easing:a},{mode:"enter"});let O;g==="auto"?(O=w.transitions.getAutoHeightDuration(A.clientHeight),x.current=O):O=L,A.style.transition=[w.transitions.create("opacity",{duration:O,delay:ee}),w.transitions.create("transform",{duration:mr?O:O*.666,delay:ee,easing:Q})].join(","),c&&c(A,M)}),S=P(u),N=P(b),j=P(A=>{const{duration:M,delay:L,easing:ee}=Fn({style:v,timeout:g,easing:a},{mode:"exit"});let Q;g==="auto"?(Q=w.transitions.getAutoHeightDuration(A.clientHeight),x.current=Q):Q=M,A.style.transition=[w.transitions.create("opacity",{duration:Q,delay:L}),w.transitions.create("transform",{duration:mr?Q:Q*.666,delay:mr?L:L||Q*.333,easing:ee})].join(","),A.style.opacity=0,A.style.transform=Rr(.75),f&&f(A)}),V=P(p),F=A=>{g==="auto"&&$.start(x.current||0,A),r&&r(h.current,A)};return y.jsx(m,k({appear:o,in:l,nodeRef:h,onEnter:D,onEntered:S,onEntering:B,onExit:j,onExited:V,onExiting:N,addEndListener:F,timeout:g==="auto"?null:g},T,{children:(A,M)=>E.cloneElement(i,k({style:k({opacity:0,transform:Rr(.75),visibility:A==="exited"&&!l?"hidden":void 0},sp[A],v,i.props.style),ref:C},M))}))});process.env.NODE_ENV!=="production"&&(eo.propTypes={addEndListener:s.func,appear:s.bool,children:fn.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});eo.muiSupportAuto=!0;const $r=eo,ap=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},li=ap,lp=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],cp=Te(as,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),bs=E.forwardRef(function(t,n){var r;const o=ds(),i=tt({props:t,name:"MuiPopper"}),{anchorEl:a,component:l,components:c,componentsProps:u,container:d,disablePortal:f,keepMounted:p,modifiers:b,open:v,placement:g,popperOptions:m,popperRef:T,transition:$,slots:x,slotProps:w}=i,h=ue(i,lp),C=(r=x==null?void 0:x.root)!=null?r:c==null?void 0:c.Root,P=k({anchorEl:a,container:d,disablePortal:f,keepMounted:p,modifiers:b,open:v,placement:g,popperOptions:m,popperRef:T,transition:$},h);return y.jsx(cp,k({as:l,direction:o==null?void 0:o.direction,slots:{root:C},slotProps:w??u},P,{ref:n}))});process.env.NODE_ENV!=="production"&&(bs.propTypes={anchorEl:s.oneOfType([Je,s.object,s.func]),children:s.oneOfType([s.node,s.func]),component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Je,s.func]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:Br,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transition:s.bool});const vs=bs;function up(e){return We("MuiTooltip",e)}const dp=it("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),ot=dp,pp=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function fp(e){return Math.round(e*1e5)/1e5}const mp=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,a={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${He(i.split("-")[0])}`],arrow:["arrow"]};return et(a,up,t)},hp=Te(vs,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>k({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${ot.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${ot.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${ot.arrow}`]:k({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${ot.arrow}`]:k({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),gp=Te("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${He(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>k({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:Ln(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${fp(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${ot.popper}[data-popper-placement*="left"] &`]:k({transformOrigin:"right center"},t.isRtl?k({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):k({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${ot.popper}[data-popper-placement*="right"] &`]:k({transformOrigin:"left center"},t.isRtl?k({marginRight:"14px"},t.touch&&{marginRight:"24px"}):k({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${ot.popper}[data-popper-placement*="top"] &`]:k({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${ot.popper}[data-popper-placement*="bottom"] &`]:k({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),bp=Te("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:Ln(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Sn=!1;const ci=new mn;let Xt={x:0,y:0};function Cn(e,t){return n=>{t&&t(n),e(n)}}const ys=E.forwardRef(function(t,n){var r,o,i,a,l,c,u,d,f,p,b,v,g,m,T,$,x,w,h;const C=tt({props:t,name:"MuiTooltip"}),{arrow:P=!1,children:B,components:D={},componentsProps:S={},describeChild:N=!1,disableFocusListener:j=!1,disableHoverListener:V=!1,disableInteractive:F=!1,disableTouchListener:A=!1,enterDelay:M=100,enterNextDelay:L=0,enterTouchDelay:ee=700,followCursor:Q=!1,id:O,leaveDelay:_=0,leaveTouchDelay:U=1500,onClose:X,onOpen:z,open:H,placement:W="bottom",PopperComponent:K,PopperProps:q={},slotProps:Y={},slots:J={},title:re,TransitionComponent:I=$r,TransitionProps:Z}=C,R=ue(C,pp),oe=E.isValidElement(B)?B:y.jsx("span",{children:B}),ye=yn(),ke=ye.direction==="rtl",[ge,lt]=E.useState(),[Oe,Ge]=E.useState(null),Ne=E.useRef(!1),Ke=F||Q,xe=Zt(),Et=Zt(),ct=Zt(),Ft=Zt(),[xn,io]=Bi({controlled:H,default:!1,name:"Tooltip",state:"open"});let Xe=xn;if(process.env.NODE_ENV!=="production"){const{current:te}=E.useRef(H!==void 0);E.useEffect(()=>{ge&&ge.disabled&&!te&&re!==""&&ge.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[re,ge,te])}const er=Di(O),Vt=E.useRef(),wn=an(()=>{Vt.current!==void 0&&(document.body.style.WebkitUserSelect=Vt.current,Vt.current=void 0),Ft.clear()});E.useEffect(()=>wn,[wn]);const so=te=>{ci.clear(),Sn=!0,io(!0),z&&!Xe&&z(te)},En=an(te=>{ci.start(800+_,()=>{Sn=!1}),io(!1),X&&Xe&&X(te),xe.start(ye.transitions.duration.shortest,()=>{Ne.current=!1})}),tr=te=>{Ne.current&&te.type!=="touchstart"||(ge&&ge.removeAttribute("title"),Et.clear(),ct.clear(),M||Sn&&L?Et.start(Sn?L:M,()=>{so(te)}):so(te))},ao=te=>{Et.clear(),ct.start(_,()=>{En(te)})},{isFocusVisibleRef:lo,onBlur:Ds,onFocus:Bs,ref:Ls}=Li(),[,co]=E.useState(!1),uo=te=>{Ds(te),lo.current===!1&&(co(!1),ao(te))},po=te=>{ge||lt(te.currentTarget),Bs(te),lo.current===!0&&(co(!0),tr(te))},fo=te=>{Ne.current=!0;const Re=oe.props;Re.onTouchStart&&Re.onTouchStart(te)},mo=tr,ho=ao,Fs=te=>{fo(te),ct.clear(),xe.clear(),wn(),Vt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Ft.start(ee,()=>{document.body.style.WebkitUserSelect=Vt.current,tr(te)})},Vs=te=>{oe.props.onTouchEnd&&oe.props.onTouchEnd(te),wn(),ct.start(U,()=>{En(te)})};E.useEffect(()=>{if(!Xe)return;function te(Re){(Re.key==="Escape"||Re.key==="Esc")&&En(Re)}return document.addEventListener("keydown",te),()=>{document.removeEventListener("keydown",te)}},[En,Xe]);const zs=Be(oe.ref,Ls,lt,n);!re&&re!==0&&(Xe=!1);const nr=E.useRef(),Us=te=>{const Re=oe.props;Re.onMouseMove&&Re.onMouseMove(te),Xt={x:te.clientX,y:te.clientY},nr.current&&nr.current.update()},zt={},rr=typeof re=="string";N?(zt.title=!Xe&&rr&&!V?re:null,zt["aria-describedby"]=Xe?er:null):(zt["aria-label"]=rr?re:null,zt["aria-labelledby"]=Xe&&!rr?er:null);const _e=k({},zt,R,oe.props,{className:we(R.className,oe.props.className),onTouchStart:fo,ref:zs},Q?{onMouseMove:Us}:{});process.env.NODE_ENV!=="production"&&(_e["data-mui-internal-clone-element"]=!0,E.useEffect(()=>{ge&&!ge.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[ge]));const Ut={};A||(_e.onTouchStart=Fs,_e.onTouchEnd=Vs),V||(_e.onMouseOver=Cn(mo,_e.onMouseOver),_e.onMouseLeave=Cn(ho,_e.onMouseLeave),Ke||(Ut.onMouseOver=mo,Ut.onMouseLeave=ho)),j||(_e.onFocus=Cn(po,_e.onFocus),_e.onBlur=Cn(uo,_e.onBlur),Ke||(Ut.onFocus=po,Ut.onBlur=uo)),process.env.NODE_ENV!=="production"&&oe.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${oe.props.title}\` or the Tooltip component.`].join(`
`));const Hs=E.useMemo(()=>{var te;let Re=[{name:"arrow",enabled:!!Oe,options:{element:Oe,padding:4}}];return(te=q.popperOptions)!=null&&te.modifiers&&(Re=Re.concat(q.popperOptions.modifiers)),k({},q.popperOptions,{modifiers:Re})},[Oe,q]),Ht=k({},C,{isRtl:ke,arrow:P,disableInteractive:Ke,placement:W,PopperComponentProp:K,touch:Ne.current}),or=mp(Ht),go=(r=(o=J.popper)!=null?o:D.Popper)!=null?r:hp,bo=(i=(a=(l=J.transition)!=null?l:D.Transition)!=null?a:I)!=null?i:$r,vo=(c=(u=J.tooltip)!=null?u:D.Tooltip)!=null?c:gp,yo=(d=(f=J.arrow)!=null?f:D.Arrow)!=null?d:bp,qs=Qt(go,k({},q,(p=Y.popper)!=null?p:S.popper,{className:we(or.popper,q==null?void 0:q.className,(b=(v=Y.popper)!=null?v:S.popper)==null?void 0:b.className)}),Ht),Ws=Qt(bo,k({},Z,(g=Y.transition)!=null?g:S.transition),Ht),Gs=Qt(vo,k({},(m=Y.tooltip)!=null?m:S.tooltip,{className:we(or.tooltip,(T=($=Y.tooltip)!=null?$:S.tooltip)==null?void 0:T.className)}),Ht),Ks=Qt(yo,k({},(x=Y.arrow)!=null?x:S.arrow,{className:we(or.arrow,(w=(h=Y.arrow)!=null?h:S.arrow)==null?void 0:w.className)}),Ht);return y.jsxs(E.Fragment,{children:[E.cloneElement(oe,_e),y.jsx(go,k({as:K??vs,placement:W,anchorEl:Q?{getBoundingClientRect:()=>({top:Xt.y,left:Xt.x,right:Xt.x,bottom:Xt.y,width:0,height:0})}:ge,popperRef:nr,open:ge?Xe:!1,id:er,transition:!0},Ut,qs,{popperOptions:Hs,children:({TransitionProps:te})=>y.jsx(bo,k({timeout:ye.transitions.duration.shorter},te,Ws,{children:y.jsxs(vo,k({},Gs,{children:[re,P?y.jsx(yo,k({},Ks,{ref:Ge})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(ys.propTypes={arrow:s.bool,children:fn.isRequired,classes:s.object,className:s.string,components:s.shape({Arrow:s.elementType,Popper:s.elementType,Tooltip:s.elementType,Transition:s.elementType}),componentsProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),describeChild:s.bool,disableFocusListener:s.bool,disableHoverListener:s.bool,disableInteractive:s.bool,disableTouchListener:s.bool,enterDelay:s.number,enterNextDelay:s.number,enterTouchDelay:s.number,followCursor:s.bool,id:s.string,leaveDelay:s.number,leaveTouchDelay:s.number,onClose:s.func,onOpen:s.func,open:s.bool,placement:s.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:s.elementType,PopperProps:s.object,slotProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),slots:s.shape({arrow:s.elementType,popper:s.elementType,tooltip:s.elementType,transition:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),title:s.node,TransitionComponent:s.elementType,TransitionProps:s.object});const vp=ys;var to={},xs={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(xs);var yp=xs.exports,hr={};function xp(e){return We("MuiSvgIcon",e)}it("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const wp=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Ep=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${He(t)}`,`fontSize${He(n)}`]};return et(o,xp,r)},Tp=Te("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${He(n.color)}`],t[`fontSize${He(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,a,l,c,u,d,f,p,b,v;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(a=i.pxToRem)==null?void 0:a.call(i,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((u=e.typography)==null||(d=u.pxToRem)==null?void 0:d.call(u,35))||"2.1875rem"}[t.fontSize],color:(f=(p=(e.vars||e).palette)==null||(p=p[t.color])==null?void 0:p.main)!=null?f:{action:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.active,disabled:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.disabled,inherit:void 0}[t.color]}}),no=E.forwardRef(function(t,n){const r=tt({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:a="inherit",component:l="svg",fontSize:c="medium",htmlColor:u,inheritViewBox:d=!1,titleAccess:f,viewBox:p="0 0 24 24"}=r,b=ue(r,wp),v=E.isValidElement(o)&&o.type==="svg",g=k({},r,{color:a,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:d,viewBox:p,hasSvgAsChild:v}),m={};d||(m.viewBox=p);const T=Ep(g);return y.jsxs(Tp,k({as:l,className:we(T.root,i),focusable:"false",color:u,"aria-hidden":f?void 0:!0,role:f?"img":void 0,ref:n},m,b,v&&o.props,{ownerState:g,children:[v?o.props.children:o,f?y.jsx("title",{children:f}):null]}))});process.env.NODE_ENV!=="production"&&(no.propTypes={children:s.node,classes:s.object,className:s.string,color:s.oneOfType([s.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),s.string]),component:s.elementType,fontSize:s.oneOfType([s.oneOf(["inherit","large","medium","small"]),s.string]),htmlColor:s.string,inheritViewBox:s.bool,shapeRendering:s.string,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),titleAccess:s.string,viewBox:s.string});no.muiName="SvgIcon";const ui=no;function ws(e,t){function n(r,o){return y.jsx(ui,k({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=ui.muiName,E.memo(E.forwardRef(n))}const kp={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),qi.configure(e)}},Op=Object.freeze(Object.defineProperty({__proto__:null,capitalize:He,createChainedFunction:Tr,createSvgIcon:ws,debounce:Ai,deprecatedPropType:Za,isMuiElement:Qa,ownerDocument:Ee,ownerWindow:It,requirePropFactory:el,setRef:jn,unstable_ClassNameGenerator:kp,unstable_useEnhancedEffect:vt,unstable_useId:Di,unsupportedProp:rl,useControlled:Bi,useEventCallback:an,useForkRef:Be,useIsFocusVisible:Li},Symbol.toStringTag,{value:"Module"})),Sp=$a(Op);var di;function Cp(){return di||(di=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Sp}(hr)),hr}var Pp=yp;Object.defineProperty(to,"__esModule",{value:!0});var Es=to.default=void 0,Np=Pp(Cp()),Rp=y;Es=to.default=(0,Np.default)((0,Rp.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function pi(e,t,n){return e?y.jsx(pe.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:y.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function ro(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:a=void 0,hasAutoFocus:l=!1,className:c,isDisabled:u=!1,isDense:d=!0,isSubMenuParent:f=!1,hasDisabledGutters:p=!1,hasDivider:b=!1,focusVisibleClassName:v,id:g,children:m}=e,T=y.jsx(pe.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:u,dense:d,disableGutters:p,divider:b,focusVisibleClassName:v,onClick:t,id:g,children:n?y.jsxs(y.Fragment,{children:[pi(i,n,!0),y.jsx(pe.ListItemText,{primary:n,inset:!i&&o}),f?y.jsx(pe.ListItemIcon,{className:"papi-menu-icon-trailing",children:y.jsx(Es,{})}):pi(a,n,!1)]}):m});return r?y.jsx(vp,{title:r,placement:"right",children:y.jsx("div",{children:T})}):T}function Ts(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function $p(e){const[t,n]=G.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,a=u=>{n(u.currentTarget)},l=()=>{n(void 0)},c=()=>{let u=Ts(i).filter(d=>"menuItem"in d.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return u=u.filter(d=>"menuItem"in d.group&&d.group.menuItem===r.id),y.jsx(oo,{...e,includedGroups:u})};return y.jsxs(y.Fragment,{children:[y.jsx(ro,{onClick:a,...o,isSubMenuParent:!0}),y.jsx(pe.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Mp=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function oo(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:a}=G.useMemo(()=>{const d=o&&o.length>0?o:Ts(t).filter(v=>!("menuItem"in v.group)),f=Object.values(d).sort((v,g)=>(v.group.order||0)-(g.group.order||0)),p=[];f.forEach(v=>{Mp(v.id,t.items).forEach(g=>p.push({item:g,isLastItemInGroup:!1})),p.length>0&&(p[p.length-1].isLastItemInGroup=!0)}),p.length>0&&(p[p.length-1].isLastItemInGroup=!1);const b=p.some(v=>"iconPathBefore"in v.item&&v.item.iconPathBefore);return{items:p,allowForLeadingIcons:b}},[o,t]),l=({item:d,isLastItemInGroup:f})=>({className:"papi-menu-item",label:d.label,tooltip:d.tooltip,iconPathBefore:"iconPathBefore"in d?d.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in d?d.iconPathAfter:void 0,hasDivider:f,allowForLeadingIcons:a}),[c]=i;if(!c)return y.jsx("div",{});const u=c.item.group;return y.jsx("div",{role:"menu","aria-label":u,children:i.map((d,f)=>{const{item:p}=d,b=l(d);if("command"in p){const v=p.group+f;return y.jsx(ro,{onClick:g=>{n==null||n(g),r(p)},...b},v)}return y.jsx($p,{parentMenuItem:p,parentItemProps:b,...e},u+p.id)})},u)}function Ip(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([a,l])=>({id:a,group:l})).filter(a=>"column"in a.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(a=>"column"in a.group&&a.group.column===n)),y.jsx(oo,{...e,includedGroups:i})}function jp({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return y.jsxs(pe.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[y.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),y.jsx(pe.List,{id:n,dense:!0,className:i??"",children:y.jsx(Ip,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function ks({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=G.useMemo(()=>{const a=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,u=o[c];typeof u=="object"&&typeof u.order=="number"&&!Number.isNaN(u.order)?a.set(u.order,{id:c,metadata:u}):console.warn(`Property ${l} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(a.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return y.jsx(pe.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((a,l)=>y.jsx(jp,{commandHandler:e,menuDefinition:n,...a,className:t},l))})}const Os=E.createContext({});process.env.NODE_ENV!=="production"&&(Os.displayName="ListContext");const _p=Os;function Ap(e){return We("MuiList",e)}it("MuiList",["root","padding","dense","subheader"]);const Dp=["children","className","component","dense","disablePadding","subheader"],Bp=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return et({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},Ap,t)},Lp=Te("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>k({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Ss=E.forwardRef(function(t,n){const r=tt({props:t,name:"MuiList"}),{children:o,className:i,component:a="ul",dense:l=!1,disablePadding:c=!1,subheader:u}=r,d=ue(r,Dp),f=E.useMemo(()=>({dense:l}),[l]),p=k({},r,{component:a,dense:l,disablePadding:c}),b=Bp(p);return y.jsx(_p.Provider,{value:f,children:y.jsxs(Lp,k({as:a,className:we(b.root,i),ref:n,ownerState:p},d,{children:[u,o]}))})});process.env.NODE_ENV!=="production"&&(Ss.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,dense:s.bool,disablePadding:s.bool,subheader:s.node,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const Fp=Ss,Vp=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function gr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function fi(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function Cs(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function Yt(e,t,n,r,o,i){let a=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(a)return!1;a=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!Cs(l,i)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const Ps=E.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:a,className:l,disabledItemsFocusable:c=!1,disableListWrap:u=!1,onKeyDown:d,variant:f="selectedMenu"}=t,p=ue(t,Vp),b=E.useRef(null),v=E.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});vt(()=>{o&&b.current.focus()},[o]),E.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(x,w)=>{const h=!b.current.style.width;if(x.clientHeight<b.current.clientHeight&&h){const C=`${Fi(Ee(x))}px`;b.current.style[w.direction==="rtl"?"paddingLeft":"paddingRight"]=C,b.current.style.width=`calc(100% + ${C})`}return b.current}}),[]);const g=x=>{const w=b.current,h=x.key,C=Ee(w).activeElement;if(h==="ArrowDown")x.preventDefault(),Yt(w,C,u,c,gr);else if(h==="ArrowUp")x.preventDefault(),Yt(w,C,u,c,fi);else if(h==="Home")x.preventDefault(),Yt(w,null,u,c,gr);else if(h==="End")x.preventDefault(),Yt(w,null,u,c,fi);else if(h.length===1){const P=v.current,B=h.toLowerCase(),D=performance.now();P.keys.length>0&&(D-P.lastTime>500?(P.keys=[],P.repeating=!0,P.previousKeyMatched=!0):P.repeating&&B!==P.keys[0]&&(P.repeating=!1)),P.lastTime=D,P.keys.push(B);const S=C&&!P.repeating&&Cs(C,P);P.previousKeyMatched&&(S||Yt(w,C,!1,c,gr,P))?x.preventDefault():P.previousKeyMatched=!1}d&&d(x)},m=Be(b,n);let T=-1;E.Children.forEach(a,(x,w)=>{if(!E.isValidElement(x)){T===w&&(T+=1,T>=a.length&&(T=-1));return}process.env.NODE_ENV!=="production"&&In.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(f==="selectedMenu"&&x.props.selected||T===-1)&&(T=w),T===w&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(T+=1,T>=a.length&&(T=-1))});const $=E.Children.map(a,(x,w)=>{if(w===T){const h={};return i&&(h.autoFocus=!0),x.props.tabIndex===void 0&&f==="selectedMenu"&&(h.tabIndex=0),E.cloneElement(x,h)}return x});return y.jsx(Fp,k({role:"menu",ref:m,className:l,onKeyDown:g,tabIndex:o?0:-1},p,{children:$}))});process.env.NODE_ENV!=="production"&&(Ps.propTypes={autoFocus:s.bool,autoFocusItem:s.bool,children:s.node,className:s.string,disabledItemsFocusable:s.bool,disableListWrap:s.bool,onKeyDown:s.func,variant:s.oneOf(["menu","selectedMenu"])});const zp=Ps,Up=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Hp={entering:{opacity:1},entered:{opacity:1}},Ns=E.forwardRef(function(t,n){const r=yn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:a=!0,children:l,easing:c,in:u,onEnter:d,onEntered:f,onEntering:p,onExit:b,onExited:v,onExiting:g,style:m,timeout:T=o,TransitionComponent:$=hs}=t,x=ue(t,Up),w=E.useRef(null),h=Be(w,l.ref,n),C=F=>A=>{if(F){const M=w.current;A===void 0?F(M):F(M,A)}},P=C(p),B=C((F,A)=>{gs(F);const M=Fn({style:m,timeout:T,easing:c},{mode:"enter"});F.style.webkitTransition=r.transitions.create("opacity",M),F.style.transition=r.transitions.create("opacity",M),d&&d(F,A)}),D=C(f),S=C(g),N=C(F=>{const A=Fn({style:m,timeout:T,easing:c},{mode:"exit"});F.style.webkitTransition=r.transitions.create("opacity",A),F.style.transition=r.transitions.create("opacity",A),b&&b(F)}),j=C(v),V=F=>{i&&i(w.current,F)};return y.jsx($,k({appear:a,in:u,nodeRef:w,onEnter:B,onEntered:D,onEntering:P,onExit:N,onExited:j,onExiting:S,addEndListener:V,timeout:T},x,{children:(F,A)=>E.cloneElement(l,k({style:k({opacity:0,visibility:F==="exited"&&!u?"hidden":void 0},Hp[F],m,l.props.style),ref:h},A))}))});process.env.NODE_ENV!=="production"&&(Ns.propTypes={addEndListener:s.func,appear:s.bool,children:fn.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const qp=Ns;function Wp(e){return We("MuiBackdrop",e)}it("MuiBackdrop",["root","invisible"]);const Gp=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Kp=e=>{const{classes:t,invisible:n}=e;return et({root:["root",n&&"invisible"]},Wp,t)},Xp=Te("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>k({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),Rs=E.forwardRef(function(t,n){var r,o,i;const a=tt({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:u="div",components:d={},componentsProps:f={},invisible:p=!1,open:b,slotProps:v={},slots:g={},TransitionComponent:m=qp,transitionDuration:T}=a,$=ue(a,Gp),x=k({},a,{component:u,invisible:p}),w=Kp(x),h=(r=v.root)!=null?r:f.root;return y.jsx(m,k({in:b,timeout:T},$,{children:y.jsx(Xp,k({"aria-hidden":!0},h,{as:(o=(i=g.root)!=null?i:d.Root)!=null?o:u,className:we(w.root,c,h==null?void 0:h.className),ownerState:k({},x,h==null?void 0:h.ownerState),classes:w,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(Rs.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.object}),invisible:s.bool,open:s.bool.isRequired,slotProps:s.shape({root:s.object}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const Yp=Rs;function Jp(e){return We("MuiModal",e)}it("MuiModal",["root","hidden","backdrop"]);const Zp=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Qp=e=>{const{open:t,exited:n,classes:r}=e;return et({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},Jp,r)},ef=Te("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>k({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),tf=Te(Yp,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),$s=E.forwardRef(function(t,n){var r,o,i,a,l,c;const u=tt({name:"MuiModal",props:t}),{BackdropComponent:d=tf,BackdropProps:f,className:p,closeAfterTransition:b=!1,children:v,container:g,component:m,components:T={},componentsProps:$={},disableAutoFocus:x=!1,disableEnforceFocus:w=!1,disableEscapeKeyDown:h=!1,disablePortal:C=!1,disableRestoreFocus:P=!1,disableScrollLock:B=!1,hideBackdrop:D=!1,keepMounted:S=!1,onBackdropClick:N,open:j,slotProps:V,slots:F}=u,A=ue(u,Zp),M=k({},u,{closeAfterTransition:b,disableAutoFocus:x,disableEnforceFocus:w,disableEscapeKeyDown:h,disablePortal:C,disableRestoreFocus:P,disableScrollLock:B,hideBackdrop:D,keepMounted:S}),{getRootProps:L,getBackdropProps:ee,getTransitionProps:Q,portalRef:O,isTopModal:_,exited:U,hasTransition:X}=Hl(k({},M,{rootRef:n})),z=k({},M,{exited:U}),H=Qp(z),W={};if(v.props.tabIndex===void 0&&(W.tabIndex="-1"),X){const{onEnter:Z,onExited:R}=Q();W.onEnter=Z,W.onExited=R}const K=(r=(o=F==null?void 0:F.root)!=null?o:T.Root)!=null?r:ef,q=(i=(a=F==null?void 0:F.backdrop)!=null?a:T.Backdrop)!=null?i:d,Y=(l=V==null?void 0:V.root)!=null?l:$.root,J=(c=V==null?void 0:V.backdrop)!=null?c:$.backdrop,re=yt({elementType:K,externalSlotProps:Y,externalForwardedProps:A,getSlotProps:L,additionalProps:{ref:n,as:m},ownerState:z,className:we(p,Y==null?void 0:Y.className,H==null?void 0:H.root,!z.open&&z.exited&&(H==null?void 0:H.hidden))}),I=yt({elementType:q,externalSlotProps:J,additionalProps:f,getSlotProps:Z=>ee(k({},Z,{onClick:R=>{N&&N(R),Z!=null&&Z.onClick&&Z.onClick(R)}})),className:we(J==null?void 0:J.className,f==null?void 0:f.className,H==null?void 0:H.backdrop),ownerState:z});return!S&&!j&&(!X||U)?null:y.jsx(ln,{ref:O,container:g,disablePortal:C,children:y.jsxs(K,k({},re,{children:[!D&&d?y.jsx(q,k({},I)):null,y.jsx(_n,{disableEnforceFocus:w,disableAutoFocus:x,disableRestoreFocus:P,isEnabled:_,open:j,children:E.cloneElement(v,W)})]}))})});process.env.NODE_ENV!=="production"&&($s.propTypes={BackdropComponent:s.elementType,BackdropProps:s.object,children:fn.isRequired,classes:s.object,className:s.string,closeAfterTransition:s.bool,component:s.elementType,components:s.shape({Backdrop:s.elementType,Root:s.elementType}),componentsProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Je,s.func]),disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableEscapeKeyDown:s.bool,disablePortal:s.bool,disableRestoreFocus:s.bool,disableScrollLock:s.bool,hideBackdrop:s.bool,keepMounted:s.bool,onBackdropClick:s.func,onClose:s.func,onTransitionEnter:s.func,onTransitionExited:s.func,open:s.bool.isRequired,slotProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({backdrop:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const nf=$s;function rf(e){return We("MuiPaper",e)}it("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const of=["className","component","elevation","square","variant"],sf=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return et(i,rf,o)},af=Te("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return k({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&k({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${Ln("#fff",li(t.elevation))}, ${Ln("#fff",li(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Ms=E.forwardRef(function(t,n){const r=tt({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:a=1,square:l=!1,variant:c="elevation"}=r,u=ue(r,of),d=k({},r,{component:i,elevation:a,square:l,variant:c}),f=sf(d);return process.env.NODE_ENV!=="production"&&yn().shadows[a]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)),y.jsx(af,k({as:i,ownerState:d,className:we(f.root,o),ref:n},u))});process.env.NODE_ENV!=="production"&&(Ms.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,elevation:Lt(Ui,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:s.bool,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),variant:s.oneOfType([s.oneOf(["elevation","outlined"]),s.string])});const lf=Ms;function cf(e){return We("MuiPopover",e)}it("MuiPopover",["root","paper"]);const uf=["onEntering"],df=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],pf=["slotProps"];function mi(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function hi(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function gi(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function $n(e){return typeof e=="function"?e():e}const ff=e=>{const{classes:t}=e;return et({root:["root"],paper:["paper"]},cf,t)},mf=Te(nf,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Is=Te(lf,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),js=E.forwardRef(function(t,n){var r,o,i;const a=tt({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:u={vertical:"top",horizontal:"left"},anchorPosition:d,anchorReference:f="anchorEl",children:p,className:b,container:v,elevation:g=8,marginThreshold:m=16,open:T,PaperProps:$={},slots:x,slotProps:w,transformOrigin:h={vertical:"top",horizontal:"left"},TransitionComponent:C=$r,transitionDuration:P="auto",TransitionProps:{onEntering:B}={},disableScrollLock:D=!1}=a,S=ue(a.TransitionProps,uf),N=ue(a,df),j=(r=w==null?void 0:w.paper)!=null?r:$,V=E.useRef(),F=Be(V,j.ref),A=k({},a,{anchorOrigin:u,anchorReference:f,elevation:g,marginThreshold:m,externalPaperSlotProps:j,transformOrigin:h,TransitionComponent:C,transitionDuration:P,TransitionProps:S}),M=ff(A),L=E.useCallback(()=>{if(f==="anchorPosition")return process.env.NODE_ENV!=="production"&&(d||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),d;const Z=$n(c),R=Z&&Z.nodeType===1?Z:Ee(V.current).body,oe=R.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const ye=R.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ye.top===0&&ye.left===0&&ye.right===0&&ye.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:oe.top+mi(oe,u.vertical),left:oe.left+hi(oe,u.horizontal)}},[c,u.horizontal,u.vertical,d,f]),ee=E.useCallback(Z=>({vertical:mi(Z,h.vertical),horizontal:hi(Z,h.horizontal)}),[h.horizontal,h.vertical]),Q=E.useCallback(Z=>{const R={width:Z.offsetWidth,height:Z.offsetHeight},oe=ee(R);if(f==="none")return{top:null,left:null,transformOrigin:gi(oe)};const ye=L();let ke=ye.top-oe.vertical,ge=ye.left-oe.horizontal;const lt=ke+R.height,Oe=ge+R.width,Ge=It($n(c)),Ne=Ge.innerHeight-m,Ke=Ge.innerWidth-m;if(m!==null&&ke<m){const xe=ke-m;ke-=xe,oe.vertical+=xe}else if(m!==null&&lt>Ne){const xe=lt-Ne;ke-=xe,oe.vertical+=xe}if(process.env.NODE_ENV!=="production"&&R.height>Ne&&R.height&&Ne&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${R.height-Ne}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),m!==null&&ge<m){const xe=ge-m;ge-=xe,oe.horizontal+=xe}else if(Oe>Ke){const xe=Oe-Ke;ge-=xe,oe.horizontal+=xe}return{top:`${Math.round(ke)}px`,left:`${Math.round(ge)}px`,transformOrigin:gi(oe)}},[c,f,L,ee,m]),[O,_]=E.useState(T),U=E.useCallback(()=>{const Z=V.current;if(!Z)return;const R=Q(Z);R.top!==null&&(Z.style.top=R.top),R.left!==null&&(Z.style.left=R.left),Z.style.transformOrigin=R.transformOrigin,_(!0)},[Q]);E.useEffect(()=>(D&&window.addEventListener("scroll",U),()=>window.removeEventListener("scroll",U)),[c,D,U]);const X=(Z,R)=>{B&&B(Z,R),U()},z=()=>{_(!1)};E.useEffect(()=>{T&&U()}),E.useImperativeHandle(l,()=>T?{updatePosition:()=>{U()}}:null,[T,U]),E.useEffect(()=>{if(!T)return;const Z=Ai(()=>{U()}),R=It(c);return R.addEventListener("resize",Z),()=>{Z.clear(),R.removeEventListener("resize",Z)}},[c,T,U]);let H=P;P==="auto"&&!C.muiSupportAuto&&(H=void 0);const W=v||(c?Ee($n(c)).body:void 0),K=(o=x==null?void 0:x.root)!=null?o:mf,q=(i=x==null?void 0:x.paper)!=null?i:Is,Y=yt({elementType:q,externalSlotProps:k({},j,{style:O?j.style:k({},j.style,{opacity:0})}),additionalProps:{elevation:g,ref:F},ownerState:A,className:we(M.paper,j==null?void 0:j.className)}),J=yt({elementType:K,externalSlotProps:(w==null?void 0:w.root)||{},externalForwardedProps:N,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:W,open:T},ownerState:A,className:we(M.root,b)}),{slotProps:re}=J,I=ue(J,pf);return y.jsx(K,k({},I,!Gi(K)&&{slotProps:re,disableScrollLock:D},{children:y.jsx(C,k({appear:!0,in:T,onEntering:X,onExited:z,timeout:H},S,{children:y.jsx(q,k({},Y,{children:p}))}))}))});process.env.NODE_ENV!=="production"&&(js.propTypes={action:Br,anchorEl:Lt(s.oneOfType([Je,s.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=$n(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),anchorPosition:s.shape({left:s.number.isRequired,top:s.number.isRequired}),anchorReference:s.oneOf(["anchorEl","anchorPosition","none"]),children:s.node,classes:s.object,className:s.string,container:s.oneOfType([Je,s.func]),disableScrollLock:s.bool,elevation:Ui,marginThreshold:s.number,onClose:s.func,open:s.bool.isRequired,PaperProps:s.shape({component:Ha}),slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transformOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object});const hf=js;function gf(e){return We("MuiMenu",e)}it("MuiMenu",["root","paper","list"]);const bf=["onEntering"],vf=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],yf={vertical:"top",horizontal:"right"},xf={vertical:"top",horizontal:"left"},wf=e=>{const{classes:t}=e;return et({root:["root"],paper:["paper"],list:["list"]},gf,t)},Ef=Te(hf,{shouldForwardProp:e=>fs(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Tf=Te(Is,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),kf=Te(zp,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),_s=E.forwardRef(function(t,n){var r,o;const i=tt({props:t,name:"MuiMenu"}),{autoFocus:a=!0,children:l,className:c,disableAutoFocusItem:u=!1,MenuListProps:d={},onClose:f,open:p,PaperProps:b={},PopoverClasses:v,transitionDuration:g="auto",TransitionProps:{onEntering:m}={},variant:T="selectedMenu",slots:$={},slotProps:x={}}=i,w=ue(i.TransitionProps,bf),h=ue(i,vf),C=yn(),P=C.direction==="rtl",B=k({},i,{autoFocus:a,disableAutoFocusItem:u,MenuListProps:d,onEntering:m,PaperProps:b,transitionDuration:g,TransitionProps:w,variant:T}),D=wf(B),S=a&&!u&&p,N=E.useRef(null),j=(Q,O)=>{N.current&&N.current.adjustStyleForScrollbar(Q,C),m&&m(Q,O)},V=Q=>{Q.key==="Tab"&&(Q.preventDefault(),f&&f(Q,"tabKeyDown"))};let F=-1;E.Children.map(l,(Q,O)=>{E.isValidElement(Q)&&(process.env.NODE_ENV!=="production"&&In.isFragment(Q)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Q.props.disabled||(T==="selectedMenu"&&Q.props.selected||F===-1)&&(F=O))});const A=(r=$.paper)!=null?r:Tf,M=(o=x.paper)!=null?o:b,L=yt({elementType:$.root,externalSlotProps:x.root,ownerState:B,className:[D.root,c]}),ee=yt({elementType:A,externalSlotProps:M,ownerState:B,className:D.paper});return y.jsx(Ef,k({onClose:f,anchorOrigin:{vertical:"bottom",horizontal:P?"right":"left"},transformOrigin:P?yf:xf,slots:{paper:A,root:$.root},slotProps:{root:L,paper:ee},open:p,ref:n,transitionDuration:g,TransitionProps:k({onEntering:j},w),ownerState:B},h,{classes:v,children:y.jsx(kf,k({onKeyDown:V,actions:N,autoFocus:a&&(F===-1||u),autoFocusItem:S,variant:T},d,{className:we(D.list,d.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(_s.propTypes={anchorEl:s.oneOfType([Je,s.func]),autoFocus:s.bool,children:s.node,classes:s.object,className:s.string,disableAutoFocusItem:s.bool,MenuListProps:s.object,onClose:s.func,open:s.bool.isRequired,PaperProps:s.object,PopoverClasses:s.object,slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object,variant:s.oneOf(["menu","selectedMenu"])});const Of=_s;function Sf({className:e,commandHandler:t,menuDefinition:n,children:r}){var u;const[o,i]=G.useState(void 0),a=G.useCallback(d=>{d.preventDefault(),i(o===void 0?{mouseX:d.clientX+2,mouseY:d.clientY-6}:void 0)},[o]),l=G.useCallback(()=>{i(void 0)},[]),c=G.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((u=n==null?void 0:n.items)==null?void 0:u.length)??0)===0||!r?r:y.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:a,children:[r,y.jsx(Of,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:y.jsx(oo,{menuDefinition:n,commandHandler:t,onClick:l})})]})}const Cf=ws(y.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Pf(e){return{preserveValue:!0,...e}}const Vn=(e,t,n={})=>{const r=G.useRef(t);r.current=t;const o=G.useRef(n);o.current=Pf(o.current);const[i,a]=G.useState(()=>r.current),[l,c]=G.useState(!0);return G.useEffect(()=>{let u=!0;return c(!!e),(async()=>{if(e){const d=await e();u&&(a(()=>d),c(!1))}})(),()=>{u=!1,o.current.preserveValue||a(()=>r.current)}},[e]),[i,l]};function As({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:i,ariaLabelPrefix:a,children:l}){const[c,u]=G.useState(!1),[d,f]=G.useState(!1),p=G.useCallback(()=>{c&&u(!1),f(!1)},[c]),b=G.useCallback(w=>{w.stopPropagation(),u(h=>{const C=!h;return C&&w.shiftKey?f(!0):C||f(!1),C})},[]),v=G.useCallback(w=>(p(),r(w)),[r,p]),[g,m]=G.useState({top:1,left:1});G.useEffect(()=>{if(c){const w=o==null?void 0:o.current;if(w){const h=w.getBoundingClientRect(),C=window.scrollY,P=window.scrollX,B=h.top+C+w.clientHeight,D=h.left+P;m({top:B,left:D})}}},[c,o]);const[T]=Vn(G.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[$]=Vn(G.useCallback(async()=>(e==null?void 0:e(!0))??n??T,[e,n,T,c]),n??T),x=d&&$?$:T;return y.jsxs(y.Fragment,{children:[y.jsx(pe.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${i??""}`,color:"inherit","aria-label":`${a??""} menu button`,onClick:b,children:l??y.jsx(Cf,{})}),y.jsx(pe.Drawer,{className:`papi-menu-drawer ${i??""}`,anchor:"left",variant:"temporary",open:c,onClose:p,PaperProps:{className:"papi-menu-drawer-paper",style:{top:g.top,left:g.left}},children:x?y.jsx(ks,{className:i,id:`${a??""} main menu`,commandHandler:v,multiColumnMenu:x}):void 0})]})}function Nf({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:a="medium",className:l,onClick:c,children:u}){return y.jsx(pe.IconButton,{id:e,disabled:n,edge:i,size:a,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:u})}function pn({variant:e="outlined",id:t,isDisabled:n=!1,hasError:r=!1,isFullWidth:o=!1,helperText:i,label:a,placeholder:l,isRequired:c=!1,className:u,defaultValue:d,value:f,onChange:p,onFocus:b,onBlur:v}){return y.jsx(pe.TextField,{variant:e,id:t,disabled:n,error:r,fullWidth:o,helperText:i,label:a,placeholder:l,required:c,className:`papi-textfield ${u??""}`,defaultValue:d,value:f,onChange:p,onFocus:b,onBlur:v})}let br;const vr=()=>(br||(br=de.allBookIds.map(e=>({bookId:e,label:de.bookIdToEnglishName(e)}))),br);function Rf({scrRef:e,handleSubmit:t,id:n}){const r=c=>{t(c)},o=(c,u)=>{const f={bookNum:de.bookIdToNumber(u.bookId),chapterNum:1,verseNum:1};r(f)},i=c=>{t({...e,chapterNum:+c.target.value})},a=c=>{t({...e,verseNum:+c.target.value})},l=G.useMemo(()=>vr()[e.bookNum-1],[e.bookNum]);return y.jsxs("span",{id:n,children:[y.jsx(Mn,{title:"Book",className:"papi-ref-selector book",value:l,options:vr(),onChange:o,isClearable:!1,width:200}),y.jsx(ut,{onClick:()=>r(ze.offsetBook(e,-1)),isDisabled:e.bookNum<=ze.FIRST_SCR_BOOK_NUM,children:"<"}),y.jsx(ut,{onClick:()=>r(ze.offsetBook(e,1)),isDisabled:e.bookNum>=vr().length,children:">"}),y.jsx(pn,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),y.jsx(ut,{onClick:()=>t(ze.offsetChapter(e,-1)),isDisabled:e.chapterNum<=ze.FIRST_SCR_CHAPTER_NUM,children:"<"}),y.jsx(ut,{onClick:()=>t(ze.offsetChapter(e,1)),isDisabled:e.chapterNum>=ze.getChaptersForBook(e.bookNum),children:">"}),y.jsx(pn,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:a}),y.jsx(ut,{onClick:()=>t(ze.offsetVerse(e,-1)),isDisabled:e.verseNum<=ze.FIRST_SCR_VERSE_NUM,children:"<"}),y.jsx(ut,{onClick:()=>t(ze.offsetVerse(e,1)),children:">"})]})}function $f({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=G.useState(""),i=a=>{o(a),e(a)};return y.jsx(pe.Paper,{component:"form",className:"search-bar-paper",children:y.jsx(pn,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:a=>i(a.target.value)})})}function Mf({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:a=!1,defaultValue:l,value:c,valueLabelDisplay:u="off",className:d,onChange:f,onChangeCommitted:p}){return y.jsx(pe.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:a,defaultValue:l,value:c,valueLabelDisplay:u,className:`papi-slider ${n} ${d??""}`,onChange:f,onChangeCommitted:p})}function If({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:a,children:l}){const c={action:(a==null?void 0:a.action)||l,message:a==null?void 0:a.message,className:r};return y.jsx(pe.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:c})}function jf({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return y.jsx(pe.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function bi({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return y.jsx(pn,{defaultValue:t[n.key],onChange:r})}const _f=({onChange:e,disabled:t,checked:n,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return y.jsx(Pi,{...r,isChecked:n,isDisabled:t,onChange:o})};function Af({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:a,defaultColumnSortable:l=!0,defaultColumnResizable:c=!0,rows:u,enableSelectColumn:d,selectColumnWidth:f=50,rowKeyGetter:p,rowHeight:b=35,headerRowHeight:v=35,selectedRows:g,onSelectedRowsChange:m,onRowsChange:T,onCellClick:$,onCellDoubleClick:x,onCellContextMenu:w,onCellKeyDown:h,direction:C="ltr",enableVirtualization:P=!0,onCopy:B,onPaste:D,onScroll:S,className:N,"data-testid":j}){const V=G.useMemo(()=>{const F=e.map(A=>typeof A.editable=="function"?{...A,editable:L=>!!A.editable(L),renderEditCell:A.renderEditCell||bi}:A.editable&&!A.renderEditCell?{...A,renderEditCell:bi}:A.renderEditCell&&!A.editable?{...A,editable:!1}:A);return d?[{...xo.SelectColumn,minWidth:f},...F]:F},[e,d,f]);return y.jsx(xo,{columns:V,defaultColumnOptions:{width:o,minWidth:i,maxWidth:a,sortable:l,resizable:c},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:u,rowKeyGetter:p,rowHeight:b,headerRowHeight:v,selectedRows:g,onSelectedRowsChange:m,onRowsChange:T,onCellClick:$,onCellDoubleClick:x,onCellContextMenu:w,onCellKeyDown:h,direction:C,enableVirtualization:P,onCopy:B,onPaste:D,onScroll:S,renderers:{renderCheckbox:_f},className:`papi-table ${N??"rdg-light"}`,"data-testid":j})}function Df({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const i=G.useRef(void 0);return y.jsx("div",{ref:i,style:{position:"relative"},children:y.jsx(pe.AppBar,{position:"static",id:r,children:y.jsxs(pe.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?y.jsx(As,{commandHandler:t,containerRef:i,menuProvider:e}):void 0,o?y.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Bf=(e,t)=>{G.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},yr=()=>!1,Lf=(e,t)=>{const[n]=Vn(G.useCallback(async()=>{if(!e)return yr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),yr,{preserveValue:!1});G.useEffect(()=>()=>{n!==yr&&n()},[n])};exports.BookChapterControl=Pa;exports.Button=ut;exports.ChapterRangeSelector=Na;exports.Checkbox=Pi;exports.ComboBox=Mn;exports.ContextMenu=Sf;exports.GridMenu=ks;exports.HamburgerMenuButton=As;exports.IconButton=Nf;exports.LabelPosition=ft;exports.MenuItem=ro;exports.RefSelector=Rf;exports.SearchBar=$f;exports.Slider=Mf;exports.Snackbar=If;exports.Switch=jf;exports.Table=Af;exports.TextField=pn;exports.Toolbar=Df;exports.useEvent=Bf;exports.useEventAsync=Lf;exports.usePromise=Vn;function Ff(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Ff(`.papi-button {
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
}
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
