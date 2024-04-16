"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const y=require("react/jsx-runtime"),X=require("react"),ze=require("platform-bible-utils"),Gs=require("@radix-ui/react-dropdown-menu"),mt=require("lucide-react"),we=require("clsx"),Ks=require("tailwind-merge"),pe=require("@mui/material"),vr=require("@mui/styled-engine"),Yt=require("react-dom"),vo=require("react-data-grid");function Rr(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const E=Rr(X),be=Rr(Gs),Xs=Rr(Yt);var Ys=Object.defineProperty,Js=(e,t,n)=>t in e?Ys(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ne=(e,t,n)=>(Js(e,typeof t!="symbol"?t+"":t,n),n);const bt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],$r=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],gi=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],yo=aa();function Bt(e,t=!0){return t&&(e=e.toUpperCase()),e in yo?yo[e]:0}function Mr(e){return Bt(e)>0}function Zs(e){const t=typeof e=="string"?Bt(e):e;return t>=40&&t<=66}function Qs(e){return(typeof e=="string"?Bt(e):e)<=39}function bi(e){return e<=66}function ea(e){const t=typeof e=="string"?Bt(e):e;return xi(t)&&!bi(t)}function*ta(){for(let e=1;e<=bt.length;e++)yield e}const na=1,vi=bt.length;function ra(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function jr(e,t="***"){const n=e-1;return n<0||n>=bt.length?t:bt[n]}function yi(e){return e<=0||e>vi?"******":gi[e-1]}function oa(e){return yi(Bt(e))}function xi(e){const t=typeof e=="number"?jr(e):e;return Mr(t)&&!$r.includes(t)}function ia(e){const t=typeof e=="number"?jr(e):e;return Mr(t)&&$r.includes(t)}function sa(e){return gi[e-1].includes("*obsolete*")}function aa(){const e={};for(let t=0;t<bt.length;t++)e[bt[t]]=t+1;return e}const de={allBookIds:bt,nonCanonicalIds:$r,bookIdToNumber:Bt,isBookIdValid:Mr,isBookNT:Zs,isBookOT:Qs,isBookOTNT:bi,isBookDC:ea,allBookNumbers:ta,firstBook:na,lastBook:vi,extraBooks:ra,bookNumberToId:jr,bookNumberToEnglishName:yi,bookIdToEnglishName:oa,isCanonical:xi,isExtraMaterial:ia,isObsolete:sa};var rt=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(rt||{});const $e=class{constructor(t){if(ne(this,"name"),ne(this,"fullPath"),ne(this,"isPresent"),ne(this,"hasVerseSegments"),ne(this,"isCustomized"),ne(this,"baseVersification"),ne(this,"scriptureBooks"),ne(this,"_type"),t!=null)typeof t=="string"?this.name=t:this._type=t;else throw new Error("Argument null")}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ne($e,"Original",new $e(rt.Original)),ne($e,"Septuagint",new $e(rt.Septuagint)),ne($e,"Vulgate",new $e(rt.Vulgate)),ne($e,"English",new $e(rt.English)),ne($e,"RussianProtestant",new $e(rt.RussianProtestant)),ne($e,"RussianOrthodox",new $e(rt.RussianOrthodox));let Nt=$e;function xo(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var wi=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(wi||{});const Se=class ie{constructor(t,n,r,o){if(ne(this,"firstChapter"),ne(this,"lastChapter"),ne(this,"lastVerse"),ne(this,"hasSegmentsDefined"),ne(this,"text"),ne(this,"BBBCCCVVVS"),ne(this,"longHashCode"),ne(this,"versification"),ne(this,"rtlMark","‏"),ne(this,"_bookNum",0),ne(this,"_chapterNum",0),ne(this,"_verseNum",0),ne(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,a=n!=null&&n instanceof Nt?n:void 0;this.setEmpty(a),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof Nt?n:void 0;this.setEmpty(i),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ie){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof Nt?t:ie.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(t,n=ie.defaultVersification){const r=new ie(n);return r.parse(t),r}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=ie.parse(t),{success:!0,verseRef:n}}catch(r){if(r instanceof qt)return n=new ie,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ie.bcvMaxValue*ie.bookDigitShifter+(n>=0?n%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(r>=0?r%ie.bcvMaxValue:0)}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>ie.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return de.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=de.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ie.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>de.lastBook)throw new qt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Nt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const a=+i[1].trim();this.versification=new Nt(rt[a])}catch{throw new qt("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new qt("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||de.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(r[1]))throw new qt("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification):!1}allVerses(t=!1,n=ie.verseRangeSeparators,r=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=xo(this._verse,r);for(const a of i.map(c=>xo(c,n))){const c=this.clone();c.verse=a[0];const l=c.verseNum;if(o.push(c),a.length>1){const u=this.clone();if(u.verse=a[1],!t)for(let d=l+1;d<u.verseNum;d++){const f=new ie(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(f)}o.push(u)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const a=o.BBBCCCVVV;if(r>a)return 3;if(r===a)return 4;r=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>de.lastBook?2:(de.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=de.bookIdToNumber(t),this.chapter=n,this.verse=r}};ne(Se,"defaultVersification",Nt.English),ne(Se,"verseRangeSeparator","-"),ne(Se,"verseSequenceIndicator",","),ne(Se,"verseRangeSeparators",[Se.verseRangeSeparator]),ne(Se,"verseSequenceIndicators",[Se.verseSequenceIndicator]),ne(Se,"chapterDigitShifter",1e3),ne(Se,"bookDigitShifter",Se.chapterDigitShifter*Se.chapterDigitShifter),ne(Se,"bcvMaxValue",Se.chapterDigitShifter-1),ne(Se,"ValidStatusType",wi);class qt extends Error{}function je(...e){return Ks.twMerge(we.clsx(e))}const la=be.Root,ca=be.Trigger,ua=E.forwardRef(({className:e,inset:t,children:n,...r},o)=>y.jsxs(be.SubTrigger,{ref:o,className:je("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,y.jsx(mt.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));ua.displayName=be.SubTrigger.displayName;const da=E.forwardRef(({className:e,...t},n)=>y.jsx(be.SubContent,{ref:n,className:je("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));da.displayName=be.SubContent.displayName;const Ei=E.forwardRef(({className:e,sideOffset:t=4,...n},r)=>y.jsx(be.Portal,{children:y.jsx(be.Content,{ref:r,sideOffset:t,className:je("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));Ei.displayName=be.Content.displayName;const Ti=E.forwardRef(({className:e,inset:t,...n},r)=>y.jsx(be.Item,{ref:r,className:je("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));Ti.displayName=be.Item.displayName;const pa=E.forwardRef(({className:e,children:t,checked:n,...r},o)=>y.jsxs(be.CheckboxItem,{ref:o,className:je("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[y.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:y.jsx(be.ItemIndicator,{children:y.jsx(mt.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));pa.displayName=be.CheckboxItem.displayName;const fa=E.forwardRef(({className:e,children:t,...n},r)=>y.jsxs(be.RadioItem,{ref:r,className:je("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[y.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:y.jsx(be.ItemIndicator,{children:y.jsx(mt.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));fa.displayName=be.RadioItem.displayName;const Ir=E.forwardRef(({className:e,inset:t,...n},r)=>y.jsx(be.Label,{ref:r,className:je("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));Ir.displayName=be.Label.displayName;const ki=E.forwardRef(({className:e,...t},n)=>y.jsx(be.Separator,{ref:n,className:je("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));ki.displayName=be.Separator.displayName;const Oi=E.forwardRef(({className:e,type:t,...n},r)=>y.jsx("input",{type:t,className:je("pr-flex pr-h-10 pr-w-full pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));Oi.displayName="Input";const ha=X.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,...r},o)=>y.jsxs("div",{className:"pr-relative",children:[y.jsx(Oi,{...r,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:i=>e(i.target.value),onKeyDown:t,onClick:n,ref:o}),y.jsx(mt.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function ma({handleSelectChapter:e,endChapter:t,activeChapter:n,isHighlighted:r,highlightedChapter:o,handleHighlightedChapter:i}){const a=Array.from({length:t},(l,u)=>u+1),c=X.useCallback(l=>{i(l),console.log("new highlighted chapter: ",l)},[i]);return console.log("Chapter select re-rendered. isHighligthed value: ",r),y.jsx("div",{className:je("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch",{"pr-bg-amber-50":!r,"pr-bg-amber-100":r}),children:a.map(l=>y.jsx("div",{className:je("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===n,"pr-bg-amber-200":l===o}),onClick:()=>e(l),role:"button",onKeyDown:u=>{u.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>c(l),children:l},l))})}function ga({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:i,children:a}){const c=()=>{console.log("book ",de.bookIdToEnglishName(e),"has focus"),r()};return y.jsxs(Ti,{textValue:e,className:je("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:l=>{l.preventDefault(),t()},onKeyDown:l=>{o(l)},onFocus:c,onMouseMove:c,children:[y.jsx("span",{className:je("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":i.toLowerCase()==="ot","pr-border-l-purple-200":i.toLowerCase()==="nt","pr-border-l-indigo-200":i.toLowerCase()==="dc"}),children:de.bookIdToEnglishName(e)}),n&&y.jsx("div",{children:a})]},e)}function ba({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return y.jsxs(Ir,{className:"pr-flex pr-justify-between",children:[y.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),y.jsxs("div",{className:"pr-flex pr-items-center",children:[y.jsx(mt.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),y.jsx(mt.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),y.jsx(mt.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const va={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ya=["OT","NT","DC"];function xa({scrRef:e,handleSubmit:t}){const{allBookIds:n}=de,[r,o]=X.useState(""),[i,a]=X.useState(""),[c,l]=X.useState(0),[u,d]=X.useState(""),[f,p]=X.useState(!1),b=X.useRef(void 0),v=X.useRef(void 0),g=X.useCallback(S=>({OT:n.filter(M=>de.isBookOT(M)),NT:n.filter(M=>de.isBookNT(M)),DC:n.filter(M=>de.isBookDC(M))})[S],[n]),h=X.useCallback(S=>g(S).filter(N=>de.bookIdToEnglishName(N).toLowerCase().includes(r.toLowerCase())||N.toLowerCase().includes(r.toLowerCase())),[g,r]),T=S=>{o(S)},$=X.useCallback(S=>ze.getChaptersForBook(de.bookIdToNumber(S)),[]),x=S=>{l(de.bookNumberToId(e.bookNum)!==S?1:e.chapterNum),a(i!==S?S:""),$(S)===-1&&(t({bookNum:de.bookIdToNumber(S),chapterNum:1,verseNum:1}),p(!1),o(""))},w=S=>{S<=0||S>$(i)||(t({bookNum:de.bookIdToNumber(i),chapterNum:S,verseNum:1}),p(!1),o(""))},m=X.useCallback(S=>{!S&&document.activeElement===b.current?p(!0):p(S)},[]),C=X.useCallback(()=>{p(!0)},[]),P=S=>{console.log("content key down processed");const{key:N}=S;N==="ArrowRight"||N==="ArrowLeft"||N==="ArrowDown"||N==="ArrowUp"||N==="Enter"||b.current.focus()},D=S=>{const{key:N}=S;if(u===i){if(N==="Enter"){w(c);return}let M=0;if(N==="ArrowRight")if(c<$(u))M=1;else{S.preventDefault();return}else if(N==="ArrowLeft")if(c>1)M=-1;else{S.preventDefault();return}else N==="ArrowDown"?M=6:N==="ArrowUp"&&(M=-6);c+M<=0||c+M>$(u)?l(0):(l(c+M),S.preventDefault())}};return X.useEffect(()=>{i===u?i===de.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[u,e.bookNum,e.chapterNum,i]),X.useEffect(()=>{f&&(a(de.bookNumberToId(e.bookNum)),l(e.chapterNum))},[f,e.bookNum,e.chapterNum]),y.jsx("div",{children:y.jsxs(la,{modal:!1,open:f,onOpenChange:m,children:[y.jsx(ca,{asChild:!0,children:y.jsx(ha,{ref:b,value:r,handleSearch:T,handleKeyDown:C,handleOnClick:()=>{a(de.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0)},placeholder:`${de.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),y.jsxs(Ei,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:P,onBlur:()=>d(""),align:"start",ref:v,children:[y.jsx(ba,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),ya.map(S=>h(S).length>0&&y.jsxs("div",{children:[y.jsx(Ir,{className:"pr-font-semibold pr-text-slate-700",children:va[S]}),h(S).map(N=>y.jsx("div",{children:y.jsx(ga,{bookId:N,handleSelectBook:()=>x(N),isSelected:i===N,handleHighlightBook:()=>d(N),handleKeyDown:D,bookType:S,children:y.jsx(ma,{handleSelectChapter:w,endChapter:$(N),activeChapter:e.bookNum===de.bookIdToNumber(N)?e.chapterNum:0,isHighlighted:i===u,highlightedChapter:c,handleHighlightedChapter:M=>{l(M)}})})},N)),S==="OT"||S==="NT"?y.jsx(ki,{}):void 0]},S))]})]})})}function ut({id:e,isDisabled:t=!1,className:n,onClick:r,onContextMenu:o,children:i}){return y.jsx(pe.Button,{id:e,disabled:t,className:`papi-button ${n??""}`,onClick:r,onContextMenu:o,children:i})}function Rn({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:a,options:c=[],className:l,value:u,onChange:d,onFocus:f,onBlur:p,getOptionLabel:b}){return y.jsx(pe.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:i,options:c,className:`papi-combo-box ${o?"error":""} ${l??""}`,value:u,onChange:d,onFocus:f,onBlur:p,getOptionLabel:b,renderInput:v=>y.jsx(pe.TextField,{...v,error:o,fullWidth:i,disabled:n,label:t,style:{width:a}})})}function wa({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o,chapterCount:i}){const a=X.useMemo(()=>Array.from({length:i},(u,d)=>d+1),[i]),c=(u,d)=>{n(d),d>t&&r(d)},l=(u,d)=>{r(d),d<e&&n(d)};return y.jsxs(y.Fragment,{children:[y.jsx(pe.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:y.jsx(Rn,{onChange:(u,d)=>c(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),y.jsx(pe.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:y.jsx(Rn,{onChange:(u,d)=>l(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:t,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var ft=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(ft||{});function Si({id:e,isChecked:t,labelText:n="",labelPosition:r=ft.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:a=!1,hasError:c=!1,className:l,onChange:u}){const d=y.jsx(pe.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:a,className:`papi-checkbox ${c?"error":""} ${l??""}`,onChange:u});let f;if(n){const p=r===ft.Before||r===ft.Above,b=y.jsx("span",{className:`papi-checkbox-label ${c?"error":""} ${l??""}`,children:n}),v=r===ft.Before||r===ft.After,g=v?b:y.jsx("div",{children:b}),h=v?d:y.jsx("div",{children:d});f=y.jsxs(pe.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:a,error:c,children:[p&&g,h,!p&&g]})}else f=d;return f}function ue(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},k.apply(this,arguments)}function Ea(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Ta(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var yr={exports:{}},wn={exports:{}},se={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wo;function ka(){if(wo)return se;wo=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,l=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,T=e?Symbol.for("react.responder"):60118,$=e?Symbol.for("react.scope"):60119;function x(m){if(typeof m=="object"&&m!==null){var C=m.$$typeof;switch(C){case t:switch(m=m.type,m){case l:case u:case r:case i:case o:case f:return m;default:switch(m=m&&m.$$typeof,m){case c:case d:case v:case b:case a:return m;default:return C}}case n:return C}}}function w(m){return x(m)===u}return se.AsyncMode=l,se.ConcurrentMode=u,se.ContextConsumer=c,se.ContextProvider=a,se.Element=t,se.ForwardRef=d,se.Fragment=r,se.Lazy=v,se.Memo=b,se.Portal=n,se.Profiler=i,se.StrictMode=o,se.Suspense=f,se.isAsyncMode=function(m){return w(m)||x(m)===l},se.isConcurrentMode=w,se.isContextConsumer=function(m){return x(m)===c},se.isContextProvider=function(m){return x(m)===a},se.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===t},se.isForwardRef=function(m){return x(m)===d},se.isFragment=function(m){return x(m)===r},se.isLazy=function(m){return x(m)===v},se.isMemo=function(m){return x(m)===b},se.isPortal=function(m){return x(m)===n},se.isProfiler=function(m){return x(m)===i},se.isStrictMode=function(m){return x(m)===o},se.isSuspense=function(m){return x(m)===f},se.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===r||m===u||m===i||m===o||m===f||m===p||typeof m=="object"&&m!==null&&(m.$$typeof===v||m.$$typeof===b||m.$$typeof===a||m.$$typeof===c||m.$$typeof===d||m.$$typeof===h||m.$$typeof===T||m.$$typeof===$||m.$$typeof===g)},se.typeOf=x,se}var ae={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Eo;function Oa(){return Eo||(Eo=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,l=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,T=e?Symbol.for("react.responder"):60118,$=e?Symbol.for("react.scope"):60119;function x(I){return typeof I=="string"||typeof I=="function"||I===r||I===u||I===i||I===o||I===f||I===p||typeof I=="object"&&I!==null&&(I.$$typeof===v||I.$$typeof===b||I.$$typeof===a||I.$$typeof===c||I.$$typeof===d||I.$$typeof===h||I.$$typeof===T||I.$$typeof===$||I.$$typeof===g)}function w(I){if(typeof I=="object"&&I!==null){var Z=I.$$typeof;switch(Z){case t:var R=I.type;switch(R){case l:case u:case r:case i:case o:case f:return R;default:var oe=R&&R.$$typeof;switch(oe){case c:case d:case v:case b:case a:return oe;default:return Z}}case n:return Z}}}var m=l,C=u,P=c,D=a,S=t,N=d,M=r,z=v,W=b,L=n,A=i,j=o,B=f,ee=!1;function Q(I){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),O(I)||w(I)===l}function O(I){return w(I)===u}function _(I){return w(I)===c}function V(I){return w(I)===a}function K(I){return typeof I=="object"&&I!==null&&I.$$typeof===t}function F(I){return w(I)===d}function U(I){return w(I)===r}function q(I){return w(I)===v}function G(I){return w(I)===b}function H(I){return w(I)===n}function Y(I){return w(I)===i}function J(I){return w(I)===o}function re(I){return w(I)===f}ae.AsyncMode=m,ae.ConcurrentMode=C,ae.ContextConsumer=P,ae.ContextProvider=D,ae.Element=S,ae.ForwardRef=N,ae.Fragment=M,ae.Lazy=z,ae.Memo=W,ae.Portal=L,ae.Profiler=A,ae.StrictMode=j,ae.Suspense=B,ae.isAsyncMode=Q,ae.isConcurrentMode=O,ae.isContextConsumer=_,ae.isContextProvider=V,ae.isElement=K,ae.isForwardRef=F,ae.isFragment=U,ae.isLazy=q,ae.isMemo=G,ae.isPortal=H,ae.isProfiler=Y,ae.isStrictMode=J,ae.isSuspense=re,ae.isValidElementType=x,ae.typeOf=w}()),ae}var To;function Ci(){return To||(To=1,process.env.NODE_ENV==="production"?wn.exports=ka():wn.exports=Oa()),wn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var rr,ko;function Sa(){if(ko)return rr;ko=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var a={},c=0;c<10;c++)a["_"+String.fromCharCode(c)]=c;var l=Object.getOwnPropertyNames(a).map(function(d){return a[d]});if(l.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(d){u[d]=d}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return rr=o()?Object.assign:function(i,a){for(var c,l=r(i),u,d=1;d<arguments.length;d++){c=Object(arguments[d]);for(var f in c)t.call(c,f)&&(l[f]=c[f]);if(e){u=e(c);for(var p=0;p<u.length;p++)n.call(c,u[p])&&(l[u[p]]=c[u[p]])}}return l},rr}var or,Oo;function _r(){if(Oo)return or;Oo=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return or=e,or}var ir,So;function Pi(){return So||(So=1,ir=Function.call.bind(Object.prototype.hasOwnProperty)),ir}var sr,Co;function Ca(){if(Co)return sr;Co=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=_r(),n={},r=Pi();e=function(i){var a="Warning: "+i;typeof console<"u"&&console.error(a);try{throw new Error(a)}catch{}}}function o(i,a,c,l,u){if(process.env.NODE_ENV!=="production"){for(var d in i)if(r(i,d)){var f;try{if(typeof i[d]!="function"){var p=Error((l||"React class")+": "+c+" type `"+d+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[d]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw p.name="Invariant Violation",p}f=i[d](a,d,l,c,null,t)}catch(v){f=v}if(f&&!(f instanceof Error)&&e((l||"React class")+": type specification of "+c+" `"+d+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in n)){n[f.message]=!0;var b=u?u():"";e("Failed "+c+" type: "+f.message+(b??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},sr=o,sr}var ar,Po;function Pa(){if(Po)return ar;Po=1;var e=Ci(),t=Sa(),n=_r(),r=Pi(),o=Ca(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(c){var l="Warning: "+c;typeof console<"u"&&console.error(l);try{throw new Error(l)}catch{}});function a(){return null}return ar=function(c,l){var u=typeof Symbol=="function"&&Symbol.iterator,d="@@iterator";function f(O){var _=O&&(u&&O[u]||O[d]);if(typeof _=="function")return _}var p="<<anonymous>>",b={array:T("array"),bigint:T("bigint"),bool:T("boolean"),func:T("function"),number:T("number"),object:T("object"),string:T("string"),symbol:T("symbol"),any:$(),arrayOf:x,element:w(),elementType:m(),instanceOf:C,node:N(),objectOf:D,oneOf:P,oneOfType:S,shape:z,exact:W};function v(O,_){return O===_?O!==0||1/O===1/_:O!==O&&_!==_}function g(O,_){this.message=O,this.data=_&&typeof _=="object"?_:{},this.stack=""}g.prototype=Error.prototype;function h(O){if(process.env.NODE_ENV!=="production")var _={},V=0;function K(U,q,G,H,Y,J,re){if(H=H||p,J=J||G,re!==n){if(l){var I=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw I.name="Invariant Violation",I}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var Z=H+":"+G;!_[Z]&&V<3&&(i("You are manually calling a React.PropTypes validation function for the `"+J+"` prop on `"+H+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),_[Z]=!0,V++)}}return q[G]==null?U?q[G]===null?new g("The "+Y+" `"+J+"` is marked as required "+("in `"+H+"`, but its value is `null`.")):new g("The "+Y+" `"+J+"` is marked as required in "+("`"+H+"`, but its value is `undefined`.")):null:O(q,G,H,Y,J)}var F=K.bind(null,!1);return F.isRequired=K.bind(null,!0),F}function T(O){function _(V,K,F,U,q,G){var H=V[K],Y=j(H);if(Y!==O){var J=B(H);return new g("Invalid "+U+" `"+q+"` of type "+("`"+J+"` supplied to `"+F+"`, expected ")+("`"+O+"`."),{expectedType:O})}return null}return h(_)}function $(){return h(a)}function x(O){function _(V,K,F,U,q){if(typeof O!="function")return new g("Property `"+q+"` of component `"+F+"` has invalid PropType notation inside arrayOf.");var G=V[K];if(!Array.isArray(G)){var H=j(G);return new g("Invalid "+U+" `"+q+"` of type "+("`"+H+"` supplied to `"+F+"`, expected an array."))}for(var Y=0;Y<G.length;Y++){var J=O(G,Y,F,U,q+"["+Y+"]",n);if(J instanceof Error)return J}return null}return h(_)}function w(){function O(_,V,K,F,U){var q=_[V];if(!c(q)){var G=j(q);return new g("Invalid "+F+" `"+U+"` of type "+("`"+G+"` supplied to `"+K+"`, expected a single ReactElement."))}return null}return h(O)}function m(){function O(_,V,K,F,U){var q=_[V];if(!e.isValidElementType(q)){var G=j(q);return new g("Invalid "+F+" `"+U+"` of type "+("`"+G+"` supplied to `"+K+"`, expected a single ReactElement type."))}return null}return h(O)}function C(O){function _(V,K,F,U,q){if(!(V[K]instanceof O)){var G=O.name||p,H=Q(V[K]);return new g("Invalid "+U+" `"+q+"` of type "+("`"+H+"` supplied to `"+F+"`, expected ")+("instance of `"+G+"`."))}return null}return h(_)}function P(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),a;function _(V,K,F,U,q){for(var G=V[K],H=0;H<O.length;H++)if(v(G,O[H]))return null;var Y=JSON.stringify(O,function(re,I){var Z=B(I);return Z==="symbol"?String(I):I});return new g("Invalid "+U+" `"+q+"` of value `"+String(G)+"` "+("supplied to `"+F+"`, expected one of "+Y+"."))}return h(_)}function D(O){function _(V,K,F,U,q){if(typeof O!="function")return new g("Property `"+q+"` of component `"+F+"` has invalid PropType notation inside objectOf.");var G=V[K],H=j(G);if(H!=="object")return new g("Invalid "+U+" `"+q+"` of type "+("`"+H+"` supplied to `"+F+"`, expected an object."));for(var Y in G)if(r(G,Y)){var J=O(G,Y,F,U,q+"."+Y,n);if(J instanceof Error)return J}return null}return h(_)}function S(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),a;for(var _=0;_<O.length;_++){var V=O[_];if(typeof V!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ee(V)+" at index "+_+"."),a}function K(F,U,q,G,H){for(var Y=[],J=0;J<O.length;J++){var re=O[J],I=re(F,U,q,G,H,n);if(I==null)return null;I.data&&r(I.data,"expectedType")&&Y.push(I.data.expectedType)}var Z=Y.length>0?", expected one of type ["+Y.join(", ")+"]":"";return new g("Invalid "+G+" `"+H+"` supplied to "+("`"+q+"`"+Z+"."))}return h(K)}function N(){function O(_,V,K,F,U){return L(_[V])?null:new g("Invalid "+F+" `"+U+"` supplied to "+("`"+K+"`, expected a ReactNode."))}return h(O)}function M(O,_,V,K,F){return new g((O||"React class")+": "+_+" type `"+V+"."+K+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+F+"`.")}function z(O){function _(V,K,F,U,q){var G=V[K],H=j(G);if(H!=="object")return new g("Invalid "+U+" `"+q+"` of type `"+H+"` "+("supplied to `"+F+"`, expected `object`."));for(var Y in O){var J=O[Y];if(typeof J!="function")return M(F,U,q,Y,B(J));var re=J(G,Y,F,U,q+"."+Y,n);if(re)return re}return null}return h(_)}function W(O){function _(V,K,F,U,q){var G=V[K],H=j(G);if(H!=="object")return new g("Invalid "+U+" `"+q+"` of type `"+H+"` "+("supplied to `"+F+"`, expected `object`."));var Y=t({},V[K],O);for(var J in Y){var re=O[J];if(r(O,J)&&typeof re!="function")return M(F,U,q,J,B(re));if(!re)return new g("Invalid "+U+" `"+q+"` key `"+J+"` supplied to `"+F+"`.\nBad object: "+JSON.stringify(V[K],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(O),null,"  "));var I=re(G,J,F,U,q+"."+J,n);if(I)return I}return null}return h(_)}function L(O){switch(typeof O){case"number":case"string":case"undefined":return!0;case"boolean":return!O;case"object":if(Array.isArray(O))return O.every(L);if(O===null||c(O))return!0;var _=f(O);if(_){var V=_.call(O),K;if(_!==O.entries){for(;!(K=V.next()).done;)if(!L(K.value))return!1}else for(;!(K=V.next()).done;){var F=K.value;if(F&&!L(F[1]))return!1}}else return!1;return!0;default:return!1}}function A(O,_){return O==="symbol"?!0:_?_["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&_ instanceof Symbol:!1}function j(O){var _=typeof O;return Array.isArray(O)?"array":O instanceof RegExp?"object":A(_,O)?"symbol":_}function B(O){if(typeof O>"u"||O===null)return""+O;var _=j(O);if(_==="object"){if(O instanceof Date)return"date";if(O instanceof RegExp)return"regexp"}return _}function ee(O){var _=B(O);switch(_){case"array":case"object":return"an "+_;case"boolean":case"date":case"regexp":return"a "+_;default:return _}}function Q(O){return!O.constructor||!O.constructor.name?p:O.constructor.name}return b.checkPropTypes=o,b.resetWarningCache=o.resetWarningCache,b.PropTypes=b,b},ar}var lr,No;function Na(){if(No)return lr;No=1;var e=_r();function t(){}function n(){}return n.resetWarningCache=t,lr=function(){function r(a,c,l,u,d,f){if(f!==e){var p=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw p.name="Invariant Violation",p}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},lr}if(process.env.NODE_ENV!=="production"){var Ra=Ci(),$a=!0;yr.exports=Pa()(Ra.isElement,$a)}else yr.exports=Na()();var Ma=yr.exports;const s=Ea(Ma);function Lt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function ht(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Ni(e){if(!ht(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Ni(e[n])}),t}function Ye(e,t,n={clone:!0}){const r=n.clone?k({},e):e;return ht(e)&&ht(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(ht(t[o])&&o in e&&ht(e[o])?r[o]=Ye(e[o],t[o],n):n.clone?r[o]=ht(t[o])?Ni(t[o]):t[o]:r[o]=t[o])}),r}function ja(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ri(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let c;const l=i.type;return typeof l=="function"&&!ja(l)&&(c="Did you accidentally use a plain function component for an element instead?"),c!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const $i=Lt(s.element,Ri);$i.isRequired=Lt(s.element.isRequired,Ri);const dn=$i;function Ia(e){const{prototype:t={}}=e;return!!t.isReactComponent}function _a(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let c;return typeof i=="function"&&!Ia(i)&&(c="Did you accidentally provide a plain function component instead?"),c!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Aa=Lt(s.elementType,_a),Da="exact-prop: ​";function Mi(e){return process.env.NODE_ENV==="production"?e:k({},e,{[Da]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Mt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var xr={exports:{}},le={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ro;function Ba(){if(Ro)return le;Ro=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),c=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),v;v=Symbol.for("react.module.reference");function g(h){if(typeof h=="object"&&h!==null){var T=h.$$typeof;switch(T){case e:switch(h=h.type,h){case n:case o:case r:case u:case d:return h;default:switch(h=h&&h.$$typeof,h){case c:case a:case l:case p:case f:case i:return h;default:return T}}case t:return T}}}return le.ContextConsumer=a,le.ContextProvider=i,le.Element=e,le.ForwardRef=l,le.Fragment=n,le.Lazy=p,le.Memo=f,le.Portal=t,le.Profiler=o,le.StrictMode=r,le.Suspense=u,le.SuspenseList=d,le.isAsyncMode=function(){return!1},le.isConcurrentMode=function(){return!1},le.isContextConsumer=function(h){return g(h)===a},le.isContextProvider=function(h){return g(h)===i},le.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===e},le.isForwardRef=function(h){return g(h)===l},le.isFragment=function(h){return g(h)===n},le.isLazy=function(h){return g(h)===p},le.isMemo=function(h){return g(h)===f},le.isPortal=function(h){return g(h)===t},le.isProfiler=function(h){return g(h)===o},le.isStrictMode=function(h){return g(h)===r},le.isSuspense=function(h){return g(h)===u},le.isSuspenseList=function(h){return g(h)===d},le.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===n||h===o||h===r||h===u||h===d||h===b||typeof h=="object"&&h!==null&&(h.$$typeof===p||h.$$typeof===f||h.$$typeof===i||h.$$typeof===a||h.$$typeof===l||h.$$typeof===v||h.getModuleId!==void 0)},le.typeOf=g,le}var ce={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $o;function La(){return $o||($o=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),c=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),v=!1,g=!1,h=!1,T=!1,$=!1,x;x=Symbol.for("react.module.reference");function w(R){return!!(typeof R=="string"||typeof R=="function"||R===n||R===o||$||R===r||R===u||R===d||T||R===b||v||g||h||typeof R=="object"&&R!==null&&(R.$$typeof===p||R.$$typeof===f||R.$$typeof===i||R.$$typeof===a||R.$$typeof===l||R.$$typeof===x||R.getModuleId!==void 0))}function m(R){if(typeof R=="object"&&R!==null){var oe=R.$$typeof;switch(oe){case e:var ye=R.type;switch(ye){case n:case o:case r:case u:case d:return ye;default:var ke=ye&&ye.$$typeof;switch(ke){case c:case a:case l:case p:case f:case i:return ke;default:return oe}}case t:return oe}}}var C=a,P=i,D=e,S=l,N=n,M=p,z=f,W=t,L=o,A=r,j=u,B=d,ee=!1,Q=!1;function O(R){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function _(R){return Q||(Q=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function V(R){return m(R)===a}function K(R){return m(R)===i}function F(R){return typeof R=="object"&&R!==null&&R.$$typeof===e}function U(R){return m(R)===l}function q(R){return m(R)===n}function G(R){return m(R)===p}function H(R){return m(R)===f}function Y(R){return m(R)===t}function J(R){return m(R)===o}function re(R){return m(R)===r}function I(R){return m(R)===u}function Z(R){return m(R)===d}ce.ContextConsumer=C,ce.ContextProvider=P,ce.Element=D,ce.ForwardRef=S,ce.Fragment=N,ce.Lazy=M,ce.Memo=z,ce.Portal=W,ce.Profiler=L,ce.StrictMode=A,ce.Suspense=j,ce.SuspenseList=B,ce.isAsyncMode=O,ce.isConcurrentMode=_,ce.isContextConsumer=V,ce.isContextProvider=K,ce.isElement=F,ce.isForwardRef=U,ce.isFragment=q,ce.isLazy=G,ce.isMemo=H,ce.isPortal=Y,ce.isProfiler=J,ce.isStrictMode=re,ce.isSuspense=I,ce.isSuspenseList=Z,ce.isValidElementType=w,ce.typeOf=m}()),ce}process.env.NODE_ENV==="production"?xr.exports=Ba():xr.exports=La();var $n=xr.exports;const Fa=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Va(e){const t=`${e}`.match(Fa);return t&&t[1]||""}function ji(e,t=""){return e.displayName||e.name||Va(e)||t}function Mo(e,t,n){const r=ji(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function za(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return ji(e,"Component");if(typeof e=="object")switch(e.$$typeof){case $n.ForwardRef:return Mo(e,e.render,"ForwardRef");case $n.Memo:return Mo(e,e.type,"memo");default:return}}}function Je(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],a=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Ua=s.oneOfType([s.func,s.object]),Ar=Ua;function He(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Mt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function wr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Ii(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function Ha(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,a)=>{const c=o||"<<anonymous>>",l=a||r;return typeof n[r]<"u"?new Error(`The ${i} \`${l}\` of \`${c}\` is deprecated. ${t}`):null}}function qa(e,t){var n,r;return E.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Ee(e){return e&&e.ownerDocument||document}function jt(e){return Ee(e).defaultView||window}function Wa(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?k({},t.propTypes):null;return o=>(i,a,c,l,u,...d)=>{const f=u||a,p=n==null?void 0:n[f];if(p){const b=p(i,a,c,l,u,...d);if(b)return b}return typeof i[a]<"u"&&!i[o]?new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Mn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Ga=typeof window<"u"?E.useLayoutEffect:E.useEffect,vt=Ga;let jo=0;function Ka(e){const[t,n]=E.useState(e),r=e||t;return E.useEffect(()=>{t==null&&(jo+=1,n(`mui-${jo}`))},[t]),r}const Io=E["useId".toString()];function _i(e){if(Io!==void 0){const t=Io();return e??t}return Ka(e)}function Xa(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function Ai({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=E.useRef(e!==void 0),[i,a]=E.useState(t),c=o?e:i;if(process.env.NODE_ENV!=="production"){E.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:u}=E.useRef(t);E.useEffect(()=>{!o&&u!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const l=E.useCallback(u=>{o||a(u)},[]);return[c,l]}function on(e){const t=E.useRef(e);return vt(()=>{t.current=e}),E.useRef((...n)=>(0,t.current)(...n)).current}function Be(...e){return E.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Mn(n,t)})},e)}const _o={};function Ya(e,t){const n=E.useRef(_o);return n.current===_o&&(n.current=e(t)),n}const Ja=[];function Za(e){E.useEffect(e,Ja)}class pn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new pn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function Jt(){const e=Ya(pn.create).current;return Za(e.disposeEffect),e}let Fn=!0,Er=!1;const Qa=new pn,el={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function tl(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&el[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function nl(e){e.metaKey||e.altKey||e.ctrlKey||(Fn=!0)}function cr(){Fn=!1}function rl(){this.visibilityState==="hidden"&&Er&&(Fn=!0)}function ol(e){e.addEventListener("keydown",nl,!0),e.addEventListener("mousedown",cr,!0),e.addEventListener("pointerdown",cr,!0),e.addEventListener("touchstart",cr,!0),e.addEventListener("visibilitychange",rl,!0)}function il(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Fn||tl(t)}function Di(){const e=E.useCallback(o=>{o!=null&&ol(o.ownerDocument)},[]),t=E.useRef(!1);function n(){return t.current?(Er=!0,Qa.start(100,()=>{Er=!1}),t.current=!1,!0):!1}function r(o){return il(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Bi(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function sl(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function al(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const ll=Number.isInteger||al;function Li(e,t,n,r){const o=e[t];if(o==null||!ll(o)){const i=sl(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function Fi(e,t,...n){return e[t]===void 0?null:Li(e,t,...n)}function Tr(){return null}Fi.isRequired=Li;Tr.isRequired=Tr;const Vi=process.env.NODE_ENV==="production"?Tr:Fi;function zi(e,t){const n=k({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=k({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=k({},i),Object.keys(o).forEach(a=>{n[r][a]=zi(o[a],i[a])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function et(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,a)=>{if(a){const c=t(a);c!==""&&i.push(c),n&&n[a]&&i.push(n[a])}return i},[]).join(" ")}),r}const Ao=e=>e,cl=()=>{let e=Ao;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Ao}}},ul=cl(),Ui=ul,Hi={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function We(e,t,n="Mui"){const r=Hi[t];return r?`${n}-${r}`:`${Ui.generate(e)}-${t}`}function it(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=We(e,o,n)}),r}function dl(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function qi(e){return typeof e=="string"}function Zt(e,t,n){return e===void 0||qi(e)?t:k({},t,{ownerState:k({},t.ownerState,n)})}const pl={disableDefaultClasses:!1},fl=E.createContext(pl);function hl(e){const{disableDefaultClasses:t}=E.useContext(fl);return n=>t?"":e(n)}function Wi(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function ml(e,t,n){return typeof e=="function"?e(t,n):e}function Do(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function gl(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const b=we(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),v=k({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),g=k({},n,o,r);return b.length>0&&(g.className=b),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:void 0}}const a=Wi(k({},o,r)),c=Do(r),l=Do(o),u=t(a),d=we(u==null?void 0:u.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),f=k({},u==null?void 0:u.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),p=k({},u,n,l,c);return d.length>0&&(p.className=d),Object.keys(f).length>0&&(p.style=f),{props:p,internalRef:u.ref}}const bl=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function yt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,a=ue(e,bl),c=i?{}:ml(r,o),{props:l,internalRef:u}=gl(k({},a,{externalSlotProps:c})),d=Be(u,c==null?void 0:c.ref,(t=e.additionalProps)==null?void 0:t.ref);return Zt(n,k({},l,{ref:d}),o)}const Gi="base";function vl(e){return`${Gi}--${e}`}function yl(e,t){return`${Gi}-${e}-${t}`}function Ki(e,t){const n=Hi[t];return n?vl(n):yl(e,t)}function xl(e,t){const n={};return t.forEach(r=>{n[r]=Ki(e,r)}),n}const wl=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function El(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function Tl(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function kl(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Tl(e))}function Ol(e){const t=[],n=[];return Array.from(e.querySelectorAll(wl)).forEach((r,o)=>{const i=El(r);i===-1||!kl(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function Sl(){return!0}function jn(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=Ol,isEnabled:a=Sl,open:c}=e,l=E.useRef(!1),u=E.useRef(null),d=E.useRef(null),f=E.useRef(null),p=E.useRef(null),b=E.useRef(!1),v=E.useRef(null),g=Be(t.ref,v),h=E.useRef(null);E.useEffect(()=>{!c||!v.current||(b.current=!n)},[n,c]),E.useEffect(()=>{if(!c||!v.current)return;const x=Ee(v.current);return v.current.contains(x.activeElement)||(v.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),v.current.setAttribute("tabIndex","-1")),b.current&&v.current.focus()),()=>{o||(f.current&&f.current.focus&&(l.current=!0,f.current.focus()),f.current=null)}},[c]),E.useEffect(()=>{if(!c||!v.current)return;const x=Ee(v.current),w=P=>{h.current=P,!(r||!a()||P.key!=="Tab")&&x.activeElement===v.current&&P.shiftKey&&(l.current=!0,d.current&&d.current.focus())},m=()=>{const P=v.current;if(P===null)return;if(!x.hasFocus()||!a()||l.current){l.current=!1;return}if(P.contains(x.activeElement)||r&&x.activeElement!==u.current&&x.activeElement!==d.current)return;if(x.activeElement!==p.current)p.current=null;else if(p.current!==null)return;if(!b.current)return;let D=[];if((x.activeElement===u.current||x.activeElement===d.current)&&(D=i(v.current)),D.length>0){var S,N;const M=!!((S=h.current)!=null&&S.shiftKey&&((N=h.current)==null?void 0:N.key)==="Tab"),z=D[0],W=D[D.length-1];typeof z!="string"&&typeof W!="string"&&(M?W.focus():z.focus())}else P.focus()};x.addEventListener("focusin",m),x.addEventListener("keydown",w,!0);const C=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&m()},50);return()=>{clearInterval(C),x.removeEventListener("focusin",m),x.removeEventListener("keydown",w,!0)}},[n,r,o,a,c,i]);const T=x=>{f.current===null&&(f.current=x.relatedTarget),b.current=!0,p.current=x.target;const w=t.props.onFocus;w&&w(x)},$=x=>{f.current===null&&(f.current=x.relatedTarget),b.current=!0};return y.jsxs(E.Fragment,{children:[y.jsx("div",{tabIndex:c?0:-1,onFocus:$,ref:u,"data-testid":"sentinelStart"}),E.cloneElement(t,{ref:g,onFocus:T}),y.jsx("div",{tabIndex:c?0:-1,onFocus:$,ref:d,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(jn.propTypes={children:dn,disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableRestoreFocus:s.bool,getTabbable:s.func,isEnabled:s.func,open:s.bool.isRequired});process.env.NODE_ENV!=="production"&&(jn["propTypes"]=Mi(jn.propTypes));function Cl(e){return typeof e=="function"?e():e}const sn=E.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[a,c]=E.useState(null),l=Be(E.isValidElement(r)?r.ref:null,n);if(vt(()=>{i||c(Cl(o)||document.body)},[o,i]),vt(()=>{if(a&&!i)return Mn(n,a),()=>{Mn(n,null)}},[n,a,i]),i){if(E.isValidElement(r)){const u={ref:l};return E.cloneElement(r,u)}return y.jsx(E.Fragment,{children:r})}return y.jsx(E.Fragment,{children:a&&Xs.createPortal(r,a)})});process.env.NODE_ENV!=="production"&&(sn.propTypes={children:s.node,container:s.oneOfType([Je,s.func]),disablePortal:s.bool});process.env.NODE_ENV!=="production"&&(sn["propTypes"]=Mi(sn.propTypes));function Pl(e){const t=Ee(e);return t.body===e?jt(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function en(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Bo(e){return parseInt(jt(e).getComputedStyle(e).paddingRight,10)||0}function Nl(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Lo(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,a=>{const c=i.indexOf(a)===-1,l=!Nl(a);c&&l&&en(a,o)})}function ur(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function Rl(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(Pl(r)){const a=Bi(Ee(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Bo(r)+a}px`;const c=Ee(r).querySelectorAll(".mui-fixed");[].forEach.call(c,l=>{n.push({value:l.style.paddingRight,property:"padding-right",el:l}),l.style.paddingRight=`${Bo(l)+a}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=Ee(r).body;else{const a=r.parentElement,c=jt(r);i=(a==null?void 0:a.nodeName)==="HTML"&&c.getComputedStyle(a).overflowY==="scroll"?a:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:a,property:c})=>{i?a.style.setProperty(c,i):a.style.removeProperty(c)})}}function $l(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class Ml{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&en(t.modalRef,!1);const o=$l(n);Lo(n,t.mount,t.modalRef,o,!0);const i=ur(this.containers,a=>a.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=ur(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=Rl(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=ur(this.containers,a=>a.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&en(t.modalRef,n),Lo(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const a=i.modals[i.modals.length-1];a.modalRef&&en(a.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function jl(e){return typeof e=="function"?e():e}function Il(e){return e?e.props.hasOwnProperty("in"):!1}const _l=new Ml;function Al(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=_l,closeAfterTransition:i=!1,onTransitionEnter:a,onTransitionExited:c,children:l,onClose:u,open:d,rootRef:f}=e,p=E.useRef({}),b=E.useRef(null),v=E.useRef(null),g=Be(v,f),[h,T]=E.useState(!d),$=Il(l);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const w=()=>Ee(b.current),m=()=>(p.current.modalRef=v.current,p.current.mount=b.current,p.current),C=()=>{o.mount(m(),{disableScrollLock:r}),v.current&&(v.current.scrollTop=0)},P=on(()=>{const j=jl(t)||w().body;o.add(m(),j),v.current&&C()}),D=E.useCallback(()=>o.isTopModal(m()),[o]),S=on(j=>{b.current=j,j&&(d&&D()?C():v.current&&en(v.current,x))}),N=E.useCallback(()=>{o.remove(m(),x)},[x,o]);E.useEffect(()=>()=>{N()},[N]),E.useEffect(()=>{d?P():(!$||!i)&&N()},[d,N,$,i,P]);const M=j=>B=>{var ee;(ee=j.onKeyDown)==null||ee.call(j,B),!(B.key!=="Escape"||B.which===229||!D())&&(n||(B.stopPropagation(),u&&u(B,"escapeKeyDown")))},z=j=>B=>{var ee;(ee=j.onClick)==null||ee.call(j,B),B.target===B.currentTarget&&u&&u(B,"backdropClick")};return{getRootProps:(j={})=>{const B=Wi(e);delete B.onTransitionEnter,delete B.onTransitionExited;const ee=k({},B,j);return k({role:"presentation"},ee,{onKeyDown:M(ee),ref:g})},getBackdropProps:(j={})=>{const B=j;return k({"aria-hidden":!0},B,{onClick:z(B),open:d})},getTransitionProps:()=>{const j=()=>{T(!1),a&&a()},B=()=>{T(!0),c&&c(),i&&N()};return{onEnter:wr(j,l==null?void 0:l.props.onEnter),onExited:wr(B,l==null?void 0:l.props.onExited)}},rootRef:g,portalRef:S,isTopModal:D,exited:h,hasTransition:$}}var Ce="top",Le="bottom",Fe="right",Pe="left",Dr="auto",fn=[Ce,Le,Fe,Pe],It="start",an="end",Dl="clippingParents",Xi="viewport",Wt="popper",Bl="reference",Fo=fn.reduce(function(e,t){return e.concat([t+"-"+It,t+"-"+an])},[]),Yi=[].concat(fn,[Dr]).reduce(function(e,t){return e.concat([t,t+"-"+It,t+"-"+an])},[]),Ll="beforeRead",Fl="read",Vl="afterRead",zl="beforeMain",Ul="main",Hl="afterMain",ql="beforeWrite",Wl="write",Gl="afterWrite",Kl=[Ll,Fl,Vl,zl,Ul,Hl,ql,Wl,Gl];function qe(e){return e?(e.nodeName||"").toLowerCase():null}function Ie(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function xt(e){var t=Ie(e).Element;return e instanceof t||e instanceof Element}function De(e){var t=Ie(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Br(e){if(typeof ShadowRoot>"u")return!1;var t=Ie(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Xl(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!De(i)||!qe(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(a){var c=o[a];c===!1?i.removeAttribute(a):i.setAttribute(a,c===!0?"":c)}))})}function Yl(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},a=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),c=a.reduce(function(l,u){return l[u]="",l},{});!De(o)||!qe(o)||(Object.assign(o.style,c),Object.keys(i).forEach(function(l){o.removeAttribute(l)}))})}}const Jl={name:"applyStyles",enabled:!0,phase:"write",fn:Xl,effect:Yl,requires:["computeStyles"]};function Ue(e){return e.split("-")[0]}var gt=Math.max,In=Math.min,_t=Math.round;function kr(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ji(){return!/^((?!chrome|android).)*safari/i.test(kr())}function At(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&De(e)&&(o=e.offsetWidth>0&&_t(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&_t(r.height)/e.offsetHeight||1);var a=xt(e)?Ie(e):window,c=a.visualViewport,l=!Ji()&&n,u=(r.left+(l&&c?c.offsetLeft:0))/o,d=(r.top+(l&&c?c.offsetTop:0))/i,f=r.width/o,p=r.height/i;return{width:f,height:p,top:d,right:u+f,bottom:d+p,left:u,x:u,y:d}}function Lr(e){var t=At(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Zi(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Br(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function Ze(e){return Ie(e).getComputedStyle(e)}function Zl(e){return["table","td","th"].indexOf(qe(e))>=0}function st(e){return((xt(e)?e.ownerDocument:e.document)||window.document).documentElement}function Vn(e){return qe(e)==="html"?e:e.assignedSlot||e.parentNode||(Br(e)?e.host:null)||st(e)}function Vo(e){return!De(e)||Ze(e).position==="fixed"?null:e.offsetParent}function Ql(e){var t=/firefox/i.test(kr()),n=/Trident/i.test(kr());if(n&&De(e)){var r=Ze(e);if(r.position==="fixed")return null}var o=Vn(e);for(Br(o)&&(o=o.host);De(o)&&["html","body"].indexOf(qe(o))<0;){var i=Ze(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function hn(e){for(var t=Ie(e),n=Vo(e);n&&Zl(n)&&Ze(n).position==="static";)n=Vo(n);return n&&(qe(n)==="html"||qe(n)==="body"&&Ze(n).position==="static")?t:n||Ql(e)||t}function Fr(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function tn(e,t,n){return gt(e,In(t,n))}function ec(e,t,n){var r=tn(e,t,n);return r>n?n:r}function Qi(){return{top:0,right:0,bottom:0,left:0}}function es(e){return Object.assign({},Qi(),e)}function ts(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var tc=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,es(typeof t!="number"?t:ts(t,fn))};function nc(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,c=Ue(n.placement),l=Fr(c),u=[Pe,Fe].indexOf(c)>=0,d=u?"height":"width";if(!(!i||!a)){var f=tc(o.padding,n),p=Lr(i),b=l==="y"?Ce:Pe,v=l==="y"?Le:Fe,g=n.rects.reference[d]+n.rects.reference[l]-a[l]-n.rects.popper[d],h=a[l]-n.rects.reference[l],T=hn(i),$=T?l==="y"?T.clientHeight||0:T.clientWidth||0:0,x=g/2-h/2,w=f[b],m=$-p[d]-f[v],C=$/2-p[d]/2+x,P=tn(w,C,m),D=l;n.modifiersData[r]=(t={},t[D]=P,t.centerOffset=P-C,t)}}function rc(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Zi(t.elements.popper,o)&&(t.elements.arrow=o))}const oc={name:"arrow",enabled:!0,phase:"main",fn:nc,effect:rc,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Dt(e){return e.split("-")[1]}var ic={top:"auto",right:"auto",bottom:"auto",left:"auto"};function sc(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:_t(n*o)/o||0,y:_t(r*o)/o||0}}function zo(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,a=e.offsets,c=e.position,l=e.gpuAcceleration,u=e.adaptive,d=e.roundOffsets,f=e.isFixed,p=a.x,b=p===void 0?0:p,v=a.y,g=v===void 0?0:v,h=typeof d=="function"?d({x:b,y:g}):{x:b,y:g};b=h.x,g=h.y;var T=a.hasOwnProperty("x"),$=a.hasOwnProperty("y"),x=Pe,w=Ce,m=window;if(u){var C=hn(n),P="clientHeight",D="clientWidth";if(C===Ie(n)&&(C=st(n),Ze(C).position!=="static"&&c==="absolute"&&(P="scrollHeight",D="scrollWidth")),C=C,o===Ce||(o===Pe||o===Fe)&&i===an){w=Le;var S=f&&C===m&&m.visualViewport?m.visualViewport.height:C[P];g-=S-r.height,g*=l?1:-1}if(o===Pe||(o===Ce||o===Le)&&i===an){x=Fe;var N=f&&C===m&&m.visualViewport?m.visualViewport.width:C[D];b-=N-r.width,b*=l?1:-1}}var M=Object.assign({position:c},u&&ic),z=d===!0?sc({x:b,y:g},Ie(n)):{x:b,y:g};if(b=z.x,g=z.y,l){var W;return Object.assign({},M,(W={},W[w]=$?"0":"",W[x]=T?"0":"",W.transform=(m.devicePixelRatio||1)<=1?"translate("+b+"px, "+g+"px)":"translate3d("+b+"px, "+g+"px, 0)",W))}return Object.assign({},M,(t={},t[w]=$?g+"px":"",t[x]=T?b+"px":"",t.transform="",t))}function ac(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,a=i===void 0?!0:i,c=n.roundOffsets,l=c===void 0?!0:c,u={placement:Ue(t.placement),variation:Dt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,zo(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:l})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,zo(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const lc={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:ac,data:{}};var En={passive:!0};function cc(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,a=r.resize,c=a===void 0?!0:a,l=Ie(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&u.forEach(function(d){d.addEventListener("scroll",n.update,En)}),c&&l.addEventListener("resize",n.update,En),function(){i&&u.forEach(function(d){d.removeEventListener("scroll",n.update,En)}),c&&l.removeEventListener("resize",n.update,En)}}const uc={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:cc,data:{}};var dc={left:"right",right:"left",bottom:"top",top:"bottom"};function Sn(e){return e.replace(/left|right|bottom|top/g,function(t){return dc[t]})}var pc={start:"end",end:"start"};function Uo(e){return e.replace(/start|end/g,function(t){return pc[t]})}function Vr(e){var t=Ie(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function zr(e){return At(st(e)).left+Vr(e).scrollLeft}function fc(e,t){var n=Ie(e),r=st(e),o=n.visualViewport,i=r.clientWidth,a=r.clientHeight,c=0,l=0;if(o){i=o.width,a=o.height;var u=Ji();(u||!u&&t==="fixed")&&(c=o.offsetLeft,l=o.offsetTop)}return{width:i,height:a,x:c+zr(e),y:l}}function hc(e){var t,n=st(e),r=Vr(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=gt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=gt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),c=-r.scrollLeft+zr(e),l=-r.scrollTop;return Ze(o||n).direction==="rtl"&&(c+=gt(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:c,y:l}}function Ur(e){var t=Ze(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function ns(e){return["html","body","#document"].indexOf(qe(e))>=0?e.ownerDocument.body:De(e)&&Ur(e)?e:ns(Vn(e))}function nn(e,t){var n;t===void 0&&(t=[]);var r=ns(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=Ie(r),a=o?[i].concat(i.visualViewport||[],Ur(r)?r:[]):r,c=t.concat(a);return o?c:c.concat(nn(Vn(a)))}function Or(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function mc(e,t){var n=At(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Ho(e,t,n){return t===Xi?Or(fc(e,n)):xt(t)?mc(t,n):Or(hc(st(e)))}function gc(e){var t=nn(Vn(e)),n=["absolute","fixed"].indexOf(Ze(e).position)>=0,r=n&&De(e)?hn(e):e;return xt(r)?t.filter(function(o){return xt(o)&&Zi(o,r)&&qe(o)!=="body"}):[]}function bc(e,t,n,r){var o=t==="clippingParents"?gc(e):[].concat(t),i=[].concat(o,[n]),a=i[0],c=i.reduce(function(l,u){var d=Ho(e,u,r);return l.top=gt(d.top,l.top),l.right=In(d.right,l.right),l.bottom=In(d.bottom,l.bottom),l.left=gt(d.left,l.left),l},Ho(e,a,r));return c.width=c.right-c.left,c.height=c.bottom-c.top,c.x=c.left,c.y=c.top,c}function rs(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ue(r):null,i=r?Dt(r):null,a=t.x+t.width/2-n.width/2,c=t.y+t.height/2-n.height/2,l;switch(o){case Ce:l={x:a,y:t.y-n.height};break;case Le:l={x:a,y:t.y+t.height};break;case Fe:l={x:t.x+t.width,y:c};break;case Pe:l={x:t.x-n.width,y:c};break;default:l={x:t.x,y:t.y}}var u=o?Fr(o):null;if(u!=null){var d=u==="y"?"height":"width";switch(i){case It:l[u]=l[u]-(t[d]/2-n[d]/2);break;case an:l[u]=l[u]+(t[d]/2-n[d]/2);break}}return l}function ln(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,a=i===void 0?e.strategy:i,c=n.boundary,l=c===void 0?Dl:c,u=n.rootBoundary,d=u===void 0?Xi:u,f=n.elementContext,p=f===void 0?Wt:f,b=n.altBoundary,v=b===void 0?!1:b,g=n.padding,h=g===void 0?0:g,T=es(typeof h!="number"?h:ts(h,fn)),$=p===Wt?Bl:Wt,x=e.rects.popper,w=e.elements[v?$:p],m=bc(xt(w)?w:w.contextElement||st(e.elements.popper),l,d,a),C=At(e.elements.reference),P=rs({reference:C,element:x,strategy:"absolute",placement:o}),D=Or(Object.assign({},x,P)),S=p===Wt?D:C,N={top:m.top-S.top+T.top,bottom:S.bottom-m.bottom+T.bottom,left:m.left-S.left+T.left,right:S.right-m.right+T.right},M=e.modifiersData.offset;if(p===Wt&&M){var z=M[o];Object.keys(N).forEach(function(W){var L=[Fe,Le].indexOf(W)>=0?1:-1,A=[Ce,Le].indexOf(W)>=0?"y":"x";N[W]+=z[A]*L})}return N}function vc(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,c=n.flipVariations,l=n.allowedAutoPlacements,u=l===void 0?Yi:l,d=Dt(r),f=d?c?Fo:Fo.filter(function(v){return Dt(v)===d}):fn,p=f.filter(function(v){return u.indexOf(v)>=0});p.length===0&&(p=f);var b=p.reduce(function(v,g){return v[g]=ln(e,{placement:g,boundary:o,rootBoundary:i,padding:a})[Ue(g)],v},{});return Object.keys(b).sort(function(v,g){return b[v]-b[g]})}function yc(e){if(Ue(e)===Dr)return[];var t=Sn(e);return[Uo(e),t,Uo(t)]}function xc(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,c=a===void 0?!0:a,l=n.fallbackPlacements,u=n.padding,d=n.boundary,f=n.rootBoundary,p=n.altBoundary,b=n.flipVariations,v=b===void 0?!0:b,g=n.allowedAutoPlacements,h=t.options.placement,T=Ue(h),$=T===h,x=l||($||!v?[Sn(h)]:yc(h)),w=[h].concat(x).reduce(function(F,U){return F.concat(Ue(U)===Dr?vc(t,{placement:U,boundary:d,rootBoundary:f,padding:u,flipVariations:v,allowedAutoPlacements:g}):U)},[]),m=t.rects.reference,C=t.rects.popper,P=new Map,D=!0,S=w[0],N=0;N<w.length;N++){var M=w[N],z=Ue(M),W=Dt(M)===It,L=[Ce,Le].indexOf(z)>=0,A=L?"width":"height",j=ln(t,{placement:M,boundary:d,rootBoundary:f,altBoundary:p,padding:u}),B=L?W?Fe:Pe:W?Le:Ce;m[A]>C[A]&&(B=Sn(B));var ee=Sn(B),Q=[];if(i&&Q.push(j[z]<=0),c&&Q.push(j[B]<=0,j[ee]<=0),Q.every(function(F){return F})){S=M,D=!1;break}P.set(M,Q)}if(D)for(var O=v?3:1,_=function(U){var q=w.find(function(G){var H=P.get(G);if(H)return H.slice(0,U).every(function(Y){return Y})});if(q)return S=q,"break"},V=O;V>0;V--){var K=_(V);if(K==="break")break}t.placement!==S&&(t.modifiersData[r]._skip=!0,t.placement=S,t.reset=!0)}}const wc={name:"flip",enabled:!0,phase:"main",fn:xc,requiresIfExists:["offset"],data:{_skip:!1}};function qo(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Wo(e){return[Ce,Fe,Le,Pe].some(function(t){return e[t]>=0})}function Ec(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=ln(t,{elementContext:"reference"}),c=ln(t,{altBoundary:!0}),l=qo(a,r),u=qo(c,o,i),d=Wo(l),f=Wo(u);t.modifiersData[n]={referenceClippingOffsets:l,popperEscapeOffsets:u,isReferenceHidden:d,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":d,"data-popper-escaped":f})}const Tc={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Ec};function kc(e,t,n){var r=Ue(e),o=[Pe,Ce].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,a=i[0],c=i[1];return a=a||0,c=(c||0)*o,[Pe,Fe].indexOf(r)>=0?{x:c,y:a}:{x:a,y:c}}function Oc(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,a=Yi.reduce(function(d,f){return d[f]=kc(f,t.rects,i),d},{}),c=a[t.placement],l=c.x,u=c.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=l,t.modifiersData.popperOffsets.y+=u),t.modifiersData[r]=a}const Sc={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Oc};function Cc(e){var t=e.state,n=e.name;t.modifiersData[n]=rs({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Pc={name:"popperOffsets",enabled:!0,phase:"read",fn:Cc,data:{}};function Nc(e){return e==="x"?"y":"x"}function Rc(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,c=a===void 0?!1:a,l=n.boundary,u=n.rootBoundary,d=n.altBoundary,f=n.padding,p=n.tether,b=p===void 0?!0:p,v=n.tetherOffset,g=v===void 0?0:v,h=ln(t,{boundary:l,rootBoundary:u,padding:f,altBoundary:d}),T=Ue(t.placement),$=Dt(t.placement),x=!$,w=Fr(T),m=Nc(w),C=t.modifiersData.popperOffsets,P=t.rects.reference,D=t.rects.popper,S=typeof g=="function"?g(Object.assign({},t.rects,{placement:t.placement})):g,N=typeof S=="number"?{mainAxis:S,altAxis:S}:Object.assign({mainAxis:0,altAxis:0},S),M=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,z={x:0,y:0};if(C){if(i){var W,L=w==="y"?Ce:Pe,A=w==="y"?Le:Fe,j=w==="y"?"height":"width",B=C[w],ee=B+h[L],Q=B-h[A],O=b?-D[j]/2:0,_=$===It?P[j]:D[j],V=$===It?-D[j]:-P[j],K=t.elements.arrow,F=b&&K?Lr(K):{width:0,height:0},U=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Qi(),q=U[L],G=U[A],H=tn(0,P[j],F[j]),Y=x?P[j]/2-O-H-q-N.mainAxis:_-H-q-N.mainAxis,J=x?-P[j]/2+O+H+G+N.mainAxis:V+H+G+N.mainAxis,re=t.elements.arrow&&hn(t.elements.arrow),I=re?w==="y"?re.clientTop||0:re.clientLeft||0:0,Z=(W=M==null?void 0:M[w])!=null?W:0,R=B+Y-Z-I,oe=B+J-Z,ye=tn(b?In(ee,R):ee,B,b?gt(Q,oe):Q);C[w]=ye,z[w]=ye-B}if(c){var ke,ge=w==="x"?Ce:Pe,lt=w==="x"?Le:Fe,Oe=C[m],Ge=m==="y"?"height":"width",Ne=Oe+h[ge],Ke=Oe-h[lt],xe=[Ce,Pe].indexOf(T)!==-1,Et=(ke=M==null?void 0:M[m])!=null?ke:0,ct=xe?Ne:Oe-P[Ge]-D[Ge]-Et+N.altAxis,Ft=xe?Oe+P[Ge]+D[Ge]-Et-N.altAxis:Ke,vn=b&&xe?ec(ct,Oe,Ft):tn(b?ct:Ne,Oe,b?Ft:Ke);C[m]=vn,z[m]=vn-Oe}t.modifiersData[r]=z}}const $c={name:"preventOverflow",enabled:!0,phase:"main",fn:Rc,requiresIfExists:["offset"]};function Mc(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function jc(e){return e===Ie(e)||!De(e)?Vr(e):Mc(e)}function Ic(e){var t=e.getBoundingClientRect(),n=_t(t.width)/e.offsetWidth||1,r=_t(t.height)/e.offsetHeight||1;return n!==1||r!==1}function _c(e,t,n){n===void 0&&(n=!1);var r=De(t),o=De(t)&&Ic(t),i=st(t),a=At(e,o,n),c={scrollLeft:0,scrollTop:0},l={x:0,y:0};return(r||!r&&!n)&&((qe(t)!=="body"||Ur(i))&&(c=jc(t)),De(t)?(l=At(t,!0),l.x+=t.clientLeft,l.y+=t.clientTop):i&&(l.x=zr(i))),{x:a.left+c.scrollLeft-l.x,y:a.top+c.scrollTop-l.y,width:a.width,height:a.height}}function Ac(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var a=[].concat(i.requires||[],i.requiresIfExists||[]);a.forEach(function(c){if(!n.has(c)){var l=t.get(c);l&&o(l)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function Dc(e){var t=Ac(e);return Kl.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Bc(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Lc(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var Go={placement:"bottom",modifiers:[],strategy:"absolute"};function Ko(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Fc(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?Go:o;return function(c,l,u){u===void 0&&(u=i);var d={placement:"bottom",orderedModifiers:[],options:Object.assign({},Go,i),modifiersData:{},elements:{reference:c,popper:l},attributes:{},styles:{}},f=[],p=!1,b={state:d,setOptions:function(T){var $=typeof T=="function"?T(d.options):T;g(),d.options=Object.assign({},i,d.options,$),d.scrollParents={reference:xt(c)?nn(c):c.contextElement?nn(c.contextElement):[],popper:nn(l)};var x=Dc(Lc([].concat(r,d.options.modifiers)));return d.orderedModifiers=x.filter(function(w){return w.enabled}),v(),b.update()},forceUpdate:function(){if(!p){var T=d.elements,$=T.reference,x=T.popper;if(Ko($,x)){d.rects={reference:_c($,hn(x),d.options.strategy==="fixed"),popper:Lr(x)},d.reset=!1,d.placement=d.options.placement,d.orderedModifiers.forEach(function(N){return d.modifiersData[N.name]=Object.assign({},N.data)});for(var w=0;w<d.orderedModifiers.length;w++){if(d.reset===!0){d.reset=!1,w=-1;continue}var m=d.orderedModifiers[w],C=m.fn,P=m.options,D=P===void 0?{}:P,S=m.name;typeof C=="function"&&(d=C({state:d,options:D,name:S,instance:b})||d)}}}},update:Bc(function(){return new Promise(function(h){b.forceUpdate(),h(d)})}),destroy:function(){g(),p=!0}};if(!Ko(c,l))return b;b.setOptions(u).then(function(h){!p&&u.onFirstUpdate&&u.onFirstUpdate(h)});function v(){d.orderedModifiers.forEach(function(h){var T=h.name,$=h.options,x=$===void 0?{}:$,w=h.effect;if(typeof w=="function"){var m=w({state:d,name:T,instance:b,options:x}),C=function(){};f.push(m||C)}})}function g(){f.forEach(function(h){return h()}),f=[]}return b}}var Vc=[uc,Pc,lc,Jl,Sc,wc,$c,oc,Tc],zc=Fc({defaultModifiers:Vc});const os="Popper";function Uc(e){return Ki(os,e)}xl(os,["root"]);const Hc=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],qc=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Wc(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function _n(e){return typeof e=="function"?e():e}function zn(e){return e.nodeType!==void 0}function Gc(e){return!zn(e)}const Kc=()=>et({root:["root"]},hl(Uc)),Xc={},Yc=E.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:a,disablePortal:c,modifiers:l,open:u,placement:d,popperOptions:f,popperRef:p,slotProps:b={},slots:v={},TransitionProps:g}=t,h=ue(t,Hc),T=E.useRef(null),$=Be(T,n),x=E.useRef(null),w=Be(x,p),m=E.useRef(w);vt(()=>{m.current=w},[w]),E.useImperativeHandle(p,()=>x.current,[]);const C=Wc(d,a),[P,D]=E.useState(C),[S,N]=E.useState(_n(o));E.useEffect(()=>{x.current&&x.current.forceUpdate()}),E.useEffect(()=>{o&&N(_n(o))},[o]),vt(()=>{if(!S||!u)return;const A=ee=>{D(ee.placement)};if(process.env.NODE_ENV!=="production"&&S&&zn(S)&&S.nodeType===1){const ee=S.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ee.top===0&&ee.left===0&&ee.right===0&&ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let j=[{name:"preventOverflow",options:{altBoundary:c}},{name:"flip",options:{altBoundary:c}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ee})=>{A(ee)}}];l!=null&&(j=j.concat(l)),f&&f.modifiers!=null&&(j=j.concat(f.modifiers));const B=zc(S,T.current,k({placement:C},f,{modifiers:j}));return m.current(B),()=>{B.destroy(),m.current(null)}},[S,c,l,u,f,C]);const M={placement:P};g!==null&&(M.TransitionProps=g);const z=Kc(),W=(r=v.root)!=null?r:"div",L=yt({elementType:W,externalSlotProps:b.root,externalForwardedProps:h,additionalProps:{role:"tooltip",ref:$},ownerState:t,className:z.root});return y.jsx(W,k({},L,{children:typeof i=="function"?i(M):i}))}),is=E.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:a="ltr",disablePortal:c=!1,keepMounted:l=!1,modifiers:u,open:d,placement:f="bottom",popperOptions:p=Xc,popperRef:b,style:v,transition:g=!1,slotProps:h={},slots:T={}}=t,$=ue(t,qc),[x,w]=E.useState(!0),m=()=>{w(!1)},C=()=>{w(!0)};if(!l&&!d&&(!g||x))return null;let P;if(i)P=i;else if(r){const N=_n(r);P=N&&zn(N)?Ee(N).body:Ee(null).body}const D=!d&&l&&(!g||x)?"none":void 0,S=g?{in:d,onEnter:m,onExited:C}:void 0;return y.jsx(sn,{disablePortal:c,container:P,children:y.jsx(Yc,k({anchorEl:r,direction:a,disablePortal:c,modifiers:u,ref:n,open:g?!x:d,placement:f,popperOptions:p,popperRef:b,slotProps:h,slots:T},$,{style:k({position:"fixed",top:0,left:0,display:D},v),TransitionProps:S,children:o}))})});process.env.NODE_ENV!=="production"&&(is.propTypes={anchorEl:Lt(s.oneOfType([Je,s.object,s.func]),e=>{if(e.open){const t=_n(e.anchorEl);if(t&&zn(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Gc(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:s.oneOfType([s.node,s.func]),container:s.oneOfType([Je,s.func]),direction:s.oneOf(["ltr","rtl"]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:Ar,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),transition:s.bool});const Jc=["values","unit","step"],Zc=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>k({},n,{[r.key]:r.val}),{})};function Qc(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=ue(e,Jc),i=Zc(t),a=Object.keys(i);function c(p){return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n})`}function l(p){return`@media (max-width:${(typeof t[p]=="number"?t[p]:p)-r/100}${n})`}function u(p,b){const v=a.indexOf(b);return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n}) and (max-width:${(v!==-1&&typeof t[a[v]]=="number"?t[a[v]]:b)-r/100}${n})`}function d(p){return a.indexOf(p)+1<a.length?u(p,a[a.indexOf(p)+1]):c(p)}function f(p){const b=a.indexOf(p);return b===0?c(a[1]):b===a.length-1?l(a[b]):u(p,a[a.indexOf(p)+1]).replace("@media","@media not all and")}return k({keys:a,values:i,up:c,down:l,between:u,only:d,not:f,unit:n},o)}const eu={borderRadius:4},tu=eu,nu=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.string,s.object,s.array]):{},at=nu;function rn(e,t){return t?Ye(e,t,{clone:!1}):e}const Hr={xs:0,sm:600,md:900,lg:1200,xl:1536},Xo={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Hr[e]}px)`};function Qe(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||Xo;return t.reduce((a,c,l)=>(a[i.up(i.keys[l])]=n(t[l]),a),{})}if(typeof t=="object"){const i=r.breakpoints||Xo;return Object.keys(t).reduce((a,c)=>{if(Object.keys(i.values||Hr).indexOf(c)!==-1){const l=i.up(c);a[l]=n(t[c],c)}else{const l=c;a[l]=t[l]}return a},{})}return n(t)}function ru(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function ou(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Un(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function An(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Un(e,n)||r,t&&(o=t(o,r,e)),o}function ve(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=a=>{if(a[t]==null)return null;const c=a[t],l=a.theme,u=Un(l,r)||{};return Qe(a,c,f=>{let p=An(u,o,f);return f===p&&typeof f=="string"&&(p=An(u,o,`${t}${f==="default"?"":He(f)}`,f)),n===!1?p:{[n]:p}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:at}:{},i.filterProps=[t],i}function iu(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const su={m:"margin",p:"padding"},au={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Yo={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},lu=iu(e=>{if(e.length>2)if(Yo[e])e=Yo[e];else return[e];const[t,n]=e.split(""),r=su[t],o=au[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),Hn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],qn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],cu=[...Hn,...qn];function mn(e,t,n,r){var o;const i=(o=Un(e,t,!1))!=null?o:n;return typeof i=="number"?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&typeof a!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`),i*a):Array.isArray(i)?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&(Number.isInteger(a)?a>i.length-1&&console.error([`MUI: The value provided (${a}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${a} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[a]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function ss(e){return mn(e,"spacing",8,"spacing")}function gn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function uu(e,t){return n=>e.reduce((r,o)=>(r[o]=gn(t,n),r),{})}function du(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=lu(n),i=uu(o,r),a=e[n];return Qe(e,a,i)}function as(e,t){const n=ss(e.theme);return Object.keys(e).map(r=>du(e,t,r,n)).reduce(rn,{})}function he(e){return as(e,Hn)}he.propTypes=process.env.NODE_ENV!=="production"?Hn.reduce((e,t)=>(e[t]=at,e),{}):{};he.filterProps=Hn;function me(e){return as(e,qn)}me.propTypes=process.env.NODE_ENV!=="production"?qn.reduce((e,t)=>(e[t]=at,e),{}):{};me.filterProps=qn;process.env.NODE_ENV!=="production"&&cu.reduce((e,t)=>(e[t]=at,e),{});function pu(e=8){if(e.mui)return e;const t=ss({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const a=t(i);return typeof a=="number"?`${a}px`:a}).join(" "));return n.mui=!0,n}function Wn(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?rn(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Ae(e){return typeof e!="number"?e:`${e}px solid`}function Ve(e,t){return ve({prop:e,themeKey:"borders",transform:t})}const fu=Ve("border",Ae),hu=Ve("borderTop",Ae),mu=Ve("borderRight",Ae),gu=Ve("borderBottom",Ae),bu=Ve("borderLeft",Ae),vu=Ve("borderColor"),yu=Ve("borderTopColor"),xu=Ve("borderRightColor"),wu=Ve("borderBottomColor"),Eu=Ve("borderLeftColor"),Tu=Ve("outline",Ae),ku=Ve("outlineColor"),Gn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=mn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:gn(t,r)});return Qe(e,e.borderRadius,n)}return null};Gn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:at}:{};Gn.filterProps=["borderRadius"];Wn(fu,hu,mu,gu,bu,vu,yu,xu,wu,Eu,Gn,Tu,ku);const Kn=e=>{if(e.gap!==void 0&&e.gap!==null){const t=mn(e.theme,"spacing",8,"gap"),n=r=>({gap:gn(t,r)});return Qe(e,e.gap,n)}return null};Kn.propTypes=process.env.NODE_ENV!=="production"?{gap:at}:{};Kn.filterProps=["gap"];const Xn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=mn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:gn(t,r)});return Qe(e,e.columnGap,n)}return null};Xn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:at}:{};Xn.filterProps=["columnGap"];const Yn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=mn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:gn(t,r)});return Qe(e,e.rowGap,n)}return null};Yn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:at}:{};Yn.filterProps=["rowGap"];const Ou=ve({prop:"gridColumn"}),Su=ve({prop:"gridRow"}),Cu=ve({prop:"gridAutoFlow"}),Pu=ve({prop:"gridAutoColumns"}),Nu=ve({prop:"gridAutoRows"}),Ru=ve({prop:"gridTemplateColumns"}),$u=ve({prop:"gridTemplateRows"}),Mu=ve({prop:"gridTemplateAreas"}),ju=ve({prop:"gridArea"});Wn(Kn,Xn,Yn,Ou,Su,Cu,Pu,Nu,Ru,$u,Mu,ju);function $t(e,t){return t==="grey"?t:e}const Iu=ve({prop:"color",themeKey:"palette",transform:$t}),_u=ve({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:$t}),Au=ve({prop:"backgroundColor",themeKey:"palette",transform:$t});Wn(Iu,_u,Au);function Me(e){return e<=1&&e!==0?`${e*100}%`:e}const Du=ve({prop:"width",transform:Me}),qr=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Hr[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:Me(n)}};return Qe(e,e.maxWidth,t)}return null};qr.filterProps=["maxWidth"];const Bu=ve({prop:"minWidth",transform:Me}),Lu=ve({prop:"height",transform:Me}),Fu=ve({prop:"maxHeight",transform:Me}),Vu=ve({prop:"minHeight",transform:Me});ve({prop:"size",cssProperty:"width",transform:Me});ve({prop:"size",cssProperty:"height",transform:Me});const zu=ve({prop:"boxSizing"});Wn(Du,qr,Bu,Lu,Fu,Vu,zu);const Uu={border:{themeKey:"borders",transform:Ae},borderTop:{themeKey:"borders",transform:Ae},borderRight:{themeKey:"borders",transform:Ae},borderBottom:{themeKey:"borders",transform:Ae},borderLeft:{themeKey:"borders",transform:Ae},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Ae},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Gn},color:{themeKey:"palette",transform:$t},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:$t},backgroundColor:{themeKey:"palette",transform:$t},p:{style:me},pt:{style:me},pr:{style:me},pb:{style:me},pl:{style:me},px:{style:me},py:{style:me},padding:{style:me},paddingTop:{style:me},paddingRight:{style:me},paddingBottom:{style:me},paddingLeft:{style:me},paddingX:{style:me},paddingY:{style:me},paddingInline:{style:me},paddingInlineStart:{style:me},paddingInlineEnd:{style:me},paddingBlock:{style:me},paddingBlockStart:{style:me},paddingBlockEnd:{style:me},m:{style:he},mt:{style:he},mr:{style:he},mb:{style:he},ml:{style:he},mx:{style:he},my:{style:he},margin:{style:he},marginTop:{style:he},marginRight:{style:he},marginBottom:{style:he},marginLeft:{style:he},marginX:{style:he},marginY:{style:he},marginInline:{style:he},marginInlineStart:{style:he},marginInlineEnd:{style:he},marginBlock:{style:he},marginBlockStart:{style:he},marginBlockEnd:{style:he},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Kn},rowGap:{style:Yn},columnGap:{style:Xn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Me},maxWidth:{style:qr},minWidth:{transform:Me},height:{transform:Me},maxHeight:{transform:Me},minHeight:{transform:Me},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Wr=Uu;function Hu(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function qu(e,t){return typeof e=="function"?e(t):e}function Wu(){function e(n,r,o,i){const a={[n]:r,theme:o},c=i[n];if(!c)return{[n]:r};const{cssProperty:l=n,themeKey:u,transform:d,style:f}=c;if(r==null)return null;if(u==="typography"&&r==="inherit")return{[n]:r};const p=Un(o,u)||{};return f?f(a):Qe(a,r,v=>{let g=An(p,d,v);return v===g&&typeof v=="string"&&(g=An(p,d,`${n}${v==="default"?"":He(v)}`,v)),l===!1?g:{[l]:g}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const a=(r=i.unstable_sxConfig)!=null?r:Wr;function c(l){let u=l;if(typeof l=="function")u=l(i);else if(typeof l!="object")return l;if(!u)return null;const d=ru(i.breakpoints),f=Object.keys(d);let p=d;return Object.keys(u).forEach(b=>{const v=qu(u[b],i);if(v!=null)if(typeof v=="object")if(a[b])p=rn(p,e(b,v,i,a));else{const g=Qe({theme:i},v,h=>({[b]:h}));Hu(g,v)?p[b]=t({sx:v,theme:i}):p=rn(p,g)}else p=rn(p,e(b,v,i,a))}),ou(f,p)}return Array.isArray(o)?o.map(c):c(o)}return t}const ls=Wu();ls.filterProps=["sx"];const Gr=ls;function Gu(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Ku=["breakpoints","palette","spacing","shape"];function Kr(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,a=ue(e,Ku),c=Qc(n),l=pu(o);let u=Ye({breakpoints:c,direction:"ltr",components:{},palette:k({mode:"light"},r),spacing:l,shape:k({},tu,i)},a);return u.applyStyles=Gu,u=t.reduce((d,f)=>Ye(d,f),u),u.unstable_sxConfig=k({},Wr,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(f){return Gr({sx:f,theme:this})},u}function Xu(e){return Object.keys(e).length===0}function cs(e=null){const t=E.useContext(vr.ThemeContext);return!t||Xu(t)?e:t}const Yu=Kr();function us(e=Yu){return cs(e)}const Ju=["ownerState"],Zu=["variants"],Qu=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function ed(e){return Object.keys(e).length===0}function td(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Cn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const nd=Kr(),Jo=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Tn({defaultTheme:e,theme:t,themeId:n}){return ed(t)?e:t[n]||t}function rd(e){return e?(t,n)=>n[e]:null}function Pn(e,t){let{ownerState:n}=t,r=ue(t,Ju);const o=typeof e=="function"?e(k({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>Pn(i,k({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let c=ue(o,Zu);return i.forEach(l=>{let u=!0;typeof l.props=="function"?u=l.props(k({ownerState:n},r,n)):Object.keys(l.props).forEach(d=>{(n==null?void 0:n[d])!==l.props[d]&&r[d]!==l.props[d]&&(u=!1)}),u&&(Array.isArray(c)||(c=[c]),c.push(typeof l.style=="function"?l.style(k({ownerState:n},r,n)):l.style))}),c}return o}function od(e={}){const{themeId:t,defaultTheme:n=nd,rootShouldForwardProp:r=Cn,slotShouldForwardProp:o=Cn}=e,i=a=>Gr(k({},a,{theme:Tn(k({},a,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(a,c={})=>{vr.internal_processStyles(a,m=>m.filter(C=>!(C!=null&&C.__mui_systemSx)));const{name:l,slot:u,skipVariantsResolver:d,skipSx:f,overridesResolver:p=rd(Jo(u))}=c,b=ue(c,Qu),v=d!==void 0?d:u&&u!=="Root"&&u!=="root"||!1,g=f||!1;let h;process.env.NODE_ENV!=="production"&&l&&(h=`${l}-${Jo(u||"Root")}`);let T=Cn;u==="Root"||u==="root"?T=r:u?T=o:td(a)&&(T=void 0);const $=vr(a,k({shouldForwardProp:T,label:h},b)),x=m=>typeof m=="function"&&m.__emotion_real!==m||ht(m)?C=>Pn(m,k({},C,{theme:Tn({theme:C.theme,defaultTheme:n,themeId:t})})):m,w=(m,...C)=>{let P=x(m);const D=C?C.map(x):[];l&&p&&D.push(M=>{const z=Tn(k({},M,{defaultTheme:n,themeId:t}));if(!z.components||!z.components[l]||!z.components[l].styleOverrides)return null;const W=z.components[l].styleOverrides,L={};return Object.entries(W).forEach(([A,j])=>{L[A]=Pn(j,k({},M,{theme:z}))}),p(M,L)}),l&&!v&&D.push(M=>{var z;const W=Tn(k({},M,{defaultTheme:n,themeId:t})),L=W==null||(z=W.components)==null||(z=z[l])==null?void 0:z.variants;return Pn({variants:L},k({},M,{theme:W}))}),g||D.push(i);const S=D.length-C.length;if(Array.isArray(m)&&S>0){const M=new Array(S).fill("");P=[...m,...M],P.raw=[...m.raw,...M]}const N=$(P,...D);if(process.env.NODE_ENV!=="production"){let M;l&&(M=`${l}${He(u||"")}`),M===void 0&&(M=`Styled(${za(a)})`),N.displayName=M}return a.muiName&&(N.muiName=a.muiName),N};return $.withConfig&&(w.withConfig=$.withConfig),w}}function id(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:zi(t.components[n].defaultProps,r)}function sd({props:e,name:t,defaultTheme:n,themeId:r}){let o=us(n);return r&&(o=o[r]||o),id({theme:o,name:t,props:e})}function Xr(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),dl(e,t,n)}function ad(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function wt(e){if(e.type)return e;if(e.charAt(0)==="#")return wt(ad(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Mt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Mt(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function Jn(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function ld(e){e=wt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),a=(u,d=(u+n/30)%12)=>o-i*Math.max(Math.min(d-3,9-d,1),-1);let c="rgb";const l=[Math.round(a(0)*255),Math.round(a(8)*255),Math.round(a(4)*255)];return e.type==="hsla"&&(c+="a",l.push(t[3])),Jn({type:c,values:l})}function Zo(e){e=wt(e);let t=e.type==="hsl"||e.type==="hsla"?wt(ld(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Qo(e,t){const n=Zo(e),r=Zo(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function Dn(e,t){return e=wt(e),t=Xr(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Jn(e)}function cd(e,t){if(e=wt(e),t=Xr(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return Jn(e)}function ud(e,t){if(e=wt(e),t=Xr(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return Jn(e)}function dd(e,t){return k({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const pd={black:"#000",white:"#fff"},cn=pd,fd={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},hd=fd,md={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Tt=md,gd={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},kt=gd,bd={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Gt=bd,vd={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ot=vd,yd={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},St=yd,xd={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Ct=xd,wd=["mode","contrastThreshold","tonalOffset"],ei={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:cn.white,default:cn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},dr={text:{primary:cn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:cn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function ti(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=ud(e.main,o):t==="dark"&&(e.dark=cd(e.main,i)))}function Ed(e="light"){return e==="dark"?{main:Ot[200],light:Ot[50],dark:Ot[400]}:{main:Ot[700],light:Ot[400],dark:Ot[800]}}function Td(e="light"){return e==="dark"?{main:Tt[200],light:Tt[50],dark:Tt[400]}:{main:Tt[500],light:Tt[300],dark:Tt[700]}}function kd(e="light"){return e==="dark"?{main:kt[500],light:kt[300],dark:kt[700]}:{main:kt[700],light:kt[400],dark:kt[800]}}function Od(e="light"){return e==="dark"?{main:St[400],light:St[300],dark:St[700]}:{main:St[700],light:St[500],dark:St[900]}}function Sd(e="light"){return e==="dark"?{main:Ct[400],light:Ct[300],dark:Ct[700]}:{main:Ct[800],light:Ct[500],dark:Ct[900]}}function Cd(e="light"){return e==="dark"?{main:Gt[400],light:Gt[300],dark:Gt[700]}:{main:"#ed6c02",light:Gt[500],dark:Gt[900]}}function Pd(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=ue(e,wd),i=e.primary||Ed(t),a=e.secondary||Td(t),c=e.error||kd(t),l=e.info||Od(t),u=e.success||Sd(t),d=e.warning||Cd(t);function f(g){const h=Qo(g,dr.text.primary)>=n?dr.text.primary:ei.text.primary;if(process.env.NODE_ENV!=="production"){const T=Qo(g,h);T<3&&console.error([`MUI: The contrast ratio of ${T}:1 for ${h} on ${g}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return h}const p=({color:g,name:h,mainShade:T=500,lightShade:$=300,darkShade:x=700})=>{if(g=k({},g),!g.main&&g[T]&&(g.main=g[T]),!g.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${T}\` property.`:Mt(11,h?` (${h})`:"",T));if(typeof g.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(g.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Mt(12,h?` (${h})`:"",JSON.stringify(g.main)));return ti(g,"light",$,r),ti(g,"dark",x,r),g.contrastText||(g.contrastText=f(g.main)),g},b={dark:dr,light:ei};return process.env.NODE_ENV!=="production"&&(b[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),Ye(k({common:k({},cn),mode:t,primary:p({color:i,name:"primary"}),secondary:p({color:a,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:p({color:c,name:"error"}),warning:p({color:d,name:"warning"}),info:p({color:l,name:"info"}),success:p({color:u,name:"success"}),grey:hd,contrastThreshold:n,getContrastText:f,augmentColor:p,tonalOffset:r},b[t]),o)}const Nd=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Rd(e){return Math.round(e*1e5)/1e5}const ni={textTransform:"uppercase"},ri='"Roboto", "Helvetica", "Arial", sans-serif';function $d(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=ri,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:a=400,fontWeightMedium:c=500,fontWeightBold:l=700,htmlFontSize:u=16,allVariants:d,pxToRem:f}=n,p=ue(n,Nd);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const b=o/14,v=f||(T=>`${T/u*b}rem`),g=(T,$,x,w,m)=>k({fontFamily:r,fontWeight:T,fontSize:v($),lineHeight:x},r===ri?{letterSpacing:`${Rd(w/$)}em`}:{},m,d),h={h1:g(i,96,1.167,-1.5),h2:g(i,60,1.2,-.5),h3:g(a,48,1.167,0),h4:g(a,34,1.235,.25),h5:g(a,24,1.334,0),h6:g(c,20,1.6,.15),subtitle1:g(a,16,1.75,.15),subtitle2:g(c,14,1.57,.1),body1:g(a,16,1.5,.15),body2:g(a,14,1.43,.15),button:g(c,14,1.75,.4,ni),caption:g(a,12,1.66,.4),overline:g(a,12,2.66,1,ni),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return Ye(k({htmlFontSize:u,pxToRem:v,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:a,fontWeightMedium:c,fontWeightBold:l},h),p,{clone:!1})}const Md=.2,jd=.14,Id=.12;function fe(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Md})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${jd})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Id})`].join(",")}const _d=["none",fe(0,2,1,-1,0,1,1,0,0,1,3,0),fe(0,3,1,-2,0,2,2,0,0,1,5,0),fe(0,3,3,-2,0,3,4,0,0,1,8,0),fe(0,2,4,-1,0,4,5,0,0,1,10,0),fe(0,3,5,-1,0,5,8,0,0,1,14,0),fe(0,3,5,-1,0,6,10,0,0,1,18,0),fe(0,4,5,-2,0,7,10,1,0,2,16,1),fe(0,5,5,-3,0,8,10,1,0,3,14,2),fe(0,5,6,-3,0,9,12,1,0,3,16,2),fe(0,6,6,-3,0,10,14,1,0,4,18,3),fe(0,6,7,-4,0,11,15,1,0,4,20,3),fe(0,7,8,-4,0,12,17,2,0,5,22,4),fe(0,7,8,-4,0,13,19,2,0,5,24,4),fe(0,7,9,-4,0,14,21,2,0,5,26,4),fe(0,8,9,-5,0,15,22,2,0,6,28,5),fe(0,8,10,-5,0,16,24,2,0,6,30,5),fe(0,8,11,-5,0,17,26,2,0,6,32,5),fe(0,9,11,-5,0,18,28,2,0,7,34,6),fe(0,9,12,-6,0,19,29,2,0,7,36,6),fe(0,10,13,-6,0,20,31,3,0,8,38,7),fe(0,10,13,-6,0,21,33,3,0,8,40,7),fe(0,10,14,-6,0,22,35,3,0,8,42,7),fe(0,11,14,-7,0,23,36,3,0,9,44,8),fe(0,11,15,-7,0,24,38,3,0,9,46,8)],Ad=_d,Dd=["duration","easing","delay"],Bd={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Ld={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function oi(e){return`${Math.round(e)}ms`}function Fd(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Vd(e){const t=k({},Bd,e.easing),n=k({},Ld,e.duration);return k({getAutoHeightDuration:Fd,create:(o=["all"],i={})=>{const{duration:a=n.standard,easing:c=t.easeInOut,delay:l=0}=i,u=ue(i,Dd);if(process.env.NODE_ENV!=="production"){const d=p=>typeof p=="string",f=p=>!isNaN(parseFloat(p));!d(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!f(a)&&!d(a)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`),d(c)||console.error('MUI: Argument "easing" must be a string.'),!f(l)&&!d(l)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(d=>`${d} ${typeof a=="string"?a:oi(a)} ${c} ${typeof l=="string"?l:oi(l)}`).join(",")}},e,{easing:t,duration:n})}const zd={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Ud=zd,Hd=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function qd(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,a=ue(e,Hd);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Mt(18));const c=Pd(r),l=Kr(e);let u=Ye(l,{mixins:dd(l.breakpoints,n),palette:c,shadows:Ad.slice(),typography:$d(c,i),transitions:Vd(o),zIndex:k({},Ud)});if(u=Ye(u,a),u=t.reduce((d,f)=>Ye(d,f),u),process.env.NODE_ENV!=="production"){const d=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],f=(p,b)=>{let v;for(v in p){const g=p[v];if(d.indexOf(v)!==-1&&Object.keys(g).length>0){if(process.env.NODE_ENV!=="production"){const h=We("",v);console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${v}\` internal state.`,"You can not override it like this: ",JSON.stringify(p,null,2),"",`Instead, you need to use the '&.${h}' syntax:`,JSON.stringify({root:{[`&.${h}`]:g}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}p[v]={}}}};Object.keys(u.components).forEach(p=>{const b=u.components[p].styleOverrides;b&&p.indexOf("Mui")===0&&f(b,p)})}return u.unstable_sxConfig=k({},Wr,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(f){return Gr({sx:f,theme:this})},u}const Wd=qd(),Yr=Wd,Jr="$$material",ds=e=>Cn(e)&&e!=="classes",Gd=od({themeId:Jr,defaultTheme:Yr,rootShouldForwardProp:ds}),Te=Gd;function bn(){const e=us(Yr);return process.env.NODE_ENV!=="production"&&E.useDebugValue(e),e[Jr]||e}function tt({props:e,name:t}){return sd({props:e,name:t,defaultTheme:Yr,themeId:Jr})}function Sr(e,t){return Sr=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},Sr(e,t)}function Kd(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Sr(e,t)}const ii={disabled:!1};var Xd=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.shape({enter:s.number,exit:s.number,appear:s.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&s.oneOfType([s.string,s.shape({enter:s.string,exit:s.string,active:s.string}),s.shape({enter:s.string,enterDone:s.string,enterActive:s.string,exit:s.string,exitDone:s.string,exitActive:s.string})]);const ps=X.createContext(null);var Yd=function(t){return t.scrollTop},Qt="unmounted",dt="exited",pt="entering",Rt="entered",Cr="exiting",nt=function(e){Kd(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var a=o,c=a&&!a.isMounting?r.enter:r.appear,l;return i.appearStatus=null,r.in?c?(l=dt,i.appearStatus=pt):l=Rt:r.unmountOnExit||r.mountOnEnter?l=Qt:l=dt,i.state={status:l},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var a=o.in;return a&&i.status===Qt?{status:dt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var a=this.state.status;this.props.in?a!==pt&&a!==Rt&&(i=pt):(a===pt||a===Rt)&&(i=Cr)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,a,c;return i=a=c=o,o!=null&&typeof o!="number"&&(i=o.exit,a=o.enter,c=o.appear!==void 0?o.appear:a),{exit:i,enter:a,appear:c}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===pt){if(this.props.unmountOnExit||this.props.mountOnEnter){var a=this.props.nodeRef?this.props.nodeRef.current:Yt.findDOMNode(this);a&&Yd(a)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===dt&&this.setState({status:Qt})},n.performEnter=function(o){var i=this,a=this.props.enter,c=this.context?this.context.isMounting:o,l=this.props.nodeRef?[c]:[Yt.findDOMNode(this),c],u=l[0],d=l[1],f=this.getTimeouts(),p=c?f.appear:f.enter;if(!o&&!a||ii.disabled){this.safeSetState({status:Rt},function(){i.props.onEntered(u)});return}this.props.onEnter(u,d),this.safeSetState({status:pt},function(){i.props.onEntering(u,d),i.onTransitionEnd(p,function(){i.safeSetState({status:Rt},function(){i.props.onEntered(u,d)})})})},n.performExit=function(){var o=this,i=this.props.exit,a=this.getTimeouts(),c=this.props.nodeRef?void 0:Yt.findDOMNode(this);if(!i||ii.disabled){this.safeSetState({status:dt},function(){o.props.onExited(c)});return}this.props.onExit(c),this.safeSetState({status:Cr},function(){o.props.onExiting(c),o.onTransitionEnd(a.exit,function(){o.safeSetState({status:dt},function(){o.props.onExited(c)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,a=!0;return this.nextCallback=function(c){a&&(a=!1,i.nextCallback=null,o(c))},this.nextCallback.cancel=function(){a=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var a=this.props.nodeRef?this.props.nodeRef.current:Yt.findDOMNode(this),c=o==null&&!this.props.addEndListener;if(!a||c){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var l=this.props.nodeRef?[this.nextCallback]:[a,this.nextCallback],u=l[0],d=l[1];this.props.addEndListener(u,d)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===Qt)return null;var i=this.props,a=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var c=ue(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return X.createElement(ps.Provider,{value:null},typeof a=="function"?a(o,c):X.cloneElement(X.Children.only(a),c))},t}(X.Component);nt.contextType=ps;nt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:s.shape({current:typeof Element>"u"?s.any:function(e,t,n,r,o,i){var a=e[t];return s.instanceOf(a&&"ownerDocument"in a?a.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:s.oneOfType([s.func.isRequired,s.element.isRequired]).isRequired,in:s.bool,mountOnEnter:s.bool,unmountOnExit:s.bool,appear:s.bool,enter:s.bool,exit:s.bool,timeout:function(t){var n=Xd;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:s.func,onEnter:s.func,onEntering:s.func,onEntered:s.func,onExit:s.func,onExiting:s.func,onExited:s.func}:{};function Pt(){}nt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Pt,onEntering:Pt,onEntered:Pt,onExit:Pt,onExiting:Pt,onExited:Pt};nt.UNMOUNTED=Qt;nt.EXITED=dt;nt.ENTERING=pt;nt.ENTERED=Rt;nt.EXITING=Cr;const fs=nt,hs=e=>e.scrollTop;function Bn(e,t){var n,r;const{timeout:o,easing:i,style:a={}}=e;return{duration:(n=a.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=a.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:a.transitionDelay}}const Jd=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function Pr(e){return`scale(${e}, ${e**2})`}const Zd={entering:{opacity:1,transform:Pr(1)},entered:{opacity:1,transform:"none"}},pr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Zr=E.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:a,in:c,onEnter:l,onEntered:u,onEntering:d,onExit:f,onExited:p,onExiting:b,style:v,timeout:g="auto",TransitionComponent:h=fs}=t,T=ue(t,Jd),$=Jt(),x=E.useRef(),w=bn(),m=E.useRef(null),C=Be(m,i.ref,n),P=A=>j=>{if(A){const B=m.current;j===void 0?A(B):A(B,j)}},D=P(d),S=P((A,j)=>{hs(A);const{duration:B,delay:ee,easing:Q}=Bn({style:v,timeout:g,easing:a},{mode:"enter"});let O;g==="auto"?(O=w.transitions.getAutoHeightDuration(A.clientHeight),x.current=O):O=B,A.style.transition=[w.transitions.create("opacity",{duration:O,delay:ee}),w.transitions.create("transform",{duration:pr?O:O*.666,delay:ee,easing:Q})].join(","),l&&l(A,j)}),N=P(u),M=P(b),z=P(A=>{const{duration:j,delay:B,easing:ee}=Bn({style:v,timeout:g,easing:a},{mode:"exit"});let Q;g==="auto"?(Q=w.transitions.getAutoHeightDuration(A.clientHeight),x.current=Q):Q=j,A.style.transition=[w.transitions.create("opacity",{duration:Q,delay:B}),w.transitions.create("transform",{duration:pr?Q:Q*.666,delay:pr?B:B||Q*.333,easing:ee})].join(","),A.style.opacity=0,A.style.transform=Pr(.75),f&&f(A)}),W=P(p),L=A=>{g==="auto"&&$.start(x.current||0,A),r&&r(m.current,A)};return y.jsx(h,k({appear:o,in:c,nodeRef:m,onEnter:S,onEntered:N,onEntering:D,onExit:z,onExited:W,onExiting:M,addEndListener:L,timeout:g==="auto"?null:g},T,{children:(A,j)=>E.cloneElement(i,k({style:k({opacity:0,transform:Pr(.75),visibility:A==="exited"&&!c?"hidden":void 0},Zd[A],v,i.props.style),ref:C},j))}))});process.env.NODE_ENV!=="production"&&(Zr.propTypes={addEndListener:s.func,appear:s.bool,children:dn.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});Zr.muiSupportAuto=!0;const Nr=Zr,Qd=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},si=Qd,ep=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],tp=Te(is,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),ms=E.forwardRef(function(t,n){var r;const o=cs(),i=tt({props:t,name:"MuiPopper"}),{anchorEl:a,component:c,components:l,componentsProps:u,container:d,disablePortal:f,keepMounted:p,modifiers:b,open:v,placement:g,popperOptions:h,popperRef:T,transition:$,slots:x,slotProps:w}=i,m=ue(i,ep),C=(r=x==null?void 0:x.root)!=null?r:l==null?void 0:l.Root,P=k({anchorEl:a,container:d,disablePortal:f,keepMounted:p,modifiers:b,open:v,placement:g,popperOptions:h,popperRef:T,transition:$},m);return y.jsx(tp,k({as:c,direction:o==null?void 0:o.direction,slots:{root:C},slotProps:w??u},P,{ref:n}))});process.env.NODE_ENV!=="production"&&(ms.propTypes={anchorEl:s.oneOfType([Je,s.object,s.func]),children:s.oneOfType([s.node,s.func]),component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Je,s.func]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:Ar,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transition:s.bool});const gs=ms;function np(e){return We("MuiTooltip",e)}const rp=it("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),ot=rp,op=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function ip(e){return Math.round(e*1e5)/1e5}const sp=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,a={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${He(i.split("-")[0])}`],arrow:["arrow"]};return et(a,np,t)},ap=Te(gs,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>k({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${ot.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${ot.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${ot.arrow}`]:k({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${ot.arrow}`]:k({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),lp=Te("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${He(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>k({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:Dn(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${ip(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${ot.popper}[data-popper-placement*="left"] &`]:k({transformOrigin:"right center"},t.isRtl?k({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):k({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${ot.popper}[data-popper-placement*="right"] &`]:k({transformOrigin:"left center"},t.isRtl?k({marginRight:"14px"},t.touch&&{marginRight:"24px"}):k({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${ot.popper}[data-popper-placement*="top"] &`]:k({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${ot.popper}[data-popper-placement*="bottom"] &`]:k({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),cp=Te("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:Dn(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let kn=!1;const ai=new pn;let Kt={x:0,y:0};function On(e,t){return n=>{t&&t(n),e(n)}}const bs=E.forwardRef(function(t,n){var r,o,i,a,c,l,u,d,f,p,b,v,g,h,T,$,x,w,m;const C=tt({props:t,name:"MuiTooltip"}),{arrow:P=!1,children:D,components:S={},componentsProps:N={},describeChild:M=!1,disableFocusListener:z=!1,disableHoverListener:W=!1,disableInteractive:L=!1,disableTouchListener:A=!1,enterDelay:j=100,enterNextDelay:B=0,enterTouchDelay:ee=700,followCursor:Q=!1,id:O,leaveDelay:_=0,leaveTouchDelay:V=1500,onClose:K,onOpen:F,open:U,placement:q="bottom",PopperComponent:G,PopperProps:H={},slotProps:Y={},slots:J={},title:re,TransitionComponent:I=Nr,TransitionProps:Z}=C,R=ue(C,op),oe=E.isValidElement(D)?D:y.jsx("span",{children:D}),ye=bn(),ke=ye.direction==="rtl",[ge,lt]=E.useState(),[Oe,Ge]=E.useState(null),Ne=E.useRef(!1),Ke=L||Q,xe=Jt(),Et=Jt(),ct=Jt(),Ft=Jt(),[vn,ro]=Ai({controlled:U,default:!1,name:"Tooltip",state:"open"});let Xe=vn;if(process.env.NODE_ENV!=="production"){const{current:te}=E.useRef(U!==void 0);E.useEffect(()=>{ge&&ge.disabled&&!te&&re!==""&&ge.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[re,ge,te])}const Zn=_i(O),Vt=E.useRef(),yn=on(()=>{Vt.current!==void 0&&(document.body.style.WebkitUserSelect=Vt.current,Vt.current=void 0),Ft.clear()});E.useEffect(()=>yn,[yn]);const oo=te=>{ai.clear(),kn=!0,ro(!0),F&&!Xe&&F(te)},xn=on(te=>{ai.start(800+_,()=>{kn=!1}),ro(!1),K&&Xe&&K(te),xe.start(ye.transitions.duration.shortest,()=>{Ne.current=!1})}),Qn=te=>{Ne.current&&te.type!=="touchstart"||(ge&&ge.removeAttribute("title"),Et.clear(),ct.clear(),j||kn&&B?Et.start(kn?B:j,()=>{oo(te)}):oo(te))},io=te=>{Et.clear(),ct.start(_,()=>{xn(te)})},{isFocusVisibleRef:so,onBlur:_s,onFocus:As,ref:Ds}=Di(),[,ao]=E.useState(!1),lo=te=>{_s(te),so.current===!1&&(ao(!1),io(te))},co=te=>{ge||lt(te.currentTarget),As(te),so.current===!0&&(ao(!0),Qn(te))},uo=te=>{Ne.current=!0;const Re=oe.props;Re.onTouchStart&&Re.onTouchStart(te)},po=Qn,fo=io,Bs=te=>{uo(te),ct.clear(),xe.clear(),yn(),Vt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Ft.start(ee,()=>{document.body.style.WebkitUserSelect=Vt.current,Qn(te)})},Ls=te=>{oe.props.onTouchEnd&&oe.props.onTouchEnd(te),yn(),ct.start(V,()=>{xn(te)})};E.useEffect(()=>{if(!Xe)return;function te(Re){(Re.key==="Escape"||Re.key==="Esc")&&xn(Re)}return document.addEventListener("keydown",te),()=>{document.removeEventListener("keydown",te)}},[xn,Xe]);const Fs=Be(oe.ref,Ds,lt,n);!re&&re!==0&&(Xe=!1);const er=E.useRef(),Vs=te=>{const Re=oe.props;Re.onMouseMove&&Re.onMouseMove(te),Kt={x:te.clientX,y:te.clientY},er.current&&er.current.update()},zt={},tr=typeof re=="string";M?(zt.title=!Xe&&tr&&!W?re:null,zt["aria-describedby"]=Xe?Zn:null):(zt["aria-label"]=tr?re:null,zt["aria-labelledby"]=Xe&&!tr?Zn:null);const _e=k({},zt,R,oe.props,{className:we(R.className,oe.props.className),onTouchStart:uo,ref:Fs},Q?{onMouseMove:Vs}:{});process.env.NODE_ENV!=="production"&&(_e["data-mui-internal-clone-element"]=!0,E.useEffect(()=>{ge&&!ge.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[ge]));const Ut={};A||(_e.onTouchStart=Bs,_e.onTouchEnd=Ls),W||(_e.onMouseOver=On(po,_e.onMouseOver),_e.onMouseLeave=On(fo,_e.onMouseLeave),Ke||(Ut.onMouseOver=po,Ut.onMouseLeave=fo)),z||(_e.onFocus=On(co,_e.onFocus),_e.onBlur=On(lo,_e.onBlur),Ke||(Ut.onFocus=co,Ut.onBlur=lo)),process.env.NODE_ENV!=="production"&&oe.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${oe.props.title}\` or the Tooltip component.`].join(`
`));const zs=E.useMemo(()=>{var te;let Re=[{name:"arrow",enabled:!!Oe,options:{element:Oe,padding:4}}];return(te=H.popperOptions)!=null&&te.modifiers&&(Re=Re.concat(H.popperOptions.modifiers)),k({},H.popperOptions,{modifiers:Re})},[Oe,H]),Ht=k({},C,{isRtl:ke,arrow:P,disableInteractive:Ke,placement:q,PopperComponentProp:G,touch:Ne.current}),nr=sp(Ht),ho=(r=(o=J.popper)!=null?o:S.Popper)!=null?r:ap,mo=(i=(a=(c=J.transition)!=null?c:S.Transition)!=null?a:I)!=null?i:Nr,go=(l=(u=J.tooltip)!=null?u:S.Tooltip)!=null?l:lp,bo=(d=(f=J.arrow)!=null?f:S.Arrow)!=null?d:cp,Us=Zt(ho,k({},H,(p=Y.popper)!=null?p:N.popper,{className:we(nr.popper,H==null?void 0:H.className,(b=(v=Y.popper)!=null?v:N.popper)==null?void 0:b.className)}),Ht),Hs=Zt(mo,k({},Z,(g=Y.transition)!=null?g:N.transition),Ht),qs=Zt(go,k({},(h=Y.tooltip)!=null?h:N.tooltip,{className:we(nr.tooltip,(T=($=Y.tooltip)!=null?$:N.tooltip)==null?void 0:T.className)}),Ht),Ws=Zt(bo,k({},(x=Y.arrow)!=null?x:N.arrow,{className:we(nr.arrow,(w=(m=Y.arrow)!=null?m:N.arrow)==null?void 0:w.className)}),Ht);return y.jsxs(E.Fragment,{children:[E.cloneElement(oe,_e),y.jsx(ho,k({as:G??gs,placement:q,anchorEl:Q?{getBoundingClientRect:()=>({top:Kt.y,left:Kt.x,right:Kt.x,bottom:Kt.y,width:0,height:0})}:ge,popperRef:er,open:ge?Xe:!1,id:Zn,transition:!0},Ut,Us,{popperOptions:zs,children:({TransitionProps:te})=>y.jsx(mo,k({timeout:ye.transitions.duration.shorter},te,Hs,{children:y.jsxs(go,k({},qs,{children:[re,P?y.jsx(bo,k({},Ws,{ref:Ge})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(bs.propTypes={arrow:s.bool,children:dn.isRequired,classes:s.object,className:s.string,components:s.shape({Arrow:s.elementType,Popper:s.elementType,Tooltip:s.elementType,Transition:s.elementType}),componentsProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),describeChild:s.bool,disableFocusListener:s.bool,disableHoverListener:s.bool,disableInteractive:s.bool,disableTouchListener:s.bool,enterDelay:s.number,enterNextDelay:s.number,enterTouchDelay:s.number,followCursor:s.bool,id:s.string,leaveDelay:s.number,leaveTouchDelay:s.number,onClose:s.func,onOpen:s.func,open:s.bool,placement:s.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:s.elementType,PopperProps:s.object,slotProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),slots:s.shape({arrow:s.elementType,popper:s.elementType,tooltip:s.elementType,transition:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),title:s.node,TransitionComponent:s.elementType,TransitionProps:s.object});const up=bs;var Qr={},vs={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(vs);var dp=vs.exports,fr={};function pp(e){return We("MuiSvgIcon",e)}it("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const fp=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],hp=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${He(t)}`,`fontSize${He(n)}`]};return et(o,pp,r)},mp=Te("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${He(n.color)}`],t[`fontSize${He(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,a,c,l,u,d,f,p,b,v;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(a=i.pxToRem)==null?void 0:a.call(i,20))||"1.25rem",medium:((c=e.typography)==null||(l=c.pxToRem)==null?void 0:l.call(c,24))||"1.5rem",large:((u=e.typography)==null||(d=u.pxToRem)==null?void 0:d.call(u,35))||"2.1875rem"}[t.fontSize],color:(f=(p=(e.vars||e).palette)==null||(p=p[t.color])==null?void 0:p.main)!=null?f:{action:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.active,disabled:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.disabled,inherit:void 0}[t.color]}}),eo=E.forwardRef(function(t,n){const r=tt({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:a="inherit",component:c="svg",fontSize:l="medium",htmlColor:u,inheritViewBox:d=!1,titleAccess:f,viewBox:p="0 0 24 24"}=r,b=ue(r,fp),v=E.isValidElement(o)&&o.type==="svg",g=k({},r,{color:a,component:c,fontSize:l,instanceFontSize:t.fontSize,inheritViewBox:d,viewBox:p,hasSvgAsChild:v}),h={};d||(h.viewBox=p);const T=hp(g);return y.jsxs(mp,k({as:c,className:we(T.root,i),focusable:"false",color:u,"aria-hidden":f?void 0:!0,role:f?"img":void 0,ref:n},h,b,v&&o.props,{ownerState:g,children:[v?o.props.children:o,f?y.jsx("title",{children:f}):null]}))});process.env.NODE_ENV!=="production"&&(eo.propTypes={children:s.node,classes:s.object,className:s.string,color:s.oneOfType([s.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),s.string]),component:s.elementType,fontSize:s.oneOfType([s.oneOf(["inherit","large","medium","small"]),s.string]),htmlColor:s.string,inheritViewBox:s.bool,shapeRendering:s.string,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),titleAccess:s.string,viewBox:s.string});eo.muiName="SvgIcon";const li=eo;function ys(e,t){function n(r,o){return y.jsx(li,k({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=li.muiName,E.memo(E.forwardRef(n))}const gp={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Ui.configure(e)}},bp=Object.freeze(Object.defineProperty({__proto__:null,capitalize:He,createChainedFunction:wr,createSvgIcon:ys,debounce:Ii,deprecatedPropType:Ha,isMuiElement:qa,ownerDocument:Ee,ownerWindow:jt,requirePropFactory:Wa,setRef:Mn,unstable_ClassNameGenerator:gp,unstable_useEnhancedEffect:vt,unstable_useId:_i,unsupportedProp:Xa,useControlled:Ai,useEventCallback:on,useForkRef:Be,useIsFocusVisible:Di},Symbol.toStringTag,{value:"Module"})),vp=Ta(bp);var ci;function yp(){return ci||(ci=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=vp}(fr)),fr}var xp=dp;Object.defineProperty(Qr,"__esModule",{value:!0});var xs=Qr.default=void 0,wp=xp(yp()),Ep=y;xs=Qr.default=(0,wp.default)((0,Ep.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function ui(e,t,n){return e?y.jsx(pe.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:y.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function to(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:a=void 0,hasAutoFocus:c=!1,className:l,isDisabled:u=!1,isDense:d=!0,isSubMenuParent:f=!1,hasDisabledGutters:p=!1,hasDivider:b=!1,focusVisibleClassName:v,id:g,children:h}=e,T=y.jsx(pe.MenuItem,{sx:{lineHeight:.8},autoFocus:c,className:l,disabled:u,dense:d,disableGutters:p,divider:b,focusVisibleClassName:v,onClick:t,id:g,children:n?y.jsxs(y.Fragment,{children:[ui(i,n,!0),y.jsx(pe.ListItemText,{primary:n,inset:!i&&o}),f?y.jsx(pe.ListItemIcon,{className:"papi-menu-icon-trailing",children:y.jsx(xs,{})}):ui(a,n,!1)]}):h});return r?y.jsx(up,{title:r,placement:"right",children:y.jsx("div",{children:T})}):T}function ws(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Tp(e){const[t,n]=X.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,a=u=>{n(u.currentTarget)},c=()=>{n(void 0)},l=()=>{let u=ws(i).filter(d=>"menuItem"in d.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return u=u.filter(d=>"menuItem"in d.group&&d.group.menuItem===r.id),y.jsx(no,{...e,includedGroups:u})};return y.jsxs(y.Fragment,{children:[y.jsx(to,{onClick:a,...o,isSubMenuParent:!0}),y.jsx(pe.Menu,{anchorEl:t,open:!!t,onClose:c,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:l()},r.id)]})}const kp=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function no(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:a}=X.useMemo(()=>{const d=o&&o.length>0?o:ws(t).filter(v=>!("menuItem"in v.group)),f=Object.values(d).sort((v,g)=>(v.group.order||0)-(g.group.order||0)),p=[];f.forEach(v=>{kp(v.id,t.items).forEach(g=>p.push({item:g,isLastItemInGroup:!1})),p.length>0&&(p[p.length-1].isLastItemInGroup=!0)}),p.length>0&&(p[p.length-1].isLastItemInGroup=!1);const b=p.some(v=>"iconPathBefore"in v.item&&v.item.iconPathBefore);return{items:p,allowForLeadingIcons:b}},[o,t]),c=({item:d,isLastItemInGroup:f})=>({className:"papi-menu-item",label:d.label,tooltip:d.tooltip,iconPathBefore:"iconPathBefore"in d?d.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in d?d.iconPathAfter:void 0,hasDivider:f,allowForLeadingIcons:a}),[l]=i;if(!l)return y.jsx("div",{});const u=l.item.group;return y.jsx("div",{role:"menu","aria-label":u,children:i.map((d,f)=>{const{item:p}=d,b=c(d);if("command"in p){const v=p.group+f;return y.jsx(to,{onClick:g=>{n==null||n(g),r(p)},...b},v)}return y.jsx(Tp,{parentMenuItem:p,parentItemProps:b,...e},u+p.id)})},u)}function Op(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([a,c])=>({id:a,group:c})).filter(a=>"column"in a.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(a=>"column"in a.group&&a.group.column===n)),y.jsx(no,{...e,includedGroups:i})}function Sp({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return y.jsxs(pe.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[y.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),y.jsx(pe.List,{id:n,dense:!0,className:i??"",children:y.jsx(Op,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Es({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=X.useMemo(()=>{const a=new Map;return Object.getOwnPropertyNames(o).forEach(c=>{if(c==="isExtensible")return;const l=c,u=o[l];typeof u=="object"&&typeof u.order=="number"&&!Number.isNaN(u.order)?a.set(u.order,{id:l,metadata:u}):console.warn(`Property ${c} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(a.values()).sort((c,l)=>(c.metadata.order||0)-(l.metadata.order||0))},[o,r]);return y.jsx(pe.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((a,c)=>y.jsx(Sp,{commandHandler:e,menuDefinition:n,...a,className:t},c))})}const Ts=E.createContext({});process.env.NODE_ENV!=="production"&&(Ts.displayName="ListContext");const Cp=Ts;function Pp(e){return We("MuiList",e)}it("MuiList",["root","padding","dense","subheader"]);const Np=["children","className","component","dense","disablePadding","subheader"],Rp=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return et({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},Pp,t)},$p=Te("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>k({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),ks=E.forwardRef(function(t,n){const r=tt({props:t,name:"MuiList"}),{children:o,className:i,component:a="ul",dense:c=!1,disablePadding:l=!1,subheader:u}=r,d=ue(r,Np),f=E.useMemo(()=>({dense:c}),[c]),p=k({},r,{component:a,dense:c,disablePadding:l}),b=Rp(p);return y.jsx(Cp.Provider,{value:f,children:y.jsxs($p,k({as:a,className:we(b.root,i),ref:n,ownerState:p},d,{children:[u,o]}))})});process.env.NODE_ENV!=="production"&&(ks.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,dense:s.bool,disablePadding:s.bool,subheader:s.node,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const Mp=ks,jp=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function hr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function di(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function Os(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function Xt(e,t,n,r,o,i){let a=!1,c=o(e,t,t?n:!1);for(;c;){if(c===e.firstChild){if(a)return!1;a=!0}const l=r?!1:c.disabled||c.getAttribute("aria-disabled")==="true";if(!c.hasAttribute("tabindex")||!Os(c,i)||l)c=o(e,c,n);else return c.focus(),!0}return!1}const Ss=E.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:a,className:c,disabledItemsFocusable:l=!1,disableListWrap:u=!1,onKeyDown:d,variant:f="selectedMenu"}=t,p=ue(t,jp),b=E.useRef(null),v=E.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});vt(()=>{o&&b.current.focus()},[o]),E.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(x,w)=>{const m=!b.current.style.width;if(x.clientHeight<b.current.clientHeight&&m){const C=`${Bi(Ee(x))}px`;b.current.style[w.direction==="rtl"?"paddingLeft":"paddingRight"]=C,b.current.style.width=`calc(100% + ${C})`}return b.current}}),[]);const g=x=>{const w=b.current,m=x.key,C=Ee(w).activeElement;if(m==="ArrowDown")x.preventDefault(),Xt(w,C,u,l,hr);else if(m==="ArrowUp")x.preventDefault(),Xt(w,C,u,l,di);else if(m==="Home")x.preventDefault(),Xt(w,null,u,l,hr);else if(m==="End")x.preventDefault(),Xt(w,null,u,l,di);else if(m.length===1){const P=v.current,D=m.toLowerCase(),S=performance.now();P.keys.length>0&&(S-P.lastTime>500?(P.keys=[],P.repeating=!0,P.previousKeyMatched=!0):P.repeating&&D!==P.keys[0]&&(P.repeating=!1)),P.lastTime=S,P.keys.push(D);const N=C&&!P.repeating&&Os(C,P);P.previousKeyMatched&&(N||Xt(w,C,!1,l,hr,P))?x.preventDefault():P.previousKeyMatched=!1}d&&d(x)},h=Be(b,n);let T=-1;E.Children.forEach(a,(x,w)=>{if(!E.isValidElement(x)){T===w&&(T+=1,T>=a.length&&(T=-1));return}process.env.NODE_ENV!=="production"&&$n.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(f==="selectedMenu"&&x.props.selected||T===-1)&&(T=w),T===w&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(T+=1,T>=a.length&&(T=-1))});const $=E.Children.map(a,(x,w)=>{if(w===T){const m={};return i&&(m.autoFocus=!0),x.props.tabIndex===void 0&&f==="selectedMenu"&&(m.tabIndex=0),E.cloneElement(x,m)}return x});return y.jsx(Mp,k({role:"menu",ref:h,className:c,onKeyDown:g,tabIndex:o?0:-1},p,{children:$}))});process.env.NODE_ENV!=="production"&&(Ss.propTypes={autoFocus:s.bool,autoFocusItem:s.bool,children:s.node,className:s.string,disabledItemsFocusable:s.bool,disableListWrap:s.bool,onKeyDown:s.func,variant:s.oneOf(["menu","selectedMenu"])});const Ip=Ss,_p=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Ap={entering:{opacity:1},entered:{opacity:1}},Cs=E.forwardRef(function(t,n){const r=bn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:a=!0,children:c,easing:l,in:u,onEnter:d,onEntered:f,onEntering:p,onExit:b,onExited:v,onExiting:g,style:h,timeout:T=o,TransitionComponent:$=fs}=t,x=ue(t,_p),w=E.useRef(null),m=Be(w,c.ref,n),C=L=>A=>{if(L){const j=w.current;A===void 0?L(j):L(j,A)}},P=C(p),D=C((L,A)=>{hs(L);const j=Bn({style:h,timeout:T,easing:l},{mode:"enter"});L.style.webkitTransition=r.transitions.create("opacity",j),L.style.transition=r.transitions.create("opacity",j),d&&d(L,A)}),S=C(f),N=C(g),M=C(L=>{const A=Bn({style:h,timeout:T,easing:l},{mode:"exit"});L.style.webkitTransition=r.transitions.create("opacity",A),L.style.transition=r.transitions.create("opacity",A),b&&b(L)}),z=C(v),W=L=>{i&&i(w.current,L)};return y.jsx($,k({appear:a,in:u,nodeRef:w,onEnter:D,onEntered:S,onEntering:P,onExit:M,onExited:z,onExiting:N,addEndListener:W,timeout:T},x,{children:(L,A)=>E.cloneElement(c,k({style:k({opacity:0,visibility:L==="exited"&&!u?"hidden":void 0},Ap[L],h,c.props.style),ref:m},A))}))});process.env.NODE_ENV!=="production"&&(Cs.propTypes={addEndListener:s.func,appear:s.bool,children:dn.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const Dp=Cs;function Bp(e){return We("MuiBackdrop",e)}it("MuiBackdrop",["root","invisible"]);const Lp=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Fp=e=>{const{classes:t,invisible:n}=e;return et({root:["root",n&&"invisible"]},Bp,t)},Vp=Te("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>k({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),Ps=E.forwardRef(function(t,n){var r,o,i;const a=tt({props:t,name:"MuiBackdrop"}),{children:c,className:l,component:u="div",components:d={},componentsProps:f={},invisible:p=!1,open:b,slotProps:v={},slots:g={},TransitionComponent:h=Dp,transitionDuration:T}=a,$=ue(a,Lp),x=k({},a,{component:u,invisible:p}),w=Fp(x),m=(r=v.root)!=null?r:f.root;return y.jsx(h,k({in:b,timeout:T},$,{children:y.jsx(Vp,k({"aria-hidden":!0},m,{as:(o=(i=g.root)!=null?i:d.Root)!=null?o:u,className:we(w.root,l,m==null?void 0:m.className),ownerState:k({},x,m==null?void 0:m.ownerState),classes:w,ref:n,children:c}))}))});process.env.NODE_ENV!=="production"&&(Ps.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.object}),invisible:s.bool,open:s.bool.isRequired,slotProps:s.shape({root:s.object}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const zp=Ps;function Up(e){return We("MuiModal",e)}it("MuiModal",["root","hidden","backdrop"]);const Hp=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],qp=e=>{const{open:t,exited:n,classes:r}=e;return et({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},Up,r)},Wp=Te("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>k({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Gp=Te(zp,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Ns=E.forwardRef(function(t,n){var r,o,i,a,c,l;const u=tt({name:"MuiModal",props:t}),{BackdropComponent:d=Gp,BackdropProps:f,className:p,closeAfterTransition:b=!1,children:v,container:g,component:h,components:T={},componentsProps:$={},disableAutoFocus:x=!1,disableEnforceFocus:w=!1,disableEscapeKeyDown:m=!1,disablePortal:C=!1,disableRestoreFocus:P=!1,disableScrollLock:D=!1,hideBackdrop:S=!1,keepMounted:N=!1,onBackdropClick:M,open:z,slotProps:W,slots:L}=u,A=ue(u,Hp),j=k({},u,{closeAfterTransition:b,disableAutoFocus:x,disableEnforceFocus:w,disableEscapeKeyDown:m,disablePortal:C,disableRestoreFocus:P,disableScrollLock:D,hideBackdrop:S,keepMounted:N}),{getRootProps:B,getBackdropProps:ee,getTransitionProps:Q,portalRef:O,isTopModal:_,exited:V,hasTransition:K}=Al(k({},j,{rootRef:n})),F=k({},j,{exited:V}),U=qp(F),q={};if(v.props.tabIndex===void 0&&(q.tabIndex="-1"),K){const{onEnter:Z,onExited:R}=Q();q.onEnter=Z,q.onExited=R}const G=(r=(o=L==null?void 0:L.root)!=null?o:T.Root)!=null?r:Wp,H=(i=(a=L==null?void 0:L.backdrop)!=null?a:T.Backdrop)!=null?i:d,Y=(c=W==null?void 0:W.root)!=null?c:$.root,J=(l=W==null?void 0:W.backdrop)!=null?l:$.backdrop,re=yt({elementType:G,externalSlotProps:Y,externalForwardedProps:A,getSlotProps:B,additionalProps:{ref:n,as:h},ownerState:F,className:we(p,Y==null?void 0:Y.className,U==null?void 0:U.root,!F.open&&F.exited&&(U==null?void 0:U.hidden))}),I=yt({elementType:H,externalSlotProps:J,additionalProps:f,getSlotProps:Z=>ee(k({},Z,{onClick:R=>{M&&M(R),Z!=null&&Z.onClick&&Z.onClick(R)}})),className:we(J==null?void 0:J.className,f==null?void 0:f.className,U==null?void 0:U.backdrop),ownerState:F});return!N&&!z&&(!K||V)?null:y.jsx(sn,{ref:O,container:g,disablePortal:C,children:y.jsxs(G,k({},re,{children:[!S&&d?y.jsx(H,k({},I)):null,y.jsx(jn,{disableEnforceFocus:w,disableAutoFocus:x,disableRestoreFocus:P,isEnabled:_,open:z,children:E.cloneElement(v,q)})]}))})});process.env.NODE_ENV!=="production"&&(Ns.propTypes={BackdropComponent:s.elementType,BackdropProps:s.object,children:dn.isRequired,classes:s.object,className:s.string,closeAfterTransition:s.bool,component:s.elementType,components:s.shape({Backdrop:s.elementType,Root:s.elementType}),componentsProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Je,s.func]),disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableEscapeKeyDown:s.bool,disablePortal:s.bool,disableRestoreFocus:s.bool,disableScrollLock:s.bool,hideBackdrop:s.bool,keepMounted:s.bool,onBackdropClick:s.func,onClose:s.func,onTransitionEnter:s.func,onTransitionExited:s.func,open:s.bool.isRequired,slotProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({backdrop:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const Kp=Ns;function Xp(e){return We("MuiPaper",e)}it("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Yp=["className","component","elevation","square","variant"],Jp=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return et(i,Xp,o)},Zp=Te("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return k({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&k({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${Dn("#fff",si(t.elevation))}, ${Dn("#fff",si(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Rs=E.forwardRef(function(t,n){const r=tt({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:a=1,square:c=!1,variant:l="elevation"}=r,u=ue(r,Yp),d=k({},r,{component:i,elevation:a,square:c,variant:l}),f=Jp(d);return process.env.NODE_ENV!=="production"&&bn().shadows[a]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)),y.jsx(Zp,k({as:i,ownerState:d,className:we(f.root,o),ref:n},u))});process.env.NODE_ENV!=="production"&&(Rs.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,elevation:Lt(Vi,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:s.bool,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),variant:s.oneOfType([s.oneOf(["elevation","outlined"]),s.string])});const Qp=Rs;function ef(e){return We("MuiPopover",e)}it("MuiPopover",["root","paper"]);const tf=["onEntering"],nf=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],rf=["slotProps"];function pi(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function fi(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function hi(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function Nn(e){return typeof e=="function"?e():e}const of=e=>{const{classes:t}=e;return et({root:["root"],paper:["paper"]},ef,t)},sf=Te(Kp,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),$s=Te(Qp,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Ms=E.forwardRef(function(t,n){var r,o,i;const a=tt({props:t,name:"MuiPopover"}),{action:c,anchorEl:l,anchorOrigin:u={vertical:"top",horizontal:"left"},anchorPosition:d,anchorReference:f="anchorEl",children:p,className:b,container:v,elevation:g=8,marginThreshold:h=16,open:T,PaperProps:$={},slots:x,slotProps:w,transformOrigin:m={vertical:"top",horizontal:"left"},TransitionComponent:C=Nr,transitionDuration:P="auto",TransitionProps:{onEntering:D}={},disableScrollLock:S=!1}=a,N=ue(a.TransitionProps,tf),M=ue(a,nf),z=(r=w==null?void 0:w.paper)!=null?r:$,W=E.useRef(),L=Be(W,z.ref),A=k({},a,{anchorOrigin:u,anchorReference:f,elevation:g,marginThreshold:h,externalPaperSlotProps:z,transformOrigin:m,TransitionComponent:C,transitionDuration:P,TransitionProps:N}),j=of(A),B=E.useCallback(()=>{if(f==="anchorPosition")return process.env.NODE_ENV!=="production"&&(d||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),d;const Z=Nn(l),R=Z&&Z.nodeType===1?Z:Ee(W.current).body,oe=R.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const ye=R.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ye.top===0&&ye.left===0&&ye.right===0&&ye.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:oe.top+pi(oe,u.vertical),left:oe.left+fi(oe,u.horizontal)}},[l,u.horizontal,u.vertical,d,f]),ee=E.useCallback(Z=>({vertical:pi(Z,m.vertical),horizontal:fi(Z,m.horizontal)}),[m.horizontal,m.vertical]),Q=E.useCallback(Z=>{const R={width:Z.offsetWidth,height:Z.offsetHeight},oe=ee(R);if(f==="none")return{top:null,left:null,transformOrigin:hi(oe)};const ye=B();let ke=ye.top-oe.vertical,ge=ye.left-oe.horizontal;const lt=ke+R.height,Oe=ge+R.width,Ge=jt(Nn(l)),Ne=Ge.innerHeight-h,Ke=Ge.innerWidth-h;if(h!==null&&ke<h){const xe=ke-h;ke-=xe,oe.vertical+=xe}else if(h!==null&&lt>Ne){const xe=lt-Ne;ke-=xe,oe.vertical+=xe}if(process.env.NODE_ENV!=="production"&&R.height>Ne&&R.height&&Ne&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${R.height-Ne}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),h!==null&&ge<h){const xe=ge-h;ge-=xe,oe.horizontal+=xe}else if(Oe>Ke){const xe=Oe-Ke;ge-=xe,oe.horizontal+=xe}return{top:`${Math.round(ke)}px`,left:`${Math.round(ge)}px`,transformOrigin:hi(oe)}},[l,f,B,ee,h]),[O,_]=E.useState(T),V=E.useCallback(()=>{const Z=W.current;if(!Z)return;const R=Q(Z);R.top!==null&&(Z.style.top=R.top),R.left!==null&&(Z.style.left=R.left),Z.style.transformOrigin=R.transformOrigin,_(!0)},[Q]);E.useEffect(()=>(S&&window.addEventListener("scroll",V),()=>window.removeEventListener("scroll",V)),[l,S,V]);const K=(Z,R)=>{D&&D(Z,R),V()},F=()=>{_(!1)};E.useEffect(()=>{T&&V()}),E.useImperativeHandle(c,()=>T?{updatePosition:()=>{V()}}:null,[T,V]),E.useEffect(()=>{if(!T)return;const Z=Ii(()=>{V()}),R=jt(l);return R.addEventListener("resize",Z),()=>{Z.clear(),R.removeEventListener("resize",Z)}},[l,T,V]);let U=P;P==="auto"&&!C.muiSupportAuto&&(U=void 0);const q=v||(l?Ee(Nn(l)).body:void 0),G=(o=x==null?void 0:x.root)!=null?o:sf,H=(i=x==null?void 0:x.paper)!=null?i:$s,Y=yt({elementType:H,externalSlotProps:k({},z,{style:O?z.style:k({},z.style,{opacity:0})}),additionalProps:{elevation:g,ref:L},ownerState:A,className:we(j.paper,z==null?void 0:z.className)}),J=yt({elementType:G,externalSlotProps:(w==null?void 0:w.root)||{},externalForwardedProps:M,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:q,open:T},ownerState:A,className:we(j.root,b)}),{slotProps:re}=J,I=ue(J,rf);return y.jsx(G,k({},I,!qi(G)&&{slotProps:re,disableScrollLock:S},{children:y.jsx(C,k({appear:!0,in:T,onEntering:K,onExited:F,timeout:U},N,{children:y.jsx(H,k({},Y,{children:p}))}))}))});process.env.NODE_ENV!=="production"&&(Ms.propTypes={action:Ar,anchorEl:Lt(s.oneOfType([Je,s.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=Nn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),anchorPosition:s.shape({left:s.number.isRequired,top:s.number.isRequired}),anchorReference:s.oneOf(["anchorEl","anchorPosition","none"]),children:s.node,classes:s.object,className:s.string,container:s.oneOfType([Je,s.func]),disableScrollLock:s.bool,elevation:Vi,marginThreshold:s.number,onClose:s.func,open:s.bool.isRequired,PaperProps:s.shape({component:Aa}),slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transformOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object});const af=Ms;function lf(e){return We("MuiMenu",e)}it("MuiMenu",["root","paper","list"]);const cf=["onEntering"],uf=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],df={vertical:"top",horizontal:"right"},pf={vertical:"top",horizontal:"left"},ff=e=>{const{classes:t}=e;return et({root:["root"],paper:["paper"],list:["list"]},lf,t)},hf=Te(af,{shouldForwardProp:e=>ds(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),mf=Te($s,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),gf=Te(Ip,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),js=E.forwardRef(function(t,n){var r,o;const i=tt({props:t,name:"MuiMenu"}),{autoFocus:a=!0,children:c,className:l,disableAutoFocusItem:u=!1,MenuListProps:d={},onClose:f,open:p,PaperProps:b={},PopoverClasses:v,transitionDuration:g="auto",TransitionProps:{onEntering:h}={},variant:T="selectedMenu",slots:$={},slotProps:x={}}=i,w=ue(i.TransitionProps,cf),m=ue(i,uf),C=bn(),P=C.direction==="rtl",D=k({},i,{autoFocus:a,disableAutoFocusItem:u,MenuListProps:d,onEntering:h,PaperProps:b,transitionDuration:g,TransitionProps:w,variant:T}),S=ff(D),N=a&&!u&&p,M=E.useRef(null),z=(Q,O)=>{M.current&&M.current.adjustStyleForScrollbar(Q,C),h&&h(Q,O)},W=Q=>{Q.key==="Tab"&&(Q.preventDefault(),f&&f(Q,"tabKeyDown"))};let L=-1;E.Children.map(c,(Q,O)=>{E.isValidElement(Q)&&(process.env.NODE_ENV!=="production"&&$n.isFragment(Q)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Q.props.disabled||(T==="selectedMenu"&&Q.props.selected||L===-1)&&(L=O))});const A=(r=$.paper)!=null?r:mf,j=(o=x.paper)!=null?o:b,B=yt({elementType:$.root,externalSlotProps:x.root,ownerState:D,className:[S.root,l]}),ee=yt({elementType:A,externalSlotProps:j,ownerState:D,className:S.paper});return y.jsx(hf,k({onClose:f,anchorOrigin:{vertical:"bottom",horizontal:P?"right":"left"},transformOrigin:P?df:pf,slots:{paper:A,root:$.root},slotProps:{root:B,paper:ee},open:p,ref:n,transitionDuration:g,TransitionProps:k({onEntering:z},w),ownerState:D},m,{classes:v,children:y.jsx(gf,k({onKeyDown:W,actions:M,autoFocus:a&&(L===-1||u),autoFocusItem:N,variant:T},d,{className:we(S.list,d.className),children:c}))}))});process.env.NODE_ENV!=="production"&&(js.propTypes={anchorEl:s.oneOfType([Je,s.func]),autoFocus:s.bool,children:s.node,classes:s.object,className:s.string,disableAutoFocusItem:s.bool,MenuListProps:s.object,onClose:s.func,open:s.bool.isRequired,PaperProps:s.object,PopoverClasses:s.object,slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object,variant:s.oneOf(["menu","selectedMenu"])});const bf=js;function vf({className:e,commandHandler:t,menuDefinition:n,children:r}){var u;const[o,i]=X.useState(void 0),a=X.useCallback(d=>{d.preventDefault(),i(o===void 0?{mouseX:d.clientX+2,mouseY:d.clientY-6}:void 0)},[o]),c=X.useCallback(()=>{i(void 0)},[]),l=X.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((u=n==null?void 0:n.items)==null?void 0:u.length)??0)===0||!r?r:y.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:a,children:[r,y.jsx(bf,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:c,anchorReference:"anchorPosition",anchorPosition:l,children:y.jsx(no,{menuDefinition:n,commandHandler:t,onClick:c})})]})}const yf=ys(y.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function xf(e){return{preserveValue:!0,...e}}const Ln=(e,t,n={})=>{const r=X.useRef(t);r.current=t;const o=X.useRef(n);o.current=xf(o.current);const[i,a]=X.useState(()=>r.current),[c,l]=X.useState(!0);return X.useEffect(()=>{let u=!0;return l(!!e),(async()=>{if(e){const d=await e();u&&(a(()=>d),l(!1))}})(),()=>{u=!1,o.current.preserveValue||a(()=>r.current)}},[e]),[i,c]};function Is({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:i,ariaLabelPrefix:a,children:c}){const[l,u]=X.useState(!1),[d,f]=X.useState(!1),p=X.useCallback(()=>{l&&u(!1),f(!1)},[l]),b=X.useCallback(w=>{w.stopPropagation(),u(m=>{const C=!m;return C&&w.shiftKey?f(!0):C||f(!1),C})},[]),v=X.useCallback(w=>(p(),r(w)),[r,p]),[g,h]=X.useState({top:1,left:1});X.useEffect(()=>{if(l){const w=o==null?void 0:o.current;if(w){const m=w.getBoundingClientRect(),C=window.scrollY,P=window.scrollX,D=m.top+C+w.clientHeight,S=m.left+P;h({top:D,left:S})}}},[l,o]);const[T]=Ln(X.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,l]),t),[$]=Ln(X.useCallback(async()=>(e==null?void 0:e(!0))??n??T,[e,n,T,l]),n??T),x=d&&$?$:T;return y.jsxs(y.Fragment,{children:[y.jsx(pe.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${i??""}`,color:"inherit","aria-label":`${a??""} menu button`,onClick:b,children:c??y.jsx(yf,{})}),y.jsx(pe.Drawer,{className:`papi-menu-drawer ${i??""}`,anchor:"left",variant:"temporary",open:l,onClose:p,PaperProps:{className:"papi-menu-drawer-paper",style:{top:g.top,left:g.left}},children:x?y.jsx(Es,{className:i,id:`${a??""} main menu`,commandHandler:v,multiColumnMenu:x}):void 0})]})}function wf({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:a="medium",className:c,onClick:l,children:u}){return y.jsx(pe.IconButton,{id:e,disabled:n,edge:i,size:a,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${c??""}`,onClick:l,children:u})}function un({variant:e="outlined",id:t,isDisabled:n=!1,hasError:r=!1,isFullWidth:o=!1,helperText:i,label:a,placeholder:c,isRequired:l=!1,className:u,defaultValue:d,value:f,onChange:p,onFocus:b,onBlur:v}){return y.jsx(pe.TextField,{variant:e,id:t,disabled:n,error:r,fullWidth:o,helperText:i,label:a,placeholder:c,required:l,className:`papi-textfield ${u??""}`,defaultValue:d,value:f,onChange:p,onFocus:b,onBlur:v})}let mr;const gr=()=>(mr||(mr=de.allBookIds.map(e=>({bookId:e,label:de.bookIdToEnglishName(e)}))),mr);function Ef({scrRef:e,handleSubmit:t,id:n}){const r=l=>{t(l)},o=(l,u)=>{const f={bookNum:de.bookIdToNumber(u.bookId),chapterNum:1,verseNum:1};r(f)},i=l=>{t({...e,chapterNum:+l.target.value})},a=l=>{t({...e,verseNum:+l.target.value})},c=X.useMemo(()=>gr()[e.bookNum-1],[e.bookNum]);return y.jsxs("span",{id:n,children:[y.jsx(Rn,{title:"Book",className:"papi-ref-selector book",value:c,options:gr(),onChange:o,isClearable:!1,width:200}),y.jsx(ut,{onClick:()=>r(ze.offsetBook(e,-1)),isDisabled:e.bookNum<=ze.FIRST_SCR_BOOK_NUM,children:"<"}),y.jsx(ut,{onClick:()=>r(ze.offsetBook(e,1)),isDisabled:e.bookNum>=gr().length,children:">"}),y.jsx(un,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),y.jsx(ut,{onClick:()=>t(ze.offsetChapter(e,-1)),isDisabled:e.chapterNum<=ze.FIRST_SCR_CHAPTER_NUM,children:"<"}),y.jsx(ut,{onClick:()=>t(ze.offsetChapter(e,1)),isDisabled:e.chapterNum>=ze.getChaptersForBook(e.bookNum),children:">"}),y.jsx(un,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:a}),y.jsx(ut,{onClick:()=>t(ze.offsetVerse(e,-1)),isDisabled:e.verseNum<=ze.FIRST_SCR_VERSE_NUM,children:"<"}),y.jsx(ut,{onClick:()=>t(ze.offsetVerse(e,1)),children:">"})]})}function Tf({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=X.useState(""),i=a=>{o(a),e(a)};return y.jsx(pe.Paper,{component:"form",className:"search-bar-paper",children:y.jsx(un,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:a=>i(a.target.value)})})}function kf({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:a=!1,defaultValue:c,value:l,valueLabelDisplay:u="off",className:d,onChange:f,onChangeCommitted:p}){return y.jsx(pe.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:a,defaultValue:c,value:l,valueLabelDisplay:u,className:`papi-slider ${n} ${d??""}`,onChange:f,onChangeCommitted:p})}function Of({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:a,children:c}){const l={action:(a==null?void 0:a.action)||c,message:a==null?void 0:a.message,className:r};return y.jsx(pe.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:l})}function Sf({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return y.jsx(pe.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function mi({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return y.jsx(un,{defaultValue:t[n.key],onChange:r})}const Cf=({onChange:e,disabled:t,checked:n,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return y.jsx(Si,{...r,isChecked:n,isDisabled:t,onChange:o})};function Pf({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:a,defaultColumnSortable:c=!0,defaultColumnResizable:l=!0,rows:u,enableSelectColumn:d,selectColumnWidth:f=50,rowKeyGetter:p,rowHeight:b=35,headerRowHeight:v=35,selectedRows:g,onSelectedRowsChange:h,onRowsChange:T,onCellClick:$,onCellDoubleClick:x,onCellContextMenu:w,onCellKeyDown:m,direction:C="ltr",enableVirtualization:P=!0,onCopy:D,onPaste:S,onScroll:N,className:M,"data-testid":z}){const W=X.useMemo(()=>{const L=e.map(A=>typeof A.editable=="function"?{...A,editable:B=>!!A.editable(B),renderEditCell:A.renderEditCell||mi}:A.editable&&!A.renderEditCell?{...A,renderEditCell:mi}:A.renderEditCell&&!A.editable?{...A,editable:!1}:A);return d?[{...vo.SelectColumn,minWidth:f},...L]:L},[e,d,f]);return y.jsx(vo,{columns:W,defaultColumnOptions:{width:o,minWidth:i,maxWidth:a,sortable:c,resizable:l},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:u,rowKeyGetter:p,rowHeight:b,headerRowHeight:v,selectedRows:g,onSelectedRowsChange:h,onRowsChange:T,onCellClick:$,onCellDoubleClick:x,onCellContextMenu:w,onCellKeyDown:m,direction:C,enableVirtualization:P,onCopy:D,onPaste:S,onScroll:N,renderers:{renderCheckbox:Cf},className:`papi-table ${M??"rdg-light"}`,"data-testid":z})}function Nf({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const i=X.useRef(void 0);return y.jsx("div",{ref:i,style:{position:"relative"},children:y.jsx(pe.AppBar,{position:"static",id:r,children:y.jsxs(pe.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?y.jsx(Is,{commandHandler:t,containerRef:i,menuProvider:e}):void 0,o?y.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Rf=(e,t)=>{X.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},br=()=>!1,$f=(e,t)=>{const[n]=Ln(X.useCallback(async()=>{if(!e)return br;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),br,{preserveValue:!1});X.useEffect(()=>()=>{n!==br&&n()},[n])};exports.BookChapterControl=xa;exports.Button=ut;exports.ChapterRangeSelector=wa;exports.Checkbox=Si;exports.ComboBox=Rn;exports.ContextMenu=vf;exports.GridMenu=Es;exports.HamburgerMenuButton=Is;exports.IconButton=wf;exports.LabelPosition=ft;exports.MenuItem=to;exports.RefSelector=Ef;exports.SearchBar=Tf;exports.Slider=kf;exports.Snackbar=Of;exports.Switch=Sf;exports.Table=Pf;exports.TextField=un;exports.Toolbar=Nf;exports.useEvent=Rf;exports.useEventAsync=$f;exports.usePromise=Ln;function Mf(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Mf(`.papi-combo-box {
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
