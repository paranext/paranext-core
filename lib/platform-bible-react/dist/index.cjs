"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=require("react/jsx-runtime"),E=require("react"),re=require("lucide-react"),Se=require("clsx"),tc=require("tailwind-merge"),xs=require("@radix-ui/react-dropdown-menu"),He=require("platform-bible-utils"),Ce=require("@tanstack/react-table"),nc=require("@radix-ui/react-slot"),xo=require("class-variance-authority"),rc=require("@radix-ui/react-select"),Ee=require("@mui/material"),oc=require("@radix-ui/react-popover"),Ie=require("cmdk"),ac=require("@radix-ui/react-dialog"),oo=require("@mui/styled-engine"),kn=require("react-dom"),sc=require("@radix-ui/react-label"),ic=require("@radix-ui/react-tabs"),lc=require("@radix-ui/react-slider"),cc=require("@radix-ui/react-switch");function nt(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const T=nt(E),he=nt(xs),we=nt(rc),$n=nt(oc),Qe=nt(ac),pc=nt(kn),ks=nt(sc),De=nt(ic),En=nt(lc),ao=nt(cc);const dc=tc.extendTailwindMerge({prefix:"pr-"});function F(...e){return dc(Se.clsx(e))}const Vn=E.forwardRef(({className:e,type:t,...n},r)=>l.jsx("input",{type:t,className:F("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));Vn.displayName="Input";const uc=E.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},a)=>l.jsxs("div",{className:"pr-relative",children:[l.jsx(Vn,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r(),t(s)},onClick:n,ref:a}),l.jsx(re.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));var fc=Object.defineProperty,mc=(e,t,n)=>t in e?fc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,oe=(e,t,n)=>mc(e,typeof t!="symbol"?t+"":t,n);const Mt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],ko=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Es=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],ha=Nc();function an(e,t=!0){return t&&(e=e.toUpperCase()),e in ha?ha[e]:0}function Eo(e){return an(e)>0}function hc(e){const t=typeof e=="string"?an(e):e;return t>=40&&t<=66}function gc(e){return(typeof e=="string"?an(e):e)<=39}function Ns(e){return e<=66}function bc(e){const t=typeof e=="string"?an(e):e;return Cs(t)&&!Ns(t)}function*vc(){for(let e=1;e<=Mt.length;e++)yield e}const yc=1,Ts=Mt.length;function wc(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function No(e,t="***"){const n=e-1;return n<0||n>=Mt.length?t:Mt[n]}function Ss(e){return e<=0||e>Ts?"******":Es[e-1]}function xc(e){return Ss(an(e))}function Cs(e){const t=typeof e=="number"?No(e):e;return Eo(t)&&!ko.includes(t)}function kc(e){const t=typeof e=="number"?No(e):e;return Eo(t)&&ko.includes(t)}function Ec(e){return Es[e-1].includes("*obsolete*")}function Nc(){const e={};for(let t=0;t<Mt.length;t++)e[Mt[t]]=t+1;return e}const fe={allBookIds:Mt,nonCanonicalIds:ko,bookIdToNumber:an,isBookIdValid:Eo,isBookNT:hc,isBookOT:gc,isBookOTNT:Ns,isBookDC:bc,allBookNumbers:vc,firstBook:yc,lastBook:Ts,extraBooks:wc,bookNumberToId:No,bookNumberToEnglishName:Ss,bookIdToEnglishName:xc,isCanonical:Cs,isExtraMaterial:kc,isObsolete:Ec};var Je=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Je||{});const Le=class{constructor(t){if(oe(this,"name"),oe(this,"fullPath"),oe(this,"isPresent"),oe(this,"hasVerseSegments"),oe(this,"isCustomized"),oe(this,"baseVersification"),oe(this,"scriptureBooks"),oe(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Je[t]):(this._type=t,this.name=Je[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};oe(Le,"Original",new Le(Je.Original)),oe(Le,"Septuagint",new Le(Je.Septuagint)),oe(Le,"Vulgate",new Le(Je.Vulgate)),oe(Le,"English",new Le(Je.English)),oe(Le,"RussianProtestant",new Le(Je.RussianProtestant)),oe(Le,"RussianOrthodox",new Le(Je.RussianOrthodox));let St=Le;function ga(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var Os=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Os||{});const $e=class le{constructor(t,n,r,o){if(oe(this,"firstChapter"),oe(this,"lastChapter"),oe(this,"lastVerse"),oe(this,"hasSegmentsDefined"),oe(this,"text"),oe(this,"BBBCCCVVVS"),oe(this,"longHashCode"),oe(this,"versification"),oe(this,"rtlMark","‏"),oe(this,"_bookNum",0),oe(this,"_chapterNum",0),oe(this,"_verseNum",0),oe(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const a=t,s=n!=null&&n instanceof St?n:void 0;this.setEmpty(s),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=n!=null&&n instanceof St?n:void 0;this.setEmpty(a),this._verseNum=t%le.chapterDigitShifter,this._chapterNum=Math.floor(t%le.bookDigitShifter/le.chapterDigitShifter),this._bookNum=Math.floor(t/le.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof le){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof St?t:le.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??le.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new le(t),{success:!0,verseRef:n}}catch(r){if(r instanceof hn)return n=new le,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%le.bcvMaxValue*le.bookDigitShifter+(n>=0?n%le.bcvMaxValue*le.chapterDigitShifter:0)+(r>=0?r%le.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:a,versificationStr:s}=t,c=a||o.toString();let p;return s&&(p=new St(s)),n?new le(n,r.toString(),c,p):new le}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>le.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(le.verseRangeSeparator)||this._verse.includes(le.verseSequenceIndicator))}get book(){return fe.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=fe.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=le.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=le.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>fe.lastBook)throw new hn("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new St(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(le.verseRangeSeparators,le.verseSequenceIndicators)}get BBBCCC(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const s=+a[1].trim();this.versification=new St(Je[s])}catch{throw new hn("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new hn("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||fe.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!le.isVerseParseable(r[1]))throw new hn("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new le(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete n.verse,n}equals(t){return t instanceof le?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=le.verseRangeSeparators,r=le.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=ga(this._verse,r);for(const s of a.map(c=>ga(c,n))){const c=this.clone();c.verse=s[0];const p=c.verseNum;if(o.push(c),s.length>1){const f=this.clone();if(f.verse=s[1],!t)for(let m=p+1;m<f.verseNum;m++){const v=new le(this._bookNum,this._chapterNum,m,this.versification);this.isExcluded||o.push(v)}o.push(f)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const a=o.internalValid;if(a!==0)return a;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>fe.lastBook?2:(fe.isCanonical(this._bookNum),0)}setEmpty(t=le.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=fe.bookIdToNumber(t),this.chapter=n,this.verse=r}};oe($e,"defaultVersification",St.English),oe($e,"verseRangeSeparator","-"),oe($e,"verseSequenceIndicator",","),oe($e,"verseRangeSeparators",[$e.verseRangeSeparator]),oe($e,"verseSequenceIndicators",[$e.verseSequenceIndicator]),oe($e,"chapterDigitShifter",1e3),oe($e,"bookDigitShifter",$e.chapterDigitShifter*$e.chapterDigitShifter),oe($e,"bcvMaxValue",$e.chapterDigitShifter-1),oe($e,"ValidStatusType",Os);let hn=class extends Error{};const xr=he.Root,To=he.Trigger,js=he.Group,Tc=he.Portal,Sc=he.Sub,Cc=he.RadioGroup,Rs=E.forwardRef(({className:e,inset:t,children:n,...r},o)=>l.jsxs(he.SubTrigger,{ref:o,className:F("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,l.jsx(re.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Rs.displayName=he.SubTrigger.displayName;const Ps=E.forwardRef(({className:e,...t},n)=>l.jsx(he.SubContent,{ref:n,className:F("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));Ps.displayName=he.SubContent.displayName;const Fn=E.forwardRef(({className:e,sideOffset:t=4,...n},r)=>l.jsx(he.Portal,{children:l.jsx(he.Content,{ref:r,sideOffset:t,className:F("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));Fn.displayName=he.Content.displayName;const So=E.forwardRef(({className:e,inset:t,...n},r)=>l.jsx(he.Item,{ref:r,className:F("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));So.displayName=he.Item.displayName;const kr=E.forwardRef(({className:e,children:t,checked:n,...r},o)=>l.jsxs(he.CheckboxItem,{ref:o,className:F("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(he.ItemIndicator,{children:l.jsx(re.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));kr.displayName=he.CheckboxItem.displayName;const Co=E.forwardRef(({className:e,children:t,...n},r)=>l.jsxs(he.RadioItem,{ref:r,className:F("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(he.ItemIndicator,{children:l.jsx(re.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));Co.displayName=he.RadioItem.displayName;const sn=E.forwardRef(({className:e,inset:t,...n},r)=>l.jsx(he.Label,{ref:r,className:F("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));sn.displayName=he.Label.displayName;const zn=E.forwardRef(({className:e,...t},n)=>l.jsx(he.Separator,{ref:n,className:F("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));zn.displayName=he.Separator.displayName;function $s({className:e,...t}){return l.jsx("span",{className:F("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}$s.displayName="DropdownMenuShortcut";const Oc=E.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:a,children:s},c)=>l.jsxs(So,{ref:c,textValue:e,className:F("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:p=>{p.preventDefault(),t()},onKeyDown:p=>{o(p)},onFocus:r,onMouseMove:r,children:[l.jsx("span",{className:F("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":a.toLowerCase()==="ot","pr-border-l-purple-200":a.toLowerCase()==="nt","pr-border-l-indigo-200":a.toLowerCase()==="dc"}),children:fe.bookIdToEnglishName(e)}),n&&l.jsx("div",{children:s})]},e));function jc({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const a=Array.from({length:t},(c,p)=>p+1),s=E.useCallback(c=>{o(c)},[o]);return l.jsx("div",{className:F("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:a.map(c=>l.jsx("div",{className:F("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":c===n,"pr-bg-amber-200":c===r}),onClick:p=>{p.preventDefault(),p.stopPropagation(),e(c)},role:"button",onKeyDown:p=>{p.key==="Enter"&&e(c)},tabIndex:0,onMouseMove:()=>s(c),children:c},c))})}function Rc({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return l.jsxs(sn,{className:"pr-flex pr-justify-between",children:[l.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),l.jsxs("div",{className:"pr-flex pr-items-center",children:[l.jsx(re.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),l.jsx(re.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),l.jsx(re.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const Cn=fe.allBookIds,Pc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ba=["OT","NT","DC"],$c=32+32+32,_c=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Mc=e=>({OT:Cn.filter(n=>fe.isBookOT(n)),NT:Cn.filter(n=>fe.isBookNT(n)),DC:Cn.filter(n=>fe.isBookDC(n))})[e],gn=e=>He.getChaptersForBook(fe.bookIdToNumber(e));function Ic(){return Cn.map(t=>fe.bookIdToEnglishName(t))}function Dc(e){return Ic().includes(e)}function Ac(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(Dc(t))return Cn.find(r=>fe.bookIdToEnglishName(r)===t)}function Bc({scrRef:e,handleSubmit:t}){const[n,r]=E.useState(""),[o,a]=E.useState(fe.bookNumberToId(e.bookNum)),[s,c]=E.useState(e.chapterNum??0),[p,f]=E.useState(fe.bookNumberToId(e.bookNum)),[m,v]=E.useState(!1),[g,d]=E.useState(m),h=E.useRef(void 0),u=E.useRef(void 0),b=E.useRef(void 0),x=E.useCallback($=>Mc($).filter(N=>{const O=fe.bookIdToEnglishName(N).toLowerCase(),_=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return O.includes(_)||N.toLowerCase().includes(_)}),[n]),R=$=>{r($)},w=E.useRef(!1),k=E.useCallback($=>{if(w.current){w.current=!1;return}v($)},[]),y=E.useCallback(($,N,O,_)=>{if(c(fe.bookNumberToId(e.bookNum)!==$?1:e.chapterNum),N||gn($)===-1){t({bookNum:fe.bookIdToNumber($),chapterNum:O||1,verseNum:_||1}),v(!1),r("");return}a(o!==$?$:""),v(!N)},[t,e.bookNum,e.chapterNum,o]),S=$=>{$<=0||$>gn(o)||y(o,!0,$)},C=E.useCallback(()=>{_c.forEach($=>{const N=n.match($);if(N){const[O,_=void 0,U=void 0]=N.slice(1),B=Ac(O);(fe.isBookIdValid(O)||B)&&y(B??O,!0,_?parseInt(_,10):1,U?parseInt(U,10):1)}})},[y,n]),M=E.useCallback($=>{m?($.key==="ArrowDown"||$.key==="ArrowUp")&&(typeof b<"u"&&b.current!==null?b.current.focus():typeof u<"u"&&u.current!==null&&u.current.focus(),$.preventDefault()):v(!0)},[m]),A=$=>{const{key:N}=$;N==="ArrowRight"||N==="ArrowLeft"||N==="ArrowDown"||N==="ArrowUp"||N==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:N})),h.current.focus())},z=$=>{const{key:N}=$;if(p===o){if(N==="Enter"){$.preventDefault(),y(o,!0,s);return}let O=0;if(N==="ArrowRight")if(s<gn(p))O=1;else{$.preventDefault();return}else if(N==="ArrowLeft")if(s>1)O=-1;else{$.preventDefault();return}else N==="ArrowDown"?O=6:N==="ArrowUp"&&(O=-6);s+O<=0||s+O>gn(p)?c(0):O!==0&&(c(s+O),$.preventDefault())}};return E.useEffect(()=>{o===p?o===fe.bookNumberToId(e.bookNum)?c(e.chapterNum):c(1):c(0)},[p,e.bookNum,e.chapterNum,o]),E.useLayoutEffect(()=>{d(m)},[m]),E.useLayoutEffect(()=>{const $=setTimeout(()=>{if(g&&u.current&&b.current){const O=b.current.offsetTop-$c;u.current.scrollTo({top:O,behavior:"instant"})}},10);return()=>{clearTimeout($)}},[g]),l.jsx("div",{className:"pr-flex",children:l.jsxs(xr,{modal:!1,open:m,onOpenChange:k,children:[l.jsx(To,{asChild:!0,children:l.jsx(uc,{ref:h,value:n,handleSearch:R,handleKeyDown:M,handleOnClick:()=>{a(fe.bookNumberToId(e.bookNum)),f(fe.bookNumberToId(e.bookNum)),c(e.chapterNum>0?e.chapterNum:0),v(!0),h.current.focus()},onFocus:()=>{w.current=!0},handleSubmit:C,placeholder:`${fe.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),l.jsxs(Fn,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:A,align:"start",ref:u,children:[l.jsx(Rc,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),ba.map(($,N)=>x($).length>0&&l.jsxs("div",{children:[l.jsx(sn,{className:"pr-font-semibold pr-text-slate-700",children:Pc[$]}),x($).map(O=>l.jsx("div",{children:l.jsx(Oc,{bookId:O,handleSelectBook:()=>y(O,!1),isSelected:o===O,handleHighlightBook:()=>f(O),handleKeyDown:z,bookType:$,ref:_=>{o===O&&(b.current=_)},children:l.jsx(jc,{handleSelectChapter:S,endChapter:gn(O),activeChapter:e.bookNum===fe.bookIdToNumber(O)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:_=>{c(_)}})})},O)),ba.length-1!==N?l.jsx(zn,{}):void 0]},$))]})]})})}const _s=xo.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),be=E.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},a)=>{const s=r?nc.Slot:"button";return l.jsx(s,{className:F(_s({variant:t,size:n,className:e})),ref:a,...o})});be.displayName="Button";function Lc({table:e}){return l.jsxs(xr,{children:[l.jsx(xs.DropdownMenuTrigger,{asChild:!0,children:l.jsxs(be,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[l.jsx(re.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),l.jsxs(Fn,{align:"end",className:"pr-w-[150px]",children:[l.jsx(sn,{children:"Toggle columns"}),l.jsx(zn,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>l.jsx(kr,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}const _n=we.Root,Ms=we.Group,Mn=we.Value,Kt=E.forwardRef(({className:e,children:t,...n},r)=>l.jsxs(we.Trigger,{ref:r,className:F("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...n,children:[t,l.jsx(we.Icon,{asChild:!0,children:l.jsx(re.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));Kt.displayName=we.Trigger.displayName;const Oo=E.forwardRef(({className:e,...t},n)=>l.jsx(we.ScrollUpButton,{ref:n,className:F("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:l.jsx(re.ChevronUp,{className:"pr-h-4 pr-w-4"})}));Oo.displayName=we.ScrollUpButton.displayName;const jo=E.forwardRef(({className:e,...t},n)=>l.jsx(we.ScrollDownButton,{ref:n,className:F("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:l.jsx(re.ChevronDown,{className:"pr-h-4 pr-w-4"})}));jo.displayName=we.ScrollDownButton.displayName;const Jt=E.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>l.jsx(we.Portal,{children:l.jsxs(we.Content,{ref:o,className:F("pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:n,...r,children:[l.jsx(Oo,{}),l.jsx(we.Viewport,{className:F("pr-p-1",n==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),l.jsx(jo,{})]})}));Jt.displayName=we.Content.displayName;const Is=E.forwardRef(({className:e,...t},n)=>l.jsx(we.Label,{ref:n,className:F("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));Is.displayName=we.Label.displayName;const Ke=E.forwardRef(({className:e,children:t,...n},r)=>l.jsxs(we.Item,{ref:r,className:F("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(we.ItemIndicator,{children:l.jsx(re.Check,{className:"pr-h-4 pr-w-4"})})}),l.jsx(we.ItemText,{children:t})]}));Ke.displayName=we.Item.displayName;const Ds=E.forwardRef(({className:e,...t},n)=>l.jsx(we.Separator,{ref:n,className:F("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Ds.displayName=we.Separator.displayName;function Vc({table:e}){return l.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[l.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[l.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),l.jsxs(_n,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[l.jsx(Kt,{className:"pr-h-8 pr-w-[70px]",children:l.jsx(Mn,{placeholder:e.getState().pagination.pageSize})}),l.jsx(Jt,{side:"top",children:[10,20,30,40,50].map(t=>l.jsx(Ke,{value:`${t}`,children:t},t))})]})]}),l.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[l.jsxs(be,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),l.jsx(re.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(be,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),l.jsx(re.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(be,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),l.jsx(re.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(be,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),l.jsx(re.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}const Un=E.forwardRef(({className:e,stickyHeader:t,...n},r)=>l.jsx("div",{className:F("pr-twp pr-relative pr-w-full",{"pr-overflow-auto":!t}),children:l.jsx("table",{ref:r,className:F("pr-w-full pr-caption-bottom pr-text-sm",e),...n})}));Un.displayName="Table";const Hn=E.forwardRef(({className:e,stickyHeader:t,...n},r)=>l.jsx("thead",{ref:r,className:F({"pr-sticky pr-top-0 pr-bg-muted":t},"[&_tr]:pr-border-b",e),...n}));Hn.displayName="TableHeader";const Gn=E.forwardRef(({className:e,...t},n)=>l.jsx("tbody",{ref:n,className:F("[&_tr:last-child]:pr-border-0",e),...t}));Gn.displayName="TableBody";const As=E.forwardRef(({className:e,...t},n)=>l.jsx("tfoot",{ref:n,className:F("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));As.displayName="TableFooter";const lt=E.forwardRef(({className:e,...t},n)=>l.jsx("tr",{ref:n,className:F("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));lt.displayName="TableRow";const Zt=E.forwardRef(({className:e,...t},n)=>l.jsx("th",{ref:n,className:F("pr-h-12 pr-px-4 pr-text-start pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pe-0",e),...t}));Zt.displayName="TableHead";const It=E.forwardRef(({className:e,...t},n)=>l.jsx("td",{ref:n,className:F("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pe-0",e),...t}));It.displayName="TableCell";const Bs=E.forwardRef(({className:e,...t},n)=>l.jsx("caption",{ref:n,className:F("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));Bs.displayName="TableCaption";function Ls({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,stickyHeader:a=!1,onRowClickHandler:s=()=>{}}){var b;const[c,p]=E.useState([]),[f,m]=E.useState([]),[v,g]=E.useState({}),[d,h]=E.useState({}),u=Ce.useReactTable({data:t,columns:e,getCoreRowModel:Ce.getCoreRowModel(),...n&&{getPaginationRowModel:Ce.getPaginationRowModel()},onSortingChange:p,getSortedRowModel:Ce.getSortedRowModel(),onColumnFiltersChange:m,getFilteredRowModel:Ce.getFilteredRowModel(),onColumnVisibilityChange:g,onRowSelectionChange:h,state:{sorting:c,columnFilters:f,columnVisibility:v,rowSelection:d}});return l.jsxs("div",{className:"pr-twp pr-font-sans",children:[o&&l.jsx(Lc,{table:u}),l.jsxs(Un,{stickyHeader:a,children:[l.jsx(Hn,{stickyHeader:a,children:u.getHeaderGroups().map(x=>l.jsx(lt,{children:x.headers.map(R=>l.jsx(Zt,{children:R.isPlaceholder?void 0:Ce.flexRender(R.column.columnDef.header,R.getContext())},R.id))},x.id))}),l.jsx(Gn,{children:(b=u.getRowModel().rows)!=null&&b.length?u.getRowModel().rows.map(x=>l.jsx(lt,{onClick:()=>s(x,u),"data-state":x.getIsSelected()&&"selected",children:x.getVisibleCells().map(R=>l.jsx(It,{children:Ce.flexRender(R.column.columnDef.cell,R.getContext())},R.id))},x.id)):l.jsx(lt,{children:l.jsx(It,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]}),n&&l.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[l.jsx(be,{variant:"outline",size:"sm",onClick:()=>u.previousPage(),disabled:!u.getCanPreviousPage(),children:"Previous"}),l.jsx(be,{variant:"outline",size:"sm",onClick:()=>u.nextPage(),disabled:!u.getCanNextPage(),children:"Next"})]}),n&&r&&l.jsx(Vc,{table:u})]})}const Fc=e=>e.split(/(?=\n|\\(?:v|c|id))/g),va=e=>{const t=/^\\[vc]\s+(\d+)/,n=e.match(t);return n?+n[1]:0},ya=(e,t,n,r)=>{if(!e||e===""||t==="")return[];const o=[],a=Fc(e);let s=r.chapterNum,c=r.verseNum,p=0;return a.forEach(f=>{f.startsWith("\\id")&&(s=0,c=0),f.startsWith("\\c")&&(s=va(f),c=0),f.startsWith("\\v")&&(c=va(f),s===0&&(s=r.chapterNum));const m=n(f,t);for(let v=0;v<m.length;v++){const g={reference:{...r,chapterNum:+s,verseNum:+c},snippet:f,key:p};p+=1,o.push(g)}}),o};function zc({selectedItem:e,text:t,extractItems:n,scriptureReference:r,setScriptureReference:o,localizedStrings:a}){const s=a["%webView_inventory_occurrences_table_header_reference%"],c=a["%webView_inventory_occurrences_table_header_occurrence%"],[p,f]=E.useState(ya(t,e,n,r));return E.useEffect(()=>f(ya(t,e,n,r)),[t,e,r,n]),l.jsxs(Un,{stickyHeader:!0,children:[l.jsx(Hn,{stickyHeader:!0,children:l.jsxs(lt,{children:[l.jsx(Zt,{children:s}),l.jsx(Zt,{children:c})]})}),l.jsx(Gn,{children:p.map(m=>l.jsxs(lt,{onClick:()=>{o(m.reference)},children:[l.jsx(It,{children:`${fe.bookNumberToEnglishName(m.reference.bookNum)} ${m.reference.chapterNum}:${m.reference.verseNum}`}),l.jsx(It,{children:m.snippet})]},m.key))})]})}const Uc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_book%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),Er=e=>e==="asc"?l.jsx(re.ArrowUpIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}):e==="desc"?l.jsx(re.ArrowDownIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}):l.jsx(re.ArrowUpDownIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}),Hc=(e,t,n)=>{let r=e;return t!=="all"&&(r=r.filter(o=>t==="approved"&&o.status==="approved"||t==="unapproved"&&o.status==="unapproved"||t==="unknown"&&o.status==="unknown")),n!==""&&(r=r.filter(o=>o.item.includes(n))),r},Gc=(e,t,n)=>{const r=[],o=t(e);for(let a=0;a<o.length;a++){const s=o[a],c=r.find(p=>p.item===s);if(c)c.count+=1;else{const p={item:s,count:1,status:n(s)};r.push(p)}}return r},gt=(e,t)=>e[t]??t;function qc({scriptureReference:e,setScriptureReference:t,localizedStrings:n,extractItems:r,approvedItems:o,onApprovedItemsChange:a,unapprovedItems:s,onUnapprovedItemsChange:c,text:p,scope:f,onScopeChange:m,getColumns:v}){const g=gt(n,"%webView_inventory_all%"),d=gt(n,"%webView_inventory_approved%"),h=gt(n,"%webView_inventory_unapproved%"),u=gt(n,"%webView_inventory_unknown%"),b=gt(n,"%webView_inventory_scope_book%"),x=gt(n,"%webView_inventory_scope_chapter%"),R=gt(n,"%webView_inventory_scope_verse%"),w=gt(n,"%webView_inventory_filter_text%"),[k,y]=E.useState([]),[S,C]=E.useState("all"),[M,A]=E.useState(""),[z,$]=E.useState(""),N=E.useCallback((L,J)=>{y(I=>{let H=[];return L.forEach(K=>{H=I.map(G=>G.item===K&&G.status!==J?{...G,status:J}:G)}),H});let Z=[...o];L.forEach(I=>{J==="approved"?Z.includes(I)||Z.push(I):Z=Z.filter(H=>H!==I)}),a(Z);let j=[...s];L.forEach(I=>{J==="unapproved"?j.includes(I)||j.push(I):j=j.filter(H=>H!==I)}),c(j)},[o,a,s,c]),O=E.useCallback(L=>o.includes(L)?"approved":s.includes(L)?"unapproved":"unknown",[o,s]);E.useEffect(()=>{p&&y(Gc(p,r,O))},[r,p,O]);const _=E.useMemo(()=>Hc(k,S,M),[k,S,M]);E.useEffect(()=>{$("")},[_]);const U=(L,J)=>{J.toggleAllRowsSelected(!1),L.toggleSelected(void 0),$(L.getValue("item"))},B=E.useMemo(()=>v(N),[v,N]);return l.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-flex-col",children:[l.jsxs("div",{className:"pr-flex",children:[l.jsxs(_n,{onValueChange:L=>C(L),defaultValue:S,children:[l.jsx(Kt,{className:"pr-m-1",children:l.jsx(Mn,{placeholder:"Select filter"})}),l.jsxs(Jt,{className:"pr-font-sans",children:[l.jsx(Ke,{value:"all",children:g}),l.jsx(Ke,{value:"approved",children:d}),l.jsx(Ke,{value:"unapproved",children:h}),l.jsx(Ke,{value:"unknown",children:u})]})]}),l.jsxs(_n,{onValueChange:L=>m(L),defaultValue:f,children:[l.jsx(Kt,{className:"pr-m-1",children:l.jsx(Mn,{placeholder:"Select scope"})}),l.jsxs(Jt,{className:"pr-font-sans",children:[l.jsx(Ke,{value:"book",children:b}),l.jsx(Ke,{value:"chapter",children:x}),l.jsx(Ke,{value:"verse",children:R})]})]}),l.jsx(Vn,{className:"pr-m-1 pr-rounded-md pr-border",placeholder:w,value:M,onChange:L=>{A(L.target.value)}})]}),l.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:l.jsx(Ls,{columns:B,data:_,onRowClickHandler:U,stickyHeader:!0})}),z!==""&&l.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:l.jsx(zc,{selectedItem:z,text:p,extractItems:r,scriptureReference:e,setScriptureReference:L=>t(L),localizedStrings:n})})]})}const Wc=e=>({accessorKey:"item",header:({column:t})=>l.jsxs(be,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,Er(t.getIsSorted())]})}),Xc=e=>({accessorKey:"count",header:({column:t})=>l.jsxs(be,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,Er(t.getIsSorted())]})}),Yc=(e,t)=>({accessorKey:"status",header:({column:n,table:r})=>{const o=r.getSelectedRowModel().rows,a=[];return o.forEach(s=>{a.push(s.getValue("item"))}),l.jsxs("div",{children:[l.jsx("div",{className:"pr-flex pr-justify-center",children:l.jsxs(be,{className:"pr-mt-1",variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[e,Er(n.getIsSorted())]})}),l.jsxs("div",{className:"pr-flex pr-justify-center",children:[l.jsx(be,{className:"pr-m-1",children:l.jsx(re.CircleCheckIcon,{onClick:()=>{t(a,"approved")}})}),l.jsx(be,{className:"pr-m-1",children:l.jsx(re.CircleXIcon,{onClick:()=>{t(a,"unapproved")}})}),l.jsx(be,{className:"pr-m-1",children:l.jsx(re.CircleHelpIcon,{onClick:()=>{t(a,"unknown")}})})]})]})},cell:({row:n})=>{switch(n.getValue("status")){case"approved":return l.jsx(re.CircleCheckIcon,{});case"unapproved":return l.jsx(re.CircleXIcon,{});case"unknown":default:return l.jsx(re.CircleHelpIcon,{})}}}),Kc=$n.Root,Jc=$n.Trigger,Vs=E.forwardRef(({className:e,align:t="center",sideOffset:n=4,...r},o)=>l.jsx($n.Portal,{children:l.jsx($n.Content,{ref:o,align:t,sideOffset:n,className:F("pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r})}));Vs.displayName=$n.Content.displayName;const Zc=Qe.Portal,Fs=E.forwardRef(({className:e,...t},n)=>l.jsx(Qe.Overlay,{ref:n,className:F("pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",e),...t}));Fs.displayName=Qe.Overlay.displayName;const Qc=E.forwardRef(({className:e,children:t,...n},r)=>l.jsxs(Zc,{children:[l.jsx(Fs,{}),l.jsxs(Qe.Content,{ref:r,className:F("pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",e),...n,children:[t,l.jsxs(Qe.Close,{className:"pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground",children:[l.jsx(re.X,{className:"pr-h-4 pr-w-4"}),l.jsx("span",{className:"pr-sr-only",children:"Close"})]})]})]}));Qc.displayName=Qe.Content.displayName;const ep=E.forwardRef(({className:e,...t},n)=>l.jsx(Qe.Title,{ref:n,className:F("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight",e),...t}));ep.displayName=Qe.Title.displayName;const tp=E.forwardRef(({className:e,...t},n)=>l.jsx(Qe.Description,{ref:n,className:F("pr-text-sm pr-text-muted-foreground",e),...t}));tp.displayName=Qe.Description.displayName;const zs=E.forwardRef(({className:e,...t},n)=>l.jsx(Ie.Command,{ref:n,className:F("pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",e),...t}));zs.displayName=Ie.Command.displayName;const Us=E.forwardRef(({className:e,...t},n)=>l.jsxs("div",{className:"pr-flex pr-items-center pr-border-b pr-px-3",children:[l.jsx(re.Search,{className:"pr-me-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"}),l.jsx(Ie.Command.Input,{ref:n,className:F("pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...t})]}));Us.displayName=Ie.Command.Input.displayName;const Hs=E.forwardRef(({className:e,...t},n)=>l.jsx(Ie.Command.List,{ref:n,className:F("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden",e),...t}));Hs.displayName=Ie.Command.List.displayName;const Gs=E.forwardRef((e,t)=>l.jsx(Ie.Command.Empty,{ref:t,className:"pr-py-6 pr-text-center pr-text-sm",...e}));Gs.displayName=Ie.Command.Empty.displayName;const np=E.forwardRef(({className:e,...t},n)=>l.jsx(Ie.Command.Group,{ref:n,className:F("pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",e),...t}));np.displayName=Ie.Command.Group.displayName;const rp=E.forwardRef(({className:e,...t},n)=>l.jsx(Ie.Command.Separator,{ref:n,className:F("pr--mx-1 pr-h-px pr-bg-border",e),...t}));rp.displayName=Ie.Command.Separator.displayName;const qs=E.forwardRef(({className:e,...t},n)=>l.jsx(Ie.Command.Item,{ref:n,className:F("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",e),...t}));qs.displayName=Ie.Command.Item.displayName;function op(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function so({id:e,options:t=[],className:n,value:r,onChange:o=()=>{},getOptionLabel:a=op,buttonPlaceholder:s="",textPlaceholder:c="",commandEmptyMessage:p="No option found",buttonVariant:f="outline",dir:m="ltr",...v}){const[g,d]=E.useState(!1);return l.jsxs(Kc,{open:g,onOpenChange:d,...v,children:[l.jsx(Jc,{asChild:!0,children:l.jsxs(be,{variant:f,role:"combobox","aria-expanded":g,id:e,className:F("pr-w-[200px] pr-justify-between",n),children:[r?a(r):s,l.jsx(re.ChevronsUpDown,{className:"pr-ms-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"})]})}),l.jsx(Vs,{className:"pr-w-[200px] pr-p-0",dir:m,children:l.jsxs(zs,{children:[l.jsx(Us,{dir:m,placeholder:c,className:"pr-text-inherit"}),l.jsx(Gs,{children:p}),l.jsx(Hs,{children:t.map(h=>l.jsxs(qs,{value:a(h),onSelect:()=>{o(h),d(!1)},children:[l.jsx(re.Check,{className:F("pr-me-2 pr-h-4 pr-w-4",{"pr-opacity-0":!r||a(r)!==a(h)})}),a(h)]},a(h)))})]})})]})}function ap({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,a]=E.useState(1),[s,c]=E.useState(r),[p,f]=E.useState(Array.from({length:r},(g,d)=>d+1));E.useEffect(()=>{a(1),e(1),c(r),t(r),f(Array.from({length:r},(g,d)=>d+1))},[r,t,e]);const m=g=>{a(g),e(g),g>s&&(c(g),t(g))},v=g=>{c(g),t(g),g<o&&(a(g),e(g))};return l.jsxs(l.Fragment,{children:[l.jsx(Ee.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:l.jsx(so,{onChange:m,className:"book-selection-chapter",options:p,getOptionLabel:g=>g.toString(),value:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),l.jsx(Ee.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:l.jsx(so,{onChange:v,className:"book-selection-chapter",options:p,getOptionLabel:g=>g.toString(),value:s},"end chapter"),label:"to",labelPlacement:"start"})]})}var Rt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Rt||{});function Ws({id:e,isChecked:t,labelText:n="",labelPosition:r=Rt.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:s=!1,hasError:c=!1,className:p,onChange:f}){const m=l.jsx(Ee.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:a,disabled:s,className:`papi-checkbox ${c?"error":""} ${p??""}`,onChange:f});let v;if(n){const g=r===Rt.Before||r===Rt.Above,d=l.jsx("span",{className:`papi-checkbox-label ${c?"error":""} ${p??""}`,children:n}),h=r===Rt.Before||r===Rt.After,u=h?d:l.jsx("div",{children:d}),b=h?m:l.jsx("div",{children:m});v=l.jsxs(Ee.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:c,children:[g&&u,b,!g&&u]})}else v=m;return v}function sp({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:a,createLabel:s}){return l.jsxs("fieldset",{id:e,className:t,children:[n&&l.jsx("legend",{children:n}),r.map(c=>l.jsx(Ws,{className:"check-item",isChecked:o.includes(c),labelText:s?s(c):c,onChange:()=>a(c)},c))]})}function ip(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function lp(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Ro={},Xs={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Xs);var cp=Xs.exports,Fr={};function ln(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},P.apply(this,arguments)}function Pt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Ys(e){if(!Pt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Ys(e[n])}),t}function ct(e,t,n={clone:!0}){const r=n.clone?P({},e):e;return Pt(e)&&Pt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Pt(t[o])&&o in e&&Pt(e[o])?r[o]=ct(e[o],t[o],n):n.clone?r[o]=Pt(t[o])?Ys(t[o]):t[o]:r[o]=t[o])}),r}var io={exports:{}},nr={exports:{}},ce={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wa;function pp(){if(wa)return ce;wa=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,f=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,u=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,R=e?Symbol.for("react.scope"):60119;function w(y){if(typeof y=="object"&&y!==null){var S=y.$$typeof;switch(S){case t:switch(y=y.type,y){case p:case f:case r:case a:case o:case v:return y;default:switch(y=y&&y.$$typeof,y){case c:case m:case h:case d:case s:return y;default:return S}}case n:return S}}}function k(y){return w(y)===f}return ce.AsyncMode=p,ce.ConcurrentMode=f,ce.ContextConsumer=c,ce.ContextProvider=s,ce.Element=t,ce.ForwardRef=m,ce.Fragment=r,ce.Lazy=h,ce.Memo=d,ce.Portal=n,ce.Profiler=a,ce.StrictMode=o,ce.Suspense=v,ce.isAsyncMode=function(y){return k(y)||w(y)===p},ce.isConcurrentMode=k,ce.isContextConsumer=function(y){return w(y)===c},ce.isContextProvider=function(y){return w(y)===s},ce.isElement=function(y){return typeof y=="object"&&y!==null&&y.$$typeof===t},ce.isForwardRef=function(y){return w(y)===m},ce.isFragment=function(y){return w(y)===r},ce.isLazy=function(y){return w(y)===h},ce.isMemo=function(y){return w(y)===d},ce.isPortal=function(y){return w(y)===n},ce.isProfiler=function(y){return w(y)===a},ce.isStrictMode=function(y){return w(y)===o},ce.isSuspense=function(y){return w(y)===v},ce.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===r||y===f||y===a||y===o||y===v||y===g||typeof y=="object"&&y!==null&&(y.$$typeof===h||y.$$typeof===d||y.$$typeof===s||y.$$typeof===c||y.$$typeof===m||y.$$typeof===b||y.$$typeof===x||y.$$typeof===R||y.$$typeof===u)},ce.typeOf=w,ce}var pe={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xa;function dp(){return xa||(xa=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,f=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,u=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,R=e?Symbol.for("react.scope"):60119;function w(V){return typeof V=="string"||typeof V=="function"||V===r||V===f||V===a||V===o||V===v||V===g||typeof V=="object"&&V!==null&&(V.$$typeof===h||V.$$typeof===d||V.$$typeof===s||V.$$typeof===c||V.$$typeof===m||V.$$typeof===b||V.$$typeof===x||V.$$typeof===R||V.$$typeof===u)}function k(V){if(typeof V=="object"&&V!==null){var te=V.$$typeof;switch(te){case t:var D=V.type;switch(D){case p:case f:case r:case a:case o:case v:return D;default:var ie=D&&D.$$typeof;switch(ie){case c:case m:case h:case d:case s:return ie;default:return te}}case n:return te}}}var y=p,S=f,C=c,M=s,A=t,z=m,$=r,N=h,O=d,_=n,U=a,B=o,L=v,J=!1;function Z(V){return J||(J=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),j(V)||k(V)===p}function j(V){return k(V)===f}function I(V){return k(V)===c}function H(V){return k(V)===s}function K(V){return typeof V=="object"&&V!==null&&V.$$typeof===t}function G(V){return k(V)===m}function q(V){return k(V)===r}function X(V){return k(V)===h}function Y(V){return k(V)===d}function W(V){return k(V)===n}function Q(V){return k(V)===a}function ee(V){return k(V)===o}function se(V){return k(V)===v}pe.AsyncMode=y,pe.ConcurrentMode=S,pe.ContextConsumer=C,pe.ContextProvider=M,pe.Element=A,pe.ForwardRef=z,pe.Fragment=$,pe.Lazy=N,pe.Memo=O,pe.Portal=_,pe.Profiler=U,pe.StrictMode=B,pe.Suspense=L,pe.isAsyncMode=Z,pe.isConcurrentMode=j,pe.isContextConsumer=I,pe.isContextProvider=H,pe.isElement=K,pe.isForwardRef=G,pe.isFragment=q,pe.isLazy=X,pe.isMemo=Y,pe.isPortal=W,pe.isProfiler=Q,pe.isStrictMode=ee,pe.isSuspense=se,pe.isValidElementType=w,pe.typeOf=k}()),pe}var ka;function Ks(){return ka||(ka=1,process.env.NODE_ENV==="production"?nr.exports=pp():nr.exports=dp()),nr.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var zr,Ea;function up(){if(Ea)return zr;Ea=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var s={},c=0;c<10;c++)s["_"+String.fromCharCode(c)]=c;var p=Object.getOwnPropertyNames(s).map(function(m){return s[m]});if(p.join("")!=="0123456789")return!1;var f={};return"abcdefghijklmnopqrst".split("").forEach(function(m){f[m]=m}),Object.keys(Object.assign({},f)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return zr=o()?Object.assign:function(a,s){for(var c,p=r(a),f,m=1;m<arguments.length;m++){c=Object(arguments[m]);for(var v in c)t.call(c,v)&&(p[v]=c[v]);if(e){f=e(c);for(var g=0;g<f.length;g++)n.call(c,f[g])&&(p[f[g]]=c[f[g]])}}return p},zr}var Ur,Na;function Po(){if(Na)return Ur;Na=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Ur=e,Ur}var Hr,Ta;function Js(){return Ta||(Ta=1,Hr=Function.call.bind(Object.prototype.hasOwnProperty)),Hr}var Gr,Sa;function fp(){if(Sa)return Gr;Sa=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Po(),n={},r=Js();e=function(a){var s="Warning: "+a;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(a,s,c,p,f){if(process.env.NODE_ENV!=="production"){for(var m in a)if(r(a,m)){var v;try{if(typeof a[m]!="function"){var g=Error((p||"React class")+": "+c+" type `"+m+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[m]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw g.name="Invariant Violation",g}v=a[m](s,m,p,c,null,t)}catch(h){v=h}if(v&&!(v instanceof Error)&&e((p||"React class")+": type specification of "+c+" `"+m+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof v+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),v instanceof Error&&!(v.message in n)){n[v.message]=!0;var d=f?f():"";e("Failed "+c+" type: "+v.message+(d??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Gr=o,Gr}var qr,Ca;function mp(){if(Ca)return qr;Ca=1;var e=Ks(),t=up(),n=Po(),r=Js(),o=fp(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(c){var p="Warning: "+c;typeof console<"u"&&console.error(p);try{throw new Error(p)}catch{}});function s(){return null}return qr=function(c,p){var f=typeof Symbol=="function"&&Symbol.iterator,m="@@iterator";function v(j){var I=j&&(f&&j[f]||j[m]);if(typeof I=="function")return I}var g="<<anonymous>>",d={array:x("array"),bigint:x("bigint"),bool:x("boolean"),func:x("function"),number:x("number"),object:x("object"),string:x("string"),symbol:x("symbol"),any:R(),arrayOf:w,element:k(),elementType:y(),instanceOf:S,node:z(),objectOf:M,oneOf:C,oneOfType:A,shape:N,exact:O};function h(j,I){return j===I?j!==0||1/j===1/I:j!==j&&I!==I}function u(j,I){this.message=j,this.data=I&&typeof I=="object"?I:{},this.stack=""}u.prototype=Error.prototype;function b(j){if(process.env.NODE_ENV!=="production")var I={},H=0;function K(q,X,Y,W,Q,ee,se){if(W=W||g,ee=ee||Y,se!==n){if(p){var V=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw V.name="Invariant Violation",V}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var te=W+":"+Y;!I[te]&&H<3&&(a("You are manually calling a React.PropTypes validation function for the `"+ee+"` prop on `"+W+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),I[te]=!0,H++)}}return X[Y]==null?q?X[Y]===null?new u("The "+Q+" `"+ee+"` is marked as required "+("in `"+W+"`, but its value is `null`.")):new u("The "+Q+" `"+ee+"` is marked as required in "+("`"+W+"`, but its value is `undefined`.")):null:j(X,Y,W,Q,ee)}var G=K.bind(null,!1);return G.isRequired=K.bind(null,!0),G}function x(j){function I(H,K,G,q,X,Y){var W=H[K],Q=B(W);if(Q!==j){var ee=L(W);return new u("Invalid "+q+" `"+X+"` of type "+("`"+ee+"` supplied to `"+G+"`, expected ")+("`"+j+"`."),{expectedType:j})}return null}return b(I)}function R(){return b(s)}function w(j){function I(H,K,G,q,X){if(typeof j!="function")return new u("Property `"+X+"` of component `"+G+"` has invalid PropType notation inside arrayOf.");var Y=H[K];if(!Array.isArray(Y)){var W=B(Y);return new u("Invalid "+q+" `"+X+"` of type "+("`"+W+"` supplied to `"+G+"`, expected an array."))}for(var Q=0;Q<Y.length;Q++){var ee=j(Y,Q,G,q,X+"["+Q+"]",n);if(ee instanceof Error)return ee}return null}return b(I)}function k(){function j(I,H,K,G,q){var X=I[H];if(!c(X)){var Y=B(X);return new u("Invalid "+G+" `"+q+"` of type "+("`"+Y+"` supplied to `"+K+"`, expected a single ReactElement."))}return null}return b(j)}function y(){function j(I,H,K,G,q){var X=I[H];if(!e.isValidElementType(X)){var Y=B(X);return new u("Invalid "+G+" `"+q+"` of type "+("`"+Y+"` supplied to `"+K+"`, expected a single ReactElement type."))}return null}return b(j)}function S(j){function I(H,K,G,q,X){if(!(H[K]instanceof j)){var Y=j.name||g,W=Z(H[K]);return new u("Invalid "+q+" `"+X+"` of type "+("`"+W+"` supplied to `"+G+"`, expected ")+("instance of `"+Y+"`."))}return null}return b(I)}function C(j){if(!Array.isArray(j))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),s;function I(H,K,G,q,X){for(var Y=H[K],W=0;W<j.length;W++)if(h(Y,j[W]))return null;var Q=JSON.stringify(j,function(se,V){var te=L(V);return te==="symbol"?String(V):V});return new u("Invalid "+q+" `"+X+"` of value `"+String(Y)+"` "+("supplied to `"+G+"`, expected one of "+Q+"."))}return b(I)}function M(j){function I(H,K,G,q,X){if(typeof j!="function")return new u("Property `"+X+"` of component `"+G+"` has invalid PropType notation inside objectOf.");var Y=H[K],W=B(Y);if(W!=="object")return new u("Invalid "+q+" `"+X+"` of type "+("`"+W+"` supplied to `"+G+"`, expected an object."));for(var Q in Y)if(r(Y,Q)){var ee=j(Y,Q,G,q,X+"."+Q,n);if(ee instanceof Error)return ee}return null}return b(I)}function A(j){if(!Array.isArray(j))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var I=0;I<j.length;I++){var H=j[I];if(typeof H!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+J(H)+" at index "+I+"."),s}function K(G,q,X,Y,W){for(var Q=[],ee=0;ee<j.length;ee++){var se=j[ee],V=se(G,q,X,Y,W,n);if(V==null)return null;V.data&&r(V.data,"expectedType")&&Q.push(V.data.expectedType)}var te=Q.length>0?", expected one of type ["+Q.join(", ")+"]":"";return new u("Invalid "+Y+" `"+W+"` supplied to "+("`"+X+"`"+te+"."))}return b(K)}function z(){function j(I,H,K,G,q){return _(I[H])?null:new u("Invalid "+G+" `"+q+"` supplied to "+("`"+K+"`, expected a ReactNode."))}return b(j)}function $(j,I,H,K,G){return new u((j||"React class")+": "+I+" type `"+H+"."+K+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+G+"`.")}function N(j){function I(H,K,G,q,X){var Y=H[K],W=B(Y);if(W!=="object")return new u("Invalid "+q+" `"+X+"` of type `"+W+"` "+("supplied to `"+G+"`, expected `object`."));for(var Q in j){var ee=j[Q];if(typeof ee!="function")return $(G,q,X,Q,L(ee));var se=ee(Y,Q,G,q,X+"."+Q,n);if(se)return se}return null}return b(I)}function O(j){function I(H,K,G,q,X){var Y=H[K],W=B(Y);if(W!=="object")return new u("Invalid "+q+" `"+X+"` of type `"+W+"` "+("supplied to `"+G+"`, expected `object`."));var Q=t({},H[K],j);for(var ee in Q){var se=j[ee];if(r(j,ee)&&typeof se!="function")return $(G,q,X,ee,L(se));if(!se)return new u("Invalid "+q+" `"+X+"` key `"+ee+"` supplied to `"+G+"`.\nBad object: "+JSON.stringify(H[K],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(j),null,"  "));var V=se(Y,ee,G,q,X+"."+ee,n);if(V)return V}return null}return b(I)}function _(j){switch(typeof j){case"number":case"string":case"undefined":return!0;case"boolean":return!j;case"object":if(Array.isArray(j))return j.every(_);if(j===null||c(j))return!0;var I=v(j);if(I){var H=I.call(j),K;if(I!==j.entries){for(;!(K=H.next()).done;)if(!_(K.value))return!1}else for(;!(K=H.next()).done;){var G=K.value;if(G&&!_(G[1]))return!1}}else return!1;return!0;default:return!1}}function U(j,I){return j==="symbol"?!0:I?I["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&I instanceof Symbol:!1}function B(j){var I=typeof j;return Array.isArray(j)?"array":j instanceof RegExp?"object":U(I,j)?"symbol":I}function L(j){if(typeof j>"u"||j===null)return""+j;var I=B(j);if(I==="object"){if(j instanceof Date)return"date";if(j instanceof RegExp)return"regexp"}return I}function J(j){var I=L(j);switch(I){case"array":case"object":return"an "+I;case"boolean":case"date":case"regexp":return"a "+I;default:return I}}function Z(j){return!j.constructor||!j.constructor.name?g:j.constructor.name}return d.checkPropTypes=o,d.resetWarningCache=o.resetWarningCache,d.PropTypes=d,d},qr}var Wr,Oa;function hp(){if(Oa)return Wr;Oa=1;var e=Po();function t(){}function n(){}return n.resetWarningCache=t,Wr=function(){function r(s,c,p,f,m,v){if(v!==e){var g=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw g.name="Invariant Violation",g}}r.isRequired=r;function o(){return r}var a={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return a.PropTypes=a,a},Wr}if(process.env.NODE_ENV!=="production"){var gp=Ks(),bp=!0;io.exports=mp()(gp.isElement,bp)}else io.exports=hp()();var vp=io.exports;const i=ip(vp);function yp(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Zs(e,t,n,r,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let c;const p=a.type;return typeof p=="function"&&!yp(p)&&(c="Did you accidentally use a plain function component for an element instead?"),c!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Qs=ln(i.element,Zs);Qs.isRequired=ln(i.element.isRequired,Zs);const qn=Qs;function wp(e){const{prototype:t={}}=e;return!!t.isReactComponent}function xp(e,t,n,r,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let c;return typeof a=="function"&&!wp(a)&&(c="Did you accidentally provide a plain function component instead?"),c!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const kp=ln(i.elementType,xp),Ep="exact-prop: ​";function ei(e){return process.env.NODE_ENV==="production"?e:P({},e,{[Ep]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Qt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var lo={exports:{}},de={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ja;function Np(){if(ja)return de;ja=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function u(b){if(typeof b=="object"&&b!==null){var x=b.$$typeof;switch(x){case e:switch(b=b.type,b){case n:case o:case r:case f:case m:return b;default:switch(b=b&&b.$$typeof,b){case c:case s:case p:case g:case v:case a:return b;default:return x}}case t:return x}}}return de.ContextConsumer=s,de.ContextProvider=a,de.Element=e,de.ForwardRef=p,de.Fragment=n,de.Lazy=g,de.Memo=v,de.Portal=t,de.Profiler=o,de.StrictMode=r,de.Suspense=f,de.SuspenseList=m,de.isAsyncMode=function(){return!1},de.isConcurrentMode=function(){return!1},de.isContextConsumer=function(b){return u(b)===s},de.isContextProvider=function(b){return u(b)===a},de.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===e},de.isForwardRef=function(b){return u(b)===p},de.isFragment=function(b){return u(b)===n},de.isLazy=function(b){return u(b)===g},de.isMemo=function(b){return u(b)===v},de.isPortal=function(b){return u(b)===t},de.isProfiler=function(b){return u(b)===o},de.isStrictMode=function(b){return u(b)===r},de.isSuspense=function(b){return u(b)===f},de.isSuspenseList=function(b){return u(b)===m},de.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===n||b===o||b===r||b===f||b===m||b===d||typeof b=="object"&&b!==null&&(b.$$typeof===g||b.$$typeof===v||b.$$typeof===a||b.$$typeof===s||b.$$typeof===p||b.$$typeof===h||b.getModuleId!==void 0)},de.typeOf=u,de}var ue={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ra;function Tp(){return Ra||(Ra=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h=!1,u=!1,b=!1,x=!1,R=!1,w;w=Symbol.for("react.module.reference");function k(D){return!!(typeof D=="string"||typeof D=="function"||D===n||D===o||R||D===r||D===f||D===m||x||D===d||h||u||b||typeof D=="object"&&D!==null&&(D.$$typeof===g||D.$$typeof===v||D.$$typeof===a||D.$$typeof===s||D.$$typeof===p||D.$$typeof===w||D.getModuleId!==void 0))}function y(D){if(typeof D=="object"&&D!==null){var ie=D.$$typeof;switch(ie){case e:var Ne=D.type;switch(Ne){case n:case o:case r:case f:case m:return Ne;default:var Re=Ne&&Ne.$$typeof;switch(Re){case c:case s:case p:case g:case v:case a:return Re;default:return ie}}case t:return ie}}}var S=s,C=a,M=e,A=p,z=n,$=g,N=v,O=t,_=o,U=r,B=f,L=m,J=!1,Z=!1;function j(D){return J||(J=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function I(D){return Z||(Z=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function H(D){return y(D)===s}function K(D){return y(D)===a}function G(D){return typeof D=="object"&&D!==null&&D.$$typeof===e}function q(D){return y(D)===p}function X(D){return y(D)===n}function Y(D){return y(D)===g}function W(D){return y(D)===v}function Q(D){return y(D)===t}function ee(D){return y(D)===o}function se(D){return y(D)===r}function V(D){return y(D)===f}function te(D){return y(D)===m}ue.ContextConsumer=S,ue.ContextProvider=C,ue.Element=M,ue.ForwardRef=A,ue.Fragment=z,ue.Lazy=$,ue.Memo=N,ue.Portal=O,ue.Profiler=_,ue.StrictMode=U,ue.Suspense=B,ue.SuspenseList=L,ue.isAsyncMode=j,ue.isConcurrentMode=I,ue.isContextConsumer=H,ue.isContextProvider=K,ue.isElement=G,ue.isForwardRef=q,ue.isFragment=X,ue.isLazy=Y,ue.isMemo=W,ue.isPortal=Q,ue.isProfiler=ee,ue.isStrictMode=se,ue.isSuspense=V,ue.isSuspenseList=te,ue.isValidElementType=k,ue.typeOf=y}()),ue}process.env.NODE_ENV==="production"?lo.exports=Np():lo.exports=Tp();var ur=lo.exports;const Sp=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Cp(e){const t=`${e}`.match(Sp);return t&&t[1]||""}function ti(e,t=""){return e.displayName||e.name||Cp(e)||t}function Pa(e,t,n){const r=ti(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Op(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return ti(e,"Component");if(typeof e=="object")switch(e.$$typeof){case ur.ForwardRef:return Pa(e,e.render,"ForwardRef");case ur.Memo:return Pa(e,e.type,"memo");default:return}}}function pt(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=e[t],s=o||t;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const jp=i.oneOfType([i.func,i.object]),$o=jp;function et(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Qt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function co(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function ni(e,t=166){let n;function r(...o){const a=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(a,t)}return r.clear=()=>{clearTimeout(n)},r}function Rp(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,a,s)=>{const c=o||"<<anonymous>>",p=s||r;return typeof n[r]<"u"?new Error(`The ${a} \`${p}\` of \`${c}\` is deprecated. ${t}`):null}}function Pp(e,t){var n,r;return T.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Oe(e){return e&&e.ownerDocument||document}function en(e){return Oe(e).defaultView||window}function $p(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?P({},t.propTypes):null;return o=>(a,s,c,p,f,...m)=>{const v=f||s,g=n==null?void 0:n[v];if(g){const d=g(a,s,c,p,f,...m);if(d)return d}return typeof a[s]<"u"&&!a[o]?new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function fr(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const _p=typeof window<"u"?T.useLayoutEffect:T.useEffect,Dt=_p;let $a=0;function Mp(e){const[t,n]=T.useState(e),r=e||t;return T.useEffect(()=>{t==null&&($a+=1,n(`mui-${$a}`))},[t]),r}const _a=T["useId".toString()];function ri(e){if(_a!==void 0){const t=_a();return e??t}return Mp(e)}function Ip(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=o||t;return typeof e[t]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function oi({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=T.useRef(e!==void 0),[a,s]=T.useState(t),c=o?e:a;if(process.env.NODE_ENV!=="production"){T.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:f}=T.useRef(t);T.useEffect(()=>{!o&&f!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const p=T.useCallback(f=>{o||s(f)},[]);return[c,p]}function In(e){const t=T.useRef(e);return Dt(()=>{t.current=e}),T.useRef((...n)=>(0,t.current)(...n)).current}function qe(...e){return T.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{fr(n,t)})},e)}const Ma={};function Dp(e,t){const n=T.useRef(Ma);return n.current===Ma&&(n.current=e(t)),n}const Ap=[];function Bp(e){T.useEffect(e,Ap)}class Wn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Wn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function Nn(){const e=Dp(Wn.create).current;return Bp(e.disposeEffect),e}let Nr=!0,po=!1;const Lp=new Wn,Vp={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Fp(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Vp[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function zp(e){e.metaKey||e.altKey||e.ctrlKey||(Nr=!0)}function Xr(){Nr=!1}function Up(){this.visibilityState==="hidden"&&po&&(Nr=!0)}function Hp(e){e.addEventListener("keydown",zp,!0),e.addEventListener("mousedown",Xr,!0),e.addEventListener("pointerdown",Xr,!0),e.addEventListener("touchstart",Xr,!0),e.addEventListener("visibilitychange",Up,!0)}function Gp(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Nr||Fp(t)}function ai(){const e=T.useCallback(o=>{o!=null&&Hp(o.ownerDocument)},[]),t=T.useRef(!1);function n(){return t.current?(po=!0,Lp.start(100,()=>{po=!1}),t.current=!1,!0):!1}function r(o){return Gp(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function si(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function qp(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function Wp(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Xp=Number.isInteger||Wp;function ii(e,t,n,r){const o=e[t];if(o==null||!Xp(o)){const a=qp(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function li(e,t,...n){return e[t]===void 0?null:ii(e,t,...n)}function uo(){return null}li.isRequired=ii;uo.isRequired=uo;const ci=process.env.NODE_ENV==="production"?uo:li;function pi(e,t){const n=P({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=P({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},a=t[r];n[r]={},!a||!Object.keys(a)?n[r]=o:!o||!Object.keys(o)?n[r]=a:(n[r]=P({},a),Object.keys(o).forEach(s=>{n[r][s]=pi(o[s],a[s])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function ft(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((a,s)=>{if(s){const c=t(s);c!==""&&a.push(c),n&&n[s]&&a.push(n[s])}return a},[]).join(" ")}),r}const Ia=e=>e,Yp=()=>{let e=Ia;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Ia}}},Kp=Yp(),di=Kp,ui={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function rt(e,t,n="Mui"){const r=ui[t];return r?`${n}-${r}`:`${di.generate(e)}-${t}`}function xt(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=rt(e,o,n)}),r}function Jp(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function me(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,a;for(a=0;a<r.length;a++)o=r[a],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}const Zp=["values","unit","step"],Qp=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>P({},n,{[r.key]:r.val}),{})};function ed(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=me(e,Zp),a=Qp(t),s=Object.keys(a);function c(g){return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${n})`}function p(g){return`@media (max-width:${(typeof t[g]=="number"?t[g]:g)-r/100}${n})`}function f(g,d){const h=s.indexOf(d);return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${n}) and (max-width:${(h!==-1&&typeof t[s[h]]=="number"?t[s[h]]:d)-r/100}${n})`}function m(g){return s.indexOf(g)+1<s.length?f(g,s[s.indexOf(g)+1]):c(g)}function v(g){const d=s.indexOf(g);return d===0?c(s[1]):d===s.length-1?p(s[d]):f(g,s[s.indexOf(g)+1]).replace("@media","@media not all and")}return P({keys:s,values:a,up:c,down:p,between:f,only:m,not:v,unit:n},o)}const td={borderRadius:4},nd=td,rd=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.string,i.object,i.array]):{},kt=rd;function On(e,t){return t?ct(e,t,{clone:!1}):e}const _o={xs:0,sm:600,md:900,lg:1200,xl:1536},Da={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${_o[e]}px)`};function dt(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const a=r.breakpoints||Da;return t.reduce((s,c,p)=>(s[a.up(a.keys[p])]=n(t[p]),s),{})}if(typeof t=="object"){const a=r.breakpoints||Da;return Object.keys(t).reduce((s,c)=>{if(Object.keys(a.values||_o).indexOf(c)!==-1){const p=a.up(c);s[p]=n(t[c],c)}else{const p=c;s[p]=t[p]}return s},{})}return n(t)}function od(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const a=e.up(o);return r[a]={},r},{}))||{}}function ad(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Tr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function mr(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Tr(e,n)||r,t&&(o=t(o,r,e)),o}function ke(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,a=s=>{if(s[t]==null)return null;const c=s[t],p=s.theme,f=Tr(p,r)||{};return dt(s,c,v=>{let g=mr(f,o,v);return v===g&&typeof v=="string"&&(g=mr(f,o,`${t}${v==="default"?"":et(v)}`,v)),n===!1?g:{[n]:g}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[t]:kt}:{},a.filterProps=[t],a}function sd(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const id={m:"margin",p:"padding"},ld={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Aa={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},cd=sd(e=>{if(e.length>2)if(Aa[e])e=Aa[e];else return[e];const[t,n]=e.split(""),r=id[t],o=ld[n]||"";return Array.isArray(o)?o.map(a=>r+a):[r+o]}),Sr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Cr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],pd=[...Sr,...Cr];function Xn(e,t,n,r){var o;const a=(o=Tr(e,t,!1))!=null?o:n;return typeof a=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),a*s):Array.isArray(a)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>a.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${s} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),a[s]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function fi(e){return Xn(e,"spacing",8,"spacing")}function Yn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function dd(e,t){return n=>e.reduce((r,o)=>(r[o]=Yn(t,n),r),{})}function ud(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=cd(n),a=dd(o,r),s=e[n];return dt(e,s,a)}function mi(e,t){const n=fi(e.theme);return Object.keys(e).map(r=>ud(e,t,r,n)).reduce(On,{})}function ve(e){return mi(e,Sr)}ve.propTypes=process.env.NODE_ENV!=="production"?Sr.reduce((e,t)=>(e[t]=kt,e),{}):{};ve.filterProps=Sr;function ye(e){return mi(e,Cr)}ye.propTypes=process.env.NODE_ENV!=="production"?Cr.reduce((e,t)=>(e[t]=kt,e),{}):{};ye.filterProps=Cr;process.env.NODE_ENV!=="production"&&pd.reduce((e,t)=>(e[t]=kt,e),{});function fd(e=8){if(e.mui)return e;const t=fi({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(a=>{const s=t(a);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function Or(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(a=>{r[a]=o}),r),{}),n=r=>Object.keys(r).reduce((o,a)=>t[a]?On(o,t[a](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Ue(e){return typeof e!="number"?e:`${e}px solid`}function Ye(e,t){return ke({prop:e,themeKey:"borders",transform:t})}const md=Ye("border",Ue),hd=Ye("borderTop",Ue),gd=Ye("borderRight",Ue),bd=Ye("borderBottom",Ue),vd=Ye("borderLeft",Ue),yd=Ye("borderColor"),wd=Ye("borderTopColor"),xd=Ye("borderRightColor"),kd=Ye("borderBottomColor"),Ed=Ye("borderLeftColor"),Nd=Ye("outline",Ue),Td=Ye("outlineColor"),jr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Xn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:Yn(t,r)});return dt(e,e.borderRadius,n)}return null};jr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:kt}:{};jr.filterProps=["borderRadius"];Or(md,hd,gd,bd,vd,yd,wd,xd,kd,Ed,jr,Nd,Td);const Rr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Xn(e.theme,"spacing",8,"gap"),n=r=>({gap:Yn(t,r)});return dt(e,e.gap,n)}return null};Rr.propTypes=process.env.NODE_ENV!=="production"?{gap:kt}:{};Rr.filterProps=["gap"];const Pr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Xn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:Yn(t,r)});return dt(e,e.columnGap,n)}return null};Pr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:kt}:{};Pr.filterProps=["columnGap"];const $r=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Xn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:Yn(t,r)});return dt(e,e.rowGap,n)}return null};$r.propTypes=process.env.NODE_ENV!=="production"?{rowGap:kt}:{};$r.filterProps=["rowGap"];const Sd=ke({prop:"gridColumn"}),Cd=ke({prop:"gridRow"}),Od=ke({prop:"gridAutoFlow"}),jd=ke({prop:"gridAutoColumns"}),Rd=ke({prop:"gridAutoRows"}),Pd=ke({prop:"gridTemplateColumns"}),$d=ke({prop:"gridTemplateRows"}),_d=ke({prop:"gridTemplateAreas"}),Md=ke({prop:"gridArea"});Or(Rr,Pr,$r,Sd,Cd,Od,jd,Rd,Pd,$d,_d,Md);function Yt(e,t){return t==="grey"?t:e}const Id=ke({prop:"color",themeKey:"palette",transform:Yt}),Dd=ke({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Yt}),Ad=ke({prop:"backgroundColor",themeKey:"palette",transform:Yt});Or(Id,Dd,Ad);function Ve(e){return e<=1&&e!==0?`${e*100}%`:e}const Bd=ke({prop:"width",transform:Ve}),Mo=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const a=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||_o[n];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:Ve(n)}};return dt(e,e.maxWidth,t)}return null};Mo.filterProps=["maxWidth"];const Ld=ke({prop:"minWidth",transform:Ve}),Vd=ke({prop:"height",transform:Ve}),Fd=ke({prop:"maxHeight",transform:Ve}),zd=ke({prop:"minHeight",transform:Ve});ke({prop:"size",cssProperty:"width",transform:Ve});ke({prop:"size",cssProperty:"height",transform:Ve});const Ud=ke({prop:"boxSizing"});Or(Bd,Mo,Ld,Vd,Fd,zd,Ud);const Hd={border:{themeKey:"borders",transform:Ue},borderTop:{themeKey:"borders",transform:Ue},borderRight:{themeKey:"borders",transform:Ue},borderBottom:{themeKey:"borders",transform:Ue},borderLeft:{themeKey:"borders",transform:Ue},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Ue},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:jr},color:{themeKey:"palette",transform:Yt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Yt},backgroundColor:{themeKey:"palette",transform:Yt},p:{style:ye},pt:{style:ye},pr:{style:ye},pb:{style:ye},pl:{style:ye},px:{style:ye},py:{style:ye},padding:{style:ye},paddingTop:{style:ye},paddingRight:{style:ye},paddingBottom:{style:ye},paddingLeft:{style:ye},paddingX:{style:ye},paddingY:{style:ye},paddingInline:{style:ye},paddingInlineStart:{style:ye},paddingInlineEnd:{style:ye},paddingBlock:{style:ye},paddingBlockStart:{style:ye},paddingBlockEnd:{style:ye},m:{style:ve},mt:{style:ve},mr:{style:ve},mb:{style:ve},ml:{style:ve},mx:{style:ve},my:{style:ve},margin:{style:ve},marginTop:{style:ve},marginRight:{style:ve},marginBottom:{style:ve},marginLeft:{style:ve},marginX:{style:ve},marginY:{style:ve},marginInline:{style:ve},marginInlineStart:{style:ve},marginInlineEnd:{style:ve},marginBlock:{style:ve},marginBlockStart:{style:ve},marginBlockEnd:{style:ve},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Rr},rowGap:{style:$r},columnGap:{style:Pr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ve},maxWidth:{style:Mo},minWidth:{transform:Ve},height:{transform:Ve},maxHeight:{transform:Ve},minHeight:{transform:Ve},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Io=Hd;function Gd(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function qd(e,t){return typeof e=="function"?e(t):e}function Wd(){function e(n,r,o,a){const s={[n]:r,theme:o},c=a[n];if(!c)return{[n]:r};const{cssProperty:p=n,themeKey:f,transform:m,style:v}=c;if(r==null)return null;if(f==="typography"&&r==="inherit")return{[n]:r};const g=Tr(o,f)||{};return v?v(s):dt(s,r,h=>{let u=mr(g,m,h);return h===u&&typeof h=="string"&&(u=mr(g,m,`${n}${h==="default"?"":et(h)}`,h)),p===!1?u:{[p]:u}})}function t(n){var r;const{sx:o,theme:a={}}=n||{};if(!o)return null;const s=(r=a.unstable_sxConfig)!=null?r:Io;function c(p){let f=p;if(typeof p=="function")f=p(a);else if(typeof p!="object")return p;if(!f)return null;const m=od(a.breakpoints),v=Object.keys(m);let g=m;return Object.keys(f).forEach(d=>{const h=qd(f[d],a);if(h!=null)if(typeof h=="object")if(s[d])g=On(g,e(d,h,a,s));else{const u=dt({theme:a},h,b=>({[d]:b}));Gd(u,h)?g[d]=t({sx:h,theme:a}):g=On(g,u)}else g=On(g,e(d,h,a,s))}),ad(v,g)}return Array.isArray(o)?o.map(c):c(o)}return t}const hi=Wd();hi.filterProps=["sx"];const Do=hi;function Xd(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Yd=["breakpoints","palette","spacing","shape"];function Ao(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:a={}}=e,s=me(e,Yd),c=ed(n),p=fd(o);let f=ct({breakpoints:c,direction:"ltr",components:{},palette:P({mode:"light"},r),spacing:p,shape:P({},nd,a)},s);return f.applyStyles=Xd,f=t.reduce((m,v)=>ct(m,v),f),f.unstable_sxConfig=P({},Io,s==null?void 0:s.unstable_sxConfig),f.unstable_sx=function(v){return Do({sx:v,theme:this})},f}function Kd(e){return Object.keys(e).length===0}function gi(e=null){const t=T.useContext(oo.ThemeContext);return!t||Kd(t)?e:t}const Jd=Ao();function bi(e=Jd){return gi(e)}const Zd=["ownerState"],Qd=["variants"],eu=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function tu(e){return Object.keys(e).length===0}function nu(e){return typeof e=="string"&&e.charCodeAt(0)>96}function ir(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const ru=Ao(),Ba=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function rr({defaultTheme:e,theme:t,themeId:n}){return tu(t)?e:t[n]||t}function ou(e){return e?(t,n)=>n[e]:null}function lr(e,t){let{ownerState:n}=t,r=me(t,Zd);const o=typeof e=="function"?e(P({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(a=>lr(a,P({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let c=me(o,Qd);return a.forEach(p=>{let f=!0;typeof p.props=="function"?f=p.props(P({ownerState:n},r,n)):Object.keys(p.props).forEach(m=>{(n==null?void 0:n[m])!==p.props[m]&&r[m]!==p.props[m]&&(f=!1)}),f&&(Array.isArray(c)||(c=[c]),c.push(typeof p.style=="function"?p.style(P({ownerState:n},r,n)):p.style))}),c}return o}function au(e={}){const{themeId:t,defaultTheme:n=ru,rootShouldForwardProp:r=ir,slotShouldForwardProp:o=ir}=e,a=s=>Do(P({},s,{theme:rr(P({},s,{defaultTheme:n,themeId:t}))}));return a.__mui_systemSx=!0,(s,c={})=>{oo.internal_processStyles(s,y=>y.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:p,slot:f,skipVariantsResolver:m,skipSx:v,overridesResolver:g=ou(Ba(f))}=c,d=me(c,eu),h=m!==void 0?m:f&&f!=="Root"&&f!=="root"||!1,u=v||!1;let b;process.env.NODE_ENV!=="production"&&p&&(b=`${p}-${Ba(f||"Root")}`);let x=ir;f==="Root"||f==="root"?x=r:f?x=o:nu(s)&&(x=void 0);const R=oo(s,P({shouldForwardProp:x,label:b},d)),w=y=>typeof y=="function"&&y.__emotion_real!==y||Pt(y)?S=>lr(y,P({},S,{theme:rr({theme:S.theme,defaultTheme:n,themeId:t})})):y,k=(y,...S)=>{let C=w(y);const M=S?S.map(w):[];p&&g&&M.push($=>{const N=rr(P({},$,{defaultTheme:n,themeId:t}));if(!N.components||!N.components[p]||!N.components[p].styleOverrides)return null;const O=N.components[p].styleOverrides,_={};return Object.entries(O).forEach(([U,B])=>{_[U]=lr(B,P({},$,{theme:N}))}),g($,_)}),p&&!h&&M.push($=>{var N;const O=rr(P({},$,{defaultTheme:n,themeId:t})),_=O==null||(N=O.components)==null||(N=N[p])==null?void 0:N.variants;return lr({variants:_},P({},$,{theme:O}))}),u||M.push(a);const A=M.length-S.length;if(Array.isArray(y)&&A>0){const $=new Array(A).fill("");C=[...y,...$],C.raw=[...y.raw,...$]}const z=R(C,...M);if(process.env.NODE_ENV!=="production"){let $;p&&($=`${p}${et(f||"")}`),$===void 0&&($=`Styled(${Op(s)})`),z.displayName=$}return s.muiName&&(z.muiName=s.muiName),z};return R.withConfig&&(k.withConfig=R.withConfig),k}}function su(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:pi(t.components[n].defaultProps,r)}function iu({props:e,name:t,defaultTheme:n,themeId:r}){let o=bi(n);return r&&(o=o[r]||o),su({theme:o,name:t,props:e})}function Bo(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Jp(e,t,n)}function lu(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function At(e){if(e.type)return e;if(e.charAt(0)==="#")return At(lu(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Qt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Qt(10,o))}else r=r.split(",");return r=r.map(a=>parseFloat(a)),{type:n,values:r,colorSpace:o}}function _r(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,a)=>a<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function cu(e){e=At(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,a=r*Math.min(o,1-o),s=(f,m=(f+n/30)%12)=>o-a*Math.max(Math.min(m-3,9-m,1),-1);let c="rgb";const p=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(c+="a",p.push(t[3])),_r({type:c,values:p})}function La(e){e=At(e);let t=e.type==="hsl"||e.type==="hsla"?At(cu(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Va(e,t){const n=La(e),r=La(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function hr(e,t){return e=At(e),t=Bo(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,_r(e)}function pu(e,t){if(e=At(e),t=Bo(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return _r(e)}function du(e,t){if(e=At(e),t=Bo(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return _r(e)}function uu(e,t){return P({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const fu={black:"#000",white:"#fff"},Dn=fu,mu={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},hu=mu,gu={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ft=gu,bu={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},zt=bu,vu={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},bn=vu,yu={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ut=yu,wu={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Ht=wu,xu={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Gt=xu,ku=["mode","contrastThreshold","tonalOffset"],Fa={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Dn.white,default:Dn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Yr={text:{primary:Dn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Dn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function za(e,t,n,r){const o=r.light||r,a=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=du(e.main,o):t==="dark"&&(e.dark=pu(e.main,a)))}function Eu(e="light"){return e==="dark"?{main:Ut[200],light:Ut[50],dark:Ut[400]}:{main:Ut[700],light:Ut[400],dark:Ut[800]}}function Nu(e="light"){return e==="dark"?{main:Ft[200],light:Ft[50],dark:Ft[400]}:{main:Ft[500],light:Ft[300],dark:Ft[700]}}function Tu(e="light"){return e==="dark"?{main:zt[500],light:zt[300],dark:zt[700]}:{main:zt[700],light:zt[400],dark:zt[800]}}function Su(e="light"){return e==="dark"?{main:Ht[400],light:Ht[300],dark:Ht[700]}:{main:Ht[700],light:Ht[500],dark:Ht[900]}}function Cu(e="light"){return e==="dark"?{main:Gt[400],light:Gt[300],dark:Gt[700]}:{main:Gt[800],light:Gt[500],dark:Gt[900]}}function Ou(e="light"){return e==="dark"?{main:bn[400],light:bn[300],dark:bn[700]}:{main:"#ed6c02",light:bn[500],dark:bn[900]}}function ju(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=me(e,ku),a=e.primary||Eu(t),s=e.secondary||Nu(t),c=e.error||Tu(t),p=e.info||Su(t),f=e.success||Cu(t),m=e.warning||Ou(t);function v(u){const b=Va(u,Yr.text.primary)>=n?Yr.text.primary:Fa.text.primary;if(process.env.NODE_ENV!=="production"){const x=Va(u,b);x<3&&console.error([`MUI: The contrast ratio of ${x}:1 for ${b} on ${u}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
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
} });`:Qt(12,b?` (${b})`:"",JSON.stringify(u.main)));return za(u,"light",R,r),za(u,"dark",w,r),u.contrastText||(u.contrastText=v(u.main)),u},d={dark:Yr,light:Fa};return process.env.NODE_ENV!=="production"&&(d[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),ct(P({common:P({},Dn),mode:t,primary:g({color:a,name:"primary"}),secondary:g({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:g({color:c,name:"error"}),warning:g({color:m,name:"warning"}),info:g({color:p,name:"info"}),success:g({color:f,name:"success"}),grey:hu,contrastThreshold:n,getContrastText:v,augmentColor:g,tonalOffset:r},d[t]),o)}const Ru=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Pu(e){return Math.round(e*1e5)/1e5}const Ua={textTransform:"uppercase"},Ha='"Roboto", "Helvetica", "Arial", sans-serif';function $u(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Ha,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:s=400,fontWeightMedium:c=500,fontWeightBold:p=700,htmlFontSize:f=16,allVariants:m,pxToRem:v}=n,g=me(n,Ru);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof f!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const d=o/14,h=v||(x=>`${x/f*d}rem`),u=(x,R,w,k,y)=>P({fontFamily:r,fontWeight:x,fontSize:h(R),lineHeight:w},r===Ha?{letterSpacing:`${Pu(k/R)}em`}:{},y,m),b={h1:u(a,96,1.167,-1.5),h2:u(a,60,1.2,-.5),h3:u(s,48,1.167,0),h4:u(s,34,1.235,.25),h5:u(s,24,1.334,0),h6:u(c,20,1.6,.15),subtitle1:u(s,16,1.75,.15),subtitle2:u(c,14,1.57,.1),body1:u(s,16,1.5,.15),body2:u(s,14,1.43,.15),button:u(c,14,1.75,.4,Ua),caption:u(s,12,1.66,.4),overline:u(s,12,2.66,1,Ua),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return ct(P({htmlFontSize:f,pxToRem:h,fontFamily:r,fontSize:o,fontWeightLight:a,fontWeightRegular:s,fontWeightMedium:c,fontWeightBold:p},b),g,{clone:!1})}const _u=.2,Mu=.14,Iu=.12;function ge(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${_u})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Mu})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Iu})`].join(",")}const Du=["none",ge(0,2,1,-1,0,1,1,0,0,1,3,0),ge(0,3,1,-2,0,2,2,0,0,1,5,0),ge(0,3,3,-2,0,3,4,0,0,1,8,0),ge(0,2,4,-1,0,4,5,0,0,1,10,0),ge(0,3,5,-1,0,5,8,0,0,1,14,0),ge(0,3,5,-1,0,6,10,0,0,1,18,0),ge(0,4,5,-2,0,7,10,1,0,2,16,1),ge(0,5,5,-3,0,8,10,1,0,3,14,2),ge(0,5,6,-3,0,9,12,1,0,3,16,2),ge(0,6,6,-3,0,10,14,1,0,4,18,3),ge(0,6,7,-4,0,11,15,1,0,4,20,3),ge(0,7,8,-4,0,12,17,2,0,5,22,4),ge(0,7,8,-4,0,13,19,2,0,5,24,4),ge(0,7,9,-4,0,14,21,2,0,5,26,4),ge(0,8,9,-5,0,15,22,2,0,6,28,5),ge(0,8,10,-5,0,16,24,2,0,6,30,5),ge(0,8,11,-5,0,17,26,2,0,6,32,5),ge(0,9,11,-5,0,18,28,2,0,7,34,6),ge(0,9,12,-6,0,19,29,2,0,7,36,6),ge(0,10,13,-6,0,20,31,3,0,8,38,7),ge(0,10,13,-6,0,21,33,3,0,8,40,7),ge(0,10,14,-6,0,22,35,3,0,8,42,7),ge(0,11,14,-7,0,23,36,3,0,9,44,8),ge(0,11,15,-7,0,24,38,3,0,9,46,8)],Au=Du,Bu=["duration","easing","delay"],Lu={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Vu={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Ga(e){return`${Math.round(e)}ms`}function Fu(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function zu(e){const t=P({},Lu,e.easing),n=P({},Vu,e.duration);return P({getAutoHeightDuration:Fu,create:(o=["all"],a={})=>{const{duration:s=n.standard,easing:c=t.easeInOut,delay:p=0}=a,f=me(a,Bu);if(process.env.NODE_ENV!=="production"){const m=g=>typeof g=="string",v=g=>!isNaN(parseFloat(g));!m(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!v(s)&&!m(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),m(c)||console.error('MUI: Argument "easing" must be a string.'),!v(p)&&!m(p)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(f).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(f).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(m=>`${m} ${typeof s=="string"?s:Ga(s)} ${c} ${typeof p=="string"?p:Ga(p)}`).join(",")}},e,{easing:t,duration:n})}const Uu={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Hu=Uu,Gu=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function qu(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:a={}}=e,s=me(e,Gu);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Qt(18));const c=ju(r),p=Ao(e);let f=ct(p,{mixins:uu(p.breakpoints,n),palette:c,shadows:Au.slice(),typography:$u(c,a),transitions:zu(o),zIndex:P({},Hu)});if(f=ct(f,s),f=t.reduce((m,v)=>ct(m,v),f),process.env.NODE_ENV!=="production"){const m=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],v=(g,d)=>{let h;for(h in g){const u=g[h];if(m.indexOf(h)!==-1&&Object.keys(u).length>0){if(process.env.NODE_ENV!=="production"){const b=rt("",h);console.error([`MUI: The \`${d}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(g,null,2),"",`Instead, you need to use the '&.${b}' syntax:`,JSON.stringify({root:{[`&.${b}`]:u}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}g[h]={}}}};Object.keys(f.components).forEach(g=>{const d=f.components[g].styleOverrides;d&&g.indexOf("Mui")===0&&v(d,g)})}return f.unstable_sxConfig=P({},Io,s==null?void 0:s.unstable_sxConfig),f.unstable_sx=function(v){return Do({sx:v,theme:this})},f}const Wu=qu(),Lo=Wu,Vo="$$material";function mt({props:e,name:t}){return iu({props:e,name:t,defaultTheme:Lo,themeId:Vo})}const vi=e=>ir(e)&&e!=="classes",Xu=au({themeId:Vo,defaultTheme:Lo,rootShouldForwardProp:vi}),je=Xu;function Yu(e){return rt("MuiSvgIcon",e)}xt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Ku=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Ju=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${et(t)}`,`fontSize${et(n)}`]};return ft(o,Yu,r)},Zu=je("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${et(n.color)}`],t[`fontSize${et(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,a,s,c,p,f,m,v,g,d,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((c=e.typography)==null||(p=c.pxToRem)==null?void 0:p.call(c,24))||"1.5rem",large:((f=e.typography)==null||(m=f.pxToRem)==null?void 0:m.call(f,35))||"2.1875rem"}[t.fontSize],color:(v=(g=(e.vars||e).palette)==null||(g=g[t.color])==null?void 0:g.main)!=null?v:{action:(d=(e.vars||e).palette)==null||(d=d.action)==null?void 0:d.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),Fo=T.forwardRef(function(t,n){const r=mt({props:t,name:"MuiSvgIcon"}),{children:o,className:a,color:s="inherit",component:c="svg",fontSize:p="medium",htmlColor:f,inheritViewBox:m=!1,titleAccess:v,viewBox:g="0 0 24 24"}=r,d=me(r,Ku),h=T.isValidElement(o)&&o.type==="svg",u=P({},r,{color:s,component:c,fontSize:p,instanceFontSize:t.fontSize,inheritViewBox:m,viewBox:g,hasSvgAsChild:h}),b={};m||(b.viewBox=g);const x=Ju(u);return l.jsxs(Zu,P({as:c,className:Se(x.root,a),focusable:"false",color:f,"aria-hidden":v?void 0:!0,role:v?"img":void 0,ref:n},b,d,h&&o.props,{ownerState:u,children:[h?o.props.children:o,v?l.jsx("title",{children:v}):null]}))});process.env.NODE_ENV!=="production"&&(Fo.propTypes={children:i.node,classes:i.object,className:i.string,color:i.oneOfType([i.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),i.string]),component:i.elementType,fontSize:i.oneOfType([i.oneOf(["inherit","large","medium","small"]),i.string]),htmlColor:i.string,inheritViewBox:i.bool,shapeRendering:i.string,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),titleAccess:i.string,viewBox:i.string});Fo.muiName="SvgIcon";const qa=Fo;function yi(e,t){function n(r,o){return l.jsx(qa,P({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=qa.muiName,T.memo(T.forwardRef(n))}const Qu={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),di.configure(e)}},ef=Object.freeze(Object.defineProperty({__proto__:null,capitalize:et,createChainedFunction:co,createSvgIcon:yi,debounce:ni,deprecatedPropType:Rp,isMuiElement:Pp,ownerDocument:Oe,ownerWindow:en,requirePropFactory:$p,setRef:fr,unstable_ClassNameGenerator:Qu,unstable_useEnhancedEffect:Dt,unstable_useId:ri,unsupportedProp:Ip,useControlled:oi,useEventCallback:In,useForkRef:qe,useIsFocusVisible:ai},Symbol.toStringTag,{value:"Module"})),tf=lp(ef);var Wa;function nf(){return Wa||(Wa=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=tf}(Fr)),Fr}var rf=cp;Object.defineProperty(Ro,"__esModule",{value:!0});var wi=Ro.default=void 0,of=rf(nf()),af=l;wi=Ro.default=(0,of.default)((0,af.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function xi(e){return typeof e=="string"}function Tn(e,t,n){return e===void 0||xi(e)?t:P({},t,{ownerState:P({},t.ownerState,n)})}const sf={disableDefaultClasses:!1},lf=T.createContext(sf);function cf(e){const{disableDefaultClasses:t}=T.useContext(lf);return n=>t?"":e(n)}function ki(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function pf(e,t,n){return typeof e=="function"?e(t,n):e}function Xa(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function df(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:a}=e;if(!t){const d=Se(n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),h=P({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),u=P({},n,o,r);return d.length>0&&(u.className=d),Object.keys(h).length>0&&(u.style=h),{props:u,internalRef:void 0}}const s=ki(P({},o,r)),c=Xa(r),p=Xa(o),f=t(s),m=Se(f==null?void 0:f.className,n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),v=P({},f==null?void 0:f.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),g=P({},f,n,p,c);return m.length>0&&(g.className=m),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:f.ref}}const uf=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Bt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:a=!1}=e,s=me(e,uf),c=a?{}:pf(r,o),{props:p,internalRef:f}=df(P({},s,{externalSlotProps:c})),m=qe(f,c==null?void 0:c.ref,(t=e.additionalProps)==null?void 0:t.ref);return Tn(n,P({},p,{ref:m}),o)}const Ei="base";function ff(e){return`${Ei}--${e}`}function mf(e,t){return`${Ei}-${e}-${t}`}function Ni(e,t){const n=ui[t];return n?ff(n):mf(e,t)}function hf(e,t){const n={};return t.forEach(r=>{n[r]=Ni(e,r)}),n}const gf=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function bf(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function vf(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function yf(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||vf(e))}function wf(e){const t=[],n=[];return Array.from(e.querySelectorAll(gf)).forEach((r,o)=>{const a=bf(r);a===-1||!yf(r)||(a===0?t.push(r):n.push({documentOrder:o,tabIndex:a,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function xf(){return!0}function gr(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:a=wf,isEnabled:s=xf,open:c}=e,p=T.useRef(!1),f=T.useRef(null),m=T.useRef(null),v=T.useRef(null),g=T.useRef(null),d=T.useRef(!1),h=T.useRef(null),u=qe(t.ref,h),b=T.useRef(null);T.useEffect(()=>{!c||!h.current||(d.current=!n)},[n,c]),T.useEffect(()=>{if(!c||!h.current)return;const w=Oe(h.current);return h.current.contains(w.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),d.current&&h.current.focus()),()=>{o||(v.current&&v.current.focus&&(p.current=!0,v.current.focus()),v.current=null)}},[c]),T.useEffect(()=>{if(!c||!h.current)return;const w=Oe(h.current),k=C=>{b.current=C,!(r||!s()||C.key!=="Tab")&&w.activeElement===h.current&&C.shiftKey&&(p.current=!0,m.current&&m.current.focus())},y=()=>{const C=h.current;if(C===null)return;if(!w.hasFocus()||!s()||p.current){p.current=!1;return}if(C.contains(w.activeElement)||r&&w.activeElement!==f.current&&w.activeElement!==m.current)return;if(w.activeElement!==g.current)g.current=null;else if(g.current!==null)return;if(!d.current)return;let M=[];if((w.activeElement===f.current||w.activeElement===m.current)&&(M=a(h.current)),M.length>0){var A,z;const $=!!((A=b.current)!=null&&A.shiftKey&&((z=b.current)==null?void 0:z.key)==="Tab"),N=M[0],O=M[M.length-1];typeof N!="string"&&typeof O!="string"&&($?O.focus():N.focus())}else C.focus()};w.addEventListener("focusin",y),w.addEventListener("keydown",k,!0);const S=setInterval(()=>{w.activeElement&&w.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(S),w.removeEventListener("focusin",y),w.removeEventListener("keydown",k,!0)}},[n,r,o,s,c,a]);const x=w=>{v.current===null&&(v.current=w.relatedTarget),d.current=!0,g.current=w.target;const k=t.props.onFocus;k&&k(w)},R=w=>{v.current===null&&(v.current=w.relatedTarget),d.current=!0};return l.jsxs(T.Fragment,{children:[l.jsx("div",{tabIndex:c?0:-1,onFocus:R,ref:f,"data-testid":"sentinelStart"}),T.cloneElement(t,{ref:u,onFocus:x}),l.jsx("div",{tabIndex:c?0:-1,onFocus:R,ref:m,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(gr.propTypes={children:qn,disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableRestoreFocus:i.bool,getTabbable:i.func,isEnabled:i.func,open:i.bool.isRequired});process.env.NODE_ENV!=="production"&&(gr["propTypes"]=ei(gr.propTypes));function kf(e){return typeof e=="function"?e():e}const An=T.forwardRef(function(t,n){const{children:r,container:o,disablePortal:a=!1}=t,[s,c]=T.useState(null),p=qe(T.isValidElement(r)?r.ref:null,n);if(Dt(()=>{a||c(kf(o)||document.body)},[o,a]),Dt(()=>{if(s&&!a)return fr(n,s),()=>{fr(n,null)}},[n,s,a]),a){if(T.isValidElement(r)){const f={ref:p};return T.cloneElement(r,f)}return l.jsx(T.Fragment,{children:r})}return l.jsx(T.Fragment,{children:s&&pc.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&(An.propTypes={children:i.node,container:i.oneOfType([pt,i.func]),disablePortal:i.bool});process.env.NODE_ENV!=="production"&&(An["propTypes"]=ei(An.propTypes));function Ef(e){const t=Oe(e);return t.body===e?en(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function jn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Ya(e){return parseInt(en(e).getComputedStyle(e).paddingRight,10)||0}function Nf(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Ka(e,t,n,r,o){const a=[t,n,...r];[].forEach.call(e.children,s=>{const c=a.indexOf(s)===-1,p=!Nf(s);c&&p&&jn(s,o)})}function Kr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function Tf(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(Ef(r)){const s=si(Oe(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Ya(r)+s}px`;const c=Oe(r).querySelectorAll(".mui-fixed");[].forEach.call(c,p=>{n.push({value:p.style.paddingRight,property:"padding-right",el:p}),p.style.paddingRight=`${Ya(p)+s}px`})}let a;if(r.parentNode instanceof DocumentFragment)a=Oe(r).body;else{const s=r.parentElement,c=en(r);a=(s==null?void 0:s.nodeName)==="HTML"&&c.getComputedStyle(s).overflowY==="scroll"?s:r}n.push({value:a.style.overflow,property:"overflow",el:a},{value:a.style.overflowX,property:"overflow-x",el:a},{value:a.style.overflowY,property:"overflow-y",el:a}),a.style.overflow="hidden"}return()=>{n.forEach(({value:a,el:s,property:c})=>{a?s.style.setProperty(c,a):s.style.removeProperty(c)})}}function Sf(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class Cf{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&jn(t.modalRef,!1);const o=Sf(n);Ka(n,t.mount,t.modalRef,o,!0);const a=Kr(this.containers,s=>s.container===n);return a!==-1?(this.containers[a].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=Kr(this.containers,a=>a.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=Tf(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=Kr(this.containers,s=>s.modals.indexOf(t)!==-1),a=this.containers[o];if(a.modals.splice(a.modals.indexOf(t),1),this.modals.splice(r,1),a.modals.length===0)a.restore&&a.restore(),t.modalRef&&jn(t.modalRef,n),Ka(a.container,t.mount,t.modalRef,a.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=a.modals[a.modals.length-1];s.modalRef&&jn(s.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Of(e){return typeof e=="function"?e():e}function jf(e){return e?e.props.hasOwnProperty("in"):!1}const Rf=new Cf;function Pf(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Rf,closeAfterTransition:a=!1,onTransitionEnter:s,onTransitionExited:c,children:p,onClose:f,open:m,rootRef:v}=e,g=T.useRef({}),d=T.useRef(null),h=T.useRef(null),u=qe(h,v),[b,x]=T.useState(!m),R=jf(p);let w=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(w=!1);const k=()=>Oe(d.current),y=()=>(g.current.modalRef=h.current,g.current.mount=d.current,g.current),S=()=>{o.mount(y(),{disableScrollLock:r}),h.current&&(h.current.scrollTop=0)},C=In(()=>{const B=Of(t)||k().body;o.add(y(),B),h.current&&S()}),M=T.useCallback(()=>o.isTopModal(y()),[o]),A=In(B=>{d.current=B,B&&(m&&M()?S():h.current&&jn(h.current,w))}),z=T.useCallback(()=>{o.remove(y(),w)},[w,o]);T.useEffect(()=>()=>{z()},[z]),T.useEffect(()=>{m?C():(!R||!a)&&z()},[m,z,R,a,C]);const $=B=>L=>{var J;(J=B.onKeyDown)==null||J.call(B,L),!(L.key!=="Escape"||L.which===229||!M())&&(n||(L.stopPropagation(),f&&f(L,"escapeKeyDown")))},N=B=>L=>{var J;(J=B.onClick)==null||J.call(B,L),L.target===L.currentTarget&&f&&f(L,"backdropClick")};return{getRootProps:(B={})=>{const L=ki(e);delete L.onTransitionEnter,delete L.onTransitionExited;const J=P({},L,B);return P({role:"presentation"},J,{onKeyDown:$(J),ref:u})},getBackdropProps:(B={})=>{const L=B;return P({"aria-hidden":!0},L,{onClick:N(L),open:m})},getTransitionProps:()=>{const B=()=>{x(!1),s&&s()},L=()=>{x(!0),c&&c(),a&&z()};return{onEnter:co(B,p==null?void 0:p.props.onEnter),onExited:co(L,p==null?void 0:p.props.onExited)}},rootRef:u,portalRef:A,isTopModal:M,exited:b,hasTransition:R}}var _e="top",We="bottom",Xe="right",Me="left",zo="auto",Kn=[_e,We,Xe,Me],tn="start",Bn="end",$f="clippingParents",Ti="viewport",vn="popper",_f="reference",Ja=Kn.reduce(function(e,t){return e.concat([t+"-"+tn,t+"-"+Bn])},[]),Si=[].concat(Kn,[zo]).reduce(function(e,t){return e.concat([t,t+"-"+tn,t+"-"+Bn])},[]),Mf="beforeRead",If="read",Df="afterRead",Af="beforeMain",Bf="main",Lf="afterMain",Vf="beforeWrite",Ff="write",zf="afterWrite",Uf=[Mf,If,Df,Af,Bf,Lf,Vf,Ff,zf];function tt(e){return e?(e.nodeName||"").toLowerCase():null}function Fe(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Lt(e){var t=Fe(e).Element;return e instanceof t||e instanceof Element}function Ge(e){var t=Fe(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Uo(e){if(typeof ShadowRoot>"u")return!1;var t=Fe(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Hf(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},a=t.elements[n];!Ge(a)||!tt(a)||(Object.assign(a.style,r),Object.keys(o).forEach(function(s){var c=o[s];c===!1?a.removeAttribute(s):a.setAttribute(s,c===!0?"":c)}))})}function Gf(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],a=t.attributes[r]||{},s=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),c=s.reduce(function(p,f){return p[f]="",p},{});!Ge(o)||!tt(o)||(Object.assign(o.style,c),Object.keys(a).forEach(function(p){o.removeAttribute(p)}))})}}const qf={name:"applyStyles",enabled:!0,phase:"write",fn:Hf,effect:Gf,requires:["computeStyles"]};function Ze(e){return e.split("-")[0]}var _t=Math.max,br=Math.min,nn=Math.round;function fo(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ci(){return!/^((?!chrome|android).)*safari/i.test(fo())}function rn(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,a=1;t&&Ge(e)&&(o=e.offsetWidth>0&&nn(r.width)/e.offsetWidth||1,a=e.offsetHeight>0&&nn(r.height)/e.offsetHeight||1);var s=Lt(e)?Fe(e):window,c=s.visualViewport,p=!Ci()&&n,f=(r.left+(p&&c?c.offsetLeft:0))/o,m=(r.top+(p&&c?c.offsetTop:0))/a,v=r.width/o,g=r.height/a;return{width:v,height:g,top:m,right:f+v,bottom:m+g,left:f,x:f,y:m}}function Ho(e){var t=rn(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Oi(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Uo(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function ut(e){return Fe(e).getComputedStyle(e)}function Wf(e){return["table","td","th"].indexOf(tt(e))>=0}function Et(e){return((Lt(e)?e.ownerDocument:e.document)||window.document).documentElement}function Mr(e){return tt(e)==="html"?e:e.assignedSlot||e.parentNode||(Uo(e)?e.host:null)||Et(e)}function Za(e){return!Ge(e)||ut(e).position==="fixed"?null:e.offsetParent}function Xf(e){var t=/firefox/i.test(fo()),n=/Trident/i.test(fo());if(n&&Ge(e)){var r=ut(e);if(r.position==="fixed")return null}var o=Mr(e);for(Uo(o)&&(o=o.host);Ge(o)&&["html","body"].indexOf(tt(o))<0;){var a=ut(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function Jn(e){for(var t=Fe(e),n=Za(e);n&&Wf(n)&&ut(n).position==="static";)n=Za(n);return n&&(tt(n)==="html"||tt(n)==="body"&&ut(n).position==="static")?t:n||Xf(e)||t}function Go(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Rn(e,t,n){return _t(e,br(t,n))}function Yf(e,t,n){var r=Rn(e,t,n);return r>n?n:r}function ji(){return{top:0,right:0,bottom:0,left:0}}function Ri(e){return Object.assign({},ji(),e)}function Pi(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Kf=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Ri(typeof t!="number"?t:Pi(t,Kn))};function Jf(e){var t,n=e.state,r=e.name,o=e.options,a=n.elements.arrow,s=n.modifiersData.popperOffsets,c=Ze(n.placement),p=Go(c),f=[Me,Xe].indexOf(c)>=0,m=f?"height":"width";if(!(!a||!s)){var v=Kf(o.padding,n),g=Ho(a),d=p==="y"?_e:Me,h=p==="y"?We:Xe,u=n.rects.reference[m]+n.rects.reference[p]-s[p]-n.rects.popper[m],b=s[p]-n.rects.reference[p],x=Jn(a),R=x?p==="y"?x.clientHeight||0:x.clientWidth||0:0,w=u/2-b/2,k=v[d],y=R-g[m]-v[h],S=R/2-g[m]/2+w,C=Rn(k,S,y),M=p;n.modifiersData[r]=(t={},t[M]=C,t.centerOffset=C-S,t)}}function Zf(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Oi(t.elements.popper,o)&&(t.elements.arrow=o))}const Qf={name:"arrow",enabled:!0,phase:"main",fn:Jf,effect:Zf,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function on(e){return e.split("-")[1]}var em={top:"auto",right:"auto",bottom:"auto",left:"auto"};function tm(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:nn(n*o)/o||0,y:nn(r*o)/o||0}}function Qa(e){var t,n=e.popper,r=e.popperRect,o=e.placement,a=e.variation,s=e.offsets,c=e.position,p=e.gpuAcceleration,f=e.adaptive,m=e.roundOffsets,v=e.isFixed,g=s.x,d=g===void 0?0:g,h=s.y,u=h===void 0?0:h,b=typeof m=="function"?m({x:d,y:u}):{x:d,y:u};d=b.x,u=b.y;var x=s.hasOwnProperty("x"),R=s.hasOwnProperty("y"),w=Me,k=_e,y=window;if(f){var S=Jn(n),C="clientHeight",M="clientWidth";if(S===Fe(n)&&(S=Et(n),ut(S).position!=="static"&&c==="absolute"&&(C="scrollHeight",M="scrollWidth")),S=S,o===_e||(o===Me||o===Xe)&&a===Bn){k=We;var A=v&&S===y&&y.visualViewport?y.visualViewport.height:S[C];u-=A-r.height,u*=p?1:-1}if(o===Me||(o===_e||o===We)&&a===Bn){w=Xe;var z=v&&S===y&&y.visualViewport?y.visualViewport.width:S[M];d-=z-r.width,d*=p?1:-1}}var $=Object.assign({position:c},f&&em),N=m===!0?tm({x:d,y:u},Fe(n)):{x:d,y:u};if(d=N.x,u=N.y,p){var O;return Object.assign({},$,(O={},O[k]=R?"0":"",O[w]=x?"0":"",O.transform=(y.devicePixelRatio||1)<=1?"translate("+d+"px, "+u+"px)":"translate3d("+d+"px, "+u+"px, 0)",O))}return Object.assign({},$,(t={},t[k]=R?u+"px":"",t[w]=x?d+"px":"",t.transform="",t))}function nm(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,a=n.adaptive,s=a===void 0?!0:a,c=n.roundOffsets,p=c===void 0?!0:c,f={placement:Ze(t.placement),variation:on(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Qa(Object.assign({},f,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:p})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Qa(Object.assign({},f,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:p})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const rm={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:nm,data:{}};var or={passive:!0};function om(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,a=o===void 0?!0:o,s=r.resize,c=s===void 0?!0:s,p=Fe(t.elements.popper),f=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&f.forEach(function(m){m.addEventListener("scroll",n.update,or)}),c&&p.addEventListener("resize",n.update,or),function(){a&&f.forEach(function(m){m.removeEventListener("scroll",n.update,or)}),c&&p.removeEventListener("resize",n.update,or)}}const am={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:om,data:{}};var sm={left:"right",right:"left",bottom:"top",top:"bottom"};function cr(e){return e.replace(/left|right|bottom|top/g,function(t){return sm[t]})}var im={start:"end",end:"start"};function es(e){return e.replace(/start|end/g,function(t){return im[t]})}function qo(e){var t=Fe(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Wo(e){return rn(Et(e)).left+qo(e).scrollLeft}function lm(e,t){var n=Fe(e),r=Et(e),o=n.visualViewport,a=r.clientWidth,s=r.clientHeight,c=0,p=0;if(o){a=o.width,s=o.height;var f=Ci();(f||!f&&t==="fixed")&&(c=o.offsetLeft,p=o.offsetTop)}return{width:a,height:s,x:c+Wo(e),y:p}}function cm(e){var t,n=Et(e),r=qo(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=_t(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=_t(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),c=-r.scrollLeft+Wo(e),p=-r.scrollTop;return ut(o||n).direction==="rtl"&&(c+=_t(n.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:c,y:p}}function Xo(e){var t=ut(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function $i(e){return["html","body","#document"].indexOf(tt(e))>=0?e.ownerDocument.body:Ge(e)&&Xo(e)?e:$i(Mr(e))}function Pn(e,t){var n;t===void 0&&(t=[]);var r=$i(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),a=Fe(r),s=o?[a].concat(a.visualViewport||[],Xo(r)?r:[]):r,c=t.concat(s);return o?c:c.concat(Pn(Mr(s)))}function mo(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function pm(e,t){var n=rn(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function ts(e,t,n){return t===Ti?mo(lm(e,n)):Lt(t)?pm(t,n):mo(cm(Et(e)))}function dm(e){var t=Pn(Mr(e)),n=["absolute","fixed"].indexOf(ut(e).position)>=0,r=n&&Ge(e)?Jn(e):e;return Lt(r)?t.filter(function(o){return Lt(o)&&Oi(o,r)&&tt(o)!=="body"}):[]}function um(e,t,n,r){var o=t==="clippingParents"?dm(e):[].concat(t),a=[].concat(o,[n]),s=a[0],c=a.reduce(function(p,f){var m=ts(e,f,r);return p.top=_t(m.top,p.top),p.right=br(m.right,p.right),p.bottom=br(m.bottom,p.bottom),p.left=_t(m.left,p.left),p},ts(e,s,r));return c.width=c.right-c.left,c.height=c.bottom-c.top,c.x=c.left,c.y=c.top,c}function _i(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ze(r):null,a=r?on(r):null,s=t.x+t.width/2-n.width/2,c=t.y+t.height/2-n.height/2,p;switch(o){case _e:p={x:s,y:t.y-n.height};break;case We:p={x:s,y:t.y+t.height};break;case Xe:p={x:t.x+t.width,y:c};break;case Me:p={x:t.x-n.width,y:c};break;default:p={x:t.x,y:t.y}}var f=o?Go(o):null;if(f!=null){var m=f==="y"?"height":"width";switch(a){case tn:p[f]=p[f]-(t[m]/2-n[m]/2);break;case Bn:p[f]=p[f]+(t[m]/2-n[m]/2);break}}return p}function Ln(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,a=n.strategy,s=a===void 0?e.strategy:a,c=n.boundary,p=c===void 0?$f:c,f=n.rootBoundary,m=f===void 0?Ti:f,v=n.elementContext,g=v===void 0?vn:v,d=n.altBoundary,h=d===void 0?!1:d,u=n.padding,b=u===void 0?0:u,x=Ri(typeof b!="number"?b:Pi(b,Kn)),R=g===vn?_f:vn,w=e.rects.popper,k=e.elements[h?R:g],y=um(Lt(k)?k:k.contextElement||Et(e.elements.popper),p,m,s),S=rn(e.elements.reference),C=_i({reference:S,element:w,strategy:"absolute",placement:o}),M=mo(Object.assign({},w,C)),A=g===vn?M:S,z={top:y.top-A.top+x.top,bottom:A.bottom-y.bottom+x.bottom,left:y.left-A.left+x.left,right:A.right-y.right+x.right},$=e.modifiersData.offset;if(g===vn&&$){var N=$[o];Object.keys(z).forEach(function(O){var _=[Xe,We].indexOf(O)>=0?1:-1,U=[_e,We].indexOf(O)>=0?"y":"x";z[O]+=N[U]*_})}return z}function fm(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,a=n.rootBoundary,s=n.padding,c=n.flipVariations,p=n.allowedAutoPlacements,f=p===void 0?Si:p,m=on(r),v=m?c?Ja:Ja.filter(function(h){return on(h)===m}):Kn,g=v.filter(function(h){return f.indexOf(h)>=0});g.length===0&&(g=v);var d=g.reduce(function(h,u){return h[u]=Ln(e,{placement:u,boundary:o,rootBoundary:a,padding:s})[Ze(u)],h},{});return Object.keys(d).sort(function(h,u){return d[h]-d[u]})}function mm(e){if(Ze(e)===zo)return[];var t=cr(e);return[es(e),t,es(t)]}function hm(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,a=o===void 0?!0:o,s=n.altAxis,c=s===void 0?!0:s,p=n.fallbackPlacements,f=n.padding,m=n.boundary,v=n.rootBoundary,g=n.altBoundary,d=n.flipVariations,h=d===void 0?!0:d,u=n.allowedAutoPlacements,b=t.options.placement,x=Ze(b),R=x===b,w=p||(R||!h?[cr(b)]:mm(b)),k=[b].concat(w).reduce(function(G,q){return G.concat(Ze(q)===zo?fm(t,{placement:q,boundary:m,rootBoundary:v,padding:f,flipVariations:h,allowedAutoPlacements:u}):q)},[]),y=t.rects.reference,S=t.rects.popper,C=new Map,M=!0,A=k[0],z=0;z<k.length;z++){var $=k[z],N=Ze($),O=on($)===tn,_=[_e,We].indexOf(N)>=0,U=_?"width":"height",B=Ln(t,{placement:$,boundary:m,rootBoundary:v,altBoundary:g,padding:f}),L=_?O?Xe:Me:O?We:_e;y[U]>S[U]&&(L=cr(L));var J=cr(L),Z=[];if(a&&Z.push(B[N]<=0),c&&Z.push(B[L]<=0,B[J]<=0),Z.every(function(G){return G})){A=$,M=!1;break}C.set($,Z)}if(M)for(var j=h?3:1,I=function(q){var X=k.find(function(Y){var W=C.get(Y);if(W)return W.slice(0,q).every(function(Q){return Q})});if(X)return A=X,"break"},H=j;H>0;H--){var K=I(H);if(K==="break")break}t.placement!==A&&(t.modifiersData[r]._skip=!0,t.placement=A,t.reset=!0)}}const gm={name:"flip",enabled:!0,phase:"main",fn:hm,requiresIfExists:["offset"],data:{_skip:!1}};function ns(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function rs(e){return[_e,Xe,We,Me].some(function(t){return e[t]>=0})}function bm(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,s=Ln(t,{elementContext:"reference"}),c=Ln(t,{altBoundary:!0}),p=ns(s,r),f=ns(c,o,a),m=rs(p),v=rs(f);t.modifiersData[n]={referenceClippingOffsets:p,popperEscapeOffsets:f,isReferenceHidden:m,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":m,"data-popper-escaped":v})}const vm={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:bm};function ym(e,t,n){var r=Ze(e),o=[Me,_e].indexOf(r)>=0?-1:1,a=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,s=a[0],c=a[1];return s=s||0,c=(c||0)*o,[Me,Xe].indexOf(r)>=0?{x:c,y:s}:{x:s,y:c}}function wm(e){var t=e.state,n=e.options,r=e.name,o=n.offset,a=o===void 0?[0,0]:o,s=Si.reduce(function(m,v){return m[v]=ym(v,t.rects,a),m},{}),c=s[t.placement],p=c.x,f=c.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=p,t.modifiersData.popperOffsets.y+=f),t.modifiersData[r]=s}const xm={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:wm};function km(e){var t=e.state,n=e.name;t.modifiersData[n]=_i({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Em={name:"popperOffsets",enabled:!0,phase:"read",fn:km,data:{}};function Nm(e){return e==="x"?"y":"x"}function Tm(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,a=o===void 0?!0:o,s=n.altAxis,c=s===void 0?!1:s,p=n.boundary,f=n.rootBoundary,m=n.altBoundary,v=n.padding,g=n.tether,d=g===void 0?!0:g,h=n.tetherOffset,u=h===void 0?0:h,b=Ln(t,{boundary:p,rootBoundary:f,padding:v,altBoundary:m}),x=Ze(t.placement),R=on(t.placement),w=!R,k=Go(x),y=Nm(k),S=t.modifiersData.popperOffsets,C=t.rects.reference,M=t.rects.popper,A=typeof u=="function"?u(Object.assign({},t.rects,{placement:t.placement})):u,z=typeof A=="number"?{mainAxis:A,altAxis:A}:Object.assign({mainAxis:0,altAxis:0},A),$=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,N={x:0,y:0};if(S){if(a){var O,_=k==="y"?_e:Me,U=k==="y"?We:Xe,B=k==="y"?"height":"width",L=S[k],J=L+b[_],Z=L-b[U],j=d?-M[B]/2:0,I=R===tn?C[B]:M[B],H=R===tn?-M[B]:-C[B],K=t.elements.arrow,G=d&&K?Ho(K):{width:0,height:0},q=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:ji(),X=q[_],Y=q[U],W=Rn(0,C[B],G[B]),Q=w?C[B]/2-j-W-X-z.mainAxis:I-W-X-z.mainAxis,ee=w?-C[B]/2+j+W+Y+z.mainAxis:H+W+Y+z.mainAxis,se=t.elements.arrow&&Jn(t.elements.arrow),V=se?k==="y"?se.clientTop||0:se.clientLeft||0:0,te=(O=$==null?void 0:$[k])!=null?O:0,D=L+Q-te-V,ie=L+ee-te,Ne=Rn(d?br(J,D):J,L,d?_t(Z,ie):Z);S[k]=Ne,N[k]=Ne-L}if(c){var Re,xe=k==="x"?_e:Me,Nt=k==="x"?We:Xe,Pe=S[y],ot=y==="y"?"height":"width",Ae=Pe+b[xe],at=Pe-b[Nt],Te=[_e,Me].indexOf(x)!==-1,Vt=(Re=$==null?void 0:$[y])!=null?Re:0,Tt=Te?Ae:Pe-C[ot]-M[ot]-Vt+z.altAxis,pn=Te?Pe+C[ot]+M[ot]-Vt-z.altAxis:at,Qn=d&&Te?Yf(Tt,Pe,pn):Rn(d?Tt:Ae,Pe,d?pn:at);S[y]=Qn,N[y]=Qn-Pe}t.modifiersData[r]=N}}const Sm={name:"preventOverflow",enabled:!0,phase:"main",fn:Tm,requiresIfExists:["offset"]};function Cm(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Om(e){return e===Fe(e)||!Ge(e)?qo(e):Cm(e)}function jm(e){var t=e.getBoundingClientRect(),n=nn(t.width)/e.offsetWidth||1,r=nn(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Rm(e,t,n){n===void 0&&(n=!1);var r=Ge(t),o=Ge(t)&&jm(t),a=Et(t),s=rn(e,o,n),c={scrollLeft:0,scrollTop:0},p={x:0,y:0};return(r||!r&&!n)&&((tt(t)!=="body"||Xo(a))&&(c=Om(t)),Ge(t)?(p=rn(t,!0),p.x+=t.clientLeft,p.y+=t.clientTop):a&&(p.x=Wo(a))),{x:s.left+c.scrollLeft-p.x,y:s.top+c.scrollTop-p.y,width:s.width,height:s.height}}function Pm(e){var t=new Map,n=new Set,r=[];e.forEach(function(a){t.set(a.name,a)});function o(a){n.add(a.name);var s=[].concat(a.requires||[],a.requiresIfExists||[]);s.forEach(function(c){if(!n.has(c)){var p=t.get(c);p&&o(p)}}),r.push(a)}return e.forEach(function(a){n.has(a.name)||o(a)}),r}function $m(e){var t=Pm(e);return Uf.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function _m(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Mm(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var os={placement:"bottom",modifiers:[],strategy:"absolute"};function as(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Im(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,a=o===void 0?os:o;return function(c,p,f){f===void 0&&(f=a);var m={placement:"bottom",orderedModifiers:[],options:Object.assign({},os,a),modifiersData:{},elements:{reference:c,popper:p},attributes:{},styles:{}},v=[],g=!1,d={state:m,setOptions:function(x){var R=typeof x=="function"?x(m.options):x;u(),m.options=Object.assign({},a,m.options,R),m.scrollParents={reference:Lt(c)?Pn(c):c.contextElement?Pn(c.contextElement):[],popper:Pn(p)};var w=$m(Mm([].concat(r,m.options.modifiers)));return m.orderedModifiers=w.filter(function(k){return k.enabled}),h(),d.update()},forceUpdate:function(){if(!g){var x=m.elements,R=x.reference,w=x.popper;if(as(R,w)){m.rects={reference:Rm(R,Jn(w),m.options.strategy==="fixed"),popper:Ho(w)},m.reset=!1,m.placement=m.options.placement,m.orderedModifiers.forEach(function(z){return m.modifiersData[z.name]=Object.assign({},z.data)});for(var k=0;k<m.orderedModifiers.length;k++){if(m.reset===!0){m.reset=!1,k=-1;continue}var y=m.orderedModifiers[k],S=y.fn,C=y.options,M=C===void 0?{}:C,A=y.name;typeof S=="function"&&(m=S({state:m,options:M,name:A,instance:d})||m)}}}},update:_m(function(){return new Promise(function(b){d.forceUpdate(),b(m)})}),destroy:function(){u(),g=!0}};if(!as(c,p))return d;d.setOptions(f).then(function(b){!g&&f.onFirstUpdate&&f.onFirstUpdate(b)});function h(){m.orderedModifiers.forEach(function(b){var x=b.name,R=b.options,w=R===void 0?{}:R,k=b.effect;if(typeof k=="function"){var y=k({state:m,name:x,instance:d,options:w}),S=function(){};v.push(y||S)}})}function u(){v.forEach(function(b){return b()}),v=[]}return d}}var Dm=[am,Em,rm,qf,xm,gm,Sm,Qf,vm],Am=Im({defaultModifiers:Dm});const Mi="Popper";function Bm(e){return Ni(Mi,e)}hf(Mi,["root"]);const Lm=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Vm=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Fm(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function vr(e){return typeof e=="function"?e():e}function Ir(e){return e.nodeType!==void 0}function zm(e){return!Ir(e)}const Um=()=>ft({root:["root"]},cf(Bm)),Hm={},Gm=T.forwardRef(function(t,n){var r;const{anchorEl:o,children:a,direction:s,disablePortal:c,modifiers:p,open:f,placement:m,popperOptions:v,popperRef:g,slotProps:d={},slots:h={},TransitionProps:u}=t,b=me(t,Lm),x=T.useRef(null),R=qe(x,n),w=T.useRef(null),k=qe(w,g),y=T.useRef(k);Dt(()=>{y.current=k},[k]),T.useImperativeHandle(g,()=>w.current,[]);const S=Fm(m,s),[C,M]=T.useState(S),[A,z]=T.useState(vr(o));T.useEffect(()=>{w.current&&w.current.forceUpdate()}),T.useEffect(()=>{o&&z(vr(o))},[o]),Dt(()=>{if(!A||!f)return;const U=J=>{M(J.placement)};if(process.env.NODE_ENV!=="production"&&A&&Ir(A)&&A.nodeType===1){const J=A.getBoundingClientRect();process.env.NODE_ENV!=="test"&&J.top===0&&J.left===0&&J.right===0&&J.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let B=[{name:"preventOverflow",options:{altBoundary:c}},{name:"flip",options:{altBoundary:c}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:J})=>{U(J)}}];p!=null&&(B=B.concat(p)),v&&v.modifiers!=null&&(B=B.concat(v.modifiers));const L=Am(A,x.current,P({placement:S},v,{modifiers:B}));return y.current(L),()=>{L.destroy(),y.current(null)}},[A,c,p,f,v,S]);const $={placement:C};u!==null&&($.TransitionProps=u);const N=Um(),O=(r=h.root)!=null?r:"div",_=Bt({elementType:O,externalSlotProps:d.root,externalForwardedProps:b,additionalProps:{role:"tooltip",ref:R},ownerState:t,className:N.root});return l.jsx(O,P({},_,{children:typeof a=="function"?a($):a}))}),Ii=T.forwardRef(function(t,n){const{anchorEl:r,children:o,container:a,direction:s="ltr",disablePortal:c=!1,keepMounted:p=!1,modifiers:f,open:m,placement:v="bottom",popperOptions:g=Hm,popperRef:d,style:h,transition:u=!1,slotProps:b={},slots:x={}}=t,R=me(t,Vm),[w,k]=T.useState(!0),y=()=>{k(!1)},S=()=>{k(!0)};if(!p&&!m&&(!u||w))return null;let C;if(a)C=a;else if(r){const z=vr(r);C=z&&Ir(z)?Oe(z).body:Oe(null).body}const M=!m&&p&&(!u||w)?"none":void 0,A=u?{in:m,onEnter:y,onExited:S}:void 0;return l.jsx(An,{disablePortal:c,container:C,children:l.jsx(Gm,P({anchorEl:r,direction:s,disablePortal:c,modifiers:f,ref:n,open:u?!w:m,placement:v,popperOptions:g,popperRef:d,slotProps:b,slots:x},R,{style:P({position:"fixed",top:0,left:0,display:M},h),TransitionProps:A,children:o}))})});process.env.NODE_ENV!=="production"&&(Ii.propTypes={anchorEl:ln(i.oneOfType([pt,i.object,i.func]),e=>{if(e.open){const t=vr(e.anchorEl);if(t&&Ir(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||zm(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:i.oneOfType([i.node,i.func]),container:i.oneOfType([pt,i.func]),direction:i.oneOf(["ltr","rtl"]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:$o,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),transition:i.bool});function Zn(){const e=bi(Lo);return process.env.NODE_ENV!=="production"&&T.useDebugValue(e),e[Vo]||e}function ho(e,t){return ho=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},ho(e,t)}function qm(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,ho(e,t)}const ss={disabled:!1};var Wm=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.shape({enter:i.number,exit:i.number,appear:i.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&i.oneOfType([i.string,i.shape({enter:i.string,exit:i.string,active:i.string}),i.shape({enter:i.string,enterDone:i.string,enterActive:i.string,exit:i.string,exitDone:i.string,exitActive:i.string})]);const Di=E.createContext(null);var Xm=function(t){return t.scrollTop},Sn="unmounted",Ct="exited",Ot="entering",Xt="entered",go="exiting",ht=function(e){qm(t,e);function t(r,o){var a;a=e.call(this,r,o)||this;var s=o,c=s&&!s.isMounting?r.enter:r.appear,p;return a.appearStatus=null,r.in?c?(p=Ct,a.appearStatus=Ot):p=Xt:r.unmountOnExit||r.mountOnEnter?p=Sn:p=Ct,a.state={status:p},a.nextCallback=null,a}t.getDerivedStateFromProps=function(o,a){var s=o.in;return s&&a.status===Sn?{status:Ct}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var a=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==Ot&&s!==Xt&&(a=Ot):(s===Ot||s===Xt)&&(a=go)}this.updateStatus(!1,a)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,a,s,c;return a=s=c=o,o!=null&&typeof o!="number"&&(a=o.exit,s=o.enter,c=o.appear!==void 0?o.appear:s),{exit:a,enter:s,appear:c}},n.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===Ot){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:kn.findDOMNode(this);s&&Xm(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Ct&&this.setState({status:Sn})},n.performEnter=function(o){var a=this,s=this.props.enter,c=this.context?this.context.isMounting:o,p=this.props.nodeRef?[c]:[kn.findDOMNode(this),c],f=p[0],m=p[1],v=this.getTimeouts(),g=c?v.appear:v.enter;if(!o&&!s||ss.disabled){this.safeSetState({status:Xt},function(){a.props.onEntered(f)});return}this.props.onEnter(f,m),this.safeSetState({status:Ot},function(){a.props.onEntering(f,m),a.onTransitionEnd(g,function(){a.safeSetState({status:Xt},function(){a.props.onEntered(f,m)})})})},n.performExit=function(){var o=this,a=this.props.exit,s=this.getTimeouts(),c=this.props.nodeRef?void 0:kn.findDOMNode(this);if(!a||ss.disabled){this.safeSetState({status:Ct},function(){o.props.onExited(c)});return}this.props.onExit(c),this.safeSetState({status:go},function(){o.props.onExiting(c),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:Ct},function(){o.props.onExited(c)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},n.setNextCallback=function(o){var a=this,s=!0;return this.nextCallback=function(c){s&&(s=!1,a.nextCallback=null,o(c))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},n.onTransitionEnd=function(o,a){this.setNextCallback(a);var s=this.props.nodeRef?this.props.nodeRef.current:kn.findDOMNode(this),c=o==null&&!this.props.addEndListener;if(!s||c){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var p=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],f=p[0],m=p[1];this.props.addEndListener(f,m)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===Sn)return null;var a=this.props,s=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var c=me(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return E.createElement(Di.Provider,{value:null},typeof s=="function"?s(o,c):E.cloneElement(E.Children.only(s),c))},t}(E.Component);ht.contextType=Di;ht.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:i.shape({current:typeof Element>"u"?i.any:function(e,t,n,r,o,a){var s=e[t];return i.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,a)}}),children:i.oneOfType([i.func.isRequired,i.element.isRequired]).isRequired,in:i.bool,mountOnEnter:i.bool,unmountOnExit:i.bool,appear:i.bool,enter:i.bool,exit:i.bool,timeout:function(t){var n=Wm;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),a=1;a<r;a++)o[a-1]=arguments[a];return n.apply(void 0,[t].concat(o))},addEndListener:i.func,onEnter:i.func,onEntering:i.func,onEntered:i.func,onExit:i.func,onExiting:i.func,onExited:i.func}:{};function qt(){}ht.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:qt,onEntering:qt,onEntered:qt,onExit:qt,onExiting:qt,onExited:qt};ht.UNMOUNTED=Sn;ht.EXITED=Ct;ht.ENTERING=Ot;ht.ENTERED=Xt;ht.EXITING=go;const Ai=ht,Bi=e=>e.scrollTop;function yr(e,t){var n,r;const{timeout:o,easing:a,style:s={}}=e;return{duration:(n=s.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof a=="object"?a[t.mode]:a,delay:s.transitionDelay}}const Ym=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function bo(e){return`scale(${e}, ${e**2})`}const Km={entering:{opacity:1,transform:bo(1)},entered:{opacity:1,transform:"none"}},Jr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Yo=T.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:a,easing:s,in:c,onEnter:p,onEntered:f,onEntering:m,onExit:v,onExited:g,onExiting:d,style:h,timeout:u="auto",TransitionComponent:b=Ai}=t,x=me(t,Ym),R=Nn(),w=T.useRef(),k=Zn(),y=T.useRef(null),S=qe(y,a.ref,n),C=U=>B=>{if(U){const L=y.current;B===void 0?U(L):U(L,B)}},M=C(m),A=C((U,B)=>{Bi(U);const{duration:L,delay:J,easing:Z}=yr({style:h,timeout:u,easing:s},{mode:"enter"});let j;u==="auto"?(j=k.transitions.getAutoHeightDuration(U.clientHeight),w.current=j):j=L,U.style.transition=[k.transitions.create("opacity",{duration:j,delay:J}),k.transitions.create("transform",{duration:Jr?j:j*.666,delay:J,easing:Z})].join(","),p&&p(U,B)}),z=C(f),$=C(d),N=C(U=>{const{duration:B,delay:L,easing:J}=yr({style:h,timeout:u,easing:s},{mode:"exit"});let Z;u==="auto"?(Z=k.transitions.getAutoHeightDuration(U.clientHeight),w.current=Z):Z=B,U.style.transition=[k.transitions.create("opacity",{duration:Z,delay:L}),k.transitions.create("transform",{duration:Jr?Z:Z*.666,delay:Jr?L:L||Z*.333,easing:J})].join(","),U.style.opacity=0,U.style.transform=bo(.75),v&&v(U)}),O=C(g),_=U=>{u==="auto"&&R.start(w.current||0,U),r&&r(y.current,U)};return l.jsx(b,P({appear:o,in:c,nodeRef:y,onEnter:A,onEntered:z,onEntering:M,onExit:N,onExited:O,onExiting:$,addEndListener:_,timeout:u==="auto"?null:u},x,{children:(U,B)=>T.cloneElement(a,P({style:P({opacity:0,transform:bo(.75),visibility:U==="exited"&&!c?"hidden":void 0},Km[U],h,a.props.style),ref:S},B))}))});process.env.NODE_ENV!=="production"&&(Yo.propTypes={addEndListener:i.func,appear:i.bool,children:qn.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});Yo.muiSupportAuto=!0;const vo=Yo,Jm=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},is=Jm,Zm=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Qm=je(Ii,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Li=T.forwardRef(function(t,n){var r;const o=gi(),a=mt({props:t,name:"MuiPopper"}),{anchorEl:s,component:c,components:p,componentsProps:f,container:m,disablePortal:v,keepMounted:g,modifiers:d,open:h,placement:u,popperOptions:b,popperRef:x,transition:R,slots:w,slotProps:k}=a,y=me(a,Zm),S=(r=w==null?void 0:w.root)!=null?r:p==null?void 0:p.Root,C=P({anchorEl:s,container:m,disablePortal:v,keepMounted:g,modifiers:d,open:h,placement:u,popperOptions:b,popperRef:x,transition:R},y);return l.jsx(Qm,P({as:c,direction:o==null?void 0:o.direction,slots:{root:S},slotProps:k??f},C,{ref:n}))});process.env.NODE_ENV!=="production"&&(Li.propTypes={anchorEl:i.oneOfType([pt,i.object,i.func]),children:i.oneOfType([i.node,i.func]),component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:$o,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transition:i.bool});const Vi=Li;function eh(e){return rt("MuiTooltip",e)}const th=xt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),wt=th,nh=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function rh(e){return Math.round(e*1e5)/1e5}const oh=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:a}=e,s={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${et(a.split("-")[0])}`],arrow:["arrow"]};return ft(s,eh,t)},ah=je(Vi,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>P({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${wt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${wt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${wt.arrow}`]:P({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${wt.arrow}`]:P({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),sh=je("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${et(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>P({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:hr(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${rh(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${wt.popper}[data-popper-placement*="left"] &`]:P({transformOrigin:"right center"},t.isRtl?P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):P({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${wt.popper}[data-popper-placement*="right"] &`]:P({transformOrigin:"left center"},t.isRtl?P({marginRight:"14px"},t.touch&&{marginRight:"24px"}):P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${wt.popper}[data-popper-placement*="top"] &`]:P({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${wt.popper}[data-popper-placement*="bottom"] &`]:P({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),ih=je("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:hr(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let ar=!1;const ls=new Wn;let yn={x:0,y:0};function sr(e,t){return n=>{t&&t(n),e(n)}}const Fi=T.forwardRef(function(t,n){var r,o,a,s,c,p,f,m,v,g,d,h,u,b,x,R,w,k,y;const S=mt({props:t,name:"MuiTooltip"}),{arrow:C=!1,children:M,components:A={},componentsProps:z={},describeChild:$=!1,disableFocusListener:N=!1,disableHoverListener:O=!1,disableInteractive:_=!1,disableTouchListener:U=!1,enterDelay:B=100,enterNextDelay:L=0,enterTouchDelay:J=700,followCursor:Z=!1,id:j,leaveDelay:I=0,leaveTouchDelay:H=1500,onClose:K,onOpen:G,open:q,placement:X="bottom",PopperComponent:Y,PopperProps:W={},slotProps:Q={},slots:ee={},title:se,TransitionComponent:V=vo,TransitionProps:te}=S,D=me(S,nh),ie=T.isValidElement(M)?M:l.jsx("span",{children:M}),Ne=Zn(),Re=Ne.direction==="rtl",[xe,Nt]=T.useState(),[Pe,ot]=T.useState(null),Ae=T.useRef(!1),at=_||Z,Te=Nn(),Vt=Nn(),Tt=Nn(),pn=Nn(),[Qn,ta]=oi({controlled:q,default:!1,name:"Tooltip",state:"open"});let st=Qn;if(process.env.NODE_ENV!=="production"){const{current:ne}=T.useRef(q!==void 0);T.useEffect(()=>{xe&&xe.disabled&&!ne&&se!==""&&xe.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[se,xe,ne])}const Dr=ri(j),dn=T.useRef(),er=In(()=>{dn.current!==void 0&&(document.body.style.WebkitUserSelect=dn.current,dn.current=void 0),pn.clear()});T.useEffect(()=>er,[er]);const na=ne=>{ls.clear(),ar=!0,ta(!0),G&&!st&&G(ne)},tr=In(ne=>{ls.start(800+I,()=>{ar=!1}),ta(!1),K&&st&&K(ne),Te.start(Ne.transitions.duration.shortest,()=>{Ae.current=!1})}),Ar=ne=>{Ae.current&&ne.type!=="touchstart"||(xe&&xe.removeAttribute("title"),Vt.clear(),Tt.clear(),B||ar&&L?Vt.start(ar?L:B,()=>{na(ne)}):na(ne))},ra=ne=>{Vt.clear(),Tt.start(I,()=>{tr(ne)})},{isFocusVisibleRef:oa,onBlur:Ul,onFocus:Hl,ref:Gl}=ai(),[,aa]=T.useState(!1),sa=ne=>{Ul(ne),oa.current===!1&&(aa(!1),ra(ne))},ia=ne=>{xe||Nt(ne.currentTarget),Hl(ne),oa.current===!0&&(aa(!0),Ar(ne))},la=ne=>{Ae.current=!0;const Be=ie.props;Be.onTouchStart&&Be.onTouchStart(ne)},ca=Ar,pa=ra,ql=ne=>{la(ne),Tt.clear(),Te.clear(),er(),dn.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",pn.start(J,()=>{document.body.style.WebkitUserSelect=dn.current,Ar(ne)})},Wl=ne=>{ie.props.onTouchEnd&&ie.props.onTouchEnd(ne),er(),Tt.start(H,()=>{tr(ne)})};T.useEffect(()=>{if(!st)return;function ne(Be){(Be.key==="Escape"||Be.key==="Esc")&&tr(Be)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[tr,st]);const Xl=qe(ie.ref,Gl,Nt,n);!se&&se!==0&&(st=!1);const Br=T.useRef(),Yl=ne=>{const Be=ie.props;Be.onMouseMove&&Be.onMouseMove(ne),yn={x:ne.clientX,y:ne.clientY},Br.current&&Br.current.update()},un={},Lr=typeof se=="string";$?(un.title=!st&&Lr&&!O?se:null,un["aria-describedby"]=st?Dr:null):(un["aria-label"]=Lr?se:null,un["aria-labelledby"]=st&&!Lr?Dr:null);const ze=P({},un,D,ie.props,{className:Se(D.className,ie.props.className),onTouchStart:la,ref:Xl},Z?{onMouseMove:Yl}:{});process.env.NODE_ENV!=="production"&&(ze["data-mui-internal-clone-element"]=!0,T.useEffect(()=>{xe&&!xe.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[xe]));const fn={};U||(ze.onTouchStart=ql,ze.onTouchEnd=Wl),O||(ze.onMouseOver=sr(ca,ze.onMouseOver),ze.onMouseLeave=sr(pa,ze.onMouseLeave),at||(fn.onMouseOver=ca,fn.onMouseLeave=pa)),N||(ze.onFocus=sr(ia,ze.onFocus),ze.onBlur=sr(sa,ze.onBlur),at||(fn.onFocus=ia,fn.onBlur=sa)),process.env.NODE_ENV!=="production"&&ie.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ie.props.title}\` or the Tooltip component.`].join(`
`));const Kl=T.useMemo(()=>{var ne;let Be=[{name:"arrow",enabled:!!Pe,options:{element:Pe,padding:4}}];return(ne=W.popperOptions)!=null&&ne.modifiers&&(Be=Be.concat(W.popperOptions.modifiers)),P({},W.popperOptions,{modifiers:Be})},[Pe,W]),mn=P({},S,{isRtl:Re,arrow:C,disableInteractive:at,placement:X,PopperComponentProp:Y,touch:Ae.current}),Vr=oh(mn),da=(r=(o=ee.popper)!=null?o:A.Popper)!=null?r:ah,ua=(a=(s=(c=ee.transition)!=null?c:A.Transition)!=null?s:V)!=null?a:vo,fa=(p=(f=ee.tooltip)!=null?f:A.Tooltip)!=null?p:sh,ma=(m=(v=ee.arrow)!=null?v:A.Arrow)!=null?m:ih,Jl=Tn(da,P({},W,(g=Q.popper)!=null?g:z.popper,{className:Se(Vr.popper,W==null?void 0:W.className,(d=(h=Q.popper)!=null?h:z.popper)==null?void 0:d.className)}),mn),Zl=Tn(ua,P({},te,(u=Q.transition)!=null?u:z.transition),mn),Ql=Tn(fa,P({},(b=Q.tooltip)!=null?b:z.tooltip,{className:Se(Vr.tooltip,(x=(R=Q.tooltip)!=null?R:z.tooltip)==null?void 0:x.className)}),mn),ec=Tn(ma,P({},(w=Q.arrow)!=null?w:z.arrow,{className:Se(Vr.arrow,(k=(y=Q.arrow)!=null?y:z.arrow)==null?void 0:k.className)}),mn);return l.jsxs(T.Fragment,{children:[T.cloneElement(ie,ze),l.jsx(da,P({as:Y??Vi,placement:X,anchorEl:Z?{getBoundingClientRect:()=>({top:yn.y,left:yn.x,right:yn.x,bottom:yn.y,width:0,height:0})}:xe,popperRef:Br,open:xe?st:!1,id:Dr,transition:!0},fn,Jl,{popperOptions:Kl,children:({TransitionProps:ne})=>l.jsx(ua,P({timeout:Ne.transitions.duration.shorter},ne,Zl,{children:l.jsxs(fa,P({},Ql,{children:[se,C?l.jsx(ma,P({},ec,{ref:ot})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Fi.propTypes={arrow:i.bool,children:qn.isRequired,classes:i.object,className:i.string,components:i.shape({Arrow:i.elementType,Popper:i.elementType,Tooltip:i.elementType,Transition:i.elementType}),componentsProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),describeChild:i.bool,disableFocusListener:i.bool,disableHoverListener:i.bool,disableInteractive:i.bool,disableTouchListener:i.bool,enterDelay:i.number,enterNextDelay:i.number,enterTouchDelay:i.number,followCursor:i.bool,id:i.string,leaveDelay:i.number,leaveTouchDelay:i.number,onClose:i.func,onOpen:i.func,open:i.bool,placement:i.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:i.elementType,PopperProps:i.object,slotProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),slots:i.shape({arrow:i.elementType,popper:i.elementType,tooltip:i.elementType,transition:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),title:i.node,TransitionComponent:i.elementType,TransitionProps:i.object});const lh=Fi;function cs(e,t,n){return e?l.jsx(Ee.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:l.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Ko(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:s=void 0,hasAutoFocus:c=!1,className:p,isDisabled:f=!1,isDense:m=!0,isSubMenuParent:v=!1,hasDisabledGutters:g=!1,hasDivider:d=!1,focusVisibleClassName:h,id:u,children:b}=e,x=l.jsx(Ee.MenuItem,{sx:{lineHeight:.8},autoFocus:c,className:p,disabled:f,dense:m,disableGutters:g,divider:d,focusVisibleClassName:h,onClick:t,id:u,children:n?l.jsxs(l.Fragment,{children:[cs(a,n,!0),l.jsx(Ee.ListItemText,{primary:n,inset:!a&&o}),v?l.jsx(Ee.ListItemIcon,{className:"papi-menu-icon-trailing",children:l.jsx(wi,{})}):cs(s,n,!1)]}):b});return r?l.jsx(lh,{title:r,placement:"right",children:l.jsx("div",{children:x})}):x}function zi(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function ch(e){const[t,n]=E.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:a}=e,s=f=>{n(f.currentTarget)},c=()=>{n(void 0)},p=()=>{let f=zi(a).filter(m=>"menuItem"in m.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return f=f.filter(m=>"menuItem"in m.group&&m.group.menuItem===r.id),l.jsx(Jo,{...e,includedGroups:f})};return l.jsxs(l.Fragment,{children:[l.jsx(Ko,{onClick:s,...o,isSubMenuParent:!0}),l.jsx(Ee.Menu,{anchorEl:t,open:!!t,onClose:c,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:p()},r.id)]})}const ph=(e,t)=>t.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function Jo(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:a,allowForLeadingIcons:s}=E.useMemo(()=>{const m=o&&o.length>0?o:zi(t).filter(h=>!("menuItem"in h.group)),v=Object.values(m).sort((h,u)=>(h.group.order||0)-(u.group.order||0)),g=[];v.forEach(h=>{ph(h.id,t.items).forEach(u=>g.push({item:u,isLastItemInGroup:!1})),g.length>0&&(g[g.length-1].isLastItemInGroup=!0)}),g.length>0&&(g[g.length-1].isLastItemInGroup=!1);const d=g.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:g,allowForLeadingIcons:d}},[o,t]),c=({item:m,isLastItemInGroup:v})=>({className:"papi-menu-item",label:m.label,tooltip:m.tooltip,iconPathBefore:"iconPathBefore"in m?m.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in m?m.iconPathAfter:void 0,hasDivider:v,allowForLeadingIcons:s}),[p]=a;if(!p)return l.jsx("div",{});const f=p.item.group;return l.jsx("div",{role:"menu","aria-label":f,children:a.map((m,v)=>{const{item:g}=m,d=c(m);if("command"in g){const h=g.group+v;return l.jsx(Ko,{onClick:u=>{n==null||n(u),r(g)},...d},h)}return l.jsx(ch,{parentMenuItem:g,parentItemProps:d,...e},f+g.id)})},f)}function dh(e){const{menuDefinition:t,columnId:n}=e;let a=Object.entries(t.groups).map(([s,c])=>({id:s,group:c})).filter(s=>"column"in s.group);return n&&"columns"in t&&t.columns[n]&&(a=a.filter(s=>"column"in s.group&&s.group.column===n)),l.jsx(Jo,{...e,includedGroups:a})}function uh({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:a}){return l.jsxs(Ee.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${a??""}`,children:[l.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${a??""}`,children:r.label}),l.jsx(Ee.List,{id:n,dense:!0,className:a??"",children:l.jsx(dh,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Ui({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,a=E.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(c=>{if(c==="isExtensible")return;const p=c,f=o[p];typeof f=="object"&&typeof f.order=="number"&&!Number.isNaN(f.order)?s.set(f.order,{id:p,metadata:f}):console.warn(`Property ${c} (${typeof f}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((c,p)=>(c.metadata.order||0)-(p.metadata.order||0))},[o,r]);return l.jsx(Ee.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:r,children:a.map((s,c)=>l.jsx(uh,{commandHandler:e,menuDefinition:n,...s,className:t},c))})}const Hi=T.createContext({});process.env.NODE_ENV!=="production"&&(Hi.displayName="ListContext");const fh=Hi;function mh(e){return rt("MuiList",e)}xt("MuiList",["root","padding","dense","subheader"]);const hh=["children","className","component","dense","disablePadding","subheader"],gh=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return ft({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},mh,t)},bh=je("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>P({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Gi=T.forwardRef(function(t,n){const r=mt({props:t,name:"MuiList"}),{children:o,className:a,component:s="ul",dense:c=!1,disablePadding:p=!1,subheader:f}=r,m=me(r,hh),v=T.useMemo(()=>({dense:c}),[c]),g=P({},r,{component:s,dense:c,disablePadding:p}),d=gh(g);return l.jsx(fh.Provider,{value:v,children:l.jsxs(bh,P({as:s,className:Se(d.root,a),ref:n,ownerState:g},m,{children:[f,o]}))})});process.env.NODE_ENV!=="production"&&(Gi.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,dense:i.bool,disablePadding:i.bool,subheader:i.node,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const vh=Gi,yh=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Zr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function ps(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function qi(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function wn(e,t,n,r,o,a){let s=!1,c=o(e,t,t?n:!1);for(;c;){if(c===e.firstChild){if(s)return!1;s=!0}const p=r?!1:c.disabled||c.getAttribute("aria-disabled")==="true";if(!c.hasAttribute("tabindex")||!qi(c,a)||p)c=o(e,c,n);else return c.focus(),!0}return!1}const Wi=T.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:a=!1,children:s,className:c,disabledItemsFocusable:p=!1,disableListWrap:f=!1,onKeyDown:m,variant:v="selectedMenu"}=t,g=me(t,yh),d=T.useRef(null),h=T.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Dt(()=>{o&&d.current.focus()},[o]),T.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(w,k)=>{const y=!d.current.style.width;if(w.clientHeight<d.current.clientHeight&&y){const S=`${si(Oe(w))}px`;d.current.style[k.direction==="rtl"?"paddingLeft":"paddingRight"]=S,d.current.style.width=`calc(100% + ${S})`}return d.current}}),[]);const u=w=>{const k=d.current,y=w.key,S=Oe(k).activeElement;if(y==="ArrowDown")w.preventDefault(),wn(k,S,f,p,Zr);else if(y==="ArrowUp")w.preventDefault(),wn(k,S,f,p,ps);else if(y==="Home")w.preventDefault(),wn(k,null,f,p,Zr);else if(y==="End")w.preventDefault(),wn(k,null,f,p,ps);else if(y.length===1){const C=h.current,M=y.toLowerCase(),A=performance.now();C.keys.length>0&&(A-C.lastTime>500?(C.keys=[],C.repeating=!0,C.previousKeyMatched=!0):C.repeating&&M!==C.keys[0]&&(C.repeating=!1)),C.lastTime=A,C.keys.push(M);const z=S&&!C.repeating&&qi(S,C);C.previousKeyMatched&&(z||wn(k,S,!1,p,Zr,C))?w.preventDefault():C.previousKeyMatched=!1}m&&m(w)},b=qe(d,n);let x=-1;T.Children.forEach(s,(w,k)=>{if(!T.isValidElement(w)){x===k&&(x+=1,x>=s.length&&(x=-1));return}process.env.NODE_ENV!=="production"&&ur.isFragment(w)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),w.props.disabled||(v==="selectedMenu"&&w.props.selected||x===-1)&&(x=k),x===k&&(w.props.disabled||w.props.muiSkipListHighlight||w.type.muiSkipListHighlight)&&(x+=1,x>=s.length&&(x=-1))});const R=T.Children.map(s,(w,k)=>{if(k===x){const y={};return a&&(y.autoFocus=!0),w.props.tabIndex===void 0&&v==="selectedMenu"&&(y.tabIndex=0),T.cloneElement(w,y)}return w});return l.jsx(vh,P({role:"menu",ref:b,className:c,onKeyDown:u,tabIndex:o?0:-1},g,{children:R}))});process.env.NODE_ENV!=="production"&&(Wi.propTypes={autoFocus:i.bool,autoFocusItem:i.bool,children:i.node,className:i.string,disabledItemsFocusable:i.bool,disableListWrap:i.bool,onKeyDown:i.func,variant:i.oneOf(["menu","selectedMenu"])});const wh=Wi,xh=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],kh={entering:{opacity:1},entered:{opacity:1}},Xi=T.forwardRef(function(t,n){const r=Zn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:a,appear:s=!0,children:c,easing:p,in:f,onEnter:m,onEntered:v,onEntering:g,onExit:d,onExited:h,onExiting:u,style:b,timeout:x=o,TransitionComponent:R=Ai}=t,w=me(t,xh),k=T.useRef(null),y=qe(k,c.ref,n),S=_=>U=>{if(_){const B=k.current;U===void 0?_(B):_(B,U)}},C=S(g),M=S((_,U)=>{Bi(_);const B=yr({style:b,timeout:x,easing:p},{mode:"enter"});_.style.webkitTransition=r.transitions.create("opacity",B),_.style.transition=r.transitions.create("opacity",B),m&&m(_,U)}),A=S(v),z=S(u),$=S(_=>{const U=yr({style:b,timeout:x,easing:p},{mode:"exit"});_.style.webkitTransition=r.transitions.create("opacity",U),_.style.transition=r.transitions.create("opacity",U),d&&d(_)}),N=S(h),O=_=>{a&&a(k.current,_)};return l.jsx(R,P({appear:s,in:f,nodeRef:k,onEnter:M,onEntered:A,onEntering:C,onExit:$,onExited:N,onExiting:z,addEndListener:O,timeout:x},w,{children:(_,U)=>T.cloneElement(c,P({style:P({opacity:0,visibility:_==="exited"&&!f?"hidden":void 0},kh[_],b,c.props.style),ref:y},U))}))});process.env.NODE_ENV!=="production"&&(Xi.propTypes={addEndListener:i.func,appear:i.bool,children:qn.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Eh=Xi;function Nh(e){return rt("MuiBackdrop",e)}xt("MuiBackdrop",["root","invisible"]);const Th=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Sh=e=>{const{classes:t,invisible:n}=e;return ft({root:["root",n&&"invisible"]},Nh,t)},Ch=je("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>P({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),Yi=T.forwardRef(function(t,n){var r,o,a;const s=mt({props:t,name:"MuiBackdrop"}),{children:c,className:p,component:f="div",components:m={},componentsProps:v={},invisible:g=!1,open:d,slotProps:h={},slots:u={},TransitionComponent:b=Eh,transitionDuration:x}=s,R=me(s,Th),w=P({},s,{component:f,invisible:g}),k=Sh(w),y=(r=h.root)!=null?r:v.root;return l.jsx(b,P({in:d,timeout:x},R,{children:l.jsx(Ch,P({"aria-hidden":!0},y,{as:(o=(a=u.root)!=null?a:m.Root)!=null?o:f,className:Se(k.root,p,y==null?void 0:y.className),ownerState:P({},w,y==null?void 0:y.ownerState),classes:k,ref:n,children:c}))}))});process.env.NODE_ENV!=="production"&&(Yi.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.object}),invisible:i.bool,open:i.bool.isRequired,slotProps:i.shape({root:i.object}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Oh=Yi;function jh(e){return rt("MuiModal",e)}xt("MuiModal",["root","hidden","backdrop"]);const Rh=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Ph=e=>{const{open:t,exited:n,classes:r}=e;return ft({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},jh,r)},$h=je("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>P({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),_h=je(Oh,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Ki=T.forwardRef(function(t,n){var r,o,a,s,c,p;const f=mt({name:"MuiModal",props:t}),{BackdropComponent:m=_h,BackdropProps:v,className:g,closeAfterTransition:d=!1,children:h,container:u,component:b,components:x={},componentsProps:R={},disableAutoFocus:w=!1,disableEnforceFocus:k=!1,disableEscapeKeyDown:y=!1,disablePortal:S=!1,disableRestoreFocus:C=!1,disableScrollLock:M=!1,hideBackdrop:A=!1,keepMounted:z=!1,onBackdropClick:$,open:N,slotProps:O,slots:_}=f,U=me(f,Rh),B=P({},f,{closeAfterTransition:d,disableAutoFocus:w,disableEnforceFocus:k,disableEscapeKeyDown:y,disablePortal:S,disableRestoreFocus:C,disableScrollLock:M,hideBackdrop:A,keepMounted:z}),{getRootProps:L,getBackdropProps:J,getTransitionProps:Z,portalRef:j,isTopModal:I,exited:H,hasTransition:K}=Pf(P({},B,{rootRef:n})),G=P({},B,{exited:H}),q=Ph(G),X={};if(h.props.tabIndex===void 0&&(X.tabIndex="-1"),K){const{onEnter:te,onExited:D}=Z();X.onEnter=te,X.onExited=D}const Y=(r=(o=_==null?void 0:_.root)!=null?o:x.Root)!=null?r:$h,W=(a=(s=_==null?void 0:_.backdrop)!=null?s:x.Backdrop)!=null?a:m,Q=(c=O==null?void 0:O.root)!=null?c:R.root,ee=(p=O==null?void 0:O.backdrop)!=null?p:R.backdrop,se=Bt({elementType:Y,externalSlotProps:Q,externalForwardedProps:U,getSlotProps:L,additionalProps:{ref:n,as:b},ownerState:G,className:Se(g,Q==null?void 0:Q.className,q==null?void 0:q.root,!G.open&&G.exited&&(q==null?void 0:q.hidden))}),V=Bt({elementType:W,externalSlotProps:ee,additionalProps:v,getSlotProps:te=>J(P({},te,{onClick:D=>{$&&$(D),te!=null&&te.onClick&&te.onClick(D)}})),className:Se(ee==null?void 0:ee.className,v==null?void 0:v.className,q==null?void 0:q.backdrop),ownerState:G});return!z&&!N&&(!K||H)?null:l.jsx(An,{ref:j,container:u,disablePortal:S,children:l.jsxs(Y,P({},se,{children:[!A&&m?l.jsx(W,P({},V)):null,l.jsx(gr,{disableEnforceFocus:k,disableAutoFocus:w,disableRestoreFocus:C,isEnabled:I,open:N,children:T.cloneElement(h,X)})]}))})});process.env.NODE_ENV!=="production"&&(Ki.propTypes={BackdropComponent:i.elementType,BackdropProps:i.object,children:qn.isRequired,classes:i.object,className:i.string,closeAfterTransition:i.bool,component:i.elementType,components:i.shape({Backdrop:i.elementType,Root:i.elementType}),componentsProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableEscapeKeyDown:i.bool,disablePortal:i.bool,disableRestoreFocus:i.bool,disableScrollLock:i.bool,hideBackdrop:i.bool,keepMounted:i.bool,onBackdropClick:i.func,onClose:i.func,onTransitionEnter:i.func,onTransitionExited:i.func,open:i.bool.isRequired,slotProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({backdrop:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const Mh=Ki;function Ih(e){return rt("MuiPaper",e)}xt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Dh=["className","component","elevation","square","variant"],Ah=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,a={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return ft(a,Ih,o)},Bh=je("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return P({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&P({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${hr("#fff",is(t.elevation))}, ${hr("#fff",is(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Ji=T.forwardRef(function(t,n){const r=mt({props:t,name:"MuiPaper"}),{className:o,component:a="div",elevation:s=1,square:c=!1,variant:p="elevation"}=r,f=me(r,Dh),m=P({},r,{component:a,elevation:s,square:c,variant:p}),v=Ah(m);return process.env.NODE_ENV!=="production"&&Zn().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),l.jsx(Bh,P({as:a,ownerState:m,className:Se(v.root,o),ref:n},f))});process.env.NODE_ENV!=="production"&&(Ji.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,elevation:ln(ci,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:i.bool,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),variant:i.oneOfType([i.oneOf(["elevation","outlined"]),i.string])});const Lh=Ji;function Vh(e){return rt("MuiPopover",e)}xt("MuiPopover",["root","paper"]);const Fh=["onEntering"],zh=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Uh=["slotProps"];function ds(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function us(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function fs(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function pr(e){return typeof e=="function"?e():e}const Hh=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"]},Vh,t)},Gh=je(Mh,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Zi=je(Lh,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Qi=T.forwardRef(function(t,n){var r,o,a;const s=mt({props:t,name:"MuiPopover"}),{action:c,anchorEl:p,anchorOrigin:f={vertical:"top",horizontal:"left"},anchorPosition:m,anchorReference:v="anchorEl",children:g,className:d,container:h,elevation:u=8,marginThreshold:b=16,open:x,PaperProps:R={},slots:w,slotProps:k,transformOrigin:y={vertical:"top",horizontal:"left"},TransitionComponent:S=vo,transitionDuration:C="auto",TransitionProps:{onEntering:M}={},disableScrollLock:A=!1}=s,z=me(s.TransitionProps,Fh),$=me(s,zh),N=(r=k==null?void 0:k.paper)!=null?r:R,O=T.useRef(),_=qe(O,N.ref),U=P({},s,{anchorOrigin:f,anchorReference:v,elevation:u,marginThreshold:b,externalPaperSlotProps:N,transformOrigin:y,TransitionComponent:S,transitionDuration:C,TransitionProps:z}),B=Hh(U),L=T.useCallback(()=>{if(v==="anchorPosition")return process.env.NODE_ENV!=="production"&&(m||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),m;const te=pr(p),D=te&&te.nodeType===1?te:Oe(O.current).body,ie=D.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Ne=D.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Ne.top===0&&Ne.left===0&&Ne.right===0&&Ne.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:ie.top+ds(ie,f.vertical),left:ie.left+us(ie,f.horizontal)}},[p,f.horizontal,f.vertical,m,v]),J=T.useCallback(te=>({vertical:ds(te,y.vertical),horizontal:us(te,y.horizontal)}),[y.horizontal,y.vertical]),Z=T.useCallback(te=>{const D={width:te.offsetWidth,height:te.offsetHeight},ie=J(D);if(v==="none")return{top:null,left:null,transformOrigin:fs(ie)};const Ne=L();let Re=Ne.top-ie.vertical,xe=Ne.left-ie.horizontal;const Nt=Re+D.height,Pe=xe+D.width,ot=en(pr(p)),Ae=ot.innerHeight-b,at=ot.innerWidth-b;if(b!==null&&Re<b){const Te=Re-b;Re-=Te,ie.vertical+=Te}else if(b!==null&&Nt>Ae){const Te=Nt-Ae;Re-=Te,ie.vertical+=Te}if(process.env.NODE_ENV!=="production"&&D.height>Ae&&D.height&&Ae&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${D.height-Ae}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),b!==null&&xe<b){const Te=xe-b;xe-=Te,ie.horizontal+=Te}else if(Pe>at){const Te=Pe-at;xe-=Te,ie.horizontal+=Te}return{top:`${Math.round(Re)}px`,left:`${Math.round(xe)}px`,transformOrigin:fs(ie)}},[p,v,L,J,b]),[j,I]=T.useState(x),H=T.useCallback(()=>{const te=O.current;if(!te)return;const D=Z(te);D.top!==null&&(te.style.top=D.top),D.left!==null&&(te.style.left=D.left),te.style.transformOrigin=D.transformOrigin,I(!0)},[Z]);T.useEffect(()=>(A&&window.addEventListener("scroll",H),()=>window.removeEventListener("scroll",H)),[p,A,H]);const K=(te,D)=>{M&&M(te,D),H()},G=()=>{I(!1)};T.useEffect(()=>{x&&H()}),T.useImperativeHandle(c,()=>x?{updatePosition:()=>{H()}}:null,[x,H]),T.useEffect(()=>{if(!x)return;const te=ni(()=>{H()}),D=en(p);return D.addEventListener("resize",te),()=>{te.clear(),D.removeEventListener("resize",te)}},[p,x,H]);let q=C;C==="auto"&&!S.muiSupportAuto&&(q=void 0);const X=h||(p?Oe(pr(p)).body:void 0),Y=(o=w==null?void 0:w.root)!=null?o:Gh,W=(a=w==null?void 0:w.paper)!=null?a:Zi,Q=Bt({elementType:W,externalSlotProps:P({},N,{style:j?N.style:P({},N.style,{opacity:0})}),additionalProps:{elevation:u,ref:_},ownerState:U,className:Se(B.paper,N==null?void 0:N.className)}),ee=Bt({elementType:Y,externalSlotProps:(k==null?void 0:k.root)||{},externalForwardedProps:$,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:X,open:x},ownerState:U,className:Se(B.root,d)}),{slotProps:se}=ee,V=me(ee,Uh);return l.jsx(Y,P({},V,!xi(Y)&&{slotProps:se,disableScrollLock:A},{children:l.jsx(S,P({appear:!0,in:x,onEntering:K,onExited:G,timeout:q},z,{children:l.jsx(W,P({},Q,{children:g}))}))}))});process.env.NODE_ENV!=="production"&&(Qi.propTypes={action:$o,anchorEl:ln(i.oneOfType([pt,i.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=pr(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),anchorPosition:i.shape({left:i.number.isRequired,top:i.number.isRequired}),anchorReference:i.oneOf(["anchorEl","anchorPosition","none"]),children:i.node,classes:i.object,className:i.string,container:i.oneOfType([pt,i.func]),disableScrollLock:i.bool,elevation:ci,marginThreshold:i.number,onClose:i.func,open:i.bool.isRequired,PaperProps:i.shape({component:kp}),slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transformOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object});const qh=Qi;function Wh(e){return rt("MuiMenu",e)}xt("MuiMenu",["root","paper","list"]);const Xh=["onEntering"],Yh=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Kh={vertical:"top",horizontal:"right"},Jh={vertical:"top",horizontal:"left"},Zh=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"],list:["list"]},Wh,t)},Qh=je(qh,{shouldForwardProp:e=>vi(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),eg=je(Zi,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),tg=je(wh,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),el=T.forwardRef(function(t,n){var r,o;const a=mt({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:c,className:p,disableAutoFocusItem:f=!1,MenuListProps:m={},onClose:v,open:g,PaperProps:d={},PopoverClasses:h,transitionDuration:u="auto",TransitionProps:{onEntering:b}={},variant:x="selectedMenu",slots:R={},slotProps:w={}}=a,k=me(a.TransitionProps,Xh),y=me(a,Yh),S=Zn(),C=S.direction==="rtl",M=P({},a,{autoFocus:s,disableAutoFocusItem:f,MenuListProps:m,onEntering:b,PaperProps:d,transitionDuration:u,TransitionProps:k,variant:x}),A=Zh(M),z=s&&!f&&g,$=T.useRef(null),N=(Z,j)=>{$.current&&$.current.adjustStyleForScrollbar(Z,S),b&&b(Z,j)},O=Z=>{Z.key==="Tab"&&(Z.preventDefault(),v&&v(Z,"tabKeyDown"))};let _=-1;T.Children.map(c,(Z,j)=>{T.isValidElement(Z)&&(process.env.NODE_ENV!=="production"&&ur.isFragment(Z)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Z.props.disabled||(x==="selectedMenu"&&Z.props.selected||_===-1)&&(_=j))});const U=(r=R.paper)!=null?r:eg,B=(o=w.paper)!=null?o:d,L=Bt({elementType:R.root,externalSlotProps:w.root,ownerState:M,className:[A.root,p]}),J=Bt({elementType:U,externalSlotProps:B,ownerState:M,className:A.paper});return l.jsx(Qh,P({onClose:v,anchorOrigin:{vertical:"bottom",horizontal:C?"right":"left"},transformOrigin:C?Kh:Jh,slots:{paper:U,root:R.root},slotProps:{root:L,paper:J},open:g,ref:n,transitionDuration:u,TransitionProps:P({onEntering:N},k),ownerState:M},y,{classes:h,children:l.jsx(tg,P({onKeyDown:O,actions:$,autoFocus:s&&(_===-1||f),autoFocusItem:z,variant:x},m,{className:Se(A.list,m.className),children:c}))}))});process.env.NODE_ENV!=="production"&&(el.propTypes={anchorEl:i.oneOfType([pt,i.func]),autoFocus:i.bool,children:i.node,classes:i.object,className:i.string,disableAutoFocusItem:i.bool,MenuListProps:i.object,onClose:i.func,open:i.bool.isRequired,PaperProps:i.object,PopoverClasses:i.object,slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object,variant:i.oneOf(["menu","selectedMenu"])});const ng=el;function rg({className:e,commandHandler:t,menuDefinition:n,children:r}){var f;const[o,a]=E.useState(void 0),s=E.useCallback(m=>{m.preventDefault(),a(o===void 0?{mouseX:m.clientX+2,mouseY:m.clientY-6}:void 0)},[o]),c=E.useCallback(()=>{a(void 0)},[]),p=E.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((f=n==null?void 0:n.items)==null?void 0:f.length)??0)===0||!r?r:l.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[r,l.jsx(ng,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:c,anchorReference:"anchorPosition",anchorPosition:p,children:l.jsx(Jo,{menuDefinition:n,commandHandler:t,onClick:c})})]})}function og(e){return{preserveValue:!0,...e}}const wr=(e,t,n={})=>{const r=E.useRef(t);r.current=t;const o=E.useRef(n);o.current=og(o.current);const[a,s]=E.useState(()=>r.current),[c,p]=E.useState(!0);return E.useEffect(()=>{let f=!0;return p(!!e),(async()=>{if(e){const m=await e();f&&(s(()=>m),p(!1))}})(),()=>{f=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[a,c]},ag=yi(l.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function tl({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:a,ariaLabelPrefix:s,children:c}){const[p,f]=E.useState(!1),[m,v]=E.useState(!1),g=E.useCallback(()=>{p&&f(!1),v(!1)},[p]),d=E.useCallback(k=>{k.stopPropagation(),f(y=>{const S=!y;return S&&k.shiftKey?v(!0):S||v(!1),S})},[]),h=E.useCallback(k=>(g(),r(k)),[r,g]),[u,b]=E.useState({top:1,left:1});E.useEffect(()=>{if(p){const k=o==null?void 0:o.current;if(k){const y=k.getBoundingClientRect(),S=window.scrollY,C=window.scrollX,M=y.top+S+k.clientHeight,A=y.left+C;b({top:M,left:A})}}},[p,o]);const[x]=wr(E.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,p]),t),[R]=wr(E.useCallback(async()=>(e==null?void 0:e(!0))??n??x,[e,n,x,p]),n??x),w=m&&R?R:x;return l.jsxs(l.Fragment,{children:[l.jsx(Ee.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:d,children:c??l.jsx(ag,{})}),l.jsx(Ee.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:p,onClose:g,PaperProps:{className:"papi-menu-drawer-paper",style:{top:u.top,left:u.left}},children:w?l.jsx(Ui,{className:a,id:`${s??""} main menu`,commandHandler:h,multiColumnMenu:w}):void 0})]})}function sg({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:s="medium",className:c,onClick:p,children:f}){return l.jsx(Ee.IconButton,{id:e,disabled:n,edge:a,size:s,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${c??""}`,onClick:p,children:f})}const yt="scrBook",ig="scrRef",jt="source",lg="details",cg="Scripture Reference",pg="Scripture Book",nl="Type",dg="Details";function ug(e,t){const n=t??!1;return[{accessorFn:r=>`${fe.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:yt,header:(e==null?void 0:e.scriptureReferenceColumnName)??cg,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?fe.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===yt?He.formatScrRef(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>He.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>He.formatScrRef(r.start),id:ig,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:He.formatScrRef(o.start)},sortingFn:(r,o)=>He.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:jt,header:n?(e==null?void 0:e.typeColumnName)??nl:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:lg,header:(e==null?void 0:e.detailsColumnName)??dg,cell:r=>r.getValue(),enableGrouping:!1}]}function fg({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:a,detailsColumnName:s,onRowSelected:c,direction:p="ltr"}){const[f,m]=E.useState([]),[v,g]=E.useState([{id:yt,desc:!1}]),[d,h]=E.useState(()=>e.flatMap(N=>{const O=N.source;return N.data.map(_=>({..._,source:O}))})),[u,b]=E.useState({});E.useEffect(()=>{h(()=>e.flatMap(N=>{const O=N.source;return N.data.map(_=>({..._,source:O}))}))},[e]);const x=E.useMemo(()=>ug({scriptureReferenceColumnName:r,typeColumnName:a,detailsColumnName:s},n),[r,a,s,n]);E.useEffect(()=>{f.includes(jt)?g([{id:jt,desc:!1},{id:yt,desc:!1}]):g([{id:yt,desc:!1}])},[f]);const R=E.useCallback((N,O)=>!O||He.compareScrRefs(N,O)===0?`${He.scrRefToBBBCCCVVV(N)}`:`${He.scrRefToBBBCCCVVV(N)}-${He.scrRefToBBBCCCVVV(O)}`,[]),w=E.useCallback(N=>`${R(N.start,N.end)} ${N.source} ${N.detail}`,[R]),k=Ce.useReactTable({data:d,columns:x,state:{grouping:f,sorting:v,rowSelection:u},onGroupingChange:m,onSortingChange:g,onRowSelectionChange:b,getExpandedRowModel:Ce.getExpandedRowModel(),getGroupedRowModel:Ce.getGroupedRowModel(),getCoreRowModel:Ce.getCoreRowModel(),getSortedRowModel:Ce.getSortedRowModel(),getRowId:w,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});E.useEffect(()=>{if(c){const N=k.getSelectedRowModel().rowsById,O=Object.keys(N);if(O.length===1){const _=d.find(U=>w(U)===O[0])||void 0;_&&c(_)}}},[u,d,w,c,k]);const y=o??pg,S=a??nl,C=[{label:"No Grouping",value:[]},{label:`Group by ${y}`,value:[yt]},{label:`Group by ${S}`,value:[jt]},{label:`Group by ${y} and ${S}`,value:[yt,jt]},{label:`Group by ${S} and ${y}`,value:[jt,yt]}],M=N=>{m(JSON.parse(N))},A=(N,O)=>{!N.getIsGrouped()&&!N.getIsSelected()&&N.getToggleSelectedHandler()(O)},z=(N,O)=>N.getIsGrouped()?"":F("banded-row",O%2===0?"even":"odd"),$=(N,O,_)=>{if(!((N==null?void 0:N.length)===0||O.depth<_.column.getGroupedIndex())){if(O.getIsGrouped())switch(O.depth){case 1:return"pr-ps-4";default:return}switch(O.depth){case 1:return"pr-ps-8";case 2:return"pr-ps-12";default:return}}};return l.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-w-full pr-flex-col",children:[!t&&l.jsxs(_n,{value:JSON.stringify(f),onValueChange:N=>{M(N)},children:[l.jsx(Kt,{className:"pr-mb-1 pr-mt-2",children:l.jsx(Mn,{})}),l.jsx(Jt,{position:"item-aligned",children:l.jsx(Ms,{children:C.map(N=>l.jsx(Ke,{value:JSON.stringify(N.value),children:N.label},N.label))})})]}),l.jsxs(Un,{className:"pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0",children:[t&&l.jsx(Hn,{children:k.getHeaderGroups().map(N=>l.jsx(lt,{children:N.headers.filter(O=>O.column.columnDef.header).map(O=>l.jsx(Zt,{colSpan:O.colSpan,className:"top-0 pr-sticky",children:O.isPlaceholder?void 0:l.jsxs("div",{children:[O.column.getCanGroup()?l.jsx(be,{variant:"ghost",title:`Toggle grouping by ${O.column.columnDef.header}`,onClick:O.column.getToggleGroupingHandler(),type:"button",children:O.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Ce.flexRender(O.column.columnDef.header,O.getContext())]})},O.id))},N.id))}),l.jsx(Gn,{children:k.getRowModel().rows.map((N,O)=>l.jsx(lt,{"data-state":N.getIsSelected()?"selected":"",className:F(z(N,O)),onClick:_=>A(N,_),children:N.getVisibleCells().map(_=>{if(!(_.getIsPlaceholder()||_.column.columnDef.enableGrouping&&!_.getIsGrouped()&&(_.column.columnDef.id!==jt||!n)))return l.jsx(It,{className:F(_.column.columnDef.id,"pr-p-[1px]",$(f,N,_)),children:(()=>_.getIsGrouped()?l.jsxs(be,{variant:"link",onClick:N.getToggleExpandedHandler(),type:"button",children:[N.getIsExpanded()&&l.jsx(re.ChevronDown,{}),!N.getIsExpanded()&&(p==="ltr"?l.jsx(re.ChevronRight,{}):l.jsx(re.ChevronLeft,{}))," ",Ce.flexRender(_.column.columnDef.cell,_.getContext())," (",N.subRows.length,")"]}):Ce.flexRender(_.column.columnDef.cell,_.getContext()))()},_.id)})},N.id))})]})]})}const mg=xo.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),Zo=E.forwardRef(({className:e,...t},n)=>l.jsx(ks.Root,{ref:n,className:F(mg(),e),...t}));Zo.displayName=ks.Root.displayName;function rl({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:a,placeholder:s,isRequired:c=!1,className:p,defaultValue:f,value:m,onChange:v,onFocus:g,onBlur:d}){return l.jsxs("div",{className:F("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":r}),children:[l.jsx(Zo,{htmlFor:e,className:F({"pr-text-red-600":n,"pr-hidden":!a}),children:`${a}${c?"*":""}`}),l.jsx(Vn,{id:e,disabled:t,placeholder:s,required:c,className:F(p,{"pr-border-red-600":n}),defaultValue:f,value:m,onChange:v,onFocus:g,onBlur:d}),l.jsx("p",{className:F({"pr-hidden":!o}),children:o})]})}function hg({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=E.useState(""),a=s=>{o(s),e(s)};return l.jsx(rl,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:s=>a(s.target.value)})}function gg({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:a=1,showMarks:s=!1,defaultValue:c,value:p,valueLabelDisplay:f="off",className:m,onChange:v,onChangeCommitted:g}){return l.jsx(Ee.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:a,marks:s,defaultValue:c,value:p,valueLabelDisplay:f,className:`papi-slider ${n} ${m??""}`,onChange:v,onChangeCommitted:g})}function bg({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:s,children:c}){const p={action:(s==null?void 0:s.action)||c,message:s==null?void 0:s.message,className:r};return l.jsx(Ee.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:a,id:t,ContentProps:p})}const cn=E.forwardRef(({className:e,...t},n)=>l.jsx(re.LoaderCircle,{size:35,className:F("pr-animate-spin",e),...t,ref:n}));cn.displayName="Spinner";function vg({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:a}){return l.jsx(Ee.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:a})}function yg({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const a=E.useRef(void 0);return l.jsx("div",{ref:a,style:{position:"relative"},children:l.jsx(Ee.AppBar,{position:"static",id:r,children:l.jsxs(Ee.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?l.jsx(tl,{commandHandler:t,containerRef:a,menuProvider:e}):void 0,o?l.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const wg=De.Root,ol=E.forwardRef(({className:e,...t},n)=>l.jsx(De.List,{ref:n,className:F("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));ol.displayName=De.List.displayName;const al=E.forwardRef(({className:e,...t},n)=>l.jsx(De.Trigger,{ref:n,className:F("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));al.displayName=De.Trigger.displayName;const sl=E.forwardRef(({className:e,...t},n)=>l.jsx(De.Content,{ref:n,className:F("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));sl.displayName=De.Content.displayName;const il=E.forwardRef(({className:e,...t},n)=>l.jsx(De.Root,{orientation:"vertical",ref:n,className:F("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));il.displayName=De.List.displayName;const ll=E.forwardRef(({className:e,...t},n)=>l.jsx(De.List,{ref:n,className:F("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));ll.displayName=De.List.displayName;const xg=E.forwardRef(({className:e,...t},n)=>l.jsx(De.Trigger,{ref:n,...t,className:F("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),cl=E.forwardRef(({className:e,...t},n)=>l.jsx(De.Content,{ref:n,className:F("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));cl.displayName=De.Content.displayName;function kg({isInstalling:e,handleClick:t,buttonText:n,className:r,...o}){return l.jsx(be,{className:F("pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e,"pr-bg-blue-600":!e,"pr-bg-white pr-text-blue-600 hover:pr-text-white":!n,"pr-w-20":n},r),onClick:t,...o,children:e?l.jsx(cn,{size:15}):l.jsxs(l.Fragment,{children:[l.jsx(re.Download,{size:25,className:F("pr-h-4 pr-w-4",{"pr-mr-1":n})}),n]})})}function Eg({isEnabling:e,handleClick:t,className:n,...r}){return l.jsx(be,{className:F("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e},n),onClick:t,...r,children:e?l.jsxs(l.Fragment,{children:[l.jsx(cn,{size:15,className:"pr-mr-1 pr-text-white"}),"Enabling..."]}):"Enable"})}function Ng({isDisabling:e,handleClick:t,className:n,...r}){return l.jsx(be,{className:F("pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-gray-400",{"pr-cursor-not-allowed pr-bg-gray-400":e},n),onClick:t,...r,children:e?l.jsxs(l.Fragment,{children:[l.jsx(cn,{size:15,className:"pr-mr-1 pr-text-black"}),"Disabling..."]}):"Disable"})}function Tg({isUpdating:e,handleClick:t,className:n,...r}){return l.jsx(be,{className:F("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700 hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e},n),onClick:t,...r,children:e?l.jsxs(l.Fragment,{children:[l.jsx(cn,{size:15,className:"pr-mr-1 pr-text-white"}),"Updating..."]}):"Update"})}function $t(){return $t=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},$t.apply(this,arguments)}const Sg=["children","options"],ms=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,t)=>(e[t.toLowerCase()]=t,e),{for:"htmlFor"}),hs={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},Cg=["style","script"],Og=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,jg=/mailto:/i,Rg=/\n{2,}$/,pl=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,Pg=/^ *> ?/gm,$g=/^ {2,}\n/,_g=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,dl=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,ul=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,Mg=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,Ig=/^(?:\n *)*\n/,Dg=/\r\n?/g,Ag=/^\[\^([^\]]+)](:.*)\n/,Bg=/^\[\^([^\]]+)]/,Lg=/\f/g,Vg=/^\s*?\[(x|\s)\]/,fl=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,ml=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,hl=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,yo=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,Fg=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,gl=/^<!--[\s\S]*?(?:-->)/,zg=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,wo=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,Ug=/^\{.*\}$/,Hg=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,Gg=/^<([^ >]+@[^ >]+)>/,qg=/^<([^ >]+:\/[^ >]+)>/,Wg=/-([a-z])?/gi,bl=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,Xg=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,Yg=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,Kg=/^\[([^\]]*)\] ?\[([^\]]*)\]/,Jg=/(\[|\])/g,Zg=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,Qg=/\t/g,eb=/^ *\| */,tb=/(^ *\||\| *$)/g,nb=/ *$/,rb=/^ *:-+: *$/,ob=/^ *:-+ *$/,ab=/^ *-+: *$/,sb=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,ib=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,lb=/^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,cb=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,pb=/^\\([^0-9A-Za-z\s])/,db=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,ub=/^\n+/,fb=/^([ \t]*)/,mb=/\\([^\\])/g,gs=/ *\n+$/,hb=/(?:^|\n)( *)$/,Qo="(?:\\d+\\.)",ea="(?:[*+-])";function vl(e){return"( *)("+(e===1?Qo:ea)+") +"}const yl=vl(1),wl=vl(2);function xl(e){return new RegExp("^"+(e===1?yl:wl))}const gb=xl(1),bb=xl(2);function kl(e){return new RegExp("^"+(e===1?yl:wl)+"[^\\n]*(?:\\n(?!\\1"+(e===1?Qo:ea)+" )[^\\n]*)*(\\n|$)","gm")}const El=kl(1),Nl=kl(2);function Tl(e){const t=e===1?Qo:ea;return new RegExp("^( *)("+t+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+t+" (?!"+t+" ))\\n*|\\s*\\n*$)")}const Sl=Tl(1),Cl=Tl(2);function bs(e,t){const n=t===1,r=n?Sl:Cl,o=n?El:Nl,a=n?gb:bb;return{t(s,c,p){const f=hb.exec(p);return f&&(c.o||!c._&&!c.u)?r.exec(s=f[1]+s):null},i:ae.HIGH,l(s,c,p){const f=n?+s[2]:void 0,m=s[0].replace(Rg,`
`).match(o);let v=!1;return{p:m.map(function(g,d){const h=a.exec(g)[0].length,u=new RegExp("^ {1,"+h+"}","gm"),b=g.replace(u,"").replace(a,""),x=d===m.length-1,R=b.indexOf(`

`)!==-1||x&&v;v=R;const w=p._,k=p.o;let y;p.o=!0,R?(p._=!1,y=b.replace(gs,`

`)):(p._=!0,y=b.replace(gs,""));const S=c(y,p);return p._=w,p.o=k,S}),m:n,g:f}},h:(s,c,p)=>e(s.m?"ol":"ul",{key:p.k,start:s.g},s.p.map(function(f,m){return e("li",{key:m},c(f,p))}))}}const vb=/^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,yb=/^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Ol=[pl,dl,ul,fl,hl,ml,gl,bl,El,Sl,Nl,Cl],wb=[...Ol,/^[^\n]+(?:  \n|\n{2,})/,yo,wo];function xb(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function kb(e){return ab.test(e)?"right":rb.test(e)?"center":ob.test(e)?"left":null}function vs(e,t,n){const r=n.$;n.$=!0;const o=t(e.trim(),n);n.$=r;let a=[[]];return o.forEach(function(s,c){s.type==="tableSeparator"?c!==0&&c!==o.length-1&&a.push([]):(s.type!=="text"||o[c+1]!=null&&o[c+1].type!=="tableSeparator"||(s.v=s.v.replace(nb,"")),a[a.length-1].push(s))}),a}function Eb(e,t,n){n._=!0;const r=vs(e[1],t,n),o=e[2].replace(tb,"").split("|").map(kb),a=function(s,c,p){return s.trim().split(`
`).map(function(f){return vs(f,c,p)})}(e[3],t,n);return n._=!1,{S:o,A:a,L:r,type:"table"}}function ys(e,t){return e.S[t]==null?{}:{textAlign:e.S[t]}}function bt(e){return function(t,n){return n._?e.exec(t):null}}function vt(e){return function(t,n){return n._||n.u?e.exec(t):null}}function it(e){return function(t,n){return n._||n.u?null:e.exec(t)}}function xn(e){return function(t){return e.exec(t)}}function Nb(e,t,n){if(t._||t.u||n&&!n.endsWith(`
`))return null;let r="";e.split(`
`).every(a=>!Ol.some(s=>s.test(a))&&(r+=a+`
`,a.trim()));const o=r.trimEnd();return o==""?null:[r,o]}function Wt(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch{return null}return e}function ws(e){return e.replace(mb,"$1")}function dr(e,t,n){const r=n._||!1,o=n.u||!1;n._=!0,n.u=!0;const a=e(t,n);return n._=r,n.u=o,a}function Tb(e,t,n){const r=n._||!1,o=n.u||!1;n._=!1,n.u=!0;const a=e(t,n);return n._=r,n.u=o,a}function Sb(e,t,n){return n._=!1,e(t,n)}const Qr=(e,t,n)=>({v:dr(t,e[1],n)});function eo(){return{}}function to(){return null}function Cb(...e){return e.filter(Boolean).join(" ")}function no(e,t,n){let r=e;const o=t.split(".");for(;o.length&&(r=r[o[0]],r!==void 0);)o.shift();return r||n}var ae;function Ob(e,t={}){t.overrides=t.overrides||{},t.slugify=t.slugify||xb,t.namedCodesToUnicode=t.namedCodesToUnicode?$t({},hs,t.namedCodesToUnicode):hs;const n=t.createElement||T.createElement;function r(d,h,...u){const b=no(t.overrides,`${d}.props`,{});return n(function(x,R){const w=no(R,x);return w?typeof w=="function"||typeof w=="object"&&"render"in w?w:no(R,`${x}.component`,x):x}(d,t.overrides),$t({},h,b,{className:Cb(h==null?void 0:h.className,b.className)||void 0}),...u)}function o(d){let h=!1;t.forceInline?h=!0:t.forceBlock||(h=Zg.test(d)===!1);const u=m(f(h?d:`${d.trimEnd().replace(ub,"")}

`,{_:h}));for(;typeof u[u.length-1]=="string"&&!u[u.length-1].trim();)u.pop();if(t.wrapper===null)return u;const b=t.wrapper||(h?"span":"div");let x;if(u.length>1||t.forceWrapper)x=u;else{if(u.length===1)return x=u[0],typeof x=="string"?r("span",{key:"outer"},x):x;x=null}return T.createElement(b,{key:"outer"},x)}function a(d){const h=d.match(Og);return h?h.reduce(function(u,b,x){const R=b.indexOf("=");if(R!==-1){const w=function(C){return C.indexOf("-")!==-1&&C.match(zg)===null&&(C=C.replace(Wg,function(M,A){return A.toUpperCase()})),C}(b.slice(0,R)).trim(),k=function(C){const M=C[0];return(M==='"'||M==="'")&&C.length>=2&&C[C.length-1]===M?C.slice(1,-1):C}(b.slice(R+1).trim()),y=ms[w]||w,S=u[y]=function(C,M){return C==="style"?M.split(/;\s?/).reduce(function(A,z){const $=z.slice(0,z.indexOf(":"));return A[$.replace(/(-[a-z])/g,N=>N[1].toUpperCase())]=z.slice($.length+1).trim(),A},{}):C==="href"?Wt(M):(M.match(Ug)&&(M=M.slice(1,M.length-1)),M==="true"||M!=="false"&&M)}(w,k);typeof S=="string"&&(yo.test(S)||wo.test(S))&&(u[y]=T.cloneElement(o(S.trim()),{key:x}))}else b!=="style"&&(u[ms[b]||b]=!0);return u},{}):null}const s=[],c={},p={blockQuote:{t:it(pl),i:ae.HIGH,l:(d,h,u)=>({v:h(d[0].replace(Pg,""),u)}),h:(d,h,u)=>r("blockquote",{key:u.k},h(d.v,u))},breakLine:{t:xn($g),i:ae.HIGH,l:eo,h:(d,h,u)=>r("br",{key:u.k})},breakThematic:{t:it(_g),i:ae.HIGH,l:eo,h:(d,h,u)=>r("hr",{key:u.k})},codeBlock:{t:it(ul),i:ae.MAX,l:d=>({v:d[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),M:void 0}),h:(d,h,u)=>r("pre",{key:u.k},r("code",$t({},d.O,{className:d.M?`lang-${d.M}`:""}),d.v))},codeFenced:{t:it(dl),i:ae.MAX,l:d=>({O:a(d[3]||""),v:d[4],M:d[2]||void 0,type:"codeBlock"})},codeInline:{t:vt(Mg),i:ae.LOW,l:d=>({v:d[2]}),h:(d,h,u)=>r("code",{key:u.k},d.v)},footnote:{t:it(Ag),i:ae.MAX,l:d=>(s.push({I:d[2],j:d[1]}),{}),h:to},footnoteReference:{t:bt(Bg),i:ae.HIGH,l:d=>({v:d[1],B:`#${t.slugify(d[1])}`}),h:(d,h,u)=>r("a",{key:u.k,href:Wt(d.B)},r("sup",{key:u.k},d.v))},gfmTask:{t:bt(Vg),i:ae.HIGH,l:d=>({R:d[1].toLowerCase()==="x"}),h:(d,h,u)=>r("input",{checked:d.R,key:u.k,readOnly:!0,type:"checkbox"})},heading:{t:it(t.enforceAtxHeadings?ml:fl),i:ae.HIGH,l:(d,h,u)=>({v:dr(h,d[2],u),T:t.slugify(d[2]),C:d[1].length}),h:(d,h,u)=>r(`h${d.C}`,{id:d.T,key:u.k},h(d.v,u))},headingSetext:{t:it(hl),i:ae.MAX,l:(d,h,u)=>({v:dr(h,d[1],u),C:d[2]==="="?1:2,type:"heading"})},htmlComment:{t:xn(gl),i:ae.HIGH,l:()=>({}),h:to},image:{t:vt(yb),i:ae.HIGH,l:d=>({D:d[1],B:ws(d[2]),F:d[3]}),h:(d,h,u)=>r("img",{key:u.k,alt:d.D||void 0,title:d.F||void 0,src:Wt(d.B)})},link:{t:bt(vb),i:ae.LOW,l:(d,h,u)=>({v:Tb(h,d[1],u),B:ws(d[2]),F:d[3]}),h:(d,h,u)=>r("a",{key:u.k,href:Wt(d.B),title:d.F},h(d.v,u))},linkAngleBraceStyleDetector:{t:bt(qg),i:ae.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],type:"link"})},linkBareUrlDetector:{t:(d,h)=>h.N?null:bt(Hg)(d,h),i:ae.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],F:void 0,type:"link"})},linkMailtoDetector:{t:bt(Gg),i:ae.MAX,l(d){let h=d[1],u=d[1];return jg.test(u)||(u="mailto:"+u),{v:[{v:h.replace("mailto:",""),type:"text"}],B:u,type:"link"}}},orderedList:bs(r,1),unorderedList:bs(r,2),newlineCoalescer:{t:it(Ig),i:ae.LOW,l:eo,h:()=>`
`},paragraph:{t:Nb,i:ae.LOW,l:Qr,h:(d,h,u)=>r("p",{key:u.k},h(d.v,u))},ref:{t:bt(Xg),i:ae.MAX,l:d=>(c[d[1]]={B:d[2],F:d[4]},{}),h:to},refImage:{t:vt(Yg),i:ae.MAX,l:d=>({D:d[1]||void 0,P:d[2]}),h:(d,h,u)=>r("img",{key:u.k,alt:d.D,src:Wt(c[d.P].B),title:c[d.P].F})},refLink:{t:bt(Kg),i:ae.MAX,l:(d,h,u)=>({v:h(d[1],u),Z:h(d[0].replace(Jg,"\\$1"),u),P:d[2]}),h:(d,h,u)=>c[d.P]?r("a",{key:u.k,href:Wt(c[d.P].B),title:c[d.P].F},h(d.v,u)):r("span",{key:u.k},h(d.Z,u))},table:{t:it(bl),i:ae.HIGH,l:Eb,h:(d,h,u)=>r("table",{key:u.k},r("thead",null,r("tr",null,d.L.map(function(b,x){return r("th",{key:x,style:ys(d,x)},h(b,u))}))),r("tbody",null,d.A.map(function(b,x){return r("tr",{key:x},b.map(function(R,w){return r("td",{key:w,style:ys(d,w)},h(R,u))}))})))},tableSeparator:{t:function(d,h){return h.$?(h._=!0,eb.exec(d)):null},i:ae.HIGH,l:function(){return{type:"tableSeparator"}},h:()=>" | "},text:{t:xn(db),i:ae.MIN,l:d=>({v:d[0].replace(Fg,(h,u)=>t.namedCodesToUnicode[u]?t.namedCodesToUnicode[u]:h)}),h:d=>d.v},textBolded:{t:vt(sb),i:ae.MED,l:(d,h,u)=>({v:h(d[2],u)}),h:(d,h,u)=>r("strong",{key:u.k},h(d.v,u))},textEmphasized:{t:vt(ib),i:ae.LOW,l:(d,h,u)=>({v:h(d[2],u)}),h:(d,h,u)=>r("em",{key:u.k},h(d.v,u))},textEscaped:{t:vt(pb),i:ae.HIGH,l:d=>({v:d[1],type:"text"})},textMarked:{t:vt(lb),i:ae.LOW,l:Qr,h:(d,h,u)=>r("mark",{key:u.k},h(d.v,u))},textStrikethroughed:{t:vt(cb),i:ae.LOW,l:Qr,h:(d,h,u)=>r("del",{key:u.k},h(d.v,u))}};t.disableParsingRawHTML!==!0&&(p.htmlBlock={t:xn(yo),i:ae.HIGH,l(d,h,u){const[,b]=d[3].match(fb),x=new RegExp(`^${b}`,"gm"),R=d[3].replace(x,""),w=(k=R,wb.some(M=>M.test(k))?Sb:dr);var k;const y=d[1].toLowerCase(),S=Cg.indexOf(y)!==-1;u.N=u.N||y==="a";const C=S?d[3]:w(h,R,u);return u.N=!1,{O:a(d[2]),v:C,G:S,H:S?y:d[1]}},h:(d,h,u)=>r(d.H,$t({key:u.k},d.O),d.G?d.v:h(d.v,u))},p.htmlSelfClosing={t:xn(wo),i:ae.HIGH,l:d=>({O:a(d[2]||""),H:d[1]}),h:(d,h,u)=>r(d.H,$t({},d.O,{key:u.k}))});const f=function(d){let h=Object.keys(d);function u(b,x){let R=[],w="";for(;b;){let k=0;for(;k<h.length;){const y=h[k],S=d[y],C=S.t(b,x,w);if(C){const M=C[0];b=b.substring(M.length);const A=S.l(C,u,x);A.type==null&&(A.type=y),R.push(A),w=M;break}k++}}return R}return h.sort(function(b,x){let R=d[b].i,w=d[x].i;return R!==w?R-w:b<x?-1:1}),function(b,x){return u(function(R){return R.replace(Dg,`
`).replace(Lg,"").replace(Qg,"    ")}(b),x)}}(p),m=(v=function(d){return function(h,u,b){return d[h.type].h(h,u,b)}}(p),function d(h,u={}){if(Array.isArray(h)){const b=u.k,x=[];let R=!1;for(let w=0;w<h.length;w++){u.k=w;const k=d(h[w],u),y=typeof k=="string";y&&R?x[x.length-1]+=k:k!==null&&x.push(k),R=y}return u.k=b,x}return v(h,d,u)});var v;const g=o(e);return s.length?r("div",null,g,r("footer",{key:"footer"},s.map(function(d){return r("div",{id:t.slugify(d.j),key:d.j},d.j,m(f(d.I,{_:!0})))}))):g}(function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"})(ae||(ae={}));const jb=e=>{let{children:t,options:n}=e,r=function(o,a){if(o==null)return{};var s,c,p={},f=Object.keys(o);for(c=0;c<f.length;c++)a.indexOf(s=f[c])>=0||(p[s]=o[s]);return p}(e,Sg);return T.cloneElement(Ob(t,n),r)};function Rb({id:e,markdown:t}){return l.jsx("div",{id:e,className:"pr-prose",children:l.jsx(jb,{children:t})})}const jl=E.forwardRef((e,t)=>l.jsxs(be,{ref:t,className:"pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600",...e,children:[l.jsx(re.Filter,{size:16,className:"pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"}),"Filter",l.jsx(re.ChevronDown,{size:16,className:"pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"})]}));var Rl=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(Rl||{});function Pb({id:e,groups:t}){return l.jsx("div",{id:e,children:l.jsxs(xr,{children:[l.jsx(To,{asChild:!0,children:l.jsx(jl,{})}),l.jsx(Fn,{children:t.map(n=>l.jsxs("div",{children:[l.jsx(sn,{children:n.label}),l.jsx(js,{children:n.items.map(r=>l.jsx("div",{children:r.itemType===0?l.jsx(kr,{onClick:r.onClick,children:r.label}):l.jsx(Co,{onClick:r.onClick,value:r.label,children:r.label})},r.label))}),l.jsx(zn,{})]},n.label))})]})})}function $b({id:e,message:t}){return l.jsx("div",{id:e,className:"pr-mb-20 pr-mt-20 pr-flex pr-items-center pr-justify-center",children:l.jsx("div",{className:"pr-w-3/4 pr-rounded-lg pr-bg-gray-100 pr-p-8 pr-text-center",children:l.jsx("p",{className:"pr-text-lg pr-text-gray-800",children:t})})})}function _b({id:e,category:t,downloads:n,languages:r,moreInfoUrl:o}){const a=new He.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(n).reduce((c,p)=>c+p,0)),s=()=>{window.scrollTo(0,document.body.scrollHeight)};return l.jsxs("div",{id:e,className:"pr-flex pr-flex-wrap pr-items-start pr-space-x-4 pr-border-b pr-border-t pr-bg-white pr-pb-4 pr-pt-4",children:[l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsx("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:l.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:t})}),l.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"CATEGORY"})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsxs("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:[l.jsx(re.User,{className:"pr-mr-1 pr-h-4 pr-w-4"}),l.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:a})]}),l.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"USERS"})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsx("div",{className:"pr-flex pr-items-center",children:r.slice(0,3).map(c=>l.jsx("span",{className:"pr-ml-1 pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1 pr-text-xs pr-font-semibold pr-text-gray-700",children:c.toUpperCase()},c))}),r.length>3&&l.jsxs("button",{type:"button",onClick:()=>s(),className:"pr-text-xs pr-text-gray-500 pr-underline",children:["+",r.length-3," more languages"]})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-ml-auto pr-flex pr-flex-col pr-space-y-2",children:[l.jsxs("a",{href:o,className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Website",l.jsx(re.Link,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]}),l.jsxs("a",{href:"https://placeholder.com",className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Support",l.jsx(re.CircleHelp,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]})]})]})}function Pl({id:e,versionHistory:t}){const[n,r]=E.useState(!1),o=new Date;function a(c){const p=new Date(c),f=new Date(o.getTime()-p.getTime()),m=f.getUTCFullYear()-1970,v=f.getUTCMonth(),g=f.getUTCDate()-1;let d="";return m>0?d=`${m.toString()} year${m===1?"":"s"} ago`:v>0?d=`${v.toString()} month${v===1?"":"s"} ago`:g===0?d="today":d=`${g.toString()} day${g===1?"":"s"} ago`,d}const s=Object.entries(t).sort((c,p)=>p[0].localeCompare(c[0]));return l.jsxs("div",{id:e,children:[l.jsx("h3",{className:"pr-text-md pr-font-semibold",children:"What`s New"}),l.jsx("ul",{className:"pr-list-disc pr-pl-5 pr-pr-4 pr-text-xs pr-text-gray-600",children:(n?s:s.slice(0,5)).map(c=>l.jsxs("div",{className:"pr-mt-3 pr-flex pr-justify-between",children:[l.jsx("div",{className:"pr-text-gray-600",children:l.jsx("li",{className:"pr-prose pr-text-xs",children:l.jsx("span",{children:c[1].description})})}),l.jsxs("div",{className:"pr-justify-end pr-text-right",children:[l.jsxs("div",{children:["Version ",c[0]]}),l.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),s.length>5&&l.jsx("button",{type:"button",onClick:()=>r(!n),className:"pr-text-xs pr-text-gray-500 pr-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function Mb({id:e,publisherDisplayName:t,fileSize:n,locales:r,versionHistory:o}){const a=E.useMemo(()=>He.formatBytes(n),[n]),c=(p=>{const f=new Intl.DisplayNames(navigator.language,{type:"language"});return p.map(m=>f.of(m))})(r);return l.jsx("div",{id:e,className:"pr-border-t pr-pb-4 pr-pt-4",children:l.jsxs("div",{className:"pr-md:flex-row pr-md:space-x-8 pr-flex pr-flex-col pr-space-x-0",children:[l.jsx(Pl,{versionHistory:o}),l.jsx("div",{className:"pr-md:border-t-0 pr-md:border-l pr-md-h-auto pr-md-ml-8 pr-mt-4 pr-border-t pr-border-gray-300"}),l.jsxs("div",{className:"pr-md:mt-0 pr-mt-4 pr-flex-1 pr-space-y-3",children:[l.jsx("h2",{className:"pr-text-md pr-font-semibold",children:"Information"}),l.jsxs("div",{className:"pr-flex pr-items-start pr-justify-between pr-pr-4 pr-text-xs pr-text-gray-600",children:[l.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[l.jsx("span",{className:"pr-mb-2",children:"Publisher"}),l.jsx("span",{className:"pr-font-semibold",children:t}),l.jsx("span",{className:"pr-mb-2 pr-mt-4",children:"Size"}),l.jsx("span",{className:"pr-font-semibold",children:a})]}),l.jsx("div",{className:"pr-flex pr-w-3/4 pr-items-center pr-justify-between pr-text-xs pr-text-gray-600",children:l.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[l.jsx("span",{className:"pr-mb-2",children:"Languages"}),l.jsx("span",{className:"pr-font-semibold",children:c.join(", ")})]})})]})]})]})})}const Ib=(e,t)=>{E.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},ro=()=>!1,Db=(e,t)=>{const[n]=wr(E.useCallback(async()=>{if(!e)return ro;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),ro,{preserveValue:!1});E.useEffect(()=>()=>{n!==ro&&n()},[n])},$l=E.forwardRef(({className:e,...t},n)=>l.jsx("div",{ref:n,className:F("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));$l.displayName="Card";const _l=E.forwardRef(({className:e,...t},n)=>l.jsx("div",{ref:n,className:F("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));_l.displayName="CardHeader";const Ml=E.forwardRef(({className:e,...t},n)=>l.jsx("h3",{ref:n,className:F("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));Ml.displayName="CardTitle";const Il=E.forwardRef(({className:e,...t},n)=>l.jsx("p",{ref:n,className:F("pr-text-sm pr-text-muted-foreground",e),...t}));Il.displayName="CardDescription";const Dl=E.forwardRef(({className:e,...t},n)=>l.jsx("div",{ref:n,className:F("pr-p-6 pr-pt-0",e),...t}));Dl.displayName="CardContent";const Al=E.forwardRef(({className:e,...t},n)=>l.jsx("div",{ref:n,className:F("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));Al.displayName="CardFooter";const Ab=xo.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),Bl=E.forwardRef(({className:e,variant:t,...n},r)=>l.jsx("div",{ref:r,role:"alert",className:F(Ab({variant:t}),e),...n}));Bl.displayName="Alert";const Ll=E.forwardRef(({className:e,...t},n)=>l.jsxs("h5",{ref:n,className:F("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));Ll.displayName="AlertTitle";const Vl=E.forwardRef(({className:e,...t},n)=>l.jsx("div",{ref:n,className:F("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));Vl.displayName="AlertDescription";const Fl=E.forwardRef(({className:e,...t},n)=>l.jsxs(En.Root,{ref:n,className:F("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[l.jsx(En.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:l.jsx(En.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),l.jsx(En.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));Fl.displayName=En.Root.displayName;const zl=E.forwardRef(({className:e,...t},n)=>l.jsx(ao.Root,{className:F("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:n,children:l.jsx(ao.Thumb,{className:F("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));zl.displayName=ao.Root.displayName;exports.Alert=Bl;exports.AlertDescription=Vl;exports.AlertTitle=Ll;exports.BookChapterControl=Bc;exports.Button=be;exports.Card=$l;exports.CardContent=Dl;exports.CardDescription=Il;exports.CardFooter=Al;exports.CardHeader=_l;exports.CardTitle=Ml;exports.ChapterRangeSelector=ap;exports.Checkbox=Ws;exports.Checklist=sp;exports.ComboBox=so;exports.ContextMenu=rg;exports.DataTable=Ls;exports.DisableButton=Ng;exports.DropdownMenu=xr;exports.DropdownMenuCheckboxItem=kr;exports.DropdownMenuContent=Fn;exports.DropdownMenuGroup=js;exports.DropdownMenuItem=So;exports.DropdownMenuItemType=Rl;exports.DropdownMenuLabel=sn;exports.DropdownMenuPortal=Tc;exports.DropdownMenuRadioGroup=Cc;exports.DropdownMenuRadioItem=Co;exports.DropdownMenuSeparator=zn;exports.DropdownMenuShortcut=$s;exports.DropdownMenuSub=Sc;exports.DropdownMenuSubContent=Ps;exports.DropdownMenuSubTrigger=Rs;exports.DropdownMenuTrigger=To;exports.EnableButton=Eg;exports.FilterButton=jl;exports.FilterDropdown=Pb;exports.Footer=Mb;exports.GridMenu=Ui;exports.HamburgerMenuButton=tl;exports.INVENTORY_STRING_KEYS=Uc;exports.IconButton=sg;exports.Input=Vn;exports.InstallButton=kg;exports.Inventory=qc;exports.Label=Zo;exports.LabelPosition=Rt;exports.MarkdownRenderer=Rb;exports.MenuItem=Ko;exports.MoreInfo=_b;exports.NoExtensionsFound=$b;exports.ScriptureResultsViewer=fg;exports.SearchBar=hg;exports.Select=_n;exports.SelectContent=Jt;exports.SelectGroup=Ms;exports.SelectItem=Ke;exports.SelectLabel=Is;exports.SelectScrollDownButton=jo;exports.SelectScrollUpButton=Oo;exports.SelectSeparator=Ds;exports.SelectTrigger=Kt;exports.SelectValue=Mn;exports.ShadCnSlider=Fl;exports.ShadCnSwitch=zl;exports.Slider=gg;exports.Snackbar=bg;exports.Spinner=cn;exports.Switch=vg;exports.Table=Un;exports.TableBody=Gn;exports.TableCaption=Bs;exports.TableCell=It;exports.TableFooter=As;exports.TableHead=Zt;exports.TableHeader=Hn;exports.TableRow=lt;exports.Tabs=wg;exports.TabsContent=sl;exports.TabsList=ol;exports.TabsTrigger=al;exports.TextField=rl;exports.Toolbar=yg;exports.UpdateButton=Tg;exports.VersionHistory=Pl;exports.VerticalTabs=il;exports.VerticalTabsContent=cl;exports.VerticalTabsList=ll;exports.VerticalTabsTrigger=xg;exports.buttonVariants=_s;exports.getSortingIcon=Er;exports.inventoryCountColumn=Xc;exports.inventoryItemColumn=Wc;exports.inventoryStatusColumn=Yc;exports.useEvent=Ib;exports.useEventAsync=Db;exports.usePromise=wr;function Bb(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Bb(`.papi-icon-button {
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
`,"top");
//# sourceMappingURL=index.cjs.map
