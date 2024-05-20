"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const y=require("react/jsx-runtime"),W=require("react"),ze=require("platform-bible-utils"),ea=require("@radix-ui/react-dropdown-menu"),mt=require("lucide-react"),Ee=require("clsx"),ta=require("tailwind-merge"),na=require("@radix-ui/react-slot"),xi=require("class-variance-authority"),fe=require("@mui/material"),wr=require("@mui/styled-engine"),Jt=require("react-dom"),ra=require("@radix-ui/react-label"),wo=require("react-data-grid");function zn(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const E=zn(W),be=zn(ea),oa=zn(Jt),wi=zn(ra);var ia=Object.defineProperty,sa=(e,t,n)=>t in e?ia(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ne=(e,t,n)=>(sa(e,typeof t!="symbol"?t+"":t,n),n);const bt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Ir=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Ei=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Eo=ga();function Bt(e,t=!0){return t&&(e=e.toUpperCase()),e in Eo?Eo[e]:0}function jr(e){return Bt(e)>0}function aa(e){const t=typeof e=="string"?Bt(e):e;return t>=40&&t<=66}function la(e){return(typeof e=="string"?Bt(e):e)<=39}function Ti(e){return e<=66}function ca(e){const t=typeof e=="string"?Bt(e):e;return Si(t)&&!Ti(t)}function*ua(){for(let e=1;e<=bt.length;e++)yield e}const pa=1,ki=bt.length;function da(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function _r(e,t="***"){const n=e-1;return n<0||n>=bt.length?t:bt[n]}function Oi(e){return e<=0||e>ki?"******":Ei[e-1]}function fa(e){return Oi(Bt(e))}function Si(e){const t=typeof e=="number"?_r(e):e;return jr(t)&&!Ir.includes(t)}function ha(e){const t=typeof e=="number"?_r(e):e;return jr(t)&&Ir.includes(t)}function ma(e){return Ei[e-1].includes("*obsolete*")}function ga(){const e={};for(let t=0;t<bt.length;t++)e[bt[t]]=t+1;return e}const ue={allBookIds:bt,nonCanonicalIds:Ir,bookIdToNumber:Bt,isBookIdValid:jr,isBookNT:aa,isBookOT:la,isBookOTNT:Ti,isBookDC:ca,allBookNumbers:ua,firstBook:pa,lastBook:ki,extraBooks:da,bookNumberToId:_r,bookNumberToEnglishName:Oi,bookIdToEnglishName:fa,isCanonical:Si,isExtraMaterial:ha,isObsolete:ma};var rt=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(rt||{});const Me=class{constructor(t){if(ne(this,"name"),ne(this,"fullPath"),ne(this,"isPresent"),ne(this,"hasVerseSegments"),ne(this,"isCustomized"),ne(this,"baseVersification"),ne(this,"scriptureBooks"),ne(this,"_type"),t!=null)typeof t=="string"?this.name=t:this._type=t;else throw new Error("Argument null")}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ne(Me,"Original",new Me(rt.Original)),ne(Me,"Septuagint",new Me(rt.Septuagint)),ne(Me,"Vulgate",new Me(rt.Vulgate)),ne(Me,"English",new Me(rt.English)),ne(Me,"RussianProtestant",new Me(rt.RussianProtestant)),ne(Me,"RussianOrthodox",new Me(rt.RussianOrthodox));let Nt=Me;function To(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var Ci=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Ci||{});const Ce=class ie{constructor(t,n,r,o){if(ne(this,"firstChapter"),ne(this,"lastChapter"),ne(this,"lastVerse"),ne(this,"hasSegmentsDefined"),ne(this,"text"),ne(this,"BBBCCCVVVS"),ne(this,"longHashCode"),ne(this,"versification"),ne(this,"rtlMark","‏"),ne(this,"_bookNum",0),ne(this,"_chapterNum",0),ne(this,"_verseNum",0),ne(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,a=n!=null&&n instanceof Nt?n:void 0;this.setEmpty(a),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof Nt?n:void 0;this.setEmpty(i),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ie){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof Nt?t:ie.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(t,n=ie.defaultVersification){const r=new ie(n);return r.parse(t),r}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=ie.parse(t),{success:!0,verseRef:n}}catch(r){if(r instanceof qt)return n=new ie,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ie.bcvMaxValue*ie.bookDigitShifter+(n>=0?n%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(r>=0?r%ie.bcvMaxValue:0)}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>ie.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return ue.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=ue.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ie.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>ue.lastBook)throw new qt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Nt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const a=+i[1].trim();this.versification=new Nt(rt[a])}catch{throw new qt("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new qt("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||ue.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(r[1]))throw new qt("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification):!1}allVerses(t=!1,n=ie.verseRangeSeparators,r=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=To(this._verse,r);for(const a of i.map(l=>To(l,n))){const l=this.clone();l.verse=a[0];const c=l.verseNum;if(o.push(l),a.length>1){const u=this.clone();if(u.verse=a[1],!t)for(let p=c+1;p<u.verseNum;p++){const f=new ie(this._bookNum,this._chapterNum,p,this.versification);this.isExcluded||o.push(f)}o.push(u)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const a=o.BBBCCCVVV;if(r>a)return 3;if(r===a)return 4;r=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ue.lastBook?2:(ue.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=ue.bookIdToNumber(t),this.chapter=n,this.verse=r}};ne(Ce,"defaultVersification",Nt.English),ne(Ce,"verseRangeSeparator","-"),ne(Ce,"verseSequenceIndicator",","),ne(Ce,"verseRangeSeparators",[Ce.verseRangeSeparator]),ne(Ce,"verseSequenceIndicators",[Ce.verseSequenceIndicator]),ne(Ce,"chapterDigitShifter",1e3),ne(Ce,"bookDigitShifter",Ce.chapterDigitShifter*Ce.chapterDigitShifter),ne(Ce,"bcvMaxValue",Ce.chapterDigitShifter-1),ne(Ce,"ValidStatusType",Ci);class qt extends Error{}function xe(...e){return ta.twMerge(Ee.clsx(e))}const ba=be.Root,va=be.Trigger,ya=E.forwardRef(({className:e,inset:t,children:n,...r},o)=>y.jsxs(be.SubTrigger,{ref:o,className:xe("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,y.jsx(mt.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));ya.displayName=be.SubTrigger.displayName;const xa=E.forwardRef(({className:e,...t},n)=>y.jsx(be.SubContent,{ref:n,className:xe("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));xa.displayName=be.SubContent.displayName;const Pi=E.forwardRef(({className:e,sideOffset:t=4,...n},r)=>y.jsx(be.Portal,{children:y.jsx(be.Content,{ref:r,sideOffset:t,className:xe("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));Pi.displayName=be.Content.displayName;const Ni=E.forwardRef(({className:e,inset:t,...n},r)=>y.jsx(be.Item,{ref:r,className:xe("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));Ni.displayName=be.Item.displayName;const wa=E.forwardRef(({className:e,children:t,checked:n,...r},o)=>y.jsxs(be.CheckboxItem,{ref:o,className:xe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[y.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:y.jsx(be.ItemIndicator,{children:y.jsx(mt.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));wa.displayName=be.CheckboxItem.displayName;const Ea=E.forwardRef(({className:e,children:t,...n},r)=>y.jsxs(be.RadioItem,{ref:r,className:xe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[y.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:y.jsx(be.ItemIndicator,{children:y.jsx(mt.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));Ea.displayName=be.RadioItem.displayName;const Ar=E.forwardRef(({className:e,inset:t,...n},r)=>y.jsx(be.Label,{ref:r,className:xe("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));Ar.displayName=be.Label.displayName;const Ri=E.forwardRef(({className:e,...t},n)=>y.jsx(be.Separator,{ref:n,className:xe("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Ri.displayName=be.Separator.displayName;const Dr=E.forwardRef(({className:e,type:t,...n},r)=>y.jsx("input",{type:t,className:xe("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));Dr.displayName="Input";const Ta=W.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},i)=>y.jsxs("div",{className:"pr-relative",children:[y.jsx(Dr,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:a=>e(a.target.value),onKeyDown:a=>{a.key==="Enter"&&r(),t(a)},onClick:n,ref:i}),y.jsx(mt.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function ka({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const i=Array.from({length:t},(l,c)=>c+1),a=W.useCallback(l=>{o(l)},[o]);return y.jsx("div",{className:xe("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:i.map(l=>y.jsx("div",{className:xe("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===n,"pr-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>a(l),children:l},l))})}const Oa=W.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:i,children:a},l)=>y.jsxs(Ni,{ref:l,textValue:e,className:xe("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[y.jsx("span",{className:xe("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":i.toLowerCase()==="ot","pr-border-l-purple-200":i.toLowerCase()==="nt","pr-border-l-indigo-200":i.toLowerCase()==="dc"}),children:ue.bookIdToEnglishName(e)}),n&&y.jsx("div",{children:a})]},e));function Sa({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return y.jsxs(Ar,{className:"pr-flex pr-justify-between",children:[y.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),y.jsxs("div",{className:"pr-flex pr-items-center",children:[y.jsx(mt.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),y.jsx(mt.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),y.jsx(mt.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const tn=ue.allBookIds,Ca={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ko=["OT","NT","DC"],Pa=32+32+32,Na=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Ra=e=>({OT:tn.filter(n=>ue.isBookOT(n)),NT:tn.filter(n=>ue.isBookNT(n)),DC:tn.filter(n=>ue.isBookDC(n))})[e],Wt=e=>ze.getChaptersForBook(ue.bookIdToNumber(e));function $a(){return tn.map(t=>ue.bookIdToEnglishName(t))}function Ma(e){return $a().includes(e)}function Ia(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(Ma(t))return tn.find(r=>ue.bookIdToEnglishName(r)===t)}function ja({scrRef:e,handleSubmit:t}){const[n,r]=W.useState(""),[o,i]=W.useState(ue.bookNumberToId(e.bookNum)),[a,l]=W.useState(e.chapterNum??0),[c,u]=W.useState(ue.bookNumberToId(e.bookNum)),[p,f]=W.useState(!1),[d,b]=W.useState(p),v=W.useRef(void 0),g=W.useRef(void 0),h=W.useRef(void 0),T=W.useCallback(C=>Ra(C).filter($=>{const R=ue.bookIdToEnglishName($).toLowerCase(),D=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return R.includes(D)||$.toLowerCase().includes(D)}),[n]),I=C=>{r(C)},x=W.useRef(!1),w=W.useCallback(C=>{if(x.current){x.current=!1;return}f(C)},[]),m=W.useCallback((C,$,R,D)=>{if(l(ue.bookNumberToId(e.bookNum)!==C?1:e.chapterNum),$||Wt(C)===-1){t({bookNum:ue.bookIdToNumber(C),chapterNum:R||1,verseNum:D||1}),f(!1),r("");return}i(o!==C?C:""),f(!$)},[t,e.bookNum,e.chapterNum,o]),S=C=>{C<=0||C>Wt(o)||m(o,!0,C)},P=W.useCallback(()=>{Na.forEach(C=>{const $=n.match(C);if($){const[R,D=void 0,A=void 0]=$.slice(1),M=Ia(R);(ue.isBookIdValid(R)||M)&&m(M??R,!0,D?parseInt(D,10):1,A?parseInt(A,10):1)}})},[m,n]),L=W.useCallback(C=>{p?(C.key==="ArrowDown"||C.key==="ArrowUp")&&(typeof h<"u"&&h.current!==null?h.current.focus():typeof g<"u"&&g.current!==null&&g.current.focus(),C.preventDefault()):f(!0)},[p]),B=C=>{const{key:$}=C;$==="ArrowRight"||$==="ArrowLeft"||$==="ArrowDown"||$==="ArrowUp"||$==="Enter"||(v.current.dispatchEvent(new KeyboardEvent("keydown",{key:$})),v.current.focus())},F=C=>{const{key:$}=C;if(c===o){if($==="Enter"){C.preventDefault(),m(o,!0,a);return}let R=0;if($==="ArrowRight")if(a<Wt(c))R=1;else{C.preventDefault();return}else if($==="ArrowLeft")if(a>1)R=-1;else{C.preventDefault();return}else $==="ArrowDown"?R=6:$==="ArrowUp"&&(R=-6);a+R<=0||a+R>Wt(c)?l(0):R!==0&&(l(a+R),C.preventDefault())}};return W.useEffect(()=>{o===c?o===ue.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),W.useLayoutEffect(()=>{b(p)},[p]),W.useLayoutEffect(()=>{const C=setTimeout(()=>{if(d&&g.current&&h.current){const R=h.current.offsetTop-Pa;g.current.scrollTo({top:R,behavior:"instant"})}},10);return()=>{clearTimeout(C)}},[d]),y.jsx("div",{children:y.jsxs(ba,{modal:!1,open:p,onOpenChange:w,children:[y.jsx(va,{asChild:!0,children:y.jsx(Ta,{ref:v,value:n,handleSearch:I,handleKeyDown:L,handleOnClick:()=>{i(ue.bookNumberToId(e.bookNum)),u(ue.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),f(!0),v.current.focus()},onFocus:()=>{x.current=!0},handleSubmit:P,placeholder:`${ue.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),y.jsxs(Pi,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:B,align:"start",ref:g,children:[y.jsx(Sa,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),ko.map((C,$)=>T(C).length>0&&y.jsxs("div",{children:[y.jsx(Ar,{className:"pr-font-semibold pr-text-slate-700",children:Ca[C]}),T(C).map(R=>y.jsx("div",{children:y.jsx(Oa,{bookId:R,handleSelectBook:()=>m(R,!1),isSelected:o===R,handleHighlightBook:()=>u(R),handleKeyDown:F,bookType:C,ref:D=>{o===R&&(h.current=D)},children:y.jsx(ka,{handleSelectChapter:S,endChapter:Wt(R),activeChapter:e.bookNum===ue.bookIdToNumber(R)?e.chapterNum:0,highlightedChapter:a,handleHighlightedChapter:D=>{l(D)}})})},R)),ko.length-1!==$?y.jsx(Ri,{}):void 0]},C))]})]})})}const _a=xi.cva("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),$i=E.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},i)=>{const a=r?na.Slot:"button";return y.jsx(a,{className:xe(_a({variant:t,size:n,className:e})),ref:i,...o})});$i.displayName="Button";function ut({id:e,isDisabled:t=!1,className:n,onClick:r,onContextMenu:o,children:i}){return y.jsx($i,{id:e,disabled:t,className:xe("papi-button",n),onClick:r,onContextMenu:o,children:i})}function Mn({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:a,options:l=[],className:c,value:u,onChange:p,onFocus:f,onBlur:d,getOptionLabel:b}){return y.jsx(fe.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:i,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:u,onChange:p,onFocus:f,onBlur:d,getOptionLabel:b,renderInput:v=>y.jsx(fe.TextField,{...v,error:o,fullWidth:i,disabled:n,label:t,style:{width:a}})})}function Aa({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o,chapterCount:i}){const a=W.useMemo(()=>Array.from({length:i},(u,p)=>p+1),[i]),l=(u,p)=>{n(p),p>t&&r(p)},c=(u,p)=>{r(p),p<e&&n(p)};return y.jsxs(y.Fragment,{children:[y.jsx(fe.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:y.jsx(Mn,{onChange:(u,p)=>l(u,p),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),y.jsx(fe.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:y.jsx(Mn,{onChange:(u,p)=>c(u,p),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:t,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var ft=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(ft||{});function Mi({id:e,isChecked:t,labelText:n="",labelPosition:r=ft.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:a=!1,hasError:l=!1,className:c,onChange:u}){const p=y.jsx(fe.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:a,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:u});let f;if(n){const d=r===ft.Before||r===ft.Above,b=y.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),v=r===ft.Before||r===ft.After,g=v?b:y.jsx("div",{children:b}),h=v?p:y.jsx("div",{children:p});f=y.jsxs(fe.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:a,error:l,children:[d&&g,h,!d&&g]})}else f=p;return f}function pe(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},k.apply(this,arguments)}function Da(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Ba(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Er={exports:{}},Tn={exports:{}},se={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Oo;function La(){if(Oo)return se;Oo=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,p=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,T=e?Symbol.for("react.responder"):60118,I=e?Symbol.for("react.scope"):60119;function x(m){if(typeof m=="object"&&m!==null){var S=m.$$typeof;switch(S){case t:switch(m=m.type,m){case c:case u:case r:case i:case o:case f:return m;default:switch(m=m&&m.$$typeof,m){case l:case p:case v:case b:case a:return m;default:return S}}case n:return S}}}function w(m){return x(m)===u}return se.AsyncMode=c,se.ConcurrentMode=u,se.ContextConsumer=l,se.ContextProvider=a,se.Element=t,se.ForwardRef=p,se.Fragment=r,se.Lazy=v,se.Memo=b,se.Portal=n,se.Profiler=i,se.StrictMode=o,se.Suspense=f,se.isAsyncMode=function(m){return w(m)||x(m)===c},se.isConcurrentMode=w,se.isContextConsumer=function(m){return x(m)===l},se.isContextProvider=function(m){return x(m)===a},se.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===t},se.isForwardRef=function(m){return x(m)===p},se.isFragment=function(m){return x(m)===r},se.isLazy=function(m){return x(m)===v},se.isMemo=function(m){return x(m)===b},se.isPortal=function(m){return x(m)===n},se.isProfiler=function(m){return x(m)===i},se.isStrictMode=function(m){return x(m)===o},se.isSuspense=function(m){return x(m)===f},se.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===r||m===u||m===i||m===o||m===f||m===d||typeof m=="object"&&m!==null&&(m.$$typeof===v||m.$$typeof===b||m.$$typeof===a||m.$$typeof===l||m.$$typeof===p||m.$$typeof===h||m.$$typeof===T||m.$$typeof===I||m.$$typeof===g)},se.typeOf=x,se}var ae={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var So;function Fa(){return So||(So=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,p=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,T=e?Symbol.for("react.responder"):60118,I=e?Symbol.for("react.scope"):60119;function x(j){return typeof j=="string"||typeof j=="function"||j===r||j===u||j===i||j===o||j===f||j===d||typeof j=="object"&&j!==null&&(j.$$typeof===v||j.$$typeof===b||j.$$typeof===a||j.$$typeof===l||j.$$typeof===p||j.$$typeof===h||j.$$typeof===T||j.$$typeof===I||j.$$typeof===g)}function w(j){if(typeof j=="object"&&j!==null){var Z=j.$$typeof;switch(Z){case t:var N=j.type;switch(N){case c:case u:case r:case i:case o:case f:return N;default:var oe=N&&N.$$typeof;switch(oe){case l:case p:case v:case b:case a:return oe;default:return Z}}case n:return Z}}}var m=c,S=u,P=l,L=a,B=t,F=p,C=r,$=v,R=b,D=n,A=i,M=o,V=f,ee=!1;function Q(j){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),O(j)||w(j)===c}function O(j){return w(j)===u}function _(j){return w(j)===l}function U(j){return w(j)===a}function X(j){return typeof j=="object"&&j!==null&&j.$$typeof===t}function z(j){return w(j)===p}function H(j){return w(j)===r}function G(j){return w(j)===v}function K(j){return w(j)===b}function q(j){return w(j)===n}function Y(j){return w(j)===i}function J(j){return w(j)===o}function re(j){return w(j)===f}ae.AsyncMode=m,ae.ConcurrentMode=S,ae.ContextConsumer=P,ae.ContextProvider=L,ae.Element=B,ae.ForwardRef=F,ae.Fragment=C,ae.Lazy=$,ae.Memo=R,ae.Portal=D,ae.Profiler=A,ae.StrictMode=M,ae.Suspense=V,ae.isAsyncMode=Q,ae.isConcurrentMode=O,ae.isContextConsumer=_,ae.isContextProvider=U,ae.isElement=X,ae.isForwardRef=z,ae.isFragment=H,ae.isLazy=G,ae.isMemo=K,ae.isPortal=q,ae.isProfiler=Y,ae.isStrictMode=J,ae.isSuspense=re,ae.isValidElementType=x,ae.typeOf=w}()),ae}var Co;function Ii(){return Co||(Co=1,process.env.NODE_ENV==="production"?Tn.exports=La():Tn.exports=Fa()),Tn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var sr,Po;function Va(){if(Po)return sr;Po=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var a={},l=0;l<10;l++)a["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(a).map(function(p){return a[p]});if(c.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(p){u[p]=p}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return sr=o()?Object.assign:function(i,a){for(var l,c=r(i),u,p=1;p<arguments.length;p++){l=Object(arguments[p]);for(var f in l)t.call(l,f)&&(c[f]=l[f]);if(e){u=e(l);for(var d=0;d<u.length;d++)n.call(l,u[d])&&(c[u[d]]=l[u[d]])}}return c},sr}var ar,No;function Br(){if(No)return ar;No=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return ar=e,ar}var lr,Ro;function ji(){return Ro||(Ro=1,lr=Function.call.bind(Object.prototype.hasOwnProperty)),lr}var cr,$o;function za(){if($o)return cr;$o=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Br(),n={},r=ji();e=function(i){var a="Warning: "+i;typeof console<"u"&&console.error(a);try{throw new Error(a)}catch{}}}function o(i,a,l,c,u){if(process.env.NODE_ENV!=="production"){for(var p in i)if(r(i,p)){var f;try{if(typeof i[p]!="function"){var d=Error((c||"React class")+": "+l+" type `"+p+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[p]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw d.name="Invariant Violation",d}f=i[p](a,p,c,l,null,t)}catch(v){f=v}if(f&&!(f instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+p+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in n)){n[f.message]=!0;var b=u?u():"";e("Failed "+l+" type: "+f.message+(b??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},cr=o,cr}var ur,Mo;function Ua(){if(Mo)return ur;Mo=1;var e=Ii(),t=Va(),n=Br(),r=ji(),o=za(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function a(){return null}return ur=function(l,c){var u=typeof Symbol=="function"&&Symbol.iterator,p="@@iterator";function f(O){var _=O&&(u&&O[u]||O[p]);if(typeof _=="function")return _}var d="<<anonymous>>",b={array:T("array"),bigint:T("bigint"),bool:T("boolean"),func:T("function"),number:T("number"),object:T("object"),string:T("string"),symbol:T("symbol"),any:I(),arrayOf:x,element:w(),elementType:m(),instanceOf:S,node:F(),objectOf:L,oneOf:P,oneOfType:B,shape:$,exact:R};function v(O,_){return O===_?O!==0||1/O===1/_:O!==O&&_!==_}function g(O,_){this.message=O,this.data=_&&typeof _=="object"?_:{},this.stack=""}g.prototype=Error.prototype;function h(O){if(process.env.NODE_ENV!=="production")var _={},U=0;function X(H,G,K,q,Y,J,re){if(q=q||d,J=J||K,re!==n){if(c){var j=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw j.name="Invariant Violation",j}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var Z=q+":"+K;!_[Z]&&U<3&&(i("You are manually calling a React.PropTypes validation function for the `"+J+"` prop on `"+q+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),_[Z]=!0,U++)}}return G[K]==null?H?G[K]===null?new g("The "+Y+" `"+J+"` is marked as required "+("in `"+q+"`, but its value is `null`.")):new g("The "+Y+" `"+J+"` is marked as required in "+("`"+q+"`, but its value is `undefined`.")):null:O(G,K,q,Y,J)}var z=X.bind(null,!1);return z.isRequired=X.bind(null,!0),z}function T(O){function _(U,X,z,H,G,K){var q=U[X],Y=M(q);if(Y!==O){var J=V(q);return new g("Invalid "+H+" `"+G+"` of type "+("`"+J+"` supplied to `"+z+"`, expected ")+("`"+O+"`."),{expectedType:O})}return null}return h(_)}function I(){return h(a)}function x(O){function _(U,X,z,H,G){if(typeof O!="function")return new g("Property `"+G+"` of component `"+z+"` has invalid PropType notation inside arrayOf.");var K=U[X];if(!Array.isArray(K)){var q=M(K);return new g("Invalid "+H+" `"+G+"` of type "+("`"+q+"` supplied to `"+z+"`, expected an array."))}for(var Y=0;Y<K.length;Y++){var J=O(K,Y,z,H,G+"["+Y+"]",n);if(J instanceof Error)return J}return null}return h(_)}function w(){function O(_,U,X,z,H){var G=_[U];if(!l(G)){var K=M(G);return new g("Invalid "+z+" `"+H+"` of type "+("`"+K+"` supplied to `"+X+"`, expected a single ReactElement."))}return null}return h(O)}function m(){function O(_,U,X,z,H){var G=_[U];if(!e.isValidElementType(G)){var K=M(G);return new g("Invalid "+z+" `"+H+"` of type "+("`"+K+"` supplied to `"+X+"`, expected a single ReactElement type."))}return null}return h(O)}function S(O){function _(U,X,z,H,G){if(!(U[X]instanceof O)){var K=O.name||d,q=Q(U[X]);return new g("Invalid "+H+" `"+G+"` of type "+("`"+q+"` supplied to `"+z+"`, expected ")+("instance of `"+K+"`."))}return null}return h(_)}function P(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),a;function _(U,X,z,H,G){for(var K=U[X],q=0;q<O.length;q++)if(v(K,O[q]))return null;var Y=JSON.stringify(O,function(re,j){var Z=V(j);return Z==="symbol"?String(j):j});return new g("Invalid "+H+" `"+G+"` of value `"+String(K)+"` "+("supplied to `"+z+"`, expected one of "+Y+"."))}return h(_)}function L(O){function _(U,X,z,H,G){if(typeof O!="function")return new g("Property `"+G+"` of component `"+z+"` has invalid PropType notation inside objectOf.");var K=U[X],q=M(K);if(q!=="object")return new g("Invalid "+H+" `"+G+"` of type "+("`"+q+"` supplied to `"+z+"`, expected an object."));for(var Y in K)if(r(K,Y)){var J=O(K,Y,z,H,G+"."+Y,n);if(J instanceof Error)return J}return null}return h(_)}function B(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),a;for(var _=0;_<O.length;_++){var U=O[_];if(typeof U!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ee(U)+" at index "+_+"."),a}function X(z,H,G,K,q){for(var Y=[],J=0;J<O.length;J++){var re=O[J],j=re(z,H,G,K,q,n);if(j==null)return null;j.data&&r(j.data,"expectedType")&&Y.push(j.data.expectedType)}var Z=Y.length>0?", expected one of type ["+Y.join(", ")+"]":"";return new g("Invalid "+K+" `"+q+"` supplied to "+("`"+G+"`"+Z+"."))}return h(X)}function F(){function O(_,U,X,z,H){return D(_[U])?null:new g("Invalid "+z+" `"+H+"` supplied to "+("`"+X+"`, expected a ReactNode."))}return h(O)}function C(O,_,U,X,z){return new g((O||"React class")+": "+_+" type `"+U+"."+X+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+z+"`.")}function $(O){function _(U,X,z,H,G){var K=U[X],q=M(K);if(q!=="object")return new g("Invalid "+H+" `"+G+"` of type `"+q+"` "+("supplied to `"+z+"`, expected `object`."));for(var Y in O){var J=O[Y];if(typeof J!="function")return C(z,H,G,Y,V(J));var re=J(K,Y,z,H,G+"."+Y,n);if(re)return re}return null}return h(_)}function R(O){function _(U,X,z,H,G){var K=U[X],q=M(K);if(q!=="object")return new g("Invalid "+H+" `"+G+"` of type `"+q+"` "+("supplied to `"+z+"`, expected `object`."));var Y=t({},U[X],O);for(var J in Y){var re=O[J];if(r(O,J)&&typeof re!="function")return C(z,H,G,J,V(re));if(!re)return new g("Invalid "+H+" `"+G+"` key `"+J+"` supplied to `"+z+"`.\nBad object: "+JSON.stringify(U[X],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(O),null,"  "));var j=re(K,J,z,H,G+"."+J,n);if(j)return j}return null}return h(_)}function D(O){switch(typeof O){case"number":case"string":case"undefined":return!0;case"boolean":return!O;case"object":if(Array.isArray(O))return O.every(D);if(O===null||l(O))return!0;var _=f(O);if(_){var U=_.call(O),X;if(_!==O.entries){for(;!(X=U.next()).done;)if(!D(X.value))return!1}else for(;!(X=U.next()).done;){var z=X.value;if(z&&!D(z[1]))return!1}}else return!1;return!0;default:return!1}}function A(O,_){return O==="symbol"?!0:_?_["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&_ instanceof Symbol:!1}function M(O){var _=typeof O;return Array.isArray(O)?"array":O instanceof RegExp?"object":A(_,O)?"symbol":_}function V(O){if(typeof O>"u"||O===null)return""+O;var _=M(O);if(_==="object"){if(O instanceof Date)return"date";if(O instanceof RegExp)return"regexp"}return _}function ee(O){var _=V(O);switch(_){case"array":case"object":return"an "+_;case"boolean":case"date":case"regexp":return"a "+_;default:return _}}function Q(O){return!O.constructor||!O.constructor.name?d:O.constructor.name}return b.checkPropTypes=o,b.resetWarningCache=o.resetWarningCache,b.PropTypes=b,b},ur}var pr,Io;function Ha(){if(Io)return pr;Io=1;var e=Br();function t(){}function n(){}return n.resetWarningCache=t,pr=function(){function r(a,l,c,u,p,f){if(f!==e){var d=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw d.name="Invariant Violation",d}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},pr}if(process.env.NODE_ENV!=="production"){var qa=Ii(),Wa=!0;Er.exports=Ua()(qa.isElement,Wa)}else Er.exports=Ha()();var Ga=Er.exports;const s=Da(Ga);function Lt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function ht(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function _i(e){if(!ht(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=_i(e[n])}),t}function Ye(e,t,n={clone:!0}){const r=n.clone?k({},e):e;return ht(e)&&ht(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(ht(t[o])&&o in e&&ht(e[o])?r[o]=Ye(e[o],t[o],n):n.clone?r[o]=ht(t[o])?_i(t[o]):t[o]:r[o]=t[o])}),r}function Ka(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ai(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let l;const c=i.type;return typeof c=="function"&&!Ka(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Di=Lt(s.element,Ai);Di.isRequired=Lt(s.element.isRequired,Ai);const fn=Di;function Xa(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ya(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let l;return typeof i=="function"&&!Xa(i)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ja=Lt(s.elementType,Ya),Za="exact-prop: ​";function Bi(e){return process.env.NODE_ENV==="production"?e:k({},e,{[Za]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Mt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Tr={exports:{}},le={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jo;function Qa(){if(jo)return le;jo=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),p=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),v;v=Symbol.for("react.module.reference");function g(h){if(typeof h=="object"&&h!==null){var T=h.$$typeof;switch(T){case e:switch(h=h.type,h){case n:case o:case r:case u:case p:return h;default:switch(h=h&&h.$$typeof,h){case l:case a:case c:case d:case f:case i:return h;default:return T}}case t:return T}}}return le.ContextConsumer=a,le.ContextProvider=i,le.Element=e,le.ForwardRef=c,le.Fragment=n,le.Lazy=d,le.Memo=f,le.Portal=t,le.Profiler=o,le.StrictMode=r,le.Suspense=u,le.SuspenseList=p,le.isAsyncMode=function(){return!1},le.isConcurrentMode=function(){return!1},le.isContextConsumer=function(h){return g(h)===a},le.isContextProvider=function(h){return g(h)===i},le.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===e},le.isForwardRef=function(h){return g(h)===c},le.isFragment=function(h){return g(h)===n},le.isLazy=function(h){return g(h)===d},le.isMemo=function(h){return g(h)===f},le.isPortal=function(h){return g(h)===t},le.isProfiler=function(h){return g(h)===o},le.isStrictMode=function(h){return g(h)===r},le.isSuspense=function(h){return g(h)===u},le.isSuspenseList=function(h){return g(h)===p},le.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===n||h===o||h===r||h===u||h===p||h===b||typeof h=="object"&&h!==null&&(h.$$typeof===d||h.$$typeof===f||h.$$typeof===i||h.$$typeof===a||h.$$typeof===c||h.$$typeof===v||h.getModuleId!==void 0)},le.typeOf=g,le}var ce={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _o;function el(){return _o||(_o=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),p=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),v=!1,g=!1,h=!1,T=!1,I=!1,x;x=Symbol.for("react.module.reference");function w(N){return!!(typeof N=="string"||typeof N=="function"||N===n||N===o||I||N===r||N===u||N===p||T||N===b||v||g||h||typeof N=="object"&&N!==null&&(N.$$typeof===d||N.$$typeof===f||N.$$typeof===i||N.$$typeof===a||N.$$typeof===c||N.$$typeof===x||N.getModuleId!==void 0))}function m(N){if(typeof N=="object"&&N!==null){var oe=N.$$typeof;switch(oe){case e:var ye=N.type;switch(ye){case n:case o:case r:case u:case p:return ye;default:var Oe=ye&&ye.$$typeof;switch(Oe){case l:case a:case c:case d:case f:case i:return Oe;default:return oe}}case t:return oe}}}var S=a,P=i,L=e,B=c,F=n,C=d,$=f,R=t,D=o,A=r,M=u,V=p,ee=!1,Q=!1;function O(N){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function _(N){return Q||(Q=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function U(N){return m(N)===a}function X(N){return m(N)===i}function z(N){return typeof N=="object"&&N!==null&&N.$$typeof===e}function H(N){return m(N)===c}function G(N){return m(N)===n}function K(N){return m(N)===d}function q(N){return m(N)===f}function Y(N){return m(N)===t}function J(N){return m(N)===o}function re(N){return m(N)===r}function j(N){return m(N)===u}function Z(N){return m(N)===p}ce.ContextConsumer=S,ce.ContextProvider=P,ce.Element=L,ce.ForwardRef=B,ce.Fragment=F,ce.Lazy=C,ce.Memo=$,ce.Portal=R,ce.Profiler=D,ce.StrictMode=A,ce.Suspense=M,ce.SuspenseList=V,ce.isAsyncMode=O,ce.isConcurrentMode=_,ce.isContextConsumer=U,ce.isContextProvider=X,ce.isElement=z,ce.isForwardRef=H,ce.isFragment=G,ce.isLazy=K,ce.isMemo=q,ce.isPortal=Y,ce.isProfiler=J,ce.isStrictMode=re,ce.isSuspense=j,ce.isSuspenseList=Z,ce.isValidElementType=w,ce.typeOf=m}()),ce}process.env.NODE_ENV==="production"?Tr.exports=Qa():Tr.exports=el();var In=Tr.exports;const tl=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function nl(e){const t=`${e}`.match(tl);return t&&t[1]||""}function Li(e,t=""){return e.displayName||e.name||nl(e)||t}function Ao(e,t,n){const r=Li(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function rl(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Li(e,"Component");if(typeof e=="object")switch(e.$$typeof){case In.ForwardRef:return Ao(e,e.render,"ForwardRef");case In.Memo:return Ao(e,e.type,"memo");default:return}}}function Je(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],a=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const ol=s.oneOfType([s.func,s.object]),Lr=ol;function He(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Mt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function kr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Fi(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function il(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,a)=>{const l=o||"<<anonymous>>",c=a||r;return typeof n[r]<"u"?new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function sl(e,t){var n,r;return E.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Te(e){return e&&e.ownerDocument||document}function It(e){return Te(e).defaultView||window}function al(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?k({},t.propTypes):null;return o=>(i,a,l,c,u,...p)=>{const f=u||a,d=n==null?void 0:n[f];if(d){const b=d(i,a,l,c,u,...p);if(b)return b}return typeof i[a]<"u"&&!i[o]?new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function jn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const ll=typeof window<"u"?E.useLayoutEffect:E.useEffect,vt=ll;let Do=0;function cl(e){const[t,n]=E.useState(e),r=e||t;return E.useEffect(()=>{t==null&&(Do+=1,n(`mui-${Do}`))},[t]),r}const Bo=E["useId".toString()];function Vi(e){if(Bo!==void 0){const t=Bo();return e??t}return cl(e)}function ul(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function zi({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=E.useRef(e!==void 0),[i,a]=E.useState(t),l=o?e:i;if(process.env.NODE_ENV!=="production"){E.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:u}=E.useRef(t);E.useEffect(()=>{!o&&u!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=E.useCallback(u=>{o||a(u)},[]);return[l,c]}function an(e){const t=E.useRef(e);return vt(()=>{t.current=e}),E.useRef((...n)=>(0,t.current)(...n)).current}function Be(...e){return E.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{jn(n,t)})},e)}const Lo={};function pl(e,t){const n=E.useRef(Lo);return n.current===Lo&&(n.current=e(t)),n}const dl=[];function fl(e){E.useEffect(e,dl)}class hn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new hn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function Zt(){const e=pl(hn.create).current;return fl(e.disposeEffect),e}let Un=!0,Or=!1;const hl=new hn,ml={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function gl(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&ml[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function bl(e){e.metaKey||e.altKey||e.ctrlKey||(Un=!0)}function dr(){Un=!1}function vl(){this.visibilityState==="hidden"&&Or&&(Un=!0)}function yl(e){e.addEventListener("keydown",bl,!0),e.addEventListener("mousedown",dr,!0),e.addEventListener("pointerdown",dr,!0),e.addEventListener("touchstart",dr,!0),e.addEventListener("visibilitychange",vl,!0)}function xl(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Un||gl(t)}function Ui(){const e=E.useCallback(o=>{o!=null&&yl(o.ownerDocument)},[]),t=E.useRef(!1);function n(){return t.current?(Or=!0,hl.start(100,()=>{Or=!1}),t.current=!1,!0):!1}function r(o){return xl(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Hi(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function wl(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function El(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Tl=Number.isInteger||El;function qi(e,t,n,r){const o=e[t];if(o==null||!Tl(o)){const i=wl(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function Wi(e,t,...n){return e[t]===void 0?null:qi(e,t,...n)}function Sr(){return null}Wi.isRequired=qi;Sr.isRequired=Sr;const Gi=process.env.NODE_ENV==="production"?Sr:Wi;function Ki(e,t){const n=k({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=k({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=k({},i),Object.keys(o).forEach(a=>{n[r][a]=Ki(o[a],i[a])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function et(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,a)=>{if(a){const l=t(a);l!==""&&i.push(l),n&&n[a]&&i.push(n[a])}return i},[]).join(" ")}),r}const Fo=e=>e,kl=()=>{let e=Fo;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Fo}}},Ol=kl(),Xi=Ol,Yi={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function We(e,t,n="Mui"){const r=Yi[t];return r?`${n}-${r}`:`${Xi.generate(e)}-${t}`}function it(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=We(e,o,n)}),r}function Sl(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Ji(e){return typeof e=="string"}function Qt(e,t,n){return e===void 0||Ji(e)?t:k({},t,{ownerState:k({},t.ownerState,n)})}const Cl={disableDefaultClasses:!1},Pl=E.createContext(Cl);function Nl(e){const{disableDefaultClasses:t}=E.useContext(Pl);return n=>t?"":e(n)}function Zi(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function Rl(e,t,n){return typeof e=="function"?e(t,n):e}function Vo(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function $l(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const b=Ee(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),v=k({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),g=k({},n,o,r);return b.length>0&&(g.className=b),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:void 0}}const a=Zi(k({},o,r)),l=Vo(r),c=Vo(o),u=t(a),p=Ee(u==null?void 0:u.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),f=k({},u==null?void 0:u.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),d=k({},u,n,c,l);return p.length>0&&(d.className=p),Object.keys(f).length>0&&(d.style=f),{props:d,internalRef:u.ref}}const Ml=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function yt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,a=pe(e,Ml),l=i?{}:Rl(r,o),{props:c,internalRef:u}=$l(k({},a,{externalSlotProps:l})),p=Be(u,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return Qt(n,k({},c,{ref:p}),o)}const Qi="base";function Il(e){return`${Qi}--${e}`}function jl(e,t){return`${Qi}-${e}-${t}`}function es(e,t){const n=Yi[t];return n?Il(n):jl(e,t)}function _l(e,t){const n={};return t.forEach(r=>{n[r]=es(e,r)}),n}const Al=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Dl(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function Bl(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Ll(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Bl(e))}function Fl(e){const t=[],n=[];return Array.from(e.querySelectorAll(Al)).forEach((r,o)=>{const i=Dl(r);i===-1||!Ll(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function Vl(){return!0}function _n(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=Fl,isEnabled:a=Vl,open:l}=e,c=E.useRef(!1),u=E.useRef(null),p=E.useRef(null),f=E.useRef(null),d=E.useRef(null),b=E.useRef(!1),v=E.useRef(null),g=Be(t.ref,v),h=E.useRef(null);E.useEffect(()=>{!l||!v.current||(b.current=!n)},[n,l]),E.useEffect(()=>{if(!l||!v.current)return;const x=Te(v.current);return v.current.contains(x.activeElement)||(v.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),v.current.setAttribute("tabIndex","-1")),b.current&&v.current.focus()),()=>{o||(f.current&&f.current.focus&&(c.current=!0,f.current.focus()),f.current=null)}},[l]),E.useEffect(()=>{if(!l||!v.current)return;const x=Te(v.current),w=P=>{h.current=P,!(r||!a()||P.key!=="Tab")&&x.activeElement===v.current&&P.shiftKey&&(c.current=!0,p.current&&p.current.focus())},m=()=>{const P=v.current;if(P===null)return;if(!x.hasFocus()||!a()||c.current){c.current=!1;return}if(P.contains(x.activeElement)||r&&x.activeElement!==u.current&&x.activeElement!==p.current)return;if(x.activeElement!==d.current)d.current=null;else if(d.current!==null)return;if(!b.current)return;let L=[];if((x.activeElement===u.current||x.activeElement===p.current)&&(L=i(v.current)),L.length>0){var B,F;const C=!!((B=h.current)!=null&&B.shiftKey&&((F=h.current)==null?void 0:F.key)==="Tab"),$=L[0],R=L[L.length-1];typeof $!="string"&&typeof R!="string"&&(C?R.focus():$.focus())}else P.focus()};x.addEventListener("focusin",m),x.addEventListener("keydown",w,!0);const S=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&m()},50);return()=>{clearInterval(S),x.removeEventListener("focusin",m),x.removeEventListener("keydown",w,!0)}},[n,r,o,a,l,i]);const T=x=>{f.current===null&&(f.current=x.relatedTarget),b.current=!0,d.current=x.target;const w=t.props.onFocus;w&&w(x)},I=x=>{f.current===null&&(f.current=x.relatedTarget),b.current=!0};return y.jsxs(E.Fragment,{children:[y.jsx("div",{tabIndex:l?0:-1,onFocus:I,ref:u,"data-testid":"sentinelStart"}),E.cloneElement(t,{ref:g,onFocus:T}),y.jsx("div",{tabIndex:l?0:-1,onFocus:I,ref:p,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(_n.propTypes={children:fn,disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableRestoreFocus:s.bool,getTabbable:s.func,isEnabled:s.func,open:s.bool.isRequired});process.env.NODE_ENV!=="production"&&(_n["propTypes"]=Bi(_n.propTypes));function zl(e){return typeof e=="function"?e():e}const ln=E.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[a,l]=E.useState(null),c=Be(E.isValidElement(r)?r.ref:null,n);if(vt(()=>{i||l(zl(o)||document.body)},[o,i]),vt(()=>{if(a&&!i)return jn(n,a),()=>{jn(n,null)}},[n,a,i]),i){if(E.isValidElement(r)){const u={ref:c};return E.cloneElement(r,u)}return y.jsx(E.Fragment,{children:r})}return y.jsx(E.Fragment,{children:a&&oa.createPortal(r,a)})});process.env.NODE_ENV!=="production"&&(ln.propTypes={children:s.node,container:s.oneOfType([Je,s.func]),disablePortal:s.bool});process.env.NODE_ENV!=="production"&&(ln["propTypes"]=Bi(ln.propTypes));function Ul(e){const t=Te(e);return t.body===e?It(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function nn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function zo(e){return parseInt(It(e).getComputedStyle(e).paddingRight,10)||0}function Hl(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Uo(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,a=>{const l=i.indexOf(a)===-1,c=!Hl(a);l&&c&&nn(a,o)})}function fr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function ql(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(Ul(r)){const a=Hi(Te(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${zo(r)+a}px`;const l=Te(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${zo(c)+a}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=Te(r).body;else{const a=r.parentElement,l=It(r);i=(a==null?void 0:a.nodeName)==="HTML"&&l.getComputedStyle(a).overflowY==="scroll"?a:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:a,property:l})=>{i?a.style.setProperty(l,i):a.style.removeProperty(l)})}}function Wl(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class Gl{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&nn(t.modalRef,!1);const o=Wl(n);Uo(n,t.mount,t.modalRef,o,!0);const i=fr(this.containers,a=>a.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=fr(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=ql(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=fr(this.containers,a=>a.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&nn(t.modalRef,n),Uo(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const a=i.modals[i.modals.length-1];a.modalRef&&nn(a.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Kl(e){return typeof e=="function"?e():e}function Xl(e){return e?e.props.hasOwnProperty("in"):!1}const Yl=new Gl;function Jl(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Yl,closeAfterTransition:i=!1,onTransitionEnter:a,onTransitionExited:l,children:c,onClose:u,open:p,rootRef:f}=e,d=E.useRef({}),b=E.useRef(null),v=E.useRef(null),g=Be(v,f),[h,T]=E.useState(!p),I=Xl(c);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const w=()=>Te(b.current),m=()=>(d.current.modalRef=v.current,d.current.mount=b.current,d.current),S=()=>{o.mount(m(),{disableScrollLock:r}),v.current&&(v.current.scrollTop=0)},P=an(()=>{const M=Kl(t)||w().body;o.add(m(),M),v.current&&S()}),L=E.useCallback(()=>o.isTopModal(m()),[o]),B=an(M=>{b.current=M,M&&(p&&L()?S():v.current&&nn(v.current,x))}),F=E.useCallback(()=>{o.remove(m(),x)},[x,o]);E.useEffect(()=>()=>{F()},[F]),E.useEffect(()=>{p?P():(!I||!i)&&F()},[p,F,I,i,P]);const C=M=>V=>{var ee;(ee=M.onKeyDown)==null||ee.call(M,V),!(V.key!=="Escape"||V.which===229||!L())&&(n||(V.stopPropagation(),u&&u(V,"escapeKeyDown")))},$=M=>V=>{var ee;(ee=M.onClick)==null||ee.call(M,V),V.target===V.currentTarget&&u&&u(V,"backdropClick")};return{getRootProps:(M={})=>{const V=Zi(e);delete V.onTransitionEnter,delete V.onTransitionExited;const ee=k({},V,M);return k({role:"presentation"},ee,{onKeyDown:C(ee),ref:g})},getBackdropProps:(M={})=>{const V=M;return k({"aria-hidden":!0},V,{onClick:$(V),open:p})},getTransitionProps:()=>{const M=()=>{T(!1),a&&a()},V=()=>{T(!0),l&&l(),i&&F()};return{onEnter:kr(M,c==null?void 0:c.props.onEnter),onExited:kr(V,c==null?void 0:c.props.onExited)}},rootRef:g,portalRef:B,isTopModal:L,exited:h,hasTransition:I}}var Pe="top",Le="bottom",Fe="right",Ne="left",Fr="auto",mn=[Pe,Le,Fe,Ne],jt="start",cn="end",Zl="clippingParents",ts="viewport",Gt="popper",Ql="reference",Ho=mn.reduce(function(e,t){return e.concat([t+"-"+jt,t+"-"+cn])},[]),ns=[].concat(mn,[Fr]).reduce(function(e,t){return e.concat([t,t+"-"+jt,t+"-"+cn])},[]),ec="beforeRead",tc="read",nc="afterRead",rc="beforeMain",oc="main",ic="afterMain",sc="beforeWrite",ac="write",lc="afterWrite",cc=[ec,tc,nc,rc,oc,ic,sc,ac,lc];function qe(e){return e?(e.nodeName||"").toLowerCase():null}function je(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function xt(e){var t=je(e).Element;return e instanceof t||e instanceof Element}function De(e){var t=je(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Vr(e){if(typeof ShadowRoot>"u")return!1;var t=je(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function uc(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!De(i)||!qe(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(a){var l=o[a];l===!1?i.removeAttribute(a):i.setAttribute(a,l===!0?"":l)}))})}function pc(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},a=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=a.reduce(function(c,u){return c[u]="",c},{});!De(o)||!qe(o)||(Object.assign(o.style,l),Object.keys(i).forEach(function(c){o.removeAttribute(c)}))})}}const dc={name:"applyStyles",enabled:!0,phase:"write",fn:uc,effect:pc,requires:["computeStyles"]};function Ue(e){return e.split("-")[0]}var gt=Math.max,An=Math.min,_t=Math.round;function Cr(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function rs(){return!/^((?!chrome|android).)*safari/i.test(Cr())}function At(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&De(e)&&(o=e.offsetWidth>0&&_t(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&_t(r.height)/e.offsetHeight||1);var a=xt(e)?je(e):window,l=a.visualViewport,c=!rs()&&n,u=(r.left+(c&&l?l.offsetLeft:0))/o,p=(r.top+(c&&l?l.offsetTop:0))/i,f=r.width/o,d=r.height/i;return{width:f,height:d,top:p,right:u+f,bottom:p+d,left:u,x:u,y:p}}function zr(e){var t=At(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function os(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Vr(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function Ze(e){return je(e).getComputedStyle(e)}function fc(e){return["table","td","th"].indexOf(qe(e))>=0}function st(e){return((xt(e)?e.ownerDocument:e.document)||window.document).documentElement}function Hn(e){return qe(e)==="html"?e:e.assignedSlot||e.parentNode||(Vr(e)?e.host:null)||st(e)}function qo(e){return!De(e)||Ze(e).position==="fixed"?null:e.offsetParent}function hc(e){var t=/firefox/i.test(Cr()),n=/Trident/i.test(Cr());if(n&&De(e)){var r=Ze(e);if(r.position==="fixed")return null}var o=Hn(e);for(Vr(o)&&(o=o.host);De(o)&&["html","body"].indexOf(qe(o))<0;){var i=Ze(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function gn(e){for(var t=je(e),n=qo(e);n&&fc(n)&&Ze(n).position==="static";)n=qo(n);return n&&(qe(n)==="html"||qe(n)==="body"&&Ze(n).position==="static")?t:n||hc(e)||t}function Ur(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function rn(e,t,n){return gt(e,An(t,n))}function mc(e,t,n){var r=rn(e,t,n);return r>n?n:r}function is(){return{top:0,right:0,bottom:0,left:0}}function ss(e){return Object.assign({},is(),e)}function as(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var gc=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,ss(typeof t!="number"?t:as(t,mn))};function bc(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,l=Ue(n.placement),c=Ur(l),u=[Ne,Fe].indexOf(l)>=0,p=u?"height":"width";if(!(!i||!a)){var f=gc(o.padding,n),d=zr(i),b=c==="y"?Pe:Ne,v=c==="y"?Le:Fe,g=n.rects.reference[p]+n.rects.reference[c]-a[c]-n.rects.popper[p],h=a[c]-n.rects.reference[c],T=gn(i),I=T?c==="y"?T.clientHeight||0:T.clientWidth||0:0,x=g/2-h/2,w=f[b],m=I-d[p]-f[v],S=I/2-d[p]/2+x,P=rn(w,S,m),L=c;n.modifiersData[r]=(t={},t[L]=P,t.centerOffset=P-S,t)}}function vc(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||os(t.elements.popper,o)&&(t.elements.arrow=o))}const yc={name:"arrow",enabled:!0,phase:"main",fn:bc,effect:vc,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Dt(e){return e.split("-")[1]}var xc={top:"auto",right:"auto",bottom:"auto",left:"auto"};function wc(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:_t(n*o)/o||0,y:_t(r*o)/o||0}}function Wo(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,a=e.offsets,l=e.position,c=e.gpuAcceleration,u=e.adaptive,p=e.roundOffsets,f=e.isFixed,d=a.x,b=d===void 0?0:d,v=a.y,g=v===void 0?0:v,h=typeof p=="function"?p({x:b,y:g}):{x:b,y:g};b=h.x,g=h.y;var T=a.hasOwnProperty("x"),I=a.hasOwnProperty("y"),x=Ne,w=Pe,m=window;if(u){var S=gn(n),P="clientHeight",L="clientWidth";if(S===je(n)&&(S=st(n),Ze(S).position!=="static"&&l==="absolute"&&(P="scrollHeight",L="scrollWidth")),S=S,o===Pe||(o===Ne||o===Fe)&&i===cn){w=Le;var B=f&&S===m&&m.visualViewport?m.visualViewport.height:S[P];g-=B-r.height,g*=c?1:-1}if(o===Ne||(o===Pe||o===Le)&&i===cn){x=Fe;var F=f&&S===m&&m.visualViewport?m.visualViewport.width:S[L];b-=F-r.width,b*=c?1:-1}}var C=Object.assign({position:l},u&&xc),$=p===!0?wc({x:b,y:g},je(n)):{x:b,y:g};if(b=$.x,g=$.y,c){var R;return Object.assign({},C,(R={},R[w]=I?"0":"",R[x]=T?"0":"",R.transform=(m.devicePixelRatio||1)<=1?"translate("+b+"px, "+g+"px)":"translate3d("+b+"px, "+g+"px, 0)",R))}return Object.assign({},C,(t={},t[w]=I?g+"px":"",t[x]=T?b+"px":"",t.transform="",t))}function Ec(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,a=i===void 0?!0:i,l=n.roundOffsets,c=l===void 0?!0:l,u={placement:Ue(t.placement),variation:Dt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Wo(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Wo(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Tc={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Ec,data:{}};var kn={passive:!0};function kc(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,a=r.resize,l=a===void 0?!0:a,c=je(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&u.forEach(function(p){p.addEventListener("scroll",n.update,kn)}),l&&c.addEventListener("resize",n.update,kn),function(){i&&u.forEach(function(p){p.removeEventListener("scroll",n.update,kn)}),l&&c.removeEventListener("resize",n.update,kn)}}const Oc={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:kc,data:{}};var Sc={left:"right",right:"left",bottom:"top",top:"bottom"};function Pn(e){return e.replace(/left|right|bottom|top/g,function(t){return Sc[t]})}var Cc={start:"end",end:"start"};function Go(e){return e.replace(/start|end/g,function(t){return Cc[t]})}function Hr(e){var t=je(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function qr(e){return At(st(e)).left+Hr(e).scrollLeft}function Pc(e,t){var n=je(e),r=st(e),o=n.visualViewport,i=r.clientWidth,a=r.clientHeight,l=0,c=0;if(o){i=o.width,a=o.height;var u=rs();(u||!u&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:i,height:a,x:l+qr(e),y:c}}function Nc(e){var t,n=st(e),r=Hr(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=gt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=gt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+qr(e),c=-r.scrollTop;return Ze(o||n).direction==="rtl"&&(l+=gt(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:l,y:c}}function Wr(e){var t=Ze(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function ls(e){return["html","body","#document"].indexOf(qe(e))>=0?e.ownerDocument.body:De(e)&&Wr(e)?e:ls(Hn(e))}function on(e,t){var n;t===void 0&&(t=[]);var r=ls(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=je(r),a=o?[i].concat(i.visualViewport||[],Wr(r)?r:[]):r,l=t.concat(a);return o?l:l.concat(on(Hn(a)))}function Pr(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Rc(e,t){var n=At(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Ko(e,t,n){return t===ts?Pr(Pc(e,n)):xt(t)?Rc(t,n):Pr(Nc(st(e)))}function $c(e){var t=on(Hn(e)),n=["absolute","fixed"].indexOf(Ze(e).position)>=0,r=n&&De(e)?gn(e):e;return xt(r)?t.filter(function(o){return xt(o)&&os(o,r)&&qe(o)!=="body"}):[]}function Mc(e,t,n,r){var o=t==="clippingParents"?$c(e):[].concat(t),i=[].concat(o,[n]),a=i[0],l=i.reduce(function(c,u){var p=Ko(e,u,r);return c.top=gt(p.top,c.top),c.right=An(p.right,c.right),c.bottom=An(p.bottom,c.bottom),c.left=gt(p.left,c.left),c},Ko(e,a,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function cs(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ue(r):null,i=r?Dt(r):null,a=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Pe:c={x:a,y:t.y-n.height};break;case Le:c={x:a,y:t.y+t.height};break;case Fe:c={x:t.x+t.width,y:l};break;case Ne:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var u=o?Ur(o):null;if(u!=null){var p=u==="y"?"height":"width";switch(i){case jt:c[u]=c[u]-(t[p]/2-n[p]/2);break;case cn:c[u]=c[u]+(t[p]/2-n[p]/2);break}}return c}function un(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,a=i===void 0?e.strategy:i,l=n.boundary,c=l===void 0?Zl:l,u=n.rootBoundary,p=u===void 0?ts:u,f=n.elementContext,d=f===void 0?Gt:f,b=n.altBoundary,v=b===void 0?!1:b,g=n.padding,h=g===void 0?0:g,T=ss(typeof h!="number"?h:as(h,mn)),I=d===Gt?Ql:Gt,x=e.rects.popper,w=e.elements[v?I:d],m=Mc(xt(w)?w:w.contextElement||st(e.elements.popper),c,p,a),S=At(e.elements.reference),P=cs({reference:S,element:x,strategy:"absolute",placement:o}),L=Pr(Object.assign({},x,P)),B=d===Gt?L:S,F={top:m.top-B.top+T.top,bottom:B.bottom-m.bottom+T.bottom,left:m.left-B.left+T.left,right:B.right-m.right+T.right},C=e.modifiersData.offset;if(d===Gt&&C){var $=C[o];Object.keys(F).forEach(function(R){var D=[Fe,Le].indexOf(R)>=0?1:-1,A=[Pe,Le].indexOf(R)>=0?"y":"x";F[R]+=$[A]*D})}return F}function Ic(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,u=c===void 0?ns:c,p=Dt(r),f=p?l?Ho:Ho.filter(function(v){return Dt(v)===p}):mn,d=f.filter(function(v){return u.indexOf(v)>=0});d.length===0&&(d=f);var b=d.reduce(function(v,g){return v[g]=un(e,{placement:g,boundary:o,rootBoundary:i,padding:a})[Ue(g)],v},{});return Object.keys(b).sort(function(v,g){return b[v]-b[g]})}function jc(e){if(Ue(e)===Fr)return[];var t=Pn(e);return[Go(e),t,Go(t)]}function _c(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!0:a,c=n.fallbackPlacements,u=n.padding,p=n.boundary,f=n.rootBoundary,d=n.altBoundary,b=n.flipVariations,v=b===void 0?!0:b,g=n.allowedAutoPlacements,h=t.options.placement,T=Ue(h),I=T===h,x=c||(I||!v?[Pn(h)]:jc(h)),w=[h].concat(x).reduce(function(z,H){return z.concat(Ue(H)===Fr?Ic(t,{placement:H,boundary:p,rootBoundary:f,padding:u,flipVariations:v,allowedAutoPlacements:g}):H)},[]),m=t.rects.reference,S=t.rects.popper,P=new Map,L=!0,B=w[0],F=0;F<w.length;F++){var C=w[F],$=Ue(C),R=Dt(C)===jt,D=[Pe,Le].indexOf($)>=0,A=D?"width":"height",M=un(t,{placement:C,boundary:p,rootBoundary:f,altBoundary:d,padding:u}),V=D?R?Fe:Ne:R?Le:Pe;m[A]>S[A]&&(V=Pn(V));var ee=Pn(V),Q=[];if(i&&Q.push(M[$]<=0),l&&Q.push(M[V]<=0,M[ee]<=0),Q.every(function(z){return z})){B=C,L=!1;break}P.set(C,Q)}if(L)for(var O=v?3:1,_=function(H){var G=w.find(function(K){var q=P.get(K);if(q)return q.slice(0,H).every(function(Y){return Y})});if(G)return B=G,"break"},U=O;U>0;U--){var X=_(U);if(X==="break")break}t.placement!==B&&(t.modifiersData[r]._skip=!0,t.placement=B,t.reset=!0)}}const Ac={name:"flip",enabled:!0,phase:"main",fn:_c,requiresIfExists:["offset"],data:{_skip:!1}};function Xo(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Yo(e){return[Pe,Fe,Le,Ne].some(function(t){return e[t]>=0})}function Dc(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=un(t,{elementContext:"reference"}),l=un(t,{altBoundary:!0}),c=Xo(a,r),u=Xo(l,o,i),p=Yo(c),f=Yo(u);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:u,isReferenceHidden:p,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":f})}const Bc={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Dc};function Lc(e,t,n){var r=Ue(e),o=[Ne,Pe].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,a=i[0],l=i[1];return a=a||0,l=(l||0)*o,[Ne,Fe].indexOf(r)>=0?{x:l,y:a}:{x:a,y:l}}function Fc(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,a=ns.reduce(function(p,f){return p[f]=Lc(f,t.rects,i),p},{}),l=a[t.placement],c=l.x,u=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=u),t.modifiersData[r]=a}const Vc={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Fc};function zc(e){var t=e.state,n=e.name;t.modifiersData[n]=cs({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Uc={name:"popperOffsets",enabled:!0,phase:"read",fn:zc,data:{}};function Hc(e){return e==="x"?"y":"x"}function qc(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!1:a,c=n.boundary,u=n.rootBoundary,p=n.altBoundary,f=n.padding,d=n.tether,b=d===void 0?!0:d,v=n.tetherOffset,g=v===void 0?0:v,h=un(t,{boundary:c,rootBoundary:u,padding:f,altBoundary:p}),T=Ue(t.placement),I=Dt(t.placement),x=!I,w=Ur(T),m=Hc(w),S=t.modifiersData.popperOffsets,P=t.rects.reference,L=t.rects.popper,B=typeof g=="function"?g(Object.assign({},t.rects,{placement:t.placement})):g,F=typeof B=="number"?{mainAxis:B,altAxis:B}:Object.assign({mainAxis:0,altAxis:0},B),C=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,$={x:0,y:0};if(S){if(i){var R,D=w==="y"?Pe:Ne,A=w==="y"?Le:Fe,M=w==="y"?"height":"width",V=S[w],ee=V+h[D],Q=V-h[A],O=b?-L[M]/2:0,_=I===jt?P[M]:L[M],U=I===jt?-L[M]:-P[M],X=t.elements.arrow,z=b&&X?zr(X):{width:0,height:0},H=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:is(),G=H[D],K=H[A],q=rn(0,P[M],z[M]),Y=x?P[M]/2-O-q-G-F.mainAxis:_-q-G-F.mainAxis,J=x?-P[M]/2+O+q+K+F.mainAxis:U+q+K+F.mainAxis,re=t.elements.arrow&&gn(t.elements.arrow),j=re?w==="y"?re.clientTop||0:re.clientLeft||0:0,Z=(R=C==null?void 0:C[w])!=null?R:0,N=V+Y-Z-j,oe=V+J-Z,ye=rn(b?An(ee,N):ee,V,b?gt(Q,oe):Q);S[w]=ye,$[w]=ye-V}if(l){var Oe,ge=w==="x"?Pe:Ne,lt=w==="x"?Le:Fe,Se=S[m],Ge=m==="y"?"height":"width",Re=Se+h[ge],Ke=Se-h[lt],we=[Pe,Ne].indexOf(T)!==-1,Et=(Oe=C==null?void 0:C[m])!=null?Oe:0,ct=we?Re:Se-P[Ge]-L[Ge]-Et+F.altAxis,Ft=we?Se+P[Ge]+L[Ge]-Et-F.altAxis:Ke,xn=b&&we?mc(ct,Se,Ft):rn(b?ct:Re,Se,b?Ft:Ke);S[m]=xn,$[m]=xn-Se}t.modifiersData[r]=$}}const Wc={name:"preventOverflow",enabled:!0,phase:"main",fn:qc,requiresIfExists:["offset"]};function Gc(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Kc(e){return e===je(e)||!De(e)?Hr(e):Gc(e)}function Xc(e){var t=e.getBoundingClientRect(),n=_t(t.width)/e.offsetWidth||1,r=_t(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Yc(e,t,n){n===void 0&&(n=!1);var r=De(t),o=De(t)&&Xc(t),i=st(t),a=At(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((qe(t)!=="body"||Wr(i))&&(l=Kc(t)),De(t)?(c=At(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):i&&(c.x=qr(i))),{x:a.left+l.scrollLeft-c.x,y:a.top+l.scrollTop-c.y,width:a.width,height:a.height}}function Jc(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var a=[].concat(i.requires||[],i.requiresIfExists||[]);a.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function Zc(e){var t=Jc(e);return cc.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Qc(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function eu(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var Jo={placement:"bottom",modifiers:[],strategy:"absolute"};function Zo(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function tu(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?Jo:o;return function(l,c,u){u===void 0&&(u=i);var p={placement:"bottom",orderedModifiers:[],options:Object.assign({},Jo,i),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},f=[],d=!1,b={state:p,setOptions:function(T){var I=typeof T=="function"?T(p.options):T;g(),p.options=Object.assign({},i,p.options,I),p.scrollParents={reference:xt(l)?on(l):l.contextElement?on(l.contextElement):[],popper:on(c)};var x=Zc(eu([].concat(r,p.options.modifiers)));return p.orderedModifiers=x.filter(function(w){return w.enabled}),v(),b.update()},forceUpdate:function(){if(!d){var T=p.elements,I=T.reference,x=T.popper;if(Zo(I,x)){p.rects={reference:Yc(I,gn(x),p.options.strategy==="fixed"),popper:zr(x)},p.reset=!1,p.placement=p.options.placement,p.orderedModifiers.forEach(function(F){return p.modifiersData[F.name]=Object.assign({},F.data)});for(var w=0;w<p.orderedModifiers.length;w++){if(p.reset===!0){p.reset=!1,w=-1;continue}var m=p.orderedModifiers[w],S=m.fn,P=m.options,L=P===void 0?{}:P,B=m.name;typeof S=="function"&&(p=S({state:p,options:L,name:B,instance:b})||p)}}}},update:Qc(function(){return new Promise(function(h){b.forceUpdate(),h(p)})}),destroy:function(){g(),d=!0}};if(!Zo(l,c))return b;b.setOptions(u).then(function(h){!d&&u.onFirstUpdate&&u.onFirstUpdate(h)});function v(){p.orderedModifiers.forEach(function(h){var T=h.name,I=h.options,x=I===void 0?{}:I,w=h.effect;if(typeof w=="function"){var m=w({state:p,name:T,instance:b,options:x}),S=function(){};f.push(m||S)}})}function g(){f.forEach(function(h){return h()}),f=[]}return b}}var nu=[Oc,Uc,Tc,dc,Vc,Ac,Wc,yc,Bc],ru=tu({defaultModifiers:nu});const us="Popper";function ou(e){return es(us,e)}_l(us,["root"]);const iu=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],su=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function au(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function Dn(e){return typeof e=="function"?e():e}function qn(e){return e.nodeType!==void 0}function lu(e){return!qn(e)}const cu=()=>et({root:["root"]},Nl(ou)),uu={},pu=E.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:a,disablePortal:l,modifiers:c,open:u,placement:p,popperOptions:f,popperRef:d,slotProps:b={},slots:v={},TransitionProps:g}=t,h=pe(t,iu),T=E.useRef(null),I=Be(T,n),x=E.useRef(null),w=Be(x,d),m=E.useRef(w);vt(()=>{m.current=w},[w]),E.useImperativeHandle(d,()=>x.current,[]);const S=au(p,a),[P,L]=E.useState(S),[B,F]=E.useState(Dn(o));E.useEffect(()=>{x.current&&x.current.forceUpdate()}),E.useEffect(()=>{o&&F(Dn(o))},[o]),vt(()=>{if(!B||!u)return;const A=ee=>{L(ee.placement)};if(process.env.NODE_ENV!=="production"&&B&&qn(B)&&B.nodeType===1){const ee=B.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ee.top===0&&ee.left===0&&ee.right===0&&ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let M=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ee})=>{A(ee)}}];c!=null&&(M=M.concat(c)),f&&f.modifiers!=null&&(M=M.concat(f.modifiers));const V=ru(B,T.current,k({placement:S},f,{modifiers:M}));return m.current(V),()=>{V.destroy(),m.current(null)}},[B,l,c,u,f,S]);const C={placement:P};g!==null&&(C.TransitionProps=g);const $=cu(),R=(r=v.root)!=null?r:"div",D=yt({elementType:R,externalSlotProps:b.root,externalForwardedProps:h,additionalProps:{role:"tooltip",ref:I},ownerState:t,className:$.root});return y.jsx(R,k({},D,{children:typeof i=="function"?i(C):i}))}),ps=E.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:a="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:u,open:p,placement:f="bottom",popperOptions:d=uu,popperRef:b,style:v,transition:g=!1,slotProps:h={},slots:T={}}=t,I=pe(t,su),[x,w]=E.useState(!0),m=()=>{w(!1)},S=()=>{w(!0)};if(!c&&!p&&(!g||x))return null;let P;if(i)P=i;else if(r){const F=Dn(r);P=F&&qn(F)?Te(F).body:Te(null).body}const L=!p&&c&&(!g||x)?"none":void 0,B=g?{in:p,onEnter:m,onExited:S}:void 0;return y.jsx(ln,{disablePortal:l,container:P,children:y.jsx(pu,k({anchorEl:r,direction:a,disablePortal:l,modifiers:u,ref:n,open:g?!x:p,placement:f,popperOptions:d,popperRef:b,slotProps:h,slots:T},I,{style:k({position:"fixed",top:0,left:0,display:L},v),TransitionProps:B,children:o}))})});process.env.NODE_ENV!=="production"&&(ps.propTypes={anchorEl:Lt(s.oneOfType([Je,s.object,s.func]),e=>{if(e.open){const t=Dn(e.anchorEl);if(t&&qn(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||lu(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:s.oneOfType([s.node,s.func]),container:s.oneOfType([Je,s.func]),direction:s.oneOf(["ltr","rtl"]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:Lr,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),transition:s.bool});const du=["values","unit","step"],fu=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>k({},n,{[r.key]:r.val}),{})};function hu(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=pe(e,du),i=fu(t),a=Object.keys(i);function l(d){return`@media (min-width:${typeof t[d]=="number"?t[d]:d}${n})`}function c(d){return`@media (max-width:${(typeof t[d]=="number"?t[d]:d)-r/100}${n})`}function u(d,b){const v=a.indexOf(b);return`@media (min-width:${typeof t[d]=="number"?t[d]:d}${n}) and (max-width:${(v!==-1&&typeof t[a[v]]=="number"?t[a[v]]:b)-r/100}${n})`}function p(d){return a.indexOf(d)+1<a.length?u(d,a[a.indexOf(d)+1]):l(d)}function f(d){const b=a.indexOf(d);return b===0?l(a[1]):b===a.length-1?c(a[b]):u(d,a[a.indexOf(d)+1]).replace("@media","@media not all and")}return k({keys:a,values:i,up:l,down:c,between:u,only:p,not:f,unit:n},o)}const mu={borderRadius:4},gu=mu,bu=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.string,s.object,s.array]):{},at=bu;function sn(e,t){return t?Ye(e,t,{clone:!1}):e}const Gr={xs:0,sm:600,md:900,lg:1200,xl:1536},Qo={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Gr[e]}px)`};function Qe(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||Qo;return t.reduce((a,l,c)=>(a[i.up(i.keys[c])]=n(t[c]),a),{})}if(typeof t=="object"){const i=r.breakpoints||Qo;return Object.keys(t).reduce((a,l)=>{if(Object.keys(i.values||Gr).indexOf(l)!==-1){const c=i.up(l);a[c]=n(t[l],l)}else{const c=l;a[c]=t[c]}return a},{})}return n(t)}function vu(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function yu(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Wn(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function Bn(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Wn(e,n)||r,t&&(o=t(o,r,e)),o}function ve(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=a=>{if(a[t]==null)return null;const l=a[t],c=a.theme,u=Wn(c,r)||{};return Qe(a,l,f=>{let d=Bn(u,o,f);return f===d&&typeof f=="string"&&(d=Bn(u,o,`${t}${f==="default"?"":He(f)}`,f)),n===!1?d:{[n]:d}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:at}:{},i.filterProps=[t],i}function xu(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const wu={m:"margin",p:"padding"},Eu={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},ei={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Tu=xu(e=>{if(e.length>2)if(ei[e])e=ei[e];else return[e];const[t,n]=e.split(""),r=wu[t],o=Eu[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),Gn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Kn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],ku=[...Gn,...Kn];function bn(e,t,n,r){var o;const i=(o=Wn(e,t,!1))!=null?o:n;return typeof i=="number"?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&typeof a!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`),i*a):Array.isArray(i)?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&(Number.isInteger(a)?a>i.length-1&&console.error([`MUI: The value provided (${a}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${a} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[a]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function ds(e){return bn(e,"spacing",8,"spacing")}function vn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Ou(e,t){return n=>e.reduce((r,o)=>(r[o]=vn(t,n),r),{})}function Su(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=Tu(n),i=Ou(o,r),a=e[n];return Qe(e,a,i)}function fs(e,t){const n=ds(e.theme);return Object.keys(e).map(r=>Su(e,t,r,n)).reduce(sn,{})}function he(e){return fs(e,Gn)}he.propTypes=process.env.NODE_ENV!=="production"?Gn.reduce((e,t)=>(e[t]=at,e),{}):{};he.filterProps=Gn;function me(e){return fs(e,Kn)}me.propTypes=process.env.NODE_ENV!=="production"?Kn.reduce((e,t)=>(e[t]=at,e),{}):{};me.filterProps=Kn;process.env.NODE_ENV!=="production"&&ku.reduce((e,t)=>(e[t]=at,e),{});function Cu(e=8){if(e.mui)return e;const t=ds({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const a=t(i);return typeof a=="number"?`${a}px`:a}).join(" "));return n.mui=!0,n}function Xn(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?sn(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Ae(e){return typeof e!="number"?e:`${e}px solid`}function Ve(e,t){return ve({prop:e,themeKey:"borders",transform:t})}const Pu=Ve("border",Ae),Nu=Ve("borderTop",Ae),Ru=Ve("borderRight",Ae),$u=Ve("borderBottom",Ae),Mu=Ve("borderLeft",Ae),Iu=Ve("borderColor"),ju=Ve("borderTopColor"),_u=Ve("borderRightColor"),Au=Ve("borderBottomColor"),Du=Ve("borderLeftColor"),Bu=Ve("outline",Ae),Lu=Ve("outlineColor"),Yn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=bn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:vn(t,r)});return Qe(e,e.borderRadius,n)}return null};Yn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:at}:{};Yn.filterProps=["borderRadius"];Xn(Pu,Nu,Ru,$u,Mu,Iu,ju,_u,Au,Du,Yn,Bu,Lu);const Jn=e=>{if(e.gap!==void 0&&e.gap!==null){const t=bn(e.theme,"spacing",8,"gap"),n=r=>({gap:vn(t,r)});return Qe(e,e.gap,n)}return null};Jn.propTypes=process.env.NODE_ENV!=="production"?{gap:at}:{};Jn.filterProps=["gap"];const Zn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=bn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:vn(t,r)});return Qe(e,e.columnGap,n)}return null};Zn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:at}:{};Zn.filterProps=["columnGap"];const Qn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=bn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:vn(t,r)});return Qe(e,e.rowGap,n)}return null};Qn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:at}:{};Qn.filterProps=["rowGap"];const Fu=ve({prop:"gridColumn"}),Vu=ve({prop:"gridRow"}),zu=ve({prop:"gridAutoFlow"}),Uu=ve({prop:"gridAutoColumns"}),Hu=ve({prop:"gridAutoRows"}),qu=ve({prop:"gridTemplateColumns"}),Wu=ve({prop:"gridTemplateRows"}),Gu=ve({prop:"gridTemplateAreas"}),Ku=ve({prop:"gridArea"});Xn(Jn,Zn,Qn,Fu,Vu,zu,Uu,Hu,qu,Wu,Gu,Ku);function $t(e,t){return t==="grey"?t:e}const Xu=ve({prop:"color",themeKey:"palette",transform:$t}),Yu=ve({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:$t}),Ju=ve({prop:"backgroundColor",themeKey:"palette",transform:$t});Xn(Xu,Yu,Ju);function Ie(e){return e<=1&&e!==0?`${e*100}%`:e}const Zu=ve({prop:"width",transform:Ie}),Kr=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Gr[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:Ie(n)}};return Qe(e,e.maxWidth,t)}return null};Kr.filterProps=["maxWidth"];const Qu=ve({prop:"minWidth",transform:Ie}),ep=ve({prop:"height",transform:Ie}),tp=ve({prop:"maxHeight",transform:Ie}),np=ve({prop:"minHeight",transform:Ie});ve({prop:"size",cssProperty:"width",transform:Ie});ve({prop:"size",cssProperty:"height",transform:Ie});const rp=ve({prop:"boxSizing"});Xn(Zu,Kr,Qu,ep,tp,np,rp);const op={border:{themeKey:"borders",transform:Ae},borderTop:{themeKey:"borders",transform:Ae},borderRight:{themeKey:"borders",transform:Ae},borderBottom:{themeKey:"borders",transform:Ae},borderLeft:{themeKey:"borders",transform:Ae},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Ae},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Yn},color:{themeKey:"palette",transform:$t},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:$t},backgroundColor:{themeKey:"palette",transform:$t},p:{style:me},pt:{style:me},pr:{style:me},pb:{style:me},pl:{style:me},px:{style:me},py:{style:me},padding:{style:me},paddingTop:{style:me},paddingRight:{style:me},paddingBottom:{style:me},paddingLeft:{style:me},paddingX:{style:me},paddingY:{style:me},paddingInline:{style:me},paddingInlineStart:{style:me},paddingInlineEnd:{style:me},paddingBlock:{style:me},paddingBlockStart:{style:me},paddingBlockEnd:{style:me},m:{style:he},mt:{style:he},mr:{style:he},mb:{style:he},ml:{style:he},mx:{style:he},my:{style:he},margin:{style:he},marginTop:{style:he},marginRight:{style:he},marginBottom:{style:he},marginLeft:{style:he},marginX:{style:he},marginY:{style:he},marginInline:{style:he},marginInlineStart:{style:he},marginInlineEnd:{style:he},marginBlock:{style:he},marginBlockStart:{style:he},marginBlockEnd:{style:he},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Jn},rowGap:{style:Qn},columnGap:{style:Zn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ie},maxWidth:{style:Kr},minWidth:{transform:Ie},height:{transform:Ie},maxHeight:{transform:Ie},minHeight:{transform:Ie},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Xr=op;function ip(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function sp(e,t){return typeof e=="function"?e(t):e}function ap(){function e(n,r,o,i){const a={[n]:r,theme:o},l=i[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:u,transform:p,style:f}=l;if(r==null)return null;if(u==="typography"&&r==="inherit")return{[n]:r};const d=Wn(o,u)||{};return f?f(a):Qe(a,r,v=>{let g=Bn(d,p,v);return v===g&&typeof v=="string"&&(g=Bn(d,p,`${n}${v==="default"?"":He(v)}`,v)),c===!1?g:{[c]:g}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const a=(r=i.unstable_sxConfig)!=null?r:Xr;function l(c){let u=c;if(typeof c=="function")u=c(i);else if(typeof c!="object")return c;if(!u)return null;const p=vu(i.breakpoints),f=Object.keys(p);let d=p;return Object.keys(u).forEach(b=>{const v=sp(u[b],i);if(v!=null)if(typeof v=="object")if(a[b])d=sn(d,e(b,v,i,a));else{const g=Qe({theme:i},v,h=>({[b]:h}));ip(g,v)?d[b]=t({sx:v,theme:i}):d=sn(d,g)}else d=sn(d,e(b,v,i,a))}),yu(f,d)}return Array.isArray(o)?o.map(l):l(o)}return t}const hs=ap();hs.filterProps=["sx"];const Yr=hs;function lp(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const cp=["breakpoints","palette","spacing","shape"];function Jr(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,a=pe(e,cp),l=hu(n),c=Cu(o);let u=Ye({breakpoints:l,direction:"ltr",components:{},palette:k({mode:"light"},r),spacing:c,shape:k({},gu,i)},a);return u.applyStyles=lp,u=t.reduce((p,f)=>Ye(p,f),u),u.unstable_sxConfig=k({},Xr,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(f){return Yr({sx:f,theme:this})},u}function up(e){return Object.keys(e).length===0}function ms(e=null){const t=E.useContext(wr.ThemeContext);return!t||up(t)?e:t}const pp=Jr();function gs(e=pp){return ms(e)}const dp=["ownerState"],fp=["variants"],hp=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function mp(e){return Object.keys(e).length===0}function gp(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Nn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const bp=Jr(),ti=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function On({defaultTheme:e,theme:t,themeId:n}){return mp(t)?e:t[n]||t}function vp(e){return e?(t,n)=>n[e]:null}function Rn(e,t){let{ownerState:n}=t,r=pe(t,dp);const o=typeof e=="function"?e(k({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>Rn(i,k({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let l=pe(o,fp);return i.forEach(c=>{let u=!0;typeof c.props=="function"?u=c.props(k({ownerState:n},r,n)):Object.keys(c.props).forEach(p=>{(n==null?void 0:n[p])!==c.props[p]&&r[p]!==c.props[p]&&(u=!1)}),u&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(k({ownerState:n},r,n)):c.style))}),l}return o}function yp(e={}){const{themeId:t,defaultTheme:n=bp,rootShouldForwardProp:r=Nn,slotShouldForwardProp:o=Nn}=e,i=a=>Yr(k({},a,{theme:On(k({},a,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(a,l={})=>{wr.internal_processStyles(a,m=>m.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:c,slot:u,skipVariantsResolver:p,skipSx:f,overridesResolver:d=vp(ti(u))}=l,b=pe(l,hp),v=p!==void 0?p:u&&u!=="Root"&&u!=="root"||!1,g=f||!1;let h;process.env.NODE_ENV!=="production"&&c&&(h=`${c}-${ti(u||"Root")}`);let T=Nn;u==="Root"||u==="root"?T=r:u?T=o:gp(a)&&(T=void 0);const I=wr(a,k({shouldForwardProp:T,label:h},b)),x=m=>typeof m=="function"&&m.__emotion_real!==m||ht(m)?S=>Rn(m,k({},S,{theme:On({theme:S.theme,defaultTheme:n,themeId:t})})):m,w=(m,...S)=>{let P=x(m);const L=S?S.map(x):[];c&&d&&L.push(C=>{const $=On(k({},C,{defaultTheme:n,themeId:t}));if(!$.components||!$.components[c]||!$.components[c].styleOverrides)return null;const R=$.components[c].styleOverrides,D={};return Object.entries(R).forEach(([A,M])=>{D[A]=Rn(M,k({},C,{theme:$}))}),d(C,D)}),c&&!v&&L.push(C=>{var $;const R=On(k({},C,{defaultTheme:n,themeId:t})),D=R==null||($=R.components)==null||($=$[c])==null?void 0:$.variants;return Rn({variants:D},k({},C,{theme:R}))}),g||L.push(i);const B=L.length-S.length;if(Array.isArray(m)&&B>0){const C=new Array(B).fill("");P=[...m,...C],P.raw=[...m.raw,...C]}const F=I(P,...L);if(process.env.NODE_ENV!=="production"){let C;c&&(C=`${c}${He(u||"")}`),C===void 0&&(C=`Styled(${rl(a)})`),F.displayName=C}return a.muiName&&(F.muiName=a.muiName),F};return I.withConfig&&(w.withConfig=I.withConfig),w}}function xp(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:Ki(t.components[n].defaultProps,r)}function wp({props:e,name:t,defaultTheme:n,themeId:r}){let o=gs(n);return r&&(o=o[r]||o),xp({theme:o,name:t,props:e})}function Zr(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Sl(e,t,n)}function Ep(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function wt(e){if(e.type)return e;if(e.charAt(0)==="#")return wt(Ep(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Mt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Mt(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function er(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function Tp(e){e=wt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),a=(u,p=(u+n/30)%12)=>o-i*Math.max(Math.min(p-3,9-p,1),-1);let l="rgb";const c=[Math.round(a(0)*255),Math.round(a(8)*255),Math.round(a(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),er({type:l,values:c})}function ni(e){e=wt(e);let t=e.type==="hsl"||e.type==="hsla"?wt(Tp(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function ri(e,t){const n=ni(e),r=ni(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function Ln(e,t){return e=wt(e),t=Zr(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,er(e)}function kp(e,t){if(e=wt(e),t=Zr(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return er(e)}function Op(e,t){if(e=wt(e),t=Zr(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return er(e)}function Sp(e,t){return k({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const Cp={black:"#000",white:"#fff"},pn=Cp,Pp={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Np=Pp,Rp={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Tt=Rp,$p={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},kt=$p,Mp={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Kt=Mp,Ip={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ot=Ip,jp={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},St=jp,_p={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Ct=_p,Ap=["mode","contrastThreshold","tonalOffset"],oi={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:pn.white,default:pn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},hr={text:{primary:pn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:pn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function ii(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=Op(e.main,o):t==="dark"&&(e.dark=kp(e.main,i)))}function Dp(e="light"){return e==="dark"?{main:Ot[200],light:Ot[50],dark:Ot[400]}:{main:Ot[700],light:Ot[400],dark:Ot[800]}}function Bp(e="light"){return e==="dark"?{main:Tt[200],light:Tt[50],dark:Tt[400]}:{main:Tt[500],light:Tt[300],dark:Tt[700]}}function Lp(e="light"){return e==="dark"?{main:kt[500],light:kt[300],dark:kt[700]}:{main:kt[700],light:kt[400],dark:kt[800]}}function Fp(e="light"){return e==="dark"?{main:St[400],light:St[300],dark:St[700]}:{main:St[700],light:St[500],dark:St[900]}}function Vp(e="light"){return e==="dark"?{main:Ct[400],light:Ct[300],dark:Ct[700]}:{main:Ct[800],light:Ct[500],dark:Ct[900]}}function zp(e="light"){return e==="dark"?{main:Kt[400],light:Kt[300],dark:Kt[700]}:{main:"#ed6c02",light:Kt[500],dark:Kt[900]}}function Up(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=pe(e,Ap),i=e.primary||Dp(t),a=e.secondary||Bp(t),l=e.error||Lp(t),c=e.info||Fp(t),u=e.success||Vp(t),p=e.warning||zp(t);function f(g){const h=ri(g,hr.text.primary)>=n?hr.text.primary:oi.text.primary;if(process.env.NODE_ENV!=="production"){const T=ri(g,h);T<3&&console.error([`MUI: The contrast ratio of ${T}:1 for ${h} on ${g}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return h}const d=({color:g,name:h,mainShade:T=500,lightShade:I=300,darkShade:x=700})=>{if(g=k({},g),!g.main&&g[T]&&(g.main=g[T]),!g.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${T}\` property.`:Mt(11,h?` (${h})`:"",T));if(typeof g.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(g.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Mt(12,h?` (${h})`:"",JSON.stringify(g.main)));return ii(g,"light",I,r),ii(g,"dark",x,r),g.contrastText||(g.contrastText=f(g.main)),g},b={dark:hr,light:oi};return process.env.NODE_ENV!=="production"&&(b[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),Ye(k({common:k({},pn),mode:t,primary:d({color:i,name:"primary"}),secondary:d({color:a,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:d({color:l,name:"error"}),warning:d({color:p,name:"warning"}),info:d({color:c,name:"info"}),success:d({color:u,name:"success"}),grey:Np,contrastThreshold:n,getContrastText:f,augmentColor:d,tonalOffset:r},b[t]),o)}const Hp=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function qp(e){return Math.round(e*1e5)/1e5}const si={textTransform:"uppercase"},ai='"Roboto", "Helvetica", "Arial", sans-serif';function Wp(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=ai,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:a=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:u=16,allVariants:p,pxToRem:f}=n,d=pe(n,Hp);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const b=o/14,v=f||(T=>`${T/u*b}rem`),g=(T,I,x,w,m)=>k({fontFamily:r,fontWeight:T,fontSize:v(I),lineHeight:x},r===ai?{letterSpacing:`${qp(w/I)}em`}:{},m,p),h={h1:g(i,96,1.167,-1.5),h2:g(i,60,1.2,-.5),h3:g(a,48,1.167,0),h4:g(a,34,1.235,.25),h5:g(a,24,1.334,0),h6:g(l,20,1.6,.15),subtitle1:g(a,16,1.75,.15),subtitle2:g(l,14,1.57,.1),body1:g(a,16,1.5,.15),body2:g(a,14,1.43,.15),button:g(l,14,1.75,.4,si),caption:g(a,12,1.66,.4),overline:g(a,12,2.66,1,si),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return Ye(k({htmlFontSize:u,pxToRem:v,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:a,fontWeightMedium:l,fontWeightBold:c},h),d,{clone:!1})}const Gp=.2,Kp=.14,Xp=.12;function de(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Gp})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Kp})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Xp})`].join(",")}const Yp=["none",de(0,2,1,-1,0,1,1,0,0,1,3,0),de(0,3,1,-2,0,2,2,0,0,1,5,0),de(0,3,3,-2,0,3,4,0,0,1,8,0),de(0,2,4,-1,0,4,5,0,0,1,10,0),de(0,3,5,-1,0,5,8,0,0,1,14,0),de(0,3,5,-1,0,6,10,0,0,1,18,0),de(0,4,5,-2,0,7,10,1,0,2,16,1),de(0,5,5,-3,0,8,10,1,0,3,14,2),de(0,5,6,-3,0,9,12,1,0,3,16,2),de(0,6,6,-3,0,10,14,1,0,4,18,3),de(0,6,7,-4,0,11,15,1,0,4,20,3),de(0,7,8,-4,0,12,17,2,0,5,22,4),de(0,7,8,-4,0,13,19,2,0,5,24,4),de(0,7,9,-4,0,14,21,2,0,5,26,4),de(0,8,9,-5,0,15,22,2,0,6,28,5),de(0,8,10,-5,0,16,24,2,0,6,30,5),de(0,8,11,-5,0,17,26,2,0,6,32,5),de(0,9,11,-5,0,18,28,2,0,7,34,6),de(0,9,12,-6,0,19,29,2,0,7,36,6),de(0,10,13,-6,0,20,31,3,0,8,38,7),de(0,10,13,-6,0,21,33,3,0,8,40,7),de(0,10,14,-6,0,22,35,3,0,8,42,7),de(0,11,14,-7,0,23,36,3,0,9,44,8),de(0,11,15,-7,0,24,38,3,0,9,46,8)],Jp=Yp,Zp=["duration","easing","delay"],Qp={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},ed={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function li(e){return`${Math.round(e)}ms`}function td(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function nd(e){const t=k({},Qp,e.easing),n=k({},ed,e.duration);return k({getAutoHeightDuration:td,create:(o=["all"],i={})=>{const{duration:a=n.standard,easing:l=t.easeInOut,delay:c=0}=i,u=pe(i,Zp);if(process.env.NODE_ENV!=="production"){const p=d=>typeof d=="string",f=d=>!isNaN(parseFloat(d));!p(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!f(a)&&!p(a)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`),p(l)||console.error('MUI: Argument "easing" must be a string.'),!f(c)&&!p(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(p=>`${p} ${typeof a=="string"?a:li(a)} ${l} ${typeof c=="string"?c:li(c)}`).join(",")}},e,{easing:t,duration:n})}const rd={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},od=rd,id=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function sd(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,a=pe(e,id);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Mt(18));const l=Up(r),c=Jr(e);let u=Ye(c,{mixins:Sp(c.breakpoints,n),palette:l,shadows:Jp.slice(),typography:Wp(l,i),transitions:nd(o),zIndex:k({},od)});if(u=Ye(u,a),u=t.reduce((p,f)=>Ye(p,f),u),process.env.NODE_ENV!=="production"){const p=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],f=(d,b)=>{let v;for(v in d){const g=d[v];if(p.indexOf(v)!==-1&&Object.keys(g).length>0){if(process.env.NODE_ENV!=="production"){const h=We("",v);console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${v}\` internal state.`,"You can not override it like this: ",JSON.stringify(d,null,2),"",`Instead, you need to use the '&.${h}' syntax:`,JSON.stringify({root:{[`&.${h}`]:g}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}d[v]={}}}};Object.keys(u.components).forEach(d=>{const b=u.components[d].styleOverrides;b&&d.indexOf("Mui")===0&&f(b,d)})}return u.unstable_sxConfig=k({},Xr,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(f){return Yr({sx:f,theme:this})},u}const ad=sd(),Qr=ad,eo="$$material",bs=e=>Nn(e)&&e!=="classes",ld=yp({themeId:eo,defaultTheme:Qr,rootShouldForwardProp:bs}),ke=ld;function yn(){const e=gs(Qr);return process.env.NODE_ENV!=="production"&&E.useDebugValue(e),e[eo]||e}function tt({props:e,name:t}){return wp({props:e,name:t,defaultTheme:Qr,themeId:eo})}function Nr(e,t){return Nr=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},Nr(e,t)}function cd(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Nr(e,t)}const ci={disabled:!1};var ud=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.shape({enter:s.number,exit:s.number,appear:s.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&s.oneOfType([s.string,s.shape({enter:s.string,exit:s.string,active:s.string}),s.shape({enter:s.string,enterDone:s.string,enterActive:s.string,exit:s.string,exitDone:s.string,exitActive:s.string})]);const vs=W.createContext(null);var pd=function(t){return t.scrollTop},en="unmounted",pt="exited",dt="entering",Rt="entered",Rr="exiting",nt=function(e){cd(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var a=o,l=a&&!a.isMounting?r.enter:r.appear,c;return i.appearStatus=null,r.in?l?(c=pt,i.appearStatus=dt):c=Rt:r.unmountOnExit||r.mountOnEnter?c=en:c=pt,i.state={status:c},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var a=o.in;return a&&i.status===en?{status:pt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var a=this.state.status;this.props.in?a!==dt&&a!==Rt&&(i=dt):(a===dt||a===Rt)&&(i=Rr)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,a,l;return i=a=l=o,o!=null&&typeof o!="number"&&(i=o.exit,a=o.enter,l=o.appear!==void 0?o.appear:a),{exit:i,enter:a,appear:l}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===dt){if(this.props.unmountOnExit||this.props.mountOnEnter){var a=this.props.nodeRef?this.props.nodeRef.current:Jt.findDOMNode(this);a&&pd(a)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===pt&&this.setState({status:en})},n.performEnter=function(o){var i=this,a=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[Jt.findDOMNode(this),l],u=c[0],p=c[1],f=this.getTimeouts(),d=l?f.appear:f.enter;if(!o&&!a||ci.disabled){this.safeSetState({status:Rt},function(){i.props.onEntered(u)});return}this.props.onEnter(u,p),this.safeSetState({status:dt},function(){i.props.onEntering(u,p),i.onTransitionEnd(d,function(){i.safeSetState({status:Rt},function(){i.props.onEntered(u,p)})})})},n.performExit=function(){var o=this,i=this.props.exit,a=this.getTimeouts(),l=this.props.nodeRef?void 0:Jt.findDOMNode(this);if(!i||ci.disabled){this.safeSetState({status:pt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:Rr},function(){o.props.onExiting(l),o.onTransitionEnd(a.exit,function(){o.safeSetState({status:pt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,a=!0;return this.nextCallback=function(l){a&&(a=!1,i.nextCallback=null,o(l))},this.nextCallback.cancel=function(){a=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var a=this.props.nodeRef?this.props.nodeRef.current:Jt.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!a||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[a,this.nextCallback],u=c[0],p=c[1];this.props.addEndListener(u,p)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===en)return null;var i=this.props,a=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var l=pe(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return W.createElement(vs.Provider,{value:null},typeof a=="function"?a(o,l):W.cloneElement(W.Children.only(a),l))},t}(W.Component);nt.contextType=vs;nt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:s.shape({current:typeof Element>"u"?s.any:function(e,t,n,r,o,i){var a=e[t];return s.instanceOf(a&&"ownerDocument"in a?a.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:s.oneOfType([s.func.isRequired,s.element.isRequired]).isRequired,in:s.bool,mountOnEnter:s.bool,unmountOnExit:s.bool,appear:s.bool,enter:s.bool,exit:s.bool,timeout:function(t){var n=ud;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:s.func,onEnter:s.func,onEntering:s.func,onEntered:s.func,onExit:s.func,onExiting:s.func,onExited:s.func}:{};function Pt(){}nt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Pt,onEntering:Pt,onEntered:Pt,onExit:Pt,onExiting:Pt,onExited:Pt};nt.UNMOUNTED=en;nt.EXITED=pt;nt.ENTERING=dt;nt.ENTERED=Rt;nt.EXITING=Rr;const ys=nt,xs=e=>e.scrollTop;function Fn(e,t){var n,r;const{timeout:o,easing:i,style:a={}}=e;return{duration:(n=a.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=a.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:a.transitionDelay}}const dd=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function $r(e){return`scale(${e}, ${e**2})`}const fd={entering:{opacity:1,transform:$r(1)},entered:{opacity:1,transform:"none"}},mr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),to=E.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:a,in:l,onEnter:c,onEntered:u,onEntering:p,onExit:f,onExited:d,onExiting:b,style:v,timeout:g="auto",TransitionComponent:h=ys}=t,T=pe(t,dd),I=Zt(),x=E.useRef(),w=yn(),m=E.useRef(null),S=Be(m,i.ref,n),P=A=>M=>{if(A){const V=m.current;M===void 0?A(V):A(V,M)}},L=P(p),B=P((A,M)=>{xs(A);const{duration:V,delay:ee,easing:Q}=Fn({style:v,timeout:g,easing:a},{mode:"enter"});let O;g==="auto"?(O=w.transitions.getAutoHeightDuration(A.clientHeight),x.current=O):O=V,A.style.transition=[w.transitions.create("opacity",{duration:O,delay:ee}),w.transitions.create("transform",{duration:mr?O:O*.666,delay:ee,easing:Q})].join(","),c&&c(A,M)}),F=P(u),C=P(b),$=P(A=>{const{duration:M,delay:V,easing:ee}=Fn({style:v,timeout:g,easing:a},{mode:"exit"});let Q;g==="auto"?(Q=w.transitions.getAutoHeightDuration(A.clientHeight),x.current=Q):Q=M,A.style.transition=[w.transitions.create("opacity",{duration:Q,delay:V}),w.transitions.create("transform",{duration:mr?Q:Q*.666,delay:mr?V:V||Q*.333,easing:ee})].join(","),A.style.opacity=0,A.style.transform=$r(.75),f&&f(A)}),R=P(d),D=A=>{g==="auto"&&I.start(x.current||0,A),r&&r(m.current,A)};return y.jsx(h,k({appear:o,in:l,nodeRef:m,onEnter:B,onEntered:F,onEntering:L,onExit:$,onExited:R,onExiting:C,addEndListener:D,timeout:g==="auto"?null:g},T,{children:(A,M)=>E.cloneElement(i,k({style:k({opacity:0,transform:$r(.75),visibility:A==="exited"&&!l?"hidden":void 0},fd[A],v,i.props.style),ref:S},M))}))});process.env.NODE_ENV!=="production"&&(to.propTypes={addEndListener:s.func,appear:s.bool,children:fn.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});to.muiSupportAuto=!0;const Mr=to,hd=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},ui=hd,md=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],gd=ke(ps,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),ws=E.forwardRef(function(t,n){var r;const o=ms(),i=tt({props:t,name:"MuiPopper"}),{anchorEl:a,component:l,components:c,componentsProps:u,container:p,disablePortal:f,keepMounted:d,modifiers:b,open:v,placement:g,popperOptions:h,popperRef:T,transition:I,slots:x,slotProps:w}=i,m=pe(i,md),S=(r=x==null?void 0:x.root)!=null?r:c==null?void 0:c.Root,P=k({anchorEl:a,container:p,disablePortal:f,keepMounted:d,modifiers:b,open:v,placement:g,popperOptions:h,popperRef:T,transition:I},m);return y.jsx(gd,k({as:l,direction:o==null?void 0:o.direction,slots:{root:S},slotProps:w??u},P,{ref:n}))});process.env.NODE_ENV!=="production"&&(ws.propTypes={anchorEl:s.oneOfType([Je,s.object,s.func]),children:s.oneOfType([s.node,s.func]),component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Je,s.func]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:Lr,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transition:s.bool});const Es=ws;function bd(e){return We("MuiTooltip",e)}const vd=it("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),ot=vd,yd=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function xd(e){return Math.round(e*1e5)/1e5}const wd=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,a={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${He(i.split("-")[0])}`],arrow:["arrow"]};return et(a,bd,t)},Ed=ke(Es,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>k({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${ot.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${ot.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${ot.arrow}`]:k({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${ot.arrow}`]:k({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Td=ke("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${He(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>k({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:Ln(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${xd(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${ot.popper}[data-popper-placement*="left"] &`]:k({transformOrigin:"right center"},t.isRtl?k({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):k({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${ot.popper}[data-popper-placement*="right"] &`]:k({transformOrigin:"left center"},t.isRtl?k({marginRight:"14px"},t.touch&&{marginRight:"24px"}):k({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${ot.popper}[data-popper-placement*="top"] &`]:k({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${ot.popper}[data-popper-placement*="bottom"] &`]:k({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),kd=ke("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:Ln(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Sn=!1;const pi=new hn;let Xt={x:0,y:0};function Cn(e,t){return n=>{t&&t(n),e(n)}}const Ts=E.forwardRef(function(t,n){var r,o,i,a,l,c,u,p,f,d,b,v,g,h,T,I,x,w,m;const S=tt({props:t,name:"MuiTooltip"}),{arrow:P=!1,children:L,components:B={},componentsProps:F={},describeChild:C=!1,disableFocusListener:$=!1,disableHoverListener:R=!1,disableInteractive:D=!1,disableTouchListener:A=!1,enterDelay:M=100,enterNextDelay:V=0,enterTouchDelay:ee=700,followCursor:Q=!1,id:O,leaveDelay:_=0,leaveTouchDelay:U=1500,onClose:X,onOpen:z,open:H,placement:G="bottom",PopperComponent:K,PopperProps:q={},slotProps:Y={},slots:J={},title:re,TransitionComponent:j=Mr,TransitionProps:Z}=S,N=pe(S,yd),oe=E.isValidElement(L)?L:y.jsx("span",{children:L}),ye=yn(),Oe=ye.direction==="rtl",[ge,lt]=E.useState(),[Se,Ge]=E.useState(null),Re=E.useRef(!1),Ke=D||Q,we=Zt(),Et=Zt(),ct=Zt(),Ft=Zt(),[xn,so]=zi({controlled:H,default:!1,name:"Tooltip",state:"open"});let Xe=xn;if(process.env.NODE_ENV!=="production"){const{current:te}=E.useRef(H!==void 0);E.useEffect(()=>{ge&&ge.disabled&&!te&&re!==""&&ge.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[re,ge,te])}const tr=Vi(O),Vt=E.useRef(),wn=an(()=>{Vt.current!==void 0&&(document.body.style.WebkitUserSelect=Vt.current,Vt.current=void 0),Ft.clear()});E.useEffect(()=>wn,[wn]);const ao=te=>{pi.clear(),Sn=!0,so(!0),z&&!Xe&&z(te)},En=an(te=>{pi.start(800+_,()=>{Sn=!1}),so(!1),X&&Xe&&X(te),we.start(ye.transitions.duration.shortest,()=>{Re.current=!1})}),nr=te=>{Re.current&&te.type!=="touchstart"||(ge&&ge.removeAttribute("title"),Et.clear(),ct.clear(),M||Sn&&V?Et.start(Sn?V:M,()=>{ao(te)}):ao(te))},lo=te=>{Et.clear(),ct.start(_,()=>{En(te)})},{isFocusVisibleRef:co,onBlur:zs,onFocus:Us,ref:Hs}=Ui(),[,uo]=E.useState(!1),po=te=>{zs(te),co.current===!1&&(uo(!1),lo(te))},fo=te=>{ge||lt(te.currentTarget),Us(te),co.current===!0&&(uo(!0),nr(te))},ho=te=>{Re.current=!0;const $e=oe.props;$e.onTouchStart&&$e.onTouchStart(te)},mo=nr,go=lo,qs=te=>{ho(te),ct.clear(),we.clear(),wn(),Vt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Ft.start(ee,()=>{document.body.style.WebkitUserSelect=Vt.current,nr(te)})},Ws=te=>{oe.props.onTouchEnd&&oe.props.onTouchEnd(te),wn(),ct.start(U,()=>{En(te)})};E.useEffect(()=>{if(!Xe)return;function te($e){($e.key==="Escape"||$e.key==="Esc")&&En($e)}return document.addEventListener("keydown",te),()=>{document.removeEventListener("keydown",te)}},[En,Xe]);const Gs=Be(oe.ref,Hs,lt,n);!re&&re!==0&&(Xe=!1);const rr=E.useRef(),Ks=te=>{const $e=oe.props;$e.onMouseMove&&$e.onMouseMove(te),Xt={x:te.clientX,y:te.clientY},rr.current&&rr.current.update()},zt={},or=typeof re=="string";C?(zt.title=!Xe&&or&&!R?re:null,zt["aria-describedby"]=Xe?tr:null):(zt["aria-label"]=or?re:null,zt["aria-labelledby"]=Xe&&!or?tr:null);const _e=k({},zt,N,oe.props,{className:Ee(N.className,oe.props.className),onTouchStart:ho,ref:Gs},Q?{onMouseMove:Ks}:{});process.env.NODE_ENV!=="production"&&(_e["data-mui-internal-clone-element"]=!0,E.useEffect(()=>{ge&&!ge.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[ge]));const Ut={};A||(_e.onTouchStart=qs,_e.onTouchEnd=Ws),R||(_e.onMouseOver=Cn(mo,_e.onMouseOver),_e.onMouseLeave=Cn(go,_e.onMouseLeave),Ke||(Ut.onMouseOver=mo,Ut.onMouseLeave=go)),$||(_e.onFocus=Cn(fo,_e.onFocus),_e.onBlur=Cn(po,_e.onBlur),Ke||(Ut.onFocus=fo,Ut.onBlur=po)),process.env.NODE_ENV!=="production"&&oe.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${oe.props.title}\` or the Tooltip component.`].join(`
`));const Xs=E.useMemo(()=>{var te;let $e=[{name:"arrow",enabled:!!Se,options:{element:Se,padding:4}}];return(te=q.popperOptions)!=null&&te.modifiers&&($e=$e.concat(q.popperOptions.modifiers)),k({},q.popperOptions,{modifiers:$e})},[Se,q]),Ht=k({},S,{isRtl:Oe,arrow:P,disableInteractive:Ke,placement:G,PopperComponentProp:K,touch:Re.current}),ir=wd(Ht),bo=(r=(o=J.popper)!=null?o:B.Popper)!=null?r:Ed,vo=(i=(a=(l=J.transition)!=null?l:B.Transition)!=null?a:j)!=null?i:Mr,yo=(c=(u=J.tooltip)!=null?u:B.Tooltip)!=null?c:Td,xo=(p=(f=J.arrow)!=null?f:B.Arrow)!=null?p:kd,Ys=Qt(bo,k({},q,(d=Y.popper)!=null?d:F.popper,{className:Ee(ir.popper,q==null?void 0:q.className,(b=(v=Y.popper)!=null?v:F.popper)==null?void 0:b.className)}),Ht),Js=Qt(vo,k({},Z,(g=Y.transition)!=null?g:F.transition),Ht),Zs=Qt(yo,k({},(h=Y.tooltip)!=null?h:F.tooltip,{className:Ee(ir.tooltip,(T=(I=Y.tooltip)!=null?I:F.tooltip)==null?void 0:T.className)}),Ht),Qs=Qt(xo,k({},(x=Y.arrow)!=null?x:F.arrow,{className:Ee(ir.arrow,(w=(m=Y.arrow)!=null?m:F.arrow)==null?void 0:w.className)}),Ht);return y.jsxs(E.Fragment,{children:[E.cloneElement(oe,_e),y.jsx(bo,k({as:K??Es,placement:G,anchorEl:Q?{getBoundingClientRect:()=>({top:Xt.y,left:Xt.x,right:Xt.x,bottom:Xt.y,width:0,height:0})}:ge,popperRef:rr,open:ge?Xe:!1,id:tr,transition:!0},Ut,Ys,{popperOptions:Xs,children:({TransitionProps:te})=>y.jsx(vo,k({timeout:ye.transitions.duration.shorter},te,Js,{children:y.jsxs(yo,k({},Zs,{children:[re,P?y.jsx(xo,k({},Qs,{ref:Ge})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Ts.propTypes={arrow:s.bool,children:fn.isRequired,classes:s.object,className:s.string,components:s.shape({Arrow:s.elementType,Popper:s.elementType,Tooltip:s.elementType,Transition:s.elementType}),componentsProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),describeChild:s.bool,disableFocusListener:s.bool,disableHoverListener:s.bool,disableInteractive:s.bool,disableTouchListener:s.bool,enterDelay:s.number,enterNextDelay:s.number,enterTouchDelay:s.number,followCursor:s.bool,id:s.string,leaveDelay:s.number,leaveTouchDelay:s.number,onClose:s.func,onOpen:s.func,open:s.bool,placement:s.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:s.elementType,PopperProps:s.object,slotProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),slots:s.shape({arrow:s.elementType,popper:s.elementType,tooltip:s.elementType,transition:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),title:s.node,TransitionComponent:s.elementType,TransitionProps:s.object});const Od=Ts;var no={},ks={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(ks);var Sd=ks.exports,gr={};function Cd(e){return We("MuiSvgIcon",e)}it("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Pd=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Nd=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${He(t)}`,`fontSize${He(n)}`]};return et(o,Cd,r)},Rd=ke("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${He(n.color)}`],t[`fontSize${He(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,a,l,c,u,p,f,d,b,v;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(a=i.pxToRem)==null?void 0:a.call(i,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((u=e.typography)==null||(p=u.pxToRem)==null?void 0:p.call(u,35))||"2.1875rem"}[t.fontSize],color:(f=(d=(e.vars||e).palette)==null||(d=d[t.color])==null?void 0:d.main)!=null?f:{action:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.active,disabled:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.disabled,inherit:void 0}[t.color]}}),ro=E.forwardRef(function(t,n){const r=tt({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:a="inherit",component:l="svg",fontSize:c="medium",htmlColor:u,inheritViewBox:p=!1,titleAccess:f,viewBox:d="0 0 24 24"}=r,b=pe(r,Pd),v=E.isValidElement(o)&&o.type==="svg",g=k({},r,{color:a,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:p,viewBox:d,hasSvgAsChild:v}),h={};p||(h.viewBox=d);const T=Nd(g);return y.jsxs(Rd,k({as:l,className:Ee(T.root,i),focusable:"false",color:u,"aria-hidden":f?void 0:!0,role:f?"img":void 0,ref:n},h,b,v&&o.props,{ownerState:g,children:[v?o.props.children:o,f?y.jsx("title",{children:f}):null]}))});process.env.NODE_ENV!=="production"&&(ro.propTypes={children:s.node,classes:s.object,className:s.string,color:s.oneOfType([s.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),s.string]),component:s.elementType,fontSize:s.oneOfType([s.oneOf(["inherit","large","medium","small"]),s.string]),htmlColor:s.string,inheritViewBox:s.bool,shapeRendering:s.string,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),titleAccess:s.string,viewBox:s.string});ro.muiName="SvgIcon";const di=ro;function Os(e,t){function n(r,o){return y.jsx(di,k({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=di.muiName,E.memo(E.forwardRef(n))}const $d={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Xi.configure(e)}},Md=Object.freeze(Object.defineProperty({__proto__:null,capitalize:He,createChainedFunction:kr,createSvgIcon:Os,debounce:Fi,deprecatedPropType:il,isMuiElement:sl,ownerDocument:Te,ownerWindow:It,requirePropFactory:al,setRef:jn,unstable_ClassNameGenerator:$d,unstable_useEnhancedEffect:vt,unstable_useId:Vi,unsupportedProp:ul,useControlled:zi,useEventCallback:an,useForkRef:Be,useIsFocusVisible:Ui},Symbol.toStringTag,{value:"Module"})),Id=Ba(Md);var fi;function jd(){return fi||(fi=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Id}(gr)),gr}var _d=Sd;Object.defineProperty(no,"__esModule",{value:!0});var Ss=no.default=void 0,Ad=_d(jd()),Dd=y;Ss=no.default=(0,Ad.default)((0,Dd.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function hi(e,t,n){return e?y.jsx(fe.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:y.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function oo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:a=void 0,hasAutoFocus:l=!1,className:c,isDisabled:u=!1,isDense:p=!0,isSubMenuParent:f=!1,hasDisabledGutters:d=!1,hasDivider:b=!1,focusVisibleClassName:v,id:g,children:h}=e,T=y.jsx(fe.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:u,dense:p,disableGutters:d,divider:b,focusVisibleClassName:v,onClick:t,id:g,children:n?y.jsxs(y.Fragment,{children:[hi(i,n,!0),y.jsx(fe.ListItemText,{primary:n,inset:!i&&o}),f?y.jsx(fe.ListItemIcon,{className:"papi-menu-icon-trailing",children:y.jsx(Ss,{})}):hi(a,n,!1)]}):h});return r?y.jsx(Od,{title:r,placement:"right",children:y.jsx("div",{children:T})}):T}function Cs(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Bd(e){const[t,n]=W.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,a=u=>{n(u.currentTarget)},l=()=>{n(void 0)},c=()=>{let u=Cs(i).filter(p=>"menuItem"in p.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return u=u.filter(p=>"menuItem"in p.group&&p.group.menuItem===r.id),y.jsx(io,{...e,includedGroups:u})};return y.jsxs(y.Fragment,{children:[y.jsx(oo,{onClick:a,...o,isSubMenuParent:!0}),y.jsx(fe.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Ld=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function io(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:a}=W.useMemo(()=>{const p=o&&o.length>0?o:Cs(t).filter(v=>!("menuItem"in v.group)),f=Object.values(p).sort((v,g)=>(v.group.order||0)-(g.group.order||0)),d=[];f.forEach(v=>{Ld(v.id,t.items).forEach(g=>d.push({item:g,isLastItemInGroup:!1})),d.length>0&&(d[d.length-1].isLastItemInGroup=!0)}),d.length>0&&(d[d.length-1].isLastItemInGroup=!1);const b=d.some(v=>"iconPathBefore"in v.item&&v.item.iconPathBefore);return{items:d,allowForLeadingIcons:b}},[o,t]),l=({item:p,isLastItemInGroup:f})=>({className:"papi-menu-item",label:p.label,tooltip:p.tooltip,iconPathBefore:"iconPathBefore"in p?p.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in p?p.iconPathAfter:void 0,hasDivider:f,allowForLeadingIcons:a}),[c]=i;if(!c)return y.jsx("div",{});const u=c.item.group;return y.jsx("div",{role:"menu","aria-label":u,children:i.map((p,f)=>{const{item:d}=p,b=l(p);if("command"in d){const v=d.group+f;return y.jsx(oo,{onClick:g=>{n==null||n(g),r(d)},...b},v)}return y.jsx(Bd,{parentMenuItem:d,parentItemProps:b,...e},u+d.id)})},u)}function Fd(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([a,l])=>({id:a,group:l})).filter(a=>"column"in a.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(a=>"column"in a.group&&a.group.column===n)),y.jsx(io,{...e,includedGroups:i})}function Vd({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return y.jsxs(fe.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[y.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),y.jsx(fe.List,{id:n,dense:!0,className:i??"",children:y.jsx(Fd,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Ps({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=W.useMemo(()=>{const a=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,u=o[c];typeof u=="object"&&typeof u.order=="number"&&!Number.isNaN(u.order)?a.set(u.order,{id:c,metadata:u}):console.warn(`Property ${l} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(a.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return y.jsx(fe.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((a,l)=>y.jsx(Vd,{commandHandler:e,menuDefinition:n,...a,className:t},l))})}const Ns=E.createContext({});process.env.NODE_ENV!=="production"&&(Ns.displayName="ListContext");const zd=Ns;function Ud(e){return We("MuiList",e)}it("MuiList",["root","padding","dense","subheader"]);const Hd=["children","className","component","dense","disablePadding","subheader"],qd=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return et({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},Ud,t)},Wd=ke("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>k({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Rs=E.forwardRef(function(t,n){const r=tt({props:t,name:"MuiList"}),{children:o,className:i,component:a="ul",dense:l=!1,disablePadding:c=!1,subheader:u}=r,p=pe(r,Hd),f=E.useMemo(()=>({dense:l}),[l]),d=k({},r,{component:a,dense:l,disablePadding:c}),b=qd(d);return y.jsx(zd.Provider,{value:f,children:y.jsxs(Wd,k({as:a,className:Ee(b.root,i),ref:n,ownerState:d},p,{children:[u,o]}))})});process.env.NODE_ENV!=="production"&&(Rs.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,dense:s.bool,disablePadding:s.bool,subheader:s.node,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const Gd=Rs,Kd=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function br(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function mi(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function $s(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function Yt(e,t,n,r,o,i){let a=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(a)return!1;a=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!$s(l,i)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const Ms=E.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:a,className:l,disabledItemsFocusable:c=!1,disableListWrap:u=!1,onKeyDown:p,variant:f="selectedMenu"}=t,d=pe(t,Kd),b=E.useRef(null),v=E.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});vt(()=>{o&&b.current.focus()},[o]),E.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(x,w)=>{const m=!b.current.style.width;if(x.clientHeight<b.current.clientHeight&&m){const S=`${Hi(Te(x))}px`;b.current.style[w.direction==="rtl"?"paddingLeft":"paddingRight"]=S,b.current.style.width=`calc(100% + ${S})`}return b.current}}),[]);const g=x=>{const w=b.current,m=x.key,S=Te(w).activeElement;if(m==="ArrowDown")x.preventDefault(),Yt(w,S,u,c,br);else if(m==="ArrowUp")x.preventDefault(),Yt(w,S,u,c,mi);else if(m==="Home")x.preventDefault(),Yt(w,null,u,c,br);else if(m==="End")x.preventDefault(),Yt(w,null,u,c,mi);else if(m.length===1){const P=v.current,L=m.toLowerCase(),B=performance.now();P.keys.length>0&&(B-P.lastTime>500?(P.keys=[],P.repeating=!0,P.previousKeyMatched=!0):P.repeating&&L!==P.keys[0]&&(P.repeating=!1)),P.lastTime=B,P.keys.push(L);const F=S&&!P.repeating&&$s(S,P);P.previousKeyMatched&&(F||Yt(w,S,!1,c,br,P))?x.preventDefault():P.previousKeyMatched=!1}p&&p(x)},h=Be(b,n);let T=-1;E.Children.forEach(a,(x,w)=>{if(!E.isValidElement(x)){T===w&&(T+=1,T>=a.length&&(T=-1));return}process.env.NODE_ENV!=="production"&&In.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(f==="selectedMenu"&&x.props.selected||T===-1)&&(T=w),T===w&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(T+=1,T>=a.length&&(T=-1))});const I=E.Children.map(a,(x,w)=>{if(w===T){const m={};return i&&(m.autoFocus=!0),x.props.tabIndex===void 0&&f==="selectedMenu"&&(m.tabIndex=0),E.cloneElement(x,m)}return x});return y.jsx(Gd,k({role:"menu",ref:h,className:l,onKeyDown:g,tabIndex:o?0:-1},d,{children:I}))});process.env.NODE_ENV!=="production"&&(Ms.propTypes={autoFocus:s.bool,autoFocusItem:s.bool,children:s.node,className:s.string,disabledItemsFocusable:s.bool,disableListWrap:s.bool,onKeyDown:s.func,variant:s.oneOf(["menu","selectedMenu"])});const Xd=Ms,Yd=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Jd={entering:{opacity:1},entered:{opacity:1}},Is=E.forwardRef(function(t,n){const r=yn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:a=!0,children:l,easing:c,in:u,onEnter:p,onEntered:f,onEntering:d,onExit:b,onExited:v,onExiting:g,style:h,timeout:T=o,TransitionComponent:I=ys}=t,x=pe(t,Yd),w=E.useRef(null),m=Be(w,l.ref,n),S=D=>A=>{if(D){const M=w.current;A===void 0?D(M):D(M,A)}},P=S(d),L=S((D,A)=>{xs(D);const M=Fn({style:h,timeout:T,easing:c},{mode:"enter"});D.style.webkitTransition=r.transitions.create("opacity",M),D.style.transition=r.transitions.create("opacity",M),p&&p(D,A)}),B=S(f),F=S(g),C=S(D=>{const A=Fn({style:h,timeout:T,easing:c},{mode:"exit"});D.style.webkitTransition=r.transitions.create("opacity",A),D.style.transition=r.transitions.create("opacity",A),b&&b(D)}),$=S(v),R=D=>{i&&i(w.current,D)};return y.jsx(I,k({appear:a,in:u,nodeRef:w,onEnter:L,onEntered:B,onEntering:P,onExit:C,onExited:$,onExiting:F,addEndListener:R,timeout:T},x,{children:(D,A)=>E.cloneElement(l,k({style:k({opacity:0,visibility:D==="exited"&&!u?"hidden":void 0},Jd[D],h,l.props.style),ref:m},A))}))});process.env.NODE_ENV!=="production"&&(Is.propTypes={addEndListener:s.func,appear:s.bool,children:fn.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const Zd=Is;function Qd(e){return We("MuiBackdrop",e)}it("MuiBackdrop",["root","invisible"]);const ef=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],tf=e=>{const{classes:t,invisible:n}=e;return et({root:["root",n&&"invisible"]},Qd,t)},nf=ke("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>k({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),js=E.forwardRef(function(t,n){var r,o,i;const a=tt({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:u="div",components:p={},componentsProps:f={},invisible:d=!1,open:b,slotProps:v={},slots:g={},TransitionComponent:h=Zd,transitionDuration:T}=a,I=pe(a,ef),x=k({},a,{component:u,invisible:d}),w=tf(x),m=(r=v.root)!=null?r:f.root;return y.jsx(h,k({in:b,timeout:T},I,{children:y.jsx(nf,k({"aria-hidden":!0},m,{as:(o=(i=g.root)!=null?i:p.Root)!=null?o:u,className:Ee(w.root,c,m==null?void 0:m.className),ownerState:k({},x,m==null?void 0:m.ownerState),classes:w,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(js.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.object}),invisible:s.bool,open:s.bool.isRequired,slotProps:s.shape({root:s.object}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const rf=js;function of(e){return We("MuiModal",e)}it("MuiModal",["root","hidden","backdrop"]);const sf=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],af=e=>{const{open:t,exited:n,classes:r}=e;return et({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},of,r)},lf=ke("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>k({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),cf=ke(rf,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),_s=E.forwardRef(function(t,n){var r,o,i,a,l,c;const u=tt({name:"MuiModal",props:t}),{BackdropComponent:p=cf,BackdropProps:f,className:d,closeAfterTransition:b=!1,children:v,container:g,component:h,components:T={},componentsProps:I={},disableAutoFocus:x=!1,disableEnforceFocus:w=!1,disableEscapeKeyDown:m=!1,disablePortal:S=!1,disableRestoreFocus:P=!1,disableScrollLock:L=!1,hideBackdrop:B=!1,keepMounted:F=!1,onBackdropClick:C,open:$,slotProps:R,slots:D}=u,A=pe(u,sf),M=k({},u,{closeAfterTransition:b,disableAutoFocus:x,disableEnforceFocus:w,disableEscapeKeyDown:m,disablePortal:S,disableRestoreFocus:P,disableScrollLock:L,hideBackdrop:B,keepMounted:F}),{getRootProps:V,getBackdropProps:ee,getTransitionProps:Q,portalRef:O,isTopModal:_,exited:U,hasTransition:X}=Jl(k({},M,{rootRef:n})),z=k({},M,{exited:U}),H=af(z),G={};if(v.props.tabIndex===void 0&&(G.tabIndex="-1"),X){const{onEnter:Z,onExited:N}=Q();G.onEnter=Z,G.onExited=N}const K=(r=(o=D==null?void 0:D.root)!=null?o:T.Root)!=null?r:lf,q=(i=(a=D==null?void 0:D.backdrop)!=null?a:T.Backdrop)!=null?i:p,Y=(l=R==null?void 0:R.root)!=null?l:I.root,J=(c=R==null?void 0:R.backdrop)!=null?c:I.backdrop,re=yt({elementType:K,externalSlotProps:Y,externalForwardedProps:A,getSlotProps:V,additionalProps:{ref:n,as:h},ownerState:z,className:Ee(d,Y==null?void 0:Y.className,H==null?void 0:H.root,!z.open&&z.exited&&(H==null?void 0:H.hidden))}),j=yt({elementType:q,externalSlotProps:J,additionalProps:f,getSlotProps:Z=>ee(k({},Z,{onClick:N=>{C&&C(N),Z!=null&&Z.onClick&&Z.onClick(N)}})),className:Ee(J==null?void 0:J.className,f==null?void 0:f.className,H==null?void 0:H.backdrop),ownerState:z});return!F&&!$&&(!X||U)?null:y.jsx(ln,{ref:O,container:g,disablePortal:S,children:y.jsxs(K,k({},re,{children:[!B&&p?y.jsx(q,k({},j)):null,y.jsx(_n,{disableEnforceFocus:w,disableAutoFocus:x,disableRestoreFocus:P,isEnabled:_,open:$,children:E.cloneElement(v,G)})]}))})});process.env.NODE_ENV!=="production"&&(_s.propTypes={BackdropComponent:s.elementType,BackdropProps:s.object,children:fn.isRequired,classes:s.object,className:s.string,closeAfterTransition:s.bool,component:s.elementType,components:s.shape({Backdrop:s.elementType,Root:s.elementType}),componentsProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Je,s.func]),disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableEscapeKeyDown:s.bool,disablePortal:s.bool,disableRestoreFocus:s.bool,disableScrollLock:s.bool,hideBackdrop:s.bool,keepMounted:s.bool,onBackdropClick:s.func,onClose:s.func,onTransitionEnter:s.func,onTransitionExited:s.func,open:s.bool.isRequired,slotProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({backdrop:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const uf=_s;function pf(e){return We("MuiPaper",e)}it("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const df=["className","component","elevation","square","variant"],ff=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return et(i,pf,o)},hf=ke("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return k({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&k({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${Ln("#fff",ui(t.elevation))}, ${Ln("#fff",ui(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),As=E.forwardRef(function(t,n){const r=tt({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:a=1,square:l=!1,variant:c="elevation"}=r,u=pe(r,df),p=k({},r,{component:i,elevation:a,square:l,variant:c}),f=ff(p);return process.env.NODE_ENV!=="production"&&yn().shadows[a]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)),y.jsx(hf,k({as:i,ownerState:p,className:Ee(f.root,o),ref:n},u))});process.env.NODE_ENV!=="production"&&(As.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,elevation:Lt(Gi,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:s.bool,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),variant:s.oneOfType([s.oneOf(["elevation","outlined"]),s.string])});const mf=As;function gf(e){return We("MuiPopover",e)}it("MuiPopover",["root","paper"]);const bf=["onEntering"],vf=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],yf=["slotProps"];function gi(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function bi(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function vi(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function $n(e){return typeof e=="function"?e():e}const xf=e=>{const{classes:t}=e;return et({root:["root"],paper:["paper"]},gf,t)},wf=ke(uf,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ds=ke(mf,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Bs=E.forwardRef(function(t,n){var r,o,i;const a=tt({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:u={vertical:"top",horizontal:"left"},anchorPosition:p,anchorReference:f="anchorEl",children:d,className:b,container:v,elevation:g=8,marginThreshold:h=16,open:T,PaperProps:I={},slots:x,slotProps:w,transformOrigin:m={vertical:"top",horizontal:"left"},TransitionComponent:S=Mr,transitionDuration:P="auto",TransitionProps:{onEntering:L}={},disableScrollLock:B=!1}=a,F=pe(a.TransitionProps,bf),C=pe(a,vf),$=(r=w==null?void 0:w.paper)!=null?r:I,R=E.useRef(),D=Be(R,$.ref),A=k({},a,{anchorOrigin:u,anchorReference:f,elevation:g,marginThreshold:h,externalPaperSlotProps:$,transformOrigin:m,TransitionComponent:S,transitionDuration:P,TransitionProps:F}),M=xf(A),V=E.useCallback(()=>{if(f==="anchorPosition")return process.env.NODE_ENV!=="production"&&(p||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),p;const Z=$n(c),N=Z&&Z.nodeType===1?Z:Te(R.current).body,oe=N.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const ye=N.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ye.top===0&&ye.left===0&&ye.right===0&&ye.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:oe.top+gi(oe,u.vertical),left:oe.left+bi(oe,u.horizontal)}},[c,u.horizontal,u.vertical,p,f]),ee=E.useCallback(Z=>({vertical:gi(Z,m.vertical),horizontal:bi(Z,m.horizontal)}),[m.horizontal,m.vertical]),Q=E.useCallback(Z=>{const N={width:Z.offsetWidth,height:Z.offsetHeight},oe=ee(N);if(f==="none")return{top:null,left:null,transformOrigin:vi(oe)};const ye=V();let Oe=ye.top-oe.vertical,ge=ye.left-oe.horizontal;const lt=Oe+N.height,Se=ge+N.width,Ge=It($n(c)),Re=Ge.innerHeight-h,Ke=Ge.innerWidth-h;if(h!==null&&Oe<h){const we=Oe-h;Oe-=we,oe.vertical+=we}else if(h!==null&&lt>Re){const we=lt-Re;Oe-=we,oe.vertical+=we}if(process.env.NODE_ENV!=="production"&&N.height>Re&&N.height&&Re&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${N.height-Re}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),h!==null&&ge<h){const we=ge-h;ge-=we,oe.horizontal+=we}else if(Se>Ke){const we=Se-Ke;ge-=we,oe.horizontal+=we}return{top:`${Math.round(Oe)}px`,left:`${Math.round(ge)}px`,transformOrigin:vi(oe)}},[c,f,V,ee,h]),[O,_]=E.useState(T),U=E.useCallback(()=>{const Z=R.current;if(!Z)return;const N=Q(Z);N.top!==null&&(Z.style.top=N.top),N.left!==null&&(Z.style.left=N.left),Z.style.transformOrigin=N.transformOrigin,_(!0)},[Q]);E.useEffect(()=>(B&&window.addEventListener("scroll",U),()=>window.removeEventListener("scroll",U)),[c,B,U]);const X=(Z,N)=>{L&&L(Z,N),U()},z=()=>{_(!1)};E.useEffect(()=>{T&&U()}),E.useImperativeHandle(l,()=>T?{updatePosition:()=>{U()}}:null,[T,U]),E.useEffect(()=>{if(!T)return;const Z=Fi(()=>{U()}),N=It(c);return N.addEventListener("resize",Z),()=>{Z.clear(),N.removeEventListener("resize",Z)}},[c,T,U]);let H=P;P==="auto"&&!S.muiSupportAuto&&(H=void 0);const G=v||(c?Te($n(c)).body:void 0),K=(o=x==null?void 0:x.root)!=null?o:wf,q=(i=x==null?void 0:x.paper)!=null?i:Ds,Y=yt({elementType:q,externalSlotProps:k({},$,{style:O?$.style:k({},$.style,{opacity:0})}),additionalProps:{elevation:g,ref:D},ownerState:A,className:Ee(M.paper,$==null?void 0:$.className)}),J=yt({elementType:K,externalSlotProps:(w==null?void 0:w.root)||{},externalForwardedProps:C,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:G,open:T},ownerState:A,className:Ee(M.root,b)}),{slotProps:re}=J,j=pe(J,yf);return y.jsx(K,k({},j,!Ji(K)&&{slotProps:re,disableScrollLock:B},{children:y.jsx(S,k({appear:!0,in:T,onEntering:X,onExited:z,timeout:H},F,{children:y.jsx(q,k({},Y,{children:d}))}))}))});process.env.NODE_ENV!=="production"&&(Bs.propTypes={action:Lr,anchorEl:Lt(s.oneOfType([Je,s.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=$n(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),anchorPosition:s.shape({left:s.number.isRequired,top:s.number.isRequired}),anchorReference:s.oneOf(["anchorEl","anchorPosition","none"]),children:s.node,classes:s.object,className:s.string,container:s.oneOfType([Je,s.func]),disableScrollLock:s.bool,elevation:Gi,marginThreshold:s.number,onClose:s.func,open:s.bool.isRequired,PaperProps:s.shape({component:Ja}),slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transformOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object});const Ef=Bs;function Tf(e){return We("MuiMenu",e)}it("MuiMenu",["root","paper","list"]);const kf=["onEntering"],Of=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Sf={vertical:"top",horizontal:"right"},Cf={vertical:"top",horizontal:"left"},Pf=e=>{const{classes:t}=e;return et({root:["root"],paper:["paper"],list:["list"]},Tf,t)},Nf=ke(Ef,{shouldForwardProp:e=>bs(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Rf=ke(Ds,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),$f=ke(Xd,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Ls=E.forwardRef(function(t,n){var r,o;const i=tt({props:t,name:"MuiMenu"}),{autoFocus:a=!0,children:l,className:c,disableAutoFocusItem:u=!1,MenuListProps:p={},onClose:f,open:d,PaperProps:b={},PopoverClasses:v,transitionDuration:g="auto",TransitionProps:{onEntering:h}={},variant:T="selectedMenu",slots:I={},slotProps:x={}}=i,w=pe(i.TransitionProps,kf),m=pe(i,Of),S=yn(),P=S.direction==="rtl",L=k({},i,{autoFocus:a,disableAutoFocusItem:u,MenuListProps:p,onEntering:h,PaperProps:b,transitionDuration:g,TransitionProps:w,variant:T}),B=Pf(L),F=a&&!u&&d,C=E.useRef(null),$=(Q,O)=>{C.current&&C.current.adjustStyleForScrollbar(Q,S),h&&h(Q,O)},R=Q=>{Q.key==="Tab"&&(Q.preventDefault(),f&&f(Q,"tabKeyDown"))};let D=-1;E.Children.map(l,(Q,O)=>{E.isValidElement(Q)&&(process.env.NODE_ENV!=="production"&&In.isFragment(Q)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Q.props.disabled||(T==="selectedMenu"&&Q.props.selected||D===-1)&&(D=O))});const A=(r=I.paper)!=null?r:Rf,M=(o=x.paper)!=null?o:b,V=yt({elementType:I.root,externalSlotProps:x.root,ownerState:L,className:[B.root,c]}),ee=yt({elementType:A,externalSlotProps:M,ownerState:L,className:B.paper});return y.jsx(Nf,k({onClose:f,anchorOrigin:{vertical:"bottom",horizontal:P?"right":"left"},transformOrigin:P?Sf:Cf,slots:{paper:A,root:I.root},slotProps:{root:V,paper:ee},open:d,ref:n,transitionDuration:g,TransitionProps:k({onEntering:$},w),ownerState:L},m,{classes:v,children:y.jsx($f,k({onKeyDown:R,actions:C,autoFocus:a&&(D===-1||u),autoFocusItem:F,variant:T},p,{className:Ee(B.list,p.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(Ls.propTypes={anchorEl:s.oneOfType([Je,s.func]),autoFocus:s.bool,children:s.node,classes:s.object,className:s.string,disableAutoFocusItem:s.bool,MenuListProps:s.object,onClose:s.func,open:s.bool.isRequired,PaperProps:s.object,PopoverClasses:s.object,slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object,variant:s.oneOf(["menu","selectedMenu"])});const Mf=Ls;function If({className:e,commandHandler:t,menuDefinition:n,children:r}){var u;const[o,i]=W.useState(void 0),a=W.useCallback(p=>{p.preventDefault(),i(o===void 0?{mouseX:p.clientX+2,mouseY:p.clientY-6}:void 0)},[o]),l=W.useCallback(()=>{i(void 0)},[]),c=W.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((u=n==null?void 0:n.items)==null?void 0:u.length)??0)===0||!r?r:y.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:a,children:[r,y.jsx(Mf,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:y.jsx(io,{menuDefinition:n,commandHandler:t,onClick:l})})]})}const jf=Os(y.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function _f(e){return{preserveValue:!0,...e}}const Vn=(e,t,n={})=>{const r=W.useRef(t);r.current=t;const o=W.useRef(n);o.current=_f(o.current);const[i,a]=W.useState(()=>r.current),[l,c]=W.useState(!0);return W.useEffect(()=>{let u=!0;return c(!!e),(async()=>{if(e){const p=await e();u&&(a(()=>p),c(!1))}})(),()=>{u=!1,o.current.preserveValue||a(()=>r.current)}},[e]),[i,l]};function Fs({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:i,ariaLabelPrefix:a,children:l}){const[c,u]=W.useState(!1),[p,f]=W.useState(!1),d=W.useCallback(()=>{c&&u(!1),f(!1)},[c]),b=W.useCallback(w=>{w.stopPropagation(),u(m=>{const S=!m;return S&&w.shiftKey?f(!0):S||f(!1),S})},[]),v=W.useCallback(w=>(d(),r(w)),[r,d]),[g,h]=W.useState({top:1,left:1});W.useEffect(()=>{if(c){const w=o==null?void 0:o.current;if(w){const m=w.getBoundingClientRect(),S=window.scrollY,P=window.scrollX,L=m.top+S+w.clientHeight,B=m.left+P;h({top:L,left:B})}}},[c,o]);const[T]=Vn(W.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[I]=Vn(W.useCallback(async()=>(e==null?void 0:e(!0))??n??T,[e,n,T,c]),n??T),x=p&&I?I:T;return y.jsxs(y.Fragment,{children:[y.jsx(fe.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${i??""}`,color:"inherit","aria-label":`${a??""} menu button`,onClick:b,children:l??y.jsx(jf,{})}),y.jsx(fe.Drawer,{className:`papi-menu-drawer ${i??""}`,anchor:"left",variant:"temporary",open:c,onClose:d,PaperProps:{className:"papi-menu-drawer-paper",style:{top:g.top,left:g.left}},children:x?y.jsx(Ps,{className:i,id:`${a??""} main menu`,commandHandler:v,multiColumnMenu:x}):void 0})]})}function Af({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:a="medium",className:l,onClick:c,children:u}){return y.jsx(fe.IconButton,{id:e,disabled:n,edge:i,size:a,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:u})}const Df=xi.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),Vs=E.forwardRef(({className:e,...t},n)=>y.jsx(wi.Root,{ref:n,className:xe(Df(),e),...t}));Vs.displayName=wi.Root.displayName;function dn({id:e,isDisabled:t=!1,hasError:n=!1,helperText:r,label:o,placeholder:i,isRequired:a=!1,className:l,defaultValue:c,value:u,onChange:p,onFocus:f,onBlur:d}){return y.jsxs("div",{className:"pr-inline-grid pr-items-center pr-gap-1.5",children:[y.jsx(Vs,{htmlFor:e,className:xe({"pr-text-red-600":n,"pr-hidden":!o}),children:`${o}${a?"*":""}`}),y.jsx(Dr,{id:e,disabled:t,placeholder:i,required:a,className:xe(l,{"pr-border-red-600":n}),defaultValue:c,value:u,onChange:p,onFocus:f,onBlur:d}),y.jsx("p",{className:xe({"pr-hidden":!r}),children:r})]})}let vr;const yr=()=>(vr||(vr=ue.allBookIds.map(e=>({bookId:e,label:ue.bookIdToEnglishName(e)}))),vr);function Bf({scrRef:e,handleSubmit:t,id:n}){const r=c=>{t(c)},o=(c,u)=>{const f={bookNum:ue.bookIdToNumber(u.bookId),chapterNum:1,verseNum:1};r(f)},i=c=>{t({...e,chapterNum:+c.target.value})},a=c=>{t({...e,verseNum:+c.target.value})},l=W.useMemo(()=>yr()[e.bookNum-1],[e.bookNum]);return y.jsxs("span",{id:n,className:"pr-flex pr-place-items-center",children:[y.jsx(Mn,{title:"Book",className:"papi-ref-selector book",value:l,options:yr(),onChange:o,isClearable:!1,width:200}),y.jsx(ut,{onClick:()=>r(ze.offsetBook(e,-1)),isDisabled:e.bookNum<=ze.FIRST_SCR_BOOK_NUM,children:"<"}),y.jsx(ut,{onClick:()=>r(ze.offsetBook(e,1)),isDisabled:e.bookNum>=yr().length,children:">"}),y.jsx(dn,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),y.jsx(ut,{onClick:()=>t(ze.offsetChapter(e,-1)),isDisabled:e.chapterNum<=ze.FIRST_SCR_CHAPTER_NUM,children:"<"}),y.jsx(ut,{onClick:()=>t(ze.offsetChapter(e,1)),isDisabled:e.chapterNum>=ze.getChaptersForBook(e.bookNum),children:">"}),y.jsx(dn,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:a}),y.jsx(ut,{onClick:()=>t(ze.offsetVerse(e,-1)),isDisabled:e.verseNum<=ze.FIRST_SCR_VERSE_NUM,children:"<"}),y.jsx(ut,{onClick:()=>t(ze.offsetVerse(e,1)),children:">"})]})}function Lf({onSearch:e,placeholder:t}){const[n,r]=W.useState(""),o=i=>{r(i),e(i)};return y.jsx(fe.Paper,{component:"form",className:"search-bar-paper",children:y.jsx(dn,{className:"search-bar-input",placeholder:t,value:n,onChange:i=>o(i.target.value)})})}function Ff({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:a=!1,defaultValue:l,value:c,valueLabelDisplay:u="off",className:p,onChange:f,onChangeCommitted:d}){return y.jsx(fe.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:a,defaultValue:l,value:c,valueLabelDisplay:u,className:`papi-slider ${n} ${p??""}`,onChange:f,onChangeCommitted:d})}function Vf({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:a,children:l}){const c={action:(a==null?void 0:a.action)||l,message:a==null?void 0:a.message,className:r};return y.jsx(fe.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:c})}function zf({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return y.jsx(fe.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function yi({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return y.jsx(dn,{defaultValue:t[n.key],onChange:r})}const Uf=({onChange:e,disabled:t,checked:n,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return y.jsx(Mi,{...r,isChecked:n,isDisabled:t,onChange:o})};function Hf({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:a,defaultColumnSortable:l=!0,defaultColumnResizable:c=!0,rows:u,enableSelectColumn:p,selectColumnWidth:f=50,rowKeyGetter:d,rowHeight:b=35,headerRowHeight:v=35,selectedRows:g,onSelectedRowsChange:h,onRowsChange:T,onCellClick:I,onCellDoubleClick:x,onCellContextMenu:w,onCellKeyDown:m,direction:S="ltr",enableVirtualization:P=!0,onCopy:L,onPaste:B,onScroll:F,className:C,"data-testid":$}){const R=W.useMemo(()=>{const D=e.map(A=>typeof A.editable=="function"?{...A,editable:V=>!!A.editable(V),renderEditCell:A.renderEditCell||yi}:A.editable&&!A.renderEditCell?{...A,renderEditCell:yi}:A.renderEditCell&&!A.editable?{...A,editable:!1}:A);return p?[{...wo.SelectColumn,minWidth:f},...D]:D},[e,p,f]);return y.jsx(wo,{columns:R,defaultColumnOptions:{width:o,minWidth:i,maxWidth:a,sortable:l,resizable:c},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:u,rowKeyGetter:d,rowHeight:b,headerRowHeight:v,selectedRows:g,onSelectedRowsChange:h,onRowsChange:T,onCellClick:I,onCellDoubleClick:x,onCellContextMenu:w,onCellKeyDown:m,direction:S,enableVirtualization:P,onCopy:L,onPaste:B,onScroll:F,renderers:{renderCheckbox:Uf},className:`papi-table ${C??"rdg-light"}`,"data-testid":$})}function qf({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const i=W.useRef(void 0);return y.jsx("div",{ref:i,style:{position:"relative"},children:y.jsx(fe.AppBar,{position:"static",id:r,children:y.jsxs(fe.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?y.jsx(Fs,{commandHandler:t,containerRef:i,menuProvider:e}):void 0,o?y.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Wf=(e,t)=>{W.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},xr=()=>!1,Gf=(e,t)=>{const[n]=Vn(W.useCallback(async()=>{if(!e)return xr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),xr,{preserveValue:!1});W.useEffect(()=>()=>{n!==xr&&n()},[n])};exports.BookChapterControl=ja;exports.Button=ut;exports.ChapterRangeSelector=Aa;exports.Checkbox=Mi;exports.ComboBox=Mn;exports.ContextMenu=If;exports.GridMenu=Ps;exports.HamburgerMenuButton=Fs;exports.IconButton=Af;exports.LabelPosition=ft;exports.MenuItem=oo;exports.RefSelector=Bf;exports.SearchBar=Lf;exports.Slider=Ff;exports.Snackbar=Vf;exports.Switch=zf;exports.Table=Hf;exports.TextField=dn;exports.Toolbar=qf;exports.useEvent=Wf;exports.useEventAsync=Gf;exports.usePromise=Vn;function Kf(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Kf(`.papi-icon-button {
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
.pr-inline-flex {
    display: inline-flex;
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
.pr-h-9 {
    height: 2.25rem;
}
.pr-h-px {
    height: 1px;
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
.pr-place-items-center {
    place-items: center;
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
.pr-self-stretch {
    align-self: stretch;
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
.pr-border-input {
    border-color: hsl(var(--input));
}
.pr-border-red-600 {
    --tw-border-opacity: 1;
    border-color: rgb(220 38 38 / var(--tw-border-opacity));
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
.pr-leading-none {
    line-height: 1;
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
.pr-text-destructive-foreground {
    color: hsl(var(--destructive-foreground));
}
.pr-text-gray-500 {
    --tw-text-opacity: 1;
    color: rgb(107 114 128 / var(--tw-text-opacity));
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
.pr-text-yellow-900 {
    --tw-text-opacity: 1;
    color: rgb(113 63 18 / var(--tw-text-opacity));
}
.pr-underline-offset-4 {
    text-underline-offset: 4px;
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
.pr-peer:disabled ~ .peer-disabled\\:pr-cursor-not-allowed {
    cursor: not-allowed;
}
.pr-peer:disabled ~ .peer-disabled\\:pr-opacity-70 {
    opacity: 0.7;
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
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
