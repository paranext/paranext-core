"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const b=require("react/jsx-runtime"),I=require("react"),dl=require("platform-bible-utils"),ss=require("@radix-ui/react-dropdown-menu"),ke=require("lucide-react"),Te=require("clsx"),pl=require("tailwind-merge"),fl=require("@radix-ui/react-slot"),as=require("class-variance-authority"),ve=require("@mui/material"),Gr=require("@mui/styled-engine"),cn=require("react-dom"),gl=require("@radix-ui/react-label"),oi=require("react-data-grid"),ml=require("@radix-ui/react-select"),hl=require("@radix-ui/react-tabs");function Wt(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const C=Wt(I),me=Wt(ss),vl=Wt(cn),ls=Wt(gl),xe=Wt(ml),je=Wt(hl);var bl=Object.defineProperty,yl=(e,t,n)=>t in e?bl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ie=(e,t,n)=>(yl(e,typeof t!="symbol"?t+"":t,n),n);const kt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],co=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],cs=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],ii=Ol();function Xt(e,t=!0){return t&&(e=e.toUpperCase()),e in ii?ii[e]:0}function uo(e){return Xt(e)>0}function wl(e){const t=typeof e=="string"?Xt(e):e;return t>=40&&t<=66}function xl(e){return(typeof e=="string"?Xt(e):e)<=39}function us(e){return e<=66}function Sl(e){const t=typeof e=="string"?Xt(e):e;return fs(t)&&!us(t)}function*Cl(){for(let e=1;e<=kt.length;e++)yield e}const El=1,ds=kt.length;function Rl(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function po(e,t="***"){const n=e-1;return n<0||n>=kt.length?t:kt[n]}function ps(e){return e<=0||e>ds?"******":cs[e-1]}function kl(e){return ps(Xt(e))}function fs(e){const t=typeof e=="number"?po(e):e;return uo(t)&&!co.includes(t)}function Tl(e){const t=typeof e=="number"?po(e):e;return uo(t)&&co.includes(t)}function Pl(e){return cs[e-1].includes("*obsolete*")}function Ol(){const e={};for(let t=0;t<kt.length;t++)e[kt[t]]=t+1;return e}const ge={allBookIds:kt,nonCanonicalIds:co,bookIdToNumber:Xt,isBookIdValid:uo,isBookNT:wl,isBookOT:xl,isBookOTNT:us,isBookDC:Sl,allBookNumbers:Cl,firstBook:El,lastBook:ds,extraBooks:Rl,bookNumberToId:po,bookNumberToEnglishName:ps,bookIdToEnglishName:kl,isCanonical:fs,isExtraMaterial:Tl,isObsolete:Pl};var pt=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(pt||{});const Fe=class{constructor(t){if(ie(this,"name"),ie(this,"fullPath"),ie(this,"isPresent"),ie(this,"hasVerseSegments"),ie(this,"isCustomized"),ie(this,"baseVersification"),ie(this,"scriptureBooks"),ie(this,"_type"),t!=null)typeof t=="string"?this.name=t:this._type=t;else throw new Error("Argument null")}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ie(Fe,"Original",new Fe(pt.Original)),ie(Fe,"Septuagint",new Fe(pt.Septuagint)),ie(Fe,"Vulgate",new Fe(pt.Vulgate)),ie(Fe,"English",new Fe(pt.English)),ie(Fe,"RussianProtestant",new Fe(pt.RussianProtestant)),ie(Fe,"RussianOrthodox",new Fe(pt.RussianOrthodox));let Ft=Fe;function si(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var gs=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(gs||{});const $e=class le{constructor(t,n,r,o){if(ie(this,"firstChapter"),ie(this,"lastChapter"),ie(this,"lastVerse"),ie(this,"hasSegmentsDefined"),ie(this,"text"),ie(this,"BBBCCCVVVS"),ie(this,"longHashCode"),ie(this,"versification"),ie(this,"rtlMark","‏"),ie(this,"_bookNum",0),ie(this,"_chapterNum",0),ie(this,"_verseNum",0),ie(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,s=n!=null&&n instanceof Ft?n:void 0;this.setEmpty(s),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof Ft?n:void 0;this.setEmpty(i),this._verseNum=t%le.chapterDigitShifter,this._chapterNum=Math.floor(t%le.bookDigitShifter/le.chapterDigitShifter),this._bookNum=Math.floor(t/le.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof le){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof Ft?t:le.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??le.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(t,n=le.defaultVersification){const r=new le(n);return r.parse(t),r}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=le.parse(t),{success:!0,verseRef:n}}catch(r){if(r instanceof tn)return n=new le,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%le.bcvMaxValue*le.bookDigitShifter+(n>=0?n%le.bcvMaxValue*le.chapterDigitShifter:0)+(r>=0?r%le.bcvMaxValue:0)}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>le.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(le.verseRangeSeparator)||this._verse.includes(le.verseSequenceIndicator))}get book(){return ge.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=ge.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=le.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=le.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>ge.lastBook)throw new tn("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Ft(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(le.verseRangeSeparators,le.verseSequenceIndicators)}get BBBCCC(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const s=+i[1].trim();this.versification=new Ft(pt[s])}catch{throw new tn("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new tn("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||ge.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!le.isVerseParseable(r[1]))throw new tn("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new le(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}equals(t){return t instanceof le?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification):!1}allVerses(t=!1,n=le.verseRangeSeparators,r=le.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=si(this._verse,r);for(const s of i.map(a=>si(a,n))){const a=this.clone();a.verse=s[0];const c=a.verseNum;if(o.push(a),s.length>1){const u=this.clone();if(u.verse=s[1],!t)for(let d=c+1;d<u.verseNum;d++){const g=new le(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(g)}o.push(u)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ge.lastBook?2:(ge.isCanonical(this._bookNum),0)}setEmpty(t=le.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=ge.bookIdToNumber(t),this.chapter=n,this.verse=r}};ie($e,"defaultVersification",Ft.English),ie($e,"verseRangeSeparator","-"),ie($e,"verseSequenceIndicator",","),ie($e,"verseRangeSeparators",[$e.verseRangeSeparator]),ie($e,"verseSequenceIndicators",[$e.verseSequenceIndicator]),ie($e,"chapterDigitShifter",1e3),ie($e,"bookDigitShifter",$e.chapterDigitShifter*$e.chapterDigitShifter),ie($e,"bcvMaxValue",$e.chapterDigitShifter-1),ie($e,"ValidStatusType",gs);class tn extends Error{}function re(...e){return pl.twMerge(Te.clsx(e))}const fo=me.Root,ms=me.Trigger,_l=me.Group,Nl=me.Portal,$l=me.Sub,Ml=me.RadioGroup,hs=I.forwardRef(({className:e,inset:t,children:n,...r},o)=>b.jsxs(me.SubTrigger,{ref:o,className:re("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,b.jsx(ke.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));hs.displayName=me.SubTrigger.displayName;const vs=I.forwardRef(({className:e,...t},n)=>b.jsx(me.SubContent,{ref:n,className:re("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));vs.displayName=me.SubContent.displayName;const rr=I.forwardRef(({className:e,sideOffset:t=4,...n},r)=>b.jsx(me.Portal,{children:b.jsx(me.Content,{ref:r,sideOffset:t,className:re("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));rr.displayName=me.Content.displayName;const go=I.forwardRef(({className:e,inset:t,...n},r)=>b.jsx(me.Item,{ref:r,className:re("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));go.displayName=me.Item.displayName;const mo=I.forwardRef(({className:e,children:t,checked:n,...r},o)=>b.jsxs(me.CheckboxItem,{ref:o,className:re("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[b.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:b.jsx(me.ItemIndicator,{children:b.jsx(ke.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));mo.displayName=me.CheckboxItem.displayName;const bs=I.forwardRef(({className:e,children:t,...n},r)=>b.jsxs(me.RadioItem,{ref:r,className:re("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[b.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:b.jsx(me.ItemIndicator,{children:b.jsx(ke.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));bs.displayName=me.RadioItem.displayName;const En=I.forwardRef(({className:e,inset:t,...n},r)=>b.jsx(me.Label,{ref:r,className:re("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));En.displayName=me.Label.displayName;const or=I.forwardRef(({className:e,...t},n)=>b.jsx(me.Separator,{ref:n,className:re("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));or.displayName=me.Separator.displayName;function ys({className:e,...t}){return b.jsx("span",{className:re("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}ys.displayName="DropdownMenuShortcut";const ir=I.forwardRef(({className:e,type:t,...n},r)=>b.jsx("input",{type:t,className:re("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));ir.displayName="Input";const Il=I.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},i)=>b.jsxs("div",{className:"pr-relative",children:[b.jsx(ir,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r(),t(s)},onClick:n,ref:i}),b.jsx(ke.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function jl({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const i=Array.from({length:t},(a,c)=>c+1),s=I.useCallback(a=>{o(a)},[o]);return b.jsx("div",{className:re("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:i.map(a=>b.jsx("div",{className:re("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":a===n,"pr-bg-amber-200":a===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(a)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(a)},tabIndex:0,onMouseMove:()=>s(a),children:a},a))})}const Dl=I.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:i,children:s},a)=>b.jsxs(go,{ref:a,textValue:e,className:re("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[b.jsx("span",{className:re("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":i.toLowerCase()==="ot","pr-border-l-purple-200":i.toLowerCase()==="nt","pr-border-l-indigo-200":i.toLowerCase()==="dc"}),children:ge.bookIdToEnglishName(e)}),n&&b.jsx("div",{children:s})]},e));function Al({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return b.jsxs(En,{className:"pr-flex pr-justify-between",children:[b.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),b.jsxs("div",{className:"pr-flex pr-items-center",children:[b.jsx(ke.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),b.jsx(ke.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),b.jsx(ke.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const fn=ge.allBookIds,Fl={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ai=["OT","NT","DC"],Vl=32+32+32,Ll=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Bl=e=>({OT:fn.filter(n=>ge.isBookOT(n)),NT:fn.filter(n=>ge.isBookNT(n)),DC:fn.filter(n=>ge.isBookDC(n))})[e],nn=e=>dl.getChaptersForBook(ge.bookIdToNumber(e));function zl(){return fn.map(t=>ge.bookIdToEnglishName(t))}function Hl(e){return zl().includes(e)}function Gl(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(Hl(t))return fn.find(r=>ge.bookIdToEnglishName(r)===t)}function Ul({scrRef:e,handleSubmit:t}){const[n,r]=I.useState(""),[o,i]=I.useState(ge.bookNumberToId(e.bookNum)),[s,a]=I.useState(e.chapterNum??0),[c,u]=I.useState(ge.bookNumberToId(e.bookNum)),[d,g]=I.useState(!1),[f,p]=I.useState(d),h=I.useRef(void 0),m=I.useRef(void 0),v=I.useRef(void 0),w=I.useCallback(T=>Bl(T).filter($=>{const N=ge.bookIdToEnglishName($).toLowerCase(),L=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return N.includes(L)||$.toLowerCase().includes(L)}),[n]),P=T=>{r(T)},x=I.useRef(!1),S=I.useCallback(T=>{if(x.current){x.current=!1;return}g(T)},[]),y=I.useCallback((T,$,N,L)=>{if(a(ge.bookNumberToId(e.bookNum)!==T?1:e.chapterNum),$||nn(T)===-1){t({bookNum:ge.bookIdToNumber(T),chapterNum:N||1,verseNum:L||1}),g(!1),r("");return}i(o!==T?T:""),g(!$)},[t,e.bookNum,e.chapterNum,o]),k=T=>{T<=0||T>nn(o)||y(o,!0,T)},O=I.useCallback(()=>{Ll.forEach(T=>{const $=n.match(T);if($){const[N,L=void 0,A=void 0]=$.slice(1),M=Gl(N);(ge.isBookIdValid(N)||M)&&y(M??N,!0,L?parseInt(L,10):1,A?parseInt(A,10):1)}})},[y,n]),F=I.useCallback(T=>{d?(T.key==="ArrowDown"||T.key==="ArrowUp")&&(typeof v<"u"&&v.current!==null?v.current.focus():typeof m<"u"&&m.current!==null&&m.current.focus(),T.preventDefault()):g(!0)},[d]),V=T=>{const{key:$}=T;$==="ArrowRight"||$==="ArrowLeft"||$==="ArrowDown"||$==="ArrowUp"||$==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:$})),h.current.focus())},B=T=>{const{key:$}=T;if(c===o){if($==="Enter"){T.preventDefault(),y(o,!0,s);return}let N=0;if($==="ArrowRight")if(s<nn(c))N=1;else{T.preventDefault();return}else if($==="ArrowLeft")if(s>1)N=-1;else{T.preventDefault();return}else $==="ArrowDown"?N=6:$==="ArrowUp"&&(N=-6);s+N<=0||s+N>nn(c)?a(0):N!==0&&(a(s+N),T.preventDefault())}};return I.useEffect(()=>{o===c?o===ge.bookNumberToId(e.bookNum)?a(e.chapterNum):a(1):a(0)},[c,e.bookNum,e.chapterNum,o]),I.useLayoutEffect(()=>{p(d)},[d]),I.useLayoutEffect(()=>{const T=setTimeout(()=>{if(f&&m.current&&v.current){const N=v.current.offsetTop-Vl;m.current.scrollTo({top:N,behavior:"instant"})}},10);return()=>{clearTimeout(T)}},[f]),b.jsx("div",{children:b.jsxs(fo,{modal:!1,open:d,onOpenChange:S,children:[b.jsx(ms,{asChild:!0,children:b.jsx(Il,{ref:h,value:n,handleSearch:P,handleKeyDown:F,handleOnClick:()=>{i(ge.bookNumberToId(e.bookNum)),u(ge.bookNumberToId(e.bookNum)),a(e.chapterNum>0?e.chapterNum:0),g(!0),h.current.focus()},onFocus:()=>{x.current=!0},handleSubmit:O,placeholder:`${ge.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),b.jsxs(rr,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:V,align:"start",ref:m,children:[b.jsx(Al,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),ai.map((T,$)=>w(T).length>0&&b.jsxs("div",{children:[b.jsx(En,{className:"pr-font-semibold pr-text-slate-700",children:Fl[T]}),w(T).map(N=>b.jsx("div",{children:b.jsx(Dl,{bookId:N,handleSelectBook:()=>y(N,!1),isSelected:o===N,handleHighlightBook:()=>u(N),handleKeyDown:B,bookType:T,ref:L=>{o===N&&(v.current=L)},children:b.jsx(jl,{handleSelectChapter:k,endChapter:nn(N),activeChapter:e.bookNum===ge.bookIdToNumber(N)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:L=>{a(L)}})})},N)),ai.length-1!==$?b.jsx(or,{}):void 0]},T))]})]})})}const ql=as.cva("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),ot=I.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},i)=>{const s=r?fl.Slot:"button";return b.jsx(s,{className:re(ql({variant:t,size:n,className:e})),ref:i,...o})});ot.displayName="Button";function Wl({id:e,isDisabled:t=!1,className:n,onClick:r,onContextMenu:o,children:i}){return b.jsx(ot,{id:e,disabled:t,className:re("papi-button",n),onClick:r,onContextMenu:o,children:i})}function Ur({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:s,options:a=[],className:c,value:u,onChange:d,onFocus:g,onBlur:f,getOptionLabel:p}){return b.jsx(ve.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:i,options:a,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:u,onChange:d,onFocus:g,onBlur:f,getOptionLabel:p,renderInput:h=>b.jsx(ve.TextField,{...h,error:o,fullWidth:i,disabled:n,label:t,style:{width:s}})})}function Xl({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,i]=I.useState(1),[s,a]=I.useState(r),[c,u]=I.useState(Array.from({length:r},(f,p)=>p+1));I.useEffect(()=>{i(1),e(1),a(r),t(r),u(Array.from({length:r},(f,p)=>p+1))},[r,t,e]);const d=(f,p)=>{i(p),e(p),p>s&&(a(p),t(p))},g=(f,p)=>{a(p),t(p),p<o&&(i(p),e(p))};return b.jsxs(b.Fragment,{children:[b.jsx(ve.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:b.jsx(Ur,{onChange:(f,p)=>d(f,p),className:"book-selection-chapter",isClearable:!1,options:c,getOptionLabel:f=>f.toString(),value:o,isDisabled:n},"start chapter"),label:"Chapters",labelPlacement:"start"}),b.jsx(ve.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:b.jsx(Ur,{onChange:(f,p)=>g(f,p),className:"book-selection-chapter",isClearable:!1,options:c,getOptionLabel:f=>f.toString(),value:s,isDisabled:n},"end chapter"),label:"to",labelPlacement:"start"})]})}var Ct=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Ct||{});function ho({id:e,isChecked:t,labelText:n="",labelPosition:r=Ct.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:s=!1,hasError:a=!1,className:c,onChange:u}){const d=b.jsx(ve.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:s,className:`papi-checkbox ${a?"error":""} ${c??""}`,onChange:u});let g;if(n){const f=r===Ct.Before||r===Ct.Above,p=b.jsx("span",{className:`papi-checkbox-label ${a?"error":""} ${c??""}`,children:n}),h=r===Ct.Before||r===Ct.After,m=h?p:b.jsx("div",{children:p}),v=h?d:b.jsx("div",{children:d});g=b.jsxs(ve.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:a,children:[f&&m,v,!f&&m]})}else g=d;return g}function Yl({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:i,createLabel:s}){return b.jsxs("fieldset",{id:e,className:t,children:[n&&b.jsx("legend",{children:n}),r.map(a=>b.jsx(ho,{className:"check-item",isChecked:o.includes(a),labelText:s?s(a):a,onChange:()=>i(a)},a))]})}function fe(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function E(){return E=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},E.apply(this,arguments)}function Kl(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Jl(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var qr={exports:{}},jn={exports:{}},ce={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var li;function Zl(){if(li)return ce;li=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,a=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,g=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,p=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,v=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,P=e?Symbol.for("react.scope"):60119;function x(y){if(typeof y=="object"&&y!==null){var k=y.$$typeof;switch(k){case t:switch(y=y.type,y){case c:case u:case r:case i:case o:case g:return y;default:switch(y=y&&y.$$typeof,y){case a:case d:case h:case p:case s:return y;default:return k}}case n:return k}}}function S(y){return x(y)===u}return ce.AsyncMode=c,ce.ConcurrentMode=u,ce.ContextConsumer=a,ce.ContextProvider=s,ce.Element=t,ce.ForwardRef=d,ce.Fragment=r,ce.Lazy=h,ce.Memo=p,ce.Portal=n,ce.Profiler=i,ce.StrictMode=o,ce.Suspense=g,ce.isAsyncMode=function(y){return S(y)||x(y)===c},ce.isConcurrentMode=S,ce.isContextConsumer=function(y){return x(y)===a},ce.isContextProvider=function(y){return x(y)===s},ce.isElement=function(y){return typeof y=="object"&&y!==null&&y.$$typeof===t},ce.isForwardRef=function(y){return x(y)===d},ce.isFragment=function(y){return x(y)===r},ce.isLazy=function(y){return x(y)===h},ce.isMemo=function(y){return x(y)===p},ce.isPortal=function(y){return x(y)===n},ce.isProfiler=function(y){return x(y)===i},ce.isStrictMode=function(y){return x(y)===o},ce.isSuspense=function(y){return x(y)===g},ce.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===r||y===u||y===i||y===o||y===g||y===f||typeof y=="object"&&y!==null&&(y.$$typeof===h||y.$$typeof===p||y.$$typeof===s||y.$$typeof===a||y.$$typeof===d||y.$$typeof===v||y.$$typeof===w||y.$$typeof===P||y.$$typeof===m)},ce.typeOf=x,ce}var ue={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ci;function Ql(){return ci||(ci=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,a=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,g=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,p=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,v=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,P=e?Symbol.for("react.scope"):60119;function x(j){return typeof j=="string"||typeof j=="function"||j===r||j===u||j===i||j===o||j===g||j===f||typeof j=="object"&&j!==null&&(j.$$typeof===h||j.$$typeof===p||j.$$typeof===s||j.$$typeof===a||j.$$typeof===d||j.$$typeof===v||j.$$typeof===w||j.$$typeof===P||j.$$typeof===m)}function S(j){if(typeof j=="object"&&j!==null){var ee=j.$$typeof;switch(ee){case t:var _=j.type;switch(_){case c:case u:case r:case i:case o:case g:return _;default:var ae=_&&_.$$typeof;switch(ae){case a:case d:case h:case p:case s:return ae;default:return ee}}case n:return ee}}}var y=c,k=u,O=a,F=s,V=t,B=d,T=r,$=h,N=p,L=n,A=i,M=o,z=g,ne=!1;function te(j){return ne||(ne=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),R(j)||S(j)===c}function R(j){return S(j)===u}function D(j){return S(j)===a}function G(j){return S(j)===s}function Y(j){return typeof j=="object"&&j!==null&&j.$$typeof===t}function H(j){return S(j)===d}function U(j){return S(j)===r}function W(j){return S(j)===h}function X(j){return S(j)===p}function q(j){return S(j)===n}function K(j){return S(j)===i}function Q(j){return S(j)===o}function se(j){return S(j)===g}ue.AsyncMode=y,ue.ConcurrentMode=k,ue.ContextConsumer=O,ue.ContextProvider=F,ue.Element=V,ue.ForwardRef=B,ue.Fragment=T,ue.Lazy=$,ue.Memo=N,ue.Portal=L,ue.Profiler=A,ue.StrictMode=M,ue.Suspense=z,ue.isAsyncMode=te,ue.isConcurrentMode=R,ue.isContextConsumer=D,ue.isContextProvider=G,ue.isElement=Y,ue.isForwardRef=H,ue.isFragment=U,ue.isLazy=W,ue.isMemo=X,ue.isPortal=q,ue.isProfiler=K,ue.isStrictMode=Q,ue.isSuspense=se,ue.isValidElementType=x,ue.typeOf=S}()),ue}var ui;function ws(){return ui||(ui=1,process.env.NODE_ENV==="production"?jn.exports=Zl():jn.exports=Ql()),jn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Er,di;function ec(){if(di)return Er;di=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var s={},a=0;a<10;a++)s["_"+String.fromCharCode(a)]=a;var c=Object.getOwnPropertyNames(s).map(function(d){return s[d]});if(c.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(d){u[d]=d}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Er=o()?Object.assign:function(i,s){for(var a,c=r(i),u,d=1;d<arguments.length;d++){a=Object(arguments[d]);for(var g in a)t.call(a,g)&&(c[g]=a[g]);if(e){u=e(a);for(var f=0;f<u.length;f++)n.call(a,u[f])&&(c[u[f]]=a[u[f]])}}return c},Er}var Rr,pi;function vo(){if(pi)return Rr;pi=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Rr=e,Rr}var kr,fi;function xs(){return fi||(fi=1,kr=Function.call.bind(Object.prototype.hasOwnProperty)),kr}var Tr,gi;function tc(){if(gi)return Tr;gi=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=vo(),n={},r=xs();e=function(i){var s="Warning: "+i;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(i,s,a,c,u){if(process.env.NODE_ENV!=="production"){for(var d in i)if(r(i,d)){var g;try{if(typeof i[d]!="function"){var f=Error((c||"React class")+": "+a+" type `"+d+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[d]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw f.name="Invariant Violation",f}g=i[d](s,d,c,a,null,t)}catch(h){g=h}if(g&&!(g instanceof Error)&&e((c||"React class")+": type specification of "+a+" `"+d+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof g+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),g instanceof Error&&!(g.message in n)){n[g.message]=!0;var p=u?u():"";e("Failed "+a+" type: "+g.message+(p??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Tr=o,Tr}var Pr,mi;function nc(){if(mi)return Pr;mi=1;var e=ws(),t=ec(),n=vo(),r=xs(),o=tc(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(a){var c="Warning: "+a;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function s(){return null}return Pr=function(a,c){var u=typeof Symbol=="function"&&Symbol.iterator,d="@@iterator";function g(R){var D=R&&(u&&R[u]||R[d]);if(typeof D=="function")return D}var f="<<anonymous>>",p={array:w("array"),bigint:w("bigint"),bool:w("boolean"),func:w("function"),number:w("number"),object:w("object"),string:w("string"),symbol:w("symbol"),any:P(),arrayOf:x,element:S(),elementType:y(),instanceOf:k,node:B(),objectOf:F,oneOf:O,oneOfType:V,shape:$,exact:N};function h(R,D){return R===D?R!==0||1/R===1/D:R!==R&&D!==D}function m(R,D){this.message=R,this.data=D&&typeof D=="object"?D:{},this.stack=""}m.prototype=Error.prototype;function v(R){if(process.env.NODE_ENV!=="production")var D={},G=0;function Y(U,W,X,q,K,Q,se){if(q=q||f,Q=Q||X,se!==n){if(c){var j=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw j.name="Invariant Violation",j}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var ee=q+":"+X;!D[ee]&&G<3&&(i("You are manually calling a React.PropTypes validation function for the `"+Q+"` prop on `"+q+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),D[ee]=!0,G++)}}return W[X]==null?U?W[X]===null?new m("The "+K+" `"+Q+"` is marked as required "+("in `"+q+"`, but its value is `null`.")):new m("The "+K+" `"+Q+"` is marked as required in "+("`"+q+"`, but its value is `undefined`.")):null:R(W,X,q,K,Q)}var H=Y.bind(null,!1);return H.isRequired=Y.bind(null,!0),H}function w(R){function D(G,Y,H,U,W,X){var q=G[Y],K=M(q);if(K!==R){var Q=z(q);return new m("Invalid "+U+" `"+W+"` of type "+("`"+Q+"` supplied to `"+H+"`, expected ")+("`"+R+"`."),{expectedType:R})}return null}return v(D)}function P(){return v(s)}function x(R){function D(G,Y,H,U,W){if(typeof R!="function")return new m("Property `"+W+"` of component `"+H+"` has invalid PropType notation inside arrayOf.");var X=G[Y];if(!Array.isArray(X)){var q=M(X);return new m("Invalid "+U+" `"+W+"` of type "+("`"+q+"` supplied to `"+H+"`, expected an array."))}for(var K=0;K<X.length;K++){var Q=R(X,K,H,U,W+"["+K+"]",n);if(Q instanceof Error)return Q}return null}return v(D)}function S(){function R(D,G,Y,H,U){var W=D[G];if(!a(W)){var X=M(W);return new m("Invalid "+H+" `"+U+"` of type "+("`"+X+"` supplied to `"+Y+"`, expected a single ReactElement."))}return null}return v(R)}function y(){function R(D,G,Y,H,U){var W=D[G];if(!e.isValidElementType(W)){var X=M(W);return new m("Invalid "+H+" `"+U+"` of type "+("`"+X+"` supplied to `"+Y+"`, expected a single ReactElement type."))}return null}return v(R)}function k(R){function D(G,Y,H,U,W){if(!(G[Y]instanceof R)){var X=R.name||f,q=te(G[Y]);return new m("Invalid "+U+" `"+W+"` of type "+("`"+q+"` supplied to `"+H+"`, expected ")+("instance of `"+X+"`."))}return null}return v(D)}function O(R){if(!Array.isArray(R))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),s;function D(G,Y,H,U,W){for(var X=G[Y],q=0;q<R.length;q++)if(h(X,R[q]))return null;var K=JSON.stringify(R,function(se,j){var ee=z(j);return ee==="symbol"?String(j):j});return new m("Invalid "+U+" `"+W+"` of value `"+String(X)+"` "+("supplied to `"+H+"`, expected one of "+K+"."))}return v(D)}function F(R){function D(G,Y,H,U,W){if(typeof R!="function")return new m("Property `"+W+"` of component `"+H+"` has invalid PropType notation inside objectOf.");var X=G[Y],q=M(X);if(q!=="object")return new m("Invalid "+U+" `"+W+"` of type "+("`"+q+"` supplied to `"+H+"`, expected an object."));for(var K in X)if(r(X,K)){var Q=R(X,K,H,U,W+"."+K,n);if(Q instanceof Error)return Q}return null}return v(D)}function V(R){if(!Array.isArray(R))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var D=0;D<R.length;D++){var G=R[D];if(typeof G!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ne(G)+" at index "+D+"."),s}function Y(H,U,W,X,q){for(var K=[],Q=0;Q<R.length;Q++){var se=R[Q],j=se(H,U,W,X,q,n);if(j==null)return null;j.data&&r(j.data,"expectedType")&&K.push(j.data.expectedType)}var ee=K.length>0?", expected one of type ["+K.join(", ")+"]":"";return new m("Invalid "+X+" `"+q+"` supplied to "+("`"+W+"`"+ee+"."))}return v(Y)}function B(){function R(D,G,Y,H,U){return L(D[G])?null:new m("Invalid "+H+" `"+U+"` supplied to "+("`"+Y+"`, expected a ReactNode."))}return v(R)}function T(R,D,G,Y,H){return new m((R||"React class")+": "+D+" type `"+G+"."+Y+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+H+"`.")}function $(R){function D(G,Y,H,U,W){var X=G[Y],q=M(X);if(q!=="object")return new m("Invalid "+U+" `"+W+"` of type `"+q+"` "+("supplied to `"+H+"`, expected `object`."));for(var K in R){var Q=R[K];if(typeof Q!="function")return T(H,U,W,K,z(Q));var se=Q(X,K,H,U,W+"."+K,n);if(se)return se}return null}return v(D)}function N(R){function D(G,Y,H,U,W){var X=G[Y],q=M(X);if(q!=="object")return new m("Invalid "+U+" `"+W+"` of type `"+q+"` "+("supplied to `"+H+"`, expected `object`."));var K=t({},G[Y],R);for(var Q in K){var se=R[Q];if(r(R,Q)&&typeof se!="function")return T(H,U,W,Q,z(se));if(!se)return new m("Invalid "+U+" `"+W+"` key `"+Q+"` supplied to `"+H+"`.\nBad object: "+JSON.stringify(G[Y],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(R),null,"  "));var j=se(X,Q,H,U,W+"."+Q,n);if(j)return j}return null}return v(D)}function L(R){switch(typeof R){case"number":case"string":case"undefined":return!0;case"boolean":return!R;case"object":if(Array.isArray(R))return R.every(L);if(R===null||a(R))return!0;var D=g(R);if(D){var G=D.call(R),Y;if(D!==R.entries){for(;!(Y=G.next()).done;)if(!L(Y.value))return!1}else for(;!(Y=G.next()).done;){var H=Y.value;if(H&&!L(H[1]))return!1}}else return!1;return!0;default:return!1}}function A(R,D){return R==="symbol"?!0:D?D["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&D instanceof Symbol:!1}function M(R){var D=typeof R;return Array.isArray(R)?"array":R instanceof RegExp?"object":A(D,R)?"symbol":D}function z(R){if(typeof R>"u"||R===null)return""+R;var D=M(R);if(D==="object"){if(R instanceof Date)return"date";if(R instanceof RegExp)return"regexp"}return D}function ne(R){var D=z(R);switch(D){case"array":case"object":return"an "+D;case"boolean":case"date":case"regexp":return"a "+D;default:return D}}function te(R){return!R.constructor||!R.constructor.name?f:R.constructor.name}return p.checkPropTypes=o,p.resetWarningCache=o.resetWarningCache,p.PropTypes=p,p},Pr}var Or,hi;function rc(){if(hi)return Or;hi=1;var e=vo();function t(){}function n(){}return n.resetWarningCache=t,Or=function(){function r(s,a,c,u,d,g){if(g!==e){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},Or}if(process.env.NODE_ENV!=="production"){var oc=ws(),ic=!0;qr.exports=nc()(oc.isElement,ic)}else qr.exports=rc()();var sc=qr.exports;const l=Kl(sc);function Yt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function Et(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Ss(e){if(!Et(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Ss(e[n])}),t}function it(e,t,n={clone:!0}){const r=n.clone?E({},e):e;return Et(e)&&Et(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Et(t[o])&&o in e&&Et(e[o])?r[o]=it(e[o],t[o],n):n.clone?r[o]=Et(t[o])?Ss(t[o]):t[o]:r[o]=t[o])}),r}function ac(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Cs(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let a;const c=i.type;return typeof c=="function"&&!ac(c)&&(a="Did you accidentally use a plain function component for an element instead?"),a!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Es=Yt(l.element,Cs);Es.isRequired=Yt(l.element.isRequired,Cs);const Rn=Es;function lc(e){const{prototype:t={}}=e;return!!t.isReactComponent}function cc(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let a;return typeof i=="function"&&!lc(i)&&(a="Did you accidentally provide a plain function component instead?"),a!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const uc=Yt(l.elementType,cc),dc="exact-prop: ​";function Rs(e){return process.env.NODE_ENV==="production"?e:E({},e,{[dc]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Bt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Wr={exports:{}},de={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var vi;function pc(){if(vi)return de;vi=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),a=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),g=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),p=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function m(v){if(typeof v=="object"&&v!==null){var w=v.$$typeof;switch(w){case e:switch(v=v.type,v){case n:case o:case r:case u:case d:return v;default:switch(v=v&&v.$$typeof,v){case a:case s:case c:case f:case g:case i:return v;default:return w}}case t:return w}}}return de.ContextConsumer=s,de.ContextProvider=i,de.Element=e,de.ForwardRef=c,de.Fragment=n,de.Lazy=f,de.Memo=g,de.Portal=t,de.Profiler=o,de.StrictMode=r,de.Suspense=u,de.SuspenseList=d,de.isAsyncMode=function(){return!1},de.isConcurrentMode=function(){return!1},de.isContextConsumer=function(v){return m(v)===s},de.isContextProvider=function(v){return m(v)===i},de.isElement=function(v){return typeof v=="object"&&v!==null&&v.$$typeof===e},de.isForwardRef=function(v){return m(v)===c},de.isFragment=function(v){return m(v)===n},de.isLazy=function(v){return m(v)===f},de.isMemo=function(v){return m(v)===g},de.isPortal=function(v){return m(v)===t},de.isProfiler=function(v){return m(v)===o},de.isStrictMode=function(v){return m(v)===r},de.isSuspense=function(v){return m(v)===u},de.isSuspenseList=function(v){return m(v)===d},de.isValidElementType=function(v){return typeof v=="string"||typeof v=="function"||v===n||v===o||v===r||v===u||v===d||v===p||typeof v=="object"&&v!==null&&(v.$$typeof===f||v.$$typeof===g||v.$$typeof===i||v.$$typeof===s||v.$$typeof===c||v.$$typeof===h||v.getModuleId!==void 0)},de.typeOf=m,de}var pe={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bi;function fc(){return bi||(bi=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),a=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),g=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),p=Symbol.for("react.offscreen"),h=!1,m=!1,v=!1,w=!1,P=!1,x;x=Symbol.for("react.module.reference");function S(_){return!!(typeof _=="string"||typeof _=="function"||_===n||_===o||P||_===r||_===u||_===d||w||_===p||h||m||v||typeof _=="object"&&_!==null&&(_.$$typeof===f||_.$$typeof===g||_.$$typeof===i||_.$$typeof===s||_.$$typeof===c||_.$$typeof===x||_.getModuleId!==void 0))}function y(_){if(typeof _=="object"&&_!==null){var ae=_.$$typeof;switch(ae){case e:var Ce=_.type;switch(Ce){case n:case o:case r:case u:case d:return Ce;default:var _e=Ce&&Ce.$$typeof;switch(_e){case a:case s:case c:case f:case g:case i:return _e;default:return ae}}case t:return ae}}}var k=s,O=i,F=e,V=c,B=n,T=f,$=g,N=t,L=o,A=r,M=u,z=d,ne=!1,te=!1;function R(_){return ne||(ne=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function D(_){return te||(te=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function G(_){return y(_)===s}function Y(_){return y(_)===i}function H(_){return typeof _=="object"&&_!==null&&_.$$typeof===e}function U(_){return y(_)===c}function W(_){return y(_)===n}function X(_){return y(_)===f}function q(_){return y(_)===g}function K(_){return y(_)===t}function Q(_){return y(_)===o}function se(_){return y(_)===r}function j(_){return y(_)===u}function ee(_){return y(_)===d}pe.ContextConsumer=k,pe.ContextProvider=O,pe.Element=F,pe.ForwardRef=V,pe.Fragment=B,pe.Lazy=T,pe.Memo=$,pe.Portal=N,pe.Profiler=L,pe.StrictMode=A,pe.Suspense=M,pe.SuspenseList=z,pe.isAsyncMode=R,pe.isConcurrentMode=D,pe.isContextConsumer=G,pe.isContextProvider=Y,pe.isElement=H,pe.isForwardRef=U,pe.isFragment=W,pe.isLazy=X,pe.isMemo=q,pe.isPortal=K,pe.isProfiler=Q,pe.isStrictMode=se,pe.isSuspense=j,pe.isSuspenseList=ee,pe.isValidElementType=S,pe.typeOf=y}()),pe}process.env.NODE_ENV==="production"?Wr.exports=pc():Wr.exports=fc();var Xn=Wr.exports;const gc=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function mc(e){const t=`${e}`.match(gc);return t&&t[1]||""}function ks(e,t=""){return e.displayName||e.name||mc(e)||t}function yi(e,t,n){const r=ks(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function hc(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return ks(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Xn.ForwardRef:return yi(e,e.render,"ForwardRef");case Xn.Memo:return yi(e,e.type,"memo");default:return}}}function st(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],s=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const vc=l.oneOfType([l.func,l.object]),bo=vc;function Je(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Bt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Xr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Ts(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function bc(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,s)=>{const a=o||"<<anonymous>>",c=s||r;return typeof n[r]<"u"?new Error(`The ${i} \`${c}\` of \`${a}\` is deprecated. ${t}`):null}}function yc(e,t){var n,r;return C.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Pe(e){return e&&e.ownerDocument||document}function zt(e){return Pe(e).defaultView||window}function wc(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?E({},t.propTypes):null;return o=>(i,s,a,c,u,...d)=>{const g=u||s,f=n==null?void 0:n[g];if(f){const p=f(i,s,a,c,u,...d);if(p)return p}return typeof i[s]<"u"&&!i[o]?new Error(`The prop \`${g}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Yn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const xc=typeof window<"u"?C.useLayoutEffect:C.useEffect,Tt=xc;let wi=0;function Sc(e){const[t,n]=C.useState(e),r=e||t;return C.useEffect(()=>{t==null&&(wi+=1,n(`mui-${wi}`))},[t]),r}const xi=C["useId".toString()];function Ps(e){if(xi!==void 0){const t=xi();return e??t}return Sc(e)}function Cc(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function Os({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=C.useRef(e!==void 0),[i,s]=C.useState(t),a=o?e:i;if(process.env.NODE_ENV!=="production"){C.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:u}=C.useRef(t);C.useEffect(()=>{!o&&u!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=C.useCallback(u=>{o||s(u)},[]);return[a,c]}function yn(e){const t=C.useRef(e);return Tt(()=>{t.current=e}),C.useRef((...n)=>(0,t.current)(...n)).current}function Ue(...e){return C.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Yn(n,t)})},e)}const Si={};function Ec(e,t){const n=C.useRef(Si);return n.current===Si&&(n.current=e(t)),n}const Rc=[];function kc(e){C.useEffect(e,Rc)}class kn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new kn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function un(){const e=Ec(kn.create).current;return kc(e.disposeEffect),e}let sr=!0,Yr=!1;const Tc=new kn,Pc={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Oc(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Pc[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function _c(e){e.metaKey||e.altKey||e.ctrlKey||(sr=!0)}function _r(){sr=!1}function Nc(){this.visibilityState==="hidden"&&Yr&&(sr=!0)}function $c(e){e.addEventListener("keydown",_c,!0),e.addEventListener("mousedown",_r,!0),e.addEventListener("pointerdown",_r,!0),e.addEventListener("touchstart",_r,!0),e.addEventListener("visibilitychange",Nc,!0)}function Mc(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return sr||Oc(t)}function _s(){const e=C.useCallback(o=>{o!=null&&$c(o.ownerDocument)},[]),t=C.useRef(!1);function n(){return t.current?(Yr=!0,Tc.start(100,()=>{Yr=!1}),t.current=!1,!0):!1}function r(o){return Mc(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Ns(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Ic(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function jc(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Dc=Number.isInteger||jc;function $s(e,t,n,r){const o=e[t];if(o==null||!Dc(o)){const i=Ic(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function Ms(e,t,...n){return e[t]===void 0?null:$s(e,t,...n)}function Kr(){return null}Ms.isRequired=$s;Kr.isRequired=Kr;const Is=process.env.NODE_ENV==="production"?Kr:Ms;function js(e,t){const n=E({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=E({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=E({},i),Object.keys(o).forEach(s=>{n[r][s]=js(o[s],i[s])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function ct(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,s)=>{if(s){const a=t(s);a!==""&&i.push(a),n&&n[s]&&i.push(n[s])}return i},[]).join(" ")}),r}const Ci=e=>e,Ac=()=>{let e=Ci;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Ci}}},Fc=Ac(),Ds=Fc,As={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Qe(e,t,n="Mui"){const r=As[t];return r?`${n}-${r}`:`${Ds.generate(e)}-${t}`}function ht(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=Qe(e,o,n)}),r}function Vc(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Fs(e){return typeof e=="string"}function dn(e,t,n){return e===void 0||Fs(e)?t:E({},t,{ownerState:E({},t.ownerState,n)})}const Lc={disableDefaultClasses:!1},Bc=C.createContext(Lc);function zc(e){const{disableDefaultClasses:t}=C.useContext(Bc);return n=>t?"":e(n)}function Vs(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function Hc(e,t,n){return typeof e=="function"?e(t,n):e}function Ei(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function Gc(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const p=Te(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),h=E({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),m=E({},n,o,r);return p.length>0&&(m.className=p),Object.keys(h).length>0&&(m.style=h),{props:m,internalRef:void 0}}const s=Vs(E({},o,r)),a=Ei(r),c=Ei(o),u=t(s),d=Te(u==null?void 0:u.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),g=E({},u==null?void 0:u.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=E({},u,n,c,a);return d.length>0&&(f.className=d),Object.keys(g).length>0&&(f.style=g),{props:f,internalRef:u.ref}}const Uc=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Pt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,s=fe(e,Uc),a=i?{}:Hc(r,o),{props:c,internalRef:u}=Gc(E({},s,{externalSlotProps:a})),d=Ue(u,a==null?void 0:a.ref,(t=e.additionalProps)==null?void 0:t.ref);return dn(n,E({},c,{ref:d}),o)}const Ls="base";function qc(e){return`${Ls}--${e}`}function Wc(e,t){return`${Ls}-${e}-${t}`}function Bs(e,t){const n=As[t];return n?qc(n):Wc(e,t)}function Xc(e,t){const n={};return t.forEach(r=>{n[r]=Bs(e,r)}),n}const Yc=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Kc(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function Jc(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Zc(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Jc(e))}function Qc(e){const t=[],n=[];return Array.from(e.querySelectorAll(Yc)).forEach((r,o)=>{const i=Kc(r);i===-1||!Zc(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function eu(){return!0}function Kn(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=Qc,isEnabled:s=eu,open:a}=e,c=C.useRef(!1),u=C.useRef(null),d=C.useRef(null),g=C.useRef(null),f=C.useRef(null),p=C.useRef(!1),h=C.useRef(null),m=Ue(t.ref,h),v=C.useRef(null);C.useEffect(()=>{!a||!h.current||(p.current=!n)},[n,a]),C.useEffect(()=>{if(!a||!h.current)return;const x=Pe(h.current);return h.current.contains(x.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),p.current&&h.current.focus()),()=>{o||(g.current&&g.current.focus&&(c.current=!0,g.current.focus()),g.current=null)}},[a]),C.useEffect(()=>{if(!a||!h.current)return;const x=Pe(h.current),S=O=>{v.current=O,!(r||!s()||O.key!=="Tab")&&x.activeElement===h.current&&O.shiftKey&&(c.current=!0,d.current&&d.current.focus())},y=()=>{const O=h.current;if(O===null)return;if(!x.hasFocus()||!s()||c.current){c.current=!1;return}if(O.contains(x.activeElement)||r&&x.activeElement!==u.current&&x.activeElement!==d.current)return;if(x.activeElement!==f.current)f.current=null;else if(f.current!==null)return;if(!p.current)return;let F=[];if((x.activeElement===u.current||x.activeElement===d.current)&&(F=i(h.current)),F.length>0){var V,B;const T=!!((V=v.current)!=null&&V.shiftKey&&((B=v.current)==null?void 0:B.key)==="Tab"),$=F[0],N=F[F.length-1];typeof $!="string"&&typeof N!="string"&&(T?N.focus():$.focus())}else O.focus()};x.addEventListener("focusin",y),x.addEventListener("keydown",S,!0);const k=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(k),x.removeEventListener("focusin",y),x.removeEventListener("keydown",S,!0)}},[n,r,o,s,a,i]);const w=x=>{g.current===null&&(g.current=x.relatedTarget),p.current=!0,f.current=x.target;const S=t.props.onFocus;S&&S(x)},P=x=>{g.current===null&&(g.current=x.relatedTarget),p.current=!0};return b.jsxs(C.Fragment,{children:[b.jsx("div",{tabIndex:a?0:-1,onFocus:P,ref:u,"data-testid":"sentinelStart"}),C.cloneElement(t,{ref:m,onFocus:w}),b.jsx("div",{tabIndex:a?0:-1,onFocus:P,ref:d,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(Kn.propTypes={children:Rn,disableAutoFocus:l.bool,disableEnforceFocus:l.bool,disableRestoreFocus:l.bool,getTabbable:l.func,isEnabled:l.func,open:l.bool.isRequired});process.env.NODE_ENV!=="production"&&(Kn["propTypes"]=Rs(Kn.propTypes));function tu(e){return typeof e=="function"?e():e}const wn=C.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[s,a]=C.useState(null),c=Ue(C.isValidElement(r)?r.ref:null,n);if(Tt(()=>{i||a(tu(o)||document.body)},[o,i]),Tt(()=>{if(s&&!i)return Yn(n,s),()=>{Yn(n,null)}},[n,s,i]),i){if(C.isValidElement(r)){const u={ref:c};return C.cloneElement(r,u)}return b.jsx(C.Fragment,{children:r})}return b.jsx(C.Fragment,{children:s&&vl.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&(wn.propTypes={children:l.node,container:l.oneOfType([st,l.func]),disablePortal:l.bool});process.env.NODE_ENV!=="production"&&(wn["propTypes"]=Rs(wn.propTypes));function nu(e){const t=Pe(e);return t.body===e?zt(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function gn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Ri(e){return parseInt(zt(e).getComputedStyle(e).paddingRight,10)||0}function ru(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function ki(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,s=>{const a=i.indexOf(s)===-1,c=!ru(s);a&&c&&gn(s,o)})}function Nr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function ou(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(nu(r)){const s=Ns(Pe(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Ri(r)+s}px`;const a=Pe(r).querySelectorAll(".mui-fixed");[].forEach.call(a,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${Ri(c)+s}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=Pe(r).body;else{const s=r.parentElement,a=zt(r);i=(s==null?void 0:s.nodeName)==="HTML"&&a.getComputedStyle(s).overflowY==="scroll"?s:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:s,property:a})=>{i?s.style.setProperty(a,i):s.style.removeProperty(a)})}}function iu(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class su{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&gn(t.modalRef,!1);const o=iu(n);ki(n,t.mount,t.modalRef,o,!0);const i=Nr(this.containers,s=>s.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=Nr(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=ou(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=Nr(this.containers,s=>s.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&gn(t.modalRef,n),ki(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=i.modals[i.modals.length-1];s.modalRef&&gn(s.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function au(e){return typeof e=="function"?e():e}function lu(e){return e?e.props.hasOwnProperty("in"):!1}const cu=new su;function uu(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=cu,closeAfterTransition:i=!1,onTransitionEnter:s,onTransitionExited:a,children:c,onClose:u,open:d,rootRef:g}=e,f=C.useRef({}),p=C.useRef(null),h=C.useRef(null),m=Ue(h,g),[v,w]=C.useState(!d),P=lu(c);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const S=()=>Pe(p.current),y=()=>(f.current.modalRef=h.current,f.current.mount=p.current,f.current),k=()=>{o.mount(y(),{disableScrollLock:r}),h.current&&(h.current.scrollTop=0)},O=yn(()=>{const M=au(t)||S().body;o.add(y(),M),h.current&&k()}),F=C.useCallback(()=>o.isTopModal(y()),[o]),V=yn(M=>{p.current=M,M&&(d&&F()?k():h.current&&gn(h.current,x))}),B=C.useCallback(()=>{o.remove(y(),x)},[x,o]);C.useEffect(()=>()=>{B()},[B]),C.useEffect(()=>{d?O():(!P||!i)&&B()},[d,B,P,i,O]);const T=M=>z=>{var ne;(ne=M.onKeyDown)==null||ne.call(M,z),!(z.key!=="Escape"||z.which===229||!F())&&(n||(z.stopPropagation(),u&&u(z,"escapeKeyDown")))},$=M=>z=>{var ne;(ne=M.onClick)==null||ne.call(M,z),z.target===z.currentTarget&&u&&u(z,"backdropClick")};return{getRootProps:(M={})=>{const z=Vs(e);delete z.onTransitionEnter,delete z.onTransitionExited;const ne=E({},z,M);return E({role:"presentation"},ne,{onKeyDown:T(ne),ref:m})},getBackdropProps:(M={})=>{const z=M;return E({"aria-hidden":!0},z,{onClick:$(z),open:d})},getTransitionProps:()=>{const M=()=>{w(!1),s&&s()},z=()=>{w(!0),a&&a(),i&&B()};return{onEnter:Xr(M,c==null?void 0:c.props.onEnter),onExited:Xr(z,c==null?void 0:c.props.onExited)}},rootRef:m,portalRef:V,isTopModal:F,exited:v,hasTransition:P}}var Me="top",qe="bottom",We="right",Ie="left",yo="auto",Tn=[Me,qe,We,Ie],Ht="start",xn="end",du="clippingParents",zs="viewport",rn="popper",pu="reference",Ti=Tn.reduce(function(e,t){return e.concat([t+"-"+Ht,t+"-"+xn])},[]),Hs=[].concat(Tn,[yo]).reduce(function(e,t){return e.concat([t,t+"-"+Ht,t+"-"+xn])},[]),fu="beforeRead",gu="read",mu="afterRead",hu="beforeMain",vu="main",bu="afterMain",yu="beforeWrite",wu="write",xu="afterWrite",Su=[fu,gu,mu,hu,vu,bu,yu,wu,xu];function Ze(e){return e?(e.nodeName||"").toLowerCase():null}function Le(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Ot(e){var t=Le(e).Element;return e instanceof t||e instanceof Element}function Ge(e){var t=Le(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function wo(e){if(typeof ShadowRoot>"u")return!1;var t=Le(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Cu(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!Ge(i)||!Ze(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(s){var a=o[s];a===!1?i.removeAttribute(s):i.setAttribute(s,a===!0?"":a)}))})}function Eu(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},s=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),a=s.reduce(function(c,u){return c[u]="",c},{});!Ge(o)||!Ze(o)||(Object.assign(o.style,a),Object.keys(i).forEach(function(c){o.removeAttribute(c)}))})}}const Ru={name:"applyStyles",enabled:!0,phase:"write",fn:Cu,effect:Eu,requires:["computeStyles"]};function Ke(e){return e.split("-")[0]}var Rt=Math.max,Jn=Math.min,Gt=Math.round;function Jr(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Gs(){return!/^((?!chrome|android).)*safari/i.test(Jr())}function Ut(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&Ge(e)&&(o=e.offsetWidth>0&&Gt(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&Gt(r.height)/e.offsetHeight||1);var s=Ot(e)?Le(e):window,a=s.visualViewport,c=!Gs()&&n,u=(r.left+(c&&a?a.offsetLeft:0))/o,d=(r.top+(c&&a?a.offsetTop:0))/i,g=r.width/o,f=r.height/i;return{width:g,height:f,top:d,right:u+g,bottom:d+f,left:u,x:u,y:d}}function xo(e){var t=Ut(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Us(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&wo(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function at(e){return Le(e).getComputedStyle(e)}function ku(e){return["table","td","th"].indexOf(Ze(e))>=0}function vt(e){return((Ot(e)?e.ownerDocument:e.document)||window.document).documentElement}function ar(e){return Ze(e)==="html"?e:e.assignedSlot||e.parentNode||(wo(e)?e.host:null)||vt(e)}function Pi(e){return!Ge(e)||at(e).position==="fixed"?null:e.offsetParent}function Tu(e){var t=/firefox/i.test(Jr()),n=/Trident/i.test(Jr());if(n&&Ge(e)){var r=at(e);if(r.position==="fixed")return null}var o=ar(e);for(wo(o)&&(o=o.host);Ge(o)&&["html","body"].indexOf(Ze(o))<0;){var i=at(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function Pn(e){for(var t=Le(e),n=Pi(e);n&&ku(n)&&at(n).position==="static";)n=Pi(n);return n&&(Ze(n)==="html"||Ze(n)==="body"&&at(n).position==="static")?t:n||Tu(e)||t}function So(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function mn(e,t,n){return Rt(e,Jn(t,n))}function Pu(e,t,n){var r=mn(e,t,n);return r>n?n:r}function qs(){return{top:0,right:0,bottom:0,left:0}}function Ws(e){return Object.assign({},qs(),e)}function Xs(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Ou=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Ws(typeof t!="number"?t:Xs(t,Tn))};function _u(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,s=n.modifiersData.popperOffsets,a=Ke(n.placement),c=So(a),u=[Ie,We].indexOf(a)>=0,d=u?"height":"width";if(!(!i||!s)){var g=Ou(o.padding,n),f=xo(i),p=c==="y"?Me:Ie,h=c==="y"?qe:We,m=n.rects.reference[d]+n.rects.reference[c]-s[c]-n.rects.popper[d],v=s[c]-n.rects.reference[c],w=Pn(i),P=w?c==="y"?w.clientHeight||0:w.clientWidth||0:0,x=m/2-v/2,S=g[p],y=P-f[d]-g[h],k=P/2-f[d]/2+x,O=mn(S,k,y),F=c;n.modifiersData[r]=(t={},t[F]=O,t.centerOffset=O-k,t)}}function Nu(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Us(t.elements.popper,o)&&(t.elements.arrow=o))}const $u={name:"arrow",enabled:!0,phase:"main",fn:_u,effect:Nu,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function qt(e){return e.split("-")[1]}var Mu={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Iu(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Gt(n*o)/o||0,y:Gt(r*o)/o||0}}function Oi(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,s=e.offsets,a=e.position,c=e.gpuAcceleration,u=e.adaptive,d=e.roundOffsets,g=e.isFixed,f=s.x,p=f===void 0?0:f,h=s.y,m=h===void 0?0:h,v=typeof d=="function"?d({x:p,y:m}):{x:p,y:m};p=v.x,m=v.y;var w=s.hasOwnProperty("x"),P=s.hasOwnProperty("y"),x=Ie,S=Me,y=window;if(u){var k=Pn(n),O="clientHeight",F="clientWidth";if(k===Le(n)&&(k=vt(n),at(k).position!=="static"&&a==="absolute"&&(O="scrollHeight",F="scrollWidth")),k=k,o===Me||(o===Ie||o===We)&&i===xn){S=qe;var V=g&&k===y&&y.visualViewport?y.visualViewport.height:k[O];m-=V-r.height,m*=c?1:-1}if(o===Ie||(o===Me||o===qe)&&i===xn){x=We;var B=g&&k===y&&y.visualViewport?y.visualViewport.width:k[F];p-=B-r.width,p*=c?1:-1}}var T=Object.assign({position:a},u&&Mu),$=d===!0?Iu({x:p,y:m},Le(n)):{x:p,y:m};if(p=$.x,m=$.y,c){var N;return Object.assign({},T,(N={},N[S]=P?"0":"",N[x]=w?"0":"",N.transform=(y.devicePixelRatio||1)<=1?"translate("+p+"px, "+m+"px)":"translate3d("+p+"px, "+m+"px, 0)",N))}return Object.assign({},T,(t={},t[S]=P?m+"px":"",t[x]=w?p+"px":"",t.transform="",t))}function ju(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,s=i===void 0?!0:i,a=n.roundOffsets,c=a===void 0?!0:a,u={placement:Ke(t.placement),variation:qt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Oi(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Oi(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Du={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:ju,data:{}};var Dn={passive:!0};function Au(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,s=r.resize,a=s===void 0?!0:s,c=Le(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&u.forEach(function(d){d.addEventListener("scroll",n.update,Dn)}),a&&c.addEventListener("resize",n.update,Dn),function(){i&&u.forEach(function(d){d.removeEventListener("scroll",n.update,Dn)}),a&&c.removeEventListener("resize",n.update,Dn)}}const Fu={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Au,data:{}};var Vu={left:"right",right:"left",bottom:"top",top:"bottom"};function Hn(e){return e.replace(/left|right|bottom|top/g,function(t){return Vu[t]})}var Lu={start:"end",end:"start"};function _i(e){return e.replace(/start|end/g,function(t){return Lu[t]})}function Co(e){var t=Le(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Eo(e){return Ut(vt(e)).left+Co(e).scrollLeft}function Bu(e,t){var n=Le(e),r=vt(e),o=n.visualViewport,i=r.clientWidth,s=r.clientHeight,a=0,c=0;if(o){i=o.width,s=o.height;var u=Gs();(u||!u&&t==="fixed")&&(a=o.offsetLeft,c=o.offsetTop)}return{width:i,height:s,x:a+Eo(e),y:c}}function zu(e){var t,n=vt(e),r=Co(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=Rt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=Rt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),a=-r.scrollLeft+Eo(e),c=-r.scrollTop;return at(o||n).direction==="rtl"&&(a+=Rt(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:s,x:a,y:c}}function Ro(e){var t=at(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Ys(e){return["html","body","#document"].indexOf(Ze(e))>=0?e.ownerDocument.body:Ge(e)&&Ro(e)?e:Ys(ar(e))}function hn(e,t){var n;t===void 0&&(t=[]);var r=Ys(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=Le(r),s=o?[i].concat(i.visualViewport||[],Ro(r)?r:[]):r,a=t.concat(s);return o?a:a.concat(hn(ar(s)))}function Zr(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Hu(e,t){var n=Ut(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Ni(e,t,n){return t===zs?Zr(Bu(e,n)):Ot(t)?Hu(t,n):Zr(zu(vt(e)))}function Gu(e){var t=hn(ar(e)),n=["absolute","fixed"].indexOf(at(e).position)>=0,r=n&&Ge(e)?Pn(e):e;return Ot(r)?t.filter(function(o){return Ot(o)&&Us(o,r)&&Ze(o)!=="body"}):[]}function Uu(e,t,n,r){var o=t==="clippingParents"?Gu(e):[].concat(t),i=[].concat(o,[n]),s=i[0],a=i.reduce(function(c,u){var d=Ni(e,u,r);return c.top=Rt(d.top,c.top),c.right=Jn(d.right,c.right),c.bottom=Jn(d.bottom,c.bottom),c.left=Rt(d.left,c.left),c},Ni(e,s,r));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function Ks(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ke(r):null,i=r?qt(r):null,s=t.x+t.width/2-n.width/2,a=t.y+t.height/2-n.height/2,c;switch(o){case Me:c={x:s,y:t.y-n.height};break;case qe:c={x:s,y:t.y+t.height};break;case We:c={x:t.x+t.width,y:a};break;case Ie:c={x:t.x-n.width,y:a};break;default:c={x:t.x,y:t.y}}var u=o?So(o):null;if(u!=null){var d=u==="y"?"height":"width";switch(i){case Ht:c[u]=c[u]-(t[d]/2-n[d]/2);break;case xn:c[u]=c[u]+(t[d]/2-n[d]/2);break}}return c}function Sn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,s=i===void 0?e.strategy:i,a=n.boundary,c=a===void 0?du:a,u=n.rootBoundary,d=u===void 0?zs:u,g=n.elementContext,f=g===void 0?rn:g,p=n.altBoundary,h=p===void 0?!1:p,m=n.padding,v=m===void 0?0:m,w=Ws(typeof v!="number"?v:Xs(v,Tn)),P=f===rn?pu:rn,x=e.rects.popper,S=e.elements[h?P:f],y=Uu(Ot(S)?S:S.contextElement||vt(e.elements.popper),c,d,s),k=Ut(e.elements.reference),O=Ks({reference:k,element:x,strategy:"absolute",placement:o}),F=Zr(Object.assign({},x,O)),V=f===rn?F:k,B={top:y.top-V.top+w.top,bottom:V.bottom-y.bottom+w.bottom,left:y.left-V.left+w.left,right:V.right-y.right+w.right},T=e.modifiersData.offset;if(f===rn&&T){var $=T[o];Object.keys(B).forEach(function(N){var L=[We,qe].indexOf(N)>=0?1:-1,A=[Me,qe].indexOf(N)>=0?"y":"x";B[N]+=$[A]*L})}return B}function qu(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,s=n.padding,a=n.flipVariations,c=n.allowedAutoPlacements,u=c===void 0?Hs:c,d=qt(r),g=d?a?Ti:Ti.filter(function(h){return qt(h)===d}):Tn,f=g.filter(function(h){return u.indexOf(h)>=0});f.length===0&&(f=g);var p=f.reduce(function(h,m){return h[m]=Sn(e,{placement:m,boundary:o,rootBoundary:i,padding:s})[Ke(m)],h},{});return Object.keys(p).sort(function(h,m){return p[h]-p[m]})}function Wu(e){if(Ke(e)===yo)return[];var t=Hn(e);return[_i(e),t,_i(t)]}function Xu(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,a=s===void 0?!0:s,c=n.fallbackPlacements,u=n.padding,d=n.boundary,g=n.rootBoundary,f=n.altBoundary,p=n.flipVariations,h=p===void 0?!0:p,m=n.allowedAutoPlacements,v=t.options.placement,w=Ke(v),P=w===v,x=c||(P||!h?[Hn(v)]:Wu(v)),S=[v].concat(x).reduce(function(H,U){return H.concat(Ke(U)===yo?qu(t,{placement:U,boundary:d,rootBoundary:g,padding:u,flipVariations:h,allowedAutoPlacements:m}):U)},[]),y=t.rects.reference,k=t.rects.popper,O=new Map,F=!0,V=S[0],B=0;B<S.length;B++){var T=S[B],$=Ke(T),N=qt(T)===Ht,L=[Me,qe].indexOf($)>=0,A=L?"width":"height",M=Sn(t,{placement:T,boundary:d,rootBoundary:g,altBoundary:f,padding:u}),z=L?N?We:Ie:N?qe:Me;y[A]>k[A]&&(z=Hn(z));var ne=Hn(z),te=[];if(i&&te.push(M[$]<=0),a&&te.push(M[z]<=0,M[ne]<=0),te.every(function(H){return H})){V=T,F=!1;break}O.set(T,te)}if(F)for(var R=h?3:1,D=function(U){var W=S.find(function(X){var q=O.get(X);if(q)return q.slice(0,U).every(function(K){return K})});if(W)return V=W,"break"},G=R;G>0;G--){var Y=D(G);if(Y==="break")break}t.placement!==V&&(t.modifiersData[r]._skip=!0,t.placement=V,t.reset=!0)}}const Yu={name:"flip",enabled:!0,phase:"main",fn:Xu,requiresIfExists:["offset"],data:{_skip:!1}};function $i(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Mi(e){return[Me,We,qe,Ie].some(function(t){return e[t]>=0})}function Ku(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,s=Sn(t,{elementContext:"reference"}),a=Sn(t,{altBoundary:!0}),c=$i(s,r),u=$i(a,o,i),d=Mi(c),g=Mi(u);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:u,isReferenceHidden:d,hasPopperEscaped:g},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":d,"data-popper-escaped":g})}const Ju={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Ku};function Zu(e,t,n){var r=Ke(e),o=[Ie,Me].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,s=i[0],a=i[1];return s=s||0,a=(a||0)*o,[Ie,We].indexOf(r)>=0?{x:a,y:s}:{x:s,y:a}}function Qu(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,s=Hs.reduce(function(d,g){return d[g]=Zu(g,t.rects,i),d},{}),a=s[t.placement],c=a.x,u=a.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=u),t.modifiersData[r]=s}const ed={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Qu};function td(e){var t=e.state,n=e.name;t.modifiersData[n]=Ks({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const nd={name:"popperOffsets",enabled:!0,phase:"read",fn:td,data:{}};function rd(e){return e==="x"?"y":"x"}function od(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,a=s===void 0?!1:s,c=n.boundary,u=n.rootBoundary,d=n.altBoundary,g=n.padding,f=n.tether,p=f===void 0?!0:f,h=n.tetherOffset,m=h===void 0?0:h,v=Sn(t,{boundary:c,rootBoundary:u,padding:g,altBoundary:d}),w=Ke(t.placement),P=qt(t.placement),x=!P,S=So(w),y=rd(S),k=t.modifiersData.popperOffsets,O=t.rects.reference,F=t.rects.popper,V=typeof m=="function"?m(Object.assign({},t.rects,{placement:t.placement})):m,B=typeof V=="number"?{mainAxis:V,altAxis:V}:Object.assign({mainAxis:0,altAxis:0},V),T=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,$={x:0,y:0};if(k){if(i){var N,L=S==="y"?Me:Ie,A=S==="y"?qe:We,M=S==="y"?"height":"width",z=k[S],ne=z+v[L],te=z-v[A],R=p?-F[M]/2:0,D=P===Ht?O[M]:F[M],G=P===Ht?-F[M]:-O[M],Y=t.elements.arrow,H=p&&Y?xo(Y):{width:0,height:0},U=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:qs(),W=U[L],X=U[A],q=mn(0,O[M],H[M]),K=x?O[M]/2-R-q-W-B.mainAxis:D-q-W-B.mainAxis,Q=x?-O[M]/2+R+q+X+B.mainAxis:G+q+X+B.mainAxis,se=t.elements.arrow&&Pn(t.elements.arrow),j=se?S==="y"?se.clientTop||0:se.clientLeft||0:0,ee=(N=T==null?void 0:T[S])!=null?N:0,_=z+K-ee-j,ae=z+Q-ee,Ce=mn(p?Jn(ne,_):ne,z,p?Rt(te,ae):te);k[S]=Ce,$[S]=Ce-z}if(a){var _e,we=S==="x"?Me:Ie,yt=S==="x"?qe:We,Ne=k[y],et=y==="y"?"height":"width",De=Ne+v[we],tt=Ne-v[yt],Ee=[Me,Ie].indexOf(w)!==-1,Nt=(_e=T==null?void 0:T[y])!=null?_e:0,wt=Ee?De:Ne-O[et]-F[et]-Nt+B.altAxis,Kt=Ee?Ne+O[et]+F[et]-Nt-B.altAxis:tt,$n=p&&Ee?Pu(wt,Ne,Kt):mn(p?wt:De,Ne,p?Kt:tt);k[y]=$n,$[y]=$n-Ne}t.modifiersData[r]=$}}const id={name:"preventOverflow",enabled:!0,phase:"main",fn:od,requiresIfExists:["offset"]};function sd(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function ad(e){return e===Le(e)||!Ge(e)?Co(e):sd(e)}function ld(e){var t=e.getBoundingClientRect(),n=Gt(t.width)/e.offsetWidth||1,r=Gt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function cd(e,t,n){n===void 0&&(n=!1);var r=Ge(t),o=Ge(t)&&ld(t),i=vt(t),s=Ut(e,o,n),a={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((Ze(t)!=="body"||Ro(i))&&(a=ad(t)),Ge(t)?(c=Ut(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):i&&(c.x=Eo(i))),{x:s.left+a.scrollLeft-c.x,y:s.top+a.scrollTop-c.y,width:s.width,height:s.height}}function ud(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var s=[].concat(i.requires||[],i.requiresIfExists||[]);s.forEach(function(a){if(!n.has(a)){var c=t.get(a);c&&o(c)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function dd(e){var t=ud(e);return Su.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function pd(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function fd(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var Ii={placement:"bottom",modifiers:[],strategy:"absolute"};function ji(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function gd(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?Ii:o;return function(a,c,u){u===void 0&&(u=i);var d={placement:"bottom",orderedModifiers:[],options:Object.assign({},Ii,i),modifiersData:{},elements:{reference:a,popper:c},attributes:{},styles:{}},g=[],f=!1,p={state:d,setOptions:function(w){var P=typeof w=="function"?w(d.options):w;m(),d.options=Object.assign({},i,d.options,P),d.scrollParents={reference:Ot(a)?hn(a):a.contextElement?hn(a.contextElement):[],popper:hn(c)};var x=dd(fd([].concat(r,d.options.modifiers)));return d.orderedModifiers=x.filter(function(S){return S.enabled}),h(),p.update()},forceUpdate:function(){if(!f){var w=d.elements,P=w.reference,x=w.popper;if(ji(P,x)){d.rects={reference:cd(P,Pn(x),d.options.strategy==="fixed"),popper:xo(x)},d.reset=!1,d.placement=d.options.placement,d.orderedModifiers.forEach(function(B){return d.modifiersData[B.name]=Object.assign({},B.data)});for(var S=0;S<d.orderedModifiers.length;S++){if(d.reset===!0){d.reset=!1,S=-1;continue}var y=d.orderedModifiers[S],k=y.fn,O=y.options,F=O===void 0?{}:O,V=y.name;typeof k=="function"&&(d=k({state:d,options:F,name:V,instance:p})||d)}}}},update:pd(function(){return new Promise(function(v){p.forceUpdate(),v(d)})}),destroy:function(){m(),f=!0}};if(!ji(a,c))return p;p.setOptions(u).then(function(v){!f&&u.onFirstUpdate&&u.onFirstUpdate(v)});function h(){d.orderedModifiers.forEach(function(v){var w=v.name,P=v.options,x=P===void 0?{}:P,S=v.effect;if(typeof S=="function"){var y=S({state:d,name:w,instance:p,options:x}),k=function(){};g.push(y||k)}})}function m(){g.forEach(function(v){return v()}),g=[]}return p}}var md=[Fu,nd,Du,Ru,ed,Yu,id,$u,Ju],hd=gd({defaultModifiers:md});const Js="Popper";function vd(e){return Bs(Js,e)}Xc(Js,["root"]);const bd=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],yd=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function wd(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function Zn(e){return typeof e=="function"?e():e}function lr(e){return e.nodeType!==void 0}function xd(e){return!lr(e)}const Sd=()=>ct({root:["root"]},zc(vd)),Cd={},Ed=C.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:s,disablePortal:a,modifiers:c,open:u,placement:d,popperOptions:g,popperRef:f,slotProps:p={},slots:h={},TransitionProps:m}=t,v=fe(t,bd),w=C.useRef(null),P=Ue(w,n),x=C.useRef(null),S=Ue(x,f),y=C.useRef(S);Tt(()=>{y.current=S},[S]),C.useImperativeHandle(f,()=>x.current,[]);const k=wd(d,s),[O,F]=C.useState(k),[V,B]=C.useState(Zn(o));C.useEffect(()=>{x.current&&x.current.forceUpdate()}),C.useEffect(()=>{o&&B(Zn(o))},[o]),Tt(()=>{if(!V||!u)return;const A=ne=>{F(ne.placement)};if(process.env.NODE_ENV!=="production"&&V&&lr(V)&&V.nodeType===1){const ne=V.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ne.top===0&&ne.left===0&&ne.right===0&&ne.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let M=[{name:"preventOverflow",options:{altBoundary:a}},{name:"flip",options:{altBoundary:a}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ne})=>{A(ne)}}];c!=null&&(M=M.concat(c)),g&&g.modifiers!=null&&(M=M.concat(g.modifiers));const z=hd(V,w.current,E({placement:k},g,{modifiers:M}));return y.current(z),()=>{z.destroy(),y.current(null)}},[V,a,c,u,g,k]);const T={placement:O};m!==null&&(T.TransitionProps=m);const $=Sd(),N=(r=h.root)!=null?r:"div",L=Pt({elementType:N,externalSlotProps:p.root,externalForwardedProps:v,additionalProps:{role:"tooltip",ref:P},ownerState:t,className:$.root});return b.jsx(N,E({},L,{children:typeof i=="function"?i(T):i}))}),Zs=C.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:s="ltr",disablePortal:a=!1,keepMounted:c=!1,modifiers:u,open:d,placement:g="bottom",popperOptions:f=Cd,popperRef:p,style:h,transition:m=!1,slotProps:v={},slots:w={}}=t,P=fe(t,yd),[x,S]=C.useState(!0),y=()=>{S(!1)},k=()=>{S(!0)};if(!c&&!d&&(!m||x))return null;let O;if(i)O=i;else if(r){const B=Zn(r);O=B&&lr(B)?Pe(B).body:Pe(null).body}const F=!d&&c&&(!m||x)?"none":void 0,V=m?{in:d,onEnter:y,onExited:k}:void 0;return b.jsx(wn,{disablePortal:a,container:O,children:b.jsx(Ed,E({anchorEl:r,direction:s,disablePortal:a,modifiers:u,ref:n,open:m?!x:d,placement:g,popperOptions:f,popperRef:p,slotProps:v,slots:w},P,{style:E({position:"fixed",top:0,left:0,display:F},h),TransitionProps:V,children:o}))})});process.env.NODE_ENV!=="production"&&(Zs.propTypes={anchorEl:Yt(l.oneOfType([st,l.object,l.func]),e=>{if(e.open){const t=Zn(e.anchorEl);if(t&&lr(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||xd(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:l.oneOfType([l.node,l.func]),container:l.oneOfType([st,l.func]),direction:l.oneOf(["ltr","rtl"]),disablePortal:l.bool,keepMounted:l.bool,modifiers:l.arrayOf(l.shape({data:l.object,effect:l.func,enabled:l.bool,fn:l.func,name:l.any,options:l.object,phase:l.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:l.arrayOf(l.string),requiresIfExists:l.arrayOf(l.string)})),open:l.bool.isRequired,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:l.shape({modifiers:l.array,onFirstUpdate:l.func,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:l.oneOf(["absolute","fixed"])}),popperRef:bo,slotProps:l.shape({root:l.oneOfType([l.func,l.object])}),slots:l.shape({root:l.elementType}),transition:l.bool});const Rd=["values","unit","step"],kd=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>E({},n,{[r.key]:r.val}),{})};function Td(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=fe(e,Rd),i=kd(t),s=Object.keys(i);function a(f){return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n})`}function c(f){return`@media (max-width:${(typeof t[f]=="number"?t[f]:f)-r/100}${n})`}function u(f,p){const h=s.indexOf(p);return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n}) and (max-width:${(h!==-1&&typeof t[s[h]]=="number"?t[s[h]]:p)-r/100}${n})`}function d(f){return s.indexOf(f)+1<s.length?u(f,s[s.indexOf(f)+1]):a(f)}function g(f){const p=s.indexOf(f);return p===0?a(s[1]):p===s.length-1?c(s[p]):u(f,s[s.indexOf(f)+1]).replace("@media","@media not all and")}return E({keys:s,values:i,up:a,down:c,between:u,only:d,not:g,unit:n},o)}const Pd={borderRadius:4},Od=Pd,_d=process.env.NODE_ENV!=="production"?l.oneOfType([l.number,l.string,l.object,l.array]):{},bt=_d;function vn(e,t){return t?it(e,t,{clone:!1}):e}const ko={xs:0,sm:600,md:900,lg:1200,xl:1536},Di={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${ko[e]}px)`};function lt(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||Di;return t.reduce((s,a,c)=>(s[i.up(i.keys[c])]=n(t[c]),s),{})}if(typeof t=="object"){const i=r.breakpoints||Di;return Object.keys(t).reduce((s,a)=>{if(Object.keys(i.values||ko).indexOf(a)!==-1){const c=i.up(a);s[c]=n(t[a],a)}else{const c=a;s[c]=t[c]}return s},{})}return n(t)}function Nd(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function $d(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function cr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function Qn(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=cr(e,n)||r,t&&(o=t(o,r,e)),o}function Se(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=s=>{if(s[t]==null)return null;const a=s[t],c=s.theme,u=cr(c,r)||{};return lt(s,a,g=>{let f=Qn(u,o,g);return g===f&&typeof g=="string"&&(f=Qn(u,o,`${t}${g==="default"?"":Je(g)}`,g)),n===!1?f:{[n]:f}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:bt}:{},i.filterProps=[t],i}function Md(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const Id={m:"margin",p:"padding"},jd={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Ai={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Dd=Md(e=>{if(e.length>2)if(Ai[e])e=Ai[e];else return[e];const[t,n]=e.split(""),r=Id[t],o=jd[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),ur=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],dr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Ad=[...ur,...dr];function On(e,t,n,r){var o;const i=(o=cr(e,t,!1))!=null?o:n;return typeof i=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),i*s):Array.isArray(i)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>i.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${s} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[s]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Qs(e){return On(e,"spacing",8,"spacing")}function _n(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Fd(e,t){return n=>e.reduce((r,o)=>(r[o]=_n(t,n),r),{})}function Vd(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=Dd(n),i=Fd(o,r),s=e[n];return lt(e,s,i)}function ea(e,t){const n=Qs(e.theme);return Object.keys(e).map(r=>Vd(e,t,r,n)).reduce(vn,{})}function be(e){return ea(e,ur)}be.propTypes=process.env.NODE_ENV!=="production"?ur.reduce((e,t)=>(e[t]=bt,e),{}):{};be.filterProps=ur;function ye(e){return ea(e,dr)}ye.propTypes=process.env.NODE_ENV!=="production"?dr.reduce((e,t)=>(e[t]=bt,e),{}):{};ye.filterProps=dr;process.env.NODE_ENV!=="production"&&Ad.reduce((e,t)=>(e[t]=bt,e),{});function Ld(e=8){if(e.mui)return e;const t=Qs({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const s=t(i);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function pr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?vn(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function He(e){return typeof e!="number"?e:`${e}px solid`}function Xe(e,t){return Se({prop:e,themeKey:"borders",transform:t})}const Bd=Xe("border",He),zd=Xe("borderTop",He),Hd=Xe("borderRight",He),Gd=Xe("borderBottom",He),Ud=Xe("borderLeft",He),qd=Xe("borderColor"),Wd=Xe("borderTopColor"),Xd=Xe("borderRightColor"),Yd=Xe("borderBottomColor"),Kd=Xe("borderLeftColor"),Jd=Xe("outline",He),Zd=Xe("outlineColor"),fr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=On(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:_n(t,r)});return lt(e,e.borderRadius,n)}return null};fr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:bt}:{};fr.filterProps=["borderRadius"];pr(Bd,zd,Hd,Gd,Ud,qd,Wd,Xd,Yd,Kd,fr,Jd,Zd);const gr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=On(e.theme,"spacing",8,"gap"),n=r=>({gap:_n(t,r)});return lt(e,e.gap,n)}return null};gr.propTypes=process.env.NODE_ENV!=="production"?{gap:bt}:{};gr.filterProps=["gap"];const mr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=On(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:_n(t,r)});return lt(e,e.columnGap,n)}return null};mr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:bt}:{};mr.filterProps=["columnGap"];const hr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=On(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:_n(t,r)});return lt(e,e.rowGap,n)}return null};hr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:bt}:{};hr.filterProps=["rowGap"];const Qd=Se({prop:"gridColumn"}),ep=Se({prop:"gridRow"}),tp=Se({prop:"gridAutoFlow"}),np=Se({prop:"gridAutoColumns"}),rp=Se({prop:"gridAutoRows"}),op=Se({prop:"gridTemplateColumns"}),ip=Se({prop:"gridTemplateRows"}),sp=Se({prop:"gridTemplateAreas"}),ap=Se({prop:"gridArea"});pr(gr,mr,hr,Qd,ep,tp,np,rp,op,ip,sp,ap);function Lt(e,t){return t==="grey"?t:e}const lp=Se({prop:"color",themeKey:"palette",transform:Lt}),cp=Se({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Lt}),up=Se({prop:"backgroundColor",themeKey:"palette",transform:Lt});pr(lp,cp,up);function Ve(e){return e<=1&&e!==0?`${e*100}%`:e}const dp=Se({prop:"width",transform:Ve}),To=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||ko[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:Ve(n)}};return lt(e,e.maxWidth,t)}return null};To.filterProps=["maxWidth"];const pp=Se({prop:"minWidth",transform:Ve}),fp=Se({prop:"height",transform:Ve}),gp=Se({prop:"maxHeight",transform:Ve}),mp=Se({prop:"minHeight",transform:Ve});Se({prop:"size",cssProperty:"width",transform:Ve});Se({prop:"size",cssProperty:"height",transform:Ve});const hp=Se({prop:"boxSizing"});pr(dp,To,pp,fp,gp,mp,hp);const vp={border:{themeKey:"borders",transform:He},borderTop:{themeKey:"borders",transform:He},borderRight:{themeKey:"borders",transform:He},borderBottom:{themeKey:"borders",transform:He},borderLeft:{themeKey:"borders",transform:He},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:He},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:fr},color:{themeKey:"palette",transform:Lt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Lt},backgroundColor:{themeKey:"palette",transform:Lt},p:{style:ye},pt:{style:ye},pr:{style:ye},pb:{style:ye},pl:{style:ye},px:{style:ye},py:{style:ye},padding:{style:ye},paddingTop:{style:ye},paddingRight:{style:ye},paddingBottom:{style:ye},paddingLeft:{style:ye},paddingX:{style:ye},paddingY:{style:ye},paddingInline:{style:ye},paddingInlineStart:{style:ye},paddingInlineEnd:{style:ye},paddingBlock:{style:ye},paddingBlockStart:{style:ye},paddingBlockEnd:{style:ye},m:{style:be},mt:{style:be},mr:{style:be},mb:{style:be},ml:{style:be},mx:{style:be},my:{style:be},margin:{style:be},marginTop:{style:be},marginRight:{style:be},marginBottom:{style:be},marginLeft:{style:be},marginX:{style:be},marginY:{style:be},marginInline:{style:be},marginInlineStart:{style:be},marginInlineEnd:{style:be},marginBlock:{style:be},marginBlockStart:{style:be},marginBlockEnd:{style:be},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:gr},rowGap:{style:hr},columnGap:{style:mr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ve},maxWidth:{style:To},minWidth:{transform:Ve},height:{transform:Ve},maxHeight:{transform:Ve},minHeight:{transform:Ve},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Po=vp;function bp(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function yp(e,t){return typeof e=="function"?e(t):e}function wp(){function e(n,r,o,i){const s={[n]:r,theme:o},a=i[n];if(!a)return{[n]:r};const{cssProperty:c=n,themeKey:u,transform:d,style:g}=a;if(r==null)return null;if(u==="typography"&&r==="inherit")return{[n]:r};const f=cr(o,u)||{};return g?g(s):lt(s,r,h=>{let m=Qn(f,d,h);return h===m&&typeof h=="string"&&(m=Qn(f,d,`${n}${h==="default"?"":Je(h)}`,h)),c===!1?m:{[c]:m}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const s=(r=i.unstable_sxConfig)!=null?r:Po;function a(c){let u=c;if(typeof c=="function")u=c(i);else if(typeof c!="object")return c;if(!u)return null;const d=Nd(i.breakpoints),g=Object.keys(d);let f=d;return Object.keys(u).forEach(p=>{const h=yp(u[p],i);if(h!=null)if(typeof h=="object")if(s[p])f=vn(f,e(p,h,i,s));else{const m=lt({theme:i},h,v=>({[p]:v}));bp(m,h)?f[p]=t({sx:h,theme:i}):f=vn(f,m)}else f=vn(f,e(p,h,i,s))}),$d(g,f)}return Array.isArray(o)?o.map(a):a(o)}return t}const ta=wp();ta.filterProps=["sx"];const Oo=ta;function xp(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Sp=["breakpoints","palette","spacing","shape"];function _o(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,s=fe(e,Sp),a=Td(n),c=Ld(o);let u=it({breakpoints:a,direction:"ltr",components:{},palette:E({mode:"light"},r),spacing:c,shape:E({},Od,i)},s);return u.applyStyles=xp,u=t.reduce((d,g)=>it(d,g),u),u.unstable_sxConfig=E({},Po,s==null?void 0:s.unstable_sxConfig),u.unstable_sx=function(g){return Oo({sx:g,theme:this})},u}function Cp(e){return Object.keys(e).length===0}function na(e=null){const t=C.useContext(Gr.ThemeContext);return!t||Cp(t)?e:t}const Ep=_o();function ra(e=Ep){return na(e)}const Rp=["ownerState"],kp=["variants"],Tp=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Pp(e){return Object.keys(e).length===0}function Op(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Gn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const _p=_o(),Fi=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function An({defaultTheme:e,theme:t,themeId:n}){return Pp(t)?e:t[n]||t}function Np(e){return e?(t,n)=>n[e]:null}function Un(e,t){let{ownerState:n}=t,r=fe(t,Rp);const o=typeof e=="function"?e(E({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>Un(i,E({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let a=fe(o,kp);return i.forEach(c=>{let u=!0;typeof c.props=="function"?u=c.props(E({ownerState:n},r,n)):Object.keys(c.props).forEach(d=>{(n==null?void 0:n[d])!==c.props[d]&&r[d]!==c.props[d]&&(u=!1)}),u&&(Array.isArray(a)||(a=[a]),a.push(typeof c.style=="function"?c.style(E({ownerState:n},r,n)):c.style))}),a}return o}function $p(e={}){const{themeId:t,defaultTheme:n=_p,rootShouldForwardProp:r=Gn,slotShouldForwardProp:o=Gn}=e,i=s=>Oo(E({},s,{theme:An(E({},s,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(s,a={})=>{Gr.internal_processStyles(s,y=>y.filter(k=>!(k!=null&&k.__mui_systemSx)));const{name:c,slot:u,skipVariantsResolver:d,skipSx:g,overridesResolver:f=Np(Fi(u))}=a,p=fe(a,Tp),h=d!==void 0?d:u&&u!=="Root"&&u!=="root"||!1,m=g||!1;let v;process.env.NODE_ENV!=="production"&&c&&(v=`${c}-${Fi(u||"Root")}`);let w=Gn;u==="Root"||u==="root"?w=r:u?w=o:Op(s)&&(w=void 0);const P=Gr(s,E({shouldForwardProp:w,label:v},p)),x=y=>typeof y=="function"&&y.__emotion_real!==y||Et(y)?k=>Un(y,E({},k,{theme:An({theme:k.theme,defaultTheme:n,themeId:t})})):y,S=(y,...k)=>{let O=x(y);const F=k?k.map(x):[];c&&f&&F.push(T=>{const $=An(E({},T,{defaultTheme:n,themeId:t}));if(!$.components||!$.components[c]||!$.components[c].styleOverrides)return null;const N=$.components[c].styleOverrides,L={};return Object.entries(N).forEach(([A,M])=>{L[A]=Un(M,E({},T,{theme:$}))}),f(T,L)}),c&&!h&&F.push(T=>{var $;const N=An(E({},T,{defaultTheme:n,themeId:t})),L=N==null||($=N.components)==null||($=$[c])==null?void 0:$.variants;return Un({variants:L},E({},T,{theme:N}))}),m||F.push(i);const V=F.length-k.length;if(Array.isArray(y)&&V>0){const T=new Array(V).fill("");O=[...y,...T],O.raw=[...y.raw,...T]}const B=P(O,...F);if(process.env.NODE_ENV!=="production"){let T;c&&(T=`${c}${Je(u||"")}`),T===void 0&&(T=`Styled(${hc(s)})`),B.displayName=T}return s.muiName&&(B.muiName=s.muiName),B};return P.withConfig&&(S.withConfig=P.withConfig),S}}function Mp(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:js(t.components[n].defaultProps,r)}function Ip({props:e,name:t,defaultTheme:n,themeId:r}){let o=ra(n);return r&&(o=o[r]||o),Mp({theme:o,name:t,props:e})}function No(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Vc(e,t,n)}function jp(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function _t(e){if(e.type)return e;if(e.charAt(0)==="#")return _t(jp(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Bt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Bt(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function vr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function Dp(e){e=_t(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),s=(u,d=(u+n/30)%12)=>o-i*Math.max(Math.min(d-3,9-d,1),-1);let a="rgb";const c=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(a+="a",c.push(t[3])),vr({type:a,values:c})}function Vi(e){e=_t(e);let t=e.type==="hsl"||e.type==="hsla"?_t(Dp(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Li(e,t){const n=Vi(e),r=Vi(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function er(e,t){return e=_t(e),t=No(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,vr(e)}function Ap(e,t){if(e=_t(e),t=No(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return vr(e)}function Fp(e,t){if(e=_t(e),t=No(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return vr(e)}function Vp(e,t){return E({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const Lp={black:"#000",white:"#fff"},Cn=Lp,Bp={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},zp=Bp,Hp={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},$t=Hp,Gp={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Mt=Gp,Up={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},on=Up,qp={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},It=qp,Wp={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},jt=Wp,Xp={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Dt=Xp,Yp=["mode","contrastThreshold","tonalOffset"],Bi={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Cn.white,default:Cn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},$r={text:{primary:Cn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Cn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function zi(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=Fp(e.main,o):t==="dark"&&(e.dark=Ap(e.main,i)))}function Kp(e="light"){return e==="dark"?{main:It[200],light:It[50],dark:It[400]}:{main:It[700],light:It[400],dark:It[800]}}function Jp(e="light"){return e==="dark"?{main:$t[200],light:$t[50],dark:$t[400]}:{main:$t[500],light:$t[300],dark:$t[700]}}function Zp(e="light"){return e==="dark"?{main:Mt[500],light:Mt[300],dark:Mt[700]}:{main:Mt[700],light:Mt[400],dark:Mt[800]}}function Qp(e="light"){return e==="dark"?{main:jt[400],light:jt[300],dark:jt[700]}:{main:jt[700],light:jt[500],dark:jt[900]}}function ef(e="light"){return e==="dark"?{main:Dt[400],light:Dt[300],dark:Dt[700]}:{main:Dt[800],light:Dt[500],dark:Dt[900]}}function tf(e="light"){return e==="dark"?{main:on[400],light:on[300],dark:on[700]}:{main:"#ed6c02",light:on[500],dark:on[900]}}function nf(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=fe(e,Yp),i=e.primary||Kp(t),s=e.secondary||Jp(t),a=e.error||Zp(t),c=e.info||Qp(t),u=e.success||ef(t),d=e.warning||tf(t);function g(m){const v=Li(m,$r.text.primary)>=n?$r.text.primary:Bi.text.primary;if(process.env.NODE_ENV!=="production"){const w=Li(m,v);w<3&&console.error([`MUI: The contrast ratio of ${w}:1 for ${v} on ${m}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return v}const f=({color:m,name:v,mainShade:w=500,lightShade:P=300,darkShade:x=700})=>{if(m=E({},m),!m.main&&m[w]&&(m.main=m[w]),!m.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${v?` (${v})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${w}\` property.`:Bt(11,v?` (${v})`:"",w));if(typeof m.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${v?` (${v})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Bt(12,v?` (${v})`:"",JSON.stringify(m.main)));return zi(m,"light",P,r),zi(m,"dark",x,r),m.contrastText||(m.contrastText=g(m.main)),m},p={dark:$r,light:Bi};return process.env.NODE_ENV!=="production"&&(p[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),it(E({common:E({},Cn),mode:t,primary:f({color:i,name:"primary"}),secondary:f({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:f({color:a,name:"error"}),warning:f({color:d,name:"warning"}),info:f({color:c,name:"info"}),success:f({color:u,name:"success"}),grey:zp,contrastThreshold:n,getContrastText:g,augmentColor:f,tonalOffset:r},p[t]),o)}const rf=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function of(e){return Math.round(e*1e5)/1e5}const Hi={textTransform:"uppercase"},Gi='"Roboto", "Helvetica", "Arial", sans-serif';function sf(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Gi,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:s=400,fontWeightMedium:a=500,fontWeightBold:c=700,htmlFontSize:u=16,allVariants:d,pxToRem:g}=n,f=fe(n,rf);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const p=o/14,h=g||(w=>`${w/u*p}rem`),m=(w,P,x,S,y)=>E({fontFamily:r,fontWeight:w,fontSize:h(P),lineHeight:x},r===Gi?{letterSpacing:`${of(S/P)}em`}:{},y,d),v={h1:m(i,96,1.167,-1.5),h2:m(i,60,1.2,-.5),h3:m(s,48,1.167,0),h4:m(s,34,1.235,.25),h5:m(s,24,1.334,0),h6:m(a,20,1.6,.15),subtitle1:m(s,16,1.75,.15),subtitle2:m(a,14,1.57,.1),body1:m(s,16,1.5,.15),body2:m(s,14,1.43,.15),button:m(a,14,1.75,.4,Hi),caption:m(s,12,1.66,.4),overline:m(s,12,2.66,1,Hi),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return it(E({htmlFontSize:u,pxToRem:h,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:s,fontWeightMedium:a,fontWeightBold:c},v),f,{clone:!1})}const af=.2,lf=.14,cf=.12;function he(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${af})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${lf})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${cf})`].join(",")}const uf=["none",he(0,2,1,-1,0,1,1,0,0,1,3,0),he(0,3,1,-2,0,2,2,0,0,1,5,0),he(0,3,3,-2,0,3,4,0,0,1,8,0),he(0,2,4,-1,0,4,5,0,0,1,10,0),he(0,3,5,-1,0,5,8,0,0,1,14,0),he(0,3,5,-1,0,6,10,0,0,1,18,0),he(0,4,5,-2,0,7,10,1,0,2,16,1),he(0,5,5,-3,0,8,10,1,0,3,14,2),he(0,5,6,-3,0,9,12,1,0,3,16,2),he(0,6,6,-3,0,10,14,1,0,4,18,3),he(0,6,7,-4,0,11,15,1,0,4,20,3),he(0,7,8,-4,0,12,17,2,0,5,22,4),he(0,7,8,-4,0,13,19,2,0,5,24,4),he(0,7,9,-4,0,14,21,2,0,5,26,4),he(0,8,9,-5,0,15,22,2,0,6,28,5),he(0,8,10,-5,0,16,24,2,0,6,30,5),he(0,8,11,-5,0,17,26,2,0,6,32,5),he(0,9,11,-5,0,18,28,2,0,7,34,6),he(0,9,12,-6,0,19,29,2,0,7,36,6),he(0,10,13,-6,0,20,31,3,0,8,38,7),he(0,10,13,-6,0,21,33,3,0,8,40,7),he(0,10,14,-6,0,22,35,3,0,8,42,7),he(0,11,14,-7,0,23,36,3,0,9,44,8),he(0,11,15,-7,0,24,38,3,0,9,46,8)],df=uf,pf=["duration","easing","delay"],ff={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},gf={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Ui(e){return`${Math.round(e)}ms`}function mf(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function hf(e){const t=E({},ff,e.easing),n=E({},gf,e.duration);return E({getAutoHeightDuration:mf,create:(o=["all"],i={})=>{const{duration:s=n.standard,easing:a=t.easeInOut,delay:c=0}=i,u=fe(i,pf);if(process.env.NODE_ENV!=="production"){const d=f=>typeof f=="string",g=f=>!isNaN(parseFloat(f));!d(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!g(s)&&!d(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),d(a)||console.error('MUI: Argument "easing" must be a string.'),!g(c)&&!d(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(d=>`${d} ${typeof s=="string"?s:Ui(s)} ${a} ${typeof c=="string"?c:Ui(c)}`).join(",")}},e,{easing:t,duration:n})}const vf={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},bf=vf,yf=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function wf(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,s=fe(e,yf);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Bt(18));const a=nf(r),c=_o(e);let u=it(c,{mixins:Vp(c.breakpoints,n),palette:a,shadows:df.slice(),typography:sf(a,i),transitions:hf(o),zIndex:E({},bf)});if(u=it(u,s),u=t.reduce((d,g)=>it(d,g),u),process.env.NODE_ENV!=="production"){const d=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],g=(f,p)=>{let h;for(h in f){const m=f[h];if(d.indexOf(h)!==-1&&Object.keys(m).length>0){if(process.env.NODE_ENV!=="production"){const v=Qe("",h);console.error([`MUI: The \`${p}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(f,null,2),"",`Instead, you need to use the '&.${v}' syntax:`,JSON.stringify({root:{[`&.${v}`]:m}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}f[h]={}}}};Object.keys(u.components).forEach(f=>{const p=u.components[f].styleOverrides;p&&f.indexOf("Mui")===0&&g(p,f)})}return u.unstable_sxConfig=E({},Po,s==null?void 0:s.unstable_sxConfig),u.unstable_sx=function(g){return Oo({sx:g,theme:this})},u}const xf=wf(),$o=xf,Mo="$$material",oa=e=>Gn(e)&&e!=="classes",Sf=$p({themeId:Mo,defaultTheme:$o,rootShouldForwardProp:oa}),Oe=Sf;function Nn(){const e=ra($o);return process.env.NODE_ENV!=="production"&&C.useDebugValue(e),e[Mo]||e}function ut({props:e,name:t}){return Ip({props:e,name:t,defaultTheme:$o,themeId:Mo})}function Qr(e,t){return Qr=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},Qr(e,t)}function Cf(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Qr(e,t)}const qi={disabled:!1};var Ef=process.env.NODE_ENV!=="production"?l.oneOfType([l.number,l.shape({enter:l.number,exit:l.number,appear:l.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&l.oneOfType([l.string,l.shape({enter:l.string,exit:l.string,active:l.string}),l.shape({enter:l.string,enterDone:l.string,enterActive:l.string,exit:l.string,exitDone:l.string,exitActive:l.string})]);const ia=I.createContext(null);var Rf=function(t){return t.scrollTop},pn="unmounted",xt="exited",St="entering",Vt="entered",eo="exiting",dt=function(e){Cf(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var s=o,a=s&&!s.isMounting?r.enter:r.appear,c;return i.appearStatus=null,r.in?a?(c=xt,i.appearStatus=St):c=Vt:r.unmountOnExit||r.mountOnEnter?c=pn:c=xt,i.state={status:c},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var s=o.in;return s&&i.status===pn?{status:xt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==St&&s!==Vt&&(i=St):(s===St||s===Vt)&&(i=eo)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,s,a;return i=s=a=o,o!=null&&typeof o!="number"&&(i=o.exit,s=o.enter,a=o.appear!==void 0?o.appear:s),{exit:i,enter:s,appear:a}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===St){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:cn.findDOMNode(this);s&&Rf(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===xt&&this.setState({status:pn})},n.performEnter=function(o){var i=this,s=this.props.enter,a=this.context?this.context.isMounting:o,c=this.props.nodeRef?[a]:[cn.findDOMNode(this),a],u=c[0],d=c[1],g=this.getTimeouts(),f=a?g.appear:g.enter;if(!o&&!s||qi.disabled){this.safeSetState({status:Vt},function(){i.props.onEntered(u)});return}this.props.onEnter(u,d),this.safeSetState({status:St},function(){i.props.onEntering(u,d),i.onTransitionEnd(f,function(){i.safeSetState({status:Vt},function(){i.props.onEntered(u,d)})})})},n.performExit=function(){var o=this,i=this.props.exit,s=this.getTimeouts(),a=this.props.nodeRef?void 0:cn.findDOMNode(this);if(!i||qi.disabled){this.safeSetState({status:xt},function(){o.props.onExited(a)});return}this.props.onExit(a),this.safeSetState({status:eo},function(){o.props.onExiting(a),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:xt},function(){o.props.onExited(a)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,s=!0;return this.nextCallback=function(a){s&&(s=!1,i.nextCallback=null,o(a))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var s=this.props.nodeRef?this.props.nodeRef.current:cn.findDOMNode(this),a=o==null&&!this.props.addEndListener;if(!s||a){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],u=c[0],d=c[1];this.props.addEndListener(u,d)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===pn)return null;var i=this.props,s=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var a=fe(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return I.createElement(ia.Provider,{value:null},typeof s=="function"?s(o,a):I.cloneElement(I.Children.only(s),a))},t}(I.Component);dt.contextType=ia;dt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:l.shape({current:typeof Element>"u"?l.any:function(e,t,n,r,o,i){var s=e[t];return l.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:l.oneOfType([l.func.isRequired,l.element.isRequired]).isRequired,in:l.bool,mountOnEnter:l.bool,unmountOnExit:l.bool,appear:l.bool,enter:l.bool,exit:l.bool,timeout:function(t){var n=Ef;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:l.func,onEnter:l.func,onEntering:l.func,onEntered:l.func,onExit:l.func,onExiting:l.func,onExited:l.func}:{};function At(){}dt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:At,onEntering:At,onEntered:At,onExit:At,onExiting:At,onExited:At};dt.UNMOUNTED=pn;dt.EXITED=xt;dt.ENTERING=St;dt.ENTERED=Vt;dt.EXITING=eo;const sa=dt,aa=e=>e.scrollTop;function tr(e,t){var n,r;const{timeout:o,easing:i,style:s={}}=e;return{duration:(n=s.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:s.transitionDelay}}const kf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function to(e){return`scale(${e}, ${e**2})`}const Tf={entering:{opacity:1,transform:to(1)},entered:{opacity:1,transform:"none"}},Mr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Io=C.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:s,in:a,onEnter:c,onEntered:u,onEntering:d,onExit:g,onExited:f,onExiting:p,style:h,timeout:m="auto",TransitionComponent:v=sa}=t,w=fe(t,kf),P=un(),x=C.useRef(),S=Nn(),y=C.useRef(null),k=Ue(y,i.ref,n),O=A=>M=>{if(A){const z=y.current;M===void 0?A(z):A(z,M)}},F=O(d),V=O((A,M)=>{aa(A);const{duration:z,delay:ne,easing:te}=tr({style:h,timeout:m,easing:s},{mode:"enter"});let R;m==="auto"?(R=S.transitions.getAutoHeightDuration(A.clientHeight),x.current=R):R=z,A.style.transition=[S.transitions.create("opacity",{duration:R,delay:ne}),S.transitions.create("transform",{duration:Mr?R:R*.666,delay:ne,easing:te})].join(","),c&&c(A,M)}),B=O(u),T=O(p),$=O(A=>{const{duration:M,delay:z,easing:ne}=tr({style:h,timeout:m,easing:s},{mode:"exit"});let te;m==="auto"?(te=S.transitions.getAutoHeightDuration(A.clientHeight),x.current=te):te=M,A.style.transition=[S.transitions.create("opacity",{duration:te,delay:z}),S.transitions.create("transform",{duration:Mr?te:te*.666,delay:Mr?z:z||te*.333,easing:ne})].join(","),A.style.opacity=0,A.style.transform=to(.75),g&&g(A)}),N=O(f),L=A=>{m==="auto"&&P.start(x.current||0,A),r&&r(y.current,A)};return b.jsx(v,E({appear:o,in:a,nodeRef:y,onEnter:V,onEntered:B,onEntering:F,onExit:$,onExited:N,onExiting:T,addEndListener:L,timeout:m==="auto"?null:m},w,{children:(A,M)=>C.cloneElement(i,E({style:E({opacity:0,transform:to(.75),visibility:A==="exited"&&!a?"hidden":void 0},Tf[A],h,i.props.style),ref:k},M))}))});process.env.NODE_ENV!=="production"&&(Io.propTypes={addEndListener:l.func,appear:l.bool,children:Rn.isRequired,easing:l.oneOfType([l.shape({enter:l.string,exit:l.string}),l.string]),in:l.bool,onEnter:l.func,onEntered:l.func,onEntering:l.func,onExit:l.func,onExited:l.func,onExiting:l.func,style:l.object,timeout:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});Io.muiSupportAuto=!0;const no=Io,Pf=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},Wi=Pf,Of=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],_f=Oe(Zs,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),la=C.forwardRef(function(t,n){var r;const o=na(),i=ut({props:t,name:"MuiPopper"}),{anchorEl:s,component:a,components:c,componentsProps:u,container:d,disablePortal:g,keepMounted:f,modifiers:p,open:h,placement:m,popperOptions:v,popperRef:w,transition:P,slots:x,slotProps:S}=i,y=fe(i,Of),k=(r=x==null?void 0:x.root)!=null?r:c==null?void 0:c.Root,O=E({anchorEl:s,container:d,disablePortal:g,keepMounted:f,modifiers:p,open:h,placement:m,popperOptions:v,popperRef:w,transition:P},y);return b.jsx(_f,E({as:a,direction:o==null?void 0:o.direction,slots:{root:k},slotProps:S??u},O,{ref:n}))});process.env.NODE_ENV!=="production"&&(la.propTypes={anchorEl:l.oneOfType([st,l.object,l.func]),children:l.oneOfType([l.node,l.func]),component:l.elementType,components:l.shape({Root:l.elementType}),componentsProps:l.shape({root:l.oneOfType([l.func,l.object])}),container:l.oneOfType([st,l.func]),disablePortal:l.bool,keepMounted:l.bool,modifiers:l.arrayOf(l.shape({data:l.object,effect:l.func,enabled:l.bool,fn:l.func,name:l.any,options:l.object,phase:l.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:l.arrayOf(l.string),requiresIfExists:l.arrayOf(l.string)})),open:l.bool.isRequired,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:l.shape({modifiers:l.array,onFirstUpdate:l.func,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:l.oneOf(["absolute","fixed"])}),popperRef:bo,slotProps:l.shape({root:l.oneOfType([l.func,l.object])}),slots:l.shape({root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transition:l.bool});const ca=la;function Nf(e){return Qe("MuiTooltip",e)}const $f=ht("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),ft=$f,Mf=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function If(e){return Math.round(e*1e5)/1e5}const jf=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,s={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Je(i.split("-")[0])}`],arrow:["arrow"]};return ct(s,Nf,t)},Df=Oe(ca,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>E({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${ft.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${ft.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${ft.arrow}`]:E({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${ft.arrow}`]:E({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Af=Oe("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Je(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>E({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:er(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${If(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${ft.popper}[data-popper-placement*="left"] &`]:E({transformOrigin:"right center"},t.isRtl?E({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):E({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${ft.popper}[data-popper-placement*="right"] &`]:E({transformOrigin:"left center"},t.isRtl?E({marginRight:"14px"},t.touch&&{marginRight:"24px"}):E({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${ft.popper}[data-popper-placement*="top"] &`]:E({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${ft.popper}[data-popper-placement*="bottom"] &`]:E({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Ff=Oe("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:er(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Fn=!1;const Xi=new kn;let sn={x:0,y:0};function Vn(e,t){return n=>{t&&t(n),e(n)}}const ua=C.forwardRef(function(t,n){var r,o,i,s,a,c,u,d,g,f,p,h,m,v,w,P,x,S,y;const k=ut({props:t,name:"MuiTooltip"}),{arrow:O=!1,children:F,components:V={},componentsProps:B={},describeChild:T=!1,disableFocusListener:$=!1,disableHoverListener:N=!1,disableInteractive:L=!1,disableTouchListener:A=!1,enterDelay:M=100,enterNextDelay:z=0,enterTouchDelay:ne=700,followCursor:te=!1,id:R,leaveDelay:D=0,leaveTouchDelay:G=1500,onClose:Y,onOpen:H,open:U,placement:W="bottom",PopperComponent:X,PopperProps:q={},slotProps:K={},slots:Q={},title:se,TransitionComponent:j=no,TransitionProps:ee}=k,_=fe(k,Mf),ae=C.isValidElement(F)?F:b.jsx("span",{children:F}),Ce=Nn(),_e=Ce.direction==="rtl",[we,yt]=C.useState(),[Ne,et]=C.useState(null),De=C.useRef(!1),tt=L||te,Ee=un(),Nt=un(),wt=un(),Kt=un(),[$n,Go]=Os({controlled:U,default:!1,name:"Tooltip",state:"open"});let nt=$n;if(process.env.NODE_ENV!=="production"){const{current:oe}=C.useRef(U!==void 0);C.useEffect(()=>{we&&we.disabled&&!oe&&se!==""&&we.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[se,we,oe])}const yr=Ps(R),Jt=C.useRef(),Mn=yn(()=>{Jt.current!==void 0&&(document.body.style.WebkitUserSelect=Jt.current,Jt.current=void 0),Kt.clear()});C.useEffect(()=>Mn,[Mn]);const Uo=oe=>{Xi.clear(),Fn=!0,Go(!0),H&&!nt&&H(oe)},In=yn(oe=>{Xi.start(800+D,()=>{Fn=!1}),Go(!1),Y&&nt&&Y(oe),Ee.start(Ce.transitions.duration.shortest,()=>{De.current=!1})}),wr=oe=>{De.current&&oe.type!=="touchstart"||(we&&we.removeAttribute("title"),Nt.clear(),wt.clear(),M||Fn&&z?Nt.start(Fn?z:M,()=>{Uo(oe)}):Uo(oe))},qo=oe=>{Nt.clear(),wt.start(D,()=>{In(oe)})},{isFocusVisibleRef:Wo,onBlur:Qa,onFocus:el,ref:tl}=_s(),[,Xo]=C.useState(!1),Yo=oe=>{Qa(oe),Wo.current===!1&&(Xo(!1),qo(oe))},Ko=oe=>{we||yt(oe.currentTarget),el(oe),Wo.current===!0&&(Xo(!0),wr(oe))},Jo=oe=>{De.current=!0;const Ae=ae.props;Ae.onTouchStart&&Ae.onTouchStart(oe)},Zo=wr,Qo=qo,nl=oe=>{Jo(oe),wt.clear(),Ee.clear(),Mn(),Jt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Kt.start(ne,()=>{document.body.style.WebkitUserSelect=Jt.current,wr(oe)})},rl=oe=>{ae.props.onTouchEnd&&ae.props.onTouchEnd(oe),Mn(),wt.start(G,()=>{In(oe)})};C.useEffect(()=>{if(!nt)return;function oe(Ae){(Ae.key==="Escape"||Ae.key==="Esc")&&In(Ae)}return document.addEventListener("keydown",oe),()=>{document.removeEventListener("keydown",oe)}},[In,nt]);const ol=Ue(ae.ref,tl,yt,n);!se&&se!==0&&(nt=!1);const xr=C.useRef(),il=oe=>{const Ae=ae.props;Ae.onMouseMove&&Ae.onMouseMove(oe),sn={x:oe.clientX,y:oe.clientY},xr.current&&xr.current.update()},Zt={},Sr=typeof se=="string";T?(Zt.title=!nt&&Sr&&!N?se:null,Zt["aria-describedby"]=nt?yr:null):(Zt["aria-label"]=Sr?se:null,Zt["aria-labelledby"]=nt&&!Sr?yr:null);const ze=E({},Zt,_,ae.props,{className:Te(_.className,ae.props.className),onTouchStart:Jo,ref:ol},te?{onMouseMove:il}:{});process.env.NODE_ENV!=="production"&&(ze["data-mui-internal-clone-element"]=!0,C.useEffect(()=>{we&&!we.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[we]));const Qt={};A||(ze.onTouchStart=nl,ze.onTouchEnd=rl),N||(ze.onMouseOver=Vn(Zo,ze.onMouseOver),ze.onMouseLeave=Vn(Qo,ze.onMouseLeave),tt||(Qt.onMouseOver=Zo,Qt.onMouseLeave=Qo)),$||(ze.onFocus=Vn(Ko,ze.onFocus),ze.onBlur=Vn(Yo,ze.onBlur),tt||(Qt.onFocus=Ko,Qt.onBlur=Yo)),process.env.NODE_ENV!=="production"&&ae.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ae.props.title}\` or the Tooltip component.`].join(`
`));const sl=C.useMemo(()=>{var oe;let Ae=[{name:"arrow",enabled:!!Ne,options:{element:Ne,padding:4}}];return(oe=q.popperOptions)!=null&&oe.modifiers&&(Ae=Ae.concat(q.popperOptions.modifiers)),E({},q.popperOptions,{modifiers:Ae})},[Ne,q]),en=E({},k,{isRtl:_e,arrow:O,disableInteractive:tt,placement:W,PopperComponentProp:X,touch:De.current}),Cr=jf(en),ei=(r=(o=Q.popper)!=null?o:V.Popper)!=null?r:Df,ti=(i=(s=(a=Q.transition)!=null?a:V.Transition)!=null?s:j)!=null?i:no,ni=(c=(u=Q.tooltip)!=null?u:V.Tooltip)!=null?c:Af,ri=(d=(g=Q.arrow)!=null?g:V.Arrow)!=null?d:Ff,al=dn(ei,E({},q,(f=K.popper)!=null?f:B.popper,{className:Te(Cr.popper,q==null?void 0:q.className,(p=(h=K.popper)!=null?h:B.popper)==null?void 0:p.className)}),en),ll=dn(ti,E({},ee,(m=K.transition)!=null?m:B.transition),en),cl=dn(ni,E({},(v=K.tooltip)!=null?v:B.tooltip,{className:Te(Cr.tooltip,(w=(P=K.tooltip)!=null?P:B.tooltip)==null?void 0:w.className)}),en),ul=dn(ri,E({},(x=K.arrow)!=null?x:B.arrow,{className:Te(Cr.arrow,(S=(y=K.arrow)!=null?y:B.arrow)==null?void 0:S.className)}),en);return b.jsxs(C.Fragment,{children:[C.cloneElement(ae,ze),b.jsx(ei,E({as:X??ca,placement:W,anchorEl:te?{getBoundingClientRect:()=>({top:sn.y,left:sn.x,right:sn.x,bottom:sn.y,width:0,height:0})}:we,popperRef:xr,open:we?nt:!1,id:yr,transition:!0},Qt,al,{popperOptions:sl,children:({TransitionProps:oe})=>b.jsx(ti,E({timeout:Ce.transitions.duration.shorter},oe,ll,{children:b.jsxs(ni,E({},cl,{children:[se,O?b.jsx(ri,E({},ul,{ref:et})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(ua.propTypes={arrow:l.bool,children:Rn.isRequired,classes:l.object,className:l.string,components:l.shape({Arrow:l.elementType,Popper:l.elementType,Tooltip:l.elementType,Transition:l.elementType}),componentsProps:l.shape({arrow:l.object,popper:l.object,tooltip:l.object,transition:l.object}),describeChild:l.bool,disableFocusListener:l.bool,disableHoverListener:l.bool,disableInteractive:l.bool,disableTouchListener:l.bool,enterDelay:l.number,enterNextDelay:l.number,enterTouchDelay:l.number,followCursor:l.bool,id:l.string,leaveDelay:l.number,leaveTouchDelay:l.number,onClose:l.func,onOpen:l.func,open:l.bool,placement:l.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:l.elementType,PopperProps:l.object,slotProps:l.shape({arrow:l.object,popper:l.object,tooltip:l.object,transition:l.object}),slots:l.shape({arrow:l.elementType,popper:l.elementType,tooltip:l.elementType,transition:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),title:l.node,TransitionComponent:l.elementType,TransitionProps:l.object});const Vf=ua;var jo={},da={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(da);var Lf=da.exports,Ir={};function Bf(e){return Qe("MuiSvgIcon",e)}ht("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const zf=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Hf=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Je(t)}`,`fontSize${Je(n)}`]};return ct(o,Bf,r)},Gf=Oe("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Je(n.color)}`],t[`fontSize${Je(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,s,a,c,u,d,g,f,p,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(s=i.pxToRem)==null?void 0:s.call(i,20))||"1.25rem",medium:((a=e.typography)==null||(c=a.pxToRem)==null?void 0:c.call(a,24))||"1.5rem",large:((u=e.typography)==null||(d=u.pxToRem)==null?void 0:d.call(u,35))||"2.1875rem"}[t.fontSize],color:(g=(f=(e.vars||e).palette)==null||(f=f[t.color])==null?void 0:f.main)!=null?g:{action:(p=(e.vars||e).palette)==null||(p=p.action)==null?void 0:p.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),Do=C.forwardRef(function(t,n){const r=ut({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:s="inherit",component:a="svg",fontSize:c="medium",htmlColor:u,inheritViewBox:d=!1,titleAccess:g,viewBox:f="0 0 24 24"}=r,p=fe(r,zf),h=C.isValidElement(o)&&o.type==="svg",m=E({},r,{color:s,component:a,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:d,viewBox:f,hasSvgAsChild:h}),v={};d||(v.viewBox=f);const w=Hf(m);return b.jsxs(Gf,E({as:a,className:Te(w.root,i),focusable:"false",color:u,"aria-hidden":g?void 0:!0,role:g?"img":void 0,ref:n},v,p,h&&o.props,{ownerState:m,children:[h?o.props.children:o,g?b.jsx("title",{children:g}):null]}))});process.env.NODE_ENV!=="production"&&(Do.propTypes={children:l.node,classes:l.object,className:l.string,color:l.oneOfType([l.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),l.string]),component:l.elementType,fontSize:l.oneOfType([l.oneOf(["inherit","large","medium","small"]),l.string]),htmlColor:l.string,inheritViewBox:l.bool,shapeRendering:l.string,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),titleAccess:l.string,viewBox:l.string});Do.muiName="SvgIcon";const Yi=Do;function pa(e,t){function n(r,o){return b.jsx(Yi,E({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Yi.muiName,C.memo(C.forwardRef(n))}const Uf={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Ds.configure(e)}},qf=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Je,createChainedFunction:Xr,createSvgIcon:pa,debounce:Ts,deprecatedPropType:bc,isMuiElement:yc,ownerDocument:Pe,ownerWindow:zt,requirePropFactory:wc,setRef:Yn,unstable_ClassNameGenerator:Uf,unstable_useEnhancedEffect:Tt,unstable_useId:Ps,unsupportedProp:Cc,useControlled:Os,useEventCallback:yn,useForkRef:Ue,useIsFocusVisible:_s},Symbol.toStringTag,{value:"Module"})),Wf=Jl(qf);var Ki;function Xf(){return Ki||(Ki=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Wf}(Ir)),Ir}var Yf=Lf;Object.defineProperty(jo,"__esModule",{value:!0});var fa=jo.default=void 0,Kf=Yf(Xf()),Jf=b;fa=jo.default=(0,Kf.default)((0,Jf.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function Ji(e,t,n){return e?b.jsx(ve.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:b.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Ao(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:s=void 0,hasAutoFocus:a=!1,className:c,isDisabled:u=!1,isDense:d=!0,isSubMenuParent:g=!1,hasDisabledGutters:f=!1,hasDivider:p=!1,focusVisibleClassName:h,id:m,children:v}=e,w=b.jsx(ve.MenuItem,{sx:{lineHeight:.8},autoFocus:a,className:c,disabled:u,dense:d,disableGutters:f,divider:p,focusVisibleClassName:h,onClick:t,id:m,children:n?b.jsxs(b.Fragment,{children:[Ji(i,n,!0),b.jsx(ve.ListItemText,{primary:n,inset:!i&&o}),g?b.jsx(ve.ListItemIcon,{className:"papi-menu-icon-trailing",children:b.jsx(fa,{})}):Ji(s,n,!1)]}):v});return r?b.jsx(Vf,{title:r,placement:"right",children:b.jsx("div",{children:w})}):w}function ga(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Zf(e){const[t,n]=I.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,s=u=>{n(u.currentTarget)},a=()=>{n(void 0)},c=()=>{let u=ga(i).filter(d=>"menuItem"in d.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return u=u.filter(d=>"menuItem"in d.group&&d.group.menuItem===r.id),b.jsx(Fo,{...e,includedGroups:u})};return b.jsxs(b.Fragment,{children:[b.jsx(Ao,{onClick:s,...o,isSubMenuParent:!0}),b.jsx(ve.Menu,{anchorEl:t,open:!!t,onClose:a,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Qf=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function Fo(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:s}=I.useMemo(()=>{const d=o&&o.length>0?o:ga(t).filter(h=>!("menuItem"in h.group)),g=Object.values(d).sort((h,m)=>(h.group.order||0)-(m.group.order||0)),f=[];g.forEach(h=>{Qf(h.id,t.items).forEach(m=>f.push({item:m,isLastItemInGroup:!1})),f.length>0&&(f[f.length-1].isLastItemInGroup=!0)}),f.length>0&&(f[f.length-1].isLastItemInGroup=!1);const p=f.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:f,allowForLeadingIcons:p}},[o,t]),a=({item:d,isLastItemInGroup:g})=>({className:"papi-menu-item",label:d.label,tooltip:d.tooltip,iconPathBefore:"iconPathBefore"in d?d.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in d?d.iconPathAfter:void 0,hasDivider:g,allowForLeadingIcons:s}),[c]=i;if(!c)return b.jsx("div",{});const u=c.item.group;return b.jsx("div",{role:"menu","aria-label":u,children:i.map((d,g)=>{const{item:f}=d,p=a(d);if("command"in f){const h=f.group+g;return b.jsx(Ao,{onClick:m=>{n==null||n(m),r(f)},...p},h)}return b.jsx(Zf,{parentMenuItem:f,parentItemProps:p,...e},u+f.id)})},u)}function eg(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([s,a])=>({id:s,group:a})).filter(s=>"column"in s.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(s=>"column"in s.group&&s.group.column===n)),b.jsx(Fo,{...e,includedGroups:i})}function tg({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return b.jsxs(ve.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[b.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),b.jsx(ve.List,{id:n,dense:!0,className:i??"",children:b.jsx(eg,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function ma({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=I.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(a=>{if(a==="isExtensible")return;const c=a,u=o[c];typeof u=="object"&&typeof u.order=="number"&&!Number.isNaN(u.order)?s.set(u.order,{id:c,metadata:u}):console.warn(`Property ${a} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((a,c)=>(a.metadata.order||0)-(c.metadata.order||0))},[o,r]);return b.jsx(ve.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((s,a)=>b.jsx(tg,{commandHandler:e,menuDefinition:n,...s,className:t},a))})}const ha=C.createContext({});process.env.NODE_ENV!=="production"&&(ha.displayName="ListContext");const ng=ha;function rg(e){return Qe("MuiList",e)}ht("MuiList",["root","padding","dense","subheader"]);const og=["children","className","component","dense","disablePadding","subheader"],ig=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return ct({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},rg,t)},sg=Oe("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>E({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),va=C.forwardRef(function(t,n){const r=ut({props:t,name:"MuiList"}),{children:o,className:i,component:s="ul",dense:a=!1,disablePadding:c=!1,subheader:u}=r,d=fe(r,og),g=C.useMemo(()=>({dense:a}),[a]),f=E({},r,{component:s,dense:a,disablePadding:c}),p=ig(f);return b.jsx(ng.Provider,{value:g,children:b.jsxs(sg,E({as:s,className:Te(p.root,i),ref:n,ownerState:f},d,{children:[u,o]}))})});process.env.NODE_ENV!=="production"&&(va.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,dense:l.bool,disablePadding:l.bool,subheader:l.node,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object])});const ag=va,lg=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function jr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function Zi(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function ba(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function an(e,t,n,r,o,i){let s=!1,a=o(e,t,t?n:!1);for(;a;){if(a===e.firstChild){if(s)return!1;s=!0}const c=r?!1:a.disabled||a.getAttribute("aria-disabled")==="true";if(!a.hasAttribute("tabindex")||!ba(a,i)||c)a=o(e,a,n);else return a.focus(),!0}return!1}const ya=C.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:s,className:a,disabledItemsFocusable:c=!1,disableListWrap:u=!1,onKeyDown:d,variant:g="selectedMenu"}=t,f=fe(t,lg),p=C.useRef(null),h=C.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Tt(()=>{o&&p.current.focus()},[o]),C.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(x,S)=>{const y=!p.current.style.width;if(x.clientHeight<p.current.clientHeight&&y){const k=`${Ns(Pe(x))}px`;p.current.style[S.direction==="rtl"?"paddingLeft":"paddingRight"]=k,p.current.style.width=`calc(100% + ${k})`}return p.current}}),[]);const m=x=>{const S=p.current,y=x.key,k=Pe(S).activeElement;if(y==="ArrowDown")x.preventDefault(),an(S,k,u,c,jr);else if(y==="ArrowUp")x.preventDefault(),an(S,k,u,c,Zi);else if(y==="Home")x.preventDefault(),an(S,null,u,c,jr);else if(y==="End")x.preventDefault(),an(S,null,u,c,Zi);else if(y.length===1){const O=h.current,F=y.toLowerCase(),V=performance.now();O.keys.length>0&&(V-O.lastTime>500?(O.keys=[],O.repeating=!0,O.previousKeyMatched=!0):O.repeating&&F!==O.keys[0]&&(O.repeating=!1)),O.lastTime=V,O.keys.push(F);const B=k&&!O.repeating&&ba(k,O);O.previousKeyMatched&&(B||an(S,k,!1,c,jr,O))?x.preventDefault():O.previousKeyMatched=!1}d&&d(x)},v=Ue(p,n);let w=-1;C.Children.forEach(s,(x,S)=>{if(!C.isValidElement(x)){w===S&&(w+=1,w>=s.length&&(w=-1));return}process.env.NODE_ENV!=="production"&&Xn.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(g==="selectedMenu"&&x.props.selected||w===-1)&&(w=S),w===S&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(w+=1,w>=s.length&&(w=-1))});const P=C.Children.map(s,(x,S)=>{if(S===w){const y={};return i&&(y.autoFocus=!0),x.props.tabIndex===void 0&&g==="selectedMenu"&&(y.tabIndex=0),C.cloneElement(x,y)}return x});return b.jsx(ag,E({role:"menu",ref:v,className:a,onKeyDown:m,tabIndex:o?0:-1},f,{children:P}))});process.env.NODE_ENV!=="production"&&(ya.propTypes={autoFocus:l.bool,autoFocusItem:l.bool,children:l.node,className:l.string,disabledItemsFocusable:l.bool,disableListWrap:l.bool,onKeyDown:l.func,variant:l.oneOf(["menu","selectedMenu"])});const cg=ya,ug=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],dg={entering:{opacity:1},entered:{opacity:1}},wa=C.forwardRef(function(t,n){const r=Nn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:s=!0,children:a,easing:c,in:u,onEnter:d,onEntered:g,onEntering:f,onExit:p,onExited:h,onExiting:m,style:v,timeout:w=o,TransitionComponent:P=sa}=t,x=fe(t,ug),S=C.useRef(null),y=Ue(S,a.ref,n),k=L=>A=>{if(L){const M=S.current;A===void 0?L(M):L(M,A)}},O=k(f),F=k((L,A)=>{aa(L);const M=tr({style:v,timeout:w,easing:c},{mode:"enter"});L.style.webkitTransition=r.transitions.create("opacity",M),L.style.transition=r.transitions.create("opacity",M),d&&d(L,A)}),V=k(g),B=k(m),T=k(L=>{const A=tr({style:v,timeout:w,easing:c},{mode:"exit"});L.style.webkitTransition=r.transitions.create("opacity",A),L.style.transition=r.transitions.create("opacity",A),p&&p(L)}),$=k(h),N=L=>{i&&i(S.current,L)};return b.jsx(P,E({appear:s,in:u,nodeRef:S,onEnter:F,onEntered:V,onEntering:O,onExit:T,onExited:$,onExiting:B,addEndListener:N,timeout:w},x,{children:(L,A)=>C.cloneElement(a,E({style:E({opacity:0,visibility:L==="exited"&&!u?"hidden":void 0},dg[L],v,a.props.style),ref:y},A))}))});process.env.NODE_ENV!=="production"&&(wa.propTypes={addEndListener:l.func,appear:l.bool,children:Rn.isRequired,easing:l.oneOfType([l.shape({enter:l.string,exit:l.string}),l.string]),in:l.bool,onEnter:l.func,onEntered:l.func,onEntering:l.func,onExit:l.func,onExited:l.func,onExiting:l.func,style:l.object,timeout:l.oneOfType([l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});const pg=wa;function fg(e){return Qe("MuiBackdrop",e)}ht("MuiBackdrop",["root","invisible"]);const gg=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],mg=e=>{const{classes:t,invisible:n}=e;return ct({root:["root",n&&"invisible"]},fg,t)},hg=Oe("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>E({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),xa=C.forwardRef(function(t,n){var r,o,i;const s=ut({props:t,name:"MuiBackdrop"}),{children:a,className:c,component:u="div",components:d={},componentsProps:g={},invisible:f=!1,open:p,slotProps:h={},slots:m={},TransitionComponent:v=pg,transitionDuration:w}=s,P=fe(s,gg),x=E({},s,{component:u,invisible:f}),S=mg(x),y=(r=h.root)!=null?r:g.root;return b.jsx(v,E({in:p,timeout:w},P,{children:b.jsx(hg,E({"aria-hidden":!0},y,{as:(o=(i=m.root)!=null?i:d.Root)!=null?o:u,className:Te(S.root,c,y==null?void 0:y.className),ownerState:E({},x,y==null?void 0:y.ownerState),classes:S,ref:n,children:a}))}))});process.env.NODE_ENV!=="production"&&(xa.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,components:l.shape({Root:l.elementType}),componentsProps:l.shape({root:l.object}),invisible:l.bool,open:l.bool.isRequired,slotProps:l.shape({root:l.object}),slots:l.shape({root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),TransitionComponent:l.elementType,transitionDuration:l.oneOfType([l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});const vg=xa;function bg(e){return Qe("MuiModal",e)}ht("MuiModal",["root","hidden","backdrop"]);const yg=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],wg=e=>{const{open:t,exited:n,classes:r}=e;return ct({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},bg,r)},xg=Oe("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>E({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Sg=Oe(vg,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Sa=C.forwardRef(function(t,n){var r,o,i,s,a,c;const u=ut({name:"MuiModal",props:t}),{BackdropComponent:d=Sg,BackdropProps:g,className:f,closeAfterTransition:p=!1,children:h,container:m,component:v,components:w={},componentsProps:P={},disableAutoFocus:x=!1,disableEnforceFocus:S=!1,disableEscapeKeyDown:y=!1,disablePortal:k=!1,disableRestoreFocus:O=!1,disableScrollLock:F=!1,hideBackdrop:V=!1,keepMounted:B=!1,onBackdropClick:T,open:$,slotProps:N,slots:L}=u,A=fe(u,yg),M=E({},u,{closeAfterTransition:p,disableAutoFocus:x,disableEnforceFocus:S,disableEscapeKeyDown:y,disablePortal:k,disableRestoreFocus:O,disableScrollLock:F,hideBackdrop:V,keepMounted:B}),{getRootProps:z,getBackdropProps:ne,getTransitionProps:te,portalRef:R,isTopModal:D,exited:G,hasTransition:Y}=uu(E({},M,{rootRef:n})),H=E({},M,{exited:G}),U=wg(H),W={};if(h.props.tabIndex===void 0&&(W.tabIndex="-1"),Y){const{onEnter:ee,onExited:_}=te();W.onEnter=ee,W.onExited=_}const X=(r=(o=L==null?void 0:L.root)!=null?o:w.Root)!=null?r:xg,q=(i=(s=L==null?void 0:L.backdrop)!=null?s:w.Backdrop)!=null?i:d,K=(a=N==null?void 0:N.root)!=null?a:P.root,Q=(c=N==null?void 0:N.backdrop)!=null?c:P.backdrop,se=Pt({elementType:X,externalSlotProps:K,externalForwardedProps:A,getSlotProps:z,additionalProps:{ref:n,as:v},ownerState:H,className:Te(f,K==null?void 0:K.className,U==null?void 0:U.root,!H.open&&H.exited&&(U==null?void 0:U.hidden))}),j=Pt({elementType:q,externalSlotProps:Q,additionalProps:g,getSlotProps:ee=>ne(E({},ee,{onClick:_=>{T&&T(_),ee!=null&&ee.onClick&&ee.onClick(_)}})),className:Te(Q==null?void 0:Q.className,g==null?void 0:g.className,U==null?void 0:U.backdrop),ownerState:H});return!B&&!$&&(!Y||G)?null:b.jsx(wn,{ref:R,container:m,disablePortal:k,children:b.jsxs(X,E({},se,{children:[!V&&d?b.jsx(q,E({},j)):null,b.jsx(Kn,{disableEnforceFocus:S,disableAutoFocus:x,disableRestoreFocus:O,isEnabled:D,open:$,children:C.cloneElement(h,W)})]}))})});process.env.NODE_ENV!=="production"&&(Sa.propTypes={BackdropComponent:l.elementType,BackdropProps:l.object,children:Rn.isRequired,classes:l.object,className:l.string,closeAfterTransition:l.bool,component:l.elementType,components:l.shape({Backdrop:l.elementType,Root:l.elementType}),componentsProps:l.shape({backdrop:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),container:l.oneOfType([st,l.func]),disableAutoFocus:l.bool,disableEnforceFocus:l.bool,disableEscapeKeyDown:l.bool,disablePortal:l.bool,disableRestoreFocus:l.bool,disableScrollLock:l.bool,hideBackdrop:l.bool,keepMounted:l.bool,onBackdropClick:l.func,onClose:l.func,onTransitionEnter:l.func,onTransitionExited:l.func,open:l.bool.isRequired,slotProps:l.shape({backdrop:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({backdrop:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object])});const Cg=Sa;function Eg(e){return Qe("MuiPaper",e)}ht("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Rg=["className","component","elevation","square","variant"],kg=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return ct(i,Eg,o)},Tg=Oe("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return E({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&E({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${er("#fff",Wi(t.elevation))}, ${er("#fff",Wi(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Ca=C.forwardRef(function(t,n){const r=ut({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:s=1,square:a=!1,variant:c="elevation"}=r,u=fe(r,Rg),d=E({},r,{component:i,elevation:s,square:a,variant:c}),g=kg(d);return process.env.NODE_ENV!=="production"&&Nn().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),b.jsx(Tg,E({as:i,ownerState:d,className:Te(g.root,o),ref:n},u))});process.env.NODE_ENV!=="production"&&(Ca.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,elevation:Yt(Is,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:l.bool,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),variant:l.oneOfType([l.oneOf(["elevation","outlined"]),l.string])});const Pg=Ca;function Og(e){return Qe("MuiPopover",e)}ht("MuiPopover",["root","paper"]);const _g=["onEntering"],Ng=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],$g=["slotProps"];function Qi(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function es(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function ts(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function qn(e){return typeof e=="function"?e():e}const Mg=e=>{const{classes:t}=e;return ct({root:["root"],paper:["paper"]},Og,t)},Ig=Oe(Cg,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ea=Oe(Pg,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Ra=C.forwardRef(function(t,n){var r,o,i;const s=ut({props:t,name:"MuiPopover"}),{action:a,anchorEl:c,anchorOrigin:u={vertical:"top",horizontal:"left"},anchorPosition:d,anchorReference:g="anchorEl",children:f,className:p,container:h,elevation:m=8,marginThreshold:v=16,open:w,PaperProps:P={},slots:x,slotProps:S,transformOrigin:y={vertical:"top",horizontal:"left"},TransitionComponent:k=no,transitionDuration:O="auto",TransitionProps:{onEntering:F}={},disableScrollLock:V=!1}=s,B=fe(s.TransitionProps,_g),T=fe(s,Ng),$=(r=S==null?void 0:S.paper)!=null?r:P,N=C.useRef(),L=Ue(N,$.ref),A=E({},s,{anchorOrigin:u,anchorReference:g,elevation:m,marginThreshold:v,externalPaperSlotProps:$,transformOrigin:y,TransitionComponent:k,transitionDuration:O,TransitionProps:B}),M=Mg(A),z=C.useCallback(()=>{if(g==="anchorPosition")return process.env.NODE_ENV!=="production"&&(d||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),d;const ee=qn(c),_=ee&&ee.nodeType===1?ee:Pe(N.current).body,ae=_.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Ce=_.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Ce.top===0&&Ce.left===0&&Ce.right===0&&Ce.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:ae.top+Qi(ae,u.vertical),left:ae.left+es(ae,u.horizontal)}},[c,u.horizontal,u.vertical,d,g]),ne=C.useCallback(ee=>({vertical:Qi(ee,y.vertical),horizontal:es(ee,y.horizontal)}),[y.horizontal,y.vertical]),te=C.useCallback(ee=>{const _={width:ee.offsetWidth,height:ee.offsetHeight},ae=ne(_);if(g==="none")return{top:null,left:null,transformOrigin:ts(ae)};const Ce=z();let _e=Ce.top-ae.vertical,we=Ce.left-ae.horizontal;const yt=_e+_.height,Ne=we+_.width,et=zt(qn(c)),De=et.innerHeight-v,tt=et.innerWidth-v;if(v!==null&&_e<v){const Ee=_e-v;_e-=Ee,ae.vertical+=Ee}else if(v!==null&&yt>De){const Ee=yt-De;_e-=Ee,ae.vertical+=Ee}if(process.env.NODE_ENV!=="production"&&_.height>De&&_.height&&De&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${_.height-De}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),v!==null&&we<v){const Ee=we-v;we-=Ee,ae.horizontal+=Ee}else if(Ne>tt){const Ee=Ne-tt;we-=Ee,ae.horizontal+=Ee}return{top:`${Math.round(_e)}px`,left:`${Math.round(we)}px`,transformOrigin:ts(ae)}},[c,g,z,ne,v]),[R,D]=C.useState(w),G=C.useCallback(()=>{const ee=N.current;if(!ee)return;const _=te(ee);_.top!==null&&(ee.style.top=_.top),_.left!==null&&(ee.style.left=_.left),ee.style.transformOrigin=_.transformOrigin,D(!0)},[te]);C.useEffect(()=>(V&&window.addEventListener("scroll",G),()=>window.removeEventListener("scroll",G)),[c,V,G]);const Y=(ee,_)=>{F&&F(ee,_),G()},H=()=>{D(!1)};C.useEffect(()=>{w&&G()}),C.useImperativeHandle(a,()=>w?{updatePosition:()=>{G()}}:null,[w,G]),C.useEffect(()=>{if(!w)return;const ee=Ts(()=>{G()}),_=zt(c);return _.addEventListener("resize",ee),()=>{ee.clear(),_.removeEventListener("resize",ee)}},[c,w,G]);let U=O;O==="auto"&&!k.muiSupportAuto&&(U=void 0);const W=h||(c?Pe(qn(c)).body:void 0),X=(o=x==null?void 0:x.root)!=null?o:Ig,q=(i=x==null?void 0:x.paper)!=null?i:Ea,K=Pt({elementType:q,externalSlotProps:E({},$,{style:R?$.style:E({},$.style,{opacity:0})}),additionalProps:{elevation:m,ref:L},ownerState:A,className:Te(M.paper,$==null?void 0:$.className)}),Q=Pt({elementType:X,externalSlotProps:(S==null?void 0:S.root)||{},externalForwardedProps:T,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:W,open:w},ownerState:A,className:Te(M.root,p)}),{slotProps:se}=Q,j=fe(Q,$g);return b.jsx(X,E({},j,!Fs(X)&&{slotProps:se,disableScrollLock:V},{children:b.jsx(k,E({appear:!0,in:w,onEntering:Y,onExited:H,timeout:U},B,{children:b.jsx(q,E({},K,{children:f}))}))}))});process.env.NODE_ENV!=="production"&&(Ra.propTypes={action:bo,anchorEl:Yt(l.oneOfType([st,l.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=qn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:l.shape({horizontal:l.oneOfType([l.oneOf(["center","left","right"]),l.number]).isRequired,vertical:l.oneOfType([l.oneOf(["bottom","center","top"]),l.number]).isRequired}),anchorPosition:l.shape({left:l.number.isRequired,top:l.number.isRequired}),anchorReference:l.oneOf(["anchorEl","anchorPosition","none"]),children:l.node,classes:l.object,className:l.string,container:l.oneOfType([st,l.func]),disableScrollLock:l.bool,elevation:Is,marginThreshold:l.number,onClose:l.func,open:l.bool.isRequired,PaperProps:l.shape({component:uc}),slotProps:l.shape({paper:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({paper:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transformOrigin:l.shape({horizontal:l.oneOfType([l.oneOf(["center","left","right"]),l.number]).isRequired,vertical:l.oneOfType([l.oneOf(["bottom","center","top"]),l.number]).isRequired}),TransitionComponent:l.elementType,transitionDuration:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})]),TransitionProps:l.object});const jg=Ra;function Dg(e){return Qe("MuiMenu",e)}ht("MuiMenu",["root","paper","list"]);const Ag=["onEntering"],Fg=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Vg={vertical:"top",horizontal:"right"},Lg={vertical:"top",horizontal:"left"},Bg=e=>{const{classes:t}=e;return ct({root:["root"],paper:["paper"],list:["list"]},Dg,t)},zg=Oe(jg,{shouldForwardProp:e=>oa(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Hg=Oe(Ea,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),Gg=Oe(cg,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),ka=C.forwardRef(function(t,n){var r,o;const i=ut({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:a,className:c,disableAutoFocusItem:u=!1,MenuListProps:d={},onClose:g,open:f,PaperProps:p={},PopoverClasses:h,transitionDuration:m="auto",TransitionProps:{onEntering:v}={},variant:w="selectedMenu",slots:P={},slotProps:x={}}=i,S=fe(i.TransitionProps,Ag),y=fe(i,Fg),k=Nn(),O=k.direction==="rtl",F=E({},i,{autoFocus:s,disableAutoFocusItem:u,MenuListProps:d,onEntering:v,PaperProps:p,transitionDuration:m,TransitionProps:S,variant:w}),V=Bg(F),B=s&&!u&&f,T=C.useRef(null),$=(te,R)=>{T.current&&T.current.adjustStyleForScrollbar(te,k),v&&v(te,R)},N=te=>{te.key==="Tab"&&(te.preventDefault(),g&&g(te,"tabKeyDown"))};let L=-1;C.Children.map(a,(te,R)=>{C.isValidElement(te)&&(process.env.NODE_ENV!=="production"&&Xn.isFragment(te)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),te.props.disabled||(w==="selectedMenu"&&te.props.selected||L===-1)&&(L=R))});const A=(r=P.paper)!=null?r:Hg,M=(o=x.paper)!=null?o:p,z=Pt({elementType:P.root,externalSlotProps:x.root,ownerState:F,className:[V.root,c]}),ne=Pt({elementType:A,externalSlotProps:M,ownerState:F,className:V.paper});return b.jsx(zg,E({onClose:g,anchorOrigin:{vertical:"bottom",horizontal:O?"right":"left"},transformOrigin:O?Vg:Lg,slots:{paper:A,root:P.root},slotProps:{root:z,paper:ne},open:f,ref:n,transitionDuration:m,TransitionProps:E({onEntering:$},S),ownerState:F},y,{classes:h,children:b.jsx(Gg,E({onKeyDown:N,actions:T,autoFocus:s&&(L===-1||u),autoFocusItem:B,variant:w},d,{className:Te(V.list,d.className),children:a}))}))});process.env.NODE_ENV!=="production"&&(ka.propTypes={anchorEl:l.oneOfType([st,l.func]),autoFocus:l.bool,children:l.node,classes:l.object,className:l.string,disableAutoFocusItem:l.bool,MenuListProps:l.object,onClose:l.func,open:l.bool.isRequired,PaperProps:l.object,PopoverClasses:l.object,slotProps:l.shape({paper:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({paper:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transitionDuration:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})]),TransitionProps:l.object,variant:l.oneOf(["menu","selectedMenu"])});const Ug=ka;function qg({className:e,commandHandler:t,menuDefinition:n,children:r}){var u;const[o,i]=I.useState(void 0),s=I.useCallback(d=>{d.preventDefault(),i(o===void 0?{mouseX:d.clientX+2,mouseY:d.clientY-6}:void 0)},[o]),a=I.useCallback(()=>{i(void 0)},[]),c=I.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((u=n==null?void 0:n.items)==null?void 0:u.length)??0)===0||!r?r:b.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[r,b.jsx(Ug,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:a,anchorReference:"anchorPosition",anchorPosition:c,children:b.jsx(Fo,{menuDefinition:n,commandHandler:t,onClick:a})})]})}const Wg=pa(b.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Xg(e){return{preserveValue:!0,...e}}const nr=(e,t,n={})=>{const r=I.useRef(t);r.current=t;const o=I.useRef(n);o.current=Xg(o.current);const[i,s]=I.useState(()=>r.current),[a,c]=I.useState(!0);return I.useEffect(()=>{let u=!0;return c(!!e),(async()=>{if(e){const d=await e();u&&(s(()=>d),c(!1))}})(),()=>{u=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[i,a]};function Ta({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:i,ariaLabelPrefix:s,children:a}){const[c,u]=I.useState(!1),[d,g]=I.useState(!1),f=I.useCallback(()=>{c&&u(!1),g(!1)},[c]),p=I.useCallback(S=>{S.stopPropagation(),u(y=>{const k=!y;return k&&S.shiftKey?g(!0):k||g(!1),k})},[]),h=I.useCallback(S=>(f(),r(S)),[r,f]),[m,v]=I.useState({top:1,left:1});I.useEffect(()=>{if(c){const S=o==null?void 0:o.current;if(S){const y=S.getBoundingClientRect(),k=window.scrollY,O=window.scrollX,F=y.top+k+S.clientHeight,V=y.left+O;v({top:F,left:V})}}},[c,o]);const[w]=nr(I.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[P]=nr(I.useCallback(async()=>(e==null?void 0:e(!0))??n??w,[e,n,w,c]),n??w),x=d&&P?P:w;return b.jsxs(b.Fragment,{children:[b.jsx(ve.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${i??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:p,children:a??b.jsx(Wg,{})}),b.jsx(ve.Drawer,{className:`papi-menu-drawer ${i??""}`,anchor:"left",variant:"temporary",open:c,onClose:f,PaperProps:{className:"papi-menu-drawer-paper",style:{top:m.top,left:m.left}},children:x?b.jsx(ma,{className:i,id:`${s??""} main menu`,commandHandler:h,multiColumnMenu:x}):void 0})]})}function Yg({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:s="medium",className:a,onClick:c,children:u}){return b.jsx(ve.IconButton,{id:e,disabled:n,edge:i,size:s,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${a??""}`,onClick:c,children:u})}const Kg=as.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),Pa=I.forwardRef(({className:e,...t},n)=>b.jsx(ls.Root,{ref:n,className:re(Kg(),e),...t}));Pa.displayName=ls.Root.displayName;function Vo({id:e,isDisabled:t=!1,hasError:n=!1,helperText:r,label:o,placeholder:i,isRequired:s=!1,className:a,defaultValue:c,value:u,onChange:d,onFocus:g,onBlur:f}){return b.jsxs("div",{className:"pr-inline-grid pr-items-center pr-gap-1.5",children:[b.jsx(Pa,{htmlFor:e,className:re({"pr-text-red-600":n,"pr-hidden":!o}),children:`${o}${s?"*":""}`}),b.jsx(ir,{id:e,disabled:t,placeholder:i,required:s,className:re(a,{"pr-border-red-600":n}),defaultValue:c,value:u,onChange:d,onFocus:g,onBlur:f}),b.jsx("p",{className:re({"pr-hidden":!r}),children:r})]})}function Jg({onSearch:e,placeholder:t}){const[n,r]=I.useState(""),o=i=>{r(i),e(i)};return b.jsx(ve.Paper,{component:"form",className:"search-bar-paper",children:b.jsx(Vo,{className:"search-bar-input",placeholder:t,value:n,onChange:i=>o(i.target.value)})})}function Zg({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:s=!1,defaultValue:a,value:c,valueLabelDisplay:u="off",className:d,onChange:g,onChangeCommitted:f}){return b.jsx(ve.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:s,defaultValue:a,value:c,valueLabelDisplay:u,className:`papi-slider ${n} ${d??""}`,onChange:g,onChangeCommitted:f})}function Qg({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:s,children:a}){const c={action:(s==null?void 0:s.action)||a,message:s==null?void 0:s.message,className:r};return b.jsx(ve.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:c})}function em({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return b.jsx(ve.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function ns({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return b.jsx(Vo,{defaultValue:t[n.key],onChange:r})}const tm=({onChange:e,disabled:t,checked:n,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return b.jsx(ho,{...r,isChecked:n,isDisabled:t,onChange:o})};function nm({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:s,defaultColumnSortable:a=!0,defaultColumnResizable:c=!0,rows:u,enableSelectColumn:d,selectColumnWidth:g=50,rowKeyGetter:f,rowHeight:p=35,headerRowHeight:h=35,selectedRows:m,onSelectedRowsChange:v,onRowsChange:w,onCellClick:P,onCellDoubleClick:x,onCellContextMenu:S,onCellKeyDown:y,direction:k="ltr",enableVirtualization:O=!0,onCopy:F,onPaste:V,onScroll:B,className:T,"data-testid":$}){const N=I.useMemo(()=>{const L=e.map(A=>typeof A.editable=="function"?{...A,editable:z=>!!A.editable(z),renderEditCell:A.renderEditCell||ns}:A.editable&&!A.renderEditCell?{...A,renderEditCell:ns}:A.renderEditCell&&!A.editable?{...A,editable:!1}:A);return d?[{...oi.SelectColumn,minWidth:g},...L]:L},[e,d,g]);return b.jsx(oi,{columns:N,defaultColumnOptions:{width:o,minWidth:i,maxWidth:s,sortable:a,resizable:c},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:u,rowKeyGetter:f,rowHeight:p,headerRowHeight:h,selectedRows:m,onSelectedRowsChange:v,onRowsChange:w,onCellClick:P,onCellDoubleClick:x,onCellContextMenu:S,onCellKeyDown:y,direction:k,enableVirtualization:O,onCopy:F,onPaste:V,onScroll:B,renderers:{renderCheckbox:tm},className:`papi-table ${T??"rdg-light"}`,"data-testid":$})}/**
   * table-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function gt(e,t){return typeof e=="function"?e(t):e}function Be(e,t){return n=>{t.setState(r=>({...r,[e]:gt(n,r[e])}))}}function br(e){return e instanceof Function}function rm(e){return Array.isArray(e)&&e.every(t=>typeof t=="number")}function om(e,t){const n=[],r=o=>{o.forEach(i=>{n.push(i);const s=t(i);s!=null&&s.length&&r(s)})};return r(e),n}function J(e,t,n){let r=[],o;return i=>{let s;n.key&&n.debug&&(s=Date.now());const a=e(i);if(!(a.length!==r.length||a.some((d,g)=>r[g]!==d)))return o;r=a;let u;if(n.key&&n.debug&&(u=Date.now()),o=t(...a),n==null||n.onChange==null||n.onChange(o),n.key&&n.debug&&n!=null&&n.debug()){const d=Math.round((Date.now()-s)*100)/100,g=Math.round((Date.now()-u)*100)/100,f=g/16,p=(h,m)=>{for(h=String(h);h.length<m;)h=" "+h;return h};console.info(`%c⏱ ${p(g,5)} /${p(d,5)} ms`,`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0,Math.min(120-120*f,120))}deg 100% 31%);`,n==null?void 0:n.key)}return o}}function Z(e,t,n,r){return{debug:()=>{var o;return(o=e==null?void 0:e.debugAll)!=null?o:e[t]},key:process.env.NODE_ENV==="development"&&n,onChange:r}}function im(e,t,n,r){const o=()=>{var s;return(s=i.getValue())!=null?s:e.options.renderFallbackValue},i={id:`${t.id}_${n.id}`,row:t,column:n,getValue:()=>t.getValue(r),renderValue:o,getContext:J(()=>[e,n,t,i],(s,a,c,u)=>({table:s,column:a,row:c,cell:u,getValue:u.getValue,renderValue:u.renderValue}),Z(e.options,"debugCells","cell.getContext"))};return e._features.forEach(s=>{s.createCell==null||s.createCell(i,n,t,e)},{}),i}function sm(e,t,n,r){var o,i;const a={...e._getDefaultColumnDef(),...t},c=a.accessorKey;let u=(o=(i=a.id)!=null?i:c?c.replace(".","_"):void 0)!=null?o:typeof a.header=="string"?a.header:void 0,d;if(a.accessorFn?d=a.accessorFn:c&&(c.includes(".")?d=f=>{let p=f;for(const m of c.split(".")){var h;p=(h=p)==null?void 0:h[m],process.env.NODE_ENV!=="production"&&p===void 0&&console.warn(`"${m}" in deeply nested key "${c}" returned undefined.`)}return p}:d=f=>f[a.accessorKey]),!u)throw process.env.NODE_ENV!=="production"?new Error(a.accessorFn?"Columns require an id when using an accessorFn":"Columns require an id when using a non-string header"):new Error;let g={id:`${String(u)}`,accessorFn:d,parent:r,depth:n,columnDef:a,columns:[],getFlatColumns:J(()=>[!0],()=>{var f;return[g,...(f=g.columns)==null?void 0:f.flatMap(p=>p.getFlatColumns())]},Z(e.options,"debugColumns","column.getFlatColumns")),getLeafColumns:J(()=>[e._getOrderColumnsFn()],f=>{var p;if((p=g.columns)!=null&&p.length){let h=g.columns.flatMap(m=>m.getLeafColumns());return f(h)}return[g]},Z(e.options,"debugColumns","column.getLeafColumns"))};for(const f of e._features)f.createColumn==null||f.createColumn(g,e);return g}const Re="debugHeaders";function rs(e,t,n){var r;let i={id:(r=n.id)!=null?r:t.id,column:t,index:n.index,isPlaceholder:!!n.isPlaceholder,placeholderId:n.placeholderId,depth:n.depth,subHeaders:[],colSpan:0,rowSpan:0,headerGroup:null,getLeafHeaders:()=>{const s=[],a=c=>{c.subHeaders&&c.subHeaders.length&&c.subHeaders.map(a),s.push(c)};return a(i),s},getContext:()=>({table:e,header:i,column:t})};return e._features.forEach(s=>{s.createHeader==null||s.createHeader(i,e)}),i}const am={createTable:e=>{e.getHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,o)=>{var i,s;const a=(i=r==null?void 0:r.map(g=>n.find(f=>f.id===g)).filter(Boolean))!=null?i:[],c=(s=o==null?void 0:o.map(g=>n.find(f=>f.id===g)).filter(Boolean))!=null?s:[],u=n.filter(g=>!(r!=null&&r.includes(g.id))&&!(o!=null&&o.includes(g.id)));return Ln(t,[...a,...u,...c],e)},Z(e.options,Re,"getHeaderGroups")),e.getCenterHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,o)=>(n=n.filter(i=>!(r!=null&&r.includes(i.id))&&!(o!=null&&o.includes(i.id))),Ln(t,n,e,"center")),Z(e.options,Re,"getCenterHeaderGroups")),e.getLeftHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left],(t,n,r)=>{var o;const i=(o=r==null?void 0:r.map(s=>n.find(a=>a.id===s)).filter(Boolean))!=null?o:[];return Ln(t,i,e,"left")},Z(e.options,Re,"getLeftHeaderGroups")),e.getRightHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.right],(t,n,r)=>{var o;const i=(o=r==null?void 0:r.map(s=>n.find(a=>a.id===s)).filter(Boolean))!=null?o:[];return Ln(t,i,e,"right")},Z(e.options,Re,"getRightHeaderGroups")),e.getFooterGroups=J(()=>[e.getHeaderGroups()],t=>[...t].reverse(),Z(e.options,Re,"getFooterGroups")),e.getLeftFooterGroups=J(()=>[e.getLeftHeaderGroups()],t=>[...t].reverse(),Z(e.options,Re,"getLeftFooterGroups")),e.getCenterFooterGroups=J(()=>[e.getCenterHeaderGroups()],t=>[...t].reverse(),Z(e.options,Re,"getCenterFooterGroups")),e.getRightFooterGroups=J(()=>[e.getRightHeaderGroups()],t=>[...t].reverse(),Z(e.options,Re,"getRightFooterGroups")),e.getFlatHeaders=J(()=>[e.getHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,Re,"getFlatHeaders")),e.getLeftFlatHeaders=J(()=>[e.getLeftHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,Re,"getLeftFlatHeaders")),e.getCenterFlatHeaders=J(()=>[e.getCenterHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,Re,"getCenterFlatHeaders")),e.getRightFlatHeaders=J(()=>[e.getRightHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,Re,"getRightFlatHeaders")),e.getCenterLeafHeaders=J(()=>[e.getCenterFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),Z(e.options,Re,"getCenterLeafHeaders")),e.getLeftLeafHeaders=J(()=>[e.getLeftFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),Z(e.options,Re,"getLeftLeafHeaders")),e.getRightLeafHeaders=J(()=>[e.getRightFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),Z(e.options,Re,"getRightLeafHeaders")),e.getLeafHeaders=J(()=>[e.getLeftHeaderGroups(),e.getCenterHeaderGroups(),e.getRightHeaderGroups()],(t,n,r)=>{var o,i,s,a,c,u;return[...(o=(i=t[0])==null?void 0:i.headers)!=null?o:[],...(s=(a=n[0])==null?void 0:a.headers)!=null?s:[],...(c=(u=r[0])==null?void 0:u.headers)!=null?c:[]].map(d=>d.getLeafHeaders()).flat()},Z(e.options,Re,"getLeafHeaders"))}};function Ln(e,t,n,r){var o,i;let s=0;const a=function(f,p){p===void 0&&(p=1),s=Math.max(s,p),f.filter(h=>h.getIsVisible()).forEach(h=>{var m;(m=h.columns)!=null&&m.length&&a(h.columns,p+1)},0)};a(e);let c=[];const u=(f,p)=>{const h={depth:p,id:[r,`${p}`].filter(Boolean).join("_"),headers:[]},m=[];f.forEach(v=>{const w=[...m].reverse()[0],P=v.column.depth===h.depth;let x,S=!1;if(P&&v.column.parent?x=v.column.parent:(x=v.column,S=!0),w&&(w==null?void 0:w.column)===x)w.subHeaders.push(v);else{const y=rs(n,x,{id:[r,p,x.id,v==null?void 0:v.id].filter(Boolean).join("_"),isPlaceholder:S,placeholderId:S?`${m.filter(k=>k.column===x).length}`:void 0,depth:p,index:m.length});y.subHeaders.push(v),m.push(y)}h.headers.push(v),v.headerGroup=h}),c.push(h),p>0&&u(m,p-1)},d=t.map((f,p)=>rs(n,f,{depth:s,index:p}));u(d,s-1),c.reverse();const g=f=>f.filter(h=>h.column.getIsVisible()).map(h=>{let m=0,v=0,w=[0];h.subHeaders&&h.subHeaders.length?(w=[],g(h.subHeaders).forEach(x=>{let{colSpan:S,rowSpan:y}=x;m+=S,w.push(y)})):m=1;const P=Math.min(...w);return v=v+P,h.colSpan=m,h.rowSpan=v,{colSpan:m,rowSpan:v}});return g((o=(i=c[0])==null?void 0:i.headers)!=null?o:[]),c}const Lo=(e,t,n,r,o,i,s)=>{let a={id:t,index:r,original:n,depth:o,parentId:s,_valuesCache:{},_uniqueValuesCache:{},getValue:c=>{if(a._valuesCache.hasOwnProperty(c))return a._valuesCache[c];const u=e.getColumn(c);if(u!=null&&u.accessorFn)return a._valuesCache[c]=u.accessorFn(a.original,r),a._valuesCache[c]},getUniqueValues:c=>{if(a._uniqueValuesCache.hasOwnProperty(c))return a._uniqueValuesCache[c];const u=e.getColumn(c);if(u!=null&&u.accessorFn)return u.columnDef.getUniqueValues?(a._uniqueValuesCache[c]=u.columnDef.getUniqueValues(a.original,r),a._uniqueValuesCache[c]):(a._uniqueValuesCache[c]=[a.getValue(c)],a._uniqueValuesCache[c])},renderValue:c=>{var u;return(u=a.getValue(c))!=null?u:e.options.renderFallbackValue},subRows:i??[],getLeafRows:()=>om(a.subRows,c=>c.subRows),getParentRow:()=>a.parentId?e.getRow(a.parentId,!0):void 0,getParentRows:()=>{let c=[],u=a;for(;;){const d=u.getParentRow();if(!d)break;c.push(d),u=d}return c.reverse()},getAllCells:J(()=>[e.getAllLeafColumns()],c=>c.map(u=>im(e,a,u,u.id)),Z(e.options,"debugRows","getAllCells")),_getAllCellsByColumnId:J(()=>[a.getAllCells()],c=>c.reduce((u,d)=>(u[d.column.id]=d,u),{}),Z(e.options,"debugRows","getAllCellsByColumnId"))};for(let c=0;c<e._features.length;c++){const u=e._features[c];u==null||u.createRow==null||u.createRow(a,e)}return a},lm={createColumn:(e,t)=>{e._getFacetedRowModel=t.options.getFacetedRowModel&&t.options.getFacetedRowModel(t,e.id),e.getFacetedRowModel=()=>e._getFacetedRowModel?e._getFacetedRowModel():t.getPreFilteredRowModel(),e._getFacetedUniqueValues=t.options.getFacetedUniqueValues&&t.options.getFacetedUniqueValues(t,e.id),e.getFacetedUniqueValues=()=>e._getFacetedUniqueValues?e._getFacetedUniqueValues():new Map,e._getFacetedMinMaxValues=t.options.getFacetedMinMaxValues&&t.options.getFacetedMinMaxValues(t,e.id),e.getFacetedMinMaxValues=()=>{if(e._getFacetedMinMaxValues)return e._getFacetedMinMaxValues()}}},Oa=(e,t,n)=>{var r;const o=n.toLowerCase();return!!(!((r=e.getValue(t))==null||(r=r.toString())==null||(r=r.toLowerCase())==null)&&r.includes(o))};Oa.autoRemove=e=>Ye(e);const _a=(e,t,n)=>{var r;return!!(!((r=e.getValue(t))==null||(r=r.toString())==null)&&r.includes(n))};_a.autoRemove=e=>Ye(e);const Na=(e,t,n)=>{var r;return((r=e.getValue(t))==null||(r=r.toString())==null?void 0:r.toLowerCase())===(n==null?void 0:n.toLowerCase())};Na.autoRemove=e=>Ye(e);const $a=(e,t,n)=>{var r;return(r=e.getValue(t))==null?void 0:r.includes(n)};$a.autoRemove=e=>Ye(e)||!(e!=null&&e.length);const Ma=(e,t,n)=>!n.some(r=>{var o;return!((o=e.getValue(t))!=null&&o.includes(r))});Ma.autoRemove=e=>Ye(e)||!(e!=null&&e.length);const Ia=(e,t,n)=>n.some(r=>{var o;return(o=e.getValue(t))==null?void 0:o.includes(r)});Ia.autoRemove=e=>Ye(e)||!(e!=null&&e.length);const ja=(e,t,n)=>e.getValue(t)===n;ja.autoRemove=e=>Ye(e);const Da=(e,t,n)=>e.getValue(t)==n;Da.autoRemove=e=>Ye(e);const Bo=(e,t,n)=>{let[r,o]=n;const i=e.getValue(t);return i>=r&&i<=o};Bo.resolveFilterValue=e=>{let[t,n]=e,r=typeof t!="number"?parseFloat(t):t,o=typeof n!="number"?parseFloat(n):n,i=t===null||Number.isNaN(r)?-1/0:r,s=n===null||Number.isNaN(o)?1/0:o;if(i>s){const a=i;i=s,s=a}return[i,s]};Bo.autoRemove=e=>Ye(e)||Ye(e[0])&&Ye(e[1]);const rt={includesString:Oa,includesStringSensitive:_a,equalsString:Na,arrIncludes:$a,arrIncludesAll:Ma,arrIncludesSome:Ia,equals:ja,weakEquals:Da,inNumberRange:Bo};function Ye(e){return e==null||e===""}const cm={getDefaultColumnDef:()=>({filterFn:"auto"}),getInitialState:e=>({columnFilters:[],...e}),getDefaultOptions:e=>({onColumnFiltersChange:Be("columnFilters",e),filterFromLeafRows:!1,maxLeafRowFilterDepth:100}),createColumn:(e,t)=>{e.getAutoFilterFn=()=>{const n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);return typeof r=="string"?rt.includesString:typeof r=="number"?rt.inNumberRange:typeof r=="boolean"||r!==null&&typeof r=="object"?rt.equals:Array.isArray(r)?rt.arrIncludes:rt.weakEquals},e.getFilterFn=()=>{var n,r;return br(e.columnDef.filterFn)?e.columnDef.filterFn:e.columnDef.filterFn==="auto"?e.getAutoFilterFn():(n=(r=t.options.filterFns)==null?void 0:r[e.columnDef.filterFn])!=null?n:rt[e.columnDef.filterFn]},e.getCanFilter=()=>{var n,r,o;return((n=e.columnDef.enableColumnFilter)!=null?n:!0)&&((r=t.options.enableColumnFilters)!=null?r:!0)&&((o=t.options.enableFilters)!=null?o:!0)&&!!e.accessorFn},e.getIsFiltered=()=>e.getFilterIndex()>-1,e.getFilterValue=()=>{var n;return(n=t.getState().columnFilters)==null||(n=n.find(r=>r.id===e.id))==null?void 0:n.value},e.getFilterIndex=()=>{var n,r;return(n=(r=t.getState().columnFilters)==null?void 0:r.findIndex(o=>o.id===e.id))!=null?n:-1},e.setFilterValue=n=>{t.setColumnFilters(r=>{const o=e.getFilterFn(),i=r==null?void 0:r.find(d=>d.id===e.id),s=gt(n,i?i.value:void 0);if(os(o,s,e)){var a;return(a=r==null?void 0:r.filter(d=>d.id!==e.id))!=null?a:[]}const c={id:e.id,value:s};if(i){var u;return(u=r==null?void 0:r.map(d=>d.id===e.id?c:d))!=null?u:[]}return r!=null&&r.length?[...r,c]:[c]})}},createRow:(e,t)=>{e.columnFilters={},e.columnFiltersMeta={}},createTable:e=>{e.setColumnFilters=t=>{const n=e.getAllLeafColumns(),r=o=>{var i;return(i=gt(t,o))==null?void 0:i.filter(s=>{const a=n.find(c=>c.id===s.id);if(a){const c=a.getFilterFn();if(os(c,s.value,a))return!1}return!0})};e.options.onColumnFiltersChange==null||e.options.onColumnFiltersChange(r)},e.resetColumnFilters=t=>{var n,r;e.setColumnFilters(t?[]:(n=(r=e.initialState)==null?void 0:r.columnFilters)!=null?n:[])},e.getPreFilteredRowModel=()=>e.getCoreRowModel(),e.getFilteredRowModel=()=>(!e._getFilteredRowModel&&e.options.getFilteredRowModel&&(e._getFilteredRowModel=e.options.getFilteredRowModel(e)),e.options.manualFiltering||!e._getFilteredRowModel?e.getPreFilteredRowModel():e._getFilteredRowModel())}};function os(e,t,n){return(e&&e.autoRemove?e.autoRemove(t,n):!1)||typeof t>"u"||typeof t=="string"&&!t}const um=(e,t,n)=>n.reduce((r,o)=>{const i=o.getValue(e);return r+(typeof i=="number"?i:0)},0),dm=(e,t,n)=>{let r;return n.forEach(o=>{const i=o.getValue(e);i!=null&&(r>i||r===void 0&&i>=i)&&(r=i)}),r},pm=(e,t,n)=>{let r;return n.forEach(o=>{const i=o.getValue(e);i!=null&&(r<i||r===void 0&&i>=i)&&(r=i)}),r},fm=(e,t,n)=>{let r,o;return n.forEach(i=>{const s=i.getValue(e);s!=null&&(r===void 0?s>=s&&(r=o=s):(r>s&&(r=s),o<s&&(o=s)))}),[r,o]},gm=(e,t)=>{let n=0,r=0;if(t.forEach(o=>{let i=o.getValue(e);i!=null&&(i=+i)>=i&&(++n,r+=i)}),n)return r/n},mm=(e,t)=>{if(!t.length)return;const n=t.map(i=>i.getValue(e));if(!rm(n))return;if(n.length===1)return n[0];const r=Math.floor(n.length/2),o=n.sort((i,s)=>i-s);return n.length%2!==0?o[r]:(o[r-1]+o[r])/2},hm=(e,t)=>Array.from(new Set(t.map(n=>n.getValue(e))).values()),vm=(e,t)=>new Set(t.map(n=>n.getValue(e))).size,bm=(e,t)=>t.length,Dr={sum:um,min:dm,max:pm,extent:fm,mean:gm,median:mm,unique:hm,uniqueCount:vm,count:bm},ym={getDefaultColumnDef:()=>({aggregatedCell:e=>{var t,n;return(t=(n=e.getValue())==null||n.toString==null?void 0:n.toString())!=null?t:null},aggregationFn:"auto"}),getInitialState:e=>({grouping:[],...e}),getDefaultOptions:e=>({onGroupingChange:Be("grouping",e),groupedColumnMode:"reorder"}),createColumn:(e,t)=>{e.toggleGrouping=()=>{t.setGrouping(n=>n!=null&&n.includes(e.id)?n.filter(r=>r!==e.id):[...n??[],e.id])},e.getCanGroup=()=>{var n,r;return((n=e.columnDef.enableGrouping)!=null?n:!0)&&((r=t.options.enableGrouping)!=null?r:!0)&&(!!e.accessorFn||!!e.columnDef.getGroupingValue)},e.getIsGrouped=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.includes(e.id)},e.getGroupedIndex=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.indexOf(e.id)},e.getToggleGroupingHandler=()=>{const n=e.getCanGroup();return()=>{n&&e.toggleGrouping()}},e.getAutoAggregationFn=()=>{const n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);if(typeof r=="number")return Dr.sum;if(Object.prototype.toString.call(r)==="[object Date]")return Dr.extent},e.getAggregationFn=()=>{var n,r;if(!e)throw new Error;return br(e.columnDef.aggregationFn)?e.columnDef.aggregationFn:e.columnDef.aggregationFn==="auto"?e.getAutoAggregationFn():(n=(r=t.options.aggregationFns)==null?void 0:r[e.columnDef.aggregationFn])!=null?n:Dr[e.columnDef.aggregationFn]}},createTable:e=>{e.setGrouping=t=>e.options.onGroupingChange==null?void 0:e.options.onGroupingChange(t),e.resetGrouping=t=>{var n,r;e.setGrouping(t?[]:(n=(r=e.initialState)==null?void 0:r.grouping)!=null?n:[])},e.getPreGroupedRowModel=()=>e.getFilteredRowModel(),e.getGroupedRowModel=()=>(!e._getGroupedRowModel&&e.options.getGroupedRowModel&&(e._getGroupedRowModel=e.options.getGroupedRowModel(e)),e.options.manualGrouping||!e._getGroupedRowModel?e.getPreGroupedRowModel():e._getGroupedRowModel())},createRow:(e,t)=>{e.getIsGrouped=()=>!!e.groupingColumnId,e.getGroupingValue=n=>{if(e._groupingValuesCache.hasOwnProperty(n))return e._groupingValuesCache[n];const r=t.getColumn(n);return r!=null&&r.columnDef.getGroupingValue?(e._groupingValuesCache[n]=r.columnDef.getGroupingValue(e.original),e._groupingValuesCache[n]):e.getValue(n)},e._groupingValuesCache={}},createCell:(e,t,n,r)=>{e.getIsGrouped=()=>t.getIsGrouped()&&t.id===n.groupingColumnId,e.getIsPlaceholder=()=>!e.getIsGrouped()&&t.getIsGrouped(),e.getIsAggregated=()=>{var o;return!e.getIsGrouped()&&!e.getIsPlaceholder()&&!!((o=n.subRows)!=null&&o.length)}}};function wm(e,t,n){if(!(t!=null&&t.length)||!n)return e;const r=e.filter(i=>!t.includes(i.id));return n==="remove"?r:[...t.map(i=>e.find(s=>s.id===i)).filter(Boolean),...r]}const xm={getInitialState:e=>({columnOrder:[],...e}),getDefaultOptions:e=>({onColumnOrderChange:Be("columnOrder",e)}),createColumn:(e,t)=>{e.getIndex=J(n=>[bn(t,n)],n=>n.findIndex(r=>r.id===e.id),Z(t.options,"debugColumns","getIndex")),e.getIsFirstColumn=n=>{var r;return((r=bn(t,n)[0])==null?void 0:r.id)===e.id},e.getIsLastColumn=n=>{var r;const o=bn(t,n);return((r=o[o.length-1])==null?void 0:r.id)===e.id}},createTable:e=>{e.setColumnOrder=t=>e.options.onColumnOrderChange==null?void 0:e.options.onColumnOrderChange(t),e.resetColumnOrder=t=>{var n;e.setColumnOrder(t?[]:(n=e.initialState.columnOrder)!=null?n:[])},e._getOrderColumnsFn=J(()=>[e.getState().columnOrder,e.getState().grouping,e.options.groupedColumnMode],(t,n,r)=>o=>{let i=[];if(!(t!=null&&t.length))i=o;else{const s=[...t],a=[...o];for(;a.length&&s.length;){const c=s.shift(),u=a.findIndex(d=>d.id===c);u>-1&&i.push(a.splice(u,1)[0])}i=[...i,...a]}return wm(i,n,r)},Z(e.options,"debugTable","_getOrderColumnsFn"))}},Ar=()=>({left:[],right:[]}),Sm={getInitialState:e=>({columnPinning:Ar(),...e}),getDefaultOptions:e=>({onColumnPinningChange:Be("columnPinning",e)}),createColumn:(e,t)=>{e.pin=n=>{const r=e.getLeafColumns().map(o=>o.id).filter(Boolean);t.setColumnPinning(o=>{var i,s;if(n==="right"){var a,c;return{left:((a=o==null?void 0:o.left)!=null?a:[]).filter(g=>!(r!=null&&r.includes(g))),right:[...((c=o==null?void 0:o.right)!=null?c:[]).filter(g=>!(r!=null&&r.includes(g))),...r]}}if(n==="left"){var u,d;return{left:[...((u=o==null?void 0:o.left)!=null?u:[]).filter(g=>!(r!=null&&r.includes(g))),...r],right:((d=o==null?void 0:o.right)!=null?d:[]).filter(g=>!(r!=null&&r.includes(g)))}}return{left:((i=o==null?void 0:o.left)!=null?i:[]).filter(g=>!(r!=null&&r.includes(g))),right:((s=o==null?void 0:o.right)!=null?s:[]).filter(g=>!(r!=null&&r.includes(g)))}})},e.getCanPin=()=>e.getLeafColumns().some(r=>{var o,i,s;return((o=r.columnDef.enablePinning)!=null?o:!0)&&((i=(s=t.options.enableColumnPinning)!=null?s:t.options.enablePinning)!=null?i:!0)}),e.getIsPinned=()=>{const n=e.getLeafColumns().map(a=>a.id),{left:r,right:o}=t.getState().columnPinning,i=n.some(a=>r==null?void 0:r.includes(a)),s=n.some(a=>o==null?void 0:o.includes(a));return i?"left":s?"right":!1},e.getPinnedIndex=()=>{var n,r;const o=e.getIsPinned();return o?(n=(r=t.getState().columnPinning)==null||(r=r[o])==null?void 0:r.indexOf(e.id))!=null?n:-1:0}},createRow:(e,t)=>{e.getCenterVisibleCells=J(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left,t.getState().columnPinning.right],(n,r,o)=>{const i=[...r??[],...o??[]];return n.filter(s=>!i.includes(s.column.id))},Z(t.options,"debugRows","getCenterVisibleCells")),e.getLeftVisibleCells=J(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left],(n,r)=>(r??[]).map(i=>n.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"left"})),Z(t.options,"debugRows","getLeftVisibleCells")),e.getRightVisibleCells=J(()=>[e._getAllVisibleCells(),t.getState().columnPinning.right],(n,r)=>(r??[]).map(i=>n.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"right"})),Z(t.options,"debugRows","getRightVisibleCells"))},createTable:e=>{e.setColumnPinning=t=>e.options.onColumnPinningChange==null?void 0:e.options.onColumnPinningChange(t),e.resetColumnPinning=t=>{var n,r;return e.setColumnPinning(t?Ar():(n=(r=e.initialState)==null?void 0:r.columnPinning)!=null?n:Ar())},e.getIsSomeColumnsPinned=t=>{var n;const r=e.getState().columnPinning;if(!t){var o,i;return!!((o=r.left)!=null&&o.length||(i=r.right)!=null&&i.length)}return!!((n=r[t])!=null&&n.length)},e.getLeftLeafColumns=J(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left],(t,n)=>(n??[]).map(r=>t.find(o=>o.id===r)).filter(Boolean),Z(e.options,"debugColumns","getLeftLeafColumns")),e.getRightLeafColumns=J(()=>[e.getAllLeafColumns(),e.getState().columnPinning.right],(t,n)=>(n??[]).map(r=>t.find(o=>o.id===r)).filter(Boolean),Z(e.options,"debugColumns","getRightLeafColumns")),e.getCenterLeafColumns=J(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r)=>{const o=[...n??[],...r??[]];return t.filter(i=>!o.includes(i.id))},Z(e.options,"debugColumns","getCenterLeafColumns"))}},Bn={size:150,minSize:20,maxSize:Number.MAX_SAFE_INTEGER},Fr=()=>({startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,isResizingColumn:!1,columnSizingStart:[]}),Cm={getDefaultColumnDef:()=>Bn,getInitialState:e=>({columnSizing:{},columnSizingInfo:Fr(),...e}),getDefaultOptions:e=>({columnResizeMode:"onEnd",columnResizeDirection:"ltr",onColumnSizingChange:Be("columnSizing",e),onColumnSizingInfoChange:Be("columnSizingInfo",e)}),createColumn:(e,t)=>{e.getSize=()=>{var n,r,o;const i=t.getState().columnSizing[e.id];return Math.min(Math.max((n=e.columnDef.minSize)!=null?n:Bn.minSize,(r=i??e.columnDef.size)!=null?r:Bn.size),(o=e.columnDef.maxSize)!=null?o:Bn.maxSize)},e.getStart=J(n=>[n,bn(t,n),t.getState().columnSizing],(n,r)=>r.slice(0,e.getIndex(n)).reduce((o,i)=>o+i.getSize(),0),Z(t.options,"debugColumns","getStart")),e.getAfter=J(n=>[n,bn(t,n),t.getState().columnSizing],(n,r)=>r.slice(e.getIndex(n)+1).reduce((o,i)=>o+i.getSize(),0),Z(t.options,"debugColumns","getAfter")),e.resetSize=()=>{t.setColumnSizing(n=>{let{[e.id]:r,...o}=n;return o})},e.getCanResize=()=>{var n,r;return((n=e.columnDef.enableResizing)!=null?n:!0)&&((r=t.options.enableColumnResizing)!=null?r:!0)},e.getIsResizing=()=>t.getState().columnSizingInfo.isResizingColumn===e.id},createHeader:(e,t)=>{e.getSize=()=>{let n=0;const r=o=>{if(o.subHeaders.length)o.subHeaders.forEach(r);else{var i;n+=(i=o.column.getSize())!=null?i:0}};return r(e),n},e.getStart=()=>{if(e.index>0){const n=e.headerGroup.headers[e.index-1];return n.getStart()+n.getSize()}return 0},e.getResizeHandler=n=>{const r=t.getColumn(e.column.id),o=r==null?void 0:r.getCanResize();return i=>{if(!r||!o||(i.persist==null||i.persist(),Vr(i)&&i.touches&&i.touches.length>1))return;const s=e.getSize(),a=e?e.getLeafHeaders().map(w=>[w.column.id,w.column.getSize()]):[[r.id,r.getSize()]],c=Vr(i)?Math.round(i.touches[0].clientX):i.clientX,u={},d=(w,P)=>{typeof P=="number"&&(t.setColumnSizingInfo(x=>{var S,y;const k=t.options.columnResizeDirection==="rtl"?-1:1,O=(P-((S=x==null?void 0:x.startOffset)!=null?S:0))*k,F=Math.max(O/((y=x==null?void 0:x.startSize)!=null?y:0),-.999999);return x.columnSizingStart.forEach(V=>{let[B,T]=V;u[B]=Math.round(Math.max(T+T*F,0)*100)/100}),{...x,deltaOffset:O,deltaPercentage:F}}),(t.options.columnResizeMode==="onChange"||w==="end")&&t.setColumnSizing(x=>({...x,...u})))},g=w=>d("move",w),f=w=>{d("end",w),t.setColumnSizingInfo(P=>({...P,isResizingColumn:!1,startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,columnSizingStart:[]}))},p=n||typeof document<"u"?document:null,h={moveHandler:w=>g(w.clientX),upHandler:w=>{p==null||p.removeEventListener("mousemove",h.moveHandler),p==null||p.removeEventListener("mouseup",h.upHandler),f(w.clientX)}},m={moveHandler:w=>(w.cancelable&&(w.preventDefault(),w.stopPropagation()),g(w.touches[0].clientX),!1),upHandler:w=>{var P;p==null||p.removeEventListener("touchmove",m.moveHandler),p==null||p.removeEventListener("touchend",m.upHandler),w.cancelable&&(w.preventDefault(),w.stopPropagation()),f((P=w.touches[0])==null?void 0:P.clientX)}},v=Em()?{passive:!1}:!1;Vr(i)?(p==null||p.addEventListener("touchmove",m.moveHandler,v),p==null||p.addEventListener("touchend",m.upHandler,v)):(p==null||p.addEventListener("mousemove",h.moveHandler,v),p==null||p.addEventListener("mouseup",h.upHandler,v)),t.setColumnSizingInfo(w=>({...w,startOffset:c,startSize:s,deltaOffset:0,deltaPercentage:0,columnSizingStart:a,isResizingColumn:r.id}))}}},createTable:e=>{e.setColumnSizing=t=>e.options.onColumnSizingChange==null?void 0:e.options.onColumnSizingChange(t),e.setColumnSizingInfo=t=>e.options.onColumnSizingInfoChange==null?void 0:e.options.onColumnSizingInfoChange(t),e.resetColumnSizing=t=>{var n;e.setColumnSizing(t?{}:(n=e.initialState.columnSizing)!=null?n:{})},e.resetHeaderSizeInfo=t=>{var n;e.setColumnSizingInfo(t?Fr():(n=e.initialState.columnSizingInfo)!=null?n:Fr())},e.getTotalSize=()=>{var t,n;return(t=(n=e.getHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getLeftTotalSize=()=>{var t,n;return(t=(n=e.getLeftHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getCenterTotalSize=()=>{var t,n;return(t=(n=e.getCenterHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getRightTotalSize=()=>{var t,n;return(t=(n=e.getRightHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0}}};let zn=null;function Em(){if(typeof zn=="boolean")return zn;let e=!1;try{const t={get passive(){return e=!0,!1}},n=()=>{};window.addEventListener("test",n,t),window.removeEventListener("test",n)}catch{e=!1}return zn=e,zn}function Vr(e){return e.type==="touchstart"}const Rm={getInitialState:e=>({columnVisibility:{},...e}),getDefaultOptions:e=>({onColumnVisibilityChange:Be("columnVisibility",e)}),createColumn:(e,t)=>{e.toggleVisibility=n=>{e.getCanHide()&&t.setColumnVisibility(r=>({...r,[e.id]:n??!e.getIsVisible()}))},e.getIsVisible=()=>{var n,r;const o=e.columns;return(n=o.length?o.some(i=>i.getIsVisible()):(r=t.getState().columnVisibility)==null?void 0:r[e.id])!=null?n:!0},e.getCanHide=()=>{var n,r;return((n=e.columnDef.enableHiding)!=null?n:!0)&&((r=t.options.enableHiding)!=null?r:!0)},e.getToggleVisibilityHandler=()=>n=>{e.toggleVisibility==null||e.toggleVisibility(n.target.checked)}},createRow:(e,t)=>{e._getAllVisibleCells=J(()=>[e.getAllCells(),t.getState().columnVisibility],n=>n.filter(r=>r.column.getIsVisible()),Z(t.options,"debugRows","_getAllVisibleCells")),e.getVisibleCells=J(()=>[e.getLeftVisibleCells(),e.getCenterVisibleCells(),e.getRightVisibleCells()],(n,r,o)=>[...n,...r,...o],Z(t.options,"debugRows","getVisibleCells"))},createTable:e=>{const t=(n,r)=>J(()=>[r(),r().filter(o=>o.getIsVisible()).map(o=>o.id).join("_")],o=>o.filter(i=>i.getIsVisible==null?void 0:i.getIsVisible()),Z(e.options,"debugColumns",n));e.getVisibleFlatColumns=t("getVisibleFlatColumns",()=>e.getAllFlatColumns()),e.getVisibleLeafColumns=t("getVisibleLeafColumns",()=>e.getAllLeafColumns()),e.getLeftVisibleLeafColumns=t("getLeftVisibleLeafColumns",()=>e.getLeftLeafColumns()),e.getRightVisibleLeafColumns=t("getRightVisibleLeafColumns",()=>e.getRightLeafColumns()),e.getCenterVisibleLeafColumns=t("getCenterVisibleLeafColumns",()=>e.getCenterLeafColumns()),e.setColumnVisibility=n=>e.options.onColumnVisibilityChange==null?void 0:e.options.onColumnVisibilityChange(n),e.resetColumnVisibility=n=>{var r;e.setColumnVisibility(n?{}:(r=e.initialState.columnVisibility)!=null?r:{})},e.toggleAllColumnsVisible=n=>{var r;n=(r=n)!=null?r:!e.getIsAllColumnsVisible(),e.setColumnVisibility(e.getAllLeafColumns().reduce((o,i)=>({...o,[i.id]:n||!(i.getCanHide!=null&&i.getCanHide())}),{}))},e.getIsAllColumnsVisible=()=>!e.getAllLeafColumns().some(n=>!(n.getIsVisible!=null&&n.getIsVisible())),e.getIsSomeColumnsVisible=()=>e.getAllLeafColumns().some(n=>n.getIsVisible==null?void 0:n.getIsVisible()),e.getToggleAllColumnsVisibilityHandler=()=>n=>{var r;e.toggleAllColumnsVisible((r=n.target)==null?void 0:r.checked)}}};function bn(e,t){return t?t==="center"?e.getCenterVisibleLeafColumns():t==="left"?e.getLeftVisibleLeafColumns():e.getRightVisibleLeafColumns():e.getVisibleLeafColumns()}const km={createTable:e=>{e._getGlobalFacetedRowModel=e.options.getFacetedRowModel&&e.options.getFacetedRowModel(e,"__global__"),e.getGlobalFacetedRowModel=()=>e.options.manualFiltering||!e._getGlobalFacetedRowModel?e.getPreFilteredRowModel():e._getGlobalFacetedRowModel(),e._getGlobalFacetedUniqueValues=e.options.getFacetedUniqueValues&&e.options.getFacetedUniqueValues(e,"__global__"),e.getGlobalFacetedUniqueValues=()=>e._getGlobalFacetedUniqueValues?e._getGlobalFacetedUniqueValues():new Map,e._getGlobalFacetedMinMaxValues=e.options.getFacetedMinMaxValues&&e.options.getFacetedMinMaxValues(e,"__global__"),e.getGlobalFacetedMinMaxValues=()=>{if(e._getGlobalFacetedMinMaxValues)return e._getGlobalFacetedMinMaxValues()}}},Tm={getInitialState:e=>({globalFilter:void 0,...e}),getDefaultOptions:e=>({onGlobalFilterChange:Be("globalFilter",e),globalFilterFn:"auto",getColumnCanGlobalFilter:t=>{var n;const r=(n=e.getCoreRowModel().flatRows[0])==null||(n=n._getAllCellsByColumnId()[t.id])==null?void 0:n.getValue();return typeof r=="string"||typeof r=="number"}}),createColumn:(e,t)=>{e.getCanGlobalFilter=()=>{var n,r,o,i;return((n=e.columnDef.enableGlobalFilter)!=null?n:!0)&&((r=t.options.enableGlobalFilter)!=null?r:!0)&&((o=t.options.enableFilters)!=null?o:!0)&&((i=t.options.getColumnCanGlobalFilter==null?void 0:t.options.getColumnCanGlobalFilter(e))!=null?i:!0)&&!!e.accessorFn}},createTable:e=>{e.getGlobalAutoFilterFn=()=>rt.includesString,e.getGlobalFilterFn=()=>{var t,n;const{globalFilterFn:r}=e.options;return br(r)?r:r==="auto"?e.getGlobalAutoFilterFn():(t=(n=e.options.filterFns)==null?void 0:n[r])!=null?t:rt[r]},e.setGlobalFilter=t=>{e.options.onGlobalFilterChange==null||e.options.onGlobalFilterChange(t)},e.resetGlobalFilter=t=>{e.setGlobalFilter(t?void 0:e.initialState.globalFilter)}}},Pm={getInitialState:e=>({expanded:{},...e}),getDefaultOptions:e=>({onExpandedChange:Be("expanded",e),paginateExpandedRows:!0}),createTable:e=>{let t=!1,n=!1;e._autoResetExpanded=()=>{var r,o;if(!t){e._queue(()=>{t=!0});return}if((r=(o=e.options.autoResetAll)!=null?o:e.options.autoResetExpanded)!=null?r:!e.options.manualExpanding){if(n)return;n=!0,e._queue(()=>{e.resetExpanded(),n=!1})}},e.setExpanded=r=>e.options.onExpandedChange==null?void 0:e.options.onExpandedChange(r),e.toggleAllRowsExpanded=r=>{r??!e.getIsAllRowsExpanded()?e.setExpanded(!0):e.setExpanded({})},e.resetExpanded=r=>{var o,i;e.setExpanded(r?{}:(o=(i=e.initialState)==null?void 0:i.expanded)!=null?o:{})},e.getCanSomeRowsExpand=()=>e.getPrePaginationRowModel().flatRows.some(r=>r.getCanExpand()),e.getToggleAllRowsExpandedHandler=()=>r=>{r.persist==null||r.persist(),e.toggleAllRowsExpanded()},e.getIsSomeRowsExpanded=()=>{const r=e.getState().expanded;return r===!0||Object.values(r).some(Boolean)},e.getIsAllRowsExpanded=()=>{const r=e.getState().expanded;return typeof r=="boolean"?r===!0:!(!Object.keys(r).length||e.getRowModel().flatRows.some(o=>!o.getIsExpanded()))},e.getExpandedDepth=()=>{let r=0;return(e.getState().expanded===!0?Object.keys(e.getRowModel().rowsById):Object.keys(e.getState().expanded)).forEach(i=>{const s=i.split(".");r=Math.max(r,s.length)}),r},e.getPreExpandedRowModel=()=>e.getSortedRowModel(),e.getExpandedRowModel=()=>(!e._getExpandedRowModel&&e.options.getExpandedRowModel&&(e._getExpandedRowModel=e.options.getExpandedRowModel(e)),e.options.manualExpanding||!e._getExpandedRowModel?e.getPreExpandedRowModel():e._getExpandedRowModel())},createRow:(e,t)=>{e.toggleExpanded=n=>{t.setExpanded(r=>{var o;const i=r===!0?!0:!!(r!=null&&r[e.id]);let s={};if(r===!0?Object.keys(t.getRowModel().rowsById).forEach(a=>{s[a]=!0}):s=r,n=(o=n)!=null?o:!i,!i&&n)return{...s,[e.id]:!0};if(i&&!n){const{[e.id]:a,...c}=s;return c}return r})},e.getIsExpanded=()=>{var n;const r=t.getState().expanded;return!!((n=t.options.getIsRowExpanded==null?void 0:t.options.getIsRowExpanded(e))!=null?n:r===!0||r!=null&&r[e.id])},e.getCanExpand=()=>{var n,r,o;return(n=t.options.getRowCanExpand==null?void 0:t.options.getRowCanExpand(e))!=null?n:((r=t.options.enableExpanding)!=null?r:!0)&&!!((o=e.subRows)!=null&&o.length)},e.getIsAllParentsExpanded=()=>{let n=!0,r=e;for(;n&&r.parentId;)r=t.getRow(r.parentId,!0),n=r.getIsExpanded();return n},e.getToggleExpandedHandler=()=>{const n=e.getCanExpand();return()=>{n&&e.toggleExpanded()}}}},ro=0,oo=10,Lr=()=>({pageIndex:ro,pageSize:oo}),Om={getInitialState:e=>({...e,pagination:{...Lr(),...e==null?void 0:e.pagination}}),getDefaultOptions:e=>({onPaginationChange:Be("pagination",e)}),createTable:e=>{let t=!1,n=!1;e._autoResetPageIndex=()=>{var r,o;if(!t){e._queue(()=>{t=!0});return}if((r=(o=e.options.autoResetAll)!=null?o:e.options.autoResetPageIndex)!=null?r:!e.options.manualPagination){if(n)return;n=!0,e._queue(()=>{e.resetPageIndex(),n=!1})}},e.setPagination=r=>{const o=i=>gt(r,i);return e.options.onPaginationChange==null?void 0:e.options.onPaginationChange(o)},e.resetPagination=r=>{var o;e.setPagination(r?Lr():(o=e.initialState.pagination)!=null?o:Lr())},e.setPageIndex=r=>{e.setPagination(o=>{let i=gt(r,o.pageIndex);const s=typeof e.options.pageCount>"u"||e.options.pageCount===-1?Number.MAX_SAFE_INTEGER:e.options.pageCount-1;return i=Math.max(0,Math.min(i,s)),{...o,pageIndex:i}})},e.resetPageIndex=r=>{var o,i;e.setPageIndex(r?ro:(o=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageIndex)!=null?o:ro)},e.resetPageSize=r=>{var o,i;e.setPageSize(r?oo:(o=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageSize)!=null?o:oo)},e.setPageSize=r=>{e.setPagination(o=>{const i=Math.max(1,gt(r,o.pageSize)),s=o.pageSize*o.pageIndex,a=Math.floor(s/i);return{...o,pageIndex:a,pageSize:i}})},e.setPageCount=r=>e.setPagination(o=>{var i;let s=gt(r,(i=e.options.pageCount)!=null?i:-1);return typeof s=="number"&&(s=Math.max(-1,s)),{...o,pageCount:s}}),e.getPageOptions=J(()=>[e.getPageCount()],r=>{let o=[];return r&&r>0&&(o=[...new Array(r)].fill(null).map((i,s)=>s)),o},Z(e.options,"debugTable","getPageOptions")),e.getCanPreviousPage=()=>e.getState().pagination.pageIndex>0,e.getCanNextPage=()=>{const{pageIndex:r}=e.getState().pagination,o=e.getPageCount();return o===-1?!0:o===0?!1:r<o-1},e.previousPage=()=>e.setPageIndex(r=>r-1),e.nextPage=()=>e.setPageIndex(r=>r+1),e.firstPage=()=>e.setPageIndex(0),e.lastPage=()=>e.setPageIndex(e.getPageCount()-1),e.getPrePaginationRowModel=()=>e.getExpandedRowModel(),e.getPaginationRowModel=()=>(!e._getPaginationRowModel&&e.options.getPaginationRowModel&&(e._getPaginationRowModel=e.options.getPaginationRowModel(e)),e.options.manualPagination||!e._getPaginationRowModel?e.getPrePaginationRowModel():e._getPaginationRowModel()),e.getPageCount=()=>{var r;return(r=e.options.pageCount)!=null?r:Math.ceil(e.getRowCount()/e.getState().pagination.pageSize)},e.getRowCount=()=>{var r;return(r=e.options.rowCount)!=null?r:e.getPrePaginationRowModel().rows.length}}},Br=()=>({top:[],bottom:[]}),_m={getInitialState:e=>({rowPinning:Br(),...e}),getDefaultOptions:e=>({onRowPinningChange:Be("rowPinning",e)}),createRow:(e,t)=>{e.pin=(n,r,o)=>{const i=r?e.getLeafRows().map(c=>{let{id:u}=c;return u}):[],s=o?e.getParentRows().map(c=>{let{id:u}=c;return u}):[],a=new Set([...s,e.id,...i]);t.setRowPinning(c=>{var u,d;if(n==="bottom"){var g,f;return{top:((g=c==null?void 0:c.top)!=null?g:[]).filter(m=>!(a!=null&&a.has(m))),bottom:[...((f=c==null?void 0:c.bottom)!=null?f:[]).filter(m=>!(a!=null&&a.has(m))),...Array.from(a)]}}if(n==="top"){var p,h;return{top:[...((p=c==null?void 0:c.top)!=null?p:[]).filter(m=>!(a!=null&&a.has(m))),...Array.from(a)],bottom:((h=c==null?void 0:c.bottom)!=null?h:[]).filter(m=>!(a!=null&&a.has(m)))}}return{top:((u=c==null?void 0:c.top)!=null?u:[]).filter(m=>!(a!=null&&a.has(m))),bottom:((d=c==null?void 0:c.bottom)!=null?d:[]).filter(m=>!(a!=null&&a.has(m)))}})},e.getCanPin=()=>{var n;const{enableRowPinning:r,enablePinning:o}=t.options;return typeof r=="function"?r(e):(n=r??o)!=null?n:!0},e.getIsPinned=()=>{const n=[e.id],{top:r,bottom:o}=t.getState().rowPinning,i=n.some(a=>r==null?void 0:r.includes(a)),s=n.some(a=>o==null?void 0:o.includes(a));return i?"top":s?"bottom":!1},e.getPinnedIndex=()=>{var n,r;const o=e.getIsPinned();if(!o)return-1;const i=(n=t._getPinnedRows(o))==null?void 0:n.map(s=>{let{id:a}=s;return a});return(r=i==null?void 0:i.indexOf(e.id))!=null?r:-1}},createTable:e=>{e.setRowPinning=t=>e.options.onRowPinningChange==null?void 0:e.options.onRowPinningChange(t),e.resetRowPinning=t=>{var n,r;return e.setRowPinning(t?Br():(n=(r=e.initialState)==null?void 0:r.rowPinning)!=null?n:Br())},e.getIsSomeRowsPinned=t=>{var n;const r=e.getState().rowPinning;if(!t){var o,i;return!!((o=r.top)!=null&&o.length||(i=r.bottom)!=null&&i.length)}return!!((n=r[t])!=null&&n.length)},e._getPinnedRows=J(t=>[e.getRowModel().rows,e.getState().rowPinning[t],t],(t,n,r)=>{var o;return((o=e.options.keepPinnedRows)==null||o?(n??[]).map(s=>{const a=e.getRow(s,!0);return a.getIsAllParentsExpanded()?a:null}):(n??[]).map(s=>t.find(a=>a.id===s))).filter(Boolean).map(s=>({...s,position:r}))},Z(e.options,"debugRows","_getPinnedRows")),e.getTopRows=()=>e._getPinnedRows("top"),e.getBottomRows=()=>e._getPinnedRows("bottom"),e.getCenterRows=J(()=>[e.getRowModel().rows,e.getState().rowPinning.top,e.getState().rowPinning.bottom],(t,n,r)=>{const o=new Set([...n??[],...r??[]]);return t.filter(i=>!o.has(i.id))},Z(e.options,"debugRows","getCenterRows"))}},Nm={getInitialState:e=>({rowSelection:{},...e}),getDefaultOptions:e=>({onRowSelectionChange:Be("rowSelection",e),enableRowSelection:!0,enableMultiRowSelection:!0,enableSubRowSelection:!0}),createTable:e=>{e.setRowSelection=t=>e.options.onRowSelectionChange==null?void 0:e.options.onRowSelectionChange(t),e.resetRowSelection=t=>{var n;return e.setRowSelection(t?{}:(n=e.initialState.rowSelection)!=null?n:{})},e.toggleAllRowsSelected=t=>{e.setRowSelection(n=>{t=typeof t<"u"?t:!e.getIsAllRowsSelected();const r={...n},o=e.getPreGroupedRowModel().flatRows;return t?o.forEach(i=>{i.getCanSelect()&&(r[i.id]=!0)}):o.forEach(i=>{delete r[i.id]}),r})},e.toggleAllPageRowsSelected=t=>e.setRowSelection(n=>{const r=typeof t<"u"?t:!e.getIsAllPageRowsSelected(),o={...n};return e.getRowModel().rows.forEach(i=>{io(o,i.id,r,!0,e)}),o}),e.getPreSelectedRowModel=()=>e.getCoreRowModel(),e.getSelectedRowModel=J(()=>[e.getState().rowSelection,e.getCoreRowModel()],(t,n)=>Object.keys(t).length?zr(e,n):{rows:[],flatRows:[],rowsById:{}},Z(e.options,"debugTable","getSelectedRowModel")),e.getFilteredSelectedRowModel=J(()=>[e.getState().rowSelection,e.getFilteredRowModel()],(t,n)=>Object.keys(t).length?zr(e,n):{rows:[],flatRows:[],rowsById:{}},Z(e.options,"debugTable","getFilteredSelectedRowModel")),e.getGroupedSelectedRowModel=J(()=>[e.getState().rowSelection,e.getSortedRowModel()],(t,n)=>Object.keys(t).length?zr(e,n):{rows:[],flatRows:[],rowsById:{}},Z(e.options,"debugTable","getGroupedSelectedRowModel")),e.getIsAllRowsSelected=()=>{const t=e.getFilteredRowModel().flatRows,{rowSelection:n}=e.getState();let r=!!(t.length&&Object.keys(n).length);return r&&t.some(o=>o.getCanSelect()&&!n[o.id])&&(r=!1),r},e.getIsAllPageRowsSelected=()=>{const t=e.getPaginationRowModel().flatRows.filter(o=>o.getCanSelect()),{rowSelection:n}=e.getState();let r=!!t.length;return r&&t.some(o=>!n[o.id])&&(r=!1),r},e.getIsSomeRowsSelected=()=>{var t;const n=Object.keys((t=e.getState().rowSelection)!=null?t:{}).length;return n>0&&n<e.getFilteredRowModel().flatRows.length},e.getIsSomePageRowsSelected=()=>{const t=e.getPaginationRowModel().flatRows;return e.getIsAllPageRowsSelected()?!1:t.filter(n=>n.getCanSelect()).some(n=>n.getIsSelected()||n.getIsSomeSelected())},e.getToggleAllRowsSelectedHandler=()=>t=>{e.toggleAllRowsSelected(t.target.checked)},e.getToggleAllPageRowsSelectedHandler=()=>t=>{e.toggleAllPageRowsSelected(t.target.checked)}},createRow:(e,t)=>{e.toggleSelected=(n,r)=>{const o=e.getIsSelected();t.setRowSelection(i=>{var s;if(n=typeof n<"u"?n:!o,e.getCanSelect()&&o===n)return i;const a={...i};return io(a,e.id,n,(s=r==null?void 0:r.selectChildren)!=null?s:!0,t),a})},e.getIsSelected=()=>{const{rowSelection:n}=t.getState();return zo(e,n)},e.getIsSomeSelected=()=>{const{rowSelection:n}=t.getState();return so(e,n)==="some"},e.getIsAllSubRowsSelected=()=>{const{rowSelection:n}=t.getState();return so(e,n)==="all"},e.getCanSelect=()=>{var n;return typeof t.options.enableRowSelection=="function"?t.options.enableRowSelection(e):(n=t.options.enableRowSelection)!=null?n:!0},e.getCanSelectSubRows=()=>{var n;return typeof t.options.enableSubRowSelection=="function"?t.options.enableSubRowSelection(e):(n=t.options.enableSubRowSelection)!=null?n:!0},e.getCanMultiSelect=()=>{var n;return typeof t.options.enableMultiRowSelection=="function"?t.options.enableMultiRowSelection(e):(n=t.options.enableMultiRowSelection)!=null?n:!0},e.getToggleSelectedHandler=()=>{const n=e.getCanSelect();return r=>{var o;n&&e.toggleSelected((o=r.target)==null?void 0:o.checked)}}}},io=(e,t,n,r,o)=>{var i;const s=o.getRow(t,!0);n?(s.getCanMultiSelect()||Object.keys(e).forEach(a=>delete e[a]),s.getCanSelect()&&(e[t]=!0)):delete e[t],r&&(i=s.subRows)!=null&&i.length&&s.getCanSelectSubRows()&&s.subRows.forEach(a=>io(e,a.id,n,r,o))};function zr(e,t){const n=e.getState().rowSelection,r=[],o={},i=function(s,a){return s.map(c=>{var u;const d=zo(c,n);if(d&&(r.push(c),o[c.id]=c),(u=c.subRows)!=null&&u.length&&(c={...c,subRows:i(c.subRows)}),d)return c}).filter(Boolean)};return{rows:i(t.rows),flatRows:r,rowsById:o}}function zo(e,t){var n;return(n=t[e.id])!=null?n:!1}function so(e,t,n){var r;if(!((r=e.subRows)!=null&&r.length))return!1;let o=!0,i=!1;return e.subRows.forEach(s=>{if(!(i&&!o)&&(s.getCanSelect()&&(zo(s,t)?i=!0:o=!1),s.subRows&&s.subRows.length)){const a=so(s,t);a==="all"?i=!0:(a==="some"&&(i=!0),o=!1)}}),o?"all":i?"some":!1}const ao=/([0-9]+)/gm,$m=(e,t,n)=>Aa(mt(e.getValue(n)).toLowerCase(),mt(t.getValue(n)).toLowerCase()),Mm=(e,t,n)=>Aa(mt(e.getValue(n)),mt(t.getValue(n))),Im=(e,t,n)=>Ho(mt(e.getValue(n)).toLowerCase(),mt(t.getValue(n)).toLowerCase()),jm=(e,t,n)=>Ho(mt(e.getValue(n)),mt(t.getValue(n))),Dm=(e,t,n)=>{const r=e.getValue(n),o=t.getValue(n);return r>o?1:r<o?-1:0},Am=(e,t,n)=>Ho(e.getValue(n),t.getValue(n));function Ho(e,t){return e===t?0:e>t?1:-1}function mt(e){return typeof e=="number"?isNaN(e)||e===1/0||e===-1/0?"":String(e):typeof e=="string"?e:""}function Aa(e,t){const n=e.split(ao).filter(Boolean),r=t.split(ao).filter(Boolean);for(;n.length&&r.length;){const o=n.shift(),i=r.shift(),s=parseInt(o,10),a=parseInt(i,10),c=[s,a].sort();if(isNaN(c[0])){if(o>i)return 1;if(i>o)return-1;continue}if(isNaN(c[1]))return isNaN(s)?-1:1;if(s>a)return 1;if(a>s)return-1}return n.length-r.length}const ln={alphanumeric:$m,alphanumericCaseSensitive:Mm,text:Im,textCaseSensitive:jm,datetime:Dm,basic:Am},Fm={getInitialState:e=>({sorting:[],...e}),getDefaultColumnDef:()=>({sortingFn:"auto",sortUndefined:1}),getDefaultOptions:e=>({onSortingChange:Be("sorting",e),isMultiSortEvent:t=>t.shiftKey}),createColumn:(e,t)=>{e.getAutoSortingFn=()=>{const n=t.getFilteredRowModel().flatRows.slice(10);let r=!1;for(const o of n){const i=o==null?void 0:o.getValue(e.id);if(Object.prototype.toString.call(i)==="[object Date]")return ln.datetime;if(typeof i=="string"&&(r=!0,i.split(ao).length>1))return ln.alphanumeric}return r?ln.text:ln.basic},e.getAutoSortDir=()=>{const n=t.getFilteredRowModel().flatRows[0];return typeof(n==null?void 0:n.getValue(e.id))=="string"?"asc":"desc"},e.getSortingFn=()=>{var n,r;if(!e)throw new Error;return br(e.columnDef.sortingFn)?e.columnDef.sortingFn:e.columnDef.sortingFn==="auto"?e.getAutoSortingFn():(n=(r=t.options.sortingFns)==null?void 0:r[e.columnDef.sortingFn])!=null?n:ln[e.columnDef.sortingFn]},e.toggleSorting=(n,r)=>{const o=e.getNextSortingOrder(),i=typeof n<"u"&&n!==null;t.setSorting(s=>{const a=s==null?void 0:s.find(p=>p.id===e.id),c=s==null?void 0:s.findIndex(p=>p.id===e.id);let u=[],d,g=i?n:o==="desc";if(s!=null&&s.length&&e.getCanMultiSort()&&r?a?d="toggle":d="add":s!=null&&s.length&&c!==s.length-1?d="replace":a?d="toggle":d="replace",d==="toggle"&&(i||o||(d="remove")),d==="add"){var f;u=[...s,{id:e.id,desc:g}],u.splice(0,u.length-((f=t.options.maxMultiSortColCount)!=null?f:Number.MAX_SAFE_INTEGER))}else d==="toggle"?u=s.map(p=>p.id===e.id?{...p,desc:g}:p):d==="remove"?u=s.filter(p=>p.id!==e.id):u=[{id:e.id,desc:g}];return u})},e.getFirstSortDir=()=>{var n,r;return((n=(r=e.columnDef.sortDescFirst)!=null?r:t.options.sortDescFirst)!=null?n:e.getAutoSortDir()==="desc")?"desc":"asc"},e.getNextSortingOrder=n=>{var r,o;const i=e.getFirstSortDir(),s=e.getIsSorted();return s?s!==i&&((r=t.options.enableSortingRemoval)==null||r)&&(!(n&&(o=t.options.enableMultiRemove)!=null)||o)?!1:s==="desc"?"asc":"desc":i},e.getCanSort=()=>{var n,r;return((n=e.columnDef.enableSorting)!=null?n:!0)&&((r=t.options.enableSorting)!=null?r:!0)&&!!e.accessorFn},e.getCanMultiSort=()=>{var n,r;return(n=(r=e.columnDef.enableMultiSort)!=null?r:t.options.enableMultiSort)!=null?n:!!e.accessorFn},e.getIsSorted=()=>{var n;const r=(n=t.getState().sorting)==null?void 0:n.find(o=>o.id===e.id);return r?r.desc?"desc":"asc":!1},e.getSortIndex=()=>{var n,r;return(n=(r=t.getState().sorting)==null?void 0:r.findIndex(o=>o.id===e.id))!=null?n:-1},e.clearSorting=()=>{t.setSorting(n=>n!=null&&n.length?n.filter(r=>r.id!==e.id):[])},e.getToggleSortingHandler=()=>{const n=e.getCanSort();return r=>{n&&(r.persist==null||r.persist(),e.toggleSorting==null||e.toggleSorting(void 0,e.getCanMultiSort()?t.options.isMultiSortEvent==null?void 0:t.options.isMultiSortEvent(r):!1))}}},createTable:e=>{e.setSorting=t=>e.options.onSortingChange==null?void 0:e.options.onSortingChange(t),e.resetSorting=t=>{var n,r;e.setSorting(t?[]:(n=(r=e.initialState)==null?void 0:r.sorting)!=null?n:[])},e.getPreSortedRowModel=()=>e.getGroupedRowModel(),e.getSortedRowModel=()=>(!e._getSortedRowModel&&e.options.getSortedRowModel&&(e._getSortedRowModel=e.options.getSortedRowModel(e)),e.options.manualSorting||!e._getSortedRowModel?e.getPreSortedRowModel():e._getSortedRowModel())}},Vm=[am,Rm,xm,Sm,lm,cm,km,Tm,Fm,ym,Pm,Om,_m,Nm,Cm];function Lm(e){var t,n;process.env.NODE_ENV!=="production"&&(e.debugAll||e.debugTable)&&console.info("Creating Table Instance...");const r=[...Vm,...(t=e._features)!=null?t:[]];let o={_features:r};const i=o._features.reduce((f,p)=>Object.assign(f,p.getDefaultOptions==null?void 0:p.getDefaultOptions(o)),{}),s=f=>o.options.mergeOptions?o.options.mergeOptions(i,f):{...i,...f};let c={...{},...(n=e.initialState)!=null?n:{}};o._features.forEach(f=>{var p;c=(p=f.getInitialState==null?void 0:f.getInitialState(c))!=null?p:c});const u=[];let d=!1;const g={_features:r,options:{...i,...e},initialState:c,_queue:f=>{u.push(f),d||(d=!0,Promise.resolve().then(()=>{for(;u.length;)u.shift()();d=!1}).catch(p=>setTimeout(()=>{throw p})))},reset:()=>{o.setState(o.initialState)},setOptions:f=>{const p=gt(f,o.options);o.options=s(p)},getState:()=>o.options.state,setState:f=>{o.options.onStateChange==null||o.options.onStateChange(f)},_getRowId:(f,p,h)=>{var m;return(m=o.options.getRowId==null?void 0:o.options.getRowId(f,p,h))!=null?m:`${h?[h.id,p].join("."):p}`},getCoreRowModel:()=>(o._getCoreRowModel||(o._getCoreRowModel=o.options.getCoreRowModel(o)),o._getCoreRowModel()),getRowModel:()=>o.getPaginationRowModel(),getRow:(f,p)=>{let h=(p?o.getPrePaginationRowModel():o.getRowModel()).rowsById[f];if(!h&&(h=o.getCoreRowModel().rowsById[f],!h))throw process.env.NODE_ENV!=="production"?new Error(`getRow could not find row with ID: ${f}`):new Error;return h},_getDefaultColumnDef:J(()=>[o.options.defaultColumn],f=>{var p;return f=(p=f)!=null?p:{},{header:h=>{const m=h.header.column.columnDef;return m.accessorKey?m.accessorKey:m.accessorFn?m.id:null},cell:h=>{var m,v;return(m=(v=h.renderValue())==null||v.toString==null?void 0:v.toString())!=null?m:null},...o._features.reduce((h,m)=>Object.assign(h,m.getDefaultColumnDef==null?void 0:m.getDefaultColumnDef()),{}),...f}},Z(e,"debugColumns","_getDefaultColumnDef")),_getColumnDefs:()=>o.options.columns,getAllColumns:J(()=>[o._getColumnDefs()],f=>{const p=function(h,m,v){return v===void 0&&(v=0),h.map(w=>{const P=sm(o,w,v,m),x=w;return P.columns=x.columns?p(x.columns,P,v+1):[],P})};return p(f)},Z(e,"debugColumns","getAllColumns")),getAllFlatColumns:J(()=>[o.getAllColumns()],f=>f.flatMap(p=>p.getFlatColumns()),Z(e,"debugColumns","getAllFlatColumns")),_getAllFlatColumnsById:J(()=>[o.getAllFlatColumns()],f=>f.reduce((p,h)=>(p[h.id]=h,p),{}),Z(e,"debugColumns","getAllFlatColumnsById")),getAllLeafColumns:J(()=>[o.getAllColumns(),o._getOrderColumnsFn()],(f,p)=>{let h=f.flatMap(m=>m.getLeafColumns());return p(h)},Z(e,"debugColumns","getAllLeafColumns")),getColumn:f=>{const p=o._getAllFlatColumnsById()[f];return process.env.NODE_ENV!=="production"&&!p&&console.error(`[Table] Column with id '${f}' does not exist.`),p}};Object.assign(o,g);for(let f=0;f<o._features.length;f++){const p=o._features[f];p==null||p.createTable==null||p.createTable(o)}return o}function Bm(){return e=>J(()=>[e.options.data],t=>{const n={rows:[],flatRows:[],rowsById:{}},r=function(o,i,s){i===void 0&&(i=0);const a=[];for(let u=0;u<o.length;u++){const d=Lo(e,e._getRowId(o[u],u,s),o[u],u,i,void 0,s==null?void 0:s.id);if(n.flatRows.push(d),n.rowsById[d.id]=d,a.push(d),e.options.getSubRows){var c;d.originalSubRows=e.options.getSubRows(o[u],u),(c=d.originalSubRows)!=null&&c.length&&(d.subRows=r(d.originalSubRows,i+1,d))}}return a};return n.rows=r(t),n},Z(e.options,"debugTable","getRowModel",()=>e._autoResetPageIndex()))}function zm(e){const t=[],n=r=>{var o;t.push(r),(o=r.subRows)!=null&&o.length&&r.getIsExpanded()&&r.subRows.forEach(n)};return e.rows.forEach(n),{rows:t,flatRows:e.flatRows,rowsById:e.rowsById}}function Hm(e,t,n){return n.options.filterFromLeafRows?Gm(e,t,n):Um(e,t,n)}function Gm(e,t,n){var r;const o=[],i={},s=(r=n.options.maxLeafRowFilterDepth)!=null?r:100,a=function(c,u){u===void 0&&(u=0);const d=[];for(let f=0;f<c.length;f++){var g;let p=c[f];const h=Lo(n,p.id,p.original,p.index,p.depth,void 0,p.parentId);if(h.columnFilters=p.columnFilters,(g=p.subRows)!=null&&g.length&&u<s){if(h.subRows=a(p.subRows,u+1),p=h,t(p)&&!h.subRows.length){d.push(p),i[p.id]=p,o.push(p);continue}if(t(p)||h.subRows.length){d.push(p),i[p.id]=p,o.push(p);continue}}else p=h,t(p)&&(d.push(p),i[p.id]=p,o.push(p))}return d};return{rows:a(e),flatRows:o,rowsById:i}}function Um(e,t,n){var r;const o=[],i={},s=(r=n.options.maxLeafRowFilterDepth)!=null?r:100,a=function(c,u){u===void 0&&(u=0);const d=[];for(let f=0;f<c.length;f++){let p=c[f];if(t(p)){var g;if((g=p.subRows)!=null&&g.length&&u<s){const m=Lo(n,p.id,p.original,p.index,p.depth,void 0,p.parentId);m.subRows=a(p.subRows,u+1),p=m}d.push(p),o.push(p),i[p.id]=p}}return d};return{rows:a(e),flatRows:o,rowsById:i}}function qm(){return e=>J(()=>[e.getPreFilteredRowModel(),e.getState().columnFilters,e.getState().globalFilter],(t,n,r)=>{if(!t.rows.length||!(n!=null&&n.length)&&!r){for(let f=0;f<t.flatRows.length;f++)t.flatRows[f].columnFilters={},t.flatRows[f].columnFiltersMeta={};return t}const o=[],i=[];(n??[]).forEach(f=>{var p;const h=e.getColumn(f.id);if(!h)return;const m=h.getFilterFn();if(!m){process.env.NODE_ENV!=="production"&&console.warn(`Could not find a valid 'column.filterFn' for column with the ID: ${h.id}.`);return}o.push({id:f.id,filterFn:m,resolvedValue:(p=m.resolveFilterValue==null?void 0:m.resolveFilterValue(f.value))!=null?p:f.value})});const s=n.map(f=>f.id),a=e.getGlobalFilterFn(),c=e.getAllLeafColumns().filter(f=>f.getCanGlobalFilter());r&&a&&c.length&&(s.push("__global__"),c.forEach(f=>{var p;i.push({id:f.id,filterFn:a,resolvedValue:(p=a.resolveFilterValue==null?void 0:a.resolveFilterValue(r))!=null?p:r})}));let u,d;for(let f=0;f<t.flatRows.length;f++){const p=t.flatRows[f];if(p.columnFilters={},o.length)for(let h=0;h<o.length;h++){u=o[h];const m=u.id;p.columnFilters[m]=u.filterFn(p,m,u.resolvedValue,v=>{p.columnFiltersMeta[m]=v})}if(i.length){for(let h=0;h<i.length;h++){d=i[h];const m=d.id;if(d.filterFn(p,m,d.resolvedValue,v=>{p.columnFiltersMeta[m]=v})){p.columnFilters.__global__=!0;break}}p.columnFilters.__global__!==!0&&(p.columnFilters.__global__=!1)}}const g=f=>{for(let p=0;p<s.length;p++)if(f.columnFilters[s[p]]===!1)return!1;return!0};return Hm(t.rows,g,e)},Z(e.options,"debugTable","getFilteredRowModel",()=>e._autoResetPageIndex()))}function Wm(e){return t=>J(()=>[t.getState().pagination,t.getPrePaginationRowModel(),t.options.paginateExpandedRows?void 0:t.getState().expanded],(n,r)=>{if(!r.rows.length)return r;const{pageSize:o,pageIndex:i}=n;let{rows:s,flatRows:a,rowsById:c}=r;const u=o*i,d=u+o;s=s.slice(u,d);let g;t.options.paginateExpandedRows?g={rows:s,flatRows:a,rowsById:c}:g=zm({rows:s,flatRows:a,rowsById:c}),g.flatRows=[];const f=p=>{g.flatRows.push(p),p.subRows.length&&p.subRows.forEach(f)};return g.rows.forEach(f),g},Z(t.options,"debugTable","getPaginationRowModel"))}function Xm(){return e=>J(()=>[e.getState().sorting,e.getPreSortedRowModel()],(t,n)=>{if(!n.rows.length||!(t!=null&&t.length))return n;const r=e.getState().sorting,o=[],i=r.filter(c=>{var u;return(u=e.getColumn(c.id))==null?void 0:u.getCanSort()}),s={};i.forEach(c=>{const u=e.getColumn(c.id);u&&(s[c.id]={sortUndefined:u.columnDef.sortUndefined,invertSorting:u.columnDef.invertSorting,sortingFn:u.getSortingFn()})});const a=c=>{const u=c.map(d=>({...d}));return u.sort((d,g)=>{for(let p=0;p<i.length;p+=1){var f;const h=i[p],m=s[h.id],v=m.sortUndefined,w=(f=h==null?void 0:h.desc)!=null?f:!1;let P=0;if(v){const x=d.getValue(h.id),S=g.getValue(h.id),y=x===void 0,k=S===void 0;if(y||k){if(v==="first")return y?-1:1;if(v==="last")return y?1:-1;P=y&&k?0:y?v:-v}}if(P===0&&(P=m.sortingFn(d,g,h.id)),P!==0)return w&&(P*=-1),m.invertSorting&&(P*=-1),P}return d.index-g.index}),u.forEach(d=>{var g;o.push(d),(g=d.subRows)!=null&&g.length&&(d.subRows=a(d.subRows))}),u};return{rows:a(n.rows),flatRows:o,rowsById:n.rowsById}},Z(e.options,"debugTable","getSortedRowModel",()=>e._autoResetPageIndex()))}/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function is(e,t){return e?Ym(e)?C.createElement(e,t):e:null}function Ym(e){return Km(e)||typeof e=="function"||Jm(e)}function Km(e){return typeof e=="function"&&(()=>{const t=Object.getPrototypeOf(e);return t.prototype&&t.prototype.isReactComponent})()}function Jm(e){return typeof e=="object"&&typeof e.$$typeof=="symbol"&&["react.memo","react.forward_ref"].includes(e.$$typeof.description)}function Zm(e){const t={state:{},onStateChange:()=>{},renderFallbackValue:null,...e},[n]=C.useState(()=>({current:Lm(t)})),[r,o]=C.useState(()=>n.current.initialState);return n.current.setOptions(i=>({...i,...e,state:{...r,...e.state},onStateChange:s=>{o(s),e.onStateChange==null||e.onStateChange(s)}})),n.current}const Fa=C.forwardRef(({className:e,...t},n)=>b.jsx("div",{className:"pr-relative pr-w-full pr-overflow-auto",children:b.jsx("table",{ref:n,className:re("pr-w-full pr-caption-bottom pr-text-sm",e),...t})}));Fa.displayName="Table";const Va=C.forwardRef(({className:e,...t},n)=>b.jsx("thead",{ref:n,className:re("[&_tr]:pr-border-b",e),...t}));Va.displayName="TableHeader";const La=C.forwardRef(({className:e,...t},n)=>b.jsx("tbody",{ref:n,className:re("[&_tr:last-child]:pr-border-0",e),...t}));La.displayName="TableBody";const Qm=C.forwardRef(({className:e,...t},n)=>b.jsx("tfoot",{ref:n,className:re("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));Qm.displayName="TableFooter";const Wn=C.forwardRef(({className:e,...t},n)=>b.jsx("tr",{ref:n,className:re("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));Wn.displayName="TableRow";const Ba=C.forwardRef(({className:e,...t},n)=>b.jsx("th",{ref:n,className:re("pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",e),...t}));Ba.displayName="TableHead";const lo=C.forwardRef(({className:e,...t},n)=>b.jsx("td",{ref:n,className:re("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0",e),...t}));lo.displayName="TableCell";const eh=C.forwardRef(({className:e,...t},n)=>b.jsx("caption",{ref:n,className:re("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));eh.displayName="TableCaption";const th=xe.Root,nh=xe.Value,za=C.forwardRef(({className:e,children:t,...n},r)=>b.jsxs(xe.Trigger,{ref:r,className:re("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...n,children:[t,b.jsx(xe.Icon,{asChild:!0,children:b.jsx(ke.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));za.displayName=xe.Trigger.displayName;const Ha=C.forwardRef(({className:e,...t},n)=>b.jsx(xe.ScrollUpButton,{ref:n,className:re("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:b.jsx(ke.ChevronUp,{className:"pr-h-4 pr-w-4"})}));Ha.displayName=xe.ScrollUpButton.displayName;const Ga=C.forwardRef(({className:e,...t},n)=>b.jsx(xe.ScrollDownButton,{ref:n,className:re("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:b.jsx(ke.ChevronDown,{className:"pr-h-4 pr-w-4"})}));Ga.displayName=xe.ScrollDownButton.displayName;const Ua=C.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>b.jsx(xe.Portal,{children:b.jsxs(xe.Content,{ref:o,className:re("pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:n,...r,children:[b.jsx(Ha,{}),b.jsx(xe.Viewport,{className:re("pr-p-1",n==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),b.jsx(Ga,{})]})}));Ua.displayName=xe.Content.displayName;const rh=C.forwardRef(({className:e,...t},n)=>b.jsx(xe.Label,{ref:n,className:re("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));rh.displayName=xe.Label.displayName;const qa=C.forwardRef(({className:e,children:t,...n},r)=>b.jsxs(xe.Item,{ref:r,className:re("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[b.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:b.jsx(xe.ItemIndicator,{children:b.jsx(ke.Check,{className:"pr-h-4 pr-w-4"})})}),b.jsx(xe.ItemText,{children:t})]}));qa.displayName=xe.Item.displayName;const oh=C.forwardRef(({className:e,...t},n)=>b.jsx(xe.Separator,{ref:n,className:re("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));oh.displayName=xe.Separator.displayName;function ih({table:e}){return b.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:b.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[b.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),b.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[b.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),b.jsxs(th,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[b.jsx(za,{className:"pr-h-8 pr-w-[70px]",children:b.jsx(nh,{placeholder:e.getState().pagination.pageSize})}),b.jsx(Ua,{side:"top",children:[10,20,30,40,50].map(t=>b.jsx(qa,{value:`${t}`,children:t},t))})]})]}),b.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),b.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[b.jsxs(ot,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[b.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),b.jsx(ke.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),b.jsxs(ot,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[b.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),b.jsx(ke.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),b.jsxs(ot,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[b.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),b.jsx(ke.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),b.jsxs(ot,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[b.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),b.jsx(ke.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}function sh({table:e}){return b.jsxs(fo,{children:[b.jsx(ss.DropdownMenuTrigger,{asChild:!0,children:b.jsxs(ot,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[b.jsx(ke.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),b.jsxs(rr,{align:"end",className:"pr-w-[150px]",children:[b.jsx(En,{children:"Toggle columns"}),b.jsx(or,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>b.jsx(mo,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}function ah({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,onRowClickHandler:i=(s,a)=>{}}){var m;const[s,a]=I.useState([]),[c,u]=I.useState([]),[d,g]=I.useState({}),[f,p]=I.useState({}),h=Zm({data:t,columns:e,getCoreRowModel:Bm(),...n&&{getPaginationRowModel:Wm()},onSortingChange:a,getSortedRowModel:Xm(),onColumnFiltersChange:u,getFilteredRowModel:qm(),onColumnVisibilityChange:g,onRowSelectionChange:p,state:{sorting:s,columnFilters:c,columnVisibility:d,rowSelection:f}});return b.jsxs("div",{children:[o&&b.jsx(sh,{table:h}),b.jsx("div",{className:"pr-rounded-md pr-border",children:b.jsxs(Fa,{children:[b.jsx(Va,{children:h.getHeaderGroups().map(v=>b.jsx(Wn,{children:v.headers.map(w=>b.jsx(Ba,{children:w.isPlaceholder?void 0:is(w.column.columnDef.header,w.getContext())},w.id))},v.id))}),b.jsx(La,{children:(m=h.getRowModel().rows)!=null&&m.length?h.getRowModel().rows.map(v=>b.jsx(Wn,{onClick:()=>i(h,v),"data-state":v.getIsSelected()&&"selected",children:v.getVisibleCells().map(w=>b.jsx(lo,{children:is(w.column.columnDef.cell,w.getContext())},w.id))},v.id)):b.jsx(Wn,{children:b.jsx(lo,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]})}),n&&b.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[b.jsx(ot,{variant:"outline",size:"sm",onClick:()=>h.previousPage(),disabled:!h.getCanPreviousPage(),children:"Previous"}),b.jsx(ot,{variant:"outline",size:"sm",onClick:()=>h.nextPage(),disabled:!h.getCanNextPage(),children:"Next"})]}),n&&r&&b.jsx(ih,{table:h})]})}function lh({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const i=I.useRef(void 0);return b.jsx("div",{ref:i,style:{position:"relative"},children:b.jsx(ve.AppBar,{position:"static",id:r,children:b.jsxs(ve.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?b.jsx(Ta,{commandHandler:t,containerRef:i,menuProvider:e}):void 0,o?b.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const ch=(e,t)=>{I.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Hr=()=>!1,uh=(e,t)=>{const[n]=nr(I.useCallback(async()=>{if(!e)return Hr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Hr,{preserveValue:!1});I.useEffect(()=>()=>{n!==Hr&&n()},[n])},dh=je.Root,Wa=I.forwardRef(({className:e,...t},n)=>b.jsx(je.List,{ref:n,className:re("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Wa.displayName=je.List.displayName;const Xa=I.forwardRef(({className:e,...t},n)=>b.jsx(je.Trigger,{ref:n,className:re("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));Xa.displayName=je.Trigger.displayName;const Ya=I.forwardRef(({className:e,...t},n)=>b.jsx(je.Content,{ref:n,className:re("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));Ya.displayName=je.Content.displayName;const Ka=I.forwardRef(({className:e,...t},n)=>b.jsx(je.Root,{orientation:"vertical",ref:n,className:re("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));Ka.displayName=je.List.displayName;const Ja=I.forwardRef(({className:e,...t},n)=>b.jsx(je.List,{ref:n,className:re("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Ja.displayName=je.List.displayName;const ph=I.forwardRef(({className:e,...t},n)=>b.jsx(je.Trigger,{ref:n,...t,className:re("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),children:b.jsx("div",{className:"pr-flex pr-flex-col pr-justify-center",children:b.jsx("div",{children:t.value})})})),Za=I.forwardRef(({className:e,...t},n)=>b.jsx(je.Content,{ref:n,className:re("mt-2 pr-ml-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));Za.displayName=je.Content.displayName;exports.BookChapterControl=Ul;exports.Button=Wl;exports.ChapterRangeSelector=Xl;exports.Checkbox=ho;exports.Checklist=Yl;exports.ComboBox=Ur;exports.ContextMenu=qg;exports.DataTable=ah;exports.DropdownMenu=fo;exports.DropdownMenuCheckboxItem=mo;exports.DropdownMenuContent=rr;exports.DropdownMenuGroup=_l;exports.DropdownMenuItem=go;exports.DropdownMenuLabel=En;exports.DropdownMenuPortal=Nl;exports.DropdownMenuRadioGroup=Ml;exports.DropdownMenuRadioItem=bs;exports.DropdownMenuSeparator=or;exports.DropdownMenuShortcut=ys;exports.DropdownMenuSub=$l;exports.DropdownMenuSubContent=vs;exports.DropdownMenuSubTrigger=hs;exports.DropdownMenuTrigger=ms;exports.GridMenu=ma;exports.HamburgerMenuButton=Ta;exports.IconButton=Yg;exports.Input=ir;exports.LabelPosition=Ct;exports.MenuItem=Ao;exports.SearchBar=Jg;exports.Slider=Zg;exports.Snackbar=Qg;exports.Switch=em;exports.Table=nm;exports.Tabs=dh;exports.TabsContent=Ya;exports.TabsList=Wa;exports.TabsTrigger=Xa;exports.TextField=Vo;exports.Toolbar=lh;exports.VerticalTabs=Ka;exports.VerticalTabsContent=Za;exports.VerticalTabsList=Ja;exports.VerticalTabsTrigger=ph;exports.useEvent=ch;exports.useEventAsync=uh;exports.usePromise=nr;function fh(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}fh(`.papi-slider {
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
/*
! tailwindcss v3.4.3 | MIT License | https://tailwindcss.com
*//*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before,
::after {
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

html,
:host {
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

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
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

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden] {
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
.pr-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.pr-my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.pr-ml-5 {
  margin-left: 1.25rem;
}
.pr-ml-auto {
  margin-left: auto;
}
.pr-mr-2 {
  margin-right: 0.5rem;
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
}
.papi-button {
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
