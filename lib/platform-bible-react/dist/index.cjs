"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=require("react/jsx-runtime"),N=require("react"),re=require("lucide-react"),Ce=require("clsx"),ec=require("tailwind-merge"),ws=require("@radix-ui/react-dropdown-menu"),Je=require("platform-bible-utils"),Se=require("@tanstack/react-table"),tc=require("@radix-ui/react-slot"),wo=require("class-variance-authority"),nc=require("@radix-ui/react-select"),Ee=require("@mui/material"),rc=require("@radix-ui/react-popover"),Ie=require("cmdk"),oc=require("@radix-ui/react-dialog"),ro=require("@mui/styled-engine"),xn=require("react-dom"),ac=require("@radix-ui/react-label"),sc=require("@radix-ui/react-tabs"),ic=require("@radix-ui/react-slider"),lc=require("@radix-ui/react-switch");function nt(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const T=nt(N),he=nt(ws),we=nt(nc),Pn=nt(rc),Qe=nt(oc),cc=nt(xn),xs=nt(ac),De=nt(sc),kn=nt(ic),oo=nt(lc);const pc=ec.extendTailwindMerge({prefix:"pr-"});function F(...e){return pc(Ce.clsx(e))}const Ln=N.forwardRef(({className:e,type:t,...n},r)=>l.jsx("input",{type:t,className:F("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));Ln.displayName="Input";const dc=N.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},a)=>l.jsxs("div",{className:"pr-relative",children:[l.jsx(Ln,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r(),t(s)},onClick:n,ref:a}),l.jsx(re.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));var uc=Object.defineProperty,fc=(e,t,n)=>t in e?uc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,oe=(e,t,n)=>fc(e,typeof t!="symbol"?t+"":t,n);const Mt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],xo=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ks=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],ma=Ec();function an(e,t=!0){return t&&(e=e.toUpperCase()),e in ma?ma[e]:0}function ko(e){return an(e)>0}function mc(e){const t=typeof e=="string"?an(e):e;return t>=40&&t<=66}function hc(e){return(typeof e=="string"?an(e):e)<=39}function Es(e){return e<=66}function gc(e){const t=typeof e=="string"?an(e):e;return Cs(t)&&!Es(t)}function*bc(){for(let e=1;e<=Mt.length;e++)yield e}const vc=1,Ns=Mt.length;function yc(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Eo(e,t="***"){const n=e-1;return n<0||n>=Mt.length?t:Mt[n]}function Ts(e){return e<=0||e>Ns?"******":ks[e-1]}function wc(e){return Ts(an(e))}function Cs(e){const t=typeof e=="number"?Eo(e):e;return ko(t)&&!xo.includes(t)}function xc(e){const t=typeof e=="number"?Eo(e):e;return ko(t)&&xo.includes(t)}function kc(e){return ks[e-1].includes("*obsolete*")}function Ec(){const e={};for(let t=0;t<Mt.length;t++)e[Mt[t]]=t+1;return e}const fe={allBookIds:Mt,nonCanonicalIds:xo,bookIdToNumber:an,isBookIdValid:ko,isBookNT:mc,isBookOT:hc,isBookOTNT:Es,isBookDC:gc,allBookNumbers:bc,firstBook:vc,lastBook:Ns,extraBooks:yc,bookNumberToId:Eo,bookNumberToEnglishName:Ts,bookIdToEnglishName:wc,isCanonical:Cs,isExtraMaterial:xc,isObsolete:kc};var Ke=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ke||{});const Le=class{constructor(t){if(oe(this,"name"),oe(this,"fullPath"),oe(this,"isPresent"),oe(this,"hasVerseSegments"),oe(this,"isCustomized"),oe(this,"baseVersification"),oe(this,"scriptureBooks"),oe(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Ke[t]):(this._type=t,this.name=Ke[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};oe(Le,"Original",new Le(Ke.Original)),oe(Le,"Septuagint",new Le(Ke.Septuagint)),oe(Le,"Vulgate",new Le(Ke.Vulgate)),oe(Le,"English",new Le(Ke.English)),oe(Le,"RussianProtestant",new Le(Ke.RussianProtestant)),oe(Le,"RussianOrthodox",new Le(Ke.RussianOrthodox));let Ct=Le;function ha(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var Ss=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Ss||{});const $e=class le{constructor(t,n,r,o){if(oe(this,"firstChapter"),oe(this,"lastChapter"),oe(this,"lastVerse"),oe(this,"hasSegmentsDefined"),oe(this,"text"),oe(this,"BBBCCCVVVS"),oe(this,"longHashCode"),oe(this,"versification"),oe(this,"rtlMark","‏"),oe(this,"_bookNum",0),oe(this,"_chapterNum",0),oe(this,"_verseNum",0),oe(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const a=t,s=n!=null&&n instanceof Ct?n:void 0;this.setEmpty(s),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=n!=null&&n instanceof Ct?n:void 0;this.setEmpty(a),this._verseNum=t%le.chapterDigitShifter,this._chapterNum=Math.floor(t%le.bookDigitShifter/le.chapterDigitShifter),this._bookNum=Math.floor(t/le.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof le){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof Ct?t:le.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??le.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new le(t),{success:!0,verseRef:n}}catch(r){if(r instanceof mn)return n=new le,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%le.bcvMaxValue*le.bookDigitShifter+(n>=0?n%le.bcvMaxValue*le.chapterDigitShifter:0)+(r>=0?r%le.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:a,versificationStr:s}=t,c=a||o.toString();let p;return s&&(p=new Ct(s)),n?new le(n,r.toString(),c,p):new le}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>le.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(le.verseRangeSeparator)||this._verse.includes(le.verseSequenceIndicator))}get book(){return fe.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=fe.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=le.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=le.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>fe.lastBook)throw new mn("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Ct(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(le.verseRangeSeparators,le.verseSequenceIndicators)}get BBBCCC(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const s=+a[1].trim();this.versification=new Ct(Ke[s])}catch{throw new mn("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new mn("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||fe.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!le.isVerseParseable(r[1]))throw new mn("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new le(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete n.verse,n}equals(t){return t instanceof le?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=le.verseRangeSeparators,r=le.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=ha(this._verse,r);for(const s of a.map(c=>ha(c,n))){const c=this.clone();c.verse=s[0];const p=c.verseNum;if(o.push(c),s.length>1){const f=this.clone();if(f.verse=s[1],!t)for(let m=p+1;m<f.verseNum;m++){const v=new le(this._bookNum,this._chapterNum,m,this.versification);this.isExcluded||o.push(v)}o.push(f)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const a=o.internalValid;if(a!==0)return a;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>fe.lastBook?2:(fe.isCanonical(this._bookNum),0)}setEmpty(t=le.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=fe.bookIdToNumber(t),this.chapter=n,this.verse=r}};oe($e,"defaultVersification",Ct.English),oe($e,"verseRangeSeparator","-"),oe($e,"verseSequenceIndicator",","),oe($e,"verseRangeSeparators",[$e.verseRangeSeparator]),oe($e,"verseSequenceIndicators",[$e.verseSequenceIndicator]),oe($e,"chapterDigitShifter",1e3),oe($e,"bookDigitShifter",$e.chapterDigitShifter*$e.chapterDigitShifter),oe($e,"bcvMaxValue",$e.chapterDigitShifter-1),oe($e,"ValidStatusType",Ss);let mn=class extends Error{};const wr=he.Root,No=he.Trigger,Os=he.Group,Nc=he.Portal,Tc=he.Sub,Cc=he.RadioGroup,js=N.forwardRef(({className:e,inset:t,children:n,...r},o)=>l.jsxs(he.SubTrigger,{ref:o,className:F("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,l.jsx(re.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));js.displayName=he.SubTrigger.displayName;const Rs=N.forwardRef(({className:e,...t},n)=>l.jsx(he.SubContent,{ref:n,className:F("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));Rs.displayName=he.SubContent.displayName;const Vn=N.forwardRef(({className:e,sideOffset:t=4,...n},r)=>l.jsx(he.Portal,{children:l.jsx(he.Content,{ref:r,sideOffset:t,className:F("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));Vn.displayName=he.Content.displayName;const To=N.forwardRef(({className:e,inset:t,...n},r)=>l.jsx(he.Item,{ref:r,className:F("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));To.displayName=he.Item.displayName;const xr=N.forwardRef(({className:e,children:t,checked:n,...r},o)=>l.jsxs(he.CheckboxItem,{ref:o,className:F("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(he.ItemIndicator,{children:l.jsx(re.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));xr.displayName=he.CheckboxItem.displayName;const Co=N.forwardRef(({className:e,children:t,...n},r)=>l.jsxs(he.RadioItem,{ref:r,className:F("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(he.ItemIndicator,{children:l.jsx(re.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));Co.displayName=he.RadioItem.displayName;const sn=N.forwardRef(({className:e,inset:t,...n},r)=>l.jsx(he.Label,{ref:r,className:F("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));sn.displayName=he.Label.displayName;const Fn=N.forwardRef(({className:e,...t},n)=>l.jsx(he.Separator,{ref:n,className:F("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Fn.displayName=he.Separator.displayName;function Ps({className:e,...t}){return l.jsx("span",{className:F("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Ps.displayName="DropdownMenuShortcut";const Sc=N.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:a,children:s},c)=>l.jsxs(To,{ref:c,textValue:e,className:F("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:p=>{p.preventDefault(),t()},onKeyDown:p=>{o(p)},onFocus:r,onMouseMove:r,children:[l.jsx("span",{className:F("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":a.toLowerCase()==="ot","pr-border-l-purple-200":a.toLowerCase()==="nt","pr-border-l-indigo-200":a.toLowerCase()==="dc"}),children:fe.bookIdToEnglishName(e)}),n&&l.jsx("div",{children:s})]},e));function Oc({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const a=Array.from({length:t},(c,p)=>p+1),s=N.useCallback(c=>{o(c)},[o]);return l.jsx("div",{className:F("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:a.map(c=>l.jsx("div",{className:F("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":c===n,"pr-bg-amber-200":c===r}),onClick:p=>{p.preventDefault(),p.stopPropagation(),e(c)},role:"button",onKeyDown:p=>{p.key==="Enter"&&e(c)},tabIndex:0,onMouseMove:()=>s(c),children:c},c))})}function jc({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return l.jsxs(sn,{className:"pr-flex pr-justify-between",children:[l.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),l.jsxs("div",{className:"pr-flex pr-items-center",children:[l.jsx(re.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),l.jsx(re.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),l.jsx(re.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const Cn=fe.allBookIds,Rc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ga=["OT","NT","DC"],Pc=32+32+32,$c=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],_c=e=>({OT:Cn.filter(n=>fe.isBookOT(n)),NT:Cn.filter(n=>fe.isBookNT(n)),DC:Cn.filter(n=>fe.isBookDC(n))})[e],hn=e=>Je.getChaptersForBook(fe.bookIdToNumber(e));function Mc(){return Cn.map(t=>fe.bookIdToEnglishName(t))}function Ic(e){return Mc().includes(e)}function Dc(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(Ic(t))return Cn.find(r=>fe.bookIdToEnglishName(r)===t)}function Ac({scrRef:e,handleSubmit:t}){const[n,r]=N.useState(""),[o,a]=N.useState(fe.bookNumberToId(e.bookNum)),[s,c]=N.useState(e.chapterNum??0),[p,f]=N.useState(fe.bookNumberToId(e.bookNum)),[m,v]=N.useState(!1),[g,d]=N.useState(m),h=N.useRef(void 0),u=N.useRef(void 0),b=N.useRef(void 0),x=N.useCallback(E=>_c(E).filter(O=>{const $=fe.bookIdToEnglishName(O).toLowerCase(),z=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return $.includes(z)||O.toLowerCase().includes(z)}),[n]),j=E=>{r(E)},w=N.useRef(!1),k=N.useCallback(E=>{if(w.current){w.current=!1;return}v(E)},[]),y=N.useCallback((E,O,$,z)=>{if(c(fe.bookNumberToId(e.bookNum)!==E?1:e.chapterNum),O||hn(E)===-1){t({bookNum:fe.bookIdToNumber(E),chapterNum:$||1,verseNum:z||1}),v(!1),r("");return}a(o!==E?E:""),v(!O)},[t,e.bookNum,e.chapterNum,o]),C=E=>{E<=0||E>hn(o)||y(o,!0,E)},S=N.useCallback(()=>{$c.forEach(E=>{const O=n.match(E);if(O){const[$,z=void 0,H=void 0]=O.slice(1),A=Dc($);(fe.isBookIdValid($)||A)&&y(A??$,!0,z?parseInt(z,10):1,H?parseInt(H,10):1)}})},[y,n]),_=N.useCallback(E=>{m?(E.key==="ArrowDown"||E.key==="ArrowUp")&&(typeof b<"u"&&b.current!==null?b.current.focus():typeof u<"u"&&u.current!==null&&u.current.focus(),E.preventDefault()):v(!0)},[m]),D=E=>{const{key:O}=E;O==="ArrowRight"||O==="ArrowLeft"||O==="ArrowDown"||O==="ArrowUp"||O==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:O})),h.current.focus())},V=E=>{const{key:O}=E;if(p===o){if(O==="Enter"){E.preventDefault(),y(o,!0,s);return}let $=0;if(O==="ArrowRight")if(s<hn(p))$=1;else{E.preventDefault();return}else if(O==="ArrowLeft")if(s>1)$=-1;else{E.preventDefault();return}else O==="ArrowDown"?$=6:O==="ArrowUp"&&($=-6);s+$<=0||s+$>hn(p)?c(0):$!==0&&(c(s+$),E.preventDefault())}};return N.useEffect(()=>{o===p?o===fe.bookNumberToId(e.bookNum)?c(e.chapterNum):c(1):c(0)},[p,e.bookNum,e.chapterNum,o]),N.useLayoutEffect(()=>{d(m)},[m]),N.useLayoutEffect(()=>{const E=setTimeout(()=>{if(g&&u.current&&b.current){const $=b.current.offsetTop-Pc;u.current.scrollTo({top:$,behavior:"instant"})}},10);return()=>{clearTimeout(E)}},[g]),l.jsx("div",{className:"pr-flex",children:l.jsxs(wr,{modal:!1,open:m,onOpenChange:k,children:[l.jsx(No,{asChild:!0,children:l.jsx(dc,{ref:h,value:n,handleSearch:j,handleKeyDown:_,handleOnClick:()=>{a(fe.bookNumberToId(e.bookNum)),f(fe.bookNumberToId(e.bookNum)),c(e.chapterNum>0?e.chapterNum:0),v(!0),h.current.focus()},onFocus:()=>{w.current=!0},handleSubmit:S,placeholder:`${fe.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),l.jsxs(Vn,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:D,align:"start",ref:u,children:[l.jsx(jc,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),ga.map((E,O)=>x(E).length>0&&l.jsxs("div",{children:[l.jsx(sn,{className:"pr-font-semibold pr-text-slate-700",children:Rc[E]}),x(E).map($=>l.jsx("div",{children:l.jsx(Sc,{bookId:$,handleSelectBook:()=>y($,!1),isSelected:o===$,handleHighlightBook:()=>f($),handleKeyDown:V,bookType:E,ref:z=>{o===$&&(b.current=z)},children:l.jsx(Oc,{handleSelectChapter:C,endChapter:hn($),activeChapter:e.bookNum===fe.bookIdToNumber($)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:z=>{c(z)}})})},$)),ga.length-1!==O?l.jsx(Fn,{}):void 0]},E))]})]})})}const $s=wo.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),be=N.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},a)=>{const s=r?tc.Slot:"button";return l.jsx(s,{className:F($s({variant:t,size:n,className:e})),ref:a,...o})});be.displayName="Button";function Bc({table:e}){return l.jsxs(wr,{children:[l.jsx(ws.DropdownMenuTrigger,{asChild:!0,children:l.jsxs(be,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[l.jsx(re.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),l.jsxs(Vn,{align:"end",className:"pr-w-[150px]",children:[l.jsx(sn,{children:"Toggle columns"}),l.jsx(Fn,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>l.jsx(xr,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}const $n=we.Root,_s=we.Group,_n=we.Value,Kt=N.forwardRef(({className:e,children:t,...n},r)=>l.jsxs(we.Trigger,{ref:r,className:F("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...n,children:[t,l.jsx(we.Icon,{asChild:!0,children:l.jsx(re.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));Kt.displayName=we.Trigger.displayName;const So=N.forwardRef(({className:e,...t},n)=>l.jsx(we.ScrollUpButton,{ref:n,className:F("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:l.jsx(re.ChevronUp,{className:"pr-h-4 pr-w-4"})}));So.displayName=we.ScrollUpButton.displayName;const Oo=N.forwardRef(({className:e,...t},n)=>l.jsx(we.ScrollDownButton,{ref:n,className:F("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:l.jsx(re.ChevronDown,{className:"pr-h-4 pr-w-4"})}));Oo.displayName=we.ScrollDownButton.displayName;const Jt=N.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>l.jsx(we.Portal,{children:l.jsxs(we.Content,{ref:o,className:F("pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:n,...r,children:[l.jsx(So,{}),l.jsx(we.Viewport,{className:F("pr-p-1",n==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),l.jsx(Oo,{})]})}));Jt.displayName=we.Content.displayName;const Ms=N.forwardRef(({className:e,...t},n)=>l.jsx(we.Label,{ref:n,className:F("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));Ms.displayName=we.Label.displayName;const Ye=N.forwardRef(({className:e,children:t,...n},r)=>l.jsxs(we.Item,{ref:r,className:F("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(we.ItemIndicator,{children:l.jsx(re.Check,{className:"pr-h-4 pr-w-4"})})}),l.jsx(we.ItemText,{children:t})]}));Ye.displayName=we.Item.displayName;const Is=N.forwardRef(({className:e,...t},n)=>l.jsx(we.Separator,{ref:n,className:F("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Is.displayName=we.Separator.displayName;function Lc({table:e}){return l.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[l.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[l.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),l.jsxs($n,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[l.jsx(Kt,{className:"pr-h-8 pr-w-[70px]",children:l.jsx(_n,{placeholder:e.getState().pagination.pageSize})}),l.jsx(Jt,{side:"top",children:[10,20,30,40,50].map(t=>l.jsx(Ye,{value:`${t}`,children:t},t))})]})]}),l.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[l.jsxs(be,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),l.jsx(re.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(be,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),l.jsx(re.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(be,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),l.jsx(re.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(be,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),l.jsx(re.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}const zn=N.forwardRef(({className:e,stickyHeader:t,...n},r)=>l.jsx("div",{className:F("pr-relative pr-w-full",{"pr-overflow-auto":!t}),children:l.jsx("table",{ref:r,className:F("pr-w-full pr-caption-bottom pr-text-sm",e),...n})}));zn.displayName="Table";const Hn=N.forwardRef(({className:e,stickyHeader:t,...n},r)=>l.jsx("thead",{ref:r,className:F({"pr-sticky pr-top-0 pr-bg-secondary":t},"[&_tr]:pr-border-b",e),...n}));Hn.displayName="TableHeader";const Un=N.forwardRef(({className:e,...t},n)=>l.jsx("tbody",{ref:n,className:F("[&_tr:last-child]:pr-border-0",e),...t}));Un.displayName="TableBody";const Ds=N.forwardRef(({className:e,...t},n)=>l.jsx("tfoot",{ref:n,className:F("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));Ds.displayName="TableFooter";const lt=N.forwardRef(({className:e,...t},n)=>l.jsx("tr",{ref:n,className:F("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));lt.displayName="TableRow";const Zt=N.forwardRef(({className:e,...t},n)=>l.jsx("th",{ref:n,className:F("pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",e),...t}));Zt.displayName="TableHead";const It=N.forwardRef(({className:e,...t},n)=>l.jsx("td",{ref:n,className:F("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0",e),...t}));It.displayName="TableCell";const As=N.forwardRef(({className:e,...t},n)=>l.jsx("caption",{ref:n,className:F("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));As.displayName="TableCaption";function Bs({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,stickyHeader:a=!1,onRowClickHandler:s=()=>{}}){var b;const[c,p]=N.useState([]),[f,m]=N.useState([]),[v,g]=N.useState({}),[d,h]=N.useState({}),u=Se.useReactTable({data:t,columns:e,getCoreRowModel:Se.getCoreRowModel(),...n&&{getPaginationRowModel:Se.getPaginationRowModel()},onSortingChange:p,getSortedRowModel:Se.getSortedRowModel(),onColumnFiltersChange:m,getFilteredRowModel:Se.getFilteredRowModel(),onColumnVisibilityChange:g,onRowSelectionChange:h,state:{sorting:c,columnFilters:f,columnVisibility:v,rowSelection:d}});return l.jsxs("div",{className:"pr-twp pr-font-sans",children:[o&&l.jsx(Bc,{table:u}),l.jsxs(zn,{stickyHeader:a,children:[l.jsx(Hn,{stickyHeader:a,children:u.getHeaderGroups().map(x=>l.jsx(lt,{children:x.headers.map(j=>l.jsx(Zt,{children:j.isPlaceholder?void 0:Se.flexRender(j.column.columnDef.header,j.getContext())},j.id))},x.id))}),l.jsx(Un,{children:(b=u.getRowModel().rows)!=null&&b.length?u.getRowModel().rows.map(x=>l.jsx(lt,{onClick:()=>s(x,u),"data-state":x.getIsSelected()&&"selected",children:x.getVisibleCells().map(j=>l.jsx(It,{children:Se.flexRender(j.column.columnDef.cell,j.getContext())},j.id))},x.id)):l.jsx(lt,{children:l.jsx(It,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]}),n&&l.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[l.jsx(be,{variant:"outline",size:"sm",onClick:()=>u.previousPage(),disabled:!u.getCanPreviousPage(),children:"Previous"}),l.jsx(be,{variant:"outline",size:"sm",onClick:()=>u.nextPage(),disabled:!u.getCanNextPage(),children:"Next"})]}),n&&r&&l.jsx(Lc,{table:u})]})}const Vc=e=>e.split(/(?=\n|\\(?:v|c|id))/g),ba=e=>{const t=/^\\[vc]\s+(\d+)/,n=e.match(t);return n?+n[1]:0},va=(e,t,n,r)=>{if(!e||e===""||t==="")return[];const o=[],a=Vc(e);let s=r.chapterNum,c=r.verseNum,p=0;return a.forEach(f=>{f.startsWith("\\id")&&(s=0,c=0),f.startsWith("\\c")&&(s=ba(f),c=0),f.startsWith("\\v")&&(c=ba(f),s===0&&(s=r.chapterNum));const m=n(f,t);for(let v=0;v<m.length;v++){const g={reference:{...r,chapterNum:+s,verseNum:+c},snippet:f,key:p};p+=1,o.push(g)}}),o};function Fc({selectedItem:e,text:t,extractItems:n,scriptureReference:r,setScriptureReference:o,localizedStrings:a}){const s=a["%webView_inventory_occurrences_table_header_reference%"],c=a["%webView_inventory_occurrences_table_header_occurrence%"],[p,f]=N.useState(va(t,e,n,r));return N.useEffect(()=>f(va(t,e,n,r)),[t,e,r,n]),l.jsxs(zn,{stickyHeader:!0,children:[l.jsx(Hn,{stickyHeader:!0,children:l.jsxs(lt,{children:[l.jsx(Zt,{children:s}),l.jsx(Zt,{children:c})]})}),l.jsx(Un,{children:p.map(m=>l.jsxs(lt,{onClick:()=>{o(m.reference)},children:[l.jsx(It,{children:`${fe.bookNumberToEnglishName(m.reference.bookNum)} ${m.reference.chapterNum}:${m.reference.verseNum}`}),l.jsx(It,{children:m.snippet})]},m.key))})]})}const zc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_book%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),kr=e=>e==="asc"?l.jsx(re.ArrowUpIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):e==="desc"?l.jsx(re.ArrowDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):l.jsx(re.ArrowUpDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}),Hc=(e,t,n)=>{let r=e;return t!=="all"&&(r=r.filter(o=>t==="approved"&&o.status==="approved"||t==="unapproved"&&o.status==="unapproved"||t==="unknown"&&o.status==="unknown")),n!==""&&(r=r.filter(o=>o.item.includes(n))),r},Uc=(e,t,n)=>{const r=[],o=t(e);for(let a=0;a<o.length;a++){const s=o[a],c=r.find(p=>p.item===s);if(c)c.count+=1;else{const p={item:s,count:1,status:n(s)};r.push(p)}}return r},gt=(e,t)=>e[t]??t;function Gc({scriptureReference:e,setScriptureReference:t,localizedStrings:n,extractItems:r,approvedItems:o,onApprovedItemsChange:a,unapprovedItems:s,onUnapprovedItemsChange:c,text:p,scope:f,onScopeChange:m,getColumns:v}){const g=gt(n,"%webView_inventory_all%"),d=gt(n,"%webView_inventory_approved%"),h=gt(n,"%webView_inventory_unapproved%"),u=gt(n,"%webView_inventory_unknown%"),b=gt(n,"%webView_inventory_scope_book%"),x=gt(n,"%webView_inventory_scope_chapter%"),j=gt(n,"%webView_inventory_scope_verse%"),w=gt(n,"%webView_inventory_filter_text%"),[k,y]=N.useState([]),[C,S]=N.useState("all"),[_,D]=N.useState(""),[V,E]=N.useState(""),O=N.useCallback((B,J)=>{y(M=>{let U=[];return B.forEach(K=>{U=M.map(G=>G.item===K&&G.status!==J?{...G,status:J}:G)}),U});let Z=[...o];B.forEach(M=>{J==="approved"?Z.includes(M)||Z.push(M):Z=Z.filter(U=>U!==M)}),a(Z);let R=[...s];B.forEach(M=>{J==="unapproved"?R.includes(M)||R.push(M):R=R.filter(U=>U!==M)}),c(R)},[o,a,s,c]),$=N.useCallback(B=>o.includes(B)?"approved":s.includes(B)?"unapproved":"unknown",[o,s]);N.useEffect(()=>{p&&y(Uc(p,r,$))},[r,p,$]);const z=N.useMemo(()=>Hc(k,C,_),[k,C,_]);N.useEffect(()=>{E("")},[z]);const H=(B,J)=>{J.toggleAllRowsSelected(!1),B.toggleSelected(void 0),E(B.getValue("item"))},A=N.useMemo(()=>v(O),[v,O]);return l.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-flex-col",children:[l.jsxs("div",{className:"pr-flex",children:[l.jsxs($n,{onValueChange:B=>S(B),defaultValue:C,children:[l.jsx(Kt,{className:"pr-m-1",children:l.jsx(_n,{placeholder:"Select filter"})}),l.jsxs(Jt,{className:"pr-font-sans",children:[l.jsx(Ye,{value:"all",children:g}),l.jsx(Ye,{value:"approved",children:d}),l.jsx(Ye,{value:"unapproved",children:h}),l.jsx(Ye,{value:"unknown",children:u})]})]}),l.jsxs($n,{onValueChange:B=>m(B),defaultValue:f,children:[l.jsx(Kt,{className:"pr-m-1",children:l.jsx(_n,{placeholder:"Select scope"})}),l.jsxs(Jt,{className:"pr-font-sans",children:[l.jsx(Ye,{value:"book",children:b}),l.jsx(Ye,{value:"chapter",children:x}),l.jsx(Ye,{value:"verse",children:j})]})]}),l.jsx(Ln,{className:"pr-m-1 pr-rounded-md pr-border",placeholder:w,value:_,onChange:B=>{D(B.target.value)}})]}),l.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:l.jsx(Bs,{columns:A,data:z,onRowClickHandler:H,stickyHeader:!0})}),V!==""&&l.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:l.jsx(Fc,{selectedItem:V,text:p,extractItems:r,scriptureReference:e,setScriptureReference:B=>t(B),localizedStrings:n})})]})}const qc=e=>({accessorKey:"item",header:({column:t})=>l.jsxs(be,{onClick:()=>t.toggleSorting(void 0),children:[e,kr(t.getIsSorted())]})}),Wc=e=>({accessorKey:"count",header:({column:t})=>l.jsxs(be,{onClick:()=>t.toggleSorting(void 0),children:[e,kr(t.getIsSorted())]})}),Xc=(e,t)=>({accessorKey:"status",header:({column:n,table:r})=>{const o=r.getSelectedRowModel().rows,a=[];return o.forEach(s=>{a.push(s.getValue("item"))}),l.jsxs("div",{children:[l.jsx("div",{className:"pr-flex pr-justify-center",children:l.jsxs(be,{className:"pr-mt-1",onClick:()=>n.toggleSorting(void 0),children:[e,kr(n.getIsSorted())]})}),l.jsxs("div",{className:"pr-flex pr-justify-center",children:[l.jsx(be,{className:"pr-m-1",children:l.jsx(re.CircleCheckIcon,{onClick:()=>{t(a,"approved")}})}),l.jsx(be,{className:"pr-m-1",children:l.jsx(re.CircleXIcon,{onClick:()=>{t(a,"unapproved")}})}),l.jsx(be,{className:"pr-m-1",children:l.jsx(re.CircleHelpIcon,{onClick:()=>{t(a,"unknown")}})})]})]})},cell:({row:n})=>{switch(n.getValue("status")){case"approved":return l.jsx(re.CircleCheckIcon,{});case"unapproved":return l.jsx(re.CircleXIcon,{});case"unknown":default:return l.jsx(re.CircleHelpIcon,{})}}}),Yc=Pn.Root,Kc=Pn.Trigger,Ls=N.forwardRef(({className:e,align:t="center",sideOffset:n=4,...r},o)=>l.jsx(Pn.Portal,{children:l.jsx(Pn.Content,{ref:o,align:t,sideOffset:n,className:F("pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r})}));Ls.displayName=Pn.Content.displayName;const Jc=Qe.Portal,Vs=N.forwardRef(({className:e,...t},n)=>l.jsx(Qe.Overlay,{ref:n,className:F("pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",e),...t}));Vs.displayName=Qe.Overlay.displayName;const Zc=N.forwardRef(({className:e,children:t,...n},r)=>l.jsxs(Jc,{children:[l.jsx(Vs,{}),l.jsxs(Qe.Content,{ref:r,className:F("pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",e),...n,children:[t,l.jsxs(Qe.Close,{className:"pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground",children:[l.jsx(re.X,{className:"pr-h-4 pr-w-4"}),l.jsx("span",{className:"pr-sr-only",children:"Close"})]})]})]}));Zc.displayName=Qe.Content.displayName;const Qc=N.forwardRef(({className:e,...t},n)=>l.jsx(Qe.Title,{ref:n,className:F("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight",e),...t}));Qc.displayName=Qe.Title.displayName;const ep=N.forwardRef(({className:e,...t},n)=>l.jsx(Qe.Description,{ref:n,className:F("pr-text-sm pr-text-muted-foreground",e),...t}));ep.displayName=Qe.Description.displayName;const Fs=N.forwardRef(({className:e,...t},n)=>l.jsx(Ie.Command,{ref:n,className:F("pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",e),...t}));Fs.displayName=Ie.Command.displayName;const zs=N.forwardRef(({className:e,...t},n)=>l.jsxs("div",{className:"pr-flex pr-items-center pr-border-b pr-px-3",children:[l.jsx(re.Search,{className:"pr-mr-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"}),l.jsx(Ie.Command.Input,{ref:n,className:F("pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...t})]}));zs.displayName=Ie.Command.Input.displayName;const Hs=N.forwardRef(({className:e,...t},n)=>l.jsx(Ie.Command.List,{ref:n,className:F("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden",e),...t}));Hs.displayName=Ie.Command.List.displayName;const Us=N.forwardRef((e,t)=>l.jsx(Ie.Command.Empty,{ref:t,className:"pr-py-6 pr-text-center pr-text-sm",...e}));Us.displayName=Ie.Command.Empty.displayName;const tp=N.forwardRef(({className:e,...t},n)=>l.jsx(Ie.Command.Group,{ref:n,className:F("pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",e),...t}));tp.displayName=Ie.Command.Group.displayName;const np=N.forwardRef(({className:e,...t},n)=>l.jsx(Ie.Command.Separator,{ref:n,className:F("pr--mx-1 pr-h-px pr-bg-border",e),...t}));np.displayName=Ie.Command.Separator.displayName;const Gs=N.forwardRef(({className:e,...t},n)=>l.jsx(Ie.Command.Item,{ref:n,className:F("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",e),...t}));Gs.displayName=Ie.Command.Item.displayName;function rp(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function ao({id:e,options:t=[],className:n,value:r,onChange:o=()=>{},getOptionLabel:a=rp,buttonPlaceholder:s="",textPlaceholder:c="",commandEmptyMessage:p="No option found",buttonVariant:f="outline"}){const[m,v]=N.useState(!1);return l.jsxs(Yc,{open:m,onOpenChange:v,children:[l.jsx(Kc,{asChild:!0,children:l.jsxs(be,{variant:f,role:"combobox","aria-expanded":m,id:e,className:F("pr-w-[200px] pr-justify-between",n),children:[r?a(r):s,l.jsx(re.ChevronsUpDown,{className:"pr-ml-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"})]})}),l.jsx(Ls,{className:"pr-w-[200px] pr-p-0",children:l.jsxs(Fs,{children:[l.jsx(zs,{placeholder:c,className:"pr-text-inherit"}),l.jsx(Us,{children:p}),l.jsx(Hs,{children:t.map(g=>l.jsxs(Gs,{value:a(g),onSelect:()=>{o(g),v(!1)},children:[l.jsx(re.Check,{className:F("pr-mr-2 pr-h-4 pr-w-4",{"pr-opacity-0":!r||a(r)!==a(g)})}),a(g)]},a(g)))})]})})]})}function op({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,a]=N.useState(1),[s,c]=N.useState(r),[p,f]=N.useState(Array.from({length:r},(g,d)=>d+1));N.useEffect(()=>{a(1),e(1),c(r),t(r),f(Array.from({length:r},(g,d)=>d+1))},[r,t,e]);const m=g=>{a(g),e(g),g>s&&(c(g),t(g))},v=g=>{c(g),t(g),g<o&&(a(g),e(g))};return l.jsxs(l.Fragment,{children:[l.jsx(Ee.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:l.jsx(ao,{onChange:m,className:"book-selection-chapter",options:p,getOptionLabel:g=>g.toString(),value:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),l.jsx(Ee.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:l.jsx(ao,{onChange:v,className:"book-selection-chapter",options:p,getOptionLabel:g=>g.toString(),value:s},"end chapter"),label:"to",labelPlacement:"start"})]})}var Rt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Rt||{});function qs({id:e,isChecked:t,labelText:n="",labelPosition:r=Rt.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:s=!1,hasError:c=!1,className:p,onChange:f}){const m=l.jsx(Ee.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:a,disabled:s,className:`papi-checkbox ${c?"error":""} ${p??""}`,onChange:f});let v;if(n){const g=r===Rt.Before||r===Rt.Above,d=l.jsx("span",{className:`papi-checkbox-label ${c?"error":""} ${p??""}`,children:n}),h=r===Rt.Before||r===Rt.After,u=h?d:l.jsx("div",{children:d}),b=h?m:l.jsx("div",{children:m});v=l.jsxs(Ee.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:c,children:[g&&u,b,!g&&u]})}else v=m;return v}function ap({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:a,createLabel:s}){return l.jsxs("fieldset",{id:e,className:t,children:[n&&l.jsx("legend",{children:n}),r.map(c=>l.jsx(qs,{className:"check-item",isChecked:o.includes(c),labelText:s?s(c):c,onChange:()=>a(c)},c))]})}function sp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function ip(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var jo={},Ws={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Ws);var lp=Ws.exports,Vr={};function ln(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},P.apply(this,arguments)}function Pt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Xs(e){if(!Pt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Xs(e[n])}),t}function ct(e,t,n={clone:!0}){const r=n.clone?P({},e):e;return Pt(e)&&Pt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Pt(t[o])&&o in e&&Pt(e[o])?r[o]=ct(e[o],t[o],n):n.clone?r[o]=Pt(t[o])?Xs(t[o]):t[o]:r[o]=t[o])}),r}var so={exports:{}},tr={exports:{}},ce={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ya;function cp(){if(ya)return ce;ya=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,f=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,u=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,j=e?Symbol.for("react.scope"):60119;function w(y){if(typeof y=="object"&&y!==null){var C=y.$$typeof;switch(C){case t:switch(y=y.type,y){case p:case f:case r:case a:case o:case v:return y;default:switch(y=y&&y.$$typeof,y){case c:case m:case h:case d:case s:return y;default:return C}}case n:return C}}}function k(y){return w(y)===f}return ce.AsyncMode=p,ce.ConcurrentMode=f,ce.ContextConsumer=c,ce.ContextProvider=s,ce.Element=t,ce.ForwardRef=m,ce.Fragment=r,ce.Lazy=h,ce.Memo=d,ce.Portal=n,ce.Profiler=a,ce.StrictMode=o,ce.Suspense=v,ce.isAsyncMode=function(y){return k(y)||w(y)===p},ce.isConcurrentMode=k,ce.isContextConsumer=function(y){return w(y)===c},ce.isContextProvider=function(y){return w(y)===s},ce.isElement=function(y){return typeof y=="object"&&y!==null&&y.$$typeof===t},ce.isForwardRef=function(y){return w(y)===m},ce.isFragment=function(y){return w(y)===r},ce.isLazy=function(y){return w(y)===h},ce.isMemo=function(y){return w(y)===d},ce.isPortal=function(y){return w(y)===n},ce.isProfiler=function(y){return w(y)===a},ce.isStrictMode=function(y){return w(y)===o},ce.isSuspense=function(y){return w(y)===v},ce.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===r||y===f||y===a||y===o||y===v||y===g||typeof y=="object"&&y!==null&&(y.$$typeof===h||y.$$typeof===d||y.$$typeof===s||y.$$typeof===c||y.$$typeof===m||y.$$typeof===b||y.$$typeof===x||y.$$typeof===j||y.$$typeof===u)},ce.typeOf=w,ce}var pe={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wa;function pp(){return wa||(wa=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,f=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,u=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,j=e?Symbol.for("react.scope"):60119;function w(L){return typeof L=="string"||typeof L=="function"||L===r||L===f||L===a||L===o||L===v||L===g||typeof L=="object"&&L!==null&&(L.$$typeof===h||L.$$typeof===d||L.$$typeof===s||L.$$typeof===c||L.$$typeof===m||L.$$typeof===b||L.$$typeof===x||L.$$typeof===j||L.$$typeof===u)}function k(L){if(typeof L=="object"&&L!==null){var te=L.$$typeof;switch(te){case t:var I=L.type;switch(I){case p:case f:case r:case a:case o:case v:return I;default:var ie=I&&I.$$typeof;switch(ie){case c:case m:case h:case d:case s:return ie;default:return te}}case n:return te}}}var y=p,C=f,S=c,_=s,D=t,V=m,E=r,O=h,$=d,z=n,H=a,A=o,B=v,J=!1;function Z(L){return J||(J=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),R(L)||k(L)===p}function R(L){return k(L)===f}function M(L){return k(L)===c}function U(L){return k(L)===s}function K(L){return typeof L=="object"&&L!==null&&L.$$typeof===t}function G(L){return k(L)===m}function q(L){return k(L)===r}function X(L){return k(L)===h}function Y(L){return k(L)===d}function W(L){return k(L)===n}function Q(L){return k(L)===a}function ee(L){return k(L)===o}function se(L){return k(L)===v}pe.AsyncMode=y,pe.ConcurrentMode=C,pe.ContextConsumer=S,pe.ContextProvider=_,pe.Element=D,pe.ForwardRef=V,pe.Fragment=E,pe.Lazy=O,pe.Memo=$,pe.Portal=z,pe.Profiler=H,pe.StrictMode=A,pe.Suspense=B,pe.isAsyncMode=Z,pe.isConcurrentMode=R,pe.isContextConsumer=M,pe.isContextProvider=U,pe.isElement=K,pe.isForwardRef=G,pe.isFragment=q,pe.isLazy=X,pe.isMemo=Y,pe.isPortal=W,pe.isProfiler=Q,pe.isStrictMode=ee,pe.isSuspense=se,pe.isValidElementType=w,pe.typeOf=k}()),pe}var xa;function Ys(){return xa||(xa=1,process.env.NODE_ENV==="production"?tr.exports=cp():tr.exports=pp()),tr.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Fr,ka;function dp(){if(ka)return Fr;ka=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var s={},c=0;c<10;c++)s["_"+String.fromCharCode(c)]=c;var p=Object.getOwnPropertyNames(s).map(function(m){return s[m]});if(p.join("")!=="0123456789")return!1;var f={};return"abcdefghijklmnopqrst".split("").forEach(function(m){f[m]=m}),Object.keys(Object.assign({},f)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Fr=o()?Object.assign:function(a,s){for(var c,p=r(a),f,m=1;m<arguments.length;m++){c=Object(arguments[m]);for(var v in c)t.call(c,v)&&(p[v]=c[v]);if(e){f=e(c);for(var g=0;g<f.length;g++)n.call(c,f[g])&&(p[f[g]]=c[f[g]])}}return p},Fr}var zr,Ea;function Ro(){if(Ea)return zr;Ea=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return zr=e,zr}var Hr,Na;function Ks(){return Na||(Na=1,Hr=Function.call.bind(Object.prototype.hasOwnProperty)),Hr}var Ur,Ta;function up(){if(Ta)return Ur;Ta=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Ro(),n={},r=Ks();e=function(a){var s="Warning: "+a;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(a,s,c,p,f){if(process.env.NODE_ENV!=="production"){for(var m in a)if(r(a,m)){var v;try{if(typeof a[m]!="function"){var g=Error((p||"React class")+": "+c+" type `"+m+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[m]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw g.name="Invariant Violation",g}v=a[m](s,m,p,c,null,t)}catch(h){v=h}if(v&&!(v instanceof Error)&&e((p||"React class")+": type specification of "+c+" `"+m+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof v+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),v instanceof Error&&!(v.message in n)){n[v.message]=!0;var d=f?f():"";e("Failed "+c+" type: "+v.message+(d??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Ur=o,Ur}var Gr,Ca;function fp(){if(Ca)return Gr;Ca=1;var e=Ys(),t=dp(),n=Ro(),r=Ks(),o=up(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(c){var p="Warning: "+c;typeof console<"u"&&console.error(p);try{throw new Error(p)}catch{}});function s(){return null}return Gr=function(c,p){var f=typeof Symbol=="function"&&Symbol.iterator,m="@@iterator";function v(R){var M=R&&(f&&R[f]||R[m]);if(typeof M=="function")return M}var g="<<anonymous>>",d={array:x("array"),bigint:x("bigint"),bool:x("boolean"),func:x("function"),number:x("number"),object:x("object"),string:x("string"),symbol:x("symbol"),any:j(),arrayOf:w,element:k(),elementType:y(),instanceOf:C,node:V(),objectOf:_,oneOf:S,oneOfType:D,shape:O,exact:$};function h(R,M){return R===M?R!==0||1/R===1/M:R!==R&&M!==M}function u(R,M){this.message=R,this.data=M&&typeof M=="object"?M:{},this.stack=""}u.prototype=Error.prototype;function b(R){if(process.env.NODE_ENV!=="production")var M={},U=0;function K(q,X,Y,W,Q,ee,se){if(W=W||g,ee=ee||Y,se!==n){if(p){var L=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw L.name="Invariant Violation",L}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var te=W+":"+Y;!M[te]&&U<3&&(a("You are manually calling a React.PropTypes validation function for the `"+ee+"` prop on `"+W+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),M[te]=!0,U++)}}return X[Y]==null?q?X[Y]===null?new u("The "+Q+" `"+ee+"` is marked as required "+("in `"+W+"`, but its value is `null`.")):new u("The "+Q+" `"+ee+"` is marked as required in "+("`"+W+"`, but its value is `undefined`.")):null:R(X,Y,W,Q,ee)}var G=K.bind(null,!1);return G.isRequired=K.bind(null,!0),G}function x(R){function M(U,K,G,q,X,Y){var W=U[K],Q=A(W);if(Q!==R){var ee=B(W);return new u("Invalid "+q+" `"+X+"` of type "+("`"+ee+"` supplied to `"+G+"`, expected ")+("`"+R+"`."),{expectedType:R})}return null}return b(M)}function j(){return b(s)}function w(R){function M(U,K,G,q,X){if(typeof R!="function")return new u("Property `"+X+"` of component `"+G+"` has invalid PropType notation inside arrayOf.");var Y=U[K];if(!Array.isArray(Y)){var W=A(Y);return new u("Invalid "+q+" `"+X+"` of type "+("`"+W+"` supplied to `"+G+"`, expected an array."))}for(var Q=0;Q<Y.length;Q++){var ee=R(Y,Q,G,q,X+"["+Q+"]",n);if(ee instanceof Error)return ee}return null}return b(M)}function k(){function R(M,U,K,G,q){var X=M[U];if(!c(X)){var Y=A(X);return new u("Invalid "+G+" `"+q+"` of type "+("`"+Y+"` supplied to `"+K+"`, expected a single ReactElement."))}return null}return b(R)}function y(){function R(M,U,K,G,q){var X=M[U];if(!e.isValidElementType(X)){var Y=A(X);return new u("Invalid "+G+" `"+q+"` of type "+("`"+Y+"` supplied to `"+K+"`, expected a single ReactElement type."))}return null}return b(R)}function C(R){function M(U,K,G,q,X){if(!(U[K]instanceof R)){var Y=R.name||g,W=Z(U[K]);return new u("Invalid "+q+" `"+X+"` of type "+("`"+W+"` supplied to `"+G+"`, expected ")+("instance of `"+Y+"`."))}return null}return b(M)}function S(R){if(!Array.isArray(R))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),s;function M(U,K,G,q,X){for(var Y=U[K],W=0;W<R.length;W++)if(h(Y,R[W]))return null;var Q=JSON.stringify(R,function(se,L){var te=B(L);return te==="symbol"?String(L):L});return new u("Invalid "+q+" `"+X+"` of value `"+String(Y)+"` "+("supplied to `"+G+"`, expected one of "+Q+"."))}return b(M)}function _(R){function M(U,K,G,q,X){if(typeof R!="function")return new u("Property `"+X+"` of component `"+G+"` has invalid PropType notation inside objectOf.");var Y=U[K],W=A(Y);if(W!=="object")return new u("Invalid "+q+" `"+X+"` of type "+("`"+W+"` supplied to `"+G+"`, expected an object."));for(var Q in Y)if(r(Y,Q)){var ee=R(Y,Q,G,q,X+"."+Q,n);if(ee instanceof Error)return ee}return null}return b(M)}function D(R){if(!Array.isArray(R))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var M=0;M<R.length;M++){var U=R[M];if(typeof U!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+J(U)+" at index "+M+"."),s}function K(G,q,X,Y,W){for(var Q=[],ee=0;ee<R.length;ee++){var se=R[ee],L=se(G,q,X,Y,W,n);if(L==null)return null;L.data&&r(L.data,"expectedType")&&Q.push(L.data.expectedType)}var te=Q.length>0?", expected one of type ["+Q.join(", ")+"]":"";return new u("Invalid "+Y+" `"+W+"` supplied to "+("`"+X+"`"+te+"."))}return b(K)}function V(){function R(M,U,K,G,q){return z(M[U])?null:new u("Invalid "+G+" `"+q+"` supplied to "+("`"+K+"`, expected a ReactNode."))}return b(R)}function E(R,M,U,K,G){return new u((R||"React class")+": "+M+" type `"+U+"."+K+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+G+"`.")}function O(R){function M(U,K,G,q,X){var Y=U[K],W=A(Y);if(W!=="object")return new u("Invalid "+q+" `"+X+"` of type `"+W+"` "+("supplied to `"+G+"`, expected `object`."));for(var Q in R){var ee=R[Q];if(typeof ee!="function")return E(G,q,X,Q,B(ee));var se=ee(Y,Q,G,q,X+"."+Q,n);if(se)return se}return null}return b(M)}function $(R){function M(U,K,G,q,X){var Y=U[K],W=A(Y);if(W!=="object")return new u("Invalid "+q+" `"+X+"` of type `"+W+"` "+("supplied to `"+G+"`, expected `object`."));var Q=t({},U[K],R);for(var ee in Q){var se=R[ee];if(r(R,ee)&&typeof se!="function")return E(G,q,X,ee,B(se));if(!se)return new u("Invalid "+q+" `"+X+"` key `"+ee+"` supplied to `"+G+"`.\nBad object: "+JSON.stringify(U[K],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(R),null,"  "));var L=se(Y,ee,G,q,X+"."+ee,n);if(L)return L}return null}return b(M)}function z(R){switch(typeof R){case"number":case"string":case"undefined":return!0;case"boolean":return!R;case"object":if(Array.isArray(R))return R.every(z);if(R===null||c(R))return!0;var M=v(R);if(M){var U=M.call(R),K;if(M!==R.entries){for(;!(K=U.next()).done;)if(!z(K.value))return!1}else for(;!(K=U.next()).done;){var G=K.value;if(G&&!z(G[1]))return!1}}else return!1;return!0;default:return!1}}function H(R,M){return R==="symbol"?!0:M?M["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&M instanceof Symbol:!1}function A(R){var M=typeof R;return Array.isArray(R)?"array":R instanceof RegExp?"object":H(M,R)?"symbol":M}function B(R){if(typeof R>"u"||R===null)return""+R;var M=A(R);if(M==="object"){if(R instanceof Date)return"date";if(R instanceof RegExp)return"regexp"}return M}function J(R){var M=B(R);switch(M){case"array":case"object":return"an "+M;case"boolean":case"date":case"regexp":return"a "+M;default:return M}}function Z(R){return!R.constructor||!R.constructor.name?g:R.constructor.name}return d.checkPropTypes=o,d.resetWarningCache=o.resetWarningCache,d.PropTypes=d,d},Gr}var qr,Sa;function mp(){if(Sa)return qr;Sa=1;var e=Ro();function t(){}function n(){}return n.resetWarningCache=t,qr=function(){function r(s,c,p,f,m,v){if(v!==e){var g=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw g.name="Invariant Violation",g}}r.isRequired=r;function o(){return r}var a={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return a.PropTypes=a,a},qr}if(process.env.NODE_ENV!=="production"){var hp=Ys(),gp=!0;so.exports=fp()(hp.isElement,gp)}else so.exports=mp()();var bp=so.exports;const i=sp(bp);function vp(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Js(e,t,n,r,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let c;const p=a.type;return typeof p=="function"&&!vp(p)&&(c="Did you accidentally use a plain function component for an element instead?"),c!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Zs=ln(i.element,Js);Zs.isRequired=ln(i.element.isRequired,Js);const Gn=Zs;function yp(e){const{prototype:t={}}=e;return!!t.isReactComponent}function wp(e,t,n,r,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let c;return typeof a=="function"&&!yp(a)&&(c="Did you accidentally provide a plain function component instead?"),c!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const xp=ln(i.elementType,wp),kp="exact-prop: ​";function Qs(e){return process.env.NODE_ENV==="production"?e:P({},e,{[kp]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Qt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var io={exports:{}},de={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Oa;function Ep(){if(Oa)return de;Oa=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function u(b){if(typeof b=="object"&&b!==null){var x=b.$$typeof;switch(x){case e:switch(b=b.type,b){case n:case o:case r:case f:case m:return b;default:switch(b=b&&b.$$typeof,b){case c:case s:case p:case g:case v:case a:return b;default:return x}}case t:return x}}}return de.ContextConsumer=s,de.ContextProvider=a,de.Element=e,de.ForwardRef=p,de.Fragment=n,de.Lazy=g,de.Memo=v,de.Portal=t,de.Profiler=o,de.StrictMode=r,de.Suspense=f,de.SuspenseList=m,de.isAsyncMode=function(){return!1},de.isConcurrentMode=function(){return!1},de.isContextConsumer=function(b){return u(b)===s},de.isContextProvider=function(b){return u(b)===a},de.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===e},de.isForwardRef=function(b){return u(b)===p},de.isFragment=function(b){return u(b)===n},de.isLazy=function(b){return u(b)===g},de.isMemo=function(b){return u(b)===v},de.isPortal=function(b){return u(b)===t},de.isProfiler=function(b){return u(b)===o},de.isStrictMode=function(b){return u(b)===r},de.isSuspense=function(b){return u(b)===f},de.isSuspenseList=function(b){return u(b)===m},de.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===n||b===o||b===r||b===f||b===m||b===d||typeof b=="object"&&b!==null&&(b.$$typeof===g||b.$$typeof===v||b.$$typeof===a||b.$$typeof===s||b.$$typeof===p||b.$$typeof===h||b.getModuleId!==void 0)},de.typeOf=u,de}var ue={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ja;function Np(){return ja||(ja=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h=!1,u=!1,b=!1,x=!1,j=!1,w;w=Symbol.for("react.module.reference");function k(I){return!!(typeof I=="string"||typeof I=="function"||I===n||I===o||j||I===r||I===f||I===m||x||I===d||h||u||b||typeof I=="object"&&I!==null&&(I.$$typeof===g||I.$$typeof===v||I.$$typeof===a||I.$$typeof===s||I.$$typeof===p||I.$$typeof===w||I.getModuleId!==void 0))}function y(I){if(typeof I=="object"&&I!==null){var ie=I.$$typeof;switch(ie){case e:var Ne=I.type;switch(Ne){case n:case o:case r:case f:case m:return Ne;default:var Re=Ne&&Ne.$$typeof;switch(Re){case c:case s:case p:case g:case v:case a:return Re;default:return ie}}case t:return ie}}}var C=s,S=a,_=e,D=p,V=n,E=g,O=v,$=t,z=o,H=r,A=f,B=m,J=!1,Z=!1;function R(I){return J||(J=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function M(I){return Z||(Z=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function U(I){return y(I)===s}function K(I){return y(I)===a}function G(I){return typeof I=="object"&&I!==null&&I.$$typeof===e}function q(I){return y(I)===p}function X(I){return y(I)===n}function Y(I){return y(I)===g}function W(I){return y(I)===v}function Q(I){return y(I)===t}function ee(I){return y(I)===o}function se(I){return y(I)===r}function L(I){return y(I)===f}function te(I){return y(I)===m}ue.ContextConsumer=C,ue.ContextProvider=S,ue.Element=_,ue.ForwardRef=D,ue.Fragment=V,ue.Lazy=E,ue.Memo=O,ue.Portal=$,ue.Profiler=z,ue.StrictMode=H,ue.Suspense=A,ue.SuspenseList=B,ue.isAsyncMode=R,ue.isConcurrentMode=M,ue.isContextConsumer=U,ue.isContextProvider=K,ue.isElement=G,ue.isForwardRef=q,ue.isFragment=X,ue.isLazy=Y,ue.isMemo=W,ue.isPortal=Q,ue.isProfiler=ee,ue.isStrictMode=se,ue.isSuspense=L,ue.isSuspenseList=te,ue.isValidElementType=k,ue.typeOf=y}()),ue}process.env.NODE_ENV==="production"?io.exports=Ep():io.exports=Np();var dr=io.exports;const Tp=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Cp(e){const t=`${e}`.match(Tp);return t&&t[1]||""}function ei(e,t=""){return e.displayName||e.name||Cp(e)||t}function Ra(e,t,n){const r=ei(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Sp(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return ei(e,"Component");if(typeof e=="object")switch(e.$$typeof){case dr.ForwardRef:return Ra(e,e.render,"ForwardRef");case dr.Memo:return Ra(e,e.type,"memo");default:return}}}function pt(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=e[t],s=o||t;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Op=i.oneOfType([i.func,i.object]),Po=Op;function et(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Qt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function lo(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function ti(e,t=166){let n;function r(...o){const a=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(a,t)}return r.clear=()=>{clearTimeout(n)},r}function jp(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,a,s)=>{const c=o||"<<anonymous>>",p=s||r;return typeof n[r]<"u"?new Error(`The ${a} \`${p}\` of \`${c}\` is deprecated. ${t}`):null}}function Rp(e,t){var n,r;return T.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Oe(e){return e&&e.ownerDocument||document}function en(e){return Oe(e).defaultView||window}function Pp(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?P({},t.propTypes):null;return o=>(a,s,c,p,f,...m)=>{const v=f||s,g=n==null?void 0:n[v];if(g){const d=g(a,s,c,p,f,...m);if(d)return d}return typeof a[s]<"u"&&!a[o]?new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function ur(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const $p=typeof window<"u"?T.useLayoutEffect:T.useEffect,Dt=$p;let Pa=0;function _p(e){const[t,n]=T.useState(e),r=e||t;return T.useEffect(()=>{t==null&&(Pa+=1,n(`mui-${Pa}`))},[t]),r}const $a=T["useId".toString()];function ni(e){if($a!==void 0){const t=$a();return e??t}return _p(e)}function Mp(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=o||t;return typeof e[t]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function ri({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=T.useRef(e!==void 0),[a,s]=T.useState(t),c=o?e:a;if(process.env.NODE_ENV!=="production"){T.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:f}=T.useRef(t);T.useEffect(()=>{!o&&f!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const p=T.useCallback(f=>{o||s(f)},[]);return[c,p]}function Mn(e){const t=T.useRef(e);return Dt(()=>{t.current=e}),T.useRef((...n)=>(0,t.current)(...n)).current}function Ge(...e){return T.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{ur(n,t)})},e)}const _a={};function Ip(e,t){const n=T.useRef(_a);return n.current===_a&&(n.current=e(t)),n}const Dp=[];function Ap(e){T.useEffect(e,Dp)}class qn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new qn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function En(){const e=Ip(qn.create).current;return Ap(e.disposeEffect),e}let Er=!0,co=!1;const Bp=new qn,Lp={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Vp(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Lp[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Fp(e){e.metaKey||e.altKey||e.ctrlKey||(Er=!0)}function Wr(){Er=!1}function zp(){this.visibilityState==="hidden"&&co&&(Er=!0)}function Hp(e){e.addEventListener("keydown",Fp,!0),e.addEventListener("mousedown",Wr,!0),e.addEventListener("pointerdown",Wr,!0),e.addEventListener("touchstart",Wr,!0),e.addEventListener("visibilitychange",zp,!0)}function Up(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Er||Vp(t)}function oi(){const e=T.useCallback(o=>{o!=null&&Hp(o.ownerDocument)},[]),t=T.useRef(!1);function n(){return t.current?(co=!0,Bp.start(100,()=>{co=!1}),t.current=!1,!0):!1}function r(o){return Up(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function ai(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Gp(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function qp(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Wp=Number.isInteger||qp;function si(e,t,n,r){const o=e[t];if(o==null||!Wp(o)){const a=Gp(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function ii(e,t,...n){return e[t]===void 0?null:si(e,t,...n)}function po(){return null}ii.isRequired=si;po.isRequired=po;const li=process.env.NODE_ENV==="production"?po:ii;function ci(e,t){const n=P({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=P({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},a=t[r];n[r]={},!a||!Object.keys(a)?n[r]=o:!o||!Object.keys(o)?n[r]=a:(n[r]=P({},a),Object.keys(o).forEach(s=>{n[r][s]=ci(o[s],a[s])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function ft(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((a,s)=>{if(s){const c=t(s);c!==""&&a.push(c),n&&n[s]&&a.push(n[s])}return a},[]).join(" ")}),r}const Ma=e=>e,Xp=()=>{let e=Ma;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Ma}}},Yp=Xp(),pi=Yp,di={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function rt(e,t,n="Mui"){const r=di[t];return r?`${n}-${r}`:`${pi.generate(e)}-${t}`}function xt(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=rt(e,o,n)}),r}function Kp(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function me(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,a;for(a=0;a<r.length;a++)o=r[a],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}const Jp=["values","unit","step"],Zp=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>P({},n,{[r.key]:r.val}),{})};function Qp(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=me(e,Jp),a=Zp(t),s=Object.keys(a);function c(g){return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${n})`}function p(g){return`@media (max-width:${(typeof t[g]=="number"?t[g]:g)-r/100}${n})`}function f(g,d){const h=s.indexOf(d);return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${n}) and (max-width:${(h!==-1&&typeof t[s[h]]=="number"?t[s[h]]:d)-r/100}${n})`}function m(g){return s.indexOf(g)+1<s.length?f(g,s[s.indexOf(g)+1]):c(g)}function v(g){const d=s.indexOf(g);return d===0?c(s[1]):d===s.length-1?p(s[d]):f(g,s[s.indexOf(g)+1]).replace("@media","@media not all and")}return P({keys:s,values:a,up:c,down:p,between:f,only:m,not:v,unit:n},o)}const ed={borderRadius:4},td=ed,nd=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.string,i.object,i.array]):{},kt=nd;function Sn(e,t){return t?ct(e,t,{clone:!1}):e}const $o={xs:0,sm:600,md:900,lg:1200,xl:1536},Ia={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${$o[e]}px)`};function dt(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const a=r.breakpoints||Ia;return t.reduce((s,c,p)=>(s[a.up(a.keys[p])]=n(t[p]),s),{})}if(typeof t=="object"){const a=r.breakpoints||Ia;return Object.keys(t).reduce((s,c)=>{if(Object.keys(a.values||$o).indexOf(c)!==-1){const p=a.up(c);s[p]=n(t[c],c)}else{const p=c;s[p]=t[p]}return s},{})}return n(t)}function rd(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const a=e.up(o);return r[a]={},r},{}))||{}}function od(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Nr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function fr(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Nr(e,n)||r,t&&(o=t(o,r,e)),o}function ke(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,a=s=>{if(s[t]==null)return null;const c=s[t],p=s.theme,f=Nr(p,r)||{};return dt(s,c,v=>{let g=fr(f,o,v);return v===g&&typeof v=="string"&&(g=fr(f,o,`${t}${v==="default"?"":et(v)}`,v)),n===!1?g:{[n]:g}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[t]:kt}:{},a.filterProps=[t],a}function ad(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const sd={m:"margin",p:"padding"},id={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Da={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},ld=ad(e=>{if(e.length>2)if(Da[e])e=Da[e];else return[e];const[t,n]=e.split(""),r=sd[t],o=id[n]||"";return Array.isArray(o)?o.map(a=>r+a):[r+o]}),Tr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Cr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],cd=[...Tr,...Cr];function Wn(e,t,n,r){var o;const a=(o=Nr(e,t,!1))!=null?o:n;return typeof a=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),a*s):Array.isArray(a)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>a.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${s} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),a[s]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function ui(e){return Wn(e,"spacing",8,"spacing")}function Xn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function pd(e,t){return n=>e.reduce((r,o)=>(r[o]=Xn(t,n),r),{})}function dd(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=ld(n),a=pd(o,r),s=e[n];return dt(e,s,a)}function fi(e,t){const n=ui(e.theme);return Object.keys(e).map(r=>dd(e,t,r,n)).reduce(Sn,{})}function ve(e){return fi(e,Tr)}ve.propTypes=process.env.NODE_ENV!=="production"?Tr.reduce((e,t)=>(e[t]=kt,e),{}):{};ve.filterProps=Tr;function ye(e){return fi(e,Cr)}ye.propTypes=process.env.NODE_ENV!=="production"?Cr.reduce((e,t)=>(e[t]=kt,e),{}):{};ye.filterProps=Cr;process.env.NODE_ENV!=="production"&&cd.reduce((e,t)=>(e[t]=kt,e),{});function ud(e=8){if(e.mui)return e;const t=ui({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(a=>{const s=t(a);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function Sr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(a=>{r[a]=o}),r),{}),n=r=>Object.keys(r).reduce((o,a)=>t[a]?Sn(o,t[a](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function He(e){return typeof e!="number"?e:`${e}px solid`}function Xe(e,t){return ke({prop:e,themeKey:"borders",transform:t})}const fd=Xe("border",He),md=Xe("borderTop",He),hd=Xe("borderRight",He),gd=Xe("borderBottom",He),bd=Xe("borderLeft",He),vd=Xe("borderColor"),yd=Xe("borderTopColor"),wd=Xe("borderRightColor"),xd=Xe("borderBottomColor"),kd=Xe("borderLeftColor"),Ed=Xe("outline",He),Nd=Xe("outlineColor"),Or=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Wn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:Xn(t,r)});return dt(e,e.borderRadius,n)}return null};Or.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:kt}:{};Or.filterProps=["borderRadius"];Sr(fd,md,hd,gd,bd,vd,yd,wd,xd,kd,Or,Ed,Nd);const jr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Wn(e.theme,"spacing",8,"gap"),n=r=>({gap:Xn(t,r)});return dt(e,e.gap,n)}return null};jr.propTypes=process.env.NODE_ENV!=="production"?{gap:kt}:{};jr.filterProps=["gap"];const Rr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Wn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:Xn(t,r)});return dt(e,e.columnGap,n)}return null};Rr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:kt}:{};Rr.filterProps=["columnGap"];const Pr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Wn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:Xn(t,r)});return dt(e,e.rowGap,n)}return null};Pr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:kt}:{};Pr.filterProps=["rowGap"];const Td=ke({prop:"gridColumn"}),Cd=ke({prop:"gridRow"}),Sd=ke({prop:"gridAutoFlow"}),Od=ke({prop:"gridAutoColumns"}),jd=ke({prop:"gridAutoRows"}),Rd=ke({prop:"gridTemplateColumns"}),Pd=ke({prop:"gridTemplateRows"}),$d=ke({prop:"gridTemplateAreas"}),_d=ke({prop:"gridArea"});Sr(jr,Rr,Pr,Td,Cd,Sd,Od,jd,Rd,Pd,$d,_d);function Yt(e,t){return t==="grey"?t:e}const Md=ke({prop:"color",themeKey:"palette",transform:Yt}),Id=ke({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Yt}),Dd=ke({prop:"backgroundColor",themeKey:"palette",transform:Yt});Sr(Md,Id,Dd);function Ve(e){return e<=1&&e!==0?`${e*100}%`:e}const Ad=ke({prop:"width",transform:Ve}),_o=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const a=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||$o[n];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:Ve(n)}};return dt(e,e.maxWidth,t)}return null};_o.filterProps=["maxWidth"];const Bd=ke({prop:"minWidth",transform:Ve}),Ld=ke({prop:"height",transform:Ve}),Vd=ke({prop:"maxHeight",transform:Ve}),Fd=ke({prop:"minHeight",transform:Ve});ke({prop:"size",cssProperty:"width",transform:Ve});ke({prop:"size",cssProperty:"height",transform:Ve});const zd=ke({prop:"boxSizing"});Sr(Ad,_o,Bd,Ld,Vd,Fd,zd);const Hd={border:{themeKey:"borders",transform:He},borderTop:{themeKey:"borders",transform:He},borderRight:{themeKey:"borders",transform:He},borderBottom:{themeKey:"borders",transform:He},borderLeft:{themeKey:"borders",transform:He},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:He},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Or},color:{themeKey:"palette",transform:Yt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Yt},backgroundColor:{themeKey:"palette",transform:Yt},p:{style:ye},pt:{style:ye},pr:{style:ye},pb:{style:ye},pl:{style:ye},px:{style:ye},py:{style:ye},padding:{style:ye},paddingTop:{style:ye},paddingRight:{style:ye},paddingBottom:{style:ye},paddingLeft:{style:ye},paddingX:{style:ye},paddingY:{style:ye},paddingInline:{style:ye},paddingInlineStart:{style:ye},paddingInlineEnd:{style:ye},paddingBlock:{style:ye},paddingBlockStart:{style:ye},paddingBlockEnd:{style:ye},m:{style:ve},mt:{style:ve},mr:{style:ve},mb:{style:ve},ml:{style:ve},mx:{style:ve},my:{style:ve},margin:{style:ve},marginTop:{style:ve},marginRight:{style:ve},marginBottom:{style:ve},marginLeft:{style:ve},marginX:{style:ve},marginY:{style:ve},marginInline:{style:ve},marginInlineStart:{style:ve},marginInlineEnd:{style:ve},marginBlock:{style:ve},marginBlockStart:{style:ve},marginBlockEnd:{style:ve},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:jr},rowGap:{style:Pr},columnGap:{style:Rr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ve},maxWidth:{style:_o},minWidth:{transform:Ve},height:{transform:Ve},maxHeight:{transform:Ve},minHeight:{transform:Ve},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Mo=Hd;function Ud(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Gd(e,t){return typeof e=="function"?e(t):e}function qd(){function e(n,r,o,a){const s={[n]:r,theme:o},c=a[n];if(!c)return{[n]:r};const{cssProperty:p=n,themeKey:f,transform:m,style:v}=c;if(r==null)return null;if(f==="typography"&&r==="inherit")return{[n]:r};const g=Nr(o,f)||{};return v?v(s):dt(s,r,h=>{let u=fr(g,m,h);return h===u&&typeof h=="string"&&(u=fr(g,m,`${n}${h==="default"?"":et(h)}`,h)),p===!1?u:{[p]:u}})}function t(n){var r;const{sx:o,theme:a={}}=n||{};if(!o)return null;const s=(r=a.unstable_sxConfig)!=null?r:Mo;function c(p){let f=p;if(typeof p=="function")f=p(a);else if(typeof p!="object")return p;if(!f)return null;const m=rd(a.breakpoints),v=Object.keys(m);let g=m;return Object.keys(f).forEach(d=>{const h=Gd(f[d],a);if(h!=null)if(typeof h=="object")if(s[d])g=Sn(g,e(d,h,a,s));else{const u=dt({theme:a},h,b=>({[d]:b}));Ud(u,h)?g[d]=t({sx:h,theme:a}):g=Sn(g,u)}else g=Sn(g,e(d,h,a,s))}),od(v,g)}return Array.isArray(o)?o.map(c):c(o)}return t}const mi=qd();mi.filterProps=["sx"];const Io=mi;function Wd(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Xd=["breakpoints","palette","spacing","shape"];function Do(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:a={}}=e,s=me(e,Xd),c=Qp(n),p=ud(o);let f=ct({breakpoints:c,direction:"ltr",components:{},palette:P({mode:"light"},r),spacing:p,shape:P({},td,a)},s);return f.applyStyles=Wd,f=t.reduce((m,v)=>ct(m,v),f),f.unstable_sxConfig=P({},Mo,s==null?void 0:s.unstable_sxConfig),f.unstable_sx=function(v){return Io({sx:v,theme:this})},f}function Yd(e){return Object.keys(e).length===0}function hi(e=null){const t=T.useContext(ro.ThemeContext);return!t||Yd(t)?e:t}const Kd=Do();function gi(e=Kd){return hi(e)}const Jd=["ownerState"],Zd=["variants"],Qd=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function eu(e){return Object.keys(e).length===0}function tu(e){return typeof e=="string"&&e.charCodeAt(0)>96}function sr(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const nu=Do(),Aa=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function nr({defaultTheme:e,theme:t,themeId:n}){return eu(t)?e:t[n]||t}function ru(e){return e?(t,n)=>n[e]:null}function ir(e,t){let{ownerState:n}=t,r=me(t,Jd);const o=typeof e=="function"?e(P({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(a=>ir(a,P({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let c=me(o,Zd);return a.forEach(p=>{let f=!0;typeof p.props=="function"?f=p.props(P({ownerState:n},r,n)):Object.keys(p.props).forEach(m=>{(n==null?void 0:n[m])!==p.props[m]&&r[m]!==p.props[m]&&(f=!1)}),f&&(Array.isArray(c)||(c=[c]),c.push(typeof p.style=="function"?p.style(P({ownerState:n},r,n)):p.style))}),c}return o}function ou(e={}){const{themeId:t,defaultTheme:n=nu,rootShouldForwardProp:r=sr,slotShouldForwardProp:o=sr}=e,a=s=>Io(P({},s,{theme:nr(P({},s,{defaultTheme:n,themeId:t}))}));return a.__mui_systemSx=!0,(s,c={})=>{ro.internal_processStyles(s,y=>y.filter(C=>!(C!=null&&C.__mui_systemSx)));const{name:p,slot:f,skipVariantsResolver:m,skipSx:v,overridesResolver:g=ru(Aa(f))}=c,d=me(c,Qd),h=m!==void 0?m:f&&f!=="Root"&&f!=="root"||!1,u=v||!1;let b;process.env.NODE_ENV!=="production"&&p&&(b=`${p}-${Aa(f||"Root")}`);let x=sr;f==="Root"||f==="root"?x=r:f?x=o:tu(s)&&(x=void 0);const j=ro(s,P({shouldForwardProp:x,label:b},d)),w=y=>typeof y=="function"&&y.__emotion_real!==y||Pt(y)?C=>ir(y,P({},C,{theme:nr({theme:C.theme,defaultTheme:n,themeId:t})})):y,k=(y,...C)=>{let S=w(y);const _=C?C.map(w):[];p&&g&&_.push(E=>{const O=nr(P({},E,{defaultTheme:n,themeId:t}));if(!O.components||!O.components[p]||!O.components[p].styleOverrides)return null;const $=O.components[p].styleOverrides,z={};return Object.entries($).forEach(([H,A])=>{z[H]=ir(A,P({},E,{theme:O}))}),g(E,z)}),p&&!h&&_.push(E=>{var O;const $=nr(P({},E,{defaultTheme:n,themeId:t})),z=$==null||(O=$.components)==null||(O=O[p])==null?void 0:O.variants;return ir({variants:z},P({},E,{theme:$}))}),u||_.push(a);const D=_.length-C.length;if(Array.isArray(y)&&D>0){const E=new Array(D).fill("");S=[...y,...E],S.raw=[...y.raw,...E]}const V=j(S,..._);if(process.env.NODE_ENV!=="production"){let E;p&&(E=`${p}${et(f||"")}`),E===void 0&&(E=`Styled(${Sp(s)})`),V.displayName=E}return s.muiName&&(V.muiName=s.muiName),V};return j.withConfig&&(k.withConfig=j.withConfig),k}}function au(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:ci(t.components[n].defaultProps,r)}function su({props:e,name:t,defaultTheme:n,themeId:r}){let o=gi(n);return r&&(o=o[r]||o),au({theme:o,name:t,props:e})}function Ao(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Kp(e,t,n)}function iu(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function At(e){if(e.type)return e;if(e.charAt(0)==="#")return At(iu(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Qt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Qt(10,o))}else r=r.split(",");return r=r.map(a=>parseFloat(a)),{type:n,values:r,colorSpace:o}}function $r(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,a)=>a<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function lu(e){e=At(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,a=r*Math.min(o,1-o),s=(f,m=(f+n/30)%12)=>o-a*Math.max(Math.min(m-3,9-m,1),-1);let c="rgb";const p=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(c+="a",p.push(t[3])),$r({type:c,values:p})}function Ba(e){e=At(e);let t=e.type==="hsl"||e.type==="hsla"?At(lu(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function La(e,t){const n=Ba(e),r=Ba(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function mr(e,t){return e=At(e),t=Ao(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,$r(e)}function cu(e,t){if(e=At(e),t=Ao(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return $r(e)}function pu(e,t){if(e=At(e),t=Ao(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return $r(e)}function du(e,t){return P({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const uu={black:"#000",white:"#fff"},In=uu,fu={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},mu=fu,hu={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ft=hu,gu={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},zt=gu,bu={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},gn=bu,vu={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ht=vu,yu={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Ut=yu,wu={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Gt=wu,xu=["mode","contrastThreshold","tonalOffset"],Va={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:In.white,default:In.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Xr={text:{primary:In.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:In.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Fa(e,t,n,r){const o=r.light||r,a=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=pu(e.main,o):t==="dark"&&(e.dark=cu(e.main,a)))}function ku(e="light"){return e==="dark"?{main:Ht[200],light:Ht[50],dark:Ht[400]}:{main:Ht[700],light:Ht[400],dark:Ht[800]}}function Eu(e="light"){return e==="dark"?{main:Ft[200],light:Ft[50],dark:Ft[400]}:{main:Ft[500],light:Ft[300],dark:Ft[700]}}function Nu(e="light"){return e==="dark"?{main:zt[500],light:zt[300],dark:zt[700]}:{main:zt[700],light:zt[400],dark:zt[800]}}function Tu(e="light"){return e==="dark"?{main:Ut[400],light:Ut[300],dark:Ut[700]}:{main:Ut[700],light:Ut[500],dark:Ut[900]}}function Cu(e="light"){return e==="dark"?{main:Gt[400],light:Gt[300],dark:Gt[700]}:{main:Gt[800],light:Gt[500],dark:Gt[900]}}function Su(e="light"){return e==="dark"?{main:gn[400],light:gn[300],dark:gn[700]}:{main:"#ed6c02",light:gn[500],dark:gn[900]}}function Ou(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=me(e,xu),a=e.primary||ku(t),s=e.secondary||Eu(t),c=e.error||Nu(t),p=e.info||Tu(t),f=e.success||Cu(t),m=e.warning||Su(t);function v(u){const b=La(u,Xr.text.primary)>=n?Xr.text.primary:Va.text.primary;if(process.env.NODE_ENV!=="production"){const x=La(u,b);x<3&&console.error([`MUI: The contrast ratio of ${x}:1 for ${b} on ${u}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return b}const g=({color:u,name:b,mainShade:x=500,lightShade:j=300,darkShade:w=700})=>{if(u=P({},u),!u.main&&u[x]&&(u.main=u[x]),!u.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.`:Qt(11,b?` (${b})`:"",x));if(typeof u.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(u.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Qt(12,b?` (${b})`:"",JSON.stringify(u.main)));return Fa(u,"light",j,r),Fa(u,"dark",w,r),u.contrastText||(u.contrastText=v(u.main)),u},d={dark:Xr,light:Va};return process.env.NODE_ENV!=="production"&&(d[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),ct(P({common:P({},In),mode:t,primary:g({color:a,name:"primary"}),secondary:g({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:g({color:c,name:"error"}),warning:g({color:m,name:"warning"}),info:g({color:p,name:"info"}),success:g({color:f,name:"success"}),grey:mu,contrastThreshold:n,getContrastText:v,augmentColor:g,tonalOffset:r},d[t]),o)}const ju=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Ru(e){return Math.round(e*1e5)/1e5}const za={textTransform:"uppercase"},Ha='"Roboto", "Helvetica", "Arial", sans-serif';function Pu(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Ha,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:s=400,fontWeightMedium:c=500,fontWeightBold:p=700,htmlFontSize:f=16,allVariants:m,pxToRem:v}=n,g=me(n,ju);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof f!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const d=o/14,h=v||(x=>`${x/f*d}rem`),u=(x,j,w,k,y)=>P({fontFamily:r,fontWeight:x,fontSize:h(j),lineHeight:w},r===Ha?{letterSpacing:`${Ru(k/j)}em`}:{},y,m),b={h1:u(a,96,1.167,-1.5),h2:u(a,60,1.2,-.5),h3:u(s,48,1.167,0),h4:u(s,34,1.235,.25),h5:u(s,24,1.334,0),h6:u(c,20,1.6,.15),subtitle1:u(s,16,1.75,.15),subtitle2:u(c,14,1.57,.1),body1:u(s,16,1.5,.15),body2:u(s,14,1.43,.15),button:u(c,14,1.75,.4,za),caption:u(s,12,1.66,.4),overline:u(s,12,2.66,1,za),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return ct(P({htmlFontSize:f,pxToRem:h,fontFamily:r,fontSize:o,fontWeightLight:a,fontWeightRegular:s,fontWeightMedium:c,fontWeightBold:p},b),g,{clone:!1})}const $u=.2,_u=.14,Mu=.12;function ge(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${$u})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${_u})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Mu})`].join(",")}const Iu=["none",ge(0,2,1,-1,0,1,1,0,0,1,3,0),ge(0,3,1,-2,0,2,2,0,0,1,5,0),ge(0,3,3,-2,0,3,4,0,0,1,8,0),ge(0,2,4,-1,0,4,5,0,0,1,10,0),ge(0,3,5,-1,0,5,8,0,0,1,14,0),ge(0,3,5,-1,0,6,10,0,0,1,18,0),ge(0,4,5,-2,0,7,10,1,0,2,16,1),ge(0,5,5,-3,0,8,10,1,0,3,14,2),ge(0,5,6,-3,0,9,12,1,0,3,16,2),ge(0,6,6,-3,0,10,14,1,0,4,18,3),ge(0,6,7,-4,0,11,15,1,0,4,20,3),ge(0,7,8,-4,0,12,17,2,0,5,22,4),ge(0,7,8,-4,0,13,19,2,0,5,24,4),ge(0,7,9,-4,0,14,21,2,0,5,26,4),ge(0,8,9,-5,0,15,22,2,0,6,28,5),ge(0,8,10,-5,0,16,24,2,0,6,30,5),ge(0,8,11,-5,0,17,26,2,0,6,32,5),ge(0,9,11,-5,0,18,28,2,0,7,34,6),ge(0,9,12,-6,0,19,29,2,0,7,36,6),ge(0,10,13,-6,0,20,31,3,0,8,38,7),ge(0,10,13,-6,0,21,33,3,0,8,40,7),ge(0,10,14,-6,0,22,35,3,0,8,42,7),ge(0,11,14,-7,0,23,36,3,0,9,44,8),ge(0,11,15,-7,0,24,38,3,0,9,46,8)],Du=Iu,Au=["duration","easing","delay"],Bu={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Lu={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Ua(e){return`${Math.round(e)}ms`}function Vu(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Fu(e){const t=P({},Bu,e.easing),n=P({},Lu,e.duration);return P({getAutoHeightDuration:Vu,create:(o=["all"],a={})=>{const{duration:s=n.standard,easing:c=t.easeInOut,delay:p=0}=a,f=me(a,Au);if(process.env.NODE_ENV!=="production"){const m=g=>typeof g=="string",v=g=>!isNaN(parseFloat(g));!m(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!v(s)&&!m(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),m(c)||console.error('MUI: Argument "easing" must be a string.'),!v(p)&&!m(p)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(f).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(f).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(m=>`${m} ${typeof s=="string"?s:Ua(s)} ${c} ${typeof p=="string"?p:Ua(p)}`).join(",")}},e,{easing:t,duration:n})}const zu={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Hu=zu,Uu=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Gu(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:a={}}=e,s=me(e,Uu);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Qt(18));const c=Ou(r),p=Do(e);let f=ct(p,{mixins:du(p.breakpoints,n),palette:c,shadows:Du.slice(),typography:Pu(c,a),transitions:Fu(o),zIndex:P({},Hu)});if(f=ct(f,s),f=t.reduce((m,v)=>ct(m,v),f),process.env.NODE_ENV!=="production"){const m=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],v=(g,d)=>{let h;for(h in g){const u=g[h];if(m.indexOf(h)!==-1&&Object.keys(u).length>0){if(process.env.NODE_ENV!=="production"){const b=rt("",h);console.error([`MUI: The \`${d}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(g,null,2),"",`Instead, you need to use the '&.${b}' syntax:`,JSON.stringify({root:{[`&.${b}`]:u}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}g[h]={}}}};Object.keys(f.components).forEach(g=>{const d=f.components[g].styleOverrides;d&&g.indexOf("Mui")===0&&v(d,g)})}return f.unstable_sxConfig=P({},Mo,s==null?void 0:s.unstable_sxConfig),f.unstable_sx=function(v){return Io({sx:v,theme:this})},f}const qu=Gu(),Bo=qu,Lo="$$material";function mt({props:e,name:t}){return su({props:e,name:t,defaultTheme:Bo,themeId:Lo})}const bi=e=>sr(e)&&e!=="classes",Wu=ou({themeId:Lo,defaultTheme:Bo,rootShouldForwardProp:bi}),je=Wu;function Xu(e){return rt("MuiSvgIcon",e)}xt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Yu=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Ku=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${et(t)}`,`fontSize${et(n)}`]};return ft(o,Xu,r)},Ju=je("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${et(n.color)}`],t[`fontSize${et(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,a,s,c,p,f,m,v,g,d,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((c=e.typography)==null||(p=c.pxToRem)==null?void 0:p.call(c,24))||"1.5rem",large:((f=e.typography)==null||(m=f.pxToRem)==null?void 0:m.call(f,35))||"2.1875rem"}[t.fontSize],color:(v=(g=(e.vars||e).palette)==null||(g=g[t.color])==null?void 0:g.main)!=null?v:{action:(d=(e.vars||e).palette)==null||(d=d.action)==null?void 0:d.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),Vo=T.forwardRef(function(t,n){const r=mt({props:t,name:"MuiSvgIcon"}),{children:o,className:a,color:s="inherit",component:c="svg",fontSize:p="medium",htmlColor:f,inheritViewBox:m=!1,titleAccess:v,viewBox:g="0 0 24 24"}=r,d=me(r,Yu),h=T.isValidElement(o)&&o.type==="svg",u=P({},r,{color:s,component:c,fontSize:p,instanceFontSize:t.fontSize,inheritViewBox:m,viewBox:g,hasSvgAsChild:h}),b={};m||(b.viewBox=g);const x=Ku(u);return l.jsxs(Ju,P({as:c,className:Ce(x.root,a),focusable:"false",color:f,"aria-hidden":v?void 0:!0,role:v?"img":void 0,ref:n},b,d,h&&o.props,{ownerState:u,children:[h?o.props.children:o,v?l.jsx("title",{children:v}):null]}))});process.env.NODE_ENV!=="production"&&(Vo.propTypes={children:i.node,classes:i.object,className:i.string,color:i.oneOfType([i.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),i.string]),component:i.elementType,fontSize:i.oneOfType([i.oneOf(["inherit","large","medium","small"]),i.string]),htmlColor:i.string,inheritViewBox:i.bool,shapeRendering:i.string,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),titleAccess:i.string,viewBox:i.string});Vo.muiName="SvgIcon";const Ga=Vo;function vi(e,t){function n(r,o){return l.jsx(Ga,P({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Ga.muiName,T.memo(T.forwardRef(n))}const Zu={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),pi.configure(e)}},Qu=Object.freeze(Object.defineProperty({__proto__:null,capitalize:et,createChainedFunction:lo,createSvgIcon:vi,debounce:ti,deprecatedPropType:jp,isMuiElement:Rp,ownerDocument:Oe,ownerWindow:en,requirePropFactory:Pp,setRef:ur,unstable_ClassNameGenerator:Zu,unstable_useEnhancedEffect:Dt,unstable_useId:ni,unsupportedProp:Mp,useControlled:ri,useEventCallback:Mn,useForkRef:Ge,useIsFocusVisible:oi},Symbol.toStringTag,{value:"Module"})),ef=ip(Qu);var qa;function tf(){return qa||(qa=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=ef}(Vr)),Vr}var nf=lp;Object.defineProperty(jo,"__esModule",{value:!0});var yi=jo.default=void 0,rf=nf(tf()),of=l;yi=jo.default=(0,rf.default)((0,of.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function wi(e){return typeof e=="string"}function Nn(e,t,n){return e===void 0||wi(e)?t:P({},t,{ownerState:P({},t.ownerState,n)})}const af={disableDefaultClasses:!1},sf=T.createContext(af);function lf(e){const{disableDefaultClasses:t}=T.useContext(sf);return n=>t?"":e(n)}function xi(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function cf(e,t,n){return typeof e=="function"?e(t,n):e}function Wa(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function pf(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:a}=e;if(!t){const d=Ce(n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),h=P({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),u=P({},n,o,r);return d.length>0&&(u.className=d),Object.keys(h).length>0&&(u.style=h),{props:u,internalRef:void 0}}const s=xi(P({},o,r)),c=Wa(r),p=Wa(o),f=t(s),m=Ce(f==null?void 0:f.className,n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),v=P({},f==null?void 0:f.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),g=P({},f,n,p,c);return m.length>0&&(g.className=m),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:f.ref}}const df=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Bt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:a=!1}=e,s=me(e,df),c=a?{}:cf(r,o),{props:p,internalRef:f}=pf(P({},s,{externalSlotProps:c})),m=Ge(f,c==null?void 0:c.ref,(t=e.additionalProps)==null?void 0:t.ref);return Nn(n,P({},p,{ref:m}),o)}const ki="base";function uf(e){return`${ki}--${e}`}function ff(e,t){return`${ki}-${e}-${t}`}function Ei(e,t){const n=di[t];return n?uf(n):ff(e,t)}function mf(e,t){const n={};return t.forEach(r=>{n[r]=Ei(e,r)}),n}const hf=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function gf(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function bf(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function vf(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||bf(e))}function yf(e){const t=[],n=[];return Array.from(e.querySelectorAll(hf)).forEach((r,o)=>{const a=gf(r);a===-1||!vf(r)||(a===0?t.push(r):n.push({documentOrder:o,tabIndex:a,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function wf(){return!0}function hr(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:a=yf,isEnabled:s=wf,open:c}=e,p=T.useRef(!1),f=T.useRef(null),m=T.useRef(null),v=T.useRef(null),g=T.useRef(null),d=T.useRef(!1),h=T.useRef(null),u=Ge(t.ref,h),b=T.useRef(null);T.useEffect(()=>{!c||!h.current||(d.current=!n)},[n,c]),T.useEffect(()=>{if(!c||!h.current)return;const w=Oe(h.current);return h.current.contains(w.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),d.current&&h.current.focus()),()=>{o||(v.current&&v.current.focus&&(p.current=!0,v.current.focus()),v.current=null)}},[c]),T.useEffect(()=>{if(!c||!h.current)return;const w=Oe(h.current),k=S=>{b.current=S,!(r||!s()||S.key!=="Tab")&&w.activeElement===h.current&&S.shiftKey&&(p.current=!0,m.current&&m.current.focus())},y=()=>{const S=h.current;if(S===null)return;if(!w.hasFocus()||!s()||p.current){p.current=!1;return}if(S.contains(w.activeElement)||r&&w.activeElement!==f.current&&w.activeElement!==m.current)return;if(w.activeElement!==g.current)g.current=null;else if(g.current!==null)return;if(!d.current)return;let _=[];if((w.activeElement===f.current||w.activeElement===m.current)&&(_=a(h.current)),_.length>0){var D,V;const E=!!((D=b.current)!=null&&D.shiftKey&&((V=b.current)==null?void 0:V.key)==="Tab"),O=_[0],$=_[_.length-1];typeof O!="string"&&typeof $!="string"&&(E?$.focus():O.focus())}else S.focus()};w.addEventListener("focusin",y),w.addEventListener("keydown",k,!0);const C=setInterval(()=>{w.activeElement&&w.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(C),w.removeEventListener("focusin",y),w.removeEventListener("keydown",k,!0)}},[n,r,o,s,c,a]);const x=w=>{v.current===null&&(v.current=w.relatedTarget),d.current=!0,g.current=w.target;const k=t.props.onFocus;k&&k(w)},j=w=>{v.current===null&&(v.current=w.relatedTarget),d.current=!0};return l.jsxs(T.Fragment,{children:[l.jsx("div",{tabIndex:c?0:-1,onFocus:j,ref:f,"data-testid":"sentinelStart"}),T.cloneElement(t,{ref:u,onFocus:x}),l.jsx("div",{tabIndex:c?0:-1,onFocus:j,ref:m,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(hr.propTypes={children:Gn,disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableRestoreFocus:i.bool,getTabbable:i.func,isEnabled:i.func,open:i.bool.isRequired});process.env.NODE_ENV!=="production"&&(hr["propTypes"]=Qs(hr.propTypes));function xf(e){return typeof e=="function"?e():e}const Dn=T.forwardRef(function(t,n){const{children:r,container:o,disablePortal:a=!1}=t,[s,c]=T.useState(null),p=Ge(T.isValidElement(r)?r.ref:null,n);if(Dt(()=>{a||c(xf(o)||document.body)},[o,a]),Dt(()=>{if(s&&!a)return ur(n,s),()=>{ur(n,null)}},[n,s,a]),a){if(T.isValidElement(r)){const f={ref:p};return T.cloneElement(r,f)}return l.jsx(T.Fragment,{children:r})}return l.jsx(T.Fragment,{children:s&&cc.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&(Dn.propTypes={children:i.node,container:i.oneOfType([pt,i.func]),disablePortal:i.bool});process.env.NODE_ENV!=="production"&&(Dn["propTypes"]=Qs(Dn.propTypes));function kf(e){const t=Oe(e);return t.body===e?en(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function On(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Xa(e){return parseInt(en(e).getComputedStyle(e).paddingRight,10)||0}function Ef(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Ya(e,t,n,r,o){const a=[t,n,...r];[].forEach.call(e.children,s=>{const c=a.indexOf(s)===-1,p=!Ef(s);c&&p&&On(s,o)})}function Yr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function Nf(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(kf(r)){const s=ai(Oe(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Xa(r)+s}px`;const c=Oe(r).querySelectorAll(".mui-fixed");[].forEach.call(c,p=>{n.push({value:p.style.paddingRight,property:"padding-right",el:p}),p.style.paddingRight=`${Xa(p)+s}px`})}let a;if(r.parentNode instanceof DocumentFragment)a=Oe(r).body;else{const s=r.parentElement,c=en(r);a=(s==null?void 0:s.nodeName)==="HTML"&&c.getComputedStyle(s).overflowY==="scroll"?s:r}n.push({value:a.style.overflow,property:"overflow",el:a},{value:a.style.overflowX,property:"overflow-x",el:a},{value:a.style.overflowY,property:"overflow-y",el:a}),a.style.overflow="hidden"}return()=>{n.forEach(({value:a,el:s,property:c})=>{a?s.style.setProperty(c,a):s.style.removeProperty(c)})}}function Tf(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class Cf{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&On(t.modalRef,!1);const o=Tf(n);Ya(n,t.mount,t.modalRef,o,!0);const a=Yr(this.containers,s=>s.container===n);return a!==-1?(this.containers[a].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=Yr(this.containers,a=>a.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=Nf(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=Yr(this.containers,s=>s.modals.indexOf(t)!==-1),a=this.containers[o];if(a.modals.splice(a.modals.indexOf(t),1),this.modals.splice(r,1),a.modals.length===0)a.restore&&a.restore(),t.modalRef&&On(t.modalRef,n),Ya(a.container,t.mount,t.modalRef,a.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=a.modals[a.modals.length-1];s.modalRef&&On(s.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Sf(e){return typeof e=="function"?e():e}function Of(e){return e?e.props.hasOwnProperty("in"):!1}const jf=new Cf;function Rf(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=jf,closeAfterTransition:a=!1,onTransitionEnter:s,onTransitionExited:c,children:p,onClose:f,open:m,rootRef:v}=e,g=T.useRef({}),d=T.useRef(null),h=T.useRef(null),u=Ge(h,v),[b,x]=T.useState(!m),j=Of(p);let w=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(w=!1);const k=()=>Oe(d.current),y=()=>(g.current.modalRef=h.current,g.current.mount=d.current,g.current),C=()=>{o.mount(y(),{disableScrollLock:r}),h.current&&(h.current.scrollTop=0)},S=Mn(()=>{const A=Sf(t)||k().body;o.add(y(),A),h.current&&C()}),_=T.useCallback(()=>o.isTopModal(y()),[o]),D=Mn(A=>{d.current=A,A&&(m&&_()?C():h.current&&On(h.current,w))}),V=T.useCallback(()=>{o.remove(y(),w)},[w,o]);T.useEffect(()=>()=>{V()},[V]),T.useEffect(()=>{m?S():(!j||!a)&&V()},[m,V,j,a,S]);const E=A=>B=>{var J;(J=A.onKeyDown)==null||J.call(A,B),!(B.key!=="Escape"||B.which===229||!_())&&(n||(B.stopPropagation(),f&&f(B,"escapeKeyDown")))},O=A=>B=>{var J;(J=A.onClick)==null||J.call(A,B),B.target===B.currentTarget&&f&&f(B,"backdropClick")};return{getRootProps:(A={})=>{const B=xi(e);delete B.onTransitionEnter,delete B.onTransitionExited;const J=P({},B,A);return P({role:"presentation"},J,{onKeyDown:E(J),ref:u})},getBackdropProps:(A={})=>{const B=A;return P({"aria-hidden":!0},B,{onClick:O(B),open:m})},getTransitionProps:()=>{const A=()=>{x(!1),s&&s()},B=()=>{x(!0),c&&c(),a&&V()};return{onEnter:lo(A,p==null?void 0:p.props.onEnter),onExited:lo(B,p==null?void 0:p.props.onExited)}},rootRef:u,portalRef:D,isTopModal:_,exited:b,hasTransition:j}}var _e="top",qe="bottom",We="right",Me="left",Fo="auto",Yn=[_e,qe,We,Me],tn="start",An="end",Pf="clippingParents",Ni="viewport",bn="popper",$f="reference",Ka=Yn.reduce(function(e,t){return e.concat([t+"-"+tn,t+"-"+An])},[]),Ti=[].concat(Yn,[Fo]).reduce(function(e,t){return e.concat([t,t+"-"+tn,t+"-"+An])},[]),_f="beforeRead",Mf="read",If="afterRead",Df="beforeMain",Af="main",Bf="afterMain",Lf="beforeWrite",Vf="write",Ff="afterWrite",zf=[_f,Mf,If,Df,Af,Bf,Lf,Vf,Ff];function tt(e){return e?(e.nodeName||"").toLowerCase():null}function Fe(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Lt(e){var t=Fe(e).Element;return e instanceof t||e instanceof Element}function Ue(e){var t=Fe(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function zo(e){if(typeof ShadowRoot>"u")return!1;var t=Fe(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Hf(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},a=t.elements[n];!Ue(a)||!tt(a)||(Object.assign(a.style,r),Object.keys(o).forEach(function(s){var c=o[s];c===!1?a.removeAttribute(s):a.setAttribute(s,c===!0?"":c)}))})}function Uf(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],a=t.attributes[r]||{},s=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),c=s.reduce(function(p,f){return p[f]="",p},{});!Ue(o)||!tt(o)||(Object.assign(o.style,c),Object.keys(a).forEach(function(p){o.removeAttribute(p)}))})}}const Gf={name:"applyStyles",enabled:!0,phase:"write",fn:Hf,effect:Uf,requires:["computeStyles"]};function Ze(e){return e.split("-")[0]}var _t=Math.max,gr=Math.min,nn=Math.round;function uo(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ci(){return!/^((?!chrome|android).)*safari/i.test(uo())}function rn(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,a=1;t&&Ue(e)&&(o=e.offsetWidth>0&&nn(r.width)/e.offsetWidth||1,a=e.offsetHeight>0&&nn(r.height)/e.offsetHeight||1);var s=Lt(e)?Fe(e):window,c=s.visualViewport,p=!Ci()&&n,f=(r.left+(p&&c?c.offsetLeft:0))/o,m=(r.top+(p&&c?c.offsetTop:0))/a,v=r.width/o,g=r.height/a;return{width:v,height:g,top:m,right:f+v,bottom:m+g,left:f,x:f,y:m}}function Ho(e){var t=rn(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Si(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&zo(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function ut(e){return Fe(e).getComputedStyle(e)}function qf(e){return["table","td","th"].indexOf(tt(e))>=0}function Et(e){return((Lt(e)?e.ownerDocument:e.document)||window.document).documentElement}function _r(e){return tt(e)==="html"?e:e.assignedSlot||e.parentNode||(zo(e)?e.host:null)||Et(e)}function Ja(e){return!Ue(e)||ut(e).position==="fixed"?null:e.offsetParent}function Wf(e){var t=/firefox/i.test(uo()),n=/Trident/i.test(uo());if(n&&Ue(e)){var r=ut(e);if(r.position==="fixed")return null}var o=_r(e);for(zo(o)&&(o=o.host);Ue(o)&&["html","body"].indexOf(tt(o))<0;){var a=ut(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function Kn(e){for(var t=Fe(e),n=Ja(e);n&&qf(n)&&ut(n).position==="static";)n=Ja(n);return n&&(tt(n)==="html"||tt(n)==="body"&&ut(n).position==="static")?t:n||Wf(e)||t}function Uo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function jn(e,t,n){return _t(e,gr(t,n))}function Xf(e,t,n){var r=jn(e,t,n);return r>n?n:r}function Oi(){return{top:0,right:0,bottom:0,left:0}}function ji(e){return Object.assign({},Oi(),e)}function Ri(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Yf=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,ji(typeof t!="number"?t:Ri(t,Yn))};function Kf(e){var t,n=e.state,r=e.name,o=e.options,a=n.elements.arrow,s=n.modifiersData.popperOffsets,c=Ze(n.placement),p=Uo(c),f=[Me,We].indexOf(c)>=0,m=f?"height":"width";if(!(!a||!s)){var v=Yf(o.padding,n),g=Ho(a),d=p==="y"?_e:Me,h=p==="y"?qe:We,u=n.rects.reference[m]+n.rects.reference[p]-s[p]-n.rects.popper[m],b=s[p]-n.rects.reference[p],x=Kn(a),j=x?p==="y"?x.clientHeight||0:x.clientWidth||0:0,w=u/2-b/2,k=v[d],y=j-g[m]-v[h],C=j/2-g[m]/2+w,S=jn(k,C,y),_=p;n.modifiersData[r]=(t={},t[_]=S,t.centerOffset=S-C,t)}}function Jf(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Si(t.elements.popper,o)&&(t.elements.arrow=o))}const Zf={name:"arrow",enabled:!0,phase:"main",fn:Kf,effect:Jf,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function on(e){return e.split("-")[1]}var Qf={top:"auto",right:"auto",bottom:"auto",left:"auto"};function em(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:nn(n*o)/o||0,y:nn(r*o)/o||0}}function Za(e){var t,n=e.popper,r=e.popperRect,o=e.placement,a=e.variation,s=e.offsets,c=e.position,p=e.gpuAcceleration,f=e.adaptive,m=e.roundOffsets,v=e.isFixed,g=s.x,d=g===void 0?0:g,h=s.y,u=h===void 0?0:h,b=typeof m=="function"?m({x:d,y:u}):{x:d,y:u};d=b.x,u=b.y;var x=s.hasOwnProperty("x"),j=s.hasOwnProperty("y"),w=Me,k=_e,y=window;if(f){var C=Kn(n),S="clientHeight",_="clientWidth";if(C===Fe(n)&&(C=Et(n),ut(C).position!=="static"&&c==="absolute"&&(S="scrollHeight",_="scrollWidth")),C=C,o===_e||(o===Me||o===We)&&a===An){k=qe;var D=v&&C===y&&y.visualViewport?y.visualViewport.height:C[S];u-=D-r.height,u*=p?1:-1}if(o===Me||(o===_e||o===qe)&&a===An){w=We;var V=v&&C===y&&y.visualViewport?y.visualViewport.width:C[_];d-=V-r.width,d*=p?1:-1}}var E=Object.assign({position:c},f&&Qf),O=m===!0?em({x:d,y:u},Fe(n)):{x:d,y:u};if(d=O.x,u=O.y,p){var $;return Object.assign({},E,($={},$[k]=j?"0":"",$[w]=x?"0":"",$.transform=(y.devicePixelRatio||1)<=1?"translate("+d+"px, "+u+"px)":"translate3d("+d+"px, "+u+"px, 0)",$))}return Object.assign({},E,(t={},t[k]=j?u+"px":"",t[w]=x?d+"px":"",t.transform="",t))}function tm(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,a=n.adaptive,s=a===void 0?!0:a,c=n.roundOffsets,p=c===void 0?!0:c,f={placement:Ze(t.placement),variation:on(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Za(Object.assign({},f,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:p})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Za(Object.assign({},f,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:p})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const nm={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:tm,data:{}};var rr={passive:!0};function rm(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,a=o===void 0?!0:o,s=r.resize,c=s===void 0?!0:s,p=Fe(t.elements.popper),f=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&f.forEach(function(m){m.addEventListener("scroll",n.update,rr)}),c&&p.addEventListener("resize",n.update,rr),function(){a&&f.forEach(function(m){m.removeEventListener("scroll",n.update,rr)}),c&&p.removeEventListener("resize",n.update,rr)}}const om={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:rm,data:{}};var am={left:"right",right:"left",bottom:"top",top:"bottom"};function lr(e){return e.replace(/left|right|bottom|top/g,function(t){return am[t]})}var sm={start:"end",end:"start"};function Qa(e){return e.replace(/start|end/g,function(t){return sm[t]})}function Go(e){var t=Fe(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function qo(e){return rn(Et(e)).left+Go(e).scrollLeft}function im(e,t){var n=Fe(e),r=Et(e),o=n.visualViewport,a=r.clientWidth,s=r.clientHeight,c=0,p=0;if(o){a=o.width,s=o.height;var f=Ci();(f||!f&&t==="fixed")&&(c=o.offsetLeft,p=o.offsetTop)}return{width:a,height:s,x:c+qo(e),y:p}}function lm(e){var t,n=Et(e),r=Go(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=_t(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=_t(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),c=-r.scrollLeft+qo(e),p=-r.scrollTop;return ut(o||n).direction==="rtl"&&(c+=_t(n.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:c,y:p}}function Wo(e){var t=ut(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Pi(e){return["html","body","#document"].indexOf(tt(e))>=0?e.ownerDocument.body:Ue(e)&&Wo(e)?e:Pi(_r(e))}function Rn(e,t){var n;t===void 0&&(t=[]);var r=Pi(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),a=Fe(r),s=o?[a].concat(a.visualViewport||[],Wo(r)?r:[]):r,c=t.concat(s);return o?c:c.concat(Rn(_r(s)))}function fo(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function cm(e,t){var n=rn(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function es(e,t,n){return t===Ni?fo(im(e,n)):Lt(t)?cm(t,n):fo(lm(Et(e)))}function pm(e){var t=Rn(_r(e)),n=["absolute","fixed"].indexOf(ut(e).position)>=0,r=n&&Ue(e)?Kn(e):e;return Lt(r)?t.filter(function(o){return Lt(o)&&Si(o,r)&&tt(o)!=="body"}):[]}function dm(e,t,n,r){var o=t==="clippingParents"?pm(e):[].concat(t),a=[].concat(o,[n]),s=a[0],c=a.reduce(function(p,f){var m=es(e,f,r);return p.top=_t(m.top,p.top),p.right=gr(m.right,p.right),p.bottom=gr(m.bottom,p.bottom),p.left=_t(m.left,p.left),p},es(e,s,r));return c.width=c.right-c.left,c.height=c.bottom-c.top,c.x=c.left,c.y=c.top,c}function $i(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ze(r):null,a=r?on(r):null,s=t.x+t.width/2-n.width/2,c=t.y+t.height/2-n.height/2,p;switch(o){case _e:p={x:s,y:t.y-n.height};break;case qe:p={x:s,y:t.y+t.height};break;case We:p={x:t.x+t.width,y:c};break;case Me:p={x:t.x-n.width,y:c};break;default:p={x:t.x,y:t.y}}var f=o?Uo(o):null;if(f!=null){var m=f==="y"?"height":"width";switch(a){case tn:p[f]=p[f]-(t[m]/2-n[m]/2);break;case An:p[f]=p[f]+(t[m]/2-n[m]/2);break}}return p}function Bn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,a=n.strategy,s=a===void 0?e.strategy:a,c=n.boundary,p=c===void 0?Pf:c,f=n.rootBoundary,m=f===void 0?Ni:f,v=n.elementContext,g=v===void 0?bn:v,d=n.altBoundary,h=d===void 0?!1:d,u=n.padding,b=u===void 0?0:u,x=ji(typeof b!="number"?b:Ri(b,Yn)),j=g===bn?$f:bn,w=e.rects.popper,k=e.elements[h?j:g],y=dm(Lt(k)?k:k.contextElement||Et(e.elements.popper),p,m,s),C=rn(e.elements.reference),S=$i({reference:C,element:w,strategy:"absolute",placement:o}),_=fo(Object.assign({},w,S)),D=g===bn?_:C,V={top:y.top-D.top+x.top,bottom:D.bottom-y.bottom+x.bottom,left:y.left-D.left+x.left,right:D.right-y.right+x.right},E=e.modifiersData.offset;if(g===bn&&E){var O=E[o];Object.keys(V).forEach(function($){var z=[We,qe].indexOf($)>=0?1:-1,H=[_e,qe].indexOf($)>=0?"y":"x";V[$]+=O[H]*z})}return V}function um(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,a=n.rootBoundary,s=n.padding,c=n.flipVariations,p=n.allowedAutoPlacements,f=p===void 0?Ti:p,m=on(r),v=m?c?Ka:Ka.filter(function(h){return on(h)===m}):Yn,g=v.filter(function(h){return f.indexOf(h)>=0});g.length===0&&(g=v);var d=g.reduce(function(h,u){return h[u]=Bn(e,{placement:u,boundary:o,rootBoundary:a,padding:s})[Ze(u)],h},{});return Object.keys(d).sort(function(h,u){return d[h]-d[u]})}function fm(e){if(Ze(e)===Fo)return[];var t=lr(e);return[Qa(e),t,Qa(t)]}function mm(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,a=o===void 0?!0:o,s=n.altAxis,c=s===void 0?!0:s,p=n.fallbackPlacements,f=n.padding,m=n.boundary,v=n.rootBoundary,g=n.altBoundary,d=n.flipVariations,h=d===void 0?!0:d,u=n.allowedAutoPlacements,b=t.options.placement,x=Ze(b),j=x===b,w=p||(j||!h?[lr(b)]:fm(b)),k=[b].concat(w).reduce(function(G,q){return G.concat(Ze(q)===Fo?um(t,{placement:q,boundary:m,rootBoundary:v,padding:f,flipVariations:h,allowedAutoPlacements:u}):q)},[]),y=t.rects.reference,C=t.rects.popper,S=new Map,_=!0,D=k[0],V=0;V<k.length;V++){var E=k[V],O=Ze(E),$=on(E)===tn,z=[_e,qe].indexOf(O)>=0,H=z?"width":"height",A=Bn(t,{placement:E,boundary:m,rootBoundary:v,altBoundary:g,padding:f}),B=z?$?We:Me:$?qe:_e;y[H]>C[H]&&(B=lr(B));var J=lr(B),Z=[];if(a&&Z.push(A[O]<=0),c&&Z.push(A[B]<=0,A[J]<=0),Z.every(function(G){return G})){D=E,_=!1;break}S.set(E,Z)}if(_)for(var R=h?3:1,M=function(q){var X=k.find(function(Y){var W=S.get(Y);if(W)return W.slice(0,q).every(function(Q){return Q})});if(X)return D=X,"break"},U=R;U>0;U--){var K=M(U);if(K==="break")break}t.placement!==D&&(t.modifiersData[r]._skip=!0,t.placement=D,t.reset=!0)}}const hm={name:"flip",enabled:!0,phase:"main",fn:mm,requiresIfExists:["offset"],data:{_skip:!1}};function ts(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ns(e){return[_e,We,qe,Me].some(function(t){return e[t]>=0})}function gm(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,s=Bn(t,{elementContext:"reference"}),c=Bn(t,{altBoundary:!0}),p=ts(s,r),f=ts(c,o,a),m=ns(p),v=ns(f);t.modifiersData[n]={referenceClippingOffsets:p,popperEscapeOffsets:f,isReferenceHidden:m,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":m,"data-popper-escaped":v})}const bm={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:gm};function vm(e,t,n){var r=Ze(e),o=[Me,_e].indexOf(r)>=0?-1:1,a=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,s=a[0],c=a[1];return s=s||0,c=(c||0)*o,[Me,We].indexOf(r)>=0?{x:c,y:s}:{x:s,y:c}}function ym(e){var t=e.state,n=e.options,r=e.name,o=n.offset,a=o===void 0?[0,0]:o,s=Ti.reduce(function(m,v){return m[v]=vm(v,t.rects,a),m},{}),c=s[t.placement],p=c.x,f=c.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=p,t.modifiersData.popperOffsets.y+=f),t.modifiersData[r]=s}const wm={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:ym};function xm(e){var t=e.state,n=e.name;t.modifiersData[n]=$i({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const km={name:"popperOffsets",enabled:!0,phase:"read",fn:xm,data:{}};function Em(e){return e==="x"?"y":"x"}function Nm(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,a=o===void 0?!0:o,s=n.altAxis,c=s===void 0?!1:s,p=n.boundary,f=n.rootBoundary,m=n.altBoundary,v=n.padding,g=n.tether,d=g===void 0?!0:g,h=n.tetherOffset,u=h===void 0?0:h,b=Bn(t,{boundary:p,rootBoundary:f,padding:v,altBoundary:m}),x=Ze(t.placement),j=on(t.placement),w=!j,k=Uo(x),y=Em(k),C=t.modifiersData.popperOffsets,S=t.rects.reference,_=t.rects.popper,D=typeof u=="function"?u(Object.assign({},t.rects,{placement:t.placement})):u,V=typeof D=="number"?{mainAxis:D,altAxis:D}:Object.assign({mainAxis:0,altAxis:0},D),E=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,O={x:0,y:0};if(C){if(a){var $,z=k==="y"?_e:Me,H=k==="y"?qe:We,A=k==="y"?"height":"width",B=C[k],J=B+b[z],Z=B-b[H],R=d?-_[A]/2:0,M=j===tn?S[A]:_[A],U=j===tn?-_[A]:-S[A],K=t.elements.arrow,G=d&&K?Ho(K):{width:0,height:0},q=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Oi(),X=q[z],Y=q[H],W=jn(0,S[A],G[A]),Q=w?S[A]/2-R-W-X-V.mainAxis:M-W-X-V.mainAxis,ee=w?-S[A]/2+R+W+Y+V.mainAxis:U+W+Y+V.mainAxis,se=t.elements.arrow&&Kn(t.elements.arrow),L=se?k==="y"?se.clientTop||0:se.clientLeft||0:0,te=($=E==null?void 0:E[k])!=null?$:0,I=B+Q-te-L,ie=B+ee-te,Ne=jn(d?gr(J,I):J,B,d?_t(Z,ie):Z);C[k]=Ne,O[k]=Ne-B}if(c){var Re,xe=k==="x"?_e:Me,Nt=k==="x"?qe:We,Pe=C[y],ot=y==="y"?"height":"width",Ae=Pe+b[xe],at=Pe-b[Nt],Te=[_e,Me].indexOf(x)!==-1,Vt=(Re=E==null?void 0:E[y])!=null?Re:0,Tt=Te?Ae:Pe-S[ot]-_[ot]-Vt+V.altAxis,cn=Te?Pe+S[ot]+_[ot]-Vt-V.altAxis:at,Zn=d&&Te?Xf(Tt,Pe,cn):jn(d?Tt:Ae,Pe,d?cn:at);C[y]=Zn,O[y]=Zn-Pe}t.modifiersData[r]=O}}const Tm={name:"preventOverflow",enabled:!0,phase:"main",fn:Nm,requiresIfExists:["offset"]};function Cm(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Sm(e){return e===Fe(e)||!Ue(e)?Go(e):Cm(e)}function Om(e){var t=e.getBoundingClientRect(),n=nn(t.width)/e.offsetWidth||1,r=nn(t.height)/e.offsetHeight||1;return n!==1||r!==1}function jm(e,t,n){n===void 0&&(n=!1);var r=Ue(t),o=Ue(t)&&Om(t),a=Et(t),s=rn(e,o,n),c={scrollLeft:0,scrollTop:0},p={x:0,y:0};return(r||!r&&!n)&&((tt(t)!=="body"||Wo(a))&&(c=Sm(t)),Ue(t)?(p=rn(t,!0),p.x+=t.clientLeft,p.y+=t.clientTop):a&&(p.x=qo(a))),{x:s.left+c.scrollLeft-p.x,y:s.top+c.scrollTop-p.y,width:s.width,height:s.height}}function Rm(e){var t=new Map,n=new Set,r=[];e.forEach(function(a){t.set(a.name,a)});function o(a){n.add(a.name);var s=[].concat(a.requires||[],a.requiresIfExists||[]);s.forEach(function(c){if(!n.has(c)){var p=t.get(c);p&&o(p)}}),r.push(a)}return e.forEach(function(a){n.has(a.name)||o(a)}),r}function Pm(e){var t=Rm(e);return zf.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function $m(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function _m(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var rs={placement:"bottom",modifiers:[],strategy:"absolute"};function os(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Mm(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,a=o===void 0?rs:o;return function(c,p,f){f===void 0&&(f=a);var m={placement:"bottom",orderedModifiers:[],options:Object.assign({},rs,a),modifiersData:{},elements:{reference:c,popper:p},attributes:{},styles:{}},v=[],g=!1,d={state:m,setOptions:function(x){var j=typeof x=="function"?x(m.options):x;u(),m.options=Object.assign({},a,m.options,j),m.scrollParents={reference:Lt(c)?Rn(c):c.contextElement?Rn(c.contextElement):[],popper:Rn(p)};var w=Pm(_m([].concat(r,m.options.modifiers)));return m.orderedModifiers=w.filter(function(k){return k.enabled}),h(),d.update()},forceUpdate:function(){if(!g){var x=m.elements,j=x.reference,w=x.popper;if(os(j,w)){m.rects={reference:jm(j,Kn(w),m.options.strategy==="fixed"),popper:Ho(w)},m.reset=!1,m.placement=m.options.placement,m.orderedModifiers.forEach(function(V){return m.modifiersData[V.name]=Object.assign({},V.data)});for(var k=0;k<m.orderedModifiers.length;k++){if(m.reset===!0){m.reset=!1,k=-1;continue}var y=m.orderedModifiers[k],C=y.fn,S=y.options,_=S===void 0?{}:S,D=y.name;typeof C=="function"&&(m=C({state:m,options:_,name:D,instance:d})||m)}}}},update:$m(function(){return new Promise(function(b){d.forceUpdate(),b(m)})}),destroy:function(){u(),g=!0}};if(!os(c,p))return d;d.setOptions(f).then(function(b){!g&&f.onFirstUpdate&&f.onFirstUpdate(b)});function h(){m.orderedModifiers.forEach(function(b){var x=b.name,j=b.options,w=j===void 0?{}:j,k=b.effect;if(typeof k=="function"){var y=k({state:m,name:x,instance:d,options:w}),C=function(){};v.push(y||C)}})}function u(){v.forEach(function(b){return b()}),v=[]}return d}}var Im=[om,km,nm,Gf,wm,hm,Tm,Zf,bm],Dm=Mm({defaultModifiers:Im});const _i="Popper";function Am(e){return Ei(_i,e)}mf(_i,["root"]);const Bm=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Lm=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Vm(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function br(e){return typeof e=="function"?e():e}function Mr(e){return e.nodeType!==void 0}function Fm(e){return!Mr(e)}const zm=()=>ft({root:["root"]},lf(Am)),Hm={},Um=T.forwardRef(function(t,n){var r;const{anchorEl:o,children:a,direction:s,disablePortal:c,modifiers:p,open:f,placement:m,popperOptions:v,popperRef:g,slotProps:d={},slots:h={},TransitionProps:u}=t,b=me(t,Bm),x=T.useRef(null),j=Ge(x,n),w=T.useRef(null),k=Ge(w,g),y=T.useRef(k);Dt(()=>{y.current=k},[k]),T.useImperativeHandle(g,()=>w.current,[]);const C=Vm(m,s),[S,_]=T.useState(C),[D,V]=T.useState(br(o));T.useEffect(()=>{w.current&&w.current.forceUpdate()}),T.useEffect(()=>{o&&V(br(o))},[o]),Dt(()=>{if(!D||!f)return;const H=J=>{_(J.placement)};if(process.env.NODE_ENV!=="production"&&D&&Mr(D)&&D.nodeType===1){const J=D.getBoundingClientRect();process.env.NODE_ENV!=="test"&&J.top===0&&J.left===0&&J.right===0&&J.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let A=[{name:"preventOverflow",options:{altBoundary:c}},{name:"flip",options:{altBoundary:c}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:J})=>{H(J)}}];p!=null&&(A=A.concat(p)),v&&v.modifiers!=null&&(A=A.concat(v.modifiers));const B=Dm(D,x.current,P({placement:C},v,{modifiers:A}));return y.current(B),()=>{B.destroy(),y.current(null)}},[D,c,p,f,v,C]);const E={placement:S};u!==null&&(E.TransitionProps=u);const O=zm(),$=(r=h.root)!=null?r:"div",z=Bt({elementType:$,externalSlotProps:d.root,externalForwardedProps:b,additionalProps:{role:"tooltip",ref:j},ownerState:t,className:O.root});return l.jsx($,P({},z,{children:typeof a=="function"?a(E):a}))}),Mi=T.forwardRef(function(t,n){const{anchorEl:r,children:o,container:a,direction:s="ltr",disablePortal:c=!1,keepMounted:p=!1,modifiers:f,open:m,placement:v="bottom",popperOptions:g=Hm,popperRef:d,style:h,transition:u=!1,slotProps:b={},slots:x={}}=t,j=me(t,Lm),[w,k]=T.useState(!0),y=()=>{k(!1)},C=()=>{k(!0)};if(!p&&!m&&(!u||w))return null;let S;if(a)S=a;else if(r){const V=br(r);S=V&&Mr(V)?Oe(V).body:Oe(null).body}const _=!m&&p&&(!u||w)?"none":void 0,D=u?{in:m,onEnter:y,onExited:C}:void 0;return l.jsx(Dn,{disablePortal:c,container:S,children:l.jsx(Um,P({anchorEl:r,direction:s,disablePortal:c,modifiers:f,ref:n,open:u?!w:m,placement:v,popperOptions:g,popperRef:d,slotProps:b,slots:x},j,{style:P({position:"fixed",top:0,left:0,display:_},h),TransitionProps:D,children:o}))})});process.env.NODE_ENV!=="production"&&(Mi.propTypes={anchorEl:ln(i.oneOfType([pt,i.object,i.func]),e=>{if(e.open){const t=br(e.anchorEl);if(t&&Mr(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Fm(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:i.oneOfType([i.node,i.func]),container:i.oneOfType([pt,i.func]),direction:i.oneOf(["ltr","rtl"]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:Po,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),transition:i.bool});function Jn(){const e=gi(Bo);return process.env.NODE_ENV!=="production"&&T.useDebugValue(e),e[Lo]||e}function mo(e,t){return mo=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},mo(e,t)}function Gm(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,mo(e,t)}const as={disabled:!1};var qm=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.shape({enter:i.number,exit:i.number,appear:i.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&i.oneOfType([i.string,i.shape({enter:i.string,exit:i.string,active:i.string}),i.shape({enter:i.string,enterDone:i.string,enterActive:i.string,exit:i.string,exitDone:i.string,exitActive:i.string})]);const Ii=N.createContext(null);var Wm=function(t){return t.scrollTop},Tn="unmounted",St="exited",Ot="entering",Xt="entered",ho="exiting",ht=function(e){Gm(t,e);function t(r,o){var a;a=e.call(this,r,o)||this;var s=o,c=s&&!s.isMounting?r.enter:r.appear,p;return a.appearStatus=null,r.in?c?(p=St,a.appearStatus=Ot):p=Xt:r.unmountOnExit||r.mountOnEnter?p=Tn:p=St,a.state={status:p},a.nextCallback=null,a}t.getDerivedStateFromProps=function(o,a){var s=o.in;return s&&a.status===Tn?{status:St}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var a=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==Ot&&s!==Xt&&(a=Ot):(s===Ot||s===Xt)&&(a=ho)}this.updateStatus(!1,a)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,a,s,c;return a=s=c=o,o!=null&&typeof o!="number"&&(a=o.exit,s=o.enter,c=o.appear!==void 0?o.appear:s),{exit:a,enter:s,appear:c}},n.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===Ot){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:xn.findDOMNode(this);s&&Wm(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===St&&this.setState({status:Tn})},n.performEnter=function(o){var a=this,s=this.props.enter,c=this.context?this.context.isMounting:o,p=this.props.nodeRef?[c]:[xn.findDOMNode(this),c],f=p[0],m=p[1],v=this.getTimeouts(),g=c?v.appear:v.enter;if(!o&&!s||as.disabled){this.safeSetState({status:Xt},function(){a.props.onEntered(f)});return}this.props.onEnter(f,m),this.safeSetState({status:Ot},function(){a.props.onEntering(f,m),a.onTransitionEnd(g,function(){a.safeSetState({status:Xt},function(){a.props.onEntered(f,m)})})})},n.performExit=function(){var o=this,a=this.props.exit,s=this.getTimeouts(),c=this.props.nodeRef?void 0:xn.findDOMNode(this);if(!a||as.disabled){this.safeSetState({status:St},function(){o.props.onExited(c)});return}this.props.onExit(c),this.safeSetState({status:ho},function(){o.props.onExiting(c),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:St},function(){o.props.onExited(c)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},n.setNextCallback=function(o){var a=this,s=!0;return this.nextCallback=function(c){s&&(s=!1,a.nextCallback=null,o(c))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},n.onTransitionEnd=function(o,a){this.setNextCallback(a);var s=this.props.nodeRef?this.props.nodeRef.current:xn.findDOMNode(this),c=o==null&&!this.props.addEndListener;if(!s||c){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var p=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],f=p[0],m=p[1];this.props.addEndListener(f,m)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===Tn)return null;var a=this.props,s=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var c=me(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return N.createElement(Ii.Provider,{value:null},typeof s=="function"?s(o,c):N.cloneElement(N.Children.only(s),c))},t}(N.Component);ht.contextType=Ii;ht.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:i.shape({current:typeof Element>"u"?i.any:function(e,t,n,r,o,a){var s=e[t];return i.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,a)}}),children:i.oneOfType([i.func.isRequired,i.element.isRequired]).isRequired,in:i.bool,mountOnEnter:i.bool,unmountOnExit:i.bool,appear:i.bool,enter:i.bool,exit:i.bool,timeout:function(t){var n=qm;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),a=1;a<r;a++)o[a-1]=arguments[a];return n.apply(void 0,[t].concat(o))},addEndListener:i.func,onEnter:i.func,onEntering:i.func,onEntered:i.func,onExit:i.func,onExiting:i.func,onExited:i.func}:{};function qt(){}ht.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:qt,onEntering:qt,onEntered:qt,onExit:qt,onExiting:qt,onExited:qt};ht.UNMOUNTED=Tn;ht.EXITED=St;ht.ENTERING=Ot;ht.ENTERED=Xt;ht.EXITING=ho;const Di=ht,Ai=e=>e.scrollTop;function vr(e,t){var n,r;const{timeout:o,easing:a,style:s={}}=e;return{duration:(n=s.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof a=="object"?a[t.mode]:a,delay:s.transitionDelay}}const Xm=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function go(e){return`scale(${e}, ${e**2})`}const Ym={entering:{opacity:1,transform:go(1)},entered:{opacity:1,transform:"none"}},Kr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Xo=T.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:a,easing:s,in:c,onEnter:p,onEntered:f,onEntering:m,onExit:v,onExited:g,onExiting:d,style:h,timeout:u="auto",TransitionComponent:b=Di}=t,x=me(t,Xm),j=En(),w=T.useRef(),k=Jn(),y=T.useRef(null),C=Ge(y,a.ref,n),S=H=>A=>{if(H){const B=y.current;A===void 0?H(B):H(B,A)}},_=S(m),D=S((H,A)=>{Ai(H);const{duration:B,delay:J,easing:Z}=vr({style:h,timeout:u,easing:s},{mode:"enter"});let R;u==="auto"?(R=k.transitions.getAutoHeightDuration(H.clientHeight),w.current=R):R=B,H.style.transition=[k.transitions.create("opacity",{duration:R,delay:J}),k.transitions.create("transform",{duration:Kr?R:R*.666,delay:J,easing:Z})].join(","),p&&p(H,A)}),V=S(f),E=S(d),O=S(H=>{const{duration:A,delay:B,easing:J}=vr({style:h,timeout:u,easing:s},{mode:"exit"});let Z;u==="auto"?(Z=k.transitions.getAutoHeightDuration(H.clientHeight),w.current=Z):Z=A,H.style.transition=[k.transitions.create("opacity",{duration:Z,delay:B}),k.transitions.create("transform",{duration:Kr?Z:Z*.666,delay:Kr?B:B||Z*.333,easing:J})].join(","),H.style.opacity=0,H.style.transform=go(.75),v&&v(H)}),$=S(g),z=H=>{u==="auto"&&j.start(w.current||0,H),r&&r(y.current,H)};return l.jsx(b,P({appear:o,in:c,nodeRef:y,onEnter:D,onEntered:V,onEntering:_,onExit:O,onExited:$,onExiting:E,addEndListener:z,timeout:u==="auto"?null:u},x,{children:(H,A)=>T.cloneElement(a,P({style:P({opacity:0,transform:go(.75),visibility:H==="exited"&&!c?"hidden":void 0},Ym[H],h,a.props.style),ref:C},A))}))});process.env.NODE_ENV!=="production"&&(Xo.propTypes={addEndListener:i.func,appear:i.bool,children:Gn.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});Xo.muiSupportAuto=!0;const bo=Xo,Km=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},ss=Km,Jm=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Zm=je(Mi,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Bi=T.forwardRef(function(t,n){var r;const o=hi(),a=mt({props:t,name:"MuiPopper"}),{anchorEl:s,component:c,components:p,componentsProps:f,container:m,disablePortal:v,keepMounted:g,modifiers:d,open:h,placement:u,popperOptions:b,popperRef:x,transition:j,slots:w,slotProps:k}=a,y=me(a,Jm),C=(r=w==null?void 0:w.root)!=null?r:p==null?void 0:p.Root,S=P({anchorEl:s,container:m,disablePortal:v,keepMounted:g,modifiers:d,open:h,placement:u,popperOptions:b,popperRef:x,transition:j},y);return l.jsx(Zm,P({as:c,direction:o==null?void 0:o.direction,slots:{root:C},slotProps:k??f},S,{ref:n}))});process.env.NODE_ENV!=="production"&&(Bi.propTypes={anchorEl:i.oneOfType([pt,i.object,i.func]),children:i.oneOfType([i.node,i.func]),component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:Po,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transition:i.bool});const Li=Bi;function Qm(e){return rt("MuiTooltip",e)}const eh=xt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),wt=eh,th=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function nh(e){return Math.round(e*1e5)/1e5}const rh=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:a}=e,s={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${et(a.split("-")[0])}`],arrow:["arrow"]};return ft(s,Qm,t)},oh=je(Li,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>P({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${wt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${wt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${wt.arrow}`]:P({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${wt.arrow}`]:P({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),ah=je("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${et(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>P({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:mr(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${nh(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${wt.popper}[data-popper-placement*="left"] &`]:P({transformOrigin:"right center"},t.isRtl?P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):P({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${wt.popper}[data-popper-placement*="right"] &`]:P({transformOrigin:"left center"},t.isRtl?P({marginRight:"14px"},t.touch&&{marginRight:"24px"}):P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${wt.popper}[data-popper-placement*="top"] &`]:P({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${wt.popper}[data-popper-placement*="bottom"] &`]:P({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),sh=je("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:mr(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let or=!1;const is=new qn;let vn={x:0,y:0};function ar(e,t){return n=>{t&&t(n),e(n)}}const Vi=T.forwardRef(function(t,n){var r,o,a,s,c,p,f,m,v,g,d,h,u,b,x,j,w,k,y;const C=mt({props:t,name:"MuiTooltip"}),{arrow:S=!1,children:_,components:D={},componentsProps:V={},describeChild:E=!1,disableFocusListener:O=!1,disableHoverListener:$=!1,disableInteractive:z=!1,disableTouchListener:H=!1,enterDelay:A=100,enterNextDelay:B=0,enterTouchDelay:J=700,followCursor:Z=!1,id:R,leaveDelay:M=0,leaveTouchDelay:U=1500,onClose:K,onOpen:G,open:q,placement:X="bottom",PopperComponent:Y,PopperProps:W={},slotProps:Q={},slots:ee={},title:se,TransitionComponent:L=bo,TransitionProps:te}=C,I=me(C,th),ie=T.isValidElement(_)?_:l.jsx("span",{children:_}),Ne=Jn(),Re=Ne.direction==="rtl",[xe,Nt]=T.useState(),[Pe,ot]=T.useState(null),Ae=T.useRef(!1),at=z||Z,Te=En(),Vt=En(),Tt=En(),cn=En(),[Zn,ea]=ri({controlled:q,default:!1,name:"Tooltip",state:"open"});let st=Zn;if(process.env.NODE_ENV!=="production"){const{current:ne}=T.useRef(q!==void 0);T.useEffect(()=>{xe&&xe.disabled&&!ne&&se!==""&&xe.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[se,xe,ne])}const Ir=ni(R),pn=T.useRef(),Qn=Mn(()=>{pn.current!==void 0&&(document.body.style.WebkitUserSelect=pn.current,pn.current=void 0),cn.clear()});T.useEffect(()=>Qn,[Qn]);const ta=ne=>{is.clear(),or=!0,ea(!0),G&&!st&&G(ne)},er=Mn(ne=>{is.start(800+M,()=>{or=!1}),ea(!1),K&&st&&K(ne),Te.start(Ne.transitions.duration.shortest,()=>{Ae.current=!1})}),Dr=ne=>{Ae.current&&ne.type!=="touchstart"||(xe&&xe.removeAttribute("title"),Vt.clear(),Tt.clear(),A||or&&B?Vt.start(or?B:A,()=>{ta(ne)}):ta(ne))},na=ne=>{Vt.clear(),Tt.start(M,()=>{er(ne)})},{isFocusVisibleRef:ra,onBlur:zl,onFocus:Hl,ref:Ul}=oi(),[,oa]=T.useState(!1),aa=ne=>{zl(ne),ra.current===!1&&(oa(!1),na(ne))},sa=ne=>{xe||Nt(ne.currentTarget),Hl(ne),ra.current===!0&&(oa(!0),Dr(ne))},ia=ne=>{Ae.current=!0;const Be=ie.props;Be.onTouchStart&&Be.onTouchStart(ne)},la=Dr,ca=na,Gl=ne=>{ia(ne),Tt.clear(),Te.clear(),Qn(),pn.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",cn.start(J,()=>{document.body.style.WebkitUserSelect=pn.current,Dr(ne)})},ql=ne=>{ie.props.onTouchEnd&&ie.props.onTouchEnd(ne),Qn(),Tt.start(U,()=>{er(ne)})};T.useEffect(()=>{if(!st)return;function ne(Be){(Be.key==="Escape"||Be.key==="Esc")&&er(Be)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[er,st]);const Wl=Ge(ie.ref,Ul,Nt,n);!se&&se!==0&&(st=!1);const Ar=T.useRef(),Xl=ne=>{const Be=ie.props;Be.onMouseMove&&Be.onMouseMove(ne),vn={x:ne.clientX,y:ne.clientY},Ar.current&&Ar.current.update()},dn={},Br=typeof se=="string";E?(dn.title=!st&&Br&&!$?se:null,dn["aria-describedby"]=st?Ir:null):(dn["aria-label"]=Br?se:null,dn["aria-labelledby"]=st&&!Br?Ir:null);const ze=P({},dn,I,ie.props,{className:Ce(I.className,ie.props.className),onTouchStart:ia,ref:Wl},Z?{onMouseMove:Xl}:{});process.env.NODE_ENV!=="production"&&(ze["data-mui-internal-clone-element"]=!0,T.useEffect(()=>{xe&&!xe.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[xe]));const un={};H||(ze.onTouchStart=Gl,ze.onTouchEnd=ql),$||(ze.onMouseOver=ar(la,ze.onMouseOver),ze.onMouseLeave=ar(ca,ze.onMouseLeave),at||(un.onMouseOver=la,un.onMouseLeave=ca)),O||(ze.onFocus=ar(sa,ze.onFocus),ze.onBlur=ar(aa,ze.onBlur),at||(un.onFocus=sa,un.onBlur=aa)),process.env.NODE_ENV!=="production"&&ie.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ie.props.title}\` or the Tooltip component.`].join(`
`));const Yl=T.useMemo(()=>{var ne;let Be=[{name:"arrow",enabled:!!Pe,options:{element:Pe,padding:4}}];return(ne=W.popperOptions)!=null&&ne.modifiers&&(Be=Be.concat(W.popperOptions.modifiers)),P({},W.popperOptions,{modifiers:Be})},[Pe,W]),fn=P({},C,{isRtl:Re,arrow:S,disableInteractive:at,placement:X,PopperComponentProp:Y,touch:Ae.current}),Lr=rh(fn),pa=(r=(o=ee.popper)!=null?o:D.Popper)!=null?r:oh,da=(a=(s=(c=ee.transition)!=null?c:D.Transition)!=null?s:L)!=null?a:bo,ua=(p=(f=ee.tooltip)!=null?f:D.Tooltip)!=null?p:ah,fa=(m=(v=ee.arrow)!=null?v:D.Arrow)!=null?m:sh,Kl=Nn(pa,P({},W,(g=Q.popper)!=null?g:V.popper,{className:Ce(Lr.popper,W==null?void 0:W.className,(d=(h=Q.popper)!=null?h:V.popper)==null?void 0:d.className)}),fn),Jl=Nn(da,P({},te,(u=Q.transition)!=null?u:V.transition),fn),Zl=Nn(ua,P({},(b=Q.tooltip)!=null?b:V.tooltip,{className:Ce(Lr.tooltip,(x=(j=Q.tooltip)!=null?j:V.tooltip)==null?void 0:x.className)}),fn),Ql=Nn(fa,P({},(w=Q.arrow)!=null?w:V.arrow,{className:Ce(Lr.arrow,(k=(y=Q.arrow)!=null?y:V.arrow)==null?void 0:k.className)}),fn);return l.jsxs(T.Fragment,{children:[T.cloneElement(ie,ze),l.jsx(pa,P({as:Y??Li,placement:X,anchorEl:Z?{getBoundingClientRect:()=>({top:vn.y,left:vn.x,right:vn.x,bottom:vn.y,width:0,height:0})}:xe,popperRef:Ar,open:xe?st:!1,id:Ir,transition:!0},un,Kl,{popperOptions:Yl,children:({TransitionProps:ne})=>l.jsx(da,P({timeout:Ne.transitions.duration.shorter},ne,Jl,{children:l.jsxs(ua,P({},Zl,{children:[se,S?l.jsx(fa,P({},Ql,{ref:ot})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Vi.propTypes={arrow:i.bool,children:Gn.isRequired,classes:i.object,className:i.string,components:i.shape({Arrow:i.elementType,Popper:i.elementType,Tooltip:i.elementType,Transition:i.elementType}),componentsProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),describeChild:i.bool,disableFocusListener:i.bool,disableHoverListener:i.bool,disableInteractive:i.bool,disableTouchListener:i.bool,enterDelay:i.number,enterNextDelay:i.number,enterTouchDelay:i.number,followCursor:i.bool,id:i.string,leaveDelay:i.number,leaveTouchDelay:i.number,onClose:i.func,onOpen:i.func,open:i.bool,placement:i.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:i.elementType,PopperProps:i.object,slotProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),slots:i.shape({arrow:i.elementType,popper:i.elementType,tooltip:i.elementType,transition:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),title:i.node,TransitionComponent:i.elementType,TransitionProps:i.object});const ih=Vi;function ls(e,t,n){return e?l.jsx(Ee.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:l.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Yo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:s=void 0,hasAutoFocus:c=!1,className:p,isDisabled:f=!1,isDense:m=!0,isSubMenuParent:v=!1,hasDisabledGutters:g=!1,hasDivider:d=!1,focusVisibleClassName:h,id:u,children:b}=e,x=l.jsx(Ee.MenuItem,{sx:{lineHeight:.8},autoFocus:c,className:p,disabled:f,dense:m,disableGutters:g,divider:d,focusVisibleClassName:h,onClick:t,id:u,children:n?l.jsxs(l.Fragment,{children:[ls(a,n,!0),l.jsx(Ee.ListItemText,{primary:n,inset:!a&&o}),v?l.jsx(Ee.ListItemIcon,{className:"papi-menu-icon-trailing",children:l.jsx(yi,{})}):ls(s,n,!1)]}):b});return r?l.jsx(ih,{title:r,placement:"right",children:l.jsx("div",{children:x})}):x}function Fi(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function lh(e){const[t,n]=N.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:a}=e,s=f=>{n(f.currentTarget)},c=()=>{n(void 0)},p=()=>{let f=Fi(a).filter(m=>"menuItem"in m.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return f=f.filter(m=>"menuItem"in m.group&&m.group.menuItem===r.id),l.jsx(Ko,{...e,includedGroups:f})};return l.jsxs(l.Fragment,{children:[l.jsx(Yo,{onClick:s,...o,isSubMenuParent:!0}),l.jsx(Ee.Menu,{anchorEl:t,open:!!t,onClose:c,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:p()},r.id)]})}const ch=(e,t)=>t.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function Ko(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:a,allowForLeadingIcons:s}=N.useMemo(()=>{const m=o&&o.length>0?o:Fi(t).filter(h=>!("menuItem"in h.group)),v=Object.values(m).sort((h,u)=>(h.group.order||0)-(u.group.order||0)),g=[];v.forEach(h=>{ch(h.id,t.items).forEach(u=>g.push({item:u,isLastItemInGroup:!1})),g.length>0&&(g[g.length-1].isLastItemInGroup=!0)}),g.length>0&&(g[g.length-1].isLastItemInGroup=!1);const d=g.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:g,allowForLeadingIcons:d}},[o,t]),c=({item:m,isLastItemInGroup:v})=>({className:"papi-menu-item",label:m.label,tooltip:m.tooltip,iconPathBefore:"iconPathBefore"in m?m.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in m?m.iconPathAfter:void 0,hasDivider:v,allowForLeadingIcons:s}),[p]=a;if(!p)return l.jsx("div",{});const f=p.item.group;return l.jsx("div",{role:"menu","aria-label":f,children:a.map((m,v)=>{const{item:g}=m,d=c(m);if("command"in g){const h=g.group+v;return l.jsx(Yo,{onClick:u=>{n==null||n(u),r(g)},...d},h)}return l.jsx(lh,{parentMenuItem:g,parentItemProps:d,...e},f+g.id)})},f)}function ph(e){const{menuDefinition:t,columnId:n}=e;let a=Object.entries(t.groups).map(([s,c])=>({id:s,group:c})).filter(s=>"column"in s.group);return n&&"columns"in t&&t.columns[n]&&(a=a.filter(s=>"column"in s.group&&s.group.column===n)),l.jsx(Ko,{...e,includedGroups:a})}function dh({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:a}){return l.jsxs(Ee.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${a??""}`,children:[l.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${a??""}`,children:r.label}),l.jsx(Ee.List,{id:n,dense:!0,className:a??"",children:l.jsx(ph,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function zi({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,a=N.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(c=>{if(c==="isExtensible")return;const p=c,f=o[p];typeof f=="object"&&typeof f.order=="number"&&!Number.isNaN(f.order)?s.set(f.order,{id:p,metadata:f}):console.warn(`Property ${c} (${typeof f}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((c,p)=>(c.metadata.order||0)-(p.metadata.order||0))},[o,r]);return l.jsx(Ee.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:r,children:a.map((s,c)=>l.jsx(dh,{commandHandler:e,menuDefinition:n,...s,className:t},c))})}const Hi=T.createContext({});process.env.NODE_ENV!=="production"&&(Hi.displayName="ListContext");const uh=Hi;function fh(e){return rt("MuiList",e)}xt("MuiList",["root","padding","dense","subheader"]);const mh=["children","className","component","dense","disablePadding","subheader"],hh=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return ft({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},fh,t)},gh=je("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>P({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Ui=T.forwardRef(function(t,n){const r=mt({props:t,name:"MuiList"}),{children:o,className:a,component:s="ul",dense:c=!1,disablePadding:p=!1,subheader:f}=r,m=me(r,mh),v=T.useMemo(()=>({dense:c}),[c]),g=P({},r,{component:s,dense:c,disablePadding:p}),d=hh(g);return l.jsx(uh.Provider,{value:v,children:l.jsxs(gh,P({as:s,className:Ce(d.root,a),ref:n,ownerState:g},m,{children:[f,o]}))})});process.env.NODE_ENV!=="production"&&(Ui.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,dense:i.bool,disablePadding:i.bool,subheader:i.node,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const bh=Ui,vh=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Jr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function cs(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function Gi(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function yn(e,t,n,r,o,a){let s=!1,c=o(e,t,t?n:!1);for(;c;){if(c===e.firstChild){if(s)return!1;s=!0}const p=r?!1:c.disabled||c.getAttribute("aria-disabled")==="true";if(!c.hasAttribute("tabindex")||!Gi(c,a)||p)c=o(e,c,n);else return c.focus(),!0}return!1}const qi=T.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:a=!1,children:s,className:c,disabledItemsFocusable:p=!1,disableListWrap:f=!1,onKeyDown:m,variant:v="selectedMenu"}=t,g=me(t,vh),d=T.useRef(null),h=T.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Dt(()=>{o&&d.current.focus()},[o]),T.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(w,k)=>{const y=!d.current.style.width;if(w.clientHeight<d.current.clientHeight&&y){const C=`${ai(Oe(w))}px`;d.current.style[k.direction==="rtl"?"paddingLeft":"paddingRight"]=C,d.current.style.width=`calc(100% + ${C})`}return d.current}}),[]);const u=w=>{const k=d.current,y=w.key,C=Oe(k).activeElement;if(y==="ArrowDown")w.preventDefault(),yn(k,C,f,p,Jr);else if(y==="ArrowUp")w.preventDefault(),yn(k,C,f,p,cs);else if(y==="Home")w.preventDefault(),yn(k,null,f,p,Jr);else if(y==="End")w.preventDefault(),yn(k,null,f,p,cs);else if(y.length===1){const S=h.current,_=y.toLowerCase(),D=performance.now();S.keys.length>0&&(D-S.lastTime>500?(S.keys=[],S.repeating=!0,S.previousKeyMatched=!0):S.repeating&&_!==S.keys[0]&&(S.repeating=!1)),S.lastTime=D,S.keys.push(_);const V=C&&!S.repeating&&Gi(C,S);S.previousKeyMatched&&(V||yn(k,C,!1,p,Jr,S))?w.preventDefault():S.previousKeyMatched=!1}m&&m(w)},b=Ge(d,n);let x=-1;T.Children.forEach(s,(w,k)=>{if(!T.isValidElement(w)){x===k&&(x+=1,x>=s.length&&(x=-1));return}process.env.NODE_ENV!=="production"&&dr.isFragment(w)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),w.props.disabled||(v==="selectedMenu"&&w.props.selected||x===-1)&&(x=k),x===k&&(w.props.disabled||w.props.muiSkipListHighlight||w.type.muiSkipListHighlight)&&(x+=1,x>=s.length&&(x=-1))});const j=T.Children.map(s,(w,k)=>{if(k===x){const y={};return a&&(y.autoFocus=!0),w.props.tabIndex===void 0&&v==="selectedMenu"&&(y.tabIndex=0),T.cloneElement(w,y)}return w});return l.jsx(bh,P({role:"menu",ref:b,className:c,onKeyDown:u,tabIndex:o?0:-1},g,{children:j}))});process.env.NODE_ENV!=="production"&&(qi.propTypes={autoFocus:i.bool,autoFocusItem:i.bool,children:i.node,className:i.string,disabledItemsFocusable:i.bool,disableListWrap:i.bool,onKeyDown:i.func,variant:i.oneOf(["menu","selectedMenu"])});const yh=qi,wh=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],xh={entering:{opacity:1},entered:{opacity:1}},Wi=T.forwardRef(function(t,n){const r=Jn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:a,appear:s=!0,children:c,easing:p,in:f,onEnter:m,onEntered:v,onEntering:g,onExit:d,onExited:h,onExiting:u,style:b,timeout:x=o,TransitionComponent:j=Di}=t,w=me(t,wh),k=T.useRef(null),y=Ge(k,c.ref,n),C=z=>H=>{if(z){const A=k.current;H===void 0?z(A):z(A,H)}},S=C(g),_=C((z,H)=>{Ai(z);const A=vr({style:b,timeout:x,easing:p},{mode:"enter"});z.style.webkitTransition=r.transitions.create("opacity",A),z.style.transition=r.transitions.create("opacity",A),m&&m(z,H)}),D=C(v),V=C(u),E=C(z=>{const H=vr({style:b,timeout:x,easing:p},{mode:"exit"});z.style.webkitTransition=r.transitions.create("opacity",H),z.style.transition=r.transitions.create("opacity",H),d&&d(z)}),O=C(h),$=z=>{a&&a(k.current,z)};return l.jsx(j,P({appear:s,in:f,nodeRef:k,onEnter:_,onEntered:D,onEntering:S,onExit:E,onExited:O,onExiting:V,addEndListener:$,timeout:x},w,{children:(z,H)=>T.cloneElement(c,P({style:P({opacity:0,visibility:z==="exited"&&!f?"hidden":void 0},xh[z],b,c.props.style),ref:y},H))}))});process.env.NODE_ENV!=="production"&&(Wi.propTypes={addEndListener:i.func,appear:i.bool,children:Gn.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const kh=Wi;function Eh(e){return rt("MuiBackdrop",e)}xt("MuiBackdrop",["root","invisible"]);const Nh=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Th=e=>{const{classes:t,invisible:n}=e;return ft({root:["root",n&&"invisible"]},Eh,t)},Ch=je("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>P({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),Xi=T.forwardRef(function(t,n){var r,o,a;const s=mt({props:t,name:"MuiBackdrop"}),{children:c,className:p,component:f="div",components:m={},componentsProps:v={},invisible:g=!1,open:d,slotProps:h={},slots:u={},TransitionComponent:b=kh,transitionDuration:x}=s,j=me(s,Nh),w=P({},s,{component:f,invisible:g}),k=Th(w),y=(r=h.root)!=null?r:v.root;return l.jsx(b,P({in:d,timeout:x},j,{children:l.jsx(Ch,P({"aria-hidden":!0},y,{as:(o=(a=u.root)!=null?a:m.Root)!=null?o:f,className:Ce(k.root,p,y==null?void 0:y.className),ownerState:P({},w,y==null?void 0:y.ownerState),classes:k,ref:n,children:c}))}))});process.env.NODE_ENV!=="production"&&(Xi.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.object}),invisible:i.bool,open:i.bool.isRequired,slotProps:i.shape({root:i.object}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Sh=Xi;function Oh(e){return rt("MuiModal",e)}xt("MuiModal",["root","hidden","backdrop"]);const jh=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Rh=e=>{const{open:t,exited:n,classes:r}=e;return ft({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},Oh,r)},Ph=je("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>P({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),$h=je(Sh,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Yi=T.forwardRef(function(t,n){var r,o,a,s,c,p;const f=mt({name:"MuiModal",props:t}),{BackdropComponent:m=$h,BackdropProps:v,className:g,closeAfterTransition:d=!1,children:h,container:u,component:b,components:x={},componentsProps:j={},disableAutoFocus:w=!1,disableEnforceFocus:k=!1,disableEscapeKeyDown:y=!1,disablePortal:C=!1,disableRestoreFocus:S=!1,disableScrollLock:_=!1,hideBackdrop:D=!1,keepMounted:V=!1,onBackdropClick:E,open:O,slotProps:$,slots:z}=f,H=me(f,jh),A=P({},f,{closeAfterTransition:d,disableAutoFocus:w,disableEnforceFocus:k,disableEscapeKeyDown:y,disablePortal:C,disableRestoreFocus:S,disableScrollLock:_,hideBackdrop:D,keepMounted:V}),{getRootProps:B,getBackdropProps:J,getTransitionProps:Z,portalRef:R,isTopModal:M,exited:U,hasTransition:K}=Rf(P({},A,{rootRef:n})),G=P({},A,{exited:U}),q=Rh(G),X={};if(h.props.tabIndex===void 0&&(X.tabIndex="-1"),K){const{onEnter:te,onExited:I}=Z();X.onEnter=te,X.onExited=I}const Y=(r=(o=z==null?void 0:z.root)!=null?o:x.Root)!=null?r:Ph,W=(a=(s=z==null?void 0:z.backdrop)!=null?s:x.Backdrop)!=null?a:m,Q=(c=$==null?void 0:$.root)!=null?c:j.root,ee=(p=$==null?void 0:$.backdrop)!=null?p:j.backdrop,se=Bt({elementType:Y,externalSlotProps:Q,externalForwardedProps:H,getSlotProps:B,additionalProps:{ref:n,as:b},ownerState:G,className:Ce(g,Q==null?void 0:Q.className,q==null?void 0:q.root,!G.open&&G.exited&&(q==null?void 0:q.hidden))}),L=Bt({elementType:W,externalSlotProps:ee,additionalProps:v,getSlotProps:te=>J(P({},te,{onClick:I=>{E&&E(I),te!=null&&te.onClick&&te.onClick(I)}})),className:Ce(ee==null?void 0:ee.className,v==null?void 0:v.className,q==null?void 0:q.backdrop),ownerState:G});return!V&&!O&&(!K||U)?null:l.jsx(Dn,{ref:R,container:u,disablePortal:C,children:l.jsxs(Y,P({},se,{children:[!D&&m?l.jsx(W,P({},L)):null,l.jsx(hr,{disableEnforceFocus:k,disableAutoFocus:w,disableRestoreFocus:S,isEnabled:M,open:O,children:T.cloneElement(h,X)})]}))})});process.env.NODE_ENV!=="production"&&(Yi.propTypes={BackdropComponent:i.elementType,BackdropProps:i.object,children:Gn.isRequired,classes:i.object,className:i.string,closeAfterTransition:i.bool,component:i.elementType,components:i.shape({Backdrop:i.elementType,Root:i.elementType}),componentsProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableEscapeKeyDown:i.bool,disablePortal:i.bool,disableRestoreFocus:i.bool,disableScrollLock:i.bool,hideBackdrop:i.bool,keepMounted:i.bool,onBackdropClick:i.func,onClose:i.func,onTransitionEnter:i.func,onTransitionExited:i.func,open:i.bool.isRequired,slotProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({backdrop:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const _h=Yi;function Mh(e){return rt("MuiPaper",e)}xt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Ih=["className","component","elevation","square","variant"],Dh=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,a={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return ft(a,Mh,o)},Ah=je("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return P({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&P({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${mr("#fff",ss(t.elevation))}, ${mr("#fff",ss(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Ki=T.forwardRef(function(t,n){const r=mt({props:t,name:"MuiPaper"}),{className:o,component:a="div",elevation:s=1,square:c=!1,variant:p="elevation"}=r,f=me(r,Ih),m=P({},r,{component:a,elevation:s,square:c,variant:p}),v=Dh(m);return process.env.NODE_ENV!=="production"&&Jn().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),l.jsx(Ah,P({as:a,ownerState:m,className:Ce(v.root,o),ref:n},f))});process.env.NODE_ENV!=="production"&&(Ki.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,elevation:ln(li,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:i.bool,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),variant:i.oneOfType([i.oneOf(["elevation","outlined"]),i.string])});const Bh=Ki;function Lh(e){return rt("MuiPopover",e)}xt("MuiPopover",["root","paper"]);const Vh=["onEntering"],Fh=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],zh=["slotProps"];function ps(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function ds(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function us(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function cr(e){return typeof e=="function"?e():e}const Hh=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"]},Lh,t)},Uh=je(_h,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ji=je(Bh,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Zi=T.forwardRef(function(t,n){var r,o,a;const s=mt({props:t,name:"MuiPopover"}),{action:c,anchorEl:p,anchorOrigin:f={vertical:"top",horizontal:"left"},anchorPosition:m,anchorReference:v="anchorEl",children:g,className:d,container:h,elevation:u=8,marginThreshold:b=16,open:x,PaperProps:j={},slots:w,slotProps:k,transformOrigin:y={vertical:"top",horizontal:"left"},TransitionComponent:C=bo,transitionDuration:S="auto",TransitionProps:{onEntering:_}={},disableScrollLock:D=!1}=s,V=me(s.TransitionProps,Vh),E=me(s,Fh),O=(r=k==null?void 0:k.paper)!=null?r:j,$=T.useRef(),z=Ge($,O.ref),H=P({},s,{anchorOrigin:f,anchorReference:v,elevation:u,marginThreshold:b,externalPaperSlotProps:O,transformOrigin:y,TransitionComponent:C,transitionDuration:S,TransitionProps:V}),A=Hh(H),B=T.useCallback(()=>{if(v==="anchorPosition")return process.env.NODE_ENV!=="production"&&(m||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),m;const te=cr(p),I=te&&te.nodeType===1?te:Oe($.current).body,ie=I.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Ne=I.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Ne.top===0&&Ne.left===0&&Ne.right===0&&Ne.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:ie.top+ps(ie,f.vertical),left:ie.left+ds(ie,f.horizontal)}},[p,f.horizontal,f.vertical,m,v]),J=T.useCallback(te=>({vertical:ps(te,y.vertical),horizontal:ds(te,y.horizontal)}),[y.horizontal,y.vertical]),Z=T.useCallback(te=>{const I={width:te.offsetWidth,height:te.offsetHeight},ie=J(I);if(v==="none")return{top:null,left:null,transformOrigin:us(ie)};const Ne=B();let Re=Ne.top-ie.vertical,xe=Ne.left-ie.horizontal;const Nt=Re+I.height,Pe=xe+I.width,ot=en(cr(p)),Ae=ot.innerHeight-b,at=ot.innerWidth-b;if(b!==null&&Re<b){const Te=Re-b;Re-=Te,ie.vertical+=Te}else if(b!==null&&Nt>Ae){const Te=Nt-Ae;Re-=Te,ie.vertical+=Te}if(process.env.NODE_ENV!=="production"&&I.height>Ae&&I.height&&Ae&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${I.height-Ae}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),b!==null&&xe<b){const Te=xe-b;xe-=Te,ie.horizontal+=Te}else if(Pe>at){const Te=Pe-at;xe-=Te,ie.horizontal+=Te}return{top:`${Math.round(Re)}px`,left:`${Math.round(xe)}px`,transformOrigin:us(ie)}},[p,v,B,J,b]),[R,M]=T.useState(x),U=T.useCallback(()=>{const te=$.current;if(!te)return;const I=Z(te);I.top!==null&&(te.style.top=I.top),I.left!==null&&(te.style.left=I.left),te.style.transformOrigin=I.transformOrigin,M(!0)},[Z]);T.useEffect(()=>(D&&window.addEventListener("scroll",U),()=>window.removeEventListener("scroll",U)),[p,D,U]);const K=(te,I)=>{_&&_(te,I),U()},G=()=>{M(!1)};T.useEffect(()=>{x&&U()}),T.useImperativeHandle(c,()=>x?{updatePosition:()=>{U()}}:null,[x,U]),T.useEffect(()=>{if(!x)return;const te=ti(()=>{U()}),I=en(p);return I.addEventListener("resize",te),()=>{te.clear(),I.removeEventListener("resize",te)}},[p,x,U]);let q=S;S==="auto"&&!C.muiSupportAuto&&(q=void 0);const X=h||(p?Oe(cr(p)).body:void 0),Y=(o=w==null?void 0:w.root)!=null?o:Uh,W=(a=w==null?void 0:w.paper)!=null?a:Ji,Q=Bt({elementType:W,externalSlotProps:P({},O,{style:R?O.style:P({},O.style,{opacity:0})}),additionalProps:{elevation:u,ref:z},ownerState:H,className:Ce(A.paper,O==null?void 0:O.className)}),ee=Bt({elementType:Y,externalSlotProps:(k==null?void 0:k.root)||{},externalForwardedProps:E,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:X,open:x},ownerState:H,className:Ce(A.root,d)}),{slotProps:se}=ee,L=me(ee,zh);return l.jsx(Y,P({},L,!wi(Y)&&{slotProps:se,disableScrollLock:D},{children:l.jsx(C,P({appear:!0,in:x,onEntering:K,onExited:G,timeout:q},V,{children:l.jsx(W,P({},Q,{children:g}))}))}))});process.env.NODE_ENV!=="production"&&(Zi.propTypes={action:Po,anchorEl:ln(i.oneOfType([pt,i.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=cr(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),anchorPosition:i.shape({left:i.number.isRequired,top:i.number.isRequired}),anchorReference:i.oneOf(["anchorEl","anchorPosition","none"]),children:i.node,classes:i.object,className:i.string,container:i.oneOfType([pt,i.func]),disableScrollLock:i.bool,elevation:li,marginThreshold:i.number,onClose:i.func,open:i.bool.isRequired,PaperProps:i.shape({component:xp}),slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transformOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object});const Gh=Zi;function qh(e){return rt("MuiMenu",e)}xt("MuiMenu",["root","paper","list"]);const Wh=["onEntering"],Xh=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Yh={vertical:"top",horizontal:"right"},Kh={vertical:"top",horizontal:"left"},Jh=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"],list:["list"]},qh,t)},Zh=je(Gh,{shouldForwardProp:e=>bi(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Qh=je(Ji,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),eg=je(yh,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Qi=T.forwardRef(function(t,n){var r,o;const a=mt({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:c,className:p,disableAutoFocusItem:f=!1,MenuListProps:m={},onClose:v,open:g,PaperProps:d={},PopoverClasses:h,transitionDuration:u="auto",TransitionProps:{onEntering:b}={},variant:x="selectedMenu",slots:j={},slotProps:w={}}=a,k=me(a.TransitionProps,Wh),y=me(a,Xh),C=Jn(),S=C.direction==="rtl",_=P({},a,{autoFocus:s,disableAutoFocusItem:f,MenuListProps:m,onEntering:b,PaperProps:d,transitionDuration:u,TransitionProps:k,variant:x}),D=Jh(_),V=s&&!f&&g,E=T.useRef(null),O=(Z,R)=>{E.current&&E.current.adjustStyleForScrollbar(Z,C),b&&b(Z,R)},$=Z=>{Z.key==="Tab"&&(Z.preventDefault(),v&&v(Z,"tabKeyDown"))};let z=-1;T.Children.map(c,(Z,R)=>{T.isValidElement(Z)&&(process.env.NODE_ENV!=="production"&&dr.isFragment(Z)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Z.props.disabled||(x==="selectedMenu"&&Z.props.selected||z===-1)&&(z=R))});const H=(r=j.paper)!=null?r:Qh,A=(o=w.paper)!=null?o:d,B=Bt({elementType:j.root,externalSlotProps:w.root,ownerState:_,className:[D.root,p]}),J=Bt({elementType:H,externalSlotProps:A,ownerState:_,className:D.paper});return l.jsx(Zh,P({onClose:v,anchorOrigin:{vertical:"bottom",horizontal:S?"right":"left"},transformOrigin:S?Yh:Kh,slots:{paper:H,root:j.root},slotProps:{root:B,paper:J},open:g,ref:n,transitionDuration:u,TransitionProps:P({onEntering:O},k),ownerState:_},y,{classes:h,children:l.jsx(eg,P({onKeyDown:$,actions:E,autoFocus:s&&(z===-1||f),autoFocusItem:V,variant:x},m,{className:Ce(D.list,m.className),children:c}))}))});process.env.NODE_ENV!=="production"&&(Qi.propTypes={anchorEl:i.oneOfType([pt,i.func]),autoFocus:i.bool,children:i.node,classes:i.object,className:i.string,disableAutoFocusItem:i.bool,MenuListProps:i.object,onClose:i.func,open:i.bool.isRequired,PaperProps:i.object,PopoverClasses:i.object,slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object,variant:i.oneOf(["menu","selectedMenu"])});const tg=Qi;function ng({className:e,commandHandler:t,menuDefinition:n,children:r}){var f;const[o,a]=N.useState(void 0),s=N.useCallback(m=>{m.preventDefault(),a(o===void 0?{mouseX:m.clientX+2,mouseY:m.clientY-6}:void 0)},[o]),c=N.useCallback(()=>{a(void 0)},[]),p=N.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((f=n==null?void 0:n.items)==null?void 0:f.length)??0)===0||!r?r:l.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[r,l.jsx(tg,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:c,anchorReference:"anchorPosition",anchorPosition:p,children:l.jsx(Ko,{menuDefinition:n,commandHandler:t,onClick:c})})]})}function rg(e){return{preserveValue:!0,...e}}const yr=(e,t,n={})=>{const r=N.useRef(t);r.current=t;const o=N.useRef(n);o.current=rg(o.current);const[a,s]=N.useState(()=>r.current),[c,p]=N.useState(!0);return N.useEffect(()=>{let f=!0;return p(!!e),(async()=>{if(e){const m=await e();f&&(s(()=>m),p(!1))}})(),()=>{f=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[a,c]},og=vi(l.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function el({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:a,ariaLabelPrefix:s,children:c}){const[p,f]=N.useState(!1),[m,v]=N.useState(!1),g=N.useCallback(()=>{p&&f(!1),v(!1)},[p]),d=N.useCallback(k=>{k.stopPropagation(),f(y=>{const C=!y;return C&&k.shiftKey?v(!0):C||v(!1),C})},[]),h=N.useCallback(k=>(g(),r(k)),[r,g]),[u,b]=N.useState({top:1,left:1});N.useEffect(()=>{if(p){const k=o==null?void 0:o.current;if(k){const y=k.getBoundingClientRect(),C=window.scrollY,S=window.scrollX,_=y.top+C+k.clientHeight,D=y.left+S;b({top:_,left:D})}}},[p,o]);const[x]=yr(N.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,p]),t),[j]=yr(N.useCallback(async()=>(e==null?void 0:e(!0))??n??x,[e,n,x,p]),n??x),w=m&&j?j:x;return l.jsxs(l.Fragment,{children:[l.jsx(Ee.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:d,children:c??l.jsx(og,{})}),l.jsx(Ee.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:p,onClose:g,PaperProps:{className:"papi-menu-drawer-paper",style:{top:u.top,left:u.left}},children:w?l.jsx(zi,{className:a,id:`${s??""} main menu`,commandHandler:h,multiColumnMenu:w}):void 0})]})}function ag({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:s="medium",className:c,onClick:p,children:f}){return l.jsx(Ee.IconButton,{id:e,disabled:n,edge:a,size:s,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${c??""}`,onClick:p,children:f})}const yt="scrBook",sg="scrRef",jt="source",ig="details",lg="Scripture Reference",cg="Scripture Book",tl="Type",pg="Details";function dg(e,t){const n=t??!1;return[{accessorFn:r=>`${fe.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:yt,header:(e==null?void 0:e.scriptureReferenceColumnName)??lg,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?fe.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===yt?Je.formatScrRef(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>Je.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>Je.formatScrRef(r.start),id:sg,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:Je.formatScrRef(o.start)},sortingFn:(r,o)=>Je.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:jt,header:n?(e==null?void 0:e.typeColumnName)??tl:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:ig,header:(e==null?void 0:e.detailsColumnName)??pg,cell:r=>r.getValue(),enableGrouping:!1}]}function ug({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:a,detailsColumnName:s,onRowSelected:c}){const[p,f]=N.useState([]),[m,v]=N.useState([{id:yt,desc:!1}]),[g,d]=N.useState(()=>e.flatMap(E=>{const O=E.source;return E.data.map($=>({...$,source:O}))})),[h,u]=N.useState({});N.useEffect(()=>{d(()=>e.flatMap(E=>{const O=E.source;return E.data.map($=>({...$,source:O}))}))},[e]);const b=N.useMemo(()=>dg({scriptureReferenceColumnName:r,typeColumnName:a,detailsColumnName:s},n),[r,a,s,n]);N.useEffect(()=>{p.includes(jt)?v([{id:jt,desc:!1},{id:yt,desc:!1}]):v([{id:yt,desc:!1}])},[p]);const x=N.useCallback((E,O)=>!O||Je.compareScrRefs(E,O)===0?`${Je.scrRefToBBBCCCVVV(E)}`:`${Je.scrRefToBBBCCCVVV(E)}-${Je.scrRefToBBBCCCVVV(O)}`,[]),j=N.useCallback(E=>`${x(E.start,E.end)} ${E.source} ${E.detail}`,[x]),w=Se.useReactTable({data:g,columns:b,state:{grouping:p,sorting:m,rowSelection:h},onGroupingChange:f,onSortingChange:v,onRowSelectionChange:u,getExpandedRowModel:Se.getExpandedRowModel(),getGroupedRowModel:Se.getGroupedRowModel(),getCoreRowModel:Se.getCoreRowModel(),getSortedRowModel:Se.getSortedRowModel(),getRowId:j,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});N.useEffect(()=>{if(c){const E=w.getSelectedRowModel().rowsById,O=Object.keys(E);if(O.length===1){const $=g.find(z=>j(z)===O[0])||void 0;$&&c($)}}},[h,g,j,c,w]);const k=o??cg,y=a??tl,C=[{label:"No Grouping",value:[]},{label:`Group by ${k}`,value:[yt]},{label:`Group by ${y}`,value:[jt]},{label:`Group by ${k} and ${y}`,value:[yt,jt]},{label:`Group by ${y} and ${k}`,value:[jt,yt]}],S=E=>{f(JSON.parse(E))},_=(E,O)=>{!E.getIsGrouped()&&!E.getIsSelected()&&E.getToggleSelectedHandler()(O)},D=(E,O)=>E.getIsGrouped()?"":F("banded-row",O%2===0?"even":"odd"),V=(E,O,$)=>{if(!((E==null?void 0:E.length)===0||O.depth<$.column.getGroupedIndex())){if(O.getIsGrouped())switch(O.depth){case 1:return"pr-ps-4";default:return}switch(O.depth){case 1:return"pr-ps-8";case 2:return"pr-ps-12";default:return}}};return l.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-w-full pr-flex-col",children:[!t&&l.jsxs($n,{value:JSON.stringify(p),onValueChange:E=>{S(E)},children:[l.jsx(Kt,{className:"pr-mb-1 pr-mt-2",children:l.jsx(_n,{})}),l.jsx(Jt,{position:"item-aligned",children:l.jsx(_s,{children:C.map(E=>l.jsx(Ye,{value:JSON.stringify(E.value),children:E.label},E.label))})})]}),l.jsxs(zn,{className:"pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0",children:[t&&l.jsx(Hn,{children:w.getHeaderGroups().map(E=>l.jsx(lt,{children:E.headers.filter(O=>O.column.columnDef.header).map(O=>l.jsx(Zt,{colSpan:O.colSpan,className:"top-0 pr-sticky",children:O.isPlaceholder?void 0:l.jsxs("div",{children:[O.column.getCanGroup()?l.jsx(be,{variant:"ghost",title:`Toggle grouping by ${O.column.columnDef.header}`,onClick:O.column.getToggleGroupingHandler(),type:"button",children:O.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Se.flexRender(O.column.columnDef.header,O.getContext())]})},O.id))},E.id))}),l.jsx(Un,{children:w.getRowModel().rows.map((E,O)=>l.jsx(lt,{"data-state":E.getIsSelected()?"selected":"",className:F(D(E,O)),onClick:$=>_(E,$),children:E.getVisibleCells().map($=>{if(!($.getIsPlaceholder()||$.column.columnDef.enableGrouping&&!$.getIsGrouped()&&($.column.columnDef.id!==jt||!n)))return l.jsx(It,{className:F($.column.columnDef.id,"pr-p-[1px]",V(p,E,$)),children:(()=>$.getIsGrouped()?l.jsxs(be,{variant:"ghost",onClick:E.getToggleExpandedHandler(),type:"button",children:[E.getIsExpanded()?"👇":"👉"," ",Se.flexRender($.column.columnDef.cell,$.getContext())," (",E.subRows.length,")"]}):Se.flexRender($.column.columnDef.cell,$.getContext()))()},$.id)})},E.id))})]})]})}const fg=wo.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),Jo=N.forwardRef(({className:e,...t},n)=>l.jsx(xs.Root,{ref:n,className:F(fg(),e),...t}));Jo.displayName=xs.Root.displayName;function nl({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:a,placeholder:s,isRequired:c=!1,className:p,defaultValue:f,value:m,onChange:v,onFocus:g,onBlur:d}){return l.jsxs("div",{className:F("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":r}),children:[l.jsx(Jo,{htmlFor:e,className:F({"pr-text-red-600":n,"pr-hidden":!a}),children:`${a}${c?"*":""}`}),l.jsx(Ln,{id:e,disabled:t,placeholder:s,required:c,className:F(p,{"pr-border-red-600":n}),defaultValue:f,value:m,onChange:v,onFocus:g,onBlur:d}),l.jsx("p",{className:F({"pr-hidden":!o}),children:o})]})}function mg({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=N.useState(""),a=s=>{o(s),e(s)};return l.jsx(nl,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:s=>a(s.target.value)})}function hg({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:a=1,showMarks:s=!1,defaultValue:c,value:p,valueLabelDisplay:f="off",className:m,onChange:v,onChangeCommitted:g}){return l.jsx(Ee.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:a,marks:s,defaultValue:c,value:p,valueLabelDisplay:f,className:`papi-slider ${n} ${m??""}`,onChange:v,onChangeCommitted:g})}function gg({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:s,children:c}){const p={action:(s==null?void 0:s.action)||c,message:s==null?void 0:s.message,className:r};return l.jsx(Ee.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:a,id:t,ContentProps:p})}function bg({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:a}){return l.jsx(Ee.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:a})}function vg({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const a=N.useRef(void 0);return l.jsx("div",{ref:a,style:{position:"relative"},children:l.jsx(Ee.AppBar,{position:"static",id:r,children:l.jsxs(Ee.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?l.jsx(el,{commandHandler:t,containerRef:a,menuProvider:e}):void 0,o?l.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const yg=De.Root,rl=N.forwardRef(({className:e,...t},n)=>l.jsx(De.List,{ref:n,className:F("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));rl.displayName=De.List.displayName;const ol=N.forwardRef(({className:e,...t},n)=>l.jsx(De.Trigger,{ref:n,className:F("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));ol.displayName=De.Trigger.displayName;const al=N.forwardRef(({className:e,...t},n)=>l.jsx(De.Content,{ref:n,className:F("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));al.displayName=De.Content.displayName;const sl=N.forwardRef(({className:e,...t},n)=>l.jsx(De.Root,{orientation:"vertical",ref:n,className:F("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));sl.displayName=De.List.displayName;const il=N.forwardRef(({className:e,...t},n)=>l.jsx(De.List,{ref:n,className:F("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));il.displayName=De.List.displayName;const wg=N.forwardRef(({className:e,...t},n)=>l.jsx(De.Trigger,{ref:n,...t,className:F("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),ll=N.forwardRef(({className:e,...t},n)=>l.jsx(De.Content,{ref:n,className:F("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));ll.displayName=De.Content.displayName;function xg({isInstalling:e,handleClick:t,buttonText:n}){return l.jsx(be,{className:F("pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e,"pr-bg-blue-600":!e,"pr-bg-white pr-text-blue-600 hover:pr-text-white":!n,"pr-w-20":n}),onClick:t,children:e?l.jsx(re.LoaderCircle,{size:15,className:"pr-animate-spin"}):l.jsxs(l.Fragment,{children:[l.jsx(re.Download,{size:25,className:F("pr-h-4 pr-w-4",{"pr-mr-1":n})}),n]})})}function kg({isEnabling:e,handleClick:t}){return l.jsx(be,{className:F("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e}),onClick:t,children:e?l.jsxs(l.Fragment,{children:[l.jsx(re.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-white"}),"Enabling..."]}):"Enable"})}function Eg({isDisabling:e,handleClick:t}){return l.jsx(be,{className:F("pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-gray-400",{"pr-cursor-not-allowed pr-bg-gray-400":e}),onClick:t,children:e?l.jsxs(l.Fragment,{children:[l.jsx(re.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-black"}),"Disabling..."]}):"Disable"})}function Ng({isUpdating:e,handleClick:t}){return l.jsx(be,{className:F("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700 hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e}),onClick:t,children:e?l.jsxs(l.Fragment,{children:[l.jsx(re.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-white"}),"Updating..."]}):"Update"})}function $t(){return $t=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},$t.apply(this,arguments)}const Tg=["children","options"],fs=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,t)=>(e[t.toLowerCase()]=t,e),{for:"htmlFor"}),ms={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},Cg=["style","script"],Sg=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,Og=/mailto:/i,jg=/\n{2,}$/,cl=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,Rg=/^ *> ?/gm,Pg=/^ {2,}\n/,$g=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,pl=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,dl=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,_g=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,Mg=/^(?:\n *)*\n/,Ig=/\r\n?/g,Dg=/^\[\^([^\]]+)](:.*)\n/,Ag=/^\[\^([^\]]+)]/,Bg=/\f/g,Lg=/^\s*?\[(x|\s)\]/,ul=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,fl=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,ml=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,vo=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,Vg=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,hl=/^<!--[\s\S]*?(?:-->)/,Fg=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,yo=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,zg=/^\{.*\}$/,Hg=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,Ug=/^<([^ >]+@[^ >]+)>/,Gg=/^<([^ >]+:\/[^ >]+)>/,qg=/-([a-z])?/gi,gl=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,Wg=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,Xg=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,Yg=/^\[([^\]]*)\] ?\[([^\]]*)\]/,Kg=/(\[|\])/g,Jg=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,Zg=/\t/g,Qg=/^ *\| */,eb=/(^ *\||\| *$)/g,tb=/ *$/,nb=/^ *:-+: *$/,rb=/^ *:-+ *$/,ob=/^ *-+: *$/,ab=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,sb=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,ib=/^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,lb=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,cb=/^\\([^0-9A-Za-z\s])/,pb=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,db=/^\n+/,ub=/^([ \t]*)/,fb=/\\([^\\])/g,hs=/ *\n+$/,mb=/(?:^|\n)( *)$/,Zo="(?:\\d+\\.)",Qo="(?:[*+-])";function bl(e){return"( *)("+(e===1?Zo:Qo)+") +"}const vl=bl(1),yl=bl(2);function wl(e){return new RegExp("^"+(e===1?vl:yl))}const hb=wl(1),gb=wl(2);function xl(e){return new RegExp("^"+(e===1?vl:yl)+"[^\\n]*(?:\\n(?!\\1"+(e===1?Zo:Qo)+" )[^\\n]*)*(\\n|$)","gm")}const kl=xl(1),El=xl(2);function Nl(e){const t=e===1?Zo:Qo;return new RegExp("^( *)("+t+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+t+" (?!"+t+" ))\\n*|\\s*\\n*$)")}const Tl=Nl(1),Cl=Nl(2);function gs(e,t){const n=t===1,r=n?Tl:Cl,o=n?kl:El,a=n?hb:gb;return{t(s,c,p){const f=mb.exec(p);return f&&(c.o||!c._&&!c.u)?r.exec(s=f[1]+s):null},i:ae.HIGH,l(s,c,p){const f=n?+s[2]:void 0,m=s[0].replace(jg,`
`).match(o);let v=!1;return{p:m.map(function(g,d){const h=a.exec(g)[0].length,u=new RegExp("^ {1,"+h+"}","gm"),b=g.replace(u,"").replace(a,""),x=d===m.length-1,j=b.indexOf(`

`)!==-1||x&&v;v=j;const w=p._,k=p.o;let y;p.o=!0,j?(p._=!1,y=b.replace(hs,`

`)):(p._=!0,y=b.replace(hs,""));const C=c(y,p);return p._=w,p.o=k,C}),m:n,g:f}},h:(s,c,p)=>e(s.m?"ol":"ul",{key:p.k,start:s.g},s.p.map(function(f,m){return e("li",{key:m},c(f,p))}))}}const bb=/^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,vb=/^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Sl=[cl,pl,dl,ul,ml,fl,hl,gl,kl,Tl,El,Cl],yb=[...Sl,/^[^\n]+(?:  \n|\n{2,})/,vo,yo];function wb(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function xb(e){return ob.test(e)?"right":nb.test(e)?"center":rb.test(e)?"left":null}function bs(e,t,n){const r=n.$;n.$=!0;const o=t(e.trim(),n);n.$=r;let a=[[]];return o.forEach(function(s,c){s.type==="tableSeparator"?c!==0&&c!==o.length-1&&a.push([]):(s.type!=="text"||o[c+1]!=null&&o[c+1].type!=="tableSeparator"||(s.v=s.v.replace(tb,"")),a[a.length-1].push(s))}),a}function kb(e,t,n){n._=!0;const r=bs(e[1],t,n),o=e[2].replace(eb,"").split("|").map(xb),a=function(s,c,p){return s.trim().split(`
`).map(function(f){return bs(f,c,p)})}(e[3],t,n);return n._=!1,{S:o,A:a,L:r,type:"table"}}function vs(e,t){return e.S[t]==null?{}:{textAlign:e.S[t]}}function bt(e){return function(t,n){return n._?e.exec(t):null}}function vt(e){return function(t,n){return n._||n.u?e.exec(t):null}}function it(e){return function(t,n){return n._||n.u?null:e.exec(t)}}function wn(e){return function(t){return e.exec(t)}}function Eb(e,t,n){if(t._||t.u||n&&!n.endsWith(`
`))return null;let r="";e.split(`
`).every(a=>!Sl.some(s=>s.test(a))&&(r+=a+`
`,a.trim()));const o=r.trimEnd();return o==""?null:[r,o]}function Wt(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch{return null}return e}function ys(e){return e.replace(fb,"$1")}function pr(e,t,n){const r=n._||!1,o=n.u||!1;n._=!0,n.u=!0;const a=e(t,n);return n._=r,n.u=o,a}function Nb(e,t,n){const r=n._||!1,o=n.u||!1;n._=!1,n.u=!0;const a=e(t,n);return n._=r,n.u=o,a}function Tb(e,t,n){return n._=!1,e(t,n)}const Zr=(e,t,n)=>({v:pr(t,e[1],n)});function Qr(){return{}}function eo(){return null}function Cb(...e){return e.filter(Boolean).join(" ")}function to(e,t,n){let r=e;const o=t.split(".");for(;o.length&&(r=r[o[0]],r!==void 0);)o.shift();return r||n}var ae;function Sb(e,t={}){t.overrides=t.overrides||{},t.slugify=t.slugify||wb,t.namedCodesToUnicode=t.namedCodesToUnicode?$t({},ms,t.namedCodesToUnicode):ms;const n=t.createElement||T.createElement;function r(d,h,...u){const b=to(t.overrides,`${d}.props`,{});return n(function(x,j){const w=to(j,x);return w?typeof w=="function"||typeof w=="object"&&"render"in w?w:to(j,`${x}.component`,x):x}(d,t.overrides),$t({},h,b,{className:Cb(h==null?void 0:h.className,b.className)||void 0}),...u)}function o(d){let h=!1;t.forceInline?h=!0:t.forceBlock||(h=Jg.test(d)===!1);const u=m(f(h?d:`${d.trimEnd().replace(db,"")}

`,{_:h}));for(;typeof u[u.length-1]=="string"&&!u[u.length-1].trim();)u.pop();if(t.wrapper===null)return u;const b=t.wrapper||(h?"span":"div");let x;if(u.length>1||t.forceWrapper)x=u;else{if(u.length===1)return x=u[0],typeof x=="string"?r("span",{key:"outer"},x):x;x=null}return T.createElement(b,{key:"outer"},x)}function a(d){const h=d.match(Sg);return h?h.reduce(function(u,b,x){const j=b.indexOf("=");if(j!==-1){const w=function(S){return S.indexOf("-")!==-1&&S.match(Fg)===null&&(S=S.replace(qg,function(_,D){return D.toUpperCase()})),S}(b.slice(0,j)).trim(),k=function(S){const _=S[0];return(_==='"'||_==="'")&&S.length>=2&&S[S.length-1]===_?S.slice(1,-1):S}(b.slice(j+1).trim()),y=fs[w]||w,C=u[y]=function(S,_){return S==="style"?_.split(/;\s?/).reduce(function(D,V){const E=V.slice(0,V.indexOf(":"));return D[E.replace(/(-[a-z])/g,O=>O[1].toUpperCase())]=V.slice(E.length+1).trim(),D},{}):S==="href"?Wt(_):(_.match(zg)&&(_=_.slice(1,_.length-1)),_==="true"||_!=="false"&&_)}(w,k);typeof C=="string"&&(vo.test(C)||yo.test(C))&&(u[y]=T.cloneElement(o(C.trim()),{key:x}))}else b!=="style"&&(u[fs[b]||b]=!0);return u},{}):null}const s=[],c={},p={blockQuote:{t:it(cl),i:ae.HIGH,l:(d,h,u)=>({v:h(d[0].replace(Rg,""),u)}),h:(d,h,u)=>r("blockquote",{key:u.k},h(d.v,u))},breakLine:{t:wn(Pg),i:ae.HIGH,l:Qr,h:(d,h,u)=>r("br",{key:u.k})},breakThematic:{t:it($g),i:ae.HIGH,l:Qr,h:(d,h,u)=>r("hr",{key:u.k})},codeBlock:{t:it(dl),i:ae.MAX,l:d=>({v:d[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),M:void 0}),h:(d,h,u)=>r("pre",{key:u.k},r("code",$t({},d.O,{className:d.M?`lang-${d.M}`:""}),d.v))},codeFenced:{t:it(pl),i:ae.MAX,l:d=>({O:a(d[3]||""),v:d[4],M:d[2]||void 0,type:"codeBlock"})},codeInline:{t:vt(_g),i:ae.LOW,l:d=>({v:d[2]}),h:(d,h,u)=>r("code",{key:u.k},d.v)},footnote:{t:it(Dg),i:ae.MAX,l:d=>(s.push({I:d[2],j:d[1]}),{}),h:eo},footnoteReference:{t:bt(Ag),i:ae.HIGH,l:d=>({v:d[1],B:`#${t.slugify(d[1])}`}),h:(d,h,u)=>r("a",{key:u.k,href:Wt(d.B)},r("sup",{key:u.k},d.v))},gfmTask:{t:bt(Lg),i:ae.HIGH,l:d=>({R:d[1].toLowerCase()==="x"}),h:(d,h,u)=>r("input",{checked:d.R,key:u.k,readOnly:!0,type:"checkbox"})},heading:{t:it(t.enforceAtxHeadings?fl:ul),i:ae.HIGH,l:(d,h,u)=>({v:pr(h,d[2],u),T:t.slugify(d[2]),C:d[1].length}),h:(d,h,u)=>r(`h${d.C}`,{id:d.T,key:u.k},h(d.v,u))},headingSetext:{t:it(ml),i:ae.MAX,l:(d,h,u)=>({v:pr(h,d[1],u),C:d[2]==="="?1:2,type:"heading"})},htmlComment:{t:wn(hl),i:ae.HIGH,l:()=>({}),h:eo},image:{t:vt(vb),i:ae.HIGH,l:d=>({D:d[1],B:ys(d[2]),F:d[3]}),h:(d,h,u)=>r("img",{key:u.k,alt:d.D||void 0,title:d.F||void 0,src:Wt(d.B)})},link:{t:bt(bb),i:ae.LOW,l:(d,h,u)=>({v:Nb(h,d[1],u),B:ys(d[2]),F:d[3]}),h:(d,h,u)=>r("a",{key:u.k,href:Wt(d.B),title:d.F},h(d.v,u))},linkAngleBraceStyleDetector:{t:bt(Gg),i:ae.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],type:"link"})},linkBareUrlDetector:{t:(d,h)=>h.N?null:bt(Hg)(d,h),i:ae.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],F:void 0,type:"link"})},linkMailtoDetector:{t:bt(Ug),i:ae.MAX,l(d){let h=d[1],u=d[1];return Og.test(u)||(u="mailto:"+u),{v:[{v:h.replace("mailto:",""),type:"text"}],B:u,type:"link"}}},orderedList:gs(r,1),unorderedList:gs(r,2),newlineCoalescer:{t:it(Mg),i:ae.LOW,l:Qr,h:()=>`
`},paragraph:{t:Eb,i:ae.LOW,l:Zr,h:(d,h,u)=>r("p",{key:u.k},h(d.v,u))},ref:{t:bt(Wg),i:ae.MAX,l:d=>(c[d[1]]={B:d[2],F:d[4]},{}),h:eo},refImage:{t:vt(Xg),i:ae.MAX,l:d=>({D:d[1]||void 0,P:d[2]}),h:(d,h,u)=>r("img",{key:u.k,alt:d.D,src:Wt(c[d.P].B),title:c[d.P].F})},refLink:{t:bt(Yg),i:ae.MAX,l:(d,h,u)=>({v:h(d[1],u),Z:h(d[0].replace(Kg,"\\$1"),u),P:d[2]}),h:(d,h,u)=>c[d.P]?r("a",{key:u.k,href:Wt(c[d.P].B),title:c[d.P].F},h(d.v,u)):r("span",{key:u.k},h(d.Z,u))},table:{t:it(gl),i:ae.HIGH,l:kb,h:(d,h,u)=>r("table",{key:u.k},r("thead",null,r("tr",null,d.L.map(function(b,x){return r("th",{key:x,style:vs(d,x)},h(b,u))}))),r("tbody",null,d.A.map(function(b,x){return r("tr",{key:x},b.map(function(j,w){return r("td",{key:w,style:vs(d,w)},h(j,u))}))})))},tableSeparator:{t:function(d,h){return h.$?(h._=!0,Qg.exec(d)):null},i:ae.HIGH,l:function(){return{type:"tableSeparator"}},h:()=>" | "},text:{t:wn(pb),i:ae.MIN,l:d=>({v:d[0].replace(Vg,(h,u)=>t.namedCodesToUnicode[u]?t.namedCodesToUnicode[u]:h)}),h:d=>d.v},textBolded:{t:vt(ab),i:ae.MED,l:(d,h,u)=>({v:h(d[2],u)}),h:(d,h,u)=>r("strong",{key:u.k},h(d.v,u))},textEmphasized:{t:vt(sb),i:ae.LOW,l:(d,h,u)=>({v:h(d[2],u)}),h:(d,h,u)=>r("em",{key:u.k},h(d.v,u))},textEscaped:{t:vt(cb),i:ae.HIGH,l:d=>({v:d[1],type:"text"})},textMarked:{t:vt(ib),i:ae.LOW,l:Zr,h:(d,h,u)=>r("mark",{key:u.k},h(d.v,u))},textStrikethroughed:{t:vt(lb),i:ae.LOW,l:Zr,h:(d,h,u)=>r("del",{key:u.k},h(d.v,u))}};t.disableParsingRawHTML!==!0&&(p.htmlBlock={t:wn(vo),i:ae.HIGH,l(d,h,u){const[,b]=d[3].match(ub),x=new RegExp(`^${b}`,"gm"),j=d[3].replace(x,""),w=(k=j,yb.some(_=>_.test(k))?Tb:pr);var k;const y=d[1].toLowerCase(),C=Cg.indexOf(y)!==-1;u.N=u.N||y==="a";const S=C?d[3]:w(h,j,u);return u.N=!1,{O:a(d[2]),v:S,G:C,H:C?y:d[1]}},h:(d,h,u)=>r(d.H,$t({key:u.k},d.O),d.G?d.v:h(d.v,u))},p.htmlSelfClosing={t:wn(yo),i:ae.HIGH,l:d=>({O:a(d[2]||""),H:d[1]}),h:(d,h,u)=>r(d.H,$t({},d.O,{key:u.k}))});const f=function(d){let h=Object.keys(d);function u(b,x){let j=[],w="";for(;b;){let k=0;for(;k<h.length;){const y=h[k],C=d[y],S=C.t(b,x,w);if(S){const _=S[0];b=b.substring(_.length);const D=C.l(S,u,x);D.type==null&&(D.type=y),j.push(D),w=_;break}k++}}return j}return h.sort(function(b,x){let j=d[b].i,w=d[x].i;return j!==w?j-w:b<x?-1:1}),function(b,x){return u(function(j){return j.replace(Ig,`
`).replace(Bg,"").replace(Zg,"    ")}(b),x)}}(p),m=(v=function(d){return function(h,u,b){return d[h.type].h(h,u,b)}}(p),function d(h,u={}){if(Array.isArray(h)){const b=u.k,x=[];let j=!1;for(let w=0;w<h.length;w++){u.k=w;const k=d(h[w],u),y=typeof k=="string";y&&j?x[x.length-1]+=k:k!==null&&x.push(k),j=y}return u.k=b,x}return v(h,d,u)});var v;const g=o(e);return s.length?r("div",null,g,r("footer",{key:"footer"},s.map(function(d){return r("div",{id:t.slugify(d.j),key:d.j},d.j,m(f(d.I,{_:!0})))}))):g}(function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"})(ae||(ae={}));const Ob=e=>{let{children:t,options:n}=e,r=function(o,a){if(o==null)return{};var s,c,p={},f=Object.keys(o);for(c=0;c<f.length;c++)a.indexOf(s=f[c])>=0||(p[s]=o[s]);return p}(e,Tg);return T.cloneElement(Sb(t,n),r)};function jb({id:e,markdown:t}){return l.jsx("div",{id:e,className:"pr-prose",children:l.jsx(Ob,{children:t})})}const Ol=N.forwardRef((e,t)=>l.jsxs(be,{ref:t,className:"pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600",...e,children:[l.jsx(re.Filter,{size:16,className:"pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"}),"Filter",l.jsx(re.ChevronDown,{size:16,className:"pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"})]}));var jl=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(jl||{});function Rb({groups:e}){return l.jsxs(wr,{children:[l.jsx(No,{asChild:!0,children:l.jsx(Ol,{})}),l.jsx(Vn,{children:e.map(t=>l.jsxs("div",{children:[l.jsx(sn,{children:t.label}),l.jsx(Os,{children:t.items.map(n=>l.jsx("div",{children:n.itemType===0?l.jsx(xr,{onClick:n.onClick,children:n.label}):l.jsx(Co,{onClick:n.onClick,value:n.label,children:n.label})},n.label))}),l.jsx(Fn,{})]},t.label))})]})}function Pb({id:e,message:t}){return l.jsx("div",{id:e,className:"pr-mb-20 pr-mt-20 pr-flex pr-items-center pr-justify-center",children:l.jsx("div",{className:"pr-w-3/4 pr-rounded-lg pr-bg-gray-100 pr-p-8 pr-text-center",children:l.jsx("p",{className:"pr-text-lg pr-text-gray-800",children:t})})})}function $b({id:e,category:t,downloads:n,languages:r,moreInfoUrl:o}){const a=()=>{window.scrollTo(0,document.body.scrollHeight)};return l.jsxs("div",{id:e,className:"pr-flex pr-flex-wrap pr-items-start pr-space-x-4 pr-border-b pr-border-t pr-bg-white pr-pb-4 pr-pt-4",children:[l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsx("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:l.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:t})}),l.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"CATEGORY"})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsxs("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:[l.jsx(re.User,{className:"pr-mr-1 pr-h-4 pr-w-4"}),l.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:Object.values(n).reduce((s,c)=>s+c,0)})]}),l.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"USERS"})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsx("div",{className:"pr-flex pr-items-center",children:r.slice(0,3).map(s=>l.jsx("span",{className:"pr-ml-1 pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1 pr-text-xs pr-font-semibold pr-text-gray-700",children:s.toUpperCase()},s))}),r.length>3&&l.jsxs("button",{type:"button",onClick:()=>a(),className:"pr-text-xs pr-text-gray-500 pr-underline",children:["+",r.length-3," more languages"]})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-ml-auto pr-flex pr-flex-col pr-space-y-2",children:[l.jsxs("a",{href:o,className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Website",l.jsx(re.Link,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]}),l.jsxs("a",{href:"https://placeholder.com",className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Support",l.jsx(re.CircleHelp,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]})]})]})}function Rl({id:e,versionHistory:t}){const[n,r]=N.useState(!1),o=new Date;function a(c){const p=new Date(c),f=new Date(o.getTime()-p.getTime()),m=f.getUTCFullYear()-1970,v=f.getUTCMonth(),g=f.getUTCDate()-1;let d="";return m>0?d=`${m.toString()} year${m===1?"":"s"} ago`:v>0?d=`${v.toString()} month${v===1?"":"s"} ago`:g===0?d="today":d=`${g.toString()} day${g===1?"":"s"} ago`,d}const s=Object.entries(t).sort((c,p)=>p[0].localeCompare(c[0]));return l.jsxs("div",{id:e,children:[l.jsx("h3",{className:"pr-text-md pr-font-semibold",children:"What`s New"}),l.jsx("ul",{className:"pr-list-disc pr-pl-5 pr-pr-4 pr-text-xs pr-text-gray-600",children:(n?s:s.slice(0,5)).map(c=>l.jsxs("div",{className:"pr-mt-3 pr-flex pr-justify-between",children:[l.jsx("div",{className:"pr-text-gray-600",children:l.jsx("li",{className:"pr-prose pr-text-xs",children:l.jsx("span",{children:c[1].description})})}),l.jsxs("div",{className:"pr-justify-end pr-text-right",children:[l.jsxs("div",{children:["Version ",c[0]]}),l.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),s.length>5&&l.jsx("button",{type:"button",onClick:()=>r(!n),className:"pr-text-xs pr-text-gray-500 pr-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function _b({id:e,publisherDisplayName:t,fileSize:n,locales:r,versionHistory:o}){const s=(c=>{const p=new Intl.DisplayNames(navigator.language,{type:"language"});return c.map(f=>p.of(f))})(r);return l.jsx("div",{id:e,className:"pr-border-t pr-pb-4 pr-pt-4",children:l.jsxs("div",{className:"pr-md:flex-row pr-md:space-x-8 pr-flex pr-flex-col pr-space-x-0",children:[l.jsx(Rl,{versionHistory:o}),l.jsx("div",{className:"pr-md:border-t-0 pr-md:border-l pr-md-h-auto pr-md-ml-8 pr-mt-4 pr-border-t pr-border-gray-300"}),l.jsxs("div",{className:"pr-md:mt-0 pr-mt-4 pr-flex-1 pr-space-y-3",children:[l.jsx("h2",{className:"pr-text-md pr-font-semibold",children:"Information"}),l.jsxs("div",{className:"pr-flex pr-items-start pr-justify-between pr-pr-4 pr-text-xs pr-text-gray-600",children:[l.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[l.jsx("span",{className:"pr-mb-2",children:"Publisher"}),l.jsx("span",{className:"pr-font-semibold",children:t}),l.jsx("span",{className:"pr-mb-2 pr-mt-4",children:"Size"}),l.jsxs("span",{className:"pr-font-semibold",children:[(n/1e6).toPrecision(3)," MB"]})]}),l.jsx("div",{className:"pr-flex pr-w-3/4 pr-items-center pr-justify-between pr-text-xs pr-text-gray-600",children:l.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[l.jsx("span",{className:"pr-mb-2",children:"Languages"}),l.jsx("span",{className:"pr-font-semibold",children:s.join(", ")})]})})]})]})]})})}const Mb=(e,t)=>{N.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},no=()=>!1,Ib=(e,t)=>{const[n]=yr(N.useCallback(async()=>{if(!e)return no;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),no,{preserveValue:!1});N.useEffect(()=>()=>{n!==no&&n()},[n])},Pl=N.forwardRef(({className:e,...t},n)=>l.jsx("div",{ref:n,className:F("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));Pl.displayName="Card";const $l=N.forwardRef(({className:e,...t},n)=>l.jsx("div",{ref:n,className:F("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));$l.displayName="CardHeader";const _l=N.forwardRef(({className:e,...t},n)=>l.jsx("h3",{ref:n,className:F("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));_l.displayName="CardTitle";const Ml=N.forwardRef(({className:e,...t},n)=>l.jsx("p",{ref:n,className:F("pr-text-sm pr-text-muted-foreground",e),...t}));Ml.displayName="CardDescription";const Il=N.forwardRef(({className:e,...t},n)=>l.jsx("div",{ref:n,className:F("pr-p-6 pr-pt-0",e),...t}));Il.displayName="CardContent";const Dl=N.forwardRef(({className:e,...t},n)=>l.jsx("div",{ref:n,className:F("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));Dl.displayName="CardFooter";const Db=wo.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),Al=N.forwardRef(({className:e,variant:t,...n},r)=>l.jsx("div",{ref:r,role:"alert",className:F(Db({variant:t}),e),...n}));Al.displayName="Alert";const Bl=N.forwardRef(({className:e,...t},n)=>l.jsxs("h5",{ref:n,className:F("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));Bl.displayName="AlertTitle";const Ll=N.forwardRef(({className:e,...t},n)=>l.jsx("div",{ref:n,className:F("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));Ll.displayName="AlertDescription";const Vl=N.forwardRef(({className:e,...t},n)=>l.jsxs(kn.Root,{ref:n,className:F("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[l.jsx(kn.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:l.jsx(kn.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),l.jsx(kn.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));Vl.displayName=kn.Root.displayName;const Fl=N.forwardRef(({className:e,...t},n)=>l.jsx(oo.Root,{className:F("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:n,children:l.jsx(oo.Thumb,{className:F("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));Fl.displayName=oo.Root.displayName;exports.Alert=Al;exports.AlertDescription=Ll;exports.AlertTitle=Bl;exports.BookChapterControl=Ac;exports.Button=be;exports.Card=Pl;exports.CardContent=Il;exports.CardDescription=Ml;exports.CardFooter=Dl;exports.CardHeader=$l;exports.CardTitle=_l;exports.ChapterRangeSelector=op;exports.Checkbox=qs;exports.Checklist=ap;exports.ComboBox=ao;exports.ContextMenu=ng;exports.DataTable=Bs;exports.DisableButton=Eg;exports.DropdownMenu=wr;exports.DropdownMenuCheckboxItem=xr;exports.DropdownMenuContent=Vn;exports.DropdownMenuGroup=Os;exports.DropdownMenuItem=To;exports.DropdownMenuItemType=jl;exports.DropdownMenuLabel=sn;exports.DropdownMenuPortal=Nc;exports.DropdownMenuRadioGroup=Cc;exports.DropdownMenuRadioItem=Co;exports.DropdownMenuSeparator=Fn;exports.DropdownMenuShortcut=Ps;exports.DropdownMenuSub=Tc;exports.DropdownMenuSubContent=Rs;exports.DropdownMenuSubTrigger=js;exports.DropdownMenuTrigger=No;exports.EnableButton=kg;exports.FilterButton=Ol;exports.FilterDropdown=Rb;exports.Footer=_b;exports.GridMenu=zi;exports.HamburgerMenuButton=el;exports.INVENTORY_STRING_KEYS=zc;exports.IconButton=ag;exports.Input=Ln;exports.InstallButton=xg;exports.Inventory=Gc;exports.Label=Jo;exports.LabelPosition=Rt;exports.MarkdownRenderer=jb;exports.MenuItem=Yo;exports.Message=Pb;exports.MoreInfo=$b;exports.ScriptureResultsViewer=ug;exports.SearchBar=mg;exports.Select=$n;exports.SelectContent=Jt;exports.SelectGroup=_s;exports.SelectItem=Ye;exports.SelectLabel=Ms;exports.SelectScrollDownButton=Oo;exports.SelectScrollUpButton=So;exports.SelectSeparator=Is;exports.SelectTrigger=Kt;exports.SelectValue=_n;exports.ShadCnSlider=Vl;exports.ShadCnSwitch=Fl;exports.Slider=hg;exports.Snackbar=gg;exports.Switch=bg;exports.Table=zn;exports.TableBody=Un;exports.TableCaption=As;exports.TableCell=It;exports.TableFooter=Ds;exports.TableHead=Zt;exports.TableHeader=Hn;exports.TableRow=lt;exports.Tabs=yg;exports.TabsContent=al;exports.TabsList=rl;exports.TabsTrigger=ol;exports.TextField=nl;exports.Toolbar=vg;exports.UpdateButton=Ng;exports.VersionHistory=Rl;exports.VerticalTabs=sl;exports.VerticalTabsContent=ll;exports.VerticalTabsList=il;exports.VerticalTabsTrigger=wg;exports.buttonVariants=$s;exports.getSortingIcon=kr;exports.inventoryCountColumn=Wc;exports.inventoryItemColumn=qc;exports.inventoryStatusColumn=Xc;exports.useEvent=Mb;exports.useEventAsync=Ib;exports.usePromise=yr;function Ab(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Ab(`/*
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
`,"top");
//# sourceMappingURL=index.cjs.map
