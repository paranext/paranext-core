"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const w=require("react/jsx-runtime"),I=require("react"),Re=require("platform-bible-utils"),bl=require("@radix-ui/react-dropdown-menu"),Ye=require("lucide-react"),Te=require("clsx"),wl=require("tailwind-merge"),yl=require("@radix-ui/react-slot"),ls=require("class-variance-authority"),we=require("@mui/material"),Yr=require("@mui/styled-engine"),dn=require("react-dom"),xl=require("@radix-ui/react-label"),Sl=require("@radix-ui/react-select"),ai=require("react-data-grid"),Cl=require("@radix-ui/react-tabs");function Yt(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const C=Yt(I),me=Yt(bl),El=Yt(dn),us=Yt(xl),ye=Yt(Sl),je=Yt(Cl);var Rl=Object.defineProperty,kl=(e,t,n)=>t in e?Rl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ie=(e,t,n)=>(kl(e,typeof t!="symbol"?t+"":t,n),n);const Tt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],go=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],cs=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],li=Dl();function Kt(e,t=!0){return t&&(e=e.toUpperCase()),e in li?li[e]:0}function mo(e){return Kt(e)>0}function Tl(e){const t=typeof e=="string"?Kt(e):e;return t>=40&&t<=66}function Pl(e){return(typeof e=="string"?Kt(e):e)<=39}function ds(e){return e<=66}function Ol(e){const t=typeof e=="string"?Kt(e):e;return gs(t)&&!ds(t)}function*Nl(){for(let e=1;e<=Tt.length;e++)yield e}const _l=1,ps=Tt.length;function $l(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function ho(e,t="***"){const n=e-1;return n<0||n>=Tt.length?t:Tt[n]}function fs(e){return e<=0||e>ps?"******":cs[e-1]}function Ml(e){return fs(Kt(e))}function gs(e){const t=typeof e=="number"?ho(e):e;return mo(t)&&!go.includes(t)}function Il(e){const t=typeof e=="number"?ho(e):e;return mo(t)&&go.includes(t)}function jl(e){return cs[e-1].includes("*obsolete*")}function Dl(){const e={};for(let t=0;t<Tt.length;t++)e[Tt[t]]=t+1;return e}const ue={allBookIds:Tt,nonCanonicalIds:go,bookIdToNumber:Kt,isBookIdValid:mo,isBookNT:Tl,isBookOT:Pl,isBookOTNT:ds,isBookDC:Ol,allBookNumbers:Nl,firstBook:_l,lastBook:ps,extraBooks:$l,bookNumberToId:ho,bookNumberToEnglishName:fs,bookIdToEnglishName:Ml,isCanonical:gs,isExtraMaterial:Il,isObsolete:jl};var ft=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(ft||{});const Fe=class{constructor(t){if(ie(this,"name"),ie(this,"fullPath"),ie(this,"isPresent"),ie(this,"hasVerseSegments"),ie(this,"isCustomized"),ie(this,"baseVersification"),ie(this,"scriptureBooks"),ie(this,"_type"),t!=null)typeof t=="string"?this.name=t:this._type=t;else throw new Error("Argument null")}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ie(Fe,"Original",new Fe(ft.Original)),ie(Fe,"Septuagint",new Fe(ft.Septuagint)),ie(Fe,"Vulgate",new Fe(ft.Vulgate)),ie(Fe,"English",new Fe(ft.English)),ie(Fe,"RussianProtestant",new Fe(ft.RussianProtestant)),ie(Fe,"RussianOrthodox",new Fe(ft.RussianOrthodox));let Vt=Fe;function ui(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var ms=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(ms||{});const $e=class le{constructor(t,n,r,o){if(ie(this,"firstChapter"),ie(this,"lastChapter"),ie(this,"lastVerse"),ie(this,"hasSegmentsDefined"),ie(this,"text"),ie(this,"BBBCCCVVVS"),ie(this,"longHashCode"),ie(this,"versification"),ie(this,"rtlMark","‏"),ie(this,"_bookNum",0),ie(this,"_chapterNum",0),ie(this,"_verseNum",0),ie(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,s=n!=null&&n instanceof Vt?n:void 0;this.setEmpty(s),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof Vt?n:void 0;this.setEmpty(i),this._verseNum=t%le.chapterDigitShifter,this._chapterNum=Math.floor(t%le.bookDigitShifter/le.chapterDigitShifter),this._bookNum=Math.floor(t/le.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof le){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof Vt?t:le.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??le.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(t,n=le.defaultVersification){const r=new le(n);return r.parse(t),r}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=le.parse(t),{success:!0,verseRef:n}}catch(r){if(r instanceof rn)return n=new le,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%le.bcvMaxValue*le.bookDigitShifter+(n>=0?n%le.bcvMaxValue*le.chapterDigitShifter:0)+(r>=0?r%le.bcvMaxValue:0)}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>le.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(le.verseRangeSeparator)||this._verse.includes(le.verseSequenceIndicator))}get book(){return ue.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=ue.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=le.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=le.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>ue.lastBook)throw new rn("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Vt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(le.verseRangeSeparators,le.verseSequenceIndicators)}get BBBCCC(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const s=+i[1].trim();this.versification=new Vt(ft[s])}catch{throw new rn("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new rn("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||ue.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!le.isVerseParseable(r[1]))throw new rn("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new le(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}equals(t){return t instanceof le?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification):!1}allVerses(t=!1,n=le.verseRangeSeparators,r=le.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=ui(this._verse,r);for(const s of i.map(a=>ui(a,n))){const a=this.clone();a.verse=s[0];const u=a.verseNum;if(o.push(a),s.length>1){const c=this.clone();if(c.verse=s[1],!t)for(let d=u+1;d<c.verseNum;d++){const g=new le(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(g)}o.push(c)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ue.lastBook?2:(ue.isCanonical(this._bookNum),0)}setEmpty(t=le.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=ue.bookIdToNumber(t),this.chapter=n,this.verse=r}};ie($e,"defaultVersification",Vt.English),ie($e,"verseRangeSeparator","-"),ie($e,"verseSequenceIndicator",","),ie($e,"verseRangeSeparators",[$e.verseRangeSeparator]),ie($e,"verseSequenceIndicators",[$e.verseSequenceIndicator]),ie($e,"chapterDigitShifter",1e3),ie($e,"bookDigitShifter",$e.chapterDigitShifter*$e.chapterDigitShifter),ie($e,"bcvMaxValue",$e.chapterDigitShifter-1),ie($e,"ValidStatusType",ms);class rn extends Error{}function te(...e){return wl.twMerge(Te.clsx(e))}const hs=me.Root,vs=me.Trigger,Al=me.Group,Fl=me.Portal,Vl=me.Sub,Ll=me.RadioGroup,bs=I.forwardRef(({className:e,inset:t,children:n,...r},o)=>w.jsxs(me.SubTrigger,{ref:o,className:te("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,w.jsx(Ye.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));bs.displayName=me.SubTrigger.displayName;const ws=I.forwardRef(({className:e,...t},n)=>w.jsx(me.SubContent,{ref:n,className:te("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));ws.displayName=me.SubContent.displayName;const vo=I.forwardRef(({className:e,sideOffset:t=4,...n},r)=>w.jsx(me.Portal,{children:w.jsx(me.Content,{ref:r,sideOffset:t,className:te("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));vo.displayName=me.Content.displayName;const bo=I.forwardRef(({className:e,inset:t,...n},r)=>w.jsx(me.Item,{ref:r,className:te("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));bo.displayName=me.Item.displayName;const ys=I.forwardRef(({className:e,children:t,checked:n,...r},o)=>w.jsxs(me.CheckboxItem,{ref:o,className:te("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[w.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:w.jsx(me.ItemIndicator,{children:w.jsx(Ye.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));ys.displayName=me.CheckboxItem.displayName;const xs=I.forwardRef(({className:e,children:t,...n},r)=>w.jsxs(me.RadioItem,{ref:r,className:te("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[w.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:w.jsx(me.ItemIndicator,{children:w.jsx(Ye.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));xs.displayName=me.RadioItem.displayName;const sr=I.forwardRef(({className:e,inset:t,...n},r)=>w.jsx(me.Label,{ref:r,className:te("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));sr.displayName=me.Label.displayName;const wo=I.forwardRef(({className:e,...t},n)=>w.jsx(me.Separator,{ref:n,className:te("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));wo.displayName=me.Separator.displayName;function Ss({className:e,...t}){return w.jsx("span",{className:te("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Ss.displayName="DropdownMenuShortcut";const ar=I.forwardRef(({className:e,type:t,...n},r)=>w.jsx("input",{type:t,className:te("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));ar.displayName="Input";const Bl=I.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},i)=>w.jsxs("div",{className:"pr-relative",children:[w.jsx(ar,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r(),t(s)},onClick:n,ref:i}),w.jsx(Ye.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function zl({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const i=Array.from({length:t},(a,u)=>u+1),s=I.useCallback(a=>{o(a)},[o]);return w.jsx("div",{className:te("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:i.map(a=>w.jsx("div",{className:te("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":a===n,"pr-bg-amber-200":a===r}),onClick:u=>{u.preventDefault(),u.stopPropagation(),e(a)},role:"button",onKeyDown:u=>{u.key==="Enter"&&e(a)},tabIndex:0,onMouseMove:()=>s(a),children:a},a))})}const Hl=I.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:i,children:s},a)=>w.jsxs(bo,{ref:a,textValue:e,className:te("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:u=>{u.preventDefault(),t()},onKeyDown:u=>{o(u)},onFocus:r,onMouseMove:r,children:[w.jsx("span",{className:te("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":i.toLowerCase()==="ot","pr-border-l-purple-200":i.toLowerCase()==="nt","pr-border-l-indigo-200":i.toLowerCase()==="dc"}),children:ue.bookIdToEnglishName(e)}),n&&w.jsx("div",{children:s})]},e));function Gl({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return w.jsxs(sr,{className:"pr-flex pr-justify-between",children:[w.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),w.jsxs("div",{className:"pr-flex pr-items-center",children:[w.jsx(Ye.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),w.jsx(Ye.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),w.jsx(Ye.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const hn=ue.allBookIds,Ul={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ci=["OT","NT","DC"],ql=32+32+32,Wl=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Xl=e=>({OT:hn.filter(n=>ue.isBookOT(n)),NT:hn.filter(n=>ue.isBookNT(n)),DC:hn.filter(n=>ue.isBookDC(n))})[e],on=e=>Re.getChaptersForBook(ue.bookIdToNumber(e));function Yl(){return hn.map(t=>ue.bookIdToEnglishName(t))}function Kl(e){return Yl().includes(e)}function Jl(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(Kl(t))return hn.find(r=>ue.bookIdToEnglishName(r)===t)}function Zl({scrRef:e,handleSubmit:t}){const[n,r]=I.useState(""),[o,i]=I.useState(ue.bookNumberToId(e.bookNum)),[s,a]=I.useState(e.chapterNum??0),[u,c]=I.useState(ue.bookNumberToId(e.bookNum)),[d,g]=I.useState(!1),[p,f]=I.useState(d),h=I.useRef(void 0),m=I.useRef(void 0),v=I.useRef(void 0),y=I.useCallback(N=>Xl(N).filter(R=>{const k=ue.bookIdToEnglishName(R).toLowerCase(),$=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return k.includes($)||R.toLowerCase().includes($)}),[n]),P=N=>{r(N)},x=I.useRef(!1),S=I.useCallback(N=>{if(x.current){x.current=!1;return}g(N)},[]),b=I.useCallback((N,R,k,$)=>{if(a(ue.bookNumberToId(e.bookNum)!==N?1:e.chapterNum),R||on(N)===-1){t({bookNum:ue.bookIdToNumber(N),chapterNum:k||1,verseNum:$||1}),g(!1),r("");return}i(o!==N?N:""),g(!R)},[t,e.bookNum,e.chapterNum,o]),E=N=>{N<=0||N>on(o)||b(o,!0,N)},_=I.useCallback(()=>{Wl.forEach(N=>{const R=n.match(N);if(R){const[k,$=void 0,V=void 0]=R.slice(1),j=Jl(k);(ue.isBookIdValid(k)||j)&&b(j??k,!0,$?parseInt($,10):1,V?parseInt(V,10):1)}})},[b,n]),D=I.useCallback(N=>{d?(N.key==="ArrowDown"||N.key==="ArrowUp")&&(typeof v<"u"&&v.current!==null?v.current.focus():typeof m<"u"&&m.current!==null&&m.current.focus(),N.preventDefault()):g(!0)},[d]),A=N=>{const{key:R}=N;R==="ArrowRight"||R==="ArrowLeft"||R==="ArrowDown"||R==="ArrowUp"||R==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:R})),h.current.focus())},B=N=>{const{key:R}=N;if(u===o){if(R==="Enter"){N.preventDefault(),b(o,!0,s);return}let k=0;if(R==="ArrowRight")if(s<on(u))k=1;else{N.preventDefault();return}else if(R==="ArrowLeft")if(s>1)k=-1;else{N.preventDefault();return}else R==="ArrowDown"?k=6:R==="ArrowUp"&&(k=-6);s+k<=0||s+k>on(u)?a(0):k!==0&&(a(s+k),N.preventDefault())}};return I.useEffect(()=>{o===u?o===ue.bookNumberToId(e.bookNum)?a(e.chapterNum):a(1):a(0)},[u,e.bookNum,e.chapterNum,o]),I.useLayoutEffect(()=>{f(d)},[d]),I.useLayoutEffect(()=>{const N=setTimeout(()=>{if(p&&m.current&&v.current){const k=v.current.offsetTop-ql;m.current.scrollTo({top:k,behavior:"instant"})}},10);return()=>{clearTimeout(N)}},[p]),w.jsx("div",{className:"pr-flex",children:w.jsxs(hs,{modal:!1,open:d,onOpenChange:S,children:[w.jsx(vs,{asChild:!0,children:w.jsx(Bl,{ref:h,value:n,handleSearch:P,handleKeyDown:D,handleOnClick:()=>{i(ue.bookNumberToId(e.bookNum)),c(ue.bookNumberToId(e.bookNum)),a(e.chapterNum>0?e.chapterNum:0),g(!0),h.current.focus()},onFocus:()=>{x.current=!0},handleSubmit:_,placeholder:`${ue.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),w.jsxs(vo,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:A,align:"start",ref:m,children:[w.jsx(Gl,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),ci.map((N,R)=>y(N).length>0&&w.jsxs("div",{children:[w.jsx(sr,{className:"pr-font-semibold pr-text-slate-700",children:Ul[N]}),y(N).map(k=>w.jsx("div",{children:w.jsx(Hl,{bookId:k,handleSelectBook:()=>b(k,!1),isSelected:o===k,handleHighlightBook:()=>c(k),handleKeyDown:B,bookType:N,ref:$=>{o===k&&(v.current=$)},children:w.jsx(zl,{handleSelectChapter:E,endChapter:on(k),activeChapter:e.bookNum===ue.bookIdToNumber(k)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:$=>{a($)}})})},k)),ci.length-1!==R?w.jsx(wo,{}):void 0]},N))]})]})})}const Cs=ls.cva("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),Je=I.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},i)=>{const s=r?yl.Slot:"button";return w.jsx(s,{className:te(Cs({variant:t,size:n,className:e})),ref:i,...o})});Je.displayName="Button";function Kn({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:s,options:a=[],className:u,value:c,onChange:d,onFocus:g,onBlur:p,getOptionLabel:f}){return w.jsx(we.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:i,options:a,className:`papi-combo-box ${o?"error":""} ${u??""}`,value:c,onChange:d,onFocus:g,onBlur:p,getOptionLabel:f,renderInput:h=>w.jsx(we.TextField,{...h,error:o,fullWidth:i,disabled:n,label:t,style:{width:s}})})}function Ql({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,i]=I.useState(1),[s,a]=I.useState(r),[u,c]=I.useState(Array.from({length:r},(p,f)=>f+1));I.useEffect(()=>{i(1),e(1),a(r),t(r),c(Array.from({length:r},(p,f)=>f+1))},[r,t,e]);const d=(p,f)=>{i(f),e(f),f>s&&(a(f),t(f))},g=(p,f)=>{a(f),t(f),f<o&&(i(f),e(f))};return w.jsxs(w.Fragment,{children:[w.jsx(we.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:w.jsx(Kn,{onChange:(p,f)=>d(p,f),className:"book-selection-chapter",isClearable:!1,options:u,getOptionLabel:p=>p.toString(),value:o,isDisabled:n},"start chapter"),label:"Chapters",labelPlacement:"start"}),w.jsx(we.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:w.jsx(Kn,{onChange:(p,f)=>g(p,f),className:"book-selection-chapter",isClearable:!1,options:u,getOptionLabel:p=>p.toString(),value:s,isDisabled:n},"end chapter"),label:"to",labelPlacement:"start"})]})}var Et=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Et||{});function yo({id:e,isChecked:t,labelText:n="",labelPosition:r=Et.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:s=!1,hasError:a=!1,className:u,onChange:c}){const d=w.jsx(we.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:s,className:`papi-checkbox ${a?"error":""} ${u??""}`,onChange:c});let g;if(n){const p=r===Et.Before||r===Et.Above,f=w.jsx("span",{className:`papi-checkbox-label ${a?"error":""} ${u??""}`,children:n}),h=r===Et.Before||r===Et.After,m=h?f:w.jsx("div",{children:f}),v=h?d:w.jsx("div",{children:d});g=w.jsxs(we.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:a,children:[p&&m,v,!p&&m]})}else g=d;return g}function eu({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:i,createLabel:s}){return w.jsxs("fieldset",{id:e,className:t,children:[n&&w.jsx("legend",{children:n}),r.map(a=>w.jsx(yo,{className:"check-item",isChecked:o.includes(a),labelText:s?s(a):a,onChange:()=>i(a)},a))]})}function ge(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function T(){return T=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},T.apply(this,arguments)}function tu(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function nu(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Kr={exports:{}},Fn={exports:{}},ce={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var di;function ru(){if(di)return ce;di=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,a=e?Symbol.for("react.context"):60110,u=e?Symbol.for("react.async_mode"):60111,c=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,g=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,f=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,v=e?Symbol.for("react.fundamental"):60117,y=e?Symbol.for("react.responder"):60118,P=e?Symbol.for("react.scope"):60119;function x(b){if(typeof b=="object"&&b!==null){var E=b.$$typeof;switch(E){case t:switch(b=b.type,b){case u:case c:case r:case i:case o:case g:return b;default:switch(b=b&&b.$$typeof,b){case a:case d:case h:case f:case s:return b;default:return E}}case n:return E}}}function S(b){return x(b)===c}return ce.AsyncMode=u,ce.ConcurrentMode=c,ce.ContextConsumer=a,ce.ContextProvider=s,ce.Element=t,ce.ForwardRef=d,ce.Fragment=r,ce.Lazy=h,ce.Memo=f,ce.Portal=n,ce.Profiler=i,ce.StrictMode=o,ce.Suspense=g,ce.isAsyncMode=function(b){return S(b)||x(b)===u},ce.isConcurrentMode=S,ce.isContextConsumer=function(b){return x(b)===a},ce.isContextProvider=function(b){return x(b)===s},ce.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===t},ce.isForwardRef=function(b){return x(b)===d},ce.isFragment=function(b){return x(b)===r},ce.isLazy=function(b){return x(b)===h},ce.isMemo=function(b){return x(b)===f},ce.isPortal=function(b){return x(b)===n},ce.isProfiler=function(b){return x(b)===i},ce.isStrictMode=function(b){return x(b)===o},ce.isSuspense=function(b){return x(b)===g},ce.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===r||b===c||b===i||b===o||b===g||b===p||typeof b=="object"&&b!==null&&(b.$$typeof===h||b.$$typeof===f||b.$$typeof===s||b.$$typeof===a||b.$$typeof===d||b.$$typeof===v||b.$$typeof===y||b.$$typeof===P||b.$$typeof===m)},ce.typeOf=x,ce}var de={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pi;function ou(){return pi||(pi=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,a=e?Symbol.for("react.context"):60110,u=e?Symbol.for("react.async_mode"):60111,c=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,g=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,f=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,v=e?Symbol.for("react.fundamental"):60117,y=e?Symbol.for("react.responder"):60118,P=e?Symbol.for("react.scope"):60119;function x(F){return typeof F=="string"||typeof F=="function"||F===r||F===c||F===i||F===o||F===g||F===p||typeof F=="object"&&F!==null&&(F.$$typeof===h||F.$$typeof===f||F.$$typeof===s||F.$$typeof===a||F.$$typeof===d||F.$$typeof===v||F.$$typeof===y||F.$$typeof===P||F.$$typeof===m)}function S(F){if(typeof F=="object"&&F!==null){var ee=F.$$typeof;switch(ee){case t:var M=F.type;switch(M){case u:case c:case r:case i:case o:case g:return M;default:var ae=M&&M.$$typeof;switch(ae){case a:case d:case h:case f:case s:return ae;default:return ee}}case n:return ee}}}var b=u,E=c,_=a,D=s,A=t,B=d,N=r,R=h,k=f,$=n,V=i,j=o,z=g,re=!1;function ne(F){return re||(re=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),O(F)||S(F)===u}function O(F){return S(F)===c}function L(F){return S(F)===a}function G(F){return S(F)===s}function Y(F){return typeof F=="object"&&F!==null&&F.$$typeof===t}function H(F){return S(F)===d}function U(F){return S(F)===r}function W(F){return S(F)===h}function X(F){return S(F)===f}function q(F){return S(F)===n}function K(F){return S(F)===i}function Q(F){return S(F)===o}function se(F){return S(F)===g}de.AsyncMode=b,de.ConcurrentMode=E,de.ContextConsumer=_,de.ContextProvider=D,de.Element=A,de.ForwardRef=B,de.Fragment=N,de.Lazy=R,de.Memo=k,de.Portal=$,de.Profiler=V,de.StrictMode=j,de.Suspense=z,de.isAsyncMode=ne,de.isConcurrentMode=O,de.isContextConsumer=L,de.isContextProvider=G,de.isElement=Y,de.isForwardRef=H,de.isFragment=U,de.isLazy=W,de.isMemo=X,de.isPortal=q,de.isProfiler=K,de.isStrictMode=Q,de.isSuspense=se,de.isValidElementType=x,de.typeOf=S}()),de}var fi;function Es(){return fi||(fi=1,process.env.NODE_ENV==="production"?Fn.exports=ru():Fn.exports=ou()),Fn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var kr,gi;function iu(){if(gi)return kr;gi=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var s={},a=0;a<10;a++)s["_"+String.fromCharCode(a)]=a;var u=Object.getOwnPropertyNames(s).map(function(d){return s[d]});if(u.join("")!=="0123456789")return!1;var c={};return"abcdefghijklmnopqrst".split("").forEach(function(d){c[d]=d}),Object.keys(Object.assign({},c)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return kr=o()?Object.assign:function(i,s){for(var a,u=r(i),c,d=1;d<arguments.length;d++){a=Object(arguments[d]);for(var g in a)t.call(a,g)&&(u[g]=a[g]);if(e){c=e(a);for(var p=0;p<c.length;p++)n.call(a,c[p])&&(u[c[p]]=a[c[p]])}}return u},kr}var Tr,mi;function xo(){if(mi)return Tr;mi=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Tr=e,Tr}var Pr,hi;function Rs(){return hi||(hi=1,Pr=Function.call.bind(Object.prototype.hasOwnProperty)),Pr}var Or,vi;function su(){if(vi)return Or;vi=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=xo(),n={},r=Rs();e=function(i){var s="Warning: "+i;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(i,s,a,u,c){if(process.env.NODE_ENV!=="production"){for(var d in i)if(r(i,d)){var g;try{if(typeof i[d]!="function"){var p=Error((u||"React class")+": "+a+" type `"+d+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[d]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw p.name="Invariant Violation",p}g=i[d](s,d,u,a,null,t)}catch(h){g=h}if(g&&!(g instanceof Error)&&e((u||"React class")+": type specification of "+a+" `"+d+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof g+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),g instanceof Error&&!(g.message in n)){n[g.message]=!0;var f=c?c():"";e("Failed "+a+" type: "+g.message+(f??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Or=o,Or}var Nr,bi;function au(){if(bi)return Nr;bi=1;var e=Es(),t=iu(),n=xo(),r=Rs(),o=su(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(a){var u="Warning: "+a;typeof console<"u"&&console.error(u);try{throw new Error(u)}catch{}});function s(){return null}return Nr=function(a,u){var c=typeof Symbol=="function"&&Symbol.iterator,d="@@iterator";function g(O){var L=O&&(c&&O[c]||O[d]);if(typeof L=="function")return L}var p="<<anonymous>>",f={array:y("array"),bigint:y("bigint"),bool:y("boolean"),func:y("function"),number:y("number"),object:y("object"),string:y("string"),symbol:y("symbol"),any:P(),arrayOf:x,element:S(),elementType:b(),instanceOf:E,node:B(),objectOf:D,oneOf:_,oneOfType:A,shape:R,exact:k};function h(O,L){return O===L?O!==0||1/O===1/L:O!==O&&L!==L}function m(O,L){this.message=O,this.data=L&&typeof L=="object"?L:{},this.stack=""}m.prototype=Error.prototype;function v(O){if(process.env.NODE_ENV!=="production")var L={},G=0;function Y(U,W,X,q,K,Q,se){if(q=q||p,Q=Q||X,se!==n){if(u){var F=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw F.name="Invariant Violation",F}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var ee=q+":"+X;!L[ee]&&G<3&&(i("You are manually calling a React.PropTypes validation function for the `"+Q+"` prop on `"+q+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),L[ee]=!0,G++)}}return W[X]==null?U?W[X]===null?new m("The "+K+" `"+Q+"` is marked as required "+("in `"+q+"`, but its value is `null`.")):new m("The "+K+" `"+Q+"` is marked as required in "+("`"+q+"`, but its value is `undefined`.")):null:O(W,X,q,K,Q)}var H=Y.bind(null,!1);return H.isRequired=Y.bind(null,!0),H}function y(O){function L(G,Y,H,U,W,X){var q=G[Y],K=j(q);if(K!==O){var Q=z(q);return new m("Invalid "+U+" `"+W+"` of type "+("`"+Q+"` supplied to `"+H+"`, expected ")+("`"+O+"`."),{expectedType:O})}return null}return v(L)}function P(){return v(s)}function x(O){function L(G,Y,H,U,W){if(typeof O!="function")return new m("Property `"+W+"` of component `"+H+"` has invalid PropType notation inside arrayOf.");var X=G[Y];if(!Array.isArray(X)){var q=j(X);return new m("Invalid "+U+" `"+W+"` of type "+("`"+q+"` supplied to `"+H+"`, expected an array."))}for(var K=0;K<X.length;K++){var Q=O(X,K,H,U,W+"["+K+"]",n);if(Q instanceof Error)return Q}return null}return v(L)}function S(){function O(L,G,Y,H,U){var W=L[G];if(!a(W)){var X=j(W);return new m("Invalid "+H+" `"+U+"` of type "+("`"+X+"` supplied to `"+Y+"`, expected a single ReactElement."))}return null}return v(O)}function b(){function O(L,G,Y,H,U){var W=L[G];if(!e.isValidElementType(W)){var X=j(W);return new m("Invalid "+H+" `"+U+"` of type "+("`"+X+"` supplied to `"+Y+"`, expected a single ReactElement type."))}return null}return v(O)}function E(O){function L(G,Y,H,U,W){if(!(G[Y]instanceof O)){var X=O.name||p,q=ne(G[Y]);return new m("Invalid "+U+" `"+W+"` of type "+("`"+q+"` supplied to `"+H+"`, expected ")+("instance of `"+X+"`."))}return null}return v(L)}function _(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),s;function L(G,Y,H,U,W){for(var X=G[Y],q=0;q<O.length;q++)if(h(X,O[q]))return null;var K=JSON.stringify(O,function(se,F){var ee=z(F);return ee==="symbol"?String(F):F});return new m("Invalid "+U+" `"+W+"` of value `"+String(X)+"` "+("supplied to `"+H+"`, expected one of "+K+"."))}return v(L)}function D(O){function L(G,Y,H,U,W){if(typeof O!="function")return new m("Property `"+W+"` of component `"+H+"` has invalid PropType notation inside objectOf.");var X=G[Y],q=j(X);if(q!=="object")return new m("Invalid "+U+" `"+W+"` of type "+("`"+q+"` supplied to `"+H+"`, expected an object."));for(var K in X)if(r(X,K)){var Q=O(X,K,H,U,W+"."+K,n);if(Q instanceof Error)return Q}return null}return v(L)}function A(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var L=0;L<O.length;L++){var G=O[L];if(typeof G!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+re(G)+" at index "+L+"."),s}function Y(H,U,W,X,q){for(var K=[],Q=0;Q<O.length;Q++){var se=O[Q],F=se(H,U,W,X,q,n);if(F==null)return null;F.data&&r(F.data,"expectedType")&&K.push(F.data.expectedType)}var ee=K.length>0?", expected one of type ["+K.join(", ")+"]":"";return new m("Invalid "+X+" `"+q+"` supplied to "+("`"+W+"`"+ee+"."))}return v(Y)}function B(){function O(L,G,Y,H,U){return $(L[G])?null:new m("Invalid "+H+" `"+U+"` supplied to "+("`"+Y+"`, expected a ReactNode."))}return v(O)}function N(O,L,G,Y,H){return new m((O||"React class")+": "+L+" type `"+G+"."+Y+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+H+"`.")}function R(O){function L(G,Y,H,U,W){var X=G[Y],q=j(X);if(q!=="object")return new m("Invalid "+U+" `"+W+"` of type `"+q+"` "+("supplied to `"+H+"`, expected `object`."));for(var K in O){var Q=O[K];if(typeof Q!="function")return N(H,U,W,K,z(Q));var se=Q(X,K,H,U,W+"."+K,n);if(se)return se}return null}return v(L)}function k(O){function L(G,Y,H,U,W){var X=G[Y],q=j(X);if(q!=="object")return new m("Invalid "+U+" `"+W+"` of type `"+q+"` "+("supplied to `"+H+"`, expected `object`."));var K=t({},G[Y],O);for(var Q in K){var se=O[Q];if(r(O,Q)&&typeof se!="function")return N(H,U,W,Q,z(se));if(!se)return new m("Invalid "+U+" `"+W+"` key `"+Q+"` supplied to `"+H+"`.\nBad object: "+JSON.stringify(G[Y],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(O),null,"  "));var F=se(X,Q,H,U,W+"."+Q,n);if(F)return F}return null}return v(L)}function $(O){switch(typeof O){case"number":case"string":case"undefined":return!0;case"boolean":return!O;case"object":if(Array.isArray(O))return O.every($);if(O===null||a(O))return!0;var L=g(O);if(L){var G=L.call(O),Y;if(L!==O.entries){for(;!(Y=G.next()).done;)if(!$(Y.value))return!1}else for(;!(Y=G.next()).done;){var H=Y.value;if(H&&!$(H[1]))return!1}}else return!1;return!0;default:return!1}}function V(O,L){return O==="symbol"?!0:L?L["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&L instanceof Symbol:!1}function j(O){var L=typeof O;return Array.isArray(O)?"array":O instanceof RegExp?"object":V(L,O)?"symbol":L}function z(O){if(typeof O>"u"||O===null)return""+O;var L=j(O);if(L==="object"){if(O instanceof Date)return"date";if(O instanceof RegExp)return"regexp"}return L}function re(O){var L=z(O);switch(L){case"array":case"object":return"an "+L;case"boolean":case"date":case"regexp":return"a "+L;default:return L}}function ne(O){return!O.constructor||!O.constructor.name?p:O.constructor.name}return f.checkPropTypes=o,f.resetWarningCache=o.resetWarningCache,f.PropTypes=f,f},Nr}var _r,wi;function lu(){if(wi)return _r;wi=1;var e=xo();function t(){}function n(){}return n.resetWarningCache=t,_r=function(){function r(s,a,u,c,d,g){if(g!==e){var p=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw p.name="Invariant Violation",p}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},_r}if(process.env.NODE_ENV!=="production"){var uu=Es(),cu=!0;Kr.exports=au()(uu.isElement,cu)}else Kr.exports=lu()();var du=Kr.exports;const l=tu(du);function Jt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function Rt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function ks(e){if(!Rt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=ks(e[n])}),t}function st(e,t,n={clone:!0}){const r=n.clone?T({},e):e;return Rt(e)&&Rt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Rt(t[o])&&o in e&&Rt(e[o])?r[o]=st(e[o],t[o],n):n.clone?r[o]=Rt(t[o])?ks(t[o]):t[o]:r[o]=t[o])}),r}function pu(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ts(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let a;const u=i.type;return typeof u=="function"&&!pu(u)&&(a="Did you accidentally use a plain function component for an element instead?"),a!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ps=Jt(l.element,Ts);Ps.isRequired=Jt(l.element.isRequired,Ts);const Pn=Ps;function fu(e){const{prototype:t={}}=e;return!!t.isReactComponent}function gu(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let a;return typeof i=="function"&&!fu(i)&&(a="Did you accidentally provide a plain function component instead?"),a!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const mu=Jt(l.elementType,gu),hu="exact-prop: ​";function Os(e){return process.env.NODE_ENV==="production"?e:T({},e,{[hu]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Ht(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Jr={exports:{}},pe={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yi;function vu(){if(yi)return pe;yi=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),a=Symbol.for("react.server_context"),u=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),g=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),f=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function m(v){if(typeof v=="object"&&v!==null){var y=v.$$typeof;switch(y){case e:switch(v=v.type,v){case n:case o:case r:case c:case d:return v;default:switch(v=v&&v.$$typeof,v){case a:case s:case u:case p:case g:case i:return v;default:return y}}case t:return y}}}return pe.ContextConsumer=s,pe.ContextProvider=i,pe.Element=e,pe.ForwardRef=u,pe.Fragment=n,pe.Lazy=p,pe.Memo=g,pe.Portal=t,pe.Profiler=o,pe.StrictMode=r,pe.Suspense=c,pe.SuspenseList=d,pe.isAsyncMode=function(){return!1},pe.isConcurrentMode=function(){return!1},pe.isContextConsumer=function(v){return m(v)===s},pe.isContextProvider=function(v){return m(v)===i},pe.isElement=function(v){return typeof v=="object"&&v!==null&&v.$$typeof===e},pe.isForwardRef=function(v){return m(v)===u},pe.isFragment=function(v){return m(v)===n},pe.isLazy=function(v){return m(v)===p},pe.isMemo=function(v){return m(v)===g},pe.isPortal=function(v){return m(v)===t},pe.isProfiler=function(v){return m(v)===o},pe.isStrictMode=function(v){return m(v)===r},pe.isSuspense=function(v){return m(v)===c},pe.isSuspenseList=function(v){return m(v)===d},pe.isValidElementType=function(v){return typeof v=="string"||typeof v=="function"||v===n||v===o||v===r||v===c||v===d||v===f||typeof v=="object"&&v!==null&&(v.$$typeof===p||v.$$typeof===g||v.$$typeof===i||v.$$typeof===s||v.$$typeof===u||v.$$typeof===h||v.getModuleId!==void 0)},pe.typeOf=m,pe}var fe={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xi;function bu(){return xi||(xi=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),a=Symbol.for("react.server_context"),u=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),g=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),f=Symbol.for("react.offscreen"),h=!1,m=!1,v=!1,y=!1,P=!1,x;x=Symbol.for("react.module.reference");function S(M){return!!(typeof M=="string"||typeof M=="function"||M===n||M===o||P||M===r||M===c||M===d||y||M===f||h||m||v||typeof M=="object"&&M!==null&&(M.$$typeof===p||M.$$typeof===g||M.$$typeof===i||M.$$typeof===s||M.$$typeof===u||M.$$typeof===x||M.getModuleId!==void 0))}function b(M){if(typeof M=="object"&&M!==null){var ae=M.$$typeof;switch(ae){case e:var Ce=M.type;switch(Ce){case n:case o:case r:case c:case d:return Ce;default:var Ne=Ce&&Ce.$$typeof;switch(Ne){case a:case s:case u:case p:case g:case i:return Ne;default:return ae}}case t:return ae}}}var E=s,_=i,D=e,A=u,B=n,N=p,R=g,k=t,$=o,V=r,j=c,z=d,re=!1,ne=!1;function O(M){return re||(re=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function L(M){return ne||(ne=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function G(M){return b(M)===s}function Y(M){return b(M)===i}function H(M){return typeof M=="object"&&M!==null&&M.$$typeof===e}function U(M){return b(M)===u}function W(M){return b(M)===n}function X(M){return b(M)===p}function q(M){return b(M)===g}function K(M){return b(M)===t}function Q(M){return b(M)===o}function se(M){return b(M)===r}function F(M){return b(M)===c}function ee(M){return b(M)===d}fe.ContextConsumer=E,fe.ContextProvider=_,fe.Element=D,fe.ForwardRef=A,fe.Fragment=B,fe.Lazy=N,fe.Memo=R,fe.Portal=k,fe.Profiler=$,fe.StrictMode=V,fe.Suspense=j,fe.SuspenseList=z,fe.isAsyncMode=O,fe.isConcurrentMode=L,fe.isContextConsumer=G,fe.isContextProvider=Y,fe.isElement=H,fe.isForwardRef=U,fe.isFragment=W,fe.isLazy=X,fe.isMemo=q,fe.isPortal=K,fe.isProfiler=Q,fe.isStrictMode=se,fe.isSuspense=F,fe.isSuspenseList=ee,fe.isValidElementType=S,fe.typeOf=b}()),fe}process.env.NODE_ENV==="production"?Jr.exports=vu():Jr.exports=bu();var Jn=Jr.exports;const wu=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function yu(e){const t=`${e}`.match(wu);return t&&t[1]||""}function Ns(e,t=""){return e.displayName||e.name||yu(e)||t}function Si(e,t,n){const r=Ns(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function xu(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Ns(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Jn.ForwardRef:return Si(e,e.render,"ForwardRef");case Jn.Memo:return Si(e,e.type,"memo");default:return}}}function at(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],s=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Su=l.oneOfType([l.func,l.object]),So=Su;function Qe(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Ht(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Zr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function _s(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function Cu(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,s)=>{const a=o||"<<anonymous>>",u=s||r;return typeof n[r]<"u"?new Error(`The ${i} \`${u}\` of \`${a}\` is deprecated. ${t}`):null}}function Eu(e,t){var n,r;return C.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Pe(e){return e&&e.ownerDocument||document}function Gt(e){return Pe(e).defaultView||window}function Ru(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?T({},t.propTypes):null;return o=>(i,s,a,u,c,...d)=>{const g=c||s,p=n==null?void 0:n[g];if(p){const f=p(i,s,a,u,c,...d);if(f)return f}return typeof i[s]<"u"&&!i[o]?new Error(`The prop \`${g}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Zn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const ku=typeof window<"u"?C.useLayoutEffect:C.useEffect,Pt=ku;let Ci=0;function Tu(e){const[t,n]=C.useState(e),r=e||t;return C.useEffect(()=>{t==null&&(Ci+=1,n(`mui-${Ci}`))},[t]),r}const Ei=C["useId".toString()];function $s(e){if(Ei!==void 0){const t=Ei();return e??t}return Tu(e)}function Pu(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function Ms({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=C.useRef(e!==void 0),[i,s]=C.useState(t),a=o?e:i;if(process.env.NODE_ENV!=="production"){C.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:c}=C.useRef(t);C.useEffect(()=>{!o&&c!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const u=C.useCallback(c=>{o||s(c)},[]);return[a,u]}function Sn(e){const t=C.useRef(e);return Pt(()=>{t.current=e}),C.useRef((...n)=>(0,t.current)(...n)).current}function Ue(...e){return C.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Zn(n,t)})},e)}const Ri={};function Ou(e,t){const n=C.useRef(Ri);return n.current===Ri&&(n.current=e(t)),n}const Nu=[];function _u(e){C.useEffect(e,Nu)}class On{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new On}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function pn(){const e=Ou(On.create).current;return _u(e.disposeEffect),e}let lr=!0,Qr=!1;const $u=new On,Mu={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Iu(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Mu[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function ju(e){e.metaKey||e.altKey||e.ctrlKey||(lr=!0)}function $r(){lr=!1}function Du(){this.visibilityState==="hidden"&&Qr&&(lr=!0)}function Au(e){e.addEventListener("keydown",ju,!0),e.addEventListener("mousedown",$r,!0),e.addEventListener("pointerdown",$r,!0),e.addEventListener("touchstart",$r,!0),e.addEventListener("visibilitychange",Du,!0)}function Fu(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return lr||Iu(t)}function Is(){const e=C.useCallback(o=>{o!=null&&Au(o.ownerDocument)},[]),t=C.useRef(!1);function n(){return t.current?(Qr=!0,$u.start(100,()=>{Qr=!1}),t.current=!1,!0):!1}function r(o){return Fu(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function js(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Vu(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function Lu(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Bu=Number.isInteger||Lu;function Ds(e,t,n,r){const o=e[t];if(o==null||!Bu(o)){const i=Vu(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function As(e,t,...n){return e[t]===void 0?null:Ds(e,t,...n)}function eo(){return null}As.isRequired=Ds;eo.isRequired=eo;const Fs=process.env.NODE_ENV==="production"?eo:As;function Vs(e,t){const n=T({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=T({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=T({},i),Object.keys(o).forEach(s=>{n[r][s]=Vs(o[s],i[s])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function ct(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,s)=>{if(s){const a=t(s);a!==""&&i.push(a),n&&n[s]&&i.push(n[s])}return i},[]).join(" ")}),r}const ki=e=>e,zu=()=>{let e=ki;return{configure(t){e=t},generate(t){return e(t)},reset(){e=ki}}},Hu=zu(),Ls=Hu,Bs={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function tt(e,t,n="Mui"){const r=Bs[t];return r?`${n}-${r}`:`${Ls.generate(e)}-${t}`}function vt(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=tt(e,o,n)}),r}function Gu(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function zs(e){return typeof e=="string"}function fn(e,t,n){return e===void 0||zs(e)?t:T({},t,{ownerState:T({},t.ownerState,n)})}const Uu={disableDefaultClasses:!1},qu=C.createContext(Uu);function Wu(e){const{disableDefaultClasses:t}=C.useContext(qu);return n=>t?"":e(n)}function Hs(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function Xu(e,t,n){return typeof e=="function"?e(t,n):e}function Ti(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function Yu(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const f=Te(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),h=T({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),m=T({},n,o,r);return f.length>0&&(m.className=f),Object.keys(h).length>0&&(m.style=h),{props:m,internalRef:void 0}}const s=Hs(T({},o,r)),a=Ti(r),u=Ti(o),c=t(s),d=Te(c==null?void 0:c.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),g=T({},c==null?void 0:c.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),p=T({},c,n,u,a);return d.length>0&&(p.className=d),Object.keys(g).length>0&&(p.style=g),{props:p,internalRef:c.ref}}const Ku=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Ot(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,s=ge(e,Ku),a=i?{}:Xu(r,o),{props:u,internalRef:c}=Yu(T({},s,{externalSlotProps:a})),d=Ue(c,a==null?void 0:a.ref,(t=e.additionalProps)==null?void 0:t.ref);return fn(n,T({},u,{ref:d}),o)}const Gs="base";function Ju(e){return`${Gs}--${e}`}function Zu(e,t){return`${Gs}-${e}-${t}`}function Us(e,t){const n=Bs[t];return n?Ju(n):Zu(e,t)}function Qu(e,t){const n={};return t.forEach(r=>{n[r]=Us(e,r)}),n}const ec=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function tc(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function nc(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function rc(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||nc(e))}function oc(e){const t=[],n=[];return Array.from(e.querySelectorAll(ec)).forEach((r,o)=>{const i=tc(r);i===-1||!rc(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function ic(){return!0}function Qn(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=oc,isEnabled:s=ic,open:a}=e,u=C.useRef(!1),c=C.useRef(null),d=C.useRef(null),g=C.useRef(null),p=C.useRef(null),f=C.useRef(!1),h=C.useRef(null),m=Ue(t.ref,h),v=C.useRef(null);C.useEffect(()=>{!a||!h.current||(f.current=!n)},[n,a]),C.useEffect(()=>{if(!a||!h.current)return;const x=Pe(h.current);return h.current.contains(x.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),f.current&&h.current.focus()),()=>{o||(g.current&&g.current.focus&&(u.current=!0,g.current.focus()),g.current=null)}},[a]),C.useEffect(()=>{if(!a||!h.current)return;const x=Pe(h.current),S=_=>{v.current=_,!(r||!s()||_.key!=="Tab")&&x.activeElement===h.current&&_.shiftKey&&(u.current=!0,d.current&&d.current.focus())},b=()=>{const _=h.current;if(_===null)return;if(!x.hasFocus()||!s()||u.current){u.current=!1;return}if(_.contains(x.activeElement)||r&&x.activeElement!==c.current&&x.activeElement!==d.current)return;if(x.activeElement!==p.current)p.current=null;else if(p.current!==null)return;if(!f.current)return;let D=[];if((x.activeElement===c.current||x.activeElement===d.current)&&(D=i(h.current)),D.length>0){var A,B;const N=!!((A=v.current)!=null&&A.shiftKey&&((B=v.current)==null?void 0:B.key)==="Tab"),R=D[0],k=D[D.length-1];typeof R!="string"&&typeof k!="string"&&(N?k.focus():R.focus())}else _.focus()};x.addEventListener("focusin",b),x.addEventListener("keydown",S,!0);const E=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&b()},50);return()=>{clearInterval(E),x.removeEventListener("focusin",b),x.removeEventListener("keydown",S,!0)}},[n,r,o,s,a,i]);const y=x=>{g.current===null&&(g.current=x.relatedTarget),f.current=!0,p.current=x.target;const S=t.props.onFocus;S&&S(x)},P=x=>{g.current===null&&(g.current=x.relatedTarget),f.current=!0};return w.jsxs(C.Fragment,{children:[w.jsx("div",{tabIndex:a?0:-1,onFocus:P,ref:c,"data-testid":"sentinelStart"}),C.cloneElement(t,{ref:m,onFocus:y}),w.jsx("div",{tabIndex:a?0:-1,onFocus:P,ref:d,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(Qn.propTypes={children:Pn,disableAutoFocus:l.bool,disableEnforceFocus:l.bool,disableRestoreFocus:l.bool,getTabbable:l.func,isEnabled:l.func,open:l.bool.isRequired});process.env.NODE_ENV!=="production"&&(Qn["propTypes"]=Os(Qn.propTypes));function sc(e){return typeof e=="function"?e():e}const Cn=C.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[s,a]=C.useState(null),u=Ue(C.isValidElement(r)?r.ref:null,n);if(Pt(()=>{i||a(sc(o)||document.body)},[o,i]),Pt(()=>{if(s&&!i)return Zn(n,s),()=>{Zn(n,null)}},[n,s,i]),i){if(C.isValidElement(r)){const c={ref:u};return C.cloneElement(r,c)}return w.jsx(C.Fragment,{children:r})}return w.jsx(C.Fragment,{children:s&&El.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&(Cn.propTypes={children:l.node,container:l.oneOfType([at,l.func]),disablePortal:l.bool});process.env.NODE_ENV!=="production"&&(Cn["propTypes"]=Os(Cn.propTypes));function ac(e){const t=Pe(e);return t.body===e?Gt(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function vn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Pi(e){return parseInt(Gt(e).getComputedStyle(e).paddingRight,10)||0}function lc(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Oi(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,s=>{const a=i.indexOf(s)===-1,u=!lc(s);a&&u&&vn(s,o)})}function Mr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function uc(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(ac(r)){const s=js(Pe(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Pi(r)+s}px`;const a=Pe(r).querySelectorAll(".mui-fixed");[].forEach.call(a,u=>{n.push({value:u.style.paddingRight,property:"padding-right",el:u}),u.style.paddingRight=`${Pi(u)+s}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=Pe(r).body;else{const s=r.parentElement,a=Gt(r);i=(s==null?void 0:s.nodeName)==="HTML"&&a.getComputedStyle(s).overflowY==="scroll"?s:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:s,property:a})=>{i?s.style.setProperty(a,i):s.style.removeProperty(a)})}}function cc(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class dc{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&vn(t.modalRef,!1);const o=cc(n);Oi(n,t.mount,t.modalRef,o,!0);const i=Mr(this.containers,s=>s.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=Mr(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=uc(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=Mr(this.containers,s=>s.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&vn(t.modalRef,n),Oi(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=i.modals[i.modals.length-1];s.modalRef&&vn(s.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function pc(e){return typeof e=="function"?e():e}function fc(e){return e?e.props.hasOwnProperty("in"):!1}const gc=new dc;function mc(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=gc,closeAfterTransition:i=!1,onTransitionEnter:s,onTransitionExited:a,children:u,onClose:c,open:d,rootRef:g}=e,p=C.useRef({}),f=C.useRef(null),h=C.useRef(null),m=Ue(h,g),[v,y]=C.useState(!d),P=fc(u);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const S=()=>Pe(f.current),b=()=>(p.current.modalRef=h.current,p.current.mount=f.current,p.current),E=()=>{o.mount(b(),{disableScrollLock:r}),h.current&&(h.current.scrollTop=0)},_=Sn(()=>{const j=pc(t)||S().body;o.add(b(),j),h.current&&E()}),D=C.useCallback(()=>o.isTopModal(b()),[o]),A=Sn(j=>{f.current=j,j&&(d&&D()?E():h.current&&vn(h.current,x))}),B=C.useCallback(()=>{o.remove(b(),x)},[x,o]);C.useEffect(()=>()=>{B()},[B]),C.useEffect(()=>{d?_():(!P||!i)&&B()},[d,B,P,i,_]);const N=j=>z=>{var re;(re=j.onKeyDown)==null||re.call(j,z),!(z.key!=="Escape"||z.which===229||!D())&&(n||(z.stopPropagation(),c&&c(z,"escapeKeyDown")))},R=j=>z=>{var re;(re=j.onClick)==null||re.call(j,z),z.target===z.currentTarget&&c&&c(z,"backdropClick")};return{getRootProps:(j={})=>{const z=Hs(e);delete z.onTransitionEnter,delete z.onTransitionExited;const re=T({},z,j);return T({role:"presentation"},re,{onKeyDown:N(re),ref:m})},getBackdropProps:(j={})=>{const z=j;return T({"aria-hidden":!0},z,{onClick:R(z),open:d})},getTransitionProps:()=>{const j=()=>{y(!1),s&&s()},z=()=>{y(!0),a&&a(),i&&B()};return{onEnter:Zr(j,u==null?void 0:u.props.onEnter),onExited:Zr(z,u==null?void 0:u.props.onExited)}},rootRef:m,portalRef:A,isTopModal:D,exited:v,hasTransition:P}}var Me="top",qe="bottom",We="right",Ie="left",Co="auto",Nn=[Me,qe,We,Ie],Ut="start",En="end",hc="clippingParents",qs="viewport",sn="popper",vc="reference",Ni=Nn.reduce(function(e,t){return e.concat([t+"-"+Ut,t+"-"+En])},[]),Ws=[].concat(Nn,[Co]).reduce(function(e,t){return e.concat([t,t+"-"+Ut,t+"-"+En])},[]),bc="beforeRead",wc="read",yc="afterRead",xc="beforeMain",Sc="main",Cc="afterMain",Ec="beforeWrite",Rc="write",kc="afterWrite",Tc=[bc,wc,yc,xc,Sc,Cc,Ec,Rc,kc];function et(e){return e?(e.nodeName||"").toLowerCase():null}function Le(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Nt(e){var t=Le(e).Element;return e instanceof t||e instanceof Element}function Ge(e){var t=Le(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Eo(e){if(typeof ShadowRoot>"u")return!1;var t=Le(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Pc(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!Ge(i)||!et(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(s){var a=o[s];a===!1?i.removeAttribute(s):i.setAttribute(s,a===!0?"":a)}))})}function Oc(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},s=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),a=s.reduce(function(u,c){return u[c]="",u},{});!Ge(o)||!et(o)||(Object.assign(o.style,a),Object.keys(i).forEach(function(u){o.removeAttribute(u)}))})}}const Nc={name:"applyStyles",enabled:!0,phase:"write",fn:Pc,effect:Oc,requires:["computeStyles"]};function Ze(e){return e.split("-")[0]}var kt=Math.max,er=Math.min,qt=Math.round;function to(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Xs(){return!/^((?!chrome|android).)*safari/i.test(to())}function Wt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&Ge(e)&&(o=e.offsetWidth>0&&qt(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&qt(r.height)/e.offsetHeight||1);var s=Nt(e)?Le(e):window,a=s.visualViewport,u=!Xs()&&n,c=(r.left+(u&&a?a.offsetLeft:0))/o,d=(r.top+(u&&a?a.offsetTop:0))/i,g=r.width/o,p=r.height/i;return{width:g,height:p,top:d,right:c+g,bottom:d+p,left:c,x:c,y:d}}function Ro(e){var t=Wt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Ys(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Eo(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function lt(e){return Le(e).getComputedStyle(e)}function _c(e){return["table","td","th"].indexOf(et(e))>=0}function bt(e){return((Nt(e)?e.ownerDocument:e.document)||window.document).documentElement}function ur(e){return et(e)==="html"?e:e.assignedSlot||e.parentNode||(Eo(e)?e.host:null)||bt(e)}function _i(e){return!Ge(e)||lt(e).position==="fixed"?null:e.offsetParent}function $c(e){var t=/firefox/i.test(to()),n=/Trident/i.test(to());if(n&&Ge(e)){var r=lt(e);if(r.position==="fixed")return null}var o=ur(e);for(Eo(o)&&(o=o.host);Ge(o)&&["html","body"].indexOf(et(o))<0;){var i=lt(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function _n(e){for(var t=Le(e),n=_i(e);n&&_c(n)&&lt(n).position==="static";)n=_i(n);return n&&(et(n)==="html"||et(n)==="body"&&lt(n).position==="static")?t:n||$c(e)||t}function ko(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function bn(e,t,n){return kt(e,er(t,n))}function Mc(e,t,n){var r=bn(e,t,n);return r>n?n:r}function Ks(){return{top:0,right:0,bottom:0,left:0}}function Js(e){return Object.assign({},Ks(),e)}function Zs(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Ic=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Js(typeof t!="number"?t:Zs(t,Nn))};function jc(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,s=n.modifiersData.popperOffsets,a=Ze(n.placement),u=ko(a),c=[Ie,We].indexOf(a)>=0,d=c?"height":"width";if(!(!i||!s)){var g=Ic(o.padding,n),p=Ro(i),f=u==="y"?Me:Ie,h=u==="y"?qe:We,m=n.rects.reference[d]+n.rects.reference[u]-s[u]-n.rects.popper[d],v=s[u]-n.rects.reference[u],y=_n(i),P=y?u==="y"?y.clientHeight||0:y.clientWidth||0:0,x=m/2-v/2,S=g[f],b=P-p[d]-g[h],E=P/2-p[d]/2+x,_=bn(S,E,b),D=u;n.modifiersData[r]=(t={},t[D]=_,t.centerOffset=_-E,t)}}function Dc(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Ys(t.elements.popper,o)&&(t.elements.arrow=o))}const Ac={name:"arrow",enabled:!0,phase:"main",fn:jc,effect:Dc,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Xt(e){return e.split("-")[1]}var Fc={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Vc(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:qt(n*o)/o||0,y:qt(r*o)/o||0}}function $i(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,s=e.offsets,a=e.position,u=e.gpuAcceleration,c=e.adaptive,d=e.roundOffsets,g=e.isFixed,p=s.x,f=p===void 0?0:p,h=s.y,m=h===void 0?0:h,v=typeof d=="function"?d({x:f,y:m}):{x:f,y:m};f=v.x,m=v.y;var y=s.hasOwnProperty("x"),P=s.hasOwnProperty("y"),x=Ie,S=Me,b=window;if(c){var E=_n(n),_="clientHeight",D="clientWidth";if(E===Le(n)&&(E=bt(n),lt(E).position!=="static"&&a==="absolute"&&(_="scrollHeight",D="scrollWidth")),E=E,o===Me||(o===Ie||o===We)&&i===En){S=qe;var A=g&&E===b&&b.visualViewport?b.visualViewport.height:E[_];m-=A-r.height,m*=u?1:-1}if(o===Ie||(o===Me||o===qe)&&i===En){x=We;var B=g&&E===b&&b.visualViewport?b.visualViewport.width:E[D];f-=B-r.width,f*=u?1:-1}}var N=Object.assign({position:a},c&&Fc),R=d===!0?Vc({x:f,y:m},Le(n)):{x:f,y:m};if(f=R.x,m=R.y,u){var k;return Object.assign({},N,(k={},k[S]=P?"0":"",k[x]=y?"0":"",k.transform=(b.devicePixelRatio||1)<=1?"translate("+f+"px, "+m+"px)":"translate3d("+f+"px, "+m+"px, 0)",k))}return Object.assign({},N,(t={},t[S]=P?m+"px":"",t[x]=y?f+"px":"",t.transform="",t))}function Lc(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,s=i===void 0?!0:i,a=n.roundOffsets,u=a===void 0?!0:a,c={placement:Ze(t.placement),variation:Xt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,$i(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:u})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,$i(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:u})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Bc={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Lc,data:{}};var Vn={passive:!0};function zc(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,s=r.resize,a=s===void 0?!0:s,u=Le(t.elements.popper),c=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&c.forEach(function(d){d.addEventListener("scroll",n.update,Vn)}),a&&u.addEventListener("resize",n.update,Vn),function(){i&&c.forEach(function(d){d.removeEventListener("scroll",n.update,Vn)}),a&&u.removeEventListener("resize",n.update,Vn)}}const Hc={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:zc,data:{}};var Gc={left:"right",right:"left",bottom:"top",top:"bottom"};function qn(e){return e.replace(/left|right|bottom|top/g,function(t){return Gc[t]})}var Uc={start:"end",end:"start"};function Mi(e){return e.replace(/start|end/g,function(t){return Uc[t]})}function To(e){var t=Le(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Po(e){return Wt(bt(e)).left+To(e).scrollLeft}function qc(e,t){var n=Le(e),r=bt(e),o=n.visualViewport,i=r.clientWidth,s=r.clientHeight,a=0,u=0;if(o){i=o.width,s=o.height;var c=Xs();(c||!c&&t==="fixed")&&(a=o.offsetLeft,u=o.offsetTop)}return{width:i,height:s,x:a+Po(e),y:u}}function Wc(e){var t,n=bt(e),r=To(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=kt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=kt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),a=-r.scrollLeft+Po(e),u=-r.scrollTop;return lt(o||n).direction==="rtl"&&(a+=kt(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:s,x:a,y:u}}function Oo(e){var t=lt(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Qs(e){return["html","body","#document"].indexOf(et(e))>=0?e.ownerDocument.body:Ge(e)&&Oo(e)?e:Qs(ur(e))}function wn(e,t){var n;t===void 0&&(t=[]);var r=Qs(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=Le(r),s=o?[i].concat(i.visualViewport||[],Oo(r)?r:[]):r,a=t.concat(s);return o?a:a.concat(wn(ur(s)))}function no(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Xc(e,t){var n=Wt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Ii(e,t,n){return t===qs?no(qc(e,n)):Nt(t)?Xc(t,n):no(Wc(bt(e)))}function Yc(e){var t=wn(ur(e)),n=["absolute","fixed"].indexOf(lt(e).position)>=0,r=n&&Ge(e)?_n(e):e;return Nt(r)?t.filter(function(o){return Nt(o)&&Ys(o,r)&&et(o)!=="body"}):[]}function Kc(e,t,n,r){var o=t==="clippingParents"?Yc(e):[].concat(t),i=[].concat(o,[n]),s=i[0],a=i.reduce(function(u,c){var d=Ii(e,c,r);return u.top=kt(d.top,u.top),u.right=er(d.right,u.right),u.bottom=er(d.bottom,u.bottom),u.left=kt(d.left,u.left),u},Ii(e,s,r));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function ea(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ze(r):null,i=r?Xt(r):null,s=t.x+t.width/2-n.width/2,a=t.y+t.height/2-n.height/2,u;switch(o){case Me:u={x:s,y:t.y-n.height};break;case qe:u={x:s,y:t.y+t.height};break;case We:u={x:t.x+t.width,y:a};break;case Ie:u={x:t.x-n.width,y:a};break;default:u={x:t.x,y:t.y}}var c=o?ko(o):null;if(c!=null){var d=c==="y"?"height":"width";switch(i){case Ut:u[c]=u[c]-(t[d]/2-n[d]/2);break;case En:u[c]=u[c]+(t[d]/2-n[d]/2);break}}return u}function Rn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,s=i===void 0?e.strategy:i,a=n.boundary,u=a===void 0?hc:a,c=n.rootBoundary,d=c===void 0?qs:c,g=n.elementContext,p=g===void 0?sn:g,f=n.altBoundary,h=f===void 0?!1:f,m=n.padding,v=m===void 0?0:m,y=Js(typeof v!="number"?v:Zs(v,Nn)),P=p===sn?vc:sn,x=e.rects.popper,S=e.elements[h?P:p],b=Kc(Nt(S)?S:S.contextElement||bt(e.elements.popper),u,d,s),E=Wt(e.elements.reference),_=ea({reference:E,element:x,strategy:"absolute",placement:o}),D=no(Object.assign({},x,_)),A=p===sn?D:E,B={top:b.top-A.top+y.top,bottom:A.bottom-b.bottom+y.bottom,left:b.left-A.left+y.left,right:A.right-b.right+y.right},N=e.modifiersData.offset;if(p===sn&&N){var R=N[o];Object.keys(B).forEach(function(k){var $=[We,qe].indexOf(k)>=0?1:-1,V=[Me,qe].indexOf(k)>=0?"y":"x";B[k]+=R[V]*$})}return B}function Jc(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,s=n.padding,a=n.flipVariations,u=n.allowedAutoPlacements,c=u===void 0?Ws:u,d=Xt(r),g=d?a?Ni:Ni.filter(function(h){return Xt(h)===d}):Nn,p=g.filter(function(h){return c.indexOf(h)>=0});p.length===0&&(p=g);var f=p.reduce(function(h,m){return h[m]=Rn(e,{placement:m,boundary:o,rootBoundary:i,padding:s})[Ze(m)],h},{});return Object.keys(f).sort(function(h,m){return f[h]-f[m]})}function Zc(e){if(Ze(e)===Co)return[];var t=qn(e);return[Mi(e),t,Mi(t)]}function Qc(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,a=s===void 0?!0:s,u=n.fallbackPlacements,c=n.padding,d=n.boundary,g=n.rootBoundary,p=n.altBoundary,f=n.flipVariations,h=f===void 0?!0:f,m=n.allowedAutoPlacements,v=t.options.placement,y=Ze(v),P=y===v,x=u||(P||!h?[qn(v)]:Zc(v)),S=[v].concat(x).reduce(function(H,U){return H.concat(Ze(U)===Co?Jc(t,{placement:U,boundary:d,rootBoundary:g,padding:c,flipVariations:h,allowedAutoPlacements:m}):U)},[]),b=t.rects.reference,E=t.rects.popper,_=new Map,D=!0,A=S[0],B=0;B<S.length;B++){var N=S[B],R=Ze(N),k=Xt(N)===Ut,$=[Me,qe].indexOf(R)>=0,V=$?"width":"height",j=Rn(t,{placement:N,boundary:d,rootBoundary:g,altBoundary:p,padding:c}),z=$?k?We:Ie:k?qe:Me;b[V]>E[V]&&(z=qn(z));var re=qn(z),ne=[];if(i&&ne.push(j[R]<=0),a&&ne.push(j[z]<=0,j[re]<=0),ne.every(function(H){return H})){A=N,D=!1;break}_.set(N,ne)}if(D)for(var O=h?3:1,L=function(U){var W=S.find(function(X){var q=_.get(X);if(q)return q.slice(0,U).every(function(K){return K})});if(W)return A=W,"break"},G=O;G>0;G--){var Y=L(G);if(Y==="break")break}t.placement!==A&&(t.modifiersData[r]._skip=!0,t.placement=A,t.reset=!0)}}const ed={name:"flip",enabled:!0,phase:"main",fn:Qc,requiresIfExists:["offset"],data:{_skip:!1}};function ji(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Di(e){return[Me,We,qe,Ie].some(function(t){return e[t]>=0})}function td(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,s=Rn(t,{elementContext:"reference"}),a=Rn(t,{altBoundary:!0}),u=ji(s,r),c=ji(a,o,i),d=Di(u),g=Di(c);t.modifiersData[n]={referenceClippingOffsets:u,popperEscapeOffsets:c,isReferenceHidden:d,hasPopperEscaped:g},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":d,"data-popper-escaped":g})}const nd={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:td};function rd(e,t,n){var r=Ze(e),o=[Ie,Me].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,s=i[0],a=i[1];return s=s||0,a=(a||0)*o,[Ie,We].indexOf(r)>=0?{x:a,y:s}:{x:s,y:a}}function od(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,s=Ws.reduce(function(d,g){return d[g]=rd(g,t.rects,i),d},{}),a=s[t.placement],u=a.x,c=a.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=u,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=s}const id={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:od};function sd(e){var t=e.state,n=e.name;t.modifiersData[n]=ea({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const ad={name:"popperOffsets",enabled:!0,phase:"read",fn:sd,data:{}};function ld(e){return e==="x"?"y":"x"}function ud(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,a=s===void 0?!1:s,u=n.boundary,c=n.rootBoundary,d=n.altBoundary,g=n.padding,p=n.tether,f=p===void 0?!0:p,h=n.tetherOffset,m=h===void 0?0:h,v=Rn(t,{boundary:u,rootBoundary:c,padding:g,altBoundary:d}),y=Ze(t.placement),P=Xt(t.placement),x=!P,S=ko(y),b=ld(S),E=t.modifiersData.popperOffsets,_=t.rects.reference,D=t.rects.popper,A=typeof m=="function"?m(Object.assign({},t.rects,{placement:t.placement})):m,B=typeof A=="number"?{mainAxis:A,altAxis:A}:Object.assign({mainAxis:0,altAxis:0},A),N=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,R={x:0,y:0};if(E){if(i){var k,$=S==="y"?Me:Ie,V=S==="y"?qe:We,j=S==="y"?"height":"width",z=E[S],re=z+v[$],ne=z-v[V],O=f?-D[j]/2:0,L=P===Ut?_[j]:D[j],G=P===Ut?-D[j]:-_[j],Y=t.elements.arrow,H=f&&Y?Ro(Y):{width:0,height:0},U=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Ks(),W=U[$],X=U[V],q=bn(0,_[j],H[j]),K=x?_[j]/2-O-q-W-B.mainAxis:L-q-W-B.mainAxis,Q=x?-_[j]/2+O+q+X+B.mainAxis:G+q+X+B.mainAxis,se=t.elements.arrow&&_n(t.elements.arrow),F=se?S==="y"?se.clientTop||0:se.clientLeft||0:0,ee=(k=N==null?void 0:N[S])!=null?k:0,M=z+K-ee-F,ae=z+Q-ee,Ce=bn(f?er(re,M):re,z,f?kt(ne,ae):ne);E[S]=Ce,R[S]=Ce-z}if(a){var Ne,xe=S==="x"?Me:Ie,yt=S==="x"?qe:We,_e=E[b],nt=b==="y"?"height":"width",De=_e+v[xe],rt=_e-v[yt],Ee=[Me,Ie].indexOf(y)!==-1,$t=(Ne=N==null?void 0:N[b])!=null?Ne:0,xt=Ee?De:_e-_[nt]-D[nt]-$t+B.altAxis,Zt=Ee?_e+_[nt]+D[nt]-$t-B.altAxis:rt,jn=f&&Ee?Mc(xt,_e,Zt):bn(f?xt:De,_e,f?Zt:rt);E[b]=jn,R[b]=jn-_e}t.modifiersData[r]=R}}const cd={name:"preventOverflow",enabled:!0,phase:"main",fn:ud,requiresIfExists:["offset"]};function dd(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function pd(e){return e===Le(e)||!Ge(e)?To(e):dd(e)}function fd(e){var t=e.getBoundingClientRect(),n=qt(t.width)/e.offsetWidth||1,r=qt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function gd(e,t,n){n===void 0&&(n=!1);var r=Ge(t),o=Ge(t)&&fd(t),i=bt(t),s=Wt(e,o,n),a={scrollLeft:0,scrollTop:0},u={x:0,y:0};return(r||!r&&!n)&&((et(t)!=="body"||Oo(i))&&(a=pd(t)),Ge(t)?(u=Wt(t,!0),u.x+=t.clientLeft,u.y+=t.clientTop):i&&(u.x=Po(i))),{x:s.left+a.scrollLeft-u.x,y:s.top+a.scrollTop-u.y,width:s.width,height:s.height}}function md(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var s=[].concat(i.requires||[],i.requiresIfExists||[]);s.forEach(function(a){if(!n.has(a)){var u=t.get(a);u&&o(u)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function hd(e){var t=md(e);return Tc.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function vd(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function bd(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var Ai={placement:"bottom",modifiers:[],strategy:"absolute"};function Fi(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function wd(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?Ai:o;return function(a,u,c){c===void 0&&(c=i);var d={placement:"bottom",orderedModifiers:[],options:Object.assign({},Ai,i),modifiersData:{},elements:{reference:a,popper:u},attributes:{},styles:{}},g=[],p=!1,f={state:d,setOptions:function(y){var P=typeof y=="function"?y(d.options):y;m(),d.options=Object.assign({},i,d.options,P),d.scrollParents={reference:Nt(a)?wn(a):a.contextElement?wn(a.contextElement):[],popper:wn(u)};var x=hd(bd([].concat(r,d.options.modifiers)));return d.orderedModifiers=x.filter(function(S){return S.enabled}),h(),f.update()},forceUpdate:function(){if(!p){var y=d.elements,P=y.reference,x=y.popper;if(Fi(P,x)){d.rects={reference:gd(P,_n(x),d.options.strategy==="fixed"),popper:Ro(x)},d.reset=!1,d.placement=d.options.placement,d.orderedModifiers.forEach(function(B){return d.modifiersData[B.name]=Object.assign({},B.data)});for(var S=0;S<d.orderedModifiers.length;S++){if(d.reset===!0){d.reset=!1,S=-1;continue}var b=d.orderedModifiers[S],E=b.fn,_=b.options,D=_===void 0?{}:_,A=b.name;typeof E=="function"&&(d=E({state:d,options:D,name:A,instance:f})||d)}}}},update:vd(function(){return new Promise(function(v){f.forceUpdate(),v(d)})}),destroy:function(){m(),p=!0}};if(!Fi(a,u))return f;f.setOptions(c).then(function(v){!p&&c.onFirstUpdate&&c.onFirstUpdate(v)});function h(){d.orderedModifiers.forEach(function(v){var y=v.name,P=v.options,x=P===void 0?{}:P,S=v.effect;if(typeof S=="function"){var b=S({state:d,name:y,instance:f,options:x}),E=function(){};g.push(b||E)}})}function m(){g.forEach(function(v){return v()}),g=[]}return f}}var yd=[Hc,ad,Bc,Nc,id,ed,cd,Ac,nd],xd=wd({defaultModifiers:yd});const ta="Popper";function Sd(e){return Us(ta,e)}Qu(ta,["root"]);const Cd=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Ed=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Rd(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function tr(e){return typeof e=="function"?e():e}function cr(e){return e.nodeType!==void 0}function kd(e){return!cr(e)}const Td=()=>ct({root:["root"]},Wu(Sd)),Pd={},Od=C.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:s,disablePortal:a,modifiers:u,open:c,placement:d,popperOptions:g,popperRef:p,slotProps:f={},slots:h={},TransitionProps:m}=t,v=ge(t,Cd),y=C.useRef(null),P=Ue(y,n),x=C.useRef(null),S=Ue(x,p),b=C.useRef(S);Pt(()=>{b.current=S},[S]),C.useImperativeHandle(p,()=>x.current,[]);const E=Rd(d,s),[_,D]=C.useState(E),[A,B]=C.useState(tr(o));C.useEffect(()=>{x.current&&x.current.forceUpdate()}),C.useEffect(()=>{o&&B(tr(o))},[o]),Pt(()=>{if(!A||!c)return;const V=re=>{D(re.placement)};if(process.env.NODE_ENV!=="production"&&A&&cr(A)&&A.nodeType===1){const re=A.getBoundingClientRect();process.env.NODE_ENV!=="test"&&re.top===0&&re.left===0&&re.right===0&&re.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let j=[{name:"preventOverflow",options:{altBoundary:a}},{name:"flip",options:{altBoundary:a}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:re})=>{V(re)}}];u!=null&&(j=j.concat(u)),g&&g.modifiers!=null&&(j=j.concat(g.modifiers));const z=xd(A,y.current,T({placement:E},g,{modifiers:j}));return b.current(z),()=>{z.destroy(),b.current(null)}},[A,a,u,c,g,E]);const N={placement:_};m!==null&&(N.TransitionProps=m);const R=Td(),k=(r=h.root)!=null?r:"div",$=Ot({elementType:k,externalSlotProps:f.root,externalForwardedProps:v,additionalProps:{role:"tooltip",ref:P},ownerState:t,className:R.root});return w.jsx(k,T({},$,{children:typeof i=="function"?i(N):i}))}),na=C.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:s="ltr",disablePortal:a=!1,keepMounted:u=!1,modifiers:c,open:d,placement:g="bottom",popperOptions:p=Pd,popperRef:f,style:h,transition:m=!1,slotProps:v={},slots:y={}}=t,P=ge(t,Ed),[x,S]=C.useState(!0),b=()=>{S(!1)},E=()=>{S(!0)};if(!u&&!d&&(!m||x))return null;let _;if(i)_=i;else if(r){const B=tr(r);_=B&&cr(B)?Pe(B).body:Pe(null).body}const D=!d&&u&&(!m||x)?"none":void 0,A=m?{in:d,onEnter:b,onExited:E}:void 0;return w.jsx(Cn,{disablePortal:a,container:_,children:w.jsx(Od,T({anchorEl:r,direction:s,disablePortal:a,modifiers:c,ref:n,open:m?!x:d,placement:g,popperOptions:p,popperRef:f,slotProps:v,slots:y},P,{style:T({position:"fixed",top:0,left:0,display:D},h),TransitionProps:A,children:o}))})});process.env.NODE_ENV!=="production"&&(na.propTypes={anchorEl:Jt(l.oneOfType([at,l.object,l.func]),e=>{if(e.open){const t=tr(e.anchorEl);if(t&&cr(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||kd(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:l.oneOfType([l.node,l.func]),container:l.oneOfType([at,l.func]),direction:l.oneOf(["ltr","rtl"]),disablePortal:l.bool,keepMounted:l.bool,modifiers:l.arrayOf(l.shape({data:l.object,effect:l.func,enabled:l.bool,fn:l.func,name:l.any,options:l.object,phase:l.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:l.arrayOf(l.string),requiresIfExists:l.arrayOf(l.string)})),open:l.bool.isRequired,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:l.shape({modifiers:l.array,onFirstUpdate:l.func,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:l.oneOf(["absolute","fixed"])}),popperRef:So,slotProps:l.shape({root:l.oneOfType([l.func,l.object])}),slots:l.shape({root:l.elementType}),transition:l.bool});const Nd=["values","unit","step"],_d=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>T({},n,{[r.key]:r.val}),{})};function $d(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=ge(e,Nd),i=_d(t),s=Object.keys(i);function a(p){return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n})`}function u(p){return`@media (max-width:${(typeof t[p]=="number"?t[p]:p)-r/100}${n})`}function c(p,f){const h=s.indexOf(f);return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n}) and (max-width:${(h!==-1&&typeof t[s[h]]=="number"?t[s[h]]:f)-r/100}${n})`}function d(p){return s.indexOf(p)+1<s.length?c(p,s[s.indexOf(p)+1]):a(p)}function g(p){const f=s.indexOf(p);return f===0?a(s[1]):f===s.length-1?u(s[f]):c(p,s[s.indexOf(p)+1]).replace("@media","@media not all and")}return T({keys:s,values:i,up:a,down:u,between:c,only:d,not:g,unit:n},o)}const Md={borderRadius:4},Id=Md,jd=process.env.NODE_ENV!=="production"?l.oneOfType([l.number,l.string,l.object,l.array]):{},wt=jd;function yn(e,t){return t?st(e,t,{clone:!1}):e}const No={xs:0,sm:600,md:900,lg:1200,xl:1536},Vi={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${No[e]}px)`};function ut(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||Vi;return t.reduce((s,a,u)=>(s[i.up(i.keys[u])]=n(t[u]),s),{})}if(typeof t=="object"){const i=r.breakpoints||Vi;return Object.keys(t).reduce((s,a)=>{if(Object.keys(i.values||No).indexOf(a)!==-1){const u=i.up(a);s[u]=n(t[a],a)}else{const u=a;s[u]=t[u]}return s},{})}return n(t)}function Dd(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function Ad(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function dr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function nr(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=dr(e,n)||r,t&&(o=t(o,r,e)),o}function Se(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=s=>{if(s[t]==null)return null;const a=s[t],u=s.theme,c=dr(u,r)||{};return ut(s,a,g=>{let p=nr(c,o,g);return g===p&&typeof g=="string"&&(p=nr(c,o,`${t}${g==="default"?"":Qe(g)}`,g)),n===!1?p:{[n]:p}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:wt}:{},i.filterProps=[t],i}function Fd(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const Vd={m:"margin",p:"padding"},Ld={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Li={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Bd=Fd(e=>{if(e.length>2)if(Li[e])e=Li[e];else return[e];const[t,n]=e.split(""),r=Vd[t],o=Ld[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),pr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],fr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],zd=[...pr,...fr];function $n(e,t,n,r){var o;const i=(o=dr(e,t,!1))!=null?o:n;return typeof i=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),i*s):Array.isArray(i)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>i.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${s} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[s]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function ra(e){return $n(e,"spacing",8,"spacing")}function Mn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Hd(e,t){return n=>e.reduce((r,o)=>(r[o]=Mn(t,n),r),{})}function Gd(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=Bd(n),i=Hd(o,r),s=e[n];return ut(e,s,i)}function oa(e,t){const n=ra(e.theme);return Object.keys(e).map(r=>Gd(e,t,r,n)).reduce(yn,{})}function ve(e){return oa(e,pr)}ve.propTypes=process.env.NODE_ENV!=="production"?pr.reduce((e,t)=>(e[t]=wt,e),{}):{};ve.filterProps=pr;function be(e){return oa(e,fr)}be.propTypes=process.env.NODE_ENV!=="production"?fr.reduce((e,t)=>(e[t]=wt,e),{}):{};be.filterProps=fr;process.env.NODE_ENV!=="production"&&zd.reduce((e,t)=>(e[t]=wt,e),{});function Ud(e=8){if(e.mui)return e;const t=ra({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const s=t(i);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function gr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?yn(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function He(e){return typeof e!="number"?e:`${e}px solid`}function Xe(e,t){return Se({prop:e,themeKey:"borders",transform:t})}const qd=Xe("border",He),Wd=Xe("borderTop",He),Xd=Xe("borderRight",He),Yd=Xe("borderBottom",He),Kd=Xe("borderLeft",He),Jd=Xe("borderColor"),Zd=Xe("borderTopColor"),Qd=Xe("borderRightColor"),ep=Xe("borderBottomColor"),tp=Xe("borderLeftColor"),np=Xe("outline",He),rp=Xe("outlineColor"),mr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=$n(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:Mn(t,r)});return ut(e,e.borderRadius,n)}return null};mr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:wt}:{};mr.filterProps=["borderRadius"];gr(qd,Wd,Xd,Yd,Kd,Jd,Zd,Qd,ep,tp,mr,np,rp);const hr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=$n(e.theme,"spacing",8,"gap"),n=r=>({gap:Mn(t,r)});return ut(e,e.gap,n)}return null};hr.propTypes=process.env.NODE_ENV!=="production"?{gap:wt}:{};hr.filterProps=["gap"];const vr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=$n(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:Mn(t,r)});return ut(e,e.columnGap,n)}return null};vr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:wt}:{};vr.filterProps=["columnGap"];const br=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=$n(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:Mn(t,r)});return ut(e,e.rowGap,n)}return null};br.propTypes=process.env.NODE_ENV!=="production"?{rowGap:wt}:{};br.filterProps=["rowGap"];const op=Se({prop:"gridColumn"}),ip=Se({prop:"gridRow"}),sp=Se({prop:"gridAutoFlow"}),ap=Se({prop:"gridAutoColumns"}),lp=Se({prop:"gridAutoRows"}),up=Se({prop:"gridTemplateColumns"}),cp=Se({prop:"gridTemplateRows"}),dp=Se({prop:"gridTemplateAreas"}),pp=Se({prop:"gridArea"});gr(hr,vr,br,op,ip,sp,ap,lp,up,cp,dp,pp);function zt(e,t){return t==="grey"?t:e}const fp=Se({prop:"color",themeKey:"palette",transform:zt}),gp=Se({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:zt}),mp=Se({prop:"backgroundColor",themeKey:"palette",transform:zt});gr(fp,gp,mp);function Ve(e){return e<=1&&e!==0?`${e*100}%`:e}const hp=Se({prop:"width",transform:Ve}),_o=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||No[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:Ve(n)}};return ut(e,e.maxWidth,t)}return null};_o.filterProps=["maxWidth"];const vp=Se({prop:"minWidth",transform:Ve}),bp=Se({prop:"height",transform:Ve}),wp=Se({prop:"maxHeight",transform:Ve}),yp=Se({prop:"minHeight",transform:Ve});Se({prop:"size",cssProperty:"width",transform:Ve});Se({prop:"size",cssProperty:"height",transform:Ve});const xp=Se({prop:"boxSizing"});gr(hp,_o,vp,bp,wp,yp,xp);const Sp={border:{themeKey:"borders",transform:He},borderTop:{themeKey:"borders",transform:He},borderRight:{themeKey:"borders",transform:He},borderBottom:{themeKey:"borders",transform:He},borderLeft:{themeKey:"borders",transform:He},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:He},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:mr},color:{themeKey:"palette",transform:zt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:zt},backgroundColor:{themeKey:"palette",transform:zt},p:{style:be},pt:{style:be},pr:{style:be},pb:{style:be},pl:{style:be},px:{style:be},py:{style:be},padding:{style:be},paddingTop:{style:be},paddingRight:{style:be},paddingBottom:{style:be},paddingLeft:{style:be},paddingX:{style:be},paddingY:{style:be},paddingInline:{style:be},paddingInlineStart:{style:be},paddingInlineEnd:{style:be},paddingBlock:{style:be},paddingBlockStart:{style:be},paddingBlockEnd:{style:be},m:{style:ve},mt:{style:ve},mr:{style:ve},mb:{style:ve},ml:{style:ve},mx:{style:ve},my:{style:ve},margin:{style:ve},marginTop:{style:ve},marginRight:{style:ve},marginBottom:{style:ve},marginLeft:{style:ve},marginX:{style:ve},marginY:{style:ve},marginInline:{style:ve},marginInlineStart:{style:ve},marginInlineEnd:{style:ve},marginBlock:{style:ve},marginBlockStart:{style:ve},marginBlockEnd:{style:ve},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:hr},rowGap:{style:br},columnGap:{style:vr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ve},maxWidth:{style:_o},minWidth:{transform:Ve},height:{transform:Ve},maxHeight:{transform:Ve},minHeight:{transform:Ve},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},$o=Sp;function Cp(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Ep(e,t){return typeof e=="function"?e(t):e}function Rp(){function e(n,r,o,i){const s={[n]:r,theme:o},a=i[n];if(!a)return{[n]:r};const{cssProperty:u=n,themeKey:c,transform:d,style:g}=a;if(r==null)return null;if(c==="typography"&&r==="inherit")return{[n]:r};const p=dr(o,c)||{};return g?g(s):ut(s,r,h=>{let m=nr(p,d,h);return h===m&&typeof h=="string"&&(m=nr(p,d,`${n}${h==="default"?"":Qe(h)}`,h)),u===!1?m:{[u]:m}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const s=(r=i.unstable_sxConfig)!=null?r:$o;function a(u){let c=u;if(typeof u=="function")c=u(i);else if(typeof u!="object")return u;if(!c)return null;const d=Dd(i.breakpoints),g=Object.keys(d);let p=d;return Object.keys(c).forEach(f=>{const h=Ep(c[f],i);if(h!=null)if(typeof h=="object")if(s[f])p=yn(p,e(f,h,i,s));else{const m=ut({theme:i},h,v=>({[f]:v}));Cp(m,h)?p[f]=t({sx:h,theme:i}):p=yn(p,m)}else p=yn(p,e(f,h,i,s))}),Ad(g,p)}return Array.isArray(o)?o.map(a):a(o)}return t}const ia=Rp();ia.filterProps=["sx"];const Mo=ia;function kp(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Tp=["breakpoints","palette","spacing","shape"];function Io(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,s=ge(e,Tp),a=$d(n),u=Ud(o);let c=st({breakpoints:a,direction:"ltr",components:{},palette:T({mode:"light"},r),spacing:u,shape:T({},Id,i)},s);return c.applyStyles=kp,c=t.reduce((d,g)=>st(d,g),c),c.unstable_sxConfig=T({},$o,s==null?void 0:s.unstable_sxConfig),c.unstable_sx=function(g){return Mo({sx:g,theme:this})},c}function Pp(e){return Object.keys(e).length===0}function sa(e=null){const t=C.useContext(Yr.ThemeContext);return!t||Pp(t)?e:t}const Op=Io();function aa(e=Op){return sa(e)}const Np=["ownerState"],_p=["variants"],$p=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Mp(e){return Object.keys(e).length===0}function Ip(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Wn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const jp=Io(),Bi=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Ln({defaultTheme:e,theme:t,themeId:n}){return Mp(t)?e:t[n]||t}function Dp(e){return e?(t,n)=>n[e]:null}function Xn(e,t){let{ownerState:n}=t,r=ge(t,Np);const o=typeof e=="function"?e(T({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>Xn(i,T({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let a=ge(o,_p);return i.forEach(u=>{let c=!0;typeof u.props=="function"?c=u.props(T({ownerState:n},r,n)):Object.keys(u.props).forEach(d=>{(n==null?void 0:n[d])!==u.props[d]&&r[d]!==u.props[d]&&(c=!1)}),c&&(Array.isArray(a)||(a=[a]),a.push(typeof u.style=="function"?u.style(T({ownerState:n},r,n)):u.style))}),a}return o}function Ap(e={}){const{themeId:t,defaultTheme:n=jp,rootShouldForwardProp:r=Wn,slotShouldForwardProp:o=Wn}=e,i=s=>Mo(T({},s,{theme:Ln(T({},s,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(s,a={})=>{Yr.internal_processStyles(s,b=>b.filter(E=>!(E!=null&&E.__mui_systemSx)));const{name:u,slot:c,skipVariantsResolver:d,skipSx:g,overridesResolver:p=Dp(Bi(c))}=a,f=ge(a,$p),h=d!==void 0?d:c&&c!=="Root"&&c!=="root"||!1,m=g||!1;let v;process.env.NODE_ENV!=="production"&&u&&(v=`${u}-${Bi(c||"Root")}`);let y=Wn;c==="Root"||c==="root"?y=r:c?y=o:Ip(s)&&(y=void 0);const P=Yr(s,T({shouldForwardProp:y,label:v},f)),x=b=>typeof b=="function"&&b.__emotion_real!==b||Rt(b)?E=>Xn(b,T({},E,{theme:Ln({theme:E.theme,defaultTheme:n,themeId:t})})):b,S=(b,...E)=>{let _=x(b);const D=E?E.map(x):[];u&&p&&D.push(N=>{const R=Ln(T({},N,{defaultTheme:n,themeId:t}));if(!R.components||!R.components[u]||!R.components[u].styleOverrides)return null;const k=R.components[u].styleOverrides,$={};return Object.entries(k).forEach(([V,j])=>{$[V]=Xn(j,T({},N,{theme:R}))}),p(N,$)}),u&&!h&&D.push(N=>{var R;const k=Ln(T({},N,{defaultTheme:n,themeId:t})),$=k==null||(R=k.components)==null||(R=R[u])==null?void 0:R.variants;return Xn({variants:$},T({},N,{theme:k}))}),m||D.push(i);const A=D.length-E.length;if(Array.isArray(b)&&A>0){const N=new Array(A).fill("");_=[...b,...N],_.raw=[...b.raw,...N]}const B=P(_,...D);if(process.env.NODE_ENV!=="production"){let N;u&&(N=`${u}${Qe(c||"")}`),N===void 0&&(N=`Styled(${xu(s)})`),B.displayName=N}return s.muiName&&(B.muiName=s.muiName),B};return P.withConfig&&(S.withConfig=P.withConfig),S}}function Fp(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:Vs(t.components[n].defaultProps,r)}function Vp({props:e,name:t,defaultTheme:n,themeId:r}){let o=aa(n);return r&&(o=o[r]||o),Fp({theme:o,name:t,props:e})}function jo(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Gu(e,t,n)}function Lp(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function _t(e){if(e.type)return e;if(e.charAt(0)==="#")return _t(Lp(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Ht(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Ht(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function wr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function Bp(e){e=_t(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),s=(c,d=(c+n/30)%12)=>o-i*Math.max(Math.min(d-3,9-d,1),-1);let a="rgb";const u=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(a+="a",u.push(t[3])),wr({type:a,values:u})}function zi(e){e=_t(e);let t=e.type==="hsl"||e.type==="hsla"?_t(Bp(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Hi(e,t){const n=zi(e),r=zi(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function rr(e,t){return e=_t(e),t=jo(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,wr(e)}function zp(e,t){if(e=_t(e),t=jo(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return wr(e)}function Hp(e,t){if(e=_t(e),t=jo(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return wr(e)}function Gp(e,t){return T({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const Up={black:"#000",white:"#fff"},kn=Up,qp={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Wp=qp,Xp={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Mt=Xp,Yp={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},It=Yp,Kp={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},an=Kp,Jp={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},jt=Jp,Zp={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Dt=Zp,Qp={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},At=Qp,ef=["mode","contrastThreshold","tonalOffset"],Gi={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:kn.white,default:kn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Ir={text:{primary:kn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:kn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Ui(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=Hp(e.main,o):t==="dark"&&(e.dark=zp(e.main,i)))}function tf(e="light"){return e==="dark"?{main:jt[200],light:jt[50],dark:jt[400]}:{main:jt[700],light:jt[400],dark:jt[800]}}function nf(e="light"){return e==="dark"?{main:Mt[200],light:Mt[50],dark:Mt[400]}:{main:Mt[500],light:Mt[300],dark:Mt[700]}}function rf(e="light"){return e==="dark"?{main:It[500],light:It[300],dark:It[700]}:{main:It[700],light:It[400],dark:It[800]}}function of(e="light"){return e==="dark"?{main:Dt[400],light:Dt[300],dark:Dt[700]}:{main:Dt[700],light:Dt[500],dark:Dt[900]}}function sf(e="light"){return e==="dark"?{main:At[400],light:At[300],dark:At[700]}:{main:At[800],light:At[500],dark:At[900]}}function af(e="light"){return e==="dark"?{main:an[400],light:an[300],dark:an[700]}:{main:"#ed6c02",light:an[500],dark:an[900]}}function lf(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=ge(e,ef),i=e.primary||tf(t),s=e.secondary||nf(t),a=e.error||rf(t),u=e.info||of(t),c=e.success||sf(t),d=e.warning||af(t);function g(m){const v=Hi(m,Ir.text.primary)>=n?Ir.text.primary:Gi.text.primary;if(process.env.NODE_ENV!=="production"){const y=Hi(m,v);y<3&&console.error([`MUI: The contrast ratio of ${y}:1 for ${v} on ${m}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return v}const p=({color:m,name:v,mainShade:y=500,lightShade:P=300,darkShade:x=700})=>{if(m=T({},m),!m.main&&m[y]&&(m.main=m[y]),!m.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${v?` (${v})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${y}\` property.`:Ht(11,v?` (${v})`:"",y));if(typeof m.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${v?` (${v})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Ht(12,v?` (${v})`:"",JSON.stringify(m.main)));return Ui(m,"light",P,r),Ui(m,"dark",x,r),m.contrastText||(m.contrastText=g(m.main)),m},f={dark:Ir,light:Gi};return process.env.NODE_ENV!=="production"&&(f[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),st(T({common:T({},kn),mode:t,primary:p({color:i,name:"primary"}),secondary:p({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:p({color:a,name:"error"}),warning:p({color:d,name:"warning"}),info:p({color:u,name:"info"}),success:p({color:c,name:"success"}),grey:Wp,contrastThreshold:n,getContrastText:g,augmentColor:p,tonalOffset:r},f[t]),o)}const uf=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function cf(e){return Math.round(e*1e5)/1e5}const qi={textTransform:"uppercase"},Wi='"Roboto", "Helvetica", "Arial", sans-serif';function df(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Wi,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:s=400,fontWeightMedium:a=500,fontWeightBold:u=700,htmlFontSize:c=16,allVariants:d,pxToRem:g}=n,p=ge(n,uf);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof c!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const f=o/14,h=g||(y=>`${y/c*f}rem`),m=(y,P,x,S,b)=>T({fontFamily:r,fontWeight:y,fontSize:h(P),lineHeight:x},r===Wi?{letterSpacing:`${cf(S/P)}em`}:{},b,d),v={h1:m(i,96,1.167,-1.5),h2:m(i,60,1.2,-.5),h3:m(s,48,1.167,0),h4:m(s,34,1.235,.25),h5:m(s,24,1.334,0),h6:m(a,20,1.6,.15),subtitle1:m(s,16,1.75,.15),subtitle2:m(a,14,1.57,.1),body1:m(s,16,1.5,.15),body2:m(s,14,1.43,.15),button:m(a,14,1.75,.4,qi),caption:m(s,12,1.66,.4),overline:m(s,12,2.66,1,qi),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return st(T({htmlFontSize:c,pxToRem:h,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:s,fontWeightMedium:a,fontWeightBold:u},v),p,{clone:!1})}const pf=.2,ff=.14,gf=.12;function he(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${pf})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${ff})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${gf})`].join(",")}const mf=["none",he(0,2,1,-1,0,1,1,0,0,1,3,0),he(0,3,1,-2,0,2,2,0,0,1,5,0),he(0,3,3,-2,0,3,4,0,0,1,8,0),he(0,2,4,-1,0,4,5,0,0,1,10,0),he(0,3,5,-1,0,5,8,0,0,1,14,0),he(0,3,5,-1,0,6,10,0,0,1,18,0),he(0,4,5,-2,0,7,10,1,0,2,16,1),he(0,5,5,-3,0,8,10,1,0,3,14,2),he(0,5,6,-3,0,9,12,1,0,3,16,2),he(0,6,6,-3,0,10,14,1,0,4,18,3),he(0,6,7,-4,0,11,15,1,0,4,20,3),he(0,7,8,-4,0,12,17,2,0,5,22,4),he(0,7,8,-4,0,13,19,2,0,5,24,4),he(0,7,9,-4,0,14,21,2,0,5,26,4),he(0,8,9,-5,0,15,22,2,0,6,28,5),he(0,8,10,-5,0,16,24,2,0,6,30,5),he(0,8,11,-5,0,17,26,2,0,6,32,5),he(0,9,11,-5,0,18,28,2,0,7,34,6),he(0,9,12,-6,0,19,29,2,0,7,36,6),he(0,10,13,-6,0,20,31,3,0,8,38,7),he(0,10,13,-6,0,21,33,3,0,8,40,7),he(0,10,14,-6,0,22,35,3,0,8,42,7),he(0,11,14,-7,0,23,36,3,0,9,44,8),he(0,11,15,-7,0,24,38,3,0,9,46,8)],hf=mf,vf=["duration","easing","delay"],bf={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},wf={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Xi(e){return`${Math.round(e)}ms`}function yf(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function xf(e){const t=T({},bf,e.easing),n=T({},wf,e.duration);return T({getAutoHeightDuration:yf,create:(o=["all"],i={})=>{const{duration:s=n.standard,easing:a=t.easeInOut,delay:u=0}=i,c=ge(i,vf);if(process.env.NODE_ENV!=="production"){const d=p=>typeof p=="string",g=p=>!isNaN(parseFloat(p));!d(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!g(s)&&!d(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),d(a)||console.error('MUI: Argument "easing" must be a string.'),!g(u)&&!d(u)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(c).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(c).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(d=>`${d} ${typeof s=="string"?s:Xi(s)} ${a} ${typeof u=="string"?u:Xi(u)}`).join(",")}},e,{easing:t,duration:n})}const Sf={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Cf=Sf,Ef=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Rf(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,s=ge(e,Ef);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Ht(18));const a=lf(r),u=Io(e);let c=st(u,{mixins:Gp(u.breakpoints,n),palette:a,shadows:hf.slice(),typography:df(a,i),transitions:xf(o),zIndex:T({},Cf)});if(c=st(c,s),c=t.reduce((d,g)=>st(d,g),c),process.env.NODE_ENV!=="production"){const d=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],g=(p,f)=>{let h;for(h in p){const m=p[h];if(d.indexOf(h)!==-1&&Object.keys(m).length>0){if(process.env.NODE_ENV!=="production"){const v=tt("",h);console.error([`MUI: The \`${f}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(p,null,2),"",`Instead, you need to use the '&.${v}' syntax:`,JSON.stringify({root:{[`&.${v}`]:m}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}p[h]={}}}};Object.keys(c.components).forEach(p=>{const f=c.components[p].styleOverrides;f&&p.indexOf("Mui")===0&&g(f,p)})}return c.unstable_sxConfig=T({},$o,s==null?void 0:s.unstable_sxConfig),c.unstable_sx=function(g){return Mo({sx:g,theme:this})},c}const kf=Rf(),Do=kf,Ao="$$material",la=e=>Wn(e)&&e!=="classes",Tf=Ap({themeId:Ao,defaultTheme:Do,rootShouldForwardProp:la}),Oe=Tf;function In(){const e=aa(Do);return process.env.NODE_ENV!=="production"&&C.useDebugValue(e),e[Ao]||e}function dt({props:e,name:t}){return Vp({props:e,name:t,defaultTheme:Do,themeId:Ao})}function ro(e,t){return ro=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},ro(e,t)}function Pf(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,ro(e,t)}const Yi={disabled:!1};var Of=process.env.NODE_ENV!=="production"?l.oneOfType([l.number,l.shape({enter:l.number,exit:l.number,appear:l.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&l.oneOfType([l.string,l.shape({enter:l.string,exit:l.string,active:l.string}),l.shape({enter:l.string,enterDone:l.string,enterActive:l.string,exit:l.string,exitDone:l.string,exitActive:l.string})]);const ua=I.createContext(null);var Nf=function(t){return t.scrollTop},gn="unmounted",St="exited",Ct="entering",Lt="entered",oo="exiting",pt=function(e){Pf(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var s=o,a=s&&!s.isMounting?r.enter:r.appear,u;return i.appearStatus=null,r.in?a?(u=St,i.appearStatus=Ct):u=Lt:r.unmountOnExit||r.mountOnEnter?u=gn:u=St,i.state={status:u},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var s=o.in;return s&&i.status===gn?{status:St}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==Ct&&s!==Lt&&(i=Ct):(s===Ct||s===Lt)&&(i=oo)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,s,a;return i=s=a=o,o!=null&&typeof o!="number"&&(i=o.exit,s=o.enter,a=o.appear!==void 0?o.appear:s),{exit:i,enter:s,appear:a}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===Ct){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:dn.findDOMNode(this);s&&Nf(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===St&&this.setState({status:gn})},n.performEnter=function(o){var i=this,s=this.props.enter,a=this.context?this.context.isMounting:o,u=this.props.nodeRef?[a]:[dn.findDOMNode(this),a],c=u[0],d=u[1],g=this.getTimeouts(),p=a?g.appear:g.enter;if(!o&&!s||Yi.disabled){this.safeSetState({status:Lt},function(){i.props.onEntered(c)});return}this.props.onEnter(c,d),this.safeSetState({status:Ct},function(){i.props.onEntering(c,d),i.onTransitionEnd(p,function(){i.safeSetState({status:Lt},function(){i.props.onEntered(c,d)})})})},n.performExit=function(){var o=this,i=this.props.exit,s=this.getTimeouts(),a=this.props.nodeRef?void 0:dn.findDOMNode(this);if(!i||Yi.disabled){this.safeSetState({status:St},function(){o.props.onExited(a)});return}this.props.onExit(a),this.safeSetState({status:oo},function(){o.props.onExiting(a),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:St},function(){o.props.onExited(a)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,s=!0;return this.nextCallback=function(a){s&&(s=!1,i.nextCallback=null,o(a))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var s=this.props.nodeRef?this.props.nodeRef.current:dn.findDOMNode(this),a=o==null&&!this.props.addEndListener;if(!s||a){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var u=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],c=u[0],d=u[1];this.props.addEndListener(c,d)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===gn)return null;var i=this.props,s=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var a=ge(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return I.createElement(ua.Provider,{value:null},typeof s=="function"?s(o,a):I.cloneElement(I.Children.only(s),a))},t}(I.Component);pt.contextType=ua;pt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:l.shape({current:typeof Element>"u"?l.any:function(e,t,n,r,o,i){var s=e[t];return l.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:l.oneOfType([l.func.isRequired,l.element.isRequired]).isRequired,in:l.bool,mountOnEnter:l.bool,unmountOnExit:l.bool,appear:l.bool,enter:l.bool,exit:l.bool,timeout:function(t){var n=Of;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:l.func,onEnter:l.func,onEntering:l.func,onEntered:l.func,onExit:l.func,onExiting:l.func,onExited:l.func}:{};function Ft(){}pt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Ft,onEntering:Ft,onEntered:Ft,onExit:Ft,onExiting:Ft,onExited:Ft};pt.UNMOUNTED=gn;pt.EXITED=St;pt.ENTERING=Ct;pt.ENTERED=Lt;pt.EXITING=oo;const ca=pt,da=e=>e.scrollTop;function or(e,t){var n,r;const{timeout:o,easing:i,style:s={}}=e;return{duration:(n=s.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:s.transitionDelay}}const _f=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function io(e){return`scale(${e}, ${e**2})`}const $f={entering:{opacity:1,transform:io(1)},entered:{opacity:1,transform:"none"}},jr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Fo=C.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:s,in:a,onEnter:u,onEntered:c,onEntering:d,onExit:g,onExited:p,onExiting:f,style:h,timeout:m="auto",TransitionComponent:v=ca}=t,y=ge(t,_f),P=pn(),x=C.useRef(),S=In(),b=C.useRef(null),E=Ue(b,i.ref,n),_=V=>j=>{if(V){const z=b.current;j===void 0?V(z):V(z,j)}},D=_(d),A=_((V,j)=>{da(V);const{duration:z,delay:re,easing:ne}=or({style:h,timeout:m,easing:s},{mode:"enter"});let O;m==="auto"?(O=S.transitions.getAutoHeightDuration(V.clientHeight),x.current=O):O=z,V.style.transition=[S.transitions.create("opacity",{duration:O,delay:re}),S.transitions.create("transform",{duration:jr?O:O*.666,delay:re,easing:ne})].join(","),u&&u(V,j)}),B=_(c),N=_(f),R=_(V=>{const{duration:j,delay:z,easing:re}=or({style:h,timeout:m,easing:s},{mode:"exit"});let ne;m==="auto"?(ne=S.transitions.getAutoHeightDuration(V.clientHeight),x.current=ne):ne=j,V.style.transition=[S.transitions.create("opacity",{duration:ne,delay:z}),S.transitions.create("transform",{duration:jr?ne:ne*.666,delay:jr?z:z||ne*.333,easing:re})].join(","),V.style.opacity=0,V.style.transform=io(.75),g&&g(V)}),k=_(p),$=V=>{m==="auto"&&P.start(x.current||0,V),r&&r(b.current,V)};return w.jsx(v,T({appear:o,in:a,nodeRef:b,onEnter:A,onEntered:B,onEntering:D,onExit:R,onExited:k,onExiting:N,addEndListener:$,timeout:m==="auto"?null:m},y,{children:(V,j)=>C.cloneElement(i,T({style:T({opacity:0,transform:io(.75),visibility:V==="exited"&&!a?"hidden":void 0},$f[V],h,i.props.style),ref:E},j))}))});process.env.NODE_ENV!=="production"&&(Fo.propTypes={addEndListener:l.func,appear:l.bool,children:Pn.isRequired,easing:l.oneOfType([l.shape({enter:l.string,exit:l.string}),l.string]),in:l.bool,onEnter:l.func,onEntered:l.func,onEntering:l.func,onExit:l.func,onExited:l.func,onExiting:l.func,style:l.object,timeout:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});Fo.muiSupportAuto=!0;const so=Fo,Mf=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},Ki=Mf,If=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],jf=Oe(na,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),pa=C.forwardRef(function(t,n){var r;const o=sa(),i=dt({props:t,name:"MuiPopper"}),{anchorEl:s,component:a,components:u,componentsProps:c,container:d,disablePortal:g,keepMounted:p,modifiers:f,open:h,placement:m,popperOptions:v,popperRef:y,transition:P,slots:x,slotProps:S}=i,b=ge(i,If),E=(r=x==null?void 0:x.root)!=null?r:u==null?void 0:u.Root,_=T({anchorEl:s,container:d,disablePortal:g,keepMounted:p,modifiers:f,open:h,placement:m,popperOptions:v,popperRef:y,transition:P},b);return w.jsx(jf,T({as:a,direction:o==null?void 0:o.direction,slots:{root:E},slotProps:S??c},_,{ref:n}))});process.env.NODE_ENV!=="production"&&(pa.propTypes={anchorEl:l.oneOfType([at,l.object,l.func]),children:l.oneOfType([l.node,l.func]),component:l.elementType,components:l.shape({Root:l.elementType}),componentsProps:l.shape({root:l.oneOfType([l.func,l.object])}),container:l.oneOfType([at,l.func]),disablePortal:l.bool,keepMounted:l.bool,modifiers:l.arrayOf(l.shape({data:l.object,effect:l.func,enabled:l.bool,fn:l.func,name:l.any,options:l.object,phase:l.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:l.arrayOf(l.string),requiresIfExists:l.arrayOf(l.string)})),open:l.bool.isRequired,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:l.shape({modifiers:l.array,onFirstUpdate:l.func,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:l.oneOf(["absolute","fixed"])}),popperRef:So,slotProps:l.shape({root:l.oneOfType([l.func,l.object])}),slots:l.shape({root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transition:l.bool});const fa=pa;function Df(e){return tt("MuiTooltip",e)}const Af=vt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),gt=Af,Ff=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Vf(e){return Math.round(e*1e5)/1e5}const Lf=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,s={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Qe(i.split("-")[0])}`],arrow:["arrow"]};return ct(s,Df,t)},Bf=Oe(fa,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>T({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${gt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${gt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${gt.arrow}`]:T({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${gt.arrow}`]:T({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),zf=Oe("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Qe(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>T({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:rr(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Vf(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${gt.popper}[data-popper-placement*="left"] &`]:T({transformOrigin:"right center"},t.isRtl?T({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):T({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${gt.popper}[data-popper-placement*="right"] &`]:T({transformOrigin:"left center"},t.isRtl?T({marginRight:"14px"},t.touch&&{marginRight:"24px"}):T({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${gt.popper}[data-popper-placement*="top"] &`]:T({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${gt.popper}[data-popper-placement*="bottom"] &`]:T({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Hf=Oe("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:rr(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Bn=!1;const Ji=new On;let ln={x:0,y:0};function zn(e,t){return n=>{t&&t(n),e(n)}}const ga=C.forwardRef(function(t,n){var r,o,i,s,a,u,c,d,g,p,f,h,m,v,y,P,x,S,b;const E=dt({props:t,name:"MuiTooltip"}),{arrow:_=!1,children:D,components:A={},componentsProps:B={},describeChild:N=!1,disableFocusListener:R=!1,disableHoverListener:k=!1,disableInteractive:$=!1,disableTouchListener:V=!1,enterDelay:j=100,enterNextDelay:z=0,enterTouchDelay:re=700,followCursor:ne=!1,id:O,leaveDelay:L=0,leaveTouchDelay:G=1500,onClose:Y,onOpen:H,open:U,placement:W="bottom",PopperComponent:X,PopperProps:q={},slotProps:K={},slots:Q={},title:se,TransitionComponent:F=so,TransitionProps:ee}=E,M=ge(E,Ff),ae=C.isValidElement(D)?D:w.jsx("span",{children:D}),Ce=In(),Ne=Ce.direction==="rtl",[xe,yt]=C.useState(),[_e,nt]=C.useState(null),De=C.useRef(!1),rt=$||ne,Ee=pn(),$t=pn(),xt=pn(),Zt=pn(),[jn,Wo]=Ms({controlled:U,default:!1,name:"Tooltip",state:"open"});let ot=jn;if(process.env.NODE_ENV!=="production"){const{current:oe}=C.useRef(U!==void 0);C.useEffect(()=>{xe&&xe.disabled&&!oe&&se!==""&&xe.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[se,xe,oe])}const xr=$s(O),Qt=C.useRef(),Dn=Sn(()=>{Qt.current!==void 0&&(document.body.style.WebkitUserSelect=Qt.current,Qt.current=void 0),Zt.clear()});C.useEffect(()=>Dn,[Dn]);const Xo=oe=>{Ji.clear(),Bn=!0,Wo(!0),H&&!ot&&H(oe)},An=Sn(oe=>{Ji.start(800+L,()=>{Bn=!1}),Wo(!1),Y&&ot&&Y(oe),Ee.start(Ce.transitions.duration.shortest,()=>{De.current=!1})}),Sr=oe=>{De.current&&oe.type!=="touchstart"||(xe&&xe.removeAttribute("title"),$t.clear(),xt.clear(),j||Bn&&z?$t.start(Bn?z:j,()=>{Xo(oe)}):Xo(oe))},Yo=oe=>{$t.clear(),xt.start(L,()=>{An(oe)})},{isFocusVisibleRef:Ko,onBlur:sl,onFocus:al,ref:ll}=Is(),[,Jo]=C.useState(!1),Zo=oe=>{sl(oe),Ko.current===!1&&(Jo(!1),Yo(oe))},Qo=oe=>{xe||yt(oe.currentTarget),al(oe),Ko.current===!0&&(Jo(!0),Sr(oe))},ei=oe=>{De.current=!0;const Ae=ae.props;Ae.onTouchStart&&Ae.onTouchStart(oe)},ti=Sr,ni=Yo,ul=oe=>{ei(oe),xt.clear(),Ee.clear(),Dn(),Qt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Zt.start(re,()=>{document.body.style.WebkitUserSelect=Qt.current,Sr(oe)})},cl=oe=>{ae.props.onTouchEnd&&ae.props.onTouchEnd(oe),Dn(),xt.start(G,()=>{An(oe)})};C.useEffect(()=>{if(!ot)return;function oe(Ae){(Ae.key==="Escape"||Ae.key==="Esc")&&An(Ae)}return document.addEventListener("keydown",oe),()=>{document.removeEventListener("keydown",oe)}},[An,ot]);const dl=Ue(ae.ref,ll,yt,n);!se&&se!==0&&(ot=!1);const Cr=C.useRef(),pl=oe=>{const Ae=ae.props;Ae.onMouseMove&&Ae.onMouseMove(oe),ln={x:oe.clientX,y:oe.clientY},Cr.current&&Cr.current.update()},en={},Er=typeof se=="string";N?(en.title=!ot&&Er&&!k?se:null,en["aria-describedby"]=ot?xr:null):(en["aria-label"]=Er?se:null,en["aria-labelledby"]=ot&&!Er?xr:null);const ze=T({},en,M,ae.props,{className:Te(M.className,ae.props.className),onTouchStart:ei,ref:dl},ne?{onMouseMove:pl}:{});process.env.NODE_ENV!=="production"&&(ze["data-mui-internal-clone-element"]=!0,C.useEffect(()=>{xe&&!xe.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[xe]));const tn={};V||(ze.onTouchStart=ul,ze.onTouchEnd=cl),k||(ze.onMouseOver=zn(ti,ze.onMouseOver),ze.onMouseLeave=zn(ni,ze.onMouseLeave),rt||(tn.onMouseOver=ti,tn.onMouseLeave=ni)),R||(ze.onFocus=zn(Qo,ze.onFocus),ze.onBlur=zn(Zo,ze.onBlur),rt||(tn.onFocus=Qo,tn.onBlur=Zo)),process.env.NODE_ENV!=="production"&&ae.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ae.props.title}\` or the Tooltip component.`].join(`
`));const fl=C.useMemo(()=>{var oe;let Ae=[{name:"arrow",enabled:!!_e,options:{element:_e,padding:4}}];return(oe=q.popperOptions)!=null&&oe.modifiers&&(Ae=Ae.concat(q.popperOptions.modifiers)),T({},q.popperOptions,{modifiers:Ae})},[_e,q]),nn=T({},E,{isRtl:Ne,arrow:_,disableInteractive:rt,placement:W,PopperComponentProp:X,touch:De.current}),Rr=Lf(nn),ri=(r=(o=Q.popper)!=null?o:A.Popper)!=null?r:Bf,oi=(i=(s=(a=Q.transition)!=null?a:A.Transition)!=null?s:F)!=null?i:so,ii=(u=(c=Q.tooltip)!=null?c:A.Tooltip)!=null?u:zf,si=(d=(g=Q.arrow)!=null?g:A.Arrow)!=null?d:Hf,gl=fn(ri,T({},q,(p=K.popper)!=null?p:B.popper,{className:Te(Rr.popper,q==null?void 0:q.className,(f=(h=K.popper)!=null?h:B.popper)==null?void 0:f.className)}),nn),ml=fn(oi,T({},ee,(m=K.transition)!=null?m:B.transition),nn),hl=fn(ii,T({},(v=K.tooltip)!=null?v:B.tooltip,{className:Te(Rr.tooltip,(y=(P=K.tooltip)!=null?P:B.tooltip)==null?void 0:y.className)}),nn),vl=fn(si,T({},(x=K.arrow)!=null?x:B.arrow,{className:Te(Rr.arrow,(S=(b=K.arrow)!=null?b:B.arrow)==null?void 0:S.className)}),nn);return w.jsxs(C.Fragment,{children:[C.cloneElement(ae,ze),w.jsx(ri,T({as:X??fa,placement:W,anchorEl:ne?{getBoundingClientRect:()=>({top:ln.y,left:ln.x,right:ln.x,bottom:ln.y,width:0,height:0})}:xe,popperRef:Cr,open:xe?ot:!1,id:xr,transition:!0},tn,gl,{popperOptions:fl,children:({TransitionProps:oe})=>w.jsx(oi,T({timeout:Ce.transitions.duration.shorter},oe,ml,{children:w.jsxs(ii,T({},hl,{children:[se,_?w.jsx(si,T({},vl,{ref:nt})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(ga.propTypes={arrow:l.bool,children:Pn.isRequired,classes:l.object,className:l.string,components:l.shape({Arrow:l.elementType,Popper:l.elementType,Tooltip:l.elementType,Transition:l.elementType}),componentsProps:l.shape({arrow:l.object,popper:l.object,tooltip:l.object,transition:l.object}),describeChild:l.bool,disableFocusListener:l.bool,disableHoverListener:l.bool,disableInteractive:l.bool,disableTouchListener:l.bool,enterDelay:l.number,enterNextDelay:l.number,enterTouchDelay:l.number,followCursor:l.bool,id:l.string,leaveDelay:l.number,leaveTouchDelay:l.number,onClose:l.func,onOpen:l.func,open:l.bool,placement:l.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:l.elementType,PopperProps:l.object,slotProps:l.shape({arrow:l.object,popper:l.object,tooltip:l.object,transition:l.object}),slots:l.shape({arrow:l.elementType,popper:l.elementType,tooltip:l.elementType,transition:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),title:l.node,TransitionComponent:l.elementType,TransitionProps:l.object});const Gf=ga;var Vo={},ma={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(ma);var Uf=ma.exports,Dr={};function qf(e){return tt("MuiSvgIcon",e)}vt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Wf=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Xf=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Qe(t)}`,`fontSize${Qe(n)}`]};return ct(o,qf,r)},Yf=Oe("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Qe(n.color)}`],t[`fontSize${Qe(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,s,a,u,c,d,g,p,f,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(s=i.pxToRem)==null?void 0:s.call(i,20))||"1.25rem",medium:((a=e.typography)==null||(u=a.pxToRem)==null?void 0:u.call(a,24))||"1.5rem",large:((c=e.typography)==null||(d=c.pxToRem)==null?void 0:d.call(c,35))||"2.1875rem"}[t.fontSize],color:(g=(p=(e.vars||e).palette)==null||(p=p[t.color])==null?void 0:p.main)!=null?g:{action:(f=(e.vars||e).palette)==null||(f=f.action)==null?void 0:f.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),Lo=C.forwardRef(function(t,n){const r=dt({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:s="inherit",component:a="svg",fontSize:u="medium",htmlColor:c,inheritViewBox:d=!1,titleAccess:g,viewBox:p="0 0 24 24"}=r,f=ge(r,Wf),h=C.isValidElement(o)&&o.type==="svg",m=T({},r,{color:s,component:a,fontSize:u,instanceFontSize:t.fontSize,inheritViewBox:d,viewBox:p,hasSvgAsChild:h}),v={};d||(v.viewBox=p);const y=Xf(m);return w.jsxs(Yf,T({as:a,className:Te(y.root,i),focusable:"false",color:c,"aria-hidden":g?void 0:!0,role:g?"img":void 0,ref:n},v,f,h&&o.props,{ownerState:m,children:[h?o.props.children:o,g?w.jsx("title",{children:g}):null]}))});process.env.NODE_ENV!=="production"&&(Lo.propTypes={children:l.node,classes:l.object,className:l.string,color:l.oneOfType([l.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),l.string]),component:l.elementType,fontSize:l.oneOfType([l.oneOf(["inherit","large","medium","small"]),l.string]),htmlColor:l.string,inheritViewBox:l.bool,shapeRendering:l.string,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),titleAccess:l.string,viewBox:l.string});Lo.muiName="SvgIcon";const Zi=Lo;function ha(e,t){function n(r,o){return w.jsx(Zi,T({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Zi.muiName,C.memo(C.forwardRef(n))}const Kf={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Ls.configure(e)}},Jf=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Qe,createChainedFunction:Zr,createSvgIcon:ha,debounce:_s,deprecatedPropType:Cu,isMuiElement:Eu,ownerDocument:Pe,ownerWindow:Gt,requirePropFactory:Ru,setRef:Zn,unstable_ClassNameGenerator:Kf,unstable_useEnhancedEffect:Pt,unstable_useId:$s,unsupportedProp:Pu,useControlled:Ms,useEventCallback:Sn,useForkRef:Ue,useIsFocusVisible:Is},Symbol.toStringTag,{value:"Module"})),Zf=nu(Jf);var Qi;function Qf(){return Qi||(Qi=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Zf}(Dr)),Dr}var eg=Uf;Object.defineProperty(Vo,"__esModule",{value:!0});var va=Vo.default=void 0,tg=eg(Qf()),ng=w;va=Vo.default=(0,tg.default)((0,ng.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function es(e,t,n){return e?w.jsx(we.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:w.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Bo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:s=void 0,hasAutoFocus:a=!1,className:u,isDisabled:c=!1,isDense:d=!0,isSubMenuParent:g=!1,hasDisabledGutters:p=!1,hasDivider:f=!1,focusVisibleClassName:h,id:m,children:v}=e,y=w.jsx(we.MenuItem,{sx:{lineHeight:.8},autoFocus:a,className:u,disabled:c,dense:d,disableGutters:p,divider:f,focusVisibleClassName:h,onClick:t,id:m,children:n?w.jsxs(w.Fragment,{children:[es(i,n,!0),w.jsx(we.ListItemText,{primary:n,inset:!i&&o}),g?w.jsx(we.ListItemIcon,{className:"papi-menu-icon-trailing",children:w.jsx(va,{})}):es(s,n,!1)]}):v});return r?w.jsx(Gf,{title:r,placement:"right",children:w.jsx("div",{children:y})}):y}function ba(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function rg(e){const[t,n]=I.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,s=c=>{n(c.currentTarget)},a=()=>{n(void 0)},u=()=>{let c=ba(i).filter(d=>"menuItem"in d.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return c=c.filter(d=>"menuItem"in d.group&&d.group.menuItem===r.id),w.jsx(zo,{...e,includedGroups:c})};return w.jsxs(w.Fragment,{children:[w.jsx(Bo,{onClick:s,...o,isSubMenuParent:!0}),w.jsx(we.Menu,{anchorEl:t,open:!!t,onClose:a,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:u()},r.id)]})}const og=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function zo(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:s}=I.useMemo(()=>{const d=o&&o.length>0?o:ba(t).filter(h=>!("menuItem"in h.group)),g=Object.values(d).sort((h,m)=>(h.group.order||0)-(m.group.order||0)),p=[];g.forEach(h=>{og(h.id,t.items).forEach(m=>p.push({item:m,isLastItemInGroup:!1})),p.length>0&&(p[p.length-1].isLastItemInGroup=!0)}),p.length>0&&(p[p.length-1].isLastItemInGroup=!1);const f=p.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:p,allowForLeadingIcons:f}},[o,t]),a=({item:d,isLastItemInGroup:g})=>({className:"papi-menu-item",label:d.label,tooltip:d.tooltip,iconPathBefore:"iconPathBefore"in d?d.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in d?d.iconPathAfter:void 0,hasDivider:g,allowForLeadingIcons:s}),[u]=i;if(!u)return w.jsx("div",{});const c=u.item.group;return w.jsx("div",{role:"menu","aria-label":c,children:i.map((d,g)=>{const{item:p}=d,f=a(d);if("command"in p){const h=p.group+g;return w.jsx(Bo,{onClick:m=>{n==null||n(m),r(p)},...f},h)}return w.jsx(rg,{parentMenuItem:p,parentItemProps:f,...e},c+p.id)})},c)}function ig(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([s,a])=>({id:s,group:a})).filter(s=>"column"in s.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(s=>"column"in s.group&&s.group.column===n)),w.jsx(zo,{...e,includedGroups:i})}function sg({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return w.jsxs(we.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[w.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),w.jsx(we.List,{id:n,dense:!0,className:i??"",children:w.jsx(ig,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function wa({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=I.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(a=>{if(a==="isExtensible")return;const u=a,c=o[u];typeof c=="object"&&typeof c.order=="number"&&!Number.isNaN(c.order)?s.set(c.order,{id:u,metadata:c}):console.warn(`Property ${a} (${typeof c}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((a,u)=>(a.metadata.order||0)-(u.metadata.order||0))},[o,r]);return w.jsx(we.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((s,a)=>w.jsx(sg,{commandHandler:e,menuDefinition:n,...s,className:t},a))})}const ya=C.createContext({});process.env.NODE_ENV!=="production"&&(ya.displayName="ListContext");const ag=ya;function lg(e){return tt("MuiList",e)}vt("MuiList",["root","padding","dense","subheader"]);const ug=["children","className","component","dense","disablePadding","subheader"],cg=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return ct({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},lg,t)},dg=Oe("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>T({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),xa=C.forwardRef(function(t,n){const r=dt({props:t,name:"MuiList"}),{children:o,className:i,component:s="ul",dense:a=!1,disablePadding:u=!1,subheader:c}=r,d=ge(r,ug),g=C.useMemo(()=>({dense:a}),[a]),p=T({},r,{component:s,dense:a,disablePadding:u}),f=cg(p);return w.jsx(ag.Provider,{value:g,children:w.jsxs(dg,T({as:s,className:Te(f.root,i),ref:n,ownerState:p},d,{children:[c,o]}))})});process.env.NODE_ENV!=="production"&&(xa.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,dense:l.bool,disablePadding:l.bool,subheader:l.node,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object])});const pg=xa,fg=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Ar(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function ts(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function Sa(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function un(e,t,n,r,o,i){let s=!1,a=o(e,t,t?n:!1);for(;a;){if(a===e.firstChild){if(s)return!1;s=!0}const u=r?!1:a.disabled||a.getAttribute("aria-disabled")==="true";if(!a.hasAttribute("tabindex")||!Sa(a,i)||u)a=o(e,a,n);else return a.focus(),!0}return!1}const Ca=C.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:s,className:a,disabledItemsFocusable:u=!1,disableListWrap:c=!1,onKeyDown:d,variant:g="selectedMenu"}=t,p=ge(t,fg),f=C.useRef(null),h=C.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Pt(()=>{o&&f.current.focus()},[o]),C.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(x,S)=>{const b=!f.current.style.width;if(x.clientHeight<f.current.clientHeight&&b){const E=`${js(Pe(x))}px`;f.current.style[S.direction==="rtl"?"paddingLeft":"paddingRight"]=E,f.current.style.width=`calc(100% + ${E})`}return f.current}}),[]);const m=x=>{const S=f.current,b=x.key,E=Pe(S).activeElement;if(b==="ArrowDown")x.preventDefault(),un(S,E,c,u,Ar);else if(b==="ArrowUp")x.preventDefault(),un(S,E,c,u,ts);else if(b==="Home")x.preventDefault(),un(S,null,c,u,Ar);else if(b==="End")x.preventDefault(),un(S,null,c,u,ts);else if(b.length===1){const _=h.current,D=b.toLowerCase(),A=performance.now();_.keys.length>0&&(A-_.lastTime>500?(_.keys=[],_.repeating=!0,_.previousKeyMatched=!0):_.repeating&&D!==_.keys[0]&&(_.repeating=!1)),_.lastTime=A,_.keys.push(D);const B=E&&!_.repeating&&Sa(E,_);_.previousKeyMatched&&(B||un(S,E,!1,u,Ar,_))?x.preventDefault():_.previousKeyMatched=!1}d&&d(x)},v=Ue(f,n);let y=-1;C.Children.forEach(s,(x,S)=>{if(!C.isValidElement(x)){y===S&&(y+=1,y>=s.length&&(y=-1));return}process.env.NODE_ENV!=="production"&&Jn.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(g==="selectedMenu"&&x.props.selected||y===-1)&&(y=S),y===S&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(y+=1,y>=s.length&&(y=-1))});const P=C.Children.map(s,(x,S)=>{if(S===y){const b={};return i&&(b.autoFocus=!0),x.props.tabIndex===void 0&&g==="selectedMenu"&&(b.tabIndex=0),C.cloneElement(x,b)}return x});return w.jsx(pg,T({role:"menu",ref:v,className:a,onKeyDown:m,tabIndex:o?0:-1},p,{children:P}))});process.env.NODE_ENV!=="production"&&(Ca.propTypes={autoFocus:l.bool,autoFocusItem:l.bool,children:l.node,className:l.string,disabledItemsFocusable:l.bool,disableListWrap:l.bool,onKeyDown:l.func,variant:l.oneOf(["menu","selectedMenu"])});const gg=Ca,mg=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],hg={entering:{opacity:1},entered:{opacity:1}},Ea=C.forwardRef(function(t,n){const r=In(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:s=!0,children:a,easing:u,in:c,onEnter:d,onEntered:g,onEntering:p,onExit:f,onExited:h,onExiting:m,style:v,timeout:y=o,TransitionComponent:P=ca}=t,x=ge(t,mg),S=C.useRef(null),b=Ue(S,a.ref,n),E=$=>V=>{if($){const j=S.current;V===void 0?$(j):$(j,V)}},_=E(p),D=E(($,V)=>{da($);const j=or({style:v,timeout:y,easing:u},{mode:"enter"});$.style.webkitTransition=r.transitions.create("opacity",j),$.style.transition=r.transitions.create("opacity",j),d&&d($,V)}),A=E(g),B=E(m),N=E($=>{const V=or({style:v,timeout:y,easing:u},{mode:"exit"});$.style.webkitTransition=r.transitions.create("opacity",V),$.style.transition=r.transitions.create("opacity",V),f&&f($)}),R=E(h),k=$=>{i&&i(S.current,$)};return w.jsx(P,T({appear:s,in:c,nodeRef:S,onEnter:D,onEntered:A,onEntering:_,onExit:N,onExited:R,onExiting:B,addEndListener:k,timeout:y},x,{children:($,V)=>C.cloneElement(a,T({style:T({opacity:0,visibility:$==="exited"&&!c?"hidden":void 0},hg[$],v,a.props.style),ref:b},V))}))});process.env.NODE_ENV!=="production"&&(Ea.propTypes={addEndListener:l.func,appear:l.bool,children:Pn.isRequired,easing:l.oneOfType([l.shape({enter:l.string,exit:l.string}),l.string]),in:l.bool,onEnter:l.func,onEntered:l.func,onEntering:l.func,onExit:l.func,onExited:l.func,onExiting:l.func,style:l.object,timeout:l.oneOfType([l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});const vg=Ea;function bg(e){return tt("MuiBackdrop",e)}vt("MuiBackdrop",["root","invisible"]);const wg=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],yg=e=>{const{classes:t,invisible:n}=e;return ct({root:["root",n&&"invisible"]},bg,t)},xg=Oe("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>T({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),Ra=C.forwardRef(function(t,n){var r,o,i;const s=dt({props:t,name:"MuiBackdrop"}),{children:a,className:u,component:c="div",components:d={},componentsProps:g={},invisible:p=!1,open:f,slotProps:h={},slots:m={},TransitionComponent:v=vg,transitionDuration:y}=s,P=ge(s,wg),x=T({},s,{component:c,invisible:p}),S=yg(x),b=(r=h.root)!=null?r:g.root;return w.jsx(v,T({in:f,timeout:y},P,{children:w.jsx(xg,T({"aria-hidden":!0},b,{as:(o=(i=m.root)!=null?i:d.Root)!=null?o:c,className:Te(S.root,u,b==null?void 0:b.className),ownerState:T({},x,b==null?void 0:b.ownerState),classes:S,ref:n,children:a}))}))});process.env.NODE_ENV!=="production"&&(Ra.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,components:l.shape({Root:l.elementType}),componentsProps:l.shape({root:l.object}),invisible:l.bool,open:l.bool.isRequired,slotProps:l.shape({root:l.object}),slots:l.shape({root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),TransitionComponent:l.elementType,transitionDuration:l.oneOfType([l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});const Sg=Ra;function Cg(e){return tt("MuiModal",e)}vt("MuiModal",["root","hidden","backdrop"]);const Eg=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Rg=e=>{const{open:t,exited:n,classes:r}=e;return ct({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},Cg,r)},kg=Oe("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>T({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Tg=Oe(Sg,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),ka=C.forwardRef(function(t,n){var r,o,i,s,a,u;const c=dt({name:"MuiModal",props:t}),{BackdropComponent:d=Tg,BackdropProps:g,className:p,closeAfterTransition:f=!1,children:h,container:m,component:v,components:y={},componentsProps:P={},disableAutoFocus:x=!1,disableEnforceFocus:S=!1,disableEscapeKeyDown:b=!1,disablePortal:E=!1,disableRestoreFocus:_=!1,disableScrollLock:D=!1,hideBackdrop:A=!1,keepMounted:B=!1,onBackdropClick:N,open:R,slotProps:k,slots:$}=c,V=ge(c,Eg),j=T({},c,{closeAfterTransition:f,disableAutoFocus:x,disableEnforceFocus:S,disableEscapeKeyDown:b,disablePortal:E,disableRestoreFocus:_,disableScrollLock:D,hideBackdrop:A,keepMounted:B}),{getRootProps:z,getBackdropProps:re,getTransitionProps:ne,portalRef:O,isTopModal:L,exited:G,hasTransition:Y}=mc(T({},j,{rootRef:n})),H=T({},j,{exited:G}),U=Rg(H),W={};if(h.props.tabIndex===void 0&&(W.tabIndex="-1"),Y){const{onEnter:ee,onExited:M}=ne();W.onEnter=ee,W.onExited=M}const X=(r=(o=$==null?void 0:$.root)!=null?o:y.Root)!=null?r:kg,q=(i=(s=$==null?void 0:$.backdrop)!=null?s:y.Backdrop)!=null?i:d,K=(a=k==null?void 0:k.root)!=null?a:P.root,Q=(u=k==null?void 0:k.backdrop)!=null?u:P.backdrop,se=Ot({elementType:X,externalSlotProps:K,externalForwardedProps:V,getSlotProps:z,additionalProps:{ref:n,as:v},ownerState:H,className:Te(p,K==null?void 0:K.className,U==null?void 0:U.root,!H.open&&H.exited&&(U==null?void 0:U.hidden))}),F=Ot({elementType:q,externalSlotProps:Q,additionalProps:g,getSlotProps:ee=>re(T({},ee,{onClick:M=>{N&&N(M),ee!=null&&ee.onClick&&ee.onClick(M)}})),className:Te(Q==null?void 0:Q.className,g==null?void 0:g.className,U==null?void 0:U.backdrop),ownerState:H});return!B&&!R&&(!Y||G)?null:w.jsx(Cn,{ref:O,container:m,disablePortal:E,children:w.jsxs(X,T({},se,{children:[!A&&d?w.jsx(q,T({},F)):null,w.jsx(Qn,{disableEnforceFocus:S,disableAutoFocus:x,disableRestoreFocus:_,isEnabled:L,open:R,children:C.cloneElement(h,W)})]}))})});process.env.NODE_ENV!=="production"&&(ka.propTypes={BackdropComponent:l.elementType,BackdropProps:l.object,children:Pn.isRequired,classes:l.object,className:l.string,closeAfterTransition:l.bool,component:l.elementType,components:l.shape({Backdrop:l.elementType,Root:l.elementType}),componentsProps:l.shape({backdrop:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),container:l.oneOfType([at,l.func]),disableAutoFocus:l.bool,disableEnforceFocus:l.bool,disableEscapeKeyDown:l.bool,disablePortal:l.bool,disableRestoreFocus:l.bool,disableScrollLock:l.bool,hideBackdrop:l.bool,keepMounted:l.bool,onBackdropClick:l.func,onClose:l.func,onTransitionEnter:l.func,onTransitionExited:l.func,open:l.bool.isRequired,slotProps:l.shape({backdrop:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({backdrop:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object])});const Pg=ka;function Og(e){return tt("MuiPaper",e)}vt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Ng=["className","component","elevation","square","variant"],_g=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return ct(i,Og,o)},$g=Oe("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return T({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&T({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${rr("#fff",Ki(t.elevation))}, ${rr("#fff",Ki(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Ta=C.forwardRef(function(t,n){const r=dt({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:s=1,square:a=!1,variant:u="elevation"}=r,c=ge(r,Ng),d=T({},r,{component:i,elevation:s,square:a,variant:u}),g=_g(d);return process.env.NODE_ENV!=="production"&&In().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),w.jsx($g,T({as:i,ownerState:d,className:Te(g.root,o),ref:n},c))});process.env.NODE_ENV!=="production"&&(Ta.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,elevation:Jt(Fs,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:l.bool,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),variant:l.oneOfType([l.oneOf(["elevation","outlined"]),l.string])});const Mg=Ta;function Ig(e){return tt("MuiPopover",e)}vt("MuiPopover",["root","paper"]);const jg=["onEntering"],Dg=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Ag=["slotProps"];function ns(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function rs(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function os(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function Yn(e){return typeof e=="function"?e():e}const Fg=e=>{const{classes:t}=e;return ct({root:["root"],paper:["paper"]},Ig,t)},Vg=Oe(Pg,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Pa=Oe(Mg,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Oa=C.forwardRef(function(t,n){var r,o,i;const s=dt({props:t,name:"MuiPopover"}),{action:a,anchorEl:u,anchorOrigin:c={vertical:"top",horizontal:"left"},anchorPosition:d,anchorReference:g="anchorEl",children:p,className:f,container:h,elevation:m=8,marginThreshold:v=16,open:y,PaperProps:P={},slots:x,slotProps:S,transformOrigin:b={vertical:"top",horizontal:"left"},TransitionComponent:E=so,transitionDuration:_="auto",TransitionProps:{onEntering:D}={},disableScrollLock:A=!1}=s,B=ge(s.TransitionProps,jg),N=ge(s,Dg),R=(r=S==null?void 0:S.paper)!=null?r:P,k=C.useRef(),$=Ue(k,R.ref),V=T({},s,{anchorOrigin:c,anchorReference:g,elevation:m,marginThreshold:v,externalPaperSlotProps:R,transformOrigin:b,TransitionComponent:E,transitionDuration:_,TransitionProps:B}),j=Fg(V),z=C.useCallback(()=>{if(g==="anchorPosition")return process.env.NODE_ENV!=="production"&&(d||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),d;const ee=Yn(u),M=ee&&ee.nodeType===1?ee:Pe(k.current).body,ae=M.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Ce=M.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Ce.top===0&&Ce.left===0&&Ce.right===0&&Ce.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:ae.top+ns(ae,c.vertical),left:ae.left+rs(ae,c.horizontal)}},[u,c.horizontal,c.vertical,d,g]),re=C.useCallback(ee=>({vertical:ns(ee,b.vertical),horizontal:rs(ee,b.horizontal)}),[b.horizontal,b.vertical]),ne=C.useCallback(ee=>{const M={width:ee.offsetWidth,height:ee.offsetHeight},ae=re(M);if(g==="none")return{top:null,left:null,transformOrigin:os(ae)};const Ce=z();let Ne=Ce.top-ae.vertical,xe=Ce.left-ae.horizontal;const yt=Ne+M.height,_e=xe+M.width,nt=Gt(Yn(u)),De=nt.innerHeight-v,rt=nt.innerWidth-v;if(v!==null&&Ne<v){const Ee=Ne-v;Ne-=Ee,ae.vertical+=Ee}else if(v!==null&&yt>De){const Ee=yt-De;Ne-=Ee,ae.vertical+=Ee}if(process.env.NODE_ENV!=="production"&&M.height>De&&M.height&&De&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${M.height-De}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),v!==null&&xe<v){const Ee=xe-v;xe-=Ee,ae.horizontal+=Ee}else if(_e>rt){const Ee=_e-rt;xe-=Ee,ae.horizontal+=Ee}return{top:`${Math.round(Ne)}px`,left:`${Math.round(xe)}px`,transformOrigin:os(ae)}},[u,g,z,re,v]),[O,L]=C.useState(y),G=C.useCallback(()=>{const ee=k.current;if(!ee)return;const M=ne(ee);M.top!==null&&(ee.style.top=M.top),M.left!==null&&(ee.style.left=M.left),ee.style.transformOrigin=M.transformOrigin,L(!0)},[ne]);C.useEffect(()=>(A&&window.addEventListener("scroll",G),()=>window.removeEventListener("scroll",G)),[u,A,G]);const Y=(ee,M)=>{D&&D(ee,M),G()},H=()=>{L(!1)};C.useEffect(()=>{y&&G()}),C.useImperativeHandle(a,()=>y?{updatePosition:()=>{G()}}:null,[y,G]),C.useEffect(()=>{if(!y)return;const ee=_s(()=>{G()}),M=Gt(u);return M.addEventListener("resize",ee),()=>{ee.clear(),M.removeEventListener("resize",ee)}},[u,y,G]);let U=_;_==="auto"&&!E.muiSupportAuto&&(U=void 0);const W=h||(u?Pe(Yn(u)).body:void 0),X=(o=x==null?void 0:x.root)!=null?o:Vg,q=(i=x==null?void 0:x.paper)!=null?i:Pa,K=Ot({elementType:q,externalSlotProps:T({},R,{style:O?R.style:T({},R.style,{opacity:0})}),additionalProps:{elevation:m,ref:$},ownerState:V,className:Te(j.paper,R==null?void 0:R.className)}),Q=Ot({elementType:X,externalSlotProps:(S==null?void 0:S.root)||{},externalForwardedProps:N,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:W,open:y},ownerState:V,className:Te(j.root,f)}),{slotProps:se}=Q,F=ge(Q,Ag);return w.jsx(X,T({},F,!zs(X)&&{slotProps:se,disableScrollLock:A},{children:w.jsx(E,T({appear:!0,in:y,onEntering:Y,onExited:H,timeout:U},B,{children:w.jsx(q,T({},K,{children:p}))}))}))});process.env.NODE_ENV!=="production"&&(Oa.propTypes={action:So,anchorEl:Jt(l.oneOfType([at,l.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=Yn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:l.shape({horizontal:l.oneOfType([l.oneOf(["center","left","right"]),l.number]).isRequired,vertical:l.oneOfType([l.oneOf(["bottom","center","top"]),l.number]).isRequired}),anchorPosition:l.shape({left:l.number.isRequired,top:l.number.isRequired}),anchorReference:l.oneOf(["anchorEl","anchorPosition","none"]),children:l.node,classes:l.object,className:l.string,container:l.oneOfType([at,l.func]),disableScrollLock:l.bool,elevation:Fs,marginThreshold:l.number,onClose:l.func,open:l.bool.isRequired,PaperProps:l.shape({component:mu}),slotProps:l.shape({paper:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({paper:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transformOrigin:l.shape({horizontal:l.oneOfType([l.oneOf(["center","left","right"]),l.number]).isRequired,vertical:l.oneOfType([l.oneOf(["bottom","center","top"]),l.number]).isRequired}),TransitionComponent:l.elementType,transitionDuration:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})]),TransitionProps:l.object});const Lg=Oa;function Bg(e){return tt("MuiMenu",e)}vt("MuiMenu",["root","paper","list"]);const zg=["onEntering"],Hg=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Gg={vertical:"top",horizontal:"right"},Ug={vertical:"top",horizontal:"left"},qg=e=>{const{classes:t}=e;return ct({root:["root"],paper:["paper"],list:["list"]},Bg,t)},Wg=Oe(Lg,{shouldForwardProp:e=>la(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Xg=Oe(Pa,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),Yg=Oe(gg,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Na=C.forwardRef(function(t,n){var r,o;const i=dt({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:a,className:u,disableAutoFocusItem:c=!1,MenuListProps:d={},onClose:g,open:p,PaperProps:f={},PopoverClasses:h,transitionDuration:m="auto",TransitionProps:{onEntering:v}={},variant:y="selectedMenu",slots:P={},slotProps:x={}}=i,S=ge(i.TransitionProps,zg),b=ge(i,Hg),E=In(),_=E.direction==="rtl",D=T({},i,{autoFocus:s,disableAutoFocusItem:c,MenuListProps:d,onEntering:v,PaperProps:f,transitionDuration:m,TransitionProps:S,variant:y}),A=qg(D),B=s&&!c&&p,N=C.useRef(null),R=(ne,O)=>{N.current&&N.current.adjustStyleForScrollbar(ne,E),v&&v(ne,O)},k=ne=>{ne.key==="Tab"&&(ne.preventDefault(),g&&g(ne,"tabKeyDown"))};let $=-1;C.Children.map(a,(ne,O)=>{C.isValidElement(ne)&&(process.env.NODE_ENV!=="production"&&Jn.isFragment(ne)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),ne.props.disabled||(y==="selectedMenu"&&ne.props.selected||$===-1)&&($=O))});const V=(r=P.paper)!=null?r:Xg,j=(o=x.paper)!=null?o:f,z=Ot({elementType:P.root,externalSlotProps:x.root,ownerState:D,className:[A.root,u]}),re=Ot({elementType:V,externalSlotProps:j,ownerState:D,className:A.paper});return w.jsx(Wg,T({onClose:g,anchorOrigin:{vertical:"bottom",horizontal:_?"right":"left"},transformOrigin:_?Gg:Ug,slots:{paper:V,root:P.root},slotProps:{root:z,paper:re},open:p,ref:n,transitionDuration:m,TransitionProps:T({onEntering:R},S),ownerState:D},b,{classes:h,children:w.jsx(Yg,T({onKeyDown:k,actions:N,autoFocus:s&&($===-1||c),autoFocusItem:B,variant:y},d,{className:Te(A.list,d.className),children:a}))}))});process.env.NODE_ENV!=="production"&&(Na.propTypes={anchorEl:l.oneOfType([at,l.func]),autoFocus:l.bool,children:l.node,classes:l.object,className:l.string,disableAutoFocusItem:l.bool,MenuListProps:l.object,onClose:l.func,open:l.bool.isRequired,PaperProps:l.object,PopoverClasses:l.object,slotProps:l.shape({paper:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({paper:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transitionDuration:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})]),TransitionProps:l.object,variant:l.oneOf(["menu","selectedMenu"])});const Kg=Na;function Jg({className:e,commandHandler:t,menuDefinition:n,children:r}){var c;const[o,i]=I.useState(void 0),s=I.useCallback(d=>{d.preventDefault(),i(o===void 0?{mouseX:d.clientX+2,mouseY:d.clientY-6}:void 0)},[o]),a=I.useCallback(()=>{i(void 0)},[]),u=I.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((c=n==null?void 0:n.items)==null?void 0:c.length)??0)===0||!r?r:w.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[r,w.jsx(Kg,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:a,anchorReference:"anchorPosition",anchorPosition:u,children:w.jsx(zo,{menuDefinition:n,commandHandler:t,onClick:a})})]})}const Zg=ha(w.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Qg(e){return{preserveValue:!0,...e}}const ir=(e,t,n={})=>{const r=I.useRef(t);r.current=t;const o=I.useRef(n);o.current=Qg(o.current);const[i,s]=I.useState(()=>r.current),[a,u]=I.useState(!0);return I.useEffect(()=>{let c=!0;return u(!!e),(async()=>{if(e){const d=await e();c&&(s(()=>d),u(!1))}})(),()=>{c=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[i,a]};function _a({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:i,ariaLabelPrefix:s,children:a}){const[u,c]=I.useState(!1),[d,g]=I.useState(!1),p=I.useCallback(()=>{u&&c(!1),g(!1)},[u]),f=I.useCallback(S=>{S.stopPropagation(),c(b=>{const E=!b;return E&&S.shiftKey?g(!0):E||g(!1),E})},[]),h=I.useCallback(S=>(p(),r(S)),[r,p]),[m,v]=I.useState({top:1,left:1});I.useEffect(()=>{if(u){const S=o==null?void 0:o.current;if(S){const b=S.getBoundingClientRect(),E=window.scrollY,_=window.scrollX,D=b.top+E+S.clientHeight,A=b.left+_;v({top:D,left:A})}}},[u,o]);const[y]=ir(I.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,u]),t),[P]=ir(I.useCallback(async()=>(e==null?void 0:e(!0))??n??y,[e,n,y,u]),n??y),x=d&&P?P:y;return w.jsxs(w.Fragment,{children:[w.jsx(we.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${i??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:f,children:a??w.jsx(Zg,{})}),w.jsx(we.Drawer,{className:`papi-menu-drawer ${i??""}`,anchor:"left",variant:"temporary",open:u,onClose:p,PaperProps:{className:"papi-menu-drawer-paper",style:{top:m.top,left:m.left}},children:x?w.jsx(wa,{className:i,id:`${s??""} main menu`,commandHandler:h,multiColumnMenu:x}):void 0})]})}function em({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:s="medium",className:a,onClick:u,children:c}){return w.jsx(we.IconButton,{id:e,disabled:n,edge:i,size:s,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${a??""}`,onClick:u,children:c})}const tm=ls.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),Ho=I.forwardRef(({className:e,...t},n)=>w.jsx(us.Root,{ref:n,className:te(tm(),e),...t}));Ho.displayName=us.Root.displayName;function Tn({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:i,placeholder:s,isRequired:a=!1,className:u,defaultValue:c,value:d,onChange:g,onFocus:p,onBlur:f}){return w.jsxs("div",{className:te("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":r}),children:[w.jsx(Ho,{htmlFor:e,className:te({"pr-text-red-600":n,"pr-hidden":!i}),children:`${i}${a?"*":""}`}),w.jsx(ar,{id:e,disabled:t,placeholder:s,required:a,className:te(u,{"pr-border-red-600":n}),defaultValue:c,value:d,onChange:g,onFocus:p,onBlur:f}),w.jsx("p",{className:te({"pr-hidden":!o}),children:o})]})}let Fr;const Vr=()=>(Fr||(Fr=ue.allBookIds.map(e=>({bookId:e,label:ue.bookIdToEnglishName(e)}))),Fr);function nm({scrRef:e,handleSubmit:t,id:n}){const r=u=>{t(u)},o=(u,c)=>{const g={bookNum:ue.bookIdToNumber(c.bookId),chapterNum:1,verseNum:1};r(g)},i=u=>{t({...e,chapterNum:+u.target.value})},s=u=>{t({...e,verseNum:+u.target.value})},a=I.useMemo(()=>Vr()[e.bookNum-1],[e.bookNum]);return w.jsxs("span",{id:n,className:"pr-flex pr-place-items-center",children:[w.jsx(Kn,{title:"Book",className:"papi-ref-selector book",value:a,options:Vr(),onChange:o,isClearable:!1,width:200}),w.jsx(Je,{onClick:()=>r(Re.offsetBook(e,-1)),disabled:e.bookNum<=Re.FIRST_SCR_BOOK_NUM,children:"<"}),w.jsx(Je,{onClick:()=>r(Re.offsetBook(e,1)),disabled:e.bookNum>=Vr().length,children:">"}),w.jsx(Tn,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),w.jsx(Je,{onClick:()=>t(Re.offsetChapter(e,-1)),disabled:e.chapterNum<=Re.FIRST_SCR_CHAPTER_NUM,children:"<"}),w.jsx(Je,{onClick:()=>t(Re.offsetChapter(e,1)),disabled:e.chapterNum>=Re.getChaptersForBook(e.bookNum),children:">"}),w.jsx(Tn,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:s}),w.jsx(Je,{onClick:()=>t(Re.offsetVerse(e,-1)),disabled:e.verseNum<=Re.FIRST_SCR_VERSE_NUM,children:"<"}),w.jsx(Je,{onClick:()=>t(Re.offsetVerse(e,1)),children:">"})]})}/**
   * table-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function mt(e,t){return typeof e=="function"?e(t):e}function Be(e,t){return n=>{t.setState(r=>({...r,[e]:mt(n,r[e])}))}}function yr(e){return e instanceof Function}function rm(e){return Array.isArray(e)&&e.every(t=>typeof t=="number")}function $a(e,t){const n=[],r=o=>{o.forEach(i=>{n.push(i);const s=t(i);s!=null&&s.length&&r(s)})};return r(e),n}function J(e,t,n){let r=[],o;return i=>{let s;n.key&&n.debug&&(s=Date.now());const a=e(i);if(!(a.length!==r.length||a.some((d,g)=>r[g]!==d)))return o;r=a;let c;if(n.key&&n.debug&&(c=Date.now()),o=t(...a),n==null||n.onChange==null||n.onChange(o),n.key&&n.debug&&n!=null&&n.debug()){const d=Math.round((Date.now()-s)*100)/100,g=Math.round((Date.now()-c)*100)/100,p=g/16,f=(h,m)=>{for(h=String(h);h.length<m;)h=" "+h;return h};console.info(`%c⏱ ${f(g,5)} /${f(d,5)} ms`,`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0,Math.min(120-120*p,120))}deg 100% 31%);`,n==null?void 0:n.key)}return o}}function Z(e,t,n,r){return{debug:()=>{var o;return(o=e==null?void 0:e.debugAll)!=null?o:e[t]},key:process.env.NODE_ENV==="development"&&n,onChange:r}}function om(e,t,n,r){const o=()=>{var s;return(s=i.getValue())!=null?s:e.options.renderFallbackValue},i={id:`${t.id}_${n.id}`,row:t,column:n,getValue:()=>t.getValue(r),renderValue:o,getContext:J(()=>[e,n,t,i],(s,a,u,c)=>({table:s,column:a,row:u,cell:c,getValue:c.getValue,renderValue:c.renderValue}),Z(e.options,"debugCells","cell.getContext"))};return e._features.forEach(s=>{s.createCell==null||s.createCell(i,n,t,e)},{}),i}function im(e,t,n,r){var o,i;const a={...e._getDefaultColumnDef(),...t},u=a.accessorKey;let c=(o=(i=a.id)!=null?i:u?u.replace(".","_"):void 0)!=null?o:typeof a.header=="string"?a.header:void 0,d;if(a.accessorFn?d=a.accessorFn:u&&(u.includes(".")?d=p=>{let f=p;for(const m of u.split(".")){var h;f=(h=f)==null?void 0:h[m],process.env.NODE_ENV!=="production"&&f===void 0&&console.warn(`"${m}" in deeply nested key "${u}" returned undefined.`)}return f}:d=p=>p[a.accessorKey]),!c)throw process.env.NODE_ENV!=="production"?new Error(a.accessorFn?"Columns require an id when using an accessorFn":"Columns require an id when using a non-string header"):new Error;let g={id:`${String(c)}`,accessorFn:d,parent:r,depth:n,columnDef:a,columns:[],getFlatColumns:J(()=>[!0],()=>{var p;return[g,...(p=g.columns)==null?void 0:p.flatMap(f=>f.getFlatColumns())]},Z(e.options,"debugColumns","column.getFlatColumns")),getLeafColumns:J(()=>[e._getOrderColumnsFn()],p=>{var f;if((f=g.columns)!=null&&f.length){let h=g.columns.flatMap(m=>m.getLeafColumns());return p(h)}return[g]},Z(e.options,"debugColumns","column.getLeafColumns"))};for(const p of e._features)p.createColumn==null||p.createColumn(g,e);return g}const ke="debugHeaders";function is(e,t,n){var r;let i={id:(r=n.id)!=null?r:t.id,column:t,index:n.index,isPlaceholder:!!n.isPlaceholder,placeholderId:n.placeholderId,depth:n.depth,subHeaders:[],colSpan:0,rowSpan:0,headerGroup:null,getLeafHeaders:()=>{const s=[],a=u=>{u.subHeaders&&u.subHeaders.length&&u.subHeaders.map(a),s.push(u)};return a(i),s},getContext:()=>({table:e,header:i,column:t})};return e._features.forEach(s=>{s.createHeader==null||s.createHeader(i,e)}),i}const sm={createTable:e=>{e.getHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,o)=>{var i,s;const a=(i=r==null?void 0:r.map(g=>n.find(p=>p.id===g)).filter(Boolean))!=null?i:[],u=(s=o==null?void 0:o.map(g=>n.find(p=>p.id===g)).filter(Boolean))!=null?s:[],c=n.filter(g=>!(r!=null&&r.includes(g.id))&&!(o!=null&&o.includes(g.id)));return Hn(t,[...a,...c,...u],e)},Z(e.options,ke,"getHeaderGroups")),e.getCenterHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,o)=>(n=n.filter(i=>!(r!=null&&r.includes(i.id))&&!(o!=null&&o.includes(i.id))),Hn(t,n,e,"center")),Z(e.options,ke,"getCenterHeaderGroups")),e.getLeftHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left],(t,n,r)=>{var o;const i=(o=r==null?void 0:r.map(s=>n.find(a=>a.id===s)).filter(Boolean))!=null?o:[];return Hn(t,i,e,"left")},Z(e.options,ke,"getLeftHeaderGroups")),e.getRightHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.right],(t,n,r)=>{var o;const i=(o=r==null?void 0:r.map(s=>n.find(a=>a.id===s)).filter(Boolean))!=null?o:[];return Hn(t,i,e,"right")},Z(e.options,ke,"getRightHeaderGroups")),e.getFooterGroups=J(()=>[e.getHeaderGroups()],t=>[...t].reverse(),Z(e.options,ke,"getFooterGroups")),e.getLeftFooterGroups=J(()=>[e.getLeftHeaderGroups()],t=>[...t].reverse(),Z(e.options,ke,"getLeftFooterGroups")),e.getCenterFooterGroups=J(()=>[e.getCenterHeaderGroups()],t=>[...t].reverse(),Z(e.options,ke,"getCenterFooterGroups")),e.getRightFooterGroups=J(()=>[e.getRightHeaderGroups()],t=>[...t].reverse(),Z(e.options,ke,"getRightFooterGroups")),e.getFlatHeaders=J(()=>[e.getHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,ke,"getFlatHeaders")),e.getLeftFlatHeaders=J(()=>[e.getLeftHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,ke,"getLeftFlatHeaders")),e.getCenterFlatHeaders=J(()=>[e.getCenterHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,ke,"getCenterFlatHeaders")),e.getRightFlatHeaders=J(()=>[e.getRightHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,ke,"getRightFlatHeaders")),e.getCenterLeafHeaders=J(()=>[e.getCenterFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),Z(e.options,ke,"getCenterLeafHeaders")),e.getLeftLeafHeaders=J(()=>[e.getLeftFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),Z(e.options,ke,"getLeftLeafHeaders")),e.getRightLeafHeaders=J(()=>[e.getRightFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),Z(e.options,ke,"getRightLeafHeaders")),e.getLeafHeaders=J(()=>[e.getLeftHeaderGroups(),e.getCenterHeaderGroups(),e.getRightHeaderGroups()],(t,n,r)=>{var o,i,s,a,u,c;return[...(o=(i=t[0])==null?void 0:i.headers)!=null?o:[],...(s=(a=n[0])==null?void 0:a.headers)!=null?s:[],...(u=(c=r[0])==null?void 0:c.headers)!=null?u:[]].map(d=>d.getLeafHeaders()).flat()},Z(e.options,ke,"getLeafHeaders"))}};function Hn(e,t,n,r){var o,i;let s=0;const a=function(p,f){f===void 0&&(f=1),s=Math.max(s,f),p.filter(h=>h.getIsVisible()).forEach(h=>{var m;(m=h.columns)!=null&&m.length&&a(h.columns,f+1)},0)};a(e);let u=[];const c=(p,f)=>{const h={depth:f,id:[r,`${f}`].filter(Boolean).join("_"),headers:[]},m=[];p.forEach(v=>{const y=[...m].reverse()[0],P=v.column.depth===h.depth;let x,S=!1;if(P&&v.column.parent?x=v.column.parent:(x=v.column,S=!0),y&&(y==null?void 0:y.column)===x)y.subHeaders.push(v);else{const b=is(n,x,{id:[r,f,x.id,v==null?void 0:v.id].filter(Boolean).join("_"),isPlaceholder:S,placeholderId:S?`${m.filter(E=>E.column===x).length}`:void 0,depth:f,index:m.length});b.subHeaders.push(v),m.push(b)}h.headers.push(v),v.headerGroup=h}),u.push(h),f>0&&c(m,f-1)},d=t.map((p,f)=>is(n,p,{depth:s,index:f}));c(d,s-1),u.reverse();const g=p=>p.filter(h=>h.column.getIsVisible()).map(h=>{let m=0,v=0,y=[0];h.subHeaders&&h.subHeaders.length?(y=[],g(h.subHeaders).forEach(x=>{let{colSpan:S,rowSpan:b}=x;m+=S,y.push(b)})):m=1;const P=Math.min(...y);return v=v+P,h.colSpan=m,h.rowSpan=v,{colSpan:m,rowSpan:v}});return g((o=(i=u[0])==null?void 0:i.headers)!=null?o:[]),u}const Ma=(e,t,n,r,o,i,s)=>{let a={id:t,index:r,original:n,depth:o,parentId:s,_valuesCache:{},_uniqueValuesCache:{},getValue:u=>{if(a._valuesCache.hasOwnProperty(u))return a._valuesCache[u];const c=e.getColumn(u);if(c!=null&&c.accessorFn)return a._valuesCache[u]=c.accessorFn(a.original,r),a._valuesCache[u]},getUniqueValues:u=>{if(a._uniqueValuesCache.hasOwnProperty(u))return a._uniqueValuesCache[u];const c=e.getColumn(u);if(c!=null&&c.accessorFn)return c.columnDef.getUniqueValues?(a._uniqueValuesCache[u]=c.columnDef.getUniqueValues(a.original,r),a._uniqueValuesCache[u]):(a._uniqueValuesCache[u]=[a.getValue(u)],a._uniqueValuesCache[u])},renderValue:u=>{var c;return(c=a.getValue(u))!=null?c:e.options.renderFallbackValue},subRows:i??[],getLeafRows:()=>$a(a.subRows,u=>u.subRows),getParentRow:()=>a.parentId?e.getRow(a.parentId,!0):void 0,getParentRows:()=>{let u=[],c=a;for(;;){const d=c.getParentRow();if(!d)break;u.push(d),c=d}return u.reverse()},getAllCells:J(()=>[e.getAllLeafColumns()],u=>u.map(c=>om(e,a,c,c.id)),Z(e.options,"debugRows","getAllCells")),_getAllCellsByColumnId:J(()=>[a.getAllCells()],u=>u.reduce((c,d)=>(c[d.column.id]=d,c),{}),Z(e.options,"debugRows","getAllCellsByColumnId"))};for(let u=0;u<e._features.length;u++){const c=e._features[u];c==null||c.createRow==null||c.createRow(a,e)}return a},am={createColumn:(e,t)=>{e._getFacetedRowModel=t.options.getFacetedRowModel&&t.options.getFacetedRowModel(t,e.id),e.getFacetedRowModel=()=>e._getFacetedRowModel?e._getFacetedRowModel():t.getPreFilteredRowModel(),e._getFacetedUniqueValues=t.options.getFacetedUniqueValues&&t.options.getFacetedUniqueValues(t,e.id),e.getFacetedUniqueValues=()=>e._getFacetedUniqueValues?e._getFacetedUniqueValues():new Map,e._getFacetedMinMaxValues=t.options.getFacetedMinMaxValues&&t.options.getFacetedMinMaxValues(t,e.id),e.getFacetedMinMaxValues=()=>{if(e._getFacetedMinMaxValues)return e._getFacetedMinMaxValues()}}},Ia=(e,t,n)=>{var r;const o=n.toLowerCase();return!!(!((r=e.getValue(t))==null||(r=r.toString())==null||(r=r.toLowerCase())==null)&&r.includes(o))};Ia.autoRemove=e=>Ke(e);const ja=(e,t,n)=>{var r;return!!(!((r=e.getValue(t))==null||(r=r.toString())==null)&&r.includes(n))};ja.autoRemove=e=>Ke(e);const Da=(e,t,n)=>{var r;return((r=e.getValue(t))==null||(r=r.toString())==null?void 0:r.toLowerCase())===(n==null?void 0:n.toLowerCase())};Da.autoRemove=e=>Ke(e);const Aa=(e,t,n)=>{var r;return(r=e.getValue(t))==null?void 0:r.includes(n)};Aa.autoRemove=e=>Ke(e)||!(e!=null&&e.length);const Fa=(e,t,n)=>!n.some(r=>{var o;return!((o=e.getValue(t))!=null&&o.includes(r))});Fa.autoRemove=e=>Ke(e)||!(e!=null&&e.length);const Va=(e,t,n)=>n.some(r=>{var o;return(o=e.getValue(t))==null?void 0:o.includes(r)});Va.autoRemove=e=>Ke(e)||!(e!=null&&e.length);const La=(e,t,n)=>e.getValue(t)===n;La.autoRemove=e=>Ke(e);const Ba=(e,t,n)=>e.getValue(t)==n;Ba.autoRemove=e=>Ke(e);const Go=(e,t,n)=>{let[r,o]=n;const i=e.getValue(t);return i>=r&&i<=o};Go.resolveFilterValue=e=>{let[t,n]=e,r=typeof t!="number"?parseFloat(t):t,o=typeof n!="number"?parseFloat(n):n,i=t===null||Number.isNaN(r)?-1/0:r,s=n===null||Number.isNaN(o)?1/0:o;if(i>s){const a=i;i=s,s=a}return[i,s]};Go.autoRemove=e=>Ke(e)||Ke(e[0])&&Ke(e[1]);const it={includesString:Ia,includesStringSensitive:ja,equalsString:Da,arrIncludes:Aa,arrIncludesAll:Fa,arrIncludesSome:Va,equals:La,weakEquals:Ba,inNumberRange:Go};function Ke(e){return e==null||e===""}const lm={getDefaultColumnDef:()=>({filterFn:"auto"}),getInitialState:e=>({columnFilters:[],...e}),getDefaultOptions:e=>({onColumnFiltersChange:Be("columnFilters",e),filterFromLeafRows:!1,maxLeafRowFilterDepth:100}),createColumn:(e,t)=>{e.getAutoFilterFn=()=>{const n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);return typeof r=="string"?it.includesString:typeof r=="number"?it.inNumberRange:typeof r=="boolean"||r!==null&&typeof r=="object"?it.equals:Array.isArray(r)?it.arrIncludes:it.weakEquals},e.getFilterFn=()=>{var n,r;return yr(e.columnDef.filterFn)?e.columnDef.filterFn:e.columnDef.filterFn==="auto"?e.getAutoFilterFn():(n=(r=t.options.filterFns)==null?void 0:r[e.columnDef.filterFn])!=null?n:it[e.columnDef.filterFn]},e.getCanFilter=()=>{var n,r,o;return((n=e.columnDef.enableColumnFilter)!=null?n:!0)&&((r=t.options.enableColumnFilters)!=null?r:!0)&&((o=t.options.enableFilters)!=null?o:!0)&&!!e.accessorFn},e.getIsFiltered=()=>e.getFilterIndex()>-1,e.getFilterValue=()=>{var n;return(n=t.getState().columnFilters)==null||(n=n.find(r=>r.id===e.id))==null?void 0:n.value},e.getFilterIndex=()=>{var n,r;return(n=(r=t.getState().columnFilters)==null?void 0:r.findIndex(o=>o.id===e.id))!=null?n:-1},e.setFilterValue=n=>{t.setColumnFilters(r=>{const o=e.getFilterFn(),i=r==null?void 0:r.find(d=>d.id===e.id),s=mt(n,i?i.value:void 0);if(ss(o,s,e)){var a;return(a=r==null?void 0:r.filter(d=>d.id!==e.id))!=null?a:[]}const u={id:e.id,value:s};if(i){var c;return(c=r==null?void 0:r.map(d=>d.id===e.id?u:d))!=null?c:[]}return r!=null&&r.length?[...r,u]:[u]})}},createRow:(e,t)=>{e.columnFilters={},e.columnFiltersMeta={}},createTable:e=>{e.setColumnFilters=t=>{const n=e.getAllLeafColumns(),r=o=>{var i;return(i=mt(t,o))==null?void 0:i.filter(s=>{const a=n.find(u=>u.id===s.id);if(a){const u=a.getFilterFn();if(ss(u,s.value,a))return!1}return!0})};e.options.onColumnFiltersChange==null||e.options.onColumnFiltersChange(r)},e.resetColumnFilters=t=>{var n,r;e.setColumnFilters(t?[]:(n=(r=e.initialState)==null?void 0:r.columnFilters)!=null?n:[])},e.getPreFilteredRowModel=()=>e.getCoreRowModel(),e.getFilteredRowModel=()=>(!e._getFilteredRowModel&&e.options.getFilteredRowModel&&(e._getFilteredRowModel=e.options.getFilteredRowModel(e)),e.options.manualFiltering||!e._getFilteredRowModel?e.getPreFilteredRowModel():e._getFilteredRowModel())}};function ss(e,t,n){return(e&&e.autoRemove?e.autoRemove(t,n):!1)||typeof t>"u"||typeof t=="string"&&!t}const um=(e,t,n)=>n.reduce((r,o)=>{const i=o.getValue(e);return r+(typeof i=="number"?i:0)},0),cm=(e,t,n)=>{let r;return n.forEach(o=>{const i=o.getValue(e);i!=null&&(r>i||r===void 0&&i>=i)&&(r=i)}),r},dm=(e,t,n)=>{let r;return n.forEach(o=>{const i=o.getValue(e);i!=null&&(r<i||r===void 0&&i>=i)&&(r=i)}),r},pm=(e,t,n)=>{let r,o;return n.forEach(i=>{const s=i.getValue(e);s!=null&&(r===void 0?s>=s&&(r=o=s):(r>s&&(r=s),o<s&&(o=s)))}),[r,o]},fm=(e,t)=>{let n=0,r=0;if(t.forEach(o=>{let i=o.getValue(e);i!=null&&(i=+i)>=i&&(++n,r+=i)}),n)return r/n},gm=(e,t)=>{if(!t.length)return;const n=t.map(i=>i.getValue(e));if(!rm(n))return;if(n.length===1)return n[0];const r=Math.floor(n.length/2),o=n.sort((i,s)=>i-s);return n.length%2!==0?o[r]:(o[r-1]+o[r])/2},mm=(e,t)=>Array.from(new Set(t.map(n=>n.getValue(e))).values()),hm=(e,t)=>new Set(t.map(n=>n.getValue(e))).size,vm=(e,t)=>t.length,Lr={sum:um,min:cm,max:dm,extent:pm,mean:fm,median:gm,unique:mm,uniqueCount:hm,count:vm},bm={getDefaultColumnDef:()=>({aggregatedCell:e=>{var t,n;return(t=(n=e.getValue())==null||n.toString==null?void 0:n.toString())!=null?t:null},aggregationFn:"auto"}),getInitialState:e=>({grouping:[],...e}),getDefaultOptions:e=>({onGroupingChange:Be("grouping",e),groupedColumnMode:"reorder"}),createColumn:(e,t)=>{e.toggleGrouping=()=>{t.setGrouping(n=>n!=null&&n.includes(e.id)?n.filter(r=>r!==e.id):[...n??[],e.id])},e.getCanGroup=()=>{var n,r;return((n=e.columnDef.enableGrouping)!=null?n:!0)&&((r=t.options.enableGrouping)!=null?r:!0)&&(!!e.accessorFn||!!e.columnDef.getGroupingValue)},e.getIsGrouped=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.includes(e.id)},e.getGroupedIndex=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.indexOf(e.id)},e.getToggleGroupingHandler=()=>{const n=e.getCanGroup();return()=>{n&&e.toggleGrouping()}},e.getAutoAggregationFn=()=>{const n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);if(typeof r=="number")return Lr.sum;if(Object.prototype.toString.call(r)==="[object Date]")return Lr.extent},e.getAggregationFn=()=>{var n,r;if(!e)throw new Error;return yr(e.columnDef.aggregationFn)?e.columnDef.aggregationFn:e.columnDef.aggregationFn==="auto"?e.getAutoAggregationFn():(n=(r=t.options.aggregationFns)==null?void 0:r[e.columnDef.aggregationFn])!=null?n:Lr[e.columnDef.aggregationFn]}},createTable:e=>{e.setGrouping=t=>e.options.onGroupingChange==null?void 0:e.options.onGroupingChange(t),e.resetGrouping=t=>{var n,r;e.setGrouping(t?[]:(n=(r=e.initialState)==null?void 0:r.grouping)!=null?n:[])},e.getPreGroupedRowModel=()=>e.getFilteredRowModel(),e.getGroupedRowModel=()=>(!e._getGroupedRowModel&&e.options.getGroupedRowModel&&(e._getGroupedRowModel=e.options.getGroupedRowModel(e)),e.options.manualGrouping||!e._getGroupedRowModel?e.getPreGroupedRowModel():e._getGroupedRowModel())},createRow:(e,t)=>{e.getIsGrouped=()=>!!e.groupingColumnId,e.getGroupingValue=n=>{if(e._groupingValuesCache.hasOwnProperty(n))return e._groupingValuesCache[n];const r=t.getColumn(n);return r!=null&&r.columnDef.getGroupingValue?(e._groupingValuesCache[n]=r.columnDef.getGroupingValue(e.original),e._groupingValuesCache[n]):e.getValue(n)},e._groupingValuesCache={}},createCell:(e,t,n,r)=>{e.getIsGrouped=()=>t.getIsGrouped()&&t.id===n.groupingColumnId,e.getIsPlaceholder=()=>!e.getIsGrouped()&&t.getIsGrouped(),e.getIsAggregated=()=>{var o;return!e.getIsGrouped()&&!e.getIsPlaceholder()&&!!((o=n.subRows)!=null&&o.length)}}};function wm(e,t,n){if(!(t!=null&&t.length)||!n)return e;const r=e.filter(i=>!t.includes(i.id));return n==="remove"?r:[...t.map(i=>e.find(s=>s.id===i)).filter(Boolean),...r]}const ym={getInitialState:e=>({columnOrder:[],...e}),getDefaultOptions:e=>({onColumnOrderChange:Be("columnOrder",e)}),createColumn:(e,t)=>{e.getIndex=J(n=>[xn(t,n)],n=>n.findIndex(r=>r.id===e.id),Z(t.options,"debugColumns","getIndex")),e.getIsFirstColumn=n=>{var r;return((r=xn(t,n)[0])==null?void 0:r.id)===e.id},e.getIsLastColumn=n=>{var r;const o=xn(t,n);return((r=o[o.length-1])==null?void 0:r.id)===e.id}},createTable:e=>{e.setColumnOrder=t=>e.options.onColumnOrderChange==null?void 0:e.options.onColumnOrderChange(t),e.resetColumnOrder=t=>{var n;e.setColumnOrder(t?[]:(n=e.initialState.columnOrder)!=null?n:[])},e._getOrderColumnsFn=J(()=>[e.getState().columnOrder,e.getState().grouping,e.options.groupedColumnMode],(t,n,r)=>o=>{let i=[];if(!(t!=null&&t.length))i=o;else{const s=[...t],a=[...o];for(;a.length&&s.length;){const u=s.shift(),c=a.findIndex(d=>d.id===u);c>-1&&i.push(a.splice(c,1)[0])}i=[...i,...a]}return wm(i,n,r)},Z(e.options,"debugTable","_getOrderColumnsFn"))}},Br=()=>({left:[],right:[]}),xm={getInitialState:e=>({columnPinning:Br(),...e}),getDefaultOptions:e=>({onColumnPinningChange:Be("columnPinning",e)}),createColumn:(e,t)=>{e.pin=n=>{const r=e.getLeafColumns().map(o=>o.id).filter(Boolean);t.setColumnPinning(o=>{var i,s;if(n==="right"){var a,u;return{left:((a=o==null?void 0:o.left)!=null?a:[]).filter(g=>!(r!=null&&r.includes(g))),right:[...((u=o==null?void 0:o.right)!=null?u:[]).filter(g=>!(r!=null&&r.includes(g))),...r]}}if(n==="left"){var c,d;return{left:[...((c=o==null?void 0:o.left)!=null?c:[]).filter(g=>!(r!=null&&r.includes(g))),...r],right:((d=o==null?void 0:o.right)!=null?d:[]).filter(g=>!(r!=null&&r.includes(g)))}}return{left:((i=o==null?void 0:o.left)!=null?i:[]).filter(g=>!(r!=null&&r.includes(g))),right:((s=o==null?void 0:o.right)!=null?s:[]).filter(g=>!(r!=null&&r.includes(g)))}})},e.getCanPin=()=>e.getLeafColumns().some(r=>{var o,i,s;return((o=r.columnDef.enablePinning)!=null?o:!0)&&((i=(s=t.options.enableColumnPinning)!=null?s:t.options.enablePinning)!=null?i:!0)}),e.getIsPinned=()=>{const n=e.getLeafColumns().map(a=>a.id),{left:r,right:o}=t.getState().columnPinning,i=n.some(a=>r==null?void 0:r.includes(a)),s=n.some(a=>o==null?void 0:o.includes(a));return i?"left":s?"right":!1},e.getPinnedIndex=()=>{var n,r;const o=e.getIsPinned();return o?(n=(r=t.getState().columnPinning)==null||(r=r[o])==null?void 0:r.indexOf(e.id))!=null?n:-1:0}},createRow:(e,t)=>{e.getCenterVisibleCells=J(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left,t.getState().columnPinning.right],(n,r,o)=>{const i=[...r??[],...o??[]];return n.filter(s=>!i.includes(s.column.id))},Z(t.options,"debugRows","getCenterVisibleCells")),e.getLeftVisibleCells=J(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left],(n,r)=>(r??[]).map(i=>n.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"left"})),Z(t.options,"debugRows","getLeftVisibleCells")),e.getRightVisibleCells=J(()=>[e._getAllVisibleCells(),t.getState().columnPinning.right],(n,r)=>(r??[]).map(i=>n.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"right"})),Z(t.options,"debugRows","getRightVisibleCells"))},createTable:e=>{e.setColumnPinning=t=>e.options.onColumnPinningChange==null?void 0:e.options.onColumnPinningChange(t),e.resetColumnPinning=t=>{var n,r;return e.setColumnPinning(t?Br():(n=(r=e.initialState)==null?void 0:r.columnPinning)!=null?n:Br())},e.getIsSomeColumnsPinned=t=>{var n;const r=e.getState().columnPinning;if(!t){var o,i;return!!((o=r.left)!=null&&o.length||(i=r.right)!=null&&i.length)}return!!((n=r[t])!=null&&n.length)},e.getLeftLeafColumns=J(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left],(t,n)=>(n??[]).map(r=>t.find(o=>o.id===r)).filter(Boolean),Z(e.options,"debugColumns","getLeftLeafColumns")),e.getRightLeafColumns=J(()=>[e.getAllLeafColumns(),e.getState().columnPinning.right],(t,n)=>(n??[]).map(r=>t.find(o=>o.id===r)).filter(Boolean),Z(e.options,"debugColumns","getRightLeafColumns")),e.getCenterLeafColumns=J(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r)=>{const o=[...n??[],...r??[]];return t.filter(i=>!o.includes(i.id))},Z(e.options,"debugColumns","getCenterLeafColumns"))}},Gn={size:150,minSize:20,maxSize:Number.MAX_SAFE_INTEGER},zr=()=>({startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,isResizingColumn:!1,columnSizingStart:[]}),Sm={getDefaultColumnDef:()=>Gn,getInitialState:e=>({columnSizing:{},columnSizingInfo:zr(),...e}),getDefaultOptions:e=>({columnResizeMode:"onEnd",columnResizeDirection:"ltr",onColumnSizingChange:Be("columnSizing",e),onColumnSizingInfoChange:Be("columnSizingInfo",e)}),createColumn:(e,t)=>{e.getSize=()=>{var n,r,o;const i=t.getState().columnSizing[e.id];return Math.min(Math.max((n=e.columnDef.minSize)!=null?n:Gn.minSize,(r=i??e.columnDef.size)!=null?r:Gn.size),(o=e.columnDef.maxSize)!=null?o:Gn.maxSize)},e.getStart=J(n=>[n,xn(t,n),t.getState().columnSizing],(n,r)=>r.slice(0,e.getIndex(n)).reduce((o,i)=>o+i.getSize(),0),Z(t.options,"debugColumns","getStart")),e.getAfter=J(n=>[n,xn(t,n),t.getState().columnSizing],(n,r)=>r.slice(e.getIndex(n)+1).reduce((o,i)=>o+i.getSize(),0),Z(t.options,"debugColumns","getAfter")),e.resetSize=()=>{t.setColumnSizing(n=>{let{[e.id]:r,...o}=n;return o})},e.getCanResize=()=>{var n,r;return((n=e.columnDef.enableResizing)!=null?n:!0)&&((r=t.options.enableColumnResizing)!=null?r:!0)},e.getIsResizing=()=>t.getState().columnSizingInfo.isResizingColumn===e.id},createHeader:(e,t)=>{e.getSize=()=>{let n=0;const r=o=>{if(o.subHeaders.length)o.subHeaders.forEach(r);else{var i;n+=(i=o.column.getSize())!=null?i:0}};return r(e),n},e.getStart=()=>{if(e.index>0){const n=e.headerGroup.headers[e.index-1];return n.getStart()+n.getSize()}return 0},e.getResizeHandler=n=>{const r=t.getColumn(e.column.id),o=r==null?void 0:r.getCanResize();return i=>{if(!r||!o||(i.persist==null||i.persist(),Hr(i)&&i.touches&&i.touches.length>1))return;const s=e.getSize(),a=e?e.getLeafHeaders().map(y=>[y.column.id,y.column.getSize()]):[[r.id,r.getSize()]],u=Hr(i)?Math.round(i.touches[0].clientX):i.clientX,c={},d=(y,P)=>{typeof P=="number"&&(t.setColumnSizingInfo(x=>{var S,b;const E=t.options.columnResizeDirection==="rtl"?-1:1,_=(P-((S=x==null?void 0:x.startOffset)!=null?S:0))*E,D=Math.max(_/((b=x==null?void 0:x.startSize)!=null?b:0),-.999999);return x.columnSizingStart.forEach(A=>{let[B,N]=A;c[B]=Math.round(Math.max(N+N*D,0)*100)/100}),{...x,deltaOffset:_,deltaPercentage:D}}),(t.options.columnResizeMode==="onChange"||y==="end")&&t.setColumnSizing(x=>({...x,...c})))},g=y=>d("move",y),p=y=>{d("end",y),t.setColumnSizingInfo(P=>({...P,isResizingColumn:!1,startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,columnSizingStart:[]}))},f=n||typeof document<"u"?document:null,h={moveHandler:y=>g(y.clientX),upHandler:y=>{f==null||f.removeEventListener("mousemove",h.moveHandler),f==null||f.removeEventListener("mouseup",h.upHandler),p(y.clientX)}},m={moveHandler:y=>(y.cancelable&&(y.preventDefault(),y.stopPropagation()),g(y.touches[0].clientX),!1),upHandler:y=>{var P;f==null||f.removeEventListener("touchmove",m.moveHandler),f==null||f.removeEventListener("touchend",m.upHandler),y.cancelable&&(y.preventDefault(),y.stopPropagation()),p((P=y.touches[0])==null?void 0:P.clientX)}},v=Cm()?{passive:!1}:!1;Hr(i)?(f==null||f.addEventListener("touchmove",m.moveHandler,v),f==null||f.addEventListener("touchend",m.upHandler,v)):(f==null||f.addEventListener("mousemove",h.moveHandler,v),f==null||f.addEventListener("mouseup",h.upHandler,v)),t.setColumnSizingInfo(y=>({...y,startOffset:u,startSize:s,deltaOffset:0,deltaPercentage:0,columnSizingStart:a,isResizingColumn:r.id}))}}},createTable:e=>{e.setColumnSizing=t=>e.options.onColumnSizingChange==null?void 0:e.options.onColumnSizingChange(t),e.setColumnSizingInfo=t=>e.options.onColumnSizingInfoChange==null?void 0:e.options.onColumnSizingInfoChange(t),e.resetColumnSizing=t=>{var n;e.setColumnSizing(t?{}:(n=e.initialState.columnSizing)!=null?n:{})},e.resetHeaderSizeInfo=t=>{var n;e.setColumnSizingInfo(t?zr():(n=e.initialState.columnSizingInfo)!=null?n:zr())},e.getTotalSize=()=>{var t,n;return(t=(n=e.getHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getLeftTotalSize=()=>{var t,n;return(t=(n=e.getLeftHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getCenterTotalSize=()=>{var t,n;return(t=(n=e.getCenterHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getRightTotalSize=()=>{var t,n;return(t=(n=e.getRightHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0}}};let Un=null;function Cm(){if(typeof Un=="boolean")return Un;let e=!1;try{const t={get passive(){return e=!0,!1}},n=()=>{};window.addEventListener("test",n,t),window.removeEventListener("test",n)}catch{e=!1}return Un=e,Un}function Hr(e){return e.type==="touchstart"}const Em={getInitialState:e=>({columnVisibility:{},...e}),getDefaultOptions:e=>({onColumnVisibilityChange:Be("columnVisibility",e)}),createColumn:(e,t)=>{e.toggleVisibility=n=>{e.getCanHide()&&t.setColumnVisibility(r=>({...r,[e.id]:n??!e.getIsVisible()}))},e.getIsVisible=()=>{var n,r;const o=e.columns;return(n=o.length?o.some(i=>i.getIsVisible()):(r=t.getState().columnVisibility)==null?void 0:r[e.id])!=null?n:!0},e.getCanHide=()=>{var n,r;return((n=e.columnDef.enableHiding)!=null?n:!0)&&((r=t.options.enableHiding)!=null?r:!0)},e.getToggleVisibilityHandler=()=>n=>{e.toggleVisibility==null||e.toggleVisibility(n.target.checked)}},createRow:(e,t)=>{e._getAllVisibleCells=J(()=>[e.getAllCells(),t.getState().columnVisibility],n=>n.filter(r=>r.column.getIsVisible()),Z(t.options,"debugRows","_getAllVisibleCells")),e.getVisibleCells=J(()=>[e.getLeftVisibleCells(),e.getCenterVisibleCells(),e.getRightVisibleCells()],(n,r,o)=>[...n,...r,...o],Z(t.options,"debugRows","getVisibleCells"))},createTable:e=>{const t=(n,r)=>J(()=>[r(),r().filter(o=>o.getIsVisible()).map(o=>o.id).join("_")],o=>o.filter(i=>i.getIsVisible==null?void 0:i.getIsVisible()),Z(e.options,"debugColumns",n));e.getVisibleFlatColumns=t("getVisibleFlatColumns",()=>e.getAllFlatColumns()),e.getVisibleLeafColumns=t("getVisibleLeafColumns",()=>e.getAllLeafColumns()),e.getLeftVisibleLeafColumns=t("getLeftVisibleLeafColumns",()=>e.getLeftLeafColumns()),e.getRightVisibleLeafColumns=t("getRightVisibleLeafColumns",()=>e.getRightLeafColumns()),e.getCenterVisibleLeafColumns=t("getCenterVisibleLeafColumns",()=>e.getCenterLeafColumns()),e.setColumnVisibility=n=>e.options.onColumnVisibilityChange==null?void 0:e.options.onColumnVisibilityChange(n),e.resetColumnVisibility=n=>{var r;e.setColumnVisibility(n?{}:(r=e.initialState.columnVisibility)!=null?r:{})},e.toggleAllColumnsVisible=n=>{var r;n=(r=n)!=null?r:!e.getIsAllColumnsVisible(),e.setColumnVisibility(e.getAllLeafColumns().reduce((o,i)=>({...o,[i.id]:n||!(i.getCanHide!=null&&i.getCanHide())}),{}))},e.getIsAllColumnsVisible=()=>!e.getAllLeafColumns().some(n=>!(n.getIsVisible!=null&&n.getIsVisible())),e.getIsSomeColumnsVisible=()=>e.getAllLeafColumns().some(n=>n.getIsVisible==null?void 0:n.getIsVisible()),e.getToggleAllColumnsVisibilityHandler=()=>n=>{var r;e.toggleAllColumnsVisible((r=n.target)==null?void 0:r.checked)}}};function xn(e,t){return t?t==="center"?e.getCenterVisibleLeafColumns():t==="left"?e.getLeftVisibleLeafColumns():e.getRightVisibleLeafColumns():e.getVisibleLeafColumns()}const Rm={createTable:e=>{e._getGlobalFacetedRowModel=e.options.getFacetedRowModel&&e.options.getFacetedRowModel(e,"__global__"),e.getGlobalFacetedRowModel=()=>e.options.manualFiltering||!e._getGlobalFacetedRowModel?e.getPreFilteredRowModel():e._getGlobalFacetedRowModel(),e._getGlobalFacetedUniqueValues=e.options.getFacetedUniqueValues&&e.options.getFacetedUniqueValues(e,"__global__"),e.getGlobalFacetedUniqueValues=()=>e._getGlobalFacetedUniqueValues?e._getGlobalFacetedUniqueValues():new Map,e._getGlobalFacetedMinMaxValues=e.options.getFacetedMinMaxValues&&e.options.getFacetedMinMaxValues(e,"__global__"),e.getGlobalFacetedMinMaxValues=()=>{if(e._getGlobalFacetedMinMaxValues)return e._getGlobalFacetedMinMaxValues()}}},km={getInitialState:e=>({globalFilter:void 0,...e}),getDefaultOptions:e=>({onGlobalFilterChange:Be("globalFilter",e),globalFilterFn:"auto",getColumnCanGlobalFilter:t=>{var n;const r=(n=e.getCoreRowModel().flatRows[0])==null||(n=n._getAllCellsByColumnId()[t.id])==null?void 0:n.getValue();return typeof r=="string"||typeof r=="number"}}),createColumn:(e,t)=>{e.getCanGlobalFilter=()=>{var n,r,o,i;return((n=e.columnDef.enableGlobalFilter)!=null?n:!0)&&((r=t.options.enableGlobalFilter)!=null?r:!0)&&((o=t.options.enableFilters)!=null?o:!0)&&((i=t.options.getColumnCanGlobalFilter==null?void 0:t.options.getColumnCanGlobalFilter(e))!=null?i:!0)&&!!e.accessorFn}},createTable:e=>{e.getGlobalAutoFilterFn=()=>it.includesString,e.getGlobalFilterFn=()=>{var t,n;const{globalFilterFn:r}=e.options;return yr(r)?r:r==="auto"?e.getGlobalAutoFilterFn():(t=(n=e.options.filterFns)==null?void 0:n[r])!=null?t:it[r]},e.setGlobalFilter=t=>{e.options.onGlobalFilterChange==null||e.options.onGlobalFilterChange(t)},e.resetGlobalFilter=t=>{e.setGlobalFilter(t?void 0:e.initialState.globalFilter)}}},Tm={getInitialState:e=>({expanded:{},...e}),getDefaultOptions:e=>({onExpandedChange:Be("expanded",e),paginateExpandedRows:!0}),createTable:e=>{let t=!1,n=!1;e._autoResetExpanded=()=>{var r,o;if(!t){e._queue(()=>{t=!0});return}if((r=(o=e.options.autoResetAll)!=null?o:e.options.autoResetExpanded)!=null?r:!e.options.manualExpanding){if(n)return;n=!0,e._queue(()=>{e.resetExpanded(),n=!1})}},e.setExpanded=r=>e.options.onExpandedChange==null?void 0:e.options.onExpandedChange(r),e.toggleAllRowsExpanded=r=>{r??!e.getIsAllRowsExpanded()?e.setExpanded(!0):e.setExpanded({})},e.resetExpanded=r=>{var o,i;e.setExpanded(r?{}:(o=(i=e.initialState)==null?void 0:i.expanded)!=null?o:{})},e.getCanSomeRowsExpand=()=>e.getPrePaginationRowModel().flatRows.some(r=>r.getCanExpand()),e.getToggleAllRowsExpandedHandler=()=>r=>{r.persist==null||r.persist(),e.toggleAllRowsExpanded()},e.getIsSomeRowsExpanded=()=>{const r=e.getState().expanded;return r===!0||Object.values(r).some(Boolean)},e.getIsAllRowsExpanded=()=>{const r=e.getState().expanded;return typeof r=="boolean"?r===!0:!(!Object.keys(r).length||e.getRowModel().flatRows.some(o=>!o.getIsExpanded()))},e.getExpandedDepth=()=>{let r=0;return(e.getState().expanded===!0?Object.keys(e.getRowModel().rowsById):Object.keys(e.getState().expanded)).forEach(i=>{const s=i.split(".");r=Math.max(r,s.length)}),r},e.getPreExpandedRowModel=()=>e.getSortedRowModel(),e.getExpandedRowModel=()=>(!e._getExpandedRowModel&&e.options.getExpandedRowModel&&(e._getExpandedRowModel=e.options.getExpandedRowModel(e)),e.options.manualExpanding||!e._getExpandedRowModel?e.getPreExpandedRowModel():e._getExpandedRowModel())},createRow:(e,t)=>{e.toggleExpanded=n=>{t.setExpanded(r=>{var o;const i=r===!0?!0:!!(r!=null&&r[e.id]);let s={};if(r===!0?Object.keys(t.getRowModel().rowsById).forEach(a=>{s[a]=!0}):s=r,n=(o=n)!=null?o:!i,!i&&n)return{...s,[e.id]:!0};if(i&&!n){const{[e.id]:a,...u}=s;return u}return r})},e.getIsExpanded=()=>{var n;const r=t.getState().expanded;return!!((n=t.options.getIsRowExpanded==null?void 0:t.options.getIsRowExpanded(e))!=null?n:r===!0||r!=null&&r[e.id])},e.getCanExpand=()=>{var n,r,o;return(n=t.options.getRowCanExpand==null?void 0:t.options.getRowCanExpand(e))!=null?n:((r=t.options.enableExpanding)!=null?r:!0)&&!!((o=e.subRows)!=null&&o.length)},e.getIsAllParentsExpanded=()=>{let n=!0,r=e;for(;n&&r.parentId;)r=t.getRow(r.parentId,!0),n=r.getIsExpanded();return n},e.getToggleExpandedHandler=()=>{const n=e.getCanExpand();return()=>{n&&e.toggleExpanded()}}}},ao=0,lo=10,Gr=()=>({pageIndex:ao,pageSize:lo}),Pm={getInitialState:e=>({...e,pagination:{...Gr(),...e==null?void 0:e.pagination}}),getDefaultOptions:e=>({onPaginationChange:Be("pagination",e)}),createTable:e=>{let t=!1,n=!1;e._autoResetPageIndex=()=>{var r,o;if(!t){e._queue(()=>{t=!0});return}if((r=(o=e.options.autoResetAll)!=null?o:e.options.autoResetPageIndex)!=null?r:!e.options.manualPagination){if(n)return;n=!0,e._queue(()=>{e.resetPageIndex(),n=!1})}},e.setPagination=r=>{const o=i=>mt(r,i);return e.options.onPaginationChange==null?void 0:e.options.onPaginationChange(o)},e.resetPagination=r=>{var o;e.setPagination(r?Gr():(o=e.initialState.pagination)!=null?o:Gr())},e.setPageIndex=r=>{e.setPagination(o=>{let i=mt(r,o.pageIndex);const s=typeof e.options.pageCount>"u"||e.options.pageCount===-1?Number.MAX_SAFE_INTEGER:e.options.pageCount-1;return i=Math.max(0,Math.min(i,s)),{...o,pageIndex:i}})},e.resetPageIndex=r=>{var o,i;e.setPageIndex(r?ao:(o=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageIndex)!=null?o:ao)},e.resetPageSize=r=>{var o,i;e.setPageSize(r?lo:(o=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageSize)!=null?o:lo)},e.setPageSize=r=>{e.setPagination(o=>{const i=Math.max(1,mt(r,o.pageSize)),s=o.pageSize*o.pageIndex,a=Math.floor(s/i);return{...o,pageIndex:a,pageSize:i}})},e.setPageCount=r=>e.setPagination(o=>{var i;let s=mt(r,(i=e.options.pageCount)!=null?i:-1);return typeof s=="number"&&(s=Math.max(-1,s)),{...o,pageCount:s}}),e.getPageOptions=J(()=>[e.getPageCount()],r=>{let o=[];return r&&r>0&&(o=[...new Array(r)].fill(null).map((i,s)=>s)),o},Z(e.options,"debugTable","getPageOptions")),e.getCanPreviousPage=()=>e.getState().pagination.pageIndex>0,e.getCanNextPage=()=>{const{pageIndex:r}=e.getState().pagination,o=e.getPageCount();return o===-1?!0:o===0?!1:r<o-1},e.previousPage=()=>e.setPageIndex(r=>r-1),e.nextPage=()=>e.setPageIndex(r=>r+1),e.firstPage=()=>e.setPageIndex(0),e.lastPage=()=>e.setPageIndex(e.getPageCount()-1),e.getPrePaginationRowModel=()=>e.getExpandedRowModel(),e.getPaginationRowModel=()=>(!e._getPaginationRowModel&&e.options.getPaginationRowModel&&(e._getPaginationRowModel=e.options.getPaginationRowModel(e)),e.options.manualPagination||!e._getPaginationRowModel?e.getPrePaginationRowModel():e._getPaginationRowModel()),e.getPageCount=()=>{var r;return(r=e.options.pageCount)!=null?r:Math.ceil(e.getRowCount()/e.getState().pagination.pageSize)},e.getRowCount=()=>{var r;return(r=e.options.rowCount)!=null?r:e.getPrePaginationRowModel().rows.length}}},Ur=()=>({top:[],bottom:[]}),Om={getInitialState:e=>({rowPinning:Ur(),...e}),getDefaultOptions:e=>({onRowPinningChange:Be("rowPinning",e)}),createRow:(e,t)=>{e.pin=(n,r,o)=>{const i=r?e.getLeafRows().map(u=>{let{id:c}=u;return c}):[],s=o?e.getParentRows().map(u=>{let{id:c}=u;return c}):[],a=new Set([...s,e.id,...i]);t.setRowPinning(u=>{var c,d;if(n==="bottom"){var g,p;return{top:((g=u==null?void 0:u.top)!=null?g:[]).filter(m=>!(a!=null&&a.has(m))),bottom:[...((p=u==null?void 0:u.bottom)!=null?p:[]).filter(m=>!(a!=null&&a.has(m))),...Array.from(a)]}}if(n==="top"){var f,h;return{top:[...((f=u==null?void 0:u.top)!=null?f:[]).filter(m=>!(a!=null&&a.has(m))),...Array.from(a)],bottom:((h=u==null?void 0:u.bottom)!=null?h:[]).filter(m=>!(a!=null&&a.has(m)))}}return{top:((c=u==null?void 0:u.top)!=null?c:[]).filter(m=>!(a!=null&&a.has(m))),bottom:((d=u==null?void 0:u.bottom)!=null?d:[]).filter(m=>!(a!=null&&a.has(m)))}})},e.getCanPin=()=>{var n;const{enableRowPinning:r,enablePinning:o}=t.options;return typeof r=="function"?r(e):(n=r??o)!=null?n:!0},e.getIsPinned=()=>{const n=[e.id],{top:r,bottom:o}=t.getState().rowPinning,i=n.some(a=>r==null?void 0:r.includes(a)),s=n.some(a=>o==null?void 0:o.includes(a));return i?"top":s?"bottom":!1},e.getPinnedIndex=()=>{var n,r;const o=e.getIsPinned();if(!o)return-1;const i=(n=t._getPinnedRows(o))==null?void 0:n.map(s=>{let{id:a}=s;return a});return(r=i==null?void 0:i.indexOf(e.id))!=null?r:-1}},createTable:e=>{e.setRowPinning=t=>e.options.onRowPinningChange==null?void 0:e.options.onRowPinningChange(t),e.resetRowPinning=t=>{var n,r;return e.setRowPinning(t?Ur():(n=(r=e.initialState)==null?void 0:r.rowPinning)!=null?n:Ur())},e.getIsSomeRowsPinned=t=>{var n;const r=e.getState().rowPinning;if(!t){var o,i;return!!((o=r.top)!=null&&o.length||(i=r.bottom)!=null&&i.length)}return!!((n=r[t])!=null&&n.length)},e._getPinnedRows=J(t=>[e.getRowModel().rows,e.getState().rowPinning[t],t],(t,n,r)=>{var o;return((o=e.options.keepPinnedRows)==null||o?(n??[]).map(s=>{const a=e.getRow(s,!0);return a.getIsAllParentsExpanded()?a:null}):(n??[]).map(s=>t.find(a=>a.id===s))).filter(Boolean).map(s=>({...s,position:r}))},Z(e.options,"debugRows","_getPinnedRows")),e.getTopRows=()=>e._getPinnedRows("top"),e.getBottomRows=()=>e._getPinnedRows("bottom"),e.getCenterRows=J(()=>[e.getRowModel().rows,e.getState().rowPinning.top,e.getState().rowPinning.bottom],(t,n,r)=>{const o=new Set([...n??[],...r??[]]);return t.filter(i=>!o.has(i.id))},Z(e.options,"debugRows","getCenterRows"))}},Nm={getInitialState:e=>({rowSelection:{},...e}),getDefaultOptions:e=>({onRowSelectionChange:Be("rowSelection",e),enableRowSelection:!0,enableMultiRowSelection:!0,enableSubRowSelection:!0}),createTable:e=>{e.setRowSelection=t=>e.options.onRowSelectionChange==null?void 0:e.options.onRowSelectionChange(t),e.resetRowSelection=t=>{var n;return e.setRowSelection(t?{}:(n=e.initialState.rowSelection)!=null?n:{})},e.toggleAllRowsSelected=t=>{e.setRowSelection(n=>{t=typeof t<"u"?t:!e.getIsAllRowsSelected();const r={...n},o=e.getPreGroupedRowModel().flatRows;return t?o.forEach(i=>{i.getCanSelect()&&(r[i.id]=!0)}):o.forEach(i=>{delete r[i.id]}),r})},e.toggleAllPageRowsSelected=t=>e.setRowSelection(n=>{const r=typeof t<"u"?t:!e.getIsAllPageRowsSelected(),o={...n};return e.getRowModel().rows.forEach(i=>{uo(o,i.id,r,!0,e)}),o}),e.getPreSelectedRowModel=()=>e.getCoreRowModel(),e.getSelectedRowModel=J(()=>[e.getState().rowSelection,e.getCoreRowModel()],(t,n)=>Object.keys(t).length?qr(e,n):{rows:[],flatRows:[],rowsById:{}},Z(e.options,"debugTable","getSelectedRowModel")),e.getFilteredSelectedRowModel=J(()=>[e.getState().rowSelection,e.getFilteredRowModel()],(t,n)=>Object.keys(t).length?qr(e,n):{rows:[],flatRows:[],rowsById:{}},Z(e.options,"debugTable","getFilteredSelectedRowModel")),e.getGroupedSelectedRowModel=J(()=>[e.getState().rowSelection,e.getSortedRowModel()],(t,n)=>Object.keys(t).length?qr(e,n):{rows:[],flatRows:[],rowsById:{}},Z(e.options,"debugTable","getGroupedSelectedRowModel")),e.getIsAllRowsSelected=()=>{const t=e.getFilteredRowModel().flatRows,{rowSelection:n}=e.getState();let r=!!(t.length&&Object.keys(n).length);return r&&t.some(o=>o.getCanSelect()&&!n[o.id])&&(r=!1),r},e.getIsAllPageRowsSelected=()=>{const t=e.getPaginationRowModel().flatRows.filter(o=>o.getCanSelect()),{rowSelection:n}=e.getState();let r=!!t.length;return r&&t.some(o=>!n[o.id])&&(r=!1),r},e.getIsSomeRowsSelected=()=>{var t;const n=Object.keys((t=e.getState().rowSelection)!=null?t:{}).length;return n>0&&n<e.getFilteredRowModel().flatRows.length},e.getIsSomePageRowsSelected=()=>{const t=e.getPaginationRowModel().flatRows;return e.getIsAllPageRowsSelected()?!1:t.filter(n=>n.getCanSelect()).some(n=>n.getIsSelected()||n.getIsSomeSelected())},e.getToggleAllRowsSelectedHandler=()=>t=>{e.toggleAllRowsSelected(t.target.checked)},e.getToggleAllPageRowsSelectedHandler=()=>t=>{e.toggleAllPageRowsSelected(t.target.checked)}},createRow:(e,t)=>{e.toggleSelected=(n,r)=>{const o=e.getIsSelected();t.setRowSelection(i=>{var s;if(n=typeof n<"u"?n:!o,e.getCanSelect()&&o===n)return i;const a={...i};return uo(a,e.id,n,(s=r==null?void 0:r.selectChildren)!=null?s:!0,t),a})},e.getIsSelected=()=>{const{rowSelection:n}=t.getState();return Uo(e,n)},e.getIsSomeSelected=()=>{const{rowSelection:n}=t.getState();return co(e,n)==="some"},e.getIsAllSubRowsSelected=()=>{const{rowSelection:n}=t.getState();return co(e,n)==="all"},e.getCanSelect=()=>{var n;return typeof t.options.enableRowSelection=="function"?t.options.enableRowSelection(e):(n=t.options.enableRowSelection)!=null?n:!0},e.getCanSelectSubRows=()=>{var n;return typeof t.options.enableSubRowSelection=="function"?t.options.enableSubRowSelection(e):(n=t.options.enableSubRowSelection)!=null?n:!0},e.getCanMultiSelect=()=>{var n;return typeof t.options.enableMultiRowSelection=="function"?t.options.enableMultiRowSelection(e):(n=t.options.enableMultiRowSelection)!=null?n:!0},e.getToggleSelectedHandler=()=>{const n=e.getCanSelect();return r=>{var o;n&&e.toggleSelected((o=r.target)==null?void 0:o.checked)}}}},uo=(e,t,n,r,o)=>{var i;const s=o.getRow(t,!0);n?(s.getCanMultiSelect()||Object.keys(e).forEach(a=>delete e[a]),s.getCanSelect()&&(e[t]=!0)):delete e[t],r&&(i=s.subRows)!=null&&i.length&&s.getCanSelectSubRows()&&s.subRows.forEach(a=>uo(e,a.id,n,r,o))};function qr(e,t){const n=e.getState().rowSelection,r=[],o={},i=function(s,a){return s.map(u=>{var c;const d=Uo(u,n);if(d&&(r.push(u),o[u.id]=u),(c=u.subRows)!=null&&c.length&&(u={...u,subRows:i(u.subRows)}),d)return u}).filter(Boolean)};return{rows:i(t.rows),flatRows:r,rowsById:o}}function Uo(e,t){var n;return(n=t[e.id])!=null?n:!1}function co(e,t,n){var r;if(!((r=e.subRows)!=null&&r.length))return!1;let o=!0,i=!1;return e.subRows.forEach(s=>{if(!(i&&!o)&&(s.getCanSelect()&&(Uo(s,t)?i=!0:o=!1),s.subRows&&s.subRows.length)){const a=co(s,t);a==="all"?i=!0:(a==="some"&&(i=!0),o=!1)}}),o?"all":i?"some":!1}const po=/([0-9]+)/gm,_m=(e,t,n)=>za(ht(e.getValue(n)).toLowerCase(),ht(t.getValue(n)).toLowerCase()),$m=(e,t,n)=>za(ht(e.getValue(n)),ht(t.getValue(n))),Mm=(e,t,n)=>qo(ht(e.getValue(n)).toLowerCase(),ht(t.getValue(n)).toLowerCase()),Im=(e,t,n)=>qo(ht(e.getValue(n)),ht(t.getValue(n))),jm=(e,t,n)=>{const r=e.getValue(n),o=t.getValue(n);return r>o?1:r<o?-1:0},Dm=(e,t,n)=>qo(e.getValue(n),t.getValue(n));function qo(e,t){return e===t?0:e>t?1:-1}function ht(e){return typeof e=="number"?isNaN(e)||e===1/0||e===-1/0?"":String(e):typeof e=="string"?e:""}function za(e,t){const n=e.split(po).filter(Boolean),r=t.split(po).filter(Boolean);for(;n.length&&r.length;){const o=n.shift(),i=r.shift(),s=parseInt(o,10),a=parseInt(i,10),u=[s,a].sort();if(isNaN(u[0])){if(o>i)return 1;if(i>o)return-1;continue}if(isNaN(u[1]))return isNaN(s)?-1:1;if(s>a)return 1;if(a>s)return-1}return n.length-r.length}const cn={alphanumeric:_m,alphanumericCaseSensitive:$m,text:Mm,textCaseSensitive:Im,datetime:jm,basic:Dm},Am={getInitialState:e=>({sorting:[],...e}),getDefaultColumnDef:()=>({sortingFn:"auto",sortUndefined:1}),getDefaultOptions:e=>({onSortingChange:Be("sorting",e),isMultiSortEvent:t=>t.shiftKey}),createColumn:(e,t)=>{e.getAutoSortingFn=()=>{const n=t.getFilteredRowModel().flatRows.slice(10);let r=!1;for(const o of n){const i=o==null?void 0:o.getValue(e.id);if(Object.prototype.toString.call(i)==="[object Date]")return cn.datetime;if(typeof i=="string"&&(r=!0,i.split(po).length>1))return cn.alphanumeric}return r?cn.text:cn.basic},e.getAutoSortDir=()=>{const n=t.getFilteredRowModel().flatRows[0];return typeof(n==null?void 0:n.getValue(e.id))=="string"?"asc":"desc"},e.getSortingFn=()=>{var n,r;if(!e)throw new Error;return yr(e.columnDef.sortingFn)?e.columnDef.sortingFn:e.columnDef.sortingFn==="auto"?e.getAutoSortingFn():(n=(r=t.options.sortingFns)==null?void 0:r[e.columnDef.sortingFn])!=null?n:cn[e.columnDef.sortingFn]},e.toggleSorting=(n,r)=>{const o=e.getNextSortingOrder(),i=typeof n<"u"&&n!==null;t.setSorting(s=>{const a=s==null?void 0:s.find(f=>f.id===e.id),u=s==null?void 0:s.findIndex(f=>f.id===e.id);let c=[],d,g=i?n:o==="desc";if(s!=null&&s.length&&e.getCanMultiSort()&&r?a?d="toggle":d="add":s!=null&&s.length&&u!==s.length-1?d="replace":a?d="toggle":d="replace",d==="toggle"&&(i||o||(d="remove")),d==="add"){var p;c=[...s,{id:e.id,desc:g}],c.splice(0,c.length-((p=t.options.maxMultiSortColCount)!=null?p:Number.MAX_SAFE_INTEGER))}else d==="toggle"?c=s.map(f=>f.id===e.id?{...f,desc:g}:f):d==="remove"?c=s.filter(f=>f.id!==e.id):c=[{id:e.id,desc:g}];return c})},e.getFirstSortDir=()=>{var n,r;return((n=(r=e.columnDef.sortDescFirst)!=null?r:t.options.sortDescFirst)!=null?n:e.getAutoSortDir()==="desc")?"desc":"asc"},e.getNextSortingOrder=n=>{var r,o;const i=e.getFirstSortDir(),s=e.getIsSorted();return s?s!==i&&((r=t.options.enableSortingRemoval)==null||r)&&(!(n&&(o=t.options.enableMultiRemove)!=null)||o)?!1:s==="desc"?"asc":"desc":i},e.getCanSort=()=>{var n,r;return((n=e.columnDef.enableSorting)!=null?n:!0)&&((r=t.options.enableSorting)!=null?r:!0)&&!!e.accessorFn},e.getCanMultiSort=()=>{var n,r;return(n=(r=e.columnDef.enableMultiSort)!=null?r:t.options.enableMultiSort)!=null?n:!!e.accessorFn},e.getIsSorted=()=>{var n;const r=(n=t.getState().sorting)==null?void 0:n.find(o=>o.id===e.id);return r?r.desc?"desc":"asc":!1},e.getSortIndex=()=>{var n,r;return(n=(r=t.getState().sorting)==null?void 0:r.findIndex(o=>o.id===e.id))!=null?n:-1},e.clearSorting=()=>{t.setSorting(n=>n!=null&&n.length?n.filter(r=>r.id!==e.id):[])},e.getToggleSortingHandler=()=>{const n=e.getCanSort();return r=>{n&&(r.persist==null||r.persist(),e.toggleSorting==null||e.toggleSorting(void 0,e.getCanMultiSort()?t.options.isMultiSortEvent==null?void 0:t.options.isMultiSortEvent(r):!1))}}},createTable:e=>{e.setSorting=t=>e.options.onSortingChange==null?void 0:e.options.onSortingChange(t),e.resetSorting=t=>{var n,r;e.setSorting(t?[]:(n=(r=e.initialState)==null?void 0:r.sorting)!=null?n:[])},e.getPreSortedRowModel=()=>e.getGroupedRowModel(),e.getSortedRowModel=()=>(!e._getSortedRowModel&&e.options.getSortedRowModel&&(e._getSortedRowModel=e.options.getSortedRowModel(e)),e.options.manualSorting||!e._getSortedRowModel?e.getPreSortedRowModel():e._getSortedRowModel())}},Fm=[sm,Em,ym,xm,am,lm,Rm,km,Am,bm,Tm,Pm,Om,Nm,Sm];function Vm(e){var t,n;process.env.NODE_ENV!=="production"&&(e.debugAll||e.debugTable)&&console.info("Creating Table Instance...");const r=[...Fm,...(t=e._features)!=null?t:[]];let o={_features:r};const i=o._features.reduce((p,f)=>Object.assign(p,f.getDefaultOptions==null?void 0:f.getDefaultOptions(o)),{}),s=p=>o.options.mergeOptions?o.options.mergeOptions(i,p):{...i,...p};let u={...{},...(n=e.initialState)!=null?n:{}};o._features.forEach(p=>{var f;u=(f=p.getInitialState==null?void 0:p.getInitialState(u))!=null?f:u});const c=[];let d=!1;const g={_features:r,options:{...i,...e},initialState:u,_queue:p=>{c.push(p),d||(d=!0,Promise.resolve().then(()=>{for(;c.length;)c.shift()();d=!1}).catch(f=>setTimeout(()=>{throw f})))},reset:()=>{o.setState(o.initialState)},setOptions:p=>{const f=mt(p,o.options);o.options=s(f)},getState:()=>o.options.state,setState:p=>{o.options.onStateChange==null||o.options.onStateChange(p)},_getRowId:(p,f,h)=>{var m;return(m=o.options.getRowId==null?void 0:o.options.getRowId(p,f,h))!=null?m:`${h?[h.id,f].join("."):f}`},getCoreRowModel:()=>(o._getCoreRowModel||(o._getCoreRowModel=o.options.getCoreRowModel(o)),o._getCoreRowModel()),getRowModel:()=>o.getPaginationRowModel(),getRow:(p,f)=>{let h=(f?o.getPrePaginationRowModel():o.getRowModel()).rowsById[p];if(!h&&(h=o.getCoreRowModel().rowsById[p],!h))throw process.env.NODE_ENV!=="production"?new Error(`getRow could not find row with ID: ${p}`):new Error;return h},_getDefaultColumnDef:J(()=>[o.options.defaultColumn],p=>{var f;return p=(f=p)!=null?f:{},{header:h=>{const m=h.header.column.columnDef;return m.accessorKey?m.accessorKey:m.accessorFn?m.id:null},cell:h=>{var m,v;return(m=(v=h.renderValue())==null||v.toString==null?void 0:v.toString())!=null?m:null},...o._features.reduce((h,m)=>Object.assign(h,m.getDefaultColumnDef==null?void 0:m.getDefaultColumnDef()),{}),...p}},Z(e,"debugColumns","_getDefaultColumnDef")),_getColumnDefs:()=>o.options.columns,getAllColumns:J(()=>[o._getColumnDefs()],p=>{const f=function(h,m,v){return v===void 0&&(v=0),h.map(y=>{const P=im(o,y,v,m),x=y;return P.columns=x.columns?f(x.columns,P,v+1):[],P})};return f(p)},Z(e,"debugColumns","getAllColumns")),getAllFlatColumns:J(()=>[o.getAllColumns()],p=>p.flatMap(f=>f.getFlatColumns()),Z(e,"debugColumns","getAllFlatColumns")),_getAllFlatColumnsById:J(()=>[o.getAllFlatColumns()],p=>p.reduce((f,h)=>(f[h.id]=h,f),{}),Z(e,"debugColumns","getAllFlatColumnsById")),getAllLeafColumns:J(()=>[o.getAllColumns(),o._getOrderColumnsFn()],(p,f)=>{let h=p.flatMap(m=>m.getLeafColumns());return f(h)},Z(e,"debugColumns","getAllLeafColumns")),getColumn:p=>{const f=o._getAllFlatColumnsById()[p];return process.env.NODE_ENV!=="production"&&!f&&console.error(`[Table] Column with id '${p}' does not exist.`),f}};Object.assign(o,g);for(let p=0;p<o._features.length;p++){const f=o._features[p];f==null||f.createTable==null||f.createTable(o)}return o}function Lm(){return e=>J(()=>[e.options.data],t=>{const n={rows:[],flatRows:[],rowsById:{}},r=function(o,i,s){i===void 0&&(i=0);const a=[];for(let c=0;c<o.length;c++){const d=Ma(e,e._getRowId(o[c],c,s),o[c],c,i,void 0,s==null?void 0:s.id);if(n.flatRows.push(d),n.rowsById[d.id]=d,a.push(d),e.options.getSubRows){var u;d.originalSubRows=e.options.getSubRows(o[c],c),(u=d.originalSubRows)!=null&&u.length&&(d.subRows=r(d.originalSubRows,i+1,d))}}return a};return n.rows=r(t),n},Z(e.options,"debugTable","getRowModel",()=>e._autoResetPageIndex()))}function Bm(){return e=>J(()=>[e.getState().expanded,e.getPreExpandedRowModel(),e.options.paginateExpandedRows],(t,n,r)=>!n.rows.length||t!==!0&&!Object.keys(t??{}).length||!r?n:zm(n),Z(e.options,"debugTable","getExpandedRowModel"))}function zm(e){const t=[],n=r=>{var o;t.push(r),(o=r.subRows)!=null&&o.length&&r.getIsExpanded()&&r.subRows.forEach(n)};return e.rows.forEach(n),{rows:t,flatRows:e.flatRows,rowsById:e.rowsById}}function Hm(){return e=>J(()=>[e.getState().grouping,e.getPreGroupedRowModel()],(t,n)=>{if(!n.rows.length||!t.length)return n;const r=t.filter(u=>e.getColumn(u)),o=[],i={},s=function(u,c,d){if(c===void 0&&(c=0),c>=r.length)return u.map(h=>(h.depth=c,o.push(h),i[h.id]=h,h.subRows&&(h.subRows=s(h.subRows,c+1,h.id)),h));const g=r[c],p=Gm(u,g);return Array.from(p.entries()).map((h,m)=>{let[v,y]=h,P=`${g}:${v}`;P=d?`${d}>${P}`:P;const x=s(y,c+1,P),S=c?$a(y,E=>E.subRows):y,b=Ma(e,P,S[0].original,m,c,void 0,d);return Object.assign(b,{groupingColumnId:g,groupingValue:v,subRows:x,leafRows:S,getValue:E=>{if(r.includes(E)){if(b._valuesCache.hasOwnProperty(E))return b._valuesCache[E];if(y[0]){var _;b._valuesCache[E]=(_=y[0].getValue(E))!=null?_:void 0}return b._valuesCache[E]}if(b._groupingValuesCache.hasOwnProperty(E))return b._groupingValuesCache[E];const D=e.getColumn(E),A=D==null?void 0:D.getAggregationFn();if(A)return b._groupingValuesCache[E]=A(E,S,y),b._groupingValuesCache[E]}}),x.forEach(E=>{o.push(E),i[E.id]=E}),b})},a=s(n.rows,0);return a.forEach(u=>{o.push(u),i[u.id]=u}),{rows:a,flatRows:o,rowsById:i}},Z(e.options,"debugTable","getGroupedRowModel",()=>{e._queue(()=>{e._autoResetExpanded(),e._autoResetPageIndex()})}))}function Gm(e,t){const n=new Map;return e.reduce((r,o)=>{const i=`${o.getGroupingValue(t)}`,s=r.get(i);return s?s.push(o):r.set(i,[o]),r},n)}function Um(){return e=>J(()=>[e.getState().sorting,e.getPreSortedRowModel()],(t,n)=>{if(!n.rows.length||!(t!=null&&t.length))return n;const r=e.getState().sorting,o=[],i=r.filter(u=>{var c;return(c=e.getColumn(u.id))==null?void 0:c.getCanSort()}),s={};i.forEach(u=>{const c=e.getColumn(u.id);c&&(s[u.id]={sortUndefined:c.columnDef.sortUndefined,invertSorting:c.columnDef.invertSorting,sortingFn:c.getSortingFn()})});const a=u=>{const c=u.map(d=>({...d}));return c.sort((d,g)=>{for(let f=0;f<i.length;f+=1){var p;const h=i[f],m=s[h.id],v=m.sortUndefined,y=(p=h==null?void 0:h.desc)!=null?p:!1;let P=0;if(v){const x=d.getValue(h.id),S=g.getValue(h.id),b=x===void 0,E=S===void 0;if(b||E){if(v==="first")return b?-1:1;if(v==="last")return b?1:-1;P=b&&E?0:b?v:-v}}if(P===0&&(P=m.sortingFn(d,g,h.id)),P!==0)return y&&(P*=-1),m.invertSorting&&(P*=-1),P}return d.index-g.index}),c.forEach(d=>{var g;o.push(d),(g=d.subRows)!=null&&g.length&&(d.subRows=a(d.subRows))}),c};return{rows:a(n.rows),flatRows:o,rowsById:n.rowsById}},Z(e.options,"debugTable","getSortedRowModel",()=>e._autoResetPageIndex()))}/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function Wr(e,t){return e?qm(e)?C.createElement(e,t):e:null}function qm(e){return Wm(e)||typeof e=="function"||Xm(e)}function Wm(e){return typeof e=="function"&&(()=>{const t=Object.getPrototypeOf(e);return t.prototype&&t.prototype.isReactComponent})()}function Xm(e){return typeof e=="object"&&typeof e.$$typeof=="symbol"&&["react.memo","react.forward_ref"].includes(e.$$typeof.description)}function Ym(e){const t={state:{},onStateChange:()=>{},renderFallbackValue:null,...e},[n]=C.useState(()=>({current:Vm(t)})),[r,o]=C.useState(()=>n.current.initialState);return n.current.setOptions(i=>({...i,...e,state:{...r,...e.state},onStateChange:s=>{o(s),e.onStateChange==null||e.onStateChange(s)}})),n.current}const Km=ye.Root,Jm=ye.Group,Zm=ye.Value,Ha=C.forwardRef(({className:e,children:t,...n},r)=>w.jsxs(ye.Trigger,{ref:r,className:te("pr-flex pr-h-10 pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...n,children:[t,w.jsx(ye.Icon,{asChild:!0,children:w.jsx(Ye.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));Ha.displayName=ye.Trigger.displayName;const Ga=C.forwardRef(({className:e,...t},n)=>w.jsx(ye.ScrollUpButton,{ref:n,className:te("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:w.jsx(Ye.ChevronUp,{className:"pr-h-4 pr-w-4"})}));Ga.displayName=ye.ScrollUpButton.displayName;const Ua=C.forwardRef(({className:e,...t},n)=>w.jsx(ye.ScrollDownButton,{ref:n,className:te("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:w.jsx(Ye.ChevronDown,{className:"pr-h-4 pr-w-4"})}));Ua.displayName=ye.ScrollDownButton.displayName;const qa=C.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>w.jsx(ye.Portal,{children:w.jsxs(ye.Content,{ref:o,className:te("pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:n,...r,children:[w.jsx(Ga,{}),w.jsx(ye.Viewport,{className:te("pr-p-1",n==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),w.jsx(Ua,{})]})}));qa.displayName=ye.Content.displayName;const Qm=C.forwardRef(({className:e,...t},n)=>w.jsx(ye.Label,{ref:n,className:te("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));Qm.displayName=ye.Label.displayName;const Wa=C.forwardRef(({className:e,children:t,...n},r)=>w.jsxs(ye.Item,{ref:r,className:te("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[w.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:w.jsx(ye.ItemIndicator,{children:w.jsx(Ye.Check,{className:"pr-h-4 pr-w-4"})})}),w.jsx(ye.ItemText,{children:t})]}));Wa.displayName=ye.Item.displayName;const eh=C.forwardRef(({className:e,...t},n)=>w.jsx(ye.Separator,{ref:n,className:te("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));eh.displayName=ye.Separator.displayName;const Xa=C.forwardRef(({className:e,...t},n)=>w.jsx("div",{className:"pr-relative pr-w-full pr-overflow-auto",children:w.jsx("table",{ref:n,className:te("pr-w-full pr-caption-bottom pr-text-sm",e),...t})}));Xa.displayName="Table";const Ya=C.forwardRef(({className:e,...t},n)=>w.jsx("thead",{ref:n,className:te("[&_tr]:pr-border-b",e),...t}));Ya.displayName="TableHeader";const Ka=C.forwardRef(({className:e,...t},n)=>w.jsx("tbody",{ref:n,className:te("[&_tr:last-child]:pr-border-0",e),...t}));Ka.displayName="TableBody";const th=C.forwardRef(({className:e,...t},n)=>w.jsx("tfoot",{ref:n,className:te("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));th.displayName="TableFooter";const fo=C.forwardRef(({className:e,...t},n)=>w.jsx("tr",{ref:n,className:te("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));fo.displayName="TableRow";const Ja=C.forwardRef(({className:e,...t},n)=>w.jsx("th",{ref:n,className:te("pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",e),...t}));Ja.displayName="TableHead";const Za=C.forwardRef(({className:e,...t},n)=>w.jsx("td",{ref:n,className:te("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0",e),...t}));Za.displayName="TableCell";const nh=C.forwardRef(({className:e,...t},n)=>w.jsx("caption",{ref:n,className:te("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));nh.displayName="TableCaption";const Bt="scrBook",rh="scrRef",mn="source",oh="details",ih="Scripture Reference",sh="Scripture Book",Qa="Type",ah="Details";function lh(e,t){const n=t??!1;return[{accessorFn:r=>`${ue.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:Bt,header:(e==null?void 0:e.scriptureReferenceColumnName)??ih,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?ue.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===Bt?Re.formatScrRef(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>Re.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>Re.formatScrRef(r.start),id:rh,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:Re.formatScrRef(o.start)},sortingFn:(r,o)=>Re.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>typeof r.source=="object"&&"displayName"in r.source?r.source.displayName:r.source,id:mn,header:n?(e==null?void 0:e.typeColumnName)??Qa:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,enableGrouping:!0},{accessorFn:r=>r.detail,id:oh,header:(e==null?void 0:e.detailsColumnName)??ah,cell:r=>r.getValue(),enableGrouping:!1}]}function uh({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:i,detailsColumnName:s,onRowSelected:a}){const[u,c]=I.useState([]),[d,g]=I.useState([{id:Bt,desc:!1}]),[p,f]=I.useState(()=>e.flatMap(R=>{const k=R.src;return R.data.map($=>({...$,source:k}))})),[h,m]=I.useState({});I.useEffect(()=>{f(()=>e.flatMap(R=>{const k=R.src;return R.data.map($=>({...$,source:k}))}))},[e]);const v=I.useMemo(()=>lh({scriptureReferenceColumnName:r,typeColumnName:i,detailsColumnName:s},n),[r,i,s,n]);function y(R){return R.bookNum*1e6+R.chapterNum*1e3+R.verseNum}const P=I.useCallback((R,k)=>!k||Re.compareScrRefs(R,k)===0?`${y(R)}`:`${y(R)}-${y(k)}`,[]),x=I.useCallback(R=>`${P(R.start,R.end)} ${R.source} ${R.detail}`,[P]),S=Ym({data:p,columns:v,state:{grouping:u,sorting:d,rowSelection:h},onGroupingChange:c,onSortingChange:g,onRowSelectionChange:m,getExpandedRowModel:Bm(),getGroupedRowModel:Hm(),getCoreRowModel:Lm(),getSortedRowModel:Um(),getRowId:x,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});I.useEffect(()=>{if(a){const R=S.getSelectedRowModel().rowsById,k=Object.keys(R);if(k.length===1){const $=p.find(V=>x(V)===k[0])||void 0;$&&a($)}}},[h,p,x,a,S]);const b=o??sh,E=i??Qa,_=[{label:"No Grouping",value:[]},{label:`Group by ${b}`,value:[Bt]},{label:`Group by ${E}`,value:[mn]},{label:`Group by ${b} and ${E}`,value:[Bt,mn]},{label:`Group by ${E} and ${b}`,value:[mn,Bt]}],D=R=>{c(JSON.parse(R))},A=(R,k)=>{!R.getIsGrouped()&&!R.getIsSelected()&&R.getToggleSelectedHandler()(k)},B=(R,k)=>R.getIsGrouped()?"":te("banded-row",k%2===0?"even":"odd"),N=(R,k,$)=>{if(!((R==null?void 0:R.length)===0||k.depth<$.column.getGroupedIndex())){if(k.getIsGrouped())switch(k.depth){case 1:return"pr-ps-4";default:return}switch(k.depth){case 1:return"pr-ps-8";case 2:return"pr-ps-12";default:return}}};return w.jsxs("div",{className:"pr-twp pr-w-full",children:[!t&&w.jsxs(Km,{value:JSON.stringify(u),onValueChange:R=>{D(R)},children:[w.jsx(Ha,{className:"pr-mb-1 pr-mt-2",children:w.jsx(Zm,{})}),w.jsx(qa,{position:"item-aligned",children:w.jsx(Jm,{children:_.map(R=>w.jsx(Wa,{value:JSON.stringify(R.value),children:R.label},R.label))})})]}),w.jsxs(Xa,{className:"pr-p-0",children:[t&&w.jsx(Ya,{children:S.getHeaderGroups().map(R=>w.jsx(fo,{children:R.headers.filter(k=>k.column.columnDef.header).map(k=>w.jsx(Ja,{colSpan:k.colSpan,children:k.isPlaceholder?void 0:w.jsxs("div",{children:[k.column.getCanGroup()?w.jsx(Je,{variant:"ghost",title:`Toggle grouping by ${k.column.columnDef.header}`,onClick:k.column.getToggleGroupingHandler(),type:"button",children:k.column.getIsGrouped()?`🛑(${k.column.getGroupedIndex()}) `:"👊 "}):void 0," ",Wr(k.column.columnDef.header,k.getContext())]})},k.id))},R.id))}),w.jsx(Ka,{children:S.getRowModel().rows.map((R,k)=>w.jsx(fo,{"data-state":R.getIsSelected()?"selected":"",className:te(B(R,k)),onClick:$=>A(R,$),children:R.getVisibleCells().map($=>{if(!($.getIsPlaceholder()||$.column.columnDef.enableGrouping&&!$.getIsGrouped()&&($.column.columnDef.id!==mn||!n)))return w.jsx(Za,{className:te($.column.columnDef.id,"pr-p-[1px]",N(u,R,$)),children:(()=>$.getIsGrouped()?w.jsxs(Je,{variant:"ghost",onClick:R.getToggleExpandedHandler(),type:"button",children:[R.getIsExpanded()?"👇":"👉"," ",Wr($.column.columnDef.cell,$.getContext())," (",R.subRows.length,")"]}):Wr($.column.columnDef.cell,$.getContext()))()},$.id)})},R.id))})]})]})}function ch({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=I.useState(""),i=s=>{o(s),e(s)};return w.jsx(Tn,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:s=>i(s.target.value)})}function dh({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:s=!1,defaultValue:a,value:u,valueLabelDisplay:c="off",className:d,onChange:g,onChangeCommitted:p}){return w.jsx(we.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:s,defaultValue:a,value:u,valueLabelDisplay:c,className:`papi-slider ${n} ${d??""}`,onChange:g,onChangeCommitted:p})}function ph({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:s,children:a}){const u={action:(s==null?void 0:s.action)||a,message:s==null?void 0:s.message,className:r};return w.jsx(we.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:u})}function fh({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return w.jsx(we.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function as({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return w.jsx(Tn,{defaultValue:t[n.key],onChange:r})}const gh=({onChange:e,disabled:t,checked:n,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return w.jsx(yo,{...r,isChecked:n,isDisabled:t,onChange:o})};function mh({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:s,defaultColumnSortable:a=!0,defaultColumnResizable:u=!0,rows:c,enableSelectColumn:d,selectColumnWidth:g=50,rowKeyGetter:p,rowHeight:f=35,headerRowHeight:h=35,selectedRows:m,onSelectedRowsChange:v,onRowsChange:y,onCellClick:P,onCellDoubleClick:x,onCellContextMenu:S,onCellKeyDown:b,direction:E="ltr",enableVirtualization:_=!0,onCopy:D,onPaste:A,onScroll:B,className:N,"data-testid":R}){const k=I.useMemo(()=>{const $=e.map(V=>typeof V.editable=="function"?{...V,editable:z=>!!V.editable(z),renderEditCell:V.renderEditCell||as}:V.editable&&!V.renderEditCell?{...V,renderEditCell:as}:V.renderEditCell&&!V.editable?{...V,editable:!1}:V);return d?[{...ai.SelectColumn,minWidth:g},...$]:$},[e,d,g]);return w.jsx(ai,{columns:k,defaultColumnOptions:{width:o,minWidth:i,maxWidth:s,sortable:a,resizable:u},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:c,rowKeyGetter:p,rowHeight:f,headerRowHeight:h,selectedRows:m,onSelectedRowsChange:v,onRowsChange:y,onCellClick:P,onCellDoubleClick:x,onCellContextMenu:S,onCellKeyDown:b,direction:E,enableVirtualization:_,onCopy:D,onPaste:A,onScroll:B,renderers:{renderCheckbox:gh},className:`papi-table ${N??"rdg-light"}`,"data-testid":R})}function hh({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const i=I.useRef(void 0);return w.jsx("div",{ref:i,style:{position:"relative"},children:w.jsx(we.AppBar,{position:"static",id:r,children:w.jsxs(we.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?w.jsx(_a,{commandHandler:t,containerRef:i,menuProvider:e}):void 0,o?w.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const vh=(e,t)=>{I.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Xr=()=>!1,bh=(e,t)=>{const[n]=ir(I.useCallback(async()=>{if(!e)return Xr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Xr,{preserveValue:!1});I.useEffect(()=>()=>{n!==Xr&&n()},[n])},wh=je.Root,el=I.forwardRef(({className:e,...t},n)=>w.jsx(je.List,{ref:n,className:te("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));el.displayName=je.List.displayName;const tl=I.forwardRef(({className:e,...t},n)=>w.jsx(je.Trigger,{ref:n,className:te("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));tl.displayName=je.Trigger.displayName;const nl=I.forwardRef(({className:e,...t},n)=>w.jsx(je.Content,{ref:n,className:te("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));nl.displayName=je.Content.displayName;const rl=I.forwardRef(({className:e,...t},n)=>w.jsx(je.Root,{orientation:"vertical",ref:n,className:te("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));rl.displayName=je.List.displayName;const ol=I.forwardRef(({className:e,...t},n)=>w.jsx(je.List,{ref:n,className:te("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));ol.displayName=je.List.displayName;const yh=I.forwardRef(({className:e,...t},n)=>w.jsx(je.Trigger,{ref:n,...t,className:te("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),il=I.forwardRef(({className:e,...t},n)=>w.jsx(je.Content,{ref:n,className:te("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));il.displayName=je.Content.displayName;exports.BookChapterControl=Zl;exports.Button=Je;exports.ChapterRangeSelector=Ql;exports.Checkbox=yo;exports.Checklist=eu;exports.ComboBox=Kn;exports.ContextMenu=Jg;exports.DropdownMenu=hs;exports.DropdownMenuCheckboxItem=ys;exports.DropdownMenuContent=vo;exports.DropdownMenuGroup=Al;exports.DropdownMenuItem=bo;exports.DropdownMenuLabel=sr;exports.DropdownMenuPortal=Fl;exports.DropdownMenuRadioGroup=Ll;exports.DropdownMenuRadioItem=xs;exports.DropdownMenuSeparator=wo;exports.DropdownMenuShortcut=Ss;exports.DropdownMenuSub=Vl;exports.DropdownMenuSubContent=ws;exports.DropdownMenuSubTrigger=bs;exports.DropdownMenuTrigger=vs;exports.GridMenu=wa;exports.HamburgerMenuButton=_a;exports.IconButton=em;exports.Input=ar;exports.Label=Ho;exports.LabelPosition=Et;exports.MenuItem=Bo;exports.RefSelector=nm;exports.ScriptureResultsViewer=uh;exports.SearchBar=ch;exports.Slider=dh;exports.Snackbar=ph;exports.Switch=fh;exports.Table=mh;exports.Tabs=wh;exports.TabsContent=nl;exports.TabsList=el;exports.TabsTrigger=tl;exports.TextField=Tn;exports.Toolbar=hh;exports.VerticalTabs=rl;exports.VerticalTabsContent=il;exports.VerticalTabsList=ol;exports.VerticalTabsTrigger=yh;exports.buttonVariants=Cs;exports.useEvent=vh;exports.useEventAsync=bh;exports.usePromise=ir;function xh(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}xh(`.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
}
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
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
.pr-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
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
.pr-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity));
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
.pr-p-\\[1px\\] {
  padding: 1px;
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
.pr-ps-12 {
  padding-inline-start: 3rem;
}
.pr-ps-4 {
  padding-inline-start: 1rem;
}
.pr-ps-8 {
  padding-inline-start: 2rem;
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
.pr-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
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
.data-\\[state\\=open\\]\\:pr-bg-accent[data-state=open] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=selected\\]\\:pr-bg-muted[data-state=selected] {
  background-color: hsl(var(--muted));
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state="selected"]:hover {
  cursor: default;
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
