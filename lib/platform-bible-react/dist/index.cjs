"use strict";var aa=Object.defineProperty;var la=(e,t,n)=>t in e?aa(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var kt=(e,t,n)=>(la(e,typeof t!="symbol"?t+"":t,n),n);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const b=require("react/jsx-runtime"),j=require("react"),Ee=require("platform-bible-utils"),ca=require("@radix-ui/react-dropdown-menu"),gt=require("lucide-react"),Te=require("clsx"),ua=require("tailwind-merge"),Oi=require("class-variance-authority"),fe=require("@mui/material"),Or=require("@mui/styled-engine"),en=require("react-dom"),da=require("@radix-ui/react-label"),rt=require("@tanstack/react-table"),So=require("react-data-grid");function Gn(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const k=Gn(j),be=Gn(ca),pa=Gn(en),Si=Gn(da);var fa=Object.defineProperty,ha=(e,t,n)=>t in e?fa(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ne=(e,t,n)=>(ha(e,typeof t!="symbol"?t+"":t,n),n);const vt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Br=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Ci=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Co=ka();function Vt(e,t=!0){return t&&(e=e.toUpperCase()),e in Co?Co[e]:0}function Lr(e){return Vt(e)>0}function ma(e){const t=typeof e=="string"?Vt(e):e;return t>=40&&t<=66}function ga(e){return(typeof e=="string"?Vt(e):e)<=39}function Ni(e){return e<=66}function ba(e){const t=typeof e=="string"?Vt(e):e;return $i(t)&&!Ni(t)}function*va(){for(let e=1;e<=vt.length;e++)yield e}const ya=1,Pi=vt.length;function xa(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Fr(e,t="***"){const n=e-1;return n<0||n>=vt.length?t:vt[n]}function Ri(e){return e<=0||e>Pi?"******":Ci[e-1]}function wa(e){return Ri(Vt(e))}function $i(e){const t=typeof e=="number"?Fr(e):e;return Lr(t)&&!Br.includes(t)}function Ea(e){const t=typeof e=="number"?Fr(e):e;return Lr(t)&&Br.includes(t)}function Ta(e){return Ci[e-1].includes("*obsolete*")}function ka(){const e={};for(let t=0;t<vt.length;t++)e[vt[t]]=t+1;return e}const se={allBookIds:vt,nonCanonicalIds:Br,bookIdToNumber:Vt,isBookIdValid:Lr,isBookNT:ma,isBookOT:ga,isBookOTNT:Ni,isBookDC:ba,allBookNumbers:va,firstBook:ya,lastBook:Pi,extraBooks:xa,bookNumberToId:Fr,bookNumberToEnglishName:Ri,bookIdToEnglishName:wa,isCanonical:$i,isExtraMaterial:Ea,isObsolete:Ta};var ot=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(ot||{});const Ie=class{constructor(t){if(ne(this,"name"),ne(this,"fullPath"),ne(this,"isPresent"),ne(this,"hasVerseSegments"),ne(this,"isCustomized"),ne(this,"baseVersification"),ne(this,"scriptureBooks"),ne(this,"_type"),t!=null)typeof t=="string"?this.name=t:this._type=t;else throw new Error("Argument null")}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ne(Ie,"Original",new Ie(ot.Original)),ne(Ie,"Septuagint",new Ie(ot.Septuagint)),ne(Ie,"Vulgate",new Ie(ot.Vulgate)),ne(Ie,"English",new Ie(ot.English)),ne(Ie,"RussianProtestant",new Ie(ot.RussianProtestant)),ne(Ie,"RussianOrthodox",new Ie(ot.RussianOrthodox));let $t=Ie;function No(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var Mi=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Mi||{});const Ne=class ie{constructor(t,n,r,o){if(ne(this,"firstChapter"),ne(this,"lastChapter"),ne(this,"lastVerse"),ne(this,"hasSegmentsDefined"),ne(this,"text"),ne(this,"BBBCCCVVVS"),ne(this,"longHashCode"),ne(this,"versification"),ne(this,"rtlMark","‏"),ne(this,"_bookNum",0),ne(this,"_chapterNum",0),ne(this,"_verseNum",0),ne(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,a=n!=null&&n instanceof $t?n:void 0;this.setEmpty(a),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof $t?n:void 0;this.setEmpty(i),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ie){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof $t?t:ie.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(t,n=ie.defaultVersification){const r=new ie(n);return r.parse(t),r}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=ie.parse(t),{success:!0,verseRef:n}}catch(r){if(r instanceof Kt)return n=new ie,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ie.bcvMaxValue*ie.bookDigitShifter+(n>=0?n%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(r>=0?r%ie.bcvMaxValue:0)}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>ie.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return se.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=se.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ie.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>se.lastBook)throw new Kt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new $t(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const a=+i[1].trim();this.versification=new $t(ot[a])}catch{throw new Kt("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new Kt("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||se.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(r[1]))throw new Kt("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification):!1}allVerses(t=!1,n=ie.verseRangeSeparators,r=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=No(this._verse,r);for(const a of i.map(l=>No(l,n))){const l=this.clone();l.verse=a[0];const c=l.verseNum;if(o.push(l),a.length>1){const u=this.clone();if(u.verse=a[1],!t)for(let d=c+1;d<u.verseNum;d++){const f=new ie(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(f)}o.push(u)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const a=o.BBBCCCVVV;if(r>a)return 3;if(r===a)return 4;r=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>se.lastBook?2:(se.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=se.bookIdToNumber(t),this.chapter=n,this.verse=r}};ne(Ne,"defaultVersification",$t.English),ne(Ne,"verseRangeSeparator","-"),ne(Ne,"verseSequenceIndicator",","),ne(Ne,"verseRangeSeparators",[Ne.verseRangeSeparator]),ne(Ne,"verseSequenceIndicators",[Ne.verseSequenceIndicator]),ne(Ne,"chapterDigitShifter",1e3),ne(Ne,"bookDigitShifter",Ne.chapterDigitShifter*Ne.chapterDigitShifter),ne(Ne,"bcvMaxValue",Ne.chapterDigitShifter-1),ne(Ne,"ValidStatusType",Mi);class Kt extends Error{}function xe(...e){return ua.twMerge(Te.clsx(e))}const Oa=be.Root,Sa=be.Trigger,Ca=k.forwardRef(({className:e,inset:t,children:n,...r},o)=>b.jsxs(be.SubTrigger,{ref:o,className:xe("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,b.jsx(gt.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Ca.displayName=be.SubTrigger.displayName;const Na=k.forwardRef(({className:e,...t},n)=>b.jsx(be.SubContent,{ref:n,className:xe("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));Na.displayName=be.SubContent.displayName;const Ii=k.forwardRef(({className:e,sideOffset:t=4,...n},r)=>b.jsx(be.Portal,{children:b.jsx(be.Content,{ref:r,sideOffset:t,className:xe("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));Ii.displayName=be.Content.displayName;const ji=k.forwardRef(({className:e,inset:t,...n},r)=>b.jsx(be.Item,{ref:r,className:xe("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));ji.displayName=be.Item.displayName;const Pa=k.forwardRef(({className:e,children:t,checked:n,...r},o)=>b.jsxs(be.CheckboxItem,{ref:o,className:xe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[b.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:b.jsx(be.ItemIndicator,{children:b.jsx(gt.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));Pa.displayName=be.CheckboxItem.displayName;const Ra=k.forwardRef(({className:e,children:t,...n},r)=>b.jsxs(be.RadioItem,{ref:r,className:xe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[b.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:b.jsx(be.ItemIndicator,{children:b.jsx(gt.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));Ra.displayName=be.RadioItem.displayName;const Vr=k.forwardRef(({className:e,inset:t,...n},r)=>b.jsx(be.Label,{ref:r,className:xe("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));Vr.displayName=be.Label.displayName;const _i=k.forwardRef(({className:e,...t},n)=>b.jsx(be.Separator,{ref:n,className:xe("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));_i.displayName=be.Separator.displayName;const zr=k.forwardRef(({className:e,type:t,...n},r)=>b.jsx("input",{type:t,className:xe("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));zr.displayName="Input";const $a=j.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},i)=>b.jsxs("div",{className:"pr-relative",children:[b.jsx(zr,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:a=>e(a.target.value),onKeyDown:a=>{a.key==="Enter"&&r(),t(a)},onClick:n,ref:i}),b.jsx(gt.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function Ma({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const i=Array.from({length:t},(l,c)=>c+1),a=j.useCallback(l=>{o(l)},[o]);return b.jsx("div",{className:xe("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:i.map(l=>b.jsx("div",{className:xe("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===n,"pr-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>a(l),children:l},l))})}const Ia=j.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:i,children:a},l)=>b.jsxs(ji,{ref:l,textValue:e,className:xe("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[b.jsx("span",{className:xe("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":i.toLowerCase()==="ot","pr-border-l-purple-200":i.toLowerCase()==="nt","pr-border-l-indigo-200":i.toLowerCase()==="dc"}),children:se.bookIdToEnglishName(e)}),n&&b.jsx("div",{children:a})]},e));function ja({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return b.jsxs(Vr,{className:"pr-flex pr-justify-between",children:[b.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),b.jsxs("div",{className:"pr-flex pr-items-center",children:[b.jsx(gt.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),b.jsx(gt.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),b.jsx(gt.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const sn=se.allBookIds,_a={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},Po=["OT","NT","DC"],Aa=32+32+32,Da=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Ba=e=>({OT:sn.filter(n=>se.isBookOT(n)),NT:sn.filter(n=>se.isBookNT(n)),DC:sn.filter(n=>se.isBookDC(n))})[e],Xt=e=>Ee.getChaptersForBook(se.bookIdToNumber(e));function La(){return sn.map(t=>se.bookIdToEnglishName(t))}function Fa(e){return La().includes(e)}function Va(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(Fa(t))return sn.find(r=>se.bookIdToEnglishName(r)===t)}function za({scrRef:e,handleSubmit:t}){const[n,r]=j.useState(""),[o,i]=j.useState(se.bookNumberToId(e.bookNum)),[a,l]=j.useState(e.chapterNum??0),[c,u]=j.useState(se.bookNumberToId(e.bookNum)),[d,f]=j.useState(!1),[p,v]=j.useState(d),y=j.useRef(void 0),g=j.useRef(void 0),m=j.useRef(void 0),E=j.useCallback(P=>Ba(P).filter(T=>{const O=se.bookIdToEnglishName(T).toLowerCase(),$=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return O.includes($)||T.toLowerCase().includes($)}),[n]),_=P=>{r(P)},x=j.useRef(!1),w=j.useCallback(P=>{if(x.current){x.current=!1;return}f(P)},[]),h=j.useCallback((P,T,O,$)=>{if(l(se.bookNumberToId(e.bookNum)!==P?1:e.chapterNum),T||Xt(P)===-1){t({bookNum:se.bookIdToNumber(P),chapterNum:O||1,verseNum:$||1}),f(!1),r("");return}i(o!==P?P:""),f(!T)},[t,e.bookNum,e.chapterNum,o]),N=P=>{P<=0||P>Xt(o)||h(o,!0,P)},R=j.useCallback(()=>{Da.forEach(P=>{const T=n.match(P);if(T){const[O,$=void 0,A=void 0]=T.slice(1),I=Va(O);(se.isBookIdValid(O)||I)&&h(I??O,!0,$?parseInt($,10):1,A?parseInt(A,10):1)}})},[h,n]),F=j.useCallback(P=>{d?(P.key==="ArrowDown"||P.key==="ArrowUp")&&(typeof m<"u"&&m.current!==null?m.current.focus():typeof g<"u"&&g.current!==null&&g.current.focus(),P.preventDefault()):f(!0)},[d]),L=P=>{const{key:T}=P;T==="ArrowRight"||T==="ArrowLeft"||T==="ArrowDown"||T==="ArrowUp"||T==="Enter"||(y.current.dispatchEvent(new KeyboardEvent("keydown",{key:T})),y.current.focus())},V=P=>{const{key:T}=P;if(c===o){if(T==="Enter"){P.preventDefault(),h(o,!0,a);return}let O=0;if(T==="ArrowRight")if(a<Xt(c))O=1;else{P.preventDefault();return}else if(T==="ArrowLeft")if(a>1)O=-1;else{P.preventDefault();return}else T==="ArrowDown"?O=6:T==="ArrowUp"&&(O=-6);a+O<=0||a+O>Xt(c)?l(0):O!==0&&(l(a+O),P.preventDefault())}};return j.useEffect(()=>{o===c?o===se.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),j.useLayoutEffect(()=>{v(d)},[d]),j.useLayoutEffect(()=>{const P=setTimeout(()=>{if(p&&g.current&&m.current){const O=m.current.offsetTop-Aa;g.current.scrollTo({top:O,behavior:"instant"})}},10);return()=>{clearTimeout(P)}},[p]),b.jsx("div",{children:b.jsxs(Oa,{modal:!1,open:d,onOpenChange:w,children:[b.jsx(Sa,{asChild:!0,children:b.jsx($a,{ref:y,value:n,handleSearch:_,handleKeyDown:F,handleOnClick:()=>{i(se.bookNumberToId(e.bookNum)),u(se.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),f(!0),y.current.focus()},onFocus:()=>{x.current=!0},handleSubmit:R,placeholder:`${se.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),b.jsxs(Ii,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:L,align:"start",ref:g,children:[b.jsx(ja,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),Po.map((P,T)=>E(P).length>0&&b.jsxs("div",{children:[b.jsx(Vr,{className:"pr-font-semibold pr-text-slate-700",children:_a[P]}),E(P).map(O=>b.jsx("div",{children:b.jsx(Ia,{bookId:O,handleSelectBook:()=>h(O,!1),isSelected:o===O,handleHighlightBook:()=>u(O),handleKeyDown:V,bookType:P,ref:$=>{o===O&&(m.current=$)},children:b.jsx(Ma,{handleSelectChapter:N,endChapter:Xt(O),activeChapter:e.bookNum===se.bookIdToNumber(O)?e.chapterNum:0,highlightedChapter:a,handleHighlightedChapter:$=>{l($)}})})},O)),Po.length-1!==T?b.jsx(_i,{}):void 0]},P))]})]})})}function S(){return S=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},S.apply(this,arguments)}function Ua(e,t){typeof e=="function"?e(t):e!=null&&(e.current=t)}function Ha(...e){return t=>e.forEach(n=>Ua(n,t))}const Ai=j.forwardRef((e,t)=>{const{children:n,...r}=e,o=j.Children.toArray(n),i=o.find(Ga);if(i){const a=i.props.children,l=o.map(c=>c===i?j.Children.count(a)>1?j.Children.only(null):j.isValidElement(a)?a.props.children:null:c);return j.createElement(Sr,S({},r,{ref:t}),j.isValidElement(a)?j.cloneElement(a,void 0,l):null)}return j.createElement(Sr,S({},r,{ref:t}),n)});Ai.displayName="Slot";const Sr=j.forwardRef((e,t)=>{const{children:n,...r}=e;return j.isValidElement(n)?j.cloneElement(n,{...Wa(r,n.props),ref:t?Ha(t,n.ref):n.ref}):j.Children.count(n)>1?j.Children.only(null):null});Sr.displayName="SlotClone";const qa=({children:e})=>j.createElement(j.Fragment,null,e);function Ga(e){return j.isValidElement(e)&&e.type===qa}function Wa(e,t){const n={...t};for(const r in t){const o=e[r],i=t[r];/^on[A-Z]/.test(r)?o&&i?n[r]=(...l)=>{i(...l),o(...l)}:o&&(n[r]=o):r==="style"?n[r]={...o,...i}:r==="className"&&(n[r]=[o,i].filter(Boolean).join(" "))}return{...e,...n}}const Ka=Oi.cva("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),Di=k.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},i)=>{const a=r?Ai:"button";return b.jsx(a,{className:xe(Ka({variant:t,size:n,className:e})),ref:i,...o})});Di.displayName="Button";function dt({id:e,isDisabled:t=!1,className:n,onClick:r,onContextMenu:o,children:i}){return b.jsx(Di,{id:e,disabled:t,className:xe("papi-button",n),onClick:r,onContextMenu:o,children:i})}function An({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:a,options:l=[],className:c,value:u,onChange:d,onFocus:f,onBlur:p,getOptionLabel:v}){return b.jsx(fe.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:i,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:u,onChange:d,onFocus:f,onBlur:p,getOptionLabel:v,renderInput:y=>b.jsx(fe.TextField,{...y,error:o,fullWidth:i,disabled:n,label:t,style:{width:a}})})}function Xa({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o,chapterCount:i}){const a=j.useMemo(()=>Array.from({length:i},(u,d)=>d+1),[i]),l=(u,d)=>{n(d),d>t&&r(d)},c=(u,d)=>{r(d),d<e&&n(d)};return b.jsxs(b.Fragment,{children:[b.jsx(fe.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:b.jsx(An,{onChange:(u,d)=>l(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),b.jsx(fe.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:b.jsx(An,{onChange:(u,d)=>c(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:t,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var ht=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(ht||{});function Bi({id:e,isChecked:t,labelText:n="",labelPosition:r=ht.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:a=!1,hasError:l=!1,className:c,onChange:u}){const d=b.jsx(fe.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:a,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:u});let f;if(n){const p=r===ht.Before||r===ht.Above,v=b.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),y=r===ht.Before||r===ht.After,g=y?v:b.jsx("div",{children:v}),m=y?d:b.jsx("div",{children:d});f=b.jsxs(fe.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:a,error:l,children:[p&&g,m,!p&&g]})}else f=d;return f}function de(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function Ya(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Ja(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Cr={exports:{}},Cn={exports:{}},ae={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ro;function Za(){if(Ro)return ae;Ro=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,m=e?Symbol.for("react.fundamental"):60117,E=e?Symbol.for("react.responder"):60118,_=e?Symbol.for("react.scope"):60119;function x(h){if(typeof h=="object"&&h!==null){var N=h.$$typeof;switch(N){case t:switch(h=h.type,h){case c:case u:case r:case i:case o:case f:return h;default:switch(h=h&&h.$$typeof,h){case l:case d:case y:case v:case a:return h;default:return N}}case n:return N}}}function w(h){return x(h)===u}return ae.AsyncMode=c,ae.ConcurrentMode=u,ae.ContextConsumer=l,ae.ContextProvider=a,ae.Element=t,ae.ForwardRef=d,ae.Fragment=r,ae.Lazy=y,ae.Memo=v,ae.Portal=n,ae.Profiler=i,ae.StrictMode=o,ae.Suspense=f,ae.isAsyncMode=function(h){return w(h)||x(h)===c},ae.isConcurrentMode=w,ae.isContextConsumer=function(h){return x(h)===l},ae.isContextProvider=function(h){return x(h)===a},ae.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===t},ae.isForwardRef=function(h){return x(h)===d},ae.isFragment=function(h){return x(h)===r},ae.isLazy=function(h){return x(h)===y},ae.isMemo=function(h){return x(h)===v},ae.isPortal=function(h){return x(h)===n},ae.isProfiler=function(h){return x(h)===i},ae.isStrictMode=function(h){return x(h)===o},ae.isSuspense=function(h){return x(h)===f},ae.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===r||h===u||h===i||h===o||h===f||h===p||typeof h=="object"&&h!==null&&(h.$$typeof===y||h.$$typeof===v||h.$$typeof===a||h.$$typeof===l||h.$$typeof===d||h.$$typeof===m||h.$$typeof===E||h.$$typeof===_||h.$$typeof===g)},ae.typeOf=x,ae}var le={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $o;function Qa(){return $o||($o=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,m=e?Symbol.for("react.fundamental"):60117,E=e?Symbol.for("react.responder"):60118,_=e?Symbol.for("react.scope"):60119;function x(D){return typeof D=="string"||typeof D=="function"||D===r||D===u||D===i||D===o||D===f||D===p||typeof D=="object"&&D!==null&&(D.$$typeof===y||D.$$typeof===v||D.$$typeof===a||D.$$typeof===l||D.$$typeof===d||D.$$typeof===m||D.$$typeof===E||D.$$typeof===_||D.$$typeof===g)}function w(D){if(typeof D=="object"&&D!==null){var ee=D.$$typeof;switch(ee){case t:var M=D.type;switch(M){case c:case u:case r:case i:case o:case f:return M;default:var oe=M&&M.$$typeof;switch(oe){case l:case d:case y:case v:case a:return oe;default:return ee}}case n:return ee}}}var h=c,N=u,R=l,F=a,L=t,V=d,P=r,T=y,O=v,$=n,A=i,I=o,z=f,J=!1;function Q(D){return J||(J=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),C(D)||w(D)===c}function C(D){return w(D)===u}function B(D){return w(D)===l}function H(D){return w(D)===a}function X(D){return typeof D=="object"&&D!==null&&D.$$typeof===t}function U(D){return w(D)===d}function q(D){return w(D)===r}function W(D){return w(D)===y}function K(D){return w(D)===v}function G(D){return w(D)===n}function Y(D){return w(D)===i}function Z(D){return w(D)===o}function re(D){return w(D)===f}le.AsyncMode=h,le.ConcurrentMode=N,le.ContextConsumer=R,le.ContextProvider=F,le.Element=L,le.ForwardRef=V,le.Fragment=P,le.Lazy=T,le.Memo=O,le.Portal=$,le.Profiler=A,le.StrictMode=I,le.Suspense=z,le.isAsyncMode=Q,le.isConcurrentMode=C,le.isContextConsumer=B,le.isContextProvider=H,le.isElement=X,le.isForwardRef=U,le.isFragment=q,le.isLazy=W,le.isMemo=K,le.isPortal=G,le.isProfiler=Y,le.isStrictMode=Z,le.isSuspense=re,le.isValidElementType=x,le.typeOf=w}()),le}var Mo;function Li(){return Mo||(Mo=1,process.env.NODE_ENV==="production"?Cn.exports=Za():Cn.exports=Qa()),Cn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var ur,Io;function el(){if(Io)return ur;Io=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var a={},l=0;l<10;l++)a["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(a).map(function(d){return a[d]});if(c.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(d){u[d]=d}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return ur=o()?Object.assign:function(i,a){for(var l,c=r(i),u,d=1;d<arguments.length;d++){l=Object(arguments[d]);for(var f in l)t.call(l,f)&&(c[f]=l[f]);if(e){u=e(l);for(var p=0;p<u.length;p++)n.call(l,u[p])&&(c[u[p]]=l[u[p]])}}return c},ur}var dr,jo;function Ur(){if(jo)return dr;jo=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return dr=e,dr}var pr,_o;function Fi(){return _o||(_o=1,pr=Function.call.bind(Object.prototype.hasOwnProperty)),pr}var fr,Ao;function tl(){if(Ao)return fr;Ao=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Ur(),n={},r=Fi();e=function(i){var a="Warning: "+i;typeof console<"u"&&console.error(a);try{throw new Error(a)}catch{}}}function o(i,a,l,c,u){if(process.env.NODE_ENV!=="production"){for(var d in i)if(r(i,d)){var f;try{if(typeof i[d]!="function"){var p=Error((c||"React class")+": "+l+" type `"+d+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[d]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw p.name="Invariant Violation",p}f=i[d](a,d,c,l,null,t)}catch(y){f=y}if(f&&!(f instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+d+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in n)){n[f.message]=!0;var v=u?u():"";e("Failed "+l+" type: "+f.message+(v??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},fr=o,fr}var hr,Do;function nl(){if(Do)return hr;Do=1;var e=Li(),t=el(),n=Ur(),r=Fi(),o=tl(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function a(){return null}return hr=function(l,c){var u=typeof Symbol=="function"&&Symbol.iterator,d="@@iterator";function f(C){var B=C&&(u&&C[u]||C[d]);if(typeof B=="function")return B}var p="<<anonymous>>",v={array:E("array"),bigint:E("bigint"),bool:E("boolean"),func:E("function"),number:E("number"),object:E("object"),string:E("string"),symbol:E("symbol"),any:_(),arrayOf:x,element:w(),elementType:h(),instanceOf:N,node:V(),objectOf:F,oneOf:R,oneOfType:L,shape:T,exact:O};function y(C,B){return C===B?C!==0||1/C===1/B:C!==C&&B!==B}function g(C,B){this.message=C,this.data=B&&typeof B=="object"?B:{},this.stack=""}g.prototype=Error.prototype;function m(C){if(process.env.NODE_ENV!=="production")var B={},H=0;function X(q,W,K,G,Y,Z,re){if(G=G||p,Z=Z||K,re!==n){if(c){var D=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw D.name="Invariant Violation",D}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var ee=G+":"+K;!B[ee]&&H<3&&(i("You are manually calling a React.PropTypes validation function for the `"+Z+"` prop on `"+G+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),B[ee]=!0,H++)}}return W[K]==null?q?W[K]===null?new g("The "+Y+" `"+Z+"` is marked as required "+("in `"+G+"`, but its value is `null`.")):new g("The "+Y+" `"+Z+"` is marked as required in "+("`"+G+"`, but its value is `undefined`.")):null:C(W,K,G,Y,Z)}var U=X.bind(null,!1);return U.isRequired=X.bind(null,!0),U}function E(C){function B(H,X,U,q,W,K){var G=H[X],Y=I(G);if(Y!==C){var Z=z(G);return new g("Invalid "+q+" `"+W+"` of type "+("`"+Z+"` supplied to `"+U+"`, expected ")+("`"+C+"`."),{expectedType:C})}return null}return m(B)}function _(){return m(a)}function x(C){function B(H,X,U,q,W){if(typeof C!="function")return new g("Property `"+W+"` of component `"+U+"` has invalid PropType notation inside arrayOf.");var K=H[X];if(!Array.isArray(K)){var G=I(K);return new g("Invalid "+q+" `"+W+"` of type "+("`"+G+"` supplied to `"+U+"`, expected an array."))}for(var Y=0;Y<K.length;Y++){var Z=C(K,Y,U,q,W+"["+Y+"]",n);if(Z instanceof Error)return Z}return null}return m(B)}function w(){function C(B,H,X,U,q){var W=B[H];if(!l(W)){var K=I(W);return new g("Invalid "+U+" `"+q+"` of type "+("`"+K+"` supplied to `"+X+"`, expected a single ReactElement."))}return null}return m(C)}function h(){function C(B,H,X,U,q){var W=B[H];if(!e.isValidElementType(W)){var K=I(W);return new g("Invalid "+U+" `"+q+"` of type "+("`"+K+"` supplied to `"+X+"`, expected a single ReactElement type."))}return null}return m(C)}function N(C){function B(H,X,U,q,W){if(!(H[X]instanceof C)){var K=C.name||p,G=Q(H[X]);return new g("Invalid "+q+" `"+W+"` of type "+("`"+G+"` supplied to `"+U+"`, expected ")+("instance of `"+K+"`."))}return null}return m(B)}function R(C){if(!Array.isArray(C))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),a;function B(H,X,U,q,W){for(var K=H[X],G=0;G<C.length;G++)if(y(K,C[G]))return null;var Y=JSON.stringify(C,function(re,D){var ee=z(D);return ee==="symbol"?String(D):D});return new g("Invalid "+q+" `"+W+"` of value `"+String(K)+"` "+("supplied to `"+U+"`, expected one of "+Y+"."))}return m(B)}function F(C){function B(H,X,U,q,W){if(typeof C!="function")return new g("Property `"+W+"` of component `"+U+"` has invalid PropType notation inside objectOf.");var K=H[X],G=I(K);if(G!=="object")return new g("Invalid "+q+" `"+W+"` of type "+("`"+G+"` supplied to `"+U+"`, expected an object."));for(var Y in K)if(r(K,Y)){var Z=C(K,Y,U,q,W+"."+Y,n);if(Z instanceof Error)return Z}return null}return m(B)}function L(C){if(!Array.isArray(C))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),a;for(var B=0;B<C.length;B++){var H=C[B];if(typeof H!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+J(H)+" at index "+B+"."),a}function X(U,q,W,K,G){for(var Y=[],Z=0;Z<C.length;Z++){var re=C[Z],D=re(U,q,W,K,G,n);if(D==null)return null;D.data&&r(D.data,"expectedType")&&Y.push(D.data.expectedType)}var ee=Y.length>0?", expected one of type ["+Y.join(", ")+"]":"";return new g("Invalid "+K+" `"+G+"` supplied to "+("`"+W+"`"+ee+"."))}return m(X)}function V(){function C(B,H,X,U,q){return $(B[H])?null:new g("Invalid "+U+" `"+q+"` supplied to "+("`"+X+"`, expected a ReactNode."))}return m(C)}function P(C,B,H,X,U){return new g((C||"React class")+": "+B+" type `"+H+"."+X+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+U+"`.")}function T(C){function B(H,X,U,q,W){var K=H[X],G=I(K);if(G!=="object")return new g("Invalid "+q+" `"+W+"` of type `"+G+"` "+("supplied to `"+U+"`, expected `object`."));for(var Y in C){var Z=C[Y];if(typeof Z!="function")return P(U,q,W,Y,z(Z));var re=Z(K,Y,U,q,W+"."+Y,n);if(re)return re}return null}return m(B)}function O(C){function B(H,X,U,q,W){var K=H[X],G=I(K);if(G!=="object")return new g("Invalid "+q+" `"+W+"` of type `"+G+"` "+("supplied to `"+U+"`, expected `object`."));var Y=t({},H[X],C);for(var Z in Y){var re=C[Z];if(r(C,Z)&&typeof re!="function")return P(U,q,W,Z,z(re));if(!re)return new g("Invalid "+q+" `"+W+"` key `"+Z+"` supplied to `"+U+"`.\nBad object: "+JSON.stringify(H[X],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(C),null,"  "));var D=re(K,Z,U,q,W+"."+Z,n);if(D)return D}return null}return m(B)}function $(C){switch(typeof C){case"number":case"string":case"undefined":return!0;case"boolean":return!C;case"object":if(Array.isArray(C))return C.every($);if(C===null||l(C))return!0;var B=f(C);if(B){var H=B.call(C),X;if(B!==C.entries){for(;!(X=H.next()).done;)if(!$(X.value))return!1}else for(;!(X=H.next()).done;){var U=X.value;if(U&&!$(U[1]))return!1}}else return!1;return!0;default:return!1}}function A(C,B){return C==="symbol"?!0:B?B["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&B instanceof Symbol:!1}function I(C){var B=typeof C;return Array.isArray(C)?"array":C instanceof RegExp?"object":A(B,C)?"symbol":B}function z(C){if(typeof C>"u"||C===null)return""+C;var B=I(C);if(B==="object"){if(C instanceof Date)return"date";if(C instanceof RegExp)return"regexp"}return B}function J(C){var B=z(C);switch(B){case"array":case"object":return"an "+B;case"boolean":case"date":case"regexp":return"a "+B;default:return B}}function Q(C){return!C.constructor||!C.constructor.name?p:C.constructor.name}return v.checkPropTypes=o,v.resetWarningCache=o.resetWarningCache,v.PropTypes=v,v},hr}var mr,Bo;function rl(){if(Bo)return mr;Bo=1;var e=Ur();function t(){}function n(){}return n.resetWarningCache=t,mr=function(){function r(a,l,c,u,d,f){if(f!==e){var p=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw p.name="Invariant Violation",p}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},mr}if(process.env.NODE_ENV!=="production"){var ol=Li(),il=!0;Cr.exports=nl()(ol.isElement,il)}else Cr.exports=rl()();var sl=Cr.exports;const s=Ya(sl);function zt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function mt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Vi(e){if(!mt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Vi(e[n])}),t}function Ye(e,t,n={clone:!0}){const r=n.clone?S({},e):e;return mt(e)&&mt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(mt(t[o])&&o in e&&mt(e[o])?r[o]=Ye(e[o],t[o],n):n.clone?r[o]=mt(t[o])?Vi(t[o]):t[o]:r[o]=t[o])}),r}function al(e){const{prototype:t={}}=e;return!!t.isReactComponent}function zi(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let l;const c=i.type;return typeof c=="function"&&!al(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ui=zt(s.element,zi);Ui.isRequired=zt(s.element.isRequired,zi);const bn=Ui;function ll(e){const{prototype:t={}}=e;return!!t.isReactComponent}function cl(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let l;return typeof i=="function"&&!ll(i)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const ul=zt(s.elementType,cl),dl="exact-prop: ​";function Hi(e){return process.env.NODE_ENV==="production"?e:S({},e,{[dl]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function _t(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Nr={exports:{}},ce={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Lo;function pl(){if(Lo)return ce;Lo=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),y;y=Symbol.for("react.module.reference");function g(m){if(typeof m=="object"&&m!==null){var E=m.$$typeof;switch(E){case e:switch(m=m.type,m){case n:case o:case r:case u:case d:return m;default:switch(m=m&&m.$$typeof,m){case l:case a:case c:case p:case f:case i:return m;default:return E}}case t:return E}}}return ce.ContextConsumer=a,ce.ContextProvider=i,ce.Element=e,ce.ForwardRef=c,ce.Fragment=n,ce.Lazy=p,ce.Memo=f,ce.Portal=t,ce.Profiler=o,ce.StrictMode=r,ce.Suspense=u,ce.SuspenseList=d,ce.isAsyncMode=function(){return!1},ce.isConcurrentMode=function(){return!1},ce.isContextConsumer=function(m){return g(m)===a},ce.isContextProvider=function(m){return g(m)===i},ce.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===e},ce.isForwardRef=function(m){return g(m)===c},ce.isFragment=function(m){return g(m)===n},ce.isLazy=function(m){return g(m)===p},ce.isMemo=function(m){return g(m)===f},ce.isPortal=function(m){return g(m)===t},ce.isProfiler=function(m){return g(m)===o},ce.isStrictMode=function(m){return g(m)===r},ce.isSuspense=function(m){return g(m)===u},ce.isSuspenseList=function(m){return g(m)===d},ce.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===n||m===o||m===r||m===u||m===d||m===v||typeof m=="object"&&m!==null&&(m.$$typeof===p||m.$$typeof===f||m.$$typeof===i||m.$$typeof===a||m.$$typeof===c||m.$$typeof===y||m.getModuleId!==void 0)},ce.typeOf=g,ce}var ue={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fo;function fl(){return Fo||(Fo=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),y=!1,g=!1,m=!1,E=!1,_=!1,x;x=Symbol.for("react.module.reference");function w(M){return!!(typeof M=="string"||typeof M=="function"||M===n||M===o||_||M===r||M===u||M===d||E||M===v||y||g||m||typeof M=="object"&&M!==null&&(M.$$typeof===p||M.$$typeof===f||M.$$typeof===i||M.$$typeof===a||M.$$typeof===c||M.$$typeof===x||M.getModuleId!==void 0))}function h(M){if(typeof M=="object"&&M!==null){var oe=M.$$typeof;switch(oe){case e:var ye=M.type;switch(ye){case n:case o:case r:case u:case d:return ye;default:var Se=ye&&ye.$$typeof;switch(Se){case l:case a:case c:case p:case f:case i:return Se;default:return oe}}case t:return oe}}}var N=a,R=i,F=e,L=c,V=n,P=p,T=f,O=t,$=o,A=r,I=u,z=d,J=!1,Q=!1;function C(M){return J||(J=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function B(M){return Q||(Q=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function H(M){return h(M)===a}function X(M){return h(M)===i}function U(M){return typeof M=="object"&&M!==null&&M.$$typeof===e}function q(M){return h(M)===c}function W(M){return h(M)===n}function K(M){return h(M)===p}function G(M){return h(M)===f}function Y(M){return h(M)===t}function Z(M){return h(M)===o}function re(M){return h(M)===r}function D(M){return h(M)===u}function ee(M){return h(M)===d}ue.ContextConsumer=N,ue.ContextProvider=R,ue.Element=F,ue.ForwardRef=L,ue.Fragment=V,ue.Lazy=P,ue.Memo=T,ue.Portal=O,ue.Profiler=$,ue.StrictMode=A,ue.Suspense=I,ue.SuspenseList=z,ue.isAsyncMode=C,ue.isConcurrentMode=B,ue.isContextConsumer=H,ue.isContextProvider=X,ue.isElement=U,ue.isForwardRef=q,ue.isFragment=W,ue.isLazy=K,ue.isMemo=G,ue.isPortal=Y,ue.isProfiler=Z,ue.isStrictMode=re,ue.isSuspense=D,ue.isSuspenseList=ee,ue.isValidElementType=w,ue.typeOf=h}()),ue}process.env.NODE_ENV==="production"?Nr.exports=pl():Nr.exports=fl();var Dn=Nr.exports;const hl=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function ml(e){const t=`${e}`.match(hl);return t&&t[1]||""}function qi(e,t=""){return e.displayName||e.name||ml(e)||t}function Vo(e,t,n){const r=qi(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function gl(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return qi(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Dn.ForwardRef:return Vo(e,e.render,"ForwardRef");case Dn.Memo:return Vo(e,e.type,"memo");default:return}}}function Je(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],a=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const bl=s.oneOfType([s.func,s.object]),Hr=bl;function He(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":_t(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Pr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Gi(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function vl(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,a)=>{const l=o||"<<anonymous>>",c=a||r;return typeof n[r]<"u"?new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function yl(e,t){var n,r;return k.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function ke(e){return e&&e.ownerDocument||document}function At(e){return ke(e).defaultView||window}function xl(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?S({},t.propTypes):null;return o=>(i,a,l,c,u,...d)=>{const f=u||a,p=n==null?void 0:n[f];if(p){const v=p(i,a,l,c,u,...d);if(v)return v}return typeof i[a]<"u"&&!i[o]?new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Bn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const wl=typeof window<"u"?k.useLayoutEffect:k.useEffect,yt=wl;let zo=0;function El(e){const[t,n]=k.useState(e),r=e||t;return k.useEffect(()=>{t==null&&(zo+=1,n(`mui-${zo}`))},[t]),r}const Uo=k["useId".toString()];function Wi(e){if(Uo!==void 0){const t=Uo();return e??t}return El(e)}function Tl(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function Ki({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=k.useRef(e!==void 0),[i,a]=k.useState(t),l=o?e:i;if(process.env.NODE_ENV!=="production"){k.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:u}=k.useRef(t);k.useEffect(()=>{!o&&u!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=k.useCallback(u=>{o||a(u)},[]);return[l,c]}function dn(e){const t=k.useRef(e);return yt(()=>{t.current=e}),k.useRef((...n)=>(0,t.current)(...n)).current}function Le(...e){return k.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Bn(n,t)})},e)}const Ho={};function kl(e,t){const n=k.useRef(Ho);return n.current===Ho&&(n.current=e(t)),n}const Ol=[];function Sl(e){k.useEffect(e,Ol)}class vn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new vn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function tn(){const e=kl(vn.create).current;return Sl(e.disposeEffect),e}let Wn=!0,Rr=!1;const Cl=new vn,Nl={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Pl(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Nl[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Rl(e){e.metaKey||e.altKey||e.ctrlKey||(Wn=!0)}function gr(){Wn=!1}function $l(){this.visibilityState==="hidden"&&Rr&&(Wn=!0)}function Ml(e){e.addEventListener("keydown",Rl,!0),e.addEventListener("mousedown",gr,!0),e.addEventListener("pointerdown",gr,!0),e.addEventListener("touchstart",gr,!0),e.addEventListener("visibilitychange",$l,!0)}function Il(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Wn||Pl(t)}function Xi(){const e=k.useCallback(o=>{o!=null&&Ml(o.ownerDocument)},[]),t=k.useRef(!1);function n(){return t.current?(Rr=!0,Cl.start(100,()=>{Rr=!1}),t.current=!1,!0):!1}function r(o){return Il(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Yi(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function jl(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function _l(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Al=Number.isInteger||_l;function Ji(e,t,n,r){const o=e[t];if(o==null||!Al(o)){const i=jl(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function Zi(e,t,...n){return e[t]===void 0?null:Ji(e,t,...n)}function $r(){return null}Zi.isRequired=Ji;$r.isRequired=$r;const Qi=process.env.NODE_ENV==="production"?$r:Zi;function es(e,t){const n=S({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=S({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=S({},i),Object.keys(o).forEach(a=>{n[r][a]=es(o[a],i[a])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function et(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,a)=>{if(a){const l=t(a);l!==""&&i.push(l),n&&n[a]&&i.push(n[a])}return i},[]).join(" ")}),r}const qo=e=>e,Dl=()=>{let e=qo;return{configure(t){e=t},generate(t){return e(t)},reset(){e=qo}}},Bl=Dl(),ts=Bl,ns={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Ge(e,t,n="Mui"){const r=ns[t];return r?`${n}-${r}`:`${ts.generate(e)}-${t}`}function st(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=Ge(e,o,n)}),r}function Ll(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function rs(e){return typeof e=="string"}function nn(e,t,n){return e===void 0||rs(e)?t:S({},t,{ownerState:S({},t.ownerState,n)})}const Fl={disableDefaultClasses:!1},Vl=k.createContext(Fl);function zl(e){const{disableDefaultClasses:t}=k.useContext(Vl);return n=>t?"":e(n)}function os(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function Ul(e,t,n){return typeof e=="function"?e(t,n):e}function Go(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function Hl(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const v=Te(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),y=S({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),g=S({},n,o,r);return v.length>0&&(g.className=v),Object.keys(y).length>0&&(g.style=y),{props:g,internalRef:void 0}}const a=os(S({},o,r)),l=Go(r),c=Go(o),u=t(a),d=Te(u==null?void 0:u.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),f=S({},u==null?void 0:u.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),p=S({},u,n,c,l);return d.length>0&&(p.className=d),Object.keys(f).length>0&&(p.style=f),{props:p,internalRef:u.ref}}const ql=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function xt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,a=de(e,ql),l=i?{}:Ul(r,o),{props:c,internalRef:u}=Hl(S({},a,{externalSlotProps:l})),d=Le(u,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return nn(n,S({},c,{ref:d}),o)}const is="base";function Gl(e){return`${is}--${e}`}function Wl(e,t){return`${is}-${e}-${t}`}function ss(e,t){const n=ns[t];return n?Gl(n):Wl(e,t)}function Kl(e,t){const n={};return t.forEach(r=>{n[r]=ss(e,r)}),n}const Xl=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Yl(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function Jl(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Zl(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Jl(e))}function Ql(e){const t=[],n=[];return Array.from(e.querySelectorAll(Xl)).forEach((r,o)=>{const i=Yl(r);i===-1||!Zl(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function ec(){return!0}function Ln(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=Ql,isEnabled:a=ec,open:l}=e,c=k.useRef(!1),u=k.useRef(null),d=k.useRef(null),f=k.useRef(null),p=k.useRef(null),v=k.useRef(!1),y=k.useRef(null),g=Le(t.ref,y),m=k.useRef(null);k.useEffect(()=>{!l||!y.current||(v.current=!n)},[n,l]),k.useEffect(()=>{if(!l||!y.current)return;const x=ke(y.current);return y.current.contains(x.activeElement)||(y.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),y.current.setAttribute("tabIndex","-1")),v.current&&y.current.focus()),()=>{o||(f.current&&f.current.focus&&(c.current=!0,f.current.focus()),f.current=null)}},[l]),k.useEffect(()=>{if(!l||!y.current)return;const x=ke(y.current),w=R=>{m.current=R,!(r||!a()||R.key!=="Tab")&&x.activeElement===y.current&&R.shiftKey&&(c.current=!0,d.current&&d.current.focus())},h=()=>{const R=y.current;if(R===null)return;if(!x.hasFocus()||!a()||c.current){c.current=!1;return}if(R.contains(x.activeElement)||r&&x.activeElement!==u.current&&x.activeElement!==d.current)return;if(x.activeElement!==p.current)p.current=null;else if(p.current!==null)return;if(!v.current)return;let F=[];if((x.activeElement===u.current||x.activeElement===d.current)&&(F=i(y.current)),F.length>0){var L,V;const P=!!((L=m.current)!=null&&L.shiftKey&&((V=m.current)==null?void 0:V.key)==="Tab"),T=F[0],O=F[F.length-1];typeof T!="string"&&typeof O!="string"&&(P?O.focus():T.focus())}else R.focus()};x.addEventListener("focusin",h),x.addEventListener("keydown",w,!0);const N=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&h()},50);return()=>{clearInterval(N),x.removeEventListener("focusin",h),x.removeEventListener("keydown",w,!0)}},[n,r,o,a,l,i]);const E=x=>{f.current===null&&(f.current=x.relatedTarget),v.current=!0,p.current=x.target;const w=t.props.onFocus;w&&w(x)},_=x=>{f.current===null&&(f.current=x.relatedTarget),v.current=!0};return b.jsxs(k.Fragment,{children:[b.jsx("div",{tabIndex:l?0:-1,onFocus:_,ref:u,"data-testid":"sentinelStart"}),k.cloneElement(t,{ref:g,onFocus:E}),b.jsx("div",{tabIndex:l?0:-1,onFocus:_,ref:d,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(Ln.propTypes={children:bn,disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableRestoreFocus:s.bool,getTabbable:s.func,isEnabled:s.func,open:s.bool.isRequired});process.env.NODE_ENV!=="production"&&(Ln["propTypes"]=Hi(Ln.propTypes));function tc(e){return typeof e=="function"?e():e}const pn=k.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[a,l]=k.useState(null),c=Le(k.isValidElement(r)?r.ref:null,n);if(yt(()=>{i||l(tc(o)||document.body)},[o,i]),yt(()=>{if(a&&!i)return Bn(n,a),()=>{Bn(n,null)}},[n,a,i]),i){if(k.isValidElement(r)){const u={ref:c};return k.cloneElement(r,u)}return b.jsx(k.Fragment,{children:r})}return b.jsx(k.Fragment,{children:a&&pa.createPortal(r,a)})});process.env.NODE_ENV!=="production"&&(pn.propTypes={children:s.node,container:s.oneOfType([Je,s.func]),disablePortal:s.bool});process.env.NODE_ENV!=="production"&&(pn["propTypes"]=Hi(pn.propTypes));function nc(e){const t=ke(e);return t.body===e?At(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function an(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Wo(e){return parseInt(At(e).getComputedStyle(e).paddingRight,10)||0}function rc(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Ko(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,a=>{const l=i.indexOf(a)===-1,c=!rc(a);l&&c&&an(a,o)})}function br(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function oc(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(nc(r)){const a=Yi(ke(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Wo(r)+a}px`;const l=ke(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${Wo(c)+a}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=ke(r).body;else{const a=r.parentElement,l=At(r);i=(a==null?void 0:a.nodeName)==="HTML"&&l.getComputedStyle(a).overflowY==="scroll"?a:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:a,property:l})=>{i?a.style.setProperty(l,i):a.style.removeProperty(l)})}}function ic(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class sc{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&an(t.modalRef,!1);const o=ic(n);Ko(n,t.mount,t.modalRef,o,!0);const i=br(this.containers,a=>a.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=br(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=oc(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=br(this.containers,a=>a.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&an(t.modalRef,n),Ko(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const a=i.modals[i.modals.length-1];a.modalRef&&an(a.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function ac(e){return typeof e=="function"?e():e}function lc(e){return e?e.props.hasOwnProperty("in"):!1}const cc=new sc;function uc(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=cc,closeAfterTransition:i=!1,onTransitionEnter:a,onTransitionExited:l,children:c,onClose:u,open:d,rootRef:f}=e,p=k.useRef({}),v=k.useRef(null),y=k.useRef(null),g=Le(y,f),[m,E]=k.useState(!d),_=lc(c);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const w=()=>ke(v.current),h=()=>(p.current.modalRef=y.current,p.current.mount=v.current,p.current),N=()=>{o.mount(h(),{disableScrollLock:r}),y.current&&(y.current.scrollTop=0)},R=dn(()=>{const I=ac(t)||w().body;o.add(h(),I),y.current&&N()}),F=k.useCallback(()=>o.isTopModal(h()),[o]),L=dn(I=>{v.current=I,I&&(d&&F()?N():y.current&&an(y.current,x))}),V=k.useCallback(()=>{o.remove(h(),x)},[x,o]);k.useEffect(()=>()=>{V()},[V]),k.useEffect(()=>{d?R():(!_||!i)&&V()},[d,V,_,i,R]);const P=I=>z=>{var J;(J=I.onKeyDown)==null||J.call(I,z),!(z.key!=="Escape"||z.which===229||!F())&&(n||(z.stopPropagation(),u&&u(z,"escapeKeyDown")))},T=I=>z=>{var J;(J=I.onClick)==null||J.call(I,z),z.target===z.currentTarget&&u&&u(z,"backdropClick")};return{getRootProps:(I={})=>{const z=os(e);delete z.onTransitionEnter,delete z.onTransitionExited;const J=S({},z,I);return S({role:"presentation"},J,{onKeyDown:P(J),ref:g})},getBackdropProps:(I={})=>{const z=I;return S({"aria-hidden":!0},z,{onClick:T(z),open:d})},getTransitionProps:()=>{const I=()=>{E(!1),a&&a()},z=()=>{E(!0),l&&l(),i&&V()};return{onEnter:Pr(I,c==null?void 0:c.props.onEnter),onExited:Pr(z,c==null?void 0:c.props.onExited)}},rootRef:g,portalRef:L,isTopModal:F,exited:m,hasTransition:_}}var Pe="top",Fe="bottom",Ve="right",Re="left",qr="auto",yn=[Pe,Fe,Ve,Re],Dt="start",fn="end",dc="clippingParents",as="viewport",Yt="popper",pc="reference",Xo=yn.reduce(function(e,t){return e.concat([t+"-"+Dt,t+"-"+fn])},[]),ls=[].concat(yn,[qr]).reduce(function(e,t){return e.concat([t,t+"-"+Dt,t+"-"+fn])},[]),fc="beforeRead",hc="read",mc="afterRead",gc="beforeMain",bc="main",vc="afterMain",yc="beforeWrite",xc="write",wc="afterWrite",Ec=[fc,hc,mc,gc,bc,vc,yc,xc,wc];function qe(e){return e?(e.nodeName||"").toLowerCase():null}function _e(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function wt(e){var t=_e(e).Element;return e instanceof t||e instanceof Element}function Be(e){var t=_e(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Gr(e){if(typeof ShadowRoot>"u")return!1;var t=_e(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Tc(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!Be(i)||!qe(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(a){var l=o[a];l===!1?i.removeAttribute(a):i.setAttribute(a,l===!0?"":l)}))})}function kc(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},a=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=a.reduce(function(c,u){return c[u]="",c},{});!Be(o)||!qe(o)||(Object.assign(o.style,l),Object.keys(i).forEach(function(c){o.removeAttribute(c)}))})}}const Oc={name:"applyStyles",enabled:!0,phase:"write",fn:Tc,effect:kc,requires:["computeStyles"]};function Ue(e){return e.split("-")[0]}var bt=Math.max,Fn=Math.min,Bt=Math.round;function Mr(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function cs(){return!/^((?!chrome|android).)*safari/i.test(Mr())}function Lt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&Be(e)&&(o=e.offsetWidth>0&&Bt(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&Bt(r.height)/e.offsetHeight||1);var a=wt(e)?_e(e):window,l=a.visualViewport,c=!cs()&&n,u=(r.left+(c&&l?l.offsetLeft:0))/o,d=(r.top+(c&&l?l.offsetTop:0))/i,f=r.width/o,p=r.height/i;return{width:f,height:p,top:d,right:u+f,bottom:d+p,left:u,x:u,y:d}}function Wr(e){var t=Lt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function us(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Gr(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function Ze(e){return _e(e).getComputedStyle(e)}function Sc(e){return["table","td","th"].indexOf(qe(e))>=0}function at(e){return((wt(e)?e.ownerDocument:e.document)||window.document).documentElement}function Kn(e){return qe(e)==="html"?e:e.assignedSlot||e.parentNode||(Gr(e)?e.host:null)||at(e)}function Yo(e){return!Be(e)||Ze(e).position==="fixed"?null:e.offsetParent}function Cc(e){var t=/firefox/i.test(Mr()),n=/Trident/i.test(Mr());if(n&&Be(e)){var r=Ze(e);if(r.position==="fixed")return null}var o=Kn(e);for(Gr(o)&&(o=o.host);Be(o)&&["html","body"].indexOf(qe(o))<0;){var i=Ze(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function xn(e){for(var t=_e(e),n=Yo(e);n&&Sc(n)&&Ze(n).position==="static";)n=Yo(n);return n&&(qe(n)==="html"||qe(n)==="body"&&Ze(n).position==="static")?t:n||Cc(e)||t}function Kr(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function ln(e,t,n){return bt(e,Fn(t,n))}function Nc(e,t,n){var r=ln(e,t,n);return r>n?n:r}function ds(){return{top:0,right:0,bottom:0,left:0}}function ps(e){return Object.assign({},ds(),e)}function fs(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Pc=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,ps(typeof t!="number"?t:fs(t,yn))};function Rc(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,l=Ue(n.placement),c=Kr(l),u=[Re,Ve].indexOf(l)>=0,d=u?"height":"width";if(!(!i||!a)){var f=Pc(o.padding,n),p=Wr(i),v=c==="y"?Pe:Re,y=c==="y"?Fe:Ve,g=n.rects.reference[d]+n.rects.reference[c]-a[c]-n.rects.popper[d],m=a[c]-n.rects.reference[c],E=xn(i),_=E?c==="y"?E.clientHeight||0:E.clientWidth||0:0,x=g/2-m/2,w=f[v],h=_-p[d]-f[y],N=_/2-p[d]/2+x,R=ln(w,N,h),F=c;n.modifiersData[r]=(t={},t[F]=R,t.centerOffset=R-N,t)}}function $c(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||us(t.elements.popper,o)&&(t.elements.arrow=o))}const Mc={name:"arrow",enabled:!0,phase:"main",fn:Rc,effect:$c,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Ft(e){return e.split("-")[1]}var Ic={top:"auto",right:"auto",bottom:"auto",left:"auto"};function jc(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Bt(n*o)/o||0,y:Bt(r*o)/o||0}}function Jo(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,a=e.offsets,l=e.position,c=e.gpuAcceleration,u=e.adaptive,d=e.roundOffsets,f=e.isFixed,p=a.x,v=p===void 0?0:p,y=a.y,g=y===void 0?0:y,m=typeof d=="function"?d({x:v,y:g}):{x:v,y:g};v=m.x,g=m.y;var E=a.hasOwnProperty("x"),_=a.hasOwnProperty("y"),x=Re,w=Pe,h=window;if(u){var N=xn(n),R="clientHeight",F="clientWidth";if(N===_e(n)&&(N=at(n),Ze(N).position!=="static"&&l==="absolute"&&(R="scrollHeight",F="scrollWidth")),N=N,o===Pe||(o===Re||o===Ve)&&i===fn){w=Fe;var L=f&&N===h&&h.visualViewport?h.visualViewport.height:N[R];g-=L-r.height,g*=c?1:-1}if(o===Re||(o===Pe||o===Fe)&&i===fn){x=Ve;var V=f&&N===h&&h.visualViewport?h.visualViewport.width:N[F];v-=V-r.width,v*=c?1:-1}}var P=Object.assign({position:l},u&&Ic),T=d===!0?jc({x:v,y:g},_e(n)):{x:v,y:g};if(v=T.x,g=T.y,c){var O;return Object.assign({},P,(O={},O[w]=_?"0":"",O[x]=E?"0":"",O.transform=(h.devicePixelRatio||1)<=1?"translate("+v+"px, "+g+"px)":"translate3d("+v+"px, "+g+"px, 0)",O))}return Object.assign({},P,(t={},t[w]=_?g+"px":"",t[x]=E?v+"px":"",t.transform="",t))}function _c(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,a=i===void 0?!0:i,l=n.roundOffsets,c=l===void 0?!0:l,u={placement:Ue(t.placement),variation:Ft(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Jo(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Jo(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Ac={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:_c,data:{}};var Nn={passive:!0};function Dc(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,a=r.resize,l=a===void 0?!0:a,c=_e(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&u.forEach(function(d){d.addEventListener("scroll",n.update,Nn)}),l&&c.addEventListener("resize",n.update,Nn),function(){i&&u.forEach(function(d){d.removeEventListener("scroll",n.update,Nn)}),l&&c.removeEventListener("resize",n.update,Nn)}}const Bc={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Dc,data:{}};var Lc={left:"right",right:"left",bottom:"top",top:"bottom"};function Mn(e){return e.replace(/left|right|bottom|top/g,function(t){return Lc[t]})}var Fc={start:"end",end:"start"};function Zo(e){return e.replace(/start|end/g,function(t){return Fc[t]})}function Xr(e){var t=_e(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Yr(e){return Lt(at(e)).left+Xr(e).scrollLeft}function Vc(e,t){var n=_e(e),r=at(e),o=n.visualViewport,i=r.clientWidth,a=r.clientHeight,l=0,c=0;if(o){i=o.width,a=o.height;var u=cs();(u||!u&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:i,height:a,x:l+Yr(e),y:c}}function zc(e){var t,n=at(e),r=Xr(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=bt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=bt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Yr(e),c=-r.scrollTop;return Ze(o||n).direction==="rtl"&&(l+=bt(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:l,y:c}}function Jr(e){var t=Ze(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function hs(e){return["html","body","#document"].indexOf(qe(e))>=0?e.ownerDocument.body:Be(e)&&Jr(e)?e:hs(Kn(e))}function cn(e,t){var n;t===void 0&&(t=[]);var r=hs(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=_e(r),a=o?[i].concat(i.visualViewport||[],Jr(r)?r:[]):r,l=t.concat(a);return o?l:l.concat(cn(Kn(a)))}function Ir(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Uc(e,t){var n=Lt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Qo(e,t,n){return t===as?Ir(Vc(e,n)):wt(t)?Uc(t,n):Ir(zc(at(e)))}function Hc(e){var t=cn(Kn(e)),n=["absolute","fixed"].indexOf(Ze(e).position)>=0,r=n&&Be(e)?xn(e):e;return wt(r)?t.filter(function(o){return wt(o)&&us(o,r)&&qe(o)!=="body"}):[]}function qc(e,t,n,r){var o=t==="clippingParents"?Hc(e):[].concat(t),i=[].concat(o,[n]),a=i[0],l=i.reduce(function(c,u){var d=Qo(e,u,r);return c.top=bt(d.top,c.top),c.right=Fn(d.right,c.right),c.bottom=Fn(d.bottom,c.bottom),c.left=bt(d.left,c.left),c},Qo(e,a,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function ms(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ue(r):null,i=r?Ft(r):null,a=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Pe:c={x:a,y:t.y-n.height};break;case Fe:c={x:a,y:t.y+t.height};break;case Ve:c={x:t.x+t.width,y:l};break;case Re:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var u=o?Kr(o):null;if(u!=null){var d=u==="y"?"height":"width";switch(i){case Dt:c[u]=c[u]-(t[d]/2-n[d]/2);break;case fn:c[u]=c[u]+(t[d]/2-n[d]/2);break}}return c}function hn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,a=i===void 0?e.strategy:i,l=n.boundary,c=l===void 0?dc:l,u=n.rootBoundary,d=u===void 0?as:u,f=n.elementContext,p=f===void 0?Yt:f,v=n.altBoundary,y=v===void 0?!1:v,g=n.padding,m=g===void 0?0:g,E=ps(typeof m!="number"?m:fs(m,yn)),_=p===Yt?pc:Yt,x=e.rects.popper,w=e.elements[y?_:p],h=qc(wt(w)?w:w.contextElement||at(e.elements.popper),c,d,a),N=Lt(e.elements.reference),R=ms({reference:N,element:x,strategy:"absolute",placement:o}),F=Ir(Object.assign({},x,R)),L=p===Yt?F:N,V={top:h.top-L.top+E.top,bottom:L.bottom-h.bottom+E.bottom,left:h.left-L.left+E.left,right:L.right-h.right+E.right},P=e.modifiersData.offset;if(p===Yt&&P){var T=P[o];Object.keys(V).forEach(function(O){var $=[Ve,Fe].indexOf(O)>=0?1:-1,A=[Pe,Fe].indexOf(O)>=0?"y":"x";V[O]+=T[A]*$})}return V}function Gc(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,u=c===void 0?ls:c,d=Ft(r),f=d?l?Xo:Xo.filter(function(y){return Ft(y)===d}):yn,p=f.filter(function(y){return u.indexOf(y)>=0});p.length===0&&(p=f);var v=p.reduce(function(y,g){return y[g]=hn(e,{placement:g,boundary:o,rootBoundary:i,padding:a})[Ue(g)],y},{});return Object.keys(v).sort(function(y,g){return v[y]-v[g]})}function Wc(e){if(Ue(e)===qr)return[];var t=Mn(e);return[Zo(e),t,Zo(t)]}function Kc(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!0:a,c=n.fallbackPlacements,u=n.padding,d=n.boundary,f=n.rootBoundary,p=n.altBoundary,v=n.flipVariations,y=v===void 0?!0:v,g=n.allowedAutoPlacements,m=t.options.placement,E=Ue(m),_=E===m,x=c||(_||!y?[Mn(m)]:Wc(m)),w=[m].concat(x).reduce(function(U,q){return U.concat(Ue(q)===qr?Gc(t,{placement:q,boundary:d,rootBoundary:f,padding:u,flipVariations:y,allowedAutoPlacements:g}):q)},[]),h=t.rects.reference,N=t.rects.popper,R=new Map,F=!0,L=w[0],V=0;V<w.length;V++){var P=w[V],T=Ue(P),O=Ft(P)===Dt,$=[Pe,Fe].indexOf(T)>=0,A=$?"width":"height",I=hn(t,{placement:P,boundary:d,rootBoundary:f,altBoundary:p,padding:u}),z=$?O?Ve:Re:O?Fe:Pe;h[A]>N[A]&&(z=Mn(z));var J=Mn(z),Q=[];if(i&&Q.push(I[T]<=0),l&&Q.push(I[z]<=0,I[J]<=0),Q.every(function(U){return U})){L=P,F=!1;break}R.set(P,Q)}if(F)for(var C=y?3:1,B=function(q){var W=w.find(function(K){var G=R.get(K);if(G)return G.slice(0,q).every(function(Y){return Y})});if(W)return L=W,"break"},H=C;H>0;H--){var X=B(H);if(X==="break")break}t.placement!==L&&(t.modifiersData[r]._skip=!0,t.placement=L,t.reset=!0)}}const Xc={name:"flip",enabled:!0,phase:"main",fn:Kc,requiresIfExists:["offset"],data:{_skip:!1}};function ei(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ti(e){return[Pe,Ve,Fe,Re].some(function(t){return e[t]>=0})}function Yc(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=hn(t,{elementContext:"reference"}),l=hn(t,{altBoundary:!0}),c=ei(a,r),u=ei(l,o,i),d=ti(c),f=ti(u);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:u,isReferenceHidden:d,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":d,"data-popper-escaped":f})}const Jc={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Yc};function Zc(e,t,n){var r=Ue(e),o=[Re,Pe].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,a=i[0],l=i[1];return a=a||0,l=(l||0)*o,[Re,Ve].indexOf(r)>=0?{x:l,y:a}:{x:a,y:l}}function Qc(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,a=ls.reduce(function(d,f){return d[f]=Zc(f,t.rects,i),d},{}),l=a[t.placement],c=l.x,u=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=u),t.modifiersData[r]=a}const eu={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Qc};function tu(e){var t=e.state,n=e.name;t.modifiersData[n]=ms({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const nu={name:"popperOffsets",enabled:!0,phase:"read",fn:tu,data:{}};function ru(e){return e==="x"?"y":"x"}function ou(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!1:a,c=n.boundary,u=n.rootBoundary,d=n.altBoundary,f=n.padding,p=n.tether,v=p===void 0?!0:p,y=n.tetherOffset,g=y===void 0?0:y,m=hn(t,{boundary:c,rootBoundary:u,padding:f,altBoundary:d}),E=Ue(t.placement),_=Ft(t.placement),x=!_,w=Kr(E),h=ru(w),N=t.modifiersData.popperOffsets,R=t.rects.reference,F=t.rects.popper,L=typeof g=="function"?g(Object.assign({},t.rects,{placement:t.placement})):g,V=typeof L=="number"?{mainAxis:L,altAxis:L}:Object.assign({mainAxis:0,altAxis:0},L),P=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,T={x:0,y:0};if(N){if(i){var O,$=w==="y"?Pe:Re,A=w==="y"?Fe:Ve,I=w==="y"?"height":"width",z=N[w],J=z+m[$],Q=z-m[A],C=v?-F[I]/2:0,B=_===Dt?R[I]:F[I],H=_===Dt?-F[I]:-R[I],X=t.elements.arrow,U=v&&X?Wr(X):{width:0,height:0},q=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:ds(),W=q[$],K=q[A],G=ln(0,R[I],U[I]),Y=x?R[I]/2-C-G-W-V.mainAxis:B-G-W-V.mainAxis,Z=x?-R[I]/2+C+G+K+V.mainAxis:H+G+K+V.mainAxis,re=t.elements.arrow&&xn(t.elements.arrow),D=re?w==="y"?re.clientTop||0:re.clientLeft||0:0,ee=(O=P==null?void 0:P[w])!=null?O:0,M=z+Y-ee-D,oe=z+Z-ee,ye=ln(v?Fn(J,M):J,z,v?bt(Q,oe):Q);N[w]=ye,T[w]=ye-z}if(l){var Se,ge=w==="x"?Pe:Re,ct=w==="x"?Fe:Ve,Ce=N[h],We=h==="y"?"height":"width",$e=Ce+m[ge],Ke=Ce-m[ct],we=[Pe,Re].indexOf(E)!==-1,Tt=(Se=P==null?void 0:P[h])!=null?Se:0,ut=we?$e:Ce-R[We]-F[We]-Tt+V.altAxis,Ut=we?Ce+R[We]+F[We]-Tt-V.altAxis:Ke,kn=v&&we?Nc(ut,Ce,Ut):ln(v?ut:$e,Ce,v?Ut:Ke);N[h]=kn,T[h]=kn-Ce}t.modifiersData[r]=T}}const iu={name:"preventOverflow",enabled:!0,phase:"main",fn:ou,requiresIfExists:["offset"]};function su(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function au(e){return e===_e(e)||!Be(e)?Xr(e):su(e)}function lu(e){var t=e.getBoundingClientRect(),n=Bt(t.width)/e.offsetWidth||1,r=Bt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function cu(e,t,n){n===void 0&&(n=!1);var r=Be(t),o=Be(t)&&lu(t),i=at(t),a=Lt(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((qe(t)!=="body"||Jr(i))&&(l=au(t)),Be(t)?(c=Lt(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):i&&(c.x=Yr(i))),{x:a.left+l.scrollLeft-c.x,y:a.top+l.scrollTop-c.y,width:a.width,height:a.height}}function uu(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var a=[].concat(i.requires||[],i.requiresIfExists||[]);a.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function du(e){var t=uu(e);return Ec.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function pu(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function fu(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var ni={placement:"bottom",modifiers:[],strategy:"absolute"};function ri(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function hu(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?ni:o;return function(l,c,u){u===void 0&&(u=i);var d={placement:"bottom",orderedModifiers:[],options:Object.assign({},ni,i),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},f=[],p=!1,v={state:d,setOptions:function(E){var _=typeof E=="function"?E(d.options):E;g(),d.options=Object.assign({},i,d.options,_),d.scrollParents={reference:wt(l)?cn(l):l.contextElement?cn(l.contextElement):[],popper:cn(c)};var x=du(fu([].concat(r,d.options.modifiers)));return d.orderedModifiers=x.filter(function(w){return w.enabled}),y(),v.update()},forceUpdate:function(){if(!p){var E=d.elements,_=E.reference,x=E.popper;if(ri(_,x)){d.rects={reference:cu(_,xn(x),d.options.strategy==="fixed"),popper:Wr(x)},d.reset=!1,d.placement=d.options.placement,d.orderedModifiers.forEach(function(V){return d.modifiersData[V.name]=Object.assign({},V.data)});for(var w=0;w<d.orderedModifiers.length;w++){if(d.reset===!0){d.reset=!1,w=-1;continue}var h=d.orderedModifiers[w],N=h.fn,R=h.options,F=R===void 0?{}:R,L=h.name;typeof N=="function"&&(d=N({state:d,options:F,name:L,instance:v})||d)}}}},update:pu(function(){return new Promise(function(m){v.forceUpdate(),m(d)})}),destroy:function(){g(),p=!0}};if(!ri(l,c))return v;v.setOptions(u).then(function(m){!p&&u.onFirstUpdate&&u.onFirstUpdate(m)});function y(){d.orderedModifiers.forEach(function(m){var E=m.name,_=m.options,x=_===void 0?{}:_,w=m.effect;if(typeof w=="function"){var h=w({state:d,name:E,instance:v,options:x}),N=function(){};f.push(h||N)}})}function g(){f.forEach(function(m){return m()}),f=[]}return v}}var mu=[Bc,nu,Ac,Oc,eu,Xc,iu,Mc,Jc],gu=hu({defaultModifiers:mu});const gs="Popper";function bu(e){return ss(gs,e)}Kl(gs,["root"]);const vu=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],yu=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function xu(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function Vn(e){return typeof e=="function"?e():e}function Xn(e){return e.nodeType!==void 0}function wu(e){return!Xn(e)}const Eu=()=>et({root:["root"]},zl(bu)),Tu={},ku=k.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:a,disablePortal:l,modifiers:c,open:u,placement:d,popperOptions:f,popperRef:p,slotProps:v={},slots:y={},TransitionProps:g}=t,m=de(t,vu),E=k.useRef(null),_=Le(E,n),x=k.useRef(null),w=Le(x,p),h=k.useRef(w);yt(()=>{h.current=w},[w]),k.useImperativeHandle(p,()=>x.current,[]);const N=xu(d,a),[R,F]=k.useState(N),[L,V]=k.useState(Vn(o));k.useEffect(()=>{x.current&&x.current.forceUpdate()}),k.useEffect(()=>{o&&V(Vn(o))},[o]),yt(()=>{if(!L||!u)return;const A=J=>{F(J.placement)};if(process.env.NODE_ENV!=="production"&&L&&Xn(L)&&L.nodeType===1){const J=L.getBoundingClientRect();process.env.NODE_ENV!=="test"&&J.top===0&&J.left===0&&J.right===0&&J.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let I=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:J})=>{A(J)}}];c!=null&&(I=I.concat(c)),f&&f.modifiers!=null&&(I=I.concat(f.modifiers));const z=gu(L,E.current,S({placement:N},f,{modifiers:I}));return h.current(z),()=>{z.destroy(),h.current(null)}},[L,l,c,u,f,N]);const P={placement:R};g!==null&&(P.TransitionProps=g);const T=Eu(),O=(r=y.root)!=null?r:"div",$=xt({elementType:O,externalSlotProps:v.root,externalForwardedProps:m,additionalProps:{role:"tooltip",ref:_},ownerState:t,className:T.root});return b.jsx(O,S({},$,{children:typeof i=="function"?i(P):i}))}),bs=k.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:a="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:u,open:d,placement:f="bottom",popperOptions:p=Tu,popperRef:v,style:y,transition:g=!1,slotProps:m={},slots:E={}}=t,_=de(t,yu),[x,w]=k.useState(!0),h=()=>{w(!1)},N=()=>{w(!0)};if(!c&&!d&&(!g||x))return null;let R;if(i)R=i;else if(r){const V=Vn(r);R=V&&Xn(V)?ke(V).body:ke(null).body}const F=!d&&c&&(!g||x)?"none":void 0,L=g?{in:d,onEnter:h,onExited:N}:void 0;return b.jsx(pn,{disablePortal:l,container:R,children:b.jsx(ku,S({anchorEl:r,direction:a,disablePortal:l,modifiers:u,ref:n,open:g?!x:d,placement:f,popperOptions:p,popperRef:v,slotProps:m,slots:E},_,{style:S({position:"fixed",top:0,left:0,display:F},y),TransitionProps:L,children:o}))})});process.env.NODE_ENV!=="production"&&(bs.propTypes={anchorEl:zt(s.oneOfType([Je,s.object,s.func]),e=>{if(e.open){const t=Vn(e.anchorEl);if(t&&Xn(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||wu(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:s.oneOfType([s.node,s.func]),container:s.oneOfType([Je,s.func]),direction:s.oneOf(["ltr","rtl"]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:Hr,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),transition:s.bool});const Ou=["values","unit","step"],Su=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>S({},n,{[r.key]:r.val}),{})};function Cu(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=de(e,Ou),i=Su(t),a=Object.keys(i);function l(p){return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n})`}function c(p){return`@media (max-width:${(typeof t[p]=="number"?t[p]:p)-r/100}${n})`}function u(p,v){const y=a.indexOf(v);return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n}) and (max-width:${(y!==-1&&typeof t[a[y]]=="number"?t[a[y]]:v)-r/100}${n})`}function d(p){return a.indexOf(p)+1<a.length?u(p,a[a.indexOf(p)+1]):l(p)}function f(p){const v=a.indexOf(p);return v===0?l(a[1]):v===a.length-1?c(a[v]):u(p,a[a.indexOf(p)+1]).replace("@media","@media not all and")}return S({keys:a,values:i,up:l,down:c,between:u,only:d,not:f,unit:n},o)}const Nu={borderRadius:4},Pu=Nu,Ru=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.string,s.object,s.array]):{},lt=Ru;function un(e,t){return t?Ye(e,t,{clone:!1}):e}const Zr={xs:0,sm:600,md:900,lg:1200,xl:1536},oi={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Zr[e]}px)`};function Qe(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||oi;return t.reduce((a,l,c)=>(a[i.up(i.keys[c])]=n(t[c]),a),{})}if(typeof t=="object"){const i=r.breakpoints||oi;return Object.keys(t).reduce((a,l)=>{if(Object.keys(i.values||Zr).indexOf(l)!==-1){const c=i.up(l);a[c]=n(t[l],l)}else{const c=l;a[c]=t[c]}return a},{})}return n(t)}function $u(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function Mu(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Yn(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function zn(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Yn(e,n)||r,t&&(o=t(o,r,e)),o}function ve(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=a=>{if(a[t]==null)return null;const l=a[t],c=a.theme,u=Yn(c,r)||{};return Qe(a,l,f=>{let p=zn(u,o,f);return f===p&&typeof f=="string"&&(p=zn(u,o,`${t}${f==="default"?"":He(f)}`,f)),n===!1?p:{[n]:p}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:lt}:{},i.filterProps=[t],i}function Iu(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const ju={m:"margin",p:"padding"},_u={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},ii={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Au=Iu(e=>{if(e.length>2)if(ii[e])e=ii[e];else return[e];const[t,n]=e.split(""),r=ju[t],o=_u[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),Jn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Zn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Du=[...Jn,...Zn];function wn(e,t,n,r){var o;const i=(o=Yn(e,t,!1))!=null?o:n;return typeof i=="number"?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&typeof a!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`),i*a):Array.isArray(i)?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&(Number.isInteger(a)?a>i.length-1&&console.error([`MUI: The value provided (${a}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${a} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[a]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function vs(e){return wn(e,"spacing",8,"spacing")}function En(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Bu(e,t){return n=>e.reduce((r,o)=>(r[o]=En(t,n),r),{})}function Lu(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=Au(n),i=Bu(o,r),a=e[n];return Qe(e,a,i)}function ys(e,t){const n=vs(e.theme);return Object.keys(e).map(r=>Lu(e,t,r,n)).reduce(un,{})}function he(e){return ys(e,Jn)}he.propTypes=process.env.NODE_ENV!=="production"?Jn.reduce((e,t)=>(e[t]=lt,e),{}):{};he.filterProps=Jn;function me(e){return ys(e,Zn)}me.propTypes=process.env.NODE_ENV!=="production"?Zn.reduce((e,t)=>(e[t]=lt,e),{}):{};me.filterProps=Zn;process.env.NODE_ENV!=="production"&&Du.reduce((e,t)=>(e[t]=lt,e),{});function Fu(e=8){if(e.mui)return e;const t=vs({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const a=t(i);return typeof a=="number"?`${a}px`:a}).join(" "));return n.mui=!0,n}function Qn(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?un(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function De(e){return typeof e!="number"?e:`${e}px solid`}function ze(e,t){return ve({prop:e,themeKey:"borders",transform:t})}const Vu=ze("border",De),zu=ze("borderTop",De),Uu=ze("borderRight",De),Hu=ze("borderBottom",De),qu=ze("borderLeft",De),Gu=ze("borderColor"),Wu=ze("borderTopColor"),Ku=ze("borderRightColor"),Xu=ze("borderBottomColor"),Yu=ze("borderLeftColor"),Ju=ze("outline",De),Zu=ze("outlineColor"),er=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=wn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:En(t,r)});return Qe(e,e.borderRadius,n)}return null};er.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:lt}:{};er.filterProps=["borderRadius"];Qn(Vu,zu,Uu,Hu,qu,Gu,Wu,Ku,Xu,Yu,er,Ju,Zu);const tr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=wn(e.theme,"spacing",8,"gap"),n=r=>({gap:En(t,r)});return Qe(e,e.gap,n)}return null};tr.propTypes=process.env.NODE_ENV!=="production"?{gap:lt}:{};tr.filterProps=["gap"];const nr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=wn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:En(t,r)});return Qe(e,e.columnGap,n)}return null};nr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:lt}:{};nr.filterProps=["columnGap"];const rr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=wn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:En(t,r)});return Qe(e,e.rowGap,n)}return null};rr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:lt}:{};rr.filterProps=["rowGap"];const Qu=ve({prop:"gridColumn"}),ed=ve({prop:"gridRow"}),td=ve({prop:"gridAutoFlow"}),nd=ve({prop:"gridAutoColumns"}),rd=ve({prop:"gridAutoRows"}),od=ve({prop:"gridTemplateColumns"}),id=ve({prop:"gridTemplateRows"}),sd=ve({prop:"gridTemplateAreas"}),ad=ve({prop:"gridArea"});Qn(tr,nr,rr,Qu,ed,td,nd,rd,od,id,sd,ad);function jt(e,t){return t==="grey"?t:e}const ld=ve({prop:"color",themeKey:"palette",transform:jt}),cd=ve({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:jt}),ud=ve({prop:"backgroundColor",themeKey:"palette",transform:jt});Qn(ld,cd,ud);function je(e){return e<=1&&e!==0?`${e*100}%`:e}const dd=ve({prop:"width",transform:je}),Qr=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Zr[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:je(n)}};return Qe(e,e.maxWidth,t)}return null};Qr.filterProps=["maxWidth"];const pd=ve({prop:"minWidth",transform:je}),fd=ve({prop:"height",transform:je}),hd=ve({prop:"maxHeight",transform:je}),md=ve({prop:"minHeight",transform:je});ve({prop:"size",cssProperty:"width",transform:je});ve({prop:"size",cssProperty:"height",transform:je});const gd=ve({prop:"boxSizing"});Qn(dd,Qr,pd,fd,hd,md,gd);const bd={border:{themeKey:"borders",transform:De},borderTop:{themeKey:"borders",transform:De},borderRight:{themeKey:"borders",transform:De},borderBottom:{themeKey:"borders",transform:De},borderLeft:{themeKey:"borders",transform:De},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:De},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:er},color:{themeKey:"palette",transform:jt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:jt},backgroundColor:{themeKey:"palette",transform:jt},p:{style:me},pt:{style:me},pr:{style:me},pb:{style:me},pl:{style:me},px:{style:me},py:{style:me},padding:{style:me},paddingTop:{style:me},paddingRight:{style:me},paddingBottom:{style:me},paddingLeft:{style:me},paddingX:{style:me},paddingY:{style:me},paddingInline:{style:me},paddingInlineStart:{style:me},paddingInlineEnd:{style:me},paddingBlock:{style:me},paddingBlockStart:{style:me},paddingBlockEnd:{style:me},m:{style:he},mt:{style:he},mr:{style:he},mb:{style:he},ml:{style:he},mx:{style:he},my:{style:he},margin:{style:he},marginTop:{style:he},marginRight:{style:he},marginBottom:{style:he},marginLeft:{style:he},marginX:{style:he},marginY:{style:he},marginInline:{style:he},marginInlineStart:{style:he},marginInlineEnd:{style:he},marginBlock:{style:he},marginBlockStart:{style:he},marginBlockEnd:{style:he},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:tr},rowGap:{style:rr},columnGap:{style:nr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:je},maxWidth:{style:Qr},minWidth:{transform:je},height:{transform:je},maxHeight:{transform:je},minHeight:{transform:je},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},eo=bd;function vd(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function yd(e,t){return typeof e=="function"?e(t):e}function xd(){function e(n,r,o,i){const a={[n]:r,theme:o},l=i[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:u,transform:d,style:f}=l;if(r==null)return null;if(u==="typography"&&r==="inherit")return{[n]:r};const p=Yn(o,u)||{};return f?f(a):Qe(a,r,y=>{let g=zn(p,d,y);return y===g&&typeof y=="string"&&(g=zn(p,d,`${n}${y==="default"?"":He(y)}`,y)),c===!1?g:{[c]:g}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const a=(r=i.unstable_sxConfig)!=null?r:eo;function l(c){let u=c;if(typeof c=="function")u=c(i);else if(typeof c!="object")return c;if(!u)return null;const d=$u(i.breakpoints),f=Object.keys(d);let p=d;return Object.keys(u).forEach(v=>{const y=yd(u[v],i);if(y!=null)if(typeof y=="object")if(a[v])p=un(p,e(v,y,i,a));else{const g=Qe({theme:i},y,m=>({[v]:m}));vd(g,y)?p[v]=t({sx:y,theme:i}):p=un(p,g)}else p=un(p,e(v,y,i,a))}),Mu(f,p)}return Array.isArray(o)?o.map(l):l(o)}return t}const xs=xd();xs.filterProps=["sx"];const to=xs;function wd(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Ed=["breakpoints","palette","spacing","shape"];function no(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,a=de(e,Ed),l=Cu(n),c=Fu(o);let u=Ye({breakpoints:l,direction:"ltr",components:{},palette:S({mode:"light"},r),spacing:c,shape:S({},Pu,i)},a);return u.applyStyles=wd,u=t.reduce((d,f)=>Ye(d,f),u),u.unstable_sxConfig=S({},eo,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(f){return to({sx:f,theme:this})},u}function Td(e){return Object.keys(e).length===0}function ws(e=null){const t=k.useContext(Or.ThemeContext);return!t||Td(t)?e:t}const kd=no();function Es(e=kd){return ws(e)}const Od=["ownerState"],Sd=["variants"],Cd=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Nd(e){return Object.keys(e).length===0}function Pd(e){return typeof e=="string"&&e.charCodeAt(0)>96}function In(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Rd=no(),si=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Pn({defaultTheme:e,theme:t,themeId:n}){return Nd(t)?e:t[n]||t}function $d(e){return e?(t,n)=>n[e]:null}function jn(e,t){let{ownerState:n}=t,r=de(t,Od);const o=typeof e=="function"?e(S({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>jn(i,S({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let l=de(o,Sd);return i.forEach(c=>{let u=!0;typeof c.props=="function"?u=c.props(S({ownerState:n},r,n)):Object.keys(c.props).forEach(d=>{(n==null?void 0:n[d])!==c.props[d]&&r[d]!==c.props[d]&&(u=!1)}),u&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(S({ownerState:n},r,n)):c.style))}),l}return o}function Md(e={}){const{themeId:t,defaultTheme:n=Rd,rootShouldForwardProp:r=In,slotShouldForwardProp:o=In}=e,i=a=>to(S({},a,{theme:Pn(S({},a,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(a,l={})=>{Or.internal_processStyles(a,h=>h.filter(N=>!(N!=null&&N.__mui_systemSx)));const{name:c,slot:u,skipVariantsResolver:d,skipSx:f,overridesResolver:p=$d(si(u))}=l,v=de(l,Cd),y=d!==void 0?d:u&&u!=="Root"&&u!=="root"||!1,g=f||!1;let m;process.env.NODE_ENV!=="production"&&c&&(m=`${c}-${si(u||"Root")}`);let E=In;u==="Root"||u==="root"?E=r:u?E=o:Pd(a)&&(E=void 0);const _=Or(a,S({shouldForwardProp:E,label:m},v)),x=h=>typeof h=="function"&&h.__emotion_real!==h||mt(h)?N=>jn(h,S({},N,{theme:Pn({theme:N.theme,defaultTheme:n,themeId:t})})):h,w=(h,...N)=>{let R=x(h);const F=N?N.map(x):[];c&&p&&F.push(P=>{const T=Pn(S({},P,{defaultTheme:n,themeId:t}));if(!T.components||!T.components[c]||!T.components[c].styleOverrides)return null;const O=T.components[c].styleOverrides,$={};return Object.entries(O).forEach(([A,I])=>{$[A]=jn(I,S({},P,{theme:T}))}),p(P,$)}),c&&!y&&F.push(P=>{var T;const O=Pn(S({},P,{defaultTheme:n,themeId:t})),$=O==null||(T=O.components)==null||(T=T[c])==null?void 0:T.variants;return jn({variants:$},S({},P,{theme:O}))}),g||F.push(i);const L=F.length-N.length;if(Array.isArray(h)&&L>0){const P=new Array(L).fill("");R=[...h,...P],R.raw=[...h.raw,...P]}const V=_(R,...F);if(process.env.NODE_ENV!=="production"){let P;c&&(P=`${c}${He(u||"")}`),P===void 0&&(P=`Styled(${gl(a)})`),V.displayName=P}return a.muiName&&(V.muiName=a.muiName),V};return _.withConfig&&(w.withConfig=_.withConfig),w}}function Id(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:es(t.components[n].defaultProps,r)}function jd({props:e,name:t,defaultTheme:n,themeId:r}){let o=Es(n);return r&&(o=o[r]||o),Id({theme:o,name:t,props:e})}function ro(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Ll(e,t,n)}function _d(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Et(e){if(e.type)return e;if(e.charAt(0)==="#")return Et(_d(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:_t(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:_t(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function or(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function Ad(e){e=Et(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),a=(u,d=(u+n/30)%12)=>o-i*Math.max(Math.min(d-3,9-d,1),-1);let l="rgb";const c=[Math.round(a(0)*255),Math.round(a(8)*255),Math.round(a(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),or({type:l,values:c})}function ai(e){e=Et(e);let t=e.type==="hsl"||e.type==="hsla"?Et(Ad(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function li(e,t){const n=ai(e),r=ai(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function Un(e,t){return e=Et(e),t=ro(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,or(e)}function Dd(e,t){if(e=Et(e),t=ro(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return or(e)}function Bd(e,t){if(e=Et(e),t=ro(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return or(e)}function Ld(e,t){return S({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const Fd={black:"#000",white:"#fff"},mn=Fd,Vd={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},zd=Vd,Ud={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ot=Ud,Hd={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},St=Hd,qd={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Jt=qd,Gd={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ct=Gd,Wd={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Nt=Wd,Kd={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Pt=Kd,Xd=["mode","contrastThreshold","tonalOffset"],ci={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:mn.white,default:mn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},vr={text:{primary:mn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:mn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function ui(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=Bd(e.main,o):t==="dark"&&(e.dark=Dd(e.main,i)))}function Yd(e="light"){return e==="dark"?{main:Ct[200],light:Ct[50],dark:Ct[400]}:{main:Ct[700],light:Ct[400],dark:Ct[800]}}function Jd(e="light"){return e==="dark"?{main:Ot[200],light:Ot[50],dark:Ot[400]}:{main:Ot[500],light:Ot[300],dark:Ot[700]}}function Zd(e="light"){return e==="dark"?{main:St[500],light:St[300],dark:St[700]}:{main:St[700],light:St[400],dark:St[800]}}function Qd(e="light"){return e==="dark"?{main:Nt[400],light:Nt[300],dark:Nt[700]}:{main:Nt[700],light:Nt[500],dark:Nt[900]}}function ep(e="light"){return e==="dark"?{main:Pt[400],light:Pt[300],dark:Pt[700]}:{main:Pt[800],light:Pt[500],dark:Pt[900]}}function tp(e="light"){return e==="dark"?{main:Jt[400],light:Jt[300],dark:Jt[700]}:{main:"#ed6c02",light:Jt[500],dark:Jt[900]}}function np(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=de(e,Xd),i=e.primary||Yd(t),a=e.secondary||Jd(t),l=e.error||Zd(t),c=e.info||Qd(t),u=e.success||ep(t),d=e.warning||tp(t);function f(g){const m=li(g,vr.text.primary)>=n?vr.text.primary:ci.text.primary;if(process.env.NODE_ENV!=="production"){const E=li(g,m);E<3&&console.error([`MUI: The contrast ratio of ${E}:1 for ${m} on ${g}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return m}const p=({color:g,name:m,mainShade:E=500,lightShade:_=300,darkShade:x=700})=>{if(g=S({},g),!g.main&&g[E]&&(g.main=g[E]),!g.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${m?` (${m})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.`:_t(11,m?` (${m})`:"",E));if(typeof g.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${m?` (${m})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(g.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:_t(12,m?` (${m})`:"",JSON.stringify(g.main)));return ui(g,"light",_,r),ui(g,"dark",x,r),g.contrastText||(g.contrastText=f(g.main)),g},v={dark:vr,light:ci};return process.env.NODE_ENV!=="production"&&(v[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),Ye(S({common:S({},mn),mode:t,primary:p({color:i,name:"primary"}),secondary:p({color:a,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:p({color:l,name:"error"}),warning:p({color:d,name:"warning"}),info:p({color:c,name:"info"}),success:p({color:u,name:"success"}),grey:zd,contrastThreshold:n,getContrastText:f,augmentColor:p,tonalOffset:r},v[t]),o)}const rp=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function op(e){return Math.round(e*1e5)/1e5}const di={textTransform:"uppercase"},pi='"Roboto", "Helvetica", "Arial", sans-serif';function ip(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=pi,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:a=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:u=16,allVariants:d,pxToRem:f}=n,p=de(n,rp);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const v=o/14,y=f||(E=>`${E/u*v}rem`),g=(E,_,x,w,h)=>S({fontFamily:r,fontWeight:E,fontSize:y(_),lineHeight:x},r===pi?{letterSpacing:`${op(w/_)}em`}:{},h,d),m={h1:g(i,96,1.167,-1.5),h2:g(i,60,1.2,-.5),h3:g(a,48,1.167,0),h4:g(a,34,1.235,.25),h5:g(a,24,1.334,0),h6:g(l,20,1.6,.15),subtitle1:g(a,16,1.75,.15),subtitle2:g(l,14,1.57,.1),body1:g(a,16,1.5,.15),body2:g(a,14,1.43,.15),button:g(l,14,1.75,.4,di),caption:g(a,12,1.66,.4),overline:g(a,12,2.66,1,di),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return Ye(S({htmlFontSize:u,pxToRem:y,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:a,fontWeightMedium:l,fontWeightBold:c},m),p,{clone:!1})}const sp=.2,ap=.14,lp=.12;function pe(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${sp})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${ap})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${lp})`].join(",")}const cp=["none",pe(0,2,1,-1,0,1,1,0,0,1,3,0),pe(0,3,1,-2,0,2,2,0,0,1,5,0),pe(0,3,3,-2,0,3,4,0,0,1,8,0),pe(0,2,4,-1,0,4,5,0,0,1,10,0),pe(0,3,5,-1,0,5,8,0,0,1,14,0),pe(0,3,5,-1,0,6,10,0,0,1,18,0),pe(0,4,5,-2,0,7,10,1,0,2,16,1),pe(0,5,5,-3,0,8,10,1,0,3,14,2),pe(0,5,6,-3,0,9,12,1,0,3,16,2),pe(0,6,6,-3,0,10,14,1,0,4,18,3),pe(0,6,7,-4,0,11,15,1,0,4,20,3),pe(0,7,8,-4,0,12,17,2,0,5,22,4),pe(0,7,8,-4,0,13,19,2,0,5,24,4),pe(0,7,9,-4,0,14,21,2,0,5,26,4),pe(0,8,9,-5,0,15,22,2,0,6,28,5),pe(0,8,10,-5,0,16,24,2,0,6,30,5),pe(0,8,11,-5,0,17,26,2,0,6,32,5),pe(0,9,11,-5,0,18,28,2,0,7,34,6),pe(0,9,12,-6,0,19,29,2,0,7,36,6),pe(0,10,13,-6,0,20,31,3,0,8,38,7),pe(0,10,13,-6,0,21,33,3,0,8,40,7),pe(0,10,14,-6,0,22,35,3,0,8,42,7),pe(0,11,14,-7,0,23,36,3,0,9,44,8),pe(0,11,15,-7,0,24,38,3,0,9,46,8)],up=cp,dp=["duration","easing","delay"],pp={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},fp={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function fi(e){return`${Math.round(e)}ms`}function hp(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function mp(e){const t=S({},pp,e.easing),n=S({},fp,e.duration);return S({getAutoHeightDuration:hp,create:(o=["all"],i={})=>{const{duration:a=n.standard,easing:l=t.easeInOut,delay:c=0}=i,u=de(i,dp);if(process.env.NODE_ENV!=="production"){const d=p=>typeof p=="string",f=p=>!isNaN(parseFloat(p));!d(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!f(a)&&!d(a)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`),d(l)||console.error('MUI: Argument "easing" must be a string.'),!f(c)&&!d(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(d=>`${d} ${typeof a=="string"?a:fi(a)} ${l} ${typeof c=="string"?c:fi(c)}`).join(",")}},e,{easing:t,duration:n})}const gp={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},bp=gp,vp=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function yp(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,a=de(e,vp);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":_t(18));const l=np(r),c=no(e);let u=Ye(c,{mixins:Ld(c.breakpoints,n),palette:l,shadows:up.slice(),typography:ip(l,i),transitions:mp(o),zIndex:S({},bp)});if(u=Ye(u,a),u=t.reduce((d,f)=>Ye(d,f),u),process.env.NODE_ENV!=="production"){const d=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],f=(p,v)=>{let y;for(y in p){const g=p[y];if(d.indexOf(y)!==-1&&Object.keys(g).length>0){if(process.env.NODE_ENV!=="production"){const m=Ge("",y);console.error([`MUI: The \`${v}\` component increases the CSS specificity of the \`${y}\` internal state.`,"You can not override it like this: ",JSON.stringify(p,null,2),"",`Instead, you need to use the '&.${m}' syntax:`,JSON.stringify({root:{[`&.${m}`]:g}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}p[y]={}}}};Object.keys(u.components).forEach(p=>{const v=u.components[p].styleOverrides;v&&p.indexOf("Mui")===0&&f(v,p)})}return u.unstable_sxConfig=S({},eo,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(f){return to({sx:f,theme:this})},u}const xp=yp(),oo=xp,io="$$material",Ts=e=>In(e)&&e!=="classes",wp=Md({themeId:io,defaultTheme:oo,rootShouldForwardProp:Ts}),Oe=wp;function Tn(){const e=Es(oo);return process.env.NODE_ENV!=="production"&&k.useDebugValue(e),e[io]||e}function tt({props:e,name:t}){return jd({props:e,name:t,defaultTheme:oo,themeId:io})}function jr(e,t){return jr=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},jr(e,t)}function Ep(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,jr(e,t)}const hi={disabled:!1};var Tp=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.shape({enter:s.number,exit:s.number,appear:s.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&s.oneOfType([s.string,s.shape({enter:s.string,exit:s.string,active:s.string}),s.shape({enter:s.string,enterDone:s.string,enterActive:s.string,exit:s.string,exitDone:s.string,exitActive:s.string})]);const ks=j.createContext(null);var kp=function(t){return t.scrollTop},rn="unmounted",pt="exited",ft="entering",Mt="entered",_r="exiting",nt=function(e){Ep(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var a=o,l=a&&!a.isMounting?r.enter:r.appear,c;return i.appearStatus=null,r.in?l?(c=pt,i.appearStatus=ft):c=Mt:r.unmountOnExit||r.mountOnEnter?c=rn:c=pt,i.state={status:c},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var a=o.in;return a&&i.status===rn?{status:pt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var a=this.state.status;this.props.in?a!==ft&&a!==Mt&&(i=ft):(a===ft||a===Mt)&&(i=_r)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,a,l;return i=a=l=o,o!=null&&typeof o!="number"&&(i=o.exit,a=o.enter,l=o.appear!==void 0?o.appear:a),{exit:i,enter:a,appear:l}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===ft){if(this.props.unmountOnExit||this.props.mountOnEnter){var a=this.props.nodeRef?this.props.nodeRef.current:en.findDOMNode(this);a&&kp(a)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===pt&&this.setState({status:rn})},n.performEnter=function(o){var i=this,a=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[en.findDOMNode(this),l],u=c[0],d=c[1],f=this.getTimeouts(),p=l?f.appear:f.enter;if(!o&&!a||hi.disabled){this.safeSetState({status:Mt},function(){i.props.onEntered(u)});return}this.props.onEnter(u,d),this.safeSetState({status:ft},function(){i.props.onEntering(u,d),i.onTransitionEnd(p,function(){i.safeSetState({status:Mt},function(){i.props.onEntered(u,d)})})})},n.performExit=function(){var o=this,i=this.props.exit,a=this.getTimeouts(),l=this.props.nodeRef?void 0:en.findDOMNode(this);if(!i||hi.disabled){this.safeSetState({status:pt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:_r},function(){o.props.onExiting(l),o.onTransitionEnd(a.exit,function(){o.safeSetState({status:pt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,a=!0;return this.nextCallback=function(l){a&&(a=!1,i.nextCallback=null,o(l))},this.nextCallback.cancel=function(){a=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var a=this.props.nodeRef?this.props.nodeRef.current:en.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!a||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[a,this.nextCallback],u=c[0],d=c[1];this.props.addEndListener(u,d)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===rn)return null;var i=this.props,a=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var l=de(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return j.createElement(ks.Provider,{value:null},typeof a=="function"?a(o,l):j.cloneElement(j.Children.only(a),l))},t}(j.Component);nt.contextType=ks;nt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:s.shape({current:typeof Element>"u"?s.any:function(e,t,n,r,o,i){var a=e[t];return s.instanceOf(a&&"ownerDocument"in a?a.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:s.oneOfType([s.func.isRequired,s.element.isRequired]).isRequired,in:s.bool,mountOnEnter:s.bool,unmountOnExit:s.bool,appear:s.bool,enter:s.bool,exit:s.bool,timeout:function(t){var n=Tp;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:s.func,onEnter:s.func,onEntering:s.func,onEntered:s.func,onExit:s.func,onExiting:s.func,onExited:s.func}:{};function Rt(){}nt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Rt,onEntering:Rt,onEntered:Rt,onExit:Rt,onExiting:Rt,onExited:Rt};nt.UNMOUNTED=rn;nt.EXITED=pt;nt.ENTERING=ft;nt.ENTERED=Mt;nt.EXITING=_r;const Os=nt,Ss=e=>e.scrollTop;function Hn(e,t){var n,r;const{timeout:o,easing:i,style:a={}}=e;return{duration:(n=a.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=a.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:a.transitionDelay}}const Op=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function Ar(e){return`scale(${e}, ${e**2})`}const Sp={entering:{opacity:1,transform:Ar(1)},entered:{opacity:1,transform:"none"}},yr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),so=k.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:a,in:l,onEnter:c,onEntered:u,onEntering:d,onExit:f,onExited:p,onExiting:v,style:y,timeout:g="auto",TransitionComponent:m=Os}=t,E=de(t,Op),_=tn(),x=k.useRef(),w=Tn(),h=k.useRef(null),N=Le(h,i.ref,n),R=A=>I=>{if(A){const z=h.current;I===void 0?A(z):A(z,I)}},F=R(d),L=R((A,I)=>{Ss(A);const{duration:z,delay:J,easing:Q}=Hn({style:y,timeout:g,easing:a},{mode:"enter"});let C;g==="auto"?(C=w.transitions.getAutoHeightDuration(A.clientHeight),x.current=C):C=z,A.style.transition=[w.transitions.create("opacity",{duration:C,delay:J}),w.transitions.create("transform",{duration:yr?C:C*.666,delay:J,easing:Q})].join(","),c&&c(A,I)}),V=R(u),P=R(v),T=R(A=>{const{duration:I,delay:z,easing:J}=Hn({style:y,timeout:g,easing:a},{mode:"exit"});let Q;g==="auto"?(Q=w.transitions.getAutoHeightDuration(A.clientHeight),x.current=Q):Q=I,A.style.transition=[w.transitions.create("opacity",{duration:Q,delay:z}),w.transitions.create("transform",{duration:yr?Q:Q*.666,delay:yr?z:z||Q*.333,easing:J})].join(","),A.style.opacity=0,A.style.transform=Ar(.75),f&&f(A)}),O=R(p),$=A=>{g==="auto"&&_.start(x.current||0,A),r&&r(h.current,A)};return b.jsx(m,S({appear:o,in:l,nodeRef:h,onEnter:L,onEntered:V,onEntering:F,onExit:T,onExited:O,onExiting:P,addEndListener:$,timeout:g==="auto"?null:g},E,{children:(A,I)=>k.cloneElement(i,S({style:S({opacity:0,transform:Ar(.75),visibility:A==="exited"&&!l?"hidden":void 0},Sp[A],y,i.props.style),ref:N},I))}))});process.env.NODE_ENV!=="production"&&(so.propTypes={addEndListener:s.func,appear:s.bool,children:bn.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});so.muiSupportAuto=!0;const Dr=so,Cp=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},mi=Cp,Np=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Pp=Oe(bs,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Cs=k.forwardRef(function(t,n){var r;const o=ws(),i=tt({props:t,name:"MuiPopper"}),{anchorEl:a,component:l,components:c,componentsProps:u,container:d,disablePortal:f,keepMounted:p,modifiers:v,open:y,placement:g,popperOptions:m,popperRef:E,transition:_,slots:x,slotProps:w}=i,h=de(i,Np),N=(r=x==null?void 0:x.root)!=null?r:c==null?void 0:c.Root,R=S({anchorEl:a,container:d,disablePortal:f,keepMounted:p,modifiers:v,open:y,placement:g,popperOptions:m,popperRef:E,transition:_},h);return b.jsx(Pp,S({as:l,direction:o==null?void 0:o.direction,slots:{root:N},slotProps:w??u},R,{ref:n}))});process.env.NODE_ENV!=="production"&&(Cs.propTypes={anchorEl:s.oneOfType([Je,s.object,s.func]),children:s.oneOfType([s.node,s.func]),component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Je,s.func]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:Hr,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transition:s.bool});const Ns=Cs;function Rp(e){return Ge("MuiTooltip",e)}const $p=st("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),it=$p,Mp=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Ip(e){return Math.round(e*1e5)/1e5}const jp=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,a={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${He(i.split("-")[0])}`],arrow:["arrow"]};return et(a,Rp,t)},_p=Oe(Ns,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>S({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${it.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${it.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${it.arrow}`]:S({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${it.arrow}`]:S({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Ap=Oe("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${He(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>S({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:Un(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Ip(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${it.popper}[data-popper-placement*="left"] &`]:S({transformOrigin:"right center"},t.isRtl?S({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):S({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${it.popper}[data-popper-placement*="right"] &`]:S({transformOrigin:"left center"},t.isRtl?S({marginRight:"14px"},t.touch&&{marginRight:"24px"}):S({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${it.popper}[data-popper-placement*="top"] &`]:S({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${it.popper}[data-popper-placement*="bottom"] &`]:S({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Dp=Oe("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:Un(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Rn=!1;const gi=new vn;let Zt={x:0,y:0};function $n(e,t){return n=>{t&&t(n),e(n)}}const Ps=k.forwardRef(function(t,n){var r,o,i,a,l,c,u,d,f,p,v,y,g,m,E,_,x,w,h;const N=tt({props:t,name:"MuiTooltip"}),{arrow:R=!1,children:F,components:L={},componentsProps:V={},describeChild:P=!1,disableFocusListener:T=!1,disableHoverListener:O=!1,disableInteractive:$=!1,disableTouchListener:A=!1,enterDelay:I=100,enterNextDelay:z=0,enterTouchDelay:J=700,followCursor:Q=!1,id:C,leaveDelay:B=0,leaveTouchDelay:H=1500,onClose:X,onOpen:U,open:q,placement:W="bottom",PopperComponent:K,PopperProps:G={},slotProps:Y={},slots:Z={},title:re,TransitionComponent:D=Dr,TransitionProps:ee}=N,M=de(N,Mp),oe=k.isValidElement(F)?F:b.jsx("span",{children:F}),ye=Tn(),Se=ye.direction==="rtl",[ge,ct]=k.useState(),[Ce,We]=k.useState(null),$e=k.useRef(!1),Ke=$||Q,we=tn(),Tt=tn(),ut=tn(),Ut=tn(),[kn,po]=Ki({controlled:q,default:!1,name:"Tooltip",state:"open"});let Xe=kn;if(process.env.NODE_ENV!=="production"){const{current:te}=k.useRef(q!==void 0);k.useEffect(()=>{ge&&ge.disabled&&!te&&re!==""&&ge.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[re,ge,te])}const ir=Wi(C),Ht=k.useRef(),On=dn(()=>{Ht.current!==void 0&&(document.body.style.WebkitUserSelect=Ht.current,Ht.current=void 0),Ut.clear()});k.useEffect(()=>On,[On]);const fo=te=>{gi.clear(),Rn=!0,po(!0),U&&!Xe&&U(te)},Sn=dn(te=>{gi.start(800+B,()=>{Rn=!1}),po(!1),X&&Xe&&X(te),we.start(ye.transitions.duration.shortest,()=>{$e.current=!1})}),sr=te=>{$e.current&&te.type!=="touchstart"||(ge&&ge.removeAttribute("title"),Tt.clear(),ut.clear(),I||Rn&&z?Tt.start(Rn?z:I,()=>{fo(te)}):fo(te))},ho=te=>{Tt.clear(),ut.start(B,()=>{Sn(te)})},{isFocusVisibleRef:mo,onBlur:Xs,onFocus:Ys,ref:Js}=Xi(),[,go]=k.useState(!1),bo=te=>{Xs(te),mo.current===!1&&(go(!1),ho(te))},vo=te=>{ge||ct(te.currentTarget),Ys(te),mo.current===!0&&(go(!0),sr(te))},yo=te=>{$e.current=!0;const Me=oe.props;Me.onTouchStart&&Me.onTouchStart(te)},xo=sr,wo=ho,Zs=te=>{yo(te),ut.clear(),we.clear(),On(),Ht.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Ut.start(J,()=>{document.body.style.WebkitUserSelect=Ht.current,sr(te)})},Qs=te=>{oe.props.onTouchEnd&&oe.props.onTouchEnd(te),On(),ut.start(H,()=>{Sn(te)})};k.useEffect(()=>{if(!Xe)return;function te(Me){(Me.key==="Escape"||Me.key==="Esc")&&Sn(Me)}return document.addEventListener("keydown",te),()=>{document.removeEventListener("keydown",te)}},[Sn,Xe]);const ea=Le(oe.ref,Js,ct,n);!re&&re!==0&&(Xe=!1);const ar=k.useRef(),ta=te=>{const Me=oe.props;Me.onMouseMove&&Me.onMouseMove(te),Zt={x:te.clientX,y:te.clientY},ar.current&&ar.current.update()},qt={},lr=typeof re=="string";P?(qt.title=!Xe&&lr&&!O?re:null,qt["aria-describedby"]=Xe?ir:null):(qt["aria-label"]=lr?re:null,qt["aria-labelledby"]=Xe&&!lr?ir:null);const Ae=S({},qt,M,oe.props,{className:Te(M.className,oe.props.className),onTouchStart:yo,ref:ea},Q?{onMouseMove:ta}:{});process.env.NODE_ENV!=="production"&&(Ae["data-mui-internal-clone-element"]=!0,k.useEffect(()=>{ge&&!ge.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[ge]));const Gt={};A||(Ae.onTouchStart=Zs,Ae.onTouchEnd=Qs),O||(Ae.onMouseOver=$n(xo,Ae.onMouseOver),Ae.onMouseLeave=$n(wo,Ae.onMouseLeave),Ke||(Gt.onMouseOver=xo,Gt.onMouseLeave=wo)),T||(Ae.onFocus=$n(vo,Ae.onFocus),Ae.onBlur=$n(bo,Ae.onBlur),Ke||(Gt.onFocus=vo,Gt.onBlur=bo)),process.env.NODE_ENV!=="production"&&oe.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${oe.props.title}\` or the Tooltip component.`].join(`
`));const na=k.useMemo(()=>{var te;let Me=[{name:"arrow",enabled:!!Ce,options:{element:Ce,padding:4}}];return(te=G.popperOptions)!=null&&te.modifiers&&(Me=Me.concat(G.popperOptions.modifiers)),S({},G.popperOptions,{modifiers:Me})},[Ce,G]),Wt=S({},N,{isRtl:Se,arrow:R,disableInteractive:Ke,placement:W,PopperComponentProp:K,touch:$e.current}),cr=jp(Wt),Eo=(r=(o=Z.popper)!=null?o:L.Popper)!=null?r:_p,To=(i=(a=(l=Z.transition)!=null?l:L.Transition)!=null?a:D)!=null?i:Dr,ko=(c=(u=Z.tooltip)!=null?u:L.Tooltip)!=null?c:Ap,Oo=(d=(f=Z.arrow)!=null?f:L.Arrow)!=null?d:Dp,ra=nn(Eo,S({},G,(p=Y.popper)!=null?p:V.popper,{className:Te(cr.popper,G==null?void 0:G.className,(v=(y=Y.popper)!=null?y:V.popper)==null?void 0:v.className)}),Wt),oa=nn(To,S({},ee,(g=Y.transition)!=null?g:V.transition),Wt),ia=nn(ko,S({},(m=Y.tooltip)!=null?m:V.tooltip,{className:Te(cr.tooltip,(E=(_=Y.tooltip)!=null?_:V.tooltip)==null?void 0:E.className)}),Wt),sa=nn(Oo,S({},(x=Y.arrow)!=null?x:V.arrow,{className:Te(cr.arrow,(w=(h=Y.arrow)!=null?h:V.arrow)==null?void 0:w.className)}),Wt);return b.jsxs(k.Fragment,{children:[k.cloneElement(oe,Ae),b.jsx(Eo,S({as:K??Ns,placement:W,anchorEl:Q?{getBoundingClientRect:()=>({top:Zt.y,left:Zt.x,right:Zt.x,bottom:Zt.y,width:0,height:0})}:ge,popperRef:ar,open:ge?Xe:!1,id:ir,transition:!0},Gt,ra,{popperOptions:na,children:({TransitionProps:te})=>b.jsx(To,S({timeout:ye.transitions.duration.shorter},te,oa,{children:b.jsxs(ko,S({},ia,{children:[re,R?b.jsx(Oo,S({},sa,{ref:We})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Ps.propTypes={arrow:s.bool,children:bn.isRequired,classes:s.object,className:s.string,components:s.shape({Arrow:s.elementType,Popper:s.elementType,Tooltip:s.elementType,Transition:s.elementType}),componentsProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),describeChild:s.bool,disableFocusListener:s.bool,disableHoverListener:s.bool,disableInteractive:s.bool,disableTouchListener:s.bool,enterDelay:s.number,enterNextDelay:s.number,enterTouchDelay:s.number,followCursor:s.bool,id:s.string,leaveDelay:s.number,leaveTouchDelay:s.number,onClose:s.func,onOpen:s.func,open:s.bool,placement:s.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:s.elementType,PopperProps:s.object,slotProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),slots:s.shape({arrow:s.elementType,popper:s.elementType,tooltip:s.elementType,transition:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),title:s.node,TransitionComponent:s.elementType,TransitionProps:s.object});const Bp=Ps;var ao={},Rs={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Rs);var Lp=Rs.exports,xr={};function Fp(e){return Ge("MuiSvgIcon",e)}st("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Vp=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],zp=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${He(t)}`,`fontSize${He(n)}`]};return et(o,Fp,r)},Up=Oe("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${He(n.color)}`],t[`fontSize${He(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,a,l,c,u,d,f,p,v,y;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(a=i.pxToRem)==null?void 0:a.call(i,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((u=e.typography)==null||(d=u.pxToRem)==null?void 0:d.call(u,35))||"2.1875rem"}[t.fontSize],color:(f=(p=(e.vars||e).palette)==null||(p=p[t.color])==null?void 0:p.main)!=null?f:{action:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.active,disabled:(y=(e.vars||e).palette)==null||(y=y.action)==null?void 0:y.disabled,inherit:void 0}[t.color]}}),lo=k.forwardRef(function(t,n){const r=tt({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:a="inherit",component:l="svg",fontSize:c="medium",htmlColor:u,inheritViewBox:d=!1,titleAccess:f,viewBox:p="0 0 24 24"}=r,v=de(r,Vp),y=k.isValidElement(o)&&o.type==="svg",g=S({},r,{color:a,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:d,viewBox:p,hasSvgAsChild:y}),m={};d||(m.viewBox=p);const E=zp(g);return b.jsxs(Up,S({as:l,className:Te(E.root,i),focusable:"false",color:u,"aria-hidden":f?void 0:!0,role:f?"img":void 0,ref:n},m,v,y&&o.props,{ownerState:g,children:[y?o.props.children:o,f?b.jsx("title",{children:f}):null]}))});process.env.NODE_ENV!=="production"&&(lo.propTypes={children:s.node,classes:s.object,className:s.string,color:s.oneOfType([s.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),s.string]),component:s.elementType,fontSize:s.oneOfType([s.oneOf(["inherit","large","medium","small"]),s.string]),htmlColor:s.string,inheritViewBox:s.bool,shapeRendering:s.string,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),titleAccess:s.string,viewBox:s.string});lo.muiName="SvgIcon";const bi=lo;function $s(e,t){function n(r,o){return b.jsx(bi,S({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=bi.muiName,k.memo(k.forwardRef(n))}const Hp={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),ts.configure(e)}},qp=Object.freeze(Object.defineProperty({__proto__:null,capitalize:He,createChainedFunction:Pr,createSvgIcon:$s,debounce:Gi,deprecatedPropType:vl,isMuiElement:yl,ownerDocument:ke,ownerWindow:At,requirePropFactory:xl,setRef:Bn,unstable_ClassNameGenerator:Hp,unstable_useEnhancedEffect:yt,unstable_useId:Wi,unsupportedProp:Tl,useControlled:Ki,useEventCallback:dn,useForkRef:Le,useIsFocusVisible:Xi},Symbol.toStringTag,{value:"Module"})),Gp=Ja(qp);var vi;function Wp(){return vi||(vi=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Gp}(xr)),xr}var Kp=Lp;Object.defineProperty(ao,"__esModule",{value:!0});var Ms=ao.default=void 0,Xp=Kp(Wp()),Yp=b;Ms=ao.default=(0,Xp.default)((0,Yp.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function yi(e,t,n){return e?b.jsx(fe.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:b.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function co(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:a=void 0,hasAutoFocus:l=!1,className:c,isDisabled:u=!1,isDense:d=!0,isSubMenuParent:f=!1,hasDisabledGutters:p=!1,hasDivider:v=!1,focusVisibleClassName:y,id:g,children:m}=e,E=b.jsx(fe.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:u,dense:d,disableGutters:p,divider:v,focusVisibleClassName:y,onClick:t,id:g,children:n?b.jsxs(b.Fragment,{children:[yi(i,n,!0),b.jsx(fe.ListItemText,{primary:n,inset:!i&&o}),f?b.jsx(fe.ListItemIcon,{className:"papi-menu-icon-trailing",children:b.jsx(Ms,{})}):yi(a,n,!1)]}):m});return r?b.jsx(Bp,{title:r,placement:"right",children:b.jsx("div",{children:E})}):E}function Is(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Jp(e){const[t,n]=j.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,a=u=>{n(u.currentTarget)},l=()=>{n(void 0)},c=()=>{let u=Is(i).filter(d=>"menuItem"in d.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return u=u.filter(d=>"menuItem"in d.group&&d.group.menuItem===r.id),b.jsx(uo,{...e,includedGroups:u})};return b.jsxs(b.Fragment,{children:[b.jsx(co,{onClick:a,...o,isSubMenuParent:!0}),b.jsx(fe.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Zp=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function uo(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:a}=j.useMemo(()=>{const d=o&&o.length>0?o:Is(t).filter(y=>!("menuItem"in y.group)),f=Object.values(d).sort((y,g)=>(y.group.order||0)-(g.group.order||0)),p=[];f.forEach(y=>{Zp(y.id,t.items).forEach(g=>p.push({item:g,isLastItemInGroup:!1})),p.length>0&&(p[p.length-1].isLastItemInGroup=!0)}),p.length>0&&(p[p.length-1].isLastItemInGroup=!1);const v=p.some(y=>"iconPathBefore"in y.item&&y.item.iconPathBefore);return{items:p,allowForLeadingIcons:v}},[o,t]),l=({item:d,isLastItemInGroup:f})=>({className:"papi-menu-item",label:d.label,tooltip:d.tooltip,iconPathBefore:"iconPathBefore"in d?d.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in d?d.iconPathAfter:void 0,hasDivider:f,allowForLeadingIcons:a}),[c]=i;if(!c)return b.jsx("div",{});const u=c.item.group;return b.jsx("div",{role:"menu","aria-label":u,children:i.map((d,f)=>{const{item:p}=d,v=l(d);if("command"in p){const y=p.group+f;return b.jsx(co,{onClick:g=>{n==null||n(g),r(p)},...v},y)}return b.jsx(Jp,{parentMenuItem:p,parentItemProps:v,...e},u+p.id)})},u)}function Qp(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([a,l])=>({id:a,group:l})).filter(a=>"column"in a.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(a=>"column"in a.group&&a.group.column===n)),b.jsx(uo,{...e,includedGroups:i})}function ef({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return b.jsxs(fe.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[b.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),b.jsx(fe.List,{id:n,dense:!0,className:i??"",children:b.jsx(Qp,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function js({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=j.useMemo(()=>{const a=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,u=o[c];typeof u=="object"&&typeof u.order=="number"&&!Number.isNaN(u.order)?a.set(u.order,{id:c,metadata:u}):console.warn(`Property ${l} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(a.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return b.jsx(fe.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((a,l)=>b.jsx(ef,{commandHandler:e,menuDefinition:n,...a,className:t},l))})}const _s=k.createContext({});process.env.NODE_ENV!=="production"&&(_s.displayName="ListContext");const tf=_s;function nf(e){return Ge("MuiList",e)}st("MuiList",["root","padding","dense","subheader"]);const rf=["children","className","component","dense","disablePadding","subheader"],of=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return et({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},nf,t)},sf=Oe("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>S({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),As=k.forwardRef(function(t,n){const r=tt({props:t,name:"MuiList"}),{children:o,className:i,component:a="ul",dense:l=!1,disablePadding:c=!1,subheader:u}=r,d=de(r,rf),f=k.useMemo(()=>({dense:l}),[l]),p=S({},r,{component:a,dense:l,disablePadding:c}),v=of(p);return b.jsx(tf.Provider,{value:f,children:b.jsxs(sf,S({as:a,className:Te(v.root,i),ref:n,ownerState:p},d,{children:[u,o]}))})});process.env.NODE_ENV!=="production"&&(As.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,dense:s.bool,disablePadding:s.bool,subheader:s.node,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const af=As,lf=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function wr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function xi(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function Ds(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function Qt(e,t,n,r,o,i){let a=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(a)return!1;a=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!Ds(l,i)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const Bs=k.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:a,className:l,disabledItemsFocusable:c=!1,disableListWrap:u=!1,onKeyDown:d,variant:f="selectedMenu"}=t,p=de(t,lf),v=k.useRef(null),y=k.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});yt(()=>{o&&v.current.focus()},[o]),k.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(x,w)=>{const h=!v.current.style.width;if(x.clientHeight<v.current.clientHeight&&h){const N=`${Yi(ke(x))}px`;v.current.style[w.direction==="rtl"?"paddingLeft":"paddingRight"]=N,v.current.style.width=`calc(100% + ${N})`}return v.current}}),[]);const g=x=>{const w=v.current,h=x.key,N=ke(w).activeElement;if(h==="ArrowDown")x.preventDefault(),Qt(w,N,u,c,wr);else if(h==="ArrowUp")x.preventDefault(),Qt(w,N,u,c,xi);else if(h==="Home")x.preventDefault(),Qt(w,null,u,c,wr);else if(h==="End")x.preventDefault(),Qt(w,null,u,c,xi);else if(h.length===1){const R=y.current,F=h.toLowerCase(),L=performance.now();R.keys.length>0&&(L-R.lastTime>500?(R.keys=[],R.repeating=!0,R.previousKeyMatched=!0):R.repeating&&F!==R.keys[0]&&(R.repeating=!1)),R.lastTime=L,R.keys.push(F);const V=N&&!R.repeating&&Ds(N,R);R.previousKeyMatched&&(V||Qt(w,N,!1,c,wr,R))?x.preventDefault():R.previousKeyMatched=!1}d&&d(x)},m=Le(v,n);let E=-1;k.Children.forEach(a,(x,w)=>{if(!k.isValidElement(x)){E===w&&(E+=1,E>=a.length&&(E=-1));return}process.env.NODE_ENV!=="production"&&Dn.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(f==="selectedMenu"&&x.props.selected||E===-1)&&(E=w),E===w&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(E+=1,E>=a.length&&(E=-1))});const _=k.Children.map(a,(x,w)=>{if(w===E){const h={};return i&&(h.autoFocus=!0),x.props.tabIndex===void 0&&f==="selectedMenu"&&(h.tabIndex=0),k.cloneElement(x,h)}return x});return b.jsx(af,S({role:"menu",ref:m,className:l,onKeyDown:g,tabIndex:o?0:-1},p,{children:_}))});process.env.NODE_ENV!=="production"&&(Bs.propTypes={autoFocus:s.bool,autoFocusItem:s.bool,children:s.node,className:s.string,disabledItemsFocusable:s.bool,disableListWrap:s.bool,onKeyDown:s.func,variant:s.oneOf(["menu","selectedMenu"])});const cf=Bs,uf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],df={entering:{opacity:1},entered:{opacity:1}},Ls=k.forwardRef(function(t,n){const r=Tn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:a=!0,children:l,easing:c,in:u,onEnter:d,onEntered:f,onEntering:p,onExit:v,onExited:y,onExiting:g,style:m,timeout:E=o,TransitionComponent:_=Os}=t,x=de(t,uf),w=k.useRef(null),h=Le(w,l.ref,n),N=$=>A=>{if($){const I=w.current;A===void 0?$(I):$(I,A)}},R=N(p),F=N(($,A)=>{Ss($);const I=Hn({style:m,timeout:E,easing:c},{mode:"enter"});$.style.webkitTransition=r.transitions.create("opacity",I),$.style.transition=r.transitions.create("opacity",I),d&&d($,A)}),L=N(f),V=N(g),P=N($=>{const A=Hn({style:m,timeout:E,easing:c},{mode:"exit"});$.style.webkitTransition=r.transitions.create("opacity",A),$.style.transition=r.transitions.create("opacity",A),v&&v($)}),T=N(y),O=$=>{i&&i(w.current,$)};return b.jsx(_,S({appear:a,in:u,nodeRef:w,onEnter:F,onEntered:L,onEntering:R,onExit:P,onExited:T,onExiting:V,addEndListener:O,timeout:E},x,{children:($,A)=>k.cloneElement(l,S({style:S({opacity:0,visibility:$==="exited"&&!u?"hidden":void 0},df[$],m,l.props.style),ref:h},A))}))});process.env.NODE_ENV!=="production"&&(Ls.propTypes={addEndListener:s.func,appear:s.bool,children:bn.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const pf=Ls;function ff(e){return Ge("MuiBackdrop",e)}st("MuiBackdrop",["root","invisible"]);const hf=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],mf=e=>{const{classes:t,invisible:n}=e;return et({root:["root",n&&"invisible"]},ff,t)},gf=Oe("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>S({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),Fs=k.forwardRef(function(t,n){var r,o,i;const a=tt({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:u="div",components:d={},componentsProps:f={},invisible:p=!1,open:v,slotProps:y={},slots:g={},TransitionComponent:m=pf,transitionDuration:E}=a,_=de(a,hf),x=S({},a,{component:u,invisible:p}),w=mf(x),h=(r=y.root)!=null?r:f.root;return b.jsx(m,S({in:v,timeout:E},_,{children:b.jsx(gf,S({"aria-hidden":!0},h,{as:(o=(i=g.root)!=null?i:d.Root)!=null?o:u,className:Te(w.root,c,h==null?void 0:h.className),ownerState:S({},x,h==null?void 0:h.ownerState),classes:w,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(Fs.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.object}),invisible:s.bool,open:s.bool.isRequired,slotProps:s.shape({root:s.object}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const bf=Fs;function vf(e){return Ge("MuiModal",e)}st("MuiModal",["root","hidden","backdrop"]);const yf=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],xf=e=>{const{open:t,exited:n,classes:r}=e;return et({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},vf,r)},wf=Oe("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>S({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Ef=Oe(bf,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Vs=k.forwardRef(function(t,n){var r,o,i,a,l,c;const u=tt({name:"MuiModal",props:t}),{BackdropComponent:d=Ef,BackdropProps:f,className:p,closeAfterTransition:v=!1,children:y,container:g,component:m,components:E={},componentsProps:_={},disableAutoFocus:x=!1,disableEnforceFocus:w=!1,disableEscapeKeyDown:h=!1,disablePortal:N=!1,disableRestoreFocus:R=!1,disableScrollLock:F=!1,hideBackdrop:L=!1,keepMounted:V=!1,onBackdropClick:P,open:T,slotProps:O,slots:$}=u,A=de(u,yf),I=S({},u,{closeAfterTransition:v,disableAutoFocus:x,disableEnforceFocus:w,disableEscapeKeyDown:h,disablePortal:N,disableRestoreFocus:R,disableScrollLock:F,hideBackdrop:L,keepMounted:V}),{getRootProps:z,getBackdropProps:J,getTransitionProps:Q,portalRef:C,isTopModal:B,exited:H,hasTransition:X}=uc(S({},I,{rootRef:n})),U=S({},I,{exited:H}),q=xf(U),W={};if(y.props.tabIndex===void 0&&(W.tabIndex="-1"),X){const{onEnter:ee,onExited:M}=Q();W.onEnter=ee,W.onExited=M}const K=(r=(o=$==null?void 0:$.root)!=null?o:E.Root)!=null?r:wf,G=(i=(a=$==null?void 0:$.backdrop)!=null?a:E.Backdrop)!=null?i:d,Y=(l=O==null?void 0:O.root)!=null?l:_.root,Z=(c=O==null?void 0:O.backdrop)!=null?c:_.backdrop,re=xt({elementType:K,externalSlotProps:Y,externalForwardedProps:A,getSlotProps:z,additionalProps:{ref:n,as:m},ownerState:U,className:Te(p,Y==null?void 0:Y.className,q==null?void 0:q.root,!U.open&&U.exited&&(q==null?void 0:q.hidden))}),D=xt({elementType:G,externalSlotProps:Z,additionalProps:f,getSlotProps:ee=>J(S({},ee,{onClick:M=>{P&&P(M),ee!=null&&ee.onClick&&ee.onClick(M)}})),className:Te(Z==null?void 0:Z.className,f==null?void 0:f.className,q==null?void 0:q.backdrop),ownerState:U});return!V&&!T&&(!X||H)?null:b.jsx(pn,{ref:C,container:g,disablePortal:N,children:b.jsxs(K,S({},re,{children:[!L&&d?b.jsx(G,S({},D)):null,b.jsx(Ln,{disableEnforceFocus:w,disableAutoFocus:x,disableRestoreFocus:R,isEnabled:B,open:T,children:k.cloneElement(y,W)})]}))})});process.env.NODE_ENV!=="production"&&(Vs.propTypes={BackdropComponent:s.elementType,BackdropProps:s.object,children:bn.isRequired,classes:s.object,className:s.string,closeAfterTransition:s.bool,component:s.elementType,components:s.shape({Backdrop:s.elementType,Root:s.elementType}),componentsProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Je,s.func]),disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableEscapeKeyDown:s.bool,disablePortal:s.bool,disableRestoreFocus:s.bool,disableScrollLock:s.bool,hideBackdrop:s.bool,keepMounted:s.bool,onBackdropClick:s.func,onClose:s.func,onTransitionEnter:s.func,onTransitionExited:s.func,open:s.bool.isRequired,slotProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({backdrop:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const Tf=Vs;function kf(e){return Ge("MuiPaper",e)}st("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Of=["className","component","elevation","square","variant"],Sf=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return et(i,kf,o)},Cf=Oe("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return S({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&S({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${Un("#fff",mi(t.elevation))}, ${Un("#fff",mi(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),zs=k.forwardRef(function(t,n){const r=tt({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:a=1,square:l=!1,variant:c="elevation"}=r,u=de(r,Of),d=S({},r,{component:i,elevation:a,square:l,variant:c}),f=Sf(d);return process.env.NODE_ENV!=="production"&&Tn().shadows[a]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)),b.jsx(Cf,S({as:i,ownerState:d,className:Te(f.root,o),ref:n},u))});process.env.NODE_ENV!=="production"&&(zs.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,elevation:zt(Qi,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:s.bool,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),variant:s.oneOfType([s.oneOf(["elevation","outlined"]),s.string])});const Nf=zs;function Pf(e){return Ge("MuiPopover",e)}st("MuiPopover",["root","paper"]);const Rf=["onEntering"],$f=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Mf=["slotProps"];function wi(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function Ei(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function Ti(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function _n(e){return typeof e=="function"?e():e}const If=e=>{const{classes:t}=e;return et({root:["root"],paper:["paper"]},Pf,t)},jf=Oe(Tf,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Us=Oe(Nf,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Hs=k.forwardRef(function(t,n){var r,o,i;const a=tt({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:u={vertical:"top",horizontal:"left"},anchorPosition:d,anchorReference:f="anchorEl",children:p,className:v,container:y,elevation:g=8,marginThreshold:m=16,open:E,PaperProps:_={},slots:x,slotProps:w,transformOrigin:h={vertical:"top",horizontal:"left"},TransitionComponent:N=Dr,transitionDuration:R="auto",TransitionProps:{onEntering:F}={},disableScrollLock:L=!1}=a,V=de(a.TransitionProps,Rf),P=de(a,$f),T=(r=w==null?void 0:w.paper)!=null?r:_,O=k.useRef(),$=Le(O,T.ref),A=S({},a,{anchorOrigin:u,anchorReference:f,elevation:g,marginThreshold:m,externalPaperSlotProps:T,transformOrigin:h,TransitionComponent:N,transitionDuration:R,TransitionProps:V}),I=If(A),z=k.useCallback(()=>{if(f==="anchorPosition")return process.env.NODE_ENV!=="production"&&(d||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),d;const ee=_n(c),M=ee&&ee.nodeType===1?ee:ke(O.current).body,oe=M.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const ye=M.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ye.top===0&&ye.left===0&&ye.right===0&&ye.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:oe.top+wi(oe,u.vertical),left:oe.left+Ei(oe,u.horizontal)}},[c,u.horizontal,u.vertical,d,f]),J=k.useCallback(ee=>({vertical:wi(ee,h.vertical),horizontal:Ei(ee,h.horizontal)}),[h.horizontal,h.vertical]),Q=k.useCallback(ee=>{const M={width:ee.offsetWidth,height:ee.offsetHeight},oe=J(M);if(f==="none")return{top:null,left:null,transformOrigin:Ti(oe)};const ye=z();let Se=ye.top-oe.vertical,ge=ye.left-oe.horizontal;const ct=Se+M.height,Ce=ge+M.width,We=At(_n(c)),$e=We.innerHeight-m,Ke=We.innerWidth-m;if(m!==null&&Se<m){const we=Se-m;Se-=we,oe.vertical+=we}else if(m!==null&&ct>$e){const we=ct-$e;Se-=we,oe.vertical+=we}if(process.env.NODE_ENV!=="production"&&M.height>$e&&M.height&&$e&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${M.height-$e}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),m!==null&&ge<m){const we=ge-m;ge-=we,oe.horizontal+=we}else if(Ce>Ke){const we=Ce-Ke;ge-=we,oe.horizontal+=we}return{top:`${Math.round(Se)}px`,left:`${Math.round(ge)}px`,transformOrigin:Ti(oe)}},[c,f,z,J,m]),[C,B]=k.useState(E),H=k.useCallback(()=>{const ee=O.current;if(!ee)return;const M=Q(ee);M.top!==null&&(ee.style.top=M.top),M.left!==null&&(ee.style.left=M.left),ee.style.transformOrigin=M.transformOrigin,B(!0)},[Q]);k.useEffect(()=>(L&&window.addEventListener("scroll",H),()=>window.removeEventListener("scroll",H)),[c,L,H]);const X=(ee,M)=>{F&&F(ee,M),H()},U=()=>{B(!1)};k.useEffect(()=>{E&&H()}),k.useImperativeHandle(l,()=>E?{updatePosition:()=>{H()}}:null,[E,H]),k.useEffect(()=>{if(!E)return;const ee=Gi(()=>{H()}),M=At(c);return M.addEventListener("resize",ee),()=>{ee.clear(),M.removeEventListener("resize",ee)}},[c,E,H]);let q=R;R==="auto"&&!N.muiSupportAuto&&(q=void 0);const W=y||(c?ke(_n(c)).body:void 0),K=(o=x==null?void 0:x.root)!=null?o:jf,G=(i=x==null?void 0:x.paper)!=null?i:Us,Y=xt({elementType:G,externalSlotProps:S({},T,{style:C?T.style:S({},T.style,{opacity:0})}),additionalProps:{elevation:g,ref:$},ownerState:A,className:Te(I.paper,T==null?void 0:T.className)}),Z=xt({elementType:K,externalSlotProps:(w==null?void 0:w.root)||{},externalForwardedProps:P,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:W,open:E},ownerState:A,className:Te(I.root,v)}),{slotProps:re}=Z,D=de(Z,Mf);return b.jsx(K,S({},D,!rs(K)&&{slotProps:re,disableScrollLock:L},{children:b.jsx(N,S({appear:!0,in:E,onEntering:X,onExited:U,timeout:q},V,{children:b.jsx(G,S({},Y,{children:p}))}))}))});process.env.NODE_ENV!=="production"&&(Hs.propTypes={action:Hr,anchorEl:zt(s.oneOfType([Je,s.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=_n(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),anchorPosition:s.shape({left:s.number.isRequired,top:s.number.isRequired}),anchorReference:s.oneOf(["anchorEl","anchorPosition","none"]),children:s.node,classes:s.object,className:s.string,container:s.oneOfType([Je,s.func]),disableScrollLock:s.bool,elevation:Qi,marginThreshold:s.number,onClose:s.func,open:s.bool.isRequired,PaperProps:s.shape({component:ul}),slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transformOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object});const _f=Hs;function Af(e){return Ge("MuiMenu",e)}st("MuiMenu",["root","paper","list"]);const Df=["onEntering"],Bf=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Lf={vertical:"top",horizontal:"right"},Ff={vertical:"top",horizontal:"left"},Vf=e=>{const{classes:t}=e;return et({root:["root"],paper:["paper"],list:["list"]},Af,t)},zf=Oe(_f,{shouldForwardProp:e=>Ts(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Uf=Oe(Us,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),Hf=Oe(cf,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),qs=k.forwardRef(function(t,n){var r,o;const i=tt({props:t,name:"MuiMenu"}),{autoFocus:a=!0,children:l,className:c,disableAutoFocusItem:u=!1,MenuListProps:d={},onClose:f,open:p,PaperProps:v={},PopoverClasses:y,transitionDuration:g="auto",TransitionProps:{onEntering:m}={},variant:E="selectedMenu",slots:_={},slotProps:x={}}=i,w=de(i.TransitionProps,Df),h=de(i,Bf),N=Tn(),R=N.direction==="rtl",F=S({},i,{autoFocus:a,disableAutoFocusItem:u,MenuListProps:d,onEntering:m,PaperProps:v,transitionDuration:g,TransitionProps:w,variant:E}),L=Vf(F),V=a&&!u&&p,P=k.useRef(null),T=(Q,C)=>{P.current&&P.current.adjustStyleForScrollbar(Q,N),m&&m(Q,C)},O=Q=>{Q.key==="Tab"&&(Q.preventDefault(),f&&f(Q,"tabKeyDown"))};let $=-1;k.Children.map(l,(Q,C)=>{k.isValidElement(Q)&&(process.env.NODE_ENV!=="production"&&Dn.isFragment(Q)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Q.props.disabled||(E==="selectedMenu"&&Q.props.selected||$===-1)&&($=C))});const A=(r=_.paper)!=null?r:Uf,I=(o=x.paper)!=null?o:v,z=xt({elementType:_.root,externalSlotProps:x.root,ownerState:F,className:[L.root,c]}),J=xt({elementType:A,externalSlotProps:I,ownerState:F,className:L.paper});return b.jsx(zf,S({onClose:f,anchorOrigin:{vertical:"bottom",horizontal:R?"right":"left"},transformOrigin:R?Lf:Ff,slots:{paper:A,root:_.root},slotProps:{root:z,paper:J},open:p,ref:n,transitionDuration:g,TransitionProps:S({onEntering:T},w),ownerState:F},h,{classes:y,children:b.jsx(Hf,S({onKeyDown:O,actions:P,autoFocus:a&&($===-1||u),autoFocusItem:V,variant:E},d,{className:Te(L.list,d.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(qs.propTypes={anchorEl:s.oneOfType([Je,s.func]),autoFocus:s.bool,children:s.node,classes:s.object,className:s.string,disableAutoFocusItem:s.bool,MenuListProps:s.object,onClose:s.func,open:s.bool.isRequired,PaperProps:s.object,PopoverClasses:s.object,slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object,variant:s.oneOf(["menu","selectedMenu"])});const qf=qs;function Gf({className:e,commandHandler:t,menuDefinition:n,children:r}){var u;const[o,i]=j.useState(void 0),a=j.useCallback(d=>{d.preventDefault(),i(o===void 0?{mouseX:d.clientX+2,mouseY:d.clientY-6}:void 0)},[o]),l=j.useCallback(()=>{i(void 0)},[]),c=j.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((u=n==null?void 0:n.items)==null?void 0:u.length)??0)===0||!r?r:b.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:a,children:[r,b.jsx(qf,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:b.jsx(uo,{menuDefinition:n,commandHandler:t,onClick:l})})]})}const Wf=$s(b.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Kf(e){return{preserveValue:!0,...e}}const qn=(e,t,n={})=>{const r=j.useRef(t);r.current=t;const o=j.useRef(n);o.current=Kf(o.current);const[i,a]=j.useState(()=>r.current),[l,c]=j.useState(!0);return j.useEffect(()=>{let u=!0;return c(!!e),(async()=>{if(e){const d=await e();u&&(a(()=>d),c(!1))}})(),()=>{u=!1,o.current.preserveValue||a(()=>r.current)}},[e]),[i,l]};function Gs({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:i,ariaLabelPrefix:a,children:l}){const[c,u]=j.useState(!1),[d,f]=j.useState(!1),p=j.useCallback(()=>{c&&u(!1),f(!1)},[c]),v=j.useCallback(w=>{w.stopPropagation(),u(h=>{const N=!h;return N&&w.shiftKey?f(!0):N||f(!1),N})},[]),y=j.useCallback(w=>(p(),r(w)),[r,p]),[g,m]=j.useState({top:1,left:1});j.useEffect(()=>{if(c){const w=o==null?void 0:o.current;if(w){const h=w.getBoundingClientRect(),N=window.scrollY,R=window.scrollX,F=h.top+N+w.clientHeight,L=h.left+R;m({top:F,left:L})}}},[c,o]);const[E]=qn(j.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[_]=qn(j.useCallback(async()=>(e==null?void 0:e(!0))??n??E,[e,n,E,c]),n??E),x=d&&_?_:E;return b.jsxs(b.Fragment,{children:[b.jsx(fe.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${i??""}`,color:"inherit","aria-label":`${a??""} menu button`,onClick:v,children:l??b.jsx(Wf,{})}),b.jsx(fe.Drawer,{className:`papi-menu-drawer ${i??""}`,anchor:"left",variant:"temporary",open:c,onClose:p,PaperProps:{className:"papi-menu-drawer-paper",style:{top:g.top,left:g.left}},children:x?b.jsx(js,{className:i,id:`${a??""} main menu`,commandHandler:y,multiColumnMenu:x}):void 0})]})}function Xf({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:a="medium",className:l,onClick:c,children:u}){return b.jsx(fe.IconButton,{id:e,disabled:n,edge:i,size:a,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:u})}const Yf=Oi.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),Ws=k.forwardRef(({className:e,...t},n)=>b.jsx(Si.Root,{ref:n,className:xe(Yf(),e),...t}));Ws.displayName=Si.Root.displayName;function gn({id:e,isDisabled:t=!1,hasError:n=!1,helperText:r,label:o,placeholder:i,isRequired:a=!1,className:l,defaultValue:c,value:u,onChange:d,onFocus:f,onBlur:p}){return b.jsxs("div",{className:"pr-inline-grid pr-items-center pr-gap-1.5",children:[b.jsx(Ws,{htmlFor:e,className:xe({"pr-text-red-600":n,"pr-hidden":!o}),children:`${o}${a?"*":""}`}),b.jsx(zr,{id:e,disabled:t,placeholder:i,required:a,className:xe(l,{"pr-border-red-600":n}),defaultValue:c,value:u,onChange:d,onFocus:f,onBlur:p}),b.jsx("p",{className:xe({"pr-hidden":!r}),children:r})]})}let Er;const Tr=()=>(Er||(Er=se.allBookIds.map(e=>({bookId:e,label:se.bookIdToEnglishName(e)}))),Er);function Jf({scrRef:e,handleSubmit:t,id:n}){const r=c=>{t(c)},o=(c,u)=>{const f={bookNum:se.bookIdToNumber(u.bookId),chapterNum:1,verseNum:1};r(f)},i=c=>{t({...e,chapterNum:+c.target.value})},a=c=>{t({...e,verseNum:+c.target.value})},l=j.useMemo(()=>Tr()[e.bookNum-1],[e.bookNum]);return b.jsxs("span",{id:n,className:"pr-flex pr-place-items-center",children:[b.jsx(An,{title:"Book",className:"papi-ref-selector book",value:l,options:Tr(),onChange:o,isClearable:!1,width:200}),b.jsx(dt,{onClick:()=>r(Ee.offsetBook(e,-1)),isDisabled:e.bookNum<=Ee.FIRST_SCR_BOOK_NUM,children:"<"}),b.jsx(dt,{onClick:()=>r(Ee.offsetBook(e,1)),isDisabled:e.bookNum>=Tr().length,children:">"}),b.jsx(gn,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),b.jsx(dt,{onClick:()=>t(Ee.offsetChapter(e,-1)),isDisabled:e.chapterNum<=Ee.FIRST_SCR_CHAPTER_NUM,children:"<"}),b.jsx(dt,{onClick:()=>t(Ee.offsetChapter(e,1)),isDisabled:e.chapterNum>=Ee.getChaptersForBook(e.bookNum),children:">"}),b.jsx(gn,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:a}),b.jsx(dt,{onClick:()=>t(Ee.offsetVerse(e,-1)),isDisabled:e.verseNum<=Ee.FIRST_SCR_VERSE_NUM,children:"<"}),b.jsx(dt,{onClick:()=>t(Ee.offsetVerse(e,1)),children:">"})]})}class Zf{constructor(){kt(this,"listeners",{})}addEventListener(t,n){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(n)}removeEventListener(t,n){var o;const r=(o=this.listeners[t])==null?void 0:o.indexOf(n);r!==void 0&&r!==-1&&this.listeners[t].splice(r,1)}dispatchEvent(t){const n=this.listeners[t.type];n&&n.forEach(r=>r(t))}}class Qf{constructor(t,n,r){kt(this,"id");kt(this,"checkDefinition");kt(this,"data");kt(this,"resultsUpdated");if(r)this.id=r.id,this.checkDefinition=r;else{if(!n)throw new Error("Either 'id' or 'checkDefinition' must be provided.");this.id=n}this.data=t,this.resultsUpdated=new Zf}updateData(t){this.data=t;const n=new CustomEvent("resultsUpdated",{detail:this});this.resultsUpdated.dispatchEvent(n)}addEventListener(t,n){this.resultsUpdated.addEventListener(t,n)}removeEventListener(t,n){this.resultsUpdated.removeEventListener(t,n)}}const It="scrBook",eh="scrRef",on="source",th="details",nh="Scripture Reference",rh="Scripture Book",Ks="Type",oh="Details";function ih(e,t){const n=t??!1;return[{accessorFn:r=>`${se.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:It,header:(e==null?void 0:e.scriptureReferenceColumnName)??nh,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?se.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===It?Ee.format(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>Ee.compare(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>Ee.format(r.start),id:eh,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:Ee.format(o.start)},sortingFn:(r,o)=>Ee.compare(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>typeof r.source=="object"&&"displayName"in r.source?r.source.displayName:r.source,id:on,header:n?(e==null?void 0:e.typeColumnName)??Ks:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,enableGrouping:!0},{accessorFn:r=>r.detail,id:th,header:(e==null?void 0:e.detailsColumnName)??oh,cell:r=>r.getValue(),enableGrouping:!1}]}function sh({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:i,detailsColumnName:a,onRowSelected:l}){const[c,u]=j.useState([]),[d,f]=j.useState([{id:It,desc:!1}]),[p,v]=j.useState(()=>e.flatMap(T=>{const O=T.checkDefinition??T.id;return T.data.map($=>({...$,source:O}))})),[y,g]=j.useState({});j.useEffect(()=>{const T=O=>{const{detail:$}=O,A=$,I=A.checkDefinition??A.id,z=A.data.map(J=>({...J,source:I}));$!==void 0&&v(J=>[...J.filter(C=>C.source!==I),...z])};return e.forEach(O=>{O.resultsUpdated.addEventListener("resultsUpdated",T)}),()=>{e.forEach(O=>{O.resultsUpdated.removeEventListener("resultsUpdated",T)})}},[e]);const m=j.useMemo(()=>ih({scriptureReferenceColumnName:r,typeColumnName:i,detailsColumnName:a},n),[r,i,a,n]);function E(T){return T.bookNum*1e6+T.chapterNum*1e3+T.verseNum}const _=j.useCallback((T,O)=>!O||Ee.compare(T,O)===0?`${E(T)}`:`${E(T)}-${E(O)}`,[]),x=j.useCallback(T=>`${_(T.start,T.end)} ${T.source} ${T.detail}`,[_]),w=rt.useReactTable({data:p,columns:m,state:{grouping:c,sorting:d,rowSelection:y},onGroupingChange:u,onSortingChange:f,onRowSelectionChange:g,getExpandedRowModel:rt.getExpandedRowModel(),getGroupedRowModel:rt.getGroupedRowModel(),getCoreRowModel:rt.getCoreRowModel(),getSortedRowModel:rt.getSortedRowModel(),getRowId:x,enableMultiRowSelection:!1,enableSubRowSelection:!1});j.useEffect(()=>{if(l){const T=w.getSelectedRowModel().rowsById,O=Object.keys(T);if(O.length===1){const $=p.find(A=>x(A)===O[0])||void 0;$&&l($)}}},[y,p,x,l,w]);const h=o??rh,N=i??Ks,R=[{label:"No Grouping",value:[]},{label:`Group by ${h}`,value:[It]},{label:`Group by ${N}`,value:[on]},{label:`Group by ${h} and ${N}`,value:[It,on]},{label:`Group by ${N} and ${h}`,value:[on,It]}],F=T=>{const O=JSON.parse(T.target.value);u(O)},L=(T,O)=>{!T.getIsGrouped()&&!T.getIsSelected()&&T.getToggleSelectedHandler()(O)},V=(T,O)=>T.getIsGrouped()?"":O%2===0?"banded-row-even":"banded-row-odd",P=(T,O)=>T.depth>=O.column.getIndex()?` indent${T.depth}`:"";return b.jsxs("div",{className:"p-2",children:[b.jsx("div",{className:"h-2"}),!t&&b.jsx("select",{value:JSON.stringify(c),onChange:F,children:R.map(T=>b.jsx("option",{value:JSON.stringify(T.value),children:T.label},T.label))}),b.jsxs("table",{children:[t&&b.jsx("thead",{children:w.getHeaderGroups().map(T=>b.jsx("tr",{children:T.headers.map(O=>b.jsx("th",{colSpan:O.colSpan,children:O.isPlaceholder?void 0:b.jsxs("div",{children:[O.column.getCanGroup()?b.jsx("button",{title:`Toggle grouping by ${O.column.columnDef.header}`,onClick:O.column.getToggleGroupingHandler(),style:{cursor:"pointer"},type:"button",children:O.column.getIsGrouped()?`🛑(${O.column.getGroupedIndex()}) `:"👊 "}):void 0," ",rt.flexRender(O.column.columnDef.header,O.getContext())]})},O.id))},T.id))}),b.jsx("tbody",{children:w.getRowModel().rows.map((T,O)=>b.jsx("tr",{className:`${T.getIsSelected()?"selected ":""} ${V(T,O)}`,onClick:$=>L(T,$),children:T.getVisibleCells().map($=>{if(!($.getIsPlaceholder()||$.column.columnDef.enableGrouping&&!$.getIsGrouped()&&($.column.columnDef.id!==on||!n)))return b.jsx("td",{className:`${$.column.columnDef.id}${P(T,$)}`,children:(()=>$.getIsGrouped()?b.jsxs("button",{onClick:T.getToggleExpandedHandler(),style:{cursor:T.getCanExpand()?"pointer":"normal"},type:"button",children:[T.getIsExpanded()?"👇":"👉"," ",rt.flexRender($.column.columnDef.cell,$.getContext())," (",T.subRows.length,")"]}):rt.flexRender($.column.columnDef.cell,$.getContext()))()},$.id)})},T.id))})]})]})}function ah({onSearch:e,placeholder:t}){const[n,r]=j.useState(""),o=i=>{r(i),e(i)};return b.jsx(fe.Paper,{component:"form",className:"search-bar-paper",children:b.jsx(gn,{className:"search-bar-input",placeholder:t,value:n,onChange:i=>o(i.target.value)})})}function lh({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:a=!1,defaultValue:l,value:c,valueLabelDisplay:u="off",className:d,onChange:f,onChangeCommitted:p}){return b.jsx(fe.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:a,defaultValue:l,value:c,valueLabelDisplay:u,className:`papi-slider ${n} ${d??""}`,onChange:f,onChangeCommitted:p})}function ch({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:a,children:l}){const c={action:(a==null?void 0:a.action)||l,message:a==null?void 0:a.message,className:r};return b.jsx(fe.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:c})}function uh({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return b.jsx(fe.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function ki({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return b.jsx(gn,{defaultValue:t[n.key],onChange:r})}const dh=({onChange:e,disabled:t,checked:n,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return b.jsx(Bi,{...r,isChecked:n,isDisabled:t,onChange:o})};function ph({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:a,defaultColumnSortable:l=!0,defaultColumnResizable:c=!0,rows:u,enableSelectColumn:d,selectColumnWidth:f=50,rowKeyGetter:p,rowHeight:v=35,headerRowHeight:y=35,selectedRows:g,onSelectedRowsChange:m,onRowsChange:E,onCellClick:_,onCellDoubleClick:x,onCellContextMenu:w,onCellKeyDown:h,direction:N="ltr",enableVirtualization:R=!0,onCopy:F,onPaste:L,onScroll:V,className:P,"data-testid":T}){const O=j.useMemo(()=>{const $=e.map(A=>typeof A.editable=="function"?{...A,editable:z=>!!A.editable(z),renderEditCell:A.renderEditCell||ki}:A.editable&&!A.renderEditCell?{...A,renderEditCell:ki}:A.renderEditCell&&!A.editable?{...A,editable:!1}:A);return d?[{...So.SelectColumn,minWidth:f},...$]:$},[e,d,f]);return b.jsx(So,{columns:O,defaultColumnOptions:{width:o,minWidth:i,maxWidth:a,sortable:l,resizable:c},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:u,rowKeyGetter:p,rowHeight:v,headerRowHeight:y,selectedRows:g,onSelectedRowsChange:m,onRowsChange:E,onCellClick:_,onCellDoubleClick:x,onCellContextMenu:w,onCellKeyDown:h,direction:N,enableVirtualization:R,onCopy:F,onPaste:L,onScroll:V,renderers:{renderCheckbox:dh},className:`papi-table ${P??"rdg-light"}`,"data-testid":T})}function fh({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const i=j.useRef(void 0);return b.jsx("div",{ref:i,style:{position:"relative"},children:b.jsx(fe.AppBar,{position:"static",id:r,children:b.jsxs(fe.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?b.jsx(Gs,{commandHandler:t,containerRef:i,menuProvider:e}):void 0,o?b.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const hh=(e,t)=>{j.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},kr=()=>!1,mh=(e,t)=>{const[n]=qn(j.useCallback(async()=>{if(!e)return kr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),kr,{preserveValue:!1});j.useEffect(()=>()=>{n!==kr&&n()},[n])};exports.BookChapterControl=za;exports.Button=dt;exports.ChapterRangeSelector=Xa;exports.Checkbox=Bi;exports.ComboBox=An;exports.ContextMenu=Gf;exports.GridMenu=js;exports.HamburgerMenuButton=Gs;exports.IconButton=Xf;exports.LabelPosition=ht;exports.MenuItem=co;exports.RefSelector=Jf;exports.ResultsSource=Qf;exports.ScriptureRefKeyedList=sh;exports.SearchBar=ah;exports.Slider=lh;exports.Snackbar=ch;exports.Switch=uh;exports.Table=ph;exports.TextField=gn;exports.Toolbar=fh;exports.useEvent=hh;exports.useEventAsync=mh;exports.usePromise=qn;function gh(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}gh(`.papi-button {
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
}
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
.basic-list-table {
  overflow: auto;

  .table-header {
    text-align: left;
  }
}

table {
  border-spacing: 1px;
}

td {
  padding-left: 3px;
  padding-right: 3px;
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

.banded-row-even {
  background-color: lightgrey;
}

.selected {
  background-color: bisque;
}

.banded-row-even:hover,.banded-row-odd:hover {
  background-color: lightcyan;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  cursor: pointer;
}

.selected:hover {
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
