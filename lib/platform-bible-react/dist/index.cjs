"use strict";var vl=Object.defineProperty;var bl=(e,t,n)=>t in e?vl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var _t=(e,t,n)=>(bl(e,typeof t!="symbol"?t+"":t,n),n);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const y=require("react/jsx-runtime"),I=require("react"),Ce=require("platform-bible-utils"),yl=require("@radix-ui/react-dropdown-menu"),We=require("lucide-react"),Re=require("clsx"),wl=require("tailwind-merge"),xl=require("@radix-ui/react-slot"),ls=require("class-variance-authority"),he=require("@mui/material"),Xr=require("@mui/styled-engine"),cn=require("react-dom"),El=require("@radix-ui/react-label"),Sl=require("@radix-ui/react-select"),si=require("react-data-grid"),Cl=require("@radix-ui/react-tabs");function Xt(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const S=Xt(I),ge=Xt(yl),Rl=Xt(cn),us=Xt(El),ye=Xt(Sl),Me=Xt(Cl);var kl=Object.defineProperty,Tl=(e,t,n)=>t in e?kl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,oe=(e,t,n)=>(Tl(e,typeof t!="symbol"?t+"":t,n),n);const Rt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],fo=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],cs=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],ai=jl();function Yt(e,t=!0){return t&&(e=e.toUpperCase()),e in ai?ai[e]:0}function go(e){return Yt(e)>0}function Ol(e){const t=typeof e=="string"?Yt(e):e;return t>=40&&t<=66}function Nl(e){return(typeof e=="string"?Yt(e):e)<=39}function ds(e){return e<=66}function Pl(e){const t=typeof e=="string"?Yt(e):e;return gs(t)&&!ds(t)}function*_l(){for(let e=1;e<=Rt.length;e++)yield e}const $l=1,ps=Rt.length;function Ml(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function mo(e,t="***"){const n=e-1;return n<0||n>=Rt.length?t:Rt[n]}function fs(e){return e<=0||e>ps?"******":cs[e-1]}function Il(e){return fs(Yt(e))}function gs(e){const t=typeof e=="number"?mo(e):e;return go(t)&&!fo.includes(t)}function Al(e){const t=typeof e=="number"?mo(e):e;return go(t)&&fo.includes(t)}function Dl(e){return cs[e-1].includes("*obsolete*")}function jl(){const e={};for(let t=0;t<Rt.length;t++)e[Rt[t]]=t+1;return e}const le={allBookIds:Rt,nonCanonicalIds:fo,bookIdToNumber:Yt,isBookIdValid:go,isBookNT:Ol,isBookOT:Nl,isBookOTNT:ds,isBookDC:Pl,allBookNumbers:_l,firstBook:$l,lastBook:ps,extraBooks:Ml,bookNumberToId:mo,bookNumberToEnglishName:fs,bookIdToEnglishName:Il,isCanonical:gs,isExtraMaterial:Al,isObsolete:Dl};var ct=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(ct||{});const De=class{constructor(t){if(oe(this,"name"),oe(this,"fullPath"),oe(this,"isPresent"),oe(this,"hasVerseSegments"),oe(this,"isCustomized"),oe(this,"baseVersification"),oe(this,"scriptureBooks"),oe(this,"_type"),t!=null)typeof t=="string"?this.name=t:this._type=t;else throw new Error("Argument null")}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};oe(De,"Original",new De(ct.Original)),oe(De,"Septuagint",new De(ct.Septuagint)),oe(De,"Vulgate",new De(ct.Vulgate)),oe(De,"English",new De(ct.English)),oe(De,"RussianProtestant",new De(ct.RussianProtestant)),oe(De,"RussianOrthodox",new De(ct.RussianOrthodox));let Ft=De;function li(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var ms=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(ms||{});const Pe=class ae{constructor(t,n,r,o){if(oe(this,"firstChapter"),oe(this,"lastChapter"),oe(this,"lastVerse"),oe(this,"hasSegmentsDefined"),oe(this,"text"),oe(this,"BBBCCCVVVS"),oe(this,"longHashCode"),oe(this,"versification"),oe(this,"rtlMark","‏"),oe(this,"_bookNum",0),oe(this,"_chapterNum",0),oe(this,"_verseNum",0),oe(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,s=n!=null&&n instanceof Ft?n:void 0;this.setEmpty(s),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof Ft?n:void 0;this.setEmpty(i),this._verseNum=t%ae.chapterDigitShifter,this._chapterNum=Math.floor(t%ae.bookDigitShifter/ae.chapterDigitShifter),this._bookNum=Math.floor(t/ae.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ae){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof Ft?t:ae.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ae.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(t,n=ae.defaultVersification){const r=new ae(n);return r.parse(t),r}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=ae.parse(t),{success:!0,verseRef:n}}catch(r){if(r instanceof nn)return n=new ae,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ae.bcvMaxValue*ae.bookDigitShifter+(n>=0?n%ae.bcvMaxValue*ae.chapterDigitShifter:0)+(r>=0?r%ae.bcvMaxValue:0)}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>ae.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ae.verseRangeSeparator)||this._verse.includes(ae.verseSequenceIndicator))}get book(){return le.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=le.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ae.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ae.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>le.lastBook)throw new nn("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Ft(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ae.verseRangeSeparators,ae.verseSequenceIndicators)}get BBBCCC(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const s=+i[1].trim();this.versification=new Ft(ct[s])}catch{throw new nn("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new nn("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||le.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ae.isVerseParseable(r[1]))throw new nn("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ae(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}equals(t){return t instanceof ae?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification):!1}allVerses(t=!1,n=ae.verseRangeSeparators,r=ae.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=li(this._verse,r);for(const s of i.map(a=>li(a,n))){const a=this.clone();a.verse=s[0];const l=a.verseNum;if(o.push(a),s.length>1){const d=this.clone();if(d.verse=s[1],!t)for(let c=l+1;c<d.verseNum;c++){const p=new ae(this._bookNum,this._chapterNum,c,this.versification);this.isExcluded||o.push(p)}o.push(d)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>le.lastBook?2:(le.isCanonical(this._bookNum),0)}setEmpty(t=ae.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=le.bookIdToNumber(t),this.chapter=n,this.verse=r}};oe(Pe,"defaultVersification",Ft.English),oe(Pe,"verseRangeSeparator","-"),oe(Pe,"verseSequenceIndicator",","),oe(Pe,"verseRangeSeparators",[Pe.verseRangeSeparator]),oe(Pe,"verseSequenceIndicators",[Pe.verseSequenceIndicator]),oe(Pe,"chapterDigitShifter",1e3),oe(Pe,"bookDigitShifter",Pe.chapterDigitShifter*Pe.chapterDigitShifter),oe(Pe,"bcvMaxValue",Pe.chapterDigitShifter-1),oe(Pe,"ValidStatusType",ms);class nn extends Error{}function ne(...e){return wl.twMerge(Re.clsx(e))}const hs=ge.Root,vs=ge.Trigger,Fl=ge.Group,Vl=ge.Portal,Ll=ge.Sub,Bl=ge.RadioGroup,bs=I.forwardRef(({className:e,inset:t,children:n,...r},o)=>y.jsxs(ge.SubTrigger,{ref:o,className:ne("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,y.jsx(We.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));bs.displayName=ge.SubTrigger.displayName;const ys=I.forwardRef(({className:e,...t},n)=>y.jsx(ge.SubContent,{ref:n,className:ne("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));ys.displayName=ge.SubContent.displayName;const ho=I.forwardRef(({className:e,sideOffset:t=4,...n},r)=>y.jsx(ge.Portal,{children:y.jsx(ge.Content,{ref:r,sideOffset:t,className:ne("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));ho.displayName=ge.Content.displayName;const vo=I.forwardRef(({className:e,inset:t,...n},r)=>y.jsx(ge.Item,{ref:r,className:ne("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));vo.displayName=ge.Item.displayName;const ws=I.forwardRef(({className:e,children:t,checked:n,...r},o)=>y.jsxs(ge.CheckboxItem,{ref:o,className:ne("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[y.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:y.jsx(ge.ItemIndicator,{children:y.jsx(We.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));ws.displayName=ge.CheckboxItem.displayName;const xs=I.forwardRef(({className:e,children:t,...n},r)=>y.jsxs(ge.RadioItem,{ref:r,className:ne("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[y.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:y.jsx(ge.ItemIndicator,{children:y.jsx(We.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));xs.displayName=ge.RadioItem.displayName;const sr=I.forwardRef(({className:e,inset:t,...n},r)=>y.jsx(ge.Label,{ref:r,className:ne("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));sr.displayName=ge.Label.displayName;const bo=I.forwardRef(({className:e,...t},n)=>y.jsx(ge.Separator,{ref:n,className:ne("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));bo.displayName=ge.Separator.displayName;function Es({className:e,...t}){return y.jsx("span",{className:ne("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Es.displayName="DropdownMenuShortcut";const ar=I.forwardRef(({className:e,type:t,...n},r)=>y.jsx("input",{type:t,className:ne("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));ar.displayName="Input";const zl=I.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},i)=>y.jsxs("div",{className:"pr-relative",children:[y.jsx(ar,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r(),t(s)},onClick:n,ref:i}),y.jsx(We.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function Hl({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const i=Array.from({length:t},(a,l)=>l+1),s=I.useCallback(a=>{o(a)},[o]);return y.jsx("div",{className:ne("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:i.map(a=>y.jsx("div",{className:ne("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":a===n,"pr-bg-amber-200":a===r}),onClick:l=>{l.preventDefault(),l.stopPropagation(),e(a)},role:"button",onKeyDown:l=>{l.key==="Enter"&&e(a)},tabIndex:0,onMouseMove:()=>s(a),children:a},a))})}const Gl=I.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:i,children:s},a)=>y.jsxs(vo,{ref:a,textValue:e,className:ne("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:l=>{l.preventDefault(),t()},onKeyDown:l=>{o(l)},onFocus:r,onMouseMove:r,children:[y.jsx("span",{className:ne("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":i.toLowerCase()==="ot","pr-border-l-purple-200":i.toLowerCase()==="nt","pr-border-l-indigo-200":i.toLowerCase()==="dc"}),children:le.bookIdToEnglishName(e)}),n&&y.jsx("div",{children:s})]},e));function Ul({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return y.jsxs(sr,{className:"pr-flex pr-justify-between",children:[y.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),y.jsxs("div",{className:"pr-flex pr-items-center",children:[y.jsx(We.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),y.jsx(We.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),y.jsx(We.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const mn=le.allBookIds,ql={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ui=["OT","NT","DC"],Wl=32+32+32,Xl=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Yl=e=>({OT:mn.filter(n=>le.isBookOT(n)),NT:mn.filter(n=>le.isBookNT(n)),DC:mn.filter(n=>le.isBookDC(n))})[e],rn=e=>Ce.getChaptersForBook(le.bookIdToNumber(e));function Kl(){return mn.map(t=>le.bookIdToEnglishName(t))}function Jl(e){return Kl().includes(e)}function Zl(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(Jl(t))return mn.find(r=>le.bookIdToEnglishName(r)===t)}function Ql({scrRef:e,handleSubmit:t}){const[n,r]=I.useState(""),[o,i]=I.useState(le.bookNumberToId(e.bookNum)),[s,a]=I.useState(e.chapterNum??0),[l,d]=I.useState(le.bookNumberToId(e.bookNum)),[c,p]=I.useState(!1),[f,g]=I.useState(c),h=I.useRef(void 0),m=I.useRef(void 0),v=I.useRef(void 0),w=I.useCallback(N=>Yl(N).filter(C=>{const k=le.bookIdToEnglishName(C).toLowerCase(),$=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return k.includes($)||C.toLowerCase().includes($)}),[n]),_=N=>{r(N)},x=I.useRef(!1),E=I.useCallback(N=>{if(x.current){x.current=!1;return}p(N)},[]),b=I.useCallback((N,C,k,$)=>{if(a(le.bookNumberToId(e.bookNum)!==N?1:e.chapterNum),C||rn(N)===-1){t({bookNum:le.bookIdToNumber(N),chapterNum:k||1,verseNum:$||1}),p(!1),r("");return}i(o!==N?N:""),p(!C)},[t,e.bookNum,e.chapterNum,o]),R=N=>{N<=0||N>rn(o)||b(o,!0,N)},P=I.useCallback(()=>{Xl.forEach(N=>{const C=n.match(N);if(C){const[k,$=void 0,D=void 0]=C.slice(1),A=Zl(k);(le.isBookIdValid(k)||A)&&b(A??k,!0,$?parseInt($,10):1,D?parseInt(D,10):1)}})},[b,n]),j=I.useCallback(N=>{c?(N.key==="ArrowDown"||N.key==="ArrowUp")&&(typeof v<"u"&&v.current!==null?v.current.focus():typeof m<"u"&&m.current!==null&&m.current.focus(),N.preventDefault()):p(!0)},[c]),F=N=>{const{key:C}=N;C==="ArrowRight"||C==="ArrowLeft"||C==="ArrowDown"||C==="ArrowUp"||C==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:C})),h.current.focus())},B=N=>{const{key:C}=N;if(l===o){if(C==="Enter"){N.preventDefault(),b(o,!0,s);return}let k=0;if(C==="ArrowRight")if(s<rn(l))k=1;else{N.preventDefault();return}else if(C==="ArrowLeft")if(s>1)k=-1;else{N.preventDefault();return}else C==="ArrowDown"?k=6:C==="ArrowUp"&&(k=-6);s+k<=0||s+k>rn(l)?a(0):k!==0&&(a(s+k),N.preventDefault())}};return I.useEffect(()=>{o===l?o===le.bookNumberToId(e.bookNum)?a(e.chapterNum):a(1):a(0)},[l,e.bookNum,e.chapterNum,o]),I.useLayoutEffect(()=>{g(c)},[c]),I.useLayoutEffect(()=>{const N=setTimeout(()=>{if(f&&m.current&&v.current){const k=v.current.offsetTop-Wl;m.current.scrollTo({top:k,behavior:"instant"})}},10);return()=>{clearTimeout(N)}},[f]),y.jsx("div",{children:y.jsxs(hs,{modal:!1,open:c,onOpenChange:E,children:[y.jsx(vs,{asChild:!0,children:y.jsx(zl,{ref:h,value:n,handleSearch:_,handleKeyDown:j,handleOnClick:()=>{i(le.bookNumberToId(e.bookNum)),d(le.bookNumberToId(e.bookNum)),a(e.chapterNum>0?e.chapterNum:0),p(!0),h.current.focus()},onFocus:()=>{x.current=!0},handleSubmit:P,placeholder:`${le.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),y.jsxs(ho,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:F,align:"start",ref:m,children:[y.jsx(Ul,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),ui.map((N,C)=>w(N).length>0&&y.jsxs("div",{children:[y.jsx(sr,{className:"pr-font-semibold pr-text-slate-700",children:ql[N]}),w(N).map(k=>y.jsx("div",{children:y.jsx(Gl,{bookId:k,handleSelectBook:()=>b(k,!1),isSelected:o===k,handleHighlightBook:()=>d(k),handleKeyDown:B,bookType:N,ref:$=>{o===k&&(v.current=$)},children:y.jsx(Hl,{handleSelectChapter:R,endChapter:rn(k),activeChapter:e.bookNum===le.bookIdToNumber(k)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:$=>{a($)}})})},k)),ui.length-1!==C?y.jsx(bo,{}):void 0]},N))]})]})})}const eu=ls.cva("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),Xn=I.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},i)=>{const s=r?xl.Slot:"button";return y.jsx(s,{className:ne(eu({variant:t,size:n,className:e})),ref:i,...o})});Xn.displayName="Button";function yt({id:e,isDisabled:t=!1,className:n,onClick:r,onContextMenu:o,children:i}){return y.jsx(Xn,{id:e,disabled:t,className:ne("papi-button",n),onClick:r,onContextMenu:o,children:i})}function Yn({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:s,options:a=[],className:l,value:d,onChange:c,onFocus:p,onBlur:f,getOptionLabel:g}){return y.jsx(he.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:i,options:a,className:`papi-combo-box ${o?"error":""} ${l??""}`,value:d,onChange:c,onFocus:p,onBlur:f,getOptionLabel:g,renderInput:h=>y.jsx(he.TextField,{...h,error:o,fullWidth:i,disabled:n,label:t,style:{width:s}})})}function tu({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,i]=I.useState(1),[s,a]=I.useState(r),[l,d]=I.useState(Array.from({length:r},(f,g)=>g+1));I.useEffect(()=>{i(1),e(1),a(r),t(r),d(Array.from({length:r},(f,g)=>g+1))},[r,t,e]);const c=(f,g)=>{i(g),e(g),g>s&&(a(g),t(g))},p=(f,g)=>{a(g),t(g),g<o&&(i(g),e(g))};return y.jsxs(y.Fragment,{children:[y.jsx(he.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:y.jsx(Yn,{onChange:(f,g)=>c(f,g),className:"book-selection-chapter",isClearable:!1,options:l,getOptionLabel:f=>f.toString(),value:o,isDisabled:n},"start chapter"),label:"Chapters",labelPlacement:"start"}),y.jsx(he.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:y.jsx(Yn,{onChange:(f,g)=>p(f,g),className:"book-selection-chapter",isClearable:!1,options:l,getOptionLabel:f=>f.toString(),value:s,isDisabled:n},"end chapter"),label:"to",labelPlacement:"start"})]})}var Et=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Et||{});function yo({id:e,isChecked:t,labelText:n="",labelPosition:r=Et.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:s=!1,hasError:a=!1,className:l,onChange:d}){const c=y.jsx(he.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:s,className:`papi-checkbox ${a?"error":""} ${l??""}`,onChange:d});let p;if(n){const f=r===Et.Before||r===Et.Above,g=y.jsx("span",{className:`papi-checkbox-label ${a?"error":""} ${l??""}`,children:n}),h=r===Et.Before||r===Et.After,m=h?g:y.jsx("div",{children:g}),v=h?c:y.jsx("div",{children:c});p=y.jsxs(he.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:a,children:[f&&m,v,!f&&m]})}else p=c;return p}function nu({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:i,createLabel:s}){return y.jsxs("fieldset",{id:e,className:t,children:[n&&y.jsx("legend",{children:n}),r.map(a=>y.jsx(yo,{className:"check-item",isChecked:o.includes(a),labelText:s?s(a):a,onChange:()=>i(a)},a))]})}function fe(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function T(){return T=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},T.apply(this,arguments)}function ru(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function ou(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Yr={exports:{}},Dn={exports:{}},ue={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ci;function iu(){if(ci)return ue;ci=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,a=e?Symbol.for("react.context"):60110,l=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,c=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,g=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,v=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,_=e?Symbol.for("react.scope"):60119;function x(b){if(typeof b=="object"&&b!==null){var R=b.$$typeof;switch(R){case t:switch(b=b.type,b){case l:case d:case r:case i:case o:case p:return b;default:switch(b=b&&b.$$typeof,b){case a:case c:case h:case g:case s:return b;default:return R}}case n:return R}}}function E(b){return x(b)===d}return ue.AsyncMode=l,ue.ConcurrentMode=d,ue.ContextConsumer=a,ue.ContextProvider=s,ue.Element=t,ue.ForwardRef=c,ue.Fragment=r,ue.Lazy=h,ue.Memo=g,ue.Portal=n,ue.Profiler=i,ue.StrictMode=o,ue.Suspense=p,ue.isAsyncMode=function(b){return E(b)||x(b)===l},ue.isConcurrentMode=E,ue.isContextConsumer=function(b){return x(b)===a},ue.isContextProvider=function(b){return x(b)===s},ue.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===t},ue.isForwardRef=function(b){return x(b)===c},ue.isFragment=function(b){return x(b)===r},ue.isLazy=function(b){return x(b)===h},ue.isMemo=function(b){return x(b)===g},ue.isPortal=function(b){return x(b)===n},ue.isProfiler=function(b){return x(b)===i},ue.isStrictMode=function(b){return x(b)===o},ue.isSuspense=function(b){return x(b)===p},ue.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===r||b===d||b===i||b===o||b===p||b===f||typeof b=="object"&&b!==null&&(b.$$typeof===h||b.$$typeof===g||b.$$typeof===s||b.$$typeof===a||b.$$typeof===c||b.$$typeof===v||b.$$typeof===w||b.$$typeof===_||b.$$typeof===m)},ue.typeOf=x,ue}var ce={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var di;function su(){return di||(di=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,a=e?Symbol.for("react.context"):60110,l=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,c=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,g=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,v=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,_=e?Symbol.for("react.scope"):60119;function x(V){return typeof V=="string"||typeof V=="function"||V===r||V===d||V===i||V===o||V===p||V===f||typeof V=="object"&&V!==null&&(V.$$typeof===h||V.$$typeof===g||V.$$typeof===s||V.$$typeof===a||V.$$typeof===c||V.$$typeof===v||V.$$typeof===w||V.$$typeof===_||V.$$typeof===m)}function E(V){if(typeof V=="object"&&V!==null){var ee=V.$$typeof;switch(ee){case t:var M=V.type;switch(M){case l:case d:case r:case i:case o:case p:return M;default:var se=M&&M.$$typeof;switch(se){case a:case c:case h:case g:case s:return se;default:return ee}}case n:return ee}}}var b=l,R=d,P=a,j=s,F=t,B=c,N=r,C=h,k=g,$=n,D=i,A=o,z=p,J=!1;function Q(V){return J||(J=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),O(V)||E(V)===l}function O(V){return E(V)===d}function L(V){return E(V)===a}function G(V){return E(V)===s}function Y(V){return typeof V=="object"&&V!==null&&V.$$typeof===t}function H(V){return E(V)===c}function U(V){return E(V)===r}function W(V){return E(V)===h}function X(V){return E(V)===g}function q(V){return E(V)===n}function K(V){return E(V)===i}function Z(V){return E(V)===o}function ie(V){return E(V)===p}ce.AsyncMode=b,ce.ConcurrentMode=R,ce.ContextConsumer=P,ce.ContextProvider=j,ce.Element=F,ce.ForwardRef=B,ce.Fragment=N,ce.Lazy=C,ce.Memo=k,ce.Portal=$,ce.Profiler=D,ce.StrictMode=A,ce.Suspense=z,ce.isAsyncMode=Q,ce.isConcurrentMode=O,ce.isContextConsumer=L,ce.isContextProvider=G,ce.isElement=Y,ce.isForwardRef=H,ce.isFragment=U,ce.isLazy=W,ce.isMemo=X,ce.isPortal=q,ce.isProfiler=K,ce.isStrictMode=Z,ce.isSuspense=ie,ce.isValidElementType=x,ce.typeOf=E}()),ce}var pi;function Ss(){return pi||(pi=1,process.env.NODE_ENV==="production"?Dn.exports=iu():Dn.exports=su()),Dn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Rr,fi;function au(){if(fi)return Rr;fi=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var s={},a=0;a<10;a++)s["_"+String.fromCharCode(a)]=a;var l=Object.getOwnPropertyNames(s).map(function(c){return s[c]});if(l.join("")!=="0123456789")return!1;var d={};return"abcdefghijklmnopqrst".split("").forEach(function(c){d[c]=c}),Object.keys(Object.assign({},d)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Rr=o()?Object.assign:function(i,s){for(var a,l=r(i),d,c=1;c<arguments.length;c++){a=Object(arguments[c]);for(var p in a)t.call(a,p)&&(l[p]=a[p]);if(e){d=e(a);for(var f=0;f<d.length;f++)n.call(a,d[f])&&(l[d[f]]=a[d[f]])}}return l},Rr}var kr,gi;function wo(){if(gi)return kr;gi=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return kr=e,kr}var Tr,mi;function Cs(){return mi||(mi=1,Tr=Function.call.bind(Object.prototype.hasOwnProperty)),Tr}var Or,hi;function lu(){if(hi)return Or;hi=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=wo(),n={},r=Cs();e=function(i){var s="Warning: "+i;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(i,s,a,l,d){if(process.env.NODE_ENV!=="production"){for(var c in i)if(r(i,c)){var p;try{if(typeof i[c]!="function"){var f=Error((l||"React class")+": "+a+" type `"+c+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[c]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw f.name="Invariant Violation",f}p=i[c](s,c,l,a,null,t)}catch(h){p=h}if(p&&!(p instanceof Error)&&e((l||"React class")+": type specification of "+a+" `"+c+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof p+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),p instanceof Error&&!(p.message in n)){n[p.message]=!0;var g=d?d():"";e("Failed "+a+" type: "+p.message+(g??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Or=o,Or}var Nr,vi;function uu(){if(vi)return Nr;vi=1;var e=Ss(),t=au(),n=wo(),r=Cs(),o=lu(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(a){var l="Warning: "+a;typeof console<"u"&&console.error(l);try{throw new Error(l)}catch{}});function s(){return null}return Nr=function(a,l){var d=typeof Symbol=="function"&&Symbol.iterator,c="@@iterator";function p(O){var L=O&&(d&&O[d]||O[c]);if(typeof L=="function")return L}var f="<<anonymous>>",g={array:w("array"),bigint:w("bigint"),bool:w("boolean"),func:w("function"),number:w("number"),object:w("object"),string:w("string"),symbol:w("symbol"),any:_(),arrayOf:x,element:E(),elementType:b(),instanceOf:R,node:B(),objectOf:j,oneOf:P,oneOfType:F,shape:C,exact:k};function h(O,L){return O===L?O!==0||1/O===1/L:O!==O&&L!==L}function m(O,L){this.message=O,this.data=L&&typeof L=="object"?L:{},this.stack=""}m.prototype=Error.prototype;function v(O){if(process.env.NODE_ENV!=="production")var L={},G=0;function Y(U,W,X,q,K,Z,ie){if(q=q||f,Z=Z||X,ie!==n){if(l){var V=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw V.name="Invariant Violation",V}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var ee=q+":"+X;!L[ee]&&G<3&&(i("You are manually calling a React.PropTypes validation function for the `"+Z+"` prop on `"+q+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),L[ee]=!0,G++)}}return W[X]==null?U?W[X]===null?new m("The "+K+" `"+Z+"` is marked as required "+("in `"+q+"`, but its value is `null`.")):new m("The "+K+" `"+Z+"` is marked as required in "+("`"+q+"`, but its value is `undefined`.")):null:O(W,X,q,K,Z)}var H=Y.bind(null,!1);return H.isRequired=Y.bind(null,!0),H}function w(O){function L(G,Y,H,U,W,X){var q=G[Y],K=A(q);if(K!==O){var Z=z(q);return new m("Invalid "+U+" `"+W+"` of type "+("`"+Z+"` supplied to `"+H+"`, expected ")+("`"+O+"`."),{expectedType:O})}return null}return v(L)}function _(){return v(s)}function x(O){function L(G,Y,H,U,W){if(typeof O!="function")return new m("Property `"+W+"` of component `"+H+"` has invalid PropType notation inside arrayOf.");var X=G[Y];if(!Array.isArray(X)){var q=A(X);return new m("Invalid "+U+" `"+W+"` of type "+("`"+q+"` supplied to `"+H+"`, expected an array."))}for(var K=0;K<X.length;K++){var Z=O(X,K,H,U,W+"["+K+"]",n);if(Z instanceof Error)return Z}return null}return v(L)}function E(){function O(L,G,Y,H,U){var W=L[G];if(!a(W)){var X=A(W);return new m("Invalid "+H+" `"+U+"` of type "+("`"+X+"` supplied to `"+Y+"`, expected a single ReactElement."))}return null}return v(O)}function b(){function O(L,G,Y,H,U){var W=L[G];if(!e.isValidElementType(W)){var X=A(W);return new m("Invalid "+H+" `"+U+"` of type "+("`"+X+"` supplied to `"+Y+"`, expected a single ReactElement type."))}return null}return v(O)}function R(O){function L(G,Y,H,U,W){if(!(G[Y]instanceof O)){var X=O.name||f,q=Q(G[Y]);return new m("Invalid "+U+" `"+W+"` of type "+("`"+q+"` supplied to `"+H+"`, expected ")+("instance of `"+X+"`."))}return null}return v(L)}function P(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),s;function L(G,Y,H,U,W){for(var X=G[Y],q=0;q<O.length;q++)if(h(X,O[q]))return null;var K=JSON.stringify(O,function(ie,V){var ee=z(V);return ee==="symbol"?String(V):V});return new m("Invalid "+U+" `"+W+"` of value `"+String(X)+"` "+("supplied to `"+H+"`, expected one of "+K+"."))}return v(L)}function j(O){function L(G,Y,H,U,W){if(typeof O!="function")return new m("Property `"+W+"` of component `"+H+"` has invalid PropType notation inside objectOf.");var X=G[Y],q=A(X);if(q!=="object")return new m("Invalid "+U+" `"+W+"` of type "+("`"+q+"` supplied to `"+H+"`, expected an object."));for(var K in X)if(r(X,K)){var Z=O(X,K,H,U,W+"."+K,n);if(Z instanceof Error)return Z}return null}return v(L)}function F(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var L=0;L<O.length;L++){var G=O[L];if(typeof G!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+J(G)+" at index "+L+"."),s}function Y(H,U,W,X,q){for(var K=[],Z=0;Z<O.length;Z++){var ie=O[Z],V=ie(H,U,W,X,q,n);if(V==null)return null;V.data&&r(V.data,"expectedType")&&K.push(V.data.expectedType)}var ee=K.length>0?", expected one of type ["+K.join(", ")+"]":"";return new m("Invalid "+X+" `"+q+"` supplied to "+("`"+W+"`"+ee+"."))}return v(Y)}function B(){function O(L,G,Y,H,U){return $(L[G])?null:new m("Invalid "+H+" `"+U+"` supplied to "+("`"+Y+"`, expected a ReactNode."))}return v(O)}function N(O,L,G,Y,H){return new m((O||"React class")+": "+L+" type `"+G+"."+Y+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+H+"`.")}function C(O){function L(G,Y,H,U,W){var X=G[Y],q=A(X);if(q!=="object")return new m("Invalid "+U+" `"+W+"` of type `"+q+"` "+("supplied to `"+H+"`, expected `object`."));for(var K in O){var Z=O[K];if(typeof Z!="function")return N(H,U,W,K,z(Z));var ie=Z(X,K,H,U,W+"."+K,n);if(ie)return ie}return null}return v(L)}function k(O){function L(G,Y,H,U,W){var X=G[Y],q=A(X);if(q!=="object")return new m("Invalid "+U+" `"+W+"` of type `"+q+"` "+("supplied to `"+H+"`, expected `object`."));var K=t({},G[Y],O);for(var Z in K){var ie=O[Z];if(r(O,Z)&&typeof ie!="function")return N(H,U,W,Z,z(ie));if(!ie)return new m("Invalid "+U+" `"+W+"` key `"+Z+"` supplied to `"+H+"`.\nBad object: "+JSON.stringify(G[Y],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(O),null,"  "));var V=ie(X,Z,H,U,W+"."+Z,n);if(V)return V}return null}return v(L)}function $(O){switch(typeof O){case"number":case"string":case"undefined":return!0;case"boolean":return!O;case"object":if(Array.isArray(O))return O.every($);if(O===null||a(O))return!0;var L=p(O);if(L){var G=L.call(O),Y;if(L!==O.entries){for(;!(Y=G.next()).done;)if(!$(Y.value))return!1}else for(;!(Y=G.next()).done;){var H=Y.value;if(H&&!$(H[1]))return!1}}else return!1;return!0;default:return!1}}function D(O,L){return O==="symbol"?!0:L?L["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&L instanceof Symbol:!1}function A(O){var L=typeof O;return Array.isArray(O)?"array":O instanceof RegExp?"object":D(L,O)?"symbol":L}function z(O){if(typeof O>"u"||O===null)return""+O;var L=A(O);if(L==="object"){if(O instanceof Date)return"date";if(O instanceof RegExp)return"regexp"}return L}function J(O){var L=z(O);switch(L){case"array":case"object":return"an "+L;case"boolean":case"date":case"regexp":return"a "+L;default:return L}}function Q(O){return!O.constructor||!O.constructor.name?f:O.constructor.name}return g.checkPropTypes=o,g.resetWarningCache=o.resetWarningCache,g.PropTypes=g,g},Nr}var Pr,bi;function cu(){if(bi)return Pr;bi=1;var e=wo();function t(){}function n(){}return n.resetWarningCache=t,Pr=function(){function r(s,a,l,d,c,p){if(p!==e){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},Pr}if(process.env.NODE_ENV!=="production"){var du=Ss(),pu=!0;Yr.exports=uu()(du.isElement,pu)}else Yr.exports=cu()();var fu=Yr.exports;const u=ru(fu);function Kt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function St(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Rs(e){if(!St(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Rs(e[n])}),t}function rt(e,t,n={clone:!0}){const r=n.clone?T({},e):e;return St(e)&&St(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(St(t[o])&&o in e&&St(e[o])?r[o]=rt(e[o],t[o],n):n.clone?r[o]=St(t[o])?Rs(t[o]):t[o]:r[o]=t[o])}),r}function gu(e){const{prototype:t={}}=e;return!!t.isReactComponent}function ks(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let a;const l=i.type;return typeof l=="function"&&!gu(l)&&(a="Did you accidentally use a plain function component for an element instead?"),a!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ts=Kt(u.element,ks);Ts.isRequired=Kt(u.element.isRequired,ks);const kn=Ts;function mu(e){const{prototype:t={}}=e;return!!t.isReactComponent}function hu(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let a;return typeof i=="function"&&!mu(i)&&(a="Did you accidentally provide a plain function component instead?"),a!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const vu=Kt(u.elementType,hu),bu="exact-prop: ​";function Os(e){return process.env.NODE_ENV==="production"?e:T({},e,{[bu]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function zt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Kr={exports:{}},de={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yi;function yu(){if(yi)return de;yi=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),a=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),c=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),g=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function m(v){if(typeof v=="object"&&v!==null){var w=v.$$typeof;switch(w){case e:switch(v=v.type,v){case n:case o:case r:case d:case c:return v;default:switch(v=v&&v.$$typeof,v){case a:case s:case l:case f:case p:case i:return v;default:return w}}case t:return w}}}return de.ContextConsumer=s,de.ContextProvider=i,de.Element=e,de.ForwardRef=l,de.Fragment=n,de.Lazy=f,de.Memo=p,de.Portal=t,de.Profiler=o,de.StrictMode=r,de.Suspense=d,de.SuspenseList=c,de.isAsyncMode=function(){return!1},de.isConcurrentMode=function(){return!1},de.isContextConsumer=function(v){return m(v)===s},de.isContextProvider=function(v){return m(v)===i},de.isElement=function(v){return typeof v=="object"&&v!==null&&v.$$typeof===e},de.isForwardRef=function(v){return m(v)===l},de.isFragment=function(v){return m(v)===n},de.isLazy=function(v){return m(v)===f},de.isMemo=function(v){return m(v)===p},de.isPortal=function(v){return m(v)===t},de.isProfiler=function(v){return m(v)===o},de.isStrictMode=function(v){return m(v)===r},de.isSuspense=function(v){return m(v)===d},de.isSuspenseList=function(v){return m(v)===c},de.isValidElementType=function(v){return typeof v=="string"||typeof v=="function"||v===n||v===o||v===r||v===d||v===c||v===g||typeof v=="object"&&v!==null&&(v.$$typeof===f||v.$$typeof===p||v.$$typeof===i||v.$$typeof===s||v.$$typeof===l||v.$$typeof===h||v.getModuleId!==void 0)},de.typeOf=m,de}var pe={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wi;function wu(){return wi||(wi=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),a=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),c=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),g=Symbol.for("react.offscreen"),h=!1,m=!1,v=!1,w=!1,_=!1,x;x=Symbol.for("react.module.reference");function E(M){return!!(typeof M=="string"||typeof M=="function"||M===n||M===o||_||M===r||M===d||M===c||w||M===g||h||m||v||typeof M=="object"&&M!==null&&(M.$$typeof===f||M.$$typeof===p||M.$$typeof===i||M.$$typeof===s||M.$$typeof===l||M.$$typeof===x||M.getModuleId!==void 0))}function b(M){if(typeof M=="object"&&M!==null){var se=M.$$typeof;switch(se){case e:var Ee=M.type;switch(Ee){case n:case o:case r:case d:case c:return Ee;default:var Oe=Ee&&Ee.$$typeof;switch(Oe){case a:case s:case l:case f:case p:case i:return Oe;default:return se}}case t:return se}}}var R=s,P=i,j=e,F=l,B=n,N=f,C=p,k=t,$=o,D=r,A=d,z=c,J=!1,Q=!1;function O(M){return J||(J=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function L(M){return Q||(Q=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function G(M){return b(M)===s}function Y(M){return b(M)===i}function H(M){return typeof M=="object"&&M!==null&&M.$$typeof===e}function U(M){return b(M)===l}function W(M){return b(M)===n}function X(M){return b(M)===f}function q(M){return b(M)===p}function K(M){return b(M)===t}function Z(M){return b(M)===o}function ie(M){return b(M)===r}function V(M){return b(M)===d}function ee(M){return b(M)===c}pe.ContextConsumer=R,pe.ContextProvider=P,pe.Element=j,pe.ForwardRef=F,pe.Fragment=B,pe.Lazy=N,pe.Memo=C,pe.Portal=k,pe.Profiler=$,pe.StrictMode=D,pe.Suspense=A,pe.SuspenseList=z,pe.isAsyncMode=O,pe.isConcurrentMode=L,pe.isContextConsumer=G,pe.isContextProvider=Y,pe.isElement=H,pe.isForwardRef=U,pe.isFragment=W,pe.isLazy=X,pe.isMemo=q,pe.isPortal=K,pe.isProfiler=Z,pe.isStrictMode=ie,pe.isSuspense=V,pe.isSuspenseList=ee,pe.isValidElementType=E,pe.typeOf=b}()),pe}process.env.NODE_ENV==="production"?Kr.exports=yu():Kr.exports=wu();var Kn=Kr.exports;const xu=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Eu(e){const t=`${e}`.match(xu);return t&&t[1]||""}function Ns(e,t=""){return e.displayName||e.name||Eu(e)||t}function xi(e,t,n){const r=Ns(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Su(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Ns(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Kn.ForwardRef:return xi(e,e.render,"ForwardRef");case Kn.Memo:return xi(e,e.type,"memo");default:return}}}function ot(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],s=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Cu=u.oneOfType([u.func,u.object]),xo=Cu;function Ke(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":zt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Jr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Ps(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function Ru(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,s)=>{const a=o||"<<anonymous>>",l=s||r;return typeof n[r]<"u"?new Error(`The ${i} \`${l}\` of \`${a}\` is deprecated. ${t}`):null}}function ku(e,t){var n,r;return S.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function ke(e){return e&&e.ownerDocument||document}function Ht(e){return ke(e).defaultView||window}function Tu(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?T({},t.propTypes):null;return o=>(i,s,a,l,d,...c)=>{const p=d||s,f=n==null?void 0:n[p];if(f){const g=f(i,s,a,l,d,...c);if(g)return g}return typeof i[s]<"u"&&!i[o]?new Error(`The prop \`${p}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Jn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Ou=typeof window<"u"?S.useLayoutEffect:S.useEffect,kt=Ou;let Ei=0;function Nu(e){const[t,n]=S.useState(e),r=e||t;return S.useEffect(()=>{t==null&&(Ei+=1,n(`mui-${Ei}`))},[t]),r}const Si=S["useId".toString()];function _s(e){if(Si!==void 0){const t=Si();return e??t}return Nu(e)}function Pu(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function $s({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=S.useRef(e!==void 0),[i,s]=S.useState(t),a=o?e:i;if(process.env.NODE_ENV!=="production"){S.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:d}=S.useRef(t);S.useEffect(()=>{!o&&d!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const l=S.useCallback(d=>{o||s(d)},[]);return[a,l]}function wn(e){const t=S.useRef(e);return kt(()=>{t.current=e}),S.useRef((...n)=>(0,t.current)(...n)).current}function He(...e){return S.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Jn(n,t)})},e)}const Ci={};function _u(e,t){const n=S.useRef(Ci);return n.current===Ci&&(n.current=e(t)),n}const $u=[];function Mu(e){S.useEffect(e,$u)}class Tn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Tn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function dn(){const e=_u(Tn.create).current;return Mu(e.disposeEffect),e}let lr=!0,Zr=!1;const Iu=new Tn,Au={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Du(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Au[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function ju(e){e.metaKey||e.altKey||e.ctrlKey||(lr=!0)}function _r(){lr=!1}function Fu(){this.visibilityState==="hidden"&&Zr&&(lr=!0)}function Vu(e){e.addEventListener("keydown",ju,!0),e.addEventListener("mousedown",_r,!0),e.addEventListener("pointerdown",_r,!0),e.addEventListener("touchstart",_r,!0),e.addEventListener("visibilitychange",Fu,!0)}function Lu(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return lr||Du(t)}function Ms(){const e=S.useCallback(o=>{o!=null&&Vu(o.ownerDocument)},[]),t=S.useRef(!1);function n(){return t.current?(Zr=!0,Iu.start(100,()=>{Zr=!1}),t.current=!1,!0):!1}function r(o){return Lu(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Is(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Bu(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function zu(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Hu=Number.isInteger||zu;function As(e,t,n,r){const o=e[t];if(o==null||!Hu(o)){const i=Bu(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function Ds(e,t,...n){return e[t]===void 0?null:As(e,t,...n)}function Qr(){return null}Ds.isRequired=As;Qr.isRequired=Qr;const js=process.env.NODE_ENV==="production"?Qr:Ds;function Fs(e,t){const n=T({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=T({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=T({},i),Object.keys(o).forEach(s=>{n[r][s]=Fs(o[s],i[s])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function at(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,s)=>{if(s){const a=t(s);a!==""&&i.push(a),n&&n[s]&&i.push(n[s])}return i},[]).join(" ")}),r}const Ri=e=>e,Gu=()=>{let e=Ri;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Ri}}},Uu=Gu(),Vs=Uu,Ls={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Ze(e,t,n="Mui"){const r=Ls[t];return r?`${n}-${r}`:`${Vs.generate(e)}-${t}`}function gt(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=Ze(e,o,n)}),r}function qu(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Bs(e){return typeof e=="string"}function pn(e,t,n){return e===void 0||Bs(e)?t:T({},t,{ownerState:T({},t.ownerState,n)})}const Wu={disableDefaultClasses:!1},Xu=S.createContext(Wu);function Yu(e){const{disableDefaultClasses:t}=S.useContext(Xu);return n=>t?"":e(n)}function zs(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function Ku(e,t,n){return typeof e=="function"?e(t,n):e}function ki(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function Ju(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const g=Re(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),h=T({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),m=T({},n,o,r);return g.length>0&&(m.className=g),Object.keys(h).length>0&&(m.style=h),{props:m,internalRef:void 0}}const s=zs(T({},o,r)),a=ki(r),l=ki(o),d=t(s),c=Re(d==null?void 0:d.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),p=T({},d==null?void 0:d.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=T({},d,n,l,a);return c.length>0&&(f.className=c),Object.keys(p).length>0&&(f.style=p),{props:f,internalRef:d.ref}}const Zu=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Tt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,s=fe(e,Zu),a=i?{}:Ku(r,o),{props:l,internalRef:d}=Ju(T({},s,{externalSlotProps:a})),c=He(d,a==null?void 0:a.ref,(t=e.additionalProps)==null?void 0:t.ref);return pn(n,T({},l,{ref:c}),o)}const Hs="base";function Qu(e){return`${Hs}--${e}`}function ec(e,t){return`${Hs}-${e}-${t}`}function Gs(e,t){const n=Ls[t];return n?Qu(n):ec(e,t)}function tc(e,t){const n={};return t.forEach(r=>{n[r]=Gs(e,r)}),n}const nc=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function rc(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function oc(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function ic(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||oc(e))}function sc(e){const t=[],n=[];return Array.from(e.querySelectorAll(nc)).forEach((r,o)=>{const i=rc(r);i===-1||!ic(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function ac(){return!0}function Zn(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=sc,isEnabled:s=ac,open:a}=e,l=S.useRef(!1),d=S.useRef(null),c=S.useRef(null),p=S.useRef(null),f=S.useRef(null),g=S.useRef(!1),h=S.useRef(null),m=He(t.ref,h),v=S.useRef(null);S.useEffect(()=>{!a||!h.current||(g.current=!n)},[n,a]),S.useEffect(()=>{if(!a||!h.current)return;const x=ke(h.current);return h.current.contains(x.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),g.current&&h.current.focus()),()=>{o||(p.current&&p.current.focus&&(l.current=!0,p.current.focus()),p.current=null)}},[a]),S.useEffect(()=>{if(!a||!h.current)return;const x=ke(h.current),E=P=>{v.current=P,!(r||!s()||P.key!=="Tab")&&x.activeElement===h.current&&P.shiftKey&&(l.current=!0,c.current&&c.current.focus())},b=()=>{const P=h.current;if(P===null)return;if(!x.hasFocus()||!s()||l.current){l.current=!1;return}if(P.contains(x.activeElement)||r&&x.activeElement!==d.current&&x.activeElement!==c.current)return;if(x.activeElement!==f.current)f.current=null;else if(f.current!==null)return;if(!g.current)return;let j=[];if((x.activeElement===d.current||x.activeElement===c.current)&&(j=i(h.current)),j.length>0){var F,B;const N=!!((F=v.current)!=null&&F.shiftKey&&((B=v.current)==null?void 0:B.key)==="Tab"),C=j[0],k=j[j.length-1];typeof C!="string"&&typeof k!="string"&&(N?k.focus():C.focus())}else P.focus()};x.addEventListener("focusin",b),x.addEventListener("keydown",E,!0);const R=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&b()},50);return()=>{clearInterval(R),x.removeEventListener("focusin",b),x.removeEventListener("keydown",E,!0)}},[n,r,o,s,a,i]);const w=x=>{p.current===null&&(p.current=x.relatedTarget),g.current=!0,f.current=x.target;const E=t.props.onFocus;E&&E(x)},_=x=>{p.current===null&&(p.current=x.relatedTarget),g.current=!0};return y.jsxs(S.Fragment,{children:[y.jsx("div",{tabIndex:a?0:-1,onFocus:_,ref:d,"data-testid":"sentinelStart"}),S.cloneElement(t,{ref:m,onFocus:w}),y.jsx("div",{tabIndex:a?0:-1,onFocus:_,ref:c,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(Zn.propTypes={children:kn,disableAutoFocus:u.bool,disableEnforceFocus:u.bool,disableRestoreFocus:u.bool,getTabbable:u.func,isEnabled:u.func,open:u.bool.isRequired});process.env.NODE_ENV!=="production"&&(Zn["propTypes"]=Os(Zn.propTypes));function lc(e){return typeof e=="function"?e():e}const xn=S.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[s,a]=S.useState(null),l=He(S.isValidElement(r)?r.ref:null,n);if(kt(()=>{i||a(lc(o)||document.body)},[o,i]),kt(()=>{if(s&&!i)return Jn(n,s),()=>{Jn(n,null)}},[n,s,i]),i){if(S.isValidElement(r)){const d={ref:l};return S.cloneElement(r,d)}return y.jsx(S.Fragment,{children:r})}return y.jsx(S.Fragment,{children:s&&Rl.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&(xn.propTypes={children:u.node,container:u.oneOfType([ot,u.func]),disablePortal:u.bool});process.env.NODE_ENV!=="production"&&(xn["propTypes"]=Os(xn.propTypes));function uc(e){const t=ke(e);return t.body===e?Ht(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function hn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Ti(e){return parseInt(Ht(e).getComputedStyle(e).paddingRight,10)||0}function cc(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Oi(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,s=>{const a=i.indexOf(s)===-1,l=!cc(s);a&&l&&hn(s,o)})}function $r(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function dc(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(uc(r)){const s=Is(ke(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Ti(r)+s}px`;const a=ke(r).querySelectorAll(".mui-fixed");[].forEach.call(a,l=>{n.push({value:l.style.paddingRight,property:"padding-right",el:l}),l.style.paddingRight=`${Ti(l)+s}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=ke(r).body;else{const s=r.parentElement,a=Ht(r);i=(s==null?void 0:s.nodeName)==="HTML"&&a.getComputedStyle(s).overflowY==="scroll"?s:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:s,property:a})=>{i?s.style.setProperty(a,i):s.style.removeProperty(a)})}}function pc(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class fc{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&hn(t.modalRef,!1);const o=pc(n);Oi(n,t.mount,t.modalRef,o,!0);const i=$r(this.containers,s=>s.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=$r(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=dc(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=$r(this.containers,s=>s.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&hn(t.modalRef,n),Oi(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=i.modals[i.modals.length-1];s.modalRef&&hn(s.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function gc(e){return typeof e=="function"?e():e}function mc(e){return e?e.props.hasOwnProperty("in"):!1}const hc=new fc;function vc(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=hc,closeAfterTransition:i=!1,onTransitionEnter:s,onTransitionExited:a,children:l,onClose:d,open:c,rootRef:p}=e,f=S.useRef({}),g=S.useRef(null),h=S.useRef(null),m=He(h,p),[v,w]=S.useState(!c),_=mc(l);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const E=()=>ke(g.current),b=()=>(f.current.modalRef=h.current,f.current.mount=g.current,f.current),R=()=>{o.mount(b(),{disableScrollLock:r}),h.current&&(h.current.scrollTop=0)},P=wn(()=>{const A=gc(t)||E().body;o.add(b(),A),h.current&&R()}),j=S.useCallback(()=>o.isTopModal(b()),[o]),F=wn(A=>{g.current=A,A&&(c&&j()?R():h.current&&hn(h.current,x))}),B=S.useCallback(()=>{o.remove(b(),x)},[x,o]);S.useEffect(()=>()=>{B()},[B]),S.useEffect(()=>{c?P():(!_||!i)&&B()},[c,B,_,i,P]);const N=A=>z=>{var J;(J=A.onKeyDown)==null||J.call(A,z),!(z.key!=="Escape"||z.which===229||!j())&&(n||(z.stopPropagation(),d&&d(z,"escapeKeyDown")))},C=A=>z=>{var J;(J=A.onClick)==null||J.call(A,z),z.target===z.currentTarget&&d&&d(z,"backdropClick")};return{getRootProps:(A={})=>{const z=zs(e);delete z.onTransitionEnter,delete z.onTransitionExited;const J=T({},z,A);return T({role:"presentation"},J,{onKeyDown:N(J),ref:m})},getBackdropProps:(A={})=>{const z=A;return T({"aria-hidden":!0},z,{onClick:C(z),open:c})},getTransitionProps:()=>{const A=()=>{w(!1),s&&s()},z=()=>{w(!0),a&&a(),i&&B()};return{onEnter:Jr(A,l==null?void 0:l.props.onEnter),onExited:Jr(z,l==null?void 0:l.props.onExited)}},rootRef:m,portalRef:F,isTopModal:j,exited:v,hasTransition:_}}var _e="top",Ge="bottom",Ue="right",$e="left",Eo="auto",On=[_e,Ge,Ue,$e],Gt="start",En="end",bc="clippingParents",Us="viewport",on="popper",yc="reference",Ni=On.reduce(function(e,t){return e.concat([t+"-"+Gt,t+"-"+En])},[]),qs=[].concat(On,[Eo]).reduce(function(e,t){return e.concat([t,t+"-"+Gt,t+"-"+En])},[]),wc="beforeRead",xc="read",Ec="afterRead",Sc="beforeMain",Cc="main",Rc="afterMain",kc="beforeWrite",Tc="write",Oc="afterWrite",Nc=[wc,xc,Ec,Sc,Cc,Rc,kc,Tc,Oc];function Je(e){return e?(e.nodeName||"").toLowerCase():null}function Fe(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Ot(e){var t=Fe(e).Element;return e instanceof t||e instanceof Element}function ze(e){var t=Fe(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function So(e){if(typeof ShadowRoot>"u")return!1;var t=Fe(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Pc(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!ze(i)||!Je(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(s){var a=o[s];a===!1?i.removeAttribute(s):i.setAttribute(s,a===!0?"":a)}))})}function _c(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},s=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),a=s.reduce(function(l,d){return l[d]="",l},{});!ze(o)||!Je(o)||(Object.assign(o.style,a),Object.keys(i).forEach(function(l){o.removeAttribute(l)}))})}}const $c={name:"applyStyles",enabled:!0,phase:"write",fn:Pc,effect:_c,requires:["computeStyles"]};function Ye(e){return e.split("-")[0]}var Ct=Math.max,Qn=Math.min,Ut=Math.round;function eo(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ws(){return!/^((?!chrome|android).)*safari/i.test(eo())}function qt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&ze(e)&&(o=e.offsetWidth>0&&Ut(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&Ut(r.height)/e.offsetHeight||1);var s=Ot(e)?Fe(e):window,a=s.visualViewport,l=!Ws()&&n,d=(r.left+(l&&a?a.offsetLeft:0))/o,c=(r.top+(l&&a?a.offsetTop:0))/i,p=r.width/o,f=r.height/i;return{width:p,height:f,top:c,right:d+p,bottom:c+f,left:d,x:d,y:c}}function Co(e){var t=qt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Xs(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&So(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function it(e){return Fe(e).getComputedStyle(e)}function Mc(e){return["table","td","th"].indexOf(Je(e))>=0}function mt(e){return((Ot(e)?e.ownerDocument:e.document)||window.document).documentElement}function ur(e){return Je(e)==="html"?e:e.assignedSlot||e.parentNode||(So(e)?e.host:null)||mt(e)}function Pi(e){return!ze(e)||it(e).position==="fixed"?null:e.offsetParent}function Ic(e){var t=/firefox/i.test(eo()),n=/Trident/i.test(eo());if(n&&ze(e)){var r=it(e);if(r.position==="fixed")return null}var o=ur(e);for(So(o)&&(o=o.host);ze(o)&&["html","body"].indexOf(Je(o))<0;){var i=it(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function Nn(e){for(var t=Fe(e),n=Pi(e);n&&Mc(n)&&it(n).position==="static";)n=Pi(n);return n&&(Je(n)==="html"||Je(n)==="body"&&it(n).position==="static")?t:n||Ic(e)||t}function Ro(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function vn(e,t,n){return Ct(e,Qn(t,n))}function Ac(e,t,n){var r=vn(e,t,n);return r>n?n:r}function Ys(){return{top:0,right:0,bottom:0,left:0}}function Ks(e){return Object.assign({},Ys(),e)}function Js(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Dc=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Ks(typeof t!="number"?t:Js(t,On))};function jc(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,s=n.modifiersData.popperOffsets,a=Ye(n.placement),l=Ro(a),d=[$e,Ue].indexOf(a)>=0,c=d?"height":"width";if(!(!i||!s)){var p=Dc(o.padding,n),f=Co(i),g=l==="y"?_e:$e,h=l==="y"?Ge:Ue,m=n.rects.reference[c]+n.rects.reference[l]-s[l]-n.rects.popper[c],v=s[l]-n.rects.reference[l],w=Nn(i),_=w?l==="y"?w.clientHeight||0:w.clientWidth||0:0,x=m/2-v/2,E=p[g],b=_-f[c]-p[h],R=_/2-f[c]/2+x,P=vn(E,R,b),j=l;n.modifiersData[r]=(t={},t[j]=P,t.centerOffset=P-R,t)}}function Fc(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Xs(t.elements.popper,o)&&(t.elements.arrow=o))}const Vc={name:"arrow",enabled:!0,phase:"main",fn:jc,effect:Fc,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Wt(e){return e.split("-")[1]}var Lc={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Bc(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Ut(n*o)/o||0,y:Ut(r*o)/o||0}}function _i(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,s=e.offsets,a=e.position,l=e.gpuAcceleration,d=e.adaptive,c=e.roundOffsets,p=e.isFixed,f=s.x,g=f===void 0?0:f,h=s.y,m=h===void 0?0:h,v=typeof c=="function"?c({x:g,y:m}):{x:g,y:m};g=v.x,m=v.y;var w=s.hasOwnProperty("x"),_=s.hasOwnProperty("y"),x=$e,E=_e,b=window;if(d){var R=Nn(n),P="clientHeight",j="clientWidth";if(R===Fe(n)&&(R=mt(n),it(R).position!=="static"&&a==="absolute"&&(P="scrollHeight",j="scrollWidth")),R=R,o===_e||(o===$e||o===Ue)&&i===En){E=Ge;var F=p&&R===b&&b.visualViewport?b.visualViewport.height:R[P];m-=F-r.height,m*=l?1:-1}if(o===$e||(o===_e||o===Ge)&&i===En){x=Ue;var B=p&&R===b&&b.visualViewport?b.visualViewport.width:R[j];g-=B-r.width,g*=l?1:-1}}var N=Object.assign({position:a},d&&Lc),C=c===!0?Bc({x:g,y:m},Fe(n)):{x:g,y:m};if(g=C.x,m=C.y,l){var k;return Object.assign({},N,(k={},k[E]=_?"0":"",k[x]=w?"0":"",k.transform=(b.devicePixelRatio||1)<=1?"translate("+g+"px, "+m+"px)":"translate3d("+g+"px, "+m+"px, 0)",k))}return Object.assign({},N,(t={},t[E]=_?m+"px":"",t[x]=w?g+"px":"",t.transform="",t))}function zc(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,s=i===void 0?!0:i,a=n.roundOffsets,l=a===void 0?!0:a,d={placement:Ye(t.placement),variation:Wt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,_i(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:l})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,_i(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Hc={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:zc,data:{}};var jn={passive:!0};function Gc(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,s=r.resize,a=s===void 0?!0:s,l=Fe(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&d.forEach(function(c){c.addEventListener("scroll",n.update,jn)}),a&&l.addEventListener("resize",n.update,jn),function(){i&&d.forEach(function(c){c.removeEventListener("scroll",n.update,jn)}),a&&l.removeEventListener("resize",n.update,jn)}}const Uc={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Gc,data:{}};var qc={left:"right",right:"left",bottom:"top",top:"bottom"};function Gn(e){return e.replace(/left|right|bottom|top/g,function(t){return qc[t]})}var Wc={start:"end",end:"start"};function $i(e){return e.replace(/start|end/g,function(t){return Wc[t]})}function ko(e){var t=Fe(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function To(e){return qt(mt(e)).left+ko(e).scrollLeft}function Xc(e,t){var n=Fe(e),r=mt(e),o=n.visualViewport,i=r.clientWidth,s=r.clientHeight,a=0,l=0;if(o){i=o.width,s=o.height;var d=Ws();(d||!d&&t==="fixed")&&(a=o.offsetLeft,l=o.offsetTop)}return{width:i,height:s,x:a+To(e),y:l}}function Yc(e){var t,n=mt(e),r=ko(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=Ct(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=Ct(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),a=-r.scrollLeft+To(e),l=-r.scrollTop;return it(o||n).direction==="rtl"&&(a+=Ct(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:s,x:a,y:l}}function Oo(e){var t=it(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Zs(e){return["html","body","#document"].indexOf(Je(e))>=0?e.ownerDocument.body:ze(e)&&Oo(e)?e:Zs(ur(e))}function bn(e,t){var n;t===void 0&&(t=[]);var r=Zs(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=Fe(r),s=o?[i].concat(i.visualViewport||[],Oo(r)?r:[]):r,a=t.concat(s);return o?a:a.concat(bn(ur(s)))}function to(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Kc(e,t){var n=qt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Mi(e,t,n){return t===Us?to(Xc(e,n)):Ot(t)?Kc(t,n):to(Yc(mt(e)))}function Jc(e){var t=bn(ur(e)),n=["absolute","fixed"].indexOf(it(e).position)>=0,r=n&&ze(e)?Nn(e):e;return Ot(r)?t.filter(function(o){return Ot(o)&&Xs(o,r)&&Je(o)!=="body"}):[]}function Zc(e,t,n,r){var o=t==="clippingParents"?Jc(e):[].concat(t),i=[].concat(o,[n]),s=i[0],a=i.reduce(function(l,d){var c=Mi(e,d,r);return l.top=Ct(c.top,l.top),l.right=Qn(c.right,l.right),l.bottom=Qn(c.bottom,l.bottom),l.left=Ct(c.left,l.left),l},Mi(e,s,r));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function Qs(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ye(r):null,i=r?Wt(r):null,s=t.x+t.width/2-n.width/2,a=t.y+t.height/2-n.height/2,l;switch(o){case _e:l={x:s,y:t.y-n.height};break;case Ge:l={x:s,y:t.y+t.height};break;case Ue:l={x:t.x+t.width,y:a};break;case $e:l={x:t.x-n.width,y:a};break;default:l={x:t.x,y:t.y}}var d=o?Ro(o):null;if(d!=null){var c=d==="y"?"height":"width";switch(i){case Gt:l[d]=l[d]-(t[c]/2-n[c]/2);break;case En:l[d]=l[d]+(t[c]/2-n[c]/2);break}}return l}function Sn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,s=i===void 0?e.strategy:i,a=n.boundary,l=a===void 0?bc:a,d=n.rootBoundary,c=d===void 0?Us:d,p=n.elementContext,f=p===void 0?on:p,g=n.altBoundary,h=g===void 0?!1:g,m=n.padding,v=m===void 0?0:m,w=Ks(typeof v!="number"?v:Js(v,On)),_=f===on?yc:on,x=e.rects.popper,E=e.elements[h?_:f],b=Zc(Ot(E)?E:E.contextElement||mt(e.elements.popper),l,c,s),R=qt(e.elements.reference),P=Qs({reference:R,element:x,strategy:"absolute",placement:o}),j=to(Object.assign({},x,P)),F=f===on?j:R,B={top:b.top-F.top+w.top,bottom:F.bottom-b.bottom+w.bottom,left:b.left-F.left+w.left,right:F.right-b.right+w.right},N=e.modifiersData.offset;if(f===on&&N){var C=N[o];Object.keys(B).forEach(function(k){var $=[Ue,Ge].indexOf(k)>=0?1:-1,D=[_e,Ge].indexOf(k)>=0?"y":"x";B[k]+=C[D]*$})}return B}function Qc(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,s=n.padding,a=n.flipVariations,l=n.allowedAutoPlacements,d=l===void 0?qs:l,c=Wt(r),p=c?a?Ni:Ni.filter(function(h){return Wt(h)===c}):On,f=p.filter(function(h){return d.indexOf(h)>=0});f.length===0&&(f=p);var g=f.reduce(function(h,m){return h[m]=Sn(e,{placement:m,boundary:o,rootBoundary:i,padding:s})[Ye(m)],h},{});return Object.keys(g).sort(function(h,m){return g[h]-g[m]})}function ed(e){if(Ye(e)===Eo)return[];var t=Gn(e);return[$i(e),t,$i(t)]}function td(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,a=s===void 0?!0:s,l=n.fallbackPlacements,d=n.padding,c=n.boundary,p=n.rootBoundary,f=n.altBoundary,g=n.flipVariations,h=g===void 0?!0:g,m=n.allowedAutoPlacements,v=t.options.placement,w=Ye(v),_=w===v,x=l||(_||!h?[Gn(v)]:ed(v)),E=[v].concat(x).reduce(function(H,U){return H.concat(Ye(U)===Eo?Qc(t,{placement:U,boundary:c,rootBoundary:p,padding:d,flipVariations:h,allowedAutoPlacements:m}):U)},[]),b=t.rects.reference,R=t.rects.popper,P=new Map,j=!0,F=E[0],B=0;B<E.length;B++){var N=E[B],C=Ye(N),k=Wt(N)===Gt,$=[_e,Ge].indexOf(C)>=0,D=$?"width":"height",A=Sn(t,{placement:N,boundary:c,rootBoundary:p,altBoundary:f,padding:d}),z=$?k?Ue:$e:k?Ge:_e;b[D]>R[D]&&(z=Gn(z));var J=Gn(z),Q=[];if(i&&Q.push(A[C]<=0),a&&Q.push(A[z]<=0,A[J]<=0),Q.every(function(H){return H})){F=N,j=!1;break}P.set(N,Q)}if(j)for(var O=h?3:1,L=function(U){var W=E.find(function(X){var q=P.get(X);if(q)return q.slice(0,U).every(function(K){return K})});if(W)return F=W,"break"},G=O;G>0;G--){var Y=L(G);if(Y==="break")break}t.placement!==F&&(t.modifiersData[r]._skip=!0,t.placement=F,t.reset=!0)}}const nd={name:"flip",enabled:!0,phase:"main",fn:td,requiresIfExists:["offset"],data:{_skip:!1}};function Ii(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Ai(e){return[_e,Ue,Ge,$e].some(function(t){return e[t]>=0})}function rd(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,s=Sn(t,{elementContext:"reference"}),a=Sn(t,{altBoundary:!0}),l=Ii(s,r),d=Ii(a,o,i),c=Ai(l),p=Ai(d);t.modifiersData[n]={referenceClippingOffsets:l,popperEscapeOffsets:d,isReferenceHidden:c,hasPopperEscaped:p},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":c,"data-popper-escaped":p})}const od={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:rd};function id(e,t,n){var r=Ye(e),o=[$e,_e].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,s=i[0],a=i[1];return s=s||0,a=(a||0)*o,[$e,Ue].indexOf(r)>=0?{x:a,y:s}:{x:s,y:a}}function sd(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,s=qs.reduce(function(c,p){return c[p]=id(p,t.rects,i),c},{}),a=s[t.placement],l=a.x,d=a.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=l,t.modifiersData.popperOffsets.y+=d),t.modifiersData[r]=s}const ad={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:sd};function ld(e){var t=e.state,n=e.name;t.modifiersData[n]=Qs({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const ud={name:"popperOffsets",enabled:!0,phase:"read",fn:ld,data:{}};function cd(e){return e==="x"?"y":"x"}function dd(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,a=s===void 0?!1:s,l=n.boundary,d=n.rootBoundary,c=n.altBoundary,p=n.padding,f=n.tether,g=f===void 0?!0:f,h=n.tetherOffset,m=h===void 0?0:h,v=Sn(t,{boundary:l,rootBoundary:d,padding:p,altBoundary:c}),w=Ye(t.placement),_=Wt(t.placement),x=!_,E=Ro(w),b=cd(E),R=t.modifiersData.popperOffsets,P=t.rects.reference,j=t.rects.popper,F=typeof m=="function"?m(Object.assign({},t.rects,{placement:t.placement})):m,B=typeof F=="number"?{mainAxis:F,altAxis:F}:Object.assign({mainAxis:0,altAxis:0},F),N=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,C={x:0,y:0};if(R){if(i){var k,$=E==="y"?_e:$e,D=E==="y"?Ge:Ue,A=E==="y"?"height":"width",z=R[E],J=z+v[$],Q=z-v[D],O=g?-j[A]/2:0,L=_===Gt?P[A]:j[A],G=_===Gt?-j[A]:-P[A],Y=t.elements.arrow,H=g&&Y?Co(Y):{width:0,height:0},U=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Ys(),W=U[$],X=U[D],q=vn(0,P[A],H[A]),K=x?P[A]/2-O-q-W-B.mainAxis:L-q-W-B.mainAxis,Z=x?-P[A]/2+O+q+X+B.mainAxis:G+q+X+B.mainAxis,ie=t.elements.arrow&&Nn(t.elements.arrow),V=ie?E==="y"?ie.clientTop||0:ie.clientLeft||0:0,ee=(k=N==null?void 0:N[E])!=null?k:0,M=z+K-ee-V,se=z+Z-ee,Ee=vn(g?Qn(J,M):J,z,g?Ct(Q,se):Q);R[E]=Ee,C[E]=Ee-z}if(a){var Oe,we=E==="x"?_e:$e,vt=E==="x"?Ge:Ue,Ne=R[b],Qe=b==="y"?"height":"width",Ie=Ne+v[we],et=Ne-v[vt],Se=[_e,$e].indexOf(w)!==-1,Pt=(Oe=N==null?void 0:N[b])!=null?Oe:0,bt=Se?Ie:Ne-P[Qe]-j[Qe]-Pt+B.altAxis,Jt=Se?Ne+P[Qe]+j[Qe]-Pt-B.altAxis:et,Mn=g&&Se?Ac(bt,Ne,Jt):vn(g?bt:Ie,Ne,g?Jt:et);R[b]=Mn,C[b]=Mn-Ne}t.modifiersData[r]=C}}const pd={name:"preventOverflow",enabled:!0,phase:"main",fn:dd,requiresIfExists:["offset"]};function fd(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function gd(e){return e===Fe(e)||!ze(e)?ko(e):fd(e)}function md(e){var t=e.getBoundingClientRect(),n=Ut(t.width)/e.offsetWidth||1,r=Ut(t.height)/e.offsetHeight||1;return n!==1||r!==1}function hd(e,t,n){n===void 0&&(n=!1);var r=ze(t),o=ze(t)&&md(t),i=mt(t),s=qt(e,o,n),a={scrollLeft:0,scrollTop:0},l={x:0,y:0};return(r||!r&&!n)&&((Je(t)!=="body"||Oo(i))&&(a=gd(t)),ze(t)?(l=qt(t,!0),l.x+=t.clientLeft,l.y+=t.clientTop):i&&(l.x=To(i))),{x:s.left+a.scrollLeft-l.x,y:s.top+a.scrollTop-l.y,width:s.width,height:s.height}}function vd(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var s=[].concat(i.requires||[],i.requiresIfExists||[]);s.forEach(function(a){if(!n.has(a)){var l=t.get(a);l&&o(l)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function bd(e){var t=vd(e);return Nc.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function yd(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function wd(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var Di={placement:"bottom",modifiers:[],strategy:"absolute"};function ji(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function xd(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?Di:o;return function(a,l,d){d===void 0&&(d=i);var c={placement:"bottom",orderedModifiers:[],options:Object.assign({},Di,i),modifiersData:{},elements:{reference:a,popper:l},attributes:{},styles:{}},p=[],f=!1,g={state:c,setOptions:function(w){var _=typeof w=="function"?w(c.options):w;m(),c.options=Object.assign({},i,c.options,_),c.scrollParents={reference:Ot(a)?bn(a):a.contextElement?bn(a.contextElement):[],popper:bn(l)};var x=bd(wd([].concat(r,c.options.modifiers)));return c.orderedModifiers=x.filter(function(E){return E.enabled}),h(),g.update()},forceUpdate:function(){if(!f){var w=c.elements,_=w.reference,x=w.popper;if(ji(_,x)){c.rects={reference:hd(_,Nn(x),c.options.strategy==="fixed"),popper:Co(x)},c.reset=!1,c.placement=c.options.placement,c.orderedModifiers.forEach(function(B){return c.modifiersData[B.name]=Object.assign({},B.data)});for(var E=0;E<c.orderedModifiers.length;E++){if(c.reset===!0){c.reset=!1,E=-1;continue}var b=c.orderedModifiers[E],R=b.fn,P=b.options,j=P===void 0?{}:P,F=b.name;typeof R=="function"&&(c=R({state:c,options:j,name:F,instance:g})||c)}}}},update:yd(function(){return new Promise(function(v){g.forceUpdate(),v(c)})}),destroy:function(){m(),f=!0}};if(!ji(a,l))return g;g.setOptions(d).then(function(v){!f&&d.onFirstUpdate&&d.onFirstUpdate(v)});function h(){c.orderedModifiers.forEach(function(v){var w=v.name,_=v.options,x=_===void 0?{}:_,E=v.effect;if(typeof E=="function"){var b=E({state:c,name:w,instance:g,options:x}),R=function(){};p.push(b||R)}})}function m(){p.forEach(function(v){return v()}),p=[]}return g}}var Ed=[Uc,ud,Hc,$c,ad,nd,pd,Vc,od],Sd=xd({defaultModifiers:Ed});const ea="Popper";function Cd(e){return Gs(ea,e)}tc(ea,["root"]);const Rd=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],kd=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Td(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function er(e){return typeof e=="function"?e():e}function cr(e){return e.nodeType!==void 0}function Od(e){return!cr(e)}const Nd=()=>at({root:["root"]},Yu(Cd)),Pd={},_d=S.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:s,disablePortal:a,modifiers:l,open:d,placement:c,popperOptions:p,popperRef:f,slotProps:g={},slots:h={},TransitionProps:m}=t,v=fe(t,Rd),w=S.useRef(null),_=He(w,n),x=S.useRef(null),E=He(x,f),b=S.useRef(E);kt(()=>{b.current=E},[E]),S.useImperativeHandle(f,()=>x.current,[]);const R=Td(c,s),[P,j]=S.useState(R),[F,B]=S.useState(er(o));S.useEffect(()=>{x.current&&x.current.forceUpdate()}),S.useEffect(()=>{o&&B(er(o))},[o]),kt(()=>{if(!F||!d)return;const D=J=>{j(J.placement)};if(process.env.NODE_ENV!=="production"&&F&&cr(F)&&F.nodeType===1){const J=F.getBoundingClientRect();process.env.NODE_ENV!=="test"&&J.top===0&&J.left===0&&J.right===0&&J.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let A=[{name:"preventOverflow",options:{altBoundary:a}},{name:"flip",options:{altBoundary:a}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:J})=>{D(J)}}];l!=null&&(A=A.concat(l)),p&&p.modifiers!=null&&(A=A.concat(p.modifiers));const z=Sd(F,w.current,T({placement:R},p,{modifiers:A}));return b.current(z),()=>{z.destroy(),b.current(null)}},[F,a,l,d,p,R]);const N={placement:P};m!==null&&(N.TransitionProps=m);const C=Nd(),k=(r=h.root)!=null?r:"div",$=Tt({elementType:k,externalSlotProps:g.root,externalForwardedProps:v,additionalProps:{role:"tooltip",ref:_},ownerState:t,className:C.root});return y.jsx(k,T({},$,{children:typeof i=="function"?i(N):i}))}),ta=S.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:s="ltr",disablePortal:a=!1,keepMounted:l=!1,modifiers:d,open:c,placement:p="bottom",popperOptions:f=Pd,popperRef:g,style:h,transition:m=!1,slotProps:v={},slots:w={}}=t,_=fe(t,kd),[x,E]=S.useState(!0),b=()=>{E(!1)},R=()=>{E(!0)};if(!l&&!c&&(!m||x))return null;let P;if(i)P=i;else if(r){const B=er(r);P=B&&cr(B)?ke(B).body:ke(null).body}const j=!c&&l&&(!m||x)?"none":void 0,F=m?{in:c,onEnter:b,onExited:R}:void 0;return y.jsx(xn,{disablePortal:a,container:P,children:y.jsx(_d,T({anchorEl:r,direction:s,disablePortal:a,modifiers:d,ref:n,open:m?!x:c,placement:p,popperOptions:f,popperRef:g,slotProps:v,slots:w},_,{style:T({position:"fixed",top:0,left:0,display:j},h),TransitionProps:F,children:o}))})});process.env.NODE_ENV!=="production"&&(ta.propTypes={anchorEl:Kt(u.oneOfType([ot,u.object,u.func]),e=>{if(e.open){const t=er(e.anchorEl);if(t&&cr(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Od(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:u.oneOfType([u.node,u.func]),container:u.oneOfType([ot,u.func]),direction:u.oneOf(["ltr","rtl"]),disablePortal:u.bool,keepMounted:u.bool,modifiers:u.arrayOf(u.shape({data:u.object,effect:u.func,enabled:u.bool,fn:u.func,name:u.any,options:u.object,phase:u.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:u.arrayOf(u.string),requiresIfExists:u.arrayOf(u.string)})),open:u.bool.isRequired,placement:u.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:u.shape({modifiers:u.array,onFirstUpdate:u.func,placement:u.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:u.oneOf(["absolute","fixed"])}),popperRef:xo,slotProps:u.shape({root:u.oneOfType([u.func,u.object])}),slots:u.shape({root:u.elementType}),transition:u.bool});const $d=["values","unit","step"],Md=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>T({},n,{[r.key]:r.val}),{})};function Id(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=fe(e,$d),i=Md(t),s=Object.keys(i);function a(f){return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n})`}function l(f){return`@media (max-width:${(typeof t[f]=="number"?t[f]:f)-r/100}${n})`}function d(f,g){const h=s.indexOf(g);return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n}) and (max-width:${(h!==-1&&typeof t[s[h]]=="number"?t[s[h]]:g)-r/100}${n})`}function c(f){return s.indexOf(f)+1<s.length?d(f,s[s.indexOf(f)+1]):a(f)}function p(f){const g=s.indexOf(f);return g===0?a(s[1]):g===s.length-1?l(s[g]):d(f,s[s.indexOf(f)+1]).replace("@media","@media not all and")}return T({keys:s,values:i,up:a,down:l,between:d,only:c,not:p,unit:n},o)}const Ad={borderRadius:4},Dd=Ad,jd=process.env.NODE_ENV!=="production"?u.oneOfType([u.number,u.string,u.object,u.array]):{},ht=jd;function yn(e,t){return t?rt(e,t,{clone:!1}):e}const No={xs:0,sm:600,md:900,lg:1200,xl:1536},Fi={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${No[e]}px)`};function st(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||Fi;return t.reduce((s,a,l)=>(s[i.up(i.keys[l])]=n(t[l]),s),{})}if(typeof t=="object"){const i=r.breakpoints||Fi;return Object.keys(t).reduce((s,a)=>{if(Object.keys(i.values||No).indexOf(a)!==-1){const l=i.up(a);s[l]=n(t[a],a)}else{const l=a;s[l]=t[l]}return s},{})}return n(t)}function Fd(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function Vd(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function dr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function tr(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=dr(e,n)||r,t&&(o=t(o,r,e)),o}function xe(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=s=>{if(s[t]==null)return null;const a=s[t],l=s.theme,d=dr(l,r)||{};return st(s,a,p=>{let f=tr(d,o,p);return p===f&&typeof p=="string"&&(f=tr(d,o,`${t}${p==="default"?"":Ke(p)}`,p)),n===!1?f:{[n]:f}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:ht}:{},i.filterProps=[t],i}function Ld(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const Bd={m:"margin",p:"padding"},zd={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Vi={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Hd=Ld(e=>{if(e.length>2)if(Vi[e])e=Vi[e];else return[e];const[t,n]=e.split(""),r=Bd[t],o=zd[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),pr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],fr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Gd=[...pr,...fr];function Pn(e,t,n,r){var o;const i=(o=dr(e,t,!1))!=null?o:n;return typeof i=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),i*s):Array.isArray(i)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>i.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${s} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[s]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function na(e){return Pn(e,"spacing",8,"spacing")}function _n(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Ud(e,t){return n=>e.reduce((r,o)=>(r[o]=_n(t,n),r),{})}function qd(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=Hd(n),i=Ud(o,r),s=e[n];return st(e,s,i)}function ra(e,t){const n=na(e.theme);return Object.keys(e).map(r=>qd(e,t,r,n)).reduce(yn,{})}function ve(e){return ra(e,pr)}ve.propTypes=process.env.NODE_ENV!=="production"?pr.reduce((e,t)=>(e[t]=ht,e),{}):{};ve.filterProps=pr;function be(e){return ra(e,fr)}be.propTypes=process.env.NODE_ENV!=="production"?fr.reduce((e,t)=>(e[t]=ht,e),{}):{};be.filterProps=fr;process.env.NODE_ENV!=="production"&&Gd.reduce((e,t)=>(e[t]=ht,e),{});function Wd(e=8){if(e.mui)return e;const t=na({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const s=t(i);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function gr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?yn(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Be(e){return typeof e!="number"?e:`${e}px solid`}function qe(e,t){return xe({prop:e,themeKey:"borders",transform:t})}const Xd=qe("border",Be),Yd=qe("borderTop",Be),Kd=qe("borderRight",Be),Jd=qe("borderBottom",Be),Zd=qe("borderLeft",Be),Qd=qe("borderColor"),ep=qe("borderTopColor"),tp=qe("borderRightColor"),np=qe("borderBottomColor"),rp=qe("borderLeftColor"),op=qe("outline",Be),ip=qe("outlineColor"),mr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Pn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:_n(t,r)});return st(e,e.borderRadius,n)}return null};mr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:ht}:{};mr.filterProps=["borderRadius"];gr(Xd,Yd,Kd,Jd,Zd,Qd,ep,tp,np,rp,mr,op,ip);const hr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Pn(e.theme,"spacing",8,"gap"),n=r=>({gap:_n(t,r)});return st(e,e.gap,n)}return null};hr.propTypes=process.env.NODE_ENV!=="production"?{gap:ht}:{};hr.filterProps=["gap"];const vr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Pn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:_n(t,r)});return st(e,e.columnGap,n)}return null};vr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:ht}:{};vr.filterProps=["columnGap"];const br=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Pn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:_n(t,r)});return st(e,e.rowGap,n)}return null};br.propTypes=process.env.NODE_ENV!=="production"?{rowGap:ht}:{};br.filterProps=["rowGap"];const sp=xe({prop:"gridColumn"}),ap=xe({prop:"gridRow"}),lp=xe({prop:"gridAutoFlow"}),up=xe({prop:"gridAutoColumns"}),cp=xe({prop:"gridAutoRows"}),dp=xe({prop:"gridTemplateColumns"}),pp=xe({prop:"gridTemplateRows"}),fp=xe({prop:"gridTemplateAreas"}),gp=xe({prop:"gridArea"});gr(hr,vr,br,sp,ap,lp,up,cp,dp,pp,fp,gp);function Bt(e,t){return t==="grey"?t:e}const mp=xe({prop:"color",themeKey:"palette",transform:Bt}),hp=xe({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Bt}),vp=xe({prop:"backgroundColor",themeKey:"palette",transform:Bt});gr(mp,hp,vp);function je(e){return e<=1&&e!==0?`${e*100}%`:e}const bp=xe({prop:"width",transform:je}),Po=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||No[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:je(n)}};return st(e,e.maxWidth,t)}return null};Po.filterProps=["maxWidth"];const yp=xe({prop:"minWidth",transform:je}),wp=xe({prop:"height",transform:je}),xp=xe({prop:"maxHeight",transform:je}),Ep=xe({prop:"minHeight",transform:je});xe({prop:"size",cssProperty:"width",transform:je});xe({prop:"size",cssProperty:"height",transform:je});const Sp=xe({prop:"boxSizing"});gr(bp,Po,yp,wp,xp,Ep,Sp);const Cp={border:{themeKey:"borders",transform:Be},borderTop:{themeKey:"borders",transform:Be},borderRight:{themeKey:"borders",transform:Be},borderBottom:{themeKey:"borders",transform:Be},borderLeft:{themeKey:"borders",transform:Be},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Be},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:mr},color:{themeKey:"palette",transform:Bt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Bt},backgroundColor:{themeKey:"palette",transform:Bt},p:{style:be},pt:{style:be},pr:{style:be},pb:{style:be},pl:{style:be},px:{style:be},py:{style:be},padding:{style:be},paddingTop:{style:be},paddingRight:{style:be},paddingBottom:{style:be},paddingLeft:{style:be},paddingX:{style:be},paddingY:{style:be},paddingInline:{style:be},paddingInlineStart:{style:be},paddingInlineEnd:{style:be},paddingBlock:{style:be},paddingBlockStart:{style:be},paddingBlockEnd:{style:be},m:{style:ve},mt:{style:ve},mr:{style:ve},mb:{style:ve},ml:{style:ve},mx:{style:ve},my:{style:ve},margin:{style:ve},marginTop:{style:ve},marginRight:{style:ve},marginBottom:{style:ve},marginLeft:{style:ve},marginX:{style:ve},marginY:{style:ve},marginInline:{style:ve},marginInlineStart:{style:ve},marginInlineEnd:{style:ve},marginBlock:{style:ve},marginBlockStart:{style:ve},marginBlockEnd:{style:ve},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:hr},rowGap:{style:br},columnGap:{style:vr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:je},maxWidth:{style:Po},minWidth:{transform:je},height:{transform:je},maxHeight:{transform:je},minHeight:{transform:je},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},_o=Cp;function Rp(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function kp(e,t){return typeof e=="function"?e(t):e}function Tp(){function e(n,r,o,i){const s={[n]:r,theme:o},a=i[n];if(!a)return{[n]:r};const{cssProperty:l=n,themeKey:d,transform:c,style:p}=a;if(r==null)return null;if(d==="typography"&&r==="inherit")return{[n]:r};const f=dr(o,d)||{};return p?p(s):st(s,r,h=>{let m=tr(f,c,h);return h===m&&typeof h=="string"&&(m=tr(f,c,`${n}${h==="default"?"":Ke(h)}`,h)),l===!1?m:{[l]:m}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const s=(r=i.unstable_sxConfig)!=null?r:_o;function a(l){let d=l;if(typeof l=="function")d=l(i);else if(typeof l!="object")return l;if(!d)return null;const c=Fd(i.breakpoints),p=Object.keys(c);let f=c;return Object.keys(d).forEach(g=>{const h=kp(d[g],i);if(h!=null)if(typeof h=="object")if(s[g])f=yn(f,e(g,h,i,s));else{const m=st({theme:i},h,v=>({[g]:v}));Rp(m,h)?f[g]=t({sx:h,theme:i}):f=yn(f,m)}else f=yn(f,e(g,h,i,s))}),Vd(p,f)}return Array.isArray(o)?o.map(a):a(o)}return t}const oa=Tp();oa.filterProps=["sx"];const $o=oa;function Op(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Np=["breakpoints","palette","spacing","shape"];function Mo(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,s=fe(e,Np),a=Id(n),l=Wd(o);let d=rt({breakpoints:a,direction:"ltr",components:{},palette:T({mode:"light"},r),spacing:l,shape:T({},Dd,i)},s);return d.applyStyles=Op,d=t.reduce((c,p)=>rt(c,p),d),d.unstable_sxConfig=T({},_o,s==null?void 0:s.unstable_sxConfig),d.unstable_sx=function(p){return $o({sx:p,theme:this})},d}function Pp(e){return Object.keys(e).length===0}function ia(e=null){const t=S.useContext(Xr.ThemeContext);return!t||Pp(t)?e:t}const _p=Mo();function sa(e=_p){return ia(e)}const $p=["ownerState"],Mp=["variants"],Ip=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Ap(e){return Object.keys(e).length===0}function Dp(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Un(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const jp=Mo(),Li=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Fn({defaultTheme:e,theme:t,themeId:n}){return Ap(t)?e:t[n]||t}function Fp(e){return e?(t,n)=>n[e]:null}function qn(e,t){let{ownerState:n}=t,r=fe(t,$p);const o=typeof e=="function"?e(T({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>qn(i,T({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let a=fe(o,Mp);return i.forEach(l=>{let d=!0;typeof l.props=="function"?d=l.props(T({ownerState:n},r,n)):Object.keys(l.props).forEach(c=>{(n==null?void 0:n[c])!==l.props[c]&&r[c]!==l.props[c]&&(d=!1)}),d&&(Array.isArray(a)||(a=[a]),a.push(typeof l.style=="function"?l.style(T({ownerState:n},r,n)):l.style))}),a}return o}function Vp(e={}){const{themeId:t,defaultTheme:n=jp,rootShouldForwardProp:r=Un,slotShouldForwardProp:o=Un}=e,i=s=>$o(T({},s,{theme:Fn(T({},s,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(s,a={})=>{Xr.internal_processStyles(s,b=>b.filter(R=>!(R!=null&&R.__mui_systemSx)));const{name:l,slot:d,skipVariantsResolver:c,skipSx:p,overridesResolver:f=Fp(Li(d))}=a,g=fe(a,Ip),h=c!==void 0?c:d&&d!=="Root"&&d!=="root"||!1,m=p||!1;let v;process.env.NODE_ENV!=="production"&&l&&(v=`${l}-${Li(d||"Root")}`);let w=Un;d==="Root"||d==="root"?w=r:d?w=o:Dp(s)&&(w=void 0);const _=Xr(s,T({shouldForwardProp:w,label:v},g)),x=b=>typeof b=="function"&&b.__emotion_real!==b||St(b)?R=>qn(b,T({},R,{theme:Fn({theme:R.theme,defaultTheme:n,themeId:t})})):b,E=(b,...R)=>{let P=x(b);const j=R?R.map(x):[];l&&f&&j.push(N=>{const C=Fn(T({},N,{defaultTheme:n,themeId:t}));if(!C.components||!C.components[l]||!C.components[l].styleOverrides)return null;const k=C.components[l].styleOverrides,$={};return Object.entries(k).forEach(([D,A])=>{$[D]=qn(A,T({},N,{theme:C}))}),f(N,$)}),l&&!h&&j.push(N=>{var C;const k=Fn(T({},N,{defaultTheme:n,themeId:t})),$=k==null||(C=k.components)==null||(C=C[l])==null?void 0:C.variants;return qn({variants:$},T({},N,{theme:k}))}),m||j.push(i);const F=j.length-R.length;if(Array.isArray(b)&&F>0){const N=new Array(F).fill("");P=[...b,...N],P.raw=[...b.raw,...N]}const B=_(P,...j);if(process.env.NODE_ENV!=="production"){let N;l&&(N=`${l}${Ke(d||"")}`),N===void 0&&(N=`Styled(${Su(s)})`),B.displayName=N}return s.muiName&&(B.muiName=s.muiName),B};return _.withConfig&&(E.withConfig=_.withConfig),E}}function Lp(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:Fs(t.components[n].defaultProps,r)}function Bp({props:e,name:t,defaultTheme:n,themeId:r}){let o=sa(n);return r&&(o=o[r]||o),Lp({theme:o,name:t,props:e})}function Io(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),qu(e,t,n)}function zp(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Nt(e){if(e.type)return e;if(e.charAt(0)==="#")return Nt(zp(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:zt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:zt(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function yr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function Hp(e){e=Nt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),s=(d,c=(d+n/30)%12)=>o-i*Math.max(Math.min(c-3,9-c,1),-1);let a="rgb";const l=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(a+="a",l.push(t[3])),yr({type:a,values:l})}function Bi(e){e=Nt(e);let t=e.type==="hsl"||e.type==="hsla"?Nt(Hp(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function zi(e,t){const n=Bi(e),r=Bi(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function nr(e,t){return e=Nt(e),t=Io(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,yr(e)}function Gp(e,t){if(e=Nt(e),t=Io(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return yr(e)}function Up(e,t){if(e=Nt(e),t=Io(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return yr(e)}function qp(e,t){return T({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const Wp={black:"#000",white:"#fff"},Cn=Wp,Xp={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Yp=Xp,Kp={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},$t=Kp,Jp={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Mt=Jp,Zp={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},sn=Zp,Qp={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},It=Qp,ef={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},At=ef,tf={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Dt=tf,nf=["mode","contrastThreshold","tonalOffset"],Hi={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Cn.white,default:Cn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Mr={text:{primary:Cn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Cn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Gi(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=Up(e.main,o):t==="dark"&&(e.dark=Gp(e.main,i)))}function rf(e="light"){return e==="dark"?{main:It[200],light:It[50],dark:It[400]}:{main:It[700],light:It[400],dark:It[800]}}function of(e="light"){return e==="dark"?{main:$t[200],light:$t[50],dark:$t[400]}:{main:$t[500],light:$t[300],dark:$t[700]}}function sf(e="light"){return e==="dark"?{main:Mt[500],light:Mt[300],dark:Mt[700]}:{main:Mt[700],light:Mt[400],dark:Mt[800]}}function af(e="light"){return e==="dark"?{main:At[400],light:At[300],dark:At[700]}:{main:At[700],light:At[500],dark:At[900]}}function lf(e="light"){return e==="dark"?{main:Dt[400],light:Dt[300],dark:Dt[700]}:{main:Dt[800],light:Dt[500],dark:Dt[900]}}function uf(e="light"){return e==="dark"?{main:sn[400],light:sn[300],dark:sn[700]}:{main:"#ed6c02",light:sn[500],dark:sn[900]}}function cf(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=fe(e,nf),i=e.primary||rf(t),s=e.secondary||of(t),a=e.error||sf(t),l=e.info||af(t),d=e.success||lf(t),c=e.warning||uf(t);function p(m){const v=zi(m,Mr.text.primary)>=n?Mr.text.primary:Hi.text.primary;if(process.env.NODE_ENV!=="production"){const w=zi(m,v);w<3&&console.error([`MUI: The contrast ratio of ${w}:1 for ${v} on ${m}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return v}const f=({color:m,name:v,mainShade:w=500,lightShade:_=300,darkShade:x=700})=>{if(m=T({},m),!m.main&&m[w]&&(m.main=m[w]),!m.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${v?` (${v})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${w}\` property.`:zt(11,v?` (${v})`:"",w));if(typeof m.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${v?` (${v})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:zt(12,v?` (${v})`:"",JSON.stringify(m.main)));return Gi(m,"light",_,r),Gi(m,"dark",x,r),m.contrastText||(m.contrastText=p(m.main)),m},g={dark:Mr,light:Hi};return process.env.NODE_ENV!=="production"&&(g[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),rt(T({common:T({},Cn),mode:t,primary:f({color:i,name:"primary"}),secondary:f({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:f({color:a,name:"error"}),warning:f({color:c,name:"warning"}),info:f({color:l,name:"info"}),success:f({color:d,name:"success"}),grey:Yp,contrastThreshold:n,getContrastText:p,augmentColor:f,tonalOffset:r},g[t]),o)}const df=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function pf(e){return Math.round(e*1e5)/1e5}const Ui={textTransform:"uppercase"},qi='"Roboto", "Helvetica", "Arial", sans-serif';function ff(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=qi,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:s=400,fontWeightMedium:a=500,fontWeightBold:l=700,htmlFontSize:d=16,allVariants:c,pxToRem:p}=n,f=fe(n,df);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof d!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const g=o/14,h=p||(w=>`${w/d*g}rem`),m=(w,_,x,E,b)=>T({fontFamily:r,fontWeight:w,fontSize:h(_),lineHeight:x},r===qi?{letterSpacing:`${pf(E/_)}em`}:{},b,c),v={h1:m(i,96,1.167,-1.5),h2:m(i,60,1.2,-.5),h3:m(s,48,1.167,0),h4:m(s,34,1.235,.25),h5:m(s,24,1.334,0),h6:m(a,20,1.6,.15),subtitle1:m(s,16,1.75,.15),subtitle2:m(a,14,1.57,.1),body1:m(s,16,1.5,.15),body2:m(s,14,1.43,.15),button:m(a,14,1.75,.4,Ui),caption:m(s,12,1.66,.4),overline:m(s,12,2.66,1,Ui),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return rt(T({htmlFontSize:d,pxToRem:h,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:s,fontWeightMedium:a,fontWeightBold:l},v),f,{clone:!1})}const gf=.2,mf=.14,hf=.12;function me(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${gf})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${mf})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${hf})`].join(",")}const vf=["none",me(0,2,1,-1,0,1,1,0,0,1,3,0),me(0,3,1,-2,0,2,2,0,0,1,5,0),me(0,3,3,-2,0,3,4,0,0,1,8,0),me(0,2,4,-1,0,4,5,0,0,1,10,0),me(0,3,5,-1,0,5,8,0,0,1,14,0),me(0,3,5,-1,0,6,10,0,0,1,18,0),me(0,4,5,-2,0,7,10,1,0,2,16,1),me(0,5,5,-3,0,8,10,1,0,3,14,2),me(0,5,6,-3,0,9,12,1,0,3,16,2),me(0,6,6,-3,0,10,14,1,0,4,18,3),me(0,6,7,-4,0,11,15,1,0,4,20,3),me(0,7,8,-4,0,12,17,2,0,5,22,4),me(0,7,8,-4,0,13,19,2,0,5,24,4),me(0,7,9,-4,0,14,21,2,0,5,26,4),me(0,8,9,-5,0,15,22,2,0,6,28,5),me(0,8,10,-5,0,16,24,2,0,6,30,5),me(0,8,11,-5,0,17,26,2,0,6,32,5),me(0,9,11,-5,0,18,28,2,0,7,34,6),me(0,9,12,-6,0,19,29,2,0,7,36,6),me(0,10,13,-6,0,20,31,3,0,8,38,7),me(0,10,13,-6,0,21,33,3,0,8,40,7),me(0,10,14,-6,0,22,35,3,0,8,42,7),me(0,11,14,-7,0,23,36,3,0,9,44,8),me(0,11,15,-7,0,24,38,3,0,9,46,8)],bf=vf,yf=["duration","easing","delay"],wf={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},xf={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Wi(e){return`${Math.round(e)}ms`}function Ef(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Sf(e){const t=T({},wf,e.easing),n=T({},xf,e.duration);return T({getAutoHeightDuration:Ef,create:(o=["all"],i={})=>{const{duration:s=n.standard,easing:a=t.easeInOut,delay:l=0}=i,d=fe(i,yf);if(process.env.NODE_ENV!=="production"){const c=f=>typeof f=="string",p=f=>!isNaN(parseFloat(f));!c(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!p(s)&&!c(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),c(a)||console.error('MUI: Argument "easing" must be a string.'),!p(l)&&!c(l)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(d).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(c=>`${c} ${typeof s=="string"?s:Wi(s)} ${a} ${typeof l=="string"?l:Wi(l)}`).join(",")}},e,{easing:t,duration:n})}const Cf={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Rf=Cf,kf=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Tf(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,s=fe(e,kf);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":zt(18));const a=cf(r),l=Mo(e);let d=rt(l,{mixins:qp(l.breakpoints,n),palette:a,shadows:bf.slice(),typography:ff(a,i),transitions:Sf(o),zIndex:T({},Rf)});if(d=rt(d,s),d=t.reduce((c,p)=>rt(c,p),d),process.env.NODE_ENV!=="production"){const c=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],p=(f,g)=>{let h;for(h in f){const m=f[h];if(c.indexOf(h)!==-1&&Object.keys(m).length>0){if(process.env.NODE_ENV!=="production"){const v=Ze("",h);console.error([`MUI: The \`${g}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(f,null,2),"",`Instead, you need to use the '&.${v}' syntax:`,JSON.stringify({root:{[`&.${v}`]:m}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}f[h]={}}}};Object.keys(d.components).forEach(f=>{const g=d.components[f].styleOverrides;g&&f.indexOf("Mui")===0&&p(g,f)})}return d.unstable_sxConfig=T({},_o,s==null?void 0:s.unstable_sxConfig),d.unstable_sx=function(p){return $o({sx:p,theme:this})},d}const Of=Tf(),Ao=Of,Do="$$material",aa=e=>Un(e)&&e!=="classes",Nf=Vp({themeId:Do,defaultTheme:Ao,rootShouldForwardProp:aa}),Te=Nf;function $n(){const e=sa(Ao);return process.env.NODE_ENV!=="production"&&S.useDebugValue(e),e[Do]||e}function lt({props:e,name:t}){return Bp({props:e,name:t,defaultTheme:Ao,themeId:Do})}function no(e,t){return no=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},no(e,t)}function Pf(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,no(e,t)}const Xi={disabled:!1};var _f=process.env.NODE_ENV!=="production"?u.oneOfType([u.number,u.shape({enter:u.number,exit:u.number,appear:u.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&u.oneOfType([u.string,u.shape({enter:u.string,exit:u.string,active:u.string}),u.shape({enter:u.string,enterDone:u.string,enterActive:u.string,exit:u.string,exitDone:u.string,exitActive:u.string})]);const la=I.createContext(null);var $f=function(t){return t.scrollTop},fn="unmounted",wt="exited",xt="entering",Vt="entered",ro="exiting",ut=function(e){Pf(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var s=o,a=s&&!s.isMounting?r.enter:r.appear,l;return i.appearStatus=null,r.in?a?(l=wt,i.appearStatus=xt):l=Vt:r.unmountOnExit||r.mountOnEnter?l=fn:l=wt,i.state={status:l},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var s=o.in;return s&&i.status===fn?{status:wt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==xt&&s!==Vt&&(i=xt):(s===xt||s===Vt)&&(i=ro)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,s,a;return i=s=a=o,o!=null&&typeof o!="number"&&(i=o.exit,s=o.enter,a=o.appear!==void 0?o.appear:s),{exit:i,enter:s,appear:a}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===xt){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:cn.findDOMNode(this);s&&$f(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===wt&&this.setState({status:fn})},n.performEnter=function(o){var i=this,s=this.props.enter,a=this.context?this.context.isMounting:o,l=this.props.nodeRef?[a]:[cn.findDOMNode(this),a],d=l[0],c=l[1],p=this.getTimeouts(),f=a?p.appear:p.enter;if(!o&&!s||Xi.disabled){this.safeSetState({status:Vt},function(){i.props.onEntered(d)});return}this.props.onEnter(d,c),this.safeSetState({status:xt},function(){i.props.onEntering(d,c),i.onTransitionEnd(f,function(){i.safeSetState({status:Vt},function(){i.props.onEntered(d,c)})})})},n.performExit=function(){var o=this,i=this.props.exit,s=this.getTimeouts(),a=this.props.nodeRef?void 0:cn.findDOMNode(this);if(!i||Xi.disabled){this.safeSetState({status:wt},function(){o.props.onExited(a)});return}this.props.onExit(a),this.safeSetState({status:ro},function(){o.props.onExiting(a),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:wt},function(){o.props.onExited(a)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,s=!0;return this.nextCallback=function(a){s&&(s=!1,i.nextCallback=null,o(a))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var s=this.props.nodeRef?this.props.nodeRef.current:cn.findDOMNode(this),a=o==null&&!this.props.addEndListener;if(!s||a){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var l=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],d=l[0],c=l[1];this.props.addEndListener(d,c)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===fn)return null;var i=this.props,s=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var a=fe(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return I.createElement(la.Provider,{value:null},typeof s=="function"?s(o,a):I.cloneElement(I.Children.only(s),a))},t}(I.Component);ut.contextType=la;ut.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:u.shape({current:typeof Element>"u"?u.any:function(e,t,n,r,o,i){var s=e[t];return u.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:u.oneOfType([u.func.isRequired,u.element.isRequired]).isRequired,in:u.bool,mountOnEnter:u.bool,unmountOnExit:u.bool,appear:u.bool,enter:u.bool,exit:u.bool,timeout:function(t){var n=_f;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:u.func,onEnter:u.func,onEntering:u.func,onEntered:u.func,onExit:u.func,onExiting:u.func,onExited:u.func}:{};function jt(){}ut.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:jt,onEntering:jt,onEntered:jt,onExit:jt,onExiting:jt,onExited:jt};ut.UNMOUNTED=fn;ut.EXITED=wt;ut.ENTERING=xt;ut.ENTERED=Vt;ut.EXITING=ro;const ua=ut,ca=e=>e.scrollTop;function rr(e,t){var n,r;const{timeout:o,easing:i,style:s={}}=e;return{duration:(n=s.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:s.transitionDelay}}const Mf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function oo(e){return`scale(${e}, ${e**2})`}const If={entering:{opacity:1,transform:oo(1)},entered:{opacity:1,transform:"none"}},Ir=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),jo=S.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:s,in:a,onEnter:l,onEntered:d,onEntering:c,onExit:p,onExited:f,onExiting:g,style:h,timeout:m="auto",TransitionComponent:v=ua}=t,w=fe(t,Mf),_=dn(),x=S.useRef(),E=$n(),b=S.useRef(null),R=He(b,i.ref,n),P=D=>A=>{if(D){const z=b.current;A===void 0?D(z):D(z,A)}},j=P(c),F=P((D,A)=>{ca(D);const{duration:z,delay:J,easing:Q}=rr({style:h,timeout:m,easing:s},{mode:"enter"});let O;m==="auto"?(O=E.transitions.getAutoHeightDuration(D.clientHeight),x.current=O):O=z,D.style.transition=[E.transitions.create("opacity",{duration:O,delay:J}),E.transitions.create("transform",{duration:Ir?O:O*.666,delay:J,easing:Q})].join(","),l&&l(D,A)}),B=P(d),N=P(g),C=P(D=>{const{duration:A,delay:z,easing:J}=rr({style:h,timeout:m,easing:s},{mode:"exit"});let Q;m==="auto"?(Q=E.transitions.getAutoHeightDuration(D.clientHeight),x.current=Q):Q=A,D.style.transition=[E.transitions.create("opacity",{duration:Q,delay:z}),E.transitions.create("transform",{duration:Ir?Q:Q*.666,delay:Ir?z:z||Q*.333,easing:J})].join(","),D.style.opacity=0,D.style.transform=oo(.75),p&&p(D)}),k=P(f),$=D=>{m==="auto"&&_.start(x.current||0,D),r&&r(b.current,D)};return y.jsx(v,T({appear:o,in:a,nodeRef:b,onEnter:F,onEntered:B,onEntering:j,onExit:C,onExited:k,onExiting:N,addEndListener:$,timeout:m==="auto"?null:m},w,{children:(D,A)=>S.cloneElement(i,T({style:T({opacity:0,transform:oo(.75),visibility:D==="exited"&&!a?"hidden":void 0},If[D],h,i.props.style),ref:R},A))}))});process.env.NODE_ENV!=="production"&&(jo.propTypes={addEndListener:u.func,appear:u.bool,children:kn.isRequired,easing:u.oneOfType([u.shape({enter:u.string,exit:u.string}),u.string]),in:u.bool,onEnter:u.func,onEntered:u.func,onEntering:u.func,onExit:u.func,onExited:u.func,onExiting:u.func,style:u.object,timeout:u.oneOfType([u.oneOf(["auto"]),u.number,u.shape({appear:u.number,enter:u.number,exit:u.number})])});jo.muiSupportAuto=!0;const io=jo,Af=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},Yi=Af,Df=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],jf=Te(ta,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),da=S.forwardRef(function(t,n){var r;const o=ia(),i=lt({props:t,name:"MuiPopper"}),{anchorEl:s,component:a,components:l,componentsProps:d,container:c,disablePortal:p,keepMounted:f,modifiers:g,open:h,placement:m,popperOptions:v,popperRef:w,transition:_,slots:x,slotProps:E}=i,b=fe(i,Df),R=(r=x==null?void 0:x.root)!=null?r:l==null?void 0:l.Root,P=T({anchorEl:s,container:c,disablePortal:p,keepMounted:f,modifiers:g,open:h,placement:m,popperOptions:v,popperRef:w,transition:_},b);return y.jsx(jf,T({as:a,direction:o==null?void 0:o.direction,slots:{root:R},slotProps:E??d},P,{ref:n}))});process.env.NODE_ENV!=="production"&&(da.propTypes={anchorEl:u.oneOfType([ot,u.object,u.func]),children:u.oneOfType([u.node,u.func]),component:u.elementType,components:u.shape({Root:u.elementType}),componentsProps:u.shape({root:u.oneOfType([u.func,u.object])}),container:u.oneOfType([ot,u.func]),disablePortal:u.bool,keepMounted:u.bool,modifiers:u.arrayOf(u.shape({data:u.object,effect:u.func,enabled:u.bool,fn:u.func,name:u.any,options:u.object,phase:u.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:u.arrayOf(u.string),requiresIfExists:u.arrayOf(u.string)})),open:u.bool.isRequired,placement:u.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:u.shape({modifiers:u.array,onFirstUpdate:u.func,placement:u.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:u.oneOf(["absolute","fixed"])}),popperRef:xo,slotProps:u.shape({root:u.oneOfType([u.func,u.object])}),slots:u.shape({root:u.elementType}),sx:u.oneOfType([u.arrayOf(u.oneOfType([u.func,u.object,u.bool])),u.func,u.object]),transition:u.bool});const pa=da;function Ff(e){return Ze("MuiTooltip",e)}const Vf=gt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),dt=Vf,Lf=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Bf(e){return Math.round(e*1e5)/1e5}const zf=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,s={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Ke(i.split("-")[0])}`],arrow:["arrow"]};return at(s,Ff,t)},Hf=Te(pa,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>T({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${dt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${dt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${dt.arrow}`]:T({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${dt.arrow}`]:T({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Gf=Te("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Ke(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>T({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:nr(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Bf(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${dt.popper}[data-popper-placement*="left"] &`]:T({transformOrigin:"right center"},t.isRtl?T({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):T({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${dt.popper}[data-popper-placement*="right"] &`]:T({transformOrigin:"left center"},t.isRtl?T({marginRight:"14px"},t.touch&&{marginRight:"24px"}):T({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${dt.popper}[data-popper-placement*="top"] &`]:T({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${dt.popper}[data-popper-placement*="bottom"] &`]:T({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Uf=Te("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:nr(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Vn=!1;const Ki=new Tn;let an={x:0,y:0};function Ln(e,t){return n=>{t&&t(n),e(n)}}const fa=S.forwardRef(function(t,n){var r,o,i,s,a,l,d,c,p,f,g,h,m,v,w,_,x,E,b;const R=lt({props:t,name:"MuiTooltip"}),{arrow:P=!1,children:j,components:F={},componentsProps:B={},describeChild:N=!1,disableFocusListener:C=!1,disableHoverListener:k=!1,disableInteractive:$=!1,disableTouchListener:D=!1,enterDelay:A=100,enterNextDelay:z=0,enterTouchDelay:J=700,followCursor:Q=!1,id:O,leaveDelay:L=0,leaveTouchDelay:G=1500,onClose:Y,onOpen:H,open:U,placement:W="bottom",PopperComponent:X,PopperProps:q={},slotProps:K={},slots:Z={},title:ie,TransitionComponent:V=io,TransitionProps:ee}=R,M=fe(R,Lf),se=S.isValidElement(j)?j:y.jsx("span",{children:j}),Ee=$n(),Oe=Ee.direction==="rtl",[we,vt]=S.useState(),[Ne,Qe]=S.useState(null),Ie=S.useRef(!1),et=$||Q,Se=dn(),Pt=dn(),bt=dn(),Jt=dn(),[Mn,qo]=$s({controlled:U,default:!1,name:"Tooltip",state:"open"});let tt=Mn;if(process.env.NODE_ENV!=="production"){const{current:re}=S.useRef(U!==void 0);S.useEffect(()=>{we&&we.disabled&&!re&&ie!==""&&we.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ie,we,re])}const wr=_s(O),Zt=S.useRef(),In=wn(()=>{Zt.current!==void 0&&(document.body.style.WebkitUserSelect=Zt.current,Zt.current=void 0),Jt.clear()});S.useEffect(()=>In,[In]);const Wo=re=>{Ki.clear(),Vn=!0,qo(!0),H&&!tt&&H(re)},An=wn(re=>{Ki.start(800+L,()=>{Vn=!1}),qo(!1),Y&&tt&&Y(re),Se.start(Ee.transitions.duration.shortest,()=>{Ie.current=!1})}),xr=re=>{Ie.current&&re.type!=="touchstart"||(we&&we.removeAttribute("title"),Pt.clear(),bt.clear(),A||Vn&&z?Pt.start(Vn?z:A,()=>{Wo(re)}):Wo(re))},Xo=re=>{Pt.clear(),bt.start(L,()=>{An(re)})},{isFocusVisibleRef:Yo,onBlur:il,onFocus:sl,ref:al}=Ms(),[,Ko]=S.useState(!1),Jo=re=>{il(re),Yo.current===!1&&(Ko(!1),Xo(re))},Zo=re=>{we||vt(re.currentTarget),sl(re),Yo.current===!0&&(Ko(!0),xr(re))},Qo=re=>{Ie.current=!0;const Ae=se.props;Ae.onTouchStart&&Ae.onTouchStart(re)},ei=xr,ti=Xo,ll=re=>{Qo(re),bt.clear(),Se.clear(),In(),Zt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Jt.start(J,()=>{document.body.style.WebkitUserSelect=Zt.current,xr(re)})},ul=re=>{se.props.onTouchEnd&&se.props.onTouchEnd(re),In(),bt.start(G,()=>{An(re)})};S.useEffect(()=>{if(!tt)return;function re(Ae){(Ae.key==="Escape"||Ae.key==="Esc")&&An(Ae)}return document.addEventListener("keydown",re),()=>{document.removeEventListener("keydown",re)}},[An,tt]);const cl=He(se.ref,al,vt,n);!ie&&ie!==0&&(tt=!1);const Er=S.useRef(),dl=re=>{const Ae=se.props;Ae.onMouseMove&&Ae.onMouseMove(re),an={x:re.clientX,y:re.clientY},Er.current&&Er.current.update()},Qt={},Sr=typeof ie=="string";N?(Qt.title=!tt&&Sr&&!k?ie:null,Qt["aria-describedby"]=tt?wr:null):(Qt["aria-label"]=Sr?ie:null,Qt["aria-labelledby"]=tt&&!Sr?wr:null);const Le=T({},Qt,M,se.props,{className:Re(M.className,se.props.className),onTouchStart:Qo,ref:cl},Q?{onMouseMove:dl}:{});process.env.NODE_ENV!=="production"&&(Le["data-mui-internal-clone-element"]=!0,S.useEffect(()=>{we&&!we.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[we]));const en={};D||(Le.onTouchStart=ll,Le.onTouchEnd=ul),k||(Le.onMouseOver=Ln(ei,Le.onMouseOver),Le.onMouseLeave=Ln(ti,Le.onMouseLeave),et||(en.onMouseOver=ei,en.onMouseLeave=ti)),C||(Le.onFocus=Ln(Zo,Le.onFocus),Le.onBlur=Ln(Jo,Le.onBlur),et||(en.onFocus=Zo,en.onBlur=Jo)),process.env.NODE_ENV!=="production"&&se.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));const pl=S.useMemo(()=>{var re;let Ae=[{name:"arrow",enabled:!!Ne,options:{element:Ne,padding:4}}];return(re=q.popperOptions)!=null&&re.modifiers&&(Ae=Ae.concat(q.popperOptions.modifiers)),T({},q.popperOptions,{modifiers:Ae})},[Ne,q]),tn=T({},R,{isRtl:Oe,arrow:P,disableInteractive:et,placement:W,PopperComponentProp:X,touch:Ie.current}),Cr=zf(tn),ni=(r=(o=Z.popper)!=null?o:F.Popper)!=null?r:Hf,ri=(i=(s=(a=Z.transition)!=null?a:F.Transition)!=null?s:V)!=null?i:io,oi=(l=(d=Z.tooltip)!=null?d:F.Tooltip)!=null?l:Gf,ii=(c=(p=Z.arrow)!=null?p:F.Arrow)!=null?c:Uf,fl=pn(ni,T({},q,(f=K.popper)!=null?f:B.popper,{className:Re(Cr.popper,q==null?void 0:q.className,(g=(h=K.popper)!=null?h:B.popper)==null?void 0:g.className)}),tn),gl=pn(ri,T({},ee,(m=K.transition)!=null?m:B.transition),tn),ml=pn(oi,T({},(v=K.tooltip)!=null?v:B.tooltip,{className:Re(Cr.tooltip,(w=(_=K.tooltip)!=null?_:B.tooltip)==null?void 0:w.className)}),tn),hl=pn(ii,T({},(x=K.arrow)!=null?x:B.arrow,{className:Re(Cr.arrow,(E=(b=K.arrow)!=null?b:B.arrow)==null?void 0:E.className)}),tn);return y.jsxs(S.Fragment,{children:[S.cloneElement(se,Le),y.jsx(ni,T({as:X??pa,placement:W,anchorEl:Q?{getBoundingClientRect:()=>({top:an.y,left:an.x,right:an.x,bottom:an.y,width:0,height:0})}:we,popperRef:Er,open:we?tt:!1,id:wr,transition:!0},en,fl,{popperOptions:pl,children:({TransitionProps:re})=>y.jsx(ri,T({timeout:Ee.transitions.duration.shorter},re,gl,{children:y.jsxs(oi,T({},ml,{children:[ie,P?y.jsx(ii,T({},hl,{ref:Qe})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(fa.propTypes={arrow:u.bool,children:kn.isRequired,classes:u.object,className:u.string,components:u.shape({Arrow:u.elementType,Popper:u.elementType,Tooltip:u.elementType,Transition:u.elementType}),componentsProps:u.shape({arrow:u.object,popper:u.object,tooltip:u.object,transition:u.object}),describeChild:u.bool,disableFocusListener:u.bool,disableHoverListener:u.bool,disableInteractive:u.bool,disableTouchListener:u.bool,enterDelay:u.number,enterNextDelay:u.number,enterTouchDelay:u.number,followCursor:u.bool,id:u.string,leaveDelay:u.number,leaveTouchDelay:u.number,onClose:u.func,onOpen:u.func,open:u.bool,placement:u.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:u.elementType,PopperProps:u.object,slotProps:u.shape({arrow:u.object,popper:u.object,tooltip:u.object,transition:u.object}),slots:u.shape({arrow:u.elementType,popper:u.elementType,tooltip:u.elementType,transition:u.elementType}),sx:u.oneOfType([u.arrayOf(u.oneOfType([u.func,u.object,u.bool])),u.func,u.object]),title:u.node,TransitionComponent:u.elementType,TransitionProps:u.object});const qf=fa;var Fo={},ga={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(ga);var Wf=ga.exports,Ar={};function Xf(e){return Ze("MuiSvgIcon",e)}gt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Yf=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Kf=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Ke(t)}`,`fontSize${Ke(n)}`]};return at(o,Xf,r)},Jf=Te("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Ke(n.color)}`],t[`fontSize${Ke(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,s,a,l,d,c,p,f,g,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(s=i.pxToRem)==null?void 0:s.call(i,20))||"1.25rem",medium:((a=e.typography)==null||(l=a.pxToRem)==null?void 0:l.call(a,24))||"1.5rem",large:((d=e.typography)==null||(c=d.pxToRem)==null?void 0:c.call(d,35))||"2.1875rem"}[t.fontSize],color:(p=(f=(e.vars||e).palette)==null||(f=f[t.color])==null?void 0:f.main)!=null?p:{action:(g=(e.vars||e).palette)==null||(g=g.action)==null?void 0:g.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),Vo=S.forwardRef(function(t,n){const r=lt({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:s="inherit",component:a="svg",fontSize:l="medium",htmlColor:d,inheritViewBox:c=!1,titleAccess:p,viewBox:f="0 0 24 24"}=r,g=fe(r,Yf),h=S.isValidElement(o)&&o.type==="svg",m=T({},r,{color:s,component:a,fontSize:l,instanceFontSize:t.fontSize,inheritViewBox:c,viewBox:f,hasSvgAsChild:h}),v={};c||(v.viewBox=f);const w=Kf(m);return y.jsxs(Jf,T({as:a,className:Re(w.root,i),focusable:"false",color:d,"aria-hidden":p?void 0:!0,role:p?"img":void 0,ref:n},v,g,h&&o.props,{ownerState:m,children:[h?o.props.children:o,p?y.jsx("title",{children:p}):null]}))});process.env.NODE_ENV!=="production"&&(Vo.propTypes={children:u.node,classes:u.object,className:u.string,color:u.oneOfType([u.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),u.string]),component:u.elementType,fontSize:u.oneOfType([u.oneOf(["inherit","large","medium","small"]),u.string]),htmlColor:u.string,inheritViewBox:u.bool,shapeRendering:u.string,sx:u.oneOfType([u.arrayOf(u.oneOfType([u.func,u.object,u.bool])),u.func,u.object]),titleAccess:u.string,viewBox:u.string});Vo.muiName="SvgIcon";const Ji=Vo;function ma(e,t){function n(r,o){return y.jsx(Ji,T({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Ji.muiName,S.memo(S.forwardRef(n))}const Zf={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Vs.configure(e)}},Qf=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Ke,createChainedFunction:Jr,createSvgIcon:ma,debounce:Ps,deprecatedPropType:Ru,isMuiElement:ku,ownerDocument:ke,ownerWindow:Ht,requirePropFactory:Tu,setRef:Jn,unstable_ClassNameGenerator:Zf,unstable_useEnhancedEffect:kt,unstable_useId:_s,unsupportedProp:Pu,useControlled:$s,useEventCallback:wn,useForkRef:He,useIsFocusVisible:Ms},Symbol.toStringTag,{value:"Module"})),eg=ou(Qf);var Zi;function tg(){return Zi||(Zi=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=eg}(Ar)),Ar}var ng=Wf;Object.defineProperty(Fo,"__esModule",{value:!0});var ha=Fo.default=void 0,rg=ng(tg()),og=y;ha=Fo.default=(0,rg.default)((0,og.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function Qi(e,t,n){return e?y.jsx(he.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:y.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Lo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:s=void 0,hasAutoFocus:a=!1,className:l,isDisabled:d=!1,isDense:c=!0,isSubMenuParent:p=!1,hasDisabledGutters:f=!1,hasDivider:g=!1,focusVisibleClassName:h,id:m,children:v}=e,w=y.jsx(he.MenuItem,{sx:{lineHeight:.8},autoFocus:a,className:l,disabled:d,dense:c,disableGutters:f,divider:g,focusVisibleClassName:h,onClick:t,id:m,children:n?y.jsxs(y.Fragment,{children:[Qi(i,n,!0),y.jsx(he.ListItemText,{primary:n,inset:!i&&o}),p?y.jsx(he.ListItemIcon,{className:"papi-menu-icon-trailing",children:y.jsx(ha,{})}):Qi(s,n,!1)]}):v});return r?y.jsx(qf,{title:r,placement:"right",children:y.jsx("div",{children:w})}):w}function va(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function ig(e){const[t,n]=I.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,s=d=>{n(d.currentTarget)},a=()=>{n(void 0)},l=()=>{let d=va(i).filter(c=>"menuItem"in c.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return d=d.filter(c=>"menuItem"in c.group&&c.group.menuItem===r.id),y.jsx(Bo,{...e,includedGroups:d})};return y.jsxs(y.Fragment,{children:[y.jsx(Lo,{onClick:s,...o,isSubMenuParent:!0}),y.jsx(he.Menu,{anchorEl:t,open:!!t,onClose:a,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:l()},r.id)]})}const sg=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function Bo(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:s}=I.useMemo(()=>{const c=o&&o.length>0?o:va(t).filter(h=>!("menuItem"in h.group)),p=Object.values(c).sort((h,m)=>(h.group.order||0)-(m.group.order||0)),f=[];p.forEach(h=>{sg(h.id,t.items).forEach(m=>f.push({item:m,isLastItemInGroup:!1})),f.length>0&&(f[f.length-1].isLastItemInGroup=!0)}),f.length>0&&(f[f.length-1].isLastItemInGroup=!1);const g=f.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:f,allowForLeadingIcons:g}},[o,t]),a=({item:c,isLastItemInGroup:p})=>({className:"papi-menu-item",label:c.label,tooltip:c.tooltip,iconPathBefore:"iconPathBefore"in c?c.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in c?c.iconPathAfter:void 0,hasDivider:p,allowForLeadingIcons:s}),[l]=i;if(!l)return y.jsx("div",{});const d=l.item.group;return y.jsx("div",{role:"menu","aria-label":d,children:i.map((c,p)=>{const{item:f}=c,g=a(c);if("command"in f){const h=f.group+p;return y.jsx(Lo,{onClick:m=>{n==null||n(m),r(f)},...g},h)}return y.jsx(ig,{parentMenuItem:f,parentItemProps:g,...e},d+f.id)})},d)}function ag(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([s,a])=>({id:s,group:a})).filter(s=>"column"in s.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(s=>"column"in s.group&&s.group.column===n)),y.jsx(Bo,{...e,includedGroups:i})}function lg({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return y.jsxs(he.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[y.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),y.jsx(he.List,{id:n,dense:!0,className:i??"",children:y.jsx(ag,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function ba({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=I.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(a=>{if(a==="isExtensible")return;const l=a,d=o[l];typeof d=="object"&&typeof d.order=="number"&&!Number.isNaN(d.order)?s.set(d.order,{id:l,metadata:d}):console.warn(`Property ${a} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((a,l)=>(a.metadata.order||0)-(l.metadata.order||0))},[o,r]);return y.jsx(he.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((s,a)=>y.jsx(lg,{commandHandler:e,menuDefinition:n,...s,className:t},a))})}const ya=S.createContext({});process.env.NODE_ENV!=="production"&&(ya.displayName="ListContext");const ug=ya;function cg(e){return Ze("MuiList",e)}gt("MuiList",["root","padding","dense","subheader"]);const dg=["children","className","component","dense","disablePadding","subheader"],pg=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return at({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},cg,t)},fg=Te("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>T({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),wa=S.forwardRef(function(t,n){const r=lt({props:t,name:"MuiList"}),{children:o,className:i,component:s="ul",dense:a=!1,disablePadding:l=!1,subheader:d}=r,c=fe(r,dg),p=S.useMemo(()=>({dense:a}),[a]),f=T({},r,{component:s,dense:a,disablePadding:l}),g=pg(f);return y.jsx(ug.Provider,{value:p,children:y.jsxs(fg,T({as:s,className:Re(g.root,i),ref:n,ownerState:f},c,{children:[d,o]}))})});process.env.NODE_ENV!=="production"&&(wa.propTypes={children:u.node,classes:u.object,className:u.string,component:u.elementType,dense:u.bool,disablePadding:u.bool,subheader:u.node,sx:u.oneOfType([u.arrayOf(u.oneOfType([u.func,u.object,u.bool])),u.func,u.object])});const gg=wa,mg=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Dr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function es(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function xa(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function ln(e,t,n,r,o,i){let s=!1,a=o(e,t,t?n:!1);for(;a;){if(a===e.firstChild){if(s)return!1;s=!0}const l=r?!1:a.disabled||a.getAttribute("aria-disabled")==="true";if(!a.hasAttribute("tabindex")||!xa(a,i)||l)a=o(e,a,n);else return a.focus(),!0}return!1}const Ea=S.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:s,className:a,disabledItemsFocusable:l=!1,disableListWrap:d=!1,onKeyDown:c,variant:p="selectedMenu"}=t,f=fe(t,mg),g=S.useRef(null),h=S.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});kt(()=>{o&&g.current.focus()},[o]),S.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(x,E)=>{const b=!g.current.style.width;if(x.clientHeight<g.current.clientHeight&&b){const R=`${Is(ke(x))}px`;g.current.style[E.direction==="rtl"?"paddingLeft":"paddingRight"]=R,g.current.style.width=`calc(100% + ${R})`}return g.current}}),[]);const m=x=>{const E=g.current,b=x.key,R=ke(E).activeElement;if(b==="ArrowDown")x.preventDefault(),ln(E,R,d,l,Dr);else if(b==="ArrowUp")x.preventDefault(),ln(E,R,d,l,es);else if(b==="Home")x.preventDefault(),ln(E,null,d,l,Dr);else if(b==="End")x.preventDefault(),ln(E,null,d,l,es);else if(b.length===1){const P=h.current,j=b.toLowerCase(),F=performance.now();P.keys.length>0&&(F-P.lastTime>500?(P.keys=[],P.repeating=!0,P.previousKeyMatched=!0):P.repeating&&j!==P.keys[0]&&(P.repeating=!1)),P.lastTime=F,P.keys.push(j);const B=R&&!P.repeating&&xa(R,P);P.previousKeyMatched&&(B||ln(E,R,!1,l,Dr,P))?x.preventDefault():P.previousKeyMatched=!1}c&&c(x)},v=He(g,n);let w=-1;S.Children.forEach(s,(x,E)=>{if(!S.isValidElement(x)){w===E&&(w+=1,w>=s.length&&(w=-1));return}process.env.NODE_ENV!=="production"&&Kn.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(p==="selectedMenu"&&x.props.selected||w===-1)&&(w=E),w===E&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(w+=1,w>=s.length&&(w=-1))});const _=S.Children.map(s,(x,E)=>{if(E===w){const b={};return i&&(b.autoFocus=!0),x.props.tabIndex===void 0&&p==="selectedMenu"&&(b.tabIndex=0),S.cloneElement(x,b)}return x});return y.jsx(gg,T({role:"menu",ref:v,className:a,onKeyDown:m,tabIndex:o?0:-1},f,{children:_}))});process.env.NODE_ENV!=="production"&&(Ea.propTypes={autoFocus:u.bool,autoFocusItem:u.bool,children:u.node,className:u.string,disabledItemsFocusable:u.bool,disableListWrap:u.bool,onKeyDown:u.func,variant:u.oneOf(["menu","selectedMenu"])});const hg=Ea,vg=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],bg={entering:{opacity:1},entered:{opacity:1}},Sa=S.forwardRef(function(t,n){const r=$n(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:s=!0,children:a,easing:l,in:d,onEnter:c,onEntered:p,onEntering:f,onExit:g,onExited:h,onExiting:m,style:v,timeout:w=o,TransitionComponent:_=ua}=t,x=fe(t,vg),E=S.useRef(null),b=He(E,a.ref,n),R=$=>D=>{if($){const A=E.current;D===void 0?$(A):$(A,D)}},P=R(f),j=R(($,D)=>{ca($);const A=rr({style:v,timeout:w,easing:l},{mode:"enter"});$.style.webkitTransition=r.transitions.create("opacity",A),$.style.transition=r.transitions.create("opacity",A),c&&c($,D)}),F=R(p),B=R(m),N=R($=>{const D=rr({style:v,timeout:w,easing:l},{mode:"exit"});$.style.webkitTransition=r.transitions.create("opacity",D),$.style.transition=r.transitions.create("opacity",D),g&&g($)}),C=R(h),k=$=>{i&&i(E.current,$)};return y.jsx(_,T({appear:s,in:d,nodeRef:E,onEnter:j,onEntered:F,onEntering:P,onExit:N,onExited:C,onExiting:B,addEndListener:k,timeout:w},x,{children:($,D)=>S.cloneElement(a,T({style:T({opacity:0,visibility:$==="exited"&&!d?"hidden":void 0},bg[$],v,a.props.style),ref:b},D))}))});process.env.NODE_ENV!=="production"&&(Sa.propTypes={addEndListener:u.func,appear:u.bool,children:kn.isRequired,easing:u.oneOfType([u.shape({enter:u.string,exit:u.string}),u.string]),in:u.bool,onEnter:u.func,onEntered:u.func,onEntering:u.func,onExit:u.func,onExited:u.func,onExiting:u.func,style:u.object,timeout:u.oneOfType([u.number,u.shape({appear:u.number,enter:u.number,exit:u.number})])});const yg=Sa;function wg(e){return Ze("MuiBackdrop",e)}gt("MuiBackdrop",["root","invisible"]);const xg=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Eg=e=>{const{classes:t,invisible:n}=e;return at({root:["root",n&&"invisible"]},wg,t)},Sg=Te("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>T({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),Ca=S.forwardRef(function(t,n){var r,o,i;const s=lt({props:t,name:"MuiBackdrop"}),{children:a,className:l,component:d="div",components:c={},componentsProps:p={},invisible:f=!1,open:g,slotProps:h={},slots:m={},TransitionComponent:v=yg,transitionDuration:w}=s,_=fe(s,xg),x=T({},s,{component:d,invisible:f}),E=Eg(x),b=(r=h.root)!=null?r:p.root;return y.jsx(v,T({in:g,timeout:w},_,{children:y.jsx(Sg,T({"aria-hidden":!0},b,{as:(o=(i=m.root)!=null?i:c.Root)!=null?o:d,className:Re(E.root,l,b==null?void 0:b.className),ownerState:T({},x,b==null?void 0:b.ownerState),classes:E,ref:n,children:a}))}))});process.env.NODE_ENV!=="production"&&(Ca.propTypes={children:u.node,classes:u.object,className:u.string,component:u.elementType,components:u.shape({Root:u.elementType}),componentsProps:u.shape({root:u.object}),invisible:u.bool,open:u.bool.isRequired,slotProps:u.shape({root:u.object}),slots:u.shape({root:u.elementType}),sx:u.oneOfType([u.arrayOf(u.oneOfType([u.func,u.object,u.bool])),u.func,u.object]),TransitionComponent:u.elementType,transitionDuration:u.oneOfType([u.number,u.shape({appear:u.number,enter:u.number,exit:u.number})])});const Cg=Ca;function Rg(e){return Ze("MuiModal",e)}gt("MuiModal",["root","hidden","backdrop"]);const kg=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Tg=e=>{const{open:t,exited:n,classes:r}=e;return at({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},Rg,r)},Og=Te("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>T({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Ng=Te(Cg,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Ra=S.forwardRef(function(t,n){var r,o,i,s,a,l;const d=lt({name:"MuiModal",props:t}),{BackdropComponent:c=Ng,BackdropProps:p,className:f,closeAfterTransition:g=!1,children:h,container:m,component:v,components:w={},componentsProps:_={},disableAutoFocus:x=!1,disableEnforceFocus:E=!1,disableEscapeKeyDown:b=!1,disablePortal:R=!1,disableRestoreFocus:P=!1,disableScrollLock:j=!1,hideBackdrop:F=!1,keepMounted:B=!1,onBackdropClick:N,open:C,slotProps:k,slots:$}=d,D=fe(d,kg),A=T({},d,{closeAfterTransition:g,disableAutoFocus:x,disableEnforceFocus:E,disableEscapeKeyDown:b,disablePortal:R,disableRestoreFocus:P,disableScrollLock:j,hideBackdrop:F,keepMounted:B}),{getRootProps:z,getBackdropProps:J,getTransitionProps:Q,portalRef:O,isTopModal:L,exited:G,hasTransition:Y}=vc(T({},A,{rootRef:n})),H=T({},A,{exited:G}),U=Tg(H),W={};if(h.props.tabIndex===void 0&&(W.tabIndex="-1"),Y){const{onEnter:ee,onExited:M}=Q();W.onEnter=ee,W.onExited=M}const X=(r=(o=$==null?void 0:$.root)!=null?o:w.Root)!=null?r:Og,q=(i=(s=$==null?void 0:$.backdrop)!=null?s:w.Backdrop)!=null?i:c,K=(a=k==null?void 0:k.root)!=null?a:_.root,Z=(l=k==null?void 0:k.backdrop)!=null?l:_.backdrop,ie=Tt({elementType:X,externalSlotProps:K,externalForwardedProps:D,getSlotProps:z,additionalProps:{ref:n,as:v},ownerState:H,className:Re(f,K==null?void 0:K.className,U==null?void 0:U.root,!H.open&&H.exited&&(U==null?void 0:U.hidden))}),V=Tt({elementType:q,externalSlotProps:Z,additionalProps:p,getSlotProps:ee=>J(T({},ee,{onClick:M=>{N&&N(M),ee!=null&&ee.onClick&&ee.onClick(M)}})),className:Re(Z==null?void 0:Z.className,p==null?void 0:p.className,U==null?void 0:U.backdrop),ownerState:H});return!B&&!C&&(!Y||G)?null:y.jsx(xn,{ref:O,container:m,disablePortal:R,children:y.jsxs(X,T({},ie,{children:[!F&&c?y.jsx(q,T({},V)):null,y.jsx(Zn,{disableEnforceFocus:E,disableAutoFocus:x,disableRestoreFocus:P,isEnabled:L,open:C,children:S.cloneElement(h,W)})]}))})});process.env.NODE_ENV!=="production"&&(Ra.propTypes={BackdropComponent:u.elementType,BackdropProps:u.object,children:kn.isRequired,classes:u.object,className:u.string,closeAfterTransition:u.bool,component:u.elementType,components:u.shape({Backdrop:u.elementType,Root:u.elementType}),componentsProps:u.shape({backdrop:u.oneOfType([u.func,u.object]),root:u.oneOfType([u.func,u.object])}),container:u.oneOfType([ot,u.func]),disableAutoFocus:u.bool,disableEnforceFocus:u.bool,disableEscapeKeyDown:u.bool,disablePortal:u.bool,disableRestoreFocus:u.bool,disableScrollLock:u.bool,hideBackdrop:u.bool,keepMounted:u.bool,onBackdropClick:u.func,onClose:u.func,onTransitionEnter:u.func,onTransitionExited:u.func,open:u.bool.isRequired,slotProps:u.shape({backdrop:u.oneOfType([u.func,u.object]),root:u.oneOfType([u.func,u.object])}),slots:u.shape({backdrop:u.elementType,root:u.elementType}),sx:u.oneOfType([u.arrayOf(u.oneOfType([u.func,u.object,u.bool])),u.func,u.object])});const Pg=Ra;function _g(e){return Ze("MuiPaper",e)}gt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const $g=["className","component","elevation","square","variant"],Mg=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return at(i,_g,o)},Ig=Te("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return T({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&T({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${nr("#fff",Yi(t.elevation))}, ${nr("#fff",Yi(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),ka=S.forwardRef(function(t,n){const r=lt({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:s=1,square:a=!1,variant:l="elevation"}=r,d=fe(r,$g),c=T({},r,{component:i,elevation:s,square:a,variant:l}),p=Mg(c);return process.env.NODE_ENV!=="production"&&$n().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),y.jsx(Ig,T({as:i,ownerState:c,className:Re(p.root,o),ref:n},d))});process.env.NODE_ENV!=="production"&&(ka.propTypes={children:u.node,classes:u.object,className:u.string,component:u.elementType,elevation:Kt(js,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:u.bool,sx:u.oneOfType([u.arrayOf(u.oneOfType([u.func,u.object,u.bool])),u.func,u.object]),variant:u.oneOfType([u.oneOf(["elevation","outlined"]),u.string])});const Ag=ka;function Dg(e){return Ze("MuiPopover",e)}gt("MuiPopover",["root","paper"]);const jg=["onEntering"],Fg=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Vg=["slotProps"];function ts(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function ns(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function rs(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function Wn(e){return typeof e=="function"?e():e}const Lg=e=>{const{classes:t}=e;return at({root:["root"],paper:["paper"]},Dg,t)},Bg=Te(Pg,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ta=Te(Ag,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Oa=S.forwardRef(function(t,n){var r,o,i;const s=lt({props:t,name:"MuiPopover"}),{action:a,anchorEl:l,anchorOrigin:d={vertical:"top",horizontal:"left"},anchorPosition:c,anchorReference:p="anchorEl",children:f,className:g,container:h,elevation:m=8,marginThreshold:v=16,open:w,PaperProps:_={},slots:x,slotProps:E,transformOrigin:b={vertical:"top",horizontal:"left"},TransitionComponent:R=io,transitionDuration:P="auto",TransitionProps:{onEntering:j}={},disableScrollLock:F=!1}=s,B=fe(s.TransitionProps,jg),N=fe(s,Fg),C=(r=E==null?void 0:E.paper)!=null?r:_,k=S.useRef(),$=He(k,C.ref),D=T({},s,{anchorOrigin:d,anchorReference:p,elevation:m,marginThreshold:v,externalPaperSlotProps:C,transformOrigin:b,TransitionComponent:R,transitionDuration:P,TransitionProps:B}),A=Lg(D),z=S.useCallback(()=>{if(p==="anchorPosition")return process.env.NODE_ENV!=="production"&&(c||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),c;const ee=Wn(l),M=ee&&ee.nodeType===1?ee:ke(k.current).body,se=M.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Ee=M.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Ee.top===0&&Ee.left===0&&Ee.right===0&&Ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:se.top+ts(se,d.vertical),left:se.left+ns(se,d.horizontal)}},[l,d.horizontal,d.vertical,c,p]),J=S.useCallback(ee=>({vertical:ts(ee,b.vertical),horizontal:ns(ee,b.horizontal)}),[b.horizontal,b.vertical]),Q=S.useCallback(ee=>{const M={width:ee.offsetWidth,height:ee.offsetHeight},se=J(M);if(p==="none")return{top:null,left:null,transformOrigin:rs(se)};const Ee=z();let Oe=Ee.top-se.vertical,we=Ee.left-se.horizontal;const vt=Oe+M.height,Ne=we+M.width,Qe=Ht(Wn(l)),Ie=Qe.innerHeight-v,et=Qe.innerWidth-v;if(v!==null&&Oe<v){const Se=Oe-v;Oe-=Se,se.vertical+=Se}else if(v!==null&&vt>Ie){const Se=vt-Ie;Oe-=Se,se.vertical+=Se}if(process.env.NODE_ENV!=="production"&&M.height>Ie&&M.height&&Ie&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${M.height-Ie}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),v!==null&&we<v){const Se=we-v;we-=Se,se.horizontal+=Se}else if(Ne>et){const Se=Ne-et;we-=Se,se.horizontal+=Se}return{top:`${Math.round(Oe)}px`,left:`${Math.round(we)}px`,transformOrigin:rs(se)}},[l,p,z,J,v]),[O,L]=S.useState(w),G=S.useCallback(()=>{const ee=k.current;if(!ee)return;const M=Q(ee);M.top!==null&&(ee.style.top=M.top),M.left!==null&&(ee.style.left=M.left),ee.style.transformOrigin=M.transformOrigin,L(!0)},[Q]);S.useEffect(()=>(F&&window.addEventListener("scroll",G),()=>window.removeEventListener("scroll",G)),[l,F,G]);const Y=(ee,M)=>{j&&j(ee,M),G()},H=()=>{L(!1)};S.useEffect(()=>{w&&G()}),S.useImperativeHandle(a,()=>w?{updatePosition:()=>{G()}}:null,[w,G]),S.useEffect(()=>{if(!w)return;const ee=Ps(()=>{G()}),M=Ht(l);return M.addEventListener("resize",ee),()=>{ee.clear(),M.removeEventListener("resize",ee)}},[l,w,G]);let U=P;P==="auto"&&!R.muiSupportAuto&&(U=void 0);const W=h||(l?ke(Wn(l)).body:void 0),X=(o=x==null?void 0:x.root)!=null?o:Bg,q=(i=x==null?void 0:x.paper)!=null?i:Ta,K=Tt({elementType:q,externalSlotProps:T({},C,{style:O?C.style:T({},C.style,{opacity:0})}),additionalProps:{elevation:m,ref:$},ownerState:D,className:Re(A.paper,C==null?void 0:C.className)}),Z=Tt({elementType:X,externalSlotProps:(E==null?void 0:E.root)||{},externalForwardedProps:N,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:W,open:w},ownerState:D,className:Re(A.root,g)}),{slotProps:ie}=Z,V=fe(Z,Vg);return y.jsx(X,T({},V,!Bs(X)&&{slotProps:ie,disableScrollLock:F},{children:y.jsx(R,T({appear:!0,in:w,onEntering:Y,onExited:H,timeout:U},B,{children:y.jsx(q,T({},K,{children:f}))}))}))});process.env.NODE_ENV!=="production"&&(Oa.propTypes={action:xo,anchorEl:Kt(u.oneOfType([ot,u.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=Wn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:u.shape({horizontal:u.oneOfType([u.oneOf(["center","left","right"]),u.number]).isRequired,vertical:u.oneOfType([u.oneOf(["bottom","center","top"]),u.number]).isRequired}),anchorPosition:u.shape({left:u.number.isRequired,top:u.number.isRequired}),anchorReference:u.oneOf(["anchorEl","anchorPosition","none"]),children:u.node,classes:u.object,className:u.string,container:u.oneOfType([ot,u.func]),disableScrollLock:u.bool,elevation:js,marginThreshold:u.number,onClose:u.func,open:u.bool.isRequired,PaperProps:u.shape({component:vu}),slotProps:u.shape({paper:u.oneOfType([u.func,u.object]),root:u.oneOfType([u.func,u.object])}),slots:u.shape({paper:u.elementType,root:u.elementType}),sx:u.oneOfType([u.arrayOf(u.oneOfType([u.func,u.object,u.bool])),u.func,u.object]),transformOrigin:u.shape({horizontal:u.oneOfType([u.oneOf(["center","left","right"]),u.number]).isRequired,vertical:u.oneOfType([u.oneOf(["bottom","center","top"]),u.number]).isRequired}),TransitionComponent:u.elementType,transitionDuration:u.oneOfType([u.oneOf(["auto"]),u.number,u.shape({appear:u.number,enter:u.number,exit:u.number})]),TransitionProps:u.object});const zg=Oa;function Hg(e){return Ze("MuiMenu",e)}gt("MuiMenu",["root","paper","list"]);const Gg=["onEntering"],Ug=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],qg={vertical:"top",horizontal:"right"},Wg={vertical:"top",horizontal:"left"},Xg=e=>{const{classes:t}=e;return at({root:["root"],paper:["paper"],list:["list"]},Hg,t)},Yg=Te(zg,{shouldForwardProp:e=>aa(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Kg=Te(Ta,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),Jg=Te(hg,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Na=S.forwardRef(function(t,n){var r,o;const i=lt({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:a,className:l,disableAutoFocusItem:d=!1,MenuListProps:c={},onClose:p,open:f,PaperProps:g={},PopoverClasses:h,transitionDuration:m="auto",TransitionProps:{onEntering:v}={},variant:w="selectedMenu",slots:_={},slotProps:x={}}=i,E=fe(i.TransitionProps,Gg),b=fe(i,Ug),R=$n(),P=R.direction==="rtl",j=T({},i,{autoFocus:s,disableAutoFocusItem:d,MenuListProps:c,onEntering:v,PaperProps:g,transitionDuration:m,TransitionProps:E,variant:w}),F=Xg(j),B=s&&!d&&f,N=S.useRef(null),C=(Q,O)=>{N.current&&N.current.adjustStyleForScrollbar(Q,R),v&&v(Q,O)},k=Q=>{Q.key==="Tab"&&(Q.preventDefault(),p&&p(Q,"tabKeyDown"))};let $=-1;S.Children.map(a,(Q,O)=>{S.isValidElement(Q)&&(process.env.NODE_ENV!=="production"&&Kn.isFragment(Q)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Q.props.disabled||(w==="selectedMenu"&&Q.props.selected||$===-1)&&($=O))});const D=(r=_.paper)!=null?r:Kg,A=(o=x.paper)!=null?o:g,z=Tt({elementType:_.root,externalSlotProps:x.root,ownerState:j,className:[F.root,l]}),J=Tt({elementType:D,externalSlotProps:A,ownerState:j,className:F.paper});return y.jsx(Yg,T({onClose:p,anchorOrigin:{vertical:"bottom",horizontal:P?"right":"left"},transformOrigin:P?qg:Wg,slots:{paper:D,root:_.root},slotProps:{root:z,paper:J},open:f,ref:n,transitionDuration:m,TransitionProps:T({onEntering:C},E),ownerState:j},b,{classes:h,children:y.jsx(Jg,T({onKeyDown:k,actions:N,autoFocus:s&&($===-1||d),autoFocusItem:B,variant:w},c,{className:Re(F.list,c.className),children:a}))}))});process.env.NODE_ENV!=="production"&&(Na.propTypes={anchorEl:u.oneOfType([ot,u.func]),autoFocus:u.bool,children:u.node,classes:u.object,className:u.string,disableAutoFocusItem:u.bool,MenuListProps:u.object,onClose:u.func,open:u.bool.isRequired,PaperProps:u.object,PopoverClasses:u.object,slotProps:u.shape({paper:u.oneOfType([u.func,u.object]),root:u.oneOfType([u.func,u.object])}),slots:u.shape({paper:u.elementType,root:u.elementType}),sx:u.oneOfType([u.arrayOf(u.oneOfType([u.func,u.object,u.bool])),u.func,u.object]),transitionDuration:u.oneOfType([u.oneOf(["auto"]),u.number,u.shape({appear:u.number,enter:u.number,exit:u.number})]),TransitionProps:u.object,variant:u.oneOf(["menu","selectedMenu"])});const Zg=Na;function Qg({className:e,commandHandler:t,menuDefinition:n,children:r}){var d;const[o,i]=I.useState(void 0),s=I.useCallback(c=>{c.preventDefault(),i(o===void 0?{mouseX:c.clientX+2,mouseY:c.clientY-6}:void 0)},[o]),a=I.useCallback(()=>{i(void 0)},[]),l=I.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((d=n==null?void 0:n.items)==null?void 0:d.length)??0)===0||!r?r:y.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[r,y.jsx(Zg,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:a,anchorReference:"anchorPosition",anchorPosition:l,children:y.jsx(Bo,{menuDefinition:n,commandHandler:t,onClick:a})})]})}const em=ma(y.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function tm(e){return{preserveValue:!0,...e}}const or=(e,t,n={})=>{const r=I.useRef(t);r.current=t;const o=I.useRef(n);o.current=tm(o.current);const[i,s]=I.useState(()=>r.current),[a,l]=I.useState(!0);return I.useEffect(()=>{let d=!0;return l(!!e),(async()=>{if(e){const c=await e();d&&(s(()=>c),l(!1))}})(),()=>{d=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[i,a]};function Pa({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:i,ariaLabelPrefix:s,children:a}){const[l,d]=I.useState(!1),[c,p]=I.useState(!1),f=I.useCallback(()=>{l&&d(!1),p(!1)},[l]),g=I.useCallback(E=>{E.stopPropagation(),d(b=>{const R=!b;return R&&E.shiftKey?p(!0):R||p(!1),R})},[]),h=I.useCallback(E=>(f(),r(E)),[r,f]),[m,v]=I.useState({top:1,left:1});I.useEffect(()=>{if(l){const E=o==null?void 0:o.current;if(E){const b=E.getBoundingClientRect(),R=window.scrollY,P=window.scrollX,j=b.top+R+E.clientHeight,F=b.left+P;v({top:j,left:F})}}},[l,o]);const[w]=or(I.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,l]),t),[_]=or(I.useCallback(async()=>(e==null?void 0:e(!0))??n??w,[e,n,w,l]),n??w),x=c&&_?_:w;return y.jsxs(y.Fragment,{children:[y.jsx(he.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${i??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:g,children:a??y.jsx(em,{})}),y.jsx(he.Drawer,{className:`papi-menu-drawer ${i??""}`,anchor:"left",variant:"temporary",open:l,onClose:f,PaperProps:{className:"papi-menu-drawer-paper",style:{top:m.top,left:m.left}},children:x?y.jsx(ba,{className:i,id:`${s??""} main menu`,commandHandler:h,multiColumnMenu:x}):void 0})]})}function nm({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:s="medium",className:a,onClick:l,children:d}){return y.jsx(he.IconButton,{id:e,disabled:n,edge:i,size:s,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${a??""}`,onClick:l,children:d})}const rm=ls.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),zo=I.forwardRef(({className:e,...t},n)=>y.jsx(us.Root,{ref:n,className:ne(rm(),e),...t}));zo.displayName=us.Root.displayName;function Rn({id:e,isDisabled:t=!1,hasError:n=!1,helperText:r,label:o,placeholder:i,isRequired:s=!1,className:a,defaultValue:l,value:d,onChange:c,onFocus:p,onBlur:f}){return y.jsxs("div",{className:"pr-inline-grid pr-items-center pr-gap-1.5",children:[y.jsx(zo,{htmlFor:e,className:ne({"pr-text-red-600":n,"pr-hidden":!o}),children:`${o}${s?"*":""}`}),y.jsx(ar,{id:e,disabled:t,placeholder:i,required:s,className:ne(a,{"pr-border-red-600":n}),defaultValue:l,value:d,onChange:c,onFocus:p,onBlur:f}),y.jsx("p",{className:ne({"pr-hidden":!r}),children:r})]})}let jr;const Fr=()=>(jr||(jr=le.allBookIds.map(e=>({bookId:e,label:le.bookIdToEnglishName(e)}))),jr);function om({scrRef:e,handleSubmit:t,id:n}){const r=l=>{t(l)},o=(l,d)=>{const p={bookNum:le.bookIdToNumber(d.bookId),chapterNum:1,verseNum:1};r(p)},i=l=>{t({...e,chapterNum:+l.target.value})},s=l=>{t({...e,verseNum:+l.target.value})},a=I.useMemo(()=>Fr()[e.bookNum-1],[e.bookNum]);return y.jsxs("span",{id:n,className:"pr-flex pr-place-items-center",children:[y.jsx(Yn,{title:"Book",className:"papi-ref-selector book",value:a,options:Fr(),onChange:o,isClearable:!1,width:200}),y.jsx(yt,{onClick:()=>r(Ce.offsetBook(e,-1)),isDisabled:e.bookNum<=Ce.FIRST_SCR_BOOK_NUM,children:"<"}),y.jsx(yt,{onClick:()=>r(Ce.offsetBook(e,1)),isDisabled:e.bookNum>=Fr().length,children:">"}),y.jsx(Rn,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),y.jsx(yt,{onClick:()=>t(Ce.offsetChapter(e,-1)),isDisabled:e.chapterNum<=Ce.FIRST_SCR_CHAPTER_NUM,children:"<"}),y.jsx(yt,{onClick:()=>t(Ce.offsetChapter(e,1)),isDisabled:e.chapterNum>=Ce.getChaptersForBook(e.bookNum),children:">"}),y.jsx(Rn,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:s}),y.jsx(yt,{onClick:()=>t(Ce.offsetVerse(e,-1)),isDisabled:e.verseNum<=Ce.FIRST_SCR_VERSE_NUM,children:"<"}),y.jsx(yt,{onClick:()=>t(Ce.offsetVerse(e,1)),children:">"})]})}class im{constructor(){_t(this,"listeners",{})}addEventListener(t,n){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(n)}removeEventListener(t,n){var o;const r=(o=this.listeners[t])==null?void 0:o.indexOf(n);r!==void 0&&r!==-1&&this.listeners[t].splice(r,1)}dispatchEvent(t){const n=this.listeners[t.type];n&&n.forEach(r=>r(t))}}class sm{constructor(t,n,r){_t(this,"id");_t(this,"checkDefinition");_t(this,"data");_t(this,"resultsUpdated");if(r)this.id=r.id,this.checkDefinition=r;else{if(!n)throw new Error("Either 'id' or 'checkDefinition' must be provided.");this.id=n}this.data=t,this.resultsUpdated=new im}updateData(t){this.data=t;const n=new CustomEvent("resultsUpdated",{detail:this});this.resultsUpdated.dispatchEvent(n)}addEventListener(t,n){this.resultsUpdated.addEventListener(t,n)}removeEventListener(t,n){this.resultsUpdated.removeEventListener(t,n)}}/**
   * table-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function pt(e,t){return typeof e=="function"?e(t):e}function Ve(e,t){return n=>{t.setState(r=>({...r,[e]:pt(n,r[e])}))}}function ir(e){return e instanceof Function}function am(e){return Array.isArray(e)&&e.every(t=>typeof t=="number")}function _a(e,t){const n=[],r=o=>{o.forEach(i=>{n.push(i);const s=t(i);s!=null&&s.length&&r(s)})};return r(e),n}function te(e,t,n){let r=[],o;return()=>{let i;n.key&&n.debug&&(i=Date.now());const s=e();if(!(s.length!==r.length||s.some((d,c)=>r[c]!==d)))return o;r=s;let l;if(n.key&&n.debug&&(l=Date.now()),o=t(...s),n==null||n.onChange==null||n.onChange(o),n.key&&n.debug&&n!=null&&n.debug()){const d=Math.round((Date.now()-i)*100)/100,c=Math.round((Date.now()-l)*100)/100,p=c/16,f=(g,h)=>{for(g=String(g);g.length<h;)g=" "+g;return g};console.info(`%c⏱ ${f(c,5)} /${f(d,5)} ms`,`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0,Math.min(120-120*p,120))}deg 100% 31%);`,n==null?void 0:n.key)}return o}}function lm(e,t,n,r){var o,i;const a={...e._getDefaultColumnDef(),...t},l=a.accessorKey;let d=(o=(i=a.id)!=null?i:l?l.replace(".","_"):void 0)!=null?o:typeof a.header=="string"?a.header:void 0,c;if(a.accessorFn?c=a.accessorFn:l&&(l.includes(".")?c=f=>{let g=f;for(const m of l.split(".")){var h;g=(h=g)==null?void 0:h[m],process.env.NODE_ENV!=="production"&&g===void 0&&console.warn(`"${m}" in deeply nested key "${l}" returned undefined.`)}return g}:c=f=>f[a.accessorKey]),!d)throw process.env.NODE_ENV!=="production"?new Error(a.accessorFn?"Columns require an id when using an accessorFn":"Columns require an id when using a non-string header"):new Error;let p={id:`${String(d)}`,accessorFn:c,parent:r,depth:n,columnDef:a,columns:[],getFlatColumns:te(()=>[!0],()=>{var f;return[p,...(f=p.columns)==null?void 0:f.flatMap(g=>g.getFlatColumns())]},{key:process.env.NODE_ENV==="production"&&"column.getFlatColumns",debug:()=>{var f;return(f=e.options.debugAll)!=null?f:e.options.debugColumns}}),getLeafColumns:te(()=>[e._getOrderColumnsFn()],f=>{var g;if((g=p.columns)!=null&&g.length){let h=p.columns.flatMap(m=>m.getLeafColumns());return f(h)}return[p]},{key:process.env.NODE_ENV==="production"&&"column.getLeafColumns",debug:()=>{var f;return(f=e.options.debugAll)!=null?f:e.options.debugColumns}})};for(const f of e._features)f.createColumn==null||f.createColumn(p,e);return p}function os(e,t,n){var r;let i={id:(r=n.id)!=null?r:t.id,column:t,index:n.index,isPlaceholder:!!n.isPlaceholder,placeholderId:n.placeholderId,depth:n.depth,subHeaders:[],colSpan:0,rowSpan:0,headerGroup:null,getLeafHeaders:()=>{const s=[],a=l=>{l.subHeaders&&l.subHeaders.length&&l.subHeaders.map(a),s.push(l)};return a(i),s},getContext:()=>({table:e,header:i,column:t})};return e._features.forEach(s=>{s.createHeader==null||s.createHeader(i,e)}),i}const um={createTable:e=>{e.getHeaderGroups=te(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,o)=>{var i,s;const a=(i=r==null?void 0:r.map(p=>n.find(f=>f.id===p)).filter(Boolean))!=null?i:[],l=(s=o==null?void 0:o.map(p=>n.find(f=>f.id===p)).filter(Boolean))!=null?s:[],d=n.filter(p=>!(r!=null&&r.includes(p.id))&&!(o!=null&&o.includes(p.id)));return Bn(t,[...a,...d,...l],e)},{key:process.env.NODE_ENV==="development"&&"getHeaderGroups",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugHeaders}}),e.getCenterHeaderGroups=te(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,o)=>(n=n.filter(i=>!(r!=null&&r.includes(i.id))&&!(o!=null&&o.includes(i.id))),Bn(t,n,e,"center")),{key:process.env.NODE_ENV==="development"&&"getCenterHeaderGroups",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugHeaders}}),e.getLeftHeaderGroups=te(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left],(t,n,r)=>{var o;const i=(o=r==null?void 0:r.map(s=>n.find(a=>a.id===s)).filter(Boolean))!=null?o:[];return Bn(t,i,e,"left")},{key:process.env.NODE_ENV==="development"&&"getLeftHeaderGroups",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugHeaders}}),e.getRightHeaderGroups=te(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.right],(t,n,r)=>{var o;const i=(o=r==null?void 0:r.map(s=>n.find(a=>a.id===s)).filter(Boolean))!=null?o:[];return Bn(t,i,e,"right")},{key:process.env.NODE_ENV==="development"&&"getRightHeaderGroups",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugHeaders}}),e.getFooterGroups=te(()=>[e.getHeaderGroups()],t=>[...t].reverse(),{key:process.env.NODE_ENV==="development"&&"getFooterGroups",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugHeaders}}),e.getLeftFooterGroups=te(()=>[e.getLeftHeaderGroups()],t=>[...t].reverse(),{key:process.env.NODE_ENV==="development"&&"getLeftFooterGroups",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugHeaders}}),e.getCenterFooterGroups=te(()=>[e.getCenterHeaderGroups()],t=>[...t].reverse(),{key:process.env.NODE_ENV==="development"&&"getCenterFooterGroups",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugHeaders}}),e.getRightFooterGroups=te(()=>[e.getRightHeaderGroups()],t=>[...t].reverse(),{key:process.env.NODE_ENV==="development"&&"getRightFooterGroups",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugHeaders}}),e.getFlatHeaders=te(()=>[e.getHeaderGroups()],t=>t.map(n=>n.headers).flat(),{key:process.env.NODE_ENV==="development"&&"getFlatHeaders",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugHeaders}}),e.getLeftFlatHeaders=te(()=>[e.getLeftHeaderGroups()],t=>t.map(n=>n.headers).flat(),{key:process.env.NODE_ENV==="development"&&"getLeftFlatHeaders",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugHeaders}}),e.getCenterFlatHeaders=te(()=>[e.getCenterHeaderGroups()],t=>t.map(n=>n.headers).flat(),{key:process.env.NODE_ENV==="development"&&"getCenterFlatHeaders",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugHeaders}}),e.getRightFlatHeaders=te(()=>[e.getRightHeaderGroups()],t=>t.map(n=>n.headers).flat(),{key:process.env.NODE_ENV==="development"&&"getRightFlatHeaders",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugHeaders}}),e.getCenterLeafHeaders=te(()=>[e.getCenterFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),{key:process.env.NODE_ENV==="development"&&"getCenterLeafHeaders",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugHeaders}}),e.getLeftLeafHeaders=te(()=>[e.getLeftFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),{key:process.env.NODE_ENV==="development"&&"getLeftLeafHeaders",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugHeaders}}),e.getRightLeafHeaders=te(()=>[e.getRightFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),{key:process.env.NODE_ENV==="development"&&"getRightLeafHeaders",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugHeaders}}),e.getLeafHeaders=te(()=>[e.getLeftHeaderGroups(),e.getCenterHeaderGroups(),e.getRightHeaderGroups()],(t,n,r)=>{var o,i,s,a,l,d;return[...(o=(i=t[0])==null?void 0:i.headers)!=null?o:[],...(s=(a=n[0])==null?void 0:a.headers)!=null?s:[],...(l=(d=r[0])==null?void 0:d.headers)!=null?l:[]].map(c=>c.getLeafHeaders()).flat()},{key:process.env.NODE_ENV==="development"&&"getLeafHeaders",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugHeaders}})}};function Bn(e,t,n,r){var o,i;let s=0;const a=function(f,g){g===void 0&&(g=1),s=Math.max(s,g),f.filter(h=>h.getIsVisible()).forEach(h=>{var m;(m=h.columns)!=null&&m.length&&a(h.columns,g+1)},0)};a(e);let l=[];const d=(f,g)=>{const h={depth:g,id:[r,`${g}`].filter(Boolean).join("_"),headers:[]},m=[];f.forEach(v=>{const w=[...m].reverse()[0],_=v.column.depth===h.depth;let x,E=!1;if(_&&v.column.parent?x=v.column.parent:(x=v.column,E=!0),w&&(w==null?void 0:w.column)===x)w.subHeaders.push(v);else{const b=os(n,x,{id:[r,g,x.id,v==null?void 0:v.id].filter(Boolean).join("_"),isPlaceholder:E,placeholderId:E?`${m.filter(R=>R.column===x).length}`:void 0,depth:g,index:m.length});b.subHeaders.push(v),m.push(b)}h.headers.push(v),v.headerGroup=h}),l.push(h),g>0&&d(m,g-1)},c=t.map((f,g)=>os(n,f,{depth:s,index:g}));d(c,s-1),l.reverse();const p=f=>f.filter(h=>h.column.getIsVisible()).map(h=>{let m=0,v=0,w=[0];h.subHeaders&&h.subHeaders.length?(w=[],p(h.subHeaders).forEach(x=>{let{colSpan:E,rowSpan:b}=x;m+=E,w.push(b)})):m=1;const _=Math.min(...w);return v=v+_,h.colSpan=m,h.rowSpan=v,{colSpan:m,rowSpan:v}});return p((o=(i=l[0])==null?void 0:i.headers)!=null?o:[]),l}const zn={size:150,minSize:20,maxSize:Number.MAX_SAFE_INTEGER},Vr=()=>({startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,isResizingColumn:!1,columnSizingStart:[]}),cm={getDefaultColumnDef:()=>zn,getInitialState:e=>({columnSizing:{},columnSizingInfo:Vr(),...e}),getDefaultOptions:e=>({columnResizeMode:"onEnd",columnResizeDirection:"ltr",onColumnSizingChange:Ve("columnSizing",e),onColumnSizingInfoChange:Ve("columnSizingInfo",e)}),createColumn:(e,t)=>{e.getSize=()=>{var n,r,o;const i=t.getState().columnSizing[e.id];return Math.min(Math.max((n=e.columnDef.minSize)!=null?n:zn.minSize,(r=i??e.columnDef.size)!=null?r:zn.size),(o=e.columnDef.maxSize)!=null?o:zn.maxSize)},e.getStart=n=>{const r=n?n==="left"?t.getLeftVisibleLeafColumns():t.getRightVisibleLeafColumns():t.getVisibleLeafColumns(),o=r.findIndex(i=>i.id===e.id);if(o>0){const i=r[o-1];return i.getStart(n)+i.getSize()}return 0},e.resetSize=()=>{t.setColumnSizing(n=>{let{[e.id]:r,...o}=n;return o})},e.getCanResize=()=>{var n,r;return((n=e.columnDef.enableResizing)!=null?n:!0)&&((r=t.options.enableColumnResizing)!=null?r:!0)},e.getIsResizing=()=>t.getState().columnSizingInfo.isResizingColumn===e.id},createHeader:(e,t)=>{e.getSize=()=>{let n=0;const r=o=>{if(o.subHeaders.length)o.subHeaders.forEach(r);else{var i;n+=(i=o.column.getSize())!=null?i:0}};return r(e),n},e.getStart=()=>{if(e.index>0){const n=e.headerGroup.headers[e.index-1];return n.getStart()+n.getSize()}return 0},e.getResizeHandler=n=>{const r=t.getColumn(e.column.id),o=r==null?void 0:r.getCanResize();return i=>{if(!r||!o||(i.persist==null||i.persist(),Lr(i)&&i.touches&&i.touches.length>1))return;const s=e.getSize(),a=e?e.getLeafHeaders().map(w=>[w.column.id,w.column.getSize()]):[[r.id,r.getSize()]],l=Lr(i)?Math.round(i.touches[0].clientX):i.clientX,d={},c=(w,_)=>{typeof _=="number"&&(t.setColumnSizingInfo(x=>{var E,b;const R=t.options.columnResizeDirection==="rtl"?-1:1,P=(_-((E=x==null?void 0:x.startOffset)!=null?E:0))*R,j=Math.max(P/((b=x==null?void 0:x.startSize)!=null?b:0),-.999999);return x.columnSizingStart.forEach(F=>{let[B,N]=F;d[B]=Math.round(Math.max(N+N*j,0)*100)/100}),{...x,deltaOffset:P,deltaPercentage:j}}),(t.options.columnResizeMode==="onChange"||w==="end")&&t.setColumnSizing(x=>({...x,...d})))},p=w=>c("move",w),f=w=>{c("end",w),t.setColumnSizingInfo(_=>({..._,isResizingColumn:!1,startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,columnSizingStart:[]}))},g=n||typeof document<"u"?document:null,h={moveHandler:w=>p(w.clientX),upHandler:w=>{g==null||g.removeEventListener("mousemove",h.moveHandler),g==null||g.removeEventListener("mouseup",h.upHandler),f(w.clientX)}},m={moveHandler:w=>(w.cancelable&&(w.preventDefault(),w.stopPropagation()),p(w.touches[0].clientX),!1),upHandler:w=>{var _;g==null||g.removeEventListener("touchmove",m.moveHandler),g==null||g.removeEventListener("touchend",m.upHandler),w.cancelable&&(w.preventDefault(),w.stopPropagation()),f((_=w.touches[0])==null?void 0:_.clientX)}},v=dm()?{passive:!1}:!1;Lr(i)?(g==null||g.addEventListener("touchmove",m.moveHandler,v),g==null||g.addEventListener("touchend",m.upHandler,v)):(g==null||g.addEventListener("mousemove",h.moveHandler,v),g==null||g.addEventListener("mouseup",h.upHandler,v)),t.setColumnSizingInfo(w=>({...w,startOffset:l,startSize:s,deltaOffset:0,deltaPercentage:0,columnSizingStart:a,isResizingColumn:r.id}))}}},createTable:e=>{e.setColumnSizing=t=>e.options.onColumnSizingChange==null?void 0:e.options.onColumnSizingChange(t),e.setColumnSizingInfo=t=>e.options.onColumnSizingInfoChange==null?void 0:e.options.onColumnSizingInfoChange(t),e.resetColumnSizing=t=>{var n;e.setColumnSizing(t?{}:(n=e.initialState.columnSizing)!=null?n:{})},e.resetHeaderSizeInfo=t=>{var n;e.setColumnSizingInfo(t?Vr():(n=e.initialState.columnSizingInfo)!=null?n:Vr())},e.getTotalSize=()=>{var t,n;return(t=(n=e.getHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getLeftTotalSize=()=>{var t,n;return(t=(n=e.getLeftHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getCenterTotalSize=()=>{var t,n;return(t=(n=e.getCenterHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getRightTotalSize=()=>{var t,n;return(t=(n=e.getRightHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0}}};let Hn=null;function dm(){if(typeof Hn=="boolean")return Hn;let e=!1;try{const t={get passive(){return e=!0,!1}},n=()=>{};window.addEventListener("test",n,t),window.removeEventListener("test",n)}catch{e=!1}return Hn=e,Hn}function Lr(e){return e.type==="touchstart"}const pm={getInitialState:e=>({expanded:{},...e}),getDefaultOptions:e=>({onExpandedChange:Ve("expanded",e),paginateExpandedRows:!0}),createTable:e=>{let t=!1,n=!1;e._autoResetExpanded=()=>{var r,o;if(!t){e._queue(()=>{t=!0});return}if((r=(o=e.options.autoResetAll)!=null?o:e.options.autoResetExpanded)!=null?r:!e.options.manualExpanding){if(n)return;n=!0,e._queue(()=>{e.resetExpanded(),n=!1})}},e.setExpanded=r=>e.options.onExpandedChange==null?void 0:e.options.onExpandedChange(r),e.toggleAllRowsExpanded=r=>{r??!e.getIsAllRowsExpanded()?e.setExpanded(!0):e.setExpanded({})},e.resetExpanded=r=>{var o,i;e.setExpanded(r?{}:(o=(i=e.initialState)==null?void 0:i.expanded)!=null?o:{})},e.getCanSomeRowsExpand=()=>e.getPrePaginationRowModel().flatRows.some(r=>r.getCanExpand()),e.getToggleAllRowsExpandedHandler=()=>r=>{r.persist==null||r.persist(),e.toggleAllRowsExpanded()},e.getIsSomeRowsExpanded=()=>{const r=e.getState().expanded;return r===!0||Object.values(r).some(Boolean)},e.getIsAllRowsExpanded=()=>{const r=e.getState().expanded;return typeof r=="boolean"?r===!0:!(!Object.keys(r).length||e.getRowModel().flatRows.some(o=>!o.getIsExpanded()))},e.getExpandedDepth=()=>{let r=0;return(e.getState().expanded===!0?Object.keys(e.getRowModel().rowsById):Object.keys(e.getState().expanded)).forEach(i=>{const s=i.split(".");r=Math.max(r,s.length)}),r},e.getPreExpandedRowModel=()=>e.getSortedRowModel(),e.getExpandedRowModel=()=>(!e._getExpandedRowModel&&e.options.getExpandedRowModel&&(e._getExpandedRowModel=e.options.getExpandedRowModel(e)),e.options.manualExpanding||!e._getExpandedRowModel?e.getPreExpandedRowModel():e._getExpandedRowModel())},createRow:(e,t)=>{e.toggleExpanded=n=>{t.setExpanded(r=>{var o;const i=r===!0?!0:!!(r!=null&&r[e.id]);let s={};if(r===!0?Object.keys(t.getRowModel().rowsById).forEach(a=>{s[a]=!0}):s=r,n=(o=n)!=null?o:!i,!i&&n)return{...s,[e.id]:!0};if(i&&!n){const{[e.id]:a,...l}=s;return l}return r})},e.getIsExpanded=()=>{var n;const r=t.getState().expanded;return!!((n=t.options.getIsRowExpanded==null?void 0:t.options.getIsRowExpanded(e))!=null?n:r===!0||r!=null&&r[e.id])},e.getCanExpand=()=>{var n,r,o;return(n=t.options.getRowCanExpand==null?void 0:t.options.getRowCanExpand(e))!=null?n:((r=t.options.enableExpanding)!=null?r:!0)&&!!((o=e.subRows)!=null&&o.length)},e.getIsAllParentsExpanded=()=>{let n=!0,r=e;for(;n&&r.parentId;)r=t.getRow(r.parentId,!0),n=r.getIsExpanded();return n},e.getToggleExpandedHandler=()=>{const n=e.getCanExpand();return()=>{n&&e.toggleExpanded()}}}},$a=(e,t,n)=>{var r;const o=n.toLowerCase();return!!(!((r=e.getValue(t))==null||(r=r.toString())==null||(r=r.toLowerCase())==null)&&r.includes(o))};$a.autoRemove=e=>Xe(e);const Ma=(e,t,n)=>{var r;return!!(!((r=e.getValue(t))==null||(r=r.toString())==null)&&r.includes(n))};Ma.autoRemove=e=>Xe(e);const Ia=(e,t,n)=>{var r;return((r=e.getValue(t))==null||(r=r.toString())==null?void 0:r.toLowerCase())===(n==null?void 0:n.toLowerCase())};Ia.autoRemove=e=>Xe(e);const Aa=(e,t,n)=>{var r;return(r=e.getValue(t))==null?void 0:r.includes(n)};Aa.autoRemove=e=>Xe(e)||!(e!=null&&e.length);const Da=(e,t,n)=>!n.some(r=>{var o;return!((o=e.getValue(t))!=null&&o.includes(r))});Da.autoRemove=e=>Xe(e)||!(e!=null&&e.length);const ja=(e,t,n)=>n.some(r=>{var o;return(o=e.getValue(t))==null?void 0:o.includes(r)});ja.autoRemove=e=>Xe(e)||!(e!=null&&e.length);const Fa=(e,t,n)=>e.getValue(t)===n;Fa.autoRemove=e=>Xe(e);const Va=(e,t,n)=>e.getValue(t)==n;Va.autoRemove=e=>Xe(e);const Ho=(e,t,n)=>{let[r,o]=n;const i=e.getValue(t);return i>=r&&i<=o};Ho.resolveFilterValue=e=>{let[t,n]=e,r=typeof t!="number"?parseFloat(t):t,o=typeof n!="number"?parseFloat(n):n,i=t===null||Number.isNaN(r)?-1/0:r,s=n===null||Number.isNaN(o)?1/0:o;if(i>s){const a=i;i=s,s=a}return[i,s]};Ho.autoRemove=e=>Xe(e)||Xe(e[0])&&Xe(e[1]);const nt={includesString:$a,includesStringSensitive:Ma,equalsString:Ia,arrIncludes:Aa,arrIncludesAll:Da,arrIncludesSome:ja,equals:Fa,weakEquals:Va,inNumberRange:Ho};function Xe(e){return e==null||e===""}const fm={getDefaultColumnDef:()=>({filterFn:"auto"}),getInitialState:e=>({columnFilters:[],globalFilter:void 0,...e}),getDefaultOptions:e=>({onColumnFiltersChange:Ve("columnFilters",e),onGlobalFilterChange:Ve("globalFilter",e),filterFromLeafRows:!1,maxLeafRowFilterDepth:100,globalFilterFn:"auto",getColumnCanGlobalFilter:t=>{var n;const r=(n=e.getCoreRowModel().flatRows[0])==null||(n=n._getAllCellsByColumnId()[t.id])==null?void 0:n.getValue();return typeof r=="string"||typeof r=="number"}}),createColumn:(e,t)=>{e.getAutoFilterFn=()=>{const n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);return typeof r=="string"?nt.includesString:typeof r=="number"?nt.inNumberRange:typeof r=="boolean"||r!==null&&typeof r=="object"?nt.equals:Array.isArray(r)?nt.arrIncludes:nt.weakEquals},e.getFilterFn=()=>{var n,r;return ir(e.columnDef.filterFn)?e.columnDef.filterFn:e.columnDef.filterFn==="auto"?e.getAutoFilterFn():(n=(r=t.options.filterFns)==null?void 0:r[e.columnDef.filterFn])!=null?n:nt[e.columnDef.filterFn]},e.getCanFilter=()=>{var n,r,o;return((n=e.columnDef.enableColumnFilter)!=null?n:!0)&&((r=t.options.enableColumnFilters)!=null?r:!0)&&((o=t.options.enableFilters)!=null?o:!0)&&!!e.accessorFn},e.getCanGlobalFilter=()=>{var n,r,o,i;return((n=e.columnDef.enableGlobalFilter)!=null?n:!0)&&((r=t.options.enableGlobalFilter)!=null?r:!0)&&((o=t.options.enableFilters)!=null?o:!0)&&((i=t.options.getColumnCanGlobalFilter==null?void 0:t.options.getColumnCanGlobalFilter(e))!=null?i:!0)&&!!e.accessorFn},e.getIsFiltered=()=>e.getFilterIndex()>-1,e.getFilterValue=()=>{var n;return(n=t.getState().columnFilters)==null||(n=n.find(r=>r.id===e.id))==null?void 0:n.value},e.getFilterIndex=()=>{var n,r;return(n=(r=t.getState().columnFilters)==null?void 0:r.findIndex(o=>o.id===e.id))!=null?n:-1},e.setFilterValue=n=>{t.setColumnFilters(r=>{const o=e.getFilterFn(),i=r==null?void 0:r.find(c=>c.id===e.id),s=pt(n,i?i.value:void 0);if(is(o,s,e)){var a;return(a=r==null?void 0:r.filter(c=>c.id!==e.id))!=null?a:[]}const l={id:e.id,value:s};if(i){var d;return(d=r==null?void 0:r.map(c=>c.id===e.id?l:c))!=null?d:[]}return r!=null&&r.length?[...r,l]:[l]})},e._getFacetedRowModel=t.options.getFacetedRowModel&&t.options.getFacetedRowModel(t,e.id),e.getFacetedRowModel=()=>e._getFacetedRowModel?e._getFacetedRowModel():t.getPreFilteredRowModel(),e._getFacetedUniqueValues=t.options.getFacetedUniqueValues&&t.options.getFacetedUniqueValues(t,e.id),e.getFacetedUniqueValues=()=>e._getFacetedUniqueValues?e._getFacetedUniqueValues():new Map,e._getFacetedMinMaxValues=t.options.getFacetedMinMaxValues&&t.options.getFacetedMinMaxValues(t,e.id),e.getFacetedMinMaxValues=()=>{if(e._getFacetedMinMaxValues)return e._getFacetedMinMaxValues()}},createRow:(e,t)=>{e.columnFilters={},e.columnFiltersMeta={}},createTable:e=>{e.getGlobalAutoFilterFn=()=>nt.includesString,e.getGlobalFilterFn=()=>{var t,n;const{globalFilterFn:r}=e.options;return ir(r)?r:r==="auto"?e.getGlobalAutoFilterFn():(t=(n=e.options.filterFns)==null?void 0:n[r])!=null?t:nt[r]},e.setColumnFilters=t=>{const n=e.getAllLeafColumns(),r=o=>{var i;return(i=pt(t,o))==null?void 0:i.filter(s=>{const a=n.find(l=>l.id===s.id);if(a){const l=a.getFilterFn();if(is(l,s.value,a))return!1}return!0})};e.options.onColumnFiltersChange==null||e.options.onColumnFiltersChange(r)},e.setGlobalFilter=t=>{e.options.onGlobalFilterChange==null||e.options.onGlobalFilterChange(t)},e.resetGlobalFilter=t=>{e.setGlobalFilter(t?void 0:e.initialState.globalFilter)},e.resetColumnFilters=t=>{var n,r;e.setColumnFilters(t?[]:(n=(r=e.initialState)==null?void 0:r.columnFilters)!=null?n:[])},e.getPreFilteredRowModel=()=>e.getCoreRowModel(),e.getFilteredRowModel=()=>(!e._getFilteredRowModel&&e.options.getFilteredRowModel&&(e._getFilteredRowModel=e.options.getFilteredRowModel(e)),e.options.manualFiltering||!e._getFilteredRowModel?e.getPreFilteredRowModel():e._getFilteredRowModel()),e._getGlobalFacetedRowModel=e.options.getFacetedRowModel&&e.options.getFacetedRowModel(e,"__global__"),e.getGlobalFacetedRowModel=()=>e.options.manualFiltering||!e._getGlobalFacetedRowModel?e.getPreFilteredRowModel():e._getGlobalFacetedRowModel(),e._getGlobalFacetedUniqueValues=e.options.getFacetedUniqueValues&&e.options.getFacetedUniqueValues(e,"__global__"),e.getGlobalFacetedUniqueValues=()=>e._getGlobalFacetedUniqueValues?e._getGlobalFacetedUniqueValues():new Map,e._getGlobalFacetedMinMaxValues=e.options.getFacetedMinMaxValues&&e.options.getFacetedMinMaxValues(e,"__global__"),e.getGlobalFacetedMinMaxValues=()=>{if(e._getGlobalFacetedMinMaxValues)return e._getGlobalFacetedMinMaxValues()}}};function is(e,t,n){return(e&&e.autoRemove?e.autoRemove(t,n):!1)||typeof t>"u"||typeof t=="string"&&!t}const gm=(e,t,n)=>n.reduce((r,o)=>{const i=o.getValue(e);return r+(typeof i=="number"?i:0)},0),mm=(e,t,n)=>{let r;return n.forEach(o=>{const i=o.getValue(e);i!=null&&(r>i||r===void 0&&i>=i)&&(r=i)}),r},hm=(e,t,n)=>{let r;return n.forEach(o=>{const i=o.getValue(e);i!=null&&(r<i||r===void 0&&i>=i)&&(r=i)}),r},vm=(e,t,n)=>{let r,o;return n.forEach(i=>{const s=i.getValue(e);s!=null&&(r===void 0?s>=s&&(r=o=s):(r>s&&(r=s),o<s&&(o=s)))}),[r,o]},bm=(e,t)=>{let n=0,r=0;if(t.forEach(o=>{let i=o.getValue(e);i!=null&&(i=+i)>=i&&(++n,r+=i)}),n)return r/n},ym=(e,t)=>{if(!t.length)return;const n=t.map(i=>i.getValue(e));if(!am(n))return;if(n.length===1)return n[0];const r=Math.floor(n.length/2),o=n.sort((i,s)=>i-s);return n.length%2!==0?o[r]:(o[r-1]+o[r])/2},wm=(e,t)=>Array.from(new Set(t.map(n=>n.getValue(e))).values()),xm=(e,t)=>new Set(t.map(n=>n.getValue(e))).size,Em=(e,t)=>t.length,Br={sum:gm,min:mm,max:hm,extent:vm,mean:bm,median:ym,unique:wm,uniqueCount:xm,count:Em},Sm={getDefaultColumnDef:()=>({aggregatedCell:e=>{var t,n;return(t=(n=e.getValue())==null||n.toString==null?void 0:n.toString())!=null?t:null},aggregationFn:"auto"}),getInitialState:e=>({grouping:[],...e}),getDefaultOptions:e=>({onGroupingChange:Ve("grouping",e),groupedColumnMode:"reorder"}),createColumn:(e,t)=>{e.toggleGrouping=()=>{t.setGrouping(n=>n!=null&&n.includes(e.id)?n.filter(r=>r!==e.id):[...n??[],e.id])},e.getCanGroup=()=>{var n,r,o,i;return(n=(r=(o=(i=e.columnDef.enableGrouping)!=null?i:!0)!=null?o:t.options.enableGrouping)!=null?r:!0)!=null?n:!!e.accessorFn},e.getIsGrouped=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.includes(e.id)},e.getGroupedIndex=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.indexOf(e.id)},e.getToggleGroupingHandler=()=>{const n=e.getCanGroup();return()=>{n&&e.toggleGrouping()}},e.getAutoAggregationFn=()=>{const n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);if(typeof r=="number")return Br.sum;if(Object.prototype.toString.call(r)==="[object Date]")return Br.extent},e.getAggregationFn=()=>{var n,r;if(!e)throw new Error;return ir(e.columnDef.aggregationFn)?e.columnDef.aggregationFn:e.columnDef.aggregationFn==="auto"?e.getAutoAggregationFn():(n=(r=t.options.aggregationFns)==null?void 0:r[e.columnDef.aggregationFn])!=null?n:Br[e.columnDef.aggregationFn]}},createTable:e=>{e.setGrouping=t=>e.options.onGroupingChange==null?void 0:e.options.onGroupingChange(t),e.resetGrouping=t=>{var n,r;e.setGrouping(t?[]:(n=(r=e.initialState)==null?void 0:r.grouping)!=null?n:[])},e.getPreGroupedRowModel=()=>e.getFilteredRowModel(),e.getGroupedRowModel=()=>(!e._getGroupedRowModel&&e.options.getGroupedRowModel&&(e._getGroupedRowModel=e.options.getGroupedRowModel(e)),e.options.manualGrouping||!e._getGroupedRowModel?e.getPreGroupedRowModel():e._getGroupedRowModel())},createRow:(e,t)=>{e.getIsGrouped=()=>!!e.groupingColumnId,e.getGroupingValue=n=>{if(e._groupingValuesCache.hasOwnProperty(n))return e._groupingValuesCache[n];const r=t.getColumn(n);return r!=null&&r.columnDef.getGroupingValue?(e._groupingValuesCache[n]=r.columnDef.getGroupingValue(e.original),e._groupingValuesCache[n]):e.getValue(n)},e._groupingValuesCache={}},createCell:(e,t,n,r)=>{e.getIsGrouped=()=>t.getIsGrouped()&&t.id===n.groupingColumnId,e.getIsPlaceholder=()=>!e.getIsGrouped()&&t.getIsGrouped(),e.getIsAggregated=()=>{var o;return!e.getIsGrouped()&&!e.getIsPlaceholder()&&!!((o=n.subRows)!=null&&o.length)}}};function Cm(e,t,n){if(!(t!=null&&t.length)||!n)return e;const r=e.filter(i=>!t.includes(i.id));return n==="remove"?r:[...t.map(i=>e.find(s=>s.id===i)).filter(Boolean),...r]}const Rm={getInitialState:e=>({columnOrder:[],...e}),getDefaultOptions:e=>({onColumnOrderChange:Ve("columnOrder",e)}),createTable:e=>{e.setColumnOrder=t=>e.options.onColumnOrderChange==null?void 0:e.options.onColumnOrderChange(t),e.resetColumnOrder=t=>{var n;e.setColumnOrder(t?[]:(n=e.initialState.columnOrder)!=null?n:[])},e._getOrderColumnsFn=te(()=>[e.getState().columnOrder,e.getState().grouping,e.options.groupedColumnMode],(t,n,r)=>o=>{let i=[];if(!(t!=null&&t.length))i=o;else{const s=[...t],a=[...o];for(;a.length&&s.length;){const l=s.shift(),d=a.findIndex(c=>c.id===l);d>-1&&i.push(a.splice(d,1)[0])}i=[...i,...a]}return Cm(i,n,r)},{key:process.env.NODE_ENV==="development"&&"getOrderColumnsFn"})}},so=0,ao=10,zr=()=>({pageIndex:so,pageSize:ao}),km={getInitialState:e=>({...e,pagination:{...zr(),...e==null?void 0:e.pagination}}),getDefaultOptions:e=>({onPaginationChange:Ve("pagination",e)}),createTable:e=>{let t=!1,n=!1;e._autoResetPageIndex=()=>{var r,o;if(!t){e._queue(()=>{t=!0});return}if((r=(o=e.options.autoResetAll)!=null?o:e.options.autoResetPageIndex)!=null?r:!e.options.manualPagination){if(n)return;n=!0,e._queue(()=>{e.resetPageIndex(),n=!1})}},e.setPagination=r=>{const o=i=>pt(r,i);return e.options.onPaginationChange==null?void 0:e.options.onPaginationChange(o)},e.resetPagination=r=>{var o;e.setPagination(r?zr():(o=e.initialState.pagination)!=null?o:zr())},e.setPageIndex=r=>{e.setPagination(o=>{let i=pt(r,o.pageIndex);const s=typeof e.options.pageCount>"u"||e.options.pageCount===-1?Number.MAX_SAFE_INTEGER:e.options.pageCount-1;return i=Math.max(0,Math.min(i,s)),{...o,pageIndex:i}})},e.resetPageIndex=r=>{var o,i;e.setPageIndex(r?so:(o=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageIndex)!=null?o:so)},e.resetPageSize=r=>{var o,i;e.setPageSize(r?ao:(o=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageSize)!=null?o:ao)},e.setPageSize=r=>{e.setPagination(o=>{const i=Math.max(1,pt(r,o.pageSize)),s=o.pageSize*o.pageIndex,a=Math.floor(s/i);return{...o,pageIndex:a,pageSize:i}})},e.setPageCount=r=>e.setPagination(o=>{var i;let s=pt(r,(i=e.options.pageCount)!=null?i:-1);return typeof s=="number"&&(s=Math.max(-1,s)),{...o,pageCount:s}}),e.getPageOptions=te(()=>[e.getPageCount()],r=>{let o=[];return r&&r>0&&(o=[...new Array(r)].fill(null).map((i,s)=>s)),o},{key:process.env.NODE_ENV==="development"&&"getPageOptions",debug:()=>{var r;return(r=e.options.debugAll)!=null?r:e.options.debugTable}}),e.getCanPreviousPage=()=>e.getState().pagination.pageIndex>0,e.getCanNextPage=()=>{const{pageIndex:r}=e.getState().pagination,o=e.getPageCount();return o===-1?!0:o===0?!1:r<o-1},e.previousPage=()=>e.setPageIndex(r=>r-1),e.nextPage=()=>e.setPageIndex(r=>r+1),e.getPrePaginationRowModel=()=>e.getExpandedRowModel(),e.getPaginationRowModel=()=>(!e._getPaginationRowModel&&e.options.getPaginationRowModel&&(e._getPaginationRowModel=e.options.getPaginationRowModel(e)),e.options.manualPagination||!e._getPaginationRowModel?e.getPrePaginationRowModel():e._getPaginationRowModel()),e.getPageCount=()=>{var r;return(r=e.options.pageCount)!=null?r:Math.ceil(e.getPrePaginationRowModel().rows.length/e.getState().pagination.pageSize)}}},Hr=()=>({left:[],right:[]}),Gr=()=>({top:[],bottom:[]}),Tm={getInitialState:e=>({columnPinning:Hr(),rowPinning:Gr(),...e}),getDefaultOptions:e=>({onColumnPinningChange:Ve("columnPinning",e),onRowPinningChange:Ve("rowPinning",e)}),createColumn:(e,t)=>{e.pin=n=>{const r=e.getLeafColumns().map(o=>o.id).filter(Boolean);t.setColumnPinning(o=>{var i,s;if(n==="right"){var a,l;return{left:((a=o==null?void 0:o.left)!=null?a:[]).filter(p=>!(r!=null&&r.includes(p))),right:[...((l=o==null?void 0:o.right)!=null?l:[]).filter(p=>!(r!=null&&r.includes(p))),...r]}}if(n==="left"){var d,c;return{left:[...((d=o==null?void 0:o.left)!=null?d:[]).filter(p=>!(r!=null&&r.includes(p))),...r],right:((c=o==null?void 0:o.right)!=null?c:[]).filter(p=>!(r!=null&&r.includes(p)))}}return{left:((i=o==null?void 0:o.left)!=null?i:[]).filter(p=>!(r!=null&&r.includes(p))),right:((s=o==null?void 0:o.right)!=null?s:[]).filter(p=>!(r!=null&&r.includes(p)))}})},e.getCanPin=()=>e.getLeafColumns().some(r=>{var o,i,s;return((o=r.columnDef.enablePinning)!=null?o:!0)&&((i=(s=t.options.enableColumnPinning)!=null?s:t.options.enablePinning)!=null?i:!0)}),e.getIsPinned=()=>{const n=e.getLeafColumns().map(a=>a.id),{left:r,right:o}=t.getState().columnPinning,i=n.some(a=>r==null?void 0:r.includes(a)),s=n.some(a=>o==null?void 0:o.includes(a));return i?"left":s?"right":!1},e.getPinnedIndex=()=>{var n,r;const o=e.getIsPinned();return o?(n=(r=t.getState().columnPinning)==null||(r=r[o])==null?void 0:r.indexOf(e.id))!=null?n:-1:0}},createRow:(e,t)=>{e.pin=(n,r,o)=>{const i=r?e.getLeafRows().map(l=>{let{id:d}=l;return d}):[],s=o?e.getParentRows().map(l=>{let{id:d}=l;return d}):[],a=new Set([...s,e.id,...i]);t.setRowPinning(l=>{var d,c;if(n==="bottom"){var p,f;return{top:((p=l==null?void 0:l.top)!=null?p:[]).filter(m=>!(a!=null&&a.has(m))),bottom:[...((f=l==null?void 0:l.bottom)!=null?f:[]).filter(m=>!(a!=null&&a.has(m))),...Array.from(a)]}}if(n==="top"){var g,h;return{top:[...((g=l==null?void 0:l.top)!=null?g:[]).filter(m=>!(a!=null&&a.has(m))),...Array.from(a)],bottom:((h=l==null?void 0:l.bottom)!=null?h:[]).filter(m=>!(a!=null&&a.has(m)))}}return{top:((d=l==null?void 0:l.top)!=null?d:[]).filter(m=>!(a!=null&&a.has(m))),bottom:((c=l==null?void 0:l.bottom)!=null?c:[]).filter(m=>!(a!=null&&a.has(m)))}})},e.getCanPin=()=>{var n;const{enableRowPinning:r,enablePinning:o}=t.options;return typeof r=="function"?r(e):(n=r??o)!=null?n:!0},e.getIsPinned=()=>{const n=[e.id],{top:r,bottom:o}=t.getState().rowPinning,i=n.some(a=>r==null?void 0:r.includes(a)),s=n.some(a=>o==null?void 0:o.includes(a));return i?"top":s?"bottom":!1},e.getPinnedIndex=()=>{var n,r;const o=e.getIsPinned();if(!o)return-1;const i=(n=t._getPinnedRows(o))==null?void 0:n.map(s=>{let{id:a}=s;return a});return(r=i==null?void 0:i.indexOf(e.id))!=null?r:-1},e.getCenterVisibleCells=te(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left,t.getState().columnPinning.right],(n,r,o)=>{const i=[...r??[],...o??[]];return n.filter(s=>!i.includes(s.column.id))},{key:process.env.NODE_ENV==="development"&&"row.getCenterVisibleCells",debug:()=>{var n;return(n=t.options.debugAll)!=null?n:t.options.debugRows}}),e.getLeftVisibleCells=te(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left,,],(n,r)=>(r??[]).map(i=>n.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"left"})),{key:process.env.NODE_ENV==="development"&&"row.getLeftVisibleCells",debug:()=>{var n;return(n=t.options.debugAll)!=null?n:t.options.debugRows}}),e.getRightVisibleCells=te(()=>[e._getAllVisibleCells(),t.getState().columnPinning.right],(n,r)=>(r??[]).map(i=>n.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"right"})),{key:process.env.NODE_ENV==="development"&&"row.getRightVisibleCells",debug:()=>{var n;return(n=t.options.debugAll)!=null?n:t.options.debugRows}})},createTable:e=>{e.setColumnPinning=t=>e.options.onColumnPinningChange==null?void 0:e.options.onColumnPinningChange(t),e.resetColumnPinning=t=>{var n,r;return e.setColumnPinning(t?Hr():(n=(r=e.initialState)==null?void 0:r.columnPinning)!=null?n:Hr())},e.getIsSomeColumnsPinned=t=>{var n;const r=e.getState().columnPinning;if(!t){var o,i;return!!((o=r.left)!=null&&o.length||(i=r.right)!=null&&i.length)}return!!((n=r[t])!=null&&n.length)},e.getLeftLeafColumns=te(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left],(t,n)=>(n??[]).map(r=>t.find(o=>o.id===r)).filter(Boolean),{key:process.env.NODE_ENV==="development"&&"getLeftLeafColumns",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugColumns}}),e.getRightLeafColumns=te(()=>[e.getAllLeafColumns(),e.getState().columnPinning.right],(t,n)=>(n??[]).map(r=>t.find(o=>o.id===r)).filter(Boolean),{key:process.env.NODE_ENV==="development"&&"getRightLeafColumns",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugColumns}}),e.getCenterLeafColumns=te(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r)=>{const o=[...n??[],...r??[]];return t.filter(i=>!o.includes(i.id))},{key:process.env.NODE_ENV==="development"&&"getCenterLeafColumns",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugColumns}}),e.setRowPinning=t=>e.options.onRowPinningChange==null?void 0:e.options.onRowPinningChange(t),e.resetRowPinning=t=>{var n,r;return e.setRowPinning(t?Gr():(n=(r=e.initialState)==null?void 0:r.rowPinning)!=null?n:Gr())},e.getIsSomeRowsPinned=t=>{var n;const r=e.getState().rowPinning;if(!t){var o,i;return!!((o=r.top)!=null&&o.length||(i=r.bottom)!=null&&i.length)}return!!((n=r[t])!=null&&n.length)},e._getPinnedRows=t=>te(()=>[e.getRowModel().rows,e.getState().rowPinning[t]],(n,r)=>{var o;return((o=e.options.keepPinnedRows)==null||o?(r??[]).map(s=>{const a=e.getRow(s,!0);return a.getIsAllParentsExpanded()?a:null}):(r??[]).map(s=>n.find(a=>a.id===s))).filter(Boolean).map(s=>({...s,position:t}))},{key:process.env.NODE_ENV==="development"&&`row.get${t==="top"?"Top":"Bottom"}Rows`,debug:()=>{var n;return(n=e.options.debugAll)!=null?n:e.options.debugRows}})(),e.getTopRows=()=>e._getPinnedRows("top"),e.getBottomRows=()=>e._getPinnedRows("bottom"),e.getCenterRows=te(()=>[e.getRowModel().rows,e.getState().rowPinning.top,e.getState().rowPinning.bottom],(t,n,r)=>{const o=new Set([...n??[],...r??[]]);return t.filter(i=>!o.has(i.id))},{key:process.env.NODE_ENV==="development"&&"row.getCenterRows",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugRows}})}},Om={getInitialState:e=>({rowSelection:{},...e}),getDefaultOptions:e=>({onRowSelectionChange:Ve("rowSelection",e),enableRowSelection:!0,enableMultiRowSelection:!0,enableSubRowSelection:!0}),createTable:e=>{e.setRowSelection=t=>e.options.onRowSelectionChange==null?void 0:e.options.onRowSelectionChange(t),e.resetRowSelection=t=>{var n;return e.setRowSelection(t?{}:(n=e.initialState.rowSelection)!=null?n:{})},e.toggleAllRowsSelected=t=>{e.setRowSelection(n=>{t=typeof t<"u"?t:!e.getIsAllRowsSelected();const r={...n},o=e.getPreGroupedRowModel().flatRows;return t?o.forEach(i=>{i.getCanSelect()&&(r[i.id]=!0)}):o.forEach(i=>{delete r[i.id]}),r})},e.toggleAllPageRowsSelected=t=>e.setRowSelection(n=>{const r=typeof t<"u"?t:!e.getIsAllPageRowsSelected(),o={...n};return e.getRowModel().rows.forEach(i=>{lo(o,i.id,r,!0,e)}),o}),e.getPreSelectedRowModel=()=>e.getCoreRowModel(),e.getSelectedRowModel=te(()=>[e.getState().rowSelection,e.getCoreRowModel()],(t,n)=>Object.keys(t).length?Ur(e,n):{rows:[],flatRows:[],rowsById:{}},{key:process.env.NODE_ENV==="development"&&"getSelectedRowModel",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugTable}}),e.getFilteredSelectedRowModel=te(()=>[e.getState().rowSelection,e.getFilteredRowModel()],(t,n)=>Object.keys(t).length?Ur(e,n):{rows:[],flatRows:[],rowsById:{}},{key:process.env.NODE_ENV==="production"&&"getFilteredSelectedRowModel",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugTable}}),e.getGroupedSelectedRowModel=te(()=>[e.getState().rowSelection,e.getSortedRowModel()],(t,n)=>Object.keys(t).length?Ur(e,n):{rows:[],flatRows:[],rowsById:{}},{key:process.env.NODE_ENV==="production"&&"getGroupedSelectedRowModel",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugTable}}),e.getIsAllRowsSelected=()=>{const t=e.getFilteredRowModel().flatRows,{rowSelection:n}=e.getState();let r=!!(t.length&&Object.keys(n).length);return r&&t.some(o=>o.getCanSelect()&&!n[o.id])&&(r=!1),r},e.getIsAllPageRowsSelected=()=>{const t=e.getPaginationRowModel().flatRows.filter(o=>o.getCanSelect()),{rowSelection:n}=e.getState();let r=!!t.length;return r&&t.some(o=>!n[o.id])&&(r=!1),r},e.getIsSomeRowsSelected=()=>{var t;const n=Object.keys((t=e.getState().rowSelection)!=null?t:{}).length;return n>0&&n<e.getFilteredRowModel().flatRows.length},e.getIsSomePageRowsSelected=()=>{const t=e.getPaginationRowModel().flatRows;return e.getIsAllPageRowsSelected()?!1:t.filter(n=>n.getCanSelect()).some(n=>n.getIsSelected()||n.getIsSomeSelected())},e.getToggleAllRowsSelectedHandler=()=>t=>{e.toggleAllRowsSelected(t.target.checked)},e.getToggleAllPageRowsSelectedHandler=()=>t=>{e.toggleAllPageRowsSelected(t.target.checked)}},createRow:(e,t)=>{e.toggleSelected=(n,r)=>{const o=e.getIsSelected();t.setRowSelection(i=>{var s;if(n=typeof n<"u"?n:!o,e.getCanSelect()&&o===n)return i;const a={...i};return lo(a,e.id,n,(s=r==null?void 0:r.selectChildren)!=null?s:!0,t),a})},e.getIsSelected=()=>{const{rowSelection:n}=t.getState();return Go(e,n)},e.getIsSomeSelected=()=>{const{rowSelection:n}=t.getState();return uo(e,n)==="some"},e.getIsAllSubRowsSelected=()=>{const{rowSelection:n}=t.getState();return uo(e,n)==="all"},e.getCanSelect=()=>{var n;return typeof t.options.enableRowSelection=="function"?t.options.enableRowSelection(e):(n=t.options.enableRowSelection)!=null?n:!0},e.getCanSelectSubRows=()=>{var n;return typeof t.options.enableSubRowSelection=="function"?t.options.enableSubRowSelection(e):(n=t.options.enableSubRowSelection)!=null?n:!0},e.getCanMultiSelect=()=>{var n;return typeof t.options.enableMultiRowSelection=="function"?t.options.enableMultiRowSelection(e):(n=t.options.enableMultiRowSelection)!=null?n:!0},e.getToggleSelectedHandler=()=>{const n=e.getCanSelect();return r=>{var o;n&&e.toggleSelected((o=r.target)==null?void 0:o.checked)}}}},lo=(e,t,n,r,o)=>{var i;const s=o.getRow(t,!0);n?(s.getCanMultiSelect()||Object.keys(e).forEach(a=>delete e[a]),s.getCanSelect()&&(e[t]=!0)):delete e[t],r&&(i=s.subRows)!=null&&i.length&&s.getCanSelectSubRows()&&s.subRows.forEach(a=>lo(e,a.id,n,r,o))};function Ur(e,t){const n=e.getState().rowSelection,r=[],o={},i=function(s,a){return s.map(l=>{var d;const c=Go(l,n);if(c&&(r.push(l),o[l.id]=l),(d=l.subRows)!=null&&d.length&&(l={...l,subRows:i(l.subRows)}),c)return l}).filter(Boolean)};return{rows:i(t.rows),flatRows:r,rowsById:o}}function Go(e,t){var n;return(n=t[e.id])!=null?n:!1}function uo(e,t,n){var r;if(!((r=e.subRows)!=null&&r.length))return!1;let o=!0,i=!1;return e.subRows.forEach(s=>{if(!(i&&!o)&&(s.getCanSelect()&&(Go(s,t)?i=!0:o=!1),s.subRows&&s.subRows.length)){const a=uo(s,t);a==="all"?i=!0:(a==="some"&&(i=!0),o=!1)}}),o?"all":i?"some":!1}const co=/([0-9]+)/gm,Nm=(e,t,n)=>La(ft(e.getValue(n)).toLowerCase(),ft(t.getValue(n)).toLowerCase()),Pm=(e,t,n)=>La(ft(e.getValue(n)),ft(t.getValue(n))),_m=(e,t,n)=>Uo(ft(e.getValue(n)).toLowerCase(),ft(t.getValue(n)).toLowerCase()),$m=(e,t,n)=>Uo(ft(e.getValue(n)),ft(t.getValue(n))),Mm=(e,t,n)=>{const r=e.getValue(n),o=t.getValue(n);return r>o?1:r<o?-1:0},Im=(e,t,n)=>Uo(e.getValue(n),t.getValue(n));function Uo(e,t){return e===t?0:e>t?1:-1}function ft(e){return typeof e=="number"?isNaN(e)||e===1/0||e===-1/0?"":String(e):typeof e=="string"?e:""}function La(e,t){const n=e.split(co).filter(Boolean),r=t.split(co).filter(Boolean);for(;n.length&&r.length;){const o=n.shift(),i=r.shift(),s=parseInt(o,10),a=parseInt(i,10),l=[s,a].sort();if(isNaN(l[0])){if(o>i)return 1;if(i>o)return-1;continue}if(isNaN(l[1]))return isNaN(s)?-1:1;if(s>a)return 1;if(a>s)return-1}return n.length-r.length}const un={alphanumeric:Nm,alphanumericCaseSensitive:Pm,text:_m,textCaseSensitive:$m,datetime:Mm,basic:Im},Am={getInitialState:e=>({sorting:[],...e}),getDefaultColumnDef:()=>({sortingFn:"auto",sortUndefined:1}),getDefaultOptions:e=>({onSortingChange:Ve("sorting",e),isMultiSortEvent:t=>t.shiftKey}),createColumn:(e,t)=>{e.getAutoSortingFn=()=>{const n=t.getFilteredRowModel().flatRows.slice(10);let r=!1;for(const o of n){const i=o==null?void 0:o.getValue(e.id);if(Object.prototype.toString.call(i)==="[object Date]")return un.datetime;if(typeof i=="string"&&(r=!0,i.split(co).length>1))return un.alphanumeric}return r?un.text:un.basic},e.getAutoSortDir=()=>{const n=t.getFilteredRowModel().flatRows[0];return typeof(n==null?void 0:n.getValue(e.id))=="string"?"asc":"desc"},e.getSortingFn=()=>{var n,r;if(!e)throw new Error;return ir(e.columnDef.sortingFn)?e.columnDef.sortingFn:e.columnDef.sortingFn==="auto"?e.getAutoSortingFn():(n=(r=t.options.sortingFns)==null?void 0:r[e.columnDef.sortingFn])!=null?n:un[e.columnDef.sortingFn]},e.toggleSorting=(n,r)=>{const o=e.getNextSortingOrder(),i=typeof n<"u"&&n!==null;t.setSorting(s=>{const a=s==null?void 0:s.find(g=>g.id===e.id),l=s==null?void 0:s.findIndex(g=>g.id===e.id);let d=[],c,p=i?n:o==="desc";if(s!=null&&s.length&&e.getCanMultiSort()&&r?a?c="toggle":c="add":s!=null&&s.length&&l!==s.length-1?c="replace":a?c="toggle":c="replace",c==="toggle"&&(i||o||(c="remove")),c==="add"){var f;d=[...s,{id:e.id,desc:p}],d.splice(0,d.length-((f=t.options.maxMultiSortColCount)!=null?f:Number.MAX_SAFE_INTEGER))}else c==="toggle"?d=s.map(g=>g.id===e.id?{...g,desc:p}:g):c==="remove"?d=s.filter(g=>g.id!==e.id):d=[{id:e.id,desc:p}];return d})},e.getFirstSortDir=()=>{var n,r;return((n=(r=e.columnDef.sortDescFirst)!=null?r:t.options.sortDescFirst)!=null?n:e.getAutoSortDir()==="desc")?"desc":"asc"},e.getNextSortingOrder=n=>{var r,o;const i=e.getFirstSortDir(),s=e.getIsSorted();return s?s!==i&&((r=t.options.enableSortingRemoval)==null||r)&&(!(n&&(o=t.options.enableMultiRemove)!=null)||o)?!1:s==="desc"?"asc":"desc":i},e.getCanSort=()=>{var n,r;return((n=e.columnDef.enableSorting)!=null?n:!0)&&((r=t.options.enableSorting)!=null?r:!0)&&!!e.accessorFn},e.getCanMultiSort=()=>{var n,r;return(n=(r=e.columnDef.enableMultiSort)!=null?r:t.options.enableMultiSort)!=null?n:!!e.accessorFn},e.getIsSorted=()=>{var n;const r=(n=t.getState().sorting)==null?void 0:n.find(o=>o.id===e.id);return r?r.desc?"desc":"asc":!1},e.getSortIndex=()=>{var n,r;return(n=(r=t.getState().sorting)==null?void 0:r.findIndex(o=>o.id===e.id))!=null?n:-1},e.clearSorting=()=>{t.setSorting(n=>n!=null&&n.length?n.filter(r=>r.id!==e.id):[])},e.getToggleSortingHandler=()=>{const n=e.getCanSort();return r=>{n&&(r.persist==null||r.persist(),e.toggleSorting==null||e.toggleSorting(void 0,e.getCanMultiSort()?t.options.isMultiSortEvent==null?void 0:t.options.isMultiSortEvent(r):!1))}}},createTable:e=>{e.setSorting=t=>e.options.onSortingChange==null?void 0:e.options.onSortingChange(t),e.resetSorting=t=>{var n,r;e.setSorting(t?[]:(n=(r=e.initialState)==null?void 0:r.sorting)!=null?n:[])},e.getPreSortedRowModel=()=>e.getGroupedRowModel(),e.getSortedRowModel=()=>(!e._getSortedRowModel&&e.options.getSortedRowModel&&(e._getSortedRowModel=e.options.getSortedRowModel(e)),e.options.manualSorting||!e._getSortedRowModel?e.getPreSortedRowModel():e._getSortedRowModel())}},Dm={getInitialState:e=>({columnVisibility:{},...e}),getDefaultOptions:e=>({onColumnVisibilityChange:Ve("columnVisibility",e)}),createColumn:(e,t)=>{e.toggleVisibility=n=>{e.getCanHide()&&t.setColumnVisibility(r=>({...r,[e.id]:n??!e.getIsVisible()}))},e.getIsVisible=()=>{var n,r;return(n=(r=t.getState().columnVisibility)==null?void 0:r[e.id])!=null?n:!0},e.getCanHide=()=>{var n,r;return((n=e.columnDef.enableHiding)!=null?n:!0)&&((r=t.options.enableHiding)!=null?r:!0)},e.getToggleVisibilityHandler=()=>n=>{e.toggleVisibility==null||e.toggleVisibility(n.target.checked)}},createRow:(e,t)=>{e._getAllVisibleCells=te(()=>[e.getAllCells(),t.getState().columnVisibility],n=>n.filter(r=>r.column.getIsVisible()),{key:process.env.NODE_ENV==="production"&&"row._getAllVisibleCells",debug:()=>{var n;return(n=t.options.debugAll)!=null?n:t.options.debugRows}}),e.getVisibleCells=te(()=>[e.getLeftVisibleCells(),e.getCenterVisibleCells(),e.getRightVisibleCells()],(n,r,o)=>[...n,...r,...o],{key:process.env.NODE_ENV==="development"&&"row.getVisibleCells",debug:()=>{var n;return(n=t.options.debugAll)!=null?n:t.options.debugRows}})},createTable:e=>{const t=(n,r)=>te(()=>[r(),r().filter(o=>o.getIsVisible()).map(o=>o.id).join("_")],o=>o.filter(i=>i.getIsVisible==null?void 0:i.getIsVisible()),{key:n,debug:()=>{var o;return(o=e.options.debugAll)!=null?o:e.options.debugColumns}});e.getVisibleFlatColumns=t("getVisibleFlatColumns",()=>e.getAllFlatColumns()),e.getVisibleLeafColumns=t("getVisibleLeafColumns",()=>e.getAllLeafColumns()),e.getLeftVisibleLeafColumns=t("getLeftVisibleLeafColumns",()=>e.getLeftLeafColumns()),e.getRightVisibleLeafColumns=t("getRightVisibleLeafColumns",()=>e.getRightLeafColumns()),e.getCenterVisibleLeafColumns=t("getCenterVisibleLeafColumns",()=>e.getCenterLeafColumns()),e.setColumnVisibility=n=>e.options.onColumnVisibilityChange==null?void 0:e.options.onColumnVisibilityChange(n),e.resetColumnVisibility=n=>{var r;e.setColumnVisibility(n?{}:(r=e.initialState.columnVisibility)!=null?r:{})},e.toggleAllColumnsVisible=n=>{var r;n=(r=n)!=null?r:!e.getIsAllColumnsVisible(),e.setColumnVisibility(e.getAllLeafColumns().reduce((o,i)=>({...o,[i.id]:n||!(i.getCanHide!=null&&i.getCanHide())}),{}))},e.getIsAllColumnsVisible=()=>!e.getAllLeafColumns().some(n=>!(n.getIsVisible!=null&&n.getIsVisible())),e.getIsSomeColumnsVisible=()=>e.getAllLeafColumns().some(n=>n.getIsVisible==null?void 0:n.getIsVisible()),e.getToggleAllColumnsVisibilityHandler=()=>n=>{var r;e.toggleAllColumnsVisible((r=n.target)==null?void 0:r.checked)}}},ss=[um,Dm,Rm,Tm,fm,Am,Sm,pm,km,Om,cm];function jm(e){var t;(e.debugAll||e.debugTable)&&console.info("Creating Table Instance...");let n={_features:ss};const r=n._features.reduce((c,p)=>Object.assign(c,p.getDefaultOptions==null?void 0:p.getDefaultOptions(n)),{}),o=c=>n.options.mergeOptions?n.options.mergeOptions(r,c):{...r,...c};let s={...{},...(t=e.initialState)!=null?t:{}};n._features.forEach(c=>{var p;s=(p=c.getInitialState==null?void 0:c.getInitialState(s))!=null?p:s});const a=[];let l=!1;const d={_features:ss,options:{...r,...e},initialState:s,_queue:c=>{a.push(c),l||(l=!0,Promise.resolve().then(()=>{for(;a.length;)a.shift()();l=!1}).catch(p=>setTimeout(()=>{throw p})))},reset:()=>{n.setState(n.initialState)},setOptions:c=>{const p=pt(c,n.options);n.options=o(p)},getState:()=>n.options.state,setState:c=>{n.options.onStateChange==null||n.options.onStateChange(c)},_getRowId:(c,p,f)=>{var g;return(g=n.options.getRowId==null?void 0:n.options.getRowId(c,p,f))!=null?g:`${f?[f.id,p].join("."):p}`},getCoreRowModel:()=>(n._getCoreRowModel||(n._getCoreRowModel=n.options.getCoreRowModel(n)),n._getCoreRowModel()),getRowModel:()=>n.getPaginationRowModel(),getRow:(c,p)=>{let f=(p?n.getPrePaginationRowModel():n.getRowModel()).rowsById[c];if(!f&&(f=n.getCoreRowModel().rowsById[c],!f))throw process.env.NODE_ENV!=="production"?new Error(`getRow could not find row with ID: ${c}`):new Error;return f},_getDefaultColumnDef:te(()=>[n.options.defaultColumn],c=>{var p;return c=(p=c)!=null?p:{},{header:f=>{const g=f.header.column.columnDef;return g.accessorKey?g.accessorKey:g.accessorFn?g.id:null},cell:f=>{var g,h;return(g=(h=f.renderValue())==null||h.toString==null?void 0:h.toString())!=null?g:null},...n._features.reduce((f,g)=>Object.assign(f,g.getDefaultColumnDef==null?void 0:g.getDefaultColumnDef()),{}),...c}},{debug:()=>{var c;return(c=n.options.debugAll)!=null?c:n.options.debugColumns},key:process.env.NODE_ENV==="development"&&"getDefaultColumnDef"}),_getColumnDefs:()=>n.options.columns,getAllColumns:te(()=>[n._getColumnDefs()],c=>{const p=function(f,g,h){return h===void 0&&(h=0),f.map(m=>{const v=lm(n,m,h,g),w=m;return v.columns=w.columns?p(w.columns,v,h+1):[],v})};return p(c)},{key:process.env.NODE_ENV==="development"&&"getAllColumns",debug:()=>{var c;return(c=n.options.debugAll)!=null?c:n.options.debugColumns}}),getAllFlatColumns:te(()=>[n.getAllColumns()],c=>c.flatMap(p=>p.getFlatColumns()),{key:process.env.NODE_ENV==="development"&&"getAllFlatColumns",debug:()=>{var c;return(c=n.options.debugAll)!=null?c:n.options.debugColumns}}),_getAllFlatColumnsById:te(()=>[n.getAllFlatColumns()],c=>c.reduce((p,f)=>(p[f.id]=f,p),{}),{key:process.env.NODE_ENV==="development"&&"getAllFlatColumnsById",debug:()=>{var c;return(c=n.options.debugAll)!=null?c:n.options.debugColumns}}),getAllLeafColumns:te(()=>[n.getAllColumns(),n._getOrderColumnsFn()],(c,p)=>{let f=c.flatMap(g=>g.getLeafColumns());return p(f)},{key:process.env.NODE_ENV==="development"&&"getAllLeafColumns",debug:()=>{var c;return(c=n.options.debugAll)!=null?c:n.options.debugColumns}}),getColumn:c=>{const p=n._getAllFlatColumnsById()[c];return process.env.NODE_ENV!=="production"&&!p&&console.error(`[Table] Column with id '${c}' does not exist.`),p}};Object.assign(n,d);for(let c=0;c<n._features.length;c++){const p=n._features[c];p==null||p.createTable==null||p.createTable(n)}return n}function Fm(e,t,n,r){const o=()=>{var s;return(s=i.getValue())!=null?s:e.options.renderFallbackValue},i={id:`${t.id}_${n.id}`,row:t,column:n,getValue:()=>t.getValue(r),renderValue:o,getContext:te(()=>[e,n,t,i],(s,a,l,d)=>({table:s,column:a,row:l,cell:d,getValue:d.getValue,renderValue:d.renderValue}),{key:process.env.NODE_ENV==="development"&&"cell.getContext",debug:()=>e.options.debugAll})};return e._features.forEach(s=>{s.createCell==null||s.createCell(i,n,t,e)},{}),i}const Ba=(e,t,n,r,o,i,s)=>{let a={id:t,index:r,original:n,depth:o,parentId:s,_valuesCache:{},_uniqueValuesCache:{},getValue:l=>{if(a._valuesCache.hasOwnProperty(l))return a._valuesCache[l];const d=e.getColumn(l);if(d!=null&&d.accessorFn)return a._valuesCache[l]=d.accessorFn(a.original,r),a._valuesCache[l]},getUniqueValues:l=>{if(a._uniqueValuesCache.hasOwnProperty(l))return a._uniqueValuesCache[l];const d=e.getColumn(l);if(d!=null&&d.accessorFn)return d.columnDef.getUniqueValues?(a._uniqueValuesCache[l]=d.columnDef.getUniqueValues(a.original,r),a._uniqueValuesCache[l]):(a._uniqueValuesCache[l]=[a.getValue(l)],a._uniqueValuesCache[l])},renderValue:l=>{var d;return(d=a.getValue(l))!=null?d:e.options.renderFallbackValue},subRows:i??[],getLeafRows:()=>_a(a.subRows,l=>l.subRows),getParentRow:()=>a.parentId?e.getRow(a.parentId,!0):void 0,getParentRows:()=>{let l=[],d=a;for(;;){const c=d.getParentRow();if(!c)break;l.push(c),d=c}return l.reverse()},getAllCells:te(()=>[e.getAllLeafColumns()],l=>l.map(d=>Fm(e,a,d,d.id)),{key:process.env.NODE_ENV==="development"&&"row.getAllCells",debug:()=>{var l;return(l=e.options.debugAll)!=null?l:e.options.debugRows}}),_getAllCellsByColumnId:te(()=>[a.getAllCells()],l=>l.reduce((d,c)=>(d[c.column.id]=c,d),{}),{key:process.env.NODE_ENV==="production"&&"row.getAllCellsByColumnId",debug:()=>{var l;return(l=e.options.debugAll)!=null?l:e.options.debugRows}})};for(let l=0;l<e._features.length;l++){const d=e._features[l];d==null||d.createRow==null||d.createRow(a,e)}return a};function Vm(){return e=>te(()=>[e.options.data],t=>{const n={rows:[],flatRows:[],rowsById:{}},r=function(o,i,s){i===void 0&&(i=0);const a=[];for(let d=0;d<o.length;d++){const c=Ba(e,e._getRowId(o[d],d,s),o[d],d,i,void 0,s==null?void 0:s.id);if(n.flatRows.push(c),n.rowsById[c.id]=c,a.push(c),e.options.getSubRows){var l;c.originalSubRows=e.options.getSubRows(o[d],d),(l=c.originalSubRows)!=null&&l.length&&(c.subRows=r(c.originalSubRows,i+1,c))}}return a};return n.rows=r(t),n},{key:process.env.NODE_ENV==="development"&&"getRowModel",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugTable},onChange:()=>{e._autoResetPageIndex()}})}function Lm(){return e=>te(()=>[e.getState().sorting,e.getPreSortedRowModel()],(t,n)=>{if(!n.rows.length||!(t!=null&&t.length))return n;const r=e.getState().sorting,o=[],i=r.filter(l=>{var d;return(d=e.getColumn(l.id))==null?void 0:d.getCanSort()}),s={};i.forEach(l=>{const d=e.getColumn(l.id);d&&(s[l.id]={sortUndefined:d.columnDef.sortUndefined,invertSorting:d.columnDef.invertSorting,sortingFn:d.getSortingFn()})});const a=l=>{const d=l.map(c=>({...c}));return d.sort((c,p)=>{for(let g=0;g<i.length;g+=1){var f;const h=i[g],m=s[h.id],v=(f=h==null?void 0:h.desc)!=null?f:!1;let w=0;if(m.sortUndefined){const _=c.getValue(h.id),x=p.getValue(h.id),E=_===void 0,b=x===void 0;(E||b)&&(w=E&&b?0:E?m.sortUndefined:-m.sortUndefined)}if(w===0&&(w=m.sortingFn(c,p,h.id)),w!==0)return v&&(w*=-1),m.invertSorting&&(w*=-1),w}return c.index-p.index}),d.forEach(c=>{var p;o.push(c),(p=c.subRows)!=null&&p.length&&(c.subRows=a(c.subRows))}),d};return{rows:a(n.rows),flatRows:o,rowsById:n.rowsById}},{key:process.env.NODE_ENV==="development"&&"getSortedRowModel",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugTable},onChange:()=>{e._autoResetPageIndex()}})}function Bm(){return e=>te(()=>[e.getState().grouping,e.getPreGroupedRowModel()],(t,n)=>{if(!n.rows.length||!t.length)return n;const r=t.filter(l=>e.getColumn(l)),o=[],i={},s=function(l,d,c){if(d===void 0&&(d=0),d>=r.length)return l.map(h=>(h.depth=d,o.push(h),i[h.id]=h,h.subRows&&(h.subRows=s(h.subRows,d+1,h.id)),h));const p=r[d],f=zm(l,p);return Array.from(f.entries()).map((h,m)=>{let[v,w]=h,_=`${p}:${v}`;_=c?`${c}>${_}`:_;const x=s(w,d+1,_),E=d?_a(w,R=>R.subRows):w,b=Ba(e,_,E[0].original,m,d,void 0,c);return Object.assign(b,{groupingColumnId:p,groupingValue:v,subRows:x,leafRows:E,getValue:R=>{if(r.includes(R)){if(b._valuesCache.hasOwnProperty(R))return b._valuesCache[R];if(w[0]){var P;b._valuesCache[R]=(P=w[0].getValue(R))!=null?P:void 0}return b._valuesCache[R]}if(b._groupingValuesCache.hasOwnProperty(R))return b._groupingValuesCache[R];const j=e.getColumn(R),F=j==null?void 0:j.getAggregationFn();if(F)return b._groupingValuesCache[R]=F(R,E,w),b._groupingValuesCache[R]}}),x.forEach(R=>{o.push(R),i[R.id]=R}),b})},a=s(n.rows,0);return a.forEach(l=>{o.push(l),i[l.id]=l}),{rows:a,flatRows:o,rowsById:i}},{key:process.env.NODE_ENV==="development"&&"getGroupedRowModel",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugTable},onChange:()=>{e._queue(()=>{e._autoResetExpanded(),e._autoResetPageIndex()})}})}function zm(e,t){const n=new Map;return e.reduce((r,o)=>{const i=`${o.getGroupingValue(t)}`,s=r.get(i);return s?s.push(o):r.set(i,[o]),r},n)}function Hm(){return e=>te(()=>[e.getState().expanded,e.getPreExpandedRowModel(),e.options.paginateExpandedRows],(t,n,r)=>!n.rows.length||t!==!0&&!Object.keys(t??{}).length||!r?n:Gm(n),{key:process.env.NODE_ENV==="development"&&"getExpandedRowModel",debug:()=>{var t;return(t=e.options.debugAll)!=null?t:e.options.debugTable}})}function Gm(e){const t=[],n=r=>{var o;t.push(r),(o=r.subRows)!=null&&o.length&&r.getIsExpanded()&&r.subRows.forEach(n)};return e.rows.forEach(n),{rows:t,flatRows:e.flatRows,rowsById:e.rowsById}}/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function qr(e,t){return e?Um(e)?S.createElement(e,t):e:null}function Um(e){return qm(e)||typeof e=="function"||Wm(e)}function qm(e){return typeof e=="function"&&(()=>{const t=Object.getPrototypeOf(e);return t.prototype&&t.prototype.isReactComponent})()}function Wm(e){return typeof e=="object"&&typeof e.$$typeof=="symbol"&&["react.memo","react.forward_ref"].includes(e.$$typeof.description)}function Xm(e){const t={state:{},onStateChange:()=>{},renderFallbackValue:null,...e},[n]=S.useState(()=>({current:jm(t)})),[r,o]=S.useState(()=>n.current.initialState);return n.current.setOptions(i=>({...i,...e,state:{...r,...e.state},onStateChange:s=>{o(s),e.onStateChange==null||e.onStateChange(s)}})),n.current}const Ym=ye.Root,Km=ye.Group,Jm=ye.Value,za=S.forwardRef(({className:e,children:t,...n},r)=>y.jsxs(ye.Trigger,{ref:r,className:ne("pr-flex pr-h-10 pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...n,children:[t,y.jsx(ye.Icon,{asChild:!0,children:y.jsx(We.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));za.displayName=ye.Trigger.displayName;const Ha=S.forwardRef(({className:e,...t},n)=>y.jsx(ye.ScrollUpButton,{ref:n,className:ne("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:y.jsx(We.ChevronUp,{className:"pr-h-4 pr-w-4"})}));Ha.displayName=ye.ScrollUpButton.displayName;const Ga=S.forwardRef(({className:e,...t},n)=>y.jsx(ye.ScrollDownButton,{ref:n,className:ne("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:y.jsx(We.ChevronDown,{className:"pr-h-4 pr-w-4"})}));Ga.displayName=ye.ScrollDownButton.displayName;const Ua=S.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>y.jsx(ye.Portal,{children:y.jsxs(ye.Content,{ref:o,className:ne("pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:n,...r,children:[y.jsx(Ha,{}),y.jsx(ye.Viewport,{className:ne("pr-p-1",n==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),y.jsx(Ga,{})]})}));Ua.displayName=ye.Content.displayName;const Zm=S.forwardRef(({className:e,...t},n)=>y.jsx(ye.Label,{ref:n,className:ne("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));Zm.displayName=ye.Label.displayName;const qa=S.forwardRef(({className:e,children:t,...n},r)=>y.jsxs(ye.Item,{ref:r,className:ne("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[y.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:y.jsx(ye.ItemIndicator,{children:y.jsx(We.Check,{className:"pr-h-4 pr-w-4"})})}),y.jsx(ye.ItemText,{children:t})]}));qa.displayName=ye.Item.displayName;const Qm=S.forwardRef(({className:e,...t},n)=>y.jsx(ye.Separator,{ref:n,className:ne("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Qm.displayName=ye.Separator.displayName;const Wa=S.forwardRef(({className:e,...t},n)=>y.jsx("div",{className:"pr-relative pr-w-full pr-overflow-auto",children:y.jsx("table",{ref:n,className:ne("pr-w-full pr-caption-bottom pr-text-sm",e),...t})}));Wa.displayName="Table";const Xa=S.forwardRef(({className:e,...t},n)=>y.jsx("thead",{ref:n,className:ne("[&_tr]:pr-border-b",e),...t}));Xa.displayName="TableHeader";const Ya=S.forwardRef(({className:e,...t},n)=>y.jsx("tbody",{ref:n,className:ne("[&_tr:last-child]:pr-border-0",e),...t}));Ya.displayName="TableBody";const eh=S.forwardRef(({className:e,...t},n)=>y.jsx("tfoot",{ref:n,className:ne("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));eh.displayName="TableFooter";const po=S.forwardRef(({className:e,...t},n)=>y.jsx("tr",{ref:n,className:ne("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));po.displayName="TableRow";const Ka=S.forwardRef(({className:e,...t},n)=>y.jsx("th",{ref:n,className:ne("pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",e),...t}));Ka.displayName="TableHead";const Ja=S.forwardRef(({className:e,...t},n)=>y.jsx("td",{ref:n,className:ne("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0",e),...t}));Ja.displayName="TableCell";const th=S.forwardRef(({className:e,...t},n)=>y.jsx("caption",{ref:n,className:ne("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));th.displayName="TableCaption";const Lt="scrBook",nh="scrRef",gn="source",rh="details",oh="Scripture Reference",ih="Scripture Book",Za="Type",sh="Details";function ah(e,t){const n=t??!1;return[{accessorFn:r=>`${le.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:Lt,header:(e==null?void 0:e.scriptureReferenceColumnName)??oh,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?le.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===Lt?Ce.format(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>Ce.compare(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>Ce.format(r.start),id:nh,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:Ce.format(o.start)},sortingFn:(r,o)=>Ce.compare(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>typeof r.source=="object"&&"displayName"in r.source?r.source.displayName:r.source,id:gn,header:n?(e==null?void 0:e.typeColumnName)??Za:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,enableGrouping:!0},{accessorFn:r=>r.detail,id:rh,header:(e==null?void 0:e.detailsColumnName)??sh,cell:r=>r.getValue(),enableGrouping:!1}]}function lh({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:i,detailsColumnName:s,onRowSelected:a}){const[l,d]=I.useState([]),[c,p]=I.useState([{id:Lt,desc:!1}]),[f,g]=I.useState(()=>e.flatMap(C=>{const k=C.checkDefinition??C.id;return C.data.map($=>({...$,source:k}))})),[h,m]=I.useState({});I.useEffect(()=>{const C=k=>{const{detail:$}=k,D=$,A=D.checkDefinition??D.id,z=D.data.map(J=>({...J,source:A}));$!==void 0&&g(J=>[...J.filter(O=>O.source!==A),...z])};return e.forEach(k=>{k.resultsUpdated.addEventListener("resultsUpdated",C)}),()=>{e.forEach(k=>{k.resultsUpdated.removeEventListener("resultsUpdated",C)})}},[e]);const v=I.useMemo(()=>ah({scriptureReferenceColumnName:r,typeColumnName:i,detailsColumnName:s},n),[r,i,s,n]);function w(C){return C.bookNum*1e6+C.chapterNum*1e3+C.verseNum}const _=I.useCallback((C,k)=>!k||Ce.compare(C,k)===0?`${w(C)}`:`${w(C)}-${w(k)}`,[]),x=I.useCallback(C=>`${_(C.start,C.end)} ${C.source} ${C.detail}`,[_]),E=Xm({data:f,columns:v,state:{grouping:l,sorting:c,rowSelection:h},onGroupingChange:d,onSortingChange:p,onRowSelectionChange:m,getExpandedRowModel:Hm(),getGroupedRowModel:Bm(),getCoreRowModel:Vm(),getSortedRowModel:Lm(),getRowId:x,enableMultiRowSelection:!1,enableSubRowSelection:!1});I.useEffect(()=>{if(a){const C=E.getSelectedRowModel().rowsById,k=Object.keys(C);if(k.length===1){const $=f.find(D=>x(D)===k[0])||void 0;$&&a($)}}},[h,f,x,a,E]);const b=o??ih,R=i??Za,P=[{label:"No Grouping",value:[]},{label:`Group by ${b}`,value:[Lt]},{label:`Group by ${R}`,value:[gn]},{label:`Group by ${b} and ${R}`,value:[Lt,gn]},{label:`Group by ${R} and ${b}`,value:[gn,Lt]}],j=C=>{d(JSON.parse(C))},F=(C,k)=>{!C.getIsGrouped()&&!C.getIsSelected()&&C.getToggleSelectedHandler()(k)},B=(C,k)=>C.getIsGrouped()?"":ne("banded-row",k%2===0?"even":"odd"),N=(C,k,$)=>{if((C==null?void 0:C.length)!==0)return k.depth>=$.column.getGroupedIndex()?` pr-px-${k.depth*4}`:void 0};return y.jsxs("div",{className:"pr-twp pr-w-full",children:[!t&&y.jsxs(Ym,{value:JSON.stringify(l),onValueChange:C=>{j(C)},children:[y.jsx(za,{className:"pr-mb-1 pr-mt-2",children:y.jsx(Jm,{})}),y.jsx(Ua,{position:"item-aligned",children:y.jsx(Km,{children:P.map(C=>y.jsx(qa,{value:JSON.stringify(C.value),children:C.label},C.label))})})]}),y.jsxs(Wa,{className:"pr-p-0",children:[t&&y.jsx(Xa,{children:E.getHeaderGroups().map(C=>y.jsx(po,{children:C.headers.filter(k=>k.column.columnDef.header).map(k=>y.jsx(Ka,{colSpan:k.colSpan,children:k.isPlaceholder?void 0:y.jsxs("div",{children:[k.column.getCanGroup()?y.jsx(Xn,{title:`Toggle grouping by ${k.column.columnDef.header}`,onClick:k.column.getToggleGroupingHandler(),style:{cursor:"pointer"},type:"button",children:k.column.getIsGrouped()?`🛑(${k.column.getGroupedIndex()}) `:"👊 "}):void 0," ",qr(k.column.columnDef.header,k.getContext())]})},k.id))},C.id))}),y.jsx(Ya,{children:E.getRowModel().rows.map((C,k)=>y.jsx(po,{"data-state":C.getIsSelected()?"selected":"",className:ne(B(C,k)),onClick:$=>F(C,$),children:C.getVisibleCells().map($=>{if(!($.getIsPlaceholder()||$.column.columnDef.enableGrouping&&!$.getIsGrouped()&&($.column.columnDef.id!==gn||!n)))return y.jsx(Ja,{className:ne($.column.columnDef.id,"pr-p-[1px]",N(l,C,$)),children:(()=>$.getIsGrouped()?y.jsxs(Xn,{onClick:C.getToggleExpandedHandler(),style:{cursor:C.getCanExpand()?"pointer":"normal"},type:"button",children:[C.getIsExpanded()?"👇":"👉"," ",qr($.column.columnDef.cell,$.getContext())," (",C.subRows.length,")"]}):qr($.column.columnDef.cell,$.getContext()))()},$.id)})},C.id))})]})]})}function uh({onSearch:e,placeholder:t}){const[n,r]=I.useState(""),o=i=>{r(i),e(i)};return y.jsx(he.Paper,{component:"form",className:"search-bar-paper",children:y.jsx(Rn,{className:"search-bar-input",placeholder:t,value:n,onChange:i=>o(i.target.value)})})}function ch({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:s=!1,defaultValue:a,value:l,valueLabelDisplay:d="off",className:c,onChange:p,onChangeCommitted:f}){return y.jsx(he.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:s,defaultValue:a,value:l,valueLabelDisplay:d,className:`papi-slider ${n} ${c??""}`,onChange:p,onChangeCommitted:f})}function dh({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:s,children:a}){const l={action:(s==null?void 0:s.action)||a,message:s==null?void 0:s.message,className:r};return y.jsx(he.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:l})}function ph({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return y.jsx(he.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function as({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return y.jsx(Rn,{defaultValue:t[n.key],onChange:r})}const fh=({onChange:e,disabled:t,checked:n,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return y.jsx(yo,{...r,isChecked:n,isDisabled:t,onChange:o})};function gh({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:s,defaultColumnSortable:a=!0,defaultColumnResizable:l=!0,rows:d,enableSelectColumn:c,selectColumnWidth:p=50,rowKeyGetter:f,rowHeight:g=35,headerRowHeight:h=35,selectedRows:m,onSelectedRowsChange:v,onRowsChange:w,onCellClick:_,onCellDoubleClick:x,onCellContextMenu:E,onCellKeyDown:b,direction:R="ltr",enableVirtualization:P=!0,onCopy:j,onPaste:F,onScroll:B,className:N,"data-testid":C}){const k=I.useMemo(()=>{const $=e.map(D=>typeof D.editable=="function"?{...D,editable:z=>!!D.editable(z),renderEditCell:D.renderEditCell||as}:D.editable&&!D.renderEditCell?{...D,renderEditCell:as}:D.renderEditCell&&!D.editable?{...D,editable:!1}:D);return c?[{...si.SelectColumn,minWidth:p},...$]:$},[e,c,p]);return y.jsx(si,{columns:k,defaultColumnOptions:{width:o,minWidth:i,maxWidth:s,sortable:a,resizable:l},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:d,rowKeyGetter:f,rowHeight:g,headerRowHeight:h,selectedRows:m,onSelectedRowsChange:v,onRowsChange:w,onCellClick:_,onCellDoubleClick:x,onCellContextMenu:E,onCellKeyDown:b,direction:R,enableVirtualization:P,onCopy:j,onPaste:F,onScroll:B,renderers:{renderCheckbox:fh},className:`papi-table ${N??"rdg-light"}`,"data-testid":C})}function mh({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const i=I.useRef(void 0);return y.jsx("div",{ref:i,style:{position:"relative"},children:y.jsx(he.AppBar,{position:"static",id:r,children:y.jsxs(he.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?y.jsx(Pa,{commandHandler:t,containerRef:i,menuProvider:e}):void 0,o?y.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const hh=(e,t)=>{I.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Wr=()=>!1,vh=(e,t)=>{const[n]=or(I.useCallback(async()=>{if(!e)return Wr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Wr,{preserveValue:!1});I.useEffect(()=>()=>{n!==Wr&&n()},[n])},bh=Me.Root,Qa=I.forwardRef(({className:e,...t},n)=>y.jsx(Me.List,{ref:n,className:ne("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Qa.displayName=Me.List.displayName;const el=I.forwardRef(({className:e,...t},n)=>y.jsx(Me.Trigger,{ref:n,className:ne("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));el.displayName=Me.Trigger.displayName;const tl=I.forwardRef(({className:e,...t},n)=>y.jsx(Me.Content,{ref:n,className:ne("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));tl.displayName=Me.Content.displayName;const nl=I.forwardRef(({className:e,...t},n)=>y.jsx(Me.Root,{orientation:"vertical",ref:n,className:ne("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));nl.displayName=Me.List.displayName;const rl=I.forwardRef(({className:e,...t},n)=>y.jsx(Me.List,{ref:n,className:ne("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));rl.displayName=Me.List.displayName;const yh=I.forwardRef(({className:e,...t},n)=>y.jsx(Me.Trigger,{ref:n,...t,className:ne("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),children:y.jsx("div",{className:"pr-flex pr-flex-col pr-justify-center",children:y.jsx("div",{children:t.value})})})),ol=I.forwardRef(({className:e,...t},n)=>y.jsx(Me.Content,{ref:n,className:ne("mt-2 pr-ml-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));ol.displayName=Me.Content.displayName;exports.BookChapterControl=Ql;exports.Button=yt;exports.ChapterRangeSelector=tu;exports.Checkbox=yo;exports.Checklist=nu;exports.ComboBox=Yn;exports.ContextMenu=Qg;exports.DropdownMenu=hs;exports.DropdownMenuCheckboxItem=ws;exports.DropdownMenuContent=ho;exports.DropdownMenuGroup=Fl;exports.DropdownMenuItem=vo;exports.DropdownMenuLabel=sr;exports.DropdownMenuPortal=Vl;exports.DropdownMenuRadioGroup=Bl;exports.DropdownMenuRadioItem=xs;exports.DropdownMenuSeparator=bo;exports.DropdownMenuShortcut=Es;exports.DropdownMenuSub=Ll;exports.DropdownMenuSubContent=ys;exports.DropdownMenuSubTrigger=bs;exports.DropdownMenuTrigger=vs;exports.GridMenu=ba;exports.HamburgerMenuButton=Pa;exports.IconButton=nm;exports.Input=ar;exports.Label=zo;exports.LabelPosition=Et;exports.MenuItem=Lo;exports.RefSelector=om;exports.ResultsSource=sm;exports.ScriptureRefKeyedList=lh;exports.SearchBar=uh;exports.Slider=ch;exports.Snackbar=dh;exports.Switch=ph;exports.Table=gh;exports.Tabs=bh;exports.TabsContent=tl;exports.TabsList=Qa;exports.TabsTrigger=el;exports.TextField=Rn;exports.Toolbar=mh;exports.VerticalTabs=nl;exports.VerticalTabsContent=ol;exports.VerticalTabsList=rl;exports.VerticalTabsTrigger=yh;exports.useEvent=hh;exports.useEventAsync=vh;exports.usePromise=or;function wh(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}wh(`.papi-checkbox {
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
.pr-mb-1 {
  margin-bottom: 0.25rem;
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
}
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state="selected"]:hover {
  cursor: default;
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
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
