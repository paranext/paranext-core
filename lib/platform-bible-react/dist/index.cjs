"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=require("react/jsx-runtime"),N=require("react"),ne=require("lucide-react"),Ce=require("clsx"),Zl=require("tailwind-merge"),vs=require("@radix-ui/react-dropdown-menu"),Fe=require("platform-bible-utils"),Se=require("@tanstack/react-table"),Ql=require("@radix-ui/react-slot"),yo=require("class-variance-authority"),ec=require("@radix-ui/react-select"),Ee=require("@mui/material"),tc=require("@radix-ui/react-popover"),Ie=require("cmdk"),rc=require("@radix-ui/react-dialog"),ro=require("@mui/styled-engine"),yr=require("react-dom"),nc=require("@radix-ui/react-label"),oc=require("@radix-ui/react-tabs"),ac=require("@radix-ui/react-slider"),sc=require("@radix-ui/react-switch");function rt(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const r in e)if(r!=="default"){const n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:()=>e[r]})}}return t.default=e,Object.freeze(t)}const T=rt(N),he=rt(vs),we=rt(ec),jr=rt(tc),Qe=rt(rc),ic=rt(yr),ys=rt(nc),De=rt(oc),wr=rt(ac),no=rt(sc);const lc=Zl.extendTailwindMerge({prefix:"pr-"});function F(...e){return lc(Ce.clsx(e))}const Ar=N.forwardRef(({className:e,type:t,...r},n)=>l.jsx("input",{type:t,className:F("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:n,...r}));Ar.displayName="Input";const cc=N.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:r,handleSubmit:n,...o},a)=>l.jsxs("div",{className:"pr-relative",children:[l.jsx(Ar,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&n(),t(s)},onClick:r,ref:a}),l.jsx(ne.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));var pc=Object.defineProperty,dc=(e,t,r)=>t in e?pc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,oe=(e,t,r)=>dc(e,typeof t!="symbol"?t+"":t,r);const _t=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],wo=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ws=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],fa=xc();function or(e,t=!0){return t&&(e=e.toUpperCase()),e in fa?fa[e]:0}function xo(e){return or(e)>0}function uc(e){const t=typeof e=="string"?or(e):e;return t>=40&&t<=66}function fc(e){return(typeof e=="string"?or(e):e)<=39}function xs(e){return e<=66}function mc(e){const t=typeof e=="string"?or(e):e;return Ns(t)&&!xs(t)}function*hc(){for(let e=1;e<=_t.length;e++)yield e}const gc=1,ks=_t.length;function bc(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function ko(e,t="***"){const r=e-1;return r<0||r>=_t.length?t:_t[r]}function Es(e){return e<=0||e>ks?"******":ws[e-1]}function vc(e){return Es(or(e))}function Ns(e){const t=typeof e=="number"?ko(e):e;return xo(t)&&!wo.includes(t)}function yc(e){const t=typeof e=="number"?ko(e):e;return xo(t)&&wo.includes(t)}function wc(e){return ws[e-1].includes("*obsolete*")}function xc(){const e={};for(let t=0;t<_t.length;t++)e[_t[t]]=t+1;return e}const fe={allBookIds:_t,nonCanonicalIds:wo,bookIdToNumber:or,isBookIdValid:xo,isBookNT:uc,isBookOT:fc,isBookOTNT:xs,isBookDC:mc,allBookNumbers:hc,firstBook:gc,lastBook:ks,extraBooks:bc,bookNumberToId:ko,bookNumberToEnglishName:Es,bookIdToEnglishName:vc,isCanonical:Ns,isExtraMaterial:yc,isObsolete:wc};var Je=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Je||{});const Le=class{constructor(t){if(oe(this,"name"),oe(this,"fullPath"),oe(this,"isPresent"),oe(this,"hasVerseSegments"),oe(this,"isCustomized"),oe(this,"baseVersification"),oe(this,"scriptureBooks"),oe(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Je[t]):(this._type=t,this.name=Je[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};oe(Le,"Original",new Le(Je.Original)),oe(Le,"Septuagint",new Le(Je.Septuagint)),oe(Le,"Vulgate",new Le(Je.Vulgate)),oe(Le,"English",new Le(Je.English)),oe(Le,"RussianProtestant",new Le(Je.RussianProtestant)),oe(Le,"RussianOrthodox",new Le(Je.RussianOrthodox));let Tt=Le;function ma(e,t){const r=t[0];for(let n=1;n<t.length;n++)e=e.split(t[n]).join(r);return e.split(r)}var Ts=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Ts||{});const $e=class le{constructor(t,r,n,o){if(oe(this,"firstChapter"),oe(this,"lastChapter"),oe(this,"lastVerse"),oe(this,"hasSegmentsDefined"),oe(this,"text"),oe(this,"BBBCCCVVVS"),oe(this,"longHashCode"),oe(this,"versification"),oe(this,"rtlMark","‏"),oe(this,"_bookNum",0),oe(this,"_chapterNum",0),oe(this,"_verseNum",0),oe(this,"_verse"),n==null&&o==null)if(t!=null&&typeof t=="string"){const a=t,s=r!=null&&r instanceof Tt?r:void 0;this.setEmpty(s),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=r!=null&&r instanceof Tt?r:void 0;this.setEmpty(a),this._verseNum=t%le.chapterDigitShifter,this._chapterNum=Math.floor(t%le.bookDigitShifter/le.chapterDigitShifter),this._bookNum=Math.floor(t/le.bookDigitShifter)}else if(r==null)if(t!=null&&t instanceof le){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof Tt?t:le.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&r!=null&&n!=null)if(typeof t=="string"&&typeof r=="string"&&typeof n=="string")this.setEmpty(o),this.updateInternal(t,r,n);else if(typeof t=="number"&&typeof r=="number"&&typeof n=="number")this._bookNum=t,this._chapterNum=r,this._verseNum=n,this.versification=o??le.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let r;try{return r=new le(t),{success:!0,verseRef:r}}catch(n){if(n instanceof ur)return r=new le,{success:!1,verseRef:r};throw n}}static getBBBCCCVVV(t,r,n){return t%le.bcvMaxValue*le.bookDigitShifter+(r>=0?r%le.bcvMaxValue*le.chapterDigitShifter:0)+(n>=0?n%le.bcvMaxValue:0)}static fromJSON(t){const{book:r,chapterNum:n,verseNum:o,verse:a,versificationStr:s}=t,c=a||o.toString();let p;return s&&(p=new Tt(s)),r?new le(r,n.toString(),c,p):new le}static tryGetVerseNum(t){let r;if(!t)return r=-1,{success:!0,vNum:r};r=0;let n;for(let o=0;o<t.length;o++){if(n=t[o],n<"0"||n>"9")return o===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +n-0,r>le.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(le.verseRangeSeparator)||this._verse.includes(le.verseSequenceIndicator))}get book(){return fe.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=fe.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const r=+t;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:r,vNum:n}=le.tryGetVerseNum(t);this._verse=r?void 0:t.replace(this.rtlMark,""),this._verseNum=n,!(this._verseNum>=0)&&({vNum:this._verseNum}=le.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>fe.lastBook)throw new ur("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Tt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(le.verseRangeSeparators,le.verseSequenceIndicators)}get BBBCCC(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const s=+a[1].trim();this.versification=new Tt(Je[s])}catch{throw new ur("Invalid reference : "+t)}}const r=t.trim().split(" ");if(r.length!==2)throw new ur("Invalid reference : "+t);const n=r[1].split(":"),o=+n[0];if(n.length!==2||fe.bookIdToNumber(r[0])===0||!Number.isInteger(o)||o<0||!le.isVerseParseable(n[1]))throw new ur("Invalid reference : "+t);this.updateInternal(r[0],n[0],n[1])}simplify(){this._verse=void 0}clone(){return new le(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete r.verse,r}equals(t){return t instanceof le?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,r=le.verseRangeSeparators,n=le.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=ma(this._verse,n);for(const s of a.map(c=>ma(c,r))){const c=this.clone();c.verse=s[0];const p=c.verseNum;if(o.push(c),s.length>1){const u=this.clone();if(u.verse=s[1],!t)for(let m=p+1;m<u.verseNum;m++){const v=new le(this._bookNum,this._chapterNum,m,this.versification);this.isExcluded||o.push(v)}o.push(u)}}return o}validateVerse(t,r){if(!this.verse)return this.internalValid;let n=0;for(const o of this.allVerses(!0,t,r)){const a=o.internalValid;if(a!==0)return a;const s=o.BBBCCCVVV;if(n>s)return 3;if(n===s)return 4;n=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>fe.lastBook?2:(fe.isCanonical(this._bookNum),0)}setEmpty(t=le.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,r,n){this.bookNum=fe.bookIdToNumber(t),this.chapter=r,this.verse=n}};oe($e,"defaultVersification",Tt.English),oe($e,"verseRangeSeparator","-"),oe($e,"verseSequenceIndicator",","),oe($e,"verseRangeSeparators",[$e.verseRangeSeparator]),oe($e,"verseSequenceIndicators",[$e.verseSequenceIndicator]),oe($e,"chapterDigitShifter",1e3),oe($e,"bookDigitShifter",$e.chapterDigitShifter*$e.chapterDigitShifter),oe($e,"bcvMaxValue",$e.chapterDigitShifter-1),oe($e,"ValidStatusType",Ts);let ur=class extends Error{};const wn=he.Root,Eo=he.Trigger,Cs=he.Group,kc=he.Portal,Ec=he.Sub,Nc=he.RadioGroup,Ss=N.forwardRef(({className:e,inset:t,children:r,...n},o)=>l.jsxs(he.SubTrigger,{ref:o,className:F("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...n,children:[r,l.jsx(ne.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Ss.displayName=he.SubTrigger.displayName;const Os=N.forwardRef(({className:e,...t},r)=>l.jsx(he.SubContent,{ref:r,className:F("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));Os.displayName=he.SubContent.displayName;const Br=N.forwardRef(({className:e,sideOffset:t=4,...r},n)=>l.jsx(he.Portal,{children:l.jsx(he.Content,{ref:n,sideOffset:t,className:F("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r})}));Br.displayName=he.Content.displayName;const No=N.forwardRef(({className:e,inset:t,...r},n)=>l.jsx(he.Item,{ref:n,className:F("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...r}));No.displayName=he.Item.displayName;const xn=N.forwardRef(({className:e,children:t,checked:r,...n},o)=>l.jsxs(he.CheckboxItem,{ref:o,className:F("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:r,...n,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(he.ItemIndicator,{children:l.jsx(ne.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));xn.displayName=he.CheckboxItem.displayName;const To=N.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(he.RadioItem,{ref:n,className:F("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...r,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(he.ItemIndicator,{children:l.jsx(ne.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));To.displayName=he.RadioItem.displayName;const ar=N.forwardRef(({className:e,inset:t,...r},n)=>l.jsx(he.Label,{ref:n,className:F("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...r}));ar.displayName=he.Label.displayName;const Lr=N.forwardRef(({className:e,...t},r)=>l.jsx(he.Separator,{ref:r,className:F("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Lr.displayName=he.Separator.displayName;function js({className:e,...t}){return l.jsx("span",{className:F("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}js.displayName="DropdownMenuShortcut";const Tc=N.forwardRef(({bookId:e,handleSelectBook:t,isSelected:r,handleHighlightBook:n,handleKeyDown:o,bookType:a,children:s},c)=>l.jsxs(No,{ref:c,textValue:e,className:F("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":r}),onSelect:p=>{p.preventDefault(),t()},onKeyDown:p=>{o(p)},onFocus:n,onMouseMove:n,children:[l.jsx("span",{className:F("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":r,"pr-border-l-red-200":a.toLowerCase()==="ot","pr-border-l-purple-200":a.toLowerCase()==="nt","pr-border-l-indigo-200":a.toLowerCase()==="dc"}),children:fe.bookIdToEnglishName(e)}),r&&l.jsx("div",{children:s})]},e));function Cc({handleSelectChapter:e,endChapter:t,activeChapter:r,highlightedChapter:n,handleHighlightedChapter:o}){const a=Array.from({length:t},(c,p)=>p+1),s=N.useCallback(c=>{o(c)},[o]);return l.jsx("div",{className:F("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:a.map(c=>l.jsx("div",{className:F("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":c===r,"pr-bg-amber-200":c===n}),onClick:p=>{p.preventDefault(),p.stopPropagation(),e(c)},role:"button",onKeyDown:p=>{p.key==="Enter"&&e(c)},tabIndex:0,onMouseMove:()=>s(c),children:c},c))})}function Sc({handleSort:e,handleLocationHistory:t,handleBookmarks:r}){return l.jsxs(ar,{className:"pr-flex pr-justify-between",children:[l.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),l.jsxs("div",{className:"pr-flex pr-items-center",children:[l.jsx(ne.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),l.jsx(ne.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),l.jsx(ne.Bookmark,{onClick:r,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const Nr=fe.allBookIds,Oc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ha=["OT","NT","DC"],jc=32+32+32,Rc=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Pc=e=>({OT:Nr.filter(r=>fe.isBookOT(r)),NT:Nr.filter(r=>fe.isBookNT(r)),DC:Nr.filter(r=>fe.isBookDC(r))})[e],fr=e=>Fe.getChaptersForBook(fe.bookIdToNumber(e));function $c(){return Nr.map(t=>fe.bookIdToEnglishName(t))}function _c(e){return $c().includes(e)}function Mc(e){const t=e.toLowerCase().replace(/^\w/,r=>r.toUpperCase());if(_c(t))return Nr.find(n=>fe.bookIdToEnglishName(n)===t)}function Ic({scrRef:e,handleSubmit:t}){const[r,n]=N.useState(""),[o,a]=N.useState(fe.bookNumberToId(e.bookNum)),[s,c]=N.useState(e.chapterNum??0),[p,u]=N.useState(fe.bookNumberToId(e.bookNum)),[m,v]=N.useState(!1),[g,d]=N.useState(m),h=N.useRef(void 0),f=N.useRef(void 0),b=N.useRef(void 0),x=N.useCallback(E=>Pc(E).filter(O=>{const $=fe.bookIdToEnglishName(O).toLowerCase(),V=r.replace(/[^a-zA-Z]/g,"").toLowerCase();return $.includes(V)||O.toLowerCase().includes(V)}),[r]),P=E=>{n(E)},w=N.useRef(!1),k=N.useCallback(E=>{if(w.current){w.current=!1;return}v(E)},[]),y=N.useCallback((E,O,$,V)=>{if(c(fe.bookNumberToId(e.bookNum)!==E?1:e.chapterNum),O||fr(E)===-1){t({bookNum:fe.bookIdToNumber(E),chapterNum:$||1,verseNum:V||1}),v(!1),n("");return}a(o!==E?E:""),v(!O)},[t,e.bookNum,e.chapterNum,o]),S=E=>{E<=0||E>fr(o)||y(o,!0,E)},C=N.useCallback(()=>{Rc.forEach(E=>{const O=r.match(E);if(O){const[$,V=void 0,H=void 0]=O.slice(1),_=Mc($);(fe.isBookIdValid($)||_)&&y(_??$,!0,V?parseInt(V,10):1,H?parseInt(H,10):1)}})},[y,r]),I=N.useCallback(E=>{m?(E.key==="ArrowDown"||E.key==="ArrowUp")&&(typeof b<"u"&&b.current!==null?b.current.focus():typeof f<"u"&&f.current!==null&&f.current.focus(),E.preventDefault()):v(!0)},[m]),A=E=>{const{key:O}=E;O==="ArrowRight"||O==="ArrowLeft"||O==="ArrowDown"||O==="ArrowUp"||O==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:O})),h.current.focus())},L=E=>{const{key:O}=E;if(p===o){if(O==="Enter"){E.preventDefault(),y(o,!0,s);return}let $=0;if(O==="ArrowRight")if(s<fr(p))$=1;else{E.preventDefault();return}else if(O==="ArrowLeft")if(s>1)$=-1;else{E.preventDefault();return}else O==="ArrowDown"?$=6:O==="ArrowUp"&&($=-6);s+$<=0||s+$>fr(p)?c(0):$!==0&&(c(s+$),E.preventDefault())}};return N.useEffect(()=>{o===p?o===fe.bookNumberToId(e.bookNum)?c(e.chapterNum):c(1):c(0)},[p,e.bookNum,e.chapterNum,o]),N.useLayoutEffect(()=>{d(m)},[m]),N.useLayoutEffect(()=>{const E=setTimeout(()=>{if(g&&f.current&&b.current){const $=b.current.offsetTop-jc;f.current.scrollTo({top:$,behavior:"instant"})}},10);return()=>{clearTimeout(E)}},[g]),l.jsx("div",{className:"pr-flex",children:l.jsxs(wn,{modal:!1,open:m,onOpenChange:k,children:[l.jsx(Eo,{asChild:!0,children:l.jsx(cc,{ref:h,value:r,handleSearch:P,handleKeyDown:I,handleOnClick:()=>{a(fe.bookNumberToId(e.bookNum)),u(fe.bookNumberToId(e.bookNum)),c(e.chapterNum>0?e.chapterNum:0),v(!0),h.current.focus()},onFocus:()=>{w.current=!0},handleSubmit:C,placeholder:`${fe.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),l.jsxs(Br,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:A,align:"start",ref:f,children:[l.jsx(Sc,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),ha.map((E,O)=>x(E).length>0&&l.jsxs("div",{children:[l.jsx(ar,{className:"pr-font-semibold pr-text-slate-700",children:Oc[E]}),x(E).map($=>l.jsx("div",{children:l.jsx(Tc,{bookId:$,handleSelectBook:()=>y($,!1),isSelected:o===$,handleHighlightBook:()=>u($),handleKeyDown:L,bookType:E,ref:V=>{o===$&&(b.current=V)},children:l.jsx(Cc,{handleSelectChapter:S,endChapter:fr($),activeChapter:e.bookNum===fe.bookIdToNumber($)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:V=>{c(V)}})})},$)),ha.length-1!==O?l.jsx(Lr,{}):void 0]},E))]})]})})}const Rs=yo.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),be=N.forwardRef(({className:e,variant:t,size:r,asChild:n=!1,...o},a)=>{const s=n?Ql.Slot:"button";return l.jsx(s,{className:F(Rs({variant:t,size:r,className:e})),ref:a,...o})});be.displayName="Button";function Dc({table:e}){return l.jsxs(wn,{children:[l.jsx(vs.DropdownMenuTrigger,{asChild:!0,children:l.jsxs(be,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[l.jsx(ne.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),l.jsxs(Br,{align:"end",className:"pr-w-[150px]",children:[l.jsx(ar,{children:"Toggle columns"}),l.jsx(Lr,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>l.jsx(xn,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:r=>t.toggleVisibility(!!r),children:t.id},t.id))]})]})}const Rr=we.Root,Ps=we.Group,Pr=we.Value,Yt=N.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(we.Trigger,{ref:n,className:F("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...r,children:[t,l.jsx(we.Icon,{asChild:!0,children:l.jsx(ne.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));Yt.displayName=we.Trigger.displayName;const Co=N.forwardRef(({className:e,...t},r)=>l.jsx(we.ScrollUpButton,{ref:r,className:F("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:l.jsx(ne.ChevronUp,{className:"pr-h-4 pr-w-4"})}));Co.displayName=we.ScrollUpButton.displayName;const So=N.forwardRef(({className:e,...t},r)=>l.jsx(we.ScrollDownButton,{ref:r,className:F("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:l.jsx(ne.ChevronDown,{className:"pr-h-4 pr-w-4"})}));So.displayName=we.ScrollDownButton.displayName;const Kt=N.forwardRef(({className:e,children:t,position:r="popper",...n},o)=>l.jsx(we.Portal,{children:l.jsxs(we.Content,{ref:o,className:F("pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:r,...n,children:[l.jsx(Co,{}),l.jsx(we.Viewport,{className:F("pr-p-1",r==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),l.jsx(So,{})]})}));Kt.displayName=we.Content.displayName;const $s=N.forwardRef(({className:e,...t},r)=>l.jsx(we.Label,{ref:r,className:F("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));$s.displayName=we.Label.displayName;const Ke=N.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(we.Item,{ref:n,className:F("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...r,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(we.ItemIndicator,{children:l.jsx(ne.Check,{className:"pr-h-4 pr-w-4"})})}),l.jsx(we.ItemText,{children:t})]}));Ke.displayName=we.Item.displayName;const _s=N.forwardRef(({className:e,...t},r)=>l.jsx(we.Separator,{ref:r,className:F("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));_s.displayName=we.Separator.displayName;function Ac({table:e}){return l.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[l.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[l.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),l.jsxs(Rr,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[l.jsx(Yt,{className:"pr-h-8 pr-w-[70px]",children:l.jsx(Pr,{placeholder:e.getState().pagination.pageSize})}),l.jsx(Kt,{side:"top",children:[10,20,30,40,50].map(t=>l.jsx(Ke,{value:`${t}`,children:t},t))})]})]}),l.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[l.jsxs(be,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),l.jsx(ne.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(be,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),l.jsx(ne.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(be,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),l.jsx(ne.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(be,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),l.jsx(ne.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}const Fr=N.forwardRef(({className:e,...t},r)=>l.jsx("div",{className:"pr-relative pr-w-full pr-overflow-auto",children:l.jsx("table",{ref:r,className:F("pr-w-full pr-caption-bottom pr-text-sm",e),...t})}));Fr.displayName="Table";const Vr=N.forwardRef(({className:e,...t},r)=>l.jsx("thead",{ref:r,className:F("[&_tr]:pr-border-b",e),...t}));Vr.displayName="TableHeader";const zr=N.forwardRef(({className:e,...t},r)=>l.jsx("tbody",{ref:r,className:F("[&_tr:last-child]:pr-border-0",e),...t}));zr.displayName="TableBody";const Ms=N.forwardRef(({className:e,...t},r)=>l.jsx("tfoot",{ref:r,className:F("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));Ms.displayName="TableFooter";const lt=N.forwardRef(({className:e,...t},r)=>l.jsx("tr",{ref:r,className:F("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));lt.displayName="TableRow";const Jt=N.forwardRef(({className:e,...t},r)=>l.jsx("th",{ref:r,className:F("pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",e),...t}));Jt.displayName="TableHead";const Mt=N.forwardRef(({className:e,...t},r)=>l.jsx("td",{ref:r,className:F("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0",e),...t}));Mt.displayName="TableCell";const Is=N.forwardRef(({className:e,...t},r)=>l.jsx("caption",{ref:r,className:F("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));Is.displayName="TableCaption";function Ds({columns:e,data:t,enablePagination:r=!1,showPaginationControls:n=!1,showColumnVisibilityControls:o=!1,onRowClickHandler:a=()=>{}}){var f;const[s,c]=N.useState([]),[p,u]=N.useState([]),[m,v]=N.useState({}),[g,d]=N.useState({}),h=Se.useReactTable({data:t,columns:e,getCoreRowModel:Se.getCoreRowModel(),...r&&{getPaginationRowModel:Se.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:Se.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:Se.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:d,state:{sorting:s,columnFilters:p,columnVisibility:m,rowSelection:g}});return l.jsxs("div",{children:[o&&l.jsx(Dc,{table:h}),l.jsx("div",{className:"pr-twp pr-font-sans",children:l.jsxs(Fr,{children:[l.jsx(Vr,{children:h.getHeaderGroups().map(b=>l.jsx(lt,{children:b.headers.map(x=>l.jsx(Jt,{children:x.isPlaceholder?void 0:Se.flexRender(x.column.columnDef.header,x.getContext())},x.id))},b.id))}),l.jsx(zr,{children:(f=h.getRowModel().rows)!=null&&f.length?h.getRowModel().rows.map(b=>l.jsx(lt,{onClick:()=>a(b,h),"data-state":b.getIsSelected()&&"selected",children:b.getVisibleCells().map(x=>l.jsx(Mt,{children:Se.flexRender(x.column.columnDef.cell,x.getContext())},x.id))},b.id)):l.jsx(lt,{children:l.jsx(Mt,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]})}),r&&l.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[l.jsx(be,{variant:"outline",size:"sm",onClick:()=>h.previousPage(),disabled:!h.getCanPreviousPage(),children:"Previous"}),l.jsx(be,{variant:"outline",size:"sm",onClick:()=>h.nextPage(),disabled:!h.getCanNextPage(),children:"Next"})]}),r&&n&&l.jsx(Ac,{table:h})]})}const Bc=jr.Root,Lc=jr.Trigger,As=N.forwardRef(({className:e,align:t="center",sideOffset:r=4,...n},o)=>l.jsx(jr.Portal,{children:l.jsx(jr.Content,{ref:o,align:t,sideOffset:r,className:F("pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));As.displayName=jr.Content.displayName;const Fc=Qe.Portal,Bs=N.forwardRef(({className:e,...t},r)=>l.jsx(Qe.Overlay,{ref:r,className:F("pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",e),...t}));Bs.displayName=Qe.Overlay.displayName;const Vc=N.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(Fc,{children:[l.jsx(Bs,{}),l.jsxs(Qe.Content,{ref:n,className:F("pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",e),...r,children:[t,l.jsxs(Qe.Close,{className:"pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground",children:[l.jsx(ne.X,{className:"pr-h-4 pr-w-4"}),l.jsx("span",{className:"pr-sr-only",children:"Close"})]})]})]}));Vc.displayName=Qe.Content.displayName;const zc=N.forwardRef(({className:e,...t},r)=>l.jsx(Qe.Title,{ref:r,className:F("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight",e),...t}));zc.displayName=Qe.Title.displayName;const Uc=N.forwardRef(({className:e,...t},r)=>l.jsx(Qe.Description,{ref:r,className:F("pr-text-sm pr-text-muted-foreground",e),...t}));Uc.displayName=Qe.Description.displayName;const Ls=N.forwardRef(({className:e,...t},r)=>l.jsx(Ie.Command,{ref:r,className:F("pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",e),...t}));Ls.displayName=Ie.Command.displayName;const Fs=N.forwardRef(({className:e,...t},r)=>l.jsxs("div",{className:"pr-flex pr-items-center pr-border-b pr-px-3",children:[l.jsx(ne.Search,{className:"pr-mr-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"}),l.jsx(Ie.Command.Input,{ref:r,className:F("pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...t})]}));Fs.displayName=Ie.Command.Input.displayName;const Vs=N.forwardRef(({className:e,...t},r)=>l.jsx(Ie.Command.List,{ref:r,className:F("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden",e),...t}));Vs.displayName=Ie.Command.List.displayName;const zs=N.forwardRef((e,t)=>l.jsx(Ie.Command.Empty,{ref:t,className:"pr-py-6 pr-text-center pr-text-sm",...e}));zs.displayName=Ie.Command.Empty.displayName;const Hc=N.forwardRef(({className:e,...t},r)=>l.jsx(Ie.Command.Group,{ref:r,className:F("pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",e),...t}));Hc.displayName=Ie.Command.Group.displayName;const Gc=N.forwardRef(({className:e,...t},r)=>l.jsx(Ie.Command.Separator,{ref:r,className:F("pr--mx-1 pr-h-px pr-bg-border",e),...t}));Gc.displayName=Ie.Command.Separator.displayName;const Us=N.forwardRef(({className:e,...t},r)=>l.jsx(Ie.Command.Item,{ref:r,className:F("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",e),...t}));Us.displayName=Ie.Command.Item.displayName;function qc(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function oo({id:e,options:t=[],className:r,value:n,onChange:o=()=>{},getOptionLabel:a=qc,buttonPlaceholder:s="",textPlaceholder:c="",commandEmptyMessage:p="No option found",buttonVariant:u="outline"}){const[m,v]=N.useState(!1);return l.jsxs(Bc,{open:m,onOpenChange:v,children:[l.jsx(Lc,{asChild:!0,children:l.jsxs(be,{variant:u,role:"combobox","aria-expanded":m,id:e,className:F("pr-w-[200px] pr-justify-between",r),children:[n?a(n):s,l.jsx(ne.ChevronsUpDown,{className:"pr-ml-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"})]})}),l.jsx(As,{className:"pr-w-[200px] pr-p-0",children:l.jsxs(Ls,{children:[l.jsx(Fs,{placeholder:c,className:"pr-text-inherit"}),l.jsx(zs,{children:p}),l.jsx(Vs,{children:t.map(g=>l.jsxs(Us,{value:a(g),onSelect:()=>{o(g),v(!1)},children:[l.jsx(ne.Check,{className:F("pr-mr-2 pr-h-4 pr-w-4",{"pr-opacity-0":!n||a(n)!==a(g)})}),a(g)]},a(g)))})]})})]})}function Wc({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:r=!1,chapterCount:n}){const[o,a]=N.useState(1),[s,c]=N.useState(n),[p,u]=N.useState(Array.from({length:n},(g,d)=>d+1));N.useEffect(()=>{a(1),e(1),c(n),t(n),u(Array.from({length:n},(g,d)=>d+1))},[n,t,e]);const m=g=>{a(g),e(g),g>s&&(c(g),t(g))},v=g=>{c(g),t(g),g<o&&(a(g),e(g))};return l.jsxs(l.Fragment,{children:[l.jsx(Ee.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:r,control:l.jsx(oo,{onChange:m,className:"book-selection-chapter",options:p,getOptionLabel:g=>g.toString(),value:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),l.jsx(Ee.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:r,control:l.jsx(oo,{onChange:v,className:"book-selection-chapter",options:p,getOptionLabel:g=>g.toString(),value:s},"end chapter"),label:"to",labelPlacement:"start"})]})}var jt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(jt||{});function Hs({id:e,isChecked:t,labelText:r="",labelPosition:n=jt.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:s=!1,hasError:c=!1,className:p,onChange:u}){const m=l.jsx(Ee.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:a,disabled:s,className:`papi-checkbox ${c?"error":""} ${p??""}`,onChange:u});let v;if(r){const g=n===jt.Before||n===jt.Above,d=l.jsx("span",{className:`papi-checkbox-label ${c?"error":""} ${p??""}`,children:r}),h=n===jt.Before||n===jt.After,f=h?d:l.jsx("div",{children:d}),b=h?m:l.jsx("div",{children:m});v=l.jsxs(Ee.FormLabel,{className:`papi-checkbox ${n.toString()}`,disabled:s,error:c,children:[g&&f,b,!g&&f]})}else v=m;return v}function Xc({id:e,className:t,legend:r,listItems:n,selectedListItems:o,handleSelectListItem:a,createLabel:s}){return l.jsxs("fieldset",{id:e,className:t,children:[r&&l.jsx("legend",{children:r}),n.map(c=>l.jsx(Hs,{className:"check-item",isChecked:o.includes(c),labelText:s?s(c):c,onChange:()=>a(c)},c))]})}function Yc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Kc(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var r=function n(){return this instanceof n?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};r.prototype=t.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(e).forEach(function(n){var o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(r,n,o.get?o:{enumerable:!0,get:function(){return e[n]}})}),r}var Oo={},Gs={exports:{}};(function(e){function t(r){return r&&r.__esModule?r:{default:r}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Gs);var Jc=Gs.exports,Ln={};function sr(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...n){return e(...n)||t(...n)}}function R(){return R=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},R.apply(this,arguments)}function Rt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function qs(e){if(!Rt(e))return e;const t={};return Object.keys(e).forEach(r=>{t[r]=qs(e[r])}),t}function ct(e,t,r={clone:!0}){const n=r.clone?R({},e):e;return Rt(e)&&Rt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Rt(t[o])&&o in e&&Rt(e[o])?n[o]=ct(e[o],t[o],r):r.clone?n[o]=Rt(t[o])?qs(t[o]):t[o]:n[o]=t[o])}),n}var ao={exports:{}},Qr={exports:{}},ce={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ga;function Zc(){if(ga)return ce;ga=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,P=e?Symbol.for("react.scope"):60119;function w(y){if(typeof y=="object"&&y!==null){var S=y.$$typeof;switch(S){case t:switch(y=y.type,y){case p:case u:case n:case a:case o:case v:return y;default:switch(y=y&&y.$$typeof,y){case c:case m:case h:case d:case s:return y;default:return S}}case r:return S}}}function k(y){return w(y)===u}return ce.AsyncMode=p,ce.ConcurrentMode=u,ce.ContextConsumer=c,ce.ContextProvider=s,ce.Element=t,ce.ForwardRef=m,ce.Fragment=n,ce.Lazy=h,ce.Memo=d,ce.Portal=r,ce.Profiler=a,ce.StrictMode=o,ce.Suspense=v,ce.isAsyncMode=function(y){return k(y)||w(y)===p},ce.isConcurrentMode=k,ce.isContextConsumer=function(y){return w(y)===c},ce.isContextProvider=function(y){return w(y)===s},ce.isElement=function(y){return typeof y=="object"&&y!==null&&y.$$typeof===t},ce.isForwardRef=function(y){return w(y)===m},ce.isFragment=function(y){return w(y)===n},ce.isLazy=function(y){return w(y)===h},ce.isMemo=function(y){return w(y)===d},ce.isPortal=function(y){return w(y)===r},ce.isProfiler=function(y){return w(y)===a},ce.isStrictMode=function(y){return w(y)===o},ce.isSuspense=function(y){return w(y)===v},ce.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===n||y===u||y===a||y===o||y===v||y===g||typeof y=="object"&&y!==null&&(y.$$typeof===h||y.$$typeof===d||y.$$typeof===s||y.$$typeof===c||y.$$typeof===m||y.$$typeof===b||y.$$typeof===x||y.$$typeof===P||y.$$typeof===f)},ce.typeOf=w,ce}var pe={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ba;function Qc(){return ba||(ba=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,P=e?Symbol.for("react.scope"):60119;function w(B){return typeof B=="string"||typeof B=="function"||B===n||B===u||B===a||B===o||B===v||B===g||typeof B=="object"&&B!==null&&(B.$$typeof===h||B.$$typeof===d||B.$$typeof===s||B.$$typeof===c||B.$$typeof===m||B.$$typeof===b||B.$$typeof===x||B.$$typeof===P||B.$$typeof===f)}function k(B){if(typeof B=="object"&&B!==null){var te=B.$$typeof;switch(te){case t:var D=B.type;switch(D){case p:case u:case n:case a:case o:case v:return D;default:var ie=D&&D.$$typeof;switch(ie){case c:case m:case h:case d:case s:return ie;default:return te}}case r:return te}}}var y=p,S=u,C=c,I=s,A=t,L=m,E=n,O=h,$=d,V=r,H=a,_=o,z=v,ee=!1;function Z(B){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),j(B)||k(B)===p}function j(B){return k(B)===u}function M(B){return k(B)===c}function U(B){return k(B)===s}function X(B){return typeof B=="object"&&B!==null&&B.$$typeof===t}function G(B){return k(B)===m}function q(B){return k(B)===n}function Y(B){return k(B)===h}function K(B){return k(B)===d}function W(B){return k(B)===r}function J(B){return k(B)===a}function Q(B){return k(B)===o}function se(B){return k(B)===v}pe.AsyncMode=y,pe.ConcurrentMode=S,pe.ContextConsumer=C,pe.ContextProvider=I,pe.Element=A,pe.ForwardRef=L,pe.Fragment=E,pe.Lazy=O,pe.Memo=$,pe.Portal=V,pe.Profiler=H,pe.StrictMode=_,pe.Suspense=z,pe.isAsyncMode=Z,pe.isConcurrentMode=j,pe.isContextConsumer=M,pe.isContextProvider=U,pe.isElement=X,pe.isForwardRef=G,pe.isFragment=q,pe.isLazy=Y,pe.isMemo=K,pe.isPortal=W,pe.isProfiler=J,pe.isStrictMode=Q,pe.isSuspense=se,pe.isValidElementType=w,pe.typeOf=k}()),pe}var va;function Ws(){return va||(va=1,process.env.NODE_ENV==="production"?Qr.exports=Zc():Qr.exports=Qc()),Qr.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Fn,ya;function ep(){if(ya)return Fn;ya=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function n(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var s={},c=0;c<10;c++)s["_"+String.fromCharCode(c)]=c;var p=Object.getOwnPropertyNames(s).map(function(m){return s[m]});if(p.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(m){u[m]=m}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Fn=o()?Object.assign:function(a,s){for(var c,p=n(a),u,m=1;m<arguments.length;m++){c=Object(arguments[m]);for(var v in c)t.call(c,v)&&(p[v]=c[v]);if(e){u=e(c);for(var g=0;g<u.length;g++)r.call(c,u[g])&&(p[u[g]]=c[u[g]])}}return p},Fn}var Vn,wa;function jo(){if(wa)return Vn;wa=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Vn=e,Vn}var zn,xa;function Xs(){return xa||(xa=1,zn=Function.call.bind(Object.prototype.hasOwnProperty)),zn}var Un,ka;function tp(){if(ka)return Un;ka=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=jo(),r={},n=Xs();e=function(a){var s="Warning: "+a;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(a,s,c,p,u){if(process.env.NODE_ENV!=="production"){for(var m in a)if(n(a,m)){var v;try{if(typeof a[m]!="function"){var g=Error((p||"React class")+": "+c+" type `"+m+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[m]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw g.name="Invariant Violation",g}v=a[m](s,m,p,c,null,t)}catch(h){v=h}if(v&&!(v instanceof Error)&&e((p||"React class")+": type specification of "+c+" `"+m+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof v+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),v instanceof Error&&!(v.message in r)){r[v.message]=!0;var d=u?u():"";e("Failed "+c+" type: "+v.message+(d??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(r={})},Un=o,Un}var Hn,Ea;function rp(){if(Ea)return Hn;Ea=1;var e=Ws(),t=ep(),r=jo(),n=Xs(),o=tp(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(c){var p="Warning: "+c;typeof console<"u"&&console.error(p);try{throw new Error(p)}catch{}});function s(){return null}return Hn=function(c,p){var u=typeof Symbol=="function"&&Symbol.iterator,m="@@iterator";function v(j){var M=j&&(u&&j[u]||j[m]);if(typeof M=="function")return M}var g="<<anonymous>>",d={array:x("array"),bigint:x("bigint"),bool:x("boolean"),func:x("function"),number:x("number"),object:x("object"),string:x("string"),symbol:x("symbol"),any:P(),arrayOf:w,element:k(),elementType:y(),instanceOf:S,node:L(),objectOf:I,oneOf:C,oneOfType:A,shape:O,exact:$};function h(j,M){return j===M?j!==0||1/j===1/M:j!==j&&M!==M}function f(j,M){this.message=j,this.data=M&&typeof M=="object"?M:{},this.stack=""}f.prototype=Error.prototype;function b(j){if(process.env.NODE_ENV!=="production")var M={},U=0;function X(q,Y,K,W,J,Q,se){if(W=W||g,Q=Q||K,se!==r){if(p){var B=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw B.name="Invariant Violation",B}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var te=W+":"+K;!M[te]&&U<3&&(a("You are manually calling a React.PropTypes validation function for the `"+Q+"` prop on `"+W+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),M[te]=!0,U++)}}return Y[K]==null?q?Y[K]===null?new f("The "+J+" `"+Q+"` is marked as required "+("in `"+W+"`, but its value is `null`.")):new f("The "+J+" `"+Q+"` is marked as required in "+("`"+W+"`, but its value is `undefined`.")):null:j(Y,K,W,J,Q)}var G=X.bind(null,!1);return G.isRequired=X.bind(null,!0),G}function x(j){function M(U,X,G,q,Y,K){var W=U[X],J=_(W);if(J!==j){var Q=z(W);return new f("Invalid "+q+" `"+Y+"` of type "+("`"+Q+"` supplied to `"+G+"`, expected ")+("`"+j+"`."),{expectedType:j})}return null}return b(M)}function P(){return b(s)}function w(j){function M(U,X,G,q,Y){if(typeof j!="function")return new f("Property `"+Y+"` of component `"+G+"` has invalid PropType notation inside arrayOf.");var K=U[X];if(!Array.isArray(K)){var W=_(K);return new f("Invalid "+q+" `"+Y+"` of type "+("`"+W+"` supplied to `"+G+"`, expected an array."))}for(var J=0;J<K.length;J++){var Q=j(K,J,G,q,Y+"["+J+"]",r);if(Q instanceof Error)return Q}return null}return b(M)}function k(){function j(M,U,X,G,q){var Y=M[U];if(!c(Y)){var K=_(Y);return new f("Invalid "+G+" `"+q+"` of type "+("`"+K+"` supplied to `"+X+"`, expected a single ReactElement."))}return null}return b(j)}function y(){function j(M,U,X,G,q){var Y=M[U];if(!e.isValidElementType(Y)){var K=_(Y);return new f("Invalid "+G+" `"+q+"` of type "+("`"+K+"` supplied to `"+X+"`, expected a single ReactElement type."))}return null}return b(j)}function S(j){function M(U,X,G,q,Y){if(!(U[X]instanceof j)){var K=j.name||g,W=Z(U[X]);return new f("Invalid "+q+" `"+Y+"` of type "+("`"+W+"` supplied to `"+G+"`, expected ")+("instance of `"+K+"`."))}return null}return b(M)}function C(j){if(!Array.isArray(j))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),s;function M(U,X,G,q,Y){for(var K=U[X],W=0;W<j.length;W++)if(h(K,j[W]))return null;var J=JSON.stringify(j,function(se,B){var te=z(B);return te==="symbol"?String(B):B});return new f("Invalid "+q+" `"+Y+"` of value `"+String(K)+"` "+("supplied to `"+G+"`, expected one of "+J+"."))}return b(M)}function I(j){function M(U,X,G,q,Y){if(typeof j!="function")return new f("Property `"+Y+"` of component `"+G+"` has invalid PropType notation inside objectOf.");var K=U[X],W=_(K);if(W!=="object")return new f("Invalid "+q+" `"+Y+"` of type "+("`"+W+"` supplied to `"+G+"`, expected an object."));for(var J in K)if(n(K,J)){var Q=j(K,J,G,q,Y+"."+J,r);if(Q instanceof Error)return Q}return null}return b(M)}function A(j){if(!Array.isArray(j))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var M=0;M<j.length;M++){var U=j[M];if(typeof U!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ee(U)+" at index "+M+"."),s}function X(G,q,Y,K,W){for(var J=[],Q=0;Q<j.length;Q++){var se=j[Q],B=se(G,q,Y,K,W,r);if(B==null)return null;B.data&&n(B.data,"expectedType")&&J.push(B.data.expectedType)}var te=J.length>0?", expected one of type ["+J.join(", ")+"]":"";return new f("Invalid "+K+" `"+W+"` supplied to "+("`"+Y+"`"+te+"."))}return b(X)}function L(){function j(M,U,X,G,q){return V(M[U])?null:new f("Invalid "+G+" `"+q+"` supplied to "+("`"+X+"`, expected a ReactNode."))}return b(j)}function E(j,M,U,X,G){return new f((j||"React class")+": "+M+" type `"+U+"."+X+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+G+"`.")}function O(j){function M(U,X,G,q,Y){var K=U[X],W=_(K);if(W!=="object")return new f("Invalid "+q+" `"+Y+"` of type `"+W+"` "+("supplied to `"+G+"`, expected `object`."));for(var J in j){var Q=j[J];if(typeof Q!="function")return E(G,q,Y,J,z(Q));var se=Q(K,J,G,q,Y+"."+J,r);if(se)return se}return null}return b(M)}function $(j){function M(U,X,G,q,Y){var K=U[X],W=_(K);if(W!=="object")return new f("Invalid "+q+" `"+Y+"` of type `"+W+"` "+("supplied to `"+G+"`, expected `object`."));var J=t({},U[X],j);for(var Q in J){var se=j[Q];if(n(j,Q)&&typeof se!="function")return E(G,q,Y,Q,z(se));if(!se)return new f("Invalid "+q+" `"+Y+"` key `"+Q+"` supplied to `"+G+"`.\nBad object: "+JSON.stringify(U[X],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(j),null,"  "));var B=se(K,Q,G,q,Y+"."+Q,r);if(B)return B}return null}return b(M)}function V(j){switch(typeof j){case"number":case"string":case"undefined":return!0;case"boolean":return!j;case"object":if(Array.isArray(j))return j.every(V);if(j===null||c(j))return!0;var M=v(j);if(M){var U=M.call(j),X;if(M!==j.entries){for(;!(X=U.next()).done;)if(!V(X.value))return!1}else for(;!(X=U.next()).done;){var G=X.value;if(G&&!V(G[1]))return!1}}else return!1;return!0;default:return!1}}function H(j,M){return j==="symbol"?!0:M?M["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&M instanceof Symbol:!1}function _(j){var M=typeof j;return Array.isArray(j)?"array":j instanceof RegExp?"object":H(M,j)?"symbol":M}function z(j){if(typeof j>"u"||j===null)return""+j;var M=_(j);if(M==="object"){if(j instanceof Date)return"date";if(j instanceof RegExp)return"regexp"}return M}function ee(j){var M=z(j);switch(M){case"array":case"object":return"an "+M;case"boolean":case"date":case"regexp":return"a "+M;default:return M}}function Z(j){return!j.constructor||!j.constructor.name?g:j.constructor.name}return d.checkPropTypes=o,d.resetWarningCache=o.resetWarningCache,d.PropTypes=d,d},Hn}var Gn,Na;function np(){if(Na)return Gn;Na=1;var e=jo();function t(){}function r(){}return r.resetWarningCache=t,Gn=function(){function n(s,c,p,u,m,v){if(v!==e){var g=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw g.name="Invariant Violation",g}}n.isRequired=n;function o(){return n}var a={array:n,bigint:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:o,element:n,elementType:n,instanceOf:o,node:n,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:r,resetWarningCache:t};return a.PropTypes=a,a},Gn}if(process.env.NODE_ENV!=="production"){var op=Ws(),ap=!0;ao.exports=rp()(op.isElement,ap)}else ao.exports=np()();var sp=ao.exports;const i=Yc(sp);function ip(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ys(e,t,r,n,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let c;const p=a.type;return typeof p=="function"&&!ip(p)&&(c="Did you accidentally use a plain function component for an element instead?"),c!==void 0?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ks=sr(i.element,Ys);Ks.isRequired=sr(i.element.isRequired,Ys);const Ur=Ks;function lp(e){const{prototype:t={}}=e;return!!t.isReactComponent}function cp(e,t,r,n,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let c;return typeof a=="function"&&!lp(a)&&(c="Did you accidentally provide a plain function component instead?"),c!==void 0?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const pp=sr(i.elementType,cp),dp="exact-prop: ​";function Js(e){return process.env.NODE_ENV==="production"?e:R({},e,{[dp]:t=>{const r=Object.keys(t).filter(n=>!e.hasOwnProperty(n));return r.length>0?new Error(`The following props are not supported: ${r.map(n=>`\`${n}\``).join(", ")}. Please remove them.`):null}})}function Zt(e){let t="https://mui.com/production-error/?code="+e;for(let r=1;r<arguments.length;r+=1)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var so={exports:{}},de={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ta;function up(){if(Ta)return de;Ta=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function f(b){if(typeof b=="object"&&b!==null){var x=b.$$typeof;switch(x){case e:switch(b=b.type,b){case r:case o:case n:case u:case m:return b;default:switch(b=b&&b.$$typeof,b){case c:case s:case p:case g:case v:case a:return b;default:return x}}case t:return x}}}return de.ContextConsumer=s,de.ContextProvider=a,de.Element=e,de.ForwardRef=p,de.Fragment=r,de.Lazy=g,de.Memo=v,de.Portal=t,de.Profiler=o,de.StrictMode=n,de.Suspense=u,de.SuspenseList=m,de.isAsyncMode=function(){return!1},de.isConcurrentMode=function(){return!1},de.isContextConsumer=function(b){return f(b)===s},de.isContextProvider=function(b){return f(b)===a},de.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===e},de.isForwardRef=function(b){return f(b)===p},de.isFragment=function(b){return f(b)===r},de.isLazy=function(b){return f(b)===g},de.isMemo=function(b){return f(b)===v},de.isPortal=function(b){return f(b)===t},de.isProfiler=function(b){return f(b)===o},de.isStrictMode=function(b){return f(b)===n},de.isSuspense=function(b){return f(b)===u},de.isSuspenseList=function(b){return f(b)===m},de.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===r||b===o||b===n||b===u||b===m||b===d||typeof b=="object"&&b!==null&&(b.$$typeof===g||b.$$typeof===v||b.$$typeof===a||b.$$typeof===s||b.$$typeof===p||b.$$typeof===h||b.getModuleId!==void 0)},de.typeOf=f,de}var ue={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ca;function fp(){return Ca||(Ca=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h=!1,f=!1,b=!1,x=!1,P=!1,w;w=Symbol.for("react.module.reference");function k(D){return!!(typeof D=="string"||typeof D=="function"||D===r||D===o||P||D===n||D===u||D===m||x||D===d||h||f||b||typeof D=="object"&&D!==null&&(D.$$typeof===g||D.$$typeof===v||D.$$typeof===a||D.$$typeof===s||D.$$typeof===p||D.$$typeof===w||D.getModuleId!==void 0))}function y(D){if(typeof D=="object"&&D!==null){var ie=D.$$typeof;switch(ie){case e:var Ne=D.type;switch(Ne){case r:case o:case n:case u:case m:return Ne;default:var Re=Ne&&Ne.$$typeof;switch(Re){case c:case s:case p:case g:case v:case a:return Re;default:return ie}}case t:return ie}}}var S=s,C=a,I=e,A=p,L=r,E=g,O=v,$=t,V=o,H=n,_=u,z=m,ee=!1,Z=!1;function j(D){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function M(D){return Z||(Z=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function U(D){return y(D)===s}function X(D){return y(D)===a}function G(D){return typeof D=="object"&&D!==null&&D.$$typeof===e}function q(D){return y(D)===p}function Y(D){return y(D)===r}function K(D){return y(D)===g}function W(D){return y(D)===v}function J(D){return y(D)===t}function Q(D){return y(D)===o}function se(D){return y(D)===n}function B(D){return y(D)===u}function te(D){return y(D)===m}ue.ContextConsumer=S,ue.ContextProvider=C,ue.Element=I,ue.ForwardRef=A,ue.Fragment=L,ue.Lazy=E,ue.Memo=O,ue.Portal=$,ue.Profiler=V,ue.StrictMode=H,ue.Suspense=_,ue.SuspenseList=z,ue.isAsyncMode=j,ue.isConcurrentMode=M,ue.isContextConsumer=U,ue.isContextProvider=X,ue.isElement=G,ue.isForwardRef=q,ue.isFragment=Y,ue.isLazy=K,ue.isMemo=W,ue.isPortal=J,ue.isProfiler=Q,ue.isStrictMode=se,ue.isSuspense=B,ue.isSuspenseList=te,ue.isValidElementType=k,ue.typeOf=y}()),ue}process.env.NODE_ENV==="production"?so.exports=up():so.exports=fp();var dn=so.exports;const mp=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function hp(e){const t=`${e}`.match(mp);return t&&t[1]||""}function Zs(e,t=""){return e.displayName||e.name||hp(e)||t}function Sa(e,t,r){const n=Zs(t);return e.displayName||(n!==""?`${r}(${n})`:r)}function gp(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Zs(e,"Component");if(typeof e=="object")switch(e.$$typeof){case dn.ForwardRef:return Sa(e,e.render,"ForwardRef");case dn.Memo:return Sa(e,e.type,"memo");default:return}}}function pt(e,t,r,n,o){if(process.env.NODE_ENV==="production")return null;const a=e[t],s=o||t;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an HTMLElement.`):null}const bp=i.oneOfType([i.func,i.object]),Ro=bp;function et(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Zt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function io(...e){return e.reduce((t,r)=>r==null?t:function(...o){t.apply(this,o),r.apply(this,o)},()=>{})}function Qs(e,t=166){let r;function n(...o){const a=()=>{e.apply(this,o)};clearTimeout(r),r=setTimeout(a,t)}return n.clear=()=>{clearTimeout(r)},n}function vp(e,t){return process.env.NODE_ENV==="production"?()=>null:(r,n,o,a,s)=>{const c=o||"<<anonymous>>",p=s||n;return typeof r[n]<"u"?new Error(`The ${a} \`${p}\` of \`${c}\` is deprecated. ${t}`):null}}function yp(e,t){var r,n;return T.isValidElement(e)&&t.indexOf((r=e.type.muiName)!=null?r:(n=e.type)==null||(n=n._payload)==null||(n=n.value)==null?void 0:n.muiName)!==-1}function Oe(e){return e&&e.ownerDocument||document}function Qt(e){return Oe(e).defaultView||window}function wp(e,t){if(process.env.NODE_ENV==="production")return()=>null;const r=t?R({},t.propTypes):null;return o=>(a,s,c,p,u,...m)=>{const v=u||s,g=r==null?void 0:r[v];if(g){const d=g(a,s,c,p,u,...m);if(d)return d}return typeof a[s]<"u"&&!a[o]?new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function un(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const xp=typeof window<"u"?T.useLayoutEffect:T.useEffect,It=xp;let Oa=0;function kp(e){const[t,r]=T.useState(e),n=e||t;return T.useEffect(()=>{t==null&&(Oa+=1,r(`mui-${Oa}`))},[t]),n}const ja=T["useId".toString()];function ei(e){if(ja!==void 0){const t=ja();return e??t}return kp(e)}function Ep(e,t,r,n,o){if(process.env.NODE_ENV==="production")return null;const a=o||t;return typeof e[t]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function ti({controlled:e,default:t,name:r,state:n="value"}){const{current:o}=T.useRef(e!==void 0),[a,s]=T.useState(t),c=o?e:a;if(process.env.NODE_ENV!=="production"){T.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${n} state of ${r} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${r} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[n,r,e]);const{current:u}=T.useRef(t);T.useEffect(()=>{!o&&u!==t&&console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join(`
`))},[JSON.stringify(t)])}const p=T.useCallback(u=>{o||s(u)},[]);return[c,p]}function $r(e){const t=T.useRef(e);return It(()=>{t.current=e}),T.useRef((...r)=>(0,t.current)(...r)).current}function qe(...e){return T.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(r=>{un(r,t)})},e)}const Ra={};function Np(e,t){const r=T.useRef(Ra);return r.current===Ra&&(r.current=e(t)),r}const Tp=[];function Cp(e){T.useEffect(e,Tp)}class Hr{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Hr}start(t,r){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,r()},t)}}function xr(){const e=Np(Hr.create).current;return Cp(e.disposeEffect),e}let kn=!0,lo=!1;const Sp=new Hr,Op={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function jp(e){const{type:t,tagName:r}=e;return!!(r==="INPUT"&&Op[t]&&!e.readOnly||r==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Rp(e){e.metaKey||e.altKey||e.ctrlKey||(kn=!0)}function qn(){kn=!1}function Pp(){this.visibilityState==="hidden"&&lo&&(kn=!0)}function $p(e){e.addEventListener("keydown",Rp,!0),e.addEventListener("mousedown",qn,!0),e.addEventListener("pointerdown",qn,!0),e.addEventListener("touchstart",qn,!0),e.addEventListener("visibilitychange",Pp,!0)}function _p(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return kn||jp(t)}function ri(){const e=T.useCallback(o=>{o!=null&&$p(o.ownerDocument)},[]),t=T.useRef(!1);function r(){return t.current?(lo=!0,Sp.start(100,()=>{lo=!1}),t.current=!1,!0):!1}function n(o){return _p(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:n,onBlur:r,ref:e}}function ni(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Mp(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function Ip(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Dp=Number.isInteger||Ip;function oi(e,t,r,n){const o=e[t];if(o==null||!Dp(o)){const a=Mp(o);return new RangeError(`Invalid ${n} \`${t}\` of type \`${a}\` supplied to \`${r}\`, expected \`integer\`.`)}return null}function ai(e,t,...r){return e[t]===void 0?null:oi(e,t,...r)}function co(){return null}ai.isRequired=oi;co.isRequired=co;const si=process.env.NODE_ENV==="production"?co:ai;function ii(e,t){const r=R({},t);return Object.keys(e).forEach(n=>{if(n.toString().match(/^(components|slots)$/))r[n]=R({},e[n],r[n]);else if(n.toString().match(/^(componentsProps|slotProps)$/)){const o=e[n]||{},a=t[n];r[n]={},!a||!Object.keys(a)?r[n]=o:!o||!Object.keys(o)?r[n]=a:(r[n]=R({},a),Object.keys(o).forEach(s=>{r[n][s]=ii(o[s],a[s])}))}else r[n]===void 0&&(r[n]=e[n])}),r}function ft(e,t,r=void 0){const n={};return Object.keys(e).forEach(o=>{n[o]=e[o].reduce((a,s)=>{if(s){const c=t(s);c!==""&&a.push(c),r&&r[s]&&a.push(r[s])}return a},[]).join(" ")}),n}const Pa=e=>e,Ap=()=>{let e=Pa;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Pa}}},Bp=Ap(),li=Bp,ci={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function nt(e,t,r="Mui"){const n=ci[t];return n?`${r}-${n}`:`${li.generate(e)}-${t}`}function wt(e,t,r="Mui"){const n={};return t.forEach(o=>{n[o]=nt(e,o,r)}),n}function Lp(e,t=Number.MIN_SAFE_INTEGER,r=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,r))}function me(e,t){if(e==null)return{};var r={},n=Object.keys(e),o,a;for(a=0;a<n.length;a++)o=n[a],!(t.indexOf(o)>=0)&&(r[o]=e[o]);return r}const Fp=["values","unit","step"],Vp=e=>{const t=Object.keys(e).map(r=>({key:r,val:e[r]}))||[];return t.sort((r,n)=>r.val-n.val),t.reduce((r,n)=>R({},r,{[n.key]:n.val}),{})};function zp(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:r="px",step:n=5}=e,o=me(e,Fp),a=Vp(t),s=Object.keys(a);function c(g){return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${r})`}function p(g){return`@media (max-width:${(typeof t[g]=="number"?t[g]:g)-n/100}${r})`}function u(g,d){const h=s.indexOf(d);return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${r}) and (max-width:${(h!==-1&&typeof t[s[h]]=="number"?t[s[h]]:d)-n/100}${r})`}function m(g){return s.indexOf(g)+1<s.length?u(g,s[s.indexOf(g)+1]):c(g)}function v(g){const d=s.indexOf(g);return d===0?c(s[1]):d===s.length-1?p(s[d]):u(g,s[s.indexOf(g)+1]).replace("@media","@media not all and")}return R({keys:s,values:a,up:c,down:p,between:u,only:m,not:v,unit:r},o)}const Up={borderRadius:4},Hp=Up,Gp=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.string,i.object,i.array]):{},xt=Gp;function Tr(e,t){return t?ct(e,t,{clone:!1}):e}const Po={xs:0,sm:600,md:900,lg:1200,xl:1536},$a={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Po[e]}px)`};function dt(e,t,r){const n=e.theme||{};if(Array.isArray(t)){const a=n.breakpoints||$a;return t.reduce((s,c,p)=>(s[a.up(a.keys[p])]=r(t[p]),s),{})}if(typeof t=="object"){const a=n.breakpoints||$a;return Object.keys(t).reduce((s,c)=>{if(Object.keys(a.values||Po).indexOf(c)!==-1){const p=a.up(c);s[p]=r(t[c],c)}else{const p=c;s[p]=t[p]}return s},{})}return r(t)}function qp(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((n,o)=>{const a=e.up(o);return n[a]={},n},{}))||{}}function Wp(e,t){return e.reduce((r,n)=>{const o=r[n];return(!o||Object.keys(o).length===0)&&delete r[n],r},t)}function En(e,t,r=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&r){const n=`vars.${t}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(n!=null)return n}return t.split(".").reduce((n,o)=>n&&n[o]!=null?n[o]:null,e)}function fn(e,t,r,n=r){let o;return typeof e=="function"?o=e(r):Array.isArray(e)?o=e[r]||n:o=En(e,r)||n,t&&(o=t(o,n,e)),o}function ke(e){const{prop:t,cssProperty:r=e.prop,themeKey:n,transform:o}=e,a=s=>{if(s[t]==null)return null;const c=s[t],p=s.theme,u=En(p,n)||{};return dt(s,c,v=>{let g=fn(u,o,v);return v===g&&typeof v=="string"&&(g=fn(u,o,`${t}${v==="default"?"":et(v)}`,v)),r===!1?g:{[r]:g}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[t]:xt}:{},a.filterProps=[t],a}function Xp(e){const t={};return r=>(t[r]===void 0&&(t[r]=e(r)),t[r])}const Yp={m:"margin",p:"padding"},Kp={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},_a={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Jp=Xp(e=>{if(e.length>2)if(_a[e])e=_a[e];else return[e];const[t,r]=e.split(""),n=Yp[t],o=Kp[r]||"";return Array.isArray(o)?o.map(a=>n+a):[n+o]}),Nn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Tn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Zp=[...Nn,...Tn];function Gr(e,t,r,n){var o;const a=(o=En(e,t,!1))!=null?o:r;return typeof a=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${n} argument to be a number or a string, got ${s}.`),a*s):Array.isArray(a)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>a.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${s} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),a[s]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function pi(e){return Gr(e,"spacing",8,"spacing")}function qr(e,t){if(typeof t=="string"||t==null)return t;const r=Math.abs(t),n=e(r);return t>=0?n:typeof n=="number"?-n:`-${n}`}function Qp(e,t){return r=>e.reduce((n,o)=>(n[o]=qr(t,r),n),{})}function ed(e,t,r,n){if(t.indexOf(r)===-1)return null;const o=Jp(r),a=Qp(o,n),s=e[r];return dt(e,s,a)}function di(e,t){const r=pi(e.theme);return Object.keys(e).map(n=>ed(e,t,n,r)).reduce(Tr,{})}function ve(e){return di(e,Nn)}ve.propTypes=process.env.NODE_ENV!=="production"?Nn.reduce((e,t)=>(e[t]=xt,e),{}):{};ve.filterProps=Nn;function ye(e){return di(e,Tn)}ye.propTypes=process.env.NODE_ENV!=="production"?Tn.reduce((e,t)=>(e[t]=xt,e),{}):{};ye.filterProps=Tn;process.env.NODE_ENV!=="production"&&Zp.reduce((e,t)=>(e[t]=xt,e),{});function td(e=8){if(e.mui)return e;const t=pi({spacing:e}),r=(...n)=>(process.env.NODE_ENV!=="production"&&(n.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)),(n.length===0?[1]:n).map(a=>{const s=t(a);return typeof s=="number"?`${s}px`:s}).join(" "));return r.mui=!0,r}function Cn(...e){const t=e.reduce((n,o)=>(o.filterProps.forEach(a=>{n[a]=o}),n),{}),r=n=>Object.keys(n).reduce((o,a)=>t[a]?Tr(o,t[a](n)):o,{});return r.propTypes=process.env.NODE_ENV!=="production"?e.reduce((n,o)=>Object.assign(n,o.propTypes),{}):{},r.filterProps=e.reduce((n,o)=>n.concat(o.filterProps),[]),r}function He(e){return typeof e!="number"?e:`${e}px solid`}function Ye(e,t){return ke({prop:e,themeKey:"borders",transform:t})}const rd=Ye("border",He),nd=Ye("borderTop",He),od=Ye("borderRight",He),ad=Ye("borderBottom",He),sd=Ye("borderLeft",He),id=Ye("borderColor"),ld=Ye("borderTopColor"),cd=Ye("borderRightColor"),pd=Ye("borderBottomColor"),dd=Ye("borderLeftColor"),ud=Ye("outline",He),fd=Ye("outlineColor"),Sn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Gr(e.theme,"shape.borderRadius",4,"borderRadius"),r=n=>({borderRadius:qr(t,n)});return dt(e,e.borderRadius,r)}return null};Sn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:xt}:{};Sn.filterProps=["borderRadius"];Cn(rd,nd,od,ad,sd,id,ld,cd,pd,dd,Sn,ud,fd);const On=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Gr(e.theme,"spacing",8,"gap"),r=n=>({gap:qr(t,n)});return dt(e,e.gap,r)}return null};On.propTypes=process.env.NODE_ENV!=="production"?{gap:xt}:{};On.filterProps=["gap"];const jn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Gr(e.theme,"spacing",8,"columnGap"),r=n=>({columnGap:qr(t,n)});return dt(e,e.columnGap,r)}return null};jn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:xt}:{};jn.filterProps=["columnGap"];const Rn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Gr(e.theme,"spacing",8,"rowGap"),r=n=>({rowGap:qr(t,n)});return dt(e,e.rowGap,r)}return null};Rn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:xt}:{};Rn.filterProps=["rowGap"];const md=ke({prop:"gridColumn"}),hd=ke({prop:"gridRow"}),gd=ke({prop:"gridAutoFlow"}),bd=ke({prop:"gridAutoColumns"}),vd=ke({prop:"gridAutoRows"}),yd=ke({prop:"gridTemplateColumns"}),wd=ke({prop:"gridTemplateRows"}),xd=ke({prop:"gridTemplateAreas"}),kd=ke({prop:"gridArea"});Cn(On,jn,Rn,md,hd,gd,bd,vd,yd,wd,xd,kd);function Xt(e,t){return t==="grey"?t:e}const Ed=ke({prop:"color",themeKey:"palette",transform:Xt}),Nd=ke({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Xt}),Td=ke({prop:"backgroundColor",themeKey:"palette",transform:Xt});Cn(Ed,Nd,Td);function Ve(e){return e<=1&&e!==0?`${e*100}%`:e}const Cd=ke({prop:"width",transform:Ve}),$o=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=r=>{var n,o;const a=((n=e.theme)==null||(n=n.breakpoints)==null||(n=n.values)==null?void 0:n[r])||Po[r];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:Ve(r)}};return dt(e,e.maxWidth,t)}return null};$o.filterProps=["maxWidth"];const Sd=ke({prop:"minWidth",transform:Ve}),Od=ke({prop:"height",transform:Ve}),jd=ke({prop:"maxHeight",transform:Ve}),Rd=ke({prop:"minHeight",transform:Ve});ke({prop:"size",cssProperty:"width",transform:Ve});ke({prop:"size",cssProperty:"height",transform:Ve});const Pd=ke({prop:"boxSizing"});Cn(Cd,$o,Sd,Od,jd,Rd,Pd);const $d={border:{themeKey:"borders",transform:He},borderTop:{themeKey:"borders",transform:He},borderRight:{themeKey:"borders",transform:He},borderBottom:{themeKey:"borders",transform:He},borderLeft:{themeKey:"borders",transform:He},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:He},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Sn},color:{themeKey:"palette",transform:Xt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Xt},backgroundColor:{themeKey:"palette",transform:Xt},p:{style:ye},pt:{style:ye},pr:{style:ye},pb:{style:ye},pl:{style:ye},px:{style:ye},py:{style:ye},padding:{style:ye},paddingTop:{style:ye},paddingRight:{style:ye},paddingBottom:{style:ye},paddingLeft:{style:ye},paddingX:{style:ye},paddingY:{style:ye},paddingInline:{style:ye},paddingInlineStart:{style:ye},paddingInlineEnd:{style:ye},paddingBlock:{style:ye},paddingBlockStart:{style:ye},paddingBlockEnd:{style:ye},m:{style:ve},mt:{style:ve},mr:{style:ve},mb:{style:ve},ml:{style:ve},mx:{style:ve},my:{style:ve},margin:{style:ve},marginTop:{style:ve},marginRight:{style:ve},marginBottom:{style:ve},marginLeft:{style:ve},marginX:{style:ve},marginY:{style:ve},marginInline:{style:ve},marginInlineStart:{style:ve},marginInlineEnd:{style:ve},marginBlock:{style:ve},marginBlockStart:{style:ve},marginBlockEnd:{style:ve},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:On},rowGap:{style:Rn},columnGap:{style:jn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ve},maxWidth:{style:$o},minWidth:{transform:Ve},height:{transform:Ve},maxHeight:{transform:Ve},minHeight:{transform:Ve},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},_o=$d;function _d(...e){const t=e.reduce((n,o)=>n.concat(Object.keys(o)),[]),r=new Set(t);return e.every(n=>r.size===Object.keys(n).length)}function Md(e,t){return typeof e=="function"?e(t):e}function Id(){function e(r,n,o,a){const s={[r]:n,theme:o},c=a[r];if(!c)return{[r]:n};const{cssProperty:p=r,themeKey:u,transform:m,style:v}=c;if(n==null)return null;if(u==="typography"&&n==="inherit")return{[r]:n};const g=En(o,u)||{};return v?v(s):dt(s,n,h=>{let f=fn(g,m,h);return h===f&&typeof h=="string"&&(f=fn(g,m,`${r}${h==="default"?"":et(h)}`,h)),p===!1?f:{[p]:f}})}function t(r){var n;const{sx:o,theme:a={}}=r||{};if(!o)return null;const s=(n=a.unstable_sxConfig)!=null?n:_o;function c(p){let u=p;if(typeof p=="function")u=p(a);else if(typeof p!="object")return p;if(!u)return null;const m=qp(a.breakpoints),v=Object.keys(m);let g=m;return Object.keys(u).forEach(d=>{const h=Md(u[d],a);if(h!=null)if(typeof h=="object")if(s[d])g=Tr(g,e(d,h,a,s));else{const f=dt({theme:a},h,b=>({[d]:b}));_d(f,h)?g[d]=t({sx:h,theme:a}):g=Tr(g,f)}else g=Tr(g,e(d,h,a,s))}),Wp(v,g)}return Array.isArray(o)?o.map(c):c(o)}return t}const ui=Id();ui.filterProps=["sx"];const Mo=ui;function Dd(e,t){const r=this;return r.vars&&typeof r.getColorSchemeSelector=="function"?{[r.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:r.palette.mode===e?t:{}}const Ad=["breakpoints","palette","spacing","shape"];function Io(e={},...t){const{breakpoints:r={},palette:n={},spacing:o,shape:a={}}=e,s=me(e,Ad),c=zp(r),p=td(o);let u=ct({breakpoints:c,direction:"ltr",components:{},palette:R({mode:"light"},n),spacing:p,shape:R({},Hp,a)},s);return u.applyStyles=Dd,u=t.reduce((m,v)=>ct(m,v),u),u.unstable_sxConfig=R({},_o,s==null?void 0:s.unstable_sxConfig),u.unstable_sx=function(v){return Mo({sx:v,theme:this})},u}function Bd(e){return Object.keys(e).length===0}function fi(e=null){const t=T.useContext(ro.ThemeContext);return!t||Bd(t)?e:t}const Ld=Io();function mi(e=Ld){return fi(e)}const Fd=["ownerState"],Vd=["variants"],zd=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Ud(e){return Object.keys(e).length===0}function Hd(e){return typeof e=="string"&&e.charCodeAt(0)>96}function an(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Gd=Io(),Ma=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function en({defaultTheme:e,theme:t,themeId:r}){return Ud(t)?e:t[r]||t}function qd(e){return e?(t,r)=>r[e]:null}function sn(e,t){let{ownerState:r}=t,n=me(t,Fd);const o=typeof e=="function"?e(R({ownerState:r},n)):e;if(Array.isArray(o))return o.flatMap(a=>sn(a,R({ownerState:r},n)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let c=me(o,Vd);return a.forEach(p=>{let u=!0;typeof p.props=="function"?u=p.props(R({ownerState:r},n,r)):Object.keys(p.props).forEach(m=>{(r==null?void 0:r[m])!==p.props[m]&&n[m]!==p.props[m]&&(u=!1)}),u&&(Array.isArray(c)||(c=[c]),c.push(typeof p.style=="function"?p.style(R({ownerState:r},n,r)):p.style))}),c}return o}function Wd(e={}){const{themeId:t,defaultTheme:r=Gd,rootShouldForwardProp:n=an,slotShouldForwardProp:o=an}=e,a=s=>Mo(R({},s,{theme:en(R({},s,{defaultTheme:r,themeId:t}))}));return a.__mui_systemSx=!0,(s,c={})=>{ro.internal_processStyles(s,y=>y.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:p,slot:u,skipVariantsResolver:m,skipSx:v,overridesResolver:g=qd(Ma(u))}=c,d=me(c,zd),h=m!==void 0?m:u&&u!=="Root"&&u!=="root"||!1,f=v||!1;let b;process.env.NODE_ENV!=="production"&&p&&(b=`${p}-${Ma(u||"Root")}`);let x=an;u==="Root"||u==="root"?x=n:u?x=o:Hd(s)&&(x=void 0);const P=ro(s,R({shouldForwardProp:x,label:b},d)),w=y=>typeof y=="function"&&y.__emotion_real!==y||Rt(y)?S=>sn(y,R({},S,{theme:en({theme:S.theme,defaultTheme:r,themeId:t})})):y,k=(y,...S)=>{let C=w(y);const I=S?S.map(w):[];p&&g&&I.push(E=>{const O=en(R({},E,{defaultTheme:r,themeId:t}));if(!O.components||!O.components[p]||!O.components[p].styleOverrides)return null;const $=O.components[p].styleOverrides,V={};return Object.entries($).forEach(([H,_])=>{V[H]=sn(_,R({},E,{theme:O}))}),g(E,V)}),p&&!h&&I.push(E=>{var O;const $=en(R({},E,{defaultTheme:r,themeId:t})),V=$==null||(O=$.components)==null||(O=O[p])==null?void 0:O.variants;return sn({variants:V},R({},E,{theme:$}))}),f||I.push(a);const A=I.length-S.length;if(Array.isArray(y)&&A>0){const E=new Array(A).fill("");C=[...y,...E],C.raw=[...y.raw,...E]}const L=P(C,...I);if(process.env.NODE_ENV!=="production"){let E;p&&(E=`${p}${et(u||"")}`),E===void 0&&(E=`Styled(${gp(s)})`),L.displayName=E}return s.muiName&&(L.muiName=s.muiName),L};return P.withConfig&&(k.withConfig=P.withConfig),k}}function Xd(e){const{theme:t,name:r,props:n}=e;return!t||!t.components||!t.components[r]||!t.components[r].defaultProps?n:ii(t.components[r].defaultProps,n)}function Yd({props:e,name:t,defaultTheme:r,themeId:n}){let o=mi(r);return n&&(o=o[n]||o),Xd({theme:o,name:t,props:e})}function Do(e,t=0,r=1){return process.env.NODE_ENV!=="production"&&(e<t||e>r)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`),Lp(e,t,r)}function Kd(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let r=e.match(t);return r&&r[0].length===1&&(r=r.map(n=>n+n)),r?`rgb${r.length===4?"a":""}(${r.map((n,o)=>o<3?parseInt(n,16):Math.round(parseInt(n,16)/255*1e3)/1e3).join(", ")})`:""}function Dt(e){if(e.type)return e;if(e.charAt(0)==="#")return Dt(Kd(e));const t=e.indexOf("("),r=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Zt(9,e));let n=e.substring(t+1,e.length-1),o;if(r==="color"){if(n=n.split(" "),o=n.shift(),n.length===4&&n[3].charAt(0)==="/"&&(n[3]=n[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Zt(10,o))}else n=n.split(",");return n=n.map(a=>parseFloat(a)),{type:r,values:n,colorSpace:o}}function Pn(e){const{type:t,colorSpace:r}=e;let{values:n}=e;return t.indexOf("rgb")!==-1?n=n.map((o,a)=>a<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(n[1]=`${n[1]}%`,n[2]=`${n[2]}%`),t.indexOf("color")!==-1?n=`${r} ${n.join(" ")}`:n=`${n.join(", ")}`,`${t}(${n})`}function Jd(e){e=Dt(e);const{values:t}=e,r=t[0],n=t[1]/100,o=t[2]/100,a=n*Math.min(o,1-o),s=(u,m=(u+r/30)%12)=>o-a*Math.max(Math.min(m-3,9-m,1),-1);let c="rgb";const p=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(c+="a",p.push(t[3])),Pn({type:c,values:p})}function Ia(e){e=Dt(e);let t=e.type==="hsl"||e.type==="hsla"?Dt(Jd(e)).values:e.values;return t=t.map(r=>(e.type!=="color"&&(r/=255),r<=.03928?r/12.92:((r+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Da(e,t){const r=Ia(e),n=Ia(t);return(Math.max(r,n)+.05)/(Math.min(r,n)+.05)}function mn(e,t){return e=Dt(e),t=Do(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Pn(e)}function Zd(e,t){if(e=Dt(e),t=Do(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]*=1-t;return Pn(e)}function Qd(e,t){if(e=Dt(e),t=Do(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(255-e.values[r])*t;else if(e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(1-e.values[r])*t;return Pn(e)}function eu(e,t){return R({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const tu={black:"#000",white:"#fff"},_r=tu,ru={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},nu=ru,ou={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ft=ou,au={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Vt=au,su={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},mr=su,iu={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},zt=iu,lu={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Ut=lu,cu={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Ht=cu,pu=["mode","contrastThreshold","tonalOffset"],Aa={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:_r.white,default:_r.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Wn={text:{primary:_r.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:_r.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Ba(e,t,r,n){const o=n.light||n,a=n.dark||n*1.5;e[t]||(e.hasOwnProperty(r)?e[t]=e[r]:t==="light"?e.light=Qd(e.main,o):t==="dark"&&(e.dark=Zd(e.main,a)))}function du(e="light"){return e==="dark"?{main:zt[200],light:zt[50],dark:zt[400]}:{main:zt[700],light:zt[400],dark:zt[800]}}function uu(e="light"){return e==="dark"?{main:Ft[200],light:Ft[50],dark:Ft[400]}:{main:Ft[500],light:Ft[300],dark:Ft[700]}}function fu(e="light"){return e==="dark"?{main:Vt[500],light:Vt[300],dark:Vt[700]}:{main:Vt[700],light:Vt[400],dark:Vt[800]}}function mu(e="light"){return e==="dark"?{main:Ut[400],light:Ut[300],dark:Ut[700]}:{main:Ut[700],light:Ut[500],dark:Ut[900]}}function hu(e="light"){return e==="dark"?{main:Ht[400],light:Ht[300],dark:Ht[700]}:{main:Ht[800],light:Ht[500],dark:Ht[900]}}function gu(e="light"){return e==="dark"?{main:mr[400],light:mr[300],dark:mr[700]}:{main:"#ed6c02",light:mr[500],dark:mr[900]}}function bu(e){const{mode:t="light",contrastThreshold:r=3,tonalOffset:n=.2}=e,o=me(e,pu),a=e.primary||du(t),s=e.secondary||uu(t),c=e.error||fu(t),p=e.info||mu(t),u=e.success||hu(t),m=e.warning||gu(t);function v(f){const b=Da(f,Wn.text.primary)>=r?Wn.text.primary:Aa.text.primary;if(process.env.NODE_ENV!=="production"){const x=Da(f,b);x<3&&console.error([`MUI: The contrast ratio of ${x}:1 for ${b} on ${f}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return b}const g=({color:f,name:b,mainShade:x=500,lightShade:P=300,darkShade:w=700})=>{if(f=R({},f),!f.main&&f[x]&&(f.main=f[x]),!f.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.`:Zt(11,b?` (${b})`:"",x));if(typeof f.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(f.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Zt(12,b?` (${b})`:"",JSON.stringify(f.main)));return Ba(f,"light",P,n),Ba(f,"dark",w,n),f.contrastText||(f.contrastText=v(f.main)),f},d={dark:Wn,light:Aa};return process.env.NODE_ENV!=="production"&&(d[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),ct(R({common:R({},_r),mode:t,primary:g({color:a,name:"primary"}),secondary:g({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:g({color:c,name:"error"}),warning:g({color:m,name:"warning"}),info:g({color:p,name:"info"}),success:g({color:u,name:"success"}),grey:nu,contrastThreshold:r,getContrastText:v,augmentColor:g,tonalOffset:n},d[t]),o)}const vu=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function yu(e){return Math.round(e*1e5)/1e5}const La={textTransform:"uppercase"},Fa='"Roboto", "Helvetica", "Arial", sans-serif';function wu(e,t){const r=typeof t=="function"?t(e):t,{fontFamily:n=Fa,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:s=400,fontWeightMedium:c=500,fontWeightBold:p=700,htmlFontSize:u=16,allVariants:m,pxToRem:v}=r,g=me(r,vu);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const d=o/14,h=v||(x=>`${x/u*d}rem`),f=(x,P,w,k,y)=>R({fontFamily:n,fontWeight:x,fontSize:h(P),lineHeight:w},n===Fa?{letterSpacing:`${yu(k/P)}em`}:{},y,m),b={h1:f(a,96,1.167,-1.5),h2:f(a,60,1.2,-.5),h3:f(s,48,1.167,0),h4:f(s,34,1.235,.25),h5:f(s,24,1.334,0),h6:f(c,20,1.6,.15),subtitle1:f(s,16,1.75,.15),subtitle2:f(c,14,1.57,.1),body1:f(s,16,1.5,.15),body2:f(s,14,1.43,.15),button:f(c,14,1.75,.4,La),caption:f(s,12,1.66,.4),overline:f(s,12,2.66,1,La),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return ct(R({htmlFontSize:u,pxToRem:h,fontFamily:n,fontSize:o,fontWeightLight:a,fontWeightRegular:s,fontWeightMedium:c,fontWeightBold:p},b),g,{clone:!1})}const xu=.2,ku=.14,Eu=.12;function ge(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${xu})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${ku})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Eu})`].join(",")}const Nu=["none",ge(0,2,1,-1,0,1,1,0,0,1,3,0),ge(0,3,1,-2,0,2,2,0,0,1,5,0),ge(0,3,3,-2,0,3,4,0,0,1,8,0),ge(0,2,4,-1,0,4,5,0,0,1,10,0),ge(0,3,5,-1,0,5,8,0,0,1,14,0),ge(0,3,5,-1,0,6,10,0,0,1,18,0),ge(0,4,5,-2,0,7,10,1,0,2,16,1),ge(0,5,5,-3,0,8,10,1,0,3,14,2),ge(0,5,6,-3,0,9,12,1,0,3,16,2),ge(0,6,6,-3,0,10,14,1,0,4,18,3),ge(0,6,7,-4,0,11,15,1,0,4,20,3),ge(0,7,8,-4,0,12,17,2,0,5,22,4),ge(0,7,8,-4,0,13,19,2,0,5,24,4),ge(0,7,9,-4,0,14,21,2,0,5,26,4),ge(0,8,9,-5,0,15,22,2,0,6,28,5),ge(0,8,10,-5,0,16,24,2,0,6,30,5),ge(0,8,11,-5,0,17,26,2,0,6,32,5),ge(0,9,11,-5,0,18,28,2,0,7,34,6),ge(0,9,12,-6,0,19,29,2,0,7,36,6),ge(0,10,13,-6,0,20,31,3,0,8,38,7),ge(0,10,13,-6,0,21,33,3,0,8,40,7),ge(0,10,14,-6,0,22,35,3,0,8,42,7),ge(0,11,14,-7,0,23,36,3,0,9,44,8),ge(0,11,15,-7,0,24,38,3,0,9,46,8)],Tu=Nu,Cu=["duration","easing","delay"],Su={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Ou={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Va(e){return`${Math.round(e)}ms`}function ju(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Ru(e){const t=R({},Su,e.easing),r=R({},Ou,e.duration);return R({getAutoHeightDuration:ju,create:(o=["all"],a={})=>{const{duration:s=r.standard,easing:c=t.easeInOut,delay:p=0}=a,u=me(a,Cu);if(process.env.NODE_ENV!=="production"){const m=g=>typeof g=="string",v=g=>!isNaN(parseFloat(g));!m(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!v(s)&&!m(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),m(c)||console.error('MUI: Argument "easing" must be a string.'),!v(p)&&!m(p)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(m=>`${m} ${typeof s=="string"?s:Va(s)} ${c} ${typeof p=="string"?p:Va(p)}`).join(",")}},e,{easing:t,duration:r})}const Pu={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},$u=Pu,_u=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Mu(e={},...t){const{mixins:r={},palette:n={},transitions:o={},typography:a={}}=e,s=me(e,_u);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Zt(18));const c=bu(n),p=Io(e);let u=ct(p,{mixins:eu(p.breakpoints,r),palette:c,shadows:Tu.slice(),typography:wu(c,a),transitions:Ru(o),zIndex:R({},$u)});if(u=ct(u,s),u=t.reduce((m,v)=>ct(m,v),u),process.env.NODE_ENV!=="production"){const m=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],v=(g,d)=>{let h;for(h in g){const f=g[h];if(m.indexOf(h)!==-1&&Object.keys(f).length>0){if(process.env.NODE_ENV!=="production"){const b=nt("",h);console.error([`MUI: The \`${d}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(g,null,2),"",`Instead, you need to use the '&.${b}' syntax:`,JSON.stringify({root:{[`&.${b}`]:f}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}g[h]={}}}};Object.keys(u.components).forEach(g=>{const d=u.components[g].styleOverrides;d&&g.indexOf("Mui")===0&&v(d,g)})}return u.unstable_sxConfig=R({},_o,s==null?void 0:s.unstable_sxConfig),u.unstable_sx=function(v){return Mo({sx:v,theme:this})},u}const Iu=Mu(),Ao=Iu,Bo="$$material";function mt({props:e,name:t}){return Yd({props:e,name:t,defaultTheme:Ao,themeId:Bo})}const hi=e=>an(e)&&e!=="classes",Du=Wd({themeId:Bo,defaultTheme:Ao,rootShouldForwardProp:hi}),je=Du;function Au(e){return nt("MuiSvgIcon",e)}wt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Bu=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Lu=e=>{const{color:t,fontSize:r,classes:n}=e,o={root:["root",t!=="inherit"&&`color${et(t)}`,`fontSize${et(r)}`]};return ft(o,Au,n)},Fu=je("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.color!=="inherit"&&t[`color${et(r.color)}`],t[`fontSize${et(r.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var r,n,o,a,s,c,p,u,m,v,g,d,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(r=e.transitions)==null||(n=r.create)==null?void 0:n.call(r,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((c=e.typography)==null||(p=c.pxToRem)==null?void 0:p.call(c,24))||"1.5rem",large:((u=e.typography)==null||(m=u.pxToRem)==null?void 0:m.call(u,35))||"2.1875rem"}[t.fontSize],color:(v=(g=(e.vars||e).palette)==null||(g=g[t.color])==null?void 0:g.main)!=null?v:{action:(d=(e.vars||e).palette)==null||(d=d.action)==null?void 0:d.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),Lo=T.forwardRef(function(t,r){const n=mt({props:t,name:"MuiSvgIcon"}),{children:o,className:a,color:s="inherit",component:c="svg",fontSize:p="medium",htmlColor:u,inheritViewBox:m=!1,titleAccess:v,viewBox:g="0 0 24 24"}=n,d=me(n,Bu),h=T.isValidElement(o)&&o.type==="svg",f=R({},n,{color:s,component:c,fontSize:p,instanceFontSize:t.fontSize,inheritViewBox:m,viewBox:g,hasSvgAsChild:h}),b={};m||(b.viewBox=g);const x=Lu(f);return l.jsxs(Fu,R({as:c,className:Ce(x.root,a),focusable:"false",color:u,"aria-hidden":v?void 0:!0,role:v?"img":void 0,ref:r},b,d,h&&o.props,{ownerState:f,children:[h?o.props.children:o,v?l.jsx("title",{children:v}):null]}))});process.env.NODE_ENV!=="production"&&(Lo.propTypes={children:i.node,classes:i.object,className:i.string,color:i.oneOfType([i.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),i.string]),component:i.elementType,fontSize:i.oneOfType([i.oneOf(["inherit","large","medium","small"]),i.string]),htmlColor:i.string,inheritViewBox:i.bool,shapeRendering:i.string,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),titleAccess:i.string,viewBox:i.string});Lo.muiName="SvgIcon";const za=Lo;function gi(e,t){function r(n,o){return l.jsx(za,R({"data-testid":`${t}Icon`,ref:o},n,{children:e}))}return process.env.NODE_ENV!=="production"&&(r.displayName=`${t}Icon`),r.muiName=za.muiName,T.memo(T.forwardRef(r))}const Vu={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),li.configure(e)}},zu=Object.freeze(Object.defineProperty({__proto__:null,capitalize:et,createChainedFunction:io,createSvgIcon:gi,debounce:Qs,deprecatedPropType:vp,isMuiElement:yp,ownerDocument:Oe,ownerWindow:Qt,requirePropFactory:wp,setRef:un,unstable_ClassNameGenerator:Vu,unstable_useEnhancedEffect:It,unstable_useId:ei,unsupportedProp:Ep,useControlled:ti,useEventCallback:$r,useForkRef:qe,useIsFocusVisible:ri},Symbol.toStringTag,{value:"Module"})),Uu=Kc(zu);var Ua;function Hu(){return Ua||(Ua=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Uu}(Ln)),Ln}var Gu=Jc;Object.defineProperty(Oo,"__esModule",{value:!0});var bi=Oo.default=void 0,qu=Gu(Hu()),Wu=l;bi=Oo.default=(0,qu.default)((0,Wu.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function vi(e){return typeof e=="string"}function kr(e,t,r){return e===void 0||vi(e)?t:R({},t,{ownerState:R({},t.ownerState,r)})}const Xu={disableDefaultClasses:!1},Yu=T.createContext(Xu);function Ku(e){const{disableDefaultClasses:t}=T.useContext(Yu);return r=>t?"":e(r)}function yi(e,t=[]){if(e===void 0)return{};const r={};return Object.keys(e).filter(n=>n.match(/^on[A-Z]/)&&typeof e[n]=="function"&&!t.includes(n)).forEach(n=>{r[n]=e[n]}),r}function Ju(e,t,r){return typeof e=="function"?e(t,r):e}function Ha(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(r=>!(r.match(/^on[A-Z]/)&&typeof e[r]=="function")).forEach(r=>{t[r]=e[r]}),t}function Zu(e){const{getSlotProps:t,additionalProps:r,externalSlotProps:n,externalForwardedProps:o,className:a}=e;if(!t){const d=Ce(r==null?void 0:r.className,a,o==null?void 0:o.className,n==null?void 0:n.className),h=R({},r==null?void 0:r.style,o==null?void 0:o.style,n==null?void 0:n.style),f=R({},r,o,n);return d.length>0&&(f.className=d),Object.keys(h).length>0&&(f.style=h),{props:f,internalRef:void 0}}const s=yi(R({},o,n)),c=Ha(n),p=Ha(o),u=t(s),m=Ce(u==null?void 0:u.className,r==null?void 0:r.className,a,o==null?void 0:o.className,n==null?void 0:n.className),v=R({},u==null?void 0:u.style,r==null?void 0:r.style,o==null?void 0:o.style,n==null?void 0:n.style),g=R({},u,r,p,c);return m.length>0&&(g.className=m),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:u.ref}}const Qu=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function At(e){var t;const{elementType:r,externalSlotProps:n,ownerState:o,skipResolvingSlotProps:a=!1}=e,s=me(e,Qu),c=a?{}:Ju(n,o),{props:p,internalRef:u}=Zu(R({},s,{externalSlotProps:c})),m=qe(u,c==null?void 0:c.ref,(t=e.additionalProps)==null?void 0:t.ref);return kr(r,R({},p,{ref:m}),o)}const wi="base";function ef(e){return`${wi}--${e}`}function tf(e,t){return`${wi}-${e}-${t}`}function xi(e,t){const r=ci[t];return r?ef(r):tf(e,t)}function rf(e,t){const r={};return t.forEach(n=>{r[n]=xi(e,n)}),r}const nf=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function of(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function af(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=n=>e.ownerDocument.querySelector(`input[type="radio"]${n}`);let r=t(`[name="${e.name}"]:checked`);return r||(r=t(`[name="${e.name}"]`)),r!==e}function sf(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||af(e))}function lf(e){const t=[],r=[];return Array.from(e.querySelectorAll(nf)).forEach((n,o)=>{const a=of(n);a===-1||!sf(n)||(a===0?t.push(n):r.push({documentOrder:o,tabIndex:a,node:n}))}),r.sort((n,o)=>n.tabIndex===o.tabIndex?n.documentOrder-o.documentOrder:n.tabIndex-o.tabIndex).map(n=>n.node).concat(t)}function cf(){return!0}function hn(e){const{children:t,disableAutoFocus:r=!1,disableEnforceFocus:n=!1,disableRestoreFocus:o=!1,getTabbable:a=lf,isEnabled:s=cf,open:c}=e,p=T.useRef(!1),u=T.useRef(null),m=T.useRef(null),v=T.useRef(null),g=T.useRef(null),d=T.useRef(!1),h=T.useRef(null),f=qe(t.ref,h),b=T.useRef(null);T.useEffect(()=>{!c||!h.current||(d.current=!r)},[r,c]),T.useEffect(()=>{if(!c||!h.current)return;const w=Oe(h.current);return h.current.contains(w.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),d.current&&h.current.focus()),()=>{o||(v.current&&v.current.focus&&(p.current=!0,v.current.focus()),v.current=null)}},[c]),T.useEffect(()=>{if(!c||!h.current)return;const w=Oe(h.current),k=C=>{b.current=C,!(n||!s()||C.key!=="Tab")&&w.activeElement===h.current&&C.shiftKey&&(p.current=!0,m.current&&m.current.focus())},y=()=>{const C=h.current;if(C===null)return;if(!w.hasFocus()||!s()||p.current){p.current=!1;return}if(C.contains(w.activeElement)||n&&w.activeElement!==u.current&&w.activeElement!==m.current)return;if(w.activeElement!==g.current)g.current=null;else if(g.current!==null)return;if(!d.current)return;let I=[];if((w.activeElement===u.current||w.activeElement===m.current)&&(I=a(h.current)),I.length>0){var A,L;const E=!!((A=b.current)!=null&&A.shiftKey&&((L=b.current)==null?void 0:L.key)==="Tab"),O=I[0],$=I[I.length-1];typeof O!="string"&&typeof $!="string"&&(E?$.focus():O.focus())}else C.focus()};w.addEventListener("focusin",y),w.addEventListener("keydown",k,!0);const S=setInterval(()=>{w.activeElement&&w.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(S),w.removeEventListener("focusin",y),w.removeEventListener("keydown",k,!0)}},[r,n,o,s,c,a]);const x=w=>{v.current===null&&(v.current=w.relatedTarget),d.current=!0,g.current=w.target;const k=t.props.onFocus;k&&k(w)},P=w=>{v.current===null&&(v.current=w.relatedTarget),d.current=!0};return l.jsxs(T.Fragment,{children:[l.jsx("div",{tabIndex:c?0:-1,onFocus:P,ref:u,"data-testid":"sentinelStart"}),T.cloneElement(t,{ref:f,onFocus:x}),l.jsx("div",{tabIndex:c?0:-1,onFocus:P,ref:m,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(hn.propTypes={children:Ur,disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableRestoreFocus:i.bool,getTabbable:i.func,isEnabled:i.func,open:i.bool.isRequired});process.env.NODE_ENV!=="production"&&(hn["propTypes"]=Js(hn.propTypes));function pf(e){return typeof e=="function"?e():e}const Mr=T.forwardRef(function(t,r){const{children:n,container:o,disablePortal:a=!1}=t,[s,c]=T.useState(null),p=qe(T.isValidElement(n)?n.ref:null,r);if(It(()=>{a||c(pf(o)||document.body)},[o,a]),It(()=>{if(s&&!a)return un(r,s),()=>{un(r,null)}},[r,s,a]),a){if(T.isValidElement(n)){const u={ref:p};return T.cloneElement(n,u)}return l.jsx(T.Fragment,{children:n})}return l.jsx(T.Fragment,{children:s&&ic.createPortal(n,s)})});process.env.NODE_ENV!=="production"&&(Mr.propTypes={children:i.node,container:i.oneOfType([pt,i.func]),disablePortal:i.bool});process.env.NODE_ENV!=="production"&&(Mr["propTypes"]=Js(Mr.propTypes));function df(e){const t=Oe(e);return t.body===e?Qt(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function Cr(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Ga(e){return parseInt(Qt(e).getComputedStyle(e).paddingRight,10)||0}function uf(e){const r=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,n=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return r||n}function qa(e,t,r,n,o){const a=[t,r,...n];[].forEach.call(e.children,s=>{const c=a.indexOf(s)===-1,p=!uf(s);c&&p&&Cr(s,o)})}function Xn(e,t){let r=-1;return e.some((n,o)=>t(n)?(r=o,!0):!1),r}function ff(e,t){const r=[],n=e.container;if(!t.disableScrollLock){if(df(n)){const s=ni(Oe(n));r.push({value:n.style.paddingRight,property:"padding-right",el:n}),n.style.paddingRight=`${Ga(n)+s}px`;const c=Oe(n).querySelectorAll(".mui-fixed");[].forEach.call(c,p=>{r.push({value:p.style.paddingRight,property:"padding-right",el:p}),p.style.paddingRight=`${Ga(p)+s}px`})}let a;if(n.parentNode instanceof DocumentFragment)a=Oe(n).body;else{const s=n.parentElement,c=Qt(n);a=(s==null?void 0:s.nodeName)==="HTML"&&c.getComputedStyle(s).overflowY==="scroll"?s:n}r.push({value:a.style.overflow,property:"overflow",el:a},{value:a.style.overflowX,property:"overflow-x",el:a},{value:a.style.overflowY,property:"overflow-y",el:a}),a.style.overflow="hidden"}return()=>{r.forEach(({value:a,el:s,property:c})=>{a?s.style.setProperty(c,a):s.style.removeProperty(c)})}}function mf(e){const t=[];return[].forEach.call(e.children,r=>{r.getAttribute("aria-hidden")==="true"&&t.push(r)}),t}class hf{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,r){let n=this.modals.indexOf(t);if(n!==-1)return n;n=this.modals.length,this.modals.push(t),t.modalRef&&Cr(t.modalRef,!1);const o=mf(r);qa(r,t.mount,t.modalRef,o,!0);const a=Xn(this.containers,s=>s.container===r);return a!==-1?(this.containers[a].modals.push(t),n):(this.containers.push({modals:[t],container:r,restore:null,hiddenSiblings:o}),n)}mount(t,r){const n=Xn(this.containers,a=>a.modals.indexOf(t)!==-1),o=this.containers[n];o.restore||(o.restore=ff(o,r))}remove(t,r=!0){const n=this.modals.indexOf(t);if(n===-1)return n;const o=Xn(this.containers,s=>s.modals.indexOf(t)!==-1),a=this.containers[o];if(a.modals.splice(a.modals.indexOf(t),1),this.modals.splice(n,1),a.modals.length===0)a.restore&&a.restore(),t.modalRef&&Cr(t.modalRef,r),qa(a.container,t.mount,t.modalRef,a.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=a.modals[a.modals.length-1];s.modalRef&&Cr(s.modalRef,!1)}return n}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function gf(e){return typeof e=="function"?e():e}function bf(e){return e?e.props.hasOwnProperty("in"):!1}const vf=new hf;function yf(e){const{container:t,disableEscapeKeyDown:r=!1,disableScrollLock:n=!1,manager:o=vf,closeAfterTransition:a=!1,onTransitionEnter:s,onTransitionExited:c,children:p,onClose:u,open:m,rootRef:v}=e,g=T.useRef({}),d=T.useRef(null),h=T.useRef(null),f=qe(h,v),[b,x]=T.useState(!m),P=bf(p);let w=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(w=!1);const k=()=>Oe(d.current),y=()=>(g.current.modalRef=h.current,g.current.mount=d.current,g.current),S=()=>{o.mount(y(),{disableScrollLock:n}),h.current&&(h.current.scrollTop=0)},C=$r(()=>{const _=gf(t)||k().body;o.add(y(),_),h.current&&S()}),I=T.useCallback(()=>o.isTopModal(y()),[o]),A=$r(_=>{d.current=_,_&&(m&&I()?S():h.current&&Cr(h.current,w))}),L=T.useCallback(()=>{o.remove(y(),w)},[w,o]);T.useEffect(()=>()=>{L()},[L]),T.useEffect(()=>{m?C():(!P||!a)&&L()},[m,L,P,a,C]);const E=_=>z=>{var ee;(ee=_.onKeyDown)==null||ee.call(_,z),!(z.key!=="Escape"||z.which===229||!I())&&(r||(z.stopPropagation(),u&&u(z,"escapeKeyDown")))},O=_=>z=>{var ee;(ee=_.onClick)==null||ee.call(_,z),z.target===z.currentTarget&&u&&u(z,"backdropClick")};return{getRootProps:(_={})=>{const z=yi(e);delete z.onTransitionEnter,delete z.onTransitionExited;const ee=R({},z,_);return R({role:"presentation"},ee,{onKeyDown:E(ee),ref:f})},getBackdropProps:(_={})=>{const z=_;return R({"aria-hidden":!0},z,{onClick:O(z),open:m})},getTransitionProps:()=>{const _=()=>{x(!1),s&&s()},z=()=>{x(!0),c&&c(),a&&L()};return{onEnter:io(_,p==null?void 0:p.props.onEnter),onExited:io(z,p==null?void 0:p.props.onExited)}},rootRef:f,portalRef:A,isTopModal:I,exited:b,hasTransition:P}}var _e="top",We="bottom",Xe="right",Me="left",Fo="auto",Wr=[_e,We,Xe,Me],er="start",Ir="end",wf="clippingParents",ki="viewport",hr="popper",xf="reference",Wa=Wr.reduce(function(e,t){return e.concat([t+"-"+er,t+"-"+Ir])},[]),Ei=[].concat(Wr,[Fo]).reduce(function(e,t){return e.concat([t,t+"-"+er,t+"-"+Ir])},[]),kf="beforeRead",Ef="read",Nf="afterRead",Tf="beforeMain",Cf="main",Sf="afterMain",Of="beforeWrite",jf="write",Rf="afterWrite",Pf=[kf,Ef,Nf,Tf,Cf,Sf,Of,jf,Rf];function tt(e){return e?(e.nodeName||"").toLowerCase():null}function ze(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Bt(e){var t=ze(e).Element;return e instanceof t||e instanceof Element}function Ge(e){var t=ze(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Vo(e){if(typeof ShadowRoot>"u")return!1;var t=ze(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function $f(e){var t=e.state;Object.keys(t.elements).forEach(function(r){var n=t.styles[r]||{},o=t.attributes[r]||{},a=t.elements[r];!Ge(a)||!tt(a)||(Object.assign(a.style,n),Object.keys(o).forEach(function(s){var c=o[s];c===!1?a.removeAttribute(s):a.setAttribute(s,c===!0?"":c)}))})}function _f(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,r.popper),t.styles=r,t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach(function(n){var o=t.elements[n],a=t.attributes[n]||{},s=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:r[n]),c=s.reduce(function(p,u){return p[u]="",p},{});!Ge(o)||!tt(o)||(Object.assign(o.style,c),Object.keys(a).forEach(function(p){o.removeAttribute(p)}))})}}const Mf={name:"applyStyles",enabled:!0,phase:"write",fn:$f,effect:_f,requires:["computeStyles"]};function Ze(e){return e.split("-")[0]}var $t=Math.max,gn=Math.min,tr=Math.round;function po(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ni(){return!/^((?!chrome|android).)*safari/i.test(po())}function rr(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!1);var n=e.getBoundingClientRect(),o=1,a=1;t&&Ge(e)&&(o=e.offsetWidth>0&&tr(n.width)/e.offsetWidth||1,a=e.offsetHeight>0&&tr(n.height)/e.offsetHeight||1);var s=Bt(e)?ze(e):window,c=s.visualViewport,p=!Ni()&&r,u=(n.left+(p&&c?c.offsetLeft:0))/o,m=(n.top+(p&&c?c.offsetTop:0))/a,v=n.width/o,g=n.height/a;return{width:v,height:g,top:m,right:u+v,bottom:m+g,left:u,x:u,y:m}}function zo(e){var t=rr(e),r=e.offsetWidth,n=e.offsetHeight;return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:n}}function Ti(e,t){var r=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(r&&Vo(r)){var n=t;do{if(n&&e.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function ut(e){return ze(e).getComputedStyle(e)}function If(e){return["table","td","th"].indexOf(tt(e))>=0}function kt(e){return((Bt(e)?e.ownerDocument:e.document)||window.document).documentElement}function $n(e){return tt(e)==="html"?e:e.assignedSlot||e.parentNode||(Vo(e)?e.host:null)||kt(e)}function Xa(e){return!Ge(e)||ut(e).position==="fixed"?null:e.offsetParent}function Df(e){var t=/firefox/i.test(po()),r=/Trident/i.test(po());if(r&&Ge(e)){var n=ut(e);if(n.position==="fixed")return null}var o=$n(e);for(Vo(o)&&(o=o.host);Ge(o)&&["html","body"].indexOf(tt(o))<0;){var a=ut(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function Xr(e){for(var t=ze(e),r=Xa(e);r&&If(r)&&ut(r).position==="static";)r=Xa(r);return r&&(tt(r)==="html"||tt(r)==="body"&&ut(r).position==="static")?t:r||Df(e)||t}function Uo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Sr(e,t,r){return $t(e,gn(t,r))}function Af(e,t,r){var n=Sr(e,t,r);return n>r?r:n}function Ci(){return{top:0,right:0,bottom:0,left:0}}function Si(e){return Object.assign({},Ci(),e)}function Oi(e,t){return t.reduce(function(r,n){return r[n]=e,r},{})}var Bf=function(t,r){return t=typeof t=="function"?t(Object.assign({},r.rects,{placement:r.placement})):t,Si(typeof t!="number"?t:Oi(t,Wr))};function Lf(e){var t,r=e.state,n=e.name,o=e.options,a=r.elements.arrow,s=r.modifiersData.popperOffsets,c=Ze(r.placement),p=Uo(c),u=[Me,Xe].indexOf(c)>=0,m=u?"height":"width";if(!(!a||!s)){var v=Bf(o.padding,r),g=zo(a),d=p==="y"?_e:Me,h=p==="y"?We:Xe,f=r.rects.reference[m]+r.rects.reference[p]-s[p]-r.rects.popper[m],b=s[p]-r.rects.reference[p],x=Xr(a),P=x?p==="y"?x.clientHeight||0:x.clientWidth||0:0,w=f/2-b/2,k=v[d],y=P-g[m]-v[h],S=P/2-g[m]/2+w,C=Sr(k,S,y),I=p;r.modifiersData[n]=(t={},t[I]=C,t.centerOffset=C-S,t)}}function Ff(e){var t=e.state,r=e.options,n=r.element,o=n===void 0?"[data-popper-arrow]":n;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Ti(t.elements.popper,o)&&(t.elements.arrow=o))}const Vf={name:"arrow",enabled:!0,phase:"main",fn:Lf,effect:Ff,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function nr(e){return e.split("-")[1]}var zf={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Uf(e,t){var r=e.x,n=e.y,o=t.devicePixelRatio||1;return{x:tr(r*o)/o||0,y:tr(n*o)/o||0}}function Ya(e){var t,r=e.popper,n=e.popperRect,o=e.placement,a=e.variation,s=e.offsets,c=e.position,p=e.gpuAcceleration,u=e.adaptive,m=e.roundOffsets,v=e.isFixed,g=s.x,d=g===void 0?0:g,h=s.y,f=h===void 0?0:h,b=typeof m=="function"?m({x:d,y:f}):{x:d,y:f};d=b.x,f=b.y;var x=s.hasOwnProperty("x"),P=s.hasOwnProperty("y"),w=Me,k=_e,y=window;if(u){var S=Xr(r),C="clientHeight",I="clientWidth";if(S===ze(r)&&(S=kt(r),ut(S).position!=="static"&&c==="absolute"&&(C="scrollHeight",I="scrollWidth")),S=S,o===_e||(o===Me||o===Xe)&&a===Ir){k=We;var A=v&&S===y&&y.visualViewport?y.visualViewport.height:S[C];f-=A-n.height,f*=p?1:-1}if(o===Me||(o===_e||o===We)&&a===Ir){w=Xe;var L=v&&S===y&&y.visualViewport?y.visualViewport.width:S[I];d-=L-n.width,d*=p?1:-1}}var E=Object.assign({position:c},u&&zf),O=m===!0?Uf({x:d,y:f},ze(r)):{x:d,y:f};if(d=O.x,f=O.y,p){var $;return Object.assign({},E,($={},$[k]=P?"0":"",$[w]=x?"0":"",$.transform=(y.devicePixelRatio||1)<=1?"translate("+d+"px, "+f+"px)":"translate3d("+d+"px, "+f+"px, 0)",$))}return Object.assign({},E,(t={},t[k]=P?f+"px":"",t[w]=x?d+"px":"",t.transform="",t))}function Hf(e){var t=e.state,r=e.options,n=r.gpuAcceleration,o=n===void 0?!0:n,a=r.adaptive,s=a===void 0?!0:a,c=r.roundOffsets,p=c===void 0?!0:c,u={placement:Ze(t.placement),variation:nr(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Ya(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:p})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Ya(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:p})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Gf={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Hf,data:{}};var tn={passive:!0};function qf(e){var t=e.state,r=e.instance,n=e.options,o=n.scroll,a=o===void 0?!0:o,s=n.resize,c=s===void 0?!0:s,p=ze(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&u.forEach(function(m){m.addEventListener("scroll",r.update,tn)}),c&&p.addEventListener("resize",r.update,tn),function(){a&&u.forEach(function(m){m.removeEventListener("scroll",r.update,tn)}),c&&p.removeEventListener("resize",r.update,tn)}}const Wf={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:qf,data:{}};var Xf={left:"right",right:"left",bottom:"top",top:"bottom"};function ln(e){return e.replace(/left|right|bottom|top/g,function(t){return Xf[t]})}var Yf={start:"end",end:"start"};function Ka(e){return e.replace(/start|end/g,function(t){return Yf[t]})}function Ho(e){var t=ze(e),r=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:r,scrollTop:n}}function Go(e){return rr(kt(e)).left+Ho(e).scrollLeft}function Kf(e,t){var r=ze(e),n=kt(e),o=r.visualViewport,a=n.clientWidth,s=n.clientHeight,c=0,p=0;if(o){a=o.width,s=o.height;var u=Ni();(u||!u&&t==="fixed")&&(c=o.offsetLeft,p=o.offsetTop)}return{width:a,height:s,x:c+Go(e),y:p}}function Jf(e){var t,r=kt(e),n=Ho(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=$t(r.scrollWidth,r.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=$t(r.scrollHeight,r.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),c=-n.scrollLeft+Go(e),p=-n.scrollTop;return ut(o||r).direction==="rtl"&&(c+=$t(r.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:c,y:p}}function qo(e){var t=ut(e),r=t.overflow,n=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(r+o+n)}function ji(e){return["html","body","#document"].indexOf(tt(e))>=0?e.ownerDocument.body:Ge(e)&&qo(e)?e:ji($n(e))}function Or(e,t){var r;t===void 0&&(t=[]);var n=ji(e),o=n===((r=e.ownerDocument)==null?void 0:r.body),a=ze(n),s=o?[a].concat(a.visualViewport||[],qo(n)?n:[]):n,c=t.concat(s);return o?c:c.concat(Or($n(s)))}function uo(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Zf(e,t){var r=rr(e,!1,t==="fixed");return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}function Ja(e,t,r){return t===ki?uo(Kf(e,r)):Bt(t)?Zf(t,r):uo(Jf(kt(e)))}function Qf(e){var t=Or($n(e)),r=["absolute","fixed"].indexOf(ut(e).position)>=0,n=r&&Ge(e)?Xr(e):e;return Bt(n)?t.filter(function(o){return Bt(o)&&Ti(o,n)&&tt(o)!=="body"}):[]}function em(e,t,r,n){var o=t==="clippingParents"?Qf(e):[].concat(t),a=[].concat(o,[r]),s=a[0],c=a.reduce(function(p,u){var m=Ja(e,u,n);return p.top=$t(m.top,p.top),p.right=gn(m.right,p.right),p.bottom=gn(m.bottom,p.bottom),p.left=$t(m.left,p.left),p},Ja(e,s,n));return c.width=c.right-c.left,c.height=c.bottom-c.top,c.x=c.left,c.y=c.top,c}function Ri(e){var t=e.reference,r=e.element,n=e.placement,o=n?Ze(n):null,a=n?nr(n):null,s=t.x+t.width/2-r.width/2,c=t.y+t.height/2-r.height/2,p;switch(o){case _e:p={x:s,y:t.y-r.height};break;case We:p={x:s,y:t.y+t.height};break;case Xe:p={x:t.x+t.width,y:c};break;case Me:p={x:t.x-r.width,y:c};break;default:p={x:t.x,y:t.y}}var u=o?Uo(o):null;if(u!=null){var m=u==="y"?"height":"width";switch(a){case er:p[u]=p[u]-(t[m]/2-r[m]/2);break;case Ir:p[u]=p[u]+(t[m]/2-r[m]/2);break}}return p}function Dr(e,t){t===void 0&&(t={});var r=t,n=r.placement,o=n===void 0?e.placement:n,a=r.strategy,s=a===void 0?e.strategy:a,c=r.boundary,p=c===void 0?wf:c,u=r.rootBoundary,m=u===void 0?ki:u,v=r.elementContext,g=v===void 0?hr:v,d=r.altBoundary,h=d===void 0?!1:d,f=r.padding,b=f===void 0?0:f,x=Si(typeof b!="number"?b:Oi(b,Wr)),P=g===hr?xf:hr,w=e.rects.popper,k=e.elements[h?P:g],y=em(Bt(k)?k:k.contextElement||kt(e.elements.popper),p,m,s),S=rr(e.elements.reference),C=Ri({reference:S,element:w,strategy:"absolute",placement:o}),I=uo(Object.assign({},w,C)),A=g===hr?I:S,L={top:y.top-A.top+x.top,bottom:A.bottom-y.bottom+x.bottom,left:y.left-A.left+x.left,right:A.right-y.right+x.right},E=e.modifiersData.offset;if(g===hr&&E){var O=E[o];Object.keys(L).forEach(function($){var V=[Xe,We].indexOf($)>=0?1:-1,H=[_e,We].indexOf($)>=0?"y":"x";L[$]+=O[H]*V})}return L}function tm(e,t){t===void 0&&(t={});var r=t,n=r.placement,o=r.boundary,a=r.rootBoundary,s=r.padding,c=r.flipVariations,p=r.allowedAutoPlacements,u=p===void 0?Ei:p,m=nr(n),v=m?c?Wa:Wa.filter(function(h){return nr(h)===m}):Wr,g=v.filter(function(h){return u.indexOf(h)>=0});g.length===0&&(g=v);var d=g.reduce(function(h,f){return h[f]=Dr(e,{placement:f,boundary:o,rootBoundary:a,padding:s})[Ze(f)],h},{});return Object.keys(d).sort(function(h,f){return d[h]-d[f]})}function rm(e){if(Ze(e)===Fo)return[];var t=ln(e);return[Ka(e),t,Ka(t)]}function nm(e){var t=e.state,r=e.options,n=e.name;if(!t.modifiersData[n]._skip){for(var o=r.mainAxis,a=o===void 0?!0:o,s=r.altAxis,c=s===void 0?!0:s,p=r.fallbackPlacements,u=r.padding,m=r.boundary,v=r.rootBoundary,g=r.altBoundary,d=r.flipVariations,h=d===void 0?!0:d,f=r.allowedAutoPlacements,b=t.options.placement,x=Ze(b),P=x===b,w=p||(P||!h?[ln(b)]:rm(b)),k=[b].concat(w).reduce(function(G,q){return G.concat(Ze(q)===Fo?tm(t,{placement:q,boundary:m,rootBoundary:v,padding:u,flipVariations:h,allowedAutoPlacements:f}):q)},[]),y=t.rects.reference,S=t.rects.popper,C=new Map,I=!0,A=k[0],L=0;L<k.length;L++){var E=k[L],O=Ze(E),$=nr(E)===er,V=[_e,We].indexOf(O)>=0,H=V?"width":"height",_=Dr(t,{placement:E,boundary:m,rootBoundary:v,altBoundary:g,padding:u}),z=V?$?Xe:Me:$?We:_e;y[H]>S[H]&&(z=ln(z));var ee=ln(z),Z=[];if(a&&Z.push(_[O]<=0),c&&Z.push(_[z]<=0,_[ee]<=0),Z.every(function(G){return G})){A=E,I=!1;break}C.set(E,Z)}if(I)for(var j=h?3:1,M=function(q){var Y=k.find(function(K){var W=C.get(K);if(W)return W.slice(0,q).every(function(J){return J})});if(Y)return A=Y,"break"},U=j;U>0;U--){var X=M(U);if(X==="break")break}t.placement!==A&&(t.modifiersData[n]._skip=!0,t.placement=A,t.reset=!0)}}const om={name:"flip",enabled:!0,phase:"main",fn:nm,requiresIfExists:["offset"],data:{_skip:!1}};function Za(e,t,r){return r===void 0&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function Qa(e){return[_e,Xe,We,Me].some(function(t){return e[t]>=0})}function am(e){var t=e.state,r=e.name,n=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,s=Dr(t,{elementContext:"reference"}),c=Dr(t,{altBoundary:!0}),p=Za(s,n),u=Za(c,o,a),m=Qa(p),v=Qa(u);t.modifiersData[r]={referenceClippingOffsets:p,popperEscapeOffsets:u,isReferenceHidden:m,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":m,"data-popper-escaped":v})}const sm={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:am};function im(e,t,r){var n=Ze(e),o=[Me,_e].indexOf(n)>=0?-1:1,a=typeof r=="function"?r(Object.assign({},t,{placement:e})):r,s=a[0],c=a[1];return s=s||0,c=(c||0)*o,[Me,Xe].indexOf(n)>=0?{x:c,y:s}:{x:s,y:c}}function lm(e){var t=e.state,r=e.options,n=e.name,o=r.offset,a=o===void 0?[0,0]:o,s=Ei.reduce(function(m,v){return m[v]=im(v,t.rects,a),m},{}),c=s[t.placement],p=c.x,u=c.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=p,t.modifiersData.popperOffsets.y+=u),t.modifiersData[n]=s}const cm={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:lm};function pm(e){var t=e.state,r=e.name;t.modifiersData[r]=Ri({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const dm={name:"popperOffsets",enabled:!0,phase:"read",fn:pm,data:{}};function um(e){return e==="x"?"y":"x"}function fm(e){var t=e.state,r=e.options,n=e.name,o=r.mainAxis,a=o===void 0?!0:o,s=r.altAxis,c=s===void 0?!1:s,p=r.boundary,u=r.rootBoundary,m=r.altBoundary,v=r.padding,g=r.tether,d=g===void 0?!0:g,h=r.tetherOffset,f=h===void 0?0:h,b=Dr(t,{boundary:p,rootBoundary:u,padding:v,altBoundary:m}),x=Ze(t.placement),P=nr(t.placement),w=!P,k=Uo(x),y=um(k),S=t.modifiersData.popperOffsets,C=t.rects.reference,I=t.rects.popper,A=typeof f=="function"?f(Object.assign({},t.rects,{placement:t.placement})):f,L=typeof A=="number"?{mainAxis:A,altAxis:A}:Object.assign({mainAxis:0,altAxis:0},A),E=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,O={x:0,y:0};if(S){if(a){var $,V=k==="y"?_e:Me,H=k==="y"?We:Xe,_=k==="y"?"height":"width",z=S[k],ee=z+b[V],Z=z-b[H],j=d?-I[_]/2:0,M=P===er?C[_]:I[_],U=P===er?-I[_]:-C[_],X=t.elements.arrow,G=d&&X?zo(X):{width:0,height:0},q=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Ci(),Y=q[V],K=q[H],W=Sr(0,C[_],G[_]),J=w?C[_]/2-j-W-Y-L.mainAxis:M-W-Y-L.mainAxis,Q=w?-C[_]/2+j+W+K+L.mainAxis:U+W+K+L.mainAxis,se=t.elements.arrow&&Xr(t.elements.arrow),B=se?k==="y"?se.clientTop||0:se.clientLeft||0:0,te=($=E==null?void 0:E[k])!=null?$:0,D=z+J-te-B,ie=z+Q-te,Ne=Sr(d?gn(ee,D):ee,z,d?$t(Z,ie):Z);S[k]=Ne,O[k]=Ne-z}if(c){var Re,xe=k==="x"?_e:Me,Et=k==="x"?We:Xe,Pe=S[y],ot=y==="y"?"height":"width",Ae=Pe+b[xe],at=Pe-b[Et],Te=[_e,Me].indexOf(x)!==-1,Lt=(Re=E==null?void 0:E[y])!=null?Re:0,Nt=Te?Ae:Pe-C[ot]-I[ot]-Lt+L.altAxis,ir=Te?Pe+C[ot]+I[ot]-Lt-L.altAxis:at,Kr=d&&Te?Af(Nt,Pe,ir):Sr(d?Nt:Ae,Pe,d?ir:at);S[y]=Kr,O[y]=Kr-Pe}t.modifiersData[n]=O}}const mm={name:"preventOverflow",enabled:!0,phase:"main",fn:fm,requiresIfExists:["offset"]};function hm(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function gm(e){return e===ze(e)||!Ge(e)?Ho(e):hm(e)}function bm(e){var t=e.getBoundingClientRect(),r=tr(t.width)/e.offsetWidth||1,n=tr(t.height)/e.offsetHeight||1;return r!==1||n!==1}function vm(e,t,r){r===void 0&&(r=!1);var n=Ge(t),o=Ge(t)&&bm(t),a=kt(t),s=rr(e,o,r),c={scrollLeft:0,scrollTop:0},p={x:0,y:0};return(n||!n&&!r)&&((tt(t)!=="body"||qo(a))&&(c=gm(t)),Ge(t)?(p=rr(t,!0),p.x+=t.clientLeft,p.y+=t.clientTop):a&&(p.x=Go(a))),{x:s.left+c.scrollLeft-p.x,y:s.top+c.scrollTop-p.y,width:s.width,height:s.height}}function ym(e){var t=new Map,r=new Set,n=[];e.forEach(function(a){t.set(a.name,a)});function o(a){r.add(a.name);var s=[].concat(a.requires||[],a.requiresIfExists||[]);s.forEach(function(c){if(!r.has(c)){var p=t.get(c);p&&o(p)}}),n.push(a)}return e.forEach(function(a){r.has(a.name)||o(a)}),n}function wm(e){var t=ym(e);return Pf.reduce(function(r,n){return r.concat(t.filter(function(o){return o.phase===n}))},[])}function xm(e){var t;return function(){return t||(t=new Promise(function(r){Promise.resolve().then(function(){t=void 0,r(e())})})),t}}function km(e){var t=e.reduce(function(r,n){var o=r[n.name];return r[n.name]=o?Object.assign({},o,n,{options:Object.assign({},o.options,n.options),data:Object.assign({},o.data,n.data)}):n,r},{});return Object.keys(t).map(function(r){return t[r]})}var es={placement:"bottom",modifiers:[],strategy:"absolute"};function ts(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function Em(e){e===void 0&&(e={});var t=e,r=t.defaultModifiers,n=r===void 0?[]:r,o=t.defaultOptions,a=o===void 0?es:o;return function(c,p,u){u===void 0&&(u=a);var m={placement:"bottom",orderedModifiers:[],options:Object.assign({},es,a),modifiersData:{},elements:{reference:c,popper:p},attributes:{},styles:{}},v=[],g=!1,d={state:m,setOptions:function(x){var P=typeof x=="function"?x(m.options):x;f(),m.options=Object.assign({},a,m.options,P),m.scrollParents={reference:Bt(c)?Or(c):c.contextElement?Or(c.contextElement):[],popper:Or(p)};var w=wm(km([].concat(n,m.options.modifiers)));return m.orderedModifiers=w.filter(function(k){return k.enabled}),h(),d.update()},forceUpdate:function(){if(!g){var x=m.elements,P=x.reference,w=x.popper;if(ts(P,w)){m.rects={reference:vm(P,Xr(w),m.options.strategy==="fixed"),popper:zo(w)},m.reset=!1,m.placement=m.options.placement,m.orderedModifiers.forEach(function(L){return m.modifiersData[L.name]=Object.assign({},L.data)});for(var k=0;k<m.orderedModifiers.length;k++){if(m.reset===!0){m.reset=!1,k=-1;continue}var y=m.orderedModifiers[k],S=y.fn,C=y.options,I=C===void 0?{}:C,A=y.name;typeof S=="function"&&(m=S({state:m,options:I,name:A,instance:d})||m)}}}},update:xm(function(){return new Promise(function(b){d.forceUpdate(),b(m)})}),destroy:function(){f(),g=!0}};if(!ts(c,p))return d;d.setOptions(u).then(function(b){!g&&u.onFirstUpdate&&u.onFirstUpdate(b)});function h(){m.orderedModifiers.forEach(function(b){var x=b.name,P=b.options,w=P===void 0?{}:P,k=b.effect;if(typeof k=="function"){var y=k({state:m,name:x,instance:d,options:w}),S=function(){};v.push(y||S)}})}function f(){v.forEach(function(b){return b()}),v=[]}return d}}var Nm=[Wf,dm,Gf,Mf,cm,om,mm,Vf,sm],Tm=Em({defaultModifiers:Nm});const Pi="Popper";function Cm(e){return xi(Pi,e)}rf(Pi,["root"]);const Sm=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Om=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function jm(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function bn(e){return typeof e=="function"?e():e}function _n(e){return e.nodeType!==void 0}function Rm(e){return!_n(e)}const Pm=()=>ft({root:["root"]},Ku(Cm)),$m={},_m=T.forwardRef(function(t,r){var n;const{anchorEl:o,children:a,direction:s,disablePortal:c,modifiers:p,open:u,placement:m,popperOptions:v,popperRef:g,slotProps:d={},slots:h={},TransitionProps:f}=t,b=me(t,Sm),x=T.useRef(null),P=qe(x,r),w=T.useRef(null),k=qe(w,g),y=T.useRef(k);It(()=>{y.current=k},[k]),T.useImperativeHandle(g,()=>w.current,[]);const S=jm(m,s),[C,I]=T.useState(S),[A,L]=T.useState(bn(o));T.useEffect(()=>{w.current&&w.current.forceUpdate()}),T.useEffect(()=>{o&&L(bn(o))},[o]),It(()=>{if(!A||!u)return;const H=ee=>{I(ee.placement)};if(process.env.NODE_ENV!=="production"&&A&&_n(A)&&A.nodeType===1){const ee=A.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ee.top===0&&ee.left===0&&ee.right===0&&ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let _=[{name:"preventOverflow",options:{altBoundary:c}},{name:"flip",options:{altBoundary:c}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ee})=>{H(ee)}}];p!=null&&(_=_.concat(p)),v&&v.modifiers!=null&&(_=_.concat(v.modifiers));const z=Tm(A,x.current,R({placement:S},v,{modifiers:_}));return y.current(z),()=>{z.destroy(),y.current(null)}},[A,c,p,u,v,S]);const E={placement:C};f!==null&&(E.TransitionProps=f);const O=Pm(),$=(n=h.root)!=null?n:"div",V=At({elementType:$,externalSlotProps:d.root,externalForwardedProps:b,additionalProps:{role:"tooltip",ref:P},ownerState:t,className:O.root});return l.jsx($,R({},V,{children:typeof a=="function"?a(E):a}))}),$i=T.forwardRef(function(t,r){const{anchorEl:n,children:o,container:a,direction:s="ltr",disablePortal:c=!1,keepMounted:p=!1,modifiers:u,open:m,placement:v="bottom",popperOptions:g=$m,popperRef:d,style:h,transition:f=!1,slotProps:b={},slots:x={}}=t,P=me(t,Om),[w,k]=T.useState(!0),y=()=>{k(!1)},S=()=>{k(!0)};if(!p&&!m&&(!f||w))return null;let C;if(a)C=a;else if(n){const L=bn(n);C=L&&_n(L)?Oe(L).body:Oe(null).body}const I=!m&&p&&(!f||w)?"none":void 0,A=f?{in:m,onEnter:y,onExited:S}:void 0;return l.jsx(Mr,{disablePortal:c,container:C,children:l.jsx(_m,R({anchorEl:n,direction:s,disablePortal:c,modifiers:u,ref:r,open:f?!w:m,placement:v,popperOptions:g,popperRef:d,slotProps:b,slots:x},P,{style:R({position:"fixed",top:0,left:0,display:I},h),TransitionProps:A,children:o}))})});process.env.NODE_ENV!=="production"&&($i.propTypes={anchorEl:sr(i.oneOfType([pt,i.object,i.func]),e=>{if(e.open){const t=bn(e.anchorEl);if(t&&_n(t)&&t.nodeType===1){const r=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&r.top===0&&r.left===0&&r.right===0&&r.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Rm(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:i.oneOfType([i.node,i.func]),container:i.oneOfType([pt,i.func]),direction:i.oneOf(["ltr","rtl"]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:Ro,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),transition:i.bool});function Yr(){const e=mi(Ao);return process.env.NODE_ENV!=="production"&&T.useDebugValue(e),e[Bo]||e}function fo(e,t){return fo=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,o){return n.__proto__=o,n},fo(e,t)}function Mm(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,fo(e,t)}const rs={disabled:!1};var Im=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.shape({enter:i.number,exit:i.number,appear:i.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&i.oneOfType([i.string,i.shape({enter:i.string,exit:i.string,active:i.string}),i.shape({enter:i.string,enterDone:i.string,enterActive:i.string,exit:i.string,exitDone:i.string,exitActive:i.string})]);const _i=N.createContext(null);var Dm=function(t){return t.scrollTop},Er="unmounted",Ct="exited",St="entering",Wt="entered",mo="exiting",ht=function(e){Mm(t,e);function t(n,o){var a;a=e.call(this,n,o)||this;var s=o,c=s&&!s.isMounting?n.enter:n.appear,p;return a.appearStatus=null,n.in?c?(p=Ct,a.appearStatus=St):p=Wt:n.unmountOnExit||n.mountOnEnter?p=Er:p=Ct,a.state={status:p},a.nextCallback=null,a}t.getDerivedStateFromProps=function(o,a){var s=o.in;return s&&a.status===Er?{status:Ct}:null};var r=t.prototype;return r.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},r.componentDidUpdate=function(o){var a=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==St&&s!==Wt&&(a=St):(s===St||s===Wt)&&(a=mo)}this.updateStatus(!1,a)},r.componentWillUnmount=function(){this.cancelNextCallback()},r.getTimeouts=function(){var o=this.props.timeout,a,s,c;return a=s=c=o,o!=null&&typeof o!="number"&&(a=o.exit,s=o.enter,c=o.appear!==void 0?o.appear:s),{exit:a,enter:s,appear:c}},r.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===St){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:yr.findDOMNode(this);s&&Dm(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Ct&&this.setState({status:Er})},r.performEnter=function(o){var a=this,s=this.props.enter,c=this.context?this.context.isMounting:o,p=this.props.nodeRef?[c]:[yr.findDOMNode(this),c],u=p[0],m=p[1],v=this.getTimeouts(),g=c?v.appear:v.enter;if(!o&&!s||rs.disabled){this.safeSetState({status:Wt},function(){a.props.onEntered(u)});return}this.props.onEnter(u,m),this.safeSetState({status:St},function(){a.props.onEntering(u,m),a.onTransitionEnd(g,function(){a.safeSetState({status:Wt},function(){a.props.onEntered(u,m)})})})},r.performExit=function(){var o=this,a=this.props.exit,s=this.getTimeouts(),c=this.props.nodeRef?void 0:yr.findDOMNode(this);if(!a||rs.disabled){this.safeSetState({status:Ct},function(){o.props.onExited(c)});return}this.props.onExit(c),this.safeSetState({status:mo},function(){o.props.onExiting(c),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:Ct},function(){o.props.onExited(c)})})})},r.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},r.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},r.setNextCallback=function(o){var a=this,s=!0;return this.nextCallback=function(c){s&&(s=!1,a.nextCallback=null,o(c))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},r.onTransitionEnd=function(o,a){this.setNextCallback(a);var s=this.props.nodeRef?this.props.nodeRef.current:yr.findDOMNode(this),c=o==null&&!this.props.addEndListener;if(!s||c){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var p=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],u=p[0],m=p[1];this.props.addEndListener(u,m)}o!=null&&setTimeout(this.nextCallback,o)},r.render=function(){var o=this.state.status;if(o===Er)return null;var a=this.props,s=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var c=me(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return N.createElement(_i.Provider,{value:null},typeof s=="function"?s(o,c):N.cloneElement(N.Children.only(s),c))},t}(N.Component);ht.contextType=_i;ht.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:i.shape({current:typeof Element>"u"?i.any:function(e,t,r,n,o,a){var s=e[t];return i.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,r,n,o,a)}}),children:i.oneOfType([i.func.isRequired,i.element.isRequired]).isRequired,in:i.bool,mountOnEnter:i.bool,unmountOnExit:i.bool,appear:i.bool,enter:i.bool,exit:i.bool,timeout:function(t){var r=Im;t.addEndListener||(r=r.isRequired);for(var n=arguments.length,o=new Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=arguments[a];return r.apply(void 0,[t].concat(o))},addEndListener:i.func,onEnter:i.func,onEntering:i.func,onEntered:i.func,onExit:i.func,onExiting:i.func,onExited:i.func}:{};function Gt(){}ht.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Gt,onEntering:Gt,onEntered:Gt,onExit:Gt,onExiting:Gt,onExited:Gt};ht.UNMOUNTED=Er;ht.EXITED=Ct;ht.ENTERING=St;ht.ENTERED=Wt;ht.EXITING=mo;const Mi=ht,Ii=e=>e.scrollTop;function vn(e,t){var r,n;const{timeout:o,easing:a,style:s={}}=e;return{duration:(r=s.transitionDuration)!=null?r:typeof o=="number"?o:o[t.mode]||0,easing:(n=s.transitionTimingFunction)!=null?n:typeof a=="object"?a[t.mode]:a,delay:s.transitionDelay}}const Am=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function ho(e){return`scale(${e}, ${e**2})`}const Bm={entering:{opacity:1,transform:ho(1)},entered:{opacity:1,transform:"none"}},Yn=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Wo=T.forwardRef(function(t,r){const{addEndListener:n,appear:o=!0,children:a,easing:s,in:c,onEnter:p,onEntered:u,onEntering:m,onExit:v,onExited:g,onExiting:d,style:h,timeout:f="auto",TransitionComponent:b=Mi}=t,x=me(t,Am),P=xr(),w=T.useRef(),k=Yr(),y=T.useRef(null),S=qe(y,a.ref,r),C=H=>_=>{if(H){const z=y.current;_===void 0?H(z):H(z,_)}},I=C(m),A=C((H,_)=>{Ii(H);const{duration:z,delay:ee,easing:Z}=vn({style:h,timeout:f,easing:s},{mode:"enter"});let j;f==="auto"?(j=k.transitions.getAutoHeightDuration(H.clientHeight),w.current=j):j=z,H.style.transition=[k.transitions.create("opacity",{duration:j,delay:ee}),k.transitions.create("transform",{duration:Yn?j:j*.666,delay:ee,easing:Z})].join(","),p&&p(H,_)}),L=C(u),E=C(d),O=C(H=>{const{duration:_,delay:z,easing:ee}=vn({style:h,timeout:f,easing:s},{mode:"exit"});let Z;f==="auto"?(Z=k.transitions.getAutoHeightDuration(H.clientHeight),w.current=Z):Z=_,H.style.transition=[k.transitions.create("opacity",{duration:Z,delay:z}),k.transitions.create("transform",{duration:Yn?Z:Z*.666,delay:Yn?z:z||Z*.333,easing:ee})].join(","),H.style.opacity=0,H.style.transform=ho(.75),v&&v(H)}),$=C(g),V=H=>{f==="auto"&&P.start(w.current||0,H),n&&n(y.current,H)};return l.jsx(b,R({appear:o,in:c,nodeRef:y,onEnter:A,onEntered:L,onEntering:I,onExit:O,onExited:$,onExiting:E,addEndListener:V,timeout:f==="auto"?null:f},x,{children:(H,_)=>T.cloneElement(a,R({style:R({opacity:0,transform:ho(.75),visibility:H==="exited"&&!c?"hidden":void 0},Bm[H],h,a.props.style),ref:S},_))}))});process.env.NODE_ENV!=="production"&&(Wo.propTypes={addEndListener:i.func,appear:i.bool,children:Ur.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});Wo.muiSupportAuto=!0;const go=Wo,Lm=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},ns=Lm,Fm=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Vm=je($i,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Di=T.forwardRef(function(t,r){var n;const o=fi(),a=mt({props:t,name:"MuiPopper"}),{anchorEl:s,component:c,components:p,componentsProps:u,container:m,disablePortal:v,keepMounted:g,modifiers:d,open:h,placement:f,popperOptions:b,popperRef:x,transition:P,slots:w,slotProps:k}=a,y=me(a,Fm),S=(n=w==null?void 0:w.root)!=null?n:p==null?void 0:p.Root,C=R({anchorEl:s,container:m,disablePortal:v,keepMounted:g,modifiers:d,open:h,placement:f,popperOptions:b,popperRef:x,transition:P},y);return l.jsx(Vm,R({as:c,direction:o==null?void 0:o.direction,slots:{root:S},slotProps:k??u},C,{ref:r}))});process.env.NODE_ENV!=="production"&&(Di.propTypes={anchorEl:i.oneOfType([pt,i.object,i.func]),children:i.oneOfType([i.node,i.func]),component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:Ro,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transition:i.bool});const Ai=Di;function zm(e){return nt("MuiTooltip",e)}const Um=wt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),yt=Um,Hm=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Gm(e){return Math.round(e*1e5)/1e5}const qm=e=>{const{classes:t,disableInteractive:r,arrow:n,touch:o,placement:a}=e,s={popper:["popper",!r&&"popperInteractive",n&&"popperArrow"],tooltip:["tooltip",n&&"tooltipArrow",o&&"touch",`tooltipPlacement${et(a.split("-")[0])}`],arrow:["arrow"]};return ft(s,zm,t)},Wm=je(Ai,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.popper,!r.disableInteractive&&t.popperInteractive,r.arrow&&t.popperArrow,!r.open&&t.popperClose]}})(({theme:e,ownerState:t,open:r})=>R({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!r&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${yt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${yt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${yt.arrow}`]:R({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${yt.arrow}`]:R({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Xm=je("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.tooltip,r.touch&&t.touch,r.arrow&&t.tooltipArrow,t[`tooltipPlacement${et(r.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>R({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:mn(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Gm(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${yt.popper}[data-popper-placement*="left"] &`]:R({transformOrigin:"right center"},t.isRtl?R({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):R({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${yt.popper}[data-popper-placement*="right"] &`]:R({transformOrigin:"left center"},t.isRtl?R({marginRight:"14px"},t.touch&&{marginRight:"24px"}):R({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${yt.popper}[data-popper-placement*="top"] &`]:R({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${yt.popper}[data-popper-placement*="bottom"] &`]:R({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Ym=je("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:mn(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let rn=!1;const os=new Hr;let gr={x:0,y:0};function nn(e,t){return r=>{t&&t(r),e(r)}}const Bi=T.forwardRef(function(t,r){var n,o,a,s,c,p,u,m,v,g,d,h,f,b,x,P,w,k,y;const S=mt({props:t,name:"MuiTooltip"}),{arrow:C=!1,children:I,components:A={},componentsProps:L={},describeChild:E=!1,disableFocusListener:O=!1,disableHoverListener:$=!1,disableInteractive:V=!1,disableTouchListener:H=!1,enterDelay:_=100,enterNextDelay:z=0,enterTouchDelay:ee=700,followCursor:Z=!1,id:j,leaveDelay:M=0,leaveTouchDelay:U=1500,onClose:X,onOpen:G,open:q,placement:Y="bottom",PopperComponent:K,PopperProps:W={},slotProps:J={},slots:Q={},title:se,TransitionComponent:B=go,TransitionProps:te}=S,D=me(S,Hm),ie=T.isValidElement(I)?I:l.jsx("span",{children:I}),Ne=Yr(),Re=Ne.direction==="rtl",[xe,Et]=T.useState(),[Pe,ot]=T.useState(null),Ae=T.useRef(!1),at=V||Z,Te=xr(),Lt=xr(),Nt=xr(),ir=xr(),[Kr,Qo]=ti({controlled:q,default:!1,name:"Tooltip",state:"open"});let st=Kr;if(process.env.NODE_ENV!=="production"){const{current:re}=T.useRef(q!==void 0);T.useEffect(()=>{xe&&xe.disabled&&!re&&se!==""&&xe.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[se,xe,re])}const Mn=ei(j),lr=T.useRef(),Jr=$r(()=>{lr.current!==void 0&&(document.body.style.WebkitUserSelect=lr.current,lr.current=void 0),ir.clear()});T.useEffect(()=>Jr,[Jr]);const ea=re=>{os.clear(),rn=!0,Qo(!0),G&&!st&&G(re)},Zr=$r(re=>{os.start(800+M,()=>{rn=!1}),Qo(!1),X&&st&&X(re),Te.start(Ne.transitions.duration.shortest,()=>{Ae.current=!1})}),In=re=>{Ae.current&&re.type!=="touchstart"||(xe&&xe.removeAttribute("title"),Lt.clear(),Nt.clear(),_||rn&&z?Lt.start(rn?z:_,()=>{ea(re)}):ea(re))},ta=re=>{Lt.clear(),Nt.start(M,()=>{Zr(re)})},{isFocusVisibleRef:ra,onBlur:Fl,onFocus:Vl,ref:zl}=ri(),[,na]=T.useState(!1),oa=re=>{Fl(re),ra.current===!1&&(na(!1),ta(re))},aa=re=>{xe||Et(re.currentTarget),Vl(re),ra.current===!0&&(na(!0),In(re))},sa=re=>{Ae.current=!0;const Be=ie.props;Be.onTouchStart&&Be.onTouchStart(re)},ia=In,la=ta,Ul=re=>{sa(re),Nt.clear(),Te.clear(),Jr(),lr.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",ir.start(ee,()=>{document.body.style.WebkitUserSelect=lr.current,In(re)})},Hl=re=>{ie.props.onTouchEnd&&ie.props.onTouchEnd(re),Jr(),Nt.start(U,()=>{Zr(re)})};T.useEffect(()=>{if(!st)return;function re(Be){(Be.key==="Escape"||Be.key==="Esc")&&Zr(Be)}return document.addEventListener("keydown",re),()=>{document.removeEventListener("keydown",re)}},[Zr,st]);const Gl=qe(ie.ref,zl,Et,r);!se&&se!==0&&(st=!1);const Dn=T.useRef(),ql=re=>{const Be=ie.props;Be.onMouseMove&&Be.onMouseMove(re),gr={x:re.clientX,y:re.clientY},Dn.current&&Dn.current.update()},cr={},An=typeof se=="string";E?(cr.title=!st&&An&&!$?se:null,cr["aria-describedby"]=st?Mn:null):(cr["aria-label"]=An?se:null,cr["aria-labelledby"]=st&&!An?Mn:null);const Ue=R({},cr,D,ie.props,{className:Ce(D.className,ie.props.className),onTouchStart:sa,ref:Gl},Z?{onMouseMove:ql}:{});process.env.NODE_ENV!=="production"&&(Ue["data-mui-internal-clone-element"]=!0,T.useEffect(()=>{xe&&!xe.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[xe]));const pr={};H||(Ue.onTouchStart=Ul,Ue.onTouchEnd=Hl),$||(Ue.onMouseOver=nn(ia,Ue.onMouseOver),Ue.onMouseLeave=nn(la,Ue.onMouseLeave),at||(pr.onMouseOver=ia,pr.onMouseLeave=la)),O||(Ue.onFocus=nn(aa,Ue.onFocus),Ue.onBlur=nn(oa,Ue.onBlur),at||(pr.onFocus=aa,pr.onBlur=oa)),process.env.NODE_ENV!=="production"&&ie.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ie.props.title}\` or the Tooltip component.`].join(`
`));const Wl=T.useMemo(()=>{var re;let Be=[{name:"arrow",enabled:!!Pe,options:{element:Pe,padding:4}}];return(re=W.popperOptions)!=null&&re.modifiers&&(Be=Be.concat(W.popperOptions.modifiers)),R({},W.popperOptions,{modifiers:Be})},[Pe,W]),dr=R({},S,{isRtl:Re,arrow:C,disableInteractive:at,placement:Y,PopperComponentProp:K,touch:Ae.current}),Bn=qm(dr),ca=(n=(o=Q.popper)!=null?o:A.Popper)!=null?n:Wm,pa=(a=(s=(c=Q.transition)!=null?c:A.Transition)!=null?s:B)!=null?a:go,da=(p=(u=Q.tooltip)!=null?u:A.Tooltip)!=null?p:Xm,ua=(m=(v=Q.arrow)!=null?v:A.Arrow)!=null?m:Ym,Xl=kr(ca,R({},W,(g=J.popper)!=null?g:L.popper,{className:Ce(Bn.popper,W==null?void 0:W.className,(d=(h=J.popper)!=null?h:L.popper)==null?void 0:d.className)}),dr),Yl=kr(pa,R({},te,(f=J.transition)!=null?f:L.transition),dr),Kl=kr(da,R({},(b=J.tooltip)!=null?b:L.tooltip,{className:Ce(Bn.tooltip,(x=(P=J.tooltip)!=null?P:L.tooltip)==null?void 0:x.className)}),dr),Jl=kr(ua,R({},(w=J.arrow)!=null?w:L.arrow,{className:Ce(Bn.arrow,(k=(y=J.arrow)!=null?y:L.arrow)==null?void 0:k.className)}),dr);return l.jsxs(T.Fragment,{children:[T.cloneElement(ie,Ue),l.jsx(ca,R({as:K??Ai,placement:Y,anchorEl:Z?{getBoundingClientRect:()=>({top:gr.y,left:gr.x,right:gr.x,bottom:gr.y,width:0,height:0})}:xe,popperRef:Dn,open:xe?st:!1,id:Mn,transition:!0},pr,Xl,{popperOptions:Wl,children:({TransitionProps:re})=>l.jsx(pa,R({timeout:Ne.transitions.duration.shorter},re,Yl,{children:l.jsxs(da,R({},Kl,{children:[se,C?l.jsx(ua,R({},Jl,{ref:ot})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Bi.propTypes={arrow:i.bool,children:Ur.isRequired,classes:i.object,className:i.string,components:i.shape({Arrow:i.elementType,Popper:i.elementType,Tooltip:i.elementType,Transition:i.elementType}),componentsProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),describeChild:i.bool,disableFocusListener:i.bool,disableHoverListener:i.bool,disableInteractive:i.bool,disableTouchListener:i.bool,enterDelay:i.number,enterNextDelay:i.number,enterTouchDelay:i.number,followCursor:i.bool,id:i.string,leaveDelay:i.number,leaveTouchDelay:i.number,onClose:i.func,onOpen:i.func,open:i.bool,placement:i.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:i.elementType,PopperProps:i.object,slotProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),slots:i.shape({arrow:i.elementType,popper:i.elementType,tooltip:i.elementType,transition:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),title:i.node,TransitionComponent:i.elementType,TransitionProps:i.object});const Km=Bi;function as(e,t,r){return e?l.jsx(Ee.ListItemIcon,{className:`papi-menu-icon-${r?"leading":"trailing"}`,children:l.jsx("img",{src:e,alt:`${r?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Xo(e){const{onClick:t,label:r,tooltip:n,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:s=void 0,hasAutoFocus:c=!1,className:p,isDisabled:u=!1,isDense:m=!0,isSubMenuParent:v=!1,hasDisabledGutters:g=!1,hasDivider:d=!1,focusVisibleClassName:h,id:f,children:b}=e,x=l.jsx(Ee.MenuItem,{sx:{lineHeight:.8},autoFocus:c,className:p,disabled:u,dense:m,disableGutters:g,divider:d,focusVisibleClassName:h,onClick:t,id:f,children:r?l.jsxs(l.Fragment,{children:[as(a,r,!0),l.jsx(Ee.ListItemText,{primary:r,inset:!a&&o}),v?l.jsx(Ee.ListItemIcon,{className:"papi-menu-icon-trailing",children:l.jsx(bi,{})}):as(s,r,!1)]}):b});return n?l.jsx(Km,{title:n,placement:"right",children:l.jsx("div",{children:x})}):x}function Li(e){return Object.entries(e.groups).map(([r,n])=>({id:r,group:n}))}function Jm(e){const[t,r]=N.useState(void 0),{parentMenuItem:n,parentItemProps:o,menuDefinition:a}=e,s=u=>{r(u.currentTarget)},c=()=>{r(void 0)},p=()=>{let u=Li(a).filter(m=>"menuItem"in m.group);if(!(n!=null&&n.id))throw new Error("A valid parent menu item is required for submenus.");return u=u.filter(m=>"menuItem"in m.group&&m.group.menuItem===n.id),l.jsx(Yo,{...e,includedGroups:u})};return l.jsxs(l.Fragment,{children:[l.jsx(Xo,{onClick:s,...o,isSubMenuParent:!0}),l.jsx(Ee.Menu,{anchorEl:t,open:!!t,onClose:c,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:p()},n.id)]})}const Zm=(e,t)=>t.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function Yo(e){const{menuDefinition:t,onClick:r,commandHandler:n,includedGroups:o}=e,{items:a,allowForLeadingIcons:s}=N.useMemo(()=>{const m=o&&o.length>0?o:Li(t).filter(h=>!("menuItem"in h.group)),v=Object.values(m).sort((h,f)=>(h.group.order||0)-(f.group.order||0)),g=[];v.forEach(h=>{Zm(h.id,t.items).forEach(f=>g.push({item:f,isLastItemInGroup:!1})),g.length>0&&(g[g.length-1].isLastItemInGroup=!0)}),g.length>0&&(g[g.length-1].isLastItemInGroup=!1);const d=g.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:g,allowForLeadingIcons:d}},[o,t]),c=({item:m,isLastItemInGroup:v})=>({className:"papi-menu-item",label:m.label,tooltip:m.tooltip,iconPathBefore:"iconPathBefore"in m?m.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in m?m.iconPathAfter:void 0,hasDivider:v,allowForLeadingIcons:s}),[p]=a;if(!p)return l.jsx("div",{});const u=p.item.group;return l.jsx("div",{role:"menu","aria-label":u,children:a.map((m,v)=>{const{item:g}=m,d=c(m);if("command"in g){const h=g.group+v;return l.jsx(Xo,{onClick:f=>{r==null||r(f),n(g)},...d},h)}return l.jsx(Jm,{parentMenuItem:g,parentItemProps:d,...e},u+g.id)})},u)}function Qm(e){const{menuDefinition:t,columnId:r}=e;let a=Object.entries(t.groups).map(([s,c])=>({id:s,group:c})).filter(s=>"column"in s.group);return r&&"columns"in t&&t.columns[r]&&(a=a.filter(s=>"column"in s.group&&s.group.column===r)),l.jsx(Yo,{...e,includedGroups:a})}function eh({commandHandler:e,menuDefinition:t,id:r,metadata:n,onClick:o,className:a}){return l.jsxs(Ee.Grid,{id:r,item:!0,xs:"auto",role:"menu","aria-label":r,className:`papi-menu-column ${a??""}`,children:[l.jsx("h3",{"aria-label":n.label,className:`papi-menu-column-header ${a??""}`,children:n.label}),l.jsx(Ee.List,{id:r,dense:!0,className:a??"",children:l.jsx(Qm,{commandHandler:e,menuDefinition:t,columnId:r,onClick:o})})]})}function Fi({commandHandler:e,className:t,multiColumnMenu:r,id:n}){const{columns:o}=r,a=N.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(c=>{if(c==="isExtensible")return;const p=c,u=o[p];typeof u=="object"&&typeof u.order=="number"&&!Number.isNaN(u.order)?s.set(u.order,{id:p,metadata:u}):console.warn(`Property ${c} (${typeof u}) on menu ${n} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((c,p)=>(c.metadata.order||0)-(p.metadata.order||0))},[o,n]);return l.jsx(Ee.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:n,children:a.map((s,c)=>l.jsx(eh,{commandHandler:e,menuDefinition:r,...s,className:t},c))})}const Vi=T.createContext({});process.env.NODE_ENV!=="production"&&(Vi.displayName="ListContext");const th=Vi;function rh(e){return nt("MuiList",e)}wt("MuiList",["root","padding","dense","subheader"]);const nh=["children","className","component","dense","disablePadding","subheader"],oh=e=>{const{classes:t,disablePadding:r,dense:n,subheader:o}=e;return ft({root:["root",!r&&"padding",n&&"dense",o&&"subheader"]},rh,t)},ah=je("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,!r.disablePadding&&t.padding,r.dense&&t.dense,r.subheader&&t.subheader]}})(({ownerState:e})=>R({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),zi=T.forwardRef(function(t,r){const n=mt({props:t,name:"MuiList"}),{children:o,className:a,component:s="ul",dense:c=!1,disablePadding:p=!1,subheader:u}=n,m=me(n,nh),v=T.useMemo(()=>({dense:c}),[c]),g=R({},n,{component:s,dense:c,disablePadding:p}),d=oh(g);return l.jsx(th.Provider,{value:v,children:l.jsxs(ah,R({as:s,className:Ce(d.root,a),ref:r,ownerState:g},m,{children:[u,o]}))})});process.env.NODE_ENV!=="production"&&(zi.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,dense:i.bool,disablePadding:i.bool,subheader:i.node,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const sh=zi,ih=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Kn(e,t,r){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:r?null:e.firstChild}function ss(e,t,r){return e===t?r?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:r?null:e.lastChild}function Ui(e,t){if(t===void 0)return!0;let r=e.innerText;return r===void 0&&(r=e.textContent),r=r.trim().toLowerCase(),r.length===0?!1:t.repeating?r[0]===t.keys[0]:r.indexOf(t.keys.join(""))===0}function br(e,t,r,n,o,a){let s=!1,c=o(e,t,t?r:!1);for(;c;){if(c===e.firstChild){if(s)return!1;s=!0}const p=n?!1:c.disabled||c.getAttribute("aria-disabled")==="true";if(!c.hasAttribute("tabindex")||!Ui(c,a)||p)c=o(e,c,r);else return c.focus(),!0}return!1}const Hi=T.forwardRef(function(t,r){const{actions:n,autoFocus:o=!1,autoFocusItem:a=!1,children:s,className:c,disabledItemsFocusable:p=!1,disableListWrap:u=!1,onKeyDown:m,variant:v="selectedMenu"}=t,g=me(t,ih),d=T.useRef(null),h=T.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});It(()=>{o&&d.current.focus()},[o]),T.useImperativeHandle(n,()=>({adjustStyleForScrollbar:(w,k)=>{const y=!d.current.style.width;if(w.clientHeight<d.current.clientHeight&&y){const S=`${ni(Oe(w))}px`;d.current.style[k.direction==="rtl"?"paddingLeft":"paddingRight"]=S,d.current.style.width=`calc(100% + ${S})`}return d.current}}),[]);const f=w=>{const k=d.current,y=w.key,S=Oe(k).activeElement;if(y==="ArrowDown")w.preventDefault(),br(k,S,u,p,Kn);else if(y==="ArrowUp")w.preventDefault(),br(k,S,u,p,ss);else if(y==="Home")w.preventDefault(),br(k,null,u,p,Kn);else if(y==="End")w.preventDefault(),br(k,null,u,p,ss);else if(y.length===1){const C=h.current,I=y.toLowerCase(),A=performance.now();C.keys.length>0&&(A-C.lastTime>500?(C.keys=[],C.repeating=!0,C.previousKeyMatched=!0):C.repeating&&I!==C.keys[0]&&(C.repeating=!1)),C.lastTime=A,C.keys.push(I);const L=S&&!C.repeating&&Ui(S,C);C.previousKeyMatched&&(L||br(k,S,!1,p,Kn,C))?w.preventDefault():C.previousKeyMatched=!1}m&&m(w)},b=qe(d,r);let x=-1;T.Children.forEach(s,(w,k)=>{if(!T.isValidElement(w)){x===k&&(x+=1,x>=s.length&&(x=-1));return}process.env.NODE_ENV!=="production"&&dn.isFragment(w)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),w.props.disabled||(v==="selectedMenu"&&w.props.selected||x===-1)&&(x=k),x===k&&(w.props.disabled||w.props.muiSkipListHighlight||w.type.muiSkipListHighlight)&&(x+=1,x>=s.length&&(x=-1))});const P=T.Children.map(s,(w,k)=>{if(k===x){const y={};return a&&(y.autoFocus=!0),w.props.tabIndex===void 0&&v==="selectedMenu"&&(y.tabIndex=0),T.cloneElement(w,y)}return w});return l.jsx(sh,R({role:"menu",ref:b,className:c,onKeyDown:f,tabIndex:o?0:-1},g,{children:P}))});process.env.NODE_ENV!=="production"&&(Hi.propTypes={autoFocus:i.bool,autoFocusItem:i.bool,children:i.node,className:i.string,disabledItemsFocusable:i.bool,disableListWrap:i.bool,onKeyDown:i.func,variant:i.oneOf(["menu","selectedMenu"])});const lh=Hi,ch=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],ph={entering:{opacity:1},entered:{opacity:1}},Gi=T.forwardRef(function(t,r){const n=Yr(),o={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:a,appear:s=!0,children:c,easing:p,in:u,onEnter:m,onEntered:v,onEntering:g,onExit:d,onExited:h,onExiting:f,style:b,timeout:x=o,TransitionComponent:P=Mi}=t,w=me(t,ch),k=T.useRef(null),y=qe(k,c.ref,r),S=V=>H=>{if(V){const _=k.current;H===void 0?V(_):V(_,H)}},C=S(g),I=S((V,H)=>{Ii(V);const _=vn({style:b,timeout:x,easing:p},{mode:"enter"});V.style.webkitTransition=n.transitions.create("opacity",_),V.style.transition=n.transitions.create("opacity",_),m&&m(V,H)}),A=S(v),L=S(f),E=S(V=>{const H=vn({style:b,timeout:x,easing:p},{mode:"exit"});V.style.webkitTransition=n.transitions.create("opacity",H),V.style.transition=n.transitions.create("opacity",H),d&&d(V)}),O=S(h),$=V=>{a&&a(k.current,V)};return l.jsx(P,R({appear:s,in:u,nodeRef:k,onEnter:I,onEntered:A,onEntering:C,onExit:E,onExited:O,onExiting:L,addEndListener:$,timeout:x},w,{children:(V,H)=>T.cloneElement(c,R({style:R({opacity:0,visibility:V==="exited"&&!u?"hidden":void 0},ph[V],b,c.props.style),ref:y},H))}))});process.env.NODE_ENV!=="production"&&(Gi.propTypes={addEndListener:i.func,appear:i.bool,children:Ur.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const dh=Gi;function uh(e){return nt("MuiBackdrop",e)}wt("MuiBackdrop",["root","invisible"]);const fh=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],mh=e=>{const{classes:t,invisible:r}=e;return ft({root:["root",r&&"invisible"]},uh,t)},hh=je("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.invisible&&t.invisible]}})(({ownerState:e})=>R({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),qi=T.forwardRef(function(t,r){var n,o,a;const s=mt({props:t,name:"MuiBackdrop"}),{children:c,className:p,component:u="div",components:m={},componentsProps:v={},invisible:g=!1,open:d,slotProps:h={},slots:f={},TransitionComponent:b=dh,transitionDuration:x}=s,P=me(s,fh),w=R({},s,{component:u,invisible:g}),k=mh(w),y=(n=h.root)!=null?n:v.root;return l.jsx(b,R({in:d,timeout:x},P,{children:l.jsx(hh,R({"aria-hidden":!0},y,{as:(o=(a=f.root)!=null?a:m.Root)!=null?o:u,className:Ce(k.root,p,y==null?void 0:y.className),ownerState:R({},w,y==null?void 0:y.ownerState),classes:k,ref:r,children:c}))}))});process.env.NODE_ENV!=="production"&&(qi.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.object}),invisible:i.bool,open:i.bool.isRequired,slotProps:i.shape({root:i.object}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const gh=qi;function bh(e){return nt("MuiModal",e)}wt("MuiModal",["root","hidden","backdrop"]);const vh=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],yh=e=>{const{open:t,exited:r,classes:n}=e;return ft({root:["root",!t&&r&&"hidden"],backdrop:["backdrop"]},bh,n)},wh=je("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,!r.open&&r.exited&&t.hidden]}})(({theme:e,ownerState:t})=>R({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),xh=je(gh,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Wi=T.forwardRef(function(t,r){var n,o,a,s,c,p;const u=mt({name:"MuiModal",props:t}),{BackdropComponent:m=xh,BackdropProps:v,className:g,closeAfterTransition:d=!1,children:h,container:f,component:b,components:x={},componentsProps:P={},disableAutoFocus:w=!1,disableEnforceFocus:k=!1,disableEscapeKeyDown:y=!1,disablePortal:S=!1,disableRestoreFocus:C=!1,disableScrollLock:I=!1,hideBackdrop:A=!1,keepMounted:L=!1,onBackdropClick:E,open:O,slotProps:$,slots:V}=u,H=me(u,vh),_=R({},u,{closeAfterTransition:d,disableAutoFocus:w,disableEnforceFocus:k,disableEscapeKeyDown:y,disablePortal:S,disableRestoreFocus:C,disableScrollLock:I,hideBackdrop:A,keepMounted:L}),{getRootProps:z,getBackdropProps:ee,getTransitionProps:Z,portalRef:j,isTopModal:M,exited:U,hasTransition:X}=yf(R({},_,{rootRef:r})),G=R({},_,{exited:U}),q=yh(G),Y={};if(h.props.tabIndex===void 0&&(Y.tabIndex="-1"),X){const{onEnter:te,onExited:D}=Z();Y.onEnter=te,Y.onExited=D}const K=(n=(o=V==null?void 0:V.root)!=null?o:x.Root)!=null?n:wh,W=(a=(s=V==null?void 0:V.backdrop)!=null?s:x.Backdrop)!=null?a:m,J=(c=$==null?void 0:$.root)!=null?c:P.root,Q=(p=$==null?void 0:$.backdrop)!=null?p:P.backdrop,se=At({elementType:K,externalSlotProps:J,externalForwardedProps:H,getSlotProps:z,additionalProps:{ref:r,as:b},ownerState:G,className:Ce(g,J==null?void 0:J.className,q==null?void 0:q.root,!G.open&&G.exited&&(q==null?void 0:q.hidden))}),B=At({elementType:W,externalSlotProps:Q,additionalProps:v,getSlotProps:te=>ee(R({},te,{onClick:D=>{E&&E(D),te!=null&&te.onClick&&te.onClick(D)}})),className:Ce(Q==null?void 0:Q.className,v==null?void 0:v.className,q==null?void 0:q.backdrop),ownerState:G});return!L&&!O&&(!X||U)?null:l.jsx(Mr,{ref:j,container:f,disablePortal:S,children:l.jsxs(K,R({},se,{children:[!A&&m?l.jsx(W,R({},B)):null,l.jsx(hn,{disableEnforceFocus:k,disableAutoFocus:w,disableRestoreFocus:C,isEnabled:M,open:O,children:T.cloneElement(h,Y)})]}))})});process.env.NODE_ENV!=="production"&&(Wi.propTypes={BackdropComponent:i.elementType,BackdropProps:i.object,children:Ur.isRequired,classes:i.object,className:i.string,closeAfterTransition:i.bool,component:i.elementType,components:i.shape({Backdrop:i.elementType,Root:i.elementType}),componentsProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableEscapeKeyDown:i.bool,disablePortal:i.bool,disableRestoreFocus:i.bool,disableScrollLock:i.bool,hideBackdrop:i.bool,keepMounted:i.bool,onBackdropClick:i.func,onClose:i.func,onTransitionEnter:i.func,onTransitionExited:i.func,open:i.bool.isRequired,slotProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({backdrop:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const kh=Wi;function Eh(e){return nt("MuiPaper",e)}wt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Nh=["className","component","elevation","square","variant"],Th=e=>{const{square:t,elevation:r,variant:n,classes:o}=e,a={root:["root",n,!t&&"rounded",n==="elevation"&&`elevation${r}`]};return ft(a,Eh,o)},Ch=je("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],!r.square&&t.rounded,r.variant==="elevation"&&t[`elevation${r.elevation}`]]}})(({theme:e,ownerState:t})=>{var r;return R({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&R({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${mn("#fff",ns(t.elevation))}, ${mn("#fff",ns(t.elevation))})`},e.vars&&{backgroundImage:(r=e.vars.overlays)==null?void 0:r[t.elevation]}))}),Xi=T.forwardRef(function(t,r){const n=mt({props:t,name:"MuiPaper"}),{className:o,component:a="div",elevation:s=1,square:c=!1,variant:p="elevation"}=n,u=me(n,Nh),m=R({},n,{component:a,elevation:s,square:c,variant:p}),v=Th(m);return process.env.NODE_ENV!=="production"&&Yr().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),l.jsx(Ch,R({as:a,ownerState:m,className:Ce(v.root,o),ref:r},u))});process.env.NODE_ENV!=="production"&&(Xi.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,elevation:sr(si,e=>{const{elevation:t,variant:r}=e;return t>0&&r==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${r}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:i.bool,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),variant:i.oneOfType([i.oneOf(["elevation","outlined"]),i.string])});const Sh=Xi;function Oh(e){return nt("MuiPopover",e)}wt("MuiPopover",["root","paper"]);const jh=["onEntering"],Rh=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Ph=["slotProps"];function is(e,t){let r=0;return typeof t=="number"?r=t:t==="center"?r=e.height/2:t==="bottom"&&(r=e.height),r}function ls(e,t){let r=0;return typeof t=="number"?r=t:t==="center"?r=e.width/2:t==="right"&&(r=e.width),r}function cs(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function cn(e){return typeof e=="function"?e():e}const $h=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"]},Oh,t)},_h=je(kh,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Yi=je(Sh,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Ki=T.forwardRef(function(t,r){var n,o,a;const s=mt({props:t,name:"MuiPopover"}),{action:c,anchorEl:p,anchorOrigin:u={vertical:"top",horizontal:"left"},anchorPosition:m,anchorReference:v="anchorEl",children:g,className:d,container:h,elevation:f=8,marginThreshold:b=16,open:x,PaperProps:P={},slots:w,slotProps:k,transformOrigin:y={vertical:"top",horizontal:"left"},TransitionComponent:S=go,transitionDuration:C="auto",TransitionProps:{onEntering:I}={},disableScrollLock:A=!1}=s,L=me(s.TransitionProps,jh),E=me(s,Rh),O=(n=k==null?void 0:k.paper)!=null?n:P,$=T.useRef(),V=qe($,O.ref),H=R({},s,{anchorOrigin:u,anchorReference:v,elevation:f,marginThreshold:b,externalPaperSlotProps:O,transformOrigin:y,TransitionComponent:S,transitionDuration:C,TransitionProps:L}),_=$h(H),z=T.useCallback(()=>{if(v==="anchorPosition")return process.env.NODE_ENV!=="production"&&(m||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),m;const te=cn(p),D=te&&te.nodeType===1?te:Oe($.current).body,ie=D.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Ne=D.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Ne.top===0&&Ne.left===0&&Ne.right===0&&Ne.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:ie.top+is(ie,u.vertical),left:ie.left+ls(ie,u.horizontal)}},[p,u.horizontal,u.vertical,m,v]),ee=T.useCallback(te=>({vertical:is(te,y.vertical),horizontal:ls(te,y.horizontal)}),[y.horizontal,y.vertical]),Z=T.useCallback(te=>{const D={width:te.offsetWidth,height:te.offsetHeight},ie=ee(D);if(v==="none")return{top:null,left:null,transformOrigin:cs(ie)};const Ne=z();let Re=Ne.top-ie.vertical,xe=Ne.left-ie.horizontal;const Et=Re+D.height,Pe=xe+D.width,ot=Qt(cn(p)),Ae=ot.innerHeight-b,at=ot.innerWidth-b;if(b!==null&&Re<b){const Te=Re-b;Re-=Te,ie.vertical+=Te}else if(b!==null&&Et>Ae){const Te=Et-Ae;Re-=Te,ie.vertical+=Te}if(process.env.NODE_ENV!=="production"&&D.height>Ae&&D.height&&Ae&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${D.height-Ae}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),b!==null&&xe<b){const Te=xe-b;xe-=Te,ie.horizontal+=Te}else if(Pe>at){const Te=Pe-at;xe-=Te,ie.horizontal+=Te}return{top:`${Math.round(Re)}px`,left:`${Math.round(xe)}px`,transformOrigin:cs(ie)}},[p,v,z,ee,b]),[j,M]=T.useState(x),U=T.useCallback(()=>{const te=$.current;if(!te)return;const D=Z(te);D.top!==null&&(te.style.top=D.top),D.left!==null&&(te.style.left=D.left),te.style.transformOrigin=D.transformOrigin,M(!0)},[Z]);T.useEffect(()=>(A&&window.addEventListener("scroll",U),()=>window.removeEventListener("scroll",U)),[p,A,U]);const X=(te,D)=>{I&&I(te,D),U()},G=()=>{M(!1)};T.useEffect(()=>{x&&U()}),T.useImperativeHandle(c,()=>x?{updatePosition:()=>{U()}}:null,[x,U]),T.useEffect(()=>{if(!x)return;const te=Qs(()=>{U()}),D=Qt(p);return D.addEventListener("resize",te),()=>{te.clear(),D.removeEventListener("resize",te)}},[p,x,U]);let q=C;C==="auto"&&!S.muiSupportAuto&&(q=void 0);const Y=h||(p?Oe(cn(p)).body:void 0),K=(o=w==null?void 0:w.root)!=null?o:_h,W=(a=w==null?void 0:w.paper)!=null?a:Yi,J=At({elementType:W,externalSlotProps:R({},O,{style:j?O.style:R({},O.style,{opacity:0})}),additionalProps:{elevation:f,ref:V},ownerState:H,className:Ce(_.paper,O==null?void 0:O.className)}),Q=At({elementType:K,externalSlotProps:(k==null?void 0:k.root)||{},externalForwardedProps:E,additionalProps:{ref:r,slotProps:{backdrop:{invisible:!0}},container:Y,open:x},ownerState:H,className:Ce(_.root,d)}),{slotProps:se}=Q,B=me(Q,Ph);return l.jsx(K,R({},B,!vi(K)&&{slotProps:se,disableScrollLock:A},{children:l.jsx(S,R({appear:!0,in:x,onEntering:X,onExited:G,timeout:q},L,{children:l.jsx(W,R({},J,{children:g}))}))}))});process.env.NODE_ENV!=="production"&&(Ki.propTypes={action:Ro,anchorEl:sr(i.oneOfType([pt,i.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=cn(e.anchorEl);if(t&&t.nodeType===1){const r=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&r.top===0&&r.left===0&&r.right===0&&r.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),anchorPosition:i.shape({left:i.number.isRequired,top:i.number.isRequired}),anchorReference:i.oneOf(["anchorEl","anchorPosition","none"]),children:i.node,classes:i.object,className:i.string,container:i.oneOfType([pt,i.func]),disableScrollLock:i.bool,elevation:si,marginThreshold:i.number,onClose:i.func,open:i.bool.isRequired,PaperProps:i.shape({component:pp}),slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transformOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object});const Mh=Ki;function Ih(e){return nt("MuiMenu",e)}wt("MuiMenu",["root","paper","list"]);const Dh=["onEntering"],Ah=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Bh={vertical:"top",horizontal:"right"},Lh={vertical:"top",horizontal:"left"},Fh=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"],list:["list"]},Ih,t)},Vh=je(Mh,{shouldForwardProp:e=>hi(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),zh=je(Yi,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),Uh=je(lh,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Ji=T.forwardRef(function(t,r){var n,o;const a=mt({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:c,className:p,disableAutoFocusItem:u=!1,MenuListProps:m={},onClose:v,open:g,PaperProps:d={},PopoverClasses:h,transitionDuration:f="auto",TransitionProps:{onEntering:b}={},variant:x="selectedMenu",slots:P={},slotProps:w={}}=a,k=me(a.TransitionProps,Dh),y=me(a,Ah),S=Yr(),C=S.direction==="rtl",I=R({},a,{autoFocus:s,disableAutoFocusItem:u,MenuListProps:m,onEntering:b,PaperProps:d,transitionDuration:f,TransitionProps:k,variant:x}),A=Fh(I),L=s&&!u&&g,E=T.useRef(null),O=(Z,j)=>{E.current&&E.current.adjustStyleForScrollbar(Z,S),b&&b(Z,j)},$=Z=>{Z.key==="Tab"&&(Z.preventDefault(),v&&v(Z,"tabKeyDown"))};let V=-1;T.Children.map(c,(Z,j)=>{T.isValidElement(Z)&&(process.env.NODE_ENV!=="production"&&dn.isFragment(Z)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Z.props.disabled||(x==="selectedMenu"&&Z.props.selected||V===-1)&&(V=j))});const H=(n=P.paper)!=null?n:zh,_=(o=w.paper)!=null?o:d,z=At({elementType:P.root,externalSlotProps:w.root,ownerState:I,className:[A.root,p]}),ee=At({elementType:H,externalSlotProps:_,ownerState:I,className:A.paper});return l.jsx(Vh,R({onClose:v,anchorOrigin:{vertical:"bottom",horizontal:C?"right":"left"},transformOrigin:C?Bh:Lh,slots:{paper:H,root:P.root},slotProps:{root:z,paper:ee},open:g,ref:r,transitionDuration:f,TransitionProps:R({onEntering:O},k),ownerState:I},y,{classes:h,children:l.jsx(Uh,R({onKeyDown:$,actions:E,autoFocus:s&&(V===-1||u),autoFocusItem:L,variant:x},m,{className:Ce(A.list,m.className),children:c}))}))});process.env.NODE_ENV!=="production"&&(Ji.propTypes={anchorEl:i.oneOfType([pt,i.func]),autoFocus:i.bool,children:i.node,classes:i.object,className:i.string,disableAutoFocusItem:i.bool,MenuListProps:i.object,onClose:i.func,open:i.bool.isRequired,PaperProps:i.object,PopoverClasses:i.object,slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object,variant:i.oneOf(["menu","selectedMenu"])});const Hh=Ji;function Gh({className:e,commandHandler:t,menuDefinition:r,children:n}){var u;const[o,a]=N.useState(void 0),s=N.useCallback(m=>{m.preventDefault(),a(o===void 0?{mouseX:m.clientX+2,mouseY:m.clientY-6}:void 0)},[o]),c=N.useCallback(()=>{a(void 0)},[]),p=N.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((u=r==null?void 0:r.items)==null?void 0:u.length)??0)===0||!n?n:l.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[n,l.jsx(Hh,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:c,anchorReference:"anchorPosition",anchorPosition:p,children:l.jsx(Yo,{menuDefinition:r,commandHandler:t,onClick:c})})]})}function qh(e){return{preserveValue:!0,...e}}const yn=(e,t,r={})=>{const n=N.useRef(t);n.current=t;const o=N.useRef(r);o.current=qh(o.current);const[a,s]=N.useState(()=>n.current),[c,p]=N.useState(!0);return N.useEffect(()=>{let u=!0;return p(!!e),(async()=>{if(e){const m=await e();u&&(s(()=>m),p(!1))}})(),()=>{u=!1,o.current.preserveValue||s(()=>n.current)}},[e]),[a,c]},Wh=gi(l.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Zi({menuProvider:e,normalMenu:t,fullMenu:r,commandHandler:n,containerRef:o,className:a,ariaLabelPrefix:s,children:c}){const[p,u]=N.useState(!1),[m,v]=N.useState(!1),g=N.useCallback(()=>{p&&u(!1),v(!1)},[p]),d=N.useCallback(k=>{k.stopPropagation(),u(y=>{const S=!y;return S&&k.shiftKey?v(!0):S||v(!1),S})},[]),h=N.useCallback(k=>(g(),n(k)),[n,g]),[f,b]=N.useState({top:1,left:1});N.useEffect(()=>{if(p){const k=o==null?void 0:o.current;if(k){const y=k.getBoundingClientRect(),S=window.scrollY,C=window.scrollX,I=y.top+S+k.clientHeight,A=y.left+C;b({top:I,left:A})}}},[p,o]);const[x]=yn(N.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,p]),t),[P]=yn(N.useCallback(async()=>(e==null?void 0:e(!0))??r??x,[e,r,x,p]),r??x),w=m&&P?P:x;return l.jsxs(l.Fragment,{children:[l.jsx(Ee.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:d,children:c??l.jsx(Wh,{})}),l.jsx(Ee.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:p,onClose:g,PaperProps:{className:"papi-menu-drawer-paper",style:{top:f.top,left:f.left}},children:w?l.jsx(Fi,{className:a,id:`${s??""} main menu`,commandHandler:h,multiColumnMenu:w}):void 0})]})}function Xh({id:e,label:t,isDisabled:r=!1,tooltip:n,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:s="medium",className:c,onClick:p,children:u}){return l.jsx(Ee.IconButton,{id:e,disabled:r,edge:a,size:s,"aria-label":t,title:o?void 0:n??t,className:`papi-icon-button ${c??""}`,onClick:p,children:u})}const vt="scrBook",Yh="scrRef",Ot="source",Kh="details",Jh="Scripture Reference",Zh="Scripture Book",Qi="Type",Qh="Details";function eg(e,t){const r=t??!1;return[{accessorFn:n=>`${fe.bookNumberToId(n.start.bookNum)} ${n.start.chapterNum}:${n.start.verseNum}`,id:vt,header:(e==null?void 0:e.scriptureReferenceColumnName)??Jh,cell:n=>{const o=n.row.original;return n.row.getIsGrouped()?fe.bookNumberToEnglishName(o.start.bookNum):n.row.groupingColumnId===vt?Fe.formatScrRef(o.start):void 0},getGroupingValue:n=>n.start.bookNum,sortingFn:(n,o)=>Fe.compareScrRefs(n.original.start,o.original.start),enableGrouping:!0},{accessorFn:n=>Fe.formatScrRef(n.start),id:Yh,header:void 0,cell:n=>{const o=n.row.original;return n.row.getIsGrouped()?void 0:Fe.formatScrRef(o.start)},sortingFn:(n,o)=>Fe.compareScrRefs(n.original.start,o.original.start),enableGrouping:!1},{accessorFn:n=>n.source.displayName,id:Ot,header:r?(e==null?void 0:e.typeColumnName)??Qi:void 0,cell:n=>r||n.row.getIsGrouped()?n.getValue():void 0,getGroupingValue:n=>n.source.id,sortingFn:(n,o)=>n.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:n=>n.detail,id:Kh,header:(e==null?void 0:e.detailsColumnName)??Qh,cell:n=>n.getValue(),enableGrouping:!1}]}function tg({sources:e,showColumnHeaders:t=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:n,scriptureBookGroupName:o,typeColumnName:a,detailsColumnName:s,onRowSelected:c}){const[p,u]=N.useState([]),[m,v]=N.useState([{id:vt,desc:!1}]),[g,d]=N.useState(()=>e.flatMap(E=>{const O=E.source;return E.data.map($=>({...$,source:O}))})),[h,f]=N.useState({});N.useEffect(()=>{d(()=>e.flatMap(E=>{const O=E.source;return E.data.map($=>({...$,source:O}))}))},[e]);const b=N.useMemo(()=>eg({scriptureReferenceColumnName:n,typeColumnName:a,detailsColumnName:s},r),[n,a,s,r]);N.useEffect(()=>{p.includes(Ot)?v([{id:Ot,desc:!1},{id:vt,desc:!1}]):v([{id:vt,desc:!1}])},[p]);const x=N.useCallback((E,O)=>!O||Fe.compareScrRefs(E,O)===0?`${Fe.scrRefToBBBCCCVVV(E)}`:`${Fe.scrRefToBBBCCCVVV(E)}-${Fe.scrRefToBBBCCCVVV(O)}`,[]),P=N.useCallback(E=>`${x(E.start,E.end)} ${E.source} ${E.detail}`,[x]),w=Se.useReactTable({data:g,columns:b,state:{grouping:p,sorting:m,rowSelection:h},onGroupingChange:u,onSortingChange:v,onRowSelectionChange:f,getExpandedRowModel:Se.getExpandedRowModel(),getGroupedRowModel:Se.getGroupedRowModel(),getCoreRowModel:Se.getCoreRowModel(),getSortedRowModel:Se.getSortedRowModel(),getRowId:P,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});N.useEffect(()=>{if(c){const E=w.getSelectedRowModel().rowsById,O=Object.keys(E);if(O.length===1){const $=g.find(V=>P(V)===O[0])||void 0;$&&c($)}}},[h,g,P,c,w]);const k=o??Zh,y=a??Qi,S=[{label:"No Grouping",value:[]},{label:`Group by ${k}`,value:[vt]},{label:`Group by ${y}`,value:[Ot]},{label:`Group by ${k} and ${y}`,value:[vt,Ot]},{label:`Group by ${y} and ${k}`,value:[Ot,vt]}],C=E=>{u(JSON.parse(E))},I=(E,O)=>{!E.getIsGrouped()&&!E.getIsSelected()&&E.getToggleSelectedHandler()(O)},A=(E,O)=>E.getIsGrouped()?"":F("banded-row",O%2===0?"even":"odd"),L=(E,O,$)=>{if(!((E==null?void 0:E.length)===0||O.depth<$.column.getGroupedIndex())){if(O.getIsGrouped())switch(O.depth){case 1:return"pr-ps-4";default:return}switch(O.depth){case 1:return"pr-ps-8";case 2:return"pr-ps-12";default:return}}};return l.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-w-full pr-flex-col",children:[!t&&l.jsxs(Rr,{value:JSON.stringify(p),onValueChange:E=>{C(E)},children:[l.jsx(Yt,{className:"pr-mb-1 pr-mt-2",children:l.jsx(Pr,{})}),l.jsx(Kt,{position:"item-aligned",children:l.jsx(Ps,{children:S.map(E=>l.jsx(Ke,{value:JSON.stringify(E.value),children:E.label},E.label))})})]}),l.jsxs(Fr,{className:"pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0",children:[t&&l.jsx(Vr,{children:w.getHeaderGroups().map(E=>l.jsx(lt,{children:E.headers.filter(O=>O.column.columnDef.header).map(O=>l.jsx(Jt,{colSpan:O.colSpan,className:"top-0 pr-sticky",children:O.isPlaceholder?void 0:l.jsxs("div",{children:[O.column.getCanGroup()?l.jsx(be,{variant:"ghost",title:`Toggle grouping by ${O.column.columnDef.header}`,onClick:O.column.getToggleGroupingHandler(),type:"button",children:O.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Se.flexRender(O.column.columnDef.header,O.getContext())]})},O.id))},E.id))}),l.jsx(zr,{children:w.getRowModel().rows.map((E,O)=>l.jsx(lt,{"data-state":E.getIsSelected()?"selected":"",className:F(A(E,O)),onClick:$=>I(E,$),children:E.getVisibleCells().map($=>{if(!($.getIsPlaceholder()||$.column.columnDef.enableGrouping&&!$.getIsGrouped()&&($.column.columnDef.id!==Ot||!r)))return l.jsx(Mt,{className:F($.column.columnDef.id,"pr-p-[1px]",L(p,E,$)),children:(()=>$.getIsGrouped()?l.jsxs(be,{variant:"ghost",onClick:E.getToggleExpandedHandler(),type:"button",children:[E.getIsExpanded()?"👇":"👉"," ",Se.flexRender($.column.columnDef.cell,$.getContext())," (",E.subRows.length,")"]}):Se.flexRender($.column.columnDef.cell,$.getContext()))()},$.id)})},E.id))})]})]})}const rg=yo.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),Ko=N.forwardRef(({className:e,...t},r)=>l.jsx(ys.Root,{ref:r,className:F(rg(),e),...t}));Ko.displayName=ys.Root.displayName;function el({id:e,isDisabled:t=!1,hasError:r=!1,isFullWidth:n=!1,helperText:o,label:a,placeholder:s,isRequired:c=!1,className:p,defaultValue:u,value:m,onChange:v,onFocus:g,onBlur:d}){return l.jsxs("div",{className:F("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":n}),children:[l.jsx(Ko,{htmlFor:e,className:F({"pr-text-red-600":r,"pr-hidden":!a}),children:`${a}${c?"*":""}`}),l.jsx(Ar,{id:e,disabled:t,placeholder:s,required:c,className:F(p,{"pr-border-red-600":r}),defaultValue:u,value:m,onChange:v,onFocus:g,onBlur:d}),l.jsx("p",{className:F({"pr-hidden":!o}),children:o})]})}function ng({onSearch:e,placeholder:t,isFullWidth:r}){const[n,o]=N.useState(""),a=s=>{o(s),e(s)};return l.jsx(el,{isFullWidth:r,className:"search-bar-input",placeholder:t,value:n,onChange:s=>a(s.target.value)})}function og({id:e,isDisabled:t=!1,orientation:r="horizontal",min:n=0,max:o=100,step:a=1,showMarks:s=!1,defaultValue:c,value:p,valueLabelDisplay:u="off",className:m,onChange:v,onChangeCommitted:g}){return l.jsx(Ee.Slider,{id:e,disabled:t,orientation:r,min:n,max:o,step:a,marks:s,defaultValue:c,value:p,valueLabelDisplay:u,className:`papi-slider ${r} ${m??""}`,onChange:v,onChangeCommitted:g})}function ag({autoHideDuration:e=void 0,id:t,isOpen:r=!1,className:n,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:s,children:c}){const p={action:(s==null?void 0:s.action)||c,message:s==null?void 0:s.message,className:n};return l.jsx(Ee.Snackbar,{autoHideDuration:e??void 0,open:r,onClose:o,anchorOrigin:a,id:t,ContentProps:p})}function sg({id:e,isChecked:t,isDisabled:r=!1,hasError:n=!1,className:o,onChange:a}){return l.jsx(Ee.Switch,{id:e,checked:t,disabled:r,className:`papi-switch ${n?"error":""} ${o??""}`,onChange:a})}function ig({menuProvider:e,commandHandler:t,className:r,id:n,children:o}){const a=N.useRef(void 0);return l.jsx("div",{ref:a,style:{position:"relative"},children:l.jsx(Ee.AppBar,{position:"static",id:n,children:l.jsxs(Ee.Toolbar,{className:`papi-toolbar ${r??""}`,variant:"dense",children:[e?l.jsx(Zi,{commandHandler:t,containerRef:a,menuProvider:e}):void 0,o?l.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const lg=De.Root,tl=N.forwardRef(({className:e,...t},r)=>l.jsx(De.List,{ref:r,className:F("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));tl.displayName=De.List.displayName;const rl=N.forwardRef(({className:e,...t},r)=>l.jsx(De.Trigger,{ref:r,className:F("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));rl.displayName=De.Trigger.displayName;const nl=N.forwardRef(({className:e,...t},r)=>l.jsx(De.Content,{ref:r,className:F("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));nl.displayName=De.Content.displayName;const ol=N.forwardRef(({className:e,...t},r)=>l.jsx(De.Root,{orientation:"vertical",ref:r,className:F("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));ol.displayName=De.List.displayName;const al=N.forwardRef(({className:e,...t},r)=>l.jsx(De.List,{ref:r,className:F("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));al.displayName=De.List.displayName;const cg=N.forwardRef(({className:e,...t},r)=>l.jsx(De.Trigger,{ref:r,...t,className:F("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),sl=N.forwardRef(({className:e,...t},r)=>l.jsx(De.Content,{ref:r,className:F("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));sl.displayName=De.Content.displayName;const on=e=>e==="asc"?l.jsx(ne.ArrowUpIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):e==="desc"?l.jsx(ne.ArrowDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):l.jsx(ne.ArrowUpDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}),pg=(e,t,r,n,o)=>[{accessorKey:"character",header:({column:a})=>l.jsxs(be,{onClick:()=>a.toggleSorting(void 0),children:[e,on(a.getIsSorted())]})},{accessorKey:"unicodeValue",header:({column:a})=>l.jsxs(be,{onClick:()=>a.toggleSorting(void 0),children:[t,on(a.getIsSorted())]}),cell:({row:a})=>a.getValue("character").charCodeAt(0).toString(16).toUpperCase().padStart(4,"0")},{accessorKey:"count",header:({column:a})=>l.jsxs(be,{onClick:()=>a.toggleSorting(void 0),children:[r,on(a.getIsSorted())]})},{accessorKey:"status",header:({column:a,table:s})=>{const c=s.getSelectedRowModel().rows,p=[];return c.forEach(u=>{p.push(u.getValue("character"))}),l.jsxs("div",{children:[l.jsx("div",{className:"pr-flex pr-justify-center",children:l.jsxs(be,{onClick:()=>a.toggleSorting(void 0),children:[n,on(a.getIsSorted())]})}),l.jsxs("div",{className:"pr-flex pr-justify-center",children:[l.jsx(be,{children:l.jsx(ne.CircleCheckIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(p,!0)}})}),l.jsx(be,{children:l.jsx(ne.CircleXIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(p,!1)}})}),l.jsx(be,{children:l.jsx(ne.CircleHelpIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(p,void 0)}})})]})]})},cell:({row:a})=>{const s=a.getValue("status");return s===!0?l.jsx(ne.CircleCheckIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):s===!1?l.jsx(ne.CircleXIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):l.jsx(ne.CircleHelpIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"})}}];function dg({tableData:e,onStatusChange:t,onSelectCharacter:r,localizedStrings:n}){const o=n["%webView_inventory_table_header_character%"],a=n["%webView_inventory_table_header_unicode_value%"],s=n["%webView_inventory_table_header_count%"],c=n["%webView_inventory_table_header_status%"],p=(u,m)=>{m.toggleAllRowsSelected(!1),u.toggleSelected(void 0),r(u.getValue("character"))};return l.jsx("div",{className:"pr-overflow-y-auto",children:l.jsx(Ds,{columns:pg(o,a,s,c,t),data:e,onRowClickHandler:p})})}const ps=(e,t,r)=>{if(!e||e===""||t==="")return[];const n=[],o=e.split(`
`);let a="0",s="0",c=0;return o.forEach(p=>{const u=p.split(/\s+/);p.startsWith("\\c")&&([,a]=u,s="0"),p.startsWith("\\v")&&([,s]=u,a==="0"&&(a=r.chapterNum.toString()));for(let m=0;m<u.length;m++)if(u[m].includes(t)){const v=Math.max(0,m-2),g=Math.min(u.length,m+3),d=u.slice(v,g).join(" "),h={reference:{...r,chapterNum:+a,verseNum:+s},snippet:d,key:c};c+=1,n.push(h)}}),n};function ug({selectedCharacter:e,text:t,scriptureReference:r,setScriptureReference:n,localizedStrings:o}){const a=o["%webView_inventory_occurrences_table_header_reference%"],s=o["%webView_inventory_occurrences_table_header_occurrence%"],[c,p]=N.useState(ps(t,e,r));return N.useEffect(()=>p(ps(t,e,r)),[t,e,r]),l.jsxs(Fr,{children:[l.jsx(Vr,{children:l.jsxs(lt,{children:[l.jsx(Jt,{children:a}),l.jsx(Jt,{children:s})]})}),l.jsx(zr,{children:c.map(u=>l.jsxs(lt,{onClick:()=>{n(u.reference)},children:[l.jsx(Mt,{children:`${fe.bookNumberToEnglishName(u.reference.bookNum)} ${u.reference.chapterNum}:${u.reference.verseNum}`}),l.jsx(Mt,{children:u.snippet})]},u.key))})]})}const fg=async(e,t,r,n,o)=>{const a=[];return Fe.split(e,"").forEach(s=>{if(r!==""&&!s.includes(r))return;const c=a.find(p=>p.character===s);if(c)c.count+=1;else{let p;if(n.includes(s)&&(p=!0),o.includes(s)&&(p=!1),t==="all"||t==="approved"&&p===!0||t==="unapproved"&&p===!1||t==="unknown"&&p===void 0){const u={character:s,count:1,status:p};a.push(u)}}}),a};function mg({scriptureReference:e,setScriptureReference:t,localizedStrings:r,projectId:n,getSetting:o,setSetting:a,getText:s}){const c=r["%webView_characterInventory_characters_all%"],p=r["%webView_characterInventory_characters_approved%"],u=r["%webView_characterInventory_characters_unapproved%"],m=r["%webView_characterInventory_characters_unknown%"],v=r["%webView_inventory_scope_book%"],g=r["%webView_inventory_scope_chapter%"],d=r["%webView_inventory_scope_verse%"],h=r["%webView_inventory_filter_text%"],[f,b]=N.useState([]),[x,P]=N.useState([]),[w,k]=N.useState(void 0),[y,S]=N.useState("book"),[C,I]=N.useState("all"),[A,L]=N.useState(""),[E,O]=N.useState([]),[$,V]=N.useState(""),H=(_,z)=>{O(ee=>{let Z=[];return _.forEach(j=>{Z=ee.map(M=>M.character===j&&M.status!==z?{...M,status:z}:M)}),b(j=>{let M=[...j];return _.forEach(U=>{z===!0?M.includes(U)||M.push(U):M=M.filter(X=>X!==U)}),a("validCharacters",n,M),M}),P(j=>{let M=[...j];return _.forEach(U=>{z===!1?M.includes(U)||M.push(U):M=M.filter(X=>X!==U)}),a("invalidCharacters",n,M),M}),Z})};return N.useEffect(()=>{(async()=>{try{b(await o("validCharacters",n)),P(await o("invalidCharacters",n))}catch{throw new Error("Failed to fetch characters from project settings")}})()},[n,o]),N.useEffect(()=>{(async()=>{try{const z=await s(n,e,y);k(z)}catch{throw new Error("Failed getting scripture text")}})()},[n,e,y,s]),N.useEffect(()=>{if(!w){O([]);return}(async()=>{try{O(await fg(w,C,A,f,x))}catch{throw new Error("Failed building table data")}})()},[f,x,w,C,A]),l.jsxs("div",{className:"pr-twp",children:[l.jsxs("div",{className:"pr-flex",children:[l.jsxs(Rr,{onValueChange:_=>I(_),defaultValue:C,children:[l.jsx(Yt,{children:l.jsx(Pr,{placeholder:"Select filter"})}),l.jsxs(Kt,{children:[l.jsx(Ke,{value:"all",children:c}),l.jsx(Ke,{value:"approved",children:p}),l.jsx(Ke,{value:"unapproved",children:u}),l.jsx(Ke,{value:"unknown",children:m})]})]}),l.jsxs(Rr,{onValueChange:_=>S(_),defaultValue:y,children:[l.jsx(Yt,{children:l.jsx(Pr,{placeholder:"Select scope"})}),l.jsxs(Kt,{children:[l.jsx(Ke,{value:"book",children:v}),l.jsx(Ke,{value:"chapter",children:g}),l.jsx(Ke,{value:"verse",children:d})]})]}),l.jsx(Ar,{className:"pr-rounded-md pr-border",placeholder:h,value:A,onChange:_=>{L(_.target.value)}})]}),l.jsx("div",{className:`pr-overflow-y-auto pr-rounded-md pr-border ${$!==""&&"pr-max-h-96"}`,children:l.jsx(dg,{tableData:E,onStatusChange:H,onSelectCharacter:_=>{V(_)},localizedStrings:r})}),$!==""&&l.jsx("div",{className:"pr-mt-4 pr-rounded-md pr-border",children:l.jsx(ug,{selectedCharacter:$,text:w,scriptureReference:e,setScriptureReference:_=>t(_),localizedStrings:r})})]})}function hg({isInstalling:e,handleClick:t,buttonText:r,className:n,...o}){return l.jsx(be,{className:F("pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e,"pr-bg-blue-600":!e,"pr-bg-white pr-text-blue-600 hover:pr-text-white":!r,"pr-w-20":r},n),onClick:t,...o,children:e?l.jsx(ne.LoaderCircle,{size:15,className:"pr-animate-spin"}):l.jsxs(l.Fragment,{children:[l.jsx(ne.Download,{size:25,className:F("pr-h-4 pr-w-4",{"pr-mr-1":r})}),r]})})}function gg({isEnabling:e,handleClick:t,className:r,...n}){return l.jsx(be,{className:F("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e},r),onClick:t,...n,children:e?l.jsxs(l.Fragment,{children:[l.jsx(ne.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-white"}),"Enabling..."]}):"Enable"})}function bg({isDisabling:e,handleClick:t,className:r,...n}){return l.jsx(be,{className:F("pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-gray-400",{"pr-cursor-not-allowed pr-bg-gray-400":e},r),onClick:t,...n,children:e?l.jsxs(l.Fragment,{children:[l.jsx(ne.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-black"}),"Disabling..."]}):"Disable"})}function vg({isUpdating:e,handleClick:t,className:r,...n}){return l.jsx(be,{className:F("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700 hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e},r),onClick:t,...n,children:e?l.jsxs(l.Fragment,{children:[l.jsx(ne.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-white"}),"Updating..."]}):"Update"})}function Pt(){return Pt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Pt.apply(this,arguments)}const yg=["children","options"],ds=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,t)=>(e[t.toLowerCase()]=t,e),{for:"htmlFor"}),us={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},wg=["style","script"],xg=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,kg=/mailto:/i,Eg=/\n{2,}$/,il=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,Ng=/^ *> ?/gm,Tg=/^ {2,}\n/,Cg=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,ll=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,cl=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,Sg=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,Og=/^(?:\n *)*\n/,jg=/\r\n?/g,Rg=/^\[\^([^\]]+)](:.*)\n/,Pg=/^\[\^([^\]]+)]/,$g=/\f/g,_g=/^\s*?\[(x|\s)\]/,pl=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,dl=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,ul=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,bo=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,Mg=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,fl=/^<!--[\s\S]*?(?:-->)/,Ig=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,vo=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,Dg=/^\{.*\}$/,Ag=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,Bg=/^<([^ >]+@[^ >]+)>/,Lg=/^<([^ >]+:\/[^ >]+)>/,Fg=/-([a-z])?/gi,ml=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,Vg=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,zg=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,Ug=/^\[([^\]]*)\] ?\[([^\]]*)\]/,Hg=/(\[|\])/g,Gg=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,qg=/\t/g,Wg=/^ *\| */,Xg=/(^ *\||\| *$)/g,Yg=/ *$/,Kg=/^ *:-+: *$/,Jg=/^ *:-+ *$/,Zg=/^ *-+: *$/,Qg=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,eb=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,tb=/^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,rb=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,nb=/^\\([^0-9A-Za-z\s])/,ob=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,ab=/^\n+/,sb=/^([ \t]*)/,ib=/\\([^\\])/g,fs=/ *\n+$/,lb=/(?:^|\n)( *)$/,Jo="(?:\\d+\\.)",Zo="(?:[*+-])";function hl(e){return"( *)("+(e===1?Jo:Zo)+") +"}const gl=hl(1),bl=hl(2);function vl(e){return new RegExp("^"+(e===1?gl:bl))}const cb=vl(1),pb=vl(2);function yl(e){return new RegExp("^"+(e===1?gl:bl)+"[^\\n]*(?:\\n(?!\\1"+(e===1?Jo:Zo)+" )[^\\n]*)*(\\n|$)","gm")}const wl=yl(1),xl=yl(2);function kl(e){const t=e===1?Jo:Zo;return new RegExp("^( *)("+t+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+t+" (?!"+t+" ))\\n*|\\s*\\n*$)")}const El=kl(1),Nl=kl(2);function ms(e,t){const r=t===1,n=r?El:Nl,o=r?wl:xl,a=r?cb:pb;return{t(s,c,p){const u=lb.exec(p);return u&&(c.o||!c._&&!c.u)?n.exec(s=u[1]+s):null},i:ae.HIGH,l(s,c,p){const u=r?+s[2]:void 0,m=s[0].replace(Eg,`
`).match(o);let v=!1;return{p:m.map(function(g,d){const h=a.exec(g)[0].length,f=new RegExp("^ {1,"+h+"}","gm"),b=g.replace(f,"").replace(a,""),x=d===m.length-1,P=b.indexOf(`

`)!==-1||x&&v;v=P;const w=p._,k=p.o;let y;p.o=!0,P?(p._=!1,y=b.replace(fs,`

`)):(p._=!0,y=b.replace(fs,""));const S=c(y,p);return p._=w,p.o=k,S}),m:r,g:u}},h:(s,c,p)=>e(s.m?"ol":"ul",{key:p.k,start:s.g},s.p.map(function(u,m){return e("li",{key:m},c(u,p))}))}}const db=/^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,ub=/^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Tl=[il,ll,cl,pl,ul,dl,fl,ml,wl,El,xl,Nl],fb=[...Tl,/^[^\n]+(?:  \n|\n{2,})/,bo,vo];function mb(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function hb(e){return Zg.test(e)?"right":Kg.test(e)?"center":Jg.test(e)?"left":null}function hs(e,t,r){const n=r.$;r.$=!0;const o=t(e.trim(),r);r.$=n;let a=[[]];return o.forEach(function(s,c){s.type==="tableSeparator"?c!==0&&c!==o.length-1&&a.push([]):(s.type!=="text"||o[c+1]!=null&&o[c+1].type!=="tableSeparator"||(s.v=s.v.replace(Yg,"")),a[a.length-1].push(s))}),a}function gb(e,t,r){r._=!0;const n=hs(e[1],t,r),o=e[2].replace(Xg,"").split("|").map(hb),a=function(s,c,p){return s.trim().split(`
`).map(function(u){return hs(u,c,p)})}(e[3],t,r);return r._=!1,{S:o,A:a,L:n,type:"table"}}function gs(e,t){return e.S[t]==null?{}:{textAlign:e.S[t]}}function gt(e){return function(t,r){return r._?e.exec(t):null}}function bt(e){return function(t,r){return r._||r.u?e.exec(t):null}}function it(e){return function(t,r){return r._||r.u?null:e.exec(t)}}function vr(e){return function(t){return e.exec(t)}}function bb(e,t,r){if(t._||t.u||r&&!r.endsWith(`
`))return null;let n="";e.split(`
`).every(a=>!Tl.some(s=>s.test(a))&&(n+=a+`
`,a.trim()));const o=n.trimEnd();return o==""?null:[n,o]}function qt(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch{return null}return e}function bs(e){return e.replace(ib,"$1")}function pn(e,t,r){const n=r._||!1,o=r.u||!1;r._=!0,r.u=!0;const a=e(t,r);return r._=n,r.u=o,a}function vb(e,t,r){const n=r._||!1,o=r.u||!1;r._=!1,r.u=!0;const a=e(t,r);return r._=n,r.u=o,a}function yb(e,t,r){return r._=!1,e(t,r)}const Jn=(e,t,r)=>({v:pn(t,e[1],r)});function Zn(){return{}}function Qn(){return null}function wb(...e){return e.filter(Boolean).join(" ")}function eo(e,t,r){let n=e;const o=t.split(".");for(;o.length&&(n=n[o[0]],n!==void 0);)o.shift();return n||r}var ae;function xb(e,t={}){t.overrides=t.overrides||{},t.slugify=t.slugify||mb,t.namedCodesToUnicode=t.namedCodesToUnicode?Pt({},us,t.namedCodesToUnicode):us;const r=t.createElement||T.createElement;function n(d,h,...f){const b=eo(t.overrides,`${d}.props`,{});return r(function(x,P){const w=eo(P,x);return w?typeof w=="function"||typeof w=="object"&&"render"in w?w:eo(P,`${x}.component`,x):x}(d,t.overrides),Pt({},h,b,{className:wb(h==null?void 0:h.className,b.className)||void 0}),...f)}function o(d){let h=!1;t.forceInline?h=!0:t.forceBlock||(h=Gg.test(d)===!1);const f=m(u(h?d:`${d.trimEnd().replace(ab,"")}

`,{_:h}));for(;typeof f[f.length-1]=="string"&&!f[f.length-1].trim();)f.pop();if(t.wrapper===null)return f;const b=t.wrapper||(h?"span":"div");let x;if(f.length>1||t.forceWrapper)x=f;else{if(f.length===1)return x=f[0],typeof x=="string"?n("span",{key:"outer"},x):x;x=null}return T.createElement(b,{key:"outer"},x)}function a(d){const h=d.match(xg);return h?h.reduce(function(f,b,x){const P=b.indexOf("=");if(P!==-1){const w=function(C){return C.indexOf("-")!==-1&&C.match(Ig)===null&&(C=C.replace(Fg,function(I,A){return A.toUpperCase()})),C}(b.slice(0,P)).trim(),k=function(C){const I=C[0];return(I==='"'||I==="'")&&C.length>=2&&C[C.length-1]===I?C.slice(1,-1):C}(b.slice(P+1).trim()),y=ds[w]||w,S=f[y]=function(C,I){return C==="style"?I.split(/;\s?/).reduce(function(A,L){const E=L.slice(0,L.indexOf(":"));return A[E.replace(/(-[a-z])/g,O=>O[1].toUpperCase())]=L.slice(E.length+1).trim(),A},{}):C==="href"?qt(I):(I.match(Dg)&&(I=I.slice(1,I.length-1)),I==="true"||I!=="false"&&I)}(w,k);typeof S=="string"&&(bo.test(S)||vo.test(S))&&(f[y]=T.cloneElement(o(S.trim()),{key:x}))}else b!=="style"&&(f[ds[b]||b]=!0);return f},{}):null}const s=[],c={},p={blockQuote:{t:it(il),i:ae.HIGH,l:(d,h,f)=>({v:h(d[0].replace(Ng,""),f)}),h:(d,h,f)=>n("blockquote",{key:f.k},h(d.v,f))},breakLine:{t:vr(Tg),i:ae.HIGH,l:Zn,h:(d,h,f)=>n("br",{key:f.k})},breakThematic:{t:it(Cg),i:ae.HIGH,l:Zn,h:(d,h,f)=>n("hr",{key:f.k})},codeBlock:{t:it(cl),i:ae.MAX,l:d=>({v:d[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),M:void 0}),h:(d,h,f)=>n("pre",{key:f.k},n("code",Pt({},d.O,{className:d.M?`lang-${d.M}`:""}),d.v))},codeFenced:{t:it(ll),i:ae.MAX,l:d=>({O:a(d[3]||""),v:d[4],M:d[2]||void 0,type:"codeBlock"})},codeInline:{t:bt(Sg),i:ae.LOW,l:d=>({v:d[2]}),h:(d,h,f)=>n("code",{key:f.k},d.v)},footnote:{t:it(Rg),i:ae.MAX,l:d=>(s.push({I:d[2],j:d[1]}),{}),h:Qn},footnoteReference:{t:gt(Pg),i:ae.HIGH,l:d=>({v:d[1],B:`#${t.slugify(d[1])}`}),h:(d,h,f)=>n("a",{key:f.k,href:qt(d.B)},n("sup",{key:f.k},d.v))},gfmTask:{t:gt(_g),i:ae.HIGH,l:d=>({R:d[1].toLowerCase()==="x"}),h:(d,h,f)=>n("input",{checked:d.R,key:f.k,readOnly:!0,type:"checkbox"})},heading:{t:it(t.enforceAtxHeadings?dl:pl),i:ae.HIGH,l:(d,h,f)=>({v:pn(h,d[2],f),T:t.slugify(d[2]),C:d[1].length}),h:(d,h,f)=>n(`h${d.C}`,{id:d.T,key:f.k},h(d.v,f))},headingSetext:{t:it(ul),i:ae.MAX,l:(d,h,f)=>({v:pn(h,d[1],f),C:d[2]==="="?1:2,type:"heading"})},htmlComment:{t:vr(fl),i:ae.HIGH,l:()=>({}),h:Qn},image:{t:bt(ub),i:ae.HIGH,l:d=>({D:d[1],B:bs(d[2]),F:d[3]}),h:(d,h,f)=>n("img",{key:f.k,alt:d.D||void 0,title:d.F||void 0,src:qt(d.B)})},link:{t:gt(db),i:ae.LOW,l:(d,h,f)=>({v:vb(h,d[1],f),B:bs(d[2]),F:d[3]}),h:(d,h,f)=>n("a",{key:f.k,href:qt(d.B),title:d.F},h(d.v,f))},linkAngleBraceStyleDetector:{t:gt(Lg),i:ae.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],type:"link"})},linkBareUrlDetector:{t:(d,h)=>h.N?null:gt(Ag)(d,h),i:ae.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],F:void 0,type:"link"})},linkMailtoDetector:{t:gt(Bg),i:ae.MAX,l(d){let h=d[1],f=d[1];return kg.test(f)||(f="mailto:"+f),{v:[{v:h.replace("mailto:",""),type:"text"}],B:f,type:"link"}}},orderedList:ms(n,1),unorderedList:ms(n,2),newlineCoalescer:{t:it(Og),i:ae.LOW,l:Zn,h:()=>`
`},paragraph:{t:bb,i:ae.LOW,l:Jn,h:(d,h,f)=>n("p",{key:f.k},h(d.v,f))},ref:{t:gt(Vg),i:ae.MAX,l:d=>(c[d[1]]={B:d[2],F:d[4]},{}),h:Qn},refImage:{t:bt(zg),i:ae.MAX,l:d=>({D:d[1]||void 0,P:d[2]}),h:(d,h,f)=>n("img",{key:f.k,alt:d.D,src:qt(c[d.P].B),title:c[d.P].F})},refLink:{t:gt(Ug),i:ae.MAX,l:(d,h,f)=>({v:h(d[1],f),Z:h(d[0].replace(Hg,"\\$1"),f),P:d[2]}),h:(d,h,f)=>c[d.P]?n("a",{key:f.k,href:qt(c[d.P].B),title:c[d.P].F},h(d.v,f)):n("span",{key:f.k},h(d.Z,f))},table:{t:it(ml),i:ae.HIGH,l:gb,h:(d,h,f)=>n("table",{key:f.k},n("thead",null,n("tr",null,d.L.map(function(b,x){return n("th",{key:x,style:gs(d,x)},h(b,f))}))),n("tbody",null,d.A.map(function(b,x){return n("tr",{key:x},b.map(function(P,w){return n("td",{key:w,style:gs(d,w)},h(P,f))}))})))},tableSeparator:{t:function(d,h){return h.$?(h._=!0,Wg.exec(d)):null},i:ae.HIGH,l:function(){return{type:"tableSeparator"}},h:()=>" | "},text:{t:vr(ob),i:ae.MIN,l:d=>({v:d[0].replace(Mg,(h,f)=>t.namedCodesToUnicode[f]?t.namedCodesToUnicode[f]:h)}),h:d=>d.v},textBolded:{t:bt(Qg),i:ae.MED,l:(d,h,f)=>({v:h(d[2],f)}),h:(d,h,f)=>n("strong",{key:f.k},h(d.v,f))},textEmphasized:{t:bt(eb),i:ae.LOW,l:(d,h,f)=>({v:h(d[2],f)}),h:(d,h,f)=>n("em",{key:f.k},h(d.v,f))},textEscaped:{t:bt(nb),i:ae.HIGH,l:d=>({v:d[1],type:"text"})},textMarked:{t:bt(tb),i:ae.LOW,l:Jn,h:(d,h,f)=>n("mark",{key:f.k},h(d.v,f))},textStrikethroughed:{t:bt(rb),i:ae.LOW,l:Jn,h:(d,h,f)=>n("del",{key:f.k},h(d.v,f))}};t.disableParsingRawHTML!==!0&&(p.htmlBlock={t:vr(bo),i:ae.HIGH,l(d,h,f){const[,b]=d[3].match(sb),x=new RegExp(`^${b}`,"gm"),P=d[3].replace(x,""),w=(k=P,fb.some(I=>I.test(k))?yb:pn);var k;const y=d[1].toLowerCase(),S=wg.indexOf(y)!==-1;f.N=f.N||y==="a";const C=S?d[3]:w(h,P,f);return f.N=!1,{O:a(d[2]),v:C,G:S,H:S?y:d[1]}},h:(d,h,f)=>n(d.H,Pt({key:f.k},d.O),d.G?d.v:h(d.v,f))},p.htmlSelfClosing={t:vr(vo),i:ae.HIGH,l:d=>({O:a(d[2]||""),H:d[1]}),h:(d,h,f)=>n(d.H,Pt({},d.O,{key:f.k}))});const u=function(d){let h=Object.keys(d);function f(b,x){let P=[],w="";for(;b;){let k=0;for(;k<h.length;){const y=h[k],S=d[y],C=S.t(b,x,w);if(C){const I=C[0];b=b.substring(I.length);const A=S.l(C,f,x);A.type==null&&(A.type=y),P.push(A),w=I;break}k++}}return P}return h.sort(function(b,x){let P=d[b].i,w=d[x].i;return P!==w?P-w:b<x?-1:1}),function(b,x){return f(function(P){return P.replace(jg,`
`).replace($g,"").replace(qg,"    ")}(b),x)}}(p),m=(v=function(d){return function(h,f,b){return d[h.type].h(h,f,b)}}(p),function d(h,f={}){if(Array.isArray(h)){const b=f.k,x=[];let P=!1;for(let w=0;w<h.length;w++){f.k=w;const k=d(h[w],f),y=typeof k=="string";y&&P?x[x.length-1]+=k:k!==null&&x.push(k),P=y}return f.k=b,x}return v(h,d,f)});var v;const g=o(e);return s.length?n("div",null,g,n("footer",{key:"footer"},s.map(function(d){return n("div",{id:t.slugify(d.j),key:d.j},d.j,m(u(d.I,{_:!0})))}))):g}(function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"})(ae||(ae={}));const kb=e=>{let{children:t,options:r}=e,n=function(o,a){if(o==null)return{};var s,c,p={},u=Object.keys(o);for(c=0;c<u.length;c++)a.indexOf(s=u[c])>=0||(p[s]=o[s]);return p}(e,yg);return T.cloneElement(xb(t,r),n)};function Eb({id:e,markdown:t}){return l.jsx("div",{id:e,className:"pr-prose",children:l.jsx(kb,{children:t})})}const Cl=N.forwardRef((e,t)=>l.jsxs(be,{ref:t,className:"pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600",...e,children:[l.jsx(ne.Filter,{size:16,className:"pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"}),"Filter",l.jsx(ne.ChevronDown,{size:16,className:"pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"})]}));var Sl=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(Sl||{});function Nb({id:e,groups:t}){return l.jsx("div",{id:e,children:l.jsxs(wn,{children:[l.jsx(Eo,{asChild:!0,children:l.jsx(Cl,{})}),l.jsx(Br,{children:t.map(r=>l.jsxs("div",{children:[l.jsx(ar,{children:r.label}),l.jsx(Cs,{children:r.items.map(n=>l.jsx("div",{children:n.itemType===0?l.jsx(xn,{onClick:n.onClick,children:n.label}):l.jsx(To,{onClick:n.onClick,value:n.label,children:n.label})},n.label))}),l.jsx(Lr,{})]},r.label))})]})})}function Tb({id:e,message:t}){return l.jsx("div",{id:e,className:"pr-mb-20 pr-mt-20 pr-flex pr-items-center pr-justify-center",children:l.jsx("div",{className:"pr-w-3/4 pr-rounded-lg pr-bg-gray-100 pr-p-8 pr-text-center",children:l.jsx("p",{className:"pr-text-lg pr-text-gray-800",children:t})})})}function Cb({id:e,category:t,downloads:r,languages:n,moreInfoUrl:o}){const a=new Fe.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((c,p)=>c+p,0)),s=()=>{window.scrollTo(0,document.body.scrollHeight)};return l.jsxs("div",{id:e,className:"pr-flex pr-flex-wrap pr-items-start pr-space-x-4 pr-border-b pr-border-t pr-bg-white pr-pb-4 pr-pt-4",children:[l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsx("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:l.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:t})}),l.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"CATEGORY"})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsxs("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:[l.jsx(ne.User,{className:"pr-mr-1 pr-h-4 pr-w-4"}),l.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:a})]}),l.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"USERS"})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsx("div",{className:"pr-flex pr-items-center",children:n.slice(0,3).map(c=>l.jsx("span",{className:"pr-ml-1 pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1 pr-text-xs pr-font-semibold pr-text-gray-700",children:c.toUpperCase()},c))}),n.length>3&&l.jsxs("button",{type:"button",onClick:()=>s(),className:"pr-text-xs pr-text-gray-500 pr-underline",children:["+",n.length-3," more languages"]})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-ml-auto pr-flex pr-flex-col pr-space-y-2",children:[l.jsxs("a",{href:o,className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Website",l.jsx(ne.Link,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]}),l.jsxs("a",{href:"https://placeholder.com",className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Support",l.jsx(ne.CircleHelp,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]})]})]})}function Ol({id:e,versionHistory:t}){const[r,n]=N.useState(!1),o=new Date;function a(c){const p=new Date(c),u=new Date(o.getTime()-p.getTime()),m=u.getUTCFullYear()-1970,v=u.getUTCMonth(),g=u.getUTCDate()-1;let d="";return m>0?d=`${m.toString()} year${m===1?"":"s"} ago`:v>0?d=`${v.toString()} month${v===1?"":"s"} ago`:g===0?d="today":d=`${g.toString()} day${g===1?"":"s"} ago`,d}const s=Object.entries(t).sort((c,p)=>p[0].localeCompare(c[0]));return l.jsxs("div",{id:e,children:[l.jsx("h3",{className:"pr-text-md pr-font-semibold",children:"What`s New"}),l.jsx("ul",{className:"pr-list-disc pr-pl-5 pr-pr-4 pr-text-xs pr-text-gray-600",children:(r?s:s.slice(0,5)).map(c=>l.jsxs("div",{className:"pr-mt-3 pr-flex pr-justify-between",children:[l.jsx("div",{className:"pr-text-gray-600",children:l.jsx("li",{className:"pr-prose pr-text-xs",children:l.jsx("span",{children:c[1].description})})}),l.jsxs("div",{className:"pr-justify-end pr-text-right",children:[l.jsxs("div",{children:["Version ",c[0]]}),l.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),s.length>5&&l.jsx("button",{type:"button",onClick:()=>n(!r),className:"pr-text-xs pr-text-gray-500 pr-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Sb({id:e,publisherDisplayName:t,fileSize:r,locales:n,versionHistory:o}){const a=N.useMemo(()=>Fe.formatBytes(r),[r]),c=(p=>{const u=new Intl.DisplayNames(navigator.language,{type:"language"});return p.map(m=>u.of(m))})(n);return l.jsx("div",{id:e,className:"pr-border-t pr-pb-4 pr-pt-4",children:l.jsxs("div",{className:"pr-md:flex-row pr-md:space-x-8 pr-flex pr-flex-col pr-space-x-0",children:[l.jsx(Ol,{versionHistory:o}),l.jsx("div",{className:"pr-md:border-t-0 pr-md:border-l pr-md-h-auto pr-md-ml-8 pr-mt-4 pr-border-t pr-border-gray-300"}),l.jsxs("div",{className:"pr-md:mt-0 pr-mt-4 pr-flex-1 pr-space-y-3",children:[l.jsx("h2",{className:"pr-text-md pr-font-semibold",children:"Information"}),l.jsxs("div",{className:"pr-flex pr-items-start pr-justify-between pr-pr-4 pr-text-xs pr-text-gray-600",children:[l.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[l.jsx("span",{className:"pr-mb-2",children:"Publisher"}),l.jsx("span",{className:"pr-font-semibold",children:t}),l.jsx("span",{className:"pr-mb-2 pr-mt-4",children:"Size"}),l.jsx("span",{className:"pr-font-semibold",children:a})]}),l.jsx("div",{className:"pr-flex pr-w-3/4 pr-items-center pr-justify-between pr-text-xs pr-text-gray-600",children:l.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[l.jsx("span",{className:"pr-mb-2",children:"Languages"}),l.jsx("span",{className:"pr-font-semibold",children:c.join(", ")})]})})]})]})]})})}const Ob=(e,t)=>{N.useEffect(()=>{if(!e)return()=>{};const r=e(t);return()=>{r()}},[e,t])},to=()=>!1,jb=(e,t)=>{const[r]=yn(N.useCallback(async()=>{if(!e)return to;const n=await Promise.resolve(e(t));return async()=>n()},[t,e]),to,{preserveValue:!1});N.useEffect(()=>()=>{r!==to&&r()},[r])},jl=N.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:F("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));jl.displayName="Card";const Rl=N.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:F("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));Rl.displayName="CardHeader";const Pl=N.forwardRef(({className:e,...t},r)=>l.jsx("h3",{ref:r,className:F("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));Pl.displayName="CardTitle";const $l=N.forwardRef(({className:e,...t},r)=>l.jsx("p",{ref:r,className:F("pr-text-sm pr-text-muted-foreground",e),...t}));$l.displayName="CardDescription";const _l=N.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:F("pr-p-6 pr-pt-0",e),...t}));_l.displayName="CardContent";const Ml=N.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:F("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));Ml.displayName="CardFooter";const Rb=yo.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),Il=N.forwardRef(({className:e,variant:t,...r},n)=>l.jsx("div",{ref:n,role:"alert",className:F(Rb({variant:t}),e),...r}));Il.displayName="Alert";const Dl=N.forwardRef(({className:e,...t},r)=>l.jsxs("h5",{ref:r,className:F("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));Dl.displayName="AlertTitle";const Al=N.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:F("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));Al.displayName="AlertDescription";const Bl=N.forwardRef(({className:e,...t},r)=>l.jsxs(wr.Root,{ref:r,className:F("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[l.jsx(wr.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:l.jsx(wr.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),l.jsx(wr.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));Bl.displayName=wr.Root.displayName;const Ll=N.forwardRef(({className:e,...t},r)=>l.jsx(no.Root,{className:F("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:r,children:l.jsx(no.Thumb,{className:F("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));Ll.displayName=no.Root.displayName;exports.Alert=Il;exports.AlertDescription=Al;exports.AlertTitle=Dl;exports.BookChapterControl=Ic;exports.Button=be;exports.Card=jl;exports.CardContent=_l;exports.CardDescription=$l;exports.CardFooter=Ml;exports.CardHeader=Rl;exports.CardTitle=Pl;exports.ChapterRangeSelector=Wc;exports.CharacterInventory=mg;exports.Checkbox=Hs;exports.Checklist=Xc;exports.ComboBox=oo;exports.ContextMenu=Gh;exports.DataTable=Ds;exports.DisableButton=bg;exports.DropdownMenu=wn;exports.DropdownMenuCheckboxItem=xn;exports.DropdownMenuContent=Br;exports.DropdownMenuGroup=Cs;exports.DropdownMenuItem=No;exports.DropdownMenuItemType=Sl;exports.DropdownMenuLabel=ar;exports.DropdownMenuPortal=kc;exports.DropdownMenuRadioGroup=Nc;exports.DropdownMenuRadioItem=To;exports.DropdownMenuSeparator=Lr;exports.DropdownMenuShortcut=js;exports.DropdownMenuSub=Ec;exports.DropdownMenuSubContent=Os;exports.DropdownMenuSubTrigger=Ss;exports.DropdownMenuTrigger=Eo;exports.EnableButton=gg;exports.FilterButton=Cl;exports.FilterDropdown=Nb;exports.Footer=Sb;exports.GridMenu=Fi;exports.HamburgerMenuButton=Zi;exports.IconButton=Xh;exports.Input=Ar;exports.InstallButton=hg;exports.Label=Ko;exports.LabelPosition=jt;exports.MarkdownRenderer=Eb;exports.MenuItem=Xo;exports.MoreInfo=Cb;exports.NoExtensionsFound=Tb;exports.ScriptureResultsViewer=tg;exports.SearchBar=ng;exports.Select=Rr;exports.SelectContent=Kt;exports.SelectGroup=Ps;exports.SelectItem=Ke;exports.SelectLabel=$s;exports.SelectScrollDownButton=So;exports.SelectScrollUpButton=Co;exports.SelectSeparator=_s;exports.SelectTrigger=Yt;exports.SelectValue=Pr;exports.ShadCnSlider=Bl;exports.ShadCnSwitch=Ll;exports.Slider=og;exports.Snackbar=ag;exports.Switch=sg;exports.Table=Fr;exports.TableBody=zr;exports.TableCaption=Is;exports.TableCell=Mt;exports.TableFooter=Ms;exports.TableHead=Jt;exports.TableHeader=Vr;exports.TableRow=lt;exports.Tabs=lg;exports.TabsContent=nl;exports.TabsList=tl;exports.TabsTrigger=rl;exports.TextField=el;exports.Toolbar=ig;exports.UpdateButton=vg;exports.VersionHistory=Ol;exports.VerticalTabs=ol;exports.VerticalTabsContent=sl;exports.VerticalTabsList=al;exports.VerticalTabsTrigger=cg;exports.buttonVariants=Rs;exports.useEvent=Ob;exports.useEventAsync=jb;exports.usePromise=yn;function Pb(e,t="top"){if(!e||typeof document>"u")return;const r=document.head||document.querySelector("head"),n=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&n?r.insertBefore(o,n):r.appendChild(o)}Pb(`/*
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state="selected"]:hover {
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
`,"top");
//# sourceMappingURL=index.cjs.map
