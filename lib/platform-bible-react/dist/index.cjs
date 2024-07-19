"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const b=require("react/jsx-runtime"),_=require("react"),Ce=require("platform-bible-utils"),_l=require("@radix-ui/react-dropdown-menu"),Ye=require("lucide-react"),Te=require("clsx"),$l=require("tailwind-merge"),Ml=require("@radix-ui/react-slot"),ho=require("class-variance-authority"),we=require("@mui/material"),Kr=require("@mui/styled-engine"),pn=require("react-dom"),Il=require("@radix-ui/react-label"),jl=require("@radix-ui/react-select"),ci=require("react-data-grid"),Dl=require("@radix-ui/react-tabs"),Al=require("@radix-ui/react-slider"),Fl=require("@radix-ui/react-switch");function bt(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const R=bt(_),me=bt(_l),Vl=bt(pn),ds=bt(Il),ye=bt(jl),je=bt(Dl),fn=bt(Al),Jr=bt(Fl);var Ll=Object.defineProperty,Bl=(e,t,n)=>t in e?Ll(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ie=(e,t,n)=>Bl(e,typeof t!="symbol"?t+"":t,n);const _t=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],vo=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ps=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],di=Jl();function Jt(e,t=!0){return t&&(e=e.toUpperCase()),e in di?di[e]:0}function bo(e){return Jt(e)>0}function zl(e){const t=typeof e=="string"?Jt(e):e;return t>=40&&t<=66}function Hl(e){return(typeof e=="string"?Jt(e):e)<=39}function fs(e){return e<=66}function Gl(e){const t=typeof e=="string"?Jt(e):e;return hs(t)&&!fs(t)}function*Ul(){for(let e=1;e<=_t.length;e++)yield e}const ql=1,gs=_t.length;function Wl(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function wo(e,t="***"){const n=e-1;return n<0||n>=_t.length?t:_t[n]}function ms(e){return e<=0||e>gs?"******":ps[e-1]}function Xl(e){return ms(Jt(e))}function hs(e){const t=typeof e=="number"?wo(e):e;return bo(t)&&!vo.includes(t)}function Yl(e){const t=typeof e=="number"?wo(e):e;return bo(t)&&vo.includes(t)}function Kl(e){return ps[e-1].includes("*obsolete*")}function Jl(){const e={};for(let t=0;t<_t.length;t++)e[_t[t]]=t+1;return e}const ue={allBookIds:_t,nonCanonicalIds:vo,bookIdToNumber:Jt,isBookIdValid:bo,isBookNT:zl,isBookOT:Hl,isBookOTNT:fs,isBookDC:Gl,allBookNumbers:Ul,firstBook:ql,lastBook:gs,extraBooks:Wl,bookNumberToId:wo,bookNumberToEnglishName:ms,bookIdToEnglishName:Xl,isCanonical:hs,isExtraMaterial:Yl,isObsolete:Kl};var Je=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Je||{});const Fe=class{constructor(t){if(ie(this,"name"),ie(this,"fullPath"),ie(this,"isPresent"),ie(this,"hasVerseSegments"),ie(this,"isCustomized"),ie(this,"baseVersification"),ie(this,"scriptureBooks"),ie(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Je[t]):(this._type=t,this.name=Je[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ie(Fe,"Original",new Fe(Je.Original)),ie(Fe,"Septuagint",new Fe(Je.Septuagint)),ie(Fe,"Vulgate",new Fe(Je.Vulgate)),ie(Fe,"English",new Fe(Je.English)),ie(Fe,"RussianProtestant",new Fe(Je.RussianProtestant)),ie(Fe,"RussianOrthodox",new Fe(Je.RussianOrthodox));let Et=Fe;function pi(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var vs=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(vs||{});const $e=class le{constructor(t,n,r,o){if(ie(this,"firstChapter"),ie(this,"lastChapter"),ie(this,"lastVerse"),ie(this,"hasSegmentsDefined"),ie(this,"text"),ie(this,"BBBCCCVVVS"),ie(this,"longHashCode"),ie(this,"versification"),ie(this,"rtlMark","‏"),ie(this,"_bookNum",0),ie(this,"_chapterNum",0),ie(this,"_verseNum",0),ie(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,s=n!=null&&n instanceof Et?n:void 0;this.setEmpty(s),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof Et?n:void 0;this.setEmpty(i),this._verseNum=t%le.chapterDigitShifter,this._chapterNum=Math.floor(t%le.bookDigitShifter/le.chapterDigitShifter),this._bookNum=Math.floor(t/le.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof le){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof Et?t:le.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??le.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new le(t),{success:!0,verseRef:n}}catch(r){if(r instanceof on)return n=new le,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%le.bcvMaxValue*le.bookDigitShifter+(n>=0?n%le.bcvMaxValue*le.chapterDigitShifter:0)+(r>=0?r%le.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:i,versificationStr:s}=t,a=i||o.toString();let u;return s&&(u=new Et(s)),n?new le(n,r.toString(),a,u):new le}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>le.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(le.verseRangeSeparator)||this._verse.includes(le.verseSequenceIndicator))}get book(){return ue.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=ue.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=le.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=le.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>ue.lastBook)throw new on("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Et(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(le.verseRangeSeparators,le.verseSequenceIndicators)}get BBBCCC(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const s=+i[1].trim();this.versification=new Et(Je[s])}catch{throw new on("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new on("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||ue.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!le.isVerseParseable(r[1]))throw new on("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new le(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;return(t===""||t===this.verseNum.toString())&&(t=void 0),{book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr}}equals(t){return t instanceof le?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=le.verseRangeSeparators,r=le.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=pi(this._verse,r);for(const s of i.map(a=>pi(a,n))){const a=this.clone();a.verse=s[0];const u=a.verseNum;if(o.push(a),s.length>1){const c=this.clone();if(c.verse=s[1],!t)for(let d=u+1;d<c.verseNum;d++){const g=new le(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(g)}o.push(c)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ue.lastBook?2:(ue.isCanonical(this._bookNum),0)}setEmpty(t=le.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=ue.bookIdToNumber(t),this.chapter=n,this.verse=r}};ie($e,"defaultVersification",Et.English),ie($e,"verseRangeSeparator","-"),ie($e,"verseSequenceIndicator",","),ie($e,"verseRangeSeparators",[$e.verseRangeSeparator]),ie($e,"verseSequenceIndicators",[$e.verseSequenceIndicator]),ie($e,"chapterDigitShifter",1e3),ie($e,"bookDigitShifter",$e.chapterDigitShifter*$e.chapterDigitShifter),ie($e,"bcvMaxValue",$e.chapterDigitShifter-1),ie($e,"ValidStatusType",vs);class on extends Error{}const Zl=$l.extendTailwindMerge({prefix:"pr-"});function U(...e){return Zl(Te.clsx(e))}const bs=me.Root,ws=me.Trigger,Ql=me.Group,eu=me.Portal,tu=me.Sub,nu=me.RadioGroup,ys=_.forwardRef(({className:e,inset:t,children:n,...r},o)=>b.jsxs(me.SubTrigger,{ref:o,className:U("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,b.jsx(Ye.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));ys.displayName=me.SubTrigger.displayName;const xs=_.forwardRef(({className:e,...t},n)=>b.jsx(me.SubContent,{ref:n,className:U("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));xs.displayName=me.SubContent.displayName;const yo=_.forwardRef(({className:e,sideOffset:t=4,...n},r)=>b.jsx(me.Portal,{children:b.jsx(me.Content,{ref:r,sideOffset:t,className:U("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));yo.displayName=me.Content.displayName;const xo=_.forwardRef(({className:e,inset:t,...n},r)=>b.jsx(me.Item,{ref:r,className:U("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));xo.displayName=me.Item.displayName;const Ss=_.forwardRef(({className:e,children:t,checked:n,...r},o)=>b.jsxs(me.CheckboxItem,{ref:o,className:U("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[b.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:b.jsx(me.ItemIndicator,{children:b.jsx(Ye.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));Ss.displayName=me.CheckboxItem.displayName;const Cs=_.forwardRef(({className:e,children:t,...n},r)=>b.jsxs(me.RadioItem,{ref:r,className:U("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[b.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:b.jsx(me.ItemIndicator,{children:b.jsx(Ye.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));Cs.displayName=me.RadioItem.displayName;const ar=_.forwardRef(({className:e,inset:t,...n},r)=>b.jsx(me.Label,{ref:r,className:U("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));ar.displayName=me.Label.displayName;const So=_.forwardRef(({className:e,...t},n)=>b.jsx(me.Separator,{ref:n,className:U("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));So.displayName=me.Separator.displayName;function Es({className:e,...t}){return b.jsx("span",{className:U("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Es.displayName="DropdownMenuShortcut";const lr=_.forwardRef(({className:e,type:t,...n},r)=>b.jsx("input",{type:t,className:U("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));lr.displayName="Input";const ru=_.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},i)=>b.jsxs("div",{className:"pr-relative",children:[b.jsx(lr,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r(),t(s)},onClick:n,ref:i}),b.jsx(Ye.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function ou({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const i=Array.from({length:t},(a,u)=>u+1),s=_.useCallback(a=>{o(a)},[o]);return b.jsx("div",{className:U("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:i.map(a=>b.jsx("div",{className:U("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":a===n,"pr-bg-amber-200":a===r}),onClick:u=>{u.preventDefault(),u.stopPropagation(),e(a)},role:"button",onKeyDown:u=>{u.key==="Enter"&&e(a)},tabIndex:0,onMouseMove:()=>s(a),children:a},a))})}const iu=_.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:i,children:s},a)=>b.jsxs(xo,{ref:a,textValue:e,className:U("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:u=>{u.preventDefault(),t()},onKeyDown:u=>{o(u)},onFocus:r,onMouseMove:r,children:[b.jsx("span",{className:U("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":i.toLowerCase()==="ot","pr-border-l-purple-200":i.toLowerCase()==="nt","pr-border-l-indigo-200":i.toLowerCase()==="dc"}),children:ue.bookIdToEnglishName(e)}),n&&b.jsx("div",{children:s})]},e));function su({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return b.jsxs(ar,{className:"pr-flex pr-justify-between",children:[b.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),b.jsxs("div",{className:"pr-flex pr-items-center",children:[b.jsx(Ye.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),b.jsx(Ye.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),b.jsx(Ye.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const vn=ue.allBookIds,au={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},fi=["OT","NT","DC"],lu=32+32+32,uu=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],cu=e=>({OT:vn.filter(n=>ue.isBookOT(n)),NT:vn.filter(n=>ue.isBookNT(n)),DC:vn.filter(n=>ue.isBookDC(n))})[e],sn=e=>Ce.getChaptersForBook(ue.bookIdToNumber(e));function du(){return vn.map(t=>ue.bookIdToEnglishName(t))}function pu(e){return du().includes(e)}function fu(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(pu(t))return vn.find(r=>ue.bookIdToEnglishName(r)===t)}function gu({scrRef:e,handleSubmit:t}){const[n,r]=_.useState(""),[o,i]=_.useState(ue.bookNumberToId(e.bookNum)),[s,a]=_.useState(e.chapterNum??0),[u,c]=_.useState(ue.bookNumberToId(e.bookNum)),[d,g]=_.useState(!1),[p,f]=_.useState(d),h=_.useRef(void 0),m=_.useRef(void 0),v=_.useRef(void 0),y=_.useCallback(C=>cu(C).filter(k=>{const N=ue.bookIdToEnglishName(k).toLowerCase(),V=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return N.includes(V)||k.toLowerCase().includes(V)}),[n]),P=C=>{r(C)},x=_.useRef(!1),S=_.useCallback(C=>{if(x.current){x.current=!1;return}g(C)},[]),w=_.useCallback((C,k,N,V)=>{if(a(ue.bookNumberToId(e.bookNum)!==C?1:e.chapterNum),k||sn(C)===-1){t({bookNum:ue.bookIdToNumber(C),chapterNum:N||1,verseNum:V||1}),g(!1),r("");return}i(o!==C?C:""),g(!k)},[t,e.bookNum,e.chapterNum,o]),E=C=>{C<=0||C>sn(o)||w(o,!0,C)},$=_.useCallback(()=>{uu.forEach(C=>{const k=n.match(C);if(k){const[N,V=void 0,L=void 0]=k.slice(1),I=fu(N);(ue.isBookIdValid(N)||I)&&w(I??N,!0,V?parseInt(V,10):1,L?parseInt(L,10):1)}})},[w,n]),j=_.useCallback(C=>{d?(C.key==="ArrowDown"||C.key==="ArrowUp")&&(typeof v<"u"&&v.current!==null?v.current.focus():typeof m<"u"&&m.current!==null&&m.current.focus(),C.preventDefault()):g(!0)},[d]),D=C=>{const{key:k}=C;k==="ArrowRight"||k==="ArrowLeft"||k==="ArrowDown"||k==="ArrowUp"||k==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:k})),h.current.focus())},B=C=>{const{key:k}=C;if(u===o){if(k==="Enter"){C.preventDefault(),w(o,!0,s);return}let N=0;if(k==="ArrowRight")if(s<sn(u))N=1;else{C.preventDefault();return}else if(k==="ArrowLeft")if(s>1)N=-1;else{C.preventDefault();return}else k==="ArrowDown"?N=6:k==="ArrowUp"&&(N=-6);s+N<=0||s+N>sn(u)?a(0):N!==0&&(a(s+N),C.preventDefault())}};return _.useEffect(()=>{o===u?o===ue.bookNumberToId(e.bookNum)?a(e.chapterNum):a(1):a(0)},[u,e.bookNum,e.chapterNum,o]),_.useLayoutEffect(()=>{f(d)},[d]),_.useLayoutEffect(()=>{const C=setTimeout(()=>{if(p&&m.current&&v.current){const N=v.current.offsetTop-lu;m.current.scrollTo({top:N,behavior:"instant"})}},10);return()=>{clearTimeout(C)}},[p]),b.jsx("div",{className:"pr-flex",children:b.jsxs(bs,{modal:!1,open:d,onOpenChange:S,children:[b.jsx(ws,{asChild:!0,children:b.jsx(ru,{ref:h,value:n,handleSearch:P,handleKeyDown:j,handleOnClick:()=>{i(ue.bookNumberToId(e.bookNum)),c(ue.bookNumberToId(e.bookNum)),a(e.chapterNum>0?e.chapterNum:0),g(!0),h.current.focus()},onFocus:()=>{x.current=!0},handleSubmit:$,placeholder:`${ue.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),b.jsxs(yo,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:D,align:"start",ref:m,children:[b.jsx(su,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),fi.map((C,k)=>y(C).length>0&&b.jsxs("div",{children:[b.jsx(ar,{className:"pr-font-semibold pr-text-slate-700",children:au[C]}),y(C).map(N=>b.jsx("div",{children:b.jsx(iu,{bookId:N,handleSelectBook:()=>w(N,!1),isSelected:o===N,handleHighlightBook:()=>c(N),handleKeyDown:B,bookType:C,ref:V=>{o===N&&(v.current=V)},children:b.jsx(ou,{handleSelectChapter:E,endChapter:sn(N),activeChapter:e.bookNum===ue.bookIdToNumber(N)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:V=>{a(V)}})})},N)),fi.length-1!==k?b.jsx(So,{}):void 0]},C))]})]})})}const Rs=ho.cva("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),Ze=_.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},i)=>{const s=r?Ml.Slot:"button";return b.jsx(s,{className:U(Rs({variant:t,size:n,className:e})),ref:i,...o})});Ze.displayName="Button";function Jn({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:s,options:a=[],className:u,value:c,onChange:d,onFocus:g,onBlur:p,getOptionLabel:f}){return b.jsx(we.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:i,options:a,className:`papi-combo-box ${o?"error":""} ${u??""}`,value:c,onChange:d,onFocus:g,onBlur:p,getOptionLabel:f,renderInput:h=>b.jsx(we.TextField,{...h,error:o,fullWidth:i,disabled:n,label:t,style:{width:s}})})}function mu({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,i]=_.useState(1),[s,a]=_.useState(r),[u,c]=_.useState(Array.from({length:r},(p,f)=>f+1));_.useEffect(()=>{i(1),e(1),a(r),t(r),c(Array.from({length:r},(p,f)=>f+1))},[r,t,e]);const d=(p,f)=>{i(f),e(f),f>s&&(a(f),t(f))},g=(p,f)=>{a(f),t(f),f<o&&(i(f),e(f))};return b.jsxs(b.Fragment,{children:[b.jsx(we.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:b.jsx(Jn,{onChange:(p,f)=>d(p,f),className:"book-selection-chapter",isClearable:!1,options:u,getOptionLabel:p=>p.toString(),value:o,isDisabled:n},"start chapter"),label:"Chapters",labelPlacement:"start"}),b.jsx(we.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:b.jsx(Jn,{onChange:(p,f)=>g(p,f),className:"book-selection-chapter",isClearable:!1,options:u,getOptionLabel:p=>p.toString(),value:s,isDisabled:n},"end chapter"),label:"to",labelPlacement:"start"})]})}var Pt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Pt||{});function Co({id:e,isChecked:t,labelText:n="",labelPosition:r=Pt.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:s=!1,hasError:a=!1,className:u,onChange:c}){const d=b.jsx(we.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:s,className:`papi-checkbox ${a?"error":""} ${u??""}`,onChange:c});let g;if(n){const p=r===Pt.Before||r===Pt.Above,f=b.jsx("span",{className:`papi-checkbox-label ${a?"error":""} ${u??""}`,children:n}),h=r===Pt.Before||r===Pt.After,m=h?f:b.jsx("div",{children:f}),v=h?d:b.jsx("div",{children:d});g=b.jsxs(we.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:a,children:[p&&m,v,!p&&m]})}else g=d;return g}function hu({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:i,createLabel:s}){return b.jsxs("fieldset",{id:e,className:t,children:[n&&b.jsx("legend",{children:n}),r.map(a=>b.jsx(Co,{className:"check-item",isChecked:o.includes(a),labelText:s?s(a):a,onChange:()=>i(a)},a))]})}function ge(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function T(){return T=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},T.apply(this,arguments)}function vu(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function bu(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Zr={exports:{}},Vn={exports:{}},ce={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gi;function wu(){if(gi)return ce;gi=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,a=e?Symbol.for("react.context"):60110,u=e?Symbol.for("react.async_mode"):60111,c=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,g=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,f=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,v=e?Symbol.for("react.fundamental"):60117,y=e?Symbol.for("react.responder"):60118,P=e?Symbol.for("react.scope"):60119;function x(w){if(typeof w=="object"&&w!==null){var E=w.$$typeof;switch(E){case t:switch(w=w.type,w){case u:case c:case r:case i:case o:case g:return w;default:switch(w=w&&w.$$typeof,w){case a:case d:case h:case f:case s:return w;default:return E}}case n:return E}}}function S(w){return x(w)===c}return ce.AsyncMode=u,ce.ConcurrentMode=c,ce.ContextConsumer=a,ce.ContextProvider=s,ce.Element=t,ce.ForwardRef=d,ce.Fragment=r,ce.Lazy=h,ce.Memo=f,ce.Portal=n,ce.Profiler=i,ce.StrictMode=o,ce.Suspense=g,ce.isAsyncMode=function(w){return S(w)||x(w)===u},ce.isConcurrentMode=S,ce.isContextConsumer=function(w){return x(w)===a},ce.isContextProvider=function(w){return x(w)===s},ce.isElement=function(w){return typeof w=="object"&&w!==null&&w.$$typeof===t},ce.isForwardRef=function(w){return x(w)===d},ce.isFragment=function(w){return x(w)===r},ce.isLazy=function(w){return x(w)===h},ce.isMemo=function(w){return x(w)===f},ce.isPortal=function(w){return x(w)===n},ce.isProfiler=function(w){return x(w)===i},ce.isStrictMode=function(w){return x(w)===o},ce.isSuspense=function(w){return x(w)===g},ce.isValidElementType=function(w){return typeof w=="string"||typeof w=="function"||w===r||w===c||w===i||w===o||w===g||w===p||typeof w=="object"&&w!==null&&(w.$$typeof===h||w.$$typeof===f||w.$$typeof===s||w.$$typeof===a||w.$$typeof===d||w.$$typeof===v||w.$$typeof===y||w.$$typeof===P||w.$$typeof===m)},ce.typeOf=x,ce}var de={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mi;function yu(){return mi||(mi=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,a=e?Symbol.for("react.context"):60110,u=e?Symbol.for("react.async_mode"):60111,c=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,g=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,f=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,v=e?Symbol.for("react.fundamental"):60117,y=e?Symbol.for("react.responder"):60118,P=e?Symbol.for("react.scope"):60119;function x(A){return typeof A=="string"||typeof A=="function"||A===r||A===c||A===i||A===o||A===g||A===p||typeof A=="object"&&A!==null&&(A.$$typeof===h||A.$$typeof===f||A.$$typeof===s||A.$$typeof===a||A.$$typeof===d||A.$$typeof===v||A.$$typeof===y||A.$$typeof===P||A.$$typeof===m)}function S(A){if(typeof A=="object"&&A!==null){var te=A.$$typeof;switch(te){case t:var M=A.type;switch(M){case u:case c:case r:case i:case o:case g:return M;default:var ae=M&&M.$$typeof;switch(ae){case a:case d:case h:case f:case s:return ae;default:return te}}case n:return te}}}var w=u,E=c,$=a,j=s,D=t,B=d,C=r,k=h,N=f,V=n,L=i,I=o,z=g,re=!1;function ne(A){return re||(re=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),O(A)||S(A)===u}function O(A){return S(A)===c}function F(A){return S(A)===a}function G(A){return S(A)===s}function K(A){return typeof A=="object"&&A!==null&&A.$$typeof===t}function H(A){return S(A)===d}function q(A){return S(A)===r}function X(A){return S(A)===h}function Y(A){return S(A)===f}function W(A){return S(A)===n}function J(A){return S(A)===i}function ee(A){return S(A)===o}function se(A){return S(A)===g}de.AsyncMode=w,de.ConcurrentMode=E,de.ContextConsumer=$,de.ContextProvider=j,de.Element=D,de.ForwardRef=B,de.Fragment=C,de.Lazy=k,de.Memo=N,de.Portal=V,de.Profiler=L,de.StrictMode=I,de.Suspense=z,de.isAsyncMode=ne,de.isConcurrentMode=O,de.isContextConsumer=F,de.isContextProvider=G,de.isElement=K,de.isForwardRef=H,de.isFragment=q,de.isLazy=X,de.isMemo=Y,de.isPortal=W,de.isProfiler=J,de.isStrictMode=ee,de.isSuspense=se,de.isValidElementType=x,de.typeOf=S}()),de}var hi;function ks(){return hi||(hi=1,process.env.NODE_ENV==="production"?Vn.exports=wu():Vn.exports=yu()),Vn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Tr,vi;function xu(){if(vi)return Tr;vi=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var s={},a=0;a<10;a++)s["_"+String.fromCharCode(a)]=a;var u=Object.getOwnPropertyNames(s).map(function(d){return s[d]});if(u.join("")!=="0123456789")return!1;var c={};return"abcdefghijklmnopqrst".split("").forEach(function(d){c[d]=d}),Object.keys(Object.assign({},c)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Tr=o()?Object.assign:function(i,s){for(var a,u=r(i),c,d=1;d<arguments.length;d++){a=Object(arguments[d]);for(var g in a)t.call(a,g)&&(u[g]=a[g]);if(e){c=e(a);for(var p=0;p<c.length;p++)n.call(a,c[p])&&(u[c[p]]=a[c[p]])}}return u},Tr}var Pr,bi;function Eo(){if(bi)return Pr;bi=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Pr=e,Pr}var Or,wi;function Ts(){return wi||(wi=1,Or=Function.call.bind(Object.prototype.hasOwnProperty)),Or}var Nr,yi;function Su(){if(yi)return Nr;yi=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Eo(),n={},r=Ts();e=function(i){var s="Warning: "+i;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(i,s,a,u,c){if(process.env.NODE_ENV!=="production"){for(var d in i)if(r(i,d)){var g;try{if(typeof i[d]!="function"){var p=Error((u||"React class")+": "+a+" type `"+d+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[d]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw p.name="Invariant Violation",p}g=i[d](s,d,u,a,null,t)}catch(h){g=h}if(g&&!(g instanceof Error)&&e((u||"React class")+": type specification of "+a+" `"+d+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof g+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),g instanceof Error&&!(g.message in n)){n[g.message]=!0;var f=c?c():"";e("Failed "+a+" type: "+g.message+(f??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Nr=o,Nr}var _r,xi;function Cu(){if(xi)return _r;xi=1;var e=ks(),t=xu(),n=Eo(),r=Ts(),o=Su(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(a){var u="Warning: "+a;typeof console<"u"&&console.error(u);try{throw new Error(u)}catch{}});function s(){return null}return _r=function(a,u){var c=typeof Symbol=="function"&&Symbol.iterator,d="@@iterator";function g(O){var F=O&&(c&&O[c]||O[d]);if(typeof F=="function")return F}var p="<<anonymous>>",f={array:y("array"),bigint:y("bigint"),bool:y("boolean"),func:y("function"),number:y("number"),object:y("object"),string:y("string"),symbol:y("symbol"),any:P(),arrayOf:x,element:S(),elementType:w(),instanceOf:E,node:B(),objectOf:j,oneOf:$,oneOfType:D,shape:k,exact:N};function h(O,F){return O===F?O!==0||1/O===1/F:O!==O&&F!==F}function m(O,F){this.message=O,this.data=F&&typeof F=="object"?F:{},this.stack=""}m.prototype=Error.prototype;function v(O){if(process.env.NODE_ENV!=="production")var F={},G=0;function K(q,X,Y,W,J,ee,se){if(W=W||p,ee=ee||Y,se!==n){if(u){var A=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw A.name="Invariant Violation",A}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var te=W+":"+Y;!F[te]&&G<3&&(i("You are manually calling a React.PropTypes validation function for the `"+ee+"` prop on `"+W+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),F[te]=!0,G++)}}return X[Y]==null?q?X[Y]===null?new m("The "+J+" `"+ee+"` is marked as required "+("in `"+W+"`, but its value is `null`.")):new m("The "+J+" `"+ee+"` is marked as required in "+("`"+W+"`, but its value is `undefined`.")):null:O(X,Y,W,J,ee)}var H=K.bind(null,!1);return H.isRequired=K.bind(null,!0),H}function y(O){function F(G,K,H,q,X,Y){var W=G[K],J=I(W);if(J!==O){var ee=z(W);return new m("Invalid "+q+" `"+X+"` of type "+("`"+ee+"` supplied to `"+H+"`, expected ")+("`"+O+"`."),{expectedType:O})}return null}return v(F)}function P(){return v(s)}function x(O){function F(G,K,H,q,X){if(typeof O!="function")return new m("Property `"+X+"` of component `"+H+"` has invalid PropType notation inside arrayOf.");var Y=G[K];if(!Array.isArray(Y)){var W=I(Y);return new m("Invalid "+q+" `"+X+"` of type "+("`"+W+"` supplied to `"+H+"`, expected an array."))}for(var J=0;J<Y.length;J++){var ee=O(Y,J,H,q,X+"["+J+"]",n);if(ee instanceof Error)return ee}return null}return v(F)}function S(){function O(F,G,K,H,q){var X=F[G];if(!a(X)){var Y=I(X);return new m("Invalid "+H+" `"+q+"` of type "+("`"+Y+"` supplied to `"+K+"`, expected a single ReactElement."))}return null}return v(O)}function w(){function O(F,G,K,H,q){var X=F[G];if(!e.isValidElementType(X)){var Y=I(X);return new m("Invalid "+H+" `"+q+"` of type "+("`"+Y+"` supplied to `"+K+"`, expected a single ReactElement type."))}return null}return v(O)}function E(O){function F(G,K,H,q,X){if(!(G[K]instanceof O)){var Y=O.name||p,W=ne(G[K]);return new m("Invalid "+q+" `"+X+"` of type "+("`"+W+"` supplied to `"+H+"`, expected ")+("instance of `"+Y+"`."))}return null}return v(F)}function $(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),s;function F(G,K,H,q,X){for(var Y=G[K],W=0;W<O.length;W++)if(h(Y,O[W]))return null;var J=JSON.stringify(O,function(se,A){var te=z(A);return te==="symbol"?String(A):A});return new m("Invalid "+q+" `"+X+"` of value `"+String(Y)+"` "+("supplied to `"+H+"`, expected one of "+J+"."))}return v(F)}function j(O){function F(G,K,H,q,X){if(typeof O!="function")return new m("Property `"+X+"` of component `"+H+"` has invalid PropType notation inside objectOf.");var Y=G[K],W=I(Y);if(W!=="object")return new m("Invalid "+q+" `"+X+"` of type "+("`"+W+"` supplied to `"+H+"`, expected an object."));for(var J in Y)if(r(Y,J)){var ee=O(Y,J,H,q,X+"."+J,n);if(ee instanceof Error)return ee}return null}return v(F)}function D(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var F=0;F<O.length;F++){var G=O[F];if(typeof G!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+re(G)+" at index "+F+"."),s}function K(H,q,X,Y,W){for(var J=[],ee=0;ee<O.length;ee++){var se=O[ee],A=se(H,q,X,Y,W,n);if(A==null)return null;A.data&&r(A.data,"expectedType")&&J.push(A.data.expectedType)}var te=J.length>0?", expected one of type ["+J.join(", ")+"]":"";return new m("Invalid "+Y+" `"+W+"` supplied to "+("`"+X+"`"+te+"."))}return v(K)}function B(){function O(F,G,K,H,q){return V(F[G])?null:new m("Invalid "+H+" `"+q+"` supplied to "+("`"+K+"`, expected a ReactNode."))}return v(O)}function C(O,F,G,K,H){return new m((O||"React class")+": "+F+" type `"+G+"."+K+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+H+"`.")}function k(O){function F(G,K,H,q,X){var Y=G[K],W=I(Y);if(W!=="object")return new m("Invalid "+q+" `"+X+"` of type `"+W+"` "+("supplied to `"+H+"`, expected `object`."));for(var J in O){var ee=O[J];if(typeof ee!="function")return C(H,q,X,J,z(ee));var se=ee(Y,J,H,q,X+"."+J,n);if(se)return se}return null}return v(F)}function N(O){function F(G,K,H,q,X){var Y=G[K],W=I(Y);if(W!=="object")return new m("Invalid "+q+" `"+X+"` of type `"+W+"` "+("supplied to `"+H+"`, expected `object`."));var J=t({},G[K],O);for(var ee in J){var se=O[ee];if(r(O,ee)&&typeof se!="function")return C(H,q,X,ee,z(se));if(!se)return new m("Invalid "+q+" `"+X+"` key `"+ee+"` supplied to `"+H+"`.\nBad object: "+JSON.stringify(G[K],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(O),null,"  "));var A=se(Y,ee,H,q,X+"."+ee,n);if(A)return A}return null}return v(F)}function V(O){switch(typeof O){case"number":case"string":case"undefined":return!0;case"boolean":return!O;case"object":if(Array.isArray(O))return O.every(V);if(O===null||a(O))return!0;var F=g(O);if(F){var G=F.call(O),K;if(F!==O.entries){for(;!(K=G.next()).done;)if(!V(K.value))return!1}else for(;!(K=G.next()).done;){var H=K.value;if(H&&!V(H[1]))return!1}}else return!1;return!0;default:return!1}}function L(O,F){return O==="symbol"?!0:F?F["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&F instanceof Symbol:!1}function I(O){var F=typeof O;return Array.isArray(O)?"array":O instanceof RegExp?"object":L(F,O)?"symbol":F}function z(O){if(typeof O>"u"||O===null)return""+O;var F=I(O);if(F==="object"){if(O instanceof Date)return"date";if(O instanceof RegExp)return"regexp"}return F}function re(O){var F=z(O);switch(F){case"array":case"object":return"an "+F;case"boolean":case"date":case"regexp":return"a "+F;default:return F}}function ne(O){return!O.constructor||!O.constructor.name?p:O.constructor.name}return f.checkPropTypes=o,f.resetWarningCache=o.resetWarningCache,f.PropTypes=f,f},_r}var $r,Si;function Eu(){if(Si)return $r;Si=1;var e=Eo();function t(){}function n(){}return n.resetWarningCache=t,$r=function(){function r(s,a,u,c,d,g){if(g!==e){var p=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw p.name="Invariant Violation",p}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},$r}if(process.env.NODE_ENV!=="production"){var Ru=ks(),ku=!0;Zr.exports=Cu()(Ru.isElement,ku)}else Zr.exports=Eu()();var Tu=Zr.exports;const l=vu(Tu);function Zt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function Ot(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Ps(e){if(!Ot(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Ps(e[n])}),t}function at(e,t,n={clone:!0}){const r=n.clone?T({},e):e;return Ot(e)&&Ot(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Ot(t[o])&&o in e&&Ot(e[o])?r[o]=at(e[o],t[o],n):n.clone?r[o]=Ot(t[o])?Ps(t[o]):t[o]:r[o]=t[o])}),r}function Pu(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Os(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let a;const u=i.type;return typeof u=="function"&&!Pu(u)&&(a="Did you accidentally use a plain function component for an element instead?"),a!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ns=Zt(l.element,Os);Ns.isRequired=Zt(l.element.isRequired,Os);const On=Ns;function Ou(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Nu(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let a;return typeof i=="function"&&!Ou(i)&&(a="Did you accidentally provide a plain function component instead?"),a!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const _u=Zt(l.elementType,Nu),$u="exact-prop: ​";function _s(e){return process.env.NODE_ENV==="production"?e:T({},e,{[$u]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Ut(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Qr={exports:{}},pe={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ci;function Mu(){if(Ci)return pe;Ci=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),a=Symbol.for("react.server_context"),u=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),g=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),f=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function m(v){if(typeof v=="object"&&v!==null){var y=v.$$typeof;switch(y){case e:switch(v=v.type,v){case n:case o:case r:case c:case d:return v;default:switch(v=v&&v.$$typeof,v){case a:case s:case u:case p:case g:case i:return v;default:return y}}case t:return y}}}return pe.ContextConsumer=s,pe.ContextProvider=i,pe.Element=e,pe.ForwardRef=u,pe.Fragment=n,pe.Lazy=p,pe.Memo=g,pe.Portal=t,pe.Profiler=o,pe.StrictMode=r,pe.Suspense=c,pe.SuspenseList=d,pe.isAsyncMode=function(){return!1},pe.isConcurrentMode=function(){return!1},pe.isContextConsumer=function(v){return m(v)===s},pe.isContextProvider=function(v){return m(v)===i},pe.isElement=function(v){return typeof v=="object"&&v!==null&&v.$$typeof===e},pe.isForwardRef=function(v){return m(v)===u},pe.isFragment=function(v){return m(v)===n},pe.isLazy=function(v){return m(v)===p},pe.isMemo=function(v){return m(v)===g},pe.isPortal=function(v){return m(v)===t},pe.isProfiler=function(v){return m(v)===o},pe.isStrictMode=function(v){return m(v)===r},pe.isSuspense=function(v){return m(v)===c},pe.isSuspenseList=function(v){return m(v)===d},pe.isValidElementType=function(v){return typeof v=="string"||typeof v=="function"||v===n||v===o||v===r||v===c||v===d||v===f||typeof v=="object"&&v!==null&&(v.$$typeof===p||v.$$typeof===g||v.$$typeof===i||v.$$typeof===s||v.$$typeof===u||v.$$typeof===h||v.getModuleId!==void 0)},pe.typeOf=m,pe}var fe={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ei;function Iu(){return Ei||(Ei=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),a=Symbol.for("react.server_context"),u=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),g=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),f=Symbol.for("react.offscreen"),h=!1,m=!1,v=!1,y=!1,P=!1,x;x=Symbol.for("react.module.reference");function S(M){return!!(typeof M=="string"||typeof M=="function"||M===n||M===o||P||M===r||M===c||M===d||y||M===f||h||m||v||typeof M=="object"&&M!==null&&(M.$$typeof===p||M.$$typeof===g||M.$$typeof===i||M.$$typeof===s||M.$$typeof===u||M.$$typeof===x||M.getModuleId!==void 0))}function w(M){if(typeof M=="object"&&M!==null){var ae=M.$$typeof;switch(ae){case e:var Ee=M.type;switch(Ee){case n:case o:case r:case c:case d:return Ee;default:var Ne=Ee&&Ee.$$typeof;switch(Ne){case a:case s:case u:case p:case g:case i:return Ne;default:return ae}}case t:return ae}}}var E=s,$=i,j=e,D=u,B=n,C=p,k=g,N=t,V=o,L=r,I=c,z=d,re=!1,ne=!1;function O(M){return re||(re=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function F(M){return ne||(ne=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function G(M){return w(M)===s}function K(M){return w(M)===i}function H(M){return typeof M=="object"&&M!==null&&M.$$typeof===e}function q(M){return w(M)===u}function X(M){return w(M)===n}function Y(M){return w(M)===p}function W(M){return w(M)===g}function J(M){return w(M)===t}function ee(M){return w(M)===o}function se(M){return w(M)===r}function A(M){return w(M)===c}function te(M){return w(M)===d}fe.ContextConsumer=E,fe.ContextProvider=$,fe.Element=j,fe.ForwardRef=D,fe.Fragment=B,fe.Lazy=C,fe.Memo=k,fe.Portal=N,fe.Profiler=V,fe.StrictMode=L,fe.Suspense=I,fe.SuspenseList=z,fe.isAsyncMode=O,fe.isConcurrentMode=F,fe.isContextConsumer=G,fe.isContextProvider=K,fe.isElement=H,fe.isForwardRef=q,fe.isFragment=X,fe.isLazy=Y,fe.isMemo=W,fe.isPortal=J,fe.isProfiler=ee,fe.isStrictMode=se,fe.isSuspense=A,fe.isSuspenseList=te,fe.isValidElementType=S,fe.typeOf=w}()),fe}process.env.NODE_ENV==="production"?Qr.exports=Mu():Qr.exports=Iu();var Zn=Qr.exports;const ju=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Du(e){const t=`${e}`.match(ju);return t&&t[1]||""}function $s(e,t=""){return e.displayName||e.name||Du(e)||t}function Ri(e,t,n){const r=$s(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Au(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return $s(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Zn.ForwardRef:return Ri(e,e.render,"ForwardRef");case Zn.Memo:return Ri(e,e.type,"memo");default:return}}}function lt(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],s=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Fu=l.oneOfType([l.func,l.object]),Ro=Fu;function et(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Ut(7));return e.charAt(0).toUpperCase()+e.slice(1)}function eo(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Ms(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function Vu(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,s)=>{const a=o||"<<anonymous>>",u=s||r;return typeof n[r]<"u"?new Error(`The ${i} \`${u}\` of \`${a}\` is deprecated. ${t}`):null}}function Lu(e,t){var n,r;return R.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Pe(e){return e&&e.ownerDocument||document}function qt(e){return Pe(e).defaultView||window}function Bu(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?T({},t.propTypes):null;return o=>(i,s,a,u,c,...d)=>{const g=c||s,p=n==null?void 0:n[g];if(p){const f=p(i,s,a,u,c,...d);if(f)return f}return typeof i[s]<"u"&&!i[o]?new Error(`The prop \`${g}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Qn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const zu=typeof window<"u"?R.useLayoutEffect:R.useEffect,$t=zu;let ki=0;function Hu(e){const[t,n]=R.useState(e),r=e||t;return R.useEffect(()=>{t==null&&(ki+=1,n(`mui-${ki}`))},[t]),r}const Ti=R["useId".toString()];function Is(e){if(Ti!==void 0){const t=Ti();return e??t}return Hu(e)}function Gu(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function js({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=R.useRef(e!==void 0),[i,s]=R.useState(t),a=o?e:i;if(process.env.NODE_ENV!=="production"){R.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:c}=R.useRef(t);R.useEffect(()=>{!o&&c!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const u=R.useCallback(c=>{o||s(c)},[]);return[a,u]}function Cn(e){const t=R.useRef(e);return $t(()=>{t.current=e}),R.useRef((...n)=>(0,t.current)(...n)).current}function Ue(...e){return R.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Qn(n,t)})},e)}const Pi={};function Uu(e,t){const n=R.useRef(Pi);return n.current===Pi&&(n.current=e(t)),n}const qu=[];function Wu(e){R.useEffect(e,qu)}class Nn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Nn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function gn(){const e=Uu(Nn.create).current;return Wu(e.disposeEffect),e}let ur=!0,to=!1;const Xu=new Nn,Yu={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Ku(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Yu[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Ju(e){e.metaKey||e.altKey||e.ctrlKey||(ur=!0)}function Mr(){ur=!1}function Zu(){this.visibilityState==="hidden"&&to&&(ur=!0)}function Qu(e){e.addEventListener("keydown",Ju,!0),e.addEventListener("mousedown",Mr,!0),e.addEventListener("pointerdown",Mr,!0),e.addEventListener("touchstart",Mr,!0),e.addEventListener("visibilitychange",Zu,!0)}function ec(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return ur||Ku(t)}function Ds(){const e=R.useCallback(o=>{o!=null&&Qu(o.ownerDocument)},[]),t=R.useRef(!1);function n(){return t.current?(to=!0,Xu.start(100,()=>{to=!1}),t.current=!1,!0):!1}function r(o){return ec(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function As(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function tc(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function nc(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const rc=Number.isInteger||nc;function Fs(e,t,n,r){const o=e[t];if(o==null||!rc(o)){const i=tc(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function Vs(e,t,...n){return e[t]===void 0?null:Fs(e,t,...n)}function no(){return null}Vs.isRequired=Fs;no.isRequired=no;const Ls=process.env.NODE_ENV==="production"?no:Vs;function Bs(e,t){const n=T({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=T({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=T({},i),Object.keys(o).forEach(s=>{n[r][s]=Bs(o[s],i[s])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function dt(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,s)=>{if(s){const a=t(s);a!==""&&i.push(a),n&&n[s]&&i.push(n[s])}return i},[]).join(" ")}),r}const Oi=e=>e,oc=()=>{let e=Oi;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Oi}}},ic=oc(),zs=ic,Hs={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function nt(e,t,n="Mui"){const r=Hs[t];return r?`${n}-${r}`:`${zs.generate(e)}-${t}`}function wt(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=nt(e,o,n)}),r}function sc(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Gs(e){return typeof e=="string"}function mn(e,t,n){return e===void 0||Gs(e)?t:T({},t,{ownerState:T({},t.ownerState,n)})}const ac={disableDefaultClasses:!1},lc=R.createContext(ac);function uc(e){const{disableDefaultClasses:t}=R.useContext(lc);return n=>t?"":e(n)}function Us(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function cc(e,t,n){return typeof e=="function"?e(t,n):e}function Ni(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function dc(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const f=Te(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),h=T({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),m=T({},n,o,r);return f.length>0&&(m.className=f),Object.keys(h).length>0&&(m.style=h),{props:m,internalRef:void 0}}const s=Us(T({},o,r)),a=Ni(r),u=Ni(o),c=t(s),d=Te(c==null?void 0:c.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),g=T({},c==null?void 0:c.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),p=T({},c,n,u,a);return d.length>0&&(p.className=d),Object.keys(g).length>0&&(p.style=g),{props:p,internalRef:c.ref}}const pc=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Mt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,s=ge(e,pc),a=i?{}:cc(r,o),{props:u,internalRef:c}=dc(T({},s,{externalSlotProps:a})),d=Ue(c,a==null?void 0:a.ref,(t=e.additionalProps)==null?void 0:t.ref);return mn(n,T({},u,{ref:d}),o)}const qs="base";function fc(e){return`${qs}--${e}`}function gc(e,t){return`${qs}-${e}-${t}`}function Ws(e,t){const n=Hs[t];return n?fc(n):gc(e,t)}function mc(e,t){const n={};return t.forEach(r=>{n[r]=Ws(e,r)}),n}const hc=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function vc(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function bc(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function wc(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||bc(e))}function yc(e){const t=[],n=[];return Array.from(e.querySelectorAll(hc)).forEach((r,o)=>{const i=vc(r);i===-1||!wc(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function xc(){return!0}function er(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=yc,isEnabled:s=xc,open:a}=e,u=R.useRef(!1),c=R.useRef(null),d=R.useRef(null),g=R.useRef(null),p=R.useRef(null),f=R.useRef(!1),h=R.useRef(null),m=Ue(t.ref,h),v=R.useRef(null);R.useEffect(()=>{!a||!h.current||(f.current=!n)},[n,a]),R.useEffect(()=>{if(!a||!h.current)return;const x=Pe(h.current);return h.current.contains(x.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),f.current&&h.current.focus()),()=>{o||(g.current&&g.current.focus&&(u.current=!0,g.current.focus()),g.current=null)}},[a]),R.useEffect(()=>{if(!a||!h.current)return;const x=Pe(h.current),S=$=>{v.current=$,!(r||!s()||$.key!=="Tab")&&x.activeElement===h.current&&$.shiftKey&&(u.current=!0,d.current&&d.current.focus())},w=()=>{const $=h.current;if($===null)return;if(!x.hasFocus()||!s()||u.current){u.current=!1;return}if($.contains(x.activeElement)||r&&x.activeElement!==c.current&&x.activeElement!==d.current)return;if(x.activeElement!==p.current)p.current=null;else if(p.current!==null)return;if(!f.current)return;let j=[];if((x.activeElement===c.current||x.activeElement===d.current)&&(j=i(h.current)),j.length>0){var D,B;const C=!!((D=v.current)!=null&&D.shiftKey&&((B=v.current)==null?void 0:B.key)==="Tab"),k=j[0],N=j[j.length-1];typeof k!="string"&&typeof N!="string"&&(C?N.focus():k.focus())}else $.focus()};x.addEventListener("focusin",w),x.addEventListener("keydown",S,!0);const E=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&w()},50);return()=>{clearInterval(E),x.removeEventListener("focusin",w),x.removeEventListener("keydown",S,!0)}},[n,r,o,s,a,i]);const y=x=>{g.current===null&&(g.current=x.relatedTarget),f.current=!0,p.current=x.target;const S=t.props.onFocus;S&&S(x)},P=x=>{g.current===null&&(g.current=x.relatedTarget),f.current=!0};return b.jsxs(R.Fragment,{children:[b.jsx("div",{tabIndex:a?0:-1,onFocus:P,ref:c,"data-testid":"sentinelStart"}),R.cloneElement(t,{ref:m,onFocus:y}),b.jsx("div",{tabIndex:a?0:-1,onFocus:P,ref:d,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(er.propTypes={children:On,disableAutoFocus:l.bool,disableEnforceFocus:l.bool,disableRestoreFocus:l.bool,getTabbable:l.func,isEnabled:l.func,open:l.bool.isRequired});process.env.NODE_ENV!=="production"&&(er["propTypes"]=_s(er.propTypes));function Sc(e){return typeof e=="function"?e():e}const En=R.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[s,a]=R.useState(null),u=Ue(R.isValidElement(r)?r.ref:null,n);if($t(()=>{i||a(Sc(o)||document.body)},[o,i]),$t(()=>{if(s&&!i)return Qn(n,s),()=>{Qn(n,null)}},[n,s,i]),i){if(R.isValidElement(r)){const c={ref:u};return R.cloneElement(r,c)}return b.jsx(R.Fragment,{children:r})}return b.jsx(R.Fragment,{children:s&&Vl.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&(En.propTypes={children:l.node,container:l.oneOfType([lt,l.func]),disablePortal:l.bool});process.env.NODE_ENV!=="production"&&(En["propTypes"]=_s(En.propTypes));function Cc(e){const t=Pe(e);return t.body===e?qt(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function bn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function _i(e){return parseInt(qt(e).getComputedStyle(e).paddingRight,10)||0}function Ec(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function $i(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,s=>{const a=i.indexOf(s)===-1,u=!Ec(s);a&&u&&bn(s,o)})}function Ir(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function Rc(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(Cc(r)){const s=As(Pe(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${_i(r)+s}px`;const a=Pe(r).querySelectorAll(".mui-fixed");[].forEach.call(a,u=>{n.push({value:u.style.paddingRight,property:"padding-right",el:u}),u.style.paddingRight=`${_i(u)+s}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=Pe(r).body;else{const s=r.parentElement,a=qt(r);i=(s==null?void 0:s.nodeName)==="HTML"&&a.getComputedStyle(s).overflowY==="scroll"?s:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:s,property:a})=>{i?s.style.setProperty(a,i):s.style.removeProperty(a)})}}function kc(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class Tc{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&bn(t.modalRef,!1);const o=kc(n);$i(n,t.mount,t.modalRef,o,!0);const i=Ir(this.containers,s=>s.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=Ir(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=Rc(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=Ir(this.containers,s=>s.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&bn(t.modalRef,n),$i(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=i.modals[i.modals.length-1];s.modalRef&&bn(s.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Pc(e){return typeof e=="function"?e():e}function Oc(e){return e?e.props.hasOwnProperty("in"):!1}const Nc=new Tc;function _c(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Nc,closeAfterTransition:i=!1,onTransitionEnter:s,onTransitionExited:a,children:u,onClose:c,open:d,rootRef:g}=e,p=R.useRef({}),f=R.useRef(null),h=R.useRef(null),m=Ue(h,g),[v,y]=R.useState(!d),P=Oc(u);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const S=()=>Pe(f.current),w=()=>(p.current.modalRef=h.current,p.current.mount=f.current,p.current),E=()=>{o.mount(w(),{disableScrollLock:r}),h.current&&(h.current.scrollTop=0)},$=Cn(()=>{const I=Pc(t)||S().body;o.add(w(),I),h.current&&E()}),j=R.useCallback(()=>o.isTopModal(w()),[o]),D=Cn(I=>{f.current=I,I&&(d&&j()?E():h.current&&bn(h.current,x))}),B=R.useCallback(()=>{o.remove(w(),x)},[x,o]);R.useEffect(()=>()=>{B()},[B]),R.useEffect(()=>{d?$():(!P||!i)&&B()},[d,B,P,i,$]);const C=I=>z=>{var re;(re=I.onKeyDown)==null||re.call(I,z),!(z.key!=="Escape"||z.which===229||!j())&&(n||(z.stopPropagation(),c&&c(z,"escapeKeyDown")))},k=I=>z=>{var re;(re=I.onClick)==null||re.call(I,z),z.target===z.currentTarget&&c&&c(z,"backdropClick")};return{getRootProps:(I={})=>{const z=Us(e);delete z.onTransitionEnter,delete z.onTransitionExited;const re=T({},z,I);return T({role:"presentation"},re,{onKeyDown:C(re),ref:m})},getBackdropProps:(I={})=>{const z=I;return T({"aria-hidden":!0},z,{onClick:k(z),open:d})},getTransitionProps:()=>{const I=()=>{y(!1),s&&s()},z=()=>{y(!0),a&&a(),i&&B()};return{onEnter:eo(I,u==null?void 0:u.props.onEnter),onExited:eo(z,u==null?void 0:u.props.onExited)}},rootRef:m,portalRef:D,isTopModal:j,exited:v,hasTransition:P}}var Me="top",qe="bottom",We="right",Ie="left",ko="auto",_n=[Me,qe,We,Ie],Wt="start",Rn="end",$c="clippingParents",Xs="viewport",an="popper",Mc="reference",Mi=_n.reduce(function(e,t){return e.concat([t+"-"+Wt,t+"-"+Rn])},[]),Ys=[].concat(_n,[ko]).reduce(function(e,t){return e.concat([t,t+"-"+Wt,t+"-"+Rn])},[]),Ic="beforeRead",jc="read",Dc="afterRead",Ac="beforeMain",Fc="main",Vc="afterMain",Lc="beforeWrite",Bc="write",zc="afterWrite",Hc=[Ic,jc,Dc,Ac,Fc,Vc,Lc,Bc,zc];function tt(e){return e?(e.nodeName||"").toLowerCase():null}function Le(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function It(e){var t=Le(e).Element;return e instanceof t||e instanceof Element}function Ge(e){var t=Le(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function To(e){if(typeof ShadowRoot>"u")return!1;var t=Le(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Gc(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!Ge(i)||!tt(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(s){var a=o[s];a===!1?i.removeAttribute(s):i.setAttribute(s,a===!0?"":a)}))})}function Uc(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},s=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),a=s.reduce(function(u,c){return u[c]="",u},{});!Ge(o)||!tt(o)||(Object.assign(o.style,a),Object.keys(i).forEach(function(u){o.removeAttribute(u)}))})}}const qc={name:"applyStyles",enabled:!0,phase:"write",fn:Gc,effect:Uc,requires:["computeStyles"]};function Qe(e){return e.split("-")[0]}var Nt=Math.max,tr=Math.min,Xt=Math.round;function ro(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ks(){return!/^((?!chrome|android).)*safari/i.test(ro())}function Yt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&Ge(e)&&(o=e.offsetWidth>0&&Xt(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&Xt(r.height)/e.offsetHeight||1);var s=It(e)?Le(e):window,a=s.visualViewport,u=!Ks()&&n,c=(r.left+(u&&a?a.offsetLeft:0))/o,d=(r.top+(u&&a?a.offsetTop:0))/i,g=r.width/o,p=r.height/i;return{width:g,height:p,top:d,right:c+g,bottom:d+p,left:c,x:c,y:d}}function Po(e){var t=Yt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Js(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&To(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function ut(e){return Le(e).getComputedStyle(e)}function Wc(e){return["table","td","th"].indexOf(tt(e))>=0}function yt(e){return((It(e)?e.ownerDocument:e.document)||window.document).documentElement}function cr(e){return tt(e)==="html"?e:e.assignedSlot||e.parentNode||(To(e)?e.host:null)||yt(e)}function Ii(e){return!Ge(e)||ut(e).position==="fixed"?null:e.offsetParent}function Xc(e){var t=/firefox/i.test(ro()),n=/Trident/i.test(ro());if(n&&Ge(e)){var r=ut(e);if(r.position==="fixed")return null}var o=cr(e);for(To(o)&&(o=o.host);Ge(o)&&["html","body"].indexOf(tt(o))<0;){var i=ut(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function $n(e){for(var t=Le(e),n=Ii(e);n&&Wc(n)&&ut(n).position==="static";)n=Ii(n);return n&&(tt(n)==="html"||tt(n)==="body"&&ut(n).position==="static")?t:n||Xc(e)||t}function Oo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function wn(e,t,n){return Nt(e,tr(t,n))}function Yc(e,t,n){var r=wn(e,t,n);return r>n?n:r}function Zs(){return{top:0,right:0,bottom:0,left:0}}function Qs(e){return Object.assign({},Zs(),e)}function ea(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Kc=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Qs(typeof t!="number"?t:ea(t,_n))};function Jc(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,s=n.modifiersData.popperOffsets,a=Qe(n.placement),u=Oo(a),c=[Ie,We].indexOf(a)>=0,d=c?"height":"width";if(!(!i||!s)){var g=Kc(o.padding,n),p=Po(i),f=u==="y"?Me:Ie,h=u==="y"?qe:We,m=n.rects.reference[d]+n.rects.reference[u]-s[u]-n.rects.popper[d],v=s[u]-n.rects.reference[u],y=$n(i),P=y?u==="y"?y.clientHeight||0:y.clientWidth||0:0,x=m/2-v/2,S=g[f],w=P-p[d]-g[h],E=P/2-p[d]/2+x,$=wn(S,E,w),j=u;n.modifiersData[r]=(t={},t[j]=$,t.centerOffset=$-E,t)}}function Zc(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Js(t.elements.popper,o)&&(t.elements.arrow=o))}const Qc={name:"arrow",enabled:!0,phase:"main",fn:Jc,effect:Zc,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Kt(e){return e.split("-")[1]}var ed={top:"auto",right:"auto",bottom:"auto",left:"auto"};function td(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Xt(n*o)/o||0,y:Xt(r*o)/o||0}}function ji(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,s=e.offsets,a=e.position,u=e.gpuAcceleration,c=e.adaptive,d=e.roundOffsets,g=e.isFixed,p=s.x,f=p===void 0?0:p,h=s.y,m=h===void 0?0:h,v=typeof d=="function"?d({x:f,y:m}):{x:f,y:m};f=v.x,m=v.y;var y=s.hasOwnProperty("x"),P=s.hasOwnProperty("y"),x=Ie,S=Me,w=window;if(c){var E=$n(n),$="clientHeight",j="clientWidth";if(E===Le(n)&&(E=yt(n),ut(E).position!=="static"&&a==="absolute"&&($="scrollHeight",j="scrollWidth")),E=E,o===Me||(o===Ie||o===We)&&i===Rn){S=qe;var D=g&&E===w&&w.visualViewport?w.visualViewport.height:E[$];m-=D-r.height,m*=u?1:-1}if(o===Ie||(o===Me||o===qe)&&i===Rn){x=We;var B=g&&E===w&&w.visualViewport?w.visualViewport.width:E[j];f-=B-r.width,f*=u?1:-1}}var C=Object.assign({position:a},c&&ed),k=d===!0?td({x:f,y:m},Le(n)):{x:f,y:m};if(f=k.x,m=k.y,u){var N;return Object.assign({},C,(N={},N[S]=P?"0":"",N[x]=y?"0":"",N.transform=(w.devicePixelRatio||1)<=1?"translate("+f+"px, "+m+"px)":"translate3d("+f+"px, "+m+"px, 0)",N))}return Object.assign({},C,(t={},t[S]=P?m+"px":"",t[x]=y?f+"px":"",t.transform="",t))}function nd(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,s=i===void 0?!0:i,a=n.roundOffsets,u=a===void 0?!0:a,c={placement:Qe(t.placement),variation:Kt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,ji(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:u})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,ji(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:u})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const rd={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:nd,data:{}};var Ln={passive:!0};function od(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,s=r.resize,a=s===void 0?!0:s,u=Le(t.elements.popper),c=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&c.forEach(function(d){d.addEventListener("scroll",n.update,Ln)}),a&&u.addEventListener("resize",n.update,Ln),function(){i&&c.forEach(function(d){d.removeEventListener("scroll",n.update,Ln)}),a&&u.removeEventListener("resize",n.update,Ln)}}const id={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:od,data:{}};var sd={left:"right",right:"left",bottom:"top",top:"bottom"};function Wn(e){return e.replace(/left|right|bottom|top/g,function(t){return sd[t]})}var ad={start:"end",end:"start"};function Di(e){return e.replace(/start|end/g,function(t){return ad[t]})}function No(e){var t=Le(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function _o(e){return Yt(yt(e)).left+No(e).scrollLeft}function ld(e,t){var n=Le(e),r=yt(e),o=n.visualViewport,i=r.clientWidth,s=r.clientHeight,a=0,u=0;if(o){i=o.width,s=o.height;var c=Ks();(c||!c&&t==="fixed")&&(a=o.offsetLeft,u=o.offsetTop)}return{width:i,height:s,x:a+_o(e),y:u}}function ud(e){var t,n=yt(e),r=No(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=Nt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=Nt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),a=-r.scrollLeft+_o(e),u=-r.scrollTop;return ut(o||n).direction==="rtl"&&(a+=Nt(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:s,x:a,y:u}}function $o(e){var t=ut(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function ta(e){return["html","body","#document"].indexOf(tt(e))>=0?e.ownerDocument.body:Ge(e)&&$o(e)?e:ta(cr(e))}function yn(e,t){var n;t===void 0&&(t=[]);var r=ta(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=Le(r),s=o?[i].concat(i.visualViewport||[],$o(r)?r:[]):r,a=t.concat(s);return o?a:a.concat(yn(cr(s)))}function oo(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function cd(e,t){var n=Yt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Ai(e,t,n){return t===Xs?oo(ld(e,n)):It(t)?cd(t,n):oo(ud(yt(e)))}function dd(e){var t=yn(cr(e)),n=["absolute","fixed"].indexOf(ut(e).position)>=0,r=n&&Ge(e)?$n(e):e;return It(r)?t.filter(function(o){return It(o)&&Js(o,r)&&tt(o)!=="body"}):[]}function pd(e,t,n,r){var o=t==="clippingParents"?dd(e):[].concat(t),i=[].concat(o,[n]),s=i[0],a=i.reduce(function(u,c){var d=Ai(e,c,r);return u.top=Nt(d.top,u.top),u.right=tr(d.right,u.right),u.bottom=tr(d.bottom,u.bottom),u.left=Nt(d.left,u.left),u},Ai(e,s,r));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function na(e){var t=e.reference,n=e.element,r=e.placement,o=r?Qe(r):null,i=r?Kt(r):null,s=t.x+t.width/2-n.width/2,a=t.y+t.height/2-n.height/2,u;switch(o){case Me:u={x:s,y:t.y-n.height};break;case qe:u={x:s,y:t.y+t.height};break;case We:u={x:t.x+t.width,y:a};break;case Ie:u={x:t.x-n.width,y:a};break;default:u={x:t.x,y:t.y}}var c=o?Oo(o):null;if(c!=null){var d=c==="y"?"height":"width";switch(i){case Wt:u[c]=u[c]-(t[d]/2-n[d]/2);break;case Rn:u[c]=u[c]+(t[d]/2-n[d]/2);break}}return u}function kn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,s=i===void 0?e.strategy:i,a=n.boundary,u=a===void 0?$c:a,c=n.rootBoundary,d=c===void 0?Xs:c,g=n.elementContext,p=g===void 0?an:g,f=n.altBoundary,h=f===void 0?!1:f,m=n.padding,v=m===void 0?0:m,y=Qs(typeof v!="number"?v:ea(v,_n)),P=p===an?Mc:an,x=e.rects.popper,S=e.elements[h?P:p],w=pd(It(S)?S:S.contextElement||yt(e.elements.popper),u,d,s),E=Yt(e.elements.reference),$=na({reference:E,element:x,strategy:"absolute",placement:o}),j=oo(Object.assign({},x,$)),D=p===an?j:E,B={top:w.top-D.top+y.top,bottom:D.bottom-w.bottom+y.bottom,left:w.left-D.left+y.left,right:D.right-w.right+y.right},C=e.modifiersData.offset;if(p===an&&C){var k=C[o];Object.keys(B).forEach(function(N){var V=[We,qe].indexOf(N)>=0?1:-1,L=[Me,qe].indexOf(N)>=0?"y":"x";B[N]+=k[L]*V})}return B}function fd(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,s=n.padding,a=n.flipVariations,u=n.allowedAutoPlacements,c=u===void 0?Ys:u,d=Kt(r),g=d?a?Mi:Mi.filter(function(h){return Kt(h)===d}):_n,p=g.filter(function(h){return c.indexOf(h)>=0});p.length===0&&(p=g);var f=p.reduce(function(h,m){return h[m]=kn(e,{placement:m,boundary:o,rootBoundary:i,padding:s})[Qe(m)],h},{});return Object.keys(f).sort(function(h,m){return f[h]-f[m]})}function gd(e){if(Qe(e)===ko)return[];var t=Wn(e);return[Di(e),t,Di(t)]}function md(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,a=s===void 0?!0:s,u=n.fallbackPlacements,c=n.padding,d=n.boundary,g=n.rootBoundary,p=n.altBoundary,f=n.flipVariations,h=f===void 0?!0:f,m=n.allowedAutoPlacements,v=t.options.placement,y=Qe(v),P=y===v,x=u||(P||!h?[Wn(v)]:gd(v)),S=[v].concat(x).reduce(function(H,q){return H.concat(Qe(q)===ko?fd(t,{placement:q,boundary:d,rootBoundary:g,padding:c,flipVariations:h,allowedAutoPlacements:m}):q)},[]),w=t.rects.reference,E=t.rects.popper,$=new Map,j=!0,D=S[0],B=0;B<S.length;B++){var C=S[B],k=Qe(C),N=Kt(C)===Wt,V=[Me,qe].indexOf(k)>=0,L=V?"width":"height",I=kn(t,{placement:C,boundary:d,rootBoundary:g,altBoundary:p,padding:c}),z=V?N?We:Ie:N?qe:Me;w[L]>E[L]&&(z=Wn(z));var re=Wn(z),ne=[];if(i&&ne.push(I[k]<=0),a&&ne.push(I[z]<=0,I[re]<=0),ne.every(function(H){return H})){D=C,j=!1;break}$.set(C,ne)}if(j)for(var O=h?3:1,F=function(q){var X=S.find(function(Y){var W=$.get(Y);if(W)return W.slice(0,q).every(function(J){return J})});if(X)return D=X,"break"},G=O;G>0;G--){var K=F(G);if(K==="break")break}t.placement!==D&&(t.modifiersData[r]._skip=!0,t.placement=D,t.reset=!0)}}const hd={name:"flip",enabled:!0,phase:"main",fn:md,requiresIfExists:["offset"],data:{_skip:!1}};function Fi(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Vi(e){return[Me,We,qe,Ie].some(function(t){return e[t]>=0})}function vd(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,s=kn(t,{elementContext:"reference"}),a=kn(t,{altBoundary:!0}),u=Fi(s,r),c=Fi(a,o,i),d=Vi(u),g=Vi(c);t.modifiersData[n]={referenceClippingOffsets:u,popperEscapeOffsets:c,isReferenceHidden:d,hasPopperEscaped:g},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":d,"data-popper-escaped":g})}const bd={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:vd};function wd(e,t,n){var r=Qe(e),o=[Ie,Me].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,s=i[0],a=i[1];return s=s||0,a=(a||0)*o,[Ie,We].indexOf(r)>=0?{x:a,y:s}:{x:s,y:a}}function yd(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,s=Ys.reduce(function(d,g){return d[g]=wd(g,t.rects,i),d},{}),a=s[t.placement],u=a.x,c=a.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=u,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=s}const xd={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:yd};function Sd(e){var t=e.state,n=e.name;t.modifiersData[n]=na({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Cd={name:"popperOffsets",enabled:!0,phase:"read",fn:Sd,data:{}};function Ed(e){return e==="x"?"y":"x"}function Rd(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,a=s===void 0?!1:s,u=n.boundary,c=n.rootBoundary,d=n.altBoundary,g=n.padding,p=n.tether,f=p===void 0?!0:p,h=n.tetherOffset,m=h===void 0?0:h,v=kn(t,{boundary:u,rootBoundary:c,padding:g,altBoundary:d}),y=Qe(t.placement),P=Kt(t.placement),x=!P,S=Oo(y),w=Ed(S),E=t.modifiersData.popperOffsets,$=t.rects.reference,j=t.rects.popper,D=typeof m=="function"?m(Object.assign({},t.rects,{placement:t.placement})):m,B=typeof D=="number"?{mainAxis:D,altAxis:D}:Object.assign({mainAxis:0,altAxis:0},D),C=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,k={x:0,y:0};if(E){if(i){var N,V=S==="y"?Me:Ie,L=S==="y"?qe:We,I=S==="y"?"height":"width",z=E[S],re=z+v[V],ne=z-v[L],O=f?-j[I]/2:0,F=P===Wt?$[I]:j[I],G=P===Wt?-j[I]:-$[I],K=t.elements.arrow,H=f&&K?Po(K):{width:0,height:0},q=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Zs(),X=q[V],Y=q[L],W=wn(0,$[I],H[I]),J=x?$[I]/2-O-W-X-B.mainAxis:F-W-X-B.mainAxis,ee=x?-$[I]/2+O+W+Y+B.mainAxis:G+W+Y+B.mainAxis,se=t.elements.arrow&&$n(t.elements.arrow),A=se?S==="y"?se.clientTop||0:se.clientLeft||0:0,te=(N=C==null?void 0:C[S])!=null?N:0,M=z+J-te-A,ae=z+ee-te,Ee=wn(f?tr(re,M):re,z,f?Nt(ne,ae):ne);E[S]=Ee,k[S]=Ee-z}if(a){var Ne,xe=S==="x"?Me:Ie,St=S==="x"?qe:We,_e=E[w],rt=w==="y"?"height":"width",De=_e+v[xe],ot=_e-v[St],Re=[Me,Ie].indexOf(y)!==-1,Dt=(Ne=C==null?void 0:C[w])!=null?Ne:0,Ct=Re?De:_e-$[rt]-j[rt]-Dt+B.altAxis,Qt=Re?_e+$[rt]+j[rt]-Dt-B.altAxis:ot,Dn=f&&Re?Yc(Ct,_e,Qt):wn(f?Ct:De,_e,f?Qt:ot);E[w]=Dn,k[w]=Dn-_e}t.modifiersData[r]=k}}const kd={name:"preventOverflow",enabled:!0,phase:"main",fn:Rd,requiresIfExists:["offset"]};function Td(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Pd(e){return e===Le(e)||!Ge(e)?No(e):Td(e)}function Od(e){var t=e.getBoundingClientRect(),n=Xt(t.width)/e.offsetWidth||1,r=Xt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Nd(e,t,n){n===void 0&&(n=!1);var r=Ge(t),o=Ge(t)&&Od(t),i=yt(t),s=Yt(e,o,n),a={scrollLeft:0,scrollTop:0},u={x:0,y:0};return(r||!r&&!n)&&((tt(t)!=="body"||$o(i))&&(a=Pd(t)),Ge(t)?(u=Yt(t,!0),u.x+=t.clientLeft,u.y+=t.clientTop):i&&(u.x=_o(i))),{x:s.left+a.scrollLeft-u.x,y:s.top+a.scrollTop-u.y,width:s.width,height:s.height}}function _d(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var s=[].concat(i.requires||[],i.requiresIfExists||[]);s.forEach(function(a){if(!n.has(a)){var u=t.get(a);u&&o(u)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function $d(e){var t=_d(e);return Hc.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Md(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Id(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var Li={placement:"bottom",modifiers:[],strategy:"absolute"};function Bi(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function jd(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?Li:o;return function(a,u,c){c===void 0&&(c=i);var d={placement:"bottom",orderedModifiers:[],options:Object.assign({},Li,i),modifiersData:{},elements:{reference:a,popper:u},attributes:{},styles:{}},g=[],p=!1,f={state:d,setOptions:function(y){var P=typeof y=="function"?y(d.options):y;m(),d.options=Object.assign({},i,d.options,P),d.scrollParents={reference:It(a)?yn(a):a.contextElement?yn(a.contextElement):[],popper:yn(u)};var x=$d(Id([].concat(r,d.options.modifiers)));return d.orderedModifiers=x.filter(function(S){return S.enabled}),h(),f.update()},forceUpdate:function(){if(!p){var y=d.elements,P=y.reference,x=y.popper;if(Bi(P,x)){d.rects={reference:Nd(P,$n(x),d.options.strategy==="fixed"),popper:Po(x)},d.reset=!1,d.placement=d.options.placement,d.orderedModifiers.forEach(function(B){return d.modifiersData[B.name]=Object.assign({},B.data)});for(var S=0;S<d.orderedModifiers.length;S++){if(d.reset===!0){d.reset=!1,S=-1;continue}var w=d.orderedModifiers[S],E=w.fn,$=w.options,j=$===void 0?{}:$,D=w.name;typeof E=="function"&&(d=E({state:d,options:j,name:D,instance:f})||d)}}}},update:Md(function(){return new Promise(function(v){f.forceUpdate(),v(d)})}),destroy:function(){m(),p=!0}};if(!Bi(a,u))return f;f.setOptions(c).then(function(v){!p&&c.onFirstUpdate&&c.onFirstUpdate(v)});function h(){d.orderedModifiers.forEach(function(v){var y=v.name,P=v.options,x=P===void 0?{}:P,S=v.effect;if(typeof S=="function"){var w=S({state:d,name:y,instance:f,options:x}),E=function(){};g.push(w||E)}})}function m(){g.forEach(function(v){return v()}),g=[]}return f}}var Dd=[id,Cd,rd,qc,xd,hd,kd,Qc,bd],Ad=jd({defaultModifiers:Dd});const ra="Popper";function Fd(e){return Ws(ra,e)}mc(ra,["root"]);const Vd=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Ld=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Bd(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function nr(e){return typeof e=="function"?e():e}function dr(e){return e.nodeType!==void 0}function zd(e){return!dr(e)}const Hd=()=>dt({root:["root"]},uc(Fd)),Gd={},Ud=R.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:s,disablePortal:a,modifiers:u,open:c,placement:d,popperOptions:g,popperRef:p,slotProps:f={},slots:h={},TransitionProps:m}=t,v=ge(t,Vd),y=R.useRef(null),P=Ue(y,n),x=R.useRef(null),S=Ue(x,p),w=R.useRef(S);$t(()=>{w.current=S},[S]),R.useImperativeHandle(p,()=>x.current,[]);const E=Bd(d,s),[$,j]=R.useState(E),[D,B]=R.useState(nr(o));R.useEffect(()=>{x.current&&x.current.forceUpdate()}),R.useEffect(()=>{o&&B(nr(o))},[o]),$t(()=>{if(!D||!c)return;const L=re=>{j(re.placement)};if(process.env.NODE_ENV!=="production"&&D&&dr(D)&&D.nodeType===1){const re=D.getBoundingClientRect();process.env.NODE_ENV!=="test"&&re.top===0&&re.left===0&&re.right===0&&re.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let I=[{name:"preventOverflow",options:{altBoundary:a}},{name:"flip",options:{altBoundary:a}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:re})=>{L(re)}}];u!=null&&(I=I.concat(u)),g&&g.modifiers!=null&&(I=I.concat(g.modifiers));const z=Ad(D,y.current,T({placement:E},g,{modifiers:I}));return w.current(z),()=>{z.destroy(),w.current(null)}},[D,a,u,c,g,E]);const C={placement:$};m!==null&&(C.TransitionProps=m);const k=Hd(),N=(r=h.root)!=null?r:"div",V=Mt({elementType:N,externalSlotProps:f.root,externalForwardedProps:v,additionalProps:{role:"tooltip",ref:P},ownerState:t,className:k.root});return b.jsx(N,T({},V,{children:typeof i=="function"?i(C):i}))}),oa=R.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:s="ltr",disablePortal:a=!1,keepMounted:u=!1,modifiers:c,open:d,placement:g="bottom",popperOptions:p=Gd,popperRef:f,style:h,transition:m=!1,slotProps:v={},slots:y={}}=t,P=ge(t,Ld),[x,S]=R.useState(!0),w=()=>{S(!1)},E=()=>{S(!0)};if(!u&&!d&&(!m||x))return null;let $;if(i)$=i;else if(r){const B=nr(r);$=B&&dr(B)?Pe(B).body:Pe(null).body}const j=!d&&u&&(!m||x)?"none":void 0,D=m?{in:d,onEnter:w,onExited:E}:void 0;return b.jsx(En,{disablePortal:a,container:$,children:b.jsx(Ud,T({anchorEl:r,direction:s,disablePortal:a,modifiers:c,ref:n,open:m?!x:d,placement:g,popperOptions:p,popperRef:f,slotProps:v,slots:y},P,{style:T({position:"fixed",top:0,left:0,display:j},h),TransitionProps:D,children:o}))})});process.env.NODE_ENV!=="production"&&(oa.propTypes={anchorEl:Zt(l.oneOfType([lt,l.object,l.func]),e=>{if(e.open){const t=nr(e.anchorEl);if(t&&dr(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||zd(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:l.oneOfType([l.node,l.func]),container:l.oneOfType([lt,l.func]),direction:l.oneOf(["ltr","rtl"]),disablePortal:l.bool,keepMounted:l.bool,modifiers:l.arrayOf(l.shape({data:l.object,effect:l.func,enabled:l.bool,fn:l.func,name:l.any,options:l.object,phase:l.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:l.arrayOf(l.string),requiresIfExists:l.arrayOf(l.string)})),open:l.bool.isRequired,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:l.shape({modifiers:l.array,onFirstUpdate:l.func,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:l.oneOf(["absolute","fixed"])}),popperRef:Ro,slotProps:l.shape({root:l.oneOfType([l.func,l.object])}),slots:l.shape({root:l.elementType}),transition:l.bool});const qd=["values","unit","step"],Wd=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>T({},n,{[r.key]:r.val}),{})};function Xd(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=ge(e,qd),i=Wd(t),s=Object.keys(i);function a(p){return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n})`}function u(p){return`@media (max-width:${(typeof t[p]=="number"?t[p]:p)-r/100}${n})`}function c(p,f){const h=s.indexOf(f);return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n}) and (max-width:${(h!==-1&&typeof t[s[h]]=="number"?t[s[h]]:f)-r/100}${n})`}function d(p){return s.indexOf(p)+1<s.length?c(p,s[s.indexOf(p)+1]):a(p)}function g(p){const f=s.indexOf(p);return f===0?a(s[1]):f===s.length-1?u(s[f]):c(p,s[s.indexOf(p)+1]).replace("@media","@media not all and")}return T({keys:s,values:i,up:a,down:u,between:c,only:d,not:g,unit:n},o)}const Yd={borderRadius:4},Kd=Yd,Jd=process.env.NODE_ENV!=="production"?l.oneOfType([l.number,l.string,l.object,l.array]):{},xt=Jd;function xn(e,t){return t?at(e,t,{clone:!1}):e}const Mo={xs:0,sm:600,md:900,lg:1200,xl:1536},zi={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Mo[e]}px)`};function ct(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||zi;return t.reduce((s,a,u)=>(s[i.up(i.keys[u])]=n(t[u]),s),{})}if(typeof t=="object"){const i=r.breakpoints||zi;return Object.keys(t).reduce((s,a)=>{if(Object.keys(i.values||Mo).indexOf(a)!==-1){const u=i.up(a);s[u]=n(t[a],a)}else{const u=a;s[u]=t[u]}return s},{})}return n(t)}function Zd(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function Qd(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function pr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function rr(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=pr(e,n)||r,t&&(o=t(o,r,e)),o}function Se(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=s=>{if(s[t]==null)return null;const a=s[t],u=s.theme,c=pr(u,r)||{};return ct(s,a,g=>{let p=rr(c,o,g);return g===p&&typeof g=="string"&&(p=rr(c,o,`${t}${g==="default"?"":et(g)}`,g)),n===!1?p:{[n]:p}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:xt}:{},i.filterProps=[t],i}function ep(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const tp={m:"margin",p:"padding"},np={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Hi={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},rp=ep(e=>{if(e.length>2)if(Hi[e])e=Hi[e];else return[e];const[t,n]=e.split(""),r=tp[t],o=np[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),fr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],gr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],op=[...fr,...gr];function Mn(e,t,n,r){var o;const i=(o=pr(e,t,!1))!=null?o:n;return typeof i=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),i*s):Array.isArray(i)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>i.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${s} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[s]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function ia(e){return Mn(e,"spacing",8,"spacing")}function In(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function ip(e,t){return n=>e.reduce((r,o)=>(r[o]=In(t,n),r),{})}function sp(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=rp(n),i=ip(o,r),s=e[n];return ct(e,s,i)}function sa(e,t){const n=ia(e.theme);return Object.keys(e).map(r=>sp(e,t,r,n)).reduce(xn,{})}function ve(e){return sa(e,fr)}ve.propTypes=process.env.NODE_ENV!=="production"?fr.reduce((e,t)=>(e[t]=xt,e),{}):{};ve.filterProps=fr;function be(e){return sa(e,gr)}be.propTypes=process.env.NODE_ENV!=="production"?gr.reduce((e,t)=>(e[t]=xt,e),{}):{};be.filterProps=gr;process.env.NODE_ENV!=="production"&&op.reduce((e,t)=>(e[t]=xt,e),{});function ap(e=8){if(e.mui)return e;const t=ia({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const s=t(i);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function mr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?xn(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function He(e){return typeof e!="number"?e:`${e}px solid`}function Xe(e,t){return Se({prop:e,themeKey:"borders",transform:t})}const lp=Xe("border",He),up=Xe("borderTop",He),cp=Xe("borderRight",He),dp=Xe("borderBottom",He),pp=Xe("borderLeft",He),fp=Xe("borderColor"),gp=Xe("borderTopColor"),mp=Xe("borderRightColor"),hp=Xe("borderBottomColor"),vp=Xe("borderLeftColor"),bp=Xe("outline",He),wp=Xe("outlineColor"),hr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Mn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:In(t,r)});return ct(e,e.borderRadius,n)}return null};hr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:xt}:{};hr.filterProps=["borderRadius"];mr(lp,up,cp,dp,pp,fp,gp,mp,hp,vp,hr,bp,wp);const vr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Mn(e.theme,"spacing",8,"gap"),n=r=>({gap:In(t,r)});return ct(e,e.gap,n)}return null};vr.propTypes=process.env.NODE_ENV!=="production"?{gap:xt}:{};vr.filterProps=["gap"];const br=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Mn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:In(t,r)});return ct(e,e.columnGap,n)}return null};br.propTypes=process.env.NODE_ENV!=="production"?{columnGap:xt}:{};br.filterProps=["columnGap"];const wr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Mn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:In(t,r)});return ct(e,e.rowGap,n)}return null};wr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:xt}:{};wr.filterProps=["rowGap"];const yp=Se({prop:"gridColumn"}),xp=Se({prop:"gridRow"}),Sp=Se({prop:"gridAutoFlow"}),Cp=Se({prop:"gridAutoColumns"}),Ep=Se({prop:"gridAutoRows"}),Rp=Se({prop:"gridTemplateColumns"}),kp=Se({prop:"gridTemplateRows"}),Tp=Se({prop:"gridTemplateAreas"}),Pp=Se({prop:"gridArea"});mr(vr,br,wr,yp,xp,Sp,Cp,Ep,Rp,kp,Tp,Pp);function Gt(e,t){return t==="grey"?t:e}const Op=Se({prop:"color",themeKey:"palette",transform:Gt}),Np=Se({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Gt}),_p=Se({prop:"backgroundColor",themeKey:"palette",transform:Gt});mr(Op,Np,_p);function Ve(e){return e<=1&&e!==0?`${e*100}%`:e}const $p=Se({prop:"width",transform:Ve}),Io=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Mo[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:Ve(n)}};return ct(e,e.maxWidth,t)}return null};Io.filterProps=["maxWidth"];const Mp=Se({prop:"minWidth",transform:Ve}),Ip=Se({prop:"height",transform:Ve}),jp=Se({prop:"maxHeight",transform:Ve}),Dp=Se({prop:"minHeight",transform:Ve});Se({prop:"size",cssProperty:"width",transform:Ve});Se({prop:"size",cssProperty:"height",transform:Ve});const Ap=Se({prop:"boxSizing"});mr($p,Io,Mp,Ip,jp,Dp,Ap);const Fp={border:{themeKey:"borders",transform:He},borderTop:{themeKey:"borders",transform:He},borderRight:{themeKey:"borders",transform:He},borderBottom:{themeKey:"borders",transform:He},borderLeft:{themeKey:"borders",transform:He},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:He},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:hr},color:{themeKey:"palette",transform:Gt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Gt},backgroundColor:{themeKey:"palette",transform:Gt},p:{style:be},pt:{style:be},pr:{style:be},pb:{style:be},pl:{style:be},px:{style:be},py:{style:be},padding:{style:be},paddingTop:{style:be},paddingRight:{style:be},paddingBottom:{style:be},paddingLeft:{style:be},paddingX:{style:be},paddingY:{style:be},paddingInline:{style:be},paddingInlineStart:{style:be},paddingInlineEnd:{style:be},paddingBlock:{style:be},paddingBlockStart:{style:be},paddingBlockEnd:{style:be},m:{style:ve},mt:{style:ve},mr:{style:ve},mb:{style:ve},ml:{style:ve},mx:{style:ve},my:{style:ve},margin:{style:ve},marginTop:{style:ve},marginRight:{style:ve},marginBottom:{style:ve},marginLeft:{style:ve},marginX:{style:ve},marginY:{style:ve},marginInline:{style:ve},marginInlineStart:{style:ve},marginInlineEnd:{style:ve},marginBlock:{style:ve},marginBlockStart:{style:ve},marginBlockEnd:{style:ve},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:vr},rowGap:{style:wr},columnGap:{style:br},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ve},maxWidth:{style:Io},minWidth:{transform:Ve},height:{transform:Ve},maxHeight:{transform:Ve},minHeight:{transform:Ve},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},jo=Fp;function Vp(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Lp(e,t){return typeof e=="function"?e(t):e}function Bp(){function e(n,r,o,i){const s={[n]:r,theme:o},a=i[n];if(!a)return{[n]:r};const{cssProperty:u=n,themeKey:c,transform:d,style:g}=a;if(r==null)return null;if(c==="typography"&&r==="inherit")return{[n]:r};const p=pr(o,c)||{};return g?g(s):ct(s,r,h=>{let m=rr(p,d,h);return h===m&&typeof h=="string"&&(m=rr(p,d,`${n}${h==="default"?"":et(h)}`,h)),u===!1?m:{[u]:m}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const s=(r=i.unstable_sxConfig)!=null?r:jo;function a(u){let c=u;if(typeof u=="function")c=u(i);else if(typeof u!="object")return u;if(!c)return null;const d=Zd(i.breakpoints),g=Object.keys(d);let p=d;return Object.keys(c).forEach(f=>{const h=Lp(c[f],i);if(h!=null)if(typeof h=="object")if(s[f])p=xn(p,e(f,h,i,s));else{const m=ct({theme:i},h,v=>({[f]:v}));Vp(m,h)?p[f]=t({sx:h,theme:i}):p=xn(p,m)}else p=xn(p,e(f,h,i,s))}),Qd(g,p)}return Array.isArray(o)?o.map(a):a(o)}return t}const aa=Bp();aa.filterProps=["sx"];const Do=aa;function zp(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Hp=["breakpoints","palette","spacing","shape"];function Ao(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,s=ge(e,Hp),a=Xd(n),u=ap(o);let c=at({breakpoints:a,direction:"ltr",components:{},palette:T({mode:"light"},r),spacing:u,shape:T({},Kd,i)},s);return c.applyStyles=zp,c=t.reduce((d,g)=>at(d,g),c),c.unstable_sxConfig=T({},jo,s==null?void 0:s.unstable_sxConfig),c.unstable_sx=function(g){return Do({sx:g,theme:this})},c}function Gp(e){return Object.keys(e).length===0}function la(e=null){const t=R.useContext(Kr.ThemeContext);return!t||Gp(t)?e:t}const Up=Ao();function ua(e=Up){return la(e)}const qp=["ownerState"],Wp=["variants"],Xp=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Yp(e){return Object.keys(e).length===0}function Kp(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Xn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Jp=Ao(),Gi=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Bn({defaultTheme:e,theme:t,themeId:n}){return Yp(t)?e:t[n]||t}function Zp(e){return e?(t,n)=>n[e]:null}function Yn(e,t){let{ownerState:n}=t,r=ge(t,qp);const o=typeof e=="function"?e(T({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>Yn(i,T({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let a=ge(o,Wp);return i.forEach(u=>{let c=!0;typeof u.props=="function"?c=u.props(T({ownerState:n},r,n)):Object.keys(u.props).forEach(d=>{(n==null?void 0:n[d])!==u.props[d]&&r[d]!==u.props[d]&&(c=!1)}),c&&(Array.isArray(a)||(a=[a]),a.push(typeof u.style=="function"?u.style(T({ownerState:n},r,n)):u.style))}),a}return o}function Qp(e={}){const{themeId:t,defaultTheme:n=Jp,rootShouldForwardProp:r=Xn,slotShouldForwardProp:o=Xn}=e,i=s=>Do(T({},s,{theme:Bn(T({},s,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(s,a={})=>{Kr.internal_processStyles(s,w=>w.filter(E=>!(E!=null&&E.__mui_systemSx)));const{name:u,slot:c,skipVariantsResolver:d,skipSx:g,overridesResolver:p=Zp(Gi(c))}=a,f=ge(a,Xp),h=d!==void 0?d:c&&c!=="Root"&&c!=="root"||!1,m=g||!1;let v;process.env.NODE_ENV!=="production"&&u&&(v=`${u}-${Gi(c||"Root")}`);let y=Xn;c==="Root"||c==="root"?y=r:c?y=o:Kp(s)&&(y=void 0);const P=Kr(s,T({shouldForwardProp:y,label:v},f)),x=w=>typeof w=="function"&&w.__emotion_real!==w||Ot(w)?E=>Yn(w,T({},E,{theme:Bn({theme:E.theme,defaultTheme:n,themeId:t})})):w,S=(w,...E)=>{let $=x(w);const j=E?E.map(x):[];u&&p&&j.push(C=>{const k=Bn(T({},C,{defaultTheme:n,themeId:t}));if(!k.components||!k.components[u]||!k.components[u].styleOverrides)return null;const N=k.components[u].styleOverrides,V={};return Object.entries(N).forEach(([L,I])=>{V[L]=Yn(I,T({},C,{theme:k}))}),p(C,V)}),u&&!h&&j.push(C=>{var k;const N=Bn(T({},C,{defaultTheme:n,themeId:t})),V=N==null||(k=N.components)==null||(k=k[u])==null?void 0:k.variants;return Yn({variants:V},T({},C,{theme:N}))}),m||j.push(i);const D=j.length-E.length;if(Array.isArray(w)&&D>0){const C=new Array(D).fill("");$=[...w,...C],$.raw=[...w.raw,...C]}const B=P($,...j);if(process.env.NODE_ENV!=="production"){let C;u&&(C=`${u}${et(c||"")}`),C===void 0&&(C=`Styled(${Au(s)})`),B.displayName=C}return s.muiName&&(B.muiName=s.muiName),B};return P.withConfig&&(S.withConfig=P.withConfig),S}}function ef(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:Bs(t.components[n].defaultProps,r)}function tf({props:e,name:t,defaultTheme:n,themeId:r}){let o=ua(n);return r&&(o=o[r]||o),ef({theme:o,name:t,props:e})}function Fo(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),sc(e,t,n)}function nf(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function jt(e){if(e.type)return e;if(e.charAt(0)==="#")return jt(nf(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Ut(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Ut(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function yr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function rf(e){e=jt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),s=(c,d=(c+n/30)%12)=>o-i*Math.max(Math.min(d-3,9-d,1),-1);let a="rgb";const u=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(a+="a",u.push(t[3])),yr({type:a,values:u})}function Ui(e){e=jt(e);let t=e.type==="hsl"||e.type==="hsla"?jt(rf(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function qi(e,t){const n=Ui(e),r=Ui(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function or(e,t){return e=jt(e),t=Fo(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,yr(e)}function of(e,t){if(e=jt(e),t=Fo(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return yr(e)}function sf(e,t){if(e=jt(e),t=Fo(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return yr(e)}function af(e,t){return T({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const lf={black:"#000",white:"#fff"},Tn=lf,uf={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},cf=uf,df={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},At=df,pf={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Ft=pf,ff={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},ln=ff,gf={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Vt=gf,mf={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Lt=mf,hf={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Bt=hf,vf=["mode","contrastThreshold","tonalOffset"],Wi={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Tn.white,default:Tn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},jr={text:{primary:Tn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Tn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Xi(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=sf(e.main,o):t==="dark"&&(e.dark=of(e.main,i)))}function bf(e="light"){return e==="dark"?{main:Vt[200],light:Vt[50],dark:Vt[400]}:{main:Vt[700],light:Vt[400],dark:Vt[800]}}function wf(e="light"){return e==="dark"?{main:At[200],light:At[50],dark:At[400]}:{main:At[500],light:At[300],dark:At[700]}}function yf(e="light"){return e==="dark"?{main:Ft[500],light:Ft[300],dark:Ft[700]}:{main:Ft[700],light:Ft[400],dark:Ft[800]}}function xf(e="light"){return e==="dark"?{main:Lt[400],light:Lt[300],dark:Lt[700]}:{main:Lt[700],light:Lt[500],dark:Lt[900]}}function Sf(e="light"){return e==="dark"?{main:Bt[400],light:Bt[300],dark:Bt[700]}:{main:Bt[800],light:Bt[500],dark:Bt[900]}}function Cf(e="light"){return e==="dark"?{main:ln[400],light:ln[300],dark:ln[700]}:{main:"#ed6c02",light:ln[500],dark:ln[900]}}function Ef(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=ge(e,vf),i=e.primary||bf(t),s=e.secondary||wf(t),a=e.error||yf(t),u=e.info||xf(t),c=e.success||Sf(t),d=e.warning||Cf(t);function g(m){const v=qi(m,jr.text.primary)>=n?jr.text.primary:Wi.text.primary;if(process.env.NODE_ENV!=="production"){const y=qi(m,v);y<3&&console.error([`MUI: The contrast ratio of ${y}:1 for ${v} on ${m}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return v}const p=({color:m,name:v,mainShade:y=500,lightShade:P=300,darkShade:x=700})=>{if(m=T({},m),!m.main&&m[y]&&(m.main=m[y]),!m.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${v?` (${v})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${y}\` property.`:Ut(11,v?` (${v})`:"",y));if(typeof m.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${v?` (${v})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Ut(12,v?` (${v})`:"",JSON.stringify(m.main)));return Xi(m,"light",P,r),Xi(m,"dark",x,r),m.contrastText||(m.contrastText=g(m.main)),m},f={dark:jr,light:Wi};return process.env.NODE_ENV!=="production"&&(f[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),at(T({common:T({},Tn),mode:t,primary:p({color:i,name:"primary"}),secondary:p({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:p({color:a,name:"error"}),warning:p({color:d,name:"warning"}),info:p({color:u,name:"info"}),success:p({color:c,name:"success"}),grey:cf,contrastThreshold:n,getContrastText:g,augmentColor:p,tonalOffset:r},f[t]),o)}const Rf=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function kf(e){return Math.round(e*1e5)/1e5}const Yi={textTransform:"uppercase"},Ki='"Roboto", "Helvetica", "Arial", sans-serif';function Tf(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Ki,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:s=400,fontWeightMedium:a=500,fontWeightBold:u=700,htmlFontSize:c=16,allVariants:d,pxToRem:g}=n,p=ge(n,Rf);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof c!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const f=o/14,h=g||(y=>`${y/c*f}rem`),m=(y,P,x,S,w)=>T({fontFamily:r,fontWeight:y,fontSize:h(P),lineHeight:x},r===Ki?{letterSpacing:`${kf(S/P)}em`}:{},w,d),v={h1:m(i,96,1.167,-1.5),h2:m(i,60,1.2,-.5),h3:m(s,48,1.167,0),h4:m(s,34,1.235,.25),h5:m(s,24,1.334,0),h6:m(a,20,1.6,.15),subtitle1:m(s,16,1.75,.15),subtitle2:m(a,14,1.57,.1),body1:m(s,16,1.5,.15),body2:m(s,14,1.43,.15),button:m(a,14,1.75,.4,Yi),caption:m(s,12,1.66,.4),overline:m(s,12,2.66,1,Yi),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return at(T({htmlFontSize:c,pxToRem:h,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:s,fontWeightMedium:a,fontWeightBold:u},v),p,{clone:!1})}const Pf=.2,Of=.14,Nf=.12;function he(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Pf})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Of})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Nf})`].join(",")}const _f=["none",he(0,2,1,-1,0,1,1,0,0,1,3,0),he(0,3,1,-2,0,2,2,0,0,1,5,0),he(0,3,3,-2,0,3,4,0,0,1,8,0),he(0,2,4,-1,0,4,5,0,0,1,10,0),he(0,3,5,-1,0,5,8,0,0,1,14,0),he(0,3,5,-1,0,6,10,0,0,1,18,0),he(0,4,5,-2,0,7,10,1,0,2,16,1),he(0,5,5,-3,0,8,10,1,0,3,14,2),he(0,5,6,-3,0,9,12,1,0,3,16,2),he(0,6,6,-3,0,10,14,1,0,4,18,3),he(0,6,7,-4,0,11,15,1,0,4,20,3),he(0,7,8,-4,0,12,17,2,0,5,22,4),he(0,7,8,-4,0,13,19,2,0,5,24,4),he(0,7,9,-4,0,14,21,2,0,5,26,4),he(0,8,9,-5,0,15,22,2,0,6,28,5),he(0,8,10,-5,0,16,24,2,0,6,30,5),he(0,8,11,-5,0,17,26,2,0,6,32,5),he(0,9,11,-5,0,18,28,2,0,7,34,6),he(0,9,12,-6,0,19,29,2,0,7,36,6),he(0,10,13,-6,0,20,31,3,0,8,38,7),he(0,10,13,-6,0,21,33,3,0,8,40,7),he(0,10,14,-6,0,22,35,3,0,8,42,7),he(0,11,14,-7,0,23,36,3,0,9,44,8),he(0,11,15,-7,0,24,38,3,0,9,46,8)],$f=_f,Mf=["duration","easing","delay"],If={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},jf={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Ji(e){return`${Math.round(e)}ms`}function Df(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Af(e){const t=T({},If,e.easing),n=T({},jf,e.duration);return T({getAutoHeightDuration:Df,create:(o=["all"],i={})=>{const{duration:s=n.standard,easing:a=t.easeInOut,delay:u=0}=i,c=ge(i,Mf);if(process.env.NODE_ENV!=="production"){const d=p=>typeof p=="string",g=p=>!isNaN(parseFloat(p));!d(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!g(s)&&!d(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),d(a)||console.error('MUI: Argument "easing" must be a string.'),!g(u)&&!d(u)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(c).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(c).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(d=>`${d} ${typeof s=="string"?s:Ji(s)} ${a} ${typeof u=="string"?u:Ji(u)}`).join(",")}},e,{easing:t,duration:n})}const Ff={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Vf=Ff,Lf=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Bf(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,s=ge(e,Lf);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Ut(18));const a=Ef(r),u=Ao(e);let c=at(u,{mixins:af(u.breakpoints,n),palette:a,shadows:$f.slice(),typography:Tf(a,i),transitions:Af(o),zIndex:T({},Vf)});if(c=at(c,s),c=t.reduce((d,g)=>at(d,g),c),process.env.NODE_ENV!=="production"){const d=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],g=(p,f)=>{let h;for(h in p){const m=p[h];if(d.indexOf(h)!==-1&&Object.keys(m).length>0){if(process.env.NODE_ENV!=="production"){const v=nt("",h);console.error([`MUI: The \`${f}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(p,null,2),"",`Instead, you need to use the '&.${v}' syntax:`,JSON.stringify({root:{[`&.${v}`]:m}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}p[h]={}}}};Object.keys(c.components).forEach(p=>{const f=c.components[p].styleOverrides;f&&p.indexOf("Mui")===0&&g(f,p)})}return c.unstable_sxConfig=T({},jo,s==null?void 0:s.unstable_sxConfig),c.unstable_sx=function(g){return Do({sx:g,theme:this})},c}const zf=Bf(),Vo=zf,Lo="$$material",ca=e=>Xn(e)&&e!=="classes",Hf=Qp({themeId:Lo,defaultTheme:Vo,rootShouldForwardProp:ca}),Oe=Hf;function jn(){const e=ua(Vo);return process.env.NODE_ENV!=="production"&&R.useDebugValue(e),e[Lo]||e}function pt({props:e,name:t}){return tf({props:e,name:t,defaultTheme:Vo,themeId:Lo})}function io(e,t){return io=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},io(e,t)}function Gf(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,io(e,t)}const Zi={disabled:!1};var Uf=process.env.NODE_ENV!=="production"?l.oneOfType([l.number,l.shape({enter:l.number,exit:l.number,appear:l.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&l.oneOfType([l.string,l.shape({enter:l.string,exit:l.string,active:l.string}),l.shape({enter:l.string,enterDone:l.string,enterActive:l.string,exit:l.string,exitDone:l.string,exitActive:l.string})]);const da=_.createContext(null);var qf=function(t){return t.scrollTop},hn="unmounted",Rt="exited",kt="entering",Ht="entered",so="exiting",ft=function(e){Gf(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var s=o,a=s&&!s.isMounting?r.enter:r.appear,u;return i.appearStatus=null,r.in?a?(u=Rt,i.appearStatus=kt):u=Ht:r.unmountOnExit||r.mountOnEnter?u=hn:u=Rt,i.state={status:u},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var s=o.in;return s&&i.status===hn?{status:Rt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==kt&&s!==Ht&&(i=kt):(s===kt||s===Ht)&&(i=so)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,s,a;return i=s=a=o,o!=null&&typeof o!="number"&&(i=o.exit,s=o.enter,a=o.appear!==void 0?o.appear:s),{exit:i,enter:s,appear:a}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===kt){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:pn.findDOMNode(this);s&&qf(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Rt&&this.setState({status:hn})},n.performEnter=function(o){var i=this,s=this.props.enter,a=this.context?this.context.isMounting:o,u=this.props.nodeRef?[a]:[pn.findDOMNode(this),a],c=u[0],d=u[1],g=this.getTimeouts(),p=a?g.appear:g.enter;if(!o&&!s||Zi.disabled){this.safeSetState({status:Ht},function(){i.props.onEntered(c)});return}this.props.onEnter(c,d),this.safeSetState({status:kt},function(){i.props.onEntering(c,d),i.onTransitionEnd(p,function(){i.safeSetState({status:Ht},function(){i.props.onEntered(c,d)})})})},n.performExit=function(){var o=this,i=this.props.exit,s=this.getTimeouts(),a=this.props.nodeRef?void 0:pn.findDOMNode(this);if(!i||Zi.disabled){this.safeSetState({status:Rt},function(){o.props.onExited(a)});return}this.props.onExit(a),this.safeSetState({status:so},function(){o.props.onExiting(a),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:Rt},function(){o.props.onExited(a)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,s=!0;return this.nextCallback=function(a){s&&(s=!1,i.nextCallback=null,o(a))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var s=this.props.nodeRef?this.props.nodeRef.current:pn.findDOMNode(this),a=o==null&&!this.props.addEndListener;if(!s||a){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var u=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],c=u[0],d=u[1];this.props.addEndListener(c,d)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===hn)return null;var i=this.props,s=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var a=ge(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return _.createElement(da.Provider,{value:null},typeof s=="function"?s(o,a):_.cloneElement(_.Children.only(s),a))},t}(_.Component);ft.contextType=da;ft.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:l.shape({current:typeof Element>"u"?l.any:function(e,t,n,r,o,i){var s=e[t];return l.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:l.oneOfType([l.func.isRequired,l.element.isRequired]).isRequired,in:l.bool,mountOnEnter:l.bool,unmountOnExit:l.bool,appear:l.bool,enter:l.bool,exit:l.bool,timeout:function(t){var n=Uf;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:l.func,onEnter:l.func,onEntering:l.func,onEntered:l.func,onExit:l.func,onExiting:l.func,onExited:l.func}:{};function zt(){}ft.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:zt,onEntering:zt,onEntered:zt,onExit:zt,onExiting:zt,onExited:zt};ft.UNMOUNTED=hn;ft.EXITED=Rt;ft.ENTERING=kt;ft.ENTERED=Ht;ft.EXITING=so;const pa=ft,fa=e=>e.scrollTop;function ir(e,t){var n,r;const{timeout:o,easing:i,style:s={}}=e;return{duration:(n=s.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:s.transitionDelay}}const Wf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function ao(e){return`scale(${e}, ${e**2})`}const Xf={entering:{opacity:1,transform:ao(1)},entered:{opacity:1,transform:"none"}},Dr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Bo=R.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:s,in:a,onEnter:u,onEntered:c,onEntering:d,onExit:g,onExited:p,onExiting:f,style:h,timeout:m="auto",TransitionComponent:v=pa}=t,y=ge(t,Wf),P=gn(),x=R.useRef(),S=jn(),w=R.useRef(null),E=Ue(w,i.ref,n),$=L=>I=>{if(L){const z=w.current;I===void 0?L(z):L(z,I)}},j=$(d),D=$((L,I)=>{fa(L);const{duration:z,delay:re,easing:ne}=ir({style:h,timeout:m,easing:s},{mode:"enter"});let O;m==="auto"?(O=S.transitions.getAutoHeightDuration(L.clientHeight),x.current=O):O=z,L.style.transition=[S.transitions.create("opacity",{duration:O,delay:re}),S.transitions.create("transform",{duration:Dr?O:O*.666,delay:re,easing:ne})].join(","),u&&u(L,I)}),B=$(c),C=$(f),k=$(L=>{const{duration:I,delay:z,easing:re}=ir({style:h,timeout:m,easing:s},{mode:"exit"});let ne;m==="auto"?(ne=S.transitions.getAutoHeightDuration(L.clientHeight),x.current=ne):ne=I,L.style.transition=[S.transitions.create("opacity",{duration:ne,delay:z}),S.transitions.create("transform",{duration:Dr?ne:ne*.666,delay:Dr?z:z||ne*.333,easing:re})].join(","),L.style.opacity=0,L.style.transform=ao(.75),g&&g(L)}),N=$(p),V=L=>{m==="auto"&&P.start(x.current||0,L),r&&r(w.current,L)};return b.jsx(v,T({appear:o,in:a,nodeRef:w,onEnter:D,onEntered:B,onEntering:j,onExit:k,onExited:N,onExiting:C,addEndListener:V,timeout:m==="auto"?null:m},y,{children:(L,I)=>R.cloneElement(i,T({style:T({opacity:0,transform:ao(.75),visibility:L==="exited"&&!a?"hidden":void 0},Xf[L],h,i.props.style),ref:E},I))}))});process.env.NODE_ENV!=="production"&&(Bo.propTypes={addEndListener:l.func,appear:l.bool,children:On.isRequired,easing:l.oneOfType([l.shape({enter:l.string,exit:l.string}),l.string]),in:l.bool,onEnter:l.func,onEntered:l.func,onEntering:l.func,onExit:l.func,onExited:l.func,onExiting:l.func,style:l.object,timeout:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});Bo.muiSupportAuto=!0;const lo=Bo,Yf=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},Qi=Yf,Kf=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Jf=Oe(oa,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),ga=R.forwardRef(function(t,n){var r;const o=la(),i=pt({props:t,name:"MuiPopper"}),{anchorEl:s,component:a,components:u,componentsProps:c,container:d,disablePortal:g,keepMounted:p,modifiers:f,open:h,placement:m,popperOptions:v,popperRef:y,transition:P,slots:x,slotProps:S}=i,w=ge(i,Kf),E=(r=x==null?void 0:x.root)!=null?r:u==null?void 0:u.Root,$=T({anchorEl:s,container:d,disablePortal:g,keepMounted:p,modifiers:f,open:h,placement:m,popperOptions:v,popperRef:y,transition:P},w);return b.jsx(Jf,T({as:a,direction:o==null?void 0:o.direction,slots:{root:E},slotProps:S??c},$,{ref:n}))});process.env.NODE_ENV!=="production"&&(ga.propTypes={anchorEl:l.oneOfType([lt,l.object,l.func]),children:l.oneOfType([l.node,l.func]),component:l.elementType,components:l.shape({Root:l.elementType}),componentsProps:l.shape({root:l.oneOfType([l.func,l.object])}),container:l.oneOfType([lt,l.func]),disablePortal:l.bool,keepMounted:l.bool,modifiers:l.arrayOf(l.shape({data:l.object,effect:l.func,enabled:l.bool,fn:l.func,name:l.any,options:l.object,phase:l.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:l.arrayOf(l.string),requiresIfExists:l.arrayOf(l.string)})),open:l.bool.isRequired,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:l.shape({modifiers:l.array,onFirstUpdate:l.func,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:l.oneOf(["absolute","fixed"])}),popperRef:Ro,slotProps:l.shape({root:l.oneOfType([l.func,l.object])}),slots:l.shape({root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transition:l.bool});const ma=ga;function Zf(e){return nt("MuiTooltip",e)}const Qf=wt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),mt=Qf,eg=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function tg(e){return Math.round(e*1e5)/1e5}const ng=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,s={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${et(i.split("-")[0])}`],arrow:["arrow"]};return dt(s,Zf,t)},rg=Oe(ma,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>T({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${mt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${mt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${mt.arrow}`]:T({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${mt.arrow}`]:T({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),og=Oe("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${et(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>T({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:or(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${tg(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${mt.popper}[data-popper-placement*="left"] &`]:T({transformOrigin:"right center"},t.isRtl?T({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):T({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${mt.popper}[data-popper-placement*="right"] &`]:T({transformOrigin:"left center"},t.isRtl?T({marginRight:"14px"},t.touch&&{marginRight:"24px"}):T({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${mt.popper}[data-popper-placement*="top"] &`]:T({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${mt.popper}[data-popper-placement*="bottom"] &`]:T({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),ig=Oe("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:or(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let zn=!1;const es=new Nn;let un={x:0,y:0};function Hn(e,t){return n=>{t&&t(n),e(n)}}const ha=R.forwardRef(function(t,n){var r,o,i,s,a,u,c,d,g,p,f,h,m,v,y,P,x,S,w;const E=pt({props:t,name:"MuiTooltip"}),{arrow:$=!1,children:j,components:D={},componentsProps:B={},describeChild:C=!1,disableFocusListener:k=!1,disableHoverListener:N=!1,disableInteractive:V=!1,disableTouchListener:L=!1,enterDelay:I=100,enterNextDelay:z=0,enterTouchDelay:re=700,followCursor:ne=!1,id:O,leaveDelay:F=0,leaveTouchDelay:G=1500,onClose:K,onOpen:H,open:q,placement:X="bottom",PopperComponent:Y,PopperProps:W={},slotProps:J={},slots:ee={},title:se,TransitionComponent:A=lo,TransitionProps:te}=E,M=ge(E,eg),ae=R.isValidElement(j)?j:b.jsx("span",{children:j}),Ee=jn(),Ne=Ee.direction==="rtl",[xe,St]=R.useState(),[_e,rt]=R.useState(null),De=R.useRef(!1),ot=V||ne,Re=gn(),Dt=gn(),Ct=gn(),Qt=gn(),[Dn,Ko]=js({controlled:q,default:!1,name:"Tooltip",state:"open"});let it=Dn;if(process.env.NODE_ENV!=="production"){const{current:oe}=R.useRef(q!==void 0);R.useEffect(()=>{xe&&xe.disabled&&!oe&&se!==""&&xe.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[se,xe,oe])}const Sr=Is(O),en=R.useRef(),An=Cn(()=>{en.current!==void 0&&(document.body.style.WebkitUserSelect=en.current,en.current=void 0),Qt.clear()});R.useEffect(()=>An,[An]);const Jo=oe=>{es.clear(),zn=!0,Ko(!0),H&&!it&&H(oe)},Fn=Cn(oe=>{es.start(800+F,()=>{zn=!1}),Ko(!1),K&&it&&K(oe),Re.start(Ee.transitions.duration.shortest,()=>{De.current=!1})}),Cr=oe=>{De.current&&oe.type!=="touchstart"||(xe&&xe.removeAttribute("title"),Dt.clear(),Ct.clear(),I||zn&&z?Dt.start(zn?z:I,()=>{Jo(oe)}):Jo(oe))},Zo=oe=>{Dt.clear(),Ct.start(F,()=>{Fn(oe)})},{isFocusVisibleRef:Qo,onBlur:wl,onFocus:yl,ref:xl}=Ds(),[,ei]=R.useState(!1),ti=oe=>{wl(oe),Qo.current===!1&&(ei(!1),Zo(oe))},ni=oe=>{xe||St(oe.currentTarget),yl(oe),Qo.current===!0&&(ei(!0),Cr(oe))},ri=oe=>{De.current=!0;const Ae=ae.props;Ae.onTouchStart&&Ae.onTouchStart(oe)},oi=Cr,ii=Zo,Sl=oe=>{ri(oe),Ct.clear(),Re.clear(),An(),en.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Qt.start(re,()=>{document.body.style.WebkitUserSelect=en.current,Cr(oe)})},Cl=oe=>{ae.props.onTouchEnd&&ae.props.onTouchEnd(oe),An(),Ct.start(G,()=>{Fn(oe)})};R.useEffect(()=>{if(!it)return;function oe(Ae){(Ae.key==="Escape"||Ae.key==="Esc")&&Fn(Ae)}return document.addEventListener("keydown",oe),()=>{document.removeEventListener("keydown",oe)}},[Fn,it]);const El=Ue(ae.ref,xl,St,n);!se&&se!==0&&(it=!1);const Er=R.useRef(),Rl=oe=>{const Ae=ae.props;Ae.onMouseMove&&Ae.onMouseMove(oe),un={x:oe.clientX,y:oe.clientY},Er.current&&Er.current.update()},tn={},Rr=typeof se=="string";C?(tn.title=!it&&Rr&&!N?se:null,tn["aria-describedby"]=it?Sr:null):(tn["aria-label"]=Rr?se:null,tn["aria-labelledby"]=it&&!Rr?Sr:null);const ze=T({},tn,M,ae.props,{className:Te(M.className,ae.props.className),onTouchStart:ri,ref:El},ne?{onMouseMove:Rl}:{});process.env.NODE_ENV!=="production"&&(ze["data-mui-internal-clone-element"]=!0,R.useEffect(()=>{xe&&!xe.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[xe]));const nn={};L||(ze.onTouchStart=Sl,ze.onTouchEnd=Cl),N||(ze.onMouseOver=Hn(oi,ze.onMouseOver),ze.onMouseLeave=Hn(ii,ze.onMouseLeave),ot||(nn.onMouseOver=oi,nn.onMouseLeave=ii)),k||(ze.onFocus=Hn(ni,ze.onFocus),ze.onBlur=Hn(ti,ze.onBlur),ot||(nn.onFocus=ni,nn.onBlur=ti)),process.env.NODE_ENV!=="production"&&ae.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ae.props.title}\` or the Tooltip component.`].join(`
`));const kl=R.useMemo(()=>{var oe;let Ae=[{name:"arrow",enabled:!!_e,options:{element:_e,padding:4}}];return(oe=W.popperOptions)!=null&&oe.modifiers&&(Ae=Ae.concat(W.popperOptions.modifiers)),T({},W.popperOptions,{modifiers:Ae})},[_e,W]),rn=T({},E,{isRtl:Ne,arrow:$,disableInteractive:ot,placement:X,PopperComponentProp:Y,touch:De.current}),kr=ng(rn),si=(r=(o=ee.popper)!=null?o:D.Popper)!=null?r:rg,ai=(i=(s=(a=ee.transition)!=null?a:D.Transition)!=null?s:A)!=null?i:lo,li=(u=(c=ee.tooltip)!=null?c:D.Tooltip)!=null?u:og,ui=(d=(g=ee.arrow)!=null?g:D.Arrow)!=null?d:ig,Tl=mn(si,T({},W,(p=J.popper)!=null?p:B.popper,{className:Te(kr.popper,W==null?void 0:W.className,(f=(h=J.popper)!=null?h:B.popper)==null?void 0:f.className)}),rn),Pl=mn(ai,T({},te,(m=J.transition)!=null?m:B.transition),rn),Ol=mn(li,T({},(v=J.tooltip)!=null?v:B.tooltip,{className:Te(kr.tooltip,(y=(P=J.tooltip)!=null?P:B.tooltip)==null?void 0:y.className)}),rn),Nl=mn(ui,T({},(x=J.arrow)!=null?x:B.arrow,{className:Te(kr.arrow,(S=(w=J.arrow)!=null?w:B.arrow)==null?void 0:S.className)}),rn);return b.jsxs(R.Fragment,{children:[R.cloneElement(ae,ze),b.jsx(si,T({as:Y??ma,placement:X,anchorEl:ne?{getBoundingClientRect:()=>({top:un.y,left:un.x,right:un.x,bottom:un.y,width:0,height:0})}:xe,popperRef:Er,open:xe?it:!1,id:Sr,transition:!0},nn,Tl,{popperOptions:kl,children:({TransitionProps:oe})=>b.jsx(ai,T({timeout:Ee.transitions.duration.shorter},oe,Pl,{children:b.jsxs(li,T({},Ol,{children:[se,$?b.jsx(ui,T({},Nl,{ref:rt})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(ha.propTypes={arrow:l.bool,children:On.isRequired,classes:l.object,className:l.string,components:l.shape({Arrow:l.elementType,Popper:l.elementType,Tooltip:l.elementType,Transition:l.elementType}),componentsProps:l.shape({arrow:l.object,popper:l.object,tooltip:l.object,transition:l.object}),describeChild:l.bool,disableFocusListener:l.bool,disableHoverListener:l.bool,disableInteractive:l.bool,disableTouchListener:l.bool,enterDelay:l.number,enterNextDelay:l.number,enterTouchDelay:l.number,followCursor:l.bool,id:l.string,leaveDelay:l.number,leaveTouchDelay:l.number,onClose:l.func,onOpen:l.func,open:l.bool,placement:l.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:l.elementType,PopperProps:l.object,slotProps:l.shape({arrow:l.object,popper:l.object,tooltip:l.object,transition:l.object}),slots:l.shape({arrow:l.elementType,popper:l.elementType,tooltip:l.elementType,transition:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),title:l.node,TransitionComponent:l.elementType,TransitionProps:l.object});const sg=ha;var zo={},va={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(va);var ag=va.exports,Ar={};function lg(e){return nt("MuiSvgIcon",e)}wt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const ug=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],cg=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${et(t)}`,`fontSize${et(n)}`]};return dt(o,lg,r)},dg=Oe("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${et(n.color)}`],t[`fontSize${et(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,s,a,u,c,d,g,p,f,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(s=i.pxToRem)==null?void 0:s.call(i,20))||"1.25rem",medium:((a=e.typography)==null||(u=a.pxToRem)==null?void 0:u.call(a,24))||"1.5rem",large:((c=e.typography)==null||(d=c.pxToRem)==null?void 0:d.call(c,35))||"2.1875rem"}[t.fontSize],color:(g=(p=(e.vars||e).palette)==null||(p=p[t.color])==null?void 0:p.main)!=null?g:{action:(f=(e.vars||e).palette)==null||(f=f.action)==null?void 0:f.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),Ho=R.forwardRef(function(t,n){const r=pt({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:s="inherit",component:a="svg",fontSize:u="medium",htmlColor:c,inheritViewBox:d=!1,titleAccess:g,viewBox:p="0 0 24 24"}=r,f=ge(r,ug),h=R.isValidElement(o)&&o.type==="svg",m=T({},r,{color:s,component:a,fontSize:u,instanceFontSize:t.fontSize,inheritViewBox:d,viewBox:p,hasSvgAsChild:h}),v={};d||(v.viewBox=p);const y=cg(m);return b.jsxs(dg,T({as:a,className:Te(y.root,i),focusable:"false",color:c,"aria-hidden":g?void 0:!0,role:g?"img":void 0,ref:n},v,f,h&&o.props,{ownerState:m,children:[h?o.props.children:o,g?b.jsx("title",{children:g}):null]}))});process.env.NODE_ENV!=="production"&&(Ho.propTypes={children:l.node,classes:l.object,className:l.string,color:l.oneOfType([l.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),l.string]),component:l.elementType,fontSize:l.oneOfType([l.oneOf(["inherit","large","medium","small"]),l.string]),htmlColor:l.string,inheritViewBox:l.bool,shapeRendering:l.string,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),titleAccess:l.string,viewBox:l.string});Ho.muiName="SvgIcon";const ts=Ho;function ba(e,t){function n(r,o){return b.jsx(ts,T({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=ts.muiName,R.memo(R.forwardRef(n))}const pg={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),zs.configure(e)}},fg=Object.freeze(Object.defineProperty({__proto__:null,capitalize:et,createChainedFunction:eo,createSvgIcon:ba,debounce:Ms,deprecatedPropType:Vu,isMuiElement:Lu,ownerDocument:Pe,ownerWindow:qt,requirePropFactory:Bu,setRef:Qn,unstable_ClassNameGenerator:pg,unstable_useEnhancedEffect:$t,unstable_useId:Is,unsupportedProp:Gu,useControlled:js,useEventCallback:Cn,useForkRef:Ue,useIsFocusVisible:Ds},Symbol.toStringTag,{value:"Module"})),gg=bu(fg);var ns;function mg(){return ns||(ns=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=gg}(Ar)),Ar}var hg=ag;Object.defineProperty(zo,"__esModule",{value:!0});var wa=zo.default=void 0,vg=hg(mg()),bg=b;wa=zo.default=(0,vg.default)((0,bg.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function rs(e,t,n){return e?b.jsx(we.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:b.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Go(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:s=void 0,hasAutoFocus:a=!1,className:u,isDisabled:c=!1,isDense:d=!0,isSubMenuParent:g=!1,hasDisabledGutters:p=!1,hasDivider:f=!1,focusVisibleClassName:h,id:m,children:v}=e,y=b.jsx(we.MenuItem,{sx:{lineHeight:.8},autoFocus:a,className:u,disabled:c,dense:d,disableGutters:p,divider:f,focusVisibleClassName:h,onClick:t,id:m,children:n?b.jsxs(b.Fragment,{children:[rs(i,n,!0),b.jsx(we.ListItemText,{primary:n,inset:!i&&o}),g?b.jsx(we.ListItemIcon,{className:"papi-menu-icon-trailing",children:b.jsx(wa,{})}):rs(s,n,!1)]}):v});return r?b.jsx(sg,{title:r,placement:"right",children:b.jsx("div",{children:y})}):y}function ya(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function wg(e){const[t,n]=_.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,s=c=>{n(c.currentTarget)},a=()=>{n(void 0)},u=()=>{let c=ya(i).filter(d=>"menuItem"in d.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return c=c.filter(d=>"menuItem"in d.group&&d.group.menuItem===r.id),b.jsx(Uo,{...e,includedGroups:c})};return b.jsxs(b.Fragment,{children:[b.jsx(Go,{onClick:s,...o,isSubMenuParent:!0}),b.jsx(we.Menu,{anchorEl:t,open:!!t,onClose:a,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:u()},r.id)]})}const yg=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function Uo(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:s}=_.useMemo(()=>{const d=o&&o.length>0?o:ya(t).filter(h=>!("menuItem"in h.group)),g=Object.values(d).sort((h,m)=>(h.group.order||0)-(m.group.order||0)),p=[];g.forEach(h=>{yg(h.id,t.items).forEach(m=>p.push({item:m,isLastItemInGroup:!1})),p.length>0&&(p[p.length-1].isLastItemInGroup=!0)}),p.length>0&&(p[p.length-1].isLastItemInGroup=!1);const f=p.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:p,allowForLeadingIcons:f}},[o,t]),a=({item:d,isLastItemInGroup:g})=>({className:"papi-menu-item",label:d.label,tooltip:d.tooltip,iconPathBefore:"iconPathBefore"in d?d.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in d?d.iconPathAfter:void 0,hasDivider:g,allowForLeadingIcons:s}),[u]=i;if(!u)return b.jsx("div",{});const c=u.item.group;return b.jsx("div",{role:"menu","aria-label":c,children:i.map((d,g)=>{const{item:p}=d,f=a(d);if("command"in p){const h=p.group+g;return b.jsx(Go,{onClick:m=>{n==null||n(m),r(p)},...f},h)}return b.jsx(wg,{parentMenuItem:p,parentItemProps:f,...e},c+p.id)})},c)}function xg(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([s,a])=>({id:s,group:a})).filter(s=>"column"in s.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(s=>"column"in s.group&&s.group.column===n)),b.jsx(Uo,{...e,includedGroups:i})}function Sg({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return b.jsxs(we.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[b.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),b.jsx(we.List,{id:n,dense:!0,className:i??"",children:b.jsx(xg,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function xa({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=_.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(a=>{if(a==="isExtensible")return;const u=a,c=o[u];typeof c=="object"&&typeof c.order=="number"&&!Number.isNaN(c.order)?s.set(c.order,{id:u,metadata:c}):console.warn(`Property ${a} (${typeof c}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((a,u)=>(a.metadata.order||0)-(u.metadata.order||0))},[o,r]);return b.jsx(we.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((s,a)=>b.jsx(Sg,{commandHandler:e,menuDefinition:n,...s,className:t},a))})}const Sa=R.createContext({});process.env.NODE_ENV!=="production"&&(Sa.displayName="ListContext");const Cg=Sa;function Eg(e){return nt("MuiList",e)}wt("MuiList",["root","padding","dense","subheader"]);const Rg=["children","className","component","dense","disablePadding","subheader"],kg=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return dt({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},Eg,t)},Tg=Oe("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>T({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Ca=R.forwardRef(function(t,n){const r=pt({props:t,name:"MuiList"}),{children:o,className:i,component:s="ul",dense:a=!1,disablePadding:u=!1,subheader:c}=r,d=ge(r,Rg),g=R.useMemo(()=>({dense:a}),[a]),p=T({},r,{component:s,dense:a,disablePadding:u}),f=kg(p);return b.jsx(Cg.Provider,{value:g,children:b.jsxs(Tg,T({as:s,className:Te(f.root,i),ref:n,ownerState:p},d,{children:[c,o]}))})});process.env.NODE_ENV!=="production"&&(Ca.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,dense:l.bool,disablePadding:l.bool,subheader:l.node,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object])});const Pg=Ca,Og=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Fr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function os(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function Ea(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function cn(e,t,n,r,o,i){let s=!1,a=o(e,t,t?n:!1);for(;a;){if(a===e.firstChild){if(s)return!1;s=!0}const u=r?!1:a.disabled||a.getAttribute("aria-disabled")==="true";if(!a.hasAttribute("tabindex")||!Ea(a,i)||u)a=o(e,a,n);else return a.focus(),!0}return!1}const Ra=R.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:s,className:a,disabledItemsFocusable:u=!1,disableListWrap:c=!1,onKeyDown:d,variant:g="selectedMenu"}=t,p=ge(t,Og),f=R.useRef(null),h=R.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});$t(()=>{o&&f.current.focus()},[o]),R.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(x,S)=>{const w=!f.current.style.width;if(x.clientHeight<f.current.clientHeight&&w){const E=`${As(Pe(x))}px`;f.current.style[S.direction==="rtl"?"paddingLeft":"paddingRight"]=E,f.current.style.width=`calc(100% + ${E})`}return f.current}}),[]);const m=x=>{const S=f.current,w=x.key,E=Pe(S).activeElement;if(w==="ArrowDown")x.preventDefault(),cn(S,E,c,u,Fr);else if(w==="ArrowUp")x.preventDefault(),cn(S,E,c,u,os);else if(w==="Home")x.preventDefault(),cn(S,null,c,u,Fr);else if(w==="End")x.preventDefault(),cn(S,null,c,u,os);else if(w.length===1){const $=h.current,j=w.toLowerCase(),D=performance.now();$.keys.length>0&&(D-$.lastTime>500?($.keys=[],$.repeating=!0,$.previousKeyMatched=!0):$.repeating&&j!==$.keys[0]&&($.repeating=!1)),$.lastTime=D,$.keys.push(j);const B=E&&!$.repeating&&Ea(E,$);$.previousKeyMatched&&(B||cn(S,E,!1,u,Fr,$))?x.preventDefault():$.previousKeyMatched=!1}d&&d(x)},v=Ue(f,n);let y=-1;R.Children.forEach(s,(x,S)=>{if(!R.isValidElement(x)){y===S&&(y+=1,y>=s.length&&(y=-1));return}process.env.NODE_ENV!=="production"&&Zn.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(g==="selectedMenu"&&x.props.selected||y===-1)&&(y=S),y===S&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(y+=1,y>=s.length&&(y=-1))});const P=R.Children.map(s,(x,S)=>{if(S===y){const w={};return i&&(w.autoFocus=!0),x.props.tabIndex===void 0&&g==="selectedMenu"&&(w.tabIndex=0),R.cloneElement(x,w)}return x});return b.jsx(Pg,T({role:"menu",ref:v,className:a,onKeyDown:m,tabIndex:o?0:-1},p,{children:P}))});process.env.NODE_ENV!=="production"&&(Ra.propTypes={autoFocus:l.bool,autoFocusItem:l.bool,children:l.node,className:l.string,disabledItemsFocusable:l.bool,disableListWrap:l.bool,onKeyDown:l.func,variant:l.oneOf(["menu","selectedMenu"])});const Ng=Ra,_g=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],$g={entering:{opacity:1},entered:{opacity:1}},ka=R.forwardRef(function(t,n){const r=jn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:s=!0,children:a,easing:u,in:c,onEnter:d,onEntered:g,onEntering:p,onExit:f,onExited:h,onExiting:m,style:v,timeout:y=o,TransitionComponent:P=pa}=t,x=ge(t,_g),S=R.useRef(null),w=Ue(S,a.ref,n),E=V=>L=>{if(V){const I=S.current;L===void 0?V(I):V(I,L)}},$=E(p),j=E((V,L)=>{fa(V);const I=ir({style:v,timeout:y,easing:u},{mode:"enter"});V.style.webkitTransition=r.transitions.create("opacity",I),V.style.transition=r.transitions.create("opacity",I),d&&d(V,L)}),D=E(g),B=E(m),C=E(V=>{const L=ir({style:v,timeout:y,easing:u},{mode:"exit"});V.style.webkitTransition=r.transitions.create("opacity",L),V.style.transition=r.transitions.create("opacity",L),f&&f(V)}),k=E(h),N=V=>{i&&i(S.current,V)};return b.jsx(P,T({appear:s,in:c,nodeRef:S,onEnter:j,onEntered:D,onEntering:$,onExit:C,onExited:k,onExiting:B,addEndListener:N,timeout:y},x,{children:(V,L)=>R.cloneElement(a,T({style:T({opacity:0,visibility:V==="exited"&&!c?"hidden":void 0},$g[V],v,a.props.style),ref:w},L))}))});process.env.NODE_ENV!=="production"&&(ka.propTypes={addEndListener:l.func,appear:l.bool,children:On.isRequired,easing:l.oneOfType([l.shape({enter:l.string,exit:l.string}),l.string]),in:l.bool,onEnter:l.func,onEntered:l.func,onEntering:l.func,onExit:l.func,onExited:l.func,onExiting:l.func,style:l.object,timeout:l.oneOfType([l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});const Mg=ka;function Ig(e){return nt("MuiBackdrop",e)}wt("MuiBackdrop",["root","invisible"]);const jg=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Dg=e=>{const{classes:t,invisible:n}=e;return dt({root:["root",n&&"invisible"]},Ig,t)},Ag=Oe("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>T({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),Ta=R.forwardRef(function(t,n){var r,o,i;const s=pt({props:t,name:"MuiBackdrop"}),{children:a,className:u,component:c="div",components:d={},componentsProps:g={},invisible:p=!1,open:f,slotProps:h={},slots:m={},TransitionComponent:v=Mg,transitionDuration:y}=s,P=ge(s,jg),x=T({},s,{component:c,invisible:p}),S=Dg(x),w=(r=h.root)!=null?r:g.root;return b.jsx(v,T({in:f,timeout:y},P,{children:b.jsx(Ag,T({"aria-hidden":!0},w,{as:(o=(i=m.root)!=null?i:d.Root)!=null?o:c,className:Te(S.root,u,w==null?void 0:w.className),ownerState:T({},x,w==null?void 0:w.ownerState),classes:S,ref:n,children:a}))}))});process.env.NODE_ENV!=="production"&&(Ta.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,components:l.shape({Root:l.elementType}),componentsProps:l.shape({root:l.object}),invisible:l.bool,open:l.bool.isRequired,slotProps:l.shape({root:l.object}),slots:l.shape({root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),TransitionComponent:l.elementType,transitionDuration:l.oneOfType([l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});const Fg=Ta;function Vg(e){return nt("MuiModal",e)}wt("MuiModal",["root","hidden","backdrop"]);const Lg=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Bg=e=>{const{open:t,exited:n,classes:r}=e;return dt({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},Vg,r)},zg=Oe("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>T({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Hg=Oe(Fg,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Pa=R.forwardRef(function(t,n){var r,o,i,s,a,u;const c=pt({name:"MuiModal",props:t}),{BackdropComponent:d=Hg,BackdropProps:g,className:p,closeAfterTransition:f=!1,children:h,container:m,component:v,components:y={},componentsProps:P={},disableAutoFocus:x=!1,disableEnforceFocus:S=!1,disableEscapeKeyDown:w=!1,disablePortal:E=!1,disableRestoreFocus:$=!1,disableScrollLock:j=!1,hideBackdrop:D=!1,keepMounted:B=!1,onBackdropClick:C,open:k,slotProps:N,slots:V}=c,L=ge(c,Lg),I=T({},c,{closeAfterTransition:f,disableAutoFocus:x,disableEnforceFocus:S,disableEscapeKeyDown:w,disablePortal:E,disableRestoreFocus:$,disableScrollLock:j,hideBackdrop:D,keepMounted:B}),{getRootProps:z,getBackdropProps:re,getTransitionProps:ne,portalRef:O,isTopModal:F,exited:G,hasTransition:K}=_c(T({},I,{rootRef:n})),H=T({},I,{exited:G}),q=Bg(H),X={};if(h.props.tabIndex===void 0&&(X.tabIndex="-1"),K){const{onEnter:te,onExited:M}=ne();X.onEnter=te,X.onExited=M}const Y=(r=(o=V==null?void 0:V.root)!=null?o:y.Root)!=null?r:zg,W=(i=(s=V==null?void 0:V.backdrop)!=null?s:y.Backdrop)!=null?i:d,J=(a=N==null?void 0:N.root)!=null?a:P.root,ee=(u=N==null?void 0:N.backdrop)!=null?u:P.backdrop,se=Mt({elementType:Y,externalSlotProps:J,externalForwardedProps:L,getSlotProps:z,additionalProps:{ref:n,as:v},ownerState:H,className:Te(p,J==null?void 0:J.className,q==null?void 0:q.root,!H.open&&H.exited&&(q==null?void 0:q.hidden))}),A=Mt({elementType:W,externalSlotProps:ee,additionalProps:g,getSlotProps:te=>re(T({},te,{onClick:M=>{C&&C(M),te!=null&&te.onClick&&te.onClick(M)}})),className:Te(ee==null?void 0:ee.className,g==null?void 0:g.className,q==null?void 0:q.backdrop),ownerState:H});return!B&&!k&&(!K||G)?null:b.jsx(En,{ref:O,container:m,disablePortal:E,children:b.jsxs(Y,T({},se,{children:[!D&&d?b.jsx(W,T({},A)):null,b.jsx(er,{disableEnforceFocus:S,disableAutoFocus:x,disableRestoreFocus:$,isEnabled:F,open:k,children:R.cloneElement(h,X)})]}))})});process.env.NODE_ENV!=="production"&&(Pa.propTypes={BackdropComponent:l.elementType,BackdropProps:l.object,children:On.isRequired,classes:l.object,className:l.string,closeAfterTransition:l.bool,component:l.elementType,components:l.shape({Backdrop:l.elementType,Root:l.elementType}),componentsProps:l.shape({backdrop:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),container:l.oneOfType([lt,l.func]),disableAutoFocus:l.bool,disableEnforceFocus:l.bool,disableEscapeKeyDown:l.bool,disablePortal:l.bool,disableRestoreFocus:l.bool,disableScrollLock:l.bool,hideBackdrop:l.bool,keepMounted:l.bool,onBackdropClick:l.func,onClose:l.func,onTransitionEnter:l.func,onTransitionExited:l.func,open:l.bool.isRequired,slotProps:l.shape({backdrop:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({backdrop:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object])});const Gg=Pa;function Ug(e){return nt("MuiPaper",e)}wt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const qg=["className","component","elevation","square","variant"],Wg=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return dt(i,Ug,o)},Xg=Oe("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return T({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&T({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${or("#fff",Qi(t.elevation))}, ${or("#fff",Qi(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Oa=R.forwardRef(function(t,n){const r=pt({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:s=1,square:a=!1,variant:u="elevation"}=r,c=ge(r,qg),d=T({},r,{component:i,elevation:s,square:a,variant:u}),g=Wg(d);return process.env.NODE_ENV!=="production"&&jn().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),b.jsx(Xg,T({as:i,ownerState:d,className:Te(g.root,o),ref:n},c))});process.env.NODE_ENV!=="production"&&(Oa.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,elevation:Zt(Ls,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:l.bool,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),variant:l.oneOfType([l.oneOf(["elevation","outlined"]),l.string])});const Yg=Oa;function Kg(e){return nt("MuiPopover",e)}wt("MuiPopover",["root","paper"]);const Jg=["onEntering"],Zg=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Qg=["slotProps"];function is(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function ss(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function as(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function Kn(e){return typeof e=="function"?e():e}const em=e=>{const{classes:t}=e;return dt({root:["root"],paper:["paper"]},Kg,t)},tm=Oe(Gg,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Na=Oe(Yg,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),_a=R.forwardRef(function(t,n){var r,o,i;const s=pt({props:t,name:"MuiPopover"}),{action:a,anchorEl:u,anchorOrigin:c={vertical:"top",horizontal:"left"},anchorPosition:d,anchorReference:g="anchorEl",children:p,className:f,container:h,elevation:m=8,marginThreshold:v=16,open:y,PaperProps:P={},slots:x,slotProps:S,transformOrigin:w={vertical:"top",horizontal:"left"},TransitionComponent:E=lo,transitionDuration:$="auto",TransitionProps:{onEntering:j}={},disableScrollLock:D=!1}=s,B=ge(s.TransitionProps,Jg),C=ge(s,Zg),k=(r=S==null?void 0:S.paper)!=null?r:P,N=R.useRef(),V=Ue(N,k.ref),L=T({},s,{anchorOrigin:c,anchorReference:g,elevation:m,marginThreshold:v,externalPaperSlotProps:k,transformOrigin:w,TransitionComponent:E,transitionDuration:$,TransitionProps:B}),I=em(L),z=R.useCallback(()=>{if(g==="anchorPosition")return process.env.NODE_ENV!=="production"&&(d||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),d;const te=Kn(u),M=te&&te.nodeType===1?te:Pe(N.current).body,ae=M.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Ee=M.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Ee.top===0&&Ee.left===0&&Ee.right===0&&Ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:ae.top+is(ae,c.vertical),left:ae.left+ss(ae,c.horizontal)}},[u,c.horizontal,c.vertical,d,g]),re=R.useCallback(te=>({vertical:is(te,w.vertical),horizontal:ss(te,w.horizontal)}),[w.horizontal,w.vertical]),ne=R.useCallback(te=>{const M={width:te.offsetWidth,height:te.offsetHeight},ae=re(M);if(g==="none")return{top:null,left:null,transformOrigin:as(ae)};const Ee=z();let Ne=Ee.top-ae.vertical,xe=Ee.left-ae.horizontal;const St=Ne+M.height,_e=xe+M.width,rt=qt(Kn(u)),De=rt.innerHeight-v,ot=rt.innerWidth-v;if(v!==null&&Ne<v){const Re=Ne-v;Ne-=Re,ae.vertical+=Re}else if(v!==null&&St>De){const Re=St-De;Ne-=Re,ae.vertical+=Re}if(process.env.NODE_ENV!=="production"&&M.height>De&&M.height&&De&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${M.height-De}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),v!==null&&xe<v){const Re=xe-v;xe-=Re,ae.horizontal+=Re}else if(_e>ot){const Re=_e-ot;xe-=Re,ae.horizontal+=Re}return{top:`${Math.round(Ne)}px`,left:`${Math.round(xe)}px`,transformOrigin:as(ae)}},[u,g,z,re,v]),[O,F]=R.useState(y),G=R.useCallback(()=>{const te=N.current;if(!te)return;const M=ne(te);M.top!==null&&(te.style.top=M.top),M.left!==null&&(te.style.left=M.left),te.style.transformOrigin=M.transformOrigin,F(!0)},[ne]);R.useEffect(()=>(D&&window.addEventListener("scroll",G),()=>window.removeEventListener("scroll",G)),[u,D,G]);const K=(te,M)=>{j&&j(te,M),G()},H=()=>{F(!1)};R.useEffect(()=>{y&&G()}),R.useImperativeHandle(a,()=>y?{updatePosition:()=>{G()}}:null,[y,G]),R.useEffect(()=>{if(!y)return;const te=Ms(()=>{G()}),M=qt(u);return M.addEventListener("resize",te),()=>{te.clear(),M.removeEventListener("resize",te)}},[u,y,G]);let q=$;$==="auto"&&!E.muiSupportAuto&&(q=void 0);const X=h||(u?Pe(Kn(u)).body:void 0),Y=(o=x==null?void 0:x.root)!=null?o:tm,W=(i=x==null?void 0:x.paper)!=null?i:Na,J=Mt({elementType:W,externalSlotProps:T({},k,{style:O?k.style:T({},k.style,{opacity:0})}),additionalProps:{elevation:m,ref:V},ownerState:L,className:Te(I.paper,k==null?void 0:k.className)}),ee=Mt({elementType:Y,externalSlotProps:(S==null?void 0:S.root)||{},externalForwardedProps:C,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:X,open:y},ownerState:L,className:Te(I.root,f)}),{slotProps:se}=ee,A=ge(ee,Qg);return b.jsx(Y,T({},A,!Gs(Y)&&{slotProps:se,disableScrollLock:D},{children:b.jsx(E,T({appear:!0,in:y,onEntering:K,onExited:H,timeout:q},B,{children:b.jsx(W,T({},J,{children:p}))}))}))});process.env.NODE_ENV!=="production"&&(_a.propTypes={action:Ro,anchorEl:Zt(l.oneOfType([lt,l.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=Kn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:l.shape({horizontal:l.oneOfType([l.oneOf(["center","left","right"]),l.number]).isRequired,vertical:l.oneOfType([l.oneOf(["bottom","center","top"]),l.number]).isRequired}),anchorPosition:l.shape({left:l.number.isRequired,top:l.number.isRequired}),anchorReference:l.oneOf(["anchorEl","anchorPosition","none"]),children:l.node,classes:l.object,className:l.string,container:l.oneOfType([lt,l.func]),disableScrollLock:l.bool,elevation:Ls,marginThreshold:l.number,onClose:l.func,open:l.bool.isRequired,PaperProps:l.shape({component:_u}),slotProps:l.shape({paper:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({paper:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transformOrigin:l.shape({horizontal:l.oneOfType([l.oneOf(["center","left","right"]),l.number]).isRequired,vertical:l.oneOfType([l.oneOf(["bottom","center","top"]),l.number]).isRequired}),TransitionComponent:l.elementType,transitionDuration:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})]),TransitionProps:l.object});const nm=_a;function rm(e){return nt("MuiMenu",e)}wt("MuiMenu",["root","paper","list"]);const om=["onEntering"],im=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],sm={vertical:"top",horizontal:"right"},am={vertical:"top",horizontal:"left"},lm=e=>{const{classes:t}=e;return dt({root:["root"],paper:["paper"],list:["list"]},rm,t)},um=Oe(nm,{shouldForwardProp:e=>ca(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),cm=Oe(Na,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),dm=Oe(Ng,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),$a=R.forwardRef(function(t,n){var r,o;const i=pt({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:a,className:u,disableAutoFocusItem:c=!1,MenuListProps:d={},onClose:g,open:p,PaperProps:f={},PopoverClasses:h,transitionDuration:m="auto",TransitionProps:{onEntering:v}={},variant:y="selectedMenu",slots:P={},slotProps:x={}}=i,S=ge(i.TransitionProps,om),w=ge(i,im),E=jn(),$=E.direction==="rtl",j=T({},i,{autoFocus:s,disableAutoFocusItem:c,MenuListProps:d,onEntering:v,PaperProps:f,transitionDuration:m,TransitionProps:S,variant:y}),D=lm(j),B=s&&!c&&p,C=R.useRef(null),k=(ne,O)=>{C.current&&C.current.adjustStyleForScrollbar(ne,E),v&&v(ne,O)},N=ne=>{ne.key==="Tab"&&(ne.preventDefault(),g&&g(ne,"tabKeyDown"))};let V=-1;R.Children.map(a,(ne,O)=>{R.isValidElement(ne)&&(process.env.NODE_ENV!=="production"&&Zn.isFragment(ne)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),ne.props.disabled||(y==="selectedMenu"&&ne.props.selected||V===-1)&&(V=O))});const L=(r=P.paper)!=null?r:cm,I=(o=x.paper)!=null?o:f,z=Mt({elementType:P.root,externalSlotProps:x.root,ownerState:j,className:[D.root,u]}),re=Mt({elementType:L,externalSlotProps:I,ownerState:j,className:D.paper});return b.jsx(um,T({onClose:g,anchorOrigin:{vertical:"bottom",horizontal:$?"right":"left"},transformOrigin:$?sm:am,slots:{paper:L,root:P.root},slotProps:{root:z,paper:re},open:p,ref:n,transitionDuration:m,TransitionProps:T({onEntering:k},S),ownerState:j},w,{classes:h,children:b.jsx(dm,T({onKeyDown:N,actions:C,autoFocus:s&&(V===-1||c),autoFocusItem:B,variant:y},d,{className:Te(D.list,d.className),children:a}))}))});process.env.NODE_ENV!=="production"&&($a.propTypes={anchorEl:l.oneOfType([lt,l.func]),autoFocus:l.bool,children:l.node,classes:l.object,className:l.string,disableAutoFocusItem:l.bool,MenuListProps:l.object,onClose:l.func,open:l.bool.isRequired,PaperProps:l.object,PopoverClasses:l.object,slotProps:l.shape({paper:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({paper:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transitionDuration:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})]),TransitionProps:l.object,variant:l.oneOf(["menu","selectedMenu"])});const pm=$a;function fm({className:e,commandHandler:t,menuDefinition:n,children:r}){var c;const[o,i]=_.useState(void 0),s=_.useCallback(d=>{d.preventDefault(),i(o===void 0?{mouseX:d.clientX+2,mouseY:d.clientY-6}:void 0)},[o]),a=_.useCallback(()=>{i(void 0)},[]),u=_.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((c=n==null?void 0:n.items)==null?void 0:c.length)??0)===0||!r?r:b.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[r,b.jsx(pm,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:a,anchorReference:"anchorPosition",anchorPosition:u,children:b.jsx(Uo,{menuDefinition:n,commandHandler:t,onClick:a})})]})}const gm=ba(b.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function mm(e){return{preserveValue:!0,...e}}const sr=(e,t,n={})=>{const r=_.useRef(t);r.current=t;const o=_.useRef(n);o.current=mm(o.current);const[i,s]=_.useState(()=>r.current),[a,u]=_.useState(!0);return _.useEffect(()=>{let c=!0;return u(!!e),(async()=>{if(e){const d=await e();c&&(s(()=>d),u(!1))}})(),()=>{c=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[i,a]};function Ma({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:i,ariaLabelPrefix:s,children:a}){const[u,c]=_.useState(!1),[d,g]=_.useState(!1),p=_.useCallback(()=>{u&&c(!1),g(!1)},[u]),f=_.useCallback(S=>{S.stopPropagation(),c(w=>{const E=!w;return E&&S.shiftKey?g(!0):E||g(!1),E})},[]),h=_.useCallback(S=>(p(),r(S)),[r,p]),[m,v]=_.useState({top:1,left:1});_.useEffect(()=>{if(u){const S=o==null?void 0:o.current;if(S){const w=S.getBoundingClientRect(),E=window.scrollY,$=window.scrollX,j=w.top+E+S.clientHeight,D=w.left+$;v({top:j,left:D})}}},[u,o]);const[y]=sr(_.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,u]),t),[P]=sr(_.useCallback(async()=>(e==null?void 0:e(!0))??n??y,[e,n,y,u]),n??y),x=d&&P?P:y;return b.jsxs(b.Fragment,{children:[b.jsx(we.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${i??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:f,children:a??b.jsx(gm,{})}),b.jsx(we.Drawer,{className:`papi-menu-drawer ${i??""}`,anchor:"left",variant:"temporary",open:u,onClose:p,PaperProps:{className:"papi-menu-drawer-paper",style:{top:m.top,left:m.left}},children:x?b.jsx(xa,{className:i,id:`${s??""} main menu`,commandHandler:h,multiColumnMenu:x}):void 0})]})}function hm({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:s="medium",className:a,onClick:u,children:c}){return b.jsx(we.IconButton,{id:e,disabled:n,edge:i,size:s,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${a??""}`,onClick:u,children:c})}const vm=ho.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),qo=_.forwardRef(({className:e,...t},n)=>b.jsx(ds.Root,{ref:n,className:U(vm(),e),...t}));qo.displayName=ds.Root.displayName;function Pn({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:i,placeholder:s,isRequired:a=!1,className:u,defaultValue:c,value:d,onChange:g,onFocus:p,onBlur:f}){return b.jsxs("div",{className:U("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":r}),children:[b.jsx(qo,{htmlFor:e,className:U({"pr-text-red-600":n,"pr-hidden":!i}),children:`${i}${a?"*":""}`}),b.jsx(lr,{id:e,disabled:t,placeholder:s,required:a,className:U(u,{"pr-border-red-600":n}),defaultValue:c,value:d,onChange:g,onFocus:p,onBlur:f}),b.jsx("p",{className:U({"pr-hidden":!o}),children:o})]})}let Vr;const Lr=()=>(Vr||(Vr=ue.allBookIds.map(e=>({bookId:e,label:ue.bookIdToEnglishName(e)}))),Vr);function bm({scrRef:e,handleSubmit:t,id:n}){const r=u=>{t(u)},o=(u,c)=>{const g={bookNum:ue.bookIdToNumber(c.bookId),chapterNum:1,verseNum:1};r(g)},i=u=>{t({...e,chapterNum:+u.target.value})},s=u=>{t({...e,verseNum:+u.target.value})},a=_.useMemo(()=>Lr()[e.bookNum-1],[e.bookNum]);return b.jsxs("span",{id:n,className:"pr-flex pr-place-items-center",children:[b.jsx(Jn,{title:"Book",className:"papi-ref-selector book",value:a,options:Lr(),onChange:o,isClearable:!1,width:200}),b.jsx(Ze,{onClick:()=>r(Ce.offsetBook(e,-1)),disabled:e.bookNum<=Ce.FIRST_SCR_BOOK_NUM,children:"<"}),b.jsx(Ze,{onClick:()=>r(Ce.offsetBook(e,1)),disabled:e.bookNum>=Lr().length,children:">"}),b.jsx(Pn,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),b.jsx(Ze,{onClick:()=>t(Ce.offsetChapter(e,-1)),disabled:e.chapterNum<=Ce.FIRST_SCR_CHAPTER_NUM,children:"<"}),b.jsx(Ze,{onClick:()=>t(Ce.offsetChapter(e,1)),disabled:e.chapterNum>=Ce.getChaptersForBook(e.bookNum),children:">"}),b.jsx(Pn,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:s}),b.jsx(Ze,{onClick:()=>t(Ce.offsetVerse(e,-1)),disabled:e.verseNum<=Ce.FIRST_SCR_VERSE_NUM,children:"<"}),b.jsx(Ze,{onClick:()=>t(Ce.offsetVerse(e,1)),children:">"})]})}/**
   * table-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function ht(e,t){return typeof e=="function"?e(t):e}function Be(e,t){return n=>{t.setState(r=>({...r,[e]:ht(n,r[e])}))}}function xr(e){return e instanceof Function}function wm(e){return Array.isArray(e)&&e.every(t=>typeof t=="number")}function Ia(e,t){const n=[],r=o=>{o.forEach(i=>{n.push(i);const s=t(i);s!=null&&s.length&&r(s)})};return r(e),n}function Z(e,t,n){let r=[],o;return i=>{let s;n.key&&n.debug&&(s=Date.now());const a=e(i);if(!(a.length!==r.length||a.some((d,g)=>r[g]!==d)))return o;r=a;let c;if(n.key&&n.debug&&(c=Date.now()),o=t(...a),n==null||n.onChange==null||n.onChange(o),n.key&&n.debug&&n!=null&&n.debug()){const d=Math.round((Date.now()-s)*100)/100,g=Math.round((Date.now()-c)*100)/100,p=g/16,f=(h,m)=>{for(h=String(h);h.length<m;)h=" "+h;return h};console.info(`%c⏱ ${f(g,5)} /${f(d,5)} ms`,`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0,Math.min(120-120*p,120))}deg 100% 31%);`,n==null?void 0:n.key)}return o}}function Q(e,t,n,r){return{debug:()=>{var o;return(o=e==null?void 0:e.debugAll)!=null?o:e[t]},key:process.env.NODE_ENV==="development"&&n,onChange:r}}function ym(e,t,n,r){const o=()=>{var s;return(s=i.getValue())!=null?s:e.options.renderFallbackValue},i={id:`${t.id}_${n.id}`,row:t,column:n,getValue:()=>t.getValue(r),renderValue:o,getContext:Z(()=>[e,n,t,i],(s,a,u,c)=>({table:s,column:a,row:u,cell:c,getValue:c.getValue,renderValue:c.renderValue}),Q(e.options,"debugCells","cell.getContext"))};return e._features.forEach(s=>{s.createCell==null||s.createCell(i,n,t,e)},{}),i}function xm(e,t,n,r){var o,i;const a={...e._getDefaultColumnDef(),...t},u=a.accessorKey;let c=(o=(i=a.id)!=null?i:u?u.replace(".","_"):void 0)!=null?o:typeof a.header=="string"?a.header:void 0,d;if(a.accessorFn?d=a.accessorFn:u&&(u.includes(".")?d=p=>{let f=p;for(const m of u.split(".")){var h;f=(h=f)==null?void 0:h[m],process.env.NODE_ENV!=="production"&&f===void 0&&console.warn(`"${m}" in deeply nested key "${u}" returned undefined.`)}return f}:d=p=>p[a.accessorKey]),!c)throw process.env.NODE_ENV!=="production"?new Error(a.accessorFn?"Columns require an id when using an accessorFn":"Columns require an id when using a non-string header"):new Error;let g={id:`${String(c)}`,accessorFn:d,parent:r,depth:n,columnDef:a,columns:[],getFlatColumns:Z(()=>[!0],()=>{var p;return[g,...(p=g.columns)==null?void 0:p.flatMap(f=>f.getFlatColumns())]},Q(e.options,"debugColumns","column.getFlatColumns")),getLeafColumns:Z(()=>[e._getOrderColumnsFn()],p=>{var f;if((f=g.columns)!=null&&f.length){let h=g.columns.flatMap(m=>m.getLeafColumns());return p(h)}return[g]},Q(e.options,"debugColumns","column.getLeafColumns"))};for(const p of e._features)p.createColumn==null||p.createColumn(g,e);return g}const ke="debugHeaders";function ls(e,t,n){var r;let i={id:(r=n.id)!=null?r:t.id,column:t,index:n.index,isPlaceholder:!!n.isPlaceholder,placeholderId:n.placeholderId,depth:n.depth,subHeaders:[],colSpan:0,rowSpan:0,headerGroup:null,getLeafHeaders:()=>{const s=[],a=u=>{u.subHeaders&&u.subHeaders.length&&u.subHeaders.map(a),s.push(u)};return a(i),s},getContext:()=>({table:e,header:i,column:t})};return e._features.forEach(s=>{s.createHeader==null||s.createHeader(i,e)}),i}const Sm={createTable:e=>{e.getHeaderGroups=Z(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,o)=>{var i,s;const a=(i=r==null?void 0:r.map(g=>n.find(p=>p.id===g)).filter(Boolean))!=null?i:[],u=(s=o==null?void 0:o.map(g=>n.find(p=>p.id===g)).filter(Boolean))!=null?s:[],c=n.filter(g=>!(r!=null&&r.includes(g.id))&&!(o!=null&&o.includes(g.id)));return Gn(t,[...a,...c,...u],e)},Q(e.options,ke,"getHeaderGroups")),e.getCenterHeaderGroups=Z(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,o)=>(n=n.filter(i=>!(r!=null&&r.includes(i.id))&&!(o!=null&&o.includes(i.id))),Gn(t,n,e,"center")),Q(e.options,ke,"getCenterHeaderGroups")),e.getLeftHeaderGroups=Z(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left],(t,n,r)=>{var o;const i=(o=r==null?void 0:r.map(s=>n.find(a=>a.id===s)).filter(Boolean))!=null?o:[];return Gn(t,i,e,"left")},Q(e.options,ke,"getLeftHeaderGroups")),e.getRightHeaderGroups=Z(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.right],(t,n,r)=>{var o;const i=(o=r==null?void 0:r.map(s=>n.find(a=>a.id===s)).filter(Boolean))!=null?o:[];return Gn(t,i,e,"right")},Q(e.options,ke,"getRightHeaderGroups")),e.getFooterGroups=Z(()=>[e.getHeaderGroups()],t=>[...t].reverse(),Q(e.options,ke,"getFooterGroups")),e.getLeftFooterGroups=Z(()=>[e.getLeftHeaderGroups()],t=>[...t].reverse(),Q(e.options,ke,"getLeftFooterGroups")),e.getCenterFooterGroups=Z(()=>[e.getCenterHeaderGroups()],t=>[...t].reverse(),Q(e.options,ke,"getCenterFooterGroups")),e.getRightFooterGroups=Z(()=>[e.getRightHeaderGroups()],t=>[...t].reverse(),Q(e.options,ke,"getRightFooterGroups")),e.getFlatHeaders=Z(()=>[e.getHeaderGroups()],t=>t.map(n=>n.headers).flat(),Q(e.options,ke,"getFlatHeaders")),e.getLeftFlatHeaders=Z(()=>[e.getLeftHeaderGroups()],t=>t.map(n=>n.headers).flat(),Q(e.options,ke,"getLeftFlatHeaders")),e.getCenterFlatHeaders=Z(()=>[e.getCenterHeaderGroups()],t=>t.map(n=>n.headers).flat(),Q(e.options,ke,"getCenterFlatHeaders")),e.getRightFlatHeaders=Z(()=>[e.getRightHeaderGroups()],t=>t.map(n=>n.headers).flat(),Q(e.options,ke,"getRightFlatHeaders")),e.getCenterLeafHeaders=Z(()=>[e.getCenterFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),Q(e.options,ke,"getCenterLeafHeaders")),e.getLeftLeafHeaders=Z(()=>[e.getLeftFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),Q(e.options,ke,"getLeftLeafHeaders")),e.getRightLeafHeaders=Z(()=>[e.getRightFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),Q(e.options,ke,"getRightLeafHeaders")),e.getLeafHeaders=Z(()=>[e.getLeftHeaderGroups(),e.getCenterHeaderGroups(),e.getRightHeaderGroups()],(t,n,r)=>{var o,i,s,a,u,c;return[...(o=(i=t[0])==null?void 0:i.headers)!=null?o:[],...(s=(a=n[0])==null?void 0:a.headers)!=null?s:[],...(u=(c=r[0])==null?void 0:c.headers)!=null?u:[]].map(d=>d.getLeafHeaders()).flat()},Q(e.options,ke,"getLeafHeaders"))}};function Gn(e,t,n,r){var o,i;let s=0;const a=function(p,f){f===void 0&&(f=1),s=Math.max(s,f),p.filter(h=>h.getIsVisible()).forEach(h=>{var m;(m=h.columns)!=null&&m.length&&a(h.columns,f+1)},0)};a(e);let u=[];const c=(p,f)=>{const h={depth:f,id:[r,`${f}`].filter(Boolean).join("_"),headers:[]},m=[];p.forEach(v=>{const y=[...m].reverse()[0],P=v.column.depth===h.depth;let x,S=!1;if(P&&v.column.parent?x=v.column.parent:(x=v.column,S=!0),y&&(y==null?void 0:y.column)===x)y.subHeaders.push(v);else{const w=ls(n,x,{id:[r,f,x.id,v==null?void 0:v.id].filter(Boolean).join("_"),isPlaceholder:S,placeholderId:S?`${m.filter(E=>E.column===x).length}`:void 0,depth:f,index:m.length});w.subHeaders.push(v),m.push(w)}h.headers.push(v),v.headerGroup=h}),u.push(h),f>0&&c(m,f-1)},d=t.map((p,f)=>ls(n,p,{depth:s,index:f}));c(d,s-1),u.reverse();const g=p=>p.filter(h=>h.column.getIsVisible()).map(h=>{let m=0,v=0,y=[0];h.subHeaders&&h.subHeaders.length?(y=[],g(h.subHeaders).forEach(x=>{let{colSpan:S,rowSpan:w}=x;m+=S,y.push(w)})):m=1;const P=Math.min(...y);return v=v+P,h.colSpan=m,h.rowSpan=v,{colSpan:m,rowSpan:v}});return g((o=(i=u[0])==null?void 0:i.headers)!=null?o:[]),u}const ja=(e,t,n,r,o,i,s)=>{let a={id:t,index:r,original:n,depth:o,parentId:s,_valuesCache:{},_uniqueValuesCache:{},getValue:u=>{if(a._valuesCache.hasOwnProperty(u))return a._valuesCache[u];const c=e.getColumn(u);if(c!=null&&c.accessorFn)return a._valuesCache[u]=c.accessorFn(a.original,r),a._valuesCache[u]},getUniqueValues:u=>{if(a._uniqueValuesCache.hasOwnProperty(u))return a._uniqueValuesCache[u];const c=e.getColumn(u);if(c!=null&&c.accessorFn)return c.columnDef.getUniqueValues?(a._uniqueValuesCache[u]=c.columnDef.getUniqueValues(a.original,r),a._uniqueValuesCache[u]):(a._uniqueValuesCache[u]=[a.getValue(u)],a._uniqueValuesCache[u])},renderValue:u=>{var c;return(c=a.getValue(u))!=null?c:e.options.renderFallbackValue},subRows:i??[],getLeafRows:()=>Ia(a.subRows,u=>u.subRows),getParentRow:()=>a.parentId?e.getRow(a.parentId,!0):void 0,getParentRows:()=>{let u=[],c=a;for(;;){const d=c.getParentRow();if(!d)break;u.push(d),c=d}return u.reverse()},getAllCells:Z(()=>[e.getAllLeafColumns()],u=>u.map(c=>ym(e,a,c,c.id)),Q(e.options,"debugRows","getAllCells")),_getAllCellsByColumnId:Z(()=>[a.getAllCells()],u=>u.reduce((c,d)=>(c[d.column.id]=d,c),{}),Q(e.options,"debugRows","getAllCellsByColumnId"))};for(let u=0;u<e._features.length;u++){const c=e._features[u];c==null||c.createRow==null||c.createRow(a,e)}return a},Cm={createColumn:(e,t)=>{e._getFacetedRowModel=t.options.getFacetedRowModel&&t.options.getFacetedRowModel(t,e.id),e.getFacetedRowModel=()=>e._getFacetedRowModel?e._getFacetedRowModel():t.getPreFilteredRowModel(),e._getFacetedUniqueValues=t.options.getFacetedUniqueValues&&t.options.getFacetedUniqueValues(t,e.id),e.getFacetedUniqueValues=()=>e._getFacetedUniqueValues?e._getFacetedUniqueValues():new Map,e._getFacetedMinMaxValues=t.options.getFacetedMinMaxValues&&t.options.getFacetedMinMaxValues(t,e.id),e.getFacetedMinMaxValues=()=>{if(e._getFacetedMinMaxValues)return e._getFacetedMinMaxValues()}}},Da=(e,t,n)=>{var r;const o=n.toLowerCase();return!!(!((r=e.getValue(t))==null||(r=r.toString())==null||(r=r.toLowerCase())==null)&&r.includes(o))};Da.autoRemove=e=>Ke(e);const Aa=(e,t,n)=>{var r;return!!(!((r=e.getValue(t))==null||(r=r.toString())==null)&&r.includes(n))};Aa.autoRemove=e=>Ke(e);const Fa=(e,t,n)=>{var r;return((r=e.getValue(t))==null||(r=r.toString())==null?void 0:r.toLowerCase())===(n==null?void 0:n.toLowerCase())};Fa.autoRemove=e=>Ke(e);const Va=(e,t,n)=>{var r;return(r=e.getValue(t))==null?void 0:r.includes(n)};Va.autoRemove=e=>Ke(e)||!(e!=null&&e.length);const La=(e,t,n)=>!n.some(r=>{var o;return!((o=e.getValue(t))!=null&&o.includes(r))});La.autoRemove=e=>Ke(e)||!(e!=null&&e.length);const Ba=(e,t,n)=>n.some(r=>{var o;return(o=e.getValue(t))==null?void 0:o.includes(r)});Ba.autoRemove=e=>Ke(e)||!(e!=null&&e.length);const za=(e,t,n)=>e.getValue(t)===n;za.autoRemove=e=>Ke(e);const Ha=(e,t,n)=>e.getValue(t)==n;Ha.autoRemove=e=>Ke(e);const Wo=(e,t,n)=>{let[r,o]=n;const i=e.getValue(t);return i>=r&&i<=o};Wo.resolveFilterValue=e=>{let[t,n]=e,r=typeof t!="number"?parseFloat(t):t,o=typeof n!="number"?parseFloat(n):n,i=t===null||Number.isNaN(r)?-1/0:r,s=n===null||Number.isNaN(o)?1/0:o;if(i>s){const a=i;i=s,s=a}return[i,s]};Wo.autoRemove=e=>Ke(e)||Ke(e[0])&&Ke(e[1]);const st={includesString:Da,includesStringSensitive:Aa,equalsString:Fa,arrIncludes:Va,arrIncludesAll:La,arrIncludesSome:Ba,equals:za,weakEquals:Ha,inNumberRange:Wo};function Ke(e){return e==null||e===""}const Em={getDefaultColumnDef:()=>({filterFn:"auto"}),getInitialState:e=>({columnFilters:[],...e}),getDefaultOptions:e=>({onColumnFiltersChange:Be("columnFilters",e),filterFromLeafRows:!1,maxLeafRowFilterDepth:100}),createColumn:(e,t)=>{e.getAutoFilterFn=()=>{const n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);return typeof r=="string"?st.includesString:typeof r=="number"?st.inNumberRange:typeof r=="boolean"||r!==null&&typeof r=="object"?st.equals:Array.isArray(r)?st.arrIncludes:st.weakEquals},e.getFilterFn=()=>{var n,r;return xr(e.columnDef.filterFn)?e.columnDef.filterFn:e.columnDef.filterFn==="auto"?e.getAutoFilterFn():(n=(r=t.options.filterFns)==null?void 0:r[e.columnDef.filterFn])!=null?n:st[e.columnDef.filterFn]},e.getCanFilter=()=>{var n,r,o;return((n=e.columnDef.enableColumnFilter)!=null?n:!0)&&((r=t.options.enableColumnFilters)!=null?r:!0)&&((o=t.options.enableFilters)!=null?o:!0)&&!!e.accessorFn},e.getIsFiltered=()=>e.getFilterIndex()>-1,e.getFilterValue=()=>{var n;return(n=t.getState().columnFilters)==null||(n=n.find(r=>r.id===e.id))==null?void 0:n.value},e.getFilterIndex=()=>{var n,r;return(n=(r=t.getState().columnFilters)==null?void 0:r.findIndex(o=>o.id===e.id))!=null?n:-1},e.setFilterValue=n=>{t.setColumnFilters(r=>{const o=e.getFilterFn(),i=r==null?void 0:r.find(d=>d.id===e.id),s=ht(n,i?i.value:void 0);if(us(o,s,e)){var a;return(a=r==null?void 0:r.filter(d=>d.id!==e.id))!=null?a:[]}const u={id:e.id,value:s};if(i){var c;return(c=r==null?void 0:r.map(d=>d.id===e.id?u:d))!=null?c:[]}return r!=null&&r.length?[...r,u]:[u]})}},createRow:(e,t)=>{e.columnFilters={},e.columnFiltersMeta={}},createTable:e=>{e.setColumnFilters=t=>{const n=e.getAllLeafColumns(),r=o=>{var i;return(i=ht(t,o))==null?void 0:i.filter(s=>{const a=n.find(u=>u.id===s.id);if(a){const u=a.getFilterFn();if(us(u,s.value,a))return!1}return!0})};e.options.onColumnFiltersChange==null||e.options.onColumnFiltersChange(r)},e.resetColumnFilters=t=>{var n,r;e.setColumnFilters(t?[]:(n=(r=e.initialState)==null?void 0:r.columnFilters)!=null?n:[])},e.getPreFilteredRowModel=()=>e.getCoreRowModel(),e.getFilteredRowModel=()=>(!e._getFilteredRowModel&&e.options.getFilteredRowModel&&(e._getFilteredRowModel=e.options.getFilteredRowModel(e)),e.options.manualFiltering||!e._getFilteredRowModel?e.getPreFilteredRowModel():e._getFilteredRowModel())}};function us(e,t,n){return(e&&e.autoRemove?e.autoRemove(t,n):!1)||typeof t>"u"||typeof t=="string"&&!t}const Rm=(e,t,n)=>n.reduce((r,o)=>{const i=o.getValue(e);return r+(typeof i=="number"?i:0)},0),km=(e,t,n)=>{let r;return n.forEach(o=>{const i=o.getValue(e);i!=null&&(r>i||r===void 0&&i>=i)&&(r=i)}),r},Tm=(e,t,n)=>{let r;return n.forEach(o=>{const i=o.getValue(e);i!=null&&(r<i||r===void 0&&i>=i)&&(r=i)}),r},Pm=(e,t,n)=>{let r,o;return n.forEach(i=>{const s=i.getValue(e);s!=null&&(r===void 0?s>=s&&(r=o=s):(r>s&&(r=s),o<s&&(o=s)))}),[r,o]},Om=(e,t)=>{let n=0,r=0;if(t.forEach(o=>{let i=o.getValue(e);i!=null&&(i=+i)>=i&&(++n,r+=i)}),n)return r/n},Nm=(e,t)=>{if(!t.length)return;const n=t.map(i=>i.getValue(e));if(!wm(n))return;if(n.length===1)return n[0];const r=Math.floor(n.length/2),o=n.sort((i,s)=>i-s);return n.length%2!==0?o[r]:(o[r-1]+o[r])/2},_m=(e,t)=>Array.from(new Set(t.map(n=>n.getValue(e))).values()),$m=(e,t)=>new Set(t.map(n=>n.getValue(e))).size,Mm=(e,t)=>t.length,Br={sum:Rm,min:km,max:Tm,extent:Pm,mean:Om,median:Nm,unique:_m,uniqueCount:$m,count:Mm},Im={getDefaultColumnDef:()=>({aggregatedCell:e=>{var t,n;return(t=(n=e.getValue())==null||n.toString==null?void 0:n.toString())!=null?t:null},aggregationFn:"auto"}),getInitialState:e=>({grouping:[],...e}),getDefaultOptions:e=>({onGroupingChange:Be("grouping",e),groupedColumnMode:"reorder"}),createColumn:(e,t)=>{e.toggleGrouping=()=>{t.setGrouping(n=>n!=null&&n.includes(e.id)?n.filter(r=>r!==e.id):[...n??[],e.id])},e.getCanGroup=()=>{var n,r;return((n=e.columnDef.enableGrouping)!=null?n:!0)&&((r=t.options.enableGrouping)!=null?r:!0)&&(!!e.accessorFn||!!e.columnDef.getGroupingValue)},e.getIsGrouped=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.includes(e.id)},e.getGroupedIndex=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.indexOf(e.id)},e.getToggleGroupingHandler=()=>{const n=e.getCanGroup();return()=>{n&&e.toggleGrouping()}},e.getAutoAggregationFn=()=>{const n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);if(typeof r=="number")return Br.sum;if(Object.prototype.toString.call(r)==="[object Date]")return Br.extent},e.getAggregationFn=()=>{var n,r;if(!e)throw new Error;return xr(e.columnDef.aggregationFn)?e.columnDef.aggregationFn:e.columnDef.aggregationFn==="auto"?e.getAutoAggregationFn():(n=(r=t.options.aggregationFns)==null?void 0:r[e.columnDef.aggregationFn])!=null?n:Br[e.columnDef.aggregationFn]}},createTable:e=>{e.setGrouping=t=>e.options.onGroupingChange==null?void 0:e.options.onGroupingChange(t),e.resetGrouping=t=>{var n,r;e.setGrouping(t?[]:(n=(r=e.initialState)==null?void 0:r.grouping)!=null?n:[])},e.getPreGroupedRowModel=()=>e.getFilteredRowModel(),e.getGroupedRowModel=()=>(!e._getGroupedRowModel&&e.options.getGroupedRowModel&&(e._getGroupedRowModel=e.options.getGroupedRowModel(e)),e.options.manualGrouping||!e._getGroupedRowModel?e.getPreGroupedRowModel():e._getGroupedRowModel())},createRow:(e,t)=>{e.getIsGrouped=()=>!!e.groupingColumnId,e.getGroupingValue=n=>{if(e._groupingValuesCache.hasOwnProperty(n))return e._groupingValuesCache[n];const r=t.getColumn(n);return r!=null&&r.columnDef.getGroupingValue?(e._groupingValuesCache[n]=r.columnDef.getGroupingValue(e.original),e._groupingValuesCache[n]):e.getValue(n)},e._groupingValuesCache={}},createCell:(e,t,n,r)=>{e.getIsGrouped=()=>t.getIsGrouped()&&t.id===n.groupingColumnId,e.getIsPlaceholder=()=>!e.getIsGrouped()&&t.getIsGrouped(),e.getIsAggregated=()=>{var o;return!e.getIsGrouped()&&!e.getIsPlaceholder()&&!!((o=n.subRows)!=null&&o.length)}}};function jm(e,t,n){if(!(t!=null&&t.length)||!n)return e;const r=e.filter(i=>!t.includes(i.id));return n==="remove"?r:[...t.map(i=>e.find(s=>s.id===i)).filter(Boolean),...r]}const Dm={getInitialState:e=>({columnOrder:[],...e}),getDefaultOptions:e=>({onColumnOrderChange:Be("columnOrder",e)}),createColumn:(e,t)=>{e.getIndex=Z(n=>[Sn(t,n)],n=>n.findIndex(r=>r.id===e.id),Q(t.options,"debugColumns","getIndex")),e.getIsFirstColumn=n=>{var r;return((r=Sn(t,n)[0])==null?void 0:r.id)===e.id},e.getIsLastColumn=n=>{var r;const o=Sn(t,n);return((r=o[o.length-1])==null?void 0:r.id)===e.id}},createTable:e=>{e.setColumnOrder=t=>e.options.onColumnOrderChange==null?void 0:e.options.onColumnOrderChange(t),e.resetColumnOrder=t=>{var n;e.setColumnOrder(t?[]:(n=e.initialState.columnOrder)!=null?n:[])},e._getOrderColumnsFn=Z(()=>[e.getState().columnOrder,e.getState().grouping,e.options.groupedColumnMode],(t,n,r)=>o=>{let i=[];if(!(t!=null&&t.length))i=o;else{const s=[...t],a=[...o];for(;a.length&&s.length;){const u=s.shift(),c=a.findIndex(d=>d.id===u);c>-1&&i.push(a.splice(c,1)[0])}i=[...i,...a]}return jm(i,n,r)},Q(e.options,"debugTable","_getOrderColumnsFn"))}},zr=()=>({left:[],right:[]}),Am={getInitialState:e=>({columnPinning:zr(),...e}),getDefaultOptions:e=>({onColumnPinningChange:Be("columnPinning",e)}),createColumn:(e,t)=>{e.pin=n=>{const r=e.getLeafColumns().map(o=>o.id).filter(Boolean);t.setColumnPinning(o=>{var i,s;if(n==="right"){var a,u;return{left:((a=o==null?void 0:o.left)!=null?a:[]).filter(g=>!(r!=null&&r.includes(g))),right:[...((u=o==null?void 0:o.right)!=null?u:[]).filter(g=>!(r!=null&&r.includes(g))),...r]}}if(n==="left"){var c,d;return{left:[...((c=o==null?void 0:o.left)!=null?c:[]).filter(g=>!(r!=null&&r.includes(g))),...r],right:((d=o==null?void 0:o.right)!=null?d:[]).filter(g=>!(r!=null&&r.includes(g)))}}return{left:((i=o==null?void 0:o.left)!=null?i:[]).filter(g=>!(r!=null&&r.includes(g))),right:((s=o==null?void 0:o.right)!=null?s:[]).filter(g=>!(r!=null&&r.includes(g)))}})},e.getCanPin=()=>e.getLeafColumns().some(r=>{var o,i,s;return((o=r.columnDef.enablePinning)!=null?o:!0)&&((i=(s=t.options.enableColumnPinning)!=null?s:t.options.enablePinning)!=null?i:!0)}),e.getIsPinned=()=>{const n=e.getLeafColumns().map(a=>a.id),{left:r,right:o}=t.getState().columnPinning,i=n.some(a=>r==null?void 0:r.includes(a)),s=n.some(a=>o==null?void 0:o.includes(a));return i?"left":s?"right":!1},e.getPinnedIndex=()=>{var n,r;const o=e.getIsPinned();return o?(n=(r=t.getState().columnPinning)==null||(r=r[o])==null?void 0:r.indexOf(e.id))!=null?n:-1:0}},createRow:(e,t)=>{e.getCenterVisibleCells=Z(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left,t.getState().columnPinning.right],(n,r,o)=>{const i=[...r??[],...o??[]];return n.filter(s=>!i.includes(s.column.id))},Q(t.options,"debugRows","getCenterVisibleCells")),e.getLeftVisibleCells=Z(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left],(n,r)=>(r??[]).map(i=>n.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"left"})),Q(t.options,"debugRows","getLeftVisibleCells")),e.getRightVisibleCells=Z(()=>[e._getAllVisibleCells(),t.getState().columnPinning.right],(n,r)=>(r??[]).map(i=>n.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"right"})),Q(t.options,"debugRows","getRightVisibleCells"))},createTable:e=>{e.setColumnPinning=t=>e.options.onColumnPinningChange==null?void 0:e.options.onColumnPinningChange(t),e.resetColumnPinning=t=>{var n,r;return e.setColumnPinning(t?zr():(n=(r=e.initialState)==null?void 0:r.columnPinning)!=null?n:zr())},e.getIsSomeColumnsPinned=t=>{var n;const r=e.getState().columnPinning;if(!t){var o,i;return!!((o=r.left)!=null&&o.length||(i=r.right)!=null&&i.length)}return!!((n=r[t])!=null&&n.length)},e.getLeftLeafColumns=Z(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left],(t,n)=>(n??[]).map(r=>t.find(o=>o.id===r)).filter(Boolean),Q(e.options,"debugColumns","getLeftLeafColumns")),e.getRightLeafColumns=Z(()=>[e.getAllLeafColumns(),e.getState().columnPinning.right],(t,n)=>(n??[]).map(r=>t.find(o=>o.id===r)).filter(Boolean),Q(e.options,"debugColumns","getRightLeafColumns")),e.getCenterLeafColumns=Z(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r)=>{const o=[...n??[],...r??[]];return t.filter(i=>!o.includes(i.id))},Q(e.options,"debugColumns","getCenterLeafColumns"))}},Un={size:150,minSize:20,maxSize:Number.MAX_SAFE_INTEGER},Hr=()=>({startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,isResizingColumn:!1,columnSizingStart:[]}),Fm={getDefaultColumnDef:()=>Un,getInitialState:e=>({columnSizing:{},columnSizingInfo:Hr(),...e}),getDefaultOptions:e=>({columnResizeMode:"onEnd",columnResizeDirection:"ltr",onColumnSizingChange:Be("columnSizing",e),onColumnSizingInfoChange:Be("columnSizingInfo",e)}),createColumn:(e,t)=>{e.getSize=()=>{var n,r,o;const i=t.getState().columnSizing[e.id];return Math.min(Math.max((n=e.columnDef.minSize)!=null?n:Un.minSize,(r=i??e.columnDef.size)!=null?r:Un.size),(o=e.columnDef.maxSize)!=null?o:Un.maxSize)},e.getStart=Z(n=>[n,Sn(t,n),t.getState().columnSizing],(n,r)=>r.slice(0,e.getIndex(n)).reduce((o,i)=>o+i.getSize(),0),Q(t.options,"debugColumns","getStart")),e.getAfter=Z(n=>[n,Sn(t,n),t.getState().columnSizing],(n,r)=>r.slice(e.getIndex(n)+1).reduce((o,i)=>o+i.getSize(),0),Q(t.options,"debugColumns","getAfter")),e.resetSize=()=>{t.setColumnSizing(n=>{let{[e.id]:r,...o}=n;return o})},e.getCanResize=()=>{var n,r;return((n=e.columnDef.enableResizing)!=null?n:!0)&&((r=t.options.enableColumnResizing)!=null?r:!0)},e.getIsResizing=()=>t.getState().columnSizingInfo.isResizingColumn===e.id},createHeader:(e,t)=>{e.getSize=()=>{let n=0;const r=o=>{if(o.subHeaders.length)o.subHeaders.forEach(r);else{var i;n+=(i=o.column.getSize())!=null?i:0}};return r(e),n},e.getStart=()=>{if(e.index>0){const n=e.headerGroup.headers[e.index-1];return n.getStart()+n.getSize()}return 0},e.getResizeHandler=n=>{const r=t.getColumn(e.column.id),o=r==null?void 0:r.getCanResize();return i=>{if(!r||!o||(i.persist==null||i.persist(),Gr(i)&&i.touches&&i.touches.length>1))return;const s=e.getSize(),a=e?e.getLeafHeaders().map(y=>[y.column.id,y.column.getSize()]):[[r.id,r.getSize()]],u=Gr(i)?Math.round(i.touches[0].clientX):i.clientX,c={},d=(y,P)=>{typeof P=="number"&&(t.setColumnSizingInfo(x=>{var S,w;const E=t.options.columnResizeDirection==="rtl"?-1:1,$=(P-((S=x==null?void 0:x.startOffset)!=null?S:0))*E,j=Math.max($/((w=x==null?void 0:x.startSize)!=null?w:0),-.999999);return x.columnSizingStart.forEach(D=>{let[B,C]=D;c[B]=Math.round(Math.max(C+C*j,0)*100)/100}),{...x,deltaOffset:$,deltaPercentage:j}}),(t.options.columnResizeMode==="onChange"||y==="end")&&t.setColumnSizing(x=>({...x,...c})))},g=y=>d("move",y),p=y=>{d("end",y),t.setColumnSizingInfo(P=>({...P,isResizingColumn:!1,startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,columnSizingStart:[]}))},f=n||typeof document<"u"?document:null,h={moveHandler:y=>g(y.clientX),upHandler:y=>{f==null||f.removeEventListener("mousemove",h.moveHandler),f==null||f.removeEventListener("mouseup",h.upHandler),p(y.clientX)}},m={moveHandler:y=>(y.cancelable&&(y.preventDefault(),y.stopPropagation()),g(y.touches[0].clientX),!1),upHandler:y=>{var P;f==null||f.removeEventListener("touchmove",m.moveHandler),f==null||f.removeEventListener("touchend",m.upHandler),y.cancelable&&(y.preventDefault(),y.stopPropagation()),p((P=y.touches[0])==null?void 0:P.clientX)}},v=Vm()?{passive:!1}:!1;Gr(i)?(f==null||f.addEventListener("touchmove",m.moveHandler,v),f==null||f.addEventListener("touchend",m.upHandler,v)):(f==null||f.addEventListener("mousemove",h.moveHandler,v),f==null||f.addEventListener("mouseup",h.upHandler,v)),t.setColumnSizingInfo(y=>({...y,startOffset:u,startSize:s,deltaOffset:0,deltaPercentage:0,columnSizingStart:a,isResizingColumn:r.id}))}}},createTable:e=>{e.setColumnSizing=t=>e.options.onColumnSizingChange==null?void 0:e.options.onColumnSizingChange(t),e.setColumnSizingInfo=t=>e.options.onColumnSizingInfoChange==null?void 0:e.options.onColumnSizingInfoChange(t),e.resetColumnSizing=t=>{var n;e.setColumnSizing(t?{}:(n=e.initialState.columnSizing)!=null?n:{})},e.resetHeaderSizeInfo=t=>{var n;e.setColumnSizingInfo(t?Hr():(n=e.initialState.columnSizingInfo)!=null?n:Hr())},e.getTotalSize=()=>{var t,n;return(t=(n=e.getHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getLeftTotalSize=()=>{var t,n;return(t=(n=e.getLeftHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getCenterTotalSize=()=>{var t,n;return(t=(n=e.getCenterHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getRightTotalSize=()=>{var t,n;return(t=(n=e.getRightHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0}}};let qn=null;function Vm(){if(typeof qn=="boolean")return qn;let e=!1;try{const t={get passive(){return e=!0,!1}},n=()=>{};window.addEventListener("test",n,t),window.removeEventListener("test",n)}catch{e=!1}return qn=e,qn}function Gr(e){return e.type==="touchstart"}const Lm={getInitialState:e=>({columnVisibility:{},...e}),getDefaultOptions:e=>({onColumnVisibilityChange:Be("columnVisibility",e)}),createColumn:(e,t)=>{e.toggleVisibility=n=>{e.getCanHide()&&t.setColumnVisibility(r=>({...r,[e.id]:n??!e.getIsVisible()}))},e.getIsVisible=()=>{var n,r;const o=e.columns;return(n=o.length?o.some(i=>i.getIsVisible()):(r=t.getState().columnVisibility)==null?void 0:r[e.id])!=null?n:!0},e.getCanHide=()=>{var n,r;return((n=e.columnDef.enableHiding)!=null?n:!0)&&((r=t.options.enableHiding)!=null?r:!0)},e.getToggleVisibilityHandler=()=>n=>{e.toggleVisibility==null||e.toggleVisibility(n.target.checked)}},createRow:(e,t)=>{e._getAllVisibleCells=Z(()=>[e.getAllCells(),t.getState().columnVisibility],n=>n.filter(r=>r.column.getIsVisible()),Q(t.options,"debugRows","_getAllVisibleCells")),e.getVisibleCells=Z(()=>[e.getLeftVisibleCells(),e.getCenterVisibleCells(),e.getRightVisibleCells()],(n,r,o)=>[...n,...r,...o],Q(t.options,"debugRows","getVisibleCells"))},createTable:e=>{const t=(n,r)=>Z(()=>[r(),r().filter(o=>o.getIsVisible()).map(o=>o.id).join("_")],o=>o.filter(i=>i.getIsVisible==null?void 0:i.getIsVisible()),Q(e.options,"debugColumns",n));e.getVisibleFlatColumns=t("getVisibleFlatColumns",()=>e.getAllFlatColumns()),e.getVisibleLeafColumns=t("getVisibleLeafColumns",()=>e.getAllLeafColumns()),e.getLeftVisibleLeafColumns=t("getLeftVisibleLeafColumns",()=>e.getLeftLeafColumns()),e.getRightVisibleLeafColumns=t("getRightVisibleLeafColumns",()=>e.getRightLeafColumns()),e.getCenterVisibleLeafColumns=t("getCenterVisibleLeafColumns",()=>e.getCenterLeafColumns()),e.setColumnVisibility=n=>e.options.onColumnVisibilityChange==null?void 0:e.options.onColumnVisibilityChange(n),e.resetColumnVisibility=n=>{var r;e.setColumnVisibility(n?{}:(r=e.initialState.columnVisibility)!=null?r:{})},e.toggleAllColumnsVisible=n=>{var r;n=(r=n)!=null?r:!e.getIsAllColumnsVisible(),e.setColumnVisibility(e.getAllLeafColumns().reduce((o,i)=>({...o,[i.id]:n||!(i.getCanHide!=null&&i.getCanHide())}),{}))},e.getIsAllColumnsVisible=()=>!e.getAllLeafColumns().some(n=>!(n.getIsVisible!=null&&n.getIsVisible())),e.getIsSomeColumnsVisible=()=>e.getAllLeafColumns().some(n=>n.getIsVisible==null?void 0:n.getIsVisible()),e.getToggleAllColumnsVisibilityHandler=()=>n=>{var r;e.toggleAllColumnsVisible((r=n.target)==null?void 0:r.checked)}}};function Sn(e,t){return t?t==="center"?e.getCenterVisibleLeafColumns():t==="left"?e.getLeftVisibleLeafColumns():e.getRightVisibleLeafColumns():e.getVisibleLeafColumns()}const Bm={createTable:e=>{e._getGlobalFacetedRowModel=e.options.getFacetedRowModel&&e.options.getFacetedRowModel(e,"__global__"),e.getGlobalFacetedRowModel=()=>e.options.manualFiltering||!e._getGlobalFacetedRowModel?e.getPreFilteredRowModel():e._getGlobalFacetedRowModel(),e._getGlobalFacetedUniqueValues=e.options.getFacetedUniqueValues&&e.options.getFacetedUniqueValues(e,"__global__"),e.getGlobalFacetedUniqueValues=()=>e._getGlobalFacetedUniqueValues?e._getGlobalFacetedUniqueValues():new Map,e._getGlobalFacetedMinMaxValues=e.options.getFacetedMinMaxValues&&e.options.getFacetedMinMaxValues(e,"__global__"),e.getGlobalFacetedMinMaxValues=()=>{if(e._getGlobalFacetedMinMaxValues)return e._getGlobalFacetedMinMaxValues()}}},zm={getInitialState:e=>({globalFilter:void 0,...e}),getDefaultOptions:e=>({onGlobalFilterChange:Be("globalFilter",e),globalFilterFn:"auto",getColumnCanGlobalFilter:t=>{var n;const r=(n=e.getCoreRowModel().flatRows[0])==null||(n=n._getAllCellsByColumnId()[t.id])==null?void 0:n.getValue();return typeof r=="string"||typeof r=="number"}}),createColumn:(e,t)=>{e.getCanGlobalFilter=()=>{var n,r,o,i;return((n=e.columnDef.enableGlobalFilter)!=null?n:!0)&&((r=t.options.enableGlobalFilter)!=null?r:!0)&&((o=t.options.enableFilters)!=null?o:!0)&&((i=t.options.getColumnCanGlobalFilter==null?void 0:t.options.getColumnCanGlobalFilter(e))!=null?i:!0)&&!!e.accessorFn}},createTable:e=>{e.getGlobalAutoFilterFn=()=>st.includesString,e.getGlobalFilterFn=()=>{var t,n;const{globalFilterFn:r}=e.options;return xr(r)?r:r==="auto"?e.getGlobalAutoFilterFn():(t=(n=e.options.filterFns)==null?void 0:n[r])!=null?t:st[r]},e.setGlobalFilter=t=>{e.options.onGlobalFilterChange==null||e.options.onGlobalFilterChange(t)},e.resetGlobalFilter=t=>{e.setGlobalFilter(t?void 0:e.initialState.globalFilter)}}},Hm={getInitialState:e=>({expanded:{},...e}),getDefaultOptions:e=>({onExpandedChange:Be("expanded",e),paginateExpandedRows:!0}),createTable:e=>{let t=!1,n=!1;e._autoResetExpanded=()=>{var r,o;if(!t){e._queue(()=>{t=!0});return}if((r=(o=e.options.autoResetAll)!=null?o:e.options.autoResetExpanded)!=null?r:!e.options.manualExpanding){if(n)return;n=!0,e._queue(()=>{e.resetExpanded(),n=!1})}},e.setExpanded=r=>e.options.onExpandedChange==null?void 0:e.options.onExpandedChange(r),e.toggleAllRowsExpanded=r=>{r??!e.getIsAllRowsExpanded()?e.setExpanded(!0):e.setExpanded({})},e.resetExpanded=r=>{var o,i;e.setExpanded(r?{}:(o=(i=e.initialState)==null?void 0:i.expanded)!=null?o:{})},e.getCanSomeRowsExpand=()=>e.getPrePaginationRowModel().flatRows.some(r=>r.getCanExpand()),e.getToggleAllRowsExpandedHandler=()=>r=>{r.persist==null||r.persist(),e.toggleAllRowsExpanded()},e.getIsSomeRowsExpanded=()=>{const r=e.getState().expanded;return r===!0||Object.values(r).some(Boolean)},e.getIsAllRowsExpanded=()=>{const r=e.getState().expanded;return typeof r=="boolean"?r===!0:!(!Object.keys(r).length||e.getRowModel().flatRows.some(o=>!o.getIsExpanded()))},e.getExpandedDepth=()=>{let r=0;return(e.getState().expanded===!0?Object.keys(e.getRowModel().rowsById):Object.keys(e.getState().expanded)).forEach(i=>{const s=i.split(".");r=Math.max(r,s.length)}),r},e.getPreExpandedRowModel=()=>e.getSortedRowModel(),e.getExpandedRowModel=()=>(!e._getExpandedRowModel&&e.options.getExpandedRowModel&&(e._getExpandedRowModel=e.options.getExpandedRowModel(e)),e.options.manualExpanding||!e._getExpandedRowModel?e.getPreExpandedRowModel():e._getExpandedRowModel())},createRow:(e,t)=>{e.toggleExpanded=n=>{t.setExpanded(r=>{var o;const i=r===!0?!0:!!(r!=null&&r[e.id]);let s={};if(r===!0?Object.keys(t.getRowModel().rowsById).forEach(a=>{s[a]=!0}):s=r,n=(o=n)!=null?o:!i,!i&&n)return{...s,[e.id]:!0};if(i&&!n){const{[e.id]:a,...u}=s;return u}return r})},e.getIsExpanded=()=>{var n;const r=t.getState().expanded;return!!((n=t.options.getIsRowExpanded==null?void 0:t.options.getIsRowExpanded(e))!=null?n:r===!0||r!=null&&r[e.id])},e.getCanExpand=()=>{var n,r,o;return(n=t.options.getRowCanExpand==null?void 0:t.options.getRowCanExpand(e))!=null?n:((r=t.options.enableExpanding)!=null?r:!0)&&!!((o=e.subRows)!=null&&o.length)},e.getIsAllParentsExpanded=()=>{let n=!0,r=e;for(;n&&r.parentId;)r=t.getRow(r.parentId,!0),n=r.getIsExpanded();return n},e.getToggleExpandedHandler=()=>{const n=e.getCanExpand();return()=>{n&&e.toggleExpanded()}}}},uo=0,co=10,Ur=()=>({pageIndex:uo,pageSize:co}),Gm={getInitialState:e=>({...e,pagination:{...Ur(),...e==null?void 0:e.pagination}}),getDefaultOptions:e=>({onPaginationChange:Be("pagination",e)}),createTable:e=>{let t=!1,n=!1;e._autoResetPageIndex=()=>{var r,o;if(!t){e._queue(()=>{t=!0});return}if((r=(o=e.options.autoResetAll)!=null?o:e.options.autoResetPageIndex)!=null?r:!e.options.manualPagination){if(n)return;n=!0,e._queue(()=>{e.resetPageIndex(),n=!1})}},e.setPagination=r=>{const o=i=>ht(r,i);return e.options.onPaginationChange==null?void 0:e.options.onPaginationChange(o)},e.resetPagination=r=>{var o;e.setPagination(r?Ur():(o=e.initialState.pagination)!=null?o:Ur())},e.setPageIndex=r=>{e.setPagination(o=>{let i=ht(r,o.pageIndex);const s=typeof e.options.pageCount>"u"||e.options.pageCount===-1?Number.MAX_SAFE_INTEGER:e.options.pageCount-1;return i=Math.max(0,Math.min(i,s)),{...o,pageIndex:i}})},e.resetPageIndex=r=>{var o,i;e.setPageIndex(r?uo:(o=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageIndex)!=null?o:uo)},e.resetPageSize=r=>{var o,i;e.setPageSize(r?co:(o=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageSize)!=null?o:co)},e.setPageSize=r=>{e.setPagination(o=>{const i=Math.max(1,ht(r,o.pageSize)),s=o.pageSize*o.pageIndex,a=Math.floor(s/i);return{...o,pageIndex:a,pageSize:i}})},e.setPageCount=r=>e.setPagination(o=>{var i;let s=ht(r,(i=e.options.pageCount)!=null?i:-1);return typeof s=="number"&&(s=Math.max(-1,s)),{...o,pageCount:s}}),e.getPageOptions=Z(()=>[e.getPageCount()],r=>{let o=[];return r&&r>0&&(o=[...new Array(r)].fill(null).map((i,s)=>s)),o},Q(e.options,"debugTable","getPageOptions")),e.getCanPreviousPage=()=>e.getState().pagination.pageIndex>0,e.getCanNextPage=()=>{const{pageIndex:r}=e.getState().pagination,o=e.getPageCount();return o===-1?!0:o===0?!1:r<o-1},e.previousPage=()=>e.setPageIndex(r=>r-1),e.nextPage=()=>e.setPageIndex(r=>r+1),e.firstPage=()=>e.setPageIndex(0),e.lastPage=()=>e.setPageIndex(e.getPageCount()-1),e.getPrePaginationRowModel=()=>e.getExpandedRowModel(),e.getPaginationRowModel=()=>(!e._getPaginationRowModel&&e.options.getPaginationRowModel&&(e._getPaginationRowModel=e.options.getPaginationRowModel(e)),e.options.manualPagination||!e._getPaginationRowModel?e.getPrePaginationRowModel():e._getPaginationRowModel()),e.getPageCount=()=>{var r;return(r=e.options.pageCount)!=null?r:Math.ceil(e.getRowCount()/e.getState().pagination.pageSize)},e.getRowCount=()=>{var r;return(r=e.options.rowCount)!=null?r:e.getPrePaginationRowModel().rows.length}}},qr=()=>({top:[],bottom:[]}),Um={getInitialState:e=>({rowPinning:qr(),...e}),getDefaultOptions:e=>({onRowPinningChange:Be("rowPinning",e)}),createRow:(e,t)=>{e.pin=(n,r,o)=>{const i=r?e.getLeafRows().map(u=>{let{id:c}=u;return c}):[],s=o?e.getParentRows().map(u=>{let{id:c}=u;return c}):[],a=new Set([...s,e.id,...i]);t.setRowPinning(u=>{var c,d;if(n==="bottom"){var g,p;return{top:((g=u==null?void 0:u.top)!=null?g:[]).filter(m=>!(a!=null&&a.has(m))),bottom:[...((p=u==null?void 0:u.bottom)!=null?p:[]).filter(m=>!(a!=null&&a.has(m))),...Array.from(a)]}}if(n==="top"){var f,h;return{top:[...((f=u==null?void 0:u.top)!=null?f:[]).filter(m=>!(a!=null&&a.has(m))),...Array.from(a)],bottom:((h=u==null?void 0:u.bottom)!=null?h:[]).filter(m=>!(a!=null&&a.has(m)))}}return{top:((c=u==null?void 0:u.top)!=null?c:[]).filter(m=>!(a!=null&&a.has(m))),bottom:((d=u==null?void 0:u.bottom)!=null?d:[]).filter(m=>!(a!=null&&a.has(m)))}})},e.getCanPin=()=>{var n;const{enableRowPinning:r,enablePinning:o}=t.options;return typeof r=="function"?r(e):(n=r??o)!=null?n:!0},e.getIsPinned=()=>{const n=[e.id],{top:r,bottom:o}=t.getState().rowPinning,i=n.some(a=>r==null?void 0:r.includes(a)),s=n.some(a=>o==null?void 0:o.includes(a));return i?"top":s?"bottom":!1},e.getPinnedIndex=()=>{var n,r;const o=e.getIsPinned();if(!o)return-1;const i=(n=t._getPinnedRows(o))==null?void 0:n.map(s=>{let{id:a}=s;return a});return(r=i==null?void 0:i.indexOf(e.id))!=null?r:-1}},createTable:e=>{e.setRowPinning=t=>e.options.onRowPinningChange==null?void 0:e.options.onRowPinningChange(t),e.resetRowPinning=t=>{var n,r;return e.setRowPinning(t?qr():(n=(r=e.initialState)==null?void 0:r.rowPinning)!=null?n:qr())},e.getIsSomeRowsPinned=t=>{var n;const r=e.getState().rowPinning;if(!t){var o,i;return!!((o=r.top)!=null&&o.length||(i=r.bottom)!=null&&i.length)}return!!((n=r[t])!=null&&n.length)},e._getPinnedRows=Z(t=>[e.getRowModel().rows,e.getState().rowPinning[t],t],(t,n,r)=>{var o;return((o=e.options.keepPinnedRows)==null||o?(n??[]).map(s=>{const a=e.getRow(s,!0);return a.getIsAllParentsExpanded()?a:null}):(n??[]).map(s=>t.find(a=>a.id===s))).filter(Boolean).map(s=>({...s,position:r}))},Q(e.options,"debugRows","_getPinnedRows")),e.getTopRows=()=>e._getPinnedRows("top"),e.getBottomRows=()=>e._getPinnedRows("bottom"),e.getCenterRows=Z(()=>[e.getRowModel().rows,e.getState().rowPinning.top,e.getState().rowPinning.bottom],(t,n,r)=>{const o=new Set([...n??[],...r??[]]);return t.filter(i=>!o.has(i.id))},Q(e.options,"debugRows","getCenterRows"))}},qm={getInitialState:e=>({rowSelection:{},...e}),getDefaultOptions:e=>({onRowSelectionChange:Be("rowSelection",e),enableRowSelection:!0,enableMultiRowSelection:!0,enableSubRowSelection:!0}),createTable:e=>{e.setRowSelection=t=>e.options.onRowSelectionChange==null?void 0:e.options.onRowSelectionChange(t),e.resetRowSelection=t=>{var n;return e.setRowSelection(t?{}:(n=e.initialState.rowSelection)!=null?n:{})},e.toggleAllRowsSelected=t=>{e.setRowSelection(n=>{t=typeof t<"u"?t:!e.getIsAllRowsSelected();const r={...n},o=e.getPreGroupedRowModel().flatRows;return t?o.forEach(i=>{i.getCanSelect()&&(r[i.id]=!0)}):o.forEach(i=>{delete r[i.id]}),r})},e.toggleAllPageRowsSelected=t=>e.setRowSelection(n=>{const r=typeof t<"u"?t:!e.getIsAllPageRowsSelected(),o={...n};return e.getRowModel().rows.forEach(i=>{po(o,i.id,r,!0,e)}),o}),e.getPreSelectedRowModel=()=>e.getCoreRowModel(),e.getSelectedRowModel=Z(()=>[e.getState().rowSelection,e.getCoreRowModel()],(t,n)=>Object.keys(t).length?Wr(e,n):{rows:[],flatRows:[],rowsById:{}},Q(e.options,"debugTable","getSelectedRowModel")),e.getFilteredSelectedRowModel=Z(()=>[e.getState().rowSelection,e.getFilteredRowModel()],(t,n)=>Object.keys(t).length?Wr(e,n):{rows:[],flatRows:[],rowsById:{}},Q(e.options,"debugTable","getFilteredSelectedRowModel")),e.getGroupedSelectedRowModel=Z(()=>[e.getState().rowSelection,e.getSortedRowModel()],(t,n)=>Object.keys(t).length?Wr(e,n):{rows:[],flatRows:[],rowsById:{}},Q(e.options,"debugTable","getGroupedSelectedRowModel")),e.getIsAllRowsSelected=()=>{const t=e.getFilteredRowModel().flatRows,{rowSelection:n}=e.getState();let r=!!(t.length&&Object.keys(n).length);return r&&t.some(o=>o.getCanSelect()&&!n[o.id])&&(r=!1),r},e.getIsAllPageRowsSelected=()=>{const t=e.getPaginationRowModel().flatRows.filter(o=>o.getCanSelect()),{rowSelection:n}=e.getState();let r=!!t.length;return r&&t.some(o=>!n[o.id])&&(r=!1),r},e.getIsSomeRowsSelected=()=>{var t;const n=Object.keys((t=e.getState().rowSelection)!=null?t:{}).length;return n>0&&n<e.getFilteredRowModel().flatRows.length},e.getIsSomePageRowsSelected=()=>{const t=e.getPaginationRowModel().flatRows;return e.getIsAllPageRowsSelected()?!1:t.filter(n=>n.getCanSelect()).some(n=>n.getIsSelected()||n.getIsSomeSelected())},e.getToggleAllRowsSelectedHandler=()=>t=>{e.toggleAllRowsSelected(t.target.checked)},e.getToggleAllPageRowsSelectedHandler=()=>t=>{e.toggleAllPageRowsSelected(t.target.checked)}},createRow:(e,t)=>{e.toggleSelected=(n,r)=>{const o=e.getIsSelected();t.setRowSelection(i=>{var s;if(n=typeof n<"u"?n:!o,e.getCanSelect()&&o===n)return i;const a={...i};return po(a,e.id,n,(s=r==null?void 0:r.selectChildren)!=null?s:!0,t),a})},e.getIsSelected=()=>{const{rowSelection:n}=t.getState();return Xo(e,n)},e.getIsSomeSelected=()=>{const{rowSelection:n}=t.getState();return fo(e,n)==="some"},e.getIsAllSubRowsSelected=()=>{const{rowSelection:n}=t.getState();return fo(e,n)==="all"},e.getCanSelect=()=>{var n;return typeof t.options.enableRowSelection=="function"?t.options.enableRowSelection(e):(n=t.options.enableRowSelection)!=null?n:!0},e.getCanSelectSubRows=()=>{var n;return typeof t.options.enableSubRowSelection=="function"?t.options.enableSubRowSelection(e):(n=t.options.enableSubRowSelection)!=null?n:!0},e.getCanMultiSelect=()=>{var n;return typeof t.options.enableMultiRowSelection=="function"?t.options.enableMultiRowSelection(e):(n=t.options.enableMultiRowSelection)!=null?n:!0},e.getToggleSelectedHandler=()=>{const n=e.getCanSelect();return r=>{var o;n&&e.toggleSelected((o=r.target)==null?void 0:o.checked)}}}},po=(e,t,n,r,o)=>{var i;const s=o.getRow(t,!0);n?(s.getCanMultiSelect()||Object.keys(e).forEach(a=>delete e[a]),s.getCanSelect()&&(e[t]=!0)):delete e[t],r&&(i=s.subRows)!=null&&i.length&&s.getCanSelectSubRows()&&s.subRows.forEach(a=>po(e,a.id,n,r,o))};function Wr(e,t){const n=e.getState().rowSelection,r=[],o={},i=function(s,a){return s.map(u=>{var c;const d=Xo(u,n);if(d&&(r.push(u),o[u.id]=u),(c=u.subRows)!=null&&c.length&&(u={...u,subRows:i(u.subRows)}),d)return u}).filter(Boolean)};return{rows:i(t.rows),flatRows:r,rowsById:o}}function Xo(e,t){var n;return(n=t[e.id])!=null?n:!1}function fo(e,t,n){var r;if(!((r=e.subRows)!=null&&r.length))return!1;let o=!0,i=!1;return e.subRows.forEach(s=>{if(!(i&&!o)&&(s.getCanSelect()&&(Xo(s,t)?i=!0:o=!1),s.subRows&&s.subRows.length)){const a=fo(s,t);a==="all"?i=!0:(a==="some"&&(i=!0),o=!1)}}),o?"all":i?"some":!1}const go=/([0-9]+)/gm,Wm=(e,t,n)=>Ga(vt(e.getValue(n)).toLowerCase(),vt(t.getValue(n)).toLowerCase()),Xm=(e,t,n)=>Ga(vt(e.getValue(n)),vt(t.getValue(n))),Ym=(e,t,n)=>Yo(vt(e.getValue(n)).toLowerCase(),vt(t.getValue(n)).toLowerCase()),Km=(e,t,n)=>Yo(vt(e.getValue(n)),vt(t.getValue(n))),Jm=(e,t,n)=>{const r=e.getValue(n),o=t.getValue(n);return r>o?1:r<o?-1:0},Zm=(e,t,n)=>Yo(e.getValue(n),t.getValue(n));function Yo(e,t){return e===t?0:e>t?1:-1}function vt(e){return typeof e=="number"?isNaN(e)||e===1/0||e===-1/0?"":String(e):typeof e=="string"?e:""}function Ga(e,t){const n=e.split(go).filter(Boolean),r=t.split(go).filter(Boolean);for(;n.length&&r.length;){const o=n.shift(),i=r.shift(),s=parseInt(o,10),a=parseInt(i,10),u=[s,a].sort();if(isNaN(u[0])){if(o>i)return 1;if(i>o)return-1;continue}if(isNaN(u[1]))return isNaN(s)?-1:1;if(s>a)return 1;if(a>s)return-1}return n.length-r.length}const dn={alphanumeric:Wm,alphanumericCaseSensitive:Xm,text:Ym,textCaseSensitive:Km,datetime:Jm,basic:Zm},Qm={getInitialState:e=>({sorting:[],...e}),getDefaultColumnDef:()=>({sortingFn:"auto",sortUndefined:1}),getDefaultOptions:e=>({onSortingChange:Be("sorting",e),isMultiSortEvent:t=>t.shiftKey}),createColumn:(e,t)=>{e.getAutoSortingFn=()=>{const n=t.getFilteredRowModel().flatRows.slice(10);let r=!1;for(const o of n){const i=o==null?void 0:o.getValue(e.id);if(Object.prototype.toString.call(i)==="[object Date]")return dn.datetime;if(typeof i=="string"&&(r=!0,i.split(go).length>1))return dn.alphanumeric}return r?dn.text:dn.basic},e.getAutoSortDir=()=>{const n=t.getFilteredRowModel().flatRows[0];return typeof(n==null?void 0:n.getValue(e.id))=="string"?"asc":"desc"},e.getSortingFn=()=>{var n,r;if(!e)throw new Error;return xr(e.columnDef.sortingFn)?e.columnDef.sortingFn:e.columnDef.sortingFn==="auto"?e.getAutoSortingFn():(n=(r=t.options.sortingFns)==null?void 0:r[e.columnDef.sortingFn])!=null?n:dn[e.columnDef.sortingFn]},e.toggleSorting=(n,r)=>{const o=e.getNextSortingOrder(),i=typeof n<"u"&&n!==null;t.setSorting(s=>{const a=s==null?void 0:s.find(f=>f.id===e.id),u=s==null?void 0:s.findIndex(f=>f.id===e.id);let c=[],d,g=i?n:o==="desc";if(s!=null&&s.length&&e.getCanMultiSort()&&r?a?d="toggle":d="add":s!=null&&s.length&&u!==s.length-1?d="replace":a?d="toggle":d="replace",d==="toggle"&&(i||o||(d="remove")),d==="add"){var p;c=[...s,{id:e.id,desc:g}],c.splice(0,c.length-((p=t.options.maxMultiSortColCount)!=null?p:Number.MAX_SAFE_INTEGER))}else d==="toggle"?c=s.map(f=>f.id===e.id?{...f,desc:g}:f):d==="remove"?c=s.filter(f=>f.id!==e.id):c=[{id:e.id,desc:g}];return c})},e.getFirstSortDir=()=>{var n,r;return((n=(r=e.columnDef.sortDescFirst)!=null?r:t.options.sortDescFirst)!=null?n:e.getAutoSortDir()==="desc")?"desc":"asc"},e.getNextSortingOrder=n=>{var r,o;const i=e.getFirstSortDir(),s=e.getIsSorted();return s?s!==i&&((r=t.options.enableSortingRemoval)==null||r)&&(!(n&&(o=t.options.enableMultiRemove)!=null)||o)?!1:s==="desc"?"asc":"desc":i},e.getCanSort=()=>{var n,r;return((n=e.columnDef.enableSorting)!=null?n:!0)&&((r=t.options.enableSorting)!=null?r:!0)&&!!e.accessorFn},e.getCanMultiSort=()=>{var n,r;return(n=(r=e.columnDef.enableMultiSort)!=null?r:t.options.enableMultiSort)!=null?n:!!e.accessorFn},e.getIsSorted=()=>{var n;const r=(n=t.getState().sorting)==null?void 0:n.find(o=>o.id===e.id);return r?r.desc?"desc":"asc":!1},e.getSortIndex=()=>{var n,r;return(n=(r=t.getState().sorting)==null?void 0:r.findIndex(o=>o.id===e.id))!=null?n:-1},e.clearSorting=()=>{t.setSorting(n=>n!=null&&n.length?n.filter(r=>r.id!==e.id):[])},e.getToggleSortingHandler=()=>{const n=e.getCanSort();return r=>{n&&(r.persist==null||r.persist(),e.toggleSorting==null||e.toggleSorting(void 0,e.getCanMultiSort()?t.options.isMultiSortEvent==null?void 0:t.options.isMultiSortEvent(r):!1))}}},createTable:e=>{e.setSorting=t=>e.options.onSortingChange==null?void 0:e.options.onSortingChange(t),e.resetSorting=t=>{var n,r;e.setSorting(t?[]:(n=(r=e.initialState)==null?void 0:r.sorting)!=null?n:[])},e.getPreSortedRowModel=()=>e.getGroupedRowModel(),e.getSortedRowModel=()=>(!e._getSortedRowModel&&e.options.getSortedRowModel&&(e._getSortedRowModel=e.options.getSortedRowModel(e)),e.options.manualSorting||!e._getSortedRowModel?e.getPreSortedRowModel():e._getSortedRowModel())}},eh=[Sm,Lm,Dm,Am,Cm,Em,Bm,zm,Qm,Im,Hm,Gm,Um,qm,Fm];function th(e){var t,n;process.env.NODE_ENV!=="production"&&(e.debugAll||e.debugTable)&&console.info("Creating Table Instance...");const r=[...eh,...(t=e._features)!=null?t:[]];let o={_features:r};const i=o._features.reduce((p,f)=>Object.assign(p,f.getDefaultOptions==null?void 0:f.getDefaultOptions(o)),{}),s=p=>o.options.mergeOptions?o.options.mergeOptions(i,p):{...i,...p};let u={...{},...(n=e.initialState)!=null?n:{}};o._features.forEach(p=>{var f;u=(f=p.getInitialState==null?void 0:p.getInitialState(u))!=null?f:u});const c=[];let d=!1;const g={_features:r,options:{...i,...e},initialState:u,_queue:p=>{c.push(p),d||(d=!0,Promise.resolve().then(()=>{for(;c.length;)c.shift()();d=!1}).catch(f=>setTimeout(()=>{throw f})))},reset:()=>{o.setState(o.initialState)},setOptions:p=>{const f=ht(p,o.options);o.options=s(f)},getState:()=>o.options.state,setState:p=>{o.options.onStateChange==null||o.options.onStateChange(p)},_getRowId:(p,f,h)=>{var m;return(m=o.options.getRowId==null?void 0:o.options.getRowId(p,f,h))!=null?m:`${h?[h.id,f].join("."):f}`},getCoreRowModel:()=>(o._getCoreRowModel||(o._getCoreRowModel=o.options.getCoreRowModel(o)),o._getCoreRowModel()),getRowModel:()=>o.getPaginationRowModel(),getRow:(p,f)=>{let h=(f?o.getPrePaginationRowModel():o.getRowModel()).rowsById[p];if(!h&&(h=o.getCoreRowModel().rowsById[p],!h))throw process.env.NODE_ENV!=="production"?new Error(`getRow could not find row with ID: ${p}`):new Error;return h},_getDefaultColumnDef:Z(()=>[o.options.defaultColumn],p=>{var f;return p=(f=p)!=null?f:{},{header:h=>{const m=h.header.column.columnDef;return m.accessorKey?m.accessorKey:m.accessorFn?m.id:null},cell:h=>{var m,v;return(m=(v=h.renderValue())==null||v.toString==null?void 0:v.toString())!=null?m:null},...o._features.reduce((h,m)=>Object.assign(h,m.getDefaultColumnDef==null?void 0:m.getDefaultColumnDef()),{}),...p}},Q(e,"debugColumns","_getDefaultColumnDef")),_getColumnDefs:()=>o.options.columns,getAllColumns:Z(()=>[o._getColumnDefs()],p=>{const f=function(h,m,v){return v===void 0&&(v=0),h.map(y=>{const P=xm(o,y,v,m),x=y;return P.columns=x.columns?f(x.columns,P,v+1):[],P})};return f(p)},Q(e,"debugColumns","getAllColumns")),getAllFlatColumns:Z(()=>[o.getAllColumns()],p=>p.flatMap(f=>f.getFlatColumns()),Q(e,"debugColumns","getAllFlatColumns")),_getAllFlatColumnsById:Z(()=>[o.getAllFlatColumns()],p=>p.reduce((f,h)=>(f[h.id]=h,f),{}),Q(e,"debugColumns","getAllFlatColumnsById")),getAllLeafColumns:Z(()=>[o.getAllColumns(),o._getOrderColumnsFn()],(p,f)=>{let h=p.flatMap(m=>m.getLeafColumns());return f(h)},Q(e,"debugColumns","getAllLeafColumns")),getColumn:p=>{const f=o._getAllFlatColumnsById()[p];return process.env.NODE_ENV!=="production"&&!f&&console.error(`[Table] Column with id '${p}' does not exist.`),f}};Object.assign(o,g);for(let p=0;p<o._features.length;p++){const f=o._features[p];f==null||f.createTable==null||f.createTable(o)}return o}function nh(){return e=>Z(()=>[e.options.data],t=>{const n={rows:[],flatRows:[],rowsById:{}},r=function(o,i,s){i===void 0&&(i=0);const a=[];for(let c=0;c<o.length;c++){const d=ja(e,e._getRowId(o[c],c,s),o[c],c,i,void 0,s==null?void 0:s.id);if(n.flatRows.push(d),n.rowsById[d.id]=d,a.push(d),e.options.getSubRows){var u;d.originalSubRows=e.options.getSubRows(o[c],c),(u=d.originalSubRows)!=null&&u.length&&(d.subRows=r(d.originalSubRows,i+1,d))}}return a};return n.rows=r(t),n},Q(e.options,"debugTable","getRowModel",()=>e._autoResetPageIndex()))}function rh(){return e=>Z(()=>[e.getState().expanded,e.getPreExpandedRowModel(),e.options.paginateExpandedRows],(t,n,r)=>!n.rows.length||t!==!0&&!Object.keys(t??{}).length||!r?n:oh(n),Q(e.options,"debugTable","getExpandedRowModel"))}function oh(e){const t=[],n=r=>{var o;t.push(r),(o=r.subRows)!=null&&o.length&&r.getIsExpanded()&&r.subRows.forEach(n)};return e.rows.forEach(n),{rows:t,flatRows:e.flatRows,rowsById:e.rowsById}}function ih(){return e=>Z(()=>[e.getState().grouping,e.getPreGroupedRowModel()],(t,n)=>{if(!n.rows.length||!t.length)return n;const r=t.filter(u=>e.getColumn(u)),o=[],i={},s=function(u,c,d){if(c===void 0&&(c=0),c>=r.length)return u.map(h=>(h.depth=c,o.push(h),i[h.id]=h,h.subRows&&(h.subRows=s(h.subRows,c+1,h.id)),h));const g=r[c],p=sh(u,g);return Array.from(p.entries()).map((h,m)=>{let[v,y]=h,P=`${g}:${v}`;P=d?`${d}>${P}`:P;const x=s(y,c+1,P),S=c?Ia(y,E=>E.subRows):y,w=ja(e,P,S[0].original,m,c,void 0,d);return Object.assign(w,{groupingColumnId:g,groupingValue:v,subRows:x,leafRows:S,getValue:E=>{if(r.includes(E)){if(w._valuesCache.hasOwnProperty(E))return w._valuesCache[E];if(y[0]){var $;w._valuesCache[E]=($=y[0].getValue(E))!=null?$:void 0}return w._valuesCache[E]}if(w._groupingValuesCache.hasOwnProperty(E))return w._groupingValuesCache[E];const j=e.getColumn(E),D=j==null?void 0:j.getAggregationFn();if(D)return w._groupingValuesCache[E]=D(E,S,y),w._groupingValuesCache[E]}}),x.forEach(E=>{o.push(E),i[E.id]=E}),w})},a=s(n.rows,0);return a.forEach(u=>{o.push(u),i[u.id]=u}),{rows:a,flatRows:o,rowsById:i}},Q(e.options,"debugTable","getGroupedRowModel",()=>{e._queue(()=>{e._autoResetExpanded(),e._autoResetPageIndex()})}))}function sh(e,t){const n=new Map;return e.reduce((r,o)=>{const i=`${o.getGroupingValue(t)}`,s=r.get(i);return s?s.push(o):r.set(i,[o]),r},n)}function ah(){return e=>Z(()=>[e.getState().sorting,e.getPreSortedRowModel()],(t,n)=>{if(!n.rows.length||!(t!=null&&t.length))return n;const r=e.getState().sorting,o=[],i=r.filter(u=>{var c;return(c=e.getColumn(u.id))==null?void 0:c.getCanSort()}),s={};i.forEach(u=>{const c=e.getColumn(u.id);c&&(s[u.id]={sortUndefined:c.columnDef.sortUndefined,invertSorting:c.columnDef.invertSorting,sortingFn:c.getSortingFn()})});const a=u=>{const c=u.map(d=>({...d}));return c.sort((d,g)=>{for(let f=0;f<i.length;f+=1){var p;const h=i[f],m=s[h.id],v=m.sortUndefined,y=(p=h==null?void 0:h.desc)!=null?p:!1;let P=0;if(v){const x=d.getValue(h.id),S=g.getValue(h.id),w=x===void 0,E=S===void 0;if(w||E){if(v==="first")return w?-1:1;if(v==="last")return w?1:-1;P=w&&E?0:w?v:-v}}if(P===0&&(P=m.sortingFn(d,g,h.id)),P!==0)return y&&(P*=-1),m.invertSorting&&(P*=-1),P}return d.index-g.index}),c.forEach(d=>{var g;o.push(d),(g=d.subRows)!=null&&g.length&&(d.subRows=a(d.subRows))}),c};return{rows:a(n.rows),flatRows:o,rowsById:n.rowsById}},Q(e.options,"debugTable","getSortedRowModel",()=>e._autoResetPageIndex()))}/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function Xr(e,t){return e?lh(e)?R.createElement(e,t):e:null}function lh(e){return uh(e)||typeof e=="function"||ch(e)}function uh(e){return typeof e=="function"&&(()=>{const t=Object.getPrototypeOf(e);return t.prototype&&t.prototype.isReactComponent})()}function ch(e){return typeof e=="object"&&typeof e.$$typeof=="symbol"&&["react.memo","react.forward_ref"].includes(e.$$typeof.description)}function dh(e){const t={state:{},onStateChange:()=>{},renderFallbackValue:null,...e},[n]=R.useState(()=>({current:th(t)})),[r,o]=R.useState(()=>n.current.initialState);return n.current.setOptions(i=>({...i,...e,state:{...r,...e.state},onStateChange:s=>{o(s),e.onStateChange==null||e.onStateChange(s)}})),n.current}const ph=ye.Root,fh=ye.Group,gh=ye.Value,Ua=R.forwardRef(({className:e,children:t,...n},r)=>b.jsxs(ye.Trigger,{ref:r,className:U("pr-flex pr-h-10 pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...n,children:[t,b.jsx(ye.Icon,{asChild:!0,children:b.jsx(Ye.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));Ua.displayName=ye.Trigger.displayName;const qa=R.forwardRef(({className:e,...t},n)=>b.jsx(ye.ScrollUpButton,{ref:n,className:U("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:b.jsx(Ye.ChevronUp,{className:"pr-h-4 pr-w-4"})}));qa.displayName=ye.ScrollUpButton.displayName;const Wa=R.forwardRef(({className:e,...t},n)=>b.jsx(ye.ScrollDownButton,{ref:n,className:U("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:b.jsx(Ye.ChevronDown,{className:"pr-h-4 pr-w-4"})}));Wa.displayName=ye.ScrollDownButton.displayName;const Xa=R.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>b.jsx(ye.Portal,{children:b.jsxs(ye.Content,{ref:o,className:U("pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:n,...r,children:[b.jsx(qa,{}),b.jsx(ye.Viewport,{className:U("pr-p-1",n==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),b.jsx(Wa,{})]})}));Xa.displayName=ye.Content.displayName;const mh=R.forwardRef(({className:e,...t},n)=>b.jsx(ye.Label,{ref:n,className:U("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));mh.displayName=ye.Label.displayName;const Ya=R.forwardRef(({className:e,children:t,...n},r)=>b.jsxs(ye.Item,{ref:r,className:U("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[b.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:b.jsx(ye.ItemIndicator,{children:b.jsx(Ye.Check,{className:"pr-h-4 pr-w-4"})})}),b.jsx(ye.ItemText,{children:t})]}));Ya.displayName=ye.Item.displayName;const hh=R.forwardRef(({className:e,...t},n)=>b.jsx(ye.Separator,{ref:n,className:U("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));hh.displayName=ye.Separator.displayName;const Ka=_.forwardRef(({className:e,...t},n)=>b.jsx("div",{className:"pr-relative pr-w-full pr-overflow-auto",children:b.jsx("table",{ref:n,className:U("pr-w-full pr-caption-bottom pr-text-sm",e),...t})}));Ka.displayName="Table";const Ja=_.forwardRef(({className:e,...t},n)=>b.jsx("thead",{ref:n,className:U("[&_tr]:pr-border-b",e),...t}));Ja.displayName="TableHeader";const Za=_.forwardRef(({className:e,...t},n)=>b.jsx("tbody",{ref:n,className:U("[&_tr:last-child]:pr-border-0",e),...t}));Za.displayName="TableBody";const vh=_.forwardRef(({className:e,...t},n)=>b.jsx("tfoot",{ref:n,className:U("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));vh.displayName="TableFooter";const mo=_.forwardRef(({className:e,...t},n)=>b.jsx("tr",{ref:n,className:U("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));mo.displayName="TableRow";const Qa=_.forwardRef(({className:e,...t},n)=>b.jsx("th",{ref:n,className:U("pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",e),...t}));Qa.displayName="TableHead";const el=_.forwardRef(({className:e,...t},n)=>b.jsx("td",{ref:n,className:U("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0",e),...t}));el.displayName="TableCell";const bh=_.forwardRef(({className:e,...t},n)=>b.jsx("caption",{ref:n,className:U("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));bh.displayName="TableCaption";const gt="scrBook",wh="scrRef",Tt="source",yh="details",xh="Scripture Reference",Sh="Scripture Book",tl="Type",Ch="Details";function Eh(e,t){const n=t??!1;return[{accessorFn:r=>`${ue.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:gt,header:(e==null?void 0:e.scriptureReferenceColumnName)??xh,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?ue.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===gt?Ce.formatScrRef(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>Ce.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>Ce.formatScrRef(r.start),id:wh,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:Ce.formatScrRef(o.start)},sortingFn:(r,o)=>Ce.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:Tt,header:n?(e==null?void 0:e.typeColumnName)??tl:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:yh,header:(e==null?void 0:e.detailsColumnName)??Ch,cell:r=>r.getValue(),enableGrouping:!1}]}function Rh({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:i,detailsColumnName:s,onRowSelected:a}){const[u,c]=_.useState([]),[d,g]=_.useState([{id:gt,desc:!1}]),[p,f]=_.useState(()=>e.flatMap(C=>{const k=C.source;return C.data.map(N=>({...N,source:k}))})),[h,m]=_.useState({});_.useEffect(()=>{f(()=>e.flatMap(C=>{const k=C.source;return C.data.map(N=>({...N,source:k}))}))},[e]);const v=_.useMemo(()=>Eh({scriptureReferenceColumnName:r,typeColumnName:i,detailsColumnName:s},n),[r,i,s,n]);_.useEffect(()=>{u.includes(Tt)?g([{id:Tt,desc:!1},{id:gt,desc:!1}]):g([{id:gt,desc:!1}])},[u]);const y=_.useCallback((C,k)=>!k||Ce.compareScrRefs(C,k)===0?`${Ce.scrRefToBBBCCCVVV(C)}`:`${Ce.scrRefToBBBCCCVVV(C)}-${Ce.scrRefToBBBCCCVVV(k)}`,[]),P=_.useCallback(C=>`${y(C.start,C.end)} ${C.source} ${C.detail}`,[y]),x=dh({data:p,columns:v,state:{grouping:u,sorting:d,rowSelection:h},onGroupingChange:c,onSortingChange:g,onRowSelectionChange:m,getExpandedRowModel:rh(),getGroupedRowModel:ih(),getCoreRowModel:nh(),getSortedRowModel:ah(),getRowId:P,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});_.useEffect(()=>{if(a){const C=x.getSelectedRowModel().rowsById,k=Object.keys(C);if(k.length===1){const N=p.find(V=>P(V)===k[0])||void 0;N&&a(N)}}},[h,p,P,a,x]);const S=o??Sh,w=i??tl,E=[{label:"No Grouping",value:[]},{label:`Group by ${S}`,value:[gt]},{label:`Group by ${w}`,value:[Tt]},{label:`Group by ${S} and ${w}`,value:[gt,Tt]},{label:`Group by ${w} and ${S}`,value:[Tt,gt]}],$=C=>{c(JSON.parse(C))},j=(C,k)=>{!C.getIsGrouped()&&!C.getIsSelected()&&C.getToggleSelectedHandler()(k)},D=(C,k)=>C.getIsGrouped()?"":U("banded-row",k%2===0?"even":"odd"),B=(C,k,N)=>{if(!((C==null?void 0:C.length)===0||k.depth<N.column.getGroupedIndex())){if(k.getIsGrouped())switch(k.depth){case 1:return"pr-ps-4";default:return}switch(k.depth){case 1:return"pr-ps-8";case 2:return"pr-ps-12";default:return}}};return b.jsxs("div",{className:"pr-twp pr-w-full",children:[!t&&b.jsxs(ph,{value:JSON.stringify(u),onValueChange:C=>{$(C)},children:[b.jsx(Ua,{className:"pr-mb-1 pr-mt-2",children:b.jsx(gh,{})}),b.jsx(Xa,{position:"item-aligned",children:b.jsx(fh,{children:E.map(C=>b.jsx(Ya,{value:JSON.stringify(C.value),children:C.label},C.label))})})]}),b.jsxs(Ka,{className:"pr-p-0",children:[t&&b.jsx(Ja,{children:x.getHeaderGroups().map(C=>b.jsx(mo,{children:C.headers.filter(k=>k.column.columnDef.header).map(k=>b.jsx(Qa,{colSpan:k.colSpan,children:k.isPlaceholder?void 0:b.jsxs("div",{children:[k.column.getCanGroup()?b.jsx(Ze,{variant:"ghost",title:`Toggle grouping by ${k.column.columnDef.header}`,onClick:k.column.getToggleGroupingHandler(),type:"button",children:k.column.getIsGrouped()?`🛑(${k.column.getGroupedIndex()}) `:"👊 "}):void 0," ",Xr(k.column.columnDef.header,k.getContext())]})},k.id))},C.id))}),b.jsx(Za,{children:x.getRowModel().rows.map((C,k)=>b.jsx(mo,{"data-state":C.getIsSelected()?"selected":"",className:U(D(C,k)),onClick:N=>j(C,N),children:C.getVisibleCells().map(N=>{if(!(N.getIsPlaceholder()||N.column.columnDef.enableGrouping&&!N.getIsGrouped()&&(N.column.columnDef.id!==Tt||!n)))return b.jsx(el,{className:U(N.column.columnDef.id,"pr-p-[1px]",B(u,C,N)),children:(()=>N.getIsGrouped()?b.jsxs(Ze,{variant:"ghost",onClick:C.getToggleExpandedHandler(),type:"button",children:[C.getIsExpanded()?"👇":"👉"," ",Xr(N.column.columnDef.cell,N.getContext())," (",C.subRows.length,")"]}):Xr(N.column.columnDef.cell,N.getContext()))()},N.id)})},C.id))})]})]})}function kh({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=_.useState(""),i=s=>{o(s),e(s)};return b.jsx(Pn,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:s=>i(s.target.value)})}function Th({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:s=!1,defaultValue:a,value:u,valueLabelDisplay:c="off",className:d,onChange:g,onChangeCommitted:p}){return b.jsx(we.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:s,defaultValue:a,value:u,valueLabelDisplay:c,className:`papi-slider ${n} ${d??""}`,onChange:g,onChangeCommitted:p})}function Ph({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:s,children:a}){const u={action:(s==null?void 0:s.action)||a,message:s==null?void 0:s.message,className:r};return b.jsx(we.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:u})}function Oh({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return b.jsx(we.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function cs({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return b.jsx(Pn,{defaultValue:t[n.key],onChange:r})}const Nh=({onChange:e,disabled:t,checked:n,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return b.jsx(Co,{...r,isChecked:n,isDisabled:t,onChange:o})};function _h({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:s,defaultColumnSortable:a=!0,defaultColumnResizable:u=!0,rows:c,enableSelectColumn:d,selectColumnWidth:g=50,rowKeyGetter:p,rowHeight:f=35,headerRowHeight:h=35,selectedRows:m,onSelectedRowsChange:v,onRowsChange:y,onCellClick:P,onCellDoubleClick:x,onCellContextMenu:S,onCellKeyDown:w,direction:E="ltr",enableVirtualization:$=!0,onCopy:j,onPaste:D,onScroll:B,className:C,"data-testid":k}){const N=_.useMemo(()=>{const V=e.map(L=>typeof L.editable=="function"?{...L,editable:z=>!!L.editable(z),renderEditCell:L.renderEditCell||cs}:L.editable&&!L.renderEditCell?{...L,renderEditCell:cs}:L.renderEditCell&&!L.editable?{...L,editable:!1}:L);return d?[{...ci.SelectColumn,minWidth:g},...V]:V},[e,d,g]);return b.jsx(ci,{columns:N,defaultColumnOptions:{width:o,minWidth:i,maxWidth:s,sortable:a,resizable:u},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:c,rowKeyGetter:p,rowHeight:f,headerRowHeight:h,selectedRows:m,onSelectedRowsChange:v,onRowsChange:y,onCellClick:P,onCellDoubleClick:x,onCellContextMenu:S,onCellKeyDown:w,direction:E,enableVirtualization:$,onCopy:j,onPaste:D,onScroll:B,renderers:{renderCheckbox:Nh},className:`papi-table ${C??"rdg-light"}`,"data-testid":k})}function $h({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const i=_.useRef(void 0);return b.jsx("div",{ref:i,style:{position:"relative"},children:b.jsx(we.AppBar,{position:"static",id:r,children:b.jsxs(we.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?b.jsx(Ma,{commandHandler:t,containerRef:i,menuProvider:e}):void 0,o?b.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Mh=(e,t)=>{_.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Yr=()=>!1,Ih=(e,t)=>{const[n]=sr(_.useCallback(async()=>{if(!e)return Yr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Yr,{preserveValue:!1});_.useEffect(()=>()=>{n!==Yr&&n()},[n])},jh=je.Root,nl=_.forwardRef(({className:e,...t},n)=>b.jsx(je.List,{ref:n,className:U("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));nl.displayName=je.List.displayName;const rl=_.forwardRef(({className:e,...t},n)=>b.jsx(je.Trigger,{ref:n,className:U("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));rl.displayName=je.Trigger.displayName;const ol=_.forwardRef(({className:e,...t},n)=>b.jsx(je.Content,{ref:n,className:U("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));ol.displayName=je.Content.displayName;const il=_.forwardRef(({className:e,...t},n)=>b.jsx(je.Root,{orientation:"vertical",ref:n,className:U("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));il.displayName=je.List.displayName;const sl=_.forwardRef(({className:e,...t},n)=>b.jsx(je.List,{ref:n,className:U("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));sl.displayName=je.List.displayName;const Dh=_.forwardRef(({className:e,...t},n)=>b.jsx(je.Trigger,{ref:n,...t,className:U("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),al=_.forwardRef(({className:e,...t},n)=>b.jsx(je.Content,{ref:n,className:U("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));al.displayName=je.Content.displayName;const ll=_.forwardRef(({className:e,...t},n)=>b.jsx("div",{ref:n,className:U("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));ll.displayName="Card";const ul=_.forwardRef(({className:e,...t},n)=>b.jsx("div",{ref:n,className:U("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));ul.displayName="CardHeader";const cl=_.forwardRef(({className:e,...t},n)=>b.jsx("h3",{ref:n,className:U("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));cl.displayName="CardTitle";const dl=_.forwardRef(({className:e,...t},n)=>b.jsx("p",{ref:n,className:U("pr-text-sm pr-text-muted-foreground",e),...t}));dl.displayName="CardDescription";const pl=_.forwardRef(({className:e,...t},n)=>b.jsx("div",{ref:n,className:U("pr-p-6 pr-pt-0",e),...t}));pl.displayName="CardContent";const fl=_.forwardRef(({className:e,...t},n)=>b.jsx("div",{ref:n,className:U("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));fl.displayName="CardFooter";const Ah=ho.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),gl=_.forwardRef(({className:e,variant:t,...n},r)=>b.jsx("div",{ref:r,role:"alert",className:U(Ah({variant:t}),e),...n}));gl.displayName="Alert";const ml=_.forwardRef(({className:e,...t},n)=>b.jsxs("h5",{ref:n,className:U("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));ml.displayName="AlertTitle";const hl=_.forwardRef(({className:e,...t},n)=>b.jsx("div",{ref:n,className:U("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));hl.displayName="AlertDescription";const vl=_.forwardRef(({className:e,...t},n)=>b.jsxs(fn.Root,{ref:n,className:U("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[b.jsx(fn.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:b.jsx(fn.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),b.jsx(fn.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));vl.displayName=fn.Root.displayName;const bl=_.forwardRef(({className:e,...t},n)=>b.jsx(Jr.Root,{className:U("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:n,children:b.jsx(Jr.Thumb,{className:U("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));bl.displayName=Jr.Root.displayName;exports.Alert=gl;exports.AlertDescription=hl;exports.AlertTitle=ml;exports.BookChapterControl=gu;exports.Button=Ze;exports.Card=ll;exports.CardContent=pl;exports.CardDescription=dl;exports.CardFooter=fl;exports.CardHeader=ul;exports.CardTitle=cl;exports.ChapterRangeSelector=mu;exports.Checkbox=Co;exports.Checklist=hu;exports.ComboBox=Jn;exports.ContextMenu=fm;exports.DropdownMenu=bs;exports.DropdownMenuCheckboxItem=Ss;exports.DropdownMenuContent=yo;exports.DropdownMenuGroup=Ql;exports.DropdownMenuItem=xo;exports.DropdownMenuLabel=ar;exports.DropdownMenuPortal=eu;exports.DropdownMenuRadioGroup=nu;exports.DropdownMenuRadioItem=Cs;exports.DropdownMenuSeparator=So;exports.DropdownMenuShortcut=Es;exports.DropdownMenuSub=tu;exports.DropdownMenuSubContent=xs;exports.DropdownMenuSubTrigger=ys;exports.DropdownMenuTrigger=ws;exports.GridMenu=xa;exports.HamburgerMenuButton=Ma;exports.IconButton=hm;exports.Input=lr;exports.Label=qo;exports.LabelPosition=Pt;exports.MenuItem=Go;exports.RefSelector=bm;exports.ScriptureResultsViewer=Rh;exports.SearchBar=kh;exports.ShadCnSlider=vl;exports.ShadCnSwitch=bl;exports.Slider=Th;exports.Snackbar=Ph;exports.Switch=Oh;exports.Table=_h;exports.Tabs=jh;exports.TabsContent=ol;exports.TabsList=nl;exports.TabsTrigger=rl;exports.TextField=Pn;exports.Toolbar=$h;exports.VerticalTabs=il;exports.VerticalTabsContent=al;exports.VerticalTabsList=sl;exports.VerticalTabsTrigger=Dh;exports.buttonVariants=Rs;exports.useEvent=Mh;exports.useEventAsync=Ih;exports.usePromise=sr;function Fh(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Fh(`.search-bar-paper {
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
}
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
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
.pr-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
}
.pr-max-w-64 {
  max-width: 16rem;
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
.pr-pt-4 {
  padding-top: 1rem;
}
.pr-text-left {
  text-align: left;
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
