"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=require("react/jsx-runtime"),E=require("react"),ne=require("lucide-react"),Se=require("clsx"),oc=require("tailwind-merge"),Ts=require("@radix-ui/react-dropdown-menu"),Ue=require("platform-bible-utils"),Ce=require("@tanstack/react-table"),ac=require("@radix-ui/react-slot"),xo=require("class-variance-authority"),sc=require("@radix-ui/react-select"),Ee=require("@mui/material"),ic=require("@radix-ui/react-popover"),Ie=require("cmdk"),lc=require("@radix-ui/react-dialog"),oo=require("@mui/styled-engine"),kr=require("react-dom"),cc=require("@radix-ui/react-tabs"),pc=require("@radix-ui/react-separator"),dc=require("@radix-ui/react-label"),uc=require("@radix-ui/react-slider"),fc=require("@radix-ui/react-switch");function Je(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const r in e)if(r!=="default"){const n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:()=>e[r]})}}return t.default=e,Object.freeze(t)}const T=Je(E),he=Je(Ts),we=Je(sc),$r=Je(ic),et=Je(lc),mc=Je(kr),De=Je(cc),Ss=Je(pc),Cs=Je(dc),Er=Je(uc),ao=Je(fc);const hc=oc.extendTailwindMerge({prefix:"pr-"});function F(...e){return hc(Se.clsx(e))}const ar=E.forwardRef(({className:e,type:t,...r},n)=>l.jsx("input",{type:t,className:F("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:n,...r}));ar.displayName="Input";const gc=E.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:r,handleSubmit:n,...o},a)=>l.jsxs("div",{className:"pr-relative",children:[l.jsx(ar,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&n(),t(s)},onClick:r,ref:a}),l.jsx(ne.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));var bc=Object.defineProperty,vc=(e,t,r)=>t in e?bc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,oe=(e,t,r)=>vc(e,typeof t!="symbol"?t+"":t,r);const Mt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],ko=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],js=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],ya=jc();function sr(e,t=!0){return t&&(e=e.toUpperCase()),e in ya?ya[e]:0}function Eo(e){return sr(e)>0}function yc(e){const t=typeof e=="string"?sr(e):e;return t>=40&&t<=66}function wc(e){return(typeof e=="string"?sr(e):e)<=39}function Os(e){return e<=66}function xc(e){const t=typeof e=="string"?sr(e):e;return $s(t)&&!Os(t)}function*kc(){for(let e=1;e<=Mt.length;e++)yield e}const Ec=1,Rs=Mt.length;function Nc(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function No(e,t="***"){const r=e-1;return r<0||r>=Mt.length?t:Mt[r]}function Ps(e){return e<=0||e>Rs?"******":js[e-1]}function Tc(e){return Ps(sr(e))}function $s(e){const t=typeof e=="number"?No(e):e;return Eo(t)&&!ko.includes(t)}function Sc(e){const t=typeof e=="number"?No(e):e;return Eo(t)&&ko.includes(t)}function Cc(e){return js[e-1].includes("*obsolete*")}function jc(){const e={};for(let t=0;t<Mt.length;t++)e[Mt[t]]=t+1;return e}const fe={allBookIds:Mt,nonCanonicalIds:ko,bookIdToNumber:sr,isBookIdValid:Eo,isBookNT:yc,isBookOT:wc,isBookOTNT:Os,isBookDC:xc,allBookNumbers:kc,firstBook:Ec,lastBook:Rs,extraBooks:Nc,bookNumberToId:No,bookNumberToEnglishName:Ps,bookIdToEnglishName:Tc,isCanonical:$s,isExtraMaterial:Sc,isObsolete:Cc};var Ze=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ze||{});const Le=class{constructor(t){if(oe(this,"name"),oe(this,"fullPath"),oe(this,"isPresent"),oe(this,"hasVerseSegments"),oe(this,"isCustomized"),oe(this,"baseVersification"),oe(this,"scriptureBooks"),oe(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Ze[t]):(this._type=t,this.name=Ze[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};oe(Le,"Original",new Le(Ze.Original)),oe(Le,"Septuagint",new Le(Ze.Septuagint)),oe(Le,"Vulgate",new Le(Ze.Vulgate)),oe(Le,"English",new Le(Ze.English)),oe(Le,"RussianProtestant",new Le(Ze.RussianProtestant)),oe(Le,"RussianOrthodox",new Le(Ze.RussianOrthodox));let St=Le;function wa(e,t){const r=t[0];for(let n=1;n<t.length;n++)e=e.split(t[n]).join(r);return e.split(r)}var _s=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(_s||{});const $e=class le{constructor(t,r,n,o){if(oe(this,"firstChapter"),oe(this,"lastChapter"),oe(this,"lastVerse"),oe(this,"hasSegmentsDefined"),oe(this,"text"),oe(this,"BBBCCCVVVS"),oe(this,"longHashCode"),oe(this,"versification"),oe(this,"rtlMark","‏"),oe(this,"_bookNum",0),oe(this,"_chapterNum",0),oe(this,"_verseNum",0),oe(this,"_verse"),n==null&&o==null)if(t!=null&&typeof t=="string"){const a=t,s=r!=null&&r instanceof St?r:void 0;this.setEmpty(s),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=r!=null&&r instanceof St?r:void 0;this.setEmpty(a),this._verseNum=t%le.chapterDigitShifter,this._chapterNum=Math.floor(t%le.bookDigitShifter/le.chapterDigitShifter),this._bookNum=Math.floor(t/le.bookDigitShifter)}else if(r==null)if(t!=null&&t instanceof le){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof St?t:le.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&r!=null&&n!=null)if(typeof t=="string"&&typeof r=="string"&&typeof n=="string")this.setEmpty(o),this.updateInternal(t,r,n);else if(typeof t=="number"&&typeof r=="number"&&typeof n=="number")this._bookNum=t,this._chapterNum=r,this._verseNum=n,this.versification=o??le.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let r;try{return r=new le(t),{success:!0,verseRef:r}}catch(n){if(n instanceof hr)return r=new le,{success:!1,verseRef:r};throw n}}static getBBBCCCVVV(t,r,n){return t%le.bcvMaxValue*le.bookDigitShifter+(r>=0?r%le.bcvMaxValue*le.chapterDigitShifter:0)+(n>=0?n%le.bcvMaxValue:0)}static fromJSON(t){const{book:r,chapterNum:n,verseNum:o,verse:a,versificationStr:s}=t,c=a||o.toString();let p;return s&&(p=new St(s)),r?new le(r,n.toString(),c,p):new le}static tryGetVerseNum(t){let r;if(!t)return r=-1,{success:!0,vNum:r};r=0;let n;for(let o=0;o<t.length;o++){if(n=t[o],n<"0"||n>"9")return o===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +n-0,r>le.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(le.verseRangeSeparator)||this._verse.includes(le.verseSequenceIndicator))}get book(){return fe.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=fe.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const r=+t;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:r,vNum:n}=le.tryGetVerseNum(t);this._verse=r?void 0:t.replace(this.rtlMark,""),this._verseNum=n,!(this._verseNum>=0)&&({vNum:this._verseNum}=le.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>fe.lastBook)throw new hr("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new St(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(le.verseRangeSeparators,le.verseSequenceIndicators)}get BBBCCC(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const s=+a[1].trim();this.versification=new St(Ze[s])}catch{throw new hr("Invalid reference : "+t)}}const r=t.trim().split(" ");if(r.length!==2)throw new hr("Invalid reference : "+t);const n=r[1].split(":"),o=+n[0];if(n.length!==2||fe.bookIdToNumber(r[0])===0||!Number.isInteger(o)||o<0||!le.isVerseParseable(n[1]))throw new hr("Invalid reference : "+t);this.updateInternal(r[0],n[0],n[1])}simplify(){this._verse=void 0}clone(){return new le(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete r.verse,r}equals(t){return t instanceof le?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,r=le.verseRangeSeparators,n=le.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=wa(this._verse,n);for(const s of a.map(c=>wa(c,r))){const c=this.clone();c.verse=s[0];const p=c.verseNum;if(o.push(c),s.length>1){const f=this.clone();if(f.verse=s[1],!t)for(let m=p+1;m<f.verseNum;m++){const v=new le(this._bookNum,this._chapterNum,m,this.versification);this.isExcluded||o.push(v)}o.push(f)}}return o}validateVerse(t,r){if(!this.verse)return this.internalValid;let n=0;for(const o of this.allVerses(!0,t,r)){const a=o.internalValid;if(a!==0)return a;const s=o.BBBCCCVVV;if(n>s)return 3;if(n===s)return 4;n=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>fe.lastBook?2:(fe.isCanonical(this._bookNum),0)}setEmpty(t=le.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,r,n){this.bookNum=fe.bookIdToNumber(t),this.chapter=r,this.verse=n}};oe($e,"defaultVersification",St.English),oe($e,"verseRangeSeparator","-"),oe($e,"verseSequenceIndicator",","),oe($e,"verseRangeSeparators",[$e.verseRangeSeparator]),oe($e,"verseSequenceIndicators",[$e.verseSequenceIndicator]),oe($e,"chapterDigitShifter",1e3),oe($e,"bookDigitShifter",$e.chapterDigitShifter*$e.chapterDigitShifter),oe($e,"bcvMaxValue",$e.chapterDigitShifter-1),oe($e,"ValidStatusType",_s);let hr=class extends Error{};const xn=he.Root,To=he.Trigger,Ms=he.Group,Oc=he.Portal,Rc=he.Sub,Pc=he.RadioGroup,Is=E.forwardRef(({className:e,inset:t,children:r,...n},o)=>l.jsxs(he.SubTrigger,{ref:o,className:F("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...n,children:[r,l.jsx(ne.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Is.displayName=he.SubTrigger.displayName;const Ds=E.forwardRef(({className:e,...t},r)=>l.jsx(he.SubContent,{ref:r,className:F("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));Ds.displayName=he.SubContent.displayName;const Fr=E.forwardRef(({className:e,sideOffset:t=4,...r},n)=>l.jsx(he.Portal,{children:l.jsx(he.Content,{ref:n,sideOffset:t,className:F("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r})}));Fr.displayName=he.Content.displayName;const So=E.forwardRef(({className:e,inset:t,...r},n)=>l.jsx(he.Item,{ref:n,className:F("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...r}));So.displayName=he.Item.displayName;const kn=E.forwardRef(({className:e,children:t,checked:r,...n},o)=>l.jsxs(he.CheckboxItem,{ref:o,className:F("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:r,...n,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(he.ItemIndicator,{children:l.jsx(ne.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));kn.displayName=he.CheckboxItem.displayName;const Co=E.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(he.RadioItem,{ref:n,className:F("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...r,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(he.ItemIndicator,{children:l.jsx(ne.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));Co.displayName=he.RadioItem.displayName;const ir=E.forwardRef(({className:e,inset:t,...r},n)=>l.jsx(he.Label,{ref:n,className:F("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...r}));ir.displayName=he.Label.displayName;const Vr=E.forwardRef(({className:e,...t},r)=>l.jsx(he.Separator,{ref:r,className:F("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Vr.displayName=he.Separator.displayName;function As({className:e,...t}){return l.jsx("span",{className:F("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}As.displayName="DropdownMenuShortcut";const $c=E.forwardRef(({bookId:e,handleSelectBook:t,isSelected:r,handleHighlightBook:n,handleKeyDown:o,bookType:a,children:s},c)=>l.jsxs(So,{ref:c,textValue:e,className:F("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":r}),onSelect:p=>{p.preventDefault(),t()},onKeyDown:p=>{o(p)},onFocus:n,onMouseMove:n,children:[l.jsx("span",{className:F("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":r,"pr-border-l-red-200":a.toLowerCase()==="ot","pr-border-l-purple-200":a.toLowerCase()==="nt","pr-border-l-indigo-200":a.toLowerCase()==="dc"}),children:fe.bookIdToEnglishName(e)}),r&&l.jsx("div",{children:s})]},e));function _c({handleSelectChapter:e,endChapter:t,activeChapter:r,highlightedChapter:n,handleHighlightedChapter:o}){const a=Array.from({length:t},(c,p)=>p+1),s=E.useCallback(c=>{o(c)},[o]);return l.jsx("div",{className:F("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:a.map(c=>l.jsx("div",{className:F("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":c===r,"pr-bg-amber-200":c===n}),onClick:p=>{p.preventDefault(),p.stopPropagation(),e(c)},role:"button",onKeyDown:p=>{p.key==="Enter"&&e(c)},tabIndex:0,onMouseMove:()=>s(c),children:c},c))})}function Mc({handleSort:e,handleLocationHistory:t,handleBookmarks:r}){return l.jsxs(ir,{className:"pr-flex pr-justify-between",children:[l.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),l.jsxs("div",{className:"pr-flex pr-items-center",children:[l.jsx(ne.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),l.jsx(ne.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),l.jsx(ne.Bookmark,{onClick:r,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const Cr=fe.allBookIds,Ic={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},xa=["OT","NT","DC"],Dc=32+32+32,Ac=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Bc=e=>({OT:Cr.filter(r=>fe.isBookOT(r)),NT:Cr.filter(r=>fe.isBookNT(r)),DC:Cr.filter(r=>fe.isBookDC(r))})[e],gr=e=>Ue.getChaptersForBook(fe.bookIdToNumber(e));function Lc(){return Cr.map(t=>fe.bookIdToEnglishName(t))}function Fc(e){return Lc().includes(e)}function Vc(e){const t=e.toLowerCase().replace(/^\w/,r=>r.toUpperCase());if(Fc(t))return Cr.find(n=>fe.bookIdToEnglishName(n)===t)}function zc({scrRef:e,handleSubmit:t}){const[r,n]=E.useState(""),[o,a]=E.useState(fe.bookNumberToId(e.bookNum)),[s,c]=E.useState(e.chapterNum??0),[p,f]=E.useState(fe.bookNumberToId(e.bookNum)),[m,v]=E.useState(!1),[g,d]=E.useState(m),h=E.useRef(void 0),u=E.useRef(void 0),b=E.useRef(void 0),x=E.useCallback($=>Bc($).filter(N=>{const j=fe.bookIdToEnglishName(N).toLowerCase(),_=r.replace(/[^a-zA-Z]/g,"").toLowerCase();return j.includes(_)||N.toLowerCase().includes(_)}),[r]),R=$=>{n($)},w=E.useRef(!1),k=E.useCallback($=>{if(w.current){w.current=!1;return}v($)},[]),y=E.useCallback(($,N,j,_)=>{if(c(fe.bookNumberToId(e.bookNum)!==$?1:e.chapterNum),N||gr($)===-1){t({bookNum:fe.bookIdToNumber($),chapterNum:j||1,verseNum:_||1}),v(!1),n("");return}a(o!==$?$:""),v(!N)},[t,e.bookNum,e.chapterNum,o]),S=$=>{$<=0||$>gr(o)||y(o,!0,$)},C=E.useCallback(()=>{Ac.forEach($=>{const N=r.match($);if(N){const[j,_=void 0,H=void 0]=N.slice(1),B=Vc(j);(fe.isBookIdValid(j)||B)&&y(B??j,!0,_?parseInt(_,10):1,H?parseInt(H,10):1)}})},[y,r]),M=E.useCallback($=>{m?($.key==="ArrowDown"||$.key==="ArrowUp")&&(typeof b<"u"&&b.current!==null?b.current.focus():typeof u<"u"&&u.current!==null&&u.current.focus(),$.preventDefault()):v(!0)},[m]),A=$=>{const{key:N}=$;N==="ArrowRight"||N==="ArrowLeft"||N==="ArrowDown"||N==="ArrowUp"||N==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:N})),h.current.focus())},z=$=>{const{key:N}=$;if(p===o){if(N==="Enter"){$.preventDefault(),y(o,!0,s);return}let j=0;if(N==="ArrowRight")if(s<gr(p))j=1;else{$.preventDefault();return}else if(N==="ArrowLeft")if(s>1)j=-1;else{$.preventDefault();return}else N==="ArrowDown"?j=6:N==="ArrowUp"&&(j=-6);s+j<=0||s+j>gr(p)?c(0):j!==0&&(c(s+j),$.preventDefault())}};return E.useEffect(()=>{o===p?o===fe.bookNumberToId(e.bookNum)?c(e.chapterNum):c(1):c(0)},[p,e.bookNum,e.chapterNum,o]),E.useLayoutEffect(()=>{d(m)},[m]),E.useLayoutEffect(()=>{const $=setTimeout(()=>{if(g&&u.current&&b.current){const j=b.current.offsetTop-Dc;u.current.scrollTo({top:j,behavior:"instant"})}},10);return()=>{clearTimeout($)}},[g]),l.jsx("div",{className:"pr-flex",children:l.jsxs(xn,{modal:!1,open:m,onOpenChange:k,children:[l.jsx(To,{asChild:!0,children:l.jsx(gc,{ref:h,value:r,handleSearch:R,handleKeyDown:M,handleOnClick:()=>{a(fe.bookNumberToId(e.bookNum)),f(fe.bookNumberToId(e.bookNum)),c(e.chapterNum>0?e.chapterNum:0),v(!0),h.current.focus()},onFocus:()=>{w.current=!0},handleSubmit:C,placeholder:`${fe.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),l.jsxs(Fr,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:A,align:"start",ref:u,children:[l.jsx(Mc,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),xa.map(($,N)=>x($).length>0&&l.jsxs("div",{children:[l.jsx(ir,{className:"pr-font-semibold pr-text-slate-700",children:Ic[$]}),x($).map(j=>l.jsx("div",{children:l.jsx($c,{bookId:j,handleSelectBook:()=>y(j,!1),isSelected:o===j,handleHighlightBook:()=>f(j),handleKeyDown:z,bookType:$,ref:_=>{o===j&&(b.current=_)},children:l.jsx(_c,{handleSelectChapter:S,endChapter:gr(j),activeChapter:e.bookNum===fe.bookIdToNumber(j)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:_=>{c(_)}})})},j)),xa.length-1!==N?l.jsx(Vr,{}):void 0]},$))]})]})})}const Bs=xo.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),be=E.forwardRef(({className:e,variant:t,size:r,asChild:n=!1,...o},a)=>{const s=n?ac.Slot:"button";return l.jsx(s,{className:F(Bs({variant:t,size:r,className:e})),ref:a,...o})});be.displayName="Button";function Hc({table:e}){return l.jsxs(xn,{children:[l.jsx(Ts.DropdownMenuTrigger,{asChild:!0,children:l.jsxs(be,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[l.jsx(ne.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),l.jsxs(Fr,{align:"end",className:"pr-w-[150px]",children:[l.jsx(ir,{children:"Toggle columns"}),l.jsx(Vr,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>l.jsx(kn,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:r=>t.toggleVisibility(!!r),children:t.id},t.id))]})]})}const _r=we.Root,Ls=we.Group,Mr=we.Value,Kt=E.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(we.Trigger,{ref:n,className:F("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...r,children:[t,l.jsx(we.Icon,{asChild:!0,children:l.jsx(ne.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));Kt.displayName=we.Trigger.displayName;const jo=E.forwardRef(({className:e,...t},r)=>l.jsx(we.ScrollUpButton,{ref:r,className:F("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:l.jsx(ne.ChevronUp,{className:"pr-h-4 pr-w-4"})}));jo.displayName=we.ScrollUpButton.displayName;const Oo=E.forwardRef(({className:e,...t},r)=>l.jsx(we.ScrollDownButton,{ref:r,className:F("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:l.jsx(ne.ChevronDown,{className:"pr-h-4 pr-w-4"})}));Oo.displayName=we.ScrollDownButton.displayName;const Jt=E.forwardRef(({className:e,children:t,position:r="popper",...n},o)=>l.jsx(we.Portal,{children:l.jsxs(we.Content,{ref:o,className:F("pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:r,...n,children:[l.jsx(jo,{}),l.jsx(we.Viewport,{className:F("pr-p-1",r==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),l.jsx(Oo,{})]})}));Jt.displayName=we.Content.displayName;const Fs=E.forwardRef(({className:e,...t},r)=>l.jsx(we.Label,{ref:r,className:F("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));Fs.displayName=we.Label.displayName;const Ke=E.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(we.Item,{ref:n,className:F("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...r,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(we.ItemIndicator,{children:l.jsx(ne.Check,{className:"pr-h-4 pr-w-4"})})}),l.jsx(we.ItemText,{children:t})]}));Ke.displayName=we.Item.displayName;const Vs=E.forwardRef(({className:e,...t},r)=>l.jsx(we.Separator,{ref:r,className:F("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Vs.displayName=we.Separator.displayName;function Uc({table:e}){return l.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[l.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[l.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),l.jsxs(_r,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[l.jsx(Kt,{className:"pr-h-8 pr-w-[70px]",children:l.jsx(Mr,{placeholder:e.getState().pagination.pageSize})}),l.jsx(Jt,{side:"top",children:[10,20,30,40,50].map(t=>l.jsx(Ke,{value:`${t}`,children:t},t))})]})]}),l.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[l.jsxs(be,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),l.jsx(ne.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(be,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),l.jsx(ne.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(be,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),l.jsx(ne.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(be,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),l.jsx(ne.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}const zr=E.forwardRef(({className:e,stickyHeader:t,...r},n)=>l.jsx("div",{className:F("pr-twp pr-relative pr-w-full",{"pr-overflow-auto":!t}),children:l.jsx("table",{ref:n,className:F("pr-w-full pr-caption-bottom pr-text-sm",e),...r})}));zr.displayName="Table";const Hr=E.forwardRef(({className:e,stickyHeader:t,...r},n)=>l.jsx("thead",{ref:n,className:F({"pr-sticky pr-top-0 pr-bg-muted":t},"[&_tr]:pr-border-b",e),...r}));Hr.displayName="TableHeader";const Ur=E.forwardRef(({className:e,...t},r)=>l.jsx("tbody",{ref:r,className:F("[&_tr:last-child]:pr-border-0",e),...t}));Ur.displayName="TableBody";const zs=E.forwardRef(({className:e,...t},r)=>l.jsx("tfoot",{ref:r,className:F("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));zs.displayName="TableFooter";const lt=E.forwardRef(({className:e,...t},r)=>l.jsx("tr",{ref:r,className:F("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));lt.displayName="TableRow";const Zt=E.forwardRef(({className:e,...t},r)=>l.jsx("th",{ref:r,className:F("pr-h-12 pr-px-4 pr-text-start pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pe-0",e),...t}));Zt.displayName="TableHead";const It=E.forwardRef(({className:e,...t},r)=>l.jsx("td",{ref:r,className:F("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pe-0",e),...t}));It.displayName="TableCell";const Hs=E.forwardRef(({className:e,...t},r)=>l.jsx("caption",{ref:r,className:F("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));Hs.displayName="TableCaption";function Us({columns:e,data:t,enablePagination:r=!1,showPaginationControls:n=!1,showColumnVisibilityControls:o=!1,stickyHeader:a=!1,onRowClickHandler:s=()=>{}}){var b;const[c,p]=E.useState([]),[f,m]=E.useState([]),[v,g]=E.useState({}),[d,h]=E.useState({}),u=Ce.useReactTable({data:t,columns:e,getCoreRowModel:Ce.getCoreRowModel(),...r&&{getPaginationRowModel:Ce.getPaginationRowModel()},onSortingChange:p,getSortedRowModel:Ce.getSortedRowModel(),onColumnFiltersChange:m,getFilteredRowModel:Ce.getFilteredRowModel(),onColumnVisibilityChange:g,onRowSelectionChange:h,state:{sorting:c,columnFilters:f,columnVisibility:v,rowSelection:d}});return l.jsxs("div",{className:"pr-twp pr-font-sans",children:[o&&l.jsx(Hc,{table:u}),l.jsxs(zr,{stickyHeader:a,children:[l.jsx(Hr,{stickyHeader:a,children:u.getHeaderGroups().map(x=>l.jsx(lt,{children:x.headers.map(R=>l.jsx(Zt,{children:R.isPlaceholder?void 0:Ce.flexRender(R.column.columnDef.header,R.getContext())},R.id))},x.id))}),l.jsx(Ur,{children:(b=u.getRowModel().rows)!=null&&b.length?u.getRowModel().rows.map(x=>l.jsx(lt,{onClick:()=>s(x,u),"data-state":x.getIsSelected()&&"selected",children:x.getVisibleCells().map(R=>l.jsx(It,{children:Ce.flexRender(R.column.columnDef.cell,R.getContext())},R.id))},x.id)):l.jsx(lt,{children:l.jsx(It,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]}),r&&l.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[l.jsx(be,{variant:"outline",size:"sm",onClick:()=>u.previousPage(),disabled:!u.getCanPreviousPage(),children:"Previous"}),l.jsx(be,{variant:"outline",size:"sm",onClick:()=>u.nextPage(),disabled:!u.getCanNextPage(),children:"Next"})]}),r&&n&&l.jsx(Uc,{table:u})]})}const Gc=e=>e.split(/(?=\n|\\(?:v|c|id))/g),ka=e=>{const t=/^\\[vc]\s+(\d+)/,r=e.match(t);return r?+r[1]:0},Ea=(e,t,r,n)=>{if(!e||e===""||t==="")return[];const o=[],a=Gc(e);let s=n.chapterNum,c=n.verseNum,p=0;return a.forEach(f=>{f.startsWith("\\id")&&(s=0,c=0),f.startsWith("\\c")&&(s=ka(f),c=0),f.startsWith("\\v")&&(c=ka(f),s===0&&(s=n.chapterNum));const m=r(f,t);for(let v=0;v<m.length;v++){const g={reference:{...n,chapterNum:+s,verseNum:+c},snippet:f,key:p};p+=1,o.push(g)}}),o};function qc({selectedItem:e,text:t,extractItems:r,scriptureReference:n,setScriptureReference:o,localizedStrings:a}){const s=a["%webView_inventory_occurrences_table_header_reference%"],c=a["%webView_inventory_occurrences_table_header_occurrence%"],[p,f]=E.useState(Ea(t,e,r,n));return E.useEffect(()=>f(Ea(t,e,r,n)),[t,e,n,r]),l.jsxs(zr,{stickyHeader:!0,children:[l.jsx(Hr,{stickyHeader:!0,children:l.jsxs(lt,{children:[l.jsx(Zt,{children:s}),l.jsx(Zt,{children:c})]})}),l.jsx(Ur,{children:p.map(m=>l.jsxs(lt,{onClick:()=>{o(m.reference)},children:[l.jsx(It,{children:`${fe.bookNumberToEnglishName(m.reference.bookNum)} ${m.reference.chapterNum}:${m.reference.verseNum}`}),l.jsx(It,{children:m.snippet})]},m.key))})]})}const Wc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_book%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),En=e=>e==="asc"?l.jsx(ne.ArrowUpIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}):e==="desc"?l.jsx(ne.ArrowDownIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}):l.jsx(ne.ArrowUpDownIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}),Xc=(e,t,r)=>{let n=e;return t!=="all"&&(n=n.filter(o=>t==="approved"&&o.status==="approved"||t==="unapproved"&&o.status==="unapproved"||t==="unknown"&&o.status==="unknown")),r!==""&&(n=n.filter(o=>o.item.includes(r))),n},Yc=(e,t,r)=>{const n=[],o=t(e);for(let a=0;a<o.length;a++){const s=o[a],c=n.find(p=>p.item===s);if(c)c.count+=1;else{const p={item:s,count:1,status:r(s)};n.push(p)}}return n},gt=(e,t)=>e[t]??t;function Kc({scriptureReference:e,setScriptureReference:t,localizedStrings:r,extractItems:n,approvedItems:o,onApprovedItemsChange:a,unapprovedItems:s,onUnapprovedItemsChange:c,text:p,scope:f,onScopeChange:m,getColumns:v}){const g=gt(r,"%webView_inventory_all%"),d=gt(r,"%webView_inventory_approved%"),h=gt(r,"%webView_inventory_unapproved%"),u=gt(r,"%webView_inventory_unknown%"),b=gt(r,"%webView_inventory_scope_book%"),x=gt(r,"%webView_inventory_scope_chapter%"),R=gt(r,"%webView_inventory_scope_verse%"),w=gt(r,"%webView_inventory_filter_text%"),[k,y]=E.useState([]),[S,C]=E.useState("all"),[M,A]=E.useState(""),[z,$]=E.useState(""),N=E.useCallback((L,J)=>{y(I=>{let U=[];return L.forEach(K=>{U=I.map(G=>G.item===K&&G.status!==J?{...G,status:J}:G)}),U});let Z=[...o];L.forEach(I=>{J==="approved"?Z.includes(I)||Z.push(I):Z=Z.filter(U=>U!==I)}),a(Z);let O=[...s];L.forEach(I=>{J==="unapproved"?O.includes(I)||O.push(I):O=O.filter(U=>U!==I)}),c(O)},[o,a,s,c]),j=E.useCallback(L=>o.includes(L)?"approved":s.includes(L)?"unapproved":"unknown",[o,s]);E.useEffect(()=>{p&&y(Yc(p,n,j))},[n,p,j]);const _=E.useMemo(()=>Xc(k,S,M),[k,S,M]);E.useEffect(()=>{$("")},[_]);const H=(L,J)=>{J.toggleAllRowsSelected(!1),L.toggleSelected(void 0),$(L.getValue("item"))},B=E.useMemo(()=>v(N),[v,N]);return l.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-flex-col",children:[l.jsxs("div",{className:"pr-flex",children:[l.jsxs(_r,{onValueChange:L=>C(L),defaultValue:S,children:[l.jsx(Kt,{className:"pr-m-1",children:l.jsx(Mr,{placeholder:"Select filter"})}),l.jsxs(Jt,{className:"pr-font-sans",children:[l.jsx(Ke,{value:"all",children:g}),l.jsx(Ke,{value:"approved",children:d}),l.jsx(Ke,{value:"unapproved",children:h}),l.jsx(Ke,{value:"unknown",children:u})]})]}),l.jsxs(_r,{onValueChange:L=>m(L),defaultValue:f,children:[l.jsx(Kt,{className:"pr-m-1",children:l.jsx(Mr,{placeholder:"Select scope"})}),l.jsxs(Jt,{className:"pr-font-sans",children:[l.jsx(Ke,{value:"book",children:b}),l.jsx(Ke,{value:"chapter",children:x}),l.jsx(Ke,{value:"verse",children:R})]})]}),l.jsx(ar,{className:"pr-m-1 pr-rounded-md pr-border",placeholder:w,value:M,onChange:L=>{A(L.target.value)}})]}),l.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:l.jsx(Us,{columns:B,data:_,onRowClickHandler:H,stickyHeader:!0})}),z!==""&&l.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:l.jsx(qc,{selectedItem:z,text:p,extractItems:n,scriptureReference:e,setScriptureReference:L=>t(L),localizedStrings:r})})]})}const Jc=e=>({accessorKey:"item",header:({column:t})=>l.jsxs(be,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,En(t.getIsSorted())]})}),Zc=e=>({accessorKey:"count",header:({column:t})=>l.jsxs(be,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,En(t.getIsSorted())]})}),Qc=(e,t)=>({accessorKey:"status",header:({column:r,table:n})=>{const o=n.getSelectedRowModel().rows,a=[];return o.forEach(s=>{a.push(s.getValue("item"))}),l.jsxs("div",{children:[l.jsx("div",{className:"pr-flex pr-justify-center",children:l.jsxs(be,{className:"pr-mt-1",variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[e,En(r.getIsSorted())]})}),l.jsxs("div",{className:"pr-flex pr-justify-center",children:[l.jsx(be,{className:"pr-m-1",children:l.jsx(ne.CircleCheckIcon,{onClick:()=>{t(a,"approved")}})}),l.jsx(be,{className:"pr-m-1",children:l.jsx(ne.CircleXIcon,{onClick:()=>{t(a,"unapproved")}})}),l.jsx(be,{className:"pr-m-1",children:l.jsx(ne.CircleHelpIcon,{onClick:()=>{t(a,"unknown")}})})]})]})},cell:({row:r})=>{switch(r.getValue("status")){case"approved":return l.jsx(ne.CircleCheckIcon,{});case"unapproved":return l.jsx(ne.CircleXIcon,{});case"unknown":default:return l.jsx(ne.CircleHelpIcon,{})}}}),ep=$r.Root,tp=$r.Trigger,Gs=E.forwardRef(({className:e,align:t="center",sideOffset:r=4,...n},o)=>l.jsx($r.Portal,{children:l.jsx($r.Content,{ref:o,align:t,sideOffset:r,className:F("pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));Gs.displayName=$r.Content.displayName;const rp=et.Portal,qs=E.forwardRef(({className:e,...t},r)=>l.jsx(et.Overlay,{ref:r,className:F("pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",e),...t}));qs.displayName=et.Overlay.displayName;const np=E.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(rp,{children:[l.jsx(qs,{}),l.jsxs(et.Content,{ref:n,className:F("pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",e),...r,children:[t,l.jsxs(et.Close,{className:"pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground",children:[l.jsx(ne.X,{className:"pr-h-4 pr-w-4"}),l.jsx("span",{className:"pr-sr-only",children:"Close"})]})]})]}));np.displayName=et.Content.displayName;const op=E.forwardRef(({className:e,...t},r)=>l.jsx(et.Title,{ref:r,className:F("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight",e),...t}));op.displayName=et.Title.displayName;const ap=E.forwardRef(({className:e,...t},r)=>l.jsx(et.Description,{ref:r,className:F("pr-text-sm pr-text-muted-foreground",e),...t}));ap.displayName=et.Description.displayName;const Ws=E.forwardRef(({className:e,...t},r)=>l.jsx(Ie.Command,{ref:r,className:F("pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",e),...t}));Ws.displayName=Ie.Command.displayName;const Xs=E.forwardRef(({className:e,...t},r)=>l.jsxs("div",{className:"pr-flex pr-items-center pr-border-b pr-px-3",children:[l.jsx(ne.Search,{className:"pr-me-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"}),l.jsx(Ie.Command.Input,{ref:r,className:F("pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...t})]}));Xs.displayName=Ie.Command.Input.displayName;const Ys=E.forwardRef(({className:e,...t},r)=>l.jsx(Ie.Command.List,{ref:r,className:F("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden",e),...t}));Ys.displayName=Ie.Command.List.displayName;const Ks=E.forwardRef((e,t)=>l.jsx(Ie.Command.Empty,{ref:t,className:"pr-py-6 pr-text-center pr-text-sm",...e}));Ks.displayName=Ie.Command.Empty.displayName;const sp=E.forwardRef(({className:e,...t},r)=>l.jsx(Ie.Command.Group,{ref:r,className:F("pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",e),...t}));sp.displayName=Ie.Command.Group.displayName;const ip=E.forwardRef(({className:e,...t},r)=>l.jsx(Ie.Command.Separator,{ref:r,className:F("pr--mx-1 pr-h-px pr-bg-border",e),...t}));ip.displayName=Ie.Command.Separator.displayName;const Js=E.forwardRef(({className:e,...t},r)=>l.jsx(Ie.Command.Item,{ref:r,className:F("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",e),...t}));Js.displayName=Ie.Command.Item.displayName;function lp(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function so({id:e,options:t=[],className:r,value:n,onChange:o=()=>{},getOptionLabel:a=lp,buttonPlaceholder:s="",textPlaceholder:c="",commandEmptyMessage:p="No option found",buttonVariant:f="outline",dir:m="ltr",...v}){const[g,d]=E.useState(!1);return l.jsxs(ep,{open:g,onOpenChange:d,...v,children:[l.jsx(tp,{asChild:!0,children:l.jsxs(be,{variant:f,role:"combobox","aria-expanded":g,id:e,className:F("pr-w-[200px] pr-justify-between",r),children:[n?a(n):s,l.jsx(ne.ChevronsUpDown,{className:"pr-ms-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"})]})}),l.jsx(Gs,{className:"pr-w-[200px] pr-p-0",dir:m,children:l.jsxs(Ws,{children:[l.jsx(Xs,{dir:m,placeholder:c,className:"pr-text-inherit"}),l.jsx(Ks,{children:p}),l.jsx(Ys,{children:t.map(h=>l.jsxs(Js,{value:a(h),onSelect:()=>{o(h),d(!1)},children:[l.jsx(ne.Check,{className:F("pr-me-2 pr-h-4 pr-w-4",{"pr-opacity-0":!n||a(n)!==a(h)})}),a(h)]},a(h)))})]})})]})}function cp({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:r=!1,chapterCount:n}){const[o,a]=E.useState(1),[s,c]=E.useState(n),[p,f]=E.useState(Array.from({length:n},(g,d)=>d+1));E.useEffect(()=>{a(1),e(1),c(n),t(n),f(Array.from({length:n},(g,d)=>d+1))},[n,t,e]);const m=g=>{a(g),e(g),g>s&&(c(g),t(g))},v=g=>{c(g),t(g),g<o&&(a(g),e(g))};return l.jsxs(l.Fragment,{children:[l.jsx(Ee.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:r,control:l.jsx(so,{onChange:m,className:"book-selection-chapter",options:p,getOptionLabel:g=>g.toString(),value:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),l.jsx(Ee.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:r,control:l.jsx(so,{onChange:v,className:"book-selection-chapter",options:p,getOptionLabel:g=>g.toString(),value:s},"end chapter"),label:"to",labelPlacement:"start"})]})}var Rt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Rt||{});function Zs({id:e,isChecked:t,labelText:r="",labelPosition:n=Rt.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:s=!1,hasError:c=!1,className:p,onChange:f}){const m=l.jsx(Ee.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:a,disabled:s,className:`papi-checkbox ${c?"error":""} ${p??""}`,onChange:f});let v;if(r){const g=n===Rt.Before||n===Rt.Above,d=l.jsx("span",{className:`papi-checkbox-label ${c?"error":""} ${p??""}`,children:r}),h=n===Rt.Before||n===Rt.After,u=h?d:l.jsx("div",{children:d}),b=h?m:l.jsx("div",{children:m});v=l.jsxs(Ee.FormLabel,{className:`papi-checkbox ${n.toString()}`,disabled:s,error:c,children:[g&&u,b,!g&&u]})}else v=m;return v}function pp({id:e,className:t,legend:r,listItems:n,selectedListItems:o,handleSelectListItem:a,createLabel:s}){return l.jsxs("fieldset",{id:e,className:t,children:[r&&l.jsx("legend",{children:r}),n.map(c=>l.jsx(Zs,{className:"check-item",isChecked:o.includes(c),labelText:s?s(c):c,onChange:()=>a(c)},c))]})}function dp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function up(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var r=function n(){return this instanceof n?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};r.prototype=t.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(e).forEach(function(n){var o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(r,n,o.get?o:{enumerable:!0,get:function(){return e[n]}})}),r}var Ro={},Qs={exports:{}};(function(e){function t(r){return r&&r.__esModule?r:{default:r}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Qs);var fp=Qs.exports,Vn={};function lr(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...n){return e(...n)||t(...n)}}function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},P.apply(this,arguments)}function Pt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function ei(e){if(!Pt(e))return e;const t={};return Object.keys(e).forEach(r=>{t[r]=ei(e[r])}),t}function ct(e,t,r={clone:!0}){const n=r.clone?P({},e):e;return Pt(e)&&Pt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Pt(t[o])&&o in e&&Pt(e[o])?n[o]=ct(e[o],t[o],r):r.clone?n[o]=Pt(t[o])?ei(t[o]):t[o]:n[o]=t[o])}),n}var io={exports:{}},tn={exports:{}},ce={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Na;function mp(){if(Na)return ce;Na=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,f=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,u=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,R=e?Symbol.for("react.scope"):60119;function w(y){if(typeof y=="object"&&y!==null){var S=y.$$typeof;switch(S){case t:switch(y=y.type,y){case p:case f:case n:case a:case o:case v:return y;default:switch(y=y&&y.$$typeof,y){case c:case m:case h:case d:case s:return y;default:return S}}case r:return S}}}function k(y){return w(y)===f}return ce.AsyncMode=p,ce.ConcurrentMode=f,ce.ContextConsumer=c,ce.ContextProvider=s,ce.Element=t,ce.ForwardRef=m,ce.Fragment=n,ce.Lazy=h,ce.Memo=d,ce.Portal=r,ce.Profiler=a,ce.StrictMode=o,ce.Suspense=v,ce.isAsyncMode=function(y){return k(y)||w(y)===p},ce.isConcurrentMode=k,ce.isContextConsumer=function(y){return w(y)===c},ce.isContextProvider=function(y){return w(y)===s},ce.isElement=function(y){return typeof y=="object"&&y!==null&&y.$$typeof===t},ce.isForwardRef=function(y){return w(y)===m},ce.isFragment=function(y){return w(y)===n},ce.isLazy=function(y){return w(y)===h},ce.isMemo=function(y){return w(y)===d},ce.isPortal=function(y){return w(y)===r},ce.isProfiler=function(y){return w(y)===a},ce.isStrictMode=function(y){return w(y)===o},ce.isSuspense=function(y){return w(y)===v},ce.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===n||y===f||y===a||y===o||y===v||y===g||typeof y=="object"&&y!==null&&(y.$$typeof===h||y.$$typeof===d||y.$$typeof===s||y.$$typeof===c||y.$$typeof===m||y.$$typeof===b||y.$$typeof===x||y.$$typeof===R||y.$$typeof===u)},ce.typeOf=w,ce}var pe={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ta;function hp(){return Ta||(Ta=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,f=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,u=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,R=e?Symbol.for("react.scope"):60119;function w(V){return typeof V=="string"||typeof V=="function"||V===n||V===f||V===a||V===o||V===v||V===g||typeof V=="object"&&V!==null&&(V.$$typeof===h||V.$$typeof===d||V.$$typeof===s||V.$$typeof===c||V.$$typeof===m||V.$$typeof===b||V.$$typeof===x||V.$$typeof===R||V.$$typeof===u)}function k(V){if(typeof V=="object"&&V!==null){var te=V.$$typeof;switch(te){case t:var D=V.type;switch(D){case p:case f:case n:case a:case o:case v:return D;default:var ie=D&&D.$$typeof;switch(ie){case c:case m:case h:case d:case s:return ie;default:return te}}case r:return te}}}var y=p,S=f,C=c,M=s,A=t,z=m,$=n,N=h,j=d,_=r,H=a,B=o,L=v,J=!1;function Z(V){return J||(J=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),O(V)||k(V)===p}function O(V){return k(V)===f}function I(V){return k(V)===c}function U(V){return k(V)===s}function K(V){return typeof V=="object"&&V!==null&&V.$$typeof===t}function G(V){return k(V)===m}function q(V){return k(V)===n}function X(V){return k(V)===h}function Y(V){return k(V)===d}function W(V){return k(V)===r}function Q(V){return k(V)===a}function ee(V){return k(V)===o}function se(V){return k(V)===v}pe.AsyncMode=y,pe.ConcurrentMode=S,pe.ContextConsumer=C,pe.ContextProvider=M,pe.Element=A,pe.ForwardRef=z,pe.Fragment=$,pe.Lazy=N,pe.Memo=j,pe.Portal=_,pe.Profiler=H,pe.StrictMode=B,pe.Suspense=L,pe.isAsyncMode=Z,pe.isConcurrentMode=O,pe.isContextConsumer=I,pe.isContextProvider=U,pe.isElement=K,pe.isForwardRef=G,pe.isFragment=q,pe.isLazy=X,pe.isMemo=Y,pe.isPortal=W,pe.isProfiler=Q,pe.isStrictMode=ee,pe.isSuspense=se,pe.isValidElementType=w,pe.typeOf=k}()),pe}var Sa;function ti(){return Sa||(Sa=1,process.env.NODE_ENV==="production"?tn.exports=mp():tn.exports=hp()),tn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var zn,Ca;function gp(){if(Ca)return zn;Ca=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function n(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var s={},c=0;c<10;c++)s["_"+String.fromCharCode(c)]=c;var p=Object.getOwnPropertyNames(s).map(function(m){return s[m]});if(p.join("")!=="0123456789")return!1;var f={};return"abcdefghijklmnopqrst".split("").forEach(function(m){f[m]=m}),Object.keys(Object.assign({},f)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return zn=o()?Object.assign:function(a,s){for(var c,p=n(a),f,m=1;m<arguments.length;m++){c=Object(arguments[m]);for(var v in c)t.call(c,v)&&(p[v]=c[v]);if(e){f=e(c);for(var g=0;g<f.length;g++)r.call(c,f[g])&&(p[f[g]]=c[f[g]])}}return p},zn}var Hn,ja;function Po(){if(ja)return Hn;ja=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Hn=e,Hn}var Un,Oa;function ri(){return Oa||(Oa=1,Un=Function.call.bind(Object.prototype.hasOwnProperty)),Un}var Gn,Ra;function bp(){if(Ra)return Gn;Ra=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Po(),r={},n=ri();e=function(a){var s="Warning: "+a;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(a,s,c,p,f){if(process.env.NODE_ENV!=="production"){for(var m in a)if(n(a,m)){var v;try{if(typeof a[m]!="function"){var g=Error((p||"React class")+": "+c+" type `"+m+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[m]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw g.name="Invariant Violation",g}v=a[m](s,m,p,c,null,t)}catch(h){v=h}if(v&&!(v instanceof Error)&&e((p||"React class")+": type specification of "+c+" `"+m+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof v+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),v instanceof Error&&!(v.message in r)){r[v.message]=!0;var d=f?f():"";e("Failed "+c+" type: "+v.message+(d??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(r={})},Gn=o,Gn}var qn,Pa;function vp(){if(Pa)return qn;Pa=1;var e=ti(),t=gp(),r=Po(),n=ri(),o=bp(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(c){var p="Warning: "+c;typeof console<"u"&&console.error(p);try{throw new Error(p)}catch{}});function s(){return null}return qn=function(c,p){var f=typeof Symbol=="function"&&Symbol.iterator,m="@@iterator";function v(O){var I=O&&(f&&O[f]||O[m]);if(typeof I=="function")return I}var g="<<anonymous>>",d={array:x("array"),bigint:x("bigint"),bool:x("boolean"),func:x("function"),number:x("number"),object:x("object"),string:x("string"),symbol:x("symbol"),any:R(),arrayOf:w,element:k(),elementType:y(),instanceOf:S,node:z(),objectOf:M,oneOf:C,oneOfType:A,shape:N,exact:j};function h(O,I){return O===I?O!==0||1/O===1/I:O!==O&&I!==I}function u(O,I){this.message=O,this.data=I&&typeof I=="object"?I:{},this.stack=""}u.prototype=Error.prototype;function b(O){if(process.env.NODE_ENV!=="production")var I={},U=0;function K(q,X,Y,W,Q,ee,se){if(W=W||g,ee=ee||Y,se!==r){if(p){var V=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw V.name="Invariant Violation",V}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var te=W+":"+Y;!I[te]&&U<3&&(a("You are manually calling a React.PropTypes validation function for the `"+ee+"` prop on `"+W+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),I[te]=!0,U++)}}return X[Y]==null?q?X[Y]===null?new u("The "+Q+" `"+ee+"` is marked as required "+("in `"+W+"`, but its value is `null`.")):new u("The "+Q+" `"+ee+"` is marked as required in "+("`"+W+"`, but its value is `undefined`.")):null:O(X,Y,W,Q,ee)}var G=K.bind(null,!1);return G.isRequired=K.bind(null,!0),G}function x(O){function I(U,K,G,q,X,Y){var W=U[K],Q=B(W);if(Q!==O){var ee=L(W);return new u("Invalid "+q+" `"+X+"` of type "+("`"+ee+"` supplied to `"+G+"`, expected ")+("`"+O+"`."),{expectedType:O})}return null}return b(I)}function R(){return b(s)}function w(O){function I(U,K,G,q,X){if(typeof O!="function")return new u("Property `"+X+"` of component `"+G+"` has invalid PropType notation inside arrayOf.");var Y=U[K];if(!Array.isArray(Y)){var W=B(Y);return new u("Invalid "+q+" `"+X+"` of type "+("`"+W+"` supplied to `"+G+"`, expected an array."))}for(var Q=0;Q<Y.length;Q++){var ee=O(Y,Q,G,q,X+"["+Q+"]",r);if(ee instanceof Error)return ee}return null}return b(I)}function k(){function O(I,U,K,G,q){var X=I[U];if(!c(X)){var Y=B(X);return new u("Invalid "+G+" `"+q+"` of type "+("`"+Y+"` supplied to `"+K+"`, expected a single ReactElement."))}return null}return b(O)}function y(){function O(I,U,K,G,q){var X=I[U];if(!e.isValidElementType(X)){var Y=B(X);return new u("Invalid "+G+" `"+q+"` of type "+("`"+Y+"` supplied to `"+K+"`, expected a single ReactElement type."))}return null}return b(O)}function S(O){function I(U,K,G,q,X){if(!(U[K]instanceof O)){var Y=O.name||g,W=Z(U[K]);return new u("Invalid "+q+" `"+X+"` of type "+("`"+W+"` supplied to `"+G+"`, expected ")+("instance of `"+Y+"`."))}return null}return b(I)}function C(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),s;function I(U,K,G,q,X){for(var Y=U[K],W=0;W<O.length;W++)if(h(Y,O[W]))return null;var Q=JSON.stringify(O,function(se,V){var te=L(V);return te==="symbol"?String(V):V});return new u("Invalid "+q+" `"+X+"` of value `"+String(Y)+"` "+("supplied to `"+G+"`, expected one of "+Q+"."))}return b(I)}function M(O){function I(U,K,G,q,X){if(typeof O!="function")return new u("Property `"+X+"` of component `"+G+"` has invalid PropType notation inside objectOf.");var Y=U[K],W=B(Y);if(W!=="object")return new u("Invalid "+q+" `"+X+"` of type "+("`"+W+"` supplied to `"+G+"`, expected an object."));for(var Q in Y)if(n(Y,Q)){var ee=O(Y,Q,G,q,X+"."+Q,r);if(ee instanceof Error)return ee}return null}return b(I)}function A(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var I=0;I<O.length;I++){var U=O[I];if(typeof U!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+J(U)+" at index "+I+"."),s}function K(G,q,X,Y,W){for(var Q=[],ee=0;ee<O.length;ee++){var se=O[ee],V=se(G,q,X,Y,W,r);if(V==null)return null;V.data&&n(V.data,"expectedType")&&Q.push(V.data.expectedType)}var te=Q.length>0?", expected one of type ["+Q.join(", ")+"]":"";return new u("Invalid "+Y+" `"+W+"` supplied to "+("`"+X+"`"+te+"."))}return b(K)}function z(){function O(I,U,K,G,q){return _(I[U])?null:new u("Invalid "+G+" `"+q+"` supplied to "+("`"+K+"`, expected a ReactNode."))}return b(O)}function $(O,I,U,K,G){return new u((O||"React class")+": "+I+" type `"+U+"."+K+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+G+"`.")}function N(O){function I(U,K,G,q,X){var Y=U[K],W=B(Y);if(W!=="object")return new u("Invalid "+q+" `"+X+"` of type `"+W+"` "+("supplied to `"+G+"`, expected `object`."));for(var Q in O){var ee=O[Q];if(typeof ee!="function")return $(G,q,X,Q,L(ee));var se=ee(Y,Q,G,q,X+"."+Q,r);if(se)return se}return null}return b(I)}function j(O){function I(U,K,G,q,X){var Y=U[K],W=B(Y);if(W!=="object")return new u("Invalid "+q+" `"+X+"` of type `"+W+"` "+("supplied to `"+G+"`, expected `object`."));var Q=t({},U[K],O);for(var ee in Q){var se=O[ee];if(n(O,ee)&&typeof se!="function")return $(G,q,X,ee,L(se));if(!se)return new u("Invalid "+q+" `"+X+"` key `"+ee+"` supplied to `"+G+"`.\nBad object: "+JSON.stringify(U[K],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(O),null,"  "));var V=se(Y,ee,G,q,X+"."+ee,r);if(V)return V}return null}return b(I)}function _(O){switch(typeof O){case"number":case"string":case"undefined":return!0;case"boolean":return!O;case"object":if(Array.isArray(O))return O.every(_);if(O===null||c(O))return!0;var I=v(O);if(I){var U=I.call(O),K;if(I!==O.entries){for(;!(K=U.next()).done;)if(!_(K.value))return!1}else for(;!(K=U.next()).done;){var G=K.value;if(G&&!_(G[1]))return!1}}else return!1;return!0;default:return!1}}function H(O,I){return O==="symbol"?!0:I?I["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&I instanceof Symbol:!1}function B(O){var I=typeof O;return Array.isArray(O)?"array":O instanceof RegExp?"object":H(I,O)?"symbol":I}function L(O){if(typeof O>"u"||O===null)return""+O;var I=B(O);if(I==="object"){if(O instanceof Date)return"date";if(O instanceof RegExp)return"regexp"}return I}function J(O){var I=L(O);switch(I){case"array":case"object":return"an "+I;case"boolean":case"date":case"regexp":return"a "+I;default:return I}}function Z(O){return!O.constructor||!O.constructor.name?g:O.constructor.name}return d.checkPropTypes=o,d.resetWarningCache=o.resetWarningCache,d.PropTypes=d,d},qn}var Wn,$a;function yp(){if($a)return Wn;$a=1;var e=Po();function t(){}function r(){}return r.resetWarningCache=t,Wn=function(){function n(s,c,p,f,m,v){if(v!==e){var g=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw g.name="Invariant Violation",g}}n.isRequired=n;function o(){return n}var a={array:n,bigint:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:o,element:n,elementType:n,instanceOf:o,node:n,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:r,resetWarningCache:t};return a.PropTypes=a,a},Wn}if(process.env.NODE_ENV!=="production"){var wp=ti(),xp=!0;io.exports=vp()(wp.isElement,xp)}else io.exports=yp()();var kp=io.exports;const i=dp(kp);function Ep(e){const{prototype:t={}}=e;return!!t.isReactComponent}function ni(e,t,r,n,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let c;const p=a.type;return typeof p=="function"&&!Ep(p)&&(c="Did you accidentally use a plain function component for an element instead?"),c!==void 0?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const oi=lr(i.element,ni);oi.isRequired=lr(i.element.isRequired,ni);const Gr=oi;function Np(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Tp(e,t,r,n,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let c;return typeof a=="function"&&!Np(a)&&(c="Did you accidentally provide a plain function component instead?"),c!==void 0?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Sp=lr(i.elementType,Tp),Cp="exact-prop: ​";function ai(e){return process.env.NODE_ENV==="production"?e:P({},e,{[Cp]:t=>{const r=Object.keys(t).filter(n=>!e.hasOwnProperty(n));return r.length>0?new Error(`The following props are not supported: ${r.map(n=>`\`${n}\``).join(", ")}. Please remove them.`):null}})}function Qt(e){let t="https://mui.com/production-error/?code="+e;for(let r=1;r<arguments.length;r+=1)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var lo={exports:{}},de={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _a;function jp(){if(_a)return de;_a=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function u(b){if(typeof b=="object"&&b!==null){var x=b.$$typeof;switch(x){case e:switch(b=b.type,b){case r:case o:case n:case f:case m:return b;default:switch(b=b&&b.$$typeof,b){case c:case s:case p:case g:case v:case a:return b;default:return x}}case t:return x}}}return de.ContextConsumer=s,de.ContextProvider=a,de.Element=e,de.ForwardRef=p,de.Fragment=r,de.Lazy=g,de.Memo=v,de.Portal=t,de.Profiler=o,de.StrictMode=n,de.Suspense=f,de.SuspenseList=m,de.isAsyncMode=function(){return!1},de.isConcurrentMode=function(){return!1},de.isContextConsumer=function(b){return u(b)===s},de.isContextProvider=function(b){return u(b)===a},de.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===e},de.isForwardRef=function(b){return u(b)===p},de.isFragment=function(b){return u(b)===r},de.isLazy=function(b){return u(b)===g},de.isMemo=function(b){return u(b)===v},de.isPortal=function(b){return u(b)===t},de.isProfiler=function(b){return u(b)===o},de.isStrictMode=function(b){return u(b)===n},de.isSuspense=function(b){return u(b)===f},de.isSuspenseList=function(b){return u(b)===m},de.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===r||b===o||b===n||b===f||b===m||b===d||typeof b=="object"&&b!==null&&(b.$$typeof===g||b.$$typeof===v||b.$$typeof===a||b.$$typeof===s||b.$$typeof===p||b.$$typeof===h||b.getModuleId!==void 0)},de.typeOf=u,de}var ue={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ma;function Op(){return Ma||(Ma=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h=!1,u=!1,b=!1,x=!1,R=!1,w;w=Symbol.for("react.module.reference");function k(D){return!!(typeof D=="string"||typeof D=="function"||D===r||D===o||R||D===n||D===f||D===m||x||D===d||h||u||b||typeof D=="object"&&D!==null&&(D.$$typeof===g||D.$$typeof===v||D.$$typeof===a||D.$$typeof===s||D.$$typeof===p||D.$$typeof===w||D.getModuleId!==void 0))}function y(D){if(typeof D=="object"&&D!==null){var ie=D.$$typeof;switch(ie){case e:var Ne=D.type;switch(Ne){case r:case o:case n:case f:case m:return Ne;default:var Re=Ne&&Ne.$$typeof;switch(Re){case c:case s:case p:case g:case v:case a:return Re;default:return ie}}case t:return ie}}}var S=s,C=a,M=e,A=p,z=r,$=g,N=v,j=t,_=o,H=n,B=f,L=m,J=!1,Z=!1;function O(D){return J||(J=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function I(D){return Z||(Z=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function U(D){return y(D)===s}function K(D){return y(D)===a}function G(D){return typeof D=="object"&&D!==null&&D.$$typeof===e}function q(D){return y(D)===p}function X(D){return y(D)===r}function Y(D){return y(D)===g}function W(D){return y(D)===v}function Q(D){return y(D)===t}function ee(D){return y(D)===o}function se(D){return y(D)===n}function V(D){return y(D)===f}function te(D){return y(D)===m}ue.ContextConsumer=S,ue.ContextProvider=C,ue.Element=M,ue.ForwardRef=A,ue.Fragment=z,ue.Lazy=$,ue.Memo=N,ue.Portal=j,ue.Profiler=_,ue.StrictMode=H,ue.Suspense=B,ue.SuspenseList=L,ue.isAsyncMode=O,ue.isConcurrentMode=I,ue.isContextConsumer=U,ue.isContextProvider=K,ue.isElement=G,ue.isForwardRef=q,ue.isFragment=X,ue.isLazy=Y,ue.isMemo=W,ue.isPortal=Q,ue.isProfiler=ee,ue.isStrictMode=se,ue.isSuspense=V,ue.isSuspenseList=te,ue.isValidElementType=k,ue.typeOf=y}()),ue}process.env.NODE_ENV==="production"?lo.exports=jp():lo.exports=Op();var un=lo.exports;const Rp=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Pp(e){const t=`${e}`.match(Rp);return t&&t[1]||""}function si(e,t=""){return e.displayName||e.name||Pp(e)||t}function Ia(e,t,r){const n=si(t);return e.displayName||(n!==""?`${r}(${n})`:r)}function $p(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return si(e,"Component");if(typeof e=="object")switch(e.$$typeof){case un.ForwardRef:return Ia(e,e.render,"ForwardRef");case un.Memo:return Ia(e,e.type,"memo");default:return}}}function pt(e,t,r,n,o){if(process.env.NODE_ENV==="production")return null;const a=e[t],s=o||t;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an HTMLElement.`):null}const _p=i.oneOfType([i.func,i.object]),$o=_p;function tt(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Qt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function co(...e){return e.reduce((t,r)=>r==null?t:function(...o){t.apply(this,o),r.apply(this,o)},()=>{})}function ii(e,t=166){let r;function n(...o){const a=()=>{e.apply(this,o)};clearTimeout(r),r=setTimeout(a,t)}return n.clear=()=>{clearTimeout(r)},n}function Mp(e,t){return process.env.NODE_ENV==="production"?()=>null:(r,n,o,a,s)=>{const c=o||"<<anonymous>>",p=s||n;return typeof r[n]<"u"?new Error(`The ${a} \`${p}\` of \`${c}\` is deprecated. ${t}`):null}}function Ip(e,t){var r,n;return T.isValidElement(e)&&t.indexOf((r=e.type.muiName)!=null?r:(n=e.type)==null||(n=n._payload)==null||(n=n.value)==null?void 0:n.muiName)!==-1}function je(e){return e&&e.ownerDocument||document}function er(e){return je(e).defaultView||window}function Dp(e,t){if(process.env.NODE_ENV==="production")return()=>null;const r=t?P({},t.propTypes):null;return o=>(a,s,c,p,f,...m)=>{const v=f||s,g=r==null?void 0:r[v];if(g){const d=g(a,s,c,p,f,...m);if(d)return d}return typeof a[s]<"u"&&!a[o]?new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function fn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Ap=typeof window<"u"?T.useLayoutEffect:T.useEffect,Dt=Ap;let Da=0;function Bp(e){const[t,r]=T.useState(e),n=e||t;return T.useEffect(()=>{t==null&&(Da+=1,r(`mui-${Da}`))},[t]),n}const Aa=T["useId".toString()];function li(e){if(Aa!==void 0){const t=Aa();return e??t}return Bp(e)}function Lp(e,t,r,n,o){if(process.env.NODE_ENV==="production")return null;const a=o||t;return typeof e[t]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function ci({controlled:e,default:t,name:r,state:n="value"}){const{current:o}=T.useRef(e!==void 0),[a,s]=T.useState(t),c=o?e:a;if(process.env.NODE_ENV!=="production"){T.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${n} state of ${r} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${r} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[n,r,e]);const{current:f}=T.useRef(t);T.useEffect(()=>{!o&&f!==t&&console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join(`
`))},[JSON.stringify(t)])}const p=T.useCallback(f=>{o||s(f)},[]);return[c,p]}function Ir(e){const t=T.useRef(e);return Dt(()=>{t.current=e}),T.useRef((...r)=>(0,t.current)(...r)).current}function qe(...e){return T.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(r=>{fn(r,t)})},e)}const Ba={};function Fp(e,t){const r=T.useRef(Ba);return r.current===Ba&&(r.current=e(t)),r}const Vp=[];function zp(e){T.useEffect(e,Vp)}class qr{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new qr}start(t,r){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,r()},t)}}function Nr(){const e=Fp(qr.create).current;return zp(e.disposeEffect),e}let Nn=!0,po=!1;const Hp=new qr,Up={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Gp(e){const{type:t,tagName:r}=e;return!!(r==="INPUT"&&Up[t]&&!e.readOnly||r==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function qp(e){e.metaKey||e.altKey||e.ctrlKey||(Nn=!0)}function Xn(){Nn=!1}function Wp(){this.visibilityState==="hidden"&&po&&(Nn=!0)}function Xp(e){e.addEventListener("keydown",qp,!0),e.addEventListener("mousedown",Xn,!0),e.addEventListener("pointerdown",Xn,!0),e.addEventListener("touchstart",Xn,!0),e.addEventListener("visibilitychange",Wp,!0)}function Yp(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Nn||Gp(t)}function pi(){const e=T.useCallback(o=>{o!=null&&Xp(o.ownerDocument)},[]),t=T.useRef(!1);function r(){return t.current?(po=!0,Hp.start(100,()=>{po=!1}),t.current=!1,!0):!1}function n(o){return Yp(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:n,onBlur:r,ref:e}}function di(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Kp(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function Jp(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Zp=Number.isInteger||Jp;function ui(e,t,r,n){const o=e[t];if(o==null||!Zp(o)){const a=Kp(o);return new RangeError(`Invalid ${n} \`${t}\` of type \`${a}\` supplied to \`${r}\`, expected \`integer\`.`)}return null}function fi(e,t,...r){return e[t]===void 0?null:ui(e,t,...r)}function uo(){return null}fi.isRequired=ui;uo.isRequired=uo;const mi=process.env.NODE_ENV==="production"?uo:fi;function hi(e,t){const r=P({},t);return Object.keys(e).forEach(n=>{if(n.toString().match(/^(components|slots)$/))r[n]=P({},e[n],r[n]);else if(n.toString().match(/^(componentsProps|slotProps)$/)){const o=e[n]||{},a=t[n];r[n]={},!a||!Object.keys(a)?r[n]=o:!o||!Object.keys(o)?r[n]=a:(r[n]=P({},a),Object.keys(o).forEach(s=>{r[n][s]=hi(o[s],a[s])}))}else r[n]===void 0&&(r[n]=e[n])}),r}function ft(e,t,r=void 0){const n={};return Object.keys(e).forEach(o=>{n[o]=e[o].reduce((a,s)=>{if(s){const c=t(s);c!==""&&a.push(c),r&&r[s]&&a.push(r[s])}return a},[]).join(" ")}),n}const La=e=>e,Qp=()=>{let e=La;return{configure(t){e=t},generate(t){return e(t)},reset(){e=La}}},ed=Qp(),gi=ed,bi={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function nt(e,t,r="Mui"){const n=bi[t];return n?`${r}-${n}`:`${gi.generate(e)}-${t}`}function xt(e,t,r="Mui"){const n={};return t.forEach(o=>{n[o]=nt(e,o,r)}),n}function td(e,t=Number.MIN_SAFE_INTEGER,r=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,r))}function me(e,t){if(e==null)return{};var r={},n=Object.keys(e),o,a;for(a=0;a<n.length;a++)o=n[a],!(t.indexOf(o)>=0)&&(r[o]=e[o]);return r}const rd=["values","unit","step"],nd=e=>{const t=Object.keys(e).map(r=>({key:r,val:e[r]}))||[];return t.sort((r,n)=>r.val-n.val),t.reduce((r,n)=>P({},r,{[n.key]:n.val}),{})};function od(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:r="px",step:n=5}=e,o=me(e,rd),a=nd(t),s=Object.keys(a);function c(g){return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${r})`}function p(g){return`@media (max-width:${(typeof t[g]=="number"?t[g]:g)-n/100}${r})`}function f(g,d){const h=s.indexOf(d);return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${r}) and (max-width:${(h!==-1&&typeof t[s[h]]=="number"?t[s[h]]:d)-n/100}${r})`}function m(g){return s.indexOf(g)+1<s.length?f(g,s[s.indexOf(g)+1]):c(g)}function v(g){const d=s.indexOf(g);return d===0?c(s[1]):d===s.length-1?p(s[d]):f(g,s[s.indexOf(g)+1]).replace("@media","@media not all and")}return P({keys:s,values:a,up:c,down:p,between:f,only:m,not:v,unit:r},o)}const ad={borderRadius:4},sd=ad,id=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.string,i.object,i.array]):{},kt=id;function jr(e,t){return t?ct(e,t,{clone:!1}):e}const _o={xs:0,sm:600,md:900,lg:1200,xl:1536},Fa={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${_o[e]}px)`};function dt(e,t,r){const n=e.theme||{};if(Array.isArray(t)){const a=n.breakpoints||Fa;return t.reduce((s,c,p)=>(s[a.up(a.keys[p])]=r(t[p]),s),{})}if(typeof t=="object"){const a=n.breakpoints||Fa;return Object.keys(t).reduce((s,c)=>{if(Object.keys(a.values||_o).indexOf(c)!==-1){const p=a.up(c);s[p]=r(t[c],c)}else{const p=c;s[p]=t[p]}return s},{})}return r(t)}function ld(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((n,o)=>{const a=e.up(o);return n[a]={},n},{}))||{}}function cd(e,t){return e.reduce((r,n)=>{const o=r[n];return(!o||Object.keys(o).length===0)&&delete r[n],r},t)}function Tn(e,t,r=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&r){const n=`vars.${t}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(n!=null)return n}return t.split(".").reduce((n,o)=>n&&n[o]!=null?n[o]:null,e)}function mn(e,t,r,n=r){let o;return typeof e=="function"?o=e(r):Array.isArray(e)?o=e[r]||n:o=Tn(e,r)||n,t&&(o=t(o,n,e)),o}function ke(e){const{prop:t,cssProperty:r=e.prop,themeKey:n,transform:o}=e,a=s=>{if(s[t]==null)return null;const c=s[t],p=s.theme,f=Tn(p,n)||{};return dt(s,c,v=>{let g=mn(f,o,v);return v===g&&typeof v=="string"&&(g=mn(f,o,`${t}${v==="default"?"":tt(v)}`,v)),r===!1?g:{[r]:g}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[t]:kt}:{},a.filterProps=[t],a}function pd(e){const t={};return r=>(t[r]===void 0&&(t[r]=e(r)),t[r])}const dd={m:"margin",p:"padding"},ud={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Va={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},fd=pd(e=>{if(e.length>2)if(Va[e])e=Va[e];else return[e];const[t,r]=e.split(""),n=dd[t],o=ud[r]||"";return Array.isArray(o)?o.map(a=>n+a):[n+o]}),Sn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Cn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],md=[...Sn,...Cn];function Wr(e,t,r,n){var o;const a=(o=Tn(e,t,!1))!=null?o:r;return typeof a=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${n} argument to be a number or a string, got ${s}.`),a*s):Array.isArray(a)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>a.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${s} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),a[s]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function vi(e){return Wr(e,"spacing",8,"spacing")}function Xr(e,t){if(typeof t=="string"||t==null)return t;const r=Math.abs(t),n=e(r);return t>=0?n:typeof n=="number"?-n:`-${n}`}function hd(e,t){return r=>e.reduce((n,o)=>(n[o]=Xr(t,r),n),{})}function gd(e,t,r,n){if(t.indexOf(r)===-1)return null;const o=fd(r),a=hd(o,n),s=e[r];return dt(e,s,a)}function yi(e,t){const r=vi(e.theme);return Object.keys(e).map(n=>gd(e,t,n,r)).reduce(jr,{})}function ve(e){return yi(e,Sn)}ve.propTypes=process.env.NODE_ENV!=="production"?Sn.reduce((e,t)=>(e[t]=kt,e),{}):{};ve.filterProps=Sn;function ye(e){return yi(e,Cn)}ye.propTypes=process.env.NODE_ENV!=="production"?Cn.reduce((e,t)=>(e[t]=kt,e),{}):{};ye.filterProps=Cn;process.env.NODE_ENV!=="production"&&md.reduce((e,t)=>(e[t]=kt,e),{});function bd(e=8){if(e.mui)return e;const t=vi({spacing:e}),r=(...n)=>(process.env.NODE_ENV!=="production"&&(n.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)),(n.length===0?[1]:n).map(a=>{const s=t(a);return typeof s=="number"?`${s}px`:s}).join(" "));return r.mui=!0,r}function jn(...e){const t=e.reduce((n,o)=>(o.filterProps.forEach(a=>{n[a]=o}),n),{}),r=n=>Object.keys(n).reduce((o,a)=>t[a]?jr(o,t[a](n)):o,{});return r.propTypes=process.env.NODE_ENV!=="production"?e.reduce((n,o)=>Object.assign(n,o.propTypes),{}):{},r.filterProps=e.reduce((n,o)=>n.concat(o.filterProps),[]),r}function He(e){return typeof e!="number"?e:`${e}px solid`}function Ye(e,t){return ke({prop:e,themeKey:"borders",transform:t})}const vd=Ye("border",He),yd=Ye("borderTop",He),wd=Ye("borderRight",He),xd=Ye("borderBottom",He),kd=Ye("borderLeft",He),Ed=Ye("borderColor"),Nd=Ye("borderTopColor"),Td=Ye("borderRightColor"),Sd=Ye("borderBottomColor"),Cd=Ye("borderLeftColor"),jd=Ye("outline",He),Od=Ye("outlineColor"),On=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Wr(e.theme,"shape.borderRadius",4,"borderRadius"),r=n=>({borderRadius:Xr(t,n)});return dt(e,e.borderRadius,r)}return null};On.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:kt}:{};On.filterProps=["borderRadius"];jn(vd,yd,wd,xd,kd,Ed,Nd,Td,Sd,Cd,On,jd,Od);const Rn=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Wr(e.theme,"spacing",8,"gap"),r=n=>({gap:Xr(t,n)});return dt(e,e.gap,r)}return null};Rn.propTypes=process.env.NODE_ENV!=="production"?{gap:kt}:{};Rn.filterProps=["gap"];const Pn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Wr(e.theme,"spacing",8,"columnGap"),r=n=>({columnGap:Xr(t,n)});return dt(e,e.columnGap,r)}return null};Pn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:kt}:{};Pn.filterProps=["columnGap"];const $n=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Wr(e.theme,"spacing",8,"rowGap"),r=n=>({rowGap:Xr(t,n)});return dt(e,e.rowGap,r)}return null};$n.propTypes=process.env.NODE_ENV!=="production"?{rowGap:kt}:{};$n.filterProps=["rowGap"];const Rd=ke({prop:"gridColumn"}),Pd=ke({prop:"gridRow"}),$d=ke({prop:"gridAutoFlow"}),_d=ke({prop:"gridAutoColumns"}),Md=ke({prop:"gridAutoRows"}),Id=ke({prop:"gridTemplateColumns"}),Dd=ke({prop:"gridTemplateRows"}),Ad=ke({prop:"gridTemplateAreas"}),Bd=ke({prop:"gridArea"});jn(Rn,Pn,$n,Rd,Pd,$d,_d,Md,Id,Dd,Ad,Bd);function Yt(e,t){return t==="grey"?t:e}const Ld=ke({prop:"color",themeKey:"palette",transform:Yt}),Fd=ke({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Yt}),Vd=ke({prop:"backgroundColor",themeKey:"palette",transform:Yt});jn(Ld,Fd,Vd);function Fe(e){return e<=1&&e!==0?`${e*100}%`:e}const zd=ke({prop:"width",transform:Fe}),Mo=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=r=>{var n,o;const a=((n=e.theme)==null||(n=n.breakpoints)==null||(n=n.values)==null?void 0:n[r])||_o[r];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:Fe(r)}};return dt(e,e.maxWidth,t)}return null};Mo.filterProps=["maxWidth"];const Hd=ke({prop:"minWidth",transform:Fe}),Ud=ke({prop:"height",transform:Fe}),Gd=ke({prop:"maxHeight",transform:Fe}),qd=ke({prop:"minHeight",transform:Fe});ke({prop:"size",cssProperty:"width",transform:Fe});ke({prop:"size",cssProperty:"height",transform:Fe});const Wd=ke({prop:"boxSizing"});jn(zd,Mo,Hd,Ud,Gd,qd,Wd);const Xd={border:{themeKey:"borders",transform:He},borderTop:{themeKey:"borders",transform:He},borderRight:{themeKey:"borders",transform:He},borderBottom:{themeKey:"borders",transform:He},borderLeft:{themeKey:"borders",transform:He},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:He},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:On},color:{themeKey:"palette",transform:Yt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Yt},backgroundColor:{themeKey:"palette",transform:Yt},p:{style:ye},pt:{style:ye},pr:{style:ye},pb:{style:ye},pl:{style:ye},px:{style:ye},py:{style:ye},padding:{style:ye},paddingTop:{style:ye},paddingRight:{style:ye},paddingBottom:{style:ye},paddingLeft:{style:ye},paddingX:{style:ye},paddingY:{style:ye},paddingInline:{style:ye},paddingInlineStart:{style:ye},paddingInlineEnd:{style:ye},paddingBlock:{style:ye},paddingBlockStart:{style:ye},paddingBlockEnd:{style:ye},m:{style:ve},mt:{style:ve},mr:{style:ve},mb:{style:ve},ml:{style:ve},mx:{style:ve},my:{style:ve},margin:{style:ve},marginTop:{style:ve},marginRight:{style:ve},marginBottom:{style:ve},marginLeft:{style:ve},marginX:{style:ve},marginY:{style:ve},marginInline:{style:ve},marginInlineStart:{style:ve},marginInlineEnd:{style:ve},marginBlock:{style:ve},marginBlockStart:{style:ve},marginBlockEnd:{style:ve},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Rn},rowGap:{style:$n},columnGap:{style:Pn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Fe},maxWidth:{style:Mo},minWidth:{transform:Fe},height:{transform:Fe},maxHeight:{transform:Fe},minHeight:{transform:Fe},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Io=Xd;function Yd(...e){const t=e.reduce((n,o)=>n.concat(Object.keys(o)),[]),r=new Set(t);return e.every(n=>r.size===Object.keys(n).length)}function Kd(e,t){return typeof e=="function"?e(t):e}function Jd(){function e(r,n,o,a){const s={[r]:n,theme:o},c=a[r];if(!c)return{[r]:n};const{cssProperty:p=r,themeKey:f,transform:m,style:v}=c;if(n==null)return null;if(f==="typography"&&n==="inherit")return{[r]:n};const g=Tn(o,f)||{};return v?v(s):dt(s,n,h=>{let u=mn(g,m,h);return h===u&&typeof h=="string"&&(u=mn(g,m,`${r}${h==="default"?"":tt(h)}`,h)),p===!1?u:{[p]:u}})}function t(r){var n;const{sx:o,theme:a={}}=r||{};if(!o)return null;const s=(n=a.unstable_sxConfig)!=null?n:Io;function c(p){let f=p;if(typeof p=="function")f=p(a);else if(typeof p!="object")return p;if(!f)return null;const m=ld(a.breakpoints),v=Object.keys(m);let g=m;return Object.keys(f).forEach(d=>{const h=Kd(f[d],a);if(h!=null)if(typeof h=="object")if(s[d])g=jr(g,e(d,h,a,s));else{const u=dt({theme:a},h,b=>({[d]:b}));Yd(u,h)?g[d]=t({sx:h,theme:a}):g=jr(g,u)}else g=jr(g,e(d,h,a,s))}),cd(v,g)}return Array.isArray(o)?o.map(c):c(o)}return t}const wi=Jd();wi.filterProps=["sx"];const Do=wi;function Zd(e,t){const r=this;return r.vars&&typeof r.getColorSchemeSelector=="function"?{[r.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:r.palette.mode===e?t:{}}const Qd=["breakpoints","palette","spacing","shape"];function Ao(e={},...t){const{breakpoints:r={},palette:n={},spacing:o,shape:a={}}=e,s=me(e,Qd),c=od(r),p=bd(o);let f=ct({breakpoints:c,direction:"ltr",components:{},palette:P({mode:"light"},n),spacing:p,shape:P({},sd,a)},s);return f.applyStyles=Zd,f=t.reduce((m,v)=>ct(m,v),f),f.unstable_sxConfig=P({},Io,s==null?void 0:s.unstable_sxConfig),f.unstable_sx=function(v){return Do({sx:v,theme:this})},f}function eu(e){return Object.keys(e).length===0}function xi(e=null){const t=T.useContext(oo.ThemeContext);return!t||eu(t)?e:t}const tu=Ao();function ki(e=tu){return xi(e)}const ru=["ownerState"],nu=["variants"],ou=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function au(e){return Object.keys(e).length===0}function su(e){return typeof e=="string"&&e.charCodeAt(0)>96}function sn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const iu=Ao(),za=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function rn({defaultTheme:e,theme:t,themeId:r}){return au(t)?e:t[r]||t}function lu(e){return e?(t,r)=>r[e]:null}function ln(e,t){let{ownerState:r}=t,n=me(t,ru);const o=typeof e=="function"?e(P({ownerState:r},n)):e;if(Array.isArray(o))return o.flatMap(a=>ln(a,P({ownerState:r},n)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let c=me(o,nu);return a.forEach(p=>{let f=!0;typeof p.props=="function"?f=p.props(P({ownerState:r},n,r)):Object.keys(p.props).forEach(m=>{(r==null?void 0:r[m])!==p.props[m]&&n[m]!==p.props[m]&&(f=!1)}),f&&(Array.isArray(c)||(c=[c]),c.push(typeof p.style=="function"?p.style(P({ownerState:r},n,r)):p.style))}),c}return o}function cu(e={}){const{themeId:t,defaultTheme:r=iu,rootShouldForwardProp:n=sn,slotShouldForwardProp:o=sn}=e,a=s=>Do(P({},s,{theme:rn(P({},s,{defaultTheme:r,themeId:t}))}));return a.__mui_systemSx=!0,(s,c={})=>{oo.internal_processStyles(s,y=>y.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:p,slot:f,skipVariantsResolver:m,skipSx:v,overridesResolver:g=lu(za(f))}=c,d=me(c,ou),h=m!==void 0?m:f&&f!=="Root"&&f!=="root"||!1,u=v||!1;let b;process.env.NODE_ENV!=="production"&&p&&(b=`${p}-${za(f||"Root")}`);let x=sn;f==="Root"||f==="root"?x=n:f?x=o:su(s)&&(x=void 0);const R=oo(s,P({shouldForwardProp:x,label:b},d)),w=y=>typeof y=="function"&&y.__emotion_real!==y||Pt(y)?S=>ln(y,P({},S,{theme:rn({theme:S.theme,defaultTheme:r,themeId:t})})):y,k=(y,...S)=>{let C=w(y);const M=S?S.map(w):[];p&&g&&M.push($=>{const N=rn(P({},$,{defaultTheme:r,themeId:t}));if(!N.components||!N.components[p]||!N.components[p].styleOverrides)return null;const j=N.components[p].styleOverrides,_={};return Object.entries(j).forEach(([H,B])=>{_[H]=ln(B,P({},$,{theme:N}))}),g($,_)}),p&&!h&&M.push($=>{var N;const j=rn(P({},$,{defaultTheme:r,themeId:t})),_=j==null||(N=j.components)==null||(N=N[p])==null?void 0:N.variants;return ln({variants:_},P({},$,{theme:j}))}),u||M.push(a);const A=M.length-S.length;if(Array.isArray(y)&&A>0){const $=new Array(A).fill("");C=[...y,...$],C.raw=[...y.raw,...$]}const z=R(C,...M);if(process.env.NODE_ENV!=="production"){let $;p&&($=`${p}${tt(f||"")}`),$===void 0&&($=`Styled(${$p(s)})`),z.displayName=$}return s.muiName&&(z.muiName=s.muiName),z};return R.withConfig&&(k.withConfig=R.withConfig),k}}function pu(e){const{theme:t,name:r,props:n}=e;return!t||!t.components||!t.components[r]||!t.components[r].defaultProps?n:hi(t.components[r].defaultProps,n)}function du({props:e,name:t,defaultTheme:r,themeId:n}){let o=ki(r);return n&&(o=o[n]||o),pu({theme:o,name:t,props:e})}function Bo(e,t=0,r=1){return process.env.NODE_ENV!=="production"&&(e<t||e>r)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`),td(e,t,r)}function uu(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let r=e.match(t);return r&&r[0].length===1&&(r=r.map(n=>n+n)),r?`rgb${r.length===4?"a":""}(${r.map((n,o)=>o<3?parseInt(n,16):Math.round(parseInt(n,16)/255*1e3)/1e3).join(", ")})`:""}function At(e){if(e.type)return e;if(e.charAt(0)==="#")return At(uu(e));const t=e.indexOf("("),r=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Qt(9,e));let n=e.substring(t+1,e.length-1),o;if(r==="color"){if(n=n.split(" "),o=n.shift(),n.length===4&&n[3].charAt(0)==="/"&&(n[3]=n[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Qt(10,o))}else n=n.split(",");return n=n.map(a=>parseFloat(a)),{type:r,values:n,colorSpace:o}}function _n(e){const{type:t,colorSpace:r}=e;let{values:n}=e;return t.indexOf("rgb")!==-1?n=n.map((o,a)=>a<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(n[1]=`${n[1]}%`,n[2]=`${n[2]}%`),t.indexOf("color")!==-1?n=`${r} ${n.join(" ")}`:n=`${n.join(", ")}`,`${t}(${n})`}function fu(e){e=At(e);const{values:t}=e,r=t[0],n=t[1]/100,o=t[2]/100,a=n*Math.min(o,1-o),s=(f,m=(f+r/30)%12)=>o-a*Math.max(Math.min(m-3,9-m,1),-1);let c="rgb";const p=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(c+="a",p.push(t[3])),_n({type:c,values:p})}function Ha(e){e=At(e);let t=e.type==="hsl"||e.type==="hsla"?At(fu(e)).values:e.values;return t=t.map(r=>(e.type!=="color"&&(r/=255),r<=.03928?r/12.92:((r+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Ua(e,t){const r=Ha(e),n=Ha(t);return(Math.max(r,n)+.05)/(Math.min(r,n)+.05)}function hn(e,t){return e=At(e),t=Bo(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,_n(e)}function mu(e,t){if(e=At(e),t=Bo(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]*=1-t;return _n(e)}function hu(e,t){if(e=At(e),t=Bo(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(255-e.values[r])*t;else if(e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(1-e.values[r])*t;return _n(e)}function gu(e,t){return P({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const bu={black:"#000",white:"#fff"},Dr=bu,vu={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},yu=vu,wu={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Vt=wu,xu={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},zt=xu,ku={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},br=ku,Eu={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ht=Eu,Nu={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Ut=Nu,Tu={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Gt=Tu,Su=["mode","contrastThreshold","tonalOffset"],Ga={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Dr.white,default:Dr.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Yn={text:{primary:Dr.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Dr.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function qa(e,t,r,n){const o=n.light||n,a=n.dark||n*1.5;e[t]||(e.hasOwnProperty(r)?e[t]=e[r]:t==="light"?e.light=hu(e.main,o):t==="dark"&&(e.dark=mu(e.main,a)))}function Cu(e="light"){return e==="dark"?{main:Ht[200],light:Ht[50],dark:Ht[400]}:{main:Ht[700],light:Ht[400],dark:Ht[800]}}function ju(e="light"){return e==="dark"?{main:Vt[200],light:Vt[50],dark:Vt[400]}:{main:Vt[500],light:Vt[300],dark:Vt[700]}}function Ou(e="light"){return e==="dark"?{main:zt[500],light:zt[300],dark:zt[700]}:{main:zt[700],light:zt[400],dark:zt[800]}}function Ru(e="light"){return e==="dark"?{main:Ut[400],light:Ut[300],dark:Ut[700]}:{main:Ut[700],light:Ut[500],dark:Ut[900]}}function Pu(e="light"){return e==="dark"?{main:Gt[400],light:Gt[300],dark:Gt[700]}:{main:Gt[800],light:Gt[500],dark:Gt[900]}}function $u(e="light"){return e==="dark"?{main:br[400],light:br[300],dark:br[700]}:{main:"#ed6c02",light:br[500],dark:br[900]}}function _u(e){const{mode:t="light",contrastThreshold:r=3,tonalOffset:n=.2}=e,o=me(e,Su),a=e.primary||Cu(t),s=e.secondary||ju(t),c=e.error||Ou(t),p=e.info||Ru(t),f=e.success||Pu(t),m=e.warning||$u(t);function v(u){const b=Ua(u,Yn.text.primary)>=r?Yn.text.primary:Ga.text.primary;if(process.env.NODE_ENV!=="production"){const x=Ua(u,b);x<3&&console.error([`MUI: The contrast ratio of ${x}:1 for ${b} on ${u}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return b}const g=({color:u,name:b,mainShade:x=500,lightShade:R=300,darkShade:w=700})=>{if(u=P({},u),!u.main&&u[x]&&(u.main=u[x]),!u.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.`:Qt(11,b?` (${b})`:"",x));if(typeof u.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(u.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Qt(12,b?` (${b})`:"",JSON.stringify(u.main)));return qa(u,"light",R,n),qa(u,"dark",w,n),u.contrastText||(u.contrastText=v(u.main)),u},d={dark:Yn,light:Ga};return process.env.NODE_ENV!=="production"&&(d[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),ct(P({common:P({},Dr),mode:t,primary:g({color:a,name:"primary"}),secondary:g({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:g({color:c,name:"error"}),warning:g({color:m,name:"warning"}),info:g({color:p,name:"info"}),success:g({color:f,name:"success"}),grey:yu,contrastThreshold:r,getContrastText:v,augmentColor:g,tonalOffset:n},d[t]),o)}const Mu=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Iu(e){return Math.round(e*1e5)/1e5}const Wa={textTransform:"uppercase"},Xa='"Roboto", "Helvetica", "Arial", sans-serif';function Du(e,t){const r=typeof t=="function"?t(e):t,{fontFamily:n=Xa,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:s=400,fontWeightMedium:c=500,fontWeightBold:p=700,htmlFontSize:f=16,allVariants:m,pxToRem:v}=r,g=me(r,Mu);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof f!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const d=o/14,h=v||(x=>`${x/f*d}rem`),u=(x,R,w,k,y)=>P({fontFamily:n,fontWeight:x,fontSize:h(R),lineHeight:w},n===Xa?{letterSpacing:`${Iu(k/R)}em`}:{},y,m),b={h1:u(a,96,1.167,-1.5),h2:u(a,60,1.2,-.5),h3:u(s,48,1.167,0),h4:u(s,34,1.235,.25),h5:u(s,24,1.334,0),h6:u(c,20,1.6,.15),subtitle1:u(s,16,1.75,.15),subtitle2:u(c,14,1.57,.1),body1:u(s,16,1.5,.15),body2:u(s,14,1.43,.15),button:u(c,14,1.75,.4,Wa),caption:u(s,12,1.66,.4),overline:u(s,12,2.66,1,Wa),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return ct(P({htmlFontSize:f,pxToRem:h,fontFamily:n,fontSize:o,fontWeightLight:a,fontWeightRegular:s,fontWeightMedium:c,fontWeightBold:p},b),g,{clone:!1})}const Au=.2,Bu=.14,Lu=.12;function ge(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Au})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Bu})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Lu})`].join(",")}const Fu=["none",ge(0,2,1,-1,0,1,1,0,0,1,3,0),ge(0,3,1,-2,0,2,2,0,0,1,5,0),ge(0,3,3,-2,0,3,4,0,0,1,8,0),ge(0,2,4,-1,0,4,5,0,0,1,10,0),ge(0,3,5,-1,0,5,8,0,0,1,14,0),ge(0,3,5,-1,0,6,10,0,0,1,18,0),ge(0,4,5,-2,0,7,10,1,0,2,16,1),ge(0,5,5,-3,0,8,10,1,0,3,14,2),ge(0,5,6,-3,0,9,12,1,0,3,16,2),ge(0,6,6,-3,0,10,14,1,0,4,18,3),ge(0,6,7,-4,0,11,15,1,0,4,20,3),ge(0,7,8,-4,0,12,17,2,0,5,22,4),ge(0,7,8,-4,0,13,19,2,0,5,24,4),ge(0,7,9,-4,0,14,21,2,0,5,26,4),ge(0,8,9,-5,0,15,22,2,0,6,28,5),ge(0,8,10,-5,0,16,24,2,0,6,30,5),ge(0,8,11,-5,0,17,26,2,0,6,32,5),ge(0,9,11,-5,0,18,28,2,0,7,34,6),ge(0,9,12,-6,0,19,29,2,0,7,36,6),ge(0,10,13,-6,0,20,31,3,0,8,38,7),ge(0,10,13,-6,0,21,33,3,0,8,40,7),ge(0,10,14,-6,0,22,35,3,0,8,42,7),ge(0,11,14,-7,0,23,36,3,0,9,44,8),ge(0,11,15,-7,0,24,38,3,0,9,46,8)],Vu=Fu,zu=["duration","easing","delay"],Hu={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Uu={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Ya(e){return`${Math.round(e)}ms`}function Gu(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function qu(e){const t=P({},Hu,e.easing),r=P({},Uu,e.duration);return P({getAutoHeightDuration:Gu,create:(o=["all"],a={})=>{const{duration:s=r.standard,easing:c=t.easeInOut,delay:p=0}=a,f=me(a,zu);if(process.env.NODE_ENV!=="production"){const m=g=>typeof g=="string",v=g=>!isNaN(parseFloat(g));!m(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!v(s)&&!m(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),m(c)||console.error('MUI: Argument "easing" must be a string.'),!v(p)&&!m(p)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(f).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(f).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(m=>`${m} ${typeof s=="string"?s:Ya(s)} ${c} ${typeof p=="string"?p:Ya(p)}`).join(",")}},e,{easing:t,duration:r})}const Wu={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Xu=Wu,Yu=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Ku(e={},...t){const{mixins:r={},palette:n={},transitions:o={},typography:a={}}=e,s=me(e,Yu);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Qt(18));const c=_u(n),p=Ao(e);let f=ct(p,{mixins:gu(p.breakpoints,r),palette:c,shadows:Vu.slice(),typography:Du(c,a),transitions:qu(o),zIndex:P({},Xu)});if(f=ct(f,s),f=t.reduce((m,v)=>ct(m,v),f),process.env.NODE_ENV!=="production"){const m=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],v=(g,d)=>{let h;for(h in g){const u=g[h];if(m.indexOf(h)!==-1&&Object.keys(u).length>0){if(process.env.NODE_ENV!=="production"){const b=nt("",h);console.error([`MUI: The \`${d}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(g,null,2),"",`Instead, you need to use the '&.${b}' syntax:`,JSON.stringify({root:{[`&.${b}`]:u}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}g[h]={}}}};Object.keys(f.components).forEach(g=>{const d=f.components[g].styleOverrides;d&&g.indexOf("Mui")===0&&v(d,g)})}return f.unstable_sxConfig=P({},Io,s==null?void 0:s.unstable_sxConfig),f.unstable_sx=function(v){return Do({sx:v,theme:this})},f}const Ju=Ku(),Lo=Ju,Fo="$$material";function mt({props:e,name:t}){return du({props:e,name:t,defaultTheme:Lo,themeId:Fo})}const Ei=e=>sn(e)&&e!=="classes",Zu=cu({themeId:Fo,defaultTheme:Lo,rootShouldForwardProp:Ei}),Oe=Zu;function Qu(e){return nt("MuiSvgIcon",e)}xt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const ef=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],tf=e=>{const{color:t,fontSize:r,classes:n}=e,o={root:["root",t!=="inherit"&&`color${tt(t)}`,`fontSize${tt(r)}`]};return ft(o,Qu,n)},rf=Oe("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.color!=="inherit"&&t[`color${tt(r.color)}`],t[`fontSize${tt(r.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var r,n,o,a,s,c,p,f,m,v,g,d,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(r=e.transitions)==null||(n=r.create)==null?void 0:n.call(r,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((c=e.typography)==null||(p=c.pxToRem)==null?void 0:p.call(c,24))||"1.5rem",large:((f=e.typography)==null||(m=f.pxToRem)==null?void 0:m.call(f,35))||"2.1875rem"}[t.fontSize],color:(v=(g=(e.vars||e).palette)==null||(g=g[t.color])==null?void 0:g.main)!=null?v:{action:(d=(e.vars||e).palette)==null||(d=d.action)==null?void 0:d.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),Vo=T.forwardRef(function(t,r){const n=mt({props:t,name:"MuiSvgIcon"}),{children:o,className:a,color:s="inherit",component:c="svg",fontSize:p="medium",htmlColor:f,inheritViewBox:m=!1,titleAccess:v,viewBox:g="0 0 24 24"}=n,d=me(n,ef),h=T.isValidElement(o)&&o.type==="svg",u=P({},n,{color:s,component:c,fontSize:p,instanceFontSize:t.fontSize,inheritViewBox:m,viewBox:g,hasSvgAsChild:h}),b={};m||(b.viewBox=g);const x=tf(u);return l.jsxs(rf,P({as:c,className:Se(x.root,a),focusable:"false",color:f,"aria-hidden":v?void 0:!0,role:v?"img":void 0,ref:r},b,d,h&&o.props,{ownerState:u,children:[h?o.props.children:o,v?l.jsx("title",{children:v}):null]}))});process.env.NODE_ENV!=="production"&&(Vo.propTypes={children:i.node,classes:i.object,className:i.string,color:i.oneOfType([i.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),i.string]),component:i.elementType,fontSize:i.oneOfType([i.oneOf(["inherit","large","medium","small"]),i.string]),htmlColor:i.string,inheritViewBox:i.bool,shapeRendering:i.string,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),titleAccess:i.string,viewBox:i.string});Vo.muiName="SvgIcon";const Ka=Vo;function Ni(e,t){function r(n,o){return l.jsx(Ka,P({"data-testid":`${t}Icon`,ref:o},n,{children:e}))}return process.env.NODE_ENV!=="production"&&(r.displayName=`${t}Icon`),r.muiName=Ka.muiName,T.memo(T.forwardRef(r))}const nf={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),gi.configure(e)}},of=Object.freeze(Object.defineProperty({__proto__:null,capitalize:tt,createChainedFunction:co,createSvgIcon:Ni,debounce:ii,deprecatedPropType:Mp,isMuiElement:Ip,ownerDocument:je,ownerWindow:er,requirePropFactory:Dp,setRef:fn,unstable_ClassNameGenerator:nf,unstable_useEnhancedEffect:Dt,unstable_useId:li,unsupportedProp:Lp,useControlled:ci,useEventCallback:Ir,useForkRef:qe,useIsFocusVisible:pi},Symbol.toStringTag,{value:"Module"})),af=up(of);var Ja;function sf(){return Ja||(Ja=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=af}(Vn)),Vn}var lf=fp;Object.defineProperty(Ro,"__esModule",{value:!0});var Ti=Ro.default=void 0,cf=lf(sf()),pf=l;Ti=Ro.default=(0,cf.default)((0,pf.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function Si(e){return typeof e=="string"}function Tr(e,t,r){return e===void 0||Si(e)?t:P({},t,{ownerState:P({},t.ownerState,r)})}const df={disableDefaultClasses:!1},uf=T.createContext(df);function ff(e){const{disableDefaultClasses:t}=T.useContext(uf);return r=>t?"":e(r)}function Ci(e,t=[]){if(e===void 0)return{};const r={};return Object.keys(e).filter(n=>n.match(/^on[A-Z]/)&&typeof e[n]=="function"&&!t.includes(n)).forEach(n=>{r[n]=e[n]}),r}function mf(e,t,r){return typeof e=="function"?e(t,r):e}function Za(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(r=>!(r.match(/^on[A-Z]/)&&typeof e[r]=="function")).forEach(r=>{t[r]=e[r]}),t}function hf(e){const{getSlotProps:t,additionalProps:r,externalSlotProps:n,externalForwardedProps:o,className:a}=e;if(!t){const d=Se(r==null?void 0:r.className,a,o==null?void 0:o.className,n==null?void 0:n.className),h=P({},r==null?void 0:r.style,o==null?void 0:o.style,n==null?void 0:n.style),u=P({},r,o,n);return d.length>0&&(u.className=d),Object.keys(h).length>0&&(u.style=h),{props:u,internalRef:void 0}}const s=Ci(P({},o,n)),c=Za(n),p=Za(o),f=t(s),m=Se(f==null?void 0:f.className,r==null?void 0:r.className,a,o==null?void 0:o.className,n==null?void 0:n.className),v=P({},f==null?void 0:f.style,r==null?void 0:r.style,o==null?void 0:o.style,n==null?void 0:n.style),g=P({},f,r,p,c);return m.length>0&&(g.className=m),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:f.ref}}const gf=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Bt(e){var t;const{elementType:r,externalSlotProps:n,ownerState:o,skipResolvingSlotProps:a=!1}=e,s=me(e,gf),c=a?{}:mf(n,o),{props:p,internalRef:f}=hf(P({},s,{externalSlotProps:c})),m=qe(f,c==null?void 0:c.ref,(t=e.additionalProps)==null?void 0:t.ref);return Tr(r,P({},p,{ref:m}),o)}const ji="base";function bf(e){return`${ji}--${e}`}function vf(e,t){return`${ji}-${e}-${t}`}function Oi(e,t){const r=bi[t];return r?bf(r):vf(e,t)}function yf(e,t){const r={};return t.forEach(n=>{r[n]=Oi(e,n)}),r}const wf=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function xf(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function kf(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=n=>e.ownerDocument.querySelector(`input[type="radio"]${n}`);let r=t(`[name="${e.name}"]:checked`);return r||(r=t(`[name="${e.name}"]`)),r!==e}function Ef(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||kf(e))}function Nf(e){const t=[],r=[];return Array.from(e.querySelectorAll(wf)).forEach((n,o)=>{const a=xf(n);a===-1||!Ef(n)||(a===0?t.push(n):r.push({documentOrder:o,tabIndex:a,node:n}))}),r.sort((n,o)=>n.tabIndex===o.tabIndex?n.documentOrder-o.documentOrder:n.tabIndex-o.tabIndex).map(n=>n.node).concat(t)}function Tf(){return!0}function gn(e){const{children:t,disableAutoFocus:r=!1,disableEnforceFocus:n=!1,disableRestoreFocus:o=!1,getTabbable:a=Nf,isEnabled:s=Tf,open:c}=e,p=T.useRef(!1),f=T.useRef(null),m=T.useRef(null),v=T.useRef(null),g=T.useRef(null),d=T.useRef(!1),h=T.useRef(null),u=qe(t.ref,h),b=T.useRef(null);T.useEffect(()=>{!c||!h.current||(d.current=!r)},[r,c]),T.useEffect(()=>{if(!c||!h.current)return;const w=je(h.current);return h.current.contains(w.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),d.current&&h.current.focus()),()=>{o||(v.current&&v.current.focus&&(p.current=!0,v.current.focus()),v.current=null)}},[c]),T.useEffect(()=>{if(!c||!h.current)return;const w=je(h.current),k=C=>{b.current=C,!(n||!s()||C.key!=="Tab")&&w.activeElement===h.current&&C.shiftKey&&(p.current=!0,m.current&&m.current.focus())},y=()=>{const C=h.current;if(C===null)return;if(!w.hasFocus()||!s()||p.current){p.current=!1;return}if(C.contains(w.activeElement)||n&&w.activeElement!==f.current&&w.activeElement!==m.current)return;if(w.activeElement!==g.current)g.current=null;else if(g.current!==null)return;if(!d.current)return;let M=[];if((w.activeElement===f.current||w.activeElement===m.current)&&(M=a(h.current)),M.length>0){var A,z;const $=!!((A=b.current)!=null&&A.shiftKey&&((z=b.current)==null?void 0:z.key)==="Tab"),N=M[0],j=M[M.length-1];typeof N!="string"&&typeof j!="string"&&($?j.focus():N.focus())}else C.focus()};w.addEventListener("focusin",y),w.addEventListener("keydown",k,!0);const S=setInterval(()=>{w.activeElement&&w.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(S),w.removeEventListener("focusin",y),w.removeEventListener("keydown",k,!0)}},[r,n,o,s,c,a]);const x=w=>{v.current===null&&(v.current=w.relatedTarget),d.current=!0,g.current=w.target;const k=t.props.onFocus;k&&k(w)},R=w=>{v.current===null&&(v.current=w.relatedTarget),d.current=!0};return l.jsxs(T.Fragment,{children:[l.jsx("div",{tabIndex:c?0:-1,onFocus:R,ref:f,"data-testid":"sentinelStart"}),T.cloneElement(t,{ref:u,onFocus:x}),l.jsx("div",{tabIndex:c?0:-1,onFocus:R,ref:m,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(gn.propTypes={children:Gr,disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableRestoreFocus:i.bool,getTabbable:i.func,isEnabled:i.func,open:i.bool.isRequired});process.env.NODE_ENV!=="production"&&(gn["propTypes"]=ai(gn.propTypes));function Sf(e){return typeof e=="function"?e():e}const Ar=T.forwardRef(function(t,r){const{children:n,container:o,disablePortal:a=!1}=t,[s,c]=T.useState(null),p=qe(T.isValidElement(n)?n.ref:null,r);if(Dt(()=>{a||c(Sf(o)||document.body)},[o,a]),Dt(()=>{if(s&&!a)return fn(r,s),()=>{fn(r,null)}},[r,s,a]),a){if(T.isValidElement(n)){const f={ref:p};return T.cloneElement(n,f)}return l.jsx(T.Fragment,{children:n})}return l.jsx(T.Fragment,{children:s&&mc.createPortal(n,s)})});process.env.NODE_ENV!=="production"&&(Ar.propTypes={children:i.node,container:i.oneOfType([pt,i.func]),disablePortal:i.bool});process.env.NODE_ENV!=="production"&&(Ar["propTypes"]=ai(Ar.propTypes));function Cf(e){const t=je(e);return t.body===e?er(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function Or(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Qa(e){return parseInt(er(e).getComputedStyle(e).paddingRight,10)||0}function jf(e){const r=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,n=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return r||n}function es(e,t,r,n,o){const a=[t,r,...n];[].forEach.call(e.children,s=>{const c=a.indexOf(s)===-1,p=!jf(s);c&&p&&Or(s,o)})}function Kn(e,t){let r=-1;return e.some((n,o)=>t(n)?(r=o,!0):!1),r}function Of(e,t){const r=[],n=e.container;if(!t.disableScrollLock){if(Cf(n)){const s=di(je(n));r.push({value:n.style.paddingRight,property:"padding-right",el:n}),n.style.paddingRight=`${Qa(n)+s}px`;const c=je(n).querySelectorAll(".mui-fixed");[].forEach.call(c,p=>{r.push({value:p.style.paddingRight,property:"padding-right",el:p}),p.style.paddingRight=`${Qa(p)+s}px`})}let a;if(n.parentNode instanceof DocumentFragment)a=je(n).body;else{const s=n.parentElement,c=er(n);a=(s==null?void 0:s.nodeName)==="HTML"&&c.getComputedStyle(s).overflowY==="scroll"?s:n}r.push({value:a.style.overflow,property:"overflow",el:a},{value:a.style.overflowX,property:"overflow-x",el:a},{value:a.style.overflowY,property:"overflow-y",el:a}),a.style.overflow="hidden"}return()=>{r.forEach(({value:a,el:s,property:c})=>{a?s.style.setProperty(c,a):s.style.removeProperty(c)})}}function Rf(e){const t=[];return[].forEach.call(e.children,r=>{r.getAttribute("aria-hidden")==="true"&&t.push(r)}),t}class Pf{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,r){let n=this.modals.indexOf(t);if(n!==-1)return n;n=this.modals.length,this.modals.push(t),t.modalRef&&Or(t.modalRef,!1);const o=Rf(r);es(r,t.mount,t.modalRef,o,!0);const a=Kn(this.containers,s=>s.container===r);return a!==-1?(this.containers[a].modals.push(t),n):(this.containers.push({modals:[t],container:r,restore:null,hiddenSiblings:o}),n)}mount(t,r){const n=Kn(this.containers,a=>a.modals.indexOf(t)!==-1),o=this.containers[n];o.restore||(o.restore=Of(o,r))}remove(t,r=!0){const n=this.modals.indexOf(t);if(n===-1)return n;const o=Kn(this.containers,s=>s.modals.indexOf(t)!==-1),a=this.containers[o];if(a.modals.splice(a.modals.indexOf(t),1),this.modals.splice(n,1),a.modals.length===0)a.restore&&a.restore(),t.modalRef&&Or(t.modalRef,r),es(a.container,t.mount,t.modalRef,a.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=a.modals[a.modals.length-1];s.modalRef&&Or(s.modalRef,!1)}return n}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function $f(e){return typeof e=="function"?e():e}function _f(e){return e?e.props.hasOwnProperty("in"):!1}const Mf=new Pf;function If(e){const{container:t,disableEscapeKeyDown:r=!1,disableScrollLock:n=!1,manager:o=Mf,closeAfterTransition:a=!1,onTransitionEnter:s,onTransitionExited:c,children:p,onClose:f,open:m,rootRef:v}=e,g=T.useRef({}),d=T.useRef(null),h=T.useRef(null),u=qe(h,v),[b,x]=T.useState(!m),R=_f(p);let w=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(w=!1);const k=()=>je(d.current),y=()=>(g.current.modalRef=h.current,g.current.mount=d.current,g.current),S=()=>{o.mount(y(),{disableScrollLock:n}),h.current&&(h.current.scrollTop=0)},C=Ir(()=>{const B=$f(t)||k().body;o.add(y(),B),h.current&&S()}),M=T.useCallback(()=>o.isTopModal(y()),[o]),A=Ir(B=>{d.current=B,B&&(m&&M()?S():h.current&&Or(h.current,w))}),z=T.useCallback(()=>{o.remove(y(),w)},[w,o]);T.useEffect(()=>()=>{z()},[z]),T.useEffect(()=>{m?C():(!R||!a)&&z()},[m,z,R,a,C]);const $=B=>L=>{var J;(J=B.onKeyDown)==null||J.call(B,L),!(L.key!=="Escape"||L.which===229||!M())&&(r||(L.stopPropagation(),f&&f(L,"escapeKeyDown")))},N=B=>L=>{var J;(J=B.onClick)==null||J.call(B,L),L.target===L.currentTarget&&f&&f(L,"backdropClick")};return{getRootProps:(B={})=>{const L=Ci(e);delete L.onTransitionEnter,delete L.onTransitionExited;const J=P({},L,B);return P({role:"presentation"},J,{onKeyDown:$(J),ref:u})},getBackdropProps:(B={})=>{const L=B;return P({"aria-hidden":!0},L,{onClick:N(L),open:m})},getTransitionProps:()=>{const B=()=>{x(!1),s&&s()},L=()=>{x(!0),c&&c(),a&&z()};return{onEnter:co(B,p==null?void 0:p.props.onEnter),onExited:co(L,p==null?void 0:p.props.onExited)}},rootRef:u,portalRef:A,isTopModal:M,exited:b,hasTransition:R}}var _e="top",We="bottom",Xe="right",Me="left",zo="auto",Yr=[_e,We,Xe,Me],tr="start",Br="end",Df="clippingParents",Ri="viewport",vr="popper",Af="reference",ts=Yr.reduce(function(e,t){return e.concat([t+"-"+tr,t+"-"+Br])},[]),Pi=[].concat(Yr,[zo]).reduce(function(e,t){return e.concat([t,t+"-"+tr,t+"-"+Br])},[]),Bf="beforeRead",Lf="read",Ff="afterRead",Vf="beforeMain",zf="main",Hf="afterMain",Uf="beforeWrite",Gf="write",qf="afterWrite",Wf=[Bf,Lf,Ff,Vf,zf,Hf,Uf,Gf,qf];function rt(e){return e?(e.nodeName||"").toLowerCase():null}function Ve(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Lt(e){var t=Ve(e).Element;return e instanceof t||e instanceof Element}function Ge(e){var t=Ve(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Ho(e){if(typeof ShadowRoot>"u")return!1;var t=Ve(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Xf(e){var t=e.state;Object.keys(t.elements).forEach(function(r){var n=t.styles[r]||{},o=t.attributes[r]||{},a=t.elements[r];!Ge(a)||!rt(a)||(Object.assign(a.style,n),Object.keys(o).forEach(function(s){var c=o[s];c===!1?a.removeAttribute(s):a.setAttribute(s,c===!0?"":c)}))})}function Yf(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,r.popper),t.styles=r,t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach(function(n){var o=t.elements[n],a=t.attributes[n]||{},s=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:r[n]),c=s.reduce(function(p,f){return p[f]="",p},{});!Ge(o)||!rt(o)||(Object.assign(o.style,c),Object.keys(a).forEach(function(p){o.removeAttribute(p)}))})}}const Kf={name:"applyStyles",enabled:!0,phase:"write",fn:Xf,effect:Yf,requires:["computeStyles"]};function Qe(e){return e.split("-")[0]}var _t=Math.max,bn=Math.min,rr=Math.round;function fo(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function $i(){return!/^((?!chrome|android).)*safari/i.test(fo())}function nr(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!1);var n=e.getBoundingClientRect(),o=1,a=1;t&&Ge(e)&&(o=e.offsetWidth>0&&rr(n.width)/e.offsetWidth||1,a=e.offsetHeight>0&&rr(n.height)/e.offsetHeight||1);var s=Lt(e)?Ve(e):window,c=s.visualViewport,p=!$i()&&r,f=(n.left+(p&&c?c.offsetLeft:0))/o,m=(n.top+(p&&c?c.offsetTop:0))/a,v=n.width/o,g=n.height/a;return{width:v,height:g,top:m,right:f+v,bottom:m+g,left:f,x:f,y:m}}function Uo(e){var t=nr(e),r=e.offsetWidth,n=e.offsetHeight;return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:n}}function _i(e,t){var r=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(r&&Ho(r)){var n=t;do{if(n&&e.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function ut(e){return Ve(e).getComputedStyle(e)}function Jf(e){return["table","td","th"].indexOf(rt(e))>=0}function Et(e){return((Lt(e)?e.ownerDocument:e.document)||window.document).documentElement}function Mn(e){return rt(e)==="html"?e:e.assignedSlot||e.parentNode||(Ho(e)?e.host:null)||Et(e)}function rs(e){return!Ge(e)||ut(e).position==="fixed"?null:e.offsetParent}function Zf(e){var t=/firefox/i.test(fo()),r=/Trident/i.test(fo());if(r&&Ge(e)){var n=ut(e);if(n.position==="fixed")return null}var o=Mn(e);for(Ho(o)&&(o=o.host);Ge(o)&&["html","body"].indexOf(rt(o))<0;){var a=ut(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function Kr(e){for(var t=Ve(e),r=rs(e);r&&Jf(r)&&ut(r).position==="static";)r=rs(r);return r&&(rt(r)==="html"||rt(r)==="body"&&ut(r).position==="static")?t:r||Zf(e)||t}function Go(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Rr(e,t,r){return _t(e,bn(t,r))}function Qf(e,t,r){var n=Rr(e,t,r);return n>r?r:n}function Mi(){return{top:0,right:0,bottom:0,left:0}}function Ii(e){return Object.assign({},Mi(),e)}function Di(e,t){return t.reduce(function(r,n){return r[n]=e,r},{})}var em=function(t,r){return t=typeof t=="function"?t(Object.assign({},r.rects,{placement:r.placement})):t,Ii(typeof t!="number"?t:Di(t,Yr))};function tm(e){var t,r=e.state,n=e.name,o=e.options,a=r.elements.arrow,s=r.modifiersData.popperOffsets,c=Qe(r.placement),p=Go(c),f=[Me,Xe].indexOf(c)>=0,m=f?"height":"width";if(!(!a||!s)){var v=em(o.padding,r),g=Uo(a),d=p==="y"?_e:Me,h=p==="y"?We:Xe,u=r.rects.reference[m]+r.rects.reference[p]-s[p]-r.rects.popper[m],b=s[p]-r.rects.reference[p],x=Kr(a),R=x?p==="y"?x.clientHeight||0:x.clientWidth||0:0,w=u/2-b/2,k=v[d],y=R-g[m]-v[h],S=R/2-g[m]/2+w,C=Rr(k,S,y),M=p;r.modifiersData[n]=(t={},t[M]=C,t.centerOffset=C-S,t)}}function rm(e){var t=e.state,r=e.options,n=r.element,o=n===void 0?"[data-popper-arrow]":n;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||_i(t.elements.popper,o)&&(t.elements.arrow=o))}const nm={name:"arrow",enabled:!0,phase:"main",fn:tm,effect:rm,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function or(e){return e.split("-")[1]}var om={top:"auto",right:"auto",bottom:"auto",left:"auto"};function am(e,t){var r=e.x,n=e.y,o=t.devicePixelRatio||1;return{x:rr(r*o)/o||0,y:rr(n*o)/o||0}}function ns(e){var t,r=e.popper,n=e.popperRect,o=e.placement,a=e.variation,s=e.offsets,c=e.position,p=e.gpuAcceleration,f=e.adaptive,m=e.roundOffsets,v=e.isFixed,g=s.x,d=g===void 0?0:g,h=s.y,u=h===void 0?0:h,b=typeof m=="function"?m({x:d,y:u}):{x:d,y:u};d=b.x,u=b.y;var x=s.hasOwnProperty("x"),R=s.hasOwnProperty("y"),w=Me,k=_e,y=window;if(f){var S=Kr(r),C="clientHeight",M="clientWidth";if(S===Ve(r)&&(S=Et(r),ut(S).position!=="static"&&c==="absolute"&&(C="scrollHeight",M="scrollWidth")),S=S,o===_e||(o===Me||o===Xe)&&a===Br){k=We;var A=v&&S===y&&y.visualViewport?y.visualViewport.height:S[C];u-=A-n.height,u*=p?1:-1}if(o===Me||(o===_e||o===We)&&a===Br){w=Xe;var z=v&&S===y&&y.visualViewport?y.visualViewport.width:S[M];d-=z-n.width,d*=p?1:-1}}var $=Object.assign({position:c},f&&om),N=m===!0?am({x:d,y:u},Ve(r)):{x:d,y:u};if(d=N.x,u=N.y,p){var j;return Object.assign({},$,(j={},j[k]=R?"0":"",j[w]=x?"0":"",j.transform=(y.devicePixelRatio||1)<=1?"translate("+d+"px, "+u+"px)":"translate3d("+d+"px, "+u+"px, 0)",j))}return Object.assign({},$,(t={},t[k]=R?u+"px":"",t[w]=x?d+"px":"",t.transform="",t))}function sm(e){var t=e.state,r=e.options,n=r.gpuAcceleration,o=n===void 0?!0:n,a=r.adaptive,s=a===void 0?!0:a,c=r.roundOffsets,p=c===void 0?!0:c,f={placement:Qe(t.placement),variation:or(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,ns(Object.assign({},f,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:p})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,ns(Object.assign({},f,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:p})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const im={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:sm,data:{}};var nn={passive:!0};function lm(e){var t=e.state,r=e.instance,n=e.options,o=n.scroll,a=o===void 0?!0:o,s=n.resize,c=s===void 0?!0:s,p=Ve(t.elements.popper),f=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&f.forEach(function(m){m.addEventListener("scroll",r.update,nn)}),c&&p.addEventListener("resize",r.update,nn),function(){a&&f.forEach(function(m){m.removeEventListener("scroll",r.update,nn)}),c&&p.removeEventListener("resize",r.update,nn)}}const cm={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:lm,data:{}};var pm={left:"right",right:"left",bottom:"top",top:"bottom"};function cn(e){return e.replace(/left|right|bottom|top/g,function(t){return pm[t]})}var dm={start:"end",end:"start"};function os(e){return e.replace(/start|end/g,function(t){return dm[t]})}function qo(e){var t=Ve(e),r=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:r,scrollTop:n}}function Wo(e){return nr(Et(e)).left+qo(e).scrollLeft}function um(e,t){var r=Ve(e),n=Et(e),o=r.visualViewport,a=n.clientWidth,s=n.clientHeight,c=0,p=0;if(o){a=o.width,s=o.height;var f=$i();(f||!f&&t==="fixed")&&(c=o.offsetLeft,p=o.offsetTop)}return{width:a,height:s,x:c+Wo(e),y:p}}function fm(e){var t,r=Et(e),n=qo(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=_t(r.scrollWidth,r.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=_t(r.scrollHeight,r.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),c=-n.scrollLeft+Wo(e),p=-n.scrollTop;return ut(o||r).direction==="rtl"&&(c+=_t(r.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:c,y:p}}function Xo(e){var t=ut(e),r=t.overflow,n=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(r+o+n)}function Ai(e){return["html","body","#document"].indexOf(rt(e))>=0?e.ownerDocument.body:Ge(e)&&Xo(e)?e:Ai(Mn(e))}function Pr(e,t){var r;t===void 0&&(t=[]);var n=Ai(e),o=n===((r=e.ownerDocument)==null?void 0:r.body),a=Ve(n),s=o?[a].concat(a.visualViewport||[],Xo(n)?n:[]):n,c=t.concat(s);return o?c:c.concat(Pr(Mn(s)))}function mo(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function mm(e,t){var r=nr(e,!1,t==="fixed");return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}function as(e,t,r){return t===Ri?mo(um(e,r)):Lt(t)?mm(t,r):mo(fm(Et(e)))}function hm(e){var t=Pr(Mn(e)),r=["absolute","fixed"].indexOf(ut(e).position)>=0,n=r&&Ge(e)?Kr(e):e;return Lt(n)?t.filter(function(o){return Lt(o)&&_i(o,n)&&rt(o)!=="body"}):[]}function gm(e,t,r,n){var o=t==="clippingParents"?hm(e):[].concat(t),a=[].concat(o,[r]),s=a[0],c=a.reduce(function(p,f){var m=as(e,f,n);return p.top=_t(m.top,p.top),p.right=bn(m.right,p.right),p.bottom=bn(m.bottom,p.bottom),p.left=_t(m.left,p.left),p},as(e,s,n));return c.width=c.right-c.left,c.height=c.bottom-c.top,c.x=c.left,c.y=c.top,c}function Bi(e){var t=e.reference,r=e.element,n=e.placement,o=n?Qe(n):null,a=n?or(n):null,s=t.x+t.width/2-r.width/2,c=t.y+t.height/2-r.height/2,p;switch(o){case _e:p={x:s,y:t.y-r.height};break;case We:p={x:s,y:t.y+t.height};break;case Xe:p={x:t.x+t.width,y:c};break;case Me:p={x:t.x-r.width,y:c};break;default:p={x:t.x,y:t.y}}var f=o?Go(o):null;if(f!=null){var m=f==="y"?"height":"width";switch(a){case tr:p[f]=p[f]-(t[m]/2-r[m]/2);break;case Br:p[f]=p[f]+(t[m]/2-r[m]/2);break}}return p}function Lr(e,t){t===void 0&&(t={});var r=t,n=r.placement,o=n===void 0?e.placement:n,a=r.strategy,s=a===void 0?e.strategy:a,c=r.boundary,p=c===void 0?Df:c,f=r.rootBoundary,m=f===void 0?Ri:f,v=r.elementContext,g=v===void 0?vr:v,d=r.altBoundary,h=d===void 0?!1:d,u=r.padding,b=u===void 0?0:u,x=Ii(typeof b!="number"?b:Di(b,Yr)),R=g===vr?Af:vr,w=e.rects.popper,k=e.elements[h?R:g],y=gm(Lt(k)?k:k.contextElement||Et(e.elements.popper),p,m,s),S=nr(e.elements.reference),C=Bi({reference:S,element:w,strategy:"absolute",placement:o}),M=mo(Object.assign({},w,C)),A=g===vr?M:S,z={top:y.top-A.top+x.top,bottom:A.bottom-y.bottom+x.bottom,left:y.left-A.left+x.left,right:A.right-y.right+x.right},$=e.modifiersData.offset;if(g===vr&&$){var N=$[o];Object.keys(z).forEach(function(j){var _=[Xe,We].indexOf(j)>=0?1:-1,H=[_e,We].indexOf(j)>=0?"y":"x";z[j]+=N[H]*_})}return z}function bm(e,t){t===void 0&&(t={});var r=t,n=r.placement,o=r.boundary,a=r.rootBoundary,s=r.padding,c=r.flipVariations,p=r.allowedAutoPlacements,f=p===void 0?Pi:p,m=or(n),v=m?c?ts:ts.filter(function(h){return or(h)===m}):Yr,g=v.filter(function(h){return f.indexOf(h)>=0});g.length===0&&(g=v);var d=g.reduce(function(h,u){return h[u]=Lr(e,{placement:u,boundary:o,rootBoundary:a,padding:s})[Qe(u)],h},{});return Object.keys(d).sort(function(h,u){return d[h]-d[u]})}function vm(e){if(Qe(e)===zo)return[];var t=cn(e);return[os(e),t,os(t)]}function ym(e){var t=e.state,r=e.options,n=e.name;if(!t.modifiersData[n]._skip){for(var o=r.mainAxis,a=o===void 0?!0:o,s=r.altAxis,c=s===void 0?!0:s,p=r.fallbackPlacements,f=r.padding,m=r.boundary,v=r.rootBoundary,g=r.altBoundary,d=r.flipVariations,h=d===void 0?!0:d,u=r.allowedAutoPlacements,b=t.options.placement,x=Qe(b),R=x===b,w=p||(R||!h?[cn(b)]:vm(b)),k=[b].concat(w).reduce(function(G,q){return G.concat(Qe(q)===zo?bm(t,{placement:q,boundary:m,rootBoundary:v,padding:f,flipVariations:h,allowedAutoPlacements:u}):q)},[]),y=t.rects.reference,S=t.rects.popper,C=new Map,M=!0,A=k[0],z=0;z<k.length;z++){var $=k[z],N=Qe($),j=or($)===tr,_=[_e,We].indexOf(N)>=0,H=_?"width":"height",B=Lr(t,{placement:$,boundary:m,rootBoundary:v,altBoundary:g,padding:f}),L=_?j?Xe:Me:j?We:_e;y[H]>S[H]&&(L=cn(L));var J=cn(L),Z=[];if(a&&Z.push(B[N]<=0),c&&Z.push(B[L]<=0,B[J]<=0),Z.every(function(G){return G})){A=$,M=!1;break}C.set($,Z)}if(M)for(var O=h?3:1,I=function(q){var X=k.find(function(Y){var W=C.get(Y);if(W)return W.slice(0,q).every(function(Q){return Q})});if(X)return A=X,"break"},U=O;U>0;U--){var K=I(U);if(K==="break")break}t.placement!==A&&(t.modifiersData[n]._skip=!0,t.placement=A,t.reset=!0)}}const wm={name:"flip",enabled:!0,phase:"main",fn:ym,requiresIfExists:["offset"],data:{_skip:!1}};function ss(e,t,r){return r===void 0&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function is(e){return[_e,Xe,We,Me].some(function(t){return e[t]>=0})}function xm(e){var t=e.state,r=e.name,n=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,s=Lr(t,{elementContext:"reference"}),c=Lr(t,{altBoundary:!0}),p=ss(s,n),f=ss(c,o,a),m=is(p),v=is(f);t.modifiersData[r]={referenceClippingOffsets:p,popperEscapeOffsets:f,isReferenceHidden:m,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":m,"data-popper-escaped":v})}const km={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:xm};function Em(e,t,r){var n=Qe(e),o=[Me,_e].indexOf(n)>=0?-1:1,a=typeof r=="function"?r(Object.assign({},t,{placement:e})):r,s=a[0],c=a[1];return s=s||0,c=(c||0)*o,[Me,Xe].indexOf(n)>=0?{x:c,y:s}:{x:s,y:c}}function Nm(e){var t=e.state,r=e.options,n=e.name,o=r.offset,a=o===void 0?[0,0]:o,s=Pi.reduce(function(m,v){return m[v]=Em(v,t.rects,a),m},{}),c=s[t.placement],p=c.x,f=c.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=p,t.modifiersData.popperOffsets.y+=f),t.modifiersData[n]=s}const Tm={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Nm};function Sm(e){var t=e.state,r=e.name;t.modifiersData[r]=Bi({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Cm={name:"popperOffsets",enabled:!0,phase:"read",fn:Sm,data:{}};function jm(e){return e==="x"?"y":"x"}function Om(e){var t=e.state,r=e.options,n=e.name,o=r.mainAxis,a=o===void 0?!0:o,s=r.altAxis,c=s===void 0?!1:s,p=r.boundary,f=r.rootBoundary,m=r.altBoundary,v=r.padding,g=r.tether,d=g===void 0?!0:g,h=r.tetherOffset,u=h===void 0?0:h,b=Lr(t,{boundary:p,rootBoundary:f,padding:v,altBoundary:m}),x=Qe(t.placement),R=or(t.placement),w=!R,k=Go(x),y=jm(k),S=t.modifiersData.popperOffsets,C=t.rects.reference,M=t.rects.popper,A=typeof u=="function"?u(Object.assign({},t.rects,{placement:t.placement})):u,z=typeof A=="number"?{mainAxis:A,altAxis:A}:Object.assign({mainAxis:0,altAxis:0},A),$=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,N={x:0,y:0};if(S){if(a){var j,_=k==="y"?_e:Me,H=k==="y"?We:Xe,B=k==="y"?"height":"width",L=S[k],J=L+b[_],Z=L-b[H],O=d?-M[B]/2:0,I=R===tr?C[B]:M[B],U=R===tr?-M[B]:-C[B],K=t.elements.arrow,G=d&&K?Uo(K):{width:0,height:0},q=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Mi(),X=q[_],Y=q[H],W=Rr(0,C[B],G[B]),Q=w?C[B]/2-O-W-X-z.mainAxis:I-W-X-z.mainAxis,ee=w?-C[B]/2+O+W+Y+z.mainAxis:U+W+Y+z.mainAxis,se=t.elements.arrow&&Kr(t.elements.arrow),V=se?k==="y"?se.clientTop||0:se.clientLeft||0:0,te=(j=$==null?void 0:$[k])!=null?j:0,D=L+Q-te-V,ie=L+ee-te,Ne=Rr(d?bn(J,D):J,L,d?_t(Z,ie):Z);S[k]=Ne,N[k]=Ne-L}if(c){var Re,xe=k==="x"?_e:Me,Nt=k==="x"?We:Xe,Pe=S[y],ot=y==="y"?"height":"width",Ae=Pe+b[xe],at=Pe-b[Nt],Te=[_e,Me].indexOf(x)!==-1,Ft=(Re=$==null?void 0:$[y])!=null?Re:0,Tt=Te?Ae:Pe-C[ot]-M[ot]-Ft+z.altAxis,pr=Te?Pe+C[ot]+M[ot]-Ft-z.altAxis:at,Zr=d&&Te?Qf(Tt,Pe,pr):Rr(d?Tt:Ae,Pe,d?pr:at);S[y]=Zr,N[y]=Zr-Pe}t.modifiersData[n]=N}}const Rm={name:"preventOverflow",enabled:!0,phase:"main",fn:Om,requiresIfExists:["offset"]};function Pm(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function $m(e){return e===Ve(e)||!Ge(e)?qo(e):Pm(e)}function _m(e){var t=e.getBoundingClientRect(),r=rr(t.width)/e.offsetWidth||1,n=rr(t.height)/e.offsetHeight||1;return r!==1||n!==1}function Mm(e,t,r){r===void 0&&(r=!1);var n=Ge(t),o=Ge(t)&&_m(t),a=Et(t),s=nr(e,o,r),c={scrollLeft:0,scrollTop:0},p={x:0,y:0};return(n||!n&&!r)&&((rt(t)!=="body"||Xo(a))&&(c=$m(t)),Ge(t)?(p=nr(t,!0),p.x+=t.clientLeft,p.y+=t.clientTop):a&&(p.x=Wo(a))),{x:s.left+c.scrollLeft-p.x,y:s.top+c.scrollTop-p.y,width:s.width,height:s.height}}function Im(e){var t=new Map,r=new Set,n=[];e.forEach(function(a){t.set(a.name,a)});function o(a){r.add(a.name);var s=[].concat(a.requires||[],a.requiresIfExists||[]);s.forEach(function(c){if(!r.has(c)){var p=t.get(c);p&&o(p)}}),n.push(a)}return e.forEach(function(a){r.has(a.name)||o(a)}),n}function Dm(e){var t=Im(e);return Wf.reduce(function(r,n){return r.concat(t.filter(function(o){return o.phase===n}))},[])}function Am(e){var t;return function(){return t||(t=new Promise(function(r){Promise.resolve().then(function(){t=void 0,r(e())})})),t}}function Bm(e){var t=e.reduce(function(r,n){var o=r[n.name];return r[n.name]=o?Object.assign({},o,n,{options:Object.assign({},o.options,n.options),data:Object.assign({},o.data,n.data)}):n,r},{});return Object.keys(t).map(function(r){return t[r]})}var ls={placement:"bottom",modifiers:[],strategy:"absolute"};function cs(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function Lm(e){e===void 0&&(e={});var t=e,r=t.defaultModifiers,n=r===void 0?[]:r,o=t.defaultOptions,a=o===void 0?ls:o;return function(c,p,f){f===void 0&&(f=a);var m={placement:"bottom",orderedModifiers:[],options:Object.assign({},ls,a),modifiersData:{},elements:{reference:c,popper:p},attributes:{},styles:{}},v=[],g=!1,d={state:m,setOptions:function(x){var R=typeof x=="function"?x(m.options):x;u(),m.options=Object.assign({},a,m.options,R),m.scrollParents={reference:Lt(c)?Pr(c):c.contextElement?Pr(c.contextElement):[],popper:Pr(p)};var w=Dm(Bm([].concat(n,m.options.modifiers)));return m.orderedModifiers=w.filter(function(k){return k.enabled}),h(),d.update()},forceUpdate:function(){if(!g){var x=m.elements,R=x.reference,w=x.popper;if(cs(R,w)){m.rects={reference:Mm(R,Kr(w),m.options.strategy==="fixed"),popper:Uo(w)},m.reset=!1,m.placement=m.options.placement,m.orderedModifiers.forEach(function(z){return m.modifiersData[z.name]=Object.assign({},z.data)});for(var k=0;k<m.orderedModifiers.length;k++){if(m.reset===!0){m.reset=!1,k=-1;continue}var y=m.orderedModifiers[k],S=y.fn,C=y.options,M=C===void 0?{}:C,A=y.name;typeof S=="function"&&(m=S({state:m,options:M,name:A,instance:d})||m)}}}},update:Am(function(){return new Promise(function(b){d.forceUpdate(),b(m)})}),destroy:function(){u(),g=!0}};if(!cs(c,p))return d;d.setOptions(f).then(function(b){!g&&f.onFirstUpdate&&f.onFirstUpdate(b)});function h(){m.orderedModifiers.forEach(function(b){var x=b.name,R=b.options,w=R===void 0?{}:R,k=b.effect;if(typeof k=="function"){var y=k({state:m,name:x,instance:d,options:w}),S=function(){};v.push(y||S)}})}function u(){v.forEach(function(b){return b()}),v=[]}return d}}var Fm=[cm,Cm,im,Kf,Tm,wm,Rm,nm,km],Vm=Lm({defaultModifiers:Fm});const Li="Popper";function zm(e){return Oi(Li,e)}yf(Li,["root"]);const Hm=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Um=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Gm(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function vn(e){return typeof e=="function"?e():e}function In(e){return e.nodeType!==void 0}function qm(e){return!In(e)}const Wm=()=>ft({root:["root"]},ff(zm)),Xm={},Ym=T.forwardRef(function(t,r){var n;const{anchorEl:o,children:a,direction:s,disablePortal:c,modifiers:p,open:f,placement:m,popperOptions:v,popperRef:g,slotProps:d={},slots:h={},TransitionProps:u}=t,b=me(t,Hm),x=T.useRef(null),R=qe(x,r),w=T.useRef(null),k=qe(w,g),y=T.useRef(k);Dt(()=>{y.current=k},[k]),T.useImperativeHandle(g,()=>w.current,[]);const S=Gm(m,s),[C,M]=T.useState(S),[A,z]=T.useState(vn(o));T.useEffect(()=>{w.current&&w.current.forceUpdate()}),T.useEffect(()=>{o&&z(vn(o))},[o]),Dt(()=>{if(!A||!f)return;const H=J=>{M(J.placement)};if(process.env.NODE_ENV!=="production"&&A&&In(A)&&A.nodeType===1){const J=A.getBoundingClientRect();process.env.NODE_ENV!=="test"&&J.top===0&&J.left===0&&J.right===0&&J.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let B=[{name:"preventOverflow",options:{altBoundary:c}},{name:"flip",options:{altBoundary:c}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:J})=>{H(J)}}];p!=null&&(B=B.concat(p)),v&&v.modifiers!=null&&(B=B.concat(v.modifiers));const L=Vm(A,x.current,P({placement:S},v,{modifiers:B}));return y.current(L),()=>{L.destroy(),y.current(null)}},[A,c,p,f,v,S]);const $={placement:C};u!==null&&($.TransitionProps=u);const N=Wm(),j=(n=h.root)!=null?n:"div",_=Bt({elementType:j,externalSlotProps:d.root,externalForwardedProps:b,additionalProps:{role:"tooltip",ref:R},ownerState:t,className:N.root});return l.jsx(j,P({},_,{children:typeof a=="function"?a($):a}))}),Fi=T.forwardRef(function(t,r){const{anchorEl:n,children:o,container:a,direction:s="ltr",disablePortal:c=!1,keepMounted:p=!1,modifiers:f,open:m,placement:v="bottom",popperOptions:g=Xm,popperRef:d,style:h,transition:u=!1,slotProps:b={},slots:x={}}=t,R=me(t,Um),[w,k]=T.useState(!0),y=()=>{k(!1)},S=()=>{k(!0)};if(!p&&!m&&(!u||w))return null;let C;if(a)C=a;else if(n){const z=vn(n);C=z&&In(z)?je(z).body:je(null).body}const M=!m&&p&&(!u||w)?"none":void 0,A=u?{in:m,onEnter:y,onExited:S}:void 0;return l.jsx(Ar,{disablePortal:c,container:C,children:l.jsx(Ym,P({anchorEl:n,direction:s,disablePortal:c,modifiers:f,ref:r,open:u?!w:m,placement:v,popperOptions:g,popperRef:d,slotProps:b,slots:x},R,{style:P({position:"fixed",top:0,left:0,display:M},h),TransitionProps:A,children:o}))})});process.env.NODE_ENV!=="production"&&(Fi.propTypes={anchorEl:lr(i.oneOfType([pt,i.object,i.func]),e=>{if(e.open){const t=vn(e.anchorEl);if(t&&In(t)&&t.nodeType===1){const r=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&r.top===0&&r.left===0&&r.right===0&&r.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||qm(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:i.oneOfType([i.node,i.func]),container:i.oneOfType([pt,i.func]),direction:i.oneOf(["ltr","rtl"]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:$o,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),transition:i.bool});function Jr(){const e=ki(Lo);return process.env.NODE_ENV!=="production"&&T.useDebugValue(e),e[Fo]||e}function ho(e,t){return ho=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,o){return n.__proto__=o,n},ho(e,t)}function Km(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,ho(e,t)}const ps={disabled:!1};var Jm=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.shape({enter:i.number,exit:i.number,appear:i.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&i.oneOfType([i.string,i.shape({enter:i.string,exit:i.string,active:i.string}),i.shape({enter:i.string,enterDone:i.string,enterActive:i.string,exit:i.string,exitDone:i.string,exitActive:i.string})]);const Vi=E.createContext(null);var Zm=function(t){return t.scrollTop},Sr="unmounted",Ct="exited",jt="entering",Xt="entered",go="exiting",ht=function(e){Km(t,e);function t(n,o){var a;a=e.call(this,n,o)||this;var s=o,c=s&&!s.isMounting?n.enter:n.appear,p;return a.appearStatus=null,n.in?c?(p=Ct,a.appearStatus=jt):p=Xt:n.unmountOnExit||n.mountOnEnter?p=Sr:p=Ct,a.state={status:p},a.nextCallback=null,a}t.getDerivedStateFromProps=function(o,a){var s=o.in;return s&&a.status===Sr?{status:Ct}:null};var r=t.prototype;return r.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},r.componentDidUpdate=function(o){var a=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==jt&&s!==Xt&&(a=jt):(s===jt||s===Xt)&&(a=go)}this.updateStatus(!1,a)},r.componentWillUnmount=function(){this.cancelNextCallback()},r.getTimeouts=function(){var o=this.props.timeout,a,s,c;return a=s=c=o,o!=null&&typeof o!="number"&&(a=o.exit,s=o.enter,c=o.appear!==void 0?o.appear:s),{exit:a,enter:s,appear:c}},r.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===jt){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:kr.findDOMNode(this);s&&Zm(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Ct&&this.setState({status:Sr})},r.performEnter=function(o){var a=this,s=this.props.enter,c=this.context?this.context.isMounting:o,p=this.props.nodeRef?[c]:[kr.findDOMNode(this),c],f=p[0],m=p[1],v=this.getTimeouts(),g=c?v.appear:v.enter;if(!o&&!s||ps.disabled){this.safeSetState({status:Xt},function(){a.props.onEntered(f)});return}this.props.onEnter(f,m),this.safeSetState({status:jt},function(){a.props.onEntering(f,m),a.onTransitionEnd(g,function(){a.safeSetState({status:Xt},function(){a.props.onEntered(f,m)})})})},r.performExit=function(){var o=this,a=this.props.exit,s=this.getTimeouts(),c=this.props.nodeRef?void 0:kr.findDOMNode(this);if(!a||ps.disabled){this.safeSetState({status:Ct},function(){o.props.onExited(c)});return}this.props.onExit(c),this.safeSetState({status:go},function(){o.props.onExiting(c),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:Ct},function(){o.props.onExited(c)})})})},r.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},r.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},r.setNextCallback=function(o){var a=this,s=!0;return this.nextCallback=function(c){s&&(s=!1,a.nextCallback=null,o(c))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},r.onTransitionEnd=function(o,a){this.setNextCallback(a);var s=this.props.nodeRef?this.props.nodeRef.current:kr.findDOMNode(this),c=o==null&&!this.props.addEndListener;if(!s||c){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var p=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],f=p[0],m=p[1];this.props.addEndListener(f,m)}o!=null&&setTimeout(this.nextCallback,o)},r.render=function(){var o=this.state.status;if(o===Sr)return null;var a=this.props,s=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var c=me(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return E.createElement(Vi.Provider,{value:null},typeof s=="function"?s(o,c):E.cloneElement(E.Children.only(s),c))},t}(E.Component);ht.contextType=Vi;ht.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:i.shape({current:typeof Element>"u"?i.any:function(e,t,r,n,o,a){var s=e[t];return i.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,r,n,o,a)}}),children:i.oneOfType([i.func.isRequired,i.element.isRequired]).isRequired,in:i.bool,mountOnEnter:i.bool,unmountOnExit:i.bool,appear:i.bool,enter:i.bool,exit:i.bool,timeout:function(t){var r=Jm;t.addEndListener||(r=r.isRequired);for(var n=arguments.length,o=new Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=arguments[a];return r.apply(void 0,[t].concat(o))},addEndListener:i.func,onEnter:i.func,onEntering:i.func,onEntered:i.func,onExit:i.func,onExiting:i.func,onExited:i.func}:{};function qt(){}ht.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:qt,onEntering:qt,onEntered:qt,onExit:qt,onExiting:qt,onExited:qt};ht.UNMOUNTED=Sr;ht.EXITED=Ct;ht.ENTERING=jt;ht.ENTERED=Xt;ht.EXITING=go;const zi=ht,Hi=e=>e.scrollTop;function yn(e,t){var r,n;const{timeout:o,easing:a,style:s={}}=e;return{duration:(r=s.transitionDuration)!=null?r:typeof o=="number"?o:o[t.mode]||0,easing:(n=s.transitionTimingFunction)!=null?n:typeof a=="object"?a[t.mode]:a,delay:s.transitionDelay}}const Qm=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function bo(e){return`scale(${e}, ${e**2})`}const eh={entering:{opacity:1,transform:bo(1)},entered:{opacity:1,transform:"none"}},Jn=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Yo=T.forwardRef(function(t,r){const{addEndListener:n,appear:o=!0,children:a,easing:s,in:c,onEnter:p,onEntered:f,onEntering:m,onExit:v,onExited:g,onExiting:d,style:h,timeout:u="auto",TransitionComponent:b=zi}=t,x=me(t,Qm),R=Nr(),w=T.useRef(),k=Jr(),y=T.useRef(null),S=qe(y,a.ref,r),C=H=>B=>{if(H){const L=y.current;B===void 0?H(L):H(L,B)}},M=C(m),A=C((H,B)=>{Hi(H);const{duration:L,delay:J,easing:Z}=yn({style:h,timeout:u,easing:s},{mode:"enter"});let O;u==="auto"?(O=k.transitions.getAutoHeightDuration(H.clientHeight),w.current=O):O=L,H.style.transition=[k.transitions.create("opacity",{duration:O,delay:J}),k.transitions.create("transform",{duration:Jn?O:O*.666,delay:J,easing:Z})].join(","),p&&p(H,B)}),z=C(f),$=C(d),N=C(H=>{const{duration:B,delay:L,easing:J}=yn({style:h,timeout:u,easing:s},{mode:"exit"});let Z;u==="auto"?(Z=k.transitions.getAutoHeightDuration(H.clientHeight),w.current=Z):Z=B,H.style.transition=[k.transitions.create("opacity",{duration:Z,delay:L}),k.transitions.create("transform",{duration:Jn?Z:Z*.666,delay:Jn?L:L||Z*.333,easing:J})].join(","),H.style.opacity=0,H.style.transform=bo(.75),v&&v(H)}),j=C(g),_=H=>{u==="auto"&&R.start(w.current||0,H),n&&n(y.current,H)};return l.jsx(b,P({appear:o,in:c,nodeRef:y,onEnter:A,onEntered:z,onEntering:M,onExit:N,onExited:j,onExiting:$,addEndListener:_,timeout:u==="auto"?null:u},x,{children:(H,B)=>T.cloneElement(a,P({style:P({opacity:0,transform:bo(.75),visibility:H==="exited"&&!c?"hidden":void 0},eh[H],h,a.props.style),ref:S},B))}))});process.env.NODE_ENV!=="production"&&(Yo.propTypes={addEndListener:i.func,appear:i.bool,children:Gr.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});Yo.muiSupportAuto=!0;const vo=Yo,th=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},ds=th,rh=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],nh=Oe(Fi,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ui=T.forwardRef(function(t,r){var n;const o=xi(),a=mt({props:t,name:"MuiPopper"}),{anchorEl:s,component:c,components:p,componentsProps:f,container:m,disablePortal:v,keepMounted:g,modifiers:d,open:h,placement:u,popperOptions:b,popperRef:x,transition:R,slots:w,slotProps:k}=a,y=me(a,rh),S=(n=w==null?void 0:w.root)!=null?n:p==null?void 0:p.Root,C=P({anchorEl:s,container:m,disablePortal:v,keepMounted:g,modifiers:d,open:h,placement:u,popperOptions:b,popperRef:x,transition:R},y);return l.jsx(nh,P({as:c,direction:o==null?void 0:o.direction,slots:{root:S},slotProps:k??f},C,{ref:r}))});process.env.NODE_ENV!=="production"&&(Ui.propTypes={anchorEl:i.oneOfType([pt,i.object,i.func]),children:i.oneOfType([i.node,i.func]),component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:$o,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transition:i.bool});const Gi=Ui;function oh(e){return nt("MuiTooltip",e)}const ah=xt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),wt=ah,sh=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function ih(e){return Math.round(e*1e5)/1e5}const lh=e=>{const{classes:t,disableInteractive:r,arrow:n,touch:o,placement:a}=e,s={popper:["popper",!r&&"popperInteractive",n&&"popperArrow"],tooltip:["tooltip",n&&"tooltipArrow",o&&"touch",`tooltipPlacement${tt(a.split("-")[0])}`],arrow:["arrow"]};return ft(s,oh,t)},ch=Oe(Gi,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.popper,!r.disableInteractive&&t.popperInteractive,r.arrow&&t.popperArrow,!r.open&&t.popperClose]}})(({theme:e,ownerState:t,open:r})=>P({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!r&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${wt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${wt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${wt.arrow}`]:P({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${wt.arrow}`]:P({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),ph=Oe("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.tooltip,r.touch&&t.touch,r.arrow&&t.tooltipArrow,t[`tooltipPlacement${tt(r.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>P({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:hn(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${ih(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${wt.popper}[data-popper-placement*="left"] &`]:P({transformOrigin:"right center"},t.isRtl?P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):P({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${wt.popper}[data-popper-placement*="right"] &`]:P({transformOrigin:"left center"},t.isRtl?P({marginRight:"14px"},t.touch&&{marginRight:"24px"}):P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${wt.popper}[data-popper-placement*="top"] &`]:P({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${wt.popper}[data-popper-placement*="bottom"] &`]:P({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),dh=Oe("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:hn(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let on=!1;const us=new qr;let yr={x:0,y:0};function an(e,t){return r=>{t&&t(r),e(r)}}const qi=T.forwardRef(function(t,r){var n,o,a,s,c,p,f,m,v,g,d,h,u,b,x,R,w,k,y;const S=mt({props:t,name:"MuiTooltip"}),{arrow:C=!1,children:M,components:A={},componentsProps:z={},describeChild:$=!1,disableFocusListener:N=!1,disableHoverListener:j=!1,disableInteractive:_=!1,disableTouchListener:H=!1,enterDelay:B=100,enterNextDelay:L=0,enterTouchDelay:J=700,followCursor:Z=!1,id:O,leaveDelay:I=0,leaveTouchDelay:U=1500,onClose:K,onOpen:G,open:q,placement:X="bottom",PopperComponent:Y,PopperProps:W={},slotProps:Q={},slots:ee={},title:se,TransitionComponent:V=vo,TransitionProps:te}=S,D=me(S,sh),ie=T.isValidElement(M)?M:l.jsx("span",{children:M}),Ne=Jr(),Re=Ne.direction==="rtl",[xe,Nt]=T.useState(),[Pe,ot]=T.useState(null),Ae=T.useRef(!1),at=_||Z,Te=Nr(),Ft=Nr(),Tt=Nr(),pr=Nr(),[Zr,aa]=ci({controlled:q,default:!1,name:"Tooltip",state:"open"});let st=Zr;if(process.env.NODE_ENV!=="production"){const{current:re}=T.useRef(q!==void 0);T.useEffect(()=>{xe&&xe.disabled&&!re&&se!==""&&xe.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[se,xe,re])}const Dn=li(O),dr=T.useRef(),Qr=Ir(()=>{dr.current!==void 0&&(document.body.style.WebkitUserSelect=dr.current,dr.current=void 0),pr.clear()});T.useEffect(()=>Qr,[Qr]);const sa=re=>{us.clear(),on=!0,aa(!0),G&&!st&&G(re)},en=Ir(re=>{us.start(800+I,()=>{on=!1}),aa(!1),K&&st&&K(re),Te.start(Ne.transitions.duration.shortest,()=>{Ae.current=!1})}),An=re=>{Ae.current&&re.type!=="touchstart"||(xe&&xe.removeAttribute("title"),Ft.clear(),Tt.clear(),B||on&&L?Ft.start(on?L:B,()=>{sa(re)}):sa(re))},ia=re=>{Ft.clear(),Tt.start(I,()=>{en(re)})},{isFocusVisibleRef:la,onBlur:ql,onFocus:Wl,ref:Xl}=pi(),[,ca]=T.useState(!1),pa=re=>{ql(re),la.current===!1&&(ca(!1),ia(re))},da=re=>{xe||Nt(re.currentTarget),Wl(re),la.current===!0&&(ca(!0),An(re))},ua=re=>{Ae.current=!0;const Be=ie.props;Be.onTouchStart&&Be.onTouchStart(re)},fa=An,ma=ia,Yl=re=>{ua(re),Tt.clear(),Te.clear(),Qr(),dr.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",pr.start(J,()=>{document.body.style.WebkitUserSelect=dr.current,An(re)})},Kl=re=>{ie.props.onTouchEnd&&ie.props.onTouchEnd(re),Qr(),Tt.start(U,()=>{en(re)})};T.useEffect(()=>{if(!st)return;function re(Be){(Be.key==="Escape"||Be.key==="Esc")&&en(Be)}return document.addEventListener("keydown",re),()=>{document.removeEventListener("keydown",re)}},[en,st]);const Jl=qe(ie.ref,Xl,Nt,r);!se&&se!==0&&(st=!1);const Bn=T.useRef(),Zl=re=>{const Be=ie.props;Be.onMouseMove&&Be.onMouseMove(re),yr={x:re.clientX,y:re.clientY},Bn.current&&Bn.current.update()},ur={},Ln=typeof se=="string";$?(ur.title=!st&&Ln&&!j?se:null,ur["aria-describedby"]=st?Dn:null):(ur["aria-label"]=Ln?se:null,ur["aria-labelledby"]=st&&!Ln?Dn:null);const ze=P({},ur,D,ie.props,{className:Se(D.className,ie.props.className),onTouchStart:ua,ref:Jl},Z?{onMouseMove:Zl}:{});process.env.NODE_ENV!=="production"&&(ze["data-mui-internal-clone-element"]=!0,T.useEffect(()=>{xe&&!xe.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[xe]));const fr={};H||(ze.onTouchStart=Yl,ze.onTouchEnd=Kl),j||(ze.onMouseOver=an(fa,ze.onMouseOver),ze.onMouseLeave=an(ma,ze.onMouseLeave),at||(fr.onMouseOver=fa,fr.onMouseLeave=ma)),N||(ze.onFocus=an(da,ze.onFocus),ze.onBlur=an(pa,ze.onBlur),at||(fr.onFocus=da,fr.onBlur=pa)),process.env.NODE_ENV!=="production"&&ie.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ie.props.title}\` or the Tooltip component.`].join(`
`));const Ql=T.useMemo(()=>{var re;let Be=[{name:"arrow",enabled:!!Pe,options:{element:Pe,padding:4}}];return(re=W.popperOptions)!=null&&re.modifiers&&(Be=Be.concat(W.popperOptions.modifiers)),P({},W.popperOptions,{modifiers:Be})},[Pe,W]),mr=P({},S,{isRtl:Re,arrow:C,disableInteractive:at,placement:X,PopperComponentProp:Y,touch:Ae.current}),Fn=lh(mr),ha=(n=(o=ee.popper)!=null?o:A.Popper)!=null?n:ch,ga=(a=(s=(c=ee.transition)!=null?c:A.Transition)!=null?s:V)!=null?a:vo,ba=(p=(f=ee.tooltip)!=null?f:A.Tooltip)!=null?p:ph,va=(m=(v=ee.arrow)!=null?v:A.Arrow)!=null?m:dh,ec=Tr(ha,P({},W,(g=Q.popper)!=null?g:z.popper,{className:Se(Fn.popper,W==null?void 0:W.className,(d=(h=Q.popper)!=null?h:z.popper)==null?void 0:d.className)}),mr),tc=Tr(ga,P({},te,(u=Q.transition)!=null?u:z.transition),mr),rc=Tr(ba,P({},(b=Q.tooltip)!=null?b:z.tooltip,{className:Se(Fn.tooltip,(x=(R=Q.tooltip)!=null?R:z.tooltip)==null?void 0:x.className)}),mr),nc=Tr(va,P({},(w=Q.arrow)!=null?w:z.arrow,{className:Se(Fn.arrow,(k=(y=Q.arrow)!=null?y:z.arrow)==null?void 0:k.className)}),mr);return l.jsxs(T.Fragment,{children:[T.cloneElement(ie,ze),l.jsx(ha,P({as:Y??Gi,placement:X,anchorEl:Z?{getBoundingClientRect:()=>({top:yr.y,left:yr.x,right:yr.x,bottom:yr.y,width:0,height:0})}:xe,popperRef:Bn,open:xe?st:!1,id:Dn,transition:!0},fr,ec,{popperOptions:Ql,children:({TransitionProps:re})=>l.jsx(ga,P({timeout:Ne.transitions.duration.shorter},re,tc,{children:l.jsxs(ba,P({},rc,{children:[se,C?l.jsx(va,P({},nc,{ref:ot})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(qi.propTypes={arrow:i.bool,children:Gr.isRequired,classes:i.object,className:i.string,components:i.shape({Arrow:i.elementType,Popper:i.elementType,Tooltip:i.elementType,Transition:i.elementType}),componentsProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),describeChild:i.bool,disableFocusListener:i.bool,disableHoverListener:i.bool,disableInteractive:i.bool,disableTouchListener:i.bool,enterDelay:i.number,enterNextDelay:i.number,enterTouchDelay:i.number,followCursor:i.bool,id:i.string,leaveDelay:i.number,leaveTouchDelay:i.number,onClose:i.func,onOpen:i.func,open:i.bool,placement:i.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:i.elementType,PopperProps:i.object,slotProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),slots:i.shape({arrow:i.elementType,popper:i.elementType,tooltip:i.elementType,transition:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),title:i.node,TransitionComponent:i.elementType,TransitionProps:i.object});const uh=qi;function fs(e,t,r){return e?l.jsx(Ee.ListItemIcon,{className:`papi-menu-icon-${r?"leading":"trailing"}`,children:l.jsx("img",{src:e,alt:`${r?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Ko(e){const{onClick:t,label:r,tooltip:n,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:s=void 0,hasAutoFocus:c=!1,className:p,isDisabled:f=!1,isDense:m=!0,isSubMenuParent:v=!1,hasDisabledGutters:g=!1,hasDivider:d=!1,focusVisibleClassName:h,id:u,children:b}=e,x=l.jsx(Ee.MenuItem,{sx:{lineHeight:.8},autoFocus:c,className:p,disabled:f,dense:m,disableGutters:g,divider:d,focusVisibleClassName:h,onClick:t,id:u,children:r?l.jsxs(l.Fragment,{children:[fs(a,r,!0),l.jsx(Ee.ListItemText,{primary:r,inset:!a&&o}),v?l.jsx(Ee.ListItemIcon,{className:"papi-menu-icon-trailing",children:l.jsx(Ti,{})}):fs(s,r,!1)]}):b});return n?l.jsx(uh,{title:n,placement:"right",children:l.jsx("div",{children:x})}):x}function Wi(e){return Object.entries(e.groups).map(([r,n])=>({id:r,group:n}))}function fh(e){const[t,r]=E.useState(void 0),{parentMenuItem:n,parentItemProps:o,menuDefinition:a}=e,s=f=>{r(f.currentTarget)},c=()=>{r(void 0)},p=()=>{let f=Wi(a).filter(m=>"menuItem"in m.group);if(!(n!=null&&n.id))throw new Error("A valid parent menu item is required for submenus.");return f=f.filter(m=>"menuItem"in m.group&&m.group.menuItem===n.id),l.jsx(Jo,{...e,includedGroups:f})};return l.jsxs(l.Fragment,{children:[l.jsx(Ko,{onClick:s,...o,isSubMenuParent:!0}),l.jsx(Ee.Menu,{anchorEl:t,open:!!t,onClose:c,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:p()},n.id)]})}const mh=(e,t)=>t.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function Jo(e){const{menuDefinition:t,onClick:r,commandHandler:n,includedGroups:o}=e,{items:a,allowForLeadingIcons:s}=E.useMemo(()=>{const m=o&&o.length>0?o:Wi(t).filter(h=>!("menuItem"in h.group)),v=Object.values(m).sort((h,u)=>(h.group.order||0)-(u.group.order||0)),g=[];v.forEach(h=>{mh(h.id,t.items).forEach(u=>g.push({item:u,isLastItemInGroup:!1})),g.length>0&&(g[g.length-1].isLastItemInGroup=!0)}),g.length>0&&(g[g.length-1].isLastItemInGroup=!1);const d=g.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:g,allowForLeadingIcons:d}},[o,t]),c=({item:m,isLastItemInGroup:v})=>({className:"papi-menu-item",label:m.label,tooltip:m.tooltip,iconPathBefore:"iconPathBefore"in m?m.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in m?m.iconPathAfter:void 0,hasDivider:v,allowForLeadingIcons:s}),[p]=a;if(!p)return l.jsx("div",{});const f=p.item.group;return l.jsx("div",{role:"menu","aria-label":f,children:a.map((m,v)=>{const{item:g}=m,d=c(m);if("command"in g){const h=g.group+v;return l.jsx(Ko,{onClick:u=>{r==null||r(u),n(g)},...d},h)}return l.jsx(fh,{parentMenuItem:g,parentItemProps:d,...e},f+g.id)})},f)}function hh(e){const{menuDefinition:t,columnId:r}=e;let a=Object.entries(t.groups).map(([s,c])=>({id:s,group:c})).filter(s=>"column"in s.group);return r&&"columns"in t&&t.columns[r]&&(a=a.filter(s=>"column"in s.group&&s.group.column===r)),l.jsx(Jo,{...e,includedGroups:a})}function gh({commandHandler:e,menuDefinition:t,id:r,metadata:n,onClick:o,className:a}){return l.jsxs(Ee.Grid,{id:r,item:!0,xs:"auto",role:"menu","aria-label":r,className:`papi-menu-column ${a??""}`,children:[l.jsx("h3",{"aria-label":n.label,className:`papi-menu-column-header ${a??""}`,children:n.label}),l.jsx(Ee.List,{id:r,dense:!0,className:a??"",children:l.jsx(hh,{commandHandler:e,menuDefinition:t,columnId:r,onClick:o})})]})}function Xi({commandHandler:e,className:t,multiColumnMenu:r,id:n}){const{columns:o}=r,a=E.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(c=>{if(c==="isExtensible")return;const p=c,f=o[p];typeof f=="object"&&typeof f.order=="number"&&!Number.isNaN(f.order)?s.set(f.order,{id:p,metadata:f}):console.warn(`Property ${c} (${typeof f}) on menu ${n} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((c,p)=>(c.metadata.order||0)-(p.metadata.order||0))},[o,n]);return l.jsx(Ee.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:n,children:a.map((s,c)=>l.jsx(gh,{commandHandler:e,menuDefinition:r,...s,className:t},c))})}const Yi=T.createContext({});process.env.NODE_ENV!=="production"&&(Yi.displayName="ListContext");const bh=Yi;function vh(e){return nt("MuiList",e)}xt("MuiList",["root","padding","dense","subheader"]);const yh=["children","className","component","dense","disablePadding","subheader"],wh=e=>{const{classes:t,disablePadding:r,dense:n,subheader:o}=e;return ft({root:["root",!r&&"padding",n&&"dense",o&&"subheader"]},vh,t)},xh=Oe("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,!r.disablePadding&&t.padding,r.dense&&t.dense,r.subheader&&t.subheader]}})(({ownerState:e})=>P({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Ki=T.forwardRef(function(t,r){const n=mt({props:t,name:"MuiList"}),{children:o,className:a,component:s="ul",dense:c=!1,disablePadding:p=!1,subheader:f}=n,m=me(n,yh),v=T.useMemo(()=>({dense:c}),[c]),g=P({},n,{component:s,dense:c,disablePadding:p}),d=wh(g);return l.jsx(bh.Provider,{value:v,children:l.jsxs(xh,P({as:s,className:Se(d.root,a),ref:r,ownerState:g},m,{children:[f,o]}))})});process.env.NODE_ENV!=="production"&&(Ki.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,dense:i.bool,disablePadding:i.bool,subheader:i.node,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const kh=Ki,Eh=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Zn(e,t,r){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:r?null:e.firstChild}function ms(e,t,r){return e===t?r?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:r?null:e.lastChild}function Ji(e,t){if(t===void 0)return!0;let r=e.innerText;return r===void 0&&(r=e.textContent),r=r.trim().toLowerCase(),r.length===0?!1:t.repeating?r[0]===t.keys[0]:r.indexOf(t.keys.join(""))===0}function wr(e,t,r,n,o,a){let s=!1,c=o(e,t,t?r:!1);for(;c;){if(c===e.firstChild){if(s)return!1;s=!0}const p=n?!1:c.disabled||c.getAttribute("aria-disabled")==="true";if(!c.hasAttribute("tabindex")||!Ji(c,a)||p)c=o(e,c,r);else return c.focus(),!0}return!1}const Zi=T.forwardRef(function(t,r){const{actions:n,autoFocus:o=!1,autoFocusItem:a=!1,children:s,className:c,disabledItemsFocusable:p=!1,disableListWrap:f=!1,onKeyDown:m,variant:v="selectedMenu"}=t,g=me(t,Eh),d=T.useRef(null),h=T.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Dt(()=>{o&&d.current.focus()},[o]),T.useImperativeHandle(n,()=>({adjustStyleForScrollbar:(w,k)=>{const y=!d.current.style.width;if(w.clientHeight<d.current.clientHeight&&y){const S=`${di(je(w))}px`;d.current.style[k.direction==="rtl"?"paddingLeft":"paddingRight"]=S,d.current.style.width=`calc(100% + ${S})`}return d.current}}),[]);const u=w=>{const k=d.current,y=w.key,S=je(k).activeElement;if(y==="ArrowDown")w.preventDefault(),wr(k,S,f,p,Zn);else if(y==="ArrowUp")w.preventDefault(),wr(k,S,f,p,ms);else if(y==="Home")w.preventDefault(),wr(k,null,f,p,Zn);else if(y==="End")w.preventDefault(),wr(k,null,f,p,ms);else if(y.length===1){const C=h.current,M=y.toLowerCase(),A=performance.now();C.keys.length>0&&(A-C.lastTime>500?(C.keys=[],C.repeating=!0,C.previousKeyMatched=!0):C.repeating&&M!==C.keys[0]&&(C.repeating=!1)),C.lastTime=A,C.keys.push(M);const z=S&&!C.repeating&&Ji(S,C);C.previousKeyMatched&&(z||wr(k,S,!1,p,Zn,C))?w.preventDefault():C.previousKeyMatched=!1}m&&m(w)},b=qe(d,r);let x=-1;T.Children.forEach(s,(w,k)=>{if(!T.isValidElement(w)){x===k&&(x+=1,x>=s.length&&(x=-1));return}process.env.NODE_ENV!=="production"&&un.isFragment(w)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),w.props.disabled||(v==="selectedMenu"&&w.props.selected||x===-1)&&(x=k),x===k&&(w.props.disabled||w.props.muiSkipListHighlight||w.type.muiSkipListHighlight)&&(x+=1,x>=s.length&&(x=-1))});const R=T.Children.map(s,(w,k)=>{if(k===x){const y={};return a&&(y.autoFocus=!0),w.props.tabIndex===void 0&&v==="selectedMenu"&&(y.tabIndex=0),T.cloneElement(w,y)}return w});return l.jsx(kh,P({role:"menu",ref:b,className:c,onKeyDown:u,tabIndex:o?0:-1},g,{children:R}))});process.env.NODE_ENV!=="production"&&(Zi.propTypes={autoFocus:i.bool,autoFocusItem:i.bool,children:i.node,className:i.string,disabledItemsFocusable:i.bool,disableListWrap:i.bool,onKeyDown:i.func,variant:i.oneOf(["menu","selectedMenu"])});const Nh=Zi,Th=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Sh={entering:{opacity:1},entered:{opacity:1}},Qi=T.forwardRef(function(t,r){const n=Jr(),o={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:a,appear:s=!0,children:c,easing:p,in:f,onEnter:m,onEntered:v,onEntering:g,onExit:d,onExited:h,onExiting:u,style:b,timeout:x=o,TransitionComponent:R=zi}=t,w=me(t,Th),k=T.useRef(null),y=qe(k,c.ref,r),S=_=>H=>{if(_){const B=k.current;H===void 0?_(B):_(B,H)}},C=S(g),M=S((_,H)=>{Hi(_);const B=yn({style:b,timeout:x,easing:p},{mode:"enter"});_.style.webkitTransition=n.transitions.create("opacity",B),_.style.transition=n.transitions.create("opacity",B),m&&m(_,H)}),A=S(v),z=S(u),$=S(_=>{const H=yn({style:b,timeout:x,easing:p},{mode:"exit"});_.style.webkitTransition=n.transitions.create("opacity",H),_.style.transition=n.transitions.create("opacity",H),d&&d(_)}),N=S(h),j=_=>{a&&a(k.current,_)};return l.jsx(R,P({appear:s,in:f,nodeRef:k,onEnter:M,onEntered:A,onEntering:C,onExit:$,onExited:N,onExiting:z,addEndListener:j,timeout:x},w,{children:(_,H)=>T.cloneElement(c,P({style:P({opacity:0,visibility:_==="exited"&&!f?"hidden":void 0},Sh[_],b,c.props.style),ref:y},H))}))});process.env.NODE_ENV!=="production"&&(Qi.propTypes={addEndListener:i.func,appear:i.bool,children:Gr.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Ch=Qi;function jh(e){return nt("MuiBackdrop",e)}xt("MuiBackdrop",["root","invisible"]);const Oh=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Rh=e=>{const{classes:t,invisible:r}=e;return ft({root:["root",r&&"invisible"]},jh,t)},Ph=Oe("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.invisible&&t.invisible]}})(({ownerState:e})=>P({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),el=T.forwardRef(function(t,r){var n,o,a;const s=mt({props:t,name:"MuiBackdrop"}),{children:c,className:p,component:f="div",components:m={},componentsProps:v={},invisible:g=!1,open:d,slotProps:h={},slots:u={},TransitionComponent:b=Ch,transitionDuration:x}=s,R=me(s,Oh),w=P({},s,{component:f,invisible:g}),k=Rh(w),y=(n=h.root)!=null?n:v.root;return l.jsx(b,P({in:d,timeout:x},R,{children:l.jsx(Ph,P({"aria-hidden":!0},y,{as:(o=(a=u.root)!=null?a:m.Root)!=null?o:f,className:Se(k.root,p,y==null?void 0:y.className),ownerState:P({},w,y==null?void 0:y.ownerState),classes:k,ref:r,children:c}))}))});process.env.NODE_ENV!=="production"&&(el.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.object}),invisible:i.bool,open:i.bool.isRequired,slotProps:i.shape({root:i.object}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const $h=el;function _h(e){return nt("MuiModal",e)}xt("MuiModal",["root","hidden","backdrop"]);const Mh=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Ih=e=>{const{open:t,exited:r,classes:n}=e;return ft({root:["root",!t&&r&&"hidden"],backdrop:["backdrop"]},_h,n)},Dh=Oe("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,!r.open&&r.exited&&t.hidden]}})(({theme:e,ownerState:t})=>P({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Ah=Oe($h,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),tl=T.forwardRef(function(t,r){var n,o,a,s,c,p;const f=mt({name:"MuiModal",props:t}),{BackdropComponent:m=Ah,BackdropProps:v,className:g,closeAfterTransition:d=!1,children:h,container:u,component:b,components:x={},componentsProps:R={},disableAutoFocus:w=!1,disableEnforceFocus:k=!1,disableEscapeKeyDown:y=!1,disablePortal:S=!1,disableRestoreFocus:C=!1,disableScrollLock:M=!1,hideBackdrop:A=!1,keepMounted:z=!1,onBackdropClick:$,open:N,slotProps:j,slots:_}=f,H=me(f,Mh),B=P({},f,{closeAfterTransition:d,disableAutoFocus:w,disableEnforceFocus:k,disableEscapeKeyDown:y,disablePortal:S,disableRestoreFocus:C,disableScrollLock:M,hideBackdrop:A,keepMounted:z}),{getRootProps:L,getBackdropProps:J,getTransitionProps:Z,portalRef:O,isTopModal:I,exited:U,hasTransition:K}=If(P({},B,{rootRef:r})),G=P({},B,{exited:U}),q=Ih(G),X={};if(h.props.tabIndex===void 0&&(X.tabIndex="-1"),K){const{onEnter:te,onExited:D}=Z();X.onEnter=te,X.onExited=D}const Y=(n=(o=_==null?void 0:_.root)!=null?o:x.Root)!=null?n:Dh,W=(a=(s=_==null?void 0:_.backdrop)!=null?s:x.Backdrop)!=null?a:m,Q=(c=j==null?void 0:j.root)!=null?c:R.root,ee=(p=j==null?void 0:j.backdrop)!=null?p:R.backdrop,se=Bt({elementType:Y,externalSlotProps:Q,externalForwardedProps:H,getSlotProps:L,additionalProps:{ref:r,as:b},ownerState:G,className:Se(g,Q==null?void 0:Q.className,q==null?void 0:q.root,!G.open&&G.exited&&(q==null?void 0:q.hidden))}),V=Bt({elementType:W,externalSlotProps:ee,additionalProps:v,getSlotProps:te=>J(P({},te,{onClick:D=>{$&&$(D),te!=null&&te.onClick&&te.onClick(D)}})),className:Se(ee==null?void 0:ee.className,v==null?void 0:v.className,q==null?void 0:q.backdrop),ownerState:G});return!z&&!N&&(!K||U)?null:l.jsx(Ar,{ref:O,container:u,disablePortal:S,children:l.jsxs(Y,P({},se,{children:[!A&&m?l.jsx(W,P({},V)):null,l.jsx(gn,{disableEnforceFocus:k,disableAutoFocus:w,disableRestoreFocus:C,isEnabled:I,open:N,children:T.cloneElement(h,X)})]}))})});process.env.NODE_ENV!=="production"&&(tl.propTypes={BackdropComponent:i.elementType,BackdropProps:i.object,children:Gr.isRequired,classes:i.object,className:i.string,closeAfterTransition:i.bool,component:i.elementType,components:i.shape({Backdrop:i.elementType,Root:i.elementType}),componentsProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableEscapeKeyDown:i.bool,disablePortal:i.bool,disableRestoreFocus:i.bool,disableScrollLock:i.bool,hideBackdrop:i.bool,keepMounted:i.bool,onBackdropClick:i.func,onClose:i.func,onTransitionEnter:i.func,onTransitionExited:i.func,open:i.bool.isRequired,slotProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({backdrop:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const Bh=tl;function Lh(e){return nt("MuiPaper",e)}xt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Fh=["className","component","elevation","square","variant"],Vh=e=>{const{square:t,elevation:r,variant:n,classes:o}=e,a={root:["root",n,!t&&"rounded",n==="elevation"&&`elevation${r}`]};return ft(a,Lh,o)},zh=Oe("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],!r.square&&t.rounded,r.variant==="elevation"&&t[`elevation${r.elevation}`]]}})(({theme:e,ownerState:t})=>{var r;return P({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&P({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${hn("#fff",ds(t.elevation))}, ${hn("#fff",ds(t.elevation))})`},e.vars&&{backgroundImage:(r=e.vars.overlays)==null?void 0:r[t.elevation]}))}),rl=T.forwardRef(function(t,r){const n=mt({props:t,name:"MuiPaper"}),{className:o,component:a="div",elevation:s=1,square:c=!1,variant:p="elevation"}=n,f=me(n,Fh),m=P({},n,{component:a,elevation:s,square:c,variant:p}),v=Vh(m);return process.env.NODE_ENV!=="production"&&Jr().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),l.jsx(zh,P({as:a,ownerState:m,className:Se(v.root,o),ref:r},f))});process.env.NODE_ENV!=="production"&&(rl.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,elevation:lr(mi,e=>{const{elevation:t,variant:r}=e;return t>0&&r==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${r}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:i.bool,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),variant:i.oneOfType([i.oneOf(["elevation","outlined"]),i.string])});const Hh=rl;function Uh(e){return nt("MuiPopover",e)}xt("MuiPopover",["root","paper"]);const Gh=["onEntering"],qh=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Wh=["slotProps"];function hs(e,t){let r=0;return typeof t=="number"?r=t:t==="center"?r=e.height/2:t==="bottom"&&(r=e.height),r}function gs(e,t){let r=0;return typeof t=="number"?r=t:t==="center"?r=e.width/2:t==="right"&&(r=e.width),r}function bs(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function pn(e){return typeof e=="function"?e():e}const Xh=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"]},Uh,t)},Yh=Oe(Bh,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),nl=Oe(Hh,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),ol=T.forwardRef(function(t,r){var n,o,a;const s=mt({props:t,name:"MuiPopover"}),{action:c,anchorEl:p,anchorOrigin:f={vertical:"top",horizontal:"left"},anchorPosition:m,anchorReference:v="anchorEl",children:g,className:d,container:h,elevation:u=8,marginThreshold:b=16,open:x,PaperProps:R={},slots:w,slotProps:k,transformOrigin:y={vertical:"top",horizontal:"left"},TransitionComponent:S=vo,transitionDuration:C="auto",TransitionProps:{onEntering:M}={},disableScrollLock:A=!1}=s,z=me(s.TransitionProps,Gh),$=me(s,qh),N=(n=k==null?void 0:k.paper)!=null?n:R,j=T.useRef(),_=qe(j,N.ref),H=P({},s,{anchorOrigin:f,anchorReference:v,elevation:u,marginThreshold:b,externalPaperSlotProps:N,transformOrigin:y,TransitionComponent:S,transitionDuration:C,TransitionProps:z}),B=Xh(H),L=T.useCallback(()=>{if(v==="anchorPosition")return process.env.NODE_ENV!=="production"&&(m||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),m;const te=pn(p),D=te&&te.nodeType===1?te:je(j.current).body,ie=D.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Ne=D.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Ne.top===0&&Ne.left===0&&Ne.right===0&&Ne.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:ie.top+hs(ie,f.vertical),left:ie.left+gs(ie,f.horizontal)}},[p,f.horizontal,f.vertical,m,v]),J=T.useCallback(te=>({vertical:hs(te,y.vertical),horizontal:gs(te,y.horizontal)}),[y.horizontal,y.vertical]),Z=T.useCallback(te=>{const D={width:te.offsetWidth,height:te.offsetHeight},ie=J(D);if(v==="none")return{top:null,left:null,transformOrigin:bs(ie)};const Ne=L();let Re=Ne.top-ie.vertical,xe=Ne.left-ie.horizontal;const Nt=Re+D.height,Pe=xe+D.width,ot=er(pn(p)),Ae=ot.innerHeight-b,at=ot.innerWidth-b;if(b!==null&&Re<b){const Te=Re-b;Re-=Te,ie.vertical+=Te}else if(b!==null&&Nt>Ae){const Te=Nt-Ae;Re-=Te,ie.vertical+=Te}if(process.env.NODE_ENV!=="production"&&D.height>Ae&&D.height&&Ae&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${D.height-Ae}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),b!==null&&xe<b){const Te=xe-b;xe-=Te,ie.horizontal+=Te}else if(Pe>at){const Te=Pe-at;xe-=Te,ie.horizontal+=Te}return{top:`${Math.round(Re)}px`,left:`${Math.round(xe)}px`,transformOrigin:bs(ie)}},[p,v,L,J,b]),[O,I]=T.useState(x),U=T.useCallback(()=>{const te=j.current;if(!te)return;const D=Z(te);D.top!==null&&(te.style.top=D.top),D.left!==null&&(te.style.left=D.left),te.style.transformOrigin=D.transformOrigin,I(!0)},[Z]);T.useEffect(()=>(A&&window.addEventListener("scroll",U),()=>window.removeEventListener("scroll",U)),[p,A,U]);const K=(te,D)=>{M&&M(te,D),U()},G=()=>{I(!1)};T.useEffect(()=>{x&&U()}),T.useImperativeHandle(c,()=>x?{updatePosition:()=>{U()}}:null,[x,U]),T.useEffect(()=>{if(!x)return;const te=ii(()=>{U()}),D=er(p);return D.addEventListener("resize",te),()=>{te.clear(),D.removeEventListener("resize",te)}},[p,x,U]);let q=C;C==="auto"&&!S.muiSupportAuto&&(q=void 0);const X=h||(p?je(pn(p)).body:void 0),Y=(o=w==null?void 0:w.root)!=null?o:Yh,W=(a=w==null?void 0:w.paper)!=null?a:nl,Q=Bt({elementType:W,externalSlotProps:P({},N,{style:O?N.style:P({},N.style,{opacity:0})}),additionalProps:{elevation:u,ref:_},ownerState:H,className:Se(B.paper,N==null?void 0:N.className)}),ee=Bt({elementType:Y,externalSlotProps:(k==null?void 0:k.root)||{},externalForwardedProps:$,additionalProps:{ref:r,slotProps:{backdrop:{invisible:!0}},container:X,open:x},ownerState:H,className:Se(B.root,d)}),{slotProps:se}=ee,V=me(ee,Wh);return l.jsx(Y,P({},V,!Si(Y)&&{slotProps:se,disableScrollLock:A},{children:l.jsx(S,P({appear:!0,in:x,onEntering:K,onExited:G,timeout:q},z,{children:l.jsx(W,P({},Q,{children:g}))}))}))});process.env.NODE_ENV!=="production"&&(ol.propTypes={action:$o,anchorEl:lr(i.oneOfType([pt,i.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=pn(e.anchorEl);if(t&&t.nodeType===1){const r=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&r.top===0&&r.left===0&&r.right===0&&r.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),anchorPosition:i.shape({left:i.number.isRequired,top:i.number.isRequired}),anchorReference:i.oneOf(["anchorEl","anchorPosition","none"]),children:i.node,classes:i.object,className:i.string,container:i.oneOfType([pt,i.func]),disableScrollLock:i.bool,elevation:mi,marginThreshold:i.number,onClose:i.func,open:i.bool.isRequired,PaperProps:i.shape({component:Sp}),slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transformOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object});const Kh=ol;function Jh(e){return nt("MuiMenu",e)}xt("MuiMenu",["root","paper","list"]);const Zh=["onEntering"],Qh=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],eg={vertical:"top",horizontal:"right"},tg={vertical:"top",horizontal:"left"},rg=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"],list:["list"]},Jh,t)},ng=Oe(Kh,{shouldForwardProp:e=>Ei(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),og=Oe(nl,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),ag=Oe(Nh,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),al=T.forwardRef(function(t,r){var n,o;const a=mt({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:c,className:p,disableAutoFocusItem:f=!1,MenuListProps:m={},onClose:v,open:g,PaperProps:d={},PopoverClasses:h,transitionDuration:u="auto",TransitionProps:{onEntering:b}={},variant:x="selectedMenu",slots:R={},slotProps:w={}}=a,k=me(a.TransitionProps,Zh),y=me(a,Qh),S=Jr(),C=S.direction==="rtl",M=P({},a,{autoFocus:s,disableAutoFocusItem:f,MenuListProps:m,onEntering:b,PaperProps:d,transitionDuration:u,TransitionProps:k,variant:x}),A=rg(M),z=s&&!f&&g,$=T.useRef(null),N=(Z,O)=>{$.current&&$.current.adjustStyleForScrollbar(Z,S),b&&b(Z,O)},j=Z=>{Z.key==="Tab"&&(Z.preventDefault(),v&&v(Z,"tabKeyDown"))};let _=-1;T.Children.map(c,(Z,O)=>{T.isValidElement(Z)&&(process.env.NODE_ENV!=="production"&&un.isFragment(Z)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Z.props.disabled||(x==="selectedMenu"&&Z.props.selected||_===-1)&&(_=O))});const H=(n=R.paper)!=null?n:og,B=(o=w.paper)!=null?o:d,L=Bt({elementType:R.root,externalSlotProps:w.root,ownerState:M,className:[A.root,p]}),J=Bt({elementType:H,externalSlotProps:B,ownerState:M,className:A.paper});return l.jsx(ng,P({onClose:v,anchorOrigin:{vertical:"bottom",horizontal:C?"right":"left"},transformOrigin:C?eg:tg,slots:{paper:H,root:R.root},slotProps:{root:L,paper:J},open:g,ref:r,transitionDuration:u,TransitionProps:P({onEntering:N},k),ownerState:M},y,{classes:h,children:l.jsx(ag,P({onKeyDown:j,actions:$,autoFocus:s&&(_===-1||f),autoFocusItem:z,variant:x},m,{className:Se(A.list,m.className),children:c}))}))});process.env.NODE_ENV!=="production"&&(al.propTypes={anchorEl:i.oneOfType([pt,i.func]),autoFocus:i.bool,children:i.node,classes:i.object,className:i.string,disableAutoFocusItem:i.bool,MenuListProps:i.object,onClose:i.func,open:i.bool.isRequired,PaperProps:i.object,PopoverClasses:i.object,slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object,variant:i.oneOf(["menu","selectedMenu"])});const sg=al;function ig({className:e,commandHandler:t,menuDefinition:r,children:n}){var f;const[o,a]=E.useState(void 0),s=E.useCallback(m=>{m.preventDefault(),a(o===void 0?{mouseX:m.clientX+2,mouseY:m.clientY-6}:void 0)},[o]),c=E.useCallback(()=>{a(void 0)},[]),p=E.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((f=r==null?void 0:r.items)==null?void 0:f.length)??0)===0||!n?n:l.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[n,l.jsx(sg,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:c,anchorReference:"anchorPosition",anchorPosition:p,children:l.jsx(Jo,{menuDefinition:r,commandHandler:t,onClick:c})})]})}function lg(e){return{preserveValue:!0,...e}}const wn=(e,t,r={})=>{const n=E.useRef(t);n.current=t;const o=E.useRef(r);o.current=lg(o.current);const[a,s]=E.useState(()=>n.current),[c,p]=E.useState(!0);return E.useEffect(()=>{let f=!0;return p(!!e),(async()=>{if(e){const m=await e();f&&(s(()=>m),p(!1))}})(),()=>{f=!1,o.current.preserveValue||s(()=>n.current)}},[e]),[a,c]},cg=Ni(l.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function sl({menuProvider:e,normalMenu:t,fullMenu:r,commandHandler:n,containerRef:o,className:a,ariaLabelPrefix:s,children:c}){const[p,f]=E.useState(!1),[m,v]=E.useState(!1),g=E.useCallback(()=>{p&&f(!1),v(!1)},[p]),d=E.useCallback(k=>{k.stopPropagation(),f(y=>{const S=!y;return S&&k.shiftKey?v(!0):S||v(!1),S})},[]),h=E.useCallback(k=>(g(),n(k)),[n,g]),[u,b]=E.useState({top:1,left:1});E.useEffect(()=>{if(p){const k=o==null?void 0:o.current;if(k){const y=k.getBoundingClientRect(),S=window.scrollY,C=window.scrollX,M=y.top+S+k.clientHeight,A=y.left+C;b({top:M,left:A})}}},[p,o]);const[x]=wn(E.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,p]),t),[R]=wn(E.useCallback(async()=>(e==null?void 0:e(!0))??r??x,[e,r,x,p]),r??x),w=m&&R?R:x;return l.jsxs(l.Fragment,{children:[l.jsx(Ee.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:d,children:c??l.jsx(cg,{})}),l.jsx(Ee.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:p,onClose:g,PaperProps:{className:"papi-menu-drawer-paper",style:{top:u.top,left:u.left}},children:w?l.jsx(Xi,{className:a,id:`${s??""} main menu`,commandHandler:h,multiColumnMenu:w}):void 0})]})}function pg({id:e,label:t,isDisabled:r=!1,tooltip:n,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:s="medium",className:c,onClick:p,children:f}){return l.jsx(Ee.IconButton,{id:e,disabled:r,edge:a,size:s,"aria-label":t,title:o?void 0:n??t,className:`papi-icon-button ${c??""}`,onClick:p,children:f})}const yt="scrBook",dg="scrRef",Ot="source",ug="details",fg="Scripture Reference",mg="Scripture Book",il="Type",hg="Details";function gg(e,t){const r=t??!1;return[{accessorFn:n=>`${fe.bookNumberToId(n.start.bookNum)} ${n.start.chapterNum}:${n.start.verseNum}`,id:yt,header:(e==null?void 0:e.scriptureReferenceColumnName)??fg,cell:n=>{const o=n.row.original;return n.row.getIsGrouped()?fe.bookNumberToEnglishName(o.start.bookNum):n.row.groupingColumnId===yt?Ue.formatScrRef(o.start):void 0},getGroupingValue:n=>n.start.bookNum,sortingFn:(n,o)=>Ue.compareScrRefs(n.original.start,o.original.start),enableGrouping:!0},{accessorFn:n=>Ue.formatScrRef(n.start),id:dg,header:void 0,cell:n=>{const o=n.row.original;return n.row.getIsGrouped()?void 0:Ue.formatScrRef(o.start)},sortingFn:(n,o)=>Ue.compareScrRefs(n.original.start,o.original.start),enableGrouping:!1},{accessorFn:n=>n.source.displayName,id:Ot,header:r?(e==null?void 0:e.typeColumnName)??il:void 0,cell:n=>r||n.row.getIsGrouped()?n.getValue():void 0,getGroupingValue:n=>n.source.id,sortingFn:(n,o)=>n.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:n=>n.detail,id:ug,header:(e==null?void 0:e.detailsColumnName)??hg,cell:n=>n.getValue(),enableGrouping:!1}]}function bg({sources:e,showColumnHeaders:t=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:n,scriptureBookGroupName:o,typeColumnName:a,detailsColumnName:s,onRowSelected:c,direction:p="ltr"}){const[f,m]=E.useState([]),[v,g]=E.useState([{id:yt,desc:!1}]),[d,h]=E.useState(()=>e.flatMap(N=>{const j=N.source;return N.data.map(_=>({..._,source:j}))})),[u,b]=E.useState({});E.useEffect(()=>{h(()=>e.flatMap(N=>{const j=N.source;return N.data.map(_=>({..._,source:j}))}))},[e]);const x=E.useMemo(()=>gg({scriptureReferenceColumnName:n,typeColumnName:a,detailsColumnName:s},r),[n,a,s,r]);E.useEffect(()=>{f.includes(Ot)?g([{id:Ot,desc:!1},{id:yt,desc:!1}]):g([{id:yt,desc:!1}])},[f]);const R=E.useCallback((N,j)=>!j||Ue.compareScrRefs(N,j)===0?`${Ue.scrRefToBBBCCCVVV(N)}`:`${Ue.scrRefToBBBCCCVVV(N)}-${Ue.scrRefToBBBCCCVVV(j)}`,[]),w=E.useCallback(N=>`${R(N.start,N.end)} ${N.source} ${N.detail}`,[R]),k=Ce.useReactTable({data:d,columns:x,state:{grouping:f,sorting:v,rowSelection:u},onGroupingChange:m,onSortingChange:g,onRowSelectionChange:b,getExpandedRowModel:Ce.getExpandedRowModel(),getGroupedRowModel:Ce.getGroupedRowModel(),getCoreRowModel:Ce.getCoreRowModel(),getSortedRowModel:Ce.getSortedRowModel(),getRowId:w,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});E.useEffect(()=>{if(c){const N=k.getSelectedRowModel().rowsById,j=Object.keys(N);if(j.length===1){const _=d.find(H=>w(H)===j[0])||void 0;_&&c(_)}}},[u,d,w,c,k]);const y=o??mg,S=a??il,C=[{label:"No Grouping",value:[]},{label:`Group by ${y}`,value:[yt]},{label:`Group by ${S}`,value:[Ot]},{label:`Group by ${y} and ${S}`,value:[yt,Ot]},{label:`Group by ${S} and ${y}`,value:[Ot,yt]}],M=N=>{m(JSON.parse(N))},A=(N,j)=>{!N.getIsGrouped()&&!N.getIsSelected()&&N.getToggleSelectedHandler()(j)},z=(N,j)=>N.getIsGrouped()?"":F("banded-row",j%2===0?"even":"odd"),$=(N,j,_)=>{if(!((N==null?void 0:N.length)===0||j.depth<_.column.getGroupedIndex())){if(j.getIsGrouped())switch(j.depth){case 1:return"pr-ps-4";default:return}switch(j.depth){case 1:return"pr-ps-8";case 2:return"pr-ps-12";default:return}}};return l.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-w-full pr-flex-col",children:[!t&&l.jsxs(_r,{value:JSON.stringify(f),onValueChange:N=>{M(N)},children:[l.jsx(Kt,{className:"pr-mb-1 pr-mt-2",children:l.jsx(Mr,{})}),l.jsx(Jt,{position:"item-aligned",children:l.jsx(Ls,{children:C.map(N=>l.jsx(Ke,{value:JSON.stringify(N.value),children:N.label},N.label))})})]}),l.jsxs(zr,{className:"pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0",children:[t&&l.jsx(Hr,{children:k.getHeaderGroups().map(N=>l.jsx(lt,{children:N.headers.filter(j=>j.column.columnDef.header).map(j=>l.jsx(Zt,{colSpan:j.colSpan,className:"top-0 pr-sticky",children:j.isPlaceholder?void 0:l.jsxs("div",{children:[j.column.getCanGroup()?l.jsx(be,{variant:"ghost",title:`Toggle grouping by ${j.column.columnDef.header}`,onClick:j.column.getToggleGroupingHandler(),type:"button",children:j.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Ce.flexRender(j.column.columnDef.header,j.getContext())]})},j.id))},N.id))}),l.jsx(Ur,{children:k.getRowModel().rows.map((N,j)=>l.jsx(lt,{"data-state":N.getIsSelected()?"selected":"",className:F(z(N,j)),onClick:_=>A(N,_),children:N.getVisibleCells().map(_=>{if(!(_.getIsPlaceholder()||_.column.columnDef.enableGrouping&&!_.getIsGrouped()&&(_.column.columnDef.id!==Ot||!r)))return l.jsx(It,{className:F(_.column.columnDef.id,"pr-p-[1px]",$(f,N,_)),children:(()=>_.getIsGrouped()?l.jsxs(be,{variant:"link",onClick:N.getToggleExpandedHandler(),type:"button",children:[N.getIsExpanded()&&l.jsx(ne.ChevronDown,{}),!N.getIsExpanded()&&(p==="ltr"?l.jsx(ne.ChevronRight,{}):l.jsx(ne.ChevronLeft,{}))," ",Ce.flexRender(_.column.columnDef.cell,_.getContext())," (",N.subRows.length,")"]}):Ce.flexRender(_.column.columnDef.cell,_.getContext()))()},_.id)})},N.id))})]})]})}function ll({onSearch:e,placeholder:t,isFullWidth:r}){const[n,o]=E.useState(""),a=s=>{o(s),e(s)};return l.jsx(ar,{className:F("pr-flex pr-h-10 pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-[color:hsl(240,5%,64.9%)] focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",{"pr-w-full":r}),placeholder:t,value:n,onChange:s=>a(s.target.value)})}function vg({id:e,isDisabled:t=!1,orientation:r="horizontal",min:n=0,max:o=100,step:a=1,showMarks:s=!1,defaultValue:c,value:p,valueLabelDisplay:f="off",className:m,onChange:v,onChangeCommitted:g}){return l.jsx(Ee.Slider,{id:e,disabled:t,orientation:r,min:n,max:o,step:a,marks:s,defaultValue:c,value:p,valueLabelDisplay:f,className:`papi-slider ${r} ${m??""}`,onChange:v,onChangeCommitted:g})}function yg({autoHideDuration:e=void 0,id:t,isOpen:r=!1,className:n,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:s,children:c}){const p={action:(s==null?void 0:s.action)||c,message:s==null?void 0:s.message,className:n};return l.jsx(Ee.Snackbar,{autoHideDuration:e??void 0,open:r,onClose:o,anchorOrigin:a,id:t,ContentProps:p})}const Zo=E.forwardRef(({className:e,...t},r)=>l.jsx(De.Root,{orientation:"vertical",ref:r,className:F("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));Zo.displayName=De.List.displayName;const Qo=E.forwardRef(({className:e,...t},r)=>l.jsx(De.List,{ref:r,className:F("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Qo.displayName=De.List.displayName;const cl=E.forwardRef(({className:e,...t},r)=>l.jsx(De.Trigger,{ref:r,...t,className:F("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),ea=E.forwardRef(({className:e,...t},r)=>l.jsx(De.Content,{ref:r,className:F("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));ea.displayName=De.Content.displayName;function wg({tabList:e,onSearch:t,searchPlaceholder:r,headerTitle:n,isSearchBarFullWidth:o=!1,direction:a="ltr"}){return l.jsxs("div",{className:"pr-twp",children:[l.jsxs("div",{className:"pr-sticky pr-top-0 pr-space-y-2 pr-pb-2",children:[n?l.jsx("h1",{children:n}):"",l.jsx(ll,{isFullWidth:o,onSearch:t,placeholder:r})]}),l.jsxs(Zo,{dir:a,children:[l.jsx(Qo,{children:e.map(s=>l.jsx(cl,{value:s.value,children:s.value},s.key))}),e.map(s=>l.jsx(ea,{value:s.value,children:s.content},s.key))]})]})}const ta=E.forwardRef(({className:e,orientation:t="horizontal",decorative:r=!0,...n},o)=>l.jsx(Ss.Root,{ref:o,decorative:r,orientation:t,className:F("pr-twp pr-shrink-0 pr-bg-border",t==="horizontal"?"pr-h-[1px] pr-w-full":"pr-h-full pr-w-[1px]",e),...n}));ta.displayName=Ss.Root.displayName;function xg({children:e}){return l.jsx("div",{className:"pr-twp pr-grid",children:e})}function kg({primary:e,secondary:t,children:r,isLoading:n=!1,loadingMessage:o}){return l.jsxs("div",{className:"pr-flex pr-items-center pr-justify-between pr-space-x-4 pr-py-2",children:[l.jsxs("div",{children:[l.jsx("p",{className:"pr-text-sm pr-font-medium pr-leading-none",children:e}),l.jsx("p",{className:"pr-whitespace-normal pr-break-words pr-text-sm pr-text-muted-foreground",children:t})]}),n?l.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:o}):l.jsx("div",{children:r})]})}function Eg({primary:e,secondary:t,includeSeparator:r=!1}){return l.jsxs("div",{className:"pr-space-y-4 pr-py-2",children:[l.jsxs("div",{children:[l.jsx("h3",{className:"pr-text-lg pr-font-medium",children:e}),l.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:t})]}),r?l.jsx(ta,{}):""]})}const cr=E.forwardRef(({className:e,...t},r)=>l.jsx(ne.LoaderCircle,{size:35,className:F("pr-animate-spin",e),...t,ref:r}));cr.displayName="Spinner";function Ng({id:e,isChecked:t,isDisabled:r=!1,hasError:n=!1,className:o,onChange:a}){return l.jsx(Ee.Switch,{id:e,checked:t,disabled:r,className:`papi-switch ${n?"error":""} ${o??""}`,onChange:a})}const Tg=xo.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),ra=E.forwardRef(({className:e,...t},r)=>l.jsx(Cs.Root,{ref:r,className:F(Tg(),e),...t}));ra.displayName=Cs.Root.displayName;function Sg({id:e,isDisabled:t=!1,hasError:r=!1,isFullWidth:n=!1,helperText:o,label:a,placeholder:s,isRequired:c=!1,className:p,defaultValue:f,value:m,onChange:v,onFocus:g,onBlur:d}){return l.jsxs("div",{className:F("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":n}),children:[l.jsx(ra,{htmlFor:e,className:F({"pr-text-red-600":r,"pr-hidden":!a}),children:`${a}${c?"*":""}`}),l.jsx(ar,{id:e,disabled:t,placeholder:s,required:c,className:F(p,{"pr-border-red-600":r}),defaultValue:f,value:m,onChange:v,onFocus:g,onBlur:d}),l.jsx("p",{className:F({"pr-hidden":!o}),children:o})]})}function Cg({menuProvider:e,commandHandler:t,className:r,id:n,children:o}){const a=E.useRef(void 0);return l.jsx("div",{ref:a,style:{position:"relative"},children:l.jsx(Ee.AppBar,{position:"static",id:n,children:l.jsxs(Ee.Toolbar,{className:`papi-toolbar ${r??""}`,variant:"dense",children:[e?l.jsx(sl,{commandHandler:t,containerRef:a,menuProvider:e}):void 0,o?l.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const jg=De.Root,pl=E.forwardRef(({className:e,...t},r)=>l.jsx(De.List,{ref:r,className:F("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));pl.displayName=De.List.displayName;const dl=E.forwardRef(({className:e,...t},r)=>l.jsx(De.Trigger,{ref:r,className:F("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));dl.displayName=De.Trigger.displayName;const ul=E.forwardRef(({className:e,...t},r)=>l.jsx(De.Content,{ref:r,className:F("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));ul.displayName=De.Content.displayName;function Og({isInstalling:e,handleClick:t,buttonText:r,className:n,...o}){return l.jsx(be,{className:F("pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e,"pr-bg-blue-600":!e,"pr-bg-white pr-text-blue-600 hover:pr-text-white":!r,"pr-w-20":r},n),onClick:t,...o,children:e?l.jsx(cr,{size:15}):l.jsxs(l.Fragment,{children:[l.jsx(ne.Download,{size:25,className:F("pr-h-4 pr-w-4",{"pr-mr-1":r})}),r]})})}function Rg({isEnabling:e,handleClick:t,className:r,...n}){return l.jsx(be,{className:F("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e},r),onClick:t,...n,children:e?l.jsxs(l.Fragment,{children:[l.jsx(cr,{size:15,className:"pr-mr-1 pr-text-white"}),"Enabling..."]}):"Enable"})}function Pg({isDisabling:e,handleClick:t,className:r,...n}){return l.jsx(be,{className:F("pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-gray-400",{"pr-cursor-not-allowed pr-bg-gray-400":e},r),onClick:t,...n,children:e?l.jsxs(l.Fragment,{children:[l.jsx(cr,{size:15,className:"pr-mr-1 pr-text-black"}),"Disabling..."]}):"Disable"})}function $g({isUpdating:e,handleClick:t,className:r,...n}){return l.jsx(be,{className:F("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700 hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e},r),onClick:t,...n,children:e?l.jsxs(l.Fragment,{children:[l.jsx(cr,{size:15,className:"pr-mr-1 pr-text-white"}),"Updating..."]}):"Update"})}function $t(){return $t=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},$t.apply(this,arguments)}const _g=["children","options"],vs=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,t)=>(e[t.toLowerCase()]=t,e),{for:"htmlFor"}),ys={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},Mg=["style","script"],Ig=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,Dg=/mailto:/i,Ag=/\n{2,}$/,fl=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,Bg=/^ *> ?/gm,Lg=/^ {2,}\n/,Fg=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,ml=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,hl=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,Vg=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,zg=/^(?:\n *)*\n/,Hg=/\r\n?/g,Ug=/^\[\^([^\]]+)](:.*)\n/,Gg=/^\[\^([^\]]+)]/,qg=/\f/g,Wg=/^\s*?\[(x|\s)\]/,gl=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,bl=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,vl=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,yo=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,Xg=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,yl=/^<!--[\s\S]*?(?:-->)/,Yg=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,wo=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,Kg=/^\{.*\}$/,Jg=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,Zg=/^<([^ >]+@[^ >]+)>/,Qg=/^<([^ >]+:\/[^ >]+)>/,eb=/-([a-z])?/gi,wl=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,tb=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,rb=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,nb=/^\[([^\]]*)\] ?\[([^\]]*)\]/,ob=/(\[|\])/g,ab=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,sb=/\t/g,ib=/^ *\| */,lb=/(^ *\||\| *$)/g,cb=/ *$/,pb=/^ *:-+: *$/,db=/^ *:-+ *$/,ub=/^ *-+: *$/,fb=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,mb=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,hb=/^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,gb=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,bb=/^\\([^0-9A-Za-z\s])/,vb=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,yb=/^\n+/,wb=/^([ \t]*)/,xb=/\\([^\\])/g,ws=/ *\n+$/,kb=/(?:^|\n)( *)$/,na="(?:\\d+\\.)",oa="(?:[*+-])";function xl(e){return"( *)("+(e===1?na:oa)+") +"}const kl=xl(1),El=xl(2);function Nl(e){return new RegExp("^"+(e===1?kl:El))}const Eb=Nl(1),Nb=Nl(2);function Tl(e){return new RegExp("^"+(e===1?kl:El)+"[^\\n]*(?:\\n(?!\\1"+(e===1?na:oa)+" )[^\\n]*)*(\\n|$)","gm")}const Sl=Tl(1),Cl=Tl(2);function jl(e){const t=e===1?na:oa;return new RegExp("^( *)("+t+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+t+" (?!"+t+" ))\\n*|\\s*\\n*$)")}const Ol=jl(1),Rl=jl(2);function xs(e,t){const r=t===1,n=r?Ol:Rl,o=r?Sl:Cl,a=r?Eb:Nb;return{t(s,c,p){const f=kb.exec(p);return f&&(c.o||!c._&&!c.u)?n.exec(s=f[1]+s):null},i:ae.HIGH,l(s,c,p){const f=r?+s[2]:void 0,m=s[0].replace(Ag,`
`).match(o);let v=!1;return{p:m.map(function(g,d){const h=a.exec(g)[0].length,u=new RegExp("^ {1,"+h+"}","gm"),b=g.replace(u,"").replace(a,""),x=d===m.length-1,R=b.indexOf(`

`)!==-1||x&&v;v=R;const w=p._,k=p.o;let y;p.o=!0,R?(p._=!1,y=b.replace(ws,`

`)):(p._=!0,y=b.replace(ws,""));const S=c(y,p);return p._=w,p.o=k,S}),m:r,g:f}},h:(s,c,p)=>e(s.m?"ol":"ul",{key:p.k,start:s.g},s.p.map(function(f,m){return e("li",{key:m},c(f,p))}))}}const Tb=/^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Sb=/^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Pl=[fl,ml,hl,gl,vl,bl,yl,wl,Sl,Ol,Cl,Rl],Cb=[...Pl,/^[^\n]+(?:  \n|\n{2,})/,yo,wo];function jb(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function Ob(e){return ub.test(e)?"right":pb.test(e)?"center":db.test(e)?"left":null}function ks(e,t,r){const n=r.$;r.$=!0;const o=t(e.trim(),r);r.$=n;let a=[[]];return o.forEach(function(s,c){s.type==="tableSeparator"?c!==0&&c!==o.length-1&&a.push([]):(s.type!=="text"||o[c+1]!=null&&o[c+1].type!=="tableSeparator"||(s.v=s.v.replace(cb,"")),a[a.length-1].push(s))}),a}function Rb(e,t,r){r._=!0;const n=ks(e[1],t,r),o=e[2].replace(lb,"").split("|").map(Ob),a=function(s,c,p){return s.trim().split(`
`).map(function(f){return ks(f,c,p)})}(e[3],t,r);return r._=!1,{S:o,A:a,L:n,type:"table"}}function Es(e,t){return e.S[t]==null?{}:{textAlign:e.S[t]}}function bt(e){return function(t,r){return r._?e.exec(t):null}}function vt(e){return function(t,r){return r._||r.u?e.exec(t):null}}function it(e){return function(t,r){return r._||r.u?null:e.exec(t)}}function xr(e){return function(t){return e.exec(t)}}function Pb(e,t,r){if(t._||t.u||r&&!r.endsWith(`
`))return null;let n="";e.split(`
`).every(a=>!Pl.some(s=>s.test(a))&&(n+=a+`
`,a.trim()));const o=n.trimEnd();return o==""?null:[n,o]}function Wt(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch{return null}return e}function Ns(e){return e.replace(xb,"$1")}function dn(e,t,r){const n=r._||!1,o=r.u||!1;r._=!0,r.u=!0;const a=e(t,r);return r._=n,r.u=o,a}function $b(e,t,r){const n=r._||!1,o=r.u||!1;r._=!1,r.u=!0;const a=e(t,r);return r._=n,r.u=o,a}function _b(e,t,r){return r._=!1,e(t,r)}const Qn=(e,t,r)=>({v:dn(t,e[1],r)});function eo(){return{}}function to(){return null}function Mb(...e){return e.filter(Boolean).join(" ")}function ro(e,t,r){let n=e;const o=t.split(".");for(;o.length&&(n=n[o[0]],n!==void 0);)o.shift();return n||r}var ae;function Ib(e,t={}){t.overrides=t.overrides||{},t.slugify=t.slugify||jb,t.namedCodesToUnicode=t.namedCodesToUnicode?$t({},ys,t.namedCodesToUnicode):ys;const r=t.createElement||T.createElement;function n(d,h,...u){const b=ro(t.overrides,`${d}.props`,{});return r(function(x,R){const w=ro(R,x);return w?typeof w=="function"||typeof w=="object"&&"render"in w?w:ro(R,`${x}.component`,x):x}(d,t.overrides),$t({},h,b,{className:Mb(h==null?void 0:h.className,b.className)||void 0}),...u)}function o(d){let h=!1;t.forceInline?h=!0:t.forceBlock||(h=ab.test(d)===!1);const u=m(f(h?d:`${d.trimEnd().replace(yb,"")}

`,{_:h}));for(;typeof u[u.length-1]=="string"&&!u[u.length-1].trim();)u.pop();if(t.wrapper===null)return u;const b=t.wrapper||(h?"span":"div");let x;if(u.length>1||t.forceWrapper)x=u;else{if(u.length===1)return x=u[0],typeof x=="string"?n("span",{key:"outer"},x):x;x=null}return T.createElement(b,{key:"outer"},x)}function a(d){const h=d.match(Ig);return h?h.reduce(function(u,b,x){const R=b.indexOf("=");if(R!==-1){const w=function(C){return C.indexOf("-")!==-1&&C.match(Yg)===null&&(C=C.replace(eb,function(M,A){return A.toUpperCase()})),C}(b.slice(0,R)).trim(),k=function(C){const M=C[0];return(M==='"'||M==="'")&&C.length>=2&&C[C.length-1]===M?C.slice(1,-1):C}(b.slice(R+1).trim()),y=vs[w]||w,S=u[y]=function(C,M){return C==="style"?M.split(/;\s?/).reduce(function(A,z){const $=z.slice(0,z.indexOf(":"));return A[$.replace(/(-[a-z])/g,N=>N[1].toUpperCase())]=z.slice($.length+1).trim(),A},{}):C==="href"?Wt(M):(M.match(Kg)&&(M=M.slice(1,M.length-1)),M==="true"||M!=="false"&&M)}(w,k);typeof S=="string"&&(yo.test(S)||wo.test(S))&&(u[y]=T.cloneElement(o(S.trim()),{key:x}))}else b!=="style"&&(u[vs[b]||b]=!0);return u},{}):null}const s=[],c={},p={blockQuote:{t:it(fl),i:ae.HIGH,l:(d,h,u)=>({v:h(d[0].replace(Bg,""),u)}),h:(d,h,u)=>n("blockquote",{key:u.k},h(d.v,u))},breakLine:{t:xr(Lg),i:ae.HIGH,l:eo,h:(d,h,u)=>n("br",{key:u.k})},breakThematic:{t:it(Fg),i:ae.HIGH,l:eo,h:(d,h,u)=>n("hr",{key:u.k})},codeBlock:{t:it(hl),i:ae.MAX,l:d=>({v:d[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),M:void 0}),h:(d,h,u)=>n("pre",{key:u.k},n("code",$t({},d.O,{className:d.M?`lang-${d.M}`:""}),d.v))},codeFenced:{t:it(ml),i:ae.MAX,l:d=>({O:a(d[3]||""),v:d[4],M:d[2]||void 0,type:"codeBlock"})},codeInline:{t:vt(Vg),i:ae.LOW,l:d=>({v:d[2]}),h:(d,h,u)=>n("code",{key:u.k},d.v)},footnote:{t:it(Ug),i:ae.MAX,l:d=>(s.push({I:d[2],j:d[1]}),{}),h:to},footnoteReference:{t:bt(Gg),i:ae.HIGH,l:d=>({v:d[1],B:`#${t.slugify(d[1])}`}),h:(d,h,u)=>n("a",{key:u.k,href:Wt(d.B)},n("sup",{key:u.k},d.v))},gfmTask:{t:bt(Wg),i:ae.HIGH,l:d=>({R:d[1].toLowerCase()==="x"}),h:(d,h,u)=>n("input",{checked:d.R,key:u.k,readOnly:!0,type:"checkbox"})},heading:{t:it(t.enforceAtxHeadings?bl:gl),i:ae.HIGH,l:(d,h,u)=>({v:dn(h,d[2],u),T:t.slugify(d[2]),C:d[1].length}),h:(d,h,u)=>n(`h${d.C}`,{id:d.T,key:u.k},h(d.v,u))},headingSetext:{t:it(vl),i:ae.MAX,l:(d,h,u)=>({v:dn(h,d[1],u),C:d[2]==="="?1:2,type:"heading"})},htmlComment:{t:xr(yl),i:ae.HIGH,l:()=>({}),h:to},image:{t:vt(Sb),i:ae.HIGH,l:d=>({D:d[1],B:Ns(d[2]),F:d[3]}),h:(d,h,u)=>n("img",{key:u.k,alt:d.D||void 0,title:d.F||void 0,src:Wt(d.B)})},link:{t:bt(Tb),i:ae.LOW,l:(d,h,u)=>({v:$b(h,d[1],u),B:Ns(d[2]),F:d[3]}),h:(d,h,u)=>n("a",{key:u.k,href:Wt(d.B),title:d.F},h(d.v,u))},linkAngleBraceStyleDetector:{t:bt(Qg),i:ae.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],type:"link"})},linkBareUrlDetector:{t:(d,h)=>h.N?null:bt(Jg)(d,h),i:ae.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],F:void 0,type:"link"})},linkMailtoDetector:{t:bt(Zg),i:ae.MAX,l(d){let h=d[1],u=d[1];return Dg.test(u)||(u="mailto:"+u),{v:[{v:h.replace("mailto:",""),type:"text"}],B:u,type:"link"}}},orderedList:xs(n,1),unorderedList:xs(n,2),newlineCoalescer:{t:it(zg),i:ae.LOW,l:eo,h:()=>`
`},paragraph:{t:Pb,i:ae.LOW,l:Qn,h:(d,h,u)=>n("p",{key:u.k},h(d.v,u))},ref:{t:bt(tb),i:ae.MAX,l:d=>(c[d[1]]={B:d[2],F:d[4]},{}),h:to},refImage:{t:vt(rb),i:ae.MAX,l:d=>({D:d[1]||void 0,P:d[2]}),h:(d,h,u)=>n("img",{key:u.k,alt:d.D,src:Wt(c[d.P].B),title:c[d.P].F})},refLink:{t:bt(nb),i:ae.MAX,l:(d,h,u)=>({v:h(d[1],u),Z:h(d[0].replace(ob,"\\$1"),u),P:d[2]}),h:(d,h,u)=>c[d.P]?n("a",{key:u.k,href:Wt(c[d.P].B),title:c[d.P].F},h(d.v,u)):n("span",{key:u.k},h(d.Z,u))},table:{t:it(wl),i:ae.HIGH,l:Rb,h:(d,h,u)=>n("table",{key:u.k},n("thead",null,n("tr",null,d.L.map(function(b,x){return n("th",{key:x,style:Es(d,x)},h(b,u))}))),n("tbody",null,d.A.map(function(b,x){return n("tr",{key:x},b.map(function(R,w){return n("td",{key:w,style:Es(d,w)},h(R,u))}))})))},tableSeparator:{t:function(d,h){return h.$?(h._=!0,ib.exec(d)):null},i:ae.HIGH,l:function(){return{type:"tableSeparator"}},h:()=>" | "},text:{t:xr(vb),i:ae.MIN,l:d=>({v:d[0].replace(Xg,(h,u)=>t.namedCodesToUnicode[u]?t.namedCodesToUnicode[u]:h)}),h:d=>d.v},textBolded:{t:vt(fb),i:ae.MED,l:(d,h,u)=>({v:h(d[2],u)}),h:(d,h,u)=>n("strong",{key:u.k},h(d.v,u))},textEmphasized:{t:vt(mb),i:ae.LOW,l:(d,h,u)=>({v:h(d[2],u)}),h:(d,h,u)=>n("em",{key:u.k},h(d.v,u))},textEscaped:{t:vt(bb),i:ae.HIGH,l:d=>({v:d[1],type:"text"})},textMarked:{t:vt(hb),i:ae.LOW,l:Qn,h:(d,h,u)=>n("mark",{key:u.k},h(d.v,u))},textStrikethroughed:{t:vt(gb),i:ae.LOW,l:Qn,h:(d,h,u)=>n("del",{key:u.k},h(d.v,u))}};t.disableParsingRawHTML!==!0&&(p.htmlBlock={t:xr(yo),i:ae.HIGH,l(d,h,u){const[,b]=d[3].match(wb),x=new RegExp(`^${b}`,"gm"),R=d[3].replace(x,""),w=(k=R,Cb.some(M=>M.test(k))?_b:dn);var k;const y=d[1].toLowerCase(),S=Mg.indexOf(y)!==-1;u.N=u.N||y==="a";const C=S?d[3]:w(h,R,u);return u.N=!1,{O:a(d[2]),v:C,G:S,H:S?y:d[1]}},h:(d,h,u)=>n(d.H,$t({key:u.k},d.O),d.G?d.v:h(d.v,u))},p.htmlSelfClosing={t:xr(wo),i:ae.HIGH,l:d=>({O:a(d[2]||""),H:d[1]}),h:(d,h,u)=>n(d.H,$t({},d.O,{key:u.k}))});const f=function(d){let h=Object.keys(d);function u(b,x){let R=[],w="";for(;b;){let k=0;for(;k<h.length;){const y=h[k],S=d[y],C=S.t(b,x,w);if(C){const M=C[0];b=b.substring(M.length);const A=S.l(C,u,x);A.type==null&&(A.type=y),R.push(A),w=M;break}k++}}return R}return h.sort(function(b,x){let R=d[b].i,w=d[x].i;return R!==w?R-w:b<x?-1:1}),function(b,x){return u(function(R){return R.replace(Hg,`
`).replace(qg,"").replace(sb,"    ")}(b),x)}}(p),m=(v=function(d){return function(h,u,b){return d[h.type].h(h,u,b)}}(p),function d(h,u={}){if(Array.isArray(h)){const b=u.k,x=[];let R=!1;for(let w=0;w<h.length;w++){u.k=w;const k=d(h[w],u),y=typeof k=="string";y&&R?x[x.length-1]+=k:k!==null&&x.push(k),R=y}return u.k=b,x}return v(h,d,u)});var v;const g=o(e);return s.length?n("div",null,g,n("footer",{key:"footer"},s.map(function(d){return n("div",{id:t.slugify(d.j),key:d.j},d.j,m(f(d.I,{_:!0})))}))):g}(function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"})(ae||(ae={}));const Db=e=>{let{children:t,options:r}=e,n=function(o,a){if(o==null)return{};var s,c,p={},f=Object.keys(o);for(c=0;c<f.length;c++)a.indexOf(s=f[c])>=0||(p[s]=o[s]);return p}(e,_g);return T.cloneElement(Ib(t,r),n)};function Ab({id:e,markdown:t}){return l.jsx("div",{id:e,className:"pr-prose",children:l.jsx(Db,{children:t})})}const $l=E.forwardRef((e,t)=>l.jsxs(be,{ref:t,className:"pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600",...e,children:[l.jsx(ne.Filter,{size:16,className:"pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"}),"Filter",l.jsx(ne.ChevronDown,{size:16,className:"pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"})]}));var _l=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(_l||{});function Bb({id:e,groups:t}){return l.jsx("div",{id:e,children:l.jsxs(xn,{children:[l.jsx(To,{asChild:!0,children:l.jsx($l,{})}),l.jsx(Fr,{children:t.map(r=>l.jsxs("div",{children:[l.jsx(ir,{children:r.label}),l.jsx(Ms,{children:r.items.map(n=>l.jsx("div",{children:n.itemType===0?l.jsx(kn,{onClick:n.onClick,children:n.label}):l.jsx(Co,{onClick:n.onClick,value:n.label,children:n.label})},n.label))}),l.jsx(Vr,{})]},r.label))})]})})}function Lb({id:e,message:t}){return l.jsx("div",{id:e,className:"pr-mb-20 pr-mt-20 pr-flex pr-items-center pr-justify-center",children:l.jsx("div",{className:"pr-w-3/4 pr-rounded-lg pr-bg-gray-100 pr-p-8 pr-text-center",children:l.jsx("p",{className:"pr-text-lg pr-text-gray-800",children:t})})})}function Fb({id:e,category:t,downloads:r,languages:n,moreInfoUrl:o}){const a=new Ue.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((c,p)=>c+p,0)),s=()=>{window.scrollTo(0,document.body.scrollHeight)};return l.jsxs("div",{id:e,className:"pr-flex pr-flex-wrap pr-items-start pr-space-x-4 pr-border-b pr-border-t pr-bg-white pr-pb-4 pr-pt-4",children:[l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsx("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:l.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:t})}),l.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"CATEGORY"})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsxs("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:[l.jsx(ne.User,{className:"pr-mr-1 pr-h-4 pr-w-4"}),l.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:a})]}),l.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"USERS"})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsx("div",{className:"pr-flex pr-items-center",children:n.slice(0,3).map(c=>l.jsx("span",{className:"pr-ml-1 pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1 pr-text-xs pr-font-semibold pr-text-gray-700",children:c.toUpperCase()},c))}),n.length>3&&l.jsxs("button",{type:"button",onClick:()=>s(),className:"pr-text-xs pr-text-gray-500 pr-underline",children:["+",n.length-3," more languages"]})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-ml-auto pr-flex pr-flex-col pr-space-y-2",children:[l.jsxs("a",{href:o,target:"_blank",rel:"noreferrer",className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Website",l.jsx(ne.Link,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]}),l.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Support",l.jsx(ne.CircleHelp,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]})]})]})}function Ml({id:e,versionHistory:t}){const[r,n]=E.useState(!1),o=new Date;function a(c){const p=new Date(c),f=new Date(o.getTime()-p.getTime()),m=f.getUTCFullYear()-1970,v=f.getUTCMonth(),g=f.getUTCDate()-1;let d="";return m>0?d=`${m.toString()} year${m===1?"":"s"} ago`:v>0?d=`${v.toString()} month${v===1?"":"s"} ago`:g===0?d="today":d=`${g.toString()} day${g===1?"":"s"} ago`,d}const s=Object.entries(t).sort((c,p)=>p[0].localeCompare(c[0]));return l.jsxs("div",{id:e,children:[l.jsx("h3",{className:"pr-text-md pr-font-semibold",children:"What`s New"}),l.jsx("ul",{className:"pr-list-disc pr-pl-5 pr-pr-4 pr-text-xs pr-text-gray-600",children:(r?s:s.slice(0,5)).map(c=>l.jsxs("div",{className:"pr-mt-3 pr-flex pr-justify-between",children:[l.jsx("div",{className:"pr-text-gray-600",children:l.jsx("li",{className:"pr-prose pr-text-xs",children:l.jsx("span",{children:c[1].description})})}),l.jsxs("div",{className:"pr-justify-end pr-text-right",children:[l.jsxs("div",{children:["Version ",c[0]]}),l.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),s.length>5&&l.jsx("button",{type:"button",onClick:()=>n(!r),className:"pr-text-xs pr-text-gray-500 pr-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Vb({id:e,publisherDisplayName:t,fileSize:r,locales:n,versionHistory:o}){const a=E.useMemo(()=>Ue.formatBytes(r),[r]),c=(p=>{const f=new Intl.DisplayNames(navigator.language,{type:"language"});return p.map(m=>f.of(m))})(n);return l.jsx("div",{id:e,className:"pr-border-t pr-pb-4 pr-pt-4",children:l.jsxs("div",{className:"pr-md:flex-row pr-md:space-x-8 pr-flex pr-flex-col pr-space-x-0",children:[l.jsx(Ml,{versionHistory:o}),l.jsx("div",{className:"pr-md:border-t-0 pr-md:border-l pr-md-h-auto pr-md-ml-8 pr-mt-4 pr-border-t pr-border-gray-300"}),l.jsxs("div",{className:"pr-md:mt-0 pr-mt-4 pr-flex-1 pr-space-y-3",children:[l.jsx("h2",{className:"pr-text-md pr-font-semibold",children:"Information"}),l.jsxs("div",{className:"pr-flex pr-items-start pr-justify-between pr-pr-4 pr-text-xs pr-text-gray-600",children:[l.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[l.jsx("span",{className:"pr-mb-2",children:"Publisher"}),l.jsx("span",{className:"pr-font-semibold",children:t}),l.jsx("span",{className:"pr-mb-2 pr-mt-4",children:"Size"}),l.jsx("span",{className:"pr-font-semibold",children:a})]}),l.jsx("div",{className:"pr-flex pr-w-3/4 pr-items-center pr-justify-between pr-text-xs pr-text-gray-600",children:l.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[l.jsx("span",{className:"pr-mb-2",children:"Languages"}),l.jsx("span",{className:"pr-font-semibold",children:c.join(", ")})]})})]})]})]})})}const zb=(e,t)=>{E.useEffect(()=>{if(!e)return()=>{};const r=e(t);return()=>{r()}},[e,t])},no=()=>!1,Hb=(e,t)=>{const[r]=wn(E.useCallback(async()=>{if(!e)return no;const n=await Promise.resolve(e(t));return async()=>n()},[t,e]),no,{preserveValue:!1});E.useEffect(()=>()=>{r!==no&&r()},[r])},Il=E.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:F("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));Il.displayName="Card";const Dl=E.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:F("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));Dl.displayName="CardHeader";const Al=E.forwardRef(({className:e,...t},r)=>l.jsx("h3",{ref:r,className:F("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));Al.displayName="CardTitle";const Bl=E.forwardRef(({className:e,...t},r)=>l.jsx("p",{ref:r,className:F("pr-text-sm pr-text-muted-foreground",e),...t}));Bl.displayName="CardDescription";const Ll=E.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:F("pr-p-6 pr-pt-0",e),...t}));Ll.displayName="CardContent";const Fl=E.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:F("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));Fl.displayName="CardFooter";const Ub=xo.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),Vl=E.forwardRef(({className:e,variant:t,...r},n)=>l.jsx("div",{ref:n,role:"alert",className:F(Ub({variant:t}),e),...r}));Vl.displayName="Alert";const zl=E.forwardRef(({className:e,...t},r)=>l.jsxs("h5",{ref:r,className:F("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));zl.displayName="AlertTitle";const Hl=E.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:F("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));Hl.displayName="AlertDescription";const Ul=E.forwardRef(({className:e,...t},r)=>l.jsxs(Er.Root,{ref:r,className:F("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[l.jsx(Er.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:l.jsx(Er.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),l.jsx(Er.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));Ul.displayName=Er.Root.displayName;const Gl=E.forwardRef(({className:e,...t},r)=>l.jsx(ao.Root,{className:F("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:r,children:l.jsx(ao.Thumb,{className:F("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));Gl.displayName=ao.Root.displayName;exports.Alert=Vl;exports.AlertDescription=Hl;exports.AlertTitle=zl;exports.BookChapterControl=zc;exports.Button=be;exports.Card=Il;exports.CardContent=Ll;exports.CardDescription=Bl;exports.CardFooter=Fl;exports.CardHeader=Dl;exports.CardTitle=Al;exports.ChapterRangeSelector=cp;exports.Checkbox=Zs;exports.Checklist=pp;exports.ComboBox=so;exports.ContextMenu=ig;exports.DataTable=Us;exports.DisableButton=Pg;exports.DropdownMenu=xn;exports.DropdownMenuCheckboxItem=kn;exports.DropdownMenuContent=Fr;exports.DropdownMenuGroup=Ms;exports.DropdownMenuItem=So;exports.DropdownMenuItemType=_l;exports.DropdownMenuLabel=ir;exports.DropdownMenuPortal=Oc;exports.DropdownMenuRadioGroup=Pc;exports.DropdownMenuRadioItem=Co;exports.DropdownMenuSeparator=Vr;exports.DropdownMenuShortcut=As;exports.DropdownMenuSub=Rc;exports.DropdownMenuSubContent=Ds;exports.DropdownMenuSubTrigger=Is;exports.DropdownMenuTrigger=To;exports.EnableButton=Rg;exports.FilterButton=$l;exports.FilterDropdown=Bb;exports.Footer=Vb;exports.GridMenu=Xi;exports.HamburgerMenuButton=sl;exports.INVENTORY_STRING_KEYS=Wc;exports.IconButton=pg;exports.Input=ar;exports.InstallButton=Og;exports.Inventory=Kc;exports.Label=ra;exports.LabelPosition=Rt;exports.MarkdownRenderer=Ab;exports.MenuItem=Ko;exports.MoreInfo=Fb;exports.NavigationContentSearch=wg;exports.NoExtensionsFound=Lb;exports.ScriptureResultsViewer=bg;exports.SearchBar=ll;exports.Select=_r;exports.SelectContent=Jt;exports.SelectGroup=Ls;exports.SelectItem=Ke;exports.SelectLabel=Fs;exports.SelectScrollDownButton=Oo;exports.SelectScrollUpButton=jo;exports.SelectSeparator=Vs;exports.SelectTrigger=Kt;exports.SelectValue=Mr;exports.Separator=ta;exports.SettingsList=xg;exports.SettingsListHeader=Eg;exports.SettingsListItem=kg;exports.ShadCnSlider=Ul;exports.ShadCnSwitch=Gl;exports.Slider=vg;exports.Snackbar=yg;exports.Spinner=cr;exports.Switch=Ng;exports.Table=zr;exports.TableBody=Ur;exports.TableCaption=Hs;exports.TableCell=It;exports.TableFooter=zs;exports.TableHead=Zt;exports.TableHeader=Hr;exports.TableRow=lt;exports.Tabs=jg;exports.TabsContent=ul;exports.TabsList=pl;exports.TabsTrigger=dl;exports.TextField=Sg;exports.Toolbar=Cg;exports.UpdateButton=$g;exports.VersionHistory=Ml;exports.VerticalTabs=Zo;exports.VerticalTabsContent=ea;exports.VerticalTabsList=Qo;exports.VerticalTabsTrigger=cl;exports.buttonVariants=Bs;exports.getSortingIcon=En;exports.inventoryCountColumn=Zc;exports.inventoryItemColumn=Jc;exports.inventoryStatusColumn=Qc;exports.useEvent=zb;exports.useEventAsync=Hb;exports.usePromise=wn;function Gb(e,t="top"){if(!e||typeof document>"u")return;const r=document.head||document.querySelector("head"),n=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&n?r.insertBefore(o,n):r.appendChild(o)}Gb(`/*
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
.pr-mt-1 {
  margin-top: 0.25rem;
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
