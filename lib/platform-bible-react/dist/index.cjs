"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const p=require("react/jsx-runtime"),T=require("react"),Vs=require("platform-bible-utils"),Fs=require("@radix-ui/react-dropdown-menu"),fe=require("lucide-react"),Ne=require("clsx"),Wi=require("tailwind-merge"),mt=require("@tanstack/react-table"),Xi=require("@radix-ui/react-slot"),Kr=require("class-variance-authority"),Yi=require("@radix-ui/react-select"),ve=require("@mui/material"),Ar=require("@mui/styled-engine"),rn=require("react-dom"),Gi=require("@radix-ui/react-label"),Ki=require("@radix-ui/react-tabs"),Ji=require("@radix-ui/react-slider"),Zi=require("@radix-ui/react-switch");function ct(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const k=ct(T),he=ct(Fs),ye=ct(Yi),Qi=ct(rn),zs=ct(Gi),Ie=ct(Ki),on=ct(Ji),Dr=ct(Zi);var el=Object.defineProperty,tl=(e,t,n)=>t in e?el(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t,n)=>tl(e,typeof t!="symbol"?t+"":t,n);const Tt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Jr=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Us=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],zo=ul();function Ht(e,t=!0){return t&&(e=e.toUpperCase()),e in zo?zo[e]:0}function Zr(e){return Ht(e)>0}function nl(e){const t=typeof e=="string"?Ht(e):e;return t>=40&&t<=66}function rl(e){return(typeof e=="string"?Ht(e):e)<=39}function Hs(e){return e<=66}function ol(e){const t=typeof e=="string"?Ht(e):e;return Xs(t)&&!Hs(t)}function*sl(){for(let e=1;e<=Tt.length;e++)yield e}const al=1,qs=Tt.length;function il(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Qr(e,t="***"){const n=e-1;return n<0||n>=Tt.length?t:Tt[n]}function Ws(e){return e<=0||e>qs?"******":Us[e-1]}function ll(e){return Ws(Ht(e))}function Xs(e){const t=typeof e=="number"?Qr(e):e;return Zr(t)&&!Jr.includes(t)}function cl(e){const t=typeof e=="number"?Qr(e):e;return Zr(t)&&Jr.includes(t)}function pl(e){return Us[e-1].includes("*obsolete*")}function ul(){const e={};for(let t=0;t<Tt.length;t++)e[Tt[t]]=t+1;return e}const de={allBookIds:Tt,nonCanonicalIds:Jr,bookIdToNumber:Ht,isBookIdValid:Zr,isBookNT:nl,isBookOT:rl,isBookOTNT:Hs,isBookDC:ol,allBookNumbers:sl,firstBook:al,lastBook:qs,extraBooks:il,bookNumberToId:Qr,bookNumberToEnglishName:Ws,bookIdToEnglishName:ll,isCanonical:Xs,isExtraMaterial:cl,isObsolete:pl};var Xe=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Xe||{});const Ae=class{constructor(t){if(re(this,"name"),re(this,"fullPath"),re(this,"isPresent"),re(this,"hasVerseSegments"),re(this,"isCustomized"),re(this,"baseVersification"),re(this,"scriptureBooks"),re(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Xe[t]):(this._type=t,this.name=Xe[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};re(Ae,"Original",new Ae(Xe.Original)),re(Ae,"Septuagint",new Ae(Xe.Septuagint)),re(Ae,"Vulgate",new Ae(Xe.Vulgate)),re(Ae,"English",new Ae(Xe.English)),re(Ae,"RussianProtestant",new Ae(Xe.RussianProtestant)),re(Ae,"RussianOrthodox",new Ae(Xe.RussianOrthodox));let gt=Ae;function Uo(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var Ys=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Ys||{});const Re=class ae{constructor(t,n,r,o){if(re(this,"firstChapter"),re(this,"lastChapter"),re(this,"lastVerse"),re(this,"hasSegmentsDefined"),re(this,"text"),re(this,"BBBCCCVVVS"),re(this,"longHashCode"),re(this,"versification"),re(this,"rtlMark","‏"),re(this,"_bookNum",0),re(this,"_chapterNum",0),re(this,"_verseNum",0),re(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const s=t,i=n!=null&&n instanceof gt?n:void 0;this.setEmpty(i),this.parse(s)}else if(t!=null&&typeof t=="number"){const s=n!=null&&n instanceof gt?n:void 0;this.setEmpty(s),this._verseNum=t%ae.chapterDigitShifter,this._chapterNum=Math.floor(t%ae.bookDigitShifter/ae.chapterDigitShifter),this._bookNum=Math.floor(t/ae.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ae){const s=t;this._bookNum=s.bookNum,this._chapterNum=s.chapterNum,this._verseNum=s.verseNum,this._verse=s.verse,this.versification=s.versification}else{if(t==null)return;const s=t instanceof gt?t:ae.defaultVersification;this.setEmpty(s)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ae.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new ae(t),{success:!0,verseRef:n}}catch(r){if(r instanceof Jt)return n=new ae,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ae.bcvMaxValue*ae.bookDigitShifter+(n>=0?n%ae.bcvMaxValue*ae.chapterDigitShifter:0)+(r>=0?r%ae.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:s,versificationStr:i}=t,l=s||o.toString();let c;return i&&(c=new gt(i)),n?new ae(n,r.toString(),l,c):new ae}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>ae.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ae.verseRangeSeparator)||this._verse.includes(ae.verseSequenceIndicator))}get book(){return de.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=de.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ae.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ae.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>de.lastBook)throw new Jt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new gt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ae.verseRangeSeparators,ae.verseSequenceIndicators)}get BBBCCC(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const s=t.split("/");if(t=s[0],s.length>1)try{const i=+s[1].trim();this.versification=new gt(Xe[i])}catch{throw new Jt("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new Jt("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||de.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ae.isVerseParseable(r[1]))throw new Jt("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ae(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;return(t===""||t===this.verseNum.toString())&&(t=void 0),{book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr}}equals(t){return t instanceof ae?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=ae.verseRangeSeparators,r=ae.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],s=Uo(this._verse,r);for(const i of s.map(l=>Uo(l,n))){const l=this.clone();l.verse=i[0];const c=l.verseNum;if(o.push(l),i.length>1){const u=this.clone();if(u.verse=i[1],!t)for(let d=c+1;d<u.verseNum;d++){const h=new ae(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(h)}o.push(u)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const s=o.internalValid;if(s!==0)return s;const i=o.BBBCCCVVV;if(r>i)return 3;if(r===i)return 4;r=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>de.lastBook?2:(de.isCanonical(this._bookNum),0)}setEmpty(t=ae.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=de.bookIdToNumber(t),this.chapter=n,this.verse=r}};re(Re,"defaultVersification",gt.English),re(Re,"verseRangeSeparator","-"),re(Re,"verseSequenceIndicator",","),re(Re,"verseRangeSeparators",[Re.verseRangeSeparator]),re(Re,"verseSequenceIndicators",[Re.verseSequenceIndicator]),re(Re,"chapterDigitShifter",1e3),re(Re,"bookDigitShifter",Re.chapterDigitShifter*Re.chapterDigitShifter),re(Re,"bcvMaxValue",Re.chapterDigitShifter-1),re(Re,"ValidStatusType",Ys);class Jt extends Error{}const dl=Wi.extendTailwindMerge({prefix:"pr-"});function K(...e){return dl(Ne.clsx(e))}const eo=he.Root,Gs=he.Trigger,fl=he.Group,hl=he.Portal,ml=he.Sub,gl=he.RadioGroup,Ks=T.forwardRef(({className:e,inset:t,children:n,...r},o)=>p.jsxs(he.SubTrigger,{ref:o,className:K("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,p.jsx(fe.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Ks.displayName=he.SubTrigger.displayName;const Js=T.forwardRef(({className:e,...t},n)=>p.jsx(he.SubContent,{ref:n,className:K("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));Js.displayName=he.SubContent.displayName;const tr=T.forwardRef(({className:e,sideOffset:t=4,...n},r)=>p.jsx(he.Portal,{children:p.jsx(he.Content,{ref:r,sideOffset:t,className:K("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));tr.displayName=he.Content.displayName;const to=T.forwardRef(({className:e,inset:t,...n},r)=>p.jsx(he.Item,{ref:r,className:K("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));to.displayName=he.Item.displayName;const no=T.forwardRef(({className:e,children:t,checked:n,...r},o)=>p.jsxs(he.CheckboxItem,{ref:o,className:K("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[p.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:p.jsx(he.ItemIndicator,{children:p.jsx(fe.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));no.displayName=he.CheckboxItem.displayName;const Zs=T.forwardRef(({className:e,children:t,...n},r)=>p.jsxs(he.RadioItem,{ref:r,className:K("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[p.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:p.jsx(he.ItemIndicator,{children:p.jsx(fe.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));Zs.displayName=he.RadioItem.displayName;const En=T.forwardRef(({className:e,inset:t,...n},r)=>p.jsx(he.Label,{ref:r,className:K("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));En.displayName=he.Label.displayName;const nr=T.forwardRef(({className:e,...t},n)=>p.jsx(he.Separator,{ref:n,className:K("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));nr.displayName=he.Separator.displayName;function Qs({className:e,...t}){return p.jsx("span",{className:K("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Qs.displayName="DropdownMenuShortcut";const Tn=T.forwardRef(({className:e,type:t,...n},r)=>p.jsx("input",{type:t,className:K("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));Tn.displayName="Input";const bl=T.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},s)=>p.jsxs("div",{className:"pr-relative",children:[p.jsx(Tn,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:i=>e(i.target.value),onKeyDown:i=>{i.key==="Enter"&&r(),t(i)},onClick:n,ref:s}),p.jsx(fe.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function vl({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const s=Array.from({length:t},(l,c)=>c+1),i=T.useCallback(l=>{o(l)},[o]);return p.jsx("div",{className:K("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:s.map(l=>p.jsx("div",{className:K("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===n,"pr-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>i(l),children:l},l))})}const yl=T.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:s,children:i},l)=>p.jsxs(to,{ref:l,textValue:e,className:K("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[p.jsx("span",{className:K("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":s.toLowerCase()==="ot","pr-border-l-purple-200":s.toLowerCase()==="nt","pr-border-l-indigo-200":s.toLowerCase()==="dc"}),children:de.bookIdToEnglishName(e)}),n&&p.jsx("div",{children:i})]},e));function wl({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return p.jsxs(En,{className:"pr-flex pr-justify-between",children:[p.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),p.jsxs("div",{className:"pr-flex pr-items-center",children:[p.jsx(fe.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),p.jsx(fe.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),p.jsx(fe.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const cn=de.allBookIds,xl={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},Ho=["OT","NT","DC"],El=32+32+32,Tl=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],kl=e=>({OT:cn.filter(n=>de.isBookOT(n)),NT:cn.filter(n=>de.isBookNT(n)),DC:cn.filter(n=>de.isBookDC(n))})[e],Zt=e=>Vs.getChaptersForBook(de.bookIdToNumber(e));function Nl(){return cn.map(t=>de.bookIdToEnglishName(t))}function Sl(e){return Nl().includes(e)}function Cl(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(Sl(t))return cn.find(r=>de.bookIdToEnglishName(r)===t)}function Ol({scrRef:e,handleSubmit:t}){const[n,r]=T.useState(""),[o,s]=T.useState(de.bookNumberToId(e.bookNum)),[i,l]=T.useState(e.chapterNum??0),[c,u]=T.useState(de.bookNumberToId(e.bookNum)),[d,h]=T.useState(!1),[f,b]=T.useState(d),y=T.useRef(void 0),v=T.useRef(void 0),m=T.useRef(void 0),E=T.useCallback(O=>kl(O).filter(I=>{const j=de.bookIdToEnglishName(I).toLowerCase(),V=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return j.includes(V)||I.toLowerCase().includes(V)}),[n]),_=O=>{r(O)},w=T.useRef(!1),x=T.useCallback(O=>{if(w.current){w.current=!1;return}h(O)},[]),g=T.useCallback((O,I,j,V)=>{if(l(de.bookNumberToId(e.bookNum)!==O?1:e.chapterNum),I||Zt(O)===-1){t({bookNum:de.bookIdToNumber(O),chapterNum:j||1,verseNum:V||1}),h(!1),r("");return}s(o!==O?O:""),h(!I)},[t,e.bookNum,e.chapterNum,o]),C=O=>{O<=0||O>Zt(o)||g(o,!0,O)},P=T.useCallback(()=>{Tl.forEach(O=>{const I=n.match(O);if(I){const[j,V=void 0,U=void 0]=I.slice(1),M=Cl(j);(de.isBookIdValid(j)||M)&&g(M??j,!0,V?parseInt(V,10):1,U?parseInt(U,10):1)}})},[g,n]),F=T.useCallback(O=>{d?(O.key==="ArrowDown"||O.key==="ArrowUp")&&(typeof m<"u"&&m.current!==null?m.current.focus():typeof v<"u"&&v.current!==null&&v.current.focus(),O.preventDefault()):h(!0)},[d]),B=O=>{const{key:I}=O;I==="ArrowRight"||I==="ArrowLeft"||I==="ArrowDown"||I==="ArrowUp"||I==="Enter"||(y.current.dispatchEvent(new KeyboardEvent("keydown",{key:I})),y.current.focus())},z=O=>{const{key:I}=O;if(c===o){if(I==="Enter"){O.preventDefault(),g(o,!0,i);return}let j=0;if(I==="ArrowRight")if(i<Zt(c))j=1;else{O.preventDefault();return}else if(I==="ArrowLeft")if(i>1)j=-1;else{O.preventDefault();return}else I==="ArrowDown"?j=6:I==="ArrowUp"&&(j=-6);i+j<=0||i+j>Zt(c)?l(0):j!==0&&(l(i+j),O.preventDefault())}};return T.useEffect(()=>{o===c?o===de.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),T.useLayoutEffect(()=>{b(d)},[d]),T.useLayoutEffect(()=>{const O=setTimeout(()=>{if(f&&v.current&&m.current){const j=m.current.offsetTop-El;v.current.scrollTo({top:j,behavior:"instant"})}},10);return()=>{clearTimeout(O)}},[f]),p.jsx("div",{className:"pr-flex",children:p.jsxs(eo,{modal:!1,open:d,onOpenChange:x,children:[p.jsx(Gs,{asChild:!0,children:p.jsx(bl,{ref:y,value:n,handleSearch:_,handleKeyDown:F,handleOnClick:()=>{s(de.bookNumberToId(e.bookNum)),u(de.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),h(!0),y.current.focus()},onFocus:()=>{w.current=!0},handleSubmit:P,placeholder:`${de.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),p.jsxs(tr,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:B,align:"start",ref:v,children:[p.jsx(wl,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),Ho.map((O,I)=>E(O).length>0&&p.jsxs("div",{children:[p.jsx(En,{className:"pr-font-semibold pr-text-slate-700",children:xl[O]}),E(O).map(j=>p.jsx("div",{children:p.jsx(yl,{bookId:j,handleSelectBook:()=>g(j,!1),isSelected:o===j,handleHighlightBook:()=>u(j),handleKeyDown:z,bookType:O,ref:V=>{o===j&&(m.current=V)},children:p.jsx(vl,{handleSelectChapter:C,endChapter:Zt(j),activeChapter:e.bookNum===de.bookIdToNumber(j)?e.chapterNum:0,highlightedChapter:i,handleHighlightedChapter:V=>{l(V)}})})},j)),Ho.length-1!==I?p.jsx(nr,{}):void 0]},O))]})]})})}const rr=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{className:"pr-relative pr-w-full pr-overflow-auto",children:p.jsx("table",{ref:n,className:K("pr-w-full pr-caption-bottom pr-text-sm",e),...t})}));rr.displayName="Table";const or=T.forwardRef(({className:e,...t},n)=>p.jsx("thead",{ref:n,className:K("[&_tr]:pr-border-b",e),...t}));or.displayName="TableHeader";const sr=T.forwardRef(({className:e,...t},n)=>p.jsx("tbody",{ref:n,className:K("[&_tr:last-child]:pr-border-0",e),...t}));sr.displayName="TableBody";const ea=T.forwardRef(({className:e,...t},n)=>p.jsx("tfoot",{ref:n,className:K("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));ea.displayName="TableFooter";const xt=T.forwardRef(({className:e,...t},n)=>p.jsx("tr",{ref:n,className:K("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));xt.displayName="TableRow";const hn=T.forwardRef(({className:e,...t},n)=>p.jsx("th",{ref:n,className:K("pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",e),...t}));hn.displayName="TableHead";const Dt=T.forwardRef(({className:e,...t},n)=>p.jsx("td",{ref:n,className:K("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0",e),...t}));Dt.displayName="TableCell";const ta=T.forwardRef(({className:e,...t},n)=>p.jsx("caption",{ref:n,className:K("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));ta.displayName="TableCaption";const na=Kr.cva("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),ke=T.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},s)=>{const i=r?Xi.Slot:"button";return p.jsx(i,{className:K(na({variant:t,size:n,className:e})),ref:s,...o})});ke.displayName="Button";const Hn=ye.Root,Pl=ye.Group,qn=ye.Value,mn=T.forwardRef(({className:e,children:t,...n},r)=>p.jsxs(ye.Trigger,{ref:r,className:K("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...n,children:[t,p.jsx(ye.Icon,{asChild:!0,children:p.jsx(fe.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));mn.displayName=ye.Trigger.displayName;const ro=T.forwardRef(({className:e,...t},n)=>p.jsx(ye.ScrollUpButton,{ref:n,className:K("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:p.jsx(fe.ChevronUp,{className:"pr-h-4 pr-w-4"})}));ro.displayName=ye.ScrollUpButton.displayName;const oo=T.forwardRef(({className:e,...t},n)=>p.jsx(ye.ScrollDownButton,{ref:n,className:K("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:p.jsx(fe.ChevronDown,{className:"pr-h-4 pr-w-4"})}));oo.displayName=ye.ScrollDownButton.displayName;const gn=T.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>p.jsx(ye.Portal,{children:p.jsxs(ye.Content,{ref:o,className:K("pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:n,...r,children:[p.jsx(ro,{}),p.jsx(ye.Viewport,{className:K("pr-p-1",n==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),p.jsx(oo,{})]})}));gn.displayName=ye.Content.displayName;const ra=T.forwardRef(({className:e,...t},n)=>p.jsx(ye.Label,{ref:n,className:K("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));ra.displayName=ye.Label.displayName;const We=T.forwardRef(({className:e,children:t,...n},r)=>p.jsxs(ye.Item,{ref:r,className:K("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[p.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:p.jsx(ye.ItemIndicator,{children:p.jsx(fe.Check,{className:"pr-h-4 pr-w-4"})})}),p.jsx(ye.ItemText,{children:t})]}));We.displayName=ye.Item.displayName;const oa=T.forwardRef(({className:e,...t},n)=>p.jsx(ye.Separator,{ref:n,className:K("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));oa.displayName=ye.Separator.displayName;function Rl({table:e}){return p.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:p.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[p.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),p.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[p.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),p.jsxs(Hn,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[p.jsx(mn,{className:"pr-h-8 pr-w-[70px]",children:p.jsx(qn,{placeholder:e.getState().pagination.pageSize})}),p.jsx(gn,{side:"top",children:[10,20,30,40,50].map(t=>p.jsx(We,{value:`${t}`,children:t},t))})]})]}),p.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),p.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[p.jsxs(ke,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),p.jsx(fe.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),p.jsxs(ke,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),p.jsx(fe.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),p.jsxs(ke,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),p.jsx(fe.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),p.jsxs(ke,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),p.jsx(fe.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}function jl({table:e}){return p.jsxs(eo,{children:[p.jsx(Fs.DropdownMenuTrigger,{asChild:!0,children:p.jsxs(ke,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[p.jsx(fe.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),p.jsxs(tr,{align:"end",className:"pr-w-[150px]",children:[p.jsx(En,{children:"Toggle columns"}),p.jsx(nr,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>p.jsx(no,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}function sa({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,onRowClickHandler:s=()=>{}}){var v;const[i,l]=T.useState([]),[c,u]=T.useState([]),[d,h]=T.useState({}),[f,b]=T.useState({}),y=mt.useReactTable({data:t,columns:e,getCoreRowModel:mt.getCoreRowModel(),...n&&{getPaginationRowModel:mt.getPaginationRowModel()},onSortingChange:l,getSortedRowModel:mt.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:mt.getFilteredRowModel(),onColumnVisibilityChange:h,onRowSelectionChange:b,state:{sorting:i,columnFilters:c,columnVisibility:d,rowSelection:f}});return p.jsxs("div",{children:[o&&p.jsx(jl,{table:y}),p.jsx("div",{className:"pr-twp pr-font-sans",children:p.jsxs(rr,{children:[p.jsx(or,{children:y.getHeaderGroups().map(m=>p.jsx(xt,{children:m.headers.map(E=>p.jsx(hn,{children:E.isPlaceholder?void 0:mt.flexRender(E.column.columnDef.header,E.getContext())},E.id))},m.id))}),p.jsx(sr,{children:(v=y.getRowModel().rows)!=null&&v.length?y.getRowModel().rows.map(m=>p.jsx(xt,{onClick:()=>s(m,y),"data-state":m.getIsSelected()&&"selected",children:m.getVisibleCells().map(E=>p.jsx(Dt,{children:mt.flexRender(E.column.columnDef.cell,E.getContext())},E.id))},m.id)):p.jsx(xt,{children:p.jsx(Dt,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]})}),n&&p.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[p.jsx(ke,{variant:"outline",size:"sm",onClick:()=>y.previousPage(),disabled:!y.getCanPreviousPage(),children:"Previous"}),p.jsx(ke,{variant:"outline",size:"sm",onClick:()=>y.nextPage(),disabled:!y.getCanNextPage(),children:"Next"})]}),n&&r&&p.jsx(Rl,{table:y})]})}function Br({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:s=!1,width:i,options:l=[],className:c,value:u,onChange:d,onFocus:h,onBlur:f,getOptionLabel:b}){return p.jsx(ve.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:s,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:u,onChange:d,onFocus:h,onBlur:f,getOptionLabel:b,renderInput:y=>p.jsx(ve.TextField,{...y,error:o,fullWidth:s,disabled:n,label:t,style:{width:i}})})}function Ml({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,s]=T.useState(1),[i,l]=T.useState(r),[c,u]=T.useState(Array.from({length:r},(f,b)=>b+1));T.useEffect(()=>{s(1),e(1),l(r),t(r),u(Array.from({length:r},(f,b)=>b+1))},[r,t,e]);const d=(f,b)=>{s(b),e(b),b>i&&(l(b),t(b))},h=(f,b)=>{l(b),t(b),b<o&&(s(b),e(b))};return p.jsxs(p.Fragment,{children:[p.jsx(ve.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:p.jsx(Br,{onChange:(f,b)=>d(f,b),className:"book-selection-chapter",isClearable:!1,options:c,getOptionLabel:f=>f.toString(),value:o,isDisabled:n},"start chapter"),label:"Chapters",labelPlacement:"start"}),p.jsx(ve.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:p.jsx(Br,{onChange:(f,b)=>h(f,b),className:"book-selection-chapter",isClearable:!1,options:c,getOptionLabel:f=>f.toString(),value:i,isDisabled:n},"end chapter"),label:"to",labelPlacement:"start"})]})}var yt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(yt||{});function aa({id:e,isChecked:t,labelText:n="",labelPosition:r=yt.After,isIndeterminate:o=!1,isDefaultChecked:s,isDisabled:i=!1,hasError:l=!1,className:c,onChange:u}){const d=p.jsx(ve.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:s,disabled:i,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:u});let h;if(n){const f=r===yt.Before||r===yt.Above,b=p.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),y=r===yt.Before||r===yt.After,v=y?b:p.jsx("div",{children:b}),m=y?d:p.jsx("div",{children:d});h=p.jsxs(ve.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:i,error:l,children:[f&&v,m,!f&&v]})}else h=d;return h}function Il({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:i}){return p.jsxs("fieldset",{id:e,className:t,children:[n&&p.jsx("legend",{children:n}),r.map(l=>p.jsx(aa,{className:"check-item",isChecked:o.includes(l),labelText:i?i(l):l,onChange:()=>s(l)},l))]})}function ue(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,s;for(s=0;s<r.length;s++)o=r[s],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function N(){return N=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},N.apply(this,arguments)}function _l(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function $l(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Lr={exports:{}},_n={exports:{}},ie={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qo;function Al(){if(qo)return ie;qo=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,h=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,v=e?Symbol.for("react.block"):60121,m=e?Symbol.for("react.fundamental"):60117,E=e?Symbol.for("react.responder"):60118,_=e?Symbol.for("react.scope"):60119;function w(g){if(typeof g=="object"&&g!==null){var C=g.$$typeof;switch(C){case t:switch(g=g.type,g){case c:case u:case r:case s:case o:case h:return g;default:switch(g=g&&g.$$typeof,g){case l:case d:case y:case b:case i:return g;default:return C}}case n:return C}}}function x(g){return w(g)===u}return ie.AsyncMode=c,ie.ConcurrentMode=u,ie.ContextConsumer=l,ie.ContextProvider=i,ie.Element=t,ie.ForwardRef=d,ie.Fragment=r,ie.Lazy=y,ie.Memo=b,ie.Portal=n,ie.Profiler=s,ie.StrictMode=o,ie.Suspense=h,ie.isAsyncMode=function(g){return x(g)||w(g)===c},ie.isConcurrentMode=x,ie.isContextConsumer=function(g){return w(g)===l},ie.isContextProvider=function(g){return w(g)===i},ie.isElement=function(g){return typeof g=="object"&&g!==null&&g.$$typeof===t},ie.isForwardRef=function(g){return w(g)===d},ie.isFragment=function(g){return w(g)===r},ie.isLazy=function(g){return w(g)===y},ie.isMemo=function(g){return w(g)===b},ie.isPortal=function(g){return w(g)===n},ie.isProfiler=function(g){return w(g)===s},ie.isStrictMode=function(g){return w(g)===o},ie.isSuspense=function(g){return w(g)===h},ie.isValidElementType=function(g){return typeof g=="string"||typeof g=="function"||g===r||g===u||g===s||g===o||g===h||g===f||typeof g=="object"&&g!==null&&(g.$$typeof===y||g.$$typeof===b||g.$$typeof===i||g.$$typeof===l||g.$$typeof===d||g.$$typeof===m||g.$$typeof===E||g.$$typeof===_||g.$$typeof===v)},ie.typeOf=w,ie}var le={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wo;function Dl(){return Wo||(Wo=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,h=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,v=e?Symbol.for("react.block"):60121,m=e?Symbol.for("react.fundamental"):60117,E=e?Symbol.for("react.responder"):60118,_=e?Symbol.for("react.scope"):60119;function w(A){return typeof A=="string"||typeof A=="function"||A===r||A===u||A===s||A===o||A===h||A===f||typeof A=="object"&&A!==null&&(A.$$typeof===y||A.$$typeof===b||A.$$typeof===i||A.$$typeof===l||A.$$typeof===d||A.$$typeof===m||A.$$typeof===E||A.$$typeof===_||A.$$typeof===v)}function x(A){if(typeof A=="object"&&A!==null){var te=A.$$typeof;switch(te){case t:var R=A.type;switch(R){case c:case u:case r:case s:case o:case h:return R;default:var se=R&&R.$$typeof;switch(se){case l:case d:case y:case b:case i:return se;default:return te}}case n:return te}}}var g=c,C=u,P=l,F=i,B=t,z=d,O=r,I=y,j=b,V=n,U=s,M=o,H=h,Q=!1;function Z(A){return Q||(Q=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),S(A)||x(A)===c}function S(A){return x(A)===u}function $(A){return x(A)===l}function D(A){return x(A)===i}function X(A){return typeof A=="object"&&A!==null&&A.$$typeof===t}function W(A){return x(A)===d}function G(A){return x(A)===r}function Y(A){return x(A)===y}function L(A){return x(A)===b}function q(A){return x(A)===n}function J(A){return x(A)===s}function ee(A){return x(A)===o}function oe(A){return x(A)===h}le.AsyncMode=g,le.ConcurrentMode=C,le.ContextConsumer=P,le.ContextProvider=F,le.Element=B,le.ForwardRef=z,le.Fragment=O,le.Lazy=I,le.Memo=j,le.Portal=V,le.Profiler=U,le.StrictMode=M,le.Suspense=H,le.isAsyncMode=Z,le.isConcurrentMode=S,le.isContextConsumer=$,le.isContextProvider=D,le.isElement=X,le.isForwardRef=W,le.isFragment=G,le.isLazy=Y,le.isMemo=L,le.isPortal=q,le.isProfiler=J,le.isStrictMode=ee,le.isSuspense=oe,le.isValidElementType=w,le.typeOf=x}()),le}var Xo;function ia(){return Xo||(Xo=1,process.env.NODE_ENV==="production"?_n.exports=Al():_n.exports=Dl()),_n.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Tr,Yo;function Bl(){if(Yo)return Tr;Yo=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(s){if(s==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(s)}function o(){try{if(!Object.assign)return!1;var s=new String("abc");if(s[5]="de",Object.getOwnPropertyNames(s)[0]==="5")return!1;for(var i={},l=0;l<10;l++)i["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(i).map(function(d){return i[d]});if(c.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(d){u[d]=d}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Tr=o()?Object.assign:function(s,i){for(var l,c=r(s),u,d=1;d<arguments.length;d++){l=Object(arguments[d]);for(var h in l)t.call(l,h)&&(c[h]=l[h]);if(e){u=e(l);for(var f=0;f<u.length;f++)n.call(l,u[f])&&(c[u[f]]=l[u[f]])}}return c},Tr}var kr,Go;function so(){if(Go)return kr;Go=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return kr=e,kr}var Nr,Ko;function la(){return Ko||(Ko=1,Nr=Function.call.bind(Object.prototype.hasOwnProperty)),Nr}var Sr,Jo;function Ll(){if(Jo)return Sr;Jo=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=so(),n={},r=la();e=function(s){var i="Warning: "+s;typeof console<"u"&&console.error(i);try{throw new Error(i)}catch{}}}function o(s,i,l,c,u){if(process.env.NODE_ENV!=="production"){for(var d in s)if(r(s,d)){var h;try{if(typeof s[d]!="function"){var f=Error((c||"React class")+": "+l+" type `"+d+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof s[d]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw f.name="Invariant Violation",f}h=s[d](i,d,c,l,null,t)}catch(y){h=y}if(h&&!(h instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+d+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof h+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),h instanceof Error&&!(h.message in n)){n[h.message]=!0;var b=u?u():"";e("Failed "+l+" type: "+h.message+(b??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Sr=o,Sr}var Cr,Zo;function Vl(){if(Zo)return Cr;Zo=1;var e=ia(),t=Bl(),n=so(),r=la(),o=Ll(),s=function(){};process.env.NODE_ENV!=="production"&&(s=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function i(){return null}return Cr=function(l,c){var u=typeof Symbol=="function"&&Symbol.iterator,d="@@iterator";function h(S){var $=S&&(u&&S[u]||S[d]);if(typeof $=="function")return $}var f="<<anonymous>>",b={array:E("array"),bigint:E("bigint"),bool:E("boolean"),func:E("function"),number:E("number"),object:E("object"),string:E("string"),symbol:E("symbol"),any:_(),arrayOf:w,element:x(),elementType:g(),instanceOf:C,node:z(),objectOf:F,oneOf:P,oneOfType:B,shape:I,exact:j};function y(S,$){return S===$?S!==0||1/S===1/$:S!==S&&$!==$}function v(S,$){this.message=S,this.data=$&&typeof $=="object"?$:{},this.stack=""}v.prototype=Error.prototype;function m(S){if(process.env.NODE_ENV!=="production")var $={},D=0;function X(G,Y,L,q,J,ee,oe){if(q=q||f,ee=ee||L,oe!==n){if(c){var A=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw A.name="Invariant Violation",A}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var te=q+":"+L;!$[te]&&D<3&&(s("You are manually calling a React.PropTypes validation function for the `"+ee+"` prop on `"+q+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),$[te]=!0,D++)}}return Y[L]==null?G?Y[L]===null?new v("The "+J+" `"+ee+"` is marked as required "+("in `"+q+"`, but its value is `null`.")):new v("The "+J+" `"+ee+"` is marked as required in "+("`"+q+"`, but its value is `undefined`.")):null:S(Y,L,q,J,ee)}var W=X.bind(null,!1);return W.isRequired=X.bind(null,!0),W}function E(S){function $(D,X,W,G,Y,L){var q=D[X],J=M(q);if(J!==S){var ee=H(q);return new v("Invalid "+G+" `"+Y+"` of type "+("`"+ee+"` supplied to `"+W+"`, expected ")+("`"+S+"`."),{expectedType:S})}return null}return m($)}function _(){return m(i)}function w(S){function $(D,X,W,G,Y){if(typeof S!="function")return new v("Property `"+Y+"` of component `"+W+"` has invalid PropType notation inside arrayOf.");var L=D[X];if(!Array.isArray(L)){var q=M(L);return new v("Invalid "+G+" `"+Y+"` of type "+("`"+q+"` supplied to `"+W+"`, expected an array."))}for(var J=0;J<L.length;J++){var ee=S(L,J,W,G,Y+"["+J+"]",n);if(ee instanceof Error)return ee}return null}return m($)}function x(){function S($,D,X,W,G){var Y=$[D];if(!l(Y)){var L=M(Y);return new v("Invalid "+W+" `"+G+"` of type "+("`"+L+"` supplied to `"+X+"`, expected a single ReactElement."))}return null}return m(S)}function g(){function S($,D,X,W,G){var Y=$[D];if(!e.isValidElementType(Y)){var L=M(Y);return new v("Invalid "+W+" `"+G+"` of type "+("`"+L+"` supplied to `"+X+"`, expected a single ReactElement type."))}return null}return m(S)}function C(S){function $(D,X,W,G,Y){if(!(D[X]instanceof S)){var L=S.name||f,q=Z(D[X]);return new v("Invalid "+G+" `"+Y+"` of type "+("`"+q+"` supplied to `"+W+"`, expected ")+("instance of `"+L+"`."))}return null}return m($)}function P(S){if(!Array.isArray(S))return process.env.NODE_ENV!=="production"&&(arguments.length>1?s("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):s("Invalid argument supplied to oneOf, expected an array.")),i;function $(D,X,W,G,Y){for(var L=D[X],q=0;q<S.length;q++)if(y(L,S[q]))return null;var J=JSON.stringify(S,function(oe,A){var te=H(A);return te==="symbol"?String(A):A});return new v("Invalid "+G+" `"+Y+"` of value `"+String(L)+"` "+("supplied to `"+W+"`, expected one of "+J+"."))}return m($)}function F(S){function $(D,X,W,G,Y){if(typeof S!="function")return new v("Property `"+Y+"` of component `"+W+"` has invalid PropType notation inside objectOf.");var L=D[X],q=M(L);if(q!=="object")return new v("Invalid "+G+" `"+Y+"` of type "+("`"+q+"` supplied to `"+W+"`, expected an object."));for(var J in L)if(r(L,J)){var ee=S(L,J,W,G,Y+"."+J,n);if(ee instanceof Error)return ee}return null}return m($)}function B(S){if(!Array.isArray(S))return process.env.NODE_ENV!=="production"&&s("Invalid argument supplied to oneOfType, expected an instance of array."),i;for(var $=0;$<S.length;$++){var D=S[$];if(typeof D!="function")return s("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+Q(D)+" at index "+$+"."),i}function X(W,G,Y,L,q){for(var J=[],ee=0;ee<S.length;ee++){var oe=S[ee],A=oe(W,G,Y,L,q,n);if(A==null)return null;A.data&&r(A.data,"expectedType")&&J.push(A.data.expectedType)}var te=J.length>0?", expected one of type ["+J.join(", ")+"]":"";return new v("Invalid "+L+" `"+q+"` supplied to "+("`"+Y+"`"+te+"."))}return m(X)}function z(){function S($,D,X,W,G){return V($[D])?null:new v("Invalid "+W+" `"+G+"` supplied to "+("`"+X+"`, expected a ReactNode."))}return m(S)}function O(S,$,D,X,W){return new v((S||"React class")+": "+$+" type `"+D+"."+X+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+W+"`.")}function I(S){function $(D,X,W,G,Y){var L=D[X],q=M(L);if(q!=="object")return new v("Invalid "+G+" `"+Y+"` of type `"+q+"` "+("supplied to `"+W+"`, expected `object`."));for(var J in S){var ee=S[J];if(typeof ee!="function")return O(W,G,Y,J,H(ee));var oe=ee(L,J,W,G,Y+"."+J,n);if(oe)return oe}return null}return m($)}function j(S){function $(D,X,W,G,Y){var L=D[X],q=M(L);if(q!=="object")return new v("Invalid "+G+" `"+Y+"` of type `"+q+"` "+("supplied to `"+W+"`, expected `object`."));var J=t({},D[X],S);for(var ee in J){var oe=S[ee];if(r(S,ee)&&typeof oe!="function")return O(W,G,Y,ee,H(oe));if(!oe)return new v("Invalid "+G+" `"+Y+"` key `"+ee+"` supplied to `"+W+"`.\nBad object: "+JSON.stringify(D[X],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(S),null,"  "));var A=oe(L,ee,W,G,Y+"."+ee,n);if(A)return A}return null}return m($)}function V(S){switch(typeof S){case"number":case"string":case"undefined":return!0;case"boolean":return!S;case"object":if(Array.isArray(S))return S.every(V);if(S===null||l(S))return!0;var $=h(S);if($){var D=$.call(S),X;if($!==S.entries){for(;!(X=D.next()).done;)if(!V(X.value))return!1}else for(;!(X=D.next()).done;){var W=X.value;if(W&&!V(W[1]))return!1}}else return!1;return!0;default:return!1}}function U(S,$){return S==="symbol"?!0:$?$["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&$ instanceof Symbol:!1}function M(S){var $=typeof S;return Array.isArray(S)?"array":S instanceof RegExp?"object":U($,S)?"symbol":$}function H(S){if(typeof S>"u"||S===null)return""+S;var $=M(S);if($==="object"){if(S instanceof Date)return"date";if(S instanceof RegExp)return"regexp"}return $}function Q(S){var $=H(S);switch($){case"array":case"object":return"an "+$;case"boolean":case"date":case"regexp":return"a "+$;default:return $}}function Z(S){return!S.constructor||!S.constructor.name?f:S.constructor.name}return b.checkPropTypes=o,b.resetWarningCache=o.resetWarningCache,b.PropTypes=b,b},Cr}var Or,Qo;function Fl(){if(Qo)return Or;Qo=1;var e=so();function t(){}function n(){}return n.resetWarningCache=t,Or=function(){function r(i,l,c,u,d,h){if(h!==e){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}}r.isRequired=r;function o(){return r}var s={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return s.PropTypes=s,s},Or}if(process.env.NODE_ENV!=="production"){var zl=ia(),Ul=!0;Lr.exports=Vl()(zl.isElement,Ul)}else Lr.exports=Fl()();var Hl=Lr.exports;const a=_l(Hl);function qt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function wt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function ca(e){if(!wt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=ca(e[n])}),t}function tt(e,t,n={clone:!0}){const r=n.clone?N({},e):e;return wt(e)&&wt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(wt(t[o])&&o in e&&wt(e[o])?r[o]=tt(e[o],t[o],n):n.clone?r[o]=wt(t[o])?ca(t[o]):t[o]:r[o]=t[o])}),r}function ql(e){const{prototype:t={}}=e;return!!t.isReactComponent}function pa(e,t,n,r,o){const s=e[t],i=o||t;if(s==null||typeof window>"u")return null;let l;const c=s.type;return typeof c=="function"&&!ql(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const ua=qt(a.element,pa);ua.isRequired=qt(a.element.isRequired,pa);const kn=ua;function Wl(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Xl(e,t,n,r,o){const s=e[t],i=o||t;if(s==null||typeof window>"u")return null;let l;return typeof s=="function"&&!Wl(s)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Yl=qt(a.elementType,Xl),Gl="exact-prop: ​";function da(e){return process.env.NODE_ENV==="production"?e:N({},e,{[Gl]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Bt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Vr={exports:{}},ce={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var es;function Kl(){if(es)return ce;es=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),h=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),y;y=Symbol.for("react.module.reference");function v(m){if(typeof m=="object"&&m!==null){var E=m.$$typeof;switch(E){case e:switch(m=m.type,m){case n:case o:case r:case u:case d:return m;default:switch(m=m&&m.$$typeof,m){case l:case i:case c:case f:case h:case s:return m;default:return E}}case t:return E}}}return ce.ContextConsumer=i,ce.ContextProvider=s,ce.Element=e,ce.ForwardRef=c,ce.Fragment=n,ce.Lazy=f,ce.Memo=h,ce.Portal=t,ce.Profiler=o,ce.StrictMode=r,ce.Suspense=u,ce.SuspenseList=d,ce.isAsyncMode=function(){return!1},ce.isConcurrentMode=function(){return!1},ce.isContextConsumer=function(m){return v(m)===i},ce.isContextProvider=function(m){return v(m)===s},ce.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===e},ce.isForwardRef=function(m){return v(m)===c},ce.isFragment=function(m){return v(m)===n},ce.isLazy=function(m){return v(m)===f},ce.isMemo=function(m){return v(m)===h},ce.isPortal=function(m){return v(m)===t},ce.isProfiler=function(m){return v(m)===o},ce.isStrictMode=function(m){return v(m)===r},ce.isSuspense=function(m){return v(m)===u},ce.isSuspenseList=function(m){return v(m)===d},ce.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===n||m===o||m===r||m===u||m===d||m===b||typeof m=="object"&&m!==null&&(m.$$typeof===f||m.$$typeof===h||m.$$typeof===s||m.$$typeof===i||m.$$typeof===c||m.$$typeof===y||m.getModuleId!==void 0)},ce.typeOf=v,ce}var pe={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ts;function Jl(){return ts||(ts=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),h=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),y=!1,v=!1,m=!1,E=!1,_=!1,w;w=Symbol.for("react.module.reference");function x(R){return!!(typeof R=="string"||typeof R=="function"||R===n||R===o||_||R===r||R===u||R===d||E||R===b||y||v||m||typeof R=="object"&&R!==null&&(R.$$typeof===f||R.$$typeof===h||R.$$typeof===s||R.$$typeof===i||R.$$typeof===c||R.$$typeof===w||R.getModuleId!==void 0))}function g(R){if(typeof R=="object"&&R!==null){var se=R.$$typeof;switch(se){case e:var Ee=R.type;switch(Ee){case n:case o:case r:case u:case d:return Ee;default:var Oe=Ee&&Ee.$$typeof;switch(Oe){case l:case i:case c:case f:case h:case s:return Oe;default:return se}}case t:return se}}}var C=i,P=s,F=e,B=c,z=n,O=f,I=h,j=t,V=o,U=r,M=u,H=d,Q=!1,Z=!1;function S(R){return Q||(Q=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function $(R){return Z||(Z=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function D(R){return g(R)===i}function X(R){return g(R)===s}function W(R){return typeof R=="object"&&R!==null&&R.$$typeof===e}function G(R){return g(R)===c}function Y(R){return g(R)===n}function L(R){return g(R)===f}function q(R){return g(R)===h}function J(R){return g(R)===t}function ee(R){return g(R)===o}function oe(R){return g(R)===r}function A(R){return g(R)===u}function te(R){return g(R)===d}pe.ContextConsumer=C,pe.ContextProvider=P,pe.Element=F,pe.ForwardRef=B,pe.Fragment=z,pe.Lazy=O,pe.Memo=I,pe.Portal=j,pe.Profiler=V,pe.StrictMode=U,pe.Suspense=M,pe.SuspenseList=H,pe.isAsyncMode=S,pe.isConcurrentMode=$,pe.isContextConsumer=D,pe.isContextProvider=X,pe.isElement=W,pe.isForwardRef=G,pe.isFragment=Y,pe.isLazy=L,pe.isMemo=q,pe.isPortal=J,pe.isProfiler=ee,pe.isStrictMode=oe,pe.isSuspense=A,pe.isSuspenseList=te,pe.isValidElementType=x,pe.typeOf=g}()),pe}process.env.NODE_ENV==="production"?Vr.exports=Kl():Vr.exports=Jl();var Wn=Vr.exports;const Zl=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Ql(e){const t=`${e}`.match(Zl);return t&&t[1]||""}function fa(e,t=""){return e.displayName||e.name||Ql(e)||t}function ns(e,t,n){const r=fa(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function ec(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return fa(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Wn.ForwardRef:return ns(e,e.render,"ForwardRef");case Wn.Memo:return ns(e,e.type,"memo");default:return}}}function nt(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=e[t],i=o||t;return s==null?null:s&&s.nodeType!==1?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const tc=a.oneOfType([a.func,a.object]),ao=tc;function Ge(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Bt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Fr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function ha(e,t=166){let n;function r(...o){const s=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(s,t)}return r.clear=()=>{clearTimeout(n)},r}function nc(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,s,i)=>{const l=o||"<<anonymous>>",c=i||r;return typeof n[r]<"u"?new Error(`The ${s} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function rc(e,t){var n,r;return k.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Se(e){return e&&e.ownerDocument||document}function Lt(e){return Se(e).defaultView||window}function oc(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?N({},t.propTypes):null;return o=>(s,i,l,c,u,...d)=>{const h=u||i,f=n==null?void 0:n[h];if(f){const b=f(s,i,l,c,u,...d);if(b)return b}return typeof s[i]<"u"&&!s[o]?new Error(`The prop \`${h}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Xn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const sc=typeof window<"u"?k.useLayoutEffect:k.useEffect,kt=sc;let rs=0;function ac(e){const[t,n]=k.useState(e),r=e||t;return k.useEffect(()=>{t==null&&(rs+=1,n(`mui-${rs}`))},[t]),r}const os=k["useId".toString()];function ma(e){if(os!==void 0){const t=os();return e??t}return ac(e)}function ic(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=o||t;return typeof e[t]<"u"?new Error(`The prop \`${s}\` is not supported. Please remove it.`):null}function ga({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=k.useRef(e!==void 0),[s,i]=k.useState(t),l=o?e:s;if(process.env.NODE_ENV!=="production"){k.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:u}=k.useRef(t);k.useEffect(()=>{!o&&u!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=k.useCallback(u=>{o||i(u)},[]);return[l,c]}function bn(e){const t=k.useRef(e);return kt(()=>{t.current=e}),k.useRef((...n)=>(0,t.current)(...n)).current}function ze(...e){return k.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Xn(n,t)})},e)}const ss={};function lc(e,t){const n=k.useRef(ss);return n.current===ss&&(n.current=e(t)),n}const cc=[];function pc(e){k.useEffect(e,cc)}class Nn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Nn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function sn(){const e=lc(Nn.create).current;return pc(e.disposeEffect),e}let ar=!0,zr=!1;const uc=new Nn,dc={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function fc(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&dc[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function hc(e){e.metaKey||e.altKey||e.ctrlKey||(ar=!0)}function Pr(){ar=!1}function mc(){this.visibilityState==="hidden"&&zr&&(ar=!0)}function gc(e){e.addEventListener("keydown",hc,!0),e.addEventListener("mousedown",Pr,!0),e.addEventListener("pointerdown",Pr,!0),e.addEventListener("touchstart",Pr,!0),e.addEventListener("visibilitychange",mc,!0)}function bc(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return ar||fc(t)}function ba(){const e=k.useCallback(o=>{o!=null&&gc(o.ownerDocument)},[]),t=k.useRef(!1);function n(){return t.current?(zr=!0,uc.start(100,()=>{zr=!1}),t.current=!1,!0):!1}function r(o){return bc(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function va(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function vc(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function yc(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const wc=Number.isInteger||yc;function ya(e,t,n,r){const o=e[t];if(o==null||!wc(o)){const s=vc(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${s}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function wa(e,t,...n){return e[t]===void 0?null:ya(e,t,...n)}function Ur(){return null}wa.isRequired=ya;Ur.isRequired=Ur;const xa=process.env.NODE_ENV==="production"?Ur:wa;function Ea(e,t){const n=N({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=N({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},s=t[r];n[r]={},!s||!Object.keys(s)?n[r]=o:!o||!Object.keys(o)?n[r]=s:(n[r]=N({},s),Object.keys(o).forEach(i=>{n[r][i]=Ea(o[i],s[i])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function st(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((s,i)=>{if(i){const l=t(i);l!==""&&s.push(l),n&&n[i]&&s.push(n[i])}return s},[]).join(" ")}),r}const as=e=>e,xc=()=>{let e=as;return{configure(t){e=t},generate(t){return e(t)},reset(){e=as}}},Ec=xc(),Ta=Ec,ka={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Je(e,t,n="Mui"){const r=ka[t];return r?`${n}-${r}`:`${Ta.generate(e)}-${t}`}function pt(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=Je(e,o,n)}),r}function Tc(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Na(e){return typeof e=="string"}function an(e,t,n){return e===void 0||Na(e)?t:N({},t,{ownerState:N({},t.ownerState,n)})}const kc={disableDefaultClasses:!1},Nc=k.createContext(kc);function Sc(e){const{disableDefaultClasses:t}=k.useContext(Nc);return n=>t?"":e(n)}function Sa(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function Cc(e,t,n){return typeof e=="function"?e(t,n):e}function is(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function Oc(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:s}=e;if(!t){const b=Ne(n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),y=N({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),v=N({},n,o,r);return b.length>0&&(v.className=b),Object.keys(y).length>0&&(v.style=y),{props:v,internalRef:void 0}}const i=Sa(N({},o,r)),l=is(r),c=is(o),u=t(i),d=Ne(u==null?void 0:u.className,n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),h=N({},u==null?void 0:u.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=N({},u,n,c,l);return d.length>0&&(f.className=d),Object.keys(h).length>0&&(f.style=h),{props:f,internalRef:u.ref}}const Pc=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Nt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:s=!1}=e,i=ue(e,Pc),l=s?{}:Cc(r,o),{props:c,internalRef:u}=Oc(N({},i,{externalSlotProps:l})),d=ze(u,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return an(n,N({},c,{ref:d}),o)}const Ca="base";function Rc(e){return`${Ca}--${e}`}function jc(e,t){return`${Ca}-${e}-${t}`}function Oa(e,t){const n=ka[t];return n?Rc(n):jc(e,t)}function Mc(e,t){const n={};return t.forEach(r=>{n[r]=Oa(e,r)}),n}const Ic=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function _c(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function $c(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Ac(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||$c(e))}function Dc(e){const t=[],n=[];return Array.from(e.querySelectorAll(Ic)).forEach((r,o)=>{const s=_c(r);s===-1||!Ac(r)||(s===0?t.push(r):n.push({documentOrder:o,tabIndex:s,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function Bc(){return!0}function Yn(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:s=Dc,isEnabled:i=Bc,open:l}=e,c=k.useRef(!1),u=k.useRef(null),d=k.useRef(null),h=k.useRef(null),f=k.useRef(null),b=k.useRef(!1),y=k.useRef(null),v=ze(t.ref,y),m=k.useRef(null);k.useEffect(()=>{!l||!y.current||(b.current=!n)},[n,l]),k.useEffect(()=>{if(!l||!y.current)return;const w=Se(y.current);return y.current.contains(w.activeElement)||(y.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),y.current.setAttribute("tabIndex","-1")),b.current&&y.current.focus()),()=>{o||(h.current&&h.current.focus&&(c.current=!0,h.current.focus()),h.current=null)}},[l]),k.useEffect(()=>{if(!l||!y.current)return;const w=Se(y.current),x=P=>{m.current=P,!(r||!i()||P.key!=="Tab")&&w.activeElement===y.current&&P.shiftKey&&(c.current=!0,d.current&&d.current.focus())},g=()=>{const P=y.current;if(P===null)return;if(!w.hasFocus()||!i()||c.current){c.current=!1;return}if(P.contains(w.activeElement)||r&&w.activeElement!==u.current&&w.activeElement!==d.current)return;if(w.activeElement!==f.current)f.current=null;else if(f.current!==null)return;if(!b.current)return;let F=[];if((w.activeElement===u.current||w.activeElement===d.current)&&(F=s(y.current)),F.length>0){var B,z;const O=!!((B=m.current)!=null&&B.shiftKey&&((z=m.current)==null?void 0:z.key)==="Tab"),I=F[0],j=F[F.length-1];typeof I!="string"&&typeof j!="string"&&(O?j.focus():I.focus())}else P.focus()};w.addEventListener("focusin",g),w.addEventListener("keydown",x,!0);const C=setInterval(()=>{w.activeElement&&w.activeElement.tagName==="BODY"&&g()},50);return()=>{clearInterval(C),w.removeEventListener("focusin",g),w.removeEventListener("keydown",x,!0)}},[n,r,o,i,l,s]);const E=w=>{h.current===null&&(h.current=w.relatedTarget),b.current=!0,f.current=w.target;const x=t.props.onFocus;x&&x(w)},_=w=>{h.current===null&&(h.current=w.relatedTarget),b.current=!0};return p.jsxs(k.Fragment,{children:[p.jsx("div",{tabIndex:l?0:-1,onFocus:_,ref:u,"data-testid":"sentinelStart"}),k.cloneElement(t,{ref:v,onFocus:E}),p.jsx("div",{tabIndex:l?0:-1,onFocus:_,ref:d,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(Yn.propTypes={children:kn,disableAutoFocus:a.bool,disableEnforceFocus:a.bool,disableRestoreFocus:a.bool,getTabbable:a.func,isEnabled:a.func,open:a.bool.isRequired});process.env.NODE_ENV!=="production"&&(Yn["propTypes"]=da(Yn.propTypes));function Lc(e){return typeof e=="function"?e():e}const vn=k.forwardRef(function(t,n){const{children:r,container:o,disablePortal:s=!1}=t,[i,l]=k.useState(null),c=ze(k.isValidElement(r)?r.ref:null,n);if(kt(()=>{s||l(Lc(o)||document.body)},[o,s]),kt(()=>{if(i&&!s)return Xn(n,i),()=>{Xn(n,null)}},[n,i,s]),s){if(k.isValidElement(r)){const u={ref:c};return k.cloneElement(r,u)}return p.jsx(k.Fragment,{children:r})}return p.jsx(k.Fragment,{children:i&&Qi.createPortal(r,i)})});process.env.NODE_ENV!=="production"&&(vn.propTypes={children:a.node,container:a.oneOfType([nt,a.func]),disablePortal:a.bool});process.env.NODE_ENV!=="production"&&(vn["propTypes"]=da(vn.propTypes));function Vc(e){const t=Se(e);return t.body===e?Lt(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function pn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function ls(e){return parseInt(Lt(e).getComputedStyle(e).paddingRight,10)||0}function Fc(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function cs(e,t,n,r,o){const s=[t,n,...r];[].forEach.call(e.children,i=>{const l=s.indexOf(i)===-1,c=!Fc(i);l&&c&&pn(i,o)})}function Rr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function zc(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(Vc(r)){const i=va(Se(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${ls(r)+i}px`;const l=Se(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${ls(c)+i}px`})}let s;if(r.parentNode instanceof DocumentFragment)s=Se(r).body;else{const i=r.parentElement,l=Lt(r);s=(i==null?void 0:i.nodeName)==="HTML"&&l.getComputedStyle(i).overflowY==="scroll"?i:r}n.push({value:s.style.overflow,property:"overflow",el:s},{value:s.style.overflowX,property:"overflow-x",el:s},{value:s.style.overflowY,property:"overflow-y",el:s}),s.style.overflow="hidden"}return()=>{n.forEach(({value:s,el:i,property:l})=>{s?i.style.setProperty(l,s):i.style.removeProperty(l)})}}function Uc(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class Hc{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&pn(t.modalRef,!1);const o=Uc(n);cs(n,t.mount,t.modalRef,o,!0);const s=Rr(this.containers,i=>i.container===n);return s!==-1?(this.containers[s].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=Rr(this.containers,s=>s.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=zc(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=Rr(this.containers,i=>i.modals.indexOf(t)!==-1),s=this.containers[o];if(s.modals.splice(s.modals.indexOf(t),1),this.modals.splice(r,1),s.modals.length===0)s.restore&&s.restore(),t.modalRef&&pn(t.modalRef,n),cs(s.container,t.mount,t.modalRef,s.hiddenSiblings,!1),this.containers.splice(o,1);else{const i=s.modals[s.modals.length-1];i.modalRef&&pn(i.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function qc(e){return typeof e=="function"?e():e}function Wc(e){return e?e.props.hasOwnProperty("in"):!1}const Xc=new Hc;function Yc(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Xc,closeAfterTransition:s=!1,onTransitionEnter:i,onTransitionExited:l,children:c,onClose:u,open:d,rootRef:h}=e,f=k.useRef({}),b=k.useRef(null),y=k.useRef(null),v=ze(y,h),[m,E]=k.useState(!d),_=Wc(c);let w=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(w=!1);const x=()=>Se(b.current),g=()=>(f.current.modalRef=y.current,f.current.mount=b.current,f.current),C=()=>{o.mount(g(),{disableScrollLock:r}),y.current&&(y.current.scrollTop=0)},P=bn(()=>{const M=qc(t)||x().body;o.add(g(),M),y.current&&C()}),F=k.useCallback(()=>o.isTopModal(g()),[o]),B=bn(M=>{b.current=M,M&&(d&&F()?C():y.current&&pn(y.current,w))}),z=k.useCallback(()=>{o.remove(g(),w)},[w,o]);k.useEffect(()=>()=>{z()},[z]),k.useEffect(()=>{d?P():(!_||!s)&&z()},[d,z,_,s,P]);const O=M=>H=>{var Q;(Q=M.onKeyDown)==null||Q.call(M,H),!(H.key!=="Escape"||H.which===229||!F())&&(n||(H.stopPropagation(),u&&u(H,"escapeKeyDown")))},I=M=>H=>{var Q;(Q=M.onClick)==null||Q.call(M,H),H.target===H.currentTarget&&u&&u(H,"backdropClick")};return{getRootProps:(M={})=>{const H=Sa(e);delete H.onTransitionEnter,delete H.onTransitionExited;const Q=N({},H,M);return N({role:"presentation"},Q,{onKeyDown:O(Q),ref:v})},getBackdropProps:(M={})=>{const H=M;return N({"aria-hidden":!0},H,{onClick:I(H),open:d})},getTransitionProps:()=>{const M=()=>{E(!1),i&&i()},H=()=>{E(!0),l&&l(),s&&z()};return{onEnter:Fr(M,c==null?void 0:c.props.onEnter),onExited:Fr(H,c==null?void 0:c.props.onExited)}},rootRef:v,portalRef:B,isTopModal:F,exited:m,hasTransition:_}}var je="top",Ue="bottom",He="right",Me="left",io="auto",Sn=[je,Ue,He,Me],Vt="start",yn="end",Gc="clippingParents",Pa="viewport",Qt="popper",Kc="reference",ps=Sn.reduce(function(e,t){return e.concat([t+"-"+Vt,t+"-"+yn])},[]),Ra=[].concat(Sn,[io]).reduce(function(e,t){return e.concat([t,t+"-"+Vt,t+"-"+yn])},[]),Jc="beforeRead",Zc="read",Qc="afterRead",ep="beforeMain",tp="main",np="afterMain",rp="beforeWrite",op="write",sp="afterWrite",ap=[Jc,Zc,Qc,ep,tp,np,rp,op,sp];function Ke(e){return e?(e.nodeName||"").toLowerCase():null}function Be(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function St(e){var t=Be(e).Element;return e instanceof t||e instanceof Element}function Fe(e){var t=Be(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function lo(e){if(typeof ShadowRoot>"u")return!1;var t=Be(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function ip(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},s=t.elements[n];!Fe(s)||!Ke(s)||(Object.assign(s.style,r),Object.keys(o).forEach(function(i){var l=o[i];l===!1?s.removeAttribute(i):s.setAttribute(i,l===!0?"":l)}))})}function lp(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],s=t.attributes[r]||{},i=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=i.reduce(function(c,u){return c[u]="",c},{});!Fe(o)||!Ke(o)||(Object.assign(o.style,l),Object.keys(s).forEach(function(c){o.removeAttribute(c)}))})}}const cp={name:"applyStyles",enabled:!0,phase:"write",fn:ip,effect:lp,requires:["computeStyles"]};function Ye(e){return e.split("-")[0]}var Et=Math.max,Gn=Math.min,Ft=Math.round;function Hr(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function ja(){return!/^((?!chrome|android).)*safari/i.test(Hr())}function zt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,s=1;t&&Fe(e)&&(o=e.offsetWidth>0&&Ft(r.width)/e.offsetWidth||1,s=e.offsetHeight>0&&Ft(r.height)/e.offsetHeight||1);var i=St(e)?Be(e):window,l=i.visualViewport,c=!ja()&&n,u=(r.left+(c&&l?l.offsetLeft:0))/o,d=(r.top+(c&&l?l.offsetTop:0))/s,h=r.width/o,f=r.height/s;return{width:h,height:f,top:d,right:u+h,bottom:d+f,left:u,x:u,y:d}}function co(e){var t=zt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Ma(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&lo(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function rt(e){return Be(e).getComputedStyle(e)}function pp(e){return["table","td","th"].indexOf(Ke(e))>=0}function ut(e){return((St(e)?e.ownerDocument:e.document)||window.document).documentElement}function ir(e){return Ke(e)==="html"?e:e.assignedSlot||e.parentNode||(lo(e)?e.host:null)||ut(e)}function us(e){return!Fe(e)||rt(e).position==="fixed"?null:e.offsetParent}function up(e){var t=/firefox/i.test(Hr()),n=/Trident/i.test(Hr());if(n&&Fe(e)){var r=rt(e);if(r.position==="fixed")return null}var o=ir(e);for(lo(o)&&(o=o.host);Fe(o)&&["html","body"].indexOf(Ke(o))<0;){var s=rt(o);if(s.transform!=="none"||s.perspective!=="none"||s.contain==="paint"||["transform","perspective"].indexOf(s.willChange)!==-1||t&&s.willChange==="filter"||t&&s.filter&&s.filter!=="none")return o;o=o.parentNode}return null}function Cn(e){for(var t=Be(e),n=us(e);n&&pp(n)&&rt(n).position==="static";)n=us(n);return n&&(Ke(n)==="html"||Ke(n)==="body"&&rt(n).position==="static")?t:n||up(e)||t}function po(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function un(e,t,n){return Et(e,Gn(t,n))}function dp(e,t,n){var r=un(e,t,n);return r>n?n:r}function Ia(){return{top:0,right:0,bottom:0,left:0}}function _a(e){return Object.assign({},Ia(),e)}function $a(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var fp=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,_a(typeof t!="number"?t:$a(t,Sn))};function hp(e){var t,n=e.state,r=e.name,o=e.options,s=n.elements.arrow,i=n.modifiersData.popperOffsets,l=Ye(n.placement),c=po(l),u=[Me,He].indexOf(l)>=0,d=u?"height":"width";if(!(!s||!i)){var h=fp(o.padding,n),f=co(s),b=c==="y"?je:Me,y=c==="y"?Ue:He,v=n.rects.reference[d]+n.rects.reference[c]-i[c]-n.rects.popper[d],m=i[c]-n.rects.reference[c],E=Cn(s),_=E?c==="y"?E.clientHeight||0:E.clientWidth||0:0,w=v/2-m/2,x=h[b],g=_-f[d]-h[y],C=_/2-f[d]/2+w,P=un(x,C,g),F=c;n.modifiersData[r]=(t={},t[F]=P,t.centerOffset=P-C,t)}}function mp(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Ma(t.elements.popper,o)&&(t.elements.arrow=o))}const gp={name:"arrow",enabled:!0,phase:"main",fn:hp,effect:mp,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Ut(e){return e.split("-")[1]}var bp={top:"auto",right:"auto",bottom:"auto",left:"auto"};function vp(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Ft(n*o)/o||0,y:Ft(r*o)/o||0}}function ds(e){var t,n=e.popper,r=e.popperRect,o=e.placement,s=e.variation,i=e.offsets,l=e.position,c=e.gpuAcceleration,u=e.adaptive,d=e.roundOffsets,h=e.isFixed,f=i.x,b=f===void 0?0:f,y=i.y,v=y===void 0?0:y,m=typeof d=="function"?d({x:b,y:v}):{x:b,y:v};b=m.x,v=m.y;var E=i.hasOwnProperty("x"),_=i.hasOwnProperty("y"),w=Me,x=je,g=window;if(u){var C=Cn(n),P="clientHeight",F="clientWidth";if(C===Be(n)&&(C=ut(n),rt(C).position!=="static"&&l==="absolute"&&(P="scrollHeight",F="scrollWidth")),C=C,o===je||(o===Me||o===He)&&s===yn){x=Ue;var B=h&&C===g&&g.visualViewport?g.visualViewport.height:C[P];v-=B-r.height,v*=c?1:-1}if(o===Me||(o===je||o===Ue)&&s===yn){w=He;var z=h&&C===g&&g.visualViewport?g.visualViewport.width:C[F];b-=z-r.width,b*=c?1:-1}}var O=Object.assign({position:l},u&&bp),I=d===!0?vp({x:b,y:v},Be(n)):{x:b,y:v};if(b=I.x,v=I.y,c){var j;return Object.assign({},O,(j={},j[x]=_?"0":"",j[w]=E?"0":"",j.transform=(g.devicePixelRatio||1)<=1?"translate("+b+"px, "+v+"px)":"translate3d("+b+"px, "+v+"px, 0)",j))}return Object.assign({},O,(t={},t[x]=_?v+"px":"",t[w]=E?b+"px":"",t.transform="",t))}function yp(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,s=n.adaptive,i=s===void 0?!0:s,l=n.roundOffsets,c=l===void 0?!0:l,u={placement:Ye(t.placement),variation:Ut(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,ds(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,ds(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const wp={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:yp,data:{}};var $n={passive:!0};function xp(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,s=o===void 0?!0:o,i=r.resize,l=i===void 0?!0:i,c=Be(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return s&&u.forEach(function(d){d.addEventListener("scroll",n.update,$n)}),l&&c.addEventListener("resize",n.update,$n),function(){s&&u.forEach(function(d){d.removeEventListener("scroll",n.update,$n)}),l&&c.removeEventListener("resize",n.update,$n)}}const Ep={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:xp,data:{}};var Tp={left:"right",right:"left",bottom:"top",top:"bottom"};function Vn(e){return e.replace(/left|right|bottom|top/g,function(t){return Tp[t]})}var kp={start:"end",end:"start"};function fs(e){return e.replace(/start|end/g,function(t){return kp[t]})}function uo(e){var t=Be(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function fo(e){return zt(ut(e)).left+uo(e).scrollLeft}function Np(e,t){var n=Be(e),r=ut(e),o=n.visualViewport,s=r.clientWidth,i=r.clientHeight,l=0,c=0;if(o){s=o.width,i=o.height;var u=ja();(u||!u&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:s,height:i,x:l+fo(e),y:c}}function Sp(e){var t,n=ut(e),r=uo(e),o=(t=e.ownerDocument)==null?void 0:t.body,s=Et(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),i=Et(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+fo(e),c=-r.scrollTop;return rt(o||n).direction==="rtl"&&(l+=Et(n.clientWidth,o?o.clientWidth:0)-s),{width:s,height:i,x:l,y:c}}function ho(e){var t=rt(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Aa(e){return["html","body","#document"].indexOf(Ke(e))>=0?e.ownerDocument.body:Fe(e)&&ho(e)?e:Aa(ir(e))}function dn(e,t){var n;t===void 0&&(t=[]);var r=Aa(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),s=Be(r),i=o?[s].concat(s.visualViewport||[],ho(r)?r:[]):r,l=t.concat(i);return o?l:l.concat(dn(ir(i)))}function qr(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Cp(e,t){var n=zt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function hs(e,t,n){return t===Pa?qr(Np(e,n)):St(t)?Cp(t,n):qr(Sp(ut(e)))}function Op(e){var t=dn(ir(e)),n=["absolute","fixed"].indexOf(rt(e).position)>=0,r=n&&Fe(e)?Cn(e):e;return St(r)?t.filter(function(o){return St(o)&&Ma(o,r)&&Ke(o)!=="body"}):[]}function Pp(e,t,n,r){var o=t==="clippingParents"?Op(e):[].concat(t),s=[].concat(o,[n]),i=s[0],l=s.reduce(function(c,u){var d=hs(e,u,r);return c.top=Et(d.top,c.top),c.right=Gn(d.right,c.right),c.bottom=Gn(d.bottom,c.bottom),c.left=Et(d.left,c.left),c},hs(e,i,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function Da(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ye(r):null,s=r?Ut(r):null,i=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case je:c={x:i,y:t.y-n.height};break;case Ue:c={x:i,y:t.y+t.height};break;case He:c={x:t.x+t.width,y:l};break;case Me:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var u=o?po(o):null;if(u!=null){var d=u==="y"?"height":"width";switch(s){case Vt:c[u]=c[u]-(t[d]/2-n[d]/2);break;case yn:c[u]=c[u]+(t[d]/2-n[d]/2);break}}return c}function wn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,s=n.strategy,i=s===void 0?e.strategy:s,l=n.boundary,c=l===void 0?Gc:l,u=n.rootBoundary,d=u===void 0?Pa:u,h=n.elementContext,f=h===void 0?Qt:h,b=n.altBoundary,y=b===void 0?!1:b,v=n.padding,m=v===void 0?0:v,E=_a(typeof m!="number"?m:$a(m,Sn)),_=f===Qt?Kc:Qt,w=e.rects.popper,x=e.elements[y?_:f],g=Pp(St(x)?x:x.contextElement||ut(e.elements.popper),c,d,i),C=zt(e.elements.reference),P=Da({reference:C,element:w,strategy:"absolute",placement:o}),F=qr(Object.assign({},w,P)),B=f===Qt?F:C,z={top:g.top-B.top+E.top,bottom:B.bottom-g.bottom+E.bottom,left:g.left-B.left+E.left,right:B.right-g.right+E.right},O=e.modifiersData.offset;if(f===Qt&&O){var I=O[o];Object.keys(z).forEach(function(j){var V=[He,Ue].indexOf(j)>=0?1:-1,U=[je,Ue].indexOf(j)>=0?"y":"x";z[j]+=I[U]*V})}return z}function Rp(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,s=n.rootBoundary,i=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,u=c===void 0?Ra:c,d=Ut(r),h=d?l?ps:ps.filter(function(y){return Ut(y)===d}):Sn,f=h.filter(function(y){return u.indexOf(y)>=0});f.length===0&&(f=h);var b=f.reduce(function(y,v){return y[v]=wn(e,{placement:v,boundary:o,rootBoundary:s,padding:i})[Ye(v)],y},{});return Object.keys(b).sort(function(y,v){return b[y]-b[v]})}function jp(e){if(Ye(e)===io)return[];var t=Vn(e);return[fs(e),t,fs(t)]}function Mp(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,s=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!0:i,c=n.fallbackPlacements,u=n.padding,d=n.boundary,h=n.rootBoundary,f=n.altBoundary,b=n.flipVariations,y=b===void 0?!0:b,v=n.allowedAutoPlacements,m=t.options.placement,E=Ye(m),_=E===m,w=c||(_||!y?[Vn(m)]:jp(m)),x=[m].concat(w).reduce(function(W,G){return W.concat(Ye(G)===io?Rp(t,{placement:G,boundary:d,rootBoundary:h,padding:u,flipVariations:y,allowedAutoPlacements:v}):G)},[]),g=t.rects.reference,C=t.rects.popper,P=new Map,F=!0,B=x[0],z=0;z<x.length;z++){var O=x[z],I=Ye(O),j=Ut(O)===Vt,V=[je,Ue].indexOf(I)>=0,U=V?"width":"height",M=wn(t,{placement:O,boundary:d,rootBoundary:h,altBoundary:f,padding:u}),H=V?j?He:Me:j?Ue:je;g[U]>C[U]&&(H=Vn(H));var Q=Vn(H),Z=[];if(s&&Z.push(M[I]<=0),l&&Z.push(M[H]<=0,M[Q]<=0),Z.every(function(W){return W})){B=O,F=!1;break}P.set(O,Z)}if(F)for(var S=y?3:1,$=function(G){var Y=x.find(function(L){var q=P.get(L);if(q)return q.slice(0,G).every(function(J){return J})});if(Y)return B=Y,"break"},D=S;D>0;D--){var X=$(D);if(X==="break")break}t.placement!==B&&(t.modifiersData[r]._skip=!0,t.placement=B,t.reset=!0)}}const Ip={name:"flip",enabled:!0,phase:"main",fn:Mp,requiresIfExists:["offset"],data:{_skip:!1}};function ms(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function gs(e){return[je,He,Ue,Me].some(function(t){return e[t]>=0})}function _p(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,s=t.modifiersData.preventOverflow,i=wn(t,{elementContext:"reference"}),l=wn(t,{altBoundary:!0}),c=ms(i,r),u=ms(l,o,s),d=gs(c),h=gs(u);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:u,isReferenceHidden:d,hasPopperEscaped:h},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":d,"data-popper-escaped":h})}const $p={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:_p};function Ap(e,t,n){var r=Ye(e),o=[Me,je].indexOf(r)>=0?-1:1,s=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,i=s[0],l=s[1];return i=i||0,l=(l||0)*o,[Me,He].indexOf(r)>=0?{x:l,y:i}:{x:i,y:l}}function Dp(e){var t=e.state,n=e.options,r=e.name,o=n.offset,s=o===void 0?[0,0]:o,i=Ra.reduce(function(d,h){return d[h]=Ap(h,t.rects,s),d},{}),l=i[t.placement],c=l.x,u=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=u),t.modifiersData[r]=i}const Bp={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Dp};function Lp(e){var t=e.state,n=e.name;t.modifiersData[n]=Da({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Vp={name:"popperOffsets",enabled:!0,phase:"read",fn:Lp,data:{}};function Fp(e){return e==="x"?"y":"x"}function zp(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,s=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!1:i,c=n.boundary,u=n.rootBoundary,d=n.altBoundary,h=n.padding,f=n.tether,b=f===void 0?!0:f,y=n.tetherOffset,v=y===void 0?0:y,m=wn(t,{boundary:c,rootBoundary:u,padding:h,altBoundary:d}),E=Ye(t.placement),_=Ut(t.placement),w=!_,x=po(E),g=Fp(x),C=t.modifiersData.popperOffsets,P=t.rects.reference,F=t.rects.popper,B=typeof v=="function"?v(Object.assign({},t.rects,{placement:t.placement})):v,z=typeof B=="number"?{mainAxis:B,altAxis:B}:Object.assign({mainAxis:0,altAxis:0},B),O=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,I={x:0,y:0};if(C){if(s){var j,V=x==="y"?je:Me,U=x==="y"?Ue:He,M=x==="y"?"height":"width",H=C[x],Q=H+m[V],Z=H-m[U],S=b?-F[M]/2:0,$=_===Vt?P[M]:F[M],D=_===Vt?-F[M]:-P[M],X=t.elements.arrow,W=b&&X?co(X):{width:0,height:0},G=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Ia(),Y=G[V],L=G[U],q=un(0,P[M],W[M]),J=w?P[M]/2-S-q-Y-z.mainAxis:$-q-Y-z.mainAxis,ee=w?-P[M]/2+S+q+L+z.mainAxis:D+q+L+z.mainAxis,oe=t.elements.arrow&&Cn(t.elements.arrow),A=oe?x==="y"?oe.clientTop||0:oe.clientLeft||0:0,te=(j=O==null?void 0:O[x])!=null?j:0,R=H+J-te-A,se=H+ee-te,Ee=un(b?Gn(Q,R):Q,H,b?Et(Z,se):Z);C[x]=Ee,I[x]=Ee-H}if(l){var Oe,we=x==="x"?je:Me,ft=x==="x"?Ue:He,Pe=C[g],Ze=g==="y"?"height":"width",_e=Pe+m[we],Qe=Pe-m[ft],Te=[je,Me].indexOf(E)!==-1,Ot=(Oe=O==null?void 0:O[g])!=null?Oe:0,ht=Te?_e:Pe-P[Ze]-F[Ze]-Ot+z.altAxis,Wt=Te?Pe+P[Ze]+F[Ze]-Ot-z.altAxis:Qe,jn=b&&Te?dp(ht,Pe,Wt):un(b?ht:_e,Pe,b?Wt:Qe);C[g]=jn,I[g]=jn-Pe}t.modifiersData[r]=I}}const Up={name:"preventOverflow",enabled:!0,phase:"main",fn:zp,requiresIfExists:["offset"]};function Hp(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function qp(e){return e===Be(e)||!Fe(e)?uo(e):Hp(e)}function Wp(e){var t=e.getBoundingClientRect(),n=Ft(t.width)/e.offsetWidth||1,r=Ft(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Xp(e,t,n){n===void 0&&(n=!1);var r=Fe(t),o=Fe(t)&&Wp(t),s=ut(t),i=zt(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((Ke(t)!=="body"||ho(s))&&(l=qp(t)),Fe(t)?(c=zt(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):s&&(c.x=fo(s))),{x:i.left+l.scrollLeft-c.x,y:i.top+l.scrollTop-c.y,width:i.width,height:i.height}}function Yp(e){var t=new Map,n=new Set,r=[];e.forEach(function(s){t.set(s.name,s)});function o(s){n.add(s.name);var i=[].concat(s.requires||[],s.requiresIfExists||[]);i.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(s)}return e.forEach(function(s){n.has(s.name)||o(s)}),r}function Gp(e){var t=Yp(e);return ap.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Kp(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Jp(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var bs={placement:"bottom",modifiers:[],strategy:"absolute"};function vs(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Zp(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,s=o===void 0?bs:o;return function(l,c,u){u===void 0&&(u=s);var d={placement:"bottom",orderedModifiers:[],options:Object.assign({},bs,s),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},h=[],f=!1,b={state:d,setOptions:function(E){var _=typeof E=="function"?E(d.options):E;v(),d.options=Object.assign({},s,d.options,_),d.scrollParents={reference:St(l)?dn(l):l.contextElement?dn(l.contextElement):[],popper:dn(c)};var w=Gp(Jp([].concat(r,d.options.modifiers)));return d.orderedModifiers=w.filter(function(x){return x.enabled}),y(),b.update()},forceUpdate:function(){if(!f){var E=d.elements,_=E.reference,w=E.popper;if(vs(_,w)){d.rects={reference:Xp(_,Cn(w),d.options.strategy==="fixed"),popper:co(w)},d.reset=!1,d.placement=d.options.placement,d.orderedModifiers.forEach(function(z){return d.modifiersData[z.name]=Object.assign({},z.data)});for(var x=0;x<d.orderedModifiers.length;x++){if(d.reset===!0){d.reset=!1,x=-1;continue}var g=d.orderedModifiers[x],C=g.fn,P=g.options,F=P===void 0?{}:P,B=g.name;typeof C=="function"&&(d=C({state:d,options:F,name:B,instance:b})||d)}}}},update:Kp(function(){return new Promise(function(m){b.forceUpdate(),m(d)})}),destroy:function(){v(),f=!0}};if(!vs(l,c))return b;b.setOptions(u).then(function(m){!f&&u.onFirstUpdate&&u.onFirstUpdate(m)});function y(){d.orderedModifiers.forEach(function(m){var E=m.name,_=m.options,w=_===void 0?{}:_,x=m.effect;if(typeof x=="function"){var g=x({state:d,name:E,instance:b,options:w}),C=function(){};h.push(g||C)}})}function v(){h.forEach(function(m){return m()}),h=[]}return b}}var Qp=[Ep,Vp,wp,cp,Bp,Ip,Up,gp,$p],eu=Zp({defaultModifiers:Qp});const Ba="Popper";function tu(e){return Oa(Ba,e)}Mc(Ba,["root"]);const nu=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],ru=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function ou(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function Kn(e){return typeof e=="function"?e():e}function lr(e){return e.nodeType!==void 0}function su(e){return!lr(e)}const au=()=>st({root:["root"]},Sc(tu)),iu={},lu=k.forwardRef(function(t,n){var r;const{anchorEl:o,children:s,direction:i,disablePortal:l,modifiers:c,open:u,placement:d,popperOptions:h,popperRef:f,slotProps:b={},slots:y={},TransitionProps:v}=t,m=ue(t,nu),E=k.useRef(null),_=ze(E,n),w=k.useRef(null),x=ze(w,f),g=k.useRef(x);kt(()=>{g.current=x},[x]),k.useImperativeHandle(f,()=>w.current,[]);const C=ou(d,i),[P,F]=k.useState(C),[B,z]=k.useState(Kn(o));k.useEffect(()=>{w.current&&w.current.forceUpdate()}),k.useEffect(()=>{o&&z(Kn(o))},[o]),kt(()=>{if(!B||!u)return;const U=Q=>{F(Q.placement)};if(process.env.NODE_ENV!=="production"&&B&&lr(B)&&B.nodeType===1){const Q=B.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Q.top===0&&Q.left===0&&Q.right===0&&Q.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let M=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:Q})=>{U(Q)}}];c!=null&&(M=M.concat(c)),h&&h.modifiers!=null&&(M=M.concat(h.modifiers));const H=eu(B,E.current,N({placement:C},h,{modifiers:M}));return g.current(H),()=>{H.destroy(),g.current(null)}},[B,l,c,u,h,C]);const O={placement:P};v!==null&&(O.TransitionProps=v);const I=au(),j=(r=y.root)!=null?r:"div",V=Nt({elementType:j,externalSlotProps:b.root,externalForwardedProps:m,additionalProps:{role:"tooltip",ref:_},ownerState:t,className:I.root});return p.jsx(j,N({},V,{children:typeof s=="function"?s(O):s}))}),La=k.forwardRef(function(t,n){const{anchorEl:r,children:o,container:s,direction:i="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:u,open:d,placement:h="bottom",popperOptions:f=iu,popperRef:b,style:y,transition:v=!1,slotProps:m={},slots:E={}}=t,_=ue(t,ru),[w,x]=k.useState(!0),g=()=>{x(!1)},C=()=>{x(!0)};if(!c&&!d&&(!v||w))return null;let P;if(s)P=s;else if(r){const z=Kn(r);P=z&&lr(z)?Se(z).body:Se(null).body}const F=!d&&c&&(!v||w)?"none":void 0,B=v?{in:d,onEnter:g,onExited:C}:void 0;return p.jsx(vn,{disablePortal:l,container:P,children:p.jsx(lu,N({anchorEl:r,direction:i,disablePortal:l,modifiers:u,ref:n,open:v?!w:d,placement:h,popperOptions:f,popperRef:b,slotProps:m,slots:E},_,{style:N({position:"fixed",top:0,left:0,display:F},y),TransitionProps:B,children:o}))})});process.env.NODE_ENV!=="production"&&(La.propTypes={anchorEl:qt(a.oneOfType([nt,a.object,a.func]),e=>{if(e.open){const t=Kn(e.anchorEl);if(t&&lr(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||su(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:a.oneOfType([a.node,a.func]),container:a.oneOfType([nt,a.func]),direction:a.oneOf(["ltr","rtl"]),disablePortal:a.bool,keepMounted:a.bool,modifiers:a.arrayOf(a.shape({data:a.object,effect:a.func,enabled:a.bool,fn:a.func,name:a.any,options:a.object,phase:a.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:a.arrayOf(a.string),requiresIfExists:a.arrayOf(a.string)})),open:a.bool.isRequired,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:a.shape({modifiers:a.array,onFirstUpdate:a.func,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:a.oneOf(["absolute","fixed"])}),popperRef:ao,slotProps:a.shape({root:a.oneOfType([a.func,a.object])}),slots:a.shape({root:a.elementType}),transition:a.bool});const cu=["values","unit","step"],pu=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>N({},n,{[r.key]:r.val}),{})};function uu(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=ue(e,cu),s=pu(t),i=Object.keys(s);function l(f){return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n})`}function c(f){return`@media (max-width:${(typeof t[f]=="number"?t[f]:f)-r/100}${n})`}function u(f,b){const y=i.indexOf(b);return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n}) and (max-width:${(y!==-1&&typeof t[i[y]]=="number"?t[i[y]]:b)-r/100}${n})`}function d(f){return i.indexOf(f)+1<i.length?u(f,i[i.indexOf(f)+1]):l(f)}function h(f){const b=i.indexOf(f);return b===0?l(i[1]):b===i.length-1?c(i[b]):u(f,i[i.indexOf(f)+1]).replace("@media","@media not all and")}return N({keys:i,values:s,up:l,down:c,between:u,only:d,not:h,unit:n},o)}const du={borderRadius:4},fu=du,hu=process.env.NODE_ENV!=="production"?a.oneOfType([a.number,a.string,a.object,a.array]):{},dt=hu;function fn(e,t){return t?tt(e,t,{clone:!1}):e}const mo={xs:0,sm:600,md:900,lg:1200,xl:1536},ys={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${mo[e]}px)`};function ot(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const s=r.breakpoints||ys;return t.reduce((i,l,c)=>(i[s.up(s.keys[c])]=n(t[c]),i),{})}if(typeof t=="object"){const s=r.breakpoints||ys;return Object.keys(t).reduce((i,l)=>{if(Object.keys(s.values||mo).indexOf(l)!==-1){const c=s.up(l);i[c]=n(t[l],l)}else{const c=l;i[c]=t[c]}return i},{})}return n(t)}function mu(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const s=e.up(o);return r[s]={},r},{}))||{}}function gu(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function cr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,s)=>o&&o[s]?o[s]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function Jn(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=cr(e,n)||r,t&&(o=t(o,r,e)),o}function xe(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,s=i=>{if(i[t]==null)return null;const l=i[t],c=i.theme,u=cr(c,r)||{};return ot(i,l,h=>{let f=Jn(u,o,h);return h===f&&typeof h=="string"&&(f=Jn(u,o,`${t}${h==="default"?"":Ge(h)}`,h)),n===!1?f:{[n]:f}})};return s.propTypes=process.env.NODE_ENV!=="production"?{[t]:dt}:{},s.filterProps=[t],s}function bu(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const vu={m:"margin",p:"padding"},yu={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},ws={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},wu=bu(e=>{if(e.length>2)if(ws[e])e=ws[e];else return[e];const[t,n]=e.split(""),r=vu[t],o=yu[n]||"";return Array.isArray(o)?o.map(s=>r+s):[r+o]}),pr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],ur=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],xu=[...pr,...ur];function On(e,t,n,r){var o;const s=(o=cr(e,t,!1))!=null?o:n;return typeof s=="number"?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&typeof i!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`),s*i):Array.isArray(s)?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&(Number.isInteger(i)?i>s.length-1&&console.error([`MUI: The value provided (${i}) overflows.`,`The supported values are: ${JSON.stringify(s)}.`,`${i} > ${s.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),s[i]):typeof s=="function"?s:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${s}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Va(e){return On(e,"spacing",8,"spacing")}function Pn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Eu(e,t){return n=>e.reduce((r,o)=>(r[o]=Pn(t,n),r),{})}function Tu(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=wu(n),s=Eu(o,r),i=e[n];return ot(e,i,s)}function Fa(e,t){const n=Va(e.theme);return Object.keys(e).map(r=>Tu(e,t,r,n)).reduce(fn,{})}function ge(e){return Fa(e,pr)}ge.propTypes=process.env.NODE_ENV!=="production"?pr.reduce((e,t)=>(e[t]=dt,e),{}):{};ge.filterProps=pr;function be(e){return Fa(e,ur)}be.propTypes=process.env.NODE_ENV!=="production"?ur.reduce((e,t)=>(e[t]=dt,e),{}):{};be.filterProps=ur;process.env.NODE_ENV!=="production"&&xu.reduce((e,t)=>(e[t]=dt,e),{});function ku(e=8){if(e.mui)return e;const t=Va({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(s=>{const i=t(s);return typeof i=="number"?`${i}px`:i}).join(" "));return n.mui=!0,n}function dr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(s=>{r[s]=o}),r),{}),n=r=>Object.keys(r).reduce((o,s)=>t[s]?fn(o,t[s](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Ve(e){return typeof e!="number"?e:`${e}px solid`}function qe(e,t){return xe({prop:e,themeKey:"borders",transform:t})}const Nu=qe("border",Ve),Su=qe("borderTop",Ve),Cu=qe("borderRight",Ve),Ou=qe("borderBottom",Ve),Pu=qe("borderLeft",Ve),Ru=qe("borderColor"),ju=qe("borderTopColor"),Mu=qe("borderRightColor"),Iu=qe("borderBottomColor"),_u=qe("borderLeftColor"),$u=qe("outline",Ve),Au=qe("outlineColor"),fr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=On(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:Pn(t,r)});return ot(e,e.borderRadius,n)}return null};fr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:dt}:{};fr.filterProps=["borderRadius"];dr(Nu,Su,Cu,Ou,Pu,Ru,ju,Mu,Iu,_u,fr,$u,Au);const hr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=On(e.theme,"spacing",8,"gap"),n=r=>({gap:Pn(t,r)});return ot(e,e.gap,n)}return null};hr.propTypes=process.env.NODE_ENV!=="production"?{gap:dt}:{};hr.filterProps=["gap"];const mr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=On(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:Pn(t,r)});return ot(e,e.columnGap,n)}return null};mr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:dt}:{};mr.filterProps=["columnGap"];const gr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=On(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:Pn(t,r)});return ot(e,e.rowGap,n)}return null};gr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:dt}:{};gr.filterProps=["rowGap"];const Du=xe({prop:"gridColumn"}),Bu=xe({prop:"gridRow"}),Lu=xe({prop:"gridAutoFlow"}),Vu=xe({prop:"gridAutoColumns"}),Fu=xe({prop:"gridAutoRows"}),zu=xe({prop:"gridTemplateColumns"}),Uu=xe({prop:"gridTemplateRows"}),Hu=xe({prop:"gridTemplateAreas"}),qu=xe({prop:"gridArea"});dr(hr,mr,gr,Du,Bu,Lu,Vu,Fu,zu,Uu,Hu,qu);function At(e,t){return t==="grey"?t:e}const Wu=xe({prop:"color",themeKey:"palette",transform:At}),Xu=xe({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:At}),Yu=xe({prop:"backgroundColor",themeKey:"palette",transform:At});dr(Wu,Xu,Yu);function De(e){return e<=1&&e!==0?`${e*100}%`:e}const Gu=xe({prop:"width",transform:De}),go=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const s=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||mo[n];return s?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${s}${e.theme.breakpoints.unit}`}:{maxWidth:s}:{maxWidth:De(n)}};return ot(e,e.maxWidth,t)}return null};go.filterProps=["maxWidth"];const Ku=xe({prop:"minWidth",transform:De}),Ju=xe({prop:"height",transform:De}),Zu=xe({prop:"maxHeight",transform:De}),Qu=xe({prop:"minHeight",transform:De});xe({prop:"size",cssProperty:"width",transform:De});xe({prop:"size",cssProperty:"height",transform:De});const ed=xe({prop:"boxSizing"});dr(Gu,go,Ku,Ju,Zu,Qu,ed);const td={border:{themeKey:"borders",transform:Ve},borderTop:{themeKey:"borders",transform:Ve},borderRight:{themeKey:"borders",transform:Ve},borderBottom:{themeKey:"borders",transform:Ve},borderLeft:{themeKey:"borders",transform:Ve},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Ve},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:fr},color:{themeKey:"palette",transform:At},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:At},backgroundColor:{themeKey:"palette",transform:At},p:{style:be},pt:{style:be},pr:{style:be},pb:{style:be},pl:{style:be},px:{style:be},py:{style:be},padding:{style:be},paddingTop:{style:be},paddingRight:{style:be},paddingBottom:{style:be},paddingLeft:{style:be},paddingX:{style:be},paddingY:{style:be},paddingInline:{style:be},paddingInlineStart:{style:be},paddingInlineEnd:{style:be},paddingBlock:{style:be},paddingBlockStart:{style:be},paddingBlockEnd:{style:be},m:{style:ge},mt:{style:ge},mr:{style:ge},mb:{style:ge},ml:{style:ge},mx:{style:ge},my:{style:ge},margin:{style:ge},marginTop:{style:ge},marginRight:{style:ge},marginBottom:{style:ge},marginLeft:{style:ge},marginX:{style:ge},marginY:{style:ge},marginInline:{style:ge},marginInlineStart:{style:ge},marginInlineEnd:{style:ge},marginBlock:{style:ge},marginBlockStart:{style:ge},marginBlockEnd:{style:ge},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:hr},rowGap:{style:gr},columnGap:{style:mr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:De},maxWidth:{style:go},minWidth:{transform:De},height:{transform:De},maxHeight:{transform:De},minHeight:{transform:De},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},bo=td;function nd(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function rd(e,t){return typeof e=="function"?e(t):e}function od(){function e(n,r,o,s){const i={[n]:r,theme:o},l=s[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:u,transform:d,style:h}=l;if(r==null)return null;if(u==="typography"&&r==="inherit")return{[n]:r};const f=cr(o,u)||{};return h?h(i):ot(i,r,y=>{let v=Jn(f,d,y);return y===v&&typeof y=="string"&&(v=Jn(f,d,`${n}${y==="default"?"":Ge(y)}`,y)),c===!1?v:{[c]:v}})}function t(n){var r;const{sx:o,theme:s={}}=n||{};if(!o)return null;const i=(r=s.unstable_sxConfig)!=null?r:bo;function l(c){let u=c;if(typeof c=="function")u=c(s);else if(typeof c!="object")return c;if(!u)return null;const d=mu(s.breakpoints),h=Object.keys(d);let f=d;return Object.keys(u).forEach(b=>{const y=rd(u[b],s);if(y!=null)if(typeof y=="object")if(i[b])f=fn(f,e(b,y,s,i));else{const v=ot({theme:s},y,m=>({[b]:m}));nd(v,y)?f[b]=t({sx:y,theme:s}):f=fn(f,v)}else f=fn(f,e(b,y,s,i))}),gu(h,f)}return Array.isArray(o)?o.map(l):l(o)}return t}const za=od();za.filterProps=["sx"];const vo=za;function sd(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const ad=["breakpoints","palette","spacing","shape"];function yo(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:s={}}=e,i=ue(e,ad),l=uu(n),c=ku(o);let u=tt({breakpoints:l,direction:"ltr",components:{},palette:N({mode:"light"},r),spacing:c,shape:N({},fu,s)},i);return u.applyStyles=sd,u=t.reduce((d,h)=>tt(d,h),u),u.unstable_sxConfig=N({},bo,i==null?void 0:i.unstable_sxConfig),u.unstable_sx=function(h){return vo({sx:h,theme:this})},u}function id(e){return Object.keys(e).length===0}function Ua(e=null){const t=k.useContext(Ar.ThemeContext);return!t||id(t)?e:t}const ld=yo();function Ha(e=ld){return Ua(e)}const cd=["ownerState"],pd=["variants"],ud=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function dd(e){return Object.keys(e).length===0}function fd(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Fn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const hd=yo(),xs=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function An({defaultTheme:e,theme:t,themeId:n}){return dd(t)?e:t[n]||t}function md(e){return e?(t,n)=>n[e]:null}function zn(e,t){let{ownerState:n}=t,r=ue(t,cd);const o=typeof e=="function"?e(N({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(s=>zn(s,N({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:s=[]}=o;let l=ue(o,pd);return s.forEach(c=>{let u=!0;typeof c.props=="function"?u=c.props(N({ownerState:n},r,n)):Object.keys(c.props).forEach(d=>{(n==null?void 0:n[d])!==c.props[d]&&r[d]!==c.props[d]&&(u=!1)}),u&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(N({ownerState:n},r,n)):c.style))}),l}return o}function gd(e={}){const{themeId:t,defaultTheme:n=hd,rootShouldForwardProp:r=Fn,slotShouldForwardProp:o=Fn}=e,s=i=>vo(N({},i,{theme:An(N({},i,{defaultTheme:n,themeId:t}))}));return s.__mui_systemSx=!0,(i,l={})=>{Ar.internal_processStyles(i,g=>g.filter(C=>!(C!=null&&C.__mui_systemSx)));const{name:c,slot:u,skipVariantsResolver:d,skipSx:h,overridesResolver:f=md(xs(u))}=l,b=ue(l,ud),y=d!==void 0?d:u&&u!=="Root"&&u!=="root"||!1,v=h||!1;let m;process.env.NODE_ENV!=="production"&&c&&(m=`${c}-${xs(u||"Root")}`);let E=Fn;u==="Root"||u==="root"?E=r:u?E=o:fd(i)&&(E=void 0);const _=Ar(i,N({shouldForwardProp:E,label:m},b)),w=g=>typeof g=="function"&&g.__emotion_real!==g||wt(g)?C=>zn(g,N({},C,{theme:An({theme:C.theme,defaultTheme:n,themeId:t})})):g,x=(g,...C)=>{let P=w(g);const F=C?C.map(w):[];c&&f&&F.push(O=>{const I=An(N({},O,{defaultTheme:n,themeId:t}));if(!I.components||!I.components[c]||!I.components[c].styleOverrides)return null;const j=I.components[c].styleOverrides,V={};return Object.entries(j).forEach(([U,M])=>{V[U]=zn(M,N({},O,{theme:I}))}),f(O,V)}),c&&!y&&F.push(O=>{var I;const j=An(N({},O,{defaultTheme:n,themeId:t})),V=j==null||(I=j.components)==null||(I=I[c])==null?void 0:I.variants;return zn({variants:V},N({},O,{theme:j}))}),v||F.push(s);const B=F.length-C.length;if(Array.isArray(g)&&B>0){const O=new Array(B).fill("");P=[...g,...O],P.raw=[...g.raw,...O]}const z=_(P,...F);if(process.env.NODE_ENV!=="production"){let O;c&&(O=`${c}${Ge(u||"")}`),O===void 0&&(O=`Styled(${ec(i)})`),z.displayName=O}return i.muiName&&(z.muiName=i.muiName),z};return _.withConfig&&(x.withConfig=_.withConfig),x}}function bd(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:Ea(t.components[n].defaultProps,r)}function vd({props:e,name:t,defaultTheme:n,themeId:r}){let o=Ha(n);return r&&(o=o[r]||o),bd({theme:o,name:t,props:e})}function wo(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Tc(e,t,n)}function yd(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Ct(e){if(e.type)return e;if(e.charAt(0)==="#")return Ct(yd(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Bt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Bt(10,o))}else r=r.split(",");return r=r.map(s=>parseFloat(s)),{type:n,values:r,colorSpace:o}}function br(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,s)=>s<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function wd(e){e=Ct(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,s=r*Math.min(o,1-o),i=(u,d=(u+n/30)%12)=>o-s*Math.max(Math.min(d-3,9-d,1),-1);let l="rgb";const c=[Math.round(i(0)*255),Math.round(i(8)*255),Math.round(i(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),br({type:l,values:c})}function Es(e){e=Ct(e);let t=e.type==="hsl"||e.type==="hsla"?Ct(wd(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Ts(e,t){const n=Es(e),r=Es(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function Zn(e,t){return e=Ct(e),t=wo(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,br(e)}function xd(e,t){if(e=Ct(e),t=wo(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return br(e)}function Ed(e,t){if(e=Ct(e),t=wo(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return br(e)}function Td(e,t){return N({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const kd={black:"#000",white:"#fff"},xn=kd,Nd={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Sd=Nd,Cd={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Pt=Cd,Od={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Rt=Od,Pd={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},en=Pd,Rd={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},jt=Rd,jd={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Mt=jd,Md={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},It=Md,Id=["mode","contrastThreshold","tonalOffset"],ks={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:xn.white,default:xn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},jr={text:{primary:xn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:xn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Ns(e,t,n,r){const o=r.light||r,s=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=Ed(e.main,o):t==="dark"&&(e.dark=xd(e.main,s)))}function _d(e="light"){return e==="dark"?{main:jt[200],light:jt[50],dark:jt[400]}:{main:jt[700],light:jt[400],dark:jt[800]}}function $d(e="light"){return e==="dark"?{main:Pt[200],light:Pt[50],dark:Pt[400]}:{main:Pt[500],light:Pt[300],dark:Pt[700]}}function Ad(e="light"){return e==="dark"?{main:Rt[500],light:Rt[300],dark:Rt[700]}:{main:Rt[700],light:Rt[400],dark:Rt[800]}}function Dd(e="light"){return e==="dark"?{main:Mt[400],light:Mt[300],dark:Mt[700]}:{main:Mt[700],light:Mt[500],dark:Mt[900]}}function Bd(e="light"){return e==="dark"?{main:It[400],light:It[300],dark:It[700]}:{main:It[800],light:It[500],dark:It[900]}}function Ld(e="light"){return e==="dark"?{main:en[400],light:en[300],dark:en[700]}:{main:"#ed6c02",light:en[500],dark:en[900]}}function Vd(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=ue(e,Id),s=e.primary||_d(t),i=e.secondary||$d(t),l=e.error||Ad(t),c=e.info||Dd(t),u=e.success||Bd(t),d=e.warning||Ld(t);function h(v){const m=Ts(v,jr.text.primary)>=n?jr.text.primary:ks.text.primary;if(process.env.NODE_ENV!=="production"){const E=Ts(v,m);E<3&&console.error([`MUI: The contrast ratio of ${E}:1 for ${m} on ${v}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return m}const f=({color:v,name:m,mainShade:E=500,lightShade:_=300,darkShade:w=700})=>{if(v=N({},v),!v.main&&v[E]&&(v.main=v[E]),!v.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${m?` (${m})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.`:Bt(11,m?` (${m})`:"",E));if(typeof v.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${m?` (${m})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(v.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Bt(12,m?` (${m})`:"",JSON.stringify(v.main)));return Ns(v,"light",_,r),Ns(v,"dark",w,r),v.contrastText||(v.contrastText=h(v.main)),v},b={dark:jr,light:ks};return process.env.NODE_ENV!=="production"&&(b[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),tt(N({common:N({},xn),mode:t,primary:f({color:s,name:"primary"}),secondary:f({color:i,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:f({color:l,name:"error"}),warning:f({color:d,name:"warning"}),info:f({color:c,name:"info"}),success:f({color:u,name:"success"}),grey:Sd,contrastThreshold:n,getContrastText:h,augmentColor:f,tonalOffset:r},b[t]),o)}const Fd=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function zd(e){return Math.round(e*1e5)/1e5}const Ss={textTransform:"uppercase"},Cs='"Roboto", "Helvetica", "Arial", sans-serif';function Ud(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Cs,fontSize:o=14,fontWeightLight:s=300,fontWeightRegular:i=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:u=16,allVariants:d,pxToRem:h}=n,f=ue(n,Fd);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const b=o/14,y=h||(E=>`${E/u*b}rem`),v=(E,_,w,x,g)=>N({fontFamily:r,fontWeight:E,fontSize:y(_),lineHeight:w},r===Cs?{letterSpacing:`${zd(x/_)}em`}:{},g,d),m={h1:v(s,96,1.167,-1.5),h2:v(s,60,1.2,-.5),h3:v(i,48,1.167,0),h4:v(i,34,1.235,.25),h5:v(i,24,1.334,0),h6:v(l,20,1.6,.15),subtitle1:v(i,16,1.75,.15),subtitle2:v(l,14,1.57,.1),body1:v(i,16,1.5,.15),body2:v(i,14,1.43,.15),button:v(l,14,1.75,.4,Ss),caption:v(i,12,1.66,.4),overline:v(i,12,2.66,1,Ss),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return tt(N({htmlFontSize:u,pxToRem:y,fontFamily:r,fontSize:o,fontWeightLight:s,fontWeightRegular:i,fontWeightMedium:l,fontWeightBold:c},m),f,{clone:!1})}const Hd=.2,qd=.14,Wd=.12;function me(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Hd})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${qd})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Wd})`].join(",")}const Xd=["none",me(0,2,1,-1,0,1,1,0,0,1,3,0),me(0,3,1,-2,0,2,2,0,0,1,5,0),me(0,3,3,-2,0,3,4,0,0,1,8,0),me(0,2,4,-1,0,4,5,0,0,1,10,0),me(0,3,5,-1,0,5,8,0,0,1,14,0),me(0,3,5,-1,0,6,10,0,0,1,18,0),me(0,4,5,-2,0,7,10,1,0,2,16,1),me(0,5,5,-3,0,8,10,1,0,3,14,2),me(0,5,6,-3,0,9,12,1,0,3,16,2),me(0,6,6,-3,0,10,14,1,0,4,18,3),me(0,6,7,-4,0,11,15,1,0,4,20,3),me(0,7,8,-4,0,12,17,2,0,5,22,4),me(0,7,8,-4,0,13,19,2,0,5,24,4),me(0,7,9,-4,0,14,21,2,0,5,26,4),me(0,8,9,-5,0,15,22,2,0,6,28,5),me(0,8,10,-5,0,16,24,2,0,6,30,5),me(0,8,11,-5,0,17,26,2,0,6,32,5),me(0,9,11,-5,0,18,28,2,0,7,34,6),me(0,9,12,-6,0,19,29,2,0,7,36,6),me(0,10,13,-6,0,20,31,3,0,8,38,7),me(0,10,13,-6,0,21,33,3,0,8,40,7),me(0,10,14,-6,0,22,35,3,0,8,42,7),me(0,11,14,-7,0,23,36,3,0,9,44,8),me(0,11,15,-7,0,24,38,3,0,9,46,8)],Yd=Xd,Gd=["duration","easing","delay"],Kd={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Jd={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Os(e){return`${Math.round(e)}ms`}function Zd(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Qd(e){const t=N({},Kd,e.easing),n=N({},Jd,e.duration);return N({getAutoHeightDuration:Zd,create:(o=["all"],s={})=>{const{duration:i=n.standard,easing:l=t.easeInOut,delay:c=0}=s,u=ue(s,Gd);if(process.env.NODE_ENV!=="production"){const d=f=>typeof f=="string",h=f=>!isNaN(parseFloat(f));!d(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!h(i)&&!d(i)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`),d(l)||console.error('MUI: Argument "easing" must be a string.'),!h(c)&&!d(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof s!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(d=>`${d} ${typeof i=="string"?i:Os(i)} ${l} ${typeof c=="string"?c:Os(c)}`).join(",")}},e,{easing:t,duration:n})}const ef={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},tf=ef,nf=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function rf(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:s={}}=e,i=ue(e,nf);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Bt(18));const l=Vd(r),c=yo(e);let u=tt(c,{mixins:Td(c.breakpoints,n),palette:l,shadows:Yd.slice(),typography:Ud(l,s),transitions:Qd(o),zIndex:N({},tf)});if(u=tt(u,i),u=t.reduce((d,h)=>tt(d,h),u),process.env.NODE_ENV!=="production"){const d=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],h=(f,b)=>{let y;for(y in f){const v=f[y];if(d.indexOf(y)!==-1&&Object.keys(v).length>0){if(process.env.NODE_ENV!=="production"){const m=Je("",y);console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${y}\` internal state.`,"You can not override it like this: ",JSON.stringify(f,null,2),"",`Instead, you need to use the '&.${m}' syntax:`,JSON.stringify({root:{[`&.${m}`]:v}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}f[y]={}}}};Object.keys(u.components).forEach(f=>{const b=u.components[f].styleOverrides;b&&f.indexOf("Mui")===0&&h(b,f)})}return u.unstable_sxConfig=N({},bo,i==null?void 0:i.unstable_sxConfig),u.unstable_sx=function(h){return vo({sx:h,theme:this})},u}const of=rf(),xo=of,Eo="$$material",qa=e=>Fn(e)&&e!=="classes",sf=gd({themeId:Eo,defaultTheme:xo,rootShouldForwardProp:qa}),Ce=sf;function Rn(){const e=Ha(xo);return process.env.NODE_ENV!=="production"&&k.useDebugValue(e),e[Eo]||e}function at({props:e,name:t}){return vd({props:e,name:t,defaultTheme:xo,themeId:Eo})}function Wr(e,t){return Wr=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},Wr(e,t)}function af(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Wr(e,t)}const Ps={disabled:!1};var lf=process.env.NODE_ENV!=="production"?a.oneOfType([a.number,a.shape({enter:a.number,exit:a.number,appear:a.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&a.oneOfType([a.string,a.shape({enter:a.string,exit:a.string,active:a.string}),a.shape({enter:a.string,enterDone:a.string,enterActive:a.string,exit:a.string,exitDone:a.string,exitActive:a.string})]);const Wa=T.createContext(null);var cf=function(t){return t.scrollTop},ln="unmounted",bt="exited",vt="entering",$t="entered",Xr="exiting",it=function(e){af(t,e);function t(r,o){var s;s=e.call(this,r,o)||this;var i=o,l=i&&!i.isMounting?r.enter:r.appear,c;return s.appearStatus=null,r.in?l?(c=bt,s.appearStatus=vt):c=$t:r.unmountOnExit||r.mountOnEnter?c=ln:c=bt,s.state={status:c},s.nextCallback=null,s}t.getDerivedStateFromProps=function(o,s){var i=o.in;return i&&s.status===ln?{status:bt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var s=null;if(o!==this.props){var i=this.state.status;this.props.in?i!==vt&&i!==$t&&(s=vt):(i===vt||i===$t)&&(s=Xr)}this.updateStatus(!1,s)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,s,i,l;return s=i=l=o,o!=null&&typeof o!="number"&&(s=o.exit,i=o.enter,l=o.appear!==void 0?o.appear:i),{exit:s,enter:i,appear:l}},n.updateStatus=function(o,s){if(o===void 0&&(o=!1),s!==null)if(this.cancelNextCallback(),s===vt){if(this.props.unmountOnExit||this.props.mountOnEnter){var i=this.props.nodeRef?this.props.nodeRef.current:rn.findDOMNode(this);i&&cf(i)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===bt&&this.setState({status:ln})},n.performEnter=function(o){var s=this,i=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[rn.findDOMNode(this),l],u=c[0],d=c[1],h=this.getTimeouts(),f=l?h.appear:h.enter;if(!o&&!i||Ps.disabled){this.safeSetState({status:$t},function(){s.props.onEntered(u)});return}this.props.onEnter(u,d),this.safeSetState({status:vt},function(){s.props.onEntering(u,d),s.onTransitionEnd(f,function(){s.safeSetState({status:$t},function(){s.props.onEntered(u,d)})})})},n.performExit=function(){var o=this,s=this.props.exit,i=this.getTimeouts(),l=this.props.nodeRef?void 0:rn.findDOMNode(this);if(!s||Ps.disabled){this.safeSetState({status:bt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:Xr},function(){o.props.onExiting(l),o.onTransitionEnd(i.exit,function(){o.safeSetState({status:bt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,s){s=this.setNextCallback(s),this.setState(o,s)},n.setNextCallback=function(o){var s=this,i=!0;return this.nextCallback=function(l){i&&(i=!1,s.nextCallback=null,o(l))},this.nextCallback.cancel=function(){i=!1},this.nextCallback},n.onTransitionEnd=function(o,s){this.setNextCallback(s);var i=this.props.nodeRef?this.props.nodeRef.current:rn.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!i||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[i,this.nextCallback],u=c[0],d=c[1];this.props.addEndListener(u,d)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===ln)return null;var s=this.props,i=s.children;s.in,s.mountOnEnter,s.unmountOnExit,s.appear,s.enter,s.exit,s.timeout,s.addEndListener,s.onEnter,s.onEntering,s.onEntered,s.onExit,s.onExiting,s.onExited,s.nodeRef;var l=ue(s,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return T.createElement(Wa.Provider,{value:null},typeof i=="function"?i(o,l):T.cloneElement(T.Children.only(i),l))},t}(T.Component);it.contextType=Wa;it.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:a.shape({current:typeof Element>"u"?a.any:function(e,t,n,r,o,s){var i=e[t];return a.instanceOf(i&&"ownerDocument"in i?i.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,s)}}),children:a.oneOfType([a.func.isRequired,a.element.isRequired]).isRequired,in:a.bool,mountOnEnter:a.bool,unmountOnExit:a.bool,appear:a.bool,enter:a.bool,exit:a.bool,timeout:function(t){var n=lf;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),s=1;s<r;s++)o[s-1]=arguments[s];return n.apply(void 0,[t].concat(o))},addEndListener:a.func,onEnter:a.func,onEntering:a.func,onEntered:a.func,onExit:a.func,onExiting:a.func,onExited:a.func}:{};function _t(){}it.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:_t,onEntering:_t,onEntered:_t,onExit:_t,onExiting:_t,onExited:_t};it.UNMOUNTED=ln;it.EXITED=bt;it.ENTERING=vt;it.ENTERED=$t;it.EXITING=Xr;const Xa=it,Ya=e=>e.scrollTop;function Qn(e,t){var n,r;const{timeout:o,easing:s,style:i={}}=e;return{duration:(n=i.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=i.transitionTimingFunction)!=null?r:typeof s=="object"?s[t.mode]:s,delay:i.transitionDelay}}const pf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function Yr(e){return`scale(${e}, ${e**2})`}const uf={entering:{opacity:1,transform:Yr(1)},entered:{opacity:1,transform:"none"}},Mr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),To=k.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:s,easing:i,in:l,onEnter:c,onEntered:u,onEntering:d,onExit:h,onExited:f,onExiting:b,style:y,timeout:v="auto",TransitionComponent:m=Xa}=t,E=ue(t,pf),_=sn(),w=k.useRef(),x=Rn(),g=k.useRef(null),C=ze(g,s.ref,n),P=U=>M=>{if(U){const H=g.current;M===void 0?U(H):U(H,M)}},F=P(d),B=P((U,M)=>{Ya(U);const{duration:H,delay:Q,easing:Z}=Qn({style:y,timeout:v,easing:i},{mode:"enter"});let S;v==="auto"?(S=x.transitions.getAutoHeightDuration(U.clientHeight),w.current=S):S=H,U.style.transition=[x.transitions.create("opacity",{duration:S,delay:Q}),x.transitions.create("transform",{duration:Mr?S:S*.666,delay:Q,easing:Z})].join(","),c&&c(U,M)}),z=P(u),O=P(b),I=P(U=>{const{duration:M,delay:H,easing:Q}=Qn({style:y,timeout:v,easing:i},{mode:"exit"});let Z;v==="auto"?(Z=x.transitions.getAutoHeightDuration(U.clientHeight),w.current=Z):Z=M,U.style.transition=[x.transitions.create("opacity",{duration:Z,delay:H}),x.transitions.create("transform",{duration:Mr?Z:Z*.666,delay:Mr?H:H||Z*.333,easing:Q})].join(","),U.style.opacity=0,U.style.transform=Yr(.75),h&&h(U)}),j=P(f),V=U=>{v==="auto"&&_.start(w.current||0,U),r&&r(g.current,U)};return p.jsx(m,N({appear:o,in:l,nodeRef:g,onEnter:B,onEntered:z,onEntering:F,onExit:I,onExited:j,onExiting:O,addEndListener:V,timeout:v==="auto"?null:v},E,{children:(U,M)=>k.cloneElement(s,N({style:N({opacity:0,transform:Yr(.75),visibility:U==="exited"&&!l?"hidden":void 0},uf[U],y,s.props.style),ref:C},M))}))});process.env.NODE_ENV!=="production"&&(To.propTypes={addEndListener:a.func,appear:a.bool,children:kn.isRequired,easing:a.oneOfType([a.shape({enter:a.string,exit:a.string}),a.string]),in:a.bool,onEnter:a.func,onEntered:a.func,onEntering:a.func,onExit:a.func,onExited:a.func,onExiting:a.func,style:a.object,timeout:a.oneOfType([a.oneOf(["auto"]),a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})])});To.muiSupportAuto=!0;const Gr=To,df=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},Rs=df,ff=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],hf=Ce(La,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ga=k.forwardRef(function(t,n){var r;const o=Ua(),s=at({props:t,name:"MuiPopper"}),{anchorEl:i,component:l,components:c,componentsProps:u,container:d,disablePortal:h,keepMounted:f,modifiers:b,open:y,placement:v,popperOptions:m,popperRef:E,transition:_,slots:w,slotProps:x}=s,g=ue(s,ff),C=(r=w==null?void 0:w.root)!=null?r:c==null?void 0:c.Root,P=N({anchorEl:i,container:d,disablePortal:h,keepMounted:f,modifiers:b,open:y,placement:v,popperOptions:m,popperRef:E,transition:_},g);return p.jsx(hf,N({as:l,direction:o==null?void 0:o.direction,slots:{root:C},slotProps:x??u},P,{ref:n}))});process.env.NODE_ENV!=="production"&&(Ga.propTypes={anchorEl:a.oneOfType([nt,a.object,a.func]),children:a.oneOfType([a.node,a.func]),component:a.elementType,components:a.shape({Root:a.elementType}),componentsProps:a.shape({root:a.oneOfType([a.func,a.object])}),container:a.oneOfType([nt,a.func]),disablePortal:a.bool,keepMounted:a.bool,modifiers:a.arrayOf(a.shape({data:a.object,effect:a.func,enabled:a.bool,fn:a.func,name:a.any,options:a.object,phase:a.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:a.arrayOf(a.string),requiresIfExists:a.arrayOf(a.string)})),open:a.bool.isRequired,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:a.shape({modifiers:a.array,onFirstUpdate:a.func,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:a.oneOf(["absolute","fixed"])}),popperRef:ao,slotProps:a.shape({root:a.oneOfType([a.func,a.object])}),slots:a.shape({root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),transition:a.bool});const Ka=Ga;function mf(e){return Je("MuiTooltip",e)}const gf=pt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),lt=gf,bf=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function vf(e){return Math.round(e*1e5)/1e5}const yf=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:s}=e,i={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Ge(s.split("-")[0])}`],arrow:["arrow"]};return st(i,mf,t)},wf=Ce(Ka,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>N({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${lt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${lt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${lt.arrow}`]:N({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${lt.arrow}`]:N({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),xf=Ce("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Ge(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>N({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:Zn(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${vf(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${lt.popper}[data-popper-placement*="left"] &`]:N({transformOrigin:"right center"},t.isRtl?N({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):N({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${lt.popper}[data-popper-placement*="right"] &`]:N({transformOrigin:"left center"},t.isRtl?N({marginRight:"14px"},t.touch&&{marginRight:"24px"}):N({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${lt.popper}[data-popper-placement*="top"] &`]:N({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${lt.popper}[data-popper-placement*="bottom"] &`]:N({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Ef=Ce("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:Zn(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Dn=!1;const js=new Nn;let tn={x:0,y:0};function Bn(e,t){return n=>{t&&t(n),e(n)}}const Ja=k.forwardRef(function(t,n){var r,o,s,i,l,c,u,d,h,f,b,y,v,m,E,_,w,x,g;const C=at({props:t,name:"MuiTooltip"}),{arrow:P=!1,children:F,components:B={},componentsProps:z={},describeChild:O=!1,disableFocusListener:I=!1,disableHoverListener:j=!1,disableInteractive:V=!1,disableTouchListener:U=!1,enterDelay:M=100,enterNextDelay:H=0,enterTouchDelay:Q=700,followCursor:Z=!1,id:S,leaveDelay:$=0,leaveTouchDelay:D=1500,onClose:X,onOpen:W,open:G,placement:Y="bottom",PopperComponent:L,PopperProps:q={},slotProps:J={},slots:ee={},title:oe,TransitionComponent:A=Gr,TransitionProps:te}=C,R=ue(C,bf),se=k.isValidElement(F)?F:p.jsx("span",{children:F}),Ee=Rn(),Oe=Ee.direction==="rtl",[we,ft]=k.useState(),[Pe,Ze]=k.useState(null),_e=k.useRef(!1),Qe=V||Z,Te=sn(),Ot=sn(),ht=sn(),Wt=sn(),[jn,Oo]=ga({controlled:G,default:!1,name:"Tooltip",state:"open"});let et=jn;if(process.env.NODE_ENV!=="production"){const{current:ne}=k.useRef(G!==void 0);k.useEffect(()=>{we&&we.disabled&&!ne&&oe!==""&&we.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[oe,we,ne])}const vr=ma(S),Xt=k.useRef(),Mn=bn(()=>{Xt.current!==void 0&&(document.body.style.WebkitUserSelect=Xt.current,Xt.current=void 0),Wt.clear()});k.useEffect(()=>Mn,[Mn]);const Po=ne=>{js.clear(),Dn=!0,Oo(!0),W&&!et&&W(ne)},In=bn(ne=>{js.start(800+$,()=>{Dn=!1}),Oo(!1),X&&et&&X(ne),Te.start(Ee.transitions.duration.shortest,()=>{_e.current=!1})}),yr=ne=>{_e.current&&ne.type!=="touchstart"||(we&&we.removeAttribute("title"),Ot.clear(),ht.clear(),M||Dn&&H?Ot.start(Dn?H:M,()=>{Po(ne)}):Po(ne))},Ro=ne=>{Ot.clear(),ht.start($,()=>{In(ne)})},{isFocusVisibleRef:jo,onBlur:_i,onFocus:$i,ref:Ai}=ba(),[,Mo]=k.useState(!1),Io=ne=>{_i(ne),jo.current===!1&&(Mo(!1),Ro(ne))},_o=ne=>{we||ft(ne.currentTarget),$i(ne),jo.current===!0&&(Mo(!0),yr(ne))},$o=ne=>{_e.current=!0;const $e=se.props;$e.onTouchStart&&$e.onTouchStart(ne)},Ao=yr,Do=Ro,Di=ne=>{$o(ne),ht.clear(),Te.clear(),Mn(),Xt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Wt.start(Q,()=>{document.body.style.WebkitUserSelect=Xt.current,yr(ne)})},Bi=ne=>{se.props.onTouchEnd&&se.props.onTouchEnd(ne),Mn(),ht.start(D,()=>{In(ne)})};k.useEffect(()=>{if(!et)return;function ne($e){($e.key==="Escape"||$e.key==="Esc")&&In($e)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[In,et]);const Li=ze(se.ref,Ai,ft,n);!oe&&oe!==0&&(et=!1);const wr=k.useRef(),Vi=ne=>{const $e=se.props;$e.onMouseMove&&$e.onMouseMove(ne),tn={x:ne.clientX,y:ne.clientY},wr.current&&wr.current.update()},Yt={},xr=typeof oe=="string";O?(Yt.title=!et&&xr&&!j?oe:null,Yt["aria-describedby"]=et?vr:null):(Yt["aria-label"]=xr?oe:null,Yt["aria-labelledby"]=et&&!xr?vr:null);const Le=N({},Yt,R,se.props,{className:Ne(R.className,se.props.className),onTouchStart:$o,ref:Li},Z?{onMouseMove:Vi}:{});process.env.NODE_ENV!=="production"&&(Le["data-mui-internal-clone-element"]=!0,k.useEffect(()=>{we&&!we.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[we]));const Gt={};U||(Le.onTouchStart=Di,Le.onTouchEnd=Bi),j||(Le.onMouseOver=Bn(Ao,Le.onMouseOver),Le.onMouseLeave=Bn(Do,Le.onMouseLeave),Qe||(Gt.onMouseOver=Ao,Gt.onMouseLeave=Do)),I||(Le.onFocus=Bn(_o,Le.onFocus),Le.onBlur=Bn(Io,Le.onBlur),Qe||(Gt.onFocus=_o,Gt.onBlur=Io)),process.env.NODE_ENV!=="production"&&se.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));const Fi=k.useMemo(()=>{var ne;let $e=[{name:"arrow",enabled:!!Pe,options:{element:Pe,padding:4}}];return(ne=q.popperOptions)!=null&&ne.modifiers&&($e=$e.concat(q.popperOptions.modifiers)),N({},q.popperOptions,{modifiers:$e})},[Pe,q]),Kt=N({},C,{isRtl:Oe,arrow:P,disableInteractive:Qe,placement:Y,PopperComponentProp:L,touch:_e.current}),Er=yf(Kt),Bo=(r=(o=ee.popper)!=null?o:B.Popper)!=null?r:wf,Lo=(s=(i=(l=ee.transition)!=null?l:B.Transition)!=null?i:A)!=null?s:Gr,Vo=(c=(u=ee.tooltip)!=null?u:B.Tooltip)!=null?c:xf,Fo=(d=(h=ee.arrow)!=null?h:B.Arrow)!=null?d:Ef,zi=an(Bo,N({},q,(f=J.popper)!=null?f:z.popper,{className:Ne(Er.popper,q==null?void 0:q.className,(b=(y=J.popper)!=null?y:z.popper)==null?void 0:b.className)}),Kt),Ui=an(Lo,N({},te,(v=J.transition)!=null?v:z.transition),Kt),Hi=an(Vo,N({},(m=J.tooltip)!=null?m:z.tooltip,{className:Ne(Er.tooltip,(E=(_=J.tooltip)!=null?_:z.tooltip)==null?void 0:E.className)}),Kt),qi=an(Fo,N({},(w=J.arrow)!=null?w:z.arrow,{className:Ne(Er.arrow,(x=(g=J.arrow)!=null?g:z.arrow)==null?void 0:x.className)}),Kt);return p.jsxs(k.Fragment,{children:[k.cloneElement(se,Le),p.jsx(Bo,N({as:L??Ka,placement:Y,anchorEl:Z?{getBoundingClientRect:()=>({top:tn.y,left:tn.x,right:tn.x,bottom:tn.y,width:0,height:0})}:we,popperRef:wr,open:we?et:!1,id:vr,transition:!0},Gt,zi,{popperOptions:Fi,children:({TransitionProps:ne})=>p.jsx(Lo,N({timeout:Ee.transitions.duration.shorter},ne,Ui,{children:p.jsxs(Vo,N({},Hi,{children:[oe,P?p.jsx(Fo,N({},qi,{ref:Ze})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Ja.propTypes={arrow:a.bool,children:kn.isRequired,classes:a.object,className:a.string,components:a.shape({Arrow:a.elementType,Popper:a.elementType,Tooltip:a.elementType,Transition:a.elementType}),componentsProps:a.shape({arrow:a.object,popper:a.object,tooltip:a.object,transition:a.object}),describeChild:a.bool,disableFocusListener:a.bool,disableHoverListener:a.bool,disableInteractive:a.bool,disableTouchListener:a.bool,enterDelay:a.number,enterNextDelay:a.number,enterTouchDelay:a.number,followCursor:a.bool,id:a.string,leaveDelay:a.number,leaveTouchDelay:a.number,onClose:a.func,onOpen:a.func,open:a.bool,placement:a.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:a.elementType,PopperProps:a.object,slotProps:a.shape({arrow:a.object,popper:a.object,tooltip:a.object,transition:a.object}),slots:a.shape({arrow:a.elementType,popper:a.elementType,tooltip:a.elementType,transition:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),title:a.node,TransitionComponent:a.elementType,TransitionProps:a.object});const Tf=Ja;var ko={},Za={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Za);var kf=Za.exports,Ir={};function Nf(e){return Je("MuiSvgIcon",e)}pt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Sf=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Cf=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Ge(t)}`,`fontSize${Ge(n)}`]};return st(o,Nf,r)},Of=Ce("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Ge(n.color)}`],t[`fontSize${Ge(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,s,i,l,c,u,d,h,f,b,y;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((s=e.typography)==null||(i=s.pxToRem)==null?void 0:i.call(s,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((u=e.typography)==null||(d=u.pxToRem)==null?void 0:d.call(u,35))||"2.1875rem"}[t.fontSize],color:(h=(f=(e.vars||e).palette)==null||(f=f[t.color])==null?void 0:f.main)!=null?h:{action:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.active,disabled:(y=(e.vars||e).palette)==null||(y=y.action)==null?void 0:y.disabled,inherit:void 0}[t.color]}}),No=k.forwardRef(function(t,n){const r=at({props:t,name:"MuiSvgIcon"}),{children:o,className:s,color:i="inherit",component:l="svg",fontSize:c="medium",htmlColor:u,inheritViewBox:d=!1,titleAccess:h,viewBox:f="0 0 24 24"}=r,b=ue(r,Sf),y=k.isValidElement(o)&&o.type==="svg",v=N({},r,{color:i,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:d,viewBox:f,hasSvgAsChild:y}),m={};d||(m.viewBox=f);const E=Cf(v);return p.jsxs(Of,N({as:l,className:Ne(E.root,s),focusable:"false",color:u,"aria-hidden":h?void 0:!0,role:h?"img":void 0,ref:n},m,b,y&&o.props,{ownerState:v,children:[y?o.props.children:o,h?p.jsx("title",{children:h}):null]}))});process.env.NODE_ENV!=="production"&&(No.propTypes={children:a.node,classes:a.object,className:a.string,color:a.oneOfType([a.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),a.string]),component:a.elementType,fontSize:a.oneOfType([a.oneOf(["inherit","large","medium","small"]),a.string]),htmlColor:a.string,inheritViewBox:a.bool,shapeRendering:a.string,sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),titleAccess:a.string,viewBox:a.string});No.muiName="SvgIcon";const Ms=No;function Qa(e,t){function n(r,o){return p.jsx(Ms,N({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Ms.muiName,k.memo(k.forwardRef(n))}const Pf={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Ta.configure(e)}},Rf=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Ge,createChainedFunction:Fr,createSvgIcon:Qa,debounce:ha,deprecatedPropType:nc,isMuiElement:rc,ownerDocument:Se,ownerWindow:Lt,requirePropFactory:oc,setRef:Xn,unstable_ClassNameGenerator:Pf,unstable_useEnhancedEffect:kt,unstable_useId:ma,unsupportedProp:ic,useControlled:ga,useEventCallback:bn,useForkRef:ze,useIsFocusVisible:ba},Symbol.toStringTag,{value:"Module"})),jf=$l(Rf);var Is;function Mf(){return Is||(Is=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=jf}(Ir)),Ir}var If=kf;Object.defineProperty(ko,"__esModule",{value:!0});var ei=ko.default=void 0,_f=If(Mf()),$f=p;ei=ko.default=(0,_f.default)((0,$f.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function _s(e,t,n){return e?p.jsx(ve.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:p.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function So(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:s=void 0,iconPathAfter:i=void 0,hasAutoFocus:l=!1,className:c,isDisabled:u=!1,isDense:d=!0,isSubMenuParent:h=!1,hasDisabledGutters:f=!1,hasDivider:b=!1,focusVisibleClassName:y,id:v,children:m}=e,E=p.jsx(ve.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:u,dense:d,disableGutters:f,divider:b,focusVisibleClassName:y,onClick:t,id:v,children:n?p.jsxs(p.Fragment,{children:[_s(s,n,!0),p.jsx(ve.ListItemText,{primary:n,inset:!s&&o}),h?p.jsx(ve.ListItemIcon,{className:"papi-menu-icon-trailing",children:p.jsx(ei,{})}):_s(i,n,!1)]}):m});return r?p.jsx(Tf,{title:r,placement:"right",children:p.jsx("div",{children:E})}):E}function ti(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Af(e){const[t,n]=T.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:s}=e,i=u=>{n(u.currentTarget)},l=()=>{n(void 0)},c=()=>{let u=ti(s).filter(d=>"menuItem"in d.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return u=u.filter(d=>"menuItem"in d.group&&d.group.menuItem===r.id),p.jsx(Co,{...e,includedGroups:u})};return p.jsxs(p.Fragment,{children:[p.jsx(So,{onClick:i,...o,isSubMenuParent:!0}),p.jsx(ve.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Df=(e,t)=>t.filter(o=>o.group===e).sort((o,s)=>(o.order||0)-(s.order||0));function Co(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:s,allowForLeadingIcons:i}=T.useMemo(()=>{const d=o&&o.length>0?o:ti(t).filter(y=>!("menuItem"in y.group)),h=Object.values(d).sort((y,v)=>(y.group.order||0)-(v.group.order||0)),f=[];h.forEach(y=>{Df(y.id,t.items).forEach(v=>f.push({item:v,isLastItemInGroup:!1})),f.length>0&&(f[f.length-1].isLastItemInGroup=!0)}),f.length>0&&(f[f.length-1].isLastItemInGroup=!1);const b=f.some(y=>"iconPathBefore"in y.item&&y.item.iconPathBefore);return{items:f,allowForLeadingIcons:b}},[o,t]),l=({item:d,isLastItemInGroup:h})=>({className:"papi-menu-item",label:d.label,tooltip:d.tooltip,iconPathBefore:"iconPathBefore"in d?d.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in d?d.iconPathAfter:void 0,hasDivider:h,allowForLeadingIcons:i}),[c]=s;if(!c)return p.jsx("div",{});const u=c.item.group;return p.jsx("div",{role:"menu","aria-label":u,children:s.map((d,h)=>{const{item:f}=d,b=l(d);if("command"in f){const y=f.group+h;return p.jsx(So,{onClick:v=>{n==null||n(v),r(f)},...b},y)}return p.jsx(Af,{parentMenuItem:f,parentItemProps:b,...e},u+f.id)})},u)}function Bf(e){const{menuDefinition:t,columnId:n}=e;let s=Object.entries(t.groups).map(([i,l])=>({id:i,group:l})).filter(i=>"column"in i.group);return n&&"columns"in t&&t.columns[n]&&(s=s.filter(i=>"column"in i.group&&i.group.column===n)),p.jsx(Co,{...e,includedGroups:s})}function Lf({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:s}){return p.jsxs(ve.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${s??""}`,children:[p.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${s??""}`,children:r.label}),p.jsx(ve.List,{id:n,dense:!0,className:s??"",children:p.jsx(Bf,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function ni({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,s=T.useMemo(()=>{const i=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,u=o[c];typeof u=="object"&&typeof u.order=="number"&&!Number.isNaN(u.order)?i.set(u.order,{id:c,metadata:u}):console.warn(`Property ${l} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(i.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return p.jsx(ve.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:s.length,role:"menu","aria-label":"GridMenu",id:r,children:s.map((i,l)=>p.jsx(Lf,{commandHandler:e,menuDefinition:n,...i,className:t},l))})}const ri=k.createContext({});process.env.NODE_ENV!=="production"&&(ri.displayName="ListContext");const Vf=ri;function Ff(e){return Je("MuiList",e)}pt("MuiList",["root","padding","dense","subheader"]);const zf=["children","className","component","dense","disablePadding","subheader"],Uf=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return st({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},Ff,t)},Hf=Ce("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>N({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),oi=k.forwardRef(function(t,n){const r=at({props:t,name:"MuiList"}),{children:o,className:s,component:i="ul",dense:l=!1,disablePadding:c=!1,subheader:u}=r,d=ue(r,zf),h=k.useMemo(()=>({dense:l}),[l]),f=N({},r,{component:i,dense:l,disablePadding:c}),b=Uf(f);return p.jsx(Vf.Provider,{value:h,children:p.jsxs(Hf,N({as:i,className:Ne(b.root,s),ref:n,ownerState:f},d,{children:[u,o]}))})});process.env.NODE_ENV!=="production"&&(oi.propTypes={children:a.node,classes:a.object,className:a.string,component:a.elementType,dense:a.bool,disablePadding:a.bool,subheader:a.node,sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object])});const qf=oi,Wf=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function _r(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function $s(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function si(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function nn(e,t,n,r,o,s){let i=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(i)return!1;i=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!si(l,s)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const ai=k.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:s=!1,children:i,className:l,disabledItemsFocusable:c=!1,disableListWrap:u=!1,onKeyDown:d,variant:h="selectedMenu"}=t,f=ue(t,Wf),b=k.useRef(null),y=k.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});kt(()=>{o&&b.current.focus()},[o]),k.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(w,x)=>{const g=!b.current.style.width;if(w.clientHeight<b.current.clientHeight&&g){const C=`${va(Se(w))}px`;b.current.style[x.direction==="rtl"?"paddingLeft":"paddingRight"]=C,b.current.style.width=`calc(100% + ${C})`}return b.current}}),[]);const v=w=>{const x=b.current,g=w.key,C=Se(x).activeElement;if(g==="ArrowDown")w.preventDefault(),nn(x,C,u,c,_r);else if(g==="ArrowUp")w.preventDefault(),nn(x,C,u,c,$s);else if(g==="Home")w.preventDefault(),nn(x,null,u,c,_r);else if(g==="End")w.preventDefault(),nn(x,null,u,c,$s);else if(g.length===1){const P=y.current,F=g.toLowerCase(),B=performance.now();P.keys.length>0&&(B-P.lastTime>500?(P.keys=[],P.repeating=!0,P.previousKeyMatched=!0):P.repeating&&F!==P.keys[0]&&(P.repeating=!1)),P.lastTime=B,P.keys.push(F);const z=C&&!P.repeating&&si(C,P);P.previousKeyMatched&&(z||nn(x,C,!1,c,_r,P))?w.preventDefault():P.previousKeyMatched=!1}d&&d(w)},m=ze(b,n);let E=-1;k.Children.forEach(i,(w,x)=>{if(!k.isValidElement(w)){E===x&&(E+=1,E>=i.length&&(E=-1));return}process.env.NODE_ENV!=="production"&&Wn.isFragment(w)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),w.props.disabled||(h==="selectedMenu"&&w.props.selected||E===-1)&&(E=x),E===x&&(w.props.disabled||w.props.muiSkipListHighlight||w.type.muiSkipListHighlight)&&(E+=1,E>=i.length&&(E=-1))});const _=k.Children.map(i,(w,x)=>{if(x===E){const g={};return s&&(g.autoFocus=!0),w.props.tabIndex===void 0&&h==="selectedMenu"&&(g.tabIndex=0),k.cloneElement(w,g)}return w});return p.jsx(qf,N({role:"menu",ref:m,className:l,onKeyDown:v,tabIndex:o?0:-1},f,{children:_}))});process.env.NODE_ENV!=="production"&&(ai.propTypes={autoFocus:a.bool,autoFocusItem:a.bool,children:a.node,className:a.string,disabledItemsFocusable:a.bool,disableListWrap:a.bool,onKeyDown:a.func,variant:a.oneOf(["menu","selectedMenu"])});const Xf=ai,Yf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Gf={entering:{opacity:1},entered:{opacity:1}},ii=k.forwardRef(function(t,n){const r=Rn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:s,appear:i=!0,children:l,easing:c,in:u,onEnter:d,onEntered:h,onEntering:f,onExit:b,onExited:y,onExiting:v,style:m,timeout:E=o,TransitionComponent:_=Xa}=t,w=ue(t,Yf),x=k.useRef(null),g=ze(x,l.ref,n),C=V=>U=>{if(V){const M=x.current;U===void 0?V(M):V(M,U)}},P=C(f),F=C((V,U)=>{Ya(V);const M=Qn({style:m,timeout:E,easing:c},{mode:"enter"});V.style.webkitTransition=r.transitions.create("opacity",M),V.style.transition=r.transitions.create("opacity",M),d&&d(V,U)}),B=C(h),z=C(v),O=C(V=>{const U=Qn({style:m,timeout:E,easing:c},{mode:"exit"});V.style.webkitTransition=r.transitions.create("opacity",U),V.style.transition=r.transitions.create("opacity",U),b&&b(V)}),I=C(y),j=V=>{s&&s(x.current,V)};return p.jsx(_,N({appear:i,in:u,nodeRef:x,onEnter:F,onEntered:B,onEntering:P,onExit:O,onExited:I,onExiting:z,addEndListener:j,timeout:E},w,{children:(V,U)=>k.cloneElement(l,N({style:N({opacity:0,visibility:V==="exited"&&!u?"hidden":void 0},Gf[V],m,l.props.style),ref:g},U))}))});process.env.NODE_ENV!=="production"&&(ii.propTypes={addEndListener:a.func,appear:a.bool,children:kn.isRequired,easing:a.oneOfType([a.shape({enter:a.string,exit:a.string}),a.string]),in:a.bool,onEnter:a.func,onEntered:a.func,onEntering:a.func,onExit:a.func,onExited:a.func,onExiting:a.func,style:a.object,timeout:a.oneOfType([a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})])});const Kf=ii;function Jf(e){return Je("MuiBackdrop",e)}pt("MuiBackdrop",["root","invisible"]);const Zf=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Qf=e=>{const{classes:t,invisible:n}=e;return st({root:["root",n&&"invisible"]},Jf,t)},eh=Ce("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>N({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),li=k.forwardRef(function(t,n){var r,o,s;const i=at({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:u="div",components:d={},componentsProps:h={},invisible:f=!1,open:b,slotProps:y={},slots:v={},TransitionComponent:m=Kf,transitionDuration:E}=i,_=ue(i,Zf),w=N({},i,{component:u,invisible:f}),x=Qf(w),g=(r=y.root)!=null?r:h.root;return p.jsx(m,N({in:b,timeout:E},_,{children:p.jsx(eh,N({"aria-hidden":!0},g,{as:(o=(s=v.root)!=null?s:d.Root)!=null?o:u,className:Ne(x.root,c,g==null?void 0:g.className),ownerState:N({},w,g==null?void 0:g.ownerState),classes:x,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(li.propTypes={children:a.node,classes:a.object,className:a.string,component:a.elementType,components:a.shape({Root:a.elementType}),componentsProps:a.shape({root:a.object}),invisible:a.bool,open:a.bool.isRequired,slotProps:a.shape({root:a.object}),slots:a.shape({root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),TransitionComponent:a.elementType,transitionDuration:a.oneOfType([a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})])});const th=li;function nh(e){return Je("MuiModal",e)}pt("MuiModal",["root","hidden","backdrop"]);const rh=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],oh=e=>{const{open:t,exited:n,classes:r}=e;return st({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},nh,r)},sh=Ce("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>N({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),ah=Ce(th,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),ci=k.forwardRef(function(t,n){var r,o,s,i,l,c;const u=at({name:"MuiModal",props:t}),{BackdropComponent:d=ah,BackdropProps:h,className:f,closeAfterTransition:b=!1,children:y,container:v,component:m,components:E={},componentsProps:_={},disableAutoFocus:w=!1,disableEnforceFocus:x=!1,disableEscapeKeyDown:g=!1,disablePortal:C=!1,disableRestoreFocus:P=!1,disableScrollLock:F=!1,hideBackdrop:B=!1,keepMounted:z=!1,onBackdropClick:O,open:I,slotProps:j,slots:V}=u,U=ue(u,rh),M=N({},u,{closeAfterTransition:b,disableAutoFocus:w,disableEnforceFocus:x,disableEscapeKeyDown:g,disablePortal:C,disableRestoreFocus:P,disableScrollLock:F,hideBackdrop:B,keepMounted:z}),{getRootProps:H,getBackdropProps:Q,getTransitionProps:Z,portalRef:S,isTopModal:$,exited:D,hasTransition:X}=Yc(N({},M,{rootRef:n})),W=N({},M,{exited:D}),G=oh(W),Y={};if(y.props.tabIndex===void 0&&(Y.tabIndex="-1"),X){const{onEnter:te,onExited:R}=Z();Y.onEnter=te,Y.onExited=R}const L=(r=(o=V==null?void 0:V.root)!=null?o:E.Root)!=null?r:sh,q=(s=(i=V==null?void 0:V.backdrop)!=null?i:E.Backdrop)!=null?s:d,J=(l=j==null?void 0:j.root)!=null?l:_.root,ee=(c=j==null?void 0:j.backdrop)!=null?c:_.backdrop,oe=Nt({elementType:L,externalSlotProps:J,externalForwardedProps:U,getSlotProps:H,additionalProps:{ref:n,as:m},ownerState:W,className:Ne(f,J==null?void 0:J.className,G==null?void 0:G.root,!W.open&&W.exited&&(G==null?void 0:G.hidden))}),A=Nt({elementType:q,externalSlotProps:ee,additionalProps:h,getSlotProps:te=>Q(N({},te,{onClick:R=>{O&&O(R),te!=null&&te.onClick&&te.onClick(R)}})),className:Ne(ee==null?void 0:ee.className,h==null?void 0:h.className,G==null?void 0:G.backdrop),ownerState:W});return!z&&!I&&(!X||D)?null:p.jsx(vn,{ref:S,container:v,disablePortal:C,children:p.jsxs(L,N({},oe,{children:[!B&&d?p.jsx(q,N({},A)):null,p.jsx(Yn,{disableEnforceFocus:x,disableAutoFocus:w,disableRestoreFocus:P,isEnabled:$,open:I,children:k.cloneElement(y,Y)})]}))})});process.env.NODE_ENV!=="production"&&(ci.propTypes={BackdropComponent:a.elementType,BackdropProps:a.object,children:kn.isRequired,classes:a.object,className:a.string,closeAfterTransition:a.bool,component:a.elementType,components:a.shape({Backdrop:a.elementType,Root:a.elementType}),componentsProps:a.shape({backdrop:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),container:a.oneOfType([nt,a.func]),disableAutoFocus:a.bool,disableEnforceFocus:a.bool,disableEscapeKeyDown:a.bool,disablePortal:a.bool,disableRestoreFocus:a.bool,disableScrollLock:a.bool,hideBackdrop:a.bool,keepMounted:a.bool,onBackdropClick:a.func,onClose:a.func,onTransitionEnter:a.func,onTransitionExited:a.func,open:a.bool.isRequired,slotProps:a.shape({backdrop:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),slots:a.shape({backdrop:a.elementType,root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object])});const ih=ci;function lh(e){return Je("MuiPaper",e)}pt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const ch=["className","component","elevation","square","variant"],ph=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,s={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return st(s,lh,o)},uh=Ce("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return N({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&N({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${Zn("#fff",Rs(t.elevation))}, ${Zn("#fff",Rs(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),pi=k.forwardRef(function(t,n){const r=at({props:t,name:"MuiPaper"}),{className:o,component:s="div",elevation:i=1,square:l=!1,variant:c="elevation"}=r,u=ue(r,ch),d=N({},r,{component:s,elevation:i,square:l,variant:c}),h=ph(d);return process.env.NODE_ENV!=="production"&&Rn().shadows[i]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${i}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${i}]\` is defined.`].join(`
`)),p.jsx(uh,N({as:s,ownerState:d,className:Ne(h.root,o),ref:n},u))});process.env.NODE_ENV!=="production"&&(pi.propTypes={children:a.node,classes:a.object,className:a.string,component:a.elementType,elevation:qt(xa,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:a.bool,sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),variant:a.oneOfType([a.oneOf(["elevation","outlined"]),a.string])});const dh=pi;function fh(e){return Je("MuiPopover",e)}pt("MuiPopover",["root","paper"]);const hh=["onEntering"],mh=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],gh=["slotProps"];function As(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function Ds(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function Bs(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function Un(e){return typeof e=="function"?e():e}const bh=e=>{const{classes:t}=e;return st({root:["root"],paper:["paper"]},fh,t)},vh=Ce(ih,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),ui=Ce(dh,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),di=k.forwardRef(function(t,n){var r,o,s;const i=at({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:u={vertical:"top",horizontal:"left"},anchorPosition:d,anchorReference:h="anchorEl",children:f,className:b,container:y,elevation:v=8,marginThreshold:m=16,open:E,PaperProps:_={},slots:w,slotProps:x,transformOrigin:g={vertical:"top",horizontal:"left"},TransitionComponent:C=Gr,transitionDuration:P="auto",TransitionProps:{onEntering:F}={},disableScrollLock:B=!1}=i,z=ue(i.TransitionProps,hh),O=ue(i,mh),I=(r=x==null?void 0:x.paper)!=null?r:_,j=k.useRef(),V=ze(j,I.ref),U=N({},i,{anchorOrigin:u,anchorReference:h,elevation:v,marginThreshold:m,externalPaperSlotProps:I,transformOrigin:g,TransitionComponent:C,transitionDuration:P,TransitionProps:z}),M=bh(U),H=k.useCallback(()=>{if(h==="anchorPosition")return process.env.NODE_ENV!=="production"&&(d||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),d;const te=Un(c),R=te&&te.nodeType===1?te:Se(j.current).body,se=R.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Ee=R.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Ee.top===0&&Ee.left===0&&Ee.right===0&&Ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:se.top+As(se,u.vertical),left:se.left+Ds(se,u.horizontal)}},[c,u.horizontal,u.vertical,d,h]),Q=k.useCallback(te=>({vertical:As(te,g.vertical),horizontal:Ds(te,g.horizontal)}),[g.horizontal,g.vertical]),Z=k.useCallback(te=>{const R={width:te.offsetWidth,height:te.offsetHeight},se=Q(R);if(h==="none")return{top:null,left:null,transformOrigin:Bs(se)};const Ee=H();let Oe=Ee.top-se.vertical,we=Ee.left-se.horizontal;const ft=Oe+R.height,Pe=we+R.width,Ze=Lt(Un(c)),_e=Ze.innerHeight-m,Qe=Ze.innerWidth-m;if(m!==null&&Oe<m){const Te=Oe-m;Oe-=Te,se.vertical+=Te}else if(m!==null&&ft>_e){const Te=ft-_e;Oe-=Te,se.vertical+=Te}if(process.env.NODE_ENV!=="production"&&R.height>_e&&R.height&&_e&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${R.height-_e}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),m!==null&&we<m){const Te=we-m;we-=Te,se.horizontal+=Te}else if(Pe>Qe){const Te=Pe-Qe;we-=Te,se.horizontal+=Te}return{top:`${Math.round(Oe)}px`,left:`${Math.round(we)}px`,transformOrigin:Bs(se)}},[c,h,H,Q,m]),[S,$]=k.useState(E),D=k.useCallback(()=>{const te=j.current;if(!te)return;const R=Z(te);R.top!==null&&(te.style.top=R.top),R.left!==null&&(te.style.left=R.left),te.style.transformOrigin=R.transformOrigin,$(!0)},[Z]);k.useEffect(()=>(B&&window.addEventListener("scroll",D),()=>window.removeEventListener("scroll",D)),[c,B,D]);const X=(te,R)=>{F&&F(te,R),D()},W=()=>{$(!1)};k.useEffect(()=>{E&&D()}),k.useImperativeHandle(l,()=>E?{updatePosition:()=>{D()}}:null,[E,D]),k.useEffect(()=>{if(!E)return;const te=ha(()=>{D()}),R=Lt(c);return R.addEventListener("resize",te),()=>{te.clear(),R.removeEventListener("resize",te)}},[c,E,D]);let G=P;P==="auto"&&!C.muiSupportAuto&&(G=void 0);const Y=y||(c?Se(Un(c)).body:void 0),L=(o=w==null?void 0:w.root)!=null?o:vh,q=(s=w==null?void 0:w.paper)!=null?s:ui,J=Nt({elementType:q,externalSlotProps:N({},I,{style:S?I.style:N({},I.style,{opacity:0})}),additionalProps:{elevation:v,ref:V},ownerState:U,className:Ne(M.paper,I==null?void 0:I.className)}),ee=Nt({elementType:L,externalSlotProps:(x==null?void 0:x.root)||{},externalForwardedProps:O,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:Y,open:E},ownerState:U,className:Ne(M.root,b)}),{slotProps:oe}=ee,A=ue(ee,gh);return p.jsx(L,N({},A,!Na(L)&&{slotProps:oe,disableScrollLock:B},{children:p.jsx(C,N({appear:!0,in:E,onEntering:X,onExited:W,timeout:G},z,{children:p.jsx(q,N({},J,{children:f}))}))}))});process.env.NODE_ENV!=="production"&&(di.propTypes={action:ao,anchorEl:qt(a.oneOfType([nt,a.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=Un(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:a.shape({horizontal:a.oneOfType([a.oneOf(["center","left","right"]),a.number]).isRequired,vertical:a.oneOfType([a.oneOf(["bottom","center","top"]),a.number]).isRequired}),anchorPosition:a.shape({left:a.number.isRequired,top:a.number.isRequired}),anchorReference:a.oneOf(["anchorEl","anchorPosition","none"]),children:a.node,classes:a.object,className:a.string,container:a.oneOfType([nt,a.func]),disableScrollLock:a.bool,elevation:xa,marginThreshold:a.number,onClose:a.func,open:a.bool.isRequired,PaperProps:a.shape({component:Yl}),slotProps:a.shape({paper:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),slots:a.shape({paper:a.elementType,root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),transformOrigin:a.shape({horizontal:a.oneOfType([a.oneOf(["center","left","right"]),a.number]).isRequired,vertical:a.oneOfType([a.oneOf(["bottom","center","top"]),a.number]).isRequired}),TransitionComponent:a.elementType,transitionDuration:a.oneOfType([a.oneOf(["auto"]),a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})]),TransitionProps:a.object});const yh=di;function wh(e){return Je("MuiMenu",e)}pt("MuiMenu",["root","paper","list"]);const xh=["onEntering"],Eh=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Th={vertical:"top",horizontal:"right"},kh={vertical:"top",horizontal:"left"},Nh=e=>{const{classes:t}=e;return st({root:["root"],paper:["paper"],list:["list"]},wh,t)},Sh=Ce(yh,{shouldForwardProp:e=>qa(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ch=Ce(ui,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),Oh=Ce(Xf,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),fi=k.forwardRef(function(t,n){var r,o;const s=at({props:t,name:"MuiMenu"}),{autoFocus:i=!0,children:l,className:c,disableAutoFocusItem:u=!1,MenuListProps:d={},onClose:h,open:f,PaperProps:b={},PopoverClasses:y,transitionDuration:v="auto",TransitionProps:{onEntering:m}={},variant:E="selectedMenu",slots:_={},slotProps:w={}}=s,x=ue(s.TransitionProps,xh),g=ue(s,Eh),C=Rn(),P=C.direction==="rtl",F=N({},s,{autoFocus:i,disableAutoFocusItem:u,MenuListProps:d,onEntering:m,PaperProps:b,transitionDuration:v,TransitionProps:x,variant:E}),B=Nh(F),z=i&&!u&&f,O=k.useRef(null),I=(Z,S)=>{O.current&&O.current.adjustStyleForScrollbar(Z,C),m&&m(Z,S)},j=Z=>{Z.key==="Tab"&&(Z.preventDefault(),h&&h(Z,"tabKeyDown"))};let V=-1;k.Children.map(l,(Z,S)=>{k.isValidElement(Z)&&(process.env.NODE_ENV!=="production"&&Wn.isFragment(Z)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Z.props.disabled||(E==="selectedMenu"&&Z.props.selected||V===-1)&&(V=S))});const U=(r=_.paper)!=null?r:Ch,M=(o=w.paper)!=null?o:b,H=Nt({elementType:_.root,externalSlotProps:w.root,ownerState:F,className:[B.root,c]}),Q=Nt({elementType:U,externalSlotProps:M,ownerState:F,className:B.paper});return p.jsx(Sh,N({onClose:h,anchorOrigin:{vertical:"bottom",horizontal:P?"right":"left"},transformOrigin:P?Th:kh,slots:{paper:U,root:_.root},slotProps:{root:H,paper:Q},open:f,ref:n,transitionDuration:v,TransitionProps:N({onEntering:I},x),ownerState:F},g,{classes:y,children:p.jsx(Oh,N({onKeyDown:j,actions:O,autoFocus:i&&(V===-1||u),autoFocusItem:z,variant:E},d,{className:Ne(B.list,d.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(fi.propTypes={anchorEl:a.oneOfType([nt,a.func]),autoFocus:a.bool,children:a.node,classes:a.object,className:a.string,disableAutoFocusItem:a.bool,MenuListProps:a.object,onClose:a.func,open:a.bool.isRequired,PaperProps:a.object,PopoverClasses:a.object,slotProps:a.shape({paper:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),slots:a.shape({paper:a.elementType,root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),transitionDuration:a.oneOfType([a.oneOf(["auto"]),a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})]),TransitionProps:a.object,variant:a.oneOf(["menu","selectedMenu"])});const Ph=fi;function Rh({className:e,commandHandler:t,menuDefinition:n,children:r}){var u;const[o,s]=T.useState(void 0),i=T.useCallback(d=>{d.preventDefault(),s(o===void 0?{mouseX:d.clientX+2,mouseY:d.clientY-6}:void 0)},[o]),l=T.useCallback(()=>{s(void 0)},[]),c=T.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((u=n==null?void 0:n.items)==null?void 0:u.length)??0)===0||!r?r:p.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:i,children:[r,p.jsx(Ph,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:p.jsx(Co,{menuDefinition:n,commandHandler:t,onClick:l})})]})}const jh=Qa(p.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Mh(e){return{preserveValue:!0,...e}}const er=(e,t,n={})=>{const r=T.useRef(t);r.current=t;const o=T.useRef(n);o.current=Mh(o.current);const[s,i]=T.useState(()=>r.current),[l,c]=T.useState(!0);return T.useEffect(()=>{let u=!0;return c(!!e),(async()=>{if(e){const d=await e();u&&(i(()=>d),c(!1))}})(),()=>{u=!1,o.current.preserveValue||i(()=>r.current)}},[e]),[s,l]};function hi({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:s,ariaLabelPrefix:i,children:l}){const[c,u]=T.useState(!1),[d,h]=T.useState(!1),f=T.useCallback(()=>{c&&u(!1),h(!1)},[c]),b=T.useCallback(x=>{x.stopPropagation(),u(g=>{const C=!g;return C&&x.shiftKey?h(!0):C||h(!1),C})},[]),y=T.useCallback(x=>(f(),r(x)),[r,f]),[v,m]=T.useState({top:1,left:1});T.useEffect(()=>{if(c){const x=o==null?void 0:o.current;if(x){const g=x.getBoundingClientRect(),C=window.scrollY,P=window.scrollX,F=g.top+C+x.clientHeight,B=g.left+P;m({top:F,left:B})}}},[c,o]);const[E]=er(T.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[_]=er(T.useCallback(async()=>(e==null?void 0:e(!0))??n??E,[e,n,E,c]),n??E),w=d&&_?_:E;return p.jsxs(p.Fragment,{children:[p.jsx(ve.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${s??""}`,color:"inherit","aria-label":`${i??""} menu button`,onClick:b,children:l??p.jsx(jh,{})}),p.jsx(ve.Drawer,{className:`papi-menu-drawer ${s??""}`,anchor:"left",variant:"temporary",open:c,onClose:f,PaperProps:{className:"papi-menu-drawer-paper",style:{top:v.top,left:v.left}},children:w?p.jsx(ni,{className:s,id:`${i??""} main menu`,commandHandler:y,multiColumnMenu:w}):void 0})]})}function Ih({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:s=!1,size:i="medium",className:l,onClick:c,children:u}){return p.jsx(ve.IconButton,{id:e,disabled:n,edge:s,size:i,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:u})}const _h=Kr.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),mi=T.forwardRef(({className:e,...t},n)=>p.jsx(zs.Root,{ref:n,className:K(_h(),e),...t}));mi.displayName=zs.Root.displayName;function gi({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:s,placeholder:i,isRequired:l=!1,className:c,defaultValue:u,value:d,onChange:h,onFocus:f,onBlur:b}){return p.jsxs("div",{className:K("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":r}),children:[p.jsx(mi,{htmlFor:e,className:K({"pr-text-red-600":n,"pr-hidden":!s}),children:`${s}${l?"*":""}`}),p.jsx(Tn,{id:e,disabled:t,placeholder:i,required:l,className:K(c,{"pr-border-red-600":n}),defaultValue:u,value:d,onChange:h,onFocus:f,onBlur:b}),p.jsx("p",{className:K({"pr-hidden":!o}),children:o})]})}function $h({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=T.useState(""),s=i=>{o(i),e(i)};return p.jsx(gi,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:i=>s(i.target.value)})}function Ah({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:s=1,showMarks:i=!1,defaultValue:l,value:c,valueLabelDisplay:u="off",className:d,onChange:h,onChangeCommitted:f}){return p.jsx(ve.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:s,marks:i,defaultValue:l,value:c,valueLabelDisplay:u,className:`papi-slider ${n} ${d??""}`,onChange:h,onChangeCommitted:f})}function Dh({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:s={vertical:"bottom",horizontal:"left"},ContentProps:i,children:l}){const c={action:(i==null?void 0:i.action)||l,message:i==null?void 0:i.message,className:r};return p.jsx(ve.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:s,id:t,ContentProps:c})}function Bh({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:s}){return p.jsx(ve.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:s})}function Lh({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const s=T.useRef(void 0);return p.jsx("div",{ref:s,style:{position:"relative"},children:p.jsx(ve.AppBar,{position:"static",id:r,children:p.jsxs(ve.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?p.jsx(hi,{commandHandler:t,containerRef:s,menuProvider:e}):void 0,o?p.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Vh=Ie.Root,bi=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.List,{ref:n,className:K("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));bi.displayName=Ie.List.displayName;const vi=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Trigger,{ref:n,className:K("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));vi.displayName=Ie.Trigger.displayName;const yi=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Content,{ref:n,className:K("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));yi.displayName=Ie.Content.displayName;const wi=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Root,{orientation:"vertical",ref:n,className:K("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));wi.displayName=Ie.List.displayName;const xi=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.List,{ref:n,className:K("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));xi.displayName=Ie.List.displayName;const Fh=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Trigger,{ref:n,...t,className:K("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),Ei=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Content,{ref:n,className:K("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));Ei.displayName=Ie.Content.displayName;function zh({columns:e,tableData:t,onSelectItem:n}){const r=(o,s)=>{s.toggleAllRowsSelected(!1),o.toggleSelected(void 0),n(o.getValue("item"))};return p.jsx("div",{className:"pr-overflow-y-auto",children:p.jsx(sa,{columns:e,data:t,onRowClickHandler:r})})}const Ls=(e,t,n)=>{if(!e||e===""||t==="")return[];const r=[],o=e.split(`
`);let s="0",i="0",l=0;return o.forEach(c=>{const u=c.split(/\s+/);c.startsWith("\\c")&&([,s]=u,i="0"),c.startsWith("\\v")&&([,i]=u,s==="0"&&(s=n.chapterNum.toString()));for(let d=0;d<u.length;d++)if(u[d].includes(t)){const h=Math.max(0,d-2),f=Math.min(u.length,d+3),b=u.slice(h,f).join(" "),y={reference:{...n,chapterNum:+s,verseNum:+i},snippet:b,key:l};l+=1,r.push(y)}}),r};function Uh({selectedItem:e,text:t,scriptureReference:n,setScriptureReference:r,localizedStrings:o}){const s=o["%webView_inventory_occurrences_table_header_reference%"],i=o["%webView_inventory_occurrences_table_header_occurrence%"],[l,c]=T.useState(Ls(t,e,n));return T.useEffect(()=>c(Ls(t,e,n)),[t,e,n]),p.jsxs(rr,{children:[p.jsx(or,{children:p.jsxs(xt,{children:[p.jsx(hn,{children:s}),p.jsx(hn,{children:i})]})}),p.jsx(sr,{children:l.map(u=>p.jsxs(xt,{onClick:()=>{r(u.reference)},children:[p.jsx(Dt,{children:`${de.bookNumberToEnglishName(u.reference.bookNum)} ${u.reference.chapterNum}:${u.reference.verseNum}`}),p.jsx(Dt,{children:u.snippet})]},u.key))})]})}const Hh=(e,t,n,r,o)=>{const s=[];return e.forEach(i=>{if(n!==""&&!i.includes(n))return;const l=s.find(c=>c.item===i);if(l)l.count+=1;else{let c;if(r.includes(i)&&(c=!0),o.includes(i)&&(c=!1),t==="all"||t==="approved"&&c===!0||t==="unapproved"&&c===!1||t==="unknown"&&c===void 0){const u={item:i,count:1,status:c};s.push(u)}}}),s};function qh({scriptureReference:e,setScriptureReference:t,localizedStrings:n,projectId:r,getSetting:o,setSetting:s,getText:i,approvedItemsKey:l,unapprovedItemsKey:c,convertTextToItems:u,columns:d}){const h=n["%webView_inventory_all%"],f=n["%webView_inventory_approved%"],b=n["%webView_inventory_unapproved%"],y=n["%webView_inventory_unknown%"],v=n["%webView_inventory_scope_book%"],m=n["%webView_inventory_scope_chapter%"],E=n["%webView_inventory_scope_verse%"],_=n["%webView_inventory_filter_text%"],[w,x]=T.useState([]),[g,C]=T.useState([]),[P,F]=T.useState(""),[B,z]=T.useState([]),[O,I]=T.useState("book"),[j,V]=T.useState("all"),[U,M]=T.useState(""),[H,Q]=T.useState([]),[Z,S]=T.useState(""),$=(D,X)=>{Q(W=>{let G=[];return D.forEach(Y=>{G=W.map(L=>L.item===Y&&L.status!==X?{...L,status:X}:L)}),x(Y=>{let L=[...Y];return D.forEach(q=>{X===!0?L.includes(q)||L.push(q):L=L.filter(J=>J!==q)}),s(l,r,L),L}),C(Y=>{let L=[...Y];return D.forEach(q=>{X===!1?L.includes(q)||L.push(q):L=L.filter(J=>J!==q)}),s(c,r,L),L}),G})};return T.useEffect(()=>{(async()=>{try{x(await o(l,r)),C(await o(c,r))}catch{throw new Error("Failed to fetch (un)approved items from project settings")}})()},[r,o,l,c]),T.useEffect(()=>{(async()=>{try{const X=await i(r,e,O);F(X||"")}catch{throw new Error("Failed getting scripture text")}})()},[r,e,O,i]),T.useEffect(()=>{z(u(P))},[u,P]),T.useEffect(()=>{if(B.length===0){Q([]);return}(()=>{try{Q(Hh(B,j,U,w,g))}catch{throw new Error("Failed building table data")}})()},[w,g,B,j,U]),p.jsxs("div",{className:"pr-twp pr-font-sans",children:[p.jsxs("div",{className:"pr-flex",children:[p.jsxs(Hn,{onValueChange:D=>V(D),defaultValue:j,children:[p.jsx(mn,{children:p.jsx(qn,{placeholder:"Select filter"})}),p.jsxs(gn,{className:"pr-font-sans",children:[p.jsx(We,{value:"all",children:h}),p.jsx(We,{value:"approved",children:f}),p.jsx(We,{value:"unapproved",children:b}),p.jsx(We,{value:"unknown",children:y})]})]}),p.jsxs(Hn,{onValueChange:D=>I(D),defaultValue:O,children:[p.jsx(mn,{children:p.jsx(qn,{placeholder:"Select scope"})}),p.jsxs(gn,{className:"pr-font-sans",children:[p.jsx(We,{value:"book",children:v}),p.jsx(We,{value:"chapter",children:m}),p.jsx(We,{value:"verse",children:E})]})]}),p.jsx(Tn,{className:"pr-rounded-md pr-border",placeholder:_,value:U,onChange:D=>{M(D.target.value)}})]}),p.jsx("div",{className:`pr-overflow-y-auto pr-rounded-md pr-border ${Z!==""&&"pr-max-h-96"}`,children:p.jsx(zh,{columns:d($),tableData:H,onSelectItem:D=>{S(D)}})}),Z!==""&&p.jsx("div",{className:"pr-mt-4 pr-rounded-md pr-border",children:p.jsx(Uh,{selectedItem:Z,text:P,scriptureReference:e,setScriptureReference:D=>t(D),localizedStrings:n})})]})}const Ln=e=>e==="asc"?p.jsx(fe.ArrowUpIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):e==="desc"?p.jsx(fe.ArrowDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):p.jsx(fe.ArrowUpDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}),Wh="validCharacters",Xh="invalidCharacters",Yh=(e,t,n,r,o)=>[{accessorKey:"item",header:({column:s})=>p.jsxs(ke,{onClick:()=>s.toggleSorting(void 0),children:[e,Ln(s.getIsSorted())]})},{accessorKey:"unicodeValue",header:({column:s})=>p.jsxs(ke,{onClick:()=>s.toggleSorting(void 0),children:[t,Ln(s.getIsSorted())]}),cell:({row:s})=>s.getValue("item").charCodeAt(0).toString(16).toUpperCase().padStart(4,"0")},{accessorKey:"count",header:({column:s})=>p.jsxs(ke,{onClick:()=>s.toggleSorting(void 0),children:[n,Ln(s.getIsSorted())]})},{accessorKey:"status",header:({column:s,table:i})=>{const l=i.getSelectedRowModel().rows,c=[];return l.forEach(u=>{c.push(u.getValue("item"))}),p.jsxs("div",{children:[p.jsx("div",{className:"pr-flex pr-justify-center",children:p.jsxs(ke,{onClick:()=>s.toggleSorting(void 0),children:[r,Ln(s.getIsSorted())]})}),p.jsxs("div",{className:"pr-flex pr-justify-center",children:[p.jsx(ke,{children:p.jsx(fe.CircleCheckIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,!0)}})}),p.jsx(ke,{children:p.jsx(fe.CircleXIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,!1)}})}),p.jsx(ke,{children:p.jsx(fe.CircleHelpIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,void 0)}})})]})]})},cell:({row:s})=>{const i=s.getValue("status");return i===!0?p.jsx(fe.CircleCheckIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):i===!1?p.jsx(fe.CircleXIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):p.jsx(fe.CircleHelpIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"})}}],Gh=e=>Vs.split(e,"");function Kh({scriptureReference:e,setScriptureReference:t,localizedStrings:n,projectId:r,getSetting:o,setSetting:s,getText:i}){const l=n["%webView_inventory_table_header_character%"],c=n["%webView_inventory_table_header_unicode_value%"],u=n["%webView_inventory_table_header_count%"],d=n["%webView_inventory_table_header_status%"],h=f=>Yh(l,c,u,d,f);return p.jsx("div",{className:"pr-twp pr-font-sans",children:p.jsx(qh,{projectId:r,localizedStrings:n,scriptureReference:e,setScriptureReference:t,approvedItemsKey:Wh,unapprovedItemsKey:Xh,convertTextToItems:Gh,getSetting:o,setSetting:s,getText:i,columns:h})})}const Jh=(e,t)=>{T.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},$r=()=>!1,Zh=(e,t)=>{const[n]=er(T.useCallback(async()=>{if(!e)return $r;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),$r,{preserveValue:!1});T.useEffect(()=>()=>{n!==$r&&n()},[n])},Ti=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:K("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));Ti.displayName="Card";const ki=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:K("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));ki.displayName="CardHeader";const Ni=T.forwardRef(({className:e,...t},n)=>p.jsx("h3",{ref:n,className:K("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));Ni.displayName="CardTitle";const Si=T.forwardRef(({className:e,...t},n)=>p.jsx("p",{ref:n,className:K("pr-text-sm pr-text-muted-foreground",e),...t}));Si.displayName="CardDescription";const Ci=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:K("pr-p-6 pr-pt-0",e),...t}));Ci.displayName="CardContent";const Oi=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:K("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));Oi.displayName="CardFooter";const Qh=Kr.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),Pi=T.forwardRef(({className:e,variant:t,...n},r)=>p.jsx("div",{ref:r,role:"alert",className:K(Qh({variant:t}),e),...n}));Pi.displayName="Alert";const Ri=T.forwardRef(({className:e,...t},n)=>p.jsxs("h5",{ref:n,className:K("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));Ri.displayName="AlertTitle";const ji=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:K("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));ji.displayName="AlertDescription";const Mi=T.forwardRef(({className:e,...t},n)=>p.jsxs(on.Root,{ref:n,className:K("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[p.jsx(on.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:p.jsx(on.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),p.jsx(on.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));Mi.displayName=on.Root.displayName;const Ii=T.forwardRef(({className:e,...t},n)=>p.jsx(Dr.Root,{className:K("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:n,children:p.jsx(Dr.Thumb,{className:K("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));Ii.displayName=Dr.Root.displayName;exports.Alert=Pi;exports.AlertDescription=ji;exports.AlertTitle=Ri;exports.BookChapterControl=Ol;exports.Button=ke;exports.Card=Ti;exports.CardContent=Ci;exports.CardDescription=Si;exports.CardFooter=Oi;exports.CardHeader=ki;exports.CardTitle=Ni;exports.ChapterRangeSelector=Ml;exports.CharacterInventory=Kh;exports.Checkbox=aa;exports.Checklist=Il;exports.ComboBox=Br;exports.ContextMenu=Rh;exports.DataTable=sa;exports.DropdownMenu=eo;exports.DropdownMenuCheckboxItem=no;exports.DropdownMenuContent=tr;exports.DropdownMenuGroup=fl;exports.DropdownMenuItem=to;exports.DropdownMenuLabel=En;exports.DropdownMenuPortal=hl;exports.DropdownMenuRadioGroup=gl;exports.DropdownMenuRadioItem=Zs;exports.DropdownMenuSeparator=nr;exports.DropdownMenuShortcut=Qs;exports.DropdownMenuSub=ml;exports.DropdownMenuSubContent=Js;exports.DropdownMenuSubTrigger=Ks;exports.DropdownMenuTrigger=Gs;exports.GridMenu=ni;exports.HamburgerMenuButton=hi;exports.IconButton=Ih;exports.Input=Tn;exports.LabelPosition=yt;exports.MenuItem=So;exports.SearchBar=$h;exports.Select=Hn;exports.SelectContent=gn;exports.SelectGroup=Pl;exports.SelectItem=We;exports.SelectLabel=ra;exports.SelectScrollDownButton=oo;exports.SelectScrollUpButton=ro;exports.SelectSeparator=oa;exports.SelectTrigger=mn;exports.SelectValue=qn;exports.ShadCnSlider=Mi;exports.ShadCnSwitch=Ii;exports.Slider=Ah;exports.Snackbar=Dh;exports.Switch=Bh;exports.Table=rr;exports.TableBody=sr;exports.TableCaption=ta;exports.TableCell=Dt;exports.TableFooter=ea;exports.TableHead=hn;exports.TableHeader=or;exports.TableRow=xt;exports.Tabs=Vh;exports.TabsContent=yi;exports.TabsList=bi;exports.TabsTrigger=vi;exports.TextField=gi;exports.Toolbar=Lh;exports.VerticalTabs=wi;exports.VerticalTabsContent=Ei;exports.VerticalTabsList=xi;exports.VerticalTabsTrigger=Fh;exports.buttonVariants=na;exports.useEvent=Jh;exports.useEventAsync=Zh;exports.usePromise=er;function em(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}em(`.papi-switch {
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
.check-item {
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
.pr-max-w-64 {
  max-width: 16rem;
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
.pr-text-nowrap {
  text-wrap: nowrap;
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
.pr-pt-0 {
  padding-top: 0px;
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
.pr-capitalize {
  text-transform: capitalize;
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
.pr-text-current {
  color: currentColor;
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
`,"top");
//# sourceMappingURL=index.cjs.map
