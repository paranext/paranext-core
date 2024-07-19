"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const u=require("react/jsx-runtime"),T=require("react"),ca=require("platform-bible-utils"),pa=require("@radix-ui/react-dropdown-menu"),de=require("lucide-react"),Se=require("clsx"),_l=require("tailwind-merge"),yt=require("@tanstack/react-table"),Il=require("@radix-ui/react-slot"),po=require("class-variance-authority"),Al=require("@radix-ui/react-select"),ye=require("@mui/material"),Gr=require("@mui/styled-engine"),un=require("react-dom"),Dl=require("@radix-ui/react-label"),Bl=require("@radix-ui/react-tabs"),Ll=require("@radix-ui/react-slider"),Fl=require("@radix-ui/react-switch");function ft(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const k=ft(T),he=ft(pa),we=ft(Al),Vl=ft(un),ua=ft(Dl),_e=ft(Bl),dn=ft(Ll),Yr=ft(Fl);var zl=Object.defineProperty,Ul=(e,t,n)=>t in e?zl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t,n)=>Ul(e,typeof t!="symbol"?t+"":t,n);const Ot=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],uo=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],da=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],os=Ql();function Kt(e,t=!0){return t&&(e=e.toUpperCase()),e in os?os[e]:0}function fo(e){return Kt(e)>0}function Hl(e){const t=typeof e=="string"?Kt(e):e;return t>=40&&t<=66}function ql(e){return(typeof e=="string"?Kt(e):e)<=39}function fa(e){return e<=66}function Wl(e){const t=typeof e=="string"?Kt(e):e;return ga(t)&&!fa(t)}function*Xl(){for(let e=1;e<=Ot.length;e++)yield e}const Gl=1,ma=Ot.length;function Yl(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function mo(e,t="***"){const n=e-1;return n<0||n>=Ot.length?t:Ot[n]}function ha(e){return e<=0||e>ma?"******":da[e-1]}function Kl(e){return ha(Kt(e))}function ga(e){const t=typeof e=="number"?mo(e):e;return fo(t)&&!uo.includes(t)}function Jl(e){const t=typeof e=="number"?mo(e):e;return fo(t)&&uo.includes(t)}function Zl(e){return da[e-1].includes("*obsolete*")}function Ql(){const e={};for(let t=0;t<Ot.length;t++)e[Ot[t]]=t+1;return e}const me={allBookIds:Ot,nonCanonicalIds:uo,bookIdToNumber:Kt,isBookIdValid:fo,isBookNT:Hl,isBookOT:ql,isBookOTNT:fa,isBookDC:Wl,allBookNumbers:Xl,firstBook:Gl,lastBook:ma,extraBooks:Yl,bookNumberToId:mo,bookNumberToEnglishName:ha,bookIdToEnglishName:Kl,isCanonical:ga,isExtraMaterial:Jl,isObsolete:Zl};var Ge=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ge||{});const De=class{constructor(t){if(re(this,"name"),re(this,"fullPath"),re(this,"isPresent"),re(this,"hasVerseSegments"),re(this,"isCustomized"),re(this,"baseVersification"),re(this,"scriptureBooks"),re(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Ge[t]):(this._type=t,this.name=Ge[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};re(De,"Original",new De(Ge.Original)),re(De,"Septuagint",new De(Ge.Septuagint)),re(De,"Vulgate",new De(Ge.Vulgate)),re(De,"English",new De(Ge.English)),re(De,"RussianProtestant",new De(Ge.RussianProtestant)),re(De,"RussianOrthodox",new De(Ge.RussianOrthodox));let wt=De;function ss(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var ba=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(ba||{});const je=class ie{constructor(t,n,r,o){if(re(this,"firstChapter"),re(this,"lastChapter"),re(this,"lastVerse"),re(this,"hasSegmentsDefined"),re(this,"text"),re(this,"BBBCCCVVVS"),re(this,"longHashCode"),re(this,"versification"),re(this,"rtlMark","‏"),re(this,"_bookNum",0),re(this,"_chapterNum",0),re(this,"_verseNum",0),re(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const s=t,a=n!=null&&n instanceof wt?n:void 0;this.setEmpty(a),this.parse(s)}else if(t!=null&&typeof t=="number"){const s=n!=null&&n instanceof wt?n:void 0;this.setEmpty(s),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ie){const s=t;this._bookNum=s.bookNum,this._chapterNum=s.chapterNum,this._verseNum=s.verseNum,this._verse=s.verse,this.versification=s.versification}else{if(t==null)return;const s=t instanceof wt?t:ie.defaultVersification;this.setEmpty(s)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new ie(t),{success:!0,verseRef:n}}catch(r){if(r instanceof rn)return n=new ie,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ie.bcvMaxValue*ie.bookDigitShifter+(n>=0?n%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(r>=0?r%ie.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:s,versificationStr:a}=t,l=s||o.toString();let c;return a&&(c=new wt(a)),n?new ie(n,r.toString(),l,c):new ie}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>ie.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return me.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=me.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ie.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>me.lastBook)throw new rn("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new wt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const s=t.split("/");if(t=s[0],s.length>1)try{const a=+s[1].trim();this.versification=new wt(Ge[a])}catch{throw new rn("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new rn("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||me.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(r[1]))throw new rn("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;return(t===""||t===this.verseNum.toString())&&(t=void 0),{book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr}}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=ie.verseRangeSeparators,r=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],s=ss(this._verse,r);for(const a of s.map(l=>ss(l,n))){const l=this.clone();l.verse=a[0];const c=l.verseNum;if(o.push(l),a.length>1){const d=this.clone();if(d.verse=a[1],!t)for(let m=c+1;m<d.verseNum;m++){const v=new ie(this._bookNum,this._chapterNum,m,this.versification);this.isExcluded||o.push(v)}o.push(d)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const s=o.internalValid;if(s!==0)return s;const a=o.BBBCCCVVV;if(r>a)return 3;if(r===a)return 4;r=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>me.lastBook?2:(me.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=me.bookIdToNumber(t),this.chapter=n,this.verse=r}};re(je,"defaultVersification",wt.English),re(je,"verseRangeSeparator","-"),re(je,"verseSequenceIndicator",","),re(je,"verseRangeSeparators",[je.verseRangeSeparator]),re(je,"verseSequenceIndicators",[je.verseSequenceIndicator]),re(je,"chapterDigitShifter",1e3),re(je,"bookDigitShifter",je.chapterDigitShifter*je.chapterDigitShifter),re(je,"bcvMaxValue",je.chapterDigitShifter-1),re(je,"ValidStatusType",ba);let rn=class extends Error{};const ec=_l.extendTailwindMerge({prefix:"pr-"});function K(...e){return ec(Se.clsx(e))}const ho=he.Root,va=he.Trigger,tc=he.Group,nc=he.Portal,rc=he.Sub,oc=he.RadioGroup,ya=T.forwardRef(({className:e,inset:t,children:n,...r},o)=>u.jsxs(he.SubTrigger,{ref:o,className:K("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,u.jsx(de.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));ya.displayName=he.SubTrigger.displayName;const wa=T.forwardRef(({className:e,...t},n)=>u.jsx(he.SubContent,{ref:n,className:K("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));wa.displayName=he.SubContent.displayName;const cr=T.forwardRef(({className:e,sideOffset:t=4,...n},r)=>u.jsx(he.Portal,{children:u.jsx(he.Content,{ref:r,sideOffset:t,className:K("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));cr.displayName=he.Content.displayName;const go=T.forwardRef(({className:e,inset:t,...n},r)=>u.jsx(he.Item,{ref:r,className:K("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));go.displayName=he.Item.displayName;const bo=T.forwardRef(({className:e,children:t,checked:n,...r},o)=>u.jsxs(he.CheckboxItem,{ref:o,className:K("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[u.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:u.jsx(he.ItemIndicator,{children:u.jsx(de.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));bo.displayName=he.CheckboxItem.displayName;const xa=T.forwardRef(({className:e,children:t,...n},r)=>u.jsxs(he.RadioItem,{ref:r,className:K("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[u.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:u.jsx(he.ItemIndicator,{children:u.jsx(de.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));xa.displayName=he.RadioItem.displayName;const Pn=T.forwardRef(({className:e,inset:t,...n},r)=>u.jsx(he.Label,{ref:r,className:K("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));Pn.displayName=he.Label.displayName;const pr=T.forwardRef(({className:e,...t},n)=>u.jsx(he.Separator,{ref:n,className:K("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));pr.displayName=he.Separator.displayName;function Ea({className:e,...t}){return u.jsx("span",{className:K("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Ea.displayName="DropdownMenuShortcut";const Rn=T.forwardRef(({className:e,type:t,...n},r)=>u.jsx("input",{type:t,className:K("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));Rn.displayName="Input";const sc=T.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},s)=>u.jsxs("div",{className:"pr-relative",children:[u.jsx(Rn,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:a=>e(a.target.value),onKeyDown:a=>{a.key==="Enter"&&r(),t(a)},onClick:n,ref:s}),u.jsx(de.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function ac({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const s=Array.from({length:t},(l,c)=>c+1),a=T.useCallback(l=>{o(l)},[o]);return u.jsx("div",{className:K("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:s.map(l=>u.jsx("div",{className:K("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===n,"pr-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>a(l),children:l},l))})}const ic=T.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:s,children:a},l)=>u.jsxs(go,{ref:l,textValue:e,className:K("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[u.jsx("span",{className:K("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":s.toLowerCase()==="ot","pr-border-l-purple-200":s.toLowerCase()==="nt","pr-border-l-indigo-200":s.toLowerCase()==="dc"}),children:me.bookIdToEnglishName(e)}),n&&u.jsx("div",{children:a})]},e));function lc({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return u.jsxs(Pn,{className:"pr-flex pr-justify-between",children:[u.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),u.jsxs("div",{className:"pr-flex pr-items-center",children:[u.jsx(de.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),u.jsx(de.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),u.jsx(de.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const gn=me.allBookIds,cc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},as=["OT","NT","DC"],pc=32+32+32,uc=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],dc=e=>({OT:gn.filter(n=>me.isBookOT(n)),NT:gn.filter(n=>me.isBookNT(n)),DC:gn.filter(n=>me.isBookDC(n))})[e],on=e=>ca.getChaptersForBook(me.bookIdToNumber(e));function fc(){return gn.map(t=>me.bookIdToEnglishName(t))}function mc(e){return fc().includes(e)}function hc(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(mc(t))return gn.find(r=>me.bookIdToEnglishName(r)===t)}function gc({scrRef:e,handleSubmit:t}){const[n,r]=T.useState(""),[o,s]=T.useState(me.bookNumberToId(e.bookNum)),[a,l]=T.useState(e.chapterNum??0),[c,d]=T.useState(me.bookNumberToId(e.bookNum)),[m,v]=T.useState(!1),[g,p]=T.useState(m),h=T.useRef(void 0),f=T.useRef(void 0),b=T.useRef(void 0),w=T.useCallback(P=>dc(P).filter(_=>{const M=me.bookIdToEnglishName(_).toLowerCase(),z=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return M.includes(z)||_.toLowerCase().includes(z)}),[n]),R=P=>{r(P)},x=T.useRef(!1),E=T.useCallback(P=>{if(x.current){x.current=!1;return}v(P)},[]),y=T.useCallback((P,_,M,z)=>{if(l(me.bookNumberToId(e.bookNum)!==P?1:e.chapterNum),_||on(P)===-1){t({bookNum:me.bookIdToNumber(P),chapterNum:M||1,verseNum:z||1}),v(!1),r("");return}s(o!==P?P:""),v(!_)},[t,e.bookNum,e.chapterNum,o]),S=P=>{P<=0||P>on(o)||y(o,!0,P)},N=T.useCallback(()=>{uc.forEach(P=>{const _=n.match(P);if(_){const[M,z=void 0,U=void 0]=_.slice(1),A=hc(M);(me.isBookIdValid(M)||A)&&y(A??M,!0,z?parseInt(z,10):1,U?parseInt(U,10):1)}})},[y,n]),j=T.useCallback(P=>{m?(P.key==="ArrowDown"||P.key==="ArrowUp")&&(typeof b<"u"&&b.current!==null?b.current.focus():typeof f<"u"&&f.current!==null&&f.current.focus(),P.preventDefault()):v(!0)},[m]),I=P=>{const{key:_}=P;_==="ArrowRight"||_==="ArrowLeft"||_==="ArrowDown"||_==="ArrowUp"||_==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:_})),h.current.focus())},F=P=>{const{key:_}=P;if(c===o){if(_==="Enter"){P.preventDefault(),y(o,!0,a);return}let M=0;if(_==="ArrowRight")if(a<on(c))M=1;else{P.preventDefault();return}else if(_==="ArrowLeft")if(a>1)M=-1;else{P.preventDefault();return}else _==="ArrowDown"?M=6:_==="ArrowUp"&&(M=-6);a+M<=0||a+M>on(c)?l(0):M!==0&&(l(a+M),P.preventDefault())}};return T.useEffect(()=>{o===c?o===me.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),T.useLayoutEffect(()=>{p(m)},[m]),T.useLayoutEffect(()=>{const P=setTimeout(()=>{if(g&&f.current&&b.current){const M=b.current.offsetTop-pc;f.current.scrollTo({top:M,behavior:"instant"})}},10);return()=>{clearTimeout(P)}},[g]),u.jsx("div",{className:"pr-flex",children:u.jsxs(ho,{modal:!1,open:m,onOpenChange:E,children:[u.jsx(va,{asChild:!0,children:u.jsx(sc,{ref:h,value:n,handleSearch:R,handleKeyDown:j,handleOnClick:()=>{s(me.bookNumberToId(e.bookNum)),d(me.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),v(!0),h.current.focus()},onFocus:()=>{x.current=!0},handleSubmit:N,placeholder:`${me.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),u.jsxs(cr,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:I,align:"start",ref:f,children:[u.jsx(lc,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),as.map((P,_)=>w(P).length>0&&u.jsxs("div",{children:[u.jsx(Pn,{className:"pr-font-semibold pr-text-slate-700",children:cc[P]}),w(P).map(M=>u.jsx("div",{children:u.jsx(ic,{bookId:M,handleSelectBook:()=>y(M,!1),isSelected:o===M,handleHighlightBook:()=>d(M),handleKeyDown:F,bookType:P,ref:z=>{o===M&&(b.current=z)},children:u.jsx(ac,{handleSelectChapter:S,endChapter:on(M),activeChapter:e.bookNum===me.bookIdToNumber(M)?e.chapterNum:0,highlightedChapter:a,handleHighlightedChapter:z=>{l(z)}})})},M)),as.length-1!==_?u.jsx(pr,{}):void 0]},P))]})]})})}const ur=T.forwardRef(({className:e,...t},n)=>u.jsx("div",{className:"pr-relative pr-w-full pr-overflow-auto",children:u.jsx("table",{ref:n,className:K("pr-w-full pr-caption-bottom pr-text-sm",e),...t})}));ur.displayName="Table";const dr=T.forwardRef(({className:e,...t},n)=>u.jsx("thead",{ref:n,className:K("[&_tr]:pr-border-b",e),...t}));dr.displayName="TableHeader";const fr=T.forwardRef(({className:e,...t},n)=>u.jsx("tbody",{ref:n,className:K("[&_tr:last-child]:pr-border-0",e),...t}));fr.displayName="TableBody";const ka=T.forwardRef(({className:e,...t},n)=>u.jsx("tfoot",{ref:n,className:K("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));ka.displayName="TableFooter";const St=T.forwardRef(({className:e,...t},n)=>u.jsx("tr",{ref:n,className:K("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));St.displayName="TableRow";const xn=T.forwardRef(({className:e,...t},n)=>u.jsx("th",{ref:n,className:K("pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",e),...t}));xn.displayName="TableHead";const Ut=T.forwardRef(({className:e,...t},n)=>u.jsx("td",{ref:n,className:K("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0",e),...t}));Ut.displayName="TableCell";const Ta=T.forwardRef(({className:e,...t},n)=>u.jsx("caption",{ref:n,className:K("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));Ta.displayName="TableCaption";const Na=po.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),Te=T.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},s)=>{const a=r?Il.Slot:"button";return u.jsx(a,{className:K(Na({variant:t,size:n,className:e})),ref:s,...o})});Te.displayName="Button";const Zn=we.Root,bc=we.Group,Qn=we.Value,En=T.forwardRef(({className:e,children:t,...n},r)=>u.jsxs(we.Trigger,{ref:r,className:K("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...n,children:[t,u.jsx(we.Icon,{asChild:!0,children:u.jsx(de.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));En.displayName=we.Trigger.displayName;const vo=T.forwardRef(({className:e,...t},n)=>u.jsx(we.ScrollUpButton,{ref:n,className:K("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:u.jsx(de.ChevronUp,{className:"pr-h-4 pr-w-4"})}));vo.displayName=we.ScrollUpButton.displayName;const yo=T.forwardRef(({className:e,...t},n)=>u.jsx(we.ScrollDownButton,{ref:n,className:K("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:u.jsx(de.ChevronDown,{className:"pr-h-4 pr-w-4"})}));yo.displayName=we.ScrollDownButton.displayName;const kn=T.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>u.jsx(we.Portal,{children:u.jsxs(we.Content,{ref:o,className:K("pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:n,...r,children:[u.jsx(vo,{}),u.jsx(we.Viewport,{className:K("pr-p-1",n==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),u.jsx(yo,{})]})}));kn.displayName=we.Content.displayName;const Sa=T.forwardRef(({className:e,...t},n)=>u.jsx(we.Label,{ref:n,className:K("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));Sa.displayName=we.Label.displayName;const Xe=T.forwardRef(({className:e,children:t,...n},r)=>u.jsxs(we.Item,{ref:r,className:K("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[u.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:u.jsx(we.ItemIndicator,{children:u.jsx(de.Check,{className:"pr-h-4 pr-w-4"})})}),u.jsx(we.ItemText,{children:t})]}));Xe.displayName=we.Item.displayName;const Ca=T.forwardRef(({className:e,...t},n)=>u.jsx(we.Separator,{ref:n,className:K("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Ca.displayName=we.Separator.displayName;function vc({table:e}){return u.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:u.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[u.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),u.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[u.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),u.jsxs(Zn,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[u.jsx(En,{className:"pr-h-8 pr-w-[70px]",children:u.jsx(Qn,{placeholder:e.getState().pagination.pageSize})}),u.jsx(kn,{side:"top",children:[10,20,30,40,50].map(t=>u.jsx(Xe,{value:`${t}`,children:t},t))})]})]}),u.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),u.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[u.jsxs(Te,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),u.jsx(de.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),u.jsxs(Te,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),u.jsx(de.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),u.jsxs(Te,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),u.jsx(de.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),u.jsxs(Te,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),u.jsx(de.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}function yc({table:e}){return u.jsxs(ho,{children:[u.jsx(pa.DropdownMenuTrigger,{asChild:!0,children:u.jsxs(Te,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[u.jsx(de.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),u.jsxs(cr,{align:"end",className:"pr-w-[150px]",children:[u.jsx(Pn,{children:"Toggle columns"}),u.jsx(pr,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>u.jsx(bo,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}function Oa({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,onRowClickHandler:s=()=>{}}){var f;const[a,l]=T.useState([]),[c,d]=T.useState([]),[m,v]=T.useState({}),[g,p]=T.useState({}),h=yt.useReactTable({data:t,columns:e,getCoreRowModel:yt.getCoreRowModel(),...n&&{getPaginationRowModel:yt.getPaginationRowModel()},onSortingChange:l,getSortedRowModel:yt.getSortedRowModel(),onColumnFiltersChange:d,getFilteredRowModel:yt.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:p,state:{sorting:a,columnFilters:c,columnVisibility:m,rowSelection:g}});return u.jsxs("div",{children:[o&&u.jsx(yc,{table:h}),u.jsx("div",{className:"pr-twp pr-font-sans",children:u.jsxs(ur,{children:[u.jsx(dr,{children:h.getHeaderGroups().map(b=>u.jsx(St,{children:b.headers.map(w=>u.jsx(xn,{children:w.isPlaceholder?void 0:yt.flexRender(w.column.columnDef.header,w.getContext())},w.id))},b.id))}),u.jsx(fr,{children:(f=h.getRowModel().rows)!=null&&f.length?h.getRowModel().rows.map(b=>u.jsx(St,{onClick:()=>s(b,h),"data-state":b.getIsSelected()&&"selected",children:b.getVisibleCells().map(w=>u.jsx(Ut,{children:yt.flexRender(w.column.columnDef.cell,w.getContext())},w.id))},b.id)):u.jsx(St,{children:u.jsx(Ut,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]})}),n&&u.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[u.jsx(Te,{variant:"outline",size:"sm",onClick:()=>h.previousPage(),disabled:!h.getCanPreviousPage(),children:"Previous"}),u.jsx(Te,{variant:"outline",size:"sm",onClick:()=>h.nextPage(),disabled:!h.getCanNextPage(),children:"Next"})]}),n&&r&&u.jsx(vc,{table:h})]})}function Kr({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:s=!1,width:a,options:l=[],className:c,value:d,onChange:m,onFocus:v,onBlur:g,getOptionLabel:p}){return u.jsx(ye.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:s,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:d,onChange:m,onFocus:v,onBlur:g,getOptionLabel:p,renderInput:h=>u.jsx(ye.TextField,{...h,error:o,fullWidth:s,disabled:n,label:t,style:{width:a}})})}function wc({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,s]=T.useState(1),[a,l]=T.useState(r),[c,d]=T.useState(Array.from({length:r},(g,p)=>p+1));T.useEffect(()=>{s(1),e(1),l(r),t(r),d(Array.from({length:r},(g,p)=>p+1))},[r,t,e]);const m=(g,p)=>{s(p),e(p),p>a&&(l(p),t(p))},v=(g,p)=>{l(p),t(p),p<o&&(s(p),e(p))};return u.jsxs(u.Fragment,{children:[u.jsx(ye.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:u.jsx(Kr,{onChange:(g,p)=>m(g,p),className:"book-selection-chapter",isClearable:!1,options:c,getOptionLabel:g=>g.toString(),value:o,isDisabled:n},"start chapter"),label:"Chapters",labelPlacement:"start"}),u.jsx(ye.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:u.jsx(Kr,{onChange:(g,p)=>v(g,p),className:"book-selection-chapter",isClearable:!1,options:c,getOptionLabel:g=>g.toString(),value:a,isDisabled:n},"end chapter"),label:"to",labelPlacement:"start"})]})}var kt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(kt||{});function Pa({id:e,isChecked:t,labelText:n="",labelPosition:r=kt.After,isIndeterminate:o=!1,isDefaultChecked:s,isDisabled:a=!1,hasError:l=!1,className:c,onChange:d}){const m=u.jsx(ye.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:s,disabled:a,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:d});let v;if(n){const g=r===kt.Before||r===kt.Above,p=u.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),h=r===kt.Before||r===kt.After,f=h?p:u.jsx("div",{children:p}),b=h?m:u.jsx("div",{children:m});v=u.jsxs(ye.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:a,error:l,children:[g&&f,b,!g&&f]})}else v=m;return v}function xc({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:a}){return u.jsxs("fieldset",{id:e,className:t,children:[n&&u.jsx("legend",{children:n}),r.map(l=>u.jsx(Pa,{className:"check-item",isChecked:o.includes(l),labelText:a?a(l):l,onChange:()=>s(l)},l))]})}function fe(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,s;for(s=0;s<r.length;s++)o=r[s],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function C(){return C=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},C.apply(this,arguments)}function Ec(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function kc(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Jr={exports:{}},Vn={exports:{}},le={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var is;function Tc(){if(is)return le;is=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,p=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,R=e?Symbol.for("react.scope"):60119;function x(y){if(typeof y=="object"&&y!==null){var S=y.$$typeof;switch(S){case t:switch(y=y.type,y){case c:case d:case r:case s:case o:case v:return y;default:switch(y=y&&y.$$typeof,y){case l:case m:case h:case p:case a:return y;default:return S}}case n:return S}}}function E(y){return x(y)===d}return le.AsyncMode=c,le.ConcurrentMode=d,le.ContextConsumer=l,le.ContextProvider=a,le.Element=t,le.ForwardRef=m,le.Fragment=r,le.Lazy=h,le.Memo=p,le.Portal=n,le.Profiler=s,le.StrictMode=o,le.Suspense=v,le.isAsyncMode=function(y){return E(y)||x(y)===c},le.isConcurrentMode=E,le.isContextConsumer=function(y){return x(y)===l},le.isContextProvider=function(y){return x(y)===a},le.isElement=function(y){return typeof y=="object"&&y!==null&&y.$$typeof===t},le.isForwardRef=function(y){return x(y)===m},le.isFragment=function(y){return x(y)===r},le.isLazy=function(y){return x(y)===h},le.isMemo=function(y){return x(y)===p},le.isPortal=function(y){return x(y)===n},le.isProfiler=function(y){return x(y)===s},le.isStrictMode=function(y){return x(y)===o},le.isSuspense=function(y){return x(y)===v},le.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===r||y===d||y===s||y===o||y===v||y===g||typeof y=="object"&&y!==null&&(y.$$typeof===h||y.$$typeof===p||y.$$typeof===a||y.$$typeof===l||y.$$typeof===m||y.$$typeof===b||y.$$typeof===w||y.$$typeof===R||y.$$typeof===f)},le.typeOf=x,le}var ce={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ls;function Nc(){return ls||(ls=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,p=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,R=e?Symbol.for("react.scope"):60119;function x(B){return typeof B=="string"||typeof B=="function"||B===r||B===d||B===s||B===o||B===v||B===g||typeof B=="object"&&B!==null&&(B.$$typeof===h||B.$$typeof===p||B.$$typeof===a||B.$$typeof===l||B.$$typeof===m||B.$$typeof===b||B.$$typeof===w||B.$$typeof===R||B.$$typeof===f)}function E(B){if(typeof B=="object"&&B!==null){var te=B.$$typeof;switch(te){case t:var $=B.type;switch($){case c:case d:case r:case s:case o:case v:return $;default:var ae=$&&$.$$typeof;switch(ae){case l:case m:case h:case p:case a:return ae;default:return te}}case n:return te}}}var y=c,S=d,N=l,j=a,I=t,F=m,P=r,_=h,M=p,z=n,U=s,A=o,H=v,Q=!1;function Z(B){return Q||(Q=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),O(B)||E(B)===c}function O(B){return E(B)===d}function D(B){return E(B)===l}function L(B){return E(B)===a}function X(B){return typeof B=="object"&&B!==null&&B.$$typeof===t}function W(B){return E(B)===m}function Y(B){return E(B)===r}function G(B){return E(B)===h}function V(B){return E(B)===p}function q(B){return E(B)===n}function J(B){return E(B)===s}function ee(B){return E(B)===o}function se(B){return E(B)===v}ce.AsyncMode=y,ce.ConcurrentMode=S,ce.ContextConsumer=N,ce.ContextProvider=j,ce.Element=I,ce.ForwardRef=F,ce.Fragment=P,ce.Lazy=_,ce.Memo=M,ce.Portal=z,ce.Profiler=U,ce.StrictMode=A,ce.Suspense=H,ce.isAsyncMode=Z,ce.isConcurrentMode=O,ce.isContextConsumer=D,ce.isContextProvider=L,ce.isElement=X,ce.isForwardRef=W,ce.isFragment=Y,ce.isLazy=G,ce.isMemo=V,ce.isPortal=q,ce.isProfiler=J,ce.isStrictMode=ee,ce.isSuspense=se,ce.isValidElementType=x,ce.typeOf=E}()),ce}var cs;function Ra(){return cs||(cs=1,process.env.NODE_ENV==="production"?Vn.exports=Tc():Vn.exports=Nc()),Vn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var jr,ps;function Sc(){if(ps)return jr;ps=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(s){if(s==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(s)}function o(){try{if(!Object.assign)return!1;var s=new String("abc");if(s[5]="de",Object.getOwnPropertyNames(s)[0]==="5")return!1;for(var a={},l=0;l<10;l++)a["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(a).map(function(m){return a[m]});if(c.join("")!=="0123456789")return!1;var d={};return"abcdefghijklmnopqrst".split("").forEach(function(m){d[m]=m}),Object.keys(Object.assign({},d)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return jr=o()?Object.assign:function(s,a){for(var l,c=r(s),d,m=1;m<arguments.length;m++){l=Object(arguments[m]);for(var v in l)t.call(l,v)&&(c[v]=l[v]);if(e){d=e(l);for(var g=0;g<d.length;g++)n.call(l,d[g])&&(c[d[g]]=l[d[g]])}}return c},jr}var $r,us;function wo(){if(us)return $r;us=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return $r=e,$r}var Mr,ds;function ja(){return ds||(ds=1,Mr=Function.call.bind(Object.prototype.hasOwnProperty)),Mr}var _r,fs;function Cc(){if(fs)return _r;fs=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=wo(),n={},r=ja();e=function(s){var a="Warning: "+s;typeof console<"u"&&console.error(a);try{throw new Error(a)}catch{}}}function o(s,a,l,c,d){if(process.env.NODE_ENV!=="production"){for(var m in s)if(r(s,m)){var v;try{if(typeof s[m]!="function"){var g=Error((c||"React class")+": "+l+" type `"+m+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof s[m]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw g.name="Invariant Violation",g}v=s[m](a,m,c,l,null,t)}catch(h){v=h}if(v&&!(v instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+m+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof v+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),v instanceof Error&&!(v.message in n)){n[v.message]=!0;var p=d?d():"";e("Failed "+l+" type: "+v.message+(p??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},_r=o,_r}var Ir,ms;function Oc(){if(ms)return Ir;ms=1;var e=Ra(),t=Sc(),n=wo(),r=ja(),o=Cc(),s=function(){};process.env.NODE_ENV!=="production"&&(s=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function a(){return null}return Ir=function(l,c){var d=typeof Symbol=="function"&&Symbol.iterator,m="@@iterator";function v(O){var D=O&&(d&&O[d]||O[m]);if(typeof D=="function")return D}var g="<<anonymous>>",p={array:w("array"),bigint:w("bigint"),bool:w("boolean"),func:w("function"),number:w("number"),object:w("object"),string:w("string"),symbol:w("symbol"),any:R(),arrayOf:x,element:E(),elementType:y(),instanceOf:S,node:F(),objectOf:j,oneOf:N,oneOfType:I,shape:_,exact:M};function h(O,D){return O===D?O!==0||1/O===1/D:O!==O&&D!==D}function f(O,D){this.message=O,this.data=D&&typeof D=="object"?D:{},this.stack=""}f.prototype=Error.prototype;function b(O){if(process.env.NODE_ENV!=="production")var D={},L=0;function X(Y,G,V,q,J,ee,se){if(q=q||g,ee=ee||V,se!==n){if(c){var B=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw B.name="Invariant Violation",B}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var te=q+":"+V;!D[te]&&L<3&&(s("You are manually calling a React.PropTypes validation function for the `"+ee+"` prop on `"+q+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),D[te]=!0,L++)}}return G[V]==null?Y?G[V]===null?new f("The "+J+" `"+ee+"` is marked as required "+("in `"+q+"`, but its value is `null`.")):new f("The "+J+" `"+ee+"` is marked as required in "+("`"+q+"`, but its value is `undefined`.")):null:O(G,V,q,J,ee)}var W=X.bind(null,!1);return W.isRequired=X.bind(null,!0),W}function w(O){function D(L,X,W,Y,G,V){var q=L[X],J=A(q);if(J!==O){var ee=H(q);return new f("Invalid "+Y+" `"+G+"` of type "+("`"+ee+"` supplied to `"+W+"`, expected ")+("`"+O+"`."),{expectedType:O})}return null}return b(D)}function R(){return b(a)}function x(O){function D(L,X,W,Y,G){if(typeof O!="function")return new f("Property `"+G+"` of component `"+W+"` has invalid PropType notation inside arrayOf.");var V=L[X];if(!Array.isArray(V)){var q=A(V);return new f("Invalid "+Y+" `"+G+"` of type "+("`"+q+"` supplied to `"+W+"`, expected an array."))}for(var J=0;J<V.length;J++){var ee=O(V,J,W,Y,G+"["+J+"]",n);if(ee instanceof Error)return ee}return null}return b(D)}function E(){function O(D,L,X,W,Y){var G=D[L];if(!l(G)){var V=A(G);return new f("Invalid "+W+" `"+Y+"` of type "+("`"+V+"` supplied to `"+X+"`, expected a single ReactElement."))}return null}return b(O)}function y(){function O(D,L,X,W,Y){var G=D[L];if(!e.isValidElementType(G)){var V=A(G);return new f("Invalid "+W+" `"+Y+"` of type "+("`"+V+"` supplied to `"+X+"`, expected a single ReactElement type."))}return null}return b(O)}function S(O){function D(L,X,W,Y,G){if(!(L[X]instanceof O)){var V=O.name||g,q=Z(L[X]);return new f("Invalid "+Y+" `"+G+"` of type "+("`"+q+"` supplied to `"+W+"`, expected ")+("instance of `"+V+"`."))}return null}return b(D)}function N(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&(arguments.length>1?s("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):s("Invalid argument supplied to oneOf, expected an array.")),a;function D(L,X,W,Y,G){for(var V=L[X],q=0;q<O.length;q++)if(h(V,O[q]))return null;var J=JSON.stringify(O,function(se,B){var te=H(B);return te==="symbol"?String(B):B});return new f("Invalid "+Y+" `"+G+"` of value `"+String(V)+"` "+("supplied to `"+W+"`, expected one of "+J+"."))}return b(D)}function j(O){function D(L,X,W,Y,G){if(typeof O!="function")return new f("Property `"+G+"` of component `"+W+"` has invalid PropType notation inside objectOf.");var V=L[X],q=A(V);if(q!=="object")return new f("Invalid "+Y+" `"+G+"` of type "+("`"+q+"` supplied to `"+W+"`, expected an object."));for(var J in V)if(r(V,J)){var ee=O(V,J,W,Y,G+"."+J,n);if(ee instanceof Error)return ee}return null}return b(D)}function I(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&s("Invalid argument supplied to oneOfType, expected an instance of array."),a;for(var D=0;D<O.length;D++){var L=O[D];if(typeof L!="function")return s("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+Q(L)+" at index "+D+"."),a}function X(W,Y,G,V,q){for(var J=[],ee=0;ee<O.length;ee++){var se=O[ee],B=se(W,Y,G,V,q,n);if(B==null)return null;B.data&&r(B.data,"expectedType")&&J.push(B.data.expectedType)}var te=J.length>0?", expected one of type ["+J.join(", ")+"]":"";return new f("Invalid "+V+" `"+q+"` supplied to "+("`"+G+"`"+te+"."))}return b(X)}function F(){function O(D,L,X,W,Y){return z(D[L])?null:new f("Invalid "+W+" `"+Y+"` supplied to "+("`"+X+"`, expected a ReactNode."))}return b(O)}function P(O,D,L,X,W){return new f((O||"React class")+": "+D+" type `"+L+"."+X+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+W+"`.")}function _(O){function D(L,X,W,Y,G){var V=L[X],q=A(V);if(q!=="object")return new f("Invalid "+Y+" `"+G+"` of type `"+q+"` "+("supplied to `"+W+"`, expected `object`."));for(var J in O){var ee=O[J];if(typeof ee!="function")return P(W,Y,G,J,H(ee));var se=ee(V,J,W,Y,G+"."+J,n);if(se)return se}return null}return b(D)}function M(O){function D(L,X,W,Y,G){var V=L[X],q=A(V);if(q!=="object")return new f("Invalid "+Y+" `"+G+"` of type `"+q+"` "+("supplied to `"+W+"`, expected `object`."));var J=t({},L[X],O);for(var ee in J){var se=O[ee];if(r(O,ee)&&typeof se!="function")return P(W,Y,G,ee,H(se));if(!se)return new f("Invalid "+Y+" `"+G+"` key `"+ee+"` supplied to `"+W+"`.\nBad object: "+JSON.stringify(L[X],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(O),null,"  "));var B=se(V,ee,W,Y,G+"."+ee,n);if(B)return B}return null}return b(D)}function z(O){switch(typeof O){case"number":case"string":case"undefined":return!0;case"boolean":return!O;case"object":if(Array.isArray(O))return O.every(z);if(O===null||l(O))return!0;var D=v(O);if(D){var L=D.call(O),X;if(D!==O.entries){for(;!(X=L.next()).done;)if(!z(X.value))return!1}else for(;!(X=L.next()).done;){var W=X.value;if(W&&!z(W[1]))return!1}}else return!1;return!0;default:return!1}}function U(O,D){return O==="symbol"?!0:D?D["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&D instanceof Symbol:!1}function A(O){var D=typeof O;return Array.isArray(O)?"array":O instanceof RegExp?"object":U(D,O)?"symbol":D}function H(O){if(typeof O>"u"||O===null)return""+O;var D=A(O);if(D==="object"){if(O instanceof Date)return"date";if(O instanceof RegExp)return"regexp"}return D}function Q(O){var D=H(O);switch(D){case"array":case"object":return"an "+D;case"boolean":case"date":case"regexp":return"a "+D;default:return D}}function Z(O){return!O.constructor||!O.constructor.name?g:O.constructor.name}return p.checkPropTypes=o,p.resetWarningCache=o.resetWarningCache,p.PropTypes=p,p},Ir}var Ar,hs;function Pc(){if(hs)return Ar;hs=1;var e=wo();function t(){}function n(){}return n.resetWarningCache=t,Ar=function(){function r(a,l,c,d,m,v){if(v!==e){var g=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw g.name="Invariant Violation",g}}r.isRequired=r;function o(){return r}var s={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return s.PropTypes=s,s},Ar}if(process.env.NODE_ENV!=="production"){var Rc=Ra(),jc=!0;Jr.exports=Oc()(Rc.isElement,jc)}else Jr.exports=Pc()();var $c=Jr.exports;const i=Ec($c);function Jt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function Tt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function $a(e){if(!Tt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=$a(e[n])}),t}function rt(e,t,n={clone:!0}){const r=n.clone?C({},e):e;return Tt(e)&&Tt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Tt(t[o])&&o in e&&Tt(e[o])?r[o]=rt(e[o],t[o],n):n.clone?r[o]=Tt(t[o])?$a(t[o]):t[o]:r[o]=t[o])}),r}function Mc(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ma(e,t,n,r,o){const s=e[t],a=o||t;if(s==null||typeof window>"u")return null;let l;const c=s.type;return typeof c=="function"&&!Mc(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const _a=Jt(i.element,Ma);_a.isRequired=Jt(i.element.isRequired,Ma);const jn=_a;function _c(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ic(e,t,n,r,o){const s=e[t],a=o||t;if(s==null||typeof window>"u")return null;let l;return typeof s=="function"&&!_c(s)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ac=Jt(i.elementType,Ic),Dc="exact-prop: ​";function Ia(e){return process.env.NODE_ENV==="production"?e:C({},e,{[Dc]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Ht(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Zr={exports:{}},pe={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gs;function Bc(){if(gs)return pe;gs=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),p=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function f(b){if(typeof b=="object"&&b!==null){var w=b.$$typeof;switch(w){case e:switch(b=b.type,b){case n:case o:case r:case d:case m:return b;default:switch(b=b&&b.$$typeof,b){case l:case a:case c:case g:case v:case s:return b;default:return w}}case t:return w}}}return pe.ContextConsumer=a,pe.ContextProvider=s,pe.Element=e,pe.ForwardRef=c,pe.Fragment=n,pe.Lazy=g,pe.Memo=v,pe.Portal=t,pe.Profiler=o,pe.StrictMode=r,pe.Suspense=d,pe.SuspenseList=m,pe.isAsyncMode=function(){return!1},pe.isConcurrentMode=function(){return!1},pe.isContextConsumer=function(b){return f(b)===a},pe.isContextProvider=function(b){return f(b)===s},pe.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===e},pe.isForwardRef=function(b){return f(b)===c},pe.isFragment=function(b){return f(b)===n},pe.isLazy=function(b){return f(b)===g},pe.isMemo=function(b){return f(b)===v},pe.isPortal=function(b){return f(b)===t},pe.isProfiler=function(b){return f(b)===o},pe.isStrictMode=function(b){return f(b)===r},pe.isSuspense=function(b){return f(b)===d},pe.isSuspenseList=function(b){return f(b)===m},pe.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===n||b===o||b===r||b===d||b===m||b===p||typeof b=="object"&&b!==null&&(b.$$typeof===g||b.$$typeof===v||b.$$typeof===s||b.$$typeof===a||b.$$typeof===c||b.$$typeof===h||b.getModuleId!==void 0)},pe.typeOf=f,pe}var ue={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bs;function Lc(){return bs||(bs=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),p=Symbol.for("react.offscreen"),h=!1,f=!1,b=!1,w=!1,R=!1,x;x=Symbol.for("react.module.reference");function E($){return!!(typeof $=="string"||typeof $=="function"||$===n||$===o||R||$===r||$===d||$===m||w||$===p||h||f||b||typeof $=="object"&&$!==null&&($.$$typeof===g||$.$$typeof===v||$.$$typeof===s||$.$$typeof===a||$.$$typeof===c||$.$$typeof===x||$.getModuleId!==void 0))}function y($){if(typeof $=="object"&&$!==null){var ae=$.$$typeof;switch(ae){case e:var ke=$.type;switch(ke){case n:case o:case r:case d:case m:return ke;default:var Pe=ke&&ke.$$typeof;switch(Pe){case l:case a:case c:case g:case v:case s:return Pe;default:return ae}}case t:return ae}}}var S=a,N=s,j=e,I=c,F=n,P=g,_=v,M=t,z=o,U=r,A=d,H=m,Q=!1,Z=!1;function O($){return Q||(Q=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function D($){return Z||(Z=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function L($){return y($)===a}function X($){return y($)===s}function W($){return typeof $=="object"&&$!==null&&$.$$typeof===e}function Y($){return y($)===c}function G($){return y($)===n}function V($){return y($)===g}function q($){return y($)===v}function J($){return y($)===t}function ee($){return y($)===o}function se($){return y($)===r}function B($){return y($)===d}function te($){return y($)===m}ue.ContextConsumer=S,ue.ContextProvider=N,ue.Element=j,ue.ForwardRef=I,ue.Fragment=F,ue.Lazy=P,ue.Memo=_,ue.Portal=M,ue.Profiler=z,ue.StrictMode=U,ue.Suspense=A,ue.SuspenseList=H,ue.isAsyncMode=O,ue.isConcurrentMode=D,ue.isContextConsumer=L,ue.isContextProvider=X,ue.isElement=W,ue.isForwardRef=Y,ue.isFragment=G,ue.isLazy=V,ue.isMemo=q,ue.isPortal=J,ue.isProfiler=ee,ue.isStrictMode=se,ue.isSuspense=B,ue.isSuspenseList=te,ue.isValidElementType=E,ue.typeOf=y}()),ue}process.env.NODE_ENV==="production"?Zr.exports=Bc():Zr.exports=Lc();var er=Zr.exports;const Fc=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Vc(e){const t=`${e}`.match(Fc);return t&&t[1]||""}function Aa(e,t=""){return e.displayName||e.name||Vc(e)||t}function vs(e,t,n){const r=Aa(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function zc(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Aa(e,"Component");if(typeof e=="object")switch(e.$$typeof){case er.ForwardRef:return vs(e,e.render,"ForwardRef");case er.Memo:return vs(e,e.type,"memo");default:return}}}function ot(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=e[t],a=o||t;return s==null?null:s&&s.nodeType!==1?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Uc=i.oneOfType([i.func,i.object]),xo=Uc;function Ke(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Ht(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Qr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Da(e,t=166){let n;function r(...o){const s=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(s,t)}return r.clear=()=>{clearTimeout(n)},r}function Hc(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,s,a)=>{const l=o||"<<anonymous>>",c=a||r;return typeof n[r]<"u"?new Error(`The ${s} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function qc(e,t){var n,r;return k.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Ce(e){return e&&e.ownerDocument||document}function qt(e){return Ce(e).defaultView||window}function Wc(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?C({},t.propTypes):null;return o=>(s,a,l,c,d,...m)=>{const v=d||a,g=n==null?void 0:n[v];if(g){const p=g(s,a,l,c,d,...m);if(p)return p}return typeof s[a]<"u"&&!s[o]?new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function tr(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Xc=typeof window<"u"?k.useLayoutEffect:k.useEffect,Pt=Xc;let ys=0;function Gc(e){const[t,n]=k.useState(e),r=e||t;return k.useEffect(()=>{t==null&&(ys+=1,n(`mui-${ys}`))},[t]),r}const ws=k["useId".toString()];function Ba(e){if(ws!==void 0){const t=ws();return e??t}return Gc(e)}function Yc(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=o||t;return typeof e[t]<"u"?new Error(`The prop \`${s}\` is not supported. Please remove it.`):null}function La({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=k.useRef(e!==void 0),[s,a]=k.useState(t),l=o?e:s;if(process.env.NODE_ENV!=="production"){k.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:d}=k.useRef(t);k.useEffect(()=>{!o&&d!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=k.useCallback(d=>{o||a(d)},[]);return[l,c]}function Tn(e){const t=k.useRef(e);return Pt(()=>{t.current=e}),k.useRef((...n)=>(0,t.current)(...n)).current}function Ue(...e){return k.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{tr(n,t)})},e)}const xs={};function Kc(e,t){const n=k.useRef(xs);return n.current===xs&&(n.current=e(t)),n}const Jc=[];function Zc(e){k.useEffect(e,Jc)}class $n{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new $n}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function fn(){const e=Kc($n.create).current;return Zc(e.disposeEffect),e}let mr=!0,eo=!1;const Qc=new $n,ep={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function tp(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&ep[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function np(e){e.metaKey||e.altKey||e.ctrlKey||(mr=!0)}function Dr(){mr=!1}function rp(){this.visibilityState==="hidden"&&eo&&(mr=!0)}function op(e){e.addEventListener("keydown",np,!0),e.addEventListener("mousedown",Dr,!0),e.addEventListener("pointerdown",Dr,!0),e.addEventListener("touchstart",Dr,!0),e.addEventListener("visibilitychange",rp,!0)}function sp(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return mr||tp(t)}function Fa(){const e=k.useCallback(o=>{o!=null&&op(o.ownerDocument)},[]),t=k.useRef(!1);function n(){return t.current?(eo=!0,Qc.start(100,()=>{eo=!1}),t.current=!1,!0):!1}function r(o){return sp(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Va(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function ap(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function ip(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const lp=Number.isInteger||ip;function za(e,t,n,r){const o=e[t];if(o==null||!lp(o)){const s=ap(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${s}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function Ua(e,t,...n){return e[t]===void 0?null:za(e,t,...n)}function to(){return null}Ua.isRequired=za;to.isRequired=to;const Ha=process.env.NODE_ENV==="production"?to:Ua;function qa(e,t){const n=C({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=C({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},s=t[r];n[r]={},!s||!Object.keys(s)?n[r]=o:!o||!Object.keys(o)?n[r]=s:(n[r]=C({},s),Object.keys(o).forEach(a=>{n[r][a]=qa(o[a],s[a])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function it(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((s,a)=>{if(a){const l=t(a);l!==""&&s.push(l),n&&n[a]&&s.push(n[a])}return s},[]).join(" ")}),r}const Es=e=>e,cp=()=>{let e=Es;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Es}}},pp=cp(),Wa=pp,Xa={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Ze(e,t,n="Mui"){const r=Xa[t];return r?`${n}-${r}`:`${Wa.generate(e)}-${t}`}function mt(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=Ze(e,o,n)}),r}function up(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Ga(e){return typeof e=="string"}function mn(e,t,n){return e===void 0||Ga(e)?t:C({},t,{ownerState:C({},t.ownerState,n)})}const dp={disableDefaultClasses:!1},fp=k.createContext(dp);function mp(e){const{disableDefaultClasses:t}=k.useContext(fp);return n=>t?"":e(n)}function Ya(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function hp(e,t,n){return typeof e=="function"?e(t,n):e}function ks(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function gp(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:s}=e;if(!t){const p=Se(n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),h=C({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=C({},n,o,r);return p.length>0&&(f.className=p),Object.keys(h).length>0&&(f.style=h),{props:f,internalRef:void 0}}const a=Ya(C({},o,r)),l=ks(r),c=ks(o),d=t(a),m=Se(d==null?void 0:d.className,n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),v=C({},d==null?void 0:d.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),g=C({},d,n,c,l);return m.length>0&&(g.className=m),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:d.ref}}const bp=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Rt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:s=!1}=e,a=fe(e,bp),l=s?{}:hp(r,o),{props:c,internalRef:d}=gp(C({},a,{externalSlotProps:l})),m=Ue(d,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return mn(n,C({},c,{ref:m}),o)}const Ka="base";function vp(e){return`${Ka}--${e}`}function yp(e,t){return`${Ka}-${e}-${t}`}function Ja(e,t){const n=Xa[t];return n?vp(n):yp(e,t)}function wp(e,t){const n={};return t.forEach(r=>{n[r]=Ja(e,r)}),n}const xp=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Ep(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function kp(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Tp(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||kp(e))}function Np(e){const t=[],n=[];return Array.from(e.querySelectorAll(xp)).forEach((r,o)=>{const s=Ep(r);s===-1||!Tp(r)||(s===0?t.push(r):n.push({documentOrder:o,tabIndex:s,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function Sp(){return!0}function nr(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:s=Np,isEnabled:a=Sp,open:l}=e,c=k.useRef(!1),d=k.useRef(null),m=k.useRef(null),v=k.useRef(null),g=k.useRef(null),p=k.useRef(!1),h=k.useRef(null),f=Ue(t.ref,h),b=k.useRef(null);k.useEffect(()=>{!l||!h.current||(p.current=!n)},[n,l]),k.useEffect(()=>{if(!l||!h.current)return;const x=Ce(h.current);return h.current.contains(x.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),p.current&&h.current.focus()),()=>{o||(v.current&&v.current.focus&&(c.current=!0,v.current.focus()),v.current=null)}},[l]),k.useEffect(()=>{if(!l||!h.current)return;const x=Ce(h.current),E=N=>{b.current=N,!(r||!a()||N.key!=="Tab")&&x.activeElement===h.current&&N.shiftKey&&(c.current=!0,m.current&&m.current.focus())},y=()=>{const N=h.current;if(N===null)return;if(!x.hasFocus()||!a()||c.current){c.current=!1;return}if(N.contains(x.activeElement)||r&&x.activeElement!==d.current&&x.activeElement!==m.current)return;if(x.activeElement!==g.current)g.current=null;else if(g.current!==null)return;if(!p.current)return;let j=[];if((x.activeElement===d.current||x.activeElement===m.current)&&(j=s(h.current)),j.length>0){var I,F;const P=!!((I=b.current)!=null&&I.shiftKey&&((F=b.current)==null?void 0:F.key)==="Tab"),_=j[0],M=j[j.length-1];typeof _!="string"&&typeof M!="string"&&(P?M.focus():_.focus())}else N.focus()};x.addEventListener("focusin",y),x.addEventListener("keydown",E,!0);const S=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(S),x.removeEventListener("focusin",y),x.removeEventListener("keydown",E,!0)}},[n,r,o,a,l,s]);const w=x=>{v.current===null&&(v.current=x.relatedTarget),p.current=!0,g.current=x.target;const E=t.props.onFocus;E&&E(x)},R=x=>{v.current===null&&(v.current=x.relatedTarget),p.current=!0};return u.jsxs(k.Fragment,{children:[u.jsx("div",{tabIndex:l?0:-1,onFocus:R,ref:d,"data-testid":"sentinelStart"}),k.cloneElement(t,{ref:f,onFocus:w}),u.jsx("div",{tabIndex:l?0:-1,onFocus:R,ref:m,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(nr.propTypes={children:jn,disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableRestoreFocus:i.bool,getTabbable:i.func,isEnabled:i.func,open:i.bool.isRequired});process.env.NODE_ENV!=="production"&&(nr["propTypes"]=Ia(nr.propTypes));function Cp(e){return typeof e=="function"?e():e}const Nn=k.forwardRef(function(t,n){const{children:r,container:o,disablePortal:s=!1}=t,[a,l]=k.useState(null),c=Ue(k.isValidElement(r)?r.ref:null,n);if(Pt(()=>{s||l(Cp(o)||document.body)},[o,s]),Pt(()=>{if(a&&!s)return tr(n,a),()=>{tr(n,null)}},[n,a,s]),s){if(k.isValidElement(r)){const d={ref:c};return k.cloneElement(r,d)}return u.jsx(k.Fragment,{children:r})}return u.jsx(k.Fragment,{children:a&&Vl.createPortal(r,a)})});process.env.NODE_ENV!=="production"&&(Nn.propTypes={children:i.node,container:i.oneOfType([ot,i.func]),disablePortal:i.bool});process.env.NODE_ENV!=="production"&&(Nn["propTypes"]=Ia(Nn.propTypes));function Op(e){const t=Ce(e);return t.body===e?qt(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function bn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Ts(e){return parseInt(qt(e).getComputedStyle(e).paddingRight,10)||0}function Pp(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Ns(e,t,n,r,o){const s=[t,n,...r];[].forEach.call(e.children,a=>{const l=s.indexOf(a)===-1,c=!Pp(a);l&&c&&bn(a,o)})}function Br(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function Rp(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(Op(r)){const a=Va(Ce(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Ts(r)+a}px`;const l=Ce(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${Ts(c)+a}px`})}let s;if(r.parentNode instanceof DocumentFragment)s=Ce(r).body;else{const a=r.parentElement,l=qt(r);s=(a==null?void 0:a.nodeName)==="HTML"&&l.getComputedStyle(a).overflowY==="scroll"?a:r}n.push({value:s.style.overflow,property:"overflow",el:s},{value:s.style.overflowX,property:"overflow-x",el:s},{value:s.style.overflowY,property:"overflow-y",el:s}),s.style.overflow="hidden"}return()=>{n.forEach(({value:s,el:a,property:l})=>{s?a.style.setProperty(l,s):a.style.removeProperty(l)})}}function jp(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class $p{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&bn(t.modalRef,!1);const o=jp(n);Ns(n,t.mount,t.modalRef,o,!0);const s=Br(this.containers,a=>a.container===n);return s!==-1?(this.containers[s].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=Br(this.containers,s=>s.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=Rp(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=Br(this.containers,a=>a.modals.indexOf(t)!==-1),s=this.containers[o];if(s.modals.splice(s.modals.indexOf(t),1),this.modals.splice(r,1),s.modals.length===0)s.restore&&s.restore(),t.modalRef&&bn(t.modalRef,n),Ns(s.container,t.mount,t.modalRef,s.hiddenSiblings,!1),this.containers.splice(o,1);else{const a=s.modals[s.modals.length-1];a.modalRef&&bn(a.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Mp(e){return typeof e=="function"?e():e}function _p(e){return e?e.props.hasOwnProperty("in"):!1}const Ip=new $p;function Ap(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Ip,closeAfterTransition:s=!1,onTransitionEnter:a,onTransitionExited:l,children:c,onClose:d,open:m,rootRef:v}=e,g=k.useRef({}),p=k.useRef(null),h=k.useRef(null),f=Ue(h,v),[b,w]=k.useState(!m),R=_p(c);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const E=()=>Ce(p.current),y=()=>(g.current.modalRef=h.current,g.current.mount=p.current,g.current),S=()=>{o.mount(y(),{disableScrollLock:r}),h.current&&(h.current.scrollTop=0)},N=Tn(()=>{const A=Mp(t)||E().body;o.add(y(),A),h.current&&S()}),j=k.useCallback(()=>o.isTopModal(y()),[o]),I=Tn(A=>{p.current=A,A&&(m&&j()?S():h.current&&bn(h.current,x))}),F=k.useCallback(()=>{o.remove(y(),x)},[x,o]);k.useEffect(()=>()=>{F()},[F]),k.useEffect(()=>{m?N():(!R||!s)&&F()},[m,F,R,s,N]);const P=A=>H=>{var Q;(Q=A.onKeyDown)==null||Q.call(A,H),!(H.key!=="Escape"||H.which===229||!j())&&(n||(H.stopPropagation(),d&&d(H,"escapeKeyDown")))},_=A=>H=>{var Q;(Q=A.onClick)==null||Q.call(A,H),H.target===H.currentTarget&&d&&d(H,"backdropClick")};return{getRootProps:(A={})=>{const H=Ya(e);delete H.onTransitionEnter,delete H.onTransitionExited;const Q=C({},H,A);return C({role:"presentation"},Q,{onKeyDown:P(Q),ref:f})},getBackdropProps:(A={})=>{const H=A;return C({"aria-hidden":!0},H,{onClick:_(H),open:m})},getTransitionProps:()=>{const A=()=>{w(!1),a&&a()},H=()=>{w(!0),l&&l(),s&&F()};return{onEnter:Qr(A,c==null?void 0:c.props.onEnter),onExited:Qr(H,c==null?void 0:c.props.onExited)}},rootRef:f,portalRef:I,isTopModal:j,exited:b,hasTransition:R}}var $e="top",He="bottom",qe="right",Me="left",Eo="auto",Mn=[$e,He,qe,Me],Wt="start",Sn="end",Dp="clippingParents",Za="viewport",sn="popper",Bp="reference",Ss=Mn.reduce(function(e,t){return e.concat([t+"-"+Wt,t+"-"+Sn])},[]),Qa=[].concat(Mn,[Eo]).reduce(function(e,t){return e.concat([t,t+"-"+Wt,t+"-"+Sn])},[]),Lp="beforeRead",Fp="read",Vp="afterRead",zp="beforeMain",Up="main",Hp="afterMain",qp="beforeWrite",Wp="write",Xp="afterWrite",Gp=[Lp,Fp,Vp,zp,Up,Hp,qp,Wp,Xp];function Je(e){return e?(e.nodeName||"").toLowerCase():null}function Le(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function jt(e){var t=Le(e).Element;return e instanceof t||e instanceof Element}function ze(e){var t=Le(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function ko(e){if(typeof ShadowRoot>"u")return!1;var t=Le(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Yp(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},s=t.elements[n];!ze(s)||!Je(s)||(Object.assign(s.style,r),Object.keys(o).forEach(function(a){var l=o[a];l===!1?s.removeAttribute(a):s.setAttribute(a,l===!0?"":l)}))})}function Kp(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],s=t.attributes[r]||{},a=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=a.reduce(function(c,d){return c[d]="",c},{});!ze(o)||!Je(o)||(Object.assign(o.style,l),Object.keys(s).forEach(function(c){o.removeAttribute(c)}))})}}const Jp={name:"applyStyles",enabled:!0,phase:"write",fn:Yp,effect:Kp,requires:["computeStyles"]};function Ye(e){return e.split("-")[0]}var Ct=Math.max,rr=Math.min,Xt=Math.round;function no(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function ei(){return!/^((?!chrome|android).)*safari/i.test(no())}function Gt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,s=1;t&&ze(e)&&(o=e.offsetWidth>0&&Xt(r.width)/e.offsetWidth||1,s=e.offsetHeight>0&&Xt(r.height)/e.offsetHeight||1);var a=jt(e)?Le(e):window,l=a.visualViewport,c=!ei()&&n,d=(r.left+(c&&l?l.offsetLeft:0))/o,m=(r.top+(c&&l?l.offsetTop:0))/s,v=r.width/o,g=r.height/s;return{width:v,height:g,top:m,right:d+v,bottom:m+g,left:d,x:d,y:m}}function To(e){var t=Gt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function ti(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&ko(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function st(e){return Le(e).getComputedStyle(e)}function Zp(e){return["table","td","th"].indexOf(Je(e))>=0}function ht(e){return((jt(e)?e.ownerDocument:e.document)||window.document).documentElement}function hr(e){return Je(e)==="html"?e:e.assignedSlot||e.parentNode||(ko(e)?e.host:null)||ht(e)}function Cs(e){return!ze(e)||st(e).position==="fixed"?null:e.offsetParent}function Qp(e){var t=/firefox/i.test(no()),n=/Trident/i.test(no());if(n&&ze(e)){var r=st(e);if(r.position==="fixed")return null}var o=hr(e);for(ko(o)&&(o=o.host);ze(o)&&["html","body"].indexOf(Je(o))<0;){var s=st(o);if(s.transform!=="none"||s.perspective!=="none"||s.contain==="paint"||["transform","perspective"].indexOf(s.willChange)!==-1||t&&s.willChange==="filter"||t&&s.filter&&s.filter!=="none")return o;o=o.parentNode}return null}function _n(e){for(var t=Le(e),n=Cs(e);n&&Zp(n)&&st(n).position==="static";)n=Cs(n);return n&&(Je(n)==="html"||Je(n)==="body"&&st(n).position==="static")?t:n||Qp(e)||t}function No(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function vn(e,t,n){return Ct(e,rr(t,n))}function eu(e,t,n){var r=vn(e,t,n);return r>n?n:r}function ni(){return{top:0,right:0,bottom:0,left:0}}function ri(e){return Object.assign({},ni(),e)}function oi(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var tu=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,ri(typeof t!="number"?t:oi(t,Mn))};function nu(e){var t,n=e.state,r=e.name,o=e.options,s=n.elements.arrow,a=n.modifiersData.popperOffsets,l=Ye(n.placement),c=No(l),d=[Me,qe].indexOf(l)>=0,m=d?"height":"width";if(!(!s||!a)){var v=tu(o.padding,n),g=To(s),p=c==="y"?$e:Me,h=c==="y"?He:qe,f=n.rects.reference[m]+n.rects.reference[c]-a[c]-n.rects.popper[m],b=a[c]-n.rects.reference[c],w=_n(s),R=w?c==="y"?w.clientHeight||0:w.clientWidth||0:0,x=f/2-b/2,E=v[p],y=R-g[m]-v[h],S=R/2-g[m]/2+x,N=vn(E,S,y),j=c;n.modifiersData[r]=(t={},t[j]=N,t.centerOffset=N-S,t)}}function ru(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||ti(t.elements.popper,o)&&(t.elements.arrow=o))}const ou={name:"arrow",enabled:!0,phase:"main",fn:nu,effect:ru,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Yt(e){return e.split("-")[1]}var su={top:"auto",right:"auto",bottom:"auto",left:"auto"};function au(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Xt(n*o)/o||0,y:Xt(r*o)/o||0}}function Os(e){var t,n=e.popper,r=e.popperRect,o=e.placement,s=e.variation,a=e.offsets,l=e.position,c=e.gpuAcceleration,d=e.adaptive,m=e.roundOffsets,v=e.isFixed,g=a.x,p=g===void 0?0:g,h=a.y,f=h===void 0?0:h,b=typeof m=="function"?m({x:p,y:f}):{x:p,y:f};p=b.x,f=b.y;var w=a.hasOwnProperty("x"),R=a.hasOwnProperty("y"),x=Me,E=$e,y=window;if(d){var S=_n(n),N="clientHeight",j="clientWidth";if(S===Le(n)&&(S=ht(n),st(S).position!=="static"&&l==="absolute"&&(N="scrollHeight",j="scrollWidth")),S=S,o===$e||(o===Me||o===qe)&&s===Sn){E=He;var I=v&&S===y&&y.visualViewport?y.visualViewport.height:S[N];f-=I-r.height,f*=c?1:-1}if(o===Me||(o===$e||o===He)&&s===Sn){x=qe;var F=v&&S===y&&y.visualViewport?y.visualViewport.width:S[j];p-=F-r.width,p*=c?1:-1}}var P=Object.assign({position:l},d&&su),_=m===!0?au({x:p,y:f},Le(n)):{x:p,y:f};if(p=_.x,f=_.y,c){var M;return Object.assign({},P,(M={},M[E]=R?"0":"",M[x]=w?"0":"",M.transform=(y.devicePixelRatio||1)<=1?"translate("+p+"px, "+f+"px)":"translate3d("+p+"px, "+f+"px, 0)",M))}return Object.assign({},P,(t={},t[E]=R?f+"px":"",t[x]=w?p+"px":"",t.transform="",t))}function iu(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,s=n.adaptive,a=s===void 0?!0:s,l=n.roundOffsets,c=l===void 0?!0:l,d={placement:Ye(t.placement),variation:Yt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Os(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Os(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const lu={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:iu,data:{}};var zn={passive:!0};function cu(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,s=o===void 0?!0:o,a=r.resize,l=a===void 0?!0:a,c=Le(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return s&&d.forEach(function(m){m.addEventListener("scroll",n.update,zn)}),l&&c.addEventListener("resize",n.update,zn),function(){s&&d.forEach(function(m){m.removeEventListener("scroll",n.update,zn)}),l&&c.removeEventListener("resize",n.update,zn)}}const pu={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:cu,data:{}};var uu={left:"right",right:"left",bottom:"top",top:"bottom"};function Xn(e){return e.replace(/left|right|bottom|top/g,function(t){return uu[t]})}var du={start:"end",end:"start"};function Ps(e){return e.replace(/start|end/g,function(t){return du[t]})}function So(e){var t=Le(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Co(e){return Gt(ht(e)).left+So(e).scrollLeft}function fu(e,t){var n=Le(e),r=ht(e),o=n.visualViewport,s=r.clientWidth,a=r.clientHeight,l=0,c=0;if(o){s=o.width,a=o.height;var d=ei();(d||!d&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:s,height:a,x:l+Co(e),y:c}}function mu(e){var t,n=ht(e),r=So(e),o=(t=e.ownerDocument)==null?void 0:t.body,s=Ct(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=Ct(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Co(e),c=-r.scrollTop;return st(o||n).direction==="rtl"&&(l+=Ct(n.clientWidth,o?o.clientWidth:0)-s),{width:s,height:a,x:l,y:c}}function Oo(e){var t=st(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function si(e){return["html","body","#document"].indexOf(Je(e))>=0?e.ownerDocument.body:ze(e)&&Oo(e)?e:si(hr(e))}function yn(e,t){var n;t===void 0&&(t=[]);var r=si(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),s=Le(r),a=o?[s].concat(s.visualViewport||[],Oo(r)?r:[]):r,l=t.concat(a);return o?l:l.concat(yn(hr(a)))}function ro(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function hu(e,t){var n=Gt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Rs(e,t,n){return t===Za?ro(fu(e,n)):jt(t)?hu(t,n):ro(mu(ht(e)))}function gu(e){var t=yn(hr(e)),n=["absolute","fixed"].indexOf(st(e).position)>=0,r=n&&ze(e)?_n(e):e;return jt(r)?t.filter(function(o){return jt(o)&&ti(o,r)&&Je(o)!=="body"}):[]}function bu(e,t,n,r){var o=t==="clippingParents"?gu(e):[].concat(t),s=[].concat(o,[n]),a=s[0],l=s.reduce(function(c,d){var m=Rs(e,d,r);return c.top=Ct(m.top,c.top),c.right=rr(m.right,c.right),c.bottom=rr(m.bottom,c.bottom),c.left=Ct(m.left,c.left),c},Rs(e,a,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function ai(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ye(r):null,s=r?Yt(r):null,a=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case $e:c={x:a,y:t.y-n.height};break;case He:c={x:a,y:t.y+t.height};break;case qe:c={x:t.x+t.width,y:l};break;case Me:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var d=o?No(o):null;if(d!=null){var m=d==="y"?"height":"width";switch(s){case Wt:c[d]=c[d]-(t[m]/2-n[m]/2);break;case Sn:c[d]=c[d]+(t[m]/2-n[m]/2);break}}return c}function Cn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,s=n.strategy,a=s===void 0?e.strategy:s,l=n.boundary,c=l===void 0?Dp:l,d=n.rootBoundary,m=d===void 0?Za:d,v=n.elementContext,g=v===void 0?sn:v,p=n.altBoundary,h=p===void 0?!1:p,f=n.padding,b=f===void 0?0:f,w=ri(typeof b!="number"?b:oi(b,Mn)),R=g===sn?Bp:sn,x=e.rects.popper,E=e.elements[h?R:g],y=bu(jt(E)?E:E.contextElement||ht(e.elements.popper),c,m,a),S=Gt(e.elements.reference),N=ai({reference:S,element:x,strategy:"absolute",placement:o}),j=ro(Object.assign({},x,N)),I=g===sn?j:S,F={top:y.top-I.top+w.top,bottom:I.bottom-y.bottom+w.bottom,left:y.left-I.left+w.left,right:I.right-y.right+w.right},P=e.modifiersData.offset;if(g===sn&&P){var _=P[o];Object.keys(F).forEach(function(M){var z=[qe,He].indexOf(M)>=0?1:-1,U=[$e,He].indexOf(M)>=0?"y":"x";F[M]+=_[U]*z})}return F}function vu(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,s=n.rootBoundary,a=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,d=c===void 0?Qa:c,m=Yt(r),v=m?l?Ss:Ss.filter(function(h){return Yt(h)===m}):Mn,g=v.filter(function(h){return d.indexOf(h)>=0});g.length===0&&(g=v);var p=g.reduce(function(h,f){return h[f]=Cn(e,{placement:f,boundary:o,rootBoundary:s,padding:a})[Ye(f)],h},{});return Object.keys(p).sort(function(h,f){return p[h]-p[f]})}function yu(e){if(Ye(e)===Eo)return[];var t=Xn(e);return[Ps(e),t,Ps(t)]}function wu(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,s=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!0:a,c=n.fallbackPlacements,d=n.padding,m=n.boundary,v=n.rootBoundary,g=n.altBoundary,p=n.flipVariations,h=p===void 0?!0:p,f=n.allowedAutoPlacements,b=t.options.placement,w=Ye(b),R=w===b,x=c||(R||!h?[Xn(b)]:yu(b)),E=[b].concat(x).reduce(function(W,Y){return W.concat(Ye(Y)===Eo?vu(t,{placement:Y,boundary:m,rootBoundary:v,padding:d,flipVariations:h,allowedAutoPlacements:f}):Y)},[]),y=t.rects.reference,S=t.rects.popper,N=new Map,j=!0,I=E[0],F=0;F<E.length;F++){var P=E[F],_=Ye(P),M=Yt(P)===Wt,z=[$e,He].indexOf(_)>=0,U=z?"width":"height",A=Cn(t,{placement:P,boundary:m,rootBoundary:v,altBoundary:g,padding:d}),H=z?M?qe:Me:M?He:$e;y[U]>S[U]&&(H=Xn(H));var Q=Xn(H),Z=[];if(s&&Z.push(A[_]<=0),l&&Z.push(A[H]<=0,A[Q]<=0),Z.every(function(W){return W})){I=P,j=!1;break}N.set(P,Z)}if(j)for(var O=h?3:1,D=function(Y){var G=E.find(function(V){var q=N.get(V);if(q)return q.slice(0,Y).every(function(J){return J})});if(G)return I=G,"break"},L=O;L>0;L--){var X=D(L);if(X==="break")break}t.placement!==I&&(t.modifiersData[r]._skip=!0,t.placement=I,t.reset=!0)}}const xu={name:"flip",enabled:!0,phase:"main",fn:wu,requiresIfExists:["offset"],data:{_skip:!1}};function js(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function $s(e){return[$e,qe,He,Me].some(function(t){return e[t]>=0})}function Eu(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,s=t.modifiersData.preventOverflow,a=Cn(t,{elementContext:"reference"}),l=Cn(t,{altBoundary:!0}),c=js(a,r),d=js(l,o,s),m=$s(c),v=$s(d);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:d,isReferenceHidden:m,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":m,"data-popper-escaped":v})}const ku={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Eu};function Tu(e,t,n){var r=Ye(e),o=[Me,$e].indexOf(r)>=0?-1:1,s=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,a=s[0],l=s[1];return a=a||0,l=(l||0)*o,[Me,qe].indexOf(r)>=0?{x:l,y:a}:{x:a,y:l}}function Nu(e){var t=e.state,n=e.options,r=e.name,o=n.offset,s=o===void 0?[0,0]:o,a=Qa.reduce(function(m,v){return m[v]=Tu(v,t.rects,s),m},{}),l=a[t.placement],c=l.x,d=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=d),t.modifiersData[r]=a}const Su={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Nu};function Cu(e){var t=e.state,n=e.name;t.modifiersData[n]=ai({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Ou={name:"popperOffsets",enabled:!0,phase:"read",fn:Cu,data:{}};function Pu(e){return e==="x"?"y":"x"}function Ru(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,s=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!1:a,c=n.boundary,d=n.rootBoundary,m=n.altBoundary,v=n.padding,g=n.tether,p=g===void 0?!0:g,h=n.tetherOffset,f=h===void 0?0:h,b=Cn(t,{boundary:c,rootBoundary:d,padding:v,altBoundary:m}),w=Ye(t.placement),R=Yt(t.placement),x=!R,E=No(w),y=Pu(E),S=t.modifiersData.popperOffsets,N=t.rects.reference,j=t.rects.popper,I=typeof f=="function"?f(Object.assign({},t.rects,{placement:t.placement})):f,F=typeof I=="number"?{mainAxis:I,altAxis:I}:Object.assign({mainAxis:0,altAxis:0},I),P=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,_={x:0,y:0};if(S){if(s){var M,z=E==="y"?$e:Me,U=E==="y"?He:qe,A=E==="y"?"height":"width",H=S[E],Q=H+b[z],Z=H-b[U],O=p?-j[A]/2:0,D=R===Wt?N[A]:j[A],L=R===Wt?-j[A]:-N[A],X=t.elements.arrow,W=p&&X?To(X):{width:0,height:0},Y=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:ni(),G=Y[z],V=Y[U],q=vn(0,N[A],W[A]),J=x?N[A]/2-O-q-G-F.mainAxis:D-q-G-F.mainAxis,ee=x?-N[A]/2+O+q+V+F.mainAxis:L+q+V+F.mainAxis,se=t.elements.arrow&&_n(t.elements.arrow),B=se?E==="y"?se.clientTop||0:se.clientLeft||0:0,te=(M=P==null?void 0:P[E])!=null?M:0,$=H+J-te-B,ae=H+ee-te,ke=vn(p?rr(Q,$):Q,H,p?Ct(Z,ae):Z);S[E]=ke,_[E]=ke-H}if(l){var Pe,xe=E==="x"?$e:Me,bt=E==="x"?He:qe,Re=S[y],Qe=y==="y"?"height":"width",Ie=Re+b[xe],et=Re-b[bt],Ne=[$e,Me].indexOf(w)!==-1,Mt=(Pe=P==null?void 0:P[y])!=null?Pe:0,vt=Ne?Ie:Re-N[Qe]-j[Qe]-Mt+F.altAxis,Zt=Ne?Re+N[Qe]+j[Qe]-Mt-F.altAxis:et,Bn=p&&Ne?eu(vt,Re,Zt):vn(p?vt:Ie,Re,p?Zt:et);S[y]=Bn,_[y]=Bn-Re}t.modifiersData[r]=_}}const ju={name:"preventOverflow",enabled:!0,phase:"main",fn:Ru,requiresIfExists:["offset"]};function $u(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Mu(e){return e===Le(e)||!ze(e)?So(e):$u(e)}function _u(e){var t=e.getBoundingClientRect(),n=Xt(t.width)/e.offsetWidth||1,r=Xt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Iu(e,t,n){n===void 0&&(n=!1);var r=ze(t),o=ze(t)&&_u(t),s=ht(t),a=Gt(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((Je(t)!=="body"||Oo(s))&&(l=Mu(t)),ze(t)?(c=Gt(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):s&&(c.x=Co(s))),{x:a.left+l.scrollLeft-c.x,y:a.top+l.scrollTop-c.y,width:a.width,height:a.height}}function Au(e){var t=new Map,n=new Set,r=[];e.forEach(function(s){t.set(s.name,s)});function o(s){n.add(s.name);var a=[].concat(s.requires||[],s.requiresIfExists||[]);a.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(s)}return e.forEach(function(s){n.has(s.name)||o(s)}),r}function Du(e){var t=Au(e);return Gp.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Bu(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Lu(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var Ms={placement:"bottom",modifiers:[],strategy:"absolute"};function _s(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Fu(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,s=o===void 0?Ms:o;return function(l,c,d){d===void 0&&(d=s);var m={placement:"bottom",orderedModifiers:[],options:Object.assign({},Ms,s),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},v=[],g=!1,p={state:m,setOptions:function(w){var R=typeof w=="function"?w(m.options):w;f(),m.options=Object.assign({},s,m.options,R),m.scrollParents={reference:jt(l)?yn(l):l.contextElement?yn(l.contextElement):[],popper:yn(c)};var x=Du(Lu([].concat(r,m.options.modifiers)));return m.orderedModifiers=x.filter(function(E){return E.enabled}),h(),p.update()},forceUpdate:function(){if(!g){var w=m.elements,R=w.reference,x=w.popper;if(_s(R,x)){m.rects={reference:Iu(R,_n(x),m.options.strategy==="fixed"),popper:To(x)},m.reset=!1,m.placement=m.options.placement,m.orderedModifiers.forEach(function(F){return m.modifiersData[F.name]=Object.assign({},F.data)});for(var E=0;E<m.orderedModifiers.length;E++){if(m.reset===!0){m.reset=!1,E=-1;continue}var y=m.orderedModifiers[E],S=y.fn,N=y.options,j=N===void 0?{}:N,I=y.name;typeof S=="function"&&(m=S({state:m,options:j,name:I,instance:p})||m)}}}},update:Bu(function(){return new Promise(function(b){p.forceUpdate(),b(m)})}),destroy:function(){f(),g=!0}};if(!_s(l,c))return p;p.setOptions(d).then(function(b){!g&&d.onFirstUpdate&&d.onFirstUpdate(b)});function h(){m.orderedModifiers.forEach(function(b){var w=b.name,R=b.options,x=R===void 0?{}:R,E=b.effect;if(typeof E=="function"){var y=E({state:m,name:w,instance:p,options:x}),S=function(){};v.push(y||S)}})}function f(){v.forEach(function(b){return b()}),v=[]}return p}}var Vu=[pu,Ou,lu,Jp,Su,xu,ju,ou,ku],zu=Fu({defaultModifiers:Vu});const ii="Popper";function Uu(e){return Ja(ii,e)}wp(ii,["root"]);const Hu=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],qu=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Wu(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function or(e){return typeof e=="function"?e():e}function gr(e){return e.nodeType!==void 0}function Xu(e){return!gr(e)}const Gu=()=>it({root:["root"]},mp(Uu)),Yu={},Ku=k.forwardRef(function(t,n){var r;const{anchorEl:o,children:s,direction:a,disablePortal:l,modifiers:c,open:d,placement:m,popperOptions:v,popperRef:g,slotProps:p={},slots:h={},TransitionProps:f}=t,b=fe(t,Hu),w=k.useRef(null),R=Ue(w,n),x=k.useRef(null),E=Ue(x,g),y=k.useRef(E);Pt(()=>{y.current=E},[E]),k.useImperativeHandle(g,()=>x.current,[]);const S=Wu(m,a),[N,j]=k.useState(S),[I,F]=k.useState(or(o));k.useEffect(()=>{x.current&&x.current.forceUpdate()}),k.useEffect(()=>{o&&F(or(o))},[o]),Pt(()=>{if(!I||!d)return;const U=Q=>{j(Q.placement)};if(process.env.NODE_ENV!=="production"&&I&&gr(I)&&I.nodeType===1){const Q=I.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Q.top===0&&Q.left===0&&Q.right===0&&Q.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let A=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:Q})=>{U(Q)}}];c!=null&&(A=A.concat(c)),v&&v.modifiers!=null&&(A=A.concat(v.modifiers));const H=zu(I,w.current,C({placement:S},v,{modifiers:A}));return y.current(H),()=>{H.destroy(),y.current(null)}},[I,l,c,d,v,S]);const P={placement:N};f!==null&&(P.TransitionProps=f);const _=Gu(),M=(r=h.root)!=null?r:"div",z=Rt({elementType:M,externalSlotProps:p.root,externalForwardedProps:b,additionalProps:{role:"tooltip",ref:R},ownerState:t,className:_.root});return u.jsx(M,C({},z,{children:typeof s=="function"?s(P):s}))}),li=k.forwardRef(function(t,n){const{anchorEl:r,children:o,container:s,direction:a="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:d,open:m,placement:v="bottom",popperOptions:g=Yu,popperRef:p,style:h,transition:f=!1,slotProps:b={},slots:w={}}=t,R=fe(t,qu),[x,E]=k.useState(!0),y=()=>{E(!1)},S=()=>{E(!0)};if(!c&&!m&&(!f||x))return null;let N;if(s)N=s;else if(r){const F=or(r);N=F&&gr(F)?Ce(F).body:Ce(null).body}const j=!m&&c&&(!f||x)?"none":void 0,I=f?{in:m,onEnter:y,onExited:S}:void 0;return u.jsx(Nn,{disablePortal:l,container:N,children:u.jsx(Ku,C({anchorEl:r,direction:a,disablePortal:l,modifiers:d,ref:n,open:f?!x:m,placement:v,popperOptions:g,popperRef:p,slotProps:b,slots:w},R,{style:C({position:"fixed",top:0,left:0,display:j},h),TransitionProps:I,children:o}))})});process.env.NODE_ENV!=="production"&&(li.propTypes={anchorEl:Jt(i.oneOfType([ot,i.object,i.func]),e=>{if(e.open){const t=or(e.anchorEl);if(t&&gr(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Xu(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:i.oneOfType([i.node,i.func]),container:i.oneOfType([ot,i.func]),direction:i.oneOf(["ltr","rtl"]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:xo,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),transition:i.bool});const Ju=["values","unit","step"],Zu=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>C({},n,{[r.key]:r.val}),{})};function Qu(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=fe(e,Ju),s=Zu(t),a=Object.keys(s);function l(g){return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${n})`}function c(g){return`@media (max-width:${(typeof t[g]=="number"?t[g]:g)-r/100}${n})`}function d(g,p){const h=a.indexOf(p);return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${n}) and (max-width:${(h!==-1&&typeof t[a[h]]=="number"?t[a[h]]:p)-r/100}${n})`}function m(g){return a.indexOf(g)+1<a.length?d(g,a[a.indexOf(g)+1]):l(g)}function v(g){const p=a.indexOf(g);return p===0?l(a[1]):p===a.length-1?c(a[p]):d(g,a[a.indexOf(g)+1]).replace("@media","@media not all and")}return C({keys:a,values:s,up:l,down:c,between:d,only:m,not:v,unit:n},o)}const ed={borderRadius:4},td=ed,nd=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.string,i.object,i.array]):{},gt=nd;function wn(e,t){return t?rt(e,t,{clone:!1}):e}const Po={xs:0,sm:600,md:900,lg:1200,xl:1536},Is={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Po[e]}px)`};function at(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const s=r.breakpoints||Is;return t.reduce((a,l,c)=>(a[s.up(s.keys[c])]=n(t[c]),a),{})}if(typeof t=="object"){const s=r.breakpoints||Is;return Object.keys(t).reduce((a,l)=>{if(Object.keys(s.values||Po).indexOf(l)!==-1){const c=s.up(l);a[c]=n(t[l],l)}else{const c=l;a[c]=t[c]}return a},{})}return n(t)}function rd(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const s=e.up(o);return r[s]={},r},{}))||{}}function od(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function br(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,s)=>o&&o[s]?o[s]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function sr(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=br(e,n)||r,t&&(o=t(o,r,e)),o}function Ee(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,s=a=>{if(a[t]==null)return null;const l=a[t],c=a.theme,d=br(c,r)||{};return at(a,l,v=>{let g=sr(d,o,v);return v===g&&typeof v=="string"&&(g=sr(d,o,`${t}${v==="default"?"":Ke(v)}`,v)),n===!1?g:{[n]:g}})};return s.propTypes=process.env.NODE_ENV!=="production"?{[t]:gt}:{},s.filterProps=[t],s}function sd(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const ad={m:"margin",p:"padding"},id={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},As={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},ld=sd(e=>{if(e.length>2)if(As[e])e=As[e];else return[e];const[t,n]=e.split(""),r=ad[t],o=id[n]||"";return Array.isArray(o)?o.map(s=>r+s):[r+o]}),vr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],yr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],cd=[...vr,...yr];function In(e,t,n,r){var o;const s=(o=br(e,t,!1))!=null?o:n;return typeof s=="number"?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&typeof a!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`),s*a):Array.isArray(s)?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&(Number.isInteger(a)?a>s.length-1&&console.error([`MUI: The value provided (${a}) overflows.`,`The supported values are: ${JSON.stringify(s)}.`,`${a} > ${s.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),s[a]):typeof s=="function"?s:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${s}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function ci(e){return In(e,"spacing",8,"spacing")}function An(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function pd(e,t){return n=>e.reduce((r,o)=>(r[o]=An(t,n),r),{})}function ud(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=ld(n),s=pd(o,r),a=e[n];return at(e,a,s)}function pi(e,t){const n=ci(e.theme);return Object.keys(e).map(r=>ud(e,t,r,n)).reduce(wn,{})}function be(e){return pi(e,vr)}be.propTypes=process.env.NODE_ENV!=="production"?vr.reduce((e,t)=>(e[t]=gt,e),{}):{};be.filterProps=vr;function ve(e){return pi(e,yr)}ve.propTypes=process.env.NODE_ENV!=="production"?yr.reduce((e,t)=>(e[t]=gt,e),{}):{};ve.filterProps=yr;process.env.NODE_ENV!=="production"&&cd.reduce((e,t)=>(e[t]=gt,e),{});function dd(e=8){if(e.mui)return e;const t=ci({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(s=>{const a=t(s);return typeof a=="number"?`${a}px`:a}).join(" "));return n.mui=!0,n}function wr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(s=>{r[s]=o}),r),{}),n=r=>Object.keys(r).reduce((o,s)=>t[s]?wn(o,t[s](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Ve(e){return typeof e!="number"?e:`${e}px solid`}function We(e,t){return Ee({prop:e,themeKey:"borders",transform:t})}const fd=We("border",Ve),md=We("borderTop",Ve),hd=We("borderRight",Ve),gd=We("borderBottom",Ve),bd=We("borderLeft",Ve),vd=We("borderColor"),yd=We("borderTopColor"),wd=We("borderRightColor"),xd=We("borderBottomColor"),Ed=We("borderLeftColor"),kd=We("outline",Ve),Td=We("outlineColor"),xr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=In(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:An(t,r)});return at(e,e.borderRadius,n)}return null};xr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:gt}:{};xr.filterProps=["borderRadius"];wr(fd,md,hd,gd,bd,vd,yd,wd,xd,Ed,xr,kd,Td);const Er=e=>{if(e.gap!==void 0&&e.gap!==null){const t=In(e.theme,"spacing",8,"gap"),n=r=>({gap:An(t,r)});return at(e,e.gap,n)}return null};Er.propTypes=process.env.NODE_ENV!=="production"?{gap:gt}:{};Er.filterProps=["gap"];const kr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=In(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:An(t,r)});return at(e,e.columnGap,n)}return null};kr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:gt}:{};kr.filterProps=["columnGap"];const Tr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=In(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:An(t,r)});return at(e,e.rowGap,n)}return null};Tr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:gt}:{};Tr.filterProps=["rowGap"];const Nd=Ee({prop:"gridColumn"}),Sd=Ee({prop:"gridRow"}),Cd=Ee({prop:"gridAutoFlow"}),Od=Ee({prop:"gridAutoColumns"}),Pd=Ee({prop:"gridAutoRows"}),Rd=Ee({prop:"gridTemplateColumns"}),jd=Ee({prop:"gridTemplateRows"}),$d=Ee({prop:"gridTemplateAreas"}),Md=Ee({prop:"gridArea"});wr(Er,kr,Tr,Nd,Sd,Cd,Od,Pd,Rd,jd,$d,Md);function zt(e,t){return t==="grey"?t:e}const _d=Ee({prop:"color",themeKey:"palette",transform:zt}),Id=Ee({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:zt}),Ad=Ee({prop:"backgroundColor",themeKey:"palette",transform:zt});wr(_d,Id,Ad);function Be(e){return e<=1&&e!==0?`${e*100}%`:e}const Dd=Ee({prop:"width",transform:Be}),Ro=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const s=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Po[n];return s?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${s}${e.theme.breakpoints.unit}`}:{maxWidth:s}:{maxWidth:Be(n)}};return at(e,e.maxWidth,t)}return null};Ro.filterProps=["maxWidth"];const Bd=Ee({prop:"minWidth",transform:Be}),Ld=Ee({prop:"height",transform:Be}),Fd=Ee({prop:"maxHeight",transform:Be}),Vd=Ee({prop:"minHeight",transform:Be});Ee({prop:"size",cssProperty:"width",transform:Be});Ee({prop:"size",cssProperty:"height",transform:Be});const zd=Ee({prop:"boxSizing"});wr(Dd,Ro,Bd,Ld,Fd,Vd,zd);const Ud={border:{themeKey:"borders",transform:Ve},borderTop:{themeKey:"borders",transform:Ve},borderRight:{themeKey:"borders",transform:Ve},borderBottom:{themeKey:"borders",transform:Ve},borderLeft:{themeKey:"borders",transform:Ve},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Ve},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:xr},color:{themeKey:"palette",transform:zt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:zt},backgroundColor:{themeKey:"palette",transform:zt},p:{style:ve},pt:{style:ve},pr:{style:ve},pb:{style:ve},pl:{style:ve},px:{style:ve},py:{style:ve},padding:{style:ve},paddingTop:{style:ve},paddingRight:{style:ve},paddingBottom:{style:ve},paddingLeft:{style:ve},paddingX:{style:ve},paddingY:{style:ve},paddingInline:{style:ve},paddingInlineStart:{style:ve},paddingInlineEnd:{style:ve},paddingBlock:{style:ve},paddingBlockStart:{style:ve},paddingBlockEnd:{style:ve},m:{style:be},mt:{style:be},mr:{style:be},mb:{style:be},ml:{style:be},mx:{style:be},my:{style:be},margin:{style:be},marginTop:{style:be},marginRight:{style:be},marginBottom:{style:be},marginLeft:{style:be},marginX:{style:be},marginY:{style:be},marginInline:{style:be},marginInlineStart:{style:be},marginInlineEnd:{style:be},marginBlock:{style:be},marginBlockStart:{style:be},marginBlockEnd:{style:be},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Er},rowGap:{style:Tr},columnGap:{style:kr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Be},maxWidth:{style:Ro},minWidth:{transform:Be},height:{transform:Be},maxHeight:{transform:Be},minHeight:{transform:Be},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},jo=Ud;function Hd(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function qd(e,t){return typeof e=="function"?e(t):e}function Wd(){function e(n,r,o,s){const a={[n]:r,theme:o},l=s[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:d,transform:m,style:v}=l;if(r==null)return null;if(d==="typography"&&r==="inherit")return{[n]:r};const g=br(o,d)||{};return v?v(a):at(a,r,h=>{let f=sr(g,m,h);return h===f&&typeof h=="string"&&(f=sr(g,m,`${n}${h==="default"?"":Ke(h)}`,h)),c===!1?f:{[c]:f}})}function t(n){var r;const{sx:o,theme:s={}}=n||{};if(!o)return null;const a=(r=s.unstable_sxConfig)!=null?r:jo;function l(c){let d=c;if(typeof c=="function")d=c(s);else if(typeof c!="object")return c;if(!d)return null;const m=rd(s.breakpoints),v=Object.keys(m);let g=m;return Object.keys(d).forEach(p=>{const h=qd(d[p],s);if(h!=null)if(typeof h=="object")if(a[p])g=wn(g,e(p,h,s,a));else{const f=at({theme:s},h,b=>({[p]:b}));Hd(f,h)?g[p]=t({sx:h,theme:s}):g=wn(g,f)}else g=wn(g,e(p,h,s,a))}),od(v,g)}return Array.isArray(o)?o.map(l):l(o)}return t}const ui=Wd();ui.filterProps=["sx"];const $o=ui;function Xd(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Gd=["breakpoints","palette","spacing","shape"];function Mo(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:s={}}=e,a=fe(e,Gd),l=Qu(n),c=dd(o);let d=rt({breakpoints:l,direction:"ltr",components:{},palette:C({mode:"light"},r),spacing:c,shape:C({},td,s)},a);return d.applyStyles=Xd,d=t.reduce((m,v)=>rt(m,v),d),d.unstable_sxConfig=C({},jo,a==null?void 0:a.unstable_sxConfig),d.unstable_sx=function(v){return $o({sx:v,theme:this})},d}function Yd(e){return Object.keys(e).length===0}function di(e=null){const t=k.useContext(Gr.ThemeContext);return!t||Yd(t)?e:t}const Kd=Mo();function fi(e=Kd){return di(e)}const Jd=["ownerState"],Zd=["variants"],Qd=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function ef(e){return Object.keys(e).length===0}function tf(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Gn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const nf=Mo(),Ds=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Un({defaultTheme:e,theme:t,themeId:n}){return ef(t)?e:t[n]||t}function rf(e){return e?(t,n)=>n[e]:null}function Yn(e,t){let{ownerState:n}=t,r=fe(t,Jd);const o=typeof e=="function"?e(C({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(s=>Yn(s,C({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:s=[]}=o;let l=fe(o,Zd);return s.forEach(c=>{let d=!0;typeof c.props=="function"?d=c.props(C({ownerState:n},r,n)):Object.keys(c.props).forEach(m=>{(n==null?void 0:n[m])!==c.props[m]&&r[m]!==c.props[m]&&(d=!1)}),d&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(C({ownerState:n},r,n)):c.style))}),l}return o}function of(e={}){const{themeId:t,defaultTheme:n=nf,rootShouldForwardProp:r=Gn,slotShouldForwardProp:o=Gn}=e,s=a=>$o(C({},a,{theme:Un(C({},a,{defaultTheme:n,themeId:t}))}));return s.__mui_systemSx=!0,(a,l={})=>{Gr.internal_processStyles(a,y=>y.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:c,slot:d,skipVariantsResolver:m,skipSx:v,overridesResolver:g=rf(Ds(d))}=l,p=fe(l,Qd),h=m!==void 0?m:d&&d!=="Root"&&d!=="root"||!1,f=v||!1;let b;process.env.NODE_ENV!=="production"&&c&&(b=`${c}-${Ds(d||"Root")}`);let w=Gn;d==="Root"||d==="root"?w=r:d?w=o:tf(a)&&(w=void 0);const R=Gr(a,C({shouldForwardProp:w,label:b},p)),x=y=>typeof y=="function"&&y.__emotion_real!==y||Tt(y)?S=>Yn(y,C({},S,{theme:Un({theme:S.theme,defaultTheme:n,themeId:t})})):y,E=(y,...S)=>{let N=x(y);const j=S?S.map(x):[];c&&g&&j.push(P=>{const _=Un(C({},P,{defaultTheme:n,themeId:t}));if(!_.components||!_.components[c]||!_.components[c].styleOverrides)return null;const M=_.components[c].styleOverrides,z={};return Object.entries(M).forEach(([U,A])=>{z[U]=Yn(A,C({},P,{theme:_}))}),g(P,z)}),c&&!h&&j.push(P=>{var _;const M=Un(C({},P,{defaultTheme:n,themeId:t})),z=M==null||(_=M.components)==null||(_=_[c])==null?void 0:_.variants;return Yn({variants:z},C({},P,{theme:M}))}),f||j.push(s);const I=j.length-S.length;if(Array.isArray(y)&&I>0){const P=new Array(I).fill("");N=[...y,...P],N.raw=[...y.raw,...P]}const F=R(N,...j);if(process.env.NODE_ENV!=="production"){let P;c&&(P=`${c}${Ke(d||"")}`),P===void 0&&(P=`Styled(${zc(a)})`),F.displayName=P}return a.muiName&&(F.muiName=a.muiName),F};return R.withConfig&&(E.withConfig=R.withConfig),E}}function sf(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:qa(t.components[n].defaultProps,r)}function af({props:e,name:t,defaultTheme:n,themeId:r}){let o=fi(n);return r&&(o=o[r]||o),sf({theme:o,name:t,props:e})}function _o(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),up(e,t,n)}function lf(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function $t(e){if(e.type)return e;if(e.charAt(0)==="#")return $t(lf(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Ht(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Ht(10,o))}else r=r.split(",");return r=r.map(s=>parseFloat(s)),{type:n,values:r,colorSpace:o}}function Nr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,s)=>s<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function cf(e){e=$t(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,s=r*Math.min(o,1-o),a=(d,m=(d+n/30)%12)=>o-s*Math.max(Math.min(m-3,9-m,1),-1);let l="rgb";const c=[Math.round(a(0)*255),Math.round(a(8)*255),Math.round(a(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),Nr({type:l,values:c})}function Bs(e){e=$t(e);let t=e.type==="hsl"||e.type==="hsla"?$t(cf(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Ls(e,t){const n=Bs(e),r=Bs(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function ar(e,t){return e=$t(e),t=_o(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Nr(e)}function pf(e,t){if(e=$t(e),t=_o(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return Nr(e)}function uf(e,t){if(e=$t(e),t=_o(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return Nr(e)}function df(e,t){return C({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const ff={black:"#000",white:"#fff"},On=ff,mf={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},hf=mf,gf={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},_t=gf,bf={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},It=bf,vf={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},an=vf,yf={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},At=yf,wf={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Dt=wf,xf={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Bt=xf,Ef=["mode","contrastThreshold","tonalOffset"],Fs={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:On.white,default:On.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Lr={text:{primary:On.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:On.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Vs(e,t,n,r){const o=r.light||r,s=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=uf(e.main,o):t==="dark"&&(e.dark=pf(e.main,s)))}function kf(e="light"){return e==="dark"?{main:At[200],light:At[50],dark:At[400]}:{main:At[700],light:At[400],dark:At[800]}}function Tf(e="light"){return e==="dark"?{main:_t[200],light:_t[50],dark:_t[400]}:{main:_t[500],light:_t[300],dark:_t[700]}}function Nf(e="light"){return e==="dark"?{main:It[500],light:It[300],dark:It[700]}:{main:It[700],light:It[400],dark:It[800]}}function Sf(e="light"){return e==="dark"?{main:Dt[400],light:Dt[300],dark:Dt[700]}:{main:Dt[700],light:Dt[500],dark:Dt[900]}}function Cf(e="light"){return e==="dark"?{main:Bt[400],light:Bt[300],dark:Bt[700]}:{main:Bt[800],light:Bt[500],dark:Bt[900]}}function Of(e="light"){return e==="dark"?{main:an[400],light:an[300],dark:an[700]}:{main:"#ed6c02",light:an[500],dark:an[900]}}function Pf(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=fe(e,Ef),s=e.primary||kf(t),a=e.secondary||Tf(t),l=e.error||Nf(t),c=e.info||Sf(t),d=e.success||Cf(t),m=e.warning||Of(t);function v(f){const b=Ls(f,Lr.text.primary)>=n?Lr.text.primary:Fs.text.primary;if(process.env.NODE_ENV!=="production"){const w=Ls(f,b);w<3&&console.error([`MUI: The contrast ratio of ${w}:1 for ${b} on ${f}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return b}const g=({color:f,name:b,mainShade:w=500,lightShade:R=300,darkShade:x=700})=>{if(f=C({},f),!f.main&&f[w]&&(f.main=f[w]),!f.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${w}\` property.`:Ht(11,b?` (${b})`:"",w));if(typeof f.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(f.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Ht(12,b?` (${b})`:"",JSON.stringify(f.main)));return Vs(f,"light",R,r),Vs(f,"dark",x,r),f.contrastText||(f.contrastText=v(f.main)),f},p={dark:Lr,light:Fs};return process.env.NODE_ENV!=="production"&&(p[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),rt(C({common:C({},On),mode:t,primary:g({color:s,name:"primary"}),secondary:g({color:a,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:g({color:l,name:"error"}),warning:g({color:m,name:"warning"}),info:g({color:c,name:"info"}),success:g({color:d,name:"success"}),grey:hf,contrastThreshold:n,getContrastText:v,augmentColor:g,tonalOffset:r},p[t]),o)}const Rf=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function jf(e){return Math.round(e*1e5)/1e5}const zs={textTransform:"uppercase"},Us='"Roboto", "Helvetica", "Arial", sans-serif';function $f(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Us,fontSize:o=14,fontWeightLight:s=300,fontWeightRegular:a=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:d=16,allVariants:m,pxToRem:v}=n,g=fe(n,Rf);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof d!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const p=o/14,h=v||(w=>`${w/d*p}rem`),f=(w,R,x,E,y)=>C({fontFamily:r,fontWeight:w,fontSize:h(R),lineHeight:x},r===Us?{letterSpacing:`${jf(E/R)}em`}:{},y,m),b={h1:f(s,96,1.167,-1.5),h2:f(s,60,1.2,-.5),h3:f(a,48,1.167,0),h4:f(a,34,1.235,.25),h5:f(a,24,1.334,0),h6:f(l,20,1.6,.15),subtitle1:f(a,16,1.75,.15),subtitle2:f(l,14,1.57,.1),body1:f(a,16,1.5,.15),body2:f(a,14,1.43,.15),button:f(l,14,1.75,.4,zs),caption:f(a,12,1.66,.4),overline:f(a,12,2.66,1,zs),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return rt(C({htmlFontSize:d,pxToRem:h,fontFamily:r,fontSize:o,fontWeightLight:s,fontWeightRegular:a,fontWeightMedium:l,fontWeightBold:c},b),g,{clone:!1})}const Mf=.2,_f=.14,If=.12;function ge(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Mf})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${_f})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${If})`].join(",")}const Af=["none",ge(0,2,1,-1,0,1,1,0,0,1,3,0),ge(0,3,1,-2,0,2,2,0,0,1,5,0),ge(0,3,3,-2,0,3,4,0,0,1,8,0),ge(0,2,4,-1,0,4,5,0,0,1,10,0),ge(0,3,5,-1,0,5,8,0,0,1,14,0),ge(0,3,5,-1,0,6,10,0,0,1,18,0),ge(0,4,5,-2,0,7,10,1,0,2,16,1),ge(0,5,5,-3,0,8,10,1,0,3,14,2),ge(0,5,6,-3,0,9,12,1,0,3,16,2),ge(0,6,6,-3,0,10,14,1,0,4,18,3),ge(0,6,7,-4,0,11,15,1,0,4,20,3),ge(0,7,8,-4,0,12,17,2,0,5,22,4),ge(0,7,8,-4,0,13,19,2,0,5,24,4),ge(0,7,9,-4,0,14,21,2,0,5,26,4),ge(0,8,9,-5,0,15,22,2,0,6,28,5),ge(0,8,10,-5,0,16,24,2,0,6,30,5),ge(0,8,11,-5,0,17,26,2,0,6,32,5),ge(0,9,11,-5,0,18,28,2,0,7,34,6),ge(0,9,12,-6,0,19,29,2,0,7,36,6),ge(0,10,13,-6,0,20,31,3,0,8,38,7),ge(0,10,13,-6,0,21,33,3,0,8,40,7),ge(0,10,14,-6,0,22,35,3,0,8,42,7),ge(0,11,14,-7,0,23,36,3,0,9,44,8),ge(0,11,15,-7,0,24,38,3,0,9,46,8)],Df=Af,Bf=["duration","easing","delay"],Lf={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Ff={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Hs(e){return`${Math.round(e)}ms`}function Vf(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function zf(e){const t=C({},Lf,e.easing),n=C({},Ff,e.duration);return C({getAutoHeightDuration:Vf,create:(o=["all"],s={})=>{const{duration:a=n.standard,easing:l=t.easeInOut,delay:c=0}=s,d=fe(s,Bf);if(process.env.NODE_ENV!=="production"){const m=g=>typeof g=="string",v=g=>!isNaN(parseFloat(g));!m(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!v(a)&&!m(a)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`),m(l)||console.error('MUI: Argument "easing" must be a string.'),!v(c)&&!m(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof s!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(d).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(m=>`${m} ${typeof a=="string"?a:Hs(a)} ${l} ${typeof c=="string"?c:Hs(c)}`).join(",")}},e,{easing:t,duration:n})}const Uf={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Hf=Uf,qf=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Wf(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:s={}}=e,a=fe(e,qf);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Ht(18));const l=Pf(r),c=Mo(e);let d=rt(c,{mixins:df(c.breakpoints,n),palette:l,shadows:Df.slice(),typography:$f(l,s),transitions:zf(o),zIndex:C({},Hf)});if(d=rt(d,a),d=t.reduce((m,v)=>rt(m,v),d),process.env.NODE_ENV!=="production"){const m=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],v=(g,p)=>{let h;for(h in g){const f=g[h];if(m.indexOf(h)!==-1&&Object.keys(f).length>0){if(process.env.NODE_ENV!=="production"){const b=Ze("",h);console.error([`MUI: The \`${p}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(g,null,2),"",`Instead, you need to use the '&.${b}' syntax:`,JSON.stringify({root:{[`&.${b}`]:f}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}g[h]={}}}};Object.keys(d.components).forEach(g=>{const p=d.components[g].styleOverrides;p&&g.indexOf("Mui")===0&&v(p,g)})}return d.unstable_sxConfig=C({},jo,a==null?void 0:a.unstable_sxConfig),d.unstable_sx=function(v){return $o({sx:v,theme:this})},d}const Xf=Wf(),Io=Xf,Ao="$$material",mi=e=>Gn(e)&&e!=="classes",Gf=of({themeId:Ao,defaultTheme:Io,rootShouldForwardProp:mi}),Oe=Gf;function Dn(){const e=fi(Io);return process.env.NODE_ENV!=="production"&&k.useDebugValue(e),e[Ao]||e}function lt({props:e,name:t}){return af({props:e,name:t,defaultTheme:Io,themeId:Ao})}function oo(e,t){return oo=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},oo(e,t)}function Yf(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,oo(e,t)}const qs={disabled:!1};var Kf=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.shape({enter:i.number,exit:i.number,appear:i.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&i.oneOfType([i.string,i.shape({enter:i.string,exit:i.string,active:i.string}),i.shape({enter:i.string,enterDone:i.string,enterActive:i.string,exit:i.string,exitDone:i.string,exitActive:i.string})]);const hi=T.createContext(null);var Jf=function(t){return t.scrollTop},hn="unmounted",xt="exited",Et="entering",Vt="entered",so="exiting",ct=function(e){Yf(t,e);function t(r,o){var s;s=e.call(this,r,o)||this;var a=o,l=a&&!a.isMounting?r.enter:r.appear,c;return s.appearStatus=null,r.in?l?(c=xt,s.appearStatus=Et):c=Vt:r.unmountOnExit||r.mountOnEnter?c=hn:c=xt,s.state={status:c},s.nextCallback=null,s}t.getDerivedStateFromProps=function(o,s){var a=o.in;return a&&s.status===hn?{status:xt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var s=null;if(o!==this.props){var a=this.state.status;this.props.in?a!==Et&&a!==Vt&&(s=Et):(a===Et||a===Vt)&&(s=so)}this.updateStatus(!1,s)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,s,a,l;return s=a=l=o,o!=null&&typeof o!="number"&&(s=o.exit,a=o.enter,l=o.appear!==void 0?o.appear:a),{exit:s,enter:a,appear:l}},n.updateStatus=function(o,s){if(o===void 0&&(o=!1),s!==null)if(this.cancelNextCallback(),s===Et){if(this.props.unmountOnExit||this.props.mountOnEnter){var a=this.props.nodeRef?this.props.nodeRef.current:un.findDOMNode(this);a&&Jf(a)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===xt&&this.setState({status:hn})},n.performEnter=function(o){var s=this,a=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[un.findDOMNode(this),l],d=c[0],m=c[1],v=this.getTimeouts(),g=l?v.appear:v.enter;if(!o&&!a||qs.disabled){this.safeSetState({status:Vt},function(){s.props.onEntered(d)});return}this.props.onEnter(d,m),this.safeSetState({status:Et},function(){s.props.onEntering(d,m),s.onTransitionEnd(g,function(){s.safeSetState({status:Vt},function(){s.props.onEntered(d,m)})})})},n.performExit=function(){var o=this,s=this.props.exit,a=this.getTimeouts(),l=this.props.nodeRef?void 0:un.findDOMNode(this);if(!s||qs.disabled){this.safeSetState({status:xt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:so},function(){o.props.onExiting(l),o.onTransitionEnd(a.exit,function(){o.safeSetState({status:xt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,s){s=this.setNextCallback(s),this.setState(o,s)},n.setNextCallback=function(o){var s=this,a=!0;return this.nextCallback=function(l){a&&(a=!1,s.nextCallback=null,o(l))},this.nextCallback.cancel=function(){a=!1},this.nextCallback},n.onTransitionEnd=function(o,s){this.setNextCallback(s);var a=this.props.nodeRef?this.props.nodeRef.current:un.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!a||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[a,this.nextCallback],d=c[0],m=c[1];this.props.addEndListener(d,m)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===hn)return null;var s=this.props,a=s.children;s.in,s.mountOnEnter,s.unmountOnExit,s.appear,s.enter,s.exit,s.timeout,s.addEndListener,s.onEnter,s.onEntering,s.onEntered,s.onExit,s.onExiting,s.onExited,s.nodeRef;var l=fe(s,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return T.createElement(hi.Provider,{value:null},typeof a=="function"?a(o,l):T.cloneElement(T.Children.only(a),l))},t}(T.Component);ct.contextType=hi;ct.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:i.shape({current:typeof Element>"u"?i.any:function(e,t,n,r,o,s){var a=e[t];return i.instanceOf(a&&"ownerDocument"in a?a.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,s)}}),children:i.oneOfType([i.func.isRequired,i.element.isRequired]).isRequired,in:i.bool,mountOnEnter:i.bool,unmountOnExit:i.bool,appear:i.bool,enter:i.bool,exit:i.bool,timeout:function(t){var n=Kf;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),s=1;s<r;s++)o[s-1]=arguments[s];return n.apply(void 0,[t].concat(o))},addEndListener:i.func,onEnter:i.func,onEntering:i.func,onEntered:i.func,onExit:i.func,onExiting:i.func,onExited:i.func}:{};function Lt(){}ct.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Lt,onEntering:Lt,onEntered:Lt,onExit:Lt,onExiting:Lt,onExited:Lt};ct.UNMOUNTED=hn;ct.EXITED=xt;ct.ENTERING=Et;ct.ENTERED=Vt;ct.EXITING=so;const gi=ct,bi=e=>e.scrollTop;function ir(e,t){var n,r;const{timeout:o,easing:s,style:a={}}=e;return{duration:(n=a.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=a.transitionTimingFunction)!=null?r:typeof s=="object"?s[t.mode]:s,delay:a.transitionDelay}}const Zf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function ao(e){return`scale(${e}, ${e**2})`}const Qf={entering:{opacity:1,transform:ao(1)},entered:{opacity:1,transform:"none"}},Fr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Do=k.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:s,easing:a,in:l,onEnter:c,onEntered:d,onEntering:m,onExit:v,onExited:g,onExiting:p,style:h,timeout:f="auto",TransitionComponent:b=gi}=t,w=fe(t,Zf),R=fn(),x=k.useRef(),E=Dn(),y=k.useRef(null),S=Ue(y,s.ref,n),N=U=>A=>{if(U){const H=y.current;A===void 0?U(H):U(H,A)}},j=N(m),I=N((U,A)=>{bi(U);const{duration:H,delay:Q,easing:Z}=ir({style:h,timeout:f,easing:a},{mode:"enter"});let O;f==="auto"?(O=E.transitions.getAutoHeightDuration(U.clientHeight),x.current=O):O=H,U.style.transition=[E.transitions.create("opacity",{duration:O,delay:Q}),E.transitions.create("transform",{duration:Fr?O:O*.666,delay:Q,easing:Z})].join(","),c&&c(U,A)}),F=N(d),P=N(p),_=N(U=>{const{duration:A,delay:H,easing:Q}=ir({style:h,timeout:f,easing:a},{mode:"exit"});let Z;f==="auto"?(Z=E.transitions.getAutoHeightDuration(U.clientHeight),x.current=Z):Z=A,U.style.transition=[E.transitions.create("opacity",{duration:Z,delay:H}),E.transitions.create("transform",{duration:Fr?Z:Z*.666,delay:Fr?H:H||Z*.333,easing:Q})].join(","),U.style.opacity=0,U.style.transform=ao(.75),v&&v(U)}),M=N(g),z=U=>{f==="auto"&&R.start(x.current||0,U),r&&r(y.current,U)};return u.jsx(b,C({appear:o,in:l,nodeRef:y,onEnter:I,onEntered:F,onEntering:j,onExit:_,onExited:M,onExiting:P,addEndListener:z,timeout:f==="auto"?null:f},w,{children:(U,A)=>k.cloneElement(s,C({style:C({opacity:0,transform:ao(.75),visibility:U==="exited"&&!l?"hidden":void 0},Qf[U],h,s.props.style),ref:S},A))}))});process.env.NODE_ENV!=="production"&&(Do.propTypes={addEndListener:i.func,appear:i.bool,children:jn.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});Do.muiSupportAuto=!0;const io=Do,em=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},Ws=em,tm=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],nm=Oe(li,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),vi=k.forwardRef(function(t,n){var r;const o=di(),s=lt({props:t,name:"MuiPopper"}),{anchorEl:a,component:l,components:c,componentsProps:d,container:m,disablePortal:v,keepMounted:g,modifiers:p,open:h,placement:f,popperOptions:b,popperRef:w,transition:R,slots:x,slotProps:E}=s,y=fe(s,tm),S=(r=x==null?void 0:x.root)!=null?r:c==null?void 0:c.Root,N=C({anchorEl:a,container:m,disablePortal:v,keepMounted:g,modifiers:p,open:h,placement:f,popperOptions:b,popperRef:w,transition:R},y);return u.jsx(nm,C({as:l,direction:o==null?void 0:o.direction,slots:{root:S},slotProps:E??d},N,{ref:n}))});process.env.NODE_ENV!=="production"&&(vi.propTypes={anchorEl:i.oneOfType([ot,i.object,i.func]),children:i.oneOfType([i.node,i.func]),component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([ot,i.func]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:xo,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transition:i.bool});const yi=vi;function rm(e){return Ze("MuiTooltip",e)}const om=mt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),dt=om,sm=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function am(e){return Math.round(e*1e5)/1e5}const im=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:s}=e,a={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Ke(s.split("-")[0])}`],arrow:["arrow"]};return it(a,rm,t)},lm=Oe(yi,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>C({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${dt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${dt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${dt.arrow}`]:C({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${dt.arrow}`]:C({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),cm=Oe("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Ke(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>C({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:ar(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${am(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${dt.popper}[data-popper-placement*="left"] &`]:C({transformOrigin:"right center"},t.isRtl?C({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):C({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${dt.popper}[data-popper-placement*="right"] &`]:C({transformOrigin:"left center"},t.isRtl?C({marginRight:"14px"},t.touch&&{marginRight:"24px"}):C({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${dt.popper}[data-popper-placement*="top"] &`]:C({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${dt.popper}[data-popper-placement*="bottom"] &`]:C({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),pm=Oe("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:ar(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Hn=!1;const Xs=new $n;let ln={x:0,y:0};function qn(e,t){return n=>{t&&t(n),e(n)}}const wi=k.forwardRef(function(t,n){var r,o,s,a,l,c,d,m,v,g,p,h,f,b,w,R,x,E,y;const S=lt({props:t,name:"MuiTooltip"}),{arrow:N=!1,children:j,components:I={},componentsProps:F={},describeChild:P=!1,disableFocusListener:_=!1,disableHoverListener:M=!1,disableInteractive:z=!1,disableTouchListener:U=!1,enterDelay:A=100,enterNextDelay:H=0,enterTouchDelay:Q=700,followCursor:Z=!1,id:O,leaveDelay:D=0,leaveTouchDelay:L=1500,onClose:X,onOpen:W,open:Y,placement:G="bottom",PopperComponent:V,PopperProps:q={},slotProps:J={},slots:ee={},title:se,TransitionComponent:B=io,TransitionProps:te}=S,$=fe(S,sm),ae=k.isValidElement(j)?j:u.jsx("span",{children:j}),ke=Dn(),Pe=ke.direction==="rtl",[xe,bt]=k.useState(),[Re,Qe]=k.useState(null),Ie=k.useRef(!1),et=z||Z,Ne=fn(),Mt=fn(),vt=fn(),Zt=fn(),[Bn,Ho]=La({controlled:Y,default:!1,name:"Tooltip",state:"open"});let tt=Bn;if(process.env.NODE_ENV!=="production"){const{current:ne}=k.useRef(Y!==void 0);k.useEffect(()=>{xe&&xe.disabled&&!ne&&se!==""&&xe.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[se,xe,ne])}const Sr=Ba(O),Qt=k.useRef(),Ln=Tn(()=>{Qt.current!==void 0&&(document.body.style.WebkitUserSelect=Qt.current,Qt.current=void 0),Zt.clear()});k.useEffect(()=>Ln,[Ln]);const qo=ne=>{Xs.clear(),Hn=!0,Ho(!0),W&&!tt&&W(ne)},Fn=Tn(ne=>{Xs.start(800+D,()=>{Hn=!1}),Ho(!1),X&&tt&&X(ne),Ne.start(ke.transitions.duration.shortest,()=>{Ie.current=!1})}),Cr=ne=>{Ie.current&&ne.type!=="touchstart"||(xe&&xe.removeAttribute("title"),Mt.clear(),vt.clear(),A||Hn&&H?Mt.start(Hn?H:A,()=>{qo(ne)}):qo(ne))},Wo=ne=>{Mt.clear(),vt.start(D,()=>{Fn(ne)})},{isFocusVisibleRef:Xo,onBlur:El,onFocus:kl,ref:Tl}=Fa(),[,Go]=k.useState(!1),Yo=ne=>{El(ne),Xo.current===!1&&(Go(!1),Wo(ne))},Ko=ne=>{xe||bt(ne.currentTarget),kl(ne),Xo.current===!0&&(Go(!0),Cr(ne))},Jo=ne=>{Ie.current=!0;const Ae=ae.props;Ae.onTouchStart&&Ae.onTouchStart(ne)},Zo=Cr,Qo=Wo,Nl=ne=>{Jo(ne),vt.clear(),Ne.clear(),Ln(),Qt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Zt.start(Q,()=>{document.body.style.WebkitUserSelect=Qt.current,Cr(ne)})},Sl=ne=>{ae.props.onTouchEnd&&ae.props.onTouchEnd(ne),Ln(),vt.start(L,()=>{Fn(ne)})};k.useEffect(()=>{if(!tt)return;function ne(Ae){(Ae.key==="Escape"||Ae.key==="Esc")&&Fn(Ae)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[Fn,tt]);const Cl=Ue(ae.ref,Tl,bt,n);!se&&se!==0&&(tt=!1);const Or=k.useRef(),Ol=ne=>{const Ae=ae.props;Ae.onMouseMove&&Ae.onMouseMove(ne),ln={x:ne.clientX,y:ne.clientY},Or.current&&Or.current.update()},en={},Pr=typeof se=="string";P?(en.title=!tt&&Pr&&!M?se:null,en["aria-describedby"]=tt?Sr:null):(en["aria-label"]=Pr?se:null,en["aria-labelledby"]=tt&&!Pr?Sr:null);const Fe=C({},en,$,ae.props,{className:Se($.className,ae.props.className),onTouchStart:Jo,ref:Cl},Z?{onMouseMove:Ol}:{});process.env.NODE_ENV!=="production"&&(Fe["data-mui-internal-clone-element"]=!0,k.useEffect(()=>{xe&&!xe.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[xe]));const tn={};U||(Fe.onTouchStart=Nl,Fe.onTouchEnd=Sl),M||(Fe.onMouseOver=qn(Zo,Fe.onMouseOver),Fe.onMouseLeave=qn(Qo,Fe.onMouseLeave),et||(tn.onMouseOver=Zo,tn.onMouseLeave=Qo)),_||(Fe.onFocus=qn(Ko,Fe.onFocus),Fe.onBlur=qn(Yo,Fe.onBlur),et||(tn.onFocus=Ko,tn.onBlur=Yo)),process.env.NODE_ENV!=="production"&&ae.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ae.props.title}\` or the Tooltip component.`].join(`
`));const Pl=k.useMemo(()=>{var ne;let Ae=[{name:"arrow",enabled:!!Re,options:{element:Re,padding:4}}];return(ne=q.popperOptions)!=null&&ne.modifiers&&(Ae=Ae.concat(q.popperOptions.modifiers)),C({},q.popperOptions,{modifiers:Ae})},[Re,q]),nn=C({},S,{isRtl:Pe,arrow:N,disableInteractive:et,placement:G,PopperComponentProp:V,touch:Ie.current}),Rr=im(nn),es=(r=(o=ee.popper)!=null?o:I.Popper)!=null?r:lm,ts=(s=(a=(l=ee.transition)!=null?l:I.Transition)!=null?a:B)!=null?s:io,ns=(c=(d=ee.tooltip)!=null?d:I.Tooltip)!=null?c:cm,rs=(m=(v=ee.arrow)!=null?v:I.Arrow)!=null?m:pm,Rl=mn(es,C({},q,(g=J.popper)!=null?g:F.popper,{className:Se(Rr.popper,q==null?void 0:q.className,(p=(h=J.popper)!=null?h:F.popper)==null?void 0:p.className)}),nn),jl=mn(ts,C({},te,(f=J.transition)!=null?f:F.transition),nn),$l=mn(ns,C({},(b=J.tooltip)!=null?b:F.tooltip,{className:Se(Rr.tooltip,(w=(R=J.tooltip)!=null?R:F.tooltip)==null?void 0:w.className)}),nn),Ml=mn(rs,C({},(x=J.arrow)!=null?x:F.arrow,{className:Se(Rr.arrow,(E=(y=J.arrow)!=null?y:F.arrow)==null?void 0:E.className)}),nn);return u.jsxs(k.Fragment,{children:[k.cloneElement(ae,Fe),u.jsx(es,C({as:V??yi,placement:G,anchorEl:Z?{getBoundingClientRect:()=>({top:ln.y,left:ln.x,right:ln.x,bottom:ln.y,width:0,height:0})}:xe,popperRef:Or,open:xe?tt:!1,id:Sr,transition:!0},tn,Rl,{popperOptions:Pl,children:({TransitionProps:ne})=>u.jsx(ts,C({timeout:ke.transitions.duration.shorter},ne,jl,{children:u.jsxs(ns,C({},$l,{children:[se,N?u.jsx(rs,C({},Ml,{ref:Qe})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(wi.propTypes={arrow:i.bool,children:jn.isRequired,classes:i.object,className:i.string,components:i.shape({Arrow:i.elementType,Popper:i.elementType,Tooltip:i.elementType,Transition:i.elementType}),componentsProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),describeChild:i.bool,disableFocusListener:i.bool,disableHoverListener:i.bool,disableInteractive:i.bool,disableTouchListener:i.bool,enterDelay:i.number,enterNextDelay:i.number,enterTouchDelay:i.number,followCursor:i.bool,id:i.string,leaveDelay:i.number,leaveTouchDelay:i.number,onClose:i.func,onOpen:i.func,open:i.bool,placement:i.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:i.elementType,PopperProps:i.object,slotProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),slots:i.shape({arrow:i.elementType,popper:i.elementType,tooltip:i.elementType,transition:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),title:i.node,TransitionComponent:i.elementType,TransitionProps:i.object});const um=wi;var Bo={},xi={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(xi);var dm=xi.exports,Vr={};function fm(e){return Ze("MuiSvgIcon",e)}mt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const mm=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],hm=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Ke(t)}`,`fontSize${Ke(n)}`]};return it(o,fm,r)},gm=Oe("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Ke(n.color)}`],t[`fontSize${Ke(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,s,a,l,c,d,m,v,g,p,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((s=e.typography)==null||(a=s.pxToRem)==null?void 0:a.call(s,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((d=e.typography)==null||(m=d.pxToRem)==null?void 0:m.call(d,35))||"2.1875rem"}[t.fontSize],color:(v=(g=(e.vars||e).palette)==null||(g=g[t.color])==null?void 0:g.main)!=null?v:{action:(p=(e.vars||e).palette)==null||(p=p.action)==null?void 0:p.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),Lo=k.forwardRef(function(t,n){const r=lt({props:t,name:"MuiSvgIcon"}),{children:o,className:s,color:a="inherit",component:l="svg",fontSize:c="medium",htmlColor:d,inheritViewBox:m=!1,titleAccess:v,viewBox:g="0 0 24 24"}=r,p=fe(r,mm),h=k.isValidElement(o)&&o.type==="svg",f=C({},r,{color:a,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:m,viewBox:g,hasSvgAsChild:h}),b={};m||(b.viewBox=g);const w=hm(f);return u.jsxs(gm,C({as:l,className:Se(w.root,s),focusable:"false",color:d,"aria-hidden":v?void 0:!0,role:v?"img":void 0,ref:n},b,p,h&&o.props,{ownerState:f,children:[h?o.props.children:o,v?u.jsx("title",{children:v}):null]}))});process.env.NODE_ENV!=="production"&&(Lo.propTypes={children:i.node,classes:i.object,className:i.string,color:i.oneOfType([i.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),i.string]),component:i.elementType,fontSize:i.oneOfType([i.oneOf(["inherit","large","medium","small"]),i.string]),htmlColor:i.string,inheritViewBox:i.bool,shapeRendering:i.string,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),titleAccess:i.string,viewBox:i.string});Lo.muiName="SvgIcon";const Gs=Lo;function Ei(e,t){function n(r,o){return u.jsx(Gs,C({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Gs.muiName,k.memo(k.forwardRef(n))}const bm={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Wa.configure(e)}},vm=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Ke,createChainedFunction:Qr,createSvgIcon:Ei,debounce:Da,deprecatedPropType:Hc,isMuiElement:qc,ownerDocument:Ce,ownerWindow:qt,requirePropFactory:Wc,setRef:tr,unstable_ClassNameGenerator:bm,unstable_useEnhancedEffect:Pt,unstable_useId:Ba,unsupportedProp:Yc,useControlled:La,useEventCallback:Tn,useForkRef:Ue,useIsFocusVisible:Fa},Symbol.toStringTag,{value:"Module"})),ym=kc(vm);var Ys;function wm(){return Ys||(Ys=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=ym}(Vr)),Vr}var xm=dm;Object.defineProperty(Bo,"__esModule",{value:!0});var ki=Bo.default=void 0,Em=xm(wm()),km=u;ki=Bo.default=(0,Em.default)((0,km.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function Ks(e,t,n){return e?u.jsx(ye.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:u.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Fo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:s=void 0,iconPathAfter:a=void 0,hasAutoFocus:l=!1,className:c,isDisabled:d=!1,isDense:m=!0,isSubMenuParent:v=!1,hasDisabledGutters:g=!1,hasDivider:p=!1,focusVisibleClassName:h,id:f,children:b}=e,w=u.jsx(ye.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:d,dense:m,disableGutters:g,divider:p,focusVisibleClassName:h,onClick:t,id:f,children:n?u.jsxs(u.Fragment,{children:[Ks(s,n,!0),u.jsx(ye.ListItemText,{primary:n,inset:!s&&o}),v?u.jsx(ye.ListItemIcon,{className:"papi-menu-icon-trailing",children:u.jsx(ki,{})}):Ks(a,n,!1)]}):b});return r?u.jsx(um,{title:r,placement:"right",children:u.jsx("div",{children:w})}):w}function Ti(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Tm(e){const[t,n]=T.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:s}=e,a=d=>{n(d.currentTarget)},l=()=>{n(void 0)},c=()=>{let d=Ti(s).filter(m=>"menuItem"in m.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return d=d.filter(m=>"menuItem"in m.group&&m.group.menuItem===r.id),u.jsx(Vo,{...e,includedGroups:d})};return u.jsxs(u.Fragment,{children:[u.jsx(Fo,{onClick:a,...o,isSubMenuParent:!0}),u.jsx(ye.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Nm=(e,t)=>t.filter(o=>o.group===e).sort((o,s)=>(o.order||0)-(s.order||0));function Vo(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:s,allowForLeadingIcons:a}=T.useMemo(()=>{const m=o&&o.length>0?o:Ti(t).filter(h=>!("menuItem"in h.group)),v=Object.values(m).sort((h,f)=>(h.group.order||0)-(f.group.order||0)),g=[];v.forEach(h=>{Nm(h.id,t.items).forEach(f=>g.push({item:f,isLastItemInGroup:!1})),g.length>0&&(g[g.length-1].isLastItemInGroup=!0)}),g.length>0&&(g[g.length-1].isLastItemInGroup=!1);const p=g.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:g,allowForLeadingIcons:p}},[o,t]),l=({item:m,isLastItemInGroup:v})=>({className:"papi-menu-item",label:m.label,tooltip:m.tooltip,iconPathBefore:"iconPathBefore"in m?m.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in m?m.iconPathAfter:void 0,hasDivider:v,allowForLeadingIcons:a}),[c]=s;if(!c)return u.jsx("div",{});const d=c.item.group;return u.jsx("div",{role:"menu","aria-label":d,children:s.map((m,v)=>{const{item:g}=m,p=l(m);if("command"in g){const h=g.group+v;return u.jsx(Fo,{onClick:f=>{n==null||n(f),r(g)},...p},h)}return u.jsx(Tm,{parentMenuItem:g,parentItemProps:p,...e},d+g.id)})},d)}function Sm(e){const{menuDefinition:t,columnId:n}=e;let s=Object.entries(t.groups).map(([a,l])=>({id:a,group:l})).filter(a=>"column"in a.group);return n&&"columns"in t&&t.columns[n]&&(s=s.filter(a=>"column"in a.group&&a.group.column===n)),u.jsx(Vo,{...e,includedGroups:s})}function Cm({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:s}){return u.jsxs(ye.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${s??""}`,children:[u.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${s??""}`,children:r.label}),u.jsx(ye.List,{id:n,dense:!0,className:s??"",children:u.jsx(Sm,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Ni({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,s=T.useMemo(()=>{const a=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,d=o[c];typeof d=="object"&&typeof d.order=="number"&&!Number.isNaN(d.order)?a.set(d.order,{id:c,metadata:d}):console.warn(`Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(a.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return u.jsx(ye.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:s.length,role:"menu","aria-label":"GridMenu",id:r,children:s.map((a,l)=>u.jsx(Cm,{commandHandler:e,menuDefinition:n,...a,className:t},l))})}const Si=k.createContext({});process.env.NODE_ENV!=="production"&&(Si.displayName="ListContext");const Om=Si;function Pm(e){return Ze("MuiList",e)}mt("MuiList",["root","padding","dense","subheader"]);const Rm=["children","className","component","dense","disablePadding","subheader"],jm=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return it({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},Pm,t)},$m=Oe("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>C({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Ci=k.forwardRef(function(t,n){const r=lt({props:t,name:"MuiList"}),{children:o,className:s,component:a="ul",dense:l=!1,disablePadding:c=!1,subheader:d}=r,m=fe(r,Rm),v=k.useMemo(()=>({dense:l}),[l]),g=C({},r,{component:a,dense:l,disablePadding:c}),p=jm(g);return u.jsx(Om.Provider,{value:v,children:u.jsxs($m,C({as:a,className:Se(p.root,s),ref:n,ownerState:g},m,{children:[d,o]}))})});process.env.NODE_ENV!=="production"&&(Ci.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,dense:i.bool,disablePadding:i.bool,subheader:i.node,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const Mm=Ci,_m=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function zr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function Js(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function Oi(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function cn(e,t,n,r,o,s){let a=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(a)return!1;a=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!Oi(l,s)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const Pi=k.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:s=!1,children:a,className:l,disabledItemsFocusable:c=!1,disableListWrap:d=!1,onKeyDown:m,variant:v="selectedMenu"}=t,g=fe(t,_m),p=k.useRef(null),h=k.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Pt(()=>{o&&p.current.focus()},[o]),k.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(x,E)=>{const y=!p.current.style.width;if(x.clientHeight<p.current.clientHeight&&y){const S=`${Va(Ce(x))}px`;p.current.style[E.direction==="rtl"?"paddingLeft":"paddingRight"]=S,p.current.style.width=`calc(100% + ${S})`}return p.current}}),[]);const f=x=>{const E=p.current,y=x.key,S=Ce(E).activeElement;if(y==="ArrowDown")x.preventDefault(),cn(E,S,d,c,zr);else if(y==="ArrowUp")x.preventDefault(),cn(E,S,d,c,Js);else if(y==="Home")x.preventDefault(),cn(E,null,d,c,zr);else if(y==="End")x.preventDefault(),cn(E,null,d,c,Js);else if(y.length===1){const N=h.current,j=y.toLowerCase(),I=performance.now();N.keys.length>0&&(I-N.lastTime>500?(N.keys=[],N.repeating=!0,N.previousKeyMatched=!0):N.repeating&&j!==N.keys[0]&&(N.repeating=!1)),N.lastTime=I,N.keys.push(j);const F=S&&!N.repeating&&Oi(S,N);N.previousKeyMatched&&(F||cn(E,S,!1,c,zr,N))?x.preventDefault():N.previousKeyMatched=!1}m&&m(x)},b=Ue(p,n);let w=-1;k.Children.forEach(a,(x,E)=>{if(!k.isValidElement(x)){w===E&&(w+=1,w>=a.length&&(w=-1));return}process.env.NODE_ENV!=="production"&&er.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(v==="selectedMenu"&&x.props.selected||w===-1)&&(w=E),w===E&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(w+=1,w>=a.length&&(w=-1))});const R=k.Children.map(a,(x,E)=>{if(E===w){const y={};return s&&(y.autoFocus=!0),x.props.tabIndex===void 0&&v==="selectedMenu"&&(y.tabIndex=0),k.cloneElement(x,y)}return x});return u.jsx(Mm,C({role:"menu",ref:b,className:l,onKeyDown:f,tabIndex:o?0:-1},g,{children:R}))});process.env.NODE_ENV!=="production"&&(Pi.propTypes={autoFocus:i.bool,autoFocusItem:i.bool,children:i.node,className:i.string,disabledItemsFocusable:i.bool,disableListWrap:i.bool,onKeyDown:i.func,variant:i.oneOf(["menu","selectedMenu"])});const Im=Pi,Am=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Dm={entering:{opacity:1},entered:{opacity:1}},Ri=k.forwardRef(function(t,n){const r=Dn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:s,appear:a=!0,children:l,easing:c,in:d,onEnter:m,onEntered:v,onEntering:g,onExit:p,onExited:h,onExiting:f,style:b,timeout:w=o,TransitionComponent:R=gi}=t,x=fe(t,Am),E=k.useRef(null),y=Ue(E,l.ref,n),S=z=>U=>{if(z){const A=E.current;U===void 0?z(A):z(A,U)}},N=S(g),j=S((z,U)=>{bi(z);const A=ir({style:b,timeout:w,easing:c},{mode:"enter"});z.style.webkitTransition=r.transitions.create("opacity",A),z.style.transition=r.transitions.create("opacity",A),m&&m(z,U)}),I=S(v),F=S(f),P=S(z=>{const U=ir({style:b,timeout:w,easing:c},{mode:"exit"});z.style.webkitTransition=r.transitions.create("opacity",U),z.style.transition=r.transitions.create("opacity",U),p&&p(z)}),_=S(h),M=z=>{s&&s(E.current,z)};return u.jsx(R,C({appear:a,in:d,nodeRef:E,onEnter:j,onEntered:I,onEntering:N,onExit:P,onExited:_,onExiting:F,addEndListener:M,timeout:w},x,{children:(z,U)=>k.cloneElement(l,C({style:C({opacity:0,visibility:z==="exited"&&!d?"hidden":void 0},Dm[z],b,l.props.style),ref:y},U))}))});process.env.NODE_ENV!=="production"&&(Ri.propTypes={addEndListener:i.func,appear:i.bool,children:jn.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Bm=Ri;function Lm(e){return Ze("MuiBackdrop",e)}mt("MuiBackdrop",["root","invisible"]);const Fm=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Vm=e=>{const{classes:t,invisible:n}=e;return it({root:["root",n&&"invisible"]},Lm,t)},zm=Oe("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>C({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),ji=k.forwardRef(function(t,n){var r,o,s;const a=lt({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:d="div",components:m={},componentsProps:v={},invisible:g=!1,open:p,slotProps:h={},slots:f={},TransitionComponent:b=Bm,transitionDuration:w}=a,R=fe(a,Fm),x=C({},a,{component:d,invisible:g}),E=Vm(x),y=(r=h.root)!=null?r:v.root;return u.jsx(b,C({in:p,timeout:w},R,{children:u.jsx(zm,C({"aria-hidden":!0},y,{as:(o=(s=f.root)!=null?s:m.Root)!=null?o:d,className:Se(E.root,c,y==null?void 0:y.className),ownerState:C({},x,y==null?void 0:y.ownerState),classes:E,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(ji.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.object}),invisible:i.bool,open:i.bool.isRequired,slotProps:i.shape({root:i.object}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Um=ji;function Hm(e){return Ze("MuiModal",e)}mt("MuiModal",["root","hidden","backdrop"]);const qm=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Wm=e=>{const{open:t,exited:n,classes:r}=e;return it({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},Hm,r)},Xm=Oe("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>C({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Gm=Oe(Um,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),$i=k.forwardRef(function(t,n){var r,o,s,a,l,c;const d=lt({name:"MuiModal",props:t}),{BackdropComponent:m=Gm,BackdropProps:v,className:g,closeAfterTransition:p=!1,children:h,container:f,component:b,components:w={},componentsProps:R={},disableAutoFocus:x=!1,disableEnforceFocus:E=!1,disableEscapeKeyDown:y=!1,disablePortal:S=!1,disableRestoreFocus:N=!1,disableScrollLock:j=!1,hideBackdrop:I=!1,keepMounted:F=!1,onBackdropClick:P,open:_,slotProps:M,slots:z}=d,U=fe(d,qm),A=C({},d,{closeAfterTransition:p,disableAutoFocus:x,disableEnforceFocus:E,disableEscapeKeyDown:y,disablePortal:S,disableRestoreFocus:N,disableScrollLock:j,hideBackdrop:I,keepMounted:F}),{getRootProps:H,getBackdropProps:Q,getTransitionProps:Z,portalRef:O,isTopModal:D,exited:L,hasTransition:X}=Ap(C({},A,{rootRef:n})),W=C({},A,{exited:L}),Y=Wm(W),G={};if(h.props.tabIndex===void 0&&(G.tabIndex="-1"),X){const{onEnter:te,onExited:$}=Z();G.onEnter=te,G.onExited=$}const V=(r=(o=z==null?void 0:z.root)!=null?o:w.Root)!=null?r:Xm,q=(s=(a=z==null?void 0:z.backdrop)!=null?a:w.Backdrop)!=null?s:m,J=(l=M==null?void 0:M.root)!=null?l:R.root,ee=(c=M==null?void 0:M.backdrop)!=null?c:R.backdrop,se=Rt({elementType:V,externalSlotProps:J,externalForwardedProps:U,getSlotProps:H,additionalProps:{ref:n,as:b},ownerState:W,className:Se(g,J==null?void 0:J.className,Y==null?void 0:Y.root,!W.open&&W.exited&&(Y==null?void 0:Y.hidden))}),B=Rt({elementType:q,externalSlotProps:ee,additionalProps:v,getSlotProps:te=>Q(C({},te,{onClick:$=>{P&&P($),te!=null&&te.onClick&&te.onClick($)}})),className:Se(ee==null?void 0:ee.className,v==null?void 0:v.className,Y==null?void 0:Y.backdrop),ownerState:W});return!F&&!_&&(!X||L)?null:u.jsx(Nn,{ref:O,container:f,disablePortal:S,children:u.jsxs(V,C({},se,{children:[!I&&m?u.jsx(q,C({},B)):null,u.jsx(nr,{disableEnforceFocus:E,disableAutoFocus:x,disableRestoreFocus:N,isEnabled:D,open:_,children:k.cloneElement(h,G)})]}))})});process.env.NODE_ENV!=="production"&&($i.propTypes={BackdropComponent:i.elementType,BackdropProps:i.object,children:jn.isRequired,classes:i.object,className:i.string,closeAfterTransition:i.bool,component:i.elementType,components:i.shape({Backdrop:i.elementType,Root:i.elementType}),componentsProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([ot,i.func]),disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableEscapeKeyDown:i.bool,disablePortal:i.bool,disableRestoreFocus:i.bool,disableScrollLock:i.bool,hideBackdrop:i.bool,keepMounted:i.bool,onBackdropClick:i.func,onClose:i.func,onTransitionEnter:i.func,onTransitionExited:i.func,open:i.bool.isRequired,slotProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({backdrop:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const Ym=$i;function Km(e){return Ze("MuiPaper",e)}mt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Jm=["className","component","elevation","square","variant"],Zm=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,s={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return it(s,Km,o)},Qm=Oe("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return C({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&C({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${ar("#fff",Ws(t.elevation))}, ${ar("#fff",Ws(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Mi=k.forwardRef(function(t,n){const r=lt({props:t,name:"MuiPaper"}),{className:o,component:s="div",elevation:a=1,square:l=!1,variant:c="elevation"}=r,d=fe(r,Jm),m=C({},r,{component:s,elevation:a,square:l,variant:c}),v=Zm(m);return process.env.NODE_ENV!=="production"&&Dn().shadows[a]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)),u.jsx(Qm,C({as:s,ownerState:m,className:Se(v.root,o),ref:n},d))});process.env.NODE_ENV!=="production"&&(Mi.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,elevation:Jt(Ha,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:i.bool,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),variant:i.oneOfType([i.oneOf(["elevation","outlined"]),i.string])});const eh=Mi;function th(e){return Ze("MuiPopover",e)}mt("MuiPopover",["root","paper"]);const nh=["onEntering"],rh=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],oh=["slotProps"];function Zs(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function Qs(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function ea(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function Kn(e){return typeof e=="function"?e():e}const sh=e=>{const{classes:t}=e;return it({root:["root"],paper:["paper"]},th,t)},ah=Oe(Ym,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),_i=Oe(eh,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Ii=k.forwardRef(function(t,n){var r,o,s;const a=lt({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:d={vertical:"top",horizontal:"left"},anchorPosition:m,anchorReference:v="anchorEl",children:g,className:p,container:h,elevation:f=8,marginThreshold:b=16,open:w,PaperProps:R={},slots:x,slotProps:E,transformOrigin:y={vertical:"top",horizontal:"left"},TransitionComponent:S=io,transitionDuration:N="auto",TransitionProps:{onEntering:j}={},disableScrollLock:I=!1}=a,F=fe(a.TransitionProps,nh),P=fe(a,rh),_=(r=E==null?void 0:E.paper)!=null?r:R,M=k.useRef(),z=Ue(M,_.ref),U=C({},a,{anchorOrigin:d,anchorReference:v,elevation:f,marginThreshold:b,externalPaperSlotProps:_,transformOrigin:y,TransitionComponent:S,transitionDuration:N,TransitionProps:F}),A=sh(U),H=k.useCallback(()=>{if(v==="anchorPosition")return process.env.NODE_ENV!=="production"&&(m||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),m;const te=Kn(c),$=te&&te.nodeType===1?te:Ce(M.current).body,ae=$.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const ke=$.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ke.top===0&&ke.left===0&&ke.right===0&&ke.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:ae.top+Zs(ae,d.vertical),left:ae.left+Qs(ae,d.horizontal)}},[c,d.horizontal,d.vertical,m,v]),Q=k.useCallback(te=>({vertical:Zs(te,y.vertical),horizontal:Qs(te,y.horizontal)}),[y.horizontal,y.vertical]),Z=k.useCallback(te=>{const $={width:te.offsetWidth,height:te.offsetHeight},ae=Q($);if(v==="none")return{top:null,left:null,transformOrigin:ea(ae)};const ke=H();let Pe=ke.top-ae.vertical,xe=ke.left-ae.horizontal;const bt=Pe+$.height,Re=xe+$.width,Qe=qt(Kn(c)),Ie=Qe.innerHeight-b,et=Qe.innerWidth-b;if(b!==null&&Pe<b){const Ne=Pe-b;Pe-=Ne,ae.vertical+=Ne}else if(b!==null&&bt>Ie){const Ne=bt-Ie;Pe-=Ne,ae.vertical+=Ne}if(process.env.NODE_ENV!=="production"&&$.height>Ie&&$.height&&Ie&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${$.height-Ie}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),b!==null&&xe<b){const Ne=xe-b;xe-=Ne,ae.horizontal+=Ne}else if(Re>et){const Ne=Re-et;xe-=Ne,ae.horizontal+=Ne}return{top:`${Math.round(Pe)}px`,left:`${Math.round(xe)}px`,transformOrigin:ea(ae)}},[c,v,H,Q,b]),[O,D]=k.useState(w),L=k.useCallback(()=>{const te=M.current;if(!te)return;const $=Z(te);$.top!==null&&(te.style.top=$.top),$.left!==null&&(te.style.left=$.left),te.style.transformOrigin=$.transformOrigin,D(!0)},[Z]);k.useEffect(()=>(I&&window.addEventListener("scroll",L),()=>window.removeEventListener("scroll",L)),[c,I,L]);const X=(te,$)=>{j&&j(te,$),L()},W=()=>{D(!1)};k.useEffect(()=>{w&&L()}),k.useImperativeHandle(l,()=>w?{updatePosition:()=>{L()}}:null,[w,L]),k.useEffect(()=>{if(!w)return;const te=Da(()=>{L()}),$=qt(c);return $.addEventListener("resize",te),()=>{te.clear(),$.removeEventListener("resize",te)}},[c,w,L]);let Y=N;N==="auto"&&!S.muiSupportAuto&&(Y=void 0);const G=h||(c?Ce(Kn(c)).body:void 0),V=(o=x==null?void 0:x.root)!=null?o:ah,q=(s=x==null?void 0:x.paper)!=null?s:_i,J=Rt({elementType:q,externalSlotProps:C({},_,{style:O?_.style:C({},_.style,{opacity:0})}),additionalProps:{elevation:f,ref:z},ownerState:U,className:Se(A.paper,_==null?void 0:_.className)}),ee=Rt({elementType:V,externalSlotProps:(E==null?void 0:E.root)||{},externalForwardedProps:P,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:G,open:w},ownerState:U,className:Se(A.root,p)}),{slotProps:se}=ee,B=fe(ee,oh);return u.jsx(V,C({},B,!Ga(V)&&{slotProps:se,disableScrollLock:I},{children:u.jsx(S,C({appear:!0,in:w,onEntering:X,onExited:W,timeout:Y},F,{children:u.jsx(q,C({},J,{children:g}))}))}))});process.env.NODE_ENV!=="production"&&(Ii.propTypes={action:xo,anchorEl:Jt(i.oneOfType([ot,i.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=Kn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),anchorPosition:i.shape({left:i.number.isRequired,top:i.number.isRequired}),anchorReference:i.oneOf(["anchorEl","anchorPosition","none"]),children:i.node,classes:i.object,className:i.string,container:i.oneOfType([ot,i.func]),disableScrollLock:i.bool,elevation:Ha,marginThreshold:i.number,onClose:i.func,open:i.bool.isRequired,PaperProps:i.shape({component:Ac}),slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transformOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object});const ih=Ii;function lh(e){return Ze("MuiMenu",e)}mt("MuiMenu",["root","paper","list"]);const ch=["onEntering"],ph=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],uh={vertical:"top",horizontal:"right"},dh={vertical:"top",horizontal:"left"},fh=e=>{const{classes:t}=e;return it({root:["root"],paper:["paper"],list:["list"]},lh,t)},mh=Oe(ih,{shouldForwardProp:e=>mi(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),hh=Oe(_i,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),gh=Oe(Im,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Ai=k.forwardRef(function(t,n){var r,o;const s=lt({props:t,name:"MuiMenu"}),{autoFocus:a=!0,children:l,className:c,disableAutoFocusItem:d=!1,MenuListProps:m={},onClose:v,open:g,PaperProps:p={},PopoverClasses:h,transitionDuration:f="auto",TransitionProps:{onEntering:b}={},variant:w="selectedMenu",slots:R={},slotProps:x={}}=s,E=fe(s.TransitionProps,ch),y=fe(s,ph),S=Dn(),N=S.direction==="rtl",j=C({},s,{autoFocus:a,disableAutoFocusItem:d,MenuListProps:m,onEntering:b,PaperProps:p,transitionDuration:f,TransitionProps:E,variant:w}),I=fh(j),F=a&&!d&&g,P=k.useRef(null),_=(Z,O)=>{P.current&&P.current.adjustStyleForScrollbar(Z,S),b&&b(Z,O)},M=Z=>{Z.key==="Tab"&&(Z.preventDefault(),v&&v(Z,"tabKeyDown"))};let z=-1;k.Children.map(l,(Z,O)=>{k.isValidElement(Z)&&(process.env.NODE_ENV!=="production"&&er.isFragment(Z)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Z.props.disabled||(w==="selectedMenu"&&Z.props.selected||z===-1)&&(z=O))});const U=(r=R.paper)!=null?r:hh,A=(o=x.paper)!=null?o:p,H=Rt({elementType:R.root,externalSlotProps:x.root,ownerState:j,className:[I.root,c]}),Q=Rt({elementType:U,externalSlotProps:A,ownerState:j,className:I.paper});return u.jsx(mh,C({onClose:v,anchorOrigin:{vertical:"bottom",horizontal:N?"right":"left"},transformOrigin:N?uh:dh,slots:{paper:U,root:R.root},slotProps:{root:H,paper:Q},open:g,ref:n,transitionDuration:f,TransitionProps:C({onEntering:_},E),ownerState:j},y,{classes:h,children:u.jsx(gh,C({onKeyDown:M,actions:P,autoFocus:a&&(z===-1||d),autoFocusItem:F,variant:w},m,{className:Se(I.list,m.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(Ai.propTypes={anchorEl:i.oneOfType([ot,i.func]),autoFocus:i.bool,children:i.node,classes:i.object,className:i.string,disableAutoFocusItem:i.bool,MenuListProps:i.object,onClose:i.func,open:i.bool.isRequired,PaperProps:i.object,PopoverClasses:i.object,slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object,variant:i.oneOf(["menu","selectedMenu"])});const bh=Ai;function vh({className:e,commandHandler:t,menuDefinition:n,children:r}){var d;const[o,s]=T.useState(void 0),a=T.useCallback(m=>{m.preventDefault(),s(o===void 0?{mouseX:m.clientX+2,mouseY:m.clientY-6}:void 0)},[o]),l=T.useCallback(()=>{s(void 0)},[]),c=T.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((d=n==null?void 0:n.items)==null?void 0:d.length)??0)===0||!r?r:u.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:a,children:[r,u.jsx(bh,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:u.jsx(Vo,{menuDefinition:n,commandHandler:t,onClick:l})})]})}const yh=Ei(u.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function wh(e){return{preserveValue:!0,...e}}const lr=(e,t,n={})=>{const r=T.useRef(t);r.current=t;const o=T.useRef(n);o.current=wh(o.current);const[s,a]=T.useState(()=>r.current),[l,c]=T.useState(!0);return T.useEffect(()=>{let d=!0;return c(!!e),(async()=>{if(e){const m=await e();d&&(a(()=>m),c(!1))}})(),()=>{d=!1,o.current.preserveValue||a(()=>r.current)}},[e]),[s,l]};function Di({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:s,ariaLabelPrefix:a,children:l}){const[c,d]=T.useState(!1),[m,v]=T.useState(!1),g=T.useCallback(()=>{c&&d(!1),v(!1)},[c]),p=T.useCallback(E=>{E.stopPropagation(),d(y=>{const S=!y;return S&&E.shiftKey?v(!0):S||v(!1),S})},[]),h=T.useCallback(E=>(g(),r(E)),[r,g]),[f,b]=T.useState({top:1,left:1});T.useEffect(()=>{if(c){const E=o==null?void 0:o.current;if(E){const y=E.getBoundingClientRect(),S=window.scrollY,N=window.scrollX,j=y.top+S+E.clientHeight,I=y.left+N;b({top:j,left:I})}}},[c,o]);const[w]=lr(T.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[R]=lr(T.useCallback(async()=>(e==null?void 0:e(!0))??n??w,[e,n,w,c]),n??w),x=m&&R?R:w;return u.jsxs(u.Fragment,{children:[u.jsx(ye.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${s??""}`,color:"inherit","aria-label":`${a??""} menu button`,onClick:p,children:l??u.jsx(yh,{})}),u.jsx(ye.Drawer,{className:`papi-menu-drawer ${s??""}`,anchor:"left",variant:"temporary",open:c,onClose:g,PaperProps:{className:"papi-menu-drawer-paper",style:{top:f.top,left:f.left}},children:x?u.jsx(Ni,{className:s,id:`${a??""} main menu`,commandHandler:h,multiColumnMenu:x}):void 0})]})}function xh({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:s=!1,size:a="medium",className:l,onClick:c,children:d}){return u.jsx(ye.IconButton,{id:e,disabled:n,edge:s,size:a,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:d})}const Eh=po.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),Bi=T.forwardRef(({className:e,...t},n)=>u.jsx(ua.Root,{ref:n,className:K(Eh(),e),...t}));Bi.displayName=ua.Root.displayName;function Li({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:s,placeholder:a,isRequired:l=!1,className:c,defaultValue:d,value:m,onChange:v,onFocus:g,onBlur:p}){return u.jsxs("div",{className:K("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":r}),children:[u.jsx(Bi,{htmlFor:e,className:K({"pr-text-red-600":n,"pr-hidden":!s}),children:`${s}${l?"*":""}`}),u.jsx(Rn,{id:e,disabled:t,placeholder:a,required:l,className:K(c,{"pr-border-red-600":n}),defaultValue:d,value:m,onChange:v,onFocus:g,onBlur:p}),u.jsx("p",{className:K({"pr-hidden":!o}),children:o})]})}function kh({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=T.useState(""),s=a=>{o(a),e(a)};return u.jsx(Li,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:a=>s(a.target.value)})}function Th({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:s=1,showMarks:a=!1,defaultValue:l,value:c,valueLabelDisplay:d="off",className:m,onChange:v,onChangeCommitted:g}){return u.jsx(ye.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:s,marks:a,defaultValue:l,value:c,valueLabelDisplay:d,className:`papi-slider ${n} ${m??""}`,onChange:v,onChangeCommitted:g})}function Nh({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:s={vertical:"bottom",horizontal:"left"},ContentProps:a,children:l}){const c={action:(a==null?void 0:a.action)||l,message:a==null?void 0:a.message,className:r};return u.jsx(ye.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:s,id:t,ContentProps:c})}function Sh({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:s}){return u.jsx(ye.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:s})}function Ch({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const s=T.useRef(void 0);return u.jsx("div",{ref:s,style:{position:"relative"},children:u.jsx(ye.AppBar,{position:"static",id:r,children:u.jsxs(ye.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?u.jsx(Di,{commandHandler:t,containerRef:s,menuProvider:e}):void 0,o?u.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Oh=_e.Root,Fi=T.forwardRef(({className:e,...t},n)=>u.jsx(_e.List,{ref:n,className:K("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Fi.displayName=_e.List.displayName;const Vi=T.forwardRef(({className:e,...t},n)=>u.jsx(_e.Trigger,{ref:n,className:K("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));Vi.displayName=_e.Trigger.displayName;const zi=T.forwardRef(({className:e,...t},n)=>u.jsx(_e.Content,{ref:n,className:K("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));zi.displayName=_e.Content.displayName;const Ui=T.forwardRef(({className:e,...t},n)=>u.jsx(_e.Root,{orientation:"vertical",ref:n,className:K("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));Ui.displayName=_e.List.displayName;const Hi=T.forwardRef(({className:e,...t},n)=>u.jsx(_e.List,{ref:n,className:K("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Hi.displayName=_e.List.displayName;const Ph=T.forwardRef(({className:e,...t},n)=>u.jsx(_e.Trigger,{ref:n,...t,className:K("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),qi=T.forwardRef(({className:e,...t},n)=>u.jsx(_e.Content,{ref:n,className:K("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));qi.displayName=_e.Content.displayName;function Rh({columns:e,tableData:t,onSelectItem:n}){const r=(o,s)=>{s.toggleAllRowsSelected(!1),o.toggleSelected(void 0),n(o.getValue("item"))};return u.jsx("div",{className:"pr-overflow-y-auto",children:u.jsx(Oa,{columns:e,data:t,onRowClickHandler:r})})}const ta=(e,t,n)=>{if(!e||e===""||t==="")return[];const r=[],o=e.split(`
`);let s="0",a="0",l=0;return o.forEach(c=>{const d=c.split(/\s+/);c.startsWith("\\c")&&([,s]=d,a="0"),c.startsWith("\\v")&&([,a]=d,s==="0"&&(s=n.chapterNum.toString()));for(let m=0;m<d.length;m++)if(d[m].includes(t)){const v=Math.max(0,m-2),g=Math.min(d.length,m+3),p=d.slice(v,g).join(" "),h={reference:{...n,chapterNum:+s,verseNum:+a},snippet:p,key:l};l+=1,r.push(h)}}),r};function jh({selectedItem:e,text:t,scriptureReference:n,setScriptureReference:r,localizedStrings:o}){const s=o["%webView_inventory_occurrences_table_header_reference%"],a=o["%webView_inventory_occurrences_table_header_occurrence%"],[l,c]=T.useState(ta(t,e,n));return T.useEffect(()=>c(ta(t,e,n)),[t,e,n]),u.jsxs(ur,{children:[u.jsx(dr,{children:u.jsxs(St,{children:[u.jsx(xn,{children:s}),u.jsx(xn,{children:a})]})}),u.jsx(fr,{children:l.map(d=>u.jsxs(St,{onClick:()=>{r(d.reference)},children:[u.jsx(Ut,{children:`${me.bookNumberToEnglishName(d.reference.bookNum)} ${d.reference.chapterNum}:${d.reference.verseNum}`}),u.jsx(Ut,{children:d.snippet})]},d.key))})]})}const $h=(e,t,n,r,o)=>{const s=[];return e.forEach(a=>{if(n!==""&&!a.includes(n))return;const l=s.find(c=>c.item===a);if(l)l.count+=1;else{let c;if(r.includes(a)&&(c=!0),o.includes(a)&&(c=!1),t==="all"||t==="approved"&&c===!0||t==="unapproved"&&c===!1||t==="unknown"&&c===void 0){const d={item:a,count:1,status:c};s.push(d)}}}),s};function Mh({scriptureReference:e,setScriptureReference:t,localizedStrings:n,projectId:r,getSetting:o,setSetting:s,getText:a,approvedItemsKey:l,unapprovedItemsKey:c,convertTextToItems:d,columns:m}){const v=n["%webView_inventory_all%"],g=n["%webView_inventory_approved%"],p=n["%webView_inventory_unapproved%"],h=n["%webView_inventory_unknown%"],f=n["%webView_inventory_scope_book%"],b=n["%webView_inventory_scope_chapter%"],w=n["%webView_inventory_scope_verse%"],R=n["%webView_inventory_filter_text%"],[x,E]=T.useState([]),[y,S]=T.useState([]),[N,j]=T.useState(""),[I,F]=T.useState([]),[P,_]=T.useState("book"),[M,z]=T.useState("all"),[U,A]=T.useState(""),[H,Q]=T.useState([]),[Z,O]=T.useState(""),D=(L,X)=>{Q(W=>{let Y=[];return L.forEach(G=>{Y=W.map(V=>V.item===G&&V.status!==X?{...V,status:X}:V)}),E(G=>{let V=[...G];return L.forEach(q=>{X===!0?V.includes(q)||V.push(q):V=V.filter(J=>J!==q)}),s(l,r,V),V}),S(G=>{let V=[...G];return L.forEach(q=>{X===!1?V.includes(q)||V.push(q):V=V.filter(J=>J!==q)}),s(c,r,V),V}),Y})};return T.useEffect(()=>{(async()=>{try{E(await o(l,r)),S(await o(c,r))}catch{throw new Error("Failed to fetch (un)approved items from project settings")}})()},[r,o,l,c]),T.useEffect(()=>{(async()=>{try{const X=await a(r,e,P);j(X||"")}catch{throw new Error("Failed getting scripture text")}})()},[r,e,P,a]),T.useEffect(()=>{F(d(N))},[d,N]),T.useEffect(()=>{if(I.length===0){Q([]);return}(()=>{try{Q($h(I,M,U,x,y))}catch{throw new Error("Failed building table data")}})()},[x,y,I,M,U]),u.jsxs("div",{className:"pr-twp pr-font-sans",children:[u.jsxs("div",{className:"pr-flex",children:[u.jsxs(Zn,{onValueChange:L=>z(L),defaultValue:M,children:[u.jsx(En,{children:u.jsx(Qn,{placeholder:"Select filter"})}),u.jsxs(kn,{className:"pr-font-sans",children:[u.jsx(Xe,{value:"all",children:v}),u.jsx(Xe,{value:"approved",children:g}),u.jsx(Xe,{value:"unapproved",children:p}),u.jsx(Xe,{value:"unknown",children:h})]})]}),u.jsxs(Zn,{onValueChange:L=>_(L),defaultValue:P,children:[u.jsx(En,{children:u.jsx(Qn,{placeholder:"Select scope"})}),u.jsxs(kn,{className:"pr-font-sans",children:[u.jsx(Xe,{value:"book",children:f}),u.jsx(Xe,{value:"chapter",children:b}),u.jsx(Xe,{value:"verse",children:w})]})]}),u.jsx(Rn,{className:"pr-rounded-md pr-border",placeholder:R,value:U,onChange:L=>{A(L.target.value)}})]}),u.jsx("div",{className:`pr-overflow-y-auto pr-rounded-md pr-border ${Z!==""&&"pr-max-h-96"}`,children:u.jsx(Rh,{columns:m(D),tableData:H,onSelectItem:L=>{O(L)}})}),Z!==""&&u.jsx("div",{className:"pr-mt-4 pr-rounded-md pr-border",children:u.jsx(jh,{selectedItem:Z,text:N,scriptureReference:e,setScriptureReference:L=>t(L),localizedStrings:n})})]})}const Wn=e=>e==="asc"?u.jsx(de.ArrowUpIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):e==="desc"?u.jsx(de.ArrowDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):u.jsx(de.ArrowUpDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}),_h="validCharacters",Ih="invalidCharacters",Ah=(e,t,n,r,o)=>[{accessorKey:"item",header:({column:s})=>u.jsxs(Te,{onClick:()=>s.toggleSorting(void 0),children:[e,Wn(s.getIsSorted())]})},{accessorKey:"unicodeValue",header:({column:s})=>u.jsxs(Te,{onClick:()=>s.toggleSorting(void 0),children:[t,Wn(s.getIsSorted())]}),cell:({row:s})=>s.getValue("item").charCodeAt(0).toString(16).toUpperCase().padStart(4,"0")},{accessorKey:"count",header:({column:s})=>u.jsxs(Te,{onClick:()=>s.toggleSorting(void 0),children:[n,Wn(s.getIsSorted())]})},{accessorKey:"status",header:({column:s,table:a})=>{const l=a.getSelectedRowModel().rows,c=[];return l.forEach(d=>{c.push(d.getValue("item"))}),u.jsxs("div",{children:[u.jsx("div",{className:"pr-flex pr-justify-center",children:u.jsxs(Te,{onClick:()=>s.toggleSorting(void 0),children:[r,Wn(s.getIsSorted())]})}),u.jsxs("div",{className:"pr-flex pr-justify-center",children:[u.jsx(Te,{children:u.jsx(de.CircleCheckIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,!0)}})}),u.jsx(Te,{children:u.jsx(de.CircleXIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,!1)}})}),u.jsx(Te,{children:u.jsx(de.CircleHelpIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,void 0)}})})]})]})},cell:({row:s})=>{const a=s.getValue("status");return a===!0?u.jsx(de.CircleCheckIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):a===!1?u.jsx(de.CircleXIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):u.jsx(de.CircleHelpIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"})}}],Dh=e=>ca.split(e,"");function Bh({scriptureReference:e,setScriptureReference:t,localizedStrings:n,projectId:r,getSetting:o,setSetting:s,getText:a}){const l=n["%webView_inventory_table_header_character%"],c=n["%webView_inventory_table_header_unicode_value%"],d=n["%webView_inventory_table_header_count%"],m=n["%webView_inventory_table_header_status%"],v=g=>Ah(l,c,d,m,g);return u.jsx("div",{className:"pr-twp",children:u.jsx(Mh,{projectId:r,localizedStrings:n,scriptureReference:e,setScriptureReference:t,approvedItemsKey:_h,unapprovedItemsKey:Ih,convertTextToItems:Dh,getSetting:o,setSetting:s,getText:a,columns:v})})}function Lh({isDownloading:e,handleClick:t,buttonText:n}){return u.jsx(Te,{className:K("pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out",{"pr-cursor-not-allowed pr-bg-blue-700":e,"pr-bg-blue-600":!e,"pr-bg-white pr-text-blue-600":!n,"pr-w-20":n}),onClick:t,children:e?u.jsx(de.LoaderCircle,{size:15,className:"pr-animate-spin"}):u.jsxs(u.Fragment,{children:[u.jsx(de.Download,{size:25,className:"pr-h-4 pr-w-4"}),n]})})}function Fh({isRemoving:e,handleClick:t}){return u.jsx(Te,{className:K("pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-gray-400":e}),onClick:t,children:e?u.jsxs(u.Fragment,{children:[u.jsx(de.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-black"}),"Removing..."]}):"Remove"})}function Vh({isUpdating:e,handleClick:t}){return u.jsx(Te,{className:K("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e}),onClick:t,children:e?u.jsxs(u.Fragment,{children:[u.jsx(de.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-white"}),"Updating..."]}):"Update"})}function Nt(){return Nt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Nt.apply(this,arguments)}const zh=["children","options"],na=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,t)=>(e[t.toLowerCase()]=t,e),{for:"htmlFor"}),ra={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},Uh=["style","script"],Hh=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,qh=/mailto:/i,Wh=/\n{2,}$/,Wi=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,Xh=/^ *> ?/gm,Gh=/^ {2,}\n/,Yh=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,Xi=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,Gi=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,Kh=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,Jh=/^(?:\n *)*\n/,Zh=/\r\n?/g,Qh=/^\[\^([^\]]+)](:.*)\n/,eg=/^\[\^([^\]]+)]/,tg=/\f/g,ng=/^\s*?\[(x|\s)\]/,Yi=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,Ki=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,Ji=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,lo=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,rg=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,Zi=/^<!--[\s\S]*?(?:-->)/,og=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,co=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,sg=/^\{.*\}$/,ag=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,ig=/^<([^ >]+@[^ >]+)>/,lg=/^<([^ >]+:\/[^ >]+)>/,cg=/-([a-z])?/gi,Qi=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,pg=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,ug=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,dg=/^\[([^\]]*)\] ?\[([^\]]*)\]/,fg=/(\[|\])/g,mg=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,hg=/\t/g,gg=/^ *\| */,bg=/(^ *\||\| *$)/g,vg=/ *$/,yg=/^ *:-+: *$/,wg=/^ *:-+ *$/,xg=/^ *-+: *$/,Eg=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,kg=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,Tg=/^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,Ng=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,Sg=/^\\([^0-9A-Za-z\s])/,Cg=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,Og=/^\n+/,Pg=/^([ \t]*)/,Rg=/\\([^\\])/g,oa=/ *\n+$/,jg=/(?:^|\n)( *)$/,zo="(?:\\d+\\.)",Uo="(?:[*+-])";function el(e){return"( *)("+(e===1?zo:Uo)+") +"}const tl=el(1),nl=el(2);function rl(e){return new RegExp("^"+(e===1?tl:nl))}const $g=rl(1),Mg=rl(2);function ol(e){return new RegExp("^"+(e===1?tl:nl)+"[^\\n]*(?:\\n(?!\\1"+(e===1?zo:Uo)+" )[^\\n]*)*(\\n|$)","gm")}const sl=ol(1),al=ol(2);function il(e){const t=e===1?zo:Uo;return new RegExp("^( *)("+t+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+t+" (?!"+t+" ))\\n*|\\s*\\n*$)")}const ll=il(1),cl=il(2);function sa(e,t){const n=t===1,r=n?ll:cl,o=n?sl:al,s=n?$g:Mg;return{t(a,l,c){const d=jg.exec(c);return d&&(l.o||!l._&&!l.u)?r.exec(a=d[1]+a):null},i:oe.HIGH,l(a,l,c){const d=n?+a[2]:void 0,m=a[0].replace(Wh,`
`).match(o);let v=!1;return{p:m.map(function(g,p){const h=s.exec(g)[0].length,f=new RegExp("^ {1,"+h+"}","gm"),b=g.replace(f,"").replace(s,""),w=p===m.length-1,R=b.indexOf(`

`)!==-1||w&&v;v=R;const x=c._,E=c.o;let y;c.o=!0,R?(c._=!1,y=b.replace(oa,`

`)):(c._=!0,y=b.replace(oa,""));const S=l(y,c);return c._=x,c.o=E,S}),m:n,g:d}},h:(a,l,c)=>e(a.m?"ol":"ul",{key:c.k,start:a.g},a.p.map(function(d,m){return e("li",{key:m},l(d,c))}))}}const _g=/^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Ig=/^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,pl=[Wi,Xi,Gi,Yi,Ji,Ki,Zi,Qi,sl,ll,al,cl],Ag=[...pl,/^[^\n]+(?:  \n|\n{2,})/,lo,co];function Dg(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function Bg(e){return xg.test(e)?"right":yg.test(e)?"center":wg.test(e)?"left":null}function aa(e,t,n){const r=n.$;n.$=!0;const o=t(e.trim(),n);n.$=r;let s=[[]];return o.forEach(function(a,l){a.type==="tableSeparator"?l!==0&&l!==o.length-1&&s.push([]):(a.type!=="text"||o[l+1]!=null&&o[l+1].type!=="tableSeparator"||(a.v=a.v.replace(vg,"")),s[s.length-1].push(a))}),s}function Lg(e,t,n){n._=!0;const r=aa(e[1],t,n),o=e[2].replace(bg,"").split("|").map(Bg),s=function(a,l,c){return a.trim().split(`
`).map(function(d){return aa(d,l,c)})}(e[3],t,n);return n._=!1,{S:o,A:s,L:r,type:"table"}}function ia(e,t){return e.S[t]==null?{}:{textAlign:e.S[t]}}function pt(e){return function(t,n){return n._?e.exec(t):null}}function ut(e){return function(t,n){return n._||n.u?e.exec(t):null}}function nt(e){return function(t,n){return n._||n.u?null:e.exec(t)}}function pn(e){return function(t){return e.exec(t)}}function Fg(e,t,n){if(t._||t.u||n&&!n.endsWith(`
`))return null;let r="";e.split(`
`).every(s=>!pl.some(a=>a.test(s))&&(r+=s+`
`,s.trim()));const o=r.trimEnd();return o==""?null:[r,o]}function Ft(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch{return null}return e}function la(e){return e.replace(Rg,"$1")}function Jn(e,t,n){const r=n._||!1,o=n.u||!1;n._=!0,n.u=!0;const s=e(t,n);return n._=r,n.u=o,s}function Vg(e,t,n){const r=n._||!1,o=n.u||!1;n._=!1,n.u=!0;const s=e(t,n);return n._=r,n.u=o,s}function zg(e,t,n){return n._=!1,e(t,n)}const Ur=(e,t,n)=>({v:Jn(t,e[1],n)});function Hr(){return{}}function qr(){return null}function Ug(...e){return e.filter(Boolean).join(" ")}function Wr(e,t,n){let r=e;const o=t.split(".");for(;o.length&&(r=r[o[0]],r!==void 0);)o.shift();return r||n}var oe;function Hg(e,t={}){t.overrides=t.overrides||{},t.slugify=t.slugify||Dg,t.namedCodesToUnicode=t.namedCodesToUnicode?Nt({},ra,t.namedCodesToUnicode):ra;const n=t.createElement||k.createElement;function r(p,h,...f){const b=Wr(t.overrides,`${p}.props`,{});return n(function(w,R){const x=Wr(R,w);return x?typeof x=="function"||typeof x=="object"&&"render"in x?x:Wr(R,`${w}.component`,w):w}(p,t.overrides),Nt({},h,b,{className:Ug(h==null?void 0:h.className,b.className)||void 0}),...f)}function o(p){let h=!1;t.forceInline?h=!0:t.forceBlock||(h=mg.test(p)===!1);const f=m(d(h?p:`${p.trimEnd().replace(Og,"")}

`,{_:h}));for(;typeof f[f.length-1]=="string"&&!f[f.length-1].trim();)f.pop();if(t.wrapper===null)return f;const b=t.wrapper||(h?"span":"div");let w;if(f.length>1||t.forceWrapper)w=f;else{if(f.length===1)return w=f[0],typeof w=="string"?r("span",{key:"outer"},w):w;w=null}return k.createElement(b,{key:"outer"},w)}function s(p){const h=p.match(Hh);return h?h.reduce(function(f,b,w){const R=b.indexOf("=");if(R!==-1){const x=function(N){return N.indexOf("-")!==-1&&N.match(og)===null&&(N=N.replace(cg,function(j,I){return I.toUpperCase()})),N}(b.slice(0,R)).trim(),E=function(N){const j=N[0];return(j==='"'||j==="'")&&N.length>=2&&N[N.length-1]===j?N.slice(1,-1):N}(b.slice(R+1).trim()),y=na[x]||x,S=f[y]=function(N,j){return N==="style"?j.split(/;\s?/).reduce(function(I,F){const P=F.slice(0,F.indexOf(":"));return I[P.replace(/(-[a-z])/g,_=>_[1].toUpperCase())]=F.slice(P.length+1).trim(),I},{}):N==="href"?Ft(j):(j.match(sg)&&(j=j.slice(1,j.length-1)),j==="true"||j!=="false"&&j)}(x,E);typeof S=="string"&&(lo.test(S)||co.test(S))&&(f[y]=k.cloneElement(o(S.trim()),{key:w}))}else b!=="style"&&(f[na[b]||b]=!0);return f},{}):null}const a=[],l={},c={blockQuote:{t:nt(Wi),i:oe.HIGH,l:(p,h,f)=>({v:h(p[0].replace(Xh,""),f)}),h:(p,h,f)=>r("blockquote",{key:f.k},h(p.v,f))},breakLine:{t:pn(Gh),i:oe.HIGH,l:Hr,h:(p,h,f)=>r("br",{key:f.k})},breakThematic:{t:nt(Yh),i:oe.HIGH,l:Hr,h:(p,h,f)=>r("hr",{key:f.k})},codeBlock:{t:nt(Gi),i:oe.MAX,l:p=>({v:p[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),M:void 0}),h:(p,h,f)=>r("pre",{key:f.k},r("code",Nt({},p.O,{className:p.M?`lang-${p.M}`:""}),p.v))},codeFenced:{t:nt(Xi),i:oe.MAX,l:p=>({O:s(p[3]||""),v:p[4],M:p[2]||void 0,type:"codeBlock"})},codeInline:{t:ut(Kh),i:oe.LOW,l:p=>({v:p[2]}),h:(p,h,f)=>r("code",{key:f.k},p.v)},footnote:{t:nt(Qh),i:oe.MAX,l:p=>(a.push({I:p[2],j:p[1]}),{}),h:qr},footnoteReference:{t:pt(eg),i:oe.HIGH,l:p=>({v:p[1],B:`#${t.slugify(p[1])}`}),h:(p,h,f)=>r("a",{key:f.k,href:Ft(p.B)},r("sup",{key:f.k},p.v))},gfmTask:{t:pt(ng),i:oe.HIGH,l:p=>({R:p[1].toLowerCase()==="x"}),h:(p,h,f)=>r("input",{checked:p.R,key:f.k,readOnly:!0,type:"checkbox"})},heading:{t:nt(t.enforceAtxHeadings?Ki:Yi),i:oe.HIGH,l:(p,h,f)=>({v:Jn(h,p[2],f),T:t.slugify(p[2]),C:p[1].length}),h:(p,h,f)=>r(`h${p.C}`,{id:p.T,key:f.k},h(p.v,f))},headingSetext:{t:nt(Ji),i:oe.MAX,l:(p,h,f)=>({v:Jn(h,p[1],f),C:p[2]==="="?1:2,type:"heading"})},htmlComment:{t:pn(Zi),i:oe.HIGH,l:()=>({}),h:qr},image:{t:ut(Ig),i:oe.HIGH,l:p=>({D:p[1],B:la(p[2]),F:p[3]}),h:(p,h,f)=>r("img",{key:f.k,alt:p.D||void 0,title:p.F||void 0,src:Ft(p.B)})},link:{t:pt(_g),i:oe.LOW,l:(p,h,f)=>({v:Vg(h,p[1],f),B:la(p[2]),F:p[3]}),h:(p,h,f)=>r("a",{key:f.k,href:Ft(p.B),title:p.F},h(p.v,f))},linkAngleBraceStyleDetector:{t:pt(lg),i:oe.MAX,l:p=>({v:[{v:p[1],type:"text"}],B:p[1],type:"link"})},linkBareUrlDetector:{t:(p,h)=>h.N?null:pt(ag)(p,h),i:oe.MAX,l:p=>({v:[{v:p[1],type:"text"}],B:p[1],F:void 0,type:"link"})},linkMailtoDetector:{t:pt(ig),i:oe.MAX,l(p){let h=p[1],f=p[1];return qh.test(f)||(f="mailto:"+f),{v:[{v:h.replace("mailto:",""),type:"text"}],B:f,type:"link"}}},orderedList:sa(r,1),unorderedList:sa(r,2),newlineCoalescer:{t:nt(Jh),i:oe.LOW,l:Hr,h:()=>`
`},paragraph:{t:Fg,i:oe.LOW,l:Ur,h:(p,h,f)=>r("p",{key:f.k},h(p.v,f))},ref:{t:pt(pg),i:oe.MAX,l:p=>(l[p[1]]={B:p[2],F:p[4]},{}),h:qr},refImage:{t:ut(ug),i:oe.MAX,l:p=>({D:p[1]||void 0,P:p[2]}),h:(p,h,f)=>r("img",{key:f.k,alt:p.D,src:Ft(l[p.P].B),title:l[p.P].F})},refLink:{t:pt(dg),i:oe.MAX,l:(p,h,f)=>({v:h(p[1],f),Z:h(p[0].replace(fg,"\\$1"),f),P:p[2]}),h:(p,h,f)=>l[p.P]?r("a",{key:f.k,href:Ft(l[p.P].B),title:l[p.P].F},h(p.v,f)):r("span",{key:f.k},h(p.Z,f))},table:{t:nt(Qi),i:oe.HIGH,l:Lg,h:(p,h,f)=>r("table",{key:f.k},r("thead",null,r("tr",null,p.L.map(function(b,w){return r("th",{key:w,style:ia(p,w)},h(b,f))}))),r("tbody",null,p.A.map(function(b,w){return r("tr",{key:w},b.map(function(R,x){return r("td",{key:x,style:ia(p,x)},h(R,f))}))})))},tableSeparator:{t:function(p,h){return h.$?(h._=!0,gg.exec(p)):null},i:oe.HIGH,l:function(){return{type:"tableSeparator"}},h:()=>" | "},text:{t:pn(Cg),i:oe.MIN,l:p=>({v:p[0].replace(rg,(h,f)=>t.namedCodesToUnicode[f]?t.namedCodesToUnicode[f]:h)}),h:p=>p.v},textBolded:{t:ut(Eg),i:oe.MED,l:(p,h,f)=>({v:h(p[2],f)}),h:(p,h,f)=>r("strong",{key:f.k},h(p.v,f))},textEmphasized:{t:ut(kg),i:oe.LOW,l:(p,h,f)=>({v:h(p[2],f)}),h:(p,h,f)=>r("em",{key:f.k},h(p.v,f))},textEscaped:{t:ut(Sg),i:oe.HIGH,l:p=>({v:p[1],type:"text"})},textMarked:{t:ut(Tg),i:oe.LOW,l:Ur,h:(p,h,f)=>r("mark",{key:f.k},h(p.v,f))},textStrikethroughed:{t:ut(Ng),i:oe.LOW,l:Ur,h:(p,h,f)=>r("del",{key:f.k},h(p.v,f))}};t.disableParsingRawHTML!==!0&&(c.htmlBlock={t:pn(lo),i:oe.HIGH,l(p,h,f){const[,b]=p[3].match(Pg),w=new RegExp(`^${b}`,"gm"),R=p[3].replace(w,""),x=(E=R,Ag.some(j=>j.test(E))?zg:Jn);var E;const y=p[1].toLowerCase(),S=Uh.indexOf(y)!==-1;f.N=f.N||y==="a";const N=S?p[3]:x(h,R,f);return f.N=!1,{O:s(p[2]),v:N,G:S,H:S?y:p[1]}},h:(p,h,f)=>r(p.H,Nt({key:f.k},p.O),p.G?p.v:h(p.v,f))},c.htmlSelfClosing={t:pn(co),i:oe.HIGH,l:p=>({O:s(p[2]||""),H:p[1]}),h:(p,h,f)=>r(p.H,Nt({},p.O,{key:f.k}))});const d=function(p){let h=Object.keys(p);function f(b,w){let R=[],x="";for(;b;){let E=0;for(;E<h.length;){const y=h[E],S=p[y],N=S.t(b,w,x);if(N){const j=N[0];b=b.substring(j.length);const I=S.l(N,f,w);I.type==null&&(I.type=y),R.push(I),x=j;break}E++}}return R}return h.sort(function(b,w){let R=p[b].i,x=p[w].i;return R!==x?R-x:b<w?-1:1}),function(b,w){return f(function(R){return R.replace(Zh,`
`).replace(tg,"").replace(hg,"    ")}(b),w)}}(c),m=(v=function(p){return function(h,f,b){return p[h.type].h(h,f,b)}}(c),function p(h,f={}){if(Array.isArray(h)){const b=f.k,w=[];let R=!1;for(let x=0;x<h.length;x++){f.k=x;const E=p(h[x],f),y=typeof E=="string";y&&R?w[w.length-1]+=E:E!==null&&w.push(E),R=y}return f.k=b,w}return v(h,p,f)});var v;const g=o(e);return a.length?r("div",null,g,r("footer",{key:"footer"},a.map(function(p){return r("div",{id:t.slugify(p.j),key:p.j},p.j,m(d(p.I,{_:!0})))}))):g}(function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"})(oe||(oe={}));const qg=e=>{let{children:t,options:n}=e,r=function(o,s){if(o==null)return{};var a,l,c={},d=Object.keys(o);for(l=0;l<d.length;l++)s.indexOf(a=d[l])>=0||(c[a]=o[a]);return c}(e,zh);return k.cloneElement(Hg(t,n),r)};function Wg({markdown:e}){return u.jsx("div",{className:"pr-prose",children:u.jsx(qg,{children:e})})}const Xg=(e,t)=>{T.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Xr=()=>!1,Gg=(e,t)=>{const[n]=lr(T.useCallback(async()=>{if(!e)return Xr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Xr,{preserveValue:!1});T.useEffect(()=>()=>{n!==Xr&&n()},[n])},ul=T.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:K("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));ul.displayName="Card";const dl=T.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:K("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));dl.displayName="CardHeader";const fl=T.forwardRef(({className:e,...t},n)=>u.jsx("h3",{ref:n,className:K("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));fl.displayName="CardTitle";const ml=T.forwardRef(({className:e,...t},n)=>u.jsx("p",{ref:n,className:K("pr-text-sm pr-text-muted-foreground",e),...t}));ml.displayName="CardDescription";const hl=T.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:K("pr-p-6 pr-pt-0",e),...t}));hl.displayName="CardContent";const gl=T.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:K("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));gl.displayName="CardFooter";const Yg=po.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),bl=T.forwardRef(({className:e,variant:t,...n},r)=>u.jsx("div",{ref:r,role:"alert",className:K(Yg({variant:t}),e),...n}));bl.displayName="Alert";const vl=T.forwardRef(({className:e,...t},n)=>u.jsxs("h5",{ref:n,className:K("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));vl.displayName="AlertTitle";const yl=T.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:K("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));yl.displayName="AlertDescription";const wl=T.forwardRef(({className:e,...t},n)=>u.jsxs(dn.Root,{ref:n,className:K("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[u.jsx(dn.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:u.jsx(dn.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),u.jsx(dn.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));wl.displayName=dn.Root.displayName;const xl=T.forwardRef(({className:e,...t},n)=>u.jsx(Yr.Root,{className:K("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:n,children:u.jsx(Yr.Thumb,{className:K("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));xl.displayName=Yr.Root.displayName;exports.Alert=bl;exports.AlertDescription=yl;exports.AlertTitle=vl;exports.BookChapterControl=gc;exports.Button=Te;exports.Card=ul;exports.CardContent=hl;exports.CardDescription=ml;exports.CardFooter=gl;exports.CardHeader=dl;exports.CardTitle=fl;exports.ChapterRangeSelector=wc;exports.CharacterInventory=Bh;exports.Checkbox=Pa;exports.Checklist=xc;exports.ComboBox=Kr;exports.ContextMenu=vh;exports.DataTable=Oa;exports.DownloadButton=Lh;exports.DropdownMenu=ho;exports.DropdownMenuCheckboxItem=bo;exports.DropdownMenuContent=cr;exports.DropdownMenuGroup=tc;exports.DropdownMenuItem=go;exports.DropdownMenuLabel=Pn;exports.DropdownMenuPortal=nc;exports.DropdownMenuRadioGroup=oc;exports.DropdownMenuRadioItem=xa;exports.DropdownMenuSeparator=pr;exports.DropdownMenuShortcut=Ea;exports.DropdownMenuSub=rc;exports.DropdownMenuSubContent=wa;exports.DropdownMenuSubTrigger=ya;exports.DropdownMenuTrigger=va;exports.GridMenu=Ni;exports.HamburgerMenuButton=Di;exports.IconButton=xh;exports.Input=Rn;exports.LabelPosition=kt;exports.MarkdownRenderer=Wg;exports.MenuItem=Fo;exports.RemoveButton=Fh;exports.SearchBar=kh;exports.Select=Zn;exports.SelectContent=kn;exports.SelectGroup=bc;exports.SelectItem=Xe;exports.SelectLabel=Sa;exports.SelectScrollDownButton=yo;exports.SelectScrollUpButton=vo;exports.SelectSeparator=Ca;exports.SelectTrigger=En;exports.SelectValue=Qn;exports.ShadCnSlider=wl;exports.ShadCnSwitch=xl;exports.Slider=Th;exports.Snackbar=Nh;exports.Switch=Sh;exports.Table=ur;exports.TableBody=fr;exports.TableCaption=Ta;exports.TableCell=Ut;exports.TableFooter=ka;exports.TableHead=xn;exports.TableHeader=dr;exports.TableRow=St;exports.Tabs=Oh;exports.TabsContent=zi;exports.TabsList=Fi;exports.TabsTrigger=Vi;exports.TextField=Li;exports.Toolbar=Ch;exports.UpdateButton=Vh;exports.VerticalTabs=Ui;exports.VerticalTabsContent=qi;exports.VerticalTabsList=Hi;exports.VerticalTabsTrigger=Ph;exports.buttonVariants=Na;exports.useEvent=Xg;exports.useEventAsync=Gg;exports.usePromise=lr;function Kg(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Kg(`/*
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
`,"top");
//# sourceMappingURL=index.cjs.map
