"use strict";var al=Object.defineProperty;var ll=(e,t,n)=>t in e?al(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Nt=(e,t,n)=>(ll(e,typeof t!="symbol"?t+"":t,n),n);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const y=require("react/jsx-runtime"),I=require("react"),Ee=require("platform-bible-utils"),ul=require("@radix-ui/react-dropdown-menu"),Et=require("lucide-react"),ke=require("clsx"),cl=require("tailwind-merge"),dl=require("@radix-ui/react-slot"),ss=require("class-variance-authority"),ve=require("@mui/material"),Kr=require("@mui/styled-engine"),cn=require("react-dom"),pl=require("@radix-ui/react-label"),ii=require("react-data-grid"),fl=require("@radix-ui/react-tabs");function Tn(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const R=Tn(I),me=Tn(ul),gl=Tn(cn),as=Tn(pl),Ie=Tn(fl);var ml=Object.defineProperty,hl=(e,t,n)=>t in e?ml(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,oe=(e,t,n)=>(hl(e,typeof t!="symbol"?t+"":t,n),n);const kt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],fo=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ls=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],si=kl();function Kt(e,t=!0){return t&&(e=e.toUpperCase()),e in si?si[e]:0}function go(e){return Kt(e)>0}function vl(e){const t=typeof e=="string"?Kt(e):e;return t>=40&&t<=66}function bl(e){return(typeof e=="string"?Kt(e):e)<=39}function us(e){return e<=66}function yl(e){const t=typeof e=="string"?Kt(e):e;return ps(t)&&!us(t)}function*wl(){for(let e=1;e<=kt.length;e++)yield e}const xl=1,cs=kt.length;function Sl(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function mo(e,t="***"){const n=e-1;return n<0||n>=kt.length?t:kt[n]}function ds(e){return e<=0||e>cs?"******":ls[e-1]}function Cl(e){return ds(Kt(e))}function ps(e){const t=typeof e=="number"?mo(e):e;return go(t)&&!fo.includes(t)}function El(e){const t=typeof e=="number"?mo(e):e;return go(t)&&fo.includes(t)}function Rl(e){return ls[e-1].includes("*obsolete*")}function kl(){const e={};for(let t=0;t<kt.length;t++)e[kt[t]]=t+1;return e}const le={allBookIds:kt,nonCanonicalIds:fo,bookIdToNumber:Kt,isBookIdValid:go,isBookNT:vl,isBookOT:bl,isBookOTNT:us,isBookDC:yl,allBookNumbers:wl,firstBook:xl,lastBook:cs,extraBooks:Sl,bookNumberToId:mo,bookNumberToEnglishName:ds,bookIdToEnglishName:Cl,isCanonical:ps,isExtraMaterial:El,isObsolete:Rl};var ct=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(ct||{});const je=class{constructor(t){if(oe(this,"name"),oe(this,"fullPath"),oe(this,"isPresent"),oe(this,"hasVerseSegments"),oe(this,"isCustomized"),oe(this,"baseVersification"),oe(this,"scriptureBooks"),oe(this,"_type"),t!=null)typeof t=="string"?this.name=t:this._type=t;else throw new Error("Argument null")}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};oe(je,"Original",new je(ct.Original)),oe(je,"Septuagint",new je(ct.Septuagint)),oe(je,"Vulgate",new je(ct.Vulgate)),oe(je,"English",new je(ct.English)),oe(je,"RussianProtestant",new je(ct.RussianProtestant)),oe(je,"RussianOrthodox",new je(ct.RussianOrthodox));let Vt=je;function ai(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var fs=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(fs||{});const $e=class ae{constructor(t,n,r,o){if(oe(this,"firstChapter"),oe(this,"lastChapter"),oe(this,"lastVerse"),oe(this,"hasSegmentsDefined"),oe(this,"text"),oe(this,"BBBCCCVVVS"),oe(this,"longHashCode"),oe(this,"versification"),oe(this,"rtlMark","‏"),oe(this,"_bookNum",0),oe(this,"_chapterNum",0),oe(this,"_verseNum",0),oe(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,s=n!=null&&n instanceof Vt?n:void 0;this.setEmpty(s),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof Vt?n:void 0;this.setEmpty(i),this._verseNum=t%ae.chapterDigitShifter,this._chapterNum=Math.floor(t%ae.bookDigitShifter/ae.chapterDigitShifter),this._bookNum=Math.floor(t/ae.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ae){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof Vt?t:ae.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ae.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(t,n=ae.defaultVersification){const r=new ae(n);return r.parse(t),r}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=ae.parse(t),{success:!0,verseRef:n}}catch(r){if(r instanceof nn)return n=new ae,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ae.bcvMaxValue*ae.bookDigitShifter+(n>=0?n%ae.bcvMaxValue*ae.chapterDigitShifter:0)+(r>=0?r%ae.bcvMaxValue:0)}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>ae.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ae.verseRangeSeparator)||this._verse.includes(ae.verseSequenceIndicator))}get book(){return le.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=le.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ae.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ae.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>le.lastBook)throw new nn("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Vt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ae.verseRangeSeparators,ae.verseSequenceIndicators)}get BBBCCC(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const s=+i[1].trim();this.versification=new Vt(ct[s])}catch{throw new nn("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new nn("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||le.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ae.isVerseParseable(r[1]))throw new nn("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ae(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}equals(t){return t instanceof ae?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification):!1}allVerses(t=!1,n=ae.verseRangeSeparators,r=ae.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=ai(this._verse,r);for(const s of i.map(a=>ai(a,n))){const a=this.clone();a.verse=s[0];const u=a.verseNum;if(o.push(a),s.length>1){const c=this.clone();if(c.verse=s[1],!t)for(let d=u+1;d<c.verseNum;d++){const g=new ae(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(g)}o.push(c)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>le.lastBook?2:(le.isCanonical(this._bookNum),0)}setEmpty(t=ae.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=le.bookIdToNumber(t),this.chapter=n,this.verse=r}};oe($e,"defaultVersification",Vt.English),oe($e,"verseRangeSeparator","-"),oe($e,"verseSequenceIndicator",","),oe($e,"verseRangeSeparators",[$e.verseRangeSeparator]),oe($e,"verseSequenceIndicators",[$e.verseSequenceIndicator]),oe($e,"chapterDigitShifter",1e3),oe($e,"bookDigitShifter",$e.chapterDigitShifter*$e.chapterDigitShifter),oe($e,"bcvMaxValue",$e.chapterDigitShifter-1),oe($e,"ValidStatusType",fs);class nn extends Error{}function ge(...e){return cl.twMerge(ke.clsx(e))}const gs=me.Root,ms=me.Trigger,Tl=me.Group,Pl=me.Portal,Ol=me.Sub,_l=me.RadioGroup,hs=I.forwardRef(({className:e,inset:t,children:n,...r},o)=>y.jsxs(me.SubTrigger,{ref:o,className:ge("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,y.jsx(Et.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));hs.displayName=me.SubTrigger.displayName;const vs=I.forwardRef(({className:e,...t},n)=>y.jsx(me.SubContent,{ref:n,className:ge("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));vs.displayName=me.SubContent.displayName;const ho=I.forwardRef(({className:e,sideOffset:t=4,...n},r)=>y.jsx(me.Portal,{children:y.jsx(me.Content,{ref:r,sideOffset:t,className:ge("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));ho.displayName=me.Content.displayName;const vo=I.forwardRef(({className:e,inset:t,...n},r)=>y.jsx(me.Item,{ref:r,className:ge("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));vo.displayName=me.Item.displayName;const bs=I.forwardRef(({className:e,children:t,checked:n,...r},o)=>y.jsxs(me.CheckboxItem,{ref:o,className:ge("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[y.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:y.jsx(me.ItemIndicator,{children:y.jsx(Et.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));bs.displayName=me.CheckboxItem.displayName;const ys=I.forwardRef(({className:e,children:t,...n},r)=>y.jsxs(me.RadioItem,{ref:r,className:ge("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[y.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:y.jsx(me.ItemIndicator,{children:y.jsx(Et.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));ys.displayName=me.RadioItem.displayName;const sr=I.forwardRef(({className:e,inset:t,...n},r)=>y.jsx(me.Label,{ref:r,className:ge("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));sr.displayName=me.Label.displayName;const bo=I.forwardRef(({className:e,...t},n)=>y.jsx(me.Separator,{ref:n,className:ge("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));bo.displayName=me.Separator.displayName;function ws({className:e,...t}){return y.jsx("span",{className:ge("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}ws.displayName="DropdownMenuShortcut";const ar=I.forwardRef(({className:e,type:t,...n},r)=>y.jsx("input",{type:t,className:ge("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));ar.displayName="Input";const $l=I.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},i)=>y.jsxs("div",{className:"pr-relative",children:[y.jsx(ar,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r(),t(s)},onClick:n,ref:i}),y.jsx(Et.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function Nl({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const i=Array.from({length:t},(a,u)=>u+1),s=I.useCallback(a=>{o(a)},[o]);return y.jsx("div",{className:ge("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:i.map(a=>y.jsx("div",{className:ge("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":a===n,"pr-bg-amber-200":a===r}),onClick:u=>{u.preventDefault(),u.stopPropagation(),e(a)},role:"button",onKeyDown:u=>{u.key==="Enter"&&e(a)},tabIndex:0,onMouseMove:()=>s(a),children:a},a))})}const Ml=I.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:i,children:s},a)=>y.jsxs(vo,{ref:a,textValue:e,className:ge("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:u=>{u.preventDefault(),t()},onKeyDown:u=>{o(u)},onFocus:r,onMouseMove:r,children:[y.jsx("span",{className:ge("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":i.toLowerCase()==="ot","pr-border-l-purple-200":i.toLowerCase()==="nt","pr-border-l-indigo-200":i.toLowerCase()==="dc"}),children:le.bookIdToEnglishName(e)}),n&&y.jsx("div",{children:s})]},e));function Il({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return y.jsxs(sr,{className:"pr-flex pr-justify-between",children:[y.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),y.jsxs("div",{className:"pr-flex pr-items-center",children:[y.jsx(Et.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),y.jsx(Et.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),y.jsx(Et.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const mn=le.allBookIds,Dl={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},li=["OT","NT","DC"],Al=32+32+32,jl=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Fl=e=>({OT:mn.filter(n=>le.isBookOT(n)),NT:mn.filter(n=>le.isBookNT(n)),DC:mn.filter(n=>le.isBookDC(n))})[e],rn=e=>Ee.getChaptersForBook(le.bookIdToNumber(e));function Vl(){return mn.map(t=>le.bookIdToEnglishName(t))}function Ll(e){return Vl().includes(e)}function Bl(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(Ll(t))return mn.find(r=>le.bookIdToEnglishName(r)===t)}function zl({scrRef:e,handleSubmit:t}){const[n,r]=I.useState(""),[o,i]=I.useState(le.bookNumberToId(e.bookNum)),[s,a]=I.useState(e.chapterNum??0),[u,c]=I.useState(le.bookNumberToId(e.bookNum)),[d,g]=I.useState(!1),[p,f]=I.useState(d),h=I.useRef(void 0),m=I.useRef(void 0),v=I.useRef(void 0),w=I.useCallback(_=>Fl(_).filter(E=>{const k=le.bookIdToEnglishName(E).toLowerCase(),N=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return k.includes(N)||E.toLowerCase().includes(N)}),[n]),O=_=>{r(_)},x=I.useRef(!1),S=I.useCallback(_=>{if(x.current){x.current=!1;return}g(_)},[]),b=I.useCallback((_,E,k,N)=>{if(a(le.bookNumberToId(e.bookNum)!==_?1:e.chapterNum),E||rn(_)===-1){t({bookNum:le.bookIdToNumber(_),chapterNum:k||1,verseNum:N||1}),g(!1),r("");return}i(o!==_?_:""),g(!E)},[t,e.bookNum,e.chapterNum,o]),C=_=>{_<=0||_>rn(o)||b(o,!0,_)},$=I.useCallback(()=>{jl.forEach(_=>{const E=n.match(_);if(E){const[k,N=void 0,A=void 0]=E.slice(1),D=Bl(k);(le.isBookIdValid(k)||D)&&b(D??k,!0,N?parseInt(N,10):1,A?parseInt(A,10):1)}})},[b,n]),j=I.useCallback(_=>{d?(_.key==="ArrowDown"||_.key==="ArrowUp")&&(typeof v<"u"&&v.current!==null?v.current.focus():typeof m<"u"&&m.current!==null&&m.current.focus(),_.preventDefault()):g(!0)},[d]),F=_=>{const{key:E}=_;E==="ArrowRight"||E==="ArrowLeft"||E==="ArrowDown"||E==="ArrowUp"||E==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:E})),h.current.focus())},B=_=>{const{key:E}=_;if(u===o){if(E==="Enter"){_.preventDefault(),b(o,!0,s);return}let k=0;if(E==="ArrowRight")if(s<rn(u))k=1;else{_.preventDefault();return}else if(E==="ArrowLeft")if(s>1)k=-1;else{_.preventDefault();return}else E==="ArrowDown"?k=6:E==="ArrowUp"&&(k=-6);s+k<=0||s+k>rn(u)?a(0):k!==0&&(a(s+k),_.preventDefault())}};return I.useEffect(()=>{o===u?o===le.bookNumberToId(e.bookNum)?a(e.chapterNum):a(1):a(0)},[u,e.bookNum,e.chapterNum,o]),I.useLayoutEffect(()=>{f(d)},[d]),I.useLayoutEffect(()=>{const _=setTimeout(()=>{if(p&&m.current&&v.current){const k=v.current.offsetTop-Al;m.current.scrollTo({top:k,behavior:"instant"})}},10);return()=>{clearTimeout(_)}},[p]),y.jsx("div",{children:y.jsxs(gs,{modal:!1,open:d,onOpenChange:S,children:[y.jsx(ms,{asChild:!0,children:y.jsx($l,{ref:h,value:n,handleSearch:O,handleKeyDown:j,handleOnClick:()=>{i(le.bookNumberToId(e.bookNum)),c(le.bookNumberToId(e.bookNum)),a(e.chapterNum>0?e.chapterNum:0),g(!0),h.current.focus()},onFocus:()=>{x.current=!0},handleSubmit:$,placeholder:`${le.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),y.jsxs(ho,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:F,align:"start",ref:m,children:[y.jsx(Il,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),li.map((_,E)=>w(_).length>0&&y.jsxs("div",{children:[y.jsx(sr,{className:"pr-font-semibold pr-text-slate-700",children:Dl[_]}),w(_).map(k=>y.jsx("div",{children:y.jsx(Ml,{bookId:k,handleSelectBook:()=>b(k,!1),isSelected:o===k,handleHighlightBook:()=>c(k),handleKeyDown:B,bookType:_,ref:N=>{o===k&&(v.current=N)},children:y.jsx(Nl,{handleSelectChapter:C,endChapter:rn(k),activeChapter:e.bookNum===le.bookIdToNumber(k)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:N=>{a(N)}})})},k)),li.length-1!==E?y.jsx(bo,{}):void 0]},_))]})]})})}const Hl=ss.cva("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),xs=I.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},i)=>{const s=r?dl.Slot:"button";return y.jsx(s,{className:ge(Hl({variant:t,size:n,className:e})),ref:i,...o})});xs.displayName="Button";function yt({id:e,isDisabled:t=!1,className:n,onClick:r,onContextMenu:o,children:i}){return y.jsx(xs,{id:e,disabled:t,className:ge("papi-button",n),onClick:r,onContextMenu:o,children:i})}function Yn({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:s,options:a=[],className:u,value:c,onChange:d,onFocus:g,onBlur:p,getOptionLabel:f}){return y.jsx(ve.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:i,options:a,className:`papi-combo-box ${o?"error":""} ${u??""}`,value:c,onChange:d,onFocus:g,onBlur:p,getOptionLabel:f,renderInput:h=>y.jsx(ve.TextField,{...h,error:o,fullWidth:i,disabled:n,label:t,style:{width:s}})})}function Gl({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,i]=I.useState(1),[s,a]=I.useState(r),[u,c]=I.useState(Array.from({length:r},(p,f)=>f+1));I.useEffect(()=>{i(1),e(1),a(r),t(r),c(Array.from({length:r},(p,f)=>f+1))},[r,t,e]);const d=(p,f)=>{i(f),e(f),f>s&&(a(f),t(f))},g=(p,f)=>{a(f),t(f),f<o&&(i(f),e(f))};return y.jsxs(y.Fragment,{children:[y.jsx(ve.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:y.jsx(Yn,{onChange:(p,f)=>d(p,f),className:"book-selection-chapter",isClearable:!1,options:u,getOptionLabel:p=>p.toString(),value:o,isDisabled:n},"start chapter"),label:"Chapters",labelPlacement:"start"}),y.jsx(ve.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:y.jsx(Yn,{onChange:(p,f)=>g(p,f),className:"book-selection-chapter",isClearable:!1,options:u,getOptionLabel:p=>p.toString(),value:s,isDisabled:n},"end chapter"),label:"to",labelPlacement:"start"})]})}var St=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(St||{});function yo({id:e,isChecked:t,labelText:n="",labelPosition:r=St.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:s=!1,hasError:a=!1,className:u,onChange:c}){const d=y.jsx(ve.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:s,className:`papi-checkbox ${a?"error":""} ${u??""}`,onChange:c});let g;if(n){const p=r===St.Before||r===St.Above,f=y.jsx("span",{className:`papi-checkbox-label ${a?"error":""} ${u??""}`,children:n}),h=r===St.Before||r===St.After,m=h?f:y.jsx("div",{children:f}),v=h?d:y.jsx("div",{children:d});g=y.jsxs(ve.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:a,children:[p&&m,v,!p&&m]})}else g=d;return g}function Ul({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:i,createLabel:s}){return y.jsxs("fieldset",{id:e,className:t,children:[n&&y.jsx("legend",{children:n}),r.map(a=>y.jsx(yo,{className:"check-item",isChecked:o.includes(a),labelText:s?s(a):a,onChange:()=>i(a)},a))]})}function fe(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function T(){return T=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},T.apply(this,arguments)}function ql(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Wl(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Yr={exports:{}},Fn={exports:{}},ue={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ui;function Xl(){if(ui)return ue;ui=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,a=e?Symbol.for("react.context"):60110,u=e?Symbol.for("react.async_mode"):60111,c=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,g=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,f=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,v=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,O=e?Symbol.for("react.scope"):60119;function x(b){if(typeof b=="object"&&b!==null){var C=b.$$typeof;switch(C){case t:switch(b=b.type,b){case u:case c:case r:case i:case o:case g:return b;default:switch(b=b&&b.$$typeof,b){case a:case d:case h:case f:case s:return b;default:return C}}case n:return C}}}function S(b){return x(b)===c}return ue.AsyncMode=u,ue.ConcurrentMode=c,ue.ContextConsumer=a,ue.ContextProvider=s,ue.Element=t,ue.ForwardRef=d,ue.Fragment=r,ue.Lazy=h,ue.Memo=f,ue.Portal=n,ue.Profiler=i,ue.StrictMode=o,ue.Suspense=g,ue.isAsyncMode=function(b){return S(b)||x(b)===u},ue.isConcurrentMode=S,ue.isContextConsumer=function(b){return x(b)===a},ue.isContextProvider=function(b){return x(b)===s},ue.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===t},ue.isForwardRef=function(b){return x(b)===d},ue.isFragment=function(b){return x(b)===r},ue.isLazy=function(b){return x(b)===h},ue.isMemo=function(b){return x(b)===f},ue.isPortal=function(b){return x(b)===n},ue.isProfiler=function(b){return x(b)===i},ue.isStrictMode=function(b){return x(b)===o},ue.isSuspense=function(b){return x(b)===g},ue.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===r||b===c||b===i||b===o||b===g||b===p||typeof b=="object"&&b!==null&&(b.$$typeof===h||b.$$typeof===f||b.$$typeof===s||b.$$typeof===a||b.$$typeof===d||b.$$typeof===v||b.$$typeof===w||b.$$typeof===O||b.$$typeof===m)},ue.typeOf=x,ue}var ce={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ci;function Kl(){return ci||(ci=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,a=e?Symbol.for("react.context"):60110,u=e?Symbol.for("react.async_mode"):60111,c=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,g=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,f=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,v=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,O=e?Symbol.for("react.scope"):60119;function x(V){return typeof V=="string"||typeof V=="function"||V===r||V===c||V===i||V===o||V===g||V===p||typeof V=="object"&&V!==null&&(V.$$typeof===h||V.$$typeof===f||V.$$typeof===s||V.$$typeof===a||V.$$typeof===d||V.$$typeof===v||V.$$typeof===w||V.$$typeof===O||V.$$typeof===m)}function S(V){if(typeof V=="object"&&V!==null){var ne=V.$$typeof;switch(ne){case t:var M=V.type;switch(M){case u:case c:case r:case i:case o:case g:return M;default:var se=M&&M.$$typeof;switch(se){case a:case d:case h:case f:case s:return se;default:return ne}}case n:return ne}}}var b=u,C=c,$=a,j=s,F=t,B=d,_=r,E=h,k=f,N=n,A=i,D=o,z=g,Q=!1;function te(V){return Q||(Q=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),P(V)||S(V)===u}function P(V){return S(V)===c}function L(V){return S(V)===a}function G(V){return S(V)===s}function K(V){return typeof V=="object"&&V!==null&&V.$$typeof===t}function H(V){return S(V)===d}function U(V){return S(V)===r}function W(V){return S(V)===h}function X(V){return S(V)===f}function q(V){return S(V)===n}function Y(V){return S(V)===i}function ee(V){return S(V)===o}function ie(V){return S(V)===g}ce.AsyncMode=b,ce.ConcurrentMode=C,ce.ContextConsumer=$,ce.ContextProvider=j,ce.Element=F,ce.ForwardRef=B,ce.Fragment=_,ce.Lazy=E,ce.Memo=k,ce.Portal=N,ce.Profiler=A,ce.StrictMode=D,ce.Suspense=z,ce.isAsyncMode=te,ce.isConcurrentMode=P,ce.isContextConsumer=L,ce.isContextProvider=G,ce.isElement=K,ce.isForwardRef=H,ce.isFragment=U,ce.isLazy=W,ce.isMemo=X,ce.isPortal=q,ce.isProfiler=Y,ce.isStrictMode=ee,ce.isSuspense=ie,ce.isValidElementType=x,ce.typeOf=S}()),ce}var di;function Ss(){return di||(di=1,process.env.NODE_ENV==="production"?Fn.exports=Xl():Fn.exports=Kl()),Fn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var kr,pi;function Yl(){if(pi)return kr;pi=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var s={},a=0;a<10;a++)s["_"+String.fromCharCode(a)]=a;var u=Object.getOwnPropertyNames(s).map(function(d){return s[d]});if(u.join("")!=="0123456789")return!1;var c={};return"abcdefghijklmnopqrst".split("").forEach(function(d){c[d]=d}),Object.keys(Object.assign({},c)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return kr=o()?Object.assign:function(i,s){for(var a,u=r(i),c,d=1;d<arguments.length;d++){a=Object(arguments[d]);for(var g in a)t.call(a,g)&&(u[g]=a[g]);if(e){c=e(a);for(var p=0;p<c.length;p++)n.call(a,c[p])&&(u[c[p]]=a[c[p]])}}return u},kr}var Tr,fi;function wo(){if(fi)return Tr;fi=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Tr=e,Tr}var Pr,gi;function Cs(){return gi||(gi=1,Pr=Function.call.bind(Object.prototype.hasOwnProperty)),Pr}var Or,mi;function Jl(){if(mi)return Or;mi=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=wo(),n={},r=Cs();e=function(i){var s="Warning: "+i;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(i,s,a,u,c){if(process.env.NODE_ENV!=="production"){for(var d in i)if(r(i,d)){var g;try{if(typeof i[d]!="function"){var p=Error((u||"React class")+": "+a+" type `"+d+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[d]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw p.name="Invariant Violation",p}g=i[d](s,d,u,a,null,t)}catch(h){g=h}if(g&&!(g instanceof Error)&&e((u||"React class")+": type specification of "+a+" `"+d+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof g+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),g instanceof Error&&!(g.message in n)){n[g.message]=!0;var f=c?c():"";e("Failed "+a+" type: "+g.message+(f??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Or=o,Or}var _r,hi;function Zl(){if(hi)return _r;hi=1;var e=Ss(),t=Yl(),n=wo(),r=Cs(),o=Jl(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(a){var u="Warning: "+a;typeof console<"u"&&console.error(u);try{throw new Error(u)}catch{}});function s(){return null}return _r=function(a,u){var c=typeof Symbol=="function"&&Symbol.iterator,d="@@iterator";function g(P){var L=P&&(c&&P[c]||P[d]);if(typeof L=="function")return L}var p="<<anonymous>>",f={array:w("array"),bigint:w("bigint"),bool:w("boolean"),func:w("function"),number:w("number"),object:w("object"),string:w("string"),symbol:w("symbol"),any:O(),arrayOf:x,element:S(),elementType:b(),instanceOf:C,node:B(),objectOf:j,oneOf:$,oneOfType:F,shape:E,exact:k};function h(P,L){return P===L?P!==0||1/P===1/L:P!==P&&L!==L}function m(P,L){this.message=P,this.data=L&&typeof L=="object"?L:{},this.stack=""}m.prototype=Error.prototype;function v(P){if(process.env.NODE_ENV!=="production")var L={},G=0;function K(U,W,X,q,Y,ee,ie){if(q=q||p,ee=ee||X,ie!==n){if(u){var V=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw V.name="Invariant Violation",V}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var ne=q+":"+X;!L[ne]&&G<3&&(i("You are manually calling a React.PropTypes validation function for the `"+ee+"` prop on `"+q+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),L[ne]=!0,G++)}}return W[X]==null?U?W[X]===null?new m("The "+Y+" `"+ee+"` is marked as required "+("in `"+q+"`, but its value is `null`.")):new m("The "+Y+" `"+ee+"` is marked as required in "+("`"+q+"`, but its value is `undefined`.")):null:P(W,X,q,Y,ee)}var H=K.bind(null,!1);return H.isRequired=K.bind(null,!0),H}function w(P){function L(G,K,H,U,W,X){var q=G[K],Y=D(q);if(Y!==P){var ee=z(q);return new m("Invalid "+U+" `"+W+"` of type "+("`"+ee+"` supplied to `"+H+"`, expected ")+("`"+P+"`."),{expectedType:P})}return null}return v(L)}function O(){return v(s)}function x(P){function L(G,K,H,U,W){if(typeof P!="function")return new m("Property `"+W+"` of component `"+H+"` has invalid PropType notation inside arrayOf.");var X=G[K];if(!Array.isArray(X)){var q=D(X);return new m("Invalid "+U+" `"+W+"` of type "+("`"+q+"` supplied to `"+H+"`, expected an array."))}for(var Y=0;Y<X.length;Y++){var ee=P(X,Y,H,U,W+"["+Y+"]",n);if(ee instanceof Error)return ee}return null}return v(L)}function S(){function P(L,G,K,H,U){var W=L[G];if(!a(W)){var X=D(W);return new m("Invalid "+H+" `"+U+"` of type "+("`"+X+"` supplied to `"+K+"`, expected a single ReactElement."))}return null}return v(P)}function b(){function P(L,G,K,H,U){var W=L[G];if(!e.isValidElementType(W)){var X=D(W);return new m("Invalid "+H+" `"+U+"` of type "+("`"+X+"` supplied to `"+K+"`, expected a single ReactElement type."))}return null}return v(P)}function C(P){function L(G,K,H,U,W){if(!(G[K]instanceof P)){var X=P.name||p,q=te(G[K]);return new m("Invalid "+U+" `"+W+"` of type "+("`"+q+"` supplied to `"+H+"`, expected ")+("instance of `"+X+"`."))}return null}return v(L)}function $(P){if(!Array.isArray(P))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),s;function L(G,K,H,U,W){for(var X=G[K],q=0;q<P.length;q++)if(h(X,P[q]))return null;var Y=JSON.stringify(P,function(ie,V){var ne=z(V);return ne==="symbol"?String(V):V});return new m("Invalid "+U+" `"+W+"` of value `"+String(X)+"` "+("supplied to `"+H+"`, expected one of "+Y+"."))}return v(L)}function j(P){function L(G,K,H,U,W){if(typeof P!="function")return new m("Property `"+W+"` of component `"+H+"` has invalid PropType notation inside objectOf.");var X=G[K],q=D(X);if(q!=="object")return new m("Invalid "+U+" `"+W+"` of type "+("`"+q+"` supplied to `"+H+"`, expected an object."));for(var Y in X)if(r(X,Y)){var ee=P(X,Y,H,U,W+"."+Y,n);if(ee instanceof Error)return ee}return null}return v(L)}function F(P){if(!Array.isArray(P))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var L=0;L<P.length;L++){var G=P[L];if(typeof G!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+Q(G)+" at index "+L+"."),s}function K(H,U,W,X,q){for(var Y=[],ee=0;ee<P.length;ee++){var ie=P[ee],V=ie(H,U,W,X,q,n);if(V==null)return null;V.data&&r(V.data,"expectedType")&&Y.push(V.data.expectedType)}var ne=Y.length>0?", expected one of type ["+Y.join(", ")+"]":"";return new m("Invalid "+X+" `"+q+"` supplied to "+("`"+W+"`"+ne+"."))}return v(K)}function B(){function P(L,G,K,H,U){return N(L[G])?null:new m("Invalid "+H+" `"+U+"` supplied to "+("`"+K+"`, expected a ReactNode."))}return v(P)}function _(P,L,G,K,H){return new m((P||"React class")+": "+L+" type `"+G+"."+K+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+H+"`.")}function E(P){function L(G,K,H,U,W){var X=G[K],q=D(X);if(q!=="object")return new m("Invalid "+U+" `"+W+"` of type `"+q+"` "+("supplied to `"+H+"`, expected `object`."));for(var Y in P){var ee=P[Y];if(typeof ee!="function")return _(H,U,W,Y,z(ee));var ie=ee(X,Y,H,U,W+"."+Y,n);if(ie)return ie}return null}return v(L)}function k(P){function L(G,K,H,U,W){var X=G[K],q=D(X);if(q!=="object")return new m("Invalid "+U+" `"+W+"` of type `"+q+"` "+("supplied to `"+H+"`, expected `object`."));var Y=t({},G[K],P);for(var ee in Y){var ie=P[ee];if(r(P,ee)&&typeof ie!="function")return _(H,U,W,ee,z(ie));if(!ie)return new m("Invalid "+U+" `"+W+"` key `"+ee+"` supplied to `"+H+"`.\nBad object: "+JSON.stringify(G[K],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(P),null,"  "));var V=ie(X,ee,H,U,W+"."+ee,n);if(V)return V}return null}return v(L)}function N(P){switch(typeof P){case"number":case"string":case"undefined":return!0;case"boolean":return!P;case"object":if(Array.isArray(P))return P.every(N);if(P===null||a(P))return!0;var L=g(P);if(L){var G=L.call(P),K;if(L!==P.entries){for(;!(K=G.next()).done;)if(!N(K.value))return!1}else for(;!(K=G.next()).done;){var H=K.value;if(H&&!N(H[1]))return!1}}else return!1;return!0;default:return!1}}function A(P,L){return P==="symbol"?!0:L?L["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&L instanceof Symbol:!1}function D(P){var L=typeof P;return Array.isArray(P)?"array":P instanceof RegExp?"object":A(L,P)?"symbol":L}function z(P){if(typeof P>"u"||P===null)return""+P;var L=D(P);if(L==="object"){if(P instanceof Date)return"date";if(P instanceof RegExp)return"regexp"}return L}function Q(P){var L=z(P);switch(L){case"array":case"object":return"an "+L;case"boolean":case"date":case"regexp":return"a "+L;default:return L}}function te(P){return!P.constructor||!P.constructor.name?p:P.constructor.name}return f.checkPropTypes=o,f.resetWarningCache=o.resetWarningCache,f.PropTypes=f,f},_r}var $r,vi;function Ql(){if(vi)return $r;vi=1;var e=wo();function t(){}function n(){}return n.resetWarningCache=t,$r=function(){function r(s,a,u,c,d,g){if(g!==e){var p=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw p.name="Invariant Violation",p}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},$r}if(process.env.NODE_ENV!=="production"){var eu=Ss(),tu=!0;Yr.exports=Zl()(eu.isElement,tu)}else Yr.exports=Ql()();var nu=Yr.exports;const l=ql(nu);function Yt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function Ct(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Es(e){if(!Ct(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Es(e[n])}),t}function rt(e,t,n={clone:!0}){const r=n.clone?T({},e):e;return Ct(e)&&Ct(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Ct(t[o])&&o in e&&Ct(e[o])?r[o]=rt(e[o],t[o],n):n.clone?r[o]=Ct(t[o])?Es(t[o]):t[o]:r[o]=t[o])}),r}function ru(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Rs(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let a;const u=i.type;return typeof u=="function"&&!ru(u)&&(a="Did you accidentally use a plain function component for an element instead?"),a!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const ks=Yt(l.element,Rs);ks.isRequired=Yt(l.element.isRequired,Rs);const Pn=ks;function ou(e){const{prototype:t={}}=e;return!!t.isReactComponent}function iu(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let a;return typeof i=="function"&&!ou(i)&&(a="Did you accidentally provide a plain function component instead?"),a!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const su=Yt(l.elementType,iu),au="exact-prop: ​";function Ts(e){return process.env.NODE_ENV==="production"?e:T({},e,{[au]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Ht(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Jr={exports:{}},de={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bi;function lu(){if(bi)return de;bi=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),a=Symbol.for("react.server_context"),u=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),g=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),f=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function m(v){if(typeof v=="object"&&v!==null){var w=v.$$typeof;switch(w){case e:switch(v=v.type,v){case n:case o:case r:case c:case d:return v;default:switch(v=v&&v.$$typeof,v){case a:case s:case u:case p:case g:case i:return v;default:return w}}case t:return w}}}return de.ContextConsumer=s,de.ContextProvider=i,de.Element=e,de.ForwardRef=u,de.Fragment=n,de.Lazy=p,de.Memo=g,de.Portal=t,de.Profiler=o,de.StrictMode=r,de.Suspense=c,de.SuspenseList=d,de.isAsyncMode=function(){return!1},de.isConcurrentMode=function(){return!1},de.isContextConsumer=function(v){return m(v)===s},de.isContextProvider=function(v){return m(v)===i},de.isElement=function(v){return typeof v=="object"&&v!==null&&v.$$typeof===e},de.isForwardRef=function(v){return m(v)===u},de.isFragment=function(v){return m(v)===n},de.isLazy=function(v){return m(v)===p},de.isMemo=function(v){return m(v)===g},de.isPortal=function(v){return m(v)===t},de.isProfiler=function(v){return m(v)===o},de.isStrictMode=function(v){return m(v)===r},de.isSuspense=function(v){return m(v)===c},de.isSuspenseList=function(v){return m(v)===d},de.isValidElementType=function(v){return typeof v=="string"||typeof v=="function"||v===n||v===o||v===r||v===c||v===d||v===f||typeof v=="object"&&v!==null&&(v.$$typeof===p||v.$$typeof===g||v.$$typeof===i||v.$$typeof===s||v.$$typeof===u||v.$$typeof===h||v.getModuleId!==void 0)},de.typeOf=m,de}var pe={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yi;function uu(){return yi||(yi=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),a=Symbol.for("react.server_context"),u=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),g=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),f=Symbol.for("react.offscreen"),h=!1,m=!1,v=!1,w=!1,O=!1,x;x=Symbol.for("react.module.reference");function S(M){return!!(typeof M=="string"||typeof M=="function"||M===n||M===o||O||M===r||M===c||M===d||w||M===f||h||m||v||typeof M=="object"&&M!==null&&(M.$$typeof===p||M.$$typeof===g||M.$$typeof===i||M.$$typeof===s||M.$$typeof===u||M.$$typeof===x||M.getModuleId!==void 0))}function b(M){if(typeof M=="object"&&M!==null){var se=M.$$typeof;switch(se){case e:var Se=M.type;switch(Se){case n:case o:case r:case c:case d:return Se;default:var Oe=Se&&Se.$$typeof;switch(Oe){case a:case s:case u:case p:case g:case i:return Oe;default:return se}}case t:return se}}}var C=s,$=i,j=e,F=u,B=n,_=p,E=g,k=t,N=o,A=r,D=c,z=d,Q=!1,te=!1;function P(M){return Q||(Q=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function L(M){return te||(te=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function G(M){return b(M)===s}function K(M){return b(M)===i}function H(M){return typeof M=="object"&&M!==null&&M.$$typeof===e}function U(M){return b(M)===u}function W(M){return b(M)===n}function X(M){return b(M)===p}function q(M){return b(M)===g}function Y(M){return b(M)===t}function ee(M){return b(M)===o}function ie(M){return b(M)===r}function V(M){return b(M)===c}function ne(M){return b(M)===d}pe.ContextConsumer=C,pe.ContextProvider=$,pe.Element=j,pe.ForwardRef=F,pe.Fragment=B,pe.Lazy=_,pe.Memo=E,pe.Portal=k,pe.Profiler=N,pe.StrictMode=A,pe.Suspense=D,pe.SuspenseList=z,pe.isAsyncMode=P,pe.isConcurrentMode=L,pe.isContextConsumer=G,pe.isContextProvider=K,pe.isElement=H,pe.isForwardRef=U,pe.isFragment=W,pe.isLazy=X,pe.isMemo=q,pe.isPortal=Y,pe.isProfiler=ee,pe.isStrictMode=ie,pe.isSuspense=V,pe.isSuspenseList=ne,pe.isValidElementType=S,pe.typeOf=b}()),pe}process.env.NODE_ENV==="production"?Jr.exports=lu():Jr.exports=uu();var Jn=Jr.exports;const cu=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function du(e){const t=`${e}`.match(cu);return t&&t[1]||""}function Ps(e,t=""){return e.displayName||e.name||du(e)||t}function wi(e,t,n){const r=Ps(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function pu(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Ps(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Jn.ForwardRef:return wi(e,e.render,"ForwardRef");case Jn.Memo:return wi(e,e.type,"memo");default:return}}}function ot(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],s=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const fu=l.oneOfType([l.func,l.object]),xo=fu;function Ye(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Ht(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Zr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Os(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function gu(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,s)=>{const a=o||"<<anonymous>>",u=s||r;return typeof n[r]<"u"?new Error(`The ${i} \`${u}\` of \`${a}\` is deprecated. ${t}`):null}}function mu(e,t){var n,r;return R.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Te(e){return e&&e.ownerDocument||document}function Gt(e){return Te(e).defaultView||window}function hu(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?T({},t.propTypes):null;return o=>(i,s,a,u,c,...d)=>{const g=c||s,p=n==null?void 0:n[g];if(p){const f=p(i,s,a,u,c,...d);if(f)return f}return typeof i[s]<"u"&&!i[o]?new Error(`The prop \`${g}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Zn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const vu=typeof window<"u"?R.useLayoutEffect:R.useEffect,Tt=vu;let xi=0;function bu(e){const[t,n]=R.useState(e),r=e||t;return R.useEffect(()=>{t==null&&(xi+=1,n(`mui-${xi}`))},[t]),r}const Si=R["useId".toString()];function _s(e){if(Si!==void 0){const t=Si();return e??t}return bu(e)}function yu(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function $s({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=R.useRef(e!==void 0),[i,s]=R.useState(t),a=o?e:i;if(process.env.NODE_ENV!=="production"){R.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:c}=R.useRef(t);R.useEffect(()=>{!o&&c!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const u=R.useCallback(c=>{o||s(c)},[]);return[a,u]}function xn(e){const t=R.useRef(e);return Tt(()=>{t.current=e}),R.useRef((...n)=>(0,t.current)(...n)).current}function Ge(...e){return R.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Zn(n,t)})},e)}const Ci={};function wu(e,t){const n=R.useRef(Ci);return n.current===Ci&&(n.current=e(t)),n}const xu=[];function Su(e){R.useEffect(e,xu)}class On{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new On}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function dn(){const e=wu(On.create).current;return Su(e.disposeEffect),e}let lr=!0,Qr=!1;const Cu=new On,Eu={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Ru(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Eu[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function ku(e){e.metaKey||e.altKey||e.ctrlKey||(lr=!0)}function Nr(){lr=!1}function Tu(){this.visibilityState==="hidden"&&Qr&&(lr=!0)}function Pu(e){e.addEventListener("keydown",ku,!0),e.addEventListener("mousedown",Nr,!0),e.addEventListener("pointerdown",Nr,!0),e.addEventListener("touchstart",Nr,!0),e.addEventListener("visibilitychange",Tu,!0)}function Ou(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return lr||Ru(t)}function Ns(){const e=R.useCallback(o=>{o!=null&&Pu(o.ownerDocument)},[]),t=R.useRef(!1);function n(){return t.current?(Qr=!0,Cu.start(100,()=>{Qr=!1}),t.current=!1,!0):!1}function r(o){return Ou(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Ms(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function _u(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function $u(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Nu=Number.isInteger||$u;function Is(e,t,n,r){const o=e[t];if(o==null||!Nu(o)){const i=_u(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function Ds(e,t,...n){return e[t]===void 0?null:Is(e,t,...n)}function eo(){return null}Ds.isRequired=Is;eo.isRequired=eo;const As=process.env.NODE_ENV==="production"?eo:Ds;function js(e,t){const n=T({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=T({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=T({},i),Object.keys(o).forEach(s=>{n[r][s]=js(o[s],i[s])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function at(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,s)=>{if(s){const a=t(s);a!==""&&i.push(a),n&&n[s]&&i.push(n[s])}return i},[]).join(" ")}),r}const Ei=e=>e,Mu=()=>{let e=Ei;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Ei}}},Iu=Mu(),Fs=Iu,Vs={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Ze(e,t,n="Mui"){const r=Vs[t];return r?`${n}-${r}`:`${Fs.generate(e)}-${t}`}function gt(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=Ze(e,o,n)}),r}function Du(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Ls(e){return typeof e=="string"}function pn(e,t,n){return e===void 0||Ls(e)?t:T({},t,{ownerState:T({},t.ownerState,n)})}const Au={disableDefaultClasses:!1},ju=R.createContext(Au);function Fu(e){const{disableDefaultClasses:t}=R.useContext(ju);return n=>t?"":e(n)}function Bs(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function Vu(e,t,n){return typeof e=="function"?e(t,n):e}function Ri(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function Lu(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const f=ke(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),h=T({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),m=T({},n,o,r);return f.length>0&&(m.className=f),Object.keys(h).length>0&&(m.style=h),{props:m,internalRef:void 0}}const s=Bs(T({},o,r)),a=Ri(r),u=Ri(o),c=t(s),d=ke(c==null?void 0:c.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),g=T({},c==null?void 0:c.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),p=T({},c,n,u,a);return d.length>0&&(p.className=d),Object.keys(g).length>0&&(p.style=g),{props:p,internalRef:c.ref}}const Bu=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Pt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,s=fe(e,Bu),a=i?{}:Vu(r,o),{props:u,internalRef:c}=Lu(T({},s,{externalSlotProps:a})),d=Ge(c,a==null?void 0:a.ref,(t=e.additionalProps)==null?void 0:t.ref);return pn(n,T({},u,{ref:d}),o)}const zs="base";function zu(e){return`${zs}--${e}`}function Hu(e,t){return`${zs}-${e}-${t}`}function Hs(e,t){const n=Vs[t];return n?zu(n):Hu(e,t)}function Gu(e,t){const n={};return t.forEach(r=>{n[r]=Hs(e,r)}),n}const Uu=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function qu(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function Wu(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Xu(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Wu(e))}function Ku(e){const t=[],n=[];return Array.from(e.querySelectorAll(Uu)).forEach((r,o)=>{const i=qu(r);i===-1||!Xu(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function Yu(){return!0}function Qn(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=Ku,isEnabled:s=Yu,open:a}=e,u=R.useRef(!1),c=R.useRef(null),d=R.useRef(null),g=R.useRef(null),p=R.useRef(null),f=R.useRef(!1),h=R.useRef(null),m=Ge(t.ref,h),v=R.useRef(null);R.useEffect(()=>{!a||!h.current||(f.current=!n)},[n,a]),R.useEffect(()=>{if(!a||!h.current)return;const x=Te(h.current);return h.current.contains(x.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),f.current&&h.current.focus()),()=>{o||(g.current&&g.current.focus&&(u.current=!0,g.current.focus()),g.current=null)}},[a]),R.useEffect(()=>{if(!a||!h.current)return;const x=Te(h.current),S=$=>{v.current=$,!(r||!s()||$.key!=="Tab")&&x.activeElement===h.current&&$.shiftKey&&(u.current=!0,d.current&&d.current.focus())},b=()=>{const $=h.current;if($===null)return;if(!x.hasFocus()||!s()||u.current){u.current=!1;return}if($.contains(x.activeElement)||r&&x.activeElement!==c.current&&x.activeElement!==d.current)return;if(x.activeElement!==p.current)p.current=null;else if(p.current!==null)return;if(!f.current)return;let j=[];if((x.activeElement===c.current||x.activeElement===d.current)&&(j=i(h.current)),j.length>0){var F,B;const _=!!((F=v.current)!=null&&F.shiftKey&&((B=v.current)==null?void 0:B.key)==="Tab"),E=j[0],k=j[j.length-1];typeof E!="string"&&typeof k!="string"&&(_?k.focus():E.focus())}else $.focus()};x.addEventListener("focusin",b),x.addEventListener("keydown",S,!0);const C=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&b()},50);return()=>{clearInterval(C),x.removeEventListener("focusin",b),x.removeEventListener("keydown",S,!0)}},[n,r,o,s,a,i]);const w=x=>{g.current===null&&(g.current=x.relatedTarget),f.current=!0,p.current=x.target;const S=t.props.onFocus;S&&S(x)},O=x=>{g.current===null&&(g.current=x.relatedTarget),f.current=!0};return y.jsxs(R.Fragment,{children:[y.jsx("div",{tabIndex:a?0:-1,onFocus:O,ref:c,"data-testid":"sentinelStart"}),R.cloneElement(t,{ref:m,onFocus:w}),y.jsx("div",{tabIndex:a?0:-1,onFocus:O,ref:d,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(Qn.propTypes={children:Pn,disableAutoFocus:l.bool,disableEnforceFocus:l.bool,disableRestoreFocus:l.bool,getTabbable:l.func,isEnabled:l.func,open:l.bool.isRequired});process.env.NODE_ENV!=="production"&&(Qn["propTypes"]=Ts(Qn.propTypes));function Ju(e){return typeof e=="function"?e():e}const Sn=R.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[s,a]=R.useState(null),u=Ge(R.isValidElement(r)?r.ref:null,n);if(Tt(()=>{i||a(Ju(o)||document.body)},[o,i]),Tt(()=>{if(s&&!i)return Zn(n,s),()=>{Zn(n,null)}},[n,s,i]),i){if(R.isValidElement(r)){const c={ref:u};return R.cloneElement(r,c)}return y.jsx(R.Fragment,{children:r})}return y.jsx(R.Fragment,{children:s&&gl.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&(Sn.propTypes={children:l.node,container:l.oneOfType([ot,l.func]),disablePortal:l.bool});process.env.NODE_ENV!=="production"&&(Sn["propTypes"]=Ts(Sn.propTypes));function Zu(e){const t=Te(e);return t.body===e?Gt(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function hn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function ki(e){return parseInt(Gt(e).getComputedStyle(e).paddingRight,10)||0}function Qu(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Ti(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,s=>{const a=i.indexOf(s)===-1,u=!Qu(s);a&&u&&hn(s,o)})}function Mr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function ec(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(Zu(r)){const s=Ms(Te(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${ki(r)+s}px`;const a=Te(r).querySelectorAll(".mui-fixed");[].forEach.call(a,u=>{n.push({value:u.style.paddingRight,property:"padding-right",el:u}),u.style.paddingRight=`${ki(u)+s}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=Te(r).body;else{const s=r.parentElement,a=Gt(r);i=(s==null?void 0:s.nodeName)==="HTML"&&a.getComputedStyle(s).overflowY==="scroll"?s:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:s,property:a})=>{i?s.style.setProperty(a,i):s.style.removeProperty(a)})}}function tc(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class nc{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&hn(t.modalRef,!1);const o=tc(n);Ti(n,t.mount,t.modalRef,o,!0);const i=Mr(this.containers,s=>s.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=Mr(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=ec(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=Mr(this.containers,s=>s.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&hn(t.modalRef,n),Ti(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=i.modals[i.modals.length-1];s.modalRef&&hn(s.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function rc(e){return typeof e=="function"?e():e}function oc(e){return e?e.props.hasOwnProperty("in"):!1}const ic=new nc;function sc(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=ic,closeAfterTransition:i=!1,onTransitionEnter:s,onTransitionExited:a,children:u,onClose:c,open:d,rootRef:g}=e,p=R.useRef({}),f=R.useRef(null),h=R.useRef(null),m=Ge(h,g),[v,w]=R.useState(!d),O=oc(u);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const S=()=>Te(f.current),b=()=>(p.current.modalRef=h.current,p.current.mount=f.current,p.current),C=()=>{o.mount(b(),{disableScrollLock:r}),h.current&&(h.current.scrollTop=0)},$=xn(()=>{const D=rc(t)||S().body;o.add(b(),D),h.current&&C()}),j=R.useCallback(()=>o.isTopModal(b()),[o]),F=xn(D=>{f.current=D,D&&(d&&j()?C():h.current&&hn(h.current,x))}),B=R.useCallback(()=>{o.remove(b(),x)},[x,o]);R.useEffect(()=>()=>{B()},[B]),R.useEffect(()=>{d?$():(!O||!i)&&B()},[d,B,O,i,$]);const _=D=>z=>{var Q;(Q=D.onKeyDown)==null||Q.call(D,z),!(z.key!=="Escape"||z.which===229||!j())&&(n||(z.stopPropagation(),c&&c(z,"escapeKeyDown")))},E=D=>z=>{var Q;(Q=D.onClick)==null||Q.call(D,z),z.target===z.currentTarget&&c&&c(z,"backdropClick")};return{getRootProps:(D={})=>{const z=Bs(e);delete z.onTransitionEnter,delete z.onTransitionExited;const Q=T({},z,D);return T({role:"presentation"},Q,{onKeyDown:_(Q),ref:m})},getBackdropProps:(D={})=>{const z=D;return T({"aria-hidden":!0},z,{onClick:E(z),open:d})},getTransitionProps:()=>{const D=()=>{w(!1),s&&s()},z=()=>{w(!0),a&&a(),i&&B()};return{onEnter:Zr(D,u==null?void 0:u.props.onEnter),onExited:Zr(z,u==null?void 0:u.props.onExited)}},rootRef:m,portalRef:F,isTopModal:j,exited:v,hasTransition:O}}var Ne="top",Ue="bottom",qe="right",Me="left",So="auto",_n=[Ne,Ue,qe,Me],Ut="start",Cn="end",ac="clippingParents",Gs="viewport",on="popper",lc="reference",Pi=_n.reduce(function(e,t){return e.concat([t+"-"+Ut,t+"-"+Cn])},[]),Us=[].concat(_n,[So]).reduce(function(e,t){return e.concat([t,t+"-"+Ut,t+"-"+Cn])},[]),uc="beforeRead",cc="read",dc="afterRead",pc="beforeMain",fc="main",gc="afterMain",mc="beforeWrite",hc="write",vc="afterWrite",bc=[uc,cc,dc,pc,fc,gc,mc,hc,vc];function Je(e){return e?(e.nodeName||"").toLowerCase():null}function Ve(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Ot(e){var t=Ve(e).Element;return e instanceof t||e instanceof Element}function He(e){var t=Ve(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Co(e){if(typeof ShadowRoot>"u")return!1;var t=Ve(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function yc(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!He(i)||!Je(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(s){var a=o[s];a===!1?i.removeAttribute(s):i.setAttribute(s,a===!0?"":a)}))})}function wc(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},s=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),a=s.reduce(function(u,c){return u[c]="",u},{});!He(o)||!Je(o)||(Object.assign(o.style,a),Object.keys(i).forEach(function(u){o.removeAttribute(u)}))})}}const xc={name:"applyStyles",enabled:!0,phase:"write",fn:yc,effect:wc,requires:["computeStyles"]};function Ke(e){return e.split("-")[0]}var Rt=Math.max,er=Math.min,qt=Math.round;function to(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function qs(){return!/^((?!chrome|android).)*safari/i.test(to())}function Wt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&He(e)&&(o=e.offsetWidth>0&&qt(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&qt(r.height)/e.offsetHeight||1);var s=Ot(e)?Ve(e):window,a=s.visualViewport,u=!qs()&&n,c=(r.left+(u&&a?a.offsetLeft:0))/o,d=(r.top+(u&&a?a.offsetTop:0))/i,g=r.width/o,p=r.height/i;return{width:g,height:p,top:d,right:c+g,bottom:d+p,left:c,x:c,y:d}}function Eo(e){var t=Wt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Ws(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Co(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function it(e){return Ve(e).getComputedStyle(e)}function Sc(e){return["table","td","th"].indexOf(Je(e))>=0}function mt(e){return((Ot(e)?e.ownerDocument:e.document)||window.document).documentElement}function ur(e){return Je(e)==="html"?e:e.assignedSlot||e.parentNode||(Co(e)?e.host:null)||mt(e)}function Oi(e){return!He(e)||it(e).position==="fixed"?null:e.offsetParent}function Cc(e){var t=/firefox/i.test(to()),n=/Trident/i.test(to());if(n&&He(e)){var r=it(e);if(r.position==="fixed")return null}var o=ur(e);for(Co(o)&&(o=o.host);He(o)&&["html","body"].indexOf(Je(o))<0;){var i=it(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function $n(e){for(var t=Ve(e),n=Oi(e);n&&Sc(n)&&it(n).position==="static";)n=Oi(n);return n&&(Je(n)==="html"||Je(n)==="body"&&it(n).position==="static")?t:n||Cc(e)||t}function Ro(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function vn(e,t,n){return Rt(e,er(t,n))}function Ec(e,t,n){var r=vn(e,t,n);return r>n?n:r}function Xs(){return{top:0,right:0,bottom:0,left:0}}function Ks(e){return Object.assign({},Xs(),e)}function Ys(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Rc=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Ks(typeof t!="number"?t:Ys(t,_n))};function kc(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,s=n.modifiersData.popperOffsets,a=Ke(n.placement),u=Ro(a),c=[Me,qe].indexOf(a)>=0,d=c?"height":"width";if(!(!i||!s)){var g=Rc(o.padding,n),p=Eo(i),f=u==="y"?Ne:Me,h=u==="y"?Ue:qe,m=n.rects.reference[d]+n.rects.reference[u]-s[u]-n.rects.popper[d],v=s[u]-n.rects.reference[u],w=$n(i),O=w?u==="y"?w.clientHeight||0:w.clientWidth||0:0,x=m/2-v/2,S=g[f],b=O-p[d]-g[h],C=O/2-p[d]/2+x,$=vn(S,C,b),j=u;n.modifiersData[r]=(t={},t[j]=$,t.centerOffset=$-C,t)}}function Tc(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Ws(t.elements.popper,o)&&(t.elements.arrow=o))}const Pc={name:"arrow",enabled:!0,phase:"main",fn:kc,effect:Tc,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Xt(e){return e.split("-")[1]}var Oc={top:"auto",right:"auto",bottom:"auto",left:"auto"};function _c(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:qt(n*o)/o||0,y:qt(r*o)/o||0}}function _i(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,s=e.offsets,a=e.position,u=e.gpuAcceleration,c=e.adaptive,d=e.roundOffsets,g=e.isFixed,p=s.x,f=p===void 0?0:p,h=s.y,m=h===void 0?0:h,v=typeof d=="function"?d({x:f,y:m}):{x:f,y:m};f=v.x,m=v.y;var w=s.hasOwnProperty("x"),O=s.hasOwnProperty("y"),x=Me,S=Ne,b=window;if(c){var C=$n(n),$="clientHeight",j="clientWidth";if(C===Ve(n)&&(C=mt(n),it(C).position!=="static"&&a==="absolute"&&($="scrollHeight",j="scrollWidth")),C=C,o===Ne||(o===Me||o===qe)&&i===Cn){S=Ue;var F=g&&C===b&&b.visualViewport?b.visualViewport.height:C[$];m-=F-r.height,m*=u?1:-1}if(o===Me||(o===Ne||o===Ue)&&i===Cn){x=qe;var B=g&&C===b&&b.visualViewport?b.visualViewport.width:C[j];f-=B-r.width,f*=u?1:-1}}var _=Object.assign({position:a},c&&Oc),E=d===!0?_c({x:f,y:m},Ve(n)):{x:f,y:m};if(f=E.x,m=E.y,u){var k;return Object.assign({},_,(k={},k[S]=O?"0":"",k[x]=w?"0":"",k.transform=(b.devicePixelRatio||1)<=1?"translate("+f+"px, "+m+"px)":"translate3d("+f+"px, "+m+"px, 0)",k))}return Object.assign({},_,(t={},t[S]=O?m+"px":"",t[x]=w?f+"px":"",t.transform="",t))}function $c(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,s=i===void 0?!0:i,a=n.roundOffsets,u=a===void 0?!0:a,c={placement:Ke(t.placement),variation:Xt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,_i(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:u})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,_i(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:u})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Nc={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:$c,data:{}};var Vn={passive:!0};function Mc(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,s=r.resize,a=s===void 0?!0:s,u=Ve(t.elements.popper),c=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&c.forEach(function(d){d.addEventListener("scroll",n.update,Vn)}),a&&u.addEventListener("resize",n.update,Vn),function(){i&&c.forEach(function(d){d.removeEventListener("scroll",n.update,Vn)}),a&&u.removeEventListener("resize",n.update,Vn)}}const Ic={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Mc,data:{}};var Dc={left:"right",right:"left",bottom:"top",top:"bottom"};function qn(e){return e.replace(/left|right|bottom|top/g,function(t){return Dc[t]})}var Ac={start:"end",end:"start"};function $i(e){return e.replace(/start|end/g,function(t){return Ac[t]})}function ko(e){var t=Ve(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function To(e){return Wt(mt(e)).left+ko(e).scrollLeft}function jc(e,t){var n=Ve(e),r=mt(e),o=n.visualViewport,i=r.clientWidth,s=r.clientHeight,a=0,u=0;if(o){i=o.width,s=o.height;var c=qs();(c||!c&&t==="fixed")&&(a=o.offsetLeft,u=o.offsetTop)}return{width:i,height:s,x:a+To(e),y:u}}function Fc(e){var t,n=mt(e),r=ko(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=Rt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=Rt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),a=-r.scrollLeft+To(e),u=-r.scrollTop;return it(o||n).direction==="rtl"&&(a+=Rt(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:s,x:a,y:u}}function Po(e){var t=it(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Js(e){return["html","body","#document"].indexOf(Je(e))>=0?e.ownerDocument.body:He(e)&&Po(e)?e:Js(ur(e))}function bn(e,t){var n;t===void 0&&(t=[]);var r=Js(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=Ve(r),s=o?[i].concat(i.visualViewport||[],Po(r)?r:[]):r,a=t.concat(s);return o?a:a.concat(bn(ur(s)))}function no(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Vc(e,t){var n=Wt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Ni(e,t,n){return t===Gs?no(jc(e,n)):Ot(t)?Vc(t,n):no(Fc(mt(e)))}function Lc(e){var t=bn(ur(e)),n=["absolute","fixed"].indexOf(it(e).position)>=0,r=n&&He(e)?$n(e):e;return Ot(r)?t.filter(function(o){return Ot(o)&&Ws(o,r)&&Je(o)!=="body"}):[]}function Bc(e,t,n,r){var o=t==="clippingParents"?Lc(e):[].concat(t),i=[].concat(o,[n]),s=i[0],a=i.reduce(function(u,c){var d=Ni(e,c,r);return u.top=Rt(d.top,u.top),u.right=er(d.right,u.right),u.bottom=er(d.bottom,u.bottom),u.left=Rt(d.left,u.left),u},Ni(e,s,r));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function Zs(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ke(r):null,i=r?Xt(r):null,s=t.x+t.width/2-n.width/2,a=t.y+t.height/2-n.height/2,u;switch(o){case Ne:u={x:s,y:t.y-n.height};break;case Ue:u={x:s,y:t.y+t.height};break;case qe:u={x:t.x+t.width,y:a};break;case Me:u={x:t.x-n.width,y:a};break;default:u={x:t.x,y:t.y}}var c=o?Ro(o):null;if(c!=null){var d=c==="y"?"height":"width";switch(i){case Ut:u[c]=u[c]-(t[d]/2-n[d]/2);break;case Cn:u[c]=u[c]+(t[d]/2-n[d]/2);break}}return u}function En(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,s=i===void 0?e.strategy:i,a=n.boundary,u=a===void 0?ac:a,c=n.rootBoundary,d=c===void 0?Gs:c,g=n.elementContext,p=g===void 0?on:g,f=n.altBoundary,h=f===void 0?!1:f,m=n.padding,v=m===void 0?0:m,w=Ks(typeof v!="number"?v:Ys(v,_n)),O=p===on?lc:on,x=e.rects.popper,S=e.elements[h?O:p],b=Bc(Ot(S)?S:S.contextElement||mt(e.elements.popper),u,d,s),C=Wt(e.elements.reference),$=Zs({reference:C,element:x,strategy:"absolute",placement:o}),j=no(Object.assign({},x,$)),F=p===on?j:C,B={top:b.top-F.top+w.top,bottom:F.bottom-b.bottom+w.bottom,left:b.left-F.left+w.left,right:F.right-b.right+w.right},_=e.modifiersData.offset;if(p===on&&_){var E=_[o];Object.keys(B).forEach(function(k){var N=[qe,Ue].indexOf(k)>=0?1:-1,A=[Ne,Ue].indexOf(k)>=0?"y":"x";B[k]+=E[A]*N})}return B}function zc(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,s=n.padding,a=n.flipVariations,u=n.allowedAutoPlacements,c=u===void 0?Us:u,d=Xt(r),g=d?a?Pi:Pi.filter(function(h){return Xt(h)===d}):_n,p=g.filter(function(h){return c.indexOf(h)>=0});p.length===0&&(p=g);var f=p.reduce(function(h,m){return h[m]=En(e,{placement:m,boundary:o,rootBoundary:i,padding:s})[Ke(m)],h},{});return Object.keys(f).sort(function(h,m){return f[h]-f[m]})}function Hc(e){if(Ke(e)===So)return[];var t=qn(e);return[$i(e),t,$i(t)]}function Gc(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,a=s===void 0?!0:s,u=n.fallbackPlacements,c=n.padding,d=n.boundary,g=n.rootBoundary,p=n.altBoundary,f=n.flipVariations,h=f===void 0?!0:f,m=n.allowedAutoPlacements,v=t.options.placement,w=Ke(v),O=w===v,x=u||(O||!h?[qn(v)]:Hc(v)),S=[v].concat(x).reduce(function(H,U){return H.concat(Ke(U)===So?zc(t,{placement:U,boundary:d,rootBoundary:g,padding:c,flipVariations:h,allowedAutoPlacements:m}):U)},[]),b=t.rects.reference,C=t.rects.popper,$=new Map,j=!0,F=S[0],B=0;B<S.length;B++){var _=S[B],E=Ke(_),k=Xt(_)===Ut,N=[Ne,Ue].indexOf(E)>=0,A=N?"width":"height",D=En(t,{placement:_,boundary:d,rootBoundary:g,altBoundary:p,padding:c}),z=N?k?qe:Me:k?Ue:Ne;b[A]>C[A]&&(z=qn(z));var Q=qn(z),te=[];if(i&&te.push(D[E]<=0),a&&te.push(D[z]<=0,D[Q]<=0),te.every(function(H){return H})){F=_,j=!1;break}$.set(_,te)}if(j)for(var P=h?3:1,L=function(U){var W=S.find(function(X){var q=$.get(X);if(q)return q.slice(0,U).every(function(Y){return Y})});if(W)return F=W,"break"},G=P;G>0;G--){var K=L(G);if(K==="break")break}t.placement!==F&&(t.modifiersData[r]._skip=!0,t.placement=F,t.reset=!0)}}const Uc={name:"flip",enabled:!0,phase:"main",fn:Gc,requiresIfExists:["offset"],data:{_skip:!1}};function Mi(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Ii(e){return[Ne,qe,Ue,Me].some(function(t){return e[t]>=0})}function qc(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,s=En(t,{elementContext:"reference"}),a=En(t,{altBoundary:!0}),u=Mi(s,r),c=Mi(a,o,i),d=Ii(u),g=Ii(c);t.modifiersData[n]={referenceClippingOffsets:u,popperEscapeOffsets:c,isReferenceHidden:d,hasPopperEscaped:g},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":d,"data-popper-escaped":g})}const Wc={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:qc};function Xc(e,t,n){var r=Ke(e),o=[Me,Ne].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,s=i[0],a=i[1];return s=s||0,a=(a||0)*o,[Me,qe].indexOf(r)>=0?{x:a,y:s}:{x:s,y:a}}function Kc(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,s=Us.reduce(function(d,g){return d[g]=Xc(g,t.rects,i),d},{}),a=s[t.placement],u=a.x,c=a.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=u,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=s}const Yc={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Kc};function Jc(e){var t=e.state,n=e.name;t.modifiersData[n]=Zs({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Zc={name:"popperOffsets",enabled:!0,phase:"read",fn:Jc,data:{}};function Qc(e){return e==="x"?"y":"x"}function ed(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,a=s===void 0?!1:s,u=n.boundary,c=n.rootBoundary,d=n.altBoundary,g=n.padding,p=n.tether,f=p===void 0?!0:p,h=n.tetherOffset,m=h===void 0?0:h,v=En(t,{boundary:u,rootBoundary:c,padding:g,altBoundary:d}),w=Ke(t.placement),O=Xt(t.placement),x=!O,S=Ro(w),b=Qc(S),C=t.modifiersData.popperOffsets,$=t.rects.reference,j=t.rects.popper,F=typeof m=="function"?m(Object.assign({},t.rects,{placement:t.placement})):m,B=typeof F=="number"?{mainAxis:F,altAxis:F}:Object.assign({mainAxis:0,altAxis:0},F),_=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,E={x:0,y:0};if(C){if(i){var k,N=S==="y"?Ne:Me,A=S==="y"?Ue:qe,D=S==="y"?"height":"width",z=C[S],Q=z+v[N],te=z-v[A],P=f?-j[D]/2:0,L=O===Ut?$[D]:j[D],G=O===Ut?-j[D]:-$[D],K=t.elements.arrow,H=f&&K?Eo(K):{width:0,height:0},U=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Xs(),W=U[N],X=U[A],q=vn(0,$[D],H[D]),Y=x?$[D]/2-P-q-W-B.mainAxis:L-q-W-B.mainAxis,ee=x?-$[D]/2+P+q+X+B.mainAxis:G+q+X+B.mainAxis,ie=t.elements.arrow&&$n(t.elements.arrow),V=ie?S==="y"?ie.clientTop||0:ie.clientLeft||0:0,ne=(k=_==null?void 0:_[S])!=null?k:0,M=z+Y-ne-V,se=z+ee-ne,Se=vn(f?er(Q,M):Q,z,f?Rt(te,se):te);C[S]=Se,E[S]=Se-z}if(a){var Oe,we=S==="x"?Ne:Me,vt=S==="x"?Ue:qe,_e=C[b],Qe=b==="y"?"height":"width",De=_e+v[we],et=_e-v[vt],Ce=[Ne,Me].indexOf(w)!==-1,$t=(Oe=_==null?void 0:_[b])!=null?Oe:0,bt=Ce?De:_e-$[Qe]-j[Qe]-$t+B.altAxis,Jt=Ce?_e+$[Qe]+j[Qe]-$t-B.altAxis:et,Dn=f&&Ce?Ec(bt,_e,Jt):vn(f?bt:De,_e,f?Jt:et);C[b]=Dn,E[b]=Dn-_e}t.modifiersData[r]=E}}const td={name:"preventOverflow",enabled:!0,phase:"main",fn:ed,requiresIfExists:["offset"]};function nd(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function rd(e){return e===Ve(e)||!He(e)?ko(e):nd(e)}function od(e){var t=e.getBoundingClientRect(),n=qt(t.width)/e.offsetWidth||1,r=qt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function id(e,t,n){n===void 0&&(n=!1);var r=He(t),o=He(t)&&od(t),i=mt(t),s=Wt(e,o,n),a={scrollLeft:0,scrollTop:0},u={x:0,y:0};return(r||!r&&!n)&&((Je(t)!=="body"||Po(i))&&(a=rd(t)),He(t)?(u=Wt(t,!0),u.x+=t.clientLeft,u.y+=t.clientTop):i&&(u.x=To(i))),{x:s.left+a.scrollLeft-u.x,y:s.top+a.scrollTop-u.y,width:s.width,height:s.height}}function sd(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var s=[].concat(i.requires||[],i.requiresIfExists||[]);s.forEach(function(a){if(!n.has(a)){var u=t.get(a);u&&o(u)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function ad(e){var t=sd(e);return bc.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function ld(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function ud(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var Di={placement:"bottom",modifiers:[],strategy:"absolute"};function Ai(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function cd(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?Di:o;return function(a,u,c){c===void 0&&(c=i);var d={placement:"bottom",orderedModifiers:[],options:Object.assign({},Di,i),modifiersData:{},elements:{reference:a,popper:u},attributes:{},styles:{}},g=[],p=!1,f={state:d,setOptions:function(w){var O=typeof w=="function"?w(d.options):w;m(),d.options=Object.assign({},i,d.options,O),d.scrollParents={reference:Ot(a)?bn(a):a.contextElement?bn(a.contextElement):[],popper:bn(u)};var x=ad(ud([].concat(r,d.options.modifiers)));return d.orderedModifiers=x.filter(function(S){return S.enabled}),h(),f.update()},forceUpdate:function(){if(!p){var w=d.elements,O=w.reference,x=w.popper;if(Ai(O,x)){d.rects={reference:id(O,$n(x),d.options.strategy==="fixed"),popper:Eo(x)},d.reset=!1,d.placement=d.options.placement,d.orderedModifiers.forEach(function(B){return d.modifiersData[B.name]=Object.assign({},B.data)});for(var S=0;S<d.orderedModifiers.length;S++){if(d.reset===!0){d.reset=!1,S=-1;continue}var b=d.orderedModifiers[S],C=b.fn,$=b.options,j=$===void 0?{}:$,F=b.name;typeof C=="function"&&(d=C({state:d,options:j,name:F,instance:f})||d)}}}},update:ld(function(){return new Promise(function(v){f.forceUpdate(),v(d)})}),destroy:function(){m(),p=!0}};if(!Ai(a,u))return f;f.setOptions(c).then(function(v){!p&&c.onFirstUpdate&&c.onFirstUpdate(v)});function h(){d.orderedModifiers.forEach(function(v){var w=v.name,O=v.options,x=O===void 0?{}:O,S=v.effect;if(typeof S=="function"){var b=S({state:d,name:w,instance:f,options:x}),C=function(){};g.push(b||C)}})}function m(){g.forEach(function(v){return v()}),g=[]}return f}}var dd=[Ic,Zc,Nc,xc,Yc,Uc,td,Pc,Wc],pd=cd({defaultModifiers:dd});const Qs="Popper";function fd(e){return Hs(Qs,e)}Gu(Qs,["root"]);const gd=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],md=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function hd(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function tr(e){return typeof e=="function"?e():e}function cr(e){return e.nodeType!==void 0}function vd(e){return!cr(e)}const bd=()=>at({root:["root"]},Fu(fd)),yd={},wd=R.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:s,disablePortal:a,modifiers:u,open:c,placement:d,popperOptions:g,popperRef:p,slotProps:f={},slots:h={},TransitionProps:m}=t,v=fe(t,gd),w=R.useRef(null),O=Ge(w,n),x=R.useRef(null),S=Ge(x,p),b=R.useRef(S);Tt(()=>{b.current=S},[S]),R.useImperativeHandle(p,()=>x.current,[]);const C=hd(d,s),[$,j]=R.useState(C),[F,B]=R.useState(tr(o));R.useEffect(()=>{x.current&&x.current.forceUpdate()}),R.useEffect(()=>{o&&B(tr(o))},[o]),Tt(()=>{if(!F||!c)return;const A=Q=>{j(Q.placement)};if(process.env.NODE_ENV!=="production"&&F&&cr(F)&&F.nodeType===1){const Q=F.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Q.top===0&&Q.left===0&&Q.right===0&&Q.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let D=[{name:"preventOverflow",options:{altBoundary:a}},{name:"flip",options:{altBoundary:a}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:Q})=>{A(Q)}}];u!=null&&(D=D.concat(u)),g&&g.modifiers!=null&&(D=D.concat(g.modifiers));const z=pd(F,w.current,T({placement:C},g,{modifiers:D}));return b.current(z),()=>{z.destroy(),b.current(null)}},[F,a,u,c,g,C]);const _={placement:$};m!==null&&(_.TransitionProps=m);const E=bd(),k=(r=h.root)!=null?r:"div",N=Pt({elementType:k,externalSlotProps:f.root,externalForwardedProps:v,additionalProps:{role:"tooltip",ref:O},ownerState:t,className:E.root});return y.jsx(k,T({},N,{children:typeof i=="function"?i(_):i}))}),ea=R.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:s="ltr",disablePortal:a=!1,keepMounted:u=!1,modifiers:c,open:d,placement:g="bottom",popperOptions:p=yd,popperRef:f,style:h,transition:m=!1,slotProps:v={},slots:w={}}=t,O=fe(t,md),[x,S]=R.useState(!0),b=()=>{S(!1)},C=()=>{S(!0)};if(!u&&!d&&(!m||x))return null;let $;if(i)$=i;else if(r){const B=tr(r);$=B&&cr(B)?Te(B).body:Te(null).body}const j=!d&&u&&(!m||x)?"none":void 0,F=m?{in:d,onEnter:b,onExited:C}:void 0;return y.jsx(Sn,{disablePortal:a,container:$,children:y.jsx(wd,T({anchorEl:r,direction:s,disablePortal:a,modifiers:c,ref:n,open:m?!x:d,placement:g,popperOptions:p,popperRef:f,slotProps:v,slots:w},O,{style:T({position:"fixed",top:0,left:0,display:j},h),TransitionProps:F,children:o}))})});process.env.NODE_ENV!=="production"&&(ea.propTypes={anchorEl:Yt(l.oneOfType([ot,l.object,l.func]),e=>{if(e.open){const t=tr(e.anchorEl);if(t&&cr(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||vd(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:l.oneOfType([l.node,l.func]),container:l.oneOfType([ot,l.func]),direction:l.oneOf(["ltr","rtl"]),disablePortal:l.bool,keepMounted:l.bool,modifiers:l.arrayOf(l.shape({data:l.object,effect:l.func,enabled:l.bool,fn:l.func,name:l.any,options:l.object,phase:l.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:l.arrayOf(l.string),requiresIfExists:l.arrayOf(l.string)})),open:l.bool.isRequired,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:l.shape({modifiers:l.array,onFirstUpdate:l.func,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:l.oneOf(["absolute","fixed"])}),popperRef:xo,slotProps:l.shape({root:l.oneOfType([l.func,l.object])}),slots:l.shape({root:l.elementType}),transition:l.bool});const xd=["values","unit","step"],Sd=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>T({},n,{[r.key]:r.val}),{})};function Cd(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=fe(e,xd),i=Sd(t),s=Object.keys(i);function a(p){return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n})`}function u(p){return`@media (max-width:${(typeof t[p]=="number"?t[p]:p)-r/100}${n})`}function c(p,f){const h=s.indexOf(f);return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n}) and (max-width:${(h!==-1&&typeof t[s[h]]=="number"?t[s[h]]:f)-r/100}${n})`}function d(p){return s.indexOf(p)+1<s.length?c(p,s[s.indexOf(p)+1]):a(p)}function g(p){const f=s.indexOf(p);return f===0?a(s[1]):f===s.length-1?u(s[f]):c(p,s[s.indexOf(p)+1]).replace("@media","@media not all and")}return T({keys:s,values:i,up:a,down:u,between:c,only:d,not:g,unit:n},o)}const Ed={borderRadius:4},Rd=Ed,kd=process.env.NODE_ENV!=="production"?l.oneOfType([l.number,l.string,l.object,l.array]):{},ht=kd;function yn(e,t){return t?rt(e,t,{clone:!1}):e}const Oo={xs:0,sm:600,md:900,lg:1200,xl:1536},ji={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Oo[e]}px)`};function st(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||ji;return t.reduce((s,a,u)=>(s[i.up(i.keys[u])]=n(t[u]),s),{})}if(typeof t=="object"){const i=r.breakpoints||ji;return Object.keys(t).reduce((s,a)=>{if(Object.keys(i.values||Oo).indexOf(a)!==-1){const u=i.up(a);s[u]=n(t[a],a)}else{const u=a;s[u]=t[u]}return s},{})}return n(t)}function Td(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function Pd(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function dr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function nr(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=dr(e,n)||r,t&&(o=t(o,r,e)),o}function xe(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=s=>{if(s[t]==null)return null;const a=s[t],u=s.theme,c=dr(u,r)||{};return st(s,a,g=>{let p=nr(c,o,g);return g===p&&typeof g=="string"&&(p=nr(c,o,`${t}${g==="default"?"":Ye(g)}`,g)),n===!1?p:{[n]:p}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:ht}:{},i.filterProps=[t],i}function Od(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const _d={m:"margin",p:"padding"},$d={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Fi={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Nd=Od(e=>{if(e.length>2)if(Fi[e])e=Fi[e];else return[e];const[t,n]=e.split(""),r=_d[t],o=$d[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),pr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],fr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Md=[...pr,...fr];function Nn(e,t,n,r){var o;const i=(o=dr(e,t,!1))!=null?o:n;return typeof i=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),i*s):Array.isArray(i)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>i.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${s} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[s]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function ta(e){return Nn(e,"spacing",8,"spacing")}function Mn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Id(e,t){return n=>e.reduce((r,o)=>(r[o]=Mn(t,n),r),{})}function Dd(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=Nd(n),i=Id(o,r),s=e[n];return st(e,s,i)}function na(e,t){const n=ta(e.theme);return Object.keys(e).map(r=>Dd(e,t,r,n)).reduce(yn,{})}function be(e){return na(e,pr)}be.propTypes=process.env.NODE_ENV!=="production"?pr.reduce((e,t)=>(e[t]=ht,e),{}):{};be.filterProps=pr;function ye(e){return na(e,fr)}ye.propTypes=process.env.NODE_ENV!=="production"?fr.reduce((e,t)=>(e[t]=ht,e),{}):{};ye.filterProps=fr;process.env.NODE_ENV!=="production"&&Md.reduce((e,t)=>(e[t]=ht,e),{});function Ad(e=8){if(e.mui)return e;const t=ta({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const s=t(i);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function gr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?yn(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function ze(e){return typeof e!="number"?e:`${e}px solid`}function We(e,t){return xe({prop:e,themeKey:"borders",transform:t})}const jd=We("border",ze),Fd=We("borderTop",ze),Vd=We("borderRight",ze),Ld=We("borderBottom",ze),Bd=We("borderLeft",ze),zd=We("borderColor"),Hd=We("borderTopColor"),Gd=We("borderRightColor"),Ud=We("borderBottomColor"),qd=We("borderLeftColor"),Wd=We("outline",ze),Xd=We("outlineColor"),mr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Nn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:Mn(t,r)});return st(e,e.borderRadius,n)}return null};mr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:ht}:{};mr.filterProps=["borderRadius"];gr(jd,Fd,Vd,Ld,Bd,zd,Hd,Gd,Ud,qd,mr,Wd,Xd);const hr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Nn(e.theme,"spacing",8,"gap"),n=r=>({gap:Mn(t,r)});return st(e,e.gap,n)}return null};hr.propTypes=process.env.NODE_ENV!=="production"?{gap:ht}:{};hr.filterProps=["gap"];const vr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Nn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:Mn(t,r)});return st(e,e.columnGap,n)}return null};vr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:ht}:{};vr.filterProps=["columnGap"];const br=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Nn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:Mn(t,r)});return st(e,e.rowGap,n)}return null};br.propTypes=process.env.NODE_ENV!=="production"?{rowGap:ht}:{};br.filterProps=["rowGap"];const Kd=xe({prop:"gridColumn"}),Yd=xe({prop:"gridRow"}),Jd=xe({prop:"gridAutoFlow"}),Zd=xe({prop:"gridAutoColumns"}),Qd=xe({prop:"gridAutoRows"}),ep=xe({prop:"gridTemplateColumns"}),tp=xe({prop:"gridTemplateRows"}),np=xe({prop:"gridTemplateAreas"}),rp=xe({prop:"gridArea"});gr(hr,vr,br,Kd,Yd,Jd,Zd,Qd,ep,tp,np,rp);function zt(e,t){return t==="grey"?t:e}const op=xe({prop:"color",themeKey:"palette",transform:zt}),ip=xe({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:zt}),sp=xe({prop:"backgroundColor",themeKey:"palette",transform:zt});gr(op,ip,sp);function Fe(e){return e<=1&&e!==0?`${e*100}%`:e}const ap=xe({prop:"width",transform:Fe}),_o=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Oo[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:Fe(n)}};return st(e,e.maxWidth,t)}return null};_o.filterProps=["maxWidth"];const lp=xe({prop:"minWidth",transform:Fe}),up=xe({prop:"height",transform:Fe}),cp=xe({prop:"maxHeight",transform:Fe}),dp=xe({prop:"minHeight",transform:Fe});xe({prop:"size",cssProperty:"width",transform:Fe});xe({prop:"size",cssProperty:"height",transform:Fe});const pp=xe({prop:"boxSizing"});gr(ap,_o,lp,up,cp,dp,pp);const fp={border:{themeKey:"borders",transform:ze},borderTop:{themeKey:"borders",transform:ze},borderRight:{themeKey:"borders",transform:ze},borderBottom:{themeKey:"borders",transform:ze},borderLeft:{themeKey:"borders",transform:ze},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:ze},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:mr},color:{themeKey:"palette",transform:zt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:zt},backgroundColor:{themeKey:"palette",transform:zt},p:{style:ye},pt:{style:ye},pr:{style:ye},pb:{style:ye},pl:{style:ye},px:{style:ye},py:{style:ye},padding:{style:ye},paddingTop:{style:ye},paddingRight:{style:ye},paddingBottom:{style:ye},paddingLeft:{style:ye},paddingX:{style:ye},paddingY:{style:ye},paddingInline:{style:ye},paddingInlineStart:{style:ye},paddingInlineEnd:{style:ye},paddingBlock:{style:ye},paddingBlockStart:{style:ye},paddingBlockEnd:{style:ye},m:{style:be},mt:{style:be},mr:{style:be},mb:{style:be},ml:{style:be},mx:{style:be},my:{style:be},margin:{style:be},marginTop:{style:be},marginRight:{style:be},marginBottom:{style:be},marginLeft:{style:be},marginX:{style:be},marginY:{style:be},marginInline:{style:be},marginInlineStart:{style:be},marginInlineEnd:{style:be},marginBlock:{style:be},marginBlockStart:{style:be},marginBlockEnd:{style:be},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:hr},rowGap:{style:br},columnGap:{style:vr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Fe},maxWidth:{style:_o},minWidth:{transform:Fe},height:{transform:Fe},maxHeight:{transform:Fe},minHeight:{transform:Fe},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},$o=fp;function gp(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function mp(e,t){return typeof e=="function"?e(t):e}function hp(){function e(n,r,o,i){const s={[n]:r,theme:o},a=i[n];if(!a)return{[n]:r};const{cssProperty:u=n,themeKey:c,transform:d,style:g}=a;if(r==null)return null;if(c==="typography"&&r==="inherit")return{[n]:r};const p=dr(o,c)||{};return g?g(s):st(s,r,h=>{let m=nr(p,d,h);return h===m&&typeof h=="string"&&(m=nr(p,d,`${n}${h==="default"?"":Ye(h)}`,h)),u===!1?m:{[u]:m}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const s=(r=i.unstable_sxConfig)!=null?r:$o;function a(u){let c=u;if(typeof u=="function")c=u(i);else if(typeof u!="object")return u;if(!c)return null;const d=Td(i.breakpoints),g=Object.keys(d);let p=d;return Object.keys(c).forEach(f=>{const h=mp(c[f],i);if(h!=null)if(typeof h=="object")if(s[f])p=yn(p,e(f,h,i,s));else{const m=st({theme:i},h,v=>({[f]:v}));gp(m,h)?p[f]=t({sx:h,theme:i}):p=yn(p,m)}else p=yn(p,e(f,h,i,s))}),Pd(g,p)}return Array.isArray(o)?o.map(a):a(o)}return t}const ra=hp();ra.filterProps=["sx"];const No=ra;function vp(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const bp=["breakpoints","palette","spacing","shape"];function Mo(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,s=fe(e,bp),a=Cd(n),u=Ad(o);let c=rt({breakpoints:a,direction:"ltr",components:{},palette:T({mode:"light"},r),spacing:u,shape:T({},Rd,i)},s);return c.applyStyles=vp,c=t.reduce((d,g)=>rt(d,g),c),c.unstable_sxConfig=T({},$o,s==null?void 0:s.unstable_sxConfig),c.unstable_sx=function(g){return No({sx:g,theme:this})},c}function yp(e){return Object.keys(e).length===0}function oa(e=null){const t=R.useContext(Kr.ThemeContext);return!t||yp(t)?e:t}const wp=Mo();function ia(e=wp){return oa(e)}const xp=["ownerState"],Sp=["variants"],Cp=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Ep(e){return Object.keys(e).length===0}function Rp(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Wn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const kp=Mo(),Vi=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Ln({defaultTheme:e,theme:t,themeId:n}){return Ep(t)?e:t[n]||t}function Tp(e){return e?(t,n)=>n[e]:null}function Xn(e,t){let{ownerState:n}=t,r=fe(t,xp);const o=typeof e=="function"?e(T({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>Xn(i,T({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let a=fe(o,Sp);return i.forEach(u=>{let c=!0;typeof u.props=="function"?c=u.props(T({ownerState:n},r,n)):Object.keys(u.props).forEach(d=>{(n==null?void 0:n[d])!==u.props[d]&&r[d]!==u.props[d]&&(c=!1)}),c&&(Array.isArray(a)||(a=[a]),a.push(typeof u.style=="function"?u.style(T({ownerState:n},r,n)):u.style))}),a}return o}function Pp(e={}){const{themeId:t,defaultTheme:n=kp,rootShouldForwardProp:r=Wn,slotShouldForwardProp:o=Wn}=e,i=s=>No(T({},s,{theme:Ln(T({},s,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(s,a={})=>{Kr.internal_processStyles(s,b=>b.filter(C=>!(C!=null&&C.__mui_systemSx)));const{name:u,slot:c,skipVariantsResolver:d,skipSx:g,overridesResolver:p=Tp(Vi(c))}=a,f=fe(a,Cp),h=d!==void 0?d:c&&c!=="Root"&&c!=="root"||!1,m=g||!1;let v;process.env.NODE_ENV!=="production"&&u&&(v=`${u}-${Vi(c||"Root")}`);let w=Wn;c==="Root"||c==="root"?w=r:c?w=o:Rp(s)&&(w=void 0);const O=Kr(s,T({shouldForwardProp:w,label:v},f)),x=b=>typeof b=="function"&&b.__emotion_real!==b||Ct(b)?C=>Xn(b,T({},C,{theme:Ln({theme:C.theme,defaultTheme:n,themeId:t})})):b,S=(b,...C)=>{let $=x(b);const j=C?C.map(x):[];u&&p&&j.push(_=>{const E=Ln(T({},_,{defaultTheme:n,themeId:t}));if(!E.components||!E.components[u]||!E.components[u].styleOverrides)return null;const k=E.components[u].styleOverrides,N={};return Object.entries(k).forEach(([A,D])=>{N[A]=Xn(D,T({},_,{theme:E}))}),p(_,N)}),u&&!h&&j.push(_=>{var E;const k=Ln(T({},_,{defaultTheme:n,themeId:t})),N=k==null||(E=k.components)==null||(E=E[u])==null?void 0:E.variants;return Xn({variants:N},T({},_,{theme:k}))}),m||j.push(i);const F=j.length-C.length;if(Array.isArray(b)&&F>0){const _=new Array(F).fill("");$=[...b,..._],$.raw=[...b.raw,..._]}const B=O($,...j);if(process.env.NODE_ENV!=="production"){let _;u&&(_=`${u}${Ye(c||"")}`),_===void 0&&(_=`Styled(${pu(s)})`),B.displayName=_}return s.muiName&&(B.muiName=s.muiName),B};return O.withConfig&&(S.withConfig=O.withConfig),S}}function Op(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:js(t.components[n].defaultProps,r)}function _p({props:e,name:t,defaultTheme:n,themeId:r}){let o=ia(n);return r&&(o=o[r]||o),Op({theme:o,name:t,props:e})}function Io(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Du(e,t,n)}function $p(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function _t(e){if(e.type)return e;if(e.charAt(0)==="#")return _t($p(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Ht(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Ht(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function yr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function Np(e){e=_t(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),s=(c,d=(c+n/30)%12)=>o-i*Math.max(Math.min(d-3,9-d,1),-1);let a="rgb";const u=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(a+="a",u.push(t[3])),yr({type:a,values:u})}function Li(e){e=_t(e);let t=e.type==="hsl"||e.type==="hsla"?_t(Np(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Bi(e,t){const n=Li(e),r=Li(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function rr(e,t){return e=_t(e),t=Io(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,yr(e)}function Mp(e,t){if(e=_t(e),t=Io(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return yr(e)}function Ip(e,t){if(e=_t(e),t=Io(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return yr(e)}function Dp(e,t){return T({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const Ap={black:"#000",white:"#fff"},Rn=Ap,jp={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Fp=jp,Vp={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Mt=Vp,Lp={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},It=Lp,Bp={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},sn=Bp,zp={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Dt=zp,Hp={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},At=Hp,Gp={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},jt=Gp,Up=["mode","contrastThreshold","tonalOffset"],zi={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Rn.white,default:Rn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Ir={text:{primary:Rn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Rn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Hi(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=Ip(e.main,o):t==="dark"&&(e.dark=Mp(e.main,i)))}function qp(e="light"){return e==="dark"?{main:Dt[200],light:Dt[50],dark:Dt[400]}:{main:Dt[700],light:Dt[400],dark:Dt[800]}}function Wp(e="light"){return e==="dark"?{main:Mt[200],light:Mt[50],dark:Mt[400]}:{main:Mt[500],light:Mt[300],dark:Mt[700]}}function Xp(e="light"){return e==="dark"?{main:It[500],light:It[300],dark:It[700]}:{main:It[700],light:It[400],dark:It[800]}}function Kp(e="light"){return e==="dark"?{main:At[400],light:At[300],dark:At[700]}:{main:At[700],light:At[500],dark:At[900]}}function Yp(e="light"){return e==="dark"?{main:jt[400],light:jt[300],dark:jt[700]}:{main:jt[800],light:jt[500],dark:jt[900]}}function Jp(e="light"){return e==="dark"?{main:sn[400],light:sn[300],dark:sn[700]}:{main:"#ed6c02",light:sn[500],dark:sn[900]}}function Zp(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=fe(e,Up),i=e.primary||qp(t),s=e.secondary||Wp(t),a=e.error||Xp(t),u=e.info||Kp(t),c=e.success||Yp(t),d=e.warning||Jp(t);function g(m){const v=Bi(m,Ir.text.primary)>=n?Ir.text.primary:zi.text.primary;if(process.env.NODE_ENV!=="production"){const w=Bi(m,v);w<3&&console.error([`MUI: The contrast ratio of ${w}:1 for ${v} on ${m}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return v}const p=({color:m,name:v,mainShade:w=500,lightShade:O=300,darkShade:x=700})=>{if(m=T({},m),!m.main&&m[w]&&(m.main=m[w]),!m.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${v?` (${v})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${w}\` property.`:Ht(11,v?` (${v})`:"",w));if(typeof m.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${v?` (${v})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Ht(12,v?` (${v})`:"",JSON.stringify(m.main)));return Hi(m,"light",O,r),Hi(m,"dark",x,r),m.contrastText||(m.contrastText=g(m.main)),m},f={dark:Ir,light:zi};return process.env.NODE_ENV!=="production"&&(f[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),rt(T({common:T({},Rn),mode:t,primary:p({color:i,name:"primary"}),secondary:p({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:p({color:a,name:"error"}),warning:p({color:d,name:"warning"}),info:p({color:u,name:"info"}),success:p({color:c,name:"success"}),grey:Fp,contrastThreshold:n,getContrastText:g,augmentColor:p,tonalOffset:r},f[t]),o)}const Qp=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function ef(e){return Math.round(e*1e5)/1e5}const Gi={textTransform:"uppercase"},Ui='"Roboto", "Helvetica", "Arial", sans-serif';function tf(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Ui,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:s=400,fontWeightMedium:a=500,fontWeightBold:u=700,htmlFontSize:c=16,allVariants:d,pxToRem:g}=n,p=fe(n,Qp);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof c!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const f=o/14,h=g||(w=>`${w/c*f}rem`),m=(w,O,x,S,b)=>T({fontFamily:r,fontWeight:w,fontSize:h(O),lineHeight:x},r===Ui?{letterSpacing:`${ef(S/O)}em`}:{},b,d),v={h1:m(i,96,1.167,-1.5),h2:m(i,60,1.2,-.5),h3:m(s,48,1.167,0),h4:m(s,34,1.235,.25),h5:m(s,24,1.334,0),h6:m(a,20,1.6,.15),subtitle1:m(s,16,1.75,.15),subtitle2:m(a,14,1.57,.1),body1:m(s,16,1.5,.15),body2:m(s,14,1.43,.15),button:m(a,14,1.75,.4,Gi),caption:m(s,12,1.66,.4),overline:m(s,12,2.66,1,Gi),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return rt(T({htmlFontSize:c,pxToRem:h,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:s,fontWeightMedium:a,fontWeightBold:u},v),p,{clone:!1})}const nf=.2,rf=.14,of=.12;function he(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${nf})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${rf})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${of})`].join(",")}const sf=["none",he(0,2,1,-1,0,1,1,0,0,1,3,0),he(0,3,1,-2,0,2,2,0,0,1,5,0),he(0,3,3,-2,0,3,4,0,0,1,8,0),he(0,2,4,-1,0,4,5,0,0,1,10,0),he(0,3,5,-1,0,5,8,0,0,1,14,0),he(0,3,5,-1,0,6,10,0,0,1,18,0),he(0,4,5,-2,0,7,10,1,0,2,16,1),he(0,5,5,-3,0,8,10,1,0,3,14,2),he(0,5,6,-3,0,9,12,1,0,3,16,2),he(0,6,6,-3,0,10,14,1,0,4,18,3),he(0,6,7,-4,0,11,15,1,0,4,20,3),he(0,7,8,-4,0,12,17,2,0,5,22,4),he(0,7,8,-4,0,13,19,2,0,5,24,4),he(0,7,9,-4,0,14,21,2,0,5,26,4),he(0,8,9,-5,0,15,22,2,0,6,28,5),he(0,8,10,-5,0,16,24,2,0,6,30,5),he(0,8,11,-5,0,17,26,2,0,6,32,5),he(0,9,11,-5,0,18,28,2,0,7,34,6),he(0,9,12,-6,0,19,29,2,0,7,36,6),he(0,10,13,-6,0,20,31,3,0,8,38,7),he(0,10,13,-6,0,21,33,3,0,8,40,7),he(0,10,14,-6,0,22,35,3,0,8,42,7),he(0,11,14,-7,0,23,36,3,0,9,44,8),he(0,11,15,-7,0,24,38,3,0,9,46,8)],af=sf,lf=["duration","easing","delay"],uf={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},cf={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function qi(e){return`${Math.round(e)}ms`}function df(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function pf(e){const t=T({},uf,e.easing),n=T({},cf,e.duration);return T({getAutoHeightDuration:df,create:(o=["all"],i={})=>{const{duration:s=n.standard,easing:a=t.easeInOut,delay:u=0}=i,c=fe(i,lf);if(process.env.NODE_ENV!=="production"){const d=p=>typeof p=="string",g=p=>!isNaN(parseFloat(p));!d(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!g(s)&&!d(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),d(a)||console.error('MUI: Argument "easing" must be a string.'),!g(u)&&!d(u)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(c).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(c).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(d=>`${d} ${typeof s=="string"?s:qi(s)} ${a} ${typeof u=="string"?u:qi(u)}`).join(",")}},e,{easing:t,duration:n})}const ff={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},gf=ff,mf=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function hf(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,s=fe(e,mf);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Ht(18));const a=Zp(r),u=Mo(e);let c=rt(u,{mixins:Dp(u.breakpoints,n),palette:a,shadows:af.slice(),typography:tf(a,i),transitions:pf(o),zIndex:T({},gf)});if(c=rt(c,s),c=t.reduce((d,g)=>rt(d,g),c),process.env.NODE_ENV!=="production"){const d=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],g=(p,f)=>{let h;for(h in p){const m=p[h];if(d.indexOf(h)!==-1&&Object.keys(m).length>0){if(process.env.NODE_ENV!=="production"){const v=Ze("",h);console.error([`MUI: The \`${f}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(p,null,2),"",`Instead, you need to use the '&.${v}' syntax:`,JSON.stringify({root:{[`&.${v}`]:m}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}p[h]={}}}};Object.keys(c.components).forEach(p=>{const f=c.components[p].styleOverrides;f&&p.indexOf("Mui")===0&&g(f,p)})}return c.unstable_sxConfig=T({},$o,s==null?void 0:s.unstable_sxConfig),c.unstable_sx=function(g){return No({sx:g,theme:this})},c}const vf=hf(),Do=vf,Ao="$$material",sa=e=>Wn(e)&&e!=="classes",bf=Pp({themeId:Ao,defaultTheme:Do,rootShouldForwardProp:sa}),Pe=bf;function In(){const e=ia(Do);return process.env.NODE_ENV!=="production"&&R.useDebugValue(e),e[Ao]||e}function lt({props:e,name:t}){return _p({props:e,name:t,defaultTheme:Do,themeId:Ao})}function ro(e,t){return ro=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},ro(e,t)}function yf(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,ro(e,t)}const Wi={disabled:!1};var wf=process.env.NODE_ENV!=="production"?l.oneOfType([l.number,l.shape({enter:l.number,exit:l.number,appear:l.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&l.oneOfType([l.string,l.shape({enter:l.string,exit:l.string,active:l.string}),l.shape({enter:l.string,enterDone:l.string,enterActive:l.string,exit:l.string,exitDone:l.string,exitActive:l.string})]);const aa=I.createContext(null);var xf=function(t){return t.scrollTop},fn="unmounted",wt="exited",xt="entering",Lt="entered",oo="exiting",ut=function(e){yf(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var s=o,a=s&&!s.isMounting?r.enter:r.appear,u;return i.appearStatus=null,r.in?a?(u=wt,i.appearStatus=xt):u=Lt:r.unmountOnExit||r.mountOnEnter?u=fn:u=wt,i.state={status:u},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var s=o.in;return s&&i.status===fn?{status:wt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==xt&&s!==Lt&&(i=xt):(s===xt||s===Lt)&&(i=oo)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,s,a;return i=s=a=o,o!=null&&typeof o!="number"&&(i=o.exit,s=o.enter,a=o.appear!==void 0?o.appear:s),{exit:i,enter:s,appear:a}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===xt){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:cn.findDOMNode(this);s&&xf(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===wt&&this.setState({status:fn})},n.performEnter=function(o){var i=this,s=this.props.enter,a=this.context?this.context.isMounting:o,u=this.props.nodeRef?[a]:[cn.findDOMNode(this),a],c=u[0],d=u[1],g=this.getTimeouts(),p=a?g.appear:g.enter;if(!o&&!s||Wi.disabled){this.safeSetState({status:Lt},function(){i.props.onEntered(c)});return}this.props.onEnter(c,d),this.safeSetState({status:xt},function(){i.props.onEntering(c,d),i.onTransitionEnd(p,function(){i.safeSetState({status:Lt},function(){i.props.onEntered(c,d)})})})},n.performExit=function(){var o=this,i=this.props.exit,s=this.getTimeouts(),a=this.props.nodeRef?void 0:cn.findDOMNode(this);if(!i||Wi.disabled){this.safeSetState({status:wt},function(){o.props.onExited(a)});return}this.props.onExit(a),this.safeSetState({status:oo},function(){o.props.onExiting(a),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:wt},function(){o.props.onExited(a)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,s=!0;return this.nextCallback=function(a){s&&(s=!1,i.nextCallback=null,o(a))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var s=this.props.nodeRef?this.props.nodeRef.current:cn.findDOMNode(this),a=o==null&&!this.props.addEndListener;if(!s||a){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var u=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],c=u[0],d=u[1];this.props.addEndListener(c,d)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===fn)return null;var i=this.props,s=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var a=fe(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return I.createElement(aa.Provider,{value:null},typeof s=="function"?s(o,a):I.cloneElement(I.Children.only(s),a))},t}(I.Component);ut.contextType=aa;ut.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:l.shape({current:typeof Element>"u"?l.any:function(e,t,n,r,o,i){var s=e[t];return l.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:l.oneOfType([l.func.isRequired,l.element.isRequired]).isRequired,in:l.bool,mountOnEnter:l.bool,unmountOnExit:l.bool,appear:l.bool,enter:l.bool,exit:l.bool,timeout:function(t){var n=wf;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:l.func,onEnter:l.func,onEntering:l.func,onEntered:l.func,onExit:l.func,onExiting:l.func,onExited:l.func}:{};function Ft(){}ut.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Ft,onEntering:Ft,onEntered:Ft,onExit:Ft,onExiting:Ft,onExited:Ft};ut.UNMOUNTED=fn;ut.EXITED=wt;ut.ENTERING=xt;ut.ENTERED=Lt;ut.EXITING=oo;const la=ut,ua=e=>e.scrollTop;function or(e,t){var n,r;const{timeout:o,easing:i,style:s={}}=e;return{duration:(n=s.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:s.transitionDelay}}const Sf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function io(e){return`scale(${e}, ${e**2})`}const Cf={entering:{opacity:1,transform:io(1)},entered:{opacity:1,transform:"none"}},Dr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),jo=R.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:s,in:a,onEnter:u,onEntered:c,onEntering:d,onExit:g,onExited:p,onExiting:f,style:h,timeout:m="auto",TransitionComponent:v=la}=t,w=fe(t,Sf),O=dn(),x=R.useRef(),S=In(),b=R.useRef(null),C=Ge(b,i.ref,n),$=A=>D=>{if(A){const z=b.current;D===void 0?A(z):A(z,D)}},j=$(d),F=$((A,D)=>{ua(A);const{duration:z,delay:Q,easing:te}=or({style:h,timeout:m,easing:s},{mode:"enter"});let P;m==="auto"?(P=S.transitions.getAutoHeightDuration(A.clientHeight),x.current=P):P=z,A.style.transition=[S.transitions.create("opacity",{duration:P,delay:Q}),S.transitions.create("transform",{duration:Dr?P:P*.666,delay:Q,easing:te})].join(","),u&&u(A,D)}),B=$(c),_=$(f),E=$(A=>{const{duration:D,delay:z,easing:Q}=or({style:h,timeout:m,easing:s},{mode:"exit"});let te;m==="auto"?(te=S.transitions.getAutoHeightDuration(A.clientHeight),x.current=te):te=D,A.style.transition=[S.transitions.create("opacity",{duration:te,delay:z}),S.transitions.create("transform",{duration:Dr?te:te*.666,delay:Dr?z:z||te*.333,easing:Q})].join(","),A.style.opacity=0,A.style.transform=io(.75),g&&g(A)}),k=$(p),N=A=>{m==="auto"&&O.start(x.current||0,A),r&&r(b.current,A)};return y.jsx(v,T({appear:o,in:a,nodeRef:b,onEnter:F,onEntered:B,onEntering:j,onExit:E,onExited:k,onExiting:_,addEndListener:N,timeout:m==="auto"?null:m},w,{children:(A,D)=>R.cloneElement(i,T({style:T({opacity:0,transform:io(.75),visibility:A==="exited"&&!a?"hidden":void 0},Cf[A],h,i.props.style),ref:C},D))}))});process.env.NODE_ENV!=="production"&&(jo.propTypes={addEndListener:l.func,appear:l.bool,children:Pn.isRequired,easing:l.oneOfType([l.shape({enter:l.string,exit:l.string}),l.string]),in:l.bool,onEnter:l.func,onEntered:l.func,onEntering:l.func,onExit:l.func,onExited:l.func,onExiting:l.func,style:l.object,timeout:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});jo.muiSupportAuto=!0;const so=jo,Ef=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},Xi=Ef,Rf=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],kf=Pe(ea,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),ca=R.forwardRef(function(t,n){var r;const o=oa(),i=lt({props:t,name:"MuiPopper"}),{anchorEl:s,component:a,components:u,componentsProps:c,container:d,disablePortal:g,keepMounted:p,modifiers:f,open:h,placement:m,popperOptions:v,popperRef:w,transition:O,slots:x,slotProps:S}=i,b=fe(i,Rf),C=(r=x==null?void 0:x.root)!=null?r:u==null?void 0:u.Root,$=T({anchorEl:s,container:d,disablePortal:g,keepMounted:p,modifiers:f,open:h,placement:m,popperOptions:v,popperRef:w,transition:O},b);return y.jsx(kf,T({as:a,direction:o==null?void 0:o.direction,slots:{root:C},slotProps:S??c},$,{ref:n}))});process.env.NODE_ENV!=="production"&&(ca.propTypes={anchorEl:l.oneOfType([ot,l.object,l.func]),children:l.oneOfType([l.node,l.func]),component:l.elementType,components:l.shape({Root:l.elementType}),componentsProps:l.shape({root:l.oneOfType([l.func,l.object])}),container:l.oneOfType([ot,l.func]),disablePortal:l.bool,keepMounted:l.bool,modifiers:l.arrayOf(l.shape({data:l.object,effect:l.func,enabled:l.bool,fn:l.func,name:l.any,options:l.object,phase:l.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:l.arrayOf(l.string),requiresIfExists:l.arrayOf(l.string)})),open:l.bool.isRequired,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:l.shape({modifiers:l.array,onFirstUpdate:l.func,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:l.oneOf(["absolute","fixed"])}),popperRef:xo,slotProps:l.shape({root:l.oneOfType([l.func,l.object])}),slots:l.shape({root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transition:l.bool});const da=ca;function Tf(e){return Ze("MuiTooltip",e)}const Pf=gt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),dt=Pf,Of=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function _f(e){return Math.round(e*1e5)/1e5}const $f=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,s={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Ye(i.split("-")[0])}`],arrow:["arrow"]};return at(s,Tf,t)},Nf=Pe(da,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>T({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${dt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${dt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${dt.arrow}`]:T({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${dt.arrow}`]:T({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Mf=Pe("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Ye(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>T({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:rr(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${_f(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${dt.popper}[data-popper-placement*="left"] &`]:T({transformOrigin:"right center"},t.isRtl?T({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):T({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${dt.popper}[data-popper-placement*="right"] &`]:T({transformOrigin:"left center"},t.isRtl?T({marginRight:"14px"},t.touch&&{marginRight:"24px"}):T({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${dt.popper}[data-popper-placement*="top"] &`]:T({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${dt.popper}[data-popper-placement*="bottom"] &`]:T({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),If=Pe("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:rr(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Bn=!1;const Ki=new On;let an={x:0,y:0};function zn(e,t){return n=>{t&&t(n),e(n)}}const pa=R.forwardRef(function(t,n){var r,o,i,s,a,u,c,d,g,p,f,h,m,v,w,O,x,S,b;const C=lt({props:t,name:"MuiTooltip"}),{arrow:$=!1,children:j,components:F={},componentsProps:B={},describeChild:_=!1,disableFocusListener:E=!1,disableHoverListener:k=!1,disableInteractive:N=!1,disableTouchListener:A=!1,enterDelay:D=100,enterNextDelay:z=0,enterTouchDelay:Q=700,followCursor:te=!1,id:P,leaveDelay:L=0,leaveTouchDelay:G=1500,onClose:K,onOpen:H,open:U,placement:W="bottom",PopperComponent:X,PopperProps:q={},slotProps:Y={},slots:ee={},title:ie,TransitionComponent:V=so,TransitionProps:ne}=C,M=fe(C,Of),se=R.isValidElement(j)?j:y.jsx("span",{children:j}),Se=In(),Oe=Se.direction==="rtl",[we,vt]=R.useState(),[_e,Qe]=R.useState(null),De=R.useRef(!1),et=N||te,Ce=dn(),$t=dn(),bt=dn(),Jt=dn(),[Dn,Uo]=$s({controlled:U,default:!1,name:"Tooltip",state:"open"});let tt=Dn;if(process.env.NODE_ENV!=="production"){const{current:re}=R.useRef(U!==void 0);R.useEffect(()=>{we&&we.disabled&&!re&&ie!==""&&we.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ie,we,re])}const xr=_s(P),Zt=R.useRef(),An=xn(()=>{Zt.current!==void 0&&(document.body.style.WebkitUserSelect=Zt.current,Zt.current=void 0),Jt.clear()});R.useEffect(()=>An,[An]);const qo=re=>{Ki.clear(),Bn=!0,Uo(!0),H&&!tt&&H(re)},jn=xn(re=>{Ki.start(800+L,()=>{Bn=!1}),Uo(!1),K&&tt&&K(re),Ce.start(Se.transitions.duration.shortest,()=>{De.current=!1})}),Sr=re=>{De.current&&re.type!=="touchstart"||(we&&we.removeAttribute("title"),$t.clear(),bt.clear(),D||Bn&&z?$t.start(Bn?z:D,()=>{qo(re)}):qo(re))},Wo=re=>{$t.clear(),bt.start(L,()=>{jn(re)})},{isFocusVisibleRef:Xo,onBlur:Ka,onFocus:Ya,ref:Ja}=Ns(),[,Ko]=R.useState(!1),Yo=re=>{Ka(re),Xo.current===!1&&(Ko(!1),Wo(re))},Jo=re=>{we||vt(re.currentTarget),Ya(re),Xo.current===!0&&(Ko(!0),Sr(re))},Zo=re=>{De.current=!0;const Ae=se.props;Ae.onTouchStart&&Ae.onTouchStart(re)},Qo=Sr,ei=Wo,Za=re=>{Zo(re),bt.clear(),Ce.clear(),An(),Zt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Jt.start(Q,()=>{document.body.style.WebkitUserSelect=Zt.current,Sr(re)})},Qa=re=>{se.props.onTouchEnd&&se.props.onTouchEnd(re),An(),bt.start(G,()=>{jn(re)})};R.useEffect(()=>{if(!tt)return;function re(Ae){(Ae.key==="Escape"||Ae.key==="Esc")&&jn(Ae)}return document.addEventListener("keydown",re),()=>{document.removeEventListener("keydown",re)}},[jn,tt]);const el=Ge(se.ref,Ja,vt,n);!ie&&ie!==0&&(tt=!1);const Cr=R.useRef(),tl=re=>{const Ae=se.props;Ae.onMouseMove&&Ae.onMouseMove(re),an={x:re.clientX,y:re.clientY},Cr.current&&Cr.current.update()},Qt={},Er=typeof ie=="string";_?(Qt.title=!tt&&Er&&!k?ie:null,Qt["aria-describedby"]=tt?xr:null):(Qt["aria-label"]=Er?ie:null,Qt["aria-labelledby"]=tt&&!Er?xr:null);const Be=T({},Qt,M,se.props,{className:ke(M.className,se.props.className),onTouchStart:Zo,ref:el},te?{onMouseMove:tl}:{});process.env.NODE_ENV!=="production"&&(Be["data-mui-internal-clone-element"]=!0,R.useEffect(()=>{we&&!we.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[we]));const en={};A||(Be.onTouchStart=Za,Be.onTouchEnd=Qa),k||(Be.onMouseOver=zn(Qo,Be.onMouseOver),Be.onMouseLeave=zn(ei,Be.onMouseLeave),et||(en.onMouseOver=Qo,en.onMouseLeave=ei)),E||(Be.onFocus=zn(Jo,Be.onFocus),Be.onBlur=zn(Yo,Be.onBlur),et||(en.onFocus=Jo,en.onBlur=Yo)),process.env.NODE_ENV!=="production"&&se.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));const nl=R.useMemo(()=>{var re;let Ae=[{name:"arrow",enabled:!!_e,options:{element:_e,padding:4}}];return(re=q.popperOptions)!=null&&re.modifiers&&(Ae=Ae.concat(q.popperOptions.modifiers)),T({},q.popperOptions,{modifiers:Ae})},[_e,q]),tn=T({},C,{isRtl:Oe,arrow:$,disableInteractive:et,placement:W,PopperComponentProp:X,touch:De.current}),Rr=$f(tn),ti=(r=(o=ee.popper)!=null?o:F.Popper)!=null?r:Nf,ni=(i=(s=(a=ee.transition)!=null?a:F.Transition)!=null?s:V)!=null?i:so,ri=(u=(c=ee.tooltip)!=null?c:F.Tooltip)!=null?u:Mf,oi=(d=(g=ee.arrow)!=null?g:F.Arrow)!=null?d:If,rl=pn(ti,T({},q,(p=Y.popper)!=null?p:B.popper,{className:ke(Rr.popper,q==null?void 0:q.className,(f=(h=Y.popper)!=null?h:B.popper)==null?void 0:f.className)}),tn),ol=pn(ni,T({},ne,(m=Y.transition)!=null?m:B.transition),tn),il=pn(ri,T({},(v=Y.tooltip)!=null?v:B.tooltip,{className:ke(Rr.tooltip,(w=(O=Y.tooltip)!=null?O:B.tooltip)==null?void 0:w.className)}),tn),sl=pn(oi,T({},(x=Y.arrow)!=null?x:B.arrow,{className:ke(Rr.arrow,(S=(b=Y.arrow)!=null?b:B.arrow)==null?void 0:S.className)}),tn);return y.jsxs(R.Fragment,{children:[R.cloneElement(se,Be),y.jsx(ti,T({as:X??da,placement:W,anchorEl:te?{getBoundingClientRect:()=>({top:an.y,left:an.x,right:an.x,bottom:an.y,width:0,height:0})}:we,popperRef:Cr,open:we?tt:!1,id:xr,transition:!0},en,rl,{popperOptions:nl,children:({TransitionProps:re})=>y.jsx(ni,T({timeout:Se.transitions.duration.shorter},re,ol,{children:y.jsxs(ri,T({},il,{children:[ie,$?y.jsx(oi,T({},sl,{ref:Qe})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(pa.propTypes={arrow:l.bool,children:Pn.isRequired,classes:l.object,className:l.string,components:l.shape({Arrow:l.elementType,Popper:l.elementType,Tooltip:l.elementType,Transition:l.elementType}),componentsProps:l.shape({arrow:l.object,popper:l.object,tooltip:l.object,transition:l.object}),describeChild:l.bool,disableFocusListener:l.bool,disableHoverListener:l.bool,disableInteractive:l.bool,disableTouchListener:l.bool,enterDelay:l.number,enterNextDelay:l.number,enterTouchDelay:l.number,followCursor:l.bool,id:l.string,leaveDelay:l.number,leaveTouchDelay:l.number,onClose:l.func,onOpen:l.func,open:l.bool,placement:l.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:l.elementType,PopperProps:l.object,slotProps:l.shape({arrow:l.object,popper:l.object,tooltip:l.object,transition:l.object}),slots:l.shape({arrow:l.elementType,popper:l.elementType,tooltip:l.elementType,transition:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),title:l.node,TransitionComponent:l.elementType,TransitionProps:l.object});const Df=pa;var Fo={},fa={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(fa);var Af=fa.exports,Ar={};function jf(e){return Ze("MuiSvgIcon",e)}gt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Ff=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Vf=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Ye(t)}`,`fontSize${Ye(n)}`]};return at(o,jf,r)},Lf=Pe("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Ye(n.color)}`],t[`fontSize${Ye(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,s,a,u,c,d,g,p,f,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(s=i.pxToRem)==null?void 0:s.call(i,20))||"1.25rem",medium:((a=e.typography)==null||(u=a.pxToRem)==null?void 0:u.call(a,24))||"1.5rem",large:((c=e.typography)==null||(d=c.pxToRem)==null?void 0:d.call(c,35))||"2.1875rem"}[t.fontSize],color:(g=(p=(e.vars||e).palette)==null||(p=p[t.color])==null?void 0:p.main)!=null?g:{action:(f=(e.vars||e).palette)==null||(f=f.action)==null?void 0:f.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),Vo=R.forwardRef(function(t,n){const r=lt({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:s="inherit",component:a="svg",fontSize:u="medium",htmlColor:c,inheritViewBox:d=!1,titleAccess:g,viewBox:p="0 0 24 24"}=r,f=fe(r,Ff),h=R.isValidElement(o)&&o.type==="svg",m=T({},r,{color:s,component:a,fontSize:u,instanceFontSize:t.fontSize,inheritViewBox:d,viewBox:p,hasSvgAsChild:h}),v={};d||(v.viewBox=p);const w=Vf(m);return y.jsxs(Lf,T({as:a,className:ke(w.root,i),focusable:"false",color:c,"aria-hidden":g?void 0:!0,role:g?"img":void 0,ref:n},v,f,h&&o.props,{ownerState:m,children:[h?o.props.children:o,g?y.jsx("title",{children:g}):null]}))});process.env.NODE_ENV!=="production"&&(Vo.propTypes={children:l.node,classes:l.object,className:l.string,color:l.oneOfType([l.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),l.string]),component:l.elementType,fontSize:l.oneOfType([l.oneOf(["inherit","large","medium","small"]),l.string]),htmlColor:l.string,inheritViewBox:l.bool,shapeRendering:l.string,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),titleAccess:l.string,viewBox:l.string});Vo.muiName="SvgIcon";const Yi=Vo;function ga(e,t){function n(r,o){return y.jsx(Yi,T({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Yi.muiName,R.memo(R.forwardRef(n))}const Bf={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Fs.configure(e)}},zf=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Ye,createChainedFunction:Zr,createSvgIcon:ga,debounce:Os,deprecatedPropType:gu,isMuiElement:mu,ownerDocument:Te,ownerWindow:Gt,requirePropFactory:hu,setRef:Zn,unstable_ClassNameGenerator:Bf,unstable_useEnhancedEffect:Tt,unstable_useId:_s,unsupportedProp:yu,useControlled:$s,useEventCallback:xn,useForkRef:Ge,useIsFocusVisible:Ns},Symbol.toStringTag,{value:"Module"})),Hf=Wl(zf);var Ji;function Gf(){return Ji||(Ji=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Hf}(Ar)),Ar}var Uf=Af;Object.defineProperty(Fo,"__esModule",{value:!0});var ma=Fo.default=void 0,qf=Uf(Gf()),Wf=y;ma=Fo.default=(0,qf.default)((0,Wf.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function Zi(e,t,n){return e?y.jsx(ve.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:y.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Lo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:s=void 0,hasAutoFocus:a=!1,className:u,isDisabled:c=!1,isDense:d=!0,isSubMenuParent:g=!1,hasDisabledGutters:p=!1,hasDivider:f=!1,focusVisibleClassName:h,id:m,children:v}=e,w=y.jsx(ve.MenuItem,{sx:{lineHeight:.8},autoFocus:a,className:u,disabled:c,dense:d,disableGutters:p,divider:f,focusVisibleClassName:h,onClick:t,id:m,children:n?y.jsxs(y.Fragment,{children:[Zi(i,n,!0),y.jsx(ve.ListItemText,{primary:n,inset:!i&&o}),g?y.jsx(ve.ListItemIcon,{className:"papi-menu-icon-trailing",children:y.jsx(ma,{})}):Zi(s,n,!1)]}):v});return r?y.jsx(Df,{title:r,placement:"right",children:y.jsx("div",{children:w})}):w}function ha(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Xf(e){const[t,n]=I.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,s=c=>{n(c.currentTarget)},a=()=>{n(void 0)},u=()=>{let c=ha(i).filter(d=>"menuItem"in d.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return c=c.filter(d=>"menuItem"in d.group&&d.group.menuItem===r.id),y.jsx(Bo,{...e,includedGroups:c})};return y.jsxs(y.Fragment,{children:[y.jsx(Lo,{onClick:s,...o,isSubMenuParent:!0}),y.jsx(ve.Menu,{anchorEl:t,open:!!t,onClose:a,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:u()},r.id)]})}const Kf=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function Bo(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:s}=I.useMemo(()=>{const d=o&&o.length>0?o:ha(t).filter(h=>!("menuItem"in h.group)),g=Object.values(d).sort((h,m)=>(h.group.order||0)-(m.group.order||0)),p=[];g.forEach(h=>{Kf(h.id,t.items).forEach(m=>p.push({item:m,isLastItemInGroup:!1})),p.length>0&&(p[p.length-1].isLastItemInGroup=!0)}),p.length>0&&(p[p.length-1].isLastItemInGroup=!1);const f=p.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:p,allowForLeadingIcons:f}},[o,t]),a=({item:d,isLastItemInGroup:g})=>({className:"papi-menu-item",label:d.label,tooltip:d.tooltip,iconPathBefore:"iconPathBefore"in d?d.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in d?d.iconPathAfter:void 0,hasDivider:g,allowForLeadingIcons:s}),[u]=i;if(!u)return y.jsx("div",{});const c=u.item.group;return y.jsx("div",{role:"menu","aria-label":c,children:i.map((d,g)=>{const{item:p}=d,f=a(d);if("command"in p){const h=p.group+g;return y.jsx(Lo,{onClick:m=>{n==null||n(m),r(p)},...f},h)}return y.jsx(Xf,{parentMenuItem:p,parentItemProps:f,...e},c+p.id)})},c)}function Yf(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([s,a])=>({id:s,group:a})).filter(s=>"column"in s.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(s=>"column"in s.group&&s.group.column===n)),y.jsx(Bo,{...e,includedGroups:i})}function Jf({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return y.jsxs(ve.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[y.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),y.jsx(ve.List,{id:n,dense:!0,className:i??"",children:y.jsx(Yf,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function va({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=I.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(a=>{if(a==="isExtensible")return;const u=a,c=o[u];typeof c=="object"&&typeof c.order=="number"&&!Number.isNaN(c.order)?s.set(c.order,{id:u,metadata:c}):console.warn(`Property ${a} (${typeof c}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((a,u)=>(a.metadata.order||0)-(u.metadata.order||0))},[o,r]);return y.jsx(ve.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((s,a)=>y.jsx(Jf,{commandHandler:e,menuDefinition:n,...s,className:t},a))})}const ba=R.createContext({});process.env.NODE_ENV!=="production"&&(ba.displayName="ListContext");const Zf=ba;function Qf(e){return Ze("MuiList",e)}gt("MuiList",["root","padding","dense","subheader"]);const eg=["children","className","component","dense","disablePadding","subheader"],tg=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return at({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},Qf,t)},ng=Pe("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>T({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),ya=R.forwardRef(function(t,n){const r=lt({props:t,name:"MuiList"}),{children:o,className:i,component:s="ul",dense:a=!1,disablePadding:u=!1,subheader:c}=r,d=fe(r,eg),g=R.useMemo(()=>({dense:a}),[a]),p=T({},r,{component:s,dense:a,disablePadding:u}),f=tg(p);return y.jsx(Zf.Provider,{value:g,children:y.jsxs(ng,T({as:s,className:ke(f.root,i),ref:n,ownerState:p},d,{children:[c,o]}))})});process.env.NODE_ENV!=="production"&&(ya.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,dense:l.bool,disablePadding:l.bool,subheader:l.node,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object])});const rg=ya,og=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function jr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function Qi(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function wa(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function ln(e,t,n,r,o,i){let s=!1,a=o(e,t,t?n:!1);for(;a;){if(a===e.firstChild){if(s)return!1;s=!0}const u=r?!1:a.disabled||a.getAttribute("aria-disabled")==="true";if(!a.hasAttribute("tabindex")||!wa(a,i)||u)a=o(e,a,n);else return a.focus(),!0}return!1}const xa=R.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:s,className:a,disabledItemsFocusable:u=!1,disableListWrap:c=!1,onKeyDown:d,variant:g="selectedMenu"}=t,p=fe(t,og),f=R.useRef(null),h=R.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Tt(()=>{o&&f.current.focus()},[o]),R.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(x,S)=>{const b=!f.current.style.width;if(x.clientHeight<f.current.clientHeight&&b){const C=`${Ms(Te(x))}px`;f.current.style[S.direction==="rtl"?"paddingLeft":"paddingRight"]=C,f.current.style.width=`calc(100% + ${C})`}return f.current}}),[]);const m=x=>{const S=f.current,b=x.key,C=Te(S).activeElement;if(b==="ArrowDown")x.preventDefault(),ln(S,C,c,u,jr);else if(b==="ArrowUp")x.preventDefault(),ln(S,C,c,u,Qi);else if(b==="Home")x.preventDefault(),ln(S,null,c,u,jr);else if(b==="End")x.preventDefault(),ln(S,null,c,u,Qi);else if(b.length===1){const $=h.current,j=b.toLowerCase(),F=performance.now();$.keys.length>0&&(F-$.lastTime>500?($.keys=[],$.repeating=!0,$.previousKeyMatched=!0):$.repeating&&j!==$.keys[0]&&($.repeating=!1)),$.lastTime=F,$.keys.push(j);const B=C&&!$.repeating&&wa(C,$);$.previousKeyMatched&&(B||ln(S,C,!1,u,jr,$))?x.preventDefault():$.previousKeyMatched=!1}d&&d(x)},v=Ge(f,n);let w=-1;R.Children.forEach(s,(x,S)=>{if(!R.isValidElement(x)){w===S&&(w+=1,w>=s.length&&(w=-1));return}process.env.NODE_ENV!=="production"&&Jn.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(g==="selectedMenu"&&x.props.selected||w===-1)&&(w=S),w===S&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(w+=1,w>=s.length&&(w=-1))});const O=R.Children.map(s,(x,S)=>{if(S===w){const b={};return i&&(b.autoFocus=!0),x.props.tabIndex===void 0&&g==="selectedMenu"&&(b.tabIndex=0),R.cloneElement(x,b)}return x});return y.jsx(rg,T({role:"menu",ref:v,className:a,onKeyDown:m,tabIndex:o?0:-1},p,{children:O}))});process.env.NODE_ENV!=="production"&&(xa.propTypes={autoFocus:l.bool,autoFocusItem:l.bool,children:l.node,className:l.string,disabledItemsFocusable:l.bool,disableListWrap:l.bool,onKeyDown:l.func,variant:l.oneOf(["menu","selectedMenu"])});const ig=xa,sg=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],ag={entering:{opacity:1},entered:{opacity:1}},Sa=R.forwardRef(function(t,n){const r=In(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:s=!0,children:a,easing:u,in:c,onEnter:d,onEntered:g,onEntering:p,onExit:f,onExited:h,onExiting:m,style:v,timeout:w=o,TransitionComponent:O=la}=t,x=fe(t,sg),S=R.useRef(null),b=Ge(S,a.ref,n),C=N=>A=>{if(N){const D=S.current;A===void 0?N(D):N(D,A)}},$=C(p),j=C((N,A)=>{ua(N);const D=or({style:v,timeout:w,easing:u},{mode:"enter"});N.style.webkitTransition=r.transitions.create("opacity",D),N.style.transition=r.transitions.create("opacity",D),d&&d(N,A)}),F=C(g),B=C(m),_=C(N=>{const A=or({style:v,timeout:w,easing:u},{mode:"exit"});N.style.webkitTransition=r.transitions.create("opacity",A),N.style.transition=r.transitions.create("opacity",A),f&&f(N)}),E=C(h),k=N=>{i&&i(S.current,N)};return y.jsx(O,T({appear:s,in:c,nodeRef:S,onEnter:j,onEntered:F,onEntering:$,onExit:_,onExited:E,onExiting:B,addEndListener:k,timeout:w},x,{children:(N,A)=>R.cloneElement(a,T({style:T({opacity:0,visibility:N==="exited"&&!c?"hidden":void 0},ag[N],v,a.props.style),ref:b},A))}))});process.env.NODE_ENV!=="production"&&(Sa.propTypes={addEndListener:l.func,appear:l.bool,children:Pn.isRequired,easing:l.oneOfType([l.shape({enter:l.string,exit:l.string}),l.string]),in:l.bool,onEnter:l.func,onEntered:l.func,onEntering:l.func,onExit:l.func,onExited:l.func,onExiting:l.func,style:l.object,timeout:l.oneOfType([l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});const lg=Sa;function ug(e){return Ze("MuiBackdrop",e)}gt("MuiBackdrop",["root","invisible"]);const cg=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],dg=e=>{const{classes:t,invisible:n}=e;return at({root:["root",n&&"invisible"]},ug,t)},pg=Pe("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>T({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),Ca=R.forwardRef(function(t,n){var r,o,i;const s=lt({props:t,name:"MuiBackdrop"}),{children:a,className:u,component:c="div",components:d={},componentsProps:g={},invisible:p=!1,open:f,slotProps:h={},slots:m={},TransitionComponent:v=lg,transitionDuration:w}=s,O=fe(s,cg),x=T({},s,{component:c,invisible:p}),S=dg(x),b=(r=h.root)!=null?r:g.root;return y.jsx(v,T({in:f,timeout:w},O,{children:y.jsx(pg,T({"aria-hidden":!0},b,{as:(o=(i=m.root)!=null?i:d.Root)!=null?o:c,className:ke(S.root,u,b==null?void 0:b.className),ownerState:T({},x,b==null?void 0:b.ownerState),classes:S,ref:n,children:a}))}))});process.env.NODE_ENV!=="production"&&(Ca.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,components:l.shape({Root:l.elementType}),componentsProps:l.shape({root:l.object}),invisible:l.bool,open:l.bool.isRequired,slotProps:l.shape({root:l.object}),slots:l.shape({root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),TransitionComponent:l.elementType,transitionDuration:l.oneOfType([l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});const fg=Ca;function gg(e){return Ze("MuiModal",e)}gt("MuiModal",["root","hidden","backdrop"]);const mg=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],hg=e=>{const{open:t,exited:n,classes:r}=e;return at({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},gg,r)},vg=Pe("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>T({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),bg=Pe(fg,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Ea=R.forwardRef(function(t,n){var r,o,i,s,a,u;const c=lt({name:"MuiModal",props:t}),{BackdropComponent:d=bg,BackdropProps:g,className:p,closeAfterTransition:f=!1,children:h,container:m,component:v,components:w={},componentsProps:O={},disableAutoFocus:x=!1,disableEnforceFocus:S=!1,disableEscapeKeyDown:b=!1,disablePortal:C=!1,disableRestoreFocus:$=!1,disableScrollLock:j=!1,hideBackdrop:F=!1,keepMounted:B=!1,onBackdropClick:_,open:E,slotProps:k,slots:N}=c,A=fe(c,mg),D=T({},c,{closeAfterTransition:f,disableAutoFocus:x,disableEnforceFocus:S,disableEscapeKeyDown:b,disablePortal:C,disableRestoreFocus:$,disableScrollLock:j,hideBackdrop:F,keepMounted:B}),{getRootProps:z,getBackdropProps:Q,getTransitionProps:te,portalRef:P,isTopModal:L,exited:G,hasTransition:K}=sc(T({},D,{rootRef:n})),H=T({},D,{exited:G}),U=hg(H),W={};if(h.props.tabIndex===void 0&&(W.tabIndex="-1"),K){const{onEnter:ne,onExited:M}=te();W.onEnter=ne,W.onExited=M}const X=(r=(o=N==null?void 0:N.root)!=null?o:w.Root)!=null?r:vg,q=(i=(s=N==null?void 0:N.backdrop)!=null?s:w.Backdrop)!=null?i:d,Y=(a=k==null?void 0:k.root)!=null?a:O.root,ee=(u=k==null?void 0:k.backdrop)!=null?u:O.backdrop,ie=Pt({elementType:X,externalSlotProps:Y,externalForwardedProps:A,getSlotProps:z,additionalProps:{ref:n,as:v},ownerState:H,className:ke(p,Y==null?void 0:Y.className,U==null?void 0:U.root,!H.open&&H.exited&&(U==null?void 0:U.hidden))}),V=Pt({elementType:q,externalSlotProps:ee,additionalProps:g,getSlotProps:ne=>Q(T({},ne,{onClick:M=>{_&&_(M),ne!=null&&ne.onClick&&ne.onClick(M)}})),className:ke(ee==null?void 0:ee.className,g==null?void 0:g.className,U==null?void 0:U.backdrop),ownerState:H});return!B&&!E&&(!K||G)?null:y.jsx(Sn,{ref:P,container:m,disablePortal:C,children:y.jsxs(X,T({},ie,{children:[!F&&d?y.jsx(q,T({},V)):null,y.jsx(Qn,{disableEnforceFocus:S,disableAutoFocus:x,disableRestoreFocus:$,isEnabled:L,open:E,children:R.cloneElement(h,W)})]}))})});process.env.NODE_ENV!=="production"&&(Ea.propTypes={BackdropComponent:l.elementType,BackdropProps:l.object,children:Pn.isRequired,classes:l.object,className:l.string,closeAfterTransition:l.bool,component:l.elementType,components:l.shape({Backdrop:l.elementType,Root:l.elementType}),componentsProps:l.shape({backdrop:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),container:l.oneOfType([ot,l.func]),disableAutoFocus:l.bool,disableEnforceFocus:l.bool,disableEscapeKeyDown:l.bool,disablePortal:l.bool,disableRestoreFocus:l.bool,disableScrollLock:l.bool,hideBackdrop:l.bool,keepMounted:l.bool,onBackdropClick:l.func,onClose:l.func,onTransitionEnter:l.func,onTransitionExited:l.func,open:l.bool.isRequired,slotProps:l.shape({backdrop:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({backdrop:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object])});const yg=Ea;function wg(e){return Ze("MuiPaper",e)}gt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const xg=["className","component","elevation","square","variant"],Sg=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return at(i,wg,o)},Cg=Pe("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return T({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&T({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${rr("#fff",Xi(t.elevation))}, ${rr("#fff",Xi(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Ra=R.forwardRef(function(t,n){const r=lt({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:s=1,square:a=!1,variant:u="elevation"}=r,c=fe(r,xg),d=T({},r,{component:i,elevation:s,square:a,variant:u}),g=Sg(d);return process.env.NODE_ENV!=="production"&&In().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),y.jsx(Cg,T({as:i,ownerState:d,className:ke(g.root,o),ref:n},c))});process.env.NODE_ENV!=="production"&&(Ra.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,elevation:Yt(As,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:l.bool,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),variant:l.oneOfType([l.oneOf(["elevation","outlined"]),l.string])});const Eg=Ra;function Rg(e){return Ze("MuiPopover",e)}gt("MuiPopover",["root","paper"]);const kg=["onEntering"],Tg=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Pg=["slotProps"];function es(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function ts(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function ns(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function Kn(e){return typeof e=="function"?e():e}const Og=e=>{const{classes:t}=e;return at({root:["root"],paper:["paper"]},Rg,t)},_g=Pe(yg,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),ka=Pe(Eg,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Ta=R.forwardRef(function(t,n){var r,o,i;const s=lt({props:t,name:"MuiPopover"}),{action:a,anchorEl:u,anchorOrigin:c={vertical:"top",horizontal:"left"},anchorPosition:d,anchorReference:g="anchorEl",children:p,className:f,container:h,elevation:m=8,marginThreshold:v=16,open:w,PaperProps:O={},slots:x,slotProps:S,transformOrigin:b={vertical:"top",horizontal:"left"},TransitionComponent:C=so,transitionDuration:$="auto",TransitionProps:{onEntering:j}={},disableScrollLock:F=!1}=s,B=fe(s.TransitionProps,kg),_=fe(s,Tg),E=(r=S==null?void 0:S.paper)!=null?r:O,k=R.useRef(),N=Ge(k,E.ref),A=T({},s,{anchorOrigin:c,anchorReference:g,elevation:m,marginThreshold:v,externalPaperSlotProps:E,transformOrigin:b,TransitionComponent:C,transitionDuration:$,TransitionProps:B}),D=Og(A),z=R.useCallback(()=>{if(g==="anchorPosition")return process.env.NODE_ENV!=="production"&&(d||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),d;const ne=Kn(u),M=ne&&ne.nodeType===1?ne:Te(k.current).body,se=M.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Se=M.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Se.top===0&&Se.left===0&&Se.right===0&&Se.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:se.top+es(se,c.vertical),left:se.left+ts(se,c.horizontal)}},[u,c.horizontal,c.vertical,d,g]),Q=R.useCallback(ne=>({vertical:es(ne,b.vertical),horizontal:ts(ne,b.horizontal)}),[b.horizontal,b.vertical]),te=R.useCallback(ne=>{const M={width:ne.offsetWidth,height:ne.offsetHeight},se=Q(M);if(g==="none")return{top:null,left:null,transformOrigin:ns(se)};const Se=z();let Oe=Se.top-se.vertical,we=Se.left-se.horizontal;const vt=Oe+M.height,_e=we+M.width,Qe=Gt(Kn(u)),De=Qe.innerHeight-v,et=Qe.innerWidth-v;if(v!==null&&Oe<v){const Ce=Oe-v;Oe-=Ce,se.vertical+=Ce}else if(v!==null&&vt>De){const Ce=vt-De;Oe-=Ce,se.vertical+=Ce}if(process.env.NODE_ENV!=="production"&&M.height>De&&M.height&&De&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${M.height-De}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),v!==null&&we<v){const Ce=we-v;we-=Ce,se.horizontal+=Ce}else if(_e>et){const Ce=_e-et;we-=Ce,se.horizontal+=Ce}return{top:`${Math.round(Oe)}px`,left:`${Math.round(we)}px`,transformOrigin:ns(se)}},[u,g,z,Q,v]),[P,L]=R.useState(w),G=R.useCallback(()=>{const ne=k.current;if(!ne)return;const M=te(ne);M.top!==null&&(ne.style.top=M.top),M.left!==null&&(ne.style.left=M.left),ne.style.transformOrigin=M.transformOrigin,L(!0)},[te]);R.useEffect(()=>(F&&window.addEventListener("scroll",G),()=>window.removeEventListener("scroll",G)),[u,F,G]);const K=(ne,M)=>{j&&j(ne,M),G()},H=()=>{L(!1)};R.useEffect(()=>{w&&G()}),R.useImperativeHandle(a,()=>w?{updatePosition:()=>{G()}}:null,[w,G]),R.useEffect(()=>{if(!w)return;const ne=Os(()=>{G()}),M=Gt(u);return M.addEventListener("resize",ne),()=>{ne.clear(),M.removeEventListener("resize",ne)}},[u,w,G]);let U=$;$==="auto"&&!C.muiSupportAuto&&(U=void 0);const W=h||(u?Te(Kn(u)).body:void 0),X=(o=x==null?void 0:x.root)!=null?o:_g,q=(i=x==null?void 0:x.paper)!=null?i:ka,Y=Pt({elementType:q,externalSlotProps:T({},E,{style:P?E.style:T({},E.style,{opacity:0})}),additionalProps:{elevation:m,ref:N},ownerState:A,className:ke(D.paper,E==null?void 0:E.className)}),ee=Pt({elementType:X,externalSlotProps:(S==null?void 0:S.root)||{},externalForwardedProps:_,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:W,open:w},ownerState:A,className:ke(D.root,f)}),{slotProps:ie}=ee,V=fe(ee,Pg);return y.jsx(X,T({},V,!Ls(X)&&{slotProps:ie,disableScrollLock:F},{children:y.jsx(C,T({appear:!0,in:w,onEntering:K,onExited:H,timeout:U},B,{children:y.jsx(q,T({},Y,{children:p}))}))}))});process.env.NODE_ENV!=="production"&&(Ta.propTypes={action:xo,anchorEl:Yt(l.oneOfType([ot,l.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=Kn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:l.shape({horizontal:l.oneOfType([l.oneOf(["center","left","right"]),l.number]).isRequired,vertical:l.oneOfType([l.oneOf(["bottom","center","top"]),l.number]).isRequired}),anchorPosition:l.shape({left:l.number.isRequired,top:l.number.isRequired}),anchorReference:l.oneOf(["anchorEl","anchorPosition","none"]),children:l.node,classes:l.object,className:l.string,container:l.oneOfType([ot,l.func]),disableScrollLock:l.bool,elevation:As,marginThreshold:l.number,onClose:l.func,open:l.bool.isRequired,PaperProps:l.shape({component:su}),slotProps:l.shape({paper:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({paper:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transformOrigin:l.shape({horizontal:l.oneOfType([l.oneOf(["center","left","right"]),l.number]).isRequired,vertical:l.oneOfType([l.oneOf(["bottom","center","top"]),l.number]).isRequired}),TransitionComponent:l.elementType,transitionDuration:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})]),TransitionProps:l.object});const $g=Ta;function Ng(e){return Ze("MuiMenu",e)}gt("MuiMenu",["root","paper","list"]);const Mg=["onEntering"],Ig=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Dg={vertical:"top",horizontal:"right"},Ag={vertical:"top",horizontal:"left"},jg=e=>{const{classes:t}=e;return at({root:["root"],paper:["paper"],list:["list"]},Ng,t)},Fg=Pe($g,{shouldForwardProp:e=>sa(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Vg=Pe(ka,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),Lg=Pe(ig,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Pa=R.forwardRef(function(t,n){var r,o;const i=lt({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:a,className:u,disableAutoFocusItem:c=!1,MenuListProps:d={},onClose:g,open:p,PaperProps:f={},PopoverClasses:h,transitionDuration:m="auto",TransitionProps:{onEntering:v}={},variant:w="selectedMenu",slots:O={},slotProps:x={}}=i,S=fe(i.TransitionProps,Mg),b=fe(i,Ig),C=In(),$=C.direction==="rtl",j=T({},i,{autoFocus:s,disableAutoFocusItem:c,MenuListProps:d,onEntering:v,PaperProps:f,transitionDuration:m,TransitionProps:S,variant:w}),F=jg(j),B=s&&!c&&p,_=R.useRef(null),E=(te,P)=>{_.current&&_.current.adjustStyleForScrollbar(te,C),v&&v(te,P)},k=te=>{te.key==="Tab"&&(te.preventDefault(),g&&g(te,"tabKeyDown"))};let N=-1;R.Children.map(a,(te,P)=>{R.isValidElement(te)&&(process.env.NODE_ENV!=="production"&&Jn.isFragment(te)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),te.props.disabled||(w==="selectedMenu"&&te.props.selected||N===-1)&&(N=P))});const A=(r=O.paper)!=null?r:Vg,D=(o=x.paper)!=null?o:f,z=Pt({elementType:O.root,externalSlotProps:x.root,ownerState:j,className:[F.root,u]}),Q=Pt({elementType:A,externalSlotProps:D,ownerState:j,className:F.paper});return y.jsx(Fg,T({onClose:g,anchorOrigin:{vertical:"bottom",horizontal:$?"right":"left"},transformOrigin:$?Dg:Ag,slots:{paper:A,root:O.root},slotProps:{root:z,paper:Q},open:p,ref:n,transitionDuration:m,TransitionProps:T({onEntering:E},S),ownerState:j},b,{classes:h,children:y.jsx(Lg,T({onKeyDown:k,actions:_,autoFocus:s&&(N===-1||c),autoFocusItem:B,variant:w},d,{className:ke(F.list,d.className),children:a}))}))});process.env.NODE_ENV!=="production"&&(Pa.propTypes={anchorEl:l.oneOfType([ot,l.func]),autoFocus:l.bool,children:l.node,classes:l.object,className:l.string,disableAutoFocusItem:l.bool,MenuListProps:l.object,onClose:l.func,open:l.bool.isRequired,PaperProps:l.object,PopoverClasses:l.object,slotProps:l.shape({paper:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({paper:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transitionDuration:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})]),TransitionProps:l.object,variant:l.oneOf(["menu","selectedMenu"])});const Bg=Pa;function zg({className:e,commandHandler:t,menuDefinition:n,children:r}){var c;const[o,i]=I.useState(void 0),s=I.useCallback(d=>{d.preventDefault(),i(o===void 0?{mouseX:d.clientX+2,mouseY:d.clientY-6}:void 0)},[o]),a=I.useCallback(()=>{i(void 0)},[]),u=I.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((c=n==null?void 0:n.items)==null?void 0:c.length)??0)===0||!r?r:y.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[r,y.jsx(Bg,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:a,anchorReference:"anchorPosition",anchorPosition:u,children:y.jsx(Bo,{menuDefinition:n,commandHandler:t,onClick:a})})]})}const Hg=ga(y.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Gg(e){return{preserveValue:!0,...e}}const ir=(e,t,n={})=>{const r=I.useRef(t);r.current=t;const o=I.useRef(n);o.current=Gg(o.current);const[i,s]=I.useState(()=>r.current),[a,u]=I.useState(!0);return I.useEffect(()=>{let c=!0;return u(!!e),(async()=>{if(e){const d=await e();c&&(s(()=>d),u(!1))}})(),()=>{c=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[i,a]};function Oa({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:i,ariaLabelPrefix:s,children:a}){const[u,c]=I.useState(!1),[d,g]=I.useState(!1),p=I.useCallback(()=>{u&&c(!1),g(!1)},[u]),f=I.useCallback(S=>{S.stopPropagation(),c(b=>{const C=!b;return C&&S.shiftKey?g(!0):C||g(!1),C})},[]),h=I.useCallback(S=>(p(),r(S)),[r,p]),[m,v]=I.useState({top:1,left:1});I.useEffect(()=>{if(u){const S=o==null?void 0:o.current;if(S){const b=S.getBoundingClientRect(),C=window.scrollY,$=window.scrollX,j=b.top+C+S.clientHeight,F=b.left+$;v({top:j,left:F})}}},[u,o]);const[w]=ir(I.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,u]),t),[O]=ir(I.useCallback(async()=>(e==null?void 0:e(!0))??n??w,[e,n,w,u]),n??w),x=d&&O?O:w;return y.jsxs(y.Fragment,{children:[y.jsx(ve.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${i??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:f,children:a??y.jsx(Hg,{})}),y.jsx(ve.Drawer,{className:`papi-menu-drawer ${i??""}`,anchor:"left",variant:"temporary",open:u,onClose:p,PaperProps:{className:"papi-menu-drawer-paper",style:{top:m.top,left:m.left}},children:x?y.jsx(va,{className:i,id:`${s??""} main menu`,commandHandler:h,multiColumnMenu:x}):void 0})]})}function Ug({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:s="medium",className:a,onClick:u,children:c}){return y.jsx(ve.IconButton,{id:e,disabled:n,edge:i,size:s,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${a??""}`,onClick:u,children:c})}const qg=ss.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),_a=I.forwardRef(({className:e,...t},n)=>y.jsx(as.Root,{ref:n,className:ge(qg(),e),...t}));_a.displayName=as.Root.displayName;function kn({id:e,isDisabled:t=!1,hasError:n=!1,helperText:r,label:o,placeholder:i,isRequired:s=!1,className:a,defaultValue:u,value:c,onChange:d,onFocus:g,onBlur:p}){return y.jsxs("div",{className:"pr-inline-grid pr-items-center pr-gap-1.5",children:[y.jsx(_a,{htmlFor:e,className:ge({"pr-text-red-600":n,"pr-hidden":!o}),children:`${o}${s?"*":""}`}),y.jsx(ar,{id:e,disabled:t,placeholder:i,required:s,className:ge(a,{"pr-border-red-600":n}),defaultValue:u,value:c,onChange:d,onFocus:g,onBlur:p}),y.jsx("p",{className:ge({"pr-hidden":!r}),children:r})]})}let Fr;const Vr=()=>(Fr||(Fr=le.allBookIds.map(e=>({bookId:e,label:le.bookIdToEnglishName(e)}))),Fr);function Wg({scrRef:e,handleSubmit:t,id:n}){const r=u=>{t(u)},o=(u,c)=>{const g={bookNum:le.bookIdToNumber(c.bookId),chapterNum:1,verseNum:1};r(g)},i=u=>{t({...e,chapterNum:+u.target.value})},s=u=>{t({...e,verseNum:+u.target.value})},a=I.useMemo(()=>Vr()[e.bookNum-1],[e.bookNum]);return y.jsxs("span",{id:n,className:"pr-flex pr-place-items-center",children:[y.jsx(Yn,{title:"Book",className:"papi-ref-selector book",value:a,options:Vr(),onChange:o,isClearable:!1,width:200}),y.jsx(yt,{onClick:()=>r(Ee.offsetBook(e,-1)),isDisabled:e.bookNum<=Ee.FIRST_SCR_BOOK_NUM,children:"<"}),y.jsx(yt,{onClick:()=>r(Ee.offsetBook(e,1)),isDisabled:e.bookNum>=Vr().length,children:">"}),y.jsx(kn,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),y.jsx(yt,{onClick:()=>t(Ee.offsetChapter(e,-1)),isDisabled:e.chapterNum<=Ee.FIRST_SCR_CHAPTER_NUM,children:"<"}),y.jsx(yt,{onClick:()=>t(Ee.offsetChapter(e,1)),isDisabled:e.chapterNum>=Ee.getChaptersForBook(e.bookNum),children:">"}),y.jsx(kn,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:s}),y.jsx(yt,{onClick:()=>t(Ee.offsetVerse(e,-1)),isDisabled:e.verseNum<=Ee.FIRST_SCR_VERSE_NUM,children:"<"}),y.jsx(yt,{onClick:()=>t(Ee.offsetVerse(e,1)),children:">"})]})}class Xg{constructor(){Nt(this,"listeners",{})}addEventListener(t,n){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(n)}removeEventListener(t,n){var o;const r=(o=this.listeners[t])==null?void 0:o.indexOf(n);r!==void 0&&r!==-1&&this.listeners[t].splice(r,1)}dispatchEvent(t){const n=this.listeners[t.type];n&&n.forEach(r=>r(t))}}class Kg{constructor(t,n,r){Nt(this,"id");Nt(this,"checkDefinition");Nt(this,"data");Nt(this,"resultsUpdated");if(r)this.id=r.id,this.checkDefinition=r;else{if(!n)throw new Error("Either 'id' or 'checkDefinition' must be provided.");this.id=n}this.data=t,this.resultsUpdated=new Xg}updateData(t){this.data=t;const n=new CustomEvent("resultsUpdated",{detail:this});this.resultsUpdated.dispatchEvent(n)}addEventListener(t,n){this.resultsUpdated.addEventListener(t,n)}removeEventListener(t,n){this.resultsUpdated.removeEventListener(t,n)}}/**
   * table-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function pt(e,t){return typeof e=="function"?e(t):e}function Le(e,t){return n=>{t.setState(r=>({...r,[e]:pt(n,r[e])}))}}function wr(e){return e instanceof Function}function Yg(e){return Array.isArray(e)&&e.every(t=>typeof t=="number")}function $a(e,t){const n=[],r=o=>{o.forEach(i=>{n.push(i);const s=t(i);s!=null&&s.length&&r(s)})};return r(e),n}function J(e,t,n){let r=[],o;return i=>{let s;n.key&&n.debug&&(s=Date.now());const a=e(i);if(!(a.length!==r.length||a.some((d,g)=>r[g]!==d)))return o;r=a;let c;if(n.key&&n.debug&&(c=Date.now()),o=t(...a),n==null||n.onChange==null||n.onChange(o),n.key&&n.debug&&n!=null&&n.debug()){const d=Math.round((Date.now()-s)*100)/100,g=Math.round((Date.now()-c)*100)/100,p=g/16,f=(h,m)=>{for(h=String(h);h.length<m;)h=" "+h;return h};console.info(`%c⏱ ${f(g,5)} /${f(d,5)} ms`,`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0,Math.min(120-120*p,120))}deg 100% 31%);`,n==null?void 0:n.key)}return o}}function Z(e,t,n,r){return{debug:()=>{var o;return(o=e==null?void 0:e.debugAll)!=null?o:e[t]},key:process.env.NODE_ENV==="development"&&n,onChange:r}}function Jg(e,t,n,r){const o=()=>{var s;return(s=i.getValue())!=null?s:e.options.renderFallbackValue},i={id:`${t.id}_${n.id}`,row:t,column:n,getValue:()=>t.getValue(r),renderValue:o,getContext:J(()=>[e,n,t,i],(s,a,u,c)=>({table:s,column:a,row:u,cell:c,getValue:c.getValue,renderValue:c.renderValue}),Z(e.options,"debugCells","cell.getContext"))};return e._features.forEach(s=>{s.createCell==null||s.createCell(i,n,t,e)},{}),i}function Zg(e,t,n,r){var o,i;const a={...e._getDefaultColumnDef(),...t},u=a.accessorKey;let c=(o=(i=a.id)!=null?i:u?u.replace(".","_"):void 0)!=null?o:typeof a.header=="string"?a.header:void 0,d;if(a.accessorFn?d=a.accessorFn:u&&(u.includes(".")?d=p=>{let f=p;for(const m of u.split(".")){var h;f=(h=f)==null?void 0:h[m],process.env.NODE_ENV!=="production"&&f===void 0&&console.warn(`"${m}" in deeply nested key "${u}" returned undefined.`)}return f}:d=p=>p[a.accessorKey]),!c)throw process.env.NODE_ENV!=="production"?new Error(a.accessorFn?"Columns require an id when using an accessorFn":"Columns require an id when using a non-string header"):new Error;let g={id:`${String(c)}`,accessorFn:d,parent:r,depth:n,columnDef:a,columns:[],getFlatColumns:J(()=>[!0],()=>{var p;return[g,...(p=g.columns)==null?void 0:p.flatMap(f=>f.getFlatColumns())]},Z(e.options,"debugColumns","column.getFlatColumns")),getLeafColumns:J(()=>[e._getOrderColumnsFn()],p=>{var f;if((f=g.columns)!=null&&f.length){let h=g.columns.flatMap(m=>m.getLeafColumns());return p(h)}return[g]},Z(e.options,"debugColumns","column.getLeafColumns"))};for(const p of e._features)p.createColumn==null||p.createColumn(g,e);return g}const Re="debugHeaders";function rs(e,t,n){var r;let i={id:(r=n.id)!=null?r:t.id,column:t,index:n.index,isPlaceholder:!!n.isPlaceholder,placeholderId:n.placeholderId,depth:n.depth,subHeaders:[],colSpan:0,rowSpan:0,headerGroup:null,getLeafHeaders:()=>{const s=[],a=u=>{u.subHeaders&&u.subHeaders.length&&u.subHeaders.map(a),s.push(u)};return a(i),s},getContext:()=>({table:e,header:i,column:t})};return e._features.forEach(s=>{s.createHeader==null||s.createHeader(i,e)}),i}const Qg={createTable:e=>{e.getHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,o)=>{var i,s;const a=(i=r==null?void 0:r.map(g=>n.find(p=>p.id===g)).filter(Boolean))!=null?i:[],u=(s=o==null?void 0:o.map(g=>n.find(p=>p.id===g)).filter(Boolean))!=null?s:[],c=n.filter(g=>!(r!=null&&r.includes(g.id))&&!(o!=null&&o.includes(g.id)));return Hn(t,[...a,...c,...u],e)},Z(e.options,Re,"getHeaderGroups")),e.getCenterHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,o)=>(n=n.filter(i=>!(r!=null&&r.includes(i.id))&&!(o!=null&&o.includes(i.id))),Hn(t,n,e,"center")),Z(e.options,Re,"getCenterHeaderGroups")),e.getLeftHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left],(t,n,r)=>{var o;const i=(o=r==null?void 0:r.map(s=>n.find(a=>a.id===s)).filter(Boolean))!=null?o:[];return Hn(t,i,e,"left")},Z(e.options,Re,"getLeftHeaderGroups")),e.getRightHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.right],(t,n,r)=>{var o;const i=(o=r==null?void 0:r.map(s=>n.find(a=>a.id===s)).filter(Boolean))!=null?o:[];return Hn(t,i,e,"right")},Z(e.options,Re,"getRightHeaderGroups")),e.getFooterGroups=J(()=>[e.getHeaderGroups()],t=>[...t].reverse(),Z(e.options,Re,"getFooterGroups")),e.getLeftFooterGroups=J(()=>[e.getLeftHeaderGroups()],t=>[...t].reverse(),Z(e.options,Re,"getLeftFooterGroups")),e.getCenterFooterGroups=J(()=>[e.getCenterHeaderGroups()],t=>[...t].reverse(),Z(e.options,Re,"getCenterFooterGroups")),e.getRightFooterGroups=J(()=>[e.getRightHeaderGroups()],t=>[...t].reverse(),Z(e.options,Re,"getRightFooterGroups")),e.getFlatHeaders=J(()=>[e.getHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,Re,"getFlatHeaders")),e.getLeftFlatHeaders=J(()=>[e.getLeftHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,Re,"getLeftFlatHeaders")),e.getCenterFlatHeaders=J(()=>[e.getCenterHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,Re,"getCenterFlatHeaders")),e.getRightFlatHeaders=J(()=>[e.getRightHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,Re,"getRightFlatHeaders")),e.getCenterLeafHeaders=J(()=>[e.getCenterFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),Z(e.options,Re,"getCenterLeafHeaders")),e.getLeftLeafHeaders=J(()=>[e.getLeftFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),Z(e.options,Re,"getLeftLeafHeaders")),e.getRightLeafHeaders=J(()=>[e.getRightFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),Z(e.options,Re,"getRightLeafHeaders")),e.getLeafHeaders=J(()=>[e.getLeftHeaderGroups(),e.getCenterHeaderGroups(),e.getRightHeaderGroups()],(t,n,r)=>{var o,i,s,a,u,c;return[...(o=(i=t[0])==null?void 0:i.headers)!=null?o:[],...(s=(a=n[0])==null?void 0:a.headers)!=null?s:[],...(u=(c=r[0])==null?void 0:c.headers)!=null?u:[]].map(d=>d.getLeafHeaders()).flat()},Z(e.options,Re,"getLeafHeaders"))}};function Hn(e,t,n,r){var o,i;let s=0;const a=function(p,f){f===void 0&&(f=1),s=Math.max(s,f),p.filter(h=>h.getIsVisible()).forEach(h=>{var m;(m=h.columns)!=null&&m.length&&a(h.columns,f+1)},0)};a(e);let u=[];const c=(p,f)=>{const h={depth:f,id:[r,`${f}`].filter(Boolean).join("_"),headers:[]},m=[];p.forEach(v=>{const w=[...m].reverse()[0],O=v.column.depth===h.depth;let x,S=!1;if(O&&v.column.parent?x=v.column.parent:(x=v.column,S=!0),w&&(w==null?void 0:w.column)===x)w.subHeaders.push(v);else{const b=rs(n,x,{id:[r,f,x.id,v==null?void 0:v.id].filter(Boolean).join("_"),isPlaceholder:S,placeholderId:S?`${m.filter(C=>C.column===x).length}`:void 0,depth:f,index:m.length});b.subHeaders.push(v),m.push(b)}h.headers.push(v),v.headerGroup=h}),u.push(h),f>0&&c(m,f-1)},d=t.map((p,f)=>rs(n,p,{depth:s,index:f}));c(d,s-1),u.reverse();const g=p=>p.filter(h=>h.column.getIsVisible()).map(h=>{let m=0,v=0,w=[0];h.subHeaders&&h.subHeaders.length?(w=[],g(h.subHeaders).forEach(x=>{let{colSpan:S,rowSpan:b}=x;m+=S,w.push(b)})):m=1;const O=Math.min(...w);return v=v+O,h.colSpan=m,h.rowSpan=v,{colSpan:m,rowSpan:v}});return g((o=(i=u[0])==null?void 0:i.headers)!=null?o:[]),u}const Na=(e,t,n,r,o,i,s)=>{let a={id:t,index:r,original:n,depth:o,parentId:s,_valuesCache:{},_uniqueValuesCache:{},getValue:u=>{if(a._valuesCache.hasOwnProperty(u))return a._valuesCache[u];const c=e.getColumn(u);if(c!=null&&c.accessorFn)return a._valuesCache[u]=c.accessorFn(a.original,r),a._valuesCache[u]},getUniqueValues:u=>{if(a._uniqueValuesCache.hasOwnProperty(u))return a._uniqueValuesCache[u];const c=e.getColumn(u);if(c!=null&&c.accessorFn)return c.columnDef.getUniqueValues?(a._uniqueValuesCache[u]=c.columnDef.getUniqueValues(a.original,r),a._uniqueValuesCache[u]):(a._uniqueValuesCache[u]=[a.getValue(u)],a._uniqueValuesCache[u])},renderValue:u=>{var c;return(c=a.getValue(u))!=null?c:e.options.renderFallbackValue},subRows:i??[],getLeafRows:()=>$a(a.subRows,u=>u.subRows),getParentRow:()=>a.parentId?e.getRow(a.parentId,!0):void 0,getParentRows:()=>{let u=[],c=a;for(;;){const d=c.getParentRow();if(!d)break;u.push(d),c=d}return u.reverse()},getAllCells:J(()=>[e.getAllLeafColumns()],u=>u.map(c=>Jg(e,a,c,c.id)),Z(e.options,"debugRows","getAllCells")),_getAllCellsByColumnId:J(()=>[a.getAllCells()],u=>u.reduce((c,d)=>(c[d.column.id]=d,c),{}),Z(e.options,"debugRows","getAllCellsByColumnId"))};for(let u=0;u<e._features.length;u++){const c=e._features[u];c==null||c.createRow==null||c.createRow(a,e)}return a},em={createColumn:(e,t)=>{e._getFacetedRowModel=t.options.getFacetedRowModel&&t.options.getFacetedRowModel(t,e.id),e.getFacetedRowModel=()=>e._getFacetedRowModel?e._getFacetedRowModel():t.getPreFilteredRowModel(),e._getFacetedUniqueValues=t.options.getFacetedUniqueValues&&t.options.getFacetedUniqueValues(t,e.id),e.getFacetedUniqueValues=()=>e._getFacetedUniqueValues?e._getFacetedUniqueValues():new Map,e._getFacetedMinMaxValues=t.options.getFacetedMinMaxValues&&t.options.getFacetedMinMaxValues(t,e.id),e.getFacetedMinMaxValues=()=>{if(e._getFacetedMinMaxValues)return e._getFacetedMinMaxValues()}}},Ma=(e,t,n)=>{var r;const o=n.toLowerCase();return!!(!((r=e.getValue(t))==null||(r=r.toString())==null||(r=r.toLowerCase())==null)&&r.includes(o))};Ma.autoRemove=e=>Xe(e);const Ia=(e,t,n)=>{var r;return!!(!((r=e.getValue(t))==null||(r=r.toString())==null)&&r.includes(n))};Ia.autoRemove=e=>Xe(e);const Da=(e,t,n)=>{var r;return((r=e.getValue(t))==null||(r=r.toString())==null?void 0:r.toLowerCase())===(n==null?void 0:n.toLowerCase())};Da.autoRemove=e=>Xe(e);const Aa=(e,t,n)=>{var r;return(r=e.getValue(t))==null?void 0:r.includes(n)};Aa.autoRemove=e=>Xe(e)||!(e!=null&&e.length);const ja=(e,t,n)=>!n.some(r=>{var o;return!((o=e.getValue(t))!=null&&o.includes(r))});ja.autoRemove=e=>Xe(e)||!(e!=null&&e.length);const Fa=(e,t,n)=>n.some(r=>{var o;return(o=e.getValue(t))==null?void 0:o.includes(r)});Fa.autoRemove=e=>Xe(e)||!(e!=null&&e.length);const Va=(e,t,n)=>e.getValue(t)===n;Va.autoRemove=e=>Xe(e);const La=(e,t,n)=>e.getValue(t)==n;La.autoRemove=e=>Xe(e);const zo=(e,t,n)=>{let[r,o]=n;const i=e.getValue(t);return i>=r&&i<=o};zo.resolveFilterValue=e=>{let[t,n]=e,r=typeof t!="number"?parseFloat(t):t,o=typeof n!="number"?parseFloat(n):n,i=t===null||Number.isNaN(r)?-1/0:r,s=n===null||Number.isNaN(o)?1/0:o;if(i>s){const a=i;i=s,s=a}return[i,s]};zo.autoRemove=e=>Xe(e)||Xe(e[0])&&Xe(e[1]);const nt={includesString:Ma,includesStringSensitive:Ia,equalsString:Da,arrIncludes:Aa,arrIncludesAll:ja,arrIncludesSome:Fa,equals:Va,weakEquals:La,inNumberRange:zo};function Xe(e){return e==null||e===""}const tm={getDefaultColumnDef:()=>({filterFn:"auto"}),getInitialState:e=>({columnFilters:[],...e}),getDefaultOptions:e=>({onColumnFiltersChange:Le("columnFilters",e),filterFromLeafRows:!1,maxLeafRowFilterDepth:100}),createColumn:(e,t)=>{e.getAutoFilterFn=()=>{const n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);return typeof r=="string"?nt.includesString:typeof r=="number"?nt.inNumberRange:typeof r=="boolean"||r!==null&&typeof r=="object"?nt.equals:Array.isArray(r)?nt.arrIncludes:nt.weakEquals},e.getFilterFn=()=>{var n,r;return wr(e.columnDef.filterFn)?e.columnDef.filterFn:e.columnDef.filterFn==="auto"?e.getAutoFilterFn():(n=(r=t.options.filterFns)==null?void 0:r[e.columnDef.filterFn])!=null?n:nt[e.columnDef.filterFn]},e.getCanFilter=()=>{var n,r,o;return((n=e.columnDef.enableColumnFilter)!=null?n:!0)&&((r=t.options.enableColumnFilters)!=null?r:!0)&&((o=t.options.enableFilters)!=null?o:!0)&&!!e.accessorFn},e.getIsFiltered=()=>e.getFilterIndex()>-1,e.getFilterValue=()=>{var n;return(n=t.getState().columnFilters)==null||(n=n.find(r=>r.id===e.id))==null?void 0:n.value},e.getFilterIndex=()=>{var n,r;return(n=(r=t.getState().columnFilters)==null?void 0:r.findIndex(o=>o.id===e.id))!=null?n:-1},e.setFilterValue=n=>{t.setColumnFilters(r=>{const o=e.getFilterFn(),i=r==null?void 0:r.find(d=>d.id===e.id),s=pt(n,i?i.value:void 0);if(os(o,s,e)){var a;return(a=r==null?void 0:r.filter(d=>d.id!==e.id))!=null?a:[]}const u={id:e.id,value:s};if(i){var c;return(c=r==null?void 0:r.map(d=>d.id===e.id?u:d))!=null?c:[]}return r!=null&&r.length?[...r,u]:[u]})}},createRow:(e,t)=>{e.columnFilters={},e.columnFiltersMeta={}},createTable:e=>{e.setColumnFilters=t=>{const n=e.getAllLeafColumns(),r=o=>{var i;return(i=pt(t,o))==null?void 0:i.filter(s=>{const a=n.find(u=>u.id===s.id);if(a){const u=a.getFilterFn();if(os(u,s.value,a))return!1}return!0})};e.options.onColumnFiltersChange==null||e.options.onColumnFiltersChange(r)},e.resetColumnFilters=t=>{var n,r;e.setColumnFilters(t?[]:(n=(r=e.initialState)==null?void 0:r.columnFilters)!=null?n:[])},e.getPreFilteredRowModel=()=>e.getCoreRowModel(),e.getFilteredRowModel=()=>(!e._getFilteredRowModel&&e.options.getFilteredRowModel&&(e._getFilteredRowModel=e.options.getFilteredRowModel(e)),e.options.manualFiltering||!e._getFilteredRowModel?e.getPreFilteredRowModel():e._getFilteredRowModel())}};function os(e,t,n){return(e&&e.autoRemove?e.autoRemove(t,n):!1)||typeof t>"u"||typeof t=="string"&&!t}const nm=(e,t,n)=>n.reduce((r,o)=>{const i=o.getValue(e);return r+(typeof i=="number"?i:0)},0),rm=(e,t,n)=>{let r;return n.forEach(o=>{const i=o.getValue(e);i!=null&&(r>i||r===void 0&&i>=i)&&(r=i)}),r},om=(e,t,n)=>{let r;return n.forEach(o=>{const i=o.getValue(e);i!=null&&(r<i||r===void 0&&i>=i)&&(r=i)}),r},im=(e,t,n)=>{let r,o;return n.forEach(i=>{const s=i.getValue(e);s!=null&&(r===void 0?s>=s&&(r=o=s):(r>s&&(r=s),o<s&&(o=s)))}),[r,o]},sm=(e,t)=>{let n=0,r=0;if(t.forEach(o=>{let i=o.getValue(e);i!=null&&(i=+i)>=i&&(++n,r+=i)}),n)return r/n},am=(e,t)=>{if(!t.length)return;const n=t.map(i=>i.getValue(e));if(!Yg(n))return;if(n.length===1)return n[0];const r=Math.floor(n.length/2),o=n.sort((i,s)=>i-s);return n.length%2!==0?o[r]:(o[r-1]+o[r])/2},lm=(e,t)=>Array.from(new Set(t.map(n=>n.getValue(e))).values()),um=(e,t)=>new Set(t.map(n=>n.getValue(e))).size,cm=(e,t)=>t.length,Lr={sum:nm,min:rm,max:om,extent:im,mean:sm,median:am,unique:lm,uniqueCount:um,count:cm},dm={getDefaultColumnDef:()=>({aggregatedCell:e=>{var t,n;return(t=(n=e.getValue())==null||n.toString==null?void 0:n.toString())!=null?t:null},aggregationFn:"auto"}),getInitialState:e=>({grouping:[],...e}),getDefaultOptions:e=>({onGroupingChange:Le("grouping",e),groupedColumnMode:"reorder"}),createColumn:(e,t)=>{e.toggleGrouping=()=>{t.setGrouping(n=>n!=null&&n.includes(e.id)?n.filter(r=>r!==e.id):[...n??[],e.id])},e.getCanGroup=()=>{var n,r;return((n=e.columnDef.enableGrouping)!=null?n:!0)&&((r=t.options.enableGrouping)!=null?r:!0)&&(!!e.accessorFn||!!e.columnDef.getGroupingValue)},e.getIsGrouped=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.includes(e.id)},e.getGroupedIndex=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.indexOf(e.id)},e.getToggleGroupingHandler=()=>{const n=e.getCanGroup();return()=>{n&&e.toggleGrouping()}},e.getAutoAggregationFn=()=>{const n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);if(typeof r=="number")return Lr.sum;if(Object.prototype.toString.call(r)==="[object Date]")return Lr.extent},e.getAggregationFn=()=>{var n,r;if(!e)throw new Error;return wr(e.columnDef.aggregationFn)?e.columnDef.aggregationFn:e.columnDef.aggregationFn==="auto"?e.getAutoAggregationFn():(n=(r=t.options.aggregationFns)==null?void 0:r[e.columnDef.aggregationFn])!=null?n:Lr[e.columnDef.aggregationFn]}},createTable:e=>{e.setGrouping=t=>e.options.onGroupingChange==null?void 0:e.options.onGroupingChange(t),e.resetGrouping=t=>{var n,r;e.setGrouping(t?[]:(n=(r=e.initialState)==null?void 0:r.grouping)!=null?n:[])},e.getPreGroupedRowModel=()=>e.getFilteredRowModel(),e.getGroupedRowModel=()=>(!e._getGroupedRowModel&&e.options.getGroupedRowModel&&(e._getGroupedRowModel=e.options.getGroupedRowModel(e)),e.options.manualGrouping||!e._getGroupedRowModel?e.getPreGroupedRowModel():e._getGroupedRowModel())},createRow:(e,t)=>{e.getIsGrouped=()=>!!e.groupingColumnId,e.getGroupingValue=n=>{if(e._groupingValuesCache.hasOwnProperty(n))return e._groupingValuesCache[n];const r=t.getColumn(n);return r!=null&&r.columnDef.getGroupingValue?(e._groupingValuesCache[n]=r.columnDef.getGroupingValue(e.original),e._groupingValuesCache[n]):e.getValue(n)},e._groupingValuesCache={}},createCell:(e,t,n,r)=>{e.getIsGrouped=()=>t.getIsGrouped()&&t.id===n.groupingColumnId,e.getIsPlaceholder=()=>!e.getIsGrouped()&&t.getIsGrouped(),e.getIsAggregated=()=>{var o;return!e.getIsGrouped()&&!e.getIsPlaceholder()&&!!((o=n.subRows)!=null&&o.length)}}};function pm(e,t,n){if(!(t!=null&&t.length)||!n)return e;const r=e.filter(i=>!t.includes(i.id));return n==="remove"?r:[...t.map(i=>e.find(s=>s.id===i)).filter(Boolean),...r]}const fm={getInitialState:e=>({columnOrder:[],...e}),getDefaultOptions:e=>({onColumnOrderChange:Le("columnOrder",e)}),createColumn:(e,t)=>{e.getIndex=J(n=>[wn(t,n)],n=>n.findIndex(r=>r.id===e.id),Z(t.options,"debugColumns","getIndex")),e.getIsFirstColumn=n=>{var r;return((r=wn(t,n)[0])==null?void 0:r.id)===e.id},e.getIsLastColumn=n=>{var r;const o=wn(t,n);return((r=o[o.length-1])==null?void 0:r.id)===e.id}},createTable:e=>{e.setColumnOrder=t=>e.options.onColumnOrderChange==null?void 0:e.options.onColumnOrderChange(t),e.resetColumnOrder=t=>{var n;e.setColumnOrder(t?[]:(n=e.initialState.columnOrder)!=null?n:[])},e._getOrderColumnsFn=J(()=>[e.getState().columnOrder,e.getState().grouping,e.options.groupedColumnMode],(t,n,r)=>o=>{let i=[];if(!(t!=null&&t.length))i=o;else{const s=[...t],a=[...o];for(;a.length&&s.length;){const u=s.shift(),c=a.findIndex(d=>d.id===u);c>-1&&i.push(a.splice(c,1)[0])}i=[...i,...a]}return pm(i,n,r)},Z(e.options,"debugTable","_getOrderColumnsFn"))}},Br=()=>({left:[],right:[]}),gm={getInitialState:e=>({columnPinning:Br(),...e}),getDefaultOptions:e=>({onColumnPinningChange:Le("columnPinning",e)}),createColumn:(e,t)=>{e.pin=n=>{const r=e.getLeafColumns().map(o=>o.id).filter(Boolean);t.setColumnPinning(o=>{var i,s;if(n==="right"){var a,u;return{left:((a=o==null?void 0:o.left)!=null?a:[]).filter(g=>!(r!=null&&r.includes(g))),right:[...((u=o==null?void 0:o.right)!=null?u:[]).filter(g=>!(r!=null&&r.includes(g))),...r]}}if(n==="left"){var c,d;return{left:[...((c=o==null?void 0:o.left)!=null?c:[]).filter(g=>!(r!=null&&r.includes(g))),...r],right:((d=o==null?void 0:o.right)!=null?d:[]).filter(g=>!(r!=null&&r.includes(g)))}}return{left:((i=o==null?void 0:o.left)!=null?i:[]).filter(g=>!(r!=null&&r.includes(g))),right:((s=o==null?void 0:o.right)!=null?s:[]).filter(g=>!(r!=null&&r.includes(g)))}})},e.getCanPin=()=>e.getLeafColumns().some(r=>{var o,i,s;return((o=r.columnDef.enablePinning)!=null?o:!0)&&((i=(s=t.options.enableColumnPinning)!=null?s:t.options.enablePinning)!=null?i:!0)}),e.getIsPinned=()=>{const n=e.getLeafColumns().map(a=>a.id),{left:r,right:o}=t.getState().columnPinning,i=n.some(a=>r==null?void 0:r.includes(a)),s=n.some(a=>o==null?void 0:o.includes(a));return i?"left":s?"right":!1},e.getPinnedIndex=()=>{var n,r;const o=e.getIsPinned();return o?(n=(r=t.getState().columnPinning)==null||(r=r[o])==null?void 0:r.indexOf(e.id))!=null?n:-1:0}},createRow:(e,t)=>{e.getCenterVisibleCells=J(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left,t.getState().columnPinning.right],(n,r,o)=>{const i=[...r??[],...o??[]];return n.filter(s=>!i.includes(s.column.id))},Z(t.options,"debugRows","getCenterVisibleCells")),e.getLeftVisibleCells=J(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left],(n,r)=>(r??[]).map(i=>n.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"left"})),Z(t.options,"debugRows","getLeftVisibleCells")),e.getRightVisibleCells=J(()=>[e._getAllVisibleCells(),t.getState().columnPinning.right],(n,r)=>(r??[]).map(i=>n.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"right"})),Z(t.options,"debugRows","getRightVisibleCells"))},createTable:e=>{e.setColumnPinning=t=>e.options.onColumnPinningChange==null?void 0:e.options.onColumnPinningChange(t),e.resetColumnPinning=t=>{var n,r;return e.setColumnPinning(t?Br():(n=(r=e.initialState)==null?void 0:r.columnPinning)!=null?n:Br())},e.getIsSomeColumnsPinned=t=>{var n;const r=e.getState().columnPinning;if(!t){var o,i;return!!((o=r.left)!=null&&o.length||(i=r.right)!=null&&i.length)}return!!((n=r[t])!=null&&n.length)},e.getLeftLeafColumns=J(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left],(t,n)=>(n??[]).map(r=>t.find(o=>o.id===r)).filter(Boolean),Z(e.options,"debugColumns","getLeftLeafColumns")),e.getRightLeafColumns=J(()=>[e.getAllLeafColumns(),e.getState().columnPinning.right],(t,n)=>(n??[]).map(r=>t.find(o=>o.id===r)).filter(Boolean),Z(e.options,"debugColumns","getRightLeafColumns")),e.getCenterLeafColumns=J(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r)=>{const o=[...n??[],...r??[]];return t.filter(i=>!o.includes(i.id))},Z(e.options,"debugColumns","getCenterLeafColumns"))}},Gn={size:150,minSize:20,maxSize:Number.MAX_SAFE_INTEGER},zr=()=>({startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,isResizingColumn:!1,columnSizingStart:[]}),mm={getDefaultColumnDef:()=>Gn,getInitialState:e=>({columnSizing:{},columnSizingInfo:zr(),...e}),getDefaultOptions:e=>({columnResizeMode:"onEnd",columnResizeDirection:"ltr",onColumnSizingChange:Le("columnSizing",e),onColumnSizingInfoChange:Le("columnSizingInfo",e)}),createColumn:(e,t)=>{e.getSize=()=>{var n,r,o;const i=t.getState().columnSizing[e.id];return Math.min(Math.max((n=e.columnDef.minSize)!=null?n:Gn.minSize,(r=i??e.columnDef.size)!=null?r:Gn.size),(o=e.columnDef.maxSize)!=null?o:Gn.maxSize)},e.getStart=J(n=>[n,wn(t,n),t.getState().columnSizing],(n,r)=>r.slice(0,e.getIndex(n)).reduce((o,i)=>o+i.getSize(),0),Z(t.options,"debugColumns","getStart")),e.getAfter=J(n=>[n,wn(t,n),t.getState().columnSizing],(n,r)=>r.slice(e.getIndex(n)+1).reduce((o,i)=>o+i.getSize(),0),Z(t.options,"debugColumns","getAfter")),e.resetSize=()=>{t.setColumnSizing(n=>{let{[e.id]:r,...o}=n;return o})},e.getCanResize=()=>{var n,r;return((n=e.columnDef.enableResizing)!=null?n:!0)&&((r=t.options.enableColumnResizing)!=null?r:!0)},e.getIsResizing=()=>t.getState().columnSizingInfo.isResizingColumn===e.id},createHeader:(e,t)=>{e.getSize=()=>{let n=0;const r=o=>{if(o.subHeaders.length)o.subHeaders.forEach(r);else{var i;n+=(i=o.column.getSize())!=null?i:0}};return r(e),n},e.getStart=()=>{if(e.index>0){const n=e.headerGroup.headers[e.index-1];return n.getStart()+n.getSize()}return 0},e.getResizeHandler=n=>{const r=t.getColumn(e.column.id),o=r==null?void 0:r.getCanResize();return i=>{if(!r||!o||(i.persist==null||i.persist(),Hr(i)&&i.touches&&i.touches.length>1))return;const s=e.getSize(),a=e?e.getLeafHeaders().map(w=>[w.column.id,w.column.getSize()]):[[r.id,r.getSize()]],u=Hr(i)?Math.round(i.touches[0].clientX):i.clientX,c={},d=(w,O)=>{typeof O=="number"&&(t.setColumnSizingInfo(x=>{var S,b;const C=t.options.columnResizeDirection==="rtl"?-1:1,$=(O-((S=x==null?void 0:x.startOffset)!=null?S:0))*C,j=Math.max($/((b=x==null?void 0:x.startSize)!=null?b:0),-.999999);return x.columnSizingStart.forEach(F=>{let[B,_]=F;c[B]=Math.round(Math.max(_+_*j,0)*100)/100}),{...x,deltaOffset:$,deltaPercentage:j}}),(t.options.columnResizeMode==="onChange"||w==="end")&&t.setColumnSizing(x=>({...x,...c})))},g=w=>d("move",w),p=w=>{d("end",w),t.setColumnSizingInfo(O=>({...O,isResizingColumn:!1,startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,columnSizingStart:[]}))},f=n||typeof document<"u"?document:null,h={moveHandler:w=>g(w.clientX),upHandler:w=>{f==null||f.removeEventListener("mousemove",h.moveHandler),f==null||f.removeEventListener("mouseup",h.upHandler),p(w.clientX)}},m={moveHandler:w=>(w.cancelable&&(w.preventDefault(),w.stopPropagation()),g(w.touches[0].clientX),!1),upHandler:w=>{var O;f==null||f.removeEventListener("touchmove",m.moveHandler),f==null||f.removeEventListener("touchend",m.upHandler),w.cancelable&&(w.preventDefault(),w.stopPropagation()),p((O=w.touches[0])==null?void 0:O.clientX)}},v=hm()?{passive:!1}:!1;Hr(i)?(f==null||f.addEventListener("touchmove",m.moveHandler,v),f==null||f.addEventListener("touchend",m.upHandler,v)):(f==null||f.addEventListener("mousemove",h.moveHandler,v),f==null||f.addEventListener("mouseup",h.upHandler,v)),t.setColumnSizingInfo(w=>({...w,startOffset:u,startSize:s,deltaOffset:0,deltaPercentage:0,columnSizingStart:a,isResizingColumn:r.id}))}}},createTable:e=>{e.setColumnSizing=t=>e.options.onColumnSizingChange==null?void 0:e.options.onColumnSizingChange(t),e.setColumnSizingInfo=t=>e.options.onColumnSizingInfoChange==null?void 0:e.options.onColumnSizingInfoChange(t),e.resetColumnSizing=t=>{var n;e.setColumnSizing(t?{}:(n=e.initialState.columnSizing)!=null?n:{})},e.resetHeaderSizeInfo=t=>{var n;e.setColumnSizingInfo(t?zr():(n=e.initialState.columnSizingInfo)!=null?n:zr())},e.getTotalSize=()=>{var t,n;return(t=(n=e.getHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getLeftTotalSize=()=>{var t,n;return(t=(n=e.getLeftHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getCenterTotalSize=()=>{var t,n;return(t=(n=e.getCenterHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getRightTotalSize=()=>{var t,n;return(t=(n=e.getRightHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0}}};let Un=null;function hm(){if(typeof Un=="boolean")return Un;let e=!1;try{const t={get passive(){return e=!0,!1}},n=()=>{};window.addEventListener("test",n,t),window.removeEventListener("test",n)}catch{e=!1}return Un=e,Un}function Hr(e){return e.type==="touchstart"}const vm={getInitialState:e=>({columnVisibility:{},...e}),getDefaultOptions:e=>({onColumnVisibilityChange:Le("columnVisibility",e)}),createColumn:(e,t)=>{e.toggleVisibility=n=>{e.getCanHide()&&t.setColumnVisibility(r=>({...r,[e.id]:n??!e.getIsVisible()}))},e.getIsVisible=()=>{var n,r;const o=e.columns;return(n=o.length?o.some(i=>i.getIsVisible()):(r=t.getState().columnVisibility)==null?void 0:r[e.id])!=null?n:!0},e.getCanHide=()=>{var n,r;return((n=e.columnDef.enableHiding)!=null?n:!0)&&((r=t.options.enableHiding)!=null?r:!0)},e.getToggleVisibilityHandler=()=>n=>{e.toggleVisibility==null||e.toggleVisibility(n.target.checked)}},createRow:(e,t)=>{e._getAllVisibleCells=J(()=>[e.getAllCells(),t.getState().columnVisibility],n=>n.filter(r=>r.column.getIsVisible()),Z(t.options,"debugRows","_getAllVisibleCells")),e.getVisibleCells=J(()=>[e.getLeftVisibleCells(),e.getCenterVisibleCells(),e.getRightVisibleCells()],(n,r,o)=>[...n,...r,...o],Z(t.options,"debugRows","getVisibleCells"))},createTable:e=>{const t=(n,r)=>J(()=>[r(),r().filter(o=>o.getIsVisible()).map(o=>o.id).join("_")],o=>o.filter(i=>i.getIsVisible==null?void 0:i.getIsVisible()),Z(e.options,"debugColumns",n));e.getVisibleFlatColumns=t("getVisibleFlatColumns",()=>e.getAllFlatColumns()),e.getVisibleLeafColumns=t("getVisibleLeafColumns",()=>e.getAllLeafColumns()),e.getLeftVisibleLeafColumns=t("getLeftVisibleLeafColumns",()=>e.getLeftLeafColumns()),e.getRightVisibleLeafColumns=t("getRightVisibleLeafColumns",()=>e.getRightLeafColumns()),e.getCenterVisibleLeafColumns=t("getCenterVisibleLeafColumns",()=>e.getCenterLeafColumns()),e.setColumnVisibility=n=>e.options.onColumnVisibilityChange==null?void 0:e.options.onColumnVisibilityChange(n),e.resetColumnVisibility=n=>{var r;e.setColumnVisibility(n?{}:(r=e.initialState.columnVisibility)!=null?r:{})},e.toggleAllColumnsVisible=n=>{var r;n=(r=n)!=null?r:!e.getIsAllColumnsVisible(),e.setColumnVisibility(e.getAllLeafColumns().reduce((o,i)=>({...o,[i.id]:n||!(i.getCanHide!=null&&i.getCanHide())}),{}))},e.getIsAllColumnsVisible=()=>!e.getAllLeafColumns().some(n=>!(n.getIsVisible!=null&&n.getIsVisible())),e.getIsSomeColumnsVisible=()=>e.getAllLeafColumns().some(n=>n.getIsVisible==null?void 0:n.getIsVisible()),e.getToggleAllColumnsVisibilityHandler=()=>n=>{var r;e.toggleAllColumnsVisible((r=n.target)==null?void 0:r.checked)}}};function wn(e,t){return t?t==="center"?e.getCenterVisibleLeafColumns():t==="left"?e.getLeftVisibleLeafColumns():e.getRightVisibleLeafColumns():e.getVisibleLeafColumns()}const bm={createTable:e=>{e._getGlobalFacetedRowModel=e.options.getFacetedRowModel&&e.options.getFacetedRowModel(e,"__global__"),e.getGlobalFacetedRowModel=()=>e.options.manualFiltering||!e._getGlobalFacetedRowModel?e.getPreFilteredRowModel():e._getGlobalFacetedRowModel(),e._getGlobalFacetedUniqueValues=e.options.getFacetedUniqueValues&&e.options.getFacetedUniqueValues(e,"__global__"),e.getGlobalFacetedUniqueValues=()=>e._getGlobalFacetedUniqueValues?e._getGlobalFacetedUniqueValues():new Map,e._getGlobalFacetedMinMaxValues=e.options.getFacetedMinMaxValues&&e.options.getFacetedMinMaxValues(e,"__global__"),e.getGlobalFacetedMinMaxValues=()=>{if(e._getGlobalFacetedMinMaxValues)return e._getGlobalFacetedMinMaxValues()}}},ym={getInitialState:e=>({globalFilter:void 0,...e}),getDefaultOptions:e=>({onGlobalFilterChange:Le("globalFilter",e),globalFilterFn:"auto",getColumnCanGlobalFilter:t=>{var n;const r=(n=e.getCoreRowModel().flatRows[0])==null||(n=n._getAllCellsByColumnId()[t.id])==null?void 0:n.getValue();return typeof r=="string"||typeof r=="number"}}),createColumn:(e,t)=>{e.getCanGlobalFilter=()=>{var n,r,o,i;return((n=e.columnDef.enableGlobalFilter)!=null?n:!0)&&((r=t.options.enableGlobalFilter)!=null?r:!0)&&((o=t.options.enableFilters)!=null?o:!0)&&((i=t.options.getColumnCanGlobalFilter==null?void 0:t.options.getColumnCanGlobalFilter(e))!=null?i:!0)&&!!e.accessorFn}},createTable:e=>{e.getGlobalAutoFilterFn=()=>nt.includesString,e.getGlobalFilterFn=()=>{var t,n;const{globalFilterFn:r}=e.options;return wr(r)?r:r==="auto"?e.getGlobalAutoFilterFn():(t=(n=e.options.filterFns)==null?void 0:n[r])!=null?t:nt[r]},e.setGlobalFilter=t=>{e.options.onGlobalFilterChange==null||e.options.onGlobalFilterChange(t)},e.resetGlobalFilter=t=>{e.setGlobalFilter(t?void 0:e.initialState.globalFilter)}}},wm={getInitialState:e=>({expanded:{},...e}),getDefaultOptions:e=>({onExpandedChange:Le("expanded",e),paginateExpandedRows:!0}),createTable:e=>{let t=!1,n=!1;e._autoResetExpanded=()=>{var r,o;if(!t){e._queue(()=>{t=!0});return}if((r=(o=e.options.autoResetAll)!=null?o:e.options.autoResetExpanded)!=null?r:!e.options.manualExpanding){if(n)return;n=!0,e._queue(()=>{e.resetExpanded(),n=!1})}},e.setExpanded=r=>e.options.onExpandedChange==null?void 0:e.options.onExpandedChange(r),e.toggleAllRowsExpanded=r=>{r??!e.getIsAllRowsExpanded()?e.setExpanded(!0):e.setExpanded({})},e.resetExpanded=r=>{var o,i;e.setExpanded(r?{}:(o=(i=e.initialState)==null?void 0:i.expanded)!=null?o:{})},e.getCanSomeRowsExpand=()=>e.getPrePaginationRowModel().flatRows.some(r=>r.getCanExpand()),e.getToggleAllRowsExpandedHandler=()=>r=>{r.persist==null||r.persist(),e.toggleAllRowsExpanded()},e.getIsSomeRowsExpanded=()=>{const r=e.getState().expanded;return r===!0||Object.values(r).some(Boolean)},e.getIsAllRowsExpanded=()=>{const r=e.getState().expanded;return typeof r=="boolean"?r===!0:!(!Object.keys(r).length||e.getRowModel().flatRows.some(o=>!o.getIsExpanded()))},e.getExpandedDepth=()=>{let r=0;return(e.getState().expanded===!0?Object.keys(e.getRowModel().rowsById):Object.keys(e.getState().expanded)).forEach(i=>{const s=i.split(".");r=Math.max(r,s.length)}),r},e.getPreExpandedRowModel=()=>e.getSortedRowModel(),e.getExpandedRowModel=()=>(!e._getExpandedRowModel&&e.options.getExpandedRowModel&&(e._getExpandedRowModel=e.options.getExpandedRowModel(e)),e.options.manualExpanding||!e._getExpandedRowModel?e.getPreExpandedRowModel():e._getExpandedRowModel())},createRow:(e,t)=>{e.toggleExpanded=n=>{t.setExpanded(r=>{var o;const i=r===!0?!0:!!(r!=null&&r[e.id]);let s={};if(r===!0?Object.keys(t.getRowModel().rowsById).forEach(a=>{s[a]=!0}):s=r,n=(o=n)!=null?o:!i,!i&&n)return{...s,[e.id]:!0};if(i&&!n){const{[e.id]:a,...u}=s;return u}return r})},e.getIsExpanded=()=>{var n;const r=t.getState().expanded;return!!((n=t.options.getIsRowExpanded==null?void 0:t.options.getIsRowExpanded(e))!=null?n:r===!0||r!=null&&r[e.id])},e.getCanExpand=()=>{var n,r,o;return(n=t.options.getRowCanExpand==null?void 0:t.options.getRowCanExpand(e))!=null?n:((r=t.options.enableExpanding)!=null?r:!0)&&!!((o=e.subRows)!=null&&o.length)},e.getIsAllParentsExpanded=()=>{let n=!0,r=e;for(;n&&r.parentId;)r=t.getRow(r.parentId,!0),n=r.getIsExpanded();return n},e.getToggleExpandedHandler=()=>{const n=e.getCanExpand();return()=>{n&&e.toggleExpanded()}}}},ao=0,lo=10,Gr=()=>({pageIndex:ao,pageSize:lo}),xm={getInitialState:e=>({...e,pagination:{...Gr(),...e==null?void 0:e.pagination}}),getDefaultOptions:e=>({onPaginationChange:Le("pagination",e)}),createTable:e=>{let t=!1,n=!1;e._autoResetPageIndex=()=>{var r,o;if(!t){e._queue(()=>{t=!0});return}if((r=(o=e.options.autoResetAll)!=null?o:e.options.autoResetPageIndex)!=null?r:!e.options.manualPagination){if(n)return;n=!0,e._queue(()=>{e.resetPageIndex(),n=!1})}},e.setPagination=r=>{const o=i=>pt(r,i);return e.options.onPaginationChange==null?void 0:e.options.onPaginationChange(o)},e.resetPagination=r=>{var o;e.setPagination(r?Gr():(o=e.initialState.pagination)!=null?o:Gr())},e.setPageIndex=r=>{e.setPagination(o=>{let i=pt(r,o.pageIndex);const s=typeof e.options.pageCount>"u"||e.options.pageCount===-1?Number.MAX_SAFE_INTEGER:e.options.pageCount-1;return i=Math.max(0,Math.min(i,s)),{...o,pageIndex:i}})},e.resetPageIndex=r=>{var o,i;e.setPageIndex(r?ao:(o=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageIndex)!=null?o:ao)},e.resetPageSize=r=>{var o,i;e.setPageSize(r?lo:(o=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageSize)!=null?o:lo)},e.setPageSize=r=>{e.setPagination(o=>{const i=Math.max(1,pt(r,o.pageSize)),s=o.pageSize*o.pageIndex,a=Math.floor(s/i);return{...o,pageIndex:a,pageSize:i}})},e.setPageCount=r=>e.setPagination(o=>{var i;let s=pt(r,(i=e.options.pageCount)!=null?i:-1);return typeof s=="number"&&(s=Math.max(-1,s)),{...o,pageCount:s}}),e.getPageOptions=J(()=>[e.getPageCount()],r=>{let o=[];return r&&r>0&&(o=[...new Array(r)].fill(null).map((i,s)=>s)),o},Z(e.options,"debugTable","getPageOptions")),e.getCanPreviousPage=()=>e.getState().pagination.pageIndex>0,e.getCanNextPage=()=>{const{pageIndex:r}=e.getState().pagination,o=e.getPageCount();return o===-1?!0:o===0?!1:r<o-1},e.previousPage=()=>e.setPageIndex(r=>r-1),e.nextPage=()=>e.setPageIndex(r=>r+1),e.firstPage=()=>e.setPageIndex(0),e.lastPage=()=>e.setPageIndex(e.getPageCount()-1),e.getPrePaginationRowModel=()=>e.getExpandedRowModel(),e.getPaginationRowModel=()=>(!e._getPaginationRowModel&&e.options.getPaginationRowModel&&(e._getPaginationRowModel=e.options.getPaginationRowModel(e)),e.options.manualPagination||!e._getPaginationRowModel?e.getPrePaginationRowModel():e._getPaginationRowModel()),e.getPageCount=()=>{var r;return(r=e.options.pageCount)!=null?r:Math.ceil(e.getRowCount()/e.getState().pagination.pageSize)},e.getRowCount=()=>{var r;return(r=e.options.rowCount)!=null?r:e.getPrePaginationRowModel().rows.length}}},Ur=()=>({top:[],bottom:[]}),Sm={getInitialState:e=>({rowPinning:Ur(),...e}),getDefaultOptions:e=>({onRowPinningChange:Le("rowPinning",e)}),createRow:(e,t)=>{e.pin=(n,r,o)=>{const i=r?e.getLeafRows().map(u=>{let{id:c}=u;return c}):[],s=o?e.getParentRows().map(u=>{let{id:c}=u;return c}):[],a=new Set([...s,e.id,...i]);t.setRowPinning(u=>{var c,d;if(n==="bottom"){var g,p;return{top:((g=u==null?void 0:u.top)!=null?g:[]).filter(m=>!(a!=null&&a.has(m))),bottom:[...((p=u==null?void 0:u.bottom)!=null?p:[]).filter(m=>!(a!=null&&a.has(m))),...Array.from(a)]}}if(n==="top"){var f,h;return{top:[...((f=u==null?void 0:u.top)!=null?f:[]).filter(m=>!(a!=null&&a.has(m))),...Array.from(a)],bottom:((h=u==null?void 0:u.bottom)!=null?h:[]).filter(m=>!(a!=null&&a.has(m)))}}return{top:((c=u==null?void 0:u.top)!=null?c:[]).filter(m=>!(a!=null&&a.has(m))),bottom:((d=u==null?void 0:u.bottom)!=null?d:[]).filter(m=>!(a!=null&&a.has(m)))}})},e.getCanPin=()=>{var n;const{enableRowPinning:r,enablePinning:o}=t.options;return typeof r=="function"?r(e):(n=r??o)!=null?n:!0},e.getIsPinned=()=>{const n=[e.id],{top:r,bottom:o}=t.getState().rowPinning,i=n.some(a=>r==null?void 0:r.includes(a)),s=n.some(a=>o==null?void 0:o.includes(a));return i?"top":s?"bottom":!1},e.getPinnedIndex=()=>{var n,r;const o=e.getIsPinned();if(!o)return-1;const i=(n=t._getPinnedRows(o))==null?void 0:n.map(s=>{let{id:a}=s;return a});return(r=i==null?void 0:i.indexOf(e.id))!=null?r:-1}},createTable:e=>{e.setRowPinning=t=>e.options.onRowPinningChange==null?void 0:e.options.onRowPinningChange(t),e.resetRowPinning=t=>{var n,r;return e.setRowPinning(t?Ur():(n=(r=e.initialState)==null?void 0:r.rowPinning)!=null?n:Ur())},e.getIsSomeRowsPinned=t=>{var n;const r=e.getState().rowPinning;if(!t){var o,i;return!!((o=r.top)!=null&&o.length||(i=r.bottom)!=null&&i.length)}return!!((n=r[t])!=null&&n.length)},e._getPinnedRows=J(t=>[e.getRowModel().rows,e.getState().rowPinning[t],t],(t,n,r)=>{var o;return((o=e.options.keepPinnedRows)==null||o?(n??[]).map(s=>{const a=e.getRow(s,!0);return a.getIsAllParentsExpanded()?a:null}):(n??[]).map(s=>t.find(a=>a.id===s))).filter(Boolean).map(s=>({...s,position:r}))},Z(e.options,"debugRows","_getPinnedRows")),e.getTopRows=()=>e._getPinnedRows("top"),e.getBottomRows=()=>e._getPinnedRows("bottom"),e.getCenterRows=J(()=>[e.getRowModel().rows,e.getState().rowPinning.top,e.getState().rowPinning.bottom],(t,n,r)=>{const o=new Set([...n??[],...r??[]]);return t.filter(i=>!o.has(i.id))},Z(e.options,"debugRows","getCenterRows"))}},Cm={getInitialState:e=>({rowSelection:{},...e}),getDefaultOptions:e=>({onRowSelectionChange:Le("rowSelection",e),enableRowSelection:!0,enableMultiRowSelection:!0,enableSubRowSelection:!0}),createTable:e=>{e.setRowSelection=t=>e.options.onRowSelectionChange==null?void 0:e.options.onRowSelectionChange(t),e.resetRowSelection=t=>{var n;return e.setRowSelection(t?{}:(n=e.initialState.rowSelection)!=null?n:{})},e.toggleAllRowsSelected=t=>{e.setRowSelection(n=>{t=typeof t<"u"?t:!e.getIsAllRowsSelected();const r={...n},o=e.getPreGroupedRowModel().flatRows;return t?o.forEach(i=>{i.getCanSelect()&&(r[i.id]=!0)}):o.forEach(i=>{delete r[i.id]}),r})},e.toggleAllPageRowsSelected=t=>e.setRowSelection(n=>{const r=typeof t<"u"?t:!e.getIsAllPageRowsSelected(),o={...n};return e.getRowModel().rows.forEach(i=>{uo(o,i.id,r,!0,e)}),o}),e.getPreSelectedRowModel=()=>e.getCoreRowModel(),e.getSelectedRowModel=J(()=>[e.getState().rowSelection,e.getCoreRowModel()],(t,n)=>Object.keys(t).length?qr(e,n):{rows:[],flatRows:[],rowsById:{}},Z(e.options,"debugTable","getSelectedRowModel")),e.getFilteredSelectedRowModel=J(()=>[e.getState().rowSelection,e.getFilteredRowModel()],(t,n)=>Object.keys(t).length?qr(e,n):{rows:[],flatRows:[],rowsById:{}},Z(e.options,"debugTable","getFilteredSelectedRowModel")),e.getGroupedSelectedRowModel=J(()=>[e.getState().rowSelection,e.getSortedRowModel()],(t,n)=>Object.keys(t).length?qr(e,n):{rows:[],flatRows:[],rowsById:{}},Z(e.options,"debugTable","getGroupedSelectedRowModel")),e.getIsAllRowsSelected=()=>{const t=e.getFilteredRowModel().flatRows,{rowSelection:n}=e.getState();let r=!!(t.length&&Object.keys(n).length);return r&&t.some(o=>o.getCanSelect()&&!n[o.id])&&(r=!1),r},e.getIsAllPageRowsSelected=()=>{const t=e.getPaginationRowModel().flatRows.filter(o=>o.getCanSelect()),{rowSelection:n}=e.getState();let r=!!t.length;return r&&t.some(o=>!n[o.id])&&(r=!1),r},e.getIsSomeRowsSelected=()=>{var t;const n=Object.keys((t=e.getState().rowSelection)!=null?t:{}).length;return n>0&&n<e.getFilteredRowModel().flatRows.length},e.getIsSomePageRowsSelected=()=>{const t=e.getPaginationRowModel().flatRows;return e.getIsAllPageRowsSelected()?!1:t.filter(n=>n.getCanSelect()).some(n=>n.getIsSelected()||n.getIsSomeSelected())},e.getToggleAllRowsSelectedHandler=()=>t=>{e.toggleAllRowsSelected(t.target.checked)},e.getToggleAllPageRowsSelectedHandler=()=>t=>{e.toggleAllPageRowsSelected(t.target.checked)}},createRow:(e,t)=>{e.toggleSelected=(n,r)=>{const o=e.getIsSelected();t.setRowSelection(i=>{var s;if(n=typeof n<"u"?n:!o,e.getCanSelect()&&o===n)return i;const a={...i};return uo(a,e.id,n,(s=r==null?void 0:r.selectChildren)!=null?s:!0,t),a})},e.getIsSelected=()=>{const{rowSelection:n}=t.getState();return Ho(e,n)},e.getIsSomeSelected=()=>{const{rowSelection:n}=t.getState();return co(e,n)==="some"},e.getIsAllSubRowsSelected=()=>{const{rowSelection:n}=t.getState();return co(e,n)==="all"},e.getCanSelect=()=>{var n;return typeof t.options.enableRowSelection=="function"?t.options.enableRowSelection(e):(n=t.options.enableRowSelection)!=null?n:!0},e.getCanSelectSubRows=()=>{var n;return typeof t.options.enableSubRowSelection=="function"?t.options.enableSubRowSelection(e):(n=t.options.enableSubRowSelection)!=null?n:!0},e.getCanMultiSelect=()=>{var n;return typeof t.options.enableMultiRowSelection=="function"?t.options.enableMultiRowSelection(e):(n=t.options.enableMultiRowSelection)!=null?n:!0},e.getToggleSelectedHandler=()=>{const n=e.getCanSelect();return r=>{var o;n&&e.toggleSelected((o=r.target)==null?void 0:o.checked)}}}},uo=(e,t,n,r,o)=>{var i;const s=o.getRow(t,!0);n?(s.getCanMultiSelect()||Object.keys(e).forEach(a=>delete e[a]),s.getCanSelect()&&(e[t]=!0)):delete e[t],r&&(i=s.subRows)!=null&&i.length&&s.getCanSelectSubRows()&&s.subRows.forEach(a=>uo(e,a.id,n,r,o))};function qr(e,t){const n=e.getState().rowSelection,r=[],o={},i=function(s,a){return s.map(u=>{var c;const d=Ho(u,n);if(d&&(r.push(u),o[u.id]=u),(c=u.subRows)!=null&&c.length&&(u={...u,subRows:i(u.subRows)}),d)return u}).filter(Boolean)};return{rows:i(t.rows),flatRows:r,rowsById:o}}function Ho(e,t){var n;return(n=t[e.id])!=null?n:!1}function co(e,t,n){var r;if(!((r=e.subRows)!=null&&r.length))return!1;let o=!0,i=!1;return e.subRows.forEach(s=>{if(!(i&&!o)&&(s.getCanSelect()&&(Ho(s,t)?i=!0:o=!1),s.subRows&&s.subRows.length)){const a=co(s,t);a==="all"?i=!0:(a==="some"&&(i=!0),o=!1)}}),o?"all":i?"some":!1}const po=/([0-9]+)/gm,Em=(e,t,n)=>Ba(ft(e.getValue(n)).toLowerCase(),ft(t.getValue(n)).toLowerCase()),Rm=(e,t,n)=>Ba(ft(e.getValue(n)),ft(t.getValue(n))),km=(e,t,n)=>Go(ft(e.getValue(n)).toLowerCase(),ft(t.getValue(n)).toLowerCase()),Tm=(e,t,n)=>Go(ft(e.getValue(n)),ft(t.getValue(n))),Pm=(e,t,n)=>{const r=e.getValue(n),o=t.getValue(n);return r>o?1:r<o?-1:0},Om=(e,t,n)=>Go(e.getValue(n),t.getValue(n));function Go(e,t){return e===t?0:e>t?1:-1}function ft(e){return typeof e=="number"?isNaN(e)||e===1/0||e===-1/0?"":String(e):typeof e=="string"?e:""}function Ba(e,t){const n=e.split(po).filter(Boolean),r=t.split(po).filter(Boolean);for(;n.length&&r.length;){const o=n.shift(),i=r.shift(),s=parseInt(o,10),a=parseInt(i,10),u=[s,a].sort();if(isNaN(u[0])){if(o>i)return 1;if(i>o)return-1;continue}if(isNaN(u[1]))return isNaN(s)?-1:1;if(s>a)return 1;if(a>s)return-1}return n.length-r.length}const un={alphanumeric:Em,alphanumericCaseSensitive:Rm,text:km,textCaseSensitive:Tm,datetime:Pm,basic:Om},_m={getInitialState:e=>({sorting:[],...e}),getDefaultColumnDef:()=>({sortingFn:"auto",sortUndefined:1}),getDefaultOptions:e=>({onSortingChange:Le("sorting",e),isMultiSortEvent:t=>t.shiftKey}),createColumn:(e,t)=>{e.getAutoSortingFn=()=>{const n=t.getFilteredRowModel().flatRows.slice(10);let r=!1;for(const o of n){const i=o==null?void 0:o.getValue(e.id);if(Object.prototype.toString.call(i)==="[object Date]")return un.datetime;if(typeof i=="string"&&(r=!0,i.split(po).length>1))return un.alphanumeric}return r?un.text:un.basic},e.getAutoSortDir=()=>{const n=t.getFilteredRowModel().flatRows[0];return typeof(n==null?void 0:n.getValue(e.id))=="string"?"asc":"desc"},e.getSortingFn=()=>{var n,r;if(!e)throw new Error;return wr(e.columnDef.sortingFn)?e.columnDef.sortingFn:e.columnDef.sortingFn==="auto"?e.getAutoSortingFn():(n=(r=t.options.sortingFns)==null?void 0:r[e.columnDef.sortingFn])!=null?n:un[e.columnDef.sortingFn]},e.toggleSorting=(n,r)=>{const o=e.getNextSortingOrder(),i=typeof n<"u"&&n!==null;t.setSorting(s=>{const a=s==null?void 0:s.find(f=>f.id===e.id),u=s==null?void 0:s.findIndex(f=>f.id===e.id);let c=[],d,g=i?n:o==="desc";if(s!=null&&s.length&&e.getCanMultiSort()&&r?a?d="toggle":d="add":s!=null&&s.length&&u!==s.length-1?d="replace":a?d="toggle":d="replace",d==="toggle"&&(i||o||(d="remove")),d==="add"){var p;c=[...s,{id:e.id,desc:g}],c.splice(0,c.length-((p=t.options.maxMultiSortColCount)!=null?p:Number.MAX_SAFE_INTEGER))}else d==="toggle"?c=s.map(f=>f.id===e.id?{...f,desc:g}:f):d==="remove"?c=s.filter(f=>f.id!==e.id):c=[{id:e.id,desc:g}];return c})},e.getFirstSortDir=()=>{var n,r;return((n=(r=e.columnDef.sortDescFirst)!=null?r:t.options.sortDescFirst)!=null?n:e.getAutoSortDir()==="desc")?"desc":"asc"},e.getNextSortingOrder=n=>{var r,o;const i=e.getFirstSortDir(),s=e.getIsSorted();return s?s!==i&&((r=t.options.enableSortingRemoval)==null||r)&&(!(n&&(o=t.options.enableMultiRemove)!=null)||o)?!1:s==="desc"?"asc":"desc":i},e.getCanSort=()=>{var n,r;return((n=e.columnDef.enableSorting)!=null?n:!0)&&((r=t.options.enableSorting)!=null?r:!0)&&!!e.accessorFn},e.getCanMultiSort=()=>{var n,r;return(n=(r=e.columnDef.enableMultiSort)!=null?r:t.options.enableMultiSort)!=null?n:!!e.accessorFn},e.getIsSorted=()=>{var n;const r=(n=t.getState().sorting)==null?void 0:n.find(o=>o.id===e.id);return r?r.desc?"desc":"asc":!1},e.getSortIndex=()=>{var n,r;return(n=(r=t.getState().sorting)==null?void 0:r.findIndex(o=>o.id===e.id))!=null?n:-1},e.clearSorting=()=>{t.setSorting(n=>n!=null&&n.length?n.filter(r=>r.id!==e.id):[])},e.getToggleSortingHandler=()=>{const n=e.getCanSort();return r=>{n&&(r.persist==null||r.persist(),e.toggleSorting==null||e.toggleSorting(void 0,e.getCanMultiSort()?t.options.isMultiSortEvent==null?void 0:t.options.isMultiSortEvent(r):!1))}}},createTable:e=>{e.setSorting=t=>e.options.onSortingChange==null?void 0:e.options.onSortingChange(t),e.resetSorting=t=>{var n,r;e.setSorting(t?[]:(n=(r=e.initialState)==null?void 0:r.sorting)!=null?n:[])},e.getPreSortedRowModel=()=>e.getGroupedRowModel(),e.getSortedRowModel=()=>(!e._getSortedRowModel&&e.options.getSortedRowModel&&(e._getSortedRowModel=e.options.getSortedRowModel(e)),e.options.manualSorting||!e._getSortedRowModel?e.getPreSortedRowModel():e._getSortedRowModel())}},$m=[Qg,vm,fm,gm,em,tm,bm,ym,_m,dm,wm,xm,Sm,Cm,mm];function Nm(e){var t,n;process.env.NODE_ENV!=="production"&&(e.debugAll||e.debugTable)&&console.info("Creating Table Instance...");const r=[...$m,...(t=e._features)!=null?t:[]];let o={_features:r};const i=o._features.reduce((p,f)=>Object.assign(p,f.getDefaultOptions==null?void 0:f.getDefaultOptions(o)),{}),s=p=>o.options.mergeOptions?o.options.mergeOptions(i,p):{...i,...p};let u={...{},...(n=e.initialState)!=null?n:{}};o._features.forEach(p=>{var f;u=(f=p.getInitialState==null?void 0:p.getInitialState(u))!=null?f:u});const c=[];let d=!1;const g={_features:r,options:{...i,...e},initialState:u,_queue:p=>{c.push(p),d||(d=!0,Promise.resolve().then(()=>{for(;c.length;)c.shift()();d=!1}).catch(f=>setTimeout(()=>{throw f})))},reset:()=>{o.setState(o.initialState)},setOptions:p=>{const f=pt(p,o.options);o.options=s(f)},getState:()=>o.options.state,setState:p=>{o.options.onStateChange==null||o.options.onStateChange(p)},_getRowId:(p,f,h)=>{var m;return(m=o.options.getRowId==null?void 0:o.options.getRowId(p,f,h))!=null?m:`${h?[h.id,f].join("."):f}`},getCoreRowModel:()=>(o._getCoreRowModel||(o._getCoreRowModel=o.options.getCoreRowModel(o)),o._getCoreRowModel()),getRowModel:()=>o.getPaginationRowModel(),getRow:(p,f)=>{let h=(f?o.getPrePaginationRowModel():o.getRowModel()).rowsById[p];if(!h&&(h=o.getCoreRowModel().rowsById[p],!h))throw process.env.NODE_ENV!=="production"?new Error(`getRow could not find row with ID: ${p}`):new Error;return h},_getDefaultColumnDef:J(()=>[o.options.defaultColumn],p=>{var f;return p=(f=p)!=null?f:{},{header:h=>{const m=h.header.column.columnDef;return m.accessorKey?m.accessorKey:m.accessorFn?m.id:null},cell:h=>{var m,v;return(m=(v=h.renderValue())==null||v.toString==null?void 0:v.toString())!=null?m:null},...o._features.reduce((h,m)=>Object.assign(h,m.getDefaultColumnDef==null?void 0:m.getDefaultColumnDef()),{}),...p}},Z(e,"debugColumns","_getDefaultColumnDef")),_getColumnDefs:()=>o.options.columns,getAllColumns:J(()=>[o._getColumnDefs()],p=>{const f=function(h,m,v){return v===void 0&&(v=0),h.map(w=>{const O=Zg(o,w,v,m),x=w;return O.columns=x.columns?f(x.columns,O,v+1):[],O})};return f(p)},Z(e,"debugColumns","getAllColumns")),getAllFlatColumns:J(()=>[o.getAllColumns()],p=>p.flatMap(f=>f.getFlatColumns()),Z(e,"debugColumns","getAllFlatColumns")),_getAllFlatColumnsById:J(()=>[o.getAllFlatColumns()],p=>p.reduce((f,h)=>(f[h.id]=h,f),{}),Z(e,"debugColumns","getAllFlatColumnsById")),getAllLeafColumns:J(()=>[o.getAllColumns(),o._getOrderColumnsFn()],(p,f)=>{let h=p.flatMap(m=>m.getLeafColumns());return f(h)},Z(e,"debugColumns","getAllLeafColumns")),getColumn:p=>{const f=o._getAllFlatColumnsById()[p];return process.env.NODE_ENV!=="production"&&!f&&console.error(`[Table] Column with id '${p}' does not exist.`),f}};Object.assign(o,g);for(let p=0;p<o._features.length;p++){const f=o._features[p];f==null||f.createTable==null||f.createTable(o)}return o}function Mm(){return e=>J(()=>[e.options.data],t=>{const n={rows:[],flatRows:[],rowsById:{}},r=function(o,i,s){i===void 0&&(i=0);const a=[];for(let c=0;c<o.length;c++){const d=Na(e,e._getRowId(o[c],c,s),o[c],c,i,void 0,s==null?void 0:s.id);if(n.flatRows.push(d),n.rowsById[d.id]=d,a.push(d),e.options.getSubRows){var u;d.originalSubRows=e.options.getSubRows(o[c],c),(u=d.originalSubRows)!=null&&u.length&&(d.subRows=r(d.originalSubRows,i+1,d))}}return a};return n.rows=r(t),n},Z(e.options,"debugTable","getRowModel",()=>e._autoResetPageIndex()))}function Im(){return e=>J(()=>[e.getState().expanded,e.getPreExpandedRowModel(),e.options.paginateExpandedRows],(t,n,r)=>!n.rows.length||t!==!0&&!Object.keys(t??{}).length||!r?n:Dm(n),Z(e.options,"debugTable","getExpandedRowModel"))}function Dm(e){const t=[],n=r=>{var o;t.push(r),(o=r.subRows)!=null&&o.length&&r.getIsExpanded()&&r.subRows.forEach(n)};return e.rows.forEach(n),{rows:t,flatRows:e.flatRows,rowsById:e.rowsById}}function Am(){return e=>J(()=>[e.getState().grouping,e.getPreGroupedRowModel()],(t,n)=>{if(!n.rows.length||!t.length)return n;const r=t.filter(u=>e.getColumn(u)),o=[],i={},s=function(u,c,d){if(c===void 0&&(c=0),c>=r.length)return u.map(h=>(h.depth=c,o.push(h),i[h.id]=h,h.subRows&&(h.subRows=s(h.subRows,c+1,h.id)),h));const g=r[c],p=jm(u,g);return Array.from(p.entries()).map((h,m)=>{let[v,w]=h,O=`${g}:${v}`;O=d?`${d}>${O}`:O;const x=s(w,c+1,O),S=c?$a(w,C=>C.subRows):w,b=Na(e,O,S[0].original,m,c,void 0,d);return Object.assign(b,{groupingColumnId:g,groupingValue:v,subRows:x,leafRows:S,getValue:C=>{if(r.includes(C)){if(b._valuesCache.hasOwnProperty(C))return b._valuesCache[C];if(w[0]){var $;b._valuesCache[C]=($=w[0].getValue(C))!=null?$:void 0}return b._valuesCache[C]}if(b._groupingValuesCache.hasOwnProperty(C))return b._groupingValuesCache[C];const j=e.getColumn(C),F=j==null?void 0:j.getAggregationFn();if(F)return b._groupingValuesCache[C]=F(C,S,w),b._groupingValuesCache[C]}}),x.forEach(C=>{o.push(C),i[C.id]=C}),b})},a=s(n.rows,0);return a.forEach(u=>{o.push(u),i[u.id]=u}),{rows:a,flatRows:o,rowsById:i}},Z(e.options,"debugTable","getGroupedRowModel",()=>{e._queue(()=>{e._autoResetExpanded(),e._autoResetPageIndex()})}))}function jm(e,t){const n=new Map;return e.reduce((r,o)=>{const i=`${o.getGroupingValue(t)}`,s=r.get(i);return s?s.push(o):r.set(i,[o]),r},n)}function Fm(){return e=>J(()=>[e.getState().sorting,e.getPreSortedRowModel()],(t,n)=>{if(!n.rows.length||!(t!=null&&t.length))return n;const r=e.getState().sorting,o=[],i=r.filter(u=>{var c;return(c=e.getColumn(u.id))==null?void 0:c.getCanSort()}),s={};i.forEach(u=>{const c=e.getColumn(u.id);c&&(s[u.id]={sortUndefined:c.columnDef.sortUndefined,invertSorting:c.columnDef.invertSorting,sortingFn:c.getSortingFn()})});const a=u=>{const c=u.map(d=>({...d}));return c.sort((d,g)=>{for(let f=0;f<i.length;f+=1){var p;const h=i[f],m=s[h.id],v=m.sortUndefined,w=(p=h==null?void 0:h.desc)!=null?p:!1;let O=0;if(v){const x=d.getValue(h.id),S=g.getValue(h.id),b=x===void 0,C=S===void 0;if(b||C){if(v==="first")return b?-1:1;if(v==="last")return b?1:-1;O=b&&C?0:b?v:-v}}if(O===0&&(O=m.sortingFn(d,g,h.id)),O!==0)return w&&(O*=-1),m.invertSorting&&(O*=-1),O}return d.index-g.index}),c.forEach(d=>{var g;o.push(d),(g=d.subRows)!=null&&g.length&&(d.subRows=a(d.subRows))}),c};return{rows:a(n.rows),flatRows:o,rowsById:n.rowsById}},Z(e.options,"debugTable","getSortedRowModel",()=>e._autoResetPageIndex()))}/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function Wr(e,t){return e?Vm(e)?R.createElement(e,t):e:null}function Vm(e){return Lm(e)||typeof e=="function"||Bm(e)}function Lm(e){return typeof e=="function"&&(()=>{const t=Object.getPrototypeOf(e);return t.prototype&&t.prototype.isReactComponent})()}function Bm(e){return typeof e=="object"&&typeof e.$$typeof=="symbol"&&["react.memo","react.forward_ref"].includes(e.$$typeof.description)}function zm(e){const t={state:{},onStateChange:()=>{},renderFallbackValue:null,...e},[n]=R.useState(()=>({current:Nm(t)})),[r,o]=R.useState(()=>n.current.initialState);return n.current.setOptions(i=>({...i,...e,state:{...r,...e.state},onStateChange:s=>{o(s),e.onStateChange==null||e.onStateChange(s)}})),n.current}const Bt="scrBook",Hm="scrRef",gn="source",Gm="details",Um="Scripture Reference",qm="Scripture Book",za="Type",Wm="Details";function Xm(e,t){const n=t??!1;return[{accessorFn:r=>`${le.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:Bt,header:(e==null?void 0:e.scriptureReferenceColumnName)??Um,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?le.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===Bt?Ee.format(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>Ee.compare(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>Ee.format(r.start),id:Hm,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:Ee.format(o.start)},sortingFn:(r,o)=>Ee.compare(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>typeof r.source=="object"&&"displayName"in r.source?r.source.displayName:r.source,id:gn,header:n?(e==null?void 0:e.typeColumnName)??za:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,enableGrouping:!0},{accessorFn:r=>r.detail,id:Gm,header:(e==null?void 0:e.detailsColumnName)??Wm,cell:r=>r.getValue(),enableGrouping:!1}]}function Km({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:i,detailsColumnName:s,onRowSelected:a}){const[u,c]=I.useState([]),[d,g]=I.useState([{id:Bt,desc:!1}]),[p,f]=I.useState(()=>e.flatMap(E=>{const k=E.checkDefinition??E.id;return E.data.map(N=>({...N,source:k}))})),[h,m]=I.useState({});I.useEffect(()=>{const E=k=>{const{detail:N}=k,A=N,D=A.checkDefinition??A.id,z=A.data.map(Q=>({...Q,source:D}));N!==void 0&&f(Q=>[...Q.filter(P=>P.source!==D),...z])};return e.forEach(k=>{k.resultsUpdated.addEventListener("resultsUpdated",E)}),()=>{e.forEach(k=>{k.resultsUpdated.removeEventListener("resultsUpdated",E)})}},[e]);const v=I.useMemo(()=>Xm({scriptureReferenceColumnName:r,typeColumnName:i,detailsColumnName:s},n),[r,i,s,n]);function w(E){return E.bookNum*1e6+E.chapterNum*1e3+E.verseNum}const O=I.useCallback((E,k)=>!k||Ee.compare(E,k)===0?`${w(E)}`:`${w(E)}-${w(k)}`,[]),x=I.useCallback(E=>`${O(E.start,E.end)} ${E.source} ${E.detail}`,[O]),S=zm({data:p,columns:v,state:{grouping:u,sorting:d,rowSelection:h},onGroupingChange:c,onSortingChange:g,onRowSelectionChange:m,getExpandedRowModel:Im(),getGroupedRowModel:Am(),getCoreRowModel:Mm(),getSortedRowModel:Fm(),getRowId:x,enableMultiRowSelection:!1,enableSubRowSelection:!1});I.useEffect(()=>{if(a){const E=S.getSelectedRowModel().rowsById,k=Object.keys(E);if(k.length===1){const N=p.find(A=>x(A)===k[0])||void 0;N&&a(N)}}},[h,p,x,a,S]);const b=o??qm,C=i??za,$=[{label:"No Grouping",value:[]},{label:`Group by ${b}`,value:[Bt]},{label:`Group by ${C}`,value:[gn]},{label:`Group by ${b} and ${C}`,value:[Bt,gn]},{label:`Group by ${C} and ${b}`,value:[gn,Bt]}],j=E=>{const k=JSON.parse(E.target.value);c(k)},F=(E,k)=>{!E.getIsGrouped()&&!E.getIsSelected()&&E.getToggleSelectedHandler()(k)},B=(E,k)=>E.getIsGrouped()?"":k%2===0?"banded-row-even":"banded-row-odd",_=(E,k)=>E.depth>=k.column.getIndex()?` indent${E.depth}`:"";return y.jsxs("div",{className:"p-2",children:[y.jsx("div",{className:"h-2"}),!t&&y.jsx("select",{value:JSON.stringify(u),onChange:j,children:$.map(E=>y.jsx("option",{value:JSON.stringify(E.value),children:E.label},E.label))}),y.jsxs("table",{children:[t&&y.jsx("thead",{children:S.getHeaderGroups().map(E=>y.jsx("tr",{children:E.headers.map(k=>y.jsx("th",{colSpan:k.colSpan,children:k.isPlaceholder?void 0:y.jsxs("div",{children:[k.column.getCanGroup()?y.jsx("button",{title:`Toggle grouping by ${k.column.columnDef.header}`,onClick:k.column.getToggleGroupingHandler(),style:{cursor:"pointer"},type:"button",children:k.column.getIsGrouped()?`🛑(${k.column.getGroupedIndex()}) `:"👊 "}):void 0," ",Wr(k.column.columnDef.header,k.getContext())]})},k.id))},E.id))}),y.jsx("tbody",{children:S.getRowModel().rows.map((E,k)=>y.jsx("tr",{className:`${E.getIsSelected()?"selected ":""} ${B(E,k)}`,onClick:N=>F(E,N),children:E.getVisibleCells().map(N=>{if(!(N.getIsPlaceholder()||N.column.columnDef.enableGrouping&&!N.getIsGrouped()&&(N.column.columnDef.id!==gn||!n)))return y.jsx("td",{className:`${N.column.columnDef.id}${_(E,N)}`,children:(()=>N.getIsGrouped()?y.jsxs("button",{onClick:E.getToggleExpandedHandler(),style:{cursor:E.getCanExpand()?"pointer":"normal"},type:"button",children:[E.getIsExpanded()?"👇":"👉"," ",Wr(N.column.columnDef.cell,N.getContext())," (",E.subRows.length,")"]}):Wr(N.column.columnDef.cell,N.getContext()))()},N.id)})},E.id))})]})]})}function Ym({onSearch:e,placeholder:t}){const[n,r]=I.useState(""),o=i=>{r(i),e(i)};return y.jsx(ve.Paper,{component:"form",className:"search-bar-paper",children:y.jsx(kn,{className:"search-bar-input",placeholder:t,value:n,onChange:i=>o(i.target.value)})})}function Jm({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:s=!1,defaultValue:a,value:u,valueLabelDisplay:c="off",className:d,onChange:g,onChangeCommitted:p}){return y.jsx(ve.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:s,defaultValue:a,value:u,valueLabelDisplay:c,className:`papi-slider ${n} ${d??""}`,onChange:g,onChangeCommitted:p})}function Zm({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:s,children:a}){const u={action:(s==null?void 0:s.action)||a,message:s==null?void 0:s.message,className:r};return y.jsx(ve.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:u})}function Qm({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return y.jsx(ve.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function is({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return y.jsx(kn,{defaultValue:t[n.key],onChange:r})}const eh=({onChange:e,disabled:t,checked:n,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return y.jsx(yo,{...r,isChecked:n,isDisabled:t,onChange:o})};function th({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:s,defaultColumnSortable:a=!0,defaultColumnResizable:u=!0,rows:c,enableSelectColumn:d,selectColumnWidth:g=50,rowKeyGetter:p,rowHeight:f=35,headerRowHeight:h=35,selectedRows:m,onSelectedRowsChange:v,onRowsChange:w,onCellClick:O,onCellDoubleClick:x,onCellContextMenu:S,onCellKeyDown:b,direction:C="ltr",enableVirtualization:$=!0,onCopy:j,onPaste:F,onScroll:B,className:_,"data-testid":E}){const k=I.useMemo(()=>{const N=e.map(A=>typeof A.editable=="function"?{...A,editable:z=>!!A.editable(z),renderEditCell:A.renderEditCell||is}:A.editable&&!A.renderEditCell?{...A,renderEditCell:is}:A.renderEditCell&&!A.editable?{...A,editable:!1}:A);return d?[{...ii.SelectColumn,minWidth:g},...N]:N},[e,d,g]);return y.jsx(ii,{columns:k,defaultColumnOptions:{width:o,minWidth:i,maxWidth:s,sortable:a,resizable:u},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:c,rowKeyGetter:p,rowHeight:f,headerRowHeight:h,selectedRows:m,onSelectedRowsChange:v,onRowsChange:w,onCellClick:O,onCellDoubleClick:x,onCellContextMenu:S,onCellKeyDown:b,direction:C,enableVirtualization:$,onCopy:j,onPaste:F,onScroll:B,renderers:{renderCheckbox:eh},className:`papi-table ${_??"rdg-light"}`,"data-testid":E})}function nh({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const i=I.useRef(void 0);return y.jsx("div",{ref:i,style:{position:"relative"},children:y.jsx(ve.AppBar,{position:"static",id:r,children:y.jsxs(ve.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?y.jsx(Oa,{commandHandler:t,containerRef:i,menuProvider:e}):void 0,o?y.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const rh=(e,t)=>{I.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Xr=()=>!1,oh=(e,t)=>{const[n]=ir(I.useCallback(async()=>{if(!e)return Xr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Xr,{preserveValue:!1});I.useEffect(()=>()=>{n!==Xr&&n()},[n])},ih=Ie.Root,Ha=I.forwardRef(({className:e,...t},n)=>y.jsx(Ie.List,{ref:n,className:ge("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Ha.displayName=Ie.List.displayName;const Ga=I.forwardRef(({className:e,...t},n)=>y.jsx(Ie.Trigger,{ref:n,className:ge("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));Ga.displayName=Ie.Trigger.displayName;const Ua=I.forwardRef(({className:e,...t},n)=>y.jsx(Ie.Content,{ref:n,className:ge("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));Ua.displayName=Ie.Content.displayName;const qa=I.forwardRef(({className:e,...t},n)=>y.jsx(Ie.Root,{orientation:"vertical",ref:n,className:ge("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));qa.displayName=Ie.List.displayName;const Wa=I.forwardRef(({className:e,...t},n)=>y.jsx(Ie.List,{ref:n,className:ge("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Wa.displayName=Ie.List.displayName;const sh=I.forwardRef(({className:e,...t},n)=>y.jsx(Ie.Trigger,{ref:n,...t,className:ge("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),children:y.jsx("div",{className:"pr-flex pr-flex-col pr-justify-center",children:y.jsx("div",{children:t.value})})})),Xa=I.forwardRef(({className:e,...t},n)=>y.jsx(Ie.Content,{ref:n,className:ge("mt-2 pr-ml-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));Xa.displayName=Ie.Content.displayName;exports.BookChapterControl=zl;exports.Button=yt;exports.ChapterRangeSelector=Gl;exports.Checkbox=yo;exports.Checklist=Ul;exports.ComboBox=Yn;exports.ContextMenu=zg;exports.DropdownMenu=gs;exports.DropdownMenuCheckboxItem=bs;exports.DropdownMenuContent=ho;exports.DropdownMenuGroup=Tl;exports.DropdownMenuItem=vo;exports.DropdownMenuLabel=sr;exports.DropdownMenuPortal=Pl;exports.DropdownMenuRadioGroup=_l;exports.DropdownMenuRadioItem=ys;exports.DropdownMenuSeparator=bo;exports.DropdownMenuShortcut=ws;exports.DropdownMenuSub=Ol;exports.DropdownMenuSubContent=vs;exports.DropdownMenuSubTrigger=hs;exports.DropdownMenuTrigger=ms;exports.GridMenu=va;exports.HamburgerMenuButton=Oa;exports.IconButton=Ug;exports.Input=ar;exports.LabelPosition=St;exports.MenuItem=Lo;exports.RefSelector=Wg;exports.ResultsSource=Kg;exports.ScriptureRefKeyedList=Km;exports.SearchBar=Ym;exports.Slider=Jm;exports.Snackbar=Zm;exports.Switch=Qm;exports.Table=th;exports.Tabs=ih;exports.TabsContent=Ua;exports.TabsList=Ha;exports.TabsTrigger=Ga;exports.TextField=kn;exports.Toolbar=nh;exports.VerticalTabs=qa;exports.VerticalTabsContent=Xa;exports.VerticalTabsList=Wa;exports.VerticalTabsTrigger=sh;exports.useEvent=rh;exports.useEventAsync=oh;exports.usePromise=ir;function ah(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}ah(`.papi-button {
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
}
.basic-list-table {
  overflow: auto;

  .table-header {
    text-align: left;
  }
}

table {
  border-spacing: 1px;
}

td {
  padding-left: 3px;
  padding-right: 3px;
}

.basic-list-expand-button {
  cursor: pointer;
}

.indent1 {
  padding-left: 20px;
}

.indent2 {
  padding-left: 40px;
}

.banded-row-even {
  background-color: lightgrey;
}

.selected {
  background-color: bisque;
}

.banded-row-even:hover,.banded-row-odd:hover {
  background-color: lightcyan;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  cursor: pointer;
}

.selected:hover {
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
.pr-mt-2 {
  margin-top: 0.5rem;
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
.pr-h-8 {
  height: 2rem;
}
.pr-h-9 {
  height: 2.25rem;
}
.pr-h-\\[1\\.2rem\\] {
  height: 1.2rem;
}
.pr-h-px {
  height: 1px;
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
.pr-w-\\[1\\.2rem\\] {
  width: 1.2rem;
}
.pr-w-\\[116px\\] {
  width: 116px;
}
.pr-w-\\[124px\\] {
  width: 124px;
}
.pr-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.pr-flex-grow {
  flex-grow: 1;
}
.pr-grow {
  flex-grow: 1;
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
.pr-self-stretch {
  align-self: stretch;
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
.pr-border-b-0 {
  border-bottom-width: 0px;
}
.pr-border-l-2 {
  border-left-width: 2px;
}
.pr-border-r-0 {
  border-right-width: 0px;
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
.pr-pt-4 {
  padding-top: 1rem;
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
.data-\\[highlighted\\]\\:pr-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
}
.data-\\[state\\=active\\]\\:pr-bg-background[data-state=active] {
  background-color: hsl(var(--background));
}
.data-\\[state\\=open\\]\\:pr-bg-accent[data-state=open] {
  background-color: hsl(var(--accent));
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
