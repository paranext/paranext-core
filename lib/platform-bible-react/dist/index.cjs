"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const v=require("react/jsx-runtime"),P=require("react"),Ue=require("platform-bible-utils"),Ss=require("@radix-ui/react-dropdown-menu"),bt=require("lucide-react"),Ee=require("clsx"),Ns=require("tailwind-merge"),Ps=require("@radix-ui/react-slot"),Br=require("class-variance-authority"),be=require("@mui/material"),Or=require("@mui/styled-engine"),Qt=require("react-dom"),Rs=require("@radix-ui/react-label"),Po=require("react-data-grid"),Ms=require("@radix-ui/react-tabs"),$s=require("@radix-ui/react-slider"),js=require("@radix-ui/react-switch");function Tt(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const k=Tt(P),fe=Tt(Ss),Is=Tt(Qt),Ni=Tt(Rs),Re=Tt(Ms),en=Tt($s),Cr=Tt(js);var _s=Object.defineProperty,As=(e,t,n)=>t in e?_s(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t,n)=>As(e,typeof t!="symbol"?t+"":t,n);const yt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Lr=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Pi=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Ro=Ws();function Ft(e,t=!0){return t&&(e=e.toUpperCase()),e in Ro?Ro[e]:0}function Fr(e){return Ft(e)>0}function Ds(e){const t=typeof e=="string"?Ft(e):e;return t>=40&&t<=66}function Bs(e){return(typeof e=="string"?Ft(e):e)<=39}function Ri(e){return e<=66}function Ls(e){const t=typeof e=="string"?Ft(e):e;return ji(t)&&!Ri(t)}function*Fs(){for(let e=1;e<=yt.length;e++)yield e}const Vs=1,Mi=yt.length;function zs(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Vr(e,t="***"){const n=e-1;return n<0||n>=yt.length?t:yt[n]}function $i(e){return e<=0||e>Mi?"******":Pi[e-1]}function Us(e){return $i(Ft(e))}function ji(e){const t=typeof e=="number"?Vr(e):e;return Fr(t)&&!Lr.includes(t)}function qs(e){const t=typeof e=="number"?Vr(e):e;return Fr(t)&&Lr.includes(t)}function Hs(e){return Pi[e-1].includes("*obsolete*")}function Ws(){const e={};for(let t=0;t<yt.length;t++)e[yt[t]]=t+1;return e}const ue={allBookIds:yt,nonCanonicalIds:Lr,bookIdToNumber:Ft,isBookIdValid:Fr,isBookNT:Ds,isBookOT:Bs,isBookOTNT:Ri,isBookDC:Ls,allBookNumbers:Fs,firstBook:Vs,lastBook:Mi,extraBooks:zs,bookNumberToId:Vr,bookNumberToEnglishName:$i,bookIdToEnglishName:Us,isCanonical:ji,isExtraMaterial:qs,isObsolete:Hs};var qe=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(qe||{});const je=class{constructor(t){if(re(this,"name"),re(this,"fullPath"),re(this,"isPresent"),re(this,"hasVerseSegments"),re(this,"isCustomized"),re(this,"baseVersification"),re(this,"scriptureBooks"),re(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=qe[t]):(this._type=t,this.name=qe[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};re(je,"Original",new je(qe.Original)),re(je,"Septuagint",new je(qe.Septuagint)),re(je,"Vulgate",new je(qe.Vulgate)),re(je,"English",new je(qe.English)),re(je,"RussianProtestant",new je(qe.RussianProtestant)),re(je,"RussianOrthodox",new je(qe.RussianOrthodox));let dt=je;function Mo(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var Ii=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Ii||{});const Se=class ae{constructor(t,n,r,o){if(re(this,"firstChapter"),re(this,"lastChapter"),re(this,"lastVerse"),re(this,"hasSegmentsDefined"),re(this,"text"),re(this,"BBBCCCVVVS"),re(this,"longHashCode"),re(this,"versification"),re(this,"rtlMark","‏"),re(this,"_bookNum",0),re(this,"_chapterNum",0),re(this,"_verseNum",0),re(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,s=n!=null&&n instanceof dt?n:void 0;this.setEmpty(s),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof dt?n:void 0;this.setEmpty(i),this._verseNum=t%ae.chapterDigitShifter,this._chapterNum=Math.floor(t%ae.bookDigitShifter/ae.chapterDigitShifter),this._bookNum=Math.floor(t/ae.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ae){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof dt?t:ae.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ae.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new ae(t),{success:!0,verseRef:n}}catch(r){if(r instanceof Xt)return n=new ae,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ae.bcvMaxValue*ae.bookDigitShifter+(n>=0?n%ae.bcvMaxValue*ae.chapterDigitShifter:0)+(r>=0?r%ae.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:i,versificationStr:s}=t,l=i||o.toString();let c;return s&&(c=new dt(s)),n?new ae(n,r.toString(),l,c):new ae}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>ae.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ae.verseRangeSeparator)||this._verse.includes(ae.verseSequenceIndicator))}get book(){return ue.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=ue.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ae.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ae.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>ue.lastBook)throw new Xt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new dt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ae.verseRangeSeparators,ae.verseSequenceIndicators)}get BBBCCC(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const s=+i[1].trim();this.versification=new dt(qe[s])}catch{throw new Xt("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new Xt("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||ue.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ae.isVerseParseable(r[1]))throw new Xt("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ae(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;return(t===""||t===this.verseNum.toString())&&(t=void 0),{book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr}}equals(t){return t instanceof ae?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=ae.verseRangeSeparators,r=ae.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=Mo(this._verse,r);for(const s of i.map(l=>Mo(l,n))){const l=this.clone();l.verse=s[0];const c=l.verseNum;if(o.push(l),s.length>1){const p=this.clone();if(p.verse=s[1],!t)for(let u=c+1;u<p.verseNum;u++){const f=new ae(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||o.push(f)}o.push(p)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ue.lastBook?2:(ue.isCanonical(this._bookNum),0)}setEmpty(t=ae.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=ue.bookIdToNumber(t),this.chapter=n,this.verse=r}};re(Se,"defaultVersification",dt.English),re(Se,"verseRangeSeparator","-"),re(Se,"verseSequenceIndicator",","),re(Se,"verseRangeSeparators",[Se.verseRangeSeparator]),re(Se,"verseSequenceIndicators",[Se.verseSequenceIndicator]),re(Se,"chapterDigitShifter",1e3),re(Se,"bookDigitShifter",Se.chapterDigitShifter*Se.chapterDigitShifter),re(Se,"bcvMaxValue",Se.chapterDigitShifter-1),re(Se,"ValidStatusType",Ii);class Xt extends Error{}function ne(...e){return Ns.twMerge(Ee.clsx(e))}const _i=fe.Root,Ai=fe.Trigger,Xs=fe.Group,Ys=fe.Portal,Gs=fe.Sub,Ks=fe.RadioGroup,Di=P.forwardRef(({className:e,inset:t,children:n,...r},o)=>v.jsxs(fe.SubTrigger,{ref:o,className:ne("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,v.jsx(bt.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Di.displayName=fe.SubTrigger.displayName;const Bi=P.forwardRef(({className:e,...t},n)=>v.jsx(fe.SubContent,{ref:n,className:ne("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));Bi.displayName=fe.SubContent.displayName;const zr=P.forwardRef(({className:e,sideOffset:t=4,...n},r)=>v.jsx(fe.Portal,{children:v.jsx(fe.Content,{ref:r,sideOffset:t,className:ne("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));zr.displayName=fe.Content.displayName;const Ur=P.forwardRef(({className:e,inset:t,...n},r)=>v.jsx(fe.Item,{ref:r,className:ne("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));Ur.displayName=fe.Item.displayName;const Li=P.forwardRef(({className:e,children:t,checked:n,...r},o)=>v.jsxs(fe.CheckboxItem,{ref:o,className:ne("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[v.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:v.jsx(fe.ItemIndicator,{children:v.jsx(bt.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));Li.displayName=fe.CheckboxItem.displayName;const Fi=P.forwardRef(({className:e,children:t,...n},r)=>v.jsxs(fe.RadioItem,{ref:r,className:ne("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[v.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:v.jsx(fe.ItemIndicator,{children:v.jsx(bt.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));Fi.displayName=fe.RadioItem.displayName;const Hn=P.forwardRef(({className:e,inset:t,...n},r)=>v.jsx(fe.Label,{ref:r,className:ne("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));Hn.displayName=fe.Label.displayName;const qr=P.forwardRef(({className:e,...t},n)=>v.jsx(fe.Separator,{ref:n,className:ne("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));qr.displayName=fe.Separator.displayName;function Vi({className:e,...t}){return v.jsx("span",{className:ne("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Vi.displayName="DropdownMenuShortcut";const Wn=P.forwardRef(({className:e,type:t,...n},r)=>v.jsx("input",{type:t,className:ne("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));Wn.displayName="Input";const Js=P.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},i)=>v.jsxs("div",{className:"pr-relative",children:[v.jsx(Wn,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r(),t(s)},onClick:n,ref:i}),v.jsx(bt.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function Zs({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const i=Array.from({length:t},(l,c)=>c+1),s=P.useCallback(l=>{o(l)},[o]);return v.jsx("div",{className:ne("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:i.map(l=>v.jsx("div",{className:ne("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===n,"pr-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>s(l),children:l},l))})}const Qs=P.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:i,children:s},l)=>v.jsxs(Ur,{ref:l,textValue:e,className:ne("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[v.jsx("span",{className:ne("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":i.toLowerCase()==="ot","pr-border-l-purple-200":i.toLowerCase()==="nt","pr-border-l-indigo-200":i.toLowerCase()==="dc"}),children:ue.bookIdToEnglishName(e)}),n&&v.jsx("div",{children:s})]},e));function el({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return v.jsxs(Hn,{className:"pr-flex pr-justify-between",children:[v.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),v.jsxs("div",{className:"pr-flex pr-items-center",children:[v.jsx(bt.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),v.jsx(bt.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),v.jsx(bt.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const on=ue.allBookIds,tl={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},$o=["OT","NT","DC"],nl=32+32+32,rl=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],ol=e=>({OT:on.filter(n=>ue.isBookOT(n)),NT:on.filter(n=>ue.isBookNT(n)),DC:on.filter(n=>ue.isBookDC(n))})[e],Yt=e=>Ue.getChaptersForBook(ue.bookIdToNumber(e));function il(){return on.map(t=>ue.bookIdToEnglishName(t))}function al(e){return il().includes(e)}function sl(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(al(t))return on.find(r=>ue.bookIdToEnglishName(r)===t)}function ll({scrRef:e,handleSubmit:t}){const[n,r]=P.useState(""),[o,i]=P.useState(ue.bookNumberToId(e.bookNum)),[s,l]=P.useState(e.chapterNum??0),[c,p]=P.useState(ue.bookNumberToId(e.bookNum)),[u,f]=P.useState(!1),[d,g]=P.useState(u),y=P.useRef(void 0),b=P.useRef(void 0),h=P.useRef(void 0),E=P.useCallback(S=>ol(S).filter($=>{const M=ue.bookIdToEnglishName($).toLowerCase(),B=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return M.includes(B)||$.toLowerCase().includes(B)}),[n]),I=S=>{r(S)},w=P.useRef(!1),x=P.useCallback(S=>{if(w.current){w.current=!1;return}f(S)},[]),m=P.useCallback((S,$,M,B)=>{if(l(ue.bookNumberToId(e.bookNum)!==S?1:e.chapterNum),$||Yt(S)===-1){t({bookNum:ue.bookIdToNumber(S),chapterNum:M||1,verseNum:B||1}),f(!1),r("");return}i(o!==S?S:""),f(!$)},[t,e.bookNum,e.chapterNum,o]),C=S=>{S<=0||S>Yt(o)||m(o,!0,S)},N=P.useCallback(()=>{rl.forEach(S=>{const $=n.match(S);if($){const[M,B=void 0,D=void 0]=$.slice(1),j=sl(M);(ue.isBookIdValid(M)||j)&&m(j??M,!0,B?parseInt(B,10):1,D?parseInt(D,10):1)}})},[m,n]),F=P.useCallback(S=>{u?(S.key==="ArrowDown"||S.key==="ArrowUp")&&(typeof h<"u"&&h.current!==null?h.current.focus():typeof b<"u"&&b.current!==null&&b.current.focus(),S.preventDefault()):f(!0)},[u]),L=S=>{const{key:$}=S;$==="ArrowRight"||$==="ArrowLeft"||$==="ArrowDown"||$==="ArrowUp"||$==="Enter"||(y.current.dispatchEvent(new KeyboardEvent("keydown",{key:$})),y.current.focus())},V=S=>{const{key:$}=S;if(c===o){if($==="Enter"){S.preventDefault(),m(o,!0,s);return}let M=0;if($==="ArrowRight")if(s<Yt(c))M=1;else{S.preventDefault();return}else if($==="ArrowLeft")if(s>1)M=-1;else{S.preventDefault();return}else $==="ArrowDown"?M=6:$==="ArrowUp"&&(M=-6);s+M<=0||s+M>Yt(c)?l(0):M!==0&&(l(s+M),S.preventDefault())}};return P.useEffect(()=>{o===c?o===ue.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),P.useLayoutEffect(()=>{g(u)},[u]),P.useLayoutEffect(()=>{const S=setTimeout(()=>{if(d&&b.current&&h.current){const M=h.current.offsetTop-nl;b.current.scrollTo({top:M,behavior:"instant"})}},10);return()=>{clearTimeout(S)}},[d]),v.jsx("div",{className:"pr-flex",children:v.jsxs(_i,{modal:!1,open:u,onOpenChange:x,children:[v.jsx(Ai,{asChild:!0,children:v.jsx(Js,{ref:y,value:n,handleSearch:I,handleKeyDown:F,handleOnClick:()=>{i(ue.bookNumberToId(e.bookNum)),p(ue.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),f(!0),y.current.focus()},onFocus:()=>{w.current=!0},handleSubmit:N,placeholder:`${ue.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),v.jsxs(zr,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:L,align:"start",ref:b,children:[v.jsx(el,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),$o.map((S,$)=>E(S).length>0&&v.jsxs("div",{children:[v.jsx(Hn,{className:"pr-font-semibold pr-text-slate-700",children:tl[S]}),E(S).map(M=>v.jsx("div",{children:v.jsx(Qs,{bookId:M,handleSelectBook:()=>m(M,!1),isSelected:o===M,handleHighlightBook:()=>p(M),handleKeyDown:V,bookType:S,ref:B=>{o===M&&(h.current=B)},children:v.jsx(Zs,{handleSelectChapter:C,endChapter:Yt(M),activeChapter:e.bookNum===ue.bookIdToNumber(M)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:B=>{l(B)}})})},M)),$o.length-1!==$?v.jsx(qr,{}):void 0]},S))]})]})})}const zi=Br.cva("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),it=P.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},i)=>{const s=r?Ps.Slot:"button";return v.jsx(s,{className:ne(zi({variant:t,size:n,className:e})),ref:i,...o})});it.displayName="Button";function _n({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:s,options:l=[],className:c,value:p,onChange:u,onFocus:f,onBlur:d,getOptionLabel:g}){return v.jsx(be.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:i,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:p,onChange:u,onFocus:f,onBlur:d,getOptionLabel:g,renderInput:y=>v.jsx(be.TextField,{...y,error:o,fullWidth:i,disabled:n,label:t,style:{width:s}})})}function cl({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,i]=P.useState(1),[s,l]=P.useState(r),[c,p]=P.useState(Array.from({length:r},(d,g)=>g+1));P.useEffect(()=>{i(1),e(1),l(r),t(r),p(Array.from({length:r},(d,g)=>g+1))},[r,t,e]);const u=(d,g)=>{i(g),e(g),g>s&&(l(g),t(g))},f=(d,g)=>{l(g),t(g),g<o&&(i(g),e(g))};return v.jsxs(v.Fragment,{children:[v.jsx(be.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:v.jsx(_n,{onChange:(d,g)=>u(d,g),className:"book-selection-chapter",isClearable:!1,options:c,getOptionLabel:d=>d.toString(),value:o,isDisabled:n},"start chapter"),label:"Chapters",labelPlacement:"start"}),v.jsx(be.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:v.jsx(_n,{onChange:(d,g)=>f(d,g),className:"book-selection-chapter",isClearable:!1,options:c,getOptionLabel:d=>d.toString(),value:s,isDisabled:n},"end chapter"),label:"to",labelPlacement:"start"})]})}var mt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(mt||{});function Hr({id:e,isChecked:t,labelText:n="",labelPosition:r=mt.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:s=!1,hasError:l=!1,className:c,onChange:p}){const u=v.jsx(be.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:s,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:p});let f;if(n){const d=r===mt.Before||r===mt.Above,g=v.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),y=r===mt.Before||r===mt.After,b=y?g:v.jsx("div",{children:g}),h=y?u:v.jsx("div",{children:u});f=v.jsxs(be.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:l,children:[d&&b,h,!d&&b]})}else f=u;return f}function pl({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:i,createLabel:s}){return v.jsxs("fieldset",{id:e,className:t,children:[n&&v.jsx("legend",{children:n}),r.map(l=>v.jsx(Hr,{className:"check-item",isChecked:o.includes(l),labelText:s?s(l):l,onChange:()=>i(l)},l))]})}function de(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function T(){return T=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},T.apply(this,arguments)}function ul(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function dl(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Sr={exports:{}},Cn={exports:{}},se={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jo;function fl(){if(jo)return se;jo=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,p=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,g=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,b=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,E=e?Symbol.for("react.responder"):60118,I=e?Symbol.for("react.scope"):60119;function w(m){if(typeof m=="object"&&m!==null){var C=m.$$typeof;switch(C){case t:switch(m=m.type,m){case c:case p:case r:case i:case o:case f:return m;default:switch(m=m&&m.$$typeof,m){case l:case u:case y:case g:case s:return m;default:return C}}case n:return C}}}function x(m){return w(m)===p}return se.AsyncMode=c,se.ConcurrentMode=p,se.ContextConsumer=l,se.ContextProvider=s,se.Element=t,se.ForwardRef=u,se.Fragment=r,se.Lazy=y,se.Memo=g,se.Portal=n,se.Profiler=i,se.StrictMode=o,se.Suspense=f,se.isAsyncMode=function(m){return x(m)||w(m)===c},se.isConcurrentMode=x,se.isContextConsumer=function(m){return w(m)===l},se.isContextProvider=function(m){return w(m)===s},se.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===t},se.isForwardRef=function(m){return w(m)===u},se.isFragment=function(m){return w(m)===r},se.isLazy=function(m){return w(m)===y},se.isMemo=function(m){return w(m)===g},se.isPortal=function(m){return w(m)===n},se.isProfiler=function(m){return w(m)===i},se.isStrictMode=function(m){return w(m)===o},se.isSuspense=function(m){return w(m)===f},se.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===r||m===p||m===i||m===o||m===f||m===d||typeof m=="object"&&m!==null&&(m.$$typeof===y||m.$$typeof===g||m.$$typeof===s||m.$$typeof===l||m.$$typeof===u||m.$$typeof===h||m.$$typeof===E||m.$$typeof===I||m.$$typeof===b)},se.typeOf=w,se}var le={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Io;function hl(){return Io||(Io=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,p=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,g=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,b=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,E=e?Symbol.for("react.responder"):60118,I=e?Symbol.for("react.scope"):60119;function w(_){return typeof _=="string"||typeof _=="function"||_===r||_===p||_===i||_===o||_===f||_===d||typeof _=="object"&&_!==null&&(_.$$typeof===y||_.$$typeof===g||_.$$typeof===s||_.$$typeof===l||_.$$typeof===u||_.$$typeof===h||_.$$typeof===E||_.$$typeof===I||_.$$typeof===b)}function x(_){if(typeof _=="object"&&_!==null){var Z=_.$$typeof;switch(Z){case t:var R=_.type;switch(R){case c:case p:case r:case i:case o:case f:return R;default:var ie=R&&R.$$typeof;switch(ie){case l:case u:case y:case g:case s:return ie;default:return Z}}case n:return Z}}}var m=c,C=p,N=l,F=s,L=t,V=u,S=r,$=y,M=g,B=n,D=i,j=o,z=f,ee=!1;function Q(_){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),O(_)||x(_)===c}function O(_){return x(_)===p}function A(_){return x(_)===l}function q(_){return x(_)===s}function G(_){return typeof _=="object"&&_!==null&&_.$$typeof===t}function U(_){return x(_)===u}function H(_){return x(_)===r}function X(_){return x(_)===y}function Y(_){return x(_)===g}function W(_){return x(_)===n}function K(_){return x(_)===i}function J(_){return x(_)===o}function oe(_){return x(_)===f}le.AsyncMode=m,le.ConcurrentMode=C,le.ContextConsumer=N,le.ContextProvider=F,le.Element=L,le.ForwardRef=V,le.Fragment=S,le.Lazy=$,le.Memo=M,le.Portal=B,le.Profiler=D,le.StrictMode=j,le.Suspense=z,le.isAsyncMode=Q,le.isConcurrentMode=O,le.isContextConsumer=A,le.isContextProvider=q,le.isElement=G,le.isForwardRef=U,le.isFragment=H,le.isLazy=X,le.isMemo=Y,le.isPortal=W,le.isProfiler=K,le.isStrictMode=J,le.isSuspense=oe,le.isValidElementType=w,le.typeOf=x}()),le}var _o;function Ui(){return _o||(_o=1,process.env.NODE_ENV==="production"?Cn.exports=fl():Cn.exports=hl()),Cn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var pr,Ao;function ml(){if(Ao)return pr;Ao=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var s={},l=0;l<10;l++)s["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(s).map(function(u){return s[u]});if(c.join("")!=="0123456789")return!1;var p={};return"abcdefghijklmnopqrst".split("").forEach(function(u){p[u]=u}),Object.keys(Object.assign({},p)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return pr=o()?Object.assign:function(i,s){for(var l,c=r(i),p,u=1;u<arguments.length;u++){l=Object(arguments[u]);for(var f in l)t.call(l,f)&&(c[f]=l[f]);if(e){p=e(l);for(var d=0;d<p.length;d++)n.call(l,p[d])&&(c[p[d]]=l[p[d]])}}return c},pr}var ur,Do;function Wr(){if(Do)return ur;Do=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return ur=e,ur}var dr,Bo;function qi(){return Bo||(Bo=1,dr=Function.call.bind(Object.prototype.hasOwnProperty)),dr}var fr,Lo;function gl(){if(Lo)return fr;Lo=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Wr(),n={},r=qi();e=function(i){var s="Warning: "+i;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(i,s,l,c,p){if(process.env.NODE_ENV!=="production"){for(var u in i)if(r(i,u)){var f;try{if(typeof i[u]!="function"){var d=Error((c||"React class")+": "+l+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw d.name="Invariant Violation",d}f=i[u](s,u,c,l,null,t)}catch(y){f=y}if(f&&!(f instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+u+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in n)){n[f.message]=!0;var g=p?p():"";e("Failed "+l+" type: "+f.message+(g??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},fr=o,fr}var hr,Fo;function bl(){if(Fo)return hr;Fo=1;var e=Ui(),t=ml(),n=Wr(),r=qi(),o=gl(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function s(){return null}return hr=function(l,c){var p=typeof Symbol=="function"&&Symbol.iterator,u="@@iterator";function f(O){var A=O&&(p&&O[p]||O[u]);if(typeof A=="function")return A}var d="<<anonymous>>",g={array:E("array"),bigint:E("bigint"),bool:E("boolean"),func:E("function"),number:E("number"),object:E("object"),string:E("string"),symbol:E("symbol"),any:I(),arrayOf:w,element:x(),elementType:m(),instanceOf:C,node:V(),objectOf:F,oneOf:N,oneOfType:L,shape:$,exact:M};function y(O,A){return O===A?O!==0||1/O===1/A:O!==O&&A!==A}function b(O,A){this.message=O,this.data=A&&typeof A=="object"?A:{},this.stack=""}b.prototype=Error.prototype;function h(O){if(process.env.NODE_ENV!=="production")var A={},q=0;function G(H,X,Y,W,K,J,oe){if(W=W||d,J=J||Y,oe!==n){if(c){var _=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw _.name="Invariant Violation",_}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var Z=W+":"+Y;!A[Z]&&q<3&&(i("You are manually calling a React.PropTypes validation function for the `"+J+"` prop on `"+W+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),A[Z]=!0,q++)}}return X[Y]==null?H?X[Y]===null?new b("The "+K+" `"+J+"` is marked as required "+("in `"+W+"`, but its value is `null`.")):new b("The "+K+" `"+J+"` is marked as required in "+("`"+W+"`, but its value is `undefined`.")):null:O(X,Y,W,K,J)}var U=G.bind(null,!1);return U.isRequired=G.bind(null,!0),U}function E(O){function A(q,G,U,H,X,Y){var W=q[G],K=j(W);if(K!==O){var J=z(W);return new b("Invalid "+H+" `"+X+"` of type "+("`"+J+"` supplied to `"+U+"`, expected ")+("`"+O+"`."),{expectedType:O})}return null}return h(A)}function I(){return h(s)}function w(O){function A(q,G,U,H,X){if(typeof O!="function")return new b("Property `"+X+"` of component `"+U+"` has invalid PropType notation inside arrayOf.");var Y=q[G];if(!Array.isArray(Y)){var W=j(Y);return new b("Invalid "+H+" `"+X+"` of type "+("`"+W+"` supplied to `"+U+"`, expected an array."))}for(var K=0;K<Y.length;K++){var J=O(Y,K,U,H,X+"["+K+"]",n);if(J instanceof Error)return J}return null}return h(A)}function x(){function O(A,q,G,U,H){var X=A[q];if(!l(X)){var Y=j(X);return new b("Invalid "+U+" `"+H+"` of type "+("`"+Y+"` supplied to `"+G+"`, expected a single ReactElement."))}return null}return h(O)}function m(){function O(A,q,G,U,H){var X=A[q];if(!e.isValidElementType(X)){var Y=j(X);return new b("Invalid "+U+" `"+H+"` of type "+("`"+Y+"` supplied to `"+G+"`, expected a single ReactElement type."))}return null}return h(O)}function C(O){function A(q,G,U,H,X){if(!(q[G]instanceof O)){var Y=O.name||d,W=Q(q[G]);return new b("Invalid "+H+" `"+X+"` of type "+("`"+W+"` supplied to `"+U+"`, expected ")+("instance of `"+Y+"`."))}return null}return h(A)}function N(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),s;function A(q,G,U,H,X){for(var Y=q[G],W=0;W<O.length;W++)if(y(Y,O[W]))return null;var K=JSON.stringify(O,function(oe,_){var Z=z(_);return Z==="symbol"?String(_):_});return new b("Invalid "+H+" `"+X+"` of value `"+String(Y)+"` "+("supplied to `"+U+"`, expected one of "+K+"."))}return h(A)}function F(O){function A(q,G,U,H,X){if(typeof O!="function")return new b("Property `"+X+"` of component `"+U+"` has invalid PropType notation inside objectOf.");var Y=q[G],W=j(Y);if(W!=="object")return new b("Invalid "+H+" `"+X+"` of type "+("`"+W+"` supplied to `"+U+"`, expected an object."));for(var K in Y)if(r(Y,K)){var J=O(Y,K,U,H,X+"."+K,n);if(J instanceof Error)return J}return null}return h(A)}function L(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var A=0;A<O.length;A++){var q=O[A];if(typeof q!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ee(q)+" at index "+A+"."),s}function G(U,H,X,Y,W){for(var K=[],J=0;J<O.length;J++){var oe=O[J],_=oe(U,H,X,Y,W,n);if(_==null)return null;_.data&&r(_.data,"expectedType")&&K.push(_.data.expectedType)}var Z=K.length>0?", expected one of type ["+K.join(", ")+"]":"";return new b("Invalid "+Y+" `"+W+"` supplied to "+("`"+X+"`"+Z+"."))}return h(G)}function V(){function O(A,q,G,U,H){return B(A[q])?null:new b("Invalid "+U+" `"+H+"` supplied to "+("`"+G+"`, expected a ReactNode."))}return h(O)}function S(O,A,q,G,U){return new b((O||"React class")+": "+A+" type `"+q+"."+G+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+U+"`.")}function $(O){function A(q,G,U,H,X){var Y=q[G],W=j(Y);if(W!=="object")return new b("Invalid "+H+" `"+X+"` of type `"+W+"` "+("supplied to `"+U+"`, expected `object`."));for(var K in O){var J=O[K];if(typeof J!="function")return S(U,H,X,K,z(J));var oe=J(Y,K,U,H,X+"."+K,n);if(oe)return oe}return null}return h(A)}function M(O){function A(q,G,U,H,X){var Y=q[G],W=j(Y);if(W!=="object")return new b("Invalid "+H+" `"+X+"` of type `"+W+"` "+("supplied to `"+U+"`, expected `object`."));var K=t({},q[G],O);for(var J in K){var oe=O[J];if(r(O,J)&&typeof oe!="function")return S(U,H,X,J,z(oe));if(!oe)return new b("Invalid "+H+" `"+X+"` key `"+J+"` supplied to `"+U+"`.\nBad object: "+JSON.stringify(q[G],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(O),null,"  "));var _=oe(Y,J,U,H,X+"."+J,n);if(_)return _}return null}return h(A)}function B(O){switch(typeof O){case"number":case"string":case"undefined":return!0;case"boolean":return!O;case"object":if(Array.isArray(O))return O.every(B);if(O===null||l(O))return!0;var A=f(O);if(A){var q=A.call(O),G;if(A!==O.entries){for(;!(G=q.next()).done;)if(!B(G.value))return!1}else for(;!(G=q.next()).done;){var U=G.value;if(U&&!B(U[1]))return!1}}else return!1;return!0;default:return!1}}function D(O,A){return O==="symbol"?!0:A?A["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&A instanceof Symbol:!1}function j(O){var A=typeof O;return Array.isArray(O)?"array":O instanceof RegExp?"object":D(A,O)?"symbol":A}function z(O){if(typeof O>"u"||O===null)return""+O;var A=j(O);if(A==="object"){if(O instanceof Date)return"date";if(O instanceof RegExp)return"regexp"}return A}function ee(O){var A=z(O);switch(A){case"array":case"object":return"an "+A;case"boolean":case"date":case"regexp":return"a "+A;default:return A}}function Q(O){return!O.constructor||!O.constructor.name?d:O.constructor.name}return g.checkPropTypes=o,g.resetWarningCache=o.resetWarningCache,g.PropTypes=g,g},hr}var mr,Vo;function vl(){if(Vo)return mr;Vo=1;var e=Wr();function t(){}function n(){}return n.resetWarningCache=t,mr=function(){function r(s,l,c,p,u,f){if(f!==e){var d=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw d.name="Invariant Violation",d}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},mr}if(process.env.NODE_ENV!=="production"){var yl=Ui(),wl=!0;Sr.exports=bl()(yl.isElement,wl)}else Sr.exports=vl()();var xl=Sr.exports;const a=ul(xl);function Vt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function gt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Hi(e){if(!gt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Hi(e[n])}),t}function Ze(e,t,n={clone:!0}){const r=n.clone?T({},e):e;return gt(e)&&gt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(gt(t[o])&&o in e&&gt(e[o])?r[o]=Ze(e[o],t[o],n):n.clone?r[o]=gt(t[o])?Hi(t[o]):t[o]:r[o]=t[o])}),r}function El(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Wi(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let l;const c=i.type;return typeof c=="function"&&!El(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Xi=Vt(a.element,Wi);Xi.isRequired=Vt(a.element.isRequired,Wi);const gn=Xi;function kl(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Tl(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let l;return typeof i=="function"&&!kl(i)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ol=Vt(a.elementType,Tl),Cl="exact-prop: ​";function Yi(e){return process.env.NODE_ENV==="production"?e:T({},e,{[Cl]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function It(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Nr={exports:{}},ce={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zo;function Sl(){if(zo)return ce;zo=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),g=Symbol.for("react.offscreen"),y;y=Symbol.for("react.module.reference");function b(h){if(typeof h=="object"&&h!==null){var E=h.$$typeof;switch(E){case e:switch(h=h.type,h){case n:case o:case r:case p:case u:return h;default:switch(h=h&&h.$$typeof,h){case l:case s:case c:case d:case f:case i:return h;default:return E}}case t:return E}}}return ce.ContextConsumer=s,ce.ContextProvider=i,ce.Element=e,ce.ForwardRef=c,ce.Fragment=n,ce.Lazy=d,ce.Memo=f,ce.Portal=t,ce.Profiler=o,ce.StrictMode=r,ce.Suspense=p,ce.SuspenseList=u,ce.isAsyncMode=function(){return!1},ce.isConcurrentMode=function(){return!1},ce.isContextConsumer=function(h){return b(h)===s},ce.isContextProvider=function(h){return b(h)===i},ce.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===e},ce.isForwardRef=function(h){return b(h)===c},ce.isFragment=function(h){return b(h)===n},ce.isLazy=function(h){return b(h)===d},ce.isMemo=function(h){return b(h)===f},ce.isPortal=function(h){return b(h)===t},ce.isProfiler=function(h){return b(h)===o},ce.isStrictMode=function(h){return b(h)===r},ce.isSuspense=function(h){return b(h)===p},ce.isSuspenseList=function(h){return b(h)===u},ce.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===n||h===o||h===r||h===p||h===u||h===g||typeof h=="object"&&h!==null&&(h.$$typeof===d||h.$$typeof===f||h.$$typeof===i||h.$$typeof===s||h.$$typeof===c||h.$$typeof===y||h.getModuleId!==void 0)},ce.typeOf=b,ce}var pe={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Uo;function Nl(){return Uo||(Uo=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),g=Symbol.for("react.offscreen"),y=!1,b=!1,h=!1,E=!1,I=!1,w;w=Symbol.for("react.module.reference");function x(R){return!!(typeof R=="string"||typeof R=="function"||R===n||R===o||I||R===r||R===p||R===u||E||R===g||y||b||h||typeof R=="object"&&R!==null&&(R.$$typeof===d||R.$$typeof===f||R.$$typeof===i||R.$$typeof===s||R.$$typeof===c||R.$$typeof===w||R.getModuleId!==void 0))}function m(R){if(typeof R=="object"&&R!==null){var ie=R.$$typeof;switch(ie){case e:var we=R.type;switch(we){case n:case o:case r:case p:case u:return we;default:var Oe=we&&we.$$typeof;switch(Oe){case l:case s:case c:case d:case f:case i:return Oe;default:return ie}}case t:return ie}}}var C=s,N=i,F=e,L=c,V=n,S=d,$=f,M=t,B=o,D=r,j=p,z=u,ee=!1,Q=!1;function O(R){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function A(R){return Q||(Q=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function q(R){return m(R)===s}function G(R){return m(R)===i}function U(R){return typeof R=="object"&&R!==null&&R.$$typeof===e}function H(R){return m(R)===c}function X(R){return m(R)===n}function Y(R){return m(R)===d}function W(R){return m(R)===f}function K(R){return m(R)===t}function J(R){return m(R)===o}function oe(R){return m(R)===r}function _(R){return m(R)===p}function Z(R){return m(R)===u}pe.ContextConsumer=C,pe.ContextProvider=N,pe.Element=F,pe.ForwardRef=L,pe.Fragment=V,pe.Lazy=S,pe.Memo=$,pe.Portal=M,pe.Profiler=B,pe.StrictMode=D,pe.Suspense=j,pe.SuspenseList=z,pe.isAsyncMode=O,pe.isConcurrentMode=A,pe.isContextConsumer=q,pe.isContextProvider=G,pe.isElement=U,pe.isForwardRef=H,pe.isFragment=X,pe.isLazy=Y,pe.isMemo=W,pe.isPortal=K,pe.isProfiler=J,pe.isStrictMode=oe,pe.isSuspense=_,pe.isSuspenseList=Z,pe.isValidElementType=x,pe.typeOf=m}()),pe}process.env.NODE_ENV==="production"?Nr.exports=Sl():Nr.exports=Nl();var An=Nr.exports;const Pl=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Rl(e){const t=`${e}`.match(Pl);return t&&t[1]||""}function Gi(e,t=""){return e.displayName||e.name||Rl(e)||t}function qo(e,t,n){const r=Gi(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Ml(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Gi(e,"Component");if(typeof e=="object")switch(e.$$typeof){case An.ForwardRef:return qo(e,e.render,"ForwardRef");case An.Memo:return qo(e,e.type,"memo");default:return}}}function Qe(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],s=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const $l=a.oneOfType([a.func,a.object]),Xr=$l;function We(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":It(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Pr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Ki(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function jl(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,s)=>{const l=o||"<<anonymous>>",c=s||r;return typeof n[r]<"u"?new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function Il(e,t){var n,r;return k.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function ke(e){return e&&e.ownerDocument||document}function _t(e){return ke(e).defaultView||window}function _l(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?T({},t.propTypes):null;return o=>(i,s,l,c,p,...u)=>{const f=p||s,d=n==null?void 0:n[f];if(d){const g=d(i,s,l,c,p,...u);if(g)return g}return typeof i[s]<"u"&&!i[o]?new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Dn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Al=typeof window<"u"?k.useLayoutEffect:k.useEffect,wt=Al;let Ho=0;function Dl(e){const[t,n]=k.useState(e),r=e||t;return k.useEffect(()=>{t==null&&(Ho+=1,n(`mui-${Ho}`))},[t]),r}const Wo=k["useId".toString()];function Ji(e){if(Wo!==void 0){const t=Wo();return e??t}return Dl(e)}function Bl(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function Zi({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=k.useRef(e!==void 0),[i,s]=k.useState(t),l=o?e:i;if(process.env.NODE_ENV!=="production"){k.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:p}=k.useRef(t);k.useEffect(()=>{!o&&p!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=k.useCallback(p=>{o||s(p)},[]);return[l,c]}function pn(e){const t=k.useRef(e);return wt(()=>{t.current=e}),k.useRef((...n)=>(0,t.current)(...n)).current}function Le(...e){return k.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Dn(n,t)})},e)}const Xo={};function Ll(e,t){const n=k.useRef(Xo);return n.current===Xo&&(n.current=e(t)),n}const Fl=[];function Vl(e){k.useEffect(e,Fl)}class bn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new bn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function tn(){const e=Ll(bn.create).current;return Vl(e.disposeEffect),e}let Xn=!0,Rr=!1;const zl=new bn,Ul={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function ql(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Ul[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Hl(e){e.metaKey||e.altKey||e.ctrlKey||(Xn=!0)}function gr(){Xn=!1}function Wl(){this.visibilityState==="hidden"&&Rr&&(Xn=!0)}function Xl(e){e.addEventListener("keydown",Hl,!0),e.addEventListener("mousedown",gr,!0),e.addEventListener("pointerdown",gr,!0),e.addEventListener("touchstart",gr,!0),e.addEventListener("visibilitychange",Wl,!0)}function Yl(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Xn||ql(t)}function Qi(){const e=k.useCallback(o=>{o!=null&&Xl(o.ownerDocument)},[]),t=k.useRef(!1);function n(){return t.current?(Rr=!0,zl.start(100,()=>{Rr=!1}),t.current=!1,!0):!1}function r(o){return Yl(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function ea(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Gl(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function Kl(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Jl=Number.isInteger||Kl;function ta(e,t,n,r){const o=e[t];if(o==null||!Jl(o)){const i=Gl(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function na(e,t,...n){return e[t]===void 0?null:ta(e,t,...n)}function Mr(){return null}na.isRequired=ta;Mr.isRequired=Mr;const ra=process.env.NODE_ENV==="production"?Mr:na;function oa(e,t){const n=T({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=T({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=T({},i),Object.keys(o).forEach(s=>{n[r][s]=oa(o[s],i[s])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function nt(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,s)=>{if(s){const l=t(s);l!==""&&i.push(l),n&&n[s]&&i.push(n[s])}return i},[]).join(" ")}),r}const Yo=e=>e,Zl=()=>{let e=Yo;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Yo}}},Ql=Zl(),ia=Ql,aa={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Ye(e,t,n="Mui"){const r=aa[t];return r?`${n}-${r}`:`${ia.generate(e)}-${t}`}function st(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=Ye(e,o,n)}),r}function ec(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function sa(e){return typeof e=="string"}function nn(e,t,n){return e===void 0||sa(e)?t:T({},t,{ownerState:T({},t.ownerState,n)})}const tc={disableDefaultClasses:!1},nc=k.createContext(tc);function rc(e){const{disableDefaultClasses:t}=k.useContext(nc);return n=>t?"":e(n)}function la(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function oc(e,t,n){return typeof e=="function"?e(t,n):e}function Go(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function ic(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const g=Ee(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),y=T({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),b=T({},n,o,r);return g.length>0&&(b.className=g),Object.keys(y).length>0&&(b.style=y),{props:b,internalRef:void 0}}const s=la(T({},o,r)),l=Go(r),c=Go(o),p=t(s),u=Ee(p==null?void 0:p.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),f=T({},p==null?void 0:p.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),d=T({},p,n,c,l);return u.length>0&&(d.className=u),Object.keys(f).length>0&&(d.style=f),{props:d,internalRef:p.ref}}const ac=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function xt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,s=de(e,ac),l=i?{}:oc(r,o),{props:c,internalRef:p}=ic(T({},s,{externalSlotProps:l})),u=Le(p,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return nn(n,T({},c,{ref:u}),o)}const ca="base";function sc(e){return`${ca}--${e}`}function lc(e,t){return`${ca}-${e}-${t}`}function pa(e,t){const n=aa[t];return n?sc(n):lc(e,t)}function cc(e,t){const n={};return t.forEach(r=>{n[r]=pa(e,r)}),n}const pc=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function uc(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function dc(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function fc(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||dc(e))}function hc(e){const t=[],n=[];return Array.from(e.querySelectorAll(pc)).forEach((r,o)=>{const i=uc(r);i===-1||!fc(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function mc(){return!0}function Bn(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=hc,isEnabled:s=mc,open:l}=e,c=k.useRef(!1),p=k.useRef(null),u=k.useRef(null),f=k.useRef(null),d=k.useRef(null),g=k.useRef(!1),y=k.useRef(null),b=Le(t.ref,y),h=k.useRef(null);k.useEffect(()=>{!l||!y.current||(g.current=!n)},[n,l]),k.useEffect(()=>{if(!l||!y.current)return;const w=ke(y.current);return y.current.contains(w.activeElement)||(y.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),y.current.setAttribute("tabIndex","-1")),g.current&&y.current.focus()),()=>{o||(f.current&&f.current.focus&&(c.current=!0,f.current.focus()),f.current=null)}},[l]),k.useEffect(()=>{if(!l||!y.current)return;const w=ke(y.current),x=N=>{h.current=N,!(r||!s()||N.key!=="Tab")&&w.activeElement===y.current&&N.shiftKey&&(c.current=!0,u.current&&u.current.focus())},m=()=>{const N=y.current;if(N===null)return;if(!w.hasFocus()||!s()||c.current){c.current=!1;return}if(N.contains(w.activeElement)||r&&w.activeElement!==p.current&&w.activeElement!==u.current)return;if(w.activeElement!==d.current)d.current=null;else if(d.current!==null)return;if(!g.current)return;let F=[];if((w.activeElement===p.current||w.activeElement===u.current)&&(F=i(y.current)),F.length>0){var L,V;const S=!!((L=h.current)!=null&&L.shiftKey&&((V=h.current)==null?void 0:V.key)==="Tab"),$=F[0],M=F[F.length-1];typeof $!="string"&&typeof M!="string"&&(S?M.focus():$.focus())}else N.focus()};w.addEventListener("focusin",m),w.addEventListener("keydown",x,!0);const C=setInterval(()=>{w.activeElement&&w.activeElement.tagName==="BODY"&&m()},50);return()=>{clearInterval(C),w.removeEventListener("focusin",m),w.removeEventListener("keydown",x,!0)}},[n,r,o,s,l,i]);const E=w=>{f.current===null&&(f.current=w.relatedTarget),g.current=!0,d.current=w.target;const x=t.props.onFocus;x&&x(w)},I=w=>{f.current===null&&(f.current=w.relatedTarget),g.current=!0};return v.jsxs(k.Fragment,{children:[v.jsx("div",{tabIndex:l?0:-1,onFocus:I,ref:p,"data-testid":"sentinelStart"}),k.cloneElement(t,{ref:b,onFocus:E}),v.jsx("div",{tabIndex:l?0:-1,onFocus:I,ref:u,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(Bn.propTypes={children:gn,disableAutoFocus:a.bool,disableEnforceFocus:a.bool,disableRestoreFocus:a.bool,getTabbable:a.func,isEnabled:a.func,open:a.bool.isRequired});process.env.NODE_ENV!=="production"&&(Bn["propTypes"]=Yi(Bn.propTypes));function gc(e){return typeof e=="function"?e():e}const un=k.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[s,l]=k.useState(null),c=Le(k.isValidElement(r)?r.ref:null,n);if(wt(()=>{i||l(gc(o)||document.body)},[o,i]),wt(()=>{if(s&&!i)return Dn(n,s),()=>{Dn(n,null)}},[n,s,i]),i){if(k.isValidElement(r)){const p={ref:c};return k.cloneElement(r,p)}return v.jsx(k.Fragment,{children:r})}return v.jsx(k.Fragment,{children:s&&Is.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&(un.propTypes={children:a.node,container:a.oneOfType([Qe,a.func]),disablePortal:a.bool});process.env.NODE_ENV!=="production"&&(un["propTypes"]=Yi(un.propTypes));function bc(e){const t=ke(e);return t.body===e?_t(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function an(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Ko(e){return parseInt(_t(e).getComputedStyle(e).paddingRight,10)||0}function vc(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Jo(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,s=>{const l=i.indexOf(s)===-1,c=!vc(s);l&&c&&an(s,o)})}function br(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function yc(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(bc(r)){const s=ea(ke(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Ko(r)+s}px`;const l=ke(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${Ko(c)+s}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=ke(r).body;else{const s=r.parentElement,l=_t(r);i=(s==null?void 0:s.nodeName)==="HTML"&&l.getComputedStyle(s).overflowY==="scroll"?s:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:s,property:l})=>{i?s.style.setProperty(l,i):s.style.removeProperty(l)})}}function wc(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class xc{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&an(t.modalRef,!1);const o=wc(n);Jo(n,t.mount,t.modalRef,o,!0);const i=br(this.containers,s=>s.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=br(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=yc(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=br(this.containers,s=>s.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&an(t.modalRef,n),Jo(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=i.modals[i.modals.length-1];s.modalRef&&an(s.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Ec(e){return typeof e=="function"?e():e}function kc(e){return e?e.props.hasOwnProperty("in"):!1}const Tc=new xc;function Oc(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Tc,closeAfterTransition:i=!1,onTransitionEnter:s,onTransitionExited:l,children:c,onClose:p,open:u,rootRef:f}=e,d=k.useRef({}),g=k.useRef(null),y=k.useRef(null),b=Le(y,f),[h,E]=k.useState(!u),I=kc(c);let w=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(w=!1);const x=()=>ke(g.current),m=()=>(d.current.modalRef=y.current,d.current.mount=g.current,d.current),C=()=>{o.mount(m(),{disableScrollLock:r}),y.current&&(y.current.scrollTop=0)},N=pn(()=>{const j=Ec(t)||x().body;o.add(m(),j),y.current&&C()}),F=k.useCallback(()=>o.isTopModal(m()),[o]),L=pn(j=>{g.current=j,j&&(u&&F()?C():y.current&&an(y.current,w))}),V=k.useCallback(()=>{o.remove(m(),w)},[w,o]);k.useEffect(()=>()=>{V()},[V]),k.useEffect(()=>{u?N():(!I||!i)&&V()},[u,V,I,i,N]);const S=j=>z=>{var ee;(ee=j.onKeyDown)==null||ee.call(j,z),!(z.key!=="Escape"||z.which===229||!F())&&(n||(z.stopPropagation(),p&&p(z,"escapeKeyDown")))},$=j=>z=>{var ee;(ee=j.onClick)==null||ee.call(j,z),z.target===z.currentTarget&&p&&p(z,"backdropClick")};return{getRootProps:(j={})=>{const z=la(e);delete z.onTransitionEnter,delete z.onTransitionExited;const ee=T({},z,j);return T({role:"presentation"},ee,{onKeyDown:S(ee),ref:b})},getBackdropProps:(j={})=>{const z=j;return T({"aria-hidden":!0},z,{onClick:$(z),open:u})},getTransitionProps:()=>{const j=()=>{E(!1),s&&s()},z=()=>{E(!0),l&&l(),i&&V()};return{onEnter:Pr(j,c==null?void 0:c.props.onEnter),onExited:Pr(z,c==null?void 0:c.props.onExited)}},rootRef:b,portalRef:L,isTopModal:F,exited:h,hasTransition:I}}var Ne="top",Fe="bottom",Ve="right",Pe="left",Yr="auto",vn=[Ne,Fe,Ve,Pe],At="start",dn="end",Cc="clippingParents",ua="viewport",Gt="popper",Sc="reference",Zo=vn.reduce(function(e,t){return e.concat([t+"-"+At,t+"-"+dn])},[]),da=[].concat(vn,[Yr]).reduce(function(e,t){return e.concat([t,t+"-"+At,t+"-"+dn])},[]),Nc="beforeRead",Pc="read",Rc="afterRead",Mc="beforeMain",$c="main",jc="afterMain",Ic="beforeWrite",_c="write",Ac="afterWrite",Dc=[Nc,Pc,Rc,Mc,$c,jc,Ic,_c,Ac];function Xe(e){return e?(e.nodeName||"").toLowerCase():null}function _e(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Et(e){var t=_e(e).Element;return e instanceof t||e instanceof Element}function Be(e){var t=_e(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Gr(e){if(typeof ShadowRoot>"u")return!1;var t=_e(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Bc(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!Be(i)||!Xe(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(s){var l=o[s];l===!1?i.removeAttribute(s):i.setAttribute(s,l===!0?"":l)}))})}function Lc(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},s=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=s.reduce(function(c,p){return c[p]="",c},{});!Be(o)||!Xe(o)||(Object.assign(o.style,l),Object.keys(i).forEach(function(c){o.removeAttribute(c)}))})}}const Fc={name:"applyStyles",enabled:!0,phase:"write",fn:Bc,effect:Lc,requires:["computeStyles"]};function He(e){return e.split("-")[0]}var vt=Math.max,Ln=Math.min,Dt=Math.round;function $r(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function fa(){return!/^((?!chrome|android).)*safari/i.test($r())}function Bt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&Be(e)&&(o=e.offsetWidth>0&&Dt(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&Dt(r.height)/e.offsetHeight||1);var s=Et(e)?_e(e):window,l=s.visualViewport,c=!fa()&&n,p=(r.left+(c&&l?l.offsetLeft:0))/o,u=(r.top+(c&&l?l.offsetTop:0))/i,f=r.width/o,d=r.height/i;return{width:f,height:d,top:u,right:p+f,bottom:u+d,left:p,x:p,y:u}}function Kr(e){var t=Bt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function ha(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Gr(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function et(e){return _e(e).getComputedStyle(e)}function Vc(e){return["table","td","th"].indexOf(Xe(e))>=0}function lt(e){return((Et(e)?e.ownerDocument:e.document)||window.document).documentElement}function Yn(e){return Xe(e)==="html"?e:e.assignedSlot||e.parentNode||(Gr(e)?e.host:null)||lt(e)}function Qo(e){return!Be(e)||et(e).position==="fixed"?null:e.offsetParent}function zc(e){var t=/firefox/i.test($r()),n=/Trident/i.test($r());if(n&&Be(e)){var r=et(e);if(r.position==="fixed")return null}var o=Yn(e);for(Gr(o)&&(o=o.host);Be(o)&&["html","body"].indexOf(Xe(o))<0;){var i=et(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function yn(e){for(var t=_e(e),n=Qo(e);n&&Vc(n)&&et(n).position==="static";)n=Qo(n);return n&&(Xe(n)==="html"||Xe(n)==="body"&&et(n).position==="static")?t:n||zc(e)||t}function Jr(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function sn(e,t,n){return vt(e,Ln(t,n))}function Uc(e,t,n){var r=sn(e,t,n);return r>n?n:r}function ma(){return{top:0,right:0,bottom:0,left:0}}function ga(e){return Object.assign({},ma(),e)}function ba(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var qc=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,ga(typeof t!="number"?t:ba(t,vn))};function Hc(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,s=n.modifiersData.popperOffsets,l=He(n.placement),c=Jr(l),p=[Pe,Ve].indexOf(l)>=0,u=p?"height":"width";if(!(!i||!s)){var f=qc(o.padding,n),d=Kr(i),g=c==="y"?Ne:Pe,y=c==="y"?Fe:Ve,b=n.rects.reference[u]+n.rects.reference[c]-s[c]-n.rects.popper[u],h=s[c]-n.rects.reference[c],E=yn(i),I=E?c==="y"?E.clientHeight||0:E.clientWidth||0:0,w=b/2-h/2,x=f[g],m=I-d[u]-f[y],C=I/2-d[u]/2+w,N=sn(x,C,m),F=c;n.modifiersData[r]=(t={},t[F]=N,t.centerOffset=N-C,t)}}function Wc(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||ha(t.elements.popper,o)&&(t.elements.arrow=o))}const Xc={name:"arrow",enabled:!0,phase:"main",fn:Hc,effect:Wc,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Lt(e){return e.split("-")[1]}var Yc={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Gc(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Dt(n*o)/o||0,y:Dt(r*o)/o||0}}function ei(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,s=e.offsets,l=e.position,c=e.gpuAcceleration,p=e.adaptive,u=e.roundOffsets,f=e.isFixed,d=s.x,g=d===void 0?0:d,y=s.y,b=y===void 0?0:y,h=typeof u=="function"?u({x:g,y:b}):{x:g,y:b};g=h.x,b=h.y;var E=s.hasOwnProperty("x"),I=s.hasOwnProperty("y"),w=Pe,x=Ne,m=window;if(p){var C=yn(n),N="clientHeight",F="clientWidth";if(C===_e(n)&&(C=lt(n),et(C).position!=="static"&&l==="absolute"&&(N="scrollHeight",F="scrollWidth")),C=C,o===Ne||(o===Pe||o===Ve)&&i===dn){x=Fe;var L=f&&C===m&&m.visualViewport?m.visualViewport.height:C[N];b-=L-r.height,b*=c?1:-1}if(o===Pe||(o===Ne||o===Fe)&&i===dn){w=Ve;var V=f&&C===m&&m.visualViewport?m.visualViewport.width:C[F];g-=V-r.width,g*=c?1:-1}}var S=Object.assign({position:l},p&&Yc),$=u===!0?Gc({x:g,y:b},_e(n)):{x:g,y:b};if(g=$.x,b=$.y,c){var M;return Object.assign({},S,(M={},M[x]=I?"0":"",M[w]=E?"0":"",M.transform=(m.devicePixelRatio||1)<=1?"translate("+g+"px, "+b+"px)":"translate3d("+g+"px, "+b+"px, 0)",M))}return Object.assign({},S,(t={},t[x]=I?b+"px":"",t[w]=E?g+"px":"",t.transform="",t))}function Kc(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,s=i===void 0?!0:i,l=n.roundOffsets,c=l===void 0?!0:l,p={placement:He(t.placement),variation:Lt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,ei(Object.assign({},p,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,ei(Object.assign({},p,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Jc={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Kc,data:{}};var Sn={passive:!0};function Zc(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,s=r.resize,l=s===void 0?!0:s,c=_e(t.elements.popper),p=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&p.forEach(function(u){u.addEventListener("scroll",n.update,Sn)}),l&&c.addEventListener("resize",n.update,Sn),function(){i&&p.forEach(function(u){u.removeEventListener("scroll",n.update,Sn)}),l&&c.removeEventListener("resize",n.update,Sn)}}const Qc={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Zc,data:{}};var ep={left:"right",right:"left",bottom:"top",top:"bottom"};function Mn(e){return e.replace(/left|right|bottom|top/g,function(t){return ep[t]})}var tp={start:"end",end:"start"};function ti(e){return e.replace(/start|end/g,function(t){return tp[t]})}function Zr(e){var t=_e(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Qr(e){return Bt(lt(e)).left+Zr(e).scrollLeft}function np(e,t){var n=_e(e),r=lt(e),o=n.visualViewport,i=r.clientWidth,s=r.clientHeight,l=0,c=0;if(o){i=o.width,s=o.height;var p=fa();(p||!p&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:i,height:s,x:l+Qr(e),y:c}}function rp(e){var t,n=lt(e),r=Zr(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=vt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=vt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Qr(e),c=-r.scrollTop;return et(o||n).direction==="rtl"&&(l+=vt(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:s,x:l,y:c}}function eo(e){var t=et(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function va(e){return["html","body","#document"].indexOf(Xe(e))>=0?e.ownerDocument.body:Be(e)&&eo(e)?e:va(Yn(e))}function ln(e,t){var n;t===void 0&&(t=[]);var r=va(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=_e(r),s=o?[i].concat(i.visualViewport||[],eo(r)?r:[]):r,l=t.concat(s);return o?l:l.concat(ln(Yn(s)))}function jr(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function op(e,t){var n=Bt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function ni(e,t,n){return t===ua?jr(np(e,n)):Et(t)?op(t,n):jr(rp(lt(e)))}function ip(e){var t=ln(Yn(e)),n=["absolute","fixed"].indexOf(et(e).position)>=0,r=n&&Be(e)?yn(e):e;return Et(r)?t.filter(function(o){return Et(o)&&ha(o,r)&&Xe(o)!=="body"}):[]}function ap(e,t,n,r){var o=t==="clippingParents"?ip(e):[].concat(t),i=[].concat(o,[n]),s=i[0],l=i.reduce(function(c,p){var u=ni(e,p,r);return c.top=vt(u.top,c.top),c.right=Ln(u.right,c.right),c.bottom=Ln(u.bottom,c.bottom),c.left=vt(u.left,c.left),c},ni(e,s,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function ya(e){var t=e.reference,n=e.element,r=e.placement,o=r?He(r):null,i=r?Lt(r):null,s=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Ne:c={x:s,y:t.y-n.height};break;case Fe:c={x:s,y:t.y+t.height};break;case Ve:c={x:t.x+t.width,y:l};break;case Pe:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var p=o?Jr(o):null;if(p!=null){var u=p==="y"?"height":"width";switch(i){case At:c[p]=c[p]-(t[u]/2-n[u]/2);break;case dn:c[p]=c[p]+(t[u]/2-n[u]/2);break}}return c}function fn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,s=i===void 0?e.strategy:i,l=n.boundary,c=l===void 0?Cc:l,p=n.rootBoundary,u=p===void 0?ua:p,f=n.elementContext,d=f===void 0?Gt:f,g=n.altBoundary,y=g===void 0?!1:g,b=n.padding,h=b===void 0?0:b,E=ga(typeof h!="number"?h:ba(h,vn)),I=d===Gt?Sc:Gt,w=e.rects.popper,x=e.elements[y?I:d],m=ap(Et(x)?x:x.contextElement||lt(e.elements.popper),c,u,s),C=Bt(e.elements.reference),N=ya({reference:C,element:w,strategy:"absolute",placement:o}),F=jr(Object.assign({},w,N)),L=d===Gt?F:C,V={top:m.top-L.top+E.top,bottom:L.bottom-m.bottom+E.bottom,left:m.left-L.left+E.left,right:L.right-m.right+E.right},S=e.modifiersData.offset;if(d===Gt&&S){var $=S[o];Object.keys(V).forEach(function(M){var B=[Ve,Fe].indexOf(M)>=0?1:-1,D=[Ne,Fe].indexOf(M)>=0?"y":"x";V[M]+=$[D]*B})}return V}function sp(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,s=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,p=c===void 0?da:c,u=Lt(r),f=u?l?Zo:Zo.filter(function(y){return Lt(y)===u}):vn,d=f.filter(function(y){return p.indexOf(y)>=0});d.length===0&&(d=f);var g=d.reduce(function(y,b){return y[b]=fn(e,{placement:b,boundary:o,rootBoundary:i,padding:s})[He(b)],y},{});return Object.keys(g).sort(function(y,b){return g[y]-g[b]})}function lp(e){if(He(e)===Yr)return[];var t=Mn(e);return[ti(e),t,ti(t)]}function cp(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!0:s,c=n.fallbackPlacements,p=n.padding,u=n.boundary,f=n.rootBoundary,d=n.altBoundary,g=n.flipVariations,y=g===void 0?!0:g,b=n.allowedAutoPlacements,h=t.options.placement,E=He(h),I=E===h,w=c||(I||!y?[Mn(h)]:lp(h)),x=[h].concat(w).reduce(function(U,H){return U.concat(He(H)===Yr?sp(t,{placement:H,boundary:u,rootBoundary:f,padding:p,flipVariations:y,allowedAutoPlacements:b}):H)},[]),m=t.rects.reference,C=t.rects.popper,N=new Map,F=!0,L=x[0],V=0;V<x.length;V++){var S=x[V],$=He(S),M=Lt(S)===At,B=[Ne,Fe].indexOf($)>=0,D=B?"width":"height",j=fn(t,{placement:S,boundary:u,rootBoundary:f,altBoundary:d,padding:p}),z=B?M?Ve:Pe:M?Fe:Ne;m[D]>C[D]&&(z=Mn(z));var ee=Mn(z),Q=[];if(i&&Q.push(j[$]<=0),l&&Q.push(j[z]<=0,j[ee]<=0),Q.every(function(U){return U})){L=S,F=!1;break}N.set(S,Q)}if(F)for(var O=y?3:1,A=function(H){var X=x.find(function(Y){var W=N.get(Y);if(W)return W.slice(0,H).every(function(K){return K})});if(X)return L=X,"break"},q=O;q>0;q--){var G=A(q);if(G==="break")break}t.placement!==L&&(t.modifiersData[r]._skip=!0,t.placement=L,t.reset=!0)}}const pp={name:"flip",enabled:!0,phase:"main",fn:cp,requiresIfExists:["offset"],data:{_skip:!1}};function ri(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function oi(e){return[Ne,Ve,Fe,Pe].some(function(t){return e[t]>=0})}function up(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,s=fn(t,{elementContext:"reference"}),l=fn(t,{altBoundary:!0}),c=ri(s,r),p=ri(l,o,i),u=oi(c),f=oi(p);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:p,isReferenceHidden:u,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":f})}const dp={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:up};function fp(e,t,n){var r=He(e),o=[Pe,Ne].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,s=i[0],l=i[1];return s=s||0,l=(l||0)*o,[Pe,Ve].indexOf(r)>=0?{x:l,y:s}:{x:s,y:l}}function hp(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,s=da.reduce(function(u,f){return u[f]=fp(f,t.rects,i),u},{}),l=s[t.placement],c=l.x,p=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=p),t.modifiersData[r]=s}const mp={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:hp};function gp(e){var t=e.state,n=e.name;t.modifiersData[n]=ya({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const bp={name:"popperOffsets",enabled:!0,phase:"read",fn:gp,data:{}};function vp(e){return e==="x"?"y":"x"}function yp(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!1:s,c=n.boundary,p=n.rootBoundary,u=n.altBoundary,f=n.padding,d=n.tether,g=d===void 0?!0:d,y=n.tetherOffset,b=y===void 0?0:y,h=fn(t,{boundary:c,rootBoundary:p,padding:f,altBoundary:u}),E=He(t.placement),I=Lt(t.placement),w=!I,x=Jr(E),m=vp(x),C=t.modifiersData.popperOffsets,N=t.rects.reference,F=t.rects.popper,L=typeof b=="function"?b(Object.assign({},t.rects,{placement:t.placement})):b,V=typeof L=="number"?{mainAxis:L,altAxis:L}:Object.assign({mainAxis:0,altAxis:0},L),S=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,$={x:0,y:0};if(C){if(i){var M,B=x==="y"?Ne:Pe,D=x==="y"?Fe:Ve,j=x==="y"?"height":"width",z=C[x],ee=z+h[B],Q=z-h[D],O=g?-F[j]/2:0,A=I===At?N[j]:F[j],q=I===At?-F[j]:-N[j],G=t.elements.arrow,U=g&&G?Kr(G):{width:0,height:0},H=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:ma(),X=H[B],Y=H[D],W=sn(0,N[j],U[j]),K=w?N[j]/2-O-W-X-V.mainAxis:A-W-X-V.mainAxis,J=w?-N[j]/2+O+W+Y+V.mainAxis:q+W+Y+V.mainAxis,oe=t.elements.arrow&&yn(t.elements.arrow),_=oe?x==="y"?oe.clientTop||0:oe.clientLeft||0:0,Z=(M=S==null?void 0:S[x])!=null?M:0,R=z+K-Z-_,ie=z+J-Z,we=sn(g?Ln(ee,R):ee,z,g?vt(Q,ie):Q);C[x]=we,$[x]=we-z}if(l){var Oe,ve=x==="x"?Ne:Pe,pt=x==="x"?Fe:Ve,Ce=C[m],Ge=m==="y"?"height":"width",Me=Ce+h[ve],Ke=Ce-h[pt],xe=[Ne,Pe].indexOf(E)!==-1,Ot=(Oe=S==null?void 0:S[m])!=null?Oe:0,ut=xe?Me:Ce-N[Ge]-F[Ge]-Ot+V.altAxis,zt=xe?Ce+N[Ge]+F[Ge]-Ot-V.altAxis:Ke,kn=g&&xe?Uc(ut,Ce,zt):sn(g?ut:Me,Ce,g?zt:Ke);C[m]=kn,$[m]=kn-Ce}t.modifiersData[r]=$}}const wp={name:"preventOverflow",enabled:!0,phase:"main",fn:yp,requiresIfExists:["offset"]};function xp(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Ep(e){return e===_e(e)||!Be(e)?Zr(e):xp(e)}function kp(e){var t=e.getBoundingClientRect(),n=Dt(t.width)/e.offsetWidth||1,r=Dt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Tp(e,t,n){n===void 0&&(n=!1);var r=Be(t),o=Be(t)&&kp(t),i=lt(t),s=Bt(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((Xe(t)!=="body"||eo(i))&&(l=Ep(t)),Be(t)?(c=Bt(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):i&&(c.x=Qr(i))),{x:s.left+l.scrollLeft-c.x,y:s.top+l.scrollTop-c.y,width:s.width,height:s.height}}function Op(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var s=[].concat(i.requires||[],i.requiresIfExists||[]);s.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function Cp(e){var t=Op(e);return Dc.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Sp(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Np(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var ii={placement:"bottom",modifiers:[],strategy:"absolute"};function ai(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Pp(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?ii:o;return function(l,c,p){p===void 0&&(p=i);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},ii,i),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},f=[],d=!1,g={state:u,setOptions:function(E){var I=typeof E=="function"?E(u.options):E;b(),u.options=Object.assign({},i,u.options,I),u.scrollParents={reference:Et(l)?ln(l):l.contextElement?ln(l.contextElement):[],popper:ln(c)};var w=Cp(Np([].concat(r,u.options.modifiers)));return u.orderedModifiers=w.filter(function(x){return x.enabled}),y(),g.update()},forceUpdate:function(){if(!d){var E=u.elements,I=E.reference,w=E.popper;if(ai(I,w)){u.rects={reference:Tp(I,yn(w),u.options.strategy==="fixed"),popper:Kr(w)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(V){return u.modifiersData[V.name]=Object.assign({},V.data)});for(var x=0;x<u.orderedModifiers.length;x++){if(u.reset===!0){u.reset=!1,x=-1;continue}var m=u.orderedModifiers[x],C=m.fn,N=m.options,F=N===void 0?{}:N,L=m.name;typeof C=="function"&&(u=C({state:u,options:F,name:L,instance:g})||u)}}}},update:Sp(function(){return new Promise(function(h){g.forceUpdate(),h(u)})}),destroy:function(){b(),d=!0}};if(!ai(l,c))return g;g.setOptions(p).then(function(h){!d&&p.onFirstUpdate&&p.onFirstUpdate(h)});function y(){u.orderedModifiers.forEach(function(h){var E=h.name,I=h.options,w=I===void 0?{}:I,x=h.effect;if(typeof x=="function"){var m=x({state:u,name:E,instance:g,options:w}),C=function(){};f.push(m||C)}})}function b(){f.forEach(function(h){return h()}),f=[]}return g}}var Rp=[Qc,bp,Jc,Fc,mp,pp,wp,Xc,dp],Mp=Pp({defaultModifiers:Rp});const wa="Popper";function $p(e){return pa(wa,e)}cc(wa,["root"]);const jp=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Ip=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function _p(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function Fn(e){return typeof e=="function"?e():e}function Gn(e){return e.nodeType!==void 0}function Ap(e){return!Gn(e)}const Dp=()=>nt({root:["root"]},rc($p)),Bp={},Lp=k.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:s,disablePortal:l,modifiers:c,open:p,placement:u,popperOptions:f,popperRef:d,slotProps:g={},slots:y={},TransitionProps:b}=t,h=de(t,jp),E=k.useRef(null),I=Le(E,n),w=k.useRef(null),x=Le(w,d),m=k.useRef(x);wt(()=>{m.current=x},[x]),k.useImperativeHandle(d,()=>w.current,[]);const C=_p(u,s),[N,F]=k.useState(C),[L,V]=k.useState(Fn(o));k.useEffect(()=>{w.current&&w.current.forceUpdate()}),k.useEffect(()=>{o&&V(Fn(o))},[o]),wt(()=>{if(!L||!p)return;const D=ee=>{F(ee.placement)};if(process.env.NODE_ENV!=="production"&&L&&Gn(L)&&L.nodeType===1){const ee=L.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ee.top===0&&ee.left===0&&ee.right===0&&ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let j=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ee})=>{D(ee)}}];c!=null&&(j=j.concat(c)),f&&f.modifiers!=null&&(j=j.concat(f.modifiers));const z=Mp(L,E.current,T({placement:C},f,{modifiers:j}));return m.current(z),()=>{z.destroy(),m.current(null)}},[L,l,c,p,f,C]);const S={placement:N};b!==null&&(S.TransitionProps=b);const $=Dp(),M=(r=y.root)!=null?r:"div",B=xt({elementType:M,externalSlotProps:g.root,externalForwardedProps:h,additionalProps:{role:"tooltip",ref:I},ownerState:t,className:$.root});return v.jsx(M,T({},B,{children:typeof i=="function"?i(S):i}))}),xa=k.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:s="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:p,open:u,placement:f="bottom",popperOptions:d=Bp,popperRef:g,style:y,transition:b=!1,slotProps:h={},slots:E={}}=t,I=de(t,Ip),[w,x]=k.useState(!0),m=()=>{x(!1)},C=()=>{x(!0)};if(!c&&!u&&(!b||w))return null;let N;if(i)N=i;else if(r){const V=Fn(r);N=V&&Gn(V)?ke(V).body:ke(null).body}const F=!u&&c&&(!b||w)?"none":void 0,L=b?{in:u,onEnter:m,onExited:C}:void 0;return v.jsx(un,{disablePortal:l,container:N,children:v.jsx(Lp,T({anchorEl:r,direction:s,disablePortal:l,modifiers:p,ref:n,open:b?!w:u,placement:f,popperOptions:d,popperRef:g,slotProps:h,slots:E},I,{style:T({position:"fixed",top:0,left:0,display:F},y),TransitionProps:L,children:o}))})});process.env.NODE_ENV!=="production"&&(xa.propTypes={anchorEl:Vt(a.oneOfType([Qe,a.object,a.func]),e=>{if(e.open){const t=Fn(e.anchorEl);if(t&&Gn(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Ap(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:a.oneOfType([a.node,a.func]),container:a.oneOfType([Qe,a.func]),direction:a.oneOf(["ltr","rtl"]),disablePortal:a.bool,keepMounted:a.bool,modifiers:a.arrayOf(a.shape({data:a.object,effect:a.func,enabled:a.bool,fn:a.func,name:a.any,options:a.object,phase:a.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:a.arrayOf(a.string),requiresIfExists:a.arrayOf(a.string)})),open:a.bool.isRequired,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:a.shape({modifiers:a.array,onFirstUpdate:a.func,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:a.oneOf(["absolute","fixed"])}),popperRef:Xr,slotProps:a.shape({root:a.oneOfType([a.func,a.object])}),slots:a.shape({root:a.elementType}),transition:a.bool});const Fp=["values","unit","step"],Vp=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>T({},n,{[r.key]:r.val}),{})};function zp(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=de(e,Fp),i=Vp(t),s=Object.keys(i);function l(d){return`@media (min-width:${typeof t[d]=="number"?t[d]:d}${n})`}function c(d){return`@media (max-width:${(typeof t[d]=="number"?t[d]:d)-r/100}${n})`}function p(d,g){const y=s.indexOf(g);return`@media (min-width:${typeof t[d]=="number"?t[d]:d}${n}) and (max-width:${(y!==-1&&typeof t[s[y]]=="number"?t[s[y]]:g)-r/100}${n})`}function u(d){return s.indexOf(d)+1<s.length?p(d,s[s.indexOf(d)+1]):l(d)}function f(d){const g=s.indexOf(d);return g===0?l(s[1]):g===s.length-1?c(s[g]):p(d,s[s.indexOf(d)+1]).replace("@media","@media not all and")}return T({keys:s,values:i,up:l,down:c,between:p,only:u,not:f,unit:n},o)}const Up={borderRadius:4},qp=Up,Hp=process.env.NODE_ENV!=="production"?a.oneOfType([a.number,a.string,a.object,a.array]):{},ct=Hp;function cn(e,t){return t?Ze(e,t,{clone:!1}):e}const to={xs:0,sm:600,md:900,lg:1200,xl:1536},si={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${to[e]}px)`};function tt(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||si;return t.reduce((s,l,c)=>(s[i.up(i.keys[c])]=n(t[c]),s),{})}if(typeof t=="object"){const i=r.breakpoints||si;return Object.keys(t).reduce((s,l)=>{if(Object.keys(i.values||to).indexOf(l)!==-1){const c=i.up(l);s[c]=n(t[l],l)}else{const c=l;s[c]=t[c]}return s},{})}return n(t)}function Wp(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function Xp(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Kn(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function Vn(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Kn(e,n)||r,t&&(o=t(o,r,e)),o}function ye(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=s=>{if(s[t]==null)return null;const l=s[t],c=s.theme,p=Kn(c,r)||{};return tt(s,l,f=>{let d=Vn(p,o,f);return f===d&&typeof f=="string"&&(d=Vn(p,o,`${t}${f==="default"?"":We(f)}`,f)),n===!1?d:{[n]:d}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:ct}:{},i.filterProps=[t],i}function Yp(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const Gp={m:"margin",p:"padding"},Kp={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},li={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Jp=Yp(e=>{if(e.length>2)if(li[e])e=li[e];else return[e];const[t,n]=e.split(""),r=Gp[t],o=Kp[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),Jn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Zn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Zp=[...Jn,...Zn];function wn(e,t,n,r){var o;const i=(o=Kn(e,t,!1))!=null?o:n;return typeof i=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),i*s):Array.isArray(i)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>i.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${s} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[s]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Ea(e){return wn(e,"spacing",8,"spacing")}function xn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Qp(e,t){return n=>e.reduce((r,o)=>(r[o]=xn(t,n),r),{})}function eu(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=Jp(n),i=Qp(o,r),s=e[n];return tt(e,s,i)}function ka(e,t){const n=Ea(e.theme);return Object.keys(e).map(r=>eu(e,t,r,n)).reduce(cn,{})}function me(e){return ka(e,Jn)}me.propTypes=process.env.NODE_ENV!=="production"?Jn.reduce((e,t)=>(e[t]=ct,e),{}):{};me.filterProps=Jn;function ge(e){return ka(e,Zn)}ge.propTypes=process.env.NODE_ENV!=="production"?Zn.reduce((e,t)=>(e[t]=ct,e),{}):{};ge.filterProps=Zn;process.env.NODE_ENV!=="production"&&Zp.reduce((e,t)=>(e[t]=ct,e),{});function tu(e=8){if(e.mui)return e;const t=Ea({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const s=t(i);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function Qn(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?cn(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function De(e){return typeof e!="number"?e:`${e}px solid`}function ze(e,t){return ye({prop:e,themeKey:"borders",transform:t})}const nu=ze("border",De),ru=ze("borderTop",De),ou=ze("borderRight",De),iu=ze("borderBottom",De),au=ze("borderLeft",De),su=ze("borderColor"),lu=ze("borderTopColor"),cu=ze("borderRightColor"),pu=ze("borderBottomColor"),uu=ze("borderLeftColor"),du=ze("outline",De),fu=ze("outlineColor"),er=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=wn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:xn(t,r)});return tt(e,e.borderRadius,n)}return null};er.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:ct}:{};er.filterProps=["borderRadius"];Qn(nu,ru,ou,iu,au,su,lu,cu,pu,uu,er,du,fu);const tr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=wn(e.theme,"spacing",8,"gap"),n=r=>({gap:xn(t,r)});return tt(e,e.gap,n)}return null};tr.propTypes=process.env.NODE_ENV!=="production"?{gap:ct}:{};tr.filterProps=["gap"];const nr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=wn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:xn(t,r)});return tt(e,e.columnGap,n)}return null};nr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:ct}:{};nr.filterProps=["columnGap"];const rr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=wn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:xn(t,r)});return tt(e,e.rowGap,n)}return null};rr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:ct}:{};rr.filterProps=["rowGap"];const hu=ye({prop:"gridColumn"}),mu=ye({prop:"gridRow"}),gu=ye({prop:"gridAutoFlow"}),bu=ye({prop:"gridAutoColumns"}),vu=ye({prop:"gridAutoRows"}),yu=ye({prop:"gridTemplateColumns"}),wu=ye({prop:"gridTemplateRows"}),xu=ye({prop:"gridTemplateAreas"}),Eu=ye({prop:"gridArea"});Qn(tr,nr,rr,hu,mu,gu,bu,vu,yu,wu,xu,Eu);function jt(e,t){return t==="grey"?t:e}const ku=ye({prop:"color",themeKey:"palette",transform:jt}),Tu=ye({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:jt}),Ou=ye({prop:"backgroundColor",themeKey:"palette",transform:jt});Qn(ku,Tu,Ou);function Ie(e){return e<=1&&e!==0?`${e*100}%`:e}const Cu=ye({prop:"width",transform:Ie}),no=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||to[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:Ie(n)}};return tt(e,e.maxWidth,t)}return null};no.filterProps=["maxWidth"];const Su=ye({prop:"minWidth",transform:Ie}),Nu=ye({prop:"height",transform:Ie}),Pu=ye({prop:"maxHeight",transform:Ie}),Ru=ye({prop:"minHeight",transform:Ie});ye({prop:"size",cssProperty:"width",transform:Ie});ye({prop:"size",cssProperty:"height",transform:Ie});const Mu=ye({prop:"boxSizing"});Qn(Cu,no,Su,Nu,Pu,Ru,Mu);const $u={border:{themeKey:"borders",transform:De},borderTop:{themeKey:"borders",transform:De},borderRight:{themeKey:"borders",transform:De},borderBottom:{themeKey:"borders",transform:De},borderLeft:{themeKey:"borders",transform:De},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:De},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:er},color:{themeKey:"palette",transform:jt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:jt},backgroundColor:{themeKey:"palette",transform:jt},p:{style:ge},pt:{style:ge},pr:{style:ge},pb:{style:ge},pl:{style:ge},px:{style:ge},py:{style:ge},padding:{style:ge},paddingTop:{style:ge},paddingRight:{style:ge},paddingBottom:{style:ge},paddingLeft:{style:ge},paddingX:{style:ge},paddingY:{style:ge},paddingInline:{style:ge},paddingInlineStart:{style:ge},paddingInlineEnd:{style:ge},paddingBlock:{style:ge},paddingBlockStart:{style:ge},paddingBlockEnd:{style:ge},m:{style:me},mt:{style:me},mr:{style:me},mb:{style:me},ml:{style:me},mx:{style:me},my:{style:me},margin:{style:me},marginTop:{style:me},marginRight:{style:me},marginBottom:{style:me},marginLeft:{style:me},marginX:{style:me},marginY:{style:me},marginInline:{style:me},marginInlineStart:{style:me},marginInlineEnd:{style:me},marginBlock:{style:me},marginBlockStart:{style:me},marginBlockEnd:{style:me},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:tr},rowGap:{style:rr},columnGap:{style:nr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ie},maxWidth:{style:no},minWidth:{transform:Ie},height:{transform:Ie},maxHeight:{transform:Ie},minHeight:{transform:Ie},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},ro=$u;function ju(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Iu(e,t){return typeof e=="function"?e(t):e}function _u(){function e(n,r,o,i){const s={[n]:r,theme:o},l=i[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:p,transform:u,style:f}=l;if(r==null)return null;if(p==="typography"&&r==="inherit")return{[n]:r};const d=Kn(o,p)||{};return f?f(s):tt(s,r,y=>{let b=Vn(d,u,y);return y===b&&typeof y=="string"&&(b=Vn(d,u,`${n}${y==="default"?"":We(y)}`,y)),c===!1?b:{[c]:b}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const s=(r=i.unstable_sxConfig)!=null?r:ro;function l(c){let p=c;if(typeof c=="function")p=c(i);else if(typeof c!="object")return c;if(!p)return null;const u=Wp(i.breakpoints),f=Object.keys(u);let d=u;return Object.keys(p).forEach(g=>{const y=Iu(p[g],i);if(y!=null)if(typeof y=="object")if(s[g])d=cn(d,e(g,y,i,s));else{const b=tt({theme:i},y,h=>({[g]:h}));ju(b,y)?d[g]=t({sx:y,theme:i}):d=cn(d,b)}else d=cn(d,e(g,y,i,s))}),Xp(f,d)}return Array.isArray(o)?o.map(l):l(o)}return t}const Ta=_u();Ta.filterProps=["sx"];const oo=Ta;function Au(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Du=["breakpoints","palette","spacing","shape"];function io(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,s=de(e,Du),l=zp(n),c=tu(o);let p=Ze({breakpoints:l,direction:"ltr",components:{},palette:T({mode:"light"},r),spacing:c,shape:T({},qp,i)},s);return p.applyStyles=Au,p=t.reduce((u,f)=>Ze(u,f),p),p.unstable_sxConfig=T({},ro,s==null?void 0:s.unstable_sxConfig),p.unstable_sx=function(f){return oo({sx:f,theme:this})},p}function Bu(e){return Object.keys(e).length===0}function Oa(e=null){const t=k.useContext(Or.ThemeContext);return!t||Bu(t)?e:t}const Lu=io();function Ca(e=Lu){return Oa(e)}const Fu=["ownerState"],Vu=["variants"],zu=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Uu(e){return Object.keys(e).length===0}function qu(e){return typeof e=="string"&&e.charCodeAt(0)>96}function $n(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Hu=io(),ci=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Nn({defaultTheme:e,theme:t,themeId:n}){return Uu(t)?e:t[n]||t}function Wu(e){return e?(t,n)=>n[e]:null}function jn(e,t){let{ownerState:n}=t,r=de(t,Fu);const o=typeof e=="function"?e(T({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>jn(i,T({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let l=de(o,Vu);return i.forEach(c=>{let p=!0;typeof c.props=="function"?p=c.props(T({ownerState:n},r,n)):Object.keys(c.props).forEach(u=>{(n==null?void 0:n[u])!==c.props[u]&&r[u]!==c.props[u]&&(p=!1)}),p&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(T({ownerState:n},r,n)):c.style))}),l}return o}function Xu(e={}){const{themeId:t,defaultTheme:n=Hu,rootShouldForwardProp:r=$n,slotShouldForwardProp:o=$n}=e,i=s=>oo(T({},s,{theme:Nn(T({},s,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(s,l={})=>{Or.internal_processStyles(s,m=>m.filter(C=>!(C!=null&&C.__mui_systemSx)));const{name:c,slot:p,skipVariantsResolver:u,skipSx:f,overridesResolver:d=Wu(ci(p))}=l,g=de(l,zu),y=u!==void 0?u:p&&p!=="Root"&&p!=="root"||!1,b=f||!1;let h;process.env.NODE_ENV!=="production"&&c&&(h=`${c}-${ci(p||"Root")}`);let E=$n;p==="Root"||p==="root"?E=r:p?E=o:qu(s)&&(E=void 0);const I=Or(s,T({shouldForwardProp:E,label:h},g)),w=m=>typeof m=="function"&&m.__emotion_real!==m||gt(m)?C=>jn(m,T({},C,{theme:Nn({theme:C.theme,defaultTheme:n,themeId:t})})):m,x=(m,...C)=>{let N=w(m);const F=C?C.map(w):[];c&&d&&F.push(S=>{const $=Nn(T({},S,{defaultTheme:n,themeId:t}));if(!$.components||!$.components[c]||!$.components[c].styleOverrides)return null;const M=$.components[c].styleOverrides,B={};return Object.entries(M).forEach(([D,j])=>{B[D]=jn(j,T({},S,{theme:$}))}),d(S,B)}),c&&!y&&F.push(S=>{var $;const M=Nn(T({},S,{defaultTheme:n,themeId:t})),B=M==null||($=M.components)==null||($=$[c])==null?void 0:$.variants;return jn({variants:B},T({},S,{theme:M}))}),b||F.push(i);const L=F.length-C.length;if(Array.isArray(m)&&L>0){const S=new Array(L).fill("");N=[...m,...S],N.raw=[...m.raw,...S]}const V=I(N,...F);if(process.env.NODE_ENV!=="production"){let S;c&&(S=`${c}${We(p||"")}`),S===void 0&&(S=`Styled(${Ml(s)})`),V.displayName=S}return s.muiName&&(V.muiName=s.muiName),V};return I.withConfig&&(x.withConfig=I.withConfig),x}}function Yu(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:oa(t.components[n].defaultProps,r)}function Gu({props:e,name:t,defaultTheme:n,themeId:r}){let o=Ca(n);return r&&(o=o[r]||o),Yu({theme:o,name:t,props:e})}function ao(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),ec(e,t,n)}function Ku(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function kt(e){if(e.type)return e;if(e.charAt(0)==="#")return kt(Ku(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:It(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:It(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function or(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function Ju(e){e=kt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),s=(p,u=(p+n/30)%12)=>o-i*Math.max(Math.min(u-3,9-u,1),-1);let l="rgb";const c=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),or({type:l,values:c})}function pi(e){e=kt(e);let t=e.type==="hsl"||e.type==="hsla"?kt(Ju(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function ui(e,t){const n=pi(e),r=pi(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function zn(e,t){return e=kt(e),t=ao(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,or(e)}function Zu(e,t){if(e=kt(e),t=ao(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return or(e)}function Qu(e,t){if(e=kt(e),t=ao(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return or(e)}function ed(e,t){return T({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const td={black:"#000",white:"#fff"},hn=td,nd={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},rd=nd,od={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ct=od,id={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},St=id,ad={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Kt=ad,sd={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Nt=sd,ld={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Pt=ld,cd={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Rt=cd,pd=["mode","contrastThreshold","tonalOffset"],di={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:hn.white,default:hn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},vr={text:{primary:hn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:hn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function fi(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=Qu(e.main,o):t==="dark"&&(e.dark=Zu(e.main,i)))}function ud(e="light"){return e==="dark"?{main:Nt[200],light:Nt[50],dark:Nt[400]}:{main:Nt[700],light:Nt[400],dark:Nt[800]}}function dd(e="light"){return e==="dark"?{main:Ct[200],light:Ct[50],dark:Ct[400]}:{main:Ct[500],light:Ct[300],dark:Ct[700]}}function fd(e="light"){return e==="dark"?{main:St[500],light:St[300],dark:St[700]}:{main:St[700],light:St[400],dark:St[800]}}function hd(e="light"){return e==="dark"?{main:Pt[400],light:Pt[300],dark:Pt[700]}:{main:Pt[700],light:Pt[500],dark:Pt[900]}}function md(e="light"){return e==="dark"?{main:Rt[400],light:Rt[300],dark:Rt[700]}:{main:Rt[800],light:Rt[500],dark:Rt[900]}}function gd(e="light"){return e==="dark"?{main:Kt[400],light:Kt[300],dark:Kt[700]}:{main:"#ed6c02",light:Kt[500],dark:Kt[900]}}function bd(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=de(e,pd),i=e.primary||ud(t),s=e.secondary||dd(t),l=e.error||fd(t),c=e.info||hd(t),p=e.success||md(t),u=e.warning||gd(t);function f(b){const h=ui(b,vr.text.primary)>=n?vr.text.primary:di.text.primary;if(process.env.NODE_ENV!=="production"){const E=ui(b,h);E<3&&console.error([`MUI: The contrast ratio of ${E}:1 for ${h} on ${b}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return h}const d=({color:b,name:h,mainShade:E=500,lightShade:I=300,darkShade:w=700})=>{if(b=T({},b),!b.main&&b[E]&&(b.main=b[E]),!b.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.`:It(11,h?` (${h})`:"",E));if(typeof b.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(b.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:It(12,h?` (${h})`:"",JSON.stringify(b.main)));return fi(b,"light",I,r),fi(b,"dark",w,r),b.contrastText||(b.contrastText=f(b.main)),b},g={dark:vr,light:di};return process.env.NODE_ENV!=="production"&&(g[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),Ze(T({common:T({},hn),mode:t,primary:d({color:i,name:"primary"}),secondary:d({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:d({color:l,name:"error"}),warning:d({color:u,name:"warning"}),info:d({color:c,name:"info"}),success:d({color:p,name:"success"}),grey:rd,contrastThreshold:n,getContrastText:f,augmentColor:d,tonalOffset:r},g[t]),o)}const vd=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function yd(e){return Math.round(e*1e5)/1e5}const hi={textTransform:"uppercase"},mi='"Roboto", "Helvetica", "Arial", sans-serif';function wd(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=mi,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:s=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:p=16,allVariants:u,pxToRem:f}=n,d=de(n,vd);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof p!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const g=o/14,y=f||(E=>`${E/p*g}rem`),b=(E,I,w,x,m)=>T({fontFamily:r,fontWeight:E,fontSize:y(I),lineHeight:w},r===mi?{letterSpacing:`${yd(x/I)}em`}:{},m,u),h={h1:b(i,96,1.167,-1.5),h2:b(i,60,1.2,-.5),h3:b(s,48,1.167,0),h4:b(s,34,1.235,.25),h5:b(s,24,1.334,0),h6:b(l,20,1.6,.15),subtitle1:b(s,16,1.75,.15),subtitle2:b(l,14,1.57,.1),body1:b(s,16,1.5,.15),body2:b(s,14,1.43,.15),button:b(l,14,1.75,.4,hi),caption:b(s,12,1.66,.4),overline:b(s,12,2.66,1,hi),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return Ze(T({htmlFontSize:p,pxToRem:y,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:s,fontWeightMedium:l,fontWeightBold:c},h),d,{clone:!1})}const xd=.2,Ed=.14,kd=.12;function he(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${xd})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Ed})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${kd})`].join(",")}const Td=["none",he(0,2,1,-1,0,1,1,0,0,1,3,0),he(0,3,1,-2,0,2,2,0,0,1,5,0),he(0,3,3,-2,0,3,4,0,0,1,8,0),he(0,2,4,-1,0,4,5,0,0,1,10,0),he(0,3,5,-1,0,5,8,0,0,1,14,0),he(0,3,5,-1,0,6,10,0,0,1,18,0),he(0,4,5,-2,0,7,10,1,0,2,16,1),he(0,5,5,-3,0,8,10,1,0,3,14,2),he(0,5,6,-3,0,9,12,1,0,3,16,2),he(0,6,6,-3,0,10,14,1,0,4,18,3),he(0,6,7,-4,0,11,15,1,0,4,20,3),he(0,7,8,-4,0,12,17,2,0,5,22,4),he(0,7,8,-4,0,13,19,2,0,5,24,4),he(0,7,9,-4,0,14,21,2,0,5,26,4),he(0,8,9,-5,0,15,22,2,0,6,28,5),he(0,8,10,-5,0,16,24,2,0,6,30,5),he(0,8,11,-5,0,17,26,2,0,6,32,5),he(0,9,11,-5,0,18,28,2,0,7,34,6),he(0,9,12,-6,0,19,29,2,0,7,36,6),he(0,10,13,-6,0,20,31,3,0,8,38,7),he(0,10,13,-6,0,21,33,3,0,8,40,7),he(0,10,14,-6,0,22,35,3,0,8,42,7),he(0,11,14,-7,0,23,36,3,0,9,44,8),he(0,11,15,-7,0,24,38,3,0,9,46,8)],Od=Td,Cd=["duration","easing","delay"],Sd={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Nd={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function gi(e){return`${Math.round(e)}ms`}function Pd(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Rd(e){const t=T({},Sd,e.easing),n=T({},Nd,e.duration);return T({getAutoHeightDuration:Pd,create:(o=["all"],i={})=>{const{duration:s=n.standard,easing:l=t.easeInOut,delay:c=0}=i,p=de(i,Cd);if(process.env.NODE_ENV!=="production"){const u=d=>typeof d=="string",f=d=>!isNaN(parseFloat(d));!u(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!f(s)&&!u(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),u(l)||console.error('MUI: Argument "easing" must be a string.'),!f(c)&&!u(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(p).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(p).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(u=>`${u} ${typeof s=="string"?s:gi(s)} ${l} ${typeof c=="string"?c:gi(c)}`).join(",")}},e,{easing:t,duration:n})}const Md={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},$d=Md,jd=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Id(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,s=de(e,jd);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":It(18));const l=bd(r),c=io(e);let p=Ze(c,{mixins:ed(c.breakpoints,n),palette:l,shadows:Od.slice(),typography:wd(l,i),transitions:Rd(o),zIndex:T({},$d)});if(p=Ze(p,s),p=t.reduce((u,f)=>Ze(u,f),p),process.env.NODE_ENV!=="production"){const u=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],f=(d,g)=>{let y;for(y in d){const b=d[y];if(u.indexOf(y)!==-1&&Object.keys(b).length>0){if(process.env.NODE_ENV!=="production"){const h=Ye("",y);console.error([`MUI: The \`${g}\` component increases the CSS specificity of the \`${y}\` internal state.`,"You can not override it like this: ",JSON.stringify(d,null,2),"",`Instead, you need to use the '&.${h}' syntax:`,JSON.stringify({root:{[`&.${h}`]:b}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}d[y]={}}}};Object.keys(p.components).forEach(d=>{const g=p.components[d].styleOverrides;g&&d.indexOf("Mui")===0&&f(g,d)})}return p.unstable_sxConfig=T({},ro,s==null?void 0:s.unstable_sxConfig),p.unstable_sx=function(f){return oo({sx:f,theme:this})},p}const _d=Id(),so=_d,lo="$$material",Sa=e=>$n(e)&&e!=="classes",Ad=Xu({themeId:lo,defaultTheme:so,rootShouldForwardProp:Sa}),Te=Ad;function En(){const e=Ca(so);return process.env.NODE_ENV!=="production"&&k.useDebugValue(e),e[lo]||e}function rt({props:e,name:t}){return Gu({props:e,name:t,defaultTheme:so,themeId:lo})}function Ir(e,t){return Ir=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},Ir(e,t)}function Dd(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Ir(e,t)}const bi={disabled:!1};var Bd=process.env.NODE_ENV!=="production"?a.oneOfType([a.number,a.shape({enter:a.number,exit:a.number,appear:a.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&a.oneOfType([a.string,a.shape({enter:a.string,exit:a.string,active:a.string}),a.shape({enter:a.string,enterDone:a.string,enterActive:a.string,exit:a.string,exitDone:a.string,exitActive:a.string})]);const Na=P.createContext(null);var Ld=function(t){return t.scrollTop},rn="unmounted",ft="exited",ht="entering",$t="entered",_r="exiting",ot=function(e){Dd(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var s=o,l=s&&!s.isMounting?r.enter:r.appear,c;return i.appearStatus=null,r.in?l?(c=ft,i.appearStatus=ht):c=$t:r.unmountOnExit||r.mountOnEnter?c=rn:c=ft,i.state={status:c},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var s=o.in;return s&&i.status===rn?{status:ft}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==ht&&s!==$t&&(i=ht):(s===ht||s===$t)&&(i=_r)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,s,l;return i=s=l=o,o!=null&&typeof o!="number"&&(i=o.exit,s=o.enter,l=o.appear!==void 0?o.appear:s),{exit:i,enter:s,appear:l}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===ht){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:Qt.findDOMNode(this);s&&Ld(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===ft&&this.setState({status:rn})},n.performEnter=function(o){var i=this,s=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[Qt.findDOMNode(this),l],p=c[0],u=c[1],f=this.getTimeouts(),d=l?f.appear:f.enter;if(!o&&!s||bi.disabled){this.safeSetState({status:$t},function(){i.props.onEntered(p)});return}this.props.onEnter(p,u),this.safeSetState({status:ht},function(){i.props.onEntering(p,u),i.onTransitionEnd(d,function(){i.safeSetState({status:$t},function(){i.props.onEntered(p,u)})})})},n.performExit=function(){var o=this,i=this.props.exit,s=this.getTimeouts(),l=this.props.nodeRef?void 0:Qt.findDOMNode(this);if(!i||bi.disabled){this.safeSetState({status:ft},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:_r},function(){o.props.onExiting(l),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:ft},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,s=!0;return this.nextCallback=function(l){s&&(s=!1,i.nextCallback=null,o(l))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var s=this.props.nodeRef?this.props.nodeRef.current:Qt.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!s||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],p=c[0],u=c[1];this.props.addEndListener(p,u)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===rn)return null;var i=this.props,s=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var l=de(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return P.createElement(Na.Provider,{value:null},typeof s=="function"?s(o,l):P.cloneElement(P.Children.only(s),l))},t}(P.Component);ot.contextType=Na;ot.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:a.shape({current:typeof Element>"u"?a.any:function(e,t,n,r,o,i){var s=e[t];return a.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:a.oneOfType([a.func.isRequired,a.element.isRequired]).isRequired,in:a.bool,mountOnEnter:a.bool,unmountOnExit:a.bool,appear:a.bool,enter:a.bool,exit:a.bool,timeout:function(t){var n=Bd;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:a.func,onEnter:a.func,onEntering:a.func,onEntered:a.func,onExit:a.func,onExiting:a.func,onExited:a.func}:{};function Mt(){}ot.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Mt,onEntering:Mt,onEntered:Mt,onExit:Mt,onExiting:Mt,onExited:Mt};ot.UNMOUNTED=rn;ot.EXITED=ft;ot.ENTERING=ht;ot.ENTERED=$t;ot.EXITING=_r;const Pa=ot,Ra=e=>e.scrollTop;function Un(e,t){var n,r;const{timeout:o,easing:i,style:s={}}=e;return{duration:(n=s.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:s.transitionDelay}}const Fd=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function Ar(e){return`scale(${e}, ${e**2})`}const Vd={entering:{opacity:1,transform:Ar(1)},entered:{opacity:1,transform:"none"}},yr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),co=k.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:s,in:l,onEnter:c,onEntered:p,onEntering:u,onExit:f,onExited:d,onExiting:g,style:y,timeout:b="auto",TransitionComponent:h=Pa}=t,E=de(t,Fd),I=tn(),w=k.useRef(),x=En(),m=k.useRef(null),C=Le(m,i.ref,n),N=D=>j=>{if(D){const z=m.current;j===void 0?D(z):D(z,j)}},F=N(u),L=N((D,j)=>{Ra(D);const{duration:z,delay:ee,easing:Q}=Un({style:y,timeout:b,easing:s},{mode:"enter"});let O;b==="auto"?(O=x.transitions.getAutoHeightDuration(D.clientHeight),w.current=O):O=z,D.style.transition=[x.transitions.create("opacity",{duration:O,delay:ee}),x.transitions.create("transform",{duration:yr?O:O*.666,delay:ee,easing:Q})].join(","),c&&c(D,j)}),V=N(p),S=N(g),$=N(D=>{const{duration:j,delay:z,easing:ee}=Un({style:y,timeout:b,easing:s},{mode:"exit"});let Q;b==="auto"?(Q=x.transitions.getAutoHeightDuration(D.clientHeight),w.current=Q):Q=j,D.style.transition=[x.transitions.create("opacity",{duration:Q,delay:z}),x.transitions.create("transform",{duration:yr?Q:Q*.666,delay:yr?z:z||Q*.333,easing:ee})].join(","),D.style.opacity=0,D.style.transform=Ar(.75),f&&f(D)}),M=N(d),B=D=>{b==="auto"&&I.start(w.current||0,D),r&&r(m.current,D)};return v.jsx(h,T({appear:o,in:l,nodeRef:m,onEnter:L,onEntered:V,onEntering:F,onExit:$,onExited:M,onExiting:S,addEndListener:B,timeout:b==="auto"?null:b},E,{children:(D,j)=>k.cloneElement(i,T({style:T({opacity:0,transform:Ar(.75),visibility:D==="exited"&&!l?"hidden":void 0},Vd[D],y,i.props.style),ref:C},j))}))});process.env.NODE_ENV!=="production"&&(co.propTypes={addEndListener:a.func,appear:a.bool,children:gn.isRequired,easing:a.oneOfType([a.shape({enter:a.string,exit:a.string}),a.string]),in:a.bool,onEnter:a.func,onEntered:a.func,onEntering:a.func,onExit:a.func,onExited:a.func,onExiting:a.func,style:a.object,timeout:a.oneOfType([a.oneOf(["auto"]),a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})])});co.muiSupportAuto=!0;const Dr=co,zd=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},vi=zd,Ud=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],qd=Te(xa,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ma=k.forwardRef(function(t,n){var r;const o=Oa(),i=rt({props:t,name:"MuiPopper"}),{anchorEl:s,component:l,components:c,componentsProps:p,container:u,disablePortal:f,keepMounted:d,modifiers:g,open:y,placement:b,popperOptions:h,popperRef:E,transition:I,slots:w,slotProps:x}=i,m=de(i,Ud),C=(r=w==null?void 0:w.root)!=null?r:c==null?void 0:c.Root,N=T({anchorEl:s,container:u,disablePortal:f,keepMounted:d,modifiers:g,open:y,placement:b,popperOptions:h,popperRef:E,transition:I},m);return v.jsx(qd,T({as:l,direction:o==null?void 0:o.direction,slots:{root:C},slotProps:x??p},N,{ref:n}))});process.env.NODE_ENV!=="production"&&(Ma.propTypes={anchorEl:a.oneOfType([Qe,a.object,a.func]),children:a.oneOfType([a.node,a.func]),component:a.elementType,components:a.shape({Root:a.elementType}),componentsProps:a.shape({root:a.oneOfType([a.func,a.object])}),container:a.oneOfType([Qe,a.func]),disablePortal:a.bool,keepMounted:a.bool,modifiers:a.arrayOf(a.shape({data:a.object,effect:a.func,enabled:a.bool,fn:a.func,name:a.any,options:a.object,phase:a.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:a.arrayOf(a.string),requiresIfExists:a.arrayOf(a.string)})),open:a.bool.isRequired,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:a.shape({modifiers:a.array,onFirstUpdate:a.func,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:a.oneOf(["absolute","fixed"])}),popperRef:Xr,slotProps:a.shape({root:a.oneOfType([a.func,a.object])}),slots:a.shape({root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),transition:a.bool});const $a=Ma;function Hd(e){return Ye("MuiTooltip",e)}const Wd=st("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),at=Wd,Xd=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Yd(e){return Math.round(e*1e5)/1e5}const Gd=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,s={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${We(i.split("-")[0])}`],arrow:["arrow"]};return nt(s,Hd,t)},Kd=Te($a,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>T({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${at.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${at.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${at.arrow}`]:T({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${at.arrow}`]:T({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Jd=Te("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${We(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>T({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:zn(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Yd(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${at.popper}[data-popper-placement*="left"] &`]:T({transformOrigin:"right center"},t.isRtl?T({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):T({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${at.popper}[data-popper-placement*="right"] &`]:T({transformOrigin:"left center"},t.isRtl?T({marginRight:"14px"},t.touch&&{marginRight:"24px"}):T({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${at.popper}[data-popper-placement*="top"] &`]:T({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${at.popper}[data-popper-placement*="bottom"] &`]:T({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Zd=Te("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:zn(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Pn=!1;const yi=new bn;let Jt={x:0,y:0};function Rn(e,t){return n=>{t&&t(n),e(n)}}const ja=k.forwardRef(function(t,n){var r,o,i,s,l,c,p,u,f,d,g,y,b,h,E,I,w,x,m;const C=rt({props:t,name:"MuiTooltip"}),{arrow:N=!1,children:F,components:L={},componentsProps:V={},describeChild:S=!1,disableFocusListener:$=!1,disableHoverListener:M=!1,disableInteractive:B=!1,disableTouchListener:D=!1,enterDelay:j=100,enterNextDelay:z=0,enterTouchDelay:ee=700,followCursor:Q=!1,id:O,leaveDelay:A=0,leaveTouchDelay:q=1500,onClose:G,onOpen:U,open:H,placement:X="bottom",PopperComponent:Y,PopperProps:W={},slotProps:K={},slots:J={},title:oe,TransitionComponent:_=Dr,TransitionProps:Z}=C,R=de(C,Xd),ie=k.isValidElement(F)?F:v.jsx("span",{children:F}),we=En(),Oe=we.direction==="rtl",[ve,pt]=k.useState(),[Ce,Ge]=k.useState(null),Me=k.useRef(!1),Ke=B||Q,xe=tn(),Ot=tn(),ut=tn(),zt=tn(),[kn,mo]=Zi({controlled:H,default:!1,name:"Tooltip",state:"open"});let Je=kn;if(process.env.NODE_ENV!=="production"){const{current:te}=k.useRef(H!==void 0);k.useEffect(()=>{ve&&ve.disabled&&!te&&oe!==""&&ve.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[oe,ve,te])}const ir=Ji(O),Ut=k.useRef(),Tn=pn(()=>{Ut.current!==void 0&&(document.body.style.WebkitUserSelect=Ut.current,Ut.current=void 0),zt.clear()});k.useEffect(()=>Tn,[Tn]);const go=te=>{yi.clear(),Pn=!0,mo(!0),U&&!Je&&U(te)},On=pn(te=>{yi.start(800+A,()=>{Pn=!1}),mo(!1),G&&Je&&G(te),xe.start(we.transitions.duration.shortest,()=>{Me.current=!1})}),ar=te=>{Me.current&&te.type!=="touchstart"||(ve&&ve.removeAttribute("title"),Ot.clear(),ut.clear(),j||Pn&&z?Ot.start(Pn?z:j,()=>{go(te)}):go(te))},bo=te=>{Ot.clear(),ut.start(A,()=>{On(te)})},{isFocusVisibleRef:vo,onBlur:ms,onFocus:gs,ref:bs}=Qi(),[,yo]=k.useState(!1),wo=te=>{ms(te),vo.current===!1&&(yo(!1),bo(te))},xo=te=>{ve||pt(te.currentTarget),gs(te),vo.current===!0&&(yo(!0),ar(te))},Eo=te=>{Me.current=!0;const $e=ie.props;$e.onTouchStart&&$e.onTouchStart(te)},ko=ar,To=bo,vs=te=>{Eo(te),ut.clear(),xe.clear(),Tn(),Ut.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",zt.start(ee,()=>{document.body.style.WebkitUserSelect=Ut.current,ar(te)})},ys=te=>{ie.props.onTouchEnd&&ie.props.onTouchEnd(te),Tn(),ut.start(q,()=>{On(te)})};k.useEffect(()=>{if(!Je)return;function te($e){($e.key==="Escape"||$e.key==="Esc")&&On($e)}return document.addEventListener("keydown",te),()=>{document.removeEventListener("keydown",te)}},[On,Je]);const ws=Le(ie.ref,bs,pt,n);!oe&&oe!==0&&(Je=!1);const sr=k.useRef(),xs=te=>{const $e=ie.props;$e.onMouseMove&&$e.onMouseMove(te),Jt={x:te.clientX,y:te.clientY},sr.current&&sr.current.update()},qt={},lr=typeof oe=="string";S?(qt.title=!Je&&lr&&!M?oe:null,qt["aria-describedby"]=Je?ir:null):(qt["aria-label"]=lr?oe:null,qt["aria-labelledby"]=Je&&!lr?ir:null);const Ae=T({},qt,R,ie.props,{className:Ee(R.className,ie.props.className),onTouchStart:Eo,ref:ws},Q?{onMouseMove:xs}:{});process.env.NODE_ENV!=="production"&&(Ae["data-mui-internal-clone-element"]=!0,k.useEffect(()=>{ve&&!ve.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[ve]));const Ht={};D||(Ae.onTouchStart=vs,Ae.onTouchEnd=ys),M||(Ae.onMouseOver=Rn(ko,Ae.onMouseOver),Ae.onMouseLeave=Rn(To,Ae.onMouseLeave),Ke||(Ht.onMouseOver=ko,Ht.onMouseLeave=To)),$||(Ae.onFocus=Rn(xo,Ae.onFocus),Ae.onBlur=Rn(wo,Ae.onBlur),Ke||(Ht.onFocus=xo,Ht.onBlur=wo)),process.env.NODE_ENV!=="production"&&ie.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ie.props.title}\` or the Tooltip component.`].join(`
`));const Es=k.useMemo(()=>{var te;let $e=[{name:"arrow",enabled:!!Ce,options:{element:Ce,padding:4}}];return(te=W.popperOptions)!=null&&te.modifiers&&($e=$e.concat(W.popperOptions.modifiers)),T({},W.popperOptions,{modifiers:$e})},[Ce,W]),Wt=T({},C,{isRtl:Oe,arrow:N,disableInteractive:Ke,placement:X,PopperComponentProp:Y,touch:Me.current}),cr=Gd(Wt),Oo=(r=(o=J.popper)!=null?o:L.Popper)!=null?r:Kd,Co=(i=(s=(l=J.transition)!=null?l:L.Transition)!=null?s:_)!=null?i:Dr,So=(c=(p=J.tooltip)!=null?p:L.Tooltip)!=null?c:Jd,No=(u=(f=J.arrow)!=null?f:L.Arrow)!=null?u:Zd,ks=nn(Oo,T({},W,(d=K.popper)!=null?d:V.popper,{className:Ee(cr.popper,W==null?void 0:W.className,(g=(y=K.popper)!=null?y:V.popper)==null?void 0:g.className)}),Wt),Ts=nn(Co,T({},Z,(b=K.transition)!=null?b:V.transition),Wt),Os=nn(So,T({},(h=K.tooltip)!=null?h:V.tooltip,{className:Ee(cr.tooltip,(E=(I=K.tooltip)!=null?I:V.tooltip)==null?void 0:E.className)}),Wt),Cs=nn(No,T({},(w=K.arrow)!=null?w:V.arrow,{className:Ee(cr.arrow,(x=(m=K.arrow)!=null?m:V.arrow)==null?void 0:x.className)}),Wt);return v.jsxs(k.Fragment,{children:[k.cloneElement(ie,Ae),v.jsx(Oo,T({as:Y??$a,placement:X,anchorEl:Q?{getBoundingClientRect:()=>({top:Jt.y,left:Jt.x,right:Jt.x,bottom:Jt.y,width:0,height:0})}:ve,popperRef:sr,open:ve?Je:!1,id:ir,transition:!0},Ht,ks,{popperOptions:Es,children:({TransitionProps:te})=>v.jsx(Co,T({timeout:we.transitions.duration.shorter},te,Ts,{children:v.jsxs(So,T({},Os,{children:[oe,N?v.jsx(No,T({},Cs,{ref:Ge})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(ja.propTypes={arrow:a.bool,children:gn.isRequired,classes:a.object,className:a.string,components:a.shape({Arrow:a.elementType,Popper:a.elementType,Tooltip:a.elementType,Transition:a.elementType}),componentsProps:a.shape({arrow:a.object,popper:a.object,tooltip:a.object,transition:a.object}),describeChild:a.bool,disableFocusListener:a.bool,disableHoverListener:a.bool,disableInteractive:a.bool,disableTouchListener:a.bool,enterDelay:a.number,enterNextDelay:a.number,enterTouchDelay:a.number,followCursor:a.bool,id:a.string,leaveDelay:a.number,leaveTouchDelay:a.number,onClose:a.func,onOpen:a.func,open:a.bool,placement:a.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:a.elementType,PopperProps:a.object,slotProps:a.shape({arrow:a.object,popper:a.object,tooltip:a.object,transition:a.object}),slots:a.shape({arrow:a.elementType,popper:a.elementType,tooltip:a.elementType,transition:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),title:a.node,TransitionComponent:a.elementType,TransitionProps:a.object});const Qd=ja;var po={},Ia={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Ia);var ef=Ia.exports,wr={};function tf(e){return Ye("MuiSvgIcon",e)}st("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const nf=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],rf=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${We(t)}`,`fontSize${We(n)}`]};return nt(o,tf,r)},of=Te("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${We(n.color)}`],t[`fontSize${We(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,s,l,c,p,u,f,d,g,y;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(s=i.pxToRem)==null?void 0:s.call(i,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((p=e.typography)==null||(u=p.pxToRem)==null?void 0:u.call(p,35))||"2.1875rem"}[t.fontSize],color:(f=(d=(e.vars||e).palette)==null||(d=d[t.color])==null?void 0:d.main)!=null?f:{action:(g=(e.vars||e).palette)==null||(g=g.action)==null?void 0:g.active,disabled:(y=(e.vars||e).palette)==null||(y=y.action)==null?void 0:y.disabled,inherit:void 0}[t.color]}}),uo=k.forwardRef(function(t,n){const r=rt({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:s="inherit",component:l="svg",fontSize:c="medium",htmlColor:p,inheritViewBox:u=!1,titleAccess:f,viewBox:d="0 0 24 24"}=r,g=de(r,nf),y=k.isValidElement(o)&&o.type==="svg",b=T({},r,{color:s,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:u,viewBox:d,hasSvgAsChild:y}),h={};u||(h.viewBox=d);const E=rf(b);return v.jsxs(of,T({as:l,className:Ee(E.root,i),focusable:"false",color:p,"aria-hidden":f?void 0:!0,role:f?"img":void 0,ref:n},h,g,y&&o.props,{ownerState:b,children:[y?o.props.children:o,f?v.jsx("title",{children:f}):null]}))});process.env.NODE_ENV!=="production"&&(uo.propTypes={children:a.node,classes:a.object,className:a.string,color:a.oneOfType([a.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),a.string]),component:a.elementType,fontSize:a.oneOfType([a.oneOf(["inherit","large","medium","small"]),a.string]),htmlColor:a.string,inheritViewBox:a.bool,shapeRendering:a.string,sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),titleAccess:a.string,viewBox:a.string});uo.muiName="SvgIcon";const wi=uo;function _a(e,t){function n(r,o){return v.jsx(wi,T({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=wi.muiName,k.memo(k.forwardRef(n))}const af={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),ia.configure(e)}},sf=Object.freeze(Object.defineProperty({__proto__:null,capitalize:We,createChainedFunction:Pr,createSvgIcon:_a,debounce:Ki,deprecatedPropType:jl,isMuiElement:Il,ownerDocument:ke,ownerWindow:_t,requirePropFactory:_l,setRef:Dn,unstable_ClassNameGenerator:af,unstable_useEnhancedEffect:wt,unstable_useId:Ji,unsupportedProp:Bl,useControlled:Zi,useEventCallback:pn,useForkRef:Le,useIsFocusVisible:Qi},Symbol.toStringTag,{value:"Module"})),lf=dl(sf);var xi;function cf(){return xi||(xi=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=lf}(wr)),wr}var pf=ef;Object.defineProperty(po,"__esModule",{value:!0});var Aa=po.default=void 0,uf=pf(cf()),df=v;Aa=po.default=(0,uf.default)((0,df.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function Ei(e,t,n){return e?v.jsx(be.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:v.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function fo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:s=void 0,hasAutoFocus:l=!1,className:c,isDisabled:p=!1,isDense:u=!0,isSubMenuParent:f=!1,hasDisabledGutters:d=!1,hasDivider:g=!1,focusVisibleClassName:y,id:b,children:h}=e,E=v.jsx(be.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:p,dense:u,disableGutters:d,divider:g,focusVisibleClassName:y,onClick:t,id:b,children:n?v.jsxs(v.Fragment,{children:[Ei(i,n,!0),v.jsx(be.ListItemText,{primary:n,inset:!i&&o}),f?v.jsx(be.ListItemIcon,{className:"papi-menu-icon-trailing",children:v.jsx(Aa,{})}):Ei(s,n,!1)]}):h});return r?v.jsx(Qd,{title:r,placement:"right",children:v.jsx("div",{children:E})}):E}function Da(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function ff(e){const[t,n]=P.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,s=p=>{n(p.currentTarget)},l=()=>{n(void 0)},c=()=>{let p=Da(i).filter(u=>"menuItem"in u.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return p=p.filter(u=>"menuItem"in u.group&&u.group.menuItem===r.id),v.jsx(ho,{...e,includedGroups:p})};return v.jsxs(v.Fragment,{children:[v.jsx(fo,{onClick:s,...o,isSubMenuParent:!0}),v.jsx(be.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const hf=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function ho(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:s}=P.useMemo(()=>{const u=o&&o.length>0?o:Da(t).filter(y=>!("menuItem"in y.group)),f=Object.values(u).sort((y,b)=>(y.group.order||0)-(b.group.order||0)),d=[];f.forEach(y=>{hf(y.id,t.items).forEach(b=>d.push({item:b,isLastItemInGroup:!1})),d.length>0&&(d[d.length-1].isLastItemInGroup=!0)}),d.length>0&&(d[d.length-1].isLastItemInGroup=!1);const g=d.some(y=>"iconPathBefore"in y.item&&y.item.iconPathBefore);return{items:d,allowForLeadingIcons:g}},[o,t]),l=({item:u,isLastItemInGroup:f})=>({className:"papi-menu-item",label:u.label,tooltip:u.tooltip,iconPathBefore:"iconPathBefore"in u?u.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in u?u.iconPathAfter:void 0,hasDivider:f,allowForLeadingIcons:s}),[c]=i;if(!c)return v.jsx("div",{});const p=c.item.group;return v.jsx("div",{role:"menu","aria-label":p,children:i.map((u,f)=>{const{item:d}=u,g=l(u);if("command"in d){const y=d.group+f;return v.jsx(fo,{onClick:b=>{n==null||n(b),r(d)},...g},y)}return v.jsx(ff,{parentMenuItem:d,parentItemProps:g,...e},p+d.id)})},p)}function mf(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([s,l])=>({id:s,group:l})).filter(s=>"column"in s.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(s=>"column"in s.group&&s.group.column===n)),v.jsx(ho,{...e,includedGroups:i})}function gf({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return v.jsxs(be.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[v.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),v.jsx(be.List,{id:n,dense:!0,className:i??"",children:v.jsx(mf,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Ba({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=P.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,p=o[c];typeof p=="object"&&typeof p.order=="number"&&!Number.isNaN(p.order)?s.set(p.order,{id:c,metadata:p}):console.warn(`Property ${l} (${typeof p}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return v.jsx(be.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((s,l)=>v.jsx(gf,{commandHandler:e,menuDefinition:n,...s,className:t},l))})}const La=k.createContext({});process.env.NODE_ENV!=="production"&&(La.displayName="ListContext");const bf=La;function vf(e){return Ye("MuiList",e)}st("MuiList",["root","padding","dense","subheader"]);const yf=["children","className","component","dense","disablePadding","subheader"],wf=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return nt({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},vf,t)},xf=Te("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>T({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Fa=k.forwardRef(function(t,n){const r=rt({props:t,name:"MuiList"}),{children:o,className:i,component:s="ul",dense:l=!1,disablePadding:c=!1,subheader:p}=r,u=de(r,yf),f=k.useMemo(()=>({dense:l}),[l]),d=T({},r,{component:s,dense:l,disablePadding:c}),g=wf(d);return v.jsx(bf.Provider,{value:f,children:v.jsxs(xf,T({as:s,className:Ee(g.root,i),ref:n,ownerState:d},u,{children:[p,o]}))})});process.env.NODE_ENV!=="production"&&(Fa.propTypes={children:a.node,classes:a.object,className:a.string,component:a.elementType,dense:a.bool,disablePadding:a.bool,subheader:a.node,sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object])});const Ef=Fa,kf=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function xr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function ki(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function Va(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function Zt(e,t,n,r,o,i){let s=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(s)return!1;s=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!Va(l,i)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const za=k.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:s,className:l,disabledItemsFocusable:c=!1,disableListWrap:p=!1,onKeyDown:u,variant:f="selectedMenu"}=t,d=de(t,kf),g=k.useRef(null),y=k.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});wt(()=>{o&&g.current.focus()},[o]),k.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(w,x)=>{const m=!g.current.style.width;if(w.clientHeight<g.current.clientHeight&&m){const C=`${ea(ke(w))}px`;g.current.style[x.direction==="rtl"?"paddingLeft":"paddingRight"]=C,g.current.style.width=`calc(100% + ${C})`}return g.current}}),[]);const b=w=>{const x=g.current,m=w.key,C=ke(x).activeElement;if(m==="ArrowDown")w.preventDefault(),Zt(x,C,p,c,xr);else if(m==="ArrowUp")w.preventDefault(),Zt(x,C,p,c,ki);else if(m==="Home")w.preventDefault(),Zt(x,null,p,c,xr);else if(m==="End")w.preventDefault(),Zt(x,null,p,c,ki);else if(m.length===1){const N=y.current,F=m.toLowerCase(),L=performance.now();N.keys.length>0&&(L-N.lastTime>500?(N.keys=[],N.repeating=!0,N.previousKeyMatched=!0):N.repeating&&F!==N.keys[0]&&(N.repeating=!1)),N.lastTime=L,N.keys.push(F);const V=C&&!N.repeating&&Va(C,N);N.previousKeyMatched&&(V||Zt(x,C,!1,c,xr,N))?w.preventDefault():N.previousKeyMatched=!1}u&&u(w)},h=Le(g,n);let E=-1;k.Children.forEach(s,(w,x)=>{if(!k.isValidElement(w)){E===x&&(E+=1,E>=s.length&&(E=-1));return}process.env.NODE_ENV!=="production"&&An.isFragment(w)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),w.props.disabled||(f==="selectedMenu"&&w.props.selected||E===-1)&&(E=x),E===x&&(w.props.disabled||w.props.muiSkipListHighlight||w.type.muiSkipListHighlight)&&(E+=1,E>=s.length&&(E=-1))});const I=k.Children.map(s,(w,x)=>{if(x===E){const m={};return i&&(m.autoFocus=!0),w.props.tabIndex===void 0&&f==="selectedMenu"&&(m.tabIndex=0),k.cloneElement(w,m)}return w});return v.jsx(Ef,T({role:"menu",ref:h,className:l,onKeyDown:b,tabIndex:o?0:-1},d,{children:I}))});process.env.NODE_ENV!=="production"&&(za.propTypes={autoFocus:a.bool,autoFocusItem:a.bool,children:a.node,className:a.string,disabledItemsFocusable:a.bool,disableListWrap:a.bool,onKeyDown:a.func,variant:a.oneOf(["menu","selectedMenu"])});const Tf=za,Of=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Cf={entering:{opacity:1},entered:{opacity:1}},Ua=k.forwardRef(function(t,n){const r=En(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:s=!0,children:l,easing:c,in:p,onEnter:u,onEntered:f,onEntering:d,onExit:g,onExited:y,onExiting:b,style:h,timeout:E=o,TransitionComponent:I=Pa}=t,w=de(t,Of),x=k.useRef(null),m=Le(x,l.ref,n),C=B=>D=>{if(B){const j=x.current;D===void 0?B(j):B(j,D)}},N=C(d),F=C((B,D)=>{Ra(B);const j=Un({style:h,timeout:E,easing:c},{mode:"enter"});B.style.webkitTransition=r.transitions.create("opacity",j),B.style.transition=r.transitions.create("opacity",j),u&&u(B,D)}),L=C(f),V=C(b),S=C(B=>{const D=Un({style:h,timeout:E,easing:c},{mode:"exit"});B.style.webkitTransition=r.transitions.create("opacity",D),B.style.transition=r.transitions.create("opacity",D),g&&g(B)}),$=C(y),M=B=>{i&&i(x.current,B)};return v.jsx(I,T({appear:s,in:p,nodeRef:x,onEnter:F,onEntered:L,onEntering:N,onExit:S,onExited:$,onExiting:V,addEndListener:M,timeout:E},w,{children:(B,D)=>k.cloneElement(l,T({style:T({opacity:0,visibility:B==="exited"&&!p?"hidden":void 0},Cf[B],h,l.props.style),ref:m},D))}))});process.env.NODE_ENV!=="production"&&(Ua.propTypes={addEndListener:a.func,appear:a.bool,children:gn.isRequired,easing:a.oneOfType([a.shape({enter:a.string,exit:a.string}),a.string]),in:a.bool,onEnter:a.func,onEntered:a.func,onEntering:a.func,onExit:a.func,onExited:a.func,onExiting:a.func,style:a.object,timeout:a.oneOfType([a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})])});const Sf=Ua;function Nf(e){return Ye("MuiBackdrop",e)}st("MuiBackdrop",["root","invisible"]);const Pf=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Rf=e=>{const{classes:t,invisible:n}=e;return nt({root:["root",n&&"invisible"]},Nf,t)},Mf=Te("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>T({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),qa=k.forwardRef(function(t,n){var r,o,i;const s=rt({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:p="div",components:u={},componentsProps:f={},invisible:d=!1,open:g,slotProps:y={},slots:b={},TransitionComponent:h=Sf,transitionDuration:E}=s,I=de(s,Pf),w=T({},s,{component:p,invisible:d}),x=Rf(w),m=(r=y.root)!=null?r:f.root;return v.jsx(h,T({in:g,timeout:E},I,{children:v.jsx(Mf,T({"aria-hidden":!0},m,{as:(o=(i=b.root)!=null?i:u.Root)!=null?o:p,className:Ee(x.root,c,m==null?void 0:m.className),ownerState:T({},w,m==null?void 0:m.ownerState),classes:x,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(qa.propTypes={children:a.node,classes:a.object,className:a.string,component:a.elementType,components:a.shape({Root:a.elementType}),componentsProps:a.shape({root:a.object}),invisible:a.bool,open:a.bool.isRequired,slotProps:a.shape({root:a.object}),slots:a.shape({root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),TransitionComponent:a.elementType,transitionDuration:a.oneOfType([a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})])});const $f=qa;function jf(e){return Ye("MuiModal",e)}st("MuiModal",["root","hidden","backdrop"]);const If=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],_f=e=>{const{open:t,exited:n,classes:r}=e;return nt({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},jf,r)},Af=Te("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>T({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Df=Te($f,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Ha=k.forwardRef(function(t,n){var r,o,i,s,l,c;const p=rt({name:"MuiModal",props:t}),{BackdropComponent:u=Df,BackdropProps:f,className:d,closeAfterTransition:g=!1,children:y,container:b,component:h,components:E={},componentsProps:I={},disableAutoFocus:w=!1,disableEnforceFocus:x=!1,disableEscapeKeyDown:m=!1,disablePortal:C=!1,disableRestoreFocus:N=!1,disableScrollLock:F=!1,hideBackdrop:L=!1,keepMounted:V=!1,onBackdropClick:S,open:$,slotProps:M,slots:B}=p,D=de(p,If),j=T({},p,{closeAfterTransition:g,disableAutoFocus:w,disableEnforceFocus:x,disableEscapeKeyDown:m,disablePortal:C,disableRestoreFocus:N,disableScrollLock:F,hideBackdrop:L,keepMounted:V}),{getRootProps:z,getBackdropProps:ee,getTransitionProps:Q,portalRef:O,isTopModal:A,exited:q,hasTransition:G}=Oc(T({},j,{rootRef:n})),U=T({},j,{exited:q}),H=_f(U),X={};if(y.props.tabIndex===void 0&&(X.tabIndex="-1"),G){const{onEnter:Z,onExited:R}=Q();X.onEnter=Z,X.onExited=R}const Y=(r=(o=B==null?void 0:B.root)!=null?o:E.Root)!=null?r:Af,W=(i=(s=B==null?void 0:B.backdrop)!=null?s:E.Backdrop)!=null?i:u,K=(l=M==null?void 0:M.root)!=null?l:I.root,J=(c=M==null?void 0:M.backdrop)!=null?c:I.backdrop,oe=xt({elementType:Y,externalSlotProps:K,externalForwardedProps:D,getSlotProps:z,additionalProps:{ref:n,as:h},ownerState:U,className:Ee(d,K==null?void 0:K.className,H==null?void 0:H.root,!U.open&&U.exited&&(H==null?void 0:H.hidden))}),_=xt({elementType:W,externalSlotProps:J,additionalProps:f,getSlotProps:Z=>ee(T({},Z,{onClick:R=>{S&&S(R),Z!=null&&Z.onClick&&Z.onClick(R)}})),className:Ee(J==null?void 0:J.className,f==null?void 0:f.className,H==null?void 0:H.backdrop),ownerState:U});return!V&&!$&&(!G||q)?null:v.jsx(un,{ref:O,container:b,disablePortal:C,children:v.jsxs(Y,T({},oe,{children:[!L&&u?v.jsx(W,T({},_)):null,v.jsx(Bn,{disableEnforceFocus:x,disableAutoFocus:w,disableRestoreFocus:N,isEnabled:A,open:$,children:k.cloneElement(y,X)})]}))})});process.env.NODE_ENV!=="production"&&(Ha.propTypes={BackdropComponent:a.elementType,BackdropProps:a.object,children:gn.isRequired,classes:a.object,className:a.string,closeAfterTransition:a.bool,component:a.elementType,components:a.shape({Backdrop:a.elementType,Root:a.elementType}),componentsProps:a.shape({backdrop:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),container:a.oneOfType([Qe,a.func]),disableAutoFocus:a.bool,disableEnforceFocus:a.bool,disableEscapeKeyDown:a.bool,disablePortal:a.bool,disableRestoreFocus:a.bool,disableScrollLock:a.bool,hideBackdrop:a.bool,keepMounted:a.bool,onBackdropClick:a.func,onClose:a.func,onTransitionEnter:a.func,onTransitionExited:a.func,open:a.bool.isRequired,slotProps:a.shape({backdrop:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),slots:a.shape({backdrop:a.elementType,root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object])});const Bf=Ha;function Lf(e){return Ye("MuiPaper",e)}st("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Ff=["className","component","elevation","square","variant"],Vf=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return nt(i,Lf,o)},zf=Te("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return T({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&T({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${zn("#fff",vi(t.elevation))}, ${zn("#fff",vi(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Wa=k.forwardRef(function(t,n){const r=rt({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:s=1,square:l=!1,variant:c="elevation"}=r,p=de(r,Ff),u=T({},r,{component:i,elevation:s,square:l,variant:c}),f=Vf(u);return process.env.NODE_ENV!=="production"&&En().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),v.jsx(zf,T({as:i,ownerState:u,className:Ee(f.root,o),ref:n},p))});process.env.NODE_ENV!=="production"&&(Wa.propTypes={children:a.node,classes:a.object,className:a.string,component:a.elementType,elevation:Vt(ra,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:a.bool,sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),variant:a.oneOfType([a.oneOf(["elevation","outlined"]),a.string])});const Uf=Wa;function qf(e){return Ye("MuiPopover",e)}st("MuiPopover",["root","paper"]);const Hf=["onEntering"],Wf=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Xf=["slotProps"];function Ti(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function Oi(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function Ci(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function In(e){return typeof e=="function"?e():e}const Yf=e=>{const{classes:t}=e;return nt({root:["root"],paper:["paper"]},qf,t)},Gf=Te(Bf,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Xa=Te(Uf,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Ya=k.forwardRef(function(t,n){var r,o,i;const s=rt({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:p={vertical:"top",horizontal:"left"},anchorPosition:u,anchorReference:f="anchorEl",children:d,className:g,container:y,elevation:b=8,marginThreshold:h=16,open:E,PaperProps:I={},slots:w,slotProps:x,transformOrigin:m={vertical:"top",horizontal:"left"},TransitionComponent:C=Dr,transitionDuration:N="auto",TransitionProps:{onEntering:F}={},disableScrollLock:L=!1}=s,V=de(s.TransitionProps,Hf),S=de(s,Wf),$=(r=x==null?void 0:x.paper)!=null?r:I,M=k.useRef(),B=Le(M,$.ref),D=T({},s,{anchorOrigin:p,anchorReference:f,elevation:b,marginThreshold:h,externalPaperSlotProps:$,transformOrigin:m,TransitionComponent:C,transitionDuration:N,TransitionProps:V}),j=Yf(D),z=k.useCallback(()=>{if(f==="anchorPosition")return process.env.NODE_ENV!=="production"&&(u||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),u;const Z=In(c),R=Z&&Z.nodeType===1?Z:ke(M.current).body,ie=R.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const we=R.getBoundingClientRect();process.env.NODE_ENV!=="test"&&we.top===0&&we.left===0&&we.right===0&&we.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:ie.top+Ti(ie,p.vertical),left:ie.left+Oi(ie,p.horizontal)}},[c,p.horizontal,p.vertical,u,f]),ee=k.useCallback(Z=>({vertical:Ti(Z,m.vertical),horizontal:Oi(Z,m.horizontal)}),[m.horizontal,m.vertical]),Q=k.useCallback(Z=>{const R={width:Z.offsetWidth,height:Z.offsetHeight},ie=ee(R);if(f==="none")return{top:null,left:null,transformOrigin:Ci(ie)};const we=z();let Oe=we.top-ie.vertical,ve=we.left-ie.horizontal;const pt=Oe+R.height,Ce=ve+R.width,Ge=_t(In(c)),Me=Ge.innerHeight-h,Ke=Ge.innerWidth-h;if(h!==null&&Oe<h){const xe=Oe-h;Oe-=xe,ie.vertical+=xe}else if(h!==null&&pt>Me){const xe=pt-Me;Oe-=xe,ie.vertical+=xe}if(process.env.NODE_ENV!=="production"&&R.height>Me&&R.height&&Me&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${R.height-Me}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),h!==null&&ve<h){const xe=ve-h;ve-=xe,ie.horizontal+=xe}else if(Ce>Ke){const xe=Ce-Ke;ve-=xe,ie.horizontal+=xe}return{top:`${Math.round(Oe)}px`,left:`${Math.round(ve)}px`,transformOrigin:Ci(ie)}},[c,f,z,ee,h]),[O,A]=k.useState(E),q=k.useCallback(()=>{const Z=M.current;if(!Z)return;const R=Q(Z);R.top!==null&&(Z.style.top=R.top),R.left!==null&&(Z.style.left=R.left),Z.style.transformOrigin=R.transformOrigin,A(!0)},[Q]);k.useEffect(()=>(L&&window.addEventListener("scroll",q),()=>window.removeEventListener("scroll",q)),[c,L,q]);const G=(Z,R)=>{F&&F(Z,R),q()},U=()=>{A(!1)};k.useEffect(()=>{E&&q()}),k.useImperativeHandle(l,()=>E?{updatePosition:()=>{q()}}:null,[E,q]),k.useEffect(()=>{if(!E)return;const Z=Ki(()=>{q()}),R=_t(c);return R.addEventListener("resize",Z),()=>{Z.clear(),R.removeEventListener("resize",Z)}},[c,E,q]);let H=N;N==="auto"&&!C.muiSupportAuto&&(H=void 0);const X=y||(c?ke(In(c)).body:void 0),Y=(o=w==null?void 0:w.root)!=null?o:Gf,W=(i=w==null?void 0:w.paper)!=null?i:Xa,K=xt({elementType:W,externalSlotProps:T({},$,{style:O?$.style:T({},$.style,{opacity:0})}),additionalProps:{elevation:b,ref:B},ownerState:D,className:Ee(j.paper,$==null?void 0:$.className)}),J=xt({elementType:Y,externalSlotProps:(x==null?void 0:x.root)||{},externalForwardedProps:S,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:X,open:E},ownerState:D,className:Ee(j.root,g)}),{slotProps:oe}=J,_=de(J,Xf);return v.jsx(Y,T({},_,!sa(Y)&&{slotProps:oe,disableScrollLock:L},{children:v.jsx(C,T({appear:!0,in:E,onEntering:G,onExited:U,timeout:H},V,{children:v.jsx(W,T({},K,{children:d}))}))}))});process.env.NODE_ENV!=="production"&&(Ya.propTypes={action:Xr,anchorEl:Vt(a.oneOfType([Qe,a.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=In(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:a.shape({horizontal:a.oneOfType([a.oneOf(["center","left","right"]),a.number]).isRequired,vertical:a.oneOfType([a.oneOf(["bottom","center","top"]),a.number]).isRequired}),anchorPosition:a.shape({left:a.number.isRequired,top:a.number.isRequired}),anchorReference:a.oneOf(["anchorEl","anchorPosition","none"]),children:a.node,classes:a.object,className:a.string,container:a.oneOfType([Qe,a.func]),disableScrollLock:a.bool,elevation:ra,marginThreshold:a.number,onClose:a.func,open:a.bool.isRequired,PaperProps:a.shape({component:Ol}),slotProps:a.shape({paper:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),slots:a.shape({paper:a.elementType,root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),transformOrigin:a.shape({horizontal:a.oneOfType([a.oneOf(["center","left","right"]),a.number]).isRequired,vertical:a.oneOfType([a.oneOf(["bottom","center","top"]),a.number]).isRequired}),TransitionComponent:a.elementType,transitionDuration:a.oneOfType([a.oneOf(["auto"]),a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})]),TransitionProps:a.object});const Kf=Ya;function Jf(e){return Ye("MuiMenu",e)}st("MuiMenu",["root","paper","list"]);const Zf=["onEntering"],Qf=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],eh={vertical:"top",horizontal:"right"},th={vertical:"top",horizontal:"left"},nh=e=>{const{classes:t}=e;return nt({root:["root"],paper:["paper"],list:["list"]},Jf,t)},rh=Te(Kf,{shouldForwardProp:e=>Sa(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),oh=Te(Xa,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),ih=Te(Tf,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Ga=k.forwardRef(function(t,n){var r,o;const i=rt({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:l,className:c,disableAutoFocusItem:p=!1,MenuListProps:u={},onClose:f,open:d,PaperProps:g={},PopoverClasses:y,transitionDuration:b="auto",TransitionProps:{onEntering:h}={},variant:E="selectedMenu",slots:I={},slotProps:w={}}=i,x=de(i.TransitionProps,Zf),m=de(i,Qf),C=En(),N=C.direction==="rtl",F=T({},i,{autoFocus:s,disableAutoFocusItem:p,MenuListProps:u,onEntering:h,PaperProps:g,transitionDuration:b,TransitionProps:x,variant:E}),L=nh(F),V=s&&!p&&d,S=k.useRef(null),$=(Q,O)=>{S.current&&S.current.adjustStyleForScrollbar(Q,C),h&&h(Q,O)},M=Q=>{Q.key==="Tab"&&(Q.preventDefault(),f&&f(Q,"tabKeyDown"))};let B=-1;k.Children.map(l,(Q,O)=>{k.isValidElement(Q)&&(process.env.NODE_ENV!=="production"&&An.isFragment(Q)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Q.props.disabled||(E==="selectedMenu"&&Q.props.selected||B===-1)&&(B=O))});const D=(r=I.paper)!=null?r:oh,j=(o=w.paper)!=null?o:g,z=xt({elementType:I.root,externalSlotProps:w.root,ownerState:F,className:[L.root,c]}),ee=xt({elementType:D,externalSlotProps:j,ownerState:F,className:L.paper});return v.jsx(rh,T({onClose:f,anchorOrigin:{vertical:"bottom",horizontal:N?"right":"left"},transformOrigin:N?eh:th,slots:{paper:D,root:I.root},slotProps:{root:z,paper:ee},open:d,ref:n,transitionDuration:b,TransitionProps:T({onEntering:$},x),ownerState:F},m,{classes:y,children:v.jsx(ih,T({onKeyDown:M,actions:S,autoFocus:s&&(B===-1||p),autoFocusItem:V,variant:E},u,{className:Ee(L.list,u.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(Ga.propTypes={anchorEl:a.oneOfType([Qe,a.func]),autoFocus:a.bool,children:a.node,classes:a.object,className:a.string,disableAutoFocusItem:a.bool,MenuListProps:a.object,onClose:a.func,open:a.bool.isRequired,PaperProps:a.object,PopoverClasses:a.object,slotProps:a.shape({paper:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),slots:a.shape({paper:a.elementType,root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),transitionDuration:a.oneOfType([a.oneOf(["auto"]),a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})]),TransitionProps:a.object,variant:a.oneOf(["menu","selectedMenu"])});const ah=Ga;function sh({className:e,commandHandler:t,menuDefinition:n,children:r}){var p;const[o,i]=P.useState(void 0),s=P.useCallback(u=>{u.preventDefault(),i(o===void 0?{mouseX:u.clientX+2,mouseY:u.clientY-6}:void 0)},[o]),l=P.useCallback(()=>{i(void 0)},[]),c=P.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((p=n==null?void 0:n.items)==null?void 0:p.length)??0)===0||!r?r:v.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[r,v.jsx(ah,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:v.jsx(ho,{menuDefinition:n,commandHandler:t,onClick:l})})]})}const lh=_a(v.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function ch(e){return{preserveValue:!0,...e}}const qn=(e,t,n={})=>{const r=P.useRef(t);r.current=t;const o=P.useRef(n);o.current=ch(o.current);const[i,s]=P.useState(()=>r.current),[l,c]=P.useState(!0);return P.useEffect(()=>{let p=!0;return c(!!e),(async()=>{if(e){const u=await e();p&&(s(()=>u),c(!1))}})(),()=>{p=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[i,l]};function Ka({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:i,ariaLabelPrefix:s,children:l}){const[c,p]=P.useState(!1),[u,f]=P.useState(!1),d=P.useCallback(()=>{c&&p(!1),f(!1)},[c]),g=P.useCallback(x=>{x.stopPropagation(),p(m=>{const C=!m;return C&&x.shiftKey?f(!0):C||f(!1),C})},[]),y=P.useCallback(x=>(d(),r(x)),[r,d]),[b,h]=P.useState({top:1,left:1});P.useEffect(()=>{if(c){const x=o==null?void 0:o.current;if(x){const m=x.getBoundingClientRect(),C=window.scrollY,N=window.scrollX,F=m.top+C+x.clientHeight,L=m.left+N;h({top:F,left:L})}}},[c,o]);const[E]=qn(P.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[I]=qn(P.useCallback(async()=>(e==null?void 0:e(!0))??n??E,[e,n,E,c]),n??E),w=u&&I?I:E;return v.jsxs(v.Fragment,{children:[v.jsx(be.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${i??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:g,children:l??v.jsx(lh,{})}),v.jsx(be.Drawer,{className:`papi-menu-drawer ${i??""}`,anchor:"left",variant:"temporary",open:c,onClose:d,PaperProps:{className:"papi-menu-drawer-paper",style:{top:b.top,left:b.left}},children:w?v.jsx(Ba,{className:i,id:`${s??""} main menu`,commandHandler:y,multiColumnMenu:w}):void 0})]})}function ph({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:s="medium",className:l,onClick:c,children:p}){return v.jsx(be.IconButton,{id:e,disabled:n,edge:i,size:s,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:p})}const uh=Br.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),Ja=P.forwardRef(({className:e,...t},n)=>v.jsx(Ni.Root,{ref:n,className:ne(uh(),e),...t}));Ja.displayName=Ni.Root.displayName;function mn({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:i,placeholder:s,isRequired:l=!1,className:c,defaultValue:p,value:u,onChange:f,onFocus:d,onBlur:g}){return v.jsxs("div",{className:ne("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":r}),children:[v.jsx(Ja,{htmlFor:e,className:ne({"pr-text-red-600":n,"pr-hidden":!i}),children:`${i}${l?"*":""}`}),v.jsx(Wn,{id:e,disabled:t,placeholder:s,required:l,className:ne(c,{"pr-border-red-600":n}),defaultValue:p,value:u,onChange:f,onFocus:d,onBlur:g}),v.jsx("p",{className:ne({"pr-hidden":!o}),children:o})]})}let Er;const kr=()=>(Er||(Er=ue.allBookIds.map(e=>({bookId:e,label:ue.bookIdToEnglishName(e)}))),Er);function dh({scrRef:e,handleSubmit:t,id:n}){const r=c=>{t(c)},o=(c,p)=>{const f={bookNum:ue.bookIdToNumber(p.bookId),chapterNum:1,verseNum:1};r(f)},i=c=>{t({...e,chapterNum:+c.target.value})},s=c=>{t({...e,verseNum:+c.target.value})},l=P.useMemo(()=>kr()[e.bookNum-1],[e.bookNum]);return v.jsxs("span",{id:n,className:"pr-flex pr-place-items-center",children:[v.jsx(_n,{title:"Book",className:"papi-ref-selector book",value:l,options:kr(),onChange:o,isClearable:!1,width:200}),v.jsx(it,{onClick:()=>r(Ue.offsetBook(e,-1)),disabled:e.bookNum<=Ue.FIRST_SCR_BOOK_NUM,children:"<"}),v.jsx(it,{onClick:()=>r(Ue.offsetBook(e,1)),disabled:e.bookNum>=kr().length,children:">"}),v.jsx(mn,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),v.jsx(it,{onClick:()=>t(Ue.offsetChapter(e,-1)),disabled:e.chapterNum<=Ue.FIRST_SCR_CHAPTER_NUM,children:"<"}),v.jsx(it,{onClick:()=>t(Ue.offsetChapter(e,1)),disabled:e.chapterNum>=Ue.getChaptersForBook(e.bookNum),children:">"}),v.jsx(mn,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:s}),v.jsx(it,{onClick:()=>t(Ue.offsetVerse(e,-1)),disabled:e.verseNum<=Ue.FIRST_SCR_VERSE_NUM,children:"<"}),v.jsx(it,{onClick:()=>t(Ue.offsetVerse(e,1)),children:">"})]})}function fh({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=P.useState(""),i=s=>{o(s),e(s)};return v.jsx(mn,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:s=>i(s.target.value)})}function hh({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:s=!1,defaultValue:l,value:c,valueLabelDisplay:p="off",className:u,onChange:f,onChangeCommitted:d}){return v.jsx(be.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:s,defaultValue:l,value:c,valueLabelDisplay:p,className:`papi-slider ${n} ${u??""}`,onChange:f,onChangeCommitted:d})}function mh({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:s,children:l}){const c={action:(s==null?void 0:s.action)||l,message:s==null?void 0:s.message,className:r};return v.jsx(be.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:c})}function gh({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return v.jsx(be.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function Si({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return v.jsx(mn,{defaultValue:t[n.key],onChange:r})}const bh=({onChange:e,disabled:t,checked:n,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return v.jsx(Hr,{...r,isChecked:n,isDisabled:t,onChange:o})};function vh({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:s,defaultColumnSortable:l=!0,defaultColumnResizable:c=!0,rows:p,enableSelectColumn:u,selectColumnWidth:f=50,rowKeyGetter:d,rowHeight:g=35,headerRowHeight:y=35,selectedRows:b,onSelectedRowsChange:h,onRowsChange:E,onCellClick:I,onCellDoubleClick:w,onCellContextMenu:x,onCellKeyDown:m,direction:C="ltr",enableVirtualization:N=!0,onCopy:F,onPaste:L,onScroll:V,className:S,"data-testid":$}){const M=P.useMemo(()=>{const B=e.map(D=>typeof D.editable=="function"?{...D,editable:z=>!!D.editable(z),renderEditCell:D.renderEditCell||Si}:D.editable&&!D.renderEditCell?{...D,renderEditCell:Si}:D.renderEditCell&&!D.editable?{...D,editable:!1}:D);return u?[{...Po.SelectColumn,minWidth:f},...B]:B},[e,u,f]);return v.jsx(Po,{columns:M,defaultColumnOptions:{width:o,minWidth:i,maxWidth:s,sortable:l,resizable:c},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:p,rowKeyGetter:d,rowHeight:g,headerRowHeight:y,selectedRows:b,onSelectedRowsChange:h,onRowsChange:E,onCellClick:I,onCellDoubleClick:w,onCellContextMenu:x,onCellKeyDown:m,direction:C,enableVirtualization:N,onCopy:F,onPaste:L,onScroll:V,renderers:{renderCheckbox:bh},className:`papi-table ${S??"rdg-light"}`,"data-testid":$})}function yh({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const i=P.useRef(void 0);return v.jsx("div",{ref:i,style:{position:"relative"},children:v.jsx(be.AppBar,{position:"static",id:r,children:v.jsxs(be.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?v.jsx(Ka,{commandHandler:t,containerRef:i,menuProvider:e}):void 0,o?v.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const wh=(e,t)=>{P.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Tr=()=>!1,xh=(e,t)=>{const[n]=qn(P.useCallback(async()=>{if(!e)return Tr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Tr,{preserveValue:!1});P.useEffect(()=>()=>{n!==Tr&&n()},[n])},Eh=Re.Root,Za=P.forwardRef(({className:e,...t},n)=>v.jsx(Re.List,{ref:n,className:ne("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Za.displayName=Re.List.displayName;const Qa=P.forwardRef(({className:e,...t},n)=>v.jsx(Re.Trigger,{ref:n,className:ne("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));Qa.displayName=Re.Trigger.displayName;const es=P.forwardRef(({className:e,...t},n)=>v.jsx(Re.Content,{ref:n,className:ne("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));es.displayName=Re.Content.displayName;const ts=P.forwardRef(({className:e,...t},n)=>v.jsx(Re.Root,{orientation:"vertical",ref:n,className:ne("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));ts.displayName=Re.List.displayName;const ns=P.forwardRef(({className:e,...t},n)=>v.jsx(Re.List,{ref:n,className:ne("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));ns.displayName=Re.List.displayName;const kh=P.forwardRef(({className:e,...t},n)=>v.jsx(Re.Trigger,{ref:n,...t,className:ne("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),rs=P.forwardRef(({className:e,...t},n)=>v.jsx(Re.Content,{ref:n,className:ne("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));rs.displayName=Re.Content.displayName;const os=P.forwardRef(({className:e,...t},n)=>v.jsx("div",{ref:n,className:ne("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));os.displayName="Card";const is=P.forwardRef(({className:e,...t},n)=>v.jsx("div",{ref:n,className:ne("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));is.displayName="CardHeader";const as=P.forwardRef(({className:e,...t},n)=>v.jsx("h3",{ref:n,className:ne("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));as.displayName="CardTitle";const ss=P.forwardRef(({className:e,...t},n)=>v.jsx("p",{ref:n,className:ne("pr-text-sm pr-text-muted-foreground",e),...t}));ss.displayName="CardDescription";const ls=P.forwardRef(({className:e,...t},n)=>v.jsx("div",{ref:n,className:ne("pr-p-6 pr-pt-0",e),...t}));ls.displayName="CardContent";const cs=P.forwardRef(({className:e,...t},n)=>v.jsx("div",{ref:n,className:ne("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));cs.displayName="CardFooter";const Th=Br.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),ps=P.forwardRef(({className:e,variant:t,...n},r)=>v.jsx("div",{ref:r,role:"alert",className:ne(Th({variant:t}),e),...n}));ps.displayName="Alert";const us=P.forwardRef(({className:e,...t},n)=>v.jsxs("h5",{ref:n,className:ne("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));us.displayName="AlertTitle";const ds=P.forwardRef(({className:e,...t},n)=>v.jsx("div",{ref:n,className:ne("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));ds.displayName="AlertDescription";const fs=P.forwardRef(({className:e,...t},n)=>v.jsxs(en.Root,{ref:n,className:ne("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[v.jsx(en.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:v.jsx(en.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),v.jsx(en.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));fs.displayName=en.Root.displayName;const hs=P.forwardRef(({className:e,...t},n)=>v.jsx(Cr.Root,{className:ne("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:n,children:v.jsx(Cr.Thumb,{className:ne("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));hs.displayName=Cr.Root.displayName;exports.Alert=ps;exports.AlertDescription=ds;exports.AlertTitle=us;exports.BookChapterControl=ll;exports.Button=it;exports.Card=os;exports.CardContent=ls;exports.CardDescription=ss;exports.CardFooter=cs;exports.CardHeader=is;exports.CardTitle=as;exports.ChapterRangeSelector=cl;exports.Checkbox=Hr;exports.Checklist=pl;exports.ComboBox=_n;exports.ContextMenu=sh;exports.DropdownMenu=_i;exports.DropdownMenuCheckboxItem=Li;exports.DropdownMenuContent=zr;exports.DropdownMenuGroup=Xs;exports.DropdownMenuItem=Ur;exports.DropdownMenuLabel=Hn;exports.DropdownMenuPortal=Ys;exports.DropdownMenuRadioGroup=Ks;exports.DropdownMenuRadioItem=Fi;exports.DropdownMenuSeparator=qr;exports.DropdownMenuShortcut=Vi;exports.DropdownMenuSub=Gs;exports.DropdownMenuSubContent=Bi;exports.DropdownMenuSubTrigger=Di;exports.DropdownMenuTrigger=Ai;exports.GridMenu=Ba;exports.HamburgerMenuButton=Ka;exports.IconButton=ph;exports.Input=Wn;exports.LabelPosition=mt;exports.MenuItem=fo;exports.RefSelector=dh;exports.SearchBar=fh;exports.ShadCnSlider=fs;exports.ShadCnSwitch=hs;exports.Slider=hh;exports.Snackbar=mh;exports.Switch=gh;exports.Table=vh;exports.Tabs=Eh;exports.TabsContent=es;exports.TabsList=Za;exports.TabsTrigger=Qa;exports.TextField=mn;exports.Toolbar=yh;exports.VerticalTabs=ts;exports.VerticalTabsContent=rs;exports.VerticalTabsList=ns;exports.VerticalTabsTrigger=kh;exports.buttonVariants=zi;exports.useEvent=wh;exports.useEventAsync=xh;exports.usePromise=qn;function Oh(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Oh(`.papi-icon-button {
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
.pr-w-10 {
  width: 2.5rem;
}
.pr-w-11 {
  width: 2.75rem;
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
.pr-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
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
.pr-bg-card {
  background-color: hsl(var(--card));
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
.pr-underline {
  text-decoration-line: underline;
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
