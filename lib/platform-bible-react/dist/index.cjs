"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const u=require("react/jsx-runtime"),N=require("react"),Ds=require("platform-bible-utils"),Bs=require("@radix-ui/react-dropdown-menu"),fe=require("lucide-react"),Se=require("clsx"),Ia=require("tailwind-merge"),ht=require("@tanstack/react-table"),$a=require("@radix-ui/react-slot"),Ls=require("class-variance-authority"),_a=require("@radix-ui/react-select"),ve=require("@mui/material"),_r=require("@mui/styled-engine"),rn=require("react-dom"),Aa=require("@radix-ui/react-label"),Da=require("@radix-ui/react-tabs");function Ut(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const T=Ut(N),he=Ut(Bs),ye=Ut(_a),Ba=Ut(rn),Vs=Ut(Aa),Ie=Ut(Da);var La=Object.defineProperty,Va=(e,t,n)=>t in e?La(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t,n)=>Va(e,typeof t!="symbol"?t+"":t,n);const Et=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Yr=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Fs=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Lo=Ka();function Ht(e,t=!0){return t&&(e=e.toUpperCase()),e in Lo?Lo[e]:0}function Gr(e){return Ht(e)>0}function Fa(e){const t=typeof e=="string"?Ht(e):e;return t>=40&&t<=66}function za(e){return(typeof e=="string"?Ht(e):e)<=39}function zs(e){return e<=66}function Ua(e){const t=typeof e=="string"?Ht(e):e;return qs(t)&&!zs(t)}function*Ha(){for(let e=1;e<=Et.length;e++)yield e}const qa=1,Us=Et.length;function Wa(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Kr(e,t="***"){const n=e-1;return n<0||n>=Et.length?t:Et[n]}function Hs(e){return e<=0||e>Us?"******":Fs[e-1]}function Xa(e){return Hs(Ht(e))}function qs(e){const t=typeof e=="number"?Kr(e):e;return Gr(t)&&!Yr.includes(t)}function Ya(e){const t=typeof e=="number"?Kr(e):e;return Gr(t)&&Yr.includes(t)}function Ga(e){return Fs[e-1].includes("*obsolete*")}function Ka(){const e={};for(let t=0;t<Et.length;t++)e[Et[t]]=t+1;return e}const de={allBookIds:Et,nonCanonicalIds:Yr,bookIdToNumber:Ht,isBookIdValid:Gr,isBookNT:Fa,isBookOT:za,isBookOTNT:zs,isBookDC:Ua,allBookNumbers:Ha,firstBook:qa,lastBook:Us,extraBooks:Wa,bookNumberToId:Kr,bookNumberToEnglishName:Hs,bookIdToEnglishName:Xa,isCanonical:qs,isExtraMaterial:Ya,isObsolete:Ga};var Xe=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Xe||{});const Ae=class{constructor(t){if(re(this,"name"),re(this,"fullPath"),re(this,"isPresent"),re(this,"hasVerseSegments"),re(this,"isCustomized"),re(this,"baseVersification"),re(this,"scriptureBooks"),re(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Xe[t]):(this._type=t,this.name=Xe[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};re(Ae,"Original",new Ae(Xe.Original)),re(Ae,"Septuagint",new Ae(Xe.Septuagint)),re(Ae,"Vulgate",new Ae(Xe.Vulgate)),re(Ae,"English",new Ae(Xe.English)),re(Ae,"RussianProtestant",new Ae(Xe.RussianProtestant)),re(Ae,"RussianOrthodox",new Ae(Xe.RussianOrthodox));let mt=Ae;function Vo(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var Ws=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Ws||{});const Re=class ie{constructor(t,n,r,o){if(re(this,"firstChapter"),re(this,"lastChapter"),re(this,"lastVerse"),re(this,"hasSegmentsDefined"),re(this,"text"),re(this,"BBBCCCVVVS"),re(this,"longHashCode"),re(this,"versification"),re(this,"rtlMark","‏"),re(this,"_bookNum",0),re(this,"_chapterNum",0),re(this,"_verseNum",0),re(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const s=t,a=n!=null&&n instanceof mt?n:void 0;this.setEmpty(a),this.parse(s)}else if(t!=null&&typeof t=="number"){const s=n!=null&&n instanceof mt?n:void 0;this.setEmpty(s),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ie){const s=t;this._bookNum=s.bookNum,this._chapterNum=s.chapterNum,this._verseNum=s.verseNum,this._verse=s.verse,this.versification=s.versification}else{if(t==null)return;const s=t instanceof mt?t:ie.defaultVersification;this.setEmpty(s)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new ie(t),{success:!0,verseRef:n}}catch(r){if(r instanceof Jt)return n=new ie,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ie.bcvMaxValue*ie.bookDigitShifter+(n>=0?n%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(r>=0?r%ie.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:s,versificationStr:a}=t,l=s||o.toString();let c;return a&&(c=new mt(a)),n?new ie(n,r.toString(),l,c):new ie}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>ie.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return de.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=de.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ie.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>de.lastBook)throw new Jt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new mt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const s=t.split("/");if(t=s[0],s.length>1)try{const a=+s[1].trim();this.versification=new mt(Xe[a])}catch{throw new Jt("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new Jt("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||de.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(r[1]))throw new Jt("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;return(t===""||t===this.verseNum.toString())&&(t=void 0),{book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr}}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=ie.verseRangeSeparators,r=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],s=Vo(this._verse,r);for(const a of s.map(l=>Vo(l,n))){const l=this.clone();l.verse=a[0];const c=l.verseNum;if(o.push(l),a.length>1){const p=this.clone();if(p.verse=a[1],!t)for(let d=c+1;d<p.verseNum;d++){const h=new ie(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(h)}o.push(p)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const s=o.internalValid;if(s!==0)return s;const a=o.BBBCCCVVV;if(r>a)return 3;if(r===a)return 4;r=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>de.lastBook?2:(de.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=de.bookIdToNumber(t),this.chapter=n,this.verse=r}};re(Re,"defaultVersification",mt.English),re(Re,"verseRangeSeparator","-"),re(Re,"verseSequenceIndicator",","),re(Re,"verseRangeSeparators",[Re.verseRangeSeparator]),re(Re,"verseSequenceIndicators",[Re.verseSequenceIndicator]),re(Re,"chapterDigitShifter",1e3),re(Re,"bookDigitShifter",Re.chapterDigitShifter*Re.chapterDigitShifter),re(Re,"bcvMaxValue",Re.chapterDigitShifter-1),re(Re,"ValidStatusType",Ws);class Jt extends Error{}function te(...e){return Ia.twMerge(Se.clsx(e))}const Jr=he.Root,Xs=he.Trigger,Ja=he.Group,Za=he.Portal,Qa=he.Sub,el=he.RadioGroup,Ys=N.forwardRef(({className:e,inset:t,children:n,...r},o)=>u.jsxs(he.SubTrigger,{ref:o,className:te("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,u.jsx(fe.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Ys.displayName=he.SubTrigger.displayName;const Gs=N.forwardRef(({className:e,...t},n)=>u.jsx(he.SubContent,{ref:n,className:te("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));Gs.displayName=he.SubContent.displayName;const er=N.forwardRef(({className:e,sideOffset:t=4,...n},r)=>u.jsx(he.Portal,{children:u.jsx(he.Content,{ref:r,sideOffset:t,className:te("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));er.displayName=he.Content.displayName;const Zr=N.forwardRef(({className:e,inset:t,...n},r)=>u.jsx(he.Item,{ref:r,className:te("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));Zr.displayName=he.Item.displayName;const Qr=N.forwardRef(({className:e,children:t,checked:n,...r},o)=>u.jsxs(he.CheckboxItem,{ref:o,className:te("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[u.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:u.jsx(he.ItemIndicator,{children:u.jsx(fe.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));Qr.displayName=he.CheckboxItem.displayName;const Ks=N.forwardRef(({className:e,children:t,...n},r)=>u.jsxs(he.RadioItem,{ref:r,className:te("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[u.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:u.jsx(he.ItemIndicator,{children:u.jsx(fe.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));Ks.displayName=he.RadioItem.displayName;const xn=N.forwardRef(({className:e,inset:t,...n},r)=>u.jsx(he.Label,{ref:r,className:te("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));xn.displayName=he.Label.displayName;const tr=N.forwardRef(({className:e,...t},n)=>u.jsx(he.Separator,{ref:n,className:te("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));tr.displayName=he.Separator.displayName;function Js({className:e,...t}){return u.jsx("span",{className:te("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Js.displayName="DropdownMenuShortcut";const En=N.forwardRef(({className:e,type:t,...n},r)=>u.jsx("input",{type:t,className:te("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));En.displayName="Input";const tl=N.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},s)=>u.jsxs("div",{className:"pr-relative",children:[u.jsx(En,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:a=>e(a.target.value),onKeyDown:a=>{a.key==="Enter"&&r(),t(a)},onClick:n,ref:s}),u.jsx(fe.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function nl({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const s=Array.from({length:t},(l,c)=>c+1),a=N.useCallback(l=>{o(l)},[o]);return u.jsx("div",{className:te("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:s.map(l=>u.jsx("div",{className:te("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===n,"pr-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>a(l),children:l},l))})}const rl=N.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:s,children:a},l)=>u.jsxs(Zr,{ref:l,textValue:e,className:te("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[u.jsx("span",{className:te("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":s.toLowerCase()==="ot","pr-border-l-purple-200":s.toLowerCase()==="nt","pr-border-l-indigo-200":s.toLowerCase()==="dc"}),children:de.bookIdToEnglishName(e)}),n&&u.jsx("div",{children:a})]},e));function ol({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return u.jsxs(xn,{className:"pr-flex pr-justify-between",children:[u.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),u.jsxs("div",{className:"pr-flex pr-items-center",children:[u.jsx(fe.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),u.jsx(fe.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),u.jsx(fe.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const ln=de.allBookIds,sl={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},Fo=["OT","NT","DC"],il=32+32+32,al=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],ll=e=>({OT:ln.filter(n=>de.isBookOT(n)),NT:ln.filter(n=>de.isBookNT(n)),DC:ln.filter(n=>de.isBookDC(n))})[e],Zt=e=>Ds.getChaptersForBook(de.bookIdToNumber(e));function cl(){return ln.map(t=>de.bookIdToEnglishName(t))}function pl(e){return cl().includes(e)}function ul(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(pl(t))return ln.find(r=>de.bookIdToEnglishName(r)===t)}function dl({scrRef:e,handleSubmit:t}){const[n,r]=N.useState(""),[o,s]=N.useState(de.bookNumberToId(e.bookNum)),[a,l]=N.useState(e.chapterNum??0),[c,p]=N.useState(de.bookNumberToId(e.bookNum)),[d,h]=N.useState(!1),[f,b]=N.useState(d),y=N.useRef(void 0),v=N.useRef(void 0),m=N.useRef(void 0),x=N.useCallback(C=>ll(C).filter($=>{const I=de.bookIdToEnglishName($).toLowerCase(),L=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return I.includes(L)||$.toLowerCase().includes(L)}),[n]),_=C=>{r(C)},w=N.useRef(!1),E=N.useCallback(C=>{if(w.current){w.current=!1;return}h(C)},[]),g=N.useCallback((C,$,I,L)=>{if(l(de.bookNumberToId(e.bookNum)!==C?1:e.chapterNum),$||Zt(C)===-1){t({bookNum:de.bookIdToNumber(C),chapterNum:I||1,verseNum:L||1}),h(!1),r("");return}s(o!==C?C:""),h(!$)},[t,e.bookNum,e.chapterNum,o]),O=C=>{C<=0||C>Zt(o)||g(o,!0,C)},P=N.useCallback(()=>{al.forEach(C=>{const $=n.match(C);if($){const[I,L=void 0,U=void 0]=$.slice(1),R=ul(I);(de.isBookIdValid(I)||R)&&g(R??I,!0,L?parseInt(L,10):1,U?parseInt(U,10):1)}})},[g,n]),V=N.useCallback(C=>{d?(C.key==="ArrowDown"||C.key==="ArrowUp")&&(typeof m<"u"&&m.current!==null?m.current.focus():typeof v<"u"&&v.current!==null&&v.current.focus(),C.preventDefault()):h(!0)},[d]),D=C=>{const{key:$}=C;$==="ArrowRight"||$==="ArrowLeft"||$==="ArrowDown"||$==="ArrowUp"||$==="Enter"||(y.current.dispatchEvent(new KeyboardEvent("keydown",{key:$})),y.current.focus())},F=C=>{const{key:$}=C;if(c===o){if($==="Enter"){C.preventDefault(),g(o,!0,a);return}let I=0;if($==="ArrowRight")if(a<Zt(c))I=1;else{C.preventDefault();return}else if($==="ArrowLeft")if(a>1)I=-1;else{C.preventDefault();return}else $==="ArrowDown"?I=6:$==="ArrowUp"&&(I=-6);a+I<=0||a+I>Zt(c)?l(0):I!==0&&(l(a+I),C.preventDefault())}};return N.useEffect(()=>{o===c?o===de.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),N.useLayoutEffect(()=>{b(d)},[d]),N.useLayoutEffect(()=>{const C=setTimeout(()=>{if(f&&v.current&&m.current){const I=m.current.offsetTop-il;v.current.scrollTo({top:I,behavior:"instant"})}},10);return()=>{clearTimeout(C)}},[f]),u.jsx("div",{className:"pr-flex",children:u.jsxs(Jr,{modal:!1,open:d,onOpenChange:E,children:[u.jsx(Xs,{asChild:!0,children:u.jsx(tl,{ref:y,value:n,handleSearch:_,handleKeyDown:V,handleOnClick:()=>{s(de.bookNumberToId(e.bookNum)),p(de.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),h(!0),y.current.focus()},onFocus:()=>{w.current=!0},handleSubmit:P,placeholder:`${de.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),u.jsxs(er,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:D,align:"start",ref:v,children:[u.jsx(ol,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),Fo.map((C,$)=>x(C).length>0&&u.jsxs("div",{children:[u.jsx(xn,{className:"pr-font-semibold pr-text-slate-700",children:sl[C]}),x(C).map(I=>u.jsx("div",{children:u.jsx(rl,{bookId:I,handleSelectBook:()=>g(I,!1),isSelected:o===I,handleHighlightBook:()=>p(I),handleKeyDown:F,bookType:C,ref:L=>{o===I&&(m.current=L)},children:u.jsx(nl,{handleSelectChapter:O,endChapter:Zt(I),activeChapter:e.bookNum===de.bookIdToNumber(I)?e.chapterNum:0,highlightedChapter:a,handleHighlightedChapter:L=>{l(L)}})})},I)),Fo.length-1!==$?u.jsx(tr,{}):void 0]},C))]})]})})}const nr=N.forwardRef(({className:e,...t},n)=>u.jsx("div",{className:"pr-relative pr-w-full pr-overflow-auto",children:u.jsx("table",{ref:n,className:te("pr-w-full pr-caption-bottom pr-text-sm",e),...t})}));nr.displayName="Table";const rr=N.forwardRef(({className:e,...t},n)=>u.jsx("thead",{ref:n,className:te("[&_tr]:pr-border-b",e),...t}));rr.displayName="TableHeader";const or=N.forwardRef(({className:e,...t},n)=>u.jsx("tbody",{ref:n,className:te("[&_tr:last-child]:pr-border-0",e),...t}));or.displayName="TableBody";const Zs=N.forwardRef(({className:e,...t},n)=>u.jsx("tfoot",{ref:n,className:te("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));Zs.displayName="TableFooter";const wt=N.forwardRef(({className:e,...t},n)=>u.jsx("tr",{ref:n,className:te("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));wt.displayName="TableRow";const fn=N.forwardRef(({className:e,...t},n)=>u.jsx("th",{ref:n,className:te("pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",e),...t}));fn.displayName="TableHead";const At=N.forwardRef(({className:e,...t},n)=>u.jsx("td",{ref:n,className:te("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0",e),...t}));At.displayName="TableCell";const Qs=N.forwardRef(({className:e,...t},n)=>u.jsx("caption",{ref:n,className:te("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));Qs.displayName="TableCaption";const ei=Ls.cva("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),ke=N.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},s)=>{const a=r?$a.Slot:"button";return u.jsx(a,{className:te(ei({variant:t,size:n,className:e})),ref:s,...o})});ke.displayName="Button";const Un=ye.Root,fl=ye.Group,Hn=ye.Value,hn=N.forwardRef(({className:e,children:t,...n},r)=>u.jsxs(ye.Trigger,{ref:r,className:te("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...n,children:[t,u.jsx(ye.Icon,{asChild:!0,children:u.jsx(fe.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));hn.displayName=ye.Trigger.displayName;const eo=N.forwardRef(({className:e,...t},n)=>u.jsx(ye.ScrollUpButton,{ref:n,className:te("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:u.jsx(fe.ChevronUp,{className:"pr-h-4 pr-w-4"})}));eo.displayName=ye.ScrollUpButton.displayName;const to=N.forwardRef(({className:e,...t},n)=>u.jsx(ye.ScrollDownButton,{ref:n,className:te("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:u.jsx(fe.ChevronDown,{className:"pr-h-4 pr-w-4"})}));to.displayName=ye.ScrollDownButton.displayName;const mn=N.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>u.jsx(ye.Portal,{children:u.jsxs(ye.Content,{ref:o,className:te("pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:n,...r,children:[u.jsx(eo,{}),u.jsx(ye.Viewport,{className:te("pr-p-1",n==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),u.jsx(to,{})]})}));mn.displayName=ye.Content.displayName;const ti=N.forwardRef(({className:e,...t},n)=>u.jsx(ye.Label,{ref:n,className:te("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));ti.displayName=ye.Label.displayName;const We=N.forwardRef(({className:e,children:t,...n},r)=>u.jsxs(ye.Item,{ref:r,className:te("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[u.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:u.jsx(ye.ItemIndicator,{children:u.jsx(fe.Check,{className:"pr-h-4 pr-w-4"})})}),u.jsx(ye.ItemText,{children:t})]}));We.displayName=ye.Item.displayName;const ni=N.forwardRef(({className:e,...t},n)=>u.jsx(ye.Separator,{ref:n,className:te("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));ni.displayName=ye.Separator.displayName;function hl({table:e}){return u.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:u.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[u.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),u.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[u.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),u.jsxs(Un,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[u.jsx(hn,{className:"pr-h-8 pr-w-[70px]",children:u.jsx(Hn,{placeholder:e.getState().pagination.pageSize})}),u.jsx(mn,{side:"top",children:[10,20,30,40,50].map(t=>u.jsx(We,{value:`${t}`,children:t},t))})]})]}),u.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),u.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[u.jsxs(ke,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),u.jsx(fe.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),u.jsxs(ke,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),u.jsx(fe.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),u.jsxs(ke,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),u.jsx(fe.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),u.jsxs(ke,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),u.jsx(fe.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}function ml({table:e}){return u.jsxs(Jr,{children:[u.jsx(Bs.DropdownMenuTrigger,{asChild:!0,children:u.jsxs(ke,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[u.jsx(fe.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),u.jsxs(er,{align:"end",className:"pr-w-[150px]",children:[u.jsx(xn,{children:"Toggle columns"}),u.jsx(tr,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>u.jsx(Qr,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}function ri({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,onRowClickHandler:s=()=>{}}){var v;const[a,l]=N.useState([]),[c,p]=N.useState([]),[d,h]=N.useState({}),[f,b]=N.useState({}),y=ht.useReactTable({data:t,columns:e,getCoreRowModel:ht.getCoreRowModel(),...n&&{getPaginationRowModel:ht.getPaginationRowModel()},onSortingChange:l,getSortedRowModel:ht.getSortedRowModel(),onColumnFiltersChange:p,getFilteredRowModel:ht.getFilteredRowModel(),onColumnVisibilityChange:h,onRowSelectionChange:b,state:{sorting:a,columnFilters:c,columnVisibility:d,rowSelection:f}});return u.jsxs("div",{children:[o&&u.jsx(ml,{table:y}),u.jsx("div",{className:"pr-twp pr-font-sans",children:u.jsxs(nr,{children:[u.jsx(rr,{children:y.getHeaderGroups().map(m=>u.jsx(wt,{children:m.headers.map(x=>u.jsx(fn,{children:x.isPlaceholder?void 0:ht.flexRender(x.column.columnDef.header,x.getContext())},x.id))},m.id))}),u.jsx(or,{children:(v=y.getRowModel().rows)!=null&&v.length?y.getRowModel().rows.map(m=>u.jsx(wt,{onClick:()=>s(m,y),"data-state":m.getIsSelected()&&"selected",children:m.getVisibleCells().map(x=>u.jsx(At,{children:ht.flexRender(x.column.columnDef.cell,x.getContext())},x.id))},m.id)):u.jsx(wt,{children:u.jsx(At,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]})}),n&&u.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[u.jsx(ke,{variant:"outline",size:"sm",onClick:()=>y.previousPage(),disabled:!y.getCanPreviousPage(),children:"Previous"}),u.jsx(ke,{variant:"outline",size:"sm",onClick:()=>y.nextPage(),disabled:!y.getCanNextPage(),children:"Next"})]}),n&&r&&u.jsx(hl,{table:y})]})}function Ar({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:s=!1,width:a,options:l=[],className:c,value:p,onChange:d,onFocus:h,onBlur:f,getOptionLabel:b}){return u.jsx(ve.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:s,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:p,onChange:d,onFocus:h,onBlur:f,getOptionLabel:b,renderInput:y=>u.jsx(ve.TextField,{...y,error:o,fullWidth:s,disabled:n,label:t,style:{width:a}})})}function gl({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,s]=N.useState(1),[a,l]=N.useState(r),[c,p]=N.useState(Array.from({length:r},(f,b)=>b+1));N.useEffect(()=>{s(1),e(1),l(r),t(r),p(Array.from({length:r},(f,b)=>b+1))},[r,t,e]);const d=(f,b)=>{s(b),e(b),b>a&&(l(b),t(b))},h=(f,b)=>{l(b),t(b),b<o&&(s(b),e(b))};return u.jsxs(u.Fragment,{children:[u.jsx(ve.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:u.jsx(Ar,{onChange:(f,b)=>d(f,b),className:"book-selection-chapter",isClearable:!1,options:c,getOptionLabel:f=>f.toString(),value:o,isDisabled:n},"start chapter"),label:"Chapters",labelPlacement:"start"}),u.jsx(ve.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:u.jsx(Ar,{onChange:(f,b)=>h(f,b),className:"book-selection-chapter",isClearable:!1,options:c,getOptionLabel:f=>f.toString(),value:a,isDisabled:n},"end chapter"),label:"to",labelPlacement:"start"})]})}var vt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(vt||{});function oi({id:e,isChecked:t,labelText:n="",labelPosition:r=vt.After,isIndeterminate:o=!1,isDefaultChecked:s,isDisabled:a=!1,hasError:l=!1,className:c,onChange:p}){const d=u.jsx(ve.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:s,disabled:a,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:p});let h;if(n){const f=r===vt.Before||r===vt.Above,b=u.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),y=r===vt.Before||r===vt.After,v=y?b:u.jsx("div",{children:b}),m=y?d:u.jsx("div",{children:d});h=u.jsxs(ve.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:a,error:l,children:[f&&v,m,!f&&v]})}else h=d;return h}function bl({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:a}){return u.jsxs("fieldset",{id:e,className:t,children:[n&&u.jsx("legend",{children:n}),r.map(l=>u.jsx(oi,{className:"check-item",isChecked:o.includes(l),labelText:a?a(l):l,onChange:()=>s(l)},l))]})}function ue(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,s;for(s=0;s<r.length;s++)o=r[s],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function S(){return S=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},S.apply(this,arguments)}function vl(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function yl(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Dr={exports:{}},In={exports:{}},ae={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zo;function wl(){if(zo)return ae;zo=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,p=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,h=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,v=e?Symbol.for("react.block"):60121,m=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,_=e?Symbol.for("react.scope"):60119;function w(g){if(typeof g=="object"&&g!==null){var O=g.$$typeof;switch(O){case t:switch(g=g.type,g){case c:case p:case r:case s:case o:case h:return g;default:switch(g=g&&g.$$typeof,g){case l:case d:case y:case b:case a:return g;default:return O}}case n:return O}}}function E(g){return w(g)===p}return ae.AsyncMode=c,ae.ConcurrentMode=p,ae.ContextConsumer=l,ae.ContextProvider=a,ae.Element=t,ae.ForwardRef=d,ae.Fragment=r,ae.Lazy=y,ae.Memo=b,ae.Portal=n,ae.Profiler=s,ae.StrictMode=o,ae.Suspense=h,ae.isAsyncMode=function(g){return E(g)||w(g)===c},ae.isConcurrentMode=E,ae.isContextConsumer=function(g){return w(g)===l},ae.isContextProvider=function(g){return w(g)===a},ae.isElement=function(g){return typeof g=="object"&&g!==null&&g.$$typeof===t},ae.isForwardRef=function(g){return w(g)===d},ae.isFragment=function(g){return w(g)===r},ae.isLazy=function(g){return w(g)===y},ae.isMemo=function(g){return w(g)===b},ae.isPortal=function(g){return w(g)===n},ae.isProfiler=function(g){return w(g)===s},ae.isStrictMode=function(g){return w(g)===o},ae.isSuspense=function(g){return w(g)===h},ae.isValidElementType=function(g){return typeof g=="string"||typeof g=="function"||g===r||g===p||g===s||g===o||g===h||g===f||typeof g=="object"&&g!==null&&(g.$$typeof===y||g.$$typeof===b||g.$$typeof===a||g.$$typeof===l||g.$$typeof===d||g.$$typeof===m||g.$$typeof===x||g.$$typeof===_||g.$$typeof===v)},ae.typeOf=w,ae}var le={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Uo;function xl(){return Uo||(Uo=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,p=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,h=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,v=e?Symbol.for("react.block"):60121,m=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,_=e?Symbol.for("react.scope"):60119;function w(A){return typeof A=="string"||typeof A=="function"||A===r||A===p||A===s||A===o||A===h||A===f||typeof A=="object"&&A!==null&&(A.$$typeof===y||A.$$typeof===b||A.$$typeof===a||A.$$typeof===l||A.$$typeof===d||A.$$typeof===m||A.$$typeof===x||A.$$typeof===_||A.$$typeof===v)}function E(A){if(typeof A=="object"&&A!==null){var ee=A.$$typeof;switch(ee){case t:var M=A.type;switch(M){case c:case p:case r:case s:case o:case h:return M;default:var se=M&&M.$$typeof;switch(se){case l:case d:case y:case b:case a:return se;default:return ee}}case n:return ee}}}var g=c,O=p,P=l,V=a,D=t,F=d,C=r,$=y,I=b,L=n,U=s,R=o,B=h,Q=!1;function J(A){return Q||(Q=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),k(A)||E(A)===c}function k(A){return E(A)===p}function j(A){return E(A)===l}function z(A){return E(A)===a}function X(A){return typeof A=="object"&&A!==null&&A.$$typeof===t}function H(A){return E(A)===d}function q(A){return E(A)===r}function Y(A){return E(A)===y}function G(A){return E(A)===b}function W(A){return E(A)===n}function K(A){return E(A)===s}function Z(A){return E(A)===o}function oe(A){return E(A)===h}le.AsyncMode=g,le.ConcurrentMode=O,le.ContextConsumer=P,le.ContextProvider=V,le.Element=D,le.ForwardRef=F,le.Fragment=C,le.Lazy=$,le.Memo=I,le.Portal=L,le.Profiler=U,le.StrictMode=R,le.Suspense=B,le.isAsyncMode=J,le.isConcurrentMode=k,le.isContextConsumer=j,le.isContextProvider=z,le.isElement=X,le.isForwardRef=H,le.isFragment=q,le.isLazy=Y,le.isMemo=G,le.isPortal=W,le.isProfiler=K,le.isStrictMode=Z,le.isSuspense=oe,le.isValidElementType=w,le.typeOf=E}()),le}var Ho;function si(){return Ho||(Ho=1,process.env.NODE_ENV==="production"?In.exports=wl():In.exports=xl()),In.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Er,qo;function El(){if(qo)return Er;qo=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(s){if(s==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(s)}function o(){try{if(!Object.assign)return!1;var s=new String("abc");if(s[5]="de",Object.getOwnPropertyNames(s)[0]==="5")return!1;for(var a={},l=0;l<10;l++)a["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(a).map(function(d){return a[d]});if(c.join("")!=="0123456789")return!1;var p={};return"abcdefghijklmnopqrst".split("").forEach(function(d){p[d]=d}),Object.keys(Object.assign({},p)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Er=o()?Object.assign:function(s,a){for(var l,c=r(s),p,d=1;d<arguments.length;d++){l=Object(arguments[d]);for(var h in l)t.call(l,h)&&(c[h]=l[h]);if(e){p=e(l);for(var f=0;f<p.length;f++)n.call(l,p[f])&&(c[p[f]]=l[p[f]])}}return c},Er}var Tr,Wo;function no(){if(Wo)return Tr;Wo=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Tr=e,Tr}var kr,Xo;function ii(){return Xo||(Xo=1,kr=Function.call.bind(Object.prototype.hasOwnProperty)),kr}var Sr,Yo;function Tl(){if(Yo)return Sr;Yo=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=no(),n={},r=ii();e=function(s){var a="Warning: "+s;typeof console<"u"&&console.error(a);try{throw new Error(a)}catch{}}}function o(s,a,l,c,p){if(process.env.NODE_ENV!=="production"){for(var d in s)if(r(s,d)){var h;try{if(typeof s[d]!="function"){var f=Error((c||"React class")+": "+l+" type `"+d+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof s[d]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw f.name="Invariant Violation",f}h=s[d](a,d,c,l,null,t)}catch(y){h=y}if(h&&!(h instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+d+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof h+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),h instanceof Error&&!(h.message in n)){n[h.message]=!0;var b=p?p():"";e("Failed "+l+" type: "+h.message+(b??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Sr=o,Sr}var Nr,Go;function kl(){if(Go)return Nr;Go=1;var e=si(),t=El(),n=no(),r=ii(),o=Tl(),s=function(){};process.env.NODE_ENV!=="production"&&(s=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function a(){return null}return Nr=function(l,c){var p=typeof Symbol=="function"&&Symbol.iterator,d="@@iterator";function h(k){var j=k&&(p&&k[p]||k[d]);if(typeof j=="function")return j}var f="<<anonymous>>",b={array:x("array"),bigint:x("bigint"),bool:x("boolean"),func:x("function"),number:x("number"),object:x("object"),string:x("string"),symbol:x("symbol"),any:_(),arrayOf:w,element:E(),elementType:g(),instanceOf:O,node:F(),objectOf:V,oneOf:P,oneOfType:D,shape:$,exact:I};function y(k,j){return k===j?k!==0||1/k===1/j:k!==k&&j!==j}function v(k,j){this.message=k,this.data=j&&typeof j=="object"?j:{},this.stack=""}v.prototype=Error.prototype;function m(k){if(process.env.NODE_ENV!=="production")var j={},z=0;function X(q,Y,G,W,K,Z,oe){if(W=W||f,Z=Z||G,oe!==n){if(c){var A=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw A.name="Invariant Violation",A}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var ee=W+":"+G;!j[ee]&&z<3&&(s("You are manually calling a React.PropTypes validation function for the `"+Z+"` prop on `"+W+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),j[ee]=!0,z++)}}return Y[G]==null?q?Y[G]===null?new v("The "+K+" `"+Z+"` is marked as required "+("in `"+W+"`, but its value is `null`.")):new v("The "+K+" `"+Z+"` is marked as required in "+("`"+W+"`, but its value is `undefined`.")):null:k(Y,G,W,K,Z)}var H=X.bind(null,!1);return H.isRequired=X.bind(null,!0),H}function x(k){function j(z,X,H,q,Y,G){var W=z[X],K=R(W);if(K!==k){var Z=B(W);return new v("Invalid "+q+" `"+Y+"` of type "+("`"+Z+"` supplied to `"+H+"`, expected ")+("`"+k+"`."),{expectedType:k})}return null}return m(j)}function _(){return m(a)}function w(k){function j(z,X,H,q,Y){if(typeof k!="function")return new v("Property `"+Y+"` of component `"+H+"` has invalid PropType notation inside arrayOf.");var G=z[X];if(!Array.isArray(G)){var W=R(G);return new v("Invalid "+q+" `"+Y+"` of type "+("`"+W+"` supplied to `"+H+"`, expected an array."))}for(var K=0;K<G.length;K++){var Z=k(G,K,H,q,Y+"["+K+"]",n);if(Z instanceof Error)return Z}return null}return m(j)}function E(){function k(j,z,X,H,q){var Y=j[z];if(!l(Y)){var G=R(Y);return new v("Invalid "+H+" `"+q+"` of type "+("`"+G+"` supplied to `"+X+"`, expected a single ReactElement."))}return null}return m(k)}function g(){function k(j,z,X,H,q){var Y=j[z];if(!e.isValidElementType(Y)){var G=R(Y);return new v("Invalid "+H+" `"+q+"` of type "+("`"+G+"` supplied to `"+X+"`, expected a single ReactElement type."))}return null}return m(k)}function O(k){function j(z,X,H,q,Y){if(!(z[X]instanceof k)){var G=k.name||f,W=J(z[X]);return new v("Invalid "+q+" `"+Y+"` of type "+("`"+W+"` supplied to `"+H+"`, expected ")+("instance of `"+G+"`."))}return null}return m(j)}function P(k){if(!Array.isArray(k))return process.env.NODE_ENV!=="production"&&(arguments.length>1?s("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):s("Invalid argument supplied to oneOf, expected an array.")),a;function j(z,X,H,q,Y){for(var G=z[X],W=0;W<k.length;W++)if(y(G,k[W]))return null;var K=JSON.stringify(k,function(oe,A){var ee=B(A);return ee==="symbol"?String(A):A});return new v("Invalid "+q+" `"+Y+"` of value `"+String(G)+"` "+("supplied to `"+H+"`, expected one of "+K+"."))}return m(j)}function V(k){function j(z,X,H,q,Y){if(typeof k!="function")return new v("Property `"+Y+"` of component `"+H+"` has invalid PropType notation inside objectOf.");var G=z[X],W=R(G);if(W!=="object")return new v("Invalid "+q+" `"+Y+"` of type "+("`"+W+"` supplied to `"+H+"`, expected an object."));for(var K in G)if(r(G,K)){var Z=k(G,K,H,q,Y+"."+K,n);if(Z instanceof Error)return Z}return null}return m(j)}function D(k){if(!Array.isArray(k))return process.env.NODE_ENV!=="production"&&s("Invalid argument supplied to oneOfType, expected an instance of array."),a;for(var j=0;j<k.length;j++){var z=k[j];if(typeof z!="function")return s("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+Q(z)+" at index "+j+"."),a}function X(H,q,Y,G,W){for(var K=[],Z=0;Z<k.length;Z++){var oe=k[Z],A=oe(H,q,Y,G,W,n);if(A==null)return null;A.data&&r(A.data,"expectedType")&&K.push(A.data.expectedType)}var ee=K.length>0?", expected one of type ["+K.join(", ")+"]":"";return new v("Invalid "+G+" `"+W+"` supplied to "+("`"+Y+"`"+ee+"."))}return m(X)}function F(){function k(j,z,X,H,q){return L(j[z])?null:new v("Invalid "+H+" `"+q+"` supplied to "+("`"+X+"`, expected a ReactNode."))}return m(k)}function C(k,j,z,X,H){return new v((k||"React class")+": "+j+" type `"+z+"."+X+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+H+"`.")}function $(k){function j(z,X,H,q,Y){var G=z[X],W=R(G);if(W!=="object")return new v("Invalid "+q+" `"+Y+"` of type `"+W+"` "+("supplied to `"+H+"`, expected `object`."));for(var K in k){var Z=k[K];if(typeof Z!="function")return C(H,q,Y,K,B(Z));var oe=Z(G,K,H,q,Y+"."+K,n);if(oe)return oe}return null}return m(j)}function I(k){function j(z,X,H,q,Y){var G=z[X],W=R(G);if(W!=="object")return new v("Invalid "+q+" `"+Y+"` of type `"+W+"` "+("supplied to `"+H+"`, expected `object`."));var K=t({},z[X],k);for(var Z in K){var oe=k[Z];if(r(k,Z)&&typeof oe!="function")return C(H,q,Y,Z,B(oe));if(!oe)return new v("Invalid "+q+" `"+Y+"` key `"+Z+"` supplied to `"+H+"`.\nBad object: "+JSON.stringify(z[X],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(k),null,"  "));var A=oe(G,Z,H,q,Y+"."+Z,n);if(A)return A}return null}return m(j)}function L(k){switch(typeof k){case"number":case"string":case"undefined":return!0;case"boolean":return!k;case"object":if(Array.isArray(k))return k.every(L);if(k===null||l(k))return!0;var j=h(k);if(j){var z=j.call(k),X;if(j!==k.entries){for(;!(X=z.next()).done;)if(!L(X.value))return!1}else for(;!(X=z.next()).done;){var H=X.value;if(H&&!L(H[1]))return!1}}else return!1;return!0;default:return!1}}function U(k,j){return k==="symbol"?!0:j?j["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&j instanceof Symbol:!1}function R(k){var j=typeof k;return Array.isArray(k)?"array":k instanceof RegExp?"object":U(j,k)?"symbol":j}function B(k){if(typeof k>"u"||k===null)return""+k;var j=R(k);if(j==="object"){if(k instanceof Date)return"date";if(k instanceof RegExp)return"regexp"}return j}function Q(k){var j=B(k);switch(j){case"array":case"object":return"an "+j;case"boolean":case"date":case"regexp":return"a "+j;default:return j}}function J(k){return!k.constructor||!k.constructor.name?f:k.constructor.name}return b.checkPropTypes=o,b.resetWarningCache=o.resetWarningCache,b.PropTypes=b,b},Nr}var Or,Ko;function Sl(){if(Ko)return Or;Ko=1;var e=no();function t(){}function n(){}return n.resetWarningCache=t,Or=function(){function r(a,l,c,p,d,h){if(h!==e){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}}r.isRequired=r;function o(){return r}var s={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return s.PropTypes=s,s},Or}if(process.env.NODE_ENV!=="production"){var Nl=si(),Ol=!0;Dr.exports=kl()(Nl.isElement,Ol)}else Dr.exports=Sl()();var Cl=Dr.exports;const i=vl(Cl);function qt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function yt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function ai(e){if(!yt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=ai(e[n])}),t}function tt(e,t,n={clone:!0}){const r=n.clone?S({},e):e;return yt(e)&&yt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(yt(t[o])&&o in e&&yt(e[o])?r[o]=tt(e[o],t[o],n):n.clone?r[o]=yt(t[o])?ai(t[o]):t[o]:r[o]=t[o])}),r}function Pl(e){const{prototype:t={}}=e;return!!t.isReactComponent}function li(e,t,n,r,o){const s=e[t],a=o||t;if(s==null||typeof window>"u")return null;let l;const c=s.type;return typeof c=="function"&&!Pl(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const ci=qt(i.element,li);ci.isRequired=qt(i.element.isRequired,li);const Tn=ci;function Rl(e){const{prototype:t={}}=e;return!!t.isReactComponent}function jl(e,t,n,r,o){const s=e[t],a=o||t;if(s==null||typeof window>"u")return null;let l;return typeof s=="function"&&!Rl(s)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ml=qt(i.elementType,jl),Il="exact-prop: ​";function pi(e){return process.env.NODE_ENV==="production"?e:S({},e,{[Il]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Dt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Br={exports:{}},ce={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Jo;function $l(){if(Jo)return ce;Jo=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),h=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),y;y=Symbol.for("react.module.reference");function v(m){if(typeof m=="object"&&m!==null){var x=m.$$typeof;switch(x){case e:switch(m=m.type,m){case n:case o:case r:case p:case d:return m;default:switch(m=m&&m.$$typeof,m){case l:case a:case c:case f:case h:case s:return m;default:return x}}case t:return x}}}return ce.ContextConsumer=a,ce.ContextProvider=s,ce.Element=e,ce.ForwardRef=c,ce.Fragment=n,ce.Lazy=f,ce.Memo=h,ce.Portal=t,ce.Profiler=o,ce.StrictMode=r,ce.Suspense=p,ce.SuspenseList=d,ce.isAsyncMode=function(){return!1},ce.isConcurrentMode=function(){return!1},ce.isContextConsumer=function(m){return v(m)===a},ce.isContextProvider=function(m){return v(m)===s},ce.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===e},ce.isForwardRef=function(m){return v(m)===c},ce.isFragment=function(m){return v(m)===n},ce.isLazy=function(m){return v(m)===f},ce.isMemo=function(m){return v(m)===h},ce.isPortal=function(m){return v(m)===t},ce.isProfiler=function(m){return v(m)===o},ce.isStrictMode=function(m){return v(m)===r},ce.isSuspense=function(m){return v(m)===p},ce.isSuspenseList=function(m){return v(m)===d},ce.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===n||m===o||m===r||m===p||m===d||m===b||typeof m=="object"&&m!==null&&(m.$$typeof===f||m.$$typeof===h||m.$$typeof===s||m.$$typeof===a||m.$$typeof===c||m.$$typeof===y||m.getModuleId!==void 0)},ce.typeOf=v,ce}var pe={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Zo;function _l(){return Zo||(Zo=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),h=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),y=!1,v=!1,m=!1,x=!1,_=!1,w;w=Symbol.for("react.module.reference");function E(M){return!!(typeof M=="string"||typeof M=="function"||M===n||M===o||_||M===r||M===p||M===d||x||M===b||y||v||m||typeof M=="object"&&M!==null&&(M.$$typeof===f||M.$$typeof===h||M.$$typeof===s||M.$$typeof===a||M.$$typeof===c||M.$$typeof===w||M.getModuleId!==void 0))}function g(M){if(typeof M=="object"&&M!==null){var se=M.$$typeof;switch(se){case e:var Ee=M.type;switch(Ee){case n:case o:case r:case p:case d:return Ee;default:var Ce=Ee&&Ee.$$typeof;switch(Ce){case l:case a:case c:case f:case h:case s:return Ce;default:return se}}case t:return se}}}var O=a,P=s,V=e,D=c,F=n,C=f,$=h,I=t,L=o,U=r,R=p,B=d,Q=!1,J=!1;function k(M){return Q||(Q=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function j(M){return J||(J=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function z(M){return g(M)===a}function X(M){return g(M)===s}function H(M){return typeof M=="object"&&M!==null&&M.$$typeof===e}function q(M){return g(M)===c}function Y(M){return g(M)===n}function G(M){return g(M)===f}function W(M){return g(M)===h}function K(M){return g(M)===t}function Z(M){return g(M)===o}function oe(M){return g(M)===r}function A(M){return g(M)===p}function ee(M){return g(M)===d}pe.ContextConsumer=O,pe.ContextProvider=P,pe.Element=V,pe.ForwardRef=D,pe.Fragment=F,pe.Lazy=C,pe.Memo=$,pe.Portal=I,pe.Profiler=L,pe.StrictMode=U,pe.Suspense=R,pe.SuspenseList=B,pe.isAsyncMode=k,pe.isConcurrentMode=j,pe.isContextConsumer=z,pe.isContextProvider=X,pe.isElement=H,pe.isForwardRef=q,pe.isFragment=Y,pe.isLazy=G,pe.isMemo=W,pe.isPortal=K,pe.isProfiler=Z,pe.isStrictMode=oe,pe.isSuspense=A,pe.isSuspenseList=ee,pe.isValidElementType=E,pe.typeOf=g}()),pe}process.env.NODE_ENV==="production"?Br.exports=$l():Br.exports=_l();var qn=Br.exports;const Al=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Dl(e){const t=`${e}`.match(Al);return t&&t[1]||""}function ui(e,t=""){return e.displayName||e.name||Dl(e)||t}function Qo(e,t,n){const r=ui(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Bl(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return ui(e,"Component");if(typeof e=="object")switch(e.$$typeof){case qn.ForwardRef:return Qo(e,e.render,"ForwardRef");case qn.Memo:return Qo(e,e.type,"memo");default:return}}}function nt(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=e[t],a=o||t;return s==null?null:s&&s.nodeType!==1?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Ll=i.oneOfType([i.func,i.object]),ro=Ll;function Ge(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Dt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Lr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function di(e,t=166){let n;function r(...o){const s=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(s,t)}return r.clear=()=>{clearTimeout(n)},r}function Vl(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,s,a)=>{const l=o||"<<anonymous>>",c=a||r;return typeof n[r]<"u"?new Error(`The ${s} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function Fl(e,t){var n,r;return T.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Ne(e){return e&&e.ownerDocument||document}function Bt(e){return Ne(e).defaultView||window}function zl(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?S({},t.propTypes):null;return o=>(s,a,l,c,p,...d)=>{const h=p||a,f=n==null?void 0:n[h];if(f){const b=f(s,a,l,c,p,...d);if(b)return b}return typeof s[a]<"u"&&!s[o]?new Error(`The prop \`${h}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Wn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Ul=typeof window<"u"?T.useLayoutEffect:T.useEffect,Tt=Ul;let es=0;function Hl(e){const[t,n]=T.useState(e),r=e||t;return T.useEffect(()=>{t==null&&(es+=1,n(`mui-${es}`))},[t]),r}const ts=T["useId".toString()];function fi(e){if(ts!==void 0){const t=ts();return e??t}return Hl(e)}function ql(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=o||t;return typeof e[t]<"u"?new Error(`The prop \`${s}\` is not supported. Please remove it.`):null}function hi({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=T.useRef(e!==void 0),[s,a]=T.useState(t),l=o?e:s;if(process.env.NODE_ENV!=="production"){T.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:p}=T.useRef(t);T.useEffect(()=>{!o&&p!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=T.useCallback(p=>{o||a(p)},[]);return[l,c]}function gn(e){const t=T.useRef(e);return Tt(()=>{t.current=e}),T.useRef((...n)=>(0,t.current)(...n)).current}function ze(...e){return T.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Wn(n,t)})},e)}const ns={};function Wl(e,t){const n=T.useRef(ns);return n.current===ns&&(n.current=e(t)),n}const Xl=[];function Yl(e){T.useEffect(e,Xl)}class kn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new kn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function on(){const e=Wl(kn.create).current;return Yl(e.disposeEffect),e}let sr=!0,Vr=!1;const Gl=new kn,Kl={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Jl(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Kl[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Zl(e){e.metaKey||e.altKey||e.ctrlKey||(sr=!0)}function Cr(){sr=!1}function Ql(){this.visibilityState==="hidden"&&Vr&&(sr=!0)}function ec(e){e.addEventListener("keydown",Zl,!0),e.addEventListener("mousedown",Cr,!0),e.addEventListener("pointerdown",Cr,!0),e.addEventListener("touchstart",Cr,!0),e.addEventListener("visibilitychange",Ql,!0)}function tc(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return sr||Jl(t)}function mi(){const e=T.useCallback(o=>{o!=null&&ec(o.ownerDocument)},[]),t=T.useRef(!1);function n(){return t.current?(Vr=!0,Gl.start(100,()=>{Vr=!1}),t.current=!1,!0):!1}function r(o){return tc(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function gi(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function nc(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function rc(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const oc=Number.isInteger||rc;function bi(e,t,n,r){const o=e[t];if(o==null||!oc(o)){const s=nc(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${s}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function vi(e,t,...n){return e[t]===void 0?null:bi(e,t,...n)}function Fr(){return null}vi.isRequired=bi;Fr.isRequired=Fr;const yi=process.env.NODE_ENV==="production"?Fr:vi;function wi(e,t){const n=S({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=S({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},s=t[r];n[r]={},!s||!Object.keys(s)?n[r]=o:!o||!Object.keys(o)?n[r]=s:(n[r]=S({},s),Object.keys(o).forEach(a=>{n[r][a]=wi(o[a],s[a])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function st(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((s,a)=>{if(a){const l=t(a);l!==""&&s.push(l),n&&n[a]&&s.push(n[a])}return s},[]).join(" ")}),r}const rs=e=>e,sc=()=>{let e=rs;return{configure(t){e=t},generate(t){return e(t)},reset(){e=rs}}},ic=sc(),xi=ic,Ei={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Je(e,t,n="Mui"){const r=Ei[t];return r?`${n}-${r}`:`${xi.generate(e)}-${t}`}function ct(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=Je(e,o,n)}),r}function ac(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Ti(e){return typeof e=="string"}function sn(e,t,n){return e===void 0||Ti(e)?t:S({},t,{ownerState:S({},t.ownerState,n)})}const lc={disableDefaultClasses:!1},cc=T.createContext(lc);function pc(e){const{disableDefaultClasses:t}=T.useContext(cc);return n=>t?"":e(n)}function ki(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function uc(e,t,n){return typeof e=="function"?e(t,n):e}function os(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function dc(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:s}=e;if(!t){const b=Se(n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),y=S({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),v=S({},n,o,r);return b.length>0&&(v.className=b),Object.keys(y).length>0&&(v.style=y),{props:v,internalRef:void 0}}const a=ki(S({},o,r)),l=os(r),c=os(o),p=t(a),d=Se(p==null?void 0:p.className,n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),h=S({},p==null?void 0:p.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=S({},p,n,c,l);return d.length>0&&(f.className=d),Object.keys(h).length>0&&(f.style=h),{props:f,internalRef:p.ref}}const fc=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function kt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:s=!1}=e,a=ue(e,fc),l=s?{}:uc(r,o),{props:c,internalRef:p}=dc(S({},a,{externalSlotProps:l})),d=ze(p,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return sn(n,S({},c,{ref:d}),o)}const Si="base";function hc(e){return`${Si}--${e}`}function mc(e,t){return`${Si}-${e}-${t}`}function Ni(e,t){const n=Ei[t];return n?hc(n):mc(e,t)}function gc(e,t){const n={};return t.forEach(r=>{n[r]=Ni(e,r)}),n}const bc=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function vc(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function yc(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function wc(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||yc(e))}function xc(e){const t=[],n=[];return Array.from(e.querySelectorAll(bc)).forEach((r,o)=>{const s=vc(r);s===-1||!wc(r)||(s===0?t.push(r):n.push({documentOrder:o,tabIndex:s,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function Ec(){return!0}function Xn(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:s=xc,isEnabled:a=Ec,open:l}=e,c=T.useRef(!1),p=T.useRef(null),d=T.useRef(null),h=T.useRef(null),f=T.useRef(null),b=T.useRef(!1),y=T.useRef(null),v=ze(t.ref,y),m=T.useRef(null);T.useEffect(()=>{!l||!y.current||(b.current=!n)},[n,l]),T.useEffect(()=>{if(!l||!y.current)return;const w=Ne(y.current);return y.current.contains(w.activeElement)||(y.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),y.current.setAttribute("tabIndex","-1")),b.current&&y.current.focus()),()=>{o||(h.current&&h.current.focus&&(c.current=!0,h.current.focus()),h.current=null)}},[l]),T.useEffect(()=>{if(!l||!y.current)return;const w=Ne(y.current),E=P=>{m.current=P,!(r||!a()||P.key!=="Tab")&&w.activeElement===y.current&&P.shiftKey&&(c.current=!0,d.current&&d.current.focus())},g=()=>{const P=y.current;if(P===null)return;if(!w.hasFocus()||!a()||c.current){c.current=!1;return}if(P.contains(w.activeElement)||r&&w.activeElement!==p.current&&w.activeElement!==d.current)return;if(w.activeElement!==f.current)f.current=null;else if(f.current!==null)return;if(!b.current)return;let V=[];if((w.activeElement===p.current||w.activeElement===d.current)&&(V=s(y.current)),V.length>0){var D,F;const C=!!((D=m.current)!=null&&D.shiftKey&&((F=m.current)==null?void 0:F.key)==="Tab"),$=V[0],I=V[V.length-1];typeof $!="string"&&typeof I!="string"&&(C?I.focus():$.focus())}else P.focus()};w.addEventListener("focusin",g),w.addEventListener("keydown",E,!0);const O=setInterval(()=>{w.activeElement&&w.activeElement.tagName==="BODY"&&g()},50);return()=>{clearInterval(O),w.removeEventListener("focusin",g),w.removeEventListener("keydown",E,!0)}},[n,r,o,a,l,s]);const x=w=>{h.current===null&&(h.current=w.relatedTarget),b.current=!0,f.current=w.target;const E=t.props.onFocus;E&&E(w)},_=w=>{h.current===null&&(h.current=w.relatedTarget),b.current=!0};return u.jsxs(T.Fragment,{children:[u.jsx("div",{tabIndex:l?0:-1,onFocus:_,ref:p,"data-testid":"sentinelStart"}),T.cloneElement(t,{ref:v,onFocus:x}),u.jsx("div",{tabIndex:l?0:-1,onFocus:_,ref:d,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(Xn.propTypes={children:Tn,disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableRestoreFocus:i.bool,getTabbable:i.func,isEnabled:i.func,open:i.bool.isRequired});process.env.NODE_ENV!=="production"&&(Xn["propTypes"]=pi(Xn.propTypes));function Tc(e){return typeof e=="function"?e():e}const bn=T.forwardRef(function(t,n){const{children:r,container:o,disablePortal:s=!1}=t,[a,l]=T.useState(null),c=ze(T.isValidElement(r)?r.ref:null,n);if(Tt(()=>{s||l(Tc(o)||document.body)},[o,s]),Tt(()=>{if(a&&!s)return Wn(n,a),()=>{Wn(n,null)}},[n,a,s]),s){if(T.isValidElement(r)){const p={ref:c};return T.cloneElement(r,p)}return u.jsx(T.Fragment,{children:r})}return u.jsx(T.Fragment,{children:a&&Ba.createPortal(r,a)})});process.env.NODE_ENV!=="production"&&(bn.propTypes={children:i.node,container:i.oneOfType([nt,i.func]),disablePortal:i.bool});process.env.NODE_ENV!=="production"&&(bn["propTypes"]=pi(bn.propTypes));function kc(e){const t=Ne(e);return t.body===e?Bt(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function cn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function ss(e){return parseInt(Bt(e).getComputedStyle(e).paddingRight,10)||0}function Sc(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function is(e,t,n,r,o){const s=[t,n,...r];[].forEach.call(e.children,a=>{const l=s.indexOf(a)===-1,c=!Sc(a);l&&c&&cn(a,o)})}function Pr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function Nc(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(kc(r)){const a=gi(Ne(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${ss(r)+a}px`;const l=Ne(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${ss(c)+a}px`})}let s;if(r.parentNode instanceof DocumentFragment)s=Ne(r).body;else{const a=r.parentElement,l=Bt(r);s=(a==null?void 0:a.nodeName)==="HTML"&&l.getComputedStyle(a).overflowY==="scroll"?a:r}n.push({value:s.style.overflow,property:"overflow",el:s},{value:s.style.overflowX,property:"overflow-x",el:s},{value:s.style.overflowY,property:"overflow-y",el:s}),s.style.overflow="hidden"}return()=>{n.forEach(({value:s,el:a,property:l})=>{s?a.style.setProperty(l,s):a.style.removeProperty(l)})}}function Oc(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class Cc{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&cn(t.modalRef,!1);const o=Oc(n);is(n,t.mount,t.modalRef,o,!0);const s=Pr(this.containers,a=>a.container===n);return s!==-1?(this.containers[s].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=Pr(this.containers,s=>s.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=Nc(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=Pr(this.containers,a=>a.modals.indexOf(t)!==-1),s=this.containers[o];if(s.modals.splice(s.modals.indexOf(t),1),this.modals.splice(r,1),s.modals.length===0)s.restore&&s.restore(),t.modalRef&&cn(t.modalRef,n),is(s.container,t.mount,t.modalRef,s.hiddenSiblings,!1),this.containers.splice(o,1);else{const a=s.modals[s.modals.length-1];a.modalRef&&cn(a.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Pc(e){return typeof e=="function"?e():e}function Rc(e){return e?e.props.hasOwnProperty("in"):!1}const jc=new Cc;function Mc(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=jc,closeAfterTransition:s=!1,onTransitionEnter:a,onTransitionExited:l,children:c,onClose:p,open:d,rootRef:h}=e,f=T.useRef({}),b=T.useRef(null),y=T.useRef(null),v=ze(y,h),[m,x]=T.useState(!d),_=Rc(c);let w=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(w=!1);const E=()=>Ne(b.current),g=()=>(f.current.modalRef=y.current,f.current.mount=b.current,f.current),O=()=>{o.mount(g(),{disableScrollLock:r}),y.current&&(y.current.scrollTop=0)},P=gn(()=>{const R=Pc(t)||E().body;o.add(g(),R),y.current&&O()}),V=T.useCallback(()=>o.isTopModal(g()),[o]),D=gn(R=>{b.current=R,R&&(d&&V()?O():y.current&&cn(y.current,w))}),F=T.useCallback(()=>{o.remove(g(),w)},[w,o]);T.useEffect(()=>()=>{F()},[F]),T.useEffect(()=>{d?P():(!_||!s)&&F()},[d,F,_,s,P]);const C=R=>B=>{var Q;(Q=R.onKeyDown)==null||Q.call(R,B),!(B.key!=="Escape"||B.which===229||!V())&&(n||(B.stopPropagation(),p&&p(B,"escapeKeyDown")))},$=R=>B=>{var Q;(Q=R.onClick)==null||Q.call(R,B),B.target===B.currentTarget&&p&&p(B,"backdropClick")};return{getRootProps:(R={})=>{const B=ki(e);delete B.onTransitionEnter,delete B.onTransitionExited;const Q=S({},B,R);return S({role:"presentation"},Q,{onKeyDown:C(Q),ref:v})},getBackdropProps:(R={})=>{const B=R;return S({"aria-hidden":!0},B,{onClick:$(B),open:d})},getTransitionProps:()=>{const R=()=>{x(!1),a&&a()},B=()=>{x(!0),l&&l(),s&&F()};return{onEnter:Lr(R,c==null?void 0:c.props.onEnter),onExited:Lr(B,c==null?void 0:c.props.onExited)}},rootRef:v,portalRef:D,isTopModal:V,exited:m,hasTransition:_}}var je="top",Ue="bottom",He="right",Me="left",oo="auto",Sn=[je,Ue,He,Me],Lt="start",vn="end",Ic="clippingParents",Oi="viewport",Qt="popper",$c="reference",as=Sn.reduce(function(e,t){return e.concat([t+"-"+Lt,t+"-"+vn])},[]),Ci=[].concat(Sn,[oo]).reduce(function(e,t){return e.concat([t,t+"-"+Lt,t+"-"+vn])},[]),_c="beforeRead",Ac="read",Dc="afterRead",Bc="beforeMain",Lc="main",Vc="afterMain",Fc="beforeWrite",zc="write",Uc="afterWrite",Hc=[_c,Ac,Dc,Bc,Lc,Vc,Fc,zc,Uc];function Ke(e){return e?(e.nodeName||"").toLowerCase():null}function Be(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function St(e){var t=Be(e).Element;return e instanceof t||e instanceof Element}function Fe(e){var t=Be(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function so(e){if(typeof ShadowRoot>"u")return!1;var t=Be(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function qc(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},s=t.elements[n];!Fe(s)||!Ke(s)||(Object.assign(s.style,r),Object.keys(o).forEach(function(a){var l=o[a];l===!1?s.removeAttribute(a):s.setAttribute(a,l===!0?"":l)}))})}function Wc(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],s=t.attributes[r]||{},a=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=a.reduce(function(c,p){return c[p]="",c},{});!Fe(o)||!Ke(o)||(Object.assign(o.style,l),Object.keys(s).forEach(function(c){o.removeAttribute(c)}))})}}const Xc={name:"applyStyles",enabled:!0,phase:"write",fn:qc,effect:Wc,requires:["computeStyles"]};function Ye(e){return e.split("-")[0]}var xt=Math.max,Yn=Math.min,Vt=Math.round;function zr(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Pi(){return!/^((?!chrome|android).)*safari/i.test(zr())}function Ft(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,s=1;t&&Fe(e)&&(o=e.offsetWidth>0&&Vt(r.width)/e.offsetWidth||1,s=e.offsetHeight>0&&Vt(r.height)/e.offsetHeight||1);var a=St(e)?Be(e):window,l=a.visualViewport,c=!Pi()&&n,p=(r.left+(c&&l?l.offsetLeft:0))/o,d=(r.top+(c&&l?l.offsetTop:0))/s,h=r.width/o,f=r.height/s;return{width:h,height:f,top:d,right:p+h,bottom:d+f,left:p,x:p,y:d}}function io(e){var t=Ft(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Ri(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&so(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function rt(e){return Be(e).getComputedStyle(e)}function Yc(e){return["table","td","th"].indexOf(Ke(e))>=0}function pt(e){return((St(e)?e.ownerDocument:e.document)||window.document).documentElement}function ir(e){return Ke(e)==="html"?e:e.assignedSlot||e.parentNode||(so(e)?e.host:null)||pt(e)}function ls(e){return!Fe(e)||rt(e).position==="fixed"?null:e.offsetParent}function Gc(e){var t=/firefox/i.test(zr()),n=/Trident/i.test(zr());if(n&&Fe(e)){var r=rt(e);if(r.position==="fixed")return null}var o=ir(e);for(so(o)&&(o=o.host);Fe(o)&&["html","body"].indexOf(Ke(o))<0;){var s=rt(o);if(s.transform!=="none"||s.perspective!=="none"||s.contain==="paint"||["transform","perspective"].indexOf(s.willChange)!==-1||t&&s.willChange==="filter"||t&&s.filter&&s.filter!=="none")return o;o=o.parentNode}return null}function Nn(e){for(var t=Be(e),n=ls(e);n&&Yc(n)&&rt(n).position==="static";)n=ls(n);return n&&(Ke(n)==="html"||Ke(n)==="body"&&rt(n).position==="static")?t:n||Gc(e)||t}function ao(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function pn(e,t,n){return xt(e,Yn(t,n))}function Kc(e,t,n){var r=pn(e,t,n);return r>n?n:r}function ji(){return{top:0,right:0,bottom:0,left:0}}function Mi(e){return Object.assign({},ji(),e)}function Ii(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Jc=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Mi(typeof t!="number"?t:Ii(t,Sn))};function Zc(e){var t,n=e.state,r=e.name,o=e.options,s=n.elements.arrow,a=n.modifiersData.popperOffsets,l=Ye(n.placement),c=ao(l),p=[Me,He].indexOf(l)>=0,d=p?"height":"width";if(!(!s||!a)){var h=Jc(o.padding,n),f=io(s),b=c==="y"?je:Me,y=c==="y"?Ue:He,v=n.rects.reference[d]+n.rects.reference[c]-a[c]-n.rects.popper[d],m=a[c]-n.rects.reference[c],x=Nn(s),_=x?c==="y"?x.clientHeight||0:x.clientWidth||0:0,w=v/2-m/2,E=h[b],g=_-f[d]-h[y],O=_/2-f[d]/2+w,P=pn(E,O,g),V=c;n.modifiersData[r]=(t={},t[V]=P,t.centerOffset=P-O,t)}}function Qc(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Ri(t.elements.popper,o)&&(t.elements.arrow=o))}const ep={name:"arrow",enabled:!0,phase:"main",fn:Zc,effect:Qc,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function zt(e){return e.split("-")[1]}var tp={top:"auto",right:"auto",bottom:"auto",left:"auto"};function np(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Vt(n*o)/o||0,y:Vt(r*o)/o||0}}function cs(e){var t,n=e.popper,r=e.popperRect,o=e.placement,s=e.variation,a=e.offsets,l=e.position,c=e.gpuAcceleration,p=e.adaptive,d=e.roundOffsets,h=e.isFixed,f=a.x,b=f===void 0?0:f,y=a.y,v=y===void 0?0:y,m=typeof d=="function"?d({x:b,y:v}):{x:b,y:v};b=m.x,v=m.y;var x=a.hasOwnProperty("x"),_=a.hasOwnProperty("y"),w=Me,E=je,g=window;if(p){var O=Nn(n),P="clientHeight",V="clientWidth";if(O===Be(n)&&(O=pt(n),rt(O).position!=="static"&&l==="absolute"&&(P="scrollHeight",V="scrollWidth")),O=O,o===je||(o===Me||o===He)&&s===vn){E=Ue;var D=h&&O===g&&g.visualViewport?g.visualViewport.height:O[P];v-=D-r.height,v*=c?1:-1}if(o===Me||(o===je||o===Ue)&&s===vn){w=He;var F=h&&O===g&&g.visualViewport?g.visualViewport.width:O[V];b-=F-r.width,b*=c?1:-1}}var C=Object.assign({position:l},p&&tp),$=d===!0?np({x:b,y:v},Be(n)):{x:b,y:v};if(b=$.x,v=$.y,c){var I;return Object.assign({},C,(I={},I[E]=_?"0":"",I[w]=x?"0":"",I.transform=(g.devicePixelRatio||1)<=1?"translate("+b+"px, "+v+"px)":"translate3d("+b+"px, "+v+"px, 0)",I))}return Object.assign({},C,(t={},t[E]=_?v+"px":"",t[w]=x?b+"px":"",t.transform="",t))}function rp(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,s=n.adaptive,a=s===void 0?!0:s,l=n.roundOffsets,c=l===void 0?!0:l,p={placement:Ye(t.placement),variation:zt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,cs(Object.assign({},p,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,cs(Object.assign({},p,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const op={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:rp,data:{}};var $n={passive:!0};function sp(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,s=o===void 0?!0:o,a=r.resize,l=a===void 0?!0:a,c=Be(t.elements.popper),p=[].concat(t.scrollParents.reference,t.scrollParents.popper);return s&&p.forEach(function(d){d.addEventListener("scroll",n.update,$n)}),l&&c.addEventListener("resize",n.update,$n),function(){s&&p.forEach(function(d){d.removeEventListener("scroll",n.update,$n)}),l&&c.removeEventListener("resize",n.update,$n)}}const ip={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:sp,data:{}};var ap={left:"right",right:"left",bottom:"top",top:"bottom"};function Ln(e){return e.replace(/left|right|bottom|top/g,function(t){return ap[t]})}var lp={start:"end",end:"start"};function ps(e){return e.replace(/start|end/g,function(t){return lp[t]})}function lo(e){var t=Be(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function co(e){return Ft(pt(e)).left+lo(e).scrollLeft}function cp(e,t){var n=Be(e),r=pt(e),o=n.visualViewport,s=r.clientWidth,a=r.clientHeight,l=0,c=0;if(o){s=o.width,a=o.height;var p=Pi();(p||!p&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:s,height:a,x:l+co(e),y:c}}function pp(e){var t,n=pt(e),r=lo(e),o=(t=e.ownerDocument)==null?void 0:t.body,s=xt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=xt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+co(e),c=-r.scrollTop;return rt(o||n).direction==="rtl"&&(l+=xt(n.clientWidth,o?o.clientWidth:0)-s),{width:s,height:a,x:l,y:c}}function po(e){var t=rt(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function $i(e){return["html","body","#document"].indexOf(Ke(e))>=0?e.ownerDocument.body:Fe(e)&&po(e)?e:$i(ir(e))}function un(e,t){var n;t===void 0&&(t=[]);var r=$i(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),s=Be(r),a=o?[s].concat(s.visualViewport||[],po(r)?r:[]):r,l=t.concat(a);return o?l:l.concat(un(ir(a)))}function Ur(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function up(e,t){var n=Ft(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function us(e,t,n){return t===Oi?Ur(cp(e,n)):St(t)?up(t,n):Ur(pp(pt(e)))}function dp(e){var t=un(ir(e)),n=["absolute","fixed"].indexOf(rt(e).position)>=0,r=n&&Fe(e)?Nn(e):e;return St(r)?t.filter(function(o){return St(o)&&Ri(o,r)&&Ke(o)!=="body"}):[]}function fp(e,t,n,r){var o=t==="clippingParents"?dp(e):[].concat(t),s=[].concat(o,[n]),a=s[0],l=s.reduce(function(c,p){var d=us(e,p,r);return c.top=xt(d.top,c.top),c.right=Yn(d.right,c.right),c.bottom=Yn(d.bottom,c.bottom),c.left=xt(d.left,c.left),c},us(e,a,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function _i(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ye(r):null,s=r?zt(r):null,a=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case je:c={x:a,y:t.y-n.height};break;case Ue:c={x:a,y:t.y+t.height};break;case He:c={x:t.x+t.width,y:l};break;case Me:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var p=o?ao(o):null;if(p!=null){var d=p==="y"?"height":"width";switch(s){case Lt:c[p]=c[p]-(t[d]/2-n[d]/2);break;case vn:c[p]=c[p]+(t[d]/2-n[d]/2);break}}return c}function yn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,s=n.strategy,a=s===void 0?e.strategy:s,l=n.boundary,c=l===void 0?Ic:l,p=n.rootBoundary,d=p===void 0?Oi:p,h=n.elementContext,f=h===void 0?Qt:h,b=n.altBoundary,y=b===void 0?!1:b,v=n.padding,m=v===void 0?0:v,x=Mi(typeof m!="number"?m:Ii(m,Sn)),_=f===Qt?$c:Qt,w=e.rects.popper,E=e.elements[y?_:f],g=fp(St(E)?E:E.contextElement||pt(e.elements.popper),c,d,a),O=Ft(e.elements.reference),P=_i({reference:O,element:w,strategy:"absolute",placement:o}),V=Ur(Object.assign({},w,P)),D=f===Qt?V:O,F={top:g.top-D.top+x.top,bottom:D.bottom-g.bottom+x.bottom,left:g.left-D.left+x.left,right:D.right-g.right+x.right},C=e.modifiersData.offset;if(f===Qt&&C){var $=C[o];Object.keys(F).forEach(function(I){var L=[He,Ue].indexOf(I)>=0?1:-1,U=[je,Ue].indexOf(I)>=0?"y":"x";F[I]+=$[U]*L})}return F}function hp(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,s=n.rootBoundary,a=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,p=c===void 0?Ci:c,d=zt(r),h=d?l?as:as.filter(function(y){return zt(y)===d}):Sn,f=h.filter(function(y){return p.indexOf(y)>=0});f.length===0&&(f=h);var b=f.reduce(function(y,v){return y[v]=yn(e,{placement:v,boundary:o,rootBoundary:s,padding:a})[Ye(v)],y},{});return Object.keys(b).sort(function(y,v){return b[y]-b[v]})}function mp(e){if(Ye(e)===oo)return[];var t=Ln(e);return[ps(e),t,ps(t)]}function gp(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,s=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!0:a,c=n.fallbackPlacements,p=n.padding,d=n.boundary,h=n.rootBoundary,f=n.altBoundary,b=n.flipVariations,y=b===void 0?!0:b,v=n.allowedAutoPlacements,m=t.options.placement,x=Ye(m),_=x===m,w=c||(_||!y?[Ln(m)]:mp(m)),E=[m].concat(w).reduce(function(H,q){return H.concat(Ye(q)===oo?hp(t,{placement:q,boundary:d,rootBoundary:h,padding:p,flipVariations:y,allowedAutoPlacements:v}):q)},[]),g=t.rects.reference,O=t.rects.popper,P=new Map,V=!0,D=E[0],F=0;F<E.length;F++){var C=E[F],$=Ye(C),I=zt(C)===Lt,L=[je,Ue].indexOf($)>=0,U=L?"width":"height",R=yn(t,{placement:C,boundary:d,rootBoundary:h,altBoundary:f,padding:p}),B=L?I?He:Me:I?Ue:je;g[U]>O[U]&&(B=Ln(B));var Q=Ln(B),J=[];if(s&&J.push(R[$]<=0),l&&J.push(R[B]<=0,R[Q]<=0),J.every(function(H){return H})){D=C,V=!1;break}P.set(C,J)}if(V)for(var k=y?3:1,j=function(q){var Y=E.find(function(G){var W=P.get(G);if(W)return W.slice(0,q).every(function(K){return K})});if(Y)return D=Y,"break"},z=k;z>0;z--){var X=j(z);if(X==="break")break}t.placement!==D&&(t.modifiersData[r]._skip=!0,t.placement=D,t.reset=!0)}}const bp={name:"flip",enabled:!0,phase:"main",fn:gp,requiresIfExists:["offset"],data:{_skip:!1}};function ds(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function fs(e){return[je,He,Ue,Me].some(function(t){return e[t]>=0})}function vp(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,s=t.modifiersData.preventOverflow,a=yn(t,{elementContext:"reference"}),l=yn(t,{altBoundary:!0}),c=ds(a,r),p=ds(l,o,s),d=fs(c),h=fs(p);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:p,isReferenceHidden:d,hasPopperEscaped:h},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":d,"data-popper-escaped":h})}const yp={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:vp};function wp(e,t,n){var r=Ye(e),o=[Me,je].indexOf(r)>=0?-1:1,s=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,a=s[0],l=s[1];return a=a||0,l=(l||0)*o,[Me,He].indexOf(r)>=0?{x:l,y:a}:{x:a,y:l}}function xp(e){var t=e.state,n=e.options,r=e.name,o=n.offset,s=o===void 0?[0,0]:o,a=Ci.reduce(function(d,h){return d[h]=wp(h,t.rects,s),d},{}),l=a[t.placement],c=l.x,p=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=p),t.modifiersData[r]=a}const Ep={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:xp};function Tp(e){var t=e.state,n=e.name;t.modifiersData[n]=_i({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const kp={name:"popperOffsets",enabled:!0,phase:"read",fn:Tp,data:{}};function Sp(e){return e==="x"?"y":"x"}function Np(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,s=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!1:a,c=n.boundary,p=n.rootBoundary,d=n.altBoundary,h=n.padding,f=n.tether,b=f===void 0?!0:f,y=n.tetherOffset,v=y===void 0?0:y,m=yn(t,{boundary:c,rootBoundary:p,padding:h,altBoundary:d}),x=Ye(t.placement),_=zt(t.placement),w=!_,E=ao(x),g=Sp(E),O=t.modifiersData.popperOffsets,P=t.rects.reference,V=t.rects.popper,D=typeof v=="function"?v(Object.assign({},t.rects,{placement:t.placement})):v,F=typeof D=="number"?{mainAxis:D,altAxis:D}:Object.assign({mainAxis:0,altAxis:0},D),C=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,$={x:0,y:0};if(O){if(s){var I,L=E==="y"?je:Me,U=E==="y"?Ue:He,R=E==="y"?"height":"width",B=O[E],Q=B+m[L],J=B-m[U],k=b?-V[R]/2:0,j=_===Lt?P[R]:V[R],z=_===Lt?-V[R]:-P[R],X=t.elements.arrow,H=b&&X?io(X):{width:0,height:0},q=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:ji(),Y=q[L],G=q[U],W=pn(0,P[R],H[R]),K=w?P[R]/2-k-W-Y-F.mainAxis:j-W-Y-F.mainAxis,Z=w?-P[R]/2+k+W+G+F.mainAxis:z+W+G+F.mainAxis,oe=t.elements.arrow&&Nn(t.elements.arrow),A=oe?E==="y"?oe.clientTop||0:oe.clientLeft||0:0,ee=(I=C==null?void 0:C[E])!=null?I:0,M=B+K-ee-A,se=B+Z-ee,Ee=pn(b?Yn(Q,M):Q,B,b?xt(J,se):J);O[E]=Ee,$[E]=Ee-B}if(l){var Ce,we=E==="x"?je:Me,dt=E==="x"?Ue:He,Pe=O[g],Ze=g==="y"?"height":"width",$e=Pe+m[we],Qe=Pe-m[dt],Te=[je,Me].indexOf(x)!==-1,Ot=(Ce=C==null?void 0:C[g])!=null?Ce:0,ft=Te?$e:Pe-P[Ze]-V[Ze]-Ot+F.altAxis,Wt=Te?Pe+P[Ze]+V[Ze]-Ot-F.altAxis:Qe,Rn=b&&Te?Kc(ft,Pe,Wt):pn(b?ft:$e,Pe,b?Wt:Qe);O[g]=Rn,$[g]=Rn-Pe}t.modifiersData[r]=$}}const Op={name:"preventOverflow",enabled:!0,phase:"main",fn:Np,requiresIfExists:["offset"]};function Cp(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Pp(e){return e===Be(e)||!Fe(e)?lo(e):Cp(e)}function Rp(e){var t=e.getBoundingClientRect(),n=Vt(t.width)/e.offsetWidth||1,r=Vt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function jp(e,t,n){n===void 0&&(n=!1);var r=Fe(t),o=Fe(t)&&Rp(t),s=pt(t),a=Ft(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((Ke(t)!=="body"||po(s))&&(l=Pp(t)),Fe(t)?(c=Ft(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):s&&(c.x=co(s))),{x:a.left+l.scrollLeft-c.x,y:a.top+l.scrollTop-c.y,width:a.width,height:a.height}}function Mp(e){var t=new Map,n=new Set,r=[];e.forEach(function(s){t.set(s.name,s)});function o(s){n.add(s.name);var a=[].concat(s.requires||[],s.requiresIfExists||[]);a.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(s)}return e.forEach(function(s){n.has(s.name)||o(s)}),r}function Ip(e){var t=Mp(e);return Hc.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function $p(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function _p(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var hs={placement:"bottom",modifiers:[],strategy:"absolute"};function ms(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Ap(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,s=o===void 0?hs:o;return function(l,c,p){p===void 0&&(p=s);var d={placement:"bottom",orderedModifiers:[],options:Object.assign({},hs,s),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},h=[],f=!1,b={state:d,setOptions:function(x){var _=typeof x=="function"?x(d.options):x;v(),d.options=Object.assign({},s,d.options,_),d.scrollParents={reference:St(l)?un(l):l.contextElement?un(l.contextElement):[],popper:un(c)};var w=Ip(_p([].concat(r,d.options.modifiers)));return d.orderedModifiers=w.filter(function(E){return E.enabled}),y(),b.update()},forceUpdate:function(){if(!f){var x=d.elements,_=x.reference,w=x.popper;if(ms(_,w)){d.rects={reference:jp(_,Nn(w),d.options.strategy==="fixed"),popper:io(w)},d.reset=!1,d.placement=d.options.placement,d.orderedModifiers.forEach(function(F){return d.modifiersData[F.name]=Object.assign({},F.data)});for(var E=0;E<d.orderedModifiers.length;E++){if(d.reset===!0){d.reset=!1,E=-1;continue}var g=d.orderedModifiers[E],O=g.fn,P=g.options,V=P===void 0?{}:P,D=g.name;typeof O=="function"&&(d=O({state:d,options:V,name:D,instance:b})||d)}}}},update:$p(function(){return new Promise(function(m){b.forceUpdate(),m(d)})}),destroy:function(){v(),f=!0}};if(!ms(l,c))return b;b.setOptions(p).then(function(m){!f&&p.onFirstUpdate&&p.onFirstUpdate(m)});function y(){d.orderedModifiers.forEach(function(m){var x=m.name,_=m.options,w=_===void 0?{}:_,E=m.effect;if(typeof E=="function"){var g=E({state:d,name:x,instance:b,options:w}),O=function(){};h.push(g||O)}})}function v(){h.forEach(function(m){return m()}),h=[]}return b}}var Dp=[ip,kp,op,Xc,Ep,bp,Op,ep,yp],Bp=Ap({defaultModifiers:Dp});const Ai="Popper";function Lp(e){return Ni(Ai,e)}gc(Ai,["root"]);const Vp=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Fp=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function zp(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function Gn(e){return typeof e=="function"?e():e}function ar(e){return e.nodeType!==void 0}function Up(e){return!ar(e)}const Hp=()=>st({root:["root"]},pc(Lp)),qp={},Wp=T.forwardRef(function(t,n){var r;const{anchorEl:o,children:s,direction:a,disablePortal:l,modifiers:c,open:p,placement:d,popperOptions:h,popperRef:f,slotProps:b={},slots:y={},TransitionProps:v}=t,m=ue(t,Vp),x=T.useRef(null),_=ze(x,n),w=T.useRef(null),E=ze(w,f),g=T.useRef(E);Tt(()=>{g.current=E},[E]),T.useImperativeHandle(f,()=>w.current,[]);const O=zp(d,a),[P,V]=T.useState(O),[D,F]=T.useState(Gn(o));T.useEffect(()=>{w.current&&w.current.forceUpdate()}),T.useEffect(()=>{o&&F(Gn(o))},[o]),Tt(()=>{if(!D||!p)return;const U=Q=>{V(Q.placement)};if(process.env.NODE_ENV!=="production"&&D&&ar(D)&&D.nodeType===1){const Q=D.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Q.top===0&&Q.left===0&&Q.right===0&&Q.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let R=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:Q})=>{U(Q)}}];c!=null&&(R=R.concat(c)),h&&h.modifiers!=null&&(R=R.concat(h.modifiers));const B=Bp(D,x.current,S({placement:O},h,{modifiers:R}));return g.current(B),()=>{B.destroy(),g.current(null)}},[D,l,c,p,h,O]);const C={placement:P};v!==null&&(C.TransitionProps=v);const $=Hp(),I=(r=y.root)!=null?r:"div",L=kt({elementType:I,externalSlotProps:b.root,externalForwardedProps:m,additionalProps:{role:"tooltip",ref:_},ownerState:t,className:$.root});return u.jsx(I,S({},L,{children:typeof s=="function"?s(C):s}))}),Di=T.forwardRef(function(t,n){const{anchorEl:r,children:o,container:s,direction:a="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:p,open:d,placement:h="bottom",popperOptions:f=qp,popperRef:b,style:y,transition:v=!1,slotProps:m={},slots:x={}}=t,_=ue(t,Fp),[w,E]=T.useState(!0),g=()=>{E(!1)},O=()=>{E(!0)};if(!c&&!d&&(!v||w))return null;let P;if(s)P=s;else if(r){const F=Gn(r);P=F&&ar(F)?Ne(F).body:Ne(null).body}const V=!d&&c&&(!v||w)?"none":void 0,D=v?{in:d,onEnter:g,onExited:O}:void 0;return u.jsx(bn,{disablePortal:l,container:P,children:u.jsx(Wp,S({anchorEl:r,direction:a,disablePortal:l,modifiers:p,ref:n,open:v?!w:d,placement:h,popperOptions:f,popperRef:b,slotProps:m,slots:x},_,{style:S({position:"fixed",top:0,left:0,display:V},y),TransitionProps:D,children:o}))})});process.env.NODE_ENV!=="production"&&(Di.propTypes={anchorEl:qt(i.oneOfType([nt,i.object,i.func]),e=>{if(e.open){const t=Gn(e.anchorEl);if(t&&ar(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Up(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:i.oneOfType([i.node,i.func]),container:i.oneOfType([nt,i.func]),direction:i.oneOf(["ltr","rtl"]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:ro,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),transition:i.bool});const Xp=["values","unit","step"],Yp=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>S({},n,{[r.key]:r.val}),{})};function Gp(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=ue(e,Xp),s=Yp(t),a=Object.keys(s);function l(f){return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n})`}function c(f){return`@media (max-width:${(typeof t[f]=="number"?t[f]:f)-r/100}${n})`}function p(f,b){const y=a.indexOf(b);return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n}) and (max-width:${(y!==-1&&typeof t[a[y]]=="number"?t[a[y]]:b)-r/100}${n})`}function d(f){return a.indexOf(f)+1<a.length?p(f,a[a.indexOf(f)+1]):l(f)}function h(f){const b=a.indexOf(f);return b===0?l(a[1]):b===a.length-1?c(a[b]):p(f,a[a.indexOf(f)+1]).replace("@media","@media not all and")}return S({keys:a,values:s,up:l,down:c,between:p,only:d,not:h,unit:n},o)}const Kp={borderRadius:4},Jp=Kp,Zp=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.string,i.object,i.array]):{},ut=Zp;function dn(e,t){return t?tt(e,t,{clone:!1}):e}const uo={xs:0,sm:600,md:900,lg:1200,xl:1536},gs={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${uo[e]}px)`};function ot(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const s=r.breakpoints||gs;return t.reduce((a,l,c)=>(a[s.up(s.keys[c])]=n(t[c]),a),{})}if(typeof t=="object"){const s=r.breakpoints||gs;return Object.keys(t).reduce((a,l)=>{if(Object.keys(s.values||uo).indexOf(l)!==-1){const c=s.up(l);a[c]=n(t[l],l)}else{const c=l;a[c]=t[c]}return a},{})}return n(t)}function Qp(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const s=e.up(o);return r[s]={},r},{}))||{}}function eu(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function lr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,s)=>o&&o[s]?o[s]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function Kn(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=lr(e,n)||r,t&&(o=t(o,r,e)),o}function xe(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,s=a=>{if(a[t]==null)return null;const l=a[t],c=a.theme,p=lr(c,r)||{};return ot(a,l,h=>{let f=Kn(p,o,h);return h===f&&typeof h=="string"&&(f=Kn(p,o,`${t}${h==="default"?"":Ge(h)}`,h)),n===!1?f:{[n]:f}})};return s.propTypes=process.env.NODE_ENV!=="production"?{[t]:ut}:{},s.filterProps=[t],s}function tu(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const nu={m:"margin",p:"padding"},ru={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},bs={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},ou=tu(e=>{if(e.length>2)if(bs[e])e=bs[e];else return[e];const[t,n]=e.split(""),r=nu[t],o=ru[n]||"";return Array.isArray(o)?o.map(s=>r+s):[r+o]}),cr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],pr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],su=[...cr,...pr];function On(e,t,n,r){var o;const s=(o=lr(e,t,!1))!=null?o:n;return typeof s=="number"?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&typeof a!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`),s*a):Array.isArray(s)?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&(Number.isInteger(a)?a>s.length-1&&console.error([`MUI: The value provided (${a}) overflows.`,`The supported values are: ${JSON.stringify(s)}.`,`${a} > ${s.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),s[a]):typeof s=="function"?s:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${s}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Bi(e){return On(e,"spacing",8,"spacing")}function Cn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function iu(e,t){return n=>e.reduce((r,o)=>(r[o]=Cn(t,n),r),{})}function au(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=ou(n),s=iu(o,r),a=e[n];return ot(e,a,s)}function Li(e,t){const n=Bi(e.theme);return Object.keys(e).map(r=>au(e,t,r,n)).reduce(dn,{})}function ge(e){return Li(e,cr)}ge.propTypes=process.env.NODE_ENV!=="production"?cr.reduce((e,t)=>(e[t]=ut,e),{}):{};ge.filterProps=cr;function be(e){return Li(e,pr)}be.propTypes=process.env.NODE_ENV!=="production"?pr.reduce((e,t)=>(e[t]=ut,e),{}):{};be.filterProps=pr;process.env.NODE_ENV!=="production"&&su.reduce((e,t)=>(e[t]=ut,e),{});function lu(e=8){if(e.mui)return e;const t=Bi({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(s=>{const a=t(s);return typeof a=="number"?`${a}px`:a}).join(" "));return n.mui=!0,n}function ur(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(s=>{r[s]=o}),r),{}),n=r=>Object.keys(r).reduce((o,s)=>t[s]?dn(o,t[s](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Ve(e){return typeof e!="number"?e:`${e}px solid`}function qe(e,t){return xe({prop:e,themeKey:"borders",transform:t})}const cu=qe("border",Ve),pu=qe("borderTop",Ve),uu=qe("borderRight",Ve),du=qe("borderBottom",Ve),fu=qe("borderLeft",Ve),hu=qe("borderColor"),mu=qe("borderTopColor"),gu=qe("borderRightColor"),bu=qe("borderBottomColor"),vu=qe("borderLeftColor"),yu=qe("outline",Ve),wu=qe("outlineColor"),dr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=On(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:Cn(t,r)});return ot(e,e.borderRadius,n)}return null};dr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:ut}:{};dr.filterProps=["borderRadius"];ur(cu,pu,uu,du,fu,hu,mu,gu,bu,vu,dr,yu,wu);const fr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=On(e.theme,"spacing",8,"gap"),n=r=>({gap:Cn(t,r)});return ot(e,e.gap,n)}return null};fr.propTypes=process.env.NODE_ENV!=="production"?{gap:ut}:{};fr.filterProps=["gap"];const hr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=On(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:Cn(t,r)});return ot(e,e.columnGap,n)}return null};hr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:ut}:{};hr.filterProps=["columnGap"];const mr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=On(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:Cn(t,r)});return ot(e,e.rowGap,n)}return null};mr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:ut}:{};mr.filterProps=["rowGap"];const xu=xe({prop:"gridColumn"}),Eu=xe({prop:"gridRow"}),Tu=xe({prop:"gridAutoFlow"}),ku=xe({prop:"gridAutoColumns"}),Su=xe({prop:"gridAutoRows"}),Nu=xe({prop:"gridTemplateColumns"}),Ou=xe({prop:"gridTemplateRows"}),Cu=xe({prop:"gridTemplateAreas"}),Pu=xe({prop:"gridArea"});ur(fr,hr,mr,xu,Eu,Tu,ku,Su,Nu,Ou,Cu,Pu);function _t(e,t){return t==="grey"?t:e}const Ru=xe({prop:"color",themeKey:"palette",transform:_t}),ju=xe({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:_t}),Mu=xe({prop:"backgroundColor",themeKey:"palette",transform:_t});ur(Ru,ju,Mu);function De(e){return e<=1&&e!==0?`${e*100}%`:e}const Iu=xe({prop:"width",transform:De}),fo=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const s=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||uo[n];return s?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${s}${e.theme.breakpoints.unit}`}:{maxWidth:s}:{maxWidth:De(n)}};return ot(e,e.maxWidth,t)}return null};fo.filterProps=["maxWidth"];const $u=xe({prop:"minWidth",transform:De}),_u=xe({prop:"height",transform:De}),Au=xe({prop:"maxHeight",transform:De}),Du=xe({prop:"minHeight",transform:De});xe({prop:"size",cssProperty:"width",transform:De});xe({prop:"size",cssProperty:"height",transform:De});const Bu=xe({prop:"boxSizing"});ur(Iu,fo,$u,_u,Au,Du,Bu);const Lu={border:{themeKey:"borders",transform:Ve},borderTop:{themeKey:"borders",transform:Ve},borderRight:{themeKey:"borders",transform:Ve},borderBottom:{themeKey:"borders",transform:Ve},borderLeft:{themeKey:"borders",transform:Ve},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Ve},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:dr},color:{themeKey:"palette",transform:_t},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:_t},backgroundColor:{themeKey:"palette",transform:_t},p:{style:be},pt:{style:be},pr:{style:be},pb:{style:be},pl:{style:be},px:{style:be},py:{style:be},padding:{style:be},paddingTop:{style:be},paddingRight:{style:be},paddingBottom:{style:be},paddingLeft:{style:be},paddingX:{style:be},paddingY:{style:be},paddingInline:{style:be},paddingInlineStart:{style:be},paddingInlineEnd:{style:be},paddingBlock:{style:be},paddingBlockStart:{style:be},paddingBlockEnd:{style:be},m:{style:ge},mt:{style:ge},mr:{style:ge},mb:{style:ge},ml:{style:ge},mx:{style:ge},my:{style:ge},margin:{style:ge},marginTop:{style:ge},marginRight:{style:ge},marginBottom:{style:ge},marginLeft:{style:ge},marginX:{style:ge},marginY:{style:ge},marginInline:{style:ge},marginInlineStart:{style:ge},marginInlineEnd:{style:ge},marginBlock:{style:ge},marginBlockStart:{style:ge},marginBlockEnd:{style:ge},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:fr},rowGap:{style:mr},columnGap:{style:hr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:De},maxWidth:{style:fo},minWidth:{transform:De},height:{transform:De},maxHeight:{transform:De},minHeight:{transform:De},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},ho=Lu;function Vu(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Fu(e,t){return typeof e=="function"?e(t):e}function zu(){function e(n,r,o,s){const a={[n]:r,theme:o},l=s[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:p,transform:d,style:h}=l;if(r==null)return null;if(p==="typography"&&r==="inherit")return{[n]:r};const f=lr(o,p)||{};return h?h(a):ot(a,r,y=>{let v=Kn(f,d,y);return y===v&&typeof y=="string"&&(v=Kn(f,d,`${n}${y==="default"?"":Ge(y)}`,y)),c===!1?v:{[c]:v}})}function t(n){var r;const{sx:o,theme:s={}}=n||{};if(!o)return null;const a=(r=s.unstable_sxConfig)!=null?r:ho;function l(c){let p=c;if(typeof c=="function")p=c(s);else if(typeof c!="object")return c;if(!p)return null;const d=Qp(s.breakpoints),h=Object.keys(d);let f=d;return Object.keys(p).forEach(b=>{const y=Fu(p[b],s);if(y!=null)if(typeof y=="object")if(a[b])f=dn(f,e(b,y,s,a));else{const v=ot({theme:s},y,m=>({[b]:m}));Vu(v,y)?f[b]=t({sx:y,theme:s}):f=dn(f,v)}else f=dn(f,e(b,y,s,a))}),eu(h,f)}return Array.isArray(o)?o.map(l):l(o)}return t}const Vi=zu();Vi.filterProps=["sx"];const mo=Vi;function Uu(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Hu=["breakpoints","palette","spacing","shape"];function go(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:s={}}=e,a=ue(e,Hu),l=Gp(n),c=lu(o);let p=tt({breakpoints:l,direction:"ltr",components:{},palette:S({mode:"light"},r),spacing:c,shape:S({},Jp,s)},a);return p.applyStyles=Uu,p=t.reduce((d,h)=>tt(d,h),p),p.unstable_sxConfig=S({},ho,a==null?void 0:a.unstable_sxConfig),p.unstable_sx=function(h){return mo({sx:h,theme:this})},p}function qu(e){return Object.keys(e).length===0}function Fi(e=null){const t=T.useContext(_r.ThemeContext);return!t||qu(t)?e:t}const Wu=go();function zi(e=Wu){return Fi(e)}const Xu=["ownerState"],Yu=["variants"],Gu=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Ku(e){return Object.keys(e).length===0}function Ju(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Vn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Zu=go(),vs=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function _n({defaultTheme:e,theme:t,themeId:n}){return Ku(t)?e:t[n]||t}function Qu(e){return e?(t,n)=>n[e]:null}function Fn(e,t){let{ownerState:n}=t,r=ue(t,Xu);const o=typeof e=="function"?e(S({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(s=>Fn(s,S({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:s=[]}=o;let l=ue(o,Yu);return s.forEach(c=>{let p=!0;typeof c.props=="function"?p=c.props(S({ownerState:n},r,n)):Object.keys(c.props).forEach(d=>{(n==null?void 0:n[d])!==c.props[d]&&r[d]!==c.props[d]&&(p=!1)}),p&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(S({ownerState:n},r,n)):c.style))}),l}return o}function ed(e={}){const{themeId:t,defaultTheme:n=Zu,rootShouldForwardProp:r=Vn,slotShouldForwardProp:o=Vn}=e,s=a=>mo(S({},a,{theme:_n(S({},a,{defaultTheme:n,themeId:t}))}));return s.__mui_systemSx=!0,(a,l={})=>{_r.internal_processStyles(a,g=>g.filter(O=>!(O!=null&&O.__mui_systemSx)));const{name:c,slot:p,skipVariantsResolver:d,skipSx:h,overridesResolver:f=Qu(vs(p))}=l,b=ue(l,Gu),y=d!==void 0?d:p&&p!=="Root"&&p!=="root"||!1,v=h||!1;let m;process.env.NODE_ENV!=="production"&&c&&(m=`${c}-${vs(p||"Root")}`);let x=Vn;p==="Root"||p==="root"?x=r:p?x=o:Ju(a)&&(x=void 0);const _=_r(a,S({shouldForwardProp:x,label:m},b)),w=g=>typeof g=="function"&&g.__emotion_real!==g||yt(g)?O=>Fn(g,S({},O,{theme:_n({theme:O.theme,defaultTheme:n,themeId:t})})):g,E=(g,...O)=>{let P=w(g);const V=O?O.map(w):[];c&&f&&V.push(C=>{const $=_n(S({},C,{defaultTheme:n,themeId:t}));if(!$.components||!$.components[c]||!$.components[c].styleOverrides)return null;const I=$.components[c].styleOverrides,L={};return Object.entries(I).forEach(([U,R])=>{L[U]=Fn(R,S({},C,{theme:$}))}),f(C,L)}),c&&!y&&V.push(C=>{var $;const I=_n(S({},C,{defaultTheme:n,themeId:t})),L=I==null||($=I.components)==null||($=$[c])==null?void 0:$.variants;return Fn({variants:L},S({},C,{theme:I}))}),v||V.push(s);const D=V.length-O.length;if(Array.isArray(g)&&D>0){const C=new Array(D).fill("");P=[...g,...C],P.raw=[...g.raw,...C]}const F=_(P,...V);if(process.env.NODE_ENV!=="production"){let C;c&&(C=`${c}${Ge(p||"")}`),C===void 0&&(C=`Styled(${Bl(a)})`),F.displayName=C}return a.muiName&&(F.muiName=a.muiName),F};return _.withConfig&&(E.withConfig=_.withConfig),E}}function td(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:wi(t.components[n].defaultProps,r)}function nd({props:e,name:t,defaultTheme:n,themeId:r}){let o=zi(n);return r&&(o=o[r]||o),td({theme:o,name:t,props:e})}function bo(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),ac(e,t,n)}function rd(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Nt(e){if(e.type)return e;if(e.charAt(0)==="#")return Nt(rd(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Dt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Dt(10,o))}else r=r.split(",");return r=r.map(s=>parseFloat(s)),{type:n,values:r,colorSpace:o}}function gr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,s)=>s<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function od(e){e=Nt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,s=r*Math.min(o,1-o),a=(p,d=(p+n/30)%12)=>o-s*Math.max(Math.min(d-3,9-d,1),-1);let l="rgb";const c=[Math.round(a(0)*255),Math.round(a(8)*255),Math.round(a(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),gr({type:l,values:c})}function ys(e){e=Nt(e);let t=e.type==="hsl"||e.type==="hsla"?Nt(od(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function ws(e,t){const n=ys(e),r=ys(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function Jn(e,t){return e=Nt(e),t=bo(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,gr(e)}function sd(e,t){if(e=Nt(e),t=bo(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return gr(e)}function id(e,t){if(e=Nt(e),t=bo(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return gr(e)}function ad(e,t){return S({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const ld={black:"#000",white:"#fff"},wn=ld,cd={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},pd=cd,ud={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ct=ud,dd={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Pt=dd,fd={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},en=fd,hd={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Rt=hd,md={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},jt=md,gd={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Mt=gd,bd=["mode","contrastThreshold","tonalOffset"],xs={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:wn.white,default:wn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Rr={text:{primary:wn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:wn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Es(e,t,n,r){const o=r.light||r,s=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=id(e.main,o):t==="dark"&&(e.dark=sd(e.main,s)))}function vd(e="light"){return e==="dark"?{main:Rt[200],light:Rt[50],dark:Rt[400]}:{main:Rt[700],light:Rt[400],dark:Rt[800]}}function yd(e="light"){return e==="dark"?{main:Ct[200],light:Ct[50],dark:Ct[400]}:{main:Ct[500],light:Ct[300],dark:Ct[700]}}function wd(e="light"){return e==="dark"?{main:Pt[500],light:Pt[300],dark:Pt[700]}:{main:Pt[700],light:Pt[400],dark:Pt[800]}}function xd(e="light"){return e==="dark"?{main:jt[400],light:jt[300],dark:jt[700]}:{main:jt[700],light:jt[500],dark:jt[900]}}function Ed(e="light"){return e==="dark"?{main:Mt[400],light:Mt[300],dark:Mt[700]}:{main:Mt[800],light:Mt[500],dark:Mt[900]}}function Td(e="light"){return e==="dark"?{main:en[400],light:en[300],dark:en[700]}:{main:"#ed6c02",light:en[500],dark:en[900]}}function kd(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=ue(e,bd),s=e.primary||vd(t),a=e.secondary||yd(t),l=e.error||wd(t),c=e.info||xd(t),p=e.success||Ed(t),d=e.warning||Td(t);function h(v){const m=ws(v,Rr.text.primary)>=n?Rr.text.primary:xs.text.primary;if(process.env.NODE_ENV!=="production"){const x=ws(v,m);x<3&&console.error([`MUI: The contrast ratio of ${x}:1 for ${m} on ${v}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return m}const f=({color:v,name:m,mainShade:x=500,lightShade:_=300,darkShade:w=700})=>{if(v=S({},v),!v.main&&v[x]&&(v.main=v[x]),!v.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${m?` (${m})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.`:Dt(11,m?` (${m})`:"",x));if(typeof v.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${m?` (${m})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(v.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Dt(12,m?` (${m})`:"",JSON.stringify(v.main)));return Es(v,"light",_,r),Es(v,"dark",w,r),v.contrastText||(v.contrastText=h(v.main)),v},b={dark:Rr,light:xs};return process.env.NODE_ENV!=="production"&&(b[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),tt(S({common:S({},wn),mode:t,primary:f({color:s,name:"primary"}),secondary:f({color:a,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:f({color:l,name:"error"}),warning:f({color:d,name:"warning"}),info:f({color:c,name:"info"}),success:f({color:p,name:"success"}),grey:pd,contrastThreshold:n,getContrastText:h,augmentColor:f,tonalOffset:r},b[t]),o)}const Sd=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Nd(e){return Math.round(e*1e5)/1e5}const Ts={textTransform:"uppercase"},ks='"Roboto", "Helvetica", "Arial", sans-serif';function Od(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=ks,fontSize:o=14,fontWeightLight:s=300,fontWeightRegular:a=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:p=16,allVariants:d,pxToRem:h}=n,f=ue(n,Sd);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof p!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const b=o/14,y=h||(x=>`${x/p*b}rem`),v=(x,_,w,E,g)=>S({fontFamily:r,fontWeight:x,fontSize:y(_),lineHeight:w},r===ks?{letterSpacing:`${Nd(E/_)}em`}:{},g,d),m={h1:v(s,96,1.167,-1.5),h2:v(s,60,1.2,-.5),h3:v(a,48,1.167,0),h4:v(a,34,1.235,.25),h5:v(a,24,1.334,0),h6:v(l,20,1.6,.15),subtitle1:v(a,16,1.75,.15),subtitle2:v(l,14,1.57,.1),body1:v(a,16,1.5,.15),body2:v(a,14,1.43,.15),button:v(l,14,1.75,.4,Ts),caption:v(a,12,1.66,.4),overline:v(a,12,2.66,1,Ts),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return tt(S({htmlFontSize:p,pxToRem:y,fontFamily:r,fontSize:o,fontWeightLight:s,fontWeightRegular:a,fontWeightMedium:l,fontWeightBold:c},m),f,{clone:!1})}const Cd=.2,Pd=.14,Rd=.12;function me(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Cd})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Pd})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Rd})`].join(",")}const jd=["none",me(0,2,1,-1,0,1,1,0,0,1,3,0),me(0,3,1,-2,0,2,2,0,0,1,5,0),me(0,3,3,-2,0,3,4,0,0,1,8,0),me(0,2,4,-1,0,4,5,0,0,1,10,0),me(0,3,5,-1,0,5,8,0,0,1,14,0),me(0,3,5,-1,0,6,10,0,0,1,18,0),me(0,4,5,-2,0,7,10,1,0,2,16,1),me(0,5,5,-3,0,8,10,1,0,3,14,2),me(0,5,6,-3,0,9,12,1,0,3,16,2),me(0,6,6,-3,0,10,14,1,0,4,18,3),me(0,6,7,-4,0,11,15,1,0,4,20,3),me(0,7,8,-4,0,12,17,2,0,5,22,4),me(0,7,8,-4,0,13,19,2,0,5,24,4),me(0,7,9,-4,0,14,21,2,0,5,26,4),me(0,8,9,-5,0,15,22,2,0,6,28,5),me(0,8,10,-5,0,16,24,2,0,6,30,5),me(0,8,11,-5,0,17,26,2,0,6,32,5),me(0,9,11,-5,0,18,28,2,0,7,34,6),me(0,9,12,-6,0,19,29,2,0,7,36,6),me(0,10,13,-6,0,20,31,3,0,8,38,7),me(0,10,13,-6,0,21,33,3,0,8,40,7),me(0,10,14,-6,0,22,35,3,0,8,42,7),me(0,11,14,-7,0,23,36,3,0,9,44,8),me(0,11,15,-7,0,24,38,3,0,9,46,8)],Md=jd,Id=["duration","easing","delay"],$d={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},_d={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Ss(e){return`${Math.round(e)}ms`}function Ad(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Dd(e){const t=S({},$d,e.easing),n=S({},_d,e.duration);return S({getAutoHeightDuration:Ad,create:(o=["all"],s={})=>{const{duration:a=n.standard,easing:l=t.easeInOut,delay:c=0}=s,p=ue(s,Id);if(process.env.NODE_ENV!=="production"){const d=f=>typeof f=="string",h=f=>!isNaN(parseFloat(f));!d(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!h(a)&&!d(a)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`),d(l)||console.error('MUI: Argument "easing" must be a string.'),!h(c)&&!d(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof s!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(p).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(p).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(d=>`${d} ${typeof a=="string"?a:Ss(a)} ${l} ${typeof c=="string"?c:Ss(c)}`).join(",")}},e,{easing:t,duration:n})}const Bd={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Ld=Bd,Vd=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Fd(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:s={}}=e,a=ue(e,Vd);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Dt(18));const l=kd(r),c=go(e);let p=tt(c,{mixins:ad(c.breakpoints,n),palette:l,shadows:Md.slice(),typography:Od(l,s),transitions:Dd(o),zIndex:S({},Ld)});if(p=tt(p,a),p=t.reduce((d,h)=>tt(d,h),p),process.env.NODE_ENV!=="production"){const d=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],h=(f,b)=>{let y;for(y in f){const v=f[y];if(d.indexOf(y)!==-1&&Object.keys(v).length>0){if(process.env.NODE_ENV!=="production"){const m=Je("",y);console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${y}\` internal state.`,"You can not override it like this: ",JSON.stringify(f,null,2),"",`Instead, you need to use the '&.${m}' syntax:`,JSON.stringify({root:{[`&.${m}`]:v}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}f[y]={}}}};Object.keys(p.components).forEach(f=>{const b=p.components[f].styleOverrides;b&&f.indexOf("Mui")===0&&h(b,f)})}return p.unstable_sxConfig=S({},ho,a==null?void 0:a.unstable_sxConfig),p.unstable_sx=function(h){return mo({sx:h,theme:this})},p}const zd=Fd(),vo=zd,yo="$$material",Ui=e=>Vn(e)&&e!=="classes",Ud=ed({themeId:yo,defaultTheme:vo,rootShouldForwardProp:Ui}),Oe=Ud;function Pn(){const e=zi(vo);return process.env.NODE_ENV!=="production"&&T.useDebugValue(e),e[yo]||e}function it({props:e,name:t}){return nd({props:e,name:t,defaultTheme:vo,themeId:yo})}function Hr(e,t){return Hr=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},Hr(e,t)}function Hd(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Hr(e,t)}const Ns={disabled:!1};var qd=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.shape({enter:i.number,exit:i.number,appear:i.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&i.oneOfType([i.string,i.shape({enter:i.string,exit:i.string,active:i.string}),i.shape({enter:i.string,enterDone:i.string,enterActive:i.string,exit:i.string,exitDone:i.string,exitActive:i.string})]);const Hi=N.createContext(null);var Wd=function(t){return t.scrollTop},an="unmounted",gt="exited",bt="entering",$t="entered",qr="exiting",at=function(e){Hd(t,e);function t(r,o){var s;s=e.call(this,r,o)||this;var a=o,l=a&&!a.isMounting?r.enter:r.appear,c;return s.appearStatus=null,r.in?l?(c=gt,s.appearStatus=bt):c=$t:r.unmountOnExit||r.mountOnEnter?c=an:c=gt,s.state={status:c},s.nextCallback=null,s}t.getDerivedStateFromProps=function(o,s){var a=o.in;return a&&s.status===an?{status:gt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var s=null;if(o!==this.props){var a=this.state.status;this.props.in?a!==bt&&a!==$t&&(s=bt):(a===bt||a===$t)&&(s=qr)}this.updateStatus(!1,s)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,s,a,l;return s=a=l=o,o!=null&&typeof o!="number"&&(s=o.exit,a=o.enter,l=o.appear!==void 0?o.appear:a),{exit:s,enter:a,appear:l}},n.updateStatus=function(o,s){if(o===void 0&&(o=!1),s!==null)if(this.cancelNextCallback(),s===bt){if(this.props.unmountOnExit||this.props.mountOnEnter){var a=this.props.nodeRef?this.props.nodeRef.current:rn.findDOMNode(this);a&&Wd(a)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===gt&&this.setState({status:an})},n.performEnter=function(o){var s=this,a=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[rn.findDOMNode(this),l],p=c[0],d=c[1],h=this.getTimeouts(),f=l?h.appear:h.enter;if(!o&&!a||Ns.disabled){this.safeSetState({status:$t},function(){s.props.onEntered(p)});return}this.props.onEnter(p,d),this.safeSetState({status:bt},function(){s.props.onEntering(p,d),s.onTransitionEnd(f,function(){s.safeSetState({status:$t},function(){s.props.onEntered(p,d)})})})},n.performExit=function(){var o=this,s=this.props.exit,a=this.getTimeouts(),l=this.props.nodeRef?void 0:rn.findDOMNode(this);if(!s||Ns.disabled){this.safeSetState({status:gt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:qr},function(){o.props.onExiting(l),o.onTransitionEnd(a.exit,function(){o.safeSetState({status:gt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,s){s=this.setNextCallback(s),this.setState(o,s)},n.setNextCallback=function(o){var s=this,a=!0;return this.nextCallback=function(l){a&&(a=!1,s.nextCallback=null,o(l))},this.nextCallback.cancel=function(){a=!1},this.nextCallback},n.onTransitionEnd=function(o,s){this.setNextCallback(s);var a=this.props.nodeRef?this.props.nodeRef.current:rn.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!a||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[a,this.nextCallback],p=c[0],d=c[1];this.props.addEndListener(p,d)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===an)return null;var s=this.props,a=s.children;s.in,s.mountOnEnter,s.unmountOnExit,s.appear,s.enter,s.exit,s.timeout,s.addEndListener,s.onEnter,s.onEntering,s.onEntered,s.onExit,s.onExiting,s.onExited,s.nodeRef;var l=ue(s,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return N.createElement(Hi.Provider,{value:null},typeof a=="function"?a(o,l):N.cloneElement(N.Children.only(a),l))},t}(N.Component);at.contextType=Hi;at.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:i.shape({current:typeof Element>"u"?i.any:function(e,t,n,r,o,s){var a=e[t];return i.instanceOf(a&&"ownerDocument"in a?a.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,s)}}),children:i.oneOfType([i.func.isRequired,i.element.isRequired]).isRequired,in:i.bool,mountOnEnter:i.bool,unmountOnExit:i.bool,appear:i.bool,enter:i.bool,exit:i.bool,timeout:function(t){var n=qd;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),s=1;s<r;s++)o[s-1]=arguments[s];return n.apply(void 0,[t].concat(o))},addEndListener:i.func,onEnter:i.func,onEntering:i.func,onEntered:i.func,onExit:i.func,onExiting:i.func,onExited:i.func}:{};function It(){}at.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:It,onEntering:It,onEntered:It,onExit:It,onExiting:It,onExited:It};at.UNMOUNTED=an;at.EXITED=gt;at.ENTERING=bt;at.ENTERED=$t;at.EXITING=qr;const qi=at,Wi=e=>e.scrollTop;function Zn(e,t){var n,r;const{timeout:o,easing:s,style:a={}}=e;return{duration:(n=a.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=a.transitionTimingFunction)!=null?r:typeof s=="object"?s[t.mode]:s,delay:a.transitionDelay}}const Xd=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function Wr(e){return`scale(${e}, ${e**2})`}const Yd={entering:{opacity:1,transform:Wr(1)},entered:{opacity:1,transform:"none"}},jr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),wo=T.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:s,easing:a,in:l,onEnter:c,onEntered:p,onEntering:d,onExit:h,onExited:f,onExiting:b,style:y,timeout:v="auto",TransitionComponent:m=qi}=t,x=ue(t,Xd),_=on(),w=T.useRef(),E=Pn(),g=T.useRef(null),O=ze(g,s.ref,n),P=U=>R=>{if(U){const B=g.current;R===void 0?U(B):U(B,R)}},V=P(d),D=P((U,R)=>{Wi(U);const{duration:B,delay:Q,easing:J}=Zn({style:y,timeout:v,easing:a},{mode:"enter"});let k;v==="auto"?(k=E.transitions.getAutoHeightDuration(U.clientHeight),w.current=k):k=B,U.style.transition=[E.transitions.create("opacity",{duration:k,delay:Q}),E.transitions.create("transform",{duration:jr?k:k*.666,delay:Q,easing:J})].join(","),c&&c(U,R)}),F=P(p),C=P(b),$=P(U=>{const{duration:R,delay:B,easing:Q}=Zn({style:y,timeout:v,easing:a},{mode:"exit"});let J;v==="auto"?(J=E.transitions.getAutoHeightDuration(U.clientHeight),w.current=J):J=R,U.style.transition=[E.transitions.create("opacity",{duration:J,delay:B}),E.transitions.create("transform",{duration:jr?J:J*.666,delay:jr?B:B||J*.333,easing:Q})].join(","),U.style.opacity=0,U.style.transform=Wr(.75),h&&h(U)}),I=P(f),L=U=>{v==="auto"&&_.start(w.current||0,U),r&&r(g.current,U)};return u.jsx(m,S({appear:o,in:l,nodeRef:g,onEnter:D,onEntered:F,onEntering:V,onExit:$,onExited:I,onExiting:C,addEndListener:L,timeout:v==="auto"?null:v},x,{children:(U,R)=>T.cloneElement(s,S({style:S({opacity:0,transform:Wr(.75),visibility:U==="exited"&&!l?"hidden":void 0},Yd[U],y,s.props.style),ref:O},R))}))});process.env.NODE_ENV!=="production"&&(wo.propTypes={addEndListener:i.func,appear:i.bool,children:Tn.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});wo.muiSupportAuto=!0;const Xr=wo,Gd=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},Os=Gd,Kd=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Jd=Oe(Di,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Xi=T.forwardRef(function(t,n){var r;const o=Fi(),s=it({props:t,name:"MuiPopper"}),{anchorEl:a,component:l,components:c,componentsProps:p,container:d,disablePortal:h,keepMounted:f,modifiers:b,open:y,placement:v,popperOptions:m,popperRef:x,transition:_,slots:w,slotProps:E}=s,g=ue(s,Kd),O=(r=w==null?void 0:w.root)!=null?r:c==null?void 0:c.Root,P=S({anchorEl:a,container:d,disablePortal:h,keepMounted:f,modifiers:b,open:y,placement:v,popperOptions:m,popperRef:x,transition:_},g);return u.jsx(Jd,S({as:l,direction:o==null?void 0:o.direction,slots:{root:O},slotProps:E??p},P,{ref:n}))});process.env.NODE_ENV!=="production"&&(Xi.propTypes={anchorEl:i.oneOfType([nt,i.object,i.func]),children:i.oneOfType([i.node,i.func]),component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([nt,i.func]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:ro,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transition:i.bool});const Yi=Xi;function Zd(e){return Je("MuiTooltip",e)}const Qd=ct("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),lt=Qd,ef=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function tf(e){return Math.round(e*1e5)/1e5}const nf=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:s}=e,a={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Ge(s.split("-")[0])}`],arrow:["arrow"]};return st(a,Zd,t)},rf=Oe(Yi,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>S({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${lt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${lt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${lt.arrow}`]:S({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${lt.arrow}`]:S({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),of=Oe("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Ge(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>S({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:Jn(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${tf(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${lt.popper}[data-popper-placement*="left"] &`]:S({transformOrigin:"right center"},t.isRtl?S({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):S({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${lt.popper}[data-popper-placement*="right"] &`]:S({transformOrigin:"left center"},t.isRtl?S({marginRight:"14px"},t.touch&&{marginRight:"24px"}):S({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${lt.popper}[data-popper-placement*="top"] &`]:S({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${lt.popper}[data-popper-placement*="bottom"] &`]:S({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),sf=Oe("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:Jn(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let An=!1;const Cs=new kn;let tn={x:0,y:0};function Dn(e,t){return n=>{t&&t(n),e(n)}}const Gi=T.forwardRef(function(t,n){var r,o,s,a,l,c,p,d,h,f,b,y,v,m,x,_,w,E,g;const O=it({props:t,name:"MuiTooltip"}),{arrow:P=!1,children:V,components:D={},componentsProps:F={},describeChild:C=!1,disableFocusListener:$=!1,disableHoverListener:I=!1,disableInteractive:L=!1,disableTouchListener:U=!1,enterDelay:R=100,enterNextDelay:B=0,enterTouchDelay:Q=700,followCursor:J=!1,id:k,leaveDelay:j=0,leaveTouchDelay:z=1500,onClose:X,onOpen:H,open:q,placement:Y="bottom",PopperComponent:G,PopperProps:W={},slotProps:K={},slots:Z={},title:oe,TransitionComponent:A=Xr,TransitionProps:ee}=O,M=ue(O,ef),se=T.isValidElement(V)?V:u.jsx("span",{children:V}),Ee=Pn(),Ce=Ee.direction==="rtl",[we,dt]=T.useState(),[Pe,Ze]=T.useState(null),$e=T.useRef(!1),Qe=L||J,Te=on(),Ot=on(),ft=on(),Wt=on(),[Rn,So]=hi({controlled:q,default:!1,name:"Tooltip",state:"open"});let et=Rn;if(process.env.NODE_ENV!=="production"){const{current:ne}=T.useRef(q!==void 0);T.useEffect(()=>{we&&we.disabled&&!ne&&oe!==""&&we.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[oe,we,ne])}const br=fi(k),Xt=T.useRef(),jn=gn(()=>{Xt.current!==void 0&&(document.body.style.WebkitUserSelect=Xt.current,Xt.current=void 0),Wt.clear()});T.useEffect(()=>jn,[jn]);const No=ne=>{Cs.clear(),An=!0,So(!0),H&&!et&&H(ne)},Mn=gn(ne=>{Cs.start(800+j,()=>{An=!1}),So(!1),X&&et&&X(ne),Te.start(Ee.transitions.duration.shortest,()=>{$e.current=!1})}),vr=ne=>{$e.current&&ne.type!=="touchstart"||(we&&we.removeAttribute("title"),Ot.clear(),ft.clear(),R||An&&B?Ot.start(An?B:R,()=>{No(ne)}):No(ne))},Oo=ne=>{Ot.clear(),ft.start(j,()=>{Mn(ne)})},{isFocusVisibleRef:Co,onBlur:xa,onFocus:Ea,ref:Ta}=mi(),[,Po]=T.useState(!1),Ro=ne=>{xa(ne),Co.current===!1&&(Po(!1),Oo(ne))},jo=ne=>{we||dt(ne.currentTarget),Ea(ne),Co.current===!0&&(Po(!0),vr(ne))},Mo=ne=>{$e.current=!0;const _e=se.props;_e.onTouchStart&&_e.onTouchStart(ne)},Io=vr,$o=Oo,ka=ne=>{Mo(ne),ft.clear(),Te.clear(),jn(),Xt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Wt.start(Q,()=>{document.body.style.WebkitUserSelect=Xt.current,vr(ne)})},Sa=ne=>{se.props.onTouchEnd&&se.props.onTouchEnd(ne),jn(),ft.start(z,()=>{Mn(ne)})};T.useEffect(()=>{if(!et)return;function ne(_e){(_e.key==="Escape"||_e.key==="Esc")&&Mn(_e)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[Mn,et]);const Na=ze(se.ref,Ta,dt,n);!oe&&oe!==0&&(et=!1);const yr=T.useRef(),Oa=ne=>{const _e=se.props;_e.onMouseMove&&_e.onMouseMove(ne),tn={x:ne.clientX,y:ne.clientY},yr.current&&yr.current.update()},Yt={},wr=typeof oe=="string";C?(Yt.title=!et&&wr&&!I?oe:null,Yt["aria-describedby"]=et?br:null):(Yt["aria-label"]=wr?oe:null,Yt["aria-labelledby"]=et&&!wr?br:null);const Le=S({},Yt,M,se.props,{className:Se(M.className,se.props.className),onTouchStart:Mo,ref:Na},J?{onMouseMove:Oa}:{});process.env.NODE_ENV!=="production"&&(Le["data-mui-internal-clone-element"]=!0,T.useEffect(()=>{we&&!we.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[we]));const Gt={};U||(Le.onTouchStart=ka,Le.onTouchEnd=Sa),I||(Le.onMouseOver=Dn(Io,Le.onMouseOver),Le.onMouseLeave=Dn($o,Le.onMouseLeave),Qe||(Gt.onMouseOver=Io,Gt.onMouseLeave=$o)),$||(Le.onFocus=Dn(jo,Le.onFocus),Le.onBlur=Dn(Ro,Le.onBlur),Qe||(Gt.onFocus=jo,Gt.onBlur=Ro)),process.env.NODE_ENV!=="production"&&se.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));const Ca=T.useMemo(()=>{var ne;let _e=[{name:"arrow",enabled:!!Pe,options:{element:Pe,padding:4}}];return(ne=W.popperOptions)!=null&&ne.modifiers&&(_e=_e.concat(W.popperOptions.modifiers)),S({},W.popperOptions,{modifiers:_e})},[Pe,W]),Kt=S({},O,{isRtl:Ce,arrow:P,disableInteractive:Qe,placement:Y,PopperComponentProp:G,touch:$e.current}),xr=nf(Kt),_o=(r=(o=Z.popper)!=null?o:D.Popper)!=null?r:rf,Ao=(s=(a=(l=Z.transition)!=null?l:D.Transition)!=null?a:A)!=null?s:Xr,Do=(c=(p=Z.tooltip)!=null?p:D.Tooltip)!=null?c:of,Bo=(d=(h=Z.arrow)!=null?h:D.Arrow)!=null?d:sf,Pa=sn(_o,S({},W,(f=K.popper)!=null?f:F.popper,{className:Se(xr.popper,W==null?void 0:W.className,(b=(y=K.popper)!=null?y:F.popper)==null?void 0:b.className)}),Kt),Ra=sn(Ao,S({},ee,(v=K.transition)!=null?v:F.transition),Kt),ja=sn(Do,S({},(m=K.tooltip)!=null?m:F.tooltip,{className:Se(xr.tooltip,(x=(_=K.tooltip)!=null?_:F.tooltip)==null?void 0:x.className)}),Kt),Ma=sn(Bo,S({},(w=K.arrow)!=null?w:F.arrow,{className:Se(xr.arrow,(E=(g=K.arrow)!=null?g:F.arrow)==null?void 0:E.className)}),Kt);return u.jsxs(T.Fragment,{children:[T.cloneElement(se,Le),u.jsx(_o,S({as:G??Yi,placement:Y,anchorEl:J?{getBoundingClientRect:()=>({top:tn.y,left:tn.x,right:tn.x,bottom:tn.y,width:0,height:0})}:we,popperRef:yr,open:we?et:!1,id:br,transition:!0},Gt,Pa,{popperOptions:Ca,children:({TransitionProps:ne})=>u.jsx(Ao,S({timeout:Ee.transitions.duration.shorter},ne,Ra,{children:u.jsxs(Do,S({},ja,{children:[oe,P?u.jsx(Bo,S({},Ma,{ref:Ze})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Gi.propTypes={arrow:i.bool,children:Tn.isRequired,classes:i.object,className:i.string,components:i.shape({Arrow:i.elementType,Popper:i.elementType,Tooltip:i.elementType,Transition:i.elementType}),componentsProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),describeChild:i.bool,disableFocusListener:i.bool,disableHoverListener:i.bool,disableInteractive:i.bool,disableTouchListener:i.bool,enterDelay:i.number,enterNextDelay:i.number,enterTouchDelay:i.number,followCursor:i.bool,id:i.string,leaveDelay:i.number,leaveTouchDelay:i.number,onClose:i.func,onOpen:i.func,open:i.bool,placement:i.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:i.elementType,PopperProps:i.object,slotProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),slots:i.shape({arrow:i.elementType,popper:i.elementType,tooltip:i.elementType,transition:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),title:i.node,TransitionComponent:i.elementType,TransitionProps:i.object});const af=Gi;var xo={},Ki={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Ki);var lf=Ki.exports,Mr={};function cf(e){return Je("MuiSvgIcon",e)}ct("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const pf=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],uf=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Ge(t)}`,`fontSize${Ge(n)}`]};return st(o,cf,r)},df=Oe("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Ge(n.color)}`],t[`fontSize${Ge(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,s,a,l,c,p,d,h,f,b,y;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((s=e.typography)==null||(a=s.pxToRem)==null?void 0:a.call(s,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((p=e.typography)==null||(d=p.pxToRem)==null?void 0:d.call(p,35))||"2.1875rem"}[t.fontSize],color:(h=(f=(e.vars||e).palette)==null||(f=f[t.color])==null?void 0:f.main)!=null?h:{action:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.active,disabled:(y=(e.vars||e).palette)==null||(y=y.action)==null?void 0:y.disabled,inherit:void 0}[t.color]}}),Eo=T.forwardRef(function(t,n){const r=it({props:t,name:"MuiSvgIcon"}),{children:o,className:s,color:a="inherit",component:l="svg",fontSize:c="medium",htmlColor:p,inheritViewBox:d=!1,titleAccess:h,viewBox:f="0 0 24 24"}=r,b=ue(r,pf),y=T.isValidElement(o)&&o.type==="svg",v=S({},r,{color:a,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:d,viewBox:f,hasSvgAsChild:y}),m={};d||(m.viewBox=f);const x=uf(v);return u.jsxs(df,S({as:l,className:Se(x.root,s),focusable:"false",color:p,"aria-hidden":h?void 0:!0,role:h?"img":void 0,ref:n},m,b,y&&o.props,{ownerState:v,children:[y?o.props.children:o,h?u.jsx("title",{children:h}):null]}))});process.env.NODE_ENV!=="production"&&(Eo.propTypes={children:i.node,classes:i.object,className:i.string,color:i.oneOfType([i.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),i.string]),component:i.elementType,fontSize:i.oneOfType([i.oneOf(["inherit","large","medium","small"]),i.string]),htmlColor:i.string,inheritViewBox:i.bool,shapeRendering:i.string,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),titleAccess:i.string,viewBox:i.string});Eo.muiName="SvgIcon";const Ps=Eo;function Ji(e,t){function n(r,o){return u.jsx(Ps,S({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Ps.muiName,T.memo(T.forwardRef(n))}const ff={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),xi.configure(e)}},hf=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Ge,createChainedFunction:Lr,createSvgIcon:Ji,debounce:di,deprecatedPropType:Vl,isMuiElement:Fl,ownerDocument:Ne,ownerWindow:Bt,requirePropFactory:zl,setRef:Wn,unstable_ClassNameGenerator:ff,unstable_useEnhancedEffect:Tt,unstable_useId:fi,unsupportedProp:ql,useControlled:hi,useEventCallback:gn,useForkRef:ze,useIsFocusVisible:mi},Symbol.toStringTag,{value:"Module"})),mf=yl(hf);var Rs;function gf(){return Rs||(Rs=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=mf}(Mr)),Mr}var bf=lf;Object.defineProperty(xo,"__esModule",{value:!0});var Zi=xo.default=void 0,vf=bf(gf()),yf=u;Zi=xo.default=(0,vf.default)((0,yf.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function js(e,t,n){return e?u.jsx(ve.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:u.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function To(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:s=void 0,iconPathAfter:a=void 0,hasAutoFocus:l=!1,className:c,isDisabled:p=!1,isDense:d=!0,isSubMenuParent:h=!1,hasDisabledGutters:f=!1,hasDivider:b=!1,focusVisibleClassName:y,id:v,children:m}=e,x=u.jsx(ve.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:p,dense:d,disableGutters:f,divider:b,focusVisibleClassName:y,onClick:t,id:v,children:n?u.jsxs(u.Fragment,{children:[js(s,n,!0),u.jsx(ve.ListItemText,{primary:n,inset:!s&&o}),h?u.jsx(ve.ListItemIcon,{className:"papi-menu-icon-trailing",children:u.jsx(Zi,{})}):js(a,n,!1)]}):m});return r?u.jsx(af,{title:r,placement:"right",children:u.jsx("div",{children:x})}):x}function Qi(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function wf(e){const[t,n]=N.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:s}=e,a=p=>{n(p.currentTarget)},l=()=>{n(void 0)},c=()=>{let p=Qi(s).filter(d=>"menuItem"in d.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return p=p.filter(d=>"menuItem"in d.group&&d.group.menuItem===r.id),u.jsx(ko,{...e,includedGroups:p})};return u.jsxs(u.Fragment,{children:[u.jsx(To,{onClick:a,...o,isSubMenuParent:!0}),u.jsx(ve.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const xf=(e,t)=>t.filter(o=>o.group===e).sort((o,s)=>(o.order||0)-(s.order||0));function ko(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:s,allowForLeadingIcons:a}=N.useMemo(()=>{const d=o&&o.length>0?o:Qi(t).filter(y=>!("menuItem"in y.group)),h=Object.values(d).sort((y,v)=>(y.group.order||0)-(v.group.order||0)),f=[];h.forEach(y=>{xf(y.id,t.items).forEach(v=>f.push({item:v,isLastItemInGroup:!1})),f.length>0&&(f[f.length-1].isLastItemInGroup=!0)}),f.length>0&&(f[f.length-1].isLastItemInGroup=!1);const b=f.some(y=>"iconPathBefore"in y.item&&y.item.iconPathBefore);return{items:f,allowForLeadingIcons:b}},[o,t]),l=({item:d,isLastItemInGroup:h})=>({className:"papi-menu-item",label:d.label,tooltip:d.tooltip,iconPathBefore:"iconPathBefore"in d?d.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in d?d.iconPathAfter:void 0,hasDivider:h,allowForLeadingIcons:a}),[c]=s;if(!c)return u.jsx("div",{});const p=c.item.group;return u.jsx("div",{role:"menu","aria-label":p,children:s.map((d,h)=>{const{item:f}=d,b=l(d);if("command"in f){const y=f.group+h;return u.jsx(To,{onClick:v=>{n==null||n(v),r(f)},...b},y)}return u.jsx(wf,{parentMenuItem:f,parentItemProps:b,...e},p+f.id)})},p)}function Ef(e){const{menuDefinition:t,columnId:n}=e;let s=Object.entries(t.groups).map(([a,l])=>({id:a,group:l})).filter(a=>"column"in a.group);return n&&"columns"in t&&t.columns[n]&&(s=s.filter(a=>"column"in a.group&&a.group.column===n)),u.jsx(ko,{...e,includedGroups:s})}function Tf({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:s}){return u.jsxs(ve.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${s??""}`,children:[u.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${s??""}`,children:r.label}),u.jsx(ve.List,{id:n,dense:!0,className:s??"",children:u.jsx(Ef,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function ea({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,s=N.useMemo(()=>{const a=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,p=o[c];typeof p=="object"&&typeof p.order=="number"&&!Number.isNaN(p.order)?a.set(p.order,{id:c,metadata:p}):console.warn(`Property ${l} (${typeof p}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(a.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return u.jsx(ve.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:s.length,role:"menu","aria-label":"GridMenu",id:r,children:s.map((a,l)=>u.jsx(Tf,{commandHandler:e,menuDefinition:n,...a,className:t},l))})}const ta=T.createContext({});process.env.NODE_ENV!=="production"&&(ta.displayName="ListContext");const kf=ta;function Sf(e){return Je("MuiList",e)}ct("MuiList",["root","padding","dense","subheader"]);const Nf=["children","className","component","dense","disablePadding","subheader"],Of=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return st({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},Sf,t)},Cf=Oe("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>S({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),na=T.forwardRef(function(t,n){const r=it({props:t,name:"MuiList"}),{children:o,className:s,component:a="ul",dense:l=!1,disablePadding:c=!1,subheader:p}=r,d=ue(r,Nf),h=T.useMemo(()=>({dense:l}),[l]),f=S({},r,{component:a,dense:l,disablePadding:c}),b=Of(f);return u.jsx(kf.Provider,{value:h,children:u.jsxs(Cf,S({as:a,className:Se(b.root,s),ref:n,ownerState:f},d,{children:[p,o]}))})});process.env.NODE_ENV!=="production"&&(na.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,dense:i.bool,disablePadding:i.bool,subheader:i.node,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const Pf=na,Rf=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Ir(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function Ms(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function ra(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function nn(e,t,n,r,o,s){let a=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(a)return!1;a=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!ra(l,s)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const oa=T.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:s=!1,children:a,className:l,disabledItemsFocusable:c=!1,disableListWrap:p=!1,onKeyDown:d,variant:h="selectedMenu"}=t,f=ue(t,Rf),b=T.useRef(null),y=T.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Tt(()=>{o&&b.current.focus()},[o]),T.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(w,E)=>{const g=!b.current.style.width;if(w.clientHeight<b.current.clientHeight&&g){const O=`${gi(Ne(w))}px`;b.current.style[E.direction==="rtl"?"paddingLeft":"paddingRight"]=O,b.current.style.width=`calc(100% + ${O})`}return b.current}}),[]);const v=w=>{const E=b.current,g=w.key,O=Ne(E).activeElement;if(g==="ArrowDown")w.preventDefault(),nn(E,O,p,c,Ir);else if(g==="ArrowUp")w.preventDefault(),nn(E,O,p,c,Ms);else if(g==="Home")w.preventDefault(),nn(E,null,p,c,Ir);else if(g==="End")w.preventDefault(),nn(E,null,p,c,Ms);else if(g.length===1){const P=y.current,V=g.toLowerCase(),D=performance.now();P.keys.length>0&&(D-P.lastTime>500?(P.keys=[],P.repeating=!0,P.previousKeyMatched=!0):P.repeating&&V!==P.keys[0]&&(P.repeating=!1)),P.lastTime=D,P.keys.push(V);const F=O&&!P.repeating&&ra(O,P);P.previousKeyMatched&&(F||nn(E,O,!1,c,Ir,P))?w.preventDefault():P.previousKeyMatched=!1}d&&d(w)},m=ze(b,n);let x=-1;T.Children.forEach(a,(w,E)=>{if(!T.isValidElement(w)){x===E&&(x+=1,x>=a.length&&(x=-1));return}process.env.NODE_ENV!=="production"&&qn.isFragment(w)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),w.props.disabled||(h==="selectedMenu"&&w.props.selected||x===-1)&&(x=E),x===E&&(w.props.disabled||w.props.muiSkipListHighlight||w.type.muiSkipListHighlight)&&(x+=1,x>=a.length&&(x=-1))});const _=T.Children.map(a,(w,E)=>{if(E===x){const g={};return s&&(g.autoFocus=!0),w.props.tabIndex===void 0&&h==="selectedMenu"&&(g.tabIndex=0),T.cloneElement(w,g)}return w});return u.jsx(Pf,S({role:"menu",ref:m,className:l,onKeyDown:v,tabIndex:o?0:-1},f,{children:_}))});process.env.NODE_ENV!=="production"&&(oa.propTypes={autoFocus:i.bool,autoFocusItem:i.bool,children:i.node,className:i.string,disabledItemsFocusable:i.bool,disableListWrap:i.bool,onKeyDown:i.func,variant:i.oneOf(["menu","selectedMenu"])});const jf=oa,Mf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],If={entering:{opacity:1},entered:{opacity:1}},sa=T.forwardRef(function(t,n){const r=Pn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:s,appear:a=!0,children:l,easing:c,in:p,onEnter:d,onEntered:h,onEntering:f,onExit:b,onExited:y,onExiting:v,style:m,timeout:x=o,TransitionComponent:_=qi}=t,w=ue(t,Mf),E=T.useRef(null),g=ze(E,l.ref,n),O=L=>U=>{if(L){const R=E.current;U===void 0?L(R):L(R,U)}},P=O(f),V=O((L,U)=>{Wi(L);const R=Zn({style:m,timeout:x,easing:c},{mode:"enter"});L.style.webkitTransition=r.transitions.create("opacity",R),L.style.transition=r.transitions.create("opacity",R),d&&d(L,U)}),D=O(h),F=O(v),C=O(L=>{const U=Zn({style:m,timeout:x,easing:c},{mode:"exit"});L.style.webkitTransition=r.transitions.create("opacity",U),L.style.transition=r.transitions.create("opacity",U),b&&b(L)}),$=O(y),I=L=>{s&&s(E.current,L)};return u.jsx(_,S({appear:a,in:p,nodeRef:E,onEnter:V,onEntered:D,onEntering:P,onExit:C,onExited:$,onExiting:F,addEndListener:I,timeout:x},w,{children:(L,U)=>T.cloneElement(l,S({style:S({opacity:0,visibility:L==="exited"&&!p?"hidden":void 0},If[L],m,l.props.style),ref:g},U))}))});process.env.NODE_ENV!=="production"&&(sa.propTypes={addEndListener:i.func,appear:i.bool,children:Tn.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const $f=sa;function _f(e){return Je("MuiBackdrop",e)}ct("MuiBackdrop",["root","invisible"]);const Af=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Df=e=>{const{classes:t,invisible:n}=e;return st({root:["root",n&&"invisible"]},_f,t)},Bf=Oe("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>S({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),ia=T.forwardRef(function(t,n){var r,o,s;const a=it({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:p="div",components:d={},componentsProps:h={},invisible:f=!1,open:b,slotProps:y={},slots:v={},TransitionComponent:m=$f,transitionDuration:x}=a,_=ue(a,Af),w=S({},a,{component:p,invisible:f}),E=Df(w),g=(r=y.root)!=null?r:h.root;return u.jsx(m,S({in:b,timeout:x},_,{children:u.jsx(Bf,S({"aria-hidden":!0},g,{as:(o=(s=v.root)!=null?s:d.Root)!=null?o:p,className:Se(E.root,c,g==null?void 0:g.className),ownerState:S({},w,g==null?void 0:g.ownerState),classes:E,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(ia.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.object}),invisible:i.bool,open:i.bool.isRequired,slotProps:i.shape({root:i.object}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Lf=ia;function Vf(e){return Je("MuiModal",e)}ct("MuiModal",["root","hidden","backdrop"]);const Ff=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],zf=e=>{const{open:t,exited:n,classes:r}=e;return st({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},Vf,r)},Uf=Oe("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>S({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Hf=Oe(Lf,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),aa=T.forwardRef(function(t,n){var r,o,s,a,l,c;const p=it({name:"MuiModal",props:t}),{BackdropComponent:d=Hf,BackdropProps:h,className:f,closeAfterTransition:b=!1,children:y,container:v,component:m,components:x={},componentsProps:_={},disableAutoFocus:w=!1,disableEnforceFocus:E=!1,disableEscapeKeyDown:g=!1,disablePortal:O=!1,disableRestoreFocus:P=!1,disableScrollLock:V=!1,hideBackdrop:D=!1,keepMounted:F=!1,onBackdropClick:C,open:$,slotProps:I,slots:L}=p,U=ue(p,Ff),R=S({},p,{closeAfterTransition:b,disableAutoFocus:w,disableEnforceFocus:E,disableEscapeKeyDown:g,disablePortal:O,disableRestoreFocus:P,disableScrollLock:V,hideBackdrop:D,keepMounted:F}),{getRootProps:B,getBackdropProps:Q,getTransitionProps:J,portalRef:k,isTopModal:j,exited:z,hasTransition:X}=Mc(S({},R,{rootRef:n})),H=S({},R,{exited:z}),q=zf(H),Y={};if(y.props.tabIndex===void 0&&(Y.tabIndex="-1"),X){const{onEnter:ee,onExited:M}=J();Y.onEnter=ee,Y.onExited=M}const G=(r=(o=L==null?void 0:L.root)!=null?o:x.Root)!=null?r:Uf,W=(s=(a=L==null?void 0:L.backdrop)!=null?a:x.Backdrop)!=null?s:d,K=(l=I==null?void 0:I.root)!=null?l:_.root,Z=(c=I==null?void 0:I.backdrop)!=null?c:_.backdrop,oe=kt({elementType:G,externalSlotProps:K,externalForwardedProps:U,getSlotProps:B,additionalProps:{ref:n,as:m},ownerState:H,className:Se(f,K==null?void 0:K.className,q==null?void 0:q.root,!H.open&&H.exited&&(q==null?void 0:q.hidden))}),A=kt({elementType:W,externalSlotProps:Z,additionalProps:h,getSlotProps:ee=>Q(S({},ee,{onClick:M=>{C&&C(M),ee!=null&&ee.onClick&&ee.onClick(M)}})),className:Se(Z==null?void 0:Z.className,h==null?void 0:h.className,q==null?void 0:q.backdrop),ownerState:H});return!F&&!$&&(!X||z)?null:u.jsx(bn,{ref:k,container:v,disablePortal:O,children:u.jsxs(G,S({},oe,{children:[!D&&d?u.jsx(W,S({},A)):null,u.jsx(Xn,{disableEnforceFocus:E,disableAutoFocus:w,disableRestoreFocus:P,isEnabled:j,open:$,children:T.cloneElement(y,Y)})]}))})});process.env.NODE_ENV!=="production"&&(aa.propTypes={BackdropComponent:i.elementType,BackdropProps:i.object,children:Tn.isRequired,classes:i.object,className:i.string,closeAfterTransition:i.bool,component:i.elementType,components:i.shape({Backdrop:i.elementType,Root:i.elementType}),componentsProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([nt,i.func]),disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableEscapeKeyDown:i.bool,disablePortal:i.bool,disableRestoreFocus:i.bool,disableScrollLock:i.bool,hideBackdrop:i.bool,keepMounted:i.bool,onBackdropClick:i.func,onClose:i.func,onTransitionEnter:i.func,onTransitionExited:i.func,open:i.bool.isRequired,slotProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({backdrop:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const qf=aa;function Wf(e){return Je("MuiPaper",e)}ct("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Xf=["className","component","elevation","square","variant"],Yf=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,s={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return st(s,Wf,o)},Gf=Oe("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return S({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&S({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${Jn("#fff",Os(t.elevation))}, ${Jn("#fff",Os(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),la=T.forwardRef(function(t,n){const r=it({props:t,name:"MuiPaper"}),{className:o,component:s="div",elevation:a=1,square:l=!1,variant:c="elevation"}=r,p=ue(r,Xf),d=S({},r,{component:s,elevation:a,square:l,variant:c}),h=Yf(d);return process.env.NODE_ENV!=="production"&&Pn().shadows[a]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)),u.jsx(Gf,S({as:s,ownerState:d,className:Se(h.root,o),ref:n},p))});process.env.NODE_ENV!=="production"&&(la.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,elevation:qt(yi,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:i.bool,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),variant:i.oneOfType([i.oneOf(["elevation","outlined"]),i.string])});const Kf=la;function Jf(e){return Je("MuiPopover",e)}ct("MuiPopover",["root","paper"]);const Zf=["onEntering"],Qf=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],eh=["slotProps"];function Is(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function $s(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function _s(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function zn(e){return typeof e=="function"?e():e}const th=e=>{const{classes:t}=e;return st({root:["root"],paper:["paper"]},Jf,t)},nh=Oe(qf,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),ca=Oe(Kf,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),pa=T.forwardRef(function(t,n){var r,o,s;const a=it({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:p={vertical:"top",horizontal:"left"},anchorPosition:d,anchorReference:h="anchorEl",children:f,className:b,container:y,elevation:v=8,marginThreshold:m=16,open:x,PaperProps:_={},slots:w,slotProps:E,transformOrigin:g={vertical:"top",horizontal:"left"},TransitionComponent:O=Xr,transitionDuration:P="auto",TransitionProps:{onEntering:V}={},disableScrollLock:D=!1}=a,F=ue(a.TransitionProps,Zf),C=ue(a,Qf),$=(r=E==null?void 0:E.paper)!=null?r:_,I=T.useRef(),L=ze(I,$.ref),U=S({},a,{anchorOrigin:p,anchorReference:h,elevation:v,marginThreshold:m,externalPaperSlotProps:$,transformOrigin:g,TransitionComponent:O,transitionDuration:P,TransitionProps:F}),R=th(U),B=T.useCallback(()=>{if(h==="anchorPosition")return process.env.NODE_ENV!=="production"&&(d||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),d;const ee=zn(c),M=ee&&ee.nodeType===1?ee:Ne(I.current).body,se=M.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Ee=M.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Ee.top===0&&Ee.left===0&&Ee.right===0&&Ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:se.top+Is(se,p.vertical),left:se.left+$s(se,p.horizontal)}},[c,p.horizontal,p.vertical,d,h]),Q=T.useCallback(ee=>({vertical:Is(ee,g.vertical),horizontal:$s(ee,g.horizontal)}),[g.horizontal,g.vertical]),J=T.useCallback(ee=>{const M={width:ee.offsetWidth,height:ee.offsetHeight},se=Q(M);if(h==="none")return{top:null,left:null,transformOrigin:_s(se)};const Ee=B();let Ce=Ee.top-se.vertical,we=Ee.left-se.horizontal;const dt=Ce+M.height,Pe=we+M.width,Ze=Bt(zn(c)),$e=Ze.innerHeight-m,Qe=Ze.innerWidth-m;if(m!==null&&Ce<m){const Te=Ce-m;Ce-=Te,se.vertical+=Te}else if(m!==null&&dt>$e){const Te=dt-$e;Ce-=Te,se.vertical+=Te}if(process.env.NODE_ENV!=="production"&&M.height>$e&&M.height&&$e&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${M.height-$e}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),m!==null&&we<m){const Te=we-m;we-=Te,se.horizontal+=Te}else if(Pe>Qe){const Te=Pe-Qe;we-=Te,se.horizontal+=Te}return{top:`${Math.round(Ce)}px`,left:`${Math.round(we)}px`,transformOrigin:_s(se)}},[c,h,B,Q,m]),[k,j]=T.useState(x),z=T.useCallback(()=>{const ee=I.current;if(!ee)return;const M=J(ee);M.top!==null&&(ee.style.top=M.top),M.left!==null&&(ee.style.left=M.left),ee.style.transformOrigin=M.transformOrigin,j(!0)},[J]);T.useEffect(()=>(D&&window.addEventListener("scroll",z),()=>window.removeEventListener("scroll",z)),[c,D,z]);const X=(ee,M)=>{V&&V(ee,M),z()},H=()=>{j(!1)};T.useEffect(()=>{x&&z()}),T.useImperativeHandle(l,()=>x?{updatePosition:()=>{z()}}:null,[x,z]),T.useEffect(()=>{if(!x)return;const ee=di(()=>{z()}),M=Bt(c);return M.addEventListener("resize",ee),()=>{ee.clear(),M.removeEventListener("resize",ee)}},[c,x,z]);let q=P;P==="auto"&&!O.muiSupportAuto&&(q=void 0);const Y=y||(c?Ne(zn(c)).body:void 0),G=(o=w==null?void 0:w.root)!=null?o:nh,W=(s=w==null?void 0:w.paper)!=null?s:ca,K=kt({elementType:W,externalSlotProps:S({},$,{style:k?$.style:S({},$.style,{opacity:0})}),additionalProps:{elevation:v,ref:L},ownerState:U,className:Se(R.paper,$==null?void 0:$.className)}),Z=kt({elementType:G,externalSlotProps:(E==null?void 0:E.root)||{},externalForwardedProps:C,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:Y,open:x},ownerState:U,className:Se(R.root,b)}),{slotProps:oe}=Z,A=ue(Z,eh);return u.jsx(G,S({},A,!Ti(G)&&{slotProps:oe,disableScrollLock:D},{children:u.jsx(O,S({appear:!0,in:x,onEntering:X,onExited:H,timeout:q},F,{children:u.jsx(W,S({},K,{children:f}))}))}))});process.env.NODE_ENV!=="production"&&(pa.propTypes={action:ro,anchorEl:qt(i.oneOfType([nt,i.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=zn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),anchorPosition:i.shape({left:i.number.isRequired,top:i.number.isRequired}),anchorReference:i.oneOf(["anchorEl","anchorPosition","none"]),children:i.node,classes:i.object,className:i.string,container:i.oneOfType([nt,i.func]),disableScrollLock:i.bool,elevation:yi,marginThreshold:i.number,onClose:i.func,open:i.bool.isRequired,PaperProps:i.shape({component:Ml}),slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transformOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object});const rh=pa;function oh(e){return Je("MuiMenu",e)}ct("MuiMenu",["root","paper","list"]);const sh=["onEntering"],ih=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],ah={vertical:"top",horizontal:"right"},lh={vertical:"top",horizontal:"left"},ch=e=>{const{classes:t}=e;return st({root:["root"],paper:["paper"],list:["list"]},oh,t)},ph=Oe(rh,{shouldForwardProp:e=>Ui(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),uh=Oe(ca,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),dh=Oe(jf,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),ua=T.forwardRef(function(t,n){var r,o;const s=it({props:t,name:"MuiMenu"}),{autoFocus:a=!0,children:l,className:c,disableAutoFocusItem:p=!1,MenuListProps:d={},onClose:h,open:f,PaperProps:b={},PopoverClasses:y,transitionDuration:v="auto",TransitionProps:{onEntering:m}={},variant:x="selectedMenu",slots:_={},slotProps:w={}}=s,E=ue(s.TransitionProps,sh),g=ue(s,ih),O=Pn(),P=O.direction==="rtl",V=S({},s,{autoFocus:a,disableAutoFocusItem:p,MenuListProps:d,onEntering:m,PaperProps:b,transitionDuration:v,TransitionProps:E,variant:x}),D=ch(V),F=a&&!p&&f,C=T.useRef(null),$=(J,k)=>{C.current&&C.current.adjustStyleForScrollbar(J,O),m&&m(J,k)},I=J=>{J.key==="Tab"&&(J.preventDefault(),h&&h(J,"tabKeyDown"))};let L=-1;T.Children.map(l,(J,k)=>{T.isValidElement(J)&&(process.env.NODE_ENV!=="production"&&qn.isFragment(J)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),J.props.disabled||(x==="selectedMenu"&&J.props.selected||L===-1)&&(L=k))});const U=(r=_.paper)!=null?r:uh,R=(o=w.paper)!=null?o:b,B=kt({elementType:_.root,externalSlotProps:w.root,ownerState:V,className:[D.root,c]}),Q=kt({elementType:U,externalSlotProps:R,ownerState:V,className:D.paper});return u.jsx(ph,S({onClose:h,anchorOrigin:{vertical:"bottom",horizontal:P?"right":"left"},transformOrigin:P?ah:lh,slots:{paper:U,root:_.root},slotProps:{root:B,paper:Q},open:f,ref:n,transitionDuration:v,TransitionProps:S({onEntering:$},E),ownerState:V},g,{classes:y,children:u.jsx(dh,S({onKeyDown:I,actions:C,autoFocus:a&&(L===-1||p),autoFocusItem:F,variant:x},d,{className:Se(D.list,d.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(ua.propTypes={anchorEl:i.oneOfType([nt,i.func]),autoFocus:i.bool,children:i.node,classes:i.object,className:i.string,disableAutoFocusItem:i.bool,MenuListProps:i.object,onClose:i.func,open:i.bool.isRequired,PaperProps:i.object,PopoverClasses:i.object,slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object,variant:i.oneOf(["menu","selectedMenu"])});const fh=ua;function hh({className:e,commandHandler:t,menuDefinition:n,children:r}){var p;const[o,s]=N.useState(void 0),a=N.useCallback(d=>{d.preventDefault(),s(o===void 0?{mouseX:d.clientX+2,mouseY:d.clientY-6}:void 0)},[o]),l=N.useCallback(()=>{s(void 0)},[]),c=N.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((p=n==null?void 0:n.items)==null?void 0:p.length)??0)===0||!r?r:u.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:a,children:[r,u.jsx(fh,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:u.jsx(ko,{menuDefinition:n,commandHandler:t,onClick:l})})]})}const mh=Ji(u.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function gh(e){return{preserveValue:!0,...e}}const Qn=(e,t,n={})=>{const r=N.useRef(t);r.current=t;const o=N.useRef(n);o.current=gh(o.current);const[s,a]=N.useState(()=>r.current),[l,c]=N.useState(!0);return N.useEffect(()=>{let p=!0;return c(!!e),(async()=>{if(e){const d=await e();p&&(a(()=>d),c(!1))}})(),()=>{p=!1,o.current.preserveValue||a(()=>r.current)}},[e]),[s,l]};function da({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:s,ariaLabelPrefix:a,children:l}){const[c,p]=N.useState(!1),[d,h]=N.useState(!1),f=N.useCallback(()=>{c&&p(!1),h(!1)},[c]),b=N.useCallback(E=>{E.stopPropagation(),p(g=>{const O=!g;return O&&E.shiftKey?h(!0):O||h(!1),O})},[]),y=N.useCallback(E=>(f(),r(E)),[r,f]),[v,m]=N.useState({top:1,left:1});N.useEffect(()=>{if(c){const E=o==null?void 0:o.current;if(E){const g=E.getBoundingClientRect(),O=window.scrollY,P=window.scrollX,V=g.top+O+E.clientHeight,D=g.left+P;m({top:V,left:D})}}},[c,o]);const[x]=Qn(N.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[_]=Qn(N.useCallback(async()=>(e==null?void 0:e(!0))??n??x,[e,n,x,c]),n??x),w=d&&_?_:x;return u.jsxs(u.Fragment,{children:[u.jsx(ve.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${s??""}`,color:"inherit","aria-label":`${a??""} menu button`,onClick:b,children:l??u.jsx(mh,{})}),u.jsx(ve.Drawer,{className:`papi-menu-drawer ${s??""}`,anchor:"left",variant:"temporary",open:c,onClose:f,PaperProps:{className:"papi-menu-drawer-paper",style:{top:v.top,left:v.left}},children:w?u.jsx(ea,{className:s,id:`${a??""} main menu`,commandHandler:y,multiColumnMenu:w}):void 0})]})}function bh({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:s=!1,size:a="medium",className:l,onClick:c,children:p}){return u.jsx(ve.IconButton,{id:e,disabled:n,edge:s,size:a,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:p})}const vh=Ls.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),fa=N.forwardRef(({className:e,...t},n)=>u.jsx(Vs.Root,{ref:n,className:te(vh(),e),...t}));fa.displayName=Vs.Root.displayName;function ha({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:s,placeholder:a,isRequired:l=!1,className:c,defaultValue:p,value:d,onChange:h,onFocus:f,onBlur:b}){return u.jsxs("div",{className:te("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":r}),children:[u.jsx(fa,{htmlFor:e,className:te({"pr-text-red-600":n,"pr-hidden":!s}),children:`${s}${l?"*":""}`}),u.jsx(En,{id:e,disabled:t,placeholder:a,required:l,className:te(c,{"pr-border-red-600":n}),defaultValue:p,value:d,onChange:h,onFocus:f,onBlur:b}),u.jsx("p",{className:te({"pr-hidden":!o}),children:o})]})}function yh({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=N.useState(""),s=a=>{o(a),e(a)};return u.jsx(ha,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:a=>s(a.target.value)})}function wh({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:s=1,showMarks:a=!1,defaultValue:l,value:c,valueLabelDisplay:p="off",className:d,onChange:h,onChangeCommitted:f}){return u.jsx(ve.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:s,marks:a,defaultValue:l,value:c,valueLabelDisplay:p,className:`papi-slider ${n} ${d??""}`,onChange:h,onChangeCommitted:f})}function xh({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:s={vertical:"bottom",horizontal:"left"},ContentProps:a,children:l}){const c={action:(a==null?void 0:a.action)||l,message:a==null?void 0:a.message,className:r};return u.jsx(ve.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:s,id:t,ContentProps:c})}function Eh({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:s}){return u.jsx(ve.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:s})}function Th({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const s=N.useRef(void 0);return u.jsx("div",{ref:s,style:{position:"relative"},children:u.jsx(ve.AppBar,{position:"static",id:r,children:u.jsxs(ve.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?u.jsx(da,{commandHandler:t,containerRef:s,menuProvider:e}):void 0,o?u.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const kh=Ie.Root,ma=N.forwardRef(({className:e,...t},n)=>u.jsx(Ie.List,{ref:n,className:te("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));ma.displayName=Ie.List.displayName;const ga=N.forwardRef(({className:e,...t},n)=>u.jsx(Ie.Trigger,{ref:n,className:te("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));ga.displayName=Ie.Trigger.displayName;const ba=N.forwardRef(({className:e,...t},n)=>u.jsx(Ie.Content,{ref:n,className:te("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));ba.displayName=Ie.Content.displayName;const va=N.forwardRef(({className:e,...t},n)=>u.jsx(Ie.Root,{orientation:"vertical",ref:n,className:te("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));va.displayName=Ie.List.displayName;const ya=N.forwardRef(({className:e,...t},n)=>u.jsx(Ie.List,{ref:n,className:te("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));ya.displayName=Ie.List.displayName;const Sh=N.forwardRef(({className:e,...t},n)=>u.jsx(Ie.Trigger,{ref:n,...t,className:te("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),wa=N.forwardRef(({className:e,...t},n)=>u.jsx(Ie.Content,{ref:n,className:te("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));wa.displayName=Ie.Content.displayName;const Bn=e=>e==="asc"?u.jsx(fe.ArrowUpIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):e==="desc"?u.jsx(fe.ArrowDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):u.jsx(fe.ArrowUpDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}),Nh=(e,t,n,r,o)=>[{accessorKey:"character",header:({column:s})=>u.jsxs(ke,{onClick:()=>s.toggleSorting(void 0),children:[e,Bn(s.getIsSorted())]})},{accessorKey:"unicodeValue",header:({column:s})=>u.jsxs(ke,{onClick:()=>s.toggleSorting(void 0),children:[t,Bn(s.getIsSorted())]}),cell:({row:s})=>s.getValue("character").charCodeAt(0).toString(16).toUpperCase().padStart(4,"0")},{accessorKey:"count",header:({column:s})=>u.jsxs(ke,{onClick:()=>s.toggleSorting(void 0),children:[n,Bn(s.getIsSorted())]})},{accessorKey:"status",header:({column:s,table:a})=>{const l=a.getSelectedRowModel().rows,c=[];return l.forEach(p=>{c.push(p.getValue("character"))}),u.jsxs("div",{children:[u.jsx("div",{className:"pr-flex pr-justify-center",children:u.jsxs(ke,{onClick:()=>s.toggleSorting(void 0),children:[r,Bn(s.getIsSorted())]})}),u.jsxs("div",{className:"pr-flex pr-justify-center",children:[u.jsx(ke,{children:u.jsx(fe.CircleCheckIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,!0)}})}),u.jsx(ke,{children:u.jsx(fe.CircleXIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,!1)}})}),u.jsx(ke,{children:u.jsx(fe.CircleHelpIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,void 0)}})})]})]})},cell:({row:s})=>{const a=s.getValue("status");return a===!0?u.jsx(fe.CircleCheckIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):a===!1?u.jsx(fe.CircleXIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):u.jsx(fe.CircleHelpIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"})}}];function Oh({tableData:e,onStatusChange:t,onSelectCharacter:n,localizedStrings:r}){const o=r["%webView_inventory_table_header_character%"],s=r["%webView_inventory_table_header_unicode_value%"],a=r["%webView_inventory_table_header_count%"],l=r["%webView_inventory_table_header_status%"],c=(p,d)=>{d.toggleAllRowsSelected(!1),p.toggleSelected(void 0),n(p.getValue("character"))};return u.jsx("div",{className:"pr-overflow-y-auto",children:u.jsx(ri,{columns:Nh(o,s,a,l,t),data:e,onRowClickHandler:c})})}const As=(e,t,n)=>{if(!e||e===""||t==="")return[];const r=[],o=e.split(`
`);let s="0",a="0",l=0;return o.forEach(c=>{const p=c.split(/\s+/);c.startsWith("\\c")&&([,s]=p,a="0"),c.startsWith("\\v")&&([,a]=p,s==="0"&&(s=n.chapterNum.toString()));for(let d=0;d<p.length;d++)if(p[d].includes(t)){const h=Math.max(0,d-2),f=Math.min(p.length,d+3),b=p.slice(h,f).join(" "),y={reference:{...n,chapterNum:+s,verseNum:+a},snippet:b,key:l};l+=1,r.push(y)}}),r};function Ch({selectedCharacter:e,text:t,scriptureReference:n,setScriptureReference:r,localizedStrings:o}){const s=o["%webView_inventory_occurrences_table_header_reference%"],a=o["%webView_inventory_occurrences_table_header_occurrence%"],[l,c]=N.useState(As(t,e,n));return N.useEffect(()=>c(As(t,e,n)),[t,e,n]),u.jsxs(nr,{children:[u.jsx(rr,{children:u.jsxs(wt,{children:[u.jsx(fn,{children:s}),u.jsx(fn,{children:a})]})}),u.jsx(or,{children:l.map(p=>u.jsxs(wt,{onClick:()=>{r(p.reference)},children:[u.jsx(At,{children:`${de.bookNumberToEnglishName(p.reference.bookNum)} ${p.reference.chapterNum}:${p.reference.verseNum}`}),u.jsx(At,{children:p.snippet})]},p.key))})]})}const Ph=async(e,t,n,r,o)=>{const s=[];return Ds.split(e,"").forEach(a=>{if(n!==""&&!a.includes(n))return;const l=s.find(c=>c.character===a);if(l)l.count+=1;else{let c;if(r.includes(a)&&(c=!0),o.includes(a)&&(c=!1),t==="all"||t==="approved"&&c===!0||t==="unapproved"&&c===!1||t==="unknown"&&c===void 0){const p={character:a,count:1,status:c};s.push(p)}}}),s};function Rh({scriptureReference:e,setScriptureReference:t,localizedStrings:n,projectId:r,getSetting:o,setSetting:s,getText:a}){const l=n["%webView_characterInventory_characters_all%"],c=n["%webView_characterInventory_characters_approved%"],p=n["%webView_characterInventory_characters_unapproved%"],d=n["%webView_characterInventory_characters_unknown%"],h=n["%webView_inventory_scope_book%"],f=n["%webView_inventory_scope_chapter%"],b=n["%webView_inventory_scope_verse%"],y=n["%webView_inventory_filter_text%"],[v,m]=N.useState([]),[x,_]=N.useState([]),[w,E]=N.useState(void 0),[g,O]=N.useState("book"),[P,V]=N.useState("all"),[D,F]=N.useState(""),[C,$]=N.useState([]),[I,L]=N.useState(""),U=(R,B)=>{$(Q=>{let J=[];return R.forEach(k=>{J=Q.map(j=>j.character===k&&j.status!==B?{...j,status:B}:j)}),m(k=>{let j=[...k];return R.forEach(z=>{B===!0?j.includes(z)||j.push(z):j=j.filter(X=>X!==z)}),s("validCharacters",r,j),j}),_(k=>{let j=[...k];return R.forEach(z=>{B===!1?j.includes(z)||j.push(z):j=j.filter(X=>X!==z)}),s("invalidCharacters",r,j),j}),J})};return N.useEffect(()=>{(async()=>{try{m(await o("validCharacters",r)),_(await o("invalidCharacters",r))}catch{throw new Error("Failed to fetch characters from project settings")}})()},[r,o]),N.useEffect(()=>{(async()=>{try{const B=await a(r,e,g);E(B)}catch{throw new Error("Failed getting scripture text")}})()},[r,e,g,a]),N.useEffect(()=>{if(!w){$([]);return}(async()=>{try{$(await Ph(w,P,D,v,x))}catch{throw new Error("Failed building table data")}})()},[v,x,w,P,D]),u.jsxs("div",{className:"pr-twp pr-font-sans",children:[u.jsxs("div",{className:"pr-flex",children:[u.jsxs(Un,{onValueChange:R=>V(R),defaultValue:P,children:[u.jsx(hn,{children:u.jsx(Hn,{placeholder:"Select filter"})}),u.jsxs(mn,{className:"pr-font-sans",children:[u.jsx(We,{value:"all",children:l}),u.jsx(We,{value:"approved",children:c}),u.jsx(We,{value:"unapproved",children:p}),u.jsx(We,{value:"unknown",children:d})]})]}),u.jsxs(Un,{onValueChange:R=>O(R),defaultValue:g,children:[u.jsx(hn,{children:u.jsx(Hn,{placeholder:"Select scope"})}),u.jsxs(mn,{className:"pr-font-sans",children:[u.jsx(We,{value:"book",children:h}),u.jsx(We,{value:"chapter",children:f}),u.jsx(We,{value:"verse",children:b})]})]}),u.jsx(En,{className:"pr-rounded-md pr-border",placeholder:y,value:D,onChange:R=>{F(R.target.value)}})]}),u.jsx("div",{className:`pr-overflow-y-auto pr-rounded-md pr-border ${I!==""&&"pr-max-h-96"}`,children:u.jsx(Oh,{tableData:C,onStatusChange:U,onSelectCharacter:R=>{L(R)},localizedStrings:n})}),I!==""&&u.jsx("div",{className:"pr-mt-4 pr-rounded-md pr-border",children:u.jsx(Ch,{selectedCharacter:I,text:w,scriptureReference:e,setScriptureReference:R=>t(R),localizedStrings:n})})]})}const jh=(e,t)=>{N.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},$r=()=>!1,Mh=(e,t)=>{const[n]=Qn(N.useCallback(async()=>{if(!e)return $r;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),$r,{preserveValue:!1});N.useEffect(()=>()=>{n!==$r&&n()},[n])};exports.BookChapterControl=dl;exports.Button=ke;exports.ChapterRangeSelector=gl;exports.CharacterInventory=Rh;exports.Checkbox=oi;exports.Checklist=bl;exports.ComboBox=Ar;exports.ContextMenu=hh;exports.DataTable=ri;exports.DropdownMenu=Jr;exports.DropdownMenuCheckboxItem=Qr;exports.DropdownMenuContent=er;exports.DropdownMenuGroup=Ja;exports.DropdownMenuItem=Zr;exports.DropdownMenuLabel=xn;exports.DropdownMenuPortal=Za;exports.DropdownMenuRadioGroup=el;exports.DropdownMenuRadioItem=Ks;exports.DropdownMenuSeparator=tr;exports.DropdownMenuShortcut=Js;exports.DropdownMenuSub=Qa;exports.DropdownMenuSubContent=Gs;exports.DropdownMenuSubTrigger=Ys;exports.DropdownMenuTrigger=Xs;exports.GridMenu=ea;exports.HamburgerMenuButton=da;exports.IconButton=bh;exports.Input=En;exports.LabelPosition=vt;exports.MenuItem=To;exports.SearchBar=yh;exports.Select=Un;exports.SelectContent=mn;exports.SelectGroup=fl;exports.SelectItem=We;exports.SelectLabel=ti;exports.SelectScrollDownButton=to;exports.SelectScrollUpButton=eo;exports.SelectSeparator=ni;exports.SelectTrigger=hn;exports.SelectValue=Hn;exports.Slider=wh;exports.Snackbar=xh;exports.Switch=Eh;exports.Table=nr;exports.TableBody=or;exports.TableCaption=Qs;exports.TableCell=At;exports.TableFooter=Zs;exports.TableHead=fn;exports.TableHeader=rr;exports.TableRow=wt;exports.Tabs=kh;exports.TabsContent=ba;exports.TabsList=ma;exports.TabsTrigger=ga;exports.TextField=ha;exports.Toolbar=Th;exports.VerticalTabs=va;exports.VerticalTabsContent=wa;exports.VerticalTabsList=ya;exports.VerticalTabsTrigger=Sh;exports.buttonVariants=ei;exports.useEvent=jh;exports.useEventAsync=Mh;exports.usePromise=Qn;function Ih(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Ih(`.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.pr-text-nowrap {
  text-wrap: nowrap;
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
.pr-border-muted {
  border-color: hsl(var(--muted));
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
.pr-text-current {
  color: currentColor;
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
.pr-underline {
  text-decoration-line: underline;
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
`,"top");
//# sourceMappingURL=index.cjs.map
