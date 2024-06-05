"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const v=require("react/jsx-runtime"),_=require("react"),Ue=require("platform-bible-utils"),hs=require("@radix-ui/react-dropdown-menu"),gt=require("lucide-react"),Ee=require("clsx"),ms=require("tailwind-merge"),gs=require("@radix-ui/react-slot"),Oi=require("class-variance-authority"),be=require("@mui/material"),Tr=require("@mui/styled-engine"),Zt=require("react-dom"),bs=require("@radix-ui/react-label"),So=require("react-data-grid"),vs=require("@radix-ui/react-tabs");function hn(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const k=hn(_),fe=hn(hs),ys=hn(Zt),Si=hn(bs),Re=hn(vs);var ws=Object.defineProperty,xs=(e,t,n)=>t in e?ws(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ne=(e,t,n)=>(xs(e,typeof t!="symbol"?t+"":t,n),n);const vt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Ar=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Ci=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Co=Ms();function Lt(e,t=!0){return t&&(e=e.toUpperCase()),e in Co?Co[e]:0}function Dr(e){return Lt(e)>0}function Es(e){const t=typeof e=="string"?Lt(e):e;return t>=40&&t<=66}function ks(e){return(typeof e=="string"?Lt(e):e)<=39}function Ni(e){return e<=66}function Ts(e){const t=typeof e=="string"?Lt(e):e;return Mi(t)&&!Ni(t)}function*Os(){for(let e=1;e<=vt.length;e++)yield e}const Ss=1,Pi=vt.length;function Cs(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Br(e,t="***"){const n=e-1;return n<0||n>=vt.length?t:vt[n]}function Ri(e){return e<=0||e>Pi?"******":Ci[e-1]}function Ns(e){return Ri(Lt(e))}function Mi(e){const t=typeof e=="number"?Br(e):e;return Dr(t)&&!Ar.includes(t)}function Ps(e){const t=typeof e=="number"?Br(e):e;return Dr(t)&&Ar.includes(t)}function Rs(e){return Ci[e-1].includes("*obsolete*")}function Ms(){const e={};for(let t=0;t<vt.length;t++)e[vt[t]]=t+1;return e}const ue={allBookIds:vt,nonCanonicalIds:Ar,bookIdToNumber:Lt,isBookIdValid:Dr,isBookNT:Es,isBookOT:ks,isBookOTNT:Ni,isBookDC:Ts,allBookNumbers:Os,firstBook:Ss,lastBook:Pi,extraBooks:Cs,bookNumberToId:Br,bookNumberToEnglishName:Ri,bookIdToEnglishName:Ns,isCanonical:Mi,isExtraMaterial:Ps,isObsolete:Rs};var ot=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(ot||{});const je=class{constructor(t){if(ne(this,"name"),ne(this,"fullPath"),ne(this,"isPresent"),ne(this,"hasVerseSegments"),ne(this,"isCustomized"),ne(this,"baseVersification"),ne(this,"scriptureBooks"),ne(this,"_type"),t!=null)typeof t=="string"?this.name=t:this._type=t;else throw new Error("Argument null")}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ne(je,"Original",new je(ot.Original)),ne(je,"Septuagint",new je(ot.Septuagint)),ne(je,"Vulgate",new je(ot.Vulgate)),ne(je,"English",new je(ot.English)),ne(je,"RussianProtestant",new je(ot.RussianProtestant)),ne(je,"RussianOrthodox",new je(ot.RussianOrthodox));let Rt=je;function No(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var $i=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))($i||{});const Ce=class ie{constructor(t,n,r,o){if(ne(this,"firstChapter"),ne(this,"lastChapter"),ne(this,"lastVerse"),ne(this,"hasSegmentsDefined"),ne(this,"text"),ne(this,"BBBCCCVVVS"),ne(this,"longHashCode"),ne(this,"versification"),ne(this,"rtlMark","‏"),ne(this,"_bookNum",0),ne(this,"_chapterNum",0),ne(this,"_verseNum",0),ne(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,s=n!=null&&n instanceof Rt?n:void 0;this.setEmpty(s),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof Rt?n:void 0;this.setEmpty(i),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ie){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof Rt?t:ie.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(t,n=ie.defaultVersification){const r=new ie(n);return r.parse(t),r}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=ie.parse(t),{success:!0,verseRef:n}}catch(r){if(r instanceof Wt)return n=new ie,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ie.bcvMaxValue*ie.bookDigitShifter+(n>=0?n%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(r>=0?r%ie.bcvMaxValue:0)}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>ie.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return ue.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=ue.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ie.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>ue.lastBook)throw new Wt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Rt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const s=+i[1].trim();this.versification=new Rt(ot[s])}catch{throw new Wt("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new Wt("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||ue.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(r[1]))throw new Wt("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification):!1}allVerses(t=!1,n=ie.verseRangeSeparators,r=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=No(this._verse,r);for(const s of i.map(l=>No(l,n))){const l=this.clone();l.verse=s[0];const c=l.verseNum;if(o.push(l),s.length>1){const u=this.clone();if(u.verse=s[1],!t)for(let p=c+1;p<u.verseNum;p++){const f=new ie(this._bookNum,this._chapterNum,p,this.versification);this.isExcluded||o.push(f)}o.push(u)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ue.lastBook?2:(ue.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=ue.bookIdToNumber(t),this.chapter=n,this.verse=r}};ne(Ce,"defaultVersification",Rt.English),ne(Ce,"verseRangeSeparator","-"),ne(Ce,"verseSequenceIndicator",","),ne(Ce,"verseRangeSeparators",[Ce.verseRangeSeparator]),ne(Ce,"verseSequenceIndicators",[Ce.verseSequenceIndicator]),ne(Ce,"chapterDigitShifter",1e3),ne(Ce,"bookDigitShifter",Ce.chapterDigitShifter*Ce.chapterDigitShifter),ne(Ce,"bcvMaxValue",Ce.chapterDigitShifter-1),ne(Ce,"ValidStatusType",$i);class Wt extends Error{}function pe(...e){return ms.twMerge(Ee.clsx(e))}const ji=fe.Root,Ii=fe.Trigger,$s=fe.Group,js=fe.Portal,Is=fe.Sub,_s=fe.RadioGroup,_i=_.forwardRef(({className:e,inset:t,children:n,...r},o)=>v.jsxs(fe.SubTrigger,{ref:o,className:pe("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,v.jsx(gt.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));_i.displayName=fe.SubTrigger.displayName;const Ai=_.forwardRef(({className:e,...t},n)=>v.jsx(fe.SubContent,{ref:n,className:pe("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));Ai.displayName=fe.SubContent.displayName;const Lr=_.forwardRef(({className:e,sideOffset:t=4,...n},r)=>v.jsx(fe.Portal,{children:v.jsx(fe.Content,{ref:r,sideOffset:t,className:pe("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));Lr.displayName=fe.Content.displayName;const Fr=_.forwardRef(({className:e,inset:t,...n},r)=>v.jsx(fe.Item,{ref:r,className:pe("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));Fr.displayName=fe.Item.displayName;const Di=_.forwardRef(({className:e,children:t,checked:n,...r},o)=>v.jsxs(fe.CheckboxItem,{ref:o,className:pe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[v.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:v.jsx(fe.ItemIndicator,{children:v.jsx(gt.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));Di.displayName=fe.CheckboxItem.displayName;const Bi=_.forwardRef(({className:e,children:t,...n},r)=>v.jsxs(fe.RadioItem,{ref:r,className:pe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[v.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:v.jsx(fe.ItemIndicator,{children:v.jsx(gt.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));Bi.displayName=fe.RadioItem.displayName;const qn=_.forwardRef(({className:e,inset:t,...n},r)=>v.jsx(fe.Label,{ref:r,className:pe("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));qn.displayName=fe.Label.displayName;const Vr=_.forwardRef(({className:e,...t},n)=>v.jsx(fe.Separator,{ref:n,className:pe("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Vr.displayName=fe.Separator.displayName;function Li({className:e,...t}){return v.jsx("span",{className:pe("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Li.displayName="DropdownMenuShortcut";const Hn=_.forwardRef(({className:e,type:t,...n},r)=>v.jsx("input",{type:t,className:pe("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));Hn.displayName="Input";const As=_.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},i)=>v.jsxs("div",{className:"pr-relative",children:[v.jsx(Hn,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r(),t(s)},onClick:n,ref:i}),v.jsx(gt.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function Ds({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const i=Array.from({length:t},(l,c)=>c+1),s=_.useCallback(l=>{o(l)},[o]);return v.jsx("div",{className:pe("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:i.map(l=>v.jsx("div",{className:pe("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===n,"pr-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>s(l),children:l},l))})}const Bs=_.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:i,children:s},l)=>v.jsxs(Fr,{ref:l,textValue:e,className:pe("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[v.jsx("span",{className:pe("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":i.toLowerCase()==="ot","pr-border-l-purple-200":i.toLowerCase()==="nt","pr-border-l-indigo-200":i.toLowerCase()==="dc"}),children:ue.bookIdToEnglishName(e)}),n&&v.jsx("div",{children:s})]},e));function Ls({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return v.jsxs(qn,{className:"pr-flex pr-justify-between",children:[v.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),v.jsxs("div",{className:"pr-flex pr-items-center",children:[v.jsx(gt.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),v.jsx(gt.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),v.jsx(gt.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const nn=ue.allBookIds,Fs={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},Po=["OT","NT","DC"],Vs=32+32+32,zs=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Us=e=>({OT:nn.filter(n=>ue.isBookOT(n)),NT:nn.filter(n=>ue.isBookNT(n)),DC:nn.filter(n=>ue.isBookDC(n))})[e],Gt=e=>Ue.getChaptersForBook(ue.bookIdToNumber(e));function qs(){return nn.map(t=>ue.bookIdToEnglishName(t))}function Hs(e){return qs().includes(e)}function Ws(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(Hs(t))return nn.find(r=>ue.bookIdToEnglishName(r)===t)}function Gs({scrRef:e,handleSubmit:t}){const[n,r]=_.useState(""),[o,i]=_.useState(ue.bookNumberToId(e.bookNum)),[s,l]=_.useState(e.chapterNum??0),[c,u]=_.useState(ue.bookNumberToId(e.bookNum)),[p,f]=_.useState(!1),[d,g]=_.useState(p),y=_.useRef(void 0),b=_.useRef(void 0),h=_.useRef(void 0),E=_.useCallback(C=>Us(C).filter(M=>{const R=ue.bookIdToEnglishName(M).toLowerCase(),B=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return R.includes(B)||M.toLowerCase().includes(B)}),[n]),j=C=>{r(C)},w=_.useRef(!1),x=_.useCallback(C=>{if(w.current){w.current=!1;return}f(C)},[]),m=_.useCallback((C,M,R,B)=>{if(l(ue.bookNumberToId(e.bookNum)!==C?1:e.chapterNum),M||Gt(C)===-1){t({bookNum:ue.bookIdToNumber(C),chapterNum:R||1,verseNum:B||1}),f(!1),r("");return}i(o!==C?C:""),f(!M)},[t,e.bookNum,e.chapterNum,o]),S=C=>{C<=0||C>Gt(o)||m(o,!0,C)},N=_.useCallback(()=>{zs.forEach(C=>{const M=n.match(C);if(M){const[R,B=void 0,D=void 0]=M.slice(1),$=Ws(R);(ue.isBookIdValid(R)||$)&&m($??R,!0,B?parseInt(B,10):1,D?parseInt(D,10):1)}})},[m,n]),F=_.useCallback(C=>{p?(C.key==="ArrowDown"||C.key==="ArrowUp")&&(typeof h<"u"&&h.current!==null?h.current.focus():typeof b<"u"&&b.current!==null&&b.current.focus(),C.preventDefault()):f(!0)},[p]),L=C=>{const{key:M}=C;M==="ArrowRight"||M==="ArrowLeft"||M==="ArrowDown"||M==="ArrowUp"||M==="Enter"||(y.current.dispatchEvent(new KeyboardEvent("keydown",{key:M})),y.current.focus())},V=C=>{const{key:M}=C;if(c===o){if(M==="Enter"){C.preventDefault(),m(o,!0,s);return}let R=0;if(M==="ArrowRight")if(s<Gt(c))R=1;else{C.preventDefault();return}else if(M==="ArrowLeft")if(s>1)R=-1;else{C.preventDefault();return}else M==="ArrowDown"?R=6:M==="ArrowUp"&&(R=-6);s+R<=0||s+R>Gt(c)?l(0):R!==0&&(l(s+R),C.preventDefault())}};return _.useEffect(()=>{o===c?o===ue.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),_.useLayoutEffect(()=>{g(p)},[p]),_.useLayoutEffect(()=>{const C=setTimeout(()=>{if(d&&b.current&&h.current){const R=h.current.offsetTop-Vs;b.current.scrollTo({top:R,behavior:"instant"})}},10);return()=>{clearTimeout(C)}},[d]),v.jsx("div",{children:v.jsxs(ji,{modal:!1,open:p,onOpenChange:x,children:[v.jsx(Ii,{asChild:!0,children:v.jsx(As,{ref:y,value:n,handleSearch:j,handleKeyDown:F,handleOnClick:()=>{i(ue.bookNumberToId(e.bookNum)),u(ue.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),f(!0),y.current.focus()},onFocus:()=>{w.current=!0},handleSubmit:N,placeholder:`${ue.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),v.jsxs(Lr,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:L,align:"start",ref:b,children:[v.jsx(Ls,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),Po.map((C,M)=>E(C).length>0&&v.jsxs("div",{children:[v.jsx(qn,{className:"pr-font-semibold pr-text-slate-700",children:Fs[C]}),E(C).map(R=>v.jsx("div",{children:v.jsx(Bs,{bookId:R,handleSelectBook:()=>m(R,!1),isSelected:o===R,handleHighlightBook:()=>u(R),handleKeyDown:V,bookType:C,ref:B=>{o===R&&(h.current=B)},children:v.jsx(Ds,{handleSelectChapter:S,endChapter:Gt(R),activeChapter:e.bookNum===ue.bookIdToNumber(R)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:B=>{l(B)}})})},R)),Po.length-1!==M?v.jsx(Vr,{}):void 0]},C))]})]})})}const Xs=Oi.cva("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),Fi=_.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},i)=>{const s=r?gs.Slot:"button";return v.jsx(s,{className:pe(Xs({variant:t,size:n,className:e})),ref:i,...o})});Fi.displayName="Button";function pt({id:e,isDisabled:t=!1,className:n,onClick:r,onContextMenu:o,children:i}){return v.jsx(Fi,{id:e,disabled:t,className:pe("papi-button",n),onClick:r,onContextMenu:o,children:i})}function In({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:s,options:l=[],className:c,value:u,onChange:p,onFocus:f,onBlur:d,getOptionLabel:g}){return v.jsx(be.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:i,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:u,onChange:p,onFocus:f,onBlur:d,getOptionLabel:g,renderInput:y=>v.jsx(be.TextField,{...y,error:o,fullWidth:i,disabled:n,label:t,style:{width:s}})})}function Ys({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,i]=_.useState(1),[s,l]=_.useState(r),[c,u]=_.useState(Array.from({length:r},(d,g)=>g+1));_.useEffect(()=>{i(1),e(1),l(r),t(r),u(Array.from({length:r},(d,g)=>g+1))},[r,t,e]);const p=(d,g)=>{i(g),e(g),g>s&&(l(g),t(g))},f=(d,g)=>{l(g),t(g),g<o&&(i(g),e(g))};return v.jsxs(v.Fragment,{children:[v.jsx(be.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:v.jsx(In,{onChange:(d,g)=>p(d,g),className:"book-selection-chapter",isClearable:!1,options:c,getOptionLabel:d=>d.toString(),value:o,isDisabled:n},"start chapter"),label:"Chapters",labelPlacement:"start"}),v.jsx(be.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:v.jsx(In,{onChange:(d,g)=>f(d,g),className:"book-selection-chapter",isClearable:!1,options:c,getOptionLabel:d=>d.toString(),value:s,isDisabled:n},"end chapter"),label:"to",labelPlacement:"start"})]})}var ht=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(ht||{});function zr({id:e,isChecked:t,labelText:n="",labelPosition:r=ht.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:s=!1,hasError:l=!1,className:c,onChange:u}){const p=v.jsx(be.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:s,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:u});let f;if(n){const d=r===ht.Before||r===ht.Above,g=v.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),y=r===ht.Before||r===ht.After,b=y?g:v.jsx("div",{children:g}),h=y?p:v.jsx("div",{children:p});f=v.jsxs(be.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:l,children:[d&&b,h,!d&&b]})}else f=p;return f}function Ks({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:i,createLabel:s}){return v.jsxs("fieldset",{id:e,className:t,children:[n&&v.jsx("legend",{children:n}),r.map(l=>v.jsx(zr,{className:"check-item",isChecked:o.includes(l),labelText:s?s(l):l,onChange:()=>i(l)},l))]})}function de(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function T(){return T=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},T.apply(this,arguments)}function Js(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Zs(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Or={exports:{}},On={exports:{}},ae={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ro;function Qs(){if(Ro)return ae;Ro=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,p=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,g=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,b=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,E=e?Symbol.for("react.responder"):60118,j=e?Symbol.for("react.scope"):60119;function w(m){if(typeof m=="object"&&m!==null){var S=m.$$typeof;switch(S){case t:switch(m=m.type,m){case c:case u:case r:case i:case o:case f:return m;default:switch(m=m&&m.$$typeof,m){case l:case p:case y:case g:case s:return m;default:return S}}case n:return S}}}function x(m){return w(m)===u}return ae.AsyncMode=c,ae.ConcurrentMode=u,ae.ContextConsumer=l,ae.ContextProvider=s,ae.Element=t,ae.ForwardRef=p,ae.Fragment=r,ae.Lazy=y,ae.Memo=g,ae.Portal=n,ae.Profiler=i,ae.StrictMode=o,ae.Suspense=f,ae.isAsyncMode=function(m){return x(m)||w(m)===c},ae.isConcurrentMode=x,ae.isContextConsumer=function(m){return w(m)===l},ae.isContextProvider=function(m){return w(m)===s},ae.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===t},ae.isForwardRef=function(m){return w(m)===p},ae.isFragment=function(m){return w(m)===r},ae.isLazy=function(m){return w(m)===y},ae.isMemo=function(m){return w(m)===g},ae.isPortal=function(m){return w(m)===n},ae.isProfiler=function(m){return w(m)===i},ae.isStrictMode=function(m){return w(m)===o},ae.isSuspense=function(m){return w(m)===f},ae.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===r||m===u||m===i||m===o||m===f||m===d||typeof m=="object"&&m!==null&&(m.$$typeof===y||m.$$typeof===g||m.$$typeof===s||m.$$typeof===l||m.$$typeof===p||m.$$typeof===h||m.$$typeof===E||m.$$typeof===j||m.$$typeof===b)},ae.typeOf=w,ae}var se={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mo;function el(){return Mo||(Mo=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,p=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,g=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,b=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,E=e?Symbol.for("react.responder"):60118,j=e?Symbol.for("react.scope"):60119;function w(I){return typeof I=="string"||typeof I=="function"||I===r||I===u||I===i||I===o||I===f||I===d||typeof I=="object"&&I!==null&&(I.$$typeof===y||I.$$typeof===g||I.$$typeof===s||I.$$typeof===l||I.$$typeof===p||I.$$typeof===h||I.$$typeof===E||I.$$typeof===j||I.$$typeof===b)}function x(I){if(typeof I=="object"&&I!==null){var Z=I.$$typeof;switch(Z){case t:var P=I.type;switch(P){case c:case u:case r:case i:case o:case f:return P;default:var oe=P&&P.$$typeof;switch(oe){case l:case p:case y:case g:case s:return oe;default:return Z}}case n:return Z}}}var m=c,S=u,N=l,F=s,L=t,V=p,C=r,M=y,R=g,B=n,D=i,$=o,z=f,ee=!1;function Q(I){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),O(I)||x(I)===c}function O(I){return x(I)===u}function A(I){return x(I)===l}function q(I){return x(I)===s}function Y(I){return typeof I=="object"&&I!==null&&I.$$typeof===t}function U(I){return x(I)===p}function H(I){return x(I)===r}function G(I){return x(I)===y}function X(I){return x(I)===g}function W(I){return x(I)===n}function K(I){return x(I)===i}function J(I){return x(I)===o}function re(I){return x(I)===f}se.AsyncMode=m,se.ConcurrentMode=S,se.ContextConsumer=N,se.ContextProvider=F,se.Element=L,se.ForwardRef=V,se.Fragment=C,se.Lazy=M,se.Memo=R,se.Portal=B,se.Profiler=D,se.StrictMode=$,se.Suspense=z,se.isAsyncMode=Q,se.isConcurrentMode=O,se.isContextConsumer=A,se.isContextProvider=q,se.isElement=Y,se.isForwardRef=U,se.isFragment=H,se.isLazy=G,se.isMemo=X,se.isPortal=W,se.isProfiler=K,se.isStrictMode=J,se.isSuspense=re,se.isValidElementType=w,se.typeOf=x}()),se}var $o;function Vi(){return $o||($o=1,process.env.NODE_ENV==="production"?On.exports=Qs():On.exports=el()),On.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var cr,jo;function tl(){if(jo)return cr;jo=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var s={},l=0;l<10;l++)s["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(s).map(function(p){return s[p]});if(c.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(p){u[p]=p}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return cr=o()?Object.assign:function(i,s){for(var l,c=r(i),u,p=1;p<arguments.length;p++){l=Object(arguments[p]);for(var f in l)t.call(l,f)&&(c[f]=l[f]);if(e){u=e(l);for(var d=0;d<u.length;d++)n.call(l,u[d])&&(c[u[d]]=l[u[d]])}}return c},cr}var ur,Io;function Ur(){if(Io)return ur;Io=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return ur=e,ur}var pr,_o;function zi(){return _o||(_o=1,pr=Function.call.bind(Object.prototype.hasOwnProperty)),pr}var dr,Ao;function nl(){if(Ao)return dr;Ao=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Ur(),n={},r=zi();e=function(i){var s="Warning: "+i;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(i,s,l,c,u){if(process.env.NODE_ENV!=="production"){for(var p in i)if(r(i,p)){var f;try{if(typeof i[p]!="function"){var d=Error((c||"React class")+": "+l+" type `"+p+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[p]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw d.name="Invariant Violation",d}f=i[p](s,p,c,l,null,t)}catch(y){f=y}if(f&&!(f instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+p+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in n)){n[f.message]=!0;var g=u?u():"";e("Failed "+l+" type: "+f.message+(g??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},dr=o,dr}var fr,Do;function rl(){if(Do)return fr;Do=1;var e=Vi(),t=tl(),n=Ur(),r=zi(),o=nl(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function s(){return null}return fr=function(l,c){var u=typeof Symbol=="function"&&Symbol.iterator,p="@@iterator";function f(O){var A=O&&(u&&O[u]||O[p]);if(typeof A=="function")return A}var d="<<anonymous>>",g={array:E("array"),bigint:E("bigint"),bool:E("boolean"),func:E("function"),number:E("number"),object:E("object"),string:E("string"),symbol:E("symbol"),any:j(),arrayOf:w,element:x(),elementType:m(),instanceOf:S,node:V(),objectOf:F,oneOf:N,oneOfType:L,shape:M,exact:R};function y(O,A){return O===A?O!==0||1/O===1/A:O!==O&&A!==A}function b(O,A){this.message=O,this.data=A&&typeof A=="object"?A:{},this.stack=""}b.prototype=Error.prototype;function h(O){if(process.env.NODE_ENV!=="production")var A={},q=0;function Y(H,G,X,W,K,J,re){if(W=W||d,J=J||X,re!==n){if(c){var I=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw I.name="Invariant Violation",I}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var Z=W+":"+X;!A[Z]&&q<3&&(i("You are manually calling a React.PropTypes validation function for the `"+J+"` prop on `"+W+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),A[Z]=!0,q++)}}return G[X]==null?H?G[X]===null?new b("The "+K+" `"+J+"` is marked as required "+("in `"+W+"`, but its value is `null`.")):new b("The "+K+" `"+J+"` is marked as required in "+("`"+W+"`, but its value is `undefined`.")):null:O(G,X,W,K,J)}var U=Y.bind(null,!1);return U.isRequired=Y.bind(null,!0),U}function E(O){function A(q,Y,U,H,G,X){var W=q[Y],K=$(W);if(K!==O){var J=z(W);return new b("Invalid "+H+" `"+G+"` of type "+("`"+J+"` supplied to `"+U+"`, expected ")+("`"+O+"`."),{expectedType:O})}return null}return h(A)}function j(){return h(s)}function w(O){function A(q,Y,U,H,G){if(typeof O!="function")return new b("Property `"+G+"` of component `"+U+"` has invalid PropType notation inside arrayOf.");var X=q[Y];if(!Array.isArray(X)){var W=$(X);return new b("Invalid "+H+" `"+G+"` of type "+("`"+W+"` supplied to `"+U+"`, expected an array."))}for(var K=0;K<X.length;K++){var J=O(X,K,U,H,G+"["+K+"]",n);if(J instanceof Error)return J}return null}return h(A)}function x(){function O(A,q,Y,U,H){var G=A[q];if(!l(G)){var X=$(G);return new b("Invalid "+U+" `"+H+"` of type "+("`"+X+"` supplied to `"+Y+"`, expected a single ReactElement."))}return null}return h(O)}function m(){function O(A,q,Y,U,H){var G=A[q];if(!e.isValidElementType(G)){var X=$(G);return new b("Invalid "+U+" `"+H+"` of type "+("`"+X+"` supplied to `"+Y+"`, expected a single ReactElement type."))}return null}return h(O)}function S(O){function A(q,Y,U,H,G){if(!(q[Y]instanceof O)){var X=O.name||d,W=Q(q[Y]);return new b("Invalid "+H+" `"+G+"` of type "+("`"+W+"` supplied to `"+U+"`, expected ")+("instance of `"+X+"`."))}return null}return h(A)}function N(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),s;function A(q,Y,U,H,G){for(var X=q[Y],W=0;W<O.length;W++)if(y(X,O[W]))return null;var K=JSON.stringify(O,function(re,I){var Z=z(I);return Z==="symbol"?String(I):I});return new b("Invalid "+H+" `"+G+"` of value `"+String(X)+"` "+("supplied to `"+U+"`, expected one of "+K+"."))}return h(A)}function F(O){function A(q,Y,U,H,G){if(typeof O!="function")return new b("Property `"+G+"` of component `"+U+"` has invalid PropType notation inside objectOf.");var X=q[Y],W=$(X);if(W!=="object")return new b("Invalid "+H+" `"+G+"` of type "+("`"+W+"` supplied to `"+U+"`, expected an object."));for(var K in X)if(r(X,K)){var J=O(X,K,U,H,G+"."+K,n);if(J instanceof Error)return J}return null}return h(A)}function L(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var A=0;A<O.length;A++){var q=O[A];if(typeof q!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ee(q)+" at index "+A+"."),s}function Y(U,H,G,X,W){for(var K=[],J=0;J<O.length;J++){var re=O[J],I=re(U,H,G,X,W,n);if(I==null)return null;I.data&&r(I.data,"expectedType")&&K.push(I.data.expectedType)}var Z=K.length>0?", expected one of type ["+K.join(", ")+"]":"";return new b("Invalid "+X+" `"+W+"` supplied to "+("`"+G+"`"+Z+"."))}return h(Y)}function V(){function O(A,q,Y,U,H){return B(A[q])?null:new b("Invalid "+U+" `"+H+"` supplied to "+("`"+Y+"`, expected a ReactNode."))}return h(O)}function C(O,A,q,Y,U){return new b((O||"React class")+": "+A+" type `"+q+"."+Y+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+U+"`.")}function M(O){function A(q,Y,U,H,G){var X=q[Y],W=$(X);if(W!=="object")return new b("Invalid "+H+" `"+G+"` of type `"+W+"` "+("supplied to `"+U+"`, expected `object`."));for(var K in O){var J=O[K];if(typeof J!="function")return C(U,H,G,K,z(J));var re=J(X,K,U,H,G+"."+K,n);if(re)return re}return null}return h(A)}function R(O){function A(q,Y,U,H,G){var X=q[Y],W=$(X);if(W!=="object")return new b("Invalid "+H+" `"+G+"` of type `"+W+"` "+("supplied to `"+U+"`, expected `object`."));var K=t({},q[Y],O);for(var J in K){var re=O[J];if(r(O,J)&&typeof re!="function")return C(U,H,G,J,z(re));if(!re)return new b("Invalid "+H+" `"+G+"` key `"+J+"` supplied to `"+U+"`.\nBad object: "+JSON.stringify(q[Y],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(O),null,"  "));var I=re(X,J,U,H,G+"."+J,n);if(I)return I}return null}return h(A)}function B(O){switch(typeof O){case"number":case"string":case"undefined":return!0;case"boolean":return!O;case"object":if(Array.isArray(O))return O.every(B);if(O===null||l(O))return!0;var A=f(O);if(A){var q=A.call(O),Y;if(A!==O.entries){for(;!(Y=q.next()).done;)if(!B(Y.value))return!1}else for(;!(Y=q.next()).done;){var U=Y.value;if(U&&!B(U[1]))return!1}}else return!1;return!0;default:return!1}}function D(O,A){return O==="symbol"?!0:A?A["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&A instanceof Symbol:!1}function $(O){var A=typeof O;return Array.isArray(O)?"array":O instanceof RegExp?"object":D(A,O)?"symbol":A}function z(O){if(typeof O>"u"||O===null)return""+O;var A=$(O);if(A==="object"){if(O instanceof Date)return"date";if(O instanceof RegExp)return"regexp"}return A}function ee(O){var A=z(O);switch(A){case"array":case"object":return"an "+A;case"boolean":case"date":case"regexp":return"a "+A;default:return A}}function Q(O){return!O.constructor||!O.constructor.name?d:O.constructor.name}return g.checkPropTypes=o,g.resetWarningCache=o.resetWarningCache,g.PropTypes=g,g},fr}var hr,Bo;function ol(){if(Bo)return hr;Bo=1;var e=Ur();function t(){}function n(){}return n.resetWarningCache=t,hr=function(){function r(s,l,c,u,p,f){if(f!==e){var d=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw d.name="Invariant Violation",d}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},hr}if(process.env.NODE_ENV!=="production"){var il=Vi(),al=!0;Or.exports=rl()(il.isElement,al)}else Or.exports=ol()();var sl=Or.exports;const a=Js(sl);function Ft(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function mt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Ui(e){if(!mt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Ui(e[n])}),t}function Je(e,t,n={clone:!0}){const r=n.clone?T({},e):e;return mt(e)&&mt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(mt(t[o])&&o in e&&mt(e[o])?r[o]=Je(e[o],t[o],n):n.clone?r[o]=mt(t[o])?Ui(t[o]):t[o]:r[o]=t[o])}),r}function ll(e){const{prototype:t={}}=e;return!!t.isReactComponent}function qi(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let l;const c=i.type;return typeof c=="function"&&!ll(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Hi=Ft(a.element,qi);Hi.isRequired=Ft(a.element.isRequired,qi);const mn=Hi;function cl(e){const{prototype:t={}}=e;return!!t.isReactComponent}function ul(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let l;return typeof i=="function"&&!cl(i)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const pl=Ft(a.elementType,ul),dl="exact-prop: ​";function Wi(e){return process.env.NODE_ENV==="production"?e:T({},e,{[dl]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function jt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Sr={exports:{}},le={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Lo;function fl(){if(Lo)return le;Lo=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),p=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),g=Symbol.for("react.offscreen"),y;y=Symbol.for("react.module.reference");function b(h){if(typeof h=="object"&&h!==null){var E=h.$$typeof;switch(E){case e:switch(h=h.type,h){case n:case o:case r:case u:case p:return h;default:switch(h=h&&h.$$typeof,h){case l:case s:case c:case d:case f:case i:return h;default:return E}}case t:return E}}}return le.ContextConsumer=s,le.ContextProvider=i,le.Element=e,le.ForwardRef=c,le.Fragment=n,le.Lazy=d,le.Memo=f,le.Portal=t,le.Profiler=o,le.StrictMode=r,le.Suspense=u,le.SuspenseList=p,le.isAsyncMode=function(){return!1},le.isConcurrentMode=function(){return!1},le.isContextConsumer=function(h){return b(h)===s},le.isContextProvider=function(h){return b(h)===i},le.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===e},le.isForwardRef=function(h){return b(h)===c},le.isFragment=function(h){return b(h)===n},le.isLazy=function(h){return b(h)===d},le.isMemo=function(h){return b(h)===f},le.isPortal=function(h){return b(h)===t},le.isProfiler=function(h){return b(h)===o},le.isStrictMode=function(h){return b(h)===r},le.isSuspense=function(h){return b(h)===u},le.isSuspenseList=function(h){return b(h)===p},le.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===n||h===o||h===r||h===u||h===p||h===g||typeof h=="object"&&h!==null&&(h.$$typeof===d||h.$$typeof===f||h.$$typeof===i||h.$$typeof===s||h.$$typeof===c||h.$$typeof===y||h.getModuleId!==void 0)},le.typeOf=b,le}var ce={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fo;function hl(){return Fo||(Fo=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),p=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),g=Symbol.for("react.offscreen"),y=!1,b=!1,h=!1,E=!1,j=!1,w;w=Symbol.for("react.module.reference");function x(P){return!!(typeof P=="string"||typeof P=="function"||P===n||P===o||j||P===r||P===u||P===p||E||P===g||y||b||h||typeof P=="object"&&P!==null&&(P.$$typeof===d||P.$$typeof===f||P.$$typeof===i||P.$$typeof===s||P.$$typeof===c||P.$$typeof===w||P.getModuleId!==void 0))}function m(P){if(typeof P=="object"&&P!==null){var oe=P.$$typeof;switch(oe){case e:var we=P.type;switch(we){case n:case o:case r:case u:case p:return we;default:var Oe=we&&we.$$typeof;switch(Oe){case l:case s:case c:case d:case f:case i:return Oe;default:return oe}}case t:return oe}}}var S=s,N=i,F=e,L=c,V=n,C=d,M=f,R=t,B=o,D=r,$=u,z=p,ee=!1,Q=!1;function O(P){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function A(P){return Q||(Q=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function q(P){return m(P)===s}function Y(P){return m(P)===i}function U(P){return typeof P=="object"&&P!==null&&P.$$typeof===e}function H(P){return m(P)===c}function G(P){return m(P)===n}function X(P){return m(P)===d}function W(P){return m(P)===f}function K(P){return m(P)===t}function J(P){return m(P)===o}function re(P){return m(P)===r}function I(P){return m(P)===u}function Z(P){return m(P)===p}ce.ContextConsumer=S,ce.ContextProvider=N,ce.Element=F,ce.ForwardRef=L,ce.Fragment=V,ce.Lazy=C,ce.Memo=M,ce.Portal=R,ce.Profiler=B,ce.StrictMode=D,ce.Suspense=$,ce.SuspenseList=z,ce.isAsyncMode=O,ce.isConcurrentMode=A,ce.isContextConsumer=q,ce.isContextProvider=Y,ce.isElement=U,ce.isForwardRef=H,ce.isFragment=G,ce.isLazy=X,ce.isMemo=W,ce.isPortal=K,ce.isProfiler=J,ce.isStrictMode=re,ce.isSuspense=I,ce.isSuspenseList=Z,ce.isValidElementType=x,ce.typeOf=m}()),ce}process.env.NODE_ENV==="production"?Sr.exports=fl():Sr.exports=hl();var _n=Sr.exports;const ml=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function gl(e){const t=`${e}`.match(ml);return t&&t[1]||""}function Gi(e,t=""){return e.displayName||e.name||gl(e)||t}function Vo(e,t,n){const r=Gi(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function bl(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Gi(e,"Component");if(typeof e=="object")switch(e.$$typeof){case _n.ForwardRef:return Vo(e,e.render,"ForwardRef");case _n.Memo:return Vo(e,e.type,"memo");default:return}}}function Ze(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],s=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const vl=a.oneOfType([a.func,a.object]),qr=vl;function He(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":jt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Cr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Xi(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function yl(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,s)=>{const l=o||"<<anonymous>>",c=s||r;return typeof n[r]<"u"?new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function wl(e,t){var n,r;return k.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function ke(e){return e&&e.ownerDocument||document}function It(e){return ke(e).defaultView||window}function xl(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?T({},t.propTypes):null;return o=>(i,s,l,c,u,...p)=>{const f=u||s,d=n==null?void 0:n[f];if(d){const g=d(i,s,l,c,u,...p);if(g)return g}return typeof i[s]<"u"&&!i[o]?new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function An(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const El=typeof window<"u"?k.useLayoutEffect:k.useEffect,yt=El;let zo=0;function kl(e){const[t,n]=k.useState(e),r=e||t;return k.useEffect(()=>{t==null&&(zo+=1,n(`mui-${zo}`))},[t]),r}const Uo=k["useId".toString()];function Yi(e){if(Uo!==void 0){const t=Uo();return e??t}return kl(e)}function Tl(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function Ki({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=k.useRef(e!==void 0),[i,s]=k.useState(t),l=o?e:i;if(process.env.NODE_ENV!=="production"){k.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:u}=k.useRef(t);k.useEffect(()=>{!o&&u!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=k.useCallback(u=>{o||s(u)},[]);return[l,c]}function ln(e){const t=k.useRef(e);return yt(()=>{t.current=e}),k.useRef((...n)=>(0,t.current)(...n)).current}function Le(...e){return k.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{An(n,t)})},e)}const qo={};function Ol(e,t){const n=k.useRef(qo);return n.current===qo&&(n.current=e(t)),n}const Sl=[];function Cl(e){k.useEffect(e,Sl)}class gn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new gn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function Qt(){const e=Ol(gn.create).current;return Cl(e.disposeEffect),e}let Wn=!0,Nr=!1;const Nl=new gn,Pl={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Rl(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Pl[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Ml(e){e.metaKey||e.altKey||e.ctrlKey||(Wn=!0)}function mr(){Wn=!1}function $l(){this.visibilityState==="hidden"&&Nr&&(Wn=!0)}function jl(e){e.addEventListener("keydown",Ml,!0),e.addEventListener("mousedown",mr,!0),e.addEventListener("pointerdown",mr,!0),e.addEventListener("touchstart",mr,!0),e.addEventListener("visibilitychange",$l,!0)}function Il(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Wn||Rl(t)}function Ji(){const e=k.useCallback(o=>{o!=null&&jl(o.ownerDocument)},[]),t=k.useRef(!1);function n(){return t.current?(Nr=!0,Nl.start(100,()=>{Nr=!1}),t.current=!1,!0):!1}function r(o){return Il(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Zi(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function _l(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function Al(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Dl=Number.isInteger||Al;function Qi(e,t,n,r){const o=e[t];if(o==null||!Dl(o)){const i=_l(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function ea(e,t,...n){return e[t]===void 0?null:Qi(e,t,...n)}function Pr(){return null}ea.isRequired=Qi;Pr.isRequired=Pr;const ta=process.env.NODE_ENV==="production"?Pr:ea;function na(e,t){const n=T({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=T({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=T({},i),Object.keys(o).forEach(s=>{n[r][s]=na(o[s],i[s])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function tt(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,s)=>{if(s){const l=t(s);l!==""&&i.push(l),n&&n[s]&&i.push(n[s])}return i},[]).join(" ")}),r}const Ho=e=>e,Bl=()=>{let e=Ho;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Ho}}},Ll=Bl(),ra=Ll,oa={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Ge(e,t,n="Mui"){const r=oa[t];return r?`${n}-${r}`:`${ra.generate(e)}-${t}`}function at(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=Ge(e,o,n)}),r}function Fl(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function ia(e){return typeof e=="string"}function en(e,t,n){return e===void 0||ia(e)?t:T({},t,{ownerState:T({},t.ownerState,n)})}const Vl={disableDefaultClasses:!1},zl=k.createContext(Vl);function Ul(e){const{disableDefaultClasses:t}=k.useContext(zl);return n=>t?"":e(n)}function aa(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function ql(e,t,n){return typeof e=="function"?e(t,n):e}function Wo(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function Hl(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const g=Ee(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),y=T({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),b=T({},n,o,r);return g.length>0&&(b.className=g),Object.keys(y).length>0&&(b.style=y),{props:b,internalRef:void 0}}const s=aa(T({},o,r)),l=Wo(r),c=Wo(o),u=t(s),p=Ee(u==null?void 0:u.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),f=T({},u==null?void 0:u.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),d=T({},u,n,c,l);return p.length>0&&(d.className=p),Object.keys(f).length>0&&(d.style=f),{props:d,internalRef:u.ref}}const Wl=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function wt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,s=de(e,Wl),l=i?{}:ql(r,o),{props:c,internalRef:u}=Hl(T({},s,{externalSlotProps:l})),p=Le(u,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return en(n,T({},c,{ref:p}),o)}const sa="base";function Gl(e){return`${sa}--${e}`}function Xl(e,t){return`${sa}-${e}-${t}`}function la(e,t){const n=oa[t];return n?Gl(n):Xl(e,t)}function Yl(e,t){const n={};return t.forEach(r=>{n[r]=la(e,r)}),n}const Kl=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Jl(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function Zl(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Ql(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Zl(e))}function ec(e){const t=[],n=[];return Array.from(e.querySelectorAll(Kl)).forEach((r,o)=>{const i=Jl(r);i===-1||!Ql(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function tc(){return!0}function Dn(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=ec,isEnabled:s=tc,open:l}=e,c=k.useRef(!1),u=k.useRef(null),p=k.useRef(null),f=k.useRef(null),d=k.useRef(null),g=k.useRef(!1),y=k.useRef(null),b=Le(t.ref,y),h=k.useRef(null);k.useEffect(()=>{!l||!y.current||(g.current=!n)},[n,l]),k.useEffect(()=>{if(!l||!y.current)return;const w=ke(y.current);return y.current.contains(w.activeElement)||(y.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),y.current.setAttribute("tabIndex","-1")),g.current&&y.current.focus()),()=>{o||(f.current&&f.current.focus&&(c.current=!0,f.current.focus()),f.current=null)}},[l]),k.useEffect(()=>{if(!l||!y.current)return;const w=ke(y.current),x=N=>{h.current=N,!(r||!s()||N.key!=="Tab")&&w.activeElement===y.current&&N.shiftKey&&(c.current=!0,p.current&&p.current.focus())},m=()=>{const N=y.current;if(N===null)return;if(!w.hasFocus()||!s()||c.current){c.current=!1;return}if(N.contains(w.activeElement)||r&&w.activeElement!==u.current&&w.activeElement!==p.current)return;if(w.activeElement!==d.current)d.current=null;else if(d.current!==null)return;if(!g.current)return;let F=[];if((w.activeElement===u.current||w.activeElement===p.current)&&(F=i(y.current)),F.length>0){var L,V;const C=!!((L=h.current)!=null&&L.shiftKey&&((V=h.current)==null?void 0:V.key)==="Tab"),M=F[0],R=F[F.length-1];typeof M!="string"&&typeof R!="string"&&(C?R.focus():M.focus())}else N.focus()};w.addEventListener("focusin",m),w.addEventListener("keydown",x,!0);const S=setInterval(()=>{w.activeElement&&w.activeElement.tagName==="BODY"&&m()},50);return()=>{clearInterval(S),w.removeEventListener("focusin",m),w.removeEventListener("keydown",x,!0)}},[n,r,o,s,l,i]);const E=w=>{f.current===null&&(f.current=w.relatedTarget),g.current=!0,d.current=w.target;const x=t.props.onFocus;x&&x(w)},j=w=>{f.current===null&&(f.current=w.relatedTarget),g.current=!0};return v.jsxs(k.Fragment,{children:[v.jsx("div",{tabIndex:l?0:-1,onFocus:j,ref:u,"data-testid":"sentinelStart"}),k.cloneElement(t,{ref:b,onFocus:E}),v.jsx("div",{tabIndex:l?0:-1,onFocus:j,ref:p,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(Dn.propTypes={children:mn,disableAutoFocus:a.bool,disableEnforceFocus:a.bool,disableRestoreFocus:a.bool,getTabbable:a.func,isEnabled:a.func,open:a.bool.isRequired});process.env.NODE_ENV!=="production"&&(Dn["propTypes"]=Wi(Dn.propTypes));function nc(e){return typeof e=="function"?e():e}const cn=k.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[s,l]=k.useState(null),c=Le(k.isValidElement(r)?r.ref:null,n);if(yt(()=>{i||l(nc(o)||document.body)},[o,i]),yt(()=>{if(s&&!i)return An(n,s),()=>{An(n,null)}},[n,s,i]),i){if(k.isValidElement(r)){const u={ref:c};return k.cloneElement(r,u)}return v.jsx(k.Fragment,{children:r})}return v.jsx(k.Fragment,{children:s&&ys.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&(cn.propTypes={children:a.node,container:a.oneOfType([Ze,a.func]),disablePortal:a.bool});process.env.NODE_ENV!=="production"&&(cn["propTypes"]=Wi(cn.propTypes));function rc(e){const t=ke(e);return t.body===e?It(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function rn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Go(e){return parseInt(It(e).getComputedStyle(e).paddingRight,10)||0}function oc(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Xo(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,s=>{const l=i.indexOf(s)===-1,c=!oc(s);l&&c&&rn(s,o)})}function gr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function ic(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(rc(r)){const s=Zi(ke(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Go(r)+s}px`;const l=ke(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${Go(c)+s}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=ke(r).body;else{const s=r.parentElement,l=It(r);i=(s==null?void 0:s.nodeName)==="HTML"&&l.getComputedStyle(s).overflowY==="scroll"?s:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:s,property:l})=>{i?s.style.setProperty(l,i):s.style.removeProperty(l)})}}function ac(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class sc{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&rn(t.modalRef,!1);const o=ac(n);Xo(n,t.mount,t.modalRef,o,!0);const i=gr(this.containers,s=>s.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=gr(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=ic(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=gr(this.containers,s=>s.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&rn(t.modalRef,n),Xo(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=i.modals[i.modals.length-1];s.modalRef&&rn(s.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function lc(e){return typeof e=="function"?e():e}function cc(e){return e?e.props.hasOwnProperty("in"):!1}const uc=new sc;function pc(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=uc,closeAfterTransition:i=!1,onTransitionEnter:s,onTransitionExited:l,children:c,onClose:u,open:p,rootRef:f}=e,d=k.useRef({}),g=k.useRef(null),y=k.useRef(null),b=Le(y,f),[h,E]=k.useState(!p),j=cc(c);let w=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(w=!1);const x=()=>ke(g.current),m=()=>(d.current.modalRef=y.current,d.current.mount=g.current,d.current),S=()=>{o.mount(m(),{disableScrollLock:r}),y.current&&(y.current.scrollTop=0)},N=ln(()=>{const $=lc(t)||x().body;o.add(m(),$),y.current&&S()}),F=k.useCallback(()=>o.isTopModal(m()),[o]),L=ln($=>{g.current=$,$&&(p&&F()?S():y.current&&rn(y.current,w))}),V=k.useCallback(()=>{o.remove(m(),w)},[w,o]);k.useEffect(()=>()=>{V()},[V]),k.useEffect(()=>{p?N():(!j||!i)&&V()},[p,V,j,i,N]);const C=$=>z=>{var ee;(ee=$.onKeyDown)==null||ee.call($,z),!(z.key!=="Escape"||z.which===229||!F())&&(n||(z.stopPropagation(),u&&u(z,"escapeKeyDown")))},M=$=>z=>{var ee;(ee=$.onClick)==null||ee.call($,z),z.target===z.currentTarget&&u&&u(z,"backdropClick")};return{getRootProps:($={})=>{const z=aa(e);delete z.onTransitionEnter,delete z.onTransitionExited;const ee=T({},z,$);return T({role:"presentation"},ee,{onKeyDown:C(ee),ref:b})},getBackdropProps:($={})=>{const z=$;return T({"aria-hidden":!0},z,{onClick:M(z),open:p})},getTransitionProps:()=>{const $=()=>{E(!1),s&&s()},z=()=>{E(!0),l&&l(),i&&V()};return{onEnter:Cr($,c==null?void 0:c.props.onEnter),onExited:Cr(z,c==null?void 0:c.props.onExited)}},rootRef:b,portalRef:L,isTopModal:F,exited:h,hasTransition:j}}var Ne="top",Fe="bottom",Ve="right",Pe="left",Hr="auto",bn=[Ne,Fe,Ve,Pe],_t="start",un="end",dc="clippingParents",ca="viewport",Xt="popper",fc="reference",Yo=bn.reduce(function(e,t){return e.concat([t+"-"+_t,t+"-"+un])},[]),ua=[].concat(bn,[Hr]).reduce(function(e,t){return e.concat([t,t+"-"+_t,t+"-"+un])},[]),hc="beforeRead",mc="read",gc="afterRead",bc="beforeMain",vc="main",yc="afterMain",wc="beforeWrite",xc="write",Ec="afterWrite",kc=[hc,mc,gc,bc,vc,yc,wc,xc,Ec];function We(e){return e?(e.nodeName||"").toLowerCase():null}function _e(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function xt(e){var t=_e(e).Element;return e instanceof t||e instanceof Element}function Be(e){var t=_e(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Wr(e){if(typeof ShadowRoot>"u")return!1;var t=_e(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Tc(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!Be(i)||!We(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(s){var l=o[s];l===!1?i.removeAttribute(s):i.setAttribute(s,l===!0?"":l)}))})}function Oc(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},s=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=s.reduce(function(c,u){return c[u]="",c},{});!Be(o)||!We(o)||(Object.assign(o.style,l),Object.keys(i).forEach(function(c){o.removeAttribute(c)}))})}}const Sc={name:"applyStyles",enabled:!0,phase:"write",fn:Tc,effect:Oc,requires:["computeStyles"]};function qe(e){return e.split("-")[0]}var bt=Math.max,Bn=Math.min,At=Math.round;function Rr(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function pa(){return!/^((?!chrome|android).)*safari/i.test(Rr())}function Dt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&Be(e)&&(o=e.offsetWidth>0&&At(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&At(r.height)/e.offsetHeight||1);var s=xt(e)?_e(e):window,l=s.visualViewport,c=!pa()&&n,u=(r.left+(c&&l?l.offsetLeft:0))/o,p=(r.top+(c&&l?l.offsetTop:0))/i,f=r.width/o,d=r.height/i;return{width:f,height:d,top:p,right:u+f,bottom:p+d,left:u,x:u,y:p}}function Gr(e){var t=Dt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function da(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Wr(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function Qe(e){return _e(e).getComputedStyle(e)}function Cc(e){return["table","td","th"].indexOf(We(e))>=0}function st(e){return((xt(e)?e.ownerDocument:e.document)||window.document).documentElement}function Gn(e){return We(e)==="html"?e:e.assignedSlot||e.parentNode||(Wr(e)?e.host:null)||st(e)}function Ko(e){return!Be(e)||Qe(e).position==="fixed"?null:e.offsetParent}function Nc(e){var t=/firefox/i.test(Rr()),n=/Trident/i.test(Rr());if(n&&Be(e)){var r=Qe(e);if(r.position==="fixed")return null}var o=Gn(e);for(Wr(o)&&(o=o.host);Be(o)&&["html","body"].indexOf(We(o))<0;){var i=Qe(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function vn(e){for(var t=_e(e),n=Ko(e);n&&Cc(n)&&Qe(n).position==="static";)n=Ko(n);return n&&(We(n)==="html"||We(n)==="body"&&Qe(n).position==="static")?t:n||Nc(e)||t}function Xr(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function on(e,t,n){return bt(e,Bn(t,n))}function Pc(e,t,n){var r=on(e,t,n);return r>n?n:r}function fa(){return{top:0,right:0,bottom:0,left:0}}function ha(e){return Object.assign({},fa(),e)}function ma(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Rc=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,ha(typeof t!="number"?t:ma(t,bn))};function Mc(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,s=n.modifiersData.popperOffsets,l=qe(n.placement),c=Xr(l),u=[Pe,Ve].indexOf(l)>=0,p=u?"height":"width";if(!(!i||!s)){var f=Rc(o.padding,n),d=Gr(i),g=c==="y"?Ne:Pe,y=c==="y"?Fe:Ve,b=n.rects.reference[p]+n.rects.reference[c]-s[c]-n.rects.popper[p],h=s[c]-n.rects.reference[c],E=vn(i),j=E?c==="y"?E.clientHeight||0:E.clientWidth||0:0,w=b/2-h/2,x=f[g],m=j-d[p]-f[y],S=j/2-d[p]/2+w,N=on(x,S,m),F=c;n.modifiersData[r]=(t={},t[F]=N,t.centerOffset=N-S,t)}}function $c(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||da(t.elements.popper,o)&&(t.elements.arrow=o))}const jc={name:"arrow",enabled:!0,phase:"main",fn:Mc,effect:$c,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Bt(e){return e.split("-")[1]}var Ic={top:"auto",right:"auto",bottom:"auto",left:"auto"};function _c(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:At(n*o)/o||0,y:At(r*o)/o||0}}function Jo(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,s=e.offsets,l=e.position,c=e.gpuAcceleration,u=e.adaptive,p=e.roundOffsets,f=e.isFixed,d=s.x,g=d===void 0?0:d,y=s.y,b=y===void 0?0:y,h=typeof p=="function"?p({x:g,y:b}):{x:g,y:b};g=h.x,b=h.y;var E=s.hasOwnProperty("x"),j=s.hasOwnProperty("y"),w=Pe,x=Ne,m=window;if(u){var S=vn(n),N="clientHeight",F="clientWidth";if(S===_e(n)&&(S=st(n),Qe(S).position!=="static"&&l==="absolute"&&(N="scrollHeight",F="scrollWidth")),S=S,o===Ne||(o===Pe||o===Ve)&&i===un){x=Fe;var L=f&&S===m&&m.visualViewport?m.visualViewport.height:S[N];b-=L-r.height,b*=c?1:-1}if(o===Pe||(o===Ne||o===Fe)&&i===un){w=Ve;var V=f&&S===m&&m.visualViewport?m.visualViewport.width:S[F];g-=V-r.width,g*=c?1:-1}}var C=Object.assign({position:l},u&&Ic),M=p===!0?_c({x:g,y:b},_e(n)):{x:g,y:b};if(g=M.x,b=M.y,c){var R;return Object.assign({},C,(R={},R[x]=j?"0":"",R[w]=E?"0":"",R.transform=(m.devicePixelRatio||1)<=1?"translate("+g+"px, "+b+"px)":"translate3d("+g+"px, "+b+"px, 0)",R))}return Object.assign({},C,(t={},t[x]=j?b+"px":"",t[w]=E?g+"px":"",t.transform="",t))}function Ac(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,s=i===void 0?!0:i,l=n.roundOffsets,c=l===void 0?!0:l,u={placement:qe(t.placement),variation:Bt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Jo(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Jo(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Dc={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Ac,data:{}};var Sn={passive:!0};function Bc(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,s=r.resize,l=s===void 0?!0:s,c=_e(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&u.forEach(function(p){p.addEventListener("scroll",n.update,Sn)}),l&&c.addEventListener("resize",n.update,Sn),function(){i&&u.forEach(function(p){p.removeEventListener("scroll",n.update,Sn)}),l&&c.removeEventListener("resize",n.update,Sn)}}const Lc={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Bc,data:{}};var Fc={left:"right",right:"left",bottom:"top",top:"bottom"};function Rn(e){return e.replace(/left|right|bottom|top/g,function(t){return Fc[t]})}var Vc={start:"end",end:"start"};function Zo(e){return e.replace(/start|end/g,function(t){return Vc[t]})}function Yr(e){var t=_e(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Kr(e){return Dt(st(e)).left+Yr(e).scrollLeft}function zc(e,t){var n=_e(e),r=st(e),o=n.visualViewport,i=r.clientWidth,s=r.clientHeight,l=0,c=0;if(o){i=o.width,s=o.height;var u=pa();(u||!u&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:i,height:s,x:l+Kr(e),y:c}}function Uc(e){var t,n=st(e),r=Yr(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=bt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=bt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Kr(e),c=-r.scrollTop;return Qe(o||n).direction==="rtl"&&(l+=bt(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:s,x:l,y:c}}function Jr(e){var t=Qe(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function ga(e){return["html","body","#document"].indexOf(We(e))>=0?e.ownerDocument.body:Be(e)&&Jr(e)?e:ga(Gn(e))}function an(e,t){var n;t===void 0&&(t=[]);var r=ga(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=_e(r),s=o?[i].concat(i.visualViewport||[],Jr(r)?r:[]):r,l=t.concat(s);return o?l:l.concat(an(Gn(s)))}function Mr(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function qc(e,t){var n=Dt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Qo(e,t,n){return t===ca?Mr(zc(e,n)):xt(t)?qc(t,n):Mr(Uc(st(e)))}function Hc(e){var t=an(Gn(e)),n=["absolute","fixed"].indexOf(Qe(e).position)>=0,r=n&&Be(e)?vn(e):e;return xt(r)?t.filter(function(o){return xt(o)&&da(o,r)&&We(o)!=="body"}):[]}function Wc(e,t,n,r){var o=t==="clippingParents"?Hc(e):[].concat(t),i=[].concat(o,[n]),s=i[0],l=i.reduce(function(c,u){var p=Qo(e,u,r);return c.top=bt(p.top,c.top),c.right=Bn(p.right,c.right),c.bottom=Bn(p.bottom,c.bottom),c.left=bt(p.left,c.left),c},Qo(e,s,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function ba(e){var t=e.reference,n=e.element,r=e.placement,o=r?qe(r):null,i=r?Bt(r):null,s=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Ne:c={x:s,y:t.y-n.height};break;case Fe:c={x:s,y:t.y+t.height};break;case Ve:c={x:t.x+t.width,y:l};break;case Pe:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var u=o?Xr(o):null;if(u!=null){var p=u==="y"?"height":"width";switch(i){case _t:c[u]=c[u]-(t[p]/2-n[p]/2);break;case un:c[u]=c[u]+(t[p]/2-n[p]/2);break}}return c}function pn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,s=i===void 0?e.strategy:i,l=n.boundary,c=l===void 0?dc:l,u=n.rootBoundary,p=u===void 0?ca:u,f=n.elementContext,d=f===void 0?Xt:f,g=n.altBoundary,y=g===void 0?!1:g,b=n.padding,h=b===void 0?0:b,E=ha(typeof h!="number"?h:ma(h,bn)),j=d===Xt?fc:Xt,w=e.rects.popper,x=e.elements[y?j:d],m=Wc(xt(x)?x:x.contextElement||st(e.elements.popper),c,p,s),S=Dt(e.elements.reference),N=ba({reference:S,element:w,strategy:"absolute",placement:o}),F=Mr(Object.assign({},w,N)),L=d===Xt?F:S,V={top:m.top-L.top+E.top,bottom:L.bottom-m.bottom+E.bottom,left:m.left-L.left+E.left,right:L.right-m.right+E.right},C=e.modifiersData.offset;if(d===Xt&&C){var M=C[o];Object.keys(V).forEach(function(R){var B=[Ve,Fe].indexOf(R)>=0?1:-1,D=[Ne,Fe].indexOf(R)>=0?"y":"x";V[R]+=M[D]*B})}return V}function Gc(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,s=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,u=c===void 0?ua:c,p=Bt(r),f=p?l?Yo:Yo.filter(function(y){return Bt(y)===p}):bn,d=f.filter(function(y){return u.indexOf(y)>=0});d.length===0&&(d=f);var g=d.reduce(function(y,b){return y[b]=pn(e,{placement:b,boundary:o,rootBoundary:i,padding:s})[qe(b)],y},{});return Object.keys(g).sort(function(y,b){return g[y]-g[b]})}function Xc(e){if(qe(e)===Hr)return[];var t=Rn(e);return[Zo(e),t,Zo(t)]}function Yc(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!0:s,c=n.fallbackPlacements,u=n.padding,p=n.boundary,f=n.rootBoundary,d=n.altBoundary,g=n.flipVariations,y=g===void 0?!0:g,b=n.allowedAutoPlacements,h=t.options.placement,E=qe(h),j=E===h,w=c||(j||!y?[Rn(h)]:Xc(h)),x=[h].concat(w).reduce(function(U,H){return U.concat(qe(H)===Hr?Gc(t,{placement:H,boundary:p,rootBoundary:f,padding:u,flipVariations:y,allowedAutoPlacements:b}):H)},[]),m=t.rects.reference,S=t.rects.popper,N=new Map,F=!0,L=x[0],V=0;V<x.length;V++){var C=x[V],M=qe(C),R=Bt(C)===_t,B=[Ne,Fe].indexOf(M)>=0,D=B?"width":"height",$=pn(t,{placement:C,boundary:p,rootBoundary:f,altBoundary:d,padding:u}),z=B?R?Ve:Pe:R?Fe:Ne;m[D]>S[D]&&(z=Rn(z));var ee=Rn(z),Q=[];if(i&&Q.push($[M]<=0),l&&Q.push($[z]<=0,$[ee]<=0),Q.every(function(U){return U})){L=C,F=!1;break}N.set(C,Q)}if(F)for(var O=y?3:1,A=function(H){var G=x.find(function(X){var W=N.get(X);if(W)return W.slice(0,H).every(function(K){return K})});if(G)return L=G,"break"},q=O;q>0;q--){var Y=A(q);if(Y==="break")break}t.placement!==L&&(t.modifiersData[r]._skip=!0,t.placement=L,t.reset=!0)}}const Kc={name:"flip",enabled:!0,phase:"main",fn:Yc,requiresIfExists:["offset"],data:{_skip:!1}};function ei(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ti(e){return[Ne,Ve,Fe,Pe].some(function(t){return e[t]>=0})}function Jc(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,s=pn(t,{elementContext:"reference"}),l=pn(t,{altBoundary:!0}),c=ei(s,r),u=ei(l,o,i),p=ti(c),f=ti(u);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:u,isReferenceHidden:p,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":f})}const Zc={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Jc};function Qc(e,t,n){var r=qe(e),o=[Pe,Ne].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,s=i[0],l=i[1];return s=s||0,l=(l||0)*o,[Pe,Ve].indexOf(r)>=0?{x:l,y:s}:{x:s,y:l}}function eu(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,s=ua.reduce(function(p,f){return p[f]=Qc(f,t.rects,i),p},{}),l=s[t.placement],c=l.x,u=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=u),t.modifiersData[r]=s}const tu={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:eu};function nu(e){var t=e.state,n=e.name;t.modifiersData[n]=ba({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const ru={name:"popperOffsets",enabled:!0,phase:"read",fn:nu,data:{}};function ou(e){return e==="x"?"y":"x"}function iu(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!1:s,c=n.boundary,u=n.rootBoundary,p=n.altBoundary,f=n.padding,d=n.tether,g=d===void 0?!0:d,y=n.tetherOffset,b=y===void 0?0:y,h=pn(t,{boundary:c,rootBoundary:u,padding:f,altBoundary:p}),E=qe(t.placement),j=Bt(t.placement),w=!j,x=Xr(E),m=ou(x),S=t.modifiersData.popperOffsets,N=t.rects.reference,F=t.rects.popper,L=typeof b=="function"?b(Object.assign({},t.rects,{placement:t.placement})):b,V=typeof L=="number"?{mainAxis:L,altAxis:L}:Object.assign({mainAxis:0,altAxis:0},L),C=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,M={x:0,y:0};if(S){if(i){var R,B=x==="y"?Ne:Pe,D=x==="y"?Fe:Ve,$=x==="y"?"height":"width",z=S[x],ee=z+h[B],Q=z-h[D],O=g?-F[$]/2:0,A=j===_t?N[$]:F[$],q=j===_t?-F[$]:-N[$],Y=t.elements.arrow,U=g&&Y?Gr(Y):{width:0,height:0},H=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:fa(),G=H[B],X=H[D],W=on(0,N[$],U[$]),K=w?N[$]/2-O-W-G-V.mainAxis:A-W-G-V.mainAxis,J=w?-N[$]/2+O+W+X+V.mainAxis:q+W+X+V.mainAxis,re=t.elements.arrow&&vn(t.elements.arrow),I=re?x==="y"?re.clientTop||0:re.clientLeft||0:0,Z=(R=C==null?void 0:C[x])!=null?R:0,P=z+K-Z-I,oe=z+J-Z,we=on(g?Bn(ee,P):ee,z,g?bt(Q,oe):Q);S[x]=we,M[x]=we-z}if(l){var Oe,ve=x==="x"?Ne:Pe,ct=x==="x"?Fe:Ve,Se=S[m],Xe=m==="y"?"height":"width",Me=Se+h[ve],Ye=Se-h[ct],xe=[Ne,Pe].indexOf(E)!==-1,kt=(Oe=C==null?void 0:C[m])!=null?Oe:0,ut=xe?Me:Se-N[Xe]-F[Xe]-kt+V.altAxis,Vt=xe?Se+N[Xe]+F[Xe]-kt-V.altAxis:Ye,En=g&&xe?Pc(ut,Se,Vt):on(g?ut:Me,Se,g?Vt:Ye);S[m]=En,M[m]=En-Se}t.modifiersData[r]=M}}const au={name:"preventOverflow",enabled:!0,phase:"main",fn:iu,requiresIfExists:["offset"]};function su(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function lu(e){return e===_e(e)||!Be(e)?Yr(e):su(e)}function cu(e){var t=e.getBoundingClientRect(),n=At(t.width)/e.offsetWidth||1,r=At(t.height)/e.offsetHeight||1;return n!==1||r!==1}function uu(e,t,n){n===void 0&&(n=!1);var r=Be(t),o=Be(t)&&cu(t),i=st(t),s=Dt(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((We(t)!=="body"||Jr(i))&&(l=lu(t)),Be(t)?(c=Dt(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):i&&(c.x=Kr(i))),{x:s.left+l.scrollLeft-c.x,y:s.top+l.scrollTop-c.y,width:s.width,height:s.height}}function pu(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var s=[].concat(i.requires||[],i.requiresIfExists||[]);s.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function du(e){var t=pu(e);return kc.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function fu(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function hu(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var ni={placement:"bottom",modifiers:[],strategy:"absolute"};function ri(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function mu(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?ni:o;return function(l,c,u){u===void 0&&(u=i);var p={placement:"bottom",orderedModifiers:[],options:Object.assign({},ni,i),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},f=[],d=!1,g={state:p,setOptions:function(E){var j=typeof E=="function"?E(p.options):E;b(),p.options=Object.assign({},i,p.options,j),p.scrollParents={reference:xt(l)?an(l):l.contextElement?an(l.contextElement):[],popper:an(c)};var w=du(hu([].concat(r,p.options.modifiers)));return p.orderedModifiers=w.filter(function(x){return x.enabled}),y(),g.update()},forceUpdate:function(){if(!d){var E=p.elements,j=E.reference,w=E.popper;if(ri(j,w)){p.rects={reference:uu(j,vn(w),p.options.strategy==="fixed"),popper:Gr(w)},p.reset=!1,p.placement=p.options.placement,p.orderedModifiers.forEach(function(V){return p.modifiersData[V.name]=Object.assign({},V.data)});for(var x=0;x<p.orderedModifiers.length;x++){if(p.reset===!0){p.reset=!1,x=-1;continue}var m=p.orderedModifiers[x],S=m.fn,N=m.options,F=N===void 0?{}:N,L=m.name;typeof S=="function"&&(p=S({state:p,options:F,name:L,instance:g})||p)}}}},update:fu(function(){return new Promise(function(h){g.forceUpdate(),h(p)})}),destroy:function(){b(),d=!0}};if(!ri(l,c))return g;g.setOptions(u).then(function(h){!d&&u.onFirstUpdate&&u.onFirstUpdate(h)});function y(){p.orderedModifiers.forEach(function(h){var E=h.name,j=h.options,w=j===void 0?{}:j,x=h.effect;if(typeof x=="function"){var m=x({state:p,name:E,instance:g,options:w}),S=function(){};f.push(m||S)}})}function b(){f.forEach(function(h){return h()}),f=[]}return g}}var gu=[Lc,ru,Dc,Sc,tu,Kc,au,jc,Zc],bu=mu({defaultModifiers:gu});const va="Popper";function vu(e){return la(va,e)}Yl(va,["root"]);const yu=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],wu=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function xu(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function Ln(e){return typeof e=="function"?e():e}function Xn(e){return e.nodeType!==void 0}function Eu(e){return!Xn(e)}const ku=()=>tt({root:["root"]},Ul(vu)),Tu={},Ou=k.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:s,disablePortal:l,modifiers:c,open:u,placement:p,popperOptions:f,popperRef:d,slotProps:g={},slots:y={},TransitionProps:b}=t,h=de(t,yu),E=k.useRef(null),j=Le(E,n),w=k.useRef(null),x=Le(w,d),m=k.useRef(x);yt(()=>{m.current=x},[x]),k.useImperativeHandle(d,()=>w.current,[]);const S=xu(p,s),[N,F]=k.useState(S),[L,V]=k.useState(Ln(o));k.useEffect(()=>{w.current&&w.current.forceUpdate()}),k.useEffect(()=>{o&&V(Ln(o))},[o]),yt(()=>{if(!L||!u)return;const D=ee=>{F(ee.placement)};if(process.env.NODE_ENV!=="production"&&L&&Xn(L)&&L.nodeType===1){const ee=L.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ee.top===0&&ee.left===0&&ee.right===0&&ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let $=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ee})=>{D(ee)}}];c!=null&&($=$.concat(c)),f&&f.modifiers!=null&&($=$.concat(f.modifiers));const z=bu(L,E.current,T({placement:S},f,{modifiers:$}));return m.current(z),()=>{z.destroy(),m.current(null)}},[L,l,c,u,f,S]);const C={placement:N};b!==null&&(C.TransitionProps=b);const M=ku(),R=(r=y.root)!=null?r:"div",B=wt({elementType:R,externalSlotProps:g.root,externalForwardedProps:h,additionalProps:{role:"tooltip",ref:j},ownerState:t,className:M.root});return v.jsx(R,T({},B,{children:typeof i=="function"?i(C):i}))}),ya=k.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:s="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:u,open:p,placement:f="bottom",popperOptions:d=Tu,popperRef:g,style:y,transition:b=!1,slotProps:h={},slots:E={}}=t,j=de(t,wu),[w,x]=k.useState(!0),m=()=>{x(!1)},S=()=>{x(!0)};if(!c&&!p&&(!b||w))return null;let N;if(i)N=i;else if(r){const V=Ln(r);N=V&&Xn(V)?ke(V).body:ke(null).body}const F=!p&&c&&(!b||w)?"none":void 0,L=b?{in:p,onEnter:m,onExited:S}:void 0;return v.jsx(cn,{disablePortal:l,container:N,children:v.jsx(Ou,T({anchorEl:r,direction:s,disablePortal:l,modifiers:u,ref:n,open:b?!w:p,placement:f,popperOptions:d,popperRef:g,slotProps:h,slots:E},j,{style:T({position:"fixed",top:0,left:0,display:F},y),TransitionProps:L,children:o}))})});process.env.NODE_ENV!=="production"&&(ya.propTypes={anchorEl:Ft(a.oneOfType([Ze,a.object,a.func]),e=>{if(e.open){const t=Ln(e.anchorEl);if(t&&Xn(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Eu(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:a.oneOfType([a.node,a.func]),container:a.oneOfType([Ze,a.func]),direction:a.oneOf(["ltr","rtl"]),disablePortal:a.bool,keepMounted:a.bool,modifiers:a.arrayOf(a.shape({data:a.object,effect:a.func,enabled:a.bool,fn:a.func,name:a.any,options:a.object,phase:a.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:a.arrayOf(a.string),requiresIfExists:a.arrayOf(a.string)})),open:a.bool.isRequired,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:a.shape({modifiers:a.array,onFirstUpdate:a.func,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:a.oneOf(["absolute","fixed"])}),popperRef:qr,slotProps:a.shape({root:a.oneOfType([a.func,a.object])}),slots:a.shape({root:a.elementType}),transition:a.bool});const Su=["values","unit","step"],Cu=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>T({},n,{[r.key]:r.val}),{})};function Nu(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=de(e,Su),i=Cu(t),s=Object.keys(i);function l(d){return`@media (min-width:${typeof t[d]=="number"?t[d]:d}${n})`}function c(d){return`@media (max-width:${(typeof t[d]=="number"?t[d]:d)-r/100}${n})`}function u(d,g){const y=s.indexOf(g);return`@media (min-width:${typeof t[d]=="number"?t[d]:d}${n}) and (max-width:${(y!==-1&&typeof t[s[y]]=="number"?t[s[y]]:g)-r/100}${n})`}function p(d){return s.indexOf(d)+1<s.length?u(d,s[s.indexOf(d)+1]):l(d)}function f(d){const g=s.indexOf(d);return g===0?l(s[1]):g===s.length-1?c(s[g]):u(d,s[s.indexOf(d)+1]).replace("@media","@media not all and")}return T({keys:s,values:i,up:l,down:c,between:u,only:p,not:f,unit:n},o)}const Pu={borderRadius:4},Ru=Pu,Mu=process.env.NODE_ENV!=="production"?a.oneOfType([a.number,a.string,a.object,a.array]):{},lt=Mu;function sn(e,t){return t?Je(e,t,{clone:!1}):e}const Zr={xs:0,sm:600,md:900,lg:1200,xl:1536},oi={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Zr[e]}px)`};function et(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||oi;return t.reduce((s,l,c)=>(s[i.up(i.keys[c])]=n(t[c]),s),{})}if(typeof t=="object"){const i=r.breakpoints||oi;return Object.keys(t).reduce((s,l)=>{if(Object.keys(i.values||Zr).indexOf(l)!==-1){const c=i.up(l);s[c]=n(t[l],l)}else{const c=l;s[c]=t[c]}return s},{})}return n(t)}function $u(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function ju(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Yn(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function Fn(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Yn(e,n)||r,t&&(o=t(o,r,e)),o}function ye(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=s=>{if(s[t]==null)return null;const l=s[t],c=s.theme,u=Yn(c,r)||{};return et(s,l,f=>{let d=Fn(u,o,f);return f===d&&typeof f=="string"&&(d=Fn(u,o,`${t}${f==="default"?"":He(f)}`,f)),n===!1?d:{[n]:d}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:lt}:{},i.filterProps=[t],i}function Iu(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const _u={m:"margin",p:"padding"},Au={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},ii={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Du=Iu(e=>{if(e.length>2)if(ii[e])e=ii[e];else return[e];const[t,n]=e.split(""),r=_u[t],o=Au[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),Kn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Jn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Bu=[...Kn,...Jn];function yn(e,t,n,r){var o;const i=(o=Yn(e,t,!1))!=null?o:n;return typeof i=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),i*s):Array.isArray(i)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>i.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${s} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[s]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function wa(e){return yn(e,"spacing",8,"spacing")}function wn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Lu(e,t){return n=>e.reduce((r,o)=>(r[o]=wn(t,n),r),{})}function Fu(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=Du(n),i=Lu(o,r),s=e[n];return et(e,s,i)}function xa(e,t){const n=wa(e.theme);return Object.keys(e).map(r=>Fu(e,t,r,n)).reduce(sn,{})}function me(e){return xa(e,Kn)}me.propTypes=process.env.NODE_ENV!=="production"?Kn.reduce((e,t)=>(e[t]=lt,e),{}):{};me.filterProps=Kn;function ge(e){return xa(e,Jn)}ge.propTypes=process.env.NODE_ENV!=="production"?Jn.reduce((e,t)=>(e[t]=lt,e),{}):{};ge.filterProps=Jn;process.env.NODE_ENV!=="production"&&Bu.reduce((e,t)=>(e[t]=lt,e),{});function Vu(e=8){if(e.mui)return e;const t=wa({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const s=t(i);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function Zn(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?sn(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function De(e){return typeof e!="number"?e:`${e}px solid`}function ze(e,t){return ye({prop:e,themeKey:"borders",transform:t})}const zu=ze("border",De),Uu=ze("borderTop",De),qu=ze("borderRight",De),Hu=ze("borderBottom",De),Wu=ze("borderLeft",De),Gu=ze("borderColor"),Xu=ze("borderTopColor"),Yu=ze("borderRightColor"),Ku=ze("borderBottomColor"),Ju=ze("borderLeftColor"),Zu=ze("outline",De),Qu=ze("outlineColor"),Qn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=yn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:wn(t,r)});return et(e,e.borderRadius,n)}return null};Qn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:lt}:{};Qn.filterProps=["borderRadius"];Zn(zu,Uu,qu,Hu,Wu,Gu,Xu,Yu,Ku,Ju,Qn,Zu,Qu);const er=e=>{if(e.gap!==void 0&&e.gap!==null){const t=yn(e.theme,"spacing",8,"gap"),n=r=>({gap:wn(t,r)});return et(e,e.gap,n)}return null};er.propTypes=process.env.NODE_ENV!=="production"?{gap:lt}:{};er.filterProps=["gap"];const tr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=yn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:wn(t,r)});return et(e,e.columnGap,n)}return null};tr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:lt}:{};tr.filterProps=["columnGap"];const nr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=yn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:wn(t,r)});return et(e,e.rowGap,n)}return null};nr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:lt}:{};nr.filterProps=["rowGap"];const ep=ye({prop:"gridColumn"}),tp=ye({prop:"gridRow"}),np=ye({prop:"gridAutoFlow"}),rp=ye({prop:"gridAutoColumns"}),op=ye({prop:"gridAutoRows"}),ip=ye({prop:"gridTemplateColumns"}),ap=ye({prop:"gridTemplateRows"}),sp=ye({prop:"gridTemplateAreas"}),lp=ye({prop:"gridArea"});Zn(er,tr,nr,ep,tp,np,rp,op,ip,ap,sp,lp);function $t(e,t){return t==="grey"?t:e}const cp=ye({prop:"color",themeKey:"palette",transform:$t}),up=ye({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:$t}),pp=ye({prop:"backgroundColor",themeKey:"palette",transform:$t});Zn(cp,up,pp);function Ie(e){return e<=1&&e!==0?`${e*100}%`:e}const dp=ye({prop:"width",transform:Ie}),Qr=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Zr[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:Ie(n)}};return et(e,e.maxWidth,t)}return null};Qr.filterProps=["maxWidth"];const fp=ye({prop:"minWidth",transform:Ie}),hp=ye({prop:"height",transform:Ie}),mp=ye({prop:"maxHeight",transform:Ie}),gp=ye({prop:"minHeight",transform:Ie});ye({prop:"size",cssProperty:"width",transform:Ie});ye({prop:"size",cssProperty:"height",transform:Ie});const bp=ye({prop:"boxSizing"});Zn(dp,Qr,fp,hp,mp,gp,bp);const vp={border:{themeKey:"borders",transform:De},borderTop:{themeKey:"borders",transform:De},borderRight:{themeKey:"borders",transform:De},borderBottom:{themeKey:"borders",transform:De},borderLeft:{themeKey:"borders",transform:De},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:De},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Qn},color:{themeKey:"palette",transform:$t},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:$t},backgroundColor:{themeKey:"palette",transform:$t},p:{style:ge},pt:{style:ge},pr:{style:ge},pb:{style:ge},pl:{style:ge},px:{style:ge},py:{style:ge},padding:{style:ge},paddingTop:{style:ge},paddingRight:{style:ge},paddingBottom:{style:ge},paddingLeft:{style:ge},paddingX:{style:ge},paddingY:{style:ge},paddingInline:{style:ge},paddingInlineStart:{style:ge},paddingInlineEnd:{style:ge},paddingBlock:{style:ge},paddingBlockStart:{style:ge},paddingBlockEnd:{style:ge},m:{style:me},mt:{style:me},mr:{style:me},mb:{style:me},ml:{style:me},mx:{style:me},my:{style:me},margin:{style:me},marginTop:{style:me},marginRight:{style:me},marginBottom:{style:me},marginLeft:{style:me},marginX:{style:me},marginY:{style:me},marginInline:{style:me},marginInlineStart:{style:me},marginInlineEnd:{style:me},marginBlock:{style:me},marginBlockStart:{style:me},marginBlockEnd:{style:me},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:er},rowGap:{style:nr},columnGap:{style:tr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ie},maxWidth:{style:Qr},minWidth:{transform:Ie},height:{transform:Ie},maxHeight:{transform:Ie},minHeight:{transform:Ie},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},eo=vp;function yp(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function wp(e,t){return typeof e=="function"?e(t):e}function xp(){function e(n,r,o,i){const s={[n]:r,theme:o},l=i[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:u,transform:p,style:f}=l;if(r==null)return null;if(u==="typography"&&r==="inherit")return{[n]:r};const d=Yn(o,u)||{};return f?f(s):et(s,r,y=>{let b=Fn(d,p,y);return y===b&&typeof y=="string"&&(b=Fn(d,p,`${n}${y==="default"?"":He(y)}`,y)),c===!1?b:{[c]:b}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const s=(r=i.unstable_sxConfig)!=null?r:eo;function l(c){let u=c;if(typeof c=="function")u=c(i);else if(typeof c!="object")return c;if(!u)return null;const p=$u(i.breakpoints),f=Object.keys(p);let d=p;return Object.keys(u).forEach(g=>{const y=wp(u[g],i);if(y!=null)if(typeof y=="object")if(s[g])d=sn(d,e(g,y,i,s));else{const b=et({theme:i},y,h=>({[g]:h}));yp(b,y)?d[g]=t({sx:y,theme:i}):d=sn(d,b)}else d=sn(d,e(g,y,i,s))}),ju(f,d)}return Array.isArray(o)?o.map(l):l(o)}return t}const Ea=xp();Ea.filterProps=["sx"];const to=Ea;function Ep(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const kp=["breakpoints","palette","spacing","shape"];function no(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,s=de(e,kp),l=Nu(n),c=Vu(o);let u=Je({breakpoints:l,direction:"ltr",components:{},palette:T({mode:"light"},r),spacing:c,shape:T({},Ru,i)},s);return u.applyStyles=Ep,u=t.reduce((p,f)=>Je(p,f),u),u.unstable_sxConfig=T({},eo,s==null?void 0:s.unstable_sxConfig),u.unstable_sx=function(f){return to({sx:f,theme:this})},u}function Tp(e){return Object.keys(e).length===0}function ka(e=null){const t=k.useContext(Tr.ThemeContext);return!t||Tp(t)?e:t}const Op=no();function Ta(e=Op){return ka(e)}const Sp=["ownerState"],Cp=["variants"],Np=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Pp(e){return Object.keys(e).length===0}function Rp(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Mn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Mp=no(),ai=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Cn({defaultTheme:e,theme:t,themeId:n}){return Pp(t)?e:t[n]||t}function $p(e){return e?(t,n)=>n[e]:null}function $n(e,t){let{ownerState:n}=t,r=de(t,Sp);const o=typeof e=="function"?e(T({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>$n(i,T({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let l=de(o,Cp);return i.forEach(c=>{let u=!0;typeof c.props=="function"?u=c.props(T({ownerState:n},r,n)):Object.keys(c.props).forEach(p=>{(n==null?void 0:n[p])!==c.props[p]&&r[p]!==c.props[p]&&(u=!1)}),u&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(T({ownerState:n},r,n)):c.style))}),l}return o}function jp(e={}){const{themeId:t,defaultTheme:n=Mp,rootShouldForwardProp:r=Mn,slotShouldForwardProp:o=Mn}=e,i=s=>to(T({},s,{theme:Cn(T({},s,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(s,l={})=>{Tr.internal_processStyles(s,m=>m.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:c,slot:u,skipVariantsResolver:p,skipSx:f,overridesResolver:d=$p(ai(u))}=l,g=de(l,Np),y=p!==void 0?p:u&&u!=="Root"&&u!=="root"||!1,b=f||!1;let h;process.env.NODE_ENV!=="production"&&c&&(h=`${c}-${ai(u||"Root")}`);let E=Mn;u==="Root"||u==="root"?E=r:u?E=o:Rp(s)&&(E=void 0);const j=Tr(s,T({shouldForwardProp:E,label:h},g)),w=m=>typeof m=="function"&&m.__emotion_real!==m||mt(m)?S=>$n(m,T({},S,{theme:Cn({theme:S.theme,defaultTheme:n,themeId:t})})):m,x=(m,...S)=>{let N=w(m);const F=S?S.map(w):[];c&&d&&F.push(C=>{const M=Cn(T({},C,{defaultTheme:n,themeId:t}));if(!M.components||!M.components[c]||!M.components[c].styleOverrides)return null;const R=M.components[c].styleOverrides,B={};return Object.entries(R).forEach(([D,$])=>{B[D]=$n($,T({},C,{theme:M}))}),d(C,B)}),c&&!y&&F.push(C=>{var M;const R=Cn(T({},C,{defaultTheme:n,themeId:t})),B=R==null||(M=R.components)==null||(M=M[c])==null?void 0:M.variants;return $n({variants:B},T({},C,{theme:R}))}),b||F.push(i);const L=F.length-S.length;if(Array.isArray(m)&&L>0){const C=new Array(L).fill("");N=[...m,...C],N.raw=[...m.raw,...C]}const V=j(N,...F);if(process.env.NODE_ENV!=="production"){let C;c&&(C=`${c}${He(u||"")}`),C===void 0&&(C=`Styled(${bl(s)})`),V.displayName=C}return s.muiName&&(V.muiName=s.muiName),V};return j.withConfig&&(x.withConfig=j.withConfig),x}}function Ip(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:na(t.components[n].defaultProps,r)}function _p({props:e,name:t,defaultTheme:n,themeId:r}){let o=Ta(n);return r&&(o=o[r]||o),Ip({theme:o,name:t,props:e})}function ro(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Fl(e,t,n)}function Ap(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Et(e){if(e.type)return e;if(e.charAt(0)==="#")return Et(Ap(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:jt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:jt(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function rr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function Dp(e){e=Et(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),s=(u,p=(u+n/30)%12)=>o-i*Math.max(Math.min(p-3,9-p,1),-1);let l="rgb";const c=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),rr({type:l,values:c})}function si(e){e=Et(e);let t=e.type==="hsl"||e.type==="hsla"?Et(Dp(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function li(e,t){const n=si(e),r=si(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function Vn(e,t){return e=Et(e),t=ro(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,rr(e)}function Bp(e,t){if(e=Et(e),t=ro(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return rr(e)}function Lp(e,t){if(e=Et(e),t=ro(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return rr(e)}function Fp(e,t){return T({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const Vp={black:"#000",white:"#fff"},dn=Vp,zp={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Up=zp,qp={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Tt=qp,Hp={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Ot=Hp,Wp={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Yt=Wp,Gp={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},St=Gp,Xp={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Ct=Xp,Yp={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Nt=Yp,Kp=["mode","contrastThreshold","tonalOffset"],ci={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:dn.white,default:dn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},br={text:{primary:dn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:dn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function ui(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=Lp(e.main,o):t==="dark"&&(e.dark=Bp(e.main,i)))}function Jp(e="light"){return e==="dark"?{main:St[200],light:St[50],dark:St[400]}:{main:St[700],light:St[400],dark:St[800]}}function Zp(e="light"){return e==="dark"?{main:Tt[200],light:Tt[50],dark:Tt[400]}:{main:Tt[500],light:Tt[300],dark:Tt[700]}}function Qp(e="light"){return e==="dark"?{main:Ot[500],light:Ot[300],dark:Ot[700]}:{main:Ot[700],light:Ot[400],dark:Ot[800]}}function ed(e="light"){return e==="dark"?{main:Ct[400],light:Ct[300],dark:Ct[700]}:{main:Ct[700],light:Ct[500],dark:Ct[900]}}function td(e="light"){return e==="dark"?{main:Nt[400],light:Nt[300],dark:Nt[700]}:{main:Nt[800],light:Nt[500],dark:Nt[900]}}function nd(e="light"){return e==="dark"?{main:Yt[400],light:Yt[300],dark:Yt[700]}:{main:"#ed6c02",light:Yt[500],dark:Yt[900]}}function rd(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=de(e,Kp),i=e.primary||Jp(t),s=e.secondary||Zp(t),l=e.error||Qp(t),c=e.info||ed(t),u=e.success||td(t),p=e.warning||nd(t);function f(b){const h=li(b,br.text.primary)>=n?br.text.primary:ci.text.primary;if(process.env.NODE_ENV!=="production"){const E=li(b,h);E<3&&console.error([`MUI: The contrast ratio of ${E}:1 for ${h} on ${b}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return h}const d=({color:b,name:h,mainShade:E=500,lightShade:j=300,darkShade:w=700})=>{if(b=T({},b),!b.main&&b[E]&&(b.main=b[E]),!b.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.`:jt(11,h?` (${h})`:"",E));if(typeof b.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(b.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:jt(12,h?` (${h})`:"",JSON.stringify(b.main)));return ui(b,"light",j,r),ui(b,"dark",w,r),b.contrastText||(b.contrastText=f(b.main)),b},g={dark:br,light:ci};return process.env.NODE_ENV!=="production"&&(g[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),Je(T({common:T({},dn),mode:t,primary:d({color:i,name:"primary"}),secondary:d({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:d({color:l,name:"error"}),warning:d({color:p,name:"warning"}),info:d({color:c,name:"info"}),success:d({color:u,name:"success"}),grey:Up,contrastThreshold:n,getContrastText:f,augmentColor:d,tonalOffset:r},g[t]),o)}const od=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function id(e){return Math.round(e*1e5)/1e5}const pi={textTransform:"uppercase"},di='"Roboto", "Helvetica", "Arial", sans-serif';function ad(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=di,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:s=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:u=16,allVariants:p,pxToRem:f}=n,d=de(n,od);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const g=o/14,y=f||(E=>`${E/u*g}rem`),b=(E,j,w,x,m)=>T({fontFamily:r,fontWeight:E,fontSize:y(j),lineHeight:w},r===di?{letterSpacing:`${id(x/j)}em`}:{},m,p),h={h1:b(i,96,1.167,-1.5),h2:b(i,60,1.2,-.5),h3:b(s,48,1.167,0),h4:b(s,34,1.235,.25),h5:b(s,24,1.334,0),h6:b(l,20,1.6,.15),subtitle1:b(s,16,1.75,.15),subtitle2:b(l,14,1.57,.1),body1:b(s,16,1.5,.15),body2:b(s,14,1.43,.15),button:b(l,14,1.75,.4,pi),caption:b(s,12,1.66,.4),overline:b(s,12,2.66,1,pi),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return Je(T({htmlFontSize:u,pxToRem:y,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:s,fontWeightMedium:l,fontWeightBold:c},h),d,{clone:!1})}const sd=.2,ld=.14,cd=.12;function he(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${sd})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${ld})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${cd})`].join(",")}const ud=["none",he(0,2,1,-1,0,1,1,0,0,1,3,0),he(0,3,1,-2,0,2,2,0,0,1,5,0),he(0,3,3,-2,0,3,4,0,0,1,8,0),he(0,2,4,-1,0,4,5,0,0,1,10,0),he(0,3,5,-1,0,5,8,0,0,1,14,0),he(0,3,5,-1,0,6,10,0,0,1,18,0),he(0,4,5,-2,0,7,10,1,0,2,16,1),he(0,5,5,-3,0,8,10,1,0,3,14,2),he(0,5,6,-3,0,9,12,1,0,3,16,2),he(0,6,6,-3,0,10,14,1,0,4,18,3),he(0,6,7,-4,0,11,15,1,0,4,20,3),he(0,7,8,-4,0,12,17,2,0,5,22,4),he(0,7,8,-4,0,13,19,2,0,5,24,4),he(0,7,9,-4,0,14,21,2,0,5,26,4),he(0,8,9,-5,0,15,22,2,0,6,28,5),he(0,8,10,-5,0,16,24,2,0,6,30,5),he(0,8,11,-5,0,17,26,2,0,6,32,5),he(0,9,11,-5,0,18,28,2,0,7,34,6),he(0,9,12,-6,0,19,29,2,0,7,36,6),he(0,10,13,-6,0,20,31,3,0,8,38,7),he(0,10,13,-6,0,21,33,3,0,8,40,7),he(0,10,14,-6,0,22,35,3,0,8,42,7),he(0,11,14,-7,0,23,36,3,0,9,44,8),he(0,11,15,-7,0,24,38,3,0,9,46,8)],pd=ud,dd=["duration","easing","delay"],fd={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},hd={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function fi(e){return`${Math.round(e)}ms`}function md(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function gd(e){const t=T({},fd,e.easing),n=T({},hd,e.duration);return T({getAutoHeightDuration:md,create:(o=["all"],i={})=>{const{duration:s=n.standard,easing:l=t.easeInOut,delay:c=0}=i,u=de(i,dd);if(process.env.NODE_ENV!=="production"){const p=d=>typeof d=="string",f=d=>!isNaN(parseFloat(d));!p(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!f(s)&&!p(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),p(l)||console.error('MUI: Argument "easing" must be a string.'),!f(c)&&!p(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(p=>`${p} ${typeof s=="string"?s:fi(s)} ${l} ${typeof c=="string"?c:fi(c)}`).join(",")}},e,{easing:t,duration:n})}const bd={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},vd=bd,yd=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function wd(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,s=de(e,yd);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":jt(18));const l=rd(r),c=no(e);let u=Je(c,{mixins:Fp(c.breakpoints,n),palette:l,shadows:pd.slice(),typography:ad(l,i),transitions:gd(o),zIndex:T({},vd)});if(u=Je(u,s),u=t.reduce((p,f)=>Je(p,f),u),process.env.NODE_ENV!=="production"){const p=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],f=(d,g)=>{let y;for(y in d){const b=d[y];if(p.indexOf(y)!==-1&&Object.keys(b).length>0){if(process.env.NODE_ENV!=="production"){const h=Ge("",y);console.error([`MUI: The \`${g}\` component increases the CSS specificity of the \`${y}\` internal state.`,"You can not override it like this: ",JSON.stringify(d,null,2),"",`Instead, you need to use the '&.${h}' syntax:`,JSON.stringify({root:{[`&.${h}`]:b}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}d[y]={}}}};Object.keys(u.components).forEach(d=>{const g=u.components[d].styleOverrides;g&&d.indexOf("Mui")===0&&f(g,d)})}return u.unstable_sxConfig=T({},eo,s==null?void 0:s.unstable_sxConfig),u.unstable_sx=function(f){return to({sx:f,theme:this})},u}const xd=wd(),oo=xd,io="$$material",Oa=e=>Mn(e)&&e!=="classes",Ed=jp({themeId:io,defaultTheme:oo,rootShouldForwardProp:Oa}),Te=Ed;function xn(){const e=Ta(oo);return process.env.NODE_ENV!=="production"&&k.useDebugValue(e),e[io]||e}function nt({props:e,name:t}){return _p({props:e,name:t,defaultTheme:oo,themeId:io})}function $r(e,t){return $r=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},$r(e,t)}function kd(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,$r(e,t)}const hi={disabled:!1};var Td=process.env.NODE_ENV!=="production"?a.oneOfType([a.number,a.shape({enter:a.number,exit:a.number,appear:a.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&a.oneOfType([a.string,a.shape({enter:a.string,exit:a.string,active:a.string}),a.shape({enter:a.string,enterDone:a.string,enterActive:a.string,exit:a.string,exitDone:a.string,exitActive:a.string})]);const Sa=_.createContext(null);var Od=function(t){return t.scrollTop},tn="unmounted",dt="exited",ft="entering",Mt="entered",jr="exiting",rt=function(e){kd(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var s=o,l=s&&!s.isMounting?r.enter:r.appear,c;return i.appearStatus=null,r.in?l?(c=dt,i.appearStatus=ft):c=Mt:r.unmountOnExit||r.mountOnEnter?c=tn:c=dt,i.state={status:c},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var s=o.in;return s&&i.status===tn?{status:dt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==ft&&s!==Mt&&(i=ft):(s===ft||s===Mt)&&(i=jr)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,s,l;return i=s=l=o,o!=null&&typeof o!="number"&&(i=o.exit,s=o.enter,l=o.appear!==void 0?o.appear:s),{exit:i,enter:s,appear:l}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===ft){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:Zt.findDOMNode(this);s&&Od(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===dt&&this.setState({status:tn})},n.performEnter=function(o){var i=this,s=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[Zt.findDOMNode(this),l],u=c[0],p=c[1],f=this.getTimeouts(),d=l?f.appear:f.enter;if(!o&&!s||hi.disabled){this.safeSetState({status:Mt},function(){i.props.onEntered(u)});return}this.props.onEnter(u,p),this.safeSetState({status:ft},function(){i.props.onEntering(u,p),i.onTransitionEnd(d,function(){i.safeSetState({status:Mt},function(){i.props.onEntered(u,p)})})})},n.performExit=function(){var o=this,i=this.props.exit,s=this.getTimeouts(),l=this.props.nodeRef?void 0:Zt.findDOMNode(this);if(!i||hi.disabled){this.safeSetState({status:dt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:jr},function(){o.props.onExiting(l),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:dt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,s=!0;return this.nextCallback=function(l){s&&(s=!1,i.nextCallback=null,o(l))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var s=this.props.nodeRef?this.props.nodeRef.current:Zt.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!s||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],u=c[0],p=c[1];this.props.addEndListener(u,p)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===tn)return null;var i=this.props,s=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var l=de(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return _.createElement(Sa.Provider,{value:null},typeof s=="function"?s(o,l):_.cloneElement(_.Children.only(s),l))},t}(_.Component);rt.contextType=Sa;rt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:a.shape({current:typeof Element>"u"?a.any:function(e,t,n,r,o,i){var s=e[t];return a.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:a.oneOfType([a.func.isRequired,a.element.isRequired]).isRequired,in:a.bool,mountOnEnter:a.bool,unmountOnExit:a.bool,appear:a.bool,enter:a.bool,exit:a.bool,timeout:function(t){var n=Td;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:a.func,onEnter:a.func,onEntering:a.func,onEntered:a.func,onExit:a.func,onExiting:a.func,onExited:a.func}:{};function Pt(){}rt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Pt,onEntering:Pt,onEntered:Pt,onExit:Pt,onExiting:Pt,onExited:Pt};rt.UNMOUNTED=tn;rt.EXITED=dt;rt.ENTERING=ft;rt.ENTERED=Mt;rt.EXITING=jr;const Ca=rt,Na=e=>e.scrollTop;function zn(e,t){var n,r;const{timeout:o,easing:i,style:s={}}=e;return{duration:(n=s.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:s.transitionDelay}}const Sd=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function Ir(e){return`scale(${e}, ${e**2})`}const Cd={entering:{opacity:1,transform:Ir(1)},entered:{opacity:1,transform:"none"}},vr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),ao=k.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:s,in:l,onEnter:c,onEntered:u,onEntering:p,onExit:f,onExited:d,onExiting:g,style:y,timeout:b="auto",TransitionComponent:h=Ca}=t,E=de(t,Sd),j=Qt(),w=k.useRef(),x=xn(),m=k.useRef(null),S=Le(m,i.ref,n),N=D=>$=>{if(D){const z=m.current;$===void 0?D(z):D(z,$)}},F=N(p),L=N((D,$)=>{Na(D);const{duration:z,delay:ee,easing:Q}=zn({style:y,timeout:b,easing:s},{mode:"enter"});let O;b==="auto"?(O=x.transitions.getAutoHeightDuration(D.clientHeight),w.current=O):O=z,D.style.transition=[x.transitions.create("opacity",{duration:O,delay:ee}),x.transitions.create("transform",{duration:vr?O:O*.666,delay:ee,easing:Q})].join(","),c&&c(D,$)}),V=N(u),C=N(g),M=N(D=>{const{duration:$,delay:z,easing:ee}=zn({style:y,timeout:b,easing:s},{mode:"exit"});let Q;b==="auto"?(Q=x.transitions.getAutoHeightDuration(D.clientHeight),w.current=Q):Q=$,D.style.transition=[x.transitions.create("opacity",{duration:Q,delay:z}),x.transitions.create("transform",{duration:vr?Q:Q*.666,delay:vr?z:z||Q*.333,easing:ee})].join(","),D.style.opacity=0,D.style.transform=Ir(.75),f&&f(D)}),R=N(d),B=D=>{b==="auto"&&j.start(w.current||0,D),r&&r(m.current,D)};return v.jsx(h,T({appear:o,in:l,nodeRef:m,onEnter:L,onEntered:V,onEntering:F,onExit:M,onExited:R,onExiting:C,addEndListener:B,timeout:b==="auto"?null:b},E,{children:(D,$)=>k.cloneElement(i,T({style:T({opacity:0,transform:Ir(.75),visibility:D==="exited"&&!l?"hidden":void 0},Cd[D],y,i.props.style),ref:S},$))}))});process.env.NODE_ENV!=="production"&&(ao.propTypes={addEndListener:a.func,appear:a.bool,children:mn.isRequired,easing:a.oneOfType([a.shape({enter:a.string,exit:a.string}),a.string]),in:a.bool,onEnter:a.func,onEntered:a.func,onEntering:a.func,onExit:a.func,onExited:a.func,onExiting:a.func,style:a.object,timeout:a.oneOfType([a.oneOf(["auto"]),a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})])});ao.muiSupportAuto=!0;const _r=ao,Nd=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},mi=Nd,Pd=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Rd=Te(ya,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Pa=k.forwardRef(function(t,n){var r;const o=ka(),i=nt({props:t,name:"MuiPopper"}),{anchorEl:s,component:l,components:c,componentsProps:u,container:p,disablePortal:f,keepMounted:d,modifiers:g,open:y,placement:b,popperOptions:h,popperRef:E,transition:j,slots:w,slotProps:x}=i,m=de(i,Pd),S=(r=w==null?void 0:w.root)!=null?r:c==null?void 0:c.Root,N=T({anchorEl:s,container:p,disablePortal:f,keepMounted:d,modifiers:g,open:y,placement:b,popperOptions:h,popperRef:E,transition:j},m);return v.jsx(Rd,T({as:l,direction:o==null?void 0:o.direction,slots:{root:S},slotProps:x??u},N,{ref:n}))});process.env.NODE_ENV!=="production"&&(Pa.propTypes={anchorEl:a.oneOfType([Ze,a.object,a.func]),children:a.oneOfType([a.node,a.func]),component:a.elementType,components:a.shape({Root:a.elementType}),componentsProps:a.shape({root:a.oneOfType([a.func,a.object])}),container:a.oneOfType([Ze,a.func]),disablePortal:a.bool,keepMounted:a.bool,modifiers:a.arrayOf(a.shape({data:a.object,effect:a.func,enabled:a.bool,fn:a.func,name:a.any,options:a.object,phase:a.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:a.arrayOf(a.string),requiresIfExists:a.arrayOf(a.string)})),open:a.bool.isRequired,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:a.shape({modifiers:a.array,onFirstUpdate:a.func,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:a.oneOf(["absolute","fixed"])}),popperRef:qr,slotProps:a.shape({root:a.oneOfType([a.func,a.object])}),slots:a.shape({root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),transition:a.bool});const Ra=Pa;function Md(e){return Ge("MuiTooltip",e)}const $d=at("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),it=$d,jd=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Id(e){return Math.round(e*1e5)/1e5}const _d=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,s={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${He(i.split("-")[0])}`],arrow:["arrow"]};return tt(s,Md,t)},Ad=Te(Ra,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>T({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${it.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${it.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${it.arrow}`]:T({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${it.arrow}`]:T({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Dd=Te("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${He(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>T({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:Vn(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Id(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${it.popper}[data-popper-placement*="left"] &`]:T({transformOrigin:"right center"},t.isRtl?T({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):T({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${it.popper}[data-popper-placement*="right"] &`]:T({transformOrigin:"left center"},t.isRtl?T({marginRight:"14px"},t.touch&&{marginRight:"24px"}):T({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${it.popper}[data-popper-placement*="top"] &`]:T({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${it.popper}[data-popper-placement*="bottom"] &`]:T({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Bd=Te("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:Vn(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Nn=!1;const gi=new gn;let Kt={x:0,y:0};function Pn(e,t){return n=>{t&&t(n),e(n)}}const Ma=k.forwardRef(function(t,n){var r,o,i,s,l,c,u,p,f,d,g,y,b,h,E,j,w,x,m;const S=nt({props:t,name:"MuiTooltip"}),{arrow:N=!1,children:F,components:L={},componentsProps:V={},describeChild:C=!1,disableFocusListener:M=!1,disableHoverListener:R=!1,disableInteractive:B=!1,disableTouchListener:D=!1,enterDelay:$=100,enterNextDelay:z=0,enterTouchDelay:ee=700,followCursor:Q=!1,id:O,leaveDelay:A=0,leaveTouchDelay:q=1500,onClose:Y,onOpen:U,open:H,placement:G="bottom",PopperComponent:X,PopperProps:W={},slotProps:K={},slots:J={},title:re,TransitionComponent:I=_r,TransitionProps:Z}=S,P=de(S,jd),oe=k.isValidElement(F)?F:v.jsx("span",{children:F}),we=xn(),Oe=we.direction==="rtl",[ve,ct]=k.useState(),[Se,Xe]=k.useState(null),Me=k.useRef(!1),Ye=B||Q,xe=Qt(),kt=Qt(),ut=Qt(),Vt=Qt(),[En,po]=Ki({controlled:H,default:!1,name:"Tooltip",state:"open"});let Ke=En;if(process.env.NODE_ENV!=="production"){const{current:te}=k.useRef(H!==void 0);k.useEffect(()=>{ve&&ve.disabled&&!te&&re!==""&&ve.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[re,ve,te])}const or=Yi(O),zt=k.useRef(),kn=ln(()=>{zt.current!==void 0&&(document.body.style.WebkitUserSelect=zt.current,zt.current=void 0),Vt.clear()});k.useEffect(()=>kn,[kn]);const fo=te=>{gi.clear(),Nn=!0,po(!0),U&&!Ke&&U(te)},Tn=ln(te=>{gi.start(800+A,()=>{Nn=!1}),po(!1),Y&&Ke&&Y(te),xe.start(we.transitions.duration.shortest,()=>{Me.current=!1})}),ir=te=>{Me.current&&te.type!=="touchstart"||(ve&&ve.removeAttribute("title"),kt.clear(),ut.clear(),$||Nn&&z?kt.start(Nn?z:$,()=>{fo(te)}):fo(te))},ho=te=>{kt.clear(),ut.start(A,()=>{Tn(te)})},{isFocusVisibleRef:mo,onBlur:ns,onFocus:rs,ref:os}=Ji(),[,go]=k.useState(!1),bo=te=>{ns(te),mo.current===!1&&(go(!1),ho(te))},vo=te=>{ve||ct(te.currentTarget),rs(te),mo.current===!0&&(go(!0),ir(te))},yo=te=>{Me.current=!0;const $e=oe.props;$e.onTouchStart&&$e.onTouchStart(te)},wo=ir,xo=ho,is=te=>{yo(te),ut.clear(),xe.clear(),kn(),zt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Vt.start(ee,()=>{document.body.style.WebkitUserSelect=zt.current,ir(te)})},as=te=>{oe.props.onTouchEnd&&oe.props.onTouchEnd(te),kn(),ut.start(q,()=>{Tn(te)})};k.useEffect(()=>{if(!Ke)return;function te($e){($e.key==="Escape"||$e.key==="Esc")&&Tn($e)}return document.addEventListener("keydown",te),()=>{document.removeEventListener("keydown",te)}},[Tn,Ke]);const ss=Le(oe.ref,os,ct,n);!re&&re!==0&&(Ke=!1);const ar=k.useRef(),ls=te=>{const $e=oe.props;$e.onMouseMove&&$e.onMouseMove(te),Kt={x:te.clientX,y:te.clientY},ar.current&&ar.current.update()},Ut={},sr=typeof re=="string";C?(Ut.title=!Ke&&sr&&!R?re:null,Ut["aria-describedby"]=Ke?or:null):(Ut["aria-label"]=sr?re:null,Ut["aria-labelledby"]=Ke&&!sr?or:null);const Ae=T({},Ut,P,oe.props,{className:Ee(P.className,oe.props.className),onTouchStart:yo,ref:ss},Q?{onMouseMove:ls}:{});process.env.NODE_ENV!=="production"&&(Ae["data-mui-internal-clone-element"]=!0,k.useEffect(()=>{ve&&!ve.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[ve]));const qt={};D||(Ae.onTouchStart=is,Ae.onTouchEnd=as),R||(Ae.onMouseOver=Pn(wo,Ae.onMouseOver),Ae.onMouseLeave=Pn(xo,Ae.onMouseLeave),Ye||(qt.onMouseOver=wo,qt.onMouseLeave=xo)),M||(Ae.onFocus=Pn(vo,Ae.onFocus),Ae.onBlur=Pn(bo,Ae.onBlur),Ye||(qt.onFocus=vo,qt.onBlur=bo)),process.env.NODE_ENV!=="production"&&oe.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${oe.props.title}\` or the Tooltip component.`].join(`
`));const cs=k.useMemo(()=>{var te;let $e=[{name:"arrow",enabled:!!Se,options:{element:Se,padding:4}}];return(te=W.popperOptions)!=null&&te.modifiers&&($e=$e.concat(W.popperOptions.modifiers)),T({},W.popperOptions,{modifiers:$e})},[Se,W]),Ht=T({},S,{isRtl:Oe,arrow:N,disableInteractive:Ye,placement:G,PopperComponentProp:X,touch:Me.current}),lr=_d(Ht),Eo=(r=(o=J.popper)!=null?o:L.Popper)!=null?r:Ad,ko=(i=(s=(l=J.transition)!=null?l:L.Transition)!=null?s:I)!=null?i:_r,To=(c=(u=J.tooltip)!=null?u:L.Tooltip)!=null?c:Dd,Oo=(p=(f=J.arrow)!=null?f:L.Arrow)!=null?p:Bd,us=en(Eo,T({},W,(d=K.popper)!=null?d:V.popper,{className:Ee(lr.popper,W==null?void 0:W.className,(g=(y=K.popper)!=null?y:V.popper)==null?void 0:g.className)}),Ht),ps=en(ko,T({},Z,(b=K.transition)!=null?b:V.transition),Ht),ds=en(To,T({},(h=K.tooltip)!=null?h:V.tooltip,{className:Ee(lr.tooltip,(E=(j=K.tooltip)!=null?j:V.tooltip)==null?void 0:E.className)}),Ht),fs=en(Oo,T({},(w=K.arrow)!=null?w:V.arrow,{className:Ee(lr.arrow,(x=(m=K.arrow)!=null?m:V.arrow)==null?void 0:x.className)}),Ht);return v.jsxs(k.Fragment,{children:[k.cloneElement(oe,Ae),v.jsx(Eo,T({as:X??Ra,placement:G,anchorEl:Q?{getBoundingClientRect:()=>({top:Kt.y,left:Kt.x,right:Kt.x,bottom:Kt.y,width:0,height:0})}:ve,popperRef:ar,open:ve?Ke:!1,id:or,transition:!0},qt,us,{popperOptions:cs,children:({TransitionProps:te})=>v.jsx(ko,T({timeout:we.transitions.duration.shorter},te,ps,{children:v.jsxs(To,T({},ds,{children:[re,N?v.jsx(Oo,T({},fs,{ref:Xe})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Ma.propTypes={arrow:a.bool,children:mn.isRequired,classes:a.object,className:a.string,components:a.shape({Arrow:a.elementType,Popper:a.elementType,Tooltip:a.elementType,Transition:a.elementType}),componentsProps:a.shape({arrow:a.object,popper:a.object,tooltip:a.object,transition:a.object}),describeChild:a.bool,disableFocusListener:a.bool,disableHoverListener:a.bool,disableInteractive:a.bool,disableTouchListener:a.bool,enterDelay:a.number,enterNextDelay:a.number,enterTouchDelay:a.number,followCursor:a.bool,id:a.string,leaveDelay:a.number,leaveTouchDelay:a.number,onClose:a.func,onOpen:a.func,open:a.bool,placement:a.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:a.elementType,PopperProps:a.object,slotProps:a.shape({arrow:a.object,popper:a.object,tooltip:a.object,transition:a.object}),slots:a.shape({arrow:a.elementType,popper:a.elementType,tooltip:a.elementType,transition:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),title:a.node,TransitionComponent:a.elementType,TransitionProps:a.object});const Ld=Ma;var so={},$a={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})($a);var Fd=$a.exports,yr={};function Vd(e){return Ge("MuiSvgIcon",e)}at("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const zd=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Ud=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${He(t)}`,`fontSize${He(n)}`]};return tt(o,Vd,r)},qd=Te("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${He(n.color)}`],t[`fontSize${He(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,s,l,c,u,p,f,d,g,y;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(s=i.pxToRem)==null?void 0:s.call(i,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((u=e.typography)==null||(p=u.pxToRem)==null?void 0:p.call(u,35))||"2.1875rem"}[t.fontSize],color:(f=(d=(e.vars||e).palette)==null||(d=d[t.color])==null?void 0:d.main)!=null?f:{action:(g=(e.vars||e).palette)==null||(g=g.action)==null?void 0:g.active,disabled:(y=(e.vars||e).palette)==null||(y=y.action)==null?void 0:y.disabled,inherit:void 0}[t.color]}}),lo=k.forwardRef(function(t,n){const r=nt({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:s="inherit",component:l="svg",fontSize:c="medium",htmlColor:u,inheritViewBox:p=!1,titleAccess:f,viewBox:d="0 0 24 24"}=r,g=de(r,zd),y=k.isValidElement(o)&&o.type==="svg",b=T({},r,{color:s,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:p,viewBox:d,hasSvgAsChild:y}),h={};p||(h.viewBox=d);const E=Ud(b);return v.jsxs(qd,T({as:l,className:Ee(E.root,i),focusable:"false",color:u,"aria-hidden":f?void 0:!0,role:f?"img":void 0,ref:n},h,g,y&&o.props,{ownerState:b,children:[y?o.props.children:o,f?v.jsx("title",{children:f}):null]}))});process.env.NODE_ENV!=="production"&&(lo.propTypes={children:a.node,classes:a.object,className:a.string,color:a.oneOfType([a.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),a.string]),component:a.elementType,fontSize:a.oneOfType([a.oneOf(["inherit","large","medium","small"]),a.string]),htmlColor:a.string,inheritViewBox:a.bool,shapeRendering:a.string,sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),titleAccess:a.string,viewBox:a.string});lo.muiName="SvgIcon";const bi=lo;function ja(e,t){function n(r,o){return v.jsx(bi,T({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=bi.muiName,k.memo(k.forwardRef(n))}const Hd={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),ra.configure(e)}},Wd=Object.freeze(Object.defineProperty({__proto__:null,capitalize:He,createChainedFunction:Cr,createSvgIcon:ja,debounce:Xi,deprecatedPropType:yl,isMuiElement:wl,ownerDocument:ke,ownerWindow:It,requirePropFactory:xl,setRef:An,unstable_ClassNameGenerator:Hd,unstable_useEnhancedEffect:yt,unstable_useId:Yi,unsupportedProp:Tl,useControlled:Ki,useEventCallback:ln,useForkRef:Le,useIsFocusVisible:Ji},Symbol.toStringTag,{value:"Module"})),Gd=Zs(Wd);var vi;function Xd(){return vi||(vi=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Gd}(yr)),yr}var Yd=Fd;Object.defineProperty(so,"__esModule",{value:!0});var Ia=so.default=void 0,Kd=Yd(Xd()),Jd=v;Ia=so.default=(0,Kd.default)((0,Jd.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function yi(e,t,n){return e?v.jsx(be.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:v.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function co(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:s=void 0,hasAutoFocus:l=!1,className:c,isDisabled:u=!1,isDense:p=!0,isSubMenuParent:f=!1,hasDisabledGutters:d=!1,hasDivider:g=!1,focusVisibleClassName:y,id:b,children:h}=e,E=v.jsx(be.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:u,dense:p,disableGutters:d,divider:g,focusVisibleClassName:y,onClick:t,id:b,children:n?v.jsxs(v.Fragment,{children:[yi(i,n,!0),v.jsx(be.ListItemText,{primary:n,inset:!i&&o}),f?v.jsx(be.ListItemIcon,{className:"papi-menu-icon-trailing",children:v.jsx(Ia,{})}):yi(s,n,!1)]}):h});return r?v.jsx(Ld,{title:r,placement:"right",children:v.jsx("div",{children:E})}):E}function _a(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Zd(e){const[t,n]=_.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,s=u=>{n(u.currentTarget)},l=()=>{n(void 0)},c=()=>{let u=_a(i).filter(p=>"menuItem"in p.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return u=u.filter(p=>"menuItem"in p.group&&p.group.menuItem===r.id),v.jsx(uo,{...e,includedGroups:u})};return v.jsxs(v.Fragment,{children:[v.jsx(co,{onClick:s,...o,isSubMenuParent:!0}),v.jsx(be.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Qd=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function uo(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:s}=_.useMemo(()=>{const p=o&&o.length>0?o:_a(t).filter(y=>!("menuItem"in y.group)),f=Object.values(p).sort((y,b)=>(y.group.order||0)-(b.group.order||0)),d=[];f.forEach(y=>{Qd(y.id,t.items).forEach(b=>d.push({item:b,isLastItemInGroup:!1})),d.length>0&&(d[d.length-1].isLastItemInGroup=!0)}),d.length>0&&(d[d.length-1].isLastItemInGroup=!1);const g=d.some(y=>"iconPathBefore"in y.item&&y.item.iconPathBefore);return{items:d,allowForLeadingIcons:g}},[o,t]),l=({item:p,isLastItemInGroup:f})=>({className:"papi-menu-item",label:p.label,tooltip:p.tooltip,iconPathBefore:"iconPathBefore"in p?p.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in p?p.iconPathAfter:void 0,hasDivider:f,allowForLeadingIcons:s}),[c]=i;if(!c)return v.jsx("div",{});const u=c.item.group;return v.jsx("div",{role:"menu","aria-label":u,children:i.map((p,f)=>{const{item:d}=p,g=l(p);if("command"in d){const y=d.group+f;return v.jsx(co,{onClick:b=>{n==null||n(b),r(d)},...g},y)}return v.jsx(Zd,{parentMenuItem:d,parentItemProps:g,...e},u+d.id)})},u)}function ef(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([s,l])=>({id:s,group:l})).filter(s=>"column"in s.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(s=>"column"in s.group&&s.group.column===n)),v.jsx(uo,{...e,includedGroups:i})}function tf({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return v.jsxs(be.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[v.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),v.jsx(be.List,{id:n,dense:!0,className:i??"",children:v.jsx(ef,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Aa({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=_.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,u=o[c];typeof u=="object"&&typeof u.order=="number"&&!Number.isNaN(u.order)?s.set(u.order,{id:c,metadata:u}):console.warn(`Property ${l} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return v.jsx(be.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((s,l)=>v.jsx(tf,{commandHandler:e,menuDefinition:n,...s,className:t},l))})}const Da=k.createContext({});process.env.NODE_ENV!=="production"&&(Da.displayName="ListContext");const nf=Da;function rf(e){return Ge("MuiList",e)}at("MuiList",["root","padding","dense","subheader"]);const of=["children","className","component","dense","disablePadding","subheader"],af=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return tt({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},rf,t)},sf=Te("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>T({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Ba=k.forwardRef(function(t,n){const r=nt({props:t,name:"MuiList"}),{children:o,className:i,component:s="ul",dense:l=!1,disablePadding:c=!1,subheader:u}=r,p=de(r,of),f=k.useMemo(()=>({dense:l}),[l]),d=T({},r,{component:s,dense:l,disablePadding:c}),g=af(d);return v.jsx(nf.Provider,{value:f,children:v.jsxs(sf,T({as:s,className:Ee(g.root,i),ref:n,ownerState:d},p,{children:[u,o]}))})});process.env.NODE_ENV!=="production"&&(Ba.propTypes={children:a.node,classes:a.object,className:a.string,component:a.elementType,dense:a.bool,disablePadding:a.bool,subheader:a.node,sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object])});const lf=Ba,cf=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function wr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function wi(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function La(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function Jt(e,t,n,r,o,i){let s=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(s)return!1;s=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!La(l,i)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const Fa=k.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:s,className:l,disabledItemsFocusable:c=!1,disableListWrap:u=!1,onKeyDown:p,variant:f="selectedMenu"}=t,d=de(t,cf),g=k.useRef(null),y=k.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});yt(()=>{o&&g.current.focus()},[o]),k.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(w,x)=>{const m=!g.current.style.width;if(w.clientHeight<g.current.clientHeight&&m){const S=`${Zi(ke(w))}px`;g.current.style[x.direction==="rtl"?"paddingLeft":"paddingRight"]=S,g.current.style.width=`calc(100% + ${S})`}return g.current}}),[]);const b=w=>{const x=g.current,m=w.key,S=ke(x).activeElement;if(m==="ArrowDown")w.preventDefault(),Jt(x,S,u,c,wr);else if(m==="ArrowUp")w.preventDefault(),Jt(x,S,u,c,wi);else if(m==="Home")w.preventDefault(),Jt(x,null,u,c,wr);else if(m==="End")w.preventDefault(),Jt(x,null,u,c,wi);else if(m.length===1){const N=y.current,F=m.toLowerCase(),L=performance.now();N.keys.length>0&&(L-N.lastTime>500?(N.keys=[],N.repeating=!0,N.previousKeyMatched=!0):N.repeating&&F!==N.keys[0]&&(N.repeating=!1)),N.lastTime=L,N.keys.push(F);const V=S&&!N.repeating&&La(S,N);N.previousKeyMatched&&(V||Jt(x,S,!1,c,wr,N))?w.preventDefault():N.previousKeyMatched=!1}p&&p(w)},h=Le(g,n);let E=-1;k.Children.forEach(s,(w,x)=>{if(!k.isValidElement(w)){E===x&&(E+=1,E>=s.length&&(E=-1));return}process.env.NODE_ENV!=="production"&&_n.isFragment(w)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),w.props.disabled||(f==="selectedMenu"&&w.props.selected||E===-1)&&(E=x),E===x&&(w.props.disabled||w.props.muiSkipListHighlight||w.type.muiSkipListHighlight)&&(E+=1,E>=s.length&&(E=-1))});const j=k.Children.map(s,(w,x)=>{if(x===E){const m={};return i&&(m.autoFocus=!0),w.props.tabIndex===void 0&&f==="selectedMenu"&&(m.tabIndex=0),k.cloneElement(w,m)}return w});return v.jsx(lf,T({role:"menu",ref:h,className:l,onKeyDown:b,tabIndex:o?0:-1},d,{children:j}))});process.env.NODE_ENV!=="production"&&(Fa.propTypes={autoFocus:a.bool,autoFocusItem:a.bool,children:a.node,className:a.string,disabledItemsFocusable:a.bool,disableListWrap:a.bool,onKeyDown:a.func,variant:a.oneOf(["menu","selectedMenu"])});const uf=Fa,pf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],df={entering:{opacity:1},entered:{opacity:1}},Va=k.forwardRef(function(t,n){const r=xn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:s=!0,children:l,easing:c,in:u,onEnter:p,onEntered:f,onEntering:d,onExit:g,onExited:y,onExiting:b,style:h,timeout:E=o,TransitionComponent:j=Ca}=t,w=de(t,pf),x=k.useRef(null),m=Le(x,l.ref,n),S=B=>D=>{if(B){const $=x.current;D===void 0?B($):B($,D)}},N=S(d),F=S((B,D)=>{Na(B);const $=zn({style:h,timeout:E,easing:c},{mode:"enter"});B.style.webkitTransition=r.transitions.create("opacity",$),B.style.transition=r.transitions.create("opacity",$),p&&p(B,D)}),L=S(f),V=S(b),C=S(B=>{const D=zn({style:h,timeout:E,easing:c},{mode:"exit"});B.style.webkitTransition=r.transitions.create("opacity",D),B.style.transition=r.transitions.create("opacity",D),g&&g(B)}),M=S(y),R=B=>{i&&i(x.current,B)};return v.jsx(j,T({appear:s,in:u,nodeRef:x,onEnter:F,onEntered:L,onEntering:N,onExit:C,onExited:M,onExiting:V,addEndListener:R,timeout:E},w,{children:(B,D)=>k.cloneElement(l,T({style:T({opacity:0,visibility:B==="exited"&&!u?"hidden":void 0},df[B],h,l.props.style),ref:m},D))}))});process.env.NODE_ENV!=="production"&&(Va.propTypes={addEndListener:a.func,appear:a.bool,children:mn.isRequired,easing:a.oneOfType([a.shape({enter:a.string,exit:a.string}),a.string]),in:a.bool,onEnter:a.func,onEntered:a.func,onEntering:a.func,onExit:a.func,onExited:a.func,onExiting:a.func,style:a.object,timeout:a.oneOfType([a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})])});const ff=Va;function hf(e){return Ge("MuiBackdrop",e)}at("MuiBackdrop",["root","invisible"]);const mf=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],gf=e=>{const{classes:t,invisible:n}=e;return tt({root:["root",n&&"invisible"]},hf,t)},bf=Te("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>T({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),za=k.forwardRef(function(t,n){var r,o,i;const s=nt({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:u="div",components:p={},componentsProps:f={},invisible:d=!1,open:g,slotProps:y={},slots:b={},TransitionComponent:h=ff,transitionDuration:E}=s,j=de(s,mf),w=T({},s,{component:u,invisible:d}),x=gf(w),m=(r=y.root)!=null?r:f.root;return v.jsx(h,T({in:g,timeout:E},j,{children:v.jsx(bf,T({"aria-hidden":!0},m,{as:(o=(i=b.root)!=null?i:p.Root)!=null?o:u,className:Ee(x.root,c,m==null?void 0:m.className),ownerState:T({},w,m==null?void 0:m.ownerState),classes:x,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(za.propTypes={children:a.node,classes:a.object,className:a.string,component:a.elementType,components:a.shape({Root:a.elementType}),componentsProps:a.shape({root:a.object}),invisible:a.bool,open:a.bool.isRequired,slotProps:a.shape({root:a.object}),slots:a.shape({root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),TransitionComponent:a.elementType,transitionDuration:a.oneOfType([a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})])});const vf=za;function yf(e){return Ge("MuiModal",e)}at("MuiModal",["root","hidden","backdrop"]);const wf=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],xf=e=>{const{open:t,exited:n,classes:r}=e;return tt({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},yf,r)},Ef=Te("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>T({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),kf=Te(vf,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Ua=k.forwardRef(function(t,n){var r,o,i,s,l,c;const u=nt({name:"MuiModal",props:t}),{BackdropComponent:p=kf,BackdropProps:f,className:d,closeAfterTransition:g=!1,children:y,container:b,component:h,components:E={},componentsProps:j={},disableAutoFocus:w=!1,disableEnforceFocus:x=!1,disableEscapeKeyDown:m=!1,disablePortal:S=!1,disableRestoreFocus:N=!1,disableScrollLock:F=!1,hideBackdrop:L=!1,keepMounted:V=!1,onBackdropClick:C,open:M,slotProps:R,slots:B}=u,D=de(u,wf),$=T({},u,{closeAfterTransition:g,disableAutoFocus:w,disableEnforceFocus:x,disableEscapeKeyDown:m,disablePortal:S,disableRestoreFocus:N,disableScrollLock:F,hideBackdrop:L,keepMounted:V}),{getRootProps:z,getBackdropProps:ee,getTransitionProps:Q,portalRef:O,isTopModal:A,exited:q,hasTransition:Y}=pc(T({},$,{rootRef:n})),U=T({},$,{exited:q}),H=xf(U),G={};if(y.props.tabIndex===void 0&&(G.tabIndex="-1"),Y){const{onEnter:Z,onExited:P}=Q();G.onEnter=Z,G.onExited=P}const X=(r=(o=B==null?void 0:B.root)!=null?o:E.Root)!=null?r:Ef,W=(i=(s=B==null?void 0:B.backdrop)!=null?s:E.Backdrop)!=null?i:p,K=(l=R==null?void 0:R.root)!=null?l:j.root,J=(c=R==null?void 0:R.backdrop)!=null?c:j.backdrop,re=wt({elementType:X,externalSlotProps:K,externalForwardedProps:D,getSlotProps:z,additionalProps:{ref:n,as:h},ownerState:U,className:Ee(d,K==null?void 0:K.className,H==null?void 0:H.root,!U.open&&U.exited&&(H==null?void 0:H.hidden))}),I=wt({elementType:W,externalSlotProps:J,additionalProps:f,getSlotProps:Z=>ee(T({},Z,{onClick:P=>{C&&C(P),Z!=null&&Z.onClick&&Z.onClick(P)}})),className:Ee(J==null?void 0:J.className,f==null?void 0:f.className,H==null?void 0:H.backdrop),ownerState:U});return!V&&!M&&(!Y||q)?null:v.jsx(cn,{ref:O,container:b,disablePortal:S,children:v.jsxs(X,T({},re,{children:[!L&&p?v.jsx(W,T({},I)):null,v.jsx(Dn,{disableEnforceFocus:x,disableAutoFocus:w,disableRestoreFocus:N,isEnabled:A,open:M,children:k.cloneElement(y,G)})]}))})});process.env.NODE_ENV!=="production"&&(Ua.propTypes={BackdropComponent:a.elementType,BackdropProps:a.object,children:mn.isRequired,classes:a.object,className:a.string,closeAfterTransition:a.bool,component:a.elementType,components:a.shape({Backdrop:a.elementType,Root:a.elementType}),componentsProps:a.shape({backdrop:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),container:a.oneOfType([Ze,a.func]),disableAutoFocus:a.bool,disableEnforceFocus:a.bool,disableEscapeKeyDown:a.bool,disablePortal:a.bool,disableRestoreFocus:a.bool,disableScrollLock:a.bool,hideBackdrop:a.bool,keepMounted:a.bool,onBackdropClick:a.func,onClose:a.func,onTransitionEnter:a.func,onTransitionExited:a.func,open:a.bool.isRequired,slotProps:a.shape({backdrop:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),slots:a.shape({backdrop:a.elementType,root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object])});const Tf=Ua;function Of(e){return Ge("MuiPaper",e)}at("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Sf=["className","component","elevation","square","variant"],Cf=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return tt(i,Of,o)},Nf=Te("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return T({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&T({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${Vn("#fff",mi(t.elevation))}, ${Vn("#fff",mi(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),qa=k.forwardRef(function(t,n){const r=nt({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:s=1,square:l=!1,variant:c="elevation"}=r,u=de(r,Sf),p=T({},r,{component:i,elevation:s,square:l,variant:c}),f=Cf(p);return process.env.NODE_ENV!=="production"&&xn().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),v.jsx(Nf,T({as:i,ownerState:p,className:Ee(f.root,o),ref:n},u))});process.env.NODE_ENV!=="production"&&(qa.propTypes={children:a.node,classes:a.object,className:a.string,component:a.elementType,elevation:Ft(ta,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:a.bool,sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),variant:a.oneOfType([a.oneOf(["elevation","outlined"]),a.string])});const Pf=qa;function Rf(e){return Ge("MuiPopover",e)}at("MuiPopover",["root","paper"]);const Mf=["onEntering"],$f=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],jf=["slotProps"];function xi(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function Ei(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function ki(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function jn(e){return typeof e=="function"?e():e}const If=e=>{const{classes:t}=e;return tt({root:["root"],paper:["paper"]},Rf,t)},_f=Te(Tf,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ha=Te(Pf,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Wa=k.forwardRef(function(t,n){var r,o,i;const s=nt({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:u={vertical:"top",horizontal:"left"},anchorPosition:p,anchorReference:f="anchorEl",children:d,className:g,container:y,elevation:b=8,marginThreshold:h=16,open:E,PaperProps:j={},slots:w,slotProps:x,transformOrigin:m={vertical:"top",horizontal:"left"},TransitionComponent:S=_r,transitionDuration:N="auto",TransitionProps:{onEntering:F}={},disableScrollLock:L=!1}=s,V=de(s.TransitionProps,Mf),C=de(s,$f),M=(r=x==null?void 0:x.paper)!=null?r:j,R=k.useRef(),B=Le(R,M.ref),D=T({},s,{anchorOrigin:u,anchorReference:f,elevation:b,marginThreshold:h,externalPaperSlotProps:M,transformOrigin:m,TransitionComponent:S,transitionDuration:N,TransitionProps:V}),$=If(D),z=k.useCallback(()=>{if(f==="anchorPosition")return process.env.NODE_ENV!=="production"&&(p||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),p;const Z=jn(c),P=Z&&Z.nodeType===1?Z:ke(R.current).body,oe=P.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const we=P.getBoundingClientRect();process.env.NODE_ENV!=="test"&&we.top===0&&we.left===0&&we.right===0&&we.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:oe.top+xi(oe,u.vertical),left:oe.left+Ei(oe,u.horizontal)}},[c,u.horizontal,u.vertical,p,f]),ee=k.useCallback(Z=>({vertical:xi(Z,m.vertical),horizontal:Ei(Z,m.horizontal)}),[m.horizontal,m.vertical]),Q=k.useCallback(Z=>{const P={width:Z.offsetWidth,height:Z.offsetHeight},oe=ee(P);if(f==="none")return{top:null,left:null,transformOrigin:ki(oe)};const we=z();let Oe=we.top-oe.vertical,ve=we.left-oe.horizontal;const ct=Oe+P.height,Se=ve+P.width,Xe=It(jn(c)),Me=Xe.innerHeight-h,Ye=Xe.innerWidth-h;if(h!==null&&Oe<h){const xe=Oe-h;Oe-=xe,oe.vertical+=xe}else if(h!==null&&ct>Me){const xe=ct-Me;Oe-=xe,oe.vertical+=xe}if(process.env.NODE_ENV!=="production"&&P.height>Me&&P.height&&Me&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${P.height-Me}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),h!==null&&ve<h){const xe=ve-h;ve-=xe,oe.horizontal+=xe}else if(Se>Ye){const xe=Se-Ye;ve-=xe,oe.horizontal+=xe}return{top:`${Math.round(Oe)}px`,left:`${Math.round(ve)}px`,transformOrigin:ki(oe)}},[c,f,z,ee,h]),[O,A]=k.useState(E),q=k.useCallback(()=>{const Z=R.current;if(!Z)return;const P=Q(Z);P.top!==null&&(Z.style.top=P.top),P.left!==null&&(Z.style.left=P.left),Z.style.transformOrigin=P.transformOrigin,A(!0)},[Q]);k.useEffect(()=>(L&&window.addEventListener("scroll",q),()=>window.removeEventListener("scroll",q)),[c,L,q]);const Y=(Z,P)=>{F&&F(Z,P),q()},U=()=>{A(!1)};k.useEffect(()=>{E&&q()}),k.useImperativeHandle(l,()=>E?{updatePosition:()=>{q()}}:null,[E,q]),k.useEffect(()=>{if(!E)return;const Z=Xi(()=>{q()}),P=It(c);return P.addEventListener("resize",Z),()=>{Z.clear(),P.removeEventListener("resize",Z)}},[c,E,q]);let H=N;N==="auto"&&!S.muiSupportAuto&&(H=void 0);const G=y||(c?ke(jn(c)).body:void 0),X=(o=w==null?void 0:w.root)!=null?o:_f,W=(i=w==null?void 0:w.paper)!=null?i:Ha,K=wt({elementType:W,externalSlotProps:T({},M,{style:O?M.style:T({},M.style,{opacity:0})}),additionalProps:{elevation:b,ref:B},ownerState:D,className:Ee($.paper,M==null?void 0:M.className)}),J=wt({elementType:X,externalSlotProps:(x==null?void 0:x.root)||{},externalForwardedProps:C,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:G,open:E},ownerState:D,className:Ee($.root,g)}),{slotProps:re}=J,I=de(J,jf);return v.jsx(X,T({},I,!ia(X)&&{slotProps:re,disableScrollLock:L},{children:v.jsx(S,T({appear:!0,in:E,onEntering:Y,onExited:U,timeout:H},V,{children:v.jsx(W,T({},K,{children:d}))}))}))});process.env.NODE_ENV!=="production"&&(Wa.propTypes={action:qr,anchorEl:Ft(a.oneOfType([Ze,a.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=jn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:a.shape({horizontal:a.oneOfType([a.oneOf(["center","left","right"]),a.number]).isRequired,vertical:a.oneOfType([a.oneOf(["bottom","center","top"]),a.number]).isRequired}),anchorPosition:a.shape({left:a.number.isRequired,top:a.number.isRequired}),anchorReference:a.oneOf(["anchorEl","anchorPosition","none"]),children:a.node,classes:a.object,className:a.string,container:a.oneOfType([Ze,a.func]),disableScrollLock:a.bool,elevation:ta,marginThreshold:a.number,onClose:a.func,open:a.bool.isRequired,PaperProps:a.shape({component:pl}),slotProps:a.shape({paper:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),slots:a.shape({paper:a.elementType,root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),transformOrigin:a.shape({horizontal:a.oneOfType([a.oneOf(["center","left","right"]),a.number]).isRequired,vertical:a.oneOfType([a.oneOf(["bottom","center","top"]),a.number]).isRequired}),TransitionComponent:a.elementType,transitionDuration:a.oneOfType([a.oneOf(["auto"]),a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})]),TransitionProps:a.object});const Af=Wa;function Df(e){return Ge("MuiMenu",e)}at("MuiMenu",["root","paper","list"]);const Bf=["onEntering"],Lf=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Ff={vertical:"top",horizontal:"right"},Vf={vertical:"top",horizontal:"left"},zf=e=>{const{classes:t}=e;return tt({root:["root"],paper:["paper"],list:["list"]},Df,t)},Uf=Te(Af,{shouldForwardProp:e=>Oa(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),qf=Te(Ha,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),Hf=Te(uf,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Ga=k.forwardRef(function(t,n){var r,o;const i=nt({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:l,className:c,disableAutoFocusItem:u=!1,MenuListProps:p={},onClose:f,open:d,PaperProps:g={},PopoverClasses:y,transitionDuration:b="auto",TransitionProps:{onEntering:h}={},variant:E="selectedMenu",slots:j={},slotProps:w={}}=i,x=de(i.TransitionProps,Bf),m=de(i,Lf),S=xn(),N=S.direction==="rtl",F=T({},i,{autoFocus:s,disableAutoFocusItem:u,MenuListProps:p,onEntering:h,PaperProps:g,transitionDuration:b,TransitionProps:x,variant:E}),L=zf(F),V=s&&!u&&d,C=k.useRef(null),M=(Q,O)=>{C.current&&C.current.adjustStyleForScrollbar(Q,S),h&&h(Q,O)},R=Q=>{Q.key==="Tab"&&(Q.preventDefault(),f&&f(Q,"tabKeyDown"))};let B=-1;k.Children.map(l,(Q,O)=>{k.isValidElement(Q)&&(process.env.NODE_ENV!=="production"&&_n.isFragment(Q)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Q.props.disabled||(E==="selectedMenu"&&Q.props.selected||B===-1)&&(B=O))});const D=(r=j.paper)!=null?r:qf,$=(o=w.paper)!=null?o:g,z=wt({elementType:j.root,externalSlotProps:w.root,ownerState:F,className:[L.root,c]}),ee=wt({elementType:D,externalSlotProps:$,ownerState:F,className:L.paper});return v.jsx(Uf,T({onClose:f,anchorOrigin:{vertical:"bottom",horizontal:N?"right":"left"},transformOrigin:N?Ff:Vf,slots:{paper:D,root:j.root},slotProps:{root:z,paper:ee},open:d,ref:n,transitionDuration:b,TransitionProps:T({onEntering:M},x),ownerState:F},m,{classes:y,children:v.jsx(Hf,T({onKeyDown:R,actions:C,autoFocus:s&&(B===-1||u),autoFocusItem:V,variant:E},p,{className:Ee(L.list,p.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(Ga.propTypes={anchorEl:a.oneOfType([Ze,a.func]),autoFocus:a.bool,children:a.node,classes:a.object,className:a.string,disableAutoFocusItem:a.bool,MenuListProps:a.object,onClose:a.func,open:a.bool.isRequired,PaperProps:a.object,PopoverClasses:a.object,slotProps:a.shape({paper:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),slots:a.shape({paper:a.elementType,root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),transitionDuration:a.oneOfType([a.oneOf(["auto"]),a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})]),TransitionProps:a.object,variant:a.oneOf(["menu","selectedMenu"])});const Wf=Ga;function Gf({className:e,commandHandler:t,menuDefinition:n,children:r}){var u;const[o,i]=_.useState(void 0),s=_.useCallback(p=>{p.preventDefault(),i(o===void 0?{mouseX:p.clientX+2,mouseY:p.clientY-6}:void 0)},[o]),l=_.useCallback(()=>{i(void 0)},[]),c=_.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((u=n==null?void 0:n.items)==null?void 0:u.length)??0)===0||!r?r:v.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[r,v.jsx(Wf,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:v.jsx(uo,{menuDefinition:n,commandHandler:t,onClick:l})})]})}const Xf=ja(v.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Yf(e){return{preserveValue:!0,...e}}const Un=(e,t,n={})=>{const r=_.useRef(t);r.current=t;const o=_.useRef(n);o.current=Yf(o.current);const[i,s]=_.useState(()=>r.current),[l,c]=_.useState(!0);return _.useEffect(()=>{let u=!0;return c(!!e),(async()=>{if(e){const p=await e();u&&(s(()=>p),c(!1))}})(),()=>{u=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[i,l]};function Xa({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:i,ariaLabelPrefix:s,children:l}){const[c,u]=_.useState(!1),[p,f]=_.useState(!1),d=_.useCallback(()=>{c&&u(!1),f(!1)},[c]),g=_.useCallback(x=>{x.stopPropagation(),u(m=>{const S=!m;return S&&x.shiftKey?f(!0):S||f(!1),S})},[]),y=_.useCallback(x=>(d(),r(x)),[r,d]),[b,h]=_.useState({top:1,left:1});_.useEffect(()=>{if(c){const x=o==null?void 0:o.current;if(x){const m=x.getBoundingClientRect(),S=window.scrollY,N=window.scrollX,F=m.top+S+x.clientHeight,L=m.left+N;h({top:F,left:L})}}},[c,o]);const[E]=Un(_.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[j]=Un(_.useCallback(async()=>(e==null?void 0:e(!0))??n??E,[e,n,E,c]),n??E),w=p&&j?j:E;return v.jsxs(v.Fragment,{children:[v.jsx(be.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${i??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:g,children:l??v.jsx(Xf,{})}),v.jsx(be.Drawer,{className:`papi-menu-drawer ${i??""}`,anchor:"left",variant:"temporary",open:c,onClose:d,PaperProps:{className:"papi-menu-drawer-paper",style:{top:b.top,left:b.left}},children:w?v.jsx(Aa,{className:i,id:`${s??""} main menu`,commandHandler:y,multiColumnMenu:w}):void 0})]})}function Kf({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:s="medium",className:l,onClick:c,children:u}){return v.jsx(be.IconButton,{id:e,disabled:n,edge:i,size:s,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:u})}const Jf=Oi.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),Ya=_.forwardRef(({className:e,...t},n)=>v.jsx(Si.Root,{ref:n,className:pe(Jf(),e),...t}));Ya.displayName=Si.Root.displayName;function fn({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:i,placeholder:s,isRequired:l=!1,className:c,defaultValue:u,value:p,onChange:f,onFocus:d,onBlur:g}){return v.jsxs("div",{className:pe("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":r}),children:[v.jsx(Ya,{htmlFor:e,className:pe({"pr-text-red-600":n,"pr-hidden":!i}),children:`${i}${l?"*":""}`}),v.jsx(Hn,{id:e,disabled:t,placeholder:s,required:l,className:pe(c,{"pr-border-red-600":n}),defaultValue:u,value:p,onChange:f,onFocus:d,onBlur:g}),v.jsx("p",{className:pe({"pr-hidden":!o}),children:o})]})}let xr;const Er=()=>(xr||(xr=ue.allBookIds.map(e=>({bookId:e,label:ue.bookIdToEnglishName(e)}))),xr);function Zf({scrRef:e,handleSubmit:t,id:n}){const r=c=>{t(c)},o=(c,u)=>{const f={bookNum:ue.bookIdToNumber(u.bookId),chapterNum:1,verseNum:1};r(f)},i=c=>{t({...e,chapterNum:+c.target.value})},s=c=>{t({...e,verseNum:+c.target.value})},l=_.useMemo(()=>Er()[e.bookNum-1],[e.bookNum]);return v.jsxs("span",{id:n,className:"pr-flex pr-place-items-center",children:[v.jsx(In,{title:"Book",className:"papi-ref-selector book",value:l,options:Er(),onChange:o,isClearable:!1,width:200}),v.jsx(pt,{onClick:()=>r(Ue.offsetBook(e,-1)),isDisabled:e.bookNum<=Ue.FIRST_SCR_BOOK_NUM,children:"<"}),v.jsx(pt,{onClick:()=>r(Ue.offsetBook(e,1)),isDisabled:e.bookNum>=Er().length,children:">"}),v.jsx(fn,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),v.jsx(pt,{onClick:()=>t(Ue.offsetChapter(e,-1)),isDisabled:e.chapterNum<=Ue.FIRST_SCR_CHAPTER_NUM,children:"<"}),v.jsx(pt,{onClick:()=>t(Ue.offsetChapter(e,1)),isDisabled:e.chapterNum>=Ue.getChaptersForBook(e.bookNum),children:">"}),v.jsx(fn,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:s}),v.jsx(pt,{onClick:()=>t(Ue.offsetVerse(e,-1)),isDisabled:e.verseNum<=Ue.FIRST_SCR_VERSE_NUM,children:"<"}),v.jsx(pt,{onClick:()=>t(Ue.offsetVerse(e,1)),children:">"})]})}function Qf({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=_.useState(""),i=s=>{o(s),e(s)};return v.jsx(fn,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:s=>i(s.target.value)})}function eh({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:s=!1,defaultValue:l,value:c,valueLabelDisplay:u="off",className:p,onChange:f,onChangeCommitted:d}){return v.jsx(be.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:s,defaultValue:l,value:c,valueLabelDisplay:u,className:`papi-slider ${n} ${p??""}`,onChange:f,onChangeCommitted:d})}function th({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:s,children:l}){const c={action:(s==null?void 0:s.action)||l,message:s==null?void 0:s.message,className:r};return v.jsx(be.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:c})}function nh({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return v.jsx(be.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function Ti({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return v.jsx(fn,{defaultValue:t[n.key],onChange:r})}const rh=({onChange:e,disabled:t,checked:n,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return v.jsx(zr,{...r,isChecked:n,isDisabled:t,onChange:o})};function oh({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:s,defaultColumnSortable:l=!0,defaultColumnResizable:c=!0,rows:u,enableSelectColumn:p,selectColumnWidth:f=50,rowKeyGetter:d,rowHeight:g=35,headerRowHeight:y=35,selectedRows:b,onSelectedRowsChange:h,onRowsChange:E,onCellClick:j,onCellDoubleClick:w,onCellContextMenu:x,onCellKeyDown:m,direction:S="ltr",enableVirtualization:N=!0,onCopy:F,onPaste:L,onScroll:V,className:C,"data-testid":M}){const R=_.useMemo(()=>{const B=e.map(D=>typeof D.editable=="function"?{...D,editable:z=>!!D.editable(z),renderEditCell:D.renderEditCell||Ti}:D.editable&&!D.renderEditCell?{...D,renderEditCell:Ti}:D.renderEditCell&&!D.editable?{...D,editable:!1}:D);return p?[{...So.SelectColumn,minWidth:f},...B]:B},[e,p,f]);return v.jsx(So,{columns:R,defaultColumnOptions:{width:o,minWidth:i,maxWidth:s,sortable:l,resizable:c},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:u,rowKeyGetter:d,rowHeight:g,headerRowHeight:y,selectedRows:b,onSelectedRowsChange:h,onRowsChange:E,onCellClick:j,onCellDoubleClick:w,onCellContextMenu:x,onCellKeyDown:m,direction:S,enableVirtualization:N,onCopy:F,onPaste:L,onScroll:V,renderers:{renderCheckbox:rh},className:`papi-table ${C??"rdg-light"}`,"data-testid":M})}function ih({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const i=_.useRef(void 0);return v.jsx("div",{ref:i,style:{position:"relative"},children:v.jsx(be.AppBar,{position:"static",id:r,children:v.jsxs(be.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?v.jsx(Xa,{commandHandler:t,containerRef:i,menuProvider:e}):void 0,o?v.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const ah=(e,t)=>{_.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},kr=()=>!1,sh=(e,t)=>{const[n]=Un(_.useCallback(async()=>{if(!e)return kr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),kr,{preserveValue:!1});_.useEffect(()=>()=>{n!==kr&&n()},[n])},lh=Re.Root,Ka=_.forwardRef(({className:e,...t},n)=>v.jsx(Re.List,{ref:n,className:pe("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Ka.displayName=Re.List.displayName;const Ja=_.forwardRef(({className:e,...t},n)=>v.jsx(Re.Trigger,{ref:n,className:pe("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));Ja.displayName=Re.Trigger.displayName;const Za=_.forwardRef(({className:e,...t},n)=>v.jsx(Re.Content,{ref:n,className:pe("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));Za.displayName=Re.Content.displayName;const Qa=_.forwardRef(({className:e,...t},n)=>v.jsx(Re.Root,{orientation:"vertical",ref:n,className:pe("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));Qa.displayName=Re.List.displayName;const es=_.forwardRef(({className:e,...t},n)=>v.jsx(Re.List,{ref:n,className:pe("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));es.displayName=Re.List.displayName;const ch=_.forwardRef(({className:e,...t},n)=>v.jsx(Re.Trigger,{ref:n,...t,className:pe("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),children:v.jsx("div",{className:"pr-flex pr-flex-col pr-justify-center",children:v.jsx("div",{children:t.value})})})),ts=_.forwardRef(({className:e,...t},n)=>v.jsx(Re.Content,{ref:n,className:pe("mt-2 pr-ml-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));ts.displayName=Re.Content.displayName;exports.BookChapterControl=Gs;exports.Button=pt;exports.ChapterRangeSelector=Ys;exports.Checkbox=zr;exports.Checklist=Ks;exports.ComboBox=In;exports.ContextMenu=Gf;exports.DropdownMenu=ji;exports.DropdownMenuCheckboxItem=Di;exports.DropdownMenuContent=Lr;exports.DropdownMenuGroup=$s;exports.DropdownMenuItem=Fr;exports.DropdownMenuLabel=qn;exports.DropdownMenuPortal=js;exports.DropdownMenuRadioGroup=_s;exports.DropdownMenuRadioItem=Bi;exports.DropdownMenuSeparator=Vr;exports.DropdownMenuShortcut=Li;exports.DropdownMenuSub=Is;exports.DropdownMenuSubContent=Ai;exports.DropdownMenuSubTrigger=_i;exports.DropdownMenuTrigger=Ii;exports.GridMenu=Aa;exports.HamburgerMenuButton=Xa;exports.IconButton=Kf;exports.Input=Hn;exports.LabelPosition=ht;exports.MenuItem=co;exports.RefSelector=Zf;exports.SearchBar=Qf;exports.Slider=eh;exports.Snackbar=th;exports.Switch=nh;exports.Table=oh;exports.Tabs=lh;exports.TabsContent=Za;exports.TabsList=Ka;exports.TabsTrigger=Ja;exports.TextField=fn;exports.Toolbar=ih;exports.VerticalTabs=Qa;exports.VerticalTabsContent=ts;exports.VerticalTabsList=es;exports.VerticalTabsTrigger=ch;exports.useEvent=ah;exports.useEventAsync=sh;exports.usePromise=Un;function uh(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}uh(`.papi-checkbox {
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
}
/*
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
.pr--mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
.pr-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.pr-my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.pr-ml-5 {
  margin-left: 1.25rem;
}
.pr-ml-auto {
  margin-left: auto;
}
.pr-mt-2 {
  margin-top: 0.5rem;
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
.pr-h-8 {
  height: 2rem;
}
.pr-h-9 {
  height: 2.25rem;
}
.pr-h-\\[1\\.2rem\\] {
  height: 1.2rem;
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
.pr-w-\\[1\\.2rem\\] {
  width: 1.2rem;
}
.pr-w-\\[116px\\] {
  width: 116px;
}
.pr-w-\\[124px\\] {
  width: 124px;
}
.pr-w-full {
  width: 100%;
}
.pr-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.pr-flex-grow {
  flex-grow: 1;
}
.pr-grow {
  flex-grow: 1;
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
.pr-cursor-default {
  cursor: default;
}
.pr-cursor-pointer {
  cursor: pointer;
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
.pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
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
.pr-break-words {
  overflow-wrap: break-word;
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
.pr-border-0 {
  border-width: 0px;
}
.pr-border-2 {
  border-width: 2px;
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
.pr-border-muted {
  border-color: hsl(var(--muted));
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
.pr-pt-4 {
  padding-top: 1rem;
}
.pr-align-middle {
  vertical-align: middle;
}
.pr-font-sans {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
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
.hover\\:pr-text-foreground:hover {
  color: hsl(var(--foreground));
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
.data-\\[state\\=active\\]\\:pr-bg-background[data-state=active] {
  background-color: hsl(var(--background));
}
.data-\\[state\\=open\\]\\:pr-bg-accent[data-state=open] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=active\\]\\:pr-text-foreground[data-state=active] {
  color: hsl(var(--foreground));
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
