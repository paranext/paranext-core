"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const s=require("react/jsx-runtime"),y=require("react"),ne=require("lucide-react"),lr=require("clsx"),Dl=require("tailwind-merge"),ms=require("@radix-ui/react-dropdown-menu"),ee=require("platform-bible-utils"),Al=require("@radix-ui/react-slot"),sn=require("class-variance-authority"),Bl=require("@radix-ui/react-label"),Ll=require("@radix-ui/react-radio-group"),Vl=require("@radix-ui/react-popover"),Oe=require("cmdk"),Fl=require("@radix-ui/react-dialog"),Ne=require("@tanstack/react-table"),zl=require("@radix-ui/react-select"),Gl=require("@radix-ui/react-toggle-group"),Ul=require("@radix-ui/react-toggle"),Hl=require("@radix-ui/react-tabs"),ql=require("@radix-ui/react-separator"),Xl=require("@radix-ui/react-checkbox"),Wn=require("@mui/styled-engine"),Ie=require("@mui/material"),dt=require("react-dom"),hs=require("sonner"),Wl=require("@radix-ui/react-slider"),Yl=require("@radix-ui/react-switch");function Ee(e){const r=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const t in e)if(t!=="default"){const n=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,n.get?n:{enumerable:!0,get:()=>e[t]})}}return r.default=e,Object.freeze(r)}const M=Ee(y),fe=Ee(ms),gs=Ee(Bl),xt=Ee(Ll),kt=Ee(Vl),We=Ee(Fl),be=Ee(zl),ln=Ee(Gl),bs=Ee(Ul),Re=Ee(Hl),vs=Ee(ql),Yn=Ee(Xl),Kl=Ee(dt),ut=Ee(Wl),Kn=Ee(Yl);const Jl=Dl.extendTailwindMerge({prefix:"pr-"});function O(...e){return Jl(lr.clsx(e))}const Kr=y.forwardRef(({className:e,type:r,...t},n)=>s.jsx("input",{type:r,className:O("pr-twp pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:n,...t}));Kr.displayName="Input";const Zl=y.forwardRef(({handleSearch:e,handleKeyDown:r,handleOnClick:t,handleSubmit:n,...o},a)=>s.jsxs("div",{className:"pr-relative",children:[s.jsx(Kr,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-bg-background pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-shadow-none pr-outline-none",onChange:i=>e(i.target.value),onKeyDown:i=>{i.key==="Enter"&&n(),r(i)},onClick:t,ref:a}),s.jsx(ne.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-muted-foreground",onClick:()=>{console.log("back in history")}})]}));var Ql=Object.defineProperty,ep=(e,r,t)=>r in e?Ql(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,oe=(e,r,t)=>ep(e,typeof r!="symbol"?r+"":r,t);const kr=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],po=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ws=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],ca=cp();function Jr(e,r=!0){return r&&(e=e.toUpperCase()),e in ca?ca[e]:0}function co(e){return Jr(e)>0}function rp(e){const r=typeof e=="string"?Jr(e):e;return r>=40&&r<=66}function tp(e){return(typeof e=="string"?Jr(e):e)<=39}function ys(e){return e<=66}function np(e){const r=typeof e=="string"?Jr(e):e;return Ns(r)&&!ys(r)}function*op(){for(let e=1;e<=kr.length;e++)yield e}const ap=1,xs=kr.length;function sp(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function uo(e,r="***"){const t=e-1;return t<0||t>=kr.length?r:kr[t]}function ks(e){return e<=0||e>xs?"******":ws[e-1]}function ip(e){return ks(Jr(e))}function Ns(e){const r=typeof e=="number"?uo(e):e;return co(r)&&!po.includes(r)}function lp(e){const r=typeof e=="number"?uo(e):e;return co(r)&&po.includes(r)}function pp(e){return ws[e-1].includes("*obsolete*")}function cp(){const e={};for(let r=0;r<kr.length;r++)e[kr[r]]=r+1;return e}const de={allBookIds:kr,nonCanonicalIds:po,bookIdToNumber:Jr,isBookIdValid:co,isBookNT:rp,isBookOT:tp,isBookOTNT:ys,isBookDC:np,allBookNumbers:op,firstBook:ap,lastBook:xs,extraBooks:sp,bookNumberToId:uo,bookNumberToEnglishName:ks,bookIdToEnglishName:ip,isCanonical:Ns,isExtraMaterial:lp,isObsolete:pp};var He=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(He||{});const _e=class{constructor(r){if(oe(this,"name"),oe(this,"fullPath"),oe(this,"isPresent"),oe(this,"hasVerseSegments"),oe(this,"isCustomized"),oe(this,"baseVersification"),oe(this,"scriptureBooks"),oe(this,"_type"),r==null)throw new Error("Argument undefined");typeof r=="string"?(this.name=r,this._type=He[r]):(this._type=r,this.name=He[r])}get type(){return this._type}equals(r){return!r.type||!this.type?!1:r.type===this.type}};oe(_e,"Original",new _e(He.Original)),oe(_e,"Septuagint",new _e(He.Septuagint)),oe(_e,"Vulgate",new _e(He.Vulgate)),oe(_e,"English",new _e(He.English)),oe(_e,"RussianProtestant",new _e(He.RussianProtestant)),oe(_e,"RussianOrthodox",new _e(He.RussianOrthodox));let hr=_e;function da(e,r){const t=r[0];for(let n=1;n<r.length;n++)e=e.split(r[n]).join(t);return e.split(t)}var Es=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Es||{});const Te=class ae{constructor(r,t,n,o){if(oe(this,"firstChapter"),oe(this,"lastChapter"),oe(this,"lastVerse"),oe(this,"hasSegmentsDefined"),oe(this,"text"),oe(this,"BBBCCCVVVS"),oe(this,"longHashCode"),oe(this,"versification"),oe(this,"rtlMark","‏"),oe(this,"_bookNum",0),oe(this,"_chapterNum",0),oe(this,"_verseNum",0),oe(this,"_verse"),n==null&&o==null)if(r!=null&&typeof r=="string"){const a=r,i=t!=null&&t instanceof hr?t:void 0;this.setEmpty(i),this.parse(a)}else if(r!=null&&typeof r=="number"){const a=t!=null&&t instanceof hr?t:void 0;this.setEmpty(a),this._verseNum=r%ae.chapterDigitShifter,this._chapterNum=Math.floor(r%ae.bookDigitShifter/ae.chapterDigitShifter),this._bookNum=Math.floor(r/ae.bookDigitShifter)}else if(t==null)if(r!=null&&r instanceof ae){const a=r;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(r==null)return;const a=r instanceof hr?r:ae.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(r!=null&&t!=null&&n!=null)if(typeof r=="string"&&typeof t=="string"&&typeof n=="string")this.setEmpty(o),this.updateInternal(r,t,n);else if(typeof r=="number"&&typeof t=="number"&&typeof n=="number")this._bookNum=r,this._chapterNum=t,this._verseNum=n,this.versification=o??ae.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(r){return r.length>0&&"0123456789".includes(r[0])&&!r.endsWith(this.verseRangeSeparator)&&!r.endsWith(this.verseSequenceIndicator)}static tryParse(r){let t;try{return t=new ae(r),{success:!0,verseRef:t}}catch(n){if(n instanceof at)return t=new ae,{success:!1,verseRef:t};throw n}}static getBBBCCCVVV(r,t,n){return r%ae.bcvMaxValue*ae.bookDigitShifter+(t>=0?t%ae.bcvMaxValue*ae.chapterDigitShifter:0)+(n>=0?n%ae.bcvMaxValue:0)}static fromJSON(r){const{book:t,chapterNum:n,verseNum:o,verse:a,versificationStr:i}=r,l=a||o.toString();let c;return i&&(c=new hr(i)),t?new ae(t,n.toString(),l,c):new ae}static tryGetVerseNum(r){let t;if(!r)return t=-1,{success:!0,vNum:t};t=0;let n;for(let o=0;o<r.length;o++){if(n=r[o],n<"0"||n>"9")return o===0&&(t=-1),{success:!1,vNum:t};if(t=t*10+ +n-0,t>ae.bcvMaxValue)return t=-1,{success:!1,vNum:t}}return{success:!0,vNum:t}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ae.verseRangeSeparator)||this._verse.includes(ae.verseSequenceIndicator))}get book(){return de.bookNumberToId(this.bookNum,"")}set book(r){this.bookNum=de.bookIdToNumber(r)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(r){const t=+r;this._chapterNum=Number.isInteger(t)?t:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(r){const{success:t,vNum:n}=ae.tryGetVerseNum(r);this._verse=t?void 0:r.replace(this.rtlMark,""),this._verseNum=n,!(this._verseNum>=0)&&({vNum:this._verseNum}=ae.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(r){if(r<=0||r>de.lastBook)throw new at("BookNum must be greater than zero and less than or equal to last book");this._bookNum=r}get chapterNum(){return this._chapterNum}set chapterNum(r){this.chapterNum=r}get verseNum(){return this._verseNum}set verseNum(r){this._verseNum=r}get versificationStr(){var r;return(r=this.versification)==null?void 0:r.name}set versificationStr(r){this.versification=this.versification!=null?new hr(r):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ae.verseRangeSeparators,ae.verseSequenceIndicators)}get BBBCCC(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(r){if(r=r.replace(this.rtlMark,""),r.includes("/")){const a=r.split("/");if(r=a[0],a.length>1)try{const i=+a[1].trim();this.versification=new hr(He[i])}catch{throw new at("Invalid reference : "+r)}}const t=r.trim().split(" ");if(t.length!==2)throw new at("Invalid reference : "+r);const n=t[1].split(":"),o=+n[0];if(n.length!==2||de.bookIdToNumber(t[0])===0||!Number.isInteger(o)||o<0||!ae.isVerseParseable(n[1]))throw new at("Invalid reference : "+r);this.updateInternal(t[0],n[0],n[1])}simplify(){this._verse=void 0}clone(){return new ae(this)}toString(){const r=this.book;return r===""?"":`${r} ${this.chapter}:${this.verse}`}toJSON(){let r=this.verse;(r===""||r===this.verseNum.toString())&&(r=void 0);const t={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:r,versificationStr:this.versificationStr};return r||delete t.verse,t}equals(r){return r instanceof ae?r._bookNum===this._bookNum&&r._chapterNum===this._chapterNum&&r._verseNum===this._verseNum&&r.verse===this.verse&&(r.versification==null&&this.versification==null||r.versification!=null&&this.versification!=null&&r.versification.equals(this.versification)):!1}allVerses(r=!1,t=ae.verseRangeSeparators,n=ae.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=da(this._verse,n);for(const i of a.map(l=>da(l,t))){const l=this.clone();l.verse=i[0];const c=l.verseNum;if(o.push(l),i.length>1){const d=this.clone();if(d.verse=i[1],!r)for(let u=c+1;u<d.verseNum;u++){const v=new ae(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||o.push(v)}o.push(d)}}return o}validateVerse(r,t){if(!this.verse)return this.internalValid;let n=0;for(const o of this.allVerses(!0,r,t)){const a=o.internalValid;if(a!==0)return a;const i=o.BBBCCCVVV;if(n>i)return 3;if(n===i)return 4;n=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>de.lastBook?2:(de.isCanonical(this._bookNum),0)}setEmpty(r=ae.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=r}updateInternal(r,t,n){this.bookNum=de.bookIdToNumber(r),this.chapter=t,this.verse=n}};oe(Te,"defaultVersification",hr.English),oe(Te,"verseRangeSeparator","-"),oe(Te,"verseSequenceIndicator",","),oe(Te,"verseRangeSeparators",[Te.verseRangeSeparator]),oe(Te,"verseSequenceIndicators",[Te.verseSequenceIndicator]),oe(Te,"chapterDigitShifter",1e3),oe(Te,"bookDigitShifter",Te.chapterDigitShifter*Te.chapterDigitShifter),oe(Te,"bcvMaxValue",Te.chapterDigitShifter-1),oe(Te,"ValidStatusType",Es);let at=class extends Error{};const pn=fe.Root,fo=fe.Trigger,Ss=fe.Group,dp=fe.Portal,up=fe.Sub,fp=fe.RadioGroup,Ts=y.forwardRef(({className:e,inset:r,children:t,...n},o)=>s.jsxs(fe.SubTrigger,{ref:o,className:O("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",r&&"pr-pl-8",e),...n,children:[t,s.jsx(ne.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Ts.displayName=fe.SubTrigger.displayName;const Cs=y.forwardRef(({className:e,...r},t)=>s.jsx(fe.SubContent,{ref:t,className:O("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r}));Cs.displayName=fe.SubContent.displayName;const Ct=y.forwardRef(({className:e,sideOffset:r=4,...t},n)=>s.jsx(fe.Portal,{children:s.jsx(fe.Content,{ref:n,sideOffset:r,className:O("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t})}));Ct.displayName=fe.Content.displayName;const mo=y.forwardRef(({className:e,inset:r,...t},n)=>s.jsx(fe.Item,{ref:n,className:O("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",r&&"pr-pl-8",e),...t}));mo.displayName=fe.Item.displayName;const cn=y.forwardRef(({className:e,children:r,checked:t,...n},o)=>s.jsxs(fe.CheckboxItem,{ref:o,className:O("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:t,...n,children:[s.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:s.jsx(fe.ItemIndicator,{children:s.jsx(ne.Check,{className:"pr-h-4 pr-w-4"})})}),r]}));cn.displayName=fe.CheckboxItem.displayName;const ho=y.forwardRef(({className:e,children:r,...t},n)=>s.jsxs(fe.RadioItem,{ref:n,className:O("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...t,children:[s.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:s.jsx(fe.ItemIndicator,{children:s.jsx(ne.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),r]}));ho.displayName=fe.RadioItem.displayName;const Zr=y.forwardRef(({className:e,inset:r,...t},n)=>s.jsx(fe.Label,{ref:n,className:O("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",r&&"pr-pl-8",e),...t}));Zr.displayName=fe.Label.displayName;const jt=y.forwardRef(({className:e,...r},t)=>s.jsx(fe.Separator,{ref:t,className:O("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...r}));jt.displayName=fe.Separator.displayName;function js({className:e,...r}){return s.jsx("span",{className:O("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...r})}js.displayName="DropdownMenuShortcut";const mp=y.forwardRef(({bookId:e,handleSelectBook:r,isSelected:t,handleHighlightBook:n,handleKeyDown:o,bookType:a,children:i},l)=>s.jsxs(mo,{ref:l,textValue:e,className:O("pr-mx-1 pr-px-1 pr-font-normal pr-text-foreground/80",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":t}),onSelect:c=>{c.preventDefault(),r()},onKeyDown:c=>{o(c)},onFocus:n,onMouseMove:n,children:[s.jsx("span",{className:O("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":t,"pr-border-l-red-200":a.toLowerCase()==="ot","pr-border-l-purple-200":a.toLowerCase()==="nt","pr-border-l-indigo-200":a.toLowerCase()==="dc"}),children:de.bookIdToEnglishName(e)}),t&&s.jsx("div",{children:i})]},e));function hp({handleSelectChapter:e,endChapter:r,activeChapter:t,highlightedChapter:n,handleHighlightedChapter:o}){const a=Array.from({length:r},(l,c)=>c+1),i=y.useCallback(l=>{o(l)},[o]);return s.jsx("div",{className:O("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:a.map(l=>s.jsx("div",{className:O("pr-box-content pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===t,"pr-bg-amber-200":l===n}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>i(l),children:l},l))})}function gp({handleSort:e,handleLocationHistory:r,handleBookmarks:t}){return s.jsxs(Zr,{className:"pr-flex pr-justify-between",children:[s.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),s.jsxs("div",{className:"pr-flex pr-items-center",children:[s.jsx(ne.ArrowDownWideNarrow,{onClick:e,className:"pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"}),s.jsx(ne.Clock,{onClick:r,className:"pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"}),s.jsx(ne.Bookmark,{onClick:t,className:"pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"})]})]})}const gt=de.allBookIds,bp={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ua=["OT","NT","DC"],vp=32+32+32,wp=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],yp=e=>({OT:gt.filter(t=>de.isBookOT(t)),NT:gt.filter(t=>de.isBookNT(t)),DC:gt.filter(t=>de.isBookDC(t))})[e],st=e=>ee.getChaptersForBook(de.bookIdToNumber(e));function xp(){return gt.map(r=>de.bookIdToEnglishName(r))}function kp(e){return xp().includes(e)}function Np(e){const r=e.toLowerCase().replace(/^\w/,t=>t.toUpperCase());if(kp(r))return gt.find(n=>de.bookIdToEnglishName(n)===r)}function Ep({scrRef:e,handleSubmit:r}){const[t,n]=y.useState(""),[o,a]=y.useState(de.bookNumberToId(e.bookNum)),[i,l]=y.useState(e.chapterNum??0),[c,d]=y.useState(de.bookNumberToId(e.bookNum)),[u,v]=y.useState(!1),[p,h]=y.useState(u),f=y.useRef(void 0),g=y.useRef(void 0),b=y.useRef(void 0),x=y.useCallback(N=>yp(N).filter(A=>{const D=de.bookIdToEnglishName(A).toLowerCase(),J=t.replace(/[^a-zA-Z]/g,"").toLowerCase();return D.includes(J)||A.toLowerCase().includes(J)}),[t]),C=N=>{n(N)},S=y.useRef(!1),k=y.useCallback(N=>{if(S.current){S.current=!1;return}v(N)},[]),w=y.useCallback((N,A,D,J)=>{if(l(de.bookNumberToId(e.bookNum)!==N?1:e.chapterNum),A||st(N)===-1){r({bookNum:de.bookIdToNumber(N),chapterNum:D||1,verseNum:J||1}),v(!1),n("");return}a(o!==N?N:""),v(!A)},[r,e.bookNum,e.chapterNum,o]),j=N=>{N<=0||N>st(o)||w(o,!0,N)},R=y.useCallback(()=>{wp.forEach(N=>{const A=t.match(N);if(A){const[D,J=void 0,K=void 0]=A.slice(1),H=Np(D);(de.isBookIdValid(D)||H)&&w(H??D,!0,J?parseInt(J,10):1,K?parseInt(K,10):1)}})},[w,t]),B=y.useCallback(N=>{u?(N.key==="ArrowDown"||N.key==="ArrowUp")&&(typeof b<"u"&&b.current!==null?b.current.focus():typeof g<"u"&&g.current!==null&&g.current.focus(),N.preventDefault()):v(!0)},[u]),T=N=>{const{key:A}=N;A==="ArrowRight"||A==="ArrowLeft"||A==="ArrowDown"||A==="ArrowUp"||A==="Enter"||(f.current.dispatchEvent(new KeyboardEvent("keydown",{key:A})),f.current.focus())},P=N=>{const{key:A}=N;if(c===o){if(A==="Enter"){N.preventDefault(),w(o,!0,i);return}let D=0;if(A==="ArrowRight")if(i<st(c))D=1;else{N.preventDefault();return}else if(A==="ArrowLeft")if(i>1)D=-1;else{N.preventDefault();return}else A==="ArrowDown"?D=6:A==="ArrowUp"&&(D=-6);i+D<=0||i+D>st(c)?l(0):D!==0&&(l(i+D),N.preventDefault())}};return y.useEffect(()=>{o===c?o===de.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),y.useLayoutEffect(()=>{h(u)},[u]),y.useLayoutEffect(()=>{const N=setTimeout(()=>{if(p&&g.current&&b.current){const D=b.current.offsetTop-vp;g.current.scrollTo({top:D,behavior:"instant"})}},10);return()=>{clearTimeout(N)}},[p]),s.jsx("div",{className:"pr-twp pr-flex",children:s.jsxs(pn,{modal:!1,open:u,onOpenChange:k,children:[s.jsx(fo,{asChild:!0,children:s.jsx(Zl,{ref:f,value:t,handleSearch:C,handleKeyDown:B,handleOnClick:()=>{a(de.bookNumberToId(e.bookNum)),d(de.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),v(!0),f.current.focus()},onFocus:()=>{S.current=!0},handleSubmit:R,placeholder:`${de.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),s.jsxs(Ct,{className:"pr-m-1 pr-overflow-y-auto pr-p-0 pr-font-normal pr-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},onKeyDown:T,align:"start",ref:g,children:[s.jsx(gp,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),ua.map((N,A)=>x(N).length>0&&s.jsxs("div",{children:[s.jsx(Zr,{className:"pr-font-semibold pr-text-foreground/80",children:bp[N]}),x(N).map(D=>s.jsx("div",{children:s.jsx(mp,{bookId:D,handleSelectBook:()=>w(D,!1),isSelected:o===D,handleHighlightBook:()=>d(D),handleKeyDown:P,bookType:N,ref:J=>{o===D&&(b.current=J)},children:s.jsx(hp,{handleSelectChapter:j,endChapter:st(D),activeChapter:e.bookNum===de.bookIdToNumber(D)?e.chapterNum:0,highlightedChapter:i,handleHighlightedChapter:J=>{l(J)}})})},D)),ua.length-1!==A?s.jsx(jt,{}):void 0]},N))]})]})})}const Os=sn.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),ve=y.forwardRef(({className:e,variant:r,size:t,asChild:n=!1,...o},a)=>{const i=n?Al.Slot:"button";return s.jsx(i,{className:O(Os({variant:r,size:t,className:e})),ref:a,...o})});ve.displayName="Button";const Sp=sn.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),qe=y.forwardRef(({className:e,...r},t)=>s.jsx(gs.Root,{ref:t,className:O("pr-twp",Sp(),e),...r}));qe.displayName=gs.Root.displayName;const go=y.forwardRef(({className:e,...r},t)=>s.jsx(xt.Root,{className:O("pr-twp pr-grid pr-gap-2",e),...r,ref:t}));go.displayName=xt.Root.displayName;const Zt=y.forwardRef(({className:e,...r},t)=>s.jsx(xt.Item,{ref:t,className:O("pr-twp pr-aspect-square pr-h-4 pr-w-4 pr-rounded-full pr-border pr-border-primary pr-text-primary pr-ring-offset-background focus:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...r,children:s.jsx(xt.Indicator,{className:"pr-flex pr-items-center pr-justify-center",children:s.jsx(ne.Circle,{className:"pr-h-2.5 pr-w-2.5 pr-fill-current pr-text-current"})})}));Zt.displayName=xt.Item.displayName;const Tp=kt.Root,Cp=kt.Trigger,Rs=y.forwardRef(({className:e,align:r="center",sideOffset:t=4,...n},o)=>s.jsx(kt.Portal,{children:s.jsx(kt.Content,{ref:o,align:r,sideOffset:t,className:O("pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));Rs.displayName=kt.Content.displayName;const jp=We.Portal,Ps=y.forwardRef(({className:e,...r},t)=>s.jsx(We.Overlay,{ref:t,className:O("pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",e),...r}));Ps.displayName=We.Overlay.displayName;const Op=y.forwardRef(({className:e,children:r,...t},n)=>s.jsxs(jp,{children:[s.jsx(Ps,{}),s.jsxs(We.Content,{ref:n,className:O("pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",e),...t,children:[r,s.jsxs(We.Close,{className:"pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground",children:[s.jsx(ne.X,{className:"pr-h-4 pr-w-4"}),s.jsx("span",{className:"pr-sr-only",children:"Close"})]})]})]}));Op.displayName=We.Content.displayName;const Rp=y.forwardRef(({className:e,...r},t)=>s.jsx(We.Title,{ref:t,className:O("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight",e),...r}));Rp.displayName=We.Title.displayName;const Pp=y.forwardRef(({className:e,...r},t)=>s.jsx(We.Description,{ref:t,className:O("pr-text-sm pr-text-muted-foreground",e),...r}));Pp.displayName=We.Description.displayName;const _s=y.forwardRef(({className:e,...r},t)=>s.jsx(Oe.Command,{ref:t,className:O("pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",e),...r}));_s.displayName=Oe.Command.displayName;const $s=y.forwardRef(({className:e,...r},t)=>s.jsxs("div",{className:"pr-flex pr-items-center pr-border-b pr-px-3",children:[s.jsx(ne.Search,{className:"pr-me-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"}),s.jsx(Oe.Command.Input,{ref:t,className:O("pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...r})]}));$s.displayName=Oe.Command.Input.displayName;const Is=y.forwardRef(({className:e,...r},t)=>s.jsx(Oe.Command.List,{ref:t,className:O("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden",e),...r}));Is.displayName=Oe.Command.List.displayName;const Ms=y.forwardRef((e,r)=>s.jsx(Oe.Command.Empty,{ref:r,className:"pr-py-6 pr-text-center pr-text-sm",...e}));Ms.displayName=Oe.Command.Empty.displayName;const _p=y.forwardRef(({className:e,...r},t)=>s.jsx(Oe.Command.Group,{ref:t,className:O("pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",e),...r}));_p.displayName=Oe.Command.Group.displayName;const $p=y.forwardRef(({className:e,...r},t)=>s.jsx(Oe.Command.Separator,{ref:t,className:O("pr--mx-1 pr-h-px pr-bg-border",e),...r}));$p.displayName=Oe.Command.Separator.displayName;const Ds=y.forwardRef(({className:e,...r},t)=>s.jsx(Oe.Command.Item,{ref:t,className:O("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",e),...r}));Ds.displayName=Oe.Command.Item.displayName;function Ip(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function Jn({id:e,options:r=[],className:t,value:n,onChange:o=()=>{},getOptionLabel:a=Ip,buttonPlaceholder:i="",textPlaceholder:l="",commandEmptyMessage:c="No option found",buttonVariant:d="outline",dir:u="ltr",isDisabled:v=!1,...p}){const[h,f]=y.useState(!1);return s.jsxs(Tp,{open:h,onOpenChange:f,...p,children:[s.jsx(Cp,{asChild:!0,children:s.jsxs(ve,{variant:d,role:"combobox","aria-expanded":h,id:e,className:O("pr-w-[200px] pr-justify-between",t),disabled:v,children:[s.jsx("span",{className:"pr-overflow-hidden pr-text-ellipsis pr-whitespace-nowrap",children:n?a(n):i}),s.jsx(ne.ChevronsUpDown,{className:"pr-ms-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"})]})}),s.jsx(Rs,{className:"pr-w-[200px] pr-p-0",dir:u,children:s.jsxs(_s,{children:[s.jsx($s,{dir:u,placeholder:l,className:"pr-text-inherit"}),s.jsx(Ms,{children:c}),s.jsx(Is,{children:r.map(g=>s.jsxs(Ds,{value:a(g),onSelect:()=>{o(g),f(!1)},children:[s.jsx(ne.Check,{className:O("pr-me-2 pr-h-4 pr-w-4",{"pr-opacity-0":!n||a(n)!==a(g)})}),a(g)]},a(g)))})]})})]})}function As({startChapter:e,endChapter:r,handleSelectStartChapter:t,handleSelectEndChapter:n,isDisabled:o=!1,chapterCount:a}){const i=y.useMemo(()=>Array.from({length:a},(d,u)=>u+1),[a]),l=d=>{t(d),d>r&&n(d)},c=d=>{n(d),d<e&&t(d)};return s.jsxs(s.Fragment,{children:[s.jsx(qe,{htmlFor:"start-chapters-combobox",children:"Chapters"}),s.jsx(Jn,{isDisabled:o,onChange:l,className:"pr-ml-2 pr-mr-2 pr-w-20",options:i,getOptionLabel:d=>d.toString(),value:e},"start chapter"),s.jsx(qe,{htmlFor:"end-chapters-combobox",children:"to"}),s.jsx(Jn,{isDisabled:o,onChange:c,className:"pr-ml-2 pr-w-20",options:i,getOptionLabel:d=>d.toString(),value:r},"end chapter")]})}var Bs=(e=>(e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books",e))(Bs||{});const Mp=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Pn=(e,r)=>e[r]??r;function Dp({handleBookSelectionModeChange:e,currentBookName:r,onSelectBooks:t,selectedBookIds:n,chapterCount:o,endChapter:a,handleSelectEndChapter:i,startChapter:l,handleSelectStartChapter:c,localizedStrings:d}){const u=Pn(d,"%webView_bookSelector_currentBook%"),v=Pn(d,"%webView_bookSelector_choose%"),p=Pn(d,"%webView_bookSelector_chooseBooks%"),[h,f]=y.useState("current book"),g=b=>{f(b),e(b)};return s.jsx(go,{className:"pr-twp pr-flex",value:h,onValueChange:b=>g(b),children:s.jsxs("div",{className:"pr-flex pr-w-full pr-flex-col pr-gap-4",children:[s.jsxs("div",{className:"pr-grid pr-grid-cols-[25%,25%,50%]",children:[s.jsxs("div",{className:"pr-flex pr-items-center",children:[s.jsx(Zt,{value:"current book"}),s.jsx(qe,{className:"pr-ml-1",children:u})]}),s.jsx(qe,{className:"pr-flex pr-items-center",children:r}),s.jsx("div",{className:"pr-flex pr-items-center pr-justify-end",children:s.jsx(As,{isDisabled:h==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:i,chapterCount:o,startChapter:l,endChapter:a})})]}),s.jsxs("div",{className:"pr-grid pr-grid-cols-[25%,50%,25%]",children:[s.jsxs("div",{className:"pr-flex pr-items-center",children:[s.jsx(Zt,{value:"choose books"}),s.jsx(qe,{className:"pr-ml-1",children:p})]}),s.jsx(qe,{className:"pr-flex pr-items-center",children:n.map(b=>de.bookIdToEnglishName(b)).join(", ")}),s.jsx(ve,{disabled:h==="current book",onClick:()=>t(),children:v})]})]})})}function Ap({table:e}){return s.jsxs(pn,{children:[s.jsx(ms.DropdownMenuTrigger,{asChild:!0,children:s.jsxs(ve,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[s.jsx(ne.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),s.jsxs(Ct,{align:"end",className:"pr-w-[150px]",children:[s.jsx(Zr,{children:"Toggle columns"}),s.jsx(jt,{}),e.getAllColumns().filter(r=>r.getCanHide()).map(r=>s.jsx(cn,{className:"pr-capitalize",checked:r.getIsVisible(),onCheckedChange:t=>r.toggleVisibility(!!t),children:r.id},r.id))]})]})}const Fr=be.Root,Ls=be.Group,zr=be.Value,Nr=y.forwardRef(({className:e,children:r,...t},n)=>s.jsxs(be.Trigger,{ref:n,className:O("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...t,children:[r,s.jsx(be.Icon,{asChild:!0,children:s.jsx(ne.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));Nr.displayName=be.Trigger.displayName;const bo=y.forwardRef(({className:e,...r},t)=>s.jsx(be.ScrollUpButton,{ref:t,className:O("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...r,children:s.jsx(ne.ChevronUp,{className:"pr-h-4 pr-w-4"})}));bo.displayName=be.ScrollUpButton.displayName;const vo=y.forwardRef(({className:e,...r},t)=>s.jsx(be.ScrollDownButton,{ref:t,className:O("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...r,children:s.jsx(ne.ChevronDown,{className:"pr-h-4 pr-w-4"})}));vo.displayName=be.ScrollDownButton.displayName;const Er=y.forwardRef(({className:e,children:r,position:t="popper",...n},o)=>s.jsx(be.Portal,{children:s.jsxs(be.Content,{ref:o,className:O("pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",t==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:t,...n,children:[s.jsx(bo,{}),s.jsx(be.Viewport,{className:O("pr-p-1",t==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:r}),s.jsx(vo,{})]})}));Er.displayName=be.Content.displayName;const Vs=y.forwardRef(({className:e,...r},t)=>s.jsx(be.Label,{ref:t,className:O("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...r}));Vs.displayName=be.Label.displayName;const Ae=y.forwardRef(({className:e,children:r,...t},n)=>s.jsxs(be.Item,{ref:n,className:O("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...t,children:[s.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:s.jsx(be.ItemIndicator,{children:s.jsx(ne.Check,{className:"pr-h-4 pr-w-4"})})}),s.jsx(be.ItemText,{children:r})]}));Ae.displayName=be.Item.displayName;const Fs=y.forwardRef(({className:e,...r},t)=>s.jsx(be.Separator,{ref:t,className:O("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...r}));Fs.displayName=be.Separator.displayName;function Bp({table:e}){return s.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:s.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[s.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),s.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[s.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),s.jsxs(Fr,{value:`${e.getState().pagination.pageSize}`,onValueChange:r=>{e.setPageSize(Number(r))},children:[s.jsx(Nr,{className:"pr-h-8 pr-w-[70px]",children:s.jsx(zr,{placeholder:e.getState().pagination.pageSize})}),s.jsx(Er,{side:"top",children:[10,20,30,40,50].map(r=>s.jsx(Ae,{value:`${r}`,children:r},r))})]})]}),s.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),s.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[s.jsxs(ve,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[s.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),s.jsx(ne.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),s.jsxs(ve,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[s.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),s.jsx(ne.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),s.jsxs(ve,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[s.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),s.jsx(ne.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),s.jsxs(ve,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[s.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),s.jsx(ne.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}const Ot=y.forwardRef(({className:e,stickyHeader:r,...t},n)=>s.jsx("div",{className:O("pr-twp pr-relative pr-w-full",{"pr-overflow-auto":!r}),children:s.jsx("table",{ref:n,className:O("pr-w-full pr-caption-bottom pr-text-sm",e),...t})}));Ot.displayName="Table";const Rt=y.forwardRef(({className:e,stickyHeader:r,...t},n)=>s.jsx("thead",{ref:n,className:O({"pr-sticky pr-top-0 pr-bg-muted":r},"[&_tr]:pr-border-b",e),...t}));Rt.displayName="TableHeader";const Pt=y.forwardRef(({className:e,...r},t)=>s.jsx("tbody",{ref:t,className:O("[&_tr:last-child]:pr-border-0",e),...r}));Pt.displayName="TableBody";const zs=y.forwardRef(({className:e,...r},t)=>s.jsx("tfoot",{ref:t,className:O("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...r}));zs.displayName="TableFooter";const Qe=y.forwardRef(({className:e,...r},t)=>s.jsx("tr",{ref:t,className:O("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...r}));Qe.displayName="TableRow";const Gr=y.forwardRef(({className:e,...r},t)=>s.jsx("th",{ref:t,className:O("pr-h-12 pr-px-4 pr-text-start pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pe-0",e),...r}));Gr.displayName="TableHead";const Sr=y.forwardRef(({className:e,...r},t)=>s.jsx("td",{ref:t,className:O("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pe-0",e),...r}));Sr.displayName="TableCell";const Gs=y.forwardRef(({className:e,...r},t)=>s.jsx("caption",{ref:t,className:O("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...r}));Gs.displayName="TableCaption";function Us({columns:e,data:r,enablePagination:t=!1,showPaginationControls:n=!1,showColumnVisibilityControls:o=!1,stickyHeader:a=!1,onRowClickHandler:i=()=>{}}){var b;const[l,c]=y.useState([]),[d,u]=y.useState([]),[v,p]=y.useState({}),[h,f]=y.useState({}),g=Ne.useReactTable({data:r,columns:e,getCoreRowModel:Ne.getCoreRowModel(),...t&&{getPaginationRowModel:Ne.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:Ne.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:Ne.getFilteredRowModel(),onColumnVisibilityChange:p,onRowSelectionChange:f,state:{sorting:l,columnFilters:d,columnVisibility:v,rowSelection:h}});return s.jsxs("div",{className:"pr-twp",children:[o&&s.jsx(Ap,{table:g}),s.jsxs(Ot,{stickyHeader:a,children:[s.jsx(Rt,{stickyHeader:a,children:g.getHeaderGroups().map(x=>s.jsx(Qe,{children:x.headers.map(C=>s.jsx(Gr,{children:C.isPlaceholder?void 0:Ne.flexRender(C.column.columnDef.header,C.getContext())},C.id))},x.id))}),s.jsx(Pt,{children:(b=g.getRowModel().rows)!=null&&b.length?g.getRowModel().rows.map(x=>s.jsx(Qe,{onClick:()=>i(x,g),"data-state":x.getIsSelected()&&"selected",children:x.getVisibleCells().map(C=>s.jsx(Sr,{children:Ne.flexRender(C.column.columnDef.cell,C.getContext())},C.id))},x.id)):s.jsx(Qe,{children:s.jsx(Sr,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]}),t&&s.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[s.jsx(ve,{variant:"outline",size:"sm",onClick:()=>g.previousPage(),disabled:!g.getCanPreviousPage(),children:"Previous"}),s.jsx(ve,{variant:"outline",size:"sm",onClick:()=>g.nextPage(),disabled:!g.getCanNextPage(),children:"Next"})]}),t&&n&&s.jsx(Bp,{table:g})]})}const Lp=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),fa=e=>{const r=/^\\[vc]\s+(\d+)/,t=e.match(r);if(t)return+t[1]},ma=(e,r,t,n)=>{if(!e||e===""||r==="")return[];const o=[],a=Lp(e);let i=n.chapterNum,l=n.verseNum,c=0;return a.forEach(d=>{d.startsWith("\\id")&&(i=0,l=0),d.startsWith("\\c")&&(i=fa(d),l=0),d.startsWith("\\v")&&(l=fa(d),i===0&&(i=n.chapterNum));const u=t(d,r);for(let v=0;v<u.length;v++){const p={reference:{...n,chapterNum:i!==void 0?+i:-1,verseNum:l!==void 0?+l:-1},snippet:d,key:c};c+=1,o.push(p)}}),o};function Vp({selectedItem:e,text:r,extractItems:t,scriptureReference:n,setScriptureReference:o,localizedStrings:a}){const i=a["%webView_inventory_occurrences_table_header_reference%"],l=a["%webView_inventory_occurrences_table_header_occurrence%"],[c,d]=y.useState(ma(r,e,t,n));return y.useEffect(()=>d(ma(r,e,t,n)),[r,e,n,t]),s.jsxs(Ot,{stickyHeader:!0,children:[s.jsx(Rt,{stickyHeader:!0,children:s.jsxs(Qe,{children:[s.jsx(Gr,{children:i}),s.jsx(Gr,{children:l})]})}),s.jsx(Pt,{children:c.map(u=>s.jsxs(Qe,{onClick:()=>{o(u.reference)},children:[s.jsx(Sr,{children:`${de.bookNumberToEnglishName(u.reference.bookNum)} ${u.reference.chapterNum}:${u.reference.verseNum}`}),s.jsx(Sr,{children:u.snippet})]},u.key))})]})}const Fp=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),dn=e=>e==="asc"?s.jsx(ne.ArrowUpIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}):e==="desc"?s.jsx(ne.ArrowDownIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}):s.jsx(ne.ArrowUpDownIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}),zp=(e,r,t)=>{let n=e;return r!=="all"&&(n=n.filter(o=>r==="approved"&&o.status==="approved"||r==="unapproved"&&o.status==="unapproved"||r==="unknown"&&o.status==="unknown")),t!==""&&(n=n.filter(o=>o.item.includes(t))),n},Gp=(e,r,t)=>{const n=[],o=r(e);for(let a=0;a<o.length;a++){const i=o[a],l=n.find(c=>c.item===i);if(l)l.count+=1;else{const c={item:i,count:1,status:t(i)};n.push(c)}}return n},or=(e,r)=>e[r]??r;function Up({scriptureReference:e,setScriptureReference:r,localizedStrings:t,extractItems:n,approvedItems:o,onApprovedItemsChange:a,unapprovedItems:i,onUnapprovedItemsChange:l,text:c,scope:d,onScopeChange:u,getColumns:v}){const p=or(t,"%webView_inventory_all%"),h=or(t,"%webView_inventory_approved%"),f=or(t,"%webView_inventory_unapproved%"),g=or(t,"%webView_inventory_unknown%"),b=or(t,"%webView_inventory_scope_currentBook%"),x=or(t,"%webView_inventory_scope_chapter%"),C=or(t,"%webView_inventory_scope_verse%"),S=or(t,"%webView_inventory_filter_text%"),[k,w]=y.useState([]),[j,R]=y.useState("all"),[B,T]=y.useState(""),[P,N]=y.useState(""),A=y.useCallback((V,E)=>{w(z=>{let F=[];return V.forEach(W=>{F=z.map(G=>G.item===W&&G.status!==E?{...G,status:E}:G)}),F});let $=[...o];V.forEach(z=>{E==="approved"?$.includes(z)||$.push(z):$=$.filter(F=>F!==z)}),a($);let q=[...i];V.forEach(z=>{E==="unapproved"?q.includes(z)||q.push(z):q=q.filter(F=>F!==z)}),l(q)},[o,a,i,l]),D=y.useCallback(V=>o.includes(V)?"approved":i.includes(V)?"unapproved":"unknown",[o,i]);y.useEffect(()=>{c&&w(Gp(c,n,D))},[n,c,D]);const J=y.useMemo(()=>zp(k,j,B),[k,j,B]);y.useEffect(()=>{N("")},[J]);const K=(V,E)=>{E.toggleAllRowsSelected(!1),V.toggleSelected(void 0),N(V.getValue("item"))},H=y.useMemo(()=>v(A),[v,A]),te=V=>{if(V==="book"||V==="chapter"||V==="verse")u(V);else throw new Error(`Invalid scope value: ${V}`)},se=V=>{if(V==="all"||V==="approved"||V==="unapproved"||V==="unknown")R(V);else throw new Error(`Invalid status filter value: ${V}`)};return s.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-flex-col",children:[s.jsxs("div",{className:"pr-flex",children:[s.jsxs(Fr,{onValueChange:V=>se(V),defaultValue:j,children:[s.jsx(Nr,{className:"pr-m-1",children:s.jsx(zr,{placeholder:"Select filter"})}),s.jsxs(Er,{children:[s.jsx(Ae,{value:"all",children:p}),s.jsx(Ae,{value:"approved",children:h}),s.jsx(Ae,{value:"unapproved",children:f}),s.jsx(Ae,{value:"unknown",children:g})]})]}),s.jsxs(Fr,{onValueChange:V=>te(V),defaultValue:d,children:[s.jsx(Nr,{className:"pr-m-1",children:s.jsx(zr,{placeholder:"Select scope"})}),s.jsxs(Er,{children:[s.jsx(Ae,{value:"book",children:b}),s.jsx(Ae,{value:"chapter",children:x}),s.jsx(Ae,{value:"verse",children:C})]})]}),s.jsx(Kr,{className:"pr-m-1 pr-rounded-md pr-border",placeholder:S,value:B,onChange:V=>{T(V.target.value)}})]}),s.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:s.jsx(Us,{columns:H,data:J,onRowClickHandler:K,stickyHeader:!0})}),P!==""&&s.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:s.jsx(Vp,{selectedItem:P,text:c,extractItems:n,scriptureReference:e,setScriptureReference:V=>r(V),localizedStrings:t})})]})}const Hs=sn.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors hover:pr-bg-muted hover:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=on]:pr-bg-accent data-[state=on]:pr-text-accent-foreground",{variants:{variant:{default:"pr-bg-transparent",outline:"pr-border pr-border-input pr-bg-transparent hover:pr-bg-accent hover:pr-text-accent-foreground"},size:{default:"pr-h-10 pr-px-3",sm:"pr-h-9 pr-px-2.5",lg:"pr-h-11 pr-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Hp=y.forwardRef(({className:e,variant:r,size:t,...n},o)=>s.jsx(bs.Root,{ref:o,className:O(Hs({variant:r,size:t,className:e})),...n}));Hp.displayName=bs.Root.displayName;const qs=y.createContext({size:"default",variant:"default"}),wo=y.forwardRef(({className:e,variant:r,size:t,children:n,...o},a)=>s.jsx(ln.Root,{ref:a,className:O("pr-twp pr-flex pr-items-center pr-justify-center pr-gap-1",e),...o,children:s.jsx(qs.Provider,{value:{variant:r,size:t},children:n})}));wo.displayName=ln.Root.displayName;const bt=y.forwardRef(({className:e,children:r,variant:t,size:n,...o},a)=>{const i=y.useContext(qs);return s.jsx(ln.Item,{ref:a,className:O(Hs({variant:i.variant||t,size:i.size||n}),e),...o,children:r})});bt.displayName=ln.Item.displayName;const qp=e=>({accessorKey:"item",header:({column:r})=>s.jsxs(ve,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[e,dn(r.getIsSorted())]})}),Xp=e=>({accessorKey:"count",header:({column:r})=>s.jsx("div",{className:"pr-flex pr-justify-end pr-tabular-nums",children:s.jsxs(ve,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[e,dn(r.getIsSorted())]})}),cell:({row:r})=>s.jsx("div",{className:"pr-flex pr-justify-end",children:r.getValue("count")})}),Wp=(e,r)=>({accessorKey:"status",header:({column:t})=>s.jsx("div",{className:"pr-flex pr-justify-center",children:s.jsxs(ve,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,dn(t.getIsSorted())]})}),cell:({row:t})=>{const n=t.getValue("status"),o=t.getValue("item");return s.jsxs(wo,{value:n,variant:"outline",type:"single",children:[s.jsx(bt,{onClick:()=>r([o],"approved"),value:"approved",children:s.jsx(ne.CircleCheckIcon,{})}),s.jsx(bt,{onClick:()=>r([o],"unapproved"),value:"unapproved",children:s.jsx(ne.CircleXIcon,{})}),s.jsx(bt,{onClick:()=>r([o],"unknown"),value:"unknown",children:s.jsx(ne.CircleHelpIcon,{})})]})}});function Xs({onSearch:e,placeholder:r,isFullWidth:t}){const[n,o]=y.useState(""),a=i=>{o(i),e(i)};return s.jsx(Kr,{className:O("pr-flex pr-h-10 pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-[color:hsl(240,5%,64.9%)] focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",{"pr-w-full":t}),placeholder:r,value:n,onChange:i=>a(i.target.value)})}const yo=y.forwardRef(({className:e,...r},t)=>s.jsx(Re.Root,{orientation:"vertical",ref:t,className:O("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...r}));yo.displayName=Re.List.displayName;const xo=y.forwardRef(({className:e,...r},t)=>s.jsx(Re.List,{ref:t,className:O("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...r}));xo.displayName=Re.List.displayName;const Ws=y.forwardRef(({className:e,...r},t)=>s.jsx(Re.Trigger,{ref:t,...r,className:O("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),ko=y.forwardRef(({className:e,...r},t)=>s.jsx(Re.Content,{ref:t,className:O("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...r}));ko.displayName=Re.Content.displayName;function Yp({tabList:e,onSearch:r,searchPlaceholder:t,headerTitle:n,isSearchBarFullWidth:o=!1,direction:a="ltr"}){return s.jsxs("div",{className:"pr-twp",children:[s.jsxs("div",{className:"pr-sticky pr-top-0 pr-space-y-2 pr-pb-2",children:[n?s.jsx("h1",{children:n}):"",s.jsx(Xs,{isFullWidth:o,onSearch:r,placeholder:t})]}),s.jsxs(yo,{dir:a,children:[s.jsx(xo,{children:e.map(i=>s.jsx(Ws,{value:i.value,children:i.value},i.key))}),e.map(i=>s.jsx(ko,{value:i.value,children:i.content},i.key))]})]})}const ir="scrBook",Kp="scrRef",gr="source",Jp="details",Zp="Scripture Reference",Qp="Scripture Book",Ys="Type",ec="Details";function rc(e,r){const t=r??!1;return[{accessorFn:n=>`${de.bookNumberToId(n.start.bookNum)} ${n.start.chapterNum}:${n.start.verseNum}`,id:ir,header:(e==null?void 0:e.scriptureReferenceColumnName)??Zp,cell:n=>{const o=n.row.original;return n.row.getIsGrouped()?de.bookNumberToEnglishName(o.start.bookNum):n.row.groupingColumnId===ir?ee.formatScrRef(o.start):void 0},getGroupingValue:n=>n.start.bookNum,sortingFn:(n,o)=>ee.compareScrRefs(n.original.start,o.original.start),enableGrouping:!0},{accessorFn:n=>ee.formatScrRef(n.start),id:Kp,header:void 0,cell:n=>{const o=n.row.original;return n.row.getIsGrouped()?void 0:ee.formatScrRef(o.start)},sortingFn:(n,o)=>ee.compareScrRefs(n.original.start,o.original.start),enableGrouping:!1},{accessorFn:n=>n.source.displayName,id:gr,header:t?(e==null?void 0:e.typeColumnName)??Ys:void 0,cell:n=>t||n.row.getIsGrouped()?n.getValue():void 0,getGroupingValue:n=>n.source.id,sortingFn:(n,o)=>n.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:n=>n.detail,id:Jp,header:(e==null?void 0:e.detailsColumnName)??ec,cell:n=>n.getValue(),enableGrouping:!1}]}const tc=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:r}=e.start;let t=0;return e.end&&({offset:t}=e.end),!e.end||ee.compareScrRefs(e.start,e.end)===0?`${ee.scrRefToBBBCCCVVV(e.start)}+${r}`:`${ee.scrRefToBBBCCCVVV(e.start)}+${r}-${ee.scrRefToBBBCCCVVV(e.end)}+${t}`},ha=e=>`${tc({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function nc({sources:e,showColumnHeaders:r=!1,showSourceColumn:t=!1,scriptureReferenceColumnName:n,scriptureBookGroupName:o,typeColumnName:a,detailsColumnName:i,onRowSelected:l,direction:c="ltr"}){const[d,u]=y.useState([]),[v,p]=y.useState([{id:ir,desc:!1}]),[h,f]=y.useState({}),g=y.useMemo(()=>e.flatMap(T=>T.data.map(P=>({...P,source:T.source}))),[e]),b=y.useMemo(()=>rc({scriptureReferenceColumnName:n,typeColumnName:a,detailsColumnName:i},t),[n,a,i,t]);y.useEffect(()=>{d.includes(gr)?p([{id:gr,desc:!1},{id:ir,desc:!1}]):p([{id:ir,desc:!1}])},[d]);const x=Ne.useReactTable({data:g,columns:b,state:{grouping:d,sorting:v,rowSelection:h},onGroupingChange:u,onSortingChange:p,onRowSelectionChange:f,getExpandedRowModel:Ne.getExpandedRowModel(),getGroupedRowModel:Ne.getGroupedRowModel(),getCoreRowModel:Ne.getCoreRowModel(),getSortedRowModel:Ne.getSortedRowModel(),getRowId:ha,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});y.useEffect(()=>{if(l){const T=x.getSelectedRowModel().rowsById,P=Object.keys(T);if(P.length===1){const N=g.find(A=>ha(A)===P[0])||void 0;N&&l(N)}}},[h,g,l,x]);const C=o??Qp,S=a??Ys,k=[{label:"No Grouping",value:[]},{label:`Group by ${C}`,value:[ir]},{label:`Group by ${S}`,value:[gr]},{label:`Group by ${C} and ${S}`,value:[ir,gr]},{label:`Group by ${S} and ${C}`,value:[gr,ir]}],w=T=>{u(JSON.parse(T))},j=(T,P)=>{!T.getIsGrouped()&&!T.getIsSelected()&&T.getToggleSelectedHandler()(P)},R=(T,P)=>T.getIsGrouped()?"":O("banded-row",P%2===0?"even":"odd"),B=(T,P,N)=>{if(!((T==null?void 0:T.length)===0||P.depth<N.column.getGroupedIndex())){if(P.getIsGrouped())switch(P.depth){case 1:return"pr-ps-4";default:return}switch(P.depth){case 1:return"pr-ps-8";case 2:return"pr-ps-12";default:return}}};return s.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-w-full pr-flex-col",children:[!r&&s.jsxs(Fr,{value:JSON.stringify(d),onValueChange:T=>{w(T)},children:[s.jsx(Nr,{className:"pr-mb-1 pr-mt-2",children:s.jsx(zr,{})}),s.jsx(Er,{position:"item-aligned",children:s.jsx(Ls,{children:k.map(T=>s.jsx(Ae,{value:JSON.stringify(T.value),children:T.label},T.label))})})]}),s.jsxs(Ot,{className:"pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0",children:[r&&s.jsx(Rt,{children:x.getHeaderGroups().map(T=>s.jsx(Qe,{children:T.headers.filter(P=>P.column.columnDef.header).map(P=>s.jsx(Gr,{colSpan:P.colSpan,className:"top-0 pr-sticky",children:P.isPlaceholder?void 0:s.jsxs("div",{children:[P.column.getCanGroup()?s.jsx(ve,{variant:"ghost",title:`Toggle grouping by ${P.column.columnDef.header}`,onClick:P.column.getToggleGroupingHandler(),type:"button",children:P.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Ne.flexRender(P.column.columnDef.header,P.getContext())]})},P.id))},T.id))}),s.jsx(Pt,{children:x.getRowModel().rows.map((T,P)=>s.jsx(Qe,{"data-state":T.getIsSelected()?"selected":"",className:O(R(T,P)),onClick:N=>j(T,N),children:T.getVisibleCells().map(N=>{if(!(N.getIsPlaceholder()||N.column.columnDef.enableGrouping&&!N.getIsGrouped()&&(N.column.columnDef.id!==gr||!t)))return s.jsx(Sr,{className:O(N.column.columnDef.id,"pr-p-[1px]",B(d,T,N)),children:(()=>N.getIsGrouped()?s.jsxs(ve,{variant:"link",onClick:T.getToggleExpandedHandler(),type:"button",children:[T.getIsExpanded()&&s.jsx(ne.ChevronDown,{}),!T.getIsExpanded()&&(c==="ltr"?s.jsx(ne.ChevronRight,{}):s.jsx(ne.ChevronLeft,{}))," ",Ne.flexRender(N.column.columnDef.cell,N.getContext())," (",T.subRows.length,")"]}):Ne.flexRender(N.column.columnDef.cell,N.getContext()))()},N.id)})},T.id))})]})]})}const _n={[ee.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[ee.getLocalizeKeyForScrollGroupId(0)]:"A",[ee.getLocalizeKeyForScrollGroupId(1)]:"B",[ee.getLocalizeKeyForScrollGroupId(2)]:"C",[ee.getLocalizeKeyForScrollGroupId(3)]:"D",[ee.getLocalizeKeyForScrollGroupId(4)]:"E",[ee.getLocalizeKeyForScrollGroupId(5)]:"F",[ee.getLocalizeKeyForScrollGroupId(6)]:"G",[ee.getLocalizeKeyForScrollGroupId(7)]:"H",[ee.getLocalizeKeyForScrollGroupId(8)]:"I",[ee.getLocalizeKeyForScrollGroupId(9)]:"J",[ee.getLocalizeKeyForScrollGroupId(10)]:"K",[ee.getLocalizeKeyForScrollGroupId(11)]:"L",[ee.getLocalizeKeyForScrollGroupId(12)]:"M",[ee.getLocalizeKeyForScrollGroupId(13)]:"N",[ee.getLocalizeKeyForScrollGroupId(14)]:"O",[ee.getLocalizeKeyForScrollGroupId(15)]:"P",[ee.getLocalizeKeyForScrollGroupId(16)]:"Q",[ee.getLocalizeKeyForScrollGroupId(17)]:"R",[ee.getLocalizeKeyForScrollGroupId(18)]:"S",[ee.getLocalizeKeyForScrollGroupId(19)]:"T",[ee.getLocalizeKeyForScrollGroupId(20)]:"U",[ee.getLocalizeKeyForScrollGroupId(21)]:"V",[ee.getLocalizeKeyForScrollGroupId(22)]:"W",[ee.getLocalizeKeyForScrollGroupId(23)]:"X",[ee.getLocalizeKeyForScrollGroupId(24)]:"Y",[ee.getLocalizeKeyForScrollGroupId(25)]:"Z"};function oc({availableScrollGroupIds:e,scrollGroupId:r,onChangeScrollGroupId:t,localizedStrings:n={}}){const o={..._n,...Object.fromEntries(Object.entries(n).map(([a,i])=>[a,a===i&&a in _n?_n[a]:i]))};return s.jsxs(Fr,{value:`${r}`,onValueChange:a=>t(a==="undefined"?void 0:parseInt(a,10)),children:[s.jsx(Nr,{className:"pr-twp pr-w-auto",children:s.jsx(zr,{placeholder:o[ee.getLocalizeKeyForScrollGroupId(r)]??r})}),s.jsx(Er,{style:{zIndex:250},children:e.map(a=>s.jsx(Ae,{value:`${a}`,children:o[ee.getLocalizeKeyForScrollGroupId(a)]},`${a}`))})]})}const No=y.forwardRef(({className:e,orientation:r="horizontal",decorative:t=!0,...n},o)=>s.jsx(vs.Root,{ref:o,decorative:t,orientation:r,className:O("pr-twp pr-shrink-0 pr-bg-border",r==="horizontal"?"pr-h-[1px] pr-w-full":"pr-h-full pr-w-[1px]",e),...n}));No.displayName=vs.Root.displayName;function ac({children:e}){return s.jsx("div",{className:"pr-twp pr-grid",children:e})}function sc({primary:e,secondary:r,children:t,isLoading:n=!1,loadingMessage:o}){return s.jsxs("div",{className:"pr-flex pr-items-center pr-justify-between pr-space-x-4 pr-py-2",children:[s.jsxs("div",{children:[s.jsx("p",{className:"pr-text-sm pr-font-medium pr-leading-none",children:e}),s.jsx("p",{className:"pr-whitespace-normal pr-break-words pr-text-sm pr-text-muted-foreground",children:r})]}),n?s.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:o}):s.jsx("div",{children:t})]})}function ic({primary:e,secondary:r,includeSeparator:t=!1}){return s.jsxs("div",{className:"pr-space-y-4 pr-py-2",children:[s.jsxs("div",{children:[s.jsx("h3",{className:"pr-text-lg pr-font-medium",children:e}),s.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:r})]}),t?s.jsx(No,{}):""]})}const Eo=y.forwardRef(({className:e,...r},t)=>s.jsx(Yn.Root,{ref:t,className:O("pr-peer pr-twp pr-h-4 pr-w-4 pr-shrink-0 pr-rounded-sm pr-border pr-border-primary pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=checked]:pr-text-primary-foreground",e),...r,children:s.jsx(Yn.Indicator,{className:O("pr-flex pr-items-center pr-justify-center pr-text-current"),children:s.jsx(ne.Check,{className:"pr-h-4 pr-w-4"})})}));Eo.displayName=Yn.Root.displayName;function lc({id:e,className:r,listItems:t,selectedListItems:n,handleSelectListItem:o,createLabel:a}){return s.jsx("div",{id:e,className:r,children:t.map(i=>s.jsxs("div",{className:"pr-m-2 pr-flex pr-items-center",children:[s.jsx(Eo,{className:"pr-mr-2 pr-align-middle",checked:n.includes(i),onCheckedChange:l=>o(i,l)}),s.jsx(qe,{children:a?a(i):i})]},i))})}function pc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function cc(e){if(e.__esModule)return e;var r=e.default;if(typeof r=="function"){var t=function n(){return this instanceof n?Reflect.construct(r,arguments,this.constructor):r.apply(this,arguments)};t.prototype=r.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(e).forEach(function(n){var o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,o.get?o:{enumerable:!0,get:function(){return e[n]}})}),t}var So={},Ks={exports:{}};(function(e){function r(t){return t&&t.__esModule?t:{default:t}}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports})(Ks);var dc=Ks.exports,$n={};function To(e,r){return process.env.NODE_ENV==="production"?()=>null:function(...n){return e(...n)||r(...n)}}function _(){return _=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},_.apply(this,arguments)}function wr(e){if(typeof e!="object"||e===null)return!1;const r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype||Object.getPrototypeOf(r)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Js(e){if(!wr(e))return e;const r={};return Object.keys(e).forEach(t=>{r[t]=Js(e[t])}),r}function er(e,r,t={clone:!0}){const n=t.clone?_({},e):e;return wr(e)&&wr(r)&&Object.keys(r).forEach(o=>{o!=="__proto__"&&(wr(r[o])&&o in e&&wr(e[o])?n[o]=er(e[o],r[o],t):t.clone?n[o]=wr(r[o])?Js(r[o]):r[o]:n[o]=r[o])}),n}var Zn={exports:{}},zt={exports:{}},ie={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ga;function uc(){if(ga)return ie;ga=1;var e=typeof Symbol=="function"&&Symbol.for,r=e?Symbol.for("react.element"):60103,t=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,h=e?Symbol.for("react.memo"):60115,f=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,C=e?Symbol.for("react.scope"):60119;function S(w){if(typeof w=="object"&&w!==null){var j=w.$$typeof;switch(j){case r:switch(w=w.type,w){case c:case d:case n:case a:case o:case v:return w;default:switch(w=w&&w.$$typeof,w){case l:case u:case f:case h:case i:return w;default:return j}}case t:return j}}}function k(w){return S(w)===d}return ie.AsyncMode=c,ie.ConcurrentMode=d,ie.ContextConsumer=l,ie.ContextProvider=i,ie.Element=r,ie.ForwardRef=u,ie.Fragment=n,ie.Lazy=f,ie.Memo=h,ie.Portal=t,ie.Profiler=a,ie.StrictMode=o,ie.Suspense=v,ie.isAsyncMode=function(w){return k(w)||S(w)===c},ie.isConcurrentMode=k,ie.isContextConsumer=function(w){return S(w)===l},ie.isContextProvider=function(w){return S(w)===i},ie.isElement=function(w){return typeof w=="object"&&w!==null&&w.$$typeof===r},ie.isForwardRef=function(w){return S(w)===u},ie.isFragment=function(w){return S(w)===n},ie.isLazy=function(w){return S(w)===f},ie.isMemo=function(w){return S(w)===h},ie.isPortal=function(w){return S(w)===t},ie.isProfiler=function(w){return S(w)===a},ie.isStrictMode=function(w){return S(w)===o},ie.isSuspense=function(w){return S(w)===v},ie.isValidElementType=function(w){return typeof w=="string"||typeof w=="function"||w===n||w===d||w===a||w===o||w===v||w===p||typeof w=="object"&&w!==null&&(w.$$typeof===f||w.$$typeof===h||w.$$typeof===i||w.$$typeof===l||w.$$typeof===u||w.$$typeof===b||w.$$typeof===x||w.$$typeof===C||w.$$typeof===g)},ie.typeOf=S,ie}var le={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ba;function fc(){return ba||(ba=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,r=e?Symbol.for("react.element"):60103,t=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,h=e?Symbol.for("react.memo"):60115,f=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,C=e?Symbol.for("react.scope"):60119;function S(I){return typeof I=="string"||typeof I=="function"||I===n||I===d||I===a||I===o||I===v||I===p||typeof I=="object"&&I!==null&&(I.$$typeof===f||I.$$typeof===h||I.$$typeof===i||I.$$typeof===l||I.$$typeof===u||I.$$typeof===b||I.$$typeof===x||I.$$typeof===C||I.$$typeof===g)}function k(I){if(typeof I=="object"&&I!==null){var xe=I.$$typeof;switch(xe){case r:var L=I.type;switch(L){case c:case d:case n:case a:case o:case v:return L;default:var ye=L&&L.$$typeof;switch(ye){case l:case u:case f:case h:case i:return ye;default:return xe}}case t:return xe}}}var w=c,j=d,R=l,B=i,T=r,P=u,N=n,A=f,D=h,J=t,K=a,H=o,te=v,se=!1;function V(I){return se||(se=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),E(I)||k(I)===c}function E(I){return k(I)===d}function $(I){return k(I)===l}function q(I){return k(I)===i}function z(I){return typeof I=="object"&&I!==null&&I.$$typeof===r}function F(I){return k(I)===u}function W(I){return k(I)===n}function G(I){return k(I)===f}function Y(I){return k(I)===h}function X(I){return k(I)===t}function Z(I){return k(I)===a}function Q(I){return k(I)===o}function ue(I){return k(I)===v}le.AsyncMode=w,le.ConcurrentMode=j,le.ContextConsumer=R,le.ContextProvider=B,le.Element=T,le.ForwardRef=P,le.Fragment=N,le.Lazy=A,le.Memo=D,le.Portal=J,le.Profiler=K,le.StrictMode=H,le.Suspense=te,le.isAsyncMode=V,le.isConcurrentMode=E,le.isContextConsumer=$,le.isContextProvider=q,le.isElement=z,le.isForwardRef=F,le.isFragment=W,le.isLazy=G,le.isMemo=Y,le.isPortal=X,le.isProfiler=Z,le.isStrictMode=Q,le.isSuspense=ue,le.isValidElementType=S,le.typeOf=k}()),le}var va;function Zs(){return va||(va=1,process.env.NODE_ENV==="production"?zt.exports=uc():zt.exports=fc()),zt.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var In,wa;function mc(){if(wa)return In;wa=1;var e=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable;function n(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var i={},l=0;l<10;l++)i["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(i).map(function(u){return i[u]});if(c.join("")!=="0123456789")return!1;var d={};return"abcdefghijklmnopqrst".split("").forEach(function(u){d[u]=u}),Object.keys(Object.assign({},d)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return In=o()?Object.assign:function(a,i){for(var l,c=n(a),d,u=1;u<arguments.length;u++){l=Object(arguments[u]);for(var v in l)r.call(l,v)&&(c[v]=l[v]);if(e){d=e(l);for(var p=0;p<d.length;p++)t.call(l,d[p])&&(c[d[p]]=l[d[p]])}}return c},In}var Mn,ya;function Co(){if(ya)return Mn;ya=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Mn=e,Mn}var Dn,xa;function Qs(){return xa||(xa=1,Dn=Function.call.bind(Object.prototype.hasOwnProperty)),Dn}var An,ka;function hc(){if(ka)return An;ka=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var r=Co(),t={},n=Qs();e=function(a){var i="Warning: "+a;typeof console<"u"&&console.error(i);try{throw new Error(i)}catch{}}}function o(a,i,l,c,d){if(process.env.NODE_ENV!=="production"){for(var u in a)if(n(a,u)){var v;try{if(typeof a[u]!="function"){var p=Error((c||"React class")+": "+l+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw p.name="Invariant Violation",p}v=a[u](i,u,c,l,null,r)}catch(f){v=f}if(v&&!(v instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+u+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof v+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),v instanceof Error&&!(v.message in t)){t[v.message]=!0;var h=d?d():"";e("Failed "+l+" type: "+v.message+(h??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(t={})},An=o,An}var Bn,Na;function gc(){if(Na)return Bn;Na=1;var e=Zs(),r=mc(),t=Co(),n=Qs(),o=hc(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function i(){return null}return Bn=function(l,c){var d=typeof Symbol=="function"&&Symbol.iterator,u="@@iterator";function v(E){var $=E&&(d&&E[d]||E[u]);if(typeof $=="function")return $}var p="<<anonymous>>",h={array:x("array"),bigint:x("bigint"),bool:x("boolean"),func:x("function"),number:x("number"),object:x("object"),string:x("string"),symbol:x("symbol"),any:C(),arrayOf:S,element:k(),elementType:w(),instanceOf:j,node:P(),objectOf:B,oneOf:R,oneOfType:T,shape:A,exact:D};function f(E,$){return E===$?E!==0||1/E===1/$:E!==E&&$!==$}function g(E,$){this.message=E,this.data=$&&typeof $=="object"?$:{},this.stack=""}g.prototype=Error.prototype;function b(E){if(process.env.NODE_ENV!=="production")var $={},q=0;function z(W,G,Y,X,Z,Q,ue){if(X=X||p,Q=Q||Y,ue!==t){if(c){var I=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw I.name="Invariant Violation",I}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var xe=X+":"+Y;!$[xe]&&q<3&&(a("You are manually calling a React.PropTypes validation function for the `"+Q+"` prop on `"+X+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),$[xe]=!0,q++)}}return G[Y]==null?W?G[Y]===null?new g("The "+Z+" `"+Q+"` is marked as required "+("in `"+X+"`, but its value is `null`.")):new g("The "+Z+" `"+Q+"` is marked as required in "+("`"+X+"`, but its value is `undefined`.")):null:E(G,Y,X,Z,Q)}var F=z.bind(null,!1);return F.isRequired=z.bind(null,!0),F}function x(E){function $(q,z,F,W,G,Y){var X=q[z],Z=H(X);if(Z!==E){var Q=te(X);return new g("Invalid "+W+" `"+G+"` of type "+("`"+Q+"` supplied to `"+F+"`, expected ")+("`"+E+"`."),{expectedType:E})}return null}return b($)}function C(){return b(i)}function S(E){function $(q,z,F,W,G){if(typeof E!="function")return new g("Property `"+G+"` of component `"+F+"` has invalid PropType notation inside arrayOf.");var Y=q[z];if(!Array.isArray(Y)){var X=H(Y);return new g("Invalid "+W+" `"+G+"` of type "+("`"+X+"` supplied to `"+F+"`, expected an array."))}for(var Z=0;Z<Y.length;Z++){var Q=E(Y,Z,F,W,G+"["+Z+"]",t);if(Q instanceof Error)return Q}return null}return b($)}function k(){function E($,q,z,F,W){var G=$[q];if(!l(G)){var Y=H(G);return new g("Invalid "+F+" `"+W+"` of type "+("`"+Y+"` supplied to `"+z+"`, expected a single ReactElement."))}return null}return b(E)}function w(){function E($,q,z,F,W){var G=$[q];if(!e.isValidElementType(G)){var Y=H(G);return new g("Invalid "+F+" `"+W+"` of type "+("`"+Y+"` supplied to `"+z+"`, expected a single ReactElement type."))}return null}return b(E)}function j(E){function $(q,z,F,W,G){if(!(q[z]instanceof E)){var Y=E.name||p,X=V(q[z]);return new g("Invalid "+W+" `"+G+"` of type "+("`"+X+"` supplied to `"+F+"`, expected ")+("instance of `"+Y+"`."))}return null}return b($)}function R(E){if(!Array.isArray(E))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),i;function $(q,z,F,W,G){for(var Y=q[z],X=0;X<E.length;X++)if(f(Y,E[X]))return null;var Z=JSON.stringify(E,function(ue,I){var xe=te(I);return xe==="symbol"?String(I):I});return new g("Invalid "+W+" `"+G+"` of value `"+String(Y)+"` "+("supplied to `"+F+"`, expected one of "+Z+"."))}return b($)}function B(E){function $(q,z,F,W,G){if(typeof E!="function")return new g("Property `"+G+"` of component `"+F+"` has invalid PropType notation inside objectOf.");var Y=q[z],X=H(Y);if(X!=="object")return new g("Invalid "+W+" `"+G+"` of type "+("`"+X+"` supplied to `"+F+"`, expected an object."));for(var Z in Y)if(n(Y,Z)){var Q=E(Y,Z,F,W,G+"."+Z,t);if(Q instanceof Error)return Q}return null}return b($)}function T(E){if(!Array.isArray(E))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),i;for(var $=0;$<E.length;$++){var q=E[$];if(typeof q!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+se(q)+" at index "+$+"."),i}function z(F,W,G,Y,X){for(var Z=[],Q=0;Q<E.length;Q++){var ue=E[Q],I=ue(F,W,G,Y,X,t);if(I==null)return null;I.data&&n(I.data,"expectedType")&&Z.push(I.data.expectedType)}var xe=Z.length>0?", expected one of type ["+Z.join(", ")+"]":"";return new g("Invalid "+Y+" `"+X+"` supplied to "+("`"+G+"`"+xe+"."))}return b(z)}function P(){function E($,q,z,F,W){return J($[q])?null:new g("Invalid "+F+" `"+W+"` supplied to "+("`"+z+"`, expected a ReactNode."))}return b(E)}function N(E,$,q,z,F){return new g((E||"React class")+": "+$+" type `"+q+"."+z+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+F+"`.")}function A(E){function $(q,z,F,W,G){var Y=q[z],X=H(Y);if(X!=="object")return new g("Invalid "+W+" `"+G+"` of type `"+X+"` "+("supplied to `"+F+"`, expected `object`."));for(var Z in E){var Q=E[Z];if(typeof Q!="function")return N(F,W,G,Z,te(Q));var ue=Q(Y,Z,F,W,G+"."+Z,t);if(ue)return ue}return null}return b($)}function D(E){function $(q,z,F,W,G){var Y=q[z],X=H(Y);if(X!=="object")return new g("Invalid "+W+" `"+G+"` of type `"+X+"` "+("supplied to `"+F+"`, expected `object`."));var Z=r({},q[z],E);for(var Q in Z){var ue=E[Q];if(n(E,Q)&&typeof ue!="function")return N(F,W,G,Q,te(ue));if(!ue)return new g("Invalid "+W+" `"+G+"` key `"+Q+"` supplied to `"+F+"`.\nBad object: "+JSON.stringify(q[z],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(E),null,"  "));var I=ue(Y,Q,F,W,G+"."+Q,t);if(I)return I}return null}return b($)}function J(E){switch(typeof E){case"number":case"string":case"undefined":return!0;case"boolean":return!E;case"object":if(Array.isArray(E))return E.every(J);if(E===null||l(E))return!0;var $=v(E);if($){var q=$.call(E),z;if($!==E.entries){for(;!(z=q.next()).done;)if(!J(z.value))return!1}else for(;!(z=q.next()).done;){var F=z.value;if(F&&!J(F[1]))return!1}}else return!1;return!0;default:return!1}}function K(E,$){return E==="symbol"?!0:$?$["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&$ instanceof Symbol:!1}function H(E){var $=typeof E;return Array.isArray(E)?"array":E instanceof RegExp?"object":K($,E)?"symbol":$}function te(E){if(typeof E>"u"||E===null)return""+E;var $=H(E);if($==="object"){if(E instanceof Date)return"date";if(E instanceof RegExp)return"regexp"}return $}function se(E){var $=te(E);switch($){case"array":case"object":return"an "+$;case"boolean":case"date":case"regexp":return"a "+$;default:return $}}function V(E){return!E.constructor||!E.constructor.name?p:E.constructor.name}return h.checkPropTypes=o,h.resetWarningCache=o.resetWarningCache,h.PropTypes=h,h},Bn}var Ln,Ea;function bc(){if(Ea)return Ln;Ea=1;var e=Co();function r(){}function t(){}return t.resetWarningCache=r,Ln=function(){function n(i,l,c,d,u,v){if(v!==e){var p=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw p.name="Invariant Violation",p}}n.isRequired=n;function o(){return n}var a={array:n,bigint:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:o,element:n,elementType:n,instanceOf:o,node:n,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:t,resetWarningCache:r};return a.PropTypes=a,a},Ln}if(process.env.NODE_ENV!=="production"){var vc=Zs(),wc=!0;Zn.exports=gc()(vc.isElement,wc)}else Zn.exports=bc()();var yc=Zn.exports;const m=pc(yc);function xc(e){const{prototype:r={}}=e;return!!r.isReactComponent}function ei(e,r,t,n,o){const a=e[r],i=o||r;if(a==null||typeof window>"u")return null;let l;const c=a.type;return typeof c=="function"&&!xc(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${n} \`${i}\` supplied to \`${t}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const ri=To(m.element,ei);ri.isRequired=To(m.element.isRequired,ei);const ti=ri,kc="exact-prop: ​";function Nc(e){return process.env.NODE_ENV==="production"?e:_({},e,{[kc]:r=>{const t=Object.keys(r).filter(n=>!e.hasOwnProperty(n));return t.length>0?new Error(`The following props are not supported: ${t.map(n=>`\`${n}\``).join(", ")}. Please remove them.`):null}})}function Ur(e){let r="https://mui.com/production-error/?code="+e;for(let t=1;t<arguments.length;t+=1)r+="&args[]="+encodeURIComponent(arguments[t]);return"Minified MUI error #"+e+"; visit "+r+" for the full message."}var Qn={exports:{}},pe={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sa;function Ec(){if(Sa)return pe;Sa=1;var e=Symbol.for("react.element"),r=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),h=Symbol.for("react.offscreen"),f;f=Symbol.for("react.module.reference");function g(b){if(typeof b=="object"&&b!==null){var x=b.$$typeof;switch(x){case e:switch(b=b.type,b){case t:case o:case n:case d:case u:return b;default:switch(b=b&&b.$$typeof,b){case l:case i:case c:case p:case v:case a:return b;default:return x}}case r:return x}}}return pe.ContextConsumer=i,pe.ContextProvider=a,pe.Element=e,pe.ForwardRef=c,pe.Fragment=t,pe.Lazy=p,pe.Memo=v,pe.Portal=r,pe.Profiler=o,pe.StrictMode=n,pe.Suspense=d,pe.SuspenseList=u,pe.isAsyncMode=function(){return!1},pe.isConcurrentMode=function(){return!1},pe.isContextConsumer=function(b){return g(b)===i},pe.isContextProvider=function(b){return g(b)===a},pe.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===e},pe.isForwardRef=function(b){return g(b)===c},pe.isFragment=function(b){return g(b)===t},pe.isLazy=function(b){return g(b)===p},pe.isMemo=function(b){return g(b)===v},pe.isPortal=function(b){return g(b)===r},pe.isProfiler=function(b){return g(b)===o},pe.isStrictMode=function(b){return g(b)===n},pe.isSuspense=function(b){return g(b)===d},pe.isSuspenseList=function(b){return g(b)===u},pe.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===t||b===o||b===n||b===d||b===u||b===h||typeof b=="object"&&b!==null&&(b.$$typeof===p||b.$$typeof===v||b.$$typeof===a||b.$$typeof===i||b.$$typeof===c||b.$$typeof===f||b.getModuleId!==void 0)},pe.typeOf=g,pe}var ce={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ta;function Sc(){return Ta||(Ta=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),r=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),h=Symbol.for("react.offscreen"),f=!1,g=!1,b=!1,x=!1,C=!1,S;S=Symbol.for("react.module.reference");function k(L){return!!(typeof L=="string"||typeof L=="function"||L===t||L===o||C||L===n||L===d||L===u||x||L===h||f||g||b||typeof L=="object"&&L!==null&&(L.$$typeof===p||L.$$typeof===v||L.$$typeof===a||L.$$typeof===i||L.$$typeof===c||L.$$typeof===S||L.getModuleId!==void 0))}function w(L){if(typeof L=="object"&&L!==null){var ye=L.$$typeof;switch(ye){case e:var Ge=L.type;switch(Ge){case t:case o:case n:case d:case u:return Ge;default:var ur=Ge&&Ge.$$typeof;switch(ur){case l:case i:case c:case p:case v:case a:return ur;default:return ye}}case r:return ye}}}var j=i,R=a,B=e,T=c,P=t,N=p,A=v,D=r,J=o,K=n,H=d,te=u,se=!1,V=!1;function E(L){return se||(se=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function $(L){return V||(V=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function q(L){return w(L)===i}function z(L){return w(L)===a}function F(L){return typeof L=="object"&&L!==null&&L.$$typeof===e}function W(L){return w(L)===c}function G(L){return w(L)===t}function Y(L){return w(L)===p}function X(L){return w(L)===v}function Z(L){return w(L)===r}function Q(L){return w(L)===o}function ue(L){return w(L)===n}function I(L){return w(L)===d}function xe(L){return w(L)===u}ce.ContextConsumer=j,ce.ContextProvider=R,ce.Element=B,ce.ForwardRef=T,ce.Fragment=P,ce.Lazy=N,ce.Memo=A,ce.Portal=D,ce.Profiler=J,ce.StrictMode=K,ce.Suspense=H,ce.SuspenseList=te,ce.isAsyncMode=E,ce.isConcurrentMode=$,ce.isContextConsumer=q,ce.isContextProvider=z,ce.isElement=F,ce.isForwardRef=W,ce.isFragment=G,ce.isLazy=Y,ce.isMemo=X,ce.isPortal=Z,ce.isProfiler=Q,ce.isStrictMode=ue,ce.isSuspense=I,ce.isSuspenseList=xe,ce.isValidElementType=k,ce.typeOf=w}()),ce}process.env.NODE_ENV==="production"?Qn.exports=Ec():Qn.exports=Sc();var Ca=Qn.exports;const Tc=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Cc(e){const r=`${e}`.match(Tc);return r&&r[1]||""}function ni(e,r=""){return e.displayName||e.name||Cc(e)||r}function ja(e,r,t){const n=ni(r);return e.displayName||(n!==""?`${t}(${n})`:t)}function jc(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return ni(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Ca.ForwardRef:return ja(e,e.render,"ForwardRef");case Ca.Memo:return ja(e,e.type,"memo");default:return}}}function Nt(e,r,t,n,o){if(process.env.NODE_ENV==="production")return null;const a=e[r],i=o||r;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${n} \`${i}\` supplied to \`${t}\`. Expected an HTMLElement.`):null}const Oc=m.oneOfType([m.func,m.object]),oi=Oc;function Ye(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Ur(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Rc(...e){return e.reduce((r,t)=>t==null?r:function(...o){r.apply(this,o),t.apply(this,o)},()=>{})}function Pc(e,r=166){let t;function n(...o){const a=()=>{e.apply(this,o)};clearTimeout(t),t=setTimeout(a,r)}return n.clear=()=>{clearTimeout(t)},n}function _c(e,r){return process.env.NODE_ENV==="production"?()=>null:(t,n,o,a,i)=>{const l=o||"<<anonymous>>",c=i||n;return typeof t[n]<"u"?new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${r}`):null}}function $c(e,r){var t,n;return M.isValidElement(e)&&r.indexOf((t=e.type.muiName)!=null?t:(n=e.type)==null||(n=n._payload)==null||(n=n.value)==null?void 0:n.muiName)!==-1}function Qt(e){return e&&e.ownerDocument||document}function Ic(e){return Qt(e).defaultView||window}function Mc(e,r){if(process.env.NODE_ENV==="production")return()=>null;const t=r?_({},r.propTypes):null;return o=>(a,i,l,c,d,...u)=>{const v=d||i,p=t==null?void 0:t[v];if(p){const h=p(a,i,l,c,d,...u);if(h)return h}return typeof a[i]<"u"&&!a[o]?new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function en(e,r){typeof e=="function"?e(r):e&&(e.current=r)}const Dc=typeof window<"u"?M.useLayoutEffect:M.useEffect,Hr=Dc;let Oa=0;function Ac(e){const[r,t]=M.useState(e),n=e||r;return M.useEffect(()=>{r==null&&(Oa+=1,t(`mui-${Oa}`))},[r]),n}const Ra=M["useId".toString()];function ai(e){if(Ra!==void 0){const r=Ra();return e??r}return Ac(e)}function Bc(e,r,t,n,o){if(process.env.NODE_ENV==="production")return null;const a=o||r;return typeof e[r]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function si({controlled:e,default:r,name:t,state:n="value"}){const{current:o}=M.useRef(e!==void 0),[a,i]=M.useState(r),l=o?e:a;if(process.env.NODE_ENV!=="production"){M.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${n} state of ${t} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${t} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[n,t,e]);const{current:d}=M.useRef(r);M.useEffect(()=>{!o&&d!==r&&console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${t} after being initialized. To suppress this warning opt to use a controlled ${t}.`].join(`
`))},[JSON.stringify(r)])}const c=M.useCallback(d=>{o||i(d)},[]);return[l,c]}function eo(e){const r=M.useRef(e);return Hr(()=>{r.current=e}),M.useRef((...t)=>(0,r.current)(...t)).current}function Tr(...e){return M.useMemo(()=>e.every(r=>r==null)?null:r=>{e.forEach(t=>{en(t,r)})},e)}const Pa={};function Lc(e,r){const t=M.useRef(Pa);return t.current===Pa&&(t.current=e(r)),t}const Vc=[];function Fc(e){M.useEffect(e,Vc)}class _t{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new _t}start(r,t){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,t()},r)}}function ft(){const e=Lc(_t.create).current;return Fc(e.disposeEffect),e}let un=!0,ro=!1;const zc=new _t,Gc={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Uc(e){const{type:r,tagName:t}=e;return!!(t==="INPUT"&&Gc[r]&&!e.readOnly||t==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Hc(e){e.metaKey||e.altKey||e.ctrlKey||(un=!0)}function Vn(){un=!1}function qc(){this.visibilityState==="hidden"&&ro&&(un=!0)}function Xc(e){e.addEventListener("keydown",Hc,!0),e.addEventListener("mousedown",Vn,!0),e.addEventListener("pointerdown",Vn,!0),e.addEventListener("touchstart",Vn,!0),e.addEventListener("visibilitychange",qc,!0)}function Wc(e){const{target:r}=e;try{return r.matches(":focus-visible")}catch{}return un||Uc(r)}function ii(){const e=M.useCallback(o=>{o!=null&&Xc(o.ownerDocument)},[]),r=M.useRef(!1);function t(){return r.current?(ro=!0,zc.start(100,()=>{ro=!1}),r.current=!1,!0):!1}function n(o){return Wc(o)?(r.current=!0,!0):!1}return{isFocusVisibleRef:r,onFocus:n,onBlur:t,ref:e}}function li(e,r){const t=_({},r);return Object.keys(e).forEach(n=>{if(n.toString().match(/^(components|slots)$/))t[n]=_({},e[n],t[n]);else if(n.toString().match(/^(componentsProps|slotProps)$/)){const o=e[n]||{},a=r[n];t[n]={},!a||!Object.keys(a)?t[n]=o:!o||!Object.keys(o)?t[n]=a:(t[n]=_({},a),Object.keys(o).forEach(i=>{t[n][i]=li(o[i],a[i])}))}else t[n]===void 0&&(t[n]=e[n])}),t}function jo(e,r,t=void 0){const n={};return Object.keys(e).forEach(o=>{n[o]=e[o].reduce((a,i)=>{if(i){const l=r(i);l!==""&&a.push(l),t&&t[i]&&a.push(t[i])}return a},[]).join(" ")}),n}const _a=e=>e,Yc=()=>{let e=_a;return{configure(r){e=r},generate(r){return e(r)},reset(){e=_a}}},Kc=Yc(),pi=Kc,ci={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function fn(e,r,t="Mui"){const n=ci[r];return n?`${t}-${n}`:`${pi.generate(e)}-${r}`}function di(e,r,t="Mui"){const n={};return r.forEach(o=>{n[o]=fn(e,o,t)}),n}function Jc(e,r=Number.MIN_SAFE_INTEGER,t=Number.MAX_SAFE_INTEGER){return Math.max(r,Math.min(e,t))}function ke(e,r){if(e==null)return{};var t={},n=Object.keys(e),o,a;for(a=0;a<n.length;a++)o=n[a],!(r.indexOf(o)>=0)&&(t[o]=e[o]);return t}const Zc=["values","unit","step"],Qc=e=>{const r=Object.keys(e).map(t=>({key:t,val:e[t]}))||[];return r.sort((t,n)=>t.val-n.val),r.reduce((t,n)=>_({},t,{[n.key]:n.val}),{})};function ed(e){const{values:r={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:t="px",step:n=5}=e,o=ke(e,Zc),a=Qc(r),i=Object.keys(a);function l(p){return`@media (min-width:${typeof r[p]=="number"?r[p]:p}${t})`}function c(p){return`@media (max-width:${(typeof r[p]=="number"?r[p]:p)-n/100}${t})`}function d(p,h){const f=i.indexOf(h);return`@media (min-width:${typeof r[p]=="number"?r[p]:p}${t}) and (max-width:${(f!==-1&&typeof r[i[f]]=="number"?r[i[f]]:h)-n/100}${t})`}function u(p){return i.indexOf(p)+1<i.length?d(p,i[i.indexOf(p)+1]):l(p)}function v(p){const h=i.indexOf(p);return h===0?l(i[1]):h===i.length-1?c(i[h]):d(p,i[i.indexOf(p)+1]).replace("@media","@media not all and")}return _({keys:i,values:a,up:l,down:c,between:d,only:u,not:v,unit:t},o)}const rd={borderRadius:4},td=rd,nd=process.env.NODE_ENV!=="production"?m.oneOfType([m.number,m.string,m.object,m.array]):{},cr=nd;function vt(e,r){return r?er(e,r,{clone:!1}):e}const Oo={xs:0,sm:600,md:900,lg:1200,xl:1536},$a={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Oo[e]}px)`};function rr(e,r,t){const n=e.theme||{};if(Array.isArray(r)){const a=n.breakpoints||$a;return r.reduce((i,l,c)=>(i[a.up(a.keys[c])]=t(r[c]),i),{})}if(typeof r=="object"){const a=n.breakpoints||$a;return Object.keys(r).reduce((i,l)=>{if(Object.keys(a.values||Oo).indexOf(l)!==-1){const c=a.up(l);i[c]=t(r[l],l)}else{const c=l;i[c]=r[c]}return i},{})}return t(r)}function od(e={}){var r;return((r=e.keys)==null?void 0:r.reduce((n,o)=>{const a=e.up(o);return n[a]={},n},{}))||{}}function ad(e,r){return e.reduce((t,n)=>{const o=t[n];return(!o||Object.keys(o).length===0)&&delete t[n],t},r)}function mn(e,r,t=!0){if(!r||typeof r!="string")return null;if(e&&e.vars&&t){const n=`vars.${r}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(n!=null)return n}return r.split(".").reduce((n,o)=>n&&n[o]!=null?n[o]:null,e)}function rn(e,r,t,n=t){let o;return typeof e=="function"?o=e(t):Array.isArray(e)?o=e[t]||n:o=mn(e,t)||n,r&&(o=r(o,n,e)),o}function we(e){const{prop:r,cssProperty:t=e.prop,themeKey:n,transform:o}=e,a=i=>{if(i[r]==null)return null;const l=i[r],c=i.theme,d=mn(c,n)||{};return rr(i,l,v=>{let p=rn(d,o,v);return v===p&&typeof v=="string"&&(p=rn(d,o,`${r}${v==="default"?"":Ye(v)}`,v)),t===!1?p:{[t]:p}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[r]:cr}:{},a.filterProps=[r],a}function sd(e){const r={};return t=>(r[t]===void 0&&(r[t]=e(t)),r[t])}const id={m:"margin",p:"padding"},ld={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Ia={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},pd=sd(e=>{if(e.length>2)if(Ia[e])e=Ia[e];else return[e];const[r,t]=e.split(""),n=id[r],o=ld[t]||"";return Array.isArray(o)?o.map(a=>n+a):[n+o]}),hn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],gn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],cd=[...hn,...gn];function $t(e,r,t,n){var o;const a=(o=mn(e,r,!1))!=null?o:t;return typeof a=="number"?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&typeof i!="number"&&console.error(`MUI: Expected ${n} argument to be a number or a string, got ${i}.`),a*i):Array.isArray(a)?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&(Number.isInteger(i)?i>a.length-1&&console.error([`MUI: The value provided (${i}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${i} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${r}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${r}\` as a number.`].join(`
`))),a[i]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${r}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function ui(e){return $t(e,"spacing",8,"spacing")}function It(e,r){if(typeof r=="string"||r==null)return r;const t=Math.abs(r),n=e(t);return r>=0?n:typeof n=="number"?-n:`-${n}`}function dd(e,r){return t=>e.reduce((n,o)=>(n[o]=It(r,t),n),{})}function ud(e,r,t,n){if(r.indexOf(t)===-1)return null;const o=pd(t),a=dd(o,n),i=e[t];return rr(e,i,a)}function fi(e,r){const t=ui(e.theme);return Object.keys(e).map(n=>ud(e,r,n,t)).reduce(vt,{})}function he(e){return fi(e,hn)}he.propTypes=process.env.NODE_ENV!=="production"?hn.reduce((e,r)=>(e[r]=cr,e),{}):{};he.filterProps=hn;function ge(e){return fi(e,gn)}ge.propTypes=process.env.NODE_ENV!=="production"?gn.reduce((e,r)=>(e[r]=cr,e),{}):{};ge.filterProps=gn;process.env.NODE_ENV!=="production"&&cd.reduce((e,r)=>(e[r]=cr,e),{});function fd(e=8){if(e.mui)return e;const r=ui({spacing:e}),t=(...n)=>(process.env.NODE_ENV!=="production"&&(n.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)),(n.length===0?[1]:n).map(a=>{const i=r(a);return typeof i=="number"?`${i}px`:i}).join(" "));return t.mui=!0,t}function bn(...e){const r=e.reduce((n,o)=>(o.filterProps.forEach(a=>{n[a]=o}),n),{}),t=n=>Object.keys(n).reduce((o,a)=>r[a]?vt(o,r[a](n)):o,{});return t.propTypes=process.env.NODE_ENV!=="production"?e.reduce((n,o)=>Object.assign(n,o.propTypes),{}):{},t.filterProps=e.reduce((n,o)=>n.concat(o.filterProps),[]),t}function Be(e){return typeof e!="number"?e:`${e}px solid`}function ze(e,r){return we({prop:e,themeKey:"borders",transform:r})}const md=ze("border",Be),hd=ze("borderTop",Be),gd=ze("borderRight",Be),bd=ze("borderBottom",Be),vd=ze("borderLeft",Be),wd=ze("borderColor"),yd=ze("borderTopColor"),xd=ze("borderRightColor"),kd=ze("borderBottomColor"),Nd=ze("borderLeftColor"),Ed=ze("outline",Be),Sd=ze("outlineColor"),vn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const r=$t(e.theme,"shape.borderRadius",4,"borderRadius"),t=n=>({borderRadius:It(r,n)});return rr(e,e.borderRadius,t)}return null};vn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:cr}:{};vn.filterProps=["borderRadius"];bn(md,hd,gd,bd,vd,wd,yd,xd,kd,Nd,vn,Ed,Sd);const wn=e=>{if(e.gap!==void 0&&e.gap!==null){const r=$t(e.theme,"spacing",8,"gap"),t=n=>({gap:It(r,n)});return rr(e,e.gap,t)}return null};wn.propTypes=process.env.NODE_ENV!=="production"?{gap:cr}:{};wn.filterProps=["gap"];const yn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const r=$t(e.theme,"spacing",8,"columnGap"),t=n=>({columnGap:It(r,n)});return rr(e,e.columnGap,t)}return null};yn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:cr}:{};yn.filterProps=["columnGap"];const xn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const r=$t(e.theme,"spacing",8,"rowGap"),t=n=>({rowGap:It(r,n)});return rr(e,e.rowGap,t)}return null};xn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:cr}:{};xn.filterProps=["rowGap"];const Td=we({prop:"gridColumn"}),Cd=we({prop:"gridRow"}),jd=we({prop:"gridAutoFlow"}),Od=we({prop:"gridAutoColumns"}),Rd=we({prop:"gridAutoRows"}),Pd=we({prop:"gridTemplateColumns"}),_d=we({prop:"gridTemplateRows"}),$d=we({prop:"gridTemplateAreas"}),Id=we({prop:"gridArea"});bn(wn,yn,xn,Td,Cd,jd,Od,Rd,Pd,_d,$d,Id);function Vr(e,r){return r==="grey"?r:e}const Md=we({prop:"color",themeKey:"palette",transform:Vr}),Dd=we({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Vr}),Ad=we({prop:"backgroundColor",themeKey:"palette",transform:Vr});bn(Md,Dd,Ad);function $e(e){return e<=1&&e!==0?`${e*100}%`:e}const Bd=we({prop:"width",transform:$e}),Ro=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const r=t=>{var n,o;const a=((n=e.theme)==null||(n=n.breakpoints)==null||(n=n.values)==null?void 0:n[t])||Oo[t];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:$e(t)}};return rr(e,e.maxWidth,r)}return null};Ro.filterProps=["maxWidth"];const Ld=we({prop:"minWidth",transform:$e}),Vd=we({prop:"height",transform:$e}),Fd=we({prop:"maxHeight",transform:$e}),zd=we({prop:"minHeight",transform:$e});we({prop:"size",cssProperty:"width",transform:$e});we({prop:"size",cssProperty:"height",transform:$e});const Gd=we({prop:"boxSizing"});bn(Bd,Ro,Ld,Vd,Fd,zd,Gd);const Ud={border:{themeKey:"borders",transform:Be},borderTop:{themeKey:"borders",transform:Be},borderRight:{themeKey:"borders",transform:Be},borderBottom:{themeKey:"borders",transform:Be},borderLeft:{themeKey:"borders",transform:Be},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Be},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:vn},color:{themeKey:"palette",transform:Vr},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Vr},backgroundColor:{themeKey:"palette",transform:Vr},p:{style:ge},pt:{style:ge},pr:{style:ge},pb:{style:ge},pl:{style:ge},px:{style:ge},py:{style:ge},padding:{style:ge},paddingTop:{style:ge},paddingRight:{style:ge},paddingBottom:{style:ge},paddingLeft:{style:ge},paddingX:{style:ge},paddingY:{style:ge},paddingInline:{style:ge},paddingInlineStart:{style:ge},paddingInlineEnd:{style:ge},paddingBlock:{style:ge},paddingBlockStart:{style:ge},paddingBlockEnd:{style:ge},m:{style:he},mt:{style:he},mr:{style:he},mb:{style:he},ml:{style:he},mx:{style:he},my:{style:he},margin:{style:he},marginTop:{style:he},marginRight:{style:he},marginBottom:{style:he},marginLeft:{style:he},marginX:{style:he},marginY:{style:he},marginInline:{style:he},marginInlineStart:{style:he},marginInlineEnd:{style:he},marginBlock:{style:he},marginBlockStart:{style:he},marginBlockEnd:{style:he},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:wn},rowGap:{style:xn},columnGap:{style:yn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:$e},maxWidth:{style:Ro},minWidth:{transform:$e},height:{transform:$e},maxHeight:{transform:$e},minHeight:{transform:$e},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Po=Ud;function Hd(...e){const r=e.reduce((n,o)=>n.concat(Object.keys(o)),[]),t=new Set(r);return e.every(n=>t.size===Object.keys(n).length)}function qd(e,r){return typeof e=="function"?e(r):e}function Xd(){function e(t,n,o,a){const i={[t]:n,theme:o},l=a[t];if(!l)return{[t]:n};const{cssProperty:c=t,themeKey:d,transform:u,style:v}=l;if(n==null)return null;if(d==="typography"&&n==="inherit")return{[t]:n};const p=mn(o,d)||{};return v?v(i):rr(i,n,f=>{let g=rn(p,u,f);return f===g&&typeof f=="string"&&(g=rn(p,u,`${t}${f==="default"?"":Ye(f)}`,f)),c===!1?g:{[c]:g}})}function r(t){var n;const{sx:o,theme:a={}}=t||{};if(!o)return null;const i=(n=a.unstable_sxConfig)!=null?n:Po;function l(c){let d=c;if(typeof c=="function")d=c(a);else if(typeof c!="object")return c;if(!d)return null;const u=od(a.breakpoints),v=Object.keys(u);let p=u;return Object.keys(d).forEach(h=>{const f=qd(d[h],a);if(f!=null)if(typeof f=="object")if(i[h])p=vt(p,e(h,f,a,i));else{const g=rr({theme:a},f,b=>({[h]:b}));Hd(g,f)?p[h]=r({sx:f,theme:a}):p=vt(p,g)}else p=vt(p,e(h,f,a,i))}),ad(v,p)}return Array.isArray(o)?o.map(l):l(o)}return r}const mi=Xd();mi.filterProps=["sx"];const _o=mi;function Wd(e,r){const t=this;return t.vars&&typeof t.getColorSchemeSelector=="function"?{[t.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:r}:t.palette.mode===e?r:{}}const Yd=["breakpoints","palette","spacing","shape"];function $o(e={},...r){const{breakpoints:t={},palette:n={},spacing:o,shape:a={}}=e,i=ke(e,Yd),l=ed(t),c=fd(o);let d=er({breakpoints:l,direction:"ltr",components:{},palette:_({mode:"light"},n),spacing:c,shape:_({},td,a)},i);return d.applyStyles=Wd,d=r.reduce((u,v)=>er(u,v),d),d.unstable_sxConfig=_({},Po,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(v){return _o({sx:v,theme:this})},d}function Kd(e){return Object.keys(e).length===0}function hi(e=null){const r=M.useContext(Wn.ThemeContext);return!r||Kd(r)?e:r}const Jd=$o();function gi(e=Jd){return hi(e)}const Zd=["ownerState"],Qd=["variants"],eu=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function ru(e){return Object.keys(e).length===0}function tu(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Wt(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const nu=$o(),Ma=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Gt({defaultTheme:e,theme:r,themeId:t}){return ru(r)?e:r[t]||r}function ou(e){return e?(r,t)=>t[e]:null}function Yt(e,r){let{ownerState:t}=r,n=ke(r,Zd);const o=typeof e=="function"?e(_({ownerState:t},n)):e;if(Array.isArray(o))return o.flatMap(a=>Yt(a,_({ownerState:t},n)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let l=ke(o,Qd);return a.forEach(c=>{let d=!0;typeof c.props=="function"?d=c.props(_({ownerState:t},n,t)):Object.keys(c.props).forEach(u=>{(t==null?void 0:t[u])!==c.props[u]&&n[u]!==c.props[u]&&(d=!1)}),d&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(_({ownerState:t},n,t)):c.style))}),l}return o}function au(e={}){const{themeId:r,defaultTheme:t=nu,rootShouldForwardProp:n=Wt,slotShouldForwardProp:o=Wt}=e,a=i=>_o(_({},i,{theme:Gt(_({},i,{defaultTheme:t,themeId:r}))}));return a.__mui_systemSx=!0,(i,l={})=>{Wn.internal_processStyles(i,w=>w.filter(j=>!(j!=null&&j.__mui_systemSx)));const{name:c,slot:d,skipVariantsResolver:u,skipSx:v,overridesResolver:p=ou(Ma(d))}=l,h=ke(l,eu),f=u!==void 0?u:d&&d!=="Root"&&d!=="root"||!1,g=v||!1;let b;process.env.NODE_ENV!=="production"&&c&&(b=`${c}-${Ma(d||"Root")}`);let x=Wt;d==="Root"||d==="root"?x=n:d?x=o:tu(i)&&(x=void 0);const C=Wn(i,_({shouldForwardProp:x,label:b},h)),S=w=>typeof w=="function"&&w.__emotion_real!==w||wr(w)?j=>Yt(w,_({},j,{theme:Gt({theme:j.theme,defaultTheme:t,themeId:r})})):w,k=(w,...j)=>{let R=S(w);const B=j?j.map(S):[];c&&p&&B.push(N=>{const A=Gt(_({},N,{defaultTheme:t,themeId:r}));if(!A.components||!A.components[c]||!A.components[c].styleOverrides)return null;const D=A.components[c].styleOverrides,J={};return Object.entries(D).forEach(([K,H])=>{J[K]=Yt(H,_({},N,{theme:A}))}),p(N,J)}),c&&!f&&B.push(N=>{var A;const D=Gt(_({},N,{defaultTheme:t,themeId:r})),J=D==null||(A=D.components)==null||(A=A[c])==null?void 0:A.variants;return Yt({variants:J},_({},N,{theme:D}))}),g||B.push(a);const T=B.length-j.length;if(Array.isArray(w)&&T>0){const N=new Array(T).fill("");R=[...w,...N],R.raw=[...w.raw,...N]}const P=C(R,...B);if(process.env.NODE_ENV!=="production"){let N;c&&(N=`${c}${Ye(d||"")}`),N===void 0&&(N=`Styled(${jc(i)})`),P.displayName=N}return i.muiName&&(P.muiName=i.muiName),P};return C.withConfig&&(k.withConfig=C.withConfig),k}}function su(e){const{theme:r,name:t,props:n}=e;return!r||!r.components||!r.components[t]||!r.components[t].defaultProps?n:li(r.components[t].defaultProps,n)}function iu({props:e,name:r,defaultTheme:t,themeId:n}){let o=gi(t);return n&&(o=o[n]||o),su({theme:o,name:r,props:e})}function Io(e,r=0,t=1){return process.env.NODE_ENV!=="production"&&(e<r||e>t)&&console.error(`MUI: The value provided ${e} is out of range [${r}, ${t}].`),Jc(e,r,t)}function lu(e){e=e.slice(1);const r=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let t=e.match(r);return t&&t[0].length===1&&(t=t.map(n=>n+n)),t?`rgb${t.length===4?"a":""}(${t.map((n,o)=>o<3?parseInt(n,16):Math.round(parseInt(n,16)/255*1e3)/1e3).join(", ")})`:""}function Cr(e){if(e.type)return e;if(e.charAt(0)==="#")return Cr(lu(e));const r=e.indexOf("("),t=e.substring(0,r);if(["rgb","rgba","hsl","hsla","color"].indexOf(t)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Ur(9,e));let n=e.substring(r+1,e.length-1),o;if(t==="color"){if(n=n.split(" "),o=n.shift(),n.length===4&&n[3].charAt(0)==="/"&&(n[3]=n[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Ur(10,o))}else n=n.split(",");return n=n.map(a=>parseFloat(a)),{type:t,values:n,colorSpace:o}}function kn(e){const{type:r,colorSpace:t}=e;let{values:n}=e;return r.indexOf("rgb")!==-1?n=n.map((o,a)=>a<3?parseInt(o,10):o):r.indexOf("hsl")!==-1&&(n[1]=`${n[1]}%`,n[2]=`${n[2]}%`),r.indexOf("color")!==-1?n=`${t} ${n.join(" ")}`:n=`${n.join(", ")}`,`${r}(${n})`}function pu(e){e=Cr(e);const{values:r}=e,t=r[0],n=r[1]/100,o=r[2]/100,a=n*Math.min(o,1-o),i=(d,u=(d+t/30)%12)=>o-a*Math.max(Math.min(u-3,9-u,1),-1);let l="rgb";const c=[Math.round(i(0)*255),Math.round(i(8)*255),Math.round(i(4)*255)];return e.type==="hsla"&&(l+="a",c.push(r[3])),kn({type:l,values:c})}function Da(e){e=Cr(e);let r=e.type==="hsl"||e.type==="hsla"?Cr(pu(e)).values:e.values;return r=r.map(t=>(e.type!=="color"&&(t/=255),t<=.03928?t/12.92:((t+.055)/1.055)**2.4)),Number((.2126*r[0]+.7152*r[1]+.0722*r[2]).toFixed(3))}function Aa(e,r){const t=Da(e),n=Da(r);return(Math.max(t,n)+.05)/(Math.min(t,n)+.05)}function bi(e,r){return e=Cr(e),r=Io(r),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${r}`:e.values[3]=r,kn(e)}function cu(e,r){if(e=Cr(e),r=Io(r),e.type.indexOf("hsl")!==-1)e.values[2]*=1-r;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let t=0;t<3;t+=1)e.values[t]*=1-r;return kn(e)}function du(e,r){if(e=Cr(e),r=Io(r),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*r;else if(e.type.indexOf("rgb")!==-1)for(let t=0;t<3;t+=1)e.values[t]+=(255-e.values[t])*r;else if(e.type.indexOf("color")!==-1)for(let t=0;t<3;t+=1)e.values[t]+=(1-e.values[t])*r;return kn(e)}function uu(e,r){return _({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},r)}const fu={black:"#000",white:"#fff"},Et=fu,mu={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},hu=mu,gu={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},$r=gu,bu={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Ir=bu,vu={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},it=vu,wu={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Mr=wu,yu={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Dr=yu,xu={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Ar=xu,ku=["mode","contrastThreshold","tonalOffset"],Ba={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Et.white,default:Et.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Fn={text:{primary:Et.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Et.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function La(e,r,t,n){const o=n.light||n,a=n.dark||n*1.5;e[r]||(e.hasOwnProperty(t)?e[r]=e[t]:r==="light"?e.light=du(e.main,o):r==="dark"&&(e.dark=cu(e.main,a)))}function Nu(e="light"){return e==="dark"?{main:Mr[200],light:Mr[50],dark:Mr[400]}:{main:Mr[700],light:Mr[400],dark:Mr[800]}}function Eu(e="light"){return e==="dark"?{main:$r[200],light:$r[50],dark:$r[400]}:{main:$r[500],light:$r[300],dark:$r[700]}}function Su(e="light"){return e==="dark"?{main:Ir[500],light:Ir[300],dark:Ir[700]}:{main:Ir[700],light:Ir[400],dark:Ir[800]}}function Tu(e="light"){return e==="dark"?{main:Dr[400],light:Dr[300],dark:Dr[700]}:{main:Dr[700],light:Dr[500],dark:Dr[900]}}function Cu(e="light"){return e==="dark"?{main:Ar[400],light:Ar[300],dark:Ar[700]}:{main:Ar[800],light:Ar[500],dark:Ar[900]}}function ju(e="light"){return e==="dark"?{main:it[400],light:it[300],dark:it[700]}:{main:"#ed6c02",light:it[500],dark:it[900]}}function Ou(e){const{mode:r="light",contrastThreshold:t=3,tonalOffset:n=.2}=e,o=ke(e,ku),a=e.primary||Nu(r),i=e.secondary||Eu(r),l=e.error||Su(r),c=e.info||Tu(r),d=e.success||Cu(r),u=e.warning||ju(r);function v(g){const b=Aa(g,Fn.text.primary)>=t?Fn.text.primary:Ba.text.primary;if(process.env.NODE_ENV!=="production"){const x=Aa(g,b);x<3&&console.error([`MUI: The contrast ratio of ${x}:1 for ${b} on ${g}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return b}const p=({color:g,name:b,mainShade:x=500,lightShade:C=300,darkShade:S=700})=>{if(g=_({},g),!g.main&&g[x]&&(g.main=g[x]),!g.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.`:Ur(11,b?` (${b})`:"",x));if(typeof g.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(g.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Ur(12,b?` (${b})`:"",JSON.stringify(g.main)));return La(g,"light",C,n),La(g,"dark",S,n),g.contrastText||(g.contrastText=v(g.main)),g},h={dark:Fn,light:Ba};return process.env.NODE_ENV!=="production"&&(h[r]||console.error(`MUI: The palette mode \`${r}\` is not supported.`)),er(_({common:_({},Et),mode:r,primary:p({color:a,name:"primary"}),secondary:p({color:i,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:p({color:l,name:"error"}),warning:p({color:u,name:"warning"}),info:p({color:c,name:"info"}),success:p({color:d,name:"success"}),grey:hu,contrastThreshold:t,getContrastText:v,augmentColor:p,tonalOffset:n},h[r]),o)}const Ru=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Pu(e){return Math.round(e*1e5)/1e5}const Va={textTransform:"uppercase"},Fa='"Roboto", "Helvetica", "Arial", sans-serif';function _u(e,r){const t=typeof r=="function"?r(e):r,{fontFamily:n=Fa,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:i=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:d=16,allVariants:u,pxToRem:v}=t,p=ke(t,Ru);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof d!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const h=o/14,f=v||(x=>`${x/d*h}rem`),g=(x,C,S,k,w)=>_({fontFamily:n,fontWeight:x,fontSize:f(C),lineHeight:S},n===Fa?{letterSpacing:`${Pu(k/C)}em`}:{},w,u),b={h1:g(a,96,1.167,-1.5),h2:g(a,60,1.2,-.5),h3:g(i,48,1.167,0),h4:g(i,34,1.235,.25),h5:g(i,24,1.334,0),h6:g(l,20,1.6,.15),subtitle1:g(i,16,1.75,.15),subtitle2:g(l,14,1.57,.1),body1:g(i,16,1.5,.15),body2:g(i,14,1.43,.15),button:g(l,14,1.75,.4,Va),caption:g(i,12,1.66,.4),overline:g(i,12,2.66,1,Va),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return er(_({htmlFontSize:d,pxToRem:f,fontFamily:n,fontSize:o,fontWeightLight:a,fontWeightRegular:i,fontWeightMedium:l,fontWeightBold:c},b),p,{clone:!1})}const $u=.2,Iu=.14,Mu=.12;function me(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${$u})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Iu})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Mu})`].join(",")}const Du=["none",me(0,2,1,-1,0,1,1,0,0,1,3,0),me(0,3,1,-2,0,2,2,0,0,1,5,0),me(0,3,3,-2,0,3,4,0,0,1,8,0),me(0,2,4,-1,0,4,5,0,0,1,10,0),me(0,3,5,-1,0,5,8,0,0,1,14,0),me(0,3,5,-1,0,6,10,0,0,1,18,0),me(0,4,5,-2,0,7,10,1,0,2,16,1),me(0,5,5,-3,0,8,10,1,0,3,14,2),me(0,5,6,-3,0,9,12,1,0,3,16,2),me(0,6,6,-3,0,10,14,1,0,4,18,3),me(0,6,7,-4,0,11,15,1,0,4,20,3),me(0,7,8,-4,0,12,17,2,0,5,22,4),me(0,7,8,-4,0,13,19,2,0,5,24,4),me(0,7,9,-4,0,14,21,2,0,5,26,4),me(0,8,9,-5,0,15,22,2,0,6,28,5),me(0,8,10,-5,0,16,24,2,0,6,30,5),me(0,8,11,-5,0,17,26,2,0,6,32,5),me(0,9,11,-5,0,18,28,2,0,7,34,6),me(0,9,12,-6,0,19,29,2,0,7,36,6),me(0,10,13,-6,0,20,31,3,0,8,38,7),me(0,10,13,-6,0,21,33,3,0,8,40,7),me(0,10,14,-6,0,22,35,3,0,8,42,7),me(0,11,14,-7,0,23,36,3,0,9,44,8),me(0,11,15,-7,0,24,38,3,0,9,46,8)],Au=Du,Bu=["duration","easing","delay"],Lu={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Vu={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function za(e){return`${Math.round(e)}ms`}function Fu(e){if(!e)return 0;const r=e/36;return Math.round((4+15*r**.25+r/5)*10)}function zu(e){const r=_({},Lu,e.easing),t=_({},Vu,e.duration);return _({getAutoHeightDuration:Fu,create:(o=["all"],a={})=>{const{duration:i=t.standard,easing:l=r.easeInOut,delay:c=0}=a,d=ke(a,Bu);if(process.env.NODE_ENV!=="production"){const u=p=>typeof p=="string",v=p=>!isNaN(parseFloat(p));!u(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!v(i)&&!u(i)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`),u(l)||console.error('MUI: Argument "easing" must be a string.'),!v(c)&&!u(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(d).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(u=>`${u} ${typeof i=="string"?i:za(i)} ${l} ${typeof c=="string"?c:za(c)}`).join(",")}},e,{easing:r,duration:t})}const Gu={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Uu=Gu,Hu=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function qu(e={},...r){const{mixins:t={},palette:n={},transitions:o={},typography:a={}}=e,i=ke(e,Hu);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Ur(18));const l=Ou(n),c=$o(e);let d=er(c,{mixins:uu(c.breakpoints,t),palette:l,shadows:Au.slice(),typography:_u(l,a),transitions:zu(o),zIndex:_({},Uu)});if(d=er(d,i),d=r.reduce((u,v)=>er(u,v),d),process.env.NODE_ENV!=="production"){const u=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],v=(p,h)=>{let f;for(f in p){const g=p[f];if(u.indexOf(f)!==-1&&Object.keys(g).length>0){if(process.env.NODE_ENV!=="production"){const b=fn("",f);console.error([`MUI: The \`${h}\` component increases the CSS specificity of the \`${f}\` internal state.`,"You can not override it like this: ",JSON.stringify(p,null,2),"",`Instead, you need to use the '&.${b}' syntax:`,JSON.stringify({root:{[`&.${b}`]:g}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}p[f]={}}}};Object.keys(d.components).forEach(p=>{const h=d.components[p].styleOverrides;h&&p.indexOf("Mui")===0&&v(h,p)})}return d.unstable_sxConfig=_({},Po,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(v){return _o({sx:v,theme:this})},d}const Xu=qu(),Mo=Xu,Do="$$material";function Ao({props:e,name:r}){return iu({props:e,name:r,defaultTheme:Mo,themeId:Do})}const Wu=e=>Wt(e)&&e!=="classes",Yu=au({themeId:Do,defaultTheme:Mo,rootShouldForwardProp:Wu}),Mt=Yu;function Ku(e){return fn("MuiSvgIcon",e)}di("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Ju=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Zu=e=>{const{color:r,fontSize:t,classes:n}=e,o={root:["root",r!=="inherit"&&`color${Ye(r)}`,`fontSize${Ye(t)}`]};return jo(o,Ku,n)},Qu=Mt("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.root,t.color!=="inherit"&&r[`color${Ye(t.color)}`],r[`fontSize${Ye(t.fontSize)}`]]}})(({theme:e,ownerState:r})=>{var t,n,o,a,i,l,c,d,u,v,p,h,f;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:r.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(t=e.transitions)==null||(n=t.create)==null?void 0:n.call(t,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(i=a.pxToRem)==null?void 0:i.call(a,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((d=e.typography)==null||(u=d.pxToRem)==null?void 0:u.call(d,35))||"2.1875rem"}[r.fontSize],color:(v=(p=(e.vars||e).palette)==null||(p=p[r.color])==null?void 0:p.main)!=null?v:{action:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.active,disabled:(f=(e.vars||e).palette)==null||(f=f.action)==null?void 0:f.disabled,inherit:void 0}[r.color]}}),Bo=M.forwardRef(function(r,t){const n=Ao({props:r,name:"MuiSvgIcon"}),{children:o,className:a,color:i="inherit",component:l="svg",fontSize:c="medium",htmlColor:d,inheritViewBox:u=!1,titleAccess:v,viewBox:p="0 0 24 24"}=n,h=ke(n,Ju),f=M.isValidElement(o)&&o.type==="svg",g=_({},n,{color:i,component:l,fontSize:c,instanceFontSize:r.fontSize,inheritViewBox:u,viewBox:p,hasSvgAsChild:f}),b={};u||(b.viewBox=p);const x=Zu(g);return s.jsxs(Qu,_({as:l,className:lr(x.root,a),focusable:"false",color:d,"aria-hidden":v?void 0:!0,role:v?"img":void 0,ref:t},b,h,f&&o.props,{ownerState:g,children:[f?o.props.children:o,v?s.jsx("title",{children:v}):null]}))});process.env.NODE_ENV!=="production"&&(Bo.propTypes={children:m.node,classes:m.object,className:m.string,color:m.oneOfType([m.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),m.string]),component:m.elementType,fontSize:m.oneOfType([m.oneOf(["inherit","large","medium","small"]),m.string]),htmlColor:m.string,inheritViewBox:m.bool,shapeRendering:m.string,sx:m.oneOfType([m.arrayOf(m.oneOfType([m.func,m.object,m.bool])),m.func,m.object]),titleAccess:m.string,viewBox:m.string});Bo.muiName="SvgIcon";const Ga=Bo;function vi(e,r){function t(n,o){return s.jsx(Ga,_({"data-testid":`${r}Icon`,ref:o},n,{children:e}))}return process.env.NODE_ENV!=="production"&&(t.displayName=`${r}Icon`),t.muiName=Ga.muiName,M.memo(M.forwardRef(t))}const ef={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),pi.configure(e)}},rf=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Ye,createChainedFunction:Rc,createSvgIcon:vi,debounce:Pc,deprecatedPropType:_c,isMuiElement:$c,ownerDocument:Qt,ownerWindow:Ic,requirePropFactory:Mc,setRef:en,unstable_ClassNameGenerator:ef,unstable_useEnhancedEffect:Hr,unstable_useId:ai,unsupportedProp:Bc,useControlled:si,useEventCallback:eo,useForkRef:Tr,useIsFocusVisible:ii},Symbol.toStringTag,{value:"Module"})),tf=cc(rf);var Ua;function nf(){return Ua||(Ua=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return r.createSvgIcon}});var r=tf}($n)),$n}var of=dc;Object.defineProperty(So,"__esModule",{value:!0});var wi=So.default=void 0,af=of(nf()),sf=s;wi=So.default=(0,af.default)((0,sf.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function lf(e){return typeof e=="string"}function mt(e,r,t){return e===void 0||lf(e)?r:_({},r,{ownerState:_({},r.ownerState,t)})}const pf={disableDefaultClasses:!1},cf=M.createContext(pf);function df(e){const{disableDefaultClasses:r}=M.useContext(cf);return t=>r?"":e(t)}function uf(e,r=[]){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>n.match(/^on[A-Z]/)&&typeof e[n]=="function"&&!r.includes(n)).forEach(n=>{t[n]=e[n]}),t}function ff(e,r,t){return typeof e=="function"?e(r,t):e}function Ha(e){if(e===void 0)return{};const r={};return Object.keys(e).filter(t=>!(t.match(/^on[A-Z]/)&&typeof e[t]=="function")).forEach(t=>{r[t]=e[t]}),r}function mf(e){const{getSlotProps:r,additionalProps:t,externalSlotProps:n,externalForwardedProps:o,className:a}=e;if(!r){const h=lr(t==null?void 0:t.className,a,o==null?void 0:o.className,n==null?void 0:n.className),f=_({},t==null?void 0:t.style,o==null?void 0:o.style,n==null?void 0:n.style),g=_({},t,o,n);return h.length>0&&(g.className=h),Object.keys(f).length>0&&(g.style=f),{props:g,internalRef:void 0}}const i=uf(_({},o,n)),l=Ha(n),c=Ha(o),d=r(i),u=lr(d==null?void 0:d.className,t==null?void 0:t.className,a,o==null?void 0:o.className,n==null?void 0:n.className),v=_({},d==null?void 0:d.style,t==null?void 0:t.style,o==null?void 0:o.style,n==null?void 0:n.style),p=_({},d,t,c,l);return u.length>0&&(p.className=u),Object.keys(v).length>0&&(p.style=v),{props:p,internalRef:d.ref}}const hf=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function gf(e){var r;const{elementType:t,externalSlotProps:n,ownerState:o,skipResolvingSlotProps:a=!1}=e,i=ke(e,hf),l=a?{}:ff(n,o),{props:c,internalRef:d}=mf(_({},i,{externalSlotProps:l})),u=Tr(d,l==null?void 0:l.ref,(r=e.additionalProps)==null?void 0:r.ref);return mt(t,_({},c,{ref:u}),o)}const yi="base";function bf(e){return`${yi}--${e}`}function vf(e,r){return`${yi}-${e}-${r}`}function xi(e,r){const t=ci[r];return t?bf(t):vf(e,r)}function wf(e,r){const t={};return r.forEach(n=>{t[n]=xi(e,n)}),t}function yf(e){return typeof e=="function"?e():e}const tn=M.forwardRef(function(r,t){const{children:n,container:o,disablePortal:a=!1}=r,[i,l]=M.useState(null),c=Tr(M.isValidElement(n)?n.ref:null,t);if(Hr(()=>{a||l(yf(o)||document.body)},[o,a]),Hr(()=>{if(i&&!a)return en(t,i),()=>{en(t,null)}},[t,i,a]),a){if(M.isValidElement(n)){const d={ref:c};return M.cloneElement(n,d)}return s.jsx(M.Fragment,{children:n})}return s.jsx(M.Fragment,{children:i&&Kl.createPortal(n,i)})});process.env.NODE_ENV!=="production"&&(tn.propTypes={children:m.node,container:m.oneOfType([Nt,m.func]),disablePortal:m.bool});process.env.NODE_ENV!=="production"&&(tn["propTypes"]=Nc(tn.propTypes));var Ce="top",Ve="bottom",Fe="right",je="left",Lo="auto",Dt=[Ce,Ve,Fe,je],qr="start",St="end",xf="clippingParents",ki="viewport",lt="popper",kf="reference",qa=Dt.reduce(function(e,r){return e.concat([r+"-"+qr,r+"-"+St])},[]),Ni=[].concat(Dt,[Lo]).reduce(function(e,r){return e.concat([r,r+"-"+qr,r+"-"+St])},[]),Nf="beforeRead",Ef="read",Sf="afterRead",Tf="beforeMain",Cf="main",jf="afterMain",Of="beforeWrite",Rf="write",Pf="afterWrite",_f=[Nf,Ef,Sf,Tf,Cf,jf,Of,Rf,Pf];function Ke(e){return e?(e.nodeName||"").toLowerCase():null}function Me(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var r=e.ownerDocument;return r&&r.defaultView||window}return e}function jr(e){var r=Me(e).Element;return e instanceof r||e instanceof Element}function Le(e){var r=Me(e).HTMLElement;return e instanceof r||e instanceof HTMLElement}function Vo(e){if(typeof ShadowRoot>"u")return!1;var r=Me(e).ShadowRoot;return e instanceof r||e instanceof ShadowRoot}function $f(e){var r=e.state;Object.keys(r.elements).forEach(function(t){var n=r.styles[t]||{},o=r.attributes[t]||{},a=r.elements[t];!Le(a)||!Ke(a)||(Object.assign(a.style,n),Object.keys(o).forEach(function(i){var l=o[i];l===!1?a.removeAttribute(i):a.setAttribute(i,l===!0?"":l)}))})}function If(e){var r=e.state,t={popper:{position:r.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(r.elements.popper.style,t.popper),r.styles=t,r.elements.arrow&&Object.assign(r.elements.arrow.style,t.arrow),function(){Object.keys(r.elements).forEach(function(n){var o=r.elements[n],a=r.attributes[n]||{},i=Object.keys(r.styles.hasOwnProperty(n)?r.styles[n]:t[n]),l=i.reduce(function(c,d){return c[d]="",c},{});!Le(o)||!Ke(o)||(Object.assign(o.style,l),Object.keys(a).forEach(function(c){o.removeAttribute(c)}))})}}const Mf={name:"applyStyles",enabled:!0,phase:"write",fn:$f,effect:If,requires:["computeStyles"]};function Xe(e){return e.split("-")[0]}var xr=Math.max,nn=Math.min,Xr=Math.round;function to(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(r){return r.brand+"/"+r.version}).join(" "):navigator.userAgent}function Ei(){return!/^((?!chrome|android).)*safari/i.test(to())}function Wr(e,r,t){r===void 0&&(r=!1),t===void 0&&(t=!1);var n=e.getBoundingClientRect(),o=1,a=1;r&&Le(e)&&(o=e.offsetWidth>0&&Xr(n.width)/e.offsetWidth||1,a=e.offsetHeight>0&&Xr(n.height)/e.offsetHeight||1);var i=jr(e)?Me(e):window,l=i.visualViewport,c=!Ei()&&t,d=(n.left+(c&&l?l.offsetLeft:0))/o,u=(n.top+(c&&l?l.offsetTop:0))/a,v=n.width/o,p=n.height/a;return{width:v,height:p,top:u,right:d+v,bottom:u+p,left:d,x:d,y:u}}function Fo(e){var r=Wr(e),t=e.offsetWidth,n=e.offsetHeight;return Math.abs(r.width-t)<=1&&(t=r.width),Math.abs(r.height-n)<=1&&(n=r.height),{x:e.offsetLeft,y:e.offsetTop,width:t,height:n}}function Si(e,r){var t=r.getRootNode&&r.getRootNode();if(e.contains(r))return!0;if(t&&Vo(t)){var n=r;do{if(n&&e.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function tr(e){return Me(e).getComputedStyle(e)}function Df(e){return["table","td","th"].indexOf(Ke(e))>=0}function dr(e){return((jr(e)?e.ownerDocument:e.document)||window.document).documentElement}function Nn(e){return Ke(e)==="html"?e:e.assignedSlot||e.parentNode||(Vo(e)?e.host:null)||dr(e)}function Xa(e){return!Le(e)||tr(e).position==="fixed"?null:e.offsetParent}function Af(e){var r=/firefox/i.test(to()),t=/Trident/i.test(to());if(t&&Le(e)){var n=tr(e);if(n.position==="fixed")return null}var o=Nn(e);for(Vo(o)&&(o=o.host);Le(o)&&["html","body"].indexOf(Ke(o))<0;){var a=tr(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||r&&a.willChange==="filter"||r&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function At(e){for(var r=Me(e),t=Xa(e);t&&Df(t)&&tr(t).position==="static";)t=Xa(t);return t&&(Ke(t)==="html"||Ke(t)==="body"&&tr(t).position==="static")?r:t||Af(e)||r}function zo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function wt(e,r,t){return xr(e,nn(r,t))}function Bf(e,r,t){var n=wt(e,r,t);return n>t?t:n}function Ti(){return{top:0,right:0,bottom:0,left:0}}function Ci(e){return Object.assign({},Ti(),e)}function ji(e,r){return r.reduce(function(t,n){return t[n]=e,t},{})}var Lf=function(r,t){return r=typeof r=="function"?r(Object.assign({},t.rects,{placement:t.placement})):r,Ci(typeof r!="number"?r:ji(r,Dt))};function Vf(e){var r,t=e.state,n=e.name,o=e.options,a=t.elements.arrow,i=t.modifiersData.popperOffsets,l=Xe(t.placement),c=zo(l),d=[je,Fe].indexOf(l)>=0,u=d?"height":"width";if(!(!a||!i)){var v=Lf(o.padding,t),p=Fo(a),h=c==="y"?Ce:je,f=c==="y"?Ve:Fe,g=t.rects.reference[u]+t.rects.reference[c]-i[c]-t.rects.popper[u],b=i[c]-t.rects.reference[c],x=At(a),C=x?c==="y"?x.clientHeight||0:x.clientWidth||0:0,S=g/2-b/2,k=v[h],w=C-p[u]-v[f],j=C/2-p[u]/2+S,R=wt(k,j,w),B=c;t.modifiersData[n]=(r={},r[B]=R,r.centerOffset=R-j,r)}}function Ff(e){var r=e.state,t=e.options,n=t.element,o=n===void 0?"[data-popper-arrow]":n;o!=null&&(typeof o=="string"&&(o=r.elements.popper.querySelector(o),!o)||Si(r.elements.popper,o)&&(r.elements.arrow=o))}const zf={name:"arrow",enabled:!0,phase:"main",fn:Vf,effect:Ff,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Yr(e){return e.split("-")[1]}var Gf={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Uf(e,r){var t=e.x,n=e.y,o=r.devicePixelRatio||1;return{x:Xr(t*o)/o||0,y:Xr(n*o)/o||0}}function Wa(e){var r,t=e.popper,n=e.popperRect,o=e.placement,a=e.variation,i=e.offsets,l=e.position,c=e.gpuAcceleration,d=e.adaptive,u=e.roundOffsets,v=e.isFixed,p=i.x,h=p===void 0?0:p,f=i.y,g=f===void 0?0:f,b=typeof u=="function"?u({x:h,y:g}):{x:h,y:g};h=b.x,g=b.y;var x=i.hasOwnProperty("x"),C=i.hasOwnProperty("y"),S=je,k=Ce,w=window;if(d){var j=At(t),R="clientHeight",B="clientWidth";if(j===Me(t)&&(j=dr(t),tr(j).position!=="static"&&l==="absolute"&&(R="scrollHeight",B="scrollWidth")),j=j,o===Ce||(o===je||o===Fe)&&a===St){k=Ve;var T=v&&j===w&&w.visualViewport?w.visualViewport.height:j[R];g-=T-n.height,g*=c?1:-1}if(o===je||(o===Ce||o===Ve)&&a===St){S=Fe;var P=v&&j===w&&w.visualViewport?w.visualViewport.width:j[B];h-=P-n.width,h*=c?1:-1}}var N=Object.assign({position:l},d&&Gf),A=u===!0?Uf({x:h,y:g},Me(t)):{x:h,y:g};if(h=A.x,g=A.y,c){var D;return Object.assign({},N,(D={},D[k]=C?"0":"",D[S]=x?"0":"",D.transform=(w.devicePixelRatio||1)<=1?"translate("+h+"px, "+g+"px)":"translate3d("+h+"px, "+g+"px, 0)",D))}return Object.assign({},N,(r={},r[k]=C?g+"px":"",r[S]=x?h+"px":"",r.transform="",r))}function Hf(e){var r=e.state,t=e.options,n=t.gpuAcceleration,o=n===void 0?!0:n,a=t.adaptive,i=a===void 0?!0:a,l=t.roundOffsets,c=l===void 0?!0:l,d={placement:Xe(r.placement),variation:Yr(r.placement),popper:r.elements.popper,popperRect:r.rects.popper,gpuAcceleration:o,isFixed:r.options.strategy==="fixed"};r.modifiersData.popperOffsets!=null&&(r.styles.popper=Object.assign({},r.styles.popper,Wa(Object.assign({},d,{offsets:r.modifiersData.popperOffsets,position:r.options.strategy,adaptive:i,roundOffsets:c})))),r.modifiersData.arrow!=null&&(r.styles.arrow=Object.assign({},r.styles.arrow,Wa(Object.assign({},d,{offsets:r.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),r.attributes.popper=Object.assign({},r.attributes.popper,{"data-popper-placement":r.placement})}const qf={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Hf,data:{}};var Ut={passive:!0};function Xf(e){var r=e.state,t=e.instance,n=e.options,o=n.scroll,a=o===void 0?!0:o,i=n.resize,l=i===void 0?!0:i,c=Me(r.elements.popper),d=[].concat(r.scrollParents.reference,r.scrollParents.popper);return a&&d.forEach(function(u){u.addEventListener("scroll",t.update,Ut)}),l&&c.addEventListener("resize",t.update,Ut),function(){a&&d.forEach(function(u){u.removeEventListener("scroll",t.update,Ut)}),l&&c.removeEventListener("resize",t.update,Ut)}}const Wf={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Xf,data:{}};var Yf={left:"right",right:"left",bottom:"top",top:"bottom"};function Kt(e){return e.replace(/left|right|bottom|top/g,function(r){return Yf[r]})}var Kf={start:"end",end:"start"};function Ya(e){return e.replace(/start|end/g,function(r){return Kf[r]})}function Go(e){var r=Me(e),t=r.pageXOffset,n=r.pageYOffset;return{scrollLeft:t,scrollTop:n}}function Uo(e){return Wr(dr(e)).left+Go(e).scrollLeft}function Jf(e,r){var t=Me(e),n=dr(e),o=t.visualViewport,a=n.clientWidth,i=n.clientHeight,l=0,c=0;if(o){a=o.width,i=o.height;var d=Ei();(d||!d&&r==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:a,height:i,x:l+Uo(e),y:c}}function Zf(e){var r,t=dr(e),n=Go(e),o=(r=e.ownerDocument)==null?void 0:r.body,a=xr(t.scrollWidth,t.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),i=xr(t.scrollHeight,t.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-n.scrollLeft+Uo(e),c=-n.scrollTop;return tr(o||t).direction==="rtl"&&(l+=xr(t.clientWidth,o?o.clientWidth:0)-a),{width:a,height:i,x:l,y:c}}function Ho(e){var r=tr(e),t=r.overflow,n=r.overflowX,o=r.overflowY;return/auto|scroll|overlay|hidden/.test(t+o+n)}function Oi(e){return["html","body","#document"].indexOf(Ke(e))>=0?e.ownerDocument.body:Le(e)&&Ho(e)?e:Oi(Nn(e))}function yt(e,r){var t;r===void 0&&(r=[]);var n=Oi(e),o=n===((t=e.ownerDocument)==null?void 0:t.body),a=Me(n),i=o?[a].concat(a.visualViewport||[],Ho(n)?n:[]):n,l=r.concat(i);return o?l:l.concat(yt(Nn(i)))}function no(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Qf(e,r){var t=Wr(e,!1,r==="fixed");return t.top=t.top+e.clientTop,t.left=t.left+e.clientLeft,t.bottom=t.top+e.clientHeight,t.right=t.left+e.clientWidth,t.width=e.clientWidth,t.height=e.clientHeight,t.x=t.left,t.y=t.top,t}function Ka(e,r,t){return r===ki?no(Jf(e,t)):jr(r)?Qf(r,t):no(Zf(dr(e)))}function em(e){var r=yt(Nn(e)),t=["absolute","fixed"].indexOf(tr(e).position)>=0,n=t&&Le(e)?At(e):e;return jr(n)?r.filter(function(o){return jr(o)&&Si(o,n)&&Ke(o)!=="body"}):[]}function rm(e,r,t,n){var o=r==="clippingParents"?em(e):[].concat(r),a=[].concat(o,[t]),i=a[0],l=a.reduce(function(c,d){var u=Ka(e,d,n);return c.top=xr(u.top,c.top),c.right=nn(u.right,c.right),c.bottom=nn(u.bottom,c.bottom),c.left=xr(u.left,c.left),c},Ka(e,i,n));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function Ri(e){var r=e.reference,t=e.element,n=e.placement,o=n?Xe(n):null,a=n?Yr(n):null,i=r.x+r.width/2-t.width/2,l=r.y+r.height/2-t.height/2,c;switch(o){case Ce:c={x:i,y:r.y-t.height};break;case Ve:c={x:i,y:r.y+r.height};break;case Fe:c={x:r.x+r.width,y:l};break;case je:c={x:r.x-t.width,y:l};break;default:c={x:r.x,y:r.y}}var d=o?zo(o):null;if(d!=null){var u=d==="y"?"height":"width";switch(a){case qr:c[d]=c[d]-(r[u]/2-t[u]/2);break;case St:c[d]=c[d]+(r[u]/2-t[u]/2);break}}return c}function Tt(e,r){r===void 0&&(r={});var t=r,n=t.placement,o=n===void 0?e.placement:n,a=t.strategy,i=a===void 0?e.strategy:a,l=t.boundary,c=l===void 0?xf:l,d=t.rootBoundary,u=d===void 0?ki:d,v=t.elementContext,p=v===void 0?lt:v,h=t.altBoundary,f=h===void 0?!1:h,g=t.padding,b=g===void 0?0:g,x=Ci(typeof b!="number"?b:ji(b,Dt)),C=p===lt?kf:lt,S=e.rects.popper,k=e.elements[f?C:p],w=rm(jr(k)?k:k.contextElement||dr(e.elements.popper),c,u,i),j=Wr(e.elements.reference),R=Ri({reference:j,element:S,strategy:"absolute",placement:o}),B=no(Object.assign({},S,R)),T=p===lt?B:j,P={top:w.top-T.top+x.top,bottom:T.bottom-w.bottom+x.bottom,left:w.left-T.left+x.left,right:T.right-w.right+x.right},N=e.modifiersData.offset;if(p===lt&&N){var A=N[o];Object.keys(P).forEach(function(D){var J=[Fe,Ve].indexOf(D)>=0?1:-1,K=[Ce,Ve].indexOf(D)>=0?"y":"x";P[D]+=A[K]*J})}return P}function tm(e,r){r===void 0&&(r={});var t=r,n=t.placement,o=t.boundary,a=t.rootBoundary,i=t.padding,l=t.flipVariations,c=t.allowedAutoPlacements,d=c===void 0?Ni:c,u=Yr(n),v=u?l?qa:qa.filter(function(f){return Yr(f)===u}):Dt,p=v.filter(function(f){return d.indexOf(f)>=0});p.length===0&&(p=v);var h=p.reduce(function(f,g){return f[g]=Tt(e,{placement:g,boundary:o,rootBoundary:a,padding:i})[Xe(g)],f},{});return Object.keys(h).sort(function(f,g){return h[f]-h[g]})}function nm(e){if(Xe(e)===Lo)return[];var r=Kt(e);return[Ya(e),r,Ya(r)]}function om(e){var r=e.state,t=e.options,n=e.name;if(!r.modifiersData[n]._skip){for(var o=t.mainAxis,a=o===void 0?!0:o,i=t.altAxis,l=i===void 0?!0:i,c=t.fallbackPlacements,d=t.padding,u=t.boundary,v=t.rootBoundary,p=t.altBoundary,h=t.flipVariations,f=h===void 0?!0:h,g=t.allowedAutoPlacements,b=r.options.placement,x=Xe(b),C=x===b,S=c||(C||!f?[Kt(b)]:nm(b)),k=[b].concat(S).reduce(function(F,W){return F.concat(Xe(W)===Lo?tm(r,{placement:W,boundary:u,rootBoundary:v,padding:d,flipVariations:f,allowedAutoPlacements:g}):W)},[]),w=r.rects.reference,j=r.rects.popper,R=new Map,B=!0,T=k[0],P=0;P<k.length;P++){var N=k[P],A=Xe(N),D=Yr(N)===qr,J=[Ce,Ve].indexOf(A)>=0,K=J?"width":"height",H=Tt(r,{placement:N,boundary:u,rootBoundary:v,altBoundary:p,padding:d}),te=J?D?Fe:je:D?Ve:Ce;w[K]>j[K]&&(te=Kt(te));var se=Kt(te),V=[];if(a&&V.push(H[A]<=0),l&&V.push(H[te]<=0,H[se]<=0),V.every(function(F){return F})){T=N,B=!1;break}R.set(N,V)}if(B)for(var E=f?3:1,$=function(W){var G=k.find(function(Y){var X=R.get(Y);if(X)return X.slice(0,W).every(function(Z){return Z})});if(G)return T=G,"break"},q=E;q>0;q--){var z=$(q);if(z==="break")break}r.placement!==T&&(r.modifiersData[n]._skip=!0,r.placement=T,r.reset=!0)}}const am={name:"flip",enabled:!0,phase:"main",fn:om,requiresIfExists:["offset"],data:{_skip:!1}};function Ja(e,r,t){return t===void 0&&(t={x:0,y:0}),{top:e.top-r.height-t.y,right:e.right-r.width+t.x,bottom:e.bottom-r.height+t.y,left:e.left-r.width-t.x}}function Za(e){return[Ce,Fe,Ve,je].some(function(r){return e[r]>=0})}function sm(e){var r=e.state,t=e.name,n=r.rects.reference,o=r.rects.popper,a=r.modifiersData.preventOverflow,i=Tt(r,{elementContext:"reference"}),l=Tt(r,{altBoundary:!0}),c=Ja(i,n),d=Ja(l,o,a),u=Za(c),v=Za(d);r.modifiersData[t]={referenceClippingOffsets:c,popperEscapeOffsets:d,isReferenceHidden:u,hasPopperEscaped:v},r.attributes.popper=Object.assign({},r.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":v})}const im={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:sm};function lm(e,r,t){var n=Xe(e),o=[je,Ce].indexOf(n)>=0?-1:1,a=typeof t=="function"?t(Object.assign({},r,{placement:e})):t,i=a[0],l=a[1];return i=i||0,l=(l||0)*o,[je,Fe].indexOf(n)>=0?{x:l,y:i}:{x:i,y:l}}function pm(e){var r=e.state,t=e.options,n=e.name,o=t.offset,a=o===void 0?[0,0]:o,i=Ni.reduce(function(u,v){return u[v]=lm(v,r.rects,a),u},{}),l=i[r.placement],c=l.x,d=l.y;r.modifiersData.popperOffsets!=null&&(r.modifiersData.popperOffsets.x+=c,r.modifiersData.popperOffsets.y+=d),r.modifiersData[n]=i}const cm={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:pm};function dm(e){var r=e.state,t=e.name;r.modifiersData[t]=Ri({reference:r.rects.reference,element:r.rects.popper,strategy:"absolute",placement:r.placement})}const um={name:"popperOffsets",enabled:!0,phase:"read",fn:dm,data:{}};function fm(e){return e==="x"?"y":"x"}function mm(e){var r=e.state,t=e.options,n=e.name,o=t.mainAxis,a=o===void 0?!0:o,i=t.altAxis,l=i===void 0?!1:i,c=t.boundary,d=t.rootBoundary,u=t.altBoundary,v=t.padding,p=t.tether,h=p===void 0?!0:p,f=t.tetherOffset,g=f===void 0?0:f,b=Tt(r,{boundary:c,rootBoundary:d,padding:v,altBoundary:u}),x=Xe(r.placement),C=Yr(r.placement),S=!C,k=zo(x),w=fm(k),j=r.modifiersData.popperOffsets,R=r.rects.reference,B=r.rects.popper,T=typeof g=="function"?g(Object.assign({},r.rects,{placement:r.placement})):g,P=typeof T=="number"?{mainAxis:T,altAxis:T}:Object.assign({mainAxis:0,altAxis:0},T),N=r.modifiersData.offset?r.modifiersData.offset[r.placement]:null,A={x:0,y:0};if(j){if(a){var D,J=k==="y"?Ce:je,K=k==="y"?Ve:Fe,H=k==="y"?"height":"width",te=j[k],se=te+b[J],V=te-b[K],E=h?-B[H]/2:0,$=C===qr?R[H]:B[H],q=C===qr?-B[H]:-R[H],z=r.elements.arrow,F=h&&z?Fo(z):{width:0,height:0},W=r.modifiersData["arrow#persistent"]?r.modifiersData["arrow#persistent"].padding:Ti(),G=W[J],Y=W[K],X=wt(0,R[H],F[H]),Z=S?R[H]/2-E-X-G-P.mainAxis:$-X-G-P.mainAxis,Q=S?-R[H]/2+E+X+Y+P.mainAxis:q+X+Y+P.mainAxis,ue=r.elements.arrow&&At(r.elements.arrow),I=ue?k==="y"?ue.clientTop||0:ue.clientLeft||0:0,xe=(D=N==null?void 0:N[k])!=null?D:0,L=te+Z-xe-I,ye=te+Q-xe,Ge=wt(h?nn(se,L):se,te,h?xr(V,ye):V);j[k]=Ge,A[k]=Ge-te}if(l){var ur,Se=k==="x"?Ce:je,Bt=k==="x"?Ve:Fe,Ue=j[w],Or=w==="y"?"height":"width",fr=Ue+b[Se],Rr=Ue-b[Bt],Pr=[Ce,je].indexOf(x)!==-1,_r=(ur=N==null?void 0:N[w])!=null?ur:0,mr=Pr?fr:Ue-R[Or]-B[Or]-_r+P.altAxis,et=Pr?Ue+R[Or]+B[Or]-_r-P.altAxis:Rr,Lt=h&&Pr?Bf(mr,Ue,et):wt(h?mr:fr,Ue,h?et:Rr);j[w]=Lt,A[w]=Lt-Ue}r.modifiersData[n]=A}}const hm={name:"preventOverflow",enabled:!0,phase:"main",fn:mm,requiresIfExists:["offset"]};function gm(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function bm(e){return e===Me(e)||!Le(e)?Go(e):gm(e)}function vm(e){var r=e.getBoundingClientRect(),t=Xr(r.width)/e.offsetWidth||1,n=Xr(r.height)/e.offsetHeight||1;return t!==1||n!==1}function wm(e,r,t){t===void 0&&(t=!1);var n=Le(r),o=Le(r)&&vm(r),a=dr(r),i=Wr(e,o,t),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(n||!n&&!t)&&((Ke(r)!=="body"||Ho(a))&&(l=bm(r)),Le(r)?(c=Wr(r,!0),c.x+=r.clientLeft,c.y+=r.clientTop):a&&(c.x=Uo(a))),{x:i.left+l.scrollLeft-c.x,y:i.top+l.scrollTop-c.y,width:i.width,height:i.height}}function ym(e){var r=new Map,t=new Set,n=[];e.forEach(function(a){r.set(a.name,a)});function o(a){t.add(a.name);var i=[].concat(a.requires||[],a.requiresIfExists||[]);i.forEach(function(l){if(!t.has(l)){var c=r.get(l);c&&o(c)}}),n.push(a)}return e.forEach(function(a){t.has(a.name)||o(a)}),n}function xm(e){var r=ym(e);return _f.reduce(function(t,n){return t.concat(r.filter(function(o){return o.phase===n}))},[])}function km(e){var r;return function(){return r||(r=new Promise(function(t){Promise.resolve().then(function(){r=void 0,t(e())})})),r}}function Nm(e){var r=e.reduce(function(t,n){var o=t[n.name];return t[n.name]=o?Object.assign({},o,n,{options:Object.assign({},o.options,n.options),data:Object.assign({},o.data,n.data)}):n,t},{});return Object.keys(r).map(function(t){return r[t]})}var Qa={placement:"bottom",modifiers:[],strategy:"absolute"};function es(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];return!r.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function Em(e){e===void 0&&(e={});var r=e,t=r.defaultModifiers,n=t===void 0?[]:t,o=r.defaultOptions,a=o===void 0?Qa:o;return function(l,c,d){d===void 0&&(d=a);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},Qa,a),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},v=[],p=!1,h={state:u,setOptions:function(x){var C=typeof x=="function"?x(u.options):x;g(),u.options=Object.assign({},a,u.options,C),u.scrollParents={reference:jr(l)?yt(l):l.contextElement?yt(l.contextElement):[],popper:yt(c)};var S=xm(Nm([].concat(n,u.options.modifiers)));return u.orderedModifiers=S.filter(function(k){return k.enabled}),f(),h.update()},forceUpdate:function(){if(!p){var x=u.elements,C=x.reference,S=x.popper;if(es(C,S)){u.rects={reference:wm(C,At(S),u.options.strategy==="fixed"),popper:Fo(S)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(P){return u.modifiersData[P.name]=Object.assign({},P.data)});for(var k=0;k<u.orderedModifiers.length;k++){if(u.reset===!0){u.reset=!1,k=-1;continue}var w=u.orderedModifiers[k],j=w.fn,R=w.options,B=R===void 0?{}:R,T=w.name;typeof j=="function"&&(u=j({state:u,options:B,name:T,instance:h})||u)}}}},update:km(function(){return new Promise(function(b){h.forceUpdate(),b(u)})}),destroy:function(){g(),p=!0}};if(!es(l,c))return h;h.setOptions(d).then(function(b){!p&&d.onFirstUpdate&&d.onFirstUpdate(b)});function f(){u.orderedModifiers.forEach(function(b){var x=b.name,C=b.options,S=C===void 0?{}:C,k=b.effect;if(typeof k=="function"){var w=k({state:u,name:x,instance:h,options:S}),j=function(){};v.push(w||j)}})}function g(){v.forEach(function(b){return b()}),v=[]}return h}}var Sm=[Wf,um,qf,Mf,cm,am,hm,zf,im],Tm=Em({defaultModifiers:Sm});const Pi="Popper";function Cm(e){return xi(Pi,e)}wf(Pi,["root"]);const jm=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Om=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Rm(e,r){if(r==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function on(e){return typeof e=="function"?e():e}function En(e){return e.nodeType!==void 0}function Pm(e){return!En(e)}const _m=()=>jo({root:["root"]},df(Cm)),$m={},Im=M.forwardRef(function(r,t){var n;const{anchorEl:o,children:a,direction:i,disablePortal:l,modifiers:c,open:d,placement:u,popperOptions:v,popperRef:p,slotProps:h={},slots:f={},TransitionProps:g}=r,b=ke(r,jm),x=M.useRef(null),C=Tr(x,t),S=M.useRef(null),k=Tr(S,p),w=M.useRef(k);Hr(()=>{w.current=k},[k]),M.useImperativeHandle(p,()=>S.current,[]);const j=Rm(u,i),[R,B]=M.useState(j),[T,P]=M.useState(on(o));M.useEffect(()=>{S.current&&S.current.forceUpdate()}),M.useEffect(()=>{o&&P(on(o))},[o]),Hr(()=>{if(!T||!d)return;const K=se=>{B(se.placement)};if(process.env.NODE_ENV!=="production"&&T&&En(T)&&T.nodeType===1){const se=T.getBoundingClientRect();process.env.NODE_ENV!=="test"&&se.top===0&&se.left===0&&se.right===0&&se.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let H=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:se})=>{K(se)}}];c!=null&&(H=H.concat(c)),v&&v.modifiers!=null&&(H=H.concat(v.modifiers));const te=Tm(T,x.current,_({placement:j},v,{modifiers:H}));return w.current(te),()=>{te.destroy(),w.current(null)}},[T,l,c,d,v,j]);const N={placement:R};g!==null&&(N.TransitionProps=g);const A=_m(),D=(n=f.root)!=null?n:"div",J=gf({elementType:D,externalSlotProps:h.root,externalForwardedProps:b,additionalProps:{role:"tooltip",ref:C},ownerState:r,className:A.root});return s.jsx(D,_({},J,{children:typeof a=="function"?a(N):a}))}),_i=M.forwardRef(function(r,t){const{anchorEl:n,children:o,container:a,direction:i="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:d,open:u,placement:v="bottom",popperOptions:p=$m,popperRef:h,style:f,transition:g=!1,slotProps:b={},slots:x={}}=r,C=ke(r,Om),[S,k]=M.useState(!0),w=()=>{k(!1)},j=()=>{k(!0)};if(!c&&!u&&(!g||S))return null;let R;if(a)R=a;else if(n){const P=on(n);R=P&&En(P)?Qt(P).body:Qt(null).body}const B=!u&&c&&(!g||S)?"none":void 0,T=g?{in:u,onEnter:w,onExited:j}:void 0;return s.jsx(tn,{disablePortal:l,container:R,children:s.jsx(Im,_({anchorEl:n,direction:i,disablePortal:l,modifiers:d,ref:t,open:g?!S:u,placement:v,popperOptions:p,popperRef:h,slotProps:b,slots:x},C,{style:_({position:"fixed",top:0,left:0,display:B},f),TransitionProps:T,children:o}))})});process.env.NODE_ENV!=="production"&&(_i.propTypes={anchorEl:To(m.oneOfType([Nt,m.object,m.func]),e=>{if(e.open){const r=on(e.anchorEl);if(r&&En(r)&&r.nodeType===1){const t=r.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&t.top===0&&t.left===0&&t.right===0&&t.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!r||typeof r.getBoundingClientRect!="function"||Pm(r)&&r.contextElement!=null&&r.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:m.oneOfType([m.node,m.func]),container:m.oneOfType([Nt,m.func]),direction:m.oneOf(["ltr","rtl"]),disablePortal:m.bool,keepMounted:m.bool,modifiers:m.arrayOf(m.shape({data:m.object,effect:m.func,enabled:m.bool,fn:m.func,name:m.any,options:m.object,phase:m.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:m.arrayOf(m.string),requiresIfExists:m.arrayOf(m.string)})),open:m.bool.isRequired,placement:m.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:m.shape({modifiers:m.array,onFirstUpdate:m.func,placement:m.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:m.oneOf(["absolute","fixed"])}),popperRef:oi,slotProps:m.shape({root:m.oneOfType([m.func,m.object])}),slots:m.shape({root:m.elementType}),transition:m.bool});function $i(){const e=gi(Mo);return process.env.NODE_ENV!=="production"&&M.useDebugValue(e),e[Do]||e}function oo(e,r){return oo=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,o){return n.__proto__=o,n},oo(e,r)}function Mm(e,r){e.prototype=Object.create(r.prototype),e.prototype.constructor=e,oo(e,r)}const rs={disabled:!1};var Dm=process.env.NODE_ENV!=="production"?m.oneOfType([m.number,m.shape({enter:m.number,exit:m.number,appear:m.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&m.oneOfType([m.string,m.shape({enter:m.string,exit:m.string,active:m.string}),m.shape({enter:m.string,enterDone:m.string,enterActive:m.string,exit:m.string,exitDone:m.string,exitActive:m.string})]);const Ii=y.createContext(null);var Am=function(r){return r.scrollTop},ht="unmounted",br="exited",vr="entering",Lr="entered",ao="exiting",nr=function(e){Mm(r,e);function r(n,o){var a;a=e.call(this,n,o)||this;var i=o,l=i&&!i.isMounting?n.enter:n.appear,c;return a.appearStatus=null,n.in?l?(c=br,a.appearStatus=vr):c=Lr:n.unmountOnExit||n.mountOnEnter?c=ht:c=br,a.state={status:c},a.nextCallback=null,a}r.getDerivedStateFromProps=function(o,a){var i=o.in;return i&&a.status===ht?{status:br}:null};var t=r.prototype;return t.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},t.componentDidUpdate=function(o){var a=null;if(o!==this.props){var i=this.state.status;this.props.in?i!==vr&&i!==Lr&&(a=vr):(i===vr||i===Lr)&&(a=ao)}this.updateStatus(!1,a)},t.componentWillUnmount=function(){this.cancelNextCallback()},t.getTimeouts=function(){var o=this.props.timeout,a,i,l;return a=i=l=o,o!=null&&typeof o!="number"&&(a=o.exit,i=o.enter,l=o.appear!==void 0?o.appear:i),{exit:a,enter:i,appear:l}},t.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===vr){if(this.props.unmountOnExit||this.props.mountOnEnter){var i=this.props.nodeRef?this.props.nodeRef.current:dt.findDOMNode(this);i&&Am(i)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===br&&this.setState({status:ht})},t.performEnter=function(o){var a=this,i=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[dt.findDOMNode(this),l],d=c[0],u=c[1],v=this.getTimeouts(),p=l?v.appear:v.enter;if(!o&&!i||rs.disabled){this.safeSetState({status:Lr},function(){a.props.onEntered(d)});return}this.props.onEnter(d,u),this.safeSetState({status:vr},function(){a.props.onEntering(d,u),a.onTransitionEnd(p,function(){a.safeSetState({status:Lr},function(){a.props.onEntered(d,u)})})})},t.performExit=function(){var o=this,a=this.props.exit,i=this.getTimeouts(),l=this.props.nodeRef?void 0:dt.findDOMNode(this);if(!a||rs.disabled){this.safeSetState({status:br},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:ao},function(){o.props.onExiting(l),o.onTransitionEnd(i.exit,function(){o.safeSetState({status:br},function(){o.props.onExited(l)})})})},t.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},t.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},t.setNextCallback=function(o){var a=this,i=!0;return this.nextCallback=function(l){i&&(i=!1,a.nextCallback=null,o(l))},this.nextCallback.cancel=function(){i=!1},this.nextCallback},t.onTransitionEnd=function(o,a){this.setNextCallback(a);var i=this.props.nodeRef?this.props.nodeRef.current:dt.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!i||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[i,this.nextCallback],d=c[0],u=c[1];this.props.addEndListener(d,u)}o!=null&&setTimeout(this.nextCallback,o)},t.render=function(){var o=this.state.status;if(o===ht)return null;var a=this.props,i=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var l=ke(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return y.createElement(Ii.Provider,{value:null},typeof i=="function"?i(o,l):y.cloneElement(y.Children.only(i),l))},r}(y.Component);nr.contextType=Ii;nr.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:m.shape({current:typeof Element>"u"?m.any:function(e,r,t,n,o,a){var i=e[r];return m.instanceOf(i&&"ownerDocument"in i?i.ownerDocument.defaultView.Element:Element)(e,r,t,n,o,a)}}),children:m.oneOfType([m.func.isRequired,m.element.isRequired]).isRequired,in:m.bool,mountOnEnter:m.bool,unmountOnExit:m.bool,appear:m.bool,enter:m.bool,exit:m.bool,timeout:function(r){var t=Dm;r.addEndListener||(t=t.isRequired);for(var n=arguments.length,o=new Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=arguments[a];return t.apply(void 0,[r].concat(o))},addEndListener:m.func,onEnter:m.func,onEntering:m.func,onEntered:m.func,onExit:m.func,onExiting:m.func,onExited:m.func}:{};function Br(){}nr.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Br,onEntering:Br,onEntered:Br,onExit:Br,onExiting:Br,onExited:Br};nr.UNMOUNTED=ht;nr.EXITED=br;nr.ENTERING=vr;nr.ENTERED=Lr;nr.EXITING=ao;const Bm=nr,Lm=e=>e.scrollTop;function ts(e,r){var t,n;const{timeout:o,easing:a,style:i={}}=e;return{duration:(t=i.transitionDuration)!=null?t:typeof o=="number"?o:o[r.mode]||0,easing:(n=i.transitionTimingFunction)!=null?n:typeof a=="object"?a[r.mode]:a,delay:i.transitionDelay}}const Vm=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function so(e){return`scale(${e}, ${e**2})`}const Fm={entering:{opacity:1,transform:so(1)},entered:{opacity:1,transform:"none"}},zn=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),qo=M.forwardRef(function(r,t){const{addEndListener:n,appear:o=!0,children:a,easing:i,in:l,onEnter:c,onEntered:d,onEntering:u,onExit:v,onExited:p,onExiting:h,style:f,timeout:g="auto",TransitionComponent:b=Bm}=r,x=ke(r,Vm),C=ft(),S=M.useRef(),k=$i(),w=M.useRef(null),j=Tr(w,a.ref,t),R=K=>H=>{if(K){const te=w.current;H===void 0?K(te):K(te,H)}},B=R(u),T=R((K,H)=>{Lm(K);const{duration:te,delay:se,easing:V}=ts({style:f,timeout:g,easing:i},{mode:"enter"});let E;g==="auto"?(E=k.transitions.getAutoHeightDuration(K.clientHeight),S.current=E):E=te,K.style.transition=[k.transitions.create("opacity",{duration:E,delay:se}),k.transitions.create("transform",{duration:zn?E:E*.666,delay:se,easing:V})].join(","),c&&c(K,H)}),P=R(d),N=R(h),A=R(K=>{const{duration:H,delay:te,easing:se}=ts({style:f,timeout:g,easing:i},{mode:"exit"});let V;g==="auto"?(V=k.transitions.getAutoHeightDuration(K.clientHeight),S.current=V):V=H,K.style.transition=[k.transitions.create("opacity",{duration:V,delay:te}),k.transitions.create("transform",{duration:zn?V:V*.666,delay:zn?te:te||V*.333,easing:se})].join(","),K.style.opacity=0,K.style.transform=so(.75),v&&v(K)}),D=R(p),J=K=>{g==="auto"&&C.start(S.current||0,K),n&&n(w.current,K)};return s.jsx(b,_({appear:o,in:l,nodeRef:w,onEnter:T,onEntered:P,onEntering:B,onExit:A,onExited:D,onExiting:N,addEndListener:J,timeout:g==="auto"?null:g},x,{children:(K,H)=>M.cloneElement(a,_({style:_({opacity:0,transform:so(.75),visibility:K==="exited"&&!l?"hidden":void 0},Fm[K],f,a.props.style),ref:j},H))}))});process.env.NODE_ENV!=="production"&&(qo.propTypes={addEndListener:m.func,appear:m.bool,children:ti.isRequired,easing:m.oneOfType([m.shape({enter:m.string,exit:m.string}),m.string]),in:m.bool,onEnter:m.func,onEntered:m.func,onEntering:m.func,onExit:m.func,onExited:m.func,onExiting:m.func,style:m.object,timeout:m.oneOfType([m.oneOf(["auto"]),m.number,m.shape({appear:m.number,enter:m.number,exit:m.number})])});qo.muiSupportAuto=!0;const ns=qo,zm=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Gm=Mt(_i,{name:"MuiPopper",slot:"Root",overridesResolver:(e,r)=>r.root})({}),Mi=M.forwardRef(function(r,t){var n;const o=hi(),a=Ao({props:r,name:"MuiPopper"}),{anchorEl:i,component:l,components:c,componentsProps:d,container:u,disablePortal:v,keepMounted:p,modifiers:h,open:f,placement:g,popperOptions:b,popperRef:x,transition:C,slots:S,slotProps:k}=a,w=ke(a,zm),j=(n=S==null?void 0:S.root)!=null?n:c==null?void 0:c.Root,R=_({anchorEl:i,container:u,disablePortal:v,keepMounted:p,modifiers:h,open:f,placement:g,popperOptions:b,popperRef:x,transition:C},w);return s.jsx(Gm,_({as:l,direction:o==null?void 0:o.direction,slots:{root:j},slotProps:k??d},R,{ref:t}))});process.env.NODE_ENV!=="production"&&(Mi.propTypes={anchorEl:m.oneOfType([Nt,m.object,m.func]),children:m.oneOfType([m.node,m.func]),component:m.elementType,components:m.shape({Root:m.elementType}),componentsProps:m.shape({root:m.oneOfType([m.func,m.object])}),container:m.oneOfType([Nt,m.func]),disablePortal:m.bool,keepMounted:m.bool,modifiers:m.arrayOf(m.shape({data:m.object,effect:m.func,enabled:m.bool,fn:m.func,name:m.any,options:m.object,phase:m.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:m.arrayOf(m.string),requiresIfExists:m.arrayOf(m.string)})),open:m.bool.isRequired,placement:m.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:m.shape({modifiers:m.array,onFirstUpdate:m.func,placement:m.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:m.oneOf(["absolute","fixed"])}),popperRef:oi,slotProps:m.shape({root:m.oneOfType([m.func,m.object])}),slots:m.shape({root:m.elementType}),sx:m.oneOfType([m.arrayOf(m.oneOfType([m.func,m.object,m.bool])),m.func,m.object]),transition:m.bool});const Di=Mi;function Um(e){return fn("MuiTooltip",e)}const Hm=di("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),pr=Hm,qm=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Xm(e){return Math.round(e*1e5)/1e5}const Wm=e=>{const{classes:r,disableInteractive:t,arrow:n,touch:o,placement:a}=e,i={popper:["popper",!t&&"popperInteractive",n&&"popperArrow"],tooltip:["tooltip",n&&"tooltipArrow",o&&"touch",`tooltipPlacement${Ye(a.split("-")[0])}`],arrow:["arrow"]};return jo(i,Um,r)},Ym=Mt(Di,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.popper,!t.disableInteractive&&r.popperInteractive,t.arrow&&r.popperArrow,!t.open&&r.popperClose]}})(({theme:e,ownerState:r,open:t})=>_({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!r.disableInteractive&&{pointerEvents:"auto"},!t&&{pointerEvents:"none"},r.arrow&&{[`&[data-popper-placement*="bottom"] .${pr.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${pr.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${pr.arrow}`]:_({},r.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${pr.arrow}`]:_({},r.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Km=Mt("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.tooltip,t.touch&&r.touch,t.arrow&&r.tooltipArrow,r[`tooltipPlacement${Ye(t.placement.split("-")[0])}`]]}})(({theme:e,ownerState:r})=>_({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:bi(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},r.arrow&&{position:"relative",margin:0},r.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Xm(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${pr.popper}[data-popper-placement*="left"] &`]:_({transformOrigin:"right center"},r.isRtl?_({marginLeft:"14px"},r.touch&&{marginLeft:"24px"}):_({marginRight:"14px"},r.touch&&{marginRight:"24px"})),[`.${pr.popper}[data-popper-placement*="right"] &`]:_({transformOrigin:"left center"},r.isRtl?_({marginRight:"14px"},r.touch&&{marginRight:"24px"}):_({marginLeft:"14px"},r.touch&&{marginLeft:"24px"})),[`.${pr.popper}[data-popper-placement*="top"] &`]:_({transformOrigin:"center bottom",marginBottom:"14px"},r.touch&&{marginBottom:"24px"}),[`.${pr.popper}[data-popper-placement*="bottom"] &`]:_({transformOrigin:"center top",marginTop:"14px"},r.touch&&{marginTop:"24px"})})),Jm=Mt("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,r)=>r.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:bi(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Ht=!1;const os=new _t;let pt={x:0,y:0};function qt(e,r){return t=>{r&&r(t),e(t)}}const Ai=M.forwardRef(function(r,t){var n,o,a,i,l,c,d,u,v,p,h,f,g,b,x,C,S,k,w;const j=Ao({props:r,name:"MuiTooltip"}),{arrow:R=!1,children:B,components:T={},componentsProps:P={},describeChild:N=!1,disableFocusListener:A=!1,disableHoverListener:D=!1,disableInteractive:J=!1,disableTouchListener:K=!1,enterDelay:H=100,enterNextDelay:te=0,enterTouchDelay:se=700,followCursor:V=!1,id:E,leaveDelay:$=0,leaveTouchDelay:q=1500,onClose:z,onOpen:F,open:W,placement:G="bottom",PopperComponent:Y,PopperProps:X={},slotProps:Z={},slots:Q={},title:ue,TransitionComponent:I=ns,TransitionProps:xe}=j,L=ke(j,qm),ye=M.isValidElement(B)?B:s.jsx("span",{children:B}),Ge=$i(),ur=Ge.direction==="rtl",[Se,Bt]=M.useState(),[Ue,Or]=M.useState(null),fr=M.useRef(!1),Rr=J||V,Pr=ft(),_r=ft(),mr=ft(),et=ft(),[Lt,Ko]=si({controlled:W,default:!1,name:"Tooltip",state:"open"});let Je=Lt;if(process.env.NODE_ENV!=="production"){const{current:re}=M.useRef(W!==void 0);M.useEffect(()=>{Se&&Se.disabled&&!re&&ue!==""&&Se.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ue,Se,re])}const Tn=ai(E),rt=M.useRef(),Vt=eo(()=>{rt.current!==void 0&&(document.body.style.WebkitUserSelect=rt.current,rt.current=void 0),et.clear()});M.useEffect(()=>Vt,[Vt]);const Jo=re=>{os.clear(),Ht=!0,Ko(!0),F&&!Je&&F(re)},Ft=eo(re=>{os.start(800+$,()=>{Ht=!1}),Ko(!1),z&&Je&&z(re),Pr.start(Ge.transitions.duration.shortest,()=>{fr.current=!1})}),Cn=re=>{fr.current&&re.type!=="touchstart"||(Se&&Se.removeAttribute("title"),_r.clear(),mr.clear(),H||Ht&&te?_r.start(Ht?te:H,()=>{Jo(re)}):Jo(re))},Zo=re=>{_r.clear(),mr.start($,()=>{Ft(re)})},{isFocusVisibleRef:Qo,onBlur:El,onFocus:Sl,ref:Tl}=ii(),[,ea]=M.useState(!1),ra=re=>{El(re),Qo.current===!1&&(ea(!1),Zo(re))},ta=re=>{Se||Bt(re.currentTarget),Sl(re),Qo.current===!0&&(ea(!0),Cn(re))},na=re=>{fr.current=!0;const Pe=ye.props;Pe.onTouchStart&&Pe.onTouchStart(re)},oa=Cn,aa=Zo,Cl=re=>{na(re),mr.clear(),Pr.clear(),Vt(),rt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",et.start(se,()=>{document.body.style.WebkitUserSelect=rt.current,Cn(re)})},jl=re=>{ye.props.onTouchEnd&&ye.props.onTouchEnd(re),Vt(),mr.start(q,()=>{Ft(re)})};M.useEffect(()=>{if(!Je)return;function re(Pe){(Pe.key==="Escape"||Pe.key==="Esc")&&Ft(Pe)}return document.addEventListener("keydown",re),()=>{document.removeEventListener("keydown",re)}},[Ft,Je]);const Ol=Tr(ye.ref,Tl,Bt,t);!ue&&ue!==0&&(Je=!1);const jn=M.useRef(),Rl=re=>{const Pe=ye.props;Pe.onMouseMove&&Pe.onMouseMove(re),pt={x:re.clientX,y:re.clientY},jn.current&&jn.current.update()},tt={},On=typeof ue=="string";N?(tt.title=!Je&&On&&!D?ue:null,tt["aria-describedby"]=Je?Tn:null):(tt["aria-label"]=On?ue:null,tt["aria-labelledby"]=Je&&!On?Tn:null);const De=_({},tt,L,ye.props,{className:lr(L.className,ye.props.className),onTouchStart:na,ref:Ol},V?{onMouseMove:Rl}:{});process.env.NODE_ENV!=="production"&&(De["data-mui-internal-clone-element"]=!0,M.useEffect(()=>{Se&&!Se.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[Se]));const nt={};K||(De.onTouchStart=Cl,De.onTouchEnd=jl),D||(De.onMouseOver=qt(oa,De.onMouseOver),De.onMouseLeave=qt(aa,De.onMouseLeave),Rr||(nt.onMouseOver=oa,nt.onMouseLeave=aa)),A||(De.onFocus=qt(ta,De.onFocus),De.onBlur=qt(ra,De.onBlur),Rr||(nt.onFocus=ta,nt.onBlur=ra)),process.env.NODE_ENV!=="production"&&ye.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ye.props.title}\` or the Tooltip component.`].join(`
`));const Pl=M.useMemo(()=>{var re;let Pe=[{name:"arrow",enabled:!!Ue,options:{element:Ue,padding:4}}];return(re=X.popperOptions)!=null&&re.modifiers&&(Pe=Pe.concat(X.popperOptions.modifiers)),_({},X.popperOptions,{modifiers:Pe})},[Ue,X]),ot=_({},j,{isRtl:ur,arrow:R,disableInteractive:Rr,placement:G,PopperComponentProp:Y,touch:fr.current}),Rn=Wm(ot),sa=(n=(o=Q.popper)!=null?o:T.Popper)!=null?n:Ym,ia=(a=(i=(l=Q.transition)!=null?l:T.Transition)!=null?i:I)!=null?a:ns,la=(c=(d=Q.tooltip)!=null?d:T.Tooltip)!=null?c:Km,pa=(u=(v=Q.arrow)!=null?v:T.Arrow)!=null?u:Jm,_l=mt(sa,_({},X,(p=Z.popper)!=null?p:P.popper,{className:lr(Rn.popper,X==null?void 0:X.className,(h=(f=Z.popper)!=null?f:P.popper)==null?void 0:h.className)}),ot),$l=mt(ia,_({},xe,(g=Z.transition)!=null?g:P.transition),ot),Il=mt(la,_({},(b=Z.tooltip)!=null?b:P.tooltip,{className:lr(Rn.tooltip,(x=(C=Z.tooltip)!=null?C:P.tooltip)==null?void 0:x.className)}),ot),Ml=mt(pa,_({},(S=Z.arrow)!=null?S:P.arrow,{className:lr(Rn.arrow,(k=(w=Z.arrow)!=null?w:P.arrow)==null?void 0:k.className)}),ot);return s.jsxs(M.Fragment,{children:[M.cloneElement(ye,De),s.jsx(sa,_({as:Y??Di,placement:G,anchorEl:V?{getBoundingClientRect:()=>({top:pt.y,left:pt.x,right:pt.x,bottom:pt.y,width:0,height:0})}:Se,popperRef:jn,open:Se?Je:!1,id:Tn,transition:!0},nt,_l,{popperOptions:Pl,children:({TransitionProps:re})=>s.jsx(ia,_({timeout:Ge.transitions.duration.shorter},re,$l,{children:s.jsxs(la,_({},Il,{children:[ue,R?s.jsx(pa,_({},Ml,{ref:Or})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Ai.propTypes={arrow:m.bool,children:ti.isRequired,classes:m.object,className:m.string,components:m.shape({Arrow:m.elementType,Popper:m.elementType,Tooltip:m.elementType,Transition:m.elementType}),componentsProps:m.shape({arrow:m.object,popper:m.object,tooltip:m.object,transition:m.object}),describeChild:m.bool,disableFocusListener:m.bool,disableHoverListener:m.bool,disableInteractive:m.bool,disableTouchListener:m.bool,enterDelay:m.number,enterNextDelay:m.number,enterTouchDelay:m.number,followCursor:m.bool,id:m.string,leaveDelay:m.number,leaveTouchDelay:m.number,onClose:m.func,onOpen:m.func,open:m.bool,placement:m.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:m.elementType,PopperProps:m.object,slotProps:m.shape({arrow:m.object,popper:m.object,tooltip:m.object,transition:m.object}),slots:m.shape({arrow:m.elementType,popper:m.elementType,tooltip:m.elementType,transition:m.elementType}),sx:m.oneOfType([m.arrayOf(m.oneOfType([m.func,m.object,m.bool])),m.func,m.object]),title:m.node,TransitionComponent:m.elementType,TransitionProps:m.object});const Zm=Ai;function as(e,r,t){return e?s.jsx(Ie.ListItemIcon,{className:`papi-menu-icon-${t?"leading":"trailing"}`,children:s.jsx("img",{src:e,alt:`${t?"Leading":"Trailing"} icon for ${r}`})}):void 0}function Xo(e){const{onClick:r,label:t,tooltip:n,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:i=void 0,hasAutoFocus:l=!1,className:c,isDisabled:d=!1,isDense:u=!0,isSubMenuParent:v=!1,hasDisabledGutters:p=!1,hasDivider:h=!1,focusVisibleClassName:f,id:g,children:b}=e,x=s.jsx(Ie.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:d,dense:u,disableGutters:p,divider:h,focusVisibleClassName:f,onClick:r,id:g,children:t?s.jsxs(s.Fragment,{children:[as(a,t,!0),s.jsx(Ie.ListItemText,{primary:t,inset:!a&&o}),v?s.jsx(Ie.ListItemIcon,{className:"papi-menu-icon-trailing",children:s.jsx(wi,{})}):as(i,t,!1)]}):b});return n?s.jsx(Zm,{title:n,placement:"right",children:s.jsx("div",{children:x})}):x}function Bi(e){return Object.entries(e.groups).map(([t,n])=>({id:t,group:n}))}function Qm(e){const[r,t]=y.useState(void 0),{parentMenuItem:n,parentItemProps:o,menuDefinition:a}=e,i=d=>{t(d.currentTarget)},l=()=>{t(void 0)},c=()=>{let d=Bi(a).filter(u=>"menuItem"in u.group);if(!(n!=null&&n.id))throw new Error("A valid parent menu item is required for submenus.");return d=d.filter(u=>"menuItem"in u.group&&u.group.menuItem===n.id),s.jsx(Li,{...e,includedGroups:d})};return s.jsxs(s.Fragment,{children:[s.jsx(Xo,{onClick:i,...o,isSubMenuParent:!0}),s.jsx(Ie.Menu,{anchorEl:r,open:!!r,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},n.id)]})}const eh=(e,r)=>r.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function Li(e){const{menuDefinition:r,onClick:t,commandHandler:n,includedGroups:o}=e,{items:a,allowForLeadingIcons:i}=y.useMemo(()=>{const u=o&&o.length>0?o:Bi(r).filter(f=>!("menuItem"in f.group)),v=Object.values(u).sort((f,g)=>(f.group.order||0)-(g.group.order||0)),p=[];v.forEach(f=>{eh(f.id,r.items).forEach(g=>p.push({item:g,isLastItemInGroup:!1})),p.length>0&&(p[p.length-1].isLastItemInGroup=!0)}),p.length>0&&(p[p.length-1].isLastItemInGroup=!1);const h=p.some(f=>"iconPathBefore"in f.item&&f.item.iconPathBefore);return{items:p,allowForLeadingIcons:h}},[o,r]),l=({item:u,isLastItemInGroup:v})=>({className:"papi-menu-item",label:u.label,tooltip:u.tooltip,iconPathBefore:"iconPathBefore"in u?u.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in u?u.iconPathAfter:void 0,hasDivider:v,allowForLeadingIcons:i}),[c]=a;if(!c)return s.jsx("div",{});const d=c.item.group;return s.jsx("div",{role:"menu","aria-label":d,children:a.map((u,v)=>{const{item:p}=u,h=l(u);if("command"in p){const f=p.group+v;return s.jsx(Xo,{onClick:g=>{t==null||t(g),n(p)},...h},f)}return s.jsx(Qm,{parentMenuItem:p,parentItemProps:h,...e},d+p.id)})},d)}function rh(e){const{menuDefinition:r,columnId:t}=e;let a=Object.entries(r.groups).map(([i,l])=>({id:i,group:l})).filter(i=>"column"in i.group);return t&&"columns"in r&&r.columns[t]&&(a=a.filter(i=>"column"in i.group&&i.group.column===t)),s.jsx(Li,{...e,includedGroups:a})}function th({commandHandler:e,menuDefinition:r,id:t,metadata:n,onClick:o,className:a}){return s.jsxs(Ie.Grid,{id:t,item:!0,xs:"auto",role:"menu","aria-label":t,className:`papi-menu-column ${a??""}`,children:[s.jsx("h3",{"aria-label":n.label,className:`papi-menu-column-header ${a??""}`,children:n.label}),s.jsx(Ie.List,{id:t,dense:!0,className:a??"",children:s.jsx(rh,{commandHandler:e,menuDefinition:r,columnId:t,onClick:o})})]})}function Vi({commandHandler:e,className:r,multiColumnMenu:t,id:n}){const{columns:o}=t,a=y.useMemo(()=>{const i=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,d=o[c];typeof d=="object"&&typeof d.order=="number"&&!Number.isNaN(d.order)?i.set(d.order,{id:c,metadata:d}):console.warn(`Property ${l} (${typeof d}) on menu ${n} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(i.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,n]);return s.jsx(Ie.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${r??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:n,children:a.map((i,l)=>s.jsx(th,{commandHandler:e,menuDefinition:t,...i,className:r},l))})}function nh(e){return{preserveValue:!0,...e}}const an=(e,r,t={})=>{const n=y.useRef(r);n.current=r;const o=y.useRef(t);o.current=nh(o.current);const[a,i]=y.useState(()=>n.current),[l,c]=y.useState(!0);return y.useEffect(()=>{let d=!0;return c(!!e),(async()=>{if(e){const u=await e();d&&(i(()=>u),c(!1))}})(),()=>{d=!1,o.current.preserveValue||i(()=>n.current)}},[e]),[a,l]},oh=vi(s.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Fi({menuProvider:e,normalMenu:r,fullMenu:t,commandHandler:n,containerRef:o,className:a,ariaLabelPrefix:i,children:l}){const[c,d]=y.useState(!1),[u,v]=y.useState(!1),p=y.useCallback(()=>{c&&d(!1),v(!1)},[c]),h=y.useCallback(k=>{k.stopPropagation(),d(w=>{const j=!w;return j&&k.shiftKey?v(!0):j||v(!1),j})},[]),f=y.useCallback(k=>(p(),n(k)),[n,p]),[g,b]=y.useState({top:1,left:1});y.useEffect(()=>{if(c){const k=o==null?void 0:o.current;if(k){const w=k.getBoundingClientRect(),j=window.scrollY,R=window.scrollX,B=w.top+j+k.clientHeight,T=w.left+R;b({top:B,left:T})}}},[c,o]);const[x]=an(y.useCallback(async()=>(e==null?void 0:e(!1))??r,[e,r,c]),r),[C]=an(y.useCallback(async()=>(e==null?void 0:e(!0))??t??x,[e,t,x,c]),t??x),S=u&&C?C:x;return s.jsxs(s.Fragment,{children:[s.jsx(Ie.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${i??""} menu button`,onClick:h,children:l??s.jsx(oh,{})}),s.jsx(Ie.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:c,onClose:p,PaperProps:{className:"papi-menu-drawer-paper",style:{top:g.top,left:g.left}},children:S?s.jsx(Vi,{className:a,id:`${i??""} main menu`,commandHandler:f,multiColumnMenu:S}):void 0})]})}function ah({id:e,label:r,isDisabled:t=!1,tooltip:n,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:i="medium",className:l,onClick:c,children:d}){return s.jsx(Ie.IconButton,{id:e,disabled:t,edge:a,size:i,"aria-label":r,title:o?void 0:n??r,className:`papi-icon-button ${l??""}`,onClick:c,children:d})}const Qr=y.forwardRef(({className:e,...r},t)=>s.jsx(ne.LoaderCircle,{size:35,className:O("pr-animate-spin",e),...r,ref:t}));Qr.displayName="Spinner";function sh({id:e,isDisabled:r=!1,hasError:t=!1,isFullWidth:n=!1,helperText:o,label:a,placeholder:i,isRequired:l=!1,className:c,defaultValue:d,value:u,onChange:v,onFocus:p,onBlur:h}){return s.jsxs("div",{className:O("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":n}),children:[s.jsx(qe,{htmlFor:e,className:O({"pr-text-red-600":t,"pr-hidden":!a}),children:`${a}${l?"*":""}`}),s.jsx(Kr,{id:e,disabled:r,placeholder:i,required:l,className:O(c,{"pr-border-red-600":t}),defaultValue:d,value:u,onChange:v,onFocus:p,onBlur:h}),s.jsx("p",{className:O({"pr-hidden":!o}),children:o})]})}function ih({menuProvider:e,commandHandler:r,className:t,id:n,children:o}){const a=y.useRef(void 0);return s.jsx("div",{ref:a,style:{position:"relative"},children:s.jsx(Ie.AppBar,{position:"static",id:n,children:s.jsxs(Ie.Toolbar,{className:O("pr-bg-muted pr-text-muted-foreground",t),variant:"dense",children:[e?s.jsx(Fi,{commandHandler:r,containerRef:a,menuProvider:e}):void 0,o?s.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const lh=sn.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),zi=y.forwardRef(({className:e,variant:r,...t},n)=>s.jsx("div",{ref:n,role:"alert",className:O(lh({variant:r}),e),...t}));zi.displayName="Alert";const Gi=y.forwardRef(({className:e,...r},t)=>s.jsxs("h5",{ref:t,className:O("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...r,children:[r.children," "]}));Gi.displayName="AlertTitle";const Ui=y.forwardRef(({className:e,...r},t)=>s.jsx("div",{ref:t,className:O("pr-text-sm [&_p]:pr-leading-relaxed",e),...r}));Ui.displayName="AlertDescription";const Hi=y.forwardRef(({className:e,...r},t)=>s.jsx("div",{ref:t,className:O("pr-twp pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...r}));Hi.displayName="Card";const qi=y.forwardRef(({className:e,...r},t)=>s.jsx("div",{ref:t,className:O("pr-twp pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...r}));qi.displayName="CardHeader";const Xi=y.forwardRef(({className:e,...r},t)=>s.jsx("h3",{ref:t,className:O("pr-twp pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...r,children:r.children}));Xi.displayName="CardTitle";const Wi=y.forwardRef(({className:e,...r},t)=>s.jsx("p",{ref:t,className:O("pr-twp pr-text-sm pr-text-muted-foreground",e),...r}));Wi.displayName="CardDescription";const Yi=y.forwardRef(({className:e,...r},t)=>s.jsx("div",{ref:t,className:O("pr-twp pr-p-6 pr-pt-0",e),...r}));Yi.displayName="CardContent";const Ki=y.forwardRef(({className:e,...r},t)=>s.jsx("div",{ref:t,className:O("pr-twp pr-flex pr-items-center pr-p-6 pr-pt-0",e),...r}));Ki.displayName="CardFooter";function ph({...e}){return s.jsx(hs.Toaster,{className:"pr-toaster pr-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const Ji=y.forwardRef(({className:e,...r},t)=>s.jsxs(ut.Root,{ref:t,className:O("pr-twp pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...r,children:[s.jsx(ut.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:s.jsx(ut.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),s.jsx(ut.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));Ji.displayName=ut.Root.displayName;const Zi=y.forwardRef(({className:e,...r},t)=>s.jsx(Kn.Root,{className:O("pr-peer pr-twp pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...r,ref:t,children:s.jsx(Kn.Thumb,{className:O("pr-twp pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));Zi.displayName=Kn.Root.displayName;const ch=Re.Root,Qi=y.forwardRef(({className:e,...r},t)=>s.jsx(Re.List,{ref:t,className:O("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...r}));Qi.displayName=Re.List.displayName;const el=y.forwardRef(({className:e,...r},t)=>s.jsx(Re.Trigger,{ref:t,className:O("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...r}));el.displayName=Re.Trigger.displayName;const rl=y.forwardRef(({className:e,...r},t)=>s.jsx(Re.Content,{ref:t,className:O("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...r}));rl.displayName=Re.Content.displayName;function dh({isInstalling:e,handleClick:r,buttonText:t,className:n,...o}){return s.jsx(ve,{className:O("pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e,"pr-bg-blue-600":!e,"pr-bg-white pr-text-blue-600 hover:pr-text-white":!t,"pr-w-20":t},n),onClick:r,...o,children:e?s.jsx(Qr,{size:15}):s.jsxs(s.Fragment,{children:[s.jsx(ne.Download,{size:25,className:O("pr-h-4 pr-w-4",{"pr-mr-1":t})}),t]})})}function uh({isEnabling:e,handleClick:r,className:t,...n}){return s.jsx(ve,{className:O("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e},t),onClick:r,...n,children:e?s.jsxs(s.Fragment,{children:[s.jsx(Qr,{size:15,className:"pr-mr-1 pr-text-white"}),"Enabling..."]}):"Enable"})}function fh({isDisabling:e,handleClick:r,className:t,...n}){return s.jsx(ve,{className:O("pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-gray-400",{"pr-cursor-not-allowed pr-bg-gray-400":e},t),onClick:r,...n,children:e?s.jsxs(s.Fragment,{children:[s.jsx(Qr,{size:15,className:"pr-mr-1 pr-text-black"}),"Disabling..."]}):"Disable"})}function mh({isUpdating:e,handleClick:r,className:t,...n}){return s.jsx(ve,{className:O("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700 hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e},t),onClick:r,...n,children:e?s.jsxs(s.Fragment,{children:[s.jsx(Qr,{size:15,className:"pr-mr-1 pr-text-white"}),"Updating..."]}):"Update"})}function yr(){return yr=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},yr.apply(this,arguments)}const hh=["children","options"],U={blockQuote:"0",breakLine:"1",breakThematic:"2",codeBlock:"3",codeFenced:"4",codeInline:"5",footnote:"6",footnoteReference:"7",gfmTask:"8",heading:"9",headingSetext:"10",htmlBlock:"11",htmlComment:"12",htmlSelfClosing:"13",image:"14",link:"15",linkAngleBraceStyleDetector:"16",linkBareUrlDetector:"17",linkMailtoDetector:"18",newlineCoalescer:"19",orderedList:"20",paragraph:"21",ref:"22",refImage:"23",refLink:"24",table:"25",tableSeparator:"26",text:"27",textBolded:"28",textEmphasized:"29",textEscaped:"30",textMarked:"31",textStrikethroughed:"32",unorderedList:"33"};var ss;(function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"})(ss||(ss={}));const is=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,r)=>(e[r.toLowerCase()]=r,e),{for:"htmlFor"}),ls={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},gh=["style","script"],bh=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,vh=/mailto:/i,wh=/\n{2,}$/,tl=/^(\s*>[\s\S]*?)(?=\n{2,})/,yh=/^ *> ?/gm,xh=/^ {2,}\n/,kh=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,nl=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,ol=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,Nh=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,Eh=/^(?:\n *)*\n/,Sh=/\r\n?/g,Th=/^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/,Ch=/^\[\^([^\]]+)]/,jh=/\f/g,Oh=/^---[ \t]*\n(.|\n)*\n---[ \t]*\n/,Rh=/^\s*?\[(x|\s)\]/,al=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,sl=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,il=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,io=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?((?:[^>]*[^/])?)>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/i,Ph=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,ll=/^<!--[\s\S]*?(?:-->)/,_h=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,lo=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,$h=/^\{.*\}$/,Ih=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,Mh=/^<([^ >]+@[^ >]+)>/,Dh=/^<([^ >]+:\/[^ >]+)>/,Ah=/-([a-z])?/gi,pl=/^(.*\|.*)\n(?: *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*))?\n?/,Bh=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,Lh=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,Vh=/^\[([^\]]*)\] ?\[([^\]]*)\]/,Fh=/(\[|\])/g,zh=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,Gh=/\t/g,Uh=/(^ *\||\| *$)/g,Hh=/^ *:-+: *$/,qh=/^ *:-+ *$/,Xh=/^ *-+: *$/,Sn="((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~~.*?~~|==.*?==|.|\\n)*?)",Wh=new RegExp(`^([*_])\\1${Sn}\\1\\1(?!\\1)`),Yh=new RegExp(`^([*_])${Sn}\\1(?!\\1|\\w)`),Kh=new RegExp(`^==${Sn}==`),Jh=new RegExp(`^~~${Sn}~~`),Zh=/^\\([^0-9A-Za-z\s])/,Qh=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,eg=/^\n+/,rg=/^([ \t]*)/,tg=/\\([^\\])/g,ps=/ *\n+$/,ng=/(?:^|\n)( *)$/,Wo="(?:\\d+\\.)",Yo="(?:[*+-])";function cl(e){return"( *)("+(e===1?Wo:Yo)+") +"}const dl=cl(1),ul=cl(2);function fl(e){return new RegExp("^"+(e===1?dl:ul))}const og=fl(1),ag=fl(2);function ml(e){return new RegExp("^"+(e===1?dl:ul)+"[^\\n]*(?:\\n(?!\\1"+(e===1?Wo:Yo)+" )[^\\n]*)*(\\n|$)","gm")}const hl=ml(1),gl=ml(2);function bl(e){const r=e===1?Wo:Yo;return new RegExp("^( *)("+r+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+r+" (?!"+r+" ))\\n*|\\s*\\n*$)")}const vl=bl(1),wl=bl(2);function cs(e,r){const t=r===1,n=t?vl:wl,o=t?hl:gl,a=t?og:ag;return{match(i,l,c){const d=ng.exec(c);return d&&(l.list||!l.inline&&!l.simple)?n.exec(i=d[1]+i):null},order:1,parse(i,l,c){const d=t?+i[2]:void 0,u=i[0].replace(wh,`
`).match(o);let v=!1;return{items:u.map(function(p,h){const f=a.exec(p)[0].length,g=new RegExp("^ {1,"+f+"}","gm"),b=p.replace(g,"").replace(a,""),x=h===u.length-1,C=b.indexOf(`

`)!==-1||x&&v;v=C;const S=c.inline,k=c.list;let w;c.list=!0,C?(c.inline=!1,w=b.replace(ps,`

`)):(c.inline=!0,w=b.replace(ps,""));const j=l(w,c);return c.inline=S,c.list=k,j}),ordered:t,start:d}},render:(i,l,c)=>e(i.ordered?"ol":"ul",{key:c.key,start:i.type===U.orderedList?i.start:void 0},i.items.map(function(d,u){return e("li",{key:u},l(d,c))}))}}const sg=new RegExp(`^\\[((?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*)\\]\\(\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`),ig=/^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,yl=[tl,nl,ol,al,il,sl,ll,pl,hl,vl,gl,wl],lg=[...yl,/^[^\n]+(?:  \n|\n{2,})/,io,lo];function Xt(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function pg(e){return Xh.test(e)?"right":Hh.test(e)?"center":qh.test(e)?"left":null}function ds(e,r,t,n){const o=t.inTable;t.inTable=!0;let a=e.trim().split(/( *(?:`[^`]*`|<.*?>.*?<\/.*?>(?!<\/.*?>)|\\\||\|) *)/).reduce((l,c)=>(c.trim()==="|"?l.push(n?{type:U.tableSeparator}:{type:U.text,text:c}):c!==""&&l.push.apply(l,r(c,t)),l),[]);t.inTable=o;let i=[[]];return a.forEach(function(l,c){l.type===U.tableSeparator?c!==0&&c!==a.length-1&&i.push([]):(l.type!==U.text||a[c+1]!=null&&a[c+1].type!==U.tableSeparator||(l.text=l.text.trimEnd()),i[i.length-1].push(l))}),i}function cg(e,r,t){t.inline=!0;const n=e[2]?e[2].replace(Uh,"").split("|").map(pg):[],o=e[3]?function(i,l,c){return i.trim().split(`
`).map(function(d){return ds(d,l,c,!0)})}(e[3],r,t):[],a=ds(e[1],r,t,!!o.length);return t.inline=!1,o.length?{align:n,cells:o,header:a,type:U.table}:{children:a,type:U.paragraph}}function us(e,r){return e.align[r]==null?{}:{textAlign:e.align[r]}}function ar(e){return function(r,t){return t.inline?e.exec(r):null}}function sr(e){return function(r,t){return t.inline||t.simple?e.exec(r):null}}function Ze(e){return function(r,t){return t.inline||t.simple?null:e.exec(r)}}function ct(e){return function(r){return e.exec(r)}}function dg(e,r,t){if(r.inline||r.simple||t&&!t.endsWith(`
`))return null;let n="";e.split(`
`).every(a=>!yl.some(i=>i.test(a))&&(n+=a+`
`,a.trim()));const o=n.trimEnd();return o==""?null:[n,o]}function ug(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return null}catch{return null}return e}function fs(e){return e.replace(tg,"$1")}function Jt(e,r,t){const n=t.inline||!1,o=t.simple||!1;t.inline=!0,t.simple=!0;const a=e(r,t);return t.inline=n,t.simple=o,a}function fg(e,r,t){const n=t.inline||!1,o=t.simple||!1;t.inline=!1,t.simple=!0;const a=e(r,t);return t.inline=n,t.simple=o,a}function mg(e,r,t){const n=t.inline||!1;t.inline=!1;const o=e(r,t);return t.inline=n,o}const Gn=(e,r,t)=>({children:Jt(r,e[1],t)});function Un(){return{}}function Hn(){return null}function hg(...e){return e.filter(Boolean).join(" ")}function qn(e,r,t){let n=e;const o=r.split(".");for(;o.length&&(n=n[o[0]],n!==void 0);)o.shift();return n||t}function gg(e="",r={}){function t(p,h,...f){const g=qn(r.overrides,`${p}.props`,{});return r.createElement(function(b,x){const C=qn(x,b);return C?typeof C=="function"||typeof C=="object"&&"render"in C?C:qn(x,`${b}.component`,b):b}(p,r.overrides),yr({},h,g,{className:hg(h==null?void 0:h.className,g.className)||void 0}),...f)}function n(p){p=p.replace(Oh,"");let h=!1;r.forceInline?h=!0:r.forceBlock||(h=zh.test(p)===!1);const f=d(c(h?p:`${p.trimEnd().replace(eg,"")}

`,{inline:h}));for(;typeof f[f.length-1]=="string"&&!f[f.length-1].trim();)f.pop();if(r.wrapper===null)return f;const g=r.wrapper||(h?"span":"div");let b;if(f.length>1||r.forceWrapper)b=f;else{if(f.length===1)return b=f[0],typeof b=="string"?t("span",{key:"outer"},b):b;b=null}return M.createElement(g,{key:"outer"},b)}function o(p,h){const f=h.match(bh);return f?f.reduce(function(g,b,x){const C=b.indexOf("=");if(C!==-1){const S=function(R){return R.indexOf("-")!==-1&&R.match(_h)===null&&(R=R.replace(Ah,function(B,T){return T.toUpperCase()})),R}(b.slice(0,C)).trim(),k=function(R){const B=R[0];return(B==='"'||B==="'")&&R.length>=2&&R[R.length-1]===B?R.slice(1,-1):R}(b.slice(C+1).trim()),w=is[S]||S,j=g[w]=function(R,B,T,P){return B==="style"?T.split(/;\s?/).reduce(function(N,A){const D=A.slice(0,A.indexOf(":"));return N[D.trim().replace(/(-[a-z])/g,J=>J[1].toUpperCase())]=A.slice(D.length+1).trim(),N},{}):B==="href"||B==="src"?P(T,R,B):(T.match($h)&&(T=T.slice(1,T.length-1)),T==="true"||T!=="false"&&T)}(p,S,k,r.sanitizer);typeof j=="string"&&(io.test(j)||lo.test(j))&&(g[w]=M.cloneElement(n(j.trim()),{key:x}))}else b!=="style"&&(g[is[b]||b]=!0);return g},{}):null}r.overrides=r.overrides||{},r.sanitizer=r.sanitizer||ug,r.slugify=r.slugify||Xt,r.namedCodesToUnicode=r.namedCodesToUnicode?yr({},ls,r.namedCodesToUnicode):ls,r.createElement=r.createElement||M.createElement;const a=[],i={},l={[U.blockQuote]:{match:Ze(tl),order:1,parse:(p,h,f)=>({children:h(p[0].replace(yh,""),f)}),render:(p,h,f)=>t("blockquote",{key:f.key},h(p.children,f))},[U.breakLine]:{match:ct(xh),order:1,parse:Un,render:(p,h,f)=>t("br",{key:f.key})},[U.breakThematic]:{match:Ze(kh),order:1,parse:Un,render:(p,h,f)=>t("hr",{key:f.key})},[U.codeBlock]:{match:Ze(ol),order:0,parse:p=>({lang:void 0,text:p[0].replace(/^ {4}/gm,"").replace(/\n+$/,"")}),render:(p,h,f)=>t("pre",{key:f.key},t("code",yr({},p.attrs,{className:p.lang?`lang-${p.lang}`:""}),p.text))},[U.codeFenced]:{match:Ze(nl),order:0,parse:p=>({attrs:o("code",p[3]||""),lang:p[2]||void 0,text:p[4],type:U.codeBlock})},[U.codeInline]:{match:sr(Nh),order:3,parse:p=>({text:p[2]}),render:(p,h,f)=>t("code",{key:f.key},p.text)},[U.footnote]:{match:Ze(Th),order:0,parse:p=>(a.push({footnote:p[2],identifier:p[1]}),{}),render:Hn},[U.footnoteReference]:{match:ar(Ch),order:1,parse:p=>({target:`#${r.slugify(p[1],Xt)}`,text:p[1]}),render:(p,h,f)=>t("a",{key:f.key,href:r.sanitizer(p.target,"a","href")},t("sup",{key:f.key},p.text))},[U.gfmTask]:{match:ar(Rh),order:1,parse:p=>({completed:p[1].toLowerCase()==="x"}),render:(p,h,f)=>t("input",{checked:p.completed,key:f.key,readOnly:!0,type:"checkbox"})},[U.heading]:{match:Ze(r.enforceAtxHeadings?sl:al),order:1,parse:(p,h,f)=>({children:Jt(h,p[2],f),id:r.slugify(p[2],Xt),level:p[1].length}),render:(p,h,f)=>t(`h${p.level}`,{id:p.id,key:f.key},h(p.children,f))},[U.headingSetext]:{match:Ze(il),order:0,parse:(p,h,f)=>({children:Jt(h,p[1],f),level:p[2]==="="?1:2,type:U.heading})},[U.htmlBlock]:{match:ct(io),order:1,parse(p,h,f){const[,g]=p[3].match(rg),b=new RegExp(`^${g}`,"gm"),x=p[3].replace(b,""),C=(S=x,lg.some(B=>B.test(S))?mg:Jt);var S;const k=p[1].toLowerCase(),w=gh.indexOf(k)!==-1,j=(w?k:p[1]).trim(),R={attrs:o(j,p[2]),noInnerParse:w,tag:j};return f.inAnchor=f.inAnchor||k==="a",w?R.text=p[3]:R.children=C(h,x,f),f.inAnchor=!1,R},render:(p,h,f)=>t(p.tag,yr({key:f.key},p.attrs),p.text||h(p.children,f))},[U.htmlSelfClosing]:{match:ct(lo),order:1,parse(p){const h=p[1].trim();return{attrs:o(h,p[2]||""),tag:h}},render:(p,h,f)=>t(p.tag,yr({},p.attrs,{key:f.key}))},[U.htmlComment]:{match:ct(ll),order:1,parse:()=>({}),render:Hn},[U.image]:{match:sr(ig),order:1,parse:p=>({alt:p[1],target:fs(p[2]),title:p[3]}),render:(p,h,f)=>t("img",{key:f.key,alt:p.alt||void 0,title:p.title||void 0,src:r.sanitizer(p.target,"img","src")})},[U.link]:{match:ar(sg),order:3,parse:(p,h,f)=>({children:fg(h,p[1],f),target:fs(p[2]),title:p[3]}),render:(p,h,f)=>t("a",{key:f.key,href:r.sanitizer(p.target,"a","href"),title:p.title},h(p.children,f))},[U.linkAngleBraceStyleDetector]:{match:ar(Dh),order:0,parse:p=>({children:[{text:p[1],type:U.text}],target:p[1],type:U.link})},[U.linkBareUrlDetector]:{match:(p,h)=>h.inAnchor?null:ar(Ih)(p,h),order:0,parse:p=>({children:[{text:p[1],type:U.text}],target:p[1],title:void 0,type:U.link})},[U.linkMailtoDetector]:{match:ar(Mh),order:0,parse(p){let h=p[1],f=p[1];return vh.test(f)||(f="mailto:"+f),{children:[{text:h.replace("mailto:",""),type:U.text}],target:f,type:U.link}}},[U.orderedList]:cs(t,1),[U.unorderedList]:cs(t,2),[U.newlineCoalescer]:{match:Ze(Eh),order:3,parse:Un,render:()=>`
`},[U.paragraph]:{match:dg,order:3,parse:Gn,render:(p,h,f)=>t("p",{key:f.key},h(p.children,f))},[U.ref]:{match:ar(Bh),order:0,parse:p=>(i[p[1]]={target:p[2],title:p[4]},{}),render:Hn},[U.refImage]:{match:sr(Lh),order:0,parse:p=>({alt:p[1]||void 0,ref:p[2]}),render:(p,h,f)=>i[p.ref]?t("img",{key:f.key,alt:p.alt,src:r.sanitizer(i[p.ref].target,"img","src"),title:i[p.ref].title}):null},[U.refLink]:{match:ar(Vh),order:0,parse:(p,h,f)=>({children:h(p[1],f),fallbackChildren:h(p[0].replace(Fh,"\\$1"),f),ref:p[2]}),render:(p,h,f)=>i[p.ref]?t("a",{key:f.key,href:r.sanitizer(i[p.ref].target,"a","href"),title:i[p.ref].title},h(p.children,f)):t("span",{key:f.key},h(p.fallbackChildren,f))},[U.table]:{match:Ze(pl),order:1,parse:cg,render(p,h,f){const g=p;return t("table",{key:f.key},t("thead",null,t("tr",null,g.header.map(function(b,x){return t("th",{key:x,style:us(g,x)},h(b,f))}))),t("tbody",null,g.cells.map(function(b,x){return t("tr",{key:x},b.map(function(C,S){return t("td",{key:S,style:us(g,S)},h(C,f))}))})))}},[U.text]:{match:ct(Qh),order:4,parse:p=>({text:p[0].replace(Ph,(h,f)=>r.namedCodesToUnicode[f]?r.namedCodesToUnicode[f]:h)}),render:p=>p.text},[U.textBolded]:{match:sr(Wh),order:2,parse:(p,h,f)=>({children:h(p[2],f)}),render:(p,h,f)=>t("strong",{key:f.key},h(p.children,f))},[U.textEmphasized]:{match:sr(Yh),order:3,parse:(p,h,f)=>({children:h(p[2],f)}),render:(p,h,f)=>t("em",{key:f.key},h(p.children,f))},[U.textEscaped]:{match:sr(Zh),order:1,parse:p=>({text:p[1],type:U.text})},[U.textMarked]:{match:sr(Kh),order:3,parse:Gn,render:(p,h,f)=>t("mark",{key:f.key},h(p.children,f))},[U.textStrikethroughed]:{match:sr(Jh),order:3,parse:Gn,render:(p,h,f)=>t("del",{key:f.key},h(p.children,f))}};r.disableParsingRawHTML===!0&&(delete l[U.htmlBlock],delete l[U.htmlSelfClosing]);const c=function(p){let h=Object.keys(p);function f(g,b){let x=[],C="";for(;g;){let S=0;for(;S<h.length;){const k=h[S],w=p[k],j=w.match(g,b,C);if(j){const R=j[0];g=g.substring(R.length);const B=w.parse(j,f,b);B.type==null&&(B.type=k),x.push(B),C=R;break}S++}}return x}return h.sort(function(g,b){let x=p[g].order,C=p[b].order;return x!==C?x-C:g<b?-1:1}),function(g,b){return f(function(x){return x.replace(Sh,`
`).replace(jh,"").replace(Gh,"    ")}(g),b)}}(l),d=(u=function(p,h){return function(f,g,b){const x=p[f.type].render;return h?h(()=>x(f,g,b),f,g,b):x(f,g,b)}}(l,r.renderRule),function p(h,f={}){if(Array.isArray(h)){const g=f.key,b=[];let x=!1;for(let C=0;C<h.length;C++){f.key=C;const S=p(h[C],f),k=typeof S=="string";k&&x?b[b.length-1]+=S:S!==null&&b.push(S),x=k}return f.key=g,b}return u(h,p,f)});var u;const v=n(e);return a.length?t("div",null,v,t("footer",{key:"footer"},a.map(function(p){return t("div",{id:r.slugify(p.identifier,Xt),key:p.identifier},p.identifier,d(c(p.footnote,{inline:!0})))}))):v}const bg=e=>{let{children:r="",options:t}=e,n=function(o,a){if(o==null)return{};var i,l,c={},d=Object.keys(o);for(l=0;l<d.length;l++)a.indexOf(i=d[l])>=0||(c[i]=o[i]);return c}(e,hh);return M.cloneElement(gg(r,t),n)};function vg({id:e,markdown:r}){return s.jsx("div",{id:e,className:"pr-prose",children:s.jsx(bg,{children:r})})}const xl=y.forwardRef((e,r)=>s.jsxs(ve,{ref:r,className:"pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600",...e,children:[s.jsx(ne.Filter,{size:16,className:"pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"}),"Filter",s.jsx(ne.ChevronDown,{size:16,className:"pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"})]}));var kl=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(kl||{});function wg({id:e,groups:r}){return s.jsx("div",{id:e,children:s.jsxs(pn,{children:[s.jsx(fo,{asChild:!0,children:s.jsx(xl,{})}),s.jsx(Ct,{children:r.map(t=>s.jsxs("div",{children:[s.jsx(Zr,{children:t.label}),s.jsx(Ss,{children:t.items.map(n=>s.jsx("div",{children:n.itemType===0?s.jsx(cn,{onClick:n.onClick,children:n.label}):s.jsx(ho,{onClick:n.onClick,value:n.label,children:n.label})},n.label))}),s.jsx(jt,{})]},t.label))})]})})}function yg({id:e,message:r}){return s.jsx("div",{id:e,className:"pr-mb-20 pr-mt-20 pr-flex pr-items-center pr-justify-center",children:s.jsx("div",{className:"pr-w-3/4 pr-rounded-lg pr-bg-gray-100 pr-p-8 pr-text-center",children:s.jsx("p",{className:"pr-text-lg pr-text-gray-800",children:r})})})}function xg({id:e,category:r,downloads:t,languages:n,moreInfoUrl:o}){const a=new ee.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(t).reduce((l,c)=>l+c,0)),i=()=>{window.scrollTo(0,document.body.scrollHeight)};return s.jsxs("div",{id:e,className:"pr-flex pr-flex-wrap pr-items-start pr-space-x-4 pr-border-b pr-border-t pr-bg-white pr-pb-4 pr-pt-4",children:[s.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[s.jsx("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:s.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:r})}),s.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"CATEGORY"})]}),s.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),s.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[s.jsxs("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:[s.jsx(ne.User,{className:"pr-mr-1 pr-h-4 pr-w-4"}),s.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:a})]}),s.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"USERS"})]}),s.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),s.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[s.jsx("div",{className:"pr-flex pr-items-center",children:n.slice(0,3).map(l=>s.jsx("span",{className:"pr-ml-1 pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1 pr-text-xs pr-font-semibold pr-text-gray-700",children:l.toUpperCase()},l))}),n.length>3&&s.jsxs("button",{type:"button",onClick:()=>i(),className:"pr-text-xs pr-text-gray-500 pr-underline",children:["+",n.length-3," more languages"]})]}),s.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),s.jsxs("div",{className:"pr-ml-auto pr-flex pr-flex-col pr-space-y-2",children:[s.jsxs("a",{href:o,target:"_blank",rel:"noreferrer",className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Website",s.jsx(ne.Link,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]}),s.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Support",s.jsx(ne.CircleHelp,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]})]})]})}function Nl({id:e,versionHistory:r}){const[t,n]=y.useState(!1),o=new Date;function a(l){const c=new Date(l),d=new Date(o.getTime()-c.getTime()),u=d.getUTCFullYear()-1970,v=d.getUTCMonth(),p=d.getUTCDate()-1;let h="";return u>0?h=`${u.toString()} year${u===1?"":"s"} ago`:v>0?h=`${v.toString()} month${v===1?"":"s"} ago`:p===0?h="today":h=`${p.toString()} day${p===1?"":"s"} ago`,h}const i=Object.entries(r).sort((l,c)=>c[0].localeCompare(l[0]));return s.jsxs("div",{id:e,children:[s.jsx("h3",{className:"pr-text-md pr-font-semibold",children:"What`s New"}),s.jsx("ul",{className:"pr-list-disc pr-pl-5 pr-pr-4 pr-text-xs pr-text-gray-600",children:(t?i:i.slice(0,5)).map(l=>s.jsxs("div",{className:"pr-mt-3 pr-flex pr-justify-between",children:[s.jsx("div",{className:"pr-text-gray-600",children:s.jsx("li",{className:"pr-prose pr-text-xs",children:s.jsx("span",{children:l[1].description})})}),s.jsxs("div",{className:"pr-justify-end pr-text-right",children:[s.jsxs("div",{children:["Version ",l[0]]}),s.jsx("div",{children:a(l[1].date)})]})]},l[0]))}),i.length>5&&s.jsx("button",{type:"button",onClick:()=>n(!t),className:"pr-text-xs pr-text-gray-500 pr-underline",children:t?"Show Less Version History":"Show All Version History"})]})}function kg({id:e,publisherDisplayName:r,fileSize:t,locales:n,versionHistory:o}){const a=y.useMemo(()=>ee.formatBytes(t),[t]),l=(c=>{const d=new Intl.DisplayNames(navigator.language,{type:"language"});return c.map(u=>d.of(u))})(n);return s.jsx("div",{id:e,className:"pr-border-t pr-pb-4 pr-pt-4",children:s.jsxs("div",{className:"pr-md:flex-row pr-md:space-x-8 pr-flex pr-flex-col pr-space-x-0",children:[s.jsx(Nl,{versionHistory:o}),s.jsx("div",{className:"pr-md:border-t-0 pr-md:border-l pr-md-h-auto pr-md-ml-8 pr-mt-4 pr-border-t pr-border-gray-300"}),s.jsxs("div",{className:"pr-md:mt-0 pr-mt-4 pr-flex-1 pr-space-y-3",children:[s.jsx("h2",{className:"pr-text-md pr-font-semibold",children:"Information"}),s.jsxs("div",{className:"pr-flex pr-items-start pr-justify-between pr-pr-4 pr-text-xs pr-text-gray-600",children:[s.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[s.jsx("span",{className:"pr-mb-2",children:"Publisher"}),s.jsx("span",{className:"pr-font-semibold",children:r}),s.jsx("span",{className:"pr-mb-2 pr-mt-4",children:"Size"}),s.jsx("span",{className:"pr-font-semibold",children:a})]}),s.jsx("div",{className:"pr-flex pr-w-3/4 pr-items-center pr-justify-between pr-text-xs pr-text-gray-600",children:s.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[s.jsx("span",{className:"pr-mb-2",children:"Languages"}),s.jsx("span",{className:"pr-font-semibold",children:l.join(", ")})]})})]})]})]})})}const Ng=(e,r)=>{y.useEffect(()=>{if(!e)return()=>{};const t=e(r);return()=>{t()}},[e,r])},Xn=()=>!1,Eg=(e,r)=>{const[t]=an(y.useCallback(async()=>{if(!e)return Xn;const n=await Promise.resolve(e(r));return async()=>n()},[r,e]),Xn,{preserveValue:!1});y.useEffect(()=>()=>{t!==Xn&&t()},[t])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>hs.toast});exports.Alert=zi;exports.AlertDescription=Ui;exports.AlertTitle=Gi;exports.BOOK_SELECTOR_STRING_KEYS=Mp;exports.BookChapterControl=Ep;exports.BookSelectionMode=Bs;exports.BookSelector=Dp;exports.Button=ve;exports.Card=Hi;exports.CardContent=Yi;exports.CardDescription=Wi;exports.CardFooter=Ki;exports.CardHeader=qi;exports.CardTitle=Xi;exports.ChapterRangeSelector=As;exports.Checkbox=Eo;exports.Checklist=lc;exports.ComboBox=Jn;exports.DataTable=Us;exports.DisableButton=fh;exports.DropdownMenu=pn;exports.DropdownMenuCheckboxItem=cn;exports.DropdownMenuContent=Ct;exports.DropdownMenuGroup=Ss;exports.DropdownMenuItem=mo;exports.DropdownMenuItemType=kl;exports.DropdownMenuLabel=Zr;exports.DropdownMenuPortal=dp;exports.DropdownMenuRadioGroup=fp;exports.DropdownMenuRadioItem=ho;exports.DropdownMenuSeparator=jt;exports.DropdownMenuShortcut=js;exports.DropdownMenuSub=up;exports.DropdownMenuSubContent=Cs;exports.DropdownMenuSubTrigger=Ts;exports.DropdownMenuTrigger=fo;exports.EnableButton=uh;exports.FilterButton=xl;exports.FilterDropdown=wg;exports.Footer=kg;exports.GridMenu=Vi;exports.HamburgerMenuButton=Fi;exports.INVENTORY_STRING_KEYS=Fp;exports.IconButton=ah;exports.Input=Kr;exports.InstallButton=dh;exports.Inventory=Up;exports.Label=qe;exports.MarkdownRenderer=vg;exports.MenuItem=Xo;exports.MoreInfo=xg;exports.NavigationContentSearch=Yp;exports.NoExtensionsFound=yg;exports.RadioGroup=go;exports.RadioGroupItem=Zt;exports.ScriptureResultsViewer=nc;exports.ScrollGroupSelector=oc;exports.SearchBar=Xs;exports.Select=Fr;exports.SelectContent=Er;exports.SelectGroup=Ls;exports.SelectItem=Ae;exports.SelectLabel=Vs;exports.SelectScrollDownButton=vo;exports.SelectScrollUpButton=bo;exports.SelectSeparator=Fs;exports.SelectTrigger=Nr;exports.SelectValue=zr;exports.Separator=No;exports.SettingsList=ac;exports.SettingsListHeader=ic;exports.SettingsListItem=sc;exports.Slider=Ji;exports.Sonner=ph;exports.Spinner=Qr;exports.Switch=Zi;exports.Table=Ot;exports.TableBody=Pt;exports.TableCaption=Gs;exports.TableCell=Sr;exports.TableFooter=zs;exports.TableHead=Gr;exports.TableHeader=Rt;exports.TableRow=Qe;exports.Tabs=ch;exports.TabsContent=rl;exports.TabsList=Qi;exports.TabsTrigger=el;exports.TextField=sh;exports.ToggleGroup=wo;exports.ToggleGroupItem=bt;exports.Toolbar=ih;exports.UpdateButton=mh;exports.VersionHistory=Nl;exports.VerticalTabs=yo;exports.VerticalTabsContent=ko;exports.VerticalTabsList=xo;exports.VerticalTabsTrigger=Ws;exports.buttonVariants=Os;exports.getSortingIcon=dn;exports.inventoryCountColumn=Xp;exports.inventoryItemColumn=qp;exports.inventoryStatusColumn=Wp;exports.useEvent=Ng;exports.useEventAsync=Eg;exports.usePromise=an;function Sg(e,r="top"){if(!e||typeof document>"u")return;const t=document.head||document.querySelector("head"),n=t.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),r==="top"&&n?t.insertBefore(o,n):t.appendChild(o)}Sg(`.papi-menu-item {
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
    --background: 0 0% 100%;
    --foreground: 0 0% 0%;
    --muted: 33.9 32.4% 86.1%;
    --muted-foreground: 15.5 13.2% 53.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 0%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 0%;
    --border: 220 13% 91%;
    --input: 161.3 26.7% 88.2%;
    --primary: 173.4 82.1% 15.3%;
    --primary-foreground: 40 85.7% 97.3%;
    --secondary: 161.3 26.7% 88.2%;
    --secondary-foreground: 173.4 82.1% 15.3%;
    --accent: 161.3 26.7% 88.2%;
    --accent-foreground: 173.4 82.1% 15.3%;
    --destructive: 0 60% 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5 13.2% 53.9%;
  }

  .paratext-dark {
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;
    --muted: 15.5 13.2% 53.9%;
    --muted-foreground: 33.9 32.4% 86.1%;
    --popover: 180 71.4% 5%;
    --popover-foreground: 0 0% 100%;
    --card: 0 0% 0%;
    --card-foreground: 0 0% 100%;
    --border: 220 13% 20%;
    --input: 220 13% 20%;
    --primary: 161.3 26.7% 88.2%;
    --primary-foreground: 173.4 82.1% 15.3%;
    --secondary: 180 71.4% 11%;
    --secondary-foreground: 161.3 26.7% 88.2%;
    --accent: 180 71.4% 11%;
    --accent-foreground: 161.3 26.7% 88.2%;
    --destructive: 0 60% 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5 13.2% 53.9%;
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
.pr-sticky {
  position: sticky;
}
.pr-inset-0 {
  inset: 0px;
}
.pr-inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.pr-bottom-2 {
  bottom: 0.5rem;
}
.pr-left-2 {
  left: 0.5rem;
}
.pr-left-2\\.5 {
  left: 0.625rem;
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
.pr-top-0 {
  top: 0px;
}
.pr-top-1\\/2 {
  top: 50%;
}
.pr-top-2 {
  top: 0.5rem;
}
.pr-top-2\\.5 {
  top: 0.625rem;
}
.pr-top-4 {
  top: 1rem;
}
.pr-top-\\[50\\%\\] {
  top: 50%;
}
.pr-z-10 {
  z-index: 10;
}
.pr-z-30 {
  z-index: 30;
}
.pr-z-50 {
  z-index: 50;
}
.pr-col-span-2 {
  grid-column: span 2 / span 2;
}
.pr-m-1 {
  margin: 0.25rem;
}
.pr-m-2 {
  margin: 0.5rem;
}
.pr--mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
.pr-mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
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
.pr-mb-20 {
  margin-bottom: 5rem;
}
.pr-me-2 {
  margin-inline-end: 0.5rem;
}
.pr-ml-1 {
  margin-left: 0.25rem;
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
.pr-ms-2 {
  margin-inline-start: 0.5rem;
}
.pr-ms-5 {
  margin-inline-start: 1.25rem;
}
.pr-ms-auto {
  margin-inline-start: auto;
}
.pr-mt-2 {
  margin-top: 0.5rem;
}
.pr-mt-20 {
  margin-top: 5rem;
}
.pr-mt-3 {
  margin-top: 0.75rem;
}
.pr-mt-4 {
  margin-top: 1rem;
}
.pr-mt-auto {
  margin-top: auto;
}
.pr-box-border {
  box-sizing: border-box;
}
.pr-box-content {
  box-sizing: content-box;
}
.pr-block {
  display: block;
}
.pr-inline-block {
  display: inline-block;
}
.pr-inline {
  display: inline;
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
.pr-aspect-square {
  aspect-ratio: 1 / 1;
}
.pr-h-1\\/2 {
  height: 50%;
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
.pr-h-2\\.5 {
  height: 0.625rem;
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
.pr-h-96 {
  height: 24rem;
}
.pr-h-\\[1\\.2rem\\] {
  height: 1.2rem;
}
.pr-h-\\[100\\%\\] {
  height: 100%;
}
.pr-h-\\[1px\\] {
  height: 1px;
}
.pr-h-\\[405px\\] {
  height: 405px;
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
.pr-max-h-\\[300px\\] {
  max-height: 300px;
}
.pr-w-0 {
  width: 0px;
}
.pr-w-1\\/3 {
  width: 33.333333%;
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
.pr-w-2\\.5 {
  width: 0.625rem;
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
.pr-w-3\\/4 {
  width: 75%;
}
.pr-w-4 {
  width: 1rem;
}
.pr-w-5 {
  width: 1.25rem;
}
.pr-w-6 {
  width: 1.5rem;
}
.pr-w-72 {
  width: 18rem;
}
.pr-w-8 {
  width: 2rem;
}
.pr-w-9 {
  width: 2.25rem;
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
.pr-w-\\[1px\\] {
  width: 1px;
}
.pr-w-\\[200px\\] {
  width: 200px;
}
.pr-w-\\[350px\\] {
  width: 350px;
}
.pr-w-\\[70px\\] {
  width: 70px;
}
.pr-w-auto {
  width: auto;
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
.pr-max-w-lg {
  max-width: 32rem;
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
.pr-list-disc {
  list-style-type: disc;
}
.pr-columns-2 {
  columns: 2;
}
.pr-auto-rows-max {
  grid-auto-rows: max-content;
}
.pr-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.pr-grid-cols-\\[25\\%\\,25\\%\\,50\\%\\] {
  grid-template-columns: 25% 25% 50%;
}
.pr-grid-cols-\\[25\\%\\,50\\%\\,25\\%\\] {
  grid-template-columns: 25% 50% 25%;
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
.pr-gap-0 {
  gap: 0px;
}
.pr-gap-0\\.5 {
  gap: 0.125rem;
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
.pr-gap-3 {
  gap: 0.75rem;
}
.pr-gap-4 {
  gap: 1rem;
}
.pr-gap-6 {
  gap: 1.5rem;
}
.pr-gap-x-4 {
  column-gap: 1rem;
}
.pr-space-x-0 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0px * var(--tw-space-x-reverse));
  margin-left: calc(0px * calc(1 - var(--tw-space-x-reverse)));
}
.pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.pr-space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
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
.pr-space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.pr-space-y-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}
.pr-space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
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
.pr-overflow-y-hidden {
  overflow-y: hidden;
}
.pr-text-ellipsis {
  text-overflow: ellipsis;
}
.pr-whitespace-normal {
  white-space: normal;
}
.pr-whitespace-nowrap {
  white-space: nowrap;
}
.pr-text-nowrap {
  text-wrap: nowrap;
}
.pr-text-balance {
  text-wrap: balance;
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
.pr-rounded-s-md {
  border-start-start-radius: calc(var(--radius) - 2px);
  border-end-start-radius: calc(var(--radius) - 2px);
}
.pr-rounded-ee-none {
  border-end-end-radius: 0px;
}
.pr-rounded-se-md {
  border-start-end-radius: calc(var(--radius) - 2px);
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
.pr-border-e {
  border-inline-end-width: 1px;
}
.pr-border-l {
  border-left-width: 1px;
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
.pr-border-dashed {
  border-style: dashed;
}
.pr-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
}
.pr-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.pr-border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
}
.pr-border-gray-400 {
  --tw-border-opacity: 1;
  border-color: rgb(156 163 175 / var(--tw-border-opacity));
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
.pr-bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
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
.pr-bg-muted\\/40 {
  background-color: hsl(var(--muted) / 0.4);
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
.pr-p-8 {
  padding: 2rem;
}
.pr-p-\\[1px\\] {
  padding: 1px;
}
.pr-px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
.pr-px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.pr-px-2\\.5 {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.pr-px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.pr-px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.pr-px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.pr-px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.pr-px-7 {
  padding-left: 1.75rem;
  padding-right: 1.75rem;
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
.pr-py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.pr-py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.pr-pb-2 {
  padding-bottom: 0.5rem;
}
.pr-pb-3 {
  padding-bottom: 0.75rem;
}
.pr-pb-4 {
  padding-bottom: 1rem;
}
.pr-pe-2 {
  padding-inline-end: 0.5rem;
}
.pr-pl-4 {
  padding-left: 1rem;
}
.pr-pl-5 {
  padding-left: 1.25rem;
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
.pr-pr-4 {
  padding-right: 1rem;
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
.pr-pt-3 {
  padding-top: 0.75rem;
}
.pr-pt-4 {
  padding-top: 1rem;
}
.pr-text-center {
  text-align: center;
}
.pr-text-right {
  text-align: right;
}
.pr-text-start {
  text-align: start;
}
.pr-text-end {
  text-align: end;
}
.pr-align-middle {
  vertical-align: middle;
}
.pr-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.pr-text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
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
.pr-capitalize {
  text-transform: capitalize;
}
.pr-not-italic {
  font-style: normal;
}
.pr-tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
.pr-leading-9 {
  line-height: 2.25rem;
}
.pr-leading-none {
  line-height: 1;
}
.pr-leading-relaxed {
  line-height: 1.625;
}
.pr-tracking-tight {
  letter-spacing: -0.025em;
}
.pr-tracking-widest {
  letter-spacing: 0.1em;
}
.pr-text-accent-foreground {
  color: hsl(var(--accent-foreground));
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
.pr-text-foreground\\/80 {
  color: hsl(var(--foreground) / 0.8);
}
.pr-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
.pr-text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity));
}
.pr-text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
}
.pr-text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity));
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
.pr-underline {
  text-decoration-line: underline;
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
.pr-duration-200 {
  animation-duration: 200ms;
}
.pr-duration-300 {
  animation-duration: 300ms;
}
.pr-ease-in-out {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.\\*\\:pr-m-4 > * {
  margin: 1rem;
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
.hover\\:pr-border-blue-600:hover {
  --tw-border-opacity: 1;
  border-color: rgb(37 99 235 / var(--tw-border-opacity));
}
.hover\\:pr-bg-accent:hover {
  background-color: hsl(var(--accent));
}
.hover\\:pr-bg-blue-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
}
.hover\\:pr-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}
.hover\\:pr-bg-gray-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity));
}
.hover\\:pr-bg-muted:hover {
  background-color: hsl(var(--muted));
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
.hover\\:pr-bg-white:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.hover\\:pr-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}
.hover\\:pr-text-blue-600:hover {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}
.hover\\:pr-text-foreground:hover {
  color: hsl(var(--foreground));
}
.hover\\:pr-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}
.hover\\:pr-text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
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
.pr-group:hover .group-hover\\:pr-opacity-100 {
  opacity: 1;
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
.data-\\[selected\\=true\\]\\:pr-bg-accent[data-selected=true] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=active\\]\\:pr-bg-background[data-state=active] {
  background-color: hsl(var(--background));
}
.data-\\[state\\=checked\\]\\:pr-bg-primary[data-state=checked] {
  background-color: hsl(var(--primary));
}
.data-\\[state\\=on\\]\\:pr-bg-accent[data-state=on] {
  background-color: hsl(var(--accent));
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
.data-\\[state\\=checked\\]\\:pr-text-primary-foreground[data-state=checked] {
  color: hsl(var(--primary-foreground));
}
.data-\\[state\\=on\\]\\:pr-text-accent-foreground[data-state=on] {
  color: hsl(var(--accent-foreground));
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

  .sm\\:pr-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .sm\\:pr-static {
    position: static;
  }

  .sm\\:pr-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .sm\\:pr-flex {
    display: flex;
  }

  .sm\\:pr-table-cell {
    display: table-cell;
  }

  .sm\\:pr-hidden {
    display: none;
  }

  .sm\\:pr-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sm\\:pr-flex-row {
    flex-direction: row;
  }

  .sm\\:pr-justify-end {
    justify-content: flex-end;
  }

  .sm\\:pr-gap-4 {
    gap: 1rem;
  }

  .sm\\:pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:pr-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:pr-border-0 {
    border-width: 0px;
  }

  .sm\\:pr-bg-transparent {
    background-color: transparent;
  }

  .sm\\:pr-px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .sm\\:pr-py-0 {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .sm\\:pr-py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .sm\\:pr-py-5 {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .sm\\:pr-pl-14 {
    padding-left: 3.5rem;
  }

  .sm\\:pr-text-left {
    text-align: left;
  }
}
@media (min-width: 768px) {

  .md\\:pr-inline {
    display: inline;
  }

  .md\\:pr-flex {
    display: flex;
  }

  .md\\:pr-table-cell {
    display: table-cell;
  }

  .md\\:pr-h-8 {
    height: 2rem;
  }

  .md\\:pr-w-8 {
    width: 2rem;
  }

  .md\\:pr-w-\\[200px\\] {
    width: 200px;
  }

  .md\\:pr-grow-0 {
    flex-grow: 0;
  }

  .md\\:pr-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .md\\:pr-gap-8 {
    gap: 2rem;
  }

  .md\\:pr-text-base {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}
@media (min-width: 1024px) {

  .lg\\:pr-sr-only {
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

  .lg\\:pr-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .lg\\:pr-flex {
    display: flex;
  }

  .lg\\:pr-w-\\[336px\\] {
    width: 336px;
  }

  .lg\\:pr-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\\:pr-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lg\\:pr-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }
}
@media (min-width: 1280px) {

  .xl\\:pr-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .xl\\:pr-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .xl\\:pr-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .xl\\:pr-whitespace-nowrap {
    white-space: nowrap;
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
.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-pe-0:has([role=checkbox]) {
  padding-inline-end: 0px;
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state="selected"]:hover {
  cursor: default;
}
.papi-menu-drawer-paper {
  height: fit-content !important;
  position: absolute !important;
}

.papi-toolbar-children {
  padding: 10px;
  display: flex;
  gap: 8px;
}
`,"top");
//# sourceMappingURL=index.cjs.map
