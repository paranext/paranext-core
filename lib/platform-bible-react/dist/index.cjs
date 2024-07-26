"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const p=require("react/jsx-runtime"),T=require("react"),oe=require("lucide-react"),Ce=require("clsx"),Ec=require("tailwind-merge"),Ms=require("@radix-ui/react-dropdown-menu"),Ze=require("platform-bible-utils"),Se=require("@tanstack/react-table"),kc=require("@radix-ui/react-slot"),Oo=require("class-variance-authority"),Tc=require("@radix-ui/react-select"),ke=require("@mui/material"),Nc=require("@radix-ui/react-popover"),Ie=require("cmdk"),Cc=require("@radix-ui/react-dialog"),Ro=require("@mui/styled-engine"),Er=require("react-dom"),Sc=require("@radix-ui/react-tabs"),Oc=require("@radix-ui/react-separator"),Rc=require("@radix-ui/react-label"),Pc=require("@radix-ui/react-slider"),jc=require("@radix-ui/react-switch");function Qe(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const r in e)if(r!=="default"){const n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:()=>e[r]})}}return t.default=e,Object.freeze(t)}const N=Qe(T),me=Qe(Ms),ye=Qe(Tc),_r=Qe(Nc),ot=Qe(Cc),_c=Qe(Er),De=Qe(Sc),Is=Qe(Oc),Ds=Qe(Rc),kr=Qe(Pc),po=Qe(jc);const $c=Ec.extendTailwindMerge({prefix:"pr-"});function V(...e){return $c(Ce.clsx(e))}const ar=T.forwardRef(({className:e,type:t,...r},n)=>p.jsx("input",{type:t,className:V("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:n,...r}));ar.displayName="Input";const Mc=T.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:r,handleSubmit:n,...o},a)=>p.jsxs("div",{className:"pr-relative",children:[p.jsx(ar,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&n(),t(s)},onClick:r,ref:a}),p.jsx(oe.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));var Ic=Object.defineProperty,Dc=(e,t,r)=>t in e?Ic(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,ne=(e,t,r)=>Dc(e,typeof t!="symbol"?t+"":t,r);const Dt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Po=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],As=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Ta=Wc();function sr(e,t=!0){return t&&(e=e.toUpperCase()),e in Ta?Ta[e]:0}function jo(e){return sr(e)>0}function Ac(e){const t=typeof e=="string"?sr(e):e;return t>=40&&t<=66}function Bc(e){return(typeof e=="string"?sr(e):e)<=39}function Bs(e){return e<=66}function Lc(e){const t=typeof e=="string"?sr(e):e;return Fs(t)&&!Bs(t)}function*Vc(){for(let e=1;e<=Dt.length;e++)yield e}const Fc=1,Ls=Dt.length;function zc(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function _o(e,t="***"){const r=e-1;return r<0||r>=Dt.length?t:Dt[r]}function Vs(e){return e<=0||e>Ls?"******":As[e-1]}function Uc(e){return Vs(sr(e))}function Fs(e){const t=typeof e=="number"?_o(e):e;return jo(t)&&!Po.includes(t)}function qc(e){const t=typeof e=="number"?_o(e):e;return jo(t)&&Po.includes(t)}function Hc(e){return As[e-1].includes("*obsolete*")}function Wc(){const e={};for(let t=0;t<Dt.length;t++)e[Dt[t]]=t+1;return e}const de={allBookIds:Dt,nonCanonicalIds:Po,bookIdToNumber:sr,isBookIdValid:jo,isBookNT:Ac,isBookOT:Bc,isBookOTNT:Bs,isBookDC:Lc,allBookNumbers:Vc,firstBook:Fc,lastBook:Ls,extraBooks:zc,bookNumberToId:_o,bookNumberToEnglishName:Vs,bookIdToEnglishName:Uc,isCanonical:Fs,isExtraMaterial:qc,isObsolete:Hc};var tt=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(tt||{});const Le=class{constructor(t){if(ne(this,"name"),ne(this,"fullPath"),ne(this,"isPresent"),ne(this,"hasVerseSegments"),ne(this,"isCustomized"),ne(this,"baseVersification"),ne(this,"scriptureBooks"),ne(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=tt[t]):(this._type=t,this.name=tt[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ne(Le,"Original",new Le(tt.Original)),ne(Le,"Septuagint",new Le(tt.Septuagint)),ne(Le,"Vulgate",new Le(tt.Vulgate)),ne(Le,"English",new Le(tt.English)),ne(Le,"RussianProtestant",new Le(tt.RussianProtestant)),ne(Le,"RussianOrthodox",new Le(tt.RussianOrthodox));let Rt=Le;function Na(e,t){const r=t[0];for(let n=1;n<t.length;n++)e=e.split(t[n]).join(r);return e.split(r)}var zs=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(zs||{});const _e=class ie{constructor(t,r,n,o){if(ne(this,"firstChapter"),ne(this,"lastChapter"),ne(this,"lastVerse"),ne(this,"hasSegmentsDefined"),ne(this,"text"),ne(this,"BBBCCCVVVS"),ne(this,"longHashCode"),ne(this,"versification"),ne(this,"rtlMark","‏"),ne(this,"_bookNum",0),ne(this,"_chapterNum",0),ne(this,"_verseNum",0),ne(this,"_verse"),n==null&&o==null)if(t!=null&&typeof t=="string"){const a=t,s=r!=null&&r instanceof Rt?r:void 0;this.setEmpty(s),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=r!=null&&r instanceof Rt?r:void 0;this.setEmpty(a),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(r==null)if(t!=null&&t instanceof ie){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof Rt?t:ie.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&r!=null&&n!=null)if(typeof t=="string"&&typeof r=="string"&&typeof n=="string")this.setEmpty(o),this.updateInternal(t,r,n);else if(typeof t=="number"&&typeof r=="number"&&typeof n=="number")this._bookNum=t,this._chapterNum=r,this._verseNum=n,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let r;try{return r=new ie(t),{success:!0,verseRef:r}}catch(n){if(n instanceof hr)return r=new ie,{success:!1,verseRef:r};throw n}}static getBBBCCCVVV(t,r,n){return t%ie.bcvMaxValue*ie.bookDigitShifter+(r>=0?r%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(n>=0?n%ie.bcvMaxValue:0)}static fromJSON(t){const{book:r,chapterNum:n,verseNum:o,verse:a,versificationStr:s}=t,l=a||o.toString();let c;return s&&(c=new Rt(s)),r?new ie(r,n.toString(),l,c):new ie}static tryGetVerseNum(t){let r;if(!t)return r=-1,{success:!0,vNum:r};r=0;let n;for(let o=0;o<t.length;o++){if(n=t[o],n<"0"||n>"9")return o===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +n-0,r>ie.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return de.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=de.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const r=+t;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:r,vNum:n}=ie.tryGetVerseNum(t);this._verse=r?void 0:t.replace(this.rtlMark,""),this._verseNum=n,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>de.lastBook)throw new hr("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Rt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const s=+a[1].trim();this.versification=new Rt(tt[s])}catch{throw new hr("Invalid reference : "+t)}}const r=t.trim().split(" ");if(r.length!==2)throw new hr("Invalid reference : "+t);const n=r[1].split(":"),o=+n[0];if(n.length!==2||de.bookIdToNumber(r[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(n[1]))throw new hr("Invalid reference : "+t);this.updateInternal(r[0],n[0],n[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete r.verse,r}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,r=ie.verseRangeSeparators,n=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=Na(this._verse,n);for(const s of a.map(l=>Na(l,r))){const l=this.clone();l.verse=s[0];const c=l.verseNum;if(o.push(l),s.length>1){const d=this.clone();if(d.verse=s[1],!t)for(let m=c+1;m<d.verseNum;m++){const v=new ie(this._bookNum,this._chapterNum,m,this.versification);this.isExcluded||o.push(v)}o.push(d)}}return o}validateVerse(t,r){if(!this.verse)return this.internalValid;let n=0;for(const o of this.allVerses(!0,t,r)){const a=o.internalValid;if(a!==0)return a;const s=o.BBBCCCVVV;if(n>s)return 3;if(n===s)return 4;n=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>de.lastBook?2:(de.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,r,n){this.bookNum=de.bookIdToNumber(t),this.chapter=r,this.verse=n}};ne(_e,"defaultVersification",Rt.English),ne(_e,"verseRangeSeparator","-"),ne(_e,"verseSequenceIndicator",","),ne(_e,"verseRangeSeparators",[_e.verseRangeSeparator]),ne(_e,"verseSequenceIndicators",[_e.verseSequenceIndicator]),ne(_e,"chapterDigitShifter",1e3),ne(_e,"bookDigitShifter",_e.chapterDigitShifter*_e.chapterDigitShifter),ne(_e,"bcvMaxValue",_e.chapterDigitShifter-1),ne(_e,"ValidStatusType",zs);let hr=class extends Error{};const $o=me.Root,Us=me.Trigger,Gc=me.Group,Xc=me.Portal,Yc=me.Sub,Kc=me.RadioGroup,qs=T.forwardRef(({className:e,inset:t,children:r,...n},o)=>p.jsxs(me.SubTrigger,{ref:o,className:V("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...n,children:[r,p.jsx(oe.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));qs.displayName=me.SubTrigger.displayName;const Hs=T.forwardRef(({className:e,...t},r)=>p.jsx(me.SubContent,{ref:r,className:V("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));Hs.displayName=me.SubContent.displayName;const Nn=T.forwardRef(({className:e,sideOffset:t=4,...r},n)=>p.jsx(me.Portal,{children:p.jsx(me.Content,{ref:n,sideOffset:t,className:V("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r})}));Nn.displayName=me.Content.displayName;const Mo=T.forwardRef(({className:e,inset:t,...r},n)=>p.jsx(me.Item,{ref:n,className:V("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...r}));Mo.displayName=me.Item.displayName;const Io=T.forwardRef(({className:e,children:t,checked:r,...n},o)=>p.jsxs(me.CheckboxItem,{ref:o,className:V("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:r,...n,children:[p.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:p.jsx(me.ItemIndicator,{children:p.jsx(oe.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));Io.displayName=me.CheckboxItem.displayName;const Ws=T.forwardRef(({className:e,children:t,...r},n)=>p.jsxs(me.RadioItem,{ref:n,className:V("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...r,children:[p.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:p.jsx(me.ItemIndicator,{children:p.jsx(oe.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));Ws.displayName=me.RadioItem.displayName;const Vr=T.forwardRef(({className:e,inset:t,...r},n)=>p.jsx(me.Label,{ref:n,className:V("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...r}));Vr.displayName=me.Label.displayName;const Cn=T.forwardRef(({className:e,...t},r)=>p.jsx(me.Separator,{ref:r,className:V("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Cn.displayName=me.Separator.displayName;function Gs({className:e,...t}){return p.jsx("span",{className:V("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Gs.displayName="DropdownMenuShortcut";const Jc=T.forwardRef(({bookId:e,handleSelectBook:t,isSelected:r,handleHighlightBook:n,handleKeyDown:o,bookType:a,children:s},l)=>p.jsxs(Mo,{ref:l,textValue:e,className:V("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":r}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:n,onMouseMove:n,children:[p.jsx("span",{className:V("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":r,"pr-border-l-red-200":a.toLowerCase()==="ot","pr-border-l-purple-200":a.toLowerCase()==="nt","pr-border-l-indigo-200":a.toLowerCase()==="dc"}),children:de.bookIdToEnglishName(e)}),r&&p.jsx("div",{children:s})]},e));function Zc({handleSelectChapter:e,endChapter:t,activeChapter:r,highlightedChapter:n,handleHighlightedChapter:o}){const a=Array.from({length:t},(l,c)=>c+1),s=T.useCallback(l=>{o(l)},[o]);return p.jsx("div",{className:V("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:a.map(l=>p.jsx("div",{className:V("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===r,"pr-bg-amber-200":l===n}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>s(l),children:l},l))})}function Qc({handleSort:e,handleLocationHistory:t,handleBookmarks:r}){return p.jsxs(Vr,{className:"pr-flex pr-justify-between",children:[p.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),p.jsxs("div",{className:"pr-flex pr-items-center",children:[p.jsx(oe.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),p.jsx(oe.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),p.jsx(oe.Bookmark,{onClick:r,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const Sr=de.allBookIds,ep={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},Ca=["OT","NT","DC"],tp=32+32+32,rp=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],np=e=>({OT:Sr.filter(r=>de.isBookOT(r)),NT:Sr.filter(r=>de.isBookNT(r)),DC:Sr.filter(r=>de.isBookDC(r))})[e],gr=e=>Ze.getChaptersForBook(de.bookIdToNumber(e));function op(){return Sr.map(t=>de.bookIdToEnglishName(t))}function ap(e){return op().includes(e)}function sp(e){const t=e.toLowerCase().replace(/^\w/,r=>r.toUpperCase());if(ap(t))return Sr.find(n=>de.bookIdToEnglishName(n)===t)}function ip({scrRef:e,handleSubmit:t}){const[r,n]=T.useState(""),[o,a]=T.useState(de.bookNumberToId(e.bookNum)),[s,l]=T.useState(e.chapterNum??0),[c,d]=T.useState(de.bookNumberToId(e.bookNum)),[m,v]=T.useState(!1),[g,u]=T.useState(m),h=T.useRef(void 0),f=T.useRef(void 0),b=T.useRef(void 0),w=T.useCallback(k=>np(k).filter(O=>{const j=de.bookIdToEnglishName(O).toLowerCase(),z=r.replace(/[^a-zA-Z]/g,"").toLowerCase();return j.includes(z)||O.toLowerCase().includes(z)}),[r]),R=k=>{n(k)},x=T.useRef(!1),E=T.useCallback(k=>{if(x.current){x.current=!1;return}v(k)},[]),y=T.useCallback((k,O,j,z)=>{if(l(de.bookNumberToId(e.bookNum)!==k?1:e.chapterNum),O||gr(k)===-1){t({bookNum:de.bookIdToNumber(k),chapterNum:j||1,verseNum:z||1}),v(!1),n("");return}a(o!==k?k:""),v(!O)},[t,e.bookNum,e.chapterNum,o]),S=k=>{k<=0||k>gr(o)||y(o,!0,k)},C=T.useCallback(()=>{rp.forEach(k=>{const O=r.match(k);if(O){const[j,z=void 0,q=void 0]=O.slice(1),$=sp(j);(de.isBookIdValid(j)||$)&&y($??j,!0,z?parseInt(z,10):1,q?parseInt(q,10):1)}})},[y,r]),I=T.useCallback(k=>{m?(k.key==="ArrowDown"||k.key==="ArrowUp")&&(typeof b<"u"&&b.current!==null?b.current.focus():typeof f<"u"&&f.current!==null&&f.current.focus(),k.preventDefault()):v(!0)},[m]),A=k=>{const{key:O}=k;O==="ArrowRight"||O==="ArrowLeft"||O==="ArrowDown"||O==="ArrowUp"||O==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:O})),h.current.focus())},B=k=>{const{key:O}=k;if(c===o){if(O==="Enter"){k.preventDefault(),y(o,!0,s);return}let j=0;if(O==="ArrowRight")if(s<gr(c))j=1;else{k.preventDefault();return}else if(O==="ArrowLeft")if(s>1)j=-1;else{k.preventDefault();return}else O==="ArrowDown"?j=6:O==="ArrowUp"&&(j=-6);s+j<=0||s+j>gr(c)?l(0):j!==0&&(l(s+j),k.preventDefault())}};return T.useEffect(()=>{o===c?o===de.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),T.useLayoutEffect(()=>{u(m)},[m]),T.useLayoutEffect(()=>{const k=setTimeout(()=>{if(g&&f.current&&b.current){const j=b.current.offsetTop-tp;f.current.scrollTo({top:j,behavior:"instant"})}},10);return()=>{clearTimeout(k)}},[g]),p.jsx("div",{className:"pr-flex",children:p.jsxs($o,{modal:!1,open:m,onOpenChange:E,children:[p.jsx(Us,{asChild:!0,children:p.jsx(Mc,{ref:h,value:r,handleSearch:R,handleKeyDown:I,handleOnClick:()=>{a(de.bookNumberToId(e.bookNum)),d(de.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),v(!0),h.current.focus()},onFocus:()=>{x.current=!0},handleSubmit:C,placeholder:`${de.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),p.jsxs(Nn,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:A,align:"start",ref:f,children:[p.jsx(Qc,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),Ca.map((k,O)=>w(k).length>0&&p.jsxs("div",{children:[p.jsx(Vr,{className:"pr-font-semibold pr-text-slate-700",children:ep[k]}),w(k).map(j=>p.jsx("div",{children:p.jsx(Jc,{bookId:j,handleSelectBook:()=>y(j,!1),isSelected:o===j,handleHighlightBook:()=>d(j),handleKeyDown:B,bookType:k,ref:z=>{o===j&&(b.current=z)},children:p.jsx(Zc,{handleSelectChapter:S,endChapter:gr(j),activeChapter:e.bookNum===de.bookIdToNumber(j)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:z=>{l(z)}})})},j)),Ca.length-1!==O?p.jsx(Cn,{}):void 0]},k))]})]})})}const Xs=Oo.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),ge=T.forwardRef(({className:e,variant:t,size:r,asChild:n=!1,...o},a)=>{const s=n?kc.Slot:"button";return p.jsx(s,{className:V(Xs({variant:t,size:r,className:e})),ref:a,...o})});ge.displayName="Button";function lp({table:e}){return p.jsxs($o,{children:[p.jsx(Ms.DropdownMenuTrigger,{asChild:!0,children:p.jsxs(ge,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[p.jsx(oe.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),p.jsxs(Nn,{align:"end",className:"pr-w-[150px]",children:[p.jsx(Vr,{children:"Toggle columns"}),p.jsx(Cn,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>p.jsx(Io,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:r=>t.toggleVisibility(!!r),children:t.id},t.id))]})]})}const $r=ye.Root,Ys=ye.Group,Mr=ye.Value,Jt=T.forwardRef(({className:e,children:t,...r},n)=>p.jsxs(ye.Trigger,{ref:n,className:V("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...r,children:[t,p.jsx(ye.Icon,{asChild:!0,children:p.jsx(oe.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));Jt.displayName=ye.Trigger.displayName;const Do=T.forwardRef(({className:e,...t},r)=>p.jsx(ye.ScrollUpButton,{ref:r,className:V("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:p.jsx(oe.ChevronUp,{className:"pr-h-4 pr-w-4"})}));Do.displayName=ye.ScrollUpButton.displayName;const Ao=T.forwardRef(({className:e,...t},r)=>p.jsx(ye.ScrollDownButton,{ref:r,className:V("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:p.jsx(oe.ChevronDown,{className:"pr-h-4 pr-w-4"})}));Ao.displayName=ye.ScrollDownButton.displayName;const Zt=T.forwardRef(({className:e,children:t,position:r="popper",...n},o)=>p.jsx(ye.Portal,{children:p.jsxs(ye.Content,{ref:o,className:V("pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:r,...n,children:[p.jsx(Do,{}),p.jsx(ye.Viewport,{className:V("pr-p-1",r==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),p.jsx(Ao,{})]})}));Zt.displayName=ye.Content.displayName;const Ks=T.forwardRef(({className:e,...t},r)=>p.jsx(ye.Label,{ref:r,className:V("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));Ks.displayName=ye.Label.displayName;const Je=T.forwardRef(({className:e,children:t,...r},n)=>p.jsxs(ye.Item,{ref:n,className:V("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...r,children:[p.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:p.jsx(ye.ItemIndicator,{children:p.jsx(oe.Check,{className:"pr-h-4 pr-w-4"})})}),p.jsx(ye.ItemText,{children:t})]}));Je.displayName=ye.Item.displayName;const Js=T.forwardRef(({className:e,...t},r)=>p.jsx(ye.Separator,{ref:r,className:V("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Js.displayName=ye.Separator.displayName;function cp({table:e}){return p.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:p.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[p.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),p.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[p.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),p.jsxs($r,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[p.jsx(Jt,{className:"pr-h-8 pr-w-[70px]",children:p.jsx(Mr,{placeholder:e.getState().pagination.pageSize})}),p.jsx(Zt,{side:"top",children:[10,20,30,40,50].map(t=>p.jsx(Je,{value:`${t}`,children:t},t))})]})]}),p.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),p.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[p.jsxs(ge,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),p.jsx(oe.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),p.jsxs(ge,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),p.jsx(oe.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),p.jsxs(ge,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),p.jsx(oe.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),p.jsxs(ge,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),p.jsx(oe.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}const Fr=T.forwardRef(({className:e,...t},r)=>p.jsx("div",{className:"pr-relative pr-w-full pr-overflow-auto",children:p.jsx("table",{ref:r,className:V("pr-w-full pr-caption-bottom pr-text-sm",e),...t})}));Fr.displayName="Table";const zr=T.forwardRef(({className:e,...t},r)=>p.jsx("thead",{ref:r,className:V("[&_tr]:pr-border-b",e),...t}));zr.displayName="TableHeader";const Ur=T.forwardRef(({className:e,...t},r)=>p.jsx("tbody",{ref:r,className:V("[&_tr:last-child]:pr-border-0",e),...t}));Ur.displayName="TableBody";const Zs=T.forwardRef(({className:e,...t},r)=>p.jsx("tfoot",{ref:r,className:V("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));Zs.displayName="TableFooter";const ut=T.forwardRef(({className:e,...t},r)=>p.jsx("tr",{ref:r,className:V("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));ut.displayName="TableRow";const Qt=T.forwardRef(({className:e,...t},r)=>p.jsx("th",{ref:r,className:V("pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",e),...t}));Qt.displayName="TableHead";const At=T.forwardRef(({className:e,...t},r)=>p.jsx("td",{ref:r,className:V("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0",e),...t}));At.displayName="TableCell";const Qs=T.forwardRef(({className:e,...t},r)=>p.jsx("caption",{ref:r,className:V("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));Qs.displayName="TableCaption";function ei({columns:e,data:t,enablePagination:r=!1,showPaginationControls:n=!1,showColumnVisibilityControls:o=!1,onRowClickHandler:a=()=>{}}){var f;const[s,l]=T.useState([]),[c,d]=T.useState([]),[m,v]=T.useState({}),[g,u]=T.useState({}),h=Se.useReactTable({data:t,columns:e,getCoreRowModel:Se.getCoreRowModel(),...r&&{getPaginationRowModel:Se.getPaginationRowModel()},onSortingChange:l,getSortedRowModel:Se.getSortedRowModel(),onColumnFiltersChange:d,getFilteredRowModel:Se.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:u,state:{sorting:s,columnFilters:c,columnVisibility:m,rowSelection:g}});return p.jsxs("div",{children:[o&&p.jsx(lp,{table:h}),p.jsx("div",{className:"pr-twp pr-font-sans",children:p.jsxs(Fr,{children:[p.jsx(zr,{children:h.getHeaderGroups().map(b=>p.jsx(ut,{children:b.headers.map(w=>p.jsx(Qt,{children:w.isPlaceholder?void 0:Se.flexRender(w.column.columnDef.header,w.getContext())},w.id))},b.id))}),p.jsx(Ur,{children:(f=h.getRowModel().rows)!=null&&f.length?h.getRowModel().rows.map(b=>p.jsx(ut,{onClick:()=>a(b,h),"data-state":b.getIsSelected()&&"selected",children:b.getVisibleCells().map(w=>p.jsx(At,{children:Se.flexRender(w.column.columnDef.cell,w.getContext())},w.id))},b.id)):p.jsx(ut,{children:p.jsx(At,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]})}),r&&p.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[p.jsx(ge,{variant:"outline",size:"sm",onClick:()=>h.previousPage(),disabled:!h.getCanPreviousPage(),children:"Previous"}),p.jsx(ge,{variant:"outline",size:"sm",onClick:()=>h.nextPage(),disabled:!h.getCanNextPage(),children:"Next"})]}),r&&n&&p.jsx(cp,{table:h})]})}const pp=_r.Root,up=_r.Trigger,ti=T.forwardRef(({className:e,align:t="center",sideOffset:r=4,...n},o)=>p.jsx(_r.Portal,{children:p.jsx(_r.Content,{ref:o,align:t,sideOffset:r,className:V("pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));ti.displayName=_r.Content.displayName;const dp=ot.Portal,ri=T.forwardRef(({className:e,...t},r)=>p.jsx(ot.Overlay,{ref:r,className:V("pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",e),...t}));ri.displayName=ot.Overlay.displayName;const fp=T.forwardRef(({className:e,children:t,...r},n)=>p.jsxs(dp,{children:[p.jsx(ri,{}),p.jsxs(ot.Content,{ref:n,className:V("pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",e),...r,children:[t,p.jsxs(ot.Close,{className:"pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground",children:[p.jsx(oe.X,{className:"pr-h-4 pr-w-4"}),p.jsx("span",{className:"pr-sr-only",children:"Close"})]})]})]}));fp.displayName=ot.Content.displayName;const mp=T.forwardRef(({className:e,...t},r)=>p.jsx(ot.Title,{ref:r,className:V("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight",e),...t}));mp.displayName=ot.Title.displayName;const hp=T.forwardRef(({className:e,...t},r)=>p.jsx(ot.Description,{ref:r,className:V("pr-text-sm pr-text-muted-foreground",e),...t}));hp.displayName=ot.Description.displayName;const ni=T.forwardRef(({className:e,...t},r)=>p.jsx(Ie.Command,{ref:r,className:V("pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",e),...t}));ni.displayName=Ie.Command.displayName;const oi=T.forwardRef(({className:e,...t},r)=>p.jsxs("div",{className:"pr-flex pr-items-center pr-border-b pr-px-3",children:[p.jsx(oe.Search,{className:"pr-mr-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"}),p.jsx(Ie.Command.Input,{ref:r,className:V("pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...t})]}));oi.displayName=Ie.Command.Input.displayName;const ai=T.forwardRef(({className:e,...t},r)=>p.jsx(Ie.Command.List,{ref:r,className:V("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden",e),...t}));ai.displayName=Ie.Command.List.displayName;const si=T.forwardRef((e,t)=>p.jsx(Ie.Command.Empty,{ref:t,className:"pr-py-6 pr-text-center pr-text-sm",...e}));si.displayName=Ie.Command.Empty.displayName;const gp=T.forwardRef(({className:e,...t},r)=>p.jsx(Ie.Command.Group,{ref:r,className:V("pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",e),...t}));gp.displayName=Ie.Command.Group.displayName;const bp=T.forwardRef(({className:e,...t},r)=>p.jsx(Ie.Command.Separator,{ref:r,className:V("pr--mx-1 pr-h-px pr-bg-border",e),...t}));bp.displayName=Ie.Command.Separator.displayName;const ii=T.forwardRef(({className:e,...t},r)=>p.jsx(Ie.Command.Item,{ref:r,className:V("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",e),...t}));ii.displayName=Ie.Command.Item.displayName;function vp(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function uo({id:e,options:t=[],className:r,value:n,onChange:o=()=>{},getOptionLabel:a=vp,buttonPlaceholder:s="",textPlaceholder:l="",commandEmptyMessage:c="No option found",buttonVariant:d="outline"}){const[m,v]=T.useState(!1);return p.jsxs(pp,{open:m,onOpenChange:v,children:[p.jsx(up,{asChild:!0,children:p.jsxs(ge,{variant:d,role:"combobox","aria-expanded":m,id:e,className:V("pr-w-[200px] pr-justify-between",r),children:[n?a(n):s,p.jsx(oe.ChevronsUpDown,{className:"pr-ml-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"})]})}),p.jsx(ti,{className:"pr-w-[200px] pr-p-0",children:p.jsxs(ni,{children:[p.jsx(oi,{placeholder:l,className:"pr-text-inherit"}),p.jsx(si,{children:c}),p.jsx(ai,{children:t.map(g=>p.jsxs(ii,{value:a(g),onSelect:()=>{o(g),v(!1)},children:[p.jsx(oe.Check,{className:V("pr-mr-2 pr-h-4 pr-w-4",{"pr-opacity-0":!n||a(n)!==a(g)})}),a(g)]},a(g)))})]})})]})}function yp({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:r=!1,chapterCount:n}){const[o,a]=T.useState(1),[s,l]=T.useState(n),[c,d]=T.useState(Array.from({length:n},(g,u)=>u+1));T.useEffect(()=>{a(1),e(1),l(n),t(n),d(Array.from({length:n},(g,u)=>u+1))},[n,t,e]);const m=g=>{a(g),e(g),g>s&&(l(g),t(g))},v=g=>{l(g),t(g),g<o&&(a(g),e(g))};return p.jsxs(p.Fragment,{children:[p.jsx(ke.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:r,control:p.jsx(uo,{onChange:m,className:"book-selection-chapter",options:c,getOptionLabel:g=>g.toString(),value:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),p.jsx(ke.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:r,control:p.jsx(uo,{onChange:v,className:"book-selection-chapter",options:c,getOptionLabel:g=>g.toString(),value:s},"end chapter"),label:"to",labelPlacement:"start"})]})}var $t=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))($t||{});function li({id:e,isChecked:t,labelText:r="",labelPosition:n=$t.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:s=!1,hasError:l=!1,className:c,onChange:d}){const m=p.jsx(ke.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:a,disabled:s,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:d});let v;if(r){const g=n===$t.Before||n===$t.Above,u=p.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:r}),h=n===$t.Before||n===$t.After,f=h?u:p.jsx("div",{children:u}),b=h?m:p.jsx("div",{children:m});v=p.jsxs(ke.FormLabel,{className:`papi-checkbox ${n.toString()}`,disabled:s,error:l,children:[g&&f,b,!g&&f]})}else v=m;return v}function wp({id:e,className:t,legend:r,listItems:n,selectedListItems:o,handleSelectListItem:a,createLabel:s}){return p.jsxs("fieldset",{id:e,className:t,children:[r&&p.jsx("legend",{children:r}),n.map(l=>p.jsx(li,{className:"check-item",isChecked:o.includes(l),labelText:s?s(l):l,onChange:()=>a(l)},l))]})}function xp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Tt(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var r=function n(){return this instanceof n?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};r.prototype=t.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(e).forEach(function(n){var o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(r,n,o.get?o:{enumerable:!0,get:function(){return e[n]}})}),r}var Bo={},ci={exports:{}};(function(e){function t(r){return r&&r.__esModule?r:{default:r}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(ci);var Lo=ci.exports,Hn={};function ir(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...n){return e(...n)||t(...n)}}function _(){return _=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},_.apply(null,arguments)}function Et(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function pi(e){if(!Et(e))return e;const t={};return Object.keys(e).forEach(r=>{t[r]=pi(e[r])}),t}function rt(e,t,r={clone:!0}){const n=r.clone?_({},e):e;return Et(e)&&Et(t)&&Object.keys(t).forEach(o=>{Et(t[o])&&Object.prototype.hasOwnProperty.call(e,o)&&Et(e[o])?n[o]=rt(e[o],t[o],r):r.clone?n[o]=Et(t[o])?pi(t[o]):t[o]:n[o]=t[o]}),n}const Ep=Object.freeze(Object.defineProperty({__proto__:null,default:rt,isPlainObject:Et},Symbol.toStringTag,{value:"Module"}));var fo={exports:{}},rn={exports:{}},le={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sa;function kp(){if(Sa)return le;Sa=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,u=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,R=e?Symbol.for("react.scope"):60119;function x(y){if(typeof y=="object"&&y!==null){var S=y.$$typeof;switch(S){case t:switch(y=y.type,y){case c:case d:case n:case a:case o:case v:return y;default:switch(y=y&&y.$$typeof,y){case l:case m:case h:case u:case s:return y;default:return S}}case r:return S}}}function E(y){return x(y)===d}return le.AsyncMode=c,le.ConcurrentMode=d,le.ContextConsumer=l,le.ContextProvider=s,le.Element=t,le.ForwardRef=m,le.Fragment=n,le.Lazy=h,le.Memo=u,le.Portal=r,le.Profiler=a,le.StrictMode=o,le.Suspense=v,le.isAsyncMode=function(y){return E(y)||x(y)===c},le.isConcurrentMode=E,le.isContextConsumer=function(y){return x(y)===l},le.isContextProvider=function(y){return x(y)===s},le.isElement=function(y){return typeof y=="object"&&y!==null&&y.$$typeof===t},le.isForwardRef=function(y){return x(y)===m},le.isFragment=function(y){return x(y)===n},le.isLazy=function(y){return x(y)===h},le.isMemo=function(y){return x(y)===u},le.isPortal=function(y){return x(y)===r},le.isProfiler=function(y){return x(y)===a},le.isStrictMode=function(y){return x(y)===o},le.isSuspense=function(y){return x(y)===v},le.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===n||y===d||y===a||y===o||y===v||y===g||typeof y=="object"&&y!==null&&(y.$$typeof===h||y.$$typeof===u||y.$$typeof===s||y.$$typeof===l||y.$$typeof===m||y.$$typeof===b||y.$$typeof===w||y.$$typeof===R||y.$$typeof===f)},le.typeOf=x,le}var ce={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Oa;function Tp(){return Oa||(Oa=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,u=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,R=e?Symbol.for("react.scope"):60119;function x(L){return typeof L=="string"||typeof L=="function"||L===n||L===d||L===a||L===o||L===v||L===g||typeof L=="object"&&L!==null&&(L.$$typeof===h||L.$$typeof===u||L.$$typeof===s||L.$$typeof===l||L.$$typeof===m||L.$$typeof===b||L.$$typeof===w||L.$$typeof===R||L.$$typeof===f)}function E(L){if(typeof L=="object"&&L!==null){var ee=L.$$typeof;switch(ee){case t:var D=L.type;switch(D){case c:case d:case n:case a:case o:case v:return D;default:var se=D&&D.$$typeof;switch(se){case l:case m:case h:case u:case s:return se;default:return ee}}case r:return ee}}}var y=c,S=d,C=l,I=s,A=t,B=m,k=n,O=h,j=u,z=r,q=a,$=o,F=v,W=!1;function te(L){return W||(W=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),P(L)||E(L)===c}function P(L){return E(L)===d}function M(L){return E(L)===l}function U(L){return E(L)===s}function Y(L){return typeof L=="object"&&L!==null&&L.$$typeof===t}function H(L){return E(L)===m}function G(L){return E(L)===n}function K(L){return E(L)===h}function J(L){return E(L)===u}function X(L){return E(L)===r}function Z(L){return E(L)===a}function Q(L){return E(L)===o}function ae(L){return E(L)===v}ce.AsyncMode=y,ce.ConcurrentMode=S,ce.ContextConsumer=C,ce.ContextProvider=I,ce.Element=A,ce.ForwardRef=B,ce.Fragment=k,ce.Lazy=O,ce.Memo=j,ce.Portal=z,ce.Profiler=q,ce.StrictMode=$,ce.Suspense=F,ce.isAsyncMode=te,ce.isConcurrentMode=P,ce.isContextConsumer=M,ce.isContextProvider=U,ce.isElement=Y,ce.isForwardRef=H,ce.isFragment=G,ce.isLazy=K,ce.isMemo=J,ce.isPortal=X,ce.isProfiler=Z,ce.isStrictMode=Q,ce.isSuspense=ae,ce.isValidElementType=x,ce.typeOf=E}()),ce}var Ra;function ui(){return Ra||(Ra=1,process.env.NODE_ENV==="production"?rn.exports=kp():rn.exports=Tp()),rn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Wn,Pa;function Np(){if(Pa)return Wn;Pa=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function n(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var s={},l=0;l<10;l++)s["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(s).map(function(m){return s[m]});if(c.join("")!=="0123456789")return!1;var d={};return"abcdefghijklmnopqrst".split("").forEach(function(m){d[m]=m}),Object.keys(Object.assign({},d)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Wn=o()?Object.assign:function(a,s){for(var l,c=n(a),d,m=1;m<arguments.length;m++){l=Object(arguments[m]);for(var v in l)t.call(l,v)&&(c[v]=l[v]);if(e){d=e(l);for(var g=0;g<d.length;g++)r.call(l,d[g])&&(c[d[g]]=l[d[g]])}}return c},Wn}var Gn,ja;function Vo(){if(ja)return Gn;ja=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Gn=e,Gn}var Xn,_a;function di(){return _a||(_a=1,Xn=Function.call.bind(Object.prototype.hasOwnProperty)),Xn}var Yn,$a;function Cp(){if($a)return Yn;$a=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Vo(),r={},n=di();e=function(a){var s="Warning: "+a;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(a,s,l,c,d){if(process.env.NODE_ENV!=="production"){for(var m in a)if(n(a,m)){var v;try{if(typeof a[m]!="function"){var g=Error((c||"React class")+": "+l+" type `"+m+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[m]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw g.name="Invariant Violation",g}v=a[m](s,m,c,l,null,t)}catch(h){v=h}if(v&&!(v instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+m+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof v+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),v instanceof Error&&!(v.message in r)){r[v.message]=!0;var u=d?d():"";e("Failed "+l+" type: "+v.message+(u??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(r={})},Yn=o,Yn}var Kn,Ma;function Sp(){if(Ma)return Kn;Ma=1;var e=ui(),t=Np(),r=Vo(),n=di(),o=Cp(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function s(){return null}return Kn=function(l,c){var d=typeof Symbol=="function"&&Symbol.iterator,m="@@iterator";function v(P){var M=P&&(d&&P[d]||P[m]);if(typeof M=="function")return M}var g="<<anonymous>>",u={array:w("array"),bigint:w("bigint"),bool:w("boolean"),func:w("function"),number:w("number"),object:w("object"),string:w("string"),symbol:w("symbol"),any:R(),arrayOf:x,element:E(),elementType:y(),instanceOf:S,node:B(),objectOf:I,oneOf:C,oneOfType:A,shape:O,exact:j};function h(P,M){return P===M?P!==0||1/P===1/M:P!==P&&M!==M}function f(P,M){this.message=P,this.data=M&&typeof M=="object"?M:{},this.stack=""}f.prototype=Error.prototype;function b(P){if(process.env.NODE_ENV!=="production")var M={},U=0;function Y(G,K,J,X,Z,Q,ae){if(X=X||g,Q=Q||J,ae!==r){if(c){var L=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw L.name="Invariant Violation",L}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var ee=X+":"+J;!M[ee]&&U<3&&(a("You are manually calling a React.PropTypes validation function for the `"+Q+"` prop on `"+X+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),M[ee]=!0,U++)}}return K[J]==null?G?K[J]===null?new f("The "+Z+" `"+Q+"` is marked as required "+("in `"+X+"`, but its value is `null`.")):new f("The "+Z+" `"+Q+"` is marked as required in "+("`"+X+"`, but its value is `undefined`.")):null:P(K,J,X,Z,Q)}var H=Y.bind(null,!1);return H.isRequired=Y.bind(null,!0),H}function w(P){function M(U,Y,H,G,K,J){var X=U[Y],Z=$(X);if(Z!==P){var Q=F(X);return new f("Invalid "+G+" `"+K+"` of type "+("`"+Q+"` supplied to `"+H+"`, expected ")+("`"+P+"`."),{expectedType:P})}return null}return b(M)}function R(){return b(s)}function x(P){function M(U,Y,H,G,K){if(typeof P!="function")return new f("Property `"+K+"` of component `"+H+"` has invalid PropType notation inside arrayOf.");var J=U[Y];if(!Array.isArray(J)){var X=$(J);return new f("Invalid "+G+" `"+K+"` of type "+("`"+X+"` supplied to `"+H+"`, expected an array."))}for(var Z=0;Z<J.length;Z++){var Q=P(J,Z,H,G,K+"["+Z+"]",r);if(Q instanceof Error)return Q}return null}return b(M)}function E(){function P(M,U,Y,H,G){var K=M[U];if(!l(K)){var J=$(K);return new f("Invalid "+H+" `"+G+"` of type "+("`"+J+"` supplied to `"+Y+"`, expected a single ReactElement."))}return null}return b(P)}function y(){function P(M,U,Y,H,G){var K=M[U];if(!e.isValidElementType(K)){var J=$(K);return new f("Invalid "+H+" `"+G+"` of type "+("`"+J+"` supplied to `"+Y+"`, expected a single ReactElement type."))}return null}return b(P)}function S(P){function M(U,Y,H,G,K){if(!(U[Y]instanceof P)){var J=P.name||g,X=te(U[Y]);return new f("Invalid "+G+" `"+K+"` of type "+("`"+X+"` supplied to `"+H+"`, expected ")+("instance of `"+J+"`."))}return null}return b(M)}function C(P){if(!Array.isArray(P))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),s;function M(U,Y,H,G,K){for(var J=U[Y],X=0;X<P.length;X++)if(h(J,P[X]))return null;var Z=JSON.stringify(P,function(ae,L){var ee=F(L);return ee==="symbol"?String(L):L});return new f("Invalid "+G+" `"+K+"` of value `"+String(J)+"` "+("supplied to `"+H+"`, expected one of "+Z+"."))}return b(M)}function I(P){function M(U,Y,H,G,K){if(typeof P!="function")return new f("Property `"+K+"` of component `"+H+"` has invalid PropType notation inside objectOf.");var J=U[Y],X=$(J);if(X!=="object")return new f("Invalid "+G+" `"+K+"` of type "+("`"+X+"` supplied to `"+H+"`, expected an object."));for(var Z in J)if(n(J,Z)){var Q=P(J,Z,H,G,K+"."+Z,r);if(Q instanceof Error)return Q}return null}return b(M)}function A(P){if(!Array.isArray(P))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var M=0;M<P.length;M++){var U=P[M];if(typeof U!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+W(U)+" at index "+M+"."),s}function Y(H,G,K,J,X){for(var Z=[],Q=0;Q<P.length;Q++){var ae=P[Q],L=ae(H,G,K,J,X,r);if(L==null)return null;L.data&&n(L.data,"expectedType")&&Z.push(L.data.expectedType)}var ee=Z.length>0?", expected one of type ["+Z.join(", ")+"]":"";return new f("Invalid "+J+" `"+X+"` supplied to "+("`"+K+"`"+ee+"."))}return b(Y)}function B(){function P(M,U,Y,H,G){return z(M[U])?null:new f("Invalid "+H+" `"+G+"` supplied to "+("`"+Y+"`, expected a ReactNode."))}return b(P)}function k(P,M,U,Y,H){return new f((P||"React class")+": "+M+" type `"+U+"."+Y+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+H+"`.")}function O(P){function M(U,Y,H,G,K){var J=U[Y],X=$(J);if(X!=="object")return new f("Invalid "+G+" `"+K+"` of type `"+X+"` "+("supplied to `"+H+"`, expected `object`."));for(var Z in P){var Q=P[Z];if(typeof Q!="function")return k(H,G,K,Z,F(Q));var ae=Q(J,Z,H,G,K+"."+Z,r);if(ae)return ae}return null}return b(M)}function j(P){function M(U,Y,H,G,K){var J=U[Y],X=$(J);if(X!=="object")return new f("Invalid "+G+" `"+K+"` of type `"+X+"` "+("supplied to `"+H+"`, expected `object`."));var Z=t({},U[Y],P);for(var Q in Z){var ae=P[Q];if(n(P,Q)&&typeof ae!="function")return k(H,G,K,Q,F(ae));if(!ae)return new f("Invalid "+G+" `"+K+"` key `"+Q+"` supplied to `"+H+"`.\nBad object: "+JSON.stringify(U[Y],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(P),null,"  "));var L=ae(J,Q,H,G,K+"."+Q,r);if(L)return L}return null}return b(M)}function z(P){switch(typeof P){case"number":case"string":case"undefined":return!0;case"boolean":return!P;case"object":if(Array.isArray(P))return P.every(z);if(P===null||l(P))return!0;var M=v(P);if(M){var U=M.call(P),Y;if(M!==P.entries){for(;!(Y=U.next()).done;)if(!z(Y.value))return!1}else for(;!(Y=U.next()).done;){var H=Y.value;if(H&&!z(H[1]))return!1}}else return!1;return!0;default:return!1}}function q(P,M){return P==="symbol"?!0:M?M["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&M instanceof Symbol:!1}function $(P){var M=typeof P;return Array.isArray(P)?"array":P instanceof RegExp?"object":q(M,P)?"symbol":M}function F(P){if(typeof P>"u"||P===null)return""+P;var M=$(P);if(M==="object"){if(P instanceof Date)return"date";if(P instanceof RegExp)return"regexp"}return M}function W(P){var M=F(P);switch(M){case"array":case"object":return"an "+M;case"boolean":case"date":case"regexp":return"a "+M;default:return M}}function te(P){return!P.constructor||!P.constructor.name?g:P.constructor.name}return u.checkPropTypes=o,u.resetWarningCache=o.resetWarningCache,u.PropTypes=u,u},Kn}var Jn,Ia;function Op(){if(Ia)return Jn;Ia=1;var e=Vo();function t(){}function r(){}return r.resetWarningCache=t,Jn=function(){function n(s,l,c,d,m,v){if(v!==e){var g=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw g.name="Invariant Violation",g}}n.isRequired=n;function o(){return n}var a={array:n,bigint:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:o,element:n,elementType:n,instanceOf:o,node:n,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:r,resetWarningCache:t};return a.PropTypes=a,a},Jn}if(process.env.NODE_ENV!=="production"){var Rp=ui(),Pp=!0;fo.exports=Sp()(Rp.isElement,Pp)}else fo.exports=Op()();var jp=fo.exports;const i=xp(jp);function _p(e){const{prototype:t={}}=e;return!!t.isReactComponent}function fi(e,t,r,n,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let l;const c=a.type;return typeof c=="function"&&!_p(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const mi=ir(i.element,fi);mi.isRequired=ir(i.element.isRequired,fi);const qr=mi;function $p(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Mp(e,t,r,n,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let l;return typeof a=="function"&&!$p(a)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ip=ir(i.elementType,Mp),Dp="exact-prop: ​";function hi(e){return process.env.NODE_ENV==="production"?e:_({},e,{[Dp]:t=>{const r=Object.keys(t).filter(n=>!e.hasOwnProperty(n));return r.length>0?new Error(`The following props are not supported: ${r.map(n=>`\`${n}\``).join(", ")}. Please remove them.`):null}})}function Ir(e){let t="https://mui.com/production-error/?code="+e;for(let r=1;r<arguments.length;r+=1)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}const Ap=Object.freeze(Object.defineProperty({__proto__:null,default:Ir},Symbol.toStringTag,{value:"Module"}));var mo={exports:{}},pe={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Da;function Bp(){if(Da)return pe;Da=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),u=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function f(b){if(typeof b=="object"&&b!==null){var w=b.$$typeof;switch(w){case e:switch(b=b.type,b){case r:case o:case n:case d:case m:return b;default:switch(b=b&&b.$$typeof,b){case l:case s:case c:case g:case v:case a:return b;default:return w}}case t:return w}}}return pe.ContextConsumer=s,pe.ContextProvider=a,pe.Element=e,pe.ForwardRef=c,pe.Fragment=r,pe.Lazy=g,pe.Memo=v,pe.Portal=t,pe.Profiler=o,pe.StrictMode=n,pe.Suspense=d,pe.SuspenseList=m,pe.isAsyncMode=function(){return!1},pe.isConcurrentMode=function(){return!1},pe.isContextConsumer=function(b){return f(b)===s},pe.isContextProvider=function(b){return f(b)===a},pe.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===e},pe.isForwardRef=function(b){return f(b)===c},pe.isFragment=function(b){return f(b)===r},pe.isLazy=function(b){return f(b)===g},pe.isMemo=function(b){return f(b)===v},pe.isPortal=function(b){return f(b)===t},pe.isProfiler=function(b){return f(b)===o},pe.isStrictMode=function(b){return f(b)===n},pe.isSuspense=function(b){return f(b)===d},pe.isSuspenseList=function(b){return f(b)===m},pe.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===r||b===o||b===n||b===d||b===m||b===u||typeof b=="object"&&b!==null&&(b.$$typeof===g||b.$$typeof===v||b.$$typeof===a||b.$$typeof===s||b.$$typeof===c||b.$$typeof===h||b.getModuleId!==void 0)},pe.typeOf=f,pe}var ue={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Aa;function Lp(){return Aa||(Aa=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),u=Symbol.for("react.offscreen"),h=!1,f=!1,b=!1,w=!1,R=!1,x;x=Symbol.for("react.module.reference");function E(D){return!!(typeof D=="string"||typeof D=="function"||D===r||D===o||R||D===n||D===d||D===m||w||D===u||h||f||b||typeof D=="object"&&D!==null&&(D.$$typeof===g||D.$$typeof===v||D.$$typeof===a||D.$$typeof===s||D.$$typeof===c||D.$$typeof===x||D.getModuleId!==void 0))}function y(D){if(typeof D=="object"&&D!==null){var se=D.$$typeof;switch(se){case e:var Te=D.type;switch(Te){case r:case o:case n:case d:case m:return Te;default:var Pe=Te&&Te.$$typeof;switch(Pe){case l:case s:case c:case g:case v:case a:return Pe;default:return se}}case t:return se}}}var S=s,C=a,I=e,A=c,B=r,k=g,O=v,j=t,z=o,q=n,$=d,F=m,W=!1,te=!1;function P(D){return W||(W=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function M(D){return te||(te=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function U(D){return y(D)===s}function Y(D){return y(D)===a}function H(D){return typeof D=="object"&&D!==null&&D.$$typeof===e}function G(D){return y(D)===c}function K(D){return y(D)===r}function J(D){return y(D)===g}function X(D){return y(D)===v}function Z(D){return y(D)===t}function Q(D){return y(D)===o}function ae(D){return y(D)===n}function L(D){return y(D)===d}function ee(D){return y(D)===m}ue.ContextConsumer=S,ue.ContextProvider=C,ue.Element=I,ue.ForwardRef=A,ue.Fragment=B,ue.Lazy=k,ue.Memo=O,ue.Portal=j,ue.Profiler=z,ue.StrictMode=q,ue.Suspense=$,ue.SuspenseList=F,ue.isAsyncMode=P,ue.isConcurrentMode=M,ue.isContextConsumer=U,ue.isContextProvider=Y,ue.isElement=H,ue.isForwardRef=G,ue.isFragment=K,ue.isLazy=J,ue.isMemo=X,ue.isPortal=Z,ue.isProfiler=Q,ue.isStrictMode=ae,ue.isSuspense=L,ue.isSuspenseList=ee,ue.isValidElementType=E,ue.typeOf=y}()),ue}process.env.NODE_ENV==="production"?mo.exports=Bp():mo.exports=Lp();var mn=mo.exports;const Vp=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function gi(e){const t=`${e}`.match(Vp);return t&&t[1]||""}function bi(e,t=""){return e.displayName||e.name||gi(e)||t}function Ba(e,t,r){const n=bi(t);return e.displayName||(n!==""?`${r}(${n})`:r)}function Fp(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return bi(e,"Component");if(typeof e=="object")switch(e.$$typeof){case mn.ForwardRef:return Ba(e,e.render,"ForwardRef");case mn.Memo:return Ba(e,e.type,"memo");default:return}}}const zp=Object.freeze(Object.defineProperty({__proto__:null,default:Fp,getFunctionName:gi},Symbol.toStringTag,{value:"Module"}));function dt(e,t,r,n,o){if(process.env.NODE_ENV==="production")return null;const a=e[t],s=o||t;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an HTMLElement.`):null}const Up=i.oneOfType([i.func,i.object]),Fo=Up;function at(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Ir(7));return e.charAt(0).toUpperCase()+e.slice(1)}const qp=Object.freeze(Object.defineProperty({__proto__:null,default:at},Symbol.toStringTag,{value:"Module"}));function ho(...e){return e.reduce((t,r)=>r==null?t:function(...o){t.apply(this,o),r.apply(this,o)},()=>{})}function vi(e,t=166){let r;function n(...o){const a=()=>{e.apply(this,o)};clearTimeout(r),r=setTimeout(a,t)}return n.clear=()=>{clearTimeout(r)},n}function Hp(e,t){return process.env.NODE_ENV==="production"?()=>null:(r,n,o,a,s)=>{const l=o||"<<anonymous>>",c=s||n;return typeof r[n]<"u"?new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function Wp(e,t){var r,n;return N.isValidElement(e)&&t.indexOf((r=e.type.muiName)!=null?r:(n=e.type)==null||(n=n._payload)==null||(n=n.value)==null?void 0:n.muiName)!==-1}function Oe(e){return e&&e.ownerDocument||document}function er(e){return Oe(e).defaultView||window}function Gp(e,t){if(process.env.NODE_ENV==="production")return()=>null;const r=t?_({},t.propTypes):null;return o=>(a,s,l,c,d,...m)=>{const v=d||s,g=r==null?void 0:r[v];if(g){const u=g(a,s,l,c,d,...m);if(u)return u}return typeof a[s]<"u"&&!a[o]?new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function hn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Xp=typeof window<"u"?N.useLayoutEffect:N.useEffect,Bt=Xp;let La=0;function Yp(e){const[t,r]=N.useState(e),n=e||t;return N.useEffect(()=>{t==null&&(La+=1,r(`mui-${La}`))},[t]),n}const Va=N["useId".toString()];function yi(e){if(Va!==void 0){const t=Va();return e??t}return Yp(e)}function Kp(e,t,r,n,o){if(process.env.NODE_ENV==="production")return null;const a=o||t;return typeof e[t]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function wi({controlled:e,default:t,name:r,state:n="value"}){const{current:o}=N.useRef(e!==void 0),[a,s]=N.useState(t),l=o?e:a;if(process.env.NODE_ENV!=="production"){N.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${n} state of ${r} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${r} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[n,r,e]);const{current:d}=N.useRef(t);N.useEffect(()=>{!o&&!Object.is(d,t)&&console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join(`
`))},[JSON.stringify(t)])}const c=N.useCallback(d=>{o||s(d)},[]);return[l,c]}function Dr(e){const t=N.useRef(e);return Bt(()=>{t.current=e}),N.useRef((...r)=>(0,t.current)(...r)).current}function We(...e){return N.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(r=>{hn(r,t)})},e)}const Fa={};function Jp(e,t){const r=N.useRef(Fa);return r.current===Fa&&(r.current=e(t)),r}const Zp=[];function Qp(e){N.useEffect(e,Zp)}class Hr{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Hr}start(t,r){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,r()},t)}}function Tr(){const e=Jp(Hr.create).current;return Qp(e.disposeEffect),e}let Sn=!0,go=!1;const eu=new Hr,tu={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function ru(e){const{type:t,tagName:r}=e;return!!(r==="INPUT"&&tu[t]&&!e.readOnly||r==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function nu(e){e.metaKey||e.altKey||e.ctrlKey||(Sn=!0)}function Zn(){Sn=!1}function ou(){this.visibilityState==="hidden"&&go&&(Sn=!0)}function au(e){e.addEventListener("keydown",nu,!0),e.addEventListener("mousedown",Zn,!0),e.addEventListener("pointerdown",Zn,!0),e.addEventListener("touchstart",Zn,!0),e.addEventListener("visibilitychange",ou,!0)}function su(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Sn||ru(t)}function xi(){const e=N.useCallback(o=>{o!=null&&au(o.ownerDocument)},[]),t=N.useRef(!1);function r(){return t.current?(go=!0,eu.start(100,()=>{go=!1}),t.current=!1,!0):!1}function n(o){return su(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:n,onBlur:r,ref:e}}function Ei(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function iu(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function lu(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const cu=Number.isInteger||lu;function ki(e,t,r,n){const o=e[t];if(o==null||!cu(o)){const a=iu(o);return new RangeError(`Invalid ${n} \`${t}\` of type \`${a}\` supplied to \`${r}\`, expected \`integer\`.`)}return null}function Ti(e,t,...r){return e[t]===void 0?null:ki(e,t,...r)}function bo(){return null}Ti.isRequired=ki;bo.isRequired=bo;const Ni=process.env.NODE_ENV==="production"?bo:Ti;function vo(e,t){const r=_({},t);return Object.keys(e).forEach(n=>{if(n.toString().match(/^(components|slots)$/))r[n]=_({},e[n],r[n]);else if(n.toString().match(/^(componentsProps|slotProps)$/)){const o=e[n]||{},a=t[n];r[n]={},!a||!Object.keys(a)?r[n]=o:!o||!Object.keys(o)?r[n]=a:(r[n]=_({},a),Object.keys(o).forEach(s=>{r[n][s]=vo(o[s],a[s])}))}else r[n]===void 0&&(r[n]=e[n])}),r}function ht(e,t,r=void 0){const n={};return Object.keys(e).forEach(o=>{n[o]=e[o].reduce((a,s)=>{if(s){const l=t(s);l!==""&&a.push(l),r&&r[s]&&a.push(r[s])}return a},[]).join(" ")}),n}const za=e=>e,pu=()=>{let e=za;return{configure(t){e=t},generate(t){return e(t)},reset(){e=za}}},uu=pu(),Ci=uu,du={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function et(e,t,r="Mui"){const n=du[t];return n?`${r}-${n}`:`${Ci.generate(e)}-${t}`}function gt(e,t,r="Mui"){const n={};return t.forEach(o=>{n[o]=et(e,o,r)}),n}function fu(e,t=Number.MIN_SAFE_INTEGER,r=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,r))}const mu=Object.freeze(Object.defineProperty({__proto__:null,default:fu},Symbol.toStringTag,{value:"Module"}));function fe(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.includes(n))continue;r[n]=e[n]}return r}function Si(e){return typeof e=="string"}function Nr(e,t,r){return e===void 0||Si(e)?t:_({},t,{ownerState:_({},t.ownerState,r)})}function Oi(e,t=[]){if(e===void 0)return{};const r={};return Object.keys(e).filter(n=>n.match(/^on[A-Z]/)&&typeof e[n]=="function"&&!t.includes(n)).forEach(n=>{r[n]=e[n]}),r}function Ua(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(r=>!(r.match(/^on[A-Z]/)&&typeof e[r]=="function")).forEach(r=>{t[r]=e[r]}),t}function hu(e){const{getSlotProps:t,additionalProps:r,externalSlotProps:n,externalForwardedProps:o,className:a}=e;if(!t){const u=Ce(r==null?void 0:r.className,a,o==null?void 0:o.className,n==null?void 0:n.className),h=_({},r==null?void 0:r.style,o==null?void 0:o.style,n==null?void 0:n.style),f=_({},r,o,n);return u.length>0&&(f.className=u),Object.keys(h).length>0&&(f.style=h),{props:f,internalRef:void 0}}const s=Oi(_({},o,n)),l=Ua(n),c=Ua(o),d=t(s),m=Ce(d==null?void 0:d.className,r==null?void 0:r.className,a,o==null?void 0:o.className,n==null?void 0:n.className),v=_({},d==null?void 0:d.style,r==null?void 0:r.style,o==null?void 0:o.style,n==null?void 0:n.style),g=_({},d,r,c,l);return m.length>0&&(g.className=m),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:d.ref}}function gu(e,t,r){return typeof e=="function"?e(t,r):e}const bu=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Lt(e){var t;const{elementType:r,externalSlotProps:n,ownerState:o,skipResolvingSlotProps:a=!1}=e,s=fe(e,bu),l=a?{}:gu(n,o),{props:c,internalRef:d}=hu(_({},s,{externalSlotProps:l})),m=We(d,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return Nr(r,_({},c,{ref:m}),o)}const vu=N.createContext(void 0);process.env.NODE_ENV!=="production"&&(i.node,i.object);function yu(e){const{theme:t,name:r,props:n}=e;if(!t||!t.components||!t.components[r])return n;const o=t.components[r];return o.defaultProps?vo(o.defaultProps,n):!o.styleOverrides&&!o.variants?vo(o,n):n}function wu({props:e,name:t}){const r=N.useContext(vu);return yu({props:e,name:t,theme:{components:r}})}process.env.NODE_ENV!=="production"&&(i.node,i.object.isRequired);function bt(e){return wu(e)}var Wr={},Qn={exports:{}},qa;function xu(){return qa||(qa=1,function(e){function t(){return e.exports=t=Object.assign?Object.assign.bind():function(r){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var a in o)({}).hasOwnProperty.call(o,a)&&(r[a]=o[a])}return r},e.exports.__esModule=!0,e.exports.default=e.exports,t.apply(null,arguments)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}(Qn)),Qn.exports}var eo={exports:{}},Ha;function Eu(){return Ha||(Ha=1,function(e){function t(r,n){if(r==null)return{};var o={};for(var a in r)if({}.hasOwnProperty.call(r,a)){if(n.includes(a))continue;o[a]=r[a]}return o}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}(eo)),eo.exports}const ku=Tt(Ep),Tu=Tt(qp),Nu=Tt(zp),Cu=["values","unit","step"],Su=e=>{const t=Object.keys(e).map(r=>({key:r,val:e[r]}))||[];return t.sort((r,n)=>r.val-n.val),t.reduce((r,n)=>_({},r,{[n.key]:n.val}),{})};function Ri(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:r="px",step:n=5}=e,o=fe(e,Cu),a=Su(t),s=Object.keys(a);function l(g){return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${r})`}function c(g){return`@media (max-width:${(typeof t[g]=="number"?t[g]:g)-n/100}${r})`}function d(g,u){const h=s.indexOf(u);return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${r}) and (max-width:${(h!==-1&&typeof t[s[h]]=="number"?t[s[h]]:u)-n/100}${r})`}function m(g){return s.indexOf(g)+1<s.length?d(g,s[s.indexOf(g)+1]):l(g)}function v(g){const u=s.indexOf(g);return u===0?l(s[1]):u===s.length-1?c(s[u]):d(g,s[s.indexOf(g)+1]).replace("@media","@media not all and")}return _({keys:s,values:a,up:l,down:c,between:d,only:m,not:v,unit:r},o)}const Ou={borderRadius:4},Ru=Ou,Pu=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.string,i.object,i.array]):{},Nt=Pu;function Or(e,t){return t?rt(e,t,{clone:!1}):e}const zo={xs:0,sm:600,md:900,lg:1200,xl:1536},Wa={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${zo[e]}px)`};function ft(e,t,r){const n=e.theme||{};if(Array.isArray(t)){const a=n.breakpoints||Wa;return t.reduce((s,l,c)=>(s[a.up(a.keys[c])]=r(t[c]),s),{})}if(typeof t=="object"){const a=n.breakpoints||Wa;return Object.keys(t).reduce((s,l)=>{if(Object.keys(a.values||zo).indexOf(l)!==-1){const c=a.up(l);s[c]=r(t[l],l)}else{const c=l;s[c]=t[c]}return s},{})}return r(t)}function ju(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((n,o)=>{const a=e.up(o);return n[a]={},n},{}))||{}}function _u(e,t){return e.reduce((r,n)=>{const o=r[n];return(!o||Object.keys(o).length===0)&&delete r[n],r},t)}function On(e,t,r=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&r){const n=`vars.${t}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(n!=null)return n}return t.split(".").reduce((n,o)=>n&&n[o]!=null?n[o]:null,e)}function gn(e,t,r,n=r){let o;return typeof e=="function"?o=e(r):Array.isArray(e)?o=e[r]||n:o=On(e,r)||n,t&&(o=t(o,n,e)),o}function xe(e){const{prop:t,cssProperty:r=e.prop,themeKey:n,transform:o}=e,a=s=>{if(s[t]==null)return null;const l=s[t],c=s.theme,d=On(c,n)||{};return ft(s,l,v=>{let g=gn(d,o,v);return v===g&&typeof v=="string"&&(g=gn(d,o,`${t}${v==="default"?"":at(v)}`,v)),r===!1?g:{[r]:g}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[t]:Nt}:{},a.filterProps=[t],a}function $u(e){const t={};return r=>(t[r]===void 0&&(t[r]=e(r)),t[r])}const Mu={m:"margin",p:"padding"},Iu={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Ga={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Du=$u(e=>{if(e.length>2)if(Ga[e])e=Ga[e];else return[e];const[t,r]=e.split(""),n=Mu[t],o=Iu[r]||"";return Array.isArray(o)?o.map(a=>n+a):[n+o]}),Rn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Pn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Au=[...Rn,...Pn];function Gr(e,t,r,n){var o;const a=(o=On(e,t,!1))!=null?o:r;return typeof a=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${n} argument to be a number or a string, got ${s}.`),a*s):Array.isArray(a)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>a.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${s} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),a[s]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Pi(e){return Gr(e,"spacing",8,"spacing")}function Xr(e,t){if(typeof t=="string"||t==null)return t;const r=Math.abs(t),n=e(r);return t>=0?n:typeof n=="number"?-n:`-${n}`}function Bu(e,t){return r=>e.reduce((n,o)=>(n[o]=Xr(t,r),n),{})}function Lu(e,t,r,n){if(t.indexOf(r)===-1)return null;const o=Du(r),a=Bu(o,n),s=e[r];return ft(e,s,a)}function ji(e,t){const r=Pi(e.theme);return Object.keys(e).map(n=>Lu(e,t,n,r)).reduce(Or,{})}function be(e){return ji(e,Rn)}be.propTypes=process.env.NODE_ENV!=="production"?Rn.reduce((e,t)=>(e[t]=Nt,e),{}):{};be.filterProps=Rn;function ve(e){return ji(e,Pn)}ve.propTypes=process.env.NODE_ENV!=="production"?Pn.reduce((e,t)=>(e[t]=Nt,e),{}):{};ve.filterProps=Pn;process.env.NODE_ENV!=="production"&&Au.reduce((e,t)=>(e[t]=Nt,e),{});function Vu(e=8){if(e.mui)return e;const t=Pi({spacing:e}),r=(...n)=>(process.env.NODE_ENV!=="production"&&(n.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)),(n.length===0?[1]:n).map(a=>{const s=t(a);return typeof s=="number"?`${s}px`:s}).join(" "));return r.mui=!0,r}function jn(...e){const t=e.reduce((n,o)=>(o.filterProps.forEach(a=>{n[a]=o}),n),{}),r=n=>Object.keys(n).reduce((o,a)=>t[a]?Or(o,t[a](n)):o,{});return r.propTypes=process.env.NODE_ENV!=="production"?e.reduce((n,o)=>Object.assign(n,o.propTypes),{}):{},r.filterProps=e.reduce((n,o)=>n.concat(o.filterProps),[]),r}function qe(e){return typeof e!="number"?e:`${e}px solid`}function Ke(e,t){return xe({prop:e,themeKey:"borders",transform:t})}const Fu=Ke("border",qe),zu=Ke("borderTop",qe),Uu=Ke("borderRight",qe),qu=Ke("borderBottom",qe),Hu=Ke("borderLeft",qe),Wu=Ke("borderColor"),Gu=Ke("borderTopColor"),Xu=Ke("borderRightColor"),Yu=Ke("borderBottomColor"),Ku=Ke("borderLeftColor"),Ju=Ke("outline",qe),Zu=Ke("outlineColor"),_n=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Gr(e.theme,"shape.borderRadius",4,"borderRadius"),r=n=>({borderRadius:Xr(t,n)});return ft(e,e.borderRadius,r)}return null};_n.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:Nt}:{};_n.filterProps=["borderRadius"];jn(Fu,zu,Uu,qu,Hu,Wu,Gu,Xu,Yu,Ku,_n,Ju,Zu);const $n=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Gr(e.theme,"spacing",8,"gap"),r=n=>({gap:Xr(t,n)});return ft(e,e.gap,r)}return null};$n.propTypes=process.env.NODE_ENV!=="production"?{gap:Nt}:{};$n.filterProps=["gap"];const Mn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Gr(e.theme,"spacing",8,"columnGap"),r=n=>({columnGap:Xr(t,n)});return ft(e,e.columnGap,r)}return null};Mn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:Nt}:{};Mn.filterProps=["columnGap"];const In=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Gr(e.theme,"spacing",8,"rowGap"),r=n=>({rowGap:Xr(t,n)});return ft(e,e.rowGap,r)}return null};In.propTypes=process.env.NODE_ENV!=="production"?{rowGap:Nt}:{};In.filterProps=["rowGap"];const Qu=xe({prop:"gridColumn"}),ed=xe({prop:"gridRow"}),td=xe({prop:"gridAutoFlow"}),rd=xe({prop:"gridAutoColumns"}),nd=xe({prop:"gridAutoRows"}),od=xe({prop:"gridTemplateColumns"}),ad=xe({prop:"gridTemplateRows"}),sd=xe({prop:"gridTemplateAreas"}),id=xe({prop:"gridArea"});jn($n,Mn,In,Qu,ed,td,rd,nd,od,ad,sd,id);function Kt(e,t){return t==="grey"?t:e}const ld=xe({prop:"color",themeKey:"palette",transform:Kt}),cd=xe({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Kt}),pd=xe({prop:"backgroundColor",themeKey:"palette",transform:Kt});jn(ld,cd,pd);function Ve(e){return e<=1&&e!==0?`${e*100}%`:e}const ud=xe({prop:"width",transform:Ve}),Uo=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=r=>{var n,o;const a=((n=e.theme)==null||(n=n.breakpoints)==null||(n=n.values)==null?void 0:n[r])||zo[r];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:Ve(r)}};return ft(e,e.maxWidth,t)}return null};Uo.filterProps=["maxWidth"];const dd=xe({prop:"minWidth",transform:Ve}),fd=xe({prop:"height",transform:Ve}),md=xe({prop:"maxHeight",transform:Ve}),hd=xe({prop:"minHeight",transform:Ve});xe({prop:"size",cssProperty:"width",transform:Ve});xe({prop:"size",cssProperty:"height",transform:Ve});const gd=xe({prop:"boxSizing"});jn(ud,Uo,dd,fd,md,hd,gd);const bd={border:{themeKey:"borders",transform:qe},borderTop:{themeKey:"borders",transform:qe},borderRight:{themeKey:"borders",transform:qe},borderBottom:{themeKey:"borders",transform:qe},borderLeft:{themeKey:"borders",transform:qe},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:qe},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:_n},color:{themeKey:"palette",transform:Kt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Kt},backgroundColor:{themeKey:"palette",transform:Kt},p:{style:ve},pt:{style:ve},pr:{style:ve},pb:{style:ve},pl:{style:ve},px:{style:ve},py:{style:ve},padding:{style:ve},paddingTop:{style:ve},paddingRight:{style:ve},paddingBottom:{style:ve},paddingLeft:{style:ve},paddingX:{style:ve},paddingY:{style:ve},paddingInline:{style:ve},paddingInlineStart:{style:ve},paddingInlineEnd:{style:ve},paddingBlock:{style:ve},paddingBlockStart:{style:ve},paddingBlockEnd:{style:ve},m:{style:be},mt:{style:be},mr:{style:be},mb:{style:be},ml:{style:be},mx:{style:be},my:{style:be},margin:{style:be},marginTop:{style:be},marginRight:{style:be},marginBottom:{style:be},marginLeft:{style:be},marginX:{style:be},marginY:{style:be},marginInline:{style:be},marginInlineStart:{style:be},marginInlineEnd:{style:be},marginBlock:{style:be},marginBlockStart:{style:be},marginBlockEnd:{style:be},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:$n},rowGap:{style:In},columnGap:{style:Mn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ve},maxWidth:{style:Uo},minWidth:{transform:Ve},height:{transform:Ve},maxHeight:{transform:Ve},minHeight:{transform:Ve},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Yr=bd;function vd(...e){const t=e.reduce((n,o)=>n.concat(Object.keys(o)),[]),r=new Set(t);return e.every(n=>r.size===Object.keys(n).length)}function yd(e,t){return typeof e=="function"?e(t):e}function _i(){function e(r,n,o,a){const s={[r]:n,theme:o},l=a[r];if(!l)return{[r]:n};const{cssProperty:c=r,themeKey:d,transform:m,style:v}=l;if(n==null)return null;if(d==="typography"&&n==="inherit")return{[r]:n};const g=On(o,d)||{};return v?v(s):ft(s,n,h=>{let f=gn(g,m,h);return h===f&&typeof h=="string"&&(f=gn(g,m,`${r}${h==="default"?"":at(h)}`,h)),c===!1?f:{[c]:f}})}function t(r){var n;const{sx:o,theme:a={}}=r||{};if(!o)return null;const s=(n=a.unstable_sxConfig)!=null?n:Yr;function l(c){let d=c;if(typeof c=="function")d=c(a);else if(typeof c!="object")return c;if(!d)return null;const m=ju(a.breakpoints),v=Object.keys(m);let g=m;return Object.keys(d).forEach(u=>{const h=yd(d[u],a);if(h!=null)if(typeof h=="object")if(s[u])g=Or(g,e(u,h,a,s));else{const f=ft({theme:a},h,b=>({[u]:b}));vd(f,h)?g[u]=t({sx:h,theme:a}):g=Or(g,f)}else g=Or(g,e(u,h,a,s))}),_u(v,g)}return Array.isArray(o)?o.map(l):l(o)}return t}const $i=_i();$i.filterProps=["sx"];const qo=$i;function Mi(e,t){const r=this;return r.vars&&typeof r.getColorSchemeSelector=="function"?{[r.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:r.palette.mode===e?t:{}}const wd=["breakpoints","palette","spacing","shape"];function Ho(e={},...t){const{breakpoints:r={},palette:n={},spacing:o,shape:a={}}=e,s=fe(e,wd),l=Ri(r),c=Vu(o);let d=rt({breakpoints:l,direction:"ltr",components:{},palette:_({mode:"light"},n),spacing:c,shape:_({},Ru,a)},s);return d.applyStyles=Mi,d=t.reduce((m,v)=>rt(m,v),d),d.unstable_sxConfig=_({},Yr,s==null?void 0:s.unstable_sxConfig),d.unstable_sx=function(v){return qo({sx:v,theme:this})},d}const xd=Object.freeze(Object.defineProperty({__proto__:null,default:Ho,private_createBreakpoints:Ri,unstable_applyStyles:Mi},Symbol.toStringTag,{value:"Module"})),Ed=Tt(xd),kd=["sx"],Td=e=>{var t,r;const n={systemProps:{},otherProps:{}},o=(t=e==null||(r=e.theme)==null?void 0:r.unstable_sxConfig)!=null?t:Yr;return Object.keys(e).forEach(a=>{o[a]?n.systemProps[a]=e[a]:n.otherProps[a]=e[a]}),n};function Nd(e){const{sx:t}=e,r=fe(e,kd),{systemProps:n,otherProps:o}=Td(r);let a;return Array.isArray(t)?a=[n,...t]:typeof t=="function"?a=(...s)=>{const l=t(...s);return Et(l)?_({},n,l):n}:a=_({},n,t),_({},o,{sx:a})}const Cd=Object.freeze(Object.defineProperty({__proto__:null,default:qo,extendSxProp:Nd,unstable_createStyleFunctionSx:_i,unstable_defaultSxConfig:Yr},Symbol.toStringTag,{value:"Module"})),Sd=Tt(Cd);var lr=Lo;Object.defineProperty(Wr,"__esModule",{value:!0});var Od=Wr.default=zd;Wr.shouldForwardProp=cn;Wr.systemDefaultTheme=void 0;var Ue=lr(xu()),yo=lr(Eu()),Xa=Ad(Ro),Rd=ku,Pd=lr(Tu),jd=lr(Nu),_d=lr(Ed),$d=lr(Sd);const Md=["ownerState"],Id=["variants"],Dd=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Ii(e){if(typeof WeakMap!="function")return null;var t=new WeakMap,r=new WeakMap;return(Ii=function(n){return n?r:t})(e)}function Ad(e,t){if(!t&&e&&e.__esModule)return e;if(e===null||typeof e!="object"&&typeof e!="function")return{default:e};var r=Ii(t);if(r&&r.has(e))return r.get(e);var n={__proto__:null},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if(a!=="default"&&Object.prototype.hasOwnProperty.call(e,a)){var s=o?Object.getOwnPropertyDescriptor(e,a):null;s&&(s.get||s.set)?Object.defineProperty(n,a,s):n[a]=e[a]}return n.default=e,r&&r.set(e,n),n}function Bd(e){return Object.keys(e).length===0}function Ld(e){return typeof e=="string"&&e.charCodeAt(0)>96}function cn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Vd=Wr.systemDefaultTheme=(0,_d.default)(),Ya=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function nn({defaultTheme:e,theme:t,themeId:r}){return Bd(t)?e:t[r]||t}function Fd(e){return e?(t,r)=>r[e]:null}function pn(e,t){let{ownerState:r}=t,n=(0,yo.default)(t,Md);const o=typeof e=="function"?e((0,Ue.default)({ownerState:r},n)):e;if(Array.isArray(o))return o.flatMap(a=>pn(a,(0,Ue.default)({ownerState:r},n)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let l=(0,yo.default)(o,Id);return a.forEach(c=>{let d=!0;typeof c.props=="function"?d=c.props((0,Ue.default)({ownerState:r},n,r)):Object.keys(c.props).forEach(m=>{(r==null?void 0:r[m])!==c.props[m]&&n[m]!==c.props[m]&&(d=!1)}),d&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style((0,Ue.default)({ownerState:r},n,r)):c.style))}),l}return o}function zd(e={}){const{themeId:t,defaultTheme:r=Vd,rootShouldForwardProp:n=cn,slotShouldForwardProp:o=cn}=e,a=s=>(0,$d.default)((0,Ue.default)({},s,{theme:nn((0,Ue.default)({},s,{defaultTheme:r,themeId:t}))}));return a.__mui_systemSx=!0,(s,l={})=>{(0,Xa.internal_processStyles)(s,y=>y.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:c,slot:d,skipVariantsResolver:m,skipSx:v,overridesResolver:g=Fd(Ya(d))}=l,u=(0,yo.default)(l,Dd),h=m!==void 0?m:d&&d!=="Root"&&d!=="root"||!1,f=v||!1;let b;process.env.NODE_ENV!=="production"&&c&&(b=`${c}-${Ya(d||"Root")}`);let w=cn;d==="Root"||d==="root"?w=n:d?w=o:Ld(s)&&(w=void 0);const R=(0,Xa.default)(s,(0,Ue.default)({shouldForwardProp:w,label:b},u)),x=y=>typeof y=="function"&&y.__emotion_real!==y||(0,Rd.isPlainObject)(y)?S=>pn(y,(0,Ue.default)({},S,{theme:nn({theme:S.theme,defaultTheme:r,themeId:t})})):y,E=(y,...S)=>{let C=x(y);const I=S?S.map(x):[];c&&g&&I.push(k=>{const O=nn((0,Ue.default)({},k,{defaultTheme:r,themeId:t}));if(!O.components||!O.components[c]||!O.components[c].styleOverrides)return null;const j=O.components[c].styleOverrides,z={};return Object.entries(j).forEach(([q,$])=>{z[q]=pn($,(0,Ue.default)({},k,{theme:O}))}),g(k,z)}),c&&!h&&I.push(k=>{var O;const j=nn((0,Ue.default)({},k,{defaultTheme:r,themeId:t})),z=j==null||(O=j.components)==null||(O=O[c])==null?void 0:O.variants;return pn({variants:z},(0,Ue.default)({},k,{theme:j}))}),f||I.push(a);const A=I.length-S.length;if(Array.isArray(y)&&A>0){const k=new Array(A).fill("");C=[...y,...k],C.raw=[...y.raw,...k]}const B=R(C,...I);if(process.env.NODE_ENV!=="production"){let k;c&&(k=`${c}${(0,Pd.default)(d||"")}`),k===void 0&&(k=`Styled(${(0,jd.default)(s)})`),B.displayName=k}return s.muiName&&(B.muiName=s.muiName),B};return R.withConfig&&(E.withConfig=R.withConfig),E}}function Ud(e,t){return _({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}var Ee={};const qd=Tt(Ap),Hd=Tt(mu);var Di=Lo;Object.defineProperty(Ee,"__esModule",{value:!0});var bn=Ee.alpha=Vi;Ee.blend=nf;Ee.colorChannel=void 0;var Wd=Ee.darken=Go;Ee.decomposeColor=Ge;Ee.emphasize=Fi;var Ka=Ee.getContrastRatio=Zd;Ee.getLuminance=vn;Ee.hexToRgb=Ai;Ee.hslToRgb=Li;var Gd=Ee.lighten=Xo;Ee.private_safeAlpha=Qd;Ee.private_safeColorChannel=void 0;Ee.private_safeDarken=ef;Ee.private_safeEmphasize=rf;Ee.private_safeLighten=tf;Ee.recomposeColor=cr;Ee.rgbToHex=Jd;var Ja=Di(qd),Xd=Di(Hd);function Wo(e,t=0,r=1){return process.env.NODE_ENV!=="production"&&(e<t||e>r)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`),(0,Xd.default)(e,t,r)}function Ai(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let r=e.match(t);return r&&r[0].length===1&&(r=r.map(n=>n+n)),r?`rgb${r.length===4?"a":""}(${r.map((n,o)=>o<3?parseInt(n,16):Math.round(parseInt(n,16)/255*1e3)/1e3).join(", ")})`:""}function Yd(e){const t=e.toString(16);return t.length===1?`0${t}`:t}function Ge(e){if(e.type)return e;if(e.charAt(0)==="#")return Ge(Ai(e));const t=e.indexOf("("),r=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:(0,Ja.default)(9,e));let n=e.substring(t+1,e.length-1),o;if(r==="color"){if(n=n.split(" "),o=n.shift(),n.length===4&&n[3].charAt(0)==="/"&&(n[3]=n[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:(0,Ja.default)(10,o))}else n=n.split(",");return n=n.map(a=>parseFloat(a)),{type:r,values:n,colorSpace:o}}const Bi=e=>{const t=Ge(e);return t.values.slice(0,3).map((r,n)=>t.type.indexOf("hsl")!==-1&&n!==0?`${r}%`:r).join(" ")};Ee.colorChannel=Bi;const Kd=(e,t)=>{try{return Bi(e)}catch{return t&&process.env.NODE_ENV!=="production"&&console.warn(t),e}};Ee.private_safeColorChannel=Kd;function cr(e){const{type:t,colorSpace:r}=e;let{values:n}=e;return t.indexOf("rgb")!==-1?n=n.map((o,a)=>a<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(n[1]=`${n[1]}%`,n[2]=`${n[2]}%`),t.indexOf("color")!==-1?n=`${r} ${n.join(" ")}`:n=`${n.join(", ")}`,`${t}(${n})`}function Jd(e){if(e.indexOf("#")===0)return e;const{values:t}=Ge(e);return`#${t.map((r,n)=>Yd(n===3?Math.round(255*r):r)).join("")}`}function Li(e){e=Ge(e);const{values:t}=e,r=t[0],n=t[1]/100,o=t[2]/100,a=n*Math.min(o,1-o),s=(d,m=(d+r/30)%12)=>o-a*Math.max(Math.min(m-3,9-m,1),-1);let l="rgb";const c=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),cr({type:l,values:c})}function vn(e){e=Ge(e);let t=e.type==="hsl"||e.type==="hsla"?Ge(Li(e)).values:e.values;return t=t.map(r=>(e.type!=="color"&&(r/=255),r<=.03928?r/12.92:((r+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Zd(e,t){const r=vn(e),n=vn(t);return(Math.max(r,n)+.05)/(Math.min(r,n)+.05)}function Vi(e,t){return e=Ge(e),t=Wo(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,cr(e)}function Qd(e,t,r){try{return Vi(e,t)}catch{return r&&process.env.NODE_ENV!=="production"&&console.warn(r),e}}function Go(e,t){if(e=Ge(e),t=Wo(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]*=1-t;return cr(e)}function ef(e,t,r){try{return Go(e,t)}catch{return r&&process.env.NODE_ENV!=="production"&&console.warn(r),e}}function Xo(e,t){if(e=Ge(e),t=Wo(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(255-e.values[r])*t;else if(e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(1-e.values[r])*t;return cr(e)}function tf(e,t,r){try{return Xo(e,t)}catch{return r&&process.env.NODE_ENV!=="production"&&console.warn(r),e}}function Fi(e,t=.15){return vn(e)>.5?Go(e,t):Xo(e,t)}function rf(e,t,r){try{return Fi(e,t)}catch{return r&&process.env.NODE_ENV!=="production"&&console.warn(r),e}}function nf(e,t,r,n=1){const o=(c,d)=>Math.round((c**(1/n)*(1-r)+d**(1/n)*r)**n),a=Ge(e),s=Ge(t),l=[o(a.values[0],s.values[0]),o(a.values[1],s.values[1]),o(a.values[2],s.values[2])];return cr({type:"rgb",values:l})}const of={black:"#000",white:"#fff"},Ar=of,af={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},sf=af,lf={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},zt=lf,cf={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Ut=cf,pf={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},br=pf,uf={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},qt=uf,df={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Ht=df,ff={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Wt=ff,mf=["mode","contrastThreshold","tonalOffset"],Za={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Ar.white,default:Ar.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},to={text:{primary:Ar.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Ar.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Qa(e,t,r,n){const o=n.light||n,a=n.dark||n*1.5;e[t]||(e.hasOwnProperty(r)?e[t]=e[r]:t==="light"?e.light=Gd(e.main,o):t==="dark"&&(e.dark=Wd(e.main,a)))}function hf(e="light"){return e==="dark"?{main:qt[200],light:qt[50],dark:qt[400]}:{main:qt[700],light:qt[400],dark:qt[800]}}function gf(e="light"){return e==="dark"?{main:zt[200],light:zt[50],dark:zt[400]}:{main:zt[500],light:zt[300],dark:zt[700]}}function bf(e="light"){return e==="dark"?{main:Ut[500],light:Ut[300],dark:Ut[700]}:{main:Ut[700],light:Ut[400],dark:Ut[800]}}function vf(e="light"){return e==="dark"?{main:Ht[400],light:Ht[300],dark:Ht[700]}:{main:Ht[700],light:Ht[500],dark:Ht[900]}}function yf(e="light"){return e==="dark"?{main:Wt[400],light:Wt[300],dark:Wt[700]}:{main:Wt[800],light:Wt[500],dark:Wt[900]}}function wf(e="light"){return e==="dark"?{main:br[400],light:br[300],dark:br[700]}:{main:"#ed6c02",light:br[500],dark:br[900]}}function xf(e){const{mode:t="light",contrastThreshold:r=3,tonalOffset:n=.2}=e,o=fe(e,mf),a=e.primary||hf(t),s=e.secondary||gf(t),l=e.error||bf(t),c=e.info||vf(t),d=e.success||yf(t),m=e.warning||wf(t);function v(f){const b=Ka(f,to.text.primary)>=r?to.text.primary:Za.text.primary;if(process.env.NODE_ENV!=="production"){const w=Ka(f,b);w<3&&console.error([`MUI: The contrast ratio of ${w}:1 for ${b} on ${f}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return b}const g=({color:f,name:b,mainShade:w=500,lightShade:R=300,darkShade:x=700})=>{if(f=_({},f),!f.main&&f[w]&&(f.main=f[w]),!f.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${w}\` property.`:Ir(11,b?` (${b})`:"",w));if(typeof f.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(f.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Ir(12,b?` (${b})`:"",JSON.stringify(f.main)));return Qa(f,"light",R,n),Qa(f,"dark",x,n),f.contrastText||(f.contrastText=v(f.main)),f},u={dark:to,light:Za};return process.env.NODE_ENV!=="production"&&(u[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),rt(_({common:_({},Ar),mode:t,primary:g({color:a,name:"primary"}),secondary:g({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:g({color:l,name:"error"}),warning:g({color:m,name:"warning"}),info:g({color:c,name:"info"}),success:g({color:d,name:"success"}),grey:sf,contrastThreshold:r,getContrastText:v,augmentColor:g,tonalOffset:n},u[t]),o)}const Ef=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function kf(e){return Math.round(e*1e5)/1e5}const es={textTransform:"uppercase"},ts='"Roboto", "Helvetica", "Arial", sans-serif';function Tf(e,t){const r=typeof t=="function"?t(e):t,{fontFamily:n=ts,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:s=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:d=16,allVariants:m,pxToRem:v}=r,g=fe(r,Ef);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof d!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const u=o/14,h=v||(w=>`${w/d*u}rem`),f=(w,R,x,E,y)=>_({fontFamily:n,fontWeight:w,fontSize:h(R),lineHeight:x},n===ts?{letterSpacing:`${kf(E/R)}em`}:{},y,m),b={h1:f(a,96,1.167,-1.5),h2:f(a,60,1.2,-.5),h3:f(s,48,1.167,0),h4:f(s,34,1.235,.25),h5:f(s,24,1.334,0),h6:f(l,20,1.6,.15),subtitle1:f(s,16,1.75,.15),subtitle2:f(l,14,1.57,.1),body1:f(s,16,1.5,.15),body2:f(s,14,1.43,.15),button:f(l,14,1.75,.4,es),caption:f(s,12,1.66,.4),overline:f(s,12,2.66,1,es),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return rt(_({htmlFontSize:d,pxToRem:h,fontFamily:n,fontSize:o,fontWeightLight:a,fontWeightRegular:s,fontWeightMedium:l,fontWeightBold:c},b),g,{clone:!1})}const Nf=.2,Cf=.14,Sf=.12;function he(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Nf})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Cf})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Sf})`].join(",")}const Of=["none",he(0,2,1,-1,0,1,1,0,0,1,3,0),he(0,3,1,-2,0,2,2,0,0,1,5,0),he(0,3,3,-2,0,3,4,0,0,1,8,0),he(0,2,4,-1,0,4,5,0,0,1,10,0),he(0,3,5,-1,0,5,8,0,0,1,14,0),he(0,3,5,-1,0,6,10,0,0,1,18,0),he(0,4,5,-2,0,7,10,1,0,2,16,1),he(0,5,5,-3,0,8,10,1,0,3,14,2),he(0,5,6,-3,0,9,12,1,0,3,16,2),he(0,6,6,-3,0,10,14,1,0,4,18,3),he(0,6,7,-4,0,11,15,1,0,4,20,3),he(0,7,8,-4,0,12,17,2,0,5,22,4),he(0,7,8,-4,0,13,19,2,0,5,24,4),he(0,7,9,-4,0,14,21,2,0,5,26,4),he(0,8,9,-5,0,15,22,2,0,6,28,5),he(0,8,10,-5,0,16,24,2,0,6,30,5),he(0,8,11,-5,0,17,26,2,0,6,32,5),he(0,9,11,-5,0,18,28,2,0,7,34,6),he(0,9,12,-6,0,19,29,2,0,7,36,6),he(0,10,13,-6,0,20,31,3,0,8,38,7),he(0,10,13,-6,0,21,33,3,0,8,40,7),he(0,10,14,-6,0,22,35,3,0,8,42,7),he(0,11,14,-7,0,23,36,3,0,9,44,8),he(0,11,15,-7,0,24,38,3,0,9,46,8)],Rf=Of,Pf=["duration","easing","delay"],jf={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},_f={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function rs(e){return`${Math.round(e)}ms`}function $f(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Mf(e){const t=_({},jf,e.easing),r=_({},_f,e.duration);return _({getAutoHeightDuration:$f,create:(o=["all"],a={})=>{const{duration:s=r.standard,easing:l=t.easeInOut,delay:c=0}=a,d=fe(a,Pf);if(process.env.NODE_ENV!=="production"){const m=g=>typeof g=="string",v=g=>!isNaN(parseFloat(g));!m(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!v(s)&&!m(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),m(l)||console.error('MUI: Argument "easing" must be a string.'),!v(c)&&!m(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(d).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(m=>`${m} ${typeof s=="string"?s:rs(s)} ${l} ${typeof c=="string"?c:rs(c)}`).join(",")}},e,{easing:t,duration:r})}const If={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Df=If,Af=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Bf(e={},...t){const{mixins:r={},palette:n={},transitions:o={},typography:a={}}=e,s=fe(e,Af);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Ir(18));const l=xf(n),c=Ho(e);let d=rt(c,{mixins:Ud(c.breakpoints,r),palette:l,shadows:Rf.slice(),typography:Tf(l,a),transitions:Mf(o),zIndex:_({},Df)});if(d=rt(d,s),d=t.reduce((m,v)=>rt(m,v),d),process.env.NODE_ENV!=="production"){const m=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],v=(g,u)=>{let h;for(h in g){const f=g[h];if(m.indexOf(h)!==-1&&Object.keys(f).length>0){if(process.env.NODE_ENV!=="production"){const b=et("",h);console.error([`MUI: The \`${u}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(g,null,2),"",`Instead, you need to use the '&.${b}' syntax:`,JSON.stringify({root:{[`&.${b}`]:f}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}g[h]={}}}};Object.keys(d.components).forEach(g=>{const u=d.components[g].styleOverrides;u&&g.indexOf("Mui")===0&&v(u,g)})}return d.unstable_sxConfig=_({},Yr,s==null?void 0:s.unstable_sxConfig),d.unstable_sx=function(v){return qo({sx:v,theme:this})},d}const Lf=Bf(),zi=Lf,Ui="$$material";function Vf(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Ff=e=>Vf(e)&&e!=="classes",qi=Ff,zf=Od({themeId:Ui,defaultTheme:zi,rootShouldForwardProp:qi}),Re=zf;function Uf(e){return et("MuiSvgIcon",e)}gt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const qf=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Hf=e=>{const{color:t,fontSize:r,classes:n}=e,o={root:["root",t!=="inherit"&&`color${at(t)}`,`fontSize${at(r)}`]};return ht(o,Uf,n)},Wf=Re("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.color!=="inherit"&&t[`color${at(r.color)}`],t[`fontSize${at(r.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var r,n,o,a,s,l,c,d,m,v,g,u,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(r=e.transitions)==null||(n=r.create)==null?void 0:n.call(r,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((d=e.typography)==null||(m=d.pxToRem)==null?void 0:m.call(d,35))||"2.1875rem"}[t.fontSize],color:(v=(g=(e.vars||e).palette)==null||(g=g[t.color])==null?void 0:g.main)!=null?v:{action:(u=(e.vars||e).palette)==null||(u=u.action)==null?void 0:u.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),Yo=N.forwardRef(function(t,r){const n=bt({props:t,name:"MuiSvgIcon"}),{children:o,className:a,color:s="inherit",component:l="svg",fontSize:c="medium",htmlColor:d,inheritViewBox:m=!1,titleAccess:v,viewBox:g="0 0 24 24"}=n,u=fe(n,qf),h=N.isValidElement(o)&&o.type==="svg",f=_({},n,{color:s,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:m,viewBox:g,hasSvgAsChild:h}),b={};m||(b.viewBox=g);const w=Hf(f);return p.jsxs(Wf,_({as:l,className:Ce(w.root,a),focusable:"false",color:d,"aria-hidden":v?void 0:!0,role:v?"img":void 0,ref:r},b,u,h&&o.props,{ownerState:f,children:[h?o.props.children:o,v?p.jsx("title",{children:v}):null]}))});process.env.NODE_ENV!=="production"&&(Yo.propTypes={children:i.node,classes:i.object,className:i.string,color:i.oneOfType([i.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),i.string]),component:i.elementType,fontSize:i.oneOfType([i.oneOf(["inherit","large","medium","small"]),i.string]),htmlColor:i.string,inheritViewBox:i.bool,shapeRendering:i.string,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),titleAccess:i.string,viewBox:i.string});Yo.muiName="SvgIcon";const ns=Yo;function Hi(e,t){function r(n,o){return p.jsx(ns,_({"data-testid":`${t}Icon`,ref:o},n,{children:e}))}return process.env.NODE_ENV!=="production"&&(r.displayName=`${t}Icon`),r.muiName=ns.muiName,N.memo(N.forwardRef(r))}const Gf={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Ci.configure(e)}},Xf=Object.freeze(Object.defineProperty({__proto__:null,capitalize:at,createChainedFunction:ho,createSvgIcon:Hi,debounce:vi,deprecatedPropType:Hp,isMuiElement:Wp,ownerDocument:Oe,ownerWindow:er,requirePropFactory:Gp,setRef:hn,unstable_ClassNameGenerator:Gf,unstable_useEnhancedEffect:Bt,unstable_useId:yi,unsupportedProp:Kp,useControlled:wi,useEventCallback:Dr,useForkRef:We,useIsFocusVisible:xi},Symbol.toStringTag,{value:"Module"})),Yf=Tt(Xf);var os;function Kf(){return os||(os=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Yf}(Hn)),Hn}var Jf=Lo;Object.defineProperty(Bo,"__esModule",{value:!0});var Wi=Bo.default=void 0,Zf=Jf(Kf()),Qf=p;Wi=Bo.default=(0,Zf.default)((0,Qf.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");const em=N.createContext();process.env.NODE_ENV!=="production"&&(i.node,i.bool);const Gi=()=>{const e=N.useContext(em);return e??!1};function tm(e){return Object.keys(e).length===0}function rm(e=null){const t=N.useContext(Ro.ThemeContext);return!t||tm(t)?e:t}const nm=Ho();function om(e=nm){return rm(e)}function Dn(){const e=om(zi);return process.env.NODE_ENV!=="production"&&N.useDebugValue(e),e[Ui]||e}const am=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},as=am;function wo(e,t){return wo=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},wo(e,t)}function sm(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,wo(e,t)}const ss={disabled:!1};var im=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.shape({enter:i.number,exit:i.number,appear:i.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&i.oneOfType([i.string,i.shape({enter:i.string,exit:i.string,active:i.string}),i.shape({enter:i.string,enterDone:i.string,enterActive:i.string,exit:i.string,exitDone:i.string,exitActive:i.string})]);const Xi=T.createContext(null);var lm=function(t){return t.scrollTop},Cr="unmounted",Pt="exited",jt="entering",Yt="entered",xo="exiting",vt=function(e){sm(t,e);function t(n,o){var a;a=e.call(this,n,o)||this;var s=o,l=s&&!s.isMounting?n.enter:n.appear,c;return a.appearStatus=null,n.in?l?(c=Pt,a.appearStatus=jt):c=Yt:n.unmountOnExit||n.mountOnEnter?c=Cr:c=Pt,a.state={status:c},a.nextCallback=null,a}t.getDerivedStateFromProps=function(o,a){var s=o.in;return s&&a.status===Cr?{status:Pt}:null};var r=t.prototype;return r.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},r.componentDidUpdate=function(o){var a=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==jt&&s!==Yt&&(a=jt):(s===jt||s===Yt)&&(a=xo)}this.updateStatus(!1,a)},r.componentWillUnmount=function(){this.cancelNextCallback()},r.getTimeouts=function(){var o=this.props.timeout,a,s,l;return a=s=l=o,o!=null&&typeof o!="number"&&(a=o.exit,s=o.enter,l=o.appear!==void 0?o.appear:s),{exit:a,enter:s,appear:l}},r.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===jt){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:Er.findDOMNode(this);s&&lm(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Pt&&this.setState({status:Cr})},r.performEnter=function(o){var a=this,s=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[Er.findDOMNode(this),l],d=c[0],m=c[1],v=this.getTimeouts(),g=l?v.appear:v.enter;if(!o&&!s||ss.disabled){this.safeSetState({status:Yt},function(){a.props.onEntered(d)});return}this.props.onEnter(d,m),this.safeSetState({status:jt},function(){a.props.onEntering(d,m),a.onTransitionEnd(g,function(){a.safeSetState({status:Yt},function(){a.props.onEntered(d,m)})})})},r.performExit=function(){var o=this,a=this.props.exit,s=this.getTimeouts(),l=this.props.nodeRef?void 0:Er.findDOMNode(this);if(!a||ss.disabled){this.safeSetState({status:Pt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:xo},function(){o.props.onExiting(l),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:Pt},function(){o.props.onExited(l)})})})},r.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},r.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},r.setNextCallback=function(o){var a=this,s=!0;return this.nextCallback=function(l){s&&(s=!1,a.nextCallback=null,o(l))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},r.onTransitionEnd=function(o,a){this.setNextCallback(a);var s=this.props.nodeRef?this.props.nodeRef.current:Er.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!s||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],d=c[0],m=c[1];this.props.addEndListener(d,m)}o!=null&&setTimeout(this.nextCallback,o)},r.render=function(){var o=this.state.status;if(o===Cr)return null;var a=this.props,s=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var l=fe(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return T.createElement(Xi.Provider,{value:null},typeof s=="function"?s(o,l):T.cloneElement(T.Children.only(s),l))},t}(T.Component);vt.contextType=Xi;vt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:i.shape({current:typeof Element>"u"?i.any:function(e,t,r,n,o,a){var s=e[t];return i.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,r,n,o,a)}}),children:i.oneOfType([i.func.isRequired,i.element.isRequired]).isRequired,in:i.bool,mountOnEnter:i.bool,unmountOnExit:i.bool,appear:i.bool,enter:i.bool,exit:i.bool,timeout:function(t){var r=im;t.addEndListener||(r=r.isRequired);for(var n=arguments.length,o=new Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=arguments[a];return r.apply(void 0,[t].concat(o))},addEndListener:i.func,onEnter:i.func,onEntering:i.func,onEntered:i.func,onExit:i.func,onExiting:i.func,onExited:i.func}:{};function Gt(){}vt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Gt,onEntering:Gt,onEntered:Gt,onExit:Gt,onExiting:Gt,onExited:Gt};vt.UNMOUNTED=Cr;vt.EXITED=Pt;vt.ENTERING=jt;vt.ENTERED=Yt;vt.EXITING=xo;const Yi=vt,Ki=e=>e.scrollTop;function yn(e,t){var r,n;const{timeout:o,easing:a,style:s={}}=e;return{duration:(r=s.transitionDuration)!=null?r:typeof o=="number"?o:o[t.mode]||0,easing:(n=s.transitionTimingFunction)!=null?n:typeof a=="object"?a[t.mode]:a,delay:s.transitionDelay}}const cm=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function Eo(e){return`scale(${e}, ${e**2})`}const pm={entering:{opacity:1,transform:Eo(1)},entered:{opacity:1,transform:"none"}},ro=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Ko=N.forwardRef(function(t,r){const{addEndListener:n,appear:o=!0,children:a,easing:s,in:l,onEnter:c,onEntered:d,onEntering:m,onExit:v,onExited:g,onExiting:u,style:h,timeout:f="auto",TransitionComponent:b=Yi}=t,w=fe(t,cm),R=Tr(),x=N.useRef(),E=Dn(),y=N.useRef(null),S=We(y,a.ref,r),C=q=>$=>{if(q){const F=y.current;$===void 0?q(F):q(F,$)}},I=C(m),A=C((q,$)=>{Ki(q);const{duration:F,delay:W,easing:te}=yn({style:h,timeout:f,easing:s},{mode:"enter"});let P;f==="auto"?(P=E.transitions.getAutoHeightDuration(q.clientHeight),x.current=P):P=F,q.style.transition=[E.transitions.create("opacity",{duration:P,delay:W}),E.transitions.create("transform",{duration:ro?P:P*.666,delay:W,easing:te})].join(","),c&&c(q,$)}),B=C(d),k=C(u),O=C(q=>{const{duration:$,delay:F,easing:W}=yn({style:h,timeout:f,easing:s},{mode:"exit"});let te;f==="auto"?(te=E.transitions.getAutoHeightDuration(q.clientHeight),x.current=te):te=$,q.style.transition=[E.transitions.create("opacity",{duration:te,delay:F}),E.transitions.create("transform",{duration:ro?te:te*.666,delay:ro?F:F||te*.333,easing:W})].join(","),q.style.opacity=0,q.style.transform=Eo(.75),v&&v(q)}),j=C(g),z=q=>{f==="auto"&&R.start(x.current||0,q),n&&n(y.current,q)};return p.jsx(b,_({appear:o,in:l,nodeRef:y,onEnter:A,onEntered:B,onEntering:I,onExit:O,onExited:j,onExiting:k,addEndListener:z,timeout:f==="auto"?null:f},w,{children:(q,$)=>N.cloneElement(a,_({style:_({opacity:0,transform:Eo(.75),visibility:q==="exited"&&!l?"hidden":void 0},pm[q],h,a.props.style),ref:S},$))}))});process.env.NODE_ENV!=="production"&&(Ko.propTypes={addEndListener:i.func,appear:i.bool,children:qr.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});Ko.muiSupportAuto=!0;const ko=Ko;var Jo={};Object.defineProperty(Jo,"__esModule",{value:!0});var Ji=Jo.default=void 0,um=fm(T),dm=Ro;function Zi(e){if(typeof WeakMap!="function")return null;var t=new WeakMap,r=new WeakMap;return(Zi=function(n){return n?r:t})(e)}function fm(e,t){if(!t&&e&&e.__esModule)return e;if(e===null||typeof e!="object"&&typeof e!="function")return{default:e};var r=Zi(t);if(r&&r.has(e))return r.get(e);var n={__proto__:null},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if(a!=="default"&&Object.prototype.hasOwnProperty.call(e,a)){var s=o?Object.getOwnPropertyDescriptor(e,a):null;s&&(s.get||s.set)?Object.defineProperty(n,a,s):n[a]=e[a]}return n.default=e,r&&r.set(e,n),n}function mm(e){return Object.keys(e).length===0}function hm(e=null){const t=um.useContext(dm.ThemeContext);return!t||mm(t)?e:t}Ji=Jo.default=hm;var $e="top",Xe="bottom",Ye="right",Me="left",Zo="auto",Kr=[$e,Xe,Ye,Me],tr="start",Br="end",gm="clippingParents",Qi="viewport",vr="popper",bm="reference",is=Kr.reduce(function(e,t){return e.concat([t+"-"+tr,t+"-"+Br])},[]),el=[].concat(Kr,[Zo]).reduce(function(e,t){return e.concat([t,t+"-"+tr,t+"-"+Br])},[]),vm="beforeRead",ym="read",wm="afterRead",xm="beforeMain",Em="main",km="afterMain",Tm="beforeWrite",Nm="write",Cm="afterWrite",Sm=[vm,ym,wm,xm,Em,km,Tm,Nm,Cm];function st(e){return e?(e.nodeName||"").toLowerCase():null}function Fe(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Vt(e){var t=Fe(e).Element;return e instanceof t||e instanceof Element}function He(e){var t=Fe(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Qo(e){if(typeof ShadowRoot>"u")return!1;var t=Fe(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Om(e){var t=e.state;Object.keys(t.elements).forEach(function(r){var n=t.styles[r]||{},o=t.attributes[r]||{},a=t.elements[r];!He(a)||!st(a)||(Object.assign(a.style,n),Object.keys(o).forEach(function(s){var l=o[s];l===!1?a.removeAttribute(s):a.setAttribute(s,l===!0?"":l)}))})}function Rm(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,r.popper),t.styles=r,t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach(function(n){var o=t.elements[n],a=t.attributes[n]||{},s=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:r[n]),l=s.reduce(function(c,d){return c[d]="",c},{});!He(o)||!st(o)||(Object.assign(o.style,l),Object.keys(a).forEach(function(c){o.removeAttribute(c)}))})}}const Pm={name:"applyStyles",enabled:!0,phase:"write",fn:Om,effect:Rm,requires:["computeStyles"]};function nt(e){return e.split("-")[0]}var It=Math.max,wn=Math.min,rr=Math.round;function To(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function tl(){return!/^((?!chrome|android).)*safari/i.test(To())}function nr(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!1);var n=e.getBoundingClientRect(),o=1,a=1;t&&He(e)&&(o=e.offsetWidth>0&&rr(n.width)/e.offsetWidth||1,a=e.offsetHeight>0&&rr(n.height)/e.offsetHeight||1);var s=Vt(e)?Fe(e):window,l=s.visualViewport,c=!tl()&&r,d=(n.left+(c&&l?l.offsetLeft:0))/o,m=(n.top+(c&&l?l.offsetTop:0))/a,v=n.width/o,g=n.height/a;return{width:v,height:g,top:m,right:d+v,bottom:m+g,left:d,x:d,y:m}}function ea(e){var t=nr(e),r=e.offsetWidth,n=e.offsetHeight;return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:n}}function rl(e,t){var r=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(r&&Qo(r)){var n=t;do{if(n&&e.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function mt(e){return Fe(e).getComputedStyle(e)}function jm(e){return["table","td","th"].indexOf(st(e))>=0}function Ct(e){return((Vt(e)?e.ownerDocument:e.document)||window.document).documentElement}function An(e){return st(e)==="html"?e:e.assignedSlot||e.parentNode||(Qo(e)?e.host:null)||Ct(e)}function ls(e){return!He(e)||mt(e).position==="fixed"?null:e.offsetParent}function _m(e){var t=/firefox/i.test(To()),r=/Trident/i.test(To());if(r&&He(e)){var n=mt(e);if(n.position==="fixed")return null}var o=An(e);for(Qo(o)&&(o=o.host);He(o)&&["html","body"].indexOf(st(o))<0;){var a=mt(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function Jr(e){for(var t=Fe(e),r=ls(e);r&&jm(r)&&mt(r).position==="static";)r=ls(r);return r&&(st(r)==="html"||st(r)==="body"&&mt(r).position==="static")?t:r||_m(e)||t}function ta(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Rr(e,t,r){return It(e,wn(t,r))}function $m(e,t,r){var n=Rr(e,t,r);return n>r?r:n}function nl(){return{top:0,right:0,bottom:0,left:0}}function ol(e){return Object.assign({},nl(),e)}function al(e,t){return t.reduce(function(r,n){return r[n]=e,r},{})}var Mm=function(t,r){return t=typeof t=="function"?t(Object.assign({},r.rects,{placement:r.placement})):t,ol(typeof t!="number"?t:al(t,Kr))};function Im(e){var t,r=e.state,n=e.name,o=e.options,a=r.elements.arrow,s=r.modifiersData.popperOffsets,l=nt(r.placement),c=ta(l),d=[Me,Ye].indexOf(l)>=0,m=d?"height":"width";if(!(!a||!s)){var v=Mm(o.padding,r),g=ea(a),u=c==="y"?$e:Me,h=c==="y"?Xe:Ye,f=r.rects.reference[m]+r.rects.reference[c]-s[c]-r.rects.popper[m],b=s[c]-r.rects.reference[c],w=Jr(a),R=w?c==="y"?w.clientHeight||0:w.clientWidth||0:0,x=f/2-b/2,E=v[u],y=R-g[m]-v[h],S=R/2-g[m]/2+x,C=Rr(E,S,y),I=c;r.modifiersData[n]=(t={},t[I]=C,t.centerOffset=C-S,t)}}function Dm(e){var t=e.state,r=e.options,n=r.element,o=n===void 0?"[data-popper-arrow]":n;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||rl(t.elements.popper,o)&&(t.elements.arrow=o))}const Am={name:"arrow",enabled:!0,phase:"main",fn:Im,effect:Dm,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function or(e){return e.split("-")[1]}var Bm={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Lm(e,t){var r=e.x,n=e.y,o=t.devicePixelRatio||1;return{x:rr(r*o)/o||0,y:rr(n*o)/o||0}}function cs(e){var t,r=e.popper,n=e.popperRect,o=e.placement,a=e.variation,s=e.offsets,l=e.position,c=e.gpuAcceleration,d=e.adaptive,m=e.roundOffsets,v=e.isFixed,g=s.x,u=g===void 0?0:g,h=s.y,f=h===void 0?0:h,b=typeof m=="function"?m({x:u,y:f}):{x:u,y:f};u=b.x,f=b.y;var w=s.hasOwnProperty("x"),R=s.hasOwnProperty("y"),x=Me,E=$e,y=window;if(d){var S=Jr(r),C="clientHeight",I="clientWidth";if(S===Fe(r)&&(S=Ct(r),mt(S).position!=="static"&&l==="absolute"&&(C="scrollHeight",I="scrollWidth")),S=S,o===$e||(o===Me||o===Ye)&&a===Br){E=Xe;var A=v&&S===y&&y.visualViewport?y.visualViewport.height:S[C];f-=A-n.height,f*=c?1:-1}if(o===Me||(o===$e||o===Xe)&&a===Br){x=Ye;var B=v&&S===y&&y.visualViewport?y.visualViewport.width:S[I];u-=B-n.width,u*=c?1:-1}}var k=Object.assign({position:l},d&&Bm),O=m===!0?Lm({x:u,y:f},Fe(r)):{x:u,y:f};if(u=O.x,f=O.y,c){var j;return Object.assign({},k,(j={},j[E]=R?"0":"",j[x]=w?"0":"",j.transform=(y.devicePixelRatio||1)<=1?"translate("+u+"px, "+f+"px)":"translate3d("+u+"px, "+f+"px, 0)",j))}return Object.assign({},k,(t={},t[E]=R?f+"px":"",t[x]=w?u+"px":"",t.transform="",t))}function Vm(e){var t=e.state,r=e.options,n=r.gpuAcceleration,o=n===void 0?!0:n,a=r.adaptive,s=a===void 0?!0:a,l=r.roundOffsets,c=l===void 0?!0:l,d={placement:nt(t.placement),variation:or(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,cs(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,cs(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Fm={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Vm,data:{}};var on={passive:!0};function zm(e){var t=e.state,r=e.instance,n=e.options,o=n.scroll,a=o===void 0?!0:o,s=n.resize,l=s===void 0?!0:s,c=Fe(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&d.forEach(function(m){m.addEventListener("scroll",r.update,on)}),l&&c.addEventListener("resize",r.update,on),function(){a&&d.forEach(function(m){m.removeEventListener("scroll",r.update,on)}),l&&c.removeEventListener("resize",r.update,on)}}const Um={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:zm,data:{}};var qm={left:"right",right:"left",bottom:"top",top:"bottom"};function un(e){return e.replace(/left|right|bottom|top/g,function(t){return qm[t]})}var Hm={start:"end",end:"start"};function ps(e){return e.replace(/start|end/g,function(t){return Hm[t]})}function ra(e){var t=Fe(e),r=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:r,scrollTop:n}}function na(e){return nr(Ct(e)).left+ra(e).scrollLeft}function Wm(e,t){var r=Fe(e),n=Ct(e),o=r.visualViewport,a=n.clientWidth,s=n.clientHeight,l=0,c=0;if(o){a=o.width,s=o.height;var d=tl();(d||!d&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:a,height:s,x:l+na(e),y:c}}function Gm(e){var t,r=Ct(e),n=ra(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=It(r.scrollWidth,r.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=It(r.scrollHeight,r.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-n.scrollLeft+na(e),c=-n.scrollTop;return mt(o||r).direction==="rtl"&&(l+=It(r.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:l,y:c}}function oa(e){var t=mt(e),r=t.overflow,n=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(r+o+n)}function sl(e){return["html","body","#document"].indexOf(st(e))>=0?e.ownerDocument.body:He(e)&&oa(e)?e:sl(An(e))}function Pr(e,t){var r;t===void 0&&(t=[]);var n=sl(e),o=n===((r=e.ownerDocument)==null?void 0:r.body),a=Fe(n),s=o?[a].concat(a.visualViewport||[],oa(n)?n:[]):n,l=t.concat(s);return o?l:l.concat(Pr(An(s)))}function No(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Xm(e,t){var r=nr(e,!1,t==="fixed");return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}function us(e,t,r){return t===Qi?No(Wm(e,r)):Vt(t)?Xm(t,r):No(Gm(Ct(e)))}function Ym(e){var t=Pr(An(e)),r=["absolute","fixed"].indexOf(mt(e).position)>=0,n=r&&He(e)?Jr(e):e;return Vt(n)?t.filter(function(o){return Vt(o)&&rl(o,n)&&st(o)!=="body"}):[]}function Km(e,t,r,n){var o=t==="clippingParents"?Ym(e):[].concat(t),a=[].concat(o,[r]),s=a[0],l=a.reduce(function(c,d){var m=us(e,d,n);return c.top=It(m.top,c.top),c.right=wn(m.right,c.right),c.bottom=wn(m.bottom,c.bottom),c.left=It(m.left,c.left),c},us(e,s,n));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function il(e){var t=e.reference,r=e.element,n=e.placement,o=n?nt(n):null,a=n?or(n):null,s=t.x+t.width/2-r.width/2,l=t.y+t.height/2-r.height/2,c;switch(o){case $e:c={x:s,y:t.y-r.height};break;case Xe:c={x:s,y:t.y+t.height};break;case Ye:c={x:t.x+t.width,y:l};break;case Me:c={x:t.x-r.width,y:l};break;default:c={x:t.x,y:t.y}}var d=o?ta(o):null;if(d!=null){var m=d==="y"?"height":"width";switch(a){case tr:c[d]=c[d]-(t[m]/2-r[m]/2);break;case Br:c[d]=c[d]+(t[m]/2-r[m]/2);break}}return c}function Lr(e,t){t===void 0&&(t={});var r=t,n=r.placement,o=n===void 0?e.placement:n,a=r.strategy,s=a===void 0?e.strategy:a,l=r.boundary,c=l===void 0?gm:l,d=r.rootBoundary,m=d===void 0?Qi:d,v=r.elementContext,g=v===void 0?vr:v,u=r.altBoundary,h=u===void 0?!1:u,f=r.padding,b=f===void 0?0:f,w=ol(typeof b!="number"?b:al(b,Kr)),R=g===vr?bm:vr,x=e.rects.popper,E=e.elements[h?R:g],y=Km(Vt(E)?E:E.contextElement||Ct(e.elements.popper),c,m,s),S=nr(e.elements.reference),C=il({reference:S,element:x,strategy:"absolute",placement:o}),I=No(Object.assign({},x,C)),A=g===vr?I:S,B={top:y.top-A.top+w.top,bottom:A.bottom-y.bottom+w.bottom,left:y.left-A.left+w.left,right:A.right-y.right+w.right},k=e.modifiersData.offset;if(g===vr&&k){var O=k[o];Object.keys(B).forEach(function(j){var z=[Ye,Xe].indexOf(j)>=0?1:-1,q=[$e,Xe].indexOf(j)>=0?"y":"x";B[j]+=O[q]*z})}return B}function Jm(e,t){t===void 0&&(t={});var r=t,n=r.placement,o=r.boundary,a=r.rootBoundary,s=r.padding,l=r.flipVariations,c=r.allowedAutoPlacements,d=c===void 0?el:c,m=or(n),v=m?l?is:is.filter(function(h){return or(h)===m}):Kr,g=v.filter(function(h){return d.indexOf(h)>=0});g.length===0&&(g=v);var u=g.reduce(function(h,f){return h[f]=Lr(e,{placement:f,boundary:o,rootBoundary:a,padding:s})[nt(f)],h},{});return Object.keys(u).sort(function(h,f){return u[h]-u[f]})}function Zm(e){if(nt(e)===Zo)return[];var t=un(e);return[ps(e),t,ps(t)]}function Qm(e){var t=e.state,r=e.options,n=e.name;if(!t.modifiersData[n]._skip){for(var o=r.mainAxis,a=o===void 0?!0:o,s=r.altAxis,l=s===void 0?!0:s,c=r.fallbackPlacements,d=r.padding,m=r.boundary,v=r.rootBoundary,g=r.altBoundary,u=r.flipVariations,h=u===void 0?!0:u,f=r.allowedAutoPlacements,b=t.options.placement,w=nt(b),R=w===b,x=c||(R||!h?[un(b)]:Zm(b)),E=[b].concat(x).reduce(function(H,G){return H.concat(nt(G)===Zo?Jm(t,{placement:G,boundary:m,rootBoundary:v,padding:d,flipVariations:h,allowedAutoPlacements:f}):G)},[]),y=t.rects.reference,S=t.rects.popper,C=new Map,I=!0,A=E[0],B=0;B<E.length;B++){var k=E[B],O=nt(k),j=or(k)===tr,z=[$e,Xe].indexOf(O)>=0,q=z?"width":"height",$=Lr(t,{placement:k,boundary:m,rootBoundary:v,altBoundary:g,padding:d}),F=z?j?Ye:Me:j?Xe:$e;y[q]>S[q]&&(F=un(F));var W=un(F),te=[];if(a&&te.push($[O]<=0),l&&te.push($[F]<=0,$[W]<=0),te.every(function(H){return H})){A=k,I=!1;break}C.set(k,te)}if(I)for(var P=h?3:1,M=function(G){var K=E.find(function(J){var X=C.get(J);if(X)return X.slice(0,G).every(function(Z){return Z})});if(K)return A=K,"break"},U=P;U>0;U--){var Y=M(U);if(Y==="break")break}t.placement!==A&&(t.modifiersData[n]._skip=!0,t.placement=A,t.reset=!0)}}const eh={name:"flip",enabled:!0,phase:"main",fn:Qm,requiresIfExists:["offset"],data:{_skip:!1}};function ds(e,t,r){return r===void 0&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function fs(e){return[$e,Ye,Xe,Me].some(function(t){return e[t]>=0})}function th(e){var t=e.state,r=e.name,n=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,s=Lr(t,{elementContext:"reference"}),l=Lr(t,{altBoundary:!0}),c=ds(s,n),d=ds(l,o,a),m=fs(c),v=fs(d);t.modifiersData[r]={referenceClippingOffsets:c,popperEscapeOffsets:d,isReferenceHidden:m,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":m,"data-popper-escaped":v})}const rh={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:th};function nh(e,t,r){var n=nt(e),o=[Me,$e].indexOf(n)>=0?-1:1,a=typeof r=="function"?r(Object.assign({},t,{placement:e})):r,s=a[0],l=a[1];return s=s||0,l=(l||0)*o,[Me,Ye].indexOf(n)>=0?{x:l,y:s}:{x:s,y:l}}function oh(e){var t=e.state,r=e.options,n=e.name,o=r.offset,a=o===void 0?[0,0]:o,s=el.reduce(function(m,v){return m[v]=nh(v,t.rects,a),m},{}),l=s[t.placement],c=l.x,d=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=d),t.modifiersData[n]=s}const ah={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:oh};function sh(e){var t=e.state,r=e.name;t.modifiersData[r]=il({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const ih={name:"popperOffsets",enabled:!0,phase:"read",fn:sh,data:{}};function lh(e){return e==="x"?"y":"x"}function ch(e){var t=e.state,r=e.options,n=e.name,o=r.mainAxis,a=o===void 0?!0:o,s=r.altAxis,l=s===void 0?!1:s,c=r.boundary,d=r.rootBoundary,m=r.altBoundary,v=r.padding,g=r.tether,u=g===void 0?!0:g,h=r.tetherOffset,f=h===void 0?0:h,b=Lr(t,{boundary:c,rootBoundary:d,padding:v,altBoundary:m}),w=nt(t.placement),R=or(t.placement),x=!R,E=ta(w),y=lh(E),S=t.modifiersData.popperOffsets,C=t.rects.reference,I=t.rects.popper,A=typeof f=="function"?f(Object.assign({},t.rects,{placement:t.placement})):f,B=typeof A=="number"?{mainAxis:A,altAxis:A}:Object.assign({mainAxis:0,altAxis:0},A),k=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,O={x:0,y:0};if(S){if(a){var j,z=E==="y"?$e:Me,q=E==="y"?Xe:Ye,$=E==="y"?"height":"width",F=S[E],W=F+b[z],te=F-b[q],P=u?-I[$]/2:0,M=R===tr?C[$]:I[$],U=R===tr?-I[$]:-C[$],Y=t.elements.arrow,H=u&&Y?ea(Y):{width:0,height:0},G=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:nl(),K=G[z],J=G[q],X=Rr(0,C[$],H[$]),Z=x?C[$]/2-P-X-K-B.mainAxis:M-X-K-B.mainAxis,Q=x?-C[$]/2+P+X+J+B.mainAxis:U+X+J+B.mainAxis,ae=t.elements.arrow&&Jr(t.elements.arrow),L=ae?E==="y"?ae.clientTop||0:ae.clientLeft||0:0,ee=(j=k==null?void 0:k[E])!=null?j:0,D=F+Z-ee-L,se=F+Q-ee,Te=Rr(u?wn(W,D):W,F,u?It(te,se):te);S[E]=Te,O[E]=Te-F}if(l){var Pe,we=E==="x"?$e:Me,St=E==="x"?Xe:Ye,je=S[y],it=y==="y"?"height":"width",Ae=je+b[we],lt=je-b[St],Ne=[$e,Me].indexOf(w)!==-1,Ft=(Pe=k==null?void 0:k[y])!=null?Pe:0,Ot=Ne?Ae:je-C[it]-I[it]-Ft+B.altAxis,pr=Ne?je+C[it]+I[it]-Ft-B.altAxis:lt,Zr=u&&Ne?$m(Ot,je,pr):Rr(u?Ot:Ae,je,u?pr:lt);S[y]=Zr,O[y]=Zr-je}t.modifiersData[n]=O}}const ph={name:"preventOverflow",enabled:!0,phase:"main",fn:ch,requiresIfExists:["offset"]};function uh(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function dh(e){return e===Fe(e)||!He(e)?ra(e):uh(e)}function fh(e){var t=e.getBoundingClientRect(),r=rr(t.width)/e.offsetWidth||1,n=rr(t.height)/e.offsetHeight||1;return r!==1||n!==1}function mh(e,t,r){r===void 0&&(r=!1);var n=He(t),o=He(t)&&fh(t),a=Ct(t),s=nr(e,o,r),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(n||!n&&!r)&&((st(t)!=="body"||oa(a))&&(l=dh(t)),He(t)?(c=nr(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):a&&(c.x=na(a))),{x:s.left+l.scrollLeft-c.x,y:s.top+l.scrollTop-c.y,width:s.width,height:s.height}}function hh(e){var t=new Map,r=new Set,n=[];e.forEach(function(a){t.set(a.name,a)});function o(a){r.add(a.name);var s=[].concat(a.requires||[],a.requiresIfExists||[]);s.forEach(function(l){if(!r.has(l)){var c=t.get(l);c&&o(c)}}),n.push(a)}return e.forEach(function(a){r.has(a.name)||o(a)}),n}function gh(e){var t=hh(e);return Sm.reduce(function(r,n){return r.concat(t.filter(function(o){return o.phase===n}))},[])}function bh(e){var t;return function(){return t||(t=new Promise(function(r){Promise.resolve().then(function(){t=void 0,r(e())})})),t}}function vh(e){var t=e.reduce(function(r,n){var o=r[n.name];return r[n.name]=o?Object.assign({},o,n,{options:Object.assign({},o.options,n.options),data:Object.assign({},o.data,n.data)}):n,r},{});return Object.keys(t).map(function(r){return t[r]})}var ms={placement:"bottom",modifiers:[],strategy:"absolute"};function hs(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function yh(e){e===void 0&&(e={});var t=e,r=t.defaultModifiers,n=r===void 0?[]:r,o=t.defaultOptions,a=o===void 0?ms:o;return function(l,c,d){d===void 0&&(d=a);var m={placement:"bottom",orderedModifiers:[],options:Object.assign({},ms,a),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},v=[],g=!1,u={state:m,setOptions:function(w){var R=typeof w=="function"?w(m.options):w;f(),m.options=Object.assign({},a,m.options,R),m.scrollParents={reference:Vt(l)?Pr(l):l.contextElement?Pr(l.contextElement):[],popper:Pr(c)};var x=gh(vh([].concat(n,m.options.modifiers)));return m.orderedModifiers=x.filter(function(E){return E.enabled}),h(),u.update()},forceUpdate:function(){if(!g){var w=m.elements,R=w.reference,x=w.popper;if(hs(R,x)){m.rects={reference:mh(R,Jr(x),m.options.strategy==="fixed"),popper:ea(x)},m.reset=!1,m.placement=m.options.placement,m.orderedModifiers.forEach(function(B){return m.modifiersData[B.name]=Object.assign({},B.data)});for(var E=0;E<m.orderedModifiers.length;E++){if(m.reset===!0){m.reset=!1,E=-1;continue}var y=m.orderedModifiers[E],S=y.fn,C=y.options,I=C===void 0?{}:C,A=y.name;typeof S=="function"&&(m=S({state:m,options:I,name:A,instance:u})||m)}}}},update:bh(function(){return new Promise(function(b){u.forceUpdate(),b(m)})}),destroy:function(){f(),g=!0}};if(!hs(l,c))return u;u.setOptions(d).then(function(b){!g&&d.onFirstUpdate&&d.onFirstUpdate(b)});function h(){m.orderedModifiers.forEach(function(b){var w=b.name,R=b.options,x=R===void 0?{}:R,E=b.effect;if(typeof E=="function"){var y=E({state:m,name:w,instance:u,options:x}),S=function(){};v.push(y||S)}})}function f(){v.forEach(function(b){return b()}),v=[]}return u}}var wh=[Um,ih,Fm,Pm,ah,eh,ph,Am,rh],xh=yh({defaultModifiers:wh});function Eh(e){return typeof e=="function"?e():e}const xn=N.forwardRef(function(t,r){const{children:n,container:o,disablePortal:a=!1}=t,[s,l]=N.useState(null),c=We(N.isValidElement(n)?n.ref:null,r);if(Bt(()=>{a||l(Eh(o)||document.body)},[o,a]),Bt(()=>{if(s&&!a)return hn(r,s),()=>{hn(r,null)}},[r,s,a]),a){if(N.isValidElement(n)){const d={ref:c};return N.cloneElement(n,d)}return p.jsx(N.Fragment,{children:n})}return p.jsx(N.Fragment,{children:s&&_c.createPortal(n,s)})});process.env.NODE_ENV!=="production"&&(xn.propTypes={children:i.node,container:i.oneOfType([dt,i.func]),disablePortal:i.bool});process.env.NODE_ENV!=="production"&&(xn["propTypes"]=hi(xn.propTypes));const ll=xn;function kh(e){return et("MuiPopper",e)}gt("MuiPopper",["root"]);const Th=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Nh=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Ch(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function En(e){return typeof e=="function"?e():e}function Bn(e){return e.nodeType!==void 0}function Sh(e){return!Bn(e)}const Oh=e=>{const{classes:t}=e;return ht({root:["root"]},kh,t)},Rh={},Ph=N.forwardRef(function(t,r){var n;const{anchorEl:o,children:a,direction:s,disablePortal:l,modifiers:c,open:d,placement:m,popperOptions:v,popperRef:g,slotProps:u={},slots:h={},TransitionProps:f}=t,b=fe(t,Th),w=N.useRef(null),R=We(w,r),x=N.useRef(null),E=We(x,g),y=N.useRef(E);Bt(()=>{y.current=E},[E]),N.useImperativeHandle(g,()=>x.current,[]);const S=Ch(m,s),[C,I]=N.useState(S),[A,B]=N.useState(En(o));N.useEffect(()=>{x.current&&x.current.forceUpdate()}),N.useEffect(()=>{o&&B(En(o))},[o]),Bt(()=>{if(!A||!d)return;const q=W=>{I(W.placement)};if(process.env.NODE_ENV!=="production"&&A&&Bn(A)&&A.nodeType===1){const W=A.getBoundingClientRect();process.env.NODE_ENV!=="test"&&W.top===0&&W.left===0&&W.right===0&&W.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let $=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:W})=>{q(W)}}];c!=null&&($=$.concat(c)),v&&v.modifiers!=null&&($=$.concat(v.modifiers));const F=xh(A,w.current,_({placement:S},v,{modifiers:$}));return y.current(F),()=>{F.destroy(),y.current(null)}},[A,l,c,d,v,S]);const k={placement:C};f!==null&&(k.TransitionProps=f);const O=Oh(t),j=(n=h.root)!=null?n:"div",z=Lt({elementType:j,externalSlotProps:u.root,externalForwardedProps:b,additionalProps:{role:"tooltip",ref:R},ownerState:t,className:O.root});return p.jsx(j,_({},z,{children:typeof a=="function"?a(k):a}))}),cl=N.forwardRef(function(t,r){const{anchorEl:n,children:o,container:a,direction:s="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:d,open:m,placement:v="bottom",popperOptions:g=Rh,popperRef:u,style:h,transition:f=!1,slotProps:b={},slots:w={}}=t,R=fe(t,Nh),[x,E]=N.useState(!0),y=()=>{E(!1)},S=()=>{E(!0)};if(!c&&!m&&(!f||x))return null;let C;if(a)C=a;else if(n){const B=En(n);C=B&&Bn(B)?Oe(B).body:Oe(null).body}const I=!m&&c&&(!f||x)?"none":void 0,A=f?{in:m,onEnter:y,onExited:S}:void 0;return p.jsx(ll,{disablePortal:l,container:C,children:p.jsx(Ph,_({anchorEl:n,direction:s,disablePortal:l,modifiers:d,ref:r,open:f?!x:m,placement:v,popperOptions:g,popperRef:u,slotProps:b,slots:w},R,{style:_({position:"fixed",top:0,left:0,display:I},h),TransitionProps:A,children:o}))})});process.env.NODE_ENV!=="production"&&(cl.propTypes={anchorEl:ir(i.oneOfType([dt,i.object,i.func]),e=>{if(e.open){const t=En(e.anchorEl);if(t&&Bn(t)&&t.nodeType===1){const r=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&r.top===0&&r.left===0&&r.right===0&&r.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Sh(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:i.oneOfType([i.node,i.func]),container:i.oneOfType([dt,i.func]),direction:i.oneOf(["ltr","rtl"]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:Fo,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),transition:i.bool});const jh=cl,_h=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],$h=Re(jh,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),pl=N.forwardRef(function(t,r){var n;const o=Ji(),a=bt({props:t,name:"MuiPopper"}),{anchorEl:s,component:l,components:c,componentsProps:d,container:m,disablePortal:v,keepMounted:g,modifiers:u,open:h,placement:f,popperOptions:b,popperRef:w,transition:R,slots:x,slotProps:E}=a,y=fe(a,_h),S=(n=x==null?void 0:x.root)!=null?n:c==null?void 0:c.Root,C=_({anchorEl:s,container:m,disablePortal:v,keepMounted:g,modifiers:u,open:h,placement:f,popperOptions:b,popperRef:w,transition:R},y);return p.jsx($h,_({as:l,direction:o==null?void 0:o.direction,slots:{root:S},slotProps:E??d},C,{ref:r}))});process.env.NODE_ENV!=="production"&&(pl.propTypes={anchorEl:i.oneOfType([dt,i.object,i.func]),children:i.oneOfType([i.node,i.func]),component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([dt,i.func]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:Fo,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transition:i.bool});const ul=pl;function Mh(e){return et("MuiTooltip",e)}const Ih=gt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),kt=Ih,Dh=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Ah(e){return Math.round(e*1e5)/1e5}const Bh=e=>{const{classes:t,disableInteractive:r,arrow:n,touch:o,placement:a}=e,s={popper:["popper",!r&&"popperInteractive",n&&"popperArrow"],tooltip:["tooltip",n&&"tooltipArrow",o&&"touch",`tooltipPlacement${at(a.split("-")[0])}`],arrow:["arrow"]};return ht(s,Mh,t)},Lh=Re(ul,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.popper,!r.disableInteractive&&t.popperInteractive,r.arrow&&t.popperArrow,!r.open&&t.popperClose]}})(({theme:e,ownerState:t,open:r})=>_({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!r&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${kt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${kt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${kt.arrow}`]:_({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${kt.arrow}`]:_({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Vh=Re("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.tooltip,r.touch&&t.touch,r.arrow&&t.tooltipArrow,t[`tooltipPlacement${at(r.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>_({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:bn(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Ah(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${kt.popper}[data-popper-placement*="left"] &`]:_({transformOrigin:"right center"},t.isRtl?_({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):_({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${kt.popper}[data-popper-placement*="right"] &`]:_({transformOrigin:"left center"},t.isRtl?_({marginRight:"14px"},t.touch&&{marginRight:"24px"}):_({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${kt.popper}[data-popper-placement*="top"] &`]:_({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${kt.popper}[data-popper-placement*="bottom"] &`]:_({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Fh=Re("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:bn(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let an=!1;const gs=new Hr;let yr={x:0,y:0};function sn(e,t){return(r,...n)=>{t&&t(r,...n),e(r,...n)}}const dl=N.forwardRef(function(t,r){var n,o,a,s,l,c,d,m,v,g,u,h,f,b,w,R,x,E,y;const S=bt({props:t,name:"MuiTooltip"}),{arrow:C=!1,children:I,components:A={},componentsProps:B={},describeChild:k=!1,disableFocusListener:O=!1,disableHoverListener:j=!1,disableInteractive:z=!1,disableTouchListener:q=!1,enterDelay:$=100,enterNextDelay:F=0,enterTouchDelay:W=700,followCursor:te=!1,id:P,leaveDelay:M=0,leaveTouchDelay:U=1500,onClose:Y,onOpen:H,open:G,placement:K="bottom",PopperComponent:J,PopperProps:X={},slotProps:Z={},slots:Q={},title:ae,TransitionComponent:L=ko,TransitionProps:ee}=S,D=fe(S,Dh),se=N.isValidElement(I)?I:p.jsx("span",{children:I}),Te=Dn(),Pe=Gi(),[we,St]=N.useState(),[je,it]=N.useState(null),Ae=N.useRef(!1),lt=z||te,Ne=Tr(),Ft=Tr(),Ot=Tr(),pr=Tr(),[Zr,fa]=wi({controlled:G,default:!1,name:"Tooltip",state:"open"});let ct=Zr;if(process.env.NODE_ENV!=="production"){const{current:re}=N.useRef(G!==void 0);N.useEffect(()=>{we&&we.disabled&&!re&&ae!==""&&we.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ae,we,re])}const Vn=yi(P),ur=N.useRef(),Qr=Dr(()=>{ur.current!==void 0&&(document.body.style.WebkitUserSelect=ur.current,ur.current=void 0),pr.clear()});N.useEffect(()=>Qr,[Qr]);const ma=re=>{gs.clear(),an=!0,fa(!0),H&&!ct&&H(re)},en=Dr(re=>{gs.start(800+M,()=>{an=!1}),fa(!1),Y&&ct&&Y(re),Ne.start(Te.transitions.duration.shortest,()=>{Ae.current=!1})}),tn=re=>{Ae.current&&re.type!=="touchstart"||(we&&we.removeAttribute("title"),Ft.clear(),Ot.clear(),$||an&&F?Ft.start(an?F:$,()=>{ma(re)}):ma(re))},Fn=re=>{Ft.clear(),Ot.start(M,()=>{en(re)})},{isFocusVisibleRef:ha,onBlur:pc,onFocus:uc,ref:dc}=xi(),[,ga]=N.useState(!1),ba=re=>{pc(re),ha.current===!1&&(ga(!1),Fn(re))},va=re=>{we||St(re.currentTarget),uc(re),ha.current===!0&&(ga(!0),tn(re))},ya=re=>{Ae.current=!0;const Be=se.props;Be.onTouchStart&&Be.onTouchStart(re)},fc=re=>{ya(re),Ot.clear(),Ne.clear(),Qr(),ur.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",pr.start(W,()=>{document.body.style.WebkitUserSelect=ur.current,tn(re)})},mc=re=>{se.props.onTouchEnd&&se.props.onTouchEnd(re),Qr(),Ot.start(U,()=>{en(re)})};N.useEffect(()=>{if(!ct)return;function re(Be){(Be.key==="Escape"||Be.key==="Esc")&&en(Be)}return document.addEventListener("keydown",re),()=>{document.removeEventListener("keydown",re)}},[en,ct]);const hc=We(se.ref,dc,St,r);!ae&&ae!==0&&(ct=!1);const zn=N.useRef(),gc=re=>{const Be=se.props;Be.onMouseMove&&Be.onMouseMove(re),yr={x:re.clientX,y:re.clientY},zn.current&&zn.current.update()},dr={},Un=typeof ae=="string";k?(dr.title=!ct&&Un&&!j?ae:null,dr["aria-describedby"]=ct?Vn:null):(dr["aria-label"]=Un?ae:null,dr["aria-labelledby"]=ct&&!Un?Vn:null);const ze=_({},dr,D,se.props,{className:Ce(D.className,se.props.className),onTouchStart:ya,ref:hc},te?{onMouseMove:gc}:{});process.env.NODE_ENV!=="production"&&(ze["data-mui-internal-clone-element"]=!0,N.useEffect(()=>{we&&!we.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[we]));const fr={};q||(ze.onTouchStart=fc,ze.onTouchEnd=mc),j||(ze.onMouseOver=sn(tn,ze.onMouseOver),ze.onMouseLeave=sn(Fn,ze.onMouseLeave),lt||(fr.onMouseOver=tn,fr.onMouseLeave=Fn)),O||(ze.onFocus=sn(va,ze.onFocus),ze.onBlur=sn(ba,ze.onBlur),lt||(fr.onFocus=va,fr.onBlur=ba)),process.env.NODE_ENV!=="production"&&se.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));const bc=N.useMemo(()=>{var re;let Be=[{name:"arrow",enabled:!!je,options:{element:je,padding:4}}];return(re=X.popperOptions)!=null&&re.modifiers&&(Be=Be.concat(X.popperOptions.modifiers)),_({},X.popperOptions,{modifiers:Be})},[je,X]),mr=_({},S,{isRtl:Pe,arrow:C,disableInteractive:lt,placement:K,PopperComponentProp:J,touch:Ae.current}),qn=Bh(mr),wa=(n=(o=Q.popper)!=null?o:A.Popper)!=null?n:Lh,xa=(a=(s=(l=Q.transition)!=null?l:A.Transition)!=null?s:L)!=null?a:ko,Ea=(c=(d=Q.tooltip)!=null?d:A.Tooltip)!=null?c:Vh,ka=(m=(v=Q.arrow)!=null?v:A.Arrow)!=null?m:Fh,vc=Nr(wa,_({},X,(g=Z.popper)!=null?g:B.popper,{className:Ce(qn.popper,X==null?void 0:X.className,(u=(h=Z.popper)!=null?h:B.popper)==null?void 0:u.className)}),mr),yc=Nr(xa,_({},ee,(f=Z.transition)!=null?f:B.transition),mr),wc=Nr(Ea,_({},(b=Z.tooltip)!=null?b:B.tooltip,{className:Ce(qn.tooltip,(w=(R=Z.tooltip)!=null?R:B.tooltip)==null?void 0:w.className)}),mr),xc=Nr(ka,_({},(x=Z.arrow)!=null?x:B.arrow,{className:Ce(qn.arrow,(E=(y=Z.arrow)!=null?y:B.arrow)==null?void 0:E.className)}),mr);return p.jsxs(N.Fragment,{children:[N.cloneElement(se,ze),p.jsx(wa,_({as:J??ul,placement:K,anchorEl:te?{getBoundingClientRect:()=>({top:yr.y,left:yr.x,right:yr.x,bottom:yr.y,width:0,height:0})}:we,popperRef:zn,open:we?ct:!1,id:Vn,transition:!0},fr,vc,{popperOptions:bc,children:({TransitionProps:re})=>p.jsx(xa,_({timeout:Te.transitions.duration.shorter},re,yc,{children:p.jsxs(Ea,_({},wc,{children:[ae,C?p.jsx(ka,_({},xc,{ref:it})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(dl.propTypes={arrow:i.bool,children:qr.isRequired,classes:i.object,className:i.string,components:i.shape({Arrow:i.elementType,Popper:i.elementType,Tooltip:i.elementType,Transition:i.elementType}),componentsProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),describeChild:i.bool,disableFocusListener:i.bool,disableHoverListener:i.bool,disableInteractive:i.bool,disableTouchListener:i.bool,enterDelay:i.number,enterNextDelay:i.number,enterTouchDelay:i.number,followCursor:i.bool,id:i.string,leaveDelay:i.number,leaveTouchDelay:i.number,onClose:i.func,onOpen:i.func,open:i.bool,placement:i.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:i.elementType,PopperProps:i.object,slotProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),slots:i.shape({arrow:i.elementType,popper:i.elementType,tooltip:i.elementType,transition:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),title:i.node,TransitionComponent:i.elementType,TransitionProps:i.object});const zh=dl;function bs(e,t,r){return e?p.jsx(ke.ListItemIcon,{className:`papi-menu-icon-${r?"leading":"trailing"}`,children:p.jsx("img",{src:e,alt:`${r?"Leading":"Trailing"} icon for ${t}`})}):void 0}function aa(e){const{onClick:t,label:r,tooltip:n,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:s=void 0,hasAutoFocus:l=!1,className:c,isDisabled:d=!1,isDense:m=!0,isSubMenuParent:v=!1,hasDisabledGutters:g=!1,hasDivider:u=!1,focusVisibleClassName:h,id:f,children:b}=e,w=p.jsx(ke.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:d,dense:m,disableGutters:g,divider:u,focusVisibleClassName:h,onClick:t,id:f,children:r?p.jsxs(p.Fragment,{children:[bs(a,r,!0),p.jsx(ke.ListItemText,{primary:r,inset:!a&&o}),v?p.jsx(ke.ListItemIcon,{className:"papi-menu-icon-trailing",children:p.jsx(Wi,{})}):bs(s,r,!1)]}):b});return n?p.jsx(zh,{title:n,placement:"right",children:p.jsx("div",{children:w})}):w}function fl(e){return Object.entries(e.groups).map(([r,n])=>({id:r,group:n}))}function Uh(e){const[t,r]=T.useState(void 0),{parentMenuItem:n,parentItemProps:o,menuDefinition:a}=e,s=d=>{r(d.currentTarget)},l=()=>{r(void 0)},c=()=>{let d=fl(a).filter(m=>"menuItem"in m.group);if(!(n!=null&&n.id))throw new Error("A valid parent menu item is required for submenus.");return d=d.filter(m=>"menuItem"in m.group&&m.group.menuItem===n.id),p.jsx(sa,{...e,includedGroups:d})};return p.jsxs(p.Fragment,{children:[p.jsx(aa,{onClick:s,...o,isSubMenuParent:!0}),p.jsx(ke.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},n.id)]})}const qh=(e,t)=>t.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function sa(e){const{menuDefinition:t,onClick:r,commandHandler:n,includedGroups:o}=e,{items:a,allowForLeadingIcons:s}=T.useMemo(()=>{const m=o&&o.length>0?o:fl(t).filter(h=>!("menuItem"in h.group)),v=Object.values(m).sort((h,f)=>(h.group.order||0)-(f.group.order||0)),g=[];v.forEach(h=>{qh(h.id,t.items).forEach(f=>g.push({item:f,isLastItemInGroup:!1})),g.length>0&&(g[g.length-1].isLastItemInGroup=!0)}),g.length>0&&(g[g.length-1].isLastItemInGroup=!1);const u=g.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:g,allowForLeadingIcons:u}},[o,t]),l=({item:m,isLastItemInGroup:v})=>({className:"papi-menu-item",label:m.label,tooltip:m.tooltip,iconPathBefore:"iconPathBefore"in m?m.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in m?m.iconPathAfter:void 0,hasDivider:v,allowForLeadingIcons:s}),[c]=a;if(!c)return p.jsx("div",{});const d=c.item.group;return p.jsx("div",{role:"menu","aria-label":d,children:a.map((m,v)=>{const{item:g}=m,u=l(m);if("command"in g){const h=g.group+v;return p.jsx(aa,{onClick:f=>{r==null||r(f),n(g)},...u},h)}return p.jsx(Uh,{parentMenuItem:g,parentItemProps:u,...e},d+g.id)})},d)}function Hh(e){const{menuDefinition:t,columnId:r}=e;let a=Object.entries(t.groups).map(([s,l])=>({id:s,group:l})).filter(s=>"column"in s.group);return r&&"columns"in t&&t.columns[r]&&(a=a.filter(s=>"column"in s.group&&s.group.column===r)),p.jsx(sa,{...e,includedGroups:a})}function Wh({commandHandler:e,menuDefinition:t,id:r,metadata:n,onClick:o,className:a}){return p.jsxs(ke.Grid,{id:r,item:!0,xs:"auto",role:"menu","aria-label":r,className:`papi-menu-column ${a??""}`,children:[p.jsx("h3",{"aria-label":n.label,className:`papi-menu-column-header ${a??""}`,children:n.label}),p.jsx(ke.List,{id:r,dense:!0,className:a??"",children:p.jsx(Hh,{commandHandler:e,menuDefinition:t,columnId:r,onClick:o})})]})}function ml({commandHandler:e,className:t,multiColumnMenu:r,id:n}){const{columns:o}=r,a=T.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,d=o[c];typeof d=="object"&&typeof d.order=="number"&&!Number.isNaN(d.order)?s.set(d.order,{id:c,metadata:d}):console.warn(`Property ${l} (${typeof d}) on menu ${n} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,n]);return p.jsx(ke.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:n,children:a.map((s,l)=>p.jsx(Wh,{commandHandler:e,menuDefinition:r,...s,className:t},l))})}const hl=N.createContext({});process.env.NODE_ENV!=="production"&&(hl.displayName="ListContext");const Gh=hl;function Xh(e){return et("MuiList",e)}gt("MuiList",["root","padding","dense","subheader"]);const Yh=["children","className","component","dense","disablePadding","subheader"],Kh=e=>{const{classes:t,disablePadding:r,dense:n,subheader:o}=e;return ht({root:["root",!r&&"padding",n&&"dense",o&&"subheader"]},Xh,t)},Jh=Re("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,!r.disablePadding&&t.padding,r.dense&&t.dense,r.subheader&&t.subheader]}})(({ownerState:e})=>_({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),gl=N.forwardRef(function(t,r){const n=bt({props:t,name:"MuiList"}),{children:o,className:a,component:s="ul",dense:l=!1,disablePadding:c=!1,subheader:d}=n,m=fe(n,Yh),v=N.useMemo(()=>({dense:l}),[l]),g=_({},n,{component:s,dense:l,disablePadding:c}),u=Kh(g);return p.jsx(Gh.Provider,{value:v,children:p.jsxs(Jh,_({as:s,className:Ce(u.root,a),ref:r,ownerState:g},m,{children:[d,o]}))})});process.env.NODE_ENV!=="production"&&(gl.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,dense:i.bool,disablePadding:i.bool,subheader:i.node,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const Zh=gl,Qh=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function no(e,t,r){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:r?null:e.firstChild}function vs(e,t,r){return e===t?r?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:r?null:e.lastChild}function bl(e,t){if(t===void 0)return!0;let r=e.innerText;return r===void 0&&(r=e.textContent),r=r.trim().toLowerCase(),r.length===0?!1:t.repeating?r[0]===t.keys[0]:r.indexOf(t.keys.join(""))===0}function wr(e,t,r,n,o,a){let s=!1,l=o(e,t,t?r:!1);for(;l;){if(l===e.firstChild){if(s)return!1;s=!0}const c=n?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!bl(l,a)||c)l=o(e,l,r);else return l.focus(),!0}return!1}const vl=N.forwardRef(function(t,r){const{actions:n,autoFocus:o=!1,autoFocusItem:a=!1,children:s,className:l,disabledItemsFocusable:c=!1,disableListWrap:d=!1,onKeyDown:m,variant:v="selectedMenu"}=t,g=fe(t,Qh),u=N.useRef(null),h=N.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Bt(()=>{o&&u.current.focus()},[o]),N.useImperativeHandle(n,()=>({adjustStyleForScrollbar:(x,{direction:E})=>{const y=!u.current.style.width;if(x.clientHeight<u.current.clientHeight&&y){const S=`${Ei(Oe(x))}px`;u.current.style[E==="rtl"?"paddingLeft":"paddingRight"]=S,u.current.style.width=`calc(100% + ${S})`}return u.current}}),[]);const f=x=>{const E=u.current,y=x.key,S=Oe(E).activeElement;if(y==="ArrowDown")x.preventDefault(),wr(E,S,d,c,no);else if(y==="ArrowUp")x.preventDefault(),wr(E,S,d,c,vs);else if(y==="Home")x.preventDefault(),wr(E,null,d,c,no);else if(y==="End")x.preventDefault(),wr(E,null,d,c,vs);else if(y.length===1){const C=h.current,I=y.toLowerCase(),A=performance.now();C.keys.length>0&&(A-C.lastTime>500?(C.keys=[],C.repeating=!0,C.previousKeyMatched=!0):C.repeating&&I!==C.keys[0]&&(C.repeating=!1)),C.lastTime=A,C.keys.push(I);const B=S&&!C.repeating&&bl(S,C);C.previousKeyMatched&&(B||wr(E,S,!1,c,no,C))?x.preventDefault():C.previousKeyMatched=!1}m&&m(x)},b=We(u,r);let w=-1;N.Children.forEach(s,(x,E)=>{if(!N.isValidElement(x)){w===E&&(w+=1,w>=s.length&&(w=-1));return}process.env.NODE_ENV!=="production"&&mn.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(v==="selectedMenu"&&x.props.selected||w===-1)&&(w=E),w===E&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(w+=1,w>=s.length&&(w=-1))});const R=N.Children.map(s,(x,E)=>{if(E===w){const y={};return a&&(y.autoFocus=!0),x.props.tabIndex===void 0&&v==="selectedMenu"&&(y.tabIndex=0),N.cloneElement(x,y)}return x});return p.jsx(Zh,_({role:"menu",ref:b,className:l,onKeyDown:f,tabIndex:o?0:-1},g,{children:R}))});process.env.NODE_ENV!=="production"&&(vl.propTypes={autoFocus:i.bool,autoFocusItem:i.bool,children:i.node,className:i.string,disabledItemsFocusable:i.bool,disableListWrap:i.bool,onKeyDown:i.func,variant:i.oneOf(["menu","selectedMenu"])});const eg=vl;function tg(e){const t=Oe(e);return t.body===e?er(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function jr(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function ys(e){return parseInt(er(e).getComputedStyle(e).paddingRight,10)||0}function rg(e){const r=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,n=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return r||n}function ws(e,t,r,n,o){const a=[t,r,...n];[].forEach.call(e.children,s=>{const l=a.indexOf(s)===-1,c=!rg(s);l&&c&&jr(s,o)})}function oo(e,t){let r=-1;return e.some((n,o)=>t(n)?(r=o,!0):!1),r}function ng(e,t){const r=[],n=e.container;if(!t.disableScrollLock){if(tg(n)){const s=Ei(Oe(n));r.push({value:n.style.paddingRight,property:"padding-right",el:n}),n.style.paddingRight=`${ys(n)+s}px`;const l=Oe(n).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{r.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${ys(c)+s}px`})}let a;if(n.parentNode instanceof DocumentFragment)a=Oe(n).body;else{const s=n.parentElement,l=er(n);a=(s==null?void 0:s.nodeName)==="HTML"&&l.getComputedStyle(s).overflowY==="scroll"?s:n}r.push({value:a.style.overflow,property:"overflow",el:a},{value:a.style.overflowX,property:"overflow-x",el:a},{value:a.style.overflowY,property:"overflow-y",el:a}),a.style.overflow="hidden"}return()=>{r.forEach(({value:a,el:s,property:l})=>{a?s.style.setProperty(l,a):s.style.removeProperty(l)})}}function og(e){const t=[];return[].forEach.call(e.children,r=>{r.getAttribute("aria-hidden")==="true"&&t.push(r)}),t}class ag{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,r){let n=this.modals.indexOf(t);if(n!==-1)return n;n=this.modals.length,this.modals.push(t),t.modalRef&&jr(t.modalRef,!1);const o=og(r);ws(r,t.mount,t.modalRef,o,!0);const a=oo(this.containers,s=>s.container===r);return a!==-1?(this.containers[a].modals.push(t),n):(this.containers.push({modals:[t],container:r,restore:null,hiddenSiblings:o}),n)}mount(t,r){const n=oo(this.containers,a=>a.modals.indexOf(t)!==-1),o=this.containers[n];o.restore||(o.restore=ng(o,r))}remove(t,r=!0){const n=this.modals.indexOf(t);if(n===-1)return n;const o=oo(this.containers,s=>s.modals.indexOf(t)!==-1),a=this.containers[o];if(a.modals.splice(a.modals.indexOf(t),1),this.modals.splice(n,1),a.modals.length===0)a.restore&&a.restore(),t.modalRef&&jr(t.modalRef,r),ws(a.container,t.mount,t.modalRef,a.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=a.modals[a.modals.length-1];s.modalRef&&jr(s.modalRef,!1)}return n}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}const sg=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function ig(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function lg(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=n=>e.ownerDocument.querySelector(`input[type="radio"]${n}`);let r=t(`[name="${e.name}"]:checked`);return r||(r=t(`[name="${e.name}"]`)),r!==e}function cg(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||lg(e))}function pg(e){const t=[],r=[];return Array.from(e.querySelectorAll(sg)).forEach((n,o)=>{const a=ig(n);a===-1||!cg(n)||(a===0?t.push(n):r.push({documentOrder:o,tabIndex:a,node:n}))}),r.sort((n,o)=>n.tabIndex===o.tabIndex?n.documentOrder-o.documentOrder:n.tabIndex-o.tabIndex).map(n=>n.node).concat(t)}function ug(){return!0}function kn(e){const{children:t,disableAutoFocus:r=!1,disableEnforceFocus:n=!1,disableRestoreFocus:o=!1,getTabbable:a=pg,isEnabled:s=ug,open:l}=e,c=N.useRef(!1),d=N.useRef(null),m=N.useRef(null),v=N.useRef(null),g=N.useRef(null),u=N.useRef(!1),h=N.useRef(null),f=We(t.ref,h),b=N.useRef(null);N.useEffect(()=>{!l||!h.current||(u.current=!r)},[r,l]),N.useEffect(()=>{if(!l||!h.current)return;const x=Oe(h.current);return h.current.contains(x.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),u.current&&h.current.focus()),()=>{o||(v.current&&v.current.focus&&(c.current=!0,v.current.focus()),v.current=null)}},[l]),N.useEffect(()=>{if(!l||!h.current)return;const x=Oe(h.current),E=C=>{b.current=C,!(n||!s()||C.key!=="Tab")&&x.activeElement===h.current&&C.shiftKey&&(c.current=!0,m.current&&m.current.focus())},y=()=>{const C=h.current;if(C===null)return;if(!x.hasFocus()||!s()||c.current){c.current=!1;return}if(C.contains(x.activeElement)||n&&x.activeElement!==d.current&&x.activeElement!==m.current)return;if(x.activeElement!==g.current)g.current=null;else if(g.current!==null)return;if(!u.current)return;let I=[];if((x.activeElement===d.current||x.activeElement===m.current)&&(I=a(h.current)),I.length>0){var A,B;const k=!!((A=b.current)!=null&&A.shiftKey&&((B=b.current)==null?void 0:B.key)==="Tab"),O=I[0],j=I[I.length-1];typeof O!="string"&&typeof j!="string"&&(k?j.focus():O.focus())}else C.focus()};x.addEventListener("focusin",y),x.addEventListener("keydown",E,!0);const S=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(S),x.removeEventListener("focusin",y),x.removeEventListener("keydown",E,!0)}},[r,n,o,s,l,a]);const w=x=>{v.current===null&&(v.current=x.relatedTarget),u.current=!0,g.current=x.target;const E=t.props.onFocus;E&&E(x)},R=x=>{v.current===null&&(v.current=x.relatedTarget),u.current=!0};return p.jsxs(N.Fragment,{children:[p.jsx("div",{tabIndex:l?0:-1,onFocus:R,ref:d,"data-testid":"sentinelStart"}),N.cloneElement(t,{ref:f,onFocus:w}),p.jsx("div",{tabIndex:l?0:-1,onFocus:R,ref:m,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(kn.propTypes={children:qr,disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableRestoreFocus:i.bool,getTabbable:i.func,isEnabled:i.func,open:i.bool.isRequired});process.env.NODE_ENV!=="production"&&(kn["propTypes"]=hi(kn.propTypes));const dg=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],fg={entering:{opacity:1},entered:{opacity:1}},yl=N.forwardRef(function(t,r){const n=Dn(),o={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:a,appear:s=!0,children:l,easing:c,in:d,onEnter:m,onEntered:v,onEntering:g,onExit:u,onExited:h,onExiting:f,style:b,timeout:w=o,TransitionComponent:R=Yi}=t,x=fe(t,dg),E=N.useRef(null),y=We(E,l.ref,r),S=z=>q=>{if(z){const $=E.current;q===void 0?z($):z($,q)}},C=S(g),I=S((z,q)=>{Ki(z);const $=yn({style:b,timeout:w,easing:c},{mode:"enter"});z.style.webkitTransition=n.transitions.create("opacity",$),z.style.transition=n.transitions.create("opacity",$),m&&m(z,q)}),A=S(v),B=S(f),k=S(z=>{const q=yn({style:b,timeout:w,easing:c},{mode:"exit"});z.style.webkitTransition=n.transitions.create("opacity",q),z.style.transition=n.transitions.create("opacity",q),u&&u(z)}),O=S(h),j=z=>{a&&a(E.current,z)};return p.jsx(R,_({appear:s,in:d,nodeRef:E,onEnter:I,onEntered:A,onEntering:C,onExit:k,onExited:O,onExiting:B,addEndListener:j,timeout:w},x,{children:(z,q)=>N.cloneElement(l,_({style:_({opacity:0,visibility:z==="exited"&&!d?"hidden":void 0},fg[z],b,l.props.style),ref:y},q))}))});process.env.NODE_ENV!=="production"&&(yl.propTypes={addEndListener:i.func,appear:i.bool,children:qr.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const mg=yl;function hg(e){return et("MuiBackdrop",e)}gt("MuiBackdrop",["root","invisible"]);const gg=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],bg=e=>{const{classes:t,invisible:r}=e;return ht({root:["root",r&&"invisible"]},hg,t)},vg=Re("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.invisible&&t.invisible]}})(({ownerState:e})=>_({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),wl=N.forwardRef(function(t,r){var n,o,a;const s=bt({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:d="div",components:m={},componentsProps:v={},invisible:g=!1,open:u,slotProps:h={},slots:f={},TransitionComponent:b=mg,transitionDuration:w}=s,R=fe(s,gg),x=_({},s,{component:d,invisible:g}),E=bg(x),y=(n=h.root)!=null?n:v.root;return p.jsx(b,_({in:u,timeout:w},R,{children:p.jsx(vg,_({"aria-hidden":!0},y,{as:(o=(a=f.root)!=null?a:m.Root)!=null?o:d,className:Ce(E.root,c,y==null?void 0:y.className),ownerState:_({},x,y==null?void 0:y.ownerState),classes:E,ref:r,children:l}))}))});process.env.NODE_ENV!=="production"&&(wl.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.object}),invisible:i.bool,open:i.bool.isRequired,slotProps:i.shape({root:i.object}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const yg=wl;function wg(e){return typeof e=="function"?e():e}function xg(e){return e?e.props.hasOwnProperty("in"):!1}const Eg=new ag;function kg(e){const{container:t,disableEscapeKeyDown:r=!1,disableScrollLock:n=!1,manager:o=Eg,closeAfterTransition:a=!1,onTransitionEnter:s,onTransitionExited:l,children:c,onClose:d,open:m,rootRef:v}=e,g=N.useRef({}),u=N.useRef(null),h=N.useRef(null),f=We(h,v),[b,w]=N.useState(!m),R=xg(c);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const E=()=>Oe(u.current),y=()=>(g.current.modalRef=h.current,g.current.mount=u.current,g.current),S=()=>{o.mount(y(),{disableScrollLock:n}),h.current&&(h.current.scrollTop=0)},C=Dr(()=>{const $=wg(t)||E().body;o.add(y(),$),h.current&&S()}),I=N.useCallback(()=>o.isTopModal(y()),[o]),A=Dr($=>{u.current=$,$&&(m&&I()?S():h.current&&jr(h.current,x))}),B=N.useCallback(()=>{o.remove(y(),x)},[x,o]);N.useEffect(()=>()=>{B()},[B]),N.useEffect(()=>{m?C():(!R||!a)&&B()},[m,B,R,a,C]);const k=$=>F=>{var W;(W=$.onKeyDown)==null||W.call($,F),!(F.key!=="Escape"||F.which===229||!I())&&(r||(F.stopPropagation(),d&&d(F,"escapeKeyDown")))},O=$=>F=>{var W;(W=$.onClick)==null||W.call($,F),F.target===F.currentTarget&&d&&d(F,"backdropClick")};return{getRootProps:($={})=>{const F=Oi(e);delete F.onTransitionEnter,delete F.onTransitionExited;const W=_({},F,$);return _({role:"presentation"},W,{onKeyDown:k(W),ref:f})},getBackdropProps:($={})=>{const F=$;return _({"aria-hidden":!0},F,{onClick:O(F),open:m})},getTransitionProps:()=>{const $=()=>{w(!1),s&&s()},F=()=>{w(!0),l&&l(),a&&B()};return{onEnter:ho($,c==null?void 0:c.props.onEnter),onExited:ho(F,c==null?void 0:c.props.onExited)}},rootRef:f,portalRef:A,isTopModal:I,exited:b,hasTransition:R}}function Tg(e){return et("MuiModal",e)}gt("MuiModal",["root","hidden","backdrop"]);const Ng=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Cg=e=>{const{open:t,exited:r,classes:n}=e;return ht({root:["root",!t&&r&&"hidden"],backdrop:["backdrop"]},Tg,n)},Sg=Re("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,!r.open&&r.exited&&t.hidden]}})(({theme:e,ownerState:t})=>_({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Og=Re(yg,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),xl=N.forwardRef(function(t,r){var n,o,a,s,l,c;const d=bt({name:"MuiModal",props:t}),{BackdropComponent:m=Og,BackdropProps:v,className:g,closeAfterTransition:u=!1,children:h,container:f,component:b,components:w={},componentsProps:R={},disableAutoFocus:x=!1,disableEnforceFocus:E=!1,disableEscapeKeyDown:y=!1,disablePortal:S=!1,disableRestoreFocus:C=!1,disableScrollLock:I=!1,hideBackdrop:A=!1,keepMounted:B=!1,onBackdropClick:k,open:O,slotProps:j,slots:z}=d,q=fe(d,Ng),$=_({},d,{closeAfterTransition:u,disableAutoFocus:x,disableEnforceFocus:E,disableEscapeKeyDown:y,disablePortal:S,disableRestoreFocus:C,disableScrollLock:I,hideBackdrop:A,keepMounted:B}),{getRootProps:F,getBackdropProps:W,getTransitionProps:te,portalRef:P,isTopModal:M,exited:U,hasTransition:Y}=kg(_({},$,{rootRef:r})),H=_({},$,{exited:U}),G=Cg(H),K={};if(h.props.tabIndex===void 0&&(K.tabIndex="-1"),Y){const{onEnter:ee,onExited:D}=te();K.onEnter=ee,K.onExited=D}const J=(n=(o=z==null?void 0:z.root)!=null?o:w.Root)!=null?n:Sg,X=(a=(s=z==null?void 0:z.backdrop)!=null?s:w.Backdrop)!=null?a:m,Z=(l=j==null?void 0:j.root)!=null?l:R.root,Q=(c=j==null?void 0:j.backdrop)!=null?c:R.backdrop,ae=Lt({elementType:J,externalSlotProps:Z,externalForwardedProps:q,getSlotProps:F,additionalProps:{ref:r,as:b},ownerState:H,className:Ce(g,Z==null?void 0:Z.className,G==null?void 0:G.root,!H.open&&H.exited&&(G==null?void 0:G.hidden))}),L=Lt({elementType:X,externalSlotProps:Q,additionalProps:v,getSlotProps:ee=>W(_({},ee,{onClick:D=>{k&&k(D),ee!=null&&ee.onClick&&ee.onClick(D)}})),className:Ce(Q==null?void 0:Q.className,v==null?void 0:v.className,G==null?void 0:G.backdrop),ownerState:H});return!B&&!O&&(!Y||U)?null:p.jsx(ll,{ref:P,container:f,disablePortal:S,children:p.jsxs(J,_({},ae,{children:[!A&&m?p.jsx(X,_({},L)):null,p.jsx(kn,{disableEnforceFocus:E,disableAutoFocus:x,disableRestoreFocus:C,isEnabled:M,open:O,children:N.cloneElement(h,K)})]}))})});process.env.NODE_ENV!=="production"&&(xl.propTypes={BackdropComponent:i.elementType,BackdropProps:i.object,children:qr.isRequired,classes:i.object,className:i.string,closeAfterTransition:i.bool,component:i.elementType,components:i.shape({Backdrop:i.elementType,Root:i.elementType}),componentsProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([dt,i.func]),disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableEscapeKeyDown:i.bool,disablePortal:i.bool,disableRestoreFocus:i.bool,disableScrollLock:i.bool,hideBackdrop:i.bool,keepMounted:i.bool,onBackdropClick:i.func,onClose:i.func,onTransitionEnter:i.func,onTransitionExited:i.func,open:i.bool.isRequired,slotProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({backdrop:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const Rg=xl;function Pg(e){return et("MuiPaper",e)}gt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const jg=["className","component","elevation","square","variant"],_g=e=>{const{square:t,elevation:r,variant:n,classes:o}=e,a={root:["root",n,!t&&"rounded",n==="elevation"&&`elevation${r}`]};return ht(a,Pg,o)},$g=Re("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],!r.square&&t.rounded,r.variant==="elevation"&&t[`elevation${r.elevation}`]]}})(({theme:e,ownerState:t})=>{var r;return _({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&_({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${bn("#fff",as(t.elevation))}, ${bn("#fff",as(t.elevation))})`},e.vars&&{backgroundImage:(r=e.vars.overlays)==null?void 0:r[t.elevation]}))}),El=N.forwardRef(function(t,r){const n=bt({props:t,name:"MuiPaper"}),{className:o,component:a="div",elevation:s=1,square:l=!1,variant:c="elevation"}=n,d=fe(n,jg),m=_({},n,{component:a,elevation:s,square:l,variant:c}),v=_g(m);return process.env.NODE_ENV!=="production"&&Dn().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),p.jsx($g,_({as:a,ownerState:m,className:Ce(v.root,o),ref:r},d))});process.env.NODE_ENV!=="production"&&(El.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,elevation:ir(Ni,e=>{const{elevation:t,variant:r}=e;return t>0&&r==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${r}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:i.bool,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),variant:i.oneOfType([i.oneOf(["elevation","outlined"]),i.string])});const Mg=El;function Ig(e){return et("MuiPopover",e)}gt("MuiPopover",["root","paper"]);const Dg=["onEntering"],Ag=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Bg=["slotProps"];function xs(e,t){let r=0;return typeof t=="number"?r=t:t==="center"?r=e.height/2:t==="bottom"&&(r=e.height),r}function Es(e,t){let r=0;return typeof t=="number"?r=t:t==="center"?r=e.width/2:t==="right"&&(r=e.width),r}function ks(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function dn(e){return typeof e=="function"?e():e}const Lg=e=>{const{classes:t}=e;return ht({root:["root"],paper:["paper"]},Ig,t)},Vg=Re(Rg,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),kl=Re(Mg,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Tl=N.forwardRef(function(t,r){var n,o,a;const s=bt({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:d={vertical:"top",horizontal:"left"},anchorPosition:m,anchorReference:v="anchorEl",children:g,className:u,container:h,elevation:f=8,marginThreshold:b=16,open:w,PaperProps:R={},slots:x,slotProps:E,transformOrigin:y={vertical:"top",horizontal:"left"},TransitionComponent:S=ko,transitionDuration:C="auto",TransitionProps:{onEntering:I}={},disableScrollLock:A=!1}=s,B=fe(s.TransitionProps,Dg),k=fe(s,Ag),O=(n=E==null?void 0:E.paper)!=null?n:R,j=N.useRef(),z=We(j,O.ref),q=_({},s,{anchorOrigin:d,anchorReference:v,elevation:f,marginThreshold:b,externalPaperSlotProps:O,transformOrigin:y,TransitionComponent:S,transitionDuration:C,TransitionProps:B}),$=Lg(q),F=N.useCallback(()=>{if(v==="anchorPosition")return process.env.NODE_ENV!=="production"&&(m||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),m;const ee=dn(c),D=ee&&ee.nodeType===1?ee:Oe(j.current).body,se=D.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Te=D.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Te.top===0&&Te.left===0&&Te.right===0&&Te.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:se.top+xs(se,d.vertical),left:se.left+Es(se,d.horizontal)}},[c,d.horizontal,d.vertical,m,v]),W=N.useCallback(ee=>({vertical:xs(ee,y.vertical),horizontal:Es(ee,y.horizontal)}),[y.horizontal,y.vertical]),te=N.useCallback(ee=>{const D={width:ee.offsetWidth,height:ee.offsetHeight},se=W(D);if(v==="none")return{top:null,left:null,transformOrigin:ks(se)};const Te=F();let Pe=Te.top-se.vertical,we=Te.left-se.horizontal;const St=Pe+D.height,je=we+D.width,it=er(dn(c)),Ae=it.innerHeight-b,lt=it.innerWidth-b;if(b!==null&&Pe<b){const Ne=Pe-b;Pe-=Ne,se.vertical+=Ne}else if(b!==null&&St>Ae){const Ne=St-Ae;Pe-=Ne,se.vertical+=Ne}if(process.env.NODE_ENV!=="production"&&D.height>Ae&&D.height&&Ae&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${D.height-Ae}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),b!==null&&we<b){const Ne=we-b;we-=Ne,se.horizontal+=Ne}else if(je>lt){const Ne=je-lt;we-=Ne,se.horizontal+=Ne}return{top:`${Math.round(Pe)}px`,left:`${Math.round(we)}px`,transformOrigin:ks(se)}},[c,v,F,W,b]),[P,M]=N.useState(w),U=N.useCallback(()=>{const ee=j.current;if(!ee)return;const D=te(ee);D.top!==null&&(ee.style.top=D.top),D.left!==null&&(ee.style.left=D.left),ee.style.transformOrigin=D.transformOrigin,M(!0)},[te]);N.useEffect(()=>(A&&window.addEventListener("scroll",U),()=>window.removeEventListener("scroll",U)),[c,A,U]);const Y=(ee,D)=>{I&&I(ee,D),U()},H=()=>{M(!1)};N.useEffect(()=>{w&&U()}),N.useImperativeHandle(l,()=>w?{updatePosition:()=>{U()}}:null,[w,U]),N.useEffect(()=>{if(!w)return;const ee=vi(()=>{U()}),D=er(c);return D.addEventListener("resize",ee),()=>{ee.clear(),D.removeEventListener("resize",ee)}},[c,w,U]);let G=C;C==="auto"&&!S.muiSupportAuto&&(G=void 0);const K=h||(c?Oe(dn(c)).body:void 0),J=(o=x==null?void 0:x.root)!=null?o:Vg,X=(a=x==null?void 0:x.paper)!=null?a:kl,Z=Lt({elementType:X,externalSlotProps:_({},O,{style:P?O.style:_({},O.style,{opacity:0})}),additionalProps:{elevation:f,ref:z},ownerState:q,className:Ce($.paper,O==null?void 0:O.className)}),Q=Lt({elementType:J,externalSlotProps:(E==null?void 0:E.root)||{},externalForwardedProps:k,additionalProps:{ref:r,slotProps:{backdrop:{invisible:!0}},container:K,open:w},ownerState:q,className:Ce($.root,u)}),{slotProps:ae}=Q,L=fe(Q,Bg);return p.jsx(J,_({},L,!Si(J)&&{slotProps:ae,disableScrollLock:A},{children:p.jsx(S,_({appear:!0,in:w,onEntering:Y,onExited:H,timeout:G},B,{children:p.jsx(X,_({},Z,{children:g}))}))}))});process.env.NODE_ENV!=="production"&&(Tl.propTypes={action:Fo,anchorEl:ir(i.oneOfType([dt,i.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=dn(e.anchorEl);if(t&&t.nodeType===1){const r=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&r.top===0&&r.left===0&&r.right===0&&r.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),anchorPosition:i.shape({left:i.number.isRequired,top:i.number.isRequired}),anchorReference:i.oneOf(["anchorEl","anchorPosition","none"]),children:i.node,classes:i.object,className:i.string,container:i.oneOfType([dt,i.func]),disableScrollLock:i.bool,elevation:Ni,marginThreshold:i.number,onClose:i.func,open:i.bool.isRequired,PaperProps:i.shape({component:Ip}),slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transformOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object});const Fg=Tl;function zg(e){return et("MuiMenu",e)}gt("MuiMenu",["root","paper","list"]);const Ug=["onEntering"],qg=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Hg={vertical:"top",horizontal:"right"},Wg={vertical:"top",horizontal:"left"},Gg=e=>{const{classes:t}=e;return ht({root:["root"],paper:["paper"],list:["list"]},zg,t)},Xg=Re(Fg,{shouldForwardProp:e=>qi(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Yg=Re(kl,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),Kg=Re(eg,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Nl=N.forwardRef(function(t,r){var n,o;const a=bt({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:l,className:c,disableAutoFocusItem:d=!1,MenuListProps:m={},onClose:v,open:g,PaperProps:u={},PopoverClasses:h,transitionDuration:f="auto",TransitionProps:{onEntering:b}={},variant:w="selectedMenu",slots:R={},slotProps:x={}}=a,E=fe(a.TransitionProps,Ug),y=fe(a,qg),S=Gi(),C=_({},a,{autoFocus:s,disableAutoFocusItem:d,MenuListProps:m,onEntering:b,PaperProps:u,transitionDuration:f,TransitionProps:E,variant:w}),I=Gg(C),A=s&&!d&&g,B=N.useRef(null),k=(W,te)=>{B.current&&B.current.adjustStyleForScrollbar(W,{direction:S?"rtl":"ltr"}),b&&b(W,te)},O=W=>{W.key==="Tab"&&(W.preventDefault(),v&&v(W,"tabKeyDown"))};let j=-1;N.Children.map(l,(W,te)=>{N.isValidElement(W)&&(process.env.NODE_ENV!=="production"&&mn.isFragment(W)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),W.props.disabled||(w==="selectedMenu"&&W.props.selected||j===-1)&&(j=te))});const z=(n=R.paper)!=null?n:Yg,q=(o=x.paper)!=null?o:u,$=Lt({elementType:R.root,externalSlotProps:x.root,ownerState:C,className:[I.root,c]}),F=Lt({elementType:z,externalSlotProps:q,ownerState:C,className:I.paper});return p.jsx(Xg,_({onClose:v,anchorOrigin:{vertical:"bottom",horizontal:S?"right":"left"},transformOrigin:S?Hg:Wg,slots:{paper:z,root:R.root},slotProps:{root:$,paper:F},open:g,ref:r,transitionDuration:f,TransitionProps:_({onEntering:k},E),ownerState:C},y,{classes:h,children:p.jsx(Kg,_({onKeyDown:O,actions:B,autoFocus:s&&(j===-1||d),autoFocusItem:A,variant:w},m,{className:Ce(I.list,m.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(Nl.propTypes={anchorEl:i.oneOfType([dt,i.func]),autoFocus:i.bool,children:i.node,classes:i.object,className:i.string,disableAutoFocusItem:i.bool,MenuListProps:i.object,onClose:i.func,open:i.bool.isRequired,PaperProps:i.object,PopoverClasses:i.object,slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object,variant:i.oneOf(["menu","selectedMenu"])});const Jg=Nl;function Zg({className:e,commandHandler:t,menuDefinition:r,children:n}){var d;const[o,a]=T.useState(void 0),s=T.useCallback(m=>{m.preventDefault(),a(o===void 0?{mouseX:m.clientX+2,mouseY:m.clientY-6}:void 0)},[o]),l=T.useCallback(()=>{a(void 0)},[]),c=T.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((d=r==null?void 0:r.items)==null?void 0:d.length)??0)===0||!n?n:p.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[n,p.jsx(Jg,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:p.jsx(sa,{menuDefinition:r,commandHandler:t,onClick:l})})]})}function Qg(e){return{preserveValue:!0,...e}}const Tn=(e,t,r={})=>{const n=T.useRef(t);n.current=t;const o=T.useRef(r);o.current=Qg(o.current);const[a,s]=T.useState(()=>n.current),[l,c]=T.useState(!0);return T.useEffect(()=>{let d=!0;return c(!!e),(async()=>{if(e){const m=await e();d&&(s(()=>m),c(!1))}})(),()=>{d=!1,o.current.preserveValue||s(()=>n.current)}},[e]),[a,l]},eb=Hi(p.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Cl({menuProvider:e,normalMenu:t,fullMenu:r,commandHandler:n,containerRef:o,className:a,ariaLabelPrefix:s,children:l}){const[c,d]=T.useState(!1),[m,v]=T.useState(!1),g=T.useCallback(()=>{c&&d(!1),v(!1)},[c]),u=T.useCallback(E=>{E.stopPropagation(),d(y=>{const S=!y;return S&&E.shiftKey?v(!0):S||v(!1),S})},[]),h=T.useCallback(E=>(g(),n(E)),[n,g]),[f,b]=T.useState({top:1,left:1});T.useEffect(()=>{if(c){const E=o==null?void 0:o.current;if(E){const y=E.getBoundingClientRect(),S=window.scrollY,C=window.scrollX,I=y.top+S+E.clientHeight,A=y.left+C;b({top:I,left:A})}}},[c,o]);const[w]=Tn(T.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[R]=Tn(T.useCallback(async()=>(e==null?void 0:e(!0))??r??w,[e,r,w,c]),r??w),x=m&&R?R:w;return p.jsxs(p.Fragment,{children:[p.jsx(ke.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:u,children:l??p.jsx(eb,{})}),p.jsx(ke.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:c,onClose:g,PaperProps:{className:"papi-menu-drawer-paper",style:{top:f.top,left:f.left}},children:x?p.jsx(ml,{className:a,id:`${s??""} main menu`,commandHandler:h,multiColumnMenu:x}):void 0})]})}function tb({id:e,label:t,isDisabled:r=!1,tooltip:n,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:s="medium",className:l,onClick:c,children:d}){return p.jsx(ke.IconButton,{id:e,disabled:r,edge:a,size:s,"aria-label":t,title:o?void 0:n??t,className:`papi-icon-button ${l??""}`,onClick:c,children:d})}const xt="scrBook",rb="scrRef",_t="source",nb="details",ob="Scripture Reference",ab="Scripture Book",Sl="Type",sb="Details";function ib(e,t){const r=t??!1;return[{accessorFn:n=>`${de.bookNumberToId(n.start.bookNum)} ${n.start.chapterNum}:${n.start.verseNum}`,id:xt,header:(e==null?void 0:e.scriptureReferenceColumnName)??ob,cell:n=>{const o=n.row.original;return n.row.getIsGrouped()?de.bookNumberToEnglishName(o.start.bookNum):n.row.groupingColumnId===xt?Ze.formatScrRef(o.start):void 0},getGroupingValue:n=>n.start.bookNum,sortingFn:(n,o)=>Ze.compareScrRefs(n.original.start,o.original.start),enableGrouping:!0},{accessorFn:n=>Ze.formatScrRef(n.start),id:rb,header:void 0,cell:n=>{const o=n.row.original;return n.row.getIsGrouped()?void 0:Ze.formatScrRef(o.start)},sortingFn:(n,o)=>Ze.compareScrRefs(n.original.start,o.original.start),enableGrouping:!1},{accessorFn:n=>n.source.displayName,id:_t,header:r?(e==null?void 0:e.typeColumnName)??Sl:void 0,cell:n=>r||n.row.getIsGrouped()?n.getValue():void 0,getGroupingValue:n=>n.source.id,sortingFn:(n,o)=>n.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:n=>n.detail,id:nb,header:(e==null?void 0:e.detailsColumnName)??sb,cell:n=>n.getValue(),enableGrouping:!1}]}function lb({sources:e,showColumnHeaders:t=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:n,scriptureBookGroupName:o,typeColumnName:a,detailsColumnName:s,onRowSelected:l}){const[c,d]=T.useState([]),[m,v]=T.useState([{id:xt,desc:!1}]),[g,u]=T.useState(()=>e.flatMap(k=>{const O=k.source;return k.data.map(j=>({...j,source:O}))})),[h,f]=T.useState({});T.useEffect(()=>{u(()=>e.flatMap(k=>{const O=k.source;return k.data.map(j=>({...j,source:O}))}))},[e]);const b=T.useMemo(()=>ib({scriptureReferenceColumnName:n,typeColumnName:a,detailsColumnName:s},r),[n,a,s,r]);T.useEffect(()=>{c.includes(_t)?v([{id:_t,desc:!1},{id:xt,desc:!1}]):v([{id:xt,desc:!1}])},[c]);const w=T.useCallback((k,O)=>!O||Ze.compareScrRefs(k,O)===0?`${Ze.scrRefToBBBCCCVVV(k)}`:`${Ze.scrRefToBBBCCCVVV(k)}-${Ze.scrRefToBBBCCCVVV(O)}`,[]),R=T.useCallback(k=>`${w(k.start,k.end)} ${k.source} ${k.detail}`,[w]),x=Se.useReactTable({data:g,columns:b,state:{grouping:c,sorting:m,rowSelection:h},onGroupingChange:d,onSortingChange:v,onRowSelectionChange:f,getExpandedRowModel:Se.getExpandedRowModel(),getGroupedRowModel:Se.getGroupedRowModel(),getCoreRowModel:Se.getCoreRowModel(),getSortedRowModel:Se.getSortedRowModel(),getRowId:R,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});T.useEffect(()=>{if(l){const k=x.getSelectedRowModel().rowsById,O=Object.keys(k);if(O.length===1){const j=g.find(z=>R(z)===O[0])||void 0;j&&l(j)}}},[h,g,R,l,x]);const E=o??ab,y=a??Sl,S=[{label:"No Grouping",value:[]},{label:`Group by ${E}`,value:[xt]},{label:`Group by ${y}`,value:[_t]},{label:`Group by ${E} and ${y}`,value:[xt,_t]},{label:`Group by ${y} and ${E}`,value:[_t,xt]}],C=k=>{d(JSON.parse(k))},I=(k,O)=>{!k.getIsGrouped()&&!k.getIsSelected()&&k.getToggleSelectedHandler()(O)},A=(k,O)=>k.getIsGrouped()?"":V("banded-row",O%2===0?"even":"odd"),B=(k,O,j)=>{if(!((k==null?void 0:k.length)===0||O.depth<j.column.getGroupedIndex())){if(O.getIsGrouped())switch(O.depth){case 1:return"pr-ps-4";default:return}switch(O.depth){case 1:return"pr-ps-8";case 2:return"pr-ps-12";default:return}}};return p.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-w-full pr-flex-col",children:[!t&&p.jsxs($r,{value:JSON.stringify(c),onValueChange:k=>{C(k)},children:[p.jsx(Jt,{className:"pr-mb-1 pr-mt-2",children:p.jsx(Mr,{})}),p.jsx(Zt,{position:"item-aligned",children:p.jsx(Ys,{children:S.map(k=>p.jsx(Je,{value:JSON.stringify(k.value),children:k.label},k.label))})})]}),p.jsxs(Fr,{className:"pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0",children:[t&&p.jsx(zr,{children:x.getHeaderGroups().map(k=>p.jsx(ut,{children:k.headers.filter(O=>O.column.columnDef.header).map(O=>p.jsx(Qt,{colSpan:O.colSpan,className:"top-0 pr-sticky",children:O.isPlaceholder?void 0:p.jsxs("div",{children:[O.column.getCanGroup()?p.jsx(ge,{variant:"ghost",title:`Toggle grouping by ${O.column.columnDef.header}`,onClick:O.column.getToggleGroupingHandler(),type:"button",children:O.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Se.flexRender(O.column.columnDef.header,O.getContext())]})},O.id))},k.id))}),p.jsx(Ur,{children:x.getRowModel().rows.map((k,O)=>p.jsx(ut,{"data-state":k.getIsSelected()?"selected":"",className:V(A(k,O)),onClick:j=>I(k,j),children:k.getVisibleCells().map(j=>{if(!(j.getIsPlaceholder()||j.column.columnDef.enableGrouping&&!j.getIsGrouped()&&(j.column.columnDef.id!==_t||!r)))return p.jsx(At,{className:V(j.column.columnDef.id,"pr-p-[1px]",B(c,k,j)),children:(()=>j.getIsGrouped()?p.jsxs(ge,{variant:"ghost",onClick:k.getToggleExpandedHandler(),type:"button",children:[k.getIsExpanded()?"👇":"👉"," ",Se.flexRender(j.column.columnDef.cell,j.getContext())," (",k.subRows.length,")"]}):Se.flexRender(j.column.columnDef.cell,j.getContext()))()},j.id)})},k.id))})]})]})}function Ol({onSearch:e,placeholder:t,isFullWidth:r}){const[n,o]=T.useState(""),a=s=>{o(s),e(s)};return p.jsx(ar,{className:V("pr-flex pr-h-10 pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-[color:hsl(240,5%,64.9%)] focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",{"pr-w-full":r}),placeholder:t,value:n,onChange:s=>a(s.target.value)})}function cb({id:e,isDisabled:t=!1,orientation:r="horizontal",min:n=0,max:o=100,step:a=1,showMarks:s=!1,defaultValue:l,value:c,valueLabelDisplay:d="off",className:m,onChange:v,onChangeCommitted:g}){return p.jsx(ke.Slider,{id:e,disabled:t,orientation:r,min:n,max:o,step:a,marks:s,defaultValue:l,value:c,valueLabelDisplay:d,className:`papi-slider ${r} ${m??""}`,onChange:v,onChangeCommitted:g})}function pb({autoHideDuration:e=void 0,id:t,isOpen:r=!1,className:n,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:s,children:l}){const c={action:(s==null?void 0:s.action)||l,message:s==null?void 0:s.message,className:n};return p.jsx(ke.Snackbar,{autoHideDuration:e??void 0,open:r,onClose:o,anchorOrigin:a,id:t,ContentProps:c})}const ia=T.forwardRef(({className:e,...t},r)=>p.jsx(De.Root,{orientation:"vertical",ref:r,className:V("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));ia.displayName=De.List.displayName;const la=T.forwardRef(({className:e,...t},r)=>p.jsx(De.List,{ref:r,className:V("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));la.displayName=De.List.displayName;const Rl=T.forwardRef(({className:e,...t},r)=>p.jsx(De.Trigger,{ref:r,...t,className:V("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),ca=T.forwardRef(({className:e,...t},r)=>p.jsx(De.Content,{ref:r,className:V("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));ca.displayName=De.Content.displayName;function ub({tabList:e,onSearch:t,searchPlaceholder:r,headerTitle:n,isSearchBarFullWidth:o=!1}){return p.jsxs("div",{children:[p.jsxs("div",{className:"pr-space-y-2 pr-pb-2",children:[n?p.jsx("h1",{children:n}):"",p.jsx(Ol,{isFullWidth:o,onSearch:t,placeholder:r})]}),p.jsxs(ia,{children:[p.jsx(la,{children:e.map(a=>p.jsx(Rl,{value:a.value,children:a.value},a.key))}),e.map(a=>p.jsx(ca,{value:a.value,children:a.content},a.key))]})]})}const Pl=N.forwardRef(({className:e,orientation:t="horizontal",decorative:r=!0,...n},o)=>p.jsx(Is.Root,{ref:o,decorative:r,orientation:t,className:V("pr-shrink-0 pr-bg-border",t==="horizontal"?"pr-h-[1px] pr-w-full":"pr-h-full pr-w-[1px]",e),...n}));Pl.displayName=Is.Root.displayName;function db({children:e}){return p.jsx("div",{className:"pr-twp pr-grid",children:e})}function fb({primary:e,secondary:t,generateActionComponent:r,isLoading:n=!1,loadingMessage:o}){return p.jsxs("div",{className:"pr-flex pr-items-center pr-justify-between pr-space-x-4 pr-py-2",children:[p.jsxs("div",{children:[p.jsx("p",{className:"pr-text-sm pr-font-medium pr-leading-none",children:e}),p.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:t})]}),n?p.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:o}):r()]})}function mb({primary:e,secondary:t,includeSeparator:r=!1}){return p.jsxs("div",{className:"pr-space-y-4 pr-py-2",children:[p.jsxs("div",{children:[p.jsx("h3",{className:"pr-text-lg pr-font-medium",children:e}),p.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:t})]}),r?p.jsx(Pl,{}):""]})}function hb({id:e,isChecked:t,isDisabled:r=!1,hasError:n=!1,className:o,onChange:a}){return p.jsx(ke.Switch,{id:e,checked:t,disabled:r,className:`papi-switch ${n?"error":""} ${o??""}`,onChange:a})}const gb=Oo.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),pa=T.forwardRef(({className:e,...t},r)=>p.jsx(Ds.Root,{ref:r,className:V(gb(),e),...t}));pa.displayName=Ds.Root.displayName;function bb({id:e,isDisabled:t=!1,hasError:r=!1,isFullWidth:n=!1,helperText:o,label:a,placeholder:s,isRequired:l=!1,className:c,defaultValue:d,value:m,onChange:v,onFocus:g,onBlur:u}){return p.jsxs("div",{className:V("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":n}),children:[p.jsx(pa,{htmlFor:e,className:V({"pr-text-red-600":r,"pr-hidden":!a}),children:`${a}${l?"*":""}`}),p.jsx(ar,{id:e,disabled:t,placeholder:s,required:l,className:V(c,{"pr-border-red-600":r}),defaultValue:d,value:m,onChange:v,onFocus:g,onBlur:u}),p.jsx("p",{className:V({"pr-hidden":!o}),children:o})]})}function vb({menuProvider:e,commandHandler:t,className:r,id:n,children:o}){const a=T.useRef(void 0);return p.jsx("div",{ref:a,style:{position:"relative"},children:p.jsx(ke.AppBar,{position:"static",id:n,children:p.jsxs(ke.Toolbar,{className:`papi-toolbar ${r??""}`,variant:"dense",children:[e?p.jsx(Cl,{commandHandler:t,containerRef:a,menuProvider:e}):void 0,o?p.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const yb=De.Root,jl=T.forwardRef(({className:e,...t},r)=>p.jsx(De.List,{ref:r,className:V("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));jl.displayName=De.List.displayName;const _l=T.forwardRef(({className:e,...t},r)=>p.jsx(De.Trigger,{ref:r,className:V("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));_l.displayName=De.Trigger.displayName;const $l=T.forwardRef(({className:e,...t},r)=>p.jsx(De.Content,{ref:r,className:V("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));$l.displayName=De.Content.displayName;const ln=e=>e==="asc"?p.jsx(oe.ArrowUpIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):e==="desc"?p.jsx(oe.ArrowDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):p.jsx(oe.ArrowUpDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}),wb=(e,t,r,n,o)=>[{accessorKey:"character",header:({column:a})=>p.jsxs(ge,{onClick:()=>a.toggleSorting(void 0),children:[e,ln(a.getIsSorted())]})},{accessorKey:"unicodeValue",header:({column:a})=>p.jsxs(ge,{onClick:()=>a.toggleSorting(void 0),children:[t,ln(a.getIsSorted())]}),cell:({row:a})=>a.getValue("character").charCodeAt(0).toString(16).toUpperCase().padStart(4,"0")},{accessorKey:"count",header:({column:a})=>p.jsxs(ge,{onClick:()=>a.toggleSorting(void 0),children:[r,ln(a.getIsSorted())]})},{accessorKey:"status",header:({column:a,table:s})=>{const l=s.getSelectedRowModel().rows,c=[];return l.forEach(d=>{c.push(d.getValue("character"))}),p.jsxs("div",{children:[p.jsx("div",{className:"pr-flex pr-justify-center",children:p.jsxs(ge,{onClick:()=>a.toggleSorting(void 0),children:[n,ln(a.getIsSorted())]})}),p.jsxs("div",{className:"pr-flex pr-justify-center",children:[p.jsx(ge,{children:p.jsx(oe.CircleCheckIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,!0)}})}),p.jsx(ge,{children:p.jsx(oe.CircleXIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,!1)}})}),p.jsx(ge,{children:p.jsx(oe.CircleHelpIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,void 0)}})})]})]})},cell:({row:a})=>{const s=a.getValue("status");return s===!0?p.jsx(oe.CircleCheckIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):s===!1?p.jsx(oe.CircleXIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):p.jsx(oe.CircleHelpIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"})}}];function xb({tableData:e,onStatusChange:t,onSelectCharacter:r,localizedStrings:n}){const o=n["%webView_inventory_table_header_character%"],a=n["%webView_inventory_table_header_unicode_value%"],s=n["%webView_inventory_table_header_count%"],l=n["%webView_inventory_table_header_status%"],c=(d,m)=>{m.toggleAllRowsSelected(!1),d.toggleSelected(void 0),r(d.getValue("character"))};return p.jsx("div",{className:"pr-overflow-y-auto",children:p.jsx(ei,{columns:wb(o,a,s,l,t),data:e,onRowClickHandler:c})})}const Ts=(e,t,r)=>{if(!e||e===""||t==="")return[];const n=[],o=e.split(`
`);let a="0",s="0",l=0;return o.forEach(c=>{const d=c.split(/\s+/);c.startsWith("\\c")&&([,a]=d,s="0"),c.startsWith("\\v")&&([,s]=d,a==="0"&&(a=r.chapterNum.toString()));for(let m=0;m<d.length;m++)if(d[m].includes(t)){const v=Math.max(0,m-2),g=Math.min(d.length,m+3),u=d.slice(v,g).join(" "),h={reference:{...r,chapterNum:+a,verseNum:+s},snippet:u,key:l};l+=1,n.push(h)}}),n};function Eb({selectedCharacter:e,text:t,scriptureReference:r,setScriptureReference:n,localizedStrings:o}){const a=o["%webView_inventory_occurrences_table_header_reference%"],s=o["%webView_inventory_occurrences_table_header_occurrence%"],[l,c]=T.useState(Ts(t,e,r));return T.useEffect(()=>c(Ts(t,e,r)),[t,e,r]),p.jsxs(Fr,{children:[p.jsx(zr,{children:p.jsxs(ut,{children:[p.jsx(Qt,{children:a}),p.jsx(Qt,{children:s})]})}),p.jsx(Ur,{children:l.map(d=>p.jsxs(ut,{onClick:()=>{n(d.reference)},children:[p.jsx(At,{children:`${de.bookNumberToEnglishName(d.reference.bookNum)} ${d.reference.chapterNum}:${d.reference.verseNum}`}),p.jsx(At,{children:d.snippet})]},d.key))})]})}const kb=async(e,t,r,n,o)=>{const a=[];return Ze.split(e,"").forEach(s=>{if(r!==""&&!s.includes(r))return;const l=a.find(c=>c.character===s);if(l)l.count+=1;else{let c;if(n.includes(s)&&(c=!0),o.includes(s)&&(c=!1),t==="all"||t==="approved"&&c===!0||t==="unapproved"&&c===!1||t==="unknown"&&c===void 0){const d={character:s,count:1,status:c};a.push(d)}}}),a};function Tb({scriptureReference:e,setScriptureReference:t,localizedStrings:r,projectId:n,getSetting:o,setSetting:a,getText:s}){const l=r["%webView_characterInventory_characters_all%"],c=r["%webView_characterInventory_characters_approved%"],d=r["%webView_characterInventory_characters_unapproved%"],m=r["%webView_characterInventory_characters_unknown%"],v=r["%webView_inventory_scope_book%"],g=r["%webView_inventory_scope_chapter%"],u=r["%webView_inventory_scope_verse%"],h=r["%webView_inventory_filter_text%"],[f,b]=T.useState([]),[w,R]=T.useState([]),[x,E]=T.useState(void 0),[y,S]=T.useState("book"),[C,I]=T.useState("all"),[A,B]=T.useState(""),[k,O]=T.useState([]),[j,z]=T.useState(""),q=($,F)=>{O(W=>{let te=[];return $.forEach(P=>{te=W.map(M=>M.character===P&&M.status!==F?{...M,status:F}:M)}),b(P=>{let M=[...P];return $.forEach(U=>{F===!0?M.includes(U)||M.push(U):M=M.filter(Y=>Y!==U)}),a("validCharacters",n,M),M}),R(P=>{let M=[...P];return $.forEach(U=>{F===!1?M.includes(U)||M.push(U):M=M.filter(Y=>Y!==U)}),a("invalidCharacters",n,M),M}),te})};return T.useEffect(()=>{(async()=>{try{b(await o("validCharacters",n)),R(await o("invalidCharacters",n))}catch{throw new Error("Failed to fetch characters from project settings")}})()},[n,o]),T.useEffect(()=>{(async()=>{try{const F=await s(n,e,y);E(F)}catch{throw new Error("Failed getting scripture text")}})()},[n,e,y,s]),T.useEffect(()=>{if(!x){O([]);return}(async()=>{try{O(await kb(x,C,A,f,w))}catch{throw new Error("Failed building table data")}})()},[f,w,x,C,A]),p.jsxs("div",{className:"pr-twp",children:[p.jsxs("div",{className:"pr-flex",children:[p.jsxs($r,{onValueChange:$=>I($),defaultValue:C,children:[p.jsx(Jt,{children:p.jsx(Mr,{placeholder:"Select filter"})}),p.jsxs(Zt,{children:[p.jsx(Je,{value:"all",children:l}),p.jsx(Je,{value:"approved",children:c}),p.jsx(Je,{value:"unapproved",children:d}),p.jsx(Je,{value:"unknown",children:m})]})]}),p.jsxs($r,{onValueChange:$=>S($),defaultValue:y,children:[p.jsx(Jt,{children:p.jsx(Mr,{placeholder:"Select scope"})}),p.jsxs(Zt,{children:[p.jsx(Je,{value:"book",children:v}),p.jsx(Je,{value:"chapter",children:g}),p.jsx(Je,{value:"verse",children:u})]})]}),p.jsx(ar,{className:"pr-rounded-md pr-border",placeholder:h,value:A,onChange:$=>{B($.target.value)}})]}),p.jsx("div",{className:`pr-overflow-y-auto pr-rounded-md pr-border ${j!==""&&"pr-max-h-96"}`,children:p.jsx(xb,{tableData:k,onStatusChange:q,onSelectCharacter:$=>{z($)},localizedStrings:r})}),j!==""&&p.jsx("div",{className:"pr-mt-4 pr-rounded-md pr-border",children:p.jsx(Eb,{selectedCharacter:j,text:x,scriptureReference:e,setScriptureReference:$=>t($),localizedStrings:r})})]})}function Nb({isInstalling:e,handleClick:t,buttonText:r}){return p.jsx(ge,{className:V("pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out",{"pr-cursor-not-allowed pr-bg-blue-700":e,"pr-bg-blue-600":!e,"pr-bg-white pr-text-blue-600":!r,"pr-w-20":r}),onClick:t,children:e?p.jsx(oe.LoaderCircle,{size:15,className:"pr-animate-spin"}):p.jsxs(p.Fragment,{children:[p.jsx(oe.Download,{size:25,className:V("pr-h-4 pr-w-4",{"pr-mr-1":r})}),r]})})}function Cb({isEnabling:e,handleClick:t}){return p.jsx(ge,{className:V("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e}),onClick:t,children:e?p.jsxs(p.Fragment,{children:[p.jsx(oe.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-white"}),"Enabling..."]}):"Enable"})}function Sb({isDisabling:e,handleClick:t}){return p.jsx(ge,{className:V("pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-gray-400":e}),onClick:t,children:e?p.jsxs(p.Fragment,{children:[p.jsx(oe.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-black"}),"Disabling..."]}):"Disable"})}function Ob({isUpdating:e,handleClick:t}){return p.jsx(ge,{className:V("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e}),onClick:t,children:e?p.jsxs(p.Fragment,{children:[p.jsx(oe.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-white"}),"Updating..."]}):"Update"})}function Mt(){return Mt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Mt.apply(this,arguments)}const Rb=["children","options"];var Ns,Cs;(function(e){e.blockQuote="0",e.breakLine="1",e.breakThematic="2",e.codeBlock="3",e.codeFenced="4",e.codeInline="5",e.footnote="6",e.footnoteReference="7",e.gfmTask="8",e.heading="9",e.headingSetext="10",e.htmlBlock="11",e.htmlComment="12",e.htmlSelfClosing="13",e.image="14",e.link="15",e.linkAngleBraceStyleDetector="16",e.linkBareUrlDetector="17",e.linkMailtoDetector="18",e.newlineCoalescer="19",e.orderedList="20",e.paragraph="21",e.ref="22",e.refImage="23",e.refLink="24",e.table="25",e.tableSeparator="26",e.text="27",e.textBolded="28",e.textEmphasized="29",e.textEscaped="30",e.textMarked="31",e.textStrikethroughed="32",e.unorderedList="33"})(Ns||(Ns={})),function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"}(Cs||(Cs={}));const Ss=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,t)=>(e[t.toLowerCase()]=t,e),{for:"htmlFor"}),Os={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},Pb=["style","script"],jb=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,_b=/mailto:/i,$b=/\n{2,}$/,Ml=/^(\s*>[\s\S]*?)(?=\n{2,})/,Mb=/^ *> ?/gm,Ib=/^ {2,}\n/,Db=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,Il=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,Dl=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,Ab=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,Bb=/^(?:\n *)*\n/,Lb=/\r\n?/g,Vb=/^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/,Fb=/^\[\^([^\]]+)]/,zb=/\f/g,Ub=/^---[ \t]*\n(.|\n)*\n---[ \t]*\n/,qb=/^\s*?\[(x|\s)\]/,Al=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,Bl=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,Ll=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,Co=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?((?:[^>]*[^/])?)>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/i,Hb=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,Vl=/^<!--[\s\S]*?(?:-->)/,Wb=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,So=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,Gb=/^\{.*\}$/,Xb=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,Yb=/^<([^ >]+@[^ >]+)>/,Kb=/^<([^ >]+:\/[^ >]+)>/,Jb=/-([a-z])?/gi,Fl=/^(.*\|.*)\n(?: *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*))?\n?/,Zb=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,Qb=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,ev=/^\[([^\]]*)\] ?\[([^\]]*)\]/,tv=/(\[|\])/g,rv=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,nv=/\t/g,ov=/(^ *\||\| *$)/g,av=/^ *:-+: *$/,sv=/^ *:-+ *$/,iv=/^ *-+: *$/,Ln="((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~~.*?~~|==.*?==|.|\\n)*?)",lv=new RegExp(`^([*_])\\1${Ln}\\1\\1(?!\\1)`),cv=new RegExp(`^([*_])${Ln}\\1(?!\\1|\\w)`),pv=new RegExp(`^==${Ln}==`),uv=new RegExp(`^~~${Ln}~~`),dv=/^\\([^0-9A-Za-z\s])/,fv=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,mv=/^\n+/,hv=/^([ \t]*)/,gv=/\\([^\\])/g,Rs=/ *\n+$/,bv=/(?:^|\n)( *)$/,ua="(?:\\d+\\.)",da="(?:[*+-])";function zl(e){return"( *)("+(e===1?ua:da)+") +"}const Ul=zl(1),ql=zl(2);function Hl(e){return new RegExp("^"+(e===1?Ul:ql))}const vv=Hl(1),yv=Hl(2);function Wl(e){return new RegExp("^"+(e===1?Ul:ql)+"[^\\n]*(?:\\n(?!\\1"+(e===1?ua:da)+" )[^\\n]*)*(\\n|$)","gm")}const Gl=Wl(1),Xl=Wl(2);function Yl(e){const t=e===1?ua:da;return new RegExp("^( *)("+t+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+t+" (?!"+t+" ))\\n*|\\s*\\n*$)")}const Kl=Yl(1),Jl=Yl(2);function Ps(e,t){const r=t===1,n=r?Kl:Jl,o=r?Gl:Xl,a=r?vv:yv;return{match(s,l,c){const d=bv.exec(c);return d&&(l.list||!l.inline&&!l.simple)?n.exec(s=d[1]+s):null},order:1,parse(s,l,c){const d=r?+s[2]:void 0,m=s[0].replace($b,`
`).match(o);let v=!1;return{items:m.map(function(g,u){const h=a.exec(g)[0].length,f=new RegExp("^ {1,"+h+"}","gm"),b=g.replace(f,"").replace(a,""),w=u===m.length-1,R=b.indexOf(`

`)!==-1||w&&v;v=R;const x=c.inline,E=c.list;let y;c.list=!0,R?(c.inline=!1,y=b.replace(Rs,`

`)):(c.inline=!0,y=b.replace(Rs,""));const S=l(y,c);return c.inline=x,c.list=E,S}),ordered:r,start:d}},render:(s,l,c)=>e(s.ordered?"ol":"ul",{key:c.key,start:s.type==="20"?s.start:void 0},s.items.map(function(d,m){return e("li",{key:m},l(d,c))}))}}const wv=new RegExp(`^\\[((?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*)\\]\\(\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`),xv=/^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Zl=[Ml,Il,Dl,Al,Ll,Bl,Vl,Fl,Gl,Kl,Xl,Jl],Ev=[...Zl,/^[^\n]+(?:  \n|\n{2,})/,Co,So];function kv(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function Tv(e){return iv.test(e)?"right":av.test(e)?"center":sv.test(e)?"left":null}function js(e,t,r,n){const o=r.inTable;r.inTable=!0;let a=e.trim().split(/( *(?:`[^`]*`|<.*?>.*?<\/.*?>(?!<\/.*?>)|\\\||\|) *)/).reduce((l,c)=>(c.trim()==="|"?l.push(n?{type:"26"}:{type:"27",text:c}):c!==""&&l.push.apply(l,t(c,r)),l),[]);r.inTable=o;let s=[[]];return a.forEach(function(l,c){l.type==="26"?c!==0&&c!==a.length-1&&s.push([]):(l.type!=="27"||a[c+1]!=null&&a[c+1].type!=="26"||(l.text=l.text.trimEnd()),s[s.length-1].push(l))}),s}function Nv(e,t,r){r.inline=!0;const n=e[2]?e[2].replace(ov,"").split("|").map(Tv):[],o=e[3]?function(s,l,c){return s.trim().split(`
`).map(function(d){return js(d,l,c,!0)})}(e[3],t,r):[],a=js(e[1],t,r,!!o.length);return r.inline=!1,o.length?{align:n,cells:o,header:a,type:"25"}:{children:a,type:"21"}}function _s(e,t){return e.align[t]==null?{}:{textAlign:e.align[t]}}function yt(e){return function(t,r){return r.inline?e.exec(t):null}}function wt(e){return function(t,r){return r.inline||r.simple?e.exec(t):null}}function pt(e){return function(t,r){return r.inline||r.simple?null:e.exec(t)}}function xr(e){return function(t){return e.exec(t)}}function Cv(e,t,r){if(t.inline||t.simple||r&&!r.endsWith(`
`))return null;let n="";e.split(`
`).every(a=>!Zl.some(s=>s.test(a))&&(n+=a+`
`,a.trim()));const o=n.trimEnd();return o==""?null:[n,o]}function Xt(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch{return null}return e}function $s(e){return e.replace(gv,"$1")}function fn(e,t,r){const n=r.inline||!1,o=r.simple||!1;r.inline=!0,r.simple=!0;const a=e(t,r);return r.inline=n,r.simple=o,a}function Sv(e,t,r){const n=r.inline||!1,o=r.simple||!1;r.inline=!1,r.simple=!0;const a=e(t,r);return r.inline=n,r.simple=o,a}function Ov(e,t,r){const n=r.inline||!1;r.inline=!1;const o=e(t,r);return r.inline=n,o}const ao=(e,t,r)=>({children:fn(t,e[1],r)});function so(){return{}}function io(){return null}function Rv(...e){return e.filter(Boolean).join(" ")}function lo(e,t,r){let n=e;const o=t.split(".");for(;o.length&&(n=n[o[0]],n!==void 0);)o.shift();return n||r}function Pv(e="",t={}){t.overrides=t.overrides||{},t.slugify=t.slugify||kv,t.namedCodesToUnicode=t.namedCodesToUnicode?Mt({},Os,t.namedCodesToUnicode):Os;const r=t.createElement||N.createElement;function n(u,h,...f){const b=lo(t.overrides,`${u}.props`,{});return r(function(w,R){const x=lo(R,w);return x?typeof x=="function"||typeof x=="object"&&"render"in x?x:lo(R,`${w}.component`,w):w}(u,t.overrides),Mt({},h,b,{className:Rv(h==null?void 0:h.className,b.className)||void 0}),...f)}function o(u){u=u.replace(Ub,"");let h=!1;t.forceInline?h=!0:t.forceBlock||(h=rv.test(u)===!1);const f=m(d(h?u:`${u.trimEnd().replace(mv,"")}

`,{inline:h}));for(;typeof f[f.length-1]=="string"&&!f[f.length-1].trim();)f.pop();if(t.wrapper===null)return f;const b=t.wrapper||(h?"span":"div");let w;if(f.length>1||t.forceWrapper)w=f;else{if(f.length===1)return w=f[0],typeof w=="string"?n("span",{key:"outer"},w):w;w=null}return N.createElement(b,{key:"outer"},w)}function a(u){const h=u.match(jb);return h?h.reduce(function(f,b,w){const R=b.indexOf("=");if(R!==-1){const x=function(C){return C.indexOf("-")!==-1&&C.match(Wb)===null&&(C=C.replace(Jb,function(I,A){return A.toUpperCase()})),C}(b.slice(0,R)).trim(),E=function(C){const I=C[0];return(I==='"'||I==="'")&&C.length>=2&&C[C.length-1]===I?C.slice(1,-1):C}(b.slice(R+1).trim()),y=Ss[x]||x,S=f[y]=function(C,I){return C==="style"?I.split(/;\s?/).reduce(function(A,B){const k=B.slice(0,B.indexOf(":"));return A[k.trim().replace(/(-[a-z])/g,O=>O[1].toUpperCase())]=B.slice(k.length+1).trim(),A},{}):C==="href"||C==="src"?Xt(I):(I.match(Gb)&&(I=I.slice(1,I.length-1)),I==="true"||I!=="false"&&I)}(x,E);typeof S=="string"&&(Co.test(S)||So.test(S))&&(f[y]=N.cloneElement(o(S.trim()),{key:w}))}else b!=="style"&&(f[Ss[b]||b]=!0);return f},{}):null}const s=[],l={},c={0:{match:pt(Ml),order:1,parse:(u,h,f)=>({children:h(u[0].replace(Mb,""),f)}),render:(u,h,f)=>n("blockquote",{key:f.key},h(u.children,f))},1:{match:xr(Ib),order:1,parse:so,render:(u,h,f)=>n("br",{key:f.key})},2:{match:pt(Db),order:1,parse:so,render:(u,h,f)=>n("hr",{key:f.key})},3:{match:pt(Dl),order:0,parse:u=>({lang:void 0,text:u[0].replace(/^ {4}/gm,"").replace(/\n+$/,"")}),render:(u,h,f)=>n("pre",{key:f.key},n("code",Mt({},u.attrs,{className:u.lang?`lang-${u.lang}`:""}),u.text))},4:{match:pt(Il),order:0,parse:u=>({attrs:a(u[3]||""),lang:u[2]||void 0,text:u[4],type:"3"})},5:{match:wt(Ab),order:3,parse:u=>({text:u[2]}),render:(u,h,f)=>n("code",{key:f.key},u.text)},6:{match:pt(Vb),order:0,parse:u=>(s.push({footnote:u[2],identifier:u[1]}),{}),render:io},7:{match:yt(Fb),order:1,parse:u=>({target:`#${t.slugify(u[1])}`,text:u[1]}),render:(u,h,f)=>n("a",{key:f.key,href:Xt(u.target)},n("sup",{key:f.key},u.text))},8:{match:yt(qb),order:1,parse:u=>({completed:u[1].toLowerCase()==="x"}),render:(u,h,f)=>n("input",{checked:u.completed,key:f.key,readOnly:!0,type:"checkbox"})},9:{match:pt(t.enforceAtxHeadings?Bl:Al),order:1,parse:(u,h,f)=>({children:fn(h,u[2],f),id:t.slugify(u[2]),level:u[1].length}),render:(u,h,f)=>n(`h${u.level}`,{id:u.id,key:f.key},h(u.children,f))},10:{match:pt(Ll),order:0,parse:(u,h,f)=>({children:fn(h,u[1],f),level:u[2]==="="?1:2,type:"9"})},11:{match:xr(Co),order:1,parse(u,h,f){const[,b]=u[3].match(hv),w=new RegExp(`^${b}`,"gm"),R=u[3].replace(w,""),x=(E=R,Ev.some(I=>I.test(E))?Ov:fn);var E;const y=u[1].toLowerCase(),S=Pb.indexOf(y)!==-1,C={attrs:a(u[2]),noInnerParse:S,tag:(S?y:u[1]).trim()};return f.inAnchor=f.inAnchor||y==="a",S?C.text=u[3]:C.children=x(h,R,f),f.inAnchor=!1,C},render:(u,h,f)=>n(u.tag,Mt({key:f.key},u.attrs),u.text||h(u.children,f))},13:{match:xr(So),order:1,parse:u=>({attrs:a(u[2]||""),tag:u[1].trim()}),render:(u,h,f)=>n(u.tag,Mt({},u.attrs,{key:f.key}))},12:{match:xr(Vl),order:1,parse:()=>({}),render:io},14:{match:wt(xv),order:1,parse:u=>({alt:u[1],target:$s(u[2]),title:u[3]}),render:(u,h,f)=>n("img",{key:f.key,alt:u.alt||void 0,title:u.title||void 0,src:Xt(u.target)})},15:{match:yt(wv),order:3,parse:(u,h,f)=>({children:Sv(h,u[1],f),target:$s(u[2]),title:u[3]}),render:(u,h,f)=>n("a",{key:f.key,href:Xt(u.target),title:u.title},h(u.children,f))},16:{match:yt(Kb),order:0,parse:u=>({children:[{text:u[1],type:"27"}],target:u[1],type:"15"})},17:{match:(u,h)=>h.inAnchor?null:yt(Xb)(u,h),order:0,parse:u=>({children:[{text:u[1],type:"27"}],target:u[1],title:void 0,type:"15"})},18:{match:yt(Yb),order:0,parse(u){let h=u[1],f=u[1];return _b.test(f)||(f="mailto:"+f),{children:[{text:h.replace("mailto:",""),type:"27"}],target:f,type:"15"}}},20:Ps(n,1),33:Ps(n,2),19:{match:pt(Bb),order:3,parse:so,render:()=>`
`},21:{match:Cv,order:3,parse:ao,render:(u,h,f)=>n("p",{key:f.key},h(u.children,f))},22:{match:yt(Zb),order:0,parse:u=>(l[u[1]]={target:u[2],title:u[4]},{}),render:io},23:{match:wt(Qb),order:0,parse:u=>({alt:u[1]||void 0,ref:u[2]}),render:(u,h,f)=>l[u.ref]?n("img",{key:f.key,alt:u.alt,src:Xt(l[u.ref].target),title:l[u.ref].title}):null},24:{match:yt(ev),order:0,parse:(u,h,f)=>({children:h(u[1],f),fallbackChildren:h(u[0].replace(tv,"\\$1"),f),ref:u[2]}),render:(u,h,f)=>l[u.ref]?n("a",{key:f.key,href:Xt(l[u.ref].target),title:l[u.ref].title},h(u.children,f)):n("span",{key:f.key},h(u.fallbackChildren,f))},25:{match:pt(Fl),order:1,parse:Nv,render(u,h,f){const b=u;return n("table",{key:f.key},n("thead",null,n("tr",null,b.header.map(function(w,R){return n("th",{key:R,style:_s(b,R)},h(w,f))}))),n("tbody",null,b.cells.map(function(w,R){return n("tr",{key:R},w.map(function(x,E){return n("td",{key:E,style:_s(b,E)},h(x,f))}))})))}},27:{match:xr(fv),order:4,parse:u=>({text:u[0].replace(Hb,(h,f)=>t.namedCodesToUnicode[f]?t.namedCodesToUnicode[f]:h)}),render:u=>u.text},28:{match:wt(lv),order:2,parse:(u,h,f)=>({children:h(u[2],f)}),render:(u,h,f)=>n("strong",{key:f.key},h(u.children,f))},29:{match:wt(cv),order:3,parse:(u,h,f)=>({children:h(u[2],f)}),render:(u,h,f)=>n("em",{key:f.key},h(u.children,f))},30:{match:wt(dv),order:1,parse:u=>({text:u[1],type:"27"})},31:{match:wt(pv),order:3,parse:ao,render:(u,h,f)=>n("mark",{key:f.key},h(u.children,f))},32:{match:wt(uv),order:3,parse:ao,render:(u,h,f)=>n("del",{key:f.key},h(u.children,f))}};t.disableParsingRawHTML===!0&&(delete c[11],delete c[13]);const d=function(u){let h=Object.keys(u);function f(b,w){let R=[],x="";for(;b;){let E=0;for(;E<h.length;){const y=h[E],S=u[y],C=S.match(b,w,x);if(C){const I=C[0];b=b.substring(I.length);const A=S.parse(C,f,w);A.type==null&&(A.type=y),R.push(A),x=I;break}E++}}return R}return h.sort(function(b,w){let R=u[b].order,x=u[w].order;return R!==x?R-x:b<w?-1:1}),function(b,w){return f(function(R){return R.replace(Lb,`
`).replace(zb,"").replace(nv,"    ")}(b),w)}}(c),m=(v=function(u,h){return function(f,b,w){const R=u[f.type].render;return h?h(()=>R(f,b,w),f,b,w):R(f,b,w)}}(c,t.renderRule),function u(h,f={}){if(Array.isArray(h)){const b=f.key,w=[];let R=!1;for(let x=0;x<h.length;x++){f.key=x;const E=u(h[x],f),y=typeof E=="string";y&&R?w[w.length-1]+=E:E!==null&&w.push(E),R=y}return f.key=b,w}return v(h,u,f)});var v;const g=o(e);return s.length?n("div",null,g,n("footer",{key:"footer"},s.map(function(u){return n("div",{id:t.slugify(u.identifier),key:u.identifier},u.identifier,m(d(u.footnote,{inline:!0})))}))):g}const jv=e=>{let{children:t="",options:r}=e,n=function(o,a){if(o==null)return{};var s,l,c={},d=Object.keys(o);for(l=0;l<d.length;l++)a.indexOf(s=d[l])>=0||(c[s]=o[s]);return c}(e,Rb);return N.cloneElement(Pv(t,r),n)};function _v({markdown:e}){return p.jsx("div",{className:"pr-prose",children:p.jsx(jv,{children:e})})}const $v=(e,t)=>{T.useEffect(()=>{if(!e)return()=>{};const r=e(t);return()=>{r()}},[e,t])},co=()=>!1,Mv=(e,t)=>{const[r]=Tn(T.useCallback(async()=>{if(!e)return co;const n=await Promise.resolve(e(t));return async()=>n()},[t,e]),co,{preserveValue:!1});T.useEffect(()=>()=>{r!==co&&r()},[r])},Ql=T.forwardRef(({className:e,...t},r)=>p.jsx("div",{ref:r,className:V("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));Ql.displayName="Card";const ec=T.forwardRef(({className:e,...t},r)=>p.jsx("div",{ref:r,className:V("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));ec.displayName="CardHeader";const tc=T.forwardRef(({className:e,...t},r)=>p.jsx("h3",{ref:r,className:V("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));tc.displayName="CardTitle";const rc=T.forwardRef(({className:e,...t},r)=>p.jsx("p",{ref:r,className:V("pr-text-sm pr-text-muted-foreground",e),...t}));rc.displayName="CardDescription";const nc=T.forwardRef(({className:e,...t},r)=>p.jsx("div",{ref:r,className:V("pr-p-6 pr-pt-0",e),...t}));nc.displayName="CardContent";const oc=T.forwardRef(({className:e,...t},r)=>p.jsx("div",{ref:r,className:V("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));oc.displayName="CardFooter";const Iv=Oo.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),ac=T.forwardRef(({className:e,variant:t,...r},n)=>p.jsx("div",{ref:n,role:"alert",className:V(Iv({variant:t}),e),...r}));ac.displayName="Alert";const sc=T.forwardRef(({className:e,...t},r)=>p.jsxs("h5",{ref:r,className:V("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));sc.displayName="AlertTitle";const ic=T.forwardRef(({className:e,...t},r)=>p.jsx("div",{ref:r,className:V("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));ic.displayName="AlertDescription";const lc=T.forwardRef(({className:e,...t},r)=>p.jsxs(kr.Root,{ref:r,className:V("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[p.jsx(kr.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:p.jsx(kr.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),p.jsx(kr.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));lc.displayName=kr.Root.displayName;const cc=T.forwardRef(({className:e,...t},r)=>p.jsx(po.Root,{className:V("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:r,children:p.jsx(po.Thumb,{className:V("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));cc.displayName=po.Root.displayName;exports.Alert=ac;exports.AlertDescription=ic;exports.AlertTitle=sc;exports.BookChapterControl=ip;exports.Button=ge;exports.Card=Ql;exports.CardContent=nc;exports.CardDescription=rc;exports.CardFooter=oc;exports.CardHeader=ec;exports.CardTitle=tc;exports.ChapterRangeSelector=yp;exports.CharacterInventory=Tb;exports.Checkbox=li;exports.Checklist=wp;exports.ComboBox=uo;exports.ContextMenu=Zg;exports.DataTable=ei;exports.DisableButton=Sb;exports.DropdownMenu=$o;exports.DropdownMenuCheckboxItem=Io;exports.DropdownMenuContent=Nn;exports.DropdownMenuGroup=Gc;exports.DropdownMenuItem=Mo;exports.DropdownMenuLabel=Vr;exports.DropdownMenuPortal=Xc;exports.DropdownMenuRadioGroup=Kc;exports.DropdownMenuRadioItem=Ws;exports.DropdownMenuSeparator=Cn;exports.DropdownMenuShortcut=Gs;exports.DropdownMenuSub=Yc;exports.DropdownMenuSubContent=Hs;exports.DropdownMenuSubTrigger=qs;exports.DropdownMenuTrigger=Us;exports.EnableButton=Cb;exports.GridMenu=ml;exports.HamburgerMenuButton=Cl;exports.IconButton=tb;exports.Input=ar;exports.InstallButton=Nb;exports.Label=pa;exports.LabelPosition=$t;exports.List=db;exports.ListHeader=mb;exports.ListItem=fb;exports.MarkdownRenderer=_v;exports.MenuItem=aa;exports.NavigationContentSearch=ub;exports.ScriptureResultsViewer=lb;exports.SearchBar=Ol;exports.Select=$r;exports.SelectContent=Zt;exports.SelectGroup=Ys;exports.SelectItem=Je;exports.SelectLabel=Ks;exports.SelectScrollDownButton=Ao;exports.SelectScrollUpButton=Do;exports.SelectSeparator=Js;exports.SelectTrigger=Jt;exports.SelectValue=Mr;exports.ShadCnSlider=lc;exports.ShadCnSwitch=cc;exports.Slider=cb;exports.Snackbar=pb;exports.Switch=hb;exports.Table=Fr;exports.TableBody=Ur;exports.TableCaption=Qs;exports.TableCell=At;exports.TableFooter=Zs;exports.TableHead=Qt;exports.TableHeader=zr;exports.TableRow=ut;exports.Tabs=yb;exports.TabsContent=$l;exports.TabsList=jl;exports.TabsTrigger=_l;exports.TextField=bb;exports.Toolbar=vb;exports.UpdateButton=Ob;exports.VerticalTabs=ia;exports.VerticalTabsContent=ca;exports.VerticalTabsList=la;exports.VerticalTabsTrigger=Rl;exports.buttonVariants=Xs;exports.useEvent=$v;exports.useEventAsync=Mv;exports.usePromise=Tn;function Dv(e,t="top"){if(!e||typeof document>"u")return;const r=document.head||document.querySelector("head"),n=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&n?r.insertBefore(o,n):r.appendChild(o)}Dv(`.papi-context-menu-target {
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

    .pr-bg-muted\\/40 {
      background-color: hsl(33.9, 32.4%, 86.1%, 0.4);
    }
  }

  .paratext-dark {
    --background: 0, 0%, 0%;
    --foreground: 0, 0%, 100%;
    --muted: 15.5, 13.2%, 53.9%;
    --muted-foreground: 33.9, 32.4%, 86.1%;
    --popover: 180, 71.4%, 5%;
    --popover-foreground: 0, 0%, 100%;
    --card: 0 0% 0%;
    --card-foreground: 0, 0%, 100%;
    --border: 220 13% 20%;
    --input: 220 13% 20%;
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

    .pr-bg-muted\\/40 {
      background-color: hsl(15.5, 13.2%, 53.9%, 0.4);
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
.pr-ms-2 {
  margin-inline-start: 0.5rem;
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
.pr-mt-auto {
  margin-top: auto;
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
.pr-auto-rows-max {
  grid-auto-rows: max-content;
}
.pr-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
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
.pr-border-e {
  border-inline-end-width: 1px;
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
.pr-p-\\[1px\\] {
  padding: 1px;
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
.pr-text-right {
  text-align: right;
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
.data-\\[disabled\\=true\\]\\:pr-pointer-events-none[data-disabled="true"] {
  pointer-events: none;
}
.data-\\[disabled\\]\\:pr-pointer-events-none[data-disabled] {
  pointer-events: none;
}
.data-\\[side\\=bottom\\]\\:pr-translate-y-1[data-side="bottom"] {
  --tw-translate-y: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=left\\]\\:pr--translate-x-1[data-side="left"] {
  --tw-translate-x: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=right\\]\\:pr-translate-x-1[data-side="right"] {
  --tw-translate-x: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=top\\]\\:pr--translate-y-1[data-side="top"] {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=checked\\]\\:pr-translate-x-5[data-state="checked"] {
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=unchecked\\]\\:pr-translate-x-0[data-state="unchecked"] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[highlighted\\]\\:pr-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
}
.data-\\[selected\\=true\\]\\:pr-bg-accent[data-selected="true"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=active\\]\\:pr-bg-background[data-state="active"] {
  background-color: hsl(var(--background));
}
.data-\\[state\\=checked\\]\\:pr-bg-primary[data-state="checked"] {
  background-color: hsl(var(--primary));
}
.data-\\[state\\=open\\]\\:pr-bg-accent[data-state="open"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=selected\\]\\:pr-bg-muted[data-state="selected"] {
  background-color: hsl(var(--muted));
}
.data-\\[state\\=unchecked\\]\\:pr-bg-input[data-state="unchecked"] {
  background-color: hsl(var(--input));
}
.data-\\[selected\\=true\\]\\:pr-text-accent-foreground[data-selected="true"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=active\\]\\:pr-text-foreground[data-state="active"] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=checked\\]\\:pr-text-primary-foreground[data-state="checked"] {
  color: hsl(var(--primary-foreground));
}
.data-\\[state\\=open\\]\\:pr-text-muted-foreground[data-state="open"] {
  color: hsl(var(--muted-foreground));
}
.data-\\[disabled\\=true\\]\\:pr-opacity-50[data-disabled="true"] {
  opacity: 0.5;
}
.data-\\[disabled\\]\\:pr-opacity-50[data-disabled] {
  opacity: 0.5;
}
.data-\\[state\\=active\\]\\:pr-shadow-sm[data-state="active"] {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.data-\\[state\\=open\\]\\:pr-animate-in[data-state="open"] {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:pr-animate-out[data-state="closed"] {
  animation-name: exit;
  animation-duration: 150ms;
  --tw-exit-opacity: initial;
  --tw-exit-scale: initial;
  --tw-exit-rotate: initial;
  --tw-exit-translate-x: initial;
  --tw-exit-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:pr-fade-out-0[data-state="closed"] {
  --tw-exit-opacity: 0;
}
.data-\\[state\\=open\\]\\:pr-fade-in-0[data-state="open"] {
  --tw-enter-opacity: 0;
}
.data-\\[state\\=closed\\]\\:pr-zoom-out-95[data-state="closed"] {
  --tw-exit-scale: .95;
}
.data-\\[state\\=open\\]\\:pr-zoom-in-95[data-state="open"] {
  --tw-enter-scale: .95;
}
.data-\\[side\\=bottom\\]\\:pr-slide-in-from-top-2[data-side="bottom"] {
  --tw-enter-translate-y: -0.5rem;
}
.data-\\[side\\=left\\]\\:pr-slide-in-from-right-2[data-side="left"] {
  --tw-enter-translate-x: 0.5rem;
}
.data-\\[side\\=right\\]\\:pr-slide-in-from-left-2[data-side="right"] {
  --tw-enter-translate-x: -0.5rem;
}
.data-\\[side\\=top\\]\\:pr-slide-in-from-bottom-2[data-side="top"] {
  --tw-enter-translate-y: 0.5rem;
}
.data-\\[state\\=closed\\]\\:pr-slide-out-to-left-1\\/2[data-state="closed"] {
  --tw-exit-translate-x: -50%;
}
.data-\\[state\\=closed\\]\\:pr-slide-out-to-top-\\[48\\%\\][data-state="closed"] {
  --tw-exit-translate-y: -48%;
}
.data-\\[state\\=open\\]\\:pr-slide-in-from-left-1\\/2[data-state="open"] {
  --tw-enter-translate-x: -50%;
}
.data-\\[state\\=open\\]\\:pr-slide-in-from-top-\\[48\\%\\][data-state="open"] {
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state="selected"]:hover {
  cursor: default;
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
`,"top");
//# sourceMappingURL=index.cjs.map
