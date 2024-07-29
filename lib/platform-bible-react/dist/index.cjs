"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const p=require("react/jsx-runtime"),T=require("react"),oe=require("lucide-react"),Ce=require("clsx"),Jl=require("tailwind-merge"),vs=require("@radix-ui/react-dropdown-menu"),Ke=require("platform-bible-utils"),Se=require("@tanstack/react-table"),Zl=require("@radix-ui/react-slot"),yo=require("class-variance-authority"),Ql=require("@radix-ui/react-select"),Ee=require("@mui/material"),ec=require("@radix-ui/react-popover"),Ie=require("cmdk"),tc=require("@radix-ui/react-dialog"),no=require("@mui/styled-engine"),wn=require("react-dom"),nc=require("@radix-ui/react-label"),rc=require("@radix-ui/react-tabs"),oc=require("@radix-ui/react-slider"),ac=require("@radix-ui/react-switch");function nt(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const N=nt(T),he=nt(vs),we=nt(Ql),Pn=nt(ec),Qe=nt(tc),sc=nt(wn),ys=nt(nc),Ae=nt(rc),xn=nt(oc),ro=nt(ac);const ic=Jl.extendTailwindMerge({prefix:"pr-"});function V(...e){return ic(Ce.clsx(e))}const Bn=T.forwardRef(({className:e,type:t,...n},r)=>p.jsx("input",{type:t,className:V("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));Bn.displayName="Input";const lc=T.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},a)=>p.jsxs("div",{className:"pr-relative",children:[p.jsx(Bn,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r(),t(s)},onClick:n,ref:a}),p.jsx(oe.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));var cc=Object.defineProperty,pc=(e,t,n)=>t in e?cc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t,n)=>pc(e,typeof t!="symbol"?t+"":t,n);const _t=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],wo=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ws=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],fa=wc();function on(e,t=!0){return t&&(e=e.toUpperCase()),e in fa?fa[e]:0}function xo(e){return on(e)>0}function uc(e){const t=typeof e=="string"?on(e):e;return t>=40&&t<=66}function dc(e){return(typeof e=="string"?on(e):e)<=39}function xs(e){return e<=66}function fc(e){const t=typeof e=="string"?on(e):e;return Ts(t)&&!xs(t)}function*mc(){for(let e=1;e<=_t.length;e++)yield e}const hc=1,ks=_t.length;function gc(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function ko(e,t="***"){const n=e-1;return n<0||n>=_t.length?t:_t[n]}function Es(e){return e<=0||e>ks?"******":ws[e-1]}function bc(e){return Es(on(e))}function Ts(e){const t=typeof e=="number"?ko(e):e;return xo(t)&&!wo.includes(t)}function vc(e){const t=typeof e=="number"?ko(e):e;return xo(t)&&wo.includes(t)}function yc(e){return ws[e-1].includes("*obsolete*")}function wc(){const e={};for(let t=0;t<_t.length;t++)e[_t[t]]=t+1;return e}const fe={allBookIds:_t,nonCanonicalIds:wo,bookIdToNumber:on,isBookIdValid:xo,isBookNT:uc,isBookOT:dc,isBookOTNT:xs,isBookDC:fc,allBookNumbers:mc,firstBook:hc,lastBook:ks,extraBooks:gc,bookNumberToId:ko,bookNumberToEnglishName:Es,bookIdToEnglishName:bc,isCanonical:Ts,isExtraMaterial:vc,isObsolete:yc};var Je=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Je||{});const Le=class{constructor(t){if(re(this,"name"),re(this,"fullPath"),re(this,"isPresent"),re(this,"hasVerseSegments"),re(this,"isCustomized"),re(this,"baseVersification"),re(this,"scriptureBooks"),re(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Je[t]):(this._type=t,this.name=Je[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};re(Le,"Original",new Le(Je.Original)),re(Le,"Septuagint",new Le(Je.Septuagint)),re(Le,"Vulgate",new Le(Je.Vulgate)),re(Le,"English",new Le(Je.English)),re(Le,"RussianProtestant",new Le(Je.RussianProtestant)),re(Le,"RussianOrthodox",new Le(Je.RussianOrthodox));let Nt=Le;function ma(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var Ns=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Ns||{});const $e=class le{constructor(t,n,r,o){if(re(this,"firstChapter"),re(this,"lastChapter"),re(this,"lastVerse"),re(this,"hasSegmentsDefined"),re(this,"text"),re(this,"BBBCCCVVVS"),re(this,"longHashCode"),re(this,"versification"),re(this,"rtlMark","‏"),re(this,"_bookNum",0),re(this,"_chapterNum",0),re(this,"_verseNum",0),re(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const a=t,s=n!=null&&n instanceof Nt?n:void 0;this.setEmpty(s),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=n!=null&&n instanceof Nt?n:void 0;this.setEmpty(a),this._verseNum=t%le.chapterDigitShifter,this._chapterNum=Math.floor(t%le.bookDigitShifter/le.chapterDigitShifter),this._bookNum=Math.floor(t/le.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof le){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof Nt?t:le.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??le.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new le(t),{success:!0,verseRef:n}}catch(r){if(r instanceof fn)return n=new le,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%le.bcvMaxValue*le.bookDigitShifter+(n>=0?n%le.bcvMaxValue*le.chapterDigitShifter:0)+(r>=0?r%le.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:a,versificationStr:s}=t,l=a||o.toString();let c;return s&&(c=new Nt(s)),n?new le(n,r.toString(),l,c):new le}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>le.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(le.verseRangeSeparator)||this._verse.includes(le.verseSequenceIndicator))}get book(){return fe.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=fe.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=le.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=le.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>fe.lastBook)throw new fn("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Nt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(le.verseRangeSeparators,le.verseSequenceIndicators)}get BBBCCC(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const s=+a[1].trim();this.versification=new Nt(Je[s])}catch{throw new fn("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new fn("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||fe.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!le.isVerseParseable(r[1]))throw new fn("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new le(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete n.verse,n}equals(t){return t instanceof le?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=le.verseRangeSeparators,r=le.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=ma(this._verse,r);for(const s of a.map(l=>ma(l,n))){const l=this.clone();l.verse=s[0];const c=l.verseNum;if(o.push(l),s.length>1){const d=this.clone();if(d.verse=s[1],!t)for(let m=c+1;m<d.verseNum;m++){const v=new le(this._bookNum,this._chapterNum,m,this.versification);this.isExcluded||o.push(v)}o.push(d)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const a=o.internalValid;if(a!==0)return a;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>fe.lastBook?2:(fe.isCanonical(this._bookNum),0)}setEmpty(t=le.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=fe.bookIdToNumber(t),this.chapter=n,this.verse=r}};re($e,"defaultVersification",Nt.English),re($e,"verseRangeSeparator","-"),re($e,"verseSequenceIndicator",","),re($e,"verseRangeSeparators",[$e.verseRangeSeparator]),re($e,"verseSequenceIndicators",[$e.verseSequenceIndicator]),re($e,"chapterDigitShifter",1e3),re($e,"bookDigitShifter",$e.chapterDigitShifter*$e.chapterDigitShifter),re($e,"bcvMaxValue",$e.chapterDigitShifter-1),re($e,"ValidStatusType",Ns);let fn=class extends Error{};const wr=he.Root,Eo=he.Trigger,Cs=he.Group,xc=he.Portal,kc=he.Sub,Ec=he.RadioGroup,Ss=T.forwardRef(({className:e,inset:t,children:n,...r},o)=>p.jsxs(he.SubTrigger,{ref:o,className:V("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,p.jsx(oe.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Ss.displayName=he.SubTrigger.displayName;const Os=T.forwardRef(({className:e,...t},n)=>p.jsx(he.SubContent,{ref:n,className:V("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));Os.displayName=he.SubContent.displayName;const Ln=T.forwardRef(({className:e,sideOffset:t=4,...n},r)=>p.jsx(he.Portal,{children:p.jsx(he.Content,{ref:r,sideOffset:t,className:V("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));Ln.displayName=he.Content.displayName;const To=T.forwardRef(({className:e,inset:t,...n},r)=>p.jsx(he.Item,{ref:r,className:V("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));To.displayName=he.Item.displayName;const xr=T.forwardRef(({className:e,children:t,checked:n,...r},o)=>p.jsxs(he.CheckboxItem,{ref:o,className:V("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[p.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:p.jsx(he.ItemIndicator,{children:p.jsx(oe.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));xr.displayName=he.CheckboxItem.displayName;const No=T.forwardRef(({className:e,children:t,...n},r)=>p.jsxs(he.RadioItem,{ref:r,className:V("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[p.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:p.jsx(he.ItemIndicator,{children:p.jsx(oe.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));No.displayName=he.RadioItem.displayName;const an=T.forwardRef(({className:e,inset:t,...n},r)=>p.jsx(he.Label,{ref:r,className:V("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));an.displayName=he.Label.displayName;const Vn=T.forwardRef(({className:e,...t},n)=>p.jsx(he.Separator,{ref:n,className:V("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Vn.displayName=he.Separator.displayName;function Rs({className:e,...t}){return p.jsx("span",{className:V("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Rs.displayName="DropdownMenuShortcut";const Tc=T.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:a,children:s},l)=>p.jsxs(To,{ref:l,textValue:e,className:V("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[p.jsx("span",{className:V("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":a.toLowerCase()==="ot","pr-border-l-purple-200":a.toLowerCase()==="nt","pr-border-l-indigo-200":a.toLowerCase()==="dc"}),children:fe.bookIdToEnglishName(e)}),n&&p.jsx("div",{children:s})]},e));function Nc({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const a=Array.from({length:t},(l,c)=>c+1),s=T.useCallback(l=>{o(l)},[o]);return p.jsx("div",{className:V("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:a.map(l=>p.jsx("div",{className:V("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===n,"pr-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>s(l),children:l},l))})}function Cc({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return p.jsxs(an,{className:"pr-flex pr-justify-between",children:[p.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),p.jsxs("div",{className:"pr-flex pr-items-center",children:[p.jsx(oe.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),p.jsx(oe.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),p.jsx(oe.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const Nn=fe.allBookIds,Sc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ha=["OT","NT","DC"],Oc=32+32+32,Rc=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Pc=e=>({OT:Nn.filter(n=>fe.isBookOT(n)),NT:Nn.filter(n=>fe.isBookNT(n)),DC:Nn.filter(n=>fe.isBookDC(n))})[e],mn=e=>Ke.getChaptersForBook(fe.bookIdToNumber(e));function jc(){return Nn.map(t=>fe.bookIdToEnglishName(t))}function $c(e){return jc().includes(e)}function _c(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if($c(t))return Nn.find(r=>fe.bookIdToEnglishName(r)===t)}function Mc({scrRef:e,handleSubmit:t}){const[n,r]=T.useState(""),[o,a]=T.useState(fe.bookNumberToId(e.bookNum)),[s,l]=T.useState(e.chapterNum??0),[c,d]=T.useState(fe.bookNumberToId(e.bookNum)),[m,v]=T.useState(!1),[g,u]=T.useState(m),h=T.useRef(void 0),f=T.useRef(void 0),b=T.useRef(void 0),x=T.useCallback(E=>Pc(E).filter(O=>{const $=fe.bookIdToEnglishName(O).toLowerCase(),F=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return $.includes(F)||O.toLowerCase().includes(F)}),[n]),j=E=>{r(E)},w=T.useRef(!1),k=T.useCallback(E=>{if(w.current){w.current=!1;return}v(E)},[]),y=T.useCallback((E,O,$,F)=>{if(l(fe.bookNumberToId(e.bookNum)!==E?1:e.chapterNum),O||mn(E)===-1){t({bookNum:fe.bookIdToNumber(E),chapterNum:$||1,verseNum:F||1}),v(!1),r("");return}a(o!==E?E:""),v(!O)},[t,e.bookNum,e.chapterNum,o]),S=E=>{E<=0||E>mn(o)||y(o,!0,E)},C=T.useCallback(()=>{Rc.forEach(E=>{const O=n.match(E);if(O){const[$,F=void 0,H=void 0]=O.slice(1),_=_c($);(fe.isBookIdValid($)||_)&&y(_??$,!0,F?parseInt(F,10):1,H?parseInt(H,10):1)}})},[y,n]),I=T.useCallback(E=>{m?(E.key==="ArrowDown"||E.key==="ArrowUp")&&(typeof b<"u"&&b.current!==null?b.current.focus():typeof f<"u"&&f.current!==null&&f.current.focus(),E.preventDefault()):v(!0)},[m]),D=E=>{const{key:O}=E;O==="ArrowRight"||O==="ArrowLeft"||O==="ArrowDown"||O==="ArrowUp"||O==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:O})),h.current.focus())},L=E=>{const{key:O}=E;if(c===o){if(O==="Enter"){E.preventDefault(),y(o,!0,s);return}let $=0;if(O==="ArrowRight")if(s<mn(c))$=1;else{E.preventDefault();return}else if(O==="ArrowLeft")if(s>1)$=-1;else{E.preventDefault();return}else O==="ArrowDown"?$=6:O==="ArrowUp"&&($=-6);s+$<=0||s+$>mn(c)?l(0):$!==0&&(l(s+$),E.preventDefault())}};return T.useEffect(()=>{o===c?o===fe.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),T.useLayoutEffect(()=>{u(m)},[m]),T.useLayoutEffect(()=>{const E=setTimeout(()=>{if(g&&f.current&&b.current){const $=b.current.offsetTop-Oc;f.current.scrollTo({top:$,behavior:"instant"})}},10);return()=>{clearTimeout(E)}},[g]),p.jsx("div",{className:"pr-flex",children:p.jsxs(wr,{modal:!1,open:m,onOpenChange:k,children:[p.jsx(Eo,{asChild:!0,children:p.jsx(lc,{ref:h,value:n,handleSearch:j,handleKeyDown:I,handleOnClick:()=>{a(fe.bookNumberToId(e.bookNum)),d(fe.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),v(!0),h.current.focus()},onFocus:()=>{w.current=!0},handleSubmit:C,placeholder:`${fe.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),p.jsxs(Ln,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:D,align:"start",ref:f,children:[p.jsx(Cc,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),ha.map((E,O)=>x(E).length>0&&p.jsxs("div",{children:[p.jsx(an,{className:"pr-font-semibold pr-text-slate-700",children:Sc[E]}),x(E).map($=>p.jsx("div",{children:p.jsx(Tc,{bookId:$,handleSelectBook:()=>y($,!1),isSelected:o===$,handleHighlightBook:()=>d($),handleKeyDown:L,bookType:E,ref:F=>{o===$&&(b.current=F)},children:p.jsx(Nc,{handleSelectChapter:S,endChapter:mn($),activeChapter:e.bookNum===fe.bookIdToNumber($)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:F=>{l(F)}})})},$)),ha.length-1!==O?p.jsx(Vn,{}):void 0]},E))]})]})})}const Ps=yo.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),be=T.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},a)=>{const s=r?Zl.Slot:"button";return p.jsx(s,{className:V(Ps({variant:t,size:n,className:e})),ref:a,...o})});be.displayName="Button";function Ic({table:e}){return p.jsxs(wr,{children:[p.jsx(vs.DropdownMenuTrigger,{asChild:!0,children:p.jsxs(be,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[p.jsx(oe.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),p.jsxs(Ln,{align:"end",className:"pr-w-[150px]",children:[p.jsx(an,{children:"Toggle columns"}),p.jsx(Vn,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>p.jsx(xr,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}const jn=we.Root,js=we.Group,$n=we.Value,Yt=T.forwardRef(({className:e,children:t,...n},r)=>p.jsxs(we.Trigger,{ref:r,className:V("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...n,children:[t,p.jsx(we.Icon,{asChild:!0,children:p.jsx(oe.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));Yt.displayName=we.Trigger.displayName;const Co=T.forwardRef(({className:e,...t},n)=>p.jsx(we.ScrollUpButton,{ref:n,className:V("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:p.jsx(oe.ChevronUp,{className:"pr-h-4 pr-w-4"})}));Co.displayName=we.ScrollUpButton.displayName;const So=T.forwardRef(({className:e,...t},n)=>p.jsx(we.ScrollDownButton,{ref:n,className:V("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:p.jsx(oe.ChevronDown,{className:"pr-h-4 pr-w-4"})}));So.displayName=we.ScrollDownButton.displayName;const Kt=T.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>p.jsx(we.Portal,{children:p.jsxs(we.Content,{ref:o,className:V("pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:n,...r,children:[p.jsx(Co,{}),p.jsx(we.Viewport,{className:V("pr-p-1",n==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),p.jsx(So,{})]})}));Kt.displayName=we.Content.displayName;const $s=T.forwardRef(({className:e,...t},n)=>p.jsx(we.Label,{ref:n,className:V("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));$s.displayName=we.Label.displayName;const Ye=T.forwardRef(({className:e,children:t,...n},r)=>p.jsxs(we.Item,{ref:r,className:V("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[p.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:p.jsx(we.ItemIndicator,{children:p.jsx(oe.Check,{className:"pr-h-4 pr-w-4"})})}),p.jsx(we.ItemText,{children:t})]}));Ye.displayName=we.Item.displayName;const _s=T.forwardRef(({className:e,...t},n)=>p.jsx(we.Separator,{ref:n,className:V("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));_s.displayName=we.Separator.displayName;function Ac({table:e}){return p.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:p.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[p.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),p.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[p.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),p.jsxs(jn,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[p.jsx(Yt,{className:"pr-h-8 pr-w-[70px]",children:p.jsx($n,{placeholder:e.getState().pagination.pageSize})}),p.jsx(Kt,{side:"top",children:[10,20,30,40,50].map(t=>p.jsx(Ye,{value:`${t}`,children:t},t))})]})]}),p.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),p.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[p.jsxs(be,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),p.jsx(oe.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),p.jsxs(be,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),p.jsx(oe.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),p.jsxs(be,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),p.jsx(oe.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),p.jsxs(be,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),p.jsx(oe.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}const Fn=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{className:"pr-relative pr-w-full pr-overflow-auto",children:p.jsx("table",{ref:n,className:V("pr-w-full pr-caption-bottom pr-text-sm",e),...t})}));Fn.displayName="Table";const zn=T.forwardRef(({className:e,...t},n)=>p.jsx("thead",{ref:n,className:V("[&_tr]:pr-border-b",e),...t}));zn.displayName="TableHeader";const Un=T.forwardRef(({className:e,...t},n)=>p.jsx("tbody",{ref:n,className:V("[&_tr:last-child]:pr-border-0",e),...t}));Un.displayName="TableBody";const Ms=T.forwardRef(({className:e,...t},n)=>p.jsx("tfoot",{ref:n,className:V("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));Ms.displayName="TableFooter";const lt=T.forwardRef(({className:e,...t},n)=>p.jsx("tr",{ref:n,className:V("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));lt.displayName="TableRow";const Jt=T.forwardRef(({className:e,...t},n)=>p.jsx("th",{ref:n,className:V("pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",e),...t}));Jt.displayName="TableHead";const Mt=T.forwardRef(({className:e,...t},n)=>p.jsx("td",{ref:n,className:V("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0",e),...t}));Mt.displayName="TableCell";const Is=T.forwardRef(({className:e,...t},n)=>p.jsx("caption",{ref:n,className:V("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));Is.displayName="TableCaption";function As({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,onRowClickHandler:a=()=>{}}){var f;const[s,l]=T.useState([]),[c,d]=T.useState([]),[m,v]=T.useState({}),[g,u]=T.useState({}),h=Se.useReactTable({data:t,columns:e,getCoreRowModel:Se.getCoreRowModel(),...n&&{getPaginationRowModel:Se.getPaginationRowModel()},onSortingChange:l,getSortedRowModel:Se.getSortedRowModel(),onColumnFiltersChange:d,getFilteredRowModel:Se.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:u,state:{sorting:s,columnFilters:c,columnVisibility:m,rowSelection:g}});return p.jsxs("div",{children:[o&&p.jsx(Ic,{table:h}),p.jsx("div",{className:"pr-twp pr-font-sans",children:p.jsxs(Fn,{children:[p.jsx(zn,{children:h.getHeaderGroups().map(b=>p.jsx(lt,{children:b.headers.map(x=>p.jsx(Jt,{children:x.isPlaceholder?void 0:Se.flexRender(x.column.columnDef.header,x.getContext())},x.id))},b.id))}),p.jsx(Un,{children:(f=h.getRowModel().rows)!=null&&f.length?h.getRowModel().rows.map(b=>p.jsx(lt,{onClick:()=>a(b,h),"data-state":b.getIsSelected()&&"selected",children:b.getVisibleCells().map(x=>p.jsx(Mt,{children:Se.flexRender(x.column.columnDef.cell,x.getContext())},x.id))},b.id)):p.jsx(lt,{children:p.jsx(Mt,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]})}),n&&p.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[p.jsx(be,{variant:"outline",size:"sm",onClick:()=>h.previousPage(),disabled:!h.getCanPreviousPage(),children:"Previous"}),p.jsx(be,{variant:"outline",size:"sm",onClick:()=>h.nextPage(),disabled:!h.getCanNextPage(),children:"Next"})]}),n&&r&&p.jsx(Ac,{table:h})]})}const Dc=Pn.Root,Bc=Pn.Trigger,Ds=T.forwardRef(({className:e,align:t="center",sideOffset:n=4,...r},o)=>p.jsx(Pn.Portal,{children:p.jsx(Pn.Content,{ref:o,align:t,sideOffset:n,className:V("pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r})}));Ds.displayName=Pn.Content.displayName;const Lc=Qe.Portal,Bs=T.forwardRef(({className:e,...t},n)=>p.jsx(Qe.Overlay,{ref:n,className:V("pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",e),...t}));Bs.displayName=Qe.Overlay.displayName;const Vc=T.forwardRef(({className:e,children:t,...n},r)=>p.jsxs(Lc,{children:[p.jsx(Bs,{}),p.jsxs(Qe.Content,{ref:r,className:V("pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",e),...n,children:[t,p.jsxs(Qe.Close,{className:"pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground",children:[p.jsx(oe.X,{className:"pr-h-4 pr-w-4"}),p.jsx("span",{className:"pr-sr-only",children:"Close"})]})]})]}));Vc.displayName=Qe.Content.displayName;const Fc=T.forwardRef(({className:e,...t},n)=>p.jsx(Qe.Title,{ref:n,className:V("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight",e),...t}));Fc.displayName=Qe.Title.displayName;const zc=T.forwardRef(({className:e,...t},n)=>p.jsx(Qe.Description,{ref:n,className:V("pr-text-sm pr-text-muted-foreground",e),...t}));zc.displayName=Qe.Description.displayName;const Ls=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Command,{ref:n,className:V("pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",e),...t}));Ls.displayName=Ie.Command.displayName;const Vs=T.forwardRef(({className:e,...t},n)=>p.jsxs("div",{className:"pr-flex pr-items-center pr-border-b pr-px-3",children:[p.jsx(oe.Search,{className:"pr-mr-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"}),p.jsx(Ie.Command.Input,{ref:n,className:V("pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...t})]}));Vs.displayName=Ie.Command.Input.displayName;const Fs=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Command.List,{ref:n,className:V("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden",e),...t}));Fs.displayName=Ie.Command.List.displayName;const zs=T.forwardRef((e,t)=>p.jsx(Ie.Command.Empty,{ref:t,className:"pr-py-6 pr-text-center pr-text-sm",...e}));zs.displayName=Ie.Command.Empty.displayName;const Uc=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Command.Group,{ref:n,className:V("pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",e),...t}));Uc.displayName=Ie.Command.Group.displayName;const Hc=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Command.Separator,{ref:n,className:V("pr--mx-1 pr-h-px pr-bg-border",e),...t}));Hc.displayName=Ie.Command.Separator.displayName;const Us=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Command.Item,{ref:n,className:V("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",e),...t}));Us.displayName=Ie.Command.Item.displayName;function Gc(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function oo({id:e,options:t=[],className:n,value:r,onChange:o=()=>{},getOptionLabel:a=Gc,buttonPlaceholder:s="",textPlaceholder:l="",commandEmptyMessage:c="No option found",buttonVariant:d="outline"}){const[m,v]=T.useState(!1);return p.jsxs(Dc,{open:m,onOpenChange:v,children:[p.jsx(Bc,{asChild:!0,children:p.jsxs(be,{variant:d,role:"combobox","aria-expanded":m,id:e,className:V("pr-w-[200px] pr-justify-between",n),children:[r?a(r):s,p.jsx(oe.ChevronsUpDown,{className:"pr-ml-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"})]})}),p.jsx(Ds,{className:"pr-w-[200px] pr-p-0",children:p.jsxs(Ls,{children:[p.jsx(Vs,{placeholder:l,className:"pr-text-inherit"}),p.jsx(zs,{children:c}),p.jsx(Fs,{children:t.map(g=>p.jsxs(Us,{value:a(g),onSelect:()=>{o(g),v(!1)},children:[p.jsx(oe.Check,{className:V("pr-mr-2 pr-h-4 pr-w-4",{"pr-opacity-0":!r||a(r)!==a(g)})}),a(g)]},a(g)))})]})})]})}function qc({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,a]=T.useState(1),[s,l]=T.useState(r),[c,d]=T.useState(Array.from({length:r},(g,u)=>u+1));T.useEffect(()=>{a(1),e(1),l(r),t(r),d(Array.from({length:r},(g,u)=>u+1))},[r,t,e]);const m=g=>{a(g),e(g),g>s&&(l(g),t(g))},v=g=>{l(g),t(g),g<o&&(a(g),e(g))};return p.jsxs(p.Fragment,{children:[p.jsx(Ee.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:p.jsx(oo,{onChange:m,className:"book-selection-chapter",options:c,getOptionLabel:g=>g.toString(),value:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),p.jsx(Ee.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:p.jsx(oo,{onChange:v,className:"book-selection-chapter",options:c,getOptionLabel:g=>g.toString(),value:s},"end chapter"),label:"to",labelPlacement:"start"})]})}var Rt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Rt||{});function Hs({id:e,isChecked:t,labelText:n="",labelPosition:r=Rt.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:s=!1,hasError:l=!1,className:c,onChange:d}){const m=p.jsx(Ee.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:a,disabled:s,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:d});let v;if(n){const g=r===Rt.Before||r===Rt.Above,u=p.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),h=r===Rt.Before||r===Rt.After,f=h?u:p.jsx("div",{children:u}),b=h?m:p.jsx("div",{children:m});v=p.jsxs(Ee.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:l,children:[g&&f,b,!g&&f]})}else v=m;return v}function Wc({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:a,createLabel:s}){return p.jsxs("fieldset",{id:e,className:t,children:[n&&p.jsx("legend",{children:n}),r.map(l=>p.jsx(Hs,{className:"check-item",isChecked:o.includes(l),labelText:s?s(l):l,onChange:()=>a(l)},l))]})}function Xc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Yc(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Oo={},Gs={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Gs);var Kc=Gs.exports,Lr={};function sn(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},P.apply(this,arguments)}function Pt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function qs(e){if(!Pt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=qs(e[n])}),t}function ct(e,t,n={clone:!0}){const r=n.clone?P({},e):e;return Pt(e)&&Pt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Pt(t[o])&&o in e&&Pt(e[o])?r[o]=ct(e[o],t[o],n):n.clone?r[o]=Pt(t[o])?qs(t[o]):t[o]:r[o]=t[o])}),r}var ao={exports:{}},er={exports:{}},ce={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ga;function Jc(){if(ga)return ce;ga=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,u=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,j=e?Symbol.for("react.scope"):60119;function w(y){if(typeof y=="object"&&y!==null){var S=y.$$typeof;switch(S){case t:switch(y=y.type,y){case c:case d:case r:case a:case o:case v:return y;default:switch(y=y&&y.$$typeof,y){case l:case m:case h:case u:case s:return y;default:return S}}case n:return S}}}function k(y){return w(y)===d}return ce.AsyncMode=c,ce.ConcurrentMode=d,ce.ContextConsumer=l,ce.ContextProvider=s,ce.Element=t,ce.ForwardRef=m,ce.Fragment=r,ce.Lazy=h,ce.Memo=u,ce.Portal=n,ce.Profiler=a,ce.StrictMode=o,ce.Suspense=v,ce.isAsyncMode=function(y){return k(y)||w(y)===c},ce.isConcurrentMode=k,ce.isContextConsumer=function(y){return w(y)===l},ce.isContextProvider=function(y){return w(y)===s},ce.isElement=function(y){return typeof y=="object"&&y!==null&&y.$$typeof===t},ce.isForwardRef=function(y){return w(y)===m},ce.isFragment=function(y){return w(y)===r},ce.isLazy=function(y){return w(y)===h},ce.isMemo=function(y){return w(y)===u},ce.isPortal=function(y){return w(y)===n},ce.isProfiler=function(y){return w(y)===a},ce.isStrictMode=function(y){return w(y)===o},ce.isSuspense=function(y){return w(y)===v},ce.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===r||y===d||y===a||y===o||y===v||y===g||typeof y=="object"&&y!==null&&(y.$$typeof===h||y.$$typeof===u||y.$$typeof===s||y.$$typeof===l||y.$$typeof===m||y.$$typeof===b||y.$$typeof===x||y.$$typeof===j||y.$$typeof===f)},ce.typeOf=w,ce}var pe={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ba;function Zc(){return ba||(ba=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,u=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,j=e?Symbol.for("react.scope"):60119;function w(B){return typeof B=="string"||typeof B=="function"||B===r||B===d||B===a||B===o||B===v||B===g||typeof B=="object"&&B!==null&&(B.$$typeof===h||B.$$typeof===u||B.$$typeof===s||B.$$typeof===l||B.$$typeof===m||B.$$typeof===b||B.$$typeof===x||B.$$typeof===j||B.$$typeof===f)}function k(B){if(typeof B=="object"&&B!==null){var te=B.$$typeof;switch(te){case t:var A=B.type;switch(A){case c:case d:case r:case a:case o:case v:return A;default:var ie=A&&A.$$typeof;switch(ie){case l:case m:case h:case u:case s:return ie;default:return te}}case n:return te}}}var y=c,S=d,C=l,I=s,D=t,L=m,E=r,O=h,$=u,F=n,H=a,_=o,z=v,ee=!1;function Z(B){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),R(B)||k(B)===c}function R(B){return k(B)===d}function M(B){return k(B)===l}function U(B){return k(B)===s}function X(B){return typeof B=="object"&&B!==null&&B.$$typeof===t}function G(B){return k(B)===m}function q(B){return k(B)===r}function Y(B){return k(B)===h}function K(B){return k(B)===u}function W(B){return k(B)===n}function J(B){return k(B)===a}function Q(B){return k(B)===o}function se(B){return k(B)===v}pe.AsyncMode=y,pe.ConcurrentMode=S,pe.ContextConsumer=C,pe.ContextProvider=I,pe.Element=D,pe.ForwardRef=L,pe.Fragment=E,pe.Lazy=O,pe.Memo=$,pe.Portal=F,pe.Profiler=H,pe.StrictMode=_,pe.Suspense=z,pe.isAsyncMode=Z,pe.isConcurrentMode=R,pe.isContextConsumer=M,pe.isContextProvider=U,pe.isElement=X,pe.isForwardRef=G,pe.isFragment=q,pe.isLazy=Y,pe.isMemo=K,pe.isPortal=W,pe.isProfiler=J,pe.isStrictMode=Q,pe.isSuspense=se,pe.isValidElementType=w,pe.typeOf=k}()),pe}var va;function Ws(){return va||(va=1,process.env.NODE_ENV==="production"?er.exports=Jc():er.exports=Zc()),er.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Vr,ya;function Qc(){if(ya)return Vr;ya=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var s={},l=0;l<10;l++)s["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(s).map(function(m){return s[m]});if(c.join("")!=="0123456789")return!1;var d={};return"abcdefghijklmnopqrst".split("").forEach(function(m){d[m]=m}),Object.keys(Object.assign({},d)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Vr=o()?Object.assign:function(a,s){for(var l,c=r(a),d,m=1;m<arguments.length;m++){l=Object(arguments[m]);for(var v in l)t.call(l,v)&&(c[v]=l[v]);if(e){d=e(l);for(var g=0;g<d.length;g++)n.call(l,d[g])&&(c[d[g]]=l[d[g]])}}return c},Vr}var Fr,wa;function Ro(){if(wa)return Fr;wa=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Fr=e,Fr}var zr,xa;function Xs(){return xa||(xa=1,zr=Function.call.bind(Object.prototype.hasOwnProperty)),zr}var Ur,ka;function ep(){if(ka)return Ur;ka=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Ro(),n={},r=Xs();e=function(a){var s="Warning: "+a;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(a,s,l,c,d){if(process.env.NODE_ENV!=="production"){for(var m in a)if(r(a,m)){var v;try{if(typeof a[m]!="function"){var g=Error((c||"React class")+": "+l+" type `"+m+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[m]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw g.name="Invariant Violation",g}v=a[m](s,m,c,l,null,t)}catch(h){v=h}if(v&&!(v instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+m+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof v+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),v instanceof Error&&!(v.message in n)){n[v.message]=!0;var u=d?d():"";e("Failed "+l+" type: "+v.message+(u??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Ur=o,Ur}var Hr,Ea;function tp(){if(Ea)return Hr;Ea=1;var e=Ws(),t=Qc(),n=Ro(),r=Xs(),o=ep(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function s(){return null}return Hr=function(l,c){var d=typeof Symbol=="function"&&Symbol.iterator,m="@@iterator";function v(R){var M=R&&(d&&R[d]||R[m]);if(typeof M=="function")return M}var g="<<anonymous>>",u={array:x("array"),bigint:x("bigint"),bool:x("boolean"),func:x("function"),number:x("number"),object:x("object"),string:x("string"),symbol:x("symbol"),any:j(),arrayOf:w,element:k(),elementType:y(),instanceOf:S,node:L(),objectOf:I,oneOf:C,oneOfType:D,shape:O,exact:$};function h(R,M){return R===M?R!==0||1/R===1/M:R!==R&&M!==M}function f(R,M){this.message=R,this.data=M&&typeof M=="object"?M:{},this.stack=""}f.prototype=Error.prototype;function b(R){if(process.env.NODE_ENV!=="production")var M={},U=0;function X(q,Y,K,W,J,Q,se){if(W=W||g,Q=Q||K,se!==n){if(c){var B=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw B.name="Invariant Violation",B}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var te=W+":"+K;!M[te]&&U<3&&(a("You are manually calling a React.PropTypes validation function for the `"+Q+"` prop on `"+W+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),M[te]=!0,U++)}}return Y[K]==null?q?Y[K]===null?new f("The "+J+" `"+Q+"` is marked as required "+("in `"+W+"`, but its value is `null`.")):new f("The "+J+" `"+Q+"` is marked as required in "+("`"+W+"`, but its value is `undefined`.")):null:R(Y,K,W,J,Q)}var G=X.bind(null,!1);return G.isRequired=X.bind(null,!0),G}function x(R){function M(U,X,G,q,Y,K){var W=U[X],J=_(W);if(J!==R){var Q=z(W);return new f("Invalid "+q+" `"+Y+"` of type "+("`"+Q+"` supplied to `"+G+"`, expected ")+("`"+R+"`."),{expectedType:R})}return null}return b(M)}function j(){return b(s)}function w(R){function M(U,X,G,q,Y){if(typeof R!="function")return new f("Property `"+Y+"` of component `"+G+"` has invalid PropType notation inside arrayOf.");var K=U[X];if(!Array.isArray(K)){var W=_(K);return new f("Invalid "+q+" `"+Y+"` of type "+("`"+W+"` supplied to `"+G+"`, expected an array."))}for(var J=0;J<K.length;J++){var Q=R(K,J,G,q,Y+"["+J+"]",n);if(Q instanceof Error)return Q}return null}return b(M)}function k(){function R(M,U,X,G,q){var Y=M[U];if(!l(Y)){var K=_(Y);return new f("Invalid "+G+" `"+q+"` of type "+("`"+K+"` supplied to `"+X+"`, expected a single ReactElement."))}return null}return b(R)}function y(){function R(M,U,X,G,q){var Y=M[U];if(!e.isValidElementType(Y)){var K=_(Y);return new f("Invalid "+G+" `"+q+"` of type "+("`"+K+"` supplied to `"+X+"`, expected a single ReactElement type."))}return null}return b(R)}function S(R){function M(U,X,G,q,Y){if(!(U[X]instanceof R)){var K=R.name||g,W=Z(U[X]);return new f("Invalid "+q+" `"+Y+"` of type "+("`"+W+"` supplied to `"+G+"`, expected ")+("instance of `"+K+"`."))}return null}return b(M)}function C(R){if(!Array.isArray(R))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),s;function M(U,X,G,q,Y){for(var K=U[X],W=0;W<R.length;W++)if(h(K,R[W]))return null;var J=JSON.stringify(R,function(se,B){var te=z(B);return te==="symbol"?String(B):B});return new f("Invalid "+q+" `"+Y+"` of value `"+String(K)+"` "+("supplied to `"+G+"`, expected one of "+J+"."))}return b(M)}function I(R){function M(U,X,G,q,Y){if(typeof R!="function")return new f("Property `"+Y+"` of component `"+G+"` has invalid PropType notation inside objectOf.");var K=U[X],W=_(K);if(W!=="object")return new f("Invalid "+q+" `"+Y+"` of type "+("`"+W+"` supplied to `"+G+"`, expected an object."));for(var J in K)if(r(K,J)){var Q=R(K,J,G,q,Y+"."+J,n);if(Q instanceof Error)return Q}return null}return b(M)}function D(R){if(!Array.isArray(R))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var M=0;M<R.length;M++){var U=R[M];if(typeof U!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ee(U)+" at index "+M+"."),s}function X(G,q,Y,K,W){for(var J=[],Q=0;Q<R.length;Q++){var se=R[Q],B=se(G,q,Y,K,W,n);if(B==null)return null;B.data&&r(B.data,"expectedType")&&J.push(B.data.expectedType)}var te=J.length>0?", expected one of type ["+J.join(", ")+"]":"";return new f("Invalid "+K+" `"+W+"` supplied to "+("`"+Y+"`"+te+"."))}return b(X)}function L(){function R(M,U,X,G,q){return F(M[U])?null:new f("Invalid "+G+" `"+q+"` supplied to "+("`"+X+"`, expected a ReactNode."))}return b(R)}function E(R,M,U,X,G){return new f((R||"React class")+": "+M+" type `"+U+"."+X+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+G+"`.")}function O(R){function M(U,X,G,q,Y){var K=U[X],W=_(K);if(W!=="object")return new f("Invalid "+q+" `"+Y+"` of type `"+W+"` "+("supplied to `"+G+"`, expected `object`."));for(var J in R){var Q=R[J];if(typeof Q!="function")return E(G,q,Y,J,z(Q));var se=Q(K,J,G,q,Y+"."+J,n);if(se)return se}return null}return b(M)}function $(R){function M(U,X,G,q,Y){var K=U[X],W=_(K);if(W!=="object")return new f("Invalid "+q+" `"+Y+"` of type `"+W+"` "+("supplied to `"+G+"`, expected `object`."));var J=t({},U[X],R);for(var Q in J){var se=R[Q];if(r(R,Q)&&typeof se!="function")return E(G,q,Y,Q,z(se));if(!se)return new f("Invalid "+q+" `"+Y+"` key `"+Q+"` supplied to `"+G+"`.\nBad object: "+JSON.stringify(U[X],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(R),null,"  "));var B=se(K,Q,G,q,Y+"."+Q,n);if(B)return B}return null}return b(M)}function F(R){switch(typeof R){case"number":case"string":case"undefined":return!0;case"boolean":return!R;case"object":if(Array.isArray(R))return R.every(F);if(R===null||l(R))return!0;var M=v(R);if(M){var U=M.call(R),X;if(M!==R.entries){for(;!(X=U.next()).done;)if(!F(X.value))return!1}else for(;!(X=U.next()).done;){var G=X.value;if(G&&!F(G[1]))return!1}}else return!1;return!0;default:return!1}}function H(R,M){return R==="symbol"?!0:M?M["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&M instanceof Symbol:!1}function _(R){var M=typeof R;return Array.isArray(R)?"array":R instanceof RegExp?"object":H(M,R)?"symbol":M}function z(R){if(typeof R>"u"||R===null)return""+R;var M=_(R);if(M==="object"){if(R instanceof Date)return"date";if(R instanceof RegExp)return"regexp"}return M}function ee(R){var M=z(R);switch(M){case"array":case"object":return"an "+M;case"boolean":case"date":case"regexp":return"a "+M;default:return M}}function Z(R){return!R.constructor||!R.constructor.name?g:R.constructor.name}return u.checkPropTypes=o,u.resetWarningCache=o.resetWarningCache,u.PropTypes=u,u},Hr}var Gr,Ta;function np(){if(Ta)return Gr;Ta=1;var e=Ro();function t(){}function n(){}return n.resetWarningCache=t,Gr=function(){function r(s,l,c,d,m,v){if(v!==e){var g=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw g.name="Invariant Violation",g}}r.isRequired=r;function o(){return r}var a={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return a.PropTypes=a,a},Gr}if(process.env.NODE_ENV!=="production"){var rp=Ws(),op=!0;ao.exports=tp()(rp.isElement,op)}else ao.exports=np()();var ap=ao.exports;const i=Xc(ap);function sp(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ys(e,t,n,r,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let l;const c=a.type;return typeof c=="function"&&!sp(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ks=sn(i.element,Ys);Ks.isRequired=sn(i.element.isRequired,Ys);const Hn=Ks;function ip(e){const{prototype:t={}}=e;return!!t.isReactComponent}function lp(e,t,n,r,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let l;return typeof a=="function"&&!ip(a)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const cp=sn(i.elementType,lp),pp="exact-prop: ​";function Js(e){return process.env.NODE_ENV==="production"?e:P({},e,{[pp]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Zt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var so={exports:{}},ue={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Na;function up(){if(Na)return ue;Na=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),u=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function f(b){if(typeof b=="object"&&b!==null){var x=b.$$typeof;switch(x){case e:switch(b=b.type,b){case n:case o:case r:case d:case m:return b;default:switch(b=b&&b.$$typeof,b){case l:case s:case c:case g:case v:case a:return b;default:return x}}case t:return x}}}return ue.ContextConsumer=s,ue.ContextProvider=a,ue.Element=e,ue.ForwardRef=c,ue.Fragment=n,ue.Lazy=g,ue.Memo=v,ue.Portal=t,ue.Profiler=o,ue.StrictMode=r,ue.Suspense=d,ue.SuspenseList=m,ue.isAsyncMode=function(){return!1},ue.isConcurrentMode=function(){return!1},ue.isContextConsumer=function(b){return f(b)===s},ue.isContextProvider=function(b){return f(b)===a},ue.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===e},ue.isForwardRef=function(b){return f(b)===c},ue.isFragment=function(b){return f(b)===n},ue.isLazy=function(b){return f(b)===g},ue.isMemo=function(b){return f(b)===v},ue.isPortal=function(b){return f(b)===t},ue.isProfiler=function(b){return f(b)===o},ue.isStrictMode=function(b){return f(b)===r},ue.isSuspense=function(b){return f(b)===d},ue.isSuspenseList=function(b){return f(b)===m},ue.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===n||b===o||b===r||b===d||b===m||b===u||typeof b=="object"&&b!==null&&(b.$$typeof===g||b.$$typeof===v||b.$$typeof===a||b.$$typeof===s||b.$$typeof===c||b.$$typeof===h||b.getModuleId!==void 0)},ue.typeOf=f,ue}var de={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ca;function dp(){return Ca||(Ca=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),u=Symbol.for("react.offscreen"),h=!1,f=!1,b=!1,x=!1,j=!1,w;w=Symbol.for("react.module.reference");function k(A){return!!(typeof A=="string"||typeof A=="function"||A===n||A===o||j||A===r||A===d||A===m||x||A===u||h||f||b||typeof A=="object"&&A!==null&&(A.$$typeof===g||A.$$typeof===v||A.$$typeof===a||A.$$typeof===s||A.$$typeof===c||A.$$typeof===w||A.getModuleId!==void 0))}function y(A){if(typeof A=="object"&&A!==null){var ie=A.$$typeof;switch(ie){case e:var Te=A.type;switch(Te){case n:case o:case r:case d:case m:return Te;default:var Pe=Te&&Te.$$typeof;switch(Pe){case l:case s:case c:case g:case v:case a:return Pe;default:return ie}}case t:return ie}}}var S=s,C=a,I=e,D=c,L=n,E=g,O=v,$=t,F=o,H=r,_=d,z=m,ee=!1,Z=!1;function R(A){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function M(A){return Z||(Z=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function U(A){return y(A)===s}function X(A){return y(A)===a}function G(A){return typeof A=="object"&&A!==null&&A.$$typeof===e}function q(A){return y(A)===c}function Y(A){return y(A)===n}function K(A){return y(A)===g}function W(A){return y(A)===v}function J(A){return y(A)===t}function Q(A){return y(A)===o}function se(A){return y(A)===r}function B(A){return y(A)===d}function te(A){return y(A)===m}de.ContextConsumer=S,de.ContextProvider=C,de.Element=I,de.ForwardRef=D,de.Fragment=L,de.Lazy=E,de.Memo=O,de.Portal=$,de.Profiler=F,de.StrictMode=H,de.Suspense=_,de.SuspenseList=z,de.isAsyncMode=R,de.isConcurrentMode=M,de.isContextConsumer=U,de.isContextProvider=X,de.isElement=G,de.isForwardRef=q,de.isFragment=Y,de.isLazy=K,de.isMemo=W,de.isPortal=J,de.isProfiler=Q,de.isStrictMode=se,de.isSuspense=B,de.isSuspenseList=te,de.isValidElementType=k,de.typeOf=y}()),de}process.env.NODE_ENV==="production"?so.exports=up():so.exports=dp();var ur=so.exports;const fp=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function mp(e){const t=`${e}`.match(fp);return t&&t[1]||""}function Zs(e,t=""){return e.displayName||e.name||mp(e)||t}function Sa(e,t,n){const r=Zs(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function hp(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Zs(e,"Component");if(typeof e=="object")switch(e.$$typeof){case ur.ForwardRef:return Sa(e,e.render,"ForwardRef");case ur.Memo:return Sa(e,e.type,"memo");default:return}}}function pt(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=e[t],s=o||t;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const gp=i.oneOfType([i.func,i.object]),Po=gp;function et(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Zt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function io(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Qs(e,t=166){let n;function r(...o){const a=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(a,t)}return r.clear=()=>{clearTimeout(n)},r}function bp(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,a,s)=>{const l=o||"<<anonymous>>",c=s||r;return typeof n[r]<"u"?new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function vp(e,t){var n,r;return N.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Oe(e){return e&&e.ownerDocument||document}function Qt(e){return Oe(e).defaultView||window}function yp(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?P({},t.propTypes):null;return o=>(a,s,l,c,d,...m)=>{const v=d||s,g=n==null?void 0:n[v];if(g){const u=g(a,s,l,c,d,...m);if(u)return u}return typeof a[s]<"u"&&!a[o]?new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function dr(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const wp=typeof window<"u"?N.useLayoutEffect:N.useEffect,It=wp;let Oa=0;function xp(e){const[t,n]=N.useState(e),r=e||t;return N.useEffect(()=>{t==null&&(Oa+=1,n(`mui-${Oa}`))},[t]),r}const Ra=N["useId".toString()];function ei(e){if(Ra!==void 0){const t=Ra();return e??t}return xp(e)}function kp(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=o||t;return typeof e[t]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function ti({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=N.useRef(e!==void 0),[a,s]=N.useState(t),l=o?e:a;if(process.env.NODE_ENV!=="production"){N.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:d}=N.useRef(t);N.useEffect(()=>{!o&&d!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=N.useCallback(d=>{o||s(d)},[]);return[l,c]}function _n(e){const t=N.useRef(e);return It(()=>{t.current=e}),N.useRef((...n)=>(0,t.current)(...n)).current}function Ge(...e){return N.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{dr(n,t)})},e)}const Pa={};function Ep(e,t){const n=N.useRef(Pa);return n.current===Pa&&(n.current=e(t)),n}const Tp=[];function Np(e){N.useEffect(e,Tp)}class Gn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Gn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function kn(){const e=Ep(Gn.create).current;return Np(e.disposeEffect),e}let kr=!0,lo=!1;const Cp=new Gn,Sp={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Op(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Sp[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Rp(e){e.metaKey||e.altKey||e.ctrlKey||(kr=!0)}function qr(){kr=!1}function Pp(){this.visibilityState==="hidden"&&lo&&(kr=!0)}function jp(e){e.addEventListener("keydown",Rp,!0),e.addEventListener("mousedown",qr,!0),e.addEventListener("pointerdown",qr,!0),e.addEventListener("touchstart",qr,!0),e.addEventListener("visibilitychange",Pp,!0)}function $p(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return kr||Op(t)}function ni(){const e=N.useCallback(o=>{o!=null&&jp(o.ownerDocument)},[]),t=N.useRef(!1);function n(){return t.current?(lo=!0,Cp.start(100,()=>{lo=!1}),t.current=!1,!0):!1}function r(o){return $p(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function ri(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function _p(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function Mp(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Ip=Number.isInteger||Mp;function oi(e,t,n,r){const o=e[t];if(o==null||!Ip(o)){const a=_p(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function ai(e,t,...n){return e[t]===void 0?null:oi(e,t,...n)}function co(){return null}ai.isRequired=oi;co.isRequired=co;const si=process.env.NODE_ENV==="production"?co:ai;function ii(e,t){const n=P({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=P({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},a=t[r];n[r]={},!a||!Object.keys(a)?n[r]=o:!o||!Object.keys(o)?n[r]=a:(n[r]=P({},a),Object.keys(o).forEach(s=>{n[r][s]=ii(o[s],a[s])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function ft(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((a,s)=>{if(s){const l=t(s);l!==""&&a.push(l),n&&n[s]&&a.push(n[s])}return a},[]).join(" ")}),r}const ja=e=>e,Ap=()=>{let e=ja;return{configure(t){e=t},generate(t){return e(t)},reset(){e=ja}}},Dp=Ap(),li=Dp,ci={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function rt(e,t,n="Mui"){const r=ci[t];return r?`${n}-${r}`:`${li.generate(e)}-${t}`}function wt(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=rt(e,o,n)}),r}function Bp(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function me(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,a;for(a=0;a<r.length;a++)o=r[a],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}const Lp=["values","unit","step"],Vp=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>P({},n,{[r.key]:r.val}),{})};function Fp(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=me(e,Lp),a=Vp(t),s=Object.keys(a);function l(g){return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${n})`}function c(g){return`@media (max-width:${(typeof t[g]=="number"?t[g]:g)-r/100}${n})`}function d(g,u){const h=s.indexOf(u);return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${n}) and (max-width:${(h!==-1&&typeof t[s[h]]=="number"?t[s[h]]:u)-r/100}${n})`}function m(g){return s.indexOf(g)+1<s.length?d(g,s[s.indexOf(g)+1]):l(g)}function v(g){const u=s.indexOf(g);return u===0?l(s[1]):u===s.length-1?c(s[u]):d(g,s[s.indexOf(g)+1]).replace("@media","@media not all and")}return P({keys:s,values:a,up:l,down:c,between:d,only:m,not:v,unit:n},o)}const zp={borderRadius:4},Up=zp,Hp=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.string,i.object,i.array]):{},xt=Hp;function Cn(e,t){return t?ct(e,t,{clone:!1}):e}const jo={xs:0,sm:600,md:900,lg:1200,xl:1536},$a={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${jo[e]}px)`};function ut(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const a=r.breakpoints||$a;return t.reduce((s,l,c)=>(s[a.up(a.keys[c])]=n(t[c]),s),{})}if(typeof t=="object"){const a=r.breakpoints||$a;return Object.keys(t).reduce((s,l)=>{if(Object.keys(a.values||jo).indexOf(l)!==-1){const c=a.up(l);s[c]=n(t[l],l)}else{const c=l;s[c]=t[c]}return s},{})}return n(t)}function Gp(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const a=e.up(o);return r[a]={},r},{}))||{}}function qp(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Er(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function fr(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Er(e,n)||r,t&&(o=t(o,r,e)),o}function ke(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,a=s=>{if(s[t]==null)return null;const l=s[t],c=s.theme,d=Er(c,r)||{};return ut(s,l,v=>{let g=fr(d,o,v);return v===g&&typeof v=="string"&&(g=fr(d,o,`${t}${v==="default"?"":et(v)}`,v)),n===!1?g:{[n]:g}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[t]:xt}:{},a.filterProps=[t],a}function Wp(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const Xp={m:"margin",p:"padding"},Yp={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},_a={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Kp=Wp(e=>{if(e.length>2)if(_a[e])e=_a[e];else return[e];const[t,n]=e.split(""),r=Xp[t],o=Yp[n]||"";return Array.isArray(o)?o.map(a=>r+a):[r+o]}),Tr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Nr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Jp=[...Tr,...Nr];function qn(e,t,n,r){var o;const a=(o=Er(e,t,!1))!=null?o:n;return typeof a=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),a*s):Array.isArray(a)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>a.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${s} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),a[s]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function pi(e){return qn(e,"spacing",8,"spacing")}function Wn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Zp(e,t){return n=>e.reduce((r,o)=>(r[o]=Wn(t,n),r),{})}function Qp(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=Kp(n),a=Zp(o,r),s=e[n];return ut(e,s,a)}function ui(e,t){const n=pi(e.theme);return Object.keys(e).map(r=>Qp(e,t,r,n)).reduce(Cn,{})}function ve(e){return ui(e,Tr)}ve.propTypes=process.env.NODE_ENV!=="production"?Tr.reduce((e,t)=>(e[t]=xt,e),{}):{};ve.filterProps=Tr;function ye(e){return ui(e,Nr)}ye.propTypes=process.env.NODE_ENV!=="production"?Nr.reduce((e,t)=>(e[t]=xt,e),{}):{};ye.filterProps=Nr;process.env.NODE_ENV!=="production"&&Jp.reduce((e,t)=>(e[t]=xt,e),{});function eu(e=8){if(e.mui)return e;const t=pi({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(a=>{const s=t(a);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function Cr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(a=>{r[a]=o}),r),{}),n=r=>Object.keys(r).reduce((o,a)=>t[a]?Cn(o,t[a](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Ue(e){return typeof e!="number"?e:`${e}px solid`}function Xe(e,t){return ke({prop:e,themeKey:"borders",transform:t})}const tu=Xe("border",Ue),nu=Xe("borderTop",Ue),ru=Xe("borderRight",Ue),ou=Xe("borderBottom",Ue),au=Xe("borderLeft",Ue),su=Xe("borderColor"),iu=Xe("borderTopColor"),lu=Xe("borderRightColor"),cu=Xe("borderBottomColor"),pu=Xe("borderLeftColor"),uu=Xe("outline",Ue),du=Xe("outlineColor"),Sr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=qn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:Wn(t,r)});return ut(e,e.borderRadius,n)}return null};Sr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:xt}:{};Sr.filterProps=["borderRadius"];Cr(tu,nu,ru,ou,au,su,iu,lu,cu,pu,Sr,uu,du);const Or=e=>{if(e.gap!==void 0&&e.gap!==null){const t=qn(e.theme,"spacing",8,"gap"),n=r=>({gap:Wn(t,r)});return ut(e,e.gap,n)}return null};Or.propTypes=process.env.NODE_ENV!=="production"?{gap:xt}:{};Or.filterProps=["gap"];const Rr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=qn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:Wn(t,r)});return ut(e,e.columnGap,n)}return null};Rr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:xt}:{};Rr.filterProps=["columnGap"];const Pr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=qn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:Wn(t,r)});return ut(e,e.rowGap,n)}return null};Pr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:xt}:{};Pr.filterProps=["rowGap"];const fu=ke({prop:"gridColumn"}),mu=ke({prop:"gridRow"}),hu=ke({prop:"gridAutoFlow"}),gu=ke({prop:"gridAutoColumns"}),bu=ke({prop:"gridAutoRows"}),vu=ke({prop:"gridTemplateColumns"}),yu=ke({prop:"gridTemplateRows"}),wu=ke({prop:"gridTemplateAreas"}),xu=ke({prop:"gridArea"});Cr(Or,Rr,Pr,fu,mu,hu,gu,bu,vu,yu,wu,xu);function Xt(e,t){return t==="grey"?t:e}const ku=ke({prop:"color",themeKey:"palette",transform:Xt}),Eu=ke({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Xt}),Tu=ke({prop:"backgroundColor",themeKey:"palette",transform:Xt});Cr(ku,Eu,Tu);function Ve(e){return e<=1&&e!==0?`${e*100}%`:e}const Nu=ke({prop:"width",transform:Ve}),$o=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const a=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||jo[n];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:Ve(n)}};return ut(e,e.maxWidth,t)}return null};$o.filterProps=["maxWidth"];const Cu=ke({prop:"minWidth",transform:Ve}),Su=ke({prop:"height",transform:Ve}),Ou=ke({prop:"maxHeight",transform:Ve}),Ru=ke({prop:"minHeight",transform:Ve});ke({prop:"size",cssProperty:"width",transform:Ve});ke({prop:"size",cssProperty:"height",transform:Ve});const Pu=ke({prop:"boxSizing"});Cr(Nu,$o,Cu,Su,Ou,Ru,Pu);const ju={border:{themeKey:"borders",transform:Ue},borderTop:{themeKey:"borders",transform:Ue},borderRight:{themeKey:"borders",transform:Ue},borderBottom:{themeKey:"borders",transform:Ue},borderLeft:{themeKey:"borders",transform:Ue},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Ue},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Sr},color:{themeKey:"palette",transform:Xt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Xt},backgroundColor:{themeKey:"palette",transform:Xt},p:{style:ye},pt:{style:ye},pr:{style:ye},pb:{style:ye},pl:{style:ye},px:{style:ye},py:{style:ye},padding:{style:ye},paddingTop:{style:ye},paddingRight:{style:ye},paddingBottom:{style:ye},paddingLeft:{style:ye},paddingX:{style:ye},paddingY:{style:ye},paddingInline:{style:ye},paddingInlineStart:{style:ye},paddingInlineEnd:{style:ye},paddingBlock:{style:ye},paddingBlockStart:{style:ye},paddingBlockEnd:{style:ye},m:{style:ve},mt:{style:ve},mr:{style:ve},mb:{style:ve},ml:{style:ve},mx:{style:ve},my:{style:ve},margin:{style:ve},marginTop:{style:ve},marginRight:{style:ve},marginBottom:{style:ve},marginLeft:{style:ve},marginX:{style:ve},marginY:{style:ve},marginInline:{style:ve},marginInlineStart:{style:ve},marginInlineEnd:{style:ve},marginBlock:{style:ve},marginBlockStart:{style:ve},marginBlockEnd:{style:ve},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Or},rowGap:{style:Pr},columnGap:{style:Rr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ve},maxWidth:{style:$o},minWidth:{transform:Ve},height:{transform:Ve},maxHeight:{transform:Ve},minHeight:{transform:Ve},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},_o=ju;function $u(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function _u(e,t){return typeof e=="function"?e(t):e}function Mu(){function e(n,r,o,a){const s={[n]:r,theme:o},l=a[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:d,transform:m,style:v}=l;if(r==null)return null;if(d==="typography"&&r==="inherit")return{[n]:r};const g=Er(o,d)||{};return v?v(s):ut(s,r,h=>{let f=fr(g,m,h);return h===f&&typeof h=="string"&&(f=fr(g,m,`${n}${h==="default"?"":et(h)}`,h)),c===!1?f:{[c]:f}})}function t(n){var r;const{sx:o,theme:a={}}=n||{};if(!o)return null;const s=(r=a.unstable_sxConfig)!=null?r:_o;function l(c){let d=c;if(typeof c=="function")d=c(a);else if(typeof c!="object")return c;if(!d)return null;const m=Gp(a.breakpoints),v=Object.keys(m);let g=m;return Object.keys(d).forEach(u=>{const h=_u(d[u],a);if(h!=null)if(typeof h=="object")if(s[u])g=Cn(g,e(u,h,a,s));else{const f=ut({theme:a},h,b=>({[u]:b}));$u(f,h)?g[u]=t({sx:h,theme:a}):g=Cn(g,f)}else g=Cn(g,e(u,h,a,s))}),qp(v,g)}return Array.isArray(o)?o.map(l):l(o)}return t}const di=Mu();di.filterProps=["sx"];const Mo=di;function Iu(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Au=["breakpoints","palette","spacing","shape"];function Io(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:a={}}=e,s=me(e,Au),l=Fp(n),c=eu(o);let d=ct({breakpoints:l,direction:"ltr",components:{},palette:P({mode:"light"},r),spacing:c,shape:P({},Up,a)},s);return d.applyStyles=Iu,d=t.reduce((m,v)=>ct(m,v),d),d.unstable_sxConfig=P({},_o,s==null?void 0:s.unstable_sxConfig),d.unstable_sx=function(v){return Mo({sx:v,theme:this})},d}function Du(e){return Object.keys(e).length===0}function fi(e=null){const t=N.useContext(no.ThemeContext);return!t||Du(t)?e:t}const Bu=Io();function mi(e=Bu){return fi(e)}const Lu=["ownerState"],Vu=["variants"],Fu=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function zu(e){return Object.keys(e).length===0}function Uu(e){return typeof e=="string"&&e.charCodeAt(0)>96}function sr(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Hu=Io(),Ma=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function tr({defaultTheme:e,theme:t,themeId:n}){return zu(t)?e:t[n]||t}function Gu(e){return e?(t,n)=>n[e]:null}function ir(e,t){let{ownerState:n}=t,r=me(t,Lu);const o=typeof e=="function"?e(P({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(a=>ir(a,P({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let l=me(o,Vu);return a.forEach(c=>{let d=!0;typeof c.props=="function"?d=c.props(P({ownerState:n},r,n)):Object.keys(c.props).forEach(m=>{(n==null?void 0:n[m])!==c.props[m]&&r[m]!==c.props[m]&&(d=!1)}),d&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(P({ownerState:n},r,n)):c.style))}),l}return o}function qu(e={}){const{themeId:t,defaultTheme:n=Hu,rootShouldForwardProp:r=sr,slotShouldForwardProp:o=sr}=e,a=s=>Mo(P({},s,{theme:tr(P({},s,{defaultTheme:n,themeId:t}))}));return a.__mui_systemSx=!0,(s,l={})=>{no.internal_processStyles(s,y=>y.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:c,slot:d,skipVariantsResolver:m,skipSx:v,overridesResolver:g=Gu(Ma(d))}=l,u=me(l,Fu),h=m!==void 0?m:d&&d!=="Root"&&d!=="root"||!1,f=v||!1;let b;process.env.NODE_ENV!=="production"&&c&&(b=`${c}-${Ma(d||"Root")}`);let x=sr;d==="Root"||d==="root"?x=r:d?x=o:Uu(s)&&(x=void 0);const j=no(s,P({shouldForwardProp:x,label:b},u)),w=y=>typeof y=="function"&&y.__emotion_real!==y||Pt(y)?S=>ir(y,P({},S,{theme:tr({theme:S.theme,defaultTheme:n,themeId:t})})):y,k=(y,...S)=>{let C=w(y);const I=S?S.map(w):[];c&&g&&I.push(E=>{const O=tr(P({},E,{defaultTheme:n,themeId:t}));if(!O.components||!O.components[c]||!O.components[c].styleOverrides)return null;const $=O.components[c].styleOverrides,F={};return Object.entries($).forEach(([H,_])=>{F[H]=ir(_,P({},E,{theme:O}))}),g(E,F)}),c&&!h&&I.push(E=>{var O;const $=tr(P({},E,{defaultTheme:n,themeId:t})),F=$==null||(O=$.components)==null||(O=O[c])==null?void 0:O.variants;return ir({variants:F},P({},E,{theme:$}))}),f||I.push(a);const D=I.length-S.length;if(Array.isArray(y)&&D>0){const E=new Array(D).fill("");C=[...y,...E],C.raw=[...y.raw,...E]}const L=j(C,...I);if(process.env.NODE_ENV!=="production"){let E;c&&(E=`${c}${et(d||"")}`),E===void 0&&(E=`Styled(${hp(s)})`),L.displayName=E}return s.muiName&&(L.muiName=s.muiName),L};return j.withConfig&&(k.withConfig=j.withConfig),k}}function Wu(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:ii(t.components[n].defaultProps,r)}function Xu({props:e,name:t,defaultTheme:n,themeId:r}){let o=mi(n);return r&&(o=o[r]||o),Wu({theme:o,name:t,props:e})}function Ao(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Bp(e,t,n)}function Yu(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function At(e){if(e.type)return e;if(e.charAt(0)==="#")return At(Yu(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Zt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Zt(10,o))}else r=r.split(",");return r=r.map(a=>parseFloat(a)),{type:n,values:r,colorSpace:o}}function jr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,a)=>a<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function Ku(e){e=At(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,a=r*Math.min(o,1-o),s=(d,m=(d+n/30)%12)=>o-a*Math.max(Math.min(m-3,9-m,1),-1);let l="rgb";const c=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),jr({type:l,values:c})}function Ia(e){e=At(e);let t=e.type==="hsl"||e.type==="hsla"?At(Ku(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Aa(e,t){const n=Ia(e),r=Ia(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function mr(e,t){return e=At(e),t=Ao(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,jr(e)}function Ju(e,t){if(e=At(e),t=Ao(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return jr(e)}function Zu(e,t){if(e=At(e),t=Ao(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return jr(e)}function Qu(e,t){return P({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const ed={black:"#000",white:"#fff"},Mn=ed,td={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},nd=td,rd={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Vt=rd,od={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Ft=od,ad={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},hn=ad,sd={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},zt=sd,id={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Ut=id,ld={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Ht=ld,cd=["mode","contrastThreshold","tonalOffset"],Da={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Mn.white,default:Mn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Wr={text:{primary:Mn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Mn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Ba(e,t,n,r){const o=r.light||r,a=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=Zu(e.main,o):t==="dark"&&(e.dark=Ju(e.main,a)))}function pd(e="light"){return e==="dark"?{main:zt[200],light:zt[50],dark:zt[400]}:{main:zt[700],light:zt[400],dark:zt[800]}}function ud(e="light"){return e==="dark"?{main:Vt[200],light:Vt[50],dark:Vt[400]}:{main:Vt[500],light:Vt[300],dark:Vt[700]}}function dd(e="light"){return e==="dark"?{main:Ft[500],light:Ft[300],dark:Ft[700]}:{main:Ft[700],light:Ft[400],dark:Ft[800]}}function fd(e="light"){return e==="dark"?{main:Ut[400],light:Ut[300],dark:Ut[700]}:{main:Ut[700],light:Ut[500],dark:Ut[900]}}function md(e="light"){return e==="dark"?{main:Ht[400],light:Ht[300],dark:Ht[700]}:{main:Ht[800],light:Ht[500],dark:Ht[900]}}function hd(e="light"){return e==="dark"?{main:hn[400],light:hn[300],dark:hn[700]}:{main:"#ed6c02",light:hn[500],dark:hn[900]}}function gd(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=me(e,cd),a=e.primary||pd(t),s=e.secondary||ud(t),l=e.error||dd(t),c=e.info||fd(t),d=e.success||md(t),m=e.warning||hd(t);function v(f){const b=Aa(f,Wr.text.primary)>=n?Wr.text.primary:Da.text.primary;if(process.env.NODE_ENV!=="production"){const x=Aa(f,b);x<3&&console.error([`MUI: The contrast ratio of ${x}:1 for ${b} on ${f}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return b}const g=({color:f,name:b,mainShade:x=500,lightShade:j=300,darkShade:w=700})=>{if(f=P({},f),!f.main&&f[x]&&(f.main=f[x]),!f.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.`:Zt(11,b?` (${b})`:"",x));if(typeof f.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(f.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Zt(12,b?` (${b})`:"",JSON.stringify(f.main)));return Ba(f,"light",j,r),Ba(f,"dark",w,r),f.contrastText||(f.contrastText=v(f.main)),f},u={dark:Wr,light:Da};return process.env.NODE_ENV!=="production"&&(u[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),ct(P({common:P({},Mn),mode:t,primary:g({color:a,name:"primary"}),secondary:g({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:g({color:l,name:"error"}),warning:g({color:m,name:"warning"}),info:g({color:c,name:"info"}),success:g({color:d,name:"success"}),grey:nd,contrastThreshold:n,getContrastText:v,augmentColor:g,tonalOffset:r},u[t]),o)}const bd=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function vd(e){return Math.round(e*1e5)/1e5}const La={textTransform:"uppercase"},Va='"Roboto", "Helvetica", "Arial", sans-serif';function yd(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Va,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:s=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:d=16,allVariants:m,pxToRem:v}=n,g=me(n,bd);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof d!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const u=o/14,h=v||(x=>`${x/d*u}rem`),f=(x,j,w,k,y)=>P({fontFamily:r,fontWeight:x,fontSize:h(j),lineHeight:w},r===Va?{letterSpacing:`${vd(k/j)}em`}:{},y,m),b={h1:f(a,96,1.167,-1.5),h2:f(a,60,1.2,-.5),h3:f(s,48,1.167,0),h4:f(s,34,1.235,.25),h5:f(s,24,1.334,0),h6:f(l,20,1.6,.15),subtitle1:f(s,16,1.75,.15),subtitle2:f(l,14,1.57,.1),body1:f(s,16,1.5,.15),body2:f(s,14,1.43,.15),button:f(l,14,1.75,.4,La),caption:f(s,12,1.66,.4),overline:f(s,12,2.66,1,La),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return ct(P({htmlFontSize:d,pxToRem:h,fontFamily:r,fontSize:o,fontWeightLight:a,fontWeightRegular:s,fontWeightMedium:l,fontWeightBold:c},b),g,{clone:!1})}const wd=.2,xd=.14,kd=.12;function ge(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${wd})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${xd})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${kd})`].join(",")}const Ed=["none",ge(0,2,1,-1,0,1,1,0,0,1,3,0),ge(0,3,1,-2,0,2,2,0,0,1,5,0),ge(0,3,3,-2,0,3,4,0,0,1,8,0),ge(0,2,4,-1,0,4,5,0,0,1,10,0),ge(0,3,5,-1,0,5,8,0,0,1,14,0),ge(0,3,5,-1,0,6,10,0,0,1,18,0),ge(0,4,5,-2,0,7,10,1,0,2,16,1),ge(0,5,5,-3,0,8,10,1,0,3,14,2),ge(0,5,6,-3,0,9,12,1,0,3,16,2),ge(0,6,6,-3,0,10,14,1,0,4,18,3),ge(0,6,7,-4,0,11,15,1,0,4,20,3),ge(0,7,8,-4,0,12,17,2,0,5,22,4),ge(0,7,8,-4,0,13,19,2,0,5,24,4),ge(0,7,9,-4,0,14,21,2,0,5,26,4),ge(0,8,9,-5,0,15,22,2,0,6,28,5),ge(0,8,10,-5,0,16,24,2,0,6,30,5),ge(0,8,11,-5,0,17,26,2,0,6,32,5),ge(0,9,11,-5,0,18,28,2,0,7,34,6),ge(0,9,12,-6,0,19,29,2,0,7,36,6),ge(0,10,13,-6,0,20,31,3,0,8,38,7),ge(0,10,13,-6,0,21,33,3,0,8,40,7),ge(0,10,14,-6,0,22,35,3,0,8,42,7),ge(0,11,14,-7,0,23,36,3,0,9,44,8),ge(0,11,15,-7,0,24,38,3,0,9,46,8)],Td=Ed,Nd=["duration","easing","delay"],Cd={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Sd={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Fa(e){return`${Math.round(e)}ms`}function Od(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Rd(e){const t=P({},Cd,e.easing),n=P({},Sd,e.duration);return P({getAutoHeightDuration:Od,create:(o=["all"],a={})=>{const{duration:s=n.standard,easing:l=t.easeInOut,delay:c=0}=a,d=me(a,Nd);if(process.env.NODE_ENV!=="production"){const m=g=>typeof g=="string",v=g=>!isNaN(parseFloat(g));!m(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!v(s)&&!m(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),m(l)||console.error('MUI: Argument "easing" must be a string.'),!v(c)&&!m(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(d).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(m=>`${m} ${typeof s=="string"?s:Fa(s)} ${l} ${typeof c=="string"?c:Fa(c)}`).join(",")}},e,{easing:t,duration:n})}const Pd={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},jd=Pd,$d=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function _d(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:a={}}=e,s=me(e,$d);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Zt(18));const l=gd(r),c=Io(e);let d=ct(c,{mixins:Qu(c.breakpoints,n),palette:l,shadows:Td.slice(),typography:yd(l,a),transitions:Rd(o),zIndex:P({},jd)});if(d=ct(d,s),d=t.reduce((m,v)=>ct(m,v),d),process.env.NODE_ENV!=="production"){const m=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],v=(g,u)=>{let h;for(h in g){const f=g[h];if(m.indexOf(h)!==-1&&Object.keys(f).length>0){if(process.env.NODE_ENV!=="production"){const b=rt("",h);console.error([`MUI: The \`${u}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(g,null,2),"",`Instead, you need to use the '&.${b}' syntax:`,JSON.stringify({root:{[`&.${b}`]:f}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}g[h]={}}}};Object.keys(d.components).forEach(g=>{const u=d.components[g].styleOverrides;u&&g.indexOf("Mui")===0&&v(u,g)})}return d.unstable_sxConfig=P({},_o,s==null?void 0:s.unstable_sxConfig),d.unstable_sx=function(v){return Mo({sx:v,theme:this})},d}const Md=_d(),Do=Md,Bo="$$material";function mt({props:e,name:t}){return Xu({props:e,name:t,defaultTheme:Do,themeId:Bo})}const hi=e=>sr(e)&&e!=="classes",Id=qu({themeId:Bo,defaultTheme:Do,rootShouldForwardProp:hi}),Re=Id;function Ad(e){return rt("MuiSvgIcon",e)}wt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Dd=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Bd=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${et(t)}`,`fontSize${et(n)}`]};return ft(o,Ad,r)},Ld=Re("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${et(n.color)}`],t[`fontSize${et(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,a,s,l,c,d,m,v,g,u,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((d=e.typography)==null||(m=d.pxToRem)==null?void 0:m.call(d,35))||"2.1875rem"}[t.fontSize],color:(v=(g=(e.vars||e).palette)==null||(g=g[t.color])==null?void 0:g.main)!=null?v:{action:(u=(e.vars||e).palette)==null||(u=u.action)==null?void 0:u.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),Lo=N.forwardRef(function(t,n){const r=mt({props:t,name:"MuiSvgIcon"}),{children:o,className:a,color:s="inherit",component:l="svg",fontSize:c="medium",htmlColor:d,inheritViewBox:m=!1,titleAccess:v,viewBox:g="0 0 24 24"}=r,u=me(r,Dd),h=N.isValidElement(o)&&o.type==="svg",f=P({},r,{color:s,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:m,viewBox:g,hasSvgAsChild:h}),b={};m||(b.viewBox=g);const x=Bd(f);return p.jsxs(Ld,P({as:l,className:Ce(x.root,a),focusable:"false",color:d,"aria-hidden":v?void 0:!0,role:v?"img":void 0,ref:n},b,u,h&&o.props,{ownerState:f,children:[h?o.props.children:o,v?p.jsx("title",{children:v}):null]}))});process.env.NODE_ENV!=="production"&&(Lo.propTypes={children:i.node,classes:i.object,className:i.string,color:i.oneOfType([i.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),i.string]),component:i.elementType,fontSize:i.oneOfType([i.oneOf(["inherit","large","medium","small"]),i.string]),htmlColor:i.string,inheritViewBox:i.bool,shapeRendering:i.string,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),titleAccess:i.string,viewBox:i.string});Lo.muiName="SvgIcon";const za=Lo;function gi(e,t){function n(r,o){return p.jsx(za,P({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=za.muiName,N.memo(N.forwardRef(n))}const Vd={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),li.configure(e)}},Fd=Object.freeze(Object.defineProperty({__proto__:null,capitalize:et,createChainedFunction:io,createSvgIcon:gi,debounce:Qs,deprecatedPropType:bp,isMuiElement:vp,ownerDocument:Oe,ownerWindow:Qt,requirePropFactory:yp,setRef:dr,unstable_ClassNameGenerator:Vd,unstable_useEnhancedEffect:It,unstable_useId:ei,unsupportedProp:kp,useControlled:ti,useEventCallback:_n,useForkRef:Ge,useIsFocusVisible:ni},Symbol.toStringTag,{value:"Module"})),zd=Yc(Fd);var Ua;function Ud(){return Ua||(Ua=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=zd}(Lr)),Lr}var Hd=Kc;Object.defineProperty(Oo,"__esModule",{value:!0});var bi=Oo.default=void 0,Gd=Hd(Ud()),qd=p;bi=Oo.default=(0,Gd.default)((0,qd.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function vi(e){return typeof e=="string"}function En(e,t,n){return e===void 0||vi(e)?t:P({},t,{ownerState:P({},t.ownerState,n)})}const Wd={disableDefaultClasses:!1},Xd=N.createContext(Wd);function Yd(e){const{disableDefaultClasses:t}=N.useContext(Xd);return n=>t?"":e(n)}function yi(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function Kd(e,t,n){return typeof e=="function"?e(t,n):e}function Ha(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function Jd(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:a}=e;if(!t){const u=Ce(n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),h=P({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=P({},n,o,r);return u.length>0&&(f.className=u),Object.keys(h).length>0&&(f.style=h),{props:f,internalRef:void 0}}const s=yi(P({},o,r)),l=Ha(r),c=Ha(o),d=t(s),m=Ce(d==null?void 0:d.className,n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),v=P({},d==null?void 0:d.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),g=P({},d,n,c,l);return m.length>0&&(g.className=m),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:d.ref}}const Zd=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Dt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:a=!1}=e,s=me(e,Zd),l=a?{}:Kd(r,o),{props:c,internalRef:d}=Jd(P({},s,{externalSlotProps:l})),m=Ge(d,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return En(n,P({},c,{ref:m}),o)}const wi="base";function Qd(e){return`${wi}--${e}`}function ef(e,t){return`${wi}-${e}-${t}`}function xi(e,t){const n=ci[t];return n?Qd(n):ef(e,t)}function tf(e,t){const n={};return t.forEach(r=>{n[r]=xi(e,r)}),n}const nf=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function rf(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function of(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function af(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||of(e))}function sf(e){const t=[],n=[];return Array.from(e.querySelectorAll(nf)).forEach((r,o)=>{const a=rf(r);a===-1||!af(r)||(a===0?t.push(r):n.push({documentOrder:o,tabIndex:a,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function lf(){return!0}function hr(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:a=sf,isEnabled:s=lf,open:l}=e,c=N.useRef(!1),d=N.useRef(null),m=N.useRef(null),v=N.useRef(null),g=N.useRef(null),u=N.useRef(!1),h=N.useRef(null),f=Ge(t.ref,h),b=N.useRef(null);N.useEffect(()=>{!l||!h.current||(u.current=!n)},[n,l]),N.useEffect(()=>{if(!l||!h.current)return;const w=Oe(h.current);return h.current.contains(w.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),u.current&&h.current.focus()),()=>{o||(v.current&&v.current.focus&&(c.current=!0,v.current.focus()),v.current=null)}},[l]),N.useEffect(()=>{if(!l||!h.current)return;const w=Oe(h.current),k=C=>{b.current=C,!(r||!s()||C.key!=="Tab")&&w.activeElement===h.current&&C.shiftKey&&(c.current=!0,m.current&&m.current.focus())},y=()=>{const C=h.current;if(C===null)return;if(!w.hasFocus()||!s()||c.current){c.current=!1;return}if(C.contains(w.activeElement)||r&&w.activeElement!==d.current&&w.activeElement!==m.current)return;if(w.activeElement!==g.current)g.current=null;else if(g.current!==null)return;if(!u.current)return;let I=[];if((w.activeElement===d.current||w.activeElement===m.current)&&(I=a(h.current)),I.length>0){var D,L;const E=!!((D=b.current)!=null&&D.shiftKey&&((L=b.current)==null?void 0:L.key)==="Tab"),O=I[0],$=I[I.length-1];typeof O!="string"&&typeof $!="string"&&(E?$.focus():O.focus())}else C.focus()};w.addEventListener("focusin",y),w.addEventListener("keydown",k,!0);const S=setInterval(()=>{w.activeElement&&w.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(S),w.removeEventListener("focusin",y),w.removeEventListener("keydown",k,!0)}},[n,r,o,s,l,a]);const x=w=>{v.current===null&&(v.current=w.relatedTarget),u.current=!0,g.current=w.target;const k=t.props.onFocus;k&&k(w)},j=w=>{v.current===null&&(v.current=w.relatedTarget),u.current=!0};return p.jsxs(N.Fragment,{children:[p.jsx("div",{tabIndex:l?0:-1,onFocus:j,ref:d,"data-testid":"sentinelStart"}),N.cloneElement(t,{ref:f,onFocus:x}),p.jsx("div",{tabIndex:l?0:-1,onFocus:j,ref:m,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(hr.propTypes={children:Hn,disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableRestoreFocus:i.bool,getTabbable:i.func,isEnabled:i.func,open:i.bool.isRequired});process.env.NODE_ENV!=="production"&&(hr["propTypes"]=Js(hr.propTypes));function cf(e){return typeof e=="function"?e():e}const In=N.forwardRef(function(t,n){const{children:r,container:o,disablePortal:a=!1}=t,[s,l]=N.useState(null),c=Ge(N.isValidElement(r)?r.ref:null,n);if(It(()=>{a||l(cf(o)||document.body)},[o,a]),It(()=>{if(s&&!a)return dr(n,s),()=>{dr(n,null)}},[n,s,a]),a){if(N.isValidElement(r)){const d={ref:c};return N.cloneElement(r,d)}return p.jsx(N.Fragment,{children:r})}return p.jsx(N.Fragment,{children:s&&sc.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&(In.propTypes={children:i.node,container:i.oneOfType([pt,i.func]),disablePortal:i.bool});process.env.NODE_ENV!=="production"&&(In["propTypes"]=Js(In.propTypes));function pf(e){const t=Oe(e);return t.body===e?Qt(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function Sn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Ga(e){return parseInt(Qt(e).getComputedStyle(e).paddingRight,10)||0}function uf(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function qa(e,t,n,r,o){const a=[t,n,...r];[].forEach.call(e.children,s=>{const l=a.indexOf(s)===-1,c=!uf(s);l&&c&&Sn(s,o)})}function Xr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function df(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(pf(r)){const s=ri(Oe(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Ga(r)+s}px`;const l=Oe(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${Ga(c)+s}px`})}let a;if(r.parentNode instanceof DocumentFragment)a=Oe(r).body;else{const s=r.parentElement,l=Qt(r);a=(s==null?void 0:s.nodeName)==="HTML"&&l.getComputedStyle(s).overflowY==="scroll"?s:r}n.push({value:a.style.overflow,property:"overflow",el:a},{value:a.style.overflowX,property:"overflow-x",el:a},{value:a.style.overflowY,property:"overflow-y",el:a}),a.style.overflow="hidden"}return()=>{n.forEach(({value:a,el:s,property:l})=>{a?s.style.setProperty(l,a):s.style.removeProperty(l)})}}function ff(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class mf{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&Sn(t.modalRef,!1);const o=ff(n);qa(n,t.mount,t.modalRef,o,!0);const a=Xr(this.containers,s=>s.container===n);return a!==-1?(this.containers[a].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=Xr(this.containers,a=>a.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=df(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=Xr(this.containers,s=>s.modals.indexOf(t)!==-1),a=this.containers[o];if(a.modals.splice(a.modals.indexOf(t),1),this.modals.splice(r,1),a.modals.length===0)a.restore&&a.restore(),t.modalRef&&Sn(t.modalRef,n),qa(a.container,t.mount,t.modalRef,a.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=a.modals[a.modals.length-1];s.modalRef&&Sn(s.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function hf(e){return typeof e=="function"?e():e}function gf(e){return e?e.props.hasOwnProperty("in"):!1}const bf=new mf;function vf(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=bf,closeAfterTransition:a=!1,onTransitionEnter:s,onTransitionExited:l,children:c,onClose:d,open:m,rootRef:v}=e,g=N.useRef({}),u=N.useRef(null),h=N.useRef(null),f=Ge(h,v),[b,x]=N.useState(!m),j=gf(c);let w=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(w=!1);const k=()=>Oe(u.current),y=()=>(g.current.modalRef=h.current,g.current.mount=u.current,g.current),S=()=>{o.mount(y(),{disableScrollLock:r}),h.current&&(h.current.scrollTop=0)},C=_n(()=>{const _=hf(t)||k().body;o.add(y(),_),h.current&&S()}),I=N.useCallback(()=>o.isTopModal(y()),[o]),D=_n(_=>{u.current=_,_&&(m&&I()?S():h.current&&Sn(h.current,w))}),L=N.useCallback(()=>{o.remove(y(),w)},[w,o]);N.useEffect(()=>()=>{L()},[L]),N.useEffect(()=>{m?C():(!j||!a)&&L()},[m,L,j,a,C]);const E=_=>z=>{var ee;(ee=_.onKeyDown)==null||ee.call(_,z),!(z.key!=="Escape"||z.which===229||!I())&&(n||(z.stopPropagation(),d&&d(z,"escapeKeyDown")))},O=_=>z=>{var ee;(ee=_.onClick)==null||ee.call(_,z),z.target===z.currentTarget&&d&&d(z,"backdropClick")};return{getRootProps:(_={})=>{const z=yi(e);delete z.onTransitionEnter,delete z.onTransitionExited;const ee=P({},z,_);return P({role:"presentation"},ee,{onKeyDown:E(ee),ref:f})},getBackdropProps:(_={})=>{const z=_;return P({"aria-hidden":!0},z,{onClick:O(z),open:m})},getTransitionProps:()=>{const _=()=>{x(!1),s&&s()},z=()=>{x(!0),l&&l(),a&&L()};return{onEnter:io(_,c==null?void 0:c.props.onEnter),onExited:io(z,c==null?void 0:c.props.onExited)}},rootRef:f,portalRef:D,isTopModal:I,exited:b,hasTransition:j}}var _e="top",qe="bottom",We="right",Me="left",Vo="auto",Xn=[_e,qe,We,Me],en="start",An="end",yf="clippingParents",ki="viewport",gn="popper",wf="reference",Wa=Xn.reduce(function(e,t){return e.concat([t+"-"+en,t+"-"+An])},[]),Ei=[].concat(Xn,[Vo]).reduce(function(e,t){return e.concat([t,t+"-"+en,t+"-"+An])},[]),xf="beforeRead",kf="read",Ef="afterRead",Tf="beforeMain",Nf="main",Cf="afterMain",Sf="beforeWrite",Of="write",Rf="afterWrite",Pf=[xf,kf,Ef,Tf,Nf,Cf,Sf,Of,Rf];function tt(e){return e?(e.nodeName||"").toLowerCase():null}function Fe(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Bt(e){var t=Fe(e).Element;return e instanceof t||e instanceof Element}function He(e){var t=Fe(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Fo(e){if(typeof ShadowRoot>"u")return!1;var t=Fe(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function jf(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},a=t.elements[n];!He(a)||!tt(a)||(Object.assign(a.style,r),Object.keys(o).forEach(function(s){var l=o[s];l===!1?a.removeAttribute(s):a.setAttribute(s,l===!0?"":l)}))})}function $f(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],a=t.attributes[r]||{},s=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=s.reduce(function(c,d){return c[d]="",c},{});!He(o)||!tt(o)||(Object.assign(o.style,l),Object.keys(a).forEach(function(c){o.removeAttribute(c)}))})}}const _f={name:"applyStyles",enabled:!0,phase:"write",fn:jf,effect:$f,requires:["computeStyles"]};function Ze(e){return e.split("-")[0]}var $t=Math.max,gr=Math.min,tn=Math.round;function po(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ti(){return!/^((?!chrome|android).)*safari/i.test(po())}function nn(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,a=1;t&&He(e)&&(o=e.offsetWidth>0&&tn(r.width)/e.offsetWidth||1,a=e.offsetHeight>0&&tn(r.height)/e.offsetHeight||1);var s=Bt(e)?Fe(e):window,l=s.visualViewport,c=!Ti()&&n,d=(r.left+(c&&l?l.offsetLeft:0))/o,m=(r.top+(c&&l?l.offsetTop:0))/a,v=r.width/o,g=r.height/a;return{width:v,height:g,top:m,right:d+v,bottom:m+g,left:d,x:d,y:m}}function zo(e){var t=nn(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Ni(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Fo(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function dt(e){return Fe(e).getComputedStyle(e)}function Mf(e){return["table","td","th"].indexOf(tt(e))>=0}function kt(e){return((Bt(e)?e.ownerDocument:e.document)||window.document).documentElement}function $r(e){return tt(e)==="html"?e:e.assignedSlot||e.parentNode||(Fo(e)?e.host:null)||kt(e)}function Xa(e){return!He(e)||dt(e).position==="fixed"?null:e.offsetParent}function If(e){var t=/firefox/i.test(po()),n=/Trident/i.test(po());if(n&&He(e)){var r=dt(e);if(r.position==="fixed")return null}var o=$r(e);for(Fo(o)&&(o=o.host);He(o)&&["html","body"].indexOf(tt(o))<0;){var a=dt(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function Yn(e){for(var t=Fe(e),n=Xa(e);n&&Mf(n)&&dt(n).position==="static";)n=Xa(n);return n&&(tt(n)==="html"||tt(n)==="body"&&dt(n).position==="static")?t:n||If(e)||t}function Uo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function On(e,t,n){return $t(e,gr(t,n))}function Af(e,t,n){var r=On(e,t,n);return r>n?n:r}function Ci(){return{top:0,right:0,bottom:0,left:0}}function Si(e){return Object.assign({},Ci(),e)}function Oi(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Df=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Si(typeof t!="number"?t:Oi(t,Xn))};function Bf(e){var t,n=e.state,r=e.name,o=e.options,a=n.elements.arrow,s=n.modifiersData.popperOffsets,l=Ze(n.placement),c=Uo(l),d=[Me,We].indexOf(l)>=0,m=d?"height":"width";if(!(!a||!s)){var v=Df(o.padding,n),g=zo(a),u=c==="y"?_e:Me,h=c==="y"?qe:We,f=n.rects.reference[m]+n.rects.reference[c]-s[c]-n.rects.popper[m],b=s[c]-n.rects.reference[c],x=Yn(a),j=x?c==="y"?x.clientHeight||0:x.clientWidth||0:0,w=f/2-b/2,k=v[u],y=j-g[m]-v[h],S=j/2-g[m]/2+w,C=On(k,S,y),I=c;n.modifiersData[r]=(t={},t[I]=C,t.centerOffset=C-S,t)}}function Lf(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Ni(t.elements.popper,o)&&(t.elements.arrow=o))}const Vf={name:"arrow",enabled:!0,phase:"main",fn:Bf,effect:Lf,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function rn(e){return e.split("-")[1]}var Ff={top:"auto",right:"auto",bottom:"auto",left:"auto"};function zf(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:tn(n*o)/o||0,y:tn(r*o)/o||0}}function Ya(e){var t,n=e.popper,r=e.popperRect,o=e.placement,a=e.variation,s=e.offsets,l=e.position,c=e.gpuAcceleration,d=e.adaptive,m=e.roundOffsets,v=e.isFixed,g=s.x,u=g===void 0?0:g,h=s.y,f=h===void 0?0:h,b=typeof m=="function"?m({x:u,y:f}):{x:u,y:f};u=b.x,f=b.y;var x=s.hasOwnProperty("x"),j=s.hasOwnProperty("y"),w=Me,k=_e,y=window;if(d){var S=Yn(n),C="clientHeight",I="clientWidth";if(S===Fe(n)&&(S=kt(n),dt(S).position!=="static"&&l==="absolute"&&(C="scrollHeight",I="scrollWidth")),S=S,o===_e||(o===Me||o===We)&&a===An){k=qe;var D=v&&S===y&&y.visualViewport?y.visualViewport.height:S[C];f-=D-r.height,f*=c?1:-1}if(o===Me||(o===_e||o===qe)&&a===An){w=We;var L=v&&S===y&&y.visualViewport?y.visualViewport.width:S[I];u-=L-r.width,u*=c?1:-1}}var E=Object.assign({position:l},d&&Ff),O=m===!0?zf({x:u,y:f},Fe(n)):{x:u,y:f};if(u=O.x,f=O.y,c){var $;return Object.assign({},E,($={},$[k]=j?"0":"",$[w]=x?"0":"",$.transform=(y.devicePixelRatio||1)<=1?"translate("+u+"px, "+f+"px)":"translate3d("+u+"px, "+f+"px, 0)",$))}return Object.assign({},E,(t={},t[k]=j?f+"px":"",t[w]=x?u+"px":"",t.transform="",t))}function Uf(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,a=n.adaptive,s=a===void 0?!0:a,l=n.roundOffsets,c=l===void 0?!0:l,d={placement:Ze(t.placement),variation:rn(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Ya(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Ya(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Hf={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Uf,data:{}};var nr={passive:!0};function Gf(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,a=o===void 0?!0:o,s=r.resize,l=s===void 0?!0:s,c=Fe(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&d.forEach(function(m){m.addEventListener("scroll",n.update,nr)}),l&&c.addEventListener("resize",n.update,nr),function(){a&&d.forEach(function(m){m.removeEventListener("scroll",n.update,nr)}),l&&c.removeEventListener("resize",n.update,nr)}}const qf={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Gf,data:{}};var Wf={left:"right",right:"left",bottom:"top",top:"bottom"};function lr(e){return e.replace(/left|right|bottom|top/g,function(t){return Wf[t]})}var Xf={start:"end",end:"start"};function Ka(e){return e.replace(/start|end/g,function(t){return Xf[t]})}function Ho(e){var t=Fe(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Go(e){return nn(kt(e)).left+Ho(e).scrollLeft}function Yf(e,t){var n=Fe(e),r=kt(e),o=n.visualViewport,a=r.clientWidth,s=r.clientHeight,l=0,c=0;if(o){a=o.width,s=o.height;var d=Ti();(d||!d&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:a,height:s,x:l+Go(e),y:c}}function Kf(e){var t,n=kt(e),r=Ho(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=$t(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=$t(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Go(e),c=-r.scrollTop;return dt(o||n).direction==="rtl"&&(l+=$t(n.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:l,y:c}}function qo(e){var t=dt(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Ri(e){return["html","body","#document"].indexOf(tt(e))>=0?e.ownerDocument.body:He(e)&&qo(e)?e:Ri($r(e))}function Rn(e,t){var n;t===void 0&&(t=[]);var r=Ri(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),a=Fe(r),s=o?[a].concat(a.visualViewport||[],qo(r)?r:[]):r,l=t.concat(s);return o?l:l.concat(Rn($r(s)))}function uo(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Jf(e,t){var n=nn(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Ja(e,t,n){return t===ki?uo(Yf(e,n)):Bt(t)?Jf(t,n):uo(Kf(kt(e)))}function Zf(e){var t=Rn($r(e)),n=["absolute","fixed"].indexOf(dt(e).position)>=0,r=n&&He(e)?Yn(e):e;return Bt(r)?t.filter(function(o){return Bt(o)&&Ni(o,r)&&tt(o)!=="body"}):[]}function Qf(e,t,n,r){var o=t==="clippingParents"?Zf(e):[].concat(t),a=[].concat(o,[n]),s=a[0],l=a.reduce(function(c,d){var m=Ja(e,d,r);return c.top=$t(m.top,c.top),c.right=gr(m.right,c.right),c.bottom=gr(m.bottom,c.bottom),c.left=$t(m.left,c.left),c},Ja(e,s,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function Pi(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ze(r):null,a=r?rn(r):null,s=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case _e:c={x:s,y:t.y-n.height};break;case qe:c={x:s,y:t.y+t.height};break;case We:c={x:t.x+t.width,y:l};break;case Me:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var d=o?Uo(o):null;if(d!=null){var m=d==="y"?"height":"width";switch(a){case en:c[d]=c[d]-(t[m]/2-n[m]/2);break;case An:c[d]=c[d]+(t[m]/2-n[m]/2);break}}return c}function Dn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,a=n.strategy,s=a===void 0?e.strategy:a,l=n.boundary,c=l===void 0?yf:l,d=n.rootBoundary,m=d===void 0?ki:d,v=n.elementContext,g=v===void 0?gn:v,u=n.altBoundary,h=u===void 0?!1:u,f=n.padding,b=f===void 0?0:f,x=Si(typeof b!="number"?b:Oi(b,Xn)),j=g===gn?wf:gn,w=e.rects.popper,k=e.elements[h?j:g],y=Qf(Bt(k)?k:k.contextElement||kt(e.elements.popper),c,m,s),S=nn(e.elements.reference),C=Pi({reference:S,element:w,strategy:"absolute",placement:o}),I=uo(Object.assign({},w,C)),D=g===gn?I:S,L={top:y.top-D.top+x.top,bottom:D.bottom-y.bottom+x.bottom,left:y.left-D.left+x.left,right:D.right-y.right+x.right},E=e.modifiersData.offset;if(g===gn&&E){var O=E[o];Object.keys(L).forEach(function($){var F=[We,qe].indexOf($)>=0?1:-1,H=[_e,qe].indexOf($)>=0?"y":"x";L[$]+=O[H]*F})}return L}function em(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,a=n.rootBoundary,s=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,d=c===void 0?Ei:c,m=rn(r),v=m?l?Wa:Wa.filter(function(h){return rn(h)===m}):Xn,g=v.filter(function(h){return d.indexOf(h)>=0});g.length===0&&(g=v);var u=g.reduce(function(h,f){return h[f]=Dn(e,{placement:f,boundary:o,rootBoundary:a,padding:s})[Ze(f)],h},{});return Object.keys(u).sort(function(h,f){return u[h]-u[f]})}function tm(e){if(Ze(e)===Vo)return[];var t=lr(e);return[Ka(e),t,Ka(t)]}function nm(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,a=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!0:s,c=n.fallbackPlacements,d=n.padding,m=n.boundary,v=n.rootBoundary,g=n.altBoundary,u=n.flipVariations,h=u===void 0?!0:u,f=n.allowedAutoPlacements,b=t.options.placement,x=Ze(b),j=x===b,w=c||(j||!h?[lr(b)]:tm(b)),k=[b].concat(w).reduce(function(G,q){return G.concat(Ze(q)===Vo?em(t,{placement:q,boundary:m,rootBoundary:v,padding:d,flipVariations:h,allowedAutoPlacements:f}):q)},[]),y=t.rects.reference,S=t.rects.popper,C=new Map,I=!0,D=k[0],L=0;L<k.length;L++){var E=k[L],O=Ze(E),$=rn(E)===en,F=[_e,qe].indexOf(O)>=0,H=F?"width":"height",_=Dn(t,{placement:E,boundary:m,rootBoundary:v,altBoundary:g,padding:d}),z=F?$?We:Me:$?qe:_e;y[H]>S[H]&&(z=lr(z));var ee=lr(z),Z=[];if(a&&Z.push(_[O]<=0),l&&Z.push(_[z]<=0,_[ee]<=0),Z.every(function(G){return G})){D=E,I=!1;break}C.set(E,Z)}if(I)for(var R=h?3:1,M=function(q){var Y=k.find(function(K){var W=C.get(K);if(W)return W.slice(0,q).every(function(J){return J})});if(Y)return D=Y,"break"},U=R;U>0;U--){var X=M(U);if(X==="break")break}t.placement!==D&&(t.modifiersData[r]._skip=!0,t.placement=D,t.reset=!0)}}const rm={name:"flip",enabled:!0,phase:"main",fn:nm,requiresIfExists:["offset"],data:{_skip:!1}};function Za(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Qa(e){return[_e,We,qe,Me].some(function(t){return e[t]>=0})}function om(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,s=Dn(t,{elementContext:"reference"}),l=Dn(t,{altBoundary:!0}),c=Za(s,r),d=Za(l,o,a),m=Qa(c),v=Qa(d);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:d,isReferenceHidden:m,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":m,"data-popper-escaped":v})}const am={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:om};function sm(e,t,n){var r=Ze(e),o=[Me,_e].indexOf(r)>=0?-1:1,a=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,s=a[0],l=a[1];return s=s||0,l=(l||0)*o,[Me,We].indexOf(r)>=0?{x:l,y:s}:{x:s,y:l}}function im(e){var t=e.state,n=e.options,r=e.name,o=n.offset,a=o===void 0?[0,0]:o,s=Ei.reduce(function(m,v){return m[v]=sm(v,t.rects,a),m},{}),l=s[t.placement],c=l.x,d=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=d),t.modifiersData[r]=s}const lm={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:im};function cm(e){var t=e.state,n=e.name;t.modifiersData[n]=Pi({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const pm={name:"popperOffsets",enabled:!0,phase:"read",fn:cm,data:{}};function um(e){return e==="x"?"y":"x"}function dm(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,a=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!1:s,c=n.boundary,d=n.rootBoundary,m=n.altBoundary,v=n.padding,g=n.tether,u=g===void 0?!0:g,h=n.tetherOffset,f=h===void 0?0:h,b=Dn(t,{boundary:c,rootBoundary:d,padding:v,altBoundary:m}),x=Ze(t.placement),j=rn(t.placement),w=!j,k=Uo(x),y=um(k),S=t.modifiersData.popperOffsets,C=t.rects.reference,I=t.rects.popper,D=typeof f=="function"?f(Object.assign({},t.rects,{placement:t.placement})):f,L=typeof D=="number"?{mainAxis:D,altAxis:D}:Object.assign({mainAxis:0,altAxis:0},D),E=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,O={x:0,y:0};if(S){if(a){var $,F=k==="y"?_e:Me,H=k==="y"?qe:We,_=k==="y"?"height":"width",z=S[k],ee=z+b[F],Z=z-b[H],R=u?-I[_]/2:0,M=j===en?C[_]:I[_],U=j===en?-I[_]:-C[_],X=t.elements.arrow,G=u&&X?zo(X):{width:0,height:0},q=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Ci(),Y=q[F],K=q[H],W=On(0,C[_],G[_]),J=w?C[_]/2-R-W-Y-L.mainAxis:M-W-Y-L.mainAxis,Q=w?-C[_]/2+R+W+K+L.mainAxis:U+W+K+L.mainAxis,se=t.elements.arrow&&Yn(t.elements.arrow),B=se?k==="y"?se.clientTop||0:se.clientLeft||0:0,te=($=E==null?void 0:E[k])!=null?$:0,A=z+J-te-B,ie=z+Q-te,Te=On(u?gr(ee,A):ee,z,u?$t(Z,ie):Z);S[k]=Te,O[k]=Te-z}if(l){var Pe,xe=k==="x"?_e:Me,Et=k==="x"?qe:We,je=S[y],ot=y==="y"?"height":"width",De=je+b[xe],at=je-b[Et],Ne=[_e,Me].indexOf(x)!==-1,Lt=(Pe=E==null?void 0:E[y])!=null?Pe:0,Tt=Ne?De:je-C[ot]-I[ot]-Lt+L.altAxis,ln=Ne?je+C[ot]+I[ot]-Lt-L.altAxis:at,Jn=u&&Ne?Af(Tt,je,ln):On(u?Tt:De,je,u?ln:at);S[y]=Jn,O[y]=Jn-je}t.modifiersData[r]=O}}const fm={name:"preventOverflow",enabled:!0,phase:"main",fn:dm,requiresIfExists:["offset"]};function mm(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function hm(e){return e===Fe(e)||!He(e)?Ho(e):mm(e)}function gm(e){var t=e.getBoundingClientRect(),n=tn(t.width)/e.offsetWidth||1,r=tn(t.height)/e.offsetHeight||1;return n!==1||r!==1}function bm(e,t,n){n===void 0&&(n=!1);var r=He(t),o=He(t)&&gm(t),a=kt(t),s=nn(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((tt(t)!=="body"||qo(a))&&(l=hm(t)),He(t)?(c=nn(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):a&&(c.x=Go(a))),{x:s.left+l.scrollLeft-c.x,y:s.top+l.scrollTop-c.y,width:s.width,height:s.height}}function vm(e){var t=new Map,n=new Set,r=[];e.forEach(function(a){t.set(a.name,a)});function o(a){n.add(a.name);var s=[].concat(a.requires||[],a.requiresIfExists||[]);s.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(a)}return e.forEach(function(a){n.has(a.name)||o(a)}),r}function ym(e){var t=vm(e);return Pf.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function wm(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function xm(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var es={placement:"bottom",modifiers:[],strategy:"absolute"};function ts(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function km(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,a=o===void 0?es:o;return function(l,c,d){d===void 0&&(d=a);var m={placement:"bottom",orderedModifiers:[],options:Object.assign({},es,a),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},v=[],g=!1,u={state:m,setOptions:function(x){var j=typeof x=="function"?x(m.options):x;f(),m.options=Object.assign({},a,m.options,j),m.scrollParents={reference:Bt(l)?Rn(l):l.contextElement?Rn(l.contextElement):[],popper:Rn(c)};var w=ym(xm([].concat(r,m.options.modifiers)));return m.orderedModifiers=w.filter(function(k){return k.enabled}),h(),u.update()},forceUpdate:function(){if(!g){var x=m.elements,j=x.reference,w=x.popper;if(ts(j,w)){m.rects={reference:bm(j,Yn(w),m.options.strategy==="fixed"),popper:zo(w)},m.reset=!1,m.placement=m.options.placement,m.orderedModifiers.forEach(function(L){return m.modifiersData[L.name]=Object.assign({},L.data)});for(var k=0;k<m.orderedModifiers.length;k++){if(m.reset===!0){m.reset=!1,k=-1;continue}var y=m.orderedModifiers[k],S=y.fn,C=y.options,I=C===void 0?{}:C,D=y.name;typeof S=="function"&&(m=S({state:m,options:I,name:D,instance:u})||m)}}}},update:wm(function(){return new Promise(function(b){u.forceUpdate(),b(m)})}),destroy:function(){f(),g=!0}};if(!ts(l,c))return u;u.setOptions(d).then(function(b){!g&&d.onFirstUpdate&&d.onFirstUpdate(b)});function h(){m.orderedModifiers.forEach(function(b){var x=b.name,j=b.options,w=j===void 0?{}:j,k=b.effect;if(typeof k=="function"){var y=k({state:m,name:x,instance:u,options:w}),S=function(){};v.push(y||S)}})}function f(){v.forEach(function(b){return b()}),v=[]}return u}}var Em=[qf,pm,Hf,_f,lm,rm,fm,Vf,am],Tm=km({defaultModifiers:Em});const ji="Popper";function Nm(e){return xi(ji,e)}tf(ji,["root"]);const Cm=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Sm=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Om(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function br(e){return typeof e=="function"?e():e}function _r(e){return e.nodeType!==void 0}function Rm(e){return!_r(e)}const Pm=()=>ft({root:["root"]},Yd(Nm)),jm={},$m=N.forwardRef(function(t,n){var r;const{anchorEl:o,children:a,direction:s,disablePortal:l,modifiers:c,open:d,placement:m,popperOptions:v,popperRef:g,slotProps:u={},slots:h={},TransitionProps:f}=t,b=me(t,Cm),x=N.useRef(null),j=Ge(x,n),w=N.useRef(null),k=Ge(w,g),y=N.useRef(k);It(()=>{y.current=k},[k]),N.useImperativeHandle(g,()=>w.current,[]);const S=Om(m,s),[C,I]=N.useState(S),[D,L]=N.useState(br(o));N.useEffect(()=>{w.current&&w.current.forceUpdate()}),N.useEffect(()=>{o&&L(br(o))},[o]),It(()=>{if(!D||!d)return;const H=ee=>{I(ee.placement)};if(process.env.NODE_ENV!=="production"&&D&&_r(D)&&D.nodeType===1){const ee=D.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ee.top===0&&ee.left===0&&ee.right===0&&ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let _=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ee})=>{H(ee)}}];c!=null&&(_=_.concat(c)),v&&v.modifiers!=null&&(_=_.concat(v.modifiers));const z=Tm(D,x.current,P({placement:S},v,{modifiers:_}));return y.current(z),()=>{z.destroy(),y.current(null)}},[D,l,c,d,v,S]);const E={placement:C};f!==null&&(E.TransitionProps=f);const O=Pm(),$=(r=h.root)!=null?r:"div",F=Dt({elementType:$,externalSlotProps:u.root,externalForwardedProps:b,additionalProps:{role:"tooltip",ref:j},ownerState:t,className:O.root});return p.jsx($,P({},F,{children:typeof a=="function"?a(E):a}))}),$i=N.forwardRef(function(t,n){const{anchorEl:r,children:o,container:a,direction:s="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:d,open:m,placement:v="bottom",popperOptions:g=jm,popperRef:u,style:h,transition:f=!1,slotProps:b={},slots:x={}}=t,j=me(t,Sm),[w,k]=N.useState(!0),y=()=>{k(!1)},S=()=>{k(!0)};if(!c&&!m&&(!f||w))return null;let C;if(a)C=a;else if(r){const L=br(r);C=L&&_r(L)?Oe(L).body:Oe(null).body}const I=!m&&c&&(!f||w)?"none":void 0,D=f?{in:m,onEnter:y,onExited:S}:void 0;return p.jsx(In,{disablePortal:l,container:C,children:p.jsx($m,P({anchorEl:r,direction:s,disablePortal:l,modifiers:d,ref:n,open:f?!w:m,placement:v,popperOptions:g,popperRef:u,slotProps:b,slots:x},j,{style:P({position:"fixed",top:0,left:0,display:I},h),TransitionProps:D,children:o}))})});process.env.NODE_ENV!=="production"&&($i.propTypes={anchorEl:sn(i.oneOfType([pt,i.object,i.func]),e=>{if(e.open){const t=br(e.anchorEl);if(t&&_r(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Rm(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:i.oneOfType([i.node,i.func]),container:i.oneOfType([pt,i.func]),direction:i.oneOf(["ltr","rtl"]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:Po,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),transition:i.bool});function Kn(){const e=mi(Do);return process.env.NODE_ENV!=="production"&&N.useDebugValue(e),e[Bo]||e}function fo(e,t){return fo=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},fo(e,t)}function _m(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,fo(e,t)}const ns={disabled:!1};var Mm=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.shape({enter:i.number,exit:i.number,appear:i.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&i.oneOfType([i.string,i.shape({enter:i.string,exit:i.string,active:i.string}),i.shape({enter:i.string,enterDone:i.string,enterActive:i.string,exit:i.string,exitDone:i.string,exitActive:i.string})]);const _i=T.createContext(null);var Im=function(t){return t.scrollTop},Tn="unmounted",Ct="exited",St="entering",Wt="entered",mo="exiting",ht=function(e){_m(t,e);function t(r,o){var a;a=e.call(this,r,o)||this;var s=o,l=s&&!s.isMounting?r.enter:r.appear,c;return a.appearStatus=null,r.in?l?(c=Ct,a.appearStatus=St):c=Wt:r.unmountOnExit||r.mountOnEnter?c=Tn:c=Ct,a.state={status:c},a.nextCallback=null,a}t.getDerivedStateFromProps=function(o,a){var s=o.in;return s&&a.status===Tn?{status:Ct}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var a=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==St&&s!==Wt&&(a=St):(s===St||s===Wt)&&(a=mo)}this.updateStatus(!1,a)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,a,s,l;return a=s=l=o,o!=null&&typeof o!="number"&&(a=o.exit,s=o.enter,l=o.appear!==void 0?o.appear:s),{exit:a,enter:s,appear:l}},n.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===St){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:wn.findDOMNode(this);s&&Im(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Ct&&this.setState({status:Tn})},n.performEnter=function(o){var a=this,s=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[wn.findDOMNode(this),l],d=c[0],m=c[1],v=this.getTimeouts(),g=l?v.appear:v.enter;if(!o&&!s||ns.disabled){this.safeSetState({status:Wt},function(){a.props.onEntered(d)});return}this.props.onEnter(d,m),this.safeSetState({status:St},function(){a.props.onEntering(d,m),a.onTransitionEnd(g,function(){a.safeSetState({status:Wt},function(){a.props.onEntered(d,m)})})})},n.performExit=function(){var o=this,a=this.props.exit,s=this.getTimeouts(),l=this.props.nodeRef?void 0:wn.findDOMNode(this);if(!a||ns.disabled){this.safeSetState({status:Ct},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:mo},function(){o.props.onExiting(l),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:Ct},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},n.setNextCallback=function(o){var a=this,s=!0;return this.nextCallback=function(l){s&&(s=!1,a.nextCallback=null,o(l))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},n.onTransitionEnd=function(o,a){this.setNextCallback(a);var s=this.props.nodeRef?this.props.nodeRef.current:wn.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!s||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],d=c[0],m=c[1];this.props.addEndListener(d,m)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===Tn)return null;var a=this.props,s=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var l=me(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return T.createElement(_i.Provider,{value:null},typeof s=="function"?s(o,l):T.cloneElement(T.Children.only(s),l))},t}(T.Component);ht.contextType=_i;ht.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:i.shape({current:typeof Element>"u"?i.any:function(e,t,n,r,o,a){var s=e[t];return i.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,a)}}),children:i.oneOfType([i.func.isRequired,i.element.isRequired]).isRequired,in:i.bool,mountOnEnter:i.bool,unmountOnExit:i.bool,appear:i.bool,enter:i.bool,exit:i.bool,timeout:function(t){var n=Mm;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),a=1;a<r;a++)o[a-1]=arguments[a];return n.apply(void 0,[t].concat(o))},addEndListener:i.func,onEnter:i.func,onEntering:i.func,onEntered:i.func,onExit:i.func,onExiting:i.func,onExited:i.func}:{};function Gt(){}ht.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Gt,onEntering:Gt,onEntered:Gt,onExit:Gt,onExiting:Gt,onExited:Gt};ht.UNMOUNTED=Tn;ht.EXITED=Ct;ht.ENTERING=St;ht.ENTERED=Wt;ht.EXITING=mo;const Mi=ht,Ii=e=>e.scrollTop;function vr(e,t){var n,r;const{timeout:o,easing:a,style:s={}}=e;return{duration:(n=s.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof a=="object"?a[t.mode]:a,delay:s.transitionDelay}}const Am=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function ho(e){return`scale(${e}, ${e**2})`}const Dm={entering:{opacity:1,transform:ho(1)},entered:{opacity:1,transform:"none"}},Yr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Wo=N.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:a,easing:s,in:l,onEnter:c,onEntered:d,onEntering:m,onExit:v,onExited:g,onExiting:u,style:h,timeout:f="auto",TransitionComponent:b=Mi}=t,x=me(t,Am),j=kn(),w=N.useRef(),k=Kn(),y=N.useRef(null),S=Ge(y,a.ref,n),C=H=>_=>{if(H){const z=y.current;_===void 0?H(z):H(z,_)}},I=C(m),D=C((H,_)=>{Ii(H);const{duration:z,delay:ee,easing:Z}=vr({style:h,timeout:f,easing:s},{mode:"enter"});let R;f==="auto"?(R=k.transitions.getAutoHeightDuration(H.clientHeight),w.current=R):R=z,H.style.transition=[k.transitions.create("opacity",{duration:R,delay:ee}),k.transitions.create("transform",{duration:Yr?R:R*.666,delay:ee,easing:Z})].join(","),c&&c(H,_)}),L=C(d),E=C(u),O=C(H=>{const{duration:_,delay:z,easing:ee}=vr({style:h,timeout:f,easing:s},{mode:"exit"});let Z;f==="auto"?(Z=k.transitions.getAutoHeightDuration(H.clientHeight),w.current=Z):Z=_,H.style.transition=[k.transitions.create("opacity",{duration:Z,delay:z}),k.transitions.create("transform",{duration:Yr?Z:Z*.666,delay:Yr?z:z||Z*.333,easing:ee})].join(","),H.style.opacity=0,H.style.transform=ho(.75),v&&v(H)}),$=C(g),F=H=>{f==="auto"&&j.start(w.current||0,H),r&&r(y.current,H)};return p.jsx(b,P({appear:o,in:l,nodeRef:y,onEnter:D,onEntered:L,onEntering:I,onExit:O,onExited:$,onExiting:E,addEndListener:F,timeout:f==="auto"?null:f},x,{children:(H,_)=>N.cloneElement(a,P({style:P({opacity:0,transform:ho(.75),visibility:H==="exited"&&!l?"hidden":void 0},Dm[H],h,a.props.style),ref:S},_))}))});process.env.NODE_ENV!=="production"&&(Wo.propTypes={addEndListener:i.func,appear:i.bool,children:Hn.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});Wo.muiSupportAuto=!0;const go=Wo,Bm=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},rs=Bm,Lm=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Vm=Re($i,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ai=N.forwardRef(function(t,n){var r;const o=fi(),a=mt({props:t,name:"MuiPopper"}),{anchorEl:s,component:l,components:c,componentsProps:d,container:m,disablePortal:v,keepMounted:g,modifiers:u,open:h,placement:f,popperOptions:b,popperRef:x,transition:j,slots:w,slotProps:k}=a,y=me(a,Lm),S=(r=w==null?void 0:w.root)!=null?r:c==null?void 0:c.Root,C=P({anchorEl:s,container:m,disablePortal:v,keepMounted:g,modifiers:u,open:h,placement:f,popperOptions:b,popperRef:x,transition:j},y);return p.jsx(Vm,P({as:l,direction:o==null?void 0:o.direction,slots:{root:S},slotProps:k??d},C,{ref:n}))});process.env.NODE_ENV!=="production"&&(Ai.propTypes={anchorEl:i.oneOfType([pt,i.object,i.func]),children:i.oneOfType([i.node,i.func]),component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:Po,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transition:i.bool});const Di=Ai;function Fm(e){return rt("MuiTooltip",e)}const zm=wt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),yt=zm,Um=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Hm(e){return Math.round(e*1e5)/1e5}const Gm=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:a}=e,s={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${et(a.split("-")[0])}`],arrow:["arrow"]};return ft(s,Fm,t)},qm=Re(Di,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>P({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${yt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${yt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${yt.arrow}`]:P({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${yt.arrow}`]:P({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Wm=Re("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${et(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>P({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:mr(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Hm(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${yt.popper}[data-popper-placement*="left"] &`]:P({transformOrigin:"right center"},t.isRtl?P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):P({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${yt.popper}[data-popper-placement*="right"] &`]:P({transformOrigin:"left center"},t.isRtl?P({marginRight:"14px"},t.touch&&{marginRight:"24px"}):P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${yt.popper}[data-popper-placement*="top"] &`]:P({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${yt.popper}[data-popper-placement*="bottom"] &`]:P({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Xm=Re("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:mr(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let rr=!1;const os=new Gn;let bn={x:0,y:0};function or(e,t){return n=>{t&&t(n),e(n)}}const Bi=N.forwardRef(function(t,n){var r,o,a,s,l,c,d,m,v,g,u,h,f,b,x,j,w,k,y;const S=mt({props:t,name:"MuiTooltip"}),{arrow:C=!1,children:I,components:D={},componentsProps:L={},describeChild:E=!1,disableFocusListener:O=!1,disableHoverListener:$=!1,disableInteractive:F=!1,disableTouchListener:H=!1,enterDelay:_=100,enterNextDelay:z=0,enterTouchDelay:ee=700,followCursor:Z=!1,id:R,leaveDelay:M=0,leaveTouchDelay:U=1500,onClose:X,onOpen:G,open:q,placement:Y="bottom",PopperComponent:K,PopperProps:W={},slotProps:J={},slots:Q={},title:se,TransitionComponent:B=go,TransitionProps:te}=S,A=me(S,Um),ie=N.isValidElement(I)?I:p.jsx("span",{children:I}),Te=Kn(),Pe=Te.direction==="rtl",[xe,Et]=N.useState(),[je,ot]=N.useState(null),De=N.useRef(!1),at=F||Z,Ne=kn(),Lt=kn(),Tt=kn(),ln=kn(),[Jn,Qo]=ti({controlled:q,default:!1,name:"Tooltip",state:"open"});let st=Jn;if(process.env.NODE_ENV!=="production"){const{current:ne}=N.useRef(q!==void 0);N.useEffect(()=>{xe&&xe.disabled&&!ne&&se!==""&&xe.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[se,xe,ne])}const Mr=ei(R),cn=N.useRef(),Zn=_n(()=>{cn.current!==void 0&&(document.body.style.WebkitUserSelect=cn.current,cn.current=void 0),ln.clear()});N.useEffect(()=>Zn,[Zn]);const ea=ne=>{os.clear(),rr=!0,Qo(!0),G&&!st&&G(ne)},Qn=_n(ne=>{os.start(800+M,()=>{rr=!1}),Qo(!1),X&&st&&X(ne),Ne.start(Te.transitions.duration.shortest,()=>{De.current=!1})}),Ir=ne=>{De.current&&ne.type!=="touchstart"||(xe&&xe.removeAttribute("title"),Lt.clear(),Tt.clear(),_||rr&&z?Lt.start(rr?z:_,()=>{ea(ne)}):ea(ne))},ta=ne=>{Lt.clear(),Tt.start(M,()=>{Qn(ne)})},{isFocusVisibleRef:na,onBlur:Ll,onFocus:Vl,ref:Fl}=ni(),[,ra]=N.useState(!1),oa=ne=>{Ll(ne),na.current===!1&&(ra(!1),ta(ne))},aa=ne=>{xe||Et(ne.currentTarget),Vl(ne),na.current===!0&&(ra(!0),Ir(ne))},sa=ne=>{De.current=!0;const Be=ie.props;Be.onTouchStart&&Be.onTouchStart(ne)},ia=Ir,la=ta,zl=ne=>{sa(ne),Tt.clear(),Ne.clear(),Zn(),cn.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",ln.start(ee,()=>{document.body.style.WebkitUserSelect=cn.current,Ir(ne)})},Ul=ne=>{ie.props.onTouchEnd&&ie.props.onTouchEnd(ne),Zn(),Tt.start(U,()=>{Qn(ne)})};N.useEffect(()=>{if(!st)return;function ne(Be){(Be.key==="Escape"||Be.key==="Esc")&&Qn(Be)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[Qn,st]);const Hl=Ge(ie.ref,Fl,Et,n);!se&&se!==0&&(st=!1);const Ar=N.useRef(),Gl=ne=>{const Be=ie.props;Be.onMouseMove&&Be.onMouseMove(ne),bn={x:ne.clientX,y:ne.clientY},Ar.current&&Ar.current.update()},pn={},Dr=typeof se=="string";E?(pn.title=!st&&Dr&&!$?se:null,pn["aria-describedby"]=st?Mr:null):(pn["aria-label"]=Dr?se:null,pn["aria-labelledby"]=st&&!Dr?Mr:null);const ze=P({},pn,A,ie.props,{className:Ce(A.className,ie.props.className),onTouchStart:sa,ref:Hl},Z?{onMouseMove:Gl}:{});process.env.NODE_ENV!=="production"&&(ze["data-mui-internal-clone-element"]=!0,N.useEffect(()=>{xe&&!xe.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[xe]));const un={};H||(ze.onTouchStart=zl,ze.onTouchEnd=Ul),$||(ze.onMouseOver=or(ia,ze.onMouseOver),ze.onMouseLeave=or(la,ze.onMouseLeave),at||(un.onMouseOver=ia,un.onMouseLeave=la)),O||(ze.onFocus=or(aa,ze.onFocus),ze.onBlur=or(oa,ze.onBlur),at||(un.onFocus=aa,un.onBlur=oa)),process.env.NODE_ENV!=="production"&&ie.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ie.props.title}\` or the Tooltip component.`].join(`
`));const ql=N.useMemo(()=>{var ne;let Be=[{name:"arrow",enabled:!!je,options:{element:je,padding:4}}];return(ne=W.popperOptions)!=null&&ne.modifiers&&(Be=Be.concat(W.popperOptions.modifiers)),P({},W.popperOptions,{modifiers:Be})},[je,W]),dn=P({},S,{isRtl:Pe,arrow:C,disableInteractive:at,placement:Y,PopperComponentProp:K,touch:De.current}),Br=Gm(dn),ca=(r=(o=Q.popper)!=null?o:D.Popper)!=null?r:qm,pa=(a=(s=(l=Q.transition)!=null?l:D.Transition)!=null?s:B)!=null?a:go,ua=(c=(d=Q.tooltip)!=null?d:D.Tooltip)!=null?c:Wm,da=(m=(v=Q.arrow)!=null?v:D.Arrow)!=null?m:Xm,Wl=En(ca,P({},W,(g=J.popper)!=null?g:L.popper,{className:Ce(Br.popper,W==null?void 0:W.className,(u=(h=J.popper)!=null?h:L.popper)==null?void 0:u.className)}),dn),Xl=En(pa,P({},te,(f=J.transition)!=null?f:L.transition),dn),Yl=En(ua,P({},(b=J.tooltip)!=null?b:L.tooltip,{className:Ce(Br.tooltip,(x=(j=J.tooltip)!=null?j:L.tooltip)==null?void 0:x.className)}),dn),Kl=En(da,P({},(w=J.arrow)!=null?w:L.arrow,{className:Ce(Br.arrow,(k=(y=J.arrow)!=null?y:L.arrow)==null?void 0:k.className)}),dn);return p.jsxs(N.Fragment,{children:[N.cloneElement(ie,ze),p.jsx(ca,P({as:K??Di,placement:Y,anchorEl:Z?{getBoundingClientRect:()=>({top:bn.y,left:bn.x,right:bn.x,bottom:bn.y,width:0,height:0})}:xe,popperRef:Ar,open:xe?st:!1,id:Mr,transition:!0},un,Wl,{popperOptions:ql,children:({TransitionProps:ne})=>p.jsx(pa,P({timeout:Te.transitions.duration.shorter},ne,Xl,{children:p.jsxs(ua,P({},Yl,{children:[se,C?p.jsx(da,P({},Kl,{ref:ot})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Bi.propTypes={arrow:i.bool,children:Hn.isRequired,classes:i.object,className:i.string,components:i.shape({Arrow:i.elementType,Popper:i.elementType,Tooltip:i.elementType,Transition:i.elementType}),componentsProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),describeChild:i.bool,disableFocusListener:i.bool,disableHoverListener:i.bool,disableInteractive:i.bool,disableTouchListener:i.bool,enterDelay:i.number,enterNextDelay:i.number,enterTouchDelay:i.number,followCursor:i.bool,id:i.string,leaveDelay:i.number,leaveTouchDelay:i.number,onClose:i.func,onOpen:i.func,open:i.bool,placement:i.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:i.elementType,PopperProps:i.object,slotProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),slots:i.shape({arrow:i.elementType,popper:i.elementType,tooltip:i.elementType,transition:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),title:i.node,TransitionComponent:i.elementType,TransitionProps:i.object});const Ym=Bi;function as(e,t,n){return e?p.jsx(Ee.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:p.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Xo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:s=void 0,hasAutoFocus:l=!1,className:c,isDisabled:d=!1,isDense:m=!0,isSubMenuParent:v=!1,hasDisabledGutters:g=!1,hasDivider:u=!1,focusVisibleClassName:h,id:f,children:b}=e,x=p.jsx(Ee.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:d,dense:m,disableGutters:g,divider:u,focusVisibleClassName:h,onClick:t,id:f,children:n?p.jsxs(p.Fragment,{children:[as(a,n,!0),p.jsx(Ee.ListItemText,{primary:n,inset:!a&&o}),v?p.jsx(Ee.ListItemIcon,{className:"papi-menu-icon-trailing",children:p.jsx(bi,{})}):as(s,n,!1)]}):b});return r?p.jsx(Ym,{title:r,placement:"right",children:p.jsx("div",{children:x})}):x}function Li(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Km(e){const[t,n]=T.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:a}=e,s=d=>{n(d.currentTarget)},l=()=>{n(void 0)},c=()=>{let d=Li(a).filter(m=>"menuItem"in m.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return d=d.filter(m=>"menuItem"in m.group&&m.group.menuItem===r.id),p.jsx(Yo,{...e,includedGroups:d})};return p.jsxs(p.Fragment,{children:[p.jsx(Xo,{onClick:s,...o,isSubMenuParent:!0}),p.jsx(Ee.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Jm=(e,t)=>t.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function Yo(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:a,allowForLeadingIcons:s}=T.useMemo(()=>{const m=o&&o.length>0?o:Li(t).filter(h=>!("menuItem"in h.group)),v=Object.values(m).sort((h,f)=>(h.group.order||0)-(f.group.order||0)),g=[];v.forEach(h=>{Jm(h.id,t.items).forEach(f=>g.push({item:f,isLastItemInGroup:!1})),g.length>0&&(g[g.length-1].isLastItemInGroup=!0)}),g.length>0&&(g[g.length-1].isLastItemInGroup=!1);const u=g.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:g,allowForLeadingIcons:u}},[o,t]),l=({item:m,isLastItemInGroup:v})=>({className:"papi-menu-item",label:m.label,tooltip:m.tooltip,iconPathBefore:"iconPathBefore"in m?m.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in m?m.iconPathAfter:void 0,hasDivider:v,allowForLeadingIcons:s}),[c]=a;if(!c)return p.jsx("div",{});const d=c.item.group;return p.jsx("div",{role:"menu","aria-label":d,children:a.map((m,v)=>{const{item:g}=m,u=l(m);if("command"in g){const h=g.group+v;return p.jsx(Xo,{onClick:f=>{n==null||n(f),r(g)},...u},h)}return p.jsx(Km,{parentMenuItem:g,parentItemProps:u,...e},d+g.id)})},d)}function Zm(e){const{menuDefinition:t,columnId:n}=e;let a=Object.entries(t.groups).map(([s,l])=>({id:s,group:l})).filter(s=>"column"in s.group);return n&&"columns"in t&&t.columns[n]&&(a=a.filter(s=>"column"in s.group&&s.group.column===n)),p.jsx(Yo,{...e,includedGroups:a})}function Qm({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:a}){return p.jsxs(Ee.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${a??""}`,children:[p.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${a??""}`,children:r.label}),p.jsx(Ee.List,{id:n,dense:!0,className:a??"",children:p.jsx(Zm,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Vi({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,a=T.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,d=o[c];typeof d=="object"&&typeof d.order=="number"&&!Number.isNaN(d.order)?s.set(d.order,{id:c,metadata:d}):console.warn(`Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return p.jsx(Ee.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:r,children:a.map((s,l)=>p.jsx(Qm,{commandHandler:e,menuDefinition:n,...s,className:t},l))})}const Fi=N.createContext({});process.env.NODE_ENV!=="production"&&(Fi.displayName="ListContext");const eh=Fi;function th(e){return rt("MuiList",e)}wt("MuiList",["root","padding","dense","subheader"]);const nh=["children","className","component","dense","disablePadding","subheader"],rh=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return ft({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},th,t)},oh=Re("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>P({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),zi=N.forwardRef(function(t,n){const r=mt({props:t,name:"MuiList"}),{children:o,className:a,component:s="ul",dense:l=!1,disablePadding:c=!1,subheader:d}=r,m=me(r,nh),v=N.useMemo(()=>({dense:l}),[l]),g=P({},r,{component:s,dense:l,disablePadding:c}),u=rh(g);return p.jsx(eh.Provider,{value:v,children:p.jsxs(oh,P({as:s,className:Ce(u.root,a),ref:n,ownerState:g},m,{children:[d,o]}))})});process.env.NODE_ENV!=="production"&&(zi.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,dense:i.bool,disablePadding:i.bool,subheader:i.node,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const ah=zi,sh=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Kr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function ss(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function Ui(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function vn(e,t,n,r,o,a){let s=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(s)return!1;s=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!Ui(l,a)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const Hi=N.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:a=!1,children:s,className:l,disabledItemsFocusable:c=!1,disableListWrap:d=!1,onKeyDown:m,variant:v="selectedMenu"}=t,g=me(t,sh),u=N.useRef(null),h=N.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});It(()=>{o&&u.current.focus()},[o]),N.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(w,k)=>{const y=!u.current.style.width;if(w.clientHeight<u.current.clientHeight&&y){const S=`${ri(Oe(w))}px`;u.current.style[k.direction==="rtl"?"paddingLeft":"paddingRight"]=S,u.current.style.width=`calc(100% + ${S})`}return u.current}}),[]);const f=w=>{const k=u.current,y=w.key,S=Oe(k).activeElement;if(y==="ArrowDown")w.preventDefault(),vn(k,S,d,c,Kr);else if(y==="ArrowUp")w.preventDefault(),vn(k,S,d,c,ss);else if(y==="Home")w.preventDefault(),vn(k,null,d,c,Kr);else if(y==="End")w.preventDefault(),vn(k,null,d,c,ss);else if(y.length===1){const C=h.current,I=y.toLowerCase(),D=performance.now();C.keys.length>0&&(D-C.lastTime>500?(C.keys=[],C.repeating=!0,C.previousKeyMatched=!0):C.repeating&&I!==C.keys[0]&&(C.repeating=!1)),C.lastTime=D,C.keys.push(I);const L=S&&!C.repeating&&Ui(S,C);C.previousKeyMatched&&(L||vn(k,S,!1,c,Kr,C))?w.preventDefault():C.previousKeyMatched=!1}m&&m(w)},b=Ge(u,n);let x=-1;N.Children.forEach(s,(w,k)=>{if(!N.isValidElement(w)){x===k&&(x+=1,x>=s.length&&(x=-1));return}process.env.NODE_ENV!=="production"&&ur.isFragment(w)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),w.props.disabled||(v==="selectedMenu"&&w.props.selected||x===-1)&&(x=k),x===k&&(w.props.disabled||w.props.muiSkipListHighlight||w.type.muiSkipListHighlight)&&(x+=1,x>=s.length&&(x=-1))});const j=N.Children.map(s,(w,k)=>{if(k===x){const y={};return a&&(y.autoFocus=!0),w.props.tabIndex===void 0&&v==="selectedMenu"&&(y.tabIndex=0),N.cloneElement(w,y)}return w});return p.jsx(ah,P({role:"menu",ref:b,className:l,onKeyDown:f,tabIndex:o?0:-1},g,{children:j}))});process.env.NODE_ENV!=="production"&&(Hi.propTypes={autoFocus:i.bool,autoFocusItem:i.bool,children:i.node,className:i.string,disabledItemsFocusable:i.bool,disableListWrap:i.bool,onKeyDown:i.func,variant:i.oneOf(["menu","selectedMenu"])});const ih=Hi,lh=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],ch={entering:{opacity:1},entered:{opacity:1}},Gi=N.forwardRef(function(t,n){const r=Kn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:a,appear:s=!0,children:l,easing:c,in:d,onEnter:m,onEntered:v,onEntering:g,onExit:u,onExited:h,onExiting:f,style:b,timeout:x=o,TransitionComponent:j=Mi}=t,w=me(t,lh),k=N.useRef(null),y=Ge(k,l.ref,n),S=F=>H=>{if(F){const _=k.current;H===void 0?F(_):F(_,H)}},C=S(g),I=S((F,H)=>{Ii(F);const _=vr({style:b,timeout:x,easing:c},{mode:"enter"});F.style.webkitTransition=r.transitions.create("opacity",_),F.style.transition=r.transitions.create("opacity",_),m&&m(F,H)}),D=S(v),L=S(f),E=S(F=>{const H=vr({style:b,timeout:x,easing:c},{mode:"exit"});F.style.webkitTransition=r.transitions.create("opacity",H),F.style.transition=r.transitions.create("opacity",H),u&&u(F)}),O=S(h),$=F=>{a&&a(k.current,F)};return p.jsx(j,P({appear:s,in:d,nodeRef:k,onEnter:I,onEntered:D,onEntering:C,onExit:E,onExited:O,onExiting:L,addEndListener:$,timeout:x},w,{children:(F,H)=>N.cloneElement(l,P({style:P({opacity:0,visibility:F==="exited"&&!d?"hidden":void 0},ch[F],b,l.props.style),ref:y},H))}))});process.env.NODE_ENV!=="production"&&(Gi.propTypes={addEndListener:i.func,appear:i.bool,children:Hn.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const ph=Gi;function uh(e){return rt("MuiBackdrop",e)}wt("MuiBackdrop",["root","invisible"]);const dh=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],fh=e=>{const{classes:t,invisible:n}=e;return ft({root:["root",n&&"invisible"]},uh,t)},mh=Re("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>P({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),qi=N.forwardRef(function(t,n){var r,o,a;const s=mt({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:d="div",components:m={},componentsProps:v={},invisible:g=!1,open:u,slotProps:h={},slots:f={},TransitionComponent:b=ph,transitionDuration:x}=s,j=me(s,dh),w=P({},s,{component:d,invisible:g}),k=fh(w),y=(r=h.root)!=null?r:v.root;return p.jsx(b,P({in:u,timeout:x},j,{children:p.jsx(mh,P({"aria-hidden":!0},y,{as:(o=(a=f.root)!=null?a:m.Root)!=null?o:d,className:Ce(k.root,c,y==null?void 0:y.className),ownerState:P({},w,y==null?void 0:y.ownerState),classes:k,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(qi.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.object}),invisible:i.bool,open:i.bool.isRequired,slotProps:i.shape({root:i.object}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const hh=qi;function gh(e){return rt("MuiModal",e)}wt("MuiModal",["root","hidden","backdrop"]);const bh=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],vh=e=>{const{open:t,exited:n,classes:r}=e;return ft({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},gh,r)},yh=Re("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>P({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),wh=Re(hh,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Wi=N.forwardRef(function(t,n){var r,o,a,s,l,c;const d=mt({name:"MuiModal",props:t}),{BackdropComponent:m=wh,BackdropProps:v,className:g,closeAfterTransition:u=!1,children:h,container:f,component:b,components:x={},componentsProps:j={},disableAutoFocus:w=!1,disableEnforceFocus:k=!1,disableEscapeKeyDown:y=!1,disablePortal:S=!1,disableRestoreFocus:C=!1,disableScrollLock:I=!1,hideBackdrop:D=!1,keepMounted:L=!1,onBackdropClick:E,open:O,slotProps:$,slots:F}=d,H=me(d,bh),_=P({},d,{closeAfterTransition:u,disableAutoFocus:w,disableEnforceFocus:k,disableEscapeKeyDown:y,disablePortal:S,disableRestoreFocus:C,disableScrollLock:I,hideBackdrop:D,keepMounted:L}),{getRootProps:z,getBackdropProps:ee,getTransitionProps:Z,portalRef:R,isTopModal:M,exited:U,hasTransition:X}=vf(P({},_,{rootRef:n})),G=P({},_,{exited:U}),q=vh(G),Y={};if(h.props.tabIndex===void 0&&(Y.tabIndex="-1"),X){const{onEnter:te,onExited:A}=Z();Y.onEnter=te,Y.onExited=A}const K=(r=(o=F==null?void 0:F.root)!=null?o:x.Root)!=null?r:yh,W=(a=(s=F==null?void 0:F.backdrop)!=null?s:x.Backdrop)!=null?a:m,J=(l=$==null?void 0:$.root)!=null?l:j.root,Q=(c=$==null?void 0:$.backdrop)!=null?c:j.backdrop,se=Dt({elementType:K,externalSlotProps:J,externalForwardedProps:H,getSlotProps:z,additionalProps:{ref:n,as:b},ownerState:G,className:Ce(g,J==null?void 0:J.className,q==null?void 0:q.root,!G.open&&G.exited&&(q==null?void 0:q.hidden))}),B=Dt({elementType:W,externalSlotProps:Q,additionalProps:v,getSlotProps:te=>ee(P({},te,{onClick:A=>{E&&E(A),te!=null&&te.onClick&&te.onClick(A)}})),className:Ce(Q==null?void 0:Q.className,v==null?void 0:v.className,q==null?void 0:q.backdrop),ownerState:G});return!L&&!O&&(!X||U)?null:p.jsx(In,{ref:R,container:f,disablePortal:S,children:p.jsxs(K,P({},se,{children:[!D&&m?p.jsx(W,P({},B)):null,p.jsx(hr,{disableEnforceFocus:k,disableAutoFocus:w,disableRestoreFocus:C,isEnabled:M,open:O,children:N.cloneElement(h,Y)})]}))})});process.env.NODE_ENV!=="production"&&(Wi.propTypes={BackdropComponent:i.elementType,BackdropProps:i.object,children:Hn.isRequired,classes:i.object,className:i.string,closeAfterTransition:i.bool,component:i.elementType,components:i.shape({Backdrop:i.elementType,Root:i.elementType}),componentsProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableEscapeKeyDown:i.bool,disablePortal:i.bool,disableRestoreFocus:i.bool,disableScrollLock:i.bool,hideBackdrop:i.bool,keepMounted:i.bool,onBackdropClick:i.func,onClose:i.func,onTransitionEnter:i.func,onTransitionExited:i.func,open:i.bool.isRequired,slotProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({backdrop:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const xh=Wi;function kh(e){return rt("MuiPaper",e)}wt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Eh=["className","component","elevation","square","variant"],Th=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,a={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return ft(a,kh,o)},Nh=Re("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return P({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&P({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${mr("#fff",rs(t.elevation))}, ${mr("#fff",rs(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Xi=N.forwardRef(function(t,n){const r=mt({props:t,name:"MuiPaper"}),{className:o,component:a="div",elevation:s=1,square:l=!1,variant:c="elevation"}=r,d=me(r,Eh),m=P({},r,{component:a,elevation:s,square:l,variant:c}),v=Th(m);return process.env.NODE_ENV!=="production"&&Kn().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),p.jsx(Nh,P({as:a,ownerState:m,className:Ce(v.root,o),ref:n},d))});process.env.NODE_ENV!=="production"&&(Xi.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,elevation:sn(si,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:i.bool,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),variant:i.oneOfType([i.oneOf(["elevation","outlined"]),i.string])});const Ch=Xi;function Sh(e){return rt("MuiPopover",e)}wt("MuiPopover",["root","paper"]);const Oh=["onEntering"],Rh=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Ph=["slotProps"];function is(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function ls(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function cs(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function cr(e){return typeof e=="function"?e():e}const jh=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"]},Sh,t)},$h=Re(xh,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Yi=Re(Ch,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Ki=N.forwardRef(function(t,n){var r,o,a;const s=mt({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:d={vertical:"top",horizontal:"left"},anchorPosition:m,anchorReference:v="anchorEl",children:g,className:u,container:h,elevation:f=8,marginThreshold:b=16,open:x,PaperProps:j={},slots:w,slotProps:k,transformOrigin:y={vertical:"top",horizontal:"left"},TransitionComponent:S=go,transitionDuration:C="auto",TransitionProps:{onEntering:I}={},disableScrollLock:D=!1}=s,L=me(s.TransitionProps,Oh),E=me(s,Rh),O=(r=k==null?void 0:k.paper)!=null?r:j,$=N.useRef(),F=Ge($,O.ref),H=P({},s,{anchorOrigin:d,anchorReference:v,elevation:f,marginThreshold:b,externalPaperSlotProps:O,transformOrigin:y,TransitionComponent:S,transitionDuration:C,TransitionProps:L}),_=jh(H),z=N.useCallback(()=>{if(v==="anchorPosition")return process.env.NODE_ENV!=="production"&&(m||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),m;const te=cr(c),A=te&&te.nodeType===1?te:Oe($.current).body,ie=A.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Te=A.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Te.top===0&&Te.left===0&&Te.right===0&&Te.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:ie.top+is(ie,d.vertical),left:ie.left+ls(ie,d.horizontal)}},[c,d.horizontal,d.vertical,m,v]),ee=N.useCallback(te=>({vertical:is(te,y.vertical),horizontal:ls(te,y.horizontal)}),[y.horizontal,y.vertical]),Z=N.useCallback(te=>{const A={width:te.offsetWidth,height:te.offsetHeight},ie=ee(A);if(v==="none")return{top:null,left:null,transformOrigin:cs(ie)};const Te=z();let Pe=Te.top-ie.vertical,xe=Te.left-ie.horizontal;const Et=Pe+A.height,je=xe+A.width,ot=Qt(cr(c)),De=ot.innerHeight-b,at=ot.innerWidth-b;if(b!==null&&Pe<b){const Ne=Pe-b;Pe-=Ne,ie.vertical+=Ne}else if(b!==null&&Et>De){const Ne=Et-De;Pe-=Ne,ie.vertical+=Ne}if(process.env.NODE_ENV!=="production"&&A.height>De&&A.height&&De&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${A.height-De}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),b!==null&&xe<b){const Ne=xe-b;xe-=Ne,ie.horizontal+=Ne}else if(je>at){const Ne=je-at;xe-=Ne,ie.horizontal+=Ne}return{top:`${Math.round(Pe)}px`,left:`${Math.round(xe)}px`,transformOrigin:cs(ie)}},[c,v,z,ee,b]),[R,M]=N.useState(x),U=N.useCallback(()=>{const te=$.current;if(!te)return;const A=Z(te);A.top!==null&&(te.style.top=A.top),A.left!==null&&(te.style.left=A.left),te.style.transformOrigin=A.transformOrigin,M(!0)},[Z]);N.useEffect(()=>(D&&window.addEventListener("scroll",U),()=>window.removeEventListener("scroll",U)),[c,D,U]);const X=(te,A)=>{I&&I(te,A),U()},G=()=>{M(!1)};N.useEffect(()=>{x&&U()}),N.useImperativeHandle(l,()=>x?{updatePosition:()=>{U()}}:null,[x,U]),N.useEffect(()=>{if(!x)return;const te=Qs(()=>{U()}),A=Qt(c);return A.addEventListener("resize",te),()=>{te.clear(),A.removeEventListener("resize",te)}},[c,x,U]);let q=C;C==="auto"&&!S.muiSupportAuto&&(q=void 0);const Y=h||(c?Oe(cr(c)).body:void 0),K=(o=w==null?void 0:w.root)!=null?o:$h,W=(a=w==null?void 0:w.paper)!=null?a:Yi,J=Dt({elementType:W,externalSlotProps:P({},O,{style:R?O.style:P({},O.style,{opacity:0})}),additionalProps:{elevation:f,ref:F},ownerState:H,className:Ce(_.paper,O==null?void 0:O.className)}),Q=Dt({elementType:K,externalSlotProps:(k==null?void 0:k.root)||{},externalForwardedProps:E,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:Y,open:x},ownerState:H,className:Ce(_.root,u)}),{slotProps:se}=Q,B=me(Q,Ph);return p.jsx(K,P({},B,!vi(K)&&{slotProps:se,disableScrollLock:D},{children:p.jsx(S,P({appear:!0,in:x,onEntering:X,onExited:G,timeout:q},L,{children:p.jsx(W,P({},J,{children:g}))}))}))});process.env.NODE_ENV!=="production"&&(Ki.propTypes={action:Po,anchorEl:sn(i.oneOfType([pt,i.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=cr(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),anchorPosition:i.shape({left:i.number.isRequired,top:i.number.isRequired}),anchorReference:i.oneOf(["anchorEl","anchorPosition","none"]),children:i.node,classes:i.object,className:i.string,container:i.oneOfType([pt,i.func]),disableScrollLock:i.bool,elevation:si,marginThreshold:i.number,onClose:i.func,open:i.bool.isRequired,PaperProps:i.shape({component:cp}),slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transformOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object});const _h=Ki;function Mh(e){return rt("MuiMenu",e)}wt("MuiMenu",["root","paper","list"]);const Ih=["onEntering"],Ah=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Dh={vertical:"top",horizontal:"right"},Bh={vertical:"top",horizontal:"left"},Lh=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"],list:["list"]},Mh,t)},Vh=Re(_h,{shouldForwardProp:e=>hi(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Fh=Re(Yi,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),zh=Re(ih,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Ji=N.forwardRef(function(t,n){var r,o;const a=mt({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:l,className:c,disableAutoFocusItem:d=!1,MenuListProps:m={},onClose:v,open:g,PaperProps:u={},PopoverClasses:h,transitionDuration:f="auto",TransitionProps:{onEntering:b}={},variant:x="selectedMenu",slots:j={},slotProps:w={}}=a,k=me(a.TransitionProps,Ih),y=me(a,Ah),S=Kn(),C=S.direction==="rtl",I=P({},a,{autoFocus:s,disableAutoFocusItem:d,MenuListProps:m,onEntering:b,PaperProps:u,transitionDuration:f,TransitionProps:k,variant:x}),D=Lh(I),L=s&&!d&&g,E=N.useRef(null),O=(Z,R)=>{E.current&&E.current.adjustStyleForScrollbar(Z,S),b&&b(Z,R)},$=Z=>{Z.key==="Tab"&&(Z.preventDefault(),v&&v(Z,"tabKeyDown"))};let F=-1;N.Children.map(l,(Z,R)=>{N.isValidElement(Z)&&(process.env.NODE_ENV!=="production"&&ur.isFragment(Z)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Z.props.disabled||(x==="selectedMenu"&&Z.props.selected||F===-1)&&(F=R))});const H=(r=j.paper)!=null?r:Fh,_=(o=w.paper)!=null?o:u,z=Dt({elementType:j.root,externalSlotProps:w.root,ownerState:I,className:[D.root,c]}),ee=Dt({elementType:H,externalSlotProps:_,ownerState:I,className:D.paper});return p.jsx(Vh,P({onClose:v,anchorOrigin:{vertical:"bottom",horizontal:C?"right":"left"},transformOrigin:C?Dh:Bh,slots:{paper:H,root:j.root},slotProps:{root:z,paper:ee},open:g,ref:n,transitionDuration:f,TransitionProps:P({onEntering:O},k),ownerState:I},y,{classes:h,children:p.jsx(zh,P({onKeyDown:$,actions:E,autoFocus:s&&(F===-1||d),autoFocusItem:L,variant:x},m,{className:Ce(D.list,m.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(Ji.propTypes={anchorEl:i.oneOfType([pt,i.func]),autoFocus:i.bool,children:i.node,classes:i.object,className:i.string,disableAutoFocusItem:i.bool,MenuListProps:i.object,onClose:i.func,open:i.bool.isRequired,PaperProps:i.object,PopoverClasses:i.object,slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object,variant:i.oneOf(["menu","selectedMenu"])});const Uh=Ji;function Hh({className:e,commandHandler:t,menuDefinition:n,children:r}){var d;const[o,a]=T.useState(void 0),s=T.useCallback(m=>{m.preventDefault(),a(o===void 0?{mouseX:m.clientX+2,mouseY:m.clientY-6}:void 0)},[o]),l=T.useCallback(()=>{a(void 0)},[]),c=T.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((d=n==null?void 0:n.items)==null?void 0:d.length)??0)===0||!r?r:p.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[r,p.jsx(Uh,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:p.jsx(Yo,{menuDefinition:n,commandHandler:t,onClick:l})})]})}function Gh(e){return{preserveValue:!0,...e}}const yr=(e,t,n={})=>{const r=T.useRef(t);r.current=t;const o=T.useRef(n);o.current=Gh(o.current);const[a,s]=T.useState(()=>r.current),[l,c]=T.useState(!0);return T.useEffect(()=>{let d=!0;return c(!!e),(async()=>{if(e){const m=await e();d&&(s(()=>m),c(!1))}})(),()=>{d=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[a,l]},qh=gi(p.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Zi({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:a,ariaLabelPrefix:s,children:l}){const[c,d]=T.useState(!1),[m,v]=T.useState(!1),g=T.useCallback(()=>{c&&d(!1),v(!1)},[c]),u=T.useCallback(k=>{k.stopPropagation(),d(y=>{const S=!y;return S&&k.shiftKey?v(!0):S||v(!1),S})},[]),h=T.useCallback(k=>(g(),r(k)),[r,g]),[f,b]=T.useState({top:1,left:1});T.useEffect(()=>{if(c){const k=o==null?void 0:o.current;if(k){const y=k.getBoundingClientRect(),S=window.scrollY,C=window.scrollX,I=y.top+S+k.clientHeight,D=y.left+C;b({top:I,left:D})}}},[c,o]);const[x]=yr(T.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[j]=yr(T.useCallback(async()=>(e==null?void 0:e(!0))??n??x,[e,n,x,c]),n??x),w=m&&j?j:x;return p.jsxs(p.Fragment,{children:[p.jsx(Ee.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:u,children:l??p.jsx(qh,{})}),p.jsx(Ee.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:c,onClose:g,PaperProps:{className:"papi-menu-drawer-paper",style:{top:f.top,left:f.left}},children:w?p.jsx(Vi,{className:a,id:`${s??""} main menu`,commandHandler:h,multiColumnMenu:w}):void 0})]})}function Wh({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:s="medium",className:l,onClick:c,children:d}){return p.jsx(Ee.IconButton,{id:e,disabled:n,edge:a,size:s,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:d})}const vt="scrBook",Xh="scrRef",Ot="source",Yh="details",Kh="Scripture Reference",Jh="Scripture Book",Qi="Type",Zh="Details";function Qh(e,t){const n=t??!1;return[{accessorFn:r=>`${fe.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:vt,header:(e==null?void 0:e.scriptureReferenceColumnName)??Kh,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?fe.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===vt?Ke.formatScrRef(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>Ke.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>Ke.formatScrRef(r.start),id:Xh,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:Ke.formatScrRef(o.start)},sortingFn:(r,o)=>Ke.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:Ot,header:n?(e==null?void 0:e.typeColumnName)??Qi:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:Yh,header:(e==null?void 0:e.detailsColumnName)??Zh,cell:r=>r.getValue(),enableGrouping:!1}]}function eg({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:a,detailsColumnName:s,onRowSelected:l}){const[c,d]=T.useState([]),[m,v]=T.useState([{id:vt,desc:!1}]),[g,u]=T.useState(()=>e.flatMap(E=>{const O=E.source;return E.data.map($=>({...$,source:O}))})),[h,f]=T.useState({});T.useEffect(()=>{u(()=>e.flatMap(E=>{const O=E.source;return E.data.map($=>({...$,source:O}))}))},[e]);const b=T.useMemo(()=>Qh({scriptureReferenceColumnName:r,typeColumnName:a,detailsColumnName:s},n),[r,a,s,n]);T.useEffect(()=>{c.includes(Ot)?v([{id:Ot,desc:!1},{id:vt,desc:!1}]):v([{id:vt,desc:!1}])},[c]);const x=T.useCallback((E,O)=>!O||Ke.compareScrRefs(E,O)===0?`${Ke.scrRefToBBBCCCVVV(E)}`:`${Ke.scrRefToBBBCCCVVV(E)}-${Ke.scrRefToBBBCCCVVV(O)}`,[]),j=T.useCallback(E=>`${x(E.start,E.end)} ${E.source} ${E.detail}`,[x]),w=Se.useReactTable({data:g,columns:b,state:{grouping:c,sorting:m,rowSelection:h},onGroupingChange:d,onSortingChange:v,onRowSelectionChange:f,getExpandedRowModel:Se.getExpandedRowModel(),getGroupedRowModel:Se.getGroupedRowModel(),getCoreRowModel:Se.getCoreRowModel(),getSortedRowModel:Se.getSortedRowModel(),getRowId:j,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});T.useEffect(()=>{if(l){const E=w.getSelectedRowModel().rowsById,O=Object.keys(E);if(O.length===1){const $=g.find(F=>j(F)===O[0])||void 0;$&&l($)}}},[h,g,j,l,w]);const k=o??Jh,y=a??Qi,S=[{label:"No Grouping",value:[]},{label:`Group by ${k}`,value:[vt]},{label:`Group by ${y}`,value:[Ot]},{label:`Group by ${k} and ${y}`,value:[vt,Ot]},{label:`Group by ${y} and ${k}`,value:[Ot,vt]}],C=E=>{d(JSON.parse(E))},I=(E,O)=>{!E.getIsGrouped()&&!E.getIsSelected()&&E.getToggleSelectedHandler()(O)},D=(E,O)=>E.getIsGrouped()?"":V("banded-row",O%2===0?"even":"odd"),L=(E,O,$)=>{if(!((E==null?void 0:E.length)===0||O.depth<$.column.getGroupedIndex())){if(O.getIsGrouped())switch(O.depth){case 1:return"pr-ps-4";default:return}switch(O.depth){case 1:return"pr-ps-8";case 2:return"pr-ps-12";default:return}}};return p.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-w-full pr-flex-col",children:[!t&&p.jsxs(jn,{value:JSON.stringify(c),onValueChange:E=>{C(E)},children:[p.jsx(Yt,{className:"pr-mb-1 pr-mt-2",children:p.jsx($n,{})}),p.jsx(Kt,{position:"item-aligned",children:p.jsx(js,{children:S.map(E=>p.jsx(Ye,{value:JSON.stringify(E.value),children:E.label},E.label))})})]}),p.jsxs(Fn,{className:"pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0",children:[t&&p.jsx(zn,{children:w.getHeaderGroups().map(E=>p.jsx(lt,{children:E.headers.filter(O=>O.column.columnDef.header).map(O=>p.jsx(Jt,{colSpan:O.colSpan,className:"top-0 pr-sticky",children:O.isPlaceholder?void 0:p.jsxs("div",{children:[O.column.getCanGroup()?p.jsx(be,{variant:"ghost",title:`Toggle grouping by ${O.column.columnDef.header}`,onClick:O.column.getToggleGroupingHandler(),type:"button",children:O.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Se.flexRender(O.column.columnDef.header,O.getContext())]})},O.id))},E.id))}),p.jsx(Un,{children:w.getRowModel().rows.map((E,O)=>p.jsx(lt,{"data-state":E.getIsSelected()?"selected":"",className:V(D(E,O)),onClick:$=>I(E,$),children:E.getVisibleCells().map($=>{if(!($.getIsPlaceholder()||$.column.columnDef.enableGrouping&&!$.getIsGrouped()&&($.column.columnDef.id!==Ot||!n)))return p.jsx(Mt,{className:V($.column.columnDef.id,"pr-p-[1px]",L(c,E,$)),children:(()=>$.getIsGrouped()?p.jsxs(be,{variant:"ghost",onClick:E.getToggleExpandedHandler(),type:"button",children:[E.getIsExpanded()?"👇":"👉"," ",Se.flexRender($.column.columnDef.cell,$.getContext())," (",E.subRows.length,")"]}):Se.flexRender($.column.columnDef.cell,$.getContext()))()},$.id)})},E.id))})]})]})}const tg=yo.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),Ko=T.forwardRef(({className:e,...t},n)=>p.jsx(ys.Root,{ref:n,className:V(tg(),e),...t}));Ko.displayName=ys.Root.displayName;function el({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:a,placeholder:s,isRequired:l=!1,className:c,defaultValue:d,value:m,onChange:v,onFocus:g,onBlur:u}){return p.jsxs("div",{className:V("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":r}),children:[p.jsx(Ko,{htmlFor:e,className:V({"pr-text-red-600":n,"pr-hidden":!a}),children:`${a}${l?"*":""}`}),p.jsx(Bn,{id:e,disabled:t,placeholder:s,required:l,className:V(c,{"pr-border-red-600":n}),defaultValue:d,value:m,onChange:v,onFocus:g,onBlur:u}),p.jsx("p",{className:V({"pr-hidden":!o}),children:o})]})}function ng({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=T.useState(""),a=s=>{o(s),e(s)};return p.jsx(el,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:s=>a(s.target.value)})}function rg({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:a=1,showMarks:s=!1,defaultValue:l,value:c,valueLabelDisplay:d="off",className:m,onChange:v,onChangeCommitted:g}){return p.jsx(Ee.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:a,marks:s,defaultValue:l,value:c,valueLabelDisplay:d,className:`papi-slider ${n} ${m??""}`,onChange:v,onChangeCommitted:g})}function og({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:s,children:l}){const c={action:(s==null?void 0:s.action)||l,message:s==null?void 0:s.message,className:r};return p.jsx(Ee.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:a,id:t,ContentProps:c})}function ag({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:a}){return p.jsx(Ee.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:a})}function sg({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const a=T.useRef(void 0);return p.jsx("div",{ref:a,style:{position:"relative"},children:p.jsx(Ee.AppBar,{position:"static",id:r,children:p.jsxs(Ee.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?p.jsx(Zi,{commandHandler:t,containerRef:a,menuProvider:e}):void 0,o?p.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const ig=Ae.Root,tl=T.forwardRef(({className:e,...t},n)=>p.jsx(Ae.List,{ref:n,className:V("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));tl.displayName=Ae.List.displayName;const nl=T.forwardRef(({className:e,...t},n)=>p.jsx(Ae.Trigger,{ref:n,className:V("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));nl.displayName=Ae.Trigger.displayName;const rl=T.forwardRef(({className:e,...t},n)=>p.jsx(Ae.Content,{ref:n,className:V("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));rl.displayName=Ae.Content.displayName;const ol=T.forwardRef(({className:e,...t},n)=>p.jsx(Ae.Root,{orientation:"vertical",ref:n,className:V("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));ol.displayName=Ae.List.displayName;const al=T.forwardRef(({className:e,...t},n)=>p.jsx(Ae.List,{ref:n,className:V("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));al.displayName=Ae.List.displayName;const lg=T.forwardRef(({className:e,...t},n)=>p.jsx(Ae.Trigger,{ref:n,...t,className:V("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),sl=T.forwardRef(({className:e,...t},n)=>p.jsx(Ae.Content,{ref:n,className:V("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));sl.displayName=Ae.Content.displayName;const ar=e=>e==="asc"?p.jsx(oe.ArrowUpIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):e==="desc"?p.jsx(oe.ArrowDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):p.jsx(oe.ArrowUpDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}),cg=(e,t,n,r,o)=>[{accessorKey:"character",header:({column:a})=>p.jsxs(be,{onClick:()=>a.toggleSorting(void 0),children:[e,ar(a.getIsSorted())]})},{accessorKey:"unicodeValue",header:({column:a})=>p.jsxs(be,{onClick:()=>a.toggleSorting(void 0),children:[t,ar(a.getIsSorted())]}),cell:({row:a})=>a.getValue("character").charCodeAt(0).toString(16).toUpperCase().padStart(4,"0")},{accessorKey:"count",header:({column:a})=>p.jsxs(be,{onClick:()=>a.toggleSorting(void 0),children:[n,ar(a.getIsSorted())]})},{accessorKey:"status",header:({column:a,table:s})=>{const l=s.getSelectedRowModel().rows,c=[];return l.forEach(d=>{c.push(d.getValue("character"))}),p.jsxs("div",{children:[p.jsx("div",{className:"pr-flex pr-justify-center",children:p.jsxs(be,{onClick:()=>a.toggleSorting(void 0),children:[r,ar(a.getIsSorted())]})}),p.jsxs("div",{className:"pr-flex pr-justify-center",children:[p.jsx(be,{children:p.jsx(oe.CircleCheckIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,!0)}})}),p.jsx(be,{children:p.jsx(oe.CircleXIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,!1)}})}),p.jsx(be,{children:p.jsx(oe.CircleHelpIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,void 0)}})})]})]})},cell:({row:a})=>{const s=a.getValue("status");return s===!0?p.jsx(oe.CircleCheckIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):s===!1?p.jsx(oe.CircleXIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):p.jsx(oe.CircleHelpIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"})}}];function pg({tableData:e,onStatusChange:t,onSelectCharacter:n,localizedStrings:r}){const o=r["%webView_inventory_table_header_character%"],a=r["%webView_inventory_table_header_unicode_value%"],s=r["%webView_inventory_table_header_count%"],l=r["%webView_inventory_table_header_status%"],c=(d,m)=>{m.toggleAllRowsSelected(!1),d.toggleSelected(void 0),n(d.getValue("character"))};return p.jsx("div",{className:"pr-overflow-y-auto",children:p.jsx(As,{columns:cg(o,a,s,l,t),data:e,onRowClickHandler:c})})}const ps=(e,t,n)=>{if(!e||e===""||t==="")return[];const r=[],o=e.split(`
`);let a="0",s="0",l=0;return o.forEach(c=>{const d=c.split(/\s+/);c.startsWith("\\c")&&([,a]=d,s="0"),c.startsWith("\\v")&&([,s]=d,a==="0"&&(a=n.chapterNum.toString()));for(let m=0;m<d.length;m++)if(d[m].includes(t)){const v=Math.max(0,m-2),g=Math.min(d.length,m+3),u=d.slice(v,g).join(" "),h={reference:{...n,chapterNum:+a,verseNum:+s},snippet:u,key:l};l+=1,r.push(h)}}),r};function ug({selectedCharacter:e,text:t,scriptureReference:n,setScriptureReference:r,localizedStrings:o}){const a=o["%webView_inventory_occurrences_table_header_reference%"],s=o["%webView_inventory_occurrences_table_header_occurrence%"],[l,c]=T.useState(ps(t,e,n));return T.useEffect(()=>c(ps(t,e,n)),[t,e,n]),p.jsxs(Fn,{children:[p.jsx(zn,{children:p.jsxs(lt,{children:[p.jsx(Jt,{children:a}),p.jsx(Jt,{children:s})]})}),p.jsx(Un,{children:l.map(d=>p.jsxs(lt,{onClick:()=>{r(d.reference)},children:[p.jsx(Mt,{children:`${fe.bookNumberToEnglishName(d.reference.bookNum)} ${d.reference.chapterNum}:${d.reference.verseNum}`}),p.jsx(Mt,{children:d.snippet})]},d.key))})]})}const dg=async(e,t,n,r,o)=>{const a=[];return Ke.split(e,"").forEach(s=>{if(n!==""&&!s.includes(n))return;const l=a.find(c=>c.character===s);if(l)l.count+=1;else{let c;if(r.includes(s)&&(c=!0),o.includes(s)&&(c=!1),t==="all"||t==="approved"&&c===!0||t==="unapproved"&&c===!1||t==="unknown"&&c===void 0){const d={character:s,count:1,status:c};a.push(d)}}}),a};function fg({scriptureReference:e,setScriptureReference:t,localizedStrings:n,projectId:r,getSetting:o,setSetting:a,getText:s}){const l=n["%webView_characterInventory_characters_all%"],c=n["%webView_characterInventory_characters_approved%"],d=n["%webView_characterInventory_characters_unapproved%"],m=n["%webView_characterInventory_characters_unknown%"],v=n["%webView_inventory_scope_book%"],g=n["%webView_inventory_scope_chapter%"],u=n["%webView_inventory_scope_verse%"],h=n["%webView_inventory_filter_text%"],[f,b]=T.useState([]),[x,j]=T.useState([]),[w,k]=T.useState(void 0),[y,S]=T.useState("book"),[C,I]=T.useState("all"),[D,L]=T.useState(""),[E,O]=T.useState([]),[$,F]=T.useState(""),H=(_,z)=>{O(ee=>{let Z=[];return _.forEach(R=>{Z=ee.map(M=>M.character===R&&M.status!==z?{...M,status:z}:M)}),b(R=>{let M=[...R];return _.forEach(U=>{z===!0?M.includes(U)||M.push(U):M=M.filter(X=>X!==U)}),a("validCharacters",r,M),M}),j(R=>{let M=[...R];return _.forEach(U=>{z===!1?M.includes(U)||M.push(U):M=M.filter(X=>X!==U)}),a("invalidCharacters",r,M),M}),Z})};return T.useEffect(()=>{(async()=>{try{b(await o("validCharacters",r)),j(await o("invalidCharacters",r))}catch{throw new Error("Failed to fetch characters from project settings")}})()},[r,o]),T.useEffect(()=>{(async()=>{try{const z=await s(r,e,y);k(z)}catch{throw new Error("Failed getting scripture text")}})()},[r,e,y,s]),T.useEffect(()=>{if(!w){O([]);return}(async()=>{try{O(await dg(w,C,D,f,x))}catch{throw new Error("Failed building table data")}})()},[f,x,w,C,D]),p.jsxs("div",{className:"pr-twp",children:[p.jsxs("div",{className:"pr-flex",children:[p.jsxs(jn,{onValueChange:_=>I(_),defaultValue:C,children:[p.jsx(Yt,{children:p.jsx($n,{placeholder:"Select filter"})}),p.jsxs(Kt,{children:[p.jsx(Ye,{value:"all",children:l}),p.jsx(Ye,{value:"approved",children:c}),p.jsx(Ye,{value:"unapproved",children:d}),p.jsx(Ye,{value:"unknown",children:m})]})]}),p.jsxs(jn,{onValueChange:_=>S(_),defaultValue:y,children:[p.jsx(Yt,{children:p.jsx($n,{placeholder:"Select scope"})}),p.jsxs(Kt,{children:[p.jsx(Ye,{value:"book",children:v}),p.jsx(Ye,{value:"chapter",children:g}),p.jsx(Ye,{value:"verse",children:u})]})]}),p.jsx(Bn,{className:"pr-rounded-md pr-border",placeholder:h,value:D,onChange:_=>{L(_.target.value)}})]}),p.jsx("div",{className:`pr-overflow-y-auto pr-rounded-md pr-border ${$!==""&&"pr-max-h-96"}`,children:p.jsx(pg,{tableData:E,onStatusChange:H,onSelectCharacter:_=>{F(_)},localizedStrings:n})}),$!==""&&p.jsx("div",{className:"pr-mt-4 pr-rounded-md pr-border",children:p.jsx(ug,{selectedCharacter:$,text:w,scriptureReference:e,setScriptureReference:_=>t(_),localizedStrings:n})})]})}function mg({isInstalling:e,handleClick:t,buttonText:n}){return p.jsx(be,{className:V("pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e,"pr-bg-blue-600":!e,"pr-bg-white pr-text-blue-600 hover:pr-text-white":!n,"pr-w-20":n}),onClick:t,children:e?p.jsx(oe.LoaderCircle,{size:15,className:"pr-animate-spin"}):p.jsxs(p.Fragment,{children:[p.jsx(oe.Download,{size:25,className:V("pr-h-4 pr-w-4",{"pr-mr-1":n})}),n]})})}function hg({isEnabling:e,handleClick:t}){return p.jsx(be,{className:V("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e}),onClick:t,children:e?p.jsxs(p.Fragment,{children:[p.jsx(oe.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-white"}),"Enabling..."]}):"Enable"})}function gg({isDisabling:e,handleClick:t}){return p.jsx(be,{className:V("pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-gray-400",{"pr-cursor-not-allowed pr-bg-gray-400":e}),onClick:t,children:e?p.jsxs(p.Fragment,{children:[p.jsx(oe.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-black"}),"Disabling..."]}):"Disable"})}function bg({isUpdating:e,handleClick:t}){return p.jsx(be,{className:V("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700 hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e}),onClick:t,children:e?p.jsxs(p.Fragment,{children:[p.jsx(oe.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-white"}),"Updating..."]}):"Update"})}function jt(){return jt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},jt.apply(this,arguments)}const vg=["children","options"],us=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,t)=>(e[t.toLowerCase()]=t,e),{for:"htmlFor"}),ds={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},yg=["style","script"],wg=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,xg=/mailto:/i,kg=/\n{2,}$/,il=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,Eg=/^ *> ?/gm,Tg=/^ {2,}\n/,Ng=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,ll=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,cl=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,Cg=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,Sg=/^(?:\n *)*\n/,Og=/\r\n?/g,Rg=/^\[\^([^\]]+)](:.*)\n/,Pg=/^\[\^([^\]]+)]/,jg=/\f/g,$g=/^\s*?\[(x|\s)\]/,pl=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,ul=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,dl=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,bo=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,_g=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,fl=/^<!--[\s\S]*?(?:-->)/,Mg=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,vo=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,Ig=/^\{.*\}$/,Ag=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,Dg=/^<([^ >]+@[^ >]+)>/,Bg=/^<([^ >]+:\/[^ >]+)>/,Lg=/-([a-z])?/gi,ml=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,Vg=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,Fg=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,zg=/^\[([^\]]*)\] ?\[([^\]]*)\]/,Ug=/(\[|\])/g,Hg=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,Gg=/\t/g,qg=/^ *\| */,Wg=/(^ *\||\| *$)/g,Xg=/ *$/,Yg=/^ *:-+: *$/,Kg=/^ *:-+ *$/,Jg=/^ *-+: *$/,Zg=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,Qg=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,eb=/^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,tb=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,nb=/^\\([^0-9A-Za-z\s])/,rb=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,ob=/^\n+/,ab=/^([ \t]*)/,sb=/\\([^\\])/g,fs=/ *\n+$/,ib=/(?:^|\n)( *)$/,Jo="(?:\\d+\\.)",Zo="(?:[*+-])";function hl(e){return"( *)("+(e===1?Jo:Zo)+") +"}const gl=hl(1),bl=hl(2);function vl(e){return new RegExp("^"+(e===1?gl:bl))}const lb=vl(1),cb=vl(2);function yl(e){return new RegExp("^"+(e===1?gl:bl)+"[^\\n]*(?:\\n(?!\\1"+(e===1?Jo:Zo)+" )[^\\n]*)*(\\n|$)","gm")}const wl=yl(1),xl=yl(2);function kl(e){const t=e===1?Jo:Zo;return new RegExp("^( *)("+t+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+t+" (?!"+t+" ))\\n*|\\s*\\n*$)")}const El=kl(1),Tl=kl(2);function ms(e,t){const n=t===1,r=n?El:Tl,o=n?wl:xl,a=n?lb:cb;return{t(s,l,c){const d=ib.exec(c);return d&&(l.o||!l._&&!l.u)?r.exec(s=d[1]+s):null},i:ae.HIGH,l(s,l,c){const d=n?+s[2]:void 0,m=s[0].replace(kg,`
`).match(o);let v=!1;return{p:m.map(function(g,u){const h=a.exec(g)[0].length,f=new RegExp("^ {1,"+h+"}","gm"),b=g.replace(f,"").replace(a,""),x=u===m.length-1,j=b.indexOf(`

`)!==-1||x&&v;v=j;const w=c._,k=c.o;let y;c.o=!0,j?(c._=!1,y=b.replace(fs,`

`)):(c._=!0,y=b.replace(fs,""));const S=l(y,c);return c._=w,c.o=k,S}),m:n,g:d}},h:(s,l,c)=>e(s.m?"ol":"ul",{key:c.k,start:s.g},s.p.map(function(d,m){return e("li",{key:m},l(d,c))}))}}const pb=/^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,ub=/^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Nl=[il,ll,cl,pl,dl,ul,fl,ml,wl,El,xl,Tl],db=[...Nl,/^[^\n]+(?:  \n|\n{2,})/,bo,vo];function fb(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function mb(e){return Jg.test(e)?"right":Yg.test(e)?"center":Kg.test(e)?"left":null}function hs(e,t,n){const r=n.$;n.$=!0;const o=t(e.trim(),n);n.$=r;let a=[[]];return o.forEach(function(s,l){s.type==="tableSeparator"?l!==0&&l!==o.length-1&&a.push([]):(s.type!=="text"||o[l+1]!=null&&o[l+1].type!=="tableSeparator"||(s.v=s.v.replace(Xg,"")),a[a.length-1].push(s))}),a}function hb(e,t,n){n._=!0;const r=hs(e[1],t,n),o=e[2].replace(Wg,"").split("|").map(mb),a=function(s,l,c){return s.trim().split(`
`).map(function(d){return hs(d,l,c)})}(e[3],t,n);return n._=!1,{S:o,A:a,L:r,type:"table"}}function gs(e,t){return e.S[t]==null?{}:{textAlign:e.S[t]}}function gt(e){return function(t,n){return n._?e.exec(t):null}}function bt(e){return function(t,n){return n._||n.u?e.exec(t):null}}function it(e){return function(t,n){return n._||n.u?null:e.exec(t)}}function yn(e){return function(t){return e.exec(t)}}function gb(e,t,n){if(t._||t.u||n&&!n.endsWith(`
`))return null;let r="";e.split(`
`).every(a=>!Nl.some(s=>s.test(a))&&(r+=a+`
`,a.trim()));const o=r.trimEnd();return o==""?null:[r,o]}function qt(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch{return null}return e}function bs(e){return e.replace(sb,"$1")}function pr(e,t,n){const r=n._||!1,o=n.u||!1;n._=!0,n.u=!0;const a=e(t,n);return n._=r,n.u=o,a}function bb(e,t,n){const r=n._||!1,o=n.u||!1;n._=!1,n.u=!0;const a=e(t,n);return n._=r,n.u=o,a}function vb(e,t,n){return n._=!1,e(t,n)}const Jr=(e,t,n)=>({v:pr(t,e[1],n)});function Zr(){return{}}function Qr(){return null}function yb(...e){return e.filter(Boolean).join(" ")}function eo(e,t,n){let r=e;const o=t.split(".");for(;o.length&&(r=r[o[0]],r!==void 0);)o.shift();return r||n}var ae;function wb(e,t={}){t.overrides=t.overrides||{},t.slugify=t.slugify||fb,t.namedCodesToUnicode=t.namedCodesToUnicode?jt({},ds,t.namedCodesToUnicode):ds;const n=t.createElement||N.createElement;function r(u,h,...f){const b=eo(t.overrides,`${u}.props`,{});return n(function(x,j){const w=eo(j,x);return w?typeof w=="function"||typeof w=="object"&&"render"in w?w:eo(j,`${x}.component`,x):x}(u,t.overrides),jt({},h,b,{className:yb(h==null?void 0:h.className,b.className)||void 0}),...f)}function o(u){let h=!1;t.forceInline?h=!0:t.forceBlock||(h=Hg.test(u)===!1);const f=m(d(h?u:`${u.trimEnd().replace(ob,"")}

`,{_:h}));for(;typeof f[f.length-1]=="string"&&!f[f.length-1].trim();)f.pop();if(t.wrapper===null)return f;const b=t.wrapper||(h?"span":"div");let x;if(f.length>1||t.forceWrapper)x=f;else{if(f.length===1)return x=f[0],typeof x=="string"?r("span",{key:"outer"},x):x;x=null}return N.createElement(b,{key:"outer"},x)}function a(u){const h=u.match(wg);return h?h.reduce(function(f,b,x){const j=b.indexOf("=");if(j!==-1){const w=function(C){return C.indexOf("-")!==-1&&C.match(Mg)===null&&(C=C.replace(Lg,function(I,D){return D.toUpperCase()})),C}(b.slice(0,j)).trim(),k=function(C){const I=C[0];return(I==='"'||I==="'")&&C.length>=2&&C[C.length-1]===I?C.slice(1,-1):C}(b.slice(j+1).trim()),y=us[w]||w,S=f[y]=function(C,I){return C==="style"?I.split(/;\s?/).reduce(function(D,L){const E=L.slice(0,L.indexOf(":"));return D[E.replace(/(-[a-z])/g,O=>O[1].toUpperCase())]=L.slice(E.length+1).trim(),D},{}):C==="href"?qt(I):(I.match(Ig)&&(I=I.slice(1,I.length-1)),I==="true"||I!=="false"&&I)}(w,k);typeof S=="string"&&(bo.test(S)||vo.test(S))&&(f[y]=N.cloneElement(o(S.trim()),{key:x}))}else b!=="style"&&(f[us[b]||b]=!0);return f},{}):null}const s=[],l={},c={blockQuote:{t:it(il),i:ae.HIGH,l:(u,h,f)=>({v:h(u[0].replace(Eg,""),f)}),h:(u,h,f)=>r("blockquote",{key:f.k},h(u.v,f))},breakLine:{t:yn(Tg),i:ae.HIGH,l:Zr,h:(u,h,f)=>r("br",{key:f.k})},breakThematic:{t:it(Ng),i:ae.HIGH,l:Zr,h:(u,h,f)=>r("hr",{key:f.k})},codeBlock:{t:it(cl),i:ae.MAX,l:u=>({v:u[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),M:void 0}),h:(u,h,f)=>r("pre",{key:f.k},r("code",jt({},u.O,{className:u.M?`lang-${u.M}`:""}),u.v))},codeFenced:{t:it(ll),i:ae.MAX,l:u=>({O:a(u[3]||""),v:u[4],M:u[2]||void 0,type:"codeBlock"})},codeInline:{t:bt(Cg),i:ae.LOW,l:u=>({v:u[2]}),h:(u,h,f)=>r("code",{key:f.k},u.v)},footnote:{t:it(Rg),i:ae.MAX,l:u=>(s.push({I:u[2],j:u[1]}),{}),h:Qr},footnoteReference:{t:gt(Pg),i:ae.HIGH,l:u=>({v:u[1],B:`#${t.slugify(u[1])}`}),h:(u,h,f)=>r("a",{key:f.k,href:qt(u.B)},r("sup",{key:f.k},u.v))},gfmTask:{t:gt($g),i:ae.HIGH,l:u=>({R:u[1].toLowerCase()==="x"}),h:(u,h,f)=>r("input",{checked:u.R,key:f.k,readOnly:!0,type:"checkbox"})},heading:{t:it(t.enforceAtxHeadings?ul:pl),i:ae.HIGH,l:(u,h,f)=>({v:pr(h,u[2],f),T:t.slugify(u[2]),C:u[1].length}),h:(u,h,f)=>r(`h${u.C}`,{id:u.T,key:f.k},h(u.v,f))},headingSetext:{t:it(dl),i:ae.MAX,l:(u,h,f)=>({v:pr(h,u[1],f),C:u[2]==="="?1:2,type:"heading"})},htmlComment:{t:yn(fl),i:ae.HIGH,l:()=>({}),h:Qr},image:{t:bt(ub),i:ae.HIGH,l:u=>({D:u[1],B:bs(u[2]),F:u[3]}),h:(u,h,f)=>r("img",{key:f.k,alt:u.D||void 0,title:u.F||void 0,src:qt(u.B)})},link:{t:gt(pb),i:ae.LOW,l:(u,h,f)=>({v:bb(h,u[1],f),B:bs(u[2]),F:u[3]}),h:(u,h,f)=>r("a",{key:f.k,href:qt(u.B),title:u.F},h(u.v,f))},linkAngleBraceStyleDetector:{t:gt(Bg),i:ae.MAX,l:u=>({v:[{v:u[1],type:"text"}],B:u[1],type:"link"})},linkBareUrlDetector:{t:(u,h)=>h.N?null:gt(Ag)(u,h),i:ae.MAX,l:u=>({v:[{v:u[1],type:"text"}],B:u[1],F:void 0,type:"link"})},linkMailtoDetector:{t:gt(Dg),i:ae.MAX,l(u){let h=u[1],f=u[1];return xg.test(f)||(f="mailto:"+f),{v:[{v:h.replace("mailto:",""),type:"text"}],B:f,type:"link"}}},orderedList:ms(r,1),unorderedList:ms(r,2),newlineCoalescer:{t:it(Sg),i:ae.LOW,l:Zr,h:()=>`
`},paragraph:{t:gb,i:ae.LOW,l:Jr,h:(u,h,f)=>r("p",{key:f.k},h(u.v,f))},ref:{t:gt(Vg),i:ae.MAX,l:u=>(l[u[1]]={B:u[2],F:u[4]},{}),h:Qr},refImage:{t:bt(Fg),i:ae.MAX,l:u=>({D:u[1]||void 0,P:u[2]}),h:(u,h,f)=>r("img",{key:f.k,alt:u.D,src:qt(l[u.P].B),title:l[u.P].F})},refLink:{t:gt(zg),i:ae.MAX,l:(u,h,f)=>({v:h(u[1],f),Z:h(u[0].replace(Ug,"\\$1"),f),P:u[2]}),h:(u,h,f)=>l[u.P]?r("a",{key:f.k,href:qt(l[u.P].B),title:l[u.P].F},h(u.v,f)):r("span",{key:f.k},h(u.Z,f))},table:{t:it(ml),i:ae.HIGH,l:hb,h:(u,h,f)=>r("table",{key:f.k},r("thead",null,r("tr",null,u.L.map(function(b,x){return r("th",{key:x,style:gs(u,x)},h(b,f))}))),r("tbody",null,u.A.map(function(b,x){return r("tr",{key:x},b.map(function(j,w){return r("td",{key:w,style:gs(u,w)},h(j,f))}))})))},tableSeparator:{t:function(u,h){return h.$?(h._=!0,qg.exec(u)):null},i:ae.HIGH,l:function(){return{type:"tableSeparator"}},h:()=>" | "},text:{t:yn(rb),i:ae.MIN,l:u=>({v:u[0].replace(_g,(h,f)=>t.namedCodesToUnicode[f]?t.namedCodesToUnicode[f]:h)}),h:u=>u.v},textBolded:{t:bt(Zg),i:ae.MED,l:(u,h,f)=>({v:h(u[2],f)}),h:(u,h,f)=>r("strong",{key:f.k},h(u.v,f))},textEmphasized:{t:bt(Qg),i:ae.LOW,l:(u,h,f)=>({v:h(u[2],f)}),h:(u,h,f)=>r("em",{key:f.k},h(u.v,f))},textEscaped:{t:bt(nb),i:ae.HIGH,l:u=>({v:u[1],type:"text"})},textMarked:{t:bt(eb),i:ae.LOW,l:Jr,h:(u,h,f)=>r("mark",{key:f.k},h(u.v,f))},textStrikethroughed:{t:bt(tb),i:ae.LOW,l:Jr,h:(u,h,f)=>r("del",{key:f.k},h(u.v,f))}};t.disableParsingRawHTML!==!0&&(c.htmlBlock={t:yn(bo),i:ae.HIGH,l(u,h,f){const[,b]=u[3].match(ab),x=new RegExp(`^${b}`,"gm"),j=u[3].replace(x,""),w=(k=j,db.some(I=>I.test(k))?vb:pr);var k;const y=u[1].toLowerCase(),S=yg.indexOf(y)!==-1;f.N=f.N||y==="a";const C=S?u[3]:w(h,j,f);return f.N=!1,{O:a(u[2]),v:C,G:S,H:S?y:u[1]}},h:(u,h,f)=>r(u.H,jt({key:f.k},u.O),u.G?u.v:h(u.v,f))},c.htmlSelfClosing={t:yn(vo),i:ae.HIGH,l:u=>({O:a(u[2]||""),H:u[1]}),h:(u,h,f)=>r(u.H,jt({},u.O,{key:f.k}))});const d=function(u){let h=Object.keys(u);function f(b,x){let j=[],w="";for(;b;){let k=0;for(;k<h.length;){const y=h[k],S=u[y],C=S.t(b,x,w);if(C){const I=C[0];b=b.substring(I.length);const D=S.l(C,f,x);D.type==null&&(D.type=y),j.push(D),w=I;break}k++}}return j}return h.sort(function(b,x){let j=u[b].i,w=u[x].i;return j!==w?j-w:b<x?-1:1}),function(b,x){return f(function(j){return j.replace(Og,`
`).replace(jg,"").replace(Gg,"    ")}(b),x)}}(c),m=(v=function(u){return function(h,f,b){return u[h.type].h(h,f,b)}}(c),function u(h,f={}){if(Array.isArray(h)){const b=f.k,x=[];let j=!1;for(let w=0;w<h.length;w++){f.k=w;const k=u(h[w],f),y=typeof k=="string";y&&j?x[x.length-1]+=k:k!==null&&x.push(k),j=y}return f.k=b,x}return v(h,u,f)});var v;const g=o(e);return s.length?r("div",null,g,r("footer",{key:"footer"},s.map(function(u){return r("div",{id:t.slugify(u.j),key:u.j},u.j,m(d(u.I,{_:!0})))}))):g}(function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"})(ae||(ae={}));const xb=e=>{let{children:t,options:n}=e,r=function(o,a){if(o==null)return{};var s,l,c={},d=Object.keys(o);for(l=0;l<d.length;l++)a.indexOf(s=d[l])>=0||(c[s]=o[s]);return c}(e,vg);return N.cloneElement(wb(t,n),r)};function kb({markdown:e}){return p.jsx("div",{className:"pr-prose",children:p.jsx(xb,{children:e})})}const Cl=T.forwardRef((e,t)=>p.jsxs(be,{ref:t,className:"pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600",...e,children:[p.jsx(oe.Filter,{size:16,className:"pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"}),"Filter",p.jsx(oe.ChevronDown,{size:16,className:"pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"})]}));var Sl=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(Sl||{});function Eb({groups:e}){return p.jsxs(wr,{children:[p.jsx(Eo,{asChild:!0,children:p.jsx(Cl,{})}),p.jsx(Ln,{children:e.map(t=>p.jsxs("div",{children:[p.jsx(an,{children:t.label}),p.jsx(Cs,{children:t.items.map(n=>p.jsx("div",{children:n.itemType===0?p.jsx(xr,{onClick:n.onClick,children:n.label}):p.jsx(No,{onClick:n.onClick,value:n.label,children:n.label})},n.label))}),p.jsx(Vn,{})]},t.label))})]})}const Tb=(e,t)=>{T.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},to=()=>!1,Nb=(e,t)=>{const[n]=yr(T.useCallback(async()=>{if(!e)return to;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),to,{preserveValue:!1});T.useEffect(()=>()=>{n!==to&&n()},[n])},Ol=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:V("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));Ol.displayName="Card";const Rl=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:V("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));Rl.displayName="CardHeader";const Pl=T.forwardRef(({className:e,...t},n)=>p.jsx("h3",{ref:n,className:V("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));Pl.displayName="CardTitle";const jl=T.forwardRef(({className:e,...t},n)=>p.jsx("p",{ref:n,className:V("pr-text-sm pr-text-muted-foreground",e),...t}));jl.displayName="CardDescription";const $l=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:V("pr-p-6 pr-pt-0",e),...t}));$l.displayName="CardContent";const _l=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:V("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));_l.displayName="CardFooter";const Cb=yo.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),Ml=T.forwardRef(({className:e,variant:t,...n},r)=>p.jsx("div",{ref:r,role:"alert",className:V(Cb({variant:t}),e),...n}));Ml.displayName="Alert";const Il=T.forwardRef(({className:e,...t},n)=>p.jsxs("h5",{ref:n,className:V("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));Il.displayName="AlertTitle";const Al=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:V("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));Al.displayName="AlertDescription";const Dl=T.forwardRef(({className:e,...t},n)=>p.jsxs(xn.Root,{ref:n,className:V("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[p.jsx(xn.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:p.jsx(xn.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),p.jsx(xn.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));Dl.displayName=xn.Root.displayName;const Bl=T.forwardRef(({className:e,...t},n)=>p.jsx(ro.Root,{className:V("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:n,children:p.jsx(ro.Thumb,{className:V("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));Bl.displayName=ro.Root.displayName;exports.Alert=Ml;exports.AlertDescription=Al;exports.AlertTitle=Il;exports.BookChapterControl=Mc;exports.Button=be;exports.Card=Ol;exports.CardContent=$l;exports.CardDescription=jl;exports.CardFooter=_l;exports.CardHeader=Rl;exports.CardTitle=Pl;exports.ChapterRangeSelector=qc;exports.CharacterInventory=fg;exports.Checkbox=Hs;exports.Checklist=Wc;exports.ComboBox=oo;exports.ContextMenu=Hh;exports.DataTable=As;exports.DisableButton=gg;exports.DropdownMenu=wr;exports.DropdownMenuCheckboxItem=xr;exports.DropdownMenuContent=Ln;exports.DropdownMenuGroup=Cs;exports.DropdownMenuItem=To;exports.DropdownMenuItemType=Sl;exports.DropdownMenuLabel=an;exports.DropdownMenuPortal=xc;exports.DropdownMenuRadioGroup=Ec;exports.DropdownMenuRadioItem=No;exports.DropdownMenuSeparator=Vn;exports.DropdownMenuShortcut=Rs;exports.DropdownMenuSub=kc;exports.DropdownMenuSubContent=Os;exports.DropdownMenuSubTrigger=Ss;exports.DropdownMenuTrigger=Eo;exports.EnableButton=hg;exports.FilterButton=Cl;exports.FilterDropdown=Eb;exports.GridMenu=Vi;exports.HamburgerMenuButton=Zi;exports.IconButton=Wh;exports.Input=Bn;exports.InstallButton=mg;exports.Label=Ko;exports.LabelPosition=Rt;exports.MarkdownRenderer=kb;exports.MenuItem=Xo;exports.ScriptureResultsViewer=eg;exports.SearchBar=ng;exports.Select=jn;exports.SelectContent=Kt;exports.SelectGroup=js;exports.SelectItem=Ye;exports.SelectLabel=$s;exports.SelectScrollDownButton=So;exports.SelectScrollUpButton=Co;exports.SelectSeparator=_s;exports.SelectTrigger=Yt;exports.SelectValue=$n;exports.ShadCnSlider=Dl;exports.ShadCnSwitch=Bl;exports.Slider=rg;exports.Snackbar=og;exports.Switch=ag;exports.Table=Fn;exports.TableBody=Un;exports.TableCaption=Is;exports.TableCell=Mt;exports.TableFooter=Ms;exports.TableHead=Jt;exports.TableHeader=zn;exports.TableRow=lt;exports.Tabs=ig;exports.TabsContent=rl;exports.TabsList=tl;exports.TabsTrigger=nl;exports.TextField=el;exports.Toolbar=sg;exports.UpdateButton=bg;exports.VerticalTabs=ol;exports.VerticalTabsContent=sl;exports.VerticalTabsList=al;exports.VerticalTabsTrigger=lg;exports.buttonVariants=Ps;exports.useEvent=Tb;exports.useEventAsync=Nb;exports.usePromise=yr;function Sb(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Sb(`.papi-slider {
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
.pr-text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
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
`,"top");
//# sourceMappingURL=index.cjs.map
