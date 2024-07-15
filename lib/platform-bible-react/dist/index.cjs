"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const f=require("react/jsx-runtime"),P=require("react"),qe=require("platform-bible-utils"),Ds=require("@radix-ui/react-dropdown-menu"),He=require("lucide-react"),Ee=require("clsx"),Bs=require("tailwind-merge"),Ls=require("@radix-ui/react-slot"),Vr=require("class-variance-authority"),ye=require("@mui/material"),Fs=require("@radix-ui/react-popover"),Re=require("cmdk"),Vs=require("@radix-ui/react-dialog"),Sr=require("@mui/styled-engine"),tn=require("react-dom"),zs=require("@radix-ui/react-label"),$o=require("react-data-grid"),Us=require("@radix-ui/react-tabs"),qs=require("@radix-ui/react-slider"),Hs=require("@radix-ui/react-switch");function it(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const E=it(P),fe=it(Ds),dn=it(Fs),Ye=it(Vs),Ws=it(tn),Ma=it(zs),je=it(Us),nn=it(qs),Pr=it(Hs);var Xs=Object.defineProperty,Ys=(e,t,n)=>t in e?Xs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t,n)=>Ys(e,typeof t!="symbol"?t+"":t,n);const Et=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],zr=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],$a=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],_o=ol();function zt(e,t=!0){return t&&(e=e.toUpperCase()),e in _o?_o[e]:0}function Ur(e){return zt(e)>0}function Gs(e){const t=typeof e=="string"?zt(e):e;return t>=40&&t<=66}function Ks(e){return(typeof e=="string"?zt(e):e)<=39}function _a(e){return e<=66}function Js(e){const t=typeof e=="string"?zt(e):e;return Da(t)&&!_a(t)}function*Zs(){for(let e=1;e<=Et.length;e++)yield e}const Qs=1,Ia=Et.length;function el(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function qr(e,t="***"){const n=e-1;return n<0||n>=Et.length?t:Et[n]}function Aa(e){return e<=0||e>Ia?"******":$a[e-1]}function tl(e){return Aa(zt(e))}function Da(e){const t=typeof e=="number"?qr(e):e;return Ur(t)&&!zr.includes(t)}function nl(e){const t=typeof e=="number"?qr(e):e;return Ur(t)&&zr.includes(t)}function rl(e){return $a[e-1].includes("*obsolete*")}function ol(){const e={};for(let t=0;t<Et.length;t++)e[Et[t]]=t+1;return e}const ue={allBookIds:Et,nonCanonicalIds:zr,bookIdToNumber:zt,isBookIdValid:Ur,isBookNT:Gs,isBookOT:Ks,isBookOTNT:_a,isBookDC:Js,allBookNumbers:Zs,firstBook:Qs,lastBook:Ia,extraBooks:el,bookNumberToId:qr,bookNumberToEnglishName:Aa,bookIdToEnglishName:tl,isCanonical:Da,isExtraMaterial:nl,isObsolete:rl};var We=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(We||{});const _e=class{constructor(t){if(re(this,"name"),re(this,"fullPath"),re(this,"isPresent"),re(this,"hasVerseSegments"),re(this,"isCustomized"),re(this,"baseVersification"),re(this,"scriptureBooks"),re(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=We[t]):(this._type=t,this.name=We[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};re(_e,"Original",new _e(We.Original)),re(_e,"Septuagint",new _e(We.Septuagint)),re(_e,"Vulgate",new _e(We.Vulgate)),re(_e,"English",new _e(We.English)),re(_e,"RussianProtestant",new _e(We.RussianProtestant)),re(_e,"RussianOrthodox",new _e(We.RussianOrthodox));let gt=_e;function Io(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var Ba=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Ba||{});const Oe=class ie{constructor(t,n,r,o){if(re(this,"firstChapter"),re(this,"lastChapter"),re(this,"lastVerse"),re(this,"hasSegmentsDefined"),re(this,"text"),re(this,"BBBCCCVVVS"),re(this,"longHashCode"),re(this,"versification"),re(this,"rtlMark","‏"),re(this,"_bookNum",0),re(this,"_chapterNum",0),re(this,"_verseNum",0),re(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const a=t,s=n!=null&&n instanceof gt?n:void 0;this.setEmpty(s),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=n!=null&&n instanceof gt?n:void 0;this.setEmpty(a),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ie){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof gt?t:ie.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new ie(t),{success:!0,verseRef:n}}catch(r){if(r instanceof Gt)return n=new ie,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ie.bcvMaxValue*ie.bookDigitShifter+(n>=0?n%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(r>=0?r%ie.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:a,versificationStr:s}=t,l=a||o.toString();let c;return s&&(c=new gt(s)),n?new ie(n,r.toString(),l,c):new ie}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>ie.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return ue.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=ue.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ie.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>ue.lastBook)throw new Gt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new gt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const s=+a[1].trim();this.versification=new gt(We[s])}catch{throw new Gt("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new Gt("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||ue.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(r[1]))throw new Gt("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;return(t===""||t===this.verseNum.toString())&&(t=void 0),{book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr}}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=ie.verseRangeSeparators,r=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=Io(this._verse,r);for(const s of a.map(l=>Io(l,n))){const l=this.clone();l.verse=s[0];const c=l.verseNum;if(o.push(l),s.length>1){const p=this.clone();if(p.verse=s[1],!t)for(let u=c+1;u<p.verseNum;u++){const m=new ie(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||o.push(m)}o.push(p)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const a=o.internalValid;if(a!==0)return a;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ue.lastBook?2:(ue.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=ue.bookIdToNumber(t),this.chapter=n,this.verse=r}};re(Oe,"defaultVersification",gt.English),re(Oe,"verseRangeSeparator","-"),re(Oe,"verseSequenceIndicator",","),re(Oe,"verseRangeSeparators",[Oe.verseRangeSeparator]),re(Oe,"verseSequenceIndicators",[Oe.verseSequenceIndicator]),re(Oe,"chapterDigitShifter",1e3),re(Oe,"bookDigitShifter",Oe.chapterDigitShifter*Oe.chapterDigitShifter),re(Oe,"bcvMaxValue",Oe.chapterDigitShifter-1),re(Oe,"ValidStatusType",Ba);class Gt extends Error{}const al=Bs.extendTailwindMerge({prefix:"pr-"});function G(...e){return al(Ee.clsx(e))}const La=fe.Root,Fa=fe.Trigger,il=fe.Group,sl=fe.Portal,ll=fe.Sub,cl=fe.RadioGroup,Va=P.forwardRef(({className:e,inset:t,children:n,...r},o)=>f.jsxs(fe.SubTrigger,{ref:o,className:G("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,f.jsx(He.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Va.displayName=fe.SubTrigger.displayName;const za=P.forwardRef(({className:e,...t},n)=>f.jsx(fe.SubContent,{ref:n,className:G("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));za.displayName=fe.SubContent.displayName;const Hr=P.forwardRef(({className:e,sideOffset:t=4,...n},r)=>f.jsx(fe.Portal,{children:f.jsx(fe.Content,{ref:r,sideOffset:t,className:G("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));Hr.displayName=fe.Content.displayName;const Wr=P.forwardRef(({className:e,inset:t,...n},r)=>f.jsx(fe.Item,{ref:r,className:G("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));Wr.displayName=fe.Item.displayName;const Ua=P.forwardRef(({className:e,children:t,checked:n,...r},o)=>f.jsxs(fe.CheckboxItem,{ref:o,className:G("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[f.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:f.jsx(fe.ItemIndicator,{children:f.jsx(He.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));Ua.displayName=fe.CheckboxItem.displayName;const qa=P.forwardRef(({className:e,children:t,...n},r)=>f.jsxs(fe.RadioItem,{ref:r,className:G("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[f.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:f.jsx(fe.ItemIndicator,{children:f.jsx(He.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));qa.displayName=fe.RadioItem.displayName;const Yn=P.forwardRef(({className:e,inset:t,...n},r)=>f.jsx(fe.Label,{ref:r,className:G("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));Yn.displayName=fe.Label.displayName;const Xr=P.forwardRef(({className:e,...t},n)=>f.jsx(fe.Separator,{ref:n,className:G("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Xr.displayName=fe.Separator.displayName;function Ha({className:e,...t}){return f.jsx("span",{className:G("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Ha.displayName="DropdownMenuShortcut";const Gn=P.forwardRef(({className:e,type:t,...n},r)=>f.jsx("input",{type:t,className:G("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));Gn.displayName="Input";const pl=P.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},a)=>f.jsxs("div",{className:"pr-relative",children:[f.jsx(Gn,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r(),t(s)},onClick:n,ref:a}),f.jsx(He.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function ul({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const a=Array.from({length:t},(l,c)=>c+1),s=P.useCallback(l=>{o(l)},[o]);return f.jsx("div",{className:G("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:a.map(l=>f.jsx("div",{className:G("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===n,"pr-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>s(l),children:l},l))})}const dl=P.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:a,children:s},l)=>f.jsxs(Wr,{ref:l,textValue:e,className:G("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[f.jsx("span",{className:G("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":a.toLowerCase()==="ot","pr-border-l-purple-200":a.toLowerCase()==="nt","pr-border-l-indigo-200":a.toLowerCase()==="dc"}),children:ue.bookIdToEnglishName(e)}),n&&f.jsx("div",{children:s})]},e));function fl({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return f.jsxs(Yn,{className:"pr-flex pr-justify-between",children:[f.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),f.jsxs("div",{className:"pr-flex pr-items-center",children:[f.jsx(He.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),f.jsx(He.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),f.jsx(He.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const sn=ue.allBookIds,ml={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},Ao=["OT","NT","DC"],hl=32+32+32,gl=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],bl=e=>({OT:sn.filter(n=>ue.isBookOT(n)),NT:sn.filter(n=>ue.isBookNT(n)),DC:sn.filter(n=>ue.isBookDC(n))})[e],Kt=e=>qe.getChaptersForBook(ue.bookIdToNumber(e));function vl(){return sn.map(t=>ue.bookIdToEnglishName(t))}function yl(e){return vl().includes(e)}function wl(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(yl(t))return sn.find(r=>ue.bookIdToEnglishName(r)===t)}function xl({scrRef:e,handleSubmit:t}){const[n,r]=P.useState(""),[o,a]=P.useState(ue.bookNumberToId(e.bookNum)),[s,l]=P.useState(e.chapterNum??0),[c,p]=P.useState(ue.bookNumberToId(e.bookNum)),[u,m]=P.useState(!1),[d,v]=P.useState(u),y=P.useRef(void 0),b=P.useRef(void 0),h=P.useRef(void 0),k=P.useCallback(O=>bl(O).filter(M=>{const j=ue.bookIdToEnglishName(M).toLowerCase(),B=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return j.includes(B)||M.toLowerCase().includes(B)}),[n]),_=O=>{r(O)},w=P.useRef(!1),x=P.useCallback(O=>{if(w.current){w.current=!1;return}m(O)},[]),g=P.useCallback((O,M,j,B)=>{if(l(ue.bookNumberToId(e.bookNum)!==O?1:e.chapterNum),M||Kt(O)===-1){t({bookNum:ue.bookIdToNumber(O),chapterNum:j||1,verseNum:B||1}),m(!1),r("");return}a(o!==O?O:""),m(!M)},[t,e.bookNum,e.chapterNum,o]),N=O=>{O<=0||O>Kt(o)||g(o,!0,O)},S=P.useCallback(()=>{gl.forEach(O=>{const M=n.match(O);if(M){const[j,B=void 0,D=void 0]=M.slice(1),$=wl(j);(ue.isBookIdValid(j)||$)&&g($??j,!0,B?parseInt(B,10):1,D?parseInt(D,10):1)}})},[g,n]),F=P.useCallback(O=>{u?(O.key==="ArrowDown"||O.key==="ArrowUp")&&(typeof h<"u"&&h.current!==null?h.current.focus():typeof b<"u"&&b.current!==null&&b.current.focus(),O.preventDefault()):m(!0)},[u]),L=O=>{const{key:M}=O;M==="ArrowRight"||M==="ArrowLeft"||M==="ArrowDown"||M==="ArrowUp"||M==="Enter"||(y.current.dispatchEvent(new KeyboardEvent("keydown",{key:M})),y.current.focus())},V=O=>{const{key:M}=O;if(c===o){if(M==="Enter"){O.preventDefault(),g(o,!0,s);return}let j=0;if(M==="ArrowRight")if(s<Kt(c))j=1;else{O.preventDefault();return}else if(M==="ArrowLeft")if(s>1)j=-1;else{O.preventDefault();return}else M==="ArrowDown"?j=6:M==="ArrowUp"&&(j=-6);s+j<=0||s+j>Kt(c)?l(0):j!==0&&(l(s+j),O.preventDefault())}};return P.useEffect(()=>{o===c?o===ue.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),P.useLayoutEffect(()=>{v(u)},[u]),P.useLayoutEffect(()=>{const O=setTimeout(()=>{if(d&&b.current&&h.current){const j=h.current.offsetTop-hl;b.current.scrollTo({top:j,behavior:"instant"})}},10);return()=>{clearTimeout(O)}},[d]),f.jsx("div",{className:"pr-flex",children:f.jsxs(La,{modal:!1,open:u,onOpenChange:x,children:[f.jsx(Fa,{asChild:!0,children:f.jsx(pl,{ref:y,value:n,handleSearch:_,handleKeyDown:F,handleOnClick:()=>{a(ue.bookNumberToId(e.bookNum)),p(ue.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),m(!0),y.current.focus()},onFocus:()=>{w.current=!0},handleSubmit:S,placeholder:`${ue.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),f.jsxs(Hr,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:L,align:"start",ref:b,children:[f.jsx(fl,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),Ao.map((O,M)=>k(O).length>0&&f.jsxs("div",{children:[f.jsx(Yn,{className:"pr-font-semibold pr-text-slate-700",children:ml[O]}),k(O).map(j=>f.jsx("div",{children:f.jsx(dl,{bookId:j,handleSelectBook:()=>g(j,!1),isSelected:o===j,handleHighlightBook:()=>p(j),handleKeyDown:V,bookType:O,ref:B=>{o===j&&(h.current=B)},children:f.jsx(ul,{handleSelectChapter:N,endChapter:Kt(j),activeChapter:e.bookNum===ue.bookIdToNumber(j)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:B=>{l(B)}})})},j)),Ao.length-1!==M?f.jsx(Xr,{}):void 0]},O))]})]})})}const Wa=Vr.cva("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),tt=P.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},a)=>{const s=r?Ls.Slot:"button";return f.jsx(s,{className:G(Wa({variant:t,size:n,className:e})),ref:a,...o})});tt.displayName="Button";const El=dn.Root,kl=dn.Trigger,Xa=E.forwardRef(({className:e,align:t="center",sideOffset:n=4,...r},o)=>f.jsx(dn.Portal,{children:f.jsx(dn.Content,{ref:o,align:t,sideOffset:n,className:G("pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r})}));Xa.displayName=dn.Content.displayName;const Tl=Ye.Portal,Ya=E.forwardRef(({className:e,...t},n)=>f.jsx(Ye.Overlay,{ref:n,className:G("pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",e),...t}));Ya.displayName=Ye.Overlay.displayName;const Cl=E.forwardRef(({className:e,children:t,...n},r)=>f.jsxs(Tl,{children:[f.jsx(Ya,{}),f.jsxs(Ye.Content,{ref:r,className:G("pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",e),...n,children:[t,f.jsxs(Ye.Close,{className:"pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground",children:[f.jsx(He.X,{className:"pr-h-4 pr-w-4"}),f.jsx("span",{className:"pr-sr-only",children:"Close"})]})]})]}));Cl.displayName=Ye.Content.displayName;const Nl=E.forwardRef(({className:e,...t},n)=>f.jsx(Ye.Title,{ref:n,className:G("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight",e),...t}));Nl.displayName=Ye.Title.displayName;const Ol=E.forwardRef(({className:e,...t},n)=>f.jsx(Ye.Description,{ref:n,className:G("pr-text-sm pr-text-muted-foreground",e),...t}));Ol.displayName=Ye.Description.displayName;const Ga=E.forwardRef(({className:e,...t},n)=>f.jsx(Re.Command,{ref:n,className:G("pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",e),...t}));Ga.displayName=Re.Command.displayName;const Ka=E.forwardRef(({className:e,...t},n)=>f.jsxs("div",{className:"pr-flex pr-items-center pr-border-b pr-px-3","cmdk-input-wrapper":"",children:[f.jsx(He.Search,{className:"pr-mr-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"}),f.jsx(Re.Command.Input,{ref:n,className:G("pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...t})]}));Ka.displayName=Re.Command.Input.displayName;const Ja=E.forwardRef(({className:e,...t},n)=>f.jsx(Re.Command.List,{ref:n,className:G("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden",e),...t}));Ja.displayName=Re.Command.List.displayName;const Za=E.forwardRef((e,t)=>f.jsx(Re.Command.Empty,{ref:t,className:"pr-py-6 pr-text-center pr-text-sm",...e}));Za.displayName=Re.Command.Empty.displayName;const Sl=E.forwardRef(({className:e,...t},n)=>f.jsx(Re.Command.Group,{ref:n,className:G("pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",e),...t}));Sl.displayName=Re.Command.Group.displayName;const Pl=E.forwardRef(({className:e,...t},n)=>f.jsx(Re.Command.Separator,{ref:n,className:G("pr--mx-1 pr-h-px pr-bg-border",e),...t}));Pl.displayName=Re.Command.Separator.displayName;const Qa=E.forwardRef(({className:e,...t},n)=>f.jsx(Re.Command.Item,{ref:n,className:G("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",e),...t}));Qa.displayName=Re.Command.Item.displayName;function Rl(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function Bn({id:e,options:t=[],className:n,value:r,onChange:o=()=>{},getOptionLabel:a=Rl,buttonPlaceholder:s="",textPlaceholder:l="",commandEmptyMessage:c="No option found",buttonVariant:p="outline"}){const[u,m]=P.useState(!1);return f.jsxs(El,{open:u,onOpenChange:m,children:[f.jsx(kl,{asChild:!0,children:f.jsxs(tt,{variant:p,role:"combobox","aria-expanded":u,id:e,className:G("pr-w-[200px] pr-justify-between",n),children:[r?a(r):s,f.jsx(He.ChevronsUpDown,{className:"pr-ml-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"})]})}),f.jsx(Xa,{className:"pr-w-[200px] pr-p-0",children:f.jsxs(Ga,{children:[f.jsx(Ka,{placeholder:l,className:"pr-text-inherit"}),f.jsx(Za,{children:c}),f.jsx(Ja,{children:t.map(d=>f.jsxs(Qa,{value:a(d),onSelect:()=>{o(d),m(!1)},children:[f.jsx(He.Check,{className:G("pr-mr-2 pr-h-4 pr-w-4",{"pr-opacity-0":!r||a(r)!==a(d)})}),a(d)]},a(d)))})]})})]})}function jl({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,a]=P.useState(1),[s,l]=P.useState(r),[c,p]=P.useState(Array.from({length:r},(d,v)=>v+1));P.useEffect(()=>{a(1),e(1),l(r),t(r),p(Array.from({length:r},(d,v)=>v+1))},[r,t,e]);const u=d=>{a(d),e(d),d>s&&(l(d),t(d))},m=d=>{l(d),t(d),d<o&&(a(d),e(d))};return f.jsxs(f.Fragment,{children:[f.jsx(ye.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:f.jsx(Bn,{onChange:u,className:"book-selection-chapter",options:c,getOptionLabel:d=>d.toString(),value:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),f.jsx(ye.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:f.jsx(Bn,{onChange:m,className:"book-selection-chapter",options:c,getOptionLabel:d=>d.toString(),value:s},"end chapter"),label:"to",labelPlacement:"start"})]})}var yt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(yt||{});function Yr({id:e,isChecked:t,labelText:n="",labelPosition:r=yt.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:s=!1,hasError:l=!1,className:c,onChange:p}){const u=f.jsx(ye.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:a,disabled:s,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:p});let m;if(n){const d=r===yt.Before||r===yt.Above,v=f.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),y=r===yt.Before||r===yt.After,b=y?v:f.jsx("div",{children:v}),h=y?u:f.jsx("div",{children:u});m=f.jsxs(ye.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:l,children:[d&&b,h,!d&&b]})}else m=u;return m}function Ml({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:a,createLabel:s}){return f.jsxs("fieldset",{id:e,className:t,children:[n&&f.jsx("legend",{children:n}),r.map(l=>f.jsx(Yr,{className:"check-item",isChecked:o.includes(l),labelText:s?s(l):l,onChange:()=>a(l)},l))]})}function de(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,a;for(a=0;a<r.length;a++)o=r[a],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function T(){return T=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},T.apply(this,arguments)}function $l(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function _l(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Rr={exports:{}},Pn={exports:{}},se={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Do;function Il(){if(Do)return se;Do=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,p=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,m=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,b=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,k=e?Symbol.for("react.responder"):60118,_=e?Symbol.for("react.scope"):60119;function w(g){if(typeof g=="object"&&g!==null){var N=g.$$typeof;switch(N){case t:switch(g=g.type,g){case c:case p:case r:case a:case o:case m:return g;default:switch(g=g&&g.$$typeof,g){case l:case u:case y:case v:case s:return g;default:return N}}case n:return N}}}function x(g){return w(g)===p}return se.AsyncMode=c,se.ConcurrentMode=p,se.ContextConsumer=l,se.ContextProvider=s,se.Element=t,se.ForwardRef=u,se.Fragment=r,se.Lazy=y,se.Memo=v,se.Portal=n,se.Profiler=a,se.StrictMode=o,se.Suspense=m,se.isAsyncMode=function(g){return x(g)||w(g)===c},se.isConcurrentMode=x,se.isContextConsumer=function(g){return w(g)===l},se.isContextProvider=function(g){return w(g)===s},se.isElement=function(g){return typeof g=="object"&&g!==null&&g.$$typeof===t},se.isForwardRef=function(g){return w(g)===u},se.isFragment=function(g){return w(g)===r},se.isLazy=function(g){return w(g)===y},se.isMemo=function(g){return w(g)===v},se.isPortal=function(g){return w(g)===n},se.isProfiler=function(g){return w(g)===a},se.isStrictMode=function(g){return w(g)===o},se.isSuspense=function(g){return w(g)===m},se.isValidElementType=function(g){return typeof g=="string"||typeof g=="function"||g===r||g===p||g===a||g===o||g===m||g===d||typeof g=="object"&&g!==null&&(g.$$typeof===y||g.$$typeof===v||g.$$typeof===s||g.$$typeof===l||g.$$typeof===u||g.$$typeof===h||g.$$typeof===k||g.$$typeof===_||g.$$typeof===b)},se.typeOf=w,se}var le={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Bo;function Al(){return Bo||(Bo=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,p=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,m=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,b=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,k=e?Symbol.for("react.responder"):60118,_=e?Symbol.for("react.scope"):60119;function w(I){return typeof I=="string"||typeof I=="function"||I===r||I===p||I===a||I===o||I===m||I===d||typeof I=="object"&&I!==null&&(I.$$typeof===y||I.$$typeof===v||I.$$typeof===s||I.$$typeof===l||I.$$typeof===u||I.$$typeof===h||I.$$typeof===k||I.$$typeof===_||I.$$typeof===b)}function x(I){if(typeof I=="object"&&I!==null){var Q=I.$$typeof;switch(Q){case t:var R=I.type;switch(R){case c:case p:case r:case a:case o:case m:return R;default:var ae=R&&R.$$typeof;switch(ae){case l:case u:case y:case v:case s:return ae;default:return Q}}case n:return Q}}}var g=c,N=p,S=l,F=s,L=t,V=u,O=r,M=y,j=v,B=n,D=a,$=o,z=m,te=!1;function ee(I){return te||(te=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),C(I)||x(I)===c}function C(I){return x(I)===p}function A(I){return x(I)===l}function q(I){return x(I)===s}function K(I){return typeof I=="object"&&I!==null&&I.$$typeof===t}function U(I){return x(I)===u}function H(I){return x(I)===r}function X(I){return x(I)===y}function Y(I){return x(I)===v}function W(I){return x(I)===n}function J(I){return x(I)===a}function Z(I){return x(I)===o}function oe(I){return x(I)===m}le.AsyncMode=g,le.ConcurrentMode=N,le.ContextConsumer=S,le.ContextProvider=F,le.Element=L,le.ForwardRef=V,le.Fragment=O,le.Lazy=M,le.Memo=j,le.Portal=B,le.Profiler=D,le.StrictMode=$,le.Suspense=z,le.isAsyncMode=ee,le.isConcurrentMode=C,le.isContextConsumer=A,le.isContextProvider=q,le.isElement=K,le.isForwardRef=U,le.isFragment=H,le.isLazy=X,le.isMemo=Y,le.isPortal=W,le.isProfiler=J,le.isStrictMode=Z,le.isSuspense=oe,le.isValidElementType=w,le.typeOf=x}()),le}var Lo;function ei(){return Lo||(Lo=1,process.env.NODE_ENV==="production"?Pn.exports=Il():Pn.exports=Al()),Pn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var fr,Fo;function Dl(){if(Fo)return fr;Fo=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var s={},l=0;l<10;l++)s["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(s).map(function(u){return s[u]});if(c.join("")!=="0123456789")return!1;var p={};return"abcdefghijklmnopqrst".split("").forEach(function(u){p[u]=u}),Object.keys(Object.assign({},p)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return fr=o()?Object.assign:function(a,s){for(var l,c=r(a),p,u=1;u<arguments.length;u++){l=Object(arguments[u]);for(var m in l)t.call(l,m)&&(c[m]=l[m]);if(e){p=e(l);for(var d=0;d<p.length;d++)n.call(l,p[d])&&(c[p[d]]=l[p[d]])}}return c},fr}var mr,Vo;function Gr(){if(Vo)return mr;Vo=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return mr=e,mr}var hr,zo;function ti(){return zo||(zo=1,hr=Function.call.bind(Object.prototype.hasOwnProperty)),hr}var gr,Uo;function Bl(){if(Uo)return gr;Uo=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Gr(),n={},r=ti();e=function(a){var s="Warning: "+a;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(a,s,l,c,p){if(process.env.NODE_ENV!=="production"){for(var u in a)if(r(a,u)){var m;try{if(typeof a[u]!="function"){var d=Error((c||"React class")+": "+l+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw d.name="Invariant Violation",d}m=a[u](s,u,c,l,null,t)}catch(y){m=y}if(m&&!(m instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+u+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof m+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),m instanceof Error&&!(m.message in n)){n[m.message]=!0;var v=p?p():"";e("Failed "+l+" type: "+m.message+(v??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},gr=o,gr}var br,qo;function Ll(){if(qo)return br;qo=1;var e=ei(),t=Dl(),n=Gr(),r=ti(),o=Bl(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function s(){return null}return br=function(l,c){var p=typeof Symbol=="function"&&Symbol.iterator,u="@@iterator";function m(C){var A=C&&(p&&C[p]||C[u]);if(typeof A=="function")return A}var d="<<anonymous>>",v={array:k("array"),bigint:k("bigint"),bool:k("boolean"),func:k("function"),number:k("number"),object:k("object"),string:k("string"),symbol:k("symbol"),any:_(),arrayOf:w,element:x(),elementType:g(),instanceOf:N,node:V(),objectOf:F,oneOf:S,oneOfType:L,shape:M,exact:j};function y(C,A){return C===A?C!==0||1/C===1/A:C!==C&&A!==A}function b(C,A){this.message=C,this.data=A&&typeof A=="object"?A:{},this.stack=""}b.prototype=Error.prototype;function h(C){if(process.env.NODE_ENV!=="production")var A={},q=0;function K(H,X,Y,W,J,Z,oe){if(W=W||d,Z=Z||Y,oe!==n){if(c){var I=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw I.name="Invariant Violation",I}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var Q=W+":"+Y;!A[Q]&&q<3&&(a("You are manually calling a React.PropTypes validation function for the `"+Z+"` prop on `"+W+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),A[Q]=!0,q++)}}return X[Y]==null?H?X[Y]===null?new b("The "+J+" `"+Z+"` is marked as required "+("in `"+W+"`, but its value is `null`.")):new b("The "+J+" `"+Z+"` is marked as required in "+("`"+W+"`, but its value is `undefined`.")):null:C(X,Y,W,J,Z)}var U=K.bind(null,!1);return U.isRequired=K.bind(null,!0),U}function k(C){function A(q,K,U,H,X,Y){var W=q[K],J=$(W);if(J!==C){var Z=z(W);return new b("Invalid "+H+" `"+X+"` of type "+("`"+Z+"` supplied to `"+U+"`, expected ")+("`"+C+"`."),{expectedType:C})}return null}return h(A)}function _(){return h(s)}function w(C){function A(q,K,U,H,X){if(typeof C!="function")return new b("Property `"+X+"` of component `"+U+"` has invalid PropType notation inside arrayOf.");var Y=q[K];if(!Array.isArray(Y)){var W=$(Y);return new b("Invalid "+H+" `"+X+"` of type "+("`"+W+"` supplied to `"+U+"`, expected an array."))}for(var J=0;J<Y.length;J++){var Z=C(Y,J,U,H,X+"["+J+"]",n);if(Z instanceof Error)return Z}return null}return h(A)}function x(){function C(A,q,K,U,H){var X=A[q];if(!l(X)){var Y=$(X);return new b("Invalid "+U+" `"+H+"` of type "+("`"+Y+"` supplied to `"+K+"`, expected a single ReactElement."))}return null}return h(C)}function g(){function C(A,q,K,U,H){var X=A[q];if(!e.isValidElementType(X)){var Y=$(X);return new b("Invalid "+U+" `"+H+"` of type "+("`"+Y+"` supplied to `"+K+"`, expected a single ReactElement type."))}return null}return h(C)}function N(C){function A(q,K,U,H,X){if(!(q[K]instanceof C)){var Y=C.name||d,W=ee(q[K]);return new b("Invalid "+H+" `"+X+"` of type "+("`"+W+"` supplied to `"+U+"`, expected ")+("instance of `"+Y+"`."))}return null}return h(A)}function S(C){if(!Array.isArray(C))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),s;function A(q,K,U,H,X){for(var Y=q[K],W=0;W<C.length;W++)if(y(Y,C[W]))return null;var J=JSON.stringify(C,function(oe,I){var Q=z(I);return Q==="symbol"?String(I):I});return new b("Invalid "+H+" `"+X+"` of value `"+String(Y)+"` "+("supplied to `"+U+"`, expected one of "+J+"."))}return h(A)}function F(C){function A(q,K,U,H,X){if(typeof C!="function")return new b("Property `"+X+"` of component `"+U+"` has invalid PropType notation inside objectOf.");var Y=q[K],W=$(Y);if(W!=="object")return new b("Invalid "+H+" `"+X+"` of type "+("`"+W+"` supplied to `"+U+"`, expected an object."));for(var J in Y)if(r(Y,J)){var Z=C(Y,J,U,H,X+"."+J,n);if(Z instanceof Error)return Z}return null}return h(A)}function L(C){if(!Array.isArray(C))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var A=0;A<C.length;A++){var q=C[A];if(typeof q!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+te(q)+" at index "+A+"."),s}function K(U,H,X,Y,W){for(var J=[],Z=0;Z<C.length;Z++){var oe=C[Z],I=oe(U,H,X,Y,W,n);if(I==null)return null;I.data&&r(I.data,"expectedType")&&J.push(I.data.expectedType)}var Q=J.length>0?", expected one of type ["+J.join(", ")+"]":"";return new b("Invalid "+Y+" `"+W+"` supplied to "+("`"+X+"`"+Q+"."))}return h(K)}function V(){function C(A,q,K,U,H){return B(A[q])?null:new b("Invalid "+U+" `"+H+"` supplied to "+("`"+K+"`, expected a ReactNode."))}return h(C)}function O(C,A,q,K,U){return new b((C||"React class")+": "+A+" type `"+q+"."+K+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+U+"`.")}function M(C){function A(q,K,U,H,X){var Y=q[K],W=$(Y);if(W!=="object")return new b("Invalid "+H+" `"+X+"` of type `"+W+"` "+("supplied to `"+U+"`, expected `object`."));for(var J in C){var Z=C[J];if(typeof Z!="function")return O(U,H,X,J,z(Z));var oe=Z(Y,J,U,H,X+"."+J,n);if(oe)return oe}return null}return h(A)}function j(C){function A(q,K,U,H,X){var Y=q[K],W=$(Y);if(W!=="object")return new b("Invalid "+H+" `"+X+"` of type `"+W+"` "+("supplied to `"+U+"`, expected `object`."));var J=t({},q[K],C);for(var Z in J){var oe=C[Z];if(r(C,Z)&&typeof oe!="function")return O(U,H,X,Z,z(oe));if(!oe)return new b("Invalid "+H+" `"+X+"` key `"+Z+"` supplied to `"+U+"`.\nBad object: "+JSON.stringify(q[K],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(C),null,"  "));var I=oe(Y,Z,U,H,X+"."+Z,n);if(I)return I}return null}return h(A)}function B(C){switch(typeof C){case"number":case"string":case"undefined":return!0;case"boolean":return!C;case"object":if(Array.isArray(C))return C.every(B);if(C===null||l(C))return!0;var A=m(C);if(A){var q=A.call(C),K;if(A!==C.entries){for(;!(K=q.next()).done;)if(!B(K.value))return!1}else for(;!(K=q.next()).done;){var U=K.value;if(U&&!B(U[1]))return!1}}else return!1;return!0;default:return!1}}function D(C,A){return C==="symbol"?!0:A?A["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&A instanceof Symbol:!1}function $(C){var A=typeof C;return Array.isArray(C)?"array":C instanceof RegExp?"object":D(A,C)?"symbol":A}function z(C){if(typeof C>"u"||C===null)return""+C;var A=$(C);if(A==="object"){if(C instanceof Date)return"date";if(C instanceof RegExp)return"regexp"}return A}function te(C){var A=z(C);switch(A){case"array":case"object":return"an "+A;case"boolean":case"date":case"regexp":return"a "+A;default:return A}}function ee(C){return!C.constructor||!C.constructor.name?d:C.constructor.name}return v.checkPropTypes=o,v.resetWarningCache=o.resetWarningCache,v.PropTypes=v,v},br}var vr,Ho;function Fl(){if(Ho)return vr;Ho=1;var e=Gr();function t(){}function n(){}return n.resetWarningCache=t,vr=function(){function r(s,l,c,p,u,m){if(m!==e){var d=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw d.name="Invariant Violation",d}}r.isRequired=r;function o(){return r}var a={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return a.PropTypes=a,a},vr}if(process.env.NODE_ENV!=="production"){var Vl=ei(),zl=!0;Rr.exports=Ll()(Vl.isElement,zl)}else Rr.exports=Fl()();var Ul=Rr.exports;const i=$l(Ul);function Ut(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function wt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function ni(e){if(!wt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=ni(e[n])}),t}function nt(e,t,n={clone:!0}){const r=n.clone?T({},e):e;return wt(e)&&wt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(wt(t[o])&&o in e&&wt(e[o])?r[o]=nt(e[o],t[o],n):n.clone?r[o]=wt(t[o])?ni(t[o]):t[o]:r[o]=t[o])}),r}function ql(e){const{prototype:t={}}=e;return!!t.isReactComponent}function ri(e,t,n,r,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let l;const c=a.type;return typeof c=="function"&&!ql(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const oi=Ut(i.element,ri);oi.isRequired=Ut(i.element.isRequired,ri);const yn=oi;function Hl(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Wl(e,t,n,r,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let l;return typeof a=="function"&&!Hl(a)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Xl=Ut(i.elementType,Wl),Yl="exact-prop: ​";function ai(e){return process.env.NODE_ENV==="production"?e:T({},e,{[Yl]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function At(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var jr={exports:{}},ce={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wo;function Gl(){if(Wo)return ce;Wo=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),m=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),y;y=Symbol.for("react.module.reference");function b(h){if(typeof h=="object"&&h!==null){var k=h.$$typeof;switch(k){case e:switch(h=h.type,h){case n:case o:case r:case p:case u:return h;default:switch(h=h&&h.$$typeof,h){case l:case s:case c:case d:case m:case a:return h;default:return k}}case t:return k}}}return ce.ContextConsumer=s,ce.ContextProvider=a,ce.Element=e,ce.ForwardRef=c,ce.Fragment=n,ce.Lazy=d,ce.Memo=m,ce.Portal=t,ce.Profiler=o,ce.StrictMode=r,ce.Suspense=p,ce.SuspenseList=u,ce.isAsyncMode=function(){return!1},ce.isConcurrentMode=function(){return!1},ce.isContextConsumer=function(h){return b(h)===s},ce.isContextProvider=function(h){return b(h)===a},ce.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===e},ce.isForwardRef=function(h){return b(h)===c},ce.isFragment=function(h){return b(h)===n},ce.isLazy=function(h){return b(h)===d},ce.isMemo=function(h){return b(h)===m},ce.isPortal=function(h){return b(h)===t},ce.isProfiler=function(h){return b(h)===o},ce.isStrictMode=function(h){return b(h)===r},ce.isSuspense=function(h){return b(h)===p},ce.isSuspenseList=function(h){return b(h)===u},ce.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===n||h===o||h===r||h===p||h===u||h===v||typeof h=="object"&&h!==null&&(h.$$typeof===d||h.$$typeof===m||h.$$typeof===a||h.$$typeof===s||h.$$typeof===c||h.$$typeof===y||h.getModuleId!==void 0)},ce.typeOf=b,ce}var pe={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xo;function Kl(){return Xo||(Xo=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),m=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),y=!1,b=!1,h=!1,k=!1,_=!1,w;w=Symbol.for("react.module.reference");function x(R){return!!(typeof R=="string"||typeof R=="function"||R===n||R===o||_||R===r||R===p||R===u||k||R===v||y||b||h||typeof R=="object"&&R!==null&&(R.$$typeof===d||R.$$typeof===m||R.$$typeof===a||R.$$typeof===s||R.$$typeof===c||R.$$typeof===w||R.getModuleId!==void 0))}function g(R){if(typeof R=="object"&&R!==null){var ae=R.$$typeof;switch(ae){case e:var we=R.type;switch(we){case n:case o:case r:case p:case u:return we;default:var Ce=we&&we.$$typeof;switch(Ce){case l:case s:case c:case d:case m:case a:return Ce;default:return ae}}case t:return ae}}}var N=s,S=a,F=e,L=c,V=n,O=d,M=m,j=t,B=o,D=r,$=p,z=u,te=!1,ee=!1;function C(R){return te||(te=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function A(R){return ee||(ee=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function q(R){return g(R)===s}function K(R){return g(R)===a}function U(R){return typeof R=="object"&&R!==null&&R.$$typeof===e}function H(R){return g(R)===c}function X(R){return g(R)===n}function Y(R){return g(R)===d}function W(R){return g(R)===m}function J(R){return g(R)===t}function Z(R){return g(R)===o}function oe(R){return g(R)===r}function I(R){return g(R)===p}function Q(R){return g(R)===u}pe.ContextConsumer=N,pe.ContextProvider=S,pe.Element=F,pe.ForwardRef=L,pe.Fragment=V,pe.Lazy=O,pe.Memo=M,pe.Portal=j,pe.Profiler=B,pe.StrictMode=D,pe.Suspense=$,pe.SuspenseList=z,pe.isAsyncMode=C,pe.isConcurrentMode=A,pe.isContextConsumer=q,pe.isContextProvider=K,pe.isElement=U,pe.isForwardRef=H,pe.isFragment=X,pe.isLazy=Y,pe.isMemo=W,pe.isPortal=J,pe.isProfiler=Z,pe.isStrictMode=oe,pe.isSuspense=I,pe.isSuspenseList=Q,pe.isValidElementType=x,pe.typeOf=g}()),pe}process.env.NODE_ENV==="production"?jr.exports=Gl():jr.exports=Kl();var Ln=jr.exports;const Jl=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Zl(e){const t=`${e}`.match(Jl);return t&&t[1]||""}function ii(e,t=""){return e.displayName||e.name||Zl(e)||t}function Yo(e,t,n){const r=ii(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Ql(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return ii(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Ln.ForwardRef:return Yo(e,e.render,"ForwardRef");case Ln.Memo:return Yo(e,e.type,"memo");default:return}}}function rt(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=e[t],s=o||t;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const ec=i.oneOfType([i.func,i.object]),Kr=ec;function Ge(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":At(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Mr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function si(e,t=166){let n;function r(...o){const a=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(a,t)}return r.clear=()=>{clearTimeout(n)},r}function tc(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,a,s)=>{const l=o||"<<anonymous>>",c=s||r;return typeof n[r]<"u"?new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function nc(e,t){var n,r;return E.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function ke(e){return e&&e.ownerDocument||document}function Dt(e){return ke(e).defaultView||window}function rc(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?T({},t.propTypes):null;return o=>(a,s,l,c,p,...u)=>{const m=p||s,d=n==null?void 0:n[m];if(d){const v=d(a,s,l,c,p,...u);if(v)return v}return typeof a[s]<"u"&&!a[o]?new Error(`The prop \`${m}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Fn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const oc=typeof window<"u"?E.useLayoutEffect:E.useEffect,kt=oc;let Go=0;function ac(e){const[t,n]=E.useState(e),r=e||t;return E.useEffect(()=>{t==null&&(Go+=1,n(`mui-${Go}`))},[t]),r}const Ko=E["useId".toString()];function li(e){if(Ko!==void 0){const t=Ko();return e??t}return ac(e)}function ic(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=o||t;return typeof e[t]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function ci({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=E.useRef(e!==void 0),[a,s]=E.useState(t),l=o?e:a;if(process.env.NODE_ENV!=="production"){E.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:p}=E.useRef(t);E.useEffect(()=>{!o&&p!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=E.useCallback(p=>{o||s(p)},[]);return[l,c]}function fn(e){const t=E.useRef(e);return kt(()=>{t.current=e}),E.useRef((...n)=>(0,t.current)(...n)).current}function Fe(...e){return E.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Fn(n,t)})},e)}const Jo={};function sc(e,t){const n=E.useRef(Jo);return n.current===Jo&&(n.current=e(t)),n}const lc=[];function cc(e){E.useEffect(e,lc)}class wn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new wn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function rn(){const e=sc(wn.create).current;return cc(e.disposeEffect),e}let Kn=!0,$r=!1;const pc=new wn,uc={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function dc(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&uc[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function fc(e){e.metaKey||e.altKey||e.ctrlKey||(Kn=!0)}function yr(){Kn=!1}function mc(){this.visibilityState==="hidden"&&$r&&(Kn=!0)}function hc(e){e.addEventListener("keydown",fc,!0),e.addEventListener("mousedown",yr,!0),e.addEventListener("pointerdown",yr,!0),e.addEventListener("touchstart",yr,!0),e.addEventListener("visibilitychange",mc,!0)}function gc(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Kn||dc(t)}function pi(){const e=E.useCallback(o=>{o!=null&&hc(o.ownerDocument)},[]),t=E.useRef(!1);function n(){return t.current?($r=!0,pc.start(100,()=>{$r=!1}),t.current=!1,!0):!1}function r(o){return gc(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function ui(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function bc(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function vc(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const yc=Number.isInteger||vc;function di(e,t,n,r){const o=e[t];if(o==null||!yc(o)){const a=bc(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function fi(e,t,...n){return e[t]===void 0?null:di(e,t,...n)}function _r(){return null}fi.isRequired=di;_r.isRequired=_r;const mi=process.env.NODE_ENV==="production"?_r:fi;function hi(e,t){const n=T({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=T({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},a=t[r];n[r]={},!a||!Object.keys(a)?n[r]=o:!o||!Object.keys(o)?n[r]=a:(n[r]=T({},a),Object.keys(o).forEach(s=>{n[r][s]=hi(o[s],a[s])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function st(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((a,s)=>{if(s){const l=t(s);l!==""&&a.push(l),n&&n[s]&&a.push(n[s])}return a},[]).join(" ")}),r}const Zo=e=>e,wc=()=>{let e=Zo;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Zo}}},xc=wc(),gi=xc,bi={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Je(e,t,n="Mui"){const r=bi[t];return r?`${n}-${r}`:`${gi.generate(e)}-${t}`}function ut(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=Je(e,o,n)}),r}function Ec(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function vi(e){return typeof e=="string"}function on(e,t,n){return e===void 0||vi(e)?t:T({},t,{ownerState:T({},t.ownerState,n)})}const kc={disableDefaultClasses:!1},Tc=E.createContext(kc);function Cc(e){const{disableDefaultClasses:t}=E.useContext(Tc);return n=>t?"":e(n)}function yi(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function Nc(e,t,n){return typeof e=="function"?e(t,n):e}function Qo(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function Oc(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:a}=e;if(!t){const v=Ee(n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),y=T({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),b=T({},n,o,r);return v.length>0&&(b.className=v),Object.keys(y).length>0&&(b.style=y),{props:b,internalRef:void 0}}const s=yi(T({},o,r)),l=Qo(r),c=Qo(o),p=t(s),u=Ee(p==null?void 0:p.className,n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),m=T({},p==null?void 0:p.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),d=T({},p,n,c,l);return u.length>0&&(d.className=u),Object.keys(m).length>0&&(d.style=m),{props:d,internalRef:p.ref}}const Sc=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Tt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:a=!1}=e,s=de(e,Sc),l=a?{}:Nc(r,o),{props:c,internalRef:p}=Oc(T({},s,{externalSlotProps:l})),u=Fe(p,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return on(n,T({},c,{ref:u}),o)}const wi="base";function Pc(e){return`${wi}--${e}`}function Rc(e,t){return`${wi}-${e}-${t}`}function xi(e,t){const n=bi[t];return n?Pc(n):Rc(e,t)}function jc(e,t){const n={};return t.forEach(r=>{n[r]=xi(e,r)}),n}const Mc=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function $c(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function _c(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Ic(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||_c(e))}function Ac(e){const t=[],n=[];return Array.from(e.querySelectorAll(Mc)).forEach((r,o)=>{const a=$c(r);a===-1||!Ic(r)||(a===0?t.push(r):n.push({documentOrder:o,tabIndex:a,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function Dc(){return!0}function Vn(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:a=Ac,isEnabled:s=Dc,open:l}=e,c=E.useRef(!1),p=E.useRef(null),u=E.useRef(null),m=E.useRef(null),d=E.useRef(null),v=E.useRef(!1),y=E.useRef(null),b=Fe(t.ref,y),h=E.useRef(null);E.useEffect(()=>{!l||!y.current||(v.current=!n)},[n,l]),E.useEffect(()=>{if(!l||!y.current)return;const w=ke(y.current);return y.current.contains(w.activeElement)||(y.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),y.current.setAttribute("tabIndex","-1")),v.current&&y.current.focus()),()=>{o||(m.current&&m.current.focus&&(c.current=!0,m.current.focus()),m.current=null)}},[l]),E.useEffect(()=>{if(!l||!y.current)return;const w=ke(y.current),x=S=>{h.current=S,!(r||!s()||S.key!=="Tab")&&w.activeElement===y.current&&S.shiftKey&&(c.current=!0,u.current&&u.current.focus())},g=()=>{const S=y.current;if(S===null)return;if(!w.hasFocus()||!s()||c.current){c.current=!1;return}if(S.contains(w.activeElement)||r&&w.activeElement!==p.current&&w.activeElement!==u.current)return;if(w.activeElement!==d.current)d.current=null;else if(d.current!==null)return;if(!v.current)return;let F=[];if((w.activeElement===p.current||w.activeElement===u.current)&&(F=a(y.current)),F.length>0){var L,V;const O=!!((L=h.current)!=null&&L.shiftKey&&((V=h.current)==null?void 0:V.key)==="Tab"),M=F[0],j=F[F.length-1];typeof M!="string"&&typeof j!="string"&&(O?j.focus():M.focus())}else S.focus()};w.addEventListener("focusin",g),w.addEventListener("keydown",x,!0);const N=setInterval(()=>{w.activeElement&&w.activeElement.tagName==="BODY"&&g()},50);return()=>{clearInterval(N),w.removeEventListener("focusin",g),w.removeEventListener("keydown",x,!0)}},[n,r,o,s,l,a]);const k=w=>{m.current===null&&(m.current=w.relatedTarget),v.current=!0,d.current=w.target;const x=t.props.onFocus;x&&x(w)},_=w=>{m.current===null&&(m.current=w.relatedTarget),v.current=!0};return f.jsxs(E.Fragment,{children:[f.jsx("div",{tabIndex:l?0:-1,onFocus:_,ref:p,"data-testid":"sentinelStart"}),E.cloneElement(t,{ref:b,onFocus:k}),f.jsx("div",{tabIndex:l?0:-1,onFocus:_,ref:u,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(Vn.propTypes={children:yn,disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableRestoreFocus:i.bool,getTabbable:i.func,isEnabled:i.func,open:i.bool.isRequired});process.env.NODE_ENV!=="production"&&(Vn["propTypes"]=ai(Vn.propTypes));function Bc(e){return typeof e=="function"?e():e}const mn=E.forwardRef(function(t,n){const{children:r,container:o,disablePortal:a=!1}=t,[s,l]=E.useState(null),c=Fe(E.isValidElement(r)?r.ref:null,n);if(kt(()=>{a||l(Bc(o)||document.body)},[o,a]),kt(()=>{if(s&&!a)return Fn(n,s),()=>{Fn(n,null)}},[n,s,a]),a){if(E.isValidElement(r)){const p={ref:c};return E.cloneElement(r,p)}return f.jsx(E.Fragment,{children:r})}return f.jsx(E.Fragment,{children:s&&Ws.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&(mn.propTypes={children:i.node,container:i.oneOfType([rt,i.func]),disablePortal:i.bool});process.env.NODE_ENV!=="production"&&(mn["propTypes"]=ai(mn.propTypes));function Lc(e){const t=ke(e);return t.body===e?Dt(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function ln(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function ea(e){return parseInt(Dt(e).getComputedStyle(e).paddingRight,10)||0}function Fc(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function ta(e,t,n,r,o){const a=[t,n,...r];[].forEach.call(e.children,s=>{const l=a.indexOf(s)===-1,c=!Fc(s);l&&c&&ln(s,o)})}function wr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function Vc(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(Lc(r)){const s=ui(ke(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${ea(r)+s}px`;const l=ke(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${ea(c)+s}px`})}let a;if(r.parentNode instanceof DocumentFragment)a=ke(r).body;else{const s=r.parentElement,l=Dt(r);a=(s==null?void 0:s.nodeName)==="HTML"&&l.getComputedStyle(s).overflowY==="scroll"?s:r}n.push({value:a.style.overflow,property:"overflow",el:a},{value:a.style.overflowX,property:"overflow-x",el:a},{value:a.style.overflowY,property:"overflow-y",el:a}),a.style.overflow="hidden"}return()=>{n.forEach(({value:a,el:s,property:l})=>{a?s.style.setProperty(l,a):s.style.removeProperty(l)})}}function zc(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class Uc{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&ln(t.modalRef,!1);const o=zc(n);ta(n,t.mount,t.modalRef,o,!0);const a=wr(this.containers,s=>s.container===n);return a!==-1?(this.containers[a].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=wr(this.containers,a=>a.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=Vc(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=wr(this.containers,s=>s.modals.indexOf(t)!==-1),a=this.containers[o];if(a.modals.splice(a.modals.indexOf(t),1),this.modals.splice(r,1),a.modals.length===0)a.restore&&a.restore(),t.modalRef&&ln(t.modalRef,n),ta(a.container,t.mount,t.modalRef,a.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=a.modals[a.modals.length-1];s.modalRef&&ln(s.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function qc(e){return typeof e=="function"?e():e}function Hc(e){return e?e.props.hasOwnProperty("in"):!1}const Wc=new Uc;function Xc(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Wc,closeAfterTransition:a=!1,onTransitionEnter:s,onTransitionExited:l,children:c,onClose:p,open:u,rootRef:m}=e,d=E.useRef({}),v=E.useRef(null),y=E.useRef(null),b=Fe(y,m),[h,k]=E.useState(!u),_=Hc(c);let w=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(w=!1);const x=()=>ke(v.current),g=()=>(d.current.modalRef=y.current,d.current.mount=v.current,d.current),N=()=>{o.mount(g(),{disableScrollLock:r}),y.current&&(y.current.scrollTop=0)},S=fn(()=>{const $=qc(t)||x().body;o.add(g(),$),y.current&&N()}),F=E.useCallback(()=>o.isTopModal(g()),[o]),L=fn($=>{v.current=$,$&&(u&&F()?N():y.current&&ln(y.current,w))}),V=E.useCallback(()=>{o.remove(g(),w)},[w,o]);E.useEffect(()=>()=>{V()},[V]),E.useEffect(()=>{u?S():(!_||!a)&&V()},[u,V,_,a,S]);const O=$=>z=>{var te;(te=$.onKeyDown)==null||te.call($,z),!(z.key!=="Escape"||z.which===229||!F())&&(n||(z.stopPropagation(),p&&p(z,"escapeKeyDown")))},M=$=>z=>{var te;(te=$.onClick)==null||te.call($,z),z.target===z.currentTarget&&p&&p(z,"backdropClick")};return{getRootProps:($={})=>{const z=yi(e);delete z.onTransitionEnter,delete z.onTransitionExited;const te=T({},z,$);return T({role:"presentation"},te,{onKeyDown:O(te),ref:b})},getBackdropProps:($={})=>{const z=$;return T({"aria-hidden":!0},z,{onClick:M(z),open:u})},getTransitionProps:()=>{const $=()=>{k(!1),s&&s()},z=()=>{k(!0),l&&l(),a&&V()};return{onEnter:Mr($,c==null?void 0:c.props.onEnter),onExited:Mr(z,c==null?void 0:c.props.onExited)}},rootRef:b,portalRef:L,isTopModal:F,exited:h,hasTransition:_}}var Se="top",Ve="bottom",ze="right",Pe="left",Jr="auto",xn=[Se,Ve,ze,Pe],Bt="start",hn="end",Yc="clippingParents",Ei="viewport",Jt="popper",Gc="reference",na=xn.reduce(function(e,t){return e.concat([t+"-"+Bt,t+"-"+hn])},[]),ki=[].concat(xn,[Jr]).reduce(function(e,t){return e.concat([t,t+"-"+Bt,t+"-"+hn])},[]),Kc="beforeRead",Jc="read",Zc="afterRead",Qc="beforeMain",ep="main",tp="afterMain",np="beforeWrite",rp="write",op="afterWrite",ap=[Kc,Jc,Zc,Qc,ep,tp,np,rp,op];function Ke(e){return e?(e.nodeName||"").toLowerCase():null}function Ae(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Ct(e){var t=Ae(e).Element;return e instanceof t||e instanceof Element}function Le(e){var t=Ae(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Zr(e){if(typeof ShadowRoot>"u")return!1;var t=Ae(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function ip(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},a=t.elements[n];!Le(a)||!Ke(a)||(Object.assign(a.style,r),Object.keys(o).forEach(function(s){var l=o[s];l===!1?a.removeAttribute(s):a.setAttribute(s,l===!0?"":l)}))})}function sp(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],a=t.attributes[r]||{},s=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=s.reduce(function(c,p){return c[p]="",c},{});!Le(o)||!Ke(o)||(Object.assign(o.style,l),Object.keys(a).forEach(function(c){o.removeAttribute(c)}))})}}const lp={name:"applyStyles",enabled:!0,phase:"write",fn:ip,effect:sp,requires:["computeStyles"]};function Xe(e){return e.split("-")[0]}var xt=Math.max,zn=Math.min,Lt=Math.round;function Ir(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ti(){return!/^((?!chrome|android).)*safari/i.test(Ir())}function Ft(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,a=1;t&&Le(e)&&(o=e.offsetWidth>0&&Lt(r.width)/e.offsetWidth||1,a=e.offsetHeight>0&&Lt(r.height)/e.offsetHeight||1);var s=Ct(e)?Ae(e):window,l=s.visualViewport,c=!Ti()&&n,p=(r.left+(c&&l?l.offsetLeft:0))/o,u=(r.top+(c&&l?l.offsetTop:0))/a,m=r.width/o,d=r.height/a;return{width:m,height:d,top:u,right:p+m,bottom:u+d,left:p,x:p,y:u}}function Qr(e){var t=Ft(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Ci(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Zr(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function ot(e){return Ae(e).getComputedStyle(e)}function cp(e){return["table","td","th"].indexOf(Ke(e))>=0}function dt(e){return((Ct(e)?e.ownerDocument:e.document)||window.document).documentElement}function Jn(e){return Ke(e)==="html"?e:e.assignedSlot||e.parentNode||(Zr(e)?e.host:null)||dt(e)}function ra(e){return!Le(e)||ot(e).position==="fixed"?null:e.offsetParent}function pp(e){var t=/firefox/i.test(Ir()),n=/Trident/i.test(Ir());if(n&&Le(e)){var r=ot(e);if(r.position==="fixed")return null}var o=Jn(e);for(Zr(o)&&(o=o.host);Le(o)&&["html","body"].indexOf(Ke(o))<0;){var a=ot(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function En(e){for(var t=Ae(e),n=ra(e);n&&cp(n)&&ot(n).position==="static";)n=ra(n);return n&&(Ke(n)==="html"||Ke(n)==="body"&&ot(n).position==="static")?t:n||pp(e)||t}function eo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function cn(e,t,n){return xt(e,zn(t,n))}function up(e,t,n){var r=cn(e,t,n);return r>n?n:r}function Ni(){return{top:0,right:0,bottom:0,left:0}}function Oi(e){return Object.assign({},Ni(),e)}function Si(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var dp=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Oi(typeof t!="number"?t:Si(t,xn))};function fp(e){var t,n=e.state,r=e.name,o=e.options,a=n.elements.arrow,s=n.modifiersData.popperOffsets,l=Xe(n.placement),c=eo(l),p=[Pe,ze].indexOf(l)>=0,u=p?"height":"width";if(!(!a||!s)){var m=dp(o.padding,n),d=Qr(a),v=c==="y"?Se:Pe,y=c==="y"?Ve:ze,b=n.rects.reference[u]+n.rects.reference[c]-s[c]-n.rects.popper[u],h=s[c]-n.rects.reference[c],k=En(a),_=k?c==="y"?k.clientHeight||0:k.clientWidth||0:0,w=b/2-h/2,x=m[v],g=_-d[u]-m[y],N=_/2-d[u]/2+w,S=cn(x,N,g),F=c;n.modifiersData[r]=(t={},t[F]=S,t.centerOffset=S-N,t)}}function mp(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Ci(t.elements.popper,o)&&(t.elements.arrow=o))}const hp={name:"arrow",enabled:!0,phase:"main",fn:fp,effect:mp,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Vt(e){return e.split("-")[1]}var gp={top:"auto",right:"auto",bottom:"auto",left:"auto"};function bp(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Lt(n*o)/o||0,y:Lt(r*o)/o||0}}function oa(e){var t,n=e.popper,r=e.popperRect,o=e.placement,a=e.variation,s=e.offsets,l=e.position,c=e.gpuAcceleration,p=e.adaptive,u=e.roundOffsets,m=e.isFixed,d=s.x,v=d===void 0?0:d,y=s.y,b=y===void 0?0:y,h=typeof u=="function"?u({x:v,y:b}):{x:v,y:b};v=h.x,b=h.y;var k=s.hasOwnProperty("x"),_=s.hasOwnProperty("y"),w=Pe,x=Se,g=window;if(p){var N=En(n),S="clientHeight",F="clientWidth";if(N===Ae(n)&&(N=dt(n),ot(N).position!=="static"&&l==="absolute"&&(S="scrollHeight",F="scrollWidth")),N=N,o===Se||(o===Pe||o===ze)&&a===hn){x=Ve;var L=m&&N===g&&g.visualViewport?g.visualViewport.height:N[S];b-=L-r.height,b*=c?1:-1}if(o===Pe||(o===Se||o===Ve)&&a===hn){w=ze;var V=m&&N===g&&g.visualViewport?g.visualViewport.width:N[F];v-=V-r.width,v*=c?1:-1}}var O=Object.assign({position:l},p&&gp),M=u===!0?bp({x:v,y:b},Ae(n)):{x:v,y:b};if(v=M.x,b=M.y,c){var j;return Object.assign({},O,(j={},j[x]=_?"0":"",j[w]=k?"0":"",j.transform=(g.devicePixelRatio||1)<=1?"translate("+v+"px, "+b+"px)":"translate3d("+v+"px, "+b+"px, 0)",j))}return Object.assign({},O,(t={},t[x]=_?b+"px":"",t[w]=k?v+"px":"",t.transform="",t))}function vp(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,a=n.adaptive,s=a===void 0?!0:a,l=n.roundOffsets,c=l===void 0?!0:l,p={placement:Xe(t.placement),variation:Vt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,oa(Object.assign({},p,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,oa(Object.assign({},p,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const yp={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:vp,data:{}};var Rn={passive:!0};function wp(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,a=o===void 0?!0:o,s=r.resize,l=s===void 0?!0:s,c=Ae(t.elements.popper),p=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&p.forEach(function(u){u.addEventListener("scroll",n.update,Rn)}),l&&c.addEventListener("resize",n.update,Rn),function(){a&&p.forEach(function(u){u.removeEventListener("scroll",n.update,Rn)}),l&&c.removeEventListener("resize",n.update,Rn)}}const xp={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:wp,data:{}};var Ep={left:"right",right:"left",bottom:"top",top:"bottom"};function _n(e){return e.replace(/left|right|bottom|top/g,function(t){return Ep[t]})}var kp={start:"end",end:"start"};function aa(e){return e.replace(/start|end/g,function(t){return kp[t]})}function to(e){var t=Ae(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function no(e){return Ft(dt(e)).left+to(e).scrollLeft}function Tp(e,t){var n=Ae(e),r=dt(e),o=n.visualViewport,a=r.clientWidth,s=r.clientHeight,l=0,c=0;if(o){a=o.width,s=o.height;var p=Ti();(p||!p&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:a,height:s,x:l+no(e),y:c}}function Cp(e){var t,n=dt(e),r=to(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=xt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=xt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+no(e),c=-r.scrollTop;return ot(o||n).direction==="rtl"&&(l+=xt(n.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:l,y:c}}function ro(e){var t=ot(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Pi(e){return["html","body","#document"].indexOf(Ke(e))>=0?e.ownerDocument.body:Le(e)&&ro(e)?e:Pi(Jn(e))}function pn(e,t){var n;t===void 0&&(t=[]);var r=Pi(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),a=Ae(r),s=o?[a].concat(a.visualViewport||[],ro(r)?r:[]):r,l=t.concat(s);return o?l:l.concat(pn(Jn(s)))}function Ar(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Np(e,t){var n=Ft(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function ia(e,t,n){return t===Ei?Ar(Tp(e,n)):Ct(t)?Np(t,n):Ar(Cp(dt(e)))}function Op(e){var t=pn(Jn(e)),n=["absolute","fixed"].indexOf(ot(e).position)>=0,r=n&&Le(e)?En(e):e;return Ct(r)?t.filter(function(o){return Ct(o)&&Ci(o,r)&&Ke(o)!=="body"}):[]}function Sp(e,t,n,r){var o=t==="clippingParents"?Op(e):[].concat(t),a=[].concat(o,[n]),s=a[0],l=a.reduce(function(c,p){var u=ia(e,p,r);return c.top=xt(u.top,c.top),c.right=zn(u.right,c.right),c.bottom=zn(u.bottom,c.bottom),c.left=xt(u.left,c.left),c},ia(e,s,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function Ri(e){var t=e.reference,n=e.element,r=e.placement,o=r?Xe(r):null,a=r?Vt(r):null,s=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Se:c={x:s,y:t.y-n.height};break;case Ve:c={x:s,y:t.y+t.height};break;case ze:c={x:t.x+t.width,y:l};break;case Pe:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var p=o?eo(o):null;if(p!=null){var u=p==="y"?"height":"width";switch(a){case Bt:c[p]=c[p]-(t[u]/2-n[u]/2);break;case hn:c[p]=c[p]+(t[u]/2-n[u]/2);break}}return c}function gn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,a=n.strategy,s=a===void 0?e.strategy:a,l=n.boundary,c=l===void 0?Yc:l,p=n.rootBoundary,u=p===void 0?Ei:p,m=n.elementContext,d=m===void 0?Jt:m,v=n.altBoundary,y=v===void 0?!1:v,b=n.padding,h=b===void 0?0:b,k=Oi(typeof h!="number"?h:Si(h,xn)),_=d===Jt?Gc:Jt,w=e.rects.popper,x=e.elements[y?_:d],g=Sp(Ct(x)?x:x.contextElement||dt(e.elements.popper),c,u,s),N=Ft(e.elements.reference),S=Ri({reference:N,element:w,strategy:"absolute",placement:o}),F=Ar(Object.assign({},w,S)),L=d===Jt?F:N,V={top:g.top-L.top+k.top,bottom:L.bottom-g.bottom+k.bottom,left:g.left-L.left+k.left,right:L.right-g.right+k.right},O=e.modifiersData.offset;if(d===Jt&&O){var M=O[o];Object.keys(V).forEach(function(j){var B=[ze,Ve].indexOf(j)>=0?1:-1,D=[Se,Ve].indexOf(j)>=0?"y":"x";V[j]+=M[D]*B})}return V}function Pp(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,a=n.rootBoundary,s=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,p=c===void 0?ki:c,u=Vt(r),m=u?l?na:na.filter(function(y){return Vt(y)===u}):xn,d=m.filter(function(y){return p.indexOf(y)>=0});d.length===0&&(d=m);var v=d.reduce(function(y,b){return y[b]=gn(e,{placement:b,boundary:o,rootBoundary:a,padding:s})[Xe(b)],y},{});return Object.keys(v).sort(function(y,b){return v[y]-v[b]})}function Rp(e){if(Xe(e)===Jr)return[];var t=_n(e);return[aa(e),t,aa(t)]}function jp(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,a=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!0:s,c=n.fallbackPlacements,p=n.padding,u=n.boundary,m=n.rootBoundary,d=n.altBoundary,v=n.flipVariations,y=v===void 0?!0:v,b=n.allowedAutoPlacements,h=t.options.placement,k=Xe(h),_=k===h,w=c||(_||!y?[_n(h)]:Rp(h)),x=[h].concat(w).reduce(function(U,H){return U.concat(Xe(H)===Jr?Pp(t,{placement:H,boundary:u,rootBoundary:m,padding:p,flipVariations:y,allowedAutoPlacements:b}):H)},[]),g=t.rects.reference,N=t.rects.popper,S=new Map,F=!0,L=x[0],V=0;V<x.length;V++){var O=x[V],M=Xe(O),j=Vt(O)===Bt,B=[Se,Ve].indexOf(M)>=0,D=B?"width":"height",$=gn(t,{placement:O,boundary:u,rootBoundary:m,altBoundary:d,padding:p}),z=B?j?ze:Pe:j?Ve:Se;g[D]>N[D]&&(z=_n(z));var te=_n(z),ee=[];if(a&&ee.push($[M]<=0),l&&ee.push($[z]<=0,$[te]<=0),ee.every(function(U){return U})){L=O,F=!1;break}S.set(O,ee)}if(F)for(var C=y?3:1,A=function(H){var X=x.find(function(Y){var W=S.get(Y);if(W)return W.slice(0,H).every(function(J){return J})});if(X)return L=X,"break"},q=C;q>0;q--){var K=A(q);if(K==="break")break}t.placement!==L&&(t.modifiersData[r]._skip=!0,t.placement=L,t.reset=!0)}}const Mp={name:"flip",enabled:!0,phase:"main",fn:jp,requiresIfExists:["offset"],data:{_skip:!1}};function sa(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function la(e){return[Se,ze,Ve,Pe].some(function(t){return e[t]>=0})}function $p(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,s=gn(t,{elementContext:"reference"}),l=gn(t,{altBoundary:!0}),c=sa(s,r),p=sa(l,o,a),u=la(c),m=la(p);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:p,isReferenceHidden:u,hasPopperEscaped:m},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":m})}const _p={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:$p};function Ip(e,t,n){var r=Xe(e),o=[Pe,Se].indexOf(r)>=0?-1:1,a=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,s=a[0],l=a[1];return s=s||0,l=(l||0)*o,[Pe,ze].indexOf(r)>=0?{x:l,y:s}:{x:s,y:l}}function Ap(e){var t=e.state,n=e.options,r=e.name,o=n.offset,a=o===void 0?[0,0]:o,s=ki.reduce(function(u,m){return u[m]=Ip(m,t.rects,a),u},{}),l=s[t.placement],c=l.x,p=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=p),t.modifiersData[r]=s}const Dp={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Ap};function Bp(e){var t=e.state,n=e.name;t.modifiersData[n]=Ri({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Lp={name:"popperOffsets",enabled:!0,phase:"read",fn:Bp,data:{}};function Fp(e){return e==="x"?"y":"x"}function Vp(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,a=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!1:s,c=n.boundary,p=n.rootBoundary,u=n.altBoundary,m=n.padding,d=n.tether,v=d===void 0?!0:d,y=n.tetherOffset,b=y===void 0?0:y,h=gn(t,{boundary:c,rootBoundary:p,padding:m,altBoundary:u}),k=Xe(t.placement),_=Vt(t.placement),w=!_,x=eo(k),g=Fp(x),N=t.modifiersData.popperOffsets,S=t.rects.reference,F=t.rects.popper,L=typeof b=="function"?b(Object.assign({},t.rects,{placement:t.placement})):b,V=typeof L=="number"?{mainAxis:L,altAxis:L}:Object.assign({mainAxis:0,altAxis:0},L),O=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,M={x:0,y:0};if(N){if(a){var j,B=x==="y"?Se:Pe,D=x==="y"?Ve:ze,$=x==="y"?"height":"width",z=N[x],te=z+h[B],ee=z-h[D],C=v?-F[$]/2:0,A=_===Bt?S[$]:F[$],q=_===Bt?-F[$]:-S[$],K=t.elements.arrow,U=v&&K?Qr(K):{width:0,height:0},H=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Ni(),X=H[B],Y=H[D],W=cn(0,S[$],U[$]),J=w?S[$]/2-C-W-X-V.mainAxis:A-W-X-V.mainAxis,Z=w?-S[$]/2+C+W+Y+V.mainAxis:q+W+Y+V.mainAxis,oe=t.elements.arrow&&En(t.elements.arrow),I=oe?x==="y"?oe.clientTop||0:oe.clientLeft||0:0,Q=(j=O==null?void 0:O[x])!=null?j:0,R=z+J-Q-I,ae=z+Z-Q,we=cn(v?zn(te,R):te,z,v?xt(ee,ae):ee);N[x]=we,M[x]=we-z}if(l){var Ce,be=x==="x"?Se:Pe,mt=x==="x"?Ve:ze,Ne=N[g],Ze=g==="y"?"height":"width",Me=Ne+h[be],Qe=Ne-h[mt],xe=[Se,Pe].indexOf(k)!==-1,Ot=(Ce=O==null?void 0:O[g])!=null?Ce:0,ht=xe?Me:Ne-S[Ze]-F[Ze]-Ot+V.altAxis,qt=xe?Ne+S[Ze]+F[Ze]-Ot-V.altAxis:Qe,Nn=v&&xe?up(ht,Ne,qt):cn(v?ht:Me,Ne,v?qt:Qe);N[g]=Nn,M[g]=Nn-Ne}t.modifiersData[r]=M}}const zp={name:"preventOverflow",enabled:!0,phase:"main",fn:Vp,requiresIfExists:["offset"]};function Up(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function qp(e){return e===Ae(e)||!Le(e)?to(e):Up(e)}function Hp(e){var t=e.getBoundingClientRect(),n=Lt(t.width)/e.offsetWidth||1,r=Lt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Wp(e,t,n){n===void 0&&(n=!1);var r=Le(t),o=Le(t)&&Hp(t),a=dt(t),s=Ft(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((Ke(t)!=="body"||ro(a))&&(l=qp(t)),Le(t)?(c=Ft(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):a&&(c.x=no(a))),{x:s.left+l.scrollLeft-c.x,y:s.top+l.scrollTop-c.y,width:s.width,height:s.height}}function Xp(e){var t=new Map,n=new Set,r=[];e.forEach(function(a){t.set(a.name,a)});function o(a){n.add(a.name);var s=[].concat(a.requires||[],a.requiresIfExists||[]);s.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(a)}return e.forEach(function(a){n.has(a.name)||o(a)}),r}function Yp(e){var t=Xp(e);return ap.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Gp(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Kp(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var ca={placement:"bottom",modifiers:[],strategy:"absolute"};function pa(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Jp(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,a=o===void 0?ca:o;return function(l,c,p){p===void 0&&(p=a);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},ca,a),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},m=[],d=!1,v={state:u,setOptions:function(k){var _=typeof k=="function"?k(u.options):k;b(),u.options=Object.assign({},a,u.options,_),u.scrollParents={reference:Ct(l)?pn(l):l.contextElement?pn(l.contextElement):[],popper:pn(c)};var w=Yp(Kp([].concat(r,u.options.modifiers)));return u.orderedModifiers=w.filter(function(x){return x.enabled}),y(),v.update()},forceUpdate:function(){if(!d){var k=u.elements,_=k.reference,w=k.popper;if(pa(_,w)){u.rects={reference:Wp(_,En(w),u.options.strategy==="fixed"),popper:Qr(w)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(V){return u.modifiersData[V.name]=Object.assign({},V.data)});for(var x=0;x<u.orderedModifiers.length;x++){if(u.reset===!0){u.reset=!1,x=-1;continue}var g=u.orderedModifiers[x],N=g.fn,S=g.options,F=S===void 0?{}:S,L=g.name;typeof N=="function"&&(u=N({state:u,options:F,name:L,instance:v})||u)}}}},update:Gp(function(){return new Promise(function(h){v.forceUpdate(),h(u)})}),destroy:function(){b(),d=!0}};if(!pa(l,c))return v;v.setOptions(p).then(function(h){!d&&p.onFirstUpdate&&p.onFirstUpdate(h)});function y(){u.orderedModifiers.forEach(function(h){var k=h.name,_=h.options,w=_===void 0?{}:_,x=h.effect;if(typeof x=="function"){var g=x({state:u,name:k,instance:v,options:w}),N=function(){};m.push(g||N)}})}function b(){m.forEach(function(h){return h()}),m=[]}return v}}var Zp=[xp,Lp,yp,lp,Dp,Mp,zp,hp,_p],Qp=Jp({defaultModifiers:Zp});const ji="Popper";function eu(e){return xi(ji,e)}jc(ji,["root"]);const tu=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],nu=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function ru(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function Un(e){return typeof e=="function"?e():e}function Zn(e){return e.nodeType!==void 0}function ou(e){return!Zn(e)}const au=()=>st({root:["root"]},Cc(eu)),iu={},su=E.forwardRef(function(t,n){var r;const{anchorEl:o,children:a,direction:s,disablePortal:l,modifiers:c,open:p,placement:u,popperOptions:m,popperRef:d,slotProps:v={},slots:y={},TransitionProps:b}=t,h=de(t,tu),k=E.useRef(null),_=Fe(k,n),w=E.useRef(null),x=Fe(w,d),g=E.useRef(x);kt(()=>{g.current=x},[x]),E.useImperativeHandle(d,()=>w.current,[]);const N=ru(u,s),[S,F]=E.useState(N),[L,V]=E.useState(Un(o));E.useEffect(()=>{w.current&&w.current.forceUpdate()}),E.useEffect(()=>{o&&V(Un(o))},[o]),kt(()=>{if(!L||!p)return;const D=te=>{F(te.placement)};if(process.env.NODE_ENV!=="production"&&L&&Zn(L)&&L.nodeType===1){const te=L.getBoundingClientRect();process.env.NODE_ENV!=="test"&&te.top===0&&te.left===0&&te.right===0&&te.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let $=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:te})=>{D(te)}}];c!=null&&($=$.concat(c)),m&&m.modifiers!=null&&($=$.concat(m.modifiers));const z=Qp(L,k.current,T({placement:N},m,{modifiers:$}));return g.current(z),()=>{z.destroy(),g.current(null)}},[L,l,c,p,m,N]);const O={placement:S};b!==null&&(O.TransitionProps=b);const M=au(),j=(r=y.root)!=null?r:"div",B=Tt({elementType:j,externalSlotProps:v.root,externalForwardedProps:h,additionalProps:{role:"tooltip",ref:_},ownerState:t,className:M.root});return f.jsx(j,T({},B,{children:typeof a=="function"?a(O):a}))}),Mi=E.forwardRef(function(t,n){const{anchorEl:r,children:o,container:a,direction:s="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:p,open:u,placement:m="bottom",popperOptions:d=iu,popperRef:v,style:y,transition:b=!1,slotProps:h={},slots:k={}}=t,_=de(t,nu),[w,x]=E.useState(!0),g=()=>{x(!1)},N=()=>{x(!0)};if(!c&&!u&&(!b||w))return null;let S;if(a)S=a;else if(r){const V=Un(r);S=V&&Zn(V)?ke(V).body:ke(null).body}const F=!u&&c&&(!b||w)?"none":void 0,L=b?{in:u,onEnter:g,onExited:N}:void 0;return f.jsx(mn,{disablePortal:l,container:S,children:f.jsx(su,T({anchorEl:r,direction:s,disablePortal:l,modifiers:p,ref:n,open:b?!w:u,placement:m,popperOptions:d,popperRef:v,slotProps:h,slots:k},_,{style:T({position:"fixed",top:0,left:0,display:F},y),TransitionProps:L,children:o}))})});process.env.NODE_ENV!=="production"&&(Mi.propTypes={anchorEl:Ut(i.oneOfType([rt,i.object,i.func]),e=>{if(e.open){const t=Un(e.anchorEl);if(t&&Zn(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||ou(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:i.oneOfType([i.node,i.func]),container:i.oneOfType([rt,i.func]),direction:i.oneOf(["ltr","rtl"]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:Kr,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),transition:i.bool});const lu=["values","unit","step"],cu=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>T({},n,{[r.key]:r.val}),{})};function pu(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=de(e,lu),a=cu(t),s=Object.keys(a);function l(d){return`@media (min-width:${typeof t[d]=="number"?t[d]:d}${n})`}function c(d){return`@media (max-width:${(typeof t[d]=="number"?t[d]:d)-r/100}${n})`}function p(d,v){const y=s.indexOf(v);return`@media (min-width:${typeof t[d]=="number"?t[d]:d}${n}) and (max-width:${(y!==-1&&typeof t[s[y]]=="number"?t[s[y]]:v)-r/100}${n})`}function u(d){return s.indexOf(d)+1<s.length?p(d,s[s.indexOf(d)+1]):l(d)}function m(d){const v=s.indexOf(d);return v===0?l(s[1]):v===s.length-1?c(s[v]):p(d,s[s.indexOf(d)+1]).replace("@media","@media not all and")}return T({keys:s,values:a,up:l,down:c,between:p,only:u,not:m,unit:n},o)}const uu={borderRadius:4},du=uu,fu=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.string,i.object,i.array]):{},ft=fu;function un(e,t){return t?nt(e,t,{clone:!1}):e}const oo={xs:0,sm:600,md:900,lg:1200,xl:1536},ua={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${oo[e]}px)`};function at(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const a=r.breakpoints||ua;return t.reduce((s,l,c)=>(s[a.up(a.keys[c])]=n(t[c]),s),{})}if(typeof t=="object"){const a=r.breakpoints||ua;return Object.keys(t).reduce((s,l)=>{if(Object.keys(a.values||oo).indexOf(l)!==-1){const c=a.up(l);s[c]=n(t[l],l)}else{const c=l;s[c]=t[c]}return s},{})}return n(t)}function mu(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const a=e.up(o);return r[a]={},r},{}))||{}}function hu(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Qn(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function qn(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Qn(e,n)||r,t&&(o=t(o,r,e)),o}function ve(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,a=s=>{if(s[t]==null)return null;const l=s[t],c=s.theme,p=Qn(c,r)||{};return at(s,l,m=>{let d=qn(p,o,m);return m===d&&typeof m=="string"&&(d=qn(p,o,`${t}${m==="default"?"":Ge(m)}`,m)),n===!1?d:{[n]:d}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[t]:ft}:{},a.filterProps=[t],a}function gu(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const bu={m:"margin",p:"padding"},vu={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},da={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},yu=gu(e=>{if(e.length>2)if(da[e])e=da[e];else return[e];const[t,n]=e.split(""),r=bu[t],o=vu[n]||"";return Array.isArray(o)?o.map(a=>r+a):[r+o]}),er=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],tr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],wu=[...er,...tr];function kn(e,t,n,r){var o;const a=(o=Qn(e,t,!1))!=null?o:n;return typeof a=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),a*s):Array.isArray(a)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>a.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${s} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),a[s]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function $i(e){return kn(e,"spacing",8,"spacing")}function Tn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function xu(e,t){return n=>e.reduce((r,o)=>(r[o]=Tn(t,n),r),{})}function Eu(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=yu(n),a=xu(o,r),s=e[n];return at(e,s,a)}function _i(e,t){const n=$i(e.theme);return Object.keys(e).map(r=>Eu(e,t,r,n)).reduce(un,{})}function he(e){return _i(e,er)}he.propTypes=process.env.NODE_ENV!=="production"?er.reduce((e,t)=>(e[t]=ft,e),{}):{};he.filterProps=er;function ge(e){return _i(e,tr)}ge.propTypes=process.env.NODE_ENV!=="production"?tr.reduce((e,t)=>(e[t]=ft,e),{}):{};ge.filterProps=tr;process.env.NODE_ENV!=="production"&&wu.reduce((e,t)=>(e[t]=ft,e),{});function ku(e=8){if(e.mui)return e;const t=$i({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(a=>{const s=t(a);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function nr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(a=>{r[a]=o}),r),{}),n=r=>Object.keys(r).reduce((o,a)=>t[a]?un(o,t[a](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Be(e){return typeof e!="number"?e:`${e}px solid`}function Ue(e,t){return ve({prop:e,themeKey:"borders",transform:t})}const Tu=Ue("border",Be),Cu=Ue("borderTop",Be),Nu=Ue("borderRight",Be),Ou=Ue("borderBottom",Be),Su=Ue("borderLeft",Be),Pu=Ue("borderColor"),Ru=Ue("borderTopColor"),ju=Ue("borderRightColor"),Mu=Ue("borderBottomColor"),$u=Ue("borderLeftColor"),_u=Ue("outline",Be),Iu=Ue("outlineColor"),rr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=kn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:Tn(t,r)});return at(e,e.borderRadius,n)}return null};rr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:ft}:{};rr.filterProps=["borderRadius"];nr(Tu,Cu,Nu,Ou,Su,Pu,Ru,ju,Mu,$u,rr,_u,Iu);const or=e=>{if(e.gap!==void 0&&e.gap!==null){const t=kn(e.theme,"spacing",8,"gap"),n=r=>({gap:Tn(t,r)});return at(e,e.gap,n)}return null};or.propTypes=process.env.NODE_ENV!=="production"?{gap:ft}:{};or.filterProps=["gap"];const ar=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=kn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:Tn(t,r)});return at(e,e.columnGap,n)}return null};ar.propTypes=process.env.NODE_ENV!=="production"?{columnGap:ft}:{};ar.filterProps=["columnGap"];const ir=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=kn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:Tn(t,r)});return at(e,e.rowGap,n)}return null};ir.propTypes=process.env.NODE_ENV!=="production"?{rowGap:ft}:{};ir.filterProps=["rowGap"];const Au=ve({prop:"gridColumn"}),Du=ve({prop:"gridRow"}),Bu=ve({prop:"gridAutoFlow"}),Lu=ve({prop:"gridAutoColumns"}),Fu=ve({prop:"gridAutoRows"}),Vu=ve({prop:"gridTemplateColumns"}),zu=ve({prop:"gridTemplateRows"}),Uu=ve({prop:"gridTemplateAreas"}),qu=ve({prop:"gridArea"});nr(or,ar,ir,Au,Du,Bu,Lu,Fu,Vu,zu,Uu,qu);function It(e,t){return t==="grey"?t:e}const Hu=ve({prop:"color",themeKey:"palette",transform:It}),Wu=ve({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:It}),Xu=ve({prop:"backgroundColor",themeKey:"palette",transform:It});nr(Hu,Wu,Xu);function Ie(e){return e<=1&&e!==0?`${e*100}%`:e}const Yu=ve({prop:"width",transform:Ie}),ao=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const a=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||oo[n];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:Ie(n)}};return at(e,e.maxWidth,t)}return null};ao.filterProps=["maxWidth"];const Gu=ve({prop:"minWidth",transform:Ie}),Ku=ve({prop:"height",transform:Ie}),Ju=ve({prop:"maxHeight",transform:Ie}),Zu=ve({prop:"minHeight",transform:Ie});ve({prop:"size",cssProperty:"width",transform:Ie});ve({prop:"size",cssProperty:"height",transform:Ie});const Qu=ve({prop:"boxSizing"});nr(Yu,ao,Gu,Ku,Ju,Zu,Qu);const ed={border:{themeKey:"borders",transform:Be},borderTop:{themeKey:"borders",transform:Be},borderRight:{themeKey:"borders",transform:Be},borderBottom:{themeKey:"borders",transform:Be},borderLeft:{themeKey:"borders",transform:Be},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Be},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:rr},color:{themeKey:"palette",transform:It},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:It},backgroundColor:{themeKey:"palette",transform:It},p:{style:ge},pt:{style:ge},pr:{style:ge},pb:{style:ge},pl:{style:ge},px:{style:ge},py:{style:ge},padding:{style:ge},paddingTop:{style:ge},paddingRight:{style:ge},paddingBottom:{style:ge},paddingLeft:{style:ge},paddingX:{style:ge},paddingY:{style:ge},paddingInline:{style:ge},paddingInlineStart:{style:ge},paddingInlineEnd:{style:ge},paddingBlock:{style:ge},paddingBlockStart:{style:ge},paddingBlockEnd:{style:ge},m:{style:he},mt:{style:he},mr:{style:he},mb:{style:he},ml:{style:he},mx:{style:he},my:{style:he},margin:{style:he},marginTop:{style:he},marginRight:{style:he},marginBottom:{style:he},marginLeft:{style:he},marginX:{style:he},marginY:{style:he},marginInline:{style:he},marginInlineStart:{style:he},marginInlineEnd:{style:he},marginBlock:{style:he},marginBlockStart:{style:he},marginBlockEnd:{style:he},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:or},rowGap:{style:ir},columnGap:{style:ar},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ie},maxWidth:{style:ao},minWidth:{transform:Ie},height:{transform:Ie},maxHeight:{transform:Ie},minHeight:{transform:Ie},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},io=ed;function td(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function nd(e,t){return typeof e=="function"?e(t):e}function rd(){function e(n,r,o,a){const s={[n]:r,theme:o},l=a[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:p,transform:u,style:m}=l;if(r==null)return null;if(p==="typography"&&r==="inherit")return{[n]:r};const d=Qn(o,p)||{};return m?m(s):at(s,r,y=>{let b=qn(d,u,y);return y===b&&typeof y=="string"&&(b=qn(d,u,`${n}${y==="default"?"":Ge(y)}`,y)),c===!1?b:{[c]:b}})}function t(n){var r;const{sx:o,theme:a={}}=n||{};if(!o)return null;const s=(r=a.unstable_sxConfig)!=null?r:io;function l(c){let p=c;if(typeof c=="function")p=c(a);else if(typeof c!="object")return c;if(!p)return null;const u=mu(a.breakpoints),m=Object.keys(u);let d=u;return Object.keys(p).forEach(v=>{const y=nd(p[v],a);if(y!=null)if(typeof y=="object")if(s[v])d=un(d,e(v,y,a,s));else{const b=at({theme:a},y,h=>({[v]:h}));td(b,y)?d[v]=t({sx:y,theme:a}):d=un(d,b)}else d=un(d,e(v,y,a,s))}),hu(m,d)}return Array.isArray(o)?o.map(l):l(o)}return t}const Ii=rd();Ii.filterProps=["sx"];const so=Ii;function od(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const ad=["breakpoints","palette","spacing","shape"];function lo(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:a={}}=e,s=de(e,ad),l=pu(n),c=ku(o);let p=nt({breakpoints:l,direction:"ltr",components:{},palette:T({mode:"light"},r),spacing:c,shape:T({},du,a)},s);return p.applyStyles=od,p=t.reduce((u,m)=>nt(u,m),p),p.unstable_sxConfig=T({},io,s==null?void 0:s.unstable_sxConfig),p.unstable_sx=function(m){return so({sx:m,theme:this})},p}function id(e){return Object.keys(e).length===0}function Ai(e=null){const t=E.useContext(Sr.ThemeContext);return!t||id(t)?e:t}const sd=lo();function Di(e=sd){return Ai(e)}const ld=["ownerState"],cd=["variants"],pd=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function ud(e){return Object.keys(e).length===0}function dd(e){return typeof e=="string"&&e.charCodeAt(0)>96}function In(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const fd=lo(),fa=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function jn({defaultTheme:e,theme:t,themeId:n}){return ud(t)?e:t[n]||t}function md(e){return e?(t,n)=>n[e]:null}function An(e,t){let{ownerState:n}=t,r=de(t,ld);const o=typeof e=="function"?e(T({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(a=>An(a,T({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let l=de(o,cd);return a.forEach(c=>{let p=!0;typeof c.props=="function"?p=c.props(T({ownerState:n},r,n)):Object.keys(c.props).forEach(u=>{(n==null?void 0:n[u])!==c.props[u]&&r[u]!==c.props[u]&&(p=!1)}),p&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(T({ownerState:n},r,n)):c.style))}),l}return o}function hd(e={}){const{themeId:t,defaultTheme:n=fd,rootShouldForwardProp:r=In,slotShouldForwardProp:o=In}=e,a=s=>so(T({},s,{theme:jn(T({},s,{defaultTheme:n,themeId:t}))}));return a.__mui_systemSx=!0,(s,l={})=>{Sr.internal_processStyles(s,g=>g.filter(N=>!(N!=null&&N.__mui_systemSx)));const{name:c,slot:p,skipVariantsResolver:u,skipSx:m,overridesResolver:d=md(fa(p))}=l,v=de(l,pd),y=u!==void 0?u:p&&p!=="Root"&&p!=="root"||!1,b=m||!1;let h;process.env.NODE_ENV!=="production"&&c&&(h=`${c}-${fa(p||"Root")}`);let k=In;p==="Root"||p==="root"?k=r:p?k=o:dd(s)&&(k=void 0);const _=Sr(s,T({shouldForwardProp:k,label:h},v)),w=g=>typeof g=="function"&&g.__emotion_real!==g||wt(g)?N=>An(g,T({},N,{theme:jn({theme:N.theme,defaultTheme:n,themeId:t})})):g,x=(g,...N)=>{let S=w(g);const F=N?N.map(w):[];c&&d&&F.push(O=>{const M=jn(T({},O,{defaultTheme:n,themeId:t}));if(!M.components||!M.components[c]||!M.components[c].styleOverrides)return null;const j=M.components[c].styleOverrides,B={};return Object.entries(j).forEach(([D,$])=>{B[D]=An($,T({},O,{theme:M}))}),d(O,B)}),c&&!y&&F.push(O=>{var M;const j=jn(T({},O,{defaultTheme:n,themeId:t})),B=j==null||(M=j.components)==null||(M=M[c])==null?void 0:M.variants;return An({variants:B},T({},O,{theme:j}))}),b||F.push(a);const L=F.length-N.length;if(Array.isArray(g)&&L>0){const O=new Array(L).fill("");S=[...g,...O],S.raw=[...g.raw,...O]}const V=_(S,...F);if(process.env.NODE_ENV!=="production"){let O;c&&(O=`${c}${Ge(p||"")}`),O===void 0&&(O=`Styled(${Ql(s)})`),V.displayName=O}return s.muiName&&(V.muiName=s.muiName),V};return _.withConfig&&(x.withConfig=_.withConfig),x}}function gd(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:hi(t.components[n].defaultProps,r)}function bd({props:e,name:t,defaultTheme:n,themeId:r}){let o=Di(n);return r&&(o=o[r]||o),gd({theme:o,name:t,props:e})}function co(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Ec(e,t,n)}function vd(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Nt(e){if(e.type)return e;if(e.charAt(0)==="#")return Nt(vd(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:At(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:At(10,o))}else r=r.split(",");return r=r.map(a=>parseFloat(a)),{type:n,values:r,colorSpace:o}}function sr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,a)=>a<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function yd(e){e=Nt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,a=r*Math.min(o,1-o),s=(p,u=(p+n/30)%12)=>o-a*Math.max(Math.min(u-3,9-u,1),-1);let l="rgb";const c=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),sr({type:l,values:c})}function ma(e){e=Nt(e);let t=e.type==="hsl"||e.type==="hsla"?Nt(yd(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function ha(e,t){const n=ma(e),r=ma(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function Hn(e,t){return e=Nt(e),t=co(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,sr(e)}function wd(e,t){if(e=Nt(e),t=co(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return sr(e)}function xd(e,t){if(e=Nt(e),t=co(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return sr(e)}function Ed(e,t){return T({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const kd={black:"#000",white:"#fff"},bn=kd,Td={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Cd=Td,Nd={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},St=Nd,Od={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Pt=Od,Sd={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Zt=Sd,Pd={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Rt=Pd,Rd={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},jt=Rd,jd={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Mt=jd,Md=["mode","contrastThreshold","tonalOffset"],ga={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:bn.white,default:bn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},xr={text:{primary:bn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:bn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function ba(e,t,n,r){const o=r.light||r,a=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=xd(e.main,o):t==="dark"&&(e.dark=wd(e.main,a)))}function $d(e="light"){return e==="dark"?{main:Rt[200],light:Rt[50],dark:Rt[400]}:{main:Rt[700],light:Rt[400],dark:Rt[800]}}function _d(e="light"){return e==="dark"?{main:St[200],light:St[50],dark:St[400]}:{main:St[500],light:St[300],dark:St[700]}}function Id(e="light"){return e==="dark"?{main:Pt[500],light:Pt[300],dark:Pt[700]}:{main:Pt[700],light:Pt[400],dark:Pt[800]}}function Ad(e="light"){return e==="dark"?{main:jt[400],light:jt[300],dark:jt[700]}:{main:jt[700],light:jt[500],dark:jt[900]}}function Dd(e="light"){return e==="dark"?{main:Mt[400],light:Mt[300],dark:Mt[700]}:{main:Mt[800],light:Mt[500],dark:Mt[900]}}function Bd(e="light"){return e==="dark"?{main:Zt[400],light:Zt[300],dark:Zt[700]}:{main:"#ed6c02",light:Zt[500],dark:Zt[900]}}function Ld(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=de(e,Md),a=e.primary||$d(t),s=e.secondary||_d(t),l=e.error||Id(t),c=e.info||Ad(t),p=e.success||Dd(t),u=e.warning||Bd(t);function m(b){const h=ha(b,xr.text.primary)>=n?xr.text.primary:ga.text.primary;if(process.env.NODE_ENV!=="production"){const k=ha(b,h);k<3&&console.error([`MUI: The contrast ratio of ${k}:1 for ${h} on ${b}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return h}const d=({color:b,name:h,mainShade:k=500,lightShade:_=300,darkShade:w=700})=>{if(b=T({},b),!b.main&&b[k]&&(b.main=b[k]),!b.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${k}\` property.`:At(11,h?` (${h})`:"",k));if(typeof b.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(b.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:At(12,h?` (${h})`:"",JSON.stringify(b.main)));return ba(b,"light",_,r),ba(b,"dark",w,r),b.contrastText||(b.contrastText=m(b.main)),b},v={dark:xr,light:ga};return process.env.NODE_ENV!=="production"&&(v[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),nt(T({common:T({},bn),mode:t,primary:d({color:a,name:"primary"}),secondary:d({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:d({color:l,name:"error"}),warning:d({color:u,name:"warning"}),info:d({color:c,name:"info"}),success:d({color:p,name:"success"}),grey:Cd,contrastThreshold:n,getContrastText:m,augmentColor:d,tonalOffset:r},v[t]),o)}const Fd=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Vd(e){return Math.round(e*1e5)/1e5}const va={textTransform:"uppercase"},ya='"Roboto", "Helvetica", "Arial", sans-serif';function zd(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=ya,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:s=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:p=16,allVariants:u,pxToRem:m}=n,d=de(n,Fd);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof p!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const v=o/14,y=m||(k=>`${k/p*v}rem`),b=(k,_,w,x,g)=>T({fontFamily:r,fontWeight:k,fontSize:y(_),lineHeight:w},r===ya?{letterSpacing:`${Vd(x/_)}em`}:{},g,u),h={h1:b(a,96,1.167,-1.5),h2:b(a,60,1.2,-.5),h3:b(s,48,1.167,0),h4:b(s,34,1.235,.25),h5:b(s,24,1.334,0),h6:b(l,20,1.6,.15),subtitle1:b(s,16,1.75,.15),subtitle2:b(l,14,1.57,.1),body1:b(s,16,1.5,.15),body2:b(s,14,1.43,.15),button:b(l,14,1.75,.4,va),caption:b(s,12,1.66,.4),overline:b(s,12,2.66,1,va),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return nt(T({htmlFontSize:p,pxToRem:y,fontFamily:r,fontSize:o,fontWeightLight:a,fontWeightRegular:s,fontWeightMedium:l,fontWeightBold:c},h),d,{clone:!1})}const Ud=.2,qd=.14,Hd=.12;function me(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Ud})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${qd})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Hd})`].join(",")}const Wd=["none",me(0,2,1,-1,0,1,1,0,0,1,3,0),me(0,3,1,-2,0,2,2,0,0,1,5,0),me(0,3,3,-2,0,3,4,0,0,1,8,0),me(0,2,4,-1,0,4,5,0,0,1,10,0),me(0,3,5,-1,0,5,8,0,0,1,14,0),me(0,3,5,-1,0,6,10,0,0,1,18,0),me(0,4,5,-2,0,7,10,1,0,2,16,1),me(0,5,5,-3,0,8,10,1,0,3,14,2),me(0,5,6,-3,0,9,12,1,0,3,16,2),me(0,6,6,-3,0,10,14,1,0,4,18,3),me(0,6,7,-4,0,11,15,1,0,4,20,3),me(0,7,8,-4,0,12,17,2,0,5,22,4),me(0,7,8,-4,0,13,19,2,0,5,24,4),me(0,7,9,-4,0,14,21,2,0,5,26,4),me(0,8,9,-5,0,15,22,2,0,6,28,5),me(0,8,10,-5,0,16,24,2,0,6,30,5),me(0,8,11,-5,0,17,26,2,0,6,32,5),me(0,9,11,-5,0,18,28,2,0,7,34,6),me(0,9,12,-6,0,19,29,2,0,7,36,6),me(0,10,13,-6,0,20,31,3,0,8,38,7),me(0,10,13,-6,0,21,33,3,0,8,40,7),me(0,10,14,-6,0,22,35,3,0,8,42,7),me(0,11,14,-7,0,23,36,3,0,9,44,8),me(0,11,15,-7,0,24,38,3,0,9,46,8)],Xd=Wd,Yd=["duration","easing","delay"],Gd={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Kd={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function wa(e){return`${Math.round(e)}ms`}function Jd(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Zd(e){const t=T({},Gd,e.easing),n=T({},Kd,e.duration);return T({getAutoHeightDuration:Jd,create:(o=["all"],a={})=>{const{duration:s=n.standard,easing:l=t.easeInOut,delay:c=0}=a,p=de(a,Yd);if(process.env.NODE_ENV!=="production"){const u=d=>typeof d=="string",m=d=>!isNaN(parseFloat(d));!u(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!m(s)&&!u(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),u(l)||console.error('MUI: Argument "easing" must be a string.'),!m(c)&&!u(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(p).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(p).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(u=>`${u} ${typeof s=="string"?s:wa(s)} ${l} ${typeof c=="string"?c:wa(c)}`).join(",")}},e,{easing:t,duration:n})}const Qd={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},ef=Qd,tf=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function nf(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:a={}}=e,s=de(e,tf);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":At(18));const l=Ld(r),c=lo(e);let p=nt(c,{mixins:Ed(c.breakpoints,n),palette:l,shadows:Xd.slice(),typography:zd(l,a),transitions:Zd(o),zIndex:T({},ef)});if(p=nt(p,s),p=t.reduce((u,m)=>nt(u,m),p),process.env.NODE_ENV!=="production"){const u=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],m=(d,v)=>{let y;for(y in d){const b=d[y];if(u.indexOf(y)!==-1&&Object.keys(b).length>0){if(process.env.NODE_ENV!=="production"){const h=Je("",y);console.error([`MUI: The \`${v}\` component increases the CSS specificity of the \`${y}\` internal state.`,"You can not override it like this: ",JSON.stringify(d,null,2),"",`Instead, you need to use the '&.${h}' syntax:`,JSON.stringify({root:{[`&.${h}`]:b}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}d[y]={}}}};Object.keys(p.components).forEach(d=>{const v=p.components[d].styleOverrides;v&&d.indexOf("Mui")===0&&m(v,d)})}return p.unstable_sxConfig=T({},io,s==null?void 0:s.unstable_sxConfig),p.unstable_sx=function(m){return so({sx:m,theme:this})},p}const rf=nf(),po=rf,uo="$$material",Bi=e=>In(e)&&e!=="classes",of=hd({themeId:uo,defaultTheme:po,rootShouldForwardProp:Bi}),Te=of;function Cn(){const e=Di(po);return process.env.NODE_ENV!=="production"&&E.useDebugValue(e),e[uo]||e}function lt({props:e,name:t}){return bd({props:e,name:t,defaultTheme:po,themeId:uo})}function Dr(e,t){return Dr=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},Dr(e,t)}function af(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Dr(e,t)}const xa={disabled:!1};var sf=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.shape({enter:i.number,exit:i.number,appear:i.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&i.oneOfType([i.string,i.shape({enter:i.string,exit:i.string,active:i.string}),i.shape({enter:i.string,enterDone:i.string,enterActive:i.string,exit:i.string,exitDone:i.string,exitActive:i.string})]);const Li=P.createContext(null);var lf=function(t){return t.scrollTop},an="unmounted",bt="exited",vt="entering",_t="entered",Br="exiting",ct=function(e){af(t,e);function t(r,o){var a;a=e.call(this,r,o)||this;var s=o,l=s&&!s.isMounting?r.enter:r.appear,c;return a.appearStatus=null,r.in?l?(c=bt,a.appearStatus=vt):c=_t:r.unmountOnExit||r.mountOnEnter?c=an:c=bt,a.state={status:c},a.nextCallback=null,a}t.getDerivedStateFromProps=function(o,a){var s=o.in;return s&&a.status===an?{status:bt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var a=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==vt&&s!==_t&&(a=vt):(s===vt||s===_t)&&(a=Br)}this.updateStatus(!1,a)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,a,s,l;return a=s=l=o,o!=null&&typeof o!="number"&&(a=o.exit,s=o.enter,l=o.appear!==void 0?o.appear:s),{exit:a,enter:s,appear:l}},n.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===vt){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:tn.findDOMNode(this);s&&lf(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===bt&&this.setState({status:an})},n.performEnter=function(o){var a=this,s=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[tn.findDOMNode(this),l],p=c[0],u=c[1],m=this.getTimeouts(),d=l?m.appear:m.enter;if(!o&&!s||xa.disabled){this.safeSetState({status:_t},function(){a.props.onEntered(p)});return}this.props.onEnter(p,u),this.safeSetState({status:vt},function(){a.props.onEntering(p,u),a.onTransitionEnd(d,function(){a.safeSetState({status:_t},function(){a.props.onEntered(p,u)})})})},n.performExit=function(){var o=this,a=this.props.exit,s=this.getTimeouts(),l=this.props.nodeRef?void 0:tn.findDOMNode(this);if(!a||xa.disabled){this.safeSetState({status:bt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:Br},function(){o.props.onExiting(l),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:bt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},n.setNextCallback=function(o){var a=this,s=!0;return this.nextCallback=function(l){s&&(s=!1,a.nextCallback=null,o(l))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},n.onTransitionEnd=function(o,a){this.setNextCallback(a);var s=this.props.nodeRef?this.props.nodeRef.current:tn.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!s||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],p=c[0],u=c[1];this.props.addEndListener(p,u)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===an)return null;var a=this.props,s=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var l=de(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return P.createElement(Li.Provider,{value:null},typeof s=="function"?s(o,l):P.cloneElement(P.Children.only(s),l))},t}(P.Component);ct.contextType=Li;ct.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:i.shape({current:typeof Element>"u"?i.any:function(e,t,n,r,o,a){var s=e[t];return i.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,a)}}),children:i.oneOfType([i.func.isRequired,i.element.isRequired]).isRequired,in:i.bool,mountOnEnter:i.bool,unmountOnExit:i.bool,appear:i.bool,enter:i.bool,exit:i.bool,timeout:function(t){var n=sf;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),a=1;a<r;a++)o[a-1]=arguments[a];return n.apply(void 0,[t].concat(o))},addEndListener:i.func,onEnter:i.func,onEntering:i.func,onEntered:i.func,onExit:i.func,onExiting:i.func,onExited:i.func}:{};function $t(){}ct.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:$t,onEntering:$t,onEntered:$t,onExit:$t,onExiting:$t,onExited:$t};ct.UNMOUNTED=an;ct.EXITED=bt;ct.ENTERING=vt;ct.ENTERED=_t;ct.EXITING=Br;const Fi=ct,Vi=e=>e.scrollTop;function Wn(e,t){var n,r;const{timeout:o,easing:a,style:s={}}=e;return{duration:(n=s.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof a=="object"?a[t.mode]:a,delay:s.transitionDelay}}const cf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function Lr(e){return`scale(${e}, ${e**2})`}const pf={entering:{opacity:1,transform:Lr(1)},entered:{opacity:1,transform:"none"}},Er=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),fo=E.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:a,easing:s,in:l,onEnter:c,onEntered:p,onEntering:u,onExit:m,onExited:d,onExiting:v,style:y,timeout:b="auto",TransitionComponent:h=Fi}=t,k=de(t,cf),_=rn(),w=E.useRef(),x=Cn(),g=E.useRef(null),N=Fe(g,a.ref,n),S=D=>$=>{if(D){const z=g.current;$===void 0?D(z):D(z,$)}},F=S(u),L=S((D,$)=>{Vi(D);const{duration:z,delay:te,easing:ee}=Wn({style:y,timeout:b,easing:s},{mode:"enter"});let C;b==="auto"?(C=x.transitions.getAutoHeightDuration(D.clientHeight),w.current=C):C=z,D.style.transition=[x.transitions.create("opacity",{duration:C,delay:te}),x.transitions.create("transform",{duration:Er?C:C*.666,delay:te,easing:ee})].join(","),c&&c(D,$)}),V=S(p),O=S(v),M=S(D=>{const{duration:$,delay:z,easing:te}=Wn({style:y,timeout:b,easing:s},{mode:"exit"});let ee;b==="auto"?(ee=x.transitions.getAutoHeightDuration(D.clientHeight),w.current=ee):ee=$,D.style.transition=[x.transitions.create("opacity",{duration:ee,delay:z}),x.transitions.create("transform",{duration:Er?ee:ee*.666,delay:Er?z:z||ee*.333,easing:te})].join(","),D.style.opacity=0,D.style.transform=Lr(.75),m&&m(D)}),j=S(d),B=D=>{b==="auto"&&_.start(w.current||0,D),r&&r(g.current,D)};return f.jsx(h,T({appear:o,in:l,nodeRef:g,onEnter:L,onEntered:V,onEntering:F,onExit:M,onExited:j,onExiting:O,addEndListener:B,timeout:b==="auto"?null:b},k,{children:(D,$)=>E.cloneElement(a,T({style:T({opacity:0,transform:Lr(.75),visibility:D==="exited"&&!l?"hidden":void 0},pf[D],y,a.props.style),ref:N},$))}))});process.env.NODE_ENV!=="production"&&(fo.propTypes={addEndListener:i.func,appear:i.bool,children:yn.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});fo.muiSupportAuto=!0;const Fr=fo,uf=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},Ea=uf,df=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],ff=Te(Mi,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),zi=E.forwardRef(function(t,n){var r;const o=Ai(),a=lt({props:t,name:"MuiPopper"}),{anchorEl:s,component:l,components:c,componentsProps:p,container:u,disablePortal:m,keepMounted:d,modifiers:v,open:y,placement:b,popperOptions:h,popperRef:k,transition:_,slots:w,slotProps:x}=a,g=de(a,df),N=(r=w==null?void 0:w.root)!=null?r:c==null?void 0:c.Root,S=T({anchorEl:s,container:u,disablePortal:m,keepMounted:d,modifiers:v,open:y,placement:b,popperOptions:h,popperRef:k,transition:_},g);return f.jsx(ff,T({as:l,direction:o==null?void 0:o.direction,slots:{root:N},slotProps:x??p},S,{ref:n}))});process.env.NODE_ENV!=="production"&&(zi.propTypes={anchorEl:i.oneOfType([rt,i.object,i.func]),children:i.oneOfType([i.node,i.func]),component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([rt,i.func]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:Kr,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transition:i.bool});const Ui=zi;function mf(e){return Je("MuiTooltip",e)}const hf=ut("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),pt=hf,gf=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function bf(e){return Math.round(e*1e5)/1e5}const vf=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:a}=e,s={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Ge(a.split("-")[0])}`],arrow:["arrow"]};return st(s,mf,t)},yf=Te(Ui,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>T({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${pt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${pt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${pt.arrow}`]:T({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${pt.arrow}`]:T({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),wf=Te("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Ge(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>T({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:Hn(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${bf(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${pt.popper}[data-popper-placement*="left"] &`]:T({transformOrigin:"right center"},t.isRtl?T({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):T({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${pt.popper}[data-popper-placement*="right"] &`]:T({transformOrigin:"left center"},t.isRtl?T({marginRight:"14px"},t.touch&&{marginRight:"24px"}):T({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${pt.popper}[data-popper-placement*="top"] &`]:T({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${pt.popper}[data-popper-placement*="bottom"] &`]:T({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),xf=Te("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:Hn(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Mn=!1;const ka=new wn;let Qt={x:0,y:0};function $n(e,t){return n=>{t&&t(n),e(n)}}const qi=E.forwardRef(function(t,n){var r,o,a,s,l,c,p,u,m,d,v,y,b,h,k,_,w,x,g;const N=lt({props:t,name:"MuiTooltip"}),{arrow:S=!1,children:F,components:L={},componentsProps:V={},describeChild:O=!1,disableFocusListener:M=!1,disableHoverListener:j=!1,disableInteractive:B=!1,disableTouchListener:D=!1,enterDelay:$=100,enterNextDelay:z=0,enterTouchDelay:te=700,followCursor:ee=!1,id:C,leaveDelay:A=0,leaveTouchDelay:q=1500,onClose:K,onOpen:U,open:H,placement:X="bottom",PopperComponent:Y,PopperProps:W={},slotProps:J={},slots:Z={},title:oe,TransitionComponent:I=Fr,TransitionProps:Q}=N,R=de(N,gf),ae=E.isValidElement(F)?F:f.jsx("span",{children:F}),we=Cn(),Ce=we.direction==="rtl",[be,mt]=E.useState(),[Ne,Ze]=E.useState(null),Me=E.useRef(!1),Qe=B||ee,xe=rn(),Ot=rn(),ht=rn(),qt=rn(),[Nn,yo]=ci({controlled:H,default:!1,name:"Tooltip",state:"open"});let et=Nn;if(process.env.NODE_ENV!=="production"){const{current:ne}=E.useRef(H!==void 0);E.useEffect(()=>{be&&be.disabled&&!ne&&oe!==""&&be.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[oe,be,ne])}const lr=li(C),Ht=E.useRef(),On=fn(()=>{Ht.current!==void 0&&(document.body.style.WebkitUserSelect=Ht.current,Ht.current=void 0),qt.clear()});E.useEffect(()=>On,[On]);const wo=ne=>{ka.clear(),Mn=!0,yo(!0),U&&!et&&U(ne)},Sn=fn(ne=>{ka.start(800+A,()=>{Mn=!1}),yo(!1),K&&et&&K(ne),xe.start(we.transitions.duration.shortest,()=>{Me.current=!1})}),cr=ne=>{Me.current&&ne.type!=="touchstart"||(be&&be.removeAttribute("title"),Ot.clear(),ht.clear(),$||Mn&&z?Ot.start(Mn?z:$,()=>{wo(ne)}):wo(ne))},xo=ne=>{Ot.clear(),ht.start(A,()=>{Sn(ne)})},{isFocusVisibleRef:Eo,onBlur:Cs,onFocus:Ns,ref:Os}=pi(),[,ko]=E.useState(!1),To=ne=>{Cs(ne),Eo.current===!1&&(ko(!1),xo(ne))},Co=ne=>{be||mt(ne.currentTarget),Ns(ne),Eo.current===!0&&(ko(!0),cr(ne))},No=ne=>{Me.current=!0;const $e=ae.props;$e.onTouchStart&&$e.onTouchStart(ne)},Oo=cr,So=xo,Ss=ne=>{No(ne),ht.clear(),xe.clear(),On(),Ht.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",qt.start(te,()=>{document.body.style.WebkitUserSelect=Ht.current,cr(ne)})},Ps=ne=>{ae.props.onTouchEnd&&ae.props.onTouchEnd(ne),On(),ht.start(q,()=>{Sn(ne)})};E.useEffect(()=>{if(!et)return;function ne($e){($e.key==="Escape"||$e.key==="Esc")&&Sn($e)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[Sn,et]);const Rs=Fe(ae.ref,Os,mt,n);!oe&&oe!==0&&(et=!1);const pr=E.useRef(),js=ne=>{const $e=ae.props;$e.onMouseMove&&$e.onMouseMove(ne),Qt={x:ne.clientX,y:ne.clientY},pr.current&&pr.current.update()},Wt={},ur=typeof oe=="string";O?(Wt.title=!et&&ur&&!j?oe:null,Wt["aria-describedby"]=et?lr:null):(Wt["aria-label"]=ur?oe:null,Wt["aria-labelledby"]=et&&!ur?lr:null);const De=T({},Wt,R,ae.props,{className:Ee(R.className,ae.props.className),onTouchStart:No,ref:Rs},ee?{onMouseMove:js}:{});process.env.NODE_ENV!=="production"&&(De["data-mui-internal-clone-element"]=!0,E.useEffect(()=>{be&&!be.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[be]));const Xt={};D||(De.onTouchStart=Ss,De.onTouchEnd=Ps),j||(De.onMouseOver=$n(Oo,De.onMouseOver),De.onMouseLeave=$n(So,De.onMouseLeave),Qe||(Xt.onMouseOver=Oo,Xt.onMouseLeave=So)),M||(De.onFocus=$n(Co,De.onFocus),De.onBlur=$n(To,De.onBlur),Qe||(Xt.onFocus=Co,Xt.onBlur=To)),process.env.NODE_ENV!=="production"&&ae.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ae.props.title}\` or the Tooltip component.`].join(`
`));const Ms=E.useMemo(()=>{var ne;let $e=[{name:"arrow",enabled:!!Ne,options:{element:Ne,padding:4}}];return(ne=W.popperOptions)!=null&&ne.modifiers&&($e=$e.concat(W.popperOptions.modifiers)),T({},W.popperOptions,{modifiers:$e})},[Ne,W]),Yt=T({},N,{isRtl:Ce,arrow:S,disableInteractive:Qe,placement:X,PopperComponentProp:Y,touch:Me.current}),dr=vf(Yt),Po=(r=(o=Z.popper)!=null?o:L.Popper)!=null?r:yf,Ro=(a=(s=(l=Z.transition)!=null?l:L.Transition)!=null?s:I)!=null?a:Fr,jo=(c=(p=Z.tooltip)!=null?p:L.Tooltip)!=null?c:wf,Mo=(u=(m=Z.arrow)!=null?m:L.Arrow)!=null?u:xf,$s=on(Po,T({},W,(d=J.popper)!=null?d:V.popper,{className:Ee(dr.popper,W==null?void 0:W.className,(v=(y=J.popper)!=null?y:V.popper)==null?void 0:v.className)}),Yt),_s=on(Ro,T({},Q,(b=J.transition)!=null?b:V.transition),Yt),Is=on(jo,T({},(h=J.tooltip)!=null?h:V.tooltip,{className:Ee(dr.tooltip,(k=(_=J.tooltip)!=null?_:V.tooltip)==null?void 0:k.className)}),Yt),As=on(Mo,T({},(w=J.arrow)!=null?w:V.arrow,{className:Ee(dr.arrow,(x=(g=J.arrow)!=null?g:V.arrow)==null?void 0:x.className)}),Yt);return f.jsxs(E.Fragment,{children:[E.cloneElement(ae,De),f.jsx(Po,T({as:Y??Ui,placement:X,anchorEl:ee?{getBoundingClientRect:()=>({top:Qt.y,left:Qt.x,right:Qt.x,bottom:Qt.y,width:0,height:0})}:be,popperRef:pr,open:be?et:!1,id:lr,transition:!0},Xt,$s,{popperOptions:Ms,children:({TransitionProps:ne})=>f.jsx(Ro,T({timeout:we.transitions.duration.shorter},ne,_s,{children:f.jsxs(jo,T({},Is,{children:[oe,S?f.jsx(Mo,T({},As,{ref:Ze})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(qi.propTypes={arrow:i.bool,children:yn.isRequired,classes:i.object,className:i.string,components:i.shape({Arrow:i.elementType,Popper:i.elementType,Tooltip:i.elementType,Transition:i.elementType}),componentsProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),describeChild:i.bool,disableFocusListener:i.bool,disableHoverListener:i.bool,disableInteractive:i.bool,disableTouchListener:i.bool,enterDelay:i.number,enterNextDelay:i.number,enterTouchDelay:i.number,followCursor:i.bool,id:i.string,leaveDelay:i.number,leaveTouchDelay:i.number,onClose:i.func,onOpen:i.func,open:i.bool,placement:i.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:i.elementType,PopperProps:i.object,slotProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),slots:i.shape({arrow:i.elementType,popper:i.elementType,tooltip:i.elementType,transition:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),title:i.node,TransitionComponent:i.elementType,TransitionProps:i.object});const Ef=qi;var mo={},Hi={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Hi);var kf=Hi.exports,kr={};function Tf(e){return Je("MuiSvgIcon",e)}ut("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Cf=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Nf=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Ge(t)}`,`fontSize${Ge(n)}`]};return st(o,Tf,r)},Of=Te("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Ge(n.color)}`],t[`fontSize${Ge(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,a,s,l,c,p,u,m,d,v,y;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((p=e.typography)==null||(u=p.pxToRem)==null?void 0:u.call(p,35))||"2.1875rem"}[t.fontSize],color:(m=(d=(e.vars||e).palette)==null||(d=d[t.color])==null?void 0:d.main)!=null?m:{action:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.active,disabled:(y=(e.vars||e).palette)==null||(y=y.action)==null?void 0:y.disabled,inherit:void 0}[t.color]}}),ho=E.forwardRef(function(t,n){const r=lt({props:t,name:"MuiSvgIcon"}),{children:o,className:a,color:s="inherit",component:l="svg",fontSize:c="medium",htmlColor:p,inheritViewBox:u=!1,titleAccess:m,viewBox:d="0 0 24 24"}=r,v=de(r,Cf),y=E.isValidElement(o)&&o.type==="svg",b=T({},r,{color:s,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:u,viewBox:d,hasSvgAsChild:y}),h={};u||(h.viewBox=d);const k=Nf(b);return f.jsxs(Of,T({as:l,className:Ee(k.root,a),focusable:"false",color:p,"aria-hidden":m?void 0:!0,role:m?"img":void 0,ref:n},h,v,y&&o.props,{ownerState:b,children:[y?o.props.children:o,m?f.jsx("title",{children:m}):null]}))});process.env.NODE_ENV!=="production"&&(ho.propTypes={children:i.node,classes:i.object,className:i.string,color:i.oneOfType([i.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),i.string]),component:i.elementType,fontSize:i.oneOfType([i.oneOf(["inherit","large","medium","small"]),i.string]),htmlColor:i.string,inheritViewBox:i.bool,shapeRendering:i.string,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),titleAccess:i.string,viewBox:i.string});ho.muiName="SvgIcon";const Ta=ho;function Wi(e,t){function n(r,o){return f.jsx(Ta,T({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Ta.muiName,E.memo(E.forwardRef(n))}const Sf={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),gi.configure(e)}},Pf=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Ge,createChainedFunction:Mr,createSvgIcon:Wi,debounce:si,deprecatedPropType:tc,isMuiElement:nc,ownerDocument:ke,ownerWindow:Dt,requirePropFactory:rc,setRef:Fn,unstable_ClassNameGenerator:Sf,unstable_useEnhancedEffect:kt,unstable_useId:li,unsupportedProp:ic,useControlled:ci,useEventCallback:fn,useForkRef:Fe,useIsFocusVisible:pi},Symbol.toStringTag,{value:"Module"})),Rf=_l(Pf);var Ca;function jf(){return Ca||(Ca=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Rf}(kr)),kr}var Mf=kf;Object.defineProperty(mo,"__esModule",{value:!0});var Xi=mo.default=void 0,$f=Mf(jf()),_f=f;Xi=mo.default=(0,$f.default)((0,_f.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function Na(e,t,n){return e?f.jsx(ye.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:f.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function go(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:s=void 0,hasAutoFocus:l=!1,className:c,isDisabled:p=!1,isDense:u=!0,isSubMenuParent:m=!1,hasDisabledGutters:d=!1,hasDivider:v=!1,focusVisibleClassName:y,id:b,children:h}=e,k=f.jsx(ye.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:p,dense:u,disableGutters:d,divider:v,focusVisibleClassName:y,onClick:t,id:b,children:n?f.jsxs(f.Fragment,{children:[Na(a,n,!0),f.jsx(ye.ListItemText,{primary:n,inset:!a&&o}),m?f.jsx(ye.ListItemIcon,{className:"papi-menu-icon-trailing",children:f.jsx(Xi,{})}):Na(s,n,!1)]}):h});return r?f.jsx(Ef,{title:r,placement:"right",children:f.jsx("div",{children:k})}):k}function Yi(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function If(e){const[t,n]=P.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:a}=e,s=p=>{n(p.currentTarget)},l=()=>{n(void 0)},c=()=>{let p=Yi(a).filter(u=>"menuItem"in u.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return p=p.filter(u=>"menuItem"in u.group&&u.group.menuItem===r.id),f.jsx(bo,{...e,includedGroups:p})};return f.jsxs(f.Fragment,{children:[f.jsx(go,{onClick:s,...o,isSubMenuParent:!0}),f.jsx(ye.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Af=(e,t)=>t.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function bo(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:a,allowForLeadingIcons:s}=P.useMemo(()=>{const u=o&&o.length>0?o:Yi(t).filter(y=>!("menuItem"in y.group)),m=Object.values(u).sort((y,b)=>(y.group.order||0)-(b.group.order||0)),d=[];m.forEach(y=>{Af(y.id,t.items).forEach(b=>d.push({item:b,isLastItemInGroup:!1})),d.length>0&&(d[d.length-1].isLastItemInGroup=!0)}),d.length>0&&(d[d.length-1].isLastItemInGroup=!1);const v=d.some(y=>"iconPathBefore"in y.item&&y.item.iconPathBefore);return{items:d,allowForLeadingIcons:v}},[o,t]),l=({item:u,isLastItemInGroup:m})=>({className:"papi-menu-item",label:u.label,tooltip:u.tooltip,iconPathBefore:"iconPathBefore"in u?u.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in u?u.iconPathAfter:void 0,hasDivider:m,allowForLeadingIcons:s}),[c]=a;if(!c)return f.jsx("div",{});const p=c.item.group;return f.jsx("div",{role:"menu","aria-label":p,children:a.map((u,m)=>{const{item:d}=u,v=l(u);if("command"in d){const y=d.group+m;return f.jsx(go,{onClick:b=>{n==null||n(b),r(d)},...v},y)}return f.jsx(If,{parentMenuItem:d,parentItemProps:v,...e},p+d.id)})},p)}function Df(e){const{menuDefinition:t,columnId:n}=e;let a=Object.entries(t.groups).map(([s,l])=>({id:s,group:l})).filter(s=>"column"in s.group);return n&&"columns"in t&&t.columns[n]&&(a=a.filter(s=>"column"in s.group&&s.group.column===n)),f.jsx(bo,{...e,includedGroups:a})}function Bf({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:a}){return f.jsxs(ye.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${a??""}`,children:[f.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${a??""}`,children:r.label}),f.jsx(ye.List,{id:n,dense:!0,className:a??"",children:f.jsx(Df,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Gi({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,a=P.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,p=o[c];typeof p=="object"&&typeof p.order=="number"&&!Number.isNaN(p.order)?s.set(p.order,{id:c,metadata:p}):console.warn(`Property ${l} (${typeof p}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return f.jsx(ye.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:r,children:a.map((s,l)=>f.jsx(Bf,{commandHandler:e,menuDefinition:n,...s,className:t},l))})}const Ki=E.createContext({});process.env.NODE_ENV!=="production"&&(Ki.displayName="ListContext");const Lf=Ki;function Ff(e){return Je("MuiList",e)}ut("MuiList",["root","padding","dense","subheader"]);const Vf=["children","className","component","dense","disablePadding","subheader"],zf=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return st({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},Ff,t)},Uf=Te("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>T({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Ji=E.forwardRef(function(t,n){const r=lt({props:t,name:"MuiList"}),{children:o,className:a,component:s="ul",dense:l=!1,disablePadding:c=!1,subheader:p}=r,u=de(r,Vf),m=E.useMemo(()=>({dense:l}),[l]),d=T({},r,{component:s,dense:l,disablePadding:c}),v=zf(d);return f.jsx(Lf.Provider,{value:m,children:f.jsxs(Uf,T({as:s,className:Ee(v.root,a),ref:n,ownerState:d},u,{children:[p,o]}))})});process.env.NODE_ENV!=="production"&&(Ji.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,dense:i.bool,disablePadding:i.bool,subheader:i.node,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const qf=Ji,Hf=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Tr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function Oa(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function Zi(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function en(e,t,n,r,o,a){let s=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(s)return!1;s=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!Zi(l,a)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const Qi=E.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:a=!1,children:s,className:l,disabledItemsFocusable:c=!1,disableListWrap:p=!1,onKeyDown:u,variant:m="selectedMenu"}=t,d=de(t,Hf),v=E.useRef(null),y=E.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});kt(()=>{o&&v.current.focus()},[o]),E.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(w,x)=>{const g=!v.current.style.width;if(w.clientHeight<v.current.clientHeight&&g){const N=`${ui(ke(w))}px`;v.current.style[x.direction==="rtl"?"paddingLeft":"paddingRight"]=N,v.current.style.width=`calc(100% + ${N})`}return v.current}}),[]);const b=w=>{const x=v.current,g=w.key,N=ke(x).activeElement;if(g==="ArrowDown")w.preventDefault(),en(x,N,p,c,Tr);else if(g==="ArrowUp")w.preventDefault(),en(x,N,p,c,Oa);else if(g==="Home")w.preventDefault(),en(x,null,p,c,Tr);else if(g==="End")w.preventDefault(),en(x,null,p,c,Oa);else if(g.length===1){const S=y.current,F=g.toLowerCase(),L=performance.now();S.keys.length>0&&(L-S.lastTime>500?(S.keys=[],S.repeating=!0,S.previousKeyMatched=!0):S.repeating&&F!==S.keys[0]&&(S.repeating=!1)),S.lastTime=L,S.keys.push(F);const V=N&&!S.repeating&&Zi(N,S);S.previousKeyMatched&&(V||en(x,N,!1,c,Tr,S))?w.preventDefault():S.previousKeyMatched=!1}u&&u(w)},h=Fe(v,n);let k=-1;E.Children.forEach(s,(w,x)=>{if(!E.isValidElement(w)){k===x&&(k+=1,k>=s.length&&(k=-1));return}process.env.NODE_ENV!=="production"&&Ln.isFragment(w)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),w.props.disabled||(m==="selectedMenu"&&w.props.selected||k===-1)&&(k=x),k===x&&(w.props.disabled||w.props.muiSkipListHighlight||w.type.muiSkipListHighlight)&&(k+=1,k>=s.length&&(k=-1))});const _=E.Children.map(s,(w,x)=>{if(x===k){const g={};return a&&(g.autoFocus=!0),w.props.tabIndex===void 0&&m==="selectedMenu"&&(g.tabIndex=0),E.cloneElement(w,g)}return w});return f.jsx(qf,T({role:"menu",ref:h,className:l,onKeyDown:b,tabIndex:o?0:-1},d,{children:_}))});process.env.NODE_ENV!=="production"&&(Qi.propTypes={autoFocus:i.bool,autoFocusItem:i.bool,children:i.node,className:i.string,disabledItemsFocusable:i.bool,disableListWrap:i.bool,onKeyDown:i.func,variant:i.oneOf(["menu","selectedMenu"])});const Wf=Qi,Xf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Yf={entering:{opacity:1},entered:{opacity:1}},es=E.forwardRef(function(t,n){const r=Cn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:a,appear:s=!0,children:l,easing:c,in:p,onEnter:u,onEntered:m,onEntering:d,onExit:v,onExited:y,onExiting:b,style:h,timeout:k=o,TransitionComponent:_=Fi}=t,w=de(t,Xf),x=E.useRef(null),g=Fe(x,l.ref,n),N=B=>D=>{if(B){const $=x.current;D===void 0?B($):B($,D)}},S=N(d),F=N((B,D)=>{Vi(B);const $=Wn({style:h,timeout:k,easing:c},{mode:"enter"});B.style.webkitTransition=r.transitions.create("opacity",$),B.style.transition=r.transitions.create("opacity",$),u&&u(B,D)}),L=N(m),V=N(b),O=N(B=>{const D=Wn({style:h,timeout:k,easing:c},{mode:"exit"});B.style.webkitTransition=r.transitions.create("opacity",D),B.style.transition=r.transitions.create("opacity",D),v&&v(B)}),M=N(y),j=B=>{a&&a(x.current,B)};return f.jsx(_,T({appear:s,in:p,nodeRef:x,onEnter:F,onEntered:L,onEntering:S,onExit:O,onExited:M,onExiting:V,addEndListener:j,timeout:k},w,{children:(B,D)=>E.cloneElement(l,T({style:T({opacity:0,visibility:B==="exited"&&!p?"hidden":void 0},Yf[B],h,l.props.style),ref:g},D))}))});process.env.NODE_ENV!=="production"&&(es.propTypes={addEndListener:i.func,appear:i.bool,children:yn.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Gf=es;function Kf(e){return Je("MuiBackdrop",e)}ut("MuiBackdrop",["root","invisible"]);const Jf=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Zf=e=>{const{classes:t,invisible:n}=e;return st({root:["root",n&&"invisible"]},Kf,t)},Qf=Te("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>T({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),ts=E.forwardRef(function(t,n){var r,o,a;const s=lt({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:p="div",components:u={},componentsProps:m={},invisible:d=!1,open:v,slotProps:y={},slots:b={},TransitionComponent:h=Gf,transitionDuration:k}=s,_=de(s,Jf),w=T({},s,{component:p,invisible:d}),x=Zf(w),g=(r=y.root)!=null?r:m.root;return f.jsx(h,T({in:v,timeout:k},_,{children:f.jsx(Qf,T({"aria-hidden":!0},g,{as:(o=(a=b.root)!=null?a:u.Root)!=null?o:p,className:Ee(x.root,c,g==null?void 0:g.className),ownerState:T({},w,g==null?void 0:g.ownerState),classes:x,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(ts.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.object}),invisible:i.bool,open:i.bool.isRequired,slotProps:i.shape({root:i.object}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const em=ts;function tm(e){return Je("MuiModal",e)}ut("MuiModal",["root","hidden","backdrop"]);const nm=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],rm=e=>{const{open:t,exited:n,classes:r}=e;return st({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},tm,r)},om=Te("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>T({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),am=Te(em,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),ns=E.forwardRef(function(t,n){var r,o,a,s,l,c;const p=lt({name:"MuiModal",props:t}),{BackdropComponent:u=am,BackdropProps:m,className:d,closeAfterTransition:v=!1,children:y,container:b,component:h,components:k={},componentsProps:_={},disableAutoFocus:w=!1,disableEnforceFocus:x=!1,disableEscapeKeyDown:g=!1,disablePortal:N=!1,disableRestoreFocus:S=!1,disableScrollLock:F=!1,hideBackdrop:L=!1,keepMounted:V=!1,onBackdropClick:O,open:M,slotProps:j,slots:B}=p,D=de(p,nm),$=T({},p,{closeAfterTransition:v,disableAutoFocus:w,disableEnforceFocus:x,disableEscapeKeyDown:g,disablePortal:N,disableRestoreFocus:S,disableScrollLock:F,hideBackdrop:L,keepMounted:V}),{getRootProps:z,getBackdropProps:te,getTransitionProps:ee,portalRef:C,isTopModal:A,exited:q,hasTransition:K}=Xc(T({},$,{rootRef:n})),U=T({},$,{exited:q}),H=rm(U),X={};if(y.props.tabIndex===void 0&&(X.tabIndex="-1"),K){const{onEnter:Q,onExited:R}=ee();X.onEnter=Q,X.onExited=R}const Y=(r=(o=B==null?void 0:B.root)!=null?o:k.Root)!=null?r:om,W=(a=(s=B==null?void 0:B.backdrop)!=null?s:k.Backdrop)!=null?a:u,J=(l=j==null?void 0:j.root)!=null?l:_.root,Z=(c=j==null?void 0:j.backdrop)!=null?c:_.backdrop,oe=Tt({elementType:Y,externalSlotProps:J,externalForwardedProps:D,getSlotProps:z,additionalProps:{ref:n,as:h},ownerState:U,className:Ee(d,J==null?void 0:J.className,H==null?void 0:H.root,!U.open&&U.exited&&(H==null?void 0:H.hidden))}),I=Tt({elementType:W,externalSlotProps:Z,additionalProps:m,getSlotProps:Q=>te(T({},Q,{onClick:R=>{O&&O(R),Q!=null&&Q.onClick&&Q.onClick(R)}})),className:Ee(Z==null?void 0:Z.className,m==null?void 0:m.className,H==null?void 0:H.backdrop),ownerState:U});return!V&&!M&&(!K||q)?null:f.jsx(mn,{ref:C,container:b,disablePortal:N,children:f.jsxs(Y,T({},oe,{children:[!L&&u?f.jsx(W,T({},I)):null,f.jsx(Vn,{disableEnforceFocus:x,disableAutoFocus:w,disableRestoreFocus:S,isEnabled:A,open:M,children:E.cloneElement(y,X)})]}))})});process.env.NODE_ENV!=="production"&&(ns.propTypes={BackdropComponent:i.elementType,BackdropProps:i.object,children:yn.isRequired,classes:i.object,className:i.string,closeAfterTransition:i.bool,component:i.elementType,components:i.shape({Backdrop:i.elementType,Root:i.elementType}),componentsProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([rt,i.func]),disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableEscapeKeyDown:i.bool,disablePortal:i.bool,disableRestoreFocus:i.bool,disableScrollLock:i.bool,hideBackdrop:i.bool,keepMounted:i.bool,onBackdropClick:i.func,onClose:i.func,onTransitionEnter:i.func,onTransitionExited:i.func,open:i.bool.isRequired,slotProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({backdrop:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const im=ns;function sm(e){return Je("MuiPaper",e)}ut("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const lm=["className","component","elevation","square","variant"],cm=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,a={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return st(a,sm,o)},pm=Te("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return T({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&T({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${Hn("#fff",Ea(t.elevation))}, ${Hn("#fff",Ea(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),rs=E.forwardRef(function(t,n){const r=lt({props:t,name:"MuiPaper"}),{className:o,component:a="div",elevation:s=1,square:l=!1,variant:c="elevation"}=r,p=de(r,lm),u=T({},r,{component:a,elevation:s,square:l,variant:c}),m=cm(u);return process.env.NODE_ENV!=="production"&&Cn().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),f.jsx(pm,T({as:a,ownerState:u,className:Ee(m.root,o),ref:n},p))});process.env.NODE_ENV!=="production"&&(rs.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,elevation:Ut(mi,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:i.bool,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),variant:i.oneOfType([i.oneOf(["elevation","outlined"]),i.string])});const um=rs;function dm(e){return Je("MuiPopover",e)}ut("MuiPopover",["root","paper"]);const fm=["onEntering"],mm=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],hm=["slotProps"];function Sa(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function Pa(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function Ra(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function Dn(e){return typeof e=="function"?e():e}const gm=e=>{const{classes:t}=e;return st({root:["root"],paper:["paper"]},dm,t)},bm=Te(im,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),os=Te(um,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),as=E.forwardRef(function(t,n){var r,o,a;const s=lt({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:p={vertical:"top",horizontal:"left"},anchorPosition:u,anchorReference:m="anchorEl",children:d,className:v,container:y,elevation:b=8,marginThreshold:h=16,open:k,PaperProps:_={},slots:w,slotProps:x,transformOrigin:g={vertical:"top",horizontal:"left"},TransitionComponent:N=Fr,transitionDuration:S="auto",TransitionProps:{onEntering:F}={},disableScrollLock:L=!1}=s,V=de(s.TransitionProps,fm),O=de(s,mm),M=(r=x==null?void 0:x.paper)!=null?r:_,j=E.useRef(),B=Fe(j,M.ref),D=T({},s,{anchorOrigin:p,anchorReference:m,elevation:b,marginThreshold:h,externalPaperSlotProps:M,transformOrigin:g,TransitionComponent:N,transitionDuration:S,TransitionProps:V}),$=gm(D),z=E.useCallback(()=>{if(m==="anchorPosition")return process.env.NODE_ENV!=="production"&&(u||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),u;const Q=Dn(c),R=Q&&Q.nodeType===1?Q:ke(j.current).body,ae=R.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const we=R.getBoundingClientRect();process.env.NODE_ENV!=="test"&&we.top===0&&we.left===0&&we.right===0&&we.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:ae.top+Sa(ae,p.vertical),left:ae.left+Pa(ae,p.horizontal)}},[c,p.horizontal,p.vertical,u,m]),te=E.useCallback(Q=>({vertical:Sa(Q,g.vertical),horizontal:Pa(Q,g.horizontal)}),[g.horizontal,g.vertical]),ee=E.useCallback(Q=>{const R={width:Q.offsetWidth,height:Q.offsetHeight},ae=te(R);if(m==="none")return{top:null,left:null,transformOrigin:Ra(ae)};const we=z();let Ce=we.top-ae.vertical,be=we.left-ae.horizontal;const mt=Ce+R.height,Ne=be+R.width,Ze=Dt(Dn(c)),Me=Ze.innerHeight-h,Qe=Ze.innerWidth-h;if(h!==null&&Ce<h){const xe=Ce-h;Ce-=xe,ae.vertical+=xe}else if(h!==null&&mt>Me){const xe=mt-Me;Ce-=xe,ae.vertical+=xe}if(process.env.NODE_ENV!=="production"&&R.height>Me&&R.height&&Me&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${R.height-Me}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),h!==null&&be<h){const xe=be-h;be-=xe,ae.horizontal+=xe}else if(Ne>Qe){const xe=Ne-Qe;be-=xe,ae.horizontal+=xe}return{top:`${Math.round(Ce)}px`,left:`${Math.round(be)}px`,transformOrigin:Ra(ae)}},[c,m,z,te,h]),[C,A]=E.useState(k),q=E.useCallback(()=>{const Q=j.current;if(!Q)return;const R=ee(Q);R.top!==null&&(Q.style.top=R.top),R.left!==null&&(Q.style.left=R.left),Q.style.transformOrigin=R.transformOrigin,A(!0)},[ee]);E.useEffect(()=>(L&&window.addEventListener("scroll",q),()=>window.removeEventListener("scroll",q)),[c,L,q]);const K=(Q,R)=>{F&&F(Q,R),q()},U=()=>{A(!1)};E.useEffect(()=>{k&&q()}),E.useImperativeHandle(l,()=>k?{updatePosition:()=>{q()}}:null,[k,q]),E.useEffect(()=>{if(!k)return;const Q=si(()=>{q()}),R=Dt(c);return R.addEventListener("resize",Q),()=>{Q.clear(),R.removeEventListener("resize",Q)}},[c,k,q]);let H=S;S==="auto"&&!N.muiSupportAuto&&(H=void 0);const X=y||(c?ke(Dn(c)).body:void 0),Y=(o=w==null?void 0:w.root)!=null?o:bm,W=(a=w==null?void 0:w.paper)!=null?a:os,J=Tt({elementType:W,externalSlotProps:T({},M,{style:C?M.style:T({},M.style,{opacity:0})}),additionalProps:{elevation:b,ref:B},ownerState:D,className:Ee($.paper,M==null?void 0:M.className)}),Z=Tt({elementType:Y,externalSlotProps:(x==null?void 0:x.root)||{},externalForwardedProps:O,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:X,open:k},ownerState:D,className:Ee($.root,v)}),{slotProps:oe}=Z,I=de(Z,hm);return f.jsx(Y,T({},I,!vi(Y)&&{slotProps:oe,disableScrollLock:L},{children:f.jsx(N,T({appear:!0,in:k,onEntering:K,onExited:U,timeout:H},V,{children:f.jsx(W,T({},J,{children:d}))}))}))});process.env.NODE_ENV!=="production"&&(as.propTypes={action:Kr,anchorEl:Ut(i.oneOfType([rt,i.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=Dn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),anchorPosition:i.shape({left:i.number.isRequired,top:i.number.isRequired}),anchorReference:i.oneOf(["anchorEl","anchorPosition","none"]),children:i.node,classes:i.object,className:i.string,container:i.oneOfType([rt,i.func]),disableScrollLock:i.bool,elevation:mi,marginThreshold:i.number,onClose:i.func,open:i.bool.isRequired,PaperProps:i.shape({component:Xl}),slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transformOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object});const vm=as;function ym(e){return Je("MuiMenu",e)}ut("MuiMenu",["root","paper","list"]);const wm=["onEntering"],xm=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Em={vertical:"top",horizontal:"right"},km={vertical:"top",horizontal:"left"},Tm=e=>{const{classes:t}=e;return st({root:["root"],paper:["paper"],list:["list"]},ym,t)},Cm=Te(vm,{shouldForwardProp:e=>Bi(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Nm=Te(os,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),Om=Te(Wf,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),is=E.forwardRef(function(t,n){var r,o;const a=lt({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:l,className:c,disableAutoFocusItem:p=!1,MenuListProps:u={},onClose:m,open:d,PaperProps:v={},PopoverClasses:y,transitionDuration:b="auto",TransitionProps:{onEntering:h}={},variant:k="selectedMenu",slots:_={},slotProps:w={}}=a,x=de(a.TransitionProps,wm),g=de(a,xm),N=Cn(),S=N.direction==="rtl",F=T({},a,{autoFocus:s,disableAutoFocusItem:p,MenuListProps:u,onEntering:h,PaperProps:v,transitionDuration:b,TransitionProps:x,variant:k}),L=Tm(F),V=s&&!p&&d,O=E.useRef(null),M=(ee,C)=>{O.current&&O.current.adjustStyleForScrollbar(ee,N),h&&h(ee,C)},j=ee=>{ee.key==="Tab"&&(ee.preventDefault(),m&&m(ee,"tabKeyDown"))};let B=-1;E.Children.map(l,(ee,C)=>{E.isValidElement(ee)&&(process.env.NODE_ENV!=="production"&&Ln.isFragment(ee)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),ee.props.disabled||(k==="selectedMenu"&&ee.props.selected||B===-1)&&(B=C))});const D=(r=_.paper)!=null?r:Nm,$=(o=w.paper)!=null?o:v,z=Tt({elementType:_.root,externalSlotProps:w.root,ownerState:F,className:[L.root,c]}),te=Tt({elementType:D,externalSlotProps:$,ownerState:F,className:L.paper});return f.jsx(Cm,T({onClose:m,anchorOrigin:{vertical:"bottom",horizontal:S?"right":"left"},transformOrigin:S?Em:km,slots:{paper:D,root:_.root},slotProps:{root:z,paper:te},open:d,ref:n,transitionDuration:b,TransitionProps:T({onEntering:M},x),ownerState:F},g,{classes:y,children:f.jsx(Om,T({onKeyDown:j,actions:O,autoFocus:s&&(B===-1||p),autoFocusItem:V,variant:k},u,{className:Ee(L.list,u.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(is.propTypes={anchorEl:i.oneOfType([rt,i.func]),autoFocus:i.bool,children:i.node,classes:i.object,className:i.string,disableAutoFocusItem:i.bool,MenuListProps:i.object,onClose:i.func,open:i.bool.isRequired,PaperProps:i.object,PopoverClasses:i.object,slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object,variant:i.oneOf(["menu","selectedMenu"])});const Sm=is;function Pm({className:e,commandHandler:t,menuDefinition:n,children:r}){var p;const[o,a]=P.useState(void 0),s=P.useCallback(u=>{u.preventDefault(),a(o===void 0?{mouseX:u.clientX+2,mouseY:u.clientY-6}:void 0)},[o]),l=P.useCallback(()=>{a(void 0)},[]),c=P.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((p=n==null?void 0:n.items)==null?void 0:p.length)??0)===0||!r?r:f.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[r,f.jsx(Sm,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:f.jsx(bo,{menuDefinition:n,commandHandler:t,onClick:l})})]})}const Rm=Wi(f.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function jm(e){return{preserveValue:!0,...e}}const Xn=(e,t,n={})=>{const r=P.useRef(t);r.current=t;const o=P.useRef(n);o.current=jm(o.current);const[a,s]=P.useState(()=>r.current),[l,c]=P.useState(!0);return P.useEffect(()=>{let p=!0;return c(!!e),(async()=>{if(e){const u=await e();p&&(s(()=>u),c(!1))}})(),()=>{p=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[a,l]};function ss({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:a,ariaLabelPrefix:s,children:l}){const[c,p]=P.useState(!1),[u,m]=P.useState(!1),d=P.useCallback(()=>{c&&p(!1),m(!1)},[c]),v=P.useCallback(x=>{x.stopPropagation(),p(g=>{const N=!g;return N&&x.shiftKey?m(!0):N||m(!1),N})},[]),y=P.useCallback(x=>(d(),r(x)),[r,d]),[b,h]=P.useState({top:1,left:1});P.useEffect(()=>{if(c){const x=o==null?void 0:o.current;if(x){const g=x.getBoundingClientRect(),N=window.scrollY,S=window.scrollX,F=g.top+N+x.clientHeight,L=g.left+S;h({top:F,left:L})}}},[c,o]);const[k]=Xn(P.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[_]=Xn(P.useCallback(async()=>(e==null?void 0:e(!0))??n??k,[e,n,k,c]),n??k),w=u&&_?_:k;return f.jsxs(f.Fragment,{children:[f.jsx(ye.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:v,children:l??f.jsx(Rm,{})}),f.jsx(ye.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:c,onClose:d,PaperProps:{className:"papi-menu-drawer-paper",style:{top:b.top,left:b.left}},children:w?f.jsx(Gi,{className:a,id:`${s??""} main menu`,commandHandler:y,multiColumnMenu:w}):void 0})]})}function Mm({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:s="medium",className:l,onClick:c,children:p}){return f.jsx(ye.IconButton,{id:e,disabled:n,edge:a,size:s,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:p})}const $m=Vr.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),vo=P.forwardRef(({className:e,...t},n)=>f.jsx(Ma.Root,{ref:n,className:G($m(),e),...t}));vo.displayName=Ma.Root.displayName;function vn({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:a,placeholder:s,isRequired:l=!1,className:c,defaultValue:p,value:u,onChange:m,onFocus:d,onBlur:v}){return f.jsxs("div",{className:G("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":r}),children:[f.jsx(vo,{htmlFor:e,className:G({"pr-text-red-600":n,"pr-hidden":!a}),children:`${a}${l?"*":""}`}),f.jsx(Gn,{id:e,disabled:t,placeholder:s,required:l,className:G(c,{"pr-border-red-600":n}),defaultValue:p,value:u,onChange:m,onFocus:d,onBlur:v}),f.jsx("p",{className:G({"pr-hidden":!o}),children:o})]})}let Cr;const Nr=()=>(Cr||(Cr=ue.allBookIds.map(e=>({bookId:e,label:ue.bookIdToEnglishName(e)}))),Cr);function _m({scrRef:e,handleSubmit:t,id:n}){const r=c=>{t(c)},o=c=>{const u={bookNum:ue.bookIdToNumber(c.bookId),chapterNum:1,verseNum:1};r(u)},a=c=>{t({...e,chapterNum:+c.target.value})},s=c=>{t({...e,verseNum:+c.target.value})},l=P.useMemo(()=>Nr()[e.bookNum-1],[e.bookNum]);return f.jsxs("span",{id:n,className:"pr-flex pr-place-items-center",children:[f.jsxs("div",{className:"pr-inline-grid pr-items-center pr-gap-1.5",children:[f.jsx(vo,{children:"Book"}),f.jsx(Bn,{value:l,options:Nr(),onChange:o})]}),f.jsx(tt,{onClick:()=>r(qe.offsetBook(e,-1)),disabled:e.bookNum<=qe.FIRST_SCR_BOOK_NUM,children:"<"}),f.jsx(tt,{onClick:()=>r(qe.offsetBook(e,1)),disabled:e.bookNum>=Nr().length,children:">"}),f.jsx(vn,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:a}),f.jsx(tt,{onClick:()=>t(qe.offsetChapter(e,-1)),disabled:e.chapterNum<=qe.FIRST_SCR_CHAPTER_NUM,children:"<"}),f.jsx(tt,{onClick:()=>t(qe.offsetChapter(e,1)),disabled:e.chapterNum>=qe.getChaptersForBook(e.bookNum),children:">"}),f.jsx(vn,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:s}),f.jsx(tt,{onClick:()=>t(qe.offsetVerse(e,-1)),disabled:e.verseNum<=qe.FIRST_SCR_VERSE_NUM,children:"<"}),f.jsx(tt,{onClick:()=>t(qe.offsetVerse(e,1)),children:">"})]})}function Im({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=P.useState(""),a=s=>{o(s),e(s)};return f.jsx(vn,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:s=>a(s.target.value)})}function Am({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:a=1,showMarks:s=!1,defaultValue:l,value:c,valueLabelDisplay:p="off",className:u,onChange:m,onChangeCommitted:d}){return f.jsx(ye.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:a,marks:s,defaultValue:l,value:c,valueLabelDisplay:p,className:`papi-slider ${n} ${u??""}`,onChange:m,onChangeCommitted:d})}function Dm({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:s,children:l}){const c={action:(s==null?void 0:s.action)||l,message:s==null?void 0:s.message,className:r};return f.jsx(ye.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:a,id:t,ContentProps:c})}function Bm({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:a}){return f.jsx(ye.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:a})}function ja({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return f.jsx(vn,{defaultValue:t[n.key],onChange:r})}const Lm=({onChange:e,disabled:t,checked:n,...r})=>{const o=a=>{e(a.target.checked,a.nativeEvent.shiftKey)};return f.jsx(Yr,{...r,isChecked:n,isDisabled:t,onChange:o})};function Fm({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:a,defaultColumnMaxWidth:s,defaultColumnSortable:l=!0,defaultColumnResizable:c=!0,rows:p,enableSelectColumn:u,selectColumnWidth:m=50,rowKeyGetter:d,rowHeight:v=35,headerRowHeight:y=35,selectedRows:b,onSelectedRowsChange:h,onRowsChange:k,onCellClick:_,onCellDoubleClick:w,onCellContextMenu:x,onCellKeyDown:g,direction:N="ltr",enableVirtualization:S=!0,onCopy:F,onPaste:L,onScroll:V,className:O,"data-testid":M}){const j=P.useMemo(()=>{const B=e.map(D=>typeof D.editable=="function"?{...D,editable:z=>!!D.editable(z),renderEditCell:D.renderEditCell||ja}:D.editable&&!D.renderEditCell?{...D,renderEditCell:ja}:D.renderEditCell&&!D.editable?{...D,editable:!1}:D);return u?[{...$o.SelectColumn,minWidth:m},...B]:B},[e,u,m]);return f.jsx($o,{columns:j,defaultColumnOptions:{width:o,minWidth:a,maxWidth:s,sortable:l,resizable:c},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:p,rowKeyGetter:d,rowHeight:v,headerRowHeight:y,selectedRows:b,onSelectedRowsChange:h,onRowsChange:k,onCellClick:_,onCellDoubleClick:w,onCellContextMenu:x,onCellKeyDown:g,direction:N,enableVirtualization:S,onCopy:F,onPaste:L,onScroll:V,renderers:{renderCheckbox:Lm},className:`papi-table ${O??"rdg-light"}`,"data-testid":M})}function Vm({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const a=P.useRef(void 0);return f.jsx("div",{ref:a,style:{position:"relative"},children:f.jsx(ye.AppBar,{position:"static",id:r,children:f.jsxs(ye.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?f.jsx(ss,{commandHandler:t,containerRef:a,menuProvider:e}):void 0,o?f.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const zm=(e,t)=>{P.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Or=()=>!1,Um=(e,t)=>{const[n]=Xn(P.useCallback(async()=>{if(!e)return Or;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Or,{preserveValue:!1});P.useEffect(()=>()=>{n!==Or&&n()},[n])},qm=je.Root,ls=P.forwardRef(({className:e,...t},n)=>f.jsx(je.List,{ref:n,className:G("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));ls.displayName=je.List.displayName;const cs=P.forwardRef(({className:e,...t},n)=>f.jsx(je.Trigger,{ref:n,className:G("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));cs.displayName=je.Trigger.displayName;const ps=P.forwardRef(({className:e,...t},n)=>f.jsx(je.Content,{ref:n,className:G("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));ps.displayName=je.Content.displayName;const us=P.forwardRef(({className:e,...t},n)=>f.jsx(je.Root,{orientation:"vertical",ref:n,className:G("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));us.displayName=je.List.displayName;const ds=P.forwardRef(({className:e,...t},n)=>f.jsx(je.List,{ref:n,className:G("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));ds.displayName=je.List.displayName;const Hm=P.forwardRef(({className:e,...t},n)=>f.jsx(je.Trigger,{ref:n,...t,className:G("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),fs=P.forwardRef(({className:e,...t},n)=>f.jsx(je.Content,{ref:n,className:G("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));fs.displayName=je.Content.displayName;const ms=P.forwardRef(({className:e,...t},n)=>f.jsx("div",{ref:n,className:G("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));ms.displayName="Card";const hs=P.forwardRef(({className:e,...t},n)=>f.jsx("div",{ref:n,className:G("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));hs.displayName="CardHeader";const gs=P.forwardRef(({className:e,...t},n)=>f.jsx("h3",{ref:n,className:G("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));gs.displayName="CardTitle";const bs=P.forwardRef(({className:e,...t},n)=>f.jsx("p",{ref:n,className:G("pr-text-sm pr-text-muted-foreground",e),...t}));bs.displayName="CardDescription";const vs=P.forwardRef(({className:e,...t},n)=>f.jsx("div",{ref:n,className:G("pr-p-6 pr-pt-0",e),...t}));vs.displayName="CardContent";const ys=P.forwardRef(({className:e,...t},n)=>f.jsx("div",{ref:n,className:G("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));ys.displayName="CardFooter";const Wm=Vr.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),ws=P.forwardRef(({className:e,variant:t,...n},r)=>f.jsx("div",{ref:r,role:"alert",className:G(Wm({variant:t}),e),...n}));ws.displayName="Alert";const xs=P.forwardRef(({className:e,...t},n)=>f.jsxs("h5",{ref:n,className:G("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));xs.displayName="AlertTitle";const Es=P.forwardRef(({className:e,...t},n)=>f.jsx("div",{ref:n,className:G("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));Es.displayName="AlertDescription";const ks=P.forwardRef(({className:e,...t},n)=>f.jsxs(nn.Root,{ref:n,className:G("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[f.jsx(nn.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:f.jsx(nn.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),f.jsx(nn.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));ks.displayName=nn.Root.displayName;const Ts=P.forwardRef(({className:e,...t},n)=>f.jsx(Pr.Root,{className:G("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:n,children:f.jsx(Pr.Thumb,{className:G("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));Ts.displayName=Pr.Root.displayName;exports.Alert=ws;exports.AlertDescription=Es;exports.AlertTitle=xs;exports.BookChapterControl=xl;exports.Button=tt;exports.Card=ms;exports.CardContent=vs;exports.CardDescription=bs;exports.CardFooter=ys;exports.CardHeader=hs;exports.CardTitle=gs;exports.ChapterRangeSelector=jl;exports.Checkbox=Yr;exports.Checklist=Ml;exports.ComboBox=Bn;exports.ContextMenu=Pm;exports.DropdownMenu=La;exports.DropdownMenuCheckboxItem=Ua;exports.DropdownMenuContent=Hr;exports.DropdownMenuGroup=il;exports.DropdownMenuItem=Wr;exports.DropdownMenuLabel=Yn;exports.DropdownMenuPortal=sl;exports.DropdownMenuRadioGroup=cl;exports.DropdownMenuRadioItem=qa;exports.DropdownMenuSeparator=Xr;exports.DropdownMenuShortcut=Ha;exports.DropdownMenuSub=ll;exports.DropdownMenuSubContent=za;exports.DropdownMenuSubTrigger=Va;exports.DropdownMenuTrigger=Fa;exports.GridMenu=Gi;exports.HamburgerMenuButton=ss;exports.IconButton=Mm;exports.Input=Gn;exports.LabelPosition=yt;exports.MenuItem=go;exports.RefSelector=_m;exports.SearchBar=Im;exports.ShadCnSlider=ks;exports.ShadCnSwitch=Ts;exports.Slider=Am;exports.Snackbar=Dm;exports.Switch=Bm;exports.Table=Fm;exports.Tabs=qm;exports.TabsContent=ps;exports.TabsList=ls;exports.TabsTrigger=cs;exports.TextField=vn;exports.Toolbar=Vm;exports.VerticalTabs=us;exports.VerticalTabsContent=fs;exports.VerticalTabsList=ds;exports.VerticalTabsTrigger=Hm;exports.buttonVariants=Wa;exports.useEvent=zm;exports.useEventAsync=Um;exports.usePromise=Xn;function Xm(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Xm(`.check-item {
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
    --card: 0 0% 100%;
    --card-foreground: 224 71.4% 4.1%;
    --border: 220 13% 91%;
    --input: 161.3, 26.7%, 88.2%;
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
.pr-inset-0 {
  inset: 0px;
}
.pr-left-2 {
  left: 0.5rem;
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
.pr-top-1\\/2 {
  top: 50%;
}
.pr-top-4 {
  top: 1rem;
}
.pr-top-\\[50\\%\\] {
  top: 50%;
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
.pr-mr-2 {
  margin-right: 0.5rem;
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
.pr-h-full {
  height: 100%;
}
.pr-h-px {
  height: 1px;
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
.pr-w-72 {
  width: 18rem;
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
.pr-w-\\[200px\\] {
  width: 200px;
}
.pr-w-full {
  width: 100%;
}
.pr-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.pr-max-w-64 {
  max-width: 16rem;
}
.pr-max-w-lg {
  max-width: 32rem;
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
.pr-cursor-default {
  cursor: default;
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
.pr-flex-col-reverse {
  flex-direction: column-reverse;
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
.pr-gap-4 {
  gap: 1rem;
}
.pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
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
.pr-whitespace-nowrap {
  white-space: nowrap;
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
.pr-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
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
.pr-py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.pr-py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
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
.pr-pt-0 {
  padding-top: 0px;
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
.pr-leading-none {
  line-height: 1;
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
.pr-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}
.pr-text-card-foreground {
  color: hsl(var(--card-foreground));
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

  .sm\\:pr-flex-row {
    flex-direction: row;
  }

  .sm\\:pr-justify-end {
    justify-content: flex-end;
  }

  .sm\\:pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:pr-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:pr-text-left {
    text-align: left;
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
