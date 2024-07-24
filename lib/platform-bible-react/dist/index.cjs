"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const u=require("react/jsx-runtime"),O=require("react"),pi=require("platform-bible-utils"),ui=require("@radix-ui/react-dropdown-menu"),se=require("lucide-react"),Se=require("clsx"),Al=require("tailwind-merge"),yt=require("@tanstack/react-table"),Dl=require("@radix-ui/react-slot"),po=require("class-variance-authority"),Bl=require("@radix-ui/react-select"),we=require("@mui/material"),Gr=require("@mui/styled-engine"),dn=require("react-dom"),Ll=require("@radix-ui/react-label"),Vl=require("@radix-ui/react-tabs"),Fl=require("@radix-ui/react-slider"),zl=require("@radix-ui/react-switch");function ft(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const k=ft(O),ge=ft(ui),xe=ft(Bl),Ul=ft(dn),di=ft(Ll),_e=ft(Vl),fn=ft(Fl),Yr=ft(zl);var Hl=Object.defineProperty,Wl=(e,t,n)=>t in e?Hl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t,n)=>Wl(e,typeof t!="symbol"?t+"":t,n);const Pt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],uo=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],fi=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],os=tc();function Jt(e,t=!0){return t&&(e=e.toUpperCase()),e in os?os[e]:0}function fo(e){return Jt(e)>0}function ql(e){const t=typeof e=="string"?Jt(e):e;return t>=40&&t<=66}function Xl(e){return(typeof e=="string"?Jt(e):e)<=39}function mi(e){return e<=66}function Gl(e){const t=typeof e=="string"?Jt(e):e;return bi(t)&&!mi(t)}function*Yl(){for(let e=1;e<=Pt.length;e++)yield e}const Kl=1,hi=Pt.length;function Jl(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function mo(e,t="***"){const n=e-1;return n<0||n>=Pt.length?t:Pt[n]}function gi(e){return e<=0||e>hi?"******":fi[e-1]}function Zl(e){return gi(Jt(e))}function bi(e){const t=typeof e=="number"?mo(e):e;return fo(t)&&!uo.includes(t)}function Ql(e){const t=typeof e=="number"?mo(e):e;return fo(t)&&uo.includes(t)}function ec(e){return fi[e-1].includes("*obsolete*")}function tc(){const e={};for(let t=0;t<Pt.length;t++)e[Pt[t]]=t+1;return e}const me={allBookIds:Pt,nonCanonicalIds:uo,bookIdToNumber:Jt,isBookIdValid:fo,isBookNT:ql,isBookOT:Xl,isBookOTNT:mi,isBookDC:Gl,allBookNumbers:Yl,firstBook:Kl,lastBook:hi,extraBooks:Jl,bookNumberToId:mo,bookNumberToEnglishName:gi,bookIdToEnglishName:Zl,isCanonical:bi,isExtraMaterial:Ql,isObsolete:ec};var Ge=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ge||{});const De=class{constructor(t){if(re(this,"name"),re(this,"fullPath"),re(this,"isPresent"),re(this,"hasVerseSegments"),re(this,"isCustomized"),re(this,"baseVersification"),re(this,"scriptureBooks"),re(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Ge[t]):(this._type=t,this.name=Ge[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};re(De,"Original",new De(Ge.Original)),re(De,"Septuagint",new De(Ge.Septuagint)),re(De,"Vulgate",new De(Ge.Vulgate)),re(De,"English",new De(Ge.English)),re(De,"RussianProtestant",new De(Ge.RussianProtestant)),re(De,"RussianOrthodox",new De(Ge.RussianOrthodox));let wt=De;function ss(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var vi=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(vi||{});const je=class le{constructor(t,n,r,o){if(re(this,"firstChapter"),re(this,"lastChapter"),re(this,"lastVerse"),re(this,"hasSegmentsDefined"),re(this,"text"),re(this,"BBBCCCVVVS"),re(this,"longHashCode"),re(this,"versification"),re(this,"rtlMark","‏"),re(this,"_bookNum",0),re(this,"_chapterNum",0),re(this,"_verseNum",0),re(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const s=t,i=n!=null&&n instanceof wt?n:void 0;this.setEmpty(i),this.parse(s)}else if(t!=null&&typeof t=="number"){const s=n!=null&&n instanceof wt?n:void 0;this.setEmpty(s),this._verseNum=t%le.chapterDigitShifter,this._chapterNum=Math.floor(t%le.bookDigitShifter/le.chapterDigitShifter),this._bookNum=Math.floor(t/le.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof le){const s=t;this._bookNum=s.bookNum,this._chapterNum=s.chapterNum,this._verseNum=s.verseNum,this._verse=s.verse,this.versification=s.versification}else{if(t==null)return;const s=t instanceof wt?t:le.defaultVersification;this.setEmpty(s)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??le.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new le(t),{success:!0,verseRef:n}}catch(r){if(r instanceof on)return n=new le,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%le.bcvMaxValue*le.bookDigitShifter+(n>=0?n%le.bcvMaxValue*le.chapterDigitShifter:0)+(r>=0?r%le.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:s,versificationStr:i}=t,l=s||o.toString();let c;return i&&(c=new wt(i)),n?new le(n,r.toString(),l,c):new le}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>le.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(le.verseRangeSeparator)||this._verse.includes(le.verseSequenceIndicator))}get book(){return me.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=me.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=le.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=le.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>me.lastBook)throw new on("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new wt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(le.verseRangeSeparators,le.verseSequenceIndicators)}get BBBCCC(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const s=t.split("/");if(t=s[0],s.length>1)try{const i=+s[1].trim();this.versification=new wt(Ge[i])}catch{throw new on("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new on("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||me.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!le.isVerseParseable(r[1]))throw new on("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new le(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete n.verse,n}equals(t){return t instanceof le?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=le.verseRangeSeparators,r=le.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],s=ss(this._verse,r);for(const i of s.map(l=>ss(l,n))){const l=this.clone();l.verse=i[0];const c=l.verseNum;if(o.push(l),i.length>1){const d=this.clone();if(d.verse=i[1],!t)for(let m=c+1;m<d.verseNum;m++){const v=new le(this._bookNum,this._chapterNum,m,this.versification);this.isExcluded||o.push(v)}o.push(d)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const s=o.internalValid;if(s!==0)return s;const i=o.BBBCCCVVV;if(r>i)return 3;if(r===i)return 4;r=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>me.lastBook?2:(me.isCanonical(this._bookNum),0)}setEmpty(t=le.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=me.bookIdToNumber(t),this.chapter=n,this.verse=r}};re(je,"defaultVersification",wt.English),re(je,"verseRangeSeparator","-"),re(je,"verseSequenceIndicator",","),re(je,"verseRangeSeparators",[je.verseRangeSeparator]),re(je,"verseSequenceIndicators",[je.verseSequenceIndicator]),re(je,"chapterDigitShifter",1e3),re(je,"bookDigitShifter",je.chapterDigitShifter*je.chapterDigitShifter),re(je,"bcvMaxValue",je.chapterDigitShifter-1),re(je,"ValidStatusType",vi);let on=class extends Error{};const nc=Al.extendTailwindMerge({prefix:"pr-"});function W(...e){return nc(Se.clsx(e))}const ho=ge.Root,yi=ge.Trigger,rc=ge.Group,oc=ge.Portal,sc=ge.Sub,ic=ge.RadioGroup,wi=O.forwardRef(({className:e,inset:t,children:n,...r},o)=>u.jsxs(ge.SubTrigger,{ref:o,className:W("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,u.jsx(se.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));wi.displayName=ge.SubTrigger.displayName;const xi=O.forwardRef(({className:e,...t},n)=>u.jsx(ge.SubContent,{ref:n,className:W("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));xi.displayName=ge.SubContent.displayName;const cr=O.forwardRef(({className:e,sideOffset:t=4,...n},r)=>u.jsx(ge.Portal,{children:u.jsx(ge.Content,{ref:r,sideOffset:t,className:W("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));cr.displayName=ge.Content.displayName;const go=O.forwardRef(({className:e,inset:t,...n},r)=>u.jsx(ge.Item,{ref:r,className:W("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));go.displayName=ge.Item.displayName;const bo=O.forwardRef(({className:e,children:t,checked:n,...r},o)=>u.jsxs(ge.CheckboxItem,{ref:o,className:W("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[u.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:u.jsx(ge.ItemIndicator,{children:u.jsx(se.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));bo.displayName=ge.CheckboxItem.displayName;const Ei=O.forwardRef(({className:e,children:t,...n},r)=>u.jsxs(ge.RadioItem,{ref:r,className:W("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[u.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:u.jsx(ge.ItemIndicator,{children:u.jsx(se.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));Ei.displayName=ge.RadioItem.displayName;const Rn=O.forwardRef(({className:e,inset:t,...n},r)=>u.jsx(ge.Label,{ref:r,className:W("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));Rn.displayName=ge.Label.displayName;const pr=O.forwardRef(({className:e,...t},n)=>u.jsx(ge.Separator,{ref:n,className:W("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));pr.displayName=ge.Separator.displayName;function ki({className:e,...t}){return u.jsx("span",{className:W("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}ki.displayName="DropdownMenuShortcut";const jn=O.forwardRef(({className:e,type:t,...n},r)=>u.jsx("input",{type:t,className:W("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));jn.displayName="Input";const ac=O.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},s)=>u.jsxs("div",{className:"pr-relative",children:[u.jsx(jn,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:i=>e(i.target.value),onKeyDown:i=>{i.key==="Enter"&&r(),t(i)},onClick:n,ref:s}),u.jsx(se.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function lc({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const s=Array.from({length:t},(l,c)=>c+1),i=O.useCallback(l=>{o(l)},[o]);return u.jsx("div",{className:W("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:s.map(l=>u.jsx("div",{className:W("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===n,"pr-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>i(l),children:l},l))})}const cc=O.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:s,children:i},l)=>u.jsxs(go,{ref:l,textValue:e,className:W("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[u.jsx("span",{className:W("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":s.toLowerCase()==="ot","pr-border-l-purple-200":s.toLowerCase()==="nt","pr-border-l-indigo-200":s.toLowerCase()==="dc"}),children:me.bookIdToEnglishName(e)}),n&&u.jsx("div",{children:i})]},e));function pc({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return u.jsxs(Rn,{className:"pr-flex pr-justify-between",children:[u.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),u.jsxs("div",{className:"pr-flex pr-items-center",children:[u.jsx(se.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),u.jsx(se.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),u.jsx(se.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const bn=me.allBookIds,uc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},is=["OT","NT","DC"],dc=32+32+32,fc=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],mc=e=>({OT:bn.filter(n=>me.isBookOT(n)),NT:bn.filter(n=>me.isBookNT(n)),DC:bn.filter(n=>me.isBookDC(n))})[e],sn=e=>pi.getChaptersForBook(me.bookIdToNumber(e));function hc(){return bn.map(t=>me.bookIdToEnglishName(t))}function gc(e){return hc().includes(e)}function bc(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(gc(t))return bn.find(r=>me.bookIdToEnglishName(r)===t)}function vc({scrRef:e,handleSubmit:t}){const[n,r]=O.useState(""),[o,s]=O.useState(me.bookNumberToId(e.bookNum)),[i,l]=O.useState(e.chapterNum??0),[c,d]=O.useState(me.bookNumberToId(e.bookNum)),[m,v]=O.useState(!1),[g,p]=O.useState(m),h=O.useRef(void 0),f=O.useRef(void 0),b=O.useRef(void 0),w=O.useCallback(R=>mc(R).filter(_=>{const M=me.bookIdToEnglishName(_).toLowerCase(),F=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return M.includes(F)||_.toLowerCase().includes(F)}),[n]),P=R=>{r(R)},x=O.useRef(!1),E=O.useCallback(R=>{if(x.current){x.current=!1;return}v(R)},[]),y=O.useCallback((R,_,M,F)=>{if(l(me.bookNumberToId(e.bookNum)!==R?1:e.chapterNum),_||sn(R)===-1){t({bookNum:me.bookIdToNumber(R),chapterNum:M||1,verseNum:F||1}),v(!1),r("");return}s(o!==R?R:""),v(!_)},[t,e.bookNum,e.chapterNum,o]),T=R=>{R<=0||R>sn(o)||y(o,!0,R)},S=O.useCallback(()=>{fc.forEach(R=>{const _=n.match(R);if(_){const[M,F=void 0,D=void 0]=_.slice(1),I=bc(M);(me.isBookIdValid(M)||I)&&y(I??M,!0,F?parseInt(F,10):1,D?parseInt(D,10):1)}})},[y,n]),j=O.useCallback(R=>{m?(R.key==="ArrowDown"||R.key==="ArrowUp")&&(typeof b<"u"&&b.current!==null?b.current.focus():typeof f<"u"&&f.current!==null&&f.current.focus(),R.preventDefault()):v(!0)},[m]),A=R=>{const{key:_}=R;_==="ArrowRight"||_==="ArrowLeft"||_==="ArrowDown"||_==="ArrowUp"||_==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:_})),h.current.focus())},V=R=>{const{key:_}=R;if(c===o){if(_==="Enter"){R.preventDefault(),y(o,!0,i);return}let M=0;if(_==="ArrowRight")if(i<sn(c))M=1;else{R.preventDefault();return}else if(_==="ArrowLeft")if(i>1)M=-1;else{R.preventDefault();return}else _==="ArrowDown"?M=6:_==="ArrowUp"&&(M=-6);i+M<=0||i+M>sn(c)?l(0):M!==0&&(l(i+M),R.preventDefault())}};return O.useEffect(()=>{o===c?o===me.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),O.useLayoutEffect(()=>{p(m)},[m]),O.useLayoutEffect(()=>{const R=setTimeout(()=>{if(g&&f.current&&b.current){const M=b.current.offsetTop-dc;f.current.scrollTo({top:M,behavior:"instant"})}},10);return()=>{clearTimeout(R)}},[g]),u.jsx("div",{className:"pr-flex",children:u.jsxs(ho,{modal:!1,open:m,onOpenChange:E,children:[u.jsx(yi,{asChild:!0,children:u.jsx(ac,{ref:h,value:n,handleSearch:P,handleKeyDown:j,handleOnClick:()=>{s(me.bookNumberToId(e.bookNum)),d(me.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),v(!0),h.current.focus()},onFocus:()=>{x.current=!0},handleSubmit:S,placeholder:`${me.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),u.jsxs(cr,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:A,align:"start",ref:f,children:[u.jsx(pc,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),is.map((R,_)=>w(R).length>0&&u.jsxs("div",{children:[u.jsx(Rn,{className:"pr-font-semibold pr-text-slate-700",children:uc[R]}),w(R).map(M=>u.jsx("div",{children:u.jsx(cc,{bookId:M,handleSelectBook:()=>y(M,!1),isSelected:o===M,handleHighlightBook:()=>d(M),handleKeyDown:V,bookType:R,ref:F=>{o===M&&(b.current=F)},children:u.jsx(lc,{handleSelectChapter:T,endChapter:sn(M),activeChapter:e.bookNum===me.bookIdToNumber(M)?e.chapterNum:0,highlightedChapter:i,handleHighlightedChapter:F=>{l(F)}})})},M)),is.length-1!==_?u.jsx(pr,{}):void 0]},R))]})]})})}const ur=O.forwardRef(({className:e,...t},n)=>u.jsx("div",{className:"pr-relative pr-w-full pr-overflow-auto",children:u.jsx("table",{ref:n,className:W("pr-w-full pr-caption-bottom pr-text-sm",e),...t})}));ur.displayName="Table";const dr=O.forwardRef(({className:e,...t},n)=>u.jsx("thead",{ref:n,className:W("[&_tr]:pr-border-b",e),...t}));dr.displayName="TableHeader";const fr=O.forwardRef(({className:e,...t},n)=>u.jsx("tbody",{ref:n,className:W("[&_tr:last-child]:pr-border-0",e),...t}));fr.displayName="TableBody";const Ti=O.forwardRef(({className:e,...t},n)=>u.jsx("tfoot",{ref:n,className:W("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));Ti.displayName="TableFooter";const Ct=O.forwardRef(({className:e,...t},n)=>u.jsx("tr",{ref:n,className:W("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));Ct.displayName="TableRow";const En=O.forwardRef(({className:e,...t},n)=>u.jsx("th",{ref:n,className:W("pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",e),...t}));En.displayName="TableHead";const Ht=O.forwardRef(({className:e,...t},n)=>u.jsx("td",{ref:n,className:W("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0",e),...t}));Ht.displayName="TableCell";const Ni=O.forwardRef(({className:e,...t},n)=>u.jsx("caption",{ref:n,className:W("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));Ni.displayName="TableCaption";const Si=po.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),he=O.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},s)=>{const i=r?Dl.Slot:"button";return u.jsx(i,{className:W(Si({variant:t,size:n,className:e})),ref:s,...o})});he.displayName="Button";const Zn=xe.Root,yc=xe.Group,Qn=xe.Value,kn=O.forwardRef(({className:e,children:t,...n},r)=>u.jsxs(xe.Trigger,{ref:r,className:W("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...n,children:[t,u.jsx(xe.Icon,{asChild:!0,children:u.jsx(se.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));kn.displayName=xe.Trigger.displayName;const vo=O.forwardRef(({className:e,...t},n)=>u.jsx(xe.ScrollUpButton,{ref:n,className:W("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:u.jsx(se.ChevronUp,{className:"pr-h-4 pr-w-4"})}));vo.displayName=xe.ScrollUpButton.displayName;const yo=O.forwardRef(({className:e,...t},n)=>u.jsx(xe.ScrollDownButton,{ref:n,className:W("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:u.jsx(se.ChevronDown,{className:"pr-h-4 pr-w-4"})}));yo.displayName=xe.ScrollDownButton.displayName;const Tn=O.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>u.jsx(xe.Portal,{children:u.jsxs(xe.Content,{ref:o,className:W("pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:n,...r,children:[u.jsx(vo,{}),u.jsx(xe.Viewport,{className:W("pr-p-1",n==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),u.jsx(yo,{})]})}));Tn.displayName=xe.Content.displayName;const Ci=O.forwardRef(({className:e,...t},n)=>u.jsx(xe.Label,{ref:n,className:W("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));Ci.displayName=xe.Label.displayName;const Xe=O.forwardRef(({className:e,children:t,...n},r)=>u.jsxs(xe.Item,{ref:r,className:W("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[u.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:u.jsx(xe.ItemIndicator,{children:u.jsx(se.Check,{className:"pr-h-4 pr-w-4"})})}),u.jsx(xe.ItemText,{children:t})]}));Xe.displayName=xe.Item.displayName;const Oi=O.forwardRef(({className:e,...t},n)=>u.jsx(xe.Separator,{ref:n,className:W("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Oi.displayName=xe.Separator.displayName;function wc({table:e}){return u.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:u.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[u.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),u.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[u.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),u.jsxs(Zn,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[u.jsx(kn,{className:"pr-h-8 pr-w-[70px]",children:u.jsx(Qn,{placeholder:e.getState().pagination.pageSize})}),u.jsx(Tn,{side:"top",children:[10,20,30,40,50].map(t=>u.jsx(Xe,{value:`${t}`,children:t},t))})]})]}),u.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),u.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[u.jsxs(he,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),u.jsx(se.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),u.jsxs(he,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),u.jsx(se.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),u.jsxs(he,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),u.jsx(se.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),u.jsxs(he,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),u.jsx(se.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}function xc({table:e}){return u.jsxs(ho,{children:[u.jsx(ui.DropdownMenuTrigger,{asChild:!0,children:u.jsxs(he,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[u.jsx(se.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),u.jsxs(cr,{align:"end",className:"pr-w-[150px]",children:[u.jsx(Rn,{children:"Toggle columns"}),u.jsx(pr,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>u.jsx(bo,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}function Pi({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,onRowClickHandler:s=()=>{}}){var f;const[i,l]=O.useState([]),[c,d]=O.useState([]),[m,v]=O.useState({}),[g,p]=O.useState({}),h=yt.useReactTable({data:t,columns:e,getCoreRowModel:yt.getCoreRowModel(),...n&&{getPaginationRowModel:yt.getPaginationRowModel()},onSortingChange:l,getSortedRowModel:yt.getSortedRowModel(),onColumnFiltersChange:d,getFilteredRowModel:yt.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:p,state:{sorting:i,columnFilters:c,columnVisibility:m,rowSelection:g}});return u.jsxs("div",{children:[o&&u.jsx(xc,{table:h}),u.jsx("div",{className:"pr-twp pr-font-sans",children:u.jsxs(ur,{children:[u.jsx(dr,{children:h.getHeaderGroups().map(b=>u.jsx(Ct,{children:b.headers.map(w=>u.jsx(En,{children:w.isPlaceholder?void 0:yt.flexRender(w.column.columnDef.header,w.getContext())},w.id))},b.id))}),u.jsx(fr,{children:(f=h.getRowModel().rows)!=null&&f.length?h.getRowModel().rows.map(b=>u.jsx(Ct,{onClick:()=>s(b,h),"data-state":b.getIsSelected()&&"selected",children:b.getVisibleCells().map(w=>u.jsx(Ht,{children:yt.flexRender(w.column.columnDef.cell,w.getContext())},w.id))},b.id)):u.jsx(Ct,{children:u.jsx(Ht,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]})}),n&&u.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[u.jsx(he,{variant:"outline",size:"sm",onClick:()=>h.previousPage(),disabled:!h.getCanPreviousPage(),children:"Previous"}),u.jsx(he,{variant:"outline",size:"sm",onClick:()=>h.nextPage(),disabled:!h.getCanNextPage(),children:"Next"})]}),n&&r&&u.jsx(wc,{table:h})]})}function Kr({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:s=!1,width:i,options:l=[],className:c,value:d,onChange:m,onFocus:v,onBlur:g,getOptionLabel:p}){return u.jsx(we.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:s,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:d,onChange:m,onFocus:v,onBlur:g,getOptionLabel:p,renderInput:h=>u.jsx(we.TextField,{...h,error:o,fullWidth:s,disabled:n,label:t,style:{width:i}})})}function Ec({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,s]=O.useState(1),[i,l]=O.useState(r),[c,d]=O.useState(Array.from({length:r},(g,p)=>p+1));O.useEffect(()=>{s(1),e(1),l(r),t(r),d(Array.from({length:r},(g,p)=>p+1))},[r,t,e]);const m=(g,p)=>{s(p),e(p),p>i&&(l(p),t(p))},v=(g,p)=>{l(p),t(p),p<o&&(s(p),e(p))};return u.jsxs(u.Fragment,{children:[u.jsx(we.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:u.jsx(Kr,{onChange:(g,p)=>m(g,p),className:"book-selection-chapter",isClearable:!1,options:c,getOptionLabel:g=>g.toString(),value:o,isDisabled:n},"start chapter"),label:"Chapters",labelPlacement:"start"}),u.jsx(we.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:u.jsx(Kr,{onChange:(g,p)=>v(g,p),className:"book-selection-chapter",isClearable:!1,options:c,getOptionLabel:g=>g.toString(),value:i,isDisabled:n},"end chapter"),label:"to",labelPlacement:"start"})]})}var kt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(kt||{});function Ri({id:e,isChecked:t,labelText:n="",labelPosition:r=kt.After,isIndeterminate:o=!1,isDefaultChecked:s,isDisabled:i=!1,hasError:l=!1,className:c,onChange:d}){const m=u.jsx(we.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:s,disabled:i,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:d});let v;if(n){const g=r===kt.Before||r===kt.Above,p=u.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),h=r===kt.Before||r===kt.After,f=h?p:u.jsx("div",{children:p}),b=h?m:u.jsx("div",{children:m});v=u.jsxs(we.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:i,error:l,children:[g&&f,b,!g&&f]})}else v=m;return v}function kc({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:i}){return u.jsxs("fieldset",{id:e,className:t,children:[n&&u.jsx("legend",{children:n}),r.map(l=>u.jsx(Ri,{className:"check-item",isChecked:o.includes(l),labelText:i?i(l):l,onChange:()=>s(l)},l))]})}function fe(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,s;for(s=0;s<r.length;s++)o=r[s],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function C(){return C=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},C.apply(this,arguments)}function Tc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Nc(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Jr={exports:{}},zn={exports:{}},ce={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var as;function Sc(){if(as)return ce;as=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,p=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,P=e?Symbol.for("react.scope"):60119;function x(y){if(typeof y=="object"&&y!==null){var T=y.$$typeof;switch(T){case t:switch(y=y.type,y){case c:case d:case r:case s:case o:case v:return y;default:switch(y=y&&y.$$typeof,y){case l:case m:case h:case p:case i:return y;default:return T}}case n:return T}}}function E(y){return x(y)===d}return ce.AsyncMode=c,ce.ConcurrentMode=d,ce.ContextConsumer=l,ce.ContextProvider=i,ce.Element=t,ce.ForwardRef=m,ce.Fragment=r,ce.Lazy=h,ce.Memo=p,ce.Portal=n,ce.Profiler=s,ce.StrictMode=o,ce.Suspense=v,ce.isAsyncMode=function(y){return E(y)||x(y)===c},ce.isConcurrentMode=E,ce.isContextConsumer=function(y){return x(y)===l},ce.isContextProvider=function(y){return x(y)===i},ce.isElement=function(y){return typeof y=="object"&&y!==null&&y.$$typeof===t},ce.isForwardRef=function(y){return x(y)===m},ce.isFragment=function(y){return x(y)===r},ce.isLazy=function(y){return x(y)===h},ce.isMemo=function(y){return x(y)===p},ce.isPortal=function(y){return x(y)===n},ce.isProfiler=function(y){return x(y)===s},ce.isStrictMode=function(y){return x(y)===o},ce.isSuspense=function(y){return x(y)===v},ce.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===r||y===d||y===s||y===o||y===v||y===g||typeof y=="object"&&y!==null&&(y.$$typeof===h||y.$$typeof===p||y.$$typeof===i||y.$$typeof===l||y.$$typeof===m||y.$$typeof===b||y.$$typeof===w||y.$$typeof===P||y.$$typeof===f)},ce.typeOf=x,ce}var pe={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ls;function Cc(){return ls||(ls=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,p=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,P=e?Symbol.for("react.scope"):60119;function x(L){return typeof L=="string"||typeof L=="function"||L===r||L===d||L===s||L===o||L===v||L===g||typeof L=="object"&&L!==null&&(L.$$typeof===h||L.$$typeof===p||L.$$typeof===i||L.$$typeof===l||L.$$typeof===m||L.$$typeof===b||L.$$typeof===w||L.$$typeof===P||L.$$typeof===f)}function E(L){if(typeof L=="object"&&L!==null){var te=L.$$typeof;switch(te){case t:var $=L.type;switch($){case c:case d:case r:case s:case o:case v:return $;default:var ae=$&&$.$$typeof;switch(ae){case l:case m:case h:case p:case i:return ae;default:return te}}case n:return te}}}var y=c,T=d,S=l,j=i,A=t,V=m,R=r,_=h,M=p,F=n,D=s,I=o,z=v,Z=!1;function G(L){return Z||(Z=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),N(L)||E(L)===c}function N(L){return E(L)===d}function B(L){return E(L)===l}function U(L){return E(L)===i}function J(L){return typeof L=="object"&&L!==null&&L.$$typeof===t}function H(L){return E(L)===m}function q(L){return E(L)===r}function Y(L){return E(L)===h}function K(L){return E(L)===p}function X(L){return E(L)===n}function Q(L){return E(L)===s}function ee(L){return E(L)===o}function ie(L){return E(L)===v}pe.AsyncMode=y,pe.ConcurrentMode=T,pe.ContextConsumer=S,pe.ContextProvider=j,pe.Element=A,pe.ForwardRef=V,pe.Fragment=R,pe.Lazy=_,pe.Memo=M,pe.Portal=F,pe.Profiler=D,pe.StrictMode=I,pe.Suspense=z,pe.isAsyncMode=G,pe.isConcurrentMode=N,pe.isContextConsumer=B,pe.isContextProvider=U,pe.isElement=J,pe.isForwardRef=H,pe.isFragment=q,pe.isLazy=Y,pe.isMemo=K,pe.isPortal=X,pe.isProfiler=Q,pe.isStrictMode=ee,pe.isSuspense=ie,pe.isValidElementType=x,pe.typeOf=E}()),pe}var cs;function ji(){return cs||(cs=1,process.env.NODE_ENV==="production"?zn.exports=Sc():zn.exports=Cc()),zn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var jr,ps;function Oc(){if(ps)return jr;ps=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(s){if(s==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(s)}function o(){try{if(!Object.assign)return!1;var s=new String("abc");if(s[5]="de",Object.getOwnPropertyNames(s)[0]==="5")return!1;for(var i={},l=0;l<10;l++)i["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(i).map(function(m){return i[m]});if(c.join("")!=="0123456789")return!1;var d={};return"abcdefghijklmnopqrst".split("").forEach(function(m){d[m]=m}),Object.keys(Object.assign({},d)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return jr=o()?Object.assign:function(s,i){for(var l,c=r(s),d,m=1;m<arguments.length;m++){l=Object(arguments[m]);for(var v in l)t.call(l,v)&&(c[v]=l[v]);if(e){d=e(l);for(var g=0;g<d.length;g++)n.call(l,d[g])&&(c[d[g]]=l[d[g]])}}return c},jr}var $r,us;function wo(){if(us)return $r;us=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return $r=e,$r}var Ir,ds;function $i(){return ds||(ds=1,Ir=Function.call.bind(Object.prototype.hasOwnProperty)),Ir}var _r,fs;function Pc(){if(fs)return _r;fs=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=wo(),n={},r=$i();e=function(s){var i="Warning: "+s;typeof console<"u"&&console.error(i);try{throw new Error(i)}catch{}}}function o(s,i,l,c,d){if(process.env.NODE_ENV!=="production"){for(var m in s)if(r(s,m)){var v;try{if(typeof s[m]!="function"){var g=Error((c||"React class")+": "+l+" type `"+m+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof s[m]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw g.name="Invariant Violation",g}v=s[m](i,m,c,l,null,t)}catch(h){v=h}if(v&&!(v instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+m+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof v+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),v instanceof Error&&!(v.message in n)){n[v.message]=!0;var p=d?d():"";e("Failed "+l+" type: "+v.message+(p??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},_r=o,_r}var Mr,ms;function Rc(){if(ms)return Mr;ms=1;var e=ji(),t=Oc(),n=wo(),r=$i(),o=Pc(),s=function(){};process.env.NODE_ENV!=="production"&&(s=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function i(){return null}return Mr=function(l,c){var d=typeof Symbol=="function"&&Symbol.iterator,m="@@iterator";function v(N){var B=N&&(d&&N[d]||N[m]);if(typeof B=="function")return B}var g="<<anonymous>>",p={array:w("array"),bigint:w("bigint"),bool:w("boolean"),func:w("function"),number:w("number"),object:w("object"),string:w("string"),symbol:w("symbol"),any:P(),arrayOf:x,element:E(),elementType:y(),instanceOf:T,node:V(),objectOf:j,oneOf:S,oneOfType:A,shape:_,exact:M};function h(N,B){return N===B?N!==0||1/N===1/B:N!==N&&B!==B}function f(N,B){this.message=N,this.data=B&&typeof B=="object"?B:{},this.stack=""}f.prototype=Error.prototype;function b(N){if(process.env.NODE_ENV!=="production")var B={},U=0;function J(q,Y,K,X,Q,ee,ie){if(X=X||g,ee=ee||K,ie!==n){if(c){var L=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw L.name="Invariant Violation",L}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var te=X+":"+K;!B[te]&&U<3&&(s("You are manually calling a React.PropTypes validation function for the `"+ee+"` prop on `"+X+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),B[te]=!0,U++)}}return Y[K]==null?q?Y[K]===null?new f("The "+Q+" `"+ee+"` is marked as required "+("in `"+X+"`, but its value is `null`.")):new f("The "+Q+" `"+ee+"` is marked as required in "+("`"+X+"`, but its value is `undefined`.")):null:N(Y,K,X,Q,ee)}var H=J.bind(null,!1);return H.isRequired=J.bind(null,!0),H}function w(N){function B(U,J,H,q,Y,K){var X=U[J],Q=I(X);if(Q!==N){var ee=z(X);return new f("Invalid "+q+" `"+Y+"` of type "+("`"+ee+"` supplied to `"+H+"`, expected ")+("`"+N+"`."),{expectedType:N})}return null}return b(B)}function P(){return b(i)}function x(N){function B(U,J,H,q,Y){if(typeof N!="function")return new f("Property `"+Y+"` of component `"+H+"` has invalid PropType notation inside arrayOf.");var K=U[J];if(!Array.isArray(K)){var X=I(K);return new f("Invalid "+q+" `"+Y+"` of type "+("`"+X+"` supplied to `"+H+"`, expected an array."))}for(var Q=0;Q<K.length;Q++){var ee=N(K,Q,H,q,Y+"["+Q+"]",n);if(ee instanceof Error)return ee}return null}return b(B)}function E(){function N(B,U,J,H,q){var Y=B[U];if(!l(Y)){var K=I(Y);return new f("Invalid "+H+" `"+q+"` of type "+("`"+K+"` supplied to `"+J+"`, expected a single ReactElement."))}return null}return b(N)}function y(){function N(B,U,J,H,q){var Y=B[U];if(!e.isValidElementType(Y)){var K=I(Y);return new f("Invalid "+H+" `"+q+"` of type "+("`"+K+"` supplied to `"+J+"`, expected a single ReactElement type."))}return null}return b(N)}function T(N){function B(U,J,H,q,Y){if(!(U[J]instanceof N)){var K=N.name||g,X=G(U[J]);return new f("Invalid "+q+" `"+Y+"` of type "+("`"+X+"` supplied to `"+H+"`, expected ")+("instance of `"+K+"`."))}return null}return b(B)}function S(N){if(!Array.isArray(N))return process.env.NODE_ENV!=="production"&&(arguments.length>1?s("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):s("Invalid argument supplied to oneOf, expected an array.")),i;function B(U,J,H,q,Y){for(var K=U[J],X=0;X<N.length;X++)if(h(K,N[X]))return null;var Q=JSON.stringify(N,function(ie,L){var te=z(L);return te==="symbol"?String(L):L});return new f("Invalid "+q+" `"+Y+"` of value `"+String(K)+"` "+("supplied to `"+H+"`, expected one of "+Q+"."))}return b(B)}function j(N){function B(U,J,H,q,Y){if(typeof N!="function")return new f("Property `"+Y+"` of component `"+H+"` has invalid PropType notation inside objectOf.");var K=U[J],X=I(K);if(X!=="object")return new f("Invalid "+q+" `"+Y+"` of type "+("`"+X+"` supplied to `"+H+"`, expected an object."));for(var Q in K)if(r(K,Q)){var ee=N(K,Q,H,q,Y+"."+Q,n);if(ee instanceof Error)return ee}return null}return b(B)}function A(N){if(!Array.isArray(N))return process.env.NODE_ENV!=="production"&&s("Invalid argument supplied to oneOfType, expected an instance of array."),i;for(var B=0;B<N.length;B++){var U=N[B];if(typeof U!="function")return s("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+Z(U)+" at index "+B+"."),i}function J(H,q,Y,K,X){for(var Q=[],ee=0;ee<N.length;ee++){var ie=N[ee],L=ie(H,q,Y,K,X,n);if(L==null)return null;L.data&&r(L.data,"expectedType")&&Q.push(L.data.expectedType)}var te=Q.length>0?", expected one of type ["+Q.join(", ")+"]":"";return new f("Invalid "+K+" `"+X+"` supplied to "+("`"+Y+"`"+te+"."))}return b(J)}function V(){function N(B,U,J,H,q){return F(B[U])?null:new f("Invalid "+H+" `"+q+"` supplied to "+("`"+J+"`, expected a ReactNode."))}return b(N)}function R(N,B,U,J,H){return new f((N||"React class")+": "+B+" type `"+U+"."+J+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+H+"`.")}function _(N){function B(U,J,H,q,Y){var K=U[J],X=I(K);if(X!=="object")return new f("Invalid "+q+" `"+Y+"` of type `"+X+"` "+("supplied to `"+H+"`, expected `object`."));for(var Q in N){var ee=N[Q];if(typeof ee!="function")return R(H,q,Y,Q,z(ee));var ie=ee(K,Q,H,q,Y+"."+Q,n);if(ie)return ie}return null}return b(B)}function M(N){function B(U,J,H,q,Y){var K=U[J],X=I(K);if(X!=="object")return new f("Invalid "+q+" `"+Y+"` of type `"+X+"` "+("supplied to `"+H+"`, expected `object`."));var Q=t({},U[J],N);for(var ee in Q){var ie=N[ee];if(r(N,ee)&&typeof ie!="function")return R(H,q,Y,ee,z(ie));if(!ie)return new f("Invalid "+q+" `"+Y+"` key `"+ee+"` supplied to `"+H+"`.\nBad object: "+JSON.stringify(U[J],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(N),null,"  "));var L=ie(K,ee,H,q,Y+"."+ee,n);if(L)return L}return null}return b(B)}function F(N){switch(typeof N){case"number":case"string":case"undefined":return!0;case"boolean":return!N;case"object":if(Array.isArray(N))return N.every(F);if(N===null||l(N))return!0;var B=v(N);if(B){var U=B.call(N),J;if(B!==N.entries){for(;!(J=U.next()).done;)if(!F(J.value))return!1}else for(;!(J=U.next()).done;){var H=J.value;if(H&&!F(H[1]))return!1}}else return!1;return!0;default:return!1}}function D(N,B){return N==="symbol"?!0:B?B["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&B instanceof Symbol:!1}function I(N){var B=typeof N;return Array.isArray(N)?"array":N instanceof RegExp?"object":D(B,N)?"symbol":B}function z(N){if(typeof N>"u"||N===null)return""+N;var B=I(N);if(B==="object"){if(N instanceof Date)return"date";if(N instanceof RegExp)return"regexp"}return B}function Z(N){var B=z(N);switch(B){case"array":case"object":return"an "+B;case"boolean":case"date":case"regexp":return"a "+B;default:return B}}function G(N){return!N.constructor||!N.constructor.name?g:N.constructor.name}return p.checkPropTypes=o,p.resetWarningCache=o.resetWarningCache,p.PropTypes=p,p},Mr}var Ar,hs;function jc(){if(hs)return Ar;hs=1;var e=wo();function t(){}function n(){}return n.resetWarningCache=t,Ar=function(){function r(i,l,c,d,m,v){if(v!==e){var g=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw g.name="Invariant Violation",g}}r.isRequired=r;function o(){return r}var s={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return s.PropTypes=s,s},Ar}if(process.env.NODE_ENV!=="production"){var $c=ji(),Ic=!0;Jr.exports=Rc()($c.isElement,Ic)}else Jr.exports=jc()();var _c=Jr.exports;const a=Tc(_c);function Zt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function Tt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Ii(e){if(!Tt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Ii(e[n])}),t}function rt(e,t,n={clone:!0}){const r=n.clone?C({},e):e;return Tt(e)&&Tt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Tt(t[o])&&o in e&&Tt(e[o])?r[o]=rt(e[o],t[o],n):n.clone?r[o]=Tt(t[o])?Ii(t[o]):t[o]:r[o]=t[o])}),r}function Mc(e){const{prototype:t={}}=e;return!!t.isReactComponent}function _i(e,t,n,r,o){const s=e[t],i=o||t;if(s==null||typeof window>"u")return null;let l;const c=s.type;return typeof c=="function"&&!Mc(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Mi=Zt(a.element,_i);Mi.isRequired=Zt(a.element.isRequired,_i);const $n=Mi;function Ac(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Dc(e,t,n,r,o){const s=e[t],i=o||t;if(s==null||typeof window>"u")return null;let l;return typeof s=="function"&&!Ac(s)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Bc=Zt(a.elementType,Dc),Lc="exact-prop: ​";function Ai(e){return process.env.NODE_ENV==="production"?e:C({},e,{[Lc]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Wt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Zr={exports:{}},ue={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gs;function Vc(){if(gs)return ue;gs=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),p=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function f(b){if(typeof b=="object"&&b!==null){var w=b.$$typeof;switch(w){case e:switch(b=b.type,b){case n:case o:case r:case d:case m:return b;default:switch(b=b&&b.$$typeof,b){case l:case i:case c:case g:case v:case s:return b;default:return w}}case t:return w}}}return ue.ContextConsumer=i,ue.ContextProvider=s,ue.Element=e,ue.ForwardRef=c,ue.Fragment=n,ue.Lazy=g,ue.Memo=v,ue.Portal=t,ue.Profiler=o,ue.StrictMode=r,ue.Suspense=d,ue.SuspenseList=m,ue.isAsyncMode=function(){return!1},ue.isConcurrentMode=function(){return!1},ue.isContextConsumer=function(b){return f(b)===i},ue.isContextProvider=function(b){return f(b)===s},ue.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===e},ue.isForwardRef=function(b){return f(b)===c},ue.isFragment=function(b){return f(b)===n},ue.isLazy=function(b){return f(b)===g},ue.isMemo=function(b){return f(b)===v},ue.isPortal=function(b){return f(b)===t},ue.isProfiler=function(b){return f(b)===o},ue.isStrictMode=function(b){return f(b)===r},ue.isSuspense=function(b){return f(b)===d},ue.isSuspenseList=function(b){return f(b)===m},ue.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===n||b===o||b===r||b===d||b===m||b===p||typeof b=="object"&&b!==null&&(b.$$typeof===g||b.$$typeof===v||b.$$typeof===s||b.$$typeof===i||b.$$typeof===c||b.$$typeof===h||b.getModuleId!==void 0)},ue.typeOf=f,ue}var de={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bs;function Fc(){return bs||(bs=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),p=Symbol.for("react.offscreen"),h=!1,f=!1,b=!1,w=!1,P=!1,x;x=Symbol.for("react.module.reference");function E($){return!!(typeof $=="string"||typeof $=="function"||$===n||$===o||P||$===r||$===d||$===m||w||$===p||h||f||b||typeof $=="object"&&$!==null&&($.$$typeof===g||$.$$typeof===v||$.$$typeof===s||$.$$typeof===i||$.$$typeof===c||$.$$typeof===x||$.getModuleId!==void 0))}function y($){if(typeof $=="object"&&$!==null){var ae=$.$$typeof;switch(ae){case e:var Te=$.type;switch(Te){case n:case o:case r:case d:case m:return Te;default:var Pe=Te&&Te.$$typeof;switch(Pe){case l:case i:case c:case g:case v:case s:return Pe;default:return ae}}case t:return ae}}}var T=i,S=s,j=e,A=c,V=n,R=g,_=v,M=t,F=o,D=r,I=d,z=m,Z=!1,G=!1;function N($){return Z||(Z=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function B($){return G||(G=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function U($){return y($)===i}function J($){return y($)===s}function H($){return typeof $=="object"&&$!==null&&$.$$typeof===e}function q($){return y($)===c}function Y($){return y($)===n}function K($){return y($)===g}function X($){return y($)===v}function Q($){return y($)===t}function ee($){return y($)===o}function ie($){return y($)===r}function L($){return y($)===d}function te($){return y($)===m}de.ContextConsumer=T,de.ContextProvider=S,de.Element=j,de.ForwardRef=A,de.Fragment=V,de.Lazy=R,de.Memo=_,de.Portal=M,de.Profiler=F,de.StrictMode=D,de.Suspense=I,de.SuspenseList=z,de.isAsyncMode=N,de.isConcurrentMode=B,de.isContextConsumer=U,de.isContextProvider=J,de.isElement=H,de.isForwardRef=q,de.isFragment=Y,de.isLazy=K,de.isMemo=X,de.isPortal=Q,de.isProfiler=ee,de.isStrictMode=ie,de.isSuspense=L,de.isSuspenseList=te,de.isValidElementType=E,de.typeOf=y}()),de}process.env.NODE_ENV==="production"?Zr.exports=Vc():Zr.exports=Fc();var er=Zr.exports;const zc=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Uc(e){const t=`${e}`.match(zc);return t&&t[1]||""}function Di(e,t=""){return e.displayName||e.name||Uc(e)||t}function vs(e,t,n){const r=Di(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Hc(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Di(e,"Component");if(typeof e=="object")switch(e.$$typeof){case er.ForwardRef:return vs(e,e.render,"ForwardRef");case er.Memo:return vs(e,e.type,"memo");default:return}}}function ot(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=e[t],i=o||t;return s==null?null:s&&s.nodeType!==1?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Wc=a.oneOfType([a.func,a.object]),xo=Wc;function Ke(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Wt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Qr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Bi(e,t=166){let n;function r(...o){const s=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(s,t)}return r.clear=()=>{clearTimeout(n)},r}function qc(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,s,i)=>{const l=o||"<<anonymous>>",c=i||r;return typeof n[r]<"u"?new Error(`The ${s} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function Xc(e,t){var n,r;return k.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Ce(e){return e&&e.ownerDocument||document}function qt(e){return Ce(e).defaultView||window}function Gc(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?C({},t.propTypes):null;return o=>(s,i,l,c,d,...m)=>{const v=d||i,g=n==null?void 0:n[v];if(g){const p=g(s,i,l,c,d,...m);if(p)return p}return typeof s[i]<"u"&&!s[o]?new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function tr(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Yc=typeof window<"u"?k.useLayoutEffect:k.useEffect,Rt=Yc;let ys=0;function Kc(e){const[t,n]=k.useState(e),r=e||t;return k.useEffect(()=>{t==null&&(ys+=1,n(`mui-${ys}`))},[t]),r}const ws=k["useId".toString()];function Li(e){if(ws!==void 0){const t=ws();return e??t}return Kc(e)}function Jc(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=o||t;return typeof e[t]<"u"?new Error(`The prop \`${s}\` is not supported. Please remove it.`):null}function Vi({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=k.useRef(e!==void 0),[s,i]=k.useState(t),l=o?e:s;if(process.env.NODE_ENV!=="production"){k.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:d}=k.useRef(t);k.useEffect(()=>{!o&&d!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=k.useCallback(d=>{o||i(d)},[]);return[l,c]}function Nn(e){const t=k.useRef(e);return Rt(()=>{t.current=e}),k.useRef((...n)=>(0,t.current)(...n)).current}function Ue(...e){return k.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{tr(n,t)})},e)}const xs={};function Zc(e,t){const n=k.useRef(xs);return n.current===xs&&(n.current=e(t)),n}const Qc=[];function ep(e){k.useEffect(e,Qc)}class In{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new In}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function mn(){const e=Zc(In.create).current;return ep(e.disposeEffect),e}let mr=!0,eo=!1;const tp=new In,np={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function rp(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&np[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function op(e){e.metaKey||e.altKey||e.ctrlKey||(mr=!0)}function Dr(){mr=!1}function sp(){this.visibilityState==="hidden"&&eo&&(mr=!0)}function ip(e){e.addEventListener("keydown",op,!0),e.addEventListener("mousedown",Dr,!0),e.addEventListener("pointerdown",Dr,!0),e.addEventListener("touchstart",Dr,!0),e.addEventListener("visibilitychange",sp,!0)}function ap(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return mr||rp(t)}function Fi(){const e=k.useCallback(o=>{o!=null&&ip(o.ownerDocument)},[]),t=k.useRef(!1);function n(){return t.current?(eo=!0,tp.start(100,()=>{eo=!1}),t.current=!1,!0):!1}function r(o){return ap(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function zi(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function lp(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function cp(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const pp=Number.isInteger||cp;function Ui(e,t,n,r){const o=e[t];if(o==null||!pp(o)){const s=lp(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${s}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function Hi(e,t,...n){return e[t]===void 0?null:Ui(e,t,...n)}function to(){return null}Hi.isRequired=Ui;to.isRequired=to;const Wi=process.env.NODE_ENV==="production"?to:Hi;function qi(e,t){const n=C({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=C({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},s=t[r];n[r]={},!s||!Object.keys(s)?n[r]=o:!o||!Object.keys(o)?n[r]=s:(n[r]=C({},s),Object.keys(o).forEach(i=>{n[r][i]=qi(o[i],s[i])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function at(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((s,i)=>{if(i){const l=t(i);l!==""&&s.push(l),n&&n[i]&&s.push(n[i])}return s},[]).join(" ")}),r}const Es=e=>e,up=()=>{let e=Es;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Es}}},dp=up(),Xi=dp,Gi={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Ze(e,t,n="Mui"){const r=Gi[t];return r?`${n}-${r}`:`${Xi.generate(e)}-${t}`}function mt(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=Ze(e,o,n)}),r}function fp(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Yi(e){return typeof e=="string"}function hn(e,t,n){return e===void 0||Yi(e)?t:C({},t,{ownerState:C({},t.ownerState,n)})}const mp={disableDefaultClasses:!1},hp=k.createContext(mp);function gp(e){const{disableDefaultClasses:t}=k.useContext(hp);return n=>t?"":e(n)}function Ki(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function bp(e,t,n){return typeof e=="function"?e(t,n):e}function ks(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function vp(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:s}=e;if(!t){const p=Se(n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),h=C({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=C({},n,o,r);return p.length>0&&(f.className=p),Object.keys(h).length>0&&(f.style=h),{props:f,internalRef:void 0}}const i=Ki(C({},o,r)),l=ks(r),c=ks(o),d=t(i),m=Se(d==null?void 0:d.className,n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),v=C({},d==null?void 0:d.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),g=C({},d,n,c,l);return m.length>0&&(g.className=m),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:d.ref}}const yp=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function jt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:s=!1}=e,i=fe(e,yp),l=s?{}:bp(r,o),{props:c,internalRef:d}=vp(C({},i,{externalSlotProps:l})),m=Ue(d,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return hn(n,C({},c,{ref:m}),o)}const Ji="base";function wp(e){return`${Ji}--${e}`}function xp(e,t){return`${Ji}-${e}-${t}`}function Zi(e,t){const n=Gi[t];return n?wp(n):xp(e,t)}function Ep(e,t){const n={};return t.forEach(r=>{n[r]=Zi(e,r)}),n}const kp=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Tp(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function Np(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Sp(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Np(e))}function Cp(e){const t=[],n=[];return Array.from(e.querySelectorAll(kp)).forEach((r,o)=>{const s=Tp(r);s===-1||!Sp(r)||(s===0?t.push(r):n.push({documentOrder:o,tabIndex:s,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function Op(){return!0}function nr(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:s=Cp,isEnabled:i=Op,open:l}=e,c=k.useRef(!1),d=k.useRef(null),m=k.useRef(null),v=k.useRef(null),g=k.useRef(null),p=k.useRef(!1),h=k.useRef(null),f=Ue(t.ref,h),b=k.useRef(null);k.useEffect(()=>{!l||!h.current||(p.current=!n)},[n,l]),k.useEffect(()=>{if(!l||!h.current)return;const x=Ce(h.current);return h.current.contains(x.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),p.current&&h.current.focus()),()=>{o||(v.current&&v.current.focus&&(c.current=!0,v.current.focus()),v.current=null)}},[l]),k.useEffect(()=>{if(!l||!h.current)return;const x=Ce(h.current),E=S=>{b.current=S,!(r||!i()||S.key!=="Tab")&&x.activeElement===h.current&&S.shiftKey&&(c.current=!0,m.current&&m.current.focus())},y=()=>{const S=h.current;if(S===null)return;if(!x.hasFocus()||!i()||c.current){c.current=!1;return}if(S.contains(x.activeElement)||r&&x.activeElement!==d.current&&x.activeElement!==m.current)return;if(x.activeElement!==g.current)g.current=null;else if(g.current!==null)return;if(!p.current)return;let j=[];if((x.activeElement===d.current||x.activeElement===m.current)&&(j=s(h.current)),j.length>0){var A,V;const R=!!((A=b.current)!=null&&A.shiftKey&&((V=b.current)==null?void 0:V.key)==="Tab"),_=j[0],M=j[j.length-1];typeof _!="string"&&typeof M!="string"&&(R?M.focus():_.focus())}else S.focus()};x.addEventListener("focusin",y),x.addEventListener("keydown",E,!0);const T=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(T),x.removeEventListener("focusin",y),x.removeEventListener("keydown",E,!0)}},[n,r,o,i,l,s]);const w=x=>{v.current===null&&(v.current=x.relatedTarget),p.current=!0,g.current=x.target;const E=t.props.onFocus;E&&E(x)},P=x=>{v.current===null&&(v.current=x.relatedTarget),p.current=!0};return u.jsxs(k.Fragment,{children:[u.jsx("div",{tabIndex:l?0:-1,onFocus:P,ref:d,"data-testid":"sentinelStart"}),k.cloneElement(t,{ref:f,onFocus:w}),u.jsx("div",{tabIndex:l?0:-1,onFocus:P,ref:m,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(nr.propTypes={children:$n,disableAutoFocus:a.bool,disableEnforceFocus:a.bool,disableRestoreFocus:a.bool,getTabbable:a.func,isEnabled:a.func,open:a.bool.isRequired});process.env.NODE_ENV!=="production"&&(nr["propTypes"]=Ai(nr.propTypes));function Pp(e){return typeof e=="function"?e():e}const Sn=k.forwardRef(function(t,n){const{children:r,container:o,disablePortal:s=!1}=t,[i,l]=k.useState(null),c=Ue(k.isValidElement(r)?r.ref:null,n);if(Rt(()=>{s||l(Pp(o)||document.body)},[o,s]),Rt(()=>{if(i&&!s)return tr(n,i),()=>{tr(n,null)}},[n,i,s]),s){if(k.isValidElement(r)){const d={ref:c};return k.cloneElement(r,d)}return u.jsx(k.Fragment,{children:r})}return u.jsx(k.Fragment,{children:i&&Ul.createPortal(r,i)})});process.env.NODE_ENV!=="production"&&(Sn.propTypes={children:a.node,container:a.oneOfType([ot,a.func]),disablePortal:a.bool});process.env.NODE_ENV!=="production"&&(Sn["propTypes"]=Ai(Sn.propTypes));function Rp(e){const t=Ce(e);return t.body===e?qt(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function vn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Ts(e){return parseInt(qt(e).getComputedStyle(e).paddingRight,10)||0}function jp(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Ns(e,t,n,r,o){const s=[t,n,...r];[].forEach.call(e.children,i=>{const l=s.indexOf(i)===-1,c=!jp(i);l&&c&&vn(i,o)})}function Br(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function $p(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(Rp(r)){const i=zi(Ce(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Ts(r)+i}px`;const l=Ce(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${Ts(c)+i}px`})}let s;if(r.parentNode instanceof DocumentFragment)s=Ce(r).body;else{const i=r.parentElement,l=qt(r);s=(i==null?void 0:i.nodeName)==="HTML"&&l.getComputedStyle(i).overflowY==="scroll"?i:r}n.push({value:s.style.overflow,property:"overflow",el:s},{value:s.style.overflowX,property:"overflow-x",el:s},{value:s.style.overflowY,property:"overflow-y",el:s}),s.style.overflow="hidden"}return()=>{n.forEach(({value:s,el:i,property:l})=>{s?i.style.setProperty(l,s):i.style.removeProperty(l)})}}function Ip(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class _p{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&vn(t.modalRef,!1);const o=Ip(n);Ns(n,t.mount,t.modalRef,o,!0);const s=Br(this.containers,i=>i.container===n);return s!==-1?(this.containers[s].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=Br(this.containers,s=>s.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=$p(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=Br(this.containers,i=>i.modals.indexOf(t)!==-1),s=this.containers[o];if(s.modals.splice(s.modals.indexOf(t),1),this.modals.splice(r,1),s.modals.length===0)s.restore&&s.restore(),t.modalRef&&vn(t.modalRef,n),Ns(s.container,t.mount,t.modalRef,s.hiddenSiblings,!1),this.containers.splice(o,1);else{const i=s.modals[s.modals.length-1];i.modalRef&&vn(i.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Mp(e){return typeof e=="function"?e():e}function Ap(e){return e?e.props.hasOwnProperty("in"):!1}const Dp=new _p;function Bp(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Dp,closeAfterTransition:s=!1,onTransitionEnter:i,onTransitionExited:l,children:c,onClose:d,open:m,rootRef:v}=e,g=k.useRef({}),p=k.useRef(null),h=k.useRef(null),f=Ue(h,v),[b,w]=k.useState(!m),P=Ap(c);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const E=()=>Ce(p.current),y=()=>(g.current.modalRef=h.current,g.current.mount=p.current,g.current),T=()=>{o.mount(y(),{disableScrollLock:r}),h.current&&(h.current.scrollTop=0)},S=Nn(()=>{const I=Mp(t)||E().body;o.add(y(),I),h.current&&T()}),j=k.useCallback(()=>o.isTopModal(y()),[o]),A=Nn(I=>{p.current=I,I&&(m&&j()?T():h.current&&vn(h.current,x))}),V=k.useCallback(()=>{o.remove(y(),x)},[x,o]);k.useEffect(()=>()=>{V()},[V]),k.useEffect(()=>{m?S():(!P||!s)&&V()},[m,V,P,s,S]);const R=I=>z=>{var Z;(Z=I.onKeyDown)==null||Z.call(I,z),!(z.key!=="Escape"||z.which===229||!j())&&(n||(z.stopPropagation(),d&&d(z,"escapeKeyDown")))},_=I=>z=>{var Z;(Z=I.onClick)==null||Z.call(I,z),z.target===z.currentTarget&&d&&d(z,"backdropClick")};return{getRootProps:(I={})=>{const z=Ki(e);delete z.onTransitionEnter,delete z.onTransitionExited;const Z=C({},z,I);return C({role:"presentation"},Z,{onKeyDown:R(Z),ref:f})},getBackdropProps:(I={})=>{const z=I;return C({"aria-hidden":!0},z,{onClick:_(z),open:m})},getTransitionProps:()=>{const I=()=>{w(!1),i&&i()},z=()=>{w(!0),l&&l(),s&&V()};return{onEnter:Qr(I,c==null?void 0:c.props.onEnter),onExited:Qr(z,c==null?void 0:c.props.onExited)}},rootRef:f,portalRef:A,isTopModal:j,exited:b,hasTransition:P}}var $e="top",He="bottom",We="right",Ie="left",Eo="auto",_n=[$e,He,We,Ie],Xt="start",Cn="end",Lp="clippingParents",Qi="viewport",an="popper",Vp="reference",Ss=_n.reduce(function(e,t){return e.concat([t+"-"+Xt,t+"-"+Cn])},[]),ea=[].concat(_n,[Eo]).reduce(function(e,t){return e.concat([t,t+"-"+Xt,t+"-"+Cn])},[]),Fp="beforeRead",zp="read",Up="afterRead",Hp="beforeMain",Wp="main",qp="afterMain",Xp="beforeWrite",Gp="write",Yp="afterWrite",Kp=[Fp,zp,Up,Hp,Wp,qp,Xp,Gp,Yp];function Je(e){return e?(e.nodeName||"").toLowerCase():null}function Le(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function $t(e){var t=Le(e).Element;return e instanceof t||e instanceof Element}function ze(e){var t=Le(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function ko(e){if(typeof ShadowRoot>"u")return!1;var t=Le(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Jp(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},s=t.elements[n];!ze(s)||!Je(s)||(Object.assign(s.style,r),Object.keys(o).forEach(function(i){var l=o[i];l===!1?s.removeAttribute(i):s.setAttribute(i,l===!0?"":l)}))})}function Zp(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],s=t.attributes[r]||{},i=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=i.reduce(function(c,d){return c[d]="",c},{});!ze(o)||!Je(o)||(Object.assign(o.style,l),Object.keys(s).forEach(function(c){o.removeAttribute(c)}))})}}const Qp={name:"applyStyles",enabled:!0,phase:"write",fn:Jp,effect:Zp,requires:["computeStyles"]};function Ye(e){return e.split("-")[0]}var Ot=Math.max,rr=Math.min,Gt=Math.round;function no(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function ta(){return!/^((?!chrome|android).)*safari/i.test(no())}function Yt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,s=1;t&&ze(e)&&(o=e.offsetWidth>0&&Gt(r.width)/e.offsetWidth||1,s=e.offsetHeight>0&&Gt(r.height)/e.offsetHeight||1);var i=$t(e)?Le(e):window,l=i.visualViewport,c=!ta()&&n,d=(r.left+(c&&l?l.offsetLeft:0))/o,m=(r.top+(c&&l?l.offsetTop:0))/s,v=r.width/o,g=r.height/s;return{width:v,height:g,top:m,right:d+v,bottom:m+g,left:d,x:d,y:m}}function To(e){var t=Yt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function na(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&ko(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function st(e){return Le(e).getComputedStyle(e)}function eu(e){return["table","td","th"].indexOf(Je(e))>=0}function ht(e){return(($t(e)?e.ownerDocument:e.document)||window.document).documentElement}function hr(e){return Je(e)==="html"?e:e.assignedSlot||e.parentNode||(ko(e)?e.host:null)||ht(e)}function Cs(e){return!ze(e)||st(e).position==="fixed"?null:e.offsetParent}function tu(e){var t=/firefox/i.test(no()),n=/Trident/i.test(no());if(n&&ze(e)){var r=st(e);if(r.position==="fixed")return null}var o=hr(e);for(ko(o)&&(o=o.host);ze(o)&&["html","body"].indexOf(Je(o))<0;){var s=st(o);if(s.transform!=="none"||s.perspective!=="none"||s.contain==="paint"||["transform","perspective"].indexOf(s.willChange)!==-1||t&&s.willChange==="filter"||t&&s.filter&&s.filter!=="none")return o;o=o.parentNode}return null}function Mn(e){for(var t=Le(e),n=Cs(e);n&&eu(n)&&st(n).position==="static";)n=Cs(n);return n&&(Je(n)==="html"||Je(n)==="body"&&st(n).position==="static")?t:n||tu(e)||t}function No(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function yn(e,t,n){return Ot(e,rr(t,n))}function nu(e,t,n){var r=yn(e,t,n);return r>n?n:r}function ra(){return{top:0,right:0,bottom:0,left:0}}function oa(e){return Object.assign({},ra(),e)}function sa(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var ru=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,oa(typeof t!="number"?t:sa(t,_n))};function ou(e){var t,n=e.state,r=e.name,o=e.options,s=n.elements.arrow,i=n.modifiersData.popperOffsets,l=Ye(n.placement),c=No(l),d=[Ie,We].indexOf(l)>=0,m=d?"height":"width";if(!(!s||!i)){var v=ru(o.padding,n),g=To(s),p=c==="y"?$e:Ie,h=c==="y"?He:We,f=n.rects.reference[m]+n.rects.reference[c]-i[c]-n.rects.popper[m],b=i[c]-n.rects.reference[c],w=Mn(s),P=w?c==="y"?w.clientHeight||0:w.clientWidth||0:0,x=f/2-b/2,E=v[p],y=P-g[m]-v[h],T=P/2-g[m]/2+x,S=yn(E,T,y),j=c;n.modifiersData[r]=(t={},t[j]=S,t.centerOffset=S-T,t)}}function su(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||na(t.elements.popper,o)&&(t.elements.arrow=o))}const iu={name:"arrow",enabled:!0,phase:"main",fn:ou,effect:su,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Kt(e){return e.split("-")[1]}var au={top:"auto",right:"auto",bottom:"auto",left:"auto"};function lu(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Gt(n*o)/o||0,y:Gt(r*o)/o||0}}function Os(e){var t,n=e.popper,r=e.popperRect,o=e.placement,s=e.variation,i=e.offsets,l=e.position,c=e.gpuAcceleration,d=e.adaptive,m=e.roundOffsets,v=e.isFixed,g=i.x,p=g===void 0?0:g,h=i.y,f=h===void 0?0:h,b=typeof m=="function"?m({x:p,y:f}):{x:p,y:f};p=b.x,f=b.y;var w=i.hasOwnProperty("x"),P=i.hasOwnProperty("y"),x=Ie,E=$e,y=window;if(d){var T=Mn(n),S="clientHeight",j="clientWidth";if(T===Le(n)&&(T=ht(n),st(T).position!=="static"&&l==="absolute"&&(S="scrollHeight",j="scrollWidth")),T=T,o===$e||(o===Ie||o===We)&&s===Cn){E=He;var A=v&&T===y&&y.visualViewport?y.visualViewport.height:T[S];f-=A-r.height,f*=c?1:-1}if(o===Ie||(o===$e||o===He)&&s===Cn){x=We;var V=v&&T===y&&y.visualViewport?y.visualViewport.width:T[j];p-=V-r.width,p*=c?1:-1}}var R=Object.assign({position:l},d&&au),_=m===!0?lu({x:p,y:f},Le(n)):{x:p,y:f};if(p=_.x,f=_.y,c){var M;return Object.assign({},R,(M={},M[E]=P?"0":"",M[x]=w?"0":"",M.transform=(y.devicePixelRatio||1)<=1?"translate("+p+"px, "+f+"px)":"translate3d("+p+"px, "+f+"px, 0)",M))}return Object.assign({},R,(t={},t[E]=P?f+"px":"",t[x]=w?p+"px":"",t.transform="",t))}function cu(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,s=n.adaptive,i=s===void 0?!0:s,l=n.roundOffsets,c=l===void 0?!0:l,d={placement:Ye(t.placement),variation:Kt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Os(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Os(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const pu={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:cu,data:{}};var Un={passive:!0};function uu(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,s=o===void 0?!0:o,i=r.resize,l=i===void 0?!0:i,c=Le(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return s&&d.forEach(function(m){m.addEventListener("scroll",n.update,Un)}),l&&c.addEventListener("resize",n.update,Un),function(){s&&d.forEach(function(m){m.removeEventListener("scroll",n.update,Un)}),l&&c.removeEventListener("resize",n.update,Un)}}const du={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:uu,data:{}};var fu={left:"right",right:"left",bottom:"top",top:"bottom"};function Xn(e){return e.replace(/left|right|bottom|top/g,function(t){return fu[t]})}var mu={start:"end",end:"start"};function Ps(e){return e.replace(/start|end/g,function(t){return mu[t]})}function So(e){var t=Le(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Co(e){return Yt(ht(e)).left+So(e).scrollLeft}function hu(e,t){var n=Le(e),r=ht(e),o=n.visualViewport,s=r.clientWidth,i=r.clientHeight,l=0,c=0;if(o){s=o.width,i=o.height;var d=ta();(d||!d&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:s,height:i,x:l+Co(e),y:c}}function gu(e){var t,n=ht(e),r=So(e),o=(t=e.ownerDocument)==null?void 0:t.body,s=Ot(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),i=Ot(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Co(e),c=-r.scrollTop;return st(o||n).direction==="rtl"&&(l+=Ot(n.clientWidth,o?o.clientWidth:0)-s),{width:s,height:i,x:l,y:c}}function Oo(e){var t=st(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function ia(e){return["html","body","#document"].indexOf(Je(e))>=0?e.ownerDocument.body:ze(e)&&Oo(e)?e:ia(hr(e))}function wn(e,t){var n;t===void 0&&(t=[]);var r=ia(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),s=Le(r),i=o?[s].concat(s.visualViewport||[],Oo(r)?r:[]):r,l=t.concat(i);return o?l:l.concat(wn(hr(i)))}function ro(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function bu(e,t){var n=Yt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Rs(e,t,n){return t===Qi?ro(hu(e,n)):$t(t)?bu(t,n):ro(gu(ht(e)))}function vu(e){var t=wn(hr(e)),n=["absolute","fixed"].indexOf(st(e).position)>=0,r=n&&ze(e)?Mn(e):e;return $t(r)?t.filter(function(o){return $t(o)&&na(o,r)&&Je(o)!=="body"}):[]}function yu(e,t,n,r){var o=t==="clippingParents"?vu(e):[].concat(t),s=[].concat(o,[n]),i=s[0],l=s.reduce(function(c,d){var m=Rs(e,d,r);return c.top=Ot(m.top,c.top),c.right=rr(m.right,c.right),c.bottom=rr(m.bottom,c.bottom),c.left=Ot(m.left,c.left),c},Rs(e,i,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function aa(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ye(r):null,s=r?Kt(r):null,i=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case $e:c={x:i,y:t.y-n.height};break;case He:c={x:i,y:t.y+t.height};break;case We:c={x:t.x+t.width,y:l};break;case Ie:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var d=o?No(o):null;if(d!=null){var m=d==="y"?"height":"width";switch(s){case Xt:c[d]=c[d]-(t[m]/2-n[m]/2);break;case Cn:c[d]=c[d]+(t[m]/2-n[m]/2);break}}return c}function On(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,s=n.strategy,i=s===void 0?e.strategy:s,l=n.boundary,c=l===void 0?Lp:l,d=n.rootBoundary,m=d===void 0?Qi:d,v=n.elementContext,g=v===void 0?an:v,p=n.altBoundary,h=p===void 0?!1:p,f=n.padding,b=f===void 0?0:f,w=oa(typeof b!="number"?b:sa(b,_n)),P=g===an?Vp:an,x=e.rects.popper,E=e.elements[h?P:g],y=yu($t(E)?E:E.contextElement||ht(e.elements.popper),c,m,i),T=Yt(e.elements.reference),S=aa({reference:T,element:x,strategy:"absolute",placement:o}),j=ro(Object.assign({},x,S)),A=g===an?j:T,V={top:y.top-A.top+w.top,bottom:A.bottom-y.bottom+w.bottom,left:y.left-A.left+w.left,right:A.right-y.right+w.right},R=e.modifiersData.offset;if(g===an&&R){var _=R[o];Object.keys(V).forEach(function(M){var F=[We,He].indexOf(M)>=0?1:-1,D=[$e,He].indexOf(M)>=0?"y":"x";V[M]+=_[D]*F})}return V}function wu(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,s=n.rootBoundary,i=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,d=c===void 0?ea:c,m=Kt(r),v=m?l?Ss:Ss.filter(function(h){return Kt(h)===m}):_n,g=v.filter(function(h){return d.indexOf(h)>=0});g.length===0&&(g=v);var p=g.reduce(function(h,f){return h[f]=On(e,{placement:f,boundary:o,rootBoundary:s,padding:i})[Ye(f)],h},{});return Object.keys(p).sort(function(h,f){return p[h]-p[f]})}function xu(e){if(Ye(e)===Eo)return[];var t=Xn(e);return[Ps(e),t,Ps(t)]}function Eu(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,s=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!0:i,c=n.fallbackPlacements,d=n.padding,m=n.boundary,v=n.rootBoundary,g=n.altBoundary,p=n.flipVariations,h=p===void 0?!0:p,f=n.allowedAutoPlacements,b=t.options.placement,w=Ye(b),P=w===b,x=c||(P||!h?[Xn(b)]:xu(b)),E=[b].concat(x).reduce(function(H,q){return H.concat(Ye(q)===Eo?wu(t,{placement:q,boundary:m,rootBoundary:v,padding:d,flipVariations:h,allowedAutoPlacements:f}):q)},[]),y=t.rects.reference,T=t.rects.popper,S=new Map,j=!0,A=E[0],V=0;V<E.length;V++){var R=E[V],_=Ye(R),M=Kt(R)===Xt,F=[$e,He].indexOf(_)>=0,D=F?"width":"height",I=On(t,{placement:R,boundary:m,rootBoundary:v,altBoundary:g,padding:d}),z=F?M?We:Ie:M?He:$e;y[D]>T[D]&&(z=Xn(z));var Z=Xn(z),G=[];if(s&&G.push(I[_]<=0),l&&G.push(I[z]<=0,I[Z]<=0),G.every(function(H){return H})){A=R,j=!1;break}S.set(R,G)}if(j)for(var N=h?3:1,B=function(q){var Y=E.find(function(K){var X=S.get(K);if(X)return X.slice(0,q).every(function(Q){return Q})});if(Y)return A=Y,"break"},U=N;U>0;U--){var J=B(U);if(J==="break")break}t.placement!==A&&(t.modifiersData[r]._skip=!0,t.placement=A,t.reset=!0)}}const ku={name:"flip",enabled:!0,phase:"main",fn:Eu,requiresIfExists:["offset"],data:{_skip:!1}};function js(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function $s(e){return[$e,We,He,Ie].some(function(t){return e[t]>=0})}function Tu(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,s=t.modifiersData.preventOverflow,i=On(t,{elementContext:"reference"}),l=On(t,{altBoundary:!0}),c=js(i,r),d=js(l,o,s),m=$s(c),v=$s(d);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:d,isReferenceHidden:m,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":m,"data-popper-escaped":v})}const Nu={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Tu};function Su(e,t,n){var r=Ye(e),o=[Ie,$e].indexOf(r)>=0?-1:1,s=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,i=s[0],l=s[1];return i=i||0,l=(l||0)*o,[Ie,We].indexOf(r)>=0?{x:l,y:i}:{x:i,y:l}}function Cu(e){var t=e.state,n=e.options,r=e.name,o=n.offset,s=o===void 0?[0,0]:o,i=ea.reduce(function(m,v){return m[v]=Su(v,t.rects,s),m},{}),l=i[t.placement],c=l.x,d=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=d),t.modifiersData[r]=i}const Ou={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Cu};function Pu(e){var t=e.state,n=e.name;t.modifiersData[n]=aa({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Ru={name:"popperOffsets",enabled:!0,phase:"read",fn:Pu,data:{}};function ju(e){return e==="x"?"y":"x"}function $u(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,s=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!1:i,c=n.boundary,d=n.rootBoundary,m=n.altBoundary,v=n.padding,g=n.tether,p=g===void 0?!0:g,h=n.tetherOffset,f=h===void 0?0:h,b=On(t,{boundary:c,rootBoundary:d,padding:v,altBoundary:m}),w=Ye(t.placement),P=Kt(t.placement),x=!P,E=No(w),y=ju(E),T=t.modifiersData.popperOffsets,S=t.rects.reference,j=t.rects.popper,A=typeof f=="function"?f(Object.assign({},t.rects,{placement:t.placement})):f,V=typeof A=="number"?{mainAxis:A,altAxis:A}:Object.assign({mainAxis:0,altAxis:0},A),R=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,_={x:0,y:0};if(T){if(s){var M,F=E==="y"?$e:Ie,D=E==="y"?He:We,I=E==="y"?"height":"width",z=T[E],Z=z+b[F],G=z-b[D],N=p?-j[I]/2:0,B=P===Xt?S[I]:j[I],U=P===Xt?-j[I]:-S[I],J=t.elements.arrow,H=p&&J?To(J):{width:0,height:0},q=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:ra(),Y=q[F],K=q[D],X=yn(0,S[I],H[I]),Q=x?S[I]/2-N-X-Y-V.mainAxis:B-X-Y-V.mainAxis,ee=x?-S[I]/2+N+X+K+V.mainAxis:U+X+K+V.mainAxis,ie=t.elements.arrow&&Mn(t.elements.arrow),L=ie?E==="y"?ie.clientTop||0:ie.clientLeft||0:0,te=(M=R==null?void 0:R[E])!=null?M:0,$=z+Q-te-L,ae=z+ee-te,Te=yn(p?rr(Z,$):Z,z,p?Ot(G,ae):G);T[E]=Te,_[E]=Te-z}if(l){var Pe,Ee=E==="x"?$e:Ie,bt=E==="x"?He:We,Re=T[y],Qe=y==="y"?"height":"width",Me=Re+b[Ee],et=Re-b[bt],Ne=[$e,Ie].indexOf(w)!==-1,_t=(Pe=R==null?void 0:R[y])!=null?Pe:0,vt=Ne?Me:Re-S[Qe]-j[Qe]-_t+V.altAxis,Qt=Ne?Re+S[Qe]+j[Qe]-_t-V.altAxis:et,Ln=p&&Ne?nu(vt,Re,Qt):yn(p?vt:Me,Re,p?Qt:et);T[y]=Ln,_[y]=Ln-Re}t.modifiersData[r]=_}}const Iu={name:"preventOverflow",enabled:!0,phase:"main",fn:$u,requiresIfExists:["offset"]};function _u(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Mu(e){return e===Le(e)||!ze(e)?So(e):_u(e)}function Au(e){var t=e.getBoundingClientRect(),n=Gt(t.width)/e.offsetWidth||1,r=Gt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Du(e,t,n){n===void 0&&(n=!1);var r=ze(t),o=ze(t)&&Au(t),s=ht(t),i=Yt(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((Je(t)!=="body"||Oo(s))&&(l=Mu(t)),ze(t)?(c=Yt(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):s&&(c.x=Co(s))),{x:i.left+l.scrollLeft-c.x,y:i.top+l.scrollTop-c.y,width:i.width,height:i.height}}function Bu(e){var t=new Map,n=new Set,r=[];e.forEach(function(s){t.set(s.name,s)});function o(s){n.add(s.name);var i=[].concat(s.requires||[],s.requiresIfExists||[]);i.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(s)}return e.forEach(function(s){n.has(s.name)||o(s)}),r}function Lu(e){var t=Bu(e);return Kp.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Vu(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Fu(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var Is={placement:"bottom",modifiers:[],strategy:"absolute"};function _s(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function zu(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,s=o===void 0?Is:o;return function(l,c,d){d===void 0&&(d=s);var m={placement:"bottom",orderedModifiers:[],options:Object.assign({},Is,s),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},v=[],g=!1,p={state:m,setOptions:function(w){var P=typeof w=="function"?w(m.options):w;f(),m.options=Object.assign({},s,m.options,P),m.scrollParents={reference:$t(l)?wn(l):l.contextElement?wn(l.contextElement):[],popper:wn(c)};var x=Lu(Fu([].concat(r,m.options.modifiers)));return m.orderedModifiers=x.filter(function(E){return E.enabled}),h(),p.update()},forceUpdate:function(){if(!g){var w=m.elements,P=w.reference,x=w.popper;if(_s(P,x)){m.rects={reference:Du(P,Mn(x),m.options.strategy==="fixed"),popper:To(x)},m.reset=!1,m.placement=m.options.placement,m.orderedModifiers.forEach(function(V){return m.modifiersData[V.name]=Object.assign({},V.data)});for(var E=0;E<m.orderedModifiers.length;E++){if(m.reset===!0){m.reset=!1,E=-1;continue}var y=m.orderedModifiers[E],T=y.fn,S=y.options,j=S===void 0?{}:S,A=y.name;typeof T=="function"&&(m=T({state:m,options:j,name:A,instance:p})||m)}}}},update:Vu(function(){return new Promise(function(b){p.forceUpdate(),b(m)})}),destroy:function(){f(),g=!0}};if(!_s(l,c))return p;p.setOptions(d).then(function(b){!g&&d.onFirstUpdate&&d.onFirstUpdate(b)});function h(){m.orderedModifiers.forEach(function(b){var w=b.name,P=b.options,x=P===void 0?{}:P,E=b.effect;if(typeof E=="function"){var y=E({state:m,name:w,instance:p,options:x}),T=function(){};v.push(y||T)}})}function f(){v.forEach(function(b){return b()}),v=[]}return p}}var Uu=[du,Ru,pu,Qp,Ou,ku,Iu,iu,Nu],Hu=zu({defaultModifiers:Uu});const la="Popper";function Wu(e){return Zi(la,e)}Ep(la,["root"]);const qu=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Xu=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Gu(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function or(e){return typeof e=="function"?e():e}function gr(e){return e.nodeType!==void 0}function Yu(e){return!gr(e)}const Ku=()=>at({root:["root"]},gp(Wu)),Ju={},Zu=k.forwardRef(function(t,n){var r;const{anchorEl:o,children:s,direction:i,disablePortal:l,modifiers:c,open:d,placement:m,popperOptions:v,popperRef:g,slotProps:p={},slots:h={},TransitionProps:f}=t,b=fe(t,qu),w=k.useRef(null),P=Ue(w,n),x=k.useRef(null),E=Ue(x,g),y=k.useRef(E);Rt(()=>{y.current=E},[E]),k.useImperativeHandle(g,()=>x.current,[]);const T=Gu(m,i),[S,j]=k.useState(T),[A,V]=k.useState(or(o));k.useEffect(()=>{x.current&&x.current.forceUpdate()}),k.useEffect(()=>{o&&V(or(o))},[o]),Rt(()=>{if(!A||!d)return;const D=Z=>{j(Z.placement)};if(process.env.NODE_ENV!=="production"&&A&&gr(A)&&A.nodeType===1){const Z=A.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Z.top===0&&Z.left===0&&Z.right===0&&Z.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let I=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:Z})=>{D(Z)}}];c!=null&&(I=I.concat(c)),v&&v.modifiers!=null&&(I=I.concat(v.modifiers));const z=Hu(A,w.current,C({placement:T},v,{modifiers:I}));return y.current(z),()=>{z.destroy(),y.current(null)}},[A,l,c,d,v,T]);const R={placement:S};f!==null&&(R.TransitionProps=f);const _=Ku(),M=(r=h.root)!=null?r:"div",F=jt({elementType:M,externalSlotProps:p.root,externalForwardedProps:b,additionalProps:{role:"tooltip",ref:P},ownerState:t,className:_.root});return u.jsx(M,C({},F,{children:typeof s=="function"?s(R):s}))}),ca=k.forwardRef(function(t,n){const{anchorEl:r,children:o,container:s,direction:i="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:d,open:m,placement:v="bottom",popperOptions:g=Ju,popperRef:p,style:h,transition:f=!1,slotProps:b={},slots:w={}}=t,P=fe(t,Xu),[x,E]=k.useState(!0),y=()=>{E(!1)},T=()=>{E(!0)};if(!c&&!m&&(!f||x))return null;let S;if(s)S=s;else if(r){const V=or(r);S=V&&gr(V)?Ce(V).body:Ce(null).body}const j=!m&&c&&(!f||x)?"none":void 0,A=f?{in:m,onEnter:y,onExited:T}:void 0;return u.jsx(Sn,{disablePortal:l,container:S,children:u.jsx(Zu,C({anchorEl:r,direction:i,disablePortal:l,modifiers:d,ref:n,open:f?!x:m,placement:v,popperOptions:g,popperRef:p,slotProps:b,slots:w},P,{style:C({position:"fixed",top:0,left:0,display:j},h),TransitionProps:A,children:o}))})});process.env.NODE_ENV!=="production"&&(ca.propTypes={anchorEl:Zt(a.oneOfType([ot,a.object,a.func]),e=>{if(e.open){const t=or(e.anchorEl);if(t&&gr(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Yu(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:a.oneOfType([a.node,a.func]),container:a.oneOfType([ot,a.func]),direction:a.oneOf(["ltr","rtl"]),disablePortal:a.bool,keepMounted:a.bool,modifiers:a.arrayOf(a.shape({data:a.object,effect:a.func,enabled:a.bool,fn:a.func,name:a.any,options:a.object,phase:a.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:a.arrayOf(a.string),requiresIfExists:a.arrayOf(a.string)})),open:a.bool.isRequired,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:a.shape({modifiers:a.array,onFirstUpdate:a.func,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:a.oneOf(["absolute","fixed"])}),popperRef:xo,slotProps:a.shape({root:a.oneOfType([a.func,a.object])}),slots:a.shape({root:a.elementType}),transition:a.bool});const Qu=["values","unit","step"],ed=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>C({},n,{[r.key]:r.val}),{})};function td(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=fe(e,Qu),s=ed(t),i=Object.keys(s);function l(g){return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${n})`}function c(g){return`@media (max-width:${(typeof t[g]=="number"?t[g]:g)-r/100}${n})`}function d(g,p){const h=i.indexOf(p);return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${n}) and (max-width:${(h!==-1&&typeof t[i[h]]=="number"?t[i[h]]:p)-r/100}${n})`}function m(g){return i.indexOf(g)+1<i.length?d(g,i[i.indexOf(g)+1]):l(g)}function v(g){const p=i.indexOf(g);return p===0?l(i[1]):p===i.length-1?c(i[p]):d(g,i[i.indexOf(g)+1]).replace("@media","@media not all and")}return C({keys:i,values:s,up:l,down:c,between:d,only:m,not:v,unit:n},o)}const nd={borderRadius:4},rd=nd,od=process.env.NODE_ENV!=="production"?a.oneOfType([a.number,a.string,a.object,a.array]):{},gt=od;function xn(e,t){return t?rt(e,t,{clone:!1}):e}const Po={xs:0,sm:600,md:900,lg:1200,xl:1536},Ms={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Po[e]}px)`};function it(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const s=r.breakpoints||Ms;return t.reduce((i,l,c)=>(i[s.up(s.keys[c])]=n(t[c]),i),{})}if(typeof t=="object"){const s=r.breakpoints||Ms;return Object.keys(t).reduce((i,l)=>{if(Object.keys(s.values||Po).indexOf(l)!==-1){const c=s.up(l);i[c]=n(t[l],l)}else{const c=l;i[c]=t[c]}return i},{})}return n(t)}function sd(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const s=e.up(o);return r[s]={},r},{}))||{}}function id(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function br(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,s)=>o&&o[s]?o[s]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function sr(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=br(e,n)||r,t&&(o=t(o,r,e)),o}function ke(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,s=i=>{if(i[t]==null)return null;const l=i[t],c=i.theme,d=br(c,r)||{};return it(i,l,v=>{let g=sr(d,o,v);return v===g&&typeof v=="string"&&(g=sr(d,o,`${t}${v==="default"?"":Ke(v)}`,v)),n===!1?g:{[n]:g}})};return s.propTypes=process.env.NODE_ENV!=="production"?{[t]:gt}:{},s.filterProps=[t],s}function ad(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const ld={m:"margin",p:"padding"},cd={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},As={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},pd=ad(e=>{if(e.length>2)if(As[e])e=As[e];else return[e];const[t,n]=e.split(""),r=ld[t],o=cd[n]||"";return Array.isArray(o)?o.map(s=>r+s):[r+o]}),vr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],yr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],ud=[...vr,...yr];function An(e,t,n,r){var o;const s=(o=br(e,t,!1))!=null?o:n;return typeof s=="number"?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&typeof i!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`),s*i):Array.isArray(s)?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&(Number.isInteger(i)?i>s.length-1&&console.error([`MUI: The value provided (${i}) overflows.`,`The supported values are: ${JSON.stringify(s)}.`,`${i} > ${s.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),s[i]):typeof s=="function"?s:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${s}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function pa(e){return An(e,"spacing",8,"spacing")}function Dn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function dd(e,t){return n=>e.reduce((r,o)=>(r[o]=Dn(t,n),r),{})}function fd(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=pd(n),s=dd(o,r),i=e[n];return it(e,i,s)}function ua(e,t){const n=pa(e.theme);return Object.keys(e).map(r=>fd(e,t,r,n)).reduce(xn,{})}function ve(e){return ua(e,vr)}ve.propTypes=process.env.NODE_ENV!=="production"?vr.reduce((e,t)=>(e[t]=gt,e),{}):{};ve.filterProps=vr;function ye(e){return ua(e,yr)}ye.propTypes=process.env.NODE_ENV!=="production"?yr.reduce((e,t)=>(e[t]=gt,e),{}):{};ye.filterProps=yr;process.env.NODE_ENV!=="production"&&ud.reduce((e,t)=>(e[t]=gt,e),{});function md(e=8){if(e.mui)return e;const t=pa({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(s=>{const i=t(s);return typeof i=="number"?`${i}px`:i}).join(" "));return n.mui=!0,n}function wr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(s=>{r[s]=o}),r),{}),n=r=>Object.keys(r).reduce((o,s)=>t[s]?xn(o,t[s](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Fe(e){return typeof e!="number"?e:`${e}px solid`}function qe(e,t){return ke({prop:e,themeKey:"borders",transform:t})}const hd=qe("border",Fe),gd=qe("borderTop",Fe),bd=qe("borderRight",Fe),vd=qe("borderBottom",Fe),yd=qe("borderLeft",Fe),wd=qe("borderColor"),xd=qe("borderTopColor"),Ed=qe("borderRightColor"),kd=qe("borderBottomColor"),Td=qe("borderLeftColor"),Nd=qe("outline",Fe),Sd=qe("outlineColor"),xr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=An(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:Dn(t,r)});return it(e,e.borderRadius,n)}return null};xr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:gt}:{};xr.filterProps=["borderRadius"];wr(hd,gd,bd,vd,yd,wd,xd,Ed,kd,Td,xr,Nd,Sd);const Er=e=>{if(e.gap!==void 0&&e.gap!==null){const t=An(e.theme,"spacing",8,"gap"),n=r=>({gap:Dn(t,r)});return it(e,e.gap,n)}return null};Er.propTypes=process.env.NODE_ENV!=="production"?{gap:gt}:{};Er.filterProps=["gap"];const kr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=An(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:Dn(t,r)});return it(e,e.columnGap,n)}return null};kr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:gt}:{};kr.filterProps=["columnGap"];const Tr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=An(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:Dn(t,r)});return it(e,e.rowGap,n)}return null};Tr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:gt}:{};Tr.filterProps=["rowGap"];const Cd=ke({prop:"gridColumn"}),Od=ke({prop:"gridRow"}),Pd=ke({prop:"gridAutoFlow"}),Rd=ke({prop:"gridAutoColumns"}),jd=ke({prop:"gridAutoRows"}),$d=ke({prop:"gridTemplateColumns"}),Id=ke({prop:"gridTemplateRows"}),_d=ke({prop:"gridTemplateAreas"}),Md=ke({prop:"gridArea"});wr(Er,kr,Tr,Cd,Od,Pd,Rd,jd,$d,Id,_d,Md);function Ut(e,t){return t==="grey"?t:e}const Ad=ke({prop:"color",themeKey:"palette",transform:Ut}),Dd=ke({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Ut}),Bd=ke({prop:"backgroundColor",themeKey:"palette",transform:Ut});wr(Ad,Dd,Bd);function Be(e){return e<=1&&e!==0?`${e*100}%`:e}const Ld=ke({prop:"width",transform:Be}),Ro=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const s=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Po[n];return s?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${s}${e.theme.breakpoints.unit}`}:{maxWidth:s}:{maxWidth:Be(n)}};return it(e,e.maxWidth,t)}return null};Ro.filterProps=["maxWidth"];const Vd=ke({prop:"minWidth",transform:Be}),Fd=ke({prop:"height",transform:Be}),zd=ke({prop:"maxHeight",transform:Be}),Ud=ke({prop:"minHeight",transform:Be});ke({prop:"size",cssProperty:"width",transform:Be});ke({prop:"size",cssProperty:"height",transform:Be});const Hd=ke({prop:"boxSizing"});wr(Ld,Ro,Vd,Fd,zd,Ud,Hd);const Wd={border:{themeKey:"borders",transform:Fe},borderTop:{themeKey:"borders",transform:Fe},borderRight:{themeKey:"borders",transform:Fe},borderBottom:{themeKey:"borders",transform:Fe},borderLeft:{themeKey:"borders",transform:Fe},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Fe},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:xr},color:{themeKey:"palette",transform:Ut},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Ut},backgroundColor:{themeKey:"palette",transform:Ut},p:{style:ye},pt:{style:ye},pr:{style:ye},pb:{style:ye},pl:{style:ye},px:{style:ye},py:{style:ye},padding:{style:ye},paddingTop:{style:ye},paddingRight:{style:ye},paddingBottom:{style:ye},paddingLeft:{style:ye},paddingX:{style:ye},paddingY:{style:ye},paddingInline:{style:ye},paddingInlineStart:{style:ye},paddingInlineEnd:{style:ye},paddingBlock:{style:ye},paddingBlockStart:{style:ye},paddingBlockEnd:{style:ye},m:{style:ve},mt:{style:ve},mr:{style:ve},mb:{style:ve},ml:{style:ve},mx:{style:ve},my:{style:ve},margin:{style:ve},marginTop:{style:ve},marginRight:{style:ve},marginBottom:{style:ve},marginLeft:{style:ve},marginX:{style:ve},marginY:{style:ve},marginInline:{style:ve},marginInlineStart:{style:ve},marginInlineEnd:{style:ve},marginBlock:{style:ve},marginBlockStart:{style:ve},marginBlockEnd:{style:ve},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Er},rowGap:{style:Tr},columnGap:{style:kr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Be},maxWidth:{style:Ro},minWidth:{transform:Be},height:{transform:Be},maxHeight:{transform:Be},minHeight:{transform:Be},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},jo=Wd;function qd(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Xd(e,t){return typeof e=="function"?e(t):e}function Gd(){function e(n,r,o,s){const i={[n]:r,theme:o},l=s[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:d,transform:m,style:v}=l;if(r==null)return null;if(d==="typography"&&r==="inherit")return{[n]:r};const g=br(o,d)||{};return v?v(i):it(i,r,h=>{let f=sr(g,m,h);return h===f&&typeof h=="string"&&(f=sr(g,m,`${n}${h==="default"?"":Ke(h)}`,h)),c===!1?f:{[c]:f}})}function t(n){var r;const{sx:o,theme:s={}}=n||{};if(!o)return null;const i=(r=s.unstable_sxConfig)!=null?r:jo;function l(c){let d=c;if(typeof c=="function")d=c(s);else if(typeof c!="object")return c;if(!d)return null;const m=sd(s.breakpoints),v=Object.keys(m);let g=m;return Object.keys(d).forEach(p=>{const h=Xd(d[p],s);if(h!=null)if(typeof h=="object")if(i[p])g=xn(g,e(p,h,s,i));else{const f=it({theme:s},h,b=>({[p]:b}));qd(f,h)?g[p]=t({sx:h,theme:s}):g=xn(g,f)}else g=xn(g,e(p,h,s,i))}),id(v,g)}return Array.isArray(o)?o.map(l):l(o)}return t}const da=Gd();da.filterProps=["sx"];const $o=da;function Yd(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Kd=["breakpoints","palette","spacing","shape"];function Io(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:s={}}=e,i=fe(e,Kd),l=td(n),c=md(o);let d=rt({breakpoints:l,direction:"ltr",components:{},palette:C({mode:"light"},r),spacing:c,shape:C({},rd,s)},i);return d.applyStyles=Yd,d=t.reduce((m,v)=>rt(m,v),d),d.unstable_sxConfig=C({},jo,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(v){return $o({sx:v,theme:this})},d}function Jd(e){return Object.keys(e).length===0}function fa(e=null){const t=k.useContext(Gr.ThemeContext);return!t||Jd(t)?e:t}const Zd=Io();function ma(e=Zd){return fa(e)}const Qd=["ownerState"],ef=["variants"],tf=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function nf(e){return Object.keys(e).length===0}function rf(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Gn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const of=Io(),Ds=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Hn({defaultTheme:e,theme:t,themeId:n}){return nf(t)?e:t[n]||t}function sf(e){return e?(t,n)=>n[e]:null}function Yn(e,t){let{ownerState:n}=t,r=fe(t,Qd);const o=typeof e=="function"?e(C({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(s=>Yn(s,C({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:s=[]}=o;let l=fe(o,ef);return s.forEach(c=>{let d=!0;typeof c.props=="function"?d=c.props(C({ownerState:n},r,n)):Object.keys(c.props).forEach(m=>{(n==null?void 0:n[m])!==c.props[m]&&r[m]!==c.props[m]&&(d=!1)}),d&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(C({ownerState:n},r,n)):c.style))}),l}return o}function af(e={}){const{themeId:t,defaultTheme:n=of,rootShouldForwardProp:r=Gn,slotShouldForwardProp:o=Gn}=e,s=i=>$o(C({},i,{theme:Hn(C({},i,{defaultTheme:n,themeId:t}))}));return s.__mui_systemSx=!0,(i,l={})=>{Gr.internal_processStyles(i,y=>y.filter(T=>!(T!=null&&T.__mui_systemSx)));const{name:c,slot:d,skipVariantsResolver:m,skipSx:v,overridesResolver:g=sf(Ds(d))}=l,p=fe(l,tf),h=m!==void 0?m:d&&d!=="Root"&&d!=="root"||!1,f=v||!1;let b;process.env.NODE_ENV!=="production"&&c&&(b=`${c}-${Ds(d||"Root")}`);let w=Gn;d==="Root"||d==="root"?w=r:d?w=o:rf(i)&&(w=void 0);const P=Gr(i,C({shouldForwardProp:w,label:b},p)),x=y=>typeof y=="function"&&y.__emotion_real!==y||Tt(y)?T=>Yn(y,C({},T,{theme:Hn({theme:T.theme,defaultTheme:n,themeId:t})})):y,E=(y,...T)=>{let S=x(y);const j=T?T.map(x):[];c&&g&&j.push(R=>{const _=Hn(C({},R,{defaultTheme:n,themeId:t}));if(!_.components||!_.components[c]||!_.components[c].styleOverrides)return null;const M=_.components[c].styleOverrides,F={};return Object.entries(M).forEach(([D,I])=>{F[D]=Yn(I,C({},R,{theme:_}))}),g(R,F)}),c&&!h&&j.push(R=>{var _;const M=Hn(C({},R,{defaultTheme:n,themeId:t})),F=M==null||(_=M.components)==null||(_=_[c])==null?void 0:_.variants;return Yn({variants:F},C({},R,{theme:M}))}),f||j.push(s);const A=j.length-T.length;if(Array.isArray(y)&&A>0){const R=new Array(A).fill("");S=[...y,...R],S.raw=[...y.raw,...R]}const V=P(S,...j);if(process.env.NODE_ENV!=="production"){let R;c&&(R=`${c}${Ke(d||"")}`),R===void 0&&(R=`Styled(${Hc(i)})`),V.displayName=R}return i.muiName&&(V.muiName=i.muiName),V};return P.withConfig&&(E.withConfig=P.withConfig),E}}function lf(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:qi(t.components[n].defaultProps,r)}function cf({props:e,name:t,defaultTheme:n,themeId:r}){let o=ma(n);return r&&(o=o[r]||o),lf({theme:o,name:t,props:e})}function _o(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),fp(e,t,n)}function pf(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function It(e){if(e.type)return e;if(e.charAt(0)==="#")return It(pf(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Wt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Wt(10,o))}else r=r.split(",");return r=r.map(s=>parseFloat(s)),{type:n,values:r,colorSpace:o}}function Nr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,s)=>s<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function uf(e){e=It(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,s=r*Math.min(o,1-o),i=(d,m=(d+n/30)%12)=>o-s*Math.max(Math.min(m-3,9-m,1),-1);let l="rgb";const c=[Math.round(i(0)*255),Math.round(i(8)*255),Math.round(i(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),Nr({type:l,values:c})}function Bs(e){e=It(e);let t=e.type==="hsl"||e.type==="hsla"?It(uf(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Ls(e,t){const n=Bs(e),r=Bs(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function ir(e,t){return e=It(e),t=_o(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Nr(e)}function df(e,t){if(e=It(e),t=_o(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return Nr(e)}function ff(e,t){if(e=It(e),t=_o(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return Nr(e)}function mf(e,t){return C({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const hf={black:"#000",white:"#fff"},Pn=hf,gf={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},bf=gf,vf={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Mt=vf,yf={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},At=yf,wf={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},ln=wf,xf={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Dt=xf,Ef={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Bt=Ef,kf={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Lt=kf,Tf=["mode","contrastThreshold","tonalOffset"],Vs={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Pn.white,default:Pn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Lr={text:{primary:Pn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Pn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Fs(e,t,n,r){const o=r.light||r,s=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=ff(e.main,o):t==="dark"&&(e.dark=df(e.main,s)))}function Nf(e="light"){return e==="dark"?{main:Dt[200],light:Dt[50],dark:Dt[400]}:{main:Dt[700],light:Dt[400],dark:Dt[800]}}function Sf(e="light"){return e==="dark"?{main:Mt[200],light:Mt[50],dark:Mt[400]}:{main:Mt[500],light:Mt[300],dark:Mt[700]}}function Cf(e="light"){return e==="dark"?{main:At[500],light:At[300],dark:At[700]}:{main:At[700],light:At[400],dark:At[800]}}function Of(e="light"){return e==="dark"?{main:Bt[400],light:Bt[300],dark:Bt[700]}:{main:Bt[700],light:Bt[500],dark:Bt[900]}}function Pf(e="light"){return e==="dark"?{main:Lt[400],light:Lt[300],dark:Lt[700]}:{main:Lt[800],light:Lt[500],dark:Lt[900]}}function Rf(e="light"){return e==="dark"?{main:ln[400],light:ln[300],dark:ln[700]}:{main:"#ed6c02",light:ln[500],dark:ln[900]}}function jf(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=fe(e,Tf),s=e.primary||Nf(t),i=e.secondary||Sf(t),l=e.error||Cf(t),c=e.info||Of(t),d=e.success||Pf(t),m=e.warning||Rf(t);function v(f){const b=Ls(f,Lr.text.primary)>=n?Lr.text.primary:Vs.text.primary;if(process.env.NODE_ENV!=="production"){const w=Ls(f,b);w<3&&console.error([`MUI: The contrast ratio of ${w}:1 for ${b} on ${f}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return b}const g=({color:f,name:b,mainShade:w=500,lightShade:P=300,darkShade:x=700})=>{if(f=C({},f),!f.main&&f[w]&&(f.main=f[w]),!f.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${w}\` property.`:Wt(11,b?` (${b})`:"",w));if(typeof f.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(f.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Wt(12,b?` (${b})`:"",JSON.stringify(f.main)));return Fs(f,"light",P,r),Fs(f,"dark",x,r),f.contrastText||(f.contrastText=v(f.main)),f},p={dark:Lr,light:Vs};return process.env.NODE_ENV!=="production"&&(p[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),rt(C({common:C({},Pn),mode:t,primary:g({color:s,name:"primary"}),secondary:g({color:i,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:g({color:l,name:"error"}),warning:g({color:m,name:"warning"}),info:g({color:c,name:"info"}),success:g({color:d,name:"success"}),grey:bf,contrastThreshold:n,getContrastText:v,augmentColor:g,tonalOffset:r},p[t]),o)}const $f=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function If(e){return Math.round(e*1e5)/1e5}const zs={textTransform:"uppercase"},Us='"Roboto", "Helvetica", "Arial", sans-serif';function _f(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Us,fontSize:o=14,fontWeightLight:s=300,fontWeightRegular:i=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:d=16,allVariants:m,pxToRem:v}=n,g=fe(n,$f);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof d!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const p=o/14,h=v||(w=>`${w/d*p}rem`),f=(w,P,x,E,y)=>C({fontFamily:r,fontWeight:w,fontSize:h(P),lineHeight:x},r===Us?{letterSpacing:`${If(E/P)}em`}:{},y,m),b={h1:f(s,96,1.167,-1.5),h2:f(s,60,1.2,-.5),h3:f(i,48,1.167,0),h4:f(i,34,1.235,.25),h5:f(i,24,1.334,0),h6:f(l,20,1.6,.15),subtitle1:f(i,16,1.75,.15),subtitle2:f(l,14,1.57,.1),body1:f(i,16,1.5,.15),body2:f(i,14,1.43,.15),button:f(l,14,1.75,.4,zs),caption:f(i,12,1.66,.4),overline:f(i,12,2.66,1,zs),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return rt(C({htmlFontSize:d,pxToRem:h,fontFamily:r,fontSize:o,fontWeightLight:s,fontWeightRegular:i,fontWeightMedium:l,fontWeightBold:c},b),g,{clone:!1})}const Mf=.2,Af=.14,Df=.12;function be(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Mf})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Af})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Df})`].join(",")}const Bf=["none",be(0,2,1,-1,0,1,1,0,0,1,3,0),be(0,3,1,-2,0,2,2,0,0,1,5,0),be(0,3,3,-2,0,3,4,0,0,1,8,0),be(0,2,4,-1,0,4,5,0,0,1,10,0),be(0,3,5,-1,0,5,8,0,0,1,14,0),be(0,3,5,-1,0,6,10,0,0,1,18,0),be(0,4,5,-2,0,7,10,1,0,2,16,1),be(0,5,5,-3,0,8,10,1,0,3,14,2),be(0,5,6,-3,0,9,12,1,0,3,16,2),be(0,6,6,-3,0,10,14,1,0,4,18,3),be(0,6,7,-4,0,11,15,1,0,4,20,3),be(0,7,8,-4,0,12,17,2,0,5,22,4),be(0,7,8,-4,0,13,19,2,0,5,24,4),be(0,7,9,-4,0,14,21,2,0,5,26,4),be(0,8,9,-5,0,15,22,2,0,6,28,5),be(0,8,10,-5,0,16,24,2,0,6,30,5),be(0,8,11,-5,0,17,26,2,0,6,32,5),be(0,9,11,-5,0,18,28,2,0,7,34,6),be(0,9,12,-6,0,19,29,2,0,7,36,6),be(0,10,13,-6,0,20,31,3,0,8,38,7),be(0,10,13,-6,0,21,33,3,0,8,40,7),be(0,10,14,-6,0,22,35,3,0,8,42,7),be(0,11,14,-7,0,23,36,3,0,9,44,8),be(0,11,15,-7,0,24,38,3,0,9,46,8)],Lf=Bf,Vf=["duration","easing","delay"],Ff={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},zf={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Hs(e){return`${Math.round(e)}ms`}function Uf(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Hf(e){const t=C({},Ff,e.easing),n=C({},zf,e.duration);return C({getAutoHeightDuration:Uf,create:(o=["all"],s={})=>{const{duration:i=n.standard,easing:l=t.easeInOut,delay:c=0}=s,d=fe(s,Vf);if(process.env.NODE_ENV!=="production"){const m=g=>typeof g=="string",v=g=>!isNaN(parseFloat(g));!m(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!v(i)&&!m(i)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`),m(l)||console.error('MUI: Argument "easing" must be a string.'),!v(c)&&!m(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof s!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(d).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(m=>`${m} ${typeof i=="string"?i:Hs(i)} ${l} ${typeof c=="string"?c:Hs(c)}`).join(",")}},e,{easing:t,duration:n})}const Wf={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},qf=Wf,Xf=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Gf(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:s={}}=e,i=fe(e,Xf);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Wt(18));const l=jf(r),c=Io(e);let d=rt(c,{mixins:mf(c.breakpoints,n),palette:l,shadows:Lf.slice(),typography:_f(l,s),transitions:Hf(o),zIndex:C({},qf)});if(d=rt(d,i),d=t.reduce((m,v)=>rt(m,v),d),process.env.NODE_ENV!=="production"){const m=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],v=(g,p)=>{let h;for(h in g){const f=g[h];if(m.indexOf(h)!==-1&&Object.keys(f).length>0){if(process.env.NODE_ENV!=="production"){const b=Ze("",h);console.error([`MUI: The \`${p}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(g,null,2),"",`Instead, you need to use the '&.${b}' syntax:`,JSON.stringify({root:{[`&.${b}`]:f}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}g[h]={}}}};Object.keys(d.components).forEach(g=>{const p=d.components[g].styleOverrides;p&&g.indexOf("Mui")===0&&v(p,g)})}return d.unstable_sxConfig=C({},jo,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(v){return $o({sx:v,theme:this})},d}const Yf=Gf(),Mo=Yf,Ao="$$material",ha=e=>Gn(e)&&e!=="classes",Kf=af({themeId:Ao,defaultTheme:Mo,rootShouldForwardProp:ha}),Oe=Kf;function Bn(){const e=ma(Mo);return process.env.NODE_ENV!=="production"&&k.useDebugValue(e),e[Ao]||e}function lt({props:e,name:t}){return cf({props:e,name:t,defaultTheme:Mo,themeId:Ao})}function oo(e,t){return oo=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},oo(e,t)}function Jf(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,oo(e,t)}const Ws={disabled:!1};var Zf=process.env.NODE_ENV!=="production"?a.oneOfType([a.number,a.shape({enter:a.number,exit:a.number,appear:a.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&a.oneOfType([a.string,a.shape({enter:a.string,exit:a.string,active:a.string}),a.shape({enter:a.string,enterDone:a.string,enterActive:a.string,exit:a.string,exitDone:a.string,exitActive:a.string})]);const ga=O.createContext(null);var Qf=function(t){return t.scrollTop},gn="unmounted",xt="exited",Et="entering",zt="entered",so="exiting",ct=function(e){Jf(t,e);function t(r,o){var s;s=e.call(this,r,o)||this;var i=o,l=i&&!i.isMounting?r.enter:r.appear,c;return s.appearStatus=null,r.in?l?(c=xt,s.appearStatus=Et):c=zt:r.unmountOnExit||r.mountOnEnter?c=gn:c=xt,s.state={status:c},s.nextCallback=null,s}t.getDerivedStateFromProps=function(o,s){var i=o.in;return i&&s.status===gn?{status:xt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var s=null;if(o!==this.props){var i=this.state.status;this.props.in?i!==Et&&i!==zt&&(s=Et):(i===Et||i===zt)&&(s=so)}this.updateStatus(!1,s)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,s,i,l;return s=i=l=o,o!=null&&typeof o!="number"&&(s=o.exit,i=o.enter,l=o.appear!==void 0?o.appear:i),{exit:s,enter:i,appear:l}},n.updateStatus=function(o,s){if(o===void 0&&(o=!1),s!==null)if(this.cancelNextCallback(),s===Et){if(this.props.unmountOnExit||this.props.mountOnEnter){var i=this.props.nodeRef?this.props.nodeRef.current:dn.findDOMNode(this);i&&Qf(i)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===xt&&this.setState({status:gn})},n.performEnter=function(o){var s=this,i=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[dn.findDOMNode(this),l],d=c[0],m=c[1],v=this.getTimeouts(),g=l?v.appear:v.enter;if(!o&&!i||Ws.disabled){this.safeSetState({status:zt},function(){s.props.onEntered(d)});return}this.props.onEnter(d,m),this.safeSetState({status:Et},function(){s.props.onEntering(d,m),s.onTransitionEnd(g,function(){s.safeSetState({status:zt},function(){s.props.onEntered(d,m)})})})},n.performExit=function(){var o=this,s=this.props.exit,i=this.getTimeouts(),l=this.props.nodeRef?void 0:dn.findDOMNode(this);if(!s||Ws.disabled){this.safeSetState({status:xt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:so},function(){o.props.onExiting(l),o.onTransitionEnd(i.exit,function(){o.safeSetState({status:xt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,s){s=this.setNextCallback(s),this.setState(o,s)},n.setNextCallback=function(o){var s=this,i=!0;return this.nextCallback=function(l){i&&(i=!1,s.nextCallback=null,o(l))},this.nextCallback.cancel=function(){i=!1},this.nextCallback},n.onTransitionEnd=function(o,s){this.setNextCallback(s);var i=this.props.nodeRef?this.props.nodeRef.current:dn.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!i||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[i,this.nextCallback],d=c[0],m=c[1];this.props.addEndListener(d,m)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===gn)return null;var s=this.props,i=s.children;s.in,s.mountOnEnter,s.unmountOnExit,s.appear,s.enter,s.exit,s.timeout,s.addEndListener,s.onEnter,s.onEntering,s.onEntered,s.onExit,s.onExiting,s.onExited,s.nodeRef;var l=fe(s,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return O.createElement(ga.Provider,{value:null},typeof i=="function"?i(o,l):O.cloneElement(O.Children.only(i),l))},t}(O.Component);ct.contextType=ga;ct.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:a.shape({current:typeof Element>"u"?a.any:function(e,t,n,r,o,s){var i=e[t];return a.instanceOf(i&&"ownerDocument"in i?i.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,s)}}),children:a.oneOfType([a.func.isRequired,a.element.isRequired]).isRequired,in:a.bool,mountOnEnter:a.bool,unmountOnExit:a.bool,appear:a.bool,enter:a.bool,exit:a.bool,timeout:function(t){var n=Zf;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),s=1;s<r;s++)o[s-1]=arguments[s];return n.apply(void 0,[t].concat(o))},addEndListener:a.func,onEnter:a.func,onEntering:a.func,onEntered:a.func,onExit:a.func,onExiting:a.func,onExited:a.func}:{};function Vt(){}ct.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Vt,onEntering:Vt,onEntered:Vt,onExit:Vt,onExiting:Vt,onExited:Vt};ct.UNMOUNTED=gn;ct.EXITED=xt;ct.ENTERING=Et;ct.ENTERED=zt;ct.EXITING=so;const ba=ct,va=e=>e.scrollTop;function ar(e,t){var n,r;const{timeout:o,easing:s,style:i={}}=e;return{duration:(n=i.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=i.transitionTimingFunction)!=null?r:typeof s=="object"?s[t.mode]:s,delay:i.transitionDelay}}const em=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function io(e){return`scale(${e}, ${e**2})`}const tm={entering:{opacity:1,transform:io(1)},entered:{opacity:1,transform:"none"}},Vr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Do=k.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:s,easing:i,in:l,onEnter:c,onEntered:d,onEntering:m,onExit:v,onExited:g,onExiting:p,style:h,timeout:f="auto",TransitionComponent:b=ba}=t,w=fe(t,em),P=mn(),x=k.useRef(),E=Bn(),y=k.useRef(null),T=Ue(y,s.ref,n),S=D=>I=>{if(D){const z=y.current;I===void 0?D(z):D(z,I)}},j=S(m),A=S((D,I)=>{va(D);const{duration:z,delay:Z,easing:G}=ar({style:h,timeout:f,easing:i},{mode:"enter"});let N;f==="auto"?(N=E.transitions.getAutoHeightDuration(D.clientHeight),x.current=N):N=z,D.style.transition=[E.transitions.create("opacity",{duration:N,delay:Z}),E.transitions.create("transform",{duration:Vr?N:N*.666,delay:Z,easing:G})].join(","),c&&c(D,I)}),V=S(d),R=S(p),_=S(D=>{const{duration:I,delay:z,easing:Z}=ar({style:h,timeout:f,easing:i},{mode:"exit"});let G;f==="auto"?(G=E.transitions.getAutoHeightDuration(D.clientHeight),x.current=G):G=I,D.style.transition=[E.transitions.create("opacity",{duration:G,delay:z}),E.transitions.create("transform",{duration:Vr?G:G*.666,delay:Vr?z:z||G*.333,easing:Z})].join(","),D.style.opacity=0,D.style.transform=io(.75),v&&v(D)}),M=S(g),F=D=>{f==="auto"&&P.start(x.current||0,D),r&&r(y.current,D)};return u.jsx(b,C({appear:o,in:l,nodeRef:y,onEnter:A,onEntered:V,onEntering:j,onExit:_,onExited:M,onExiting:R,addEndListener:F,timeout:f==="auto"?null:f},w,{children:(D,I)=>k.cloneElement(s,C({style:C({opacity:0,transform:io(.75),visibility:D==="exited"&&!l?"hidden":void 0},tm[D],h,s.props.style),ref:T},I))}))});process.env.NODE_ENV!=="production"&&(Do.propTypes={addEndListener:a.func,appear:a.bool,children:$n.isRequired,easing:a.oneOfType([a.shape({enter:a.string,exit:a.string}),a.string]),in:a.bool,onEnter:a.func,onEntered:a.func,onEntering:a.func,onExit:a.func,onExited:a.func,onExiting:a.func,style:a.object,timeout:a.oneOfType([a.oneOf(["auto"]),a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})])});Do.muiSupportAuto=!0;const ao=Do,nm=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},qs=nm,rm=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],om=Oe(ca,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),ya=k.forwardRef(function(t,n){var r;const o=fa(),s=lt({props:t,name:"MuiPopper"}),{anchorEl:i,component:l,components:c,componentsProps:d,container:m,disablePortal:v,keepMounted:g,modifiers:p,open:h,placement:f,popperOptions:b,popperRef:w,transition:P,slots:x,slotProps:E}=s,y=fe(s,rm),T=(r=x==null?void 0:x.root)!=null?r:c==null?void 0:c.Root,S=C({anchorEl:i,container:m,disablePortal:v,keepMounted:g,modifiers:p,open:h,placement:f,popperOptions:b,popperRef:w,transition:P},y);return u.jsx(om,C({as:l,direction:o==null?void 0:o.direction,slots:{root:T},slotProps:E??d},S,{ref:n}))});process.env.NODE_ENV!=="production"&&(ya.propTypes={anchorEl:a.oneOfType([ot,a.object,a.func]),children:a.oneOfType([a.node,a.func]),component:a.elementType,components:a.shape({Root:a.elementType}),componentsProps:a.shape({root:a.oneOfType([a.func,a.object])}),container:a.oneOfType([ot,a.func]),disablePortal:a.bool,keepMounted:a.bool,modifiers:a.arrayOf(a.shape({data:a.object,effect:a.func,enabled:a.bool,fn:a.func,name:a.any,options:a.object,phase:a.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:a.arrayOf(a.string),requiresIfExists:a.arrayOf(a.string)})),open:a.bool.isRequired,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:a.shape({modifiers:a.array,onFirstUpdate:a.func,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:a.oneOf(["absolute","fixed"])}),popperRef:xo,slotProps:a.shape({root:a.oneOfType([a.func,a.object])}),slots:a.shape({root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),transition:a.bool});const wa=ya;function sm(e){return Ze("MuiTooltip",e)}const im=mt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),dt=im,am=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function lm(e){return Math.round(e*1e5)/1e5}const cm=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:s}=e,i={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Ke(s.split("-")[0])}`],arrow:["arrow"]};return at(i,sm,t)},pm=Oe(wa,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>C({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${dt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${dt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${dt.arrow}`]:C({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${dt.arrow}`]:C({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),um=Oe("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Ke(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>C({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:ir(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${lm(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${dt.popper}[data-popper-placement*="left"] &`]:C({transformOrigin:"right center"},t.isRtl?C({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):C({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${dt.popper}[data-popper-placement*="right"] &`]:C({transformOrigin:"left center"},t.isRtl?C({marginRight:"14px"},t.touch&&{marginRight:"24px"}):C({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${dt.popper}[data-popper-placement*="top"] &`]:C({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${dt.popper}[data-popper-placement*="bottom"] &`]:C({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),dm=Oe("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:ir(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Wn=!1;const Xs=new In;let cn={x:0,y:0};function qn(e,t){return n=>{t&&t(n),e(n)}}const xa=k.forwardRef(function(t,n){var r,o,s,i,l,c,d,m,v,g,p,h,f,b,w,P,x,E,y;const T=lt({props:t,name:"MuiTooltip"}),{arrow:S=!1,children:j,components:A={},componentsProps:V={},describeChild:R=!1,disableFocusListener:_=!1,disableHoverListener:M=!1,disableInteractive:F=!1,disableTouchListener:D=!1,enterDelay:I=100,enterNextDelay:z=0,enterTouchDelay:Z=700,followCursor:G=!1,id:N,leaveDelay:B=0,leaveTouchDelay:U=1500,onClose:J,onOpen:H,open:q,placement:Y="bottom",PopperComponent:K,PopperProps:X={},slotProps:Q={},slots:ee={},title:ie,TransitionComponent:L=ao,TransitionProps:te}=T,$=fe(T,am),ae=k.isValidElement(j)?j:u.jsx("span",{children:j}),Te=Bn(),Pe=Te.direction==="rtl",[Ee,bt]=k.useState(),[Re,Qe]=k.useState(null),Me=k.useRef(!1),et=F||G,Ne=mn(),_t=mn(),vt=mn(),Qt=mn(),[Ln,Ho]=Vi({controlled:q,default:!1,name:"Tooltip",state:"open"});let tt=Ln;if(process.env.NODE_ENV!=="production"){const{current:ne}=k.useRef(q!==void 0);k.useEffect(()=>{Ee&&Ee.disabled&&!ne&&ie!==""&&Ee.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ie,Ee,ne])}const Sr=Li(N),en=k.useRef(),Vn=Nn(()=>{en.current!==void 0&&(document.body.style.WebkitUserSelect=en.current,en.current=void 0),Qt.clear()});k.useEffect(()=>Vn,[Vn]);const Wo=ne=>{Xs.clear(),Wn=!0,Ho(!0),H&&!tt&&H(ne)},Fn=Nn(ne=>{Xs.start(800+B,()=>{Wn=!1}),Ho(!1),J&&tt&&J(ne),Ne.start(Te.transitions.duration.shortest,()=>{Me.current=!1})}),Cr=ne=>{Me.current&&ne.type!=="touchstart"||(Ee&&Ee.removeAttribute("title"),_t.clear(),vt.clear(),I||Wn&&z?_t.start(Wn?z:I,()=>{Wo(ne)}):Wo(ne))},qo=ne=>{_t.clear(),vt.start(B,()=>{Fn(ne)})},{isFocusVisibleRef:Xo,onBlur:Tl,onFocus:Nl,ref:Sl}=Fi(),[,Go]=k.useState(!1),Yo=ne=>{Tl(ne),Xo.current===!1&&(Go(!1),qo(ne))},Ko=ne=>{Ee||bt(ne.currentTarget),Nl(ne),Xo.current===!0&&(Go(!0),Cr(ne))},Jo=ne=>{Me.current=!0;const Ae=ae.props;Ae.onTouchStart&&Ae.onTouchStart(ne)},Zo=Cr,Qo=qo,Cl=ne=>{Jo(ne),vt.clear(),Ne.clear(),Vn(),en.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Qt.start(Z,()=>{document.body.style.WebkitUserSelect=en.current,Cr(ne)})},Ol=ne=>{ae.props.onTouchEnd&&ae.props.onTouchEnd(ne),Vn(),vt.start(U,()=>{Fn(ne)})};k.useEffect(()=>{if(!tt)return;function ne(Ae){(Ae.key==="Escape"||Ae.key==="Esc")&&Fn(Ae)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[Fn,tt]);const Pl=Ue(ae.ref,Sl,bt,n);!ie&&ie!==0&&(tt=!1);const Or=k.useRef(),Rl=ne=>{const Ae=ae.props;Ae.onMouseMove&&Ae.onMouseMove(ne),cn={x:ne.clientX,y:ne.clientY},Or.current&&Or.current.update()},tn={},Pr=typeof ie=="string";R?(tn.title=!tt&&Pr&&!M?ie:null,tn["aria-describedby"]=tt?Sr:null):(tn["aria-label"]=Pr?ie:null,tn["aria-labelledby"]=tt&&!Pr?Sr:null);const Ve=C({},tn,$,ae.props,{className:Se($.className,ae.props.className),onTouchStart:Jo,ref:Pl},G?{onMouseMove:Rl}:{});process.env.NODE_ENV!=="production"&&(Ve["data-mui-internal-clone-element"]=!0,k.useEffect(()=>{Ee&&!Ee.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[Ee]));const nn={};D||(Ve.onTouchStart=Cl,Ve.onTouchEnd=Ol),M||(Ve.onMouseOver=qn(Zo,Ve.onMouseOver),Ve.onMouseLeave=qn(Qo,Ve.onMouseLeave),et||(nn.onMouseOver=Zo,nn.onMouseLeave=Qo)),_||(Ve.onFocus=qn(Ko,Ve.onFocus),Ve.onBlur=qn(Yo,Ve.onBlur),et||(nn.onFocus=Ko,nn.onBlur=Yo)),process.env.NODE_ENV!=="production"&&ae.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ae.props.title}\` or the Tooltip component.`].join(`
`));const jl=k.useMemo(()=>{var ne;let Ae=[{name:"arrow",enabled:!!Re,options:{element:Re,padding:4}}];return(ne=X.popperOptions)!=null&&ne.modifiers&&(Ae=Ae.concat(X.popperOptions.modifiers)),C({},X.popperOptions,{modifiers:Ae})},[Re,X]),rn=C({},T,{isRtl:Pe,arrow:S,disableInteractive:et,placement:Y,PopperComponentProp:K,touch:Me.current}),Rr=cm(rn),es=(r=(o=ee.popper)!=null?o:A.Popper)!=null?r:pm,ts=(s=(i=(l=ee.transition)!=null?l:A.Transition)!=null?i:L)!=null?s:ao,ns=(c=(d=ee.tooltip)!=null?d:A.Tooltip)!=null?c:um,rs=(m=(v=ee.arrow)!=null?v:A.Arrow)!=null?m:dm,$l=hn(es,C({},X,(g=Q.popper)!=null?g:V.popper,{className:Se(Rr.popper,X==null?void 0:X.className,(p=(h=Q.popper)!=null?h:V.popper)==null?void 0:p.className)}),rn),Il=hn(ts,C({},te,(f=Q.transition)!=null?f:V.transition),rn),_l=hn(ns,C({},(b=Q.tooltip)!=null?b:V.tooltip,{className:Se(Rr.tooltip,(w=(P=Q.tooltip)!=null?P:V.tooltip)==null?void 0:w.className)}),rn),Ml=hn(rs,C({},(x=Q.arrow)!=null?x:V.arrow,{className:Se(Rr.arrow,(E=(y=Q.arrow)!=null?y:V.arrow)==null?void 0:E.className)}),rn);return u.jsxs(k.Fragment,{children:[k.cloneElement(ae,Ve),u.jsx(es,C({as:K??wa,placement:Y,anchorEl:G?{getBoundingClientRect:()=>({top:cn.y,left:cn.x,right:cn.x,bottom:cn.y,width:0,height:0})}:Ee,popperRef:Or,open:Ee?tt:!1,id:Sr,transition:!0},nn,$l,{popperOptions:jl,children:({TransitionProps:ne})=>u.jsx(ts,C({timeout:Te.transitions.duration.shorter},ne,Il,{children:u.jsxs(ns,C({},_l,{children:[ie,S?u.jsx(rs,C({},Ml,{ref:Qe})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(xa.propTypes={arrow:a.bool,children:$n.isRequired,classes:a.object,className:a.string,components:a.shape({Arrow:a.elementType,Popper:a.elementType,Tooltip:a.elementType,Transition:a.elementType}),componentsProps:a.shape({arrow:a.object,popper:a.object,tooltip:a.object,transition:a.object}),describeChild:a.bool,disableFocusListener:a.bool,disableHoverListener:a.bool,disableInteractive:a.bool,disableTouchListener:a.bool,enterDelay:a.number,enterNextDelay:a.number,enterTouchDelay:a.number,followCursor:a.bool,id:a.string,leaveDelay:a.number,leaveTouchDelay:a.number,onClose:a.func,onOpen:a.func,open:a.bool,placement:a.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:a.elementType,PopperProps:a.object,slotProps:a.shape({arrow:a.object,popper:a.object,tooltip:a.object,transition:a.object}),slots:a.shape({arrow:a.elementType,popper:a.elementType,tooltip:a.elementType,transition:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),title:a.node,TransitionComponent:a.elementType,TransitionProps:a.object});const fm=xa;var Bo={},Ea={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Ea);var mm=Ea.exports,Fr={};function hm(e){return Ze("MuiSvgIcon",e)}mt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const gm=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],bm=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Ke(t)}`,`fontSize${Ke(n)}`]};return at(o,hm,r)},vm=Oe("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Ke(n.color)}`],t[`fontSize${Ke(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,s,i,l,c,d,m,v,g,p,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((s=e.typography)==null||(i=s.pxToRem)==null?void 0:i.call(s,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((d=e.typography)==null||(m=d.pxToRem)==null?void 0:m.call(d,35))||"2.1875rem"}[t.fontSize],color:(v=(g=(e.vars||e).palette)==null||(g=g[t.color])==null?void 0:g.main)!=null?v:{action:(p=(e.vars||e).palette)==null||(p=p.action)==null?void 0:p.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),Lo=k.forwardRef(function(t,n){const r=lt({props:t,name:"MuiSvgIcon"}),{children:o,className:s,color:i="inherit",component:l="svg",fontSize:c="medium",htmlColor:d,inheritViewBox:m=!1,titleAccess:v,viewBox:g="0 0 24 24"}=r,p=fe(r,gm),h=k.isValidElement(o)&&o.type==="svg",f=C({},r,{color:i,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:m,viewBox:g,hasSvgAsChild:h}),b={};m||(b.viewBox=g);const w=bm(f);return u.jsxs(vm,C({as:l,className:Se(w.root,s),focusable:"false",color:d,"aria-hidden":v?void 0:!0,role:v?"img":void 0,ref:n},b,p,h&&o.props,{ownerState:f,children:[h?o.props.children:o,v?u.jsx("title",{children:v}):null]}))});process.env.NODE_ENV!=="production"&&(Lo.propTypes={children:a.node,classes:a.object,className:a.string,color:a.oneOfType([a.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),a.string]),component:a.elementType,fontSize:a.oneOfType([a.oneOf(["inherit","large","medium","small"]),a.string]),htmlColor:a.string,inheritViewBox:a.bool,shapeRendering:a.string,sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),titleAccess:a.string,viewBox:a.string});Lo.muiName="SvgIcon";const Gs=Lo;function ka(e,t){function n(r,o){return u.jsx(Gs,C({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Gs.muiName,k.memo(k.forwardRef(n))}const ym={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Xi.configure(e)}},wm=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Ke,createChainedFunction:Qr,createSvgIcon:ka,debounce:Bi,deprecatedPropType:qc,isMuiElement:Xc,ownerDocument:Ce,ownerWindow:qt,requirePropFactory:Gc,setRef:tr,unstable_ClassNameGenerator:ym,unstable_useEnhancedEffect:Rt,unstable_useId:Li,unsupportedProp:Jc,useControlled:Vi,useEventCallback:Nn,useForkRef:Ue,useIsFocusVisible:Fi},Symbol.toStringTag,{value:"Module"})),xm=Nc(wm);var Ys;function Em(){return Ys||(Ys=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=xm}(Fr)),Fr}var km=mm;Object.defineProperty(Bo,"__esModule",{value:!0});var Ta=Bo.default=void 0,Tm=km(Em()),Nm=u;Ta=Bo.default=(0,Tm.default)((0,Nm.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function Ks(e,t,n){return e?u.jsx(we.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:u.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Vo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:s=void 0,iconPathAfter:i=void 0,hasAutoFocus:l=!1,className:c,isDisabled:d=!1,isDense:m=!0,isSubMenuParent:v=!1,hasDisabledGutters:g=!1,hasDivider:p=!1,focusVisibleClassName:h,id:f,children:b}=e,w=u.jsx(we.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:d,dense:m,disableGutters:g,divider:p,focusVisibleClassName:h,onClick:t,id:f,children:n?u.jsxs(u.Fragment,{children:[Ks(s,n,!0),u.jsx(we.ListItemText,{primary:n,inset:!s&&o}),v?u.jsx(we.ListItemIcon,{className:"papi-menu-icon-trailing",children:u.jsx(Ta,{})}):Ks(i,n,!1)]}):b});return r?u.jsx(fm,{title:r,placement:"right",children:u.jsx("div",{children:w})}):w}function Na(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Sm(e){const[t,n]=O.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:s}=e,i=d=>{n(d.currentTarget)},l=()=>{n(void 0)},c=()=>{let d=Na(s).filter(m=>"menuItem"in m.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return d=d.filter(m=>"menuItem"in m.group&&m.group.menuItem===r.id),u.jsx(Fo,{...e,includedGroups:d})};return u.jsxs(u.Fragment,{children:[u.jsx(Vo,{onClick:i,...o,isSubMenuParent:!0}),u.jsx(we.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Cm=(e,t)=>t.filter(o=>o.group===e).sort((o,s)=>(o.order||0)-(s.order||0));function Fo(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:s,allowForLeadingIcons:i}=O.useMemo(()=>{const m=o&&o.length>0?o:Na(t).filter(h=>!("menuItem"in h.group)),v=Object.values(m).sort((h,f)=>(h.group.order||0)-(f.group.order||0)),g=[];v.forEach(h=>{Cm(h.id,t.items).forEach(f=>g.push({item:f,isLastItemInGroup:!1})),g.length>0&&(g[g.length-1].isLastItemInGroup=!0)}),g.length>0&&(g[g.length-1].isLastItemInGroup=!1);const p=g.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:g,allowForLeadingIcons:p}},[o,t]),l=({item:m,isLastItemInGroup:v})=>({className:"papi-menu-item",label:m.label,tooltip:m.tooltip,iconPathBefore:"iconPathBefore"in m?m.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in m?m.iconPathAfter:void 0,hasDivider:v,allowForLeadingIcons:i}),[c]=s;if(!c)return u.jsx("div",{});const d=c.item.group;return u.jsx("div",{role:"menu","aria-label":d,children:s.map((m,v)=>{const{item:g}=m,p=l(m);if("command"in g){const h=g.group+v;return u.jsx(Vo,{onClick:f=>{n==null||n(f),r(g)},...p},h)}return u.jsx(Sm,{parentMenuItem:g,parentItemProps:p,...e},d+g.id)})},d)}function Om(e){const{menuDefinition:t,columnId:n}=e;let s=Object.entries(t.groups).map(([i,l])=>({id:i,group:l})).filter(i=>"column"in i.group);return n&&"columns"in t&&t.columns[n]&&(s=s.filter(i=>"column"in i.group&&i.group.column===n)),u.jsx(Fo,{...e,includedGroups:s})}function Pm({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:s}){return u.jsxs(we.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${s??""}`,children:[u.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${s??""}`,children:r.label}),u.jsx(we.List,{id:n,dense:!0,className:s??"",children:u.jsx(Om,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Sa({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,s=O.useMemo(()=>{const i=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,d=o[c];typeof d=="object"&&typeof d.order=="number"&&!Number.isNaN(d.order)?i.set(d.order,{id:c,metadata:d}):console.warn(`Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(i.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return u.jsx(we.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:s.length,role:"menu","aria-label":"GridMenu",id:r,children:s.map((i,l)=>u.jsx(Pm,{commandHandler:e,menuDefinition:n,...i,className:t},l))})}const Ca=k.createContext({});process.env.NODE_ENV!=="production"&&(Ca.displayName="ListContext");const Rm=Ca;function jm(e){return Ze("MuiList",e)}mt("MuiList",["root","padding","dense","subheader"]);const $m=["children","className","component","dense","disablePadding","subheader"],Im=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return at({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},jm,t)},_m=Oe("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>C({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Oa=k.forwardRef(function(t,n){const r=lt({props:t,name:"MuiList"}),{children:o,className:s,component:i="ul",dense:l=!1,disablePadding:c=!1,subheader:d}=r,m=fe(r,$m),v=k.useMemo(()=>({dense:l}),[l]),g=C({},r,{component:i,dense:l,disablePadding:c}),p=Im(g);return u.jsx(Rm.Provider,{value:v,children:u.jsxs(_m,C({as:i,className:Se(p.root,s),ref:n,ownerState:g},m,{children:[d,o]}))})});process.env.NODE_ENV!=="production"&&(Oa.propTypes={children:a.node,classes:a.object,className:a.string,component:a.elementType,dense:a.bool,disablePadding:a.bool,subheader:a.node,sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object])});const Mm=Oa,Am=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function zr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function Js(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function Pa(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function pn(e,t,n,r,o,s){let i=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(i)return!1;i=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!Pa(l,s)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const Ra=k.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:s=!1,children:i,className:l,disabledItemsFocusable:c=!1,disableListWrap:d=!1,onKeyDown:m,variant:v="selectedMenu"}=t,g=fe(t,Am),p=k.useRef(null),h=k.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Rt(()=>{o&&p.current.focus()},[o]),k.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(x,E)=>{const y=!p.current.style.width;if(x.clientHeight<p.current.clientHeight&&y){const T=`${zi(Ce(x))}px`;p.current.style[E.direction==="rtl"?"paddingLeft":"paddingRight"]=T,p.current.style.width=`calc(100% + ${T})`}return p.current}}),[]);const f=x=>{const E=p.current,y=x.key,T=Ce(E).activeElement;if(y==="ArrowDown")x.preventDefault(),pn(E,T,d,c,zr);else if(y==="ArrowUp")x.preventDefault(),pn(E,T,d,c,Js);else if(y==="Home")x.preventDefault(),pn(E,null,d,c,zr);else if(y==="End")x.preventDefault(),pn(E,null,d,c,Js);else if(y.length===1){const S=h.current,j=y.toLowerCase(),A=performance.now();S.keys.length>0&&(A-S.lastTime>500?(S.keys=[],S.repeating=!0,S.previousKeyMatched=!0):S.repeating&&j!==S.keys[0]&&(S.repeating=!1)),S.lastTime=A,S.keys.push(j);const V=T&&!S.repeating&&Pa(T,S);S.previousKeyMatched&&(V||pn(E,T,!1,c,zr,S))?x.preventDefault():S.previousKeyMatched=!1}m&&m(x)},b=Ue(p,n);let w=-1;k.Children.forEach(i,(x,E)=>{if(!k.isValidElement(x)){w===E&&(w+=1,w>=i.length&&(w=-1));return}process.env.NODE_ENV!=="production"&&er.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(v==="selectedMenu"&&x.props.selected||w===-1)&&(w=E),w===E&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(w+=1,w>=i.length&&(w=-1))});const P=k.Children.map(i,(x,E)=>{if(E===w){const y={};return s&&(y.autoFocus=!0),x.props.tabIndex===void 0&&v==="selectedMenu"&&(y.tabIndex=0),k.cloneElement(x,y)}return x});return u.jsx(Mm,C({role:"menu",ref:b,className:l,onKeyDown:f,tabIndex:o?0:-1},g,{children:P}))});process.env.NODE_ENV!=="production"&&(Ra.propTypes={autoFocus:a.bool,autoFocusItem:a.bool,children:a.node,className:a.string,disabledItemsFocusable:a.bool,disableListWrap:a.bool,onKeyDown:a.func,variant:a.oneOf(["menu","selectedMenu"])});const Dm=Ra,Bm=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Lm={entering:{opacity:1},entered:{opacity:1}},ja=k.forwardRef(function(t,n){const r=Bn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:s,appear:i=!0,children:l,easing:c,in:d,onEnter:m,onEntered:v,onEntering:g,onExit:p,onExited:h,onExiting:f,style:b,timeout:w=o,TransitionComponent:P=ba}=t,x=fe(t,Bm),E=k.useRef(null),y=Ue(E,l.ref,n),T=F=>D=>{if(F){const I=E.current;D===void 0?F(I):F(I,D)}},S=T(g),j=T((F,D)=>{va(F);const I=ar({style:b,timeout:w,easing:c},{mode:"enter"});F.style.webkitTransition=r.transitions.create("opacity",I),F.style.transition=r.transitions.create("opacity",I),m&&m(F,D)}),A=T(v),V=T(f),R=T(F=>{const D=ar({style:b,timeout:w,easing:c},{mode:"exit"});F.style.webkitTransition=r.transitions.create("opacity",D),F.style.transition=r.transitions.create("opacity",D),p&&p(F)}),_=T(h),M=F=>{s&&s(E.current,F)};return u.jsx(P,C({appear:i,in:d,nodeRef:E,onEnter:j,onEntered:A,onEntering:S,onExit:R,onExited:_,onExiting:V,addEndListener:M,timeout:w},x,{children:(F,D)=>k.cloneElement(l,C({style:C({opacity:0,visibility:F==="exited"&&!d?"hidden":void 0},Lm[F],b,l.props.style),ref:y},D))}))});process.env.NODE_ENV!=="production"&&(ja.propTypes={addEndListener:a.func,appear:a.bool,children:$n.isRequired,easing:a.oneOfType([a.shape({enter:a.string,exit:a.string}),a.string]),in:a.bool,onEnter:a.func,onEntered:a.func,onEntering:a.func,onExit:a.func,onExited:a.func,onExiting:a.func,style:a.object,timeout:a.oneOfType([a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})])});const Vm=ja;function Fm(e){return Ze("MuiBackdrop",e)}mt("MuiBackdrop",["root","invisible"]);const zm=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Um=e=>{const{classes:t,invisible:n}=e;return at({root:["root",n&&"invisible"]},Fm,t)},Hm=Oe("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>C({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),$a=k.forwardRef(function(t,n){var r,o,s;const i=lt({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:d="div",components:m={},componentsProps:v={},invisible:g=!1,open:p,slotProps:h={},slots:f={},TransitionComponent:b=Vm,transitionDuration:w}=i,P=fe(i,zm),x=C({},i,{component:d,invisible:g}),E=Um(x),y=(r=h.root)!=null?r:v.root;return u.jsx(b,C({in:p,timeout:w},P,{children:u.jsx(Hm,C({"aria-hidden":!0},y,{as:(o=(s=f.root)!=null?s:m.Root)!=null?o:d,className:Se(E.root,c,y==null?void 0:y.className),ownerState:C({},x,y==null?void 0:y.ownerState),classes:E,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&($a.propTypes={children:a.node,classes:a.object,className:a.string,component:a.elementType,components:a.shape({Root:a.elementType}),componentsProps:a.shape({root:a.object}),invisible:a.bool,open:a.bool.isRequired,slotProps:a.shape({root:a.object}),slots:a.shape({root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),TransitionComponent:a.elementType,transitionDuration:a.oneOfType([a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})])});const Wm=$a;function qm(e){return Ze("MuiModal",e)}mt("MuiModal",["root","hidden","backdrop"]);const Xm=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Gm=e=>{const{open:t,exited:n,classes:r}=e;return at({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},qm,r)},Ym=Oe("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>C({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Km=Oe(Wm,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Ia=k.forwardRef(function(t,n){var r,o,s,i,l,c;const d=lt({name:"MuiModal",props:t}),{BackdropComponent:m=Km,BackdropProps:v,className:g,closeAfterTransition:p=!1,children:h,container:f,component:b,components:w={},componentsProps:P={},disableAutoFocus:x=!1,disableEnforceFocus:E=!1,disableEscapeKeyDown:y=!1,disablePortal:T=!1,disableRestoreFocus:S=!1,disableScrollLock:j=!1,hideBackdrop:A=!1,keepMounted:V=!1,onBackdropClick:R,open:_,slotProps:M,slots:F}=d,D=fe(d,Xm),I=C({},d,{closeAfterTransition:p,disableAutoFocus:x,disableEnforceFocus:E,disableEscapeKeyDown:y,disablePortal:T,disableRestoreFocus:S,disableScrollLock:j,hideBackdrop:A,keepMounted:V}),{getRootProps:z,getBackdropProps:Z,getTransitionProps:G,portalRef:N,isTopModal:B,exited:U,hasTransition:J}=Bp(C({},I,{rootRef:n})),H=C({},I,{exited:U}),q=Gm(H),Y={};if(h.props.tabIndex===void 0&&(Y.tabIndex="-1"),J){const{onEnter:te,onExited:$}=G();Y.onEnter=te,Y.onExited=$}const K=(r=(o=F==null?void 0:F.root)!=null?o:w.Root)!=null?r:Ym,X=(s=(i=F==null?void 0:F.backdrop)!=null?i:w.Backdrop)!=null?s:m,Q=(l=M==null?void 0:M.root)!=null?l:P.root,ee=(c=M==null?void 0:M.backdrop)!=null?c:P.backdrop,ie=jt({elementType:K,externalSlotProps:Q,externalForwardedProps:D,getSlotProps:z,additionalProps:{ref:n,as:b},ownerState:H,className:Se(g,Q==null?void 0:Q.className,q==null?void 0:q.root,!H.open&&H.exited&&(q==null?void 0:q.hidden))}),L=jt({elementType:X,externalSlotProps:ee,additionalProps:v,getSlotProps:te=>Z(C({},te,{onClick:$=>{R&&R($),te!=null&&te.onClick&&te.onClick($)}})),className:Se(ee==null?void 0:ee.className,v==null?void 0:v.className,q==null?void 0:q.backdrop),ownerState:H});return!V&&!_&&(!J||U)?null:u.jsx(Sn,{ref:N,container:f,disablePortal:T,children:u.jsxs(K,C({},ie,{children:[!A&&m?u.jsx(X,C({},L)):null,u.jsx(nr,{disableEnforceFocus:E,disableAutoFocus:x,disableRestoreFocus:S,isEnabled:B,open:_,children:k.cloneElement(h,Y)})]}))})});process.env.NODE_ENV!=="production"&&(Ia.propTypes={BackdropComponent:a.elementType,BackdropProps:a.object,children:$n.isRequired,classes:a.object,className:a.string,closeAfterTransition:a.bool,component:a.elementType,components:a.shape({Backdrop:a.elementType,Root:a.elementType}),componentsProps:a.shape({backdrop:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),container:a.oneOfType([ot,a.func]),disableAutoFocus:a.bool,disableEnforceFocus:a.bool,disableEscapeKeyDown:a.bool,disablePortal:a.bool,disableRestoreFocus:a.bool,disableScrollLock:a.bool,hideBackdrop:a.bool,keepMounted:a.bool,onBackdropClick:a.func,onClose:a.func,onTransitionEnter:a.func,onTransitionExited:a.func,open:a.bool.isRequired,slotProps:a.shape({backdrop:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),slots:a.shape({backdrop:a.elementType,root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object])});const Jm=Ia;function Zm(e){return Ze("MuiPaper",e)}mt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Qm=["className","component","elevation","square","variant"],eh=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,s={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return at(s,Zm,o)},th=Oe("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return C({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&C({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${ir("#fff",qs(t.elevation))}, ${ir("#fff",qs(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),_a=k.forwardRef(function(t,n){const r=lt({props:t,name:"MuiPaper"}),{className:o,component:s="div",elevation:i=1,square:l=!1,variant:c="elevation"}=r,d=fe(r,Qm),m=C({},r,{component:s,elevation:i,square:l,variant:c}),v=eh(m);return process.env.NODE_ENV!=="production"&&Bn().shadows[i]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${i}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${i}]\` is defined.`].join(`
`)),u.jsx(th,C({as:s,ownerState:m,className:Se(v.root,o),ref:n},d))});process.env.NODE_ENV!=="production"&&(_a.propTypes={children:a.node,classes:a.object,className:a.string,component:a.elementType,elevation:Zt(Wi,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:a.bool,sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),variant:a.oneOfType([a.oneOf(["elevation","outlined"]),a.string])});const nh=_a;function rh(e){return Ze("MuiPopover",e)}mt("MuiPopover",["root","paper"]);const oh=["onEntering"],sh=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],ih=["slotProps"];function Zs(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function Qs(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function ei(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function Kn(e){return typeof e=="function"?e():e}const ah=e=>{const{classes:t}=e;return at({root:["root"],paper:["paper"]},rh,t)},lh=Oe(Jm,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ma=Oe(nh,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Aa=k.forwardRef(function(t,n){var r,o,s;const i=lt({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:d={vertical:"top",horizontal:"left"},anchorPosition:m,anchorReference:v="anchorEl",children:g,className:p,container:h,elevation:f=8,marginThreshold:b=16,open:w,PaperProps:P={},slots:x,slotProps:E,transformOrigin:y={vertical:"top",horizontal:"left"},TransitionComponent:T=ao,transitionDuration:S="auto",TransitionProps:{onEntering:j}={},disableScrollLock:A=!1}=i,V=fe(i.TransitionProps,oh),R=fe(i,sh),_=(r=E==null?void 0:E.paper)!=null?r:P,M=k.useRef(),F=Ue(M,_.ref),D=C({},i,{anchorOrigin:d,anchorReference:v,elevation:f,marginThreshold:b,externalPaperSlotProps:_,transformOrigin:y,TransitionComponent:T,transitionDuration:S,TransitionProps:V}),I=ah(D),z=k.useCallback(()=>{if(v==="anchorPosition")return process.env.NODE_ENV!=="production"&&(m||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),m;const te=Kn(c),$=te&&te.nodeType===1?te:Ce(M.current).body,ae=$.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Te=$.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Te.top===0&&Te.left===0&&Te.right===0&&Te.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:ae.top+Zs(ae,d.vertical),left:ae.left+Qs(ae,d.horizontal)}},[c,d.horizontal,d.vertical,m,v]),Z=k.useCallback(te=>({vertical:Zs(te,y.vertical),horizontal:Qs(te,y.horizontal)}),[y.horizontal,y.vertical]),G=k.useCallback(te=>{const $={width:te.offsetWidth,height:te.offsetHeight},ae=Z($);if(v==="none")return{top:null,left:null,transformOrigin:ei(ae)};const Te=z();let Pe=Te.top-ae.vertical,Ee=Te.left-ae.horizontal;const bt=Pe+$.height,Re=Ee+$.width,Qe=qt(Kn(c)),Me=Qe.innerHeight-b,et=Qe.innerWidth-b;if(b!==null&&Pe<b){const Ne=Pe-b;Pe-=Ne,ae.vertical+=Ne}else if(b!==null&&bt>Me){const Ne=bt-Me;Pe-=Ne,ae.vertical+=Ne}if(process.env.NODE_ENV!=="production"&&$.height>Me&&$.height&&Me&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${$.height-Me}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),b!==null&&Ee<b){const Ne=Ee-b;Ee-=Ne,ae.horizontal+=Ne}else if(Re>et){const Ne=Re-et;Ee-=Ne,ae.horizontal+=Ne}return{top:`${Math.round(Pe)}px`,left:`${Math.round(Ee)}px`,transformOrigin:ei(ae)}},[c,v,z,Z,b]),[N,B]=k.useState(w),U=k.useCallback(()=>{const te=M.current;if(!te)return;const $=G(te);$.top!==null&&(te.style.top=$.top),$.left!==null&&(te.style.left=$.left),te.style.transformOrigin=$.transformOrigin,B(!0)},[G]);k.useEffect(()=>(A&&window.addEventListener("scroll",U),()=>window.removeEventListener("scroll",U)),[c,A,U]);const J=(te,$)=>{j&&j(te,$),U()},H=()=>{B(!1)};k.useEffect(()=>{w&&U()}),k.useImperativeHandle(l,()=>w?{updatePosition:()=>{U()}}:null,[w,U]),k.useEffect(()=>{if(!w)return;const te=Bi(()=>{U()}),$=qt(c);return $.addEventListener("resize",te),()=>{te.clear(),$.removeEventListener("resize",te)}},[c,w,U]);let q=S;S==="auto"&&!T.muiSupportAuto&&(q=void 0);const Y=h||(c?Ce(Kn(c)).body:void 0),K=(o=x==null?void 0:x.root)!=null?o:lh,X=(s=x==null?void 0:x.paper)!=null?s:Ma,Q=jt({elementType:X,externalSlotProps:C({},_,{style:N?_.style:C({},_.style,{opacity:0})}),additionalProps:{elevation:f,ref:F},ownerState:D,className:Se(I.paper,_==null?void 0:_.className)}),ee=jt({elementType:K,externalSlotProps:(E==null?void 0:E.root)||{},externalForwardedProps:R,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:Y,open:w},ownerState:D,className:Se(I.root,p)}),{slotProps:ie}=ee,L=fe(ee,ih);return u.jsx(K,C({},L,!Yi(K)&&{slotProps:ie,disableScrollLock:A},{children:u.jsx(T,C({appear:!0,in:w,onEntering:J,onExited:H,timeout:q},V,{children:u.jsx(X,C({},Q,{children:g}))}))}))});process.env.NODE_ENV!=="production"&&(Aa.propTypes={action:xo,anchorEl:Zt(a.oneOfType([ot,a.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=Kn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:a.shape({horizontal:a.oneOfType([a.oneOf(["center","left","right"]),a.number]).isRequired,vertical:a.oneOfType([a.oneOf(["bottom","center","top"]),a.number]).isRequired}),anchorPosition:a.shape({left:a.number.isRequired,top:a.number.isRequired}),anchorReference:a.oneOf(["anchorEl","anchorPosition","none"]),children:a.node,classes:a.object,className:a.string,container:a.oneOfType([ot,a.func]),disableScrollLock:a.bool,elevation:Wi,marginThreshold:a.number,onClose:a.func,open:a.bool.isRequired,PaperProps:a.shape({component:Bc}),slotProps:a.shape({paper:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),slots:a.shape({paper:a.elementType,root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),transformOrigin:a.shape({horizontal:a.oneOfType([a.oneOf(["center","left","right"]),a.number]).isRequired,vertical:a.oneOfType([a.oneOf(["bottom","center","top"]),a.number]).isRequired}),TransitionComponent:a.elementType,transitionDuration:a.oneOfType([a.oneOf(["auto"]),a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})]),TransitionProps:a.object});const ch=Aa;function ph(e){return Ze("MuiMenu",e)}mt("MuiMenu",["root","paper","list"]);const uh=["onEntering"],dh=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],fh={vertical:"top",horizontal:"right"},mh={vertical:"top",horizontal:"left"},hh=e=>{const{classes:t}=e;return at({root:["root"],paper:["paper"],list:["list"]},ph,t)},gh=Oe(ch,{shouldForwardProp:e=>ha(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),bh=Oe(Ma,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),vh=Oe(Dm,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Da=k.forwardRef(function(t,n){var r,o;const s=lt({props:t,name:"MuiMenu"}),{autoFocus:i=!0,children:l,className:c,disableAutoFocusItem:d=!1,MenuListProps:m={},onClose:v,open:g,PaperProps:p={},PopoverClasses:h,transitionDuration:f="auto",TransitionProps:{onEntering:b}={},variant:w="selectedMenu",slots:P={},slotProps:x={}}=s,E=fe(s.TransitionProps,uh),y=fe(s,dh),T=Bn(),S=T.direction==="rtl",j=C({},s,{autoFocus:i,disableAutoFocusItem:d,MenuListProps:m,onEntering:b,PaperProps:p,transitionDuration:f,TransitionProps:E,variant:w}),A=hh(j),V=i&&!d&&g,R=k.useRef(null),_=(G,N)=>{R.current&&R.current.adjustStyleForScrollbar(G,T),b&&b(G,N)},M=G=>{G.key==="Tab"&&(G.preventDefault(),v&&v(G,"tabKeyDown"))};let F=-1;k.Children.map(l,(G,N)=>{k.isValidElement(G)&&(process.env.NODE_ENV!=="production"&&er.isFragment(G)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),G.props.disabled||(w==="selectedMenu"&&G.props.selected||F===-1)&&(F=N))});const D=(r=P.paper)!=null?r:bh,I=(o=x.paper)!=null?o:p,z=jt({elementType:P.root,externalSlotProps:x.root,ownerState:j,className:[A.root,c]}),Z=jt({elementType:D,externalSlotProps:I,ownerState:j,className:A.paper});return u.jsx(gh,C({onClose:v,anchorOrigin:{vertical:"bottom",horizontal:S?"right":"left"},transformOrigin:S?fh:mh,slots:{paper:D,root:P.root},slotProps:{root:z,paper:Z},open:g,ref:n,transitionDuration:f,TransitionProps:C({onEntering:_},E),ownerState:j},y,{classes:h,children:u.jsx(vh,C({onKeyDown:M,actions:R,autoFocus:i&&(F===-1||d),autoFocusItem:V,variant:w},m,{className:Se(A.list,m.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(Da.propTypes={anchorEl:a.oneOfType([ot,a.func]),autoFocus:a.bool,children:a.node,classes:a.object,className:a.string,disableAutoFocusItem:a.bool,MenuListProps:a.object,onClose:a.func,open:a.bool.isRequired,PaperProps:a.object,PopoverClasses:a.object,slotProps:a.shape({paper:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),slots:a.shape({paper:a.elementType,root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),transitionDuration:a.oneOfType([a.oneOf(["auto"]),a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})]),TransitionProps:a.object,variant:a.oneOf(["menu","selectedMenu"])});const yh=Da;function wh({className:e,commandHandler:t,menuDefinition:n,children:r}){var d;const[o,s]=O.useState(void 0),i=O.useCallback(m=>{m.preventDefault(),s(o===void 0?{mouseX:m.clientX+2,mouseY:m.clientY-6}:void 0)},[o]),l=O.useCallback(()=>{s(void 0)},[]),c=O.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((d=n==null?void 0:n.items)==null?void 0:d.length)??0)===0||!r?r:u.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:i,children:[r,u.jsx(yh,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:u.jsx(Fo,{menuDefinition:n,commandHandler:t,onClick:l})})]})}const xh=ka(u.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Eh(e){return{preserveValue:!0,...e}}const lr=(e,t,n={})=>{const r=O.useRef(t);r.current=t;const o=O.useRef(n);o.current=Eh(o.current);const[s,i]=O.useState(()=>r.current),[l,c]=O.useState(!0);return O.useEffect(()=>{let d=!0;return c(!!e),(async()=>{if(e){const m=await e();d&&(i(()=>m),c(!1))}})(),()=>{d=!1,o.current.preserveValue||i(()=>r.current)}},[e]),[s,l]};function Ba({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:s,ariaLabelPrefix:i,children:l}){const[c,d]=O.useState(!1),[m,v]=O.useState(!1),g=O.useCallback(()=>{c&&d(!1),v(!1)},[c]),p=O.useCallback(E=>{E.stopPropagation(),d(y=>{const T=!y;return T&&E.shiftKey?v(!0):T||v(!1),T})},[]),h=O.useCallback(E=>(g(),r(E)),[r,g]),[f,b]=O.useState({top:1,left:1});O.useEffect(()=>{if(c){const E=o==null?void 0:o.current;if(E){const y=E.getBoundingClientRect(),T=window.scrollY,S=window.scrollX,j=y.top+T+E.clientHeight,A=y.left+S;b({top:j,left:A})}}},[c,o]);const[w]=lr(O.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[P]=lr(O.useCallback(async()=>(e==null?void 0:e(!0))??n??w,[e,n,w,c]),n??w),x=m&&P?P:w;return u.jsxs(u.Fragment,{children:[u.jsx(we.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${s??""}`,color:"inherit","aria-label":`${i??""} menu button`,onClick:p,children:l??u.jsx(xh,{})}),u.jsx(we.Drawer,{className:`papi-menu-drawer ${s??""}`,anchor:"left",variant:"temporary",open:c,onClose:g,PaperProps:{className:"papi-menu-drawer-paper",style:{top:f.top,left:f.left}},children:x?u.jsx(Sa,{className:s,id:`${i??""} main menu`,commandHandler:h,multiColumnMenu:x}):void 0})]})}function kh({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:s=!1,size:i="medium",className:l,onClick:c,children:d}){return u.jsx(we.IconButton,{id:e,disabled:n,edge:s,size:i,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:d})}const Th=po.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),La=O.forwardRef(({className:e,...t},n)=>u.jsx(di.Root,{ref:n,className:W(Th(),e),...t}));La.displayName=di.Root.displayName;function Va({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:s,placeholder:i,isRequired:l=!1,className:c,defaultValue:d,value:m,onChange:v,onFocus:g,onBlur:p}){return u.jsxs("div",{className:W("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":r}),children:[u.jsx(La,{htmlFor:e,className:W({"pr-text-red-600":n,"pr-hidden":!s}),children:`${s}${l?"*":""}`}),u.jsx(jn,{id:e,disabled:t,placeholder:i,required:l,className:W(c,{"pr-border-red-600":n}),defaultValue:d,value:m,onChange:v,onFocus:g,onBlur:p}),u.jsx("p",{className:W({"pr-hidden":!o}),children:o})]})}function Nh({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=O.useState(""),s=i=>{o(i),e(i)};return u.jsx(Va,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:i=>s(i.target.value)})}function Sh({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:s=1,showMarks:i=!1,defaultValue:l,value:c,valueLabelDisplay:d="off",className:m,onChange:v,onChangeCommitted:g}){return u.jsx(we.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:s,marks:i,defaultValue:l,value:c,valueLabelDisplay:d,className:`papi-slider ${n} ${m??""}`,onChange:v,onChangeCommitted:g})}function Ch({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:s={vertical:"bottom",horizontal:"left"},ContentProps:i,children:l}){const c={action:(i==null?void 0:i.action)||l,message:i==null?void 0:i.message,className:r};return u.jsx(we.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:s,id:t,ContentProps:c})}function Oh({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:s}){return u.jsx(we.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:s})}function Ph({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const s=O.useRef(void 0);return u.jsx("div",{ref:s,style:{position:"relative"},children:u.jsx(we.AppBar,{position:"static",id:r,children:u.jsxs(we.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?u.jsx(Ba,{commandHandler:t,containerRef:s,menuProvider:e}):void 0,o?u.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Rh=_e.Root,Fa=O.forwardRef(({className:e,...t},n)=>u.jsx(_e.List,{ref:n,className:W("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Fa.displayName=_e.List.displayName;const za=O.forwardRef(({className:e,...t},n)=>u.jsx(_e.Trigger,{ref:n,className:W("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));za.displayName=_e.Trigger.displayName;const Ua=O.forwardRef(({className:e,...t},n)=>u.jsx(_e.Content,{ref:n,className:W("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));Ua.displayName=_e.Content.displayName;const Ha=O.forwardRef(({className:e,...t},n)=>u.jsx(_e.Root,{orientation:"vertical",ref:n,className:W("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));Ha.displayName=_e.List.displayName;const Wa=O.forwardRef(({className:e,...t},n)=>u.jsx(_e.List,{ref:n,className:W("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Wa.displayName=_e.List.displayName;const jh=O.forwardRef(({className:e,...t},n)=>u.jsx(_e.Trigger,{ref:n,...t,className:W("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),qa=O.forwardRef(({className:e,...t},n)=>u.jsx(_e.Content,{ref:n,className:W("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));qa.displayName=_e.Content.displayName;function $h({columns:e,tableData:t,onSelectItem:n}){const r=(o,s)=>{s.toggleAllRowsSelected(!1),o.toggleSelected(void 0),n(o.getValue("item"))};return u.jsx("div",{className:"pr-overflow-y-auto",children:u.jsx(Pi,{columns:e,data:t,onRowClickHandler:r})})}const ti=e=>{const t=/^\\[vc]\s+(\d+)/,n=e.match(t);return n?+n[1]:0},ni=(e,t,n,r)=>{if(!e||e===""||t==="")return[];const o=[],s=e.split(`
`);let i=r.chapterNum,l=r.verseNum,c=0;return s.forEach(d=>{d.startsWith("\\id")&&(i=0,l=0),d.startsWith("\\c")&&(i=ti(d),l=0),d.startsWith("\\v")&&(l=ti(d),i===0&&(i=r.chapterNum));const m=n(d,t);for(let v=0;v<m.length;v++){const g={reference:{...r,chapterNum:+i,verseNum:+l},snippet:d,key:c};c+=1,o.push(g)}}),o};function Ih({selectedItem:e,text:t,extractItems:n,scriptureReference:r,setScriptureReference:o,localizedStrings:s}){const i=s["%webView_inventory_occurrences_table_header_reference%"],l=s["%webView_inventory_occurrences_table_header_occurrence%"],[c,d]=O.useState(ni(t,e,n,r));return O.useEffect(()=>d(ni(t,e,n,r)),[t,e,r,n]),u.jsxs(ur,{children:[u.jsx(dr,{children:u.jsxs(Ct,{children:[u.jsx(En,{children:i}),u.jsx(En,{children:l})]})}),u.jsx(fr,{children:c.map(m=>u.jsxs(Ct,{onClick:()=>{o(m.reference)},children:[u.jsx(Ht,{children:`${me.bookNumberToEnglishName(m.reference.bookNum)} ${m.reference.chapterNum}:${m.reference.verseNum}`}),u.jsx(Ht,{children:m.snippet})]},m.key))})]})}const _h=(e,t,n)=>{let r=e;return t!=="all"&&(r=r.filter(o=>t==="approved"&&o.status===!0||t==="unapproved"&&o.status===!1||t==="unknown"&&o.status===void 0)),n!==""&&(r=r.filter(o=>o.item.includes(n))),console.log("filtered data:",r),r},Mh=(e,t,n)=>{const r=[],o=t(e);for(let s=0;s<o.length;s++){const i=o[s],l=r.find(c=>c.item===i);if(l)l.count+=1;else{const c={item:i,count:1,status:n(i)};r.push(c)}}return r};function Xa({scriptureReference:e,setScriptureReference:t,localizedStrings:n,extractItems:r,approvedItems:o,onApprovedItemsChange:s,unapprovedItems:i,onUnapprovedItemsChange:l,text:c,scope:d,onScopeChange:m,columns:v}){const g=n["%webView_inventory_all%"],p=n["%webView_inventory_approved%"],h=n["%webView_inventory_unapproved%"],f=n["%webView_inventory_unknown%"],b=n["%webView_inventory_scope_book%"],w=n["%webView_inventory_scope_chapter%"],P=n["%webView_inventory_scope_verse%"],x=n["%webView_inventory_filter_text%"],[E,y]=O.useState([]),[T,S]=O.useState("all"),[j,A]=O.useState(""),[V,R]=O.useState(""),_=(D,I)=>{y(G=>{let N=[];return D.forEach(B=>{N=G.map(U=>U.item===B&&U.status!==I?{...U,status:I}:U)}),N});let z=[...o];D.forEach(G=>{I===!0?z.includes(G)||z.push(G):z=z.filter(N=>N!==G)}),s(z);let Z=[...i];D.forEach(G=>{I===!1?Z.includes(G)||Z.push(G):Z=Z.filter(N=>N!==G)}),l(Z)},M=O.useCallback(D=>{if(o.includes(D))return!0;if(i.includes(D))return!1},[o,i]);O.useEffect(()=>{c&&(console.log("Updating itemData"),y(Mh(c,r,M)))},[r,e,c,M]);const F=O.useMemo(()=>_h(E,T,j),[E,T,j]);return u.jsxs("div",{className:"pr-twp pr-font-sans",children:[u.jsxs("div",{className:"pr-flex",children:[u.jsxs(Zn,{onValueChange:D=>S(D),defaultValue:T,children:[u.jsx(kn,{children:u.jsx(Qn,{placeholder:"Select filter"})}),u.jsxs(Tn,{className:"pr-font-sans",children:[u.jsx(Xe,{value:"all",children:g}),u.jsx(Xe,{value:"approved",children:p}),u.jsx(Xe,{value:"unapproved",children:h}),u.jsx(Xe,{value:"unknown",children:f})]})]}),u.jsxs(Zn,{onValueChange:D=>m(D),defaultValue:d,children:[u.jsx(kn,{children:u.jsx(Qn,{placeholder:"Select scope"})}),u.jsxs(Tn,{className:"pr-font-sans",children:[u.jsx(Xe,{value:"book",children:b}),u.jsx(Xe,{value:"chapter",children:w}),u.jsx(Xe,{value:"verse",children:P})]})]}),u.jsx(jn,{className:"pr-rounded-md pr-border",placeholder:x,value:j,onChange:D=>{A(D.target.value)}})]}),u.jsx("div",{className:`pr-overflow-y-auto pr-rounded-md pr-border ${V!==""&&"pr-max-h-96"}`,children:u.jsx($h,{columns:v(_),tableData:F,onSelectItem:D=>{R(D)}})}),V!==""&&u.jsx("div",{className:"pr-mt-4 pr-rounded-md pr-border",children:u.jsx(Ih,{selectedItem:V,text:c,extractItems:r,scriptureReference:e,setScriptureReference:D=>t(D),localizedStrings:n})})]})}const St=e=>e==="asc"?u.jsx(se.ArrowUpIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):e==="desc"?u.jsx(se.ArrowDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):u.jsx(se.ArrowUpDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}),Ah=(e,t,n,r,o)=>[{accessorKey:"item",header:({column:s})=>u.jsxs(he,{onClick:()=>s.toggleSorting(void 0),children:[e,St(s.getIsSorted())]})},{accessorKey:"unicodeValue",header:({column:s})=>u.jsxs(he,{onClick:()=>s.toggleSorting(void 0),children:[t,St(s.getIsSorted())]}),cell:({row:s})=>s.getValue("item").charCodeAt(0).toString(16).toUpperCase().padStart(4,"0")},{accessorKey:"count",header:({column:s})=>u.jsxs(he,{onClick:()=>s.toggleSorting(void 0),children:[n,St(s.getIsSorted())]})},{accessorKey:"status",header:({column:s,table:i})=>{const l=i.getSelectedRowModel().rows,c=[];return l.forEach(d=>{c.push(d.getValue("item"))}),u.jsxs("div",{children:[u.jsx("div",{className:"pr-flex pr-justify-center",children:u.jsxs(he,{onClick:()=>s.toggleSorting(void 0),children:[r,St(s.getIsSorted())]})}),u.jsxs("div",{className:"pr-flex pr-justify-center",children:[u.jsx(he,{children:u.jsx(se.CircleCheckIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,!0)}})}),u.jsx(he,{children:u.jsx(se.CircleXIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,!1)}})}),u.jsx(he,{children:u.jsx(se.CircleHelpIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,void 0)}})})]})]})},cell:({row:s})=>{const i=s.getValue("status");return i===!0?u.jsx(se.CircleCheckIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):i===!1?u.jsx(se.CircleXIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):u.jsx(se.CircleHelpIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"})}}],Dh=(e,t=void 0)=>{let n=pi.split(e,"");return t&&(n=n.filter(r=>r===t)),n};function Bh({scriptureReference:e,setScriptureReference:t,localizedStrings:n,approvedItems:r,onApprovedItemsChange:o,unapprovedItems:s,onUnapprovedItemsChange:i,text:l,scope:c,onScopeChange:d}){const m=n["%webView_inventory_table_header_character%"],v=n["%webView_inventory_table_header_unicode_value%"],g=n["%webView_inventory_table_header_count%"],p=n["%webView_inventory_table_header_status%"],h=f=>Ah(m,v,g,p,f);return u.jsx("div",{className:"pr-twp",children:u.jsx(Xa,{scriptureReference:e,setScriptureReference:t,localizedStrings:n,extractItems:Dh,approvedItems:r,onApprovedItemsChange:o,unapprovedItems:s,onUnapprovedItemsChange:i,text:l,scope:c,onScopeChange:d,columns:h})})}const Lh=(e,t,n,r)=>[{accessorKey:"item",header:({column:o})=>u.jsxs(he,{onClick:()=>o.toggleSorting(void 0),children:[e,St(o.getIsSorted())]})},{accessorKey:"count",header:({column:o})=>u.jsxs(he,{onClick:()=>o.toggleSorting(void 0),children:[t,St(o.getIsSorted())]})},{accessorKey:"status",header:({column:o,table:s})=>{const i=s.getSelectedRowModel().rows,l=[];return i.forEach(c=>{l.push(c.getValue("item"))}),u.jsxs("div",{children:[u.jsx("div",{className:"pr-flex pr-justify-center",children:u.jsxs(he,{onClick:()=>o.toggleSorting(void 0),children:[n,St(o.getIsSorted())]})}),u.jsxs("div",{className:"pr-flex pr-justify-center",children:[u.jsx(he,{children:u.jsx(se.CircleCheckIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{r(l,!0)}})}),u.jsx(he,{children:u.jsx(se.CircleXIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{r(l,!1)}})}),u.jsx(he,{children:u.jsx(se.CircleHelpIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{r(l,void 0)}})})]})]})},cell:({row:o})=>{const s=o.getValue("status");return s===!0?u.jsx(se.CircleCheckIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):s===!1?u.jsx(se.CircleXIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):u.jsx(se.CircleHelpIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"})}}],Vh=(e,t=void 0)=>{const n=[];return e.split(/[\s]+/).forEach((o,s,i)=>{t&&o!==t||s+1<i.length&&o===i[s+1]&&n.push(o)}),n};function Fh({scriptureReference:e,setScriptureReference:t,localizedStrings:n,approvedItems:r,onApprovedItemsChange:o,unapprovedItems:s,onUnapprovedItemsChange:i,text:l,scope:c,onScopeChange:d}){const m=n["%webView_inventory_table_header_repeated_words%"],v=n["%webView_inventory_table_header_count%"],g=n["%webView_inventory_table_header_status%"],p=h=>Lh(m,v,g,h);return u.jsx("div",{className:"pr-twp pr-font-sans",children:u.jsx(Xa,{scriptureReference:e,setScriptureReference:t,localizedStrings:n,extractItems:Vh,approvedItems:r,onApprovedItemsChange:o,unapprovedItems:s,onUnapprovedItemsChange:i,text:l,scope:c,onScopeChange:d,columns:p})})}function zh({isDownloading:e,handleClick:t,buttonText:n}){return u.jsx(he,{className:W("pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out",{"pr-cursor-not-allowed pr-bg-blue-700":e,"pr-bg-blue-600":!e,"pr-bg-white pr-text-blue-600":!n,"pr-w-20":n}),onClick:t,children:e?u.jsx(se.LoaderCircle,{size:15,className:"pr-animate-spin"}):u.jsxs(u.Fragment,{children:[u.jsx(se.Download,{size:25,className:"pr-h-4 pr-w-4"}),n]})})}function Uh({isRemoving:e,handleClick:t}){return u.jsx(he,{className:W("pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-gray-400":e}),onClick:t,children:e?u.jsxs(u.Fragment,{children:[u.jsx(se.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-black"}),"Removing..."]}):"Remove"})}function Hh({isUpdating:e,handleClick:t}){return u.jsx(he,{className:W("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e}),onClick:t,children:e?u.jsxs(u.Fragment,{children:[u.jsx(se.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-white"}),"Updating..."]}):"Update"})}function Nt(){return Nt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Nt.apply(this,arguments)}const Wh=["children","options"],ri=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,t)=>(e[t.toLowerCase()]=t,e),{for:"htmlFor"}),oi={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},qh=["style","script"],Xh=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,Gh=/mailto:/i,Yh=/\n{2,}$/,Ga=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,Kh=/^ *> ?/gm,Jh=/^ {2,}\n/,Zh=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,Ya=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,Ka=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,Qh=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,eg=/^(?:\n *)*\n/,tg=/\r\n?/g,ng=/^\[\^([^\]]+)](:.*)\n/,rg=/^\[\^([^\]]+)]/,og=/\f/g,sg=/^\s*?\[(x|\s)\]/,Ja=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,Za=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,Qa=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,lo=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,ig=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,el=/^<!--[\s\S]*?(?:-->)/,ag=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,co=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,lg=/^\{.*\}$/,cg=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,pg=/^<([^ >]+@[^ >]+)>/,ug=/^<([^ >]+:\/[^ >]+)>/,dg=/-([a-z])?/gi,tl=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,fg=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,mg=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,hg=/^\[([^\]]*)\] ?\[([^\]]*)\]/,gg=/(\[|\])/g,bg=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,vg=/\t/g,yg=/^ *\| */,wg=/(^ *\||\| *$)/g,xg=/ *$/,Eg=/^ *:-+: *$/,kg=/^ *:-+ *$/,Tg=/^ *-+: *$/,Ng=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,Sg=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,Cg=/^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,Og=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,Pg=/^\\([^0-9A-Za-z\s])/,Rg=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,jg=/^\n+/,$g=/^([ \t]*)/,Ig=/\\([^\\])/g,si=/ *\n+$/,_g=/(?:^|\n)( *)$/,zo="(?:\\d+\\.)",Uo="(?:[*+-])";function nl(e){return"( *)("+(e===1?zo:Uo)+") +"}const rl=nl(1),ol=nl(2);function sl(e){return new RegExp("^"+(e===1?rl:ol))}const Mg=sl(1),Ag=sl(2);function il(e){return new RegExp("^"+(e===1?rl:ol)+"[^\\n]*(?:\\n(?!\\1"+(e===1?zo:Uo)+" )[^\\n]*)*(\\n|$)","gm")}const al=il(1),ll=il(2);function cl(e){const t=e===1?zo:Uo;return new RegExp("^( *)("+t+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+t+" (?!"+t+" ))\\n*|\\s*\\n*$)")}const pl=cl(1),ul=cl(2);function ii(e,t){const n=t===1,r=n?pl:ul,o=n?al:ll,s=n?Mg:Ag;return{t(i,l,c){const d=_g.exec(c);return d&&(l.o||!l._&&!l.u)?r.exec(i=d[1]+i):null},i:oe.HIGH,l(i,l,c){const d=n?+i[2]:void 0,m=i[0].replace(Yh,`
`).match(o);let v=!1;return{p:m.map(function(g,p){const h=s.exec(g)[0].length,f=new RegExp("^ {1,"+h+"}","gm"),b=g.replace(f,"").replace(s,""),w=p===m.length-1,P=b.indexOf(`

`)!==-1||w&&v;v=P;const x=c._,E=c.o;let y;c.o=!0,P?(c._=!1,y=b.replace(si,`

`)):(c._=!0,y=b.replace(si,""));const T=l(y,c);return c._=x,c.o=E,T}),m:n,g:d}},h:(i,l,c)=>e(i.m?"ol":"ul",{key:c.k,start:i.g},i.p.map(function(d,m){return e("li",{key:m},l(d,c))}))}}const Dg=/^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Bg=/^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,dl=[Ga,Ya,Ka,Ja,Qa,Za,el,tl,al,pl,ll,ul],Lg=[...dl,/^[^\n]+(?:  \n|\n{2,})/,lo,co];function Vg(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function Fg(e){return Tg.test(e)?"right":Eg.test(e)?"center":kg.test(e)?"left":null}function ai(e,t,n){const r=n.$;n.$=!0;const o=t(e.trim(),n);n.$=r;let s=[[]];return o.forEach(function(i,l){i.type==="tableSeparator"?l!==0&&l!==o.length-1&&s.push([]):(i.type!=="text"||o[l+1]!=null&&o[l+1].type!=="tableSeparator"||(i.v=i.v.replace(xg,"")),s[s.length-1].push(i))}),s}function zg(e,t,n){n._=!0;const r=ai(e[1],t,n),o=e[2].replace(wg,"").split("|").map(Fg),s=function(i,l,c){return i.trim().split(`
`).map(function(d){return ai(d,l,c)})}(e[3],t,n);return n._=!1,{S:o,A:s,L:r,type:"table"}}function li(e,t){return e.S[t]==null?{}:{textAlign:e.S[t]}}function pt(e){return function(t,n){return n._?e.exec(t):null}}function ut(e){return function(t,n){return n._||n.u?e.exec(t):null}}function nt(e){return function(t,n){return n._||n.u?null:e.exec(t)}}function un(e){return function(t){return e.exec(t)}}function Ug(e,t,n){if(t._||t.u||n&&!n.endsWith(`
`))return null;let r="";e.split(`
`).every(s=>!dl.some(i=>i.test(s))&&(r+=s+`
`,s.trim()));const o=r.trimEnd();return o==""?null:[r,o]}function Ft(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch{return null}return e}function ci(e){return e.replace(Ig,"$1")}function Jn(e,t,n){const r=n._||!1,o=n.u||!1;n._=!0,n.u=!0;const s=e(t,n);return n._=r,n.u=o,s}function Hg(e,t,n){const r=n._||!1,o=n.u||!1;n._=!1,n.u=!0;const s=e(t,n);return n._=r,n.u=o,s}function Wg(e,t,n){return n._=!1,e(t,n)}const Ur=(e,t,n)=>({v:Jn(t,e[1],n)});function Hr(){return{}}function Wr(){return null}function qg(...e){return e.filter(Boolean).join(" ")}function qr(e,t,n){let r=e;const o=t.split(".");for(;o.length&&(r=r[o[0]],r!==void 0);)o.shift();return r||n}var oe;function Xg(e,t={}){t.overrides=t.overrides||{},t.slugify=t.slugify||Vg,t.namedCodesToUnicode=t.namedCodesToUnicode?Nt({},oi,t.namedCodesToUnicode):oi;const n=t.createElement||k.createElement;function r(p,h,...f){const b=qr(t.overrides,`${p}.props`,{});return n(function(w,P){const x=qr(P,w);return x?typeof x=="function"||typeof x=="object"&&"render"in x?x:qr(P,`${w}.component`,w):w}(p,t.overrides),Nt({},h,b,{className:qg(h==null?void 0:h.className,b.className)||void 0}),...f)}function o(p){let h=!1;t.forceInline?h=!0:t.forceBlock||(h=bg.test(p)===!1);const f=m(d(h?p:`${p.trimEnd().replace(jg,"")}

`,{_:h}));for(;typeof f[f.length-1]=="string"&&!f[f.length-1].trim();)f.pop();if(t.wrapper===null)return f;const b=t.wrapper||(h?"span":"div");let w;if(f.length>1||t.forceWrapper)w=f;else{if(f.length===1)return w=f[0],typeof w=="string"?r("span",{key:"outer"},w):w;w=null}return k.createElement(b,{key:"outer"},w)}function s(p){const h=p.match(Xh);return h?h.reduce(function(f,b,w){const P=b.indexOf("=");if(P!==-1){const x=function(S){return S.indexOf("-")!==-1&&S.match(ag)===null&&(S=S.replace(dg,function(j,A){return A.toUpperCase()})),S}(b.slice(0,P)).trim(),E=function(S){const j=S[0];return(j==='"'||j==="'")&&S.length>=2&&S[S.length-1]===j?S.slice(1,-1):S}(b.slice(P+1).trim()),y=ri[x]||x,T=f[y]=function(S,j){return S==="style"?j.split(/;\s?/).reduce(function(A,V){const R=V.slice(0,V.indexOf(":"));return A[R.replace(/(-[a-z])/g,_=>_[1].toUpperCase())]=V.slice(R.length+1).trim(),A},{}):S==="href"?Ft(j):(j.match(lg)&&(j=j.slice(1,j.length-1)),j==="true"||j!=="false"&&j)}(x,E);typeof T=="string"&&(lo.test(T)||co.test(T))&&(f[y]=k.cloneElement(o(T.trim()),{key:w}))}else b!=="style"&&(f[ri[b]||b]=!0);return f},{}):null}const i=[],l={},c={blockQuote:{t:nt(Ga),i:oe.HIGH,l:(p,h,f)=>({v:h(p[0].replace(Kh,""),f)}),h:(p,h,f)=>r("blockquote",{key:f.k},h(p.v,f))},breakLine:{t:un(Jh),i:oe.HIGH,l:Hr,h:(p,h,f)=>r("br",{key:f.k})},breakThematic:{t:nt(Zh),i:oe.HIGH,l:Hr,h:(p,h,f)=>r("hr",{key:f.k})},codeBlock:{t:nt(Ka),i:oe.MAX,l:p=>({v:p[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),M:void 0}),h:(p,h,f)=>r("pre",{key:f.k},r("code",Nt({},p.O,{className:p.M?`lang-${p.M}`:""}),p.v))},codeFenced:{t:nt(Ya),i:oe.MAX,l:p=>({O:s(p[3]||""),v:p[4],M:p[2]||void 0,type:"codeBlock"})},codeInline:{t:ut(Qh),i:oe.LOW,l:p=>({v:p[2]}),h:(p,h,f)=>r("code",{key:f.k},p.v)},footnote:{t:nt(ng),i:oe.MAX,l:p=>(i.push({I:p[2],j:p[1]}),{}),h:Wr},footnoteReference:{t:pt(rg),i:oe.HIGH,l:p=>({v:p[1],B:`#${t.slugify(p[1])}`}),h:(p,h,f)=>r("a",{key:f.k,href:Ft(p.B)},r("sup",{key:f.k},p.v))},gfmTask:{t:pt(sg),i:oe.HIGH,l:p=>({R:p[1].toLowerCase()==="x"}),h:(p,h,f)=>r("input",{checked:p.R,key:f.k,readOnly:!0,type:"checkbox"})},heading:{t:nt(t.enforceAtxHeadings?Za:Ja),i:oe.HIGH,l:(p,h,f)=>({v:Jn(h,p[2],f),T:t.slugify(p[2]),C:p[1].length}),h:(p,h,f)=>r(`h${p.C}`,{id:p.T,key:f.k},h(p.v,f))},headingSetext:{t:nt(Qa),i:oe.MAX,l:(p,h,f)=>({v:Jn(h,p[1],f),C:p[2]==="="?1:2,type:"heading"})},htmlComment:{t:un(el),i:oe.HIGH,l:()=>({}),h:Wr},image:{t:ut(Bg),i:oe.HIGH,l:p=>({D:p[1],B:ci(p[2]),F:p[3]}),h:(p,h,f)=>r("img",{key:f.k,alt:p.D||void 0,title:p.F||void 0,src:Ft(p.B)})},link:{t:pt(Dg),i:oe.LOW,l:(p,h,f)=>({v:Hg(h,p[1],f),B:ci(p[2]),F:p[3]}),h:(p,h,f)=>r("a",{key:f.k,href:Ft(p.B),title:p.F},h(p.v,f))},linkAngleBraceStyleDetector:{t:pt(ug),i:oe.MAX,l:p=>({v:[{v:p[1],type:"text"}],B:p[1],type:"link"})},linkBareUrlDetector:{t:(p,h)=>h.N?null:pt(cg)(p,h),i:oe.MAX,l:p=>({v:[{v:p[1],type:"text"}],B:p[1],F:void 0,type:"link"})},linkMailtoDetector:{t:pt(pg),i:oe.MAX,l(p){let h=p[1],f=p[1];return Gh.test(f)||(f="mailto:"+f),{v:[{v:h.replace("mailto:",""),type:"text"}],B:f,type:"link"}}},orderedList:ii(r,1),unorderedList:ii(r,2),newlineCoalescer:{t:nt(eg),i:oe.LOW,l:Hr,h:()=>`
`},paragraph:{t:Ug,i:oe.LOW,l:Ur,h:(p,h,f)=>r("p",{key:f.k},h(p.v,f))},ref:{t:pt(fg),i:oe.MAX,l:p=>(l[p[1]]={B:p[2],F:p[4]},{}),h:Wr},refImage:{t:ut(mg),i:oe.MAX,l:p=>({D:p[1]||void 0,P:p[2]}),h:(p,h,f)=>r("img",{key:f.k,alt:p.D,src:Ft(l[p.P].B),title:l[p.P].F})},refLink:{t:pt(hg),i:oe.MAX,l:(p,h,f)=>({v:h(p[1],f),Z:h(p[0].replace(gg,"\\$1"),f),P:p[2]}),h:(p,h,f)=>l[p.P]?r("a",{key:f.k,href:Ft(l[p.P].B),title:l[p.P].F},h(p.v,f)):r("span",{key:f.k},h(p.Z,f))},table:{t:nt(tl),i:oe.HIGH,l:zg,h:(p,h,f)=>r("table",{key:f.k},r("thead",null,r("tr",null,p.L.map(function(b,w){return r("th",{key:w,style:li(p,w)},h(b,f))}))),r("tbody",null,p.A.map(function(b,w){return r("tr",{key:w},b.map(function(P,x){return r("td",{key:x,style:li(p,x)},h(P,f))}))})))},tableSeparator:{t:function(p,h){return h.$?(h._=!0,yg.exec(p)):null},i:oe.HIGH,l:function(){return{type:"tableSeparator"}},h:()=>" | "},text:{t:un(Rg),i:oe.MIN,l:p=>({v:p[0].replace(ig,(h,f)=>t.namedCodesToUnicode[f]?t.namedCodesToUnicode[f]:h)}),h:p=>p.v},textBolded:{t:ut(Ng),i:oe.MED,l:(p,h,f)=>({v:h(p[2],f)}),h:(p,h,f)=>r("strong",{key:f.k},h(p.v,f))},textEmphasized:{t:ut(Sg),i:oe.LOW,l:(p,h,f)=>({v:h(p[2],f)}),h:(p,h,f)=>r("em",{key:f.k},h(p.v,f))},textEscaped:{t:ut(Pg),i:oe.HIGH,l:p=>({v:p[1],type:"text"})},textMarked:{t:ut(Cg),i:oe.LOW,l:Ur,h:(p,h,f)=>r("mark",{key:f.k},h(p.v,f))},textStrikethroughed:{t:ut(Og),i:oe.LOW,l:Ur,h:(p,h,f)=>r("del",{key:f.k},h(p.v,f))}};t.disableParsingRawHTML!==!0&&(c.htmlBlock={t:un(lo),i:oe.HIGH,l(p,h,f){const[,b]=p[3].match($g),w=new RegExp(`^${b}`,"gm"),P=p[3].replace(w,""),x=(E=P,Lg.some(j=>j.test(E))?Wg:Jn);var E;const y=p[1].toLowerCase(),T=qh.indexOf(y)!==-1;f.N=f.N||y==="a";const S=T?p[3]:x(h,P,f);return f.N=!1,{O:s(p[2]),v:S,G:T,H:T?y:p[1]}},h:(p,h,f)=>r(p.H,Nt({key:f.k},p.O),p.G?p.v:h(p.v,f))},c.htmlSelfClosing={t:un(co),i:oe.HIGH,l:p=>({O:s(p[2]||""),H:p[1]}),h:(p,h,f)=>r(p.H,Nt({},p.O,{key:f.k}))});const d=function(p){let h=Object.keys(p);function f(b,w){let P=[],x="";for(;b;){let E=0;for(;E<h.length;){const y=h[E],T=p[y],S=T.t(b,w,x);if(S){const j=S[0];b=b.substring(j.length);const A=T.l(S,f,w);A.type==null&&(A.type=y),P.push(A),x=j;break}E++}}return P}return h.sort(function(b,w){let P=p[b].i,x=p[w].i;return P!==x?P-x:b<w?-1:1}),function(b,w){return f(function(P){return P.replace(tg,`
`).replace(og,"").replace(vg,"    ")}(b),w)}}(c),m=(v=function(p){return function(h,f,b){return p[h.type].h(h,f,b)}}(c),function p(h,f={}){if(Array.isArray(h)){const b=f.k,w=[];let P=!1;for(let x=0;x<h.length;x++){f.k=x;const E=p(h[x],f),y=typeof E=="string";y&&P?w[w.length-1]+=E:E!==null&&w.push(E),P=y}return f.k=b,w}return v(h,p,f)});var v;const g=o(e);return i.length?r("div",null,g,r("footer",{key:"footer"},i.map(function(p){return r("div",{id:t.slugify(p.j),key:p.j},p.j,m(d(p.I,{_:!0})))}))):g}(function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"})(oe||(oe={}));const Gg=e=>{let{children:t,options:n}=e,r=function(o,s){if(o==null)return{};var i,l,c={},d=Object.keys(o);for(l=0;l<d.length;l++)s.indexOf(i=d[l])>=0||(c[i]=o[i]);return c}(e,Wh);return k.cloneElement(Xg(t,n),r)};function Yg({markdown:e}){return u.jsx("div",{className:"pr-prose",children:u.jsx(Gg,{children:e})})}const Kg=(e,t)=>{O.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Xr=()=>!1,Jg=(e,t)=>{const[n]=lr(O.useCallback(async()=>{if(!e)return Xr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Xr,{preserveValue:!1});O.useEffect(()=>()=>{n!==Xr&&n()},[n])},fl=O.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:W("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));fl.displayName="Card";const ml=O.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:W("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));ml.displayName="CardHeader";const hl=O.forwardRef(({className:e,...t},n)=>u.jsx("h3",{ref:n,className:W("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));hl.displayName="CardTitle";const gl=O.forwardRef(({className:e,...t},n)=>u.jsx("p",{ref:n,className:W("pr-text-sm pr-text-muted-foreground",e),...t}));gl.displayName="CardDescription";const bl=O.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:W("pr-p-6 pr-pt-0",e),...t}));bl.displayName="CardContent";const vl=O.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:W("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));vl.displayName="CardFooter";const Zg=po.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),yl=O.forwardRef(({className:e,variant:t,...n},r)=>u.jsx("div",{ref:r,role:"alert",className:W(Zg({variant:t}),e),...n}));yl.displayName="Alert";const wl=O.forwardRef(({className:e,...t},n)=>u.jsxs("h5",{ref:n,className:W("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));wl.displayName="AlertTitle";const xl=O.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:W("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));xl.displayName="AlertDescription";const El=O.forwardRef(({className:e,...t},n)=>u.jsxs(fn.Root,{ref:n,className:W("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[u.jsx(fn.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:u.jsx(fn.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),u.jsx(fn.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));El.displayName=fn.Root.displayName;const kl=O.forwardRef(({className:e,...t},n)=>u.jsx(Yr.Root,{className:W("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:n,children:u.jsx(Yr.Thumb,{className:W("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));kl.displayName=Yr.Root.displayName;exports.Alert=yl;exports.AlertDescription=xl;exports.AlertTitle=wl;exports.BookChapterControl=vc;exports.Button=he;exports.Card=fl;exports.CardContent=bl;exports.CardDescription=gl;exports.CardFooter=vl;exports.CardHeader=ml;exports.CardTitle=hl;exports.ChapterRangeSelector=Ec;exports.CharacterInventory=Bh;exports.Checkbox=Ri;exports.Checklist=kc;exports.ComboBox=Kr;exports.ContextMenu=wh;exports.DataTable=Pi;exports.DownloadButton=zh;exports.DropdownMenu=ho;exports.DropdownMenuCheckboxItem=bo;exports.DropdownMenuContent=cr;exports.DropdownMenuGroup=rc;exports.DropdownMenuItem=go;exports.DropdownMenuLabel=Rn;exports.DropdownMenuPortal=oc;exports.DropdownMenuRadioGroup=ic;exports.DropdownMenuRadioItem=Ei;exports.DropdownMenuSeparator=pr;exports.DropdownMenuShortcut=ki;exports.DropdownMenuSub=sc;exports.DropdownMenuSubContent=xi;exports.DropdownMenuSubTrigger=wi;exports.DropdownMenuTrigger=yi;exports.GridMenu=Sa;exports.HamburgerMenuButton=Ba;exports.IconButton=kh;exports.Input=jn;exports.LabelPosition=kt;exports.MarkdownRenderer=Yg;exports.MenuItem=Vo;exports.RemoveButton=Uh;exports.RepeatedWordsInventory=Fh;exports.SearchBar=Nh;exports.Select=Zn;exports.SelectContent=Tn;exports.SelectGroup=yc;exports.SelectItem=Xe;exports.SelectLabel=Ci;exports.SelectScrollDownButton=yo;exports.SelectScrollUpButton=vo;exports.SelectSeparator=Oi;exports.SelectTrigger=kn;exports.SelectValue=Qn;exports.ShadCnSlider=El;exports.ShadCnSwitch=kl;exports.Slider=Sh;exports.Snackbar=Ch;exports.Switch=Oh;exports.Table=ur;exports.TableBody=fr;exports.TableCaption=Ni;exports.TableCell=Ht;exports.TableFooter=Ti;exports.TableHead=En;exports.TableHeader=dr;exports.TableRow=Ct;exports.Tabs=Rh;exports.TabsContent=Ua;exports.TabsList=Fa;exports.TabsTrigger=za;exports.TextField=Va;exports.Toolbar=Ph;exports.UpdateButton=Hh;exports.VerticalTabs=Ha;exports.VerticalTabsContent=qa;exports.VerticalTabsList=Wa;exports.VerticalTabsTrigger=jh;exports.buttonVariants=Si;exports.useEvent=Kg;exports.useEventAsync=Jg;exports.usePromise=lr;function Qg(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Qg(`.papi-checkbox {
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

  /* Adding the preflight selector (pr-twp) to components was not changing the font as desired.
  So this piece of code adds pr-font-sans everywhere we include preflight. */
  .pr-twp {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
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
.pr-ml-2 {
  margin-left: 0.5rem;
}
.pr-ml-auto {
  margin-left: auto;
}
.pr-mr-1 {
  margin-right: 0.25rem;
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
.pr-w-20 {
  width: 5rem;
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
@keyframes pr-spin {

  to {
    transform: rotate(360deg);
  }
}
.pr-animate-spin {
  animation: pr-spin 1s linear infinite;
}
.pr-cursor-default {
  cursor: default;
}
.pr-cursor-not-allowed {
  cursor: not-allowed;
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
.pr-bg-blue-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity));
}
.pr-bg-blue-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
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
.pr-bg-foreground {
  background-color: hsl(var(--foreground));
}
.pr-bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity));
}
.pr-bg-gray-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity));
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
.pr-text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
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
.pr-transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
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
.pr-duration-300 {
  transition-duration: 300ms;
}
.pr-ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
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
.pr-duration-300 {
  animation-duration: 300ms;
}
.pr-ease-in-out {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
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
.hover\\:pr-text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
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
`,"top");
//# sourceMappingURL=index.cjs.map
