"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const i=require("react/jsx-runtime"),D=require("react"),ye=require("platform-bible-utils"),ot=require("@radix-ui/react-dropdown-menu"),xe=require("lucide-react"),Cr=require("clsx"),at=require("tailwind-merge"),st=require("@radix-ui/react-slider"),it=require("@radix-ui/react-radio-group"),ct=require("@radix-ui/react-select"),ae=require("@mui/material"),Hn=require("react-data-grid"),jn=require("@mui/styled-engine");function en(e){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const r in e)if(r!=="default"){const t=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,t.get?t:{enumerable:!0,get:()=>e[r]})}}return n.default=e,Object.freeze(n)}const Y=en(D),re=en(ot),We=en(st),Je=en(it),ne=en(ct);var lt=Object.defineProperty,dt=(e,n,r)=>n in e?lt(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,I=(e,n,r)=>(dt(e,typeof n!="symbol"?n+"":n,r),r);const Pe=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],In=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Er=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Wn=wt();function Ge(e,n=!0){return n&&(e=e.toUpperCase()),e in Wn?Wn[e]:0}function An(e){return Ge(e)>0}function ut(e){const n=typeof e=="string"?Ge(e):e;return n>=40&&n<=66}function pt(e){return(typeof e=="string"?Ge(e):e)<=39}function Tr(e){return e<=66}function ft(e){const n=typeof e=="string"?Ge(e):e;return Or(n)&&!Tr(n)}function*ht(){for(let e=1;e<=Pe.length;e++)yield e}const mt=1,Nr=Pe.length;function gt(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Mn(e,n="***"){const r=e-1;return r<0||r>=Pe.length?n:Pe[r]}function _r(e){return e<=0||e>Nr?"******":Er[e-1]}function bt(e){return _r(Ge(e))}function Or(e){const n=typeof e=="number"?Mn(e):e;return An(n)&&!In.includes(n)}function yt(e){const n=typeof e=="number"?Mn(e):e;return An(n)&&In.includes(n)}function vt(e){return Er[e-1].includes("*obsolete*")}function wt(){const e={};for(let n=0;n<Pe.length;n++)e[Pe[n]]=n+1;return e}const oe={allBookIds:Pe,nonCanonicalIds:In,bookIdToNumber:Ge,isBookIdValid:An,isBookNT:ut,isBookOT:pt,isBookOTNT:Tr,isBookDC:ft,allBookNumbers:ht,firstBook:mt,lastBook:Nr,extraBooks:gt,bookNumberToId:Mn,bookNumberToEnglishName:_r,bookIdToEnglishName:bt,isCanonical:Or,isExtraMaterial:yt,isObsolete:vt};var Te=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Te||{});const Re=class{constructor(e){if(I(this,"name"),I(this,"fullPath"),I(this,"isPresent"),I(this,"hasVerseSegments"),I(this,"isCustomized"),I(this,"baseVersification"),I(this,"scriptureBooks"),I(this,"_type"),e!=null)typeof e=="string"?this.name=e:this._type=e;else throw new Error("Argument null")}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};let he=Re;I(he,"Original",new Re(Te.Original)),I(he,"Septuagint",new Re(Te.Septuagint)),I(he,"Vulgate",new Re(Te.Vulgate)),I(he,"English",new Re(Te.English)),I(he,"RussianProtestant",new Re(Te.RussianProtestant)),I(he,"RussianOrthodox",new Re(Te.RussianOrthodox));function Yn(e,n){const r=n[0];for(let t=1;t<n.length;t++)e=e.split(n[t]).join(r);return e.split(r)}var Rr=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Rr||{});const $=class{constructor(e,n,r,t){if(I(this,"firstChapter"),I(this,"lastChapter"),I(this,"lastVerse"),I(this,"hasSegmentsDefined"),I(this,"text"),I(this,"BBBCCCVVVS"),I(this,"longHashCode"),I(this,"versification"),I(this,"rtlMark","‏"),I(this,"_bookNum",0),I(this,"_chapterNum",0),I(this,"_verseNum",0),I(this,"_verse"),r==null&&t==null)if(e!=null&&typeof e=="string"){const o=e,a=n!=null&&n instanceof he?n:void 0;this.setEmpty(a),this.parse(o)}else if(e!=null&&typeof e=="number"){const o=n!=null&&n instanceof he?n:void 0;this.setEmpty(o),this._verseNum=e%$.chapterDigitShifter,this._chapterNum=Math.floor(e%$.bookDigitShifter/$.chapterDigitShifter),this._bookNum=Math.floor(e/$.bookDigitShifter)}else if(n==null)if(e!=null&&e instanceof $){const o=e;this._bookNum=o.bookNum,this._chapterNum=o.chapterNum,this._verseNum=o.verseNum,this._verse=o.verse,this.versification=o.versification}else{if(e==null)return;const o=e instanceof he?e:$.defaultVersification;this.setEmpty(o)}else throw new Error("VerseRef constructor not supported.");else if(e!=null&&n!=null&&r!=null)if(typeof e=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(t),this.updateInternal(e,n,r);else if(typeof e=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=e,this._chapterNum=n,this._verseNum=r,this.versification=t??$.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(e,n=$.defaultVersification){const r=new $(n);return r.parse(e),r}static isVerseParseable(e){return e.length>0&&"0123456789".includes(e[0])&&!e.endsWith(this.verseRangeSeparator)&&!e.endsWith(this.verseSequenceIndicator)}static tryParse(e){let n;try{return n=$.parse(e),{success:!0,verseRef:n}}catch(r){if(r instanceof Xe)return n=new $,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(e,n,r){return e%$.bcvMaxValue*$.bookDigitShifter+(n>=0?n%$.bcvMaxValue*$.chapterDigitShifter:0)+(r>=0?r%$.bcvMaxValue:0)}static tryGetVerseNum(e){let n;if(!e)return n=-1,{success:!0,vNum:n};n=0;let r;for(let t=0;t<e.length;t++){if(r=e[t],r<"0"||r>"9")return t===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>$.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes($.verseRangeSeparator)||this._verse.includes($.verseSequenceIndicator))}get book(){return oe.bookNumberToId(this.bookNum,"")}set book(e){this.bookNum=oe.bookIdToNumber(e)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(e){const n=+e;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(e){const{success:n,vNum:r}=$.tryGetVerseNum(e);this._verse=n?void 0:e.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=$.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(e){if(e<=0||e>oe.lastBook)throw new Xe("BookNum must be greater than zero and less than or equal to last book");this._bookNum=e}get chapterNum(){return this._chapterNum}set chapterNum(e){this.chapterNum=e}get verseNum(){return this._verseNum}set verseNum(e){this._verseNum=e}get versificationStr(){var e;return(e=this.versification)==null?void 0:e.name}set versificationStr(e){this.versification=this.versification!=null?new he(e):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse($.verseRangeSeparators,$.verseSequenceIndicators)}get BBBCCC(){return $.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return $.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(e){if(e=e.replace(this.rtlMark,""),e.includes("/")){const o=e.split("/");if(e=o[0],o.length>1)try{const a=+o[1].trim();this.versification=new he(Te[a])}catch{throw new Xe("Invalid reference : "+e)}}const n=e.trim().split(" ");if(n.length!==2)throw new Xe("Invalid reference : "+e);const r=n[1].split(":"),t=+r[0];if(r.length!==2||oe.bookIdToNumber(n[0])===0||!Number.isInteger(t)||t<0||!$.isVerseParseable(r[1]))throw new Xe("Invalid reference : "+e);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new $(this)}toString(){const e=this.book;return e===""?"":`${e} ${this.chapter}:${this.verse}`}equals(e){return e._bookNum===this._bookNum&&e._chapterNum===this._chapterNum&&e._verseNum===this._verseNum&&e._verse===this._verse&&e.versification!=null&&this.versification!=null&&e.versification.equals(this.versification)}allVerses(e=!1,n=$.verseRangeSeparators,r=$.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const t=[],o=Yn(this._verse,r);for(const a of o.map(s=>Yn(s,n))){const s=this.clone();s.verse=a[0];const d=s.verseNum;if(t.push(s),a.length>1){const l=this.clone();if(l.verse=a[1],!e)for(let c=d+1;c<l.verseNum;c++){const u=new $(this._bookNum,this._chapterNum,c,this.versification);this.isExcluded||t.push(u)}t.push(l)}}return t}validateVerse(e,n){if(!this.verse)return this.internalValid;let r=0;for(const t of this.allVerses(!0,e,n)){const o=t.internalValid;if(o!==0)return o;const a=t.BBBCCCVVV;if(r>a)return 3;if(r===a)return 4;r=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>oe.lastBook?2:0}setEmpty(e=$.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=e}updateInternal(e,n,r){this.bookNum=oe.bookIdToNumber(e),this.chapter=n,this.verse=r}};let Se=$;I(Se,"defaultVersification",he.English),I(Se,"verseRangeSeparator","-"),I(Se,"verseSequenceIndicator",","),I(Se,"verseRangeSeparators",[$.verseRangeSeparator]),I(Se,"verseSequenceIndicators",[$.verseSequenceIndicator]),I(Se,"chapterDigitShifter",1e3),I(Se,"bookDigitShifter",$.chapterDigitShifter*$.chapterDigitShifter),I(Se,"bcvMaxValue",$.chapterDigitShifter-1),I(Se,"ValidStatusType",Rr);class Xe extends Error{}function H(...e){return at.twMerge(Cr.clsx(e))}const xt=re.Root,kt=re.Trigger,St=Y.forwardRef(({className:e,inset:n,children:r,...t},o)=>i.jsxs(re.SubTrigger,{ref:o,className:H("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",n&&"pr-pl-8",e),...t,children:[r,i.jsx(xe.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));St.displayName=re.SubTrigger.displayName;const Ct=Y.forwardRef(({className:e,...n},r)=>i.jsx(re.SubContent,{ref:r,className:H("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n}));Ct.displayName=re.SubContent.displayName;const jr=Y.forwardRef(({className:e,sideOffset:n=4,...r},t)=>i.jsx(re.Portal,{children:i.jsx(re.Content,{ref:t,sideOffset:n,className:H("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r})}));jr.displayName=re.Content.displayName;const Ye=Y.forwardRef(({className:e,inset:n,...r},t)=>i.jsx(re.Item,{ref:t,className:H("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",n&&"pr-pl-8",e),...r}));Ye.displayName=re.Item.displayName;const Et=Y.forwardRef(({className:e,children:n,checked:r,...t},o)=>i.jsxs(re.CheckboxItem,{ref:o,className:H("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:r,...t,children:[i.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:i.jsx(re.ItemIndicator,{children:i.jsx(xe.Check,{className:"pr-h-4 pr-w-4"})})}),n]}));Et.displayName=re.CheckboxItem.displayName;const Tt=Y.forwardRef(({className:e,children:n,...r},t)=>i.jsxs(re.RadioItem,{ref:t,className:H("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...r,children:[i.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:i.jsx(re.ItemIndicator,{children:i.jsx(xe.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),n]}));Tt.displayName=re.RadioItem.displayName;const $r=Y.forwardRef(({className:e,inset:n,...r},t)=>i.jsx(re.Label,{ref:t,className:H("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",n&&"pr-pl-8",e),...r}));$r.displayName=re.Label.displayName;const Pr=Y.forwardRef(({className:e,...n},r)=>i.jsx(re.Separator,{ref:r,className:H("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...n}));Pr.displayName=re.Separator.displayName;const Ir=Y.forwardRef(({className:e,...n},r)=>i.jsxs(We.Root,{ref:r,className:H("pr-relative pr-flex pr-w-3/4 pr-touch-none pr-select-none pr-items-center pr-justify-end",e),...n,children:[i.jsx(We.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:i.jsx(We.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),i.jsx(We.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));Ir.displayName=We.Root.displayName;const Ar=Y.forwardRef(({className:e,type:n,...r},t)=>i.jsx("input",{type:n,className:H("pr-flex pr-h-10 pr-w-full pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:t,...r}));Ar.displayName="Input";const Nt=D.forwardRef(({handleSearch:e,handleKeyDown:n,...r},t)=>i.jsxs("div",{style:{position:"relative",display:"inline-block"},children:[i.jsx(Ar,{...r,style:{outline:0,paddingRight:"40px"},type:"text",className:"pr-box-border pr-rounded-lg pr-bg-white pr-text-slate-700 pr-shadow-none",onChange:o=>e(o.target.value),onKeyUp:n,ref:t}),i.jsx("div",{style:{position:"absolute",transform:"translateY(-50%)",top:"20px",right:"16px"},className:"pr-cursor-pointer",children:i.jsx(xe.History,{size:16,onClick:()=>{console.log("back in history")}})})]}));function _t({endChapter:e,activeChapter:n,handleSelectChapter:r}){const t=Array.from({length:e},(o,a)=>a+1);return i.jsx("div",{className:"pr-flex pr-flex-wrap pr-content-start pr-items-start pr-self-stretch pr-bg-amber-50",children:t.map(o=>i.jsx("div",{className:H("pr-h-5 pr-w-5 pr-cursor-pointer pr-items-center pr-justify-center pr-rounded pr-p-2 pr-text-amber-800","hover:pr-bg-amber-200",`${o===n}`),onClick:()=>r(o),children:o},o))})}function Ot({bookId:e,handleSelectBook:n,isSelected:r,bookType:t,children:o}){return i.jsxs(Ye,{textValue:e,className:H("pr-font-sans pr-font-normal pr-text-slate-700",r??"selected"),onSelect:a=>{a.preventDefault(),n(e)},children:[i.jsx(xe.Tally1,{className:H("pr-mr-2.5 pr-h-4 pr-w-0.5",`${t.toLowerCase()}`)}),oe.bookIdToEnglishName(e),r&&i.jsx("div",{children:o})," "]},e)}const Mr=Y.forwardRef(({className:e,...n},r)=>i.jsx(Je.Root,{className:H("pr-grid pr-gap-2",e),...n,ref:r}));Mr.displayName=Je.Root.displayName;const an=Y.forwardRef(({className:e,...n},r)=>i.jsx(Je.Item,{ref:r,className:H("pr-aspect-square pr-h-4 pr-w-4 pr-rounded-full pr-border pr-border-primary pr-text-primary pr-ring-offset-background focus:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...n,children:i.jsx(Je.Indicator,{className:"pr-flex pr-items-center pr-justify-center",children:i.jsx(xe.Circle,{className:"pr-h-2.5 pr-w-2.5 pr-fill-current pr-text-current"})})}));an.displayName=Je.Item.displayName;const Rt=ne.Root,jt=ne.Group,$t=ne.Value,Br=Y.forwardRef(({className:e,children:n,...r},t)=>i.jsxs(ne.Trigger,{ref:t,className:H("pr-flex pr-h-10 pr-w-3/4 pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...r,children:[n,i.jsx(ne.Icon,{asChild:!0,children:i.jsx(xe.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));Br.displayName=ne.Trigger.displayName;const Dr=Y.forwardRef(({className:e,...n},r)=>i.jsx(ne.ScrollUpButton,{ref:r,className:H("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...n,children:i.jsx(xe.ChevronUp,{className:"pr-h-4 pr-w-4"})}));Dr.displayName=ne.ScrollUpButton.displayName;const zr=Y.forwardRef(({className:e,...n},r)=>i.jsx(ne.ScrollDownButton,{ref:r,className:H("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...n,children:i.jsx(xe.ChevronDown,{className:"pr-h-4 pr-w-4"})}));zr.displayName=ne.ScrollDownButton.displayName;const Vr=Y.forwardRef(({className:e,children:n,position:r="popper",...t},o)=>i.jsx(ne.Portal,{children:i.jsxs(ne.Content,{ref:o,className:H("pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:r,...t,children:[i.jsx(Dr,{}),i.jsx(ne.Viewport,{className:H("pr-p-1",r==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:n}),i.jsx(zr,{})]})}));Vr.displayName=ne.Content.displayName;const Fr=Y.forwardRef(({className:e,...n},r)=>i.jsx(ne.Label,{ref:r,className:H("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...n}));Fr.displayName=ne.Label.displayName;const Fe=Y.forwardRef(({className:e,children:n,...r},t)=>i.jsxs(ne.Item,{ref:t,className:H("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...r,children:[i.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:i.jsx(ne.ItemIndicator,{children:i.jsx(xe.Check,{className:"pr-h-4 pr-w-4"})})}),i.jsx(ne.ItemText,{children:n})]}));Fe.displayName=ne.Item.displayName;const Pt=Y.forwardRef(({className:e,...n},r)=>i.jsx(ne.Separator,{ref:r,className:H("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...n}));Pt.displayName=ne.Separator.displayName;const It={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},At=["OT","NT","DC"];function Mt({scrRef:e,handleSubmit:n}){const{allBookIds:r}=oe,[t,o]=D.useState(""),[a,s]=D.useState(""),[d,l]=D.useState(100),[c,u]=D.useState(""),[h,p]=D.useState(""),[v,y]=D.useState(!1),m=D.useRef(void 0),f=D.useCallback(N=>({OT:r.filter(C=>oe.isBookOT(C)),NT:r.filter(C=>oe.isBookNT(C)),DC:r.filter(C=>oe.isBookDC(C))})[N],[r]),S=D.useCallback(N=>f(N).filter(J=>oe.bookIdToEnglishName(J).toLowerCase().includes(t.toLowerCase())||J.toLowerCase().includes(t.toLowerCase())),[f,t]),K=N=>{o(N)},P=D.useCallback(N=>ye.getChaptersForBook(oe.bookIdToNumber(N)),[]),E=N=>{s(a!==N?N:""),P(N)===-1&&(n({bookNum:oe.bookIdToNumber(N),chapterNum:1,verseNum:1}),y(!1),o(""))},g=N=>{n({bookNum:oe.bookIdToNumber(a),chapterNum:N,verseNum:1}),y(!1),o("")},se=D.useCallback(N=>{!N&&document.activeElement===m.current?y(!0):y(N)},[]),ce=D.useCallback(()=>m.current.focus(),[]);return i.jsx("div",{children:i.jsxs(xt,{modal:!1,open:v,onOpenChange:se,children:[i.jsx(kt,{asChild:!0,children:i.jsx(Nt,{ref:m,value:t,handleSearch:K,handleKeyDown:()=>y(!0),placeholder:`${oe.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),i.jsxs(jr,{className:"pr-overflow-y-auto pr-font-sans pr-font-normal pr-text-slate-700",style:{width:"300px",maxHeight:"500px"},onKeyDown:ce,children:[i.jsxs(Ye,{className:H("pr-flex pr-justify-between pr-font-sans pr-font-normal pr-text-slate-700"),children:[`Zoom: ${d}%`,i.jsx(Ir,{defaultValue:[100],value:[d],min:50,max:200,step:1,onValueChange:([N])=>{l(N)}})]},1),i.jsxs(Ye,{className:H("pr-flex pr-justify-between pr-font-sans pr-font-normal pr-text-slate-700"),children:["Fruit:",i.jsxs(Rt,{onValueChange:N=>{u(N)},value:c,children:[i.jsx(Br,{children:i.jsx($t,{placeholder:"Select a fruit"})}),i.jsx(Vr,{children:i.jsxs(jt,{children:[i.jsx(Fr,{children:"Fruits"}),i.jsx(Fe,{value:"apple",children:"Apple"}),i.jsx(Fe,{value:"banana",children:"Banana"}),i.jsx(Fe,{value:"blueberry",children:"Blueberry"}),i.jsx(Fe,{value:"grapes",children:"Grapes"}),i.jsx(Fe,{value:"pineapple",children:"Pineapple"})]})})]})]},1),i.jsxs(Ye,{className:H("pr-flex pr-justify-between pr-font-sans pr-font-normal pr-text-slate-700"),children:["Scroll with:",i.jsxs(Mr,{orientation:"horizontal",defaultValue:"a",onValueChange:N=>{p(N)},value:h,children:[i.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[i.jsx(an,{value:"a",id:"r1"}),"A"]}),i.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[i.jsx(an,{value:"b",id:"r2"}),"B"]}),i.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[i.jsx(an,{value:"c",id:"r3"}),"C"]})]})]},1),At.map(N=>i.jsxs("div",{children:[i.jsx($r,{className:"pr-font-semibold pr-text-slate-700",children:It[N]}),S(N).map(J=>i.jsx("div",{children:i.jsx(Ot,{bookId:J,handleSelectBook:()=>E(J),isSelected:a===J,bookType:N,children:i.jsx(_t,{handleSelectChapter:g,endChapter:P(J),activeChapter:e.bookNum===oe.bookIdToNumber(J)?e.chapterNum:0})})},J)),N==="OT"||N==="NT"?i.jsx(Pr,{}):void 0]},N))]})]})})}function je({id:e,isDisabled:n=!1,className:r,onClick:t,onContextMenu:o,children:a}){return i.jsx(ae.Button,{id:e,disabled:n,className:`papi-button ${r??""}`,onClick:t,onContextMenu:o,children:a})}function ln({id:e,title:n,isDisabled:r=!1,isClearable:t=!0,hasError:o=!1,isFullWidth:a=!1,width:s,options:d=[],className:l,value:c,onChange:u,onFocus:h,onBlur:p,getOptionLabel:v}){return i.jsx(ae.Autocomplete,{id:e,disablePortal:!0,disabled:r,disableClearable:!t,fullWidth:a,options:d,className:`papi-combo-box ${o?"error":""} ${l??""}`,value:c,onChange:u,onFocus:h,onBlur:p,getOptionLabel:v,renderInput:y=>i.jsx(ae.TextField,{...y,error:o,fullWidth:a,disabled:r,label:n,style:{width:s}})})}function Bt({startChapter:e,endChapter:n,handleSelectStartChapter:r,handleSelectEndChapter:t,isDisabled:o,chapterCount:a}){const s=D.useMemo(()=>Array.from({length:a},(c,u)=>u+1),[a]),d=(c,u)=>{r(u),u>n&&t(u)},l=(c,u)=>{t(u),u<e&&r(u)};return i.jsxs(i.Fragment,{children:[i.jsx(ae.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:i.jsx(ln,{onChange:(c,u)=>d(c,u),className:"book-selection-chapter",isClearable:!1,options:s,getOptionLabel:c=>c.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),i.jsx(ae.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:i.jsx(ln,{onChange:(c,u)=>l(c,u),className:"book-selection-chapter",isClearable:!1,options:s,getOptionLabel:c=>c.toString(),value:n,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var $e=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))($e||{});function Lr({id:e,isChecked:n,labelText:r="",labelPosition:t=$e.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:s=!1,hasError:d=!1,className:l,onChange:c}){const u=i.jsx(ae.Checkbox,{id:e,checked:n,indeterminate:o,defaultChecked:a,disabled:s,className:`papi-checkbox ${d?"error":""} ${l??""}`,onChange:c});let h;if(r){const p=t===$e.Before||t===$e.Above,v=i.jsx("span",{className:`papi-checkbox-label ${d?"error":""} ${l??""}`,children:r}),y=t===$e.Before||t===$e.After,m=y?v:i.jsx("div",{children:v}),f=y?u:i.jsx("div",{children:u});h=i.jsxs(ae.FormLabel,{className:`papi-checkbox ${t.toString()}`,disabled:s,error:d,children:[p&&m,f,!p&&m]})}else h=u;return h}function Ur(e){const{onClick:n,name:r,hasAutoFocus:t=!1,className:o,isDense:a=!0,hasDisabledGutters:s=!1,hasDivider:d=!1,focusVisibleClassName:l,id:c,children:u}=e;return i.jsx(ae.MenuItem,{autoFocus:t,className:o,dense:a,disableGutters:s,divider:d,focusVisibleClassName:l,onClick:n,id:c,children:r||u})}function Dt({commandHandler:e,name:n,className:r,items:t,id:o}){return i.jsxs(ae.Grid,{id:o,item:!0,xs:"auto",className:`papi-menu-column ${r??""}`,children:[i.jsx("h3",{className:`papi-menu ${r??""}`,children:n}),t.map((a,s)=>i.jsx(Ur,{className:`papi-menu-item ${a.className}`,onClick:()=>{e(a)},...a},s))]})}function qr({commandHandler:e,className:n,columns:r,id:t}){return i.jsx(ae.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${n??""}`,columns:r.length,id:t,children:r.map((o,a)=>i.jsx(Dt,{commandHandler:e,name:o.name,className:n,items:o.items},a))})}function zt({id:e,label:n,isDisabled:r=!1,tooltip:t,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:s="medium",className:d,onClick:l,children:c}){return i.jsx(ae.IconButton,{id:e,disabled:r,edge:a,size:s,"aria-label":n,title:o?void 0:t??n,className:`papi-icon-button ${d??""}`,onClick:l,children:c})}function Ze({variant:e="outlined",id:n,isDisabled:r=!1,hasError:t=!1,isFullWidth:o=!1,helperText:a,label:s,placeholder:d,isRequired:l=!1,className:c,defaultValue:u,value:h,onChange:p,onFocus:v,onBlur:y}){return i.jsx(ae.TextField,{variant:e,id:n,disabled:r,error:t,fullWidth:o,helperText:a,label:s,placeholder:d,required:l,className:`papi-textfield ${c??""}`,defaultValue:u,value:h,onChange:p,onFocus:v,onBlur:y})}let xn;const kn=()=>(xn||(xn=oe.allBookIds.map(e=>({bookId:e,label:oe.bookIdToEnglishName(e)}))),xn);function Vt({scrRef:e,handleSubmit:n,id:r}){const t=l=>{n(l)},o=(l,c)=>{const h={bookNum:oe.bookIdToNumber(c.bookId),chapterNum:1,verseNum:1};t(h)},a=l=>{n({...e,chapterNum:+l.target.value})},s=l=>{n({...e,verseNum:+l.target.value})},d=D.useMemo(()=>kn()[e.bookNum-1],[e.bookNum]);return i.jsxs("span",{id:r,children:[i.jsx(ln,{title:"Book",className:"papi-ref-selector book",value:d,options:kn(),onChange:o,isClearable:!1,width:200}),i.jsx(je,{onClick:()=>t(ye.offsetBook(e,-1)),isDisabled:e.bookNum<=ye.FIRST_SCR_BOOK_NUM,children:"<"}),i.jsx(je,{onClick:()=>t(ye.offsetBook(e,1)),isDisabled:e.bookNum>=kn().length,children:">"}),i.jsx(Ze,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:a}),i.jsx(je,{onClick:()=>n(ye.offsetChapter(e,-1)),isDisabled:e.chapterNum<=ye.FIRST_SCR_CHAPTER_NUM,children:"<"}),i.jsx(je,{onClick:()=>n(ye.offsetChapter(e,1)),isDisabled:e.chapterNum>=ye.getChaptersForBook(e.bookNum),children:">"}),i.jsx(Ze,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:s}),i.jsx(je,{onClick:()=>n(ye.offsetVerse(e,-1)),isDisabled:e.verseNum<=ye.FIRST_SCR_VERSE_NUM,children:"<"}),i.jsx(je,{onClick:()=>n(ye.offsetVerse(e,1)),children:">"})]})}function Ft({onSearch:e,placeholder:n,isFullWidth:r}){const[t,o]=D.useState(""),a=s=>{o(s),e(s)};return i.jsx(ae.Paper,{component:"form",className:"search-bar-paper",children:i.jsx(Ze,{isFullWidth:r,className:"search-bar-input",placeholder:n,value:t,onChange:s=>a(s.target.value)})})}function Lt({id:e,isDisabled:n=!1,orientation:r="horizontal",min:t=0,max:o=100,step:a=1,showMarks:s=!1,defaultValue:d,value:l,valueLabelDisplay:c="off",className:u,onChange:h,onChangeCommitted:p}){return i.jsx(ae.Slider,{id:e,disabled:n,orientation:r,min:t,max:o,step:a,marks:s,defaultValue:d,value:l,valueLabelDisplay:c,className:`papi-slider ${r} ${u??""}`,onChange:h,onChangeCommitted:p})}function Ut({autoHideDuration:e=void 0,id:n,isOpen:r=!1,className:t,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:s,children:d}){const l={action:(s==null?void 0:s.action)||d,message:s==null?void 0:s.message,className:t};return i.jsx(ae.Snackbar,{autoHideDuration:e??void 0,open:r,onClose:o,anchorOrigin:a,id:n,ContentProps:l})}function qt({id:e,isChecked:n,isDisabled:r=!1,hasError:t=!1,className:o,onChange:a}){return i.jsx(ae.Switch,{id:e,checked:n,disabled:r,className:`papi-switch ${t?"error":""} ${o??""}`,onChange:a})}function Kn({onRowChange:e,row:n,column:r}){const t=o=>{e({...n,[r.key]:o.target.value})};return i.jsx(Ze,{defaultValue:n[r.key],onChange:t})}const Gt=({onChange:e,disabled:n,checked:r,...t})=>{const o=a=>{e(a.target.checked,a.nativeEvent.shiftKey)};return i.jsx(Lr,{...t,isChecked:r,isDisabled:n,onChange:o})};function Xt({columns:e,sortColumns:n,onSortColumnsChange:r,onColumnResize:t,defaultColumnWidth:o,defaultColumnMinWidth:a,defaultColumnMaxWidth:s,defaultColumnSortable:d=!0,defaultColumnResizable:l=!0,rows:c,enableSelectColumn:u,selectColumnWidth:h=50,rowKeyGetter:p,rowHeight:v=35,headerRowHeight:y=35,selectedRows:m,onSelectedRowsChange:f,onRowsChange:S,onCellClick:K,onCellDoubleClick:P,onCellContextMenu:E,onCellKeyDown:g,direction:se="ltr",enableVirtualization:ce=!0,onCopy:N,onPaste:J,onScroll:C,className:Z}){const ie=D.useMemo(()=>{const ue=e.map(G=>typeof G.editable=="function"?{...G,editable:le=>!!G.editable(le),renderEditCell:G.renderEditCell||Kn}:G.editable&&!G.renderEditCell?{...G,renderEditCell:Kn}:G.renderEditCell&&!G.editable?{...G,editable:!1}:G);return u?[{...Hn.SelectColumn,minWidth:h},...ue]:ue},[e,u,h]);return i.jsx(Hn,{columns:ie,defaultColumnOptions:{width:o,minWidth:a,maxWidth:s,sortable:d,resizable:l},sortColumns:n,onSortColumnsChange:r,onColumnResize:t,rows:c,rowKeyGetter:p,rowHeight:v,headerRowHeight:y,selectedRows:m,onSelectedRowsChange:f,onRowsChange:S,onCellClick:K,onCellDoubleClick:P,onCellContextMenu:E,onCellKeyDown:g,direction:se,enableVirtualization:ce,onCopy:N,onPaste:J,onScroll:C,renderers:{renderCheckbox:Gt},className:Z??"rdg-light"})}function z(){return z=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},z.apply(this,arguments)}function Ne(e){if(typeof e!="object"||e===null)return!1;const n=Object.getPrototypeOf(e);return(n===null||n===Object.prototype||Object.getPrototypeOf(n)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Gr(e){if(!Ne(e))return e;const n={};return Object.keys(e).forEach(r=>{n[r]=Gr(e[r])}),n}function ve(e,n,r={clone:!0}){const t=r.clone?z({},e):e;return Ne(e)&&Ne(n)&&Object.keys(n).forEach(o=>{o!=="__proto__"&&(Ne(n[o])&&o in e&&Ne(e[o])?t[o]=ve(e[o],n[o],r):r.clone?t[o]=Ne(n[o])?Gr(n[o]):n[o]:t[o]=n[o])}),t}function Ht(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var $n={exports:{}},on={exports:{}},F={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Jn;function Wt(){if(Jn)return F;Jn=1;var e=typeof Symbol=="function"&&Symbol.for,n=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,t=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,d=e?Symbol.for("react.context"):60110,l=e?Symbol.for("react.async_mode"):60111,c=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,h=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,f=e?Symbol.for("react.fundamental"):60117,S=e?Symbol.for("react.responder"):60118,K=e?Symbol.for("react.scope"):60119;function P(g){if(typeof g=="object"&&g!==null){var se=g.$$typeof;switch(se){case n:switch(g=g.type,g){case l:case c:case t:case a:case o:case h:return g;default:switch(g=g&&g.$$typeof,g){case d:case u:case y:case v:case s:return g;default:return se}}case r:return se}}}function E(g){return P(g)===c}return F.AsyncMode=l,F.ConcurrentMode=c,F.ContextConsumer=d,F.ContextProvider=s,F.Element=n,F.ForwardRef=u,F.Fragment=t,F.Lazy=y,F.Memo=v,F.Portal=r,F.Profiler=a,F.StrictMode=o,F.Suspense=h,F.isAsyncMode=function(g){return E(g)||P(g)===l},F.isConcurrentMode=E,F.isContextConsumer=function(g){return P(g)===d},F.isContextProvider=function(g){return P(g)===s},F.isElement=function(g){return typeof g=="object"&&g!==null&&g.$$typeof===n},F.isForwardRef=function(g){return P(g)===u},F.isFragment=function(g){return P(g)===t},F.isLazy=function(g){return P(g)===y},F.isMemo=function(g){return P(g)===v},F.isPortal=function(g){return P(g)===r},F.isProfiler=function(g){return P(g)===a},F.isStrictMode=function(g){return P(g)===o},F.isSuspense=function(g){return P(g)===h},F.isValidElementType=function(g){return typeof g=="string"||typeof g=="function"||g===t||g===c||g===a||g===o||g===h||g===p||typeof g=="object"&&g!==null&&(g.$$typeof===y||g.$$typeof===v||g.$$typeof===s||g.$$typeof===d||g.$$typeof===u||g.$$typeof===f||g.$$typeof===S||g.$$typeof===K||g.$$typeof===m)},F.typeOf=P,F}var L={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Zn;function Yt(){return Zn||(Zn=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,n=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,t=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,d=e?Symbol.for("react.context"):60110,l=e?Symbol.for("react.async_mode"):60111,c=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,h=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,f=e?Symbol.for("react.fundamental"):60117,S=e?Symbol.for("react.responder"):60118,K=e?Symbol.for("react.scope"):60119;function P(w){return typeof w=="string"||typeof w=="function"||w===t||w===c||w===a||w===o||w===h||w===p||typeof w=="object"&&w!==null&&(w.$$typeof===y||w.$$typeof===v||w.$$typeof===s||w.$$typeof===d||w.$$typeof===u||w.$$typeof===f||w.$$typeof===S||w.$$typeof===K||w.$$typeof===m)}function E(w){if(typeof w=="object"&&w!==null){var fe=w.$$typeof;switch(fe){case n:var k=w.type;switch(k){case l:case c:case t:case a:case o:case h:return k;default:var Ae=k&&k.$$typeof;switch(Ae){case d:case u:case y:case v:case s:return Ae;default:return fe}}case r:return fe}}}var g=l,se=c,ce=d,N=s,J=n,C=u,Z=t,ie=y,ue=v,G=r,be=a,le=o,ke=h,Oe=!1;function Ie(w){return Oe||(Oe=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),b(w)||E(w)===l}function b(w){return E(w)===c}function x(w){return E(w)===d}function j(w){return E(w)===s}function O(w){return typeof w=="object"&&w!==null&&w.$$typeof===n}function T(w){return E(w)===u}function A(w){return E(w)===t}function _(w){return E(w)===y}function R(w){return E(w)===v}function M(w){return E(w)===r}function V(w){return E(w)===a}function B(w){return E(w)===o}function de(w){return E(w)===h}L.AsyncMode=g,L.ConcurrentMode=se,L.ContextConsumer=ce,L.ContextProvider=N,L.Element=J,L.ForwardRef=C,L.Fragment=Z,L.Lazy=ie,L.Memo=ue,L.Portal=G,L.Profiler=be,L.StrictMode=le,L.Suspense=ke,L.isAsyncMode=Ie,L.isConcurrentMode=b,L.isContextConsumer=x,L.isContextProvider=j,L.isElement=O,L.isForwardRef=T,L.isFragment=A,L.isLazy=_,L.isMemo=R,L.isPortal=M,L.isProfiler=V,L.isStrictMode=B,L.isSuspense=de,L.isValidElementType=P,L.typeOf=E}()),L}var Qn;function Xr(){return Qn||(Qn=1,process.env.NODE_ENV==="production"?on.exports=Wt():on.exports=Yt()),on.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Sn,er;function Kt(){if(er)return Sn;er=1;var e=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function t(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var s={},d=0;d<10;d++)s["_"+String.fromCharCode(d)]=d;var l=Object.getOwnPropertyNames(s).map(function(u){return s[u]});if(l.join("")!=="0123456789")return!1;var c={};return"abcdefghijklmnopqrst".split("").forEach(function(u){c[u]=u}),Object.keys(Object.assign({},c)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Sn=o()?Object.assign:function(a,s){for(var d,l=t(a),c,u=1;u<arguments.length;u++){d=Object(arguments[u]);for(var h in d)n.call(d,h)&&(l[h]=d[h]);if(e){c=e(d);for(var p=0;p<c.length;p++)r.call(d,c[p])&&(l[c[p]]=d[c[p]])}}return l},Sn}var Cn,nr;function Bn(){if(nr)return Cn;nr=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Cn=e,Cn}var En,rr;function Hr(){return rr||(rr=1,En=Function.call.bind(Object.prototype.hasOwnProperty)),En}var Tn,tr;function Jt(){if(tr)return Tn;tr=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var n=Bn(),r={},t=Hr();e=function(a){var s="Warning: "+a;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(a,s,d,l,c){if(process.env.NODE_ENV!=="production"){for(var u in a)if(t(a,u)){var h;try{if(typeof a[u]!="function"){var p=Error((l||"React class")+": "+d+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw p.name="Invariant Violation",p}h=a[u](s,u,l,d,null,n)}catch(y){h=y}if(h&&!(h instanceof Error)&&e((l||"React class")+": type specification of "+d+" `"+u+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof h+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),h instanceof Error&&!(h.message in r)){r[h.message]=!0;var v=c?c():"";e("Failed "+d+" type: "+h.message+(v??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(r={})},Tn=o,Tn}var Nn,or;function Zt(){if(or)return Nn;or=1;var e=Xr(),n=Kt(),r=Bn(),t=Hr(),o=Jt(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(d){var l="Warning: "+d;typeof console<"u"&&console.error(l);try{throw new Error(l)}catch{}});function s(){return null}return Nn=function(d,l){var c=typeof Symbol=="function"&&Symbol.iterator,u="@@iterator";function h(b){var x=b&&(c&&b[c]||b[u]);if(typeof x=="function")return x}var p="<<anonymous>>",v={array:S("array"),bigint:S("bigint"),bool:S("boolean"),func:S("function"),number:S("number"),object:S("object"),string:S("string"),symbol:S("symbol"),any:K(),arrayOf:P,element:E(),elementType:g(),instanceOf:se,node:C(),objectOf:N,oneOf:ce,oneOfType:J,shape:ie,exact:ue};function y(b,x){return b===x?b!==0||1/b===1/x:b!==b&&x!==x}function m(b,x){this.message=b,this.data=x&&typeof x=="object"?x:{},this.stack=""}m.prototype=Error.prototype;function f(b){if(process.env.NODE_ENV!=="production")var x={},j=0;function O(A,_,R,M,V,B,de){if(M=M||p,B=B||R,de!==r){if(l){var w=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw w.name="Invariant Violation",w}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var fe=M+":"+R;!x[fe]&&j<3&&(a("You are manually calling a React.PropTypes validation function for the `"+B+"` prop on `"+M+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),x[fe]=!0,j++)}}return _[R]==null?A?_[R]===null?new m("The "+V+" `"+B+"` is marked as required "+("in `"+M+"`, but its value is `null`.")):new m("The "+V+" `"+B+"` is marked as required in "+("`"+M+"`, but its value is `undefined`.")):null:b(_,R,M,V,B)}var T=O.bind(null,!1);return T.isRequired=O.bind(null,!0),T}function S(b){function x(j,O,T,A,_,R){var M=j[O],V=le(M);if(V!==b){var B=ke(M);return new m("Invalid "+A+" `"+_+"` of type "+("`"+B+"` supplied to `"+T+"`, expected ")+("`"+b+"`."),{expectedType:b})}return null}return f(x)}function K(){return f(s)}function P(b){function x(j,O,T,A,_){if(typeof b!="function")return new m("Property `"+_+"` of component `"+T+"` has invalid PropType notation inside arrayOf.");var R=j[O];if(!Array.isArray(R)){var M=le(R);return new m("Invalid "+A+" `"+_+"` of type "+("`"+M+"` supplied to `"+T+"`, expected an array."))}for(var V=0;V<R.length;V++){var B=b(R,V,T,A,_+"["+V+"]",r);if(B instanceof Error)return B}return null}return f(x)}function E(){function b(x,j,O,T,A){var _=x[j];if(!d(_)){var R=le(_);return new m("Invalid "+T+" `"+A+"` of type "+("`"+R+"` supplied to `"+O+"`, expected a single ReactElement."))}return null}return f(b)}function g(){function b(x,j,O,T,A){var _=x[j];if(!e.isValidElementType(_)){var R=le(_);return new m("Invalid "+T+" `"+A+"` of type "+("`"+R+"` supplied to `"+O+"`, expected a single ReactElement type."))}return null}return f(b)}function se(b){function x(j,O,T,A,_){if(!(j[O]instanceof b)){var R=b.name||p,M=Ie(j[O]);return new m("Invalid "+A+" `"+_+"` of type "+("`"+M+"` supplied to `"+T+"`, expected ")+("instance of `"+R+"`."))}return null}return f(x)}function ce(b){if(!Array.isArray(b))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),s;function x(j,O,T,A,_){for(var R=j[O],M=0;M<b.length;M++)if(y(R,b[M]))return null;var V=JSON.stringify(b,function(de,w){var fe=ke(w);return fe==="symbol"?String(w):w});return new m("Invalid "+A+" `"+_+"` of value `"+String(R)+"` "+("supplied to `"+T+"`, expected one of "+V+"."))}return f(x)}function N(b){function x(j,O,T,A,_){if(typeof b!="function")return new m("Property `"+_+"` of component `"+T+"` has invalid PropType notation inside objectOf.");var R=j[O],M=le(R);if(M!=="object")return new m("Invalid "+A+" `"+_+"` of type "+("`"+M+"` supplied to `"+T+"`, expected an object."));for(var V in R)if(t(R,V)){var B=b(R,V,T,A,_+"."+V,r);if(B instanceof Error)return B}return null}return f(x)}function J(b){if(!Array.isArray(b))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var x=0;x<b.length;x++){var j=b[x];if(typeof j!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+Oe(j)+" at index "+x+"."),s}function O(T,A,_,R,M){for(var V=[],B=0;B<b.length;B++){var de=b[B],w=de(T,A,_,R,M,r);if(w==null)return null;w.data&&t(w.data,"expectedType")&&V.push(w.data.expectedType)}var fe=V.length>0?", expected one of type ["+V.join(", ")+"]":"";return new m("Invalid "+R+" `"+M+"` supplied to "+("`"+_+"`"+fe+"."))}return f(O)}function C(){function b(x,j,O,T,A){return G(x[j])?null:new m("Invalid "+T+" `"+A+"` supplied to "+("`"+O+"`, expected a ReactNode."))}return f(b)}function Z(b,x,j,O,T){return new m((b||"React class")+": "+x+" type `"+j+"."+O+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+T+"`.")}function ie(b){function x(j,O,T,A,_){var R=j[O],M=le(R);if(M!=="object")return new m("Invalid "+A+" `"+_+"` of type `"+M+"` "+("supplied to `"+T+"`, expected `object`."));for(var V in b){var B=b[V];if(typeof B!="function")return Z(T,A,_,V,ke(B));var de=B(R,V,T,A,_+"."+V,r);if(de)return de}return null}return f(x)}function ue(b){function x(j,O,T,A,_){var R=j[O],M=le(R);if(M!=="object")return new m("Invalid "+A+" `"+_+"` of type `"+M+"` "+("supplied to `"+T+"`, expected `object`."));var V=n({},j[O],b);for(var B in V){var de=b[B];if(t(b,B)&&typeof de!="function")return Z(T,A,_,B,ke(de));if(!de)return new m("Invalid "+A+" `"+_+"` key `"+B+"` supplied to `"+T+"`.\nBad object: "+JSON.stringify(j[O],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(b),null,"  "));var w=de(R,B,T,A,_+"."+B,r);if(w)return w}return null}return f(x)}function G(b){switch(typeof b){case"number":case"string":case"undefined":return!0;case"boolean":return!b;case"object":if(Array.isArray(b))return b.every(G);if(b===null||d(b))return!0;var x=h(b);if(x){var j=x.call(b),O;if(x!==b.entries){for(;!(O=j.next()).done;)if(!G(O.value))return!1}else for(;!(O=j.next()).done;){var T=O.value;if(T&&!G(T[1]))return!1}}else return!1;return!0;default:return!1}}function be(b,x){return b==="symbol"?!0:x?x["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&x instanceof Symbol:!1}function le(b){var x=typeof b;return Array.isArray(b)?"array":b instanceof RegExp?"object":be(x,b)?"symbol":x}function ke(b){if(typeof b>"u"||b===null)return""+b;var x=le(b);if(x==="object"){if(b instanceof Date)return"date";if(b instanceof RegExp)return"regexp"}return x}function Oe(b){var x=ke(b);switch(x){case"array":case"object":return"an "+x;case"boolean":case"date":case"regexp":return"a "+x;default:return x}}function Ie(b){return!b.constructor||!b.constructor.name?p:b.constructor.name}return v.checkPropTypes=o,v.resetWarningCache=o.resetWarningCache,v.PropTypes=v,v},Nn}var _n,ar;function Qt(){if(ar)return _n;ar=1;var e=Bn();function n(){}function r(){}return r.resetWarningCache=n,_n=function(){function t(s,d,l,c,u,h){if(h!==e){var p=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw p.name="Invariant Violation",p}}t.isRequired=t;function o(){return t}var a={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:o,element:t,elementType:t,instanceOf:o,node:t,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:r,resetWarningCache:n};return a.PropTypes=a,a},_n}if(process.env.NODE_ENV!=="production"){var eo=Xr(),no=!0;$n.exports=Zt()(eo.isElement,no)}else $n.exports=Qt()();var ro=$n.exports;const X=Ht(ro);function Ue(e){let n="https://mui.com/production-error/?code="+e;for(let r=1;r<arguments.length;r+=1)n+="&args[]="+encodeURIComponent(arguments[r]);return"Minified MUI error #"+e+"; visit "+n+" for the full message."}var Pn={exports:{}},U={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sr;function to(){if(sr)return U;sr=1;var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),t=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),d=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),h=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),y;y=Symbol.for("react.module.reference");function m(f){if(typeof f=="object"&&f!==null){var S=f.$$typeof;switch(S){case e:switch(f=f.type,f){case r:case o:case t:case c:case u:return f;default:switch(f=f&&f.$$typeof,f){case d:case s:case l:case p:case h:case a:return f;default:return S}}case n:return S}}}return U.ContextConsumer=s,U.ContextProvider=a,U.Element=e,U.ForwardRef=l,U.Fragment=r,U.Lazy=p,U.Memo=h,U.Portal=n,U.Profiler=o,U.StrictMode=t,U.Suspense=c,U.SuspenseList=u,U.isAsyncMode=function(){return!1},U.isConcurrentMode=function(){return!1},U.isContextConsumer=function(f){return m(f)===s},U.isContextProvider=function(f){return m(f)===a},U.isElement=function(f){return typeof f=="object"&&f!==null&&f.$$typeof===e},U.isForwardRef=function(f){return m(f)===l},U.isFragment=function(f){return m(f)===r},U.isLazy=function(f){return m(f)===p},U.isMemo=function(f){return m(f)===h},U.isPortal=function(f){return m(f)===n},U.isProfiler=function(f){return m(f)===o},U.isStrictMode=function(f){return m(f)===t},U.isSuspense=function(f){return m(f)===c},U.isSuspenseList=function(f){return m(f)===u},U.isValidElementType=function(f){return typeof f=="string"||typeof f=="function"||f===r||f===o||f===t||f===c||f===u||f===v||typeof f=="object"&&f!==null&&(f.$$typeof===p||f.$$typeof===h||f.$$typeof===a||f.$$typeof===s||f.$$typeof===l||f.$$typeof===y||f.getModuleId!==void 0)},U.typeOf=m,U}var q={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ir;function oo(){return ir||(ir=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),t=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),d=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),h=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),y=!1,m=!1,f=!1,S=!1,K=!1,P;P=Symbol.for("react.module.reference");function E(k){return!!(typeof k=="string"||typeof k=="function"||k===r||k===o||K||k===t||k===c||k===u||S||k===v||y||m||f||typeof k=="object"&&k!==null&&(k.$$typeof===p||k.$$typeof===h||k.$$typeof===a||k.$$typeof===s||k.$$typeof===l||k.$$typeof===P||k.getModuleId!==void 0))}function g(k){if(typeof k=="object"&&k!==null){var Ae=k.$$typeof;switch(Ae){case e:var tn=k.type;switch(tn){case r:case o:case t:case c:case u:return tn;default:var Xn=tn&&tn.$$typeof;switch(Xn){case d:case s:case l:case p:case h:case a:return Xn;default:return Ae}}case n:return Ae}}}var se=s,ce=a,N=e,J=l,C=r,Z=p,ie=h,ue=n,G=o,be=t,le=c,ke=u,Oe=!1,Ie=!1;function b(k){return Oe||(Oe=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function x(k){return Ie||(Ie=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function j(k){return g(k)===s}function O(k){return g(k)===a}function T(k){return typeof k=="object"&&k!==null&&k.$$typeof===e}function A(k){return g(k)===l}function _(k){return g(k)===r}function R(k){return g(k)===p}function M(k){return g(k)===h}function V(k){return g(k)===n}function B(k){return g(k)===o}function de(k){return g(k)===t}function w(k){return g(k)===c}function fe(k){return g(k)===u}q.ContextConsumer=se,q.ContextProvider=ce,q.Element=N,q.ForwardRef=J,q.Fragment=C,q.Lazy=Z,q.Memo=ie,q.Portal=ue,q.Profiler=G,q.StrictMode=be,q.Suspense=le,q.SuspenseList=ke,q.isAsyncMode=b,q.isConcurrentMode=x,q.isContextConsumer=j,q.isContextProvider=O,q.isElement=T,q.isForwardRef=A,q.isFragment=_,q.isLazy=R,q.isMemo=M,q.isPortal=V,q.isProfiler=B,q.isStrictMode=de,q.isSuspense=w,q.isSuspenseList=fe,q.isValidElementType=E,q.typeOf=g}()),q}process.env.NODE_ENV==="production"?Pn.exports=to():Pn.exports=oo();var cr=Pn.exports;const ao=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function so(e){const n=`${e}`.match(ao);return n&&n[1]||""}function Wr(e,n=""){return e.displayName||e.name||so(e)||n}function lr(e,n,r){const t=Wr(n);return e.displayName||(t!==""?`${r}(${t})`:r)}function io(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Wr(e,"Component");if(typeof e=="object")switch(e.$$typeof){case cr.ForwardRef:return lr(e,e.render,"ForwardRef");case cr.Memo:return lr(e,e.type,"memo");default:return}}}function we(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Ue(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Yr(e,n){const r=z({},n);return Object.keys(e).forEach(t=>{if(t.toString().match(/^(components|slots)$/))r[t]=z({},e[t],r[t]);else if(t.toString().match(/^(componentsProps|slotProps)$/)){const o=e[t]||{},a=n[t];r[t]={},!a||!Object.keys(a)?r[t]=o:!o||!Object.keys(o)?r[t]=a:(r[t]=z({},a),Object.keys(o).forEach(s=>{r[t][s]=Yr(o[s],a[s])}))}else r[t]===void 0&&(r[t]=e[t])}),r}function co(e,n,r=void 0){const t={};return Object.keys(e).forEach(o=>{t[o]=e[o].reduce((a,s)=>{if(s){const d=n(s);d!==""&&a.push(d),r&&r[s]&&a.push(r[s])}return a},[]).join(" ")}),t}const dr=e=>e,lo=()=>{let e=dr;return{configure(n){e=n},generate(n){return e(n)},reset(){e=dr}}},uo=lo(),po=uo,fo={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Dn(e,n,r="Mui"){const t=fo[n];return t?`${r}-${t}`:`${po.generate(e)}-${n}`}function ho(e,n,r="Mui"){const t={};return n.forEach(o=>{t[o]=Dn(e,o,r)}),t}function mo(e,n=Number.MIN_SAFE_INTEGER,r=Number.MAX_SAFE_INTEGER){return Math.max(n,Math.min(e,r))}function Ee(e,n){if(e==null)return{};var r={},t=Object.keys(e),o,a;for(a=0;a<t.length;a++)o=t[a],!(n.indexOf(o)>=0)&&(r[o]=e[o]);return r}const go=["values","unit","step"],bo=e=>{const n=Object.keys(e).map(r=>({key:r,val:e[r]}))||[];return n.sort((r,t)=>r.val-t.val),n.reduce((r,t)=>z({},r,{[t.key]:t.val}),{})};function yo(e){const{values:n={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:r="px",step:t=5}=e,o=Ee(e,go),a=bo(n),s=Object.keys(a);function d(p){return`@media (min-width:${typeof n[p]=="number"?n[p]:p}${r})`}function l(p){return`@media (max-width:${(typeof n[p]=="number"?n[p]:p)-t/100}${r})`}function c(p,v){const y=s.indexOf(v);return`@media (min-width:${typeof n[p]=="number"?n[p]:p}${r}) and (max-width:${(y!==-1&&typeof n[s[y]]=="number"?n[s[y]]:v)-t/100}${r})`}function u(p){return s.indexOf(p)+1<s.length?c(p,s[s.indexOf(p)+1]):d(p)}function h(p){const v=s.indexOf(p);return v===0?d(s[1]):v===s.length-1?l(s[v]):c(p,s[s.indexOf(p)+1]).replace("@media","@media not all and")}return z({keys:s,values:a,up:d,down:l,between:c,only:u,not:h,unit:r},o)}const vo={borderRadius:4},wo=vo,xo=process.env.NODE_ENV!=="production"?X.oneOfType([X.number,X.string,X.object,X.array]):{},_e=xo;function Ke(e,n){return n?ve(e,n,{clone:!1}):e}const zn={xs:0,sm:600,md:900,lg:1200,xl:1536},ur={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${zn[e]}px)`};function Ce(e,n,r){const t=e.theme||{};if(Array.isArray(n)){const a=t.breakpoints||ur;return n.reduce((s,d,l)=>(s[a.up(a.keys[l])]=r(n[l]),s),{})}if(typeof n=="object"){const a=t.breakpoints||ur;return Object.keys(n).reduce((s,d)=>{if(Object.keys(a.values||zn).indexOf(d)!==-1){const l=a.up(d);s[l]=r(n[d],d)}else{const l=d;s[l]=n[l]}return s},{})}return r(n)}function ko(e={}){var n;return((n=e.keys)==null?void 0:n.reduce((t,o)=>{const a=e.up(o);return t[a]={},t},{}))||{}}function So(e,n){return e.reduce((r,t)=>{const o=r[t];return(!o||Object.keys(o).length===0)&&delete r[t],r},n)}function fn(e,n,r=!0){if(!n||typeof n!="string")return null;if(e&&e.vars&&r){const t=`vars.${n}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(t!=null)return t}return n.split(".").reduce((t,o)=>t&&t[o]!=null?t[o]:null,e)}function dn(e,n,r,t=r){let o;return typeof e=="function"?o=e(r):Array.isArray(e)?o=e[r]||t:o=fn(e,r)||t,n&&(o=n(o,t,e)),o}function te(e){const{prop:n,cssProperty:r=e.prop,themeKey:t,transform:o}=e,a=s=>{if(s[n]==null)return null;const d=s[n],l=s.theme,c=fn(l,t)||{};return Ce(s,d,h=>{let p=dn(c,o,h);return h===p&&typeof h=="string"&&(p=dn(c,o,`${n}${h==="default"?"":we(h)}`,h)),r===!1?p:{[r]:p}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[n]:_e}:{},a.filterProps=[n],a}function Co(e){const n={};return r=>(n[r]===void 0&&(n[r]=e(r)),n[r])}const Eo={m:"margin",p:"padding"},To={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},pr={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},No=Co(e=>{if(e.length>2)if(pr[e])e=pr[e];else return[e];const[n,r]=e.split(""),t=Eo[n],o=To[r]||"";return Array.isArray(o)?o.map(a=>t+a):[t+o]}),hn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],mn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],_o=[...hn,...mn];function nn(e,n,r,t){var o;const a=(o=fn(e,n,!1))!=null?o:r;return typeof a=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${t} argument to be a number or a string, got ${s}.`),a*s):Array.isArray(a)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>a.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${s} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${n}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${n}\` as a number.`].join(`
`))),a[s]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${n}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Kr(e){return nn(e,"spacing",8,"spacing")}function rn(e,n){if(typeof n=="string"||n==null)return n;const r=Math.abs(n),t=e(r);return n>=0?t:typeof t=="number"?-t:`-${t}`}function Oo(e,n){return r=>e.reduce((t,o)=>(t[o]=rn(n,r),t),{})}function Ro(e,n,r,t){if(n.indexOf(r)===-1)return null;const o=No(r),a=Oo(o,t),s=e[r];return Ce(e,s,a)}function Jr(e,n){const r=Kr(e.theme);return Object.keys(e).map(t=>Ro(e,n,t,r)).reduce(Ke,{})}function Q(e){return Jr(e,hn)}Q.propTypes=process.env.NODE_ENV!=="production"?hn.reduce((e,n)=>(e[n]=_e,e),{}):{};Q.filterProps=hn;function ee(e){return Jr(e,mn)}ee.propTypes=process.env.NODE_ENV!=="production"?mn.reduce((e,n)=>(e[n]=_e,e),{}):{};ee.filterProps=mn;process.env.NODE_ENV!=="production"&&_o.reduce((e,n)=>(e[n]=_e,e),{});function jo(e=8){if(e.mui)return e;const n=Kr({spacing:e}),r=(...t)=>(process.env.NODE_ENV!=="production"&&(t.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${t.length}`)),(t.length===0?[1]:t).map(a=>{const s=n(a);return typeof s=="number"?`${s}px`:s}).join(" "));return r.mui=!0,r}function gn(...e){const n=e.reduce((t,o)=>(o.filterProps.forEach(a=>{t[a]=o}),t),{}),r=t=>Object.keys(t).reduce((o,a)=>n[a]?Ke(o,n[a](t)):o,{});return r.propTypes=process.env.NODE_ENV!=="production"?e.reduce((t,o)=>Object.assign(t,o.propTypes),{}):{},r.filterProps=e.reduce((t,o)=>t.concat(o.filterProps),[]),r}function me(e){return typeof e!="number"?e:`${e}px solid`}function ge(e,n){return te({prop:e,themeKey:"borders",transform:n})}const $o=ge("border",me),Po=ge("borderTop",me),Io=ge("borderRight",me),Ao=ge("borderBottom",me),Mo=ge("borderLeft",me),Bo=ge("borderColor"),Do=ge("borderTopColor"),zo=ge("borderRightColor"),Vo=ge("borderBottomColor"),Fo=ge("borderLeftColor"),Lo=ge("outline",me),Uo=ge("outlineColor"),bn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const n=nn(e.theme,"shape.borderRadius",4,"borderRadius"),r=t=>({borderRadius:rn(n,t)});return Ce(e,e.borderRadius,r)}return null};bn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:_e}:{};bn.filterProps=["borderRadius"];gn($o,Po,Io,Ao,Mo,Bo,Do,zo,Vo,Fo,bn,Lo,Uo);const yn=e=>{if(e.gap!==void 0&&e.gap!==null){const n=nn(e.theme,"spacing",8,"gap"),r=t=>({gap:rn(n,t)});return Ce(e,e.gap,r)}return null};yn.propTypes=process.env.NODE_ENV!=="production"?{gap:_e}:{};yn.filterProps=["gap"];const vn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const n=nn(e.theme,"spacing",8,"columnGap"),r=t=>({columnGap:rn(n,t)});return Ce(e,e.columnGap,r)}return null};vn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:_e}:{};vn.filterProps=["columnGap"];const wn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const n=nn(e.theme,"spacing",8,"rowGap"),r=t=>({rowGap:rn(n,t)});return Ce(e,e.rowGap,r)}return null};wn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:_e}:{};wn.filterProps=["rowGap"];const qo=te({prop:"gridColumn"}),Go=te({prop:"gridRow"}),Xo=te({prop:"gridAutoFlow"}),Ho=te({prop:"gridAutoColumns"}),Wo=te({prop:"gridAutoRows"}),Yo=te({prop:"gridTemplateColumns"}),Ko=te({prop:"gridTemplateRows"}),Jo=te({prop:"gridTemplateAreas"}),Zo=te({prop:"gridArea"});gn(yn,vn,wn,qo,Go,Xo,Ho,Wo,Yo,Ko,Jo,Zo);function Le(e,n){return n==="grey"?n:e}const Qo=te({prop:"color",themeKey:"palette",transform:Le}),ea=te({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Le}),na=te({prop:"backgroundColor",themeKey:"palette",transform:Le});gn(Qo,ea,na);function pe(e){return e<=1&&e!==0?`${e*100}%`:e}const ra=te({prop:"width",transform:pe}),Vn=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const n=r=>{var t,o;const a=((t=e.theme)==null||(t=t.breakpoints)==null||(t=t.values)==null?void 0:t[r])||zn[r];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:pe(r)}};return Ce(e,e.maxWidth,n)}return null};Vn.filterProps=["maxWidth"];const ta=te({prop:"minWidth",transform:pe}),oa=te({prop:"height",transform:pe}),aa=te({prop:"maxHeight",transform:pe}),sa=te({prop:"minHeight",transform:pe});te({prop:"size",cssProperty:"width",transform:pe});te({prop:"size",cssProperty:"height",transform:pe});const ia=te({prop:"boxSizing"});gn(ra,Vn,ta,oa,aa,sa,ia);const ca={border:{themeKey:"borders",transform:me},borderTop:{themeKey:"borders",transform:me},borderRight:{themeKey:"borders",transform:me},borderBottom:{themeKey:"borders",transform:me},borderLeft:{themeKey:"borders",transform:me},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:me},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:bn},color:{themeKey:"palette",transform:Le},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Le},backgroundColor:{themeKey:"palette",transform:Le},p:{style:ee},pt:{style:ee},pr:{style:ee},pb:{style:ee},pl:{style:ee},px:{style:ee},py:{style:ee},padding:{style:ee},paddingTop:{style:ee},paddingRight:{style:ee},paddingBottom:{style:ee},paddingLeft:{style:ee},paddingX:{style:ee},paddingY:{style:ee},paddingInline:{style:ee},paddingInlineStart:{style:ee},paddingInlineEnd:{style:ee},paddingBlock:{style:ee},paddingBlockStart:{style:ee},paddingBlockEnd:{style:ee},m:{style:Q},mt:{style:Q},mr:{style:Q},mb:{style:Q},ml:{style:Q},mx:{style:Q},my:{style:Q},margin:{style:Q},marginTop:{style:Q},marginRight:{style:Q},marginBottom:{style:Q},marginLeft:{style:Q},marginX:{style:Q},marginY:{style:Q},marginInline:{style:Q},marginInlineStart:{style:Q},marginInlineEnd:{style:Q},marginBlock:{style:Q},marginBlockStart:{style:Q},marginBlockEnd:{style:Q},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:yn},rowGap:{style:wn},columnGap:{style:vn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:pe},maxWidth:{style:Vn},minWidth:{transform:pe},height:{transform:pe},maxHeight:{transform:pe},minHeight:{transform:pe},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Fn=ca;function la(...e){const n=e.reduce((t,o)=>t.concat(Object.keys(o)),[]),r=new Set(n);return e.every(t=>r.size===Object.keys(t).length)}function da(e,n){return typeof e=="function"?e(n):e}function ua(){function e(r,t,o,a){const s={[r]:t,theme:o},d=a[r];if(!d)return{[r]:t};const{cssProperty:l=r,themeKey:c,transform:u,style:h}=d;if(t==null)return null;if(c==="typography"&&t==="inherit")return{[r]:t};const p=fn(o,c)||{};return h?h(s):Ce(s,t,y=>{let m=dn(p,u,y);return y===m&&typeof y=="string"&&(m=dn(p,u,`${r}${y==="default"?"":we(y)}`,y)),l===!1?m:{[l]:m}})}function n(r){var t;const{sx:o,theme:a={}}=r||{};if(!o)return null;const s=(t=a.unstable_sxConfig)!=null?t:Fn;function d(l){let c=l;if(typeof l=="function")c=l(a);else if(typeof l!="object")return l;if(!c)return null;const u=ko(a.breakpoints),h=Object.keys(u);let p=u;return Object.keys(c).forEach(v=>{const y=da(c[v],a);if(y!=null)if(typeof y=="object")if(s[v])p=Ke(p,e(v,y,a,s));else{const m=Ce({theme:a},y,f=>({[v]:f}));la(m,y)?p[v]=n({sx:y,theme:a}):p=Ke(p,m)}else p=Ke(p,e(v,y,a,s))}),So(h,p)}return Array.isArray(o)?o.map(d):d(o)}return n}const Zr=ua();Zr.filterProps=["sx"];const Ln=Zr,pa=["breakpoints","palette","spacing","shape"];function Un(e={},...n){const{breakpoints:r={},palette:t={},spacing:o,shape:a={}}=e,s=Ee(e,pa),d=yo(r),l=jo(o);let c=ve({breakpoints:d,direction:"ltr",components:{},palette:z({mode:"light"},t),spacing:l,shape:z({},wo,a)},s);return c=n.reduce((u,h)=>ve(u,h),c),c.unstable_sxConfig=z({},Fn,s==null?void 0:s.unstable_sxConfig),c.unstable_sx=function(h){return Ln({sx:h,theme:this})},c}function fa(e){return Object.keys(e).length===0}function ha(e=null){const n=Y.useContext(jn.ThemeContext);return!n||fa(n)?e:n}const ma=Un();function ga(e=ma){return ha(e)}const ba=["variant"];function fr(e){return e.length===0}function Qr(e){const{variant:n}=e,r=Ee(e,ba);let t=n||"";return Object.keys(r).sort().forEach(o=>{o==="color"?t+=fr(t)?e[o]:we(e[o]):t+=`${fr(t)?o:we(o)}${we(e[o].toString())}`}),t}const ya=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function va(e){return Object.keys(e).length===0}function wa(e){return typeof e=="string"&&e.charCodeAt(0)>96}const xa=(e,n)=>n.components&&n.components[e]&&n.components[e].styleOverrides?n.components[e].styleOverrides:null,un=e=>{let n=0;const r={};return e&&e.forEach(t=>{let o="";typeof t.props=="function"?(o=`callback${n}`,n+=1):o=Qr(t.props),r[o]=t.style}),r},ka=(e,n)=>{let r=[];return n&&n.components&&n.components[e]&&n.components[e].variants&&(r=n.components[e].variants),un(r)},pn=(e,n,r)=>{const{ownerState:t={}}=e,o=[];let a=0;return r&&r.forEach(s=>{let d=!0;if(typeof s.props=="function"){const l=z({},e,t);d=s.props(l)}else Object.keys(s.props).forEach(l=>{t[l]!==s.props[l]&&e[l]!==s.props[l]&&(d=!1)});d&&(typeof s.props=="function"?o.push(n[`callback${a}`]):o.push(n[Qr(s.props)])),typeof s.props=="function"&&(a+=1)}),o},Sa=(e,n,r,t)=>{var o;const a=r==null||(o=r.components)==null||(o=o[t])==null?void 0:o.variants;return pn(e,n,a)};function sn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Ca=Un(),hr=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function cn({defaultTheme:e,theme:n,themeId:r}){return va(n)?e:n[r]||n}function Ea(e){return e?(n,r)=>r[e]:null}const mr=({styledArg:e,props:n,defaultTheme:r,themeId:t})=>{const o=e(z({},n,{theme:cn(z({},n,{defaultTheme:r,themeId:t}))}));let a;if(o&&o.variants&&(a=o.variants,delete o.variants),a){const s=pn(n,un(a),a);return[o,...s]}return o};function Ta(e={}){const{themeId:n,defaultTheme:r=Ca,rootShouldForwardProp:t=sn,slotShouldForwardProp:o=sn}=e,a=s=>Ln(z({},s,{theme:cn(z({},s,{defaultTheme:r,themeId:n}))}));return a.__mui_systemSx=!0,(s,d={})=>{jn.internal_processStyles(s,E=>E.filter(g=>!(g!=null&&g.__mui_systemSx)));const{name:l,slot:c,skipVariantsResolver:u,skipSx:h,overridesResolver:p=Ea(hr(c))}=d,v=Ee(d,ya),y=u!==void 0?u:c&&c!=="Root"&&c!=="root"||!1,m=h||!1;let f;process.env.NODE_ENV!=="production"&&l&&(f=`${l}-${hr(c||"Root")}`);let S=sn;c==="Root"||c==="root"?S=t:c?S=o:wa(s)&&(S=void 0);const K=jn(s,z({shouldForwardProp:S,label:f},v)),P=(E,...g)=>{const se=g?g.map(C=>{if(typeof C=="function"&&C.__emotion_real!==C)return Z=>mr({styledArg:C,props:Z,defaultTheme:r,themeId:n});if(Ne(C)){let Z=C,ie;return C&&C.variants&&(ie=C.variants,delete Z.variants,Z=ue=>{let G=C;return pn(ue,un(ie),ie).forEach(le=>{G=ve(G,le)}),G}),Z}return C}):[];let ce=E;if(Ne(E)){let C;E&&E.variants&&(C=E.variants,delete ce.variants,ce=Z=>{let ie=E;return pn(Z,un(C),C).forEach(G=>{ie=ve(ie,G)}),ie})}else typeof E=="function"&&E.__emotion_real!==E&&(ce=C=>mr({styledArg:E,props:C,defaultTheme:r,themeId:n}));l&&p&&se.push(C=>{const Z=cn(z({},C,{defaultTheme:r,themeId:n})),ie=xa(l,Z);if(ie){const ue={};return Object.entries(ie).forEach(([G,be])=>{ue[G]=typeof be=="function"?be(z({},C,{theme:Z})):be}),p(C,ue)}return null}),l&&!y&&se.push(C=>{const Z=cn(z({},C,{defaultTheme:r,themeId:n}));return Sa(C,ka(l,Z),Z,l)}),m||se.push(a);const N=se.length-g.length;if(Array.isArray(E)&&N>0){const C=new Array(N).fill("");ce=[...E,...C],ce.raw=[...E.raw,...C]}const J=K(ce,...se);if(process.env.NODE_ENV!=="production"){let C;l&&(C=`${l}${we(c||"")}`),C===void 0&&(C=`Styled(${io(s)})`),J.displayName=C}return s.muiName&&(J.muiName=s.muiName),J};return K.withConfig&&(P.withConfig=K.withConfig),P}}function Na(e){const{theme:n,name:r,props:t}=e;return!n||!n.components||!n.components[r]||!n.components[r].defaultProps?t:Yr(n.components[r].defaultProps,t)}function _a({props:e,name:n,defaultTheme:r,themeId:t}){let o=ga(r);return t&&(o=o[t]||o),Na({theme:o,name:n,props:e})}function et(e,n=0,r=1){return process.env.NODE_ENV!=="production"&&(e<n||e>r)&&console.error(`MUI: The value provided ${e} is out of range [${n}, ${r}].`),mo(e,n,r)}function Oa(e){e=e.slice(1);const n=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let r=e.match(n);return r&&r[0].length===1&&(r=r.map(t=>t+t)),r?`rgb${r.length===4?"a":""}(${r.map((t,o)=>o<3?parseInt(t,16):Math.round(parseInt(t,16)/255*1e3)/1e3).join(", ")})`:""}function qe(e){if(e.type)return e;if(e.charAt(0)==="#")return qe(Oa(e));const n=e.indexOf("("),r=e.substring(0,n);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Ue(9,e));let t=e.substring(n+1,e.length-1),o;if(r==="color"){if(t=t.split(" "),o=t.shift(),t.length===4&&t[3].charAt(0)==="/"&&(t[3]=t[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Ue(10,o))}else t=t.split(",");return t=t.map(a=>parseFloat(a)),{type:r,values:t,colorSpace:o}}function qn(e){const{type:n,colorSpace:r}=e;let{values:t}=e;return n.indexOf("rgb")!==-1?t=t.map((o,a)=>a<3?parseInt(o,10):o):n.indexOf("hsl")!==-1&&(t[1]=`${t[1]}%`,t[2]=`${t[2]}%`),n.indexOf("color")!==-1?t=`${r} ${t.join(" ")}`:t=`${t.join(", ")}`,`${n}(${t})`}function Ra(e){e=qe(e);const{values:n}=e,r=n[0],t=n[1]/100,o=n[2]/100,a=t*Math.min(o,1-o),s=(c,u=(c+r/30)%12)=>o-a*Math.max(Math.min(u-3,9-u,1),-1);let d="rgb";const l=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(d+="a",l.push(n[3])),qn({type:d,values:l})}function gr(e){e=qe(e);let n=e.type==="hsl"||e.type==="hsla"?qe(Ra(e)).values:e.values;return n=n.map(r=>(e.type!=="color"&&(r/=255),r<=.03928?r/12.92:((r+.055)/1.055)**2.4)),Number((.2126*n[0]+.7152*n[1]+.0722*n[2]).toFixed(3))}function br(e,n){const r=gr(e),t=gr(n);return(Math.max(r,t)+.05)/(Math.min(r,t)+.05)}function ja(e,n){if(e=qe(e),n=et(n),e.type.indexOf("hsl")!==-1)e.values[2]*=1-n;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]*=1-n;return qn(e)}function $a(e,n){if(e=qe(e),n=et(n),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*n;else if(e.type.indexOf("rgb")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(255-e.values[r])*n;else if(e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(1-e.values[r])*n;return qn(e)}function Pa(e,n){return z({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},n)}const Ia={black:"#000",white:"#fff"},Qe=Ia,Aa={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Ma=Aa,Ba={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Me=Ba,Da={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Be=Da,za={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},He=za,Va={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},De=Va,Fa={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},ze=Fa,La={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Ve=La,Ua=["mode","contrastThreshold","tonalOffset"],yr={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Qe.white,default:Qe.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},On={text:{primary:Qe.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Qe.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function vr(e,n,r,t){const o=t.light||t,a=t.dark||t*1.5;e[n]||(e.hasOwnProperty(r)?e[n]=e[r]:n==="light"?e.light=$a(e.main,o):n==="dark"&&(e.dark=ja(e.main,a)))}function qa(e="light"){return e==="dark"?{main:De[200],light:De[50],dark:De[400]}:{main:De[700],light:De[400],dark:De[800]}}function Ga(e="light"){return e==="dark"?{main:Me[200],light:Me[50],dark:Me[400]}:{main:Me[500],light:Me[300],dark:Me[700]}}function Xa(e="light"){return e==="dark"?{main:Be[500],light:Be[300],dark:Be[700]}:{main:Be[700],light:Be[400],dark:Be[800]}}function Ha(e="light"){return e==="dark"?{main:ze[400],light:ze[300],dark:ze[700]}:{main:ze[700],light:ze[500],dark:ze[900]}}function Wa(e="light"){return e==="dark"?{main:Ve[400],light:Ve[300],dark:Ve[700]}:{main:Ve[800],light:Ve[500],dark:Ve[900]}}function Ya(e="light"){return e==="dark"?{main:He[400],light:He[300],dark:He[700]}:{main:"#ed6c02",light:He[500],dark:He[900]}}function Ka(e){const{mode:n="light",contrastThreshold:r=3,tonalOffset:t=.2}=e,o=Ee(e,Ua),a=e.primary||qa(n),s=e.secondary||Ga(n),d=e.error||Xa(n),l=e.info||Ha(n),c=e.success||Wa(n),u=e.warning||Ya(n);function h(m){const f=br(m,On.text.primary)>=r?On.text.primary:yr.text.primary;if(process.env.NODE_ENV!=="production"){const S=br(m,f);S<3&&console.error([`MUI: The contrast ratio of ${S}:1 for ${f} on ${m}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return f}const p=({color:m,name:f,mainShade:S=500,lightShade:K=300,darkShade:P=700})=>{if(m=z({},m),!m.main&&m[S]&&(m.main=m[S]),!m.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${f?` (${f})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${S}\` property.`:Ue(11,f?` (${f})`:"",S));if(typeof m.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${f?` (${f})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Ue(12,f?` (${f})`:"",JSON.stringify(m.main)));return vr(m,"light",K,t),vr(m,"dark",P,t),m.contrastText||(m.contrastText=h(m.main)),m},v={dark:On,light:yr};return process.env.NODE_ENV!=="production"&&(v[n]||console.error(`MUI: The palette mode \`${n}\` is not supported.`)),ve(z({common:z({},Qe),mode:n,primary:p({color:a,name:"primary"}),secondary:p({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:p({color:d,name:"error"}),warning:p({color:u,name:"warning"}),info:p({color:l,name:"info"}),success:p({color:c,name:"success"}),grey:Ma,contrastThreshold:r,getContrastText:h,augmentColor:p,tonalOffset:t},v[n]),o)}const Ja=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Za(e){return Math.round(e*1e5)/1e5}const wr={textTransform:"uppercase"},xr='"Roboto", "Helvetica", "Arial", sans-serif';function Qa(e,n){const r=typeof n=="function"?n(e):n,{fontFamily:t=xr,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:s=400,fontWeightMedium:d=500,fontWeightBold:l=700,htmlFontSize:c=16,allVariants:u,pxToRem:h}=r,p=Ee(r,Ja);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof c!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const v=o/14,y=h||(S=>`${S/c*v}rem`),m=(S,K,P,E,g)=>z({fontFamily:t,fontWeight:S,fontSize:y(K),lineHeight:P},t===xr?{letterSpacing:`${Za(E/K)}em`}:{},g,u),f={h1:m(a,96,1.167,-1.5),h2:m(a,60,1.2,-.5),h3:m(s,48,1.167,0),h4:m(s,34,1.235,.25),h5:m(s,24,1.334,0),h6:m(d,20,1.6,.15),subtitle1:m(s,16,1.75,.15),subtitle2:m(d,14,1.57,.1),body1:m(s,16,1.5,.15),body2:m(s,14,1.43,.15),button:m(d,14,1.75,.4,wr),caption:m(s,12,1.66,.4),overline:m(s,12,2.66,1,wr),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return ve(z({htmlFontSize:c,pxToRem:y,fontFamily:t,fontSize:o,fontWeightLight:a,fontWeightRegular:s,fontWeightMedium:d,fontWeightBold:l},f),p,{clone:!1})}const es=.2,ns=.14,rs=.12;function W(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${es})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${ns})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${rs})`].join(",")}const ts=["none",W(0,2,1,-1,0,1,1,0,0,1,3,0),W(0,3,1,-2,0,2,2,0,0,1,5,0),W(0,3,3,-2,0,3,4,0,0,1,8,0),W(0,2,4,-1,0,4,5,0,0,1,10,0),W(0,3,5,-1,0,5,8,0,0,1,14,0),W(0,3,5,-1,0,6,10,0,0,1,18,0),W(0,4,5,-2,0,7,10,1,0,2,16,1),W(0,5,5,-3,0,8,10,1,0,3,14,2),W(0,5,6,-3,0,9,12,1,0,3,16,2),W(0,6,6,-3,0,10,14,1,0,4,18,3),W(0,6,7,-4,0,11,15,1,0,4,20,3),W(0,7,8,-4,0,12,17,2,0,5,22,4),W(0,7,8,-4,0,13,19,2,0,5,24,4),W(0,7,9,-4,0,14,21,2,0,5,26,4),W(0,8,9,-5,0,15,22,2,0,6,28,5),W(0,8,10,-5,0,16,24,2,0,6,30,5),W(0,8,11,-5,0,17,26,2,0,6,32,5),W(0,9,11,-5,0,18,28,2,0,7,34,6),W(0,9,12,-6,0,19,29,2,0,7,36,6),W(0,10,13,-6,0,20,31,3,0,8,38,7),W(0,10,13,-6,0,21,33,3,0,8,40,7),W(0,10,14,-6,0,22,35,3,0,8,42,7),W(0,11,14,-7,0,23,36,3,0,9,44,8),W(0,11,15,-7,0,24,38,3,0,9,46,8)],os=ts,as=["duration","easing","delay"],ss={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},is={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function kr(e){return`${Math.round(e)}ms`}function cs(e){if(!e)return 0;const n=e/36;return Math.round((4+15*n**.25+n/5)*10)}function ls(e){const n=z({},ss,e.easing),r=z({},is,e.duration);return z({getAutoHeightDuration:cs,create:(o=["all"],a={})=>{const{duration:s=r.standard,easing:d=n.easeInOut,delay:l=0}=a,c=Ee(a,as);if(process.env.NODE_ENV!=="production"){const u=p=>typeof p=="string",h=p=>!isNaN(parseFloat(p));!u(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!h(s)&&!u(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),u(d)||console.error('MUI: Argument "easing" must be a string.'),!h(l)&&!u(l)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(c).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(c).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(u=>`${u} ${typeof s=="string"?s:kr(s)} ${d} ${typeof l=="string"?l:kr(l)}`).join(",")}},e,{easing:n,duration:r})}const ds={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},us=ds,ps=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function fs(e={},...n){const{mixins:r={},palette:t={},transitions:o={},typography:a={}}=e,s=Ee(e,ps);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Ue(18));const d=Ka(t),l=Un(e);let c=ve(l,{mixins:Pa(l.breakpoints,r),palette:d,shadows:os.slice(),typography:Qa(d,a),transitions:ls(o),zIndex:z({},us),applyDarkStyles(u){return this.vars?{[this.getColorSchemeSelector("dark").replace(/(\[[^\]]+\])/,":where($1)")]:u}:this.palette.mode==="dark"?u:{}}});if(c=ve(c,s),c=n.reduce((u,h)=>ve(u,h),c),process.env.NODE_ENV!=="production"){const u=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],h=(p,v)=>{let y;for(y in p){const m=p[y];if(u.indexOf(y)!==-1&&Object.keys(m).length>0){if(process.env.NODE_ENV!=="production"){const f=Dn("",y);console.error([`MUI: The \`${v}\` component increases the CSS specificity of the \`${y}\` internal state.`,"You can not override it like this: ",JSON.stringify(p,null,2),"",`Instead, you need to use the '&.${f}' syntax:`,JSON.stringify({root:{[`&.${f}`]:m}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}p[y]={}}}};Object.keys(c.components).forEach(p=>{const v=c.components[p].styleOverrides;v&&p.indexOf("Mui")===0&&h(v,p)})}return c.unstable_sxConfig=z({},Fn,s==null?void 0:s.unstable_sxConfig),c.unstable_sx=function(h){return Ln({sx:h,theme:this})},c}const hs=fs(),nt=hs,rt="$$material";function ms({props:e,name:n}){return _a({props:e,name:n,defaultTheme:nt,themeId:rt})}const gs=e=>sn(e)&&e!=="classes",bs=Ta({themeId:rt,defaultTheme:nt,rootShouldForwardProp:gs}),ys=bs;function vs(e){return Dn("MuiSvgIcon",e)}ho("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const ws=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],xs=e=>{const{color:n,fontSize:r,classes:t}=e,o={root:["root",n!=="inherit"&&`color${we(n)}`,`fontSize${we(r)}`]};return co(o,vs,t)},ks=ys("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:r}=e;return[n.root,r.color!=="inherit"&&n[`color${we(r.color)}`],n[`fontSize${we(r.fontSize)}`]]}})(({theme:e,ownerState:n})=>{var r,t,o,a,s,d,l,c,u,h,p,v,y;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:n.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(r=e.transitions)==null||(t=r.create)==null?void 0:t.call(r,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((d=e.typography)==null||(l=d.pxToRem)==null?void 0:l.call(d,24))||"1.5rem",large:((c=e.typography)==null||(u=c.pxToRem)==null?void 0:u.call(c,35))||"2.1875rem"}[n.fontSize],color:(h=(p=(e.vars||e).palette)==null||(p=p[n.color])==null?void 0:p.main)!=null?h:{action:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.active,disabled:(y=(e.vars||e).palette)==null||(y=y.action)==null?void 0:y.disabled,inherit:void 0}[n.color]}}),Gn=Y.forwardRef(function(n,r){const t=ms({props:n,name:"MuiSvgIcon"}),{children:o,className:a,color:s="inherit",component:d="svg",fontSize:l="medium",htmlColor:c,inheritViewBox:u=!1,titleAccess:h,viewBox:p="0 0 24 24"}=t,v=Ee(t,ws),y=Y.isValidElement(o)&&o.type==="svg",m=z({},t,{color:s,component:d,fontSize:l,instanceFontSize:n.fontSize,inheritViewBox:u,viewBox:p,hasSvgAsChild:y}),f={};u||(f.viewBox=p);const S=xs(m);return i.jsxs(ks,z({as:d,className:Cr(S.root,a),focusable:"false",color:c,"aria-hidden":h?void 0:!0,role:h?"img":void 0,ref:r},f,v,y&&o.props,{ownerState:m,children:[y?o.props.children:o,h?i.jsx("title",{children:h}):null]}))});process.env.NODE_ENV!=="production"&&(Gn.propTypes={children:X.node,classes:X.object,className:X.string,color:X.oneOfType([X.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),X.string]),component:X.elementType,fontSize:X.oneOfType([X.oneOf(["inherit","large","medium","small"]),X.string]),htmlColor:X.string,inheritViewBox:X.bool,shapeRendering:X.string,sx:X.oneOfType([X.arrayOf(X.oneOfType([X.func,X.object,X.bool])),X.func,X.object]),titleAccess:X.string,viewBox:X.string});Gn.muiName="SvgIcon";const Sr=Gn;function Ss(e,n){function r(t,o){return i.jsx(Sr,z({"data-testid":`${n}Icon`,ref:o},t,{children:e}))}return process.env.NODE_ENV!=="production"&&(r.displayName=`${n}Icon`),r.muiName=Sr.muiName,Y.memo(Y.forwardRef(r))}const Cs=Ss(i.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Es({menu:e,dataHandler:n,commandHandler:r,className:t,id:o,children:a}){const[s,d]=D.useState(!1),[l,c]=D.useState(!1),u=D.useCallback(()=>{s&&d(!1),c(!1)},[s]),h=D.useCallback(S=>{S.stopPropagation(),d(K=>{const P=!K;return P&&S.shiftKey?c(!0):P||c(!1),P})},[]),p=D.useRef(void 0),[v,y]=D.useState(0);D.useEffect(()=>{s&&p.current&&y(p.current.clientHeight)},[s]);const m=D.useCallback(S=>(u(),r(S)),[r,u]);let f=e;return!f&&n&&(f=n(l)),i.jsx("div",{ref:p,style:{position:"relative"},children:i.jsx(ae.AppBar,{position:"static",id:o,children:i.jsxs(ae.Toolbar,{className:`papi-toolbar ${t??""}`,variant:"dense",children:[f?i.jsx(ae.IconButton,{edge:"start",className:`papi-menuButton ${t??""}`,color:"inherit","aria-label":"open drawer",onClick:h,children:i.jsx(Cs,{})}):void 0,a?i.jsx("div",{className:"papi-menu-children",children:a}):void 0,f?i.jsx(ae.Drawer,{className:`papi-menu-drawer ${t??""}`,anchor:"left",variant:"persistent",open:s,onClose:u,PaperProps:{className:"papi-menu-drawer-paper",style:{top:v}},children:i.jsx(qr,{commandHandler:m,columns:f.columns})}):void 0]})})})}const Ts=(e,n)=>{D.useEffect(()=>{if(!e)return()=>{};const r=e(n);return()=>{r()}},[e,n])};function Ns(e){return{preserveValue:!0,...e}}const tt=(e,n,r={})=>{const t=D.useRef(n);t.current=n;const o=D.useRef(r);o.current=Ns(o.current);const[a,s]=D.useState(()=>t.current),[d,l]=D.useState(!0);return D.useEffect(()=>{let c=!0;return l(!!e),(async()=>{if(e){const u=await e();c&&(s(()=>u),l(!1))}})(),()=>{c=!1,o.current.preserveValue||s(()=>t.current)}},[e]),[a,d]},Rn=()=>!1,_s=(e,n)=>{const[r]=tt(D.useCallback(async()=>{if(!e)return Rn;const t=await Promise.resolve(e(n));return async()=>t()},[n,e]),Rn,{preserveValue:!1});D.useEffect(()=>()=>{r!==Rn&&r()},[r])};exports.BookChapterControl=Mt;exports.Button=je;exports.ChapterRangeSelector=Bt;exports.Checkbox=Lr;exports.ComboBox=ln;exports.GridMenu=qr;exports.IconButton=zt;exports.LabelPosition=$e;exports.MenuItem=Ur;exports.RefSelector=Vt;exports.SearchBar=Ft;exports.Slider=Lt;exports.Snackbar=Ut;exports.Switch=qt;exports.Table=Xt;exports.TextField=Ze;exports.Toolbar=Es;exports.useEvent=Ts;exports.useEventAsync=_s;exports.usePromise=tt;function Os(e,n="top"){if(!e||typeof document>"u")return;const r=document.head||document.querySelector("head"),t=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),n==="top"&&t?r.insertBefore(o,t):r.appendChild(o)}Os(`.papi-button {
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
}
.papi-menu-item {
  line-height: 0.8;
}

.papi-menu-item.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-menu-item.paratext.bright {
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
.papi-multi-column-menu {
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  padding-left: 3px;
  padding-right: 3px;
}

.papi-menu {
  background-color: rgb(145, 145, 145);
  font-size: 11pt;
  font-weight: 600;
  margin-top: 1px;
  padding-bottom: 2px;
  padding-left: 24px;
  padding-top: 2px;
}
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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

.papi-menu-children {
  padding: 10px;
  position: relative;
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
.paratext {
  background-color: darkgreen;
  color: greenyellow;
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
.pr-mr-2 {
    margin-right: 0.5rem;
}
.pr-mr-2\\.5 {
    margin-right: 0.625rem;
}
.pr-box-border {
    box-sizing: border-box;
}
.pr-block {
    display: block;
}
.pr-flex {
    display: flex;
}
.pr-grid {
    display: grid;
}
.pr-aspect-square {
    aspect-ratio: 1 / 1;
}
.pr-h-10 {
    height: 2.5rem;
}
.pr-h-2 {
    height: 0.5rem;
}
.pr-h-2\\.5 {
    height: 0.625rem;
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
.pr-w-0\\.5 {
    width: 0.125rem;
}
.pr-w-2 {
    width: 0.5rem;
}
.pr-w-2\\.5 {
    width: 0.625rem;
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
.pr-w-full {
    width: 100%;
}
.pr-min-w-\\[8rem\\] {
    min-width: 8rem;
}
.pr-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
    min-width: var(--radix-select-trigger-width);
}
.pr-grow {
    flex-grow: 1;
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
.pr-flex-wrap {
    flex-wrap: wrap;
}
.pr-content-start {
    align-content: flex-start;
}
.pr-items-start {
    align-items: flex-start;
}
.pr-items-center {
    align-items: center;
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
.pr-gap-2 {
    gap: 0.5rem;
}
.pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
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
.pr-rounded {
    border-radius: 0.25rem;
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
.pr-border-2 {
    border-width: 2px;
}
.pr-border-input {
    border-color: hsl(var(--input));
}
.pr-border-primary {
    border-color: hsl(var(--primary));
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
.pr-pl-8 {
    padding-left: 2rem;
}
.pr-pr-2 {
    padding-right: 0.5rem;
}
.pr-font-sans {
    font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.pr-text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
}
.pr-text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
}
.pr-font-normal {
    font-weight: 400;
}
.pr-font-semibold {
    font-weight: 600;
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
.pr-text-current {
    color: currentColor;
}
.pr-text-popover-foreground {
    color: hsl(var(--popover-foreground));
}
.pr-text-primary {
    color: hsl(var(--primary));
}
.pr-text-slate-700 {
    --tw-text-opacity: 1;
    color: rgb(51 65 85 / var(--tw-text-opacity));
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
.hover\\:pr-bg-amber-200:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(253 230 138 / var(--tw-bg-opacity));
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
.\\[\\&\\>span\\]\\:pr-line-clamp-1>span {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}@layer rdg.MeasuringCell {.m1l09lto7-0-0-beta-34 {
    contain: strict;
    grid-row: 1;
    visibility: hidden
}
  }


@layer rdg.Cell {.c1wupbe7-0-0-beta-34 {
    /* max-content does not work with size containment
     * dynamically switching between different containment styles incurs a heavy relayout penalty
     * Chromium bug: at odd zoom levels or subpixel positioning, layout/paint containment can make cell borders disappear
     *   https://bugs.chromium.org/p/chromium/issues/detail?id=1326946
     */
    contain: style;
    position: relative; /* needed for absolute positioning to work */
    padding-block: 0;
    padding-inline: 8px;
    border-inline-end: 1px solid var(--rdg-border-color);
    border-block-end: 1px solid var(--rdg-border-color);
    grid-row-start: var(--rdg-grid-row-start);
    background-color: inherit;

    white-space: nowrap;
    overflow: hidden;
    overflow: clip;
    text-overflow: ellipsis;
    outline: none
}

    .c1wupbe7-0-0-beta-34[aria-selected='true'] {
      outline: 2px solid var(--rdg-selection-color);
      outline-offset: -2px;
    }

.cd0kgiy7-0-0-beta-34 {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1
}

.c1730fa47-0-0-beta-34 {
    box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3)
}
  }


@layer rdg.CheckboxLabel {.c1hs68w07-0-0-beta-34 {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    margin-inline-end: 1px /* align checkbox in row group cell */
}
  }

@layer rdg.CheckboxInput {

.cojpd0n7-0-0-beta-34 {
    all: unset
}
  }

@layer rdg.CheckboxIcon {

.cwsfieb7-0-0-beta-34 {
    content: '';
    inline-size: 20px;
    block-size: 20px;
    border: 2px solid var(--rdg-border-color);
    background-color: var(--rdg-background-color)
}

    .cojpd0n7-0-0-beta-34:checked + .cwsfieb7-0-0-beta-34 {
      background-color: var(--rdg-checkbox-color);
      outline: 4px solid var(--rdg-background-color);
      outline-offset: -6px;
    }

    .cojpd0n7-0-0-beta-34:focus + .cwsfieb7-0-0-beta-34 {
      border-color: var(--rdg-checkbox-focus-color);
    }
  }

@layer rdg.CheckboxLabel {

.c1fgadbl7-0-0-beta-34 {
    cursor: default
}

    .c1fgadbl7-0-0-beta-34 .cwsfieb7-0-0-beta-34 {
      border-color: var(--rdg-checkbox-disabled-border-color);
      background-color: var(--rdg-checkbox-disabled-background-color);
    }
  }


@layer rdg.GroupCellContent {.g1w3c5217-0-0-beta-34 {
    outline: none
}
  }

@layer rdg.GroupCellCaret {

.cm5tyhw7-0-0-beta-34 {
    margin-inline-start: 4px;
    stroke: currentColor;
    stroke-width: 1.5px;
    fill: transparent;
    vertical-align: middle
}

    .cm5tyhw7-0-0-beta-34 > path {
      transition: d 0.1s;
    }
  }


@layer rdg.DragHandle {.cadd3bp7-0-0-beta-34 {
    cursor: move;
    position: absolute;
    inset-inline-end: 0;
    inset-block-end: 0;
    inline-size: 8px;
    block-size: 8px;
    background-color: var(--rdg-selection-color)
}

    .cadd3bp7-0-0-beta-34:hover {
      inline-size: 16px;
      block-size: 16px;
      border: 2px solid var(--rdg-selection-color);
      background-color: var(--rdg-background-color);
    }
  }


@layer rdg.EditCell {.c1tngyp17-0-0-beta-34 {
    padding: 0
}
  }


@layer rdg.Row {.r1otpg647-0-0-beta-34 {
    display: contents;
    line-height: var(--rdg-row-height);
    background-color: var(--rdg-background-color)
}

    .r1otpg647-0-0-beta-34:hover {
      background-color: var(--rdg-row-hover-background-color);
    }

    .r1otpg647-0-0-beta-34[aria-selected='true'] {
      background-color: var(--rdg-row-selected-background-color);
    }

      .r1otpg647-0-0-beta-34[aria-selected='true']:hover {
        background-color: var(--rdg-row-selected-hover-background-color);
      }
  }

@layer rdg.FocusSink {

.rel5gk27-0-0-beta-34 {
    outline: 2px solid var(--rdg-selection-color);
    outline-offset: -2px
}
    .r1qymf1z7-0-0-beta-34::before {
      content: '';
      display: inline-block;
      height: 100%;
      position: sticky;
      inset-inline-start: 0;
      border-inline-start: 2px solid var(--rdg-selection-color);
    }
  }


@layer rdg.GroupedRow {
    .gyxx7e97-0-0-beta-34:not([aria-selected='true']) {
      background-color: var(--rdg-header-background-color);
    }

    .gyxx7e97-0-0-beta-34 > .c1wupbe7-0-0-beta-34:not(:last-child):not(.c1730fa47-0-0-beta-34) {
      border-inline-end: none;
    }
  }


@layer rdg.SortableHeaderCell {.hizp7y17-0-0-beta-34 {
    cursor: pointer;
    display: flex
}

    .hizp7y17-0-0-beta-34:focus {
      outline: none;
    }
  }

@layer rdg.SortableHeaderCellName {

.h14cojrm7-0-0-beta-34 {
    flex-grow: 1;
    overflow: hidden;
    overflow: clip;
    text-overflow: ellipsis
}
  }


@layer rdg.HeaderCell {.celq7o97-0-0-beta-34 {
    touch-action: none
}

    .celq7o97-0-0-beta-34::after {
      content: '';
      cursor: col-resize;
      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      inset-block-end: 0;
      inline-size: 10px;
    }
  }


@layer rdg.HeaderRow {.h197vzie7-0-0-beta-34 {
    display: contents;
    line-height: var(--rdg-header-row-height);
    background-color: var(--rdg-header-background-color);
    font-weight: bold
}

    .h197vzie7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      /* Should have a higher value than 0 to show up above regular cells */
      z-index: 1;
      position: sticky;
      inset-block-start: 0;
    }

    .h197vzie7-0-0-beta-34 > .cd0kgiy7-0-0-beta-34 {
      z-index: 2;
    }
  }


@layer rdg.Cell {.ccpfvsn7-0-0-beta-34 {
    background-color: #ccccff
}

.c1bmg16t7-0-0-beta-34 {
    background-color: #ccccff
}

    .c1bmg16t7-0-0-beta-34.ccpfvsn7-0-0-beta-34 {
      background-color: #9999ff;
    }
  }


@layer rdg.SortIcon {.a1mygwml7-0-0-beta-34 {
    fill: currentColor
}

    .a1mygwml7-0-0-beta-34 > path {
      transition: d 0.1s;
    }
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

    @layer Defaults {
      .r104f42s7-0-0-beta-34 *,
      .r104f42s7-0-0-beta-34 *::before,
      .r104f42s7-0-0-beta-34 *::after {
        box-sizing: inherit;
      }
    }

    @layer Root {.r104f42s7-0-0-beta-34 {
      --rdg-color: #000;   --rdg-border-color: #ddd;   --rdg-summary-border-color: #aaa;   --rdg-background-color: hsl(0deg 0% 100%);   --rdg-header-background-color: hsl(0deg 0% 97.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 96%);   --rdg-row-selected-background-color: hsl(207deg 76% 92%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 88%);   --rdg-checkbox-color: hsl(207deg 100% 29%);   --rdg-checkbox-focus-color: hsl(207deg 100% 69%);   --rdg-checkbox-disabled-border-color: #ccc;   --rdg-checkbox-disabled-background-color: #ddd;
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
      font-size: var(--rdg-font-size)

      /* needed on Firefox */
}
      .r104f42s7-0-0-beta-34::before {
        content: '';
        grid-column: 1/-1;
        grid-row: 1/-1;
      }

      .r104f42s7-0-0-beta-34.rdg-dark {
        --rdg-color-scheme: dark;
        --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
      }

      .r104f42s7-0-0-beta-34.rdg-light {
        --rdg-color-scheme: light;
      }

      @media (prefers-color-scheme: dark) {
        .r104f42s7-0-0-beta-34:not(.rdg-light) {
          --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
        }
      }
    }
  }

@layer rdg.Root {

.v7ly7s7-0-0-beta-34 {
    user-select: none
}

    .v7ly7s7-0-0-beta-34 .r1otpg647-0-0-beta-34 {
      cursor: move;
    }
  }

@layer rdg.FocusSink {

.fc4f4zb7-0-0-beta-34 {
    grid-column: 1/-1;
    pointer-events: none;
    /* Should have a higher value than 2 to show up above header row */
    z-index: 3
}
  }


@layer rdg.SummaryCell {.s1n3hxke7-0-0-beta-34 {
    inset-block-start: var(--rdg-summary-row-top);
    inset-block-end: var(--rdg-summary-row-bottom)
}
  }


@layer rdg.SummaryRow {.snfqesz7-0-0-beta-34 {
    line-height: var(--rdg-summary-row-height)
}

    .snfqesz7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      position: sticky;
    }
    .t1jijrjz7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      z-index: 1;
    }

    .t1jijrjz7-0-0-beta-34 > .cd0kgiy7-0-0-beta-34 {
      z-index: 2;
    }
    .t14bmecc7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
    .b1odhhml7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      border-block-start: 2px solid var(--rdg-summary-border-color);
    }
  }


@layer rdg.TextEditor {.tlmcuo07-0-0-beta-34 {
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
    font-size: var(--rdg-font-size)
}

    .tlmcuo07-0-0-beta-34:focus {
      border-color: var(--rdg-selection-color);
      outline: none;
    }

    .tlmcuo07-0-0-beta-34::placeholder {
      color: #999;
      opacity: 1;
    }
  }

.selected {
  color: #78350F;
  background-color: #FFFBEB;
}

.ot {
  background-color: #FCA5A5;
}

.nt {
  background-color: #E9D5FF;
}

.dc {
  background-color: #C7D2FE;
}
`,"top");
//# sourceMappingURL=index.cjs.map
