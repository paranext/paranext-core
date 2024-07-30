"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const p=require("react/jsx-runtime"),T=require("react"),ae=require("lucide-react"),Ce=require("clsx"),kc=require("tailwind-merge"),Rs=require("@radix-ui/react-dropdown-menu"),Ke=require("platform-bible-utils"),Ne=require("@tanstack/react-table"),ur=require("@radix-ui/react-slot"),To=require("class-variance-authority"),Sc=require("@radix-ui/react-select"),ke=require("@mui/material"),Tc=require("@radix-ui/react-popover"),Ie=require("cmdk"),Cc=require("@radix-ui/react-dialog"),ao=require("@mui/styled-engine"),kn=require("react-dom"),Nc=require("@radix-ui/react-tabs"),Rc=require("@radix-ui/react-separator"),Oc=require("@radix-ui/react-label"),Pc=require("@radix-ui/react-switch");function nt(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const k=nt(T),he=nt(Rs),we=nt(Sc),_n=nt(Tc),Qe=nt(Cc),jc=nt(kn),De=nt(Nc),Os=nt(Rc),Ps=nt(Oc),so=nt(Pc);const _c=kc.extendTailwindMerge({prefix:"pr-"});function z(...e){return _c(Ce.clsx(e))}const sn=T.forwardRef(({className:e,type:t,...n},r)=>p.jsx("input",{type:t,className:z("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));sn.displayName="Input";const Mc=T.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},a)=>p.jsxs("div",{className:"pr-relative",children:[p.jsx(sn,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r(),t(s)},onClick:n,ref:a}),p.jsx(ae.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));var $c=Object.defineProperty,Ic=(e,t,n)=>t in e?$c(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t,n)=>Ic(e,typeof t!="symbol"?t+"":t,n);const Mt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Co=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],js=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],ka=Gc();function ln(e,t=!0){return t&&(e=e.toUpperCase()),e in ka?ka[e]:0}function No(e){return ln(e)>0}function Dc(e){const t=typeof e=="string"?ln(e):e;return t>=40&&t<=66}function Ac(e){return(typeof e=="string"?ln(e):e)<=39}function _s(e){return e<=66}function Bc(e){const t=typeof e=="string"?ln(e):e;return Is(t)&&!_s(t)}function*Lc(){for(let e=1;e<=Mt.length;e++)yield e}const Vc=1,Ms=Mt.length;function Fc(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Ro(e,t="***"){const n=e-1;return n<0||n>=Mt.length?t:Mt[n]}function $s(e){return e<=0||e>Ms?"******":js[e-1]}function zc(e){return $s(ln(e))}function Is(e){const t=typeof e=="number"?Ro(e):e;return No(t)&&!Co.includes(t)}function Hc(e){const t=typeof e=="number"?Ro(e):e;return No(t)&&Co.includes(t)}function Uc(e){return js[e-1].includes("*obsolete*")}function Gc(){const e={};for(let t=0;t<Mt.length;t++)e[Mt[t]]=t+1;return e}const fe={allBookIds:Mt,nonCanonicalIds:Co,bookIdToNumber:ln,isBookIdValid:No,isBookNT:Dc,isBookOT:Ac,isBookOTNT:_s,isBookDC:Bc,allBookNumbers:Lc,firstBook:Vc,lastBook:Ms,extraBooks:Fc,bookNumberToId:Ro,bookNumberToEnglishName:$s,bookIdToEnglishName:zc,isCanonical:Is,isExtraMaterial:Hc,isObsolete:Uc};var Je=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Je||{});const Le=class{constructor(t){if(re(this,"name"),re(this,"fullPath"),re(this,"isPresent"),re(this,"hasVerseSegments"),re(this,"isCustomized"),re(this,"baseVersification"),re(this,"scriptureBooks"),re(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Je[t]):(this._type=t,this.name=Je[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};re(Le,"Original",new Le(Je.Original)),re(Le,"Septuagint",new Le(Je.Septuagint)),re(Le,"Vulgate",new Le(Je.Vulgate)),re(Le,"English",new Le(Je.English)),re(Le,"RussianProtestant",new Le(Je.RussianProtestant)),re(Le,"RussianOrthodox",new Le(Je.RussianOrthodox));let Tt=Le;function Sa(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var Ds=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Ds||{});const _e=class le{constructor(t,n,r,o){if(re(this,"firstChapter"),re(this,"lastChapter"),re(this,"lastVerse"),re(this,"hasSegmentsDefined"),re(this,"text"),re(this,"BBBCCCVVVS"),re(this,"longHashCode"),re(this,"versification"),re(this,"rtlMark","‏"),re(this,"_bookNum",0),re(this,"_chapterNum",0),re(this,"_verseNum",0),re(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const a=t,s=n!=null&&n instanceof Tt?n:void 0;this.setEmpty(s),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=n!=null&&n instanceof Tt?n:void 0;this.setEmpty(a),this._verseNum=t%le.chapterDigitShifter,this._chapterNum=Math.floor(t%le.bookDigitShifter/le.chapterDigitShifter),this._bookNum=Math.floor(t/le.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof le){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof Tt?t:le.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??le.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new le(t),{success:!0,verseRef:n}}catch(r){if(r instanceof gn)return n=new le,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%le.bcvMaxValue*le.bookDigitShifter+(n>=0?n%le.bcvMaxValue*le.chapterDigitShifter:0)+(r>=0?r%le.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:a,versificationStr:s}=t,l=a||o.toString();let c;return s&&(c=new Tt(s)),n?new le(n,r.toString(),l,c):new le}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>le.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(le.verseRangeSeparator)||this._verse.includes(le.verseSequenceIndicator))}get book(){return fe.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=fe.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=le.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=le.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>fe.lastBook)throw new gn("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Tt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(le.verseRangeSeparators,le.verseSequenceIndicators)}get BBBCCC(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const s=+a[1].trim();this.versification=new Tt(Je[s])}catch{throw new gn("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new gn("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||fe.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!le.isVerseParseable(r[1]))throw new gn("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new le(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete n.verse,n}equals(t){return t instanceof le?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=le.verseRangeSeparators,r=le.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=Sa(this._verse,r);for(const s of a.map(l=>Sa(l,n))){const l=this.clone();l.verse=s[0];const c=l.verseNum;if(o.push(l),s.length>1){const d=this.clone();if(d.verse=s[1],!t)for(let m=c+1;m<d.verseNum;m++){const v=new le(this._bookNum,this._chapterNum,m,this.versification);this.isExcluded||o.push(v)}o.push(d)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const a=o.internalValid;if(a!==0)return a;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>fe.lastBook?2:(fe.isCanonical(this._bookNum),0)}setEmpty(t=le.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=fe.bookIdToNumber(t),this.chapter=n,this.verse=r}};re(_e,"defaultVersification",Tt.English),re(_e,"verseRangeSeparator","-"),re(_e,"verseSequenceIndicator",","),re(_e,"verseRangeSeparators",[_e.verseRangeSeparator]),re(_e,"verseSequenceIndicators",[_e.verseSequenceIndicator]),re(_e,"chapterDigitShifter",1e3),re(_e,"bookDigitShifter",_e.chapterDigitShifter*_e.chapterDigitShifter),re(_e,"bcvMaxValue",_e.chapterDigitShifter-1),re(_e,"ValidStatusType",Ds);let gn=class extends Error{};const Oo=he.Root,As=he.Trigger,qc=he.Group,Wc=he.Portal,Xc=he.Sub,Yc=he.RadioGroup,Bs=T.forwardRef(({className:e,inset:t,children:n,...r},o)=>p.jsxs(he.SubTrigger,{ref:o,className:z("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,p.jsx(ae.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Bs.displayName=he.SubTrigger.displayName;const Ls=T.forwardRef(({className:e,...t},n)=>p.jsx(he.SubContent,{ref:n,className:z("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));Ls.displayName=he.SubContent.displayName;const xr=T.forwardRef(({className:e,sideOffset:t=4,...n},r)=>p.jsx(he.Portal,{children:p.jsx(he.Content,{ref:r,sideOffset:t,className:z("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));xr.displayName=he.Content.displayName;const Po=T.forwardRef(({className:e,inset:t,...n},r)=>p.jsx(he.Item,{ref:r,className:z("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));Po.displayName=he.Item.displayName;const jo=T.forwardRef(({className:e,children:t,checked:n,...r},o)=>p.jsxs(he.CheckboxItem,{ref:o,className:z("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[p.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:p.jsx(he.ItemIndicator,{children:p.jsx(ae.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));jo.displayName=he.CheckboxItem.displayName;const Vs=T.forwardRef(({className:e,children:t,...n},r)=>p.jsxs(he.RadioItem,{ref:r,className:z("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[p.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:p.jsx(he.ItemIndicator,{children:p.jsx(ae.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));Vs.displayName=he.RadioItem.displayName;const Vn=T.forwardRef(({className:e,inset:t,...n},r)=>p.jsx(he.Label,{ref:r,className:z("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));Vn.displayName=he.Label.displayName;const Er=T.forwardRef(({className:e,...t},n)=>p.jsx(he.Separator,{ref:n,className:z("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Er.displayName=he.Separator.displayName;function Fs({className:e,...t}){return p.jsx("span",{className:z("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Fs.displayName="DropdownMenuShortcut";const Kc=T.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:a,children:s},l)=>p.jsxs(Po,{ref:l,textValue:e,className:z("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[p.jsx("span",{className:z("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":a.toLowerCase()==="ot","pr-border-l-purple-200":a.toLowerCase()==="nt","pr-border-l-indigo-200":a.toLowerCase()==="dc"}),children:fe.bookIdToEnglishName(e)}),n&&p.jsx("div",{children:s})]},e));function Jc({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const a=Array.from({length:t},(l,c)=>c+1),s=T.useCallback(l=>{o(l)},[o]);return p.jsx("div",{className:z("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:a.map(l=>p.jsx("div",{className:z("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===n,"pr-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>s(l),children:l},l))})}function Zc({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return p.jsxs(Vn,{className:"pr-flex pr-justify-between",children:[p.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),p.jsxs("div",{className:"pr-flex pr-items-center",children:[p.jsx(ae.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),p.jsx(ae.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),p.jsx(ae.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const Nn=fe.allBookIds,Qc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},Ta=["OT","NT","DC"],ep=32+32+32,tp=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],np=e=>({OT:Nn.filter(n=>fe.isBookOT(n)),NT:Nn.filter(n=>fe.isBookNT(n)),DC:Nn.filter(n=>fe.isBookDC(n))})[e],bn=e=>Ke.getChaptersForBook(fe.bookIdToNumber(e));function rp(){return Nn.map(t=>fe.bookIdToEnglishName(t))}function op(e){return rp().includes(e)}function ap(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(op(t))return Nn.find(r=>fe.bookIdToEnglishName(r)===t)}function sp({scrRef:e,handleSubmit:t}){const[n,r]=T.useState(""),[o,a]=T.useState(fe.bookNumberToId(e.bookNum)),[s,l]=T.useState(e.chapterNum??0),[c,d]=T.useState(fe.bookNumberToId(e.bookNum)),[m,v]=T.useState(!1),[g,u]=T.useState(m),h=T.useRef(void 0),f=T.useRef(void 0),b=T.useRef(void 0),x=T.useCallback(S=>np(S).filter(C=>{const _=fe.bookIdToEnglishName(C).toLowerCase(),V=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return _.includes(V)||C.toLowerCase().includes(V)}),[n]),N=S=>{r(S)},w=T.useRef(!1),E=T.useCallback(S=>{if(w.current){w.current=!1;return}v(S)},[]),y=T.useCallback((S,C,_,V)=>{if(l(fe.bookNumberToId(e.bookNum)!==S?1:e.chapterNum),C||bn(S)===-1){t({bookNum:fe.bookIdToNumber(S),chapterNum:_||1,verseNum:V||1}),v(!1),r("");return}a(o!==S?S:""),v(!C)},[t,e.bookNum,e.chapterNum,o]),O=S=>{S<=0||S>bn(o)||y(o,!0,S)},R=T.useCallback(()=>{tp.forEach(S=>{const C=n.match(S);if(C){const[_,V=void 0,H=void 0]=C.slice(1),M=ap(_);(fe.isBookIdValid(_)||M)&&y(M??_,!0,V?parseInt(V,10):1,H?parseInt(H,10):1)}})},[y,n]),I=T.useCallback(S=>{m?(S.key==="ArrowDown"||S.key==="ArrowUp")&&(typeof b<"u"&&b.current!==null?b.current.focus():typeof f<"u"&&f.current!==null&&f.current.focus(),S.preventDefault()):v(!0)},[m]),A=S=>{const{key:C}=S;C==="ArrowRight"||C==="ArrowLeft"||C==="ArrowDown"||C==="ArrowUp"||C==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:C})),h.current.focus())},D=S=>{const{key:C}=S;if(c===o){if(C==="Enter"){S.preventDefault(),y(o,!0,s);return}let _=0;if(C==="ArrowRight")if(s<bn(c))_=1;else{S.preventDefault();return}else if(C==="ArrowLeft")if(s>1)_=-1;else{S.preventDefault();return}else C==="ArrowDown"?_=6:C==="ArrowUp"&&(_=-6);s+_<=0||s+_>bn(c)?l(0):_!==0&&(l(s+_),S.preventDefault())}};return T.useEffect(()=>{o===c?o===fe.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),T.useLayoutEffect(()=>{u(m)},[m]),T.useLayoutEffect(()=>{const S=setTimeout(()=>{if(g&&f.current&&b.current){const _=b.current.offsetTop-ep;f.current.scrollTo({top:_,behavior:"instant"})}},10);return()=>{clearTimeout(S)}},[g]),p.jsx("div",{className:"pr-flex",children:p.jsxs(Oo,{modal:!1,open:m,onOpenChange:E,children:[p.jsx(As,{asChild:!0,children:p.jsx(Mc,{ref:h,value:n,handleSearch:N,handleKeyDown:I,handleOnClick:()=>{a(fe.bookNumberToId(e.bookNum)),d(fe.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),v(!0),h.current.focus()},onFocus:()=>{w.current=!0},handleSubmit:R,placeholder:`${fe.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),p.jsxs(xr,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:A,align:"start",ref:f,children:[p.jsx(Zc,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),Ta.map((S,C)=>x(S).length>0&&p.jsxs("div",{children:[p.jsx(Vn,{className:"pr-font-semibold pr-text-slate-700",children:Qc[S]}),x(S).map(_=>p.jsx("div",{children:p.jsx(Kc,{bookId:_,handleSelectBook:()=>y(_,!1),isSelected:o===_,handleHighlightBook:()=>d(_),handleKeyDown:D,bookType:S,ref:V=>{o===_&&(b.current=V)},children:p.jsx(Jc,{handleSelectChapter:O,endChapter:bn(_),activeChapter:e.bookNum===fe.bookIdToNumber(_)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:V=>{l(V)}})})},_)),Ta.length-1!==C?p.jsx(Er,{}):void 0]},S))]})]})})}const zs=To.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),be=T.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},a)=>{const s=r?ur.Slot:"button";return p.jsx(s,{className:z(zs({variant:t,size:n,className:e})),ref:a,...o})});be.displayName="Button";function ip({table:e}){return p.jsxs(Oo,{children:[p.jsx(Rs.DropdownMenuTrigger,{asChild:!0,children:p.jsxs(be,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[p.jsx(ae.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),p.jsxs(xr,{align:"end",className:"pr-w-[150px]",children:[p.jsx(Vn,{children:"Toggle columns"}),p.jsx(Er,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>p.jsx(jo,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}const Mn=we.Root,Hs=we.Group,$n=we.Value,Jt=T.forwardRef(({className:e,children:t,...n},r)=>p.jsxs(we.Trigger,{ref:r,className:z("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...n,children:[t,p.jsx(we.Icon,{asChild:!0,children:p.jsx(ae.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));Jt.displayName=we.Trigger.displayName;const _o=T.forwardRef(({className:e,...t},n)=>p.jsx(we.ScrollUpButton,{ref:n,className:z("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:p.jsx(ae.ChevronUp,{className:"pr-h-4 pr-w-4"})}));_o.displayName=we.ScrollUpButton.displayName;const Mo=T.forwardRef(({className:e,...t},n)=>p.jsx(we.ScrollDownButton,{ref:n,className:z("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:p.jsx(ae.ChevronDown,{className:"pr-h-4 pr-w-4"})}));Mo.displayName=we.ScrollDownButton.displayName;const Zt=T.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>p.jsx(we.Portal,{children:p.jsxs(we.Content,{ref:o,className:z("pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:n,...r,children:[p.jsx(_o,{}),p.jsx(we.Viewport,{className:z("pr-p-1",n==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),p.jsx(Mo,{})]})}));Zt.displayName=we.Content.displayName;const Us=T.forwardRef(({className:e,...t},n)=>p.jsx(we.Label,{ref:n,className:z("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));Us.displayName=we.Label.displayName;const Ye=T.forwardRef(({className:e,children:t,...n},r)=>p.jsxs(we.Item,{ref:r,className:z("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[p.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:p.jsx(we.ItemIndicator,{children:p.jsx(ae.Check,{className:"pr-h-4 pr-w-4"})})}),p.jsx(we.ItemText,{children:t})]}));Ye.displayName=we.Item.displayName;const Gs=T.forwardRef(({className:e,...t},n)=>p.jsx(we.Separator,{ref:n,className:z("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Gs.displayName=we.Separator.displayName;function lp({table:e}){return p.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:p.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[p.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),p.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[p.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),p.jsxs(Mn,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[p.jsx(Jt,{className:"pr-h-8 pr-w-[70px]",children:p.jsx($n,{placeholder:e.getState().pagination.pageSize})}),p.jsx(Zt,{side:"top",children:[10,20,30,40,50].map(t=>p.jsx(Ye,{value:`${t}`,children:t},t))})]})]}),p.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),p.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[p.jsxs(be,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),p.jsx(ae.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),p.jsxs(be,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),p.jsx(ae.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),p.jsxs(be,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),p.jsx(ae.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),p.jsxs(be,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[p.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),p.jsx(ae.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}const Fn=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{className:"pr-relative pr-w-full pr-overflow-auto",children:p.jsx("table",{ref:n,className:z("pr-w-full pr-caption-bottom pr-text-sm",e),...t})}));Fn.displayName="Table";const zn=T.forwardRef(({className:e,...t},n)=>p.jsx("thead",{ref:n,className:z("[&_tr]:pr-border-b",e),...t}));zn.displayName="TableHeader";const Hn=T.forwardRef(({className:e,...t},n)=>p.jsx("tbody",{ref:n,className:z("[&_tr:last-child]:pr-border-0",e),...t}));Hn.displayName="TableBody";const qs=T.forwardRef(({className:e,...t},n)=>p.jsx("tfoot",{ref:n,className:z("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));qs.displayName="TableFooter";const lt=T.forwardRef(({className:e,...t},n)=>p.jsx("tr",{ref:n,className:z("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));lt.displayName="TableRow";const Qt=T.forwardRef(({className:e,...t},n)=>p.jsx("th",{ref:n,className:z("pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",e),...t}));Qt.displayName="TableHead";const $t=T.forwardRef(({className:e,...t},n)=>p.jsx("td",{ref:n,className:z("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0",e),...t}));$t.displayName="TableCell";const Ws=T.forwardRef(({className:e,...t},n)=>p.jsx("caption",{ref:n,className:z("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));Ws.displayName="TableCaption";function Xs({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,onRowClickHandler:a=()=>{}}){var f;const[s,l]=T.useState([]),[c,d]=T.useState([]),[m,v]=T.useState({}),[g,u]=T.useState({}),h=Ne.useReactTable({data:t,columns:e,getCoreRowModel:Ne.getCoreRowModel(),...n&&{getPaginationRowModel:Ne.getPaginationRowModel()},onSortingChange:l,getSortedRowModel:Ne.getSortedRowModel(),onColumnFiltersChange:d,getFilteredRowModel:Ne.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:u,state:{sorting:s,columnFilters:c,columnVisibility:m,rowSelection:g}});return p.jsxs("div",{children:[o&&p.jsx(ip,{table:h}),p.jsx("div",{className:"pr-twp pr-font-sans",children:p.jsxs(Fn,{children:[p.jsx(zn,{children:h.getHeaderGroups().map(b=>p.jsx(lt,{children:b.headers.map(x=>p.jsx(Qt,{children:x.isPlaceholder?void 0:Ne.flexRender(x.column.columnDef.header,x.getContext())},x.id))},b.id))}),p.jsx(Hn,{children:(f=h.getRowModel().rows)!=null&&f.length?h.getRowModel().rows.map(b=>p.jsx(lt,{onClick:()=>a(b,h),"data-state":b.getIsSelected()&&"selected",children:b.getVisibleCells().map(x=>p.jsx($t,{children:Ne.flexRender(x.column.columnDef.cell,x.getContext())},x.id))},b.id)):p.jsx(lt,{children:p.jsx($t,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]})}),n&&p.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[p.jsx(be,{variant:"outline",size:"sm",onClick:()=>h.previousPage(),disabled:!h.getCanPreviousPage(),children:"Previous"}),p.jsx(be,{variant:"outline",size:"sm",onClick:()=>h.nextPage(),disabled:!h.getCanNextPage(),children:"Next"})]}),n&&r&&p.jsx(lp,{table:h})]})}const cp=_n.Root,pp=_n.Trigger,Ys=T.forwardRef(({className:e,align:t="center",sideOffset:n=4,...r},o)=>p.jsx(_n.Portal,{children:p.jsx(_n.Content,{ref:o,align:t,sideOffset:n,className:z("pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r})}));Ys.displayName=_n.Content.displayName;const up=Qe.Portal,Ks=T.forwardRef(({className:e,...t},n)=>p.jsx(Qe.Overlay,{ref:n,className:z("pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",e),...t}));Ks.displayName=Qe.Overlay.displayName;const dp=T.forwardRef(({className:e,children:t,...n},r)=>p.jsxs(up,{children:[p.jsx(Ks,{}),p.jsxs(Qe.Content,{ref:r,className:z("pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",e),...n,children:[t,p.jsxs(Qe.Close,{className:"pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground",children:[p.jsx(ae.X,{className:"pr-h-4 pr-w-4"}),p.jsx("span",{className:"pr-sr-only",children:"Close"})]})]})]}));dp.displayName=Qe.Content.displayName;const fp=T.forwardRef(({className:e,...t},n)=>p.jsx(Qe.Title,{ref:n,className:z("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight",e),...t}));fp.displayName=Qe.Title.displayName;const mp=T.forwardRef(({className:e,...t},n)=>p.jsx(Qe.Description,{ref:n,className:z("pr-text-sm pr-text-muted-foreground",e),...t}));mp.displayName=Qe.Description.displayName;const Js=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Command,{ref:n,className:z("pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",e),...t}));Js.displayName=Ie.Command.displayName;const Zs=T.forwardRef(({className:e,...t},n)=>p.jsxs("div",{className:"pr-flex pr-items-center pr-border-b pr-px-3",children:[p.jsx(ae.Search,{className:"pr-mr-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"}),p.jsx(Ie.Command.Input,{ref:n,className:z("pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...t})]}));Zs.displayName=Ie.Command.Input.displayName;const Qs=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Command.List,{ref:n,className:z("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden",e),...t}));Qs.displayName=Ie.Command.List.displayName;const ei=T.forwardRef((e,t)=>p.jsx(Ie.Command.Empty,{ref:t,className:"pr-py-6 pr-text-center pr-text-sm",...e}));ei.displayName=Ie.Command.Empty.displayName;const hp=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Command.Group,{ref:n,className:z("pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",e),...t}));hp.displayName=Ie.Command.Group.displayName;const gp=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Command.Separator,{ref:n,className:z("pr--mx-1 pr-h-px pr-bg-border",e),...t}));gp.displayName=Ie.Command.Separator.displayName;const ti=T.forwardRef(({className:e,...t},n)=>p.jsx(Ie.Command.Item,{ref:n,className:z("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",e),...t}));ti.displayName=Ie.Command.Item.displayName;function bp(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function io({id:e,options:t=[],className:n,value:r,onChange:o=()=>{},getOptionLabel:a=bp,buttonPlaceholder:s="",textPlaceholder:l="",commandEmptyMessage:c="No option found",buttonVariant:d="outline"}){const[m,v]=T.useState(!1);return p.jsxs(cp,{open:m,onOpenChange:v,children:[p.jsx(pp,{asChild:!0,children:p.jsxs(be,{variant:d,role:"combobox","aria-expanded":m,id:e,className:z("pr-w-[200px] pr-justify-between",n),children:[r?a(r):s,p.jsx(ae.ChevronsUpDown,{className:"pr-ml-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"})]})}),p.jsx(Ys,{className:"pr-w-[200px] pr-p-0",children:p.jsxs(Js,{children:[p.jsx(Zs,{placeholder:l,className:"pr-text-inherit"}),p.jsx(ei,{children:c}),p.jsx(Qs,{children:t.map(g=>p.jsxs(ti,{value:a(g),onSelect:()=>{o(g),v(!1)},children:[p.jsx(ae.Check,{className:z("pr-mr-2 pr-h-4 pr-w-4",{"pr-opacity-0":!r||a(r)!==a(g)})}),a(g)]},a(g)))})]})})]})}function vp({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,a]=T.useState(1),[s,l]=T.useState(r),[c,d]=T.useState(Array.from({length:r},(g,u)=>u+1));T.useEffect(()=>{a(1),e(1),l(r),t(r),d(Array.from({length:r},(g,u)=>u+1))},[r,t,e]);const m=g=>{a(g),e(g),g>s&&(l(g),t(g))},v=g=>{l(g),t(g),g<o&&(a(g),e(g))};return p.jsxs(p.Fragment,{children:[p.jsx(ke.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:p.jsx(io,{onChange:m,className:"book-selection-chapter",options:c,getOptionLabel:g=>g.toString(),value:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),p.jsx(ke.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:p.jsx(io,{onChange:v,className:"book-selection-chapter",options:c,getOptionLabel:g=>g.toString(),value:s},"end chapter"),label:"to",labelPlacement:"start"})]})}var Ot=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Ot||{});function ni({id:e,isChecked:t,labelText:n="",labelPosition:r=Ot.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:s=!1,hasError:l=!1,className:c,onChange:d}){const m=p.jsx(ke.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:a,disabled:s,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:d});let v;if(n){const g=r===Ot.Before||r===Ot.Above,u=p.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),h=r===Ot.Before||r===Ot.After,f=h?u:p.jsx("div",{children:u}),b=h?m:p.jsx("div",{children:m});v=p.jsxs(ke.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:l,children:[g&&f,b,!g&&f]})}else v=m;return v}function yp({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:a,createLabel:s}){return p.jsxs("fieldset",{id:e,className:t,children:[n&&p.jsx("legend",{children:n}),r.map(l=>p.jsx(ni,{className:"check-item",isChecked:o.includes(l),labelText:s?s(l):l,onChange:()=>a(l)},l))]})}function wp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function xp(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var $o={},ri={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(ri);var Ep=ri.exports,zr={};function cn(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function j(){return j=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},j.apply(this,arguments)}function Pt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function oi(e){if(!Pt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=oi(e[n])}),t}function ct(e,t,n={clone:!0}){const r=n.clone?j({},e):e;return Pt(e)&&Pt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Pt(t[o])&&o in e&&Pt(e[o])?r[o]=ct(e[o],t[o],n):n.clone?r[o]=Pt(t[o])?oi(t[o]):t[o]:r[o]=t[o])}),r}var lo={exports:{}},er={exports:{}},ce={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ca;function kp(){if(Ca)return ce;Ca=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,u=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,N=e?Symbol.for("react.scope"):60119;function w(y){if(typeof y=="object"&&y!==null){var O=y.$$typeof;switch(O){case t:switch(y=y.type,y){case c:case d:case r:case a:case o:case v:return y;default:switch(y=y&&y.$$typeof,y){case l:case m:case h:case u:case s:return y;default:return O}}case n:return O}}}function E(y){return w(y)===d}return ce.AsyncMode=c,ce.ConcurrentMode=d,ce.ContextConsumer=l,ce.ContextProvider=s,ce.Element=t,ce.ForwardRef=m,ce.Fragment=r,ce.Lazy=h,ce.Memo=u,ce.Portal=n,ce.Profiler=a,ce.StrictMode=o,ce.Suspense=v,ce.isAsyncMode=function(y){return E(y)||w(y)===c},ce.isConcurrentMode=E,ce.isContextConsumer=function(y){return w(y)===l},ce.isContextProvider=function(y){return w(y)===s},ce.isElement=function(y){return typeof y=="object"&&y!==null&&y.$$typeof===t},ce.isForwardRef=function(y){return w(y)===m},ce.isFragment=function(y){return w(y)===r},ce.isLazy=function(y){return w(y)===h},ce.isMemo=function(y){return w(y)===u},ce.isPortal=function(y){return w(y)===n},ce.isProfiler=function(y){return w(y)===a},ce.isStrictMode=function(y){return w(y)===o},ce.isSuspense=function(y){return w(y)===v},ce.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===r||y===d||y===a||y===o||y===v||y===g||typeof y=="object"&&y!==null&&(y.$$typeof===h||y.$$typeof===u||y.$$typeof===s||y.$$typeof===l||y.$$typeof===m||y.$$typeof===b||y.$$typeof===x||y.$$typeof===N||y.$$typeof===f)},ce.typeOf=w,ce}var pe={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Na;function Sp(){return Na||(Na=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,u=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,N=e?Symbol.for("react.scope"):60119;function w(F){return typeof F=="string"||typeof F=="function"||F===r||F===d||F===a||F===o||F===v||F===g||typeof F=="object"&&F!==null&&(F.$$typeof===h||F.$$typeof===u||F.$$typeof===s||F.$$typeof===l||F.$$typeof===m||F.$$typeof===b||F.$$typeof===x||F.$$typeof===N||F.$$typeof===f)}function E(F){if(typeof F=="object"&&F!==null){var te=F.$$typeof;switch(te){case t:var B=F.type;switch(B){case c:case d:case r:case a:case o:case v:return B;default:var ie=B&&B.$$typeof;switch(ie){case l:case m:case h:case u:case s:return ie;default:return te}}case n:return te}}}var y=c,O=d,R=l,I=s,A=t,D=m,S=r,C=h,_=u,V=n,H=a,M=o,L=v,J=!1;function Q(F){return J||(J=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),P(F)||E(F)===c}function P(F){return E(F)===d}function $(F){return E(F)===l}function U(F){return E(F)===s}function X(F){return typeof F=="object"&&F!==null&&F.$$typeof===t}function G(F){return E(F)===m}function q(F){return E(F)===r}function Y(F){return E(F)===h}function K(F){return E(F)===u}function W(F){return E(F)===n}function Z(F){return E(F)===a}function ee(F){return E(F)===o}function se(F){return E(F)===v}pe.AsyncMode=y,pe.ConcurrentMode=O,pe.ContextConsumer=R,pe.ContextProvider=I,pe.Element=A,pe.ForwardRef=D,pe.Fragment=S,pe.Lazy=C,pe.Memo=_,pe.Portal=V,pe.Profiler=H,pe.StrictMode=M,pe.Suspense=L,pe.isAsyncMode=Q,pe.isConcurrentMode=P,pe.isContextConsumer=$,pe.isContextProvider=U,pe.isElement=X,pe.isForwardRef=G,pe.isFragment=q,pe.isLazy=Y,pe.isMemo=K,pe.isPortal=W,pe.isProfiler=Z,pe.isStrictMode=ee,pe.isSuspense=se,pe.isValidElementType=w,pe.typeOf=E}()),pe}var Ra;function ai(){return Ra||(Ra=1,process.env.NODE_ENV==="production"?er.exports=kp():er.exports=Sp()),er.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Hr,Oa;function Tp(){if(Oa)return Hr;Oa=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var s={},l=0;l<10;l++)s["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(s).map(function(m){return s[m]});if(c.join("")!=="0123456789")return!1;var d={};return"abcdefghijklmnopqrst".split("").forEach(function(m){d[m]=m}),Object.keys(Object.assign({},d)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Hr=o()?Object.assign:function(a,s){for(var l,c=r(a),d,m=1;m<arguments.length;m++){l=Object(arguments[m]);for(var v in l)t.call(l,v)&&(c[v]=l[v]);if(e){d=e(l);for(var g=0;g<d.length;g++)n.call(l,d[g])&&(c[d[g]]=l[d[g]])}}return c},Hr}var Ur,Pa;function Io(){if(Pa)return Ur;Pa=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Ur=e,Ur}var Gr,ja;function si(){return ja||(ja=1,Gr=Function.call.bind(Object.prototype.hasOwnProperty)),Gr}var qr,_a;function Cp(){if(_a)return qr;_a=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Io(),n={},r=si();e=function(a){var s="Warning: "+a;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(a,s,l,c,d){if(process.env.NODE_ENV!=="production"){for(var m in a)if(r(a,m)){var v;try{if(typeof a[m]!="function"){var g=Error((c||"React class")+": "+l+" type `"+m+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[m]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw g.name="Invariant Violation",g}v=a[m](s,m,c,l,null,t)}catch(h){v=h}if(v&&!(v instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+m+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof v+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),v instanceof Error&&!(v.message in n)){n[v.message]=!0;var u=d?d():"";e("Failed "+l+" type: "+v.message+(u??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},qr=o,qr}var Wr,Ma;function Np(){if(Ma)return Wr;Ma=1;var e=ai(),t=Tp(),n=Io(),r=si(),o=Cp(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function s(){return null}return Wr=function(l,c){var d=typeof Symbol=="function"&&Symbol.iterator,m="@@iterator";function v(P){var $=P&&(d&&P[d]||P[m]);if(typeof $=="function")return $}var g="<<anonymous>>",u={array:x("array"),bigint:x("bigint"),bool:x("boolean"),func:x("function"),number:x("number"),object:x("object"),string:x("string"),symbol:x("symbol"),any:N(),arrayOf:w,element:E(),elementType:y(),instanceOf:O,node:D(),objectOf:I,oneOf:R,oneOfType:A,shape:C,exact:_};function h(P,$){return P===$?P!==0||1/P===1/$:P!==P&&$!==$}function f(P,$){this.message=P,this.data=$&&typeof $=="object"?$:{},this.stack=""}f.prototype=Error.prototype;function b(P){if(process.env.NODE_ENV!=="production")var $={},U=0;function X(q,Y,K,W,Z,ee,se){if(W=W||g,ee=ee||K,se!==n){if(c){var F=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw F.name="Invariant Violation",F}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var te=W+":"+K;!$[te]&&U<3&&(a("You are manually calling a React.PropTypes validation function for the `"+ee+"` prop on `"+W+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),$[te]=!0,U++)}}return Y[K]==null?q?Y[K]===null?new f("The "+Z+" `"+ee+"` is marked as required "+("in `"+W+"`, but its value is `null`.")):new f("The "+Z+" `"+ee+"` is marked as required in "+("`"+W+"`, but its value is `undefined`.")):null:P(Y,K,W,Z,ee)}var G=X.bind(null,!1);return G.isRequired=X.bind(null,!0),G}function x(P){function $(U,X,G,q,Y,K){var W=U[X],Z=M(W);if(Z!==P){var ee=L(W);return new f("Invalid "+q+" `"+Y+"` of type "+("`"+ee+"` supplied to `"+G+"`, expected ")+("`"+P+"`."),{expectedType:P})}return null}return b($)}function N(){return b(s)}function w(P){function $(U,X,G,q,Y){if(typeof P!="function")return new f("Property `"+Y+"` of component `"+G+"` has invalid PropType notation inside arrayOf.");var K=U[X];if(!Array.isArray(K)){var W=M(K);return new f("Invalid "+q+" `"+Y+"` of type "+("`"+W+"` supplied to `"+G+"`, expected an array."))}for(var Z=0;Z<K.length;Z++){var ee=P(K,Z,G,q,Y+"["+Z+"]",n);if(ee instanceof Error)return ee}return null}return b($)}function E(){function P($,U,X,G,q){var Y=$[U];if(!l(Y)){var K=M(Y);return new f("Invalid "+G+" `"+q+"` of type "+("`"+K+"` supplied to `"+X+"`, expected a single ReactElement."))}return null}return b(P)}function y(){function P($,U,X,G,q){var Y=$[U];if(!e.isValidElementType(Y)){var K=M(Y);return new f("Invalid "+G+" `"+q+"` of type "+("`"+K+"` supplied to `"+X+"`, expected a single ReactElement type."))}return null}return b(P)}function O(P){function $(U,X,G,q,Y){if(!(U[X]instanceof P)){var K=P.name||g,W=Q(U[X]);return new f("Invalid "+q+" `"+Y+"` of type "+("`"+W+"` supplied to `"+G+"`, expected ")+("instance of `"+K+"`."))}return null}return b($)}function R(P){if(!Array.isArray(P))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),s;function $(U,X,G,q,Y){for(var K=U[X],W=0;W<P.length;W++)if(h(K,P[W]))return null;var Z=JSON.stringify(P,function(se,F){var te=L(F);return te==="symbol"?String(F):F});return new f("Invalid "+q+" `"+Y+"` of value `"+String(K)+"` "+("supplied to `"+G+"`, expected one of "+Z+"."))}return b($)}function I(P){function $(U,X,G,q,Y){if(typeof P!="function")return new f("Property `"+Y+"` of component `"+G+"` has invalid PropType notation inside objectOf.");var K=U[X],W=M(K);if(W!=="object")return new f("Invalid "+q+" `"+Y+"` of type "+("`"+W+"` supplied to `"+G+"`, expected an object."));for(var Z in K)if(r(K,Z)){var ee=P(K,Z,G,q,Y+"."+Z,n);if(ee instanceof Error)return ee}return null}return b($)}function A(P){if(!Array.isArray(P))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var $=0;$<P.length;$++){var U=P[$];if(typeof U!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+J(U)+" at index "+$+"."),s}function X(G,q,Y,K,W){for(var Z=[],ee=0;ee<P.length;ee++){var se=P[ee],F=se(G,q,Y,K,W,n);if(F==null)return null;F.data&&r(F.data,"expectedType")&&Z.push(F.data.expectedType)}var te=Z.length>0?", expected one of type ["+Z.join(", ")+"]":"";return new f("Invalid "+K+" `"+W+"` supplied to "+("`"+Y+"`"+te+"."))}return b(X)}function D(){function P($,U,X,G,q){return V($[U])?null:new f("Invalid "+G+" `"+q+"` supplied to "+("`"+X+"`, expected a ReactNode."))}return b(P)}function S(P,$,U,X,G){return new f((P||"React class")+": "+$+" type `"+U+"."+X+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+G+"`.")}function C(P){function $(U,X,G,q,Y){var K=U[X],W=M(K);if(W!=="object")return new f("Invalid "+q+" `"+Y+"` of type `"+W+"` "+("supplied to `"+G+"`, expected `object`."));for(var Z in P){var ee=P[Z];if(typeof ee!="function")return S(G,q,Y,Z,L(ee));var se=ee(K,Z,G,q,Y+"."+Z,n);if(se)return se}return null}return b($)}function _(P){function $(U,X,G,q,Y){var K=U[X],W=M(K);if(W!=="object")return new f("Invalid "+q+" `"+Y+"` of type `"+W+"` "+("supplied to `"+G+"`, expected `object`."));var Z=t({},U[X],P);for(var ee in Z){var se=P[ee];if(r(P,ee)&&typeof se!="function")return S(G,q,Y,ee,L(se));if(!se)return new f("Invalid "+q+" `"+Y+"` key `"+ee+"` supplied to `"+G+"`.\nBad object: "+JSON.stringify(U[X],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(P),null,"  "));var F=se(K,ee,G,q,Y+"."+ee,n);if(F)return F}return null}return b($)}function V(P){switch(typeof P){case"number":case"string":case"undefined":return!0;case"boolean":return!P;case"object":if(Array.isArray(P))return P.every(V);if(P===null||l(P))return!0;var $=v(P);if($){var U=$.call(P),X;if($!==P.entries){for(;!(X=U.next()).done;)if(!V(X.value))return!1}else for(;!(X=U.next()).done;){var G=X.value;if(G&&!V(G[1]))return!1}}else return!1;return!0;default:return!1}}function H(P,$){return P==="symbol"?!0:$?$["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&$ instanceof Symbol:!1}function M(P){var $=typeof P;return Array.isArray(P)?"array":P instanceof RegExp?"object":H($,P)?"symbol":$}function L(P){if(typeof P>"u"||P===null)return""+P;var $=M(P);if($==="object"){if(P instanceof Date)return"date";if(P instanceof RegExp)return"regexp"}return $}function J(P){var $=L(P);switch($){case"array":case"object":return"an "+$;case"boolean":case"date":case"regexp":return"a "+$;default:return $}}function Q(P){return!P.constructor||!P.constructor.name?g:P.constructor.name}return u.checkPropTypes=o,u.resetWarningCache=o.resetWarningCache,u.PropTypes=u,u},Wr}var Xr,$a;function Rp(){if($a)return Xr;$a=1;var e=Io();function t(){}function n(){}return n.resetWarningCache=t,Xr=function(){function r(s,l,c,d,m,v){if(v!==e){var g=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw g.name="Invariant Violation",g}}r.isRequired=r;function o(){return r}var a={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return a.PropTypes=a,a},Xr}if(process.env.NODE_ENV!=="production"){var Op=ai(),Pp=!0;lo.exports=Np()(Op.isElement,Pp)}else lo.exports=Rp()();var jp=lo.exports;const i=wp(jp);function _p(e){const{prototype:t={}}=e;return!!t.isReactComponent}function ii(e,t,n,r,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let l;const c=a.type;return typeof c=="function"&&!_p(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const li=cn(i.element,ii);li.isRequired=cn(i.element.isRequired,ii);const Un=li;function Mp(e){const{prototype:t={}}=e;return!!t.isReactComponent}function $p(e,t,n,r,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let l;return typeof a=="function"&&!Mp(a)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ip=cn(i.elementType,$p),Dp="exact-prop: ​";function ci(e){return process.env.NODE_ENV==="production"?e:j({},e,{[Dp]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function en(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var co={exports:{}},ue={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ia;function Ap(){if(Ia)return ue;Ia=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),u=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function f(b){if(typeof b=="object"&&b!==null){var x=b.$$typeof;switch(x){case e:switch(b=b.type,b){case n:case o:case r:case d:case m:return b;default:switch(b=b&&b.$$typeof,b){case l:case s:case c:case g:case v:case a:return b;default:return x}}case t:return x}}}return ue.ContextConsumer=s,ue.ContextProvider=a,ue.Element=e,ue.ForwardRef=c,ue.Fragment=n,ue.Lazy=g,ue.Memo=v,ue.Portal=t,ue.Profiler=o,ue.StrictMode=r,ue.Suspense=d,ue.SuspenseList=m,ue.isAsyncMode=function(){return!1},ue.isConcurrentMode=function(){return!1},ue.isContextConsumer=function(b){return f(b)===s},ue.isContextProvider=function(b){return f(b)===a},ue.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===e},ue.isForwardRef=function(b){return f(b)===c},ue.isFragment=function(b){return f(b)===n},ue.isLazy=function(b){return f(b)===g},ue.isMemo=function(b){return f(b)===v},ue.isPortal=function(b){return f(b)===t},ue.isProfiler=function(b){return f(b)===o},ue.isStrictMode=function(b){return f(b)===r},ue.isSuspense=function(b){return f(b)===d},ue.isSuspenseList=function(b){return f(b)===m},ue.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===n||b===o||b===r||b===d||b===m||b===u||typeof b=="object"&&b!==null&&(b.$$typeof===g||b.$$typeof===v||b.$$typeof===a||b.$$typeof===s||b.$$typeof===c||b.$$typeof===h||b.getModuleId!==void 0)},ue.typeOf=f,ue}var de={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Da;function Bp(){return Da||(Da=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),u=Symbol.for("react.offscreen"),h=!1,f=!1,b=!1,x=!1,N=!1,w;w=Symbol.for("react.module.reference");function E(B){return!!(typeof B=="string"||typeof B=="function"||B===n||B===o||N||B===r||B===d||B===m||x||B===u||h||f||b||typeof B=="object"&&B!==null&&(B.$$typeof===g||B.$$typeof===v||B.$$typeof===a||B.$$typeof===s||B.$$typeof===c||B.$$typeof===w||B.getModuleId!==void 0))}function y(B){if(typeof B=="object"&&B!==null){var ie=B.$$typeof;switch(ie){case e:var Se=B.type;switch(Se){case n:case o:case r:case d:case m:return Se;default:var Pe=Se&&Se.$$typeof;switch(Pe){case l:case s:case c:case g:case v:case a:return Pe;default:return ie}}case t:return ie}}}var O=s,R=a,I=e,A=c,D=n,S=g,C=v,_=t,V=o,H=r,M=d,L=m,J=!1,Q=!1;function P(B){return J||(J=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function $(B){return Q||(Q=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function U(B){return y(B)===s}function X(B){return y(B)===a}function G(B){return typeof B=="object"&&B!==null&&B.$$typeof===e}function q(B){return y(B)===c}function Y(B){return y(B)===n}function K(B){return y(B)===g}function W(B){return y(B)===v}function Z(B){return y(B)===t}function ee(B){return y(B)===o}function se(B){return y(B)===r}function F(B){return y(B)===d}function te(B){return y(B)===m}de.ContextConsumer=O,de.ContextProvider=R,de.Element=I,de.ForwardRef=A,de.Fragment=D,de.Lazy=S,de.Memo=C,de.Portal=_,de.Profiler=V,de.StrictMode=H,de.Suspense=M,de.SuspenseList=L,de.isAsyncMode=P,de.isConcurrentMode=$,de.isContextConsumer=U,de.isContextProvider=X,de.isElement=G,de.isForwardRef=q,de.isFragment=Y,de.isLazy=K,de.isMemo=W,de.isPortal=Z,de.isProfiler=ee,de.isStrictMode=se,de.isSuspense=F,de.isSuspenseList=te,de.isValidElementType=E,de.typeOf=y}()),de}process.env.NODE_ENV==="production"?co.exports=Ap():co.exports=Bp();var dr=co.exports;const Lp=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Vp(e){const t=`${e}`.match(Lp);return t&&t[1]||""}function pi(e,t=""){return e.displayName||e.name||Vp(e)||t}function Aa(e,t,n){const r=pi(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Fp(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return pi(e,"Component");if(typeof e=="object")switch(e.$$typeof){case dr.ForwardRef:return Aa(e,e.render,"ForwardRef");case dr.Memo:return Aa(e,e.type,"memo");default:return}}}function pt(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=e[t],s=o||t;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const zp=i.oneOfType([i.func,i.object]),Do=zp;function et(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":en(7));return e.charAt(0).toUpperCase()+e.slice(1)}function po(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function ui(e,t=166){let n;function r(...o){const a=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(a,t)}return r.clear=()=>{clearTimeout(n)},r}function Hp(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,a,s)=>{const l=o||"<<anonymous>>",c=s||r;return typeof n[r]<"u"?new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function Up(e,t){var n,r;return k.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Re(e){return e&&e.ownerDocument||document}function tn(e){return Re(e).defaultView||window}function Gp(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?j({},t.propTypes):null;return o=>(a,s,l,c,d,...m)=>{const v=d||s,g=n==null?void 0:n[v];if(g){const u=g(a,s,l,c,d,...m);if(u)return u}return typeof a[s]<"u"&&!a[o]?new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function fr(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const qp=typeof window<"u"?k.useLayoutEffect:k.useEffect,It=qp;let Ba=0;function Wp(e){const[t,n]=k.useState(e),r=e||t;return k.useEffect(()=>{t==null&&(Ba+=1,n(`mui-${Ba}`))},[t]),r}const La=k["useId".toString()];function di(e){if(La!==void 0){const t=La();return e??t}return Wp(e)}function Xp(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=o||t;return typeof e[t]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function fi({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=k.useRef(e!==void 0),[a,s]=k.useState(t),l=o?e:a;if(process.env.NODE_ENV!=="production"){k.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:d}=k.useRef(t);k.useEffect(()=>{!o&&d!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=k.useCallback(d=>{o||s(d)},[]);return[l,c]}function In(e){const t=k.useRef(e);return It(()=>{t.current=e}),k.useRef((...n)=>(0,t.current)(...n)).current}function Ge(...e){return k.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{fr(n,t)})},e)}const Va={};function Yp(e,t){const n=k.useRef(Va);return n.current===Va&&(n.current=e(t)),n}const Kp=[];function Jp(e){k.useEffect(e,Kp)}class Gn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Gn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function Sn(){const e=Yp(Gn.create).current;return Jp(e.disposeEffect),e}let kr=!0,uo=!1;const Zp=new Gn,Qp={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function eu(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Qp[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function tu(e){e.metaKey||e.altKey||e.ctrlKey||(kr=!0)}function Yr(){kr=!1}function nu(){this.visibilityState==="hidden"&&uo&&(kr=!0)}function ru(e){e.addEventListener("keydown",tu,!0),e.addEventListener("mousedown",Yr,!0),e.addEventListener("pointerdown",Yr,!0),e.addEventListener("touchstart",Yr,!0),e.addEventListener("visibilitychange",nu,!0)}function ou(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return kr||eu(t)}function mi(){const e=k.useCallback(o=>{o!=null&&ru(o.ownerDocument)},[]),t=k.useRef(!1);function n(){return t.current?(uo=!0,Zp.start(100,()=>{uo=!1}),t.current=!1,!0):!1}function r(o){return ou(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function hi(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function au(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function su(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const iu=Number.isInteger||su;function gi(e,t,n,r){const o=e[t];if(o==null||!iu(o)){const a=au(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function bi(e,t,...n){return e[t]===void 0?null:gi(e,t,...n)}function fo(){return null}bi.isRequired=gi;fo.isRequired=fo;const vi=process.env.NODE_ENV==="production"?fo:bi;function yi(e,t){const n=j({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=j({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},a=t[r];n[r]={},!a||!Object.keys(a)?n[r]=o:!o||!Object.keys(o)?n[r]=a:(n[r]=j({},a),Object.keys(o).forEach(s=>{n[r][s]=yi(o[s],a[s])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function ft(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((a,s)=>{if(s){const l=t(s);l!==""&&a.push(l),n&&n[s]&&a.push(n[s])}return a},[]).join(" ")}),r}const Fa=e=>e,lu=()=>{let e=Fa;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Fa}}},cu=lu(),wi=cu,xi={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function rt(e,t,n="Mui"){const r=xi[t];return r?`${n}-${r}`:`${wi.generate(e)}-${t}`}function wt(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=rt(e,o,n)}),r}function pu(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function me(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,a;for(a=0;a<r.length;a++)o=r[a],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}const uu=["values","unit","step"],du=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>j({},n,{[r.key]:r.val}),{})};function fu(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=me(e,uu),a=du(t),s=Object.keys(a);function l(g){return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${n})`}function c(g){return`@media (max-width:${(typeof t[g]=="number"?t[g]:g)-r/100}${n})`}function d(g,u){const h=s.indexOf(u);return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${n}) and (max-width:${(h!==-1&&typeof t[s[h]]=="number"?t[s[h]]:u)-r/100}${n})`}function m(g){return s.indexOf(g)+1<s.length?d(g,s[s.indexOf(g)+1]):l(g)}function v(g){const u=s.indexOf(g);return u===0?l(s[1]):u===s.length-1?c(s[u]):d(g,s[s.indexOf(g)+1]).replace("@media","@media not all and")}return j({keys:s,values:a,up:l,down:c,between:d,only:m,not:v,unit:n},o)}const mu={borderRadius:4},hu=mu,gu=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.string,i.object,i.array]):{},xt=gu;function Rn(e,t){return t?ct(e,t,{clone:!1}):e}const Ao={xs:0,sm:600,md:900,lg:1200,xl:1536},za={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Ao[e]}px)`};function ut(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const a=r.breakpoints||za;return t.reduce((s,l,c)=>(s[a.up(a.keys[c])]=n(t[c]),s),{})}if(typeof t=="object"){const a=r.breakpoints||za;return Object.keys(t).reduce((s,l)=>{if(Object.keys(a.values||Ao).indexOf(l)!==-1){const c=a.up(l);s[c]=n(t[l],l)}else{const c=l;s[c]=t[c]}return s},{})}return n(t)}function bu(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const a=e.up(o);return r[a]={},r},{}))||{}}function vu(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Sr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function mr(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Sr(e,n)||r,t&&(o=t(o,r,e)),o}function Ee(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,a=s=>{if(s[t]==null)return null;const l=s[t],c=s.theme,d=Sr(c,r)||{};return ut(s,l,v=>{let g=mr(d,o,v);return v===g&&typeof v=="string"&&(g=mr(d,o,`${t}${v==="default"?"":et(v)}`,v)),n===!1?g:{[n]:g}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[t]:xt}:{},a.filterProps=[t],a}function yu(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const wu={m:"margin",p:"padding"},xu={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Ha={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Eu=yu(e=>{if(e.length>2)if(Ha[e])e=Ha[e];else return[e];const[t,n]=e.split(""),r=wu[t],o=xu[n]||"";return Array.isArray(o)?o.map(a=>r+a):[r+o]}),Tr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Cr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],ku=[...Tr,...Cr];function qn(e,t,n,r){var o;const a=(o=Sr(e,t,!1))!=null?o:n;return typeof a=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),a*s):Array.isArray(a)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>a.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${s} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),a[s]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Ei(e){return qn(e,"spacing",8,"spacing")}function Wn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Su(e,t){return n=>e.reduce((r,o)=>(r[o]=Wn(t,n),r),{})}function Tu(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=Eu(n),a=Su(o,r),s=e[n];return ut(e,s,a)}function ki(e,t){const n=Ei(e.theme);return Object.keys(e).map(r=>Tu(e,t,r,n)).reduce(Rn,{})}function ve(e){return ki(e,Tr)}ve.propTypes=process.env.NODE_ENV!=="production"?Tr.reduce((e,t)=>(e[t]=xt,e),{}):{};ve.filterProps=Tr;function ye(e){return ki(e,Cr)}ye.propTypes=process.env.NODE_ENV!=="production"?Cr.reduce((e,t)=>(e[t]=xt,e),{}):{};ye.filterProps=Cr;process.env.NODE_ENV!=="production"&&ku.reduce((e,t)=>(e[t]=xt,e),{});function Cu(e=8){if(e.mui)return e;const t=Ei({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(a=>{const s=t(a);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function Nr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(a=>{r[a]=o}),r),{}),n=r=>Object.keys(r).reduce((o,a)=>t[a]?Rn(o,t[a](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function He(e){return typeof e!="number"?e:`${e}px solid`}function Xe(e,t){return Ee({prop:e,themeKey:"borders",transform:t})}const Nu=Xe("border",He),Ru=Xe("borderTop",He),Ou=Xe("borderRight",He),Pu=Xe("borderBottom",He),ju=Xe("borderLeft",He),_u=Xe("borderColor"),Mu=Xe("borderTopColor"),$u=Xe("borderRightColor"),Iu=Xe("borderBottomColor"),Du=Xe("borderLeftColor"),Au=Xe("outline",He),Bu=Xe("outlineColor"),Rr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=qn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:Wn(t,r)});return ut(e,e.borderRadius,n)}return null};Rr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:xt}:{};Rr.filterProps=["borderRadius"];Nr(Nu,Ru,Ou,Pu,ju,_u,Mu,$u,Iu,Du,Rr,Au,Bu);const Or=e=>{if(e.gap!==void 0&&e.gap!==null){const t=qn(e.theme,"spacing",8,"gap"),n=r=>({gap:Wn(t,r)});return ut(e,e.gap,n)}return null};Or.propTypes=process.env.NODE_ENV!=="production"?{gap:xt}:{};Or.filterProps=["gap"];const Pr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=qn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:Wn(t,r)});return ut(e,e.columnGap,n)}return null};Pr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:xt}:{};Pr.filterProps=["columnGap"];const jr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=qn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:Wn(t,r)});return ut(e,e.rowGap,n)}return null};jr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:xt}:{};jr.filterProps=["rowGap"];const Lu=Ee({prop:"gridColumn"}),Vu=Ee({prop:"gridRow"}),Fu=Ee({prop:"gridAutoFlow"}),zu=Ee({prop:"gridAutoColumns"}),Hu=Ee({prop:"gridAutoRows"}),Uu=Ee({prop:"gridTemplateColumns"}),Gu=Ee({prop:"gridTemplateRows"}),qu=Ee({prop:"gridTemplateAreas"}),Wu=Ee({prop:"gridArea"});Nr(Or,Pr,jr,Lu,Vu,Fu,zu,Hu,Uu,Gu,qu,Wu);function Kt(e,t){return t==="grey"?t:e}const Xu=Ee({prop:"color",themeKey:"palette",transform:Kt}),Yu=Ee({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Kt}),Ku=Ee({prop:"backgroundColor",themeKey:"palette",transform:Kt});Nr(Xu,Yu,Ku);function Ve(e){return e<=1&&e!==0?`${e*100}%`:e}const Ju=Ee({prop:"width",transform:Ve}),Bo=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const a=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Ao[n];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:Ve(n)}};return ut(e,e.maxWidth,t)}return null};Bo.filterProps=["maxWidth"];const Zu=Ee({prop:"minWidth",transform:Ve}),Qu=Ee({prop:"height",transform:Ve}),ed=Ee({prop:"maxHeight",transform:Ve}),td=Ee({prop:"minHeight",transform:Ve});Ee({prop:"size",cssProperty:"width",transform:Ve});Ee({prop:"size",cssProperty:"height",transform:Ve});const nd=Ee({prop:"boxSizing"});Nr(Ju,Bo,Zu,Qu,ed,td,nd);const rd={border:{themeKey:"borders",transform:He},borderTop:{themeKey:"borders",transform:He},borderRight:{themeKey:"borders",transform:He},borderBottom:{themeKey:"borders",transform:He},borderLeft:{themeKey:"borders",transform:He},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:He},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Rr},color:{themeKey:"palette",transform:Kt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Kt},backgroundColor:{themeKey:"palette",transform:Kt},p:{style:ye},pt:{style:ye},pr:{style:ye},pb:{style:ye},pl:{style:ye},px:{style:ye},py:{style:ye},padding:{style:ye},paddingTop:{style:ye},paddingRight:{style:ye},paddingBottom:{style:ye},paddingLeft:{style:ye},paddingX:{style:ye},paddingY:{style:ye},paddingInline:{style:ye},paddingInlineStart:{style:ye},paddingInlineEnd:{style:ye},paddingBlock:{style:ye},paddingBlockStart:{style:ye},paddingBlockEnd:{style:ye},m:{style:ve},mt:{style:ve},mr:{style:ve},mb:{style:ve},ml:{style:ve},mx:{style:ve},my:{style:ve},margin:{style:ve},marginTop:{style:ve},marginRight:{style:ve},marginBottom:{style:ve},marginLeft:{style:ve},marginX:{style:ve},marginY:{style:ve},marginInline:{style:ve},marginInlineStart:{style:ve},marginInlineEnd:{style:ve},marginBlock:{style:ve},marginBlockStart:{style:ve},marginBlockEnd:{style:ve},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Or},rowGap:{style:jr},columnGap:{style:Pr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ve},maxWidth:{style:Bo},minWidth:{transform:Ve},height:{transform:Ve},maxHeight:{transform:Ve},minHeight:{transform:Ve},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Lo=rd;function od(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function ad(e,t){return typeof e=="function"?e(t):e}function sd(){function e(n,r,o,a){const s={[n]:r,theme:o},l=a[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:d,transform:m,style:v}=l;if(r==null)return null;if(d==="typography"&&r==="inherit")return{[n]:r};const g=Sr(o,d)||{};return v?v(s):ut(s,r,h=>{let f=mr(g,m,h);return h===f&&typeof h=="string"&&(f=mr(g,m,`${n}${h==="default"?"":et(h)}`,h)),c===!1?f:{[c]:f}})}function t(n){var r;const{sx:o,theme:a={}}=n||{};if(!o)return null;const s=(r=a.unstable_sxConfig)!=null?r:Lo;function l(c){let d=c;if(typeof c=="function")d=c(a);else if(typeof c!="object")return c;if(!d)return null;const m=bu(a.breakpoints),v=Object.keys(m);let g=m;return Object.keys(d).forEach(u=>{const h=ad(d[u],a);if(h!=null)if(typeof h=="object")if(s[u])g=Rn(g,e(u,h,a,s));else{const f=ut({theme:a},h,b=>({[u]:b}));od(f,h)?g[u]=t({sx:h,theme:a}):g=Rn(g,f)}else g=Rn(g,e(u,h,a,s))}),vu(v,g)}return Array.isArray(o)?o.map(l):l(o)}return t}const Si=sd();Si.filterProps=["sx"];const Vo=Si;function id(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const ld=["breakpoints","palette","spacing","shape"];function Fo(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:a={}}=e,s=me(e,ld),l=fu(n),c=Cu(o);let d=ct({breakpoints:l,direction:"ltr",components:{},palette:j({mode:"light"},r),spacing:c,shape:j({},hu,a)},s);return d.applyStyles=id,d=t.reduce((m,v)=>ct(m,v),d),d.unstable_sxConfig=j({},Lo,s==null?void 0:s.unstable_sxConfig),d.unstable_sx=function(v){return Vo({sx:v,theme:this})},d}function cd(e){return Object.keys(e).length===0}function Ti(e=null){const t=k.useContext(ao.ThemeContext);return!t||cd(t)?e:t}const pd=Fo();function Ci(e=pd){return Ti(e)}const ud=["ownerState"],dd=["variants"],fd=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function md(e){return Object.keys(e).length===0}function hd(e){return typeof e=="string"&&e.charCodeAt(0)>96}function sr(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const gd=Fo(),Ua=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function tr({defaultTheme:e,theme:t,themeId:n}){return md(t)?e:t[n]||t}function bd(e){return e?(t,n)=>n[e]:null}function ir(e,t){let{ownerState:n}=t,r=me(t,ud);const o=typeof e=="function"?e(j({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(a=>ir(a,j({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let l=me(o,dd);return a.forEach(c=>{let d=!0;typeof c.props=="function"?d=c.props(j({ownerState:n},r,n)):Object.keys(c.props).forEach(m=>{(n==null?void 0:n[m])!==c.props[m]&&r[m]!==c.props[m]&&(d=!1)}),d&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(j({ownerState:n},r,n)):c.style))}),l}return o}function vd(e={}){const{themeId:t,defaultTheme:n=gd,rootShouldForwardProp:r=sr,slotShouldForwardProp:o=sr}=e,a=s=>Vo(j({},s,{theme:tr(j({},s,{defaultTheme:n,themeId:t}))}));return a.__mui_systemSx=!0,(s,l={})=>{ao.internal_processStyles(s,y=>y.filter(O=>!(O!=null&&O.__mui_systemSx)));const{name:c,slot:d,skipVariantsResolver:m,skipSx:v,overridesResolver:g=bd(Ua(d))}=l,u=me(l,fd),h=m!==void 0?m:d&&d!=="Root"&&d!=="root"||!1,f=v||!1;let b;process.env.NODE_ENV!=="production"&&c&&(b=`${c}-${Ua(d||"Root")}`);let x=sr;d==="Root"||d==="root"?x=r:d?x=o:hd(s)&&(x=void 0);const N=ao(s,j({shouldForwardProp:x,label:b},u)),w=y=>typeof y=="function"&&y.__emotion_real!==y||Pt(y)?O=>ir(y,j({},O,{theme:tr({theme:O.theme,defaultTheme:n,themeId:t})})):y,E=(y,...O)=>{let R=w(y);const I=O?O.map(w):[];c&&g&&I.push(S=>{const C=tr(j({},S,{defaultTheme:n,themeId:t}));if(!C.components||!C.components[c]||!C.components[c].styleOverrides)return null;const _=C.components[c].styleOverrides,V={};return Object.entries(_).forEach(([H,M])=>{V[H]=ir(M,j({},S,{theme:C}))}),g(S,V)}),c&&!h&&I.push(S=>{var C;const _=tr(j({},S,{defaultTheme:n,themeId:t})),V=_==null||(C=_.components)==null||(C=C[c])==null?void 0:C.variants;return ir({variants:V},j({},S,{theme:_}))}),f||I.push(a);const A=I.length-O.length;if(Array.isArray(y)&&A>0){const S=new Array(A).fill("");R=[...y,...S],R.raw=[...y.raw,...S]}const D=N(R,...I);if(process.env.NODE_ENV!=="production"){let S;c&&(S=`${c}${et(d||"")}`),S===void 0&&(S=`Styled(${Fp(s)})`),D.displayName=S}return s.muiName&&(D.muiName=s.muiName),D};return N.withConfig&&(E.withConfig=N.withConfig),E}}function yd(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:yi(t.components[n].defaultProps,r)}function wd({props:e,name:t,defaultTheme:n,themeId:r}){let o=Ci(n);return r&&(o=o[r]||o),yd({theme:o,name:t,props:e})}function zo(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),pu(e,t,n)}function xd(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Dt(e){if(e.type)return e;if(e.charAt(0)==="#")return Dt(xd(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:en(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:en(10,o))}else r=r.split(",");return r=r.map(a=>parseFloat(a)),{type:n,values:r,colorSpace:o}}function _r(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,a)=>a<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function Ed(e){e=Dt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,a=r*Math.min(o,1-o),s=(d,m=(d+n/30)%12)=>o-a*Math.max(Math.min(m-3,9-m,1),-1);let l="rgb";const c=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),_r({type:l,values:c})}function Ga(e){e=Dt(e);let t=e.type==="hsl"||e.type==="hsla"?Dt(Ed(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function qa(e,t){const n=Ga(e),r=Ga(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function hr(e,t){return e=Dt(e),t=zo(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,_r(e)}function kd(e,t){if(e=Dt(e),t=zo(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return _r(e)}function Sd(e,t){if(e=Dt(e),t=zo(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return _r(e)}function Td(e,t){return j({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const Cd={black:"#000",white:"#fff"},Dn=Cd,Nd={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Rd=Nd,Od={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ft=Od,Pd={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},zt=Pd,jd={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},vn=jd,_d={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ht=_d,Md={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Ut=Md,$d={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Gt=$d,Id=["mode","contrastThreshold","tonalOffset"],Wa={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Dn.white,default:Dn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Kr={text:{primary:Dn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Dn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Xa(e,t,n,r){const o=r.light||r,a=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=Sd(e.main,o):t==="dark"&&(e.dark=kd(e.main,a)))}function Dd(e="light"){return e==="dark"?{main:Ht[200],light:Ht[50],dark:Ht[400]}:{main:Ht[700],light:Ht[400],dark:Ht[800]}}function Ad(e="light"){return e==="dark"?{main:Ft[200],light:Ft[50],dark:Ft[400]}:{main:Ft[500],light:Ft[300],dark:Ft[700]}}function Bd(e="light"){return e==="dark"?{main:zt[500],light:zt[300],dark:zt[700]}:{main:zt[700],light:zt[400],dark:zt[800]}}function Ld(e="light"){return e==="dark"?{main:Ut[400],light:Ut[300],dark:Ut[700]}:{main:Ut[700],light:Ut[500],dark:Ut[900]}}function Vd(e="light"){return e==="dark"?{main:Gt[400],light:Gt[300],dark:Gt[700]}:{main:Gt[800],light:Gt[500],dark:Gt[900]}}function Fd(e="light"){return e==="dark"?{main:vn[400],light:vn[300],dark:vn[700]}:{main:"#ed6c02",light:vn[500],dark:vn[900]}}function zd(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=me(e,Id),a=e.primary||Dd(t),s=e.secondary||Ad(t),l=e.error||Bd(t),c=e.info||Ld(t),d=e.success||Vd(t),m=e.warning||Fd(t);function v(f){const b=qa(f,Kr.text.primary)>=n?Kr.text.primary:Wa.text.primary;if(process.env.NODE_ENV!=="production"){const x=qa(f,b);x<3&&console.error([`MUI: The contrast ratio of ${x}:1 for ${b} on ${f}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return b}const g=({color:f,name:b,mainShade:x=500,lightShade:N=300,darkShade:w=700})=>{if(f=j({},f),!f.main&&f[x]&&(f.main=f[x]),!f.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.`:en(11,b?` (${b})`:"",x));if(typeof f.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(f.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:en(12,b?` (${b})`:"",JSON.stringify(f.main)));return Xa(f,"light",N,r),Xa(f,"dark",w,r),f.contrastText||(f.contrastText=v(f.main)),f},u={dark:Kr,light:Wa};return process.env.NODE_ENV!=="production"&&(u[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),ct(j({common:j({},Dn),mode:t,primary:g({color:a,name:"primary"}),secondary:g({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:g({color:l,name:"error"}),warning:g({color:m,name:"warning"}),info:g({color:c,name:"info"}),success:g({color:d,name:"success"}),grey:Rd,contrastThreshold:n,getContrastText:v,augmentColor:g,tonalOffset:r},u[t]),o)}const Hd=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Ud(e){return Math.round(e*1e5)/1e5}const Ya={textTransform:"uppercase"},Ka='"Roboto", "Helvetica", "Arial", sans-serif';function Gd(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Ka,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:s=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:d=16,allVariants:m,pxToRem:v}=n,g=me(n,Hd);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof d!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const u=o/14,h=v||(x=>`${x/d*u}rem`),f=(x,N,w,E,y)=>j({fontFamily:r,fontWeight:x,fontSize:h(N),lineHeight:w},r===Ka?{letterSpacing:`${Ud(E/N)}em`}:{},y,m),b={h1:f(a,96,1.167,-1.5),h2:f(a,60,1.2,-.5),h3:f(s,48,1.167,0),h4:f(s,34,1.235,.25),h5:f(s,24,1.334,0),h6:f(l,20,1.6,.15),subtitle1:f(s,16,1.75,.15),subtitle2:f(l,14,1.57,.1),body1:f(s,16,1.5,.15),body2:f(s,14,1.43,.15),button:f(l,14,1.75,.4,Ya),caption:f(s,12,1.66,.4),overline:f(s,12,2.66,1,Ya),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return ct(j({htmlFontSize:d,pxToRem:h,fontFamily:r,fontSize:o,fontWeightLight:a,fontWeightRegular:s,fontWeightMedium:l,fontWeightBold:c},b),g,{clone:!1})}const qd=.2,Wd=.14,Xd=.12;function ge(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${qd})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Wd})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Xd})`].join(",")}const Yd=["none",ge(0,2,1,-1,0,1,1,0,0,1,3,0),ge(0,3,1,-2,0,2,2,0,0,1,5,0),ge(0,3,3,-2,0,3,4,0,0,1,8,0),ge(0,2,4,-1,0,4,5,0,0,1,10,0),ge(0,3,5,-1,0,5,8,0,0,1,14,0),ge(0,3,5,-1,0,6,10,0,0,1,18,0),ge(0,4,5,-2,0,7,10,1,0,2,16,1),ge(0,5,5,-3,0,8,10,1,0,3,14,2),ge(0,5,6,-3,0,9,12,1,0,3,16,2),ge(0,6,6,-3,0,10,14,1,0,4,18,3),ge(0,6,7,-4,0,11,15,1,0,4,20,3),ge(0,7,8,-4,0,12,17,2,0,5,22,4),ge(0,7,8,-4,0,13,19,2,0,5,24,4),ge(0,7,9,-4,0,14,21,2,0,5,26,4),ge(0,8,9,-5,0,15,22,2,0,6,28,5),ge(0,8,10,-5,0,16,24,2,0,6,30,5),ge(0,8,11,-5,0,17,26,2,0,6,32,5),ge(0,9,11,-5,0,18,28,2,0,7,34,6),ge(0,9,12,-6,0,19,29,2,0,7,36,6),ge(0,10,13,-6,0,20,31,3,0,8,38,7),ge(0,10,13,-6,0,21,33,3,0,8,40,7),ge(0,10,14,-6,0,22,35,3,0,8,42,7),ge(0,11,14,-7,0,23,36,3,0,9,44,8),ge(0,11,15,-7,0,24,38,3,0,9,46,8)],Kd=Yd,Jd=["duration","easing","delay"],Zd={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Qd={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Ja(e){return`${Math.round(e)}ms`}function ef(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function tf(e){const t=j({},Zd,e.easing),n=j({},Qd,e.duration);return j({getAutoHeightDuration:ef,create:(o=["all"],a={})=>{const{duration:s=n.standard,easing:l=t.easeInOut,delay:c=0}=a,d=me(a,Jd);if(process.env.NODE_ENV!=="production"){const m=g=>typeof g=="string",v=g=>!isNaN(parseFloat(g));!m(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!v(s)&&!m(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),m(l)||console.error('MUI: Argument "easing" must be a string.'),!v(c)&&!m(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(d).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(m=>`${m} ${typeof s=="string"?s:Ja(s)} ${l} ${typeof c=="string"?c:Ja(c)}`).join(",")}},e,{easing:t,duration:n})}const nf={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},rf=nf,of=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function af(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:a={}}=e,s=me(e,of);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":en(18));const l=zd(r),c=Fo(e);let d=ct(c,{mixins:Td(c.breakpoints,n),palette:l,shadows:Kd.slice(),typography:Gd(l,a),transitions:tf(o),zIndex:j({},rf)});if(d=ct(d,s),d=t.reduce((m,v)=>ct(m,v),d),process.env.NODE_ENV!=="production"){const m=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],v=(g,u)=>{let h;for(h in g){const f=g[h];if(m.indexOf(h)!==-1&&Object.keys(f).length>0){if(process.env.NODE_ENV!=="production"){const b=rt("",h);console.error([`MUI: The \`${u}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(g,null,2),"",`Instead, you need to use the '&.${b}' syntax:`,JSON.stringify({root:{[`&.${b}`]:f}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}g[h]={}}}};Object.keys(d.components).forEach(g=>{const u=d.components[g].styleOverrides;u&&g.indexOf("Mui")===0&&v(u,g)})}return d.unstable_sxConfig=j({},Lo,s==null?void 0:s.unstable_sxConfig),d.unstable_sx=function(v){return Vo({sx:v,theme:this})},d}const sf=af(),Ho=sf,Uo="$$material";function mt({props:e,name:t}){return wd({props:e,name:t,defaultTheme:Ho,themeId:Uo})}const Ni=e=>sr(e)&&e!=="classes",lf=vd({themeId:Uo,defaultTheme:Ho,rootShouldForwardProp:Ni}),Oe=lf;function cf(e){return rt("MuiSvgIcon",e)}wt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const pf=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],uf=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${et(t)}`,`fontSize${et(n)}`]};return ft(o,cf,r)},df=Oe("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${et(n.color)}`],t[`fontSize${et(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,a,s,l,c,d,m,v,g,u,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((d=e.typography)==null||(m=d.pxToRem)==null?void 0:m.call(d,35))||"2.1875rem"}[t.fontSize],color:(v=(g=(e.vars||e).palette)==null||(g=g[t.color])==null?void 0:g.main)!=null?v:{action:(u=(e.vars||e).palette)==null||(u=u.action)==null?void 0:u.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),Go=k.forwardRef(function(t,n){const r=mt({props:t,name:"MuiSvgIcon"}),{children:o,className:a,color:s="inherit",component:l="svg",fontSize:c="medium",htmlColor:d,inheritViewBox:m=!1,titleAccess:v,viewBox:g="0 0 24 24"}=r,u=me(r,pf),h=k.isValidElement(o)&&o.type==="svg",f=j({},r,{color:s,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:m,viewBox:g,hasSvgAsChild:h}),b={};m||(b.viewBox=g);const x=uf(f);return p.jsxs(df,j({as:l,className:Ce(x.root,a),focusable:"false",color:d,"aria-hidden":v?void 0:!0,role:v?"img":void 0,ref:n},b,u,h&&o.props,{ownerState:f,children:[h?o.props.children:o,v?p.jsx("title",{children:v}):null]}))});process.env.NODE_ENV!=="production"&&(Go.propTypes={children:i.node,classes:i.object,className:i.string,color:i.oneOfType([i.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),i.string]),component:i.elementType,fontSize:i.oneOfType([i.oneOf(["inherit","large","medium","small"]),i.string]),htmlColor:i.string,inheritViewBox:i.bool,shapeRendering:i.string,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),titleAccess:i.string,viewBox:i.string});Go.muiName="SvgIcon";const Za=Go;function Ri(e,t){function n(r,o){return p.jsx(Za,j({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Za.muiName,k.memo(k.forwardRef(n))}const ff={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),wi.configure(e)}},mf=Object.freeze(Object.defineProperty({__proto__:null,capitalize:et,createChainedFunction:po,createSvgIcon:Ri,debounce:ui,deprecatedPropType:Hp,isMuiElement:Up,ownerDocument:Re,ownerWindow:tn,requirePropFactory:Gp,setRef:fr,unstable_ClassNameGenerator:ff,unstable_useEnhancedEffect:It,unstable_useId:di,unsupportedProp:Xp,useControlled:fi,useEventCallback:In,useForkRef:Ge,useIsFocusVisible:mi},Symbol.toStringTag,{value:"Module"})),hf=xp(mf);var Qa;function gf(){return Qa||(Qa=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=hf}(zr)),zr}var bf=Ep;Object.defineProperty($o,"__esModule",{value:!0});var Oi=$o.default=void 0,vf=bf(gf()),yf=p;Oi=$o.default=(0,vf.default)((0,yf.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function Pi(e){return typeof e=="string"}function Tn(e,t,n){return e===void 0||Pi(e)?t:j({},t,{ownerState:j({},t.ownerState,n)})}const wf={disableDefaultClasses:!1},xf=k.createContext(wf);function Ef(e){const{disableDefaultClasses:t}=k.useContext(xf);return n=>t?"":e(n)}function ji(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function kf(e,t,n){return typeof e=="function"?e(t,n):e}function es(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function Sf(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:a}=e;if(!t){const u=Ce(n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),h=j({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=j({},n,o,r);return u.length>0&&(f.className=u),Object.keys(h).length>0&&(f.style=h),{props:f,internalRef:void 0}}const s=ji(j({},o,r)),l=es(r),c=es(o),d=t(s),m=Ce(d==null?void 0:d.className,n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),v=j({},d==null?void 0:d.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),g=j({},d,n,c,l);return m.length>0&&(g.className=m),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:d.ref}}const Tf=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function At(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:a=!1}=e,s=me(e,Tf),l=a?{}:kf(r,o),{props:c,internalRef:d}=Sf(j({},s,{externalSlotProps:l})),m=Ge(d,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return Tn(n,j({},c,{ref:m}),o)}const _i="base";function Cf(e){return`${_i}--${e}`}function Nf(e,t){return`${_i}-${e}-${t}`}function Mi(e,t){const n=xi[t];return n?Cf(n):Nf(e,t)}function Rf(e,t){const n={};return t.forEach(r=>{n[r]=Mi(e,r)}),n}const Of=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Pf(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function jf(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function _f(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||jf(e))}function Mf(e){const t=[],n=[];return Array.from(e.querySelectorAll(Of)).forEach((r,o)=>{const a=Pf(r);a===-1||!_f(r)||(a===0?t.push(r):n.push({documentOrder:o,tabIndex:a,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function $f(){return!0}function gr(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:a=Mf,isEnabled:s=$f,open:l}=e,c=k.useRef(!1),d=k.useRef(null),m=k.useRef(null),v=k.useRef(null),g=k.useRef(null),u=k.useRef(!1),h=k.useRef(null),f=Ge(t.ref,h),b=k.useRef(null);k.useEffect(()=>{!l||!h.current||(u.current=!n)},[n,l]),k.useEffect(()=>{if(!l||!h.current)return;const w=Re(h.current);return h.current.contains(w.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),u.current&&h.current.focus()),()=>{o||(v.current&&v.current.focus&&(c.current=!0,v.current.focus()),v.current=null)}},[l]),k.useEffect(()=>{if(!l||!h.current)return;const w=Re(h.current),E=R=>{b.current=R,!(r||!s()||R.key!=="Tab")&&w.activeElement===h.current&&R.shiftKey&&(c.current=!0,m.current&&m.current.focus())},y=()=>{const R=h.current;if(R===null)return;if(!w.hasFocus()||!s()||c.current){c.current=!1;return}if(R.contains(w.activeElement)||r&&w.activeElement!==d.current&&w.activeElement!==m.current)return;if(w.activeElement!==g.current)g.current=null;else if(g.current!==null)return;if(!u.current)return;let I=[];if((w.activeElement===d.current||w.activeElement===m.current)&&(I=a(h.current)),I.length>0){var A,D;const S=!!((A=b.current)!=null&&A.shiftKey&&((D=b.current)==null?void 0:D.key)==="Tab"),C=I[0],_=I[I.length-1];typeof C!="string"&&typeof _!="string"&&(S?_.focus():C.focus())}else R.focus()};w.addEventListener("focusin",y),w.addEventListener("keydown",E,!0);const O=setInterval(()=>{w.activeElement&&w.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(O),w.removeEventListener("focusin",y),w.removeEventListener("keydown",E,!0)}},[n,r,o,s,l,a]);const x=w=>{v.current===null&&(v.current=w.relatedTarget),u.current=!0,g.current=w.target;const E=t.props.onFocus;E&&E(w)},N=w=>{v.current===null&&(v.current=w.relatedTarget),u.current=!0};return p.jsxs(k.Fragment,{children:[p.jsx("div",{tabIndex:l?0:-1,onFocus:N,ref:d,"data-testid":"sentinelStart"}),k.cloneElement(t,{ref:f,onFocus:x}),p.jsx("div",{tabIndex:l?0:-1,onFocus:N,ref:m,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(gr.propTypes={children:Un,disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableRestoreFocus:i.bool,getTabbable:i.func,isEnabled:i.func,open:i.bool.isRequired});process.env.NODE_ENV!=="production"&&(gr["propTypes"]=ci(gr.propTypes));function If(e){return typeof e=="function"?e():e}const An=k.forwardRef(function(t,n){const{children:r,container:o,disablePortal:a=!1}=t,[s,l]=k.useState(null),c=Ge(k.isValidElement(r)?r.ref:null,n);if(It(()=>{a||l(If(o)||document.body)},[o,a]),It(()=>{if(s&&!a)return fr(n,s),()=>{fr(n,null)}},[n,s,a]),a){if(k.isValidElement(r)){const d={ref:c};return k.cloneElement(r,d)}return p.jsx(k.Fragment,{children:r})}return p.jsx(k.Fragment,{children:s&&jc.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&(An.propTypes={children:i.node,container:i.oneOfType([pt,i.func]),disablePortal:i.bool});process.env.NODE_ENV!=="production"&&(An["propTypes"]=ci(An.propTypes));function Df(e){const t=Re(e);return t.body===e?tn(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function On(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function ts(e){return parseInt(tn(e).getComputedStyle(e).paddingRight,10)||0}function Af(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function ns(e,t,n,r,o){const a=[t,n,...r];[].forEach.call(e.children,s=>{const l=a.indexOf(s)===-1,c=!Af(s);l&&c&&On(s,o)})}function Jr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function Bf(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(Df(r)){const s=hi(Re(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${ts(r)+s}px`;const l=Re(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${ts(c)+s}px`})}let a;if(r.parentNode instanceof DocumentFragment)a=Re(r).body;else{const s=r.parentElement,l=tn(r);a=(s==null?void 0:s.nodeName)==="HTML"&&l.getComputedStyle(s).overflowY==="scroll"?s:r}n.push({value:a.style.overflow,property:"overflow",el:a},{value:a.style.overflowX,property:"overflow-x",el:a},{value:a.style.overflowY,property:"overflow-y",el:a}),a.style.overflow="hidden"}return()=>{n.forEach(({value:a,el:s,property:l})=>{a?s.style.setProperty(l,a):s.style.removeProperty(l)})}}function Lf(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class Vf{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&On(t.modalRef,!1);const o=Lf(n);ns(n,t.mount,t.modalRef,o,!0);const a=Jr(this.containers,s=>s.container===n);return a!==-1?(this.containers[a].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=Jr(this.containers,a=>a.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=Bf(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=Jr(this.containers,s=>s.modals.indexOf(t)!==-1),a=this.containers[o];if(a.modals.splice(a.modals.indexOf(t),1),this.modals.splice(r,1),a.modals.length===0)a.restore&&a.restore(),t.modalRef&&On(t.modalRef,n),ns(a.container,t.mount,t.modalRef,a.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=a.modals[a.modals.length-1];s.modalRef&&On(s.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Ff(e){return typeof e=="function"?e():e}function zf(e){return e?e.props.hasOwnProperty("in"):!1}const Hf=new Vf;function Uf(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Hf,closeAfterTransition:a=!1,onTransitionEnter:s,onTransitionExited:l,children:c,onClose:d,open:m,rootRef:v}=e,g=k.useRef({}),u=k.useRef(null),h=k.useRef(null),f=Ge(h,v),[b,x]=k.useState(!m),N=zf(c);let w=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(w=!1);const E=()=>Re(u.current),y=()=>(g.current.modalRef=h.current,g.current.mount=u.current,g.current),O=()=>{o.mount(y(),{disableScrollLock:r}),h.current&&(h.current.scrollTop=0)},R=In(()=>{const M=Ff(t)||E().body;o.add(y(),M),h.current&&O()}),I=k.useCallback(()=>o.isTopModal(y()),[o]),A=In(M=>{u.current=M,M&&(m&&I()?O():h.current&&On(h.current,w))}),D=k.useCallback(()=>{o.remove(y(),w)},[w,o]);k.useEffect(()=>()=>{D()},[D]),k.useEffect(()=>{m?R():(!N||!a)&&D()},[m,D,N,a,R]);const S=M=>L=>{var J;(J=M.onKeyDown)==null||J.call(M,L),!(L.key!=="Escape"||L.which===229||!I())&&(n||(L.stopPropagation(),d&&d(L,"escapeKeyDown")))},C=M=>L=>{var J;(J=M.onClick)==null||J.call(M,L),L.target===L.currentTarget&&d&&d(L,"backdropClick")};return{getRootProps:(M={})=>{const L=ji(e);delete L.onTransitionEnter,delete L.onTransitionExited;const J=j({},L,M);return j({role:"presentation"},J,{onKeyDown:S(J),ref:f})},getBackdropProps:(M={})=>{const L=M;return j({"aria-hidden":!0},L,{onClick:C(L),open:m})},getTransitionProps:()=>{const M=()=>{x(!1),s&&s()},L=()=>{x(!0),l&&l(),a&&D()};return{onEnter:po(M,c==null?void 0:c.props.onEnter),onExited:po(L,c==null?void 0:c.props.onExited)}},rootRef:f,portalRef:A,isTopModal:I,exited:b,hasTransition:N}}var Me="top",qe="bottom",We="right",$e="left",qo="auto",Xn=[Me,qe,We,$e],nn="start",Bn="end",Gf="clippingParents",$i="viewport",yn="popper",qf="reference",rs=Xn.reduce(function(e,t){return e.concat([t+"-"+nn,t+"-"+Bn])},[]),Ii=[].concat(Xn,[qo]).reduce(function(e,t){return e.concat([t,t+"-"+nn,t+"-"+Bn])},[]),Wf="beforeRead",Xf="read",Yf="afterRead",Kf="beforeMain",Jf="main",Zf="afterMain",Qf="beforeWrite",em="write",tm="afterWrite",nm=[Wf,Xf,Yf,Kf,Jf,Zf,Qf,em,tm];function tt(e){return e?(e.nodeName||"").toLowerCase():null}function Fe(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Bt(e){var t=Fe(e).Element;return e instanceof t||e instanceof Element}function Ue(e){var t=Fe(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Wo(e){if(typeof ShadowRoot>"u")return!1;var t=Fe(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function rm(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},a=t.elements[n];!Ue(a)||!tt(a)||(Object.assign(a.style,r),Object.keys(o).forEach(function(s){var l=o[s];l===!1?a.removeAttribute(s):a.setAttribute(s,l===!0?"":l)}))})}function om(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],a=t.attributes[r]||{},s=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=s.reduce(function(c,d){return c[d]="",c},{});!Ue(o)||!tt(o)||(Object.assign(o.style,l),Object.keys(a).forEach(function(c){o.removeAttribute(c)}))})}}const am={name:"applyStyles",enabled:!0,phase:"write",fn:rm,effect:om,requires:["computeStyles"]};function Ze(e){return e.split("-")[0]}var _t=Math.max,br=Math.min,rn=Math.round;function mo(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Di(){return!/^((?!chrome|android).)*safari/i.test(mo())}function on(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,a=1;t&&Ue(e)&&(o=e.offsetWidth>0&&rn(r.width)/e.offsetWidth||1,a=e.offsetHeight>0&&rn(r.height)/e.offsetHeight||1);var s=Bt(e)?Fe(e):window,l=s.visualViewport,c=!Di()&&n,d=(r.left+(c&&l?l.offsetLeft:0))/o,m=(r.top+(c&&l?l.offsetTop:0))/a,v=r.width/o,g=r.height/a;return{width:v,height:g,top:m,right:d+v,bottom:m+g,left:d,x:d,y:m}}function Xo(e){var t=on(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Ai(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Wo(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function dt(e){return Fe(e).getComputedStyle(e)}function sm(e){return["table","td","th"].indexOf(tt(e))>=0}function Et(e){return((Bt(e)?e.ownerDocument:e.document)||window.document).documentElement}function Mr(e){return tt(e)==="html"?e:e.assignedSlot||e.parentNode||(Wo(e)?e.host:null)||Et(e)}function os(e){return!Ue(e)||dt(e).position==="fixed"?null:e.offsetParent}function im(e){var t=/firefox/i.test(mo()),n=/Trident/i.test(mo());if(n&&Ue(e)){var r=dt(e);if(r.position==="fixed")return null}var o=Mr(e);for(Wo(o)&&(o=o.host);Ue(o)&&["html","body"].indexOf(tt(o))<0;){var a=dt(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function Yn(e){for(var t=Fe(e),n=os(e);n&&sm(n)&&dt(n).position==="static";)n=os(n);return n&&(tt(n)==="html"||tt(n)==="body"&&dt(n).position==="static")?t:n||im(e)||t}function Yo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Pn(e,t,n){return _t(e,br(t,n))}function lm(e,t,n){var r=Pn(e,t,n);return r>n?n:r}function Bi(){return{top:0,right:0,bottom:0,left:0}}function Li(e){return Object.assign({},Bi(),e)}function Vi(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var cm=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Li(typeof t!="number"?t:Vi(t,Xn))};function pm(e){var t,n=e.state,r=e.name,o=e.options,a=n.elements.arrow,s=n.modifiersData.popperOffsets,l=Ze(n.placement),c=Yo(l),d=[$e,We].indexOf(l)>=0,m=d?"height":"width";if(!(!a||!s)){var v=cm(o.padding,n),g=Xo(a),u=c==="y"?Me:$e,h=c==="y"?qe:We,f=n.rects.reference[m]+n.rects.reference[c]-s[c]-n.rects.popper[m],b=s[c]-n.rects.reference[c],x=Yn(a),N=x?c==="y"?x.clientHeight||0:x.clientWidth||0:0,w=f/2-b/2,E=v[u],y=N-g[m]-v[h],O=N/2-g[m]/2+w,R=Pn(E,O,y),I=c;n.modifiersData[r]=(t={},t[I]=R,t.centerOffset=R-O,t)}}function um(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Ai(t.elements.popper,o)&&(t.elements.arrow=o))}const dm={name:"arrow",enabled:!0,phase:"main",fn:pm,effect:um,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function an(e){return e.split("-")[1]}var fm={top:"auto",right:"auto",bottom:"auto",left:"auto"};function mm(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:rn(n*o)/o||0,y:rn(r*o)/o||0}}function as(e){var t,n=e.popper,r=e.popperRect,o=e.placement,a=e.variation,s=e.offsets,l=e.position,c=e.gpuAcceleration,d=e.adaptive,m=e.roundOffsets,v=e.isFixed,g=s.x,u=g===void 0?0:g,h=s.y,f=h===void 0?0:h,b=typeof m=="function"?m({x:u,y:f}):{x:u,y:f};u=b.x,f=b.y;var x=s.hasOwnProperty("x"),N=s.hasOwnProperty("y"),w=$e,E=Me,y=window;if(d){var O=Yn(n),R="clientHeight",I="clientWidth";if(O===Fe(n)&&(O=Et(n),dt(O).position!=="static"&&l==="absolute"&&(R="scrollHeight",I="scrollWidth")),O=O,o===Me||(o===$e||o===We)&&a===Bn){E=qe;var A=v&&O===y&&y.visualViewport?y.visualViewport.height:O[R];f-=A-r.height,f*=c?1:-1}if(o===$e||(o===Me||o===qe)&&a===Bn){w=We;var D=v&&O===y&&y.visualViewport?y.visualViewport.width:O[I];u-=D-r.width,u*=c?1:-1}}var S=Object.assign({position:l},d&&fm),C=m===!0?mm({x:u,y:f},Fe(n)):{x:u,y:f};if(u=C.x,f=C.y,c){var _;return Object.assign({},S,(_={},_[E]=N?"0":"",_[w]=x?"0":"",_.transform=(y.devicePixelRatio||1)<=1?"translate("+u+"px, "+f+"px)":"translate3d("+u+"px, "+f+"px, 0)",_))}return Object.assign({},S,(t={},t[E]=N?f+"px":"",t[w]=x?u+"px":"",t.transform="",t))}function hm(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,a=n.adaptive,s=a===void 0?!0:a,l=n.roundOffsets,c=l===void 0?!0:l,d={placement:Ze(t.placement),variation:an(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,as(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,as(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const gm={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:hm,data:{}};var nr={passive:!0};function bm(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,a=o===void 0?!0:o,s=r.resize,l=s===void 0?!0:s,c=Fe(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&d.forEach(function(m){m.addEventListener("scroll",n.update,nr)}),l&&c.addEventListener("resize",n.update,nr),function(){a&&d.forEach(function(m){m.removeEventListener("scroll",n.update,nr)}),l&&c.removeEventListener("resize",n.update,nr)}}const vm={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:bm,data:{}};var ym={left:"right",right:"left",bottom:"top",top:"bottom"};function lr(e){return e.replace(/left|right|bottom|top/g,function(t){return ym[t]})}var wm={start:"end",end:"start"};function ss(e){return e.replace(/start|end/g,function(t){return wm[t]})}function Ko(e){var t=Fe(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Jo(e){return on(Et(e)).left+Ko(e).scrollLeft}function xm(e,t){var n=Fe(e),r=Et(e),o=n.visualViewport,a=r.clientWidth,s=r.clientHeight,l=0,c=0;if(o){a=o.width,s=o.height;var d=Di();(d||!d&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:a,height:s,x:l+Jo(e),y:c}}function Em(e){var t,n=Et(e),r=Ko(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=_t(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=_t(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Jo(e),c=-r.scrollTop;return dt(o||n).direction==="rtl"&&(l+=_t(n.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:l,y:c}}function Zo(e){var t=dt(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Fi(e){return["html","body","#document"].indexOf(tt(e))>=0?e.ownerDocument.body:Ue(e)&&Zo(e)?e:Fi(Mr(e))}function jn(e,t){var n;t===void 0&&(t=[]);var r=Fi(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),a=Fe(r),s=o?[a].concat(a.visualViewport||[],Zo(r)?r:[]):r,l=t.concat(s);return o?l:l.concat(jn(Mr(s)))}function ho(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function km(e,t){var n=on(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function is(e,t,n){return t===$i?ho(xm(e,n)):Bt(t)?km(t,n):ho(Em(Et(e)))}function Sm(e){var t=jn(Mr(e)),n=["absolute","fixed"].indexOf(dt(e).position)>=0,r=n&&Ue(e)?Yn(e):e;return Bt(r)?t.filter(function(o){return Bt(o)&&Ai(o,r)&&tt(o)!=="body"}):[]}function Tm(e,t,n,r){var o=t==="clippingParents"?Sm(e):[].concat(t),a=[].concat(o,[n]),s=a[0],l=a.reduce(function(c,d){var m=is(e,d,r);return c.top=_t(m.top,c.top),c.right=br(m.right,c.right),c.bottom=br(m.bottom,c.bottom),c.left=_t(m.left,c.left),c},is(e,s,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function zi(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ze(r):null,a=r?an(r):null,s=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Me:c={x:s,y:t.y-n.height};break;case qe:c={x:s,y:t.y+t.height};break;case We:c={x:t.x+t.width,y:l};break;case $e:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var d=o?Yo(o):null;if(d!=null){var m=d==="y"?"height":"width";switch(a){case nn:c[d]=c[d]-(t[m]/2-n[m]/2);break;case Bn:c[d]=c[d]+(t[m]/2-n[m]/2);break}}return c}function Ln(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,a=n.strategy,s=a===void 0?e.strategy:a,l=n.boundary,c=l===void 0?Gf:l,d=n.rootBoundary,m=d===void 0?$i:d,v=n.elementContext,g=v===void 0?yn:v,u=n.altBoundary,h=u===void 0?!1:u,f=n.padding,b=f===void 0?0:f,x=Li(typeof b!="number"?b:Vi(b,Xn)),N=g===yn?qf:yn,w=e.rects.popper,E=e.elements[h?N:g],y=Tm(Bt(E)?E:E.contextElement||Et(e.elements.popper),c,m,s),O=on(e.elements.reference),R=zi({reference:O,element:w,strategy:"absolute",placement:o}),I=ho(Object.assign({},w,R)),A=g===yn?I:O,D={top:y.top-A.top+x.top,bottom:A.bottom-y.bottom+x.bottom,left:y.left-A.left+x.left,right:A.right-y.right+x.right},S=e.modifiersData.offset;if(g===yn&&S){var C=S[o];Object.keys(D).forEach(function(_){var V=[We,qe].indexOf(_)>=0?1:-1,H=[Me,qe].indexOf(_)>=0?"y":"x";D[_]+=C[H]*V})}return D}function Cm(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,a=n.rootBoundary,s=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,d=c===void 0?Ii:c,m=an(r),v=m?l?rs:rs.filter(function(h){return an(h)===m}):Xn,g=v.filter(function(h){return d.indexOf(h)>=0});g.length===0&&(g=v);var u=g.reduce(function(h,f){return h[f]=Ln(e,{placement:f,boundary:o,rootBoundary:a,padding:s})[Ze(f)],h},{});return Object.keys(u).sort(function(h,f){return u[h]-u[f]})}function Nm(e){if(Ze(e)===qo)return[];var t=lr(e);return[ss(e),t,ss(t)]}function Rm(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,a=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!0:s,c=n.fallbackPlacements,d=n.padding,m=n.boundary,v=n.rootBoundary,g=n.altBoundary,u=n.flipVariations,h=u===void 0?!0:u,f=n.allowedAutoPlacements,b=t.options.placement,x=Ze(b),N=x===b,w=c||(N||!h?[lr(b)]:Nm(b)),E=[b].concat(w).reduce(function(G,q){return G.concat(Ze(q)===qo?Cm(t,{placement:q,boundary:m,rootBoundary:v,padding:d,flipVariations:h,allowedAutoPlacements:f}):q)},[]),y=t.rects.reference,O=t.rects.popper,R=new Map,I=!0,A=E[0],D=0;D<E.length;D++){var S=E[D],C=Ze(S),_=an(S)===nn,V=[Me,qe].indexOf(C)>=0,H=V?"width":"height",M=Ln(t,{placement:S,boundary:m,rootBoundary:v,altBoundary:g,padding:d}),L=V?_?We:$e:_?qe:Me;y[H]>O[H]&&(L=lr(L));var J=lr(L),Q=[];if(a&&Q.push(M[C]<=0),l&&Q.push(M[L]<=0,M[J]<=0),Q.every(function(G){return G})){A=S,I=!1;break}R.set(S,Q)}if(I)for(var P=h?3:1,$=function(q){var Y=E.find(function(K){var W=R.get(K);if(W)return W.slice(0,q).every(function(Z){return Z})});if(Y)return A=Y,"break"},U=P;U>0;U--){var X=$(U);if(X==="break")break}t.placement!==A&&(t.modifiersData[r]._skip=!0,t.placement=A,t.reset=!0)}}const Om={name:"flip",enabled:!0,phase:"main",fn:Rm,requiresIfExists:["offset"],data:{_skip:!1}};function ls(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function cs(e){return[Me,We,qe,$e].some(function(t){return e[t]>=0})}function Pm(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,s=Ln(t,{elementContext:"reference"}),l=Ln(t,{altBoundary:!0}),c=ls(s,r),d=ls(l,o,a),m=cs(c),v=cs(d);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:d,isReferenceHidden:m,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":m,"data-popper-escaped":v})}const jm={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Pm};function _m(e,t,n){var r=Ze(e),o=[$e,Me].indexOf(r)>=0?-1:1,a=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,s=a[0],l=a[1];return s=s||0,l=(l||0)*o,[$e,We].indexOf(r)>=0?{x:l,y:s}:{x:s,y:l}}function Mm(e){var t=e.state,n=e.options,r=e.name,o=n.offset,a=o===void 0?[0,0]:o,s=Ii.reduce(function(m,v){return m[v]=_m(v,t.rects,a),m},{}),l=s[t.placement],c=l.x,d=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=d),t.modifiersData[r]=s}const $m={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Mm};function Im(e){var t=e.state,n=e.name;t.modifiersData[n]=zi({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Dm={name:"popperOffsets",enabled:!0,phase:"read",fn:Im,data:{}};function Am(e){return e==="x"?"y":"x"}function Bm(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,a=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!1:s,c=n.boundary,d=n.rootBoundary,m=n.altBoundary,v=n.padding,g=n.tether,u=g===void 0?!0:g,h=n.tetherOffset,f=h===void 0?0:h,b=Ln(t,{boundary:c,rootBoundary:d,padding:v,altBoundary:m}),x=Ze(t.placement),N=an(t.placement),w=!N,E=Yo(x),y=Am(E),O=t.modifiersData.popperOffsets,R=t.rects.reference,I=t.rects.popper,A=typeof f=="function"?f(Object.assign({},t.rects,{placement:t.placement})):f,D=typeof A=="number"?{mainAxis:A,altAxis:A}:Object.assign({mainAxis:0,altAxis:0},A),S=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,C={x:0,y:0};if(O){if(a){var _,V=E==="y"?Me:$e,H=E==="y"?qe:We,M=E==="y"?"height":"width",L=O[E],J=L+b[V],Q=L-b[H],P=u?-I[M]/2:0,$=N===nn?R[M]:I[M],U=N===nn?-I[M]:-R[M],X=t.elements.arrow,G=u&&X?Xo(X):{width:0,height:0},q=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Bi(),Y=q[V],K=q[H],W=Pn(0,R[M],G[M]),Z=w?R[M]/2-P-W-Y-D.mainAxis:$-W-Y-D.mainAxis,ee=w?-R[M]/2+P+W+K+D.mainAxis:U+W+K+D.mainAxis,se=t.elements.arrow&&Yn(t.elements.arrow),F=se?E==="y"?se.clientTop||0:se.clientLeft||0:0,te=(_=S==null?void 0:S[E])!=null?_:0,B=L+Z-te-F,ie=L+ee-te,Se=Pn(u?br(J,B):J,L,u?_t(Q,ie):Q);O[E]=Se,C[E]=Se-L}if(l){var Pe,xe=E==="x"?Me:$e,kt=E==="x"?qe:We,je=O[y],ot=y==="y"?"height":"width",Ae=je+b[xe],at=je-b[kt],Te=[Me,$e].indexOf(x)!==-1,Vt=(Pe=S==null?void 0:S[y])!=null?Pe:0,St=Te?Ae:je-R[ot]-I[ot]-Vt+D.altAxis,un=Te?je+R[ot]+I[ot]-Vt-D.altAxis:at,Jn=u&&Te?lm(St,je,un):Pn(u?St:Ae,je,u?un:at);O[y]=Jn,C[y]=Jn-je}t.modifiersData[r]=C}}const Lm={name:"preventOverflow",enabled:!0,phase:"main",fn:Bm,requiresIfExists:["offset"]};function Vm(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Fm(e){return e===Fe(e)||!Ue(e)?Ko(e):Vm(e)}function zm(e){var t=e.getBoundingClientRect(),n=rn(t.width)/e.offsetWidth||1,r=rn(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Hm(e,t,n){n===void 0&&(n=!1);var r=Ue(t),o=Ue(t)&&zm(t),a=Et(t),s=on(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((tt(t)!=="body"||Zo(a))&&(l=Fm(t)),Ue(t)?(c=on(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):a&&(c.x=Jo(a))),{x:s.left+l.scrollLeft-c.x,y:s.top+l.scrollTop-c.y,width:s.width,height:s.height}}function Um(e){var t=new Map,n=new Set,r=[];e.forEach(function(a){t.set(a.name,a)});function o(a){n.add(a.name);var s=[].concat(a.requires||[],a.requiresIfExists||[]);s.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(a)}return e.forEach(function(a){n.has(a.name)||o(a)}),r}function Gm(e){var t=Um(e);return nm.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function qm(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Wm(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var ps={placement:"bottom",modifiers:[],strategy:"absolute"};function us(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Xm(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,a=o===void 0?ps:o;return function(l,c,d){d===void 0&&(d=a);var m={placement:"bottom",orderedModifiers:[],options:Object.assign({},ps,a),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},v=[],g=!1,u={state:m,setOptions:function(x){var N=typeof x=="function"?x(m.options):x;f(),m.options=Object.assign({},a,m.options,N),m.scrollParents={reference:Bt(l)?jn(l):l.contextElement?jn(l.contextElement):[],popper:jn(c)};var w=Gm(Wm([].concat(r,m.options.modifiers)));return m.orderedModifiers=w.filter(function(E){return E.enabled}),h(),u.update()},forceUpdate:function(){if(!g){var x=m.elements,N=x.reference,w=x.popper;if(us(N,w)){m.rects={reference:Hm(N,Yn(w),m.options.strategy==="fixed"),popper:Xo(w)},m.reset=!1,m.placement=m.options.placement,m.orderedModifiers.forEach(function(D){return m.modifiersData[D.name]=Object.assign({},D.data)});for(var E=0;E<m.orderedModifiers.length;E++){if(m.reset===!0){m.reset=!1,E=-1;continue}var y=m.orderedModifiers[E],O=y.fn,R=y.options,I=R===void 0?{}:R,A=y.name;typeof O=="function"&&(m=O({state:m,options:I,name:A,instance:u})||m)}}}},update:qm(function(){return new Promise(function(b){u.forceUpdate(),b(m)})}),destroy:function(){f(),g=!0}};if(!us(l,c))return u;u.setOptions(d).then(function(b){!g&&d.onFirstUpdate&&d.onFirstUpdate(b)});function h(){m.orderedModifiers.forEach(function(b){var x=b.name,N=b.options,w=N===void 0?{}:N,E=b.effect;if(typeof E=="function"){var y=E({state:m,name:x,instance:u,options:w}),O=function(){};v.push(y||O)}})}function f(){v.forEach(function(b){return b()}),v=[]}return u}}var Ym=[vm,Dm,gm,am,$m,Om,Lm,dm,jm],Km=Xm({defaultModifiers:Ym});const Hi="Popper";function Jm(e){return Mi(Hi,e)}Rf(Hi,["root"]);const Zm=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Qm=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function eh(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function vr(e){return typeof e=="function"?e():e}function $r(e){return e.nodeType!==void 0}function th(e){return!$r(e)}const nh=()=>ft({root:["root"]},Ef(Jm)),rh={},oh=k.forwardRef(function(t,n){var r;const{anchorEl:o,children:a,direction:s,disablePortal:l,modifiers:c,open:d,placement:m,popperOptions:v,popperRef:g,slotProps:u={},slots:h={},TransitionProps:f}=t,b=me(t,Zm),x=k.useRef(null),N=Ge(x,n),w=k.useRef(null),E=Ge(w,g),y=k.useRef(E);It(()=>{y.current=E},[E]),k.useImperativeHandle(g,()=>w.current,[]);const O=eh(m,s),[R,I]=k.useState(O),[A,D]=k.useState(vr(o));k.useEffect(()=>{w.current&&w.current.forceUpdate()}),k.useEffect(()=>{o&&D(vr(o))},[o]),It(()=>{if(!A||!d)return;const H=J=>{I(J.placement)};if(process.env.NODE_ENV!=="production"&&A&&$r(A)&&A.nodeType===1){const J=A.getBoundingClientRect();process.env.NODE_ENV!=="test"&&J.top===0&&J.left===0&&J.right===0&&J.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let M=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:J})=>{H(J)}}];c!=null&&(M=M.concat(c)),v&&v.modifiers!=null&&(M=M.concat(v.modifiers));const L=Km(A,x.current,j({placement:O},v,{modifiers:M}));return y.current(L),()=>{L.destroy(),y.current(null)}},[A,l,c,d,v,O]);const S={placement:R};f!==null&&(S.TransitionProps=f);const C=nh(),_=(r=h.root)!=null?r:"div",V=At({elementType:_,externalSlotProps:u.root,externalForwardedProps:b,additionalProps:{role:"tooltip",ref:N},ownerState:t,className:C.root});return p.jsx(_,j({},V,{children:typeof a=="function"?a(S):a}))}),Ui=k.forwardRef(function(t,n){const{anchorEl:r,children:o,container:a,direction:s="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:d,open:m,placement:v="bottom",popperOptions:g=rh,popperRef:u,style:h,transition:f=!1,slotProps:b={},slots:x={}}=t,N=me(t,Qm),[w,E]=k.useState(!0),y=()=>{E(!1)},O=()=>{E(!0)};if(!c&&!m&&(!f||w))return null;let R;if(a)R=a;else if(r){const D=vr(r);R=D&&$r(D)?Re(D).body:Re(null).body}const I=!m&&c&&(!f||w)?"none":void 0,A=f?{in:m,onEnter:y,onExited:O}:void 0;return p.jsx(An,{disablePortal:l,container:R,children:p.jsx(oh,j({anchorEl:r,direction:s,disablePortal:l,modifiers:d,ref:n,open:f?!w:m,placement:v,popperOptions:g,popperRef:u,slotProps:b,slots:x},N,{style:j({position:"fixed",top:0,left:0,display:I},h),TransitionProps:A,children:o}))})});process.env.NODE_ENV!=="production"&&(Ui.propTypes={anchorEl:cn(i.oneOfType([pt,i.object,i.func]),e=>{if(e.open){const t=vr(e.anchorEl);if(t&&$r(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||th(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:i.oneOfType([i.node,i.func]),container:i.oneOfType([pt,i.func]),direction:i.oneOf(["ltr","rtl"]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:Do,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),transition:i.bool});function Kn(){const e=Ci(Ho);return process.env.NODE_ENV!=="production"&&k.useDebugValue(e),e[Uo]||e}function go(e,t){return go=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},go(e,t)}function ah(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,go(e,t)}const ds={disabled:!1};var sh=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.shape({enter:i.number,exit:i.number,appear:i.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&i.oneOfType([i.string,i.shape({enter:i.string,exit:i.string,active:i.string}),i.shape({enter:i.string,enterDone:i.string,enterActive:i.string,exit:i.string,exitDone:i.string,exitActive:i.string})]);const Gi=T.createContext(null);var ih=function(t){return t.scrollTop},Cn="unmounted",Ct="exited",Nt="entering",Xt="entered",bo="exiting",ht=function(e){ah(t,e);function t(r,o){var a;a=e.call(this,r,o)||this;var s=o,l=s&&!s.isMounting?r.enter:r.appear,c;return a.appearStatus=null,r.in?l?(c=Ct,a.appearStatus=Nt):c=Xt:r.unmountOnExit||r.mountOnEnter?c=Cn:c=Ct,a.state={status:c},a.nextCallback=null,a}t.getDerivedStateFromProps=function(o,a){var s=o.in;return s&&a.status===Cn?{status:Ct}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var a=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==Nt&&s!==Xt&&(a=Nt):(s===Nt||s===Xt)&&(a=bo)}this.updateStatus(!1,a)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,a,s,l;return a=s=l=o,o!=null&&typeof o!="number"&&(a=o.exit,s=o.enter,l=o.appear!==void 0?o.appear:s),{exit:a,enter:s,appear:l}},n.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===Nt){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:kn.findDOMNode(this);s&&ih(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Ct&&this.setState({status:Cn})},n.performEnter=function(o){var a=this,s=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[kn.findDOMNode(this),l],d=c[0],m=c[1],v=this.getTimeouts(),g=l?v.appear:v.enter;if(!o&&!s||ds.disabled){this.safeSetState({status:Xt},function(){a.props.onEntered(d)});return}this.props.onEnter(d,m),this.safeSetState({status:Nt},function(){a.props.onEntering(d,m),a.onTransitionEnd(g,function(){a.safeSetState({status:Xt},function(){a.props.onEntered(d,m)})})})},n.performExit=function(){var o=this,a=this.props.exit,s=this.getTimeouts(),l=this.props.nodeRef?void 0:kn.findDOMNode(this);if(!a||ds.disabled){this.safeSetState({status:Ct},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:bo},function(){o.props.onExiting(l),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:Ct},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},n.setNextCallback=function(o){var a=this,s=!0;return this.nextCallback=function(l){s&&(s=!1,a.nextCallback=null,o(l))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},n.onTransitionEnd=function(o,a){this.setNextCallback(a);var s=this.props.nodeRef?this.props.nodeRef.current:kn.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!s||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],d=c[0],m=c[1];this.props.addEndListener(d,m)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===Cn)return null;var a=this.props,s=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var l=me(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return T.createElement(Gi.Provider,{value:null},typeof s=="function"?s(o,l):T.cloneElement(T.Children.only(s),l))},t}(T.Component);ht.contextType=Gi;ht.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:i.shape({current:typeof Element>"u"?i.any:function(e,t,n,r,o,a){var s=e[t];return i.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,a)}}),children:i.oneOfType([i.func.isRequired,i.element.isRequired]).isRequired,in:i.bool,mountOnEnter:i.bool,unmountOnExit:i.bool,appear:i.bool,enter:i.bool,exit:i.bool,timeout:function(t){var n=sh;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),a=1;a<r;a++)o[a-1]=arguments[a];return n.apply(void 0,[t].concat(o))},addEndListener:i.func,onEnter:i.func,onEntering:i.func,onEntered:i.func,onExit:i.func,onExiting:i.func,onExited:i.func}:{};function qt(){}ht.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:qt,onEntering:qt,onEntered:qt,onExit:qt,onExiting:qt,onExited:qt};ht.UNMOUNTED=Cn;ht.EXITED=Ct;ht.ENTERING=Nt;ht.ENTERED=Xt;ht.EXITING=bo;const qi=ht,Wi=e=>e.scrollTop;function yr(e,t){var n,r;const{timeout:o,easing:a,style:s={}}=e;return{duration:(n=s.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof a=="object"?a[t.mode]:a,delay:s.transitionDelay}}const lh=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function vo(e){return`scale(${e}, ${e**2})`}const ch={entering:{opacity:1,transform:vo(1)},entered:{opacity:1,transform:"none"}},Zr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Qo=k.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:a,easing:s,in:l,onEnter:c,onEntered:d,onEntering:m,onExit:v,onExited:g,onExiting:u,style:h,timeout:f="auto",TransitionComponent:b=qi}=t,x=me(t,lh),N=Sn(),w=k.useRef(),E=Kn(),y=k.useRef(null),O=Ge(y,a.ref,n),R=H=>M=>{if(H){const L=y.current;M===void 0?H(L):H(L,M)}},I=R(m),A=R((H,M)=>{Wi(H);const{duration:L,delay:J,easing:Q}=yr({style:h,timeout:f,easing:s},{mode:"enter"});let P;f==="auto"?(P=E.transitions.getAutoHeightDuration(H.clientHeight),w.current=P):P=L,H.style.transition=[E.transitions.create("opacity",{duration:P,delay:J}),E.transitions.create("transform",{duration:Zr?P:P*.666,delay:J,easing:Q})].join(","),c&&c(H,M)}),D=R(d),S=R(u),C=R(H=>{const{duration:M,delay:L,easing:J}=yr({style:h,timeout:f,easing:s},{mode:"exit"});let Q;f==="auto"?(Q=E.transitions.getAutoHeightDuration(H.clientHeight),w.current=Q):Q=M,H.style.transition=[E.transitions.create("opacity",{duration:Q,delay:L}),E.transitions.create("transform",{duration:Zr?Q:Q*.666,delay:Zr?L:L||Q*.333,easing:J})].join(","),H.style.opacity=0,H.style.transform=vo(.75),v&&v(H)}),_=R(g),V=H=>{f==="auto"&&N.start(w.current||0,H),r&&r(y.current,H)};return p.jsx(b,j({appear:o,in:l,nodeRef:y,onEnter:A,onEntered:D,onEntering:I,onExit:C,onExited:_,onExiting:S,addEndListener:V,timeout:f==="auto"?null:f},x,{children:(H,M)=>k.cloneElement(a,j({style:j({opacity:0,transform:vo(.75),visibility:H==="exited"&&!l?"hidden":void 0},ch[H],h,a.props.style),ref:O},M))}))});process.env.NODE_ENV!=="production"&&(Qo.propTypes={addEndListener:i.func,appear:i.bool,children:Un.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});Qo.muiSupportAuto=!0;const yo=Qo,ph=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},fs=ph,uh=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],dh=Oe(Ui,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Xi=k.forwardRef(function(t,n){var r;const o=Ti(),a=mt({props:t,name:"MuiPopper"}),{anchorEl:s,component:l,components:c,componentsProps:d,container:m,disablePortal:v,keepMounted:g,modifiers:u,open:h,placement:f,popperOptions:b,popperRef:x,transition:N,slots:w,slotProps:E}=a,y=me(a,uh),O=(r=w==null?void 0:w.root)!=null?r:c==null?void 0:c.Root,R=j({anchorEl:s,container:m,disablePortal:v,keepMounted:g,modifiers:u,open:h,placement:f,popperOptions:b,popperRef:x,transition:N},y);return p.jsx(dh,j({as:l,direction:o==null?void 0:o.direction,slots:{root:O},slotProps:E??d},R,{ref:n}))});process.env.NODE_ENV!=="production"&&(Xi.propTypes={anchorEl:i.oneOfType([pt,i.object,i.func]),children:i.oneOfType([i.node,i.func]),component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:Do,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transition:i.bool});const Yi=Xi;function fh(e){return rt("MuiTooltip",e)}const mh=wt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),yt=mh,hh=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function gh(e){return Math.round(e*1e5)/1e5}const bh=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:a}=e,s={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${et(a.split("-")[0])}`],arrow:["arrow"]};return ft(s,fh,t)},vh=Oe(Yi,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>j({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${yt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${yt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${yt.arrow}`]:j({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${yt.arrow}`]:j({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),yh=Oe("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${et(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>j({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:hr(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${gh(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${yt.popper}[data-popper-placement*="left"] &`]:j({transformOrigin:"right center"},t.isRtl?j({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):j({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${yt.popper}[data-popper-placement*="right"] &`]:j({transformOrigin:"left center"},t.isRtl?j({marginRight:"14px"},t.touch&&{marginRight:"24px"}):j({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${yt.popper}[data-popper-placement*="top"] &`]:j({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${yt.popper}[data-popper-placement*="bottom"] &`]:j({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),wh=Oe("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:hr(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let rr=!1;const ms=new Gn;let wn={x:0,y:0};function or(e,t){return n=>{t&&t(n),e(n)}}const Ki=k.forwardRef(function(t,n){var r,o,a,s,l,c,d,m,v,g,u,h,f,b,x,N,w,E,y;const O=mt({props:t,name:"MuiTooltip"}),{arrow:R=!1,children:I,components:A={},componentsProps:D={},describeChild:S=!1,disableFocusListener:C=!1,disableHoverListener:_=!1,disableInteractive:V=!1,disableTouchListener:H=!1,enterDelay:M=100,enterNextDelay:L=0,enterTouchDelay:J=700,followCursor:Q=!1,id:P,leaveDelay:$=0,leaveTouchDelay:U=1500,onClose:X,onOpen:G,open:q,placement:Y="bottom",PopperComponent:K,PopperProps:W={},slotProps:Z={},slots:ee={},title:se,TransitionComponent:F=yo,TransitionProps:te}=O,B=me(O,hh),ie=k.isValidElement(I)?I:p.jsx("span",{children:I}),Se=Kn(),Pe=Se.direction==="rtl",[xe,kt]=k.useState(),[je,ot]=k.useState(null),Ae=k.useRef(!1),at=V||Q,Te=Sn(),Vt=Sn(),St=Sn(),un=Sn(),[Jn,ca]=fi({controlled:q,default:!1,name:"Tooltip",state:"open"});let st=Jn;if(process.env.NODE_ENV!=="production"){const{current:ne}=k.useRef(q!==void 0);k.useEffect(()=>{xe&&xe.disabled&&!ne&&se!==""&&xe.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[se,xe,ne])}const Ar=di(P),dn=k.useRef(),Zn=In(()=>{dn.current!==void 0&&(document.body.style.WebkitUserSelect=dn.current,dn.current=void 0),un.clear()});k.useEffect(()=>Zn,[Zn]);const pa=ne=>{ms.clear(),rr=!0,ca(!0),G&&!st&&G(ne)},Qn=In(ne=>{ms.start(800+$,()=>{rr=!1}),ca(!1),X&&st&&X(ne),Te.start(Se.transitions.duration.shortest,()=>{Ae.current=!1})}),Br=ne=>{Ae.current&&ne.type!=="touchstart"||(xe&&xe.removeAttribute("title"),Vt.clear(),St.clear(),M||rr&&L?Vt.start(rr?L:M,()=>{pa(ne)}):pa(ne))},ua=ne=>{Vt.clear(),St.start($,()=>{Qn(ne)})},{isFocusVisibleRef:da,onBlur:uc,onFocus:dc,ref:fc}=mi(),[,fa]=k.useState(!1),ma=ne=>{uc(ne),da.current===!1&&(fa(!1),ua(ne))},ha=ne=>{xe||kt(ne.currentTarget),dc(ne),da.current===!0&&(fa(!0),Br(ne))},ga=ne=>{Ae.current=!0;const Be=ie.props;Be.onTouchStart&&Be.onTouchStart(ne)},ba=Br,va=ua,mc=ne=>{ga(ne),St.clear(),Te.clear(),Zn(),dn.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",un.start(J,()=>{document.body.style.WebkitUserSelect=dn.current,Br(ne)})},hc=ne=>{ie.props.onTouchEnd&&ie.props.onTouchEnd(ne),Zn(),St.start(U,()=>{Qn(ne)})};k.useEffect(()=>{if(!st)return;function ne(Be){(Be.key==="Escape"||Be.key==="Esc")&&Qn(Be)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[Qn,st]);const gc=Ge(ie.ref,fc,kt,n);!se&&se!==0&&(st=!1);const Lr=k.useRef(),bc=ne=>{const Be=ie.props;Be.onMouseMove&&Be.onMouseMove(ne),wn={x:ne.clientX,y:ne.clientY},Lr.current&&Lr.current.update()},fn={},Vr=typeof se=="string";S?(fn.title=!st&&Vr&&!_?se:null,fn["aria-describedby"]=st?Ar:null):(fn["aria-label"]=Vr?se:null,fn["aria-labelledby"]=st&&!Vr?Ar:null);const ze=j({},fn,B,ie.props,{className:Ce(B.className,ie.props.className),onTouchStart:ga,ref:gc},Q?{onMouseMove:bc}:{});process.env.NODE_ENV!=="production"&&(ze["data-mui-internal-clone-element"]=!0,k.useEffect(()=>{xe&&!xe.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[xe]));const mn={};H||(ze.onTouchStart=mc,ze.onTouchEnd=hc),_||(ze.onMouseOver=or(ba,ze.onMouseOver),ze.onMouseLeave=or(va,ze.onMouseLeave),at||(mn.onMouseOver=ba,mn.onMouseLeave=va)),C||(ze.onFocus=or(ha,ze.onFocus),ze.onBlur=or(ma,ze.onBlur),at||(mn.onFocus=ha,mn.onBlur=ma)),process.env.NODE_ENV!=="production"&&ie.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ie.props.title}\` or the Tooltip component.`].join(`
`));const vc=k.useMemo(()=>{var ne;let Be=[{name:"arrow",enabled:!!je,options:{element:je,padding:4}}];return(ne=W.popperOptions)!=null&&ne.modifiers&&(Be=Be.concat(W.popperOptions.modifiers)),j({},W.popperOptions,{modifiers:Be})},[je,W]),hn=j({},O,{isRtl:Pe,arrow:R,disableInteractive:at,placement:Y,PopperComponentProp:K,touch:Ae.current}),Fr=bh(hn),ya=(r=(o=ee.popper)!=null?o:A.Popper)!=null?r:vh,wa=(a=(s=(l=ee.transition)!=null?l:A.Transition)!=null?s:F)!=null?a:yo,xa=(c=(d=ee.tooltip)!=null?d:A.Tooltip)!=null?c:yh,Ea=(m=(v=ee.arrow)!=null?v:A.Arrow)!=null?m:wh,yc=Tn(ya,j({},W,(g=Z.popper)!=null?g:D.popper,{className:Ce(Fr.popper,W==null?void 0:W.className,(u=(h=Z.popper)!=null?h:D.popper)==null?void 0:u.className)}),hn),wc=Tn(wa,j({},te,(f=Z.transition)!=null?f:D.transition),hn),xc=Tn(xa,j({},(b=Z.tooltip)!=null?b:D.tooltip,{className:Ce(Fr.tooltip,(x=(N=Z.tooltip)!=null?N:D.tooltip)==null?void 0:x.className)}),hn),Ec=Tn(Ea,j({},(w=Z.arrow)!=null?w:D.arrow,{className:Ce(Fr.arrow,(E=(y=Z.arrow)!=null?y:D.arrow)==null?void 0:E.className)}),hn);return p.jsxs(k.Fragment,{children:[k.cloneElement(ie,ze),p.jsx(ya,j({as:K??Yi,placement:Y,anchorEl:Q?{getBoundingClientRect:()=>({top:wn.y,left:wn.x,right:wn.x,bottom:wn.y,width:0,height:0})}:xe,popperRef:Lr,open:xe?st:!1,id:Ar,transition:!0},mn,yc,{popperOptions:vc,children:({TransitionProps:ne})=>p.jsx(wa,j({timeout:Se.transitions.duration.shorter},ne,wc,{children:p.jsxs(xa,j({},xc,{children:[se,R?p.jsx(Ea,j({},Ec,{ref:ot})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Ki.propTypes={arrow:i.bool,children:Un.isRequired,classes:i.object,className:i.string,components:i.shape({Arrow:i.elementType,Popper:i.elementType,Tooltip:i.elementType,Transition:i.elementType}),componentsProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),describeChild:i.bool,disableFocusListener:i.bool,disableHoverListener:i.bool,disableInteractive:i.bool,disableTouchListener:i.bool,enterDelay:i.number,enterNextDelay:i.number,enterTouchDelay:i.number,followCursor:i.bool,id:i.string,leaveDelay:i.number,leaveTouchDelay:i.number,onClose:i.func,onOpen:i.func,open:i.bool,placement:i.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:i.elementType,PopperProps:i.object,slotProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),slots:i.shape({arrow:i.elementType,popper:i.elementType,tooltip:i.elementType,transition:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),title:i.node,TransitionComponent:i.elementType,TransitionProps:i.object});const xh=Ki;function hs(e,t,n){return e?p.jsx(ke.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:p.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function ea(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:s=void 0,hasAutoFocus:l=!1,className:c,isDisabled:d=!1,isDense:m=!0,isSubMenuParent:v=!1,hasDisabledGutters:g=!1,hasDivider:u=!1,focusVisibleClassName:h,id:f,children:b}=e,x=p.jsx(ke.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:d,dense:m,disableGutters:g,divider:u,focusVisibleClassName:h,onClick:t,id:f,children:n?p.jsxs(p.Fragment,{children:[hs(a,n,!0),p.jsx(ke.ListItemText,{primary:n,inset:!a&&o}),v?p.jsx(ke.ListItemIcon,{className:"papi-menu-icon-trailing",children:p.jsx(Oi,{})}):hs(s,n,!1)]}):b});return r?p.jsx(xh,{title:r,placement:"right",children:p.jsx("div",{children:x})}):x}function Ji(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Eh(e){const[t,n]=T.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:a}=e,s=d=>{n(d.currentTarget)},l=()=>{n(void 0)},c=()=>{let d=Ji(a).filter(m=>"menuItem"in m.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return d=d.filter(m=>"menuItem"in m.group&&m.group.menuItem===r.id),p.jsx(ta,{...e,includedGroups:d})};return p.jsxs(p.Fragment,{children:[p.jsx(ea,{onClick:s,...o,isSubMenuParent:!0}),p.jsx(ke.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const kh=(e,t)=>t.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function ta(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:a,allowForLeadingIcons:s}=T.useMemo(()=>{const m=o&&o.length>0?o:Ji(t).filter(h=>!("menuItem"in h.group)),v=Object.values(m).sort((h,f)=>(h.group.order||0)-(f.group.order||0)),g=[];v.forEach(h=>{kh(h.id,t.items).forEach(f=>g.push({item:f,isLastItemInGroup:!1})),g.length>0&&(g[g.length-1].isLastItemInGroup=!0)}),g.length>0&&(g[g.length-1].isLastItemInGroup=!1);const u=g.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:g,allowForLeadingIcons:u}},[o,t]),l=({item:m,isLastItemInGroup:v})=>({className:"papi-menu-item",label:m.label,tooltip:m.tooltip,iconPathBefore:"iconPathBefore"in m?m.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in m?m.iconPathAfter:void 0,hasDivider:v,allowForLeadingIcons:s}),[c]=a;if(!c)return p.jsx("div",{});const d=c.item.group;return p.jsx("div",{role:"menu","aria-label":d,children:a.map((m,v)=>{const{item:g}=m,u=l(m);if("command"in g){const h=g.group+v;return p.jsx(ea,{onClick:f=>{n==null||n(f),r(g)},...u},h)}return p.jsx(Eh,{parentMenuItem:g,parentItemProps:u,...e},d+g.id)})},d)}function Sh(e){const{menuDefinition:t,columnId:n}=e;let a=Object.entries(t.groups).map(([s,l])=>({id:s,group:l})).filter(s=>"column"in s.group);return n&&"columns"in t&&t.columns[n]&&(a=a.filter(s=>"column"in s.group&&s.group.column===n)),p.jsx(ta,{...e,includedGroups:a})}function Th({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:a}){return p.jsxs(ke.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${a??""}`,children:[p.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${a??""}`,children:r.label}),p.jsx(ke.List,{id:n,dense:!0,className:a??"",children:p.jsx(Sh,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Zi({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,a=T.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,d=o[c];typeof d=="object"&&typeof d.order=="number"&&!Number.isNaN(d.order)?s.set(d.order,{id:c,metadata:d}):console.warn(`Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return p.jsx(ke.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:r,children:a.map((s,l)=>p.jsx(Th,{commandHandler:e,menuDefinition:n,...s,className:t},l))})}const Qi=k.createContext({});process.env.NODE_ENV!=="production"&&(Qi.displayName="ListContext");const Ch=Qi;function Nh(e){return rt("MuiList",e)}wt("MuiList",["root","padding","dense","subheader"]);const Rh=["children","className","component","dense","disablePadding","subheader"],Oh=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return ft({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},Nh,t)},Ph=Oe("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>j({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),el=k.forwardRef(function(t,n){const r=mt({props:t,name:"MuiList"}),{children:o,className:a,component:s="ul",dense:l=!1,disablePadding:c=!1,subheader:d}=r,m=me(r,Rh),v=k.useMemo(()=>({dense:l}),[l]),g=j({},r,{component:s,dense:l,disablePadding:c}),u=Oh(g);return p.jsx(Ch.Provider,{value:v,children:p.jsxs(Ph,j({as:s,className:Ce(u.root,a),ref:n,ownerState:g},m,{children:[d,o]}))})});process.env.NODE_ENV!=="production"&&(el.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,dense:i.bool,disablePadding:i.bool,subheader:i.node,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const jh=el,_h=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Qr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function gs(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function tl(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function xn(e,t,n,r,o,a){let s=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(s)return!1;s=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!tl(l,a)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const nl=k.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:a=!1,children:s,className:l,disabledItemsFocusable:c=!1,disableListWrap:d=!1,onKeyDown:m,variant:v="selectedMenu"}=t,g=me(t,_h),u=k.useRef(null),h=k.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});It(()=>{o&&u.current.focus()},[o]),k.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(w,E)=>{const y=!u.current.style.width;if(w.clientHeight<u.current.clientHeight&&y){const O=`${hi(Re(w))}px`;u.current.style[E.direction==="rtl"?"paddingLeft":"paddingRight"]=O,u.current.style.width=`calc(100% + ${O})`}return u.current}}),[]);const f=w=>{const E=u.current,y=w.key,O=Re(E).activeElement;if(y==="ArrowDown")w.preventDefault(),xn(E,O,d,c,Qr);else if(y==="ArrowUp")w.preventDefault(),xn(E,O,d,c,gs);else if(y==="Home")w.preventDefault(),xn(E,null,d,c,Qr);else if(y==="End")w.preventDefault(),xn(E,null,d,c,gs);else if(y.length===1){const R=h.current,I=y.toLowerCase(),A=performance.now();R.keys.length>0&&(A-R.lastTime>500?(R.keys=[],R.repeating=!0,R.previousKeyMatched=!0):R.repeating&&I!==R.keys[0]&&(R.repeating=!1)),R.lastTime=A,R.keys.push(I);const D=O&&!R.repeating&&tl(O,R);R.previousKeyMatched&&(D||xn(E,O,!1,c,Qr,R))?w.preventDefault():R.previousKeyMatched=!1}m&&m(w)},b=Ge(u,n);let x=-1;k.Children.forEach(s,(w,E)=>{if(!k.isValidElement(w)){x===E&&(x+=1,x>=s.length&&(x=-1));return}process.env.NODE_ENV!=="production"&&dr.isFragment(w)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),w.props.disabled||(v==="selectedMenu"&&w.props.selected||x===-1)&&(x=E),x===E&&(w.props.disabled||w.props.muiSkipListHighlight||w.type.muiSkipListHighlight)&&(x+=1,x>=s.length&&(x=-1))});const N=k.Children.map(s,(w,E)=>{if(E===x){const y={};return a&&(y.autoFocus=!0),w.props.tabIndex===void 0&&v==="selectedMenu"&&(y.tabIndex=0),k.cloneElement(w,y)}return w});return p.jsx(jh,j({role:"menu",ref:b,className:l,onKeyDown:f,tabIndex:o?0:-1},g,{children:N}))});process.env.NODE_ENV!=="production"&&(nl.propTypes={autoFocus:i.bool,autoFocusItem:i.bool,children:i.node,className:i.string,disabledItemsFocusable:i.bool,disableListWrap:i.bool,onKeyDown:i.func,variant:i.oneOf(["menu","selectedMenu"])});const Mh=nl,$h=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Ih={entering:{opacity:1},entered:{opacity:1}},rl=k.forwardRef(function(t,n){const r=Kn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:a,appear:s=!0,children:l,easing:c,in:d,onEnter:m,onEntered:v,onEntering:g,onExit:u,onExited:h,onExiting:f,style:b,timeout:x=o,TransitionComponent:N=qi}=t,w=me(t,$h),E=k.useRef(null),y=Ge(E,l.ref,n),O=V=>H=>{if(V){const M=E.current;H===void 0?V(M):V(M,H)}},R=O(g),I=O((V,H)=>{Wi(V);const M=yr({style:b,timeout:x,easing:c},{mode:"enter"});V.style.webkitTransition=r.transitions.create("opacity",M),V.style.transition=r.transitions.create("opacity",M),m&&m(V,H)}),A=O(v),D=O(f),S=O(V=>{const H=yr({style:b,timeout:x,easing:c},{mode:"exit"});V.style.webkitTransition=r.transitions.create("opacity",H),V.style.transition=r.transitions.create("opacity",H),u&&u(V)}),C=O(h),_=V=>{a&&a(E.current,V)};return p.jsx(N,j({appear:s,in:d,nodeRef:E,onEnter:I,onEntered:A,onEntering:R,onExit:S,onExited:C,onExiting:D,addEndListener:_,timeout:x},w,{children:(V,H)=>k.cloneElement(l,j({style:j({opacity:0,visibility:V==="exited"&&!d?"hidden":void 0},Ih[V],b,l.props.style),ref:y},H))}))});process.env.NODE_ENV!=="production"&&(rl.propTypes={addEndListener:i.func,appear:i.bool,children:Un.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Dh=rl;function Ah(e){return rt("MuiBackdrop",e)}wt("MuiBackdrop",["root","invisible"]);const Bh=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Lh=e=>{const{classes:t,invisible:n}=e;return ft({root:["root",n&&"invisible"]},Ah,t)},Vh=Oe("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>j({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),ol=k.forwardRef(function(t,n){var r,o,a;const s=mt({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:d="div",components:m={},componentsProps:v={},invisible:g=!1,open:u,slotProps:h={},slots:f={},TransitionComponent:b=Dh,transitionDuration:x}=s,N=me(s,Bh),w=j({},s,{component:d,invisible:g}),E=Lh(w),y=(r=h.root)!=null?r:v.root;return p.jsx(b,j({in:u,timeout:x},N,{children:p.jsx(Vh,j({"aria-hidden":!0},y,{as:(o=(a=f.root)!=null?a:m.Root)!=null?o:d,className:Ce(E.root,c,y==null?void 0:y.className),ownerState:j({},w,y==null?void 0:y.ownerState),classes:E,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(ol.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.object}),invisible:i.bool,open:i.bool.isRequired,slotProps:i.shape({root:i.object}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Fh=ol;function zh(e){return rt("MuiModal",e)}wt("MuiModal",["root","hidden","backdrop"]);const Hh=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Uh=e=>{const{open:t,exited:n,classes:r}=e;return ft({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},zh,r)},Gh=Oe("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>j({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),qh=Oe(Fh,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),al=k.forwardRef(function(t,n){var r,o,a,s,l,c;const d=mt({name:"MuiModal",props:t}),{BackdropComponent:m=qh,BackdropProps:v,className:g,closeAfterTransition:u=!1,children:h,container:f,component:b,components:x={},componentsProps:N={},disableAutoFocus:w=!1,disableEnforceFocus:E=!1,disableEscapeKeyDown:y=!1,disablePortal:O=!1,disableRestoreFocus:R=!1,disableScrollLock:I=!1,hideBackdrop:A=!1,keepMounted:D=!1,onBackdropClick:S,open:C,slotProps:_,slots:V}=d,H=me(d,Hh),M=j({},d,{closeAfterTransition:u,disableAutoFocus:w,disableEnforceFocus:E,disableEscapeKeyDown:y,disablePortal:O,disableRestoreFocus:R,disableScrollLock:I,hideBackdrop:A,keepMounted:D}),{getRootProps:L,getBackdropProps:J,getTransitionProps:Q,portalRef:P,isTopModal:$,exited:U,hasTransition:X}=Uf(j({},M,{rootRef:n})),G=j({},M,{exited:U}),q=Uh(G),Y={};if(h.props.tabIndex===void 0&&(Y.tabIndex="-1"),X){const{onEnter:te,onExited:B}=Q();Y.onEnter=te,Y.onExited=B}const K=(r=(o=V==null?void 0:V.root)!=null?o:x.Root)!=null?r:Gh,W=(a=(s=V==null?void 0:V.backdrop)!=null?s:x.Backdrop)!=null?a:m,Z=(l=_==null?void 0:_.root)!=null?l:N.root,ee=(c=_==null?void 0:_.backdrop)!=null?c:N.backdrop,se=At({elementType:K,externalSlotProps:Z,externalForwardedProps:H,getSlotProps:L,additionalProps:{ref:n,as:b},ownerState:G,className:Ce(g,Z==null?void 0:Z.className,q==null?void 0:q.root,!G.open&&G.exited&&(q==null?void 0:q.hidden))}),F=At({elementType:W,externalSlotProps:ee,additionalProps:v,getSlotProps:te=>J(j({},te,{onClick:B=>{S&&S(B),te!=null&&te.onClick&&te.onClick(B)}})),className:Ce(ee==null?void 0:ee.className,v==null?void 0:v.className,q==null?void 0:q.backdrop),ownerState:G});return!D&&!C&&(!X||U)?null:p.jsx(An,{ref:P,container:f,disablePortal:O,children:p.jsxs(K,j({},se,{children:[!A&&m?p.jsx(W,j({},F)):null,p.jsx(gr,{disableEnforceFocus:E,disableAutoFocus:w,disableRestoreFocus:R,isEnabled:$,open:C,children:k.cloneElement(h,Y)})]}))})});process.env.NODE_ENV!=="production"&&(al.propTypes={BackdropComponent:i.elementType,BackdropProps:i.object,children:Un.isRequired,classes:i.object,className:i.string,closeAfterTransition:i.bool,component:i.elementType,components:i.shape({Backdrop:i.elementType,Root:i.elementType}),componentsProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableEscapeKeyDown:i.bool,disablePortal:i.bool,disableRestoreFocus:i.bool,disableScrollLock:i.bool,hideBackdrop:i.bool,keepMounted:i.bool,onBackdropClick:i.func,onClose:i.func,onTransitionEnter:i.func,onTransitionExited:i.func,open:i.bool.isRequired,slotProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({backdrop:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const Wh=al;function Xh(e){return rt("MuiPaper",e)}wt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Yh=["className","component","elevation","square","variant"],Kh=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,a={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return ft(a,Xh,o)},Jh=Oe("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return j({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&j({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${hr("#fff",fs(t.elevation))}, ${hr("#fff",fs(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),sl=k.forwardRef(function(t,n){const r=mt({props:t,name:"MuiPaper"}),{className:o,component:a="div",elevation:s=1,square:l=!1,variant:c="elevation"}=r,d=me(r,Yh),m=j({},r,{component:a,elevation:s,square:l,variant:c}),v=Kh(m);return process.env.NODE_ENV!=="production"&&Kn().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),p.jsx(Jh,j({as:a,ownerState:m,className:Ce(v.root,o),ref:n},d))});process.env.NODE_ENV!=="production"&&(sl.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,elevation:cn(vi,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:i.bool,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),variant:i.oneOfType([i.oneOf(["elevation","outlined"]),i.string])});const Zh=sl;function Qh(e){return rt("MuiPopover",e)}wt("MuiPopover",["root","paper"]);const eg=["onEntering"],tg=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],ng=["slotProps"];function bs(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function vs(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function ys(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function cr(e){return typeof e=="function"?e():e}const rg=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"]},Qh,t)},og=Oe(Wh,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),il=Oe(Zh,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),ll=k.forwardRef(function(t,n){var r,o,a;const s=mt({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:d={vertical:"top",horizontal:"left"},anchorPosition:m,anchorReference:v="anchorEl",children:g,className:u,container:h,elevation:f=8,marginThreshold:b=16,open:x,PaperProps:N={},slots:w,slotProps:E,transformOrigin:y={vertical:"top",horizontal:"left"},TransitionComponent:O=yo,transitionDuration:R="auto",TransitionProps:{onEntering:I}={},disableScrollLock:A=!1}=s,D=me(s.TransitionProps,eg),S=me(s,tg),C=(r=E==null?void 0:E.paper)!=null?r:N,_=k.useRef(),V=Ge(_,C.ref),H=j({},s,{anchorOrigin:d,anchorReference:v,elevation:f,marginThreshold:b,externalPaperSlotProps:C,transformOrigin:y,TransitionComponent:O,transitionDuration:R,TransitionProps:D}),M=rg(H),L=k.useCallback(()=>{if(v==="anchorPosition")return process.env.NODE_ENV!=="production"&&(m||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),m;const te=cr(c),B=te&&te.nodeType===1?te:Re(_.current).body,ie=B.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Se=B.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Se.top===0&&Se.left===0&&Se.right===0&&Se.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:ie.top+bs(ie,d.vertical),left:ie.left+vs(ie,d.horizontal)}},[c,d.horizontal,d.vertical,m,v]),J=k.useCallback(te=>({vertical:bs(te,y.vertical),horizontal:vs(te,y.horizontal)}),[y.horizontal,y.vertical]),Q=k.useCallback(te=>{const B={width:te.offsetWidth,height:te.offsetHeight},ie=J(B);if(v==="none")return{top:null,left:null,transformOrigin:ys(ie)};const Se=L();let Pe=Se.top-ie.vertical,xe=Se.left-ie.horizontal;const kt=Pe+B.height,je=xe+B.width,ot=tn(cr(c)),Ae=ot.innerHeight-b,at=ot.innerWidth-b;if(b!==null&&Pe<b){const Te=Pe-b;Pe-=Te,ie.vertical+=Te}else if(b!==null&&kt>Ae){const Te=kt-Ae;Pe-=Te,ie.vertical+=Te}if(process.env.NODE_ENV!=="production"&&B.height>Ae&&B.height&&Ae&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${B.height-Ae}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),b!==null&&xe<b){const Te=xe-b;xe-=Te,ie.horizontal+=Te}else if(je>at){const Te=je-at;xe-=Te,ie.horizontal+=Te}return{top:`${Math.round(Pe)}px`,left:`${Math.round(xe)}px`,transformOrigin:ys(ie)}},[c,v,L,J,b]),[P,$]=k.useState(x),U=k.useCallback(()=>{const te=_.current;if(!te)return;const B=Q(te);B.top!==null&&(te.style.top=B.top),B.left!==null&&(te.style.left=B.left),te.style.transformOrigin=B.transformOrigin,$(!0)},[Q]);k.useEffect(()=>(A&&window.addEventListener("scroll",U),()=>window.removeEventListener("scroll",U)),[c,A,U]);const X=(te,B)=>{I&&I(te,B),U()},G=()=>{$(!1)};k.useEffect(()=>{x&&U()}),k.useImperativeHandle(l,()=>x?{updatePosition:()=>{U()}}:null,[x,U]),k.useEffect(()=>{if(!x)return;const te=ui(()=>{U()}),B=tn(c);return B.addEventListener("resize",te),()=>{te.clear(),B.removeEventListener("resize",te)}},[c,x,U]);let q=R;R==="auto"&&!O.muiSupportAuto&&(q=void 0);const Y=h||(c?Re(cr(c)).body:void 0),K=(o=w==null?void 0:w.root)!=null?o:og,W=(a=w==null?void 0:w.paper)!=null?a:il,Z=At({elementType:W,externalSlotProps:j({},C,{style:P?C.style:j({},C.style,{opacity:0})}),additionalProps:{elevation:f,ref:V},ownerState:H,className:Ce(M.paper,C==null?void 0:C.className)}),ee=At({elementType:K,externalSlotProps:(E==null?void 0:E.root)||{},externalForwardedProps:S,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:Y,open:x},ownerState:H,className:Ce(M.root,u)}),{slotProps:se}=ee,F=me(ee,ng);return p.jsx(K,j({},F,!Pi(K)&&{slotProps:se,disableScrollLock:A},{children:p.jsx(O,j({appear:!0,in:x,onEntering:X,onExited:G,timeout:q},D,{children:p.jsx(W,j({},Z,{children:g}))}))}))});process.env.NODE_ENV!=="production"&&(ll.propTypes={action:Do,anchorEl:cn(i.oneOfType([pt,i.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=cr(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),anchorPosition:i.shape({left:i.number.isRequired,top:i.number.isRequired}),anchorReference:i.oneOf(["anchorEl","anchorPosition","none"]),children:i.node,classes:i.object,className:i.string,container:i.oneOfType([pt,i.func]),disableScrollLock:i.bool,elevation:vi,marginThreshold:i.number,onClose:i.func,open:i.bool.isRequired,PaperProps:i.shape({component:Ip}),slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transformOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object});const ag=ll;function sg(e){return rt("MuiMenu",e)}wt("MuiMenu",["root","paper","list"]);const ig=["onEntering"],lg=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],cg={vertical:"top",horizontal:"right"},pg={vertical:"top",horizontal:"left"},ug=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"],list:["list"]},sg,t)},dg=Oe(ag,{shouldForwardProp:e=>Ni(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),fg=Oe(il,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),mg=Oe(Mh,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),cl=k.forwardRef(function(t,n){var r,o;const a=mt({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:l,className:c,disableAutoFocusItem:d=!1,MenuListProps:m={},onClose:v,open:g,PaperProps:u={},PopoverClasses:h,transitionDuration:f="auto",TransitionProps:{onEntering:b}={},variant:x="selectedMenu",slots:N={},slotProps:w={}}=a,E=me(a.TransitionProps,ig),y=me(a,lg),O=Kn(),R=O.direction==="rtl",I=j({},a,{autoFocus:s,disableAutoFocusItem:d,MenuListProps:m,onEntering:b,PaperProps:u,transitionDuration:f,TransitionProps:E,variant:x}),A=ug(I),D=s&&!d&&g,S=k.useRef(null),C=(Q,P)=>{S.current&&S.current.adjustStyleForScrollbar(Q,O),b&&b(Q,P)},_=Q=>{Q.key==="Tab"&&(Q.preventDefault(),v&&v(Q,"tabKeyDown"))};let V=-1;k.Children.map(l,(Q,P)=>{k.isValidElement(Q)&&(process.env.NODE_ENV!=="production"&&dr.isFragment(Q)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Q.props.disabled||(x==="selectedMenu"&&Q.props.selected||V===-1)&&(V=P))});const H=(r=N.paper)!=null?r:fg,M=(o=w.paper)!=null?o:u,L=At({elementType:N.root,externalSlotProps:w.root,ownerState:I,className:[A.root,c]}),J=At({elementType:H,externalSlotProps:M,ownerState:I,className:A.paper});return p.jsx(dg,j({onClose:v,anchorOrigin:{vertical:"bottom",horizontal:R?"right":"left"},transformOrigin:R?cg:pg,slots:{paper:H,root:N.root},slotProps:{root:L,paper:J},open:g,ref:n,transitionDuration:f,TransitionProps:j({onEntering:C},E),ownerState:I},y,{classes:h,children:p.jsx(mg,j({onKeyDown:_,actions:S,autoFocus:s&&(V===-1||d),autoFocusItem:D,variant:x},m,{className:Ce(A.list,m.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(cl.propTypes={anchorEl:i.oneOfType([pt,i.func]),autoFocus:i.bool,children:i.node,classes:i.object,className:i.string,disableAutoFocusItem:i.bool,MenuListProps:i.object,onClose:i.func,open:i.bool.isRequired,PaperProps:i.object,PopoverClasses:i.object,slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object,variant:i.oneOf(["menu","selectedMenu"])});const hg=cl;function gg({className:e,commandHandler:t,menuDefinition:n,children:r}){var d;const[o,a]=T.useState(void 0),s=T.useCallback(m=>{m.preventDefault(),a(o===void 0?{mouseX:m.clientX+2,mouseY:m.clientY-6}:void 0)},[o]),l=T.useCallback(()=>{a(void 0)},[]),c=T.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((d=n==null?void 0:n.items)==null?void 0:d.length)??0)===0||!r?r:p.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[r,p.jsx(hg,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:p.jsx(ta,{menuDefinition:n,commandHandler:t,onClick:l})})]})}function bg(e){return{preserveValue:!0,...e}}const wr=(e,t,n={})=>{const r=T.useRef(t);r.current=t;const o=T.useRef(n);o.current=bg(o.current);const[a,s]=T.useState(()=>r.current),[l,c]=T.useState(!0);return T.useEffect(()=>{let d=!0;return c(!!e),(async()=>{if(e){const m=await e();d&&(s(()=>m),c(!1))}})(),()=>{d=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[a,l]},vg=Ri(p.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function pl({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:a,ariaLabelPrefix:s,children:l}){const[c,d]=T.useState(!1),[m,v]=T.useState(!1),g=T.useCallback(()=>{c&&d(!1),v(!1)},[c]),u=T.useCallback(E=>{E.stopPropagation(),d(y=>{const O=!y;return O&&E.shiftKey?v(!0):O||v(!1),O})},[]),h=T.useCallback(E=>(g(),r(E)),[r,g]),[f,b]=T.useState({top:1,left:1});T.useEffect(()=>{if(c){const E=o==null?void 0:o.current;if(E){const y=E.getBoundingClientRect(),O=window.scrollY,R=window.scrollX,I=y.top+O+E.clientHeight,A=y.left+R;b({top:I,left:A})}}},[c,o]);const[x]=wr(T.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[N]=wr(T.useCallback(async()=>(e==null?void 0:e(!0))??n??x,[e,n,x,c]),n??x),w=m&&N?N:x;return p.jsxs(p.Fragment,{children:[p.jsx(ke.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:u,children:l??p.jsx(vg,{})}),p.jsx(ke.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:c,onClose:g,PaperProps:{className:"papi-menu-drawer-paper",style:{top:f.top,left:f.left}},children:w?p.jsx(Zi,{className:a,id:`${s??""} main menu`,commandHandler:h,multiColumnMenu:w}):void 0})]})}function yg({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:s="medium",className:l,onClick:c,children:d}){return p.jsx(ke.IconButton,{id:e,disabled:n,edge:a,size:s,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:d})}const vt="scrBook",wg="scrRef",Rt="source",xg="details",Eg="Scripture Reference",kg="Scripture Book",ul="Type",Sg="Details";function Tg(e,t){const n=t??!1;return[{accessorFn:r=>`${fe.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:vt,header:(e==null?void 0:e.scriptureReferenceColumnName)??Eg,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?fe.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===vt?Ke.formatScrRef(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>Ke.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>Ke.formatScrRef(r.start),id:wg,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:Ke.formatScrRef(o.start)},sortingFn:(r,o)=>Ke.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:Rt,header:n?(e==null?void 0:e.typeColumnName)??ul:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:xg,header:(e==null?void 0:e.detailsColumnName)??Sg,cell:r=>r.getValue(),enableGrouping:!1}]}function Cg({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:a,detailsColumnName:s,onRowSelected:l}){const[c,d]=T.useState([]),[m,v]=T.useState([{id:vt,desc:!1}]),[g,u]=T.useState(()=>e.flatMap(S=>{const C=S.source;return S.data.map(_=>({..._,source:C}))})),[h,f]=T.useState({});T.useEffect(()=>{u(()=>e.flatMap(S=>{const C=S.source;return S.data.map(_=>({..._,source:C}))}))},[e]);const b=T.useMemo(()=>Tg({scriptureReferenceColumnName:r,typeColumnName:a,detailsColumnName:s},n),[r,a,s,n]);T.useEffect(()=>{c.includes(Rt)?v([{id:Rt,desc:!1},{id:vt,desc:!1}]):v([{id:vt,desc:!1}])},[c]);const x=T.useCallback((S,C)=>!C||Ke.compareScrRefs(S,C)===0?`${Ke.scrRefToBBBCCCVVV(S)}`:`${Ke.scrRefToBBBCCCVVV(S)}-${Ke.scrRefToBBBCCCVVV(C)}`,[]),N=T.useCallback(S=>`${x(S.start,S.end)} ${S.source} ${S.detail}`,[x]),w=Ne.useReactTable({data:g,columns:b,state:{grouping:c,sorting:m,rowSelection:h},onGroupingChange:d,onSortingChange:v,onRowSelectionChange:f,getExpandedRowModel:Ne.getExpandedRowModel(),getGroupedRowModel:Ne.getGroupedRowModel(),getCoreRowModel:Ne.getCoreRowModel(),getSortedRowModel:Ne.getSortedRowModel(),getRowId:N,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});T.useEffect(()=>{if(l){const S=w.getSelectedRowModel().rowsById,C=Object.keys(S);if(C.length===1){const _=g.find(V=>N(V)===C[0])||void 0;_&&l(_)}}},[h,g,N,l,w]);const E=o??kg,y=a??ul,O=[{label:"No Grouping",value:[]},{label:`Group by ${E}`,value:[vt]},{label:`Group by ${y}`,value:[Rt]},{label:`Group by ${E} and ${y}`,value:[vt,Rt]},{label:`Group by ${y} and ${E}`,value:[Rt,vt]}],R=S=>{d(JSON.parse(S))},I=(S,C)=>{!S.getIsGrouped()&&!S.getIsSelected()&&S.getToggleSelectedHandler()(C)},A=(S,C)=>S.getIsGrouped()?"":z("banded-row",C%2===0?"even":"odd"),D=(S,C,_)=>{if(!((S==null?void 0:S.length)===0||C.depth<_.column.getGroupedIndex())){if(C.getIsGrouped())switch(C.depth){case 1:return"pr-ps-4";default:return}switch(C.depth){case 1:return"pr-ps-8";case 2:return"pr-ps-12";default:return}}};return p.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-w-full pr-flex-col",children:[!t&&p.jsxs(Mn,{value:JSON.stringify(c),onValueChange:S=>{R(S)},children:[p.jsx(Jt,{className:"pr-mb-1 pr-mt-2",children:p.jsx($n,{})}),p.jsx(Zt,{position:"item-aligned",children:p.jsx(Hs,{children:O.map(S=>p.jsx(Ye,{value:JSON.stringify(S.value),children:S.label},S.label))})})]}),p.jsxs(Fn,{className:"pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0",children:[t&&p.jsx(zn,{children:w.getHeaderGroups().map(S=>p.jsx(lt,{children:S.headers.filter(C=>C.column.columnDef.header).map(C=>p.jsx(Qt,{colSpan:C.colSpan,className:"top-0 pr-sticky",children:C.isPlaceholder?void 0:p.jsxs("div",{children:[C.column.getCanGroup()?p.jsx(be,{variant:"ghost",title:`Toggle grouping by ${C.column.columnDef.header}`,onClick:C.column.getToggleGroupingHandler(),type:"button",children:C.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Ne.flexRender(C.column.columnDef.header,C.getContext())]})},C.id))},S.id))}),p.jsx(Hn,{children:w.getRowModel().rows.map((S,C)=>p.jsx(lt,{"data-state":S.getIsSelected()?"selected":"",className:z(A(S,C)),onClick:_=>I(S,_),children:S.getVisibleCells().map(_=>{if(!(_.getIsPlaceholder()||_.column.columnDef.enableGrouping&&!_.getIsGrouped()&&(_.column.columnDef.id!==Rt||!n)))return p.jsx($t,{className:z(_.column.columnDef.id,"pr-p-[1px]",D(c,S,_)),children:(()=>_.getIsGrouped()?p.jsxs(be,{variant:"ghost",onClick:S.getToggleExpandedHandler(),type:"button",children:[S.getIsExpanded()?"👇":"👉"," ",Ne.flexRender(_.column.columnDef.cell,_.getContext())," (",S.subRows.length,")"]}):Ne.flexRender(_.column.columnDef.cell,_.getContext()))()},_.id)})},S.id))})]})]})}function dl({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=T.useState(""),a=s=>{o(s),e(s)};return p.jsx(sn,{className:z("pr-flex pr-h-10 pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-[color:hsl(240,5%,64.9%)] focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",{"pr-w-full":n}),placeholder:t,value:r,onChange:s=>a(s.target.value)})}function Ng({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:a=1,showMarks:s=!1,defaultValue:l,value:c,valueLabelDisplay:d="off",className:m,onChange:v,onChangeCommitted:g}){return p.jsx(ke.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:a,marks:s,defaultValue:l,value:c,valueLabelDisplay:d,className:`papi-slider ${n} ${m??""}`,onChange:v,onChangeCommitted:g})}function Rg({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:s,children:l}){const c={action:(s==null?void 0:s.action)||l,message:s==null?void 0:s.message,className:r};return p.jsx(ke.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:a,id:t,ContentProps:c})}const na=T.forwardRef(({className:e,...t},n)=>p.jsx(De.Root,{orientation:"vertical",ref:n,className:z("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));na.displayName=De.List.displayName;const ra=T.forwardRef(({className:e,...t},n)=>p.jsx(De.List,{ref:n,className:z("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));ra.displayName=De.List.displayName;const fl=T.forwardRef(({className:e,...t},n)=>p.jsx(De.Trigger,{ref:n,...t,className:z("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),oa=T.forwardRef(({className:e,...t},n)=>p.jsx(De.Content,{ref:n,className:z("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));oa.displayName=De.Content.displayName;function Og({tabList:e,onSearch:t,searchPlaceholder:n,headerTitle:r,isSearchBarFullWidth:o=!1}){return p.jsxs("div",{className:"pr-twp",children:[p.jsxs("div",{className:"pr-space-y-2 pr-pb-2",children:[r?p.jsx("h1",{children:r}):"",p.jsx(dl,{isFullWidth:o,onSearch:t,placeholder:n})]}),p.jsxs(na,{children:[p.jsx(ra,{children:e.map(a=>p.jsx(fl,{value:a.value,children:a.value},a.key))}),e.map(a=>p.jsx(oa,{value:a.value,children:a.content},a.key))]})]})}const ml=k.forwardRef(({className:e,orientation:t="horizontal",decorative:n=!0,...r},o)=>p.jsx(Os.Root,{ref:o,decorative:n,orientation:t,className:z("pr-shrink-0 pr-bg-border",t==="horizontal"?"pr-h-[1px] pr-w-full":"pr-h-full pr-w-[1px]",e),...r}));ml.displayName=Os.Root.displayName;function Pg({children:e}){return p.jsx("div",{className:"pr-twp pr-grid",children:e})}function jg({primary:e,secondary:t,generateActionComponent:n,isLoading:r=!1,loadingMessage:o}){return p.jsxs("div",{className:"pr-flex pr-items-center pr-justify-between pr-space-x-4 pr-py-2",children:[p.jsxs("div",{children:[p.jsx("p",{className:"pr-text-sm pr-font-medium pr-leading-none",children:e}),p.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:t})]}),r?p.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:o}):n()]})}function _g({primary:e,secondary:t,includeSeparator:n=!1}){return p.jsxs("div",{className:"pr-space-y-4 pr-py-2",children:[p.jsxs("div",{children:[p.jsx("h3",{className:"pr-text-lg pr-font-medium",children:e}),p.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:t})]}),n?p.jsx(ml,{}):""]})}function Mg({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:a}){return p.jsx(ke.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:a})}const $g=To.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),aa=T.forwardRef(({className:e,...t},n)=>p.jsx(Ps.Root,{ref:n,className:z($g(),e),...t}));aa.displayName=Ps.Root.displayName;function Ig({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:a,placeholder:s,isRequired:l=!1,className:c,defaultValue:d,value:m,onChange:v,onFocus:g,onBlur:u}){return p.jsxs("div",{className:z("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":r}),children:[p.jsx(aa,{htmlFor:e,className:z({"pr-text-red-600":n,"pr-hidden":!a}),children:`${a}${l?"*":""}`}),p.jsx(sn,{id:e,disabled:t,placeholder:s,required:l,className:z(c,{"pr-border-red-600":n}),defaultValue:d,value:m,onChange:v,onFocus:g,onBlur:u}),p.jsx("p",{className:z({"pr-hidden":!o}),children:o})]})}function Dg({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const a=T.useRef(void 0);return p.jsx("div",{ref:a,style:{position:"relative"},children:p.jsx(ke.AppBar,{position:"static",id:r,children:p.jsxs(ke.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?p.jsx(pl,{commandHandler:t,containerRef:a,menuProvider:e}):void 0,o?p.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Ag=De.Root,hl=T.forwardRef(({className:e,...t},n)=>p.jsx(De.List,{ref:n,className:z("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));hl.displayName=De.List.displayName;const gl=T.forwardRef(({className:e,...t},n)=>p.jsx(De.Trigger,{ref:n,className:z("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));gl.displayName=De.Trigger.displayName;const bl=T.forwardRef(({className:e,...t},n)=>p.jsx(De.Content,{ref:n,className:z("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));bl.displayName=De.Content.displayName;const ar=e=>e==="asc"?p.jsx(ae.ArrowUpIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):e==="desc"?p.jsx(ae.ArrowDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):p.jsx(ae.ArrowUpDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}),Bg=(e,t,n,r,o)=>[{accessorKey:"character",header:({column:a})=>p.jsxs(be,{onClick:()=>a.toggleSorting(void 0),children:[e,ar(a.getIsSorted())]})},{accessorKey:"unicodeValue",header:({column:a})=>p.jsxs(be,{onClick:()=>a.toggleSorting(void 0),children:[t,ar(a.getIsSorted())]}),cell:({row:a})=>a.getValue("character").charCodeAt(0).toString(16).toUpperCase().padStart(4,"0")},{accessorKey:"count",header:({column:a})=>p.jsxs(be,{onClick:()=>a.toggleSorting(void 0),children:[n,ar(a.getIsSorted())]})},{accessorKey:"status",header:({column:a,table:s})=>{const l=s.getSelectedRowModel().rows,c=[];return l.forEach(d=>{c.push(d.getValue("character"))}),p.jsxs("div",{children:[p.jsx("div",{className:"pr-flex pr-justify-center",children:p.jsxs(be,{onClick:()=>a.toggleSorting(void 0),children:[r,ar(a.getIsSorted())]})}),p.jsxs("div",{className:"pr-flex pr-justify-center",children:[p.jsx(be,{children:p.jsx(ae.CircleCheckIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,!0)}})}),p.jsx(be,{children:p.jsx(ae.CircleXIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,!1)}})}),p.jsx(be,{children:p.jsx(ae.CircleHelpIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,void 0)}})})]})]})},cell:({row:a})=>{const s=a.getValue("status");return s===!0?p.jsx(ae.CircleCheckIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):s===!1?p.jsx(ae.CircleXIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):p.jsx(ae.CircleHelpIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"})}}];function Lg({tableData:e,onStatusChange:t,onSelectCharacter:n,localizedStrings:r}){const o=r["%webView_inventory_table_header_character%"],a=r["%webView_inventory_table_header_unicode_value%"],s=r["%webView_inventory_table_header_count%"],l=r["%webView_inventory_table_header_status%"],c=(d,m)=>{m.toggleAllRowsSelected(!1),d.toggleSelected(void 0),n(d.getValue("character"))};return p.jsx("div",{className:"pr-overflow-y-auto",children:p.jsx(Xs,{columns:Bg(o,a,s,l,t),data:e,onRowClickHandler:c})})}const ws=(e,t,n)=>{if(!e||e===""||t==="")return[];const r=[],o=e.split(`
`);let a="0",s="0",l=0;return o.forEach(c=>{const d=c.split(/\s+/);c.startsWith("\\c")&&([,a]=d,s="0"),c.startsWith("\\v")&&([,s]=d,a==="0"&&(a=n.chapterNum.toString()));for(let m=0;m<d.length;m++)if(d[m].includes(t)){const v=Math.max(0,m-2),g=Math.min(d.length,m+3),u=d.slice(v,g).join(" "),h={reference:{...n,chapterNum:+a,verseNum:+s},snippet:u,key:l};l+=1,r.push(h)}}),r};function Vg({selectedCharacter:e,text:t,scriptureReference:n,setScriptureReference:r,localizedStrings:o}){const a=o["%webView_inventory_occurrences_table_header_reference%"],s=o["%webView_inventory_occurrences_table_header_occurrence%"],[l,c]=T.useState(ws(t,e,n));return T.useEffect(()=>c(ws(t,e,n)),[t,e,n]),p.jsxs(Fn,{children:[p.jsx(zn,{children:p.jsxs(lt,{children:[p.jsx(Qt,{children:a}),p.jsx(Qt,{children:s})]})}),p.jsx(Hn,{children:l.map(d=>p.jsxs(lt,{onClick:()=>{r(d.reference)},children:[p.jsx($t,{children:`${fe.bookNumberToEnglishName(d.reference.bookNum)} ${d.reference.chapterNum}:${d.reference.verseNum}`}),p.jsx($t,{children:d.snippet})]},d.key))})]})}const Fg=async(e,t,n,r,o)=>{const a=[];return Ke.split(e,"").forEach(s=>{if(n!==""&&!s.includes(n))return;const l=a.find(c=>c.character===s);if(l)l.count+=1;else{let c;if(r.includes(s)&&(c=!0),o.includes(s)&&(c=!1),t==="all"||t==="approved"&&c===!0||t==="unapproved"&&c===!1||t==="unknown"&&c===void 0){const d={character:s,count:1,status:c};a.push(d)}}}),a};function zg({scriptureReference:e,setScriptureReference:t,localizedStrings:n,projectId:r,getSetting:o,setSetting:a,getText:s}){const l=n["%webView_characterInventory_characters_all%"],c=n["%webView_characterInventory_characters_approved%"],d=n["%webView_characterInventory_characters_unapproved%"],m=n["%webView_characterInventory_characters_unknown%"],v=n["%webView_inventory_scope_book%"],g=n["%webView_inventory_scope_chapter%"],u=n["%webView_inventory_scope_verse%"],h=n["%webView_inventory_filter_text%"],[f,b]=T.useState([]),[x,N]=T.useState([]),[w,E]=T.useState(void 0),[y,O]=T.useState("book"),[R,I]=T.useState("all"),[A,D]=T.useState(""),[S,C]=T.useState([]),[_,V]=T.useState(""),H=(M,L)=>{C(J=>{let Q=[];return M.forEach(P=>{Q=J.map($=>$.character===P&&$.status!==L?{...$,status:L}:$)}),b(P=>{let $=[...P];return M.forEach(U=>{L===!0?$.includes(U)||$.push(U):$=$.filter(X=>X!==U)}),a("validCharacters",r,$),$}),N(P=>{let $=[...P];return M.forEach(U=>{L===!1?$.includes(U)||$.push(U):$=$.filter(X=>X!==U)}),a("invalidCharacters",r,$),$}),Q})};return T.useEffect(()=>{(async()=>{try{b(await o("validCharacters",r)),N(await o("invalidCharacters",r))}catch{throw new Error("Failed to fetch characters from project settings")}})()},[r,o]),T.useEffect(()=>{(async()=>{try{const L=await s(r,e,y);E(L)}catch{throw new Error("Failed getting scripture text")}})()},[r,e,y,s]),T.useEffect(()=>{if(!w){C([]);return}(async()=>{try{C(await Fg(w,R,A,f,x))}catch{throw new Error("Failed building table data")}})()},[f,x,w,R,A]),p.jsxs("div",{className:"pr-twp",children:[p.jsxs("div",{className:"pr-flex",children:[p.jsxs(Mn,{onValueChange:M=>I(M),defaultValue:R,children:[p.jsx(Jt,{children:p.jsx($n,{placeholder:"Select filter"})}),p.jsxs(Zt,{children:[p.jsx(Ye,{value:"all",children:l}),p.jsx(Ye,{value:"approved",children:c}),p.jsx(Ye,{value:"unapproved",children:d}),p.jsx(Ye,{value:"unknown",children:m})]})]}),p.jsxs(Mn,{onValueChange:M=>O(M),defaultValue:y,children:[p.jsx(Jt,{children:p.jsx($n,{placeholder:"Select scope"})}),p.jsxs(Zt,{children:[p.jsx(Ye,{value:"book",children:v}),p.jsx(Ye,{value:"chapter",children:g}),p.jsx(Ye,{value:"verse",children:u})]})]}),p.jsx(sn,{className:"pr-rounded-md pr-border",placeholder:h,value:A,onChange:M=>{D(M.target.value)}})]}),p.jsx("div",{className:`pr-overflow-y-auto pr-rounded-md pr-border ${_!==""&&"pr-max-h-96"}`,children:p.jsx(Lg,{tableData:S,onStatusChange:H,onSelectCharacter:M=>{V(M)},localizedStrings:n})}),_!==""&&p.jsx("div",{className:"pr-mt-4 pr-rounded-md pr-border",children:p.jsx(Vg,{selectedCharacter:_,text:w,scriptureReference:e,setScriptureReference:M=>t(M),localizedStrings:n})})]})}function Hg({isInstalling:e,handleClick:t,buttonText:n}){return p.jsx(be,{className:z("pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out",{"pr-cursor-not-allowed pr-bg-blue-700":e,"pr-bg-blue-600":!e,"pr-bg-white pr-text-blue-600":!n,"pr-w-20":n}),onClick:t,children:e?p.jsx(ae.LoaderCircle,{size:15,className:"pr-animate-spin"}):p.jsxs(p.Fragment,{children:[p.jsx(ae.Download,{size:25,className:z("pr-h-4 pr-w-4",{"pr-mr-1":n})}),n]})})}function Ug({isEnabling:e,handleClick:t}){return p.jsx(be,{className:z("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e}),onClick:t,children:e?p.jsxs(p.Fragment,{children:[p.jsx(ae.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-white"}),"Enabling..."]}):"Enable"})}function Gg({isDisabling:e,handleClick:t}){return p.jsx(be,{className:z("pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-gray-400":e}),onClick:t,children:e?p.jsxs(p.Fragment,{children:[p.jsx(ae.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-black"}),"Disabling..."]}):"Disable"})}function qg({isUpdating:e,handleClick:t}){return p.jsx(be,{className:z("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e}),onClick:t,children:e?p.jsxs(p.Fragment,{children:[p.jsx(ae.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-white"}),"Updating..."]}):"Update"})}function jt(){return jt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},jt.apply(this,arguments)}const Wg=["children","options"],xs=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,t)=>(e[t.toLowerCase()]=t,e),{for:"htmlFor"}),Es={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},Xg=["style","script"],Yg=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,Kg=/mailto:/i,Jg=/\n{2,}$/,vl=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,Zg=/^ *> ?/gm,Qg=/^ {2,}\n/,eb=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,yl=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,wl=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,tb=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,nb=/^(?:\n *)*\n/,rb=/\r\n?/g,ob=/^\[\^([^\]]+)](:.*)\n/,ab=/^\[\^([^\]]+)]/,sb=/\f/g,ib=/^\s*?\[(x|\s)\]/,xl=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,El=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,kl=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,wo=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,lb=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,Sl=/^<!--[\s\S]*?(?:-->)/,cb=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,xo=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,pb=/^\{.*\}$/,ub=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,db=/^<([^ >]+@[^ >]+)>/,fb=/^<([^ >]+:\/[^ >]+)>/,mb=/-([a-z])?/gi,Tl=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,hb=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,gb=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,bb=/^\[([^\]]*)\] ?\[([^\]]*)\]/,vb=/(\[|\])/g,yb=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,wb=/\t/g,xb=/^ *\| */,Eb=/(^ *\||\| *$)/g,kb=/ *$/,Sb=/^ *:-+: *$/,Tb=/^ *:-+ *$/,Cb=/^ *-+: *$/,Nb=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,Rb=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,Ob=/^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,Pb=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,jb=/^\\([^0-9A-Za-z\s])/,_b=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,Mb=/^\n+/,$b=/^([ \t]*)/,Ib=/\\([^\\])/g,ks=/ *\n+$/,Db=/(?:^|\n)( *)$/,sa="(?:\\d+\\.)",ia="(?:[*+-])";function Cl(e){return"( *)("+(e===1?sa:ia)+") +"}const Nl=Cl(1),Rl=Cl(2);function Ol(e){return new RegExp("^"+(e===1?Nl:Rl))}const Ab=Ol(1),Bb=Ol(2);function Pl(e){return new RegExp("^"+(e===1?Nl:Rl)+"[^\\n]*(?:\\n(?!\\1"+(e===1?sa:ia)+" )[^\\n]*)*(\\n|$)","gm")}const jl=Pl(1),_l=Pl(2);function Ml(e){const t=e===1?sa:ia;return new RegExp("^( *)("+t+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+t+" (?!"+t+" ))\\n*|\\s*\\n*$)")}const $l=Ml(1),Il=Ml(2);function Ss(e,t){const n=t===1,r=n?$l:Il,o=n?jl:_l,a=n?Ab:Bb;return{t(s,l,c){const d=Db.exec(c);return d&&(l.o||!l._&&!l.u)?r.exec(s=d[1]+s):null},i:oe.HIGH,l(s,l,c){const d=n?+s[2]:void 0,m=s[0].replace(Jg,`
`).match(o);let v=!1;return{p:m.map(function(g,u){const h=a.exec(g)[0].length,f=new RegExp("^ {1,"+h+"}","gm"),b=g.replace(f,"").replace(a,""),x=u===m.length-1,N=b.indexOf(`

`)!==-1||x&&v;v=N;const w=c._,E=c.o;let y;c.o=!0,N?(c._=!1,y=b.replace(ks,`

`)):(c._=!0,y=b.replace(ks,""));const O=l(y,c);return c._=w,c.o=E,O}),m:n,g:d}},h:(s,l,c)=>e(s.m?"ol":"ul",{key:c.k,start:s.g},s.p.map(function(d,m){return e("li",{key:m},l(d,c))}))}}const Lb=/^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Vb=/^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Dl=[vl,yl,wl,xl,kl,El,Sl,Tl,jl,$l,_l,Il],Fb=[...Dl,/^[^\n]+(?:  \n|\n{2,})/,wo,xo];function zb(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function Hb(e){return Cb.test(e)?"right":Sb.test(e)?"center":Tb.test(e)?"left":null}function Ts(e,t,n){const r=n.$;n.$=!0;const o=t(e.trim(),n);n.$=r;let a=[[]];return o.forEach(function(s,l){s.type==="tableSeparator"?l!==0&&l!==o.length-1&&a.push([]):(s.type!=="text"||o[l+1]!=null&&o[l+1].type!=="tableSeparator"||(s.v=s.v.replace(kb,"")),a[a.length-1].push(s))}),a}function Ub(e,t,n){n._=!0;const r=Ts(e[1],t,n),o=e[2].replace(Eb,"").split("|").map(Hb),a=function(s,l,c){return s.trim().split(`
`).map(function(d){return Ts(d,l,c)})}(e[3],t,n);return n._=!1,{S:o,A:a,L:r,type:"table"}}function Cs(e,t){return e.S[t]==null?{}:{textAlign:e.S[t]}}function gt(e){return function(t,n){return n._?e.exec(t):null}}function bt(e){return function(t,n){return n._||n.u?e.exec(t):null}}function it(e){return function(t,n){return n._||n.u?null:e.exec(t)}}function En(e){return function(t){return e.exec(t)}}function Gb(e,t,n){if(t._||t.u||n&&!n.endsWith(`
`))return null;let r="";e.split(`
`).every(a=>!Dl.some(s=>s.test(a))&&(r+=a+`
`,a.trim()));const o=r.trimEnd();return o==""?null:[r,o]}function Wt(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch{return null}return e}function Ns(e){return e.replace(Ib,"$1")}function pr(e,t,n){const r=n._||!1,o=n.u||!1;n._=!0,n.u=!0;const a=e(t,n);return n._=r,n.u=o,a}function qb(e,t,n){const r=n._||!1,o=n.u||!1;n._=!1,n.u=!0;const a=e(t,n);return n._=r,n.u=o,a}function Wb(e,t,n){return n._=!1,e(t,n)}const eo=(e,t,n)=>({v:pr(t,e[1],n)});function to(){return{}}function no(){return null}function Xb(...e){return e.filter(Boolean).join(" ")}function ro(e,t,n){let r=e;const o=t.split(".");for(;o.length&&(r=r[o[0]],r!==void 0);)o.shift();return r||n}var oe;function Yb(e,t={}){t.overrides=t.overrides||{},t.slugify=t.slugify||zb,t.namedCodesToUnicode=t.namedCodesToUnicode?jt({},Es,t.namedCodesToUnicode):Es;const n=t.createElement||k.createElement;function r(u,h,...f){const b=ro(t.overrides,`${u}.props`,{});return n(function(x,N){const w=ro(N,x);return w?typeof w=="function"||typeof w=="object"&&"render"in w?w:ro(N,`${x}.component`,x):x}(u,t.overrides),jt({},h,b,{className:Xb(h==null?void 0:h.className,b.className)||void 0}),...f)}function o(u){let h=!1;t.forceInline?h=!0:t.forceBlock||(h=yb.test(u)===!1);const f=m(d(h?u:`${u.trimEnd().replace(Mb,"")}

`,{_:h}));for(;typeof f[f.length-1]=="string"&&!f[f.length-1].trim();)f.pop();if(t.wrapper===null)return f;const b=t.wrapper||(h?"span":"div");let x;if(f.length>1||t.forceWrapper)x=f;else{if(f.length===1)return x=f[0],typeof x=="string"?r("span",{key:"outer"},x):x;x=null}return k.createElement(b,{key:"outer"},x)}function a(u){const h=u.match(Yg);return h?h.reduce(function(f,b,x){const N=b.indexOf("=");if(N!==-1){const w=function(R){return R.indexOf("-")!==-1&&R.match(cb)===null&&(R=R.replace(mb,function(I,A){return A.toUpperCase()})),R}(b.slice(0,N)).trim(),E=function(R){const I=R[0];return(I==='"'||I==="'")&&R.length>=2&&R[R.length-1]===I?R.slice(1,-1):R}(b.slice(N+1).trim()),y=xs[w]||w,O=f[y]=function(R,I){return R==="style"?I.split(/;\s?/).reduce(function(A,D){const S=D.slice(0,D.indexOf(":"));return A[S.replace(/(-[a-z])/g,C=>C[1].toUpperCase())]=D.slice(S.length+1).trim(),A},{}):R==="href"?Wt(I):(I.match(pb)&&(I=I.slice(1,I.length-1)),I==="true"||I!=="false"&&I)}(w,E);typeof O=="string"&&(wo.test(O)||xo.test(O))&&(f[y]=k.cloneElement(o(O.trim()),{key:x}))}else b!=="style"&&(f[xs[b]||b]=!0);return f},{}):null}const s=[],l={},c={blockQuote:{t:it(vl),i:oe.HIGH,l:(u,h,f)=>({v:h(u[0].replace(Zg,""),f)}),h:(u,h,f)=>r("blockquote",{key:f.k},h(u.v,f))},breakLine:{t:En(Qg),i:oe.HIGH,l:to,h:(u,h,f)=>r("br",{key:f.k})},breakThematic:{t:it(eb),i:oe.HIGH,l:to,h:(u,h,f)=>r("hr",{key:f.k})},codeBlock:{t:it(wl),i:oe.MAX,l:u=>({v:u[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),M:void 0}),h:(u,h,f)=>r("pre",{key:f.k},r("code",jt({},u.O,{className:u.M?`lang-${u.M}`:""}),u.v))},codeFenced:{t:it(yl),i:oe.MAX,l:u=>({O:a(u[3]||""),v:u[4],M:u[2]||void 0,type:"codeBlock"})},codeInline:{t:bt(tb),i:oe.LOW,l:u=>({v:u[2]}),h:(u,h,f)=>r("code",{key:f.k},u.v)},footnote:{t:it(ob),i:oe.MAX,l:u=>(s.push({I:u[2],j:u[1]}),{}),h:no},footnoteReference:{t:gt(ab),i:oe.HIGH,l:u=>({v:u[1],B:`#${t.slugify(u[1])}`}),h:(u,h,f)=>r("a",{key:f.k,href:Wt(u.B)},r("sup",{key:f.k},u.v))},gfmTask:{t:gt(ib),i:oe.HIGH,l:u=>({R:u[1].toLowerCase()==="x"}),h:(u,h,f)=>r("input",{checked:u.R,key:f.k,readOnly:!0,type:"checkbox"})},heading:{t:it(t.enforceAtxHeadings?El:xl),i:oe.HIGH,l:(u,h,f)=>({v:pr(h,u[2],f),T:t.slugify(u[2]),C:u[1].length}),h:(u,h,f)=>r(`h${u.C}`,{id:u.T,key:f.k},h(u.v,f))},headingSetext:{t:it(kl),i:oe.MAX,l:(u,h,f)=>({v:pr(h,u[1],f),C:u[2]==="="?1:2,type:"heading"})},htmlComment:{t:En(Sl),i:oe.HIGH,l:()=>({}),h:no},image:{t:bt(Vb),i:oe.HIGH,l:u=>({D:u[1],B:Ns(u[2]),F:u[3]}),h:(u,h,f)=>r("img",{key:f.k,alt:u.D||void 0,title:u.F||void 0,src:Wt(u.B)})},link:{t:gt(Lb),i:oe.LOW,l:(u,h,f)=>({v:qb(h,u[1],f),B:Ns(u[2]),F:u[3]}),h:(u,h,f)=>r("a",{key:f.k,href:Wt(u.B),title:u.F},h(u.v,f))},linkAngleBraceStyleDetector:{t:gt(fb),i:oe.MAX,l:u=>({v:[{v:u[1],type:"text"}],B:u[1],type:"link"})},linkBareUrlDetector:{t:(u,h)=>h.N?null:gt(ub)(u,h),i:oe.MAX,l:u=>({v:[{v:u[1],type:"text"}],B:u[1],F:void 0,type:"link"})},linkMailtoDetector:{t:gt(db),i:oe.MAX,l(u){let h=u[1],f=u[1];return Kg.test(f)||(f="mailto:"+f),{v:[{v:h.replace("mailto:",""),type:"text"}],B:f,type:"link"}}},orderedList:Ss(r,1),unorderedList:Ss(r,2),newlineCoalescer:{t:it(nb),i:oe.LOW,l:to,h:()=>`
`},paragraph:{t:Gb,i:oe.LOW,l:eo,h:(u,h,f)=>r("p",{key:f.k},h(u.v,f))},ref:{t:gt(hb),i:oe.MAX,l:u=>(l[u[1]]={B:u[2],F:u[4]},{}),h:no},refImage:{t:bt(gb),i:oe.MAX,l:u=>({D:u[1]||void 0,P:u[2]}),h:(u,h,f)=>r("img",{key:f.k,alt:u.D,src:Wt(l[u.P].B),title:l[u.P].F})},refLink:{t:gt(bb),i:oe.MAX,l:(u,h,f)=>({v:h(u[1],f),Z:h(u[0].replace(vb,"\\$1"),f),P:u[2]}),h:(u,h,f)=>l[u.P]?r("a",{key:f.k,href:Wt(l[u.P].B),title:l[u.P].F},h(u.v,f)):r("span",{key:f.k},h(u.Z,f))},table:{t:it(Tl),i:oe.HIGH,l:Ub,h:(u,h,f)=>r("table",{key:f.k},r("thead",null,r("tr",null,u.L.map(function(b,x){return r("th",{key:x,style:Cs(u,x)},h(b,f))}))),r("tbody",null,u.A.map(function(b,x){return r("tr",{key:x},b.map(function(N,w){return r("td",{key:w,style:Cs(u,w)},h(N,f))}))})))},tableSeparator:{t:function(u,h){return h.$?(h._=!0,xb.exec(u)):null},i:oe.HIGH,l:function(){return{type:"tableSeparator"}},h:()=>" | "},text:{t:En(_b),i:oe.MIN,l:u=>({v:u[0].replace(lb,(h,f)=>t.namedCodesToUnicode[f]?t.namedCodesToUnicode[f]:h)}),h:u=>u.v},textBolded:{t:bt(Nb),i:oe.MED,l:(u,h,f)=>({v:h(u[2],f)}),h:(u,h,f)=>r("strong",{key:f.k},h(u.v,f))},textEmphasized:{t:bt(Rb),i:oe.LOW,l:(u,h,f)=>({v:h(u[2],f)}),h:(u,h,f)=>r("em",{key:f.k},h(u.v,f))},textEscaped:{t:bt(jb),i:oe.HIGH,l:u=>({v:u[1],type:"text"})},textMarked:{t:bt(Ob),i:oe.LOW,l:eo,h:(u,h,f)=>r("mark",{key:f.k},h(u.v,f))},textStrikethroughed:{t:bt(Pb),i:oe.LOW,l:eo,h:(u,h,f)=>r("del",{key:f.k},h(u.v,f))}};t.disableParsingRawHTML!==!0&&(c.htmlBlock={t:En(wo),i:oe.HIGH,l(u,h,f){const[,b]=u[3].match($b),x=new RegExp(`^${b}`,"gm"),N=u[3].replace(x,""),w=(E=N,Fb.some(I=>I.test(E))?Wb:pr);var E;const y=u[1].toLowerCase(),O=Xg.indexOf(y)!==-1;f.N=f.N||y==="a";const R=O?u[3]:w(h,N,f);return f.N=!1,{O:a(u[2]),v:R,G:O,H:O?y:u[1]}},h:(u,h,f)=>r(u.H,jt({key:f.k},u.O),u.G?u.v:h(u.v,f))},c.htmlSelfClosing={t:En(xo),i:oe.HIGH,l:u=>({O:a(u[2]||""),H:u[1]}),h:(u,h,f)=>r(u.H,jt({},u.O,{key:f.k}))});const d=function(u){let h=Object.keys(u);function f(b,x){let N=[],w="";for(;b;){let E=0;for(;E<h.length;){const y=h[E],O=u[y],R=O.t(b,x,w);if(R){const I=R[0];b=b.substring(I.length);const A=O.l(R,f,x);A.type==null&&(A.type=y),N.push(A),w=I;break}E++}}return N}return h.sort(function(b,x){let N=u[b].i,w=u[x].i;return N!==w?N-w:b<x?-1:1}),function(b,x){return f(function(N){return N.replace(rb,`
`).replace(sb,"").replace(wb,"    ")}(b),x)}}(c),m=(v=function(u){return function(h,f,b){return u[h.type].h(h,f,b)}}(c),function u(h,f={}){if(Array.isArray(h)){const b=f.k,x=[];let N=!1;for(let w=0;w<h.length;w++){f.k=w;const E=u(h[w],f),y=typeof E=="string";y&&N?x[x.length-1]+=E:E!==null&&x.push(E),N=y}return f.k=b,x}return v(h,u,f)});var v;const g=o(e);return s.length?r("div",null,g,r("footer",{key:"footer"},s.map(function(u){return r("div",{id:t.slugify(u.j),key:u.j},u.j,m(d(u.I,{_:!0})))}))):g}(function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"})(oe||(oe={}));const Kb=e=>{let{children:t,options:n}=e,r=function(o,a){if(o==null)return{};var s,l,c={},d=Object.keys(o);for(l=0;l<d.length;l++)a.indexOf(s=d[l])>=0||(c[s]=o[s]);return c}(e,Wg);return k.cloneElement(Yb(t,n),r)};function Jb({markdown:e}){return p.jsx("div",{className:"pr-prose",children:p.jsx(Kb,{children:e})})}const Zb=(e,t)=>{T.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},oo=()=>!1,Qb=(e,t)=>{const[n]=wr(T.useCallback(async()=>{if(!e)return oo;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),oo,{preserveValue:!1});T.useEffect(()=>()=>{n!==oo&&n()},[n])},Al=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:z("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));Al.displayName="Card";const Bl=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:z("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));Bl.displayName="CardHeader";const Ll=T.forwardRef(({className:e,...t},n)=>p.jsx("h3",{ref:n,className:z("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));Ll.displayName="CardTitle";const Vl=T.forwardRef(({className:e,...t},n)=>p.jsx("p",{ref:n,className:z("pr-text-sm pr-text-muted-foreground",e),...t}));Vl.displayName="CardDescription";const Fl=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:z("pr-p-6 pr-pt-0",e),...t}));Fl.displayName="CardContent";const zl=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:z("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));zl.displayName="CardFooter";const ev=To.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),Hl=T.forwardRef(({className:e,variant:t,...n},r)=>p.jsx("div",{ref:r,role:"alert",className:z(ev({variant:t}),e),...n}));Hl.displayName="Alert";const Ul=T.forwardRef(({className:e,...t},n)=>p.jsxs("h5",{ref:n,className:z("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));Ul.displayName="AlertTitle";const Gl=T.forwardRef(({className:e,...t},n)=>p.jsx("div",{ref:n,className:z("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));Gl.displayName="AlertDescription";function ql(e,[t,n]){return Math.min(n,Math.max(t,e))}function Yt(e,t,{checkForDefaultPrevented:n=!0}={}){return function(o){if(e==null||e(o),n===!1||!o.defaultPrevented)return t==null?void 0:t(o)}}function tv(e,t){typeof e=="function"?e(t):e!=null&&(e.current=t)}function nv(...e){return t=>e.forEach(n=>tv(n,t))}function Lt(...e){return k.useCallback(nv(...e),e)}function Wl(e,t=[]){let n=[];function r(a,s){const l=k.createContext(s),c=n.length;n=[...n,s];function d(v){const{scope:g,children:u,...h}=v,f=(g==null?void 0:g[e][c])||l,b=k.useMemo(()=>h,Object.values(h));return p.jsx(f.Provider,{value:b,children:u})}function m(v,g){const u=(g==null?void 0:g[e][c])||l,h=k.useContext(u);if(h)return h;if(s!==void 0)return s;throw new Error(`\`${v}\` must be used within \`${a}\``)}return d.displayName=a+"Provider",[d,m]}const o=()=>{const a=n.map(s=>k.createContext(s));return function(l){const c=(l==null?void 0:l[e])||a;return k.useMemo(()=>({[`__scope${e}`]:{...l,[e]:c}}),[l,c])}};return o.scopeName=e,[r,rv(o,...t)]}function rv(...e){const t=e[0];if(e.length===1)return t;const n=()=>{const r=e.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(a){const s=r.reduce((l,{useScope:c,scopeName:d})=>{const v=c(a)[`__scope${d}`];return{...l,...v}},{});return k.useMemo(()=>({[`__scope${t.scopeName}`]:s}),[s])}};return n.scopeName=t.scopeName,n}function Xl(e){const t=k.useRef(e);return k.useEffect(()=>{t.current=e}),k.useMemo(()=>(...n)=>{var r;return(r=t.current)==null?void 0:r.call(t,...n)},[])}function ov({prop:e,defaultProp:t,onChange:n=()=>{}}){const[r,o]=av({defaultProp:t,onChange:n}),a=e!==void 0,s=a?e:r,l=Xl(n),c=k.useCallback(d=>{if(a){const v=typeof d=="function"?d(e):d;v!==e&&l(v)}else o(d)},[a,e,o,l]);return[s,c]}function av({defaultProp:e,onChange:t}){const n=k.useState(e),[r]=n,o=k.useRef(r),a=Xl(t);return k.useEffect(()=>{o.current!==r&&(a(r),o.current=r)},[r,o,a]),n}var sv=k.createContext(void 0);function iv(e){const t=k.useContext(sv);return e||t||"ltr"}function lv(e){const t=k.useRef({value:e,previous:e});return k.useMemo(()=>(t.current.value!==e&&(t.current.previous=t.current.value,t.current.value=e),t.current.previous),[e])}var cv=globalThis!=null&&globalThis.document?k.useLayoutEffect:()=>{};function pv(e){const[t,n]=k.useState(void 0);return cv(()=>{if(e){n({width:e.offsetWidth,height:e.offsetHeight});const r=new ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const a=o[0];let s,l;if("borderBoxSize"in a){const c=a.borderBoxSize,d=Array.isArray(c)?c[0]:c;s=d.inlineSize,l=d.blockSize}else s=e.offsetWidth,l=e.offsetHeight;n({width:s,height:l})});return r.observe(e,{box:"border-box"}),()=>r.unobserve(e)}else n(void 0)},[e]),t}var uv=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],Ir=uv.reduce((e,t)=>{const n=k.forwardRef((r,o)=>{const{asChild:a,...s}=r,l=a?ur.Slot:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),p.jsx(l,{...s,ref:o})});return n.displayName=`Primitive.${t}`,{...e,[t]:n}},{});function dv(e){const t=e+"CollectionProvider",[n,r]=Wl(t),[o,a]=n(t,{collectionRef:{current:null},itemMap:new Map}),s=u=>{const{scope:h,children:f}=u,b=T.useRef(null),x=T.useRef(new Map).current;return p.jsx(o,{scope:h,itemMap:x,collectionRef:b,children:f})};s.displayName=t;const l=e+"CollectionSlot",c=T.forwardRef((u,h)=>{const{scope:f,children:b}=u,x=a(l,f),N=Lt(h,x.collectionRef);return p.jsx(ur.Slot,{ref:N,children:b})});c.displayName=l;const d=e+"CollectionItemSlot",m="data-radix-collection-item",v=T.forwardRef((u,h)=>{const{scope:f,children:b,...x}=u,N=T.useRef(null),w=Lt(h,N),E=a(d,f);return T.useEffect(()=>(E.itemMap.set(N,{ref:N,...x}),()=>void E.itemMap.delete(N))),p.jsx(ur.Slot,{[m]:"",ref:w,children:b})});v.displayName=d;function g(u){const h=a(e+"CollectionConsumer",u);return T.useCallback(()=>{const b=h.collectionRef.current;if(!b)return[];const x=Array.from(b.querySelectorAll(`[${m}]`));return Array.from(h.itemMap.values()).sort((E,y)=>x.indexOf(E.ref.current)-x.indexOf(y.ref.current))},[h.collectionRef,h.itemMap])}return[{Provider:s,Slot:c,ItemSlot:v},g,r]}var Yl=["PageUp","PageDown"],Kl=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],Jl={"from-left":["Home","PageDown","ArrowDown","ArrowLeft"],"from-right":["Home","PageDown","ArrowDown","ArrowRight"],"from-bottom":["Home","PageDown","ArrowDown","ArrowLeft"],"from-top":["Home","PageDown","ArrowUp","ArrowLeft"]},pn="Slider",[Eo,fv,mv]=dv(pn),[Zl,$v]=Wl(pn,[mv]),[hv,Dr]=Zl(pn),Ql=k.forwardRef((e,t)=>{const{name:n,min:r=0,max:o=100,step:a=1,orientation:s="horizontal",disabled:l=!1,minStepsBetweenThumbs:c=0,defaultValue:d=[r],value:m,onValueChange:v=()=>{},onValueCommit:g=()=>{},inverted:u=!1,...h}=e,f=k.useRef(new Set),b=k.useRef(0),N=s==="horizontal"?gv:bv,[w=[],E]=ov({prop:m,defaultProp:d,onChange:D=>{var C;(C=[...f.current][b.current])==null||C.focus(),v(D)}}),y=k.useRef(w);function O(D){const S=Ev(w,D);A(D,S)}function R(D){A(D,b.current)}function I(){const D=y.current[b.current];w[b.current]!==D&&g(w)}function A(D,S,{commit:C}={commit:!1}){const _=Cv(a),V=Nv(Math.round((D-r)/a)*a+r,_),H=ql(V,[r,o]);E((M=[])=>{const L=wv(M,H,S);if(Tv(L,c*a)){b.current=L.indexOf(H);const J=String(L)!==String(M);return J&&C&&g(L),J?L:M}else return M})}return p.jsx(hv,{scope:e.__scopeSlider,name:n,disabled:l,min:r,max:o,valueIndexToChangeRef:b,thumbs:f.current,values:w,orientation:s,children:p.jsx(Eo.Provider,{scope:e.__scopeSlider,children:p.jsx(Eo.Slot,{scope:e.__scopeSlider,children:p.jsx(N,{"aria-disabled":l,"data-disabled":l?"":void 0,...h,ref:t,onPointerDown:Yt(h.onPointerDown,()=>{l||(y.current=w)}),min:r,max:o,inverted:u,onSlideStart:l?void 0:O,onSlideMove:l?void 0:R,onSlideEnd:l?void 0:I,onHomeKeyDown:()=>!l&&A(r,0,{commit:!0}),onEndKeyDown:()=>!l&&A(o,w.length-1,{commit:!0}),onStepKeyDown:({event:D,direction:S})=>{if(!l){const V=Yl.includes(D.key)||D.shiftKey&&Kl.includes(D.key)?10:1,H=b.current,M=w[H],L=a*V*S;A(M+L,H,{commit:!0})}}})})})})});Ql.displayName=pn;var[ec,tc]=Zl(pn,{startEdge:"left",endEdge:"right",size:"width",direction:1}),gv=k.forwardRef((e,t)=>{const{min:n,max:r,dir:o,inverted:a,onSlideStart:s,onSlideMove:l,onSlideEnd:c,onStepKeyDown:d,...m}=e,[v,g]=k.useState(null),u=Lt(t,w=>g(w)),h=k.useRef(),f=iv(o),b=f==="ltr",x=b&&!a||!b&&a;function N(w){const E=h.current||v.getBoundingClientRect(),y=[0,E.width],R=la(y,x?[n,r]:[r,n]);return h.current=E,R(w-E.left)}return p.jsx(ec,{scope:e.__scopeSlider,startEdge:x?"left":"right",endEdge:x?"right":"left",direction:x?1:-1,size:"width",children:p.jsx(nc,{dir:f,"data-orientation":"horizontal",...m,ref:u,style:{...m.style,"--radix-slider-thumb-transform":"translateX(-50%)"},onSlideStart:w=>{const E=N(w.clientX);s==null||s(E)},onSlideMove:w=>{const E=N(w.clientX);l==null||l(E)},onSlideEnd:()=>{h.current=void 0,c==null||c()},onStepKeyDown:w=>{const y=Jl[x?"from-left":"from-right"].includes(w.key);d==null||d({event:w,direction:y?-1:1})}})})}),bv=k.forwardRef((e,t)=>{const{min:n,max:r,inverted:o,onSlideStart:a,onSlideMove:s,onSlideEnd:l,onStepKeyDown:c,...d}=e,m=k.useRef(null),v=Lt(t,m),g=k.useRef(),u=!o;function h(f){const b=g.current||m.current.getBoundingClientRect(),x=[0,b.height],w=la(x,u?[r,n]:[n,r]);return g.current=b,w(f-b.top)}return p.jsx(ec,{scope:e.__scopeSlider,startEdge:u?"bottom":"top",endEdge:u?"top":"bottom",size:"height",direction:u?1:-1,children:p.jsx(nc,{"data-orientation":"vertical",...d,ref:v,style:{...d.style,"--radix-slider-thumb-transform":"translateY(50%)"},onSlideStart:f=>{const b=h(f.clientY);a==null||a(b)},onSlideMove:f=>{const b=h(f.clientY);s==null||s(b)},onSlideEnd:()=>{g.current=void 0,l==null||l()},onStepKeyDown:f=>{const x=Jl[u?"from-bottom":"from-top"].includes(f.key);c==null||c({event:f,direction:x?-1:1})}})})}),nc=k.forwardRef((e,t)=>{const{__scopeSlider:n,onSlideStart:r,onSlideMove:o,onSlideEnd:a,onHomeKeyDown:s,onEndKeyDown:l,onStepKeyDown:c,...d}=e,m=Dr(pn,n);return p.jsx(Ir.span,{...d,ref:t,onKeyDown:Yt(e.onKeyDown,v=>{v.key==="Home"?(s(v),v.preventDefault()):v.key==="End"?(l(v),v.preventDefault()):Yl.concat(Kl).includes(v.key)&&(c(v),v.preventDefault())}),onPointerDown:Yt(e.onPointerDown,v=>{const g=v.target;g.setPointerCapture(v.pointerId),v.preventDefault(),m.thumbs.has(g)?g.focus():r(v)}),onPointerMove:Yt(e.onPointerMove,v=>{v.target.hasPointerCapture(v.pointerId)&&o(v)}),onPointerUp:Yt(e.onPointerUp,v=>{const g=v.target;g.hasPointerCapture(v.pointerId)&&(g.releasePointerCapture(v.pointerId),a(v))})})}),rc="SliderTrack",oc=k.forwardRef((e,t)=>{const{__scopeSlider:n,...r}=e,o=Dr(rc,n);return p.jsx(Ir.span,{"data-disabled":o.disabled?"":void 0,"data-orientation":o.orientation,...r,ref:t})});oc.displayName=rc;var ko="SliderRange",ac=k.forwardRef((e,t)=>{const{__scopeSlider:n,...r}=e,o=Dr(ko,n),a=tc(ko,n),s=k.useRef(null),l=Lt(t,s),c=o.values.length,d=o.values.map(g=>ic(g,o.min,o.max)),m=c>1?Math.min(...d):0,v=100-Math.max(...d);return p.jsx(Ir.span,{"data-orientation":o.orientation,"data-disabled":o.disabled?"":void 0,...r,ref:l,style:{...e.style,[a.startEdge]:m+"%",[a.endEdge]:v+"%"}})});ac.displayName=ko;var So="SliderThumb",sc=k.forwardRef((e,t)=>{const n=fv(e.__scopeSlider),[r,o]=k.useState(null),a=Lt(t,l=>o(l)),s=k.useMemo(()=>r?n().findIndex(l=>l.ref.current===r):-1,[n,r]);return p.jsx(vv,{...e,ref:a,index:s})}),vv=k.forwardRef((e,t)=>{const{__scopeSlider:n,index:r,name:o,...a}=e,s=Dr(So,n),l=tc(So,n),[c,d]=k.useState(null),m=Lt(t,N=>d(N)),v=c?!!c.closest("form"):!0,g=pv(c),u=s.values[r],h=u===void 0?0:ic(u,s.min,s.max),f=xv(r,s.values.length),b=g==null?void 0:g[l.size],x=b?kv(b,h,l.direction):0;return k.useEffect(()=>{if(c)return s.thumbs.add(c),()=>{s.thumbs.delete(c)}},[c,s.thumbs]),p.jsxs("span",{style:{transform:"var(--radix-slider-thumb-transform)",position:"absolute",[l.startEdge]:`calc(${h}% + ${x}px)`},children:[p.jsx(Eo.ItemSlot,{scope:e.__scopeSlider,children:p.jsx(Ir.span,{role:"slider","aria-label":e["aria-label"]||f,"aria-valuemin":s.min,"aria-valuenow":u,"aria-valuemax":s.max,"aria-orientation":s.orientation,"data-orientation":s.orientation,"data-disabled":s.disabled?"":void 0,tabIndex:s.disabled?void 0:0,...a,ref:m,style:u===void 0?{display:"none"}:e.style,onFocus:Yt(e.onFocus,()=>{s.valueIndexToChangeRef.current=r})})}),v&&p.jsx(yv,{name:o??(s.name?s.name+(s.values.length>1?"[]":""):void 0),value:u},r)]})});sc.displayName=So;var yv=e=>{const{value:t,...n}=e,r=k.useRef(null),o=lv(t);return k.useEffect(()=>{const a=r.current,s=window.HTMLInputElement.prototype,c=Object.getOwnPropertyDescriptor(s,"value").set;if(o!==t&&c){const d=new Event("input",{bubbles:!0});c.call(a,t),a.dispatchEvent(d)}},[o,t]),p.jsx("input",{style:{display:"none"},...n,ref:r,defaultValue:t})};function wv(e=[],t,n){const r=[...e];return r[n]=t,r.sort((o,a)=>o-a)}function ic(e,t,n){const a=100/(n-t)*(e-t);return ql(a,[0,100])}function xv(e,t){return t>2?`Value ${e+1} of ${t}`:t===2?["Minimum","Maximum"][e]:void 0}function Ev(e,t){if(e.length===1)return 0;const n=e.map(o=>Math.abs(o-t)),r=Math.min(...n);return n.indexOf(r)}function kv(e,t,n){const r=e/2,a=la([0,50],[0,r]);return(r-a(t)*n)*n}function Sv(e){return e.slice(0,-1).map((t,n)=>e[n+1]-t)}function Tv(e,t){if(t>0){const n=Sv(e);return Math.min(...n)>=t}return!0}function la(e,t){return n=>{if(e[0]===e[1]||t[0]===t[1])return t[0];const r=(t[1]-t[0])/(e[1]-e[0]);return t[0]+r*(n-e[0])}}function Cv(e){return(String(e).split(".")[1]||"").length}function Nv(e,t){const n=Math.pow(10,t);return Math.round(e*n)/n}var lc=Ql,Rv=oc,Ov=ac,Pv=sc;const cc=T.forwardRef(({className:e,...t},n)=>p.jsxs(lc,{ref:n,className:z("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[p.jsx(Rv,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:p.jsx(Ov,{className:"pr-absolute pr-h-full pr-bg-primary"})}),p.jsx(Pv,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));cc.displayName=lc.displayName;const pc=T.forwardRef(({className:e,...t},n)=>p.jsx(so.Root,{className:z("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:n,children:p.jsx(so.Thumb,{className:z("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));pc.displayName=so.Root.displayName;exports.Alert=Hl;exports.AlertDescription=Gl;exports.AlertTitle=Ul;exports.BookChapterControl=sp;exports.Button=be;exports.Card=Al;exports.CardContent=Fl;exports.CardDescription=Vl;exports.CardFooter=zl;exports.CardHeader=Bl;exports.CardTitle=Ll;exports.ChapterRangeSelector=vp;exports.CharacterInventory=zg;exports.Checkbox=ni;exports.Checklist=yp;exports.ComboBox=io;exports.ContextMenu=gg;exports.DataTable=Xs;exports.DisableButton=Gg;exports.DropdownMenu=Oo;exports.DropdownMenuCheckboxItem=jo;exports.DropdownMenuContent=xr;exports.DropdownMenuGroup=qc;exports.DropdownMenuItem=Po;exports.DropdownMenuLabel=Vn;exports.DropdownMenuPortal=Wc;exports.DropdownMenuRadioGroup=Yc;exports.DropdownMenuRadioItem=Vs;exports.DropdownMenuSeparator=Er;exports.DropdownMenuShortcut=Fs;exports.DropdownMenuSub=Xc;exports.DropdownMenuSubContent=Ls;exports.DropdownMenuSubTrigger=Bs;exports.DropdownMenuTrigger=As;exports.EnableButton=Ug;exports.GridMenu=Zi;exports.HamburgerMenuButton=pl;exports.IconButton=yg;exports.Input=sn;exports.InstallButton=Hg;exports.Label=aa;exports.LabelPosition=Ot;exports.MarkdownRenderer=Jb;exports.MenuItem=ea;exports.NavigationContentSearch=Og;exports.ScriptureResultsViewer=Cg;exports.SearchBar=dl;exports.Select=Mn;exports.SelectContent=Zt;exports.SelectGroup=Hs;exports.SelectItem=Ye;exports.SelectLabel=Us;exports.SelectScrollDownButton=Mo;exports.SelectScrollUpButton=_o;exports.SelectSeparator=Gs;exports.SelectTrigger=Jt;exports.SelectValue=$n;exports.SettingsList=Pg;exports.SettingsListHeader=_g;exports.SettingsListItem=jg;exports.ShadCnSlider=cc;exports.ShadCnSwitch=pc;exports.Slider=Ng;exports.Snackbar=Rg;exports.Switch=Mg;exports.Table=Fn;exports.TableBody=Hn;exports.TableCaption=Ws;exports.TableCell=$t;exports.TableFooter=qs;exports.TableHead=Qt;exports.TableHeader=zn;exports.TableRow=lt;exports.Tabs=Ag;exports.TabsContent=bl;exports.TabsList=hl;exports.TabsTrigger=gl;exports.TextField=Ig;exports.Toolbar=Dg;exports.UpdateButton=qg;exports.VerticalTabs=na;exports.VerticalTabsContent=oa;exports.VerticalTabsList=ra;exports.VerticalTabsTrigger=fl;exports.buttonVariants=zs;exports.useEvent=Zb;exports.useEventAsync=Qb;exports.usePromise=wr;function jv(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}jv(`.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
.pr-space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state="selected"]:hover {
  cursor: default;
}
`,"top");
//# sourceMappingURL=index.cjs.map
