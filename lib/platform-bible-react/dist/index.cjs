"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const s=require("react/jsx-runtime"),y=require("react"),te=require("lucide-react"),lr=require("clsx"),Il=require("tailwind-merge"),us=require("@radix-ui/react-dropdown-menu"),Q=require("platform-bible-utils"),Ml=require("@radix-ui/react-slot"),sn=require("class-variance-authority"),Al=require("@radix-ui/react-label"),Dl=require("@radix-ui/react-radio-group"),Bl=require("@radix-ui/react-popover"),Oe=require("cmdk"),Ll=require("@radix-ui/react-dialog"),Ne=require("@tanstack/react-table"),Vl=require("@radix-ui/react-select"),Fl=require("@radix-ui/react-toggle-group"),zl=require("@radix-ui/react-toggle"),Gl=require("@radix-ui/react-tabs"),Hl=require("@radix-ui/react-separator"),Ul=require("@radix-ui/react-checkbox"),qn=require("@mui/styled-engine"),Ie=require("@mui/material"),ut=require("react-dom"),fs=require("sonner"),Xl=require("@radix-ui/react-slider"),ql=require("@radix-ui/react-switch");function Ee(e){const r=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const t in e)if(t!=="default"){const n=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,n.get?n:{enumerable:!0,get:()=>e[t]})}}return r.default=e,Object.freeze(r)}const M=Ee(y),fe=Ee(us),ms=Ee(Al),kt=Ee(Dl),Nt=Ee(Bl),We=Ee(Ll),ve=Ee(Vl),ln=Ee(Fl),hs=Ee(zl),Re=Ee(Gl),gs=Ee(Hl),Wn=Ee(Ul),Wl=Ee(ut),ft=Ee(Xl),Yn=Ee(ql);const Yl=Il.extendTailwindMerge({prefix:"pr-"});function O(...e){return Yl(lr.clsx(e))}const Jr=y.forwardRef(({className:e,type:r,...t},n)=>s.jsx("input",{type:r,className:O("pr-twp pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:n,...t}));Jr.displayName="Input";const Kl=y.forwardRef(({handleSearch:e,handleKeyDown:r,handleOnClick:t,handleSubmit:n,...o},a)=>s.jsxs("div",{className:"pr-relative",children:[s.jsx(Jr,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-bg-background pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-shadow-none pr-outline-none",onChange:i=>e(i.target.value),onKeyDown:i=>{i.key==="Enter"&&n(),r(i)},onClick:t,ref:a}),s.jsx(te.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-muted-foreground",onClick:()=>{console.log("back in history")}})]}));var Jl=Object.defineProperty,Zl=(e,r,t)=>r in e?Jl(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,ne=(e,r,t)=>Zl(e,typeof r!="symbol"?r+"":r,t);const kr=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],lo=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],vs=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],pa=lp();function Zr(e,r=!0){return r&&(e=e.toUpperCase()),e in pa?pa[e]:0}function po(e){return Zr(e)>0}function Ql(e){const r=typeof e=="string"?Zr(e):e;return r>=40&&r<=66}function ep(e){return(typeof e=="string"?Zr(e):e)<=39}function bs(e){return e<=66}function rp(e){const r=typeof e=="string"?Zr(e):e;return xs(r)&&!bs(r)}function*tp(){for(let e=1;e<=kr.length;e++)yield e}const np=1,ws=kr.length;function op(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function co(e,r="***"){const t=e-1;return t<0||t>=kr.length?r:kr[t]}function ys(e){return e<=0||e>ws?"******":vs[e-1]}function ap(e){return ys(Zr(e))}function xs(e){const r=typeof e=="number"?co(e):e;return po(r)&&!lo.includes(r)}function sp(e){const r=typeof e=="number"?co(e):e;return po(r)&&lo.includes(r)}function ip(e){return vs[e-1].includes("*obsolete*")}function lp(){const e={};for(let r=0;r<kr.length;r++)e[kr[r]]=r+1;return e}const de={allBookIds:kr,nonCanonicalIds:lo,bookIdToNumber:Zr,isBookIdValid:po,isBookNT:Ql,isBookOT:ep,isBookOTNT:bs,isBookDC:rp,allBookNumbers:tp,firstBook:np,lastBook:ws,extraBooks:op,bookNumberToId:co,bookNumberToEnglishName:ys,bookIdToEnglishName:ap,isCanonical:xs,isExtraMaterial:sp,isObsolete:ip};var Ue=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ue||{});const Pe=class{constructor(r){if(ne(this,"name"),ne(this,"fullPath"),ne(this,"isPresent"),ne(this,"hasVerseSegments"),ne(this,"isCustomized"),ne(this,"baseVersification"),ne(this,"scriptureBooks"),ne(this,"_type"),r==null)throw new Error("Argument undefined");typeof r=="string"?(this.name=r,this._type=Ue[r]):(this._type=r,this.name=Ue[r])}get type(){return this._type}equals(r){return!r.type||!this.type?!1:r.type===this.type}};ne(Pe,"Original",new Pe(Ue.Original)),ne(Pe,"Septuagint",new Pe(Ue.Septuagint)),ne(Pe,"Vulgate",new Pe(Ue.Vulgate)),ne(Pe,"English",new Pe(Ue.English)),ne(Pe,"RussianProtestant",new Pe(Ue.RussianProtestant)),ne(Pe,"RussianOrthodox",new Pe(Ue.RussianOrthodox));let hr=Pe;function ca(e,r){const t=r[0];for(let n=1;n<r.length;n++)e=e.split(r[n]).join(t);return e.split(t)}var ks=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(ks||{});const Te=class ae{constructor(r,t,n,o){if(ne(this,"firstChapter"),ne(this,"lastChapter"),ne(this,"lastVerse"),ne(this,"hasSegmentsDefined"),ne(this,"text"),ne(this,"BBBCCCVVVS"),ne(this,"longHashCode"),ne(this,"versification"),ne(this,"rtlMark","‏"),ne(this,"_bookNum",0),ne(this,"_chapterNum",0),ne(this,"_verseNum",0),ne(this,"_verse"),n==null&&o==null)if(r!=null&&typeof r=="string"){const a=r,i=t!=null&&t instanceof hr?t:void 0;this.setEmpty(i),this.parse(a)}else if(r!=null&&typeof r=="number"){const a=t!=null&&t instanceof hr?t:void 0;this.setEmpty(a),this._verseNum=r%ae.chapterDigitShifter,this._chapterNum=Math.floor(r%ae.bookDigitShifter/ae.chapterDigitShifter),this._bookNum=Math.floor(r/ae.bookDigitShifter)}else if(t==null)if(r!=null&&r instanceof ae){const a=r;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(r==null)return;const a=r instanceof hr?r:ae.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(r!=null&&t!=null&&n!=null)if(typeof r=="string"&&typeof t=="string"&&typeof n=="string")this.setEmpty(o),this.updateInternal(r,t,n);else if(typeof r=="number"&&typeof t=="number"&&typeof n=="number")this._bookNum=r,this._chapterNum=t,this._verseNum=n,this.versification=o??ae.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(r){return r.length>0&&"0123456789".includes(r[0])&&!r.endsWith(this.verseRangeSeparator)&&!r.endsWith(this.verseSequenceIndicator)}static tryParse(r){let t;try{return t=new ae(r),{success:!0,verseRef:t}}catch(n){if(n instanceof st)return t=new ae,{success:!1,verseRef:t};throw n}}static getBBBCCCVVV(r,t,n){return r%ae.bcvMaxValue*ae.bookDigitShifter+(t>=0?t%ae.bcvMaxValue*ae.chapterDigitShifter:0)+(n>=0?n%ae.bcvMaxValue:0)}static fromJSON(r){const{book:t,chapterNum:n,verseNum:o,verse:a,versificationStr:i}=r,l=a||o.toString();let p;return i&&(p=new hr(i)),t?new ae(t,n.toString(),l,p):new ae}static tryGetVerseNum(r){let t;if(!r)return t=-1,{success:!0,vNum:t};t=0;let n;for(let o=0;o<r.length;o++){if(n=r[o],n<"0"||n>"9")return o===0&&(t=-1),{success:!1,vNum:t};if(t=t*10+ +n-0,t>ae.bcvMaxValue)return t=-1,{success:!1,vNum:t}}return{success:!0,vNum:t}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ae.verseRangeSeparator)||this._verse.includes(ae.verseSequenceIndicator))}get book(){return de.bookNumberToId(this.bookNum,"")}set book(r){this.bookNum=de.bookIdToNumber(r)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(r){const t=+r;this._chapterNum=Number.isInteger(t)?t:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(r){const{success:t,vNum:n}=ae.tryGetVerseNum(r);this._verse=t?void 0:r.replace(this.rtlMark,""),this._verseNum=n,!(this._verseNum>=0)&&({vNum:this._verseNum}=ae.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(r){if(r<=0||r>de.lastBook)throw new st("BookNum must be greater than zero and less than or equal to last book");this._bookNum=r}get chapterNum(){return this._chapterNum}set chapterNum(r){this.chapterNum=r}get verseNum(){return this._verseNum}set verseNum(r){this._verseNum=r}get versificationStr(){var r;return(r=this.versification)==null?void 0:r.name}set versificationStr(r){this.versification=this.versification!=null?new hr(r):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ae.verseRangeSeparators,ae.verseSequenceIndicators)}get BBBCCC(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(r){if(r=r.replace(this.rtlMark,""),r.includes("/")){const a=r.split("/");if(r=a[0],a.length>1)try{const i=+a[1].trim();this.versification=new hr(Ue[i])}catch{throw new st("Invalid reference : "+r)}}const t=r.trim().split(" ");if(t.length!==2)throw new st("Invalid reference : "+r);const n=t[1].split(":"),o=+n[0];if(n.length!==2||de.bookIdToNumber(t[0])===0||!Number.isInteger(o)||o<0||!ae.isVerseParseable(n[1]))throw new st("Invalid reference : "+r);this.updateInternal(t[0],n[0],n[1])}simplify(){this._verse=void 0}clone(){return new ae(this)}toString(){const r=this.book;return r===""?"":`${r} ${this.chapter}:${this.verse}`}toJSON(){let r=this.verse;(r===""||r===this.verseNum.toString())&&(r=void 0);const t={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:r,versificationStr:this.versificationStr};return r||delete t.verse,t}equals(r){return r instanceof ae?r._bookNum===this._bookNum&&r._chapterNum===this._chapterNum&&r._verseNum===this._verseNum&&r.verse===this.verse&&(r.versification==null&&this.versification==null||r.versification!=null&&this.versification!=null&&r.versification.equals(this.versification)):!1}allVerses(r=!1,t=ae.verseRangeSeparators,n=ae.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=ca(this._verse,n);for(const i of a.map(l=>ca(l,t))){const l=this.clone();l.verse=i[0];const p=l.verseNum;if(o.push(l),i.length>1){const u=this.clone();if(u.verse=i[1],!r)for(let f=p+1;f<u.verseNum;f++){const b=new ae(this._bookNum,this._chapterNum,f,this.versification);this.isExcluded||o.push(b)}o.push(u)}}return o}validateVerse(r,t){if(!this.verse)return this.internalValid;let n=0;for(const o of this.allVerses(!0,r,t)){const a=o.internalValid;if(a!==0)return a;const i=o.BBBCCCVVV;if(n>i)return 3;if(n===i)return 4;n=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>de.lastBook?2:(de.isCanonical(this._bookNum),0)}setEmpty(r=ae.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=r}updateInternal(r,t,n){this.bookNum=de.bookIdToNumber(r),this.chapter=t,this.verse=n}};ne(Te,"defaultVersification",hr.English),ne(Te,"verseRangeSeparator","-"),ne(Te,"verseSequenceIndicator",","),ne(Te,"verseRangeSeparators",[Te.verseRangeSeparator]),ne(Te,"verseSequenceIndicators",[Te.verseSequenceIndicator]),ne(Te,"chapterDigitShifter",1e3),ne(Te,"bookDigitShifter",Te.chapterDigitShifter*Te.chapterDigitShifter),ne(Te,"bcvMaxValue",Te.chapterDigitShifter-1),ne(Te,"ValidStatusType",ks);let st=class extends Error{};const pn=fe.Root,uo=fe.Trigger,Ns=fe.Group,pp=fe.Portal,cp=fe.Sub,dp=fe.RadioGroup,Es=y.forwardRef(({className:e,inset:r,children:t,...n},o)=>s.jsxs(fe.SubTrigger,{ref:o,className:O("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",r&&"pr-pl-8",e),...n,children:[t,s.jsx(te.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Es.displayName=fe.SubTrigger.displayName;const Ss=y.forwardRef(({className:e,...r},t)=>s.jsx(fe.SubContent,{ref:t,className:O("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r}));Ss.displayName=fe.SubContent.displayName;const jt=y.forwardRef(({className:e,sideOffset:r=4,...t},n)=>s.jsx(fe.Portal,{children:s.jsx(fe.Content,{ref:n,sideOffset:r,className:O("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t})}));jt.displayName=fe.Content.displayName;const fo=y.forwardRef(({className:e,inset:r,...t},n)=>s.jsx(fe.Item,{ref:n,className:O("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",r&&"pr-pl-8",e),...t}));fo.displayName=fe.Item.displayName;const cn=y.forwardRef(({className:e,children:r,checked:t,...n},o)=>s.jsxs(fe.CheckboxItem,{ref:o,className:O("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:t,...n,children:[s.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:s.jsx(fe.ItemIndicator,{children:s.jsx(te.Check,{className:"pr-h-4 pr-w-4"})})}),r]}));cn.displayName=fe.CheckboxItem.displayName;const mo=y.forwardRef(({className:e,children:r,...t},n)=>s.jsxs(fe.RadioItem,{ref:n,className:O("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...t,children:[s.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:s.jsx(fe.ItemIndicator,{children:s.jsx(te.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),r]}));mo.displayName=fe.RadioItem.displayName;const Qr=y.forwardRef(({className:e,inset:r,...t},n)=>s.jsx(fe.Label,{ref:n,className:O("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",r&&"pr-pl-8",e),...t}));Qr.displayName=fe.Label.displayName;const Ot=y.forwardRef(({className:e,...r},t)=>s.jsx(fe.Separator,{ref:t,className:O("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...r}));Ot.displayName=fe.Separator.displayName;function Ts({className:e,...r}){return s.jsx("span",{className:O("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...r})}Ts.displayName="DropdownMenuShortcut";const up=y.forwardRef(({bookId:e,handleSelectBook:r,isSelected:t,handleHighlightBook:n,handleKeyDown:o,bookType:a,children:i},l)=>s.jsxs(fo,{ref:l,textValue:e,className:O("pr-mx-1 pr-px-1 pr-font-normal pr-text-foreground/80",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":t}),onSelect:p=>{p.preventDefault(),r()},onKeyDown:p=>{o(p)},onFocus:n,onMouseMove:n,children:[s.jsx("span",{className:O("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":t,"pr-border-l-red-200":a.toLowerCase()==="ot","pr-border-l-purple-200":a.toLowerCase()==="nt","pr-border-l-indigo-200":a.toLowerCase()==="dc"}),children:de.bookIdToEnglishName(e)}),t&&s.jsx("div",{children:i})]},e));function fp({handleSelectChapter:e,endChapter:r,activeChapter:t,highlightedChapter:n,handleHighlightedChapter:o}){const a=Array.from({length:r},(l,p)=>p+1),i=y.useCallback(l=>{o(l)},[o]);return s.jsx("div",{className:O("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:a.map(l=>s.jsx("div",{className:O("pr-box-content pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===t,"pr-bg-amber-200":l===n}),onClick:p=>{p.preventDefault(),p.stopPropagation(),e(l)},role:"button",onKeyDown:p=>{p.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>i(l),children:l},l))})}function mp({handleSort:e,handleLocationHistory:r,handleBookmarks:t}){return s.jsxs(Qr,{className:"pr-flex pr-justify-between",children:[s.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),s.jsxs("div",{className:"pr-flex pr-items-center",children:[s.jsx(te.ArrowDownWideNarrow,{onClick:e,className:"pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"}),s.jsx(te.Clock,{onClick:r,className:"pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"}),s.jsx(te.Bookmark,{onClick:t,className:"pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"})]})]})}const vt=de.allBookIds,hp={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},da=["OT","NT","DC"],gp=32+32+32,vp=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],bp=e=>({OT:vt.filter(t=>de.isBookOT(t)),NT:vt.filter(t=>de.isBookNT(t)),DC:vt.filter(t=>de.isBookDC(t))})[e],it=e=>Q.getChaptersForBook(de.bookIdToNumber(e));function wp(){return vt.map(r=>de.bookIdToEnglishName(r))}function yp(e){return wp().includes(e)}function xp(e){const r=e.toLowerCase().replace(/^\w/,t=>t.toUpperCase());if(yp(r))return vt.find(n=>de.bookIdToEnglishName(n)===r)}function kp({scrRef:e,handleSubmit:r}){const[t,n]=y.useState(""),[o,a]=y.useState(de.bookNumberToId(e.bookNum)),[i,l]=y.useState(e.chapterNum??0),[p,u]=y.useState(de.bookNumberToId(e.bookNum)),[f,b]=y.useState(!1),[v,c]=y.useState(f),h=y.useRef(void 0),d=y.useRef(void 0),g=y.useRef(void 0),x=y.useCallback(E=>bp(E).filter(D=>{const B=de.bookIdToEnglishName(D).toLowerCase(),J=t.replace(/[^a-zA-Z]/g,"").toLowerCase();return B.includes(J)||D.toLowerCase().includes(J)}),[t]),C=E=>{n(E)},N=y.useRef(!1),k=y.useCallback(E=>{if(N.current){N.current=!1;return}b(E)},[]),w=y.useCallback((E,D,B,J)=>{if(l(de.bookNumberToId(e.bookNum)!==E?1:e.chapterNum),D||it(E)===-1){r({bookNum:de.bookIdToNumber(E),chapterNum:B||1,verseNum:J||1}),b(!1),n("");return}a(o!==E?E:""),b(!D)},[r,e.bookNum,e.chapterNum,o]),j=E=>{E<=0||E>it(o)||w(o,!0,E)},_=y.useCallback(()=>{vp.forEach(E=>{const D=t.match(E);if(D){const[B,J=void 0,Y=void 0]=D.slice(1),H=xp(B);(de.isBookIdValid(B)||H)&&w(H??B,!0,J?parseInt(J,10):1,Y?parseInt(Y,10):1)}})},[w,t]),A=y.useCallback(E=>{f?(E.key==="ArrowDown"||E.key==="ArrowUp")&&(typeof g<"u"&&g.current!==null?g.current.focus():typeof d<"u"&&d.current!==null&&d.current.focus(),E.preventDefault()):b(!0)},[f]),T=E=>{const{key:D}=E;D==="ArrowRight"||D==="ArrowLeft"||D==="ArrowDown"||D==="ArrowUp"||D==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:D})),h.current.focus())},R=E=>{const{key:D}=E;if(p===o){if(D==="Enter"){E.preventDefault(),w(o,!0,i);return}let B=0;if(D==="ArrowRight")if(i<it(p))B=1;else{E.preventDefault();return}else if(D==="ArrowLeft")if(i>1)B=-1;else{E.preventDefault();return}else D==="ArrowDown"?B=6:D==="ArrowUp"&&(B=-6);i+B<=0||i+B>it(p)?l(0):B!==0&&(l(i+B),E.preventDefault())}};return y.useEffect(()=>{o===p?o===de.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[p,e.bookNum,e.chapterNum,o]),y.useLayoutEffect(()=>{c(f)},[f]),y.useLayoutEffect(()=>{const E=setTimeout(()=>{if(v&&d.current&&g.current){const B=g.current.offsetTop-gp;d.current.scrollTo({top:B,behavior:"instant"})}},10);return()=>{clearTimeout(E)}},[v]),s.jsx("div",{className:"pr-twp pr-flex",children:s.jsxs(pn,{modal:!1,open:f,onOpenChange:k,children:[s.jsx(uo,{asChild:!0,children:s.jsx(Kl,{ref:h,value:t,handleSearch:C,handleKeyDown:A,handleOnClick:()=>{a(de.bookNumberToId(e.bookNum)),u(de.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),b(!0),h.current.focus()},onFocus:()=>{N.current=!0},handleSubmit:_,placeholder:`${de.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),s.jsxs(jt,{className:"pr-m-1 pr-overflow-y-auto pr-p-0 pr-font-normal pr-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},onKeyDown:T,align:"start",ref:d,children:[s.jsx(mp,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),da.map((E,D)=>x(E).length>0&&s.jsxs("div",{children:[s.jsx(Qr,{className:"pr-font-semibold pr-text-foreground/80",children:hp[E]}),x(E).map(B=>s.jsx("div",{children:s.jsx(up,{bookId:B,handleSelectBook:()=>w(B,!1),isSelected:o===B,handleHighlightBook:()=>u(B),handleKeyDown:R,bookType:E,ref:J=>{o===B&&(g.current=J)},children:s.jsx(fp,{handleSelectChapter:j,endChapter:it(B),activeChapter:e.bookNum===de.bookIdToNumber(B)?e.chapterNum:0,highlightedChapter:i,handleHighlightedChapter:J=>{l(J)}})})},B)),da.length-1!==D?s.jsx(Ot,{}):void 0]},E))]})]})})}const Cs=sn.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),be=y.forwardRef(({className:e,variant:r,size:t,asChild:n=!1,...o},a)=>{const i=n?Ml.Slot:"button";return s.jsx(i,{className:O(Cs({variant:r,size:t,className:e})),ref:a,...o})});be.displayName="Button";const Np=sn.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),Xe=y.forwardRef(({className:e,...r},t)=>s.jsx(ms.Root,{ref:t,className:O("pr-twp",Np(),e),...r}));Xe.displayName=ms.Root.displayName;const ho=y.forwardRef(({className:e,...r},t)=>s.jsx(kt.Root,{className:O("pr-twp pr-grid pr-gap-2",e),...r,ref:t}));ho.displayName=kt.Root.displayName;const Zt=y.forwardRef(({className:e,...r},t)=>s.jsx(kt.Item,{ref:t,className:O("pr-twp pr-aspect-square pr-h-4 pr-w-4 pr-rounded-full pr-border pr-border-primary pr-text-primary pr-ring-offset-background focus:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...r,children:s.jsx(kt.Indicator,{className:"pr-flex pr-items-center pr-justify-center",children:s.jsx(te.Circle,{className:"pr-h-2.5 pr-w-2.5 pr-fill-current pr-text-current"})})}));Zt.displayName=kt.Item.displayName;const Ep=Nt.Root,Sp=Nt.Trigger,js=y.forwardRef(({className:e,align:r="center",sideOffset:t=4,...n},o)=>s.jsx(Nt.Portal,{children:s.jsx(Nt.Content,{ref:o,align:r,sideOffset:t,className:O("pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));js.displayName=Nt.Content.displayName;const Tp=We.Portal,Os=y.forwardRef(({className:e,...r},t)=>s.jsx(We.Overlay,{ref:t,className:O("pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",e),...r}));Os.displayName=We.Overlay.displayName;const Cp=y.forwardRef(({className:e,children:r,...t},n)=>s.jsxs(Tp,{children:[s.jsx(Os,{}),s.jsxs(We.Content,{ref:n,className:O("pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",e),...t,children:[r,s.jsxs(We.Close,{className:"pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground",children:[s.jsx(te.X,{className:"pr-h-4 pr-w-4"}),s.jsx("span",{className:"pr-sr-only",children:"Close"})]})]})]}));Cp.displayName=We.Content.displayName;const jp=y.forwardRef(({className:e,...r},t)=>s.jsx(We.Title,{ref:t,className:O("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight",e),...r}));jp.displayName=We.Title.displayName;const Op=y.forwardRef(({className:e,...r},t)=>s.jsx(We.Description,{ref:t,className:O("pr-text-sm pr-text-muted-foreground",e),...r}));Op.displayName=We.Description.displayName;const Rs=y.forwardRef(({className:e,...r},t)=>s.jsx(Oe.Command,{ref:t,className:O("pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",e),...r}));Rs.displayName=Oe.Command.displayName;const _s=y.forwardRef(({className:e,...r},t)=>s.jsxs("div",{className:"pr-flex pr-items-center pr-border-b pr-px-3",children:[s.jsx(te.Search,{className:"pr-me-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"}),s.jsx(Oe.Command.Input,{ref:t,className:O("pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...r})]}));_s.displayName=Oe.Command.Input.displayName;const Ps=y.forwardRef(({className:e,...r},t)=>s.jsx(Oe.Command.List,{ref:t,className:O("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden",e),...r}));Ps.displayName=Oe.Command.List.displayName;const $s=y.forwardRef((e,r)=>s.jsx(Oe.Command.Empty,{ref:r,className:"pr-py-6 pr-text-center pr-text-sm",...e}));$s.displayName=Oe.Command.Empty.displayName;const Rp=y.forwardRef(({className:e,...r},t)=>s.jsx(Oe.Command.Group,{ref:t,className:O("pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",e),...r}));Rp.displayName=Oe.Command.Group.displayName;const _p=y.forwardRef(({className:e,...r},t)=>s.jsx(Oe.Command.Separator,{ref:t,className:O("pr--mx-1 pr-h-px pr-bg-border",e),...r}));_p.displayName=Oe.Command.Separator.displayName;const Is=y.forwardRef(({className:e,...r},t)=>s.jsx(Oe.Command.Item,{ref:t,className:O("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",e),...r}));Is.displayName=Oe.Command.Item.displayName;function Pp(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function Kn({id:e,options:r=[],className:t,value:n,onChange:o=()=>{},getOptionLabel:a=Pp,buttonPlaceholder:i="",textPlaceholder:l="",commandEmptyMessage:p="No option found",buttonVariant:u="outline",dir:f="ltr",isDisabled:b=!1,...v}){const[c,h]=y.useState(!1);return s.jsxs(Ep,{open:c,onOpenChange:h,...v,children:[s.jsx(Sp,{asChild:!0,children:s.jsxs(be,{variant:u,role:"combobox","aria-expanded":c,id:e,className:O("pr-w-[200px] pr-justify-between",t),disabled:b,children:[s.jsx("span",{className:"pr-overflow-hidden pr-text-ellipsis pr-whitespace-nowrap",children:n?a(n):i}),s.jsx(te.ChevronsUpDown,{className:"pr-ms-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"})]})}),s.jsx(js,{className:"pr-w-[200px] pr-p-0",dir:f,children:s.jsxs(Rs,{children:[s.jsx(_s,{dir:f,placeholder:l,className:"pr-text-inherit"}),s.jsx($s,{children:p}),s.jsx(Ps,{children:r.map(d=>s.jsxs(Is,{value:a(d),onSelect:()=>{o(d),h(!1)},children:[s.jsx(te.Check,{className:O("pr-me-2 pr-h-4 pr-w-4",{"pr-opacity-0":!n||a(n)!==a(d)})}),a(d)]},a(d)))})]})})]})}function Ms({startChapter:e,endChapter:r,handleSelectStartChapter:t,handleSelectEndChapter:n,isDisabled:o=!1,chapterCount:a}){const i=y.useMemo(()=>Array.from({length:a},(u,f)=>f+1),[a]),l=u=>{t(u),u>r&&n(u)},p=u=>{n(u),u<e&&t(u)};return s.jsxs(s.Fragment,{children:[s.jsx(Xe,{htmlFor:"start-chapters-combobox",children:"Chapters"}),s.jsx(Kn,{isDisabled:o,onChange:l,className:"pr-ml-2 pr-mr-2 pr-w-20",options:i,getOptionLabel:u=>u.toString(),value:e},"start chapter"),s.jsx(Xe,{htmlFor:"end-chapters-combobox",children:"to"}),s.jsx(Kn,{isDisabled:o,onChange:p,className:"pr-ml-2 pr-w-20",options:i,getOptionLabel:u=>u.toString(),value:r},"end chapter")]})}var As=(e=>(e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books",e))(As||{});const $p=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Rn=(e,r)=>e[r]??r;function Ip({handleBookSelectionModeChange:e,currentBookName:r,onSelectBooks:t,selectedBookIds:n,chapterCount:o,endChapter:a,handleSelectEndChapter:i,startChapter:l,handleSelectStartChapter:p,localizedStrings:u}){const f=Rn(u,"%webView_bookSelector_currentBook%"),b=Rn(u,"%webView_bookSelector_choose%"),v=Rn(u,"%webView_bookSelector_chooseBooks%"),[c,h]=y.useState("current book"),d=g=>{h(g),e(g)};return s.jsx(ho,{className:"pr-twp pr-flex",value:c,onValueChange:g=>d(g),children:s.jsxs("div",{className:"pr-flex pr-w-full pr-flex-col pr-gap-4",children:[s.jsxs("div",{className:"pr-grid pr-grid-cols-[25%,25%,50%]",children:[s.jsxs("div",{className:"pr-flex pr-items-center",children:[s.jsx(Zt,{value:"current book"}),s.jsx(Xe,{className:"pr-ml-1",children:f})]}),s.jsx(Xe,{className:"pr-flex pr-items-center",children:r}),s.jsx("div",{className:"pr-flex pr-items-center pr-justify-end",children:s.jsx(Ms,{isDisabled:c==="choose books",handleSelectStartChapter:p,handleSelectEndChapter:i,chapterCount:o,startChapter:l,endChapter:a})})]}),s.jsxs("div",{className:"pr-grid pr-grid-cols-[25%,50%,25%]",children:[s.jsxs("div",{className:"pr-flex pr-items-center",children:[s.jsx(Zt,{value:"choose books"}),s.jsx(Xe,{className:"pr-ml-1",children:v})]}),s.jsx(Xe,{className:"pr-flex pr-items-center",children:n.map(g=>de.bookIdToEnglishName(g)).join(", ")}),s.jsx(be,{disabled:c==="current book",onClick:()=>t(),children:b})]})]})})}function Mp({table:e}){return s.jsxs(pn,{children:[s.jsx(us.DropdownMenuTrigger,{asChild:!0,children:s.jsxs(be,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[s.jsx(te.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),s.jsxs(jt,{align:"end",className:"pr-w-[150px]",children:[s.jsx(Qr,{children:"Toggle columns"}),s.jsx(Ot,{}),e.getAllColumns().filter(r=>r.getCanHide()).map(r=>s.jsx(cn,{className:"pr-capitalize",checked:r.getIsVisible(),onCheckedChange:t=>r.toggleVisibility(!!t),children:r.id},r.id))]})]})}const zr=ve.Root,Ds=ve.Group,Gr=ve.Value,Nr=y.forwardRef(({className:e,children:r,...t},n)=>s.jsxs(ve.Trigger,{ref:n,className:O("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...t,children:[r,s.jsx(ve.Icon,{asChild:!0,children:s.jsx(te.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));Nr.displayName=ve.Trigger.displayName;const go=y.forwardRef(({className:e,...r},t)=>s.jsx(ve.ScrollUpButton,{ref:t,className:O("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...r,children:s.jsx(te.ChevronUp,{className:"pr-h-4 pr-w-4"})}));go.displayName=ve.ScrollUpButton.displayName;const vo=y.forwardRef(({className:e,...r},t)=>s.jsx(ve.ScrollDownButton,{ref:t,className:O("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...r,children:s.jsx(te.ChevronDown,{className:"pr-h-4 pr-w-4"})}));vo.displayName=ve.ScrollDownButton.displayName;const Er=y.forwardRef(({className:e,children:r,position:t="popper",...n},o)=>s.jsx(ve.Portal,{children:s.jsxs(ve.Content,{ref:o,className:O("pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",t==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:t,...n,children:[s.jsx(go,{}),s.jsx(ve.Viewport,{className:O("pr-p-1",t==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:r}),s.jsx(vo,{})]})}));Er.displayName=ve.Content.displayName;const Bs=y.forwardRef(({className:e,...r},t)=>s.jsx(ve.Label,{ref:t,className:O("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...r}));Bs.displayName=ve.Label.displayName;const De=y.forwardRef(({className:e,children:r,...t},n)=>s.jsxs(ve.Item,{ref:n,className:O("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...t,children:[s.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:s.jsx(ve.ItemIndicator,{children:s.jsx(te.Check,{className:"pr-h-4 pr-w-4"})})}),s.jsx(ve.ItemText,{children:r})]}));De.displayName=ve.Item.displayName;const Ls=y.forwardRef(({className:e,...r},t)=>s.jsx(ve.Separator,{ref:t,className:O("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...r}));Ls.displayName=ve.Separator.displayName;function Ap({table:e}){return s.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:s.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[s.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),s.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[s.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),s.jsxs(zr,{value:`${e.getState().pagination.pageSize}`,onValueChange:r=>{e.setPageSize(Number(r))},children:[s.jsx(Nr,{className:"pr-h-8 pr-w-[70px]",children:s.jsx(Gr,{placeholder:e.getState().pagination.pageSize})}),s.jsx(Er,{side:"top",children:[10,20,30,40,50].map(r=>s.jsx(De,{value:`${r}`,children:r},r))})]})]}),s.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),s.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[s.jsxs(be,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[s.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),s.jsx(te.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),s.jsxs(be,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[s.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),s.jsx(te.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),s.jsxs(be,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[s.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),s.jsx(te.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),s.jsxs(be,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[s.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),s.jsx(te.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}const Rt=y.forwardRef(({className:e,stickyHeader:r,...t},n)=>s.jsx("div",{className:O("pr-twp pr-relative pr-w-full",{"pr-overflow-auto":!r}),children:s.jsx("table",{ref:n,className:O("pr-w-full pr-caption-bottom pr-text-sm",e),...t})}));Rt.displayName="Table";const _t=y.forwardRef(({className:e,stickyHeader:r,...t},n)=>s.jsx("thead",{ref:n,className:O({"pr-sticky pr-top-0 pr-bg-muted":r},"[&_tr]:pr-border-b",e),...t}));_t.displayName="TableHeader";const Pt=y.forwardRef(({className:e,...r},t)=>s.jsx("tbody",{ref:t,className:O("[&_tr:last-child]:pr-border-0",e),...r}));Pt.displayName="TableBody";const Vs=y.forwardRef(({className:e,...r},t)=>s.jsx("tfoot",{ref:t,className:O("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...r}));Vs.displayName="TableFooter";const Qe=y.forwardRef(({className:e,...r},t)=>s.jsx("tr",{ref:t,className:O("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...r}));Qe.displayName="TableRow";const Hr=y.forwardRef(({className:e,...r},t)=>s.jsx("th",{ref:t,className:O("pr-h-12 pr-px-4 pr-text-start pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pe-0",e),...r}));Hr.displayName="TableHead";const Sr=y.forwardRef(({className:e,...r},t)=>s.jsx("td",{ref:t,className:O("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pe-0",e),...r}));Sr.displayName="TableCell";const Fs=y.forwardRef(({className:e,...r},t)=>s.jsx("caption",{ref:t,className:O("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...r}));Fs.displayName="TableCaption";function zs({columns:e,data:r,enablePagination:t=!1,showPaginationControls:n=!1,showColumnVisibilityControls:o=!1,stickyHeader:a=!1,onRowClickHandler:i=()=>{}}){var g;const[l,p]=y.useState([]),[u,f]=y.useState([]),[b,v]=y.useState({}),[c,h]=y.useState({}),d=Ne.useReactTable({data:r,columns:e,getCoreRowModel:Ne.getCoreRowModel(),...t&&{getPaginationRowModel:Ne.getPaginationRowModel()},onSortingChange:p,getSortedRowModel:Ne.getSortedRowModel(),onColumnFiltersChange:f,getFilteredRowModel:Ne.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:h,state:{sorting:l,columnFilters:u,columnVisibility:b,rowSelection:c}});return s.jsxs("div",{className:"pr-twp",children:[o&&s.jsx(Mp,{table:d}),s.jsxs(Rt,{stickyHeader:a,children:[s.jsx(_t,{stickyHeader:a,children:d.getHeaderGroups().map(x=>s.jsx(Qe,{children:x.headers.map(C=>s.jsx(Hr,{children:C.isPlaceholder?void 0:Ne.flexRender(C.column.columnDef.header,C.getContext())},C.id))},x.id))}),s.jsx(Pt,{children:(g=d.getRowModel().rows)!=null&&g.length?d.getRowModel().rows.map(x=>s.jsx(Qe,{onClick:()=>i(x,d),"data-state":x.getIsSelected()&&"selected",children:x.getVisibleCells().map(C=>s.jsx(Sr,{children:Ne.flexRender(C.column.columnDef.cell,C.getContext())},C.id))},x.id)):s.jsx(Qe,{children:s.jsx(Sr,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]}),t&&s.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[s.jsx(be,{variant:"outline",size:"sm",onClick:()=>d.previousPage(),disabled:!d.getCanPreviousPage(),children:"Previous"}),s.jsx(be,{variant:"outline",size:"sm",onClick:()=>d.nextPage(),disabled:!d.getCanNextPage(),children:"Next"})]}),t&&n&&s.jsx(Ap,{table:d})]})}const Dp=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),ua=e=>{const r=/^\\[vc]\s+(\d+)/,t=e.match(r);if(t)return+t[1]},fa=(e,r,t,n)=>{if(!e||e===""||r==="")return[];const o=[],a=Dp(e);let i=n.chapterNum,l=n.verseNum,p=0;return a.forEach(u=>{u.startsWith("\\id")&&(i=0,l=0),u.startsWith("\\c")&&(i=ua(u),l=0),u.startsWith("\\v")&&(l=ua(u),i===0&&(i=n.chapterNum));const f=t(u,r);for(let b=0;b<f.length;b++){const v={reference:{...n,chapterNum:i!==void 0?+i:-1,verseNum:l!==void 0?+l:-1},snippet:u,key:p};p+=1,o.push(v)}}),o};function Bp({selectedItem:e,text:r,extractItems:t,scriptureReference:n,setScriptureReference:o,localizedStrings:a}){const i=a["%webView_inventory_occurrences_table_header_reference%"],l=a["%webView_inventory_occurrences_table_header_occurrence%"],[p,u]=y.useState(fa(r,e,t,n));return y.useEffect(()=>u(fa(r,e,t,n)),[r,e,n,t]),s.jsxs(Rt,{stickyHeader:!0,children:[s.jsx(_t,{stickyHeader:!0,children:s.jsxs(Qe,{children:[s.jsx(Hr,{children:i}),s.jsx(Hr,{children:l})]})}),s.jsx(Pt,{children:p.map(f=>s.jsxs(Qe,{onClick:()=>{o(f.reference)},children:[s.jsx(Sr,{children:`${de.bookNumberToEnglishName(f.reference.bookNum)} ${f.reference.chapterNum}:${f.reference.verseNum}`}),s.jsx(Sr,{children:f.snippet})]},f.key))})]})}const Lp=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),dn=e=>e==="asc"?s.jsx(te.ArrowUpIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}):e==="desc"?s.jsx(te.ArrowDownIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}):s.jsx(te.ArrowUpDownIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}),Vp=(e,r,t)=>{let n=e;return r!=="all"&&(n=n.filter(o=>r==="approved"&&o.status==="approved"||r==="unapproved"&&o.status==="unapproved"||r==="unknown"&&o.status==="unknown")),t!==""&&(n=n.filter(o=>o.item.includes(t))),n},Fp=(e,r,t)=>{const n=[],o=r(e);for(let a=0;a<o.length;a++){const i=o[a],l=n.find(p=>p.item===i);if(l)l.count+=1;else{const p={item:i,count:1,status:t(i)};n.push(p)}}return n},or=(e,r)=>e[r]??r;function zp({scriptureReference:e,setScriptureReference:r,localizedStrings:t,extractItems:n,approvedItems:o,onApprovedItemsChange:a,unapprovedItems:i,onUnapprovedItemsChange:l,text:p,scope:u,onScopeChange:f,getColumns:b}){const v=or(t,"%webView_inventory_all%"),c=or(t,"%webView_inventory_approved%"),h=or(t,"%webView_inventory_unapproved%"),d=or(t,"%webView_inventory_unknown%"),g=or(t,"%webView_inventory_scope_currentBook%"),x=or(t,"%webView_inventory_scope_chapter%"),C=or(t,"%webView_inventory_scope_verse%"),N=or(t,"%webView_inventory_filter_text%"),[k,w]=y.useState([]),[j,_]=y.useState("all"),[A,T]=y.useState(""),[R,E]=y.useState(""),D=y.useCallback((V,S)=>{w(z=>{let F=[];return V.forEach(q=>{F=z.map(G=>G.item===q&&G.status!==S?{...G,status:S}:G)}),F});let $=[...o];V.forEach(z=>{S==="approved"?$.includes(z)||$.push(z):$=$.filter(F=>F!==z)}),a($);let U=[...i];V.forEach(z=>{S==="unapproved"?U.includes(z)||U.push(z):U=U.filter(F=>F!==z)}),l(U)},[o,a,i,l]),B=y.useCallback(V=>o.includes(V)?"approved":i.includes(V)?"unapproved":"unknown",[o,i]);y.useEffect(()=>{p&&w(Fp(p,n,B))},[n,p,B]);const J=y.useMemo(()=>Vp(k,j,A),[k,j,A]);y.useEffect(()=>{E("")},[J]);const Y=(V,S)=>{S.toggleAllRowsSelected(!1),V.toggleSelected(void 0),E(V.getValue("item"))},H=y.useMemo(()=>b(D),[b,D]),re=V=>{if(V==="book"||V==="chapter"||V==="verse")f(V);else throw new Error(`Invalid scope value: ${V}`)},se=V=>{if(V==="all"||V==="approved"||V==="unapproved"||V==="unknown")_(V);else throw new Error(`Invalid status filter value: ${V}`)};return s.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-flex-col",children:[s.jsxs("div",{className:"pr-flex",children:[s.jsxs(zr,{onValueChange:V=>se(V),defaultValue:j,children:[s.jsx(Nr,{className:"pr-m-1",children:s.jsx(Gr,{placeholder:"Select filter"})}),s.jsxs(Er,{children:[s.jsx(De,{value:"all",children:v}),s.jsx(De,{value:"approved",children:c}),s.jsx(De,{value:"unapproved",children:h}),s.jsx(De,{value:"unknown",children:d})]})]}),s.jsxs(zr,{onValueChange:V=>re(V),defaultValue:u,children:[s.jsx(Nr,{className:"pr-m-1",children:s.jsx(Gr,{placeholder:"Select scope"})}),s.jsxs(Er,{children:[s.jsx(De,{value:"book",children:g}),s.jsx(De,{value:"chapter",children:x}),s.jsx(De,{value:"verse",children:C})]})]}),s.jsx(Jr,{className:"pr-m-1 pr-rounded-md pr-border",placeholder:N,value:A,onChange:V=>{T(V.target.value)}})]}),s.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:s.jsx(zs,{columns:H,data:J,onRowClickHandler:Y,stickyHeader:!0})}),R!==""&&s.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:s.jsx(Bp,{selectedItem:R,text:p,extractItems:n,scriptureReference:e,setScriptureReference:V=>r(V),localizedStrings:t})})]})}const Gs=sn.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors hover:pr-bg-muted hover:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=on]:pr-bg-accent data-[state=on]:pr-text-accent-foreground",{variants:{variant:{default:"pr-bg-transparent",outline:"pr-border pr-border-input pr-bg-transparent hover:pr-bg-accent hover:pr-text-accent-foreground"},size:{default:"pr-h-10 pr-px-3",sm:"pr-h-9 pr-px-2.5",lg:"pr-h-11 pr-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Gp=y.forwardRef(({className:e,variant:r,size:t,...n},o)=>s.jsx(hs.Root,{ref:o,className:O(Gs({variant:r,size:t,className:e})),...n}));Gp.displayName=hs.Root.displayName;const Hs=y.createContext({size:"default",variant:"default"}),bo=y.forwardRef(({className:e,variant:r,size:t,children:n,...o},a)=>s.jsx(ln.Root,{ref:a,className:O("pr-twp pr-flex pr-items-center pr-justify-center pr-gap-1",e),...o,children:s.jsx(Hs.Provider,{value:{variant:r,size:t},children:n})}));bo.displayName=ln.Root.displayName;const bt=y.forwardRef(({className:e,children:r,variant:t,size:n,...o},a)=>{const i=y.useContext(Hs);return s.jsx(ln.Item,{ref:a,className:O(Gs({variant:i.variant||t,size:i.size||n}),e),...o,children:r})});bt.displayName=ln.Item.displayName;const Hp=e=>({accessorKey:"item",header:({column:r})=>s.jsxs(be,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[e,dn(r.getIsSorted())]})}),Up=e=>({accessorKey:"count",header:({column:r})=>s.jsx("div",{className:"pr-flex pr-justify-end pr-tabular-nums",children:s.jsxs(be,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[e,dn(r.getIsSorted())]})}),cell:({row:r})=>s.jsx("div",{className:"pr-flex pr-justify-end",children:r.getValue("count")})}),Xp=(e,r)=>({accessorKey:"status",header:({column:t})=>s.jsx("div",{className:"pr-flex pr-justify-center",children:s.jsxs(be,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,dn(t.getIsSorted())]})}),cell:({row:t})=>{const n=t.getValue("status"),o=t.getValue("item");return s.jsxs(bo,{value:n,variant:"outline",type:"single",children:[s.jsx(bt,{onClick:()=>r([o],"approved"),value:"approved",children:s.jsx(te.CircleCheckIcon,{})}),s.jsx(bt,{onClick:()=>r([o],"unapproved"),value:"unapproved",children:s.jsx(te.CircleXIcon,{})}),s.jsx(bt,{onClick:()=>r([o],"unknown"),value:"unknown",children:s.jsx(te.CircleHelpIcon,{})})]})}});function Us({onSearch:e,placeholder:r,isFullWidth:t}){const[n,o]=y.useState(""),a=i=>{o(i),e(i)};return s.jsx(Jr,{className:O("pr-flex pr-h-10 pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-[color:hsl(240,5%,64.9%)] focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",{"pr-w-full":t}),placeholder:r,value:n,onChange:i=>a(i.target.value)})}const wo=y.forwardRef(({className:e,...r},t)=>s.jsx(Re.Root,{orientation:"vertical",ref:t,className:O("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...r}));wo.displayName=Re.List.displayName;const yo=y.forwardRef(({className:e,...r},t)=>s.jsx(Re.List,{ref:t,className:O("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...r}));yo.displayName=Re.List.displayName;const Xs=y.forwardRef(({className:e,...r},t)=>s.jsx(Re.Trigger,{ref:t,...r,className:O("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),xo=y.forwardRef(({className:e,...r},t)=>s.jsx(Re.Content,{ref:t,className:O("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...r}));xo.displayName=Re.Content.displayName;function qp({tabList:e,onSearch:r,searchPlaceholder:t,headerTitle:n,isSearchBarFullWidth:o=!1,direction:a="ltr"}){return s.jsxs("div",{className:"pr-twp",children:[s.jsxs("div",{className:"pr-sticky pr-top-0 pr-space-y-2 pr-pb-2",children:[n?s.jsx("h1",{children:n}):"",s.jsx(Us,{isFullWidth:o,onSearch:r,placeholder:t})]}),s.jsxs(wo,{dir:a,children:[s.jsx(yo,{children:e.map(i=>s.jsx(Xs,{value:i.value,children:i.value},i.key))}),e.map(i=>s.jsx(xo,{value:i.value,children:i.content},i.key))]})]})}const ir="scrBook",Wp="scrRef",gr="source",Yp="details",Kp="Scripture Reference",Jp="Scripture Book",qs="Type",Zp="Details";function Qp(e,r){const t=r??!1;return[{accessorFn:n=>`${de.bookNumberToId(n.start.bookNum)} ${n.start.chapterNum}:${n.start.verseNum}`,id:ir,header:(e==null?void 0:e.scriptureReferenceColumnName)??Kp,cell:n=>{const o=n.row.original;return n.row.getIsGrouped()?de.bookNumberToEnglishName(o.start.bookNum):n.row.groupingColumnId===ir?Q.formatScrRef(o.start):void 0},getGroupingValue:n=>n.start.bookNum,sortingFn:(n,o)=>Q.compareScrRefs(n.original.start,o.original.start),enableGrouping:!0},{accessorFn:n=>Q.formatScrRef(n.start),id:Wp,header:void 0,cell:n=>{const o=n.row.original;return n.row.getIsGrouped()?void 0:Q.formatScrRef(o.start)},sortingFn:(n,o)=>Q.compareScrRefs(n.original.start,o.original.start),enableGrouping:!1},{accessorFn:n=>n.source.displayName,id:gr,header:t?(e==null?void 0:e.typeColumnName)??qs:void 0,cell:n=>t||n.row.getIsGrouped()?n.getValue():void 0,getGroupingValue:n=>n.source.id,sortingFn:(n,o)=>n.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:n=>n.detail,id:Yp,header:(e==null?void 0:e.detailsColumnName)??Zp,cell:n=>n.getValue(),enableGrouping:!1}]}const ec=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:r}=e.start;let t=0;return e.end&&({offset:t}=e.end),!e.end||Q.compareScrRefs(e.start,e.end)===0?`${Q.scrRefToBBBCCCVVV(e.start)}+${r}`:`${Q.scrRefToBBBCCCVVV(e.start)}+${r}-${Q.scrRefToBBBCCCVVV(e.end)}+${t}`},ma=e=>`${ec({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function rc({sources:e,showColumnHeaders:r=!1,showSourceColumn:t=!1,scriptureReferenceColumnName:n,scriptureBookGroupName:o,typeColumnName:a,detailsColumnName:i,onRowSelected:l,direction:p="ltr"}){const[u,f]=y.useState([]),[b,v]=y.useState([{id:ir,desc:!1}]),[c,h]=y.useState({}),d=y.useMemo(()=>e.flatMap(T=>T.data.map(R=>({...R,source:T.source}))),[e]),g=y.useMemo(()=>Qp({scriptureReferenceColumnName:n,typeColumnName:a,detailsColumnName:i},t),[n,a,i,t]);y.useEffect(()=>{u.includes(gr)?v([{id:gr,desc:!1},{id:ir,desc:!1}]):v([{id:ir,desc:!1}])},[u]);const x=Ne.useReactTable({data:d,columns:g,state:{grouping:u,sorting:b,rowSelection:c},onGroupingChange:f,onSortingChange:v,onRowSelectionChange:h,getExpandedRowModel:Ne.getExpandedRowModel(),getGroupedRowModel:Ne.getGroupedRowModel(),getCoreRowModel:Ne.getCoreRowModel(),getSortedRowModel:Ne.getSortedRowModel(),getRowId:ma,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});y.useEffect(()=>{if(l){const T=x.getSelectedRowModel().rowsById,R=Object.keys(T);if(R.length===1){const E=d.find(D=>ma(D)===R[0])||void 0;E&&l(E)}}},[c,d,l,x]);const C=o??Jp,N=a??qs,k=[{label:"No Grouping",value:[]},{label:`Group by ${C}`,value:[ir]},{label:`Group by ${N}`,value:[gr]},{label:`Group by ${C} and ${N}`,value:[ir,gr]},{label:`Group by ${N} and ${C}`,value:[gr,ir]}],w=T=>{f(JSON.parse(T))},j=(T,R)=>{!T.getIsGrouped()&&!T.getIsSelected()&&T.getToggleSelectedHandler()(R)},_=(T,R)=>T.getIsGrouped()?"":O("banded-row",R%2===0?"even":"odd"),A=(T,R,E)=>{if(!((T==null?void 0:T.length)===0||R.depth<E.column.getGroupedIndex())){if(R.getIsGrouped())switch(R.depth){case 1:return"pr-ps-4";default:return}switch(R.depth){case 1:return"pr-ps-8";case 2:return"pr-ps-12";default:return}}};return s.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-w-full pr-flex-col",children:[!r&&s.jsxs(zr,{value:JSON.stringify(u),onValueChange:T=>{w(T)},children:[s.jsx(Nr,{className:"pr-mb-1 pr-mt-2",children:s.jsx(Gr,{})}),s.jsx(Er,{position:"item-aligned",children:s.jsx(Ds,{children:k.map(T=>s.jsx(De,{value:JSON.stringify(T.value),children:T.label},T.label))})})]}),s.jsxs(Rt,{className:"pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0",children:[r&&s.jsx(_t,{children:x.getHeaderGroups().map(T=>s.jsx(Qe,{children:T.headers.filter(R=>R.column.columnDef.header).map(R=>s.jsx(Hr,{colSpan:R.colSpan,className:"top-0 pr-sticky",children:R.isPlaceholder?void 0:s.jsxs("div",{children:[R.column.getCanGroup()?s.jsx(be,{variant:"ghost",title:`Toggle grouping by ${R.column.columnDef.header}`,onClick:R.column.getToggleGroupingHandler(),type:"button",children:R.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Ne.flexRender(R.column.columnDef.header,R.getContext())]})},R.id))},T.id))}),s.jsx(Pt,{children:x.getRowModel().rows.map((T,R)=>s.jsx(Qe,{"data-state":T.getIsSelected()?"selected":"",className:O(_(T,R)),onClick:E=>j(T,E),children:T.getVisibleCells().map(E=>{if(!(E.getIsPlaceholder()||E.column.columnDef.enableGrouping&&!E.getIsGrouped()&&(E.column.columnDef.id!==gr||!t)))return s.jsx(Sr,{className:O(E.column.columnDef.id,"pr-p-[1px]",A(u,T,E)),children:(()=>E.getIsGrouped()?s.jsxs(be,{variant:"link",onClick:T.getToggleExpandedHandler(),type:"button",children:[T.getIsExpanded()&&s.jsx(te.ChevronDown,{}),!T.getIsExpanded()&&(p==="ltr"?s.jsx(te.ChevronRight,{}):s.jsx(te.ChevronLeft,{}))," ",Ne.flexRender(E.column.columnDef.cell,E.getContext())," (",T.subRows.length,")"]}):Ne.flexRender(E.column.columnDef.cell,E.getContext()))()},E.id)})},T.id))})]})]})}const _n={[Q.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[Q.getLocalizeKeyForScrollGroupId(0)]:"A",[Q.getLocalizeKeyForScrollGroupId(1)]:"B",[Q.getLocalizeKeyForScrollGroupId(2)]:"C",[Q.getLocalizeKeyForScrollGroupId(3)]:"D",[Q.getLocalizeKeyForScrollGroupId(4)]:"E",[Q.getLocalizeKeyForScrollGroupId(5)]:"F",[Q.getLocalizeKeyForScrollGroupId(6)]:"G",[Q.getLocalizeKeyForScrollGroupId(7)]:"H",[Q.getLocalizeKeyForScrollGroupId(8)]:"I",[Q.getLocalizeKeyForScrollGroupId(9)]:"J",[Q.getLocalizeKeyForScrollGroupId(10)]:"K",[Q.getLocalizeKeyForScrollGroupId(11)]:"L",[Q.getLocalizeKeyForScrollGroupId(12)]:"M",[Q.getLocalizeKeyForScrollGroupId(13)]:"N",[Q.getLocalizeKeyForScrollGroupId(14)]:"O",[Q.getLocalizeKeyForScrollGroupId(15)]:"P",[Q.getLocalizeKeyForScrollGroupId(16)]:"Q",[Q.getLocalizeKeyForScrollGroupId(17)]:"R",[Q.getLocalizeKeyForScrollGroupId(18)]:"S",[Q.getLocalizeKeyForScrollGroupId(19)]:"T",[Q.getLocalizeKeyForScrollGroupId(20)]:"U",[Q.getLocalizeKeyForScrollGroupId(21)]:"V",[Q.getLocalizeKeyForScrollGroupId(22)]:"W",[Q.getLocalizeKeyForScrollGroupId(23)]:"X",[Q.getLocalizeKeyForScrollGroupId(24)]:"Y",[Q.getLocalizeKeyForScrollGroupId(25)]:"Z"};function tc({availableScrollGroupIds:e,scrollGroupId:r,onChangeScrollGroupId:t,localizedStrings:n={}}){const o={..._n,...Object.fromEntries(Object.entries(n).map(([a,i])=>[a,a===i&&a in _n?_n[a]:i]))};return s.jsxs(zr,{value:`${r}`,onValueChange:a=>t(a==="undefined"?void 0:parseInt(a,10)),children:[s.jsx(Nr,{className:"pr-twp pr-w-auto",children:s.jsx(Gr,{placeholder:o[Q.getLocalizeKeyForScrollGroupId(r)]??r})}),s.jsx(Er,{style:{zIndex:250},children:e.map(a=>s.jsx(De,{value:`${a}`,children:o[Q.getLocalizeKeyForScrollGroupId(a)]},`${a}`))})]})}const ko=y.forwardRef(({className:e,orientation:r="horizontal",decorative:t=!0,...n},o)=>s.jsx(gs.Root,{ref:o,decorative:t,orientation:r,className:O("pr-twp pr-shrink-0 pr-bg-border",r==="horizontal"?"pr-h-[1px] pr-w-full":"pr-h-full pr-w-[1px]",e),...n}));ko.displayName=gs.Root.displayName;function nc({children:e}){return s.jsx("div",{className:"pr-twp pr-grid",children:e})}function oc({primary:e,secondary:r,children:t,isLoading:n=!1,loadingMessage:o}){return s.jsxs("div",{className:"pr-flex pr-items-center pr-justify-between pr-space-x-4 pr-py-2",children:[s.jsxs("div",{children:[s.jsx("p",{className:"pr-text-sm pr-font-medium pr-leading-none",children:e}),s.jsx("p",{className:"pr-whitespace-normal pr-break-words pr-text-sm pr-text-muted-foreground",children:r})]}),n?s.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:o}):s.jsx("div",{children:t})]})}function ac({primary:e,secondary:r,includeSeparator:t=!1}){return s.jsxs("div",{className:"pr-space-y-4 pr-py-2",children:[s.jsxs("div",{children:[s.jsx("h3",{className:"pr-text-lg pr-font-medium",children:e}),s.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:r})]}),t?s.jsx(ko,{}):""]})}const No=y.forwardRef(({className:e,...r},t)=>s.jsx(Wn.Root,{ref:t,className:O("pr-peer pr-twp pr-h-4 pr-w-4 pr-shrink-0 pr-rounded-sm pr-border pr-border-primary pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=checked]:pr-text-primary-foreground",e),...r,children:s.jsx(Wn.Indicator,{className:O("pr-flex pr-items-center pr-justify-center pr-text-current"),children:s.jsx(te.Check,{className:"pr-h-4 pr-w-4"})})}));No.displayName=Wn.Root.displayName;function sc({id:e,className:r,listItems:t,selectedListItems:n,handleSelectListItem:o,createLabel:a}){return s.jsx("div",{id:e,className:r,children:t.map(i=>s.jsxs("div",{className:"pr-m-2 pr-flex pr-items-center",children:[s.jsx(No,{className:"pr-mr-2 pr-align-middle",checked:n.includes(i),onCheckedChange:l=>o(i,l)}),s.jsx(Xe,{children:a?a(i):i})]},i))})}function ic(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function lc(e){if(e.__esModule)return e;var r=e.default;if(typeof r=="function"){var t=function n(){return this instanceof n?Reflect.construct(r,arguments,this.constructor):r.apply(this,arguments)};t.prototype=r.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(e).forEach(function(n){var o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,o.get?o:{enumerable:!0,get:function(){return e[n]}})}),t}var Eo={},Ws={exports:{}};(function(e){function r(t){return t&&t.__esModule?t:{default:t}}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports})(Ws);var pc=Ws.exports,Pn={};function So(e,r){return process.env.NODE_ENV==="production"?()=>null:function(...n){return e(...n)||r(...n)}}function P(){return P=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},P.apply(this,arguments)}function wr(e){if(typeof e!="object"||e===null)return!1;const r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype||Object.getPrototypeOf(r)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Ys(e){if(!wr(e))return e;const r={};return Object.keys(e).forEach(t=>{r[t]=Ys(e[t])}),r}function er(e,r,t={clone:!0}){const n=t.clone?P({},e):e;return wr(e)&&wr(r)&&Object.keys(r).forEach(o=>{o!=="__proto__"&&(wr(r[o])&&o in e&&wr(e[o])?n[o]=er(e[o],r[o],t):t.clone?n[o]=wr(r[o])?Ys(r[o]):r[o]:n[o]=r[o])}),n}var Jn={exports:{}},Gt={exports:{}},ie={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ha;function cc(){if(ha)return ie;ha=1;var e=typeof Symbol=="function"&&Symbol.for,r=e?Symbol.for("react.element"):60103,t=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,f=e?Symbol.for("react.forward_ref"):60112,b=e?Symbol.for("react.suspense"):60113,v=e?Symbol.for("react.suspense_list"):60120,c=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,d=e?Symbol.for("react.block"):60121,g=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,C=e?Symbol.for("react.scope"):60119;function N(w){if(typeof w=="object"&&w!==null){var j=w.$$typeof;switch(j){case r:switch(w=w.type,w){case p:case u:case n:case a:case o:case b:return w;default:switch(w=w&&w.$$typeof,w){case l:case f:case h:case c:case i:return w;default:return j}}case t:return j}}}function k(w){return N(w)===u}return ie.AsyncMode=p,ie.ConcurrentMode=u,ie.ContextConsumer=l,ie.ContextProvider=i,ie.Element=r,ie.ForwardRef=f,ie.Fragment=n,ie.Lazy=h,ie.Memo=c,ie.Portal=t,ie.Profiler=a,ie.StrictMode=o,ie.Suspense=b,ie.isAsyncMode=function(w){return k(w)||N(w)===p},ie.isConcurrentMode=k,ie.isContextConsumer=function(w){return N(w)===l},ie.isContextProvider=function(w){return N(w)===i},ie.isElement=function(w){return typeof w=="object"&&w!==null&&w.$$typeof===r},ie.isForwardRef=function(w){return N(w)===f},ie.isFragment=function(w){return N(w)===n},ie.isLazy=function(w){return N(w)===h},ie.isMemo=function(w){return N(w)===c},ie.isPortal=function(w){return N(w)===t},ie.isProfiler=function(w){return N(w)===a},ie.isStrictMode=function(w){return N(w)===o},ie.isSuspense=function(w){return N(w)===b},ie.isValidElementType=function(w){return typeof w=="string"||typeof w=="function"||w===n||w===u||w===a||w===o||w===b||w===v||typeof w=="object"&&w!==null&&(w.$$typeof===h||w.$$typeof===c||w.$$typeof===i||w.$$typeof===l||w.$$typeof===f||w.$$typeof===g||w.$$typeof===x||w.$$typeof===C||w.$$typeof===d)},ie.typeOf=N,ie}var le={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ga;function dc(){return ga||(ga=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,r=e?Symbol.for("react.element"):60103,t=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,f=e?Symbol.for("react.forward_ref"):60112,b=e?Symbol.for("react.suspense"):60113,v=e?Symbol.for("react.suspense_list"):60120,c=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,d=e?Symbol.for("react.block"):60121,g=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,C=e?Symbol.for("react.scope"):60119;function N(I){return typeof I=="string"||typeof I=="function"||I===n||I===u||I===a||I===o||I===b||I===v||typeof I=="object"&&I!==null&&(I.$$typeof===h||I.$$typeof===c||I.$$typeof===i||I.$$typeof===l||I.$$typeof===f||I.$$typeof===g||I.$$typeof===x||I.$$typeof===C||I.$$typeof===d)}function k(I){if(typeof I=="object"&&I!==null){var xe=I.$$typeof;switch(xe){case r:var L=I.type;switch(L){case p:case u:case n:case a:case o:case b:return L;default:var ye=L&&L.$$typeof;switch(ye){case l:case f:case h:case c:case i:return ye;default:return xe}}case t:return xe}}}var w=p,j=u,_=l,A=i,T=r,R=f,E=n,D=h,B=c,J=t,Y=a,H=o,re=b,se=!1;function V(I){return se||(se=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),S(I)||k(I)===p}function S(I){return k(I)===u}function $(I){return k(I)===l}function U(I){return k(I)===i}function z(I){return typeof I=="object"&&I!==null&&I.$$typeof===r}function F(I){return k(I)===f}function q(I){return k(I)===n}function G(I){return k(I)===h}function W(I){return k(I)===c}function X(I){return k(I)===t}function K(I){return k(I)===a}function Z(I){return k(I)===o}function ue(I){return k(I)===b}le.AsyncMode=w,le.ConcurrentMode=j,le.ContextConsumer=_,le.ContextProvider=A,le.Element=T,le.ForwardRef=R,le.Fragment=E,le.Lazy=D,le.Memo=B,le.Portal=J,le.Profiler=Y,le.StrictMode=H,le.Suspense=re,le.isAsyncMode=V,le.isConcurrentMode=S,le.isContextConsumer=$,le.isContextProvider=U,le.isElement=z,le.isForwardRef=F,le.isFragment=q,le.isLazy=G,le.isMemo=W,le.isPortal=X,le.isProfiler=K,le.isStrictMode=Z,le.isSuspense=ue,le.isValidElementType=N,le.typeOf=k}()),le}var va;function Ks(){return va||(va=1,process.env.NODE_ENV==="production"?Gt.exports=cc():Gt.exports=dc()),Gt.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var $n,ba;function uc(){if(ba)return $n;ba=1;var e=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable;function n(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var i={},l=0;l<10;l++)i["_"+String.fromCharCode(l)]=l;var p=Object.getOwnPropertyNames(i).map(function(f){return i[f]});if(p.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(f){u[f]=f}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return $n=o()?Object.assign:function(a,i){for(var l,p=n(a),u,f=1;f<arguments.length;f++){l=Object(arguments[f]);for(var b in l)r.call(l,b)&&(p[b]=l[b]);if(e){u=e(l);for(var v=0;v<u.length;v++)t.call(l,u[v])&&(p[u[v]]=l[u[v]])}}return p},$n}var In,wa;function To(){if(wa)return In;wa=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return In=e,In}var Mn,ya;function Js(){return ya||(ya=1,Mn=Function.call.bind(Object.prototype.hasOwnProperty)),Mn}var An,xa;function fc(){if(xa)return An;xa=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var r=To(),t={},n=Js();e=function(a){var i="Warning: "+a;typeof console<"u"&&console.error(i);try{throw new Error(i)}catch{}}}function o(a,i,l,p,u){if(process.env.NODE_ENV!=="production"){for(var f in a)if(n(a,f)){var b;try{if(typeof a[f]!="function"){var v=Error((p||"React class")+": "+l+" type `"+f+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[f]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw v.name="Invariant Violation",v}b=a[f](i,f,p,l,null,r)}catch(h){b=h}if(b&&!(b instanceof Error)&&e((p||"React class")+": type specification of "+l+" `"+f+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof b+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),b instanceof Error&&!(b.message in t)){t[b.message]=!0;var c=u?u():"";e("Failed "+l+" type: "+b.message+(c??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(t={})},An=o,An}var Dn,ka;function mc(){if(ka)return Dn;ka=1;var e=Ks(),r=uc(),t=To(),n=Js(),o=fc(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(l){var p="Warning: "+l;typeof console<"u"&&console.error(p);try{throw new Error(p)}catch{}});function i(){return null}return Dn=function(l,p){var u=typeof Symbol=="function"&&Symbol.iterator,f="@@iterator";function b(S){var $=S&&(u&&S[u]||S[f]);if(typeof $=="function")return $}var v="<<anonymous>>",c={array:x("array"),bigint:x("bigint"),bool:x("boolean"),func:x("function"),number:x("number"),object:x("object"),string:x("string"),symbol:x("symbol"),any:C(),arrayOf:N,element:k(),elementType:w(),instanceOf:j,node:R(),objectOf:A,oneOf:_,oneOfType:T,shape:D,exact:B};function h(S,$){return S===$?S!==0||1/S===1/$:S!==S&&$!==$}function d(S,$){this.message=S,this.data=$&&typeof $=="object"?$:{},this.stack=""}d.prototype=Error.prototype;function g(S){if(process.env.NODE_ENV!=="production")var $={},U=0;function z(q,G,W,X,K,Z,ue){if(X=X||v,Z=Z||W,ue!==t){if(p){var I=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw I.name="Invariant Violation",I}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var xe=X+":"+W;!$[xe]&&U<3&&(a("You are manually calling a React.PropTypes validation function for the `"+Z+"` prop on `"+X+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),$[xe]=!0,U++)}}return G[W]==null?q?G[W]===null?new d("The "+K+" `"+Z+"` is marked as required "+("in `"+X+"`, but its value is `null`.")):new d("The "+K+" `"+Z+"` is marked as required in "+("`"+X+"`, but its value is `undefined`.")):null:S(G,W,X,K,Z)}var F=z.bind(null,!1);return F.isRequired=z.bind(null,!0),F}function x(S){function $(U,z,F,q,G,W){var X=U[z],K=H(X);if(K!==S){var Z=re(X);return new d("Invalid "+q+" `"+G+"` of type "+("`"+Z+"` supplied to `"+F+"`, expected ")+("`"+S+"`."),{expectedType:S})}return null}return g($)}function C(){return g(i)}function N(S){function $(U,z,F,q,G){if(typeof S!="function")return new d("Property `"+G+"` of component `"+F+"` has invalid PropType notation inside arrayOf.");var W=U[z];if(!Array.isArray(W)){var X=H(W);return new d("Invalid "+q+" `"+G+"` of type "+("`"+X+"` supplied to `"+F+"`, expected an array."))}for(var K=0;K<W.length;K++){var Z=S(W,K,F,q,G+"["+K+"]",t);if(Z instanceof Error)return Z}return null}return g($)}function k(){function S($,U,z,F,q){var G=$[U];if(!l(G)){var W=H(G);return new d("Invalid "+F+" `"+q+"` of type "+("`"+W+"` supplied to `"+z+"`, expected a single ReactElement."))}return null}return g(S)}function w(){function S($,U,z,F,q){var G=$[U];if(!e.isValidElementType(G)){var W=H(G);return new d("Invalid "+F+" `"+q+"` of type "+("`"+W+"` supplied to `"+z+"`, expected a single ReactElement type."))}return null}return g(S)}function j(S){function $(U,z,F,q,G){if(!(U[z]instanceof S)){var W=S.name||v,X=V(U[z]);return new d("Invalid "+q+" `"+G+"` of type "+("`"+X+"` supplied to `"+F+"`, expected ")+("instance of `"+W+"`."))}return null}return g($)}function _(S){if(!Array.isArray(S))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),i;function $(U,z,F,q,G){for(var W=U[z],X=0;X<S.length;X++)if(h(W,S[X]))return null;var K=JSON.stringify(S,function(ue,I){var xe=re(I);return xe==="symbol"?String(I):I});return new d("Invalid "+q+" `"+G+"` of value `"+String(W)+"` "+("supplied to `"+F+"`, expected one of "+K+"."))}return g($)}function A(S){function $(U,z,F,q,G){if(typeof S!="function")return new d("Property `"+G+"` of component `"+F+"` has invalid PropType notation inside objectOf.");var W=U[z],X=H(W);if(X!=="object")return new d("Invalid "+q+" `"+G+"` of type "+("`"+X+"` supplied to `"+F+"`, expected an object."));for(var K in W)if(n(W,K)){var Z=S(W,K,F,q,G+"."+K,t);if(Z instanceof Error)return Z}return null}return g($)}function T(S){if(!Array.isArray(S))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),i;for(var $=0;$<S.length;$++){var U=S[$];if(typeof U!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+se(U)+" at index "+$+"."),i}function z(F,q,G,W,X){for(var K=[],Z=0;Z<S.length;Z++){var ue=S[Z],I=ue(F,q,G,W,X,t);if(I==null)return null;I.data&&n(I.data,"expectedType")&&K.push(I.data.expectedType)}var xe=K.length>0?", expected one of type ["+K.join(", ")+"]":"";return new d("Invalid "+W+" `"+X+"` supplied to "+("`"+G+"`"+xe+"."))}return g(z)}function R(){function S($,U,z,F,q){return J($[U])?null:new d("Invalid "+F+" `"+q+"` supplied to "+("`"+z+"`, expected a ReactNode."))}return g(S)}function E(S,$,U,z,F){return new d((S||"React class")+": "+$+" type `"+U+"."+z+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+F+"`.")}function D(S){function $(U,z,F,q,G){var W=U[z],X=H(W);if(X!=="object")return new d("Invalid "+q+" `"+G+"` of type `"+X+"` "+("supplied to `"+F+"`, expected `object`."));for(var K in S){var Z=S[K];if(typeof Z!="function")return E(F,q,G,K,re(Z));var ue=Z(W,K,F,q,G+"."+K,t);if(ue)return ue}return null}return g($)}function B(S){function $(U,z,F,q,G){var W=U[z],X=H(W);if(X!=="object")return new d("Invalid "+q+" `"+G+"` of type `"+X+"` "+("supplied to `"+F+"`, expected `object`."));var K=r({},U[z],S);for(var Z in K){var ue=S[Z];if(n(S,Z)&&typeof ue!="function")return E(F,q,G,Z,re(ue));if(!ue)return new d("Invalid "+q+" `"+G+"` key `"+Z+"` supplied to `"+F+"`.\nBad object: "+JSON.stringify(U[z],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(S),null,"  "));var I=ue(W,Z,F,q,G+"."+Z,t);if(I)return I}return null}return g($)}function J(S){switch(typeof S){case"number":case"string":case"undefined":return!0;case"boolean":return!S;case"object":if(Array.isArray(S))return S.every(J);if(S===null||l(S))return!0;var $=b(S);if($){var U=$.call(S),z;if($!==S.entries){for(;!(z=U.next()).done;)if(!J(z.value))return!1}else for(;!(z=U.next()).done;){var F=z.value;if(F&&!J(F[1]))return!1}}else return!1;return!0;default:return!1}}function Y(S,$){return S==="symbol"?!0:$?$["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&$ instanceof Symbol:!1}function H(S){var $=typeof S;return Array.isArray(S)?"array":S instanceof RegExp?"object":Y($,S)?"symbol":$}function re(S){if(typeof S>"u"||S===null)return""+S;var $=H(S);if($==="object"){if(S instanceof Date)return"date";if(S instanceof RegExp)return"regexp"}return $}function se(S){var $=re(S);switch($){case"array":case"object":return"an "+$;case"boolean":case"date":case"regexp":return"a "+$;default:return $}}function V(S){return!S.constructor||!S.constructor.name?v:S.constructor.name}return c.checkPropTypes=o,c.resetWarningCache=o.resetWarningCache,c.PropTypes=c,c},Dn}var Bn,Na;function hc(){if(Na)return Bn;Na=1;var e=To();function r(){}function t(){}return t.resetWarningCache=r,Bn=function(){function n(i,l,p,u,f,b){if(b!==e){var v=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw v.name="Invariant Violation",v}}n.isRequired=n;function o(){return n}var a={array:n,bigint:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:o,element:n,elementType:n,instanceOf:o,node:n,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:t,resetWarningCache:r};return a.PropTypes=a,a},Bn}if(process.env.NODE_ENV!=="production"){var gc=Ks(),vc=!0;Jn.exports=mc()(gc.isElement,vc)}else Jn.exports=hc()();var bc=Jn.exports;const m=ic(bc);function wc(e){const{prototype:r={}}=e;return!!r.isReactComponent}function Zs(e,r,t,n,o){const a=e[r],i=o||r;if(a==null||typeof window>"u")return null;let l;const p=a.type;return typeof p=="function"&&!wc(p)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${n} \`${i}\` supplied to \`${t}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Qs=So(m.element,Zs);Qs.isRequired=So(m.element.isRequired,Zs);const ei=Qs,yc="exact-prop: ​";function xc(e){return process.env.NODE_ENV==="production"?e:P({},e,{[yc]:r=>{const t=Object.keys(r).filter(n=>!e.hasOwnProperty(n));return t.length>0?new Error(`The following props are not supported: ${t.map(n=>`\`${n}\``).join(", ")}. Please remove them.`):null}})}function Ur(e){let r="https://mui.com/production-error/?code="+e;for(let t=1;t<arguments.length;t+=1)r+="&args[]="+encodeURIComponent(arguments[t]);return"Minified MUI error #"+e+"; visit "+r+" for the full message."}var Zn={exports:{}},pe={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ea;function kc(){if(Ea)return pe;Ea=1;var e=Symbol.for("react.element"),r=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),f=Symbol.for("react.suspense_list"),b=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),c=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function d(g){if(typeof g=="object"&&g!==null){var x=g.$$typeof;switch(x){case e:switch(g=g.type,g){case t:case o:case n:case u:case f:return g;default:switch(g=g&&g.$$typeof,g){case l:case i:case p:case v:case b:case a:return g;default:return x}}case r:return x}}}return pe.ContextConsumer=i,pe.ContextProvider=a,pe.Element=e,pe.ForwardRef=p,pe.Fragment=t,pe.Lazy=v,pe.Memo=b,pe.Portal=r,pe.Profiler=o,pe.StrictMode=n,pe.Suspense=u,pe.SuspenseList=f,pe.isAsyncMode=function(){return!1},pe.isConcurrentMode=function(){return!1},pe.isContextConsumer=function(g){return d(g)===i},pe.isContextProvider=function(g){return d(g)===a},pe.isElement=function(g){return typeof g=="object"&&g!==null&&g.$$typeof===e},pe.isForwardRef=function(g){return d(g)===p},pe.isFragment=function(g){return d(g)===t},pe.isLazy=function(g){return d(g)===v},pe.isMemo=function(g){return d(g)===b},pe.isPortal=function(g){return d(g)===r},pe.isProfiler=function(g){return d(g)===o},pe.isStrictMode=function(g){return d(g)===n},pe.isSuspense=function(g){return d(g)===u},pe.isSuspenseList=function(g){return d(g)===f},pe.isValidElementType=function(g){return typeof g=="string"||typeof g=="function"||g===t||g===o||g===n||g===u||g===f||g===c||typeof g=="object"&&g!==null&&(g.$$typeof===v||g.$$typeof===b||g.$$typeof===a||g.$$typeof===i||g.$$typeof===p||g.$$typeof===h||g.getModuleId!==void 0)},pe.typeOf=d,pe}var ce={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sa;function Nc(){return Sa||(Sa=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),r=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),f=Symbol.for("react.suspense_list"),b=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),c=Symbol.for("react.offscreen"),h=!1,d=!1,g=!1,x=!1,C=!1,N;N=Symbol.for("react.module.reference");function k(L){return!!(typeof L=="string"||typeof L=="function"||L===t||L===o||C||L===n||L===u||L===f||x||L===c||h||d||g||typeof L=="object"&&L!==null&&(L.$$typeof===v||L.$$typeof===b||L.$$typeof===a||L.$$typeof===i||L.$$typeof===p||L.$$typeof===N||L.getModuleId!==void 0))}function w(L){if(typeof L=="object"&&L!==null){var ye=L.$$typeof;switch(ye){case e:var Ge=L.type;switch(Ge){case t:case o:case n:case u:case f:return Ge;default:var ur=Ge&&Ge.$$typeof;switch(ur){case l:case i:case p:case v:case b:case a:return ur;default:return ye}}case r:return ye}}}var j=i,_=a,A=e,T=p,R=t,E=v,D=b,B=r,J=o,Y=n,H=u,re=f,se=!1,V=!1;function S(L){return se||(se=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function $(L){return V||(V=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function U(L){return w(L)===i}function z(L){return w(L)===a}function F(L){return typeof L=="object"&&L!==null&&L.$$typeof===e}function q(L){return w(L)===p}function G(L){return w(L)===t}function W(L){return w(L)===v}function X(L){return w(L)===b}function K(L){return w(L)===r}function Z(L){return w(L)===o}function ue(L){return w(L)===n}function I(L){return w(L)===u}function xe(L){return w(L)===f}ce.ContextConsumer=j,ce.ContextProvider=_,ce.Element=A,ce.ForwardRef=T,ce.Fragment=R,ce.Lazy=E,ce.Memo=D,ce.Portal=B,ce.Profiler=J,ce.StrictMode=Y,ce.Suspense=H,ce.SuspenseList=re,ce.isAsyncMode=S,ce.isConcurrentMode=$,ce.isContextConsumer=U,ce.isContextProvider=z,ce.isElement=F,ce.isForwardRef=q,ce.isFragment=G,ce.isLazy=W,ce.isMemo=X,ce.isPortal=K,ce.isProfiler=Z,ce.isStrictMode=ue,ce.isSuspense=I,ce.isSuspenseList=xe,ce.isValidElementType=k,ce.typeOf=w}()),ce}process.env.NODE_ENV==="production"?Zn.exports=kc():Zn.exports=Nc();var Ta=Zn.exports;const Ec=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Sc(e){const r=`${e}`.match(Ec);return r&&r[1]||""}function ri(e,r=""){return e.displayName||e.name||Sc(e)||r}function Ca(e,r,t){const n=ri(r);return e.displayName||(n!==""?`${t}(${n})`:t)}function Tc(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return ri(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Ta.ForwardRef:return Ca(e,e.render,"ForwardRef");case Ta.Memo:return Ca(e,e.type,"memo");default:return}}}function Et(e,r,t,n,o){if(process.env.NODE_ENV==="production")return null;const a=e[r],i=o||r;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${n} \`${i}\` supplied to \`${t}\`. Expected an HTMLElement.`):null}const Cc=m.oneOfType([m.func,m.object]),ti=Cc;function Ye(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Ur(7));return e.charAt(0).toUpperCase()+e.slice(1)}function jc(...e){return e.reduce((r,t)=>t==null?r:function(...o){r.apply(this,o),t.apply(this,o)},()=>{})}function Oc(e,r=166){let t;function n(...o){const a=()=>{e.apply(this,o)};clearTimeout(t),t=setTimeout(a,r)}return n.clear=()=>{clearTimeout(t)},n}function Rc(e,r){return process.env.NODE_ENV==="production"?()=>null:(t,n,o,a,i)=>{const l=o||"<<anonymous>>",p=i||n;return typeof t[n]<"u"?new Error(`The ${a} \`${p}\` of \`${l}\` is deprecated. ${r}`):null}}function _c(e,r){var t,n;return M.isValidElement(e)&&r.indexOf((t=e.type.muiName)!=null?t:(n=e.type)==null||(n=n._payload)==null||(n=n.value)==null?void 0:n.muiName)!==-1}function Qt(e){return e&&e.ownerDocument||document}function Pc(e){return Qt(e).defaultView||window}function $c(e,r){if(process.env.NODE_ENV==="production")return()=>null;const t=r?P({},r.propTypes):null;return o=>(a,i,l,p,u,...f)=>{const b=u||i,v=t==null?void 0:t[b];if(v){const c=v(a,i,l,p,u,...f);if(c)return c}return typeof a[i]<"u"&&!a[o]?new Error(`The prop \`${b}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function en(e,r){typeof e=="function"?e(r):e&&(e.current=r)}const Ic=typeof window<"u"?M.useLayoutEffect:M.useEffect,Xr=Ic;let ja=0;function Mc(e){const[r,t]=M.useState(e),n=e||r;return M.useEffect(()=>{r==null&&(ja+=1,t(`mui-${ja}`))},[r]),n}const Oa=M["useId".toString()];function ni(e){if(Oa!==void 0){const r=Oa();return e??r}return Mc(e)}function Ac(e,r,t,n,o){if(process.env.NODE_ENV==="production")return null;const a=o||r;return typeof e[r]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function oi({controlled:e,default:r,name:t,state:n="value"}){const{current:o}=M.useRef(e!==void 0),[a,i]=M.useState(r),l=o?e:a;if(process.env.NODE_ENV!=="production"){M.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${n} state of ${t} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${t} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[n,t,e]);const{current:u}=M.useRef(r);M.useEffect(()=>{!o&&u!==r&&console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${t} after being initialized. To suppress this warning opt to use a controlled ${t}.`].join(`
`))},[JSON.stringify(r)])}const p=M.useCallback(u=>{o||i(u)},[]);return[l,p]}function Qn(e){const r=M.useRef(e);return Xr(()=>{r.current=e}),M.useRef((...t)=>(0,r.current)(...t)).current}function Tr(...e){return M.useMemo(()=>e.every(r=>r==null)?null:r=>{e.forEach(t=>{en(t,r)})},e)}const Ra={};function Dc(e,r){const t=M.useRef(Ra);return t.current===Ra&&(t.current=e(r)),t}const Bc=[];function Lc(e){M.useEffect(e,Bc)}class $t{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new $t}start(r,t){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,t()},r)}}function mt(){const e=Dc($t.create).current;return Lc(e.disposeEffect),e}let un=!0,eo=!1;const Vc=new $t,Fc={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function zc(e){const{type:r,tagName:t}=e;return!!(t==="INPUT"&&Fc[r]&&!e.readOnly||t==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Gc(e){e.metaKey||e.altKey||e.ctrlKey||(un=!0)}function Ln(){un=!1}function Hc(){this.visibilityState==="hidden"&&eo&&(un=!0)}function Uc(e){e.addEventListener("keydown",Gc,!0),e.addEventListener("mousedown",Ln,!0),e.addEventListener("pointerdown",Ln,!0),e.addEventListener("touchstart",Ln,!0),e.addEventListener("visibilitychange",Hc,!0)}function Xc(e){const{target:r}=e;try{return r.matches(":focus-visible")}catch{}return un||zc(r)}function ai(){const e=M.useCallback(o=>{o!=null&&Uc(o.ownerDocument)},[]),r=M.useRef(!1);function t(){return r.current?(eo=!0,Vc.start(100,()=>{eo=!1}),r.current=!1,!0):!1}function n(o){return Xc(o)?(r.current=!0,!0):!1}return{isFocusVisibleRef:r,onFocus:n,onBlur:t,ref:e}}function si(e,r){const t=P({},r);return Object.keys(e).forEach(n=>{if(n.toString().match(/^(components|slots)$/))t[n]=P({},e[n],t[n]);else if(n.toString().match(/^(componentsProps|slotProps)$/)){const o=e[n]||{},a=r[n];t[n]={},!a||!Object.keys(a)?t[n]=o:!o||!Object.keys(o)?t[n]=a:(t[n]=P({},a),Object.keys(o).forEach(i=>{t[n][i]=si(o[i],a[i])}))}else t[n]===void 0&&(t[n]=e[n])}),t}function Co(e,r,t=void 0){const n={};return Object.keys(e).forEach(o=>{n[o]=e[o].reduce((a,i)=>{if(i){const l=r(i);l!==""&&a.push(l),t&&t[i]&&a.push(t[i])}return a},[]).join(" ")}),n}const _a=e=>e,qc=()=>{let e=_a;return{configure(r){e=r},generate(r){return e(r)},reset(){e=_a}}},Wc=qc(),ii=Wc,li={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function fn(e,r,t="Mui"){const n=li[r];return n?`${t}-${n}`:`${ii.generate(e)}-${r}`}function pi(e,r,t="Mui"){const n={};return r.forEach(o=>{n[o]=fn(e,o,t)}),n}function Yc(e,r=Number.MIN_SAFE_INTEGER,t=Number.MAX_SAFE_INTEGER){return Math.max(r,Math.min(e,t))}function ke(e,r){if(e==null)return{};var t={},n=Object.keys(e),o,a;for(a=0;a<n.length;a++)o=n[a],!(r.indexOf(o)>=0)&&(t[o]=e[o]);return t}const Kc=["values","unit","step"],Jc=e=>{const r=Object.keys(e).map(t=>({key:t,val:e[t]}))||[];return r.sort((t,n)=>t.val-n.val),r.reduce((t,n)=>P({},t,{[n.key]:n.val}),{})};function Zc(e){const{values:r={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:t="px",step:n=5}=e,o=ke(e,Kc),a=Jc(r),i=Object.keys(a);function l(v){return`@media (min-width:${typeof r[v]=="number"?r[v]:v}${t})`}function p(v){return`@media (max-width:${(typeof r[v]=="number"?r[v]:v)-n/100}${t})`}function u(v,c){const h=i.indexOf(c);return`@media (min-width:${typeof r[v]=="number"?r[v]:v}${t}) and (max-width:${(h!==-1&&typeof r[i[h]]=="number"?r[i[h]]:c)-n/100}${t})`}function f(v){return i.indexOf(v)+1<i.length?u(v,i[i.indexOf(v)+1]):l(v)}function b(v){const c=i.indexOf(v);return c===0?l(i[1]):c===i.length-1?p(i[c]):u(v,i[i.indexOf(v)+1]).replace("@media","@media not all and")}return P({keys:i,values:a,up:l,down:p,between:u,only:f,not:b,unit:t},o)}const Qc={borderRadius:4},ed=Qc,rd=process.env.NODE_ENV!=="production"?m.oneOfType([m.number,m.string,m.object,m.array]):{},cr=rd;function wt(e,r){return r?er(e,r,{clone:!1}):e}const jo={xs:0,sm:600,md:900,lg:1200,xl:1536},Pa={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${jo[e]}px)`};function rr(e,r,t){const n=e.theme||{};if(Array.isArray(r)){const a=n.breakpoints||Pa;return r.reduce((i,l,p)=>(i[a.up(a.keys[p])]=t(r[p]),i),{})}if(typeof r=="object"){const a=n.breakpoints||Pa;return Object.keys(r).reduce((i,l)=>{if(Object.keys(a.values||jo).indexOf(l)!==-1){const p=a.up(l);i[p]=t(r[l],l)}else{const p=l;i[p]=r[p]}return i},{})}return t(r)}function td(e={}){var r;return((r=e.keys)==null?void 0:r.reduce((n,o)=>{const a=e.up(o);return n[a]={},n},{}))||{}}function nd(e,r){return e.reduce((t,n)=>{const o=t[n];return(!o||Object.keys(o).length===0)&&delete t[n],t},r)}function mn(e,r,t=!0){if(!r||typeof r!="string")return null;if(e&&e.vars&&t){const n=`vars.${r}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(n!=null)return n}return r.split(".").reduce((n,o)=>n&&n[o]!=null?n[o]:null,e)}function rn(e,r,t,n=t){let o;return typeof e=="function"?o=e(t):Array.isArray(e)?o=e[t]||n:o=mn(e,t)||n,r&&(o=r(o,n,e)),o}function we(e){const{prop:r,cssProperty:t=e.prop,themeKey:n,transform:o}=e,a=i=>{if(i[r]==null)return null;const l=i[r],p=i.theme,u=mn(p,n)||{};return rr(i,l,b=>{let v=rn(u,o,b);return b===v&&typeof b=="string"&&(v=rn(u,o,`${r}${b==="default"?"":Ye(b)}`,b)),t===!1?v:{[t]:v}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[r]:cr}:{},a.filterProps=[r],a}function od(e){const r={};return t=>(r[t]===void 0&&(r[t]=e(t)),r[t])}const ad={m:"margin",p:"padding"},sd={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},$a={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},id=od(e=>{if(e.length>2)if($a[e])e=$a[e];else return[e];const[r,t]=e.split(""),n=ad[r],o=sd[t]||"";return Array.isArray(o)?o.map(a=>n+a):[n+o]}),hn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],gn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],ld=[...hn,...gn];function It(e,r,t,n){var o;const a=(o=mn(e,r,!1))!=null?o:t;return typeof a=="number"?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&typeof i!="number"&&console.error(`MUI: Expected ${n} argument to be a number or a string, got ${i}.`),a*i):Array.isArray(a)?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&(Number.isInteger(i)?i>a.length-1&&console.error([`MUI: The value provided (${i}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${i} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${r}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${r}\` as a number.`].join(`
`))),a[i]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${r}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function ci(e){return It(e,"spacing",8,"spacing")}function Mt(e,r){if(typeof r=="string"||r==null)return r;const t=Math.abs(r),n=e(t);return r>=0?n:typeof n=="number"?-n:`-${n}`}function pd(e,r){return t=>e.reduce((n,o)=>(n[o]=Mt(r,t),n),{})}function cd(e,r,t,n){if(r.indexOf(t)===-1)return null;const o=id(t),a=pd(o,n),i=e[t];return rr(e,i,a)}function di(e,r){const t=ci(e.theme);return Object.keys(e).map(n=>cd(e,r,n,t)).reduce(wt,{})}function he(e){return di(e,hn)}he.propTypes=process.env.NODE_ENV!=="production"?hn.reduce((e,r)=>(e[r]=cr,e),{}):{};he.filterProps=hn;function ge(e){return di(e,gn)}ge.propTypes=process.env.NODE_ENV!=="production"?gn.reduce((e,r)=>(e[r]=cr,e),{}):{};ge.filterProps=gn;process.env.NODE_ENV!=="production"&&ld.reduce((e,r)=>(e[r]=cr,e),{});function dd(e=8){if(e.mui)return e;const r=ci({spacing:e}),t=(...n)=>(process.env.NODE_ENV!=="production"&&(n.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)),(n.length===0?[1]:n).map(a=>{const i=r(a);return typeof i=="number"?`${i}px`:i}).join(" "));return t.mui=!0,t}function vn(...e){const r=e.reduce((n,o)=>(o.filterProps.forEach(a=>{n[a]=o}),n),{}),t=n=>Object.keys(n).reduce((o,a)=>r[a]?wt(o,r[a](n)):o,{});return t.propTypes=process.env.NODE_ENV!=="production"?e.reduce((n,o)=>Object.assign(n,o.propTypes),{}):{},t.filterProps=e.reduce((n,o)=>n.concat(o.filterProps),[]),t}function Be(e){return typeof e!="number"?e:`${e}px solid`}function ze(e,r){return we({prop:e,themeKey:"borders",transform:r})}const ud=ze("border",Be),fd=ze("borderTop",Be),md=ze("borderRight",Be),hd=ze("borderBottom",Be),gd=ze("borderLeft",Be),vd=ze("borderColor"),bd=ze("borderTopColor"),wd=ze("borderRightColor"),yd=ze("borderBottomColor"),xd=ze("borderLeftColor"),kd=ze("outline",Be),Nd=ze("outlineColor"),bn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const r=It(e.theme,"shape.borderRadius",4,"borderRadius"),t=n=>({borderRadius:Mt(r,n)});return rr(e,e.borderRadius,t)}return null};bn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:cr}:{};bn.filterProps=["borderRadius"];vn(ud,fd,md,hd,gd,vd,bd,wd,yd,xd,bn,kd,Nd);const wn=e=>{if(e.gap!==void 0&&e.gap!==null){const r=It(e.theme,"spacing",8,"gap"),t=n=>({gap:Mt(r,n)});return rr(e,e.gap,t)}return null};wn.propTypes=process.env.NODE_ENV!=="production"?{gap:cr}:{};wn.filterProps=["gap"];const yn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const r=It(e.theme,"spacing",8,"columnGap"),t=n=>({columnGap:Mt(r,n)});return rr(e,e.columnGap,t)}return null};yn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:cr}:{};yn.filterProps=["columnGap"];const xn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const r=It(e.theme,"spacing",8,"rowGap"),t=n=>({rowGap:Mt(r,n)});return rr(e,e.rowGap,t)}return null};xn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:cr}:{};xn.filterProps=["rowGap"];const Ed=we({prop:"gridColumn"}),Sd=we({prop:"gridRow"}),Td=we({prop:"gridAutoFlow"}),Cd=we({prop:"gridAutoColumns"}),jd=we({prop:"gridAutoRows"}),Od=we({prop:"gridTemplateColumns"}),Rd=we({prop:"gridTemplateRows"}),_d=we({prop:"gridTemplateAreas"}),Pd=we({prop:"gridArea"});vn(wn,yn,xn,Ed,Sd,Td,Cd,jd,Od,Rd,_d,Pd);function Fr(e,r){return r==="grey"?r:e}const $d=we({prop:"color",themeKey:"palette",transform:Fr}),Id=we({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Fr}),Md=we({prop:"backgroundColor",themeKey:"palette",transform:Fr});vn($d,Id,Md);function $e(e){return e<=1&&e!==0?`${e*100}%`:e}const Ad=we({prop:"width",transform:$e}),Oo=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const r=t=>{var n,o;const a=((n=e.theme)==null||(n=n.breakpoints)==null||(n=n.values)==null?void 0:n[t])||jo[t];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:$e(t)}};return rr(e,e.maxWidth,r)}return null};Oo.filterProps=["maxWidth"];const Dd=we({prop:"minWidth",transform:$e}),Bd=we({prop:"height",transform:$e}),Ld=we({prop:"maxHeight",transform:$e}),Vd=we({prop:"minHeight",transform:$e});we({prop:"size",cssProperty:"width",transform:$e});we({prop:"size",cssProperty:"height",transform:$e});const Fd=we({prop:"boxSizing"});vn(Ad,Oo,Dd,Bd,Ld,Vd,Fd);const zd={border:{themeKey:"borders",transform:Be},borderTop:{themeKey:"borders",transform:Be},borderRight:{themeKey:"borders",transform:Be},borderBottom:{themeKey:"borders",transform:Be},borderLeft:{themeKey:"borders",transform:Be},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Be},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:bn},color:{themeKey:"palette",transform:Fr},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Fr},backgroundColor:{themeKey:"palette",transform:Fr},p:{style:ge},pt:{style:ge},pr:{style:ge},pb:{style:ge},pl:{style:ge},px:{style:ge},py:{style:ge},padding:{style:ge},paddingTop:{style:ge},paddingRight:{style:ge},paddingBottom:{style:ge},paddingLeft:{style:ge},paddingX:{style:ge},paddingY:{style:ge},paddingInline:{style:ge},paddingInlineStart:{style:ge},paddingInlineEnd:{style:ge},paddingBlock:{style:ge},paddingBlockStart:{style:ge},paddingBlockEnd:{style:ge},m:{style:he},mt:{style:he},mr:{style:he},mb:{style:he},ml:{style:he},mx:{style:he},my:{style:he},margin:{style:he},marginTop:{style:he},marginRight:{style:he},marginBottom:{style:he},marginLeft:{style:he},marginX:{style:he},marginY:{style:he},marginInline:{style:he},marginInlineStart:{style:he},marginInlineEnd:{style:he},marginBlock:{style:he},marginBlockStart:{style:he},marginBlockEnd:{style:he},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:wn},rowGap:{style:xn},columnGap:{style:yn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:$e},maxWidth:{style:Oo},minWidth:{transform:$e},height:{transform:$e},maxHeight:{transform:$e},minHeight:{transform:$e},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Ro=zd;function Gd(...e){const r=e.reduce((n,o)=>n.concat(Object.keys(o)),[]),t=new Set(r);return e.every(n=>t.size===Object.keys(n).length)}function Hd(e,r){return typeof e=="function"?e(r):e}function Ud(){function e(t,n,o,a){const i={[t]:n,theme:o},l=a[t];if(!l)return{[t]:n};const{cssProperty:p=t,themeKey:u,transform:f,style:b}=l;if(n==null)return null;if(u==="typography"&&n==="inherit")return{[t]:n};const v=mn(o,u)||{};return b?b(i):rr(i,n,h=>{let d=rn(v,f,h);return h===d&&typeof h=="string"&&(d=rn(v,f,`${t}${h==="default"?"":Ye(h)}`,h)),p===!1?d:{[p]:d}})}function r(t){var n;const{sx:o,theme:a={}}=t||{};if(!o)return null;const i=(n=a.unstable_sxConfig)!=null?n:Ro;function l(p){let u=p;if(typeof p=="function")u=p(a);else if(typeof p!="object")return p;if(!u)return null;const f=td(a.breakpoints),b=Object.keys(f);let v=f;return Object.keys(u).forEach(c=>{const h=Hd(u[c],a);if(h!=null)if(typeof h=="object")if(i[c])v=wt(v,e(c,h,a,i));else{const d=rr({theme:a},h,g=>({[c]:g}));Gd(d,h)?v[c]=r({sx:h,theme:a}):v=wt(v,d)}else v=wt(v,e(c,h,a,i))}),nd(b,v)}return Array.isArray(o)?o.map(l):l(o)}return r}const ui=Ud();ui.filterProps=["sx"];const _o=ui;function Xd(e,r){const t=this;return t.vars&&typeof t.getColorSchemeSelector=="function"?{[t.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:r}:t.palette.mode===e?r:{}}const qd=["breakpoints","palette","spacing","shape"];function Po(e={},...r){const{breakpoints:t={},palette:n={},spacing:o,shape:a={}}=e,i=ke(e,qd),l=Zc(t),p=dd(o);let u=er({breakpoints:l,direction:"ltr",components:{},palette:P({mode:"light"},n),spacing:p,shape:P({},ed,a)},i);return u.applyStyles=Xd,u=r.reduce((f,b)=>er(f,b),u),u.unstable_sxConfig=P({},Ro,i==null?void 0:i.unstable_sxConfig),u.unstable_sx=function(b){return _o({sx:b,theme:this})},u}function Wd(e){return Object.keys(e).length===0}function fi(e=null){const r=M.useContext(qn.ThemeContext);return!r||Wd(r)?e:r}const Yd=Po();function mi(e=Yd){return fi(e)}const Kd=["ownerState"],Jd=["variants"],Zd=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Qd(e){return Object.keys(e).length===0}function eu(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Wt(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const ru=Po(),Ia=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Ht({defaultTheme:e,theme:r,themeId:t}){return Qd(r)?e:r[t]||r}function tu(e){return e?(r,t)=>t[e]:null}function Yt(e,r){let{ownerState:t}=r,n=ke(r,Kd);const o=typeof e=="function"?e(P({ownerState:t},n)):e;if(Array.isArray(o))return o.flatMap(a=>Yt(a,P({ownerState:t},n)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let l=ke(o,Jd);return a.forEach(p=>{let u=!0;typeof p.props=="function"?u=p.props(P({ownerState:t},n,t)):Object.keys(p.props).forEach(f=>{(t==null?void 0:t[f])!==p.props[f]&&n[f]!==p.props[f]&&(u=!1)}),u&&(Array.isArray(l)||(l=[l]),l.push(typeof p.style=="function"?p.style(P({ownerState:t},n,t)):p.style))}),l}return o}function nu(e={}){const{themeId:r,defaultTheme:t=ru,rootShouldForwardProp:n=Wt,slotShouldForwardProp:o=Wt}=e,a=i=>_o(P({},i,{theme:Ht(P({},i,{defaultTheme:t,themeId:r}))}));return a.__mui_systemSx=!0,(i,l={})=>{qn.internal_processStyles(i,w=>w.filter(j=>!(j!=null&&j.__mui_systemSx)));const{name:p,slot:u,skipVariantsResolver:f,skipSx:b,overridesResolver:v=tu(Ia(u))}=l,c=ke(l,Zd),h=f!==void 0?f:u&&u!=="Root"&&u!=="root"||!1,d=b||!1;let g;process.env.NODE_ENV!=="production"&&p&&(g=`${p}-${Ia(u||"Root")}`);let x=Wt;u==="Root"||u==="root"?x=n:u?x=o:eu(i)&&(x=void 0);const C=qn(i,P({shouldForwardProp:x,label:g},c)),N=w=>typeof w=="function"&&w.__emotion_real!==w||wr(w)?j=>Yt(w,P({},j,{theme:Ht({theme:j.theme,defaultTheme:t,themeId:r})})):w,k=(w,...j)=>{let _=N(w);const A=j?j.map(N):[];p&&v&&A.push(E=>{const D=Ht(P({},E,{defaultTheme:t,themeId:r}));if(!D.components||!D.components[p]||!D.components[p].styleOverrides)return null;const B=D.components[p].styleOverrides,J={};return Object.entries(B).forEach(([Y,H])=>{J[Y]=Yt(H,P({},E,{theme:D}))}),v(E,J)}),p&&!h&&A.push(E=>{var D;const B=Ht(P({},E,{defaultTheme:t,themeId:r})),J=B==null||(D=B.components)==null||(D=D[p])==null?void 0:D.variants;return Yt({variants:J},P({},E,{theme:B}))}),d||A.push(a);const T=A.length-j.length;if(Array.isArray(w)&&T>0){const E=new Array(T).fill("");_=[...w,...E],_.raw=[...w.raw,...E]}const R=C(_,...A);if(process.env.NODE_ENV!=="production"){let E;p&&(E=`${p}${Ye(u||"")}`),E===void 0&&(E=`Styled(${Tc(i)})`),R.displayName=E}return i.muiName&&(R.muiName=i.muiName),R};return C.withConfig&&(k.withConfig=C.withConfig),k}}function ou(e){const{theme:r,name:t,props:n}=e;return!r||!r.components||!r.components[t]||!r.components[t].defaultProps?n:si(r.components[t].defaultProps,n)}function au({props:e,name:r,defaultTheme:t,themeId:n}){let o=mi(t);return n&&(o=o[n]||o),ou({theme:o,name:r,props:e})}function $o(e,r=0,t=1){return process.env.NODE_ENV!=="production"&&(e<r||e>t)&&console.error(`MUI: The value provided ${e} is out of range [${r}, ${t}].`),Yc(e,r,t)}function su(e){e=e.slice(1);const r=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let t=e.match(r);return t&&t[0].length===1&&(t=t.map(n=>n+n)),t?`rgb${t.length===4?"a":""}(${t.map((n,o)=>o<3?parseInt(n,16):Math.round(parseInt(n,16)/255*1e3)/1e3).join(", ")})`:""}function Cr(e){if(e.type)return e;if(e.charAt(0)==="#")return Cr(su(e));const r=e.indexOf("("),t=e.substring(0,r);if(["rgb","rgba","hsl","hsla","color"].indexOf(t)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Ur(9,e));let n=e.substring(r+1,e.length-1),o;if(t==="color"){if(n=n.split(" "),o=n.shift(),n.length===4&&n[3].charAt(0)==="/"&&(n[3]=n[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Ur(10,o))}else n=n.split(",");return n=n.map(a=>parseFloat(a)),{type:t,values:n,colorSpace:o}}function kn(e){const{type:r,colorSpace:t}=e;let{values:n}=e;return r.indexOf("rgb")!==-1?n=n.map((o,a)=>a<3?parseInt(o,10):o):r.indexOf("hsl")!==-1&&(n[1]=`${n[1]}%`,n[2]=`${n[2]}%`),r.indexOf("color")!==-1?n=`${t} ${n.join(" ")}`:n=`${n.join(", ")}`,`${r}(${n})`}function iu(e){e=Cr(e);const{values:r}=e,t=r[0],n=r[1]/100,o=r[2]/100,a=n*Math.min(o,1-o),i=(u,f=(u+t/30)%12)=>o-a*Math.max(Math.min(f-3,9-f,1),-1);let l="rgb";const p=[Math.round(i(0)*255),Math.round(i(8)*255),Math.round(i(4)*255)];return e.type==="hsla"&&(l+="a",p.push(r[3])),kn({type:l,values:p})}function Ma(e){e=Cr(e);let r=e.type==="hsl"||e.type==="hsla"?Cr(iu(e)).values:e.values;return r=r.map(t=>(e.type!=="color"&&(t/=255),t<=.03928?t/12.92:((t+.055)/1.055)**2.4)),Number((.2126*r[0]+.7152*r[1]+.0722*r[2]).toFixed(3))}function Aa(e,r){const t=Ma(e),n=Ma(r);return(Math.max(t,n)+.05)/(Math.min(t,n)+.05)}function hi(e,r){return e=Cr(e),r=$o(r),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${r}`:e.values[3]=r,kn(e)}function lu(e,r){if(e=Cr(e),r=$o(r),e.type.indexOf("hsl")!==-1)e.values[2]*=1-r;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let t=0;t<3;t+=1)e.values[t]*=1-r;return kn(e)}function pu(e,r){if(e=Cr(e),r=$o(r),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*r;else if(e.type.indexOf("rgb")!==-1)for(let t=0;t<3;t+=1)e.values[t]+=(255-e.values[t])*r;else if(e.type.indexOf("color")!==-1)for(let t=0;t<3;t+=1)e.values[t]+=(1-e.values[t])*r;return kn(e)}function cu(e,r){return P({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},r)}const du={black:"#000",white:"#fff"},St=du,uu={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},fu=uu,mu={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},$r=mu,hu={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Ir=hu,gu={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},lt=gu,vu={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Mr=vu,bu={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Ar=bu,wu={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Dr=wu,yu=["mode","contrastThreshold","tonalOffset"],Da={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:St.white,default:St.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Vn={text:{primary:St.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:St.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Ba(e,r,t,n){const o=n.light||n,a=n.dark||n*1.5;e[r]||(e.hasOwnProperty(t)?e[r]=e[t]:r==="light"?e.light=pu(e.main,o):r==="dark"&&(e.dark=lu(e.main,a)))}function xu(e="light"){return e==="dark"?{main:Mr[200],light:Mr[50],dark:Mr[400]}:{main:Mr[700],light:Mr[400],dark:Mr[800]}}function ku(e="light"){return e==="dark"?{main:$r[200],light:$r[50],dark:$r[400]}:{main:$r[500],light:$r[300],dark:$r[700]}}function Nu(e="light"){return e==="dark"?{main:Ir[500],light:Ir[300],dark:Ir[700]}:{main:Ir[700],light:Ir[400],dark:Ir[800]}}function Eu(e="light"){return e==="dark"?{main:Ar[400],light:Ar[300],dark:Ar[700]}:{main:Ar[700],light:Ar[500],dark:Ar[900]}}function Su(e="light"){return e==="dark"?{main:Dr[400],light:Dr[300],dark:Dr[700]}:{main:Dr[800],light:Dr[500],dark:Dr[900]}}function Tu(e="light"){return e==="dark"?{main:lt[400],light:lt[300],dark:lt[700]}:{main:"#ed6c02",light:lt[500],dark:lt[900]}}function Cu(e){const{mode:r="light",contrastThreshold:t=3,tonalOffset:n=.2}=e,o=ke(e,yu),a=e.primary||xu(r),i=e.secondary||ku(r),l=e.error||Nu(r),p=e.info||Eu(r),u=e.success||Su(r),f=e.warning||Tu(r);function b(d){const g=Aa(d,Vn.text.primary)>=t?Vn.text.primary:Da.text.primary;if(process.env.NODE_ENV!=="production"){const x=Aa(d,g);x<3&&console.error([`MUI: The contrast ratio of ${x}:1 for ${g} on ${d}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return g}const v=({color:d,name:g,mainShade:x=500,lightShade:C=300,darkShade:N=700})=>{if(d=P({},d),!d.main&&d[x]&&(d.main=d[x]),!d.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${g?` (${g})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.`:Ur(11,g?` (${g})`:"",x));if(typeof d.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${g?` (${g})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(d.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Ur(12,g?` (${g})`:"",JSON.stringify(d.main)));return Ba(d,"light",C,n),Ba(d,"dark",N,n),d.contrastText||(d.contrastText=b(d.main)),d},c={dark:Vn,light:Da};return process.env.NODE_ENV!=="production"&&(c[r]||console.error(`MUI: The palette mode \`${r}\` is not supported.`)),er(P({common:P({},St),mode:r,primary:v({color:a,name:"primary"}),secondary:v({color:i,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:v({color:l,name:"error"}),warning:v({color:f,name:"warning"}),info:v({color:p,name:"info"}),success:v({color:u,name:"success"}),grey:fu,contrastThreshold:t,getContrastText:b,augmentColor:v,tonalOffset:n},c[r]),o)}const ju=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Ou(e){return Math.round(e*1e5)/1e5}const La={textTransform:"uppercase"},Va='"Roboto", "Helvetica", "Arial", sans-serif';function Ru(e,r){const t=typeof r=="function"?r(e):r,{fontFamily:n=Va,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:i=400,fontWeightMedium:l=500,fontWeightBold:p=700,htmlFontSize:u=16,allVariants:f,pxToRem:b}=t,v=ke(t,ju);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const c=o/14,h=b||(x=>`${x/u*c}rem`),d=(x,C,N,k,w)=>P({fontFamily:n,fontWeight:x,fontSize:h(C),lineHeight:N},n===Va?{letterSpacing:`${Ou(k/C)}em`}:{},w,f),g={h1:d(a,96,1.167,-1.5),h2:d(a,60,1.2,-.5),h3:d(i,48,1.167,0),h4:d(i,34,1.235,.25),h5:d(i,24,1.334,0),h6:d(l,20,1.6,.15),subtitle1:d(i,16,1.75,.15),subtitle2:d(l,14,1.57,.1),body1:d(i,16,1.5,.15),body2:d(i,14,1.43,.15),button:d(l,14,1.75,.4,La),caption:d(i,12,1.66,.4),overline:d(i,12,2.66,1,La),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return er(P({htmlFontSize:u,pxToRem:h,fontFamily:n,fontSize:o,fontWeightLight:a,fontWeightRegular:i,fontWeightMedium:l,fontWeightBold:p},g),v,{clone:!1})}const _u=.2,Pu=.14,$u=.12;function me(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${_u})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Pu})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${$u})`].join(",")}const Iu=["none",me(0,2,1,-1,0,1,1,0,0,1,3,0),me(0,3,1,-2,0,2,2,0,0,1,5,0),me(0,3,3,-2,0,3,4,0,0,1,8,0),me(0,2,4,-1,0,4,5,0,0,1,10,0),me(0,3,5,-1,0,5,8,0,0,1,14,0),me(0,3,5,-1,0,6,10,0,0,1,18,0),me(0,4,5,-2,0,7,10,1,0,2,16,1),me(0,5,5,-3,0,8,10,1,0,3,14,2),me(0,5,6,-3,0,9,12,1,0,3,16,2),me(0,6,6,-3,0,10,14,1,0,4,18,3),me(0,6,7,-4,0,11,15,1,0,4,20,3),me(0,7,8,-4,0,12,17,2,0,5,22,4),me(0,7,8,-4,0,13,19,2,0,5,24,4),me(0,7,9,-4,0,14,21,2,0,5,26,4),me(0,8,9,-5,0,15,22,2,0,6,28,5),me(0,8,10,-5,0,16,24,2,0,6,30,5),me(0,8,11,-5,0,17,26,2,0,6,32,5),me(0,9,11,-5,0,18,28,2,0,7,34,6),me(0,9,12,-6,0,19,29,2,0,7,36,6),me(0,10,13,-6,0,20,31,3,0,8,38,7),me(0,10,13,-6,0,21,33,3,0,8,40,7),me(0,10,14,-6,0,22,35,3,0,8,42,7),me(0,11,14,-7,0,23,36,3,0,9,44,8),me(0,11,15,-7,0,24,38,3,0,9,46,8)],Mu=Iu,Au=["duration","easing","delay"],Du={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Bu={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Fa(e){return`${Math.round(e)}ms`}function Lu(e){if(!e)return 0;const r=e/36;return Math.round((4+15*r**.25+r/5)*10)}function Vu(e){const r=P({},Du,e.easing),t=P({},Bu,e.duration);return P({getAutoHeightDuration:Lu,create:(o=["all"],a={})=>{const{duration:i=t.standard,easing:l=r.easeInOut,delay:p=0}=a,u=ke(a,Au);if(process.env.NODE_ENV!=="production"){const f=v=>typeof v=="string",b=v=>!isNaN(parseFloat(v));!f(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!b(i)&&!f(i)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`),f(l)||console.error('MUI: Argument "easing" must be a string.'),!b(p)&&!f(p)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(f=>`${f} ${typeof i=="string"?i:Fa(i)} ${l} ${typeof p=="string"?p:Fa(p)}`).join(",")}},e,{easing:r,duration:t})}const Fu={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},zu=Fu,Gu=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Hu(e={},...r){const{mixins:t={},palette:n={},transitions:o={},typography:a={}}=e,i=ke(e,Gu);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Ur(18));const l=Cu(n),p=Po(e);let u=er(p,{mixins:cu(p.breakpoints,t),palette:l,shadows:Mu.slice(),typography:Ru(l,a),transitions:Vu(o),zIndex:P({},zu)});if(u=er(u,i),u=r.reduce((f,b)=>er(f,b),u),process.env.NODE_ENV!=="production"){const f=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],b=(v,c)=>{let h;for(h in v){const d=v[h];if(f.indexOf(h)!==-1&&Object.keys(d).length>0){if(process.env.NODE_ENV!=="production"){const g=fn("",h);console.error([`MUI: The \`${c}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(v,null,2),"",`Instead, you need to use the '&.${g}' syntax:`,JSON.stringify({root:{[`&.${g}`]:d}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}v[h]={}}}};Object.keys(u.components).forEach(v=>{const c=u.components[v].styleOverrides;c&&v.indexOf("Mui")===0&&b(c,v)})}return u.unstable_sxConfig=P({},Ro,i==null?void 0:i.unstable_sxConfig),u.unstable_sx=function(b){return _o({sx:b,theme:this})},u}const Uu=Hu(),Io=Uu,Mo="$$material";function Ao({props:e,name:r}){return au({props:e,name:r,defaultTheme:Io,themeId:Mo})}const Xu=e=>Wt(e)&&e!=="classes",qu=nu({themeId:Mo,defaultTheme:Io,rootShouldForwardProp:Xu}),At=qu;function Wu(e){return fn("MuiSvgIcon",e)}pi("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Yu=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Ku=e=>{const{color:r,fontSize:t,classes:n}=e,o={root:["root",r!=="inherit"&&`color${Ye(r)}`,`fontSize${Ye(t)}`]};return Co(o,Wu,n)},Ju=At("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.root,t.color!=="inherit"&&r[`color${Ye(t.color)}`],r[`fontSize${Ye(t.fontSize)}`]]}})(({theme:e,ownerState:r})=>{var t,n,o,a,i,l,p,u,f,b,v,c,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:r.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(t=e.transitions)==null||(n=t.create)==null?void 0:n.call(t,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(i=a.pxToRem)==null?void 0:i.call(a,20))||"1.25rem",medium:((l=e.typography)==null||(p=l.pxToRem)==null?void 0:p.call(l,24))||"1.5rem",large:((u=e.typography)==null||(f=u.pxToRem)==null?void 0:f.call(u,35))||"2.1875rem"}[r.fontSize],color:(b=(v=(e.vars||e).palette)==null||(v=v[r.color])==null?void 0:v.main)!=null?b:{action:(c=(e.vars||e).palette)==null||(c=c.action)==null?void 0:c.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[r.color]}}),Do=M.forwardRef(function(r,t){const n=Ao({props:r,name:"MuiSvgIcon"}),{children:o,className:a,color:i="inherit",component:l="svg",fontSize:p="medium",htmlColor:u,inheritViewBox:f=!1,titleAccess:b,viewBox:v="0 0 24 24"}=n,c=ke(n,Yu),h=M.isValidElement(o)&&o.type==="svg",d=P({},n,{color:i,component:l,fontSize:p,instanceFontSize:r.fontSize,inheritViewBox:f,viewBox:v,hasSvgAsChild:h}),g={};f||(g.viewBox=v);const x=Ku(d);return s.jsxs(Ju,P({as:l,className:lr(x.root,a),focusable:"false",color:u,"aria-hidden":b?void 0:!0,role:b?"img":void 0,ref:t},g,c,h&&o.props,{ownerState:d,children:[h?o.props.children:o,b?s.jsx("title",{children:b}):null]}))});process.env.NODE_ENV!=="production"&&(Do.propTypes={children:m.node,classes:m.object,className:m.string,color:m.oneOfType([m.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),m.string]),component:m.elementType,fontSize:m.oneOfType([m.oneOf(["inherit","large","medium","small"]),m.string]),htmlColor:m.string,inheritViewBox:m.bool,shapeRendering:m.string,sx:m.oneOfType([m.arrayOf(m.oneOfType([m.func,m.object,m.bool])),m.func,m.object]),titleAccess:m.string,viewBox:m.string});Do.muiName="SvgIcon";const za=Do;function gi(e,r){function t(n,o){return s.jsx(za,P({"data-testid":`${r}Icon`,ref:o},n,{children:e}))}return process.env.NODE_ENV!=="production"&&(t.displayName=`${r}Icon`),t.muiName=za.muiName,M.memo(M.forwardRef(t))}const Zu={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),ii.configure(e)}},Qu=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Ye,createChainedFunction:jc,createSvgIcon:gi,debounce:Oc,deprecatedPropType:Rc,isMuiElement:_c,ownerDocument:Qt,ownerWindow:Pc,requirePropFactory:$c,setRef:en,unstable_ClassNameGenerator:Zu,unstable_useEnhancedEffect:Xr,unstable_useId:ni,unsupportedProp:Ac,useControlled:oi,useEventCallback:Qn,useForkRef:Tr,useIsFocusVisible:ai},Symbol.toStringTag,{value:"Module"})),ef=lc(Qu);var Ga;function rf(){return Ga||(Ga=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return r.createSvgIcon}});var r=ef}(Pn)),Pn}var tf=pc;Object.defineProperty(Eo,"__esModule",{value:!0});var vi=Eo.default=void 0,nf=tf(rf()),of=s;vi=Eo.default=(0,nf.default)((0,of.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function af(e){return typeof e=="string"}function ht(e,r,t){return e===void 0||af(e)?r:P({},r,{ownerState:P({},r.ownerState,t)})}const sf={disableDefaultClasses:!1},lf=M.createContext(sf);function pf(e){const{disableDefaultClasses:r}=M.useContext(lf);return t=>r?"":e(t)}function cf(e,r=[]){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>n.match(/^on[A-Z]/)&&typeof e[n]=="function"&&!r.includes(n)).forEach(n=>{t[n]=e[n]}),t}function df(e,r,t){return typeof e=="function"?e(r,t):e}function Ha(e){if(e===void 0)return{};const r={};return Object.keys(e).filter(t=>!(t.match(/^on[A-Z]/)&&typeof e[t]=="function")).forEach(t=>{r[t]=e[t]}),r}function uf(e){const{getSlotProps:r,additionalProps:t,externalSlotProps:n,externalForwardedProps:o,className:a}=e;if(!r){const c=lr(t==null?void 0:t.className,a,o==null?void 0:o.className,n==null?void 0:n.className),h=P({},t==null?void 0:t.style,o==null?void 0:o.style,n==null?void 0:n.style),d=P({},t,o,n);return c.length>0&&(d.className=c),Object.keys(h).length>0&&(d.style=h),{props:d,internalRef:void 0}}const i=cf(P({},o,n)),l=Ha(n),p=Ha(o),u=r(i),f=lr(u==null?void 0:u.className,t==null?void 0:t.className,a,o==null?void 0:o.className,n==null?void 0:n.className),b=P({},u==null?void 0:u.style,t==null?void 0:t.style,o==null?void 0:o.style,n==null?void 0:n.style),v=P({},u,t,p,l);return f.length>0&&(v.className=f),Object.keys(b).length>0&&(v.style=b),{props:v,internalRef:u.ref}}const ff=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function mf(e){var r;const{elementType:t,externalSlotProps:n,ownerState:o,skipResolvingSlotProps:a=!1}=e,i=ke(e,ff),l=a?{}:df(n,o),{props:p,internalRef:u}=uf(P({},i,{externalSlotProps:l})),f=Tr(u,l==null?void 0:l.ref,(r=e.additionalProps)==null?void 0:r.ref);return ht(t,P({},p,{ref:f}),o)}const bi="base";function hf(e){return`${bi}--${e}`}function gf(e,r){return`${bi}-${e}-${r}`}function wi(e,r){const t=li[r];return t?hf(t):gf(e,r)}function vf(e,r){const t={};return r.forEach(n=>{t[n]=wi(e,n)}),t}function bf(e){return typeof e=="function"?e():e}const tn=M.forwardRef(function(r,t){const{children:n,container:o,disablePortal:a=!1}=r,[i,l]=M.useState(null),p=Tr(M.isValidElement(n)?n.ref:null,t);if(Xr(()=>{a||l(bf(o)||document.body)},[o,a]),Xr(()=>{if(i&&!a)return en(t,i),()=>{en(t,null)}},[t,i,a]),a){if(M.isValidElement(n)){const u={ref:p};return M.cloneElement(n,u)}return s.jsx(M.Fragment,{children:n})}return s.jsx(M.Fragment,{children:i&&Wl.createPortal(n,i)})});process.env.NODE_ENV!=="production"&&(tn.propTypes={children:m.node,container:m.oneOfType([Et,m.func]),disablePortal:m.bool});process.env.NODE_ENV!=="production"&&(tn["propTypes"]=xc(tn.propTypes));var Ce="top",Ve="bottom",Fe="right",je="left",Bo="auto",Dt=[Ce,Ve,Fe,je],qr="start",Tt="end",wf="clippingParents",yi="viewport",pt="popper",yf="reference",Ua=Dt.reduce(function(e,r){return e.concat([r+"-"+qr,r+"-"+Tt])},[]),xi=[].concat(Dt,[Bo]).reduce(function(e,r){return e.concat([r,r+"-"+qr,r+"-"+Tt])},[]),xf="beforeRead",kf="read",Nf="afterRead",Ef="beforeMain",Sf="main",Tf="afterMain",Cf="beforeWrite",jf="write",Of="afterWrite",Rf=[xf,kf,Nf,Ef,Sf,Tf,Cf,jf,Of];function Ke(e){return e?(e.nodeName||"").toLowerCase():null}function Me(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var r=e.ownerDocument;return r&&r.defaultView||window}return e}function jr(e){var r=Me(e).Element;return e instanceof r||e instanceof Element}function Le(e){var r=Me(e).HTMLElement;return e instanceof r||e instanceof HTMLElement}function Lo(e){if(typeof ShadowRoot>"u")return!1;var r=Me(e).ShadowRoot;return e instanceof r||e instanceof ShadowRoot}function _f(e){var r=e.state;Object.keys(r.elements).forEach(function(t){var n=r.styles[t]||{},o=r.attributes[t]||{},a=r.elements[t];!Le(a)||!Ke(a)||(Object.assign(a.style,n),Object.keys(o).forEach(function(i){var l=o[i];l===!1?a.removeAttribute(i):a.setAttribute(i,l===!0?"":l)}))})}function Pf(e){var r=e.state,t={popper:{position:r.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(r.elements.popper.style,t.popper),r.styles=t,r.elements.arrow&&Object.assign(r.elements.arrow.style,t.arrow),function(){Object.keys(r.elements).forEach(function(n){var o=r.elements[n],a=r.attributes[n]||{},i=Object.keys(r.styles.hasOwnProperty(n)?r.styles[n]:t[n]),l=i.reduce(function(p,u){return p[u]="",p},{});!Le(o)||!Ke(o)||(Object.assign(o.style,l),Object.keys(a).forEach(function(p){o.removeAttribute(p)}))})}}const $f={name:"applyStyles",enabled:!0,phase:"write",fn:_f,effect:Pf,requires:["computeStyles"]};function qe(e){return e.split("-")[0]}var xr=Math.max,nn=Math.min,Wr=Math.round;function ro(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(r){return r.brand+"/"+r.version}).join(" "):navigator.userAgent}function ki(){return!/^((?!chrome|android).)*safari/i.test(ro())}function Yr(e,r,t){r===void 0&&(r=!1),t===void 0&&(t=!1);var n=e.getBoundingClientRect(),o=1,a=1;r&&Le(e)&&(o=e.offsetWidth>0&&Wr(n.width)/e.offsetWidth||1,a=e.offsetHeight>0&&Wr(n.height)/e.offsetHeight||1);var i=jr(e)?Me(e):window,l=i.visualViewport,p=!ki()&&t,u=(n.left+(p&&l?l.offsetLeft:0))/o,f=(n.top+(p&&l?l.offsetTop:0))/a,b=n.width/o,v=n.height/a;return{width:b,height:v,top:f,right:u+b,bottom:f+v,left:u,x:u,y:f}}function Vo(e){var r=Yr(e),t=e.offsetWidth,n=e.offsetHeight;return Math.abs(r.width-t)<=1&&(t=r.width),Math.abs(r.height-n)<=1&&(n=r.height),{x:e.offsetLeft,y:e.offsetTop,width:t,height:n}}function Ni(e,r){var t=r.getRootNode&&r.getRootNode();if(e.contains(r))return!0;if(t&&Lo(t)){var n=r;do{if(n&&e.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function tr(e){return Me(e).getComputedStyle(e)}function If(e){return["table","td","th"].indexOf(Ke(e))>=0}function dr(e){return((jr(e)?e.ownerDocument:e.document)||window.document).documentElement}function Nn(e){return Ke(e)==="html"?e:e.assignedSlot||e.parentNode||(Lo(e)?e.host:null)||dr(e)}function Xa(e){return!Le(e)||tr(e).position==="fixed"?null:e.offsetParent}function Mf(e){var r=/firefox/i.test(ro()),t=/Trident/i.test(ro());if(t&&Le(e)){var n=tr(e);if(n.position==="fixed")return null}var o=Nn(e);for(Lo(o)&&(o=o.host);Le(o)&&["html","body"].indexOf(Ke(o))<0;){var a=tr(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||r&&a.willChange==="filter"||r&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function Bt(e){for(var r=Me(e),t=Xa(e);t&&If(t)&&tr(t).position==="static";)t=Xa(t);return t&&(Ke(t)==="html"||Ke(t)==="body"&&tr(t).position==="static")?r:t||Mf(e)||r}function Fo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function yt(e,r,t){return xr(e,nn(r,t))}function Af(e,r,t){var n=yt(e,r,t);return n>t?t:n}function Ei(){return{top:0,right:0,bottom:0,left:0}}function Si(e){return Object.assign({},Ei(),e)}function Ti(e,r){return r.reduce(function(t,n){return t[n]=e,t},{})}var Df=function(r,t){return r=typeof r=="function"?r(Object.assign({},t.rects,{placement:t.placement})):r,Si(typeof r!="number"?r:Ti(r,Dt))};function Bf(e){var r,t=e.state,n=e.name,o=e.options,a=t.elements.arrow,i=t.modifiersData.popperOffsets,l=qe(t.placement),p=Fo(l),u=[je,Fe].indexOf(l)>=0,f=u?"height":"width";if(!(!a||!i)){var b=Df(o.padding,t),v=Vo(a),c=p==="y"?Ce:je,h=p==="y"?Ve:Fe,d=t.rects.reference[f]+t.rects.reference[p]-i[p]-t.rects.popper[f],g=i[p]-t.rects.reference[p],x=Bt(a),C=x?p==="y"?x.clientHeight||0:x.clientWidth||0:0,N=d/2-g/2,k=b[c],w=C-v[f]-b[h],j=C/2-v[f]/2+N,_=yt(k,j,w),A=p;t.modifiersData[n]=(r={},r[A]=_,r.centerOffset=_-j,r)}}function Lf(e){var r=e.state,t=e.options,n=t.element,o=n===void 0?"[data-popper-arrow]":n;o!=null&&(typeof o=="string"&&(o=r.elements.popper.querySelector(o),!o)||Ni(r.elements.popper,o)&&(r.elements.arrow=o))}const Vf={name:"arrow",enabled:!0,phase:"main",fn:Bf,effect:Lf,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Kr(e){return e.split("-")[1]}var Ff={top:"auto",right:"auto",bottom:"auto",left:"auto"};function zf(e,r){var t=e.x,n=e.y,o=r.devicePixelRatio||1;return{x:Wr(t*o)/o||0,y:Wr(n*o)/o||0}}function qa(e){var r,t=e.popper,n=e.popperRect,o=e.placement,a=e.variation,i=e.offsets,l=e.position,p=e.gpuAcceleration,u=e.adaptive,f=e.roundOffsets,b=e.isFixed,v=i.x,c=v===void 0?0:v,h=i.y,d=h===void 0?0:h,g=typeof f=="function"?f({x:c,y:d}):{x:c,y:d};c=g.x,d=g.y;var x=i.hasOwnProperty("x"),C=i.hasOwnProperty("y"),N=je,k=Ce,w=window;if(u){var j=Bt(t),_="clientHeight",A="clientWidth";if(j===Me(t)&&(j=dr(t),tr(j).position!=="static"&&l==="absolute"&&(_="scrollHeight",A="scrollWidth")),j=j,o===Ce||(o===je||o===Fe)&&a===Tt){k=Ve;var T=b&&j===w&&w.visualViewport?w.visualViewport.height:j[_];d-=T-n.height,d*=p?1:-1}if(o===je||(o===Ce||o===Ve)&&a===Tt){N=Fe;var R=b&&j===w&&w.visualViewport?w.visualViewport.width:j[A];c-=R-n.width,c*=p?1:-1}}var E=Object.assign({position:l},u&&Ff),D=f===!0?zf({x:c,y:d},Me(t)):{x:c,y:d};if(c=D.x,d=D.y,p){var B;return Object.assign({},E,(B={},B[k]=C?"0":"",B[N]=x?"0":"",B.transform=(w.devicePixelRatio||1)<=1?"translate("+c+"px, "+d+"px)":"translate3d("+c+"px, "+d+"px, 0)",B))}return Object.assign({},E,(r={},r[k]=C?d+"px":"",r[N]=x?c+"px":"",r.transform="",r))}function Gf(e){var r=e.state,t=e.options,n=t.gpuAcceleration,o=n===void 0?!0:n,a=t.adaptive,i=a===void 0?!0:a,l=t.roundOffsets,p=l===void 0?!0:l,u={placement:qe(r.placement),variation:Kr(r.placement),popper:r.elements.popper,popperRect:r.rects.popper,gpuAcceleration:o,isFixed:r.options.strategy==="fixed"};r.modifiersData.popperOffsets!=null&&(r.styles.popper=Object.assign({},r.styles.popper,qa(Object.assign({},u,{offsets:r.modifiersData.popperOffsets,position:r.options.strategy,adaptive:i,roundOffsets:p})))),r.modifiersData.arrow!=null&&(r.styles.arrow=Object.assign({},r.styles.arrow,qa(Object.assign({},u,{offsets:r.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:p})))),r.attributes.popper=Object.assign({},r.attributes.popper,{"data-popper-placement":r.placement})}const Hf={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Gf,data:{}};var Ut={passive:!0};function Uf(e){var r=e.state,t=e.instance,n=e.options,o=n.scroll,a=o===void 0?!0:o,i=n.resize,l=i===void 0?!0:i,p=Me(r.elements.popper),u=[].concat(r.scrollParents.reference,r.scrollParents.popper);return a&&u.forEach(function(f){f.addEventListener("scroll",t.update,Ut)}),l&&p.addEventListener("resize",t.update,Ut),function(){a&&u.forEach(function(f){f.removeEventListener("scroll",t.update,Ut)}),l&&p.removeEventListener("resize",t.update,Ut)}}const Xf={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Uf,data:{}};var qf={left:"right",right:"left",bottom:"top",top:"bottom"};function Kt(e){return e.replace(/left|right|bottom|top/g,function(r){return qf[r]})}var Wf={start:"end",end:"start"};function Wa(e){return e.replace(/start|end/g,function(r){return Wf[r]})}function zo(e){var r=Me(e),t=r.pageXOffset,n=r.pageYOffset;return{scrollLeft:t,scrollTop:n}}function Go(e){return Yr(dr(e)).left+zo(e).scrollLeft}function Yf(e,r){var t=Me(e),n=dr(e),o=t.visualViewport,a=n.clientWidth,i=n.clientHeight,l=0,p=0;if(o){a=o.width,i=o.height;var u=ki();(u||!u&&r==="fixed")&&(l=o.offsetLeft,p=o.offsetTop)}return{width:a,height:i,x:l+Go(e),y:p}}function Kf(e){var r,t=dr(e),n=zo(e),o=(r=e.ownerDocument)==null?void 0:r.body,a=xr(t.scrollWidth,t.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),i=xr(t.scrollHeight,t.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-n.scrollLeft+Go(e),p=-n.scrollTop;return tr(o||t).direction==="rtl"&&(l+=xr(t.clientWidth,o?o.clientWidth:0)-a),{width:a,height:i,x:l,y:p}}function Ho(e){var r=tr(e),t=r.overflow,n=r.overflowX,o=r.overflowY;return/auto|scroll|overlay|hidden/.test(t+o+n)}function Ci(e){return["html","body","#document"].indexOf(Ke(e))>=0?e.ownerDocument.body:Le(e)&&Ho(e)?e:Ci(Nn(e))}function xt(e,r){var t;r===void 0&&(r=[]);var n=Ci(e),o=n===((t=e.ownerDocument)==null?void 0:t.body),a=Me(n),i=o?[a].concat(a.visualViewport||[],Ho(n)?n:[]):n,l=r.concat(i);return o?l:l.concat(xt(Nn(i)))}function to(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Jf(e,r){var t=Yr(e,!1,r==="fixed");return t.top=t.top+e.clientTop,t.left=t.left+e.clientLeft,t.bottom=t.top+e.clientHeight,t.right=t.left+e.clientWidth,t.width=e.clientWidth,t.height=e.clientHeight,t.x=t.left,t.y=t.top,t}function Ya(e,r,t){return r===yi?to(Yf(e,t)):jr(r)?Jf(r,t):to(Kf(dr(e)))}function Zf(e){var r=xt(Nn(e)),t=["absolute","fixed"].indexOf(tr(e).position)>=0,n=t&&Le(e)?Bt(e):e;return jr(n)?r.filter(function(o){return jr(o)&&Ni(o,n)&&Ke(o)!=="body"}):[]}function Qf(e,r,t,n){var o=r==="clippingParents"?Zf(e):[].concat(r),a=[].concat(o,[t]),i=a[0],l=a.reduce(function(p,u){var f=Ya(e,u,n);return p.top=xr(f.top,p.top),p.right=nn(f.right,p.right),p.bottom=nn(f.bottom,p.bottom),p.left=xr(f.left,p.left),p},Ya(e,i,n));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function ji(e){var r=e.reference,t=e.element,n=e.placement,o=n?qe(n):null,a=n?Kr(n):null,i=r.x+r.width/2-t.width/2,l=r.y+r.height/2-t.height/2,p;switch(o){case Ce:p={x:i,y:r.y-t.height};break;case Ve:p={x:i,y:r.y+r.height};break;case Fe:p={x:r.x+r.width,y:l};break;case je:p={x:r.x-t.width,y:l};break;default:p={x:r.x,y:r.y}}var u=o?Fo(o):null;if(u!=null){var f=u==="y"?"height":"width";switch(a){case qr:p[u]=p[u]-(r[f]/2-t[f]/2);break;case Tt:p[u]=p[u]+(r[f]/2-t[f]/2);break}}return p}function Ct(e,r){r===void 0&&(r={});var t=r,n=t.placement,o=n===void 0?e.placement:n,a=t.strategy,i=a===void 0?e.strategy:a,l=t.boundary,p=l===void 0?wf:l,u=t.rootBoundary,f=u===void 0?yi:u,b=t.elementContext,v=b===void 0?pt:b,c=t.altBoundary,h=c===void 0?!1:c,d=t.padding,g=d===void 0?0:d,x=Si(typeof g!="number"?g:Ti(g,Dt)),C=v===pt?yf:pt,N=e.rects.popper,k=e.elements[h?C:v],w=Qf(jr(k)?k:k.contextElement||dr(e.elements.popper),p,f,i),j=Yr(e.elements.reference),_=ji({reference:j,element:N,strategy:"absolute",placement:o}),A=to(Object.assign({},N,_)),T=v===pt?A:j,R={top:w.top-T.top+x.top,bottom:T.bottom-w.bottom+x.bottom,left:w.left-T.left+x.left,right:T.right-w.right+x.right},E=e.modifiersData.offset;if(v===pt&&E){var D=E[o];Object.keys(R).forEach(function(B){var J=[Fe,Ve].indexOf(B)>=0?1:-1,Y=[Ce,Ve].indexOf(B)>=0?"y":"x";R[B]+=D[Y]*J})}return R}function em(e,r){r===void 0&&(r={});var t=r,n=t.placement,o=t.boundary,a=t.rootBoundary,i=t.padding,l=t.flipVariations,p=t.allowedAutoPlacements,u=p===void 0?xi:p,f=Kr(n),b=f?l?Ua:Ua.filter(function(h){return Kr(h)===f}):Dt,v=b.filter(function(h){return u.indexOf(h)>=0});v.length===0&&(v=b);var c=v.reduce(function(h,d){return h[d]=Ct(e,{placement:d,boundary:o,rootBoundary:a,padding:i})[qe(d)],h},{});return Object.keys(c).sort(function(h,d){return c[h]-c[d]})}function rm(e){if(qe(e)===Bo)return[];var r=Kt(e);return[Wa(e),r,Wa(r)]}function tm(e){var r=e.state,t=e.options,n=e.name;if(!r.modifiersData[n]._skip){for(var o=t.mainAxis,a=o===void 0?!0:o,i=t.altAxis,l=i===void 0?!0:i,p=t.fallbackPlacements,u=t.padding,f=t.boundary,b=t.rootBoundary,v=t.altBoundary,c=t.flipVariations,h=c===void 0?!0:c,d=t.allowedAutoPlacements,g=r.options.placement,x=qe(g),C=x===g,N=p||(C||!h?[Kt(g)]:rm(g)),k=[g].concat(N).reduce(function(F,q){return F.concat(qe(q)===Bo?em(r,{placement:q,boundary:f,rootBoundary:b,padding:u,flipVariations:h,allowedAutoPlacements:d}):q)},[]),w=r.rects.reference,j=r.rects.popper,_=new Map,A=!0,T=k[0],R=0;R<k.length;R++){var E=k[R],D=qe(E),B=Kr(E)===qr,J=[Ce,Ve].indexOf(D)>=0,Y=J?"width":"height",H=Ct(r,{placement:E,boundary:f,rootBoundary:b,altBoundary:v,padding:u}),re=J?B?Fe:je:B?Ve:Ce;w[Y]>j[Y]&&(re=Kt(re));var se=Kt(re),V=[];if(a&&V.push(H[D]<=0),l&&V.push(H[re]<=0,H[se]<=0),V.every(function(F){return F})){T=E,A=!1;break}_.set(E,V)}if(A)for(var S=h?3:1,$=function(q){var G=k.find(function(W){var X=_.get(W);if(X)return X.slice(0,q).every(function(K){return K})});if(G)return T=G,"break"},U=S;U>0;U--){var z=$(U);if(z==="break")break}r.placement!==T&&(r.modifiersData[n]._skip=!0,r.placement=T,r.reset=!0)}}const nm={name:"flip",enabled:!0,phase:"main",fn:tm,requiresIfExists:["offset"],data:{_skip:!1}};function Ka(e,r,t){return t===void 0&&(t={x:0,y:0}),{top:e.top-r.height-t.y,right:e.right-r.width+t.x,bottom:e.bottom-r.height+t.y,left:e.left-r.width-t.x}}function Ja(e){return[Ce,Fe,Ve,je].some(function(r){return e[r]>=0})}function om(e){var r=e.state,t=e.name,n=r.rects.reference,o=r.rects.popper,a=r.modifiersData.preventOverflow,i=Ct(r,{elementContext:"reference"}),l=Ct(r,{altBoundary:!0}),p=Ka(i,n),u=Ka(l,o,a),f=Ja(p),b=Ja(u);r.modifiersData[t]={referenceClippingOffsets:p,popperEscapeOffsets:u,isReferenceHidden:f,hasPopperEscaped:b},r.attributes.popper=Object.assign({},r.attributes.popper,{"data-popper-reference-hidden":f,"data-popper-escaped":b})}const am={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:om};function sm(e,r,t){var n=qe(e),o=[je,Ce].indexOf(n)>=0?-1:1,a=typeof t=="function"?t(Object.assign({},r,{placement:e})):t,i=a[0],l=a[1];return i=i||0,l=(l||0)*o,[je,Fe].indexOf(n)>=0?{x:l,y:i}:{x:i,y:l}}function im(e){var r=e.state,t=e.options,n=e.name,o=t.offset,a=o===void 0?[0,0]:o,i=xi.reduce(function(f,b){return f[b]=sm(b,r.rects,a),f},{}),l=i[r.placement],p=l.x,u=l.y;r.modifiersData.popperOffsets!=null&&(r.modifiersData.popperOffsets.x+=p,r.modifiersData.popperOffsets.y+=u),r.modifiersData[n]=i}const lm={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:im};function pm(e){var r=e.state,t=e.name;r.modifiersData[t]=ji({reference:r.rects.reference,element:r.rects.popper,strategy:"absolute",placement:r.placement})}const cm={name:"popperOffsets",enabled:!0,phase:"read",fn:pm,data:{}};function dm(e){return e==="x"?"y":"x"}function um(e){var r=e.state,t=e.options,n=e.name,o=t.mainAxis,a=o===void 0?!0:o,i=t.altAxis,l=i===void 0?!1:i,p=t.boundary,u=t.rootBoundary,f=t.altBoundary,b=t.padding,v=t.tether,c=v===void 0?!0:v,h=t.tetherOffset,d=h===void 0?0:h,g=Ct(r,{boundary:p,rootBoundary:u,padding:b,altBoundary:f}),x=qe(r.placement),C=Kr(r.placement),N=!C,k=Fo(x),w=dm(k),j=r.modifiersData.popperOffsets,_=r.rects.reference,A=r.rects.popper,T=typeof d=="function"?d(Object.assign({},r.rects,{placement:r.placement})):d,R=typeof T=="number"?{mainAxis:T,altAxis:T}:Object.assign({mainAxis:0,altAxis:0},T),E=r.modifiersData.offset?r.modifiersData.offset[r.placement]:null,D={x:0,y:0};if(j){if(a){var B,J=k==="y"?Ce:je,Y=k==="y"?Ve:Fe,H=k==="y"?"height":"width",re=j[k],se=re+g[J],V=re-g[Y],S=c?-A[H]/2:0,$=C===qr?_[H]:A[H],U=C===qr?-A[H]:-_[H],z=r.elements.arrow,F=c&&z?Vo(z):{width:0,height:0},q=r.modifiersData["arrow#persistent"]?r.modifiersData["arrow#persistent"].padding:Ei(),G=q[J],W=q[Y],X=yt(0,_[H],F[H]),K=N?_[H]/2-S-X-G-R.mainAxis:$-X-G-R.mainAxis,Z=N?-_[H]/2+S+X+W+R.mainAxis:U+X+W+R.mainAxis,ue=r.elements.arrow&&Bt(r.elements.arrow),I=ue?k==="y"?ue.clientTop||0:ue.clientLeft||0:0,xe=(B=E==null?void 0:E[k])!=null?B:0,L=re+K-xe-I,ye=re+Z-xe,Ge=yt(c?nn(se,L):se,re,c?xr(V,ye):V);j[k]=Ge,D[k]=Ge-re}if(l){var ur,Se=k==="x"?Ce:je,Lt=k==="x"?Ve:Fe,He=j[w],Or=w==="y"?"height":"width",fr=He+g[Se],Rr=He-g[Lt],_r=[Ce,je].indexOf(x)!==-1,Pr=(ur=E==null?void 0:E[w])!=null?ur:0,mr=_r?fr:He-_[Or]-A[Or]-Pr+R.altAxis,rt=_r?He+_[Or]+A[Or]-Pr-R.altAxis:Rr,Vt=c&&_r?Af(mr,He,rt):yt(c?mr:fr,He,c?rt:Rr);j[w]=Vt,D[w]=Vt-He}r.modifiersData[n]=D}}const fm={name:"preventOverflow",enabled:!0,phase:"main",fn:um,requiresIfExists:["offset"]};function mm(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function hm(e){return e===Me(e)||!Le(e)?zo(e):mm(e)}function gm(e){var r=e.getBoundingClientRect(),t=Wr(r.width)/e.offsetWidth||1,n=Wr(r.height)/e.offsetHeight||1;return t!==1||n!==1}function vm(e,r,t){t===void 0&&(t=!1);var n=Le(r),o=Le(r)&&gm(r),a=dr(r),i=Yr(e,o,t),l={scrollLeft:0,scrollTop:0},p={x:0,y:0};return(n||!n&&!t)&&((Ke(r)!=="body"||Ho(a))&&(l=hm(r)),Le(r)?(p=Yr(r,!0),p.x+=r.clientLeft,p.y+=r.clientTop):a&&(p.x=Go(a))),{x:i.left+l.scrollLeft-p.x,y:i.top+l.scrollTop-p.y,width:i.width,height:i.height}}function bm(e){var r=new Map,t=new Set,n=[];e.forEach(function(a){r.set(a.name,a)});function o(a){t.add(a.name);var i=[].concat(a.requires||[],a.requiresIfExists||[]);i.forEach(function(l){if(!t.has(l)){var p=r.get(l);p&&o(p)}}),n.push(a)}return e.forEach(function(a){t.has(a.name)||o(a)}),n}function wm(e){var r=bm(e);return Rf.reduce(function(t,n){return t.concat(r.filter(function(o){return o.phase===n}))},[])}function ym(e){var r;return function(){return r||(r=new Promise(function(t){Promise.resolve().then(function(){r=void 0,t(e())})})),r}}function xm(e){var r=e.reduce(function(t,n){var o=t[n.name];return t[n.name]=o?Object.assign({},o,n,{options:Object.assign({},o.options,n.options),data:Object.assign({},o.data,n.data)}):n,t},{});return Object.keys(r).map(function(t){return r[t]})}var Za={placement:"bottom",modifiers:[],strategy:"absolute"};function Qa(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];return!r.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function km(e){e===void 0&&(e={});var r=e,t=r.defaultModifiers,n=t===void 0?[]:t,o=r.defaultOptions,a=o===void 0?Za:o;return function(l,p,u){u===void 0&&(u=a);var f={placement:"bottom",orderedModifiers:[],options:Object.assign({},Za,a),modifiersData:{},elements:{reference:l,popper:p},attributes:{},styles:{}},b=[],v=!1,c={state:f,setOptions:function(x){var C=typeof x=="function"?x(f.options):x;d(),f.options=Object.assign({},a,f.options,C),f.scrollParents={reference:jr(l)?xt(l):l.contextElement?xt(l.contextElement):[],popper:xt(p)};var N=wm(xm([].concat(n,f.options.modifiers)));return f.orderedModifiers=N.filter(function(k){return k.enabled}),h(),c.update()},forceUpdate:function(){if(!v){var x=f.elements,C=x.reference,N=x.popper;if(Qa(C,N)){f.rects={reference:vm(C,Bt(N),f.options.strategy==="fixed"),popper:Vo(N)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach(function(R){return f.modifiersData[R.name]=Object.assign({},R.data)});for(var k=0;k<f.orderedModifiers.length;k++){if(f.reset===!0){f.reset=!1,k=-1;continue}var w=f.orderedModifiers[k],j=w.fn,_=w.options,A=_===void 0?{}:_,T=w.name;typeof j=="function"&&(f=j({state:f,options:A,name:T,instance:c})||f)}}}},update:ym(function(){return new Promise(function(g){c.forceUpdate(),g(f)})}),destroy:function(){d(),v=!0}};if(!Qa(l,p))return c;c.setOptions(u).then(function(g){!v&&u.onFirstUpdate&&u.onFirstUpdate(g)});function h(){f.orderedModifiers.forEach(function(g){var x=g.name,C=g.options,N=C===void 0?{}:C,k=g.effect;if(typeof k=="function"){var w=k({state:f,name:x,instance:c,options:N}),j=function(){};b.push(w||j)}})}function d(){b.forEach(function(g){return g()}),b=[]}return c}}var Nm=[Xf,cm,Hf,$f,lm,nm,fm,Vf,am],Em=km({defaultModifiers:Nm});const Oi="Popper";function Sm(e){return wi(Oi,e)}vf(Oi,["root"]);const Tm=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Cm=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function jm(e,r){if(r==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function on(e){return typeof e=="function"?e():e}function En(e){return e.nodeType!==void 0}function Om(e){return!En(e)}const Rm=()=>Co({root:["root"]},pf(Sm)),_m={},Pm=M.forwardRef(function(r,t){var n;const{anchorEl:o,children:a,direction:i,disablePortal:l,modifiers:p,open:u,placement:f,popperOptions:b,popperRef:v,slotProps:c={},slots:h={},TransitionProps:d}=r,g=ke(r,Tm),x=M.useRef(null),C=Tr(x,t),N=M.useRef(null),k=Tr(N,v),w=M.useRef(k);Xr(()=>{w.current=k},[k]),M.useImperativeHandle(v,()=>N.current,[]);const j=jm(f,i),[_,A]=M.useState(j),[T,R]=M.useState(on(o));M.useEffect(()=>{N.current&&N.current.forceUpdate()}),M.useEffect(()=>{o&&R(on(o))},[o]),Xr(()=>{if(!T||!u)return;const Y=se=>{A(se.placement)};if(process.env.NODE_ENV!=="production"&&T&&En(T)&&T.nodeType===1){const se=T.getBoundingClientRect();process.env.NODE_ENV!=="test"&&se.top===0&&se.left===0&&se.right===0&&se.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let H=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:se})=>{Y(se)}}];p!=null&&(H=H.concat(p)),b&&b.modifiers!=null&&(H=H.concat(b.modifiers));const re=Em(T,x.current,P({placement:j},b,{modifiers:H}));return w.current(re),()=>{re.destroy(),w.current(null)}},[T,l,p,u,b,j]);const E={placement:_};d!==null&&(E.TransitionProps=d);const D=Rm(),B=(n=h.root)!=null?n:"div",J=mf({elementType:B,externalSlotProps:c.root,externalForwardedProps:g,additionalProps:{role:"tooltip",ref:C},ownerState:r,className:D.root});return s.jsx(B,P({},J,{children:typeof a=="function"?a(E):a}))}),Ri=M.forwardRef(function(r,t){const{anchorEl:n,children:o,container:a,direction:i="ltr",disablePortal:l=!1,keepMounted:p=!1,modifiers:u,open:f,placement:b="bottom",popperOptions:v=_m,popperRef:c,style:h,transition:d=!1,slotProps:g={},slots:x={}}=r,C=ke(r,Cm),[N,k]=M.useState(!0),w=()=>{k(!1)},j=()=>{k(!0)};if(!p&&!f&&(!d||N))return null;let _;if(a)_=a;else if(n){const R=on(n);_=R&&En(R)?Qt(R).body:Qt(null).body}const A=!f&&p&&(!d||N)?"none":void 0,T=d?{in:f,onEnter:w,onExited:j}:void 0;return s.jsx(tn,{disablePortal:l,container:_,children:s.jsx(Pm,P({anchorEl:n,direction:i,disablePortal:l,modifiers:u,ref:t,open:d?!N:f,placement:b,popperOptions:v,popperRef:c,slotProps:g,slots:x},C,{style:P({position:"fixed",top:0,left:0,display:A},h),TransitionProps:T,children:o}))})});process.env.NODE_ENV!=="production"&&(Ri.propTypes={anchorEl:So(m.oneOfType([Et,m.object,m.func]),e=>{if(e.open){const r=on(e.anchorEl);if(r&&En(r)&&r.nodeType===1){const t=r.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&t.top===0&&t.left===0&&t.right===0&&t.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!r||typeof r.getBoundingClientRect!="function"||Om(r)&&r.contextElement!=null&&r.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:m.oneOfType([m.node,m.func]),container:m.oneOfType([Et,m.func]),direction:m.oneOf(["ltr","rtl"]),disablePortal:m.bool,keepMounted:m.bool,modifiers:m.arrayOf(m.shape({data:m.object,effect:m.func,enabled:m.bool,fn:m.func,name:m.any,options:m.object,phase:m.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:m.arrayOf(m.string),requiresIfExists:m.arrayOf(m.string)})),open:m.bool.isRequired,placement:m.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:m.shape({modifiers:m.array,onFirstUpdate:m.func,placement:m.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:m.oneOf(["absolute","fixed"])}),popperRef:ti,slotProps:m.shape({root:m.oneOfType([m.func,m.object])}),slots:m.shape({root:m.elementType}),transition:m.bool});function _i(){const e=mi(Io);return process.env.NODE_ENV!=="production"&&M.useDebugValue(e),e[Mo]||e}function no(e,r){return no=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,o){return n.__proto__=o,n},no(e,r)}function $m(e,r){e.prototype=Object.create(r.prototype),e.prototype.constructor=e,no(e,r)}const es={disabled:!1};var Im=process.env.NODE_ENV!=="production"?m.oneOfType([m.number,m.shape({enter:m.number,exit:m.number,appear:m.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&m.oneOfType([m.string,m.shape({enter:m.string,exit:m.string,active:m.string}),m.shape({enter:m.string,enterDone:m.string,enterActive:m.string,exit:m.string,exitDone:m.string,exitActive:m.string})]);const Pi=y.createContext(null);var Mm=function(r){return r.scrollTop},gt="unmounted",vr="exited",br="entering",Vr="entered",oo="exiting",nr=function(e){$m(r,e);function r(n,o){var a;a=e.call(this,n,o)||this;var i=o,l=i&&!i.isMounting?n.enter:n.appear,p;return a.appearStatus=null,n.in?l?(p=vr,a.appearStatus=br):p=Vr:n.unmountOnExit||n.mountOnEnter?p=gt:p=vr,a.state={status:p},a.nextCallback=null,a}r.getDerivedStateFromProps=function(o,a){var i=o.in;return i&&a.status===gt?{status:vr}:null};var t=r.prototype;return t.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},t.componentDidUpdate=function(o){var a=null;if(o!==this.props){var i=this.state.status;this.props.in?i!==br&&i!==Vr&&(a=br):(i===br||i===Vr)&&(a=oo)}this.updateStatus(!1,a)},t.componentWillUnmount=function(){this.cancelNextCallback()},t.getTimeouts=function(){var o=this.props.timeout,a,i,l;return a=i=l=o,o!=null&&typeof o!="number"&&(a=o.exit,i=o.enter,l=o.appear!==void 0?o.appear:i),{exit:a,enter:i,appear:l}},t.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===br){if(this.props.unmountOnExit||this.props.mountOnEnter){var i=this.props.nodeRef?this.props.nodeRef.current:ut.findDOMNode(this);i&&Mm(i)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===vr&&this.setState({status:gt})},t.performEnter=function(o){var a=this,i=this.props.enter,l=this.context?this.context.isMounting:o,p=this.props.nodeRef?[l]:[ut.findDOMNode(this),l],u=p[0],f=p[1],b=this.getTimeouts(),v=l?b.appear:b.enter;if(!o&&!i||es.disabled){this.safeSetState({status:Vr},function(){a.props.onEntered(u)});return}this.props.onEnter(u,f),this.safeSetState({status:br},function(){a.props.onEntering(u,f),a.onTransitionEnd(v,function(){a.safeSetState({status:Vr},function(){a.props.onEntered(u,f)})})})},t.performExit=function(){var o=this,a=this.props.exit,i=this.getTimeouts(),l=this.props.nodeRef?void 0:ut.findDOMNode(this);if(!a||es.disabled){this.safeSetState({status:vr},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:oo},function(){o.props.onExiting(l),o.onTransitionEnd(i.exit,function(){o.safeSetState({status:vr},function(){o.props.onExited(l)})})})},t.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},t.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},t.setNextCallback=function(o){var a=this,i=!0;return this.nextCallback=function(l){i&&(i=!1,a.nextCallback=null,o(l))},this.nextCallback.cancel=function(){i=!1},this.nextCallback},t.onTransitionEnd=function(o,a){this.setNextCallback(a);var i=this.props.nodeRef?this.props.nodeRef.current:ut.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!i||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var p=this.props.nodeRef?[this.nextCallback]:[i,this.nextCallback],u=p[0],f=p[1];this.props.addEndListener(u,f)}o!=null&&setTimeout(this.nextCallback,o)},t.render=function(){var o=this.state.status;if(o===gt)return null;var a=this.props,i=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var l=ke(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return y.createElement(Pi.Provider,{value:null},typeof i=="function"?i(o,l):y.cloneElement(y.Children.only(i),l))},r}(y.Component);nr.contextType=Pi;nr.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:m.shape({current:typeof Element>"u"?m.any:function(e,r,t,n,o,a){var i=e[r];return m.instanceOf(i&&"ownerDocument"in i?i.ownerDocument.defaultView.Element:Element)(e,r,t,n,o,a)}}),children:m.oneOfType([m.func.isRequired,m.element.isRequired]).isRequired,in:m.bool,mountOnEnter:m.bool,unmountOnExit:m.bool,appear:m.bool,enter:m.bool,exit:m.bool,timeout:function(r){var t=Im;r.addEndListener||(t=t.isRequired);for(var n=arguments.length,o=new Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=arguments[a];return t.apply(void 0,[r].concat(o))},addEndListener:m.func,onEnter:m.func,onEntering:m.func,onEntered:m.func,onExit:m.func,onExiting:m.func,onExited:m.func}:{};function Br(){}nr.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Br,onEntering:Br,onEntered:Br,onExit:Br,onExiting:Br,onExited:Br};nr.UNMOUNTED=gt;nr.EXITED=vr;nr.ENTERING=br;nr.ENTERED=Vr;nr.EXITING=oo;const Am=nr,Dm=e=>e.scrollTop;function rs(e,r){var t,n;const{timeout:o,easing:a,style:i={}}=e;return{duration:(t=i.transitionDuration)!=null?t:typeof o=="number"?o:o[r.mode]||0,easing:(n=i.transitionTimingFunction)!=null?n:typeof a=="object"?a[r.mode]:a,delay:i.transitionDelay}}const Bm=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function ao(e){return`scale(${e}, ${e**2})`}const Lm={entering:{opacity:1,transform:ao(1)},entered:{opacity:1,transform:"none"}},Fn=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Uo=M.forwardRef(function(r,t){const{addEndListener:n,appear:o=!0,children:a,easing:i,in:l,onEnter:p,onEntered:u,onEntering:f,onExit:b,onExited:v,onExiting:c,style:h,timeout:d="auto",TransitionComponent:g=Am}=r,x=ke(r,Bm),C=mt(),N=M.useRef(),k=_i(),w=M.useRef(null),j=Tr(w,a.ref,t),_=Y=>H=>{if(Y){const re=w.current;H===void 0?Y(re):Y(re,H)}},A=_(f),T=_((Y,H)=>{Dm(Y);const{duration:re,delay:se,easing:V}=rs({style:h,timeout:d,easing:i},{mode:"enter"});let S;d==="auto"?(S=k.transitions.getAutoHeightDuration(Y.clientHeight),N.current=S):S=re,Y.style.transition=[k.transitions.create("opacity",{duration:S,delay:se}),k.transitions.create("transform",{duration:Fn?S:S*.666,delay:se,easing:V})].join(","),p&&p(Y,H)}),R=_(u),E=_(c),D=_(Y=>{const{duration:H,delay:re,easing:se}=rs({style:h,timeout:d,easing:i},{mode:"exit"});let V;d==="auto"?(V=k.transitions.getAutoHeightDuration(Y.clientHeight),N.current=V):V=H,Y.style.transition=[k.transitions.create("opacity",{duration:V,delay:re}),k.transitions.create("transform",{duration:Fn?V:V*.666,delay:Fn?re:re||V*.333,easing:se})].join(","),Y.style.opacity=0,Y.style.transform=ao(.75),b&&b(Y)}),B=_(v),J=Y=>{d==="auto"&&C.start(N.current||0,Y),n&&n(w.current,Y)};return s.jsx(g,P({appear:o,in:l,nodeRef:w,onEnter:T,onEntered:R,onEntering:A,onExit:D,onExited:B,onExiting:E,addEndListener:J,timeout:d==="auto"?null:d},x,{children:(Y,H)=>M.cloneElement(a,P({style:P({opacity:0,transform:ao(.75),visibility:Y==="exited"&&!l?"hidden":void 0},Lm[Y],h,a.props.style),ref:j},H))}))});process.env.NODE_ENV!=="production"&&(Uo.propTypes={addEndListener:m.func,appear:m.bool,children:ei.isRequired,easing:m.oneOfType([m.shape({enter:m.string,exit:m.string}),m.string]),in:m.bool,onEnter:m.func,onEntered:m.func,onEntering:m.func,onExit:m.func,onExited:m.func,onExiting:m.func,style:m.object,timeout:m.oneOfType([m.oneOf(["auto"]),m.number,m.shape({appear:m.number,enter:m.number,exit:m.number})])});Uo.muiSupportAuto=!0;const ts=Uo,Vm=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Fm=At(Ri,{name:"MuiPopper",slot:"Root",overridesResolver:(e,r)=>r.root})({}),$i=M.forwardRef(function(r,t){var n;const o=fi(),a=Ao({props:r,name:"MuiPopper"}),{anchorEl:i,component:l,components:p,componentsProps:u,container:f,disablePortal:b,keepMounted:v,modifiers:c,open:h,placement:d,popperOptions:g,popperRef:x,transition:C,slots:N,slotProps:k}=a,w=ke(a,Vm),j=(n=N==null?void 0:N.root)!=null?n:p==null?void 0:p.Root,_=P({anchorEl:i,container:f,disablePortal:b,keepMounted:v,modifiers:c,open:h,placement:d,popperOptions:g,popperRef:x,transition:C},w);return s.jsx(Fm,P({as:l,direction:o==null?void 0:o.direction,slots:{root:j},slotProps:k??u},_,{ref:t}))});process.env.NODE_ENV!=="production"&&($i.propTypes={anchorEl:m.oneOfType([Et,m.object,m.func]),children:m.oneOfType([m.node,m.func]),component:m.elementType,components:m.shape({Root:m.elementType}),componentsProps:m.shape({root:m.oneOfType([m.func,m.object])}),container:m.oneOfType([Et,m.func]),disablePortal:m.bool,keepMounted:m.bool,modifiers:m.arrayOf(m.shape({data:m.object,effect:m.func,enabled:m.bool,fn:m.func,name:m.any,options:m.object,phase:m.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:m.arrayOf(m.string),requiresIfExists:m.arrayOf(m.string)})),open:m.bool.isRequired,placement:m.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:m.shape({modifiers:m.array,onFirstUpdate:m.func,placement:m.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:m.oneOf(["absolute","fixed"])}),popperRef:ti,slotProps:m.shape({root:m.oneOfType([m.func,m.object])}),slots:m.shape({root:m.elementType}),sx:m.oneOfType([m.arrayOf(m.oneOfType([m.func,m.object,m.bool])),m.func,m.object]),transition:m.bool});const Ii=$i;function zm(e){return fn("MuiTooltip",e)}const Gm=pi("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),pr=Gm,Hm=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Um(e){return Math.round(e*1e5)/1e5}const Xm=e=>{const{classes:r,disableInteractive:t,arrow:n,touch:o,placement:a}=e,i={popper:["popper",!t&&"popperInteractive",n&&"popperArrow"],tooltip:["tooltip",n&&"tooltipArrow",o&&"touch",`tooltipPlacement${Ye(a.split("-")[0])}`],arrow:["arrow"]};return Co(i,zm,r)},qm=At(Ii,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.popper,!t.disableInteractive&&r.popperInteractive,t.arrow&&r.popperArrow,!t.open&&r.popperClose]}})(({theme:e,ownerState:r,open:t})=>P({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!r.disableInteractive&&{pointerEvents:"auto"},!t&&{pointerEvents:"none"},r.arrow&&{[`&[data-popper-placement*="bottom"] .${pr.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${pr.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${pr.arrow}`]:P({},r.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${pr.arrow}`]:P({},r.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Wm=At("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.tooltip,t.touch&&r.touch,t.arrow&&r.tooltipArrow,r[`tooltipPlacement${Ye(t.placement.split("-")[0])}`]]}})(({theme:e,ownerState:r})=>P({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:hi(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},r.arrow&&{position:"relative",margin:0},r.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Um(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${pr.popper}[data-popper-placement*="left"] &`]:P({transformOrigin:"right center"},r.isRtl?P({marginLeft:"14px"},r.touch&&{marginLeft:"24px"}):P({marginRight:"14px"},r.touch&&{marginRight:"24px"})),[`.${pr.popper}[data-popper-placement*="right"] &`]:P({transformOrigin:"left center"},r.isRtl?P({marginRight:"14px"},r.touch&&{marginRight:"24px"}):P({marginLeft:"14px"},r.touch&&{marginLeft:"24px"})),[`.${pr.popper}[data-popper-placement*="top"] &`]:P({transformOrigin:"center bottom",marginBottom:"14px"},r.touch&&{marginBottom:"24px"}),[`.${pr.popper}[data-popper-placement*="bottom"] &`]:P({transformOrigin:"center top",marginTop:"14px"},r.touch&&{marginTop:"24px"})})),Ym=At("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,r)=>r.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:hi(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Xt=!1;const ns=new $t;let ct={x:0,y:0};function qt(e,r){return t=>{r&&r(t),e(t)}}const Mi=M.forwardRef(function(r,t){var n,o,a,i,l,p,u,f,b,v,c,h,d,g,x,C,N,k,w;const j=Ao({props:r,name:"MuiTooltip"}),{arrow:_=!1,children:A,components:T={},componentsProps:R={},describeChild:E=!1,disableFocusListener:D=!1,disableHoverListener:B=!1,disableInteractive:J=!1,disableTouchListener:Y=!1,enterDelay:H=100,enterNextDelay:re=0,enterTouchDelay:se=700,followCursor:V=!1,id:S,leaveDelay:$=0,leaveTouchDelay:U=1500,onClose:z,onOpen:F,open:q,placement:G="bottom",PopperComponent:W,PopperProps:X={},slotProps:K={},slots:Z={},title:ue,TransitionComponent:I=ts,TransitionProps:xe}=j,L=ke(j,Hm),ye=M.isValidElement(A)?A:s.jsx("span",{children:A}),Ge=_i(),ur=Ge.direction==="rtl",[Se,Lt]=M.useState(),[He,Or]=M.useState(null),fr=M.useRef(!1),Rr=J||V,_r=mt(),Pr=mt(),mr=mt(),rt=mt(),[Vt,Yo]=oi({controlled:q,default:!1,name:"Tooltip",state:"open"});let Je=Vt;if(process.env.NODE_ENV!=="production"){const{current:ee}=M.useRef(q!==void 0);M.useEffect(()=>{Se&&Se.disabled&&!ee&&ue!==""&&Se.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ue,Se,ee])}const Sn=ni(S),tt=M.useRef(),Ft=Qn(()=>{tt.current!==void 0&&(document.body.style.WebkitUserSelect=tt.current,tt.current=void 0),rt.clear()});M.useEffect(()=>Ft,[Ft]);const Ko=ee=>{ns.clear(),Xt=!0,Yo(!0),F&&!Je&&F(ee)},zt=Qn(ee=>{ns.start(800+$,()=>{Xt=!1}),Yo(!1),z&&Je&&z(ee),_r.start(Ge.transitions.duration.shortest,()=>{fr.current=!1})}),Tn=ee=>{fr.current&&ee.type!=="touchstart"||(Se&&Se.removeAttribute("title"),Pr.clear(),mr.clear(),H||Xt&&re?Pr.start(Xt?re:H,()=>{Ko(ee)}):Ko(ee))},Jo=ee=>{Pr.clear(),mr.start($,()=>{zt(ee)})},{isFocusVisibleRef:Zo,onBlur:kl,onFocus:Nl,ref:El}=ai(),[,Qo]=M.useState(!1),ea=ee=>{kl(ee),Zo.current===!1&&(Qo(!1),Jo(ee))},ra=ee=>{Se||Lt(ee.currentTarget),Nl(ee),Zo.current===!0&&(Qo(!0),Tn(ee))},ta=ee=>{fr.current=!0;const _e=ye.props;_e.onTouchStart&&_e.onTouchStart(ee)},na=Tn,oa=Jo,Sl=ee=>{ta(ee),mr.clear(),_r.clear(),Ft(),tt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",rt.start(se,()=>{document.body.style.WebkitUserSelect=tt.current,Tn(ee)})},Tl=ee=>{ye.props.onTouchEnd&&ye.props.onTouchEnd(ee),Ft(),mr.start(U,()=>{zt(ee)})};M.useEffect(()=>{if(!Je)return;function ee(_e){(_e.key==="Escape"||_e.key==="Esc")&&zt(_e)}return document.addEventListener("keydown",ee),()=>{document.removeEventListener("keydown",ee)}},[zt,Je]);const Cl=Tr(ye.ref,El,Lt,t);!ue&&ue!==0&&(Je=!1);const Cn=M.useRef(),jl=ee=>{const _e=ye.props;_e.onMouseMove&&_e.onMouseMove(ee),ct={x:ee.clientX,y:ee.clientY},Cn.current&&Cn.current.update()},nt={},jn=typeof ue=="string";E?(nt.title=!Je&&jn&&!B?ue:null,nt["aria-describedby"]=Je?Sn:null):(nt["aria-label"]=jn?ue:null,nt["aria-labelledby"]=Je&&!jn?Sn:null);const Ae=P({},nt,L,ye.props,{className:lr(L.className,ye.props.className),onTouchStart:ta,ref:Cl},V?{onMouseMove:jl}:{});process.env.NODE_ENV!=="production"&&(Ae["data-mui-internal-clone-element"]=!0,M.useEffect(()=>{Se&&!Se.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[Se]));const ot={};Y||(Ae.onTouchStart=Sl,Ae.onTouchEnd=Tl),B||(Ae.onMouseOver=qt(na,Ae.onMouseOver),Ae.onMouseLeave=qt(oa,Ae.onMouseLeave),Rr||(ot.onMouseOver=na,ot.onMouseLeave=oa)),D||(Ae.onFocus=qt(ra,Ae.onFocus),Ae.onBlur=qt(ea,Ae.onBlur),Rr||(ot.onFocus=ra,ot.onBlur=ea)),process.env.NODE_ENV!=="production"&&ye.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ye.props.title}\` or the Tooltip component.`].join(`
`));const Ol=M.useMemo(()=>{var ee;let _e=[{name:"arrow",enabled:!!He,options:{element:He,padding:4}}];return(ee=X.popperOptions)!=null&&ee.modifiers&&(_e=_e.concat(X.popperOptions.modifiers)),P({},X.popperOptions,{modifiers:_e})},[He,X]),at=P({},j,{isRtl:ur,arrow:_,disableInteractive:Rr,placement:G,PopperComponentProp:W,touch:fr.current}),On=Xm(at),aa=(n=(o=Z.popper)!=null?o:T.Popper)!=null?n:qm,sa=(a=(i=(l=Z.transition)!=null?l:T.Transition)!=null?i:I)!=null?a:ts,ia=(p=(u=Z.tooltip)!=null?u:T.Tooltip)!=null?p:Wm,la=(f=(b=Z.arrow)!=null?b:T.Arrow)!=null?f:Ym,Rl=ht(aa,P({},X,(v=K.popper)!=null?v:R.popper,{className:lr(On.popper,X==null?void 0:X.className,(c=(h=K.popper)!=null?h:R.popper)==null?void 0:c.className)}),at),_l=ht(sa,P({},xe,(d=K.transition)!=null?d:R.transition),at),Pl=ht(ia,P({},(g=K.tooltip)!=null?g:R.tooltip,{className:lr(On.tooltip,(x=(C=K.tooltip)!=null?C:R.tooltip)==null?void 0:x.className)}),at),$l=ht(la,P({},(N=K.arrow)!=null?N:R.arrow,{className:lr(On.arrow,(k=(w=K.arrow)!=null?w:R.arrow)==null?void 0:k.className)}),at);return s.jsxs(M.Fragment,{children:[M.cloneElement(ye,Ae),s.jsx(aa,P({as:W??Ii,placement:G,anchorEl:V?{getBoundingClientRect:()=>({top:ct.y,left:ct.x,right:ct.x,bottom:ct.y,width:0,height:0})}:Se,popperRef:Cn,open:Se?Je:!1,id:Sn,transition:!0},ot,Rl,{popperOptions:Ol,children:({TransitionProps:ee})=>s.jsx(sa,P({timeout:Ge.transitions.duration.shorter},ee,_l,{children:s.jsxs(ia,P({},Pl,{children:[ue,_?s.jsx(la,P({},$l,{ref:Or})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Mi.propTypes={arrow:m.bool,children:ei.isRequired,classes:m.object,className:m.string,components:m.shape({Arrow:m.elementType,Popper:m.elementType,Tooltip:m.elementType,Transition:m.elementType}),componentsProps:m.shape({arrow:m.object,popper:m.object,tooltip:m.object,transition:m.object}),describeChild:m.bool,disableFocusListener:m.bool,disableHoverListener:m.bool,disableInteractive:m.bool,disableTouchListener:m.bool,enterDelay:m.number,enterNextDelay:m.number,enterTouchDelay:m.number,followCursor:m.bool,id:m.string,leaveDelay:m.number,leaveTouchDelay:m.number,onClose:m.func,onOpen:m.func,open:m.bool,placement:m.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:m.elementType,PopperProps:m.object,slotProps:m.shape({arrow:m.object,popper:m.object,tooltip:m.object,transition:m.object}),slots:m.shape({arrow:m.elementType,popper:m.elementType,tooltip:m.elementType,transition:m.elementType}),sx:m.oneOfType([m.arrayOf(m.oneOfType([m.func,m.object,m.bool])),m.func,m.object]),title:m.node,TransitionComponent:m.elementType,TransitionProps:m.object});const Km=Mi;function os(e,r,t){return e?s.jsx(Ie.ListItemIcon,{className:`papi-menu-icon-${t?"leading":"trailing"}`,children:s.jsx("img",{src:e,alt:`${t?"Leading":"Trailing"} icon for ${r}`})}):void 0}function Xo(e){const{onClick:r,label:t,tooltip:n,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:i=void 0,hasAutoFocus:l=!1,className:p,isDisabled:u=!1,isDense:f=!0,isSubMenuParent:b=!1,hasDisabledGutters:v=!1,hasDivider:c=!1,focusVisibleClassName:h,id:d,children:g}=e,x=s.jsx(Ie.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:p,disabled:u,dense:f,disableGutters:v,divider:c,focusVisibleClassName:h,onClick:r,id:d,children:t?s.jsxs(s.Fragment,{children:[os(a,t,!0),s.jsx(Ie.ListItemText,{primary:t,inset:!a&&o}),b?s.jsx(Ie.ListItemIcon,{className:"papi-menu-icon-trailing",children:s.jsx(vi,{})}):os(i,t,!1)]}):g});return n?s.jsx(Km,{title:n,placement:"right",children:s.jsx("div",{children:x})}):x}function Ai(e){return Object.entries(e.groups).map(([t,n])=>({id:t,group:n}))}function Jm(e){const[r,t]=y.useState(void 0),{parentMenuItem:n,parentItemProps:o,menuDefinition:a}=e,i=u=>{t(u.currentTarget)},l=()=>{t(void 0)},p=()=>{let u=Ai(a).filter(f=>"menuItem"in f.group);if(!(n!=null&&n.id))throw new Error("A valid parent menu item is required for submenus.");return u=u.filter(f=>"menuItem"in f.group&&f.group.menuItem===n.id),s.jsx(Di,{...e,includedGroups:u})};return s.jsxs(s.Fragment,{children:[s.jsx(Xo,{onClick:i,...o,isSubMenuParent:!0}),s.jsx(Ie.Menu,{anchorEl:r,open:!!r,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:p()},n.id)]})}const Zm=(e,r)=>r.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function Di(e){const{menuDefinition:r,onClick:t,commandHandler:n,includedGroups:o}=e,{items:a,allowForLeadingIcons:i}=y.useMemo(()=>{const f=o&&o.length>0?o:Ai(r).filter(h=>!("menuItem"in h.group)),b=Object.values(f).sort((h,d)=>(h.group.order||0)-(d.group.order||0)),v=[];b.forEach(h=>{Zm(h.id,r.items).forEach(d=>v.push({item:d,isLastItemInGroup:!1})),v.length>0&&(v[v.length-1].isLastItemInGroup=!0)}),v.length>0&&(v[v.length-1].isLastItemInGroup=!1);const c=v.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:v,allowForLeadingIcons:c}},[o,r]),l=({item:f,isLastItemInGroup:b})=>({className:"papi-menu-item",label:f.label,tooltip:f.tooltip,iconPathBefore:"iconPathBefore"in f?f.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in f?f.iconPathAfter:void 0,hasDivider:b,allowForLeadingIcons:i}),[p]=a;if(!p)return s.jsx("div",{});const u=p.item.group;return s.jsx("div",{role:"menu","aria-label":u,children:a.map((f,b)=>{const{item:v}=f,c=l(f);if("command"in v){const h=v.group+b;return s.jsx(Xo,{onClick:d=>{t==null||t(d),n(v)},...c},h)}return s.jsx(Jm,{parentMenuItem:v,parentItemProps:c,...e},u+v.id)})},u)}function Qm(e){const{menuDefinition:r,columnId:t}=e;let a=Object.entries(r.groups).map(([i,l])=>({id:i,group:l})).filter(i=>"column"in i.group);return t&&"columns"in r&&r.columns[t]&&(a=a.filter(i=>"column"in i.group&&i.group.column===t)),s.jsx(Di,{...e,includedGroups:a})}function eh({commandHandler:e,menuDefinition:r,id:t,metadata:n,onClick:o,className:a}){return s.jsxs(Ie.Grid,{id:t,item:!0,xs:"auto",role:"menu","aria-label":t,className:`papi-menu-column ${a??""}`,children:[s.jsx("h3",{"aria-label":n.label,className:`papi-menu-column-header ${a??""}`,children:n.label}),s.jsx(Ie.List,{id:t,dense:!0,className:a??"",children:s.jsx(Qm,{commandHandler:e,menuDefinition:r,columnId:t,onClick:o})})]})}function Bi({commandHandler:e,className:r,multiColumnMenu:t,id:n}){const{columns:o}=t,a=y.useMemo(()=>{const i=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const p=l,u=o[p];typeof u=="object"&&typeof u.order=="number"&&!Number.isNaN(u.order)?i.set(u.order,{id:p,metadata:u}):console.warn(`Property ${l} (${typeof u}) on menu ${n} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(i.values()).sort((l,p)=>(l.metadata.order||0)-(p.metadata.order||0))},[o,n]);return s.jsx(Ie.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${r??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:n,children:a.map((i,l)=>s.jsx(eh,{commandHandler:e,menuDefinition:t,...i,className:r},l))})}function rh(e){return{preserveValue:!0,...e}}const an=(e,r,t={})=>{const n=y.useRef(r);n.current=r;const o=y.useRef(t);o.current=rh(o.current);const[a,i]=y.useState(()=>n.current),[l,p]=y.useState(!0);return y.useEffect(()=>{let u=!0;return p(!!e),(async()=>{if(e){const f=await e();u&&(i(()=>f),p(!1))}})(),()=>{u=!1,o.current.preserveValue||i(()=>n.current)}},[e]),[a,l]},th=gi(s.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Li({menuProvider:e,normalMenu:r,fullMenu:t,commandHandler:n,containerRef:o,className:a,ariaLabelPrefix:i,children:l}){const[p,u]=y.useState(!1),[f,b]=y.useState(!1),v=y.useCallback(()=>{p&&u(!1),b(!1)},[p]),c=y.useCallback(k=>{k.stopPropagation(),u(w=>{const j=!w;return j&&k.shiftKey?b(!0):j||b(!1),j})},[]),h=y.useCallback(k=>(v(),n(k)),[n,v]),[d,g]=y.useState({top:1,left:1});y.useEffect(()=>{if(p){const k=o==null?void 0:o.current;if(k){const w=k.getBoundingClientRect(),j=window.scrollY,_=window.scrollX,A=w.top+j+k.clientHeight,T=w.left+_;g({top:A,left:T})}}},[p,o]);const[x]=an(y.useCallback(async()=>(e==null?void 0:e(!1))??r,[e,r,p]),r),[C]=an(y.useCallback(async()=>(e==null?void 0:e(!0))??t??x,[e,t,x,p]),t??x),N=f&&C?C:x;return s.jsxs(s.Fragment,{children:[s.jsx(Ie.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${i??""} menu button`,onClick:c,children:l??s.jsx(th,{})}),s.jsx(Ie.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:p,onClose:v,PaperProps:{className:"papi-menu-drawer-paper",style:{top:d.top,left:d.left}},children:N?s.jsx(Bi,{className:a,id:`${i??""} main menu`,commandHandler:h,multiColumnMenu:N}):void 0})]})}function nh({id:e,label:r,isDisabled:t=!1,tooltip:n,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:i="medium",className:l,onClick:p,children:u}){return s.jsx(Ie.IconButton,{id:e,disabled:t,edge:a,size:i,"aria-label":r,title:o?void 0:n??r,className:`papi-icon-button ${l??""}`,onClick:p,children:u})}const et=y.forwardRef(({className:e,...r},t)=>s.jsx(te.LoaderCircle,{size:35,className:O("pr-animate-spin",e),...r,ref:t}));et.displayName="Spinner";function oh({id:e,isDisabled:r=!1,hasError:t=!1,isFullWidth:n=!1,helperText:o,label:a,placeholder:i,isRequired:l=!1,className:p,defaultValue:u,value:f,onChange:b,onFocus:v,onBlur:c}){return s.jsxs("div",{className:O("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":n}),children:[s.jsx(Xe,{htmlFor:e,className:O({"pr-text-red-600":t,"pr-hidden":!a}),children:`${a}${l?"*":""}`}),s.jsx(Jr,{id:e,disabled:r,placeholder:i,required:l,className:O(p,{"pr-border-red-600":t}),defaultValue:u,value:f,onChange:b,onFocus:v,onBlur:c}),s.jsx("p",{className:O({"pr-hidden":!o}),children:o})]})}function ah({menuProvider:e,commandHandler:r,className:t,id:n,children:o}){const a=y.useRef(void 0);return s.jsx("div",{ref:a,style:{position:"relative"},children:s.jsx(Ie.AppBar,{position:"static",id:n,children:s.jsxs(Ie.Toolbar,{className:O("pr-bg-muted pr-text-muted-foreground",t),variant:"dense",children:[e?s.jsx(Li,{commandHandler:r,containerRef:a,menuProvider:e}):void 0,o?s.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const sh=sn.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),Vi=y.forwardRef(({className:e,variant:r,...t},n)=>s.jsx("div",{ref:n,role:"alert",className:O(sh({variant:r}),e),...t}));Vi.displayName="Alert";const Fi=y.forwardRef(({className:e,...r},t)=>s.jsxs("h5",{ref:t,className:O("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...r,children:[r.children," "]}));Fi.displayName="AlertTitle";const zi=y.forwardRef(({className:e,...r},t)=>s.jsx("div",{ref:t,className:O("pr-text-sm [&_p]:pr-leading-relaxed",e),...r}));zi.displayName="AlertDescription";const Gi=y.forwardRef(({className:e,...r},t)=>s.jsx("div",{ref:t,className:O("pr-twp pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...r}));Gi.displayName="Card";const Hi=y.forwardRef(({className:e,...r},t)=>s.jsx("div",{ref:t,className:O("pr-twp pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...r}));Hi.displayName="CardHeader";const Ui=y.forwardRef(({className:e,...r},t)=>s.jsx("h3",{ref:t,className:O("pr-twp pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...r,children:r.children}));Ui.displayName="CardTitle";const Xi=y.forwardRef(({className:e,...r},t)=>s.jsx("p",{ref:t,className:O("pr-twp pr-text-sm pr-text-muted-foreground",e),...r}));Xi.displayName="CardDescription";const qi=y.forwardRef(({className:e,...r},t)=>s.jsx("div",{ref:t,className:O("pr-twp pr-p-6 pr-pt-0",e),...r}));qi.displayName="CardContent";const Wi=y.forwardRef(({className:e,...r},t)=>s.jsx("div",{ref:t,className:O("pr-twp pr-flex pr-items-center pr-p-6 pr-pt-0",e),...r}));Wi.displayName="CardFooter";function ih({...e}){return s.jsx(fs.Toaster,{className:"pr-toaster pr-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const Yi=y.forwardRef(({className:e,...r},t)=>s.jsxs(ft.Root,{ref:t,className:O("pr-twp pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...r,children:[s.jsx(ft.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:s.jsx(ft.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),s.jsx(ft.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));Yi.displayName=ft.Root.displayName;const Ki=y.forwardRef(({className:e,...r},t)=>s.jsx(Yn.Root,{className:O("pr-peer pr-twp pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...r,ref:t,children:s.jsx(Yn.Thumb,{className:O("pr-twp pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));Ki.displayName=Yn.Root.displayName;const lh=Re.Root,Ji=y.forwardRef(({className:e,...r},t)=>s.jsx(Re.List,{ref:t,className:O("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...r}));Ji.displayName=Re.List.displayName;const Zi=y.forwardRef(({className:e,...r},t)=>s.jsx(Re.Trigger,{ref:t,className:O("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...r}));Zi.displayName=Re.Trigger.displayName;const Qi=y.forwardRef(({className:e,...r},t)=>s.jsx(Re.Content,{ref:t,className:O("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...r}));Qi.displayName=Re.Content.displayName;function ph({isInstalling:e,handleClick:r,buttonText:t,className:n,...o}){return s.jsx(be,{className:O("pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e,"pr-bg-blue-600":!e,"pr-bg-white pr-text-blue-600 hover:pr-text-white":!t,"pr-w-20":t},n),onClick:r,...o,children:e?s.jsx(et,{size:15}):s.jsxs(s.Fragment,{children:[s.jsx(te.Download,{size:25,className:O("pr-h-4 pr-w-4",{"pr-mr-1":t})}),t]})})}function ch({isEnabling:e,handleClick:r,className:t,...n}){return s.jsx(be,{className:O("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e},t),onClick:r,...n,children:e?s.jsxs(s.Fragment,{children:[s.jsx(et,{size:15,className:"pr-mr-1 pr-text-white"}),"Enabling..."]}):"Enable"})}function dh({isDisabling:e,handleClick:r,className:t,...n}){return s.jsx(be,{className:O("pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-gray-400",{"pr-cursor-not-allowed pr-bg-gray-400":e},t),onClick:r,...n,children:e?s.jsxs(s.Fragment,{children:[s.jsx(et,{size:15,className:"pr-mr-1 pr-text-black"}),"Disabling..."]}):"Disable"})}function uh({isUpdating:e,handleClick:r,className:t,...n}){return s.jsx(be,{className:O("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700 hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e},t),onClick:r,...n,children:e?s.jsxs(s.Fragment,{children:[s.jsx(et,{size:15,className:"pr-mr-1 pr-text-white"}),"Updating..."]}):"Update"})}function yr(){return yr=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},yr.apply(this,arguments)}const fh=["children","options"],as=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,r)=>(e[r.toLowerCase()]=r,e),{for:"htmlFor"}),ss={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},mh=["style","script"],hh=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,gh=/mailto:/i,vh=/\n{2,}$/,el=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,bh=/^ *> ?/gm,wh=/^ {2,}\n/,yh=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,rl=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,tl=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,xh=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,kh=/^(?:\n *)*\n/,Nh=/\r\n?/g,Eh=/^\[\^([^\]]+)](:.*)\n/,Sh=/^\[\^([^\]]+)]/,Th=/\f/g,Ch=/^\s*?\[(x|\s)\]/,nl=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,ol=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,al=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,so=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,jh=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,sl=/^<!--[\s\S]*?(?:-->)/,Oh=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,io=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,Rh=/^\{.*\}$/,_h=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,Ph=/^<([^ >]+@[^ >]+)>/,$h=/^<([^ >]+:\/[^ >]+)>/,Ih=/-([a-z])?/gi,il=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,Mh=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,Ah=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,Dh=/^\[([^\]]*)\] ?\[([^\]]*)\]/,Bh=/(\[|\])/g,Lh=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,Vh=/\t/g,Fh=/^ *\| */,zh=/(^ *\||\| *$)/g,Gh=/ *$/,Hh=/^ *:-+: *$/,Uh=/^ *:-+ *$/,Xh=/^ *-+: *$/,qh=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,Wh=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,Yh=/^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,Kh=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,Jh=/^\\([^0-9A-Za-z\s])/,Zh=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,Qh=/^\n+/,eg=/^([ \t]*)/,rg=/\\([^\\])/g,is=/ *\n+$/,tg=/(?:^|\n)( *)$/,qo="(?:\\d+\\.)",Wo="(?:[*+-])";function ll(e){return"( *)("+(e===1?qo:Wo)+") +"}const pl=ll(1),cl=ll(2);function dl(e){return new RegExp("^"+(e===1?pl:cl))}const ng=dl(1),og=dl(2);function ul(e){return new RegExp("^"+(e===1?pl:cl)+"[^\\n]*(?:\\n(?!\\1"+(e===1?qo:Wo)+" )[^\\n]*)*(\\n|$)","gm")}const fl=ul(1),ml=ul(2);function hl(e){const r=e===1?qo:Wo;return new RegExp("^( *)("+r+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+r+" (?!"+r+" ))\\n*|\\s*\\n*$)")}const gl=hl(1),vl=hl(2);function ls(e,r){const t=r===1,n=t?gl:vl,o=t?fl:ml,a=t?ng:og;return{t(i,l,p){const u=tg.exec(p);return u&&(l.o||!l._&&!l.u)?n.exec(i=u[1]+i):null},i:oe.HIGH,l(i,l,p){const u=t?+i[2]:void 0,f=i[0].replace(vh,`
`).match(o);let b=!1;return{p:f.map(function(v,c){const h=a.exec(v)[0].length,d=new RegExp("^ {1,"+h+"}","gm"),g=v.replace(d,"").replace(a,""),x=c===f.length-1,C=g.indexOf(`

`)!==-1||x&&b;b=C;const N=p._,k=p.o;let w;p.o=!0,C?(p._=!1,w=g.replace(is,`

`)):(p._=!0,w=g.replace(is,""));const j=l(w,p);return p._=N,p.o=k,j}),m:t,g:u}},h:(i,l,p)=>e(i.m?"ol":"ul",{key:p.k,start:i.g},i.p.map(function(u,f){return e("li",{key:f},l(u,p))}))}}const ag=/^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,sg=/^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,bl=[el,rl,tl,nl,al,ol,sl,il,fl,gl,ml,vl],ig=[...bl,/^[^\n]+(?:  \n|\n{2,})/,so,io];function lg(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function pg(e){return Xh.test(e)?"right":Hh.test(e)?"center":Uh.test(e)?"left":null}function ps(e,r,t){const n=t.$;t.$=!0;const o=r(e.trim(),t);t.$=n;let a=[[]];return o.forEach(function(i,l){i.type==="tableSeparator"?l!==0&&l!==o.length-1&&a.push([]):(i.type!=="text"||o[l+1]!=null&&o[l+1].type!=="tableSeparator"||(i.v=i.v.replace(Gh,"")),a[a.length-1].push(i))}),a}function cg(e,r,t){t._=!0;const n=ps(e[1],r,t),o=e[2].replace(zh,"").split("|").map(pg),a=function(i,l,p){return i.trim().split(`
`).map(function(u){return ps(u,l,p)})}(e[3],r,t);return t._=!1,{S:o,A:a,L:n,type:"table"}}function cs(e,r){return e.S[r]==null?{}:{textAlign:e.S[r]}}function ar(e){return function(r,t){return t._?e.exec(r):null}}function sr(e){return function(r,t){return t._||t.u?e.exec(r):null}}function Ze(e){return function(r,t){return t._||t.u?null:e.exec(r)}}function dt(e){return function(r){return e.exec(r)}}function dg(e,r,t){if(r._||r.u||t&&!t.endsWith(`
`))return null;let n="";e.split(`
`).every(a=>!bl.some(i=>i.test(a))&&(n+=a+`
`,a.trim()));const o=n.trimEnd();return o==""?null:[n,o]}function Lr(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch{return null}return e}function ds(e){return e.replace(rg,"$1")}function Jt(e,r,t){const n=t._||!1,o=t.u||!1;t._=!0,t.u=!0;const a=e(r,t);return t._=n,t.u=o,a}function ug(e,r,t){const n=t._||!1,o=t.u||!1;t._=!1,t.u=!0;const a=e(r,t);return t._=n,t.u=o,a}function fg(e,r,t){return t._=!1,e(r,t)}const zn=(e,r,t)=>({v:Jt(r,e[1],t)});function Gn(){return{}}function Hn(){return null}function mg(...e){return e.filter(Boolean).join(" ")}function Un(e,r,t){let n=e;const o=r.split(".");for(;o.length&&(n=n[o[0]],n!==void 0);)o.shift();return n||t}var oe;function hg(e,r={}){r.overrides=r.overrides||{},r.slugify=r.slugify||lg,r.namedCodesToUnicode=r.namedCodesToUnicode?yr({},ss,r.namedCodesToUnicode):ss;const t=r.createElement||M.createElement;function n(c,h,...d){const g=Un(r.overrides,`${c}.props`,{});return t(function(x,C){const N=Un(C,x);return N?typeof N=="function"||typeof N=="object"&&"render"in N?N:Un(C,`${x}.component`,x):x}(c,r.overrides),yr({},h,g,{className:mg(h==null?void 0:h.className,g.className)||void 0}),...d)}function o(c){let h=!1;r.forceInline?h=!0:r.forceBlock||(h=Lh.test(c)===!1);const d=f(u(h?c:`${c.trimEnd().replace(Qh,"")}

`,{_:h}));for(;typeof d[d.length-1]=="string"&&!d[d.length-1].trim();)d.pop();if(r.wrapper===null)return d;const g=r.wrapper||(h?"span":"div");let x;if(d.length>1||r.forceWrapper)x=d;else{if(d.length===1)return x=d[0],typeof x=="string"?n("span",{key:"outer"},x):x;x=null}return M.createElement(g,{key:"outer"},x)}function a(c){const h=c.match(hh);return h?h.reduce(function(d,g,x){const C=g.indexOf("=");if(C!==-1){const N=function(_){return _.indexOf("-")!==-1&&_.match(Oh)===null&&(_=_.replace(Ih,function(A,T){return T.toUpperCase()})),_}(g.slice(0,C)).trim(),k=function(_){const A=_[0];return(A==='"'||A==="'")&&_.length>=2&&_[_.length-1]===A?_.slice(1,-1):_}(g.slice(C+1).trim()),w=as[N]||N,j=d[w]=function(_,A){return _==="style"?A.split(/;\s?/).reduce(function(T,R){const E=R.slice(0,R.indexOf(":"));return T[E.replace(/(-[a-z])/g,D=>D[1].toUpperCase())]=R.slice(E.length+1).trim(),T},{}):_==="href"?Lr(A):(A.match(Rh)&&(A=A.slice(1,A.length-1)),A==="true"||A!=="false"&&A)}(N,k);typeof j=="string"&&(so.test(j)||io.test(j))&&(d[w]=M.cloneElement(o(j.trim()),{key:x}))}else g!=="style"&&(d[as[g]||g]=!0);return d},{}):null}const i=[],l={},p={blockQuote:{t:Ze(el),i:oe.HIGH,l:(c,h,d)=>({v:h(c[0].replace(bh,""),d)}),h:(c,h,d)=>n("blockquote",{key:d.k},h(c.v,d))},breakLine:{t:dt(wh),i:oe.HIGH,l:Gn,h:(c,h,d)=>n("br",{key:d.k})},breakThematic:{t:Ze(yh),i:oe.HIGH,l:Gn,h:(c,h,d)=>n("hr",{key:d.k})},codeBlock:{t:Ze(tl),i:oe.MAX,l:c=>({v:c[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),M:void 0}),h:(c,h,d)=>n("pre",{key:d.k},n("code",yr({},c.O,{className:c.M?`lang-${c.M}`:""}),c.v))},codeFenced:{t:Ze(rl),i:oe.MAX,l:c=>({O:a(c[3]||""),v:c[4],M:c[2]||void 0,type:"codeBlock"})},codeInline:{t:sr(xh),i:oe.LOW,l:c=>({v:c[2]}),h:(c,h,d)=>n("code",{key:d.k},c.v)},footnote:{t:Ze(Eh),i:oe.MAX,l:c=>(i.push({I:c[2],j:c[1]}),{}),h:Hn},footnoteReference:{t:ar(Sh),i:oe.HIGH,l:c=>({v:c[1],B:`#${r.slugify(c[1])}`}),h:(c,h,d)=>n("a",{key:d.k,href:Lr(c.B)},n("sup",{key:d.k},c.v))},gfmTask:{t:ar(Ch),i:oe.HIGH,l:c=>({R:c[1].toLowerCase()==="x"}),h:(c,h,d)=>n("input",{checked:c.R,key:d.k,readOnly:!0,type:"checkbox"})},heading:{t:Ze(r.enforceAtxHeadings?ol:nl),i:oe.HIGH,l:(c,h,d)=>({v:Jt(h,c[2],d),T:r.slugify(c[2]),C:c[1].length}),h:(c,h,d)=>n(`h${c.C}`,{id:c.T,key:d.k},h(c.v,d))},headingSetext:{t:Ze(al),i:oe.MAX,l:(c,h,d)=>({v:Jt(h,c[1],d),C:c[2]==="="?1:2,type:"heading"})},htmlComment:{t:dt(sl),i:oe.HIGH,l:()=>({}),h:Hn},image:{t:sr(sg),i:oe.HIGH,l:c=>({D:c[1],B:ds(c[2]),F:c[3]}),h:(c,h,d)=>n("img",{key:d.k,alt:c.D||void 0,title:c.F||void 0,src:Lr(c.B)})},link:{t:ar(ag),i:oe.LOW,l:(c,h,d)=>({v:ug(h,c[1],d),B:ds(c[2]),F:c[3]}),h:(c,h,d)=>n("a",{key:d.k,href:Lr(c.B),title:c.F},h(c.v,d))},linkAngleBraceStyleDetector:{t:ar($h),i:oe.MAX,l:c=>({v:[{v:c[1],type:"text"}],B:c[1],type:"link"})},linkBareUrlDetector:{t:(c,h)=>h.N?null:ar(_h)(c,h),i:oe.MAX,l:c=>({v:[{v:c[1],type:"text"}],B:c[1],F:void 0,type:"link"})},linkMailtoDetector:{t:ar(Ph),i:oe.MAX,l(c){let h=c[1],d=c[1];return gh.test(d)||(d="mailto:"+d),{v:[{v:h.replace("mailto:",""),type:"text"}],B:d,type:"link"}}},orderedList:ls(n,1),unorderedList:ls(n,2),newlineCoalescer:{t:Ze(kh),i:oe.LOW,l:Gn,h:()=>`
`},paragraph:{t:dg,i:oe.LOW,l:zn,h:(c,h,d)=>n("p",{key:d.k},h(c.v,d))},ref:{t:ar(Mh),i:oe.MAX,l:c=>(l[c[1]]={B:c[2],F:c[4]},{}),h:Hn},refImage:{t:sr(Ah),i:oe.MAX,l:c=>({D:c[1]||void 0,P:c[2]}),h:(c,h,d)=>n("img",{key:d.k,alt:c.D,src:Lr(l[c.P].B),title:l[c.P].F})},refLink:{t:ar(Dh),i:oe.MAX,l:(c,h,d)=>({v:h(c[1],d),Z:h(c[0].replace(Bh,"\\$1"),d),P:c[2]}),h:(c,h,d)=>l[c.P]?n("a",{key:d.k,href:Lr(l[c.P].B),title:l[c.P].F},h(c.v,d)):n("span",{key:d.k},h(c.Z,d))},table:{t:Ze(il),i:oe.HIGH,l:cg,h:(c,h,d)=>n("table",{key:d.k},n("thead",null,n("tr",null,c.L.map(function(g,x){return n("th",{key:x,style:cs(c,x)},h(g,d))}))),n("tbody",null,c.A.map(function(g,x){return n("tr",{key:x},g.map(function(C,N){return n("td",{key:N,style:cs(c,N)},h(C,d))}))})))},tableSeparator:{t:function(c,h){return h.$?(h._=!0,Fh.exec(c)):null},i:oe.HIGH,l:function(){return{type:"tableSeparator"}},h:()=>" | "},text:{t:dt(Zh),i:oe.MIN,l:c=>({v:c[0].replace(jh,(h,d)=>r.namedCodesToUnicode[d]?r.namedCodesToUnicode[d]:h)}),h:c=>c.v},textBolded:{t:sr(qh),i:oe.MED,l:(c,h,d)=>({v:h(c[2],d)}),h:(c,h,d)=>n("strong",{key:d.k},h(c.v,d))},textEmphasized:{t:sr(Wh),i:oe.LOW,l:(c,h,d)=>({v:h(c[2],d)}),h:(c,h,d)=>n("em",{key:d.k},h(c.v,d))},textEscaped:{t:sr(Jh),i:oe.HIGH,l:c=>({v:c[1],type:"text"})},textMarked:{t:sr(Yh),i:oe.LOW,l:zn,h:(c,h,d)=>n("mark",{key:d.k},h(c.v,d))},textStrikethroughed:{t:sr(Kh),i:oe.LOW,l:zn,h:(c,h,d)=>n("del",{key:d.k},h(c.v,d))}};r.disableParsingRawHTML!==!0&&(p.htmlBlock={t:dt(so),i:oe.HIGH,l(c,h,d){const[,g]=c[3].match(eg),x=new RegExp(`^${g}`,"gm"),C=c[3].replace(x,""),N=(k=C,ig.some(A=>A.test(k))?fg:Jt);var k;const w=c[1].toLowerCase(),j=mh.indexOf(w)!==-1;d.N=d.N||w==="a";const _=j?c[3]:N(h,C,d);return d.N=!1,{O:a(c[2]),v:_,G:j,H:j?w:c[1]}},h:(c,h,d)=>n(c.H,yr({key:d.k},c.O),c.G?c.v:h(c.v,d))},p.htmlSelfClosing={t:dt(io),i:oe.HIGH,l:c=>({O:a(c[2]||""),H:c[1]}),h:(c,h,d)=>n(c.H,yr({},c.O,{key:d.k}))});const u=function(c){let h=Object.keys(c);function d(g,x){let C=[],N="";for(;g;){let k=0;for(;k<h.length;){const w=h[k],j=c[w],_=j.t(g,x,N);if(_){const A=_[0];g=g.substring(A.length);const T=j.l(_,d,x);T.type==null&&(T.type=w),C.push(T),N=A;break}k++}}return C}return h.sort(function(g,x){let C=c[g].i,N=c[x].i;return C!==N?C-N:g<x?-1:1}),function(g,x){return d(function(C){return C.replace(Nh,`
`).replace(Th,"").replace(Vh,"    ")}(g),x)}}(p),f=(b=function(c){return function(h,d,g){return c[h.type].h(h,d,g)}}(p),function c(h,d={}){if(Array.isArray(h)){const g=d.k,x=[];let C=!1;for(let N=0;N<h.length;N++){d.k=N;const k=c(h[N],d),w=typeof k=="string";w&&C?x[x.length-1]+=k:k!==null&&x.push(k),C=w}return d.k=g,x}return b(h,c,d)});var b;const v=o(e);return i.length?n("div",null,v,n("footer",{key:"footer"},i.map(function(c){return n("div",{id:r.slugify(c.j),key:c.j},c.j,f(u(c.I,{_:!0})))}))):v}(function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"})(oe||(oe={}));const gg=e=>{let{children:r,options:t}=e,n=function(o,a){if(o==null)return{};var i,l,p={},u=Object.keys(o);for(l=0;l<u.length;l++)a.indexOf(i=u[l])>=0||(p[i]=o[i]);return p}(e,fh);return M.cloneElement(hg(r,t),n)};function vg({id:e,markdown:r}){return s.jsx("div",{id:e,className:"pr-prose",children:s.jsx(gg,{children:r})})}const wl=y.forwardRef((e,r)=>s.jsxs(be,{ref:r,className:"pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600",...e,children:[s.jsx(te.Filter,{size:16,className:"pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"}),"Filter",s.jsx(te.ChevronDown,{size:16,className:"pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"})]}));var yl=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(yl||{});function bg({id:e,groups:r}){return s.jsx("div",{id:e,children:s.jsxs(pn,{children:[s.jsx(uo,{asChild:!0,children:s.jsx(wl,{})}),s.jsx(jt,{children:r.map(t=>s.jsxs("div",{children:[s.jsx(Qr,{children:t.label}),s.jsx(Ns,{children:t.items.map(n=>s.jsx("div",{children:n.itemType===0?s.jsx(cn,{onClick:n.onClick,children:n.label}):s.jsx(mo,{onClick:n.onClick,value:n.label,children:n.label})},n.label))}),s.jsx(Ot,{})]},t.label))})]})})}function wg({id:e,message:r}){return s.jsx("div",{id:e,className:"pr-mb-20 pr-mt-20 pr-flex pr-items-center pr-justify-center",children:s.jsx("div",{className:"pr-w-3/4 pr-rounded-lg pr-bg-gray-100 pr-p-8 pr-text-center",children:s.jsx("p",{className:"pr-text-lg pr-text-gray-800",children:r})})})}function yg({id:e,category:r,downloads:t,languages:n,moreInfoUrl:o}){const a=new Q.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(t).reduce((l,p)=>l+p,0)),i=()=>{window.scrollTo(0,document.body.scrollHeight)};return s.jsxs("div",{id:e,className:"pr-flex pr-flex-wrap pr-items-start pr-space-x-4 pr-border-b pr-border-t pr-bg-white pr-pb-4 pr-pt-4",children:[s.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[s.jsx("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:s.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:r})}),s.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"CATEGORY"})]}),s.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),s.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[s.jsxs("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:[s.jsx(te.User,{className:"pr-mr-1 pr-h-4 pr-w-4"}),s.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:a})]}),s.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"USERS"})]}),s.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),s.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[s.jsx("div",{className:"pr-flex pr-items-center",children:n.slice(0,3).map(l=>s.jsx("span",{className:"pr-ml-1 pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1 pr-text-xs pr-font-semibold pr-text-gray-700",children:l.toUpperCase()},l))}),n.length>3&&s.jsxs("button",{type:"button",onClick:()=>i(),className:"pr-text-xs pr-text-gray-500 pr-underline",children:["+",n.length-3," more languages"]})]}),s.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),s.jsxs("div",{className:"pr-ml-auto pr-flex pr-flex-col pr-space-y-2",children:[s.jsxs("a",{href:o,target:"_blank",rel:"noreferrer",className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Website",s.jsx(te.Link,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]}),s.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Support",s.jsx(te.CircleHelp,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]})]})]})}function xl({id:e,versionHistory:r}){const[t,n]=y.useState(!1),o=new Date;function a(l){const p=new Date(l),u=new Date(o.getTime()-p.getTime()),f=u.getUTCFullYear()-1970,b=u.getUTCMonth(),v=u.getUTCDate()-1;let c="";return f>0?c=`${f.toString()} year${f===1?"":"s"} ago`:b>0?c=`${b.toString()} month${b===1?"":"s"} ago`:v===0?c="today":c=`${v.toString()} day${v===1?"":"s"} ago`,c}const i=Object.entries(r).sort((l,p)=>p[0].localeCompare(l[0]));return s.jsxs("div",{id:e,children:[s.jsx("h3",{className:"pr-text-md pr-font-semibold",children:"What`s New"}),s.jsx("ul",{className:"pr-list-disc pr-pl-5 pr-pr-4 pr-text-xs pr-text-gray-600",children:(t?i:i.slice(0,5)).map(l=>s.jsxs("div",{className:"pr-mt-3 pr-flex pr-justify-between",children:[s.jsx("div",{className:"pr-text-gray-600",children:s.jsx("li",{className:"pr-prose pr-text-xs",children:s.jsx("span",{children:l[1].description})})}),s.jsxs("div",{className:"pr-justify-end pr-text-right",children:[s.jsxs("div",{children:["Version ",l[0]]}),s.jsx("div",{children:a(l[1].date)})]})]},l[0]))}),i.length>5&&s.jsx("button",{type:"button",onClick:()=>n(!t),className:"pr-text-xs pr-text-gray-500 pr-underline",children:t?"Show Less Version History":"Show All Version History"})]})}function xg({id:e,publisherDisplayName:r,fileSize:t,locales:n,versionHistory:o}){const a=y.useMemo(()=>Q.formatBytes(t),[t]),l=(p=>{const u=new Intl.DisplayNames(navigator.language,{type:"language"});return p.map(f=>u.of(f))})(n);return s.jsx("div",{id:e,className:"pr-border-t pr-pb-4 pr-pt-4",children:s.jsxs("div",{className:"pr-md:flex-row pr-md:space-x-8 pr-flex pr-flex-col pr-space-x-0",children:[s.jsx(xl,{versionHistory:o}),s.jsx("div",{className:"pr-md:border-t-0 pr-md:border-l pr-md-h-auto pr-md-ml-8 pr-mt-4 pr-border-t pr-border-gray-300"}),s.jsxs("div",{className:"pr-md:mt-0 pr-mt-4 pr-flex-1 pr-space-y-3",children:[s.jsx("h2",{className:"pr-text-md pr-font-semibold",children:"Information"}),s.jsxs("div",{className:"pr-flex pr-items-start pr-justify-between pr-pr-4 pr-text-xs pr-text-gray-600",children:[s.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[s.jsx("span",{className:"pr-mb-2",children:"Publisher"}),s.jsx("span",{className:"pr-font-semibold",children:r}),s.jsx("span",{className:"pr-mb-2 pr-mt-4",children:"Size"}),s.jsx("span",{className:"pr-font-semibold",children:a})]}),s.jsx("div",{className:"pr-flex pr-w-3/4 pr-items-center pr-justify-between pr-text-xs pr-text-gray-600",children:s.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[s.jsx("span",{className:"pr-mb-2",children:"Languages"}),s.jsx("span",{className:"pr-font-semibold",children:l.join(", ")})]})})]})]})]})})}const kg=(e,r)=>{y.useEffect(()=>{if(!e)return()=>{};const t=e(r);return()=>{t()}},[e,r])},Xn=()=>!1,Ng=(e,r)=>{const[t]=an(y.useCallback(async()=>{if(!e)return Xn;const n=await Promise.resolve(e(r));return async()=>n()},[r,e]),Xn,{preserveValue:!1});y.useEffect(()=>()=>{t!==Xn&&t()},[t])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>fs.toast});exports.Alert=Vi;exports.AlertDescription=zi;exports.AlertTitle=Fi;exports.BOOK_SELECTOR_STRING_KEYS=$p;exports.BookChapterControl=kp;exports.BookSelectionMode=As;exports.BookSelector=Ip;exports.Button=be;exports.Card=Gi;exports.CardContent=qi;exports.CardDescription=Xi;exports.CardFooter=Wi;exports.CardHeader=Hi;exports.CardTitle=Ui;exports.ChapterRangeSelector=Ms;exports.Checkbox=No;exports.Checklist=sc;exports.ComboBox=Kn;exports.DataTable=zs;exports.DisableButton=dh;exports.DropdownMenu=pn;exports.DropdownMenuCheckboxItem=cn;exports.DropdownMenuContent=jt;exports.DropdownMenuGroup=Ns;exports.DropdownMenuItem=fo;exports.DropdownMenuItemType=yl;exports.DropdownMenuLabel=Qr;exports.DropdownMenuPortal=pp;exports.DropdownMenuRadioGroup=dp;exports.DropdownMenuRadioItem=mo;exports.DropdownMenuSeparator=Ot;exports.DropdownMenuShortcut=Ts;exports.DropdownMenuSub=cp;exports.DropdownMenuSubContent=Ss;exports.DropdownMenuSubTrigger=Es;exports.DropdownMenuTrigger=uo;exports.EnableButton=ch;exports.FilterButton=wl;exports.FilterDropdown=bg;exports.Footer=xg;exports.GridMenu=Bi;exports.HamburgerMenuButton=Li;exports.INVENTORY_STRING_KEYS=Lp;exports.IconButton=nh;exports.Input=Jr;exports.InstallButton=ph;exports.Inventory=zp;exports.Label=Xe;exports.MarkdownRenderer=vg;exports.MenuItem=Xo;exports.MoreInfo=yg;exports.NavigationContentSearch=qp;exports.NoExtensionsFound=wg;exports.RadioGroup=ho;exports.RadioGroupItem=Zt;exports.ScriptureResultsViewer=rc;exports.ScrollGroupSelector=tc;exports.SearchBar=Us;exports.Select=zr;exports.SelectContent=Er;exports.SelectGroup=Ds;exports.SelectItem=De;exports.SelectLabel=Bs;exports.SelectScrollDownButton=vo;exports.SelectScrollUpButton=go;exports.SelectSeparator=Ls;exports.SelectTrigger=Nr;exports.SelectValue=Gr;exports.Separator=ko;exports.SettingsList=nc;exports.SettingsListHeader=ac;exports.SettingsListItem=oc;exports.Slider=Yi;exports.Sonner=ih;exports.Spinner=et;exports.Switch=Ki;exports.Table=Rt;exports.TableBody=Pt;exports.TableCaption=Fs;exports.TableCell=Sr;exports.TableFooter=Vs;exports.TableHead=Hr;exports.TableHeader=_t;exports.TableRow=Qe;exports.Tabs=lh;exports.TabsContent=Qi;exports.TabsList=Ji;exports.TabsTrigger=Zi;exports.TextField=oh;exports.ToggleGroup=bo;exports.ToggleGroupItem=bt;exports.Toolbar=ah;exports.UpdateButton=uh;exports.VersionHistory=xl;exports.VerticalTabs=wo;exports.VerticalTabsContent=xo;exports.VerticalTabsList=yo;exports.VerticalTabsTrigger=Xs;exports.buttonVariants=Cs;exports.getSortingIcon=dn;exports.inventoryCountColumn=Up;exports.inventoryItemColumn=Hp;exports.inventoryStatusColumn=Xp;exports.useEvent=kg;exports.useEventAsync=Ng;exports.usePromise=an;function Eg(e,r="top"){if(!e||typeof document>"u")return;const t=document.head||document.querySelector("head"),n=t.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),r==="top"&&n?t.insertBefore(o,n):t.appendChild(o)}Eg(`/*
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
