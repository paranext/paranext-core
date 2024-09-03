"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=require("react/jsx-runtime"),E=require("react"),oe=require("lucide-react"),Ce=require("clsx"),ac=require("tailwind-merge"),Ss=require("@radix-ui/react-dropdown-menu"),re=require("platform-bible-utils"),je=require("@tanstack/react-table"),sc=require("@radix-ui/react-slot"),Eo=require("class-variance-authority"),ic=require("@radix-ui/react-select"),lc=require("@radix-ui/react-popover"),De=require("cmdk"),cc=require("@radix-ui/react-dialog"),pc=require("@radix-ui/react-label"),Se=require("@mui/material"),so=require("@mui/styled-engine"),Nr=require("react-dom"),dc=require("@radix-ui/react-tabs"),uc=require("@radix-ui/react-separator"),fc=require("@radix-ui/react-slider"),mc=require("@radix-ui/react-switch");function Je(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const r in e)if(r!=="default"){const n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:()=>e[r]})}}return t.default=e,Object.freeze(t)}const T=Je(E),ge=Je(Ss),xe=Je(ic),_r=Je(lc),et=Je(cc),Cs=Je(pc),hc=Je(Nr),Ae=Je(dc),js=Je(uc),Tr=Je(fc),io=Je(mc);const gc=ac.extendTailwindMerge({prefix:"pr-"});function B(...e){return gc(Ce.clsx(e))}const ir=E.forwardRef(({className:e,type:t,...r},n)=>l.jsx("input",{type:t,className:B("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:n,...r}));ir.displayName="Input";const bc=E.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:r,handleSubmit:n,...o},a)=>l.jsxs("div",{className:"pr-relative",children:[l.jsx(ir,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&n(),t(s)},onClick:r,ref:a}),l.jsx(oe.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));var vc=Object.defineProperty,yc=(e,t,r)=>t in e?vc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,ae=(e,t,r)=>yc(e,typeof t!="symbol"?t+"":t,r);const _t=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],No=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Os=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],wa=Oc();function lr(e,t=!0){return t&&(e=e.toUpperCase()),e in wa?wa[e]:0}function To(e){return lr(e)>0}function wc(e){const t=typeof e=="string"?lr(e):e;return t>=40&&t<=66}function xc(e){return(typeof e=="string"?lr(e):e)<=39}function Rs(e){return e<=66}function kc(e){const t=typeof e=="string"?lr(e):e;return Is(t)&&!Rs(t)}function*Ec(){for(let e=1;e<=_t.length;e++)yield e}const Nc=1,Ps=_t.length;function Tc(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function So(e,t="***"){const r=e-1;return r<0||r>=_t.length?t:_t[r]}function $s(e){return e<=0||e>Ps?"******":Os[e-1]}function Sc(e){return $s(lr(e))}function Is(e){const t=typeof e=="number"?So(e):e;return To(t)&&!No.includes(t)}function Cc(e){const t=typeof e=="number"?So(e):e;return To(t)&&No.includes(t)}function jc(e){return Os[e-1].includes("*obsolete*")}function Oc(){const e={};for(let t=0;t<_t.length;t++)e[_t[t]]=t+1;return e}const me={allBookIds:_t,nonCanonicalIds:No,bookIdToNumber:lr,isBookIdValid:To,isBookNT:wc,isBookOT:xc,isBookOTNT:Rs,isBookDC:kc,allBookNumbers:Ec,firstBook:Nc,lastBook:Ps,extraBooks:Tc,bookNumberToId:So,bookNumberToEnglishName:$s,bookIdToEnglishName:Sc,isCanonical:Is,isExtraMaterial:Cc,isObsolete:jc};var Ze=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ze||{});const Fe=class{constructor(t){if(ae(this,"name"),ae(this,"fullPath"),ae(this,"isPresent"),ae(this,"hasVerseSegments"),ae(this,"isCustomized"),ae(this,"baseVersification"),ae(this,"scriptureBooks"),ae(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Ze[t]):(this._type=t,this.name=Ze[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ae(Fe,"Original",new Fe(Ze.Original)),ae(Fe,"Septuagint",new Fe(Ze.Septuagint)),ae(Fe,"Vulgate",new Fe(Ze.Vulgate)),ae(Fe,"English",new Fe(Ze.English)),ae(Fe,"RussianProtestant",new Fe(Ze.RussianProtestant)),ae(Fe,"RussianOrthodox",new Fe(Ze.RussianOrthodox));let St=Fe;function xa(e,t){const r=t[0];for(let n=1;n<t.length;n++)e=e.split(t[n]).join(r);return e.split(r)}var _s=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(_s||{});const Ie=class ce{constructor(t,r,n,o){if(ae(this,"firstChapter"),ae(this,"lastChapter"),ae(this,"lastVerse"),ae(this,"hasSegmentsDefined"),ae(this,"text"),ae(this,"BBBCCCVVVS"),ae(this,"longHashCode"),ae(this,"versification"),ae(this,"rtlMark","‏"),ae(this,"_bookNum",0),ae(this,"_chapterNum",0),ae(this,"_verseNum",0),ae(this,"_verse"),n==null&&o==null)if(t!=null&&typeof t=="string"){const a=t,s=r!=null&&r instanceof St?r:void 0;this.setEmpty(s),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=r!=null&&r instanceof St?r:void 0;this.setEmpty(a),this._verseNum=t%ce.chapterDigitShifter,this._chapterNum=Math.floor(t%ce.bookDigitShifter/ce.chapterDigitShifter),this._bookNum=Math.floor(t/ce.bookDigitShifter)}else if(r==null)if(t!=null&&t instanceof ce){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof St?t:ce.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&r!=null&&n!=null)if(typeof t=="string"&&typeof r=="string"&&typeof n=="string")this.setEmpty(o),this.updateInternal(t,r,n);else if(typeof t=="number"&&typeof r=="number"&&typeof n=="number")this._bookNum=t,this._chapterNum=r,this._verseNum=n,this.versification=o??ce.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let r;try{return r=new ce(t),{success:!0,verseRef:r}}catch(n){if(n instanceof br)return r=new ce,{success:!1,verseRef:r};throw n}}static getBBBCCCVVV(t,r,n){return t%ce.bcvMaxValue*ce.bookDigitShifter+(r>=0?r%ce.bcvMaxValue*ce.chapterDigitShifter:0)+(n>=0?n%ce.bcvMaxValue:0)}static fromJSON(t){const{book:r,chapterNum:n,verseNum:o,verse:a,versificationStr:s}=t,c=a||o.toString();let p;return s&&(p=new St(s)),r?new ce(r,n.toString(),c,p):new ce}static tryGetVerseNum(t){let r;if(!t)return r=-1,{success:!0,vNum:r};r=0;let n;for(let o=0;o<t.length;o++){if(n=t[o],n<"0"||n>"9")return o===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +n-0,r>ce.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ce.verseRangeSeparator)||this._verse.includes(ce.verseSequenceIndicator))}get book(){return me.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=me.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const r=+t;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:r,vNum:n}=ce.tryGetVerseNum(t);this._verse=r?void 0:t.replace(this.rtlMark,""),this._verseNum=n,!(this._verseNum>=0)&&({vNum:this._verseNum}=ce.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>me.lastBook)throw new br("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new St(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ce.verseRangeSeparators,ce.verseSequenceIndicators)}get BBBCCC(){return ce.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ce.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const s=+a[1].trim();this.versification=new St(Ze[s])}catch{throw new br("Invalid reference : "+t)}}const r=t.trim().split(" ");if(r.length!==2)throw new br("Invalid reference : "+t);const n=r[1].split(":"),o=+n[0];if(n.length!==2||me.bookIdToNumber(r[0])===0||!Number.isInteger(o)||o<0||!ce.isVerseParseable(n[1]))throw new br("Invalid reference : "+t);this.updateInternal(r[0],n[0],n[1])}simplify(){this._verse=void 0}clone(){return new ce(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete r.verse,r}equals(t){return t instanceof ce?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,r=ce.verseRangeSeparators,n=ce.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=xa(this._verse,n);for(const s of a.map(c=>xa(c,r))){const c=this.clone();c.verse=s[0];const p=c.verseNum;if(o.push(c),s.length>1){const u=this.clone();if(u.verse=s[1],!t)for(let m=p+1;m<u.verseNum;m++){const v=new ce(this._bookNum,this._chapterNum,m,this.versification);this.isExcluded||o.push(v)}o.push(u)}}return o}validateVerse(t,r){if(!this.verse)return this.internalValid;let n=0;for(const o of this.allVerses(!0,t,r)){const a=o.internalValid;if(a!==0)return a;const s=o.BBBCCCVVV;if(n>s)return 3;if(n===s)return 4;n=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>me.lastBook?2:(me.isCanonical(this._bookNum),0)}setEmpty(t=ce.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,r,n){this.bookNum=me.bookIdToNumber(t),this.chapter=r,this.verse=n}};ae(Ie,"defaultVersification",St.English),ae(Ie,"verseRangeSeparator","-"),ae(Ie,"verseSequenceIndicator",","),ae(Ie,"verseRangeSeparators",[Ie.verseRangeSeparator]),ae(Ie,"verseSequenceIndicators",[Ie.verseSequenceIndicator]),ae(Ie,"chapterDigitShifter",1e3),ae(Ie,"bookDigitShifter",Ie.chapterDigitShifter*Ie.chapterDigitShifter),ae(Ie,"bcvMaxValue",Ie.chapterDigitShifter-1),ae(Ie,"ValidStatusType",_s);let br=class extends Error{};const kn=ge.Root,Co=ge.Trigger,Ms=ge.Group,Rc=ge.Portal,Pc=ge.Sub,$c=ge.RadioGroup,Ds=E.forwardRef(({className:e,inset:t,children:r,...n},o)=>l.jsxs(ge.SubTrigger,{ref:o,className:B("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...n,children:[r,l.jsx(oe.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Ds.displayName=ge.SubTrigger.displayName;const As=E.forwardRef(({className:e,...t},r)=>l.jsx(ge.SubContent,{ref:r,className:B("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));As.displayName=ge.SubContent.displayName;const Vr=E.forwardRef(({className:e,sideOffset:t=4,...r},n)=>l.jsx(ge.Portal,{children:l.jsx(ge.Content,{ref:n,sideOffset:t,className:B("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r})}));Vr.displayName=ge.Content.displayName;const jo=E.forwardRef(({className:e,inset:t,...r},n)=>l.jsx(ge.Item,{ref:n,className:B("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...r}));jo.displayName=ge.Item.displayName;const En=E.forwardRef(({className:e,children:t,checked:r,...n},o)=>l.jsxs(ge.CheckboxItem,{ref:o,className:B("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:r,...n,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(ge.ItemIndicator,{children:l.jsx(oe.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));En.displayName=ge.CheckboxItem.displayName;const Oo=E.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(ge.RadioItem,{ref:n,className:B("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...r,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(ge.ItemIndicator,{children:l.jsx(oe.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));Oo.displayName=ge.RadioItem.displayName;const cr=E.forwardRef(({className:e,inset:t,...r},n)=>l.jsx(ge.Label,{ref:n,className:B("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...r}));cr.displayName=ge.Label.displayName;const zr=E.forwardRef(({className:e,...t},r)=>l.jsx(ge.Separator,{ref:r,className:B("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));zr.displayName=ge.Separator.displayName;function Ls({className:e,...t}){return l.jsx("span",{className:B("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Ls.displayName="DropdownMenuShortcut";const Ic=E.forwardRef(({bookId:e,handleSelectBook:t,isSelected:r,handleHighlightBook:n,handleKeyDown:o,bookType:a,children:s},c)=>l.jsxs(jo,{ref:c,textValue:e,className:B("pr-mx-1 pr-px-1 pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":r}),onSelect:p=>{p.preventDefault(),t()},onKeyDown:p=>{o(p)},onFocus:n,onMouseMove:n,children:[l.jsx("span",{className:B("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":r,"pr-border-l-red-200":a.toLowerCase()==="ot","pr-border-l-purple-200":a.toLowerCase()==="nt","pr-border-l-indigo-200":a.toLowerCase()==="dc"}),children:me.bookIdToEnglishName(e)}),r&&l.jsx("div",{children:s})]},e));function _c({handleSelectChapter:e,endChapter:t,activeChapter:r,highlightedChapter:n,handleHighlightedChapter:o}){const a=Array.from({length:t},(c,p)=>p+1),s=E.useCallback(c=>{o(c)},[o]);return l.jsx("div",{className:B("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:a.map(c=>l.jsx("div",{className:B("pr-box-content pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":c===r,"pr-bg-amber-200":c===n}),onClick:p=>{p.preventDefault(),p.stopPropagation(),e(c)},role:"button",onKeyDown:p=>{p.key==="Enter"&&e(c)},tabIndex:0,onMouseMove:()=>s(c),children:c},c))})}function Mc({handleSort:e,handleLocationHistory:t,handleBookmarks:r}){return l.jsxs(cr,{className:"pr-flex pr-justify-between",children:[l.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),l.jsxs("div",{className:"pr-flex pr-items-center",children:[l.jsx(oe.ArrowDownWideNarrow,{onClick:e,className:"pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"}),l.jsx(oe.Clock,{onClick:t,className:"pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"}),l.jsx(oe.Bookmark,{onClick:r,className:"pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"})]})]})}const Or=me.allBookIds,Dc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ka=["OT","NT","DC"],Ac=32+32+32,Lc=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Bc=e=>({OT:Or.filter(r=>me.isBookOT(r)),NT:Or.filter(r=>me.isBookNT(r)),DC:Or.filter(r=>me.isBookDC(r))})[e],vr=e=>re.getChaptersForBook(me.bookIdToNumber(e));function Fc(){return Or.map(t=>me.bookIdToEnglishName(t))}function Vc(e){return Fc().includes(e)}function zc(e){const t=e.toLowerCase().replace(/^\w/,r=>r.toUpperCase());if(Vc(t))return Or.find(n=>me.bookIdToEnglishName(n)===t)}function Uc({scrRef:e,handleSubmit:t}){const[r,n]=E.useState(""),[o,a]=E.useState(me.bookNumberToId(e.bookNum)),[s,c]=E.useState(e.chapterNum??0),[p,u]=E.useState(me.bookNumberToId(e.bookNum)),[m,v]=E.useState(!1),[b,d]=E.useState(m),h=E.useRef(void 0),f=E.useRef(void 0),g=E.useRef(void 0),x=E.useCallback($=>Bc($).filter(N=>{const O=me.bookIdToEnglishName(N).toLowerCase(),I=r.replace(/[^a-zA-Z]/g,"").toLowerCase();return O.includes(I)||N.toLowerCase().includes(I)}),[r]),R=$=>{n($)},w=E.useRef(!1),k=E.useCallback($=>{if(w.current){w.current=!1;return}v($)},[]),y=E.useCallback(($,N,O,I)=>{if(c(me.bookNumberToId(e.bookNum)!==$?1:e.chapterNum),N||vr($)===-1){t({bookNum:me.bookIdToNumber($),chapterNum:O||1,verseNum:I||1}),v(!1),n("");return}a(o!==$?$:""),v(!N)},[t,e.bookNum,e.chapterNum,o]),S=$=>{$<=0||$>vr(o)||y(o,!0,$)},C=E.useCallback(()=>{Lc.forEach($=>{const N=r.match($);if(N){const[O,I=void 0,U=void 0]=N.slice(1),A=zc(O);(me.isBookIdValid(O)||A)&&y(A??O,!0,I?parseInt(I,10):1,U?parseInt(U,10):1)}})},[y,r]),_=E.useCallback($=>{m?($.key==="ArrowDown"||$.key==="ArrowUp")&&(typeof g<"u"&&g.current!==null?g.current.focus():typeof f<"u"&&f.current!==null&&f.current.focus(),$.preventDefault()):v(!0)},[m]),D=$=>{const{key:N}=$;N==="ArrowRight"||N==="ArrowLeft"||N==="ArrowDown"||N==="ArrowUp"||N==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:N})),h.current.focus())},V=$=>{const{key:N}=$;if(p===o){if(N==="Enter"){$.preventDefault(),y(o,!0,s);return}let O=0;if(N==="ArrowRight")if(s<vr(p))O=1;else{$.preventDefault();return}else if(N==="ArrowLeft")if(s>1)O=-1;else{$.preventDefault();return}else N==="ArrowDown"?O=6:N==="ArrowUp"&&(O=-6);s+O<=0||s+O>vr(p)?c(0):O!==0&&(c(s+O),$.preventDefault())}};return E.useEffect(()=>{o===p?o===me.bookNumberToId(e.bookNum)?c(e.chapterNum):c(1):c(0)},[p,e.bookNum,e.chapterNum,o]),E.useLayoutEffect(()=>{d(m)},[m]),E.useLayoutEffect(()=>{const $=setTimeout(()=>{if(b&&f.current&&g.current){const O=g.current.offsetTop-Ac;f.current.scrollTo({top:O,behavior:"instant"})}},10);return()=>{clearTimeout($)}},[b]),l.jsx("div",{className:"pr-twp pr-flex",children:l.jsxs(kn,{modal:!1,open:m,onOpenChange:k,children:[l.jsx(Co,{asChild:!0,children:l.jsx(bc,{ref:h,value:r,handleSearch:R,handleKeyDown:_,handleOnClick:()=>{a(me.bookNumberToId(e.bookNum)),u(me.bookNumberToId(e.bookNum)),c(e.chapterNum>0?e.chapterNum:0),v(!0),h.current.focus()},onFocus:()=>{w.current=!0},handleSubmit:C,placeholder:`${me.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),l.jsxs(Vr,{className:"pr-m-1 pr-overflow-y-auto pr-p-0 pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px",zIndex:"250"},onKeyDown:D,align:"start",ref:f,children:[l.jsx(Mc,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),ka.map(($,N)=>x($).length>0&&l.jsxs("div",{children:[l.jsx(cr,{className:"pr-font-semibold pr-text-slate-700",children:Dc[$]}),x($).map(O=>l.jsx("div",{children:l.jsx(Ic,{bookId:O,handleSelectBook:()=>y(O,!1),isSelected:o===O,handleHighlightBook:()=>u(O),handleKeyDown:V,bookType:$,ref:I=>{o===O&&(g.current=I)},children:l.jsx(_c,{handleSelectChapter:S,endChapter:vr(O),activeChapter:e.bookNum===me.bookIdToNumber(O)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:I=>{c(I)}})})},O)),ka.length-1!==N?l.jsx(zr,{}):void 0]},$))]})]})})}const Bs=Eo.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),ve=E.forwardRef(({className:e,variant:t,size:r,asChild:n=!1,...o},a)=>{const s=n?sc.Slot:"button";return l.jsx(s,{className:B(Bs({variant:t,size:r,className:e})),ref:a,...o})});ve.displayName="Button";function Gc({table:e}){return l.jsxs(kn,{children:[l.jsx(Ss.DropdownMenuTrigger,{asChild:!0,children:l.jsxs(ve,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[l.jsx(oe.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),l.jsxs(Vr,{align:"end",className:"pr-w-[150px]",children:[l.jsx(cr,{children:"Toggle columns"}),l.jsx(zr,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>l.jsx(En,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:r=>t.toggleVisibility(!!r),children:t.id},t.id))]})]})}const Zt=xe.Root,Fs=xe.Group,Qt=xe.Value,Mt=E.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(xe.Trigger,{ref:n,className:B("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...r,children:[t,l.jsx(xe.Icon,{asChild:!0,children:l.jsx(oe.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));Mt.displayName=xe.Trigger.displayName;const Ro=E.forwardRef(({className:e,...t},r)=>l.jsx(xe.ScrollUpButton,{ref:r,className:B("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:l.jsx(oe.ChevronUp,{className:"pr-h-4 pr-w-4"})}));Ro.displayName=xe.ScrollUpButton.displayName;const Po=E.forwardRef(({className:e,...t},r)=>l.jsx(xe.ScrollDownButton,{ref:r,className:B("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:l.jsx(oe.ChevronDown,{className:"pr-h-4 pr-w-4"})}));Po.displayName=xe.ScrollDownButton.displayName;const Dt=E.forwardRef(({className:e,children:t,position:r="popper",...n},o)=>l.jsx(xe.Portal,{children:l.jsxs(xe.Content,{ref:o,className:B("pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:r,...n,children:[l.jsx(Ro,{}),l.jsx(xe.Viewport,{className:B("pr-p-1",r==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),l.jsx(Po,{})]})}));Dt.displayName=xe.Content.displayName;const Vs=E.forwardRef(({className:e,...t},r)=>l.jsx(xe.Label,{ref:r,className:B("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));Vs.displayName=xe.Label.displayName;const Ge=E.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(xe.Item,{ref:n,className:B("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...r,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(xe.ItemIndicator,{children:l.jsx(oe.Check,{className:"pr-h-4 pr-w-4"})})}),l.jsx(xe.ItemText,{children:t})]}));Ge.displayName=xe.Item.displayName;const zs=E.forwardRef(({className:e,...t},r)=>l.jsx(xe.Separator,{ref:r,className:B("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));zs.displayName=xe.Separator.displayName;function Hc({table:e}){return l.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[l.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[l.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),l.jsxs(Zt,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[l.jsx(Mt,{className:"pr-h-8 pr-w-[70px]",children:l.jsx(Qt,{placeholder:e.getState().pagination.pageSize})}),l.jsx(Dt,{side:"top",children:[10,20,30,40,50].map(t=>l.jsx(Ge,{value:`${t}`,children:t},t))})]})]}),l.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[l.jsxs(ve,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),l.jsx(oe.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(ve,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),l.jsx(oe.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(ve,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),l.jsx(oe.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(ve,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),l.jsx(oe.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}const Ur=E.forwardRef(({className:e,stickyHeader:t,...r},n)=>l.jsx("div",{className:B("pr-twp pr-relative pr-w-full",{"pr-overflow-auto":!t}),children:l.jsx("table",{ref:n,className:B("pr-w-full pr-caption-bottom pr-text-sm",e),...r})}));Ur.displayName="Table";const Gr=E.forwardRef(({className:e,stickyHeader:t,...r},n)=>l.jsx("thead",{ref:n,className:B({"pr-sticky pr-top-0 pr-bg-muted":t},"[&_tr]:pr-border-b",e),...r}));Gr.displayName="TableHeader";const Hr=E.forwardRef(({className:e,...t},r)=>l.jsx("tbody",{ref:r,className:B("[&_tr:last-child]:pr-border-0",e),...t}));Hr.displayName="TableBody";const Us=E.forwardRef(({className:e,...t},r)=>l.jsx("tfoot",{ref:r,className:B("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));Us.displayName="TableFooter";const lt=E.forwardRef(({className:e,...t},r)=>l.jsx("tr",{ref:r,className:B("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));lt.displayName="TableRow";const er=E.forwardRef(({className:e,...t},r)=>l.jsx("th",{ref:r,className:B("pr-h-12 pr-px-4 pr-text-start pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pe-0",e),...t}));er.displayName="TableHead";const At=E.forwardRef(({className:e,...t},r)=>l.jsx("td",{ref:r,className:B("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pe-0",e),...t}));At.displayName="TableCell";const Gs=E.forwardRef(({className:e,...t},r)=>l.jsx("caption",{ref:r,className:B("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));Gs.displayName="TableCaption";function Hs({columns:e,data:t,enablePagination:r=!1,showPaginationControls:n=!1,showColumnVisibilityControls:o=!1,stickyHeader:a=!1,onRowClickHandler:s=()=>{}}){var g;const[c,p]=E.useState([]),[u,m]=E.useState([]),[v,b]=E.useState({}),[d,h]=E.useState({}),f=je.useReactTable({data:t,columns:e,getCoreRowModel:je.getCoreRowModel(),...r&&{getPaginationRowModel:je.getPaginationRowModel()},onSortingChange:p,getSortedRowModel:je.getSortedRowModel(),onColumnFiltersChange:m,getFilteredRowModel:je.getFilteredRowModel(),onColumnVisibilityChange:b,onRowSelectionChange:h,state:{sorting:c,columnFilters:u,columnVisibility:v,rowSelection:d}});return l.jsxs("div",{className:"pr-twp pr-font-sans",children:[o&&l.jsx(Gc,{table:f}),l.jsxs(Ur,{stickyHeader:a,children:[l.jsx(Gr,{stickyHeader:a,children:f.getHeaderGroups().map(x=>l.jsx(lt,{children:x.headers.map(R=>l.jsx(er,{children:R.isPlaceholder?void 0:je.flexRender(R.column.columnDef.header,R.getContext())},R.id))},x.id))}),l.jsx(Hr,{children:(g=f.getRowModel().rows)!=null&&g.length?f.getRowModel().rows.map(x=>l.jsx(lt,{onClick:()=>s(x,f),"data-state":x.getIsSelected()&&"selected",children:x.getVisibleCells().map(R=>l.jsx(At,{children:je.flexRender(R.column.columnDef.cell,R.getContext())},R.id))},x.id)):l.jsx(lt,{children:l.jsx(At,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]}),r&&l.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[l.jsx(ve,{variant:"outline",size:"sm",onClick:()=>f.previousPage(),disabled:!f.getCanPreviousPage(),children:"Previous"}),l.jsx(ve,{variant:"outline",size:"sm",onClick:()=>f.nextPage(),disabled:!f.getCanNextPage(),children:"Next"})]}),r&&n&&l.jsx(Hc,{table:f})]})}const qc=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Ea=e=>{const t=/^\\[vc]\s+(\d+)/,r=e.match(t);if(r)return+r[1]},Na=(e,t,r,n)=>{if(!e||e===""||t==="")return[];const o=[],a=qc(e);let s=n.chapterNum,c=n.verseNum,p=0;return a.forEach(u=>{u.startsWith("\\id")&&(s=0,c=0),u.startsWith("\\c")&&(s=Ea(u),c=0),u.startsWith("\\v")&&(c=Ea(u),s===0&&(s=n.chapterNum));const m=r(u,t);for(let v=0;v<m.length;v++){const b={reference:{...n,chapterNum:s!==void 0?+s:-1,verseNum:c!==void 0?+c:-1},snippet:u,key:p};p+=1,o.push(b)}}),o};function Wc({selectedItem:e,text:t,extractItems:r,scriptureReference:n,setScriptureReference:o,localizedStrings:a}){const s=a["%webView_inventory_occurrences_table_header_reference%"],c=a["%webView_inventory_occurrences_table_header_occurrence%"],[p,u]=E.useState(Na(t,e,r,n));return E.useEffect(()=>u(Na(t,e,r,n)),[t,e,n,r]),l.jsxs(Ur,{stickyHeader:!0,children:[l.jsx(Gr,{stickyHeader:!0,children:l.jsxs(lt,{children:[l.jsx(er,{children:s}),l.jsx(er,{children:c})]})}),l.jsx(Hr,{children:p.map(m=>l.jsxs(lt,{onClick:()=>{o(m.reference)},children:[l.jsx(At,{children:`${me.bookNumberToEnglishName(m.reference.bookNum)} ${m.reference.chapterNum}:${m.reference.verseNum}`}),l.jsx(At,{children:m.snippet})]},m.key))})]})}const Xc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_book%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),Nn=e=>e==="asc"?l.jsx(oe.ArrowUpIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}):e==="desc"?l.jsx(oe.ArrowDownIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}):l.jsx(oe.ArrowUpDownIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}),Kc=(e,t,r)=>{let n=e;return t!=="all"&&(n=n.filter(o=>t==="approved"&&o.status==="approved"||t==="unapproved"&&o.status==="unapproved"||t==="unknown"&&o.status==="unknown")),r!==""&&(n=n.filter(o=>o.item.includes(r))),n},Yc=(e,t,r)=>{const n=[],o=t(e);for(let a=0;a<o.length;a++){const s=o[a],c=n.find(p=>p.item===s);if(c)c.count+=1;else{const p={item:s,count:1,status:r(s)};n.push(p)}}return n},gt=(e,t)=>e[t]??t;function Jc({scriptureReference:e,setScriptureReference:t,localizedStrings:r,extractItems:n,approvedItems:o,onApprovedItemsChange:a,unapprovedItems:s,onUnapprovedItemsChange:c,text:p,scope:u,onScopeChange:m,getColumns:v}){const b=gt(r,"%webView_inventory_all%"),d=gt(r,"%webView_inventory_approved%"),h=gt(r,"%webView_inventory_unapproved%"),f=gt(r,"%webView_inventory_unknown%"),g=gt(r,"%webView_inventory_scope_book%"),x=gt(r,"%webView_inventory_scope_chapter%"),R=gt(r,"%webView_inventory_scope_verse%"),w=gt(r,"%webView_inventory_filter_text%"),[k,y]=E.useState([]),[S,C]=E.useState("all"),[_,D]=E.useState(""),[V,$]=E.useState(""),N=E.useCallback((z,j)=>{y(W=>{let G=[];return z.forEach(K=>{G=W.map(X=>X.item===K&&X.status!==j?{...X,status:j}:X)}),G});let L=[...o];z.forEach(W=>{j==="approved"?L.includes(W)||L.push(W):L=L.filter(G=>G!==W)}),a(L);let q=[...s];z.forEach(W=>{j==="unapproved"?q.includes(W)||q.push(W):q=q.filter(G=>G!==W)}),c(q)},[o,a,s,c]),O=E.useCallback(z=>o.includes(z)?"approved":s.includes(z)?"unapproved":"unknown",[o,s]);E.useEffect(()=>{p&&y(Yc(p,n,O))},[n,p,O]);const I=E.useMemo(()=>Kc(k,S,_),[k,S,_]);E.useEffect(()=>{$("")},[I]);const U=(z,j)=>{j.toggleAllRowsSelected(!1),z.toggleSelected(void 0),$(z.getValue("item"))},A=E.useMemo(()=>v(N),[v,N]),H=z=>{if(z==="book"||z==="chapter"||z==="verse")m(z);else throw new Error(`Invalid scope value: ${z}`)},ee=z=>{if(z==="all"||z==="approved"||z==="unapproved"||z==="unknown")C(z);else throw new Error(`Invalid status filter value: ${z}`)};return l.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-flex-col",children:[l.jsxs("div",{className:"pr-flex",children:[l.jsxs(Zt,{onValueChange:z=>ee(z),defaultValue:S,children:[l.jsx(Mt,{className:"pr-m-1",children:l.jsx(Qt,{placeholder:"Select filter"})}),l.jsxs(Dt,{className:"pr-font-sans",children:[l.jsx(Ge,{value:"all",children:b}),l.jsx(Ge,{value:"approved",children:d}),l.jsx(Ge,{value:"unapproved",children:h}),l.jsx(Ge,{value:"unknown",children:f})]})]}),l.jsxs(Zt,{onValueChange:z=>H(z),defaultValue:u,children:[l.jsx(Mt,{className:"pr-m-1",children:l.jsx(Qt,{placeholder:"Select scope"})}),l.jsxs(Dt,{className:"pr-font-sans",children:[l.jsx(Ge,{value:"book",children:g}),l.jsx(Ge,{value:"chapter",children:x}),l.jsx(Ge,{value:"verse",children:R})]})]}),l.jsx(ir,{className:"pr-m-1 pr-rounded-md pr-border",placeholder:w,value:_,onChange:z=>{D(z.target.value)}})]}),l.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:l.jsx(Hs,{columns:A,data:I,onRowClickHandler:U,stickyHeader:!0})}),V!==""&&l.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:l.jsx(Wc,{selectedItem:V,text:p,extractItems:n,scriptureReference:e,setScriptureReference:z=>t(z),localizedStrings:r})})]})}const Zc=e=>({accessorKey:"item",header:({column:t})=>l.jsxs(ve,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,Nn(t.getIsSorted())]})}),Qc=e=>({accessorKey:"count",header:({column:t})=>l.jsxs(ve,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,Nn(t.getIsSorted())]})}),ep=(e,t)=>({accessorKey:"status",header:({column:r,table:n})=>{const o=n.getSelectedRowModel().rows,a=[];return o.forEach(s=>{a.push(s.getValue("item"))}),l.jsxs("div",{className:"pr-flex pr-justify-start",children:[l.jsxs(ve,{className:"pr-mt-1",variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[e,Nn(r.getIsSorted())]}),l.jsx(ve,{className:"pr-m-1",children:l.jsx(oe.CircleCheckIcon,{onClick:()=>{t(a,"approved")}})}),l.jsx(ve,{className:"pr-m-1",children:l.jsx(oe.CircleXIcon,{onClick:()=>{t(a,"unapproved")}})}),l.jsx(ve,{className:"pr-m-1",children:l.jsx(oe.CircleHelpIcon,{onClick:()=>{t(a,"unknown")}})})]})},cell:({row:r})=>{switch(r.getValue("status")){case"approved":return l.jsx(oe.CircleCheckIcon,{});case"unapproved":return l.jsx(oe.CircleXIcon,{});case"unknown":default:return l.jsx(oe.CircleHelpIcon,{})}}}),zn={[re.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[re.getLocalizeKeyForScrollGroupId(0)]:"A",[re.getLocalizeKeyForScrollGroupId(1)]:"B",[re.getLocalizeKeyForScrollGroupId(2)]:"C",[re.getLocalizeKeyForScrollGroupId(3)]:"D",[re.getLocalizeKeyForScrollGroupId(4)]:"E",[re.getLocalizeKeyForScrollGroupId(5)]:"F",[re.getLocalizeKeyForScrollGroupId(6)]:"G",[re.getLocalizeKeyForScrollGroupId(7)]:"H",[re.getLocalizeKeyForScrollGroupId(8)]:"I",[re.getLocalizeKeyForScrollGroupId(9)]:"J",[re.getLocalizeKeyForScrollGroupId(10)]:"K",[re.getLocalizeKeyForScrollGroupId(11)]:"L",[re.getLocalizeKeyForScrollGroupId(12)]:"M",[re.getLocalizeKeyForScrollGroupId(13)]:"N",[re.getLocalizeKeyForScrollGroupId(14)]:"O",[re.getLocalizeKeyForScrollGroupId(15)]:"P",[re.getLocalizeKeyForScrollGroupId(16)]:"Q",[re.getLocalizeKeyForScrollGroupId(17)]:"R",[re.getLocalizeKeyForScrollGroupId(18)]:"S",[re.getLocalizeKeyForScrollGroupId(19)]:"T",[re.getLocalizeKeyForScrollGroupId(20)]:"U",[re.getLocalizeKeyForScrollGroupId(21)]:"V",[re.getLocalizeKeyForScrollGroupId(22)]:"W",[re.getLocalizeKeyForScrollGroupId(23)]:"X",[re.getLocalizeKeyForScrollGroupId(24)]:"Y",[re.getLocalizeKeyForScrollGroupId(25)]:"Z"};function tp({availableScrollGroupIds:e,scrollGroupId:t,onChangeScrollGroupId:r,localizedStrings:n={}}){const o={...zn,...Object.fromEntries(Object.entries(n).map(([a,s])=>[a,a===s&&a in zn?zn[a]:s]))};return l.jsxs(Zt,{value:`${t}`,onValueChange:a=>r(a==="undefined"?void 0:parseInt(a,10)),children:[l.jsx(Mt,{className:"pr-w-auto",children:l.jsx(Qt,{placeholder:o[re.getLocalizeKeyForScrollGroupId(t)]??t})}),l.jsx(Dt,{style:{zIndex:250},children:e.map(a=>l.jsx(Ge,{value:`${a}`,children:o[re.getLocalizeKeyForScrollGroupId(a)]},a))})]})}const rp=_r.Root,np=_r.Trigger,qs=E.forwardRef(({className:e,align:t="center",sideOffset:r=4,...n},o)=>l.jsx(_r.Portal,{children:l.jsx(_r.Content,{ref:o,align:t,sideOffset:r,className:B("pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));qs.displayName=_r.Content.displayName;const op=et.Portal,Ws=E.forwardRef(({className:e,...t},r)=>l.jsx(et.Overlay,{ref:r,className:B("pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",e),...t}));Ws.displayName=et.Overlay.displayName;const ap=E.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(op,{children:[l.jsx(Ws,{}),l.jsxs(et.Content,{ref:n,className:B("pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",e),...r,children:[t,l.jsxs(et.Close,{className:"pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground",children:[l.jsx(oe.X,{className:"pr-h-4 pr-w-4"}),l.jsx("span",{className:"pr-sr-only",children:"Close"})]})]})]}));ap.displayName=et.Content.displayName;const sp=E.forwardRef(({className:e,...t},r)=>l.jsx(et.Title,{ref:r,className:B("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight",e),...t}));sp.displayName=et.Title.displayName;const ip=E.forwardRef(({className:e,...t},r)=>l.jsx(et.Description,{ref:r,className:B("pr-text-sm pr-text-muted-foreground",e),...t}));ip.displayName=et.Description.displayName;const Xs=E.forwardRef(({className:e,...t},r)=>l.jsx(De.Command,{ref:r,className:B("pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",e),...t}));Xs.displayName=De.Command.displayName;const Ks=E.forwardRef(({className:e,...t},r)=>l.jsxs("div",{className:"pr-flex pr-items-center pr-border-b pr-px-3",children:[l.jsx(oe.Search,{className:"pr-me-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"}),l.jsx(De.Command.Input,{ref:r,className:B("pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...t})]}));Ks.displayName=De.Command.Input.displayName;const Ys=E.forwardRef(({className:e,...t},r)=>l.jsx(De.Command.List,{ref:r,className:B("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden",e),...t}));Ys.displayName=De.Command.List.displayName;const Js=E.forwardRef((e,t)=>l.jsx(De.Command.Empty,{ref:t,className:"pr-py-6 pr-text-center pr-text-sm",...e}));Js.displayName=De.Command.Empty.displayName;const lp=E.forwardRef(({className:e,...t},r)=>l.jsx(De.Command.Group,{ref:r,className:B("pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",e),...t}));lp.displayName=De.Command.Group.displayName;const cp=E.forwardRef(({className:e,...t},r)=>l.jsx(De.Command.Separator,{ref:r,className:B("pr--mx-1 pr-h-px pr-bg-border",e),...t}));cp.displayName=De.Command.Separator.displayName;const Zs=E.forwardRef(({className:e,...t},r)=>l.jsx(De.Command.Item,{ref:r,className:B("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",e),...t}));Zs.displayName=De.Command.Item.displayName;function pp(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function lo({id:e,options:t=[],className:r,value:n,onChange:o=()=>{},getOptionLabel:a=pp,buttonPlaceholder:s="",textPlaceholder:c="",commandEmptyMessage:p="No option found",buttonVariant:u="outline",dir:m="ltr",isDisabled:v=!1,...b}){const[d,h]=E.useState(!1);return l.jsxs(rp,{open:d,onOpenChange:h,...b,children:[l.jsx(np,{asChild:!0,children:l.jsxs(ve,{variant:u,role:"combobox","aria-expanded":d,id:e,className:B("pr-w-[200px] pr-justify-between",r),disabled:v,children:[n?a(n):s,l.jsx(oe.ChevronsUpDown,{className:"pr-ms-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"})]})}),l.jsx(qs,{className:"pr-w-[200px] pr-p-0",dir:m,children:l.jsxs(Xs,{children:[l.jsx(Ks,{dir:m,placeholder:c,className:"pr-text-inherit"}),l.jsx(Js,{children:p}),l.jsx(Ys,{children:t.map(f=>l.jsxs(Zs,{value:a(f),onSelect:()=>{o(f),h(!1)},children:[l.jsx(oe.Check,{className:B("pr-me-2 pr-h-4 pr-w-4",{"pr-opacity-0":!n||a(n)!==a(f)})}),a(f)]},a(f)))})]})})]})}const dp=Eo.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),Mr=E.forwardRef(({className:e,...t},r)=>l.jsx(Cs.Root,{ref:r,className:B(dp(),e),...t}));Mr.displayName=Cs.Root.displayName;function up({startChapter:e,endChapter:t,handleSelectStartChapter:r,handleSelectEndChapter:n,isDisabled:o=!1,chapterCount:a}){const s=E.useMemo(()=>Array.from({length:a},(u,m)=>m+1),[a]),c=u=>{r(u),u>t&&n(u)},p=u=>{n(u),u<e&&r(u)};return l.jsxs(l.Fragment,{children:[l.jsx(Mr,{className:"book-selection-chapter-form-label start",htmlFor:"start-chapters-combobox",children:"Chapters"}),l.jsx(lo,{isDisabled:o,onChange:c,className:"book-selection-chapter",options:s,getOptionLabel:u=>u.toString(),value:e},"start chapter"),l.jsx(Mr,{className:"book-selection-chapter-form-label end",htmlFor:"end-chapters-combobox",children:"to"}),l.jsx(lo,{isDisabled:o,onChange:p,className:"book-selection-chapter",options:s,getOptionLabel:u=>u.toString(),value:t},"end chapter")]})}var Rt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Rt||{});function Qs({id:e,isChecked:t,labelText:r="",labelPosition:n=Rt.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:s=!1,hasError:c=!1,className:p,onChange:u}){const m=l.jsx(Se.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:a,disabled:s,className:`papi-checkbox ${c?"error":""} ${p??""}`,onChange:u});let v;if(r){const b=n===Rt.Before||n===Rt.Above,d=l.jsx("span",{className:`papi-checkbox-label ${c?"error":""} ${p??""}`,children:r}),h=n===Rt.Before||n===Rt.After,f=h?d:l.jsx("div",{children:d}),g=h?m:l.jsx("div",{children:m});v=l.jsxs(Se.FormLabel,{className:`papi-checkbox ${n.toString()}`,disabled:s,error:c,children:[b&&f,g,!b&&f]})}else v=m;return v}function fp({id:e,className:t,legend:r,listItems:n,selectedListItems:o,handleSelectListItem:a,createLabel:s}){return l.jsxs("fieldset",{id:e,className:t,children:[r&&l.jsx("legend",{children:r}),n.map(c=>l.jsx(Qs,{className:"check-item",isChecked:o.includes(c),labelText:s?s(c):c,onChange:()=>a(c)},c))]})}function mp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function hp(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var r=function n(){return this instanceof n?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};r.prototype=t.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(e).forEach(function(n){var o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(r,n,o.get?o:{enumerable:!0,get:function(){return e[n]}})}),r}var $o={},ei={exports:{}};(function(e){function t(r){return r&&r.__esModule?r:{default:r}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(ei);var gp=ei.exports,Un={};function pr(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...n){return e(...n)||t(...n)}}function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},P.apply(this,arguments)}function Pt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function ti(e){if(!Pt(e))return e;const t={};return Object.keys(e).forEach(r=>{t[r]=ti(e[r])}),t}function ct(e,t,r={clone:!0}){const n=r.clone?P({},e):e;return Pt(e)&&Pt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Pt(t[o])&&o in e&&Pt(e[o])?n[o]=ct(e[o],t[o],r):r.clone?n[o]=Pt(t[o])?ti(t[o]):t[o]:n[o]=t[o])}),n}var co={exports:{}},rn={exports:{}},pe={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ta;function bp(){if(Ta)return pe;Ta=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,b=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,g=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,R=e?Symbol.for("react.scope"):60119;function w(y){if(typeof y=="object"&&y!==null){var S=y.$$typeof;switch(S){case t:switch(y=y.type,y){case p:case u:case n:case a:case o:case v:return y;default:switch(y=y&&y.$$typeof,y){case c:case m:case h:case d:case s:return y;default:return S}}case r:return S}}}function k(y){return w(y)===u}return pe.AsyncMode=p,pe.ConcurrentMode=u,pe.ContextConsumer=c,pe.ContextProvider=s,pe.Element=t,pe.ForwardRef=m,pe.Fragment=n,pe.Lazy=h,pe.Memo=d,pe.Portal=r,pe.Profiler=a,pe.StrictMode=o,pe.Suspense=v,pe.isAsyncMode=function(y){return k(y)||w(y)===p},pe.isConcurrentMode=k,pe.isContextConsumer=function(y){return w(y)===c},pe.isContextProvider=function(y){return w(y)===s},pe.isElement=function(y){return typeof y=="object"&&y!==null&&y.$$typeof===t},pe.isForwardRef=function(y){return w(y)===m},pe.isFragment=function(y){return w(y)===n},pe.isLazy=function(y){return w(y)===h},pe.isMemo=function(y){return w(y)===d},pe.isPortal=function(y){return w(y)===r},pe.isProfiler=function(y){return w(y)===a},pe.isStrictMode=function(y){return w(y)===o},pe.isSuspense=function(y){return w(y)===v},pe.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===n||y===u||y===a||y===o||y===v||y===b||typeof y=="object"&&y!==null&&(y.$$typeof===h||y.$$typeof===d||y.$$typeof===s||y.$$typeof===c||y.$$typeof===m||y.$$typeof===g||y.$$typeof===x||y.$$typeof===R||y.$$typeof===f)},pe.typeOf=w,pe}var de={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sa;function vp(){return Sa||(Sa=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,b=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,g=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,R=e?Symbol.for("react.scope"):60119;function w(F){return typeof F=="string"||typeof F=="function"||F===n||F===u||F===a||F===o||F===v||F===b||typeof F=="object"&&F!==null&&(F.$$typeof===h||F.$$typeof===d||F.$$typeof===s||F.$$typeof===c||F.$$typeof===m||F.$$typeof===g||F.$$typeof===x||F.$$typeof===R||F.$$typeof===f)}function k(F){if(typeof F=="object"&&F!==null){var te=F.$$typeof;switch(te){case t:var M=F.type;switch(M){case p:case u:case n:case a:case o:case v:return M;default:var le=M&&M.$$typeof;switch(le){case c:case m:case h:case d:case s:return le;default:return te}}case r:return te}}}var y=p,S=u,C=c,_=s,D=t,V=m,$=n,N=h,O=d,I=r,U=a,A=o,H=v,ee=!1;function z(F){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),j(F)||k(F)===p}function j(F){return k(F)===u}function L(F){return k(F)===c}function q(F){return k(F)===s}function W(F){return typeof F=="object"&&F!==null&&F.$$typeof===t}function G(F){return k(F)===m}function K(F){return k(F)===n}function X(F){return k(F)===h}function J(F){return k(F)===d}function Y(F){return k(F)===r}function Z(F){return k(F)===a}function Q(F){return k(F)===o}function ie(F){return k(F)===v}de.AsyncMode=y,de.ConcurrentMode=S,de.ContextConsumer=C,de.ContextProvider=_,de.Element=D,de.ForwardRef=V,de.Fragment=$,de.Lazy=N,de.Memo=O,de.Portal=I,de.Profiler=U,de.StrictMode=A,de.Suspense=H,de.isAsyncMode=z,de.isConcurrentMode=j,de.isContextConsumer=L,de.isContextProvider=q,de.isElement=W,de.isForwardRef=G,de.isFragment=K,de.isLazy=X,de.isMemo=J,de.isPortal=Y,de.isProfiler=Z,de.isStrictMode=Q,de.isSuspense=ie,de.isValidElementType=w,de.typeOf=k}()),de}var Ca;function ri(){return Ca||(Ca=1,process.env.NODE_ENV==="production"?rn.exports=bp():rn.exports=vp()),rn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Gn,ja;function yp(){if(ja)return Gn;ja=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function n(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var s={},c=0;c<10;c++)s["_"+String.fromCharCode(c)]=c;var p=Object.getOwnPropertyNames(s).map(function(m){return s[m]});if(p.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(m){u[m]=m}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Gn=o()?Object.assign:function(a,s){for(var c,p=n(a),u,m=1;m<arguments.length;m++){c=Object(arguments[m]);for(var v in c)t.call(c,v)&&(p[v]=c[v]);if(e){u=e(c);for(var b=0;b<u.length;b++)r.call(c,u[b])&&(p[u[b]]=c[u[b]])}}return p},Gn}var Hn,Oa;function Io(){if(Oa)return Hn;Oa=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Hn=e,Hn}var qn,Ra;function ni(){return Ra||(Ra=1,qn=Function.call.bind(Object.prototype.hasOwnProperty)),qn}var Wn,Pa;function wp(){if(Pa)return Wn;Pa=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Io(),r={},n=ni();e=function(a){var s="Warning: "+a;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(a,s,c,p,u){if(process.env.NODE_ENV!=="production"){for(var m in a)if(n(a,m)){var v;try{if(typeof a[m]!="function"){var b=Error((p||"React class")+": "+c+" type `"+m+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[m]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw b.name="Invariant Violation",b}v=a[m](s,m,p,c,null,t)}catch(h){v=h}if(v&&!(v instanceof Error)&&e((p||"React class")+": type specification of "+c+" `"+m+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof v+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),v instanceof Error&&!(v.message in r)){r[v.message]=!0;var d=u?u():"";e("Failed "+c+" type: "+v.message+(d??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(r={})},Wn=o,Wn}var Xn,$a;function xp(){if($a)return Xn;$a=1;var e=ri(),t=yp(),r=Io(),n=ni(),o=wp(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(c){var p="Warning: "+c;typeof console<"u"&&console.error(p);try{throw new Error(p)}catch{}});function s(){return null}return Xn=function(c,p){var u=typeof Symbol=="function"&&Symbol.iterator,m="@@iterator";function v(j){var L=j&&(u&&j[u]||j[m]);if(typeof L=="function")return L}var b="<<anonymous>>",d={array:x("array"),bigint:x("bigint"),bool:x("boolean"),func:x("function"),number:x("number"),object:x("object"),string:x("string"),symbol:x("symbol"),any:R(),arrayOf:w,element:k(),elementType:y(),instanceOf:S,node:V(),objectOf:_,oneOf:C,oneOfType:D,shape:N,exact:O};function h(j,L){return j===L?j!==0||1/j===1/L:j!==j&&L!==L}function f(j,L){this.message=j,this.data=L&&typeof L=="object"?L:{},this.stack=""}f.prototype=Error.prototype;function g(j){if(process.env.NODE_ENV!=="production")var L={},q=0;function W(K,X,J,Y,Z,Q,ie){if(Y=Y||b,Q=Q||J,ie!==r){if(p){var F=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw F.name="Invariant Violation",F}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var te=Y+":"+J;!L[te]&&q<3&&(a("You are manually calling a React.PropTypes validation function for the `"+Q+"` prop on `"+Y+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),L[te]=!0,q++)}}return X[J]==null?K?X[J]===null?new f("The "+Z+" `"+Q+"` is marked as required "+("in `"+Y+"`, but its value is `null`.")):new f("The "+Z+" `"+Q+"` is marked as required in "+("`"+Y+"`, but its value is `undefined`.")):null:j(X,J,Y,Z,Q)}var G=W.bind(null,!1);return G.isRequired=W.bind(null,!0),G}function x(j){function L(q,W,G,K,X,J){var Y=q[W],Z=A(Y);if(Z!==j){var Q=H(Y);return new f("Invalid "+K+" `"+X+"` of type "+("`"+Q+"` supplied to `"+G+"`, expected ")+("`"+j+"`."),{expectedType:j})}return null}return g(L)}function R(){return g(s)}function w(j){function L(q,W,G,K,X){if(typeof j!="function")return new f("Property `"+X+"` of component `"+G+"` has invalid PropType notation inside arrayOf.");var J=q[W];if(!Array.isArray(J)){var Y=A(J);return new f("Invalid "+K+" `"+X+"` of type "+("`"+Y+"` supplied to `"+G+"`, expected an array."))}for(var Z=0;Z<J.length;Z++){var Q=j(J,Z,G,K,X+"["+Z+"]",r);if(Q instanceof Error)return Q}return null}return g(L)}function k(){function j(L,q,W,G,K){var X=L[q];if(!c(X)){var J=A(X);return new f("Invalid "+G+" `"+K+"` of type "+("`"+J+"` supplied to `"+W+"`, expected a single ReactElement."))}return null}return g(j)}function y(){function j(L,q,W,G,K){var X=L[q];if(!e.isValidElementType(X)){var J=A(X);return new f("Invalid "+G+" `"+K+"` of type "+("`"+J+"` supplied to `"+W+"`, expected a single ReactElement type."))}return null}return g(j)}function S(j){function L(q,W,G,K,X){if(!(q[W]instanceof j)){var J=j.name||b,Y=z(q[W]);return new f("Invalid "+K+" `"+X+"` of type "+("`"+Y+"` supplied to `"+G+"`, expected ")+("instance of `"+J+"`."))}return null}return g(L)}function C(j){if(!Array.isArray(j))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),s;function L(q,W,G,K,X){for(var J=q[W],Y=0;Y<j.length;Y++)if(h(J,j[Y]))return null;var Z=JSON.stringify(j,function(ie,F){var te=H(F);return te==="symbol"?String(F):F});return new f("Invalid "+K+" `"+X+"` of value `"+String(J)+"` "+("supplied to `"+G+"`, expected one of "+Z+"."))}return g(L)}function _(j){function L(q,W,G,K,X){if(typeof j!="function")return new f("Property `"+X+"` of component `"+G+"` has invalid PropType notation inside objectOf.");var J=q[W],Y=A(J);if(Y!=="object")return new f("Invalid "+K+" `"+X+"` of type "+("`"+Y+"` supplied to `"+G+"`, expected an object."));for(var Z in J)if(n(J,Z)){var Q=j(J,Z,G,K,X+"."+Z,r);if(Q instanceof Error)return Q}return null}return g(L)}function D(j){if(!Array.isArray(j))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var L=0;L<j.length;L++){var q=j[L];if(typeof q!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ee(q)+" at index "+L+"."),s}function W(G,K,X,J,Y){for(var Z=[],Q=0;Q<j.length;Q++){var ie=j[Q],F=ie(G,K,X,J,Y,r);if(F==null)return null;F.data&&n(F.data,"expectedType")&&Z.push(F.data.expectedType)}var te=Z.length>0?", expected one of type ["+Z.join(", ")+"]":"";return new f("Invalid "+J+" `"+Y+"` supplied to "+("`"+X+"`"+te+"."))}return g(W)}function V(){function j(L,q,W,G,K){return I(L[q])?null:new f("Invalid "+G+" `"+K+"` supplied to "+("`"+W+"`, expected a ReactNode."))}return g(j)}function $(j,L,q,W,G){return new f((j||"React class")+": "+L+" type `"+q+"."+W+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+G+"`.")}function N(j){function L(q,W,G,K,X){var J=q[W],Y=A(J);if(Y!=="object")return new f("Invalid "+K+" `"+X+"` of type `"+Y+"` "+("supplied to `"+G+"`, expected `object`."));for(var Z in j){var Q=j[Z];if(typeof Q!="function")return $(G,K,X,Z,H(Q));var ie=Q(J,Z,G,K,X+"."+Z,r);if(ie)return ie}return null}return g(L)}function O(j){function L(q,W,G,K,X){var J=q[W],Y=A(J);if(Y!=="object")return new f("Invalid "+K+" `"+X+"` of type `"+Y+"` "+("supplied to `"+G+"`, expected `object`."));var Z=t({},q[W],j);for(var Q in Z){var ie=j[Q];if(n(j,Q)&&typeof ie!="function")return $(G,K,X,Q,H(ie));if(!ie)return new f("Invalid "+K+" `"+X+"` key `"+Q+"` supplied to `"+G+"`.\nBad object: "+JSON.stringify(q[W],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(j),null,"  "));var F=ie(J,Q,G,K,X+"."+Q,r);if(F)return F}return null}return g(L)}function I(j){switch(typeof j){case"number":case"string":case"undefined":return!0;case"boolean":return!j;case"object":if(Array.isArray(j))return j.every(I);if(j===null||c(j))return!0;var L=v(j);if(L){var q=L.call(j),W;if(L!==j.entries){for(;!(W=q.next()).done;)if(!I(W.value))return!1}else for(;!(W=q.next()).done;){var G=W.value;if(G&&!I(G[1]))return!1}}else return!1;return!0;default:return!1}}function U(j,L){return j==="symbol"?!0:L?L["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&L instanceof Symbol:!1}function A(j){var L=typeof j;return Array.isArray(j)?"array":j instanceof RegExp?"object":U(L,j)?"symbol":L}function H(j){if(typeof j>"u"||j===null)return""+j;var L=A(j);if(L==="object"){if(j instanceof Date)return"date";if(j instanceof RegExp)return"regexp"}return L}function ee(j){var L=H(j);switch(L){case"array":case"object":return"an "+L;case"boolean":case"date":case"regexp":return"a "+L;default:return L}}function z(j){return!j.constructor||!j.constructor.name?b:j.constructor.name}return d.checkPropTypes=o,d.resetWarningCache=o.resetWarningCache,d.PropTypes=d,d},Xn}var Kn,Ia;function kp(){if(Ia)return Kn;Ia=1;var e=Io();function t(){}function r(){}return r.resetWarningCache=t,Kn=function(){function n(s,c,p,u,m,v){if(v!==e){var b=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw b.name="Invariant Violation",b}}n.isRequired=n;function o(){return n}var a={array:n,bigint:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:o,element:n,elementType:n,instanceOf:o,node:n,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:r,resetWarningCache:t};return a.PropTypes=a,a},Kn}if(process.env.NODE_ENV!=="production"){var Ep=ri(),Np=!0;co.exports=xp()(Ep.isElement,Np)}else co.exports=kp()();var Tp=co.exports;const i=mp(Tp);function Sp(e){const{prototype:t={}}=e;return!!t.isReactComponent}function oi(e,t,r,n,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let c;const p=a.type;return typeof p=="function"&&!Sp(p)&&(c="Did you accidentally use a plain function component for an element instead?"),c!==void 0?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const ai=pr(i.element,oi);ai.isRequired=pr(i.element.isRequired,oi);const qr=ai;function Cp(e){const{prototype:t={}}=e;return!!t.isReactComponent}function jp(e,t,r,n,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let c;return typeof a=="function"&&!Cp(a)&&(c="Did you accidentally provide a plain function component instead?"),c!==void 0?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Op=pr(i.elementType,jp),Rp="exact-prop: ​";function si(e){return process.env.NODE_ENV==="production"?e:P({},e,{[Rp]:t=>{const r=Object.keys(t).filter(n=>!e.hasOwnProperty(n));return r.length>0?new Error(`The following props are not supported: ${r.map(n=>`\`${n}\``).join(", ")}. Please remove them.`):null}})}function tr(e){let t="https://mui.com/production-error/?code="+e;for(let r=1;r<arguments.length;r+=1)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var po={exports:{}},ue={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _a;function Pp(){if(_a)return ue;_a=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function f(g){if(typeof g=="object"&&g!==null){var x=g.$$typeof;switch(x){case e:switch(g=g.type,g){case r:case o:case n:case u:case m:return g;default:switch(g=g&&g.$$typeof,g){case c:case s:case p:case b:case v:case a:return g;default:return x}}case t:return x}}}return ue.ContextConsumer=s,ue.ContextProvider=a,ue.Element=e,ue.ForwardRef=p,ue.Fragment=r,ue.Lazy=b,ue.Memo=v,ue.Portal=t,ue.Profiler=o,ue.StrictMode=n,ue.Suspense=u,ue.SuspenseList=m,ue.isAsyncMode=function(){return!1},ue.isConcurrentMode=function(){return!1},ue.isContextConsumer=function(g){return f(g)===s},ue.isContextProvider=function(g){return f(g)===a},ue.isElement=function(g){return typeof g=="object"&&g!==null&&g.$$typeof===e},ue.isForwardRef=function(g){return f(g)===p},ue.isFragment=function(g){return f(g)===r},ue.isLazy=function(g){return f(g)===b},ue.isMemo=function(g){return f(g)===v},ue.isPortal=function(g){return f(g)===t},ue.isProfiler=function(g){return f(g)===o},ue.isStrictMode=function(g){return f(g)===n},ue.isSuspense=function(g){return f(g)===u},ue.isSuspenseList=function(g){return f(g)===m},ue.isValidElementType=function(g){return typeof g=="string"||typeof g=="function"||g===r||g===o||g===n||g===u||g===m||g===d||typeof g=="object"&&g!==null&&(g.$$typeof===b||g.$$typeof===v||g.$$typeof===a||g.$$typeof===s||g.$$typeof===p||g.$$typeof===h||g.getModuleId!==void 0)},ue.typeOf=f,ue}var fe={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ma;function $p(){return Ma||(Ma=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h=!1,f=!1,g=!1,x=!1,R=!1,w;w=Symbol.for("react.module.reference");function k(M){return!!(typeof M=="string"||typeof M=="function"||M===r||M===o||R||M===n||M===u||M===m||x||M===d||h||f||g||typeof M=="object"&&M!==null&&(M.$$typeof===b||M.$$typeof===v||M.$$typeof===a||M.$$typeof===s||M.$$typeof===p||M.$$typeof===w||M.getModuleId!==void 0))}function y(M){if(typeof M=="object"&&M!==null){var le=M.$$typeof;switch(le){case e:var Ne=M.type;switch(Ne){case r:case o:case n:case u:case m:return Ne;default:var Pe=Ne&&Ne.$$typeof;switch(Pe){case c:case s:case p:case b:case v:case a:return Pe;default:return le}}case t:return le}}}var S=s,C=a,_=e,D=p,V=r,$=b,N=v,O=t,I=o,U=n,A=u,H=m,ee=!1,z=!1;function j(M){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function L(M){return z||(z=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function q(M){return y(M)===s}function W(M){return y(M)===a}function G(M){return typeof M=="object"&&M!==null&&M.$$typeof===e}function K(M){return y(M)===p}function X(M){return y(M)===r}function J(M){return y(M)===b}function Y(M){return y(M)===v}function Z(M){return y(M)===t}function Q(M){return y(M)===o}function ie(M){return y(M)===n}function F(M){return y(M)===u}function te(M){return y(M)===m}fe.ContextConsumer=S,fe.ContextProvider=C,fe.Element=_,fe.ForwardRef=D,fe.Fragment=V,fe.Lazy=$,fe.Memo=N,fe.Portal=O,fe.Profiler=I,fe.StrictMode=U,fe.Suspense=A,fe.SuspenseList=H,fe.isAsyncMode=j,fe.isConcurrentMode=L,fe.isContextConsumer=q,fe.isContextProvider=W,fe.isElement=G,fe.isForwardRef=K,fe.isFragment=X,fe.isLazy=J,fe.isMemo=Y,fe.isPortal=Z,fe.isProfiler=Q,fe.isStrictMode=ie,fe.isSuspense=F,fe.isSuspenseList=te,fe.isValidElementType=k,fe.typeOf=y}()),fe}process.env.NODE_ENV==="production"?po.exports=Pp():po.exports=$p();var fn=po.exports;const Ip=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function _p(e){const t=`${e}`.match(Ip);return t&&t[1]||""}function ii(e,t=""){return e.displayName||e.name||_p(e)||t}function Da(e,t,r){const n=ii(t);return e.displayName||(n!==""?`${r}(${n})`:r)}function Mp(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return ii(e,"Component");if(typeof e=="object")switch(e.$$typeof){case fn.ForwardRef:return Da(e,e.render,"ForwardRef");case fn.Memo:return Da(e,e.type,"memo");default:return}}}function pt(e,t,r,n,o){if(process.env.NODE_ENV==="production")return null;const a=e[t],s=o||t;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an HTMLElement.`):null}const Dp=i.oneOfType([i.func,i.object]),_o=Dp;function tt(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":tr(7));return e.charAt(0).toUpperCase()+e.slice(1)}function uo(...e){return e.reduce((t,r)=>r==null?t:function(...o){t.apply(this,o),r.apply(this,o)},()=>{})}function li(e,t=166){let r;function n(...o){const a=()=>{e.apply(this,o)};clearTimeout(r),r=setTimeout(a,t)}return n.clear=()=>{clearTimeout(r)},n}function Ap(e,t){return process.env.NODE_ENV==="production"?()=>null:(r,n,o,a,s)=>{const c=o||"<<anonymous>>",p=s||n;return typeof r[n]<"u"?new Error(`The ${a} \`${p}\` of \`${c}\` is deprecated. ${t}`):null}}function Lp(e,t){var r,n;return T.isValidElement(e)&&t.indexOf((r=e.type.muiName)!=null?r:(n=e.type)==null||(n=n._payload)==null||(n=n.value)==null?void 0:n.muiName)!==-1}function Oe(e){return e&&e.ownerDocument||document}function rr(e){return Oe(e).defaultView||window}function Bp(e,t){if(process.env.NODE_ENV==="production")return()=>null;const r=t?P({},t.propTypes):null;return o=>(a,s,c,p,u,...m)=>{const v=u||s,b=r==null?void 0:r[v];if(b){const d=b(a,s,c,p,u,...m);if(d)return d}return typeof a[s]<"u"&&!a[o]?new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function mn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Fp=typeof window<"u"?T.useLayoutEffect:T.useEffect,Lt=Fp;let Aa=0;function Vp(e){const[t,r]=T.useState(e),n=e||t;return T.useEffect(()=>{t==null&&(Aa+=1,r(`mui-${Aa}`))},[t]),n}const La=T["useId".toString()];function ci(e){if(La!==void 0){const t=La();return e??t}return Vp(e)}function zp(e,t,r,n,o){if(process.env.NODE_ENV==="production")return null;const a=o||t;return typeof e[t]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function pi({controlled:e,default:t,name:r,state:n="value"}){const{current:o}=T.useRef(e!==void 0),[a,s]=T.useState(t),c=o?e:a;if(process.env.NODE_ENV!=="production"){T.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${n} state of ${r} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${r} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[n,r,e]);const{current:u}=T.useRef(t);T.useEffect(()=>{!o&&u!==t&&console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join(`
`))},[JSON.stringify(t)])}const p=T.useCallback(u=>{o||s(u)},[]);return[c,p]}function Dr(e){const t=T.useRef(e);return Lt(()=>{t.current=e}),T.useRef((...r)=>(0,t.current)(...r)).current}function We(...e){return T.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(r=>{mn(r,t)})},e)}const Ba={};function Up(e,t){const r=T.useRef(Ba);return r.current===Ba&&(r.current=e(t)),r}const Gp=[];function Hp(e){T.useEffect(e,Gp)}class Wr{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Wr}start(t,r){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,r()},t)}}function Sr(){const e=Up(Wr.create).current;return Hp(e.disposeEffect),e}let Tn=!0,fo=!1;const qp=new Wr,Wp={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Xp(e){const{type:t,tagName:r}=e;return!!(r==="INPUT"&&Wp[t]&&!e.readOnly||r==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Kp(e){e.metaKey||e.altKey||e.ctrlKey||(Tn=!0)}function Yn(){Tn=!1}function Yp(){this.visibilityState==="hidden"&&fo&&(Tn=!0)}function Jp(e){e.addEventListener("keydown",Kp,!0),e.addEventListener("mousedown",Yn,!0),e.addEventListener("pointerdown",Yn,!0),e.addEventListener("touchstart",Yn,!0),e.addEventListener("visibilitychange",Yp,!0)}function Zp(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Tn||Xp(t)}function di(){const e=T.useCallback(o=>{o!=null&&Jp(o.ownerDocument)},[]),t=T.useRef(!1);function r(){return t.current?(fo=!0,qp.start(100,()=>{fo=!1}),t.current=!1,!0):!1}function n(o){return Zp(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:n,onBlur:r,ref:e}}function ui(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Qp(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function ed(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const td=Number.isInteger||ed;function fi(e,t,r,n){const o=e[t];if(o==null||!td(o)){const a=Qp(o);return new RangeError(`Invalid ${n} \`${t}\` of type \`${a}\` supplied to \`${r}\`, expected \`integer\`.`)}return null}function mi(e,t,...r){return e[t]===void 0?null:fi(e,t,...r)}function mo(){return null}mi.isRequired=fi;mo.isRequired=mo;const hi=process.env.NODE_ENV==="production"?mo:mi;function gi(e,t){const r=P({},t);return Object.keys(e).forEach(n=>{if(n.toString().match(/^(components|slots)$/))r[n]=P({},e[n],r[n]);else if(n.toString().match(/^(componentsProps|slotProps)$/)){const o=e[n]||{},a=t[n];r[n]={},!a||!Object.keys(a)?r[n]=o:!o||!Object.keys(o)?r[n]=a:(r[n]=P({},a),Object.keys(o).forEach(s=>{r[n][s]=gi(o[s],a[s])}))}else r[n]===void 0&&(r[n]=e[n])}),r}function ft(e,t,r=void 0){const n={};return Object.keys(e).forEach(o=>{n[o]=e[o].reduce((a,s)=>{if(s){const c=t(s);c!==""&&a.push(c),r&&r[s]&&a.push(r[s])}return a},[]).join(" ")}),n}const Fa=e=>e,rd=()=>{let e=Fa;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Fa}}},nd=rd(),bi=nd,vi={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function nt(e,t,r="Mui"){const n=vi[t];return n?`${r}-${n}`:`${bi.generate(e)}-${t}`}function xt(e,t,r="Mui"){const n={};return t.forEach(o=>{n[o]=nt(e,o,r)}),n}function od(e,t=Number.MIN_SAFE_INTEGER,r=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,r))}function he(e,t){if(e==null)return{};var r={},n=Object.keys(e),o,a;for(a=0;a<n.length;a++)o=n[a],!(t.indexOf(o)>=0)&&(r[o]=e[o]);return r}const ad=["values","unit","step"],sd=e=>{const t=Object.keys(e).map(r=>({key:r,val:e[r]}))||[];return t.sort((r,n)=>r.val-n.val),t.reduce((r,n)=>P({},r,{[n.key]:n.val}),{})};function id(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:r="px",step:n=5}=e,o=he(e,ad),a=sd(t),s=Object.keys(a);function c(b){return`@media (min-width:${typeof t[b]=="number"?t[b]:b}${r})`}function p(b){return`@media (max-width:${(typeof t[b]=="number"?t[b]:b)-n/100}${r})`}function u(b,d){const h=s.indexOf(d);return`@media (min-width:${typeof t[b]=="number"?t[b]:b}${r}) and (max-width:${(h!==-1&&typeof t[s[h]]=="number"?t[s[h]]:d)-n/100}${r})`}function m(b){return s.indexOf(b)+1<s.length?u(b,s[s.indexOf(b)+1]):c(b)}function v(b){const d=s.indexOf(b);return d===0?c(s[1]):d===s.length-1?p(s[d]):u(b,s[s.indexOf(b)+1]).replace("@media","@media not all and")}return P({keys:s,values:a,up:c,down:p,between:u,only:m,not:v,unit:r},o)}const ld={borderRadius:4},cd=ld,pd=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.string,i.object,i.array]):{},kt=pd;function Rr(e,t){return t?ct(e,t,{clone:!1}):e}const Mo={xs:0,sm:600,md:900,lg:1200,xl:1536},Va={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Mo[e]}px)`};function dt(e,t,r){const n=e.theme||{};if(Array.isArray(t)){const a=n.breakpoints||Va;return t.reduce((s,c,p)=>(s[a.up(a.keys[p])]=r(t[p]),s),{})}if(typeof t=="object"){const a=n.breakpoints||Va;return Object.keys(t).reduce((s,c)=>{if(Object.keys(a.values||Mo).indexOf(c)!==-1){const p=a.up(c);s[p]=r(t[c],c)}else{const p=c;s[p]=t[p]}return s},{})}return r(t)}function dd(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((n,o)=>{const a=e.up(o);return n[a]={},n},{}))||{}}function ud(e,t){return e.reduce((r,n)=>{const o=r[n];return(!o||Object.keys(o).length===0)&&delete r[n],r},t)}function Sn(e,t,r=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&r){const n=`vars.${t}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(n!=null)return n}return t.split(".").reduce((n,o)=>n&&n[o]!=null?n[o]:null,e)}function hn(e,t,r,n=r){let o;return typeof e=="function"?o=e(r):Array.isArray(e)?o=e[r]||n:o=Sn(e,r)||n,t&&(o=t(o,n,e)),o}function Ee(e){const{prop:t,cssProperty:r=e.prop,themeKey:n,transform:o}=e,a=s=>{if(s[t]==null)return null;const c=s[t],p=s.theme,u=Sn(p,n)||{};return dt(s,c,v=>{let b=hn(u,o,v);return v===b&&typeof v=="string"&&(b=hn(u,o,`${t}${v==="default"?"":tt(v)}`,v)),r===!1?b:{[r]:b}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[t]:kt}:{},a.filterProps=[t],a}function fd(e){const t={};return r=>(t[r]===void 0&&(t[r]=e(r)),t[r])}const md={m:"margin",p:"padding"},hd={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},za={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},gd=fd(e=>{if(e.length>2)if(za[e])e=za[e];else return[e];const[t,r]=e.split(""),n=md[t],o=hd[r]||"";return Array.isArray(o)?o.map(a=>n+a):[n+o]}),Cn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],jn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],bd=[...Cn,...jn];function Xr(e,t,r,n){var o;const a=(o=Sn(e,t,!1))!=null?o:r;return typeof a=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${n} argument to be a number or a string, got ${s}.`),a*s):Array.isArray(a)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>a.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${s} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),a[s]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function yi(e){return Xr(e,"spacing",8,"spacing")}function Kr(e,t){if(typeof t=="string"||t==null)return t;const r=Math.abs(t),n=e(r);return t>=0?n:typeof n=="number"?-n:`-${n}`}function vd(e,t){return r=>e.reduce((n,o)=>(n[o]=Kr(t,r),n),{})}function yd(e,t,r,n){if(t.indexOf(r)===-1)return null;const o=gd(r),a=vd(o,n),s=e[r];return dt(e,s,a)}function wi(e,t){const r=yi(e.theme);return Object.keys(e).map(n=>yd(e,t,n,r)).reduce(Rr,{})}function ye(e){return wi(e,Cn)}ye.propTypes=process.env.NODE_ENV!=="production"?Cn.reduce((e,t)=>(e[t]=kt,e),{}):{};ye.filterProps=Cn;function we(e){return wi(e,jn)}we.propTypes=process.env.NODE_ENV!=="production"?jn.reduce((e,t)=>(e[t]=kt,e),{}):{};we.filterProps=jn;process.env.NODE_ENV!=="production"&&bd.reduce((e,t)=>(e[t]=kt,e),{});function wd(e=8){if(e.mui)return e;const t=yi({spacing:e}),r=(...n)=>(process.env.NODE_ENV!=="production"&&(n.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)),(n.length===0?[1]:n).map(a=>{const s=t(a);return typeof s=="number"?`${s}px`:s}).join(" "));return r.mui=!0,r}function On(...e){const t=e.reduce((n,o)=>(o.filterProps.forEach(a=>{n[a]=o}),n),{}),r=n=>Object.keys(n).reduce((o,a)=>t[a]?Rr(o,t[a](n)):o,{});return r.propTypes=process.env.NODE_ENV!=="production"?e.reduce((n,o)=>Object.assign(n,o.propTypes),{}):{},r.filterProps=e.reduce((n,o)=>n.concat(o.filterProps),[]),r}function He(e){return typeof e!="number"?e:`${e}px solid`}function Ye(e,t){return Ee({prop:e,themeKey:"borders",transform:t})}const xd=Ye("border",He),kd=Ye("borderTop",He),Ed=Ye("borderRight",He),Nd=Ye("borderBottom",He),Td=Ye("borderLeft",He),Sd=Ye("borderColor"),Cd=Ye("borderTopColor"),jd=Ye("borderRightColor"),Od=Ye("borderBottomColor"),Rd=Ye("borderLeftColor"),Pd=Ye("outline",He),$d=Ye("outlineColor"),Rn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Xr(e.theme,"shape.borderRadius",4,"borderRadius"),r=n=>({borderRadius:Kr(t,n)});return dt(e,e.borderRadius,r)}return null};Rn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:kt}:{};Rn.filterProps=["borderRadius"];On(xd,kd,Ed,Nd,Td,Sd,Cd,jd,Od,Rd,Rn,Pd,$d);const Pn=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Xr(e.theme,"spacing",8,"gap"),r=n=>({gap:Kr(t,n)});return dt(e,e.gap,r)}return null};Pn.propTypes=process.env.NODE_ENV!=="production"?{gap:kt}:{};Pn.filterProps=["gap"];const $n=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Xr(e.theme,"spacing",8,"columnGap"),r=n=>({columnGap:Kr(t,n)});return dt(e,e.columnGap,r)}return null};$n.propTypes=process.env.NODE_ENV!=="production"?{columnGap:kt}:{};$n.filterProps=["columnGap"];const In=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Xr(e.theme,"spacing",8,"rowGap"),r=n=>({rowGap:Kr(t,n)});return dt(e,e.rowGap,r)}return null};In.propTypes=process.env.NODE_ENV!=="production"?{rowGap:kt}:{};In.filterProps=["rowGap"];const Id=Ee({prop:"gridColumn"}),_d=Ee({prop:"gridRow"}),Md=Ee({prop:"gridAutoFlow"}),Dd=Ee({prop:"gridAutoColumns"}),Ad=Ee({prop:"gridAutoRows"}),Ld=Ee({prop:"gridTemplateColumns"}),Bd=Ee({prop:"gridTemplateRows"}),Fd=Ee({prop:"gridTemplateAreas"}),Vd=Ee({prop:"gridArea"});On(Pn,$n,In,Id,_d,Md,Dd,Ad,Ld,Bd,Fd,Vd);function Jt(e,t){return t==="grey"?t:e}const zd=Ee({prop:"color",themeKey:"palette",transform:Jt}),Ud=Ee({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Jt}),Gd=Ee({prop:"backgroundColor",themeKey:"palette",transform:Jt});On(zd,Ud,Gd);function Ve(e){return e<=1&&e!==0?`${e*100}%`:e}const Hd=Ee({prop:"width",transform:Ve}),Do=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=r=>{var n,o;const a=((n=e.theme)==null||(n=n.breakpoints)==null||(n=n.values)==null?void 0:n[r])||Mo[r];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:Ve(r)}};return dt(e,e.maxWidth,t)}return null};Do.filterProps=["maxWidth"];const qd=Ee({prop:"minWidth",transform:Ve}),Wd=Ee({prop:"height",transform:Ve}),Xd=Ee({prop:"maxHeight",transform:Ve}),Kd=Ee({prop:"minHeight",transform:Ve});Ee({prop:"size",cssProperty:"width",transform:Ve});Ee({prop:"size",cssProperty:"height",transform:Ve});const Yd=Ee({prop:"boxSizing"});On(Hd,Do,qd,Wd,Xd,Kd,Yd);const Jd={border:{themeKey:"borders",transform:He},borderTop:{themeKey:"borders",transform:He},borderRight:{themeKey:"borders",transform:He},borderBottom:{themeKey:"borders",transform:He},borderLeft:{themeKey:"borders",transform:He},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:He},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Rn},color:{themeKey:"palette",transform:Jt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Jt},backgroundColor:{themeKey:"palette",transform:Jt},p:{style:we},pt:{style:we},pr:{style:we},pb:{style:we},pl:{style:we},px:{style:we},py:{style:we},padding:{style:we},paddingTop:{style:we},paddingRight:{style:we},paddingBottom:{style:we},paddingLeft:{style:we},paddingX:{style:we},paddingY:{style:we},paddingInline:{style:we},paddingInlineStart:{style:we},paddingInlineEnd:{style:we},paddingBlock:{style:we},paddingBlockStart:{style:we},paddingBlockEnd:{style:we},m:{style:ye},mt:{style:ye},mr:{style:ye},mb:{style:ye},ml:{style:ye},mx:{style:ye},my:{style:ye},margin:{style:ye},marginTop:{style:ye},marginRight:{style:ye},marginBottom:{style:ye},marginLeft:{style:ye},marginX:{style:ye},marginY:{style:ye},marginInline:{style:ye},marginInlineStart:{style:ye},marginInlineEnd:{style:ye},marginBlock:{style:ye},marginBlockStart:{style:ye},marginBlockEnd:{style:ye},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Pn},rowGap:{style:In},columnGap:{style:$n},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ve},maxWidth:{style:Do},minWidth:{transform:Ve},height:{transform:Ve},maxHeight:{transform:Ve},minHeight:{transform:Ve},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Ao=Jd;function Zd(...e){const t=e.reduce((n,o)=>n.concat(Object.keys(o)),[]),r=new Set(t);return e.every(n=>r.size===Object.keys(n).length)}function Qd(e,t){return typeof e=="function"?e(t):e}function eu(){function e(r,n,o,a){const s={[r]:n,theme:o},c=a[r];if(!c)return{[r]:n};const{cssProperty:p=r,themeKey:u,transform:m,style:v}=c;if(n==null)return null;if(u==="typography"&&n==="inherit")return{[r]:n};const b=Sn(o,u)||{};return v?v(s):dt(s,n,h=>{let f=hn(b,m,h);return h===f&&typeof h=="string"&&(f=hn(b,m,`${r}${h==="default"?"":tt(h)}`,h)),p===!1?f:{[p]:f}})}function t(r){var n;const{sx:o,theme:a={}}=r||{};if(!o)return null;const s=(n=a.unstable_sxConfig)!=null?n:Ao;function c(p){let u=p;if(typeof p=="function")u=p(a);else if(typeof p!="object")return p;if(!u)return null;const m=dd(a.breakpoints),v=Object.keys(m);let b=m;return Object.keys(u).forEach(d=>{const h=Qd(u[d],a);if(h!=null)if(typeof h=="object")if(s[d])b=Rr(b,e(d,h,a,s));else{const f=dt({theme:a},h,g=>({[d]:g}));Zd(f,h)?b[d]=t({sx:h,theme:a}):b=Rr(b,f)}else b=Rr(b,e(d,h,a,s))}),ud(v,b)}return Array.isArray(o)?o.map(c):c(o)}return t}const xi=eu();xi.filterProps=["sx"];const Lo=xi;function tu(e,t){const r=this;return r.vars&&typeof r.getColorSchemeSelector=="function"?{[r.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:r.palette.mode===e?t:{}}const ru=["breakpoints","palette","spacing","shape"];function Bo(e={},...t){const{breakpoints:r={},palette:n={},spacing:o,shape:a={}}=e,s=he(e,ru),c=id(r),p=wd(o);let u=ct({breakpoints:c,direction:"ltr",components:{},palette:P({mode:"light"},n),spacing:p,shape:P({},cd,a)},s);return u.applyStyles=tu,u=t.reduce((m,v)=>ct(m,v),u),u.unstable_sxConfig=P({},Ao,s==null?void 0:s.unstable_sxConfig),u.unstable_sx=function(v){return Lo({sx:v,theme:this})},u}function nu(e){return Object.keys(e).length===0}function ki(e=null){const t=T.useContext(so.ThemeContext);return!t||nu(t)?e:t}const ou=Bo();function Ei(e=ou){return ki(e)}const au=["ownerState"],su=["variants"],iu=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function lu(e){return Object.keys(e).length===0}function cu(e){return typeof e=="string"&&e.charCodeAt(0)>96}function ln(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const pu=Bo(),Ua=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function nn({defaultTheme:e,theme:t,themeId:r}){return lu(t)?e:t[r]||t}function du(e){return e?(t,r)=>r[e]:null}function cn(e,t){let{ownerState:r}=t,n=he(t,au);const o=typeof e=="function"?e(P({ownerState:r},n)):e;if(Array.isArray(o))return o.flatMap(a=>cn(a,P({ownerState:r},n)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let c=he(o,su);return a.forEach(p=>{let u=!0;typeof p.props=="function"?u=p.props(P({ownerState:r},n,r)):Object.keys(p.props).forEach(m=>{(r==null?void 0:r[m])!==p.props[m]&&n[m]!==p.props[m]&&(u=!1)}),u&&(Array.isArray(c)||(c=[c]),c.push(typeof p.style=="function"?p.style(P({ownerState:r},n,r)):p.style))}),c}return o}function uu(e={}){const{themeId:t,defaultTheme:r=pu,rootShouldForwardProp:n=ln,slotShouldForwardProp:o=ln}=e,a=s=>Lo(P({},s,{theme:nn(P({},s,{defaultTheme:r,themeId:t}))}));return a.__mui_systemSx=!0,(s,c={})=>{so.internal_processStyles(s,y=>y.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:p,slot:u,skipVariantsResolver:m,skipSx:v,overridesResolver:b=du(Ua(u))}=c,d=he(c,iu),h=m!==void 0?m:u&&u!=="Root"&&u!=="root"||!1,f=v||!1;let g;process.env.NODE_ENV!=="production"&&p&&(g=`${p}-${Ua(u||"Root")}`);let x=ln;u==="Root"||u==="root"?x=n:u?x=o:cu(s)&&(x=void 0);const R=so(s,P({shouldForwardProp:x,label:g},d)),w=y=>typeof y=="function"&&y.__emotion_real!==y||Pt(y)?S=>cn(y,P({},S,{theme:nn({theme:S.theme,defaultTheme:r,themeId:t})})):y,k=(y,...S)=>{let C=w(y);const _=S?S.map(w):[];p&&b&&_.push($=>{const N=nn(P({},$,{defaultTheme:r,themeId:t}));if(!N.components||!N.components[p]||!N.components[p].styleOverrides)return null;const O=N.components[p].styleOverrides,I={};return Object.entries(O).forEach(([U,A])=>{I[U]=cn(A,P({},$,{theme:N}))}),b($,I)}),p&&!h&&_.push($=>{var N;const O=nn(P({},$,{defaultTheme:r,themeId:t})),I=O==null||(N=O.components)==null||(N=N[p])==null?void 0:N.variants;return cn({variants:I},P({},$,{theme:O}))}),f||_.push(a);const D=_.length-S.length;if(Array.isArray(y)&&D>0){const $=new Array(D).fill("");C=[...y,...$],C.raw=[...y.raw,...$]}const V=R(C,..._);if(process.env.NODE_ENV!=="production"){let $;p&&($=`${p}${tt(u||"")}`),$===void 0&&($=`Styled(${Mp(s)})`),V.displayName=$}return s.muiName&&(V.muiName=s.muiName),V};return R.withConfig&&(k.withConfig=R.withConfig),k}}function fu(e){const{theme:t,name:r,props:n}=e;return!t||!t.components||!t.components[r]||!t.components[r].defaultProps?n:gi(t.components[r].defaultProps,n)}function mu({props:e,name:t,defaultTheme:r,themeId:n}){let o=Ei(r);return n&&(o=o[n]||o),fu({theme:o,name:t,props:e})}function Fo(e,t=0,r=1){return process.env.NODE_ENV!=="production"&&(e<t||e>r)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`),od(e,t,r)}function hu(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let r=e.match(t);return r&&r[0].length===1&&(r=r.map(n=>n+n)),r?`rgb${r.length===4?"a":""}(${r.map((n,o)=>o<3?parseInt(n,16):Math.round(parseInt(n,16)/255*1e3)/1e3).join(", ")})`:""}function Bt(e){if(e.type)return e;if(e.charAt(0)==="#")return Bt(hu(e));const t=e.indexOf("("),r=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:tr(9,e));let n=e.substring(t+1,e.length-1),o;if(r==="color"){if(n=n.split(" "),o=n.shift(),n.length===4&&n[3].charAt(0)==="/"&&(n[3]=n[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:tr(10,o))}else n=n.split(",");return n=n.map(a=>parseFloat(a)),{type:r,values:n,colorSpace:o}}function _n(e){const{type:t,colorSpace:r}=e;let{values:n}=e;return t.indexOf("rgb")!==-1?n=n.map((o,a)=>a<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(n[1]=`${n[1]}%`,n[2]=`${n[2]}%`),t.indexOf("color")!==-1?n=`${r} ${n.join(" ")}`:n=`${n.join(", ")}`,`${t}(${n})`}function gu(e){e=Bt(e);const{values:t}=e,r=t[0],n=t[1]/100,o=t[2]/100,a=n*Math.min(o,1-o),s=(u,m=(u+r/30)%12)=>o-a*Math.max(Math.min(m-3,9-m,1),-1);let c="rgb";const p=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(c+="a",p.push(t[3])),_n({type:c,values:p})}function Ga(e){e=Bt(e);let t=e.type==="hsl"||e.type==="hsla"?Bt(gu(e)).values:e.values;return t=t.map(r=>(e.type!=="color"&&(r/=255),r<=.03928?r/12.92:((r+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Ha(e,t){const r=Ga(e),n=Ga(t);return(Math.max(r,n)+.05)/(Math.min(r,n)+.05)}function gn(e,t){return e=Bt(e),t=Fo(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,_n(e)}function bu(e,t){if(e=Bt(e),t=Fo(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]*=1-t;return _n(e)}function vu(e,t){if(e=Bt(e),t=Fo(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(255-e.values[r])*t;else if(e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(1-e.values[r])*t;return _n(e)}function yu(e,t){return P({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const wu={black:"#000",white:"#fff"},Ar=wu,xu={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},ku=xu,Eu={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ut=Eu,Nu={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Gt=Nu,Tu={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},yr=Tu,Su={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ht=Su,Cu={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},qt=Cu,ju={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Wt=ju,Ou=["mode","contrastThreshold","tonalOffset"],qa={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Ar.white,default:Ar.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Jn={text:{primary:Ar.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Ar.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Wa(e,t,r,n){const o=n.light||n,a=n.dark||n*1.5;e[t]||(e.hasOwnProperty(r)?e[t]=e[r]:t==="light"?e.light=vu(e.main,o):t==="dark"&&(e.dark=bu(e.main,a)))}function Ru(e="light"){return e==="dark"?{main:Ht[200],light:Ht[50],dark:Ht[400]}:{main:Ht[700],light:Ht[400],dark:Ht[800]}}function Pu(e="light"){return e==="dark"?{main:Ut[200],light:Ut[50],dark:Ut[400]}:{main:Ut[500],light:Ut[300],dark:Ut[700]}}function $u(e="light"){return e==="dark"?{main:Gt[500],light:Gt[300],dark:Gt[700]}:{main:Gt[700],light:Gt[400],dark:Gt[800]}}function Iu(e="light"){return e==="dark"?{main:qt[400],light:qt[300],dark:qt[700]}:{main:qt[700],light:qt[500],dark:qt[900]}}function _u(e="light"){return e==="dark"?{main:Wt[400],light:Wt[300],dark:Wt[700]}:{main:Wt[800],light:Wt[500],dark:Wt[900]}}function Mu(e="light"){return e==="dark"?{main:yr[400],light:yr[300],dark:yr[700]}:{main:"#ed6c02",light:yr[500],dark:yr[900]}}function Du(e){const{mode:t="light",contrastThreshold:r=3,tonalOffset:n=.2}=e,o=he(e,Ou),a=e.primary||Ru(t),s=e.secondary||Pu(t),c=e.error||$u(t),p=e.info||Iu(t),u=e.success||_u(t),m=e.warning||Mu(t);function v(f){const g=Ha(f,Jn.text.primary)>=r?Jn.text.primary:qa.text.primary;if(process.env.NODE_ENV!=="production"){const x=Ha(f,g);x<3&&console.error([`MUI: The contrast ratio of ${x}:1 for ${g} on ${f}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return g}const b=({color:f,name:g,mainShade:x=500,lightShade:R=300,darkShade:w=700})=>{if(f=P({},f),!f.main&&f[x]&&(f.main=f[x]),!f.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${g?` (${g})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.`:tr(11,g?` (${g})`:"",x));if(typeof f.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${g?` (${g})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(f.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:tr(12,g?` (${g})`:"",JSON.stringify(f.main)));return Wa(f,"light",R,n),Wa(f,"dark",w,n),f.contrastText||(f.contrastText=v(f.main)),f},d={dark:Jn,light:qa};return process.env.NODE_ENV!=="production"&&(d[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),ct(P({common:P({},Ar),mode:t,primary:b({color:a,name:"primary"}),secondary:b({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:b({color:c,name:"error"}),warning:b({color:m,name:"warning"}),info:b({color:p,name:"info"}),success:b({color:u,name:"success"}),grey:ku,contrastThreshold:r,getContrastText:v,augmentColor:b,tonalOffset:n},d[t]),o)}const Au=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Lu(e){return Math.round(e*1e5)/1e5}const Xa={textTransform:"uppercase"},Ka='"Roboto", "Helvetica", "Arial", sans-serif';function Bu(e,t){const r=typeof t=="function"?t(e):t,{fontFamily:n=Ka,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:s=400,fontWeightMedium:c=500,fontWeightBold:p=700,htmlFontSize:u=16,allVariants:m,pxToRem:v}=r,b=he(r,Au);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const d=o/14,h=v||(x=>`${x/u*d}rem`),f=(x,R,w,k,y)=>P({fontFamily:n,fontWeight:x,fontSize:h(R),lineHeight:w},n===Ka?{letterSpacing:`${Lu(k/R)}em`}:{},y,m),g={h1:f(a,96,1.167,-1.5),h2:f(a,60,1.2,-.5),h3:f(s,48,1.167,0),h4:f(s,34,1.235,.25),h5:f(s,24,1.334,0),h6:f(c,20,1.6,.15),subtitle1:f(s,16,1.75,.15),subtitle2:f(c,14,1.57,.1),body1:f(s,16,1.5,.15),body2:f(s,14,1.43,.15),button:f(c,14,1.75,.4,Xa),caption:f(s,12,1.66,.4),overline:f(s,12,2.66,1,Xa),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return ct(P({htmlFontSize:u,pxToRem:h,fontFamily:n,fontSize:o,fontWeightLight:a,fontWeightRegular:s,fontWeightMedium:c,fontWeightBold:p},g),b,{clone:!1})}const Fu=.2,Vu=.14,zu=.12;function be(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Fu})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Vu})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${zu})`].join(",")}const Uu=["none",be(0,2,1,-1,0,1,1,0,0,1,3,0),be(0,3,1,-2,0,2,2,0,0,1,5,0),be(0,3,3,-2,0,3,4,0,0,1,8,0),be(0,2,4,-1,0,4,5,0,0,1,10,0),be(0,3,5,-1,0,5,8,0,0,1,14,0),be(0,3,5,-1,0,6,10,0,0,1,18,0),be(0,4,5,-2,0,7,10,1,0,2,16,1),be(0,5,5,-3,0,8,10,1,0,3,14,2),be(0,5,6,-3,0,9,12,1,0,3,16,2),be(0,6,6,-3,0,10,14,1,0,4,18,3),be(0,6,7,-4,0,11,15,1,0,4,20,3),be(0,7,8,-4,0,12,17,2,0,5,22,4),be(0,7,8,-4,0,13,19,2,0,5,24,4),be(0,7,9,-4,0,14,21,2,0,5,26,4),be(0,8,9,-5,0,15,22,2,0,6,28,5),be(0,8,10,-5,0,16,24,2,0,6,30,5),be(0,8,11,-5,0,17,26,2,0,6,32,5),be(0,9,11,-5,0,18,28,2,0,7,34,6),be(0,9,12,-6,0,19,29,2,0,7,36,6),be(0,10,13,-6,0,20,31,3,0,8,38,7),be(0,10,13,-6,0,21,33,3,0,8,40,7),be(0,10,14,-6,0,22,35,3,0,8,42,7),be(0,11,14,-7,0,23,36,3,0,9,44,8),be(0,11,15,-7,0,24,38,3,0,9,46,8)],Gu=Uu,Hu=["duration","easing","delay"],qu={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Wu={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Ya(e){return`${Math.round(e)}ms`}function Xu(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Ku(e){const t=P({},qu,e.easing),r=P({},Wu,e.duration);return P({getAutoHeightDuration:Xu,create:(o=["all"],a={})=>{const{duration:s=r.standard,easing:c=t.easeInOut,delay:p=0}=a,u=he(a,Hu);if(process.env.NODE_ENV!=="production"){const m=b=>typeof b=="string",v=b=>!isNaN(parseFloat(b));!m(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!v(s)&&!m(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),m(c)||console.error('MUI: Argument "easing" must be a string.'),!v(p)&&!m(p)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(m=>`${m} ${typeof s=="string"?s:Ya(s)} ${c} ${typeof p=="string"?p:Ya(p)}`).join(",")}},e,{easing:t,duration:r})}const Yu={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Ju=Yu,Zu=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Qu(e={},...t){const{mixins:r={},palette:n={},transitions:o={},typography:a={}}=e,s=he(e,Zu);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":tr(18));const c=Du(n),p=Bo(e);let u=ct(p,{mixins:yu(p.breakpoints,r),palette:c,shadows:Gu.slice(),typography:Bu(c,a),transitions:Ku(o),zIndex:P({},Ju)});if(u=ct(u,s),u=t.reduce((m,v)=>ct(m,v),u),process.env.NODE_ENV!=="production"){const m=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],v=(b,d)=>{let h;for(h in b){const f=b[h];if(m.indexOf(h)!==-1&&Object.keys(f).length>0){if(process.env.NODE_ENV!=="production"){const g=nt("",h);console.error([`MUI: The \`${d}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(b,null,2),"",`Instead, you need to use the '&.${g}' syntax:`,JSON.stringify({root:{[`&.${g}`]:f}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}b[h]={}}}};Object.keys(u.components).forEach(b=>{const d=u.components[b].styleOverrides;d&&b.indexOf("Mui")===0&&v(d,b)})}return u.unstable_sxConfig=P({},Ao,s==null?void 0:s.unstable_sxConfig),u.unstable_sx=function(v){return Lo({sx:v,theme:this})},u}const ef=Qu(),Vo=ef,zo="$$material";function mt({props:e,name:t}){return mu({props:e,name:t,defaultTheme:Vo,themeId:zo})}const Ni=e=>ln(e)&&e!=="classes",tf=uu({themeId:zo,defaultTheme:Vo,rootShouldForwardProp:Ni}),Re=tf;function rf(e){return nt("MuiSvgIcon",e)}xt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const nf=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],of=e=>{const{color:t,fontSize:r,classes:n}=e,o={root:["root",t!=="inherit"&&`color${tt(t)}`,`fontSize${tt(r)}`]};return ft(o,rf,n)},af=Re("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.color!=="inherit"&&t[`color${tt(r.color)}`],t[`fontSize${tt(r.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var r,n,o,a,s,c,p,u,m,v,b,d,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(r=e.transitions)==null||(n=r.create)==null?void 0:n.call(r,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((c=e.typography)==null||(p=c.pxToRem)==null?void 0:p.call(c,24))||"1.5rem",large:((u=e.typography)==null||(m=u.pxToRem)==null?void 0:m.call(u,35))||"2.1875rem"}[t.fontSize],color:(v=(b=(e.vars||e).palette)==null||(b=b[t.color])==null?void 0:b.main)!=null?v:{action:(d=(e.vars||e).palette)==null||(d=d.action)==null?void 0:d.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),Uo=T.forwardRef(function(t,r){const n=mt({props:t,name:"MuiSvgIcon"}),{children:o,className:a,color:s="inherit",component:c="svg",fontSize:p="medium",htmlColor:u,inheritViewBox:m=!1,titleAccess:v,viewBox:b="0 0 24 24"}=n,d=he(n,nf),h=T.isValidElement(o)&&o.type==="svg",f=P({},n,{color:s,component:c,fontSize:p,instanceFontSize:t.fontSize,inheritViewBox:m,viewBox:b,hasSvgAsChild:h}),g={};m||(g.viewBox=b);const x=of(f);return l.jsxs(af,P({as:c,className:Ce(x.root,a),focusable:"false",color:u,"aria-hidden":v?void 0:!0,role:v?"img":void 0,ref:r},g,d,h&&o.props,{ownerState:f,children:[h?o.props.children:o,v?l.jsx("title",{children:v}):null]}))});process.env.NODE_ENV!=="production"&&(Uo.propTypes={children:i.node,classes:i.object,className:i.string,color:i.oneOfType([i.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),i.string]),component:i.elementType,fontSize:i.oneOfType([i.oneOf(["inherit","large","medium","small"]),i.string]),htmlColor:i.string,inheritViewBox:i.bool,shapeRendering:i.string,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),titleAccess:i.string,viewBox:i.string});Uo.muiName="SvgIcon";const Ja=Uo;function Ti(e,t){function r(n,o){return l.jsx(Ja,P({"data-testid":`${t}Icon`,ref:o},n,{children:e}))}return process.env.NODE_ENV!=="production"&&(r.displayName=`${t}Icon`),r.muiName=Ja.muiName,T.memo(T.forwardRef(r))}const sf={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),bi.configure(e)}},lf=Object.freeze(Object.defineProperty({__proto__:null,capitalize:tt,createChainedFunction:uo,createSvgIcon:Ti,debounce:li,deprecatedPropType:Ap,isMuiElement:Lp,ownerDocument:Oe,ownerWindow:rr,requirePropFactory:Bp,setRef:mn,unstable_ClassNameGenerator:sf,unstable_useEnhancedEffect:Lt,unstable_useId:ci,unsupportedProp:zp,useControlled:pi,useEventCallback:Dr,useForkRef:We,useIsFocusVisible:di},Symbol.toStringTag,{value:"Module"})),cf=hp(lf);var Za;function pf(){return Za||(Za=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=cf}(Un)),Un}var df=gp;Object.defineProperty($o,"__esModule",{value:!0});var Si=$o.default=void 0,uf=df(pf()),ff=l;Si=$o.default=(0,uf.default)((0,ff.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function Ci(e){return typeof e=="string"}function Cr(e,t,r){return e===void 0||Ci(e)?t:P({},t,{ownerState:P({},t.ownerState,r)})}const mf={disableDefaultClasses:!1},hf=T.createContext(mf);function gf(e){const{disableDefaultClasses:t}=T.useContext(hf);return r=>t?"":e(r)}function ji(e,t=[]){if(e===void 0)return{};const r={};return Object.keys(e).filter(n=>n.match(/^on[A-Z]/)&&typeof e[n]=="function"&&!t.includes(n)).forEach(n=>{r[n]=e[n]}),r}function bf(e,t,r){return typeof e=="function"?e(t,r):e}function Qa(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(r=>!(r.match(/^on[A-Z]/)&&typeof e[r]=="function")).forEach(r=>{t[r]=e[r]}),t}function vf(e){const{getSlotProps:t,additionalProps:r,externalSlotProps:n,externalForwardedProps:o,className:a}=e;if(!t){const d=Ce(r==null?void 0:r.className,a,o==null?void 0:o.className,n==null?void 0:n.className),h=P({},r==null?void 0:r.style,o==null?void 0:o.style,n==null?void 0:n.style),f=P({},r,o,n);return d.length>0&&(f.className=d),Object.keys(h).length>0&&(f.style=h),{props:f,internalRef:void 0}}const s=ji(P({},o,n)),c=Qa(n),p=Qa(o),u=t(s),m=Ce(u==null?void 0:u.className,r==null?void 0:r.className,a,o==null?void 0:o.className,n==null?void 0:n.className),v=P({},u==null?void 0:u.style,r==null?void 0:r.style,o==null?void 0:o.style,n==null?void 0:n.style),b=P({},u,r,p,c);return m.length>0&&(b.className=m),Object.keys(v).length>0&&(b.style=v),{props:b,internalRef:u.ref}}const yf=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Ft(e){var t;const{elementType:r,externalSlotProps:n,ownerState:o,skipResolvingSlotProps:a=!1}=e,s=he(e,yf),c=a?{}:bf(n,o),{props:p,internalRef:u}=vf(P({},s,{externalSlotProps:c})),m=We(u,c==null?void 0:c.ref,(t=e.additionalProps)==null?void 0:t.ref);return Cr(r,P({},p,{ref:m}),o)}const Oi="base";function wf(e){return`${Oi}--${e}`}function xf(e,t){return`${Oi}-${e}-${t}`}function Ri(e,t){const r=vi[t];return r?wf(r):xf(e,t)}function kf(e,t){const r={};return t.forEach(n=>{r[n]=Ri(e,n)}),r}const Ef=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Nf(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function Tf(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=n=>e.ownerDocument.querySelector(`input[type="radio"]${n}`);let r=t(`[name="${e.name}"]:checked`);return r||(r=t(`[name="${e.name}"]`)),r!==e}function Sf(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Tf(e))}function Cf(e){const t=[],r=[];return Array.from(e.querySelectorAll(Ef)).forEach((n,o)=>{const a=Nf(n);a===-1||!Sf(n)||(a===0?t.push(n):r.push({documentOrder:o,tabIndex:a,node:n}))}),r.sort((n,o)=>n.tabIndex===o.tabIndex?n.documentOrder-o.documentOrder:n.tabIndex-o.tabIndex).map(n=>n.node).concat(t)}function jf(){return!0}function bn(e){const{children:t,disableAutoFocus:r=!1,disableEnforceFocus:n=!1,disableRestoreFocus:o=!1,getTabbable:a=Cf,isEnabled:s=jf,open:c}=e,p=T.useRef(!1),u=T.useRef(null),m=T.useRef(null),v=T.useRef(null),b=T.useRef(null),d=T.useRef(!1),h=T.useRef(null),f=We(t.ref,h),g=T.useRef(null);T.useEffect(()=>{!c||!h.current||(d.current=!r)},[r,c]),T.useEffect(()=>{if(!c||!h.current)return;const w=Oe(h.current);return h.current.contains(w.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),d.current&&h.current.focus()),()=>{o||(v.current&&v.current.focus&&(p.current=!0,v.current.focus()),v.current=null)}},[c]),T.useEffect(()=>{if(!c||!h.current)return;const w=Oe(h.current),k=C=>{g.current=C,!(n||!s()||C.key!=="Tab")&&w.activeElement===h.current&&C.shiftKey&&(p.current=!0,m.current&&m.current.focus())},y=()=>{const C=h.current;if(C===null)return;if(!w.hasFocus()||!s()||p.current){p.current=!1;return}if(C.contains(w.activeElement)||n&&w.activeElement!==u.current&&w.activeElement!==m.current)return;if(w.activeElement!==b.current)b.current=null;else if(b.current!==null)return;if(!d.current)return;let _=[];if((w.activeElement===u.current||w.activeElement===m.current)&&(_=a(h.current)),_.length>0){var D,V;const $=!!((D=g.current)!=null&&D.shiftKey&&((V=g.current)==null?void 0:V.key)==="Tab"),N=_[0],O=_[_.length-1];typeof N!="string"&&typeof O!="string"&&($?O.focus():N.focus())}else C.focus()};w.addEventListener("focusin",y),w.addEventListener("keydown",k,!0);const S=setInterval(()=>{w.activeElement&&w.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(S),w.removeEventListener("focusin",y),w.removeEventListener("keydown",k,!0)}},[r,n,o,s,c,a]);const x=w=>{v.current===null&&(v.current=w.relatedTarget),d.current=!0,b.current=w.target;const k=t.props.onFocus;k&&k(w)},R=w=>{v.current===null&&(v.current=w.relatedTarget),d.current=!0};return l.jsxs(T.Fragment,{children:[l.jsx("div",{tabIndex:c?0:-1,onFocus:R,ref:u,"data-testid":"sentinelStart"}),T.cloneElement(t,{ref:f,onFocus:x}),l.jsx("div",{tabIndex:c?0:-1,onFocus:R,ref:m,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(bn.propTypes={children:qr,disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableRestoreFocus:i.bool,getTabbable:i.func,isEnabled:i.func,open:i.bool.isRequired});process.env.NODE_ENV!=="production"&&(bn["propTypes"]=si(bn.propTypes));function Of(e){return typeof e=="function"?e():e}const Lr=T.forwardRef(function(t,r){const{children:n,container:o,disablePortal:a=!1}=t,[s,c]=T.useState(null),p=We(T.isValidElement(n)?n.ref:null,r);if(Lt(()=>{a||c(Of(o)||document.body)},[o,a]),Lt(()=>{if(s&&!a)return mn(r,s),()=>{mn(r,null)}},[r,s,a]),a){if(T.isValidElement(n)){const u={ref:p};return T.cloneElement(n,u)}return l.jsx(T.Fragment,{children:n})}return l.jsx(T.Fragment,{children:s&&hc.createPortal(n,s)})});process.env.NODE_ENV!=="production"&&(Lr.propTypes={children:i.node,container:i.oneOfType([pt,i.func]),disablePortal:i.bool});process.env.NODE_ENV!=="production"&&(Lr["propTypes"]=si(Lr.propTypes));function Rf(e){const t=Oe(e);return t.body===e?rr(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function Pr(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function es(e){return parseInt(rr(e).getComputedStyle(e).paddingRight,10)||0}function Pf(e){const r=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,n=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return r||n}function ts(e,t,r,n,o){const a=[t,r,...n];[].forEach.call(e.children,s=>{const c=a.indexOf(s)===-1,p=!Pf(s);c&&p&&Pr(s,o)})}function Zn(e,t){let r=-1;return e.some((n,o)=>t(n)?(r=o,!0):!1),r}function $f(e,t){const r=[],n=e.container;if(!t.disableScrollLock){if(Rf(n)){const s=ui(Oe(n));r.push({value:n.style.paddingRight,property:"padding-right",el:n}),n.style.paddingRight=`${es(n)+s}px`;const c=Oe(n).querySelectorAll(".mui-fixed");[].forEach.call(c,p=>{r.push({value:p.style.paddingRight,property:"padding-right",el:p}),p.style.paddingRight=`${es(p)+s}px`})}let a;if(n.parentNode instanceof DocumentFragment)a=Oe(n).body;else{const s=n.parentElement,c=rr(n);a=(s==null?void 0:s.nodeName)==="HTML"&&c.getComputedStyle(s).overflowY==="scroll"?s:n}r.push({value:a.style.overflow,property:"overflow",el:a},{value:a.style.overflowX,property:"overflow-x",el:a},{value:a.style.overflowY,property:"overflow-y",el:a}),a.style.overflow="hidden"}return()=>{r.forEach(({value:a,el:s,property:c})=>{a?s.style.setProperty(c,a):s.style.removeProperty(c)})}}function If(e){const t=[];return[].forEach.call(e.children,r=>{r.getAttribute("aria-hidden")==="true"&&t.push(r)}),t}class _f{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,r){let n=this.modals.indexOf(t);if(n!==-1)return n;n=this.modals.length,this.modals.push(t),t.modalRef&&Pr(t.modalRef,!1);const o=If(r);ts(r,t.mount,t.modalRef,o,!0);const a=Zn(this.containers,s=>s.container===r);return a!==-1?(this.containers[a].modals.push(t),n):(this.containers.push({modals:[t],container:r,restore:null,hiddenSiblings:o}),n)}mount(t,r){const n=Zn(this.containers,a=>a.modals.indexOf(t)!==-1),o=this.containers[n];o.restore||(o.restore=$f(o,r))}remove(t,r=!0){const n=this.modals.indexOf(t);if(n===-1)return n;const o=Zn(this.containers,s=>s.modals.indexOf(t)!==-1),a=this.containers[o];if(a.modals.splice(a.modals.indexOf(t),1),this.modals.splice(n,1),a.modals.length===0)a.restore&&a.restore(),t.modalRef&&Pr(t.modalRef,r),ts(a.container,t.mount,t.modalRef,a.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=a.modals[a.modals.length-1];s.modalRef&&Pr(s.modalRef,!1)}return n}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Mf(e){return typeof e=="function"?e():e}function Df(e){return e?e.props.hasOwnProperty("in"):!1}const Af=new _f;function Lf(e){const{container:t,disableEscapeKeyDown:r=!1,disableScrollLock:n=!1,manager:o=Af,closeAfterTransition:a=!1,onTransitionEnter:s,onTransitionExited:c,children:p,onClose:u,open:m,rootRef:v}=e,b=T.useRef({}),d=T.useRef(null),h=T.useRef(null),f=We(h,v),[g,x]=T.useState(!m),R=Df(p);let w=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(w=!1);const k=()=>Oe(d.current),y=()=>(b.current.modalRef=h.current,b.current.mount=d.current,b.current),S=()=>{o.mount(y(),{disableScrollLock:n}),h.current&&(h.current.scrollTop=0)},C=Dr(()=>{const A=Mf(t)||k().body;o.add(y(),A),h.current&&S()}),_=T.useCallback(()=>o.isTopModal(y()),[o]),D=Dr(A=>{d.current=A,A&&(m&&_()?S():h.current&&Pr(h.current,w))}),V=T.useCallback(()=>{o.remove(y(),w)},[w,o]);T.useEffect(()=>()=>{V()},[V]),T.useEffect(()=>{m?C():(!R||!a)&&V()},[m,V,R,a,C]);const $=A=>H=>{var ee;(ee=A.onKeyDown)==null||ee.call(A,H),!(H.key!=="Escape"||H.which===229||!_())&&(r||(H.stopPropagation(),u&&u(H,"escapeKeyDown")))},N=A=>H=>{var ee;(ee=A.onClick)==null||ee.call(A,H),H.target===H.currentTarget&&u&&u(H,"backdropClick")};return{getRootProps:(A={})=>{const H=ji(e);delete H.onTransitionEnter,delete H.onTransitionExited;const ee=P({},H,A);return P({role:"presentation"},ee,{onKeyDown:$(ee),ref:f})},getBackdropProps:(A={})=>{const H=A;return P({"aria-hidden":!0},H,{onClick:N(H),open:m})},getTransitionProps:()=>{const A=()=>{x(!1),s&&s()},H=()=>{x(!0),c&&c(),a&&V()};return{onEnter:uo(A,p==null?void 0:p.props.onEnter),onExited:uo(H,p==null?void 0:p.props.onExited)}},rootRef:f,portalRef:D,isTopModal:_,exited:g,hasTransition:R}}var _e="top",Xe="bottom",Ke="right",Me="left",Go="auto",Yr=[_e,Xe,Ke,Me],nr="start",Br="end",Bf="clippingParents",Pi="viewport",wr="popper",Ff="reference",rs=Yr.reduce(function(e,t){return e.concat([t+"-"+nr,t+"-"+Br])},[]),$i=[].concat(Yr,[Go]).reduce(function(e,t){return e.concat([t,t+"-"+nr,t+"-"+Br])},[]),Vf="beforeRead",zf="read",Uf="afterRead",Gf="beforeMain",Hf="main",qf="afterMain",Wf="beforeWrite",Xf="write",Kf="afterWrite",Yf=[Vf,zf,Uf,Gf,Hf,qf,Wf,Xf,Kf];function rt(e){return e?(e.nodeName||"").toLowerCase():null}function ze(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Vt(e){var t=ze(e).Element;return e instanceof t||e instanceof Element}function qe(e){var t=ze(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Ho(e){if(typeof ShadowRoot>"u")return!1;var t=ze(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Jf(e){var t=e.state;Object.keys(t.elements).forEach(function(r){var n=t.styles[r]||{},o=t.attributes[r]||{},a=t.elements[r];!qe(a)||!rt(a)||(Object.assign(a.style,n),Object.keys(o).forEach(function(s){var c=o[s];c===!1?a.removeAttribute(s):a.setAttribute(s,c===!0?"":c)}))})}function Zf(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,r.popper),t.styles=r,t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach(function(n){var o=t.elements[n],a=t.attributes[n]||{},s=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:r[n]),c=s.reduce(function(p,u){return p[u]="",p},{});!qe(o)||!rt(o)||(Object.assign(o.style,c),Object.keys(a).forEach(function(p){o.removeAttribute(p)}))})}}const Qf={name:"applyStyles",enabled:!0,phase:"write",fn:Jf,effect:Zf,requires:["computeStyles"]};function Qe(e){return e.split("-")[0]}var It=Math.max,vn=Math.min,or=Math.round;function ho(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ii(){return!/^((?!chrome|android).)*safari/i.test(ho())}function ar(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!1);var n=e.getBoundingClientRect(),o=1,a=1;t&&qe(e)&&(o=e.offsetWidth>0&&or(n.width)/e.offsetWidth||1,a=e.offsetHeight>0&&or(n.height)/e.offsetHeight||1);var s=Vt(e)?ze(e):window,c=s.visualViewport,p=!Ii()&&r,u=(n.left+(p&&c?c.offsetLeft:0))/o,m=(n.top+(p&&c?c.offsetTop:0))/a,v=n.width/o,b=n.height/a;return{width:v,height:b,top:m,right:u+v,bottom:m+b,left:u,x:u,y:m}}function qo(e){var t=ar(e),r=e.offsetWidth,n=e.offsetHeight;return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:n}}function _i(e,t){var r=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(r&&Ho(r)){var n=t;do{if(n&&e.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function ut(e){return ze(e).getComputedStyle(e)}function em(e){return["table","td","th"].indexOf(rt(e))>=0}function Et(e){return((Vt(e)?e.ownerDocument:e.document)||window.document).documentElement}function Mn(e){return rt(e)==="html"?e:e.assignedSlot||e.parentNode||(Ho(e)?e.host:null)||Et(e)}function ns(e){return!qe(e)||ut(e).position==="fixed"?null:e.offsetParent}function tm(e){var t=/firefox/i.test(ho()),r=/Trident/i.test(ho());if(r&&qe(e)){var n=ut(e);if(n.position==="fixed")return null}var o=Mn(e);for(Ho(o)&&(o=o.host);qe(o)&&["html","body"].indexOf(rt(o))<0;){var a=ut(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function Jr(e){for(var t=ze(e),r=ns(e);r&&em(r)&&ut(r).position==="static";)r=ns(r);return r&&(rt(r)==="html"||rt(r)==="body"&&ut(r).position==="static")?t:r||tm(e)||t}function Wo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function $r(e,t,r){return It(e,vn(t,r))}function rm(e,t,r){var n=$r(e,t,r);return n>r?r:n}function Mi(){return{top:0,right:0,bottom:0,left:0}}function Di(e){return Object.assign({},Mi(),e)}function Ai(e,t){return t.reduce(function(r,n){return r[n]=e,r},{})}var nm=function(t,r){return t=typeof t=="function"?t(Object.assign({},r.rects,{placement:r.placement})):t,Di(typeof t!="number"?t:Ai(t,Yr))};function om(e){var t,r=e.state,n=e.name,o=e.options,a=r.elements.arrow,s=r.modifiersData.popperOffsets,c=Qe(r.placement),p=Wo(c),u=[Me,Ke].indexOf(c)>=0,m=u?"height":"width";if(!(!a||!s)){var v=nm(o.padding,r),b=qo(a),d=p==="y"?_e:Me,h=p==="y"?Xe:Ke,f=r.rects.reference[m]+r.rects.reference[p]-s[p]-r.rects.popper[m],g=s[p]-r.rects.reference[p],x=Jr(a),R=x?p==="y"?x.clientHeight||0:x.clientWidth||0:0,w=f/2-g/2,k=v[d],y=R-b[m]-v[h],S=R/2-b[m]/2+w,C=$r(k,S,y),_=p;r.modifiersData[n]=(t={},t[_]=C,t.centerOffset=C-S,t)}}function am(e){var t=e.state,r=e.options,n=r.element,o=n===void 0?"[data-popper-arrow]":n;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||_i(t.elements.popper,o)&&(t.elements.arrow=o))}const sm={name:"arrow",enabled:!0,phase:"main",fn:om,effect:am,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function sr(e){return e.split("-")[1]}var im={top:"auto",right:"auto",bottom:"auto",left:"auto"};function lm(e,t){var r=e.x,n=e.y,o=t.devicePixelRatio||1;return{x:or(r*o)/o||0,y:or(n*o)/o||0}}function os(e){var t,r=e.popper,n=e.popperRect,o=e.placement,a=e.variation,s=e.offsets,c=e.position,p=e.gpuAcceleration,u=e.adaptive,m=e.roundOffsets,v=e.isFixed,b=s.x,d=b===void 0?0:b,h=s.y,f=h===void 0?0:h,g=typeof m=="function"?m({x:d,y:f}):{x:d,y:f};d=g.x,f=g.y;var x=s.hasOwnProperty("x"),R=s.hasOwnProperty("y"),w=Me,k=_e,y=window;if(u){var S=Jr(r),C="clientHeight",_="clientWidth";if(S===ze(r)&&(S=Et(r),ut(S).position!=="static"&&c==="absolute"&&(C="scrollHeight",_="scrollWidth")),S=S,o===_e||(o===Me||o===Ke)&&a===Br){k=Xe;var D=v&&S===y&&y.visualViewport?y.visualViewport.height:S[C];f-=D-n.height,f*=p?1:-1}if(o===Me||(o===_e||o===Xe)&&a===Br){w=Ke;var V=v&&S===y&&y.visualViewport?y.visualViewport.width:S[_];d-=V-n.width,d*=p?1:-1}}var $=Object.assign({position:c},u&&im),N=m===!0?lm({x:d,y:f},ze(r)):{x:d,y:f};if(d=N.x,f=N.y,p){var O;return Object.assign({},$,(O={},O[k]=R?"0":"",O[w]=x?"0":"",O.transform=(y.devicePixelRatio||1)<=1?"translate("+d+"px, "+f+"px)":"translate3d("+d+"px, "+f+"px, 0)",O))}return Object.assign({},$,(t={},t[k]=R?f+"px":"",t[w]=x?d+"px":"",t.transform="",t))}function cm(e){var t=e.state,r=e.options,n=r.gpuAcceleration,o=n===void 0?!0:n,a=r.adaptive,s=a===void 0?!0:a,c=r.roundOffsets,p=c===void 0?!0:c,u={placement:Qe(t.placement),variation:sr(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,os(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:p})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,os(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:p})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const pm={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:cm,data:{}};var on={passive:!0};function dm(e){var t=e.state,r=e.instance,n=e.options,o=n.scroll,a=o===void 0?!0:o,s=n.resize,c=s===void 0?!0:s,p=ze(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&u.forEach(function(m){m.addEventListener("scroll",r.update,on)}),c&&p.addEventListener("resize",r.update,on),function(){a&&u.forEach(function(m){m.removeEventListener("scroll",r.update,on)}),c&&p.removeEventListener("resize",r.update,on)}}const um={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:dm,data:{}};var fm={left:"right",right:"left",bottom:"top",top:"bottom"};function pn(e){return e.replace(/left|right|bottom|top/g,function(t){return fm[t]})}var mm={start:"end",end:"start"};function as(e){return e.replace(/start|end/g,function(t){return mm[t]})}function Xo(e){var t=ze(e),r=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:r,scrollTop:n}}function Ko(e){return ar(Et(e)).left+Xo(e).scrollLeft}function hm(e,t){var r=ze(e),n=Et(e),o=r.visualViewport,a=n.clientWidth,s=n.clientHeight,c=0,p=0;if(o){a=o.width,s=o.height;var u=Ii();(u||!u&&t==="fixed")&&(c=o.offsetLeft,p=o.offsetTop)}return{width:a,height:s,x:c+Ko(e),y:p}}function gm(e){var t,r=Et(e),n=Xo(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=It(r.scrollWidth,r.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=It(r.scrollHeight,r.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),c=-n.scrollLeft+Ko(e),p=-n.scrollTop;return ut(o||r).direction==="rtl"&&(c+=It(r.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:c,y:p}}function Yo(e){var t=ut(e),r=t.overflow,n=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(r+o+n)}function Li(e){return["html","body","#document"].indexOf(rt(e))>=0?e.ownerDocument.body:qe(e)&&Yo(e)?e:Li(Mn(e))}function Ir(e,t){var r;t===void 0&&(t=[]);var n=Li(e),o=n===((r=e.ownerDocument)==null?void 0:r.body),a=ze(n),s=o?[a].concat(a.visualViewport||[],Yo(n)?n:[]):n,c=t.concat(s);return o?c:c.concat(Ir(Mn(s)))}function go(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function bm(e,t){var r=ar(e,!1,t==="fixed");return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}function ss(e,t,r){return t===Pi?go(hm(e,r)):Vt(t)?bm(t,r):go(gm(Et(e)))}function vm(e){var t=Ir(Mn(e)),r=["absolute","fixed"].indexOf(ut(e).position)>=0,n=r&&qe(e)?Jr(e):e;return Vt(n)?t.filter(function(o){return Vt(o)&&_i(o,n)&&rt(o)!=="body"}):[]}function ym(e,t,r,n){var o=t==="clippingParents"?vm(e):[].concat(t),a=[].concat(o,[r]),s=a[0],c=a.reduce(function(p,u){var m=ss(e,u,n);return p.top=It(m.top,p.top),p.right=vn(m.right,p.right),p.bottom=vn(m.bottom,p.bottom),p.left=It(m.left,p.left),p},ss(e,s,n));return c.width=c.right-c.left,c.height=c.bottom-c.top,c.x=c.left,c.y=c.top,c}function Bi(e){var t=e.reference,r=e.element,n=e.placement,o=n?Qe(n):null,a=n?sr(n):null,s=t.x+t.width/2-r.width/2,c=t.y+t.height/2-r.height/2,p;switch(o){case _e:p={x:s,y:t.y-r.height};break;case Xe:p={x:s,y:t.y+t.height};break;case Ke:p={x:t.x+t.width,y:c};break;case Me:p={x:t.x-r.width,y:c};break;default:p={x:t.x,y:t.y}}var u=o?Wo(o):null;if(u!=null){var m=u==="y"?"height":"width";switch(a){case nr:p[u]=p[u]-(t[m]/2-r[m]/2);break;case Br:p[u]=p[u]+(t[m]/2-r[m]/2);break}}return p}function Fr(e,t){t===void 0&&(t={});var r=t,n=r.placement,o=n===void 0?e.placement:n,a=r.strategy,s=a===void 0?e.strategy:a,c=r.boundary,p=c===void 0?Bf:c,u=r.rootBoundary,m=u===void 0?Pi:u,v=r.elementContext,b=v===void 0?wr:v,d=r.altBoundary,h=d===void 0?!1:d,f=r.padding,g=f===void 0?0:f,x=Di(typeof g!="number"?g:Ai(g,Yr)),R=b===wr?Ff:wr,w=e.rects.popper,k=e.elements[h?R:b],y=ym(Vt(k)?k:k.contextElement||Et(e.elements.popper),p,m,s),S=ar(e.elements.reference),C=Bi({reference:S,element:w,strategy:"absolute",placement:o}),_=go(Object.assign({},w,C)),D=b===wr?_:S,V={top:y.top-D.top+x.top,bottom:D.bottom-y.bottom+x.bottom,left:y.left-D.left+x.left,right:D.right-y.right+x.right},$=e.modifiersData.offset;if(b===wr&&$){var N=$[o];Object.keys(V).forEach(function(O){var I=[Ke,Xe].indexOf(O)>=0?1:-1,U=[_e,Xe].indexOf(O)>=0?"y":"x";V[O]+=N[U]*I})}return V}function wm(e,t){t===void 0&&(t={});var r=t,n=r.placement,o=r.boundary,a=r.rootBoundary,s=r.padding,c=r.flipVariations,p=r.allowedAutoPlacements,u=p===void 0?$i:p,m=sr(n),v=m?c?rs:rs.filter(function(h){return sr(h)===m}):Yr,b=v.filter(function(h){return u.indexOf(h)>=0});b.length===0&&(b=v);var d=b.reduce(function(h,f){return h[f]=Fr(e,{placement:f,boundary:o,rootBoundary:a,padding:s})[Qe(f)],h},{});return Object.keys(d).sort(function(h,f){return d[h]-d[f]})}function xm(e){if(Qe(e)===Go)return[];var t=pn(e);return[as(e),t,as(t)]}function km(e){var t=e.state,r=e.options,n=e.name;if(!t.modifiersData[n]._skip){for(var o=r.mainAxis,a=o===void 0?!0:o,s=r.altAxis,c=s===void 0?!0:s,p=r.fallbackPlacements,u=r.padding,m=r.boundary,v=r.rootBoundary,b=r.altBoundary,d=r.flipVariations,h=d===void 0?!0:d,f=r.allowedAutoPlacements,g=t.options.placement,x=Qe(g),R=x===g,w=p||(R||!h?[pn(g)]:xm(g)),k=[g].concat(w).reduce(function(G,K){return G.concat(Qe(K)===Go?wm(t,{placement:K,boundary:m,rootBoundary:v,padding:u,flipVariations:h,allowedAutoPlacements:f}):K)},[]),y=t.rects.reference,S=t.rects.popper,C=new Map,_=!0,D=k[0],V=0;V<k.length;V++){var $=k[V],N=Qe($),O=sr($)===nr,I=[_e,Xe].indexOf(N)>=0,U=I?"width":"height",A=Fr(t,{placement:$,boundary:m,rootBoundary:v,altBoundary:b,padding:u}),H=I?O?Ke:Me:O?Xe:_e;y[U]>S[U]&&(H=pn(H));var ee=pn(H),z=[];if(a&&z.push(A[N]<=0),c&&z.push(A[H]<=0,A[ee]<=0),z.every(function(G){return G})){D=$,_=!1;break}C.set($,z)}if(_)for(var j=h?3:1,L=function(K){var X=k.find(function(J){var Y=C.get(J);if(Y)return Y.slice(0,K).every(function(Z){return Z})});if(X)return D=X,"break"},q=j;q>0;q--){var W=L(q);if(W==="break")break}t.placement!==D&&(t.modifiersData[n]._skip=!0,t.placement=D,t.reset=!0)}}const Em={name:"flip",enabled:!0,phase:"main",fn:km,requiresIfExists:["offset"],data:{_skip:!1}};function is(e,t,r){return r===void 0&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function ls(e){return[_e,Ke,Xe,Me].some(function(t){return e[t]>=0})}function Nm(e){var t=e.state,r=e.name,n=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,s=Fr(t,{elementContext:"reference"}),c=Fr(t,{altBoundary:!0}),p=is(s,n),u=is(c,o,a),m=ls(p),v=ls(u);t.modifiersData[r]={referenceClippingOffsets:p,popperEscapeOffsets:u,isReferenceHidden:m,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":m,"data-popper-escaped":v})}const Tm={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Nm};function Sm(e,t,r){var n=Qe(e),o=[Me,_e].indexOf(n)>=0?-1:1,a=typeof r=="function"?r(Object.assign({},t,{placement:e})):r,s=a[0],c=a[1];return s=s||0,c=(c||0)*o,[Me,Ke].indexOf(n)>=0?{x:c,y:s}:{x:s,y:c}}function Cm(e){var t=e.state,r=e.options,n=e.name,o=r.offset,a=o===void 0?[0,0]:o,s=$i.reduce(function(m,v){return m[v]=Sm(v,t.rects,a),m},{}),c=s[t.placement],p=c.x,u=c.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=p,t.modifiersData.popperOffsets.y+=u),t.modifiersData[n]=s}const jm={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Cm};function Om(e){var t=e.state,r=e.name;t.modifiersData[r]=Bi({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Rm={name:"popperOffsets",enabled:!0,phase:"read",fn:Om,data:{}};function Pm(e){return e==="x"?"y":"x"}function $m(e){var t=e.state,r=e.options,n=e.name,o=r.mainAxis,a=o===void 0?!0:o,s=r.altAxis,c=s===void 0?!1:s,p=r.boundary,u=r.rootBoundary,m=r.altBoundary,v=r.padding,b=r.tether,d=b===void 0?!0:b,h=r.tetherOffset,f=h===void 0?0:h,g=Fr(t,{boundary:p,rootBoundary:u,padding:v,altBoundary:m}),x=Qe(t.placement),R=sr(t.placement),w=!R,k=Wo(x),y=Pm(k),S=t.modifiersData.popperOffsets,C=t.rects.reference,_=t.rects.popper,D=typeof f=="function"?f(Object.assign({},t.rects,{placement:t.placement})):f,V=typeof D=="number"?{mainAxis:D,altAxis:D}:Object.assign({mainAxis:0,altAxis:0},D),$=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,N={x:0,y:0};if(S){if(a){var O,I=k==="y"?_e:Me,U=k==="y"?Xe:Ke,A=k==="y"?"height":"width",H=S[k],ee=H+g[I],z=H-g[U],j=d?-_[A]/2:0,L=R===nr?C[A]:_[A],q=R===nr?-_[A]:-C[A],W=t.elements.arrow,G=d&&W?qo(W):{width:0,height:0},K=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Mi(),X=K[I],J=K[U],Y=$r(0,C[A],G[A]),Z=w?C[A]/2-j-Y-X-V.mainAxis:L-Y-X-V.mainAxis,Q=w?-C[A]/2+j+Y+J+V.mainAxis:q+Y+J+V.mainAxis,ie=t.elements.arrow&&Jr(t.elements.arrow),F=ie?k==="y"?ie.clientTop||0:ie.clientLeft||0:0,te=(O=$==null?void 0:$[k])!=null?O:0,M=H+Z-te-F,le=H+Q-te,Ne=$r(d?vn(ee,M):ee,H,d?It(z,le):z);S[k]=Ne,N[k]=Ne-H}if(c){var Pe,ke=k==="x"?_e:Me,Nt=k==="x"?Xe:Ke,$e=S[y],ot=y==="y"?"height":"width",Le=$e+g[ke],at=$e-g[Nt],Te=[_e,Me].indexOf(x)!==-1,zt=(Pe=$==null?void 0:$[y])!=null?Pe:0,Tt=Te?Le:$e-C[ot]-_[ot]-zt+V.altAxis,ur=Te?$e+C[ot]+_[ot]-zt-V.altAxis:at,Qr=d&&Te?rm(Tt,$e,ur):$r(d?Tt:Le,$e,d?ur:at);S[y]=Qr,N[y]=Qr-$e}t.modifiersData[n]=N}}const Im={name:"preventOverflow",enabled:!0,phase:"main",fn:$m,requiresIfExists:["offset"]};function _m(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Mm(e){return e===ze(e)||!qe(e)?Xo(e):_m(e)}function Dm(e){var t=e.getBoundingClientRect(),r=or(t.width)/e.offsetWidth||1,n=or(t.height)/e.offsetHeight||1;return r!==1||n!==1}function Am(e,t,r){r===void 0&&(r=!1);var n=qe(t),o=qe(t)&&Dm(t),a=Et(t),s=ar(e,o,r),c={scrollLeft:0,scrollTop:0},p={x:0,y:0};return(n||!n&&!r)&&((rt(t)!=="body"||Yo(a))&&(c=Mm(t)),qe(t)?(p=ar(t,!0),p.x+=t.clientLeft,p.y+=t.clientTop):a&&(p.x=Ko(a))),{x:s.left+c.scrollLeft-p.x,y:s.top+c.scrollTop-p.y,width:s.width,height:s.height}}function Lm(e){var t=new Map,r=new Set,n=[];e.forEach(function(a){t.set(a.name,a)});function o(a){r.add(a.name);var s=[].concat(a.requires||[],a.requiresIfExists||[]);s.forEach(function(c){if(!r.has(c)){var p=t.get(c);p&&o(p)}}),n.push(a)}return e.forEach(function(a){r.has(a.name)||o(a)}),n}function Bm(e){var t=Lm(e);return Yf.reduce(function(r,n){return r.concat(t.filter(function(o){return o.phase===n}))},[])}function Fm(e){var t;return function(){return t||(t=new Promise(function(r){Promise.resolve().then(function(){t=void 0,r(e())})})),t}}function Vm(e){var t=e.reduce(function(r,n){var o=r[n.name];return r[n.name]=o?Object.assign({},o,n,{options:Object.assign({},o.options,n.options),data:Object.assign({},o.data,n.data)}):n,r},{});return Object.keys(t).map(function(r){return t[r]})}var cs={placement:"bottom",modifiers:[],strategy:"absolute"};function ps(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function zm(e){e===void 0&&(e={});var t=e,r=t.defaultModifiers,n=r===void 0?[]:r,o=t.defaultOptions,a=o===void 0?cs:o;return function(c,p,u){u===void 0&&(u=a);var m={placement:"bottom",orderedModifiers:[],options:Object.assign({},cs,a),modifiersData:{},elements:{reference:c,popper:p},attributes:{},styles:{}},v=[],b=!1,d={state:m,setOptions:function(x){var R=typeof x=="function"?x(m.options):x;f(),m.options=Object.assign({},a,m.options,R),m.scrollParents={reference:Vt(c)?Ir(c):c.contextElement?Ir(c.contextElement):[],popper:Ir(p)};var w=Bm(Vm([].concat(n,m.options.modifiers)));return m.orderedModifiers=w.filter(function(k){return k.enabled}),h(),d.update()},forceUpdate:function(){if(!b){var x=m.elements,R=x.reference,w=x.popper;if(ps(R,w)){m.rects={reference:Am(R,Jr(w),m.options.strategy==="fixed"),popper:qo(w)},m.reset=!1,m.placement=m.options.placement,m.orderedModifiers.forEach(function(V){return m.modifiersData[V.name]=Object.assign({},V.data)});for(var k=0;k<m.orderedModifiers.length;k++){if(m.reset===!0){m.reset=!1,k=-1;continue}var y=m.orderedModifiers[k],S=y.fn,C=y.options,_=C===void 0?{}:C,D=y.name;typeof S=="function"&&(m=S({state:m,options:_,name:D,instance:d})||m)}}}},update:Fm(function(){return new Promise(function(g){d.forceUpdate(),g(m)})}),destroy:function(){f(),b=!0}};if(!ps(c,p))return d;d.setOptions(u).then(function(g){!b&&u.onFirstUpdate&&u.onFirstUpdate(g)});function h(){m.orderedModifiers.forEach(function(g){var x=g.name,R=g.options,w=R===void 0?{}:R,k=g.effect;if(typeof k=="function"){var y=k({state:m,name:x,instance:d,options:w}),S=function(){};v.push(y||S)}})}function f(){v.forEach(function(g){return g()}),v=[]}return d}}var Um=[um,Rm,pm,Qf,jm,Em,Im,sm,Tm],Gm=zm({defaultModifiers:Um});const Fi="Popper";function Hm(e){return Ri(Fi,e)}kf(Fi,["root"]);const qm=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Wm=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Xm(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function yn(e){return typeof e=="function"?e():e}function Dn(e){return e.nodeType!==void 0}function Km(e){return!Dn(e)}const Ym=()=>ft({root:["root"]},gf(Hm)),Jm={},Zm=T.forwardRef(function(t,r){var n;const{anchorEl:o,children:a,direction:s,disablePortal:c,modifiers:p,open:u,placement:m,popperOptions:v,popperRef:b,slotProps:d={},slots:h={},TransitionProps:f}=t,g=he(t,qm),x=T.useRef(null),R=We(x,r),w=T.useRef(null),k=We(w,b),y=T.useRef(k);Lt(()=>{y.current=k},[k]),T.useImperativeHandle(b,()=>w.current,[]);const S=Xm(m,s),[C,_]=T.useState(S),[D,V]=T.useState(yn(o));T.useEffect(()=>{w.current&&w.current.forceUpdate()}),T.useEffect(()=>{o&&V(yn(o))},[o]),Lt(()=>{if(!D||!u)return;const U=ee=>{_(ee.placement)};if(process.env.NODE_ENV!=="production"&&D&&Dn(D)&&D.nodeType===1){const ee=D.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ee.top===0&&ee.left===0&&ee.right===0&&ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let A=[{name:"preventOverflow",options:{altBoundary:c}},{name:"flip",options:{altBoundary:c}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ee})=>{U(ee)}}];p!=null&&(A=A.concat(p)),v&&v.modifiers!=null&&(A=A.concat(v.modifiers));const H=Gm(D,x.current,P({placement:S},v,{modifiers:A}));return y.current(H),()=>{H.destroy(),y.current(null)}},[D,c,p,u,v,S]);const $={placement:C};f!==null&&($.TransitionProps=f);const N=Ym(),O=(n=h.root)!=null?n:"div",I=Ft({elementType:O,externalSlotProps:d.root,externalForwardedProps:g,additionalProps:{role:"tooltip",ref:R},ownerState:t,className:N.root});return l.jsx(O,P({},I,{children:typeof a=="function"?a($):a}))}),Vi=T.forwardRef(function(t,r){const{anchorEl:n,children:o,container:a,direction:s="ltr",disablePortal:c=!1,keepMounted:p=!1,modifiers:u,open:m,placement:v="bottom",popperOptions:b=Jm,popperRef:d,style:h,transition:f=!1,slotProps:g={},slots:x={}}=t,R=he(t,Wm),[w,k]=T.useState(!0),y=()=>{k(!1)},S=()=>{k(!0)};if(!p&&!m&&(!f||w))return null;let C;if(a)C=a;else if(n){const V=yn(n);C=V&&Dn(V)?Oe(V).body:Oe(null).body}const _=!m&&p&&(!f||w)?"none":void 0,D=f?{in:m,onEnter:y,onExited:S}:void 0;return l.jsx(Lr,{disablePortal:c,container:C,children:l.jsx(Zm,P({anchorEl:n,direction:s,disablePortal:c,modifiers:u,ref:r,open:f?!w:m,placement:v,popperOptions:b,popperRef:d,slotProps:g,slots:x},R,{style:P({position:"fixed",top:0,left:0,display:_},h),TransitionProps:D,children:o}))})});process.env.NODE_ENV!=="production"&&(Vi.propTypes={anchorEl:pr(i.oneOfType([pt,i.object,i.func]),e=>{if(e.open){const t=yn(e.anchorEl);if(t&&Dn(t)&&t.nodeType===1){const r=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&r.top===0&&r.left===0&&r.right===0&&r.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Km(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:i.oneOfType([i.node,i.func]),container:i.oneOfType([pt,i.func]),direction:i.oneOf(["ltr","rtl"]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:_o,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),transition:i.bool});function Zr(){const e=Ei(Vo);return process.env.NODE_ENV!=="production"&&T.useDebugValue(e),e[zo]||e}function bo(e,t){return bo=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,o){return n.__proto__=o,n},bo(e,t)}function Qm(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,bo(e,t)}const ds={disabled:!1};var eh=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.shape({enter:i.number,exit:i.number,appear:i.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&i.oneOfType([i.string,i.shape({enter:i.string,exit:i.string,active:i.string}),i.shape({enter:i.string,enterDone:i.string,enterActive:i.string,exit:i.string,exitDone:i.string,exitActive:i.string})]);const zi=E.createContext(null);var th=function(t){return t.scrollTop},jr="unmounted",Ct="exited",jt="entering",Yt="entered",vo="exiting",ht=function(e){Qm(t,e);function t(n,o){var a;a=e.call(this,n,o)||this;var s=o,c=s&&!s.isMounting?n.enter:n.appear,p;return a.appearStatus=null,n.in?c?(p=Ct,a.appearStatus=jt):p=Yt:n.unmountOnExit||n.mountOnEnter?p=jr:p=Ct,a.state={status:p},a.nextCallback=null,a}t.getDerivedStateFromProps=function(o,a){var s=o.in;return s&&a.status===jr?{status:Ct}:null};var r=t.prototype;return r.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},r.componentDidUpdate=function(o){var a=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==jt&&s!==Yt&&(a=jt):(s===jt||s===Yt)&&(a=vo)}this.updateStatus(!1,a)},r.componentWillUnmount=function(){this.cancelNextCallback()},r.getTimeouts=function(){var o=this.props.timeout,a,s,c;return a=s=c=o,o!=null&&typeof o!="number"&&(a=o.exit,s=o.enter,c=o.appear!==void 0?o.appear:s),{exit:a,enter:s,appear:c}},r.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===jt){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:Nr.findDOMNode(this);s&&th(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Ct&&this.setState({status:jr})},r.performEnter=function(o){var a=this,s=this.props.enter,c=this.context?this.context.isMounting:o,p=this.props.nodeRef?[c]:[Nr.findDOMNode(this),c],u=p[0],m=p[1],v=this.getTimeouts(),b=c?v.appear:v.enter;if(!o&&!s||ds.disabled){this.safeSetState({status:Yt},function(){a.props.onEntered(u)});return}this.props.onEnter(u,m),this.safeSetState({status:jt},function(){a.props.onEntering(u,m),a.onTransitionEnd(b,function(){a.safeSetState({status:Yt},function(){a.props.onEntered(u,m)})})})},r.performExit=function(){var o=this,a=this.props.exit,s=this.getTimeouts(),c=this.props.nodeRef?void 0:Nr.findDOMNode(this);if(!a||ds.disabled){this.safeSetState({status:Ct},function(){o.props.onExited(c)});return}this.props.onExit(c),this.safeSetState({status:vo},function(){o.props.onExiting(c),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:Ct},function(){o.props.onExited(c)})})})},r.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},r.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},r.setNextCallback=function(o){var a=this,s=!0;return this.nextCallback=function(c){s&&(s=!1,a.nextCallback=null,o(c))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},r.onTransitionEnd=function(o,a){this.setNextCallback(a);var s=this.props.nodeRef?this.props.nodeRef.current:Nr.findDOMNode(this),c=o==null&&!this.props.addEndListener;if(!s||c){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var p=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],u=p[0],m=p[1];this.props.addEndListener(u,m)}o!=null&&setTimeout(this.nextCallback,o)},r.render=function(){var o=this.state.status;if(o===jr)return null;var a=this.props,s=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var c=he(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return E.createElement(zi.Provider,{value:null},typeof s=="function"?s(o,c):E.cloneElement(E.Children.only(s),c))},t}(E.Component);ht.contextType=zi;ht.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:i.shape({current:typeof Element>"u"?i.any:function(e,t,r,n,o,a){var s=e[t];return i.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,r,n,o,a)}}),children:i.oneOfType([i.func.isRequired,i.element.isRequired]).isRequired,in:i.bool,mountOnEnter:i.bool,unmountOnExit:i.bool,appear:i.bool,enter:i.bool,exit:i.bool,timeout:function(t){var r=eh;t.addEndListener||(r=r.isRequired);for(var n=arguments.length,o=new Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=arguments[a];return r.apply(void 0,[t].concat(o))},addEndListener:i.func,onEnter:i.func,onEntering:i.func,onEntered:i.func,onExit:i.func,onExiting:i.func,onExited:i.func}:{};function Xt(){}ht.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Xt,onEntering:Xt,onEntered:Xt,onExit:Xt,onExiting:Xt,onExited:Xt};ht.UNMOUNTED=jr;ht.EXITED=Ct;ht.ENTERING=jt;ht.ENTERED=Yt;ht.EXITING=vo;const Ui=ht,Gi=e=>e.scrollTop;function wn(e,t){var r,n;const{timeout:o,easing:a,style:s={}}=e;return{duration:(r=s.transitionDuration)!=null?r:typeof o=="number"?o:o[t.mode]||0,easing:(n=s.transitionTimingFunction)!=null?n:typeof a=="object"?a[t.mode]:a,delay:s.transitionDelay}}const rh=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function yo(e){return`scale(${e}, ${e**2})`}const nh={entering:{opacity:1,transform:yo(1)},entered:{opacity:1,transform:"none"}},Qn=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Jo=T.forwardRef(function(t,r){const{addEndListener:n,appear:o=!0,children:a,easing:s,in:c,onEnter:p,onEntered:u,onEntering:m,onExit:v,onExited:b,onExiting:d,style:h,timeout:f="auto",TransitionComponent:g=Ui}=t,x=he(t,rh),R=Sr(),w=T.useRef(),k=Zr(),y=T.useRef(null),S=We(y,a.ref,r),C=U=>A=>{if(U){const H=y.current;A===void 0?U(H):U(H,A)}},_=C(m),D=C((U,A)=>{Gi(U);const{duration:H,delay:ee,easing:z}=wn({style:h,timeout:f,easing:s},{mode:"enter"});let j;f==="auto"?(j=k.transitions.getAutoHeightDuration(U.clientHeight),w.current=j):j=H,U.style.transition=[k.transitions.create("opacity",{duration:j,delay:ee}),k.transitions.create("transform",{duration:Qn?j:j*.666,delay:ee,easing:z})].join(","),p&&p(U,A)}),V=C(u),$=C(d),N=C(U=>{const{duration:A,delay:H,easing:ee}=wn({style:h,timeout:f,easing:s},{mode:"exit"});let z;f==="auto"?(z=k.transitions.getAutoHeightDuration(U.clientHeight),w.current=z):z=A,U.style.transition=[k.transitions.create("opacity",{duration:z,delay:H}),k.transitions.create("transform",{duration:Qn?z:z*.666,delay:Qn?H:H||z*.333,easing:ee})].join(","),U.style.opacity=0,U.style.transform=yo(.75),v&&v(U)}),O=C(b),I=U=>{f==="auto"&&R.start(w.current||0,U),n&&n(y.current,U)};return l.jsx(g,P({appear:o,in:c,nodeRef:y,onEnter:D,onEntered:V,onEntering:_,onExit:N,onExited:O,onExiting:$,addEndListener:I,timeout:f==="auto"?null:f},x,{children:(U,A)=>T.cloneElement(a,P({style:P({opacity:0,transform:yo(.75),visibility:U==="exited"&&!c?"hidden":void 0},nh[U],h,a.props.style),ref:S},A))}))});process.env.NODE_ENV!=="production"&&(Jo.propTypes={addEndListener:i.func,appear:i.bool,children:qr.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});Jo.muiSupportAuto=!0;const wo=Jo,oh=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},us=oh,ah=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],sh=Re(Vi,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Hi=T.forwardRef(function(t,r){var n;const o=ki(),a=mt({props:t,name:"MuiPopper"}),{anchorEl:s,component:c,components:p,componentsProps:u,container:m,disablePortal:v,keepMounted:b,modifiers:d,open:h,placement:f,popperOptions:g,popperRef:x,transition:R,slots:w,slotProps:k}=a,y=he(a,ah),S=(n=w==null?void 0:w.root)!=null?n:p==null?void 0:p.Root,C=P({anchorEl:s,container:m,disablePortal:v,keepMounted:b,modifiers:d,open:h,placement:f,popperOptions:g,popperRef:x,transition:R},y);return l.jsx(sh,P({as:c,direction:o==null?void 0:o.direction,slots:{root:S},slotProps:k??u},C,{ref:r}))});process.env.NODE_ENV!=="production"&&(Hi.propTypes={anchorEl:i.oneOfType([pt,i.object,i.func]),children:i.oneOfType([i.node,i.func]),component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:_o,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transition:i.bool});const qi=Hi;function ih(e){return nt("MuiTooltip",e)}const lh=xt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),wt=lh,ch=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function ph(e){return Math.round(e*1e5)/1e5}const dh=e=>{const{classes:t,disableInteractive:r,arrow:n,touch:o,placement:a}=e,s={popper:["popper",!r&&"popperInteractive",n&&"popperArrow"],tooltip:["tooltip",n&&"tooltipArrow",o&&"touch",`tooltipPlacement${tt(a.split("-")[0])}`],arrow:["arrow"]};return ft(s,ih,t)},uh=Re(qi,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.popper,!r.disableInteractive&&t.popperInteractive,r.arrow&&t.popperArrow,!r.open&&t.popperClose]}})(({theme:e,ownerState:t,open:r})=>P({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!r&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${wt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${wt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${wt.arrow}`]:P({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${wt.arrow}`]:P({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),fh=Re("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.tooltip,r.touch&&t.touch,r.arrow&&t.tooltipArrow,t[`tooltipPlacement${tt(r.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>P({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:gn(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${ph(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${wt.popper}[data-popper-placement*="left"] &`]:P({transformOrigin:"right center"},t.isRtl?P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):P({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${wt.popper}[data-popper-placement*="right"] &`]:P({transformOrigin:"left center"},t.isRtl?P({marginRight:"14px"},t.touch&&{marginRight:"24px"}):P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${wt.popper}[data-popper-placement*="top"] &`]:P({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${wt.popper}[data-popper-placement*="bottom"] &`]:P({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),mh=Re("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:gn(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let an=!1;const fs=new Wr;let xr={x:0,y:0};function sn(e,t){return r=>{t&&t(r),e(r)}}const Wi=T.forwardRef(function(t,r){var n,o,a,s,c,p,u,m,v,b,d,h,f,g,x,R,w,k,y;const S=mt({props:t,name:"MuiTooltip"}),{arrow:C=!1,children:_,components:D={},componentsProps:V={},describeChild:$=!1,disableFocusListener:N=!1,disableHoverListener:O=!1,disableInteractive:I=!1,disableTouchListener:U=!1,enterDelay:A=100,enterNextDelay:H=0,enterTouchDelay:ee=700,followCursor:z=!1,id:j,leaveDelay:L=0,leaveTouchDelay:q=1500,onClose:W,onOpen:G,open:K,placement:X="bottom",PopperComponent:J,PopperProps:Y={},slotProps:Z={},slots:Q={},title:ie,TransitionComponent:F=wo,TransitionProps:te}=S,M=he(S,ch),le=T.isValidElement(_)?_:l.jsx("span",{children:_}),Ne=Zr(),Pe=Ne.direction==="rtl",[ke,Nt]=T.useState(),[$e,ot]=T.useState(null),Le=T.useRef(!1),at=I||z,Te=Sr(),zt=Sr(),Tt=Sr(),ur=Sr(),[Qr,sa]=pi({controlled:K,default:!1,name:"Tooltip",state:"open"});let st=Qr;if(process.env.NODE_ENV!=="production"){const{current:ne}=T.useRef(K!==void 0);T.useEffect(()=>{ke&&ke.disabled&&!ne&&ie!==""&&ke.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ie,ke,ne])}const An=ci(j),fr=T.useRef(),en=Dr(()=>{fr.current!==void 0&&(document.body.style.WebkitUserSelect=fr.current,fr.current=void 0),ur.clear()});T.useEffect(()=>en,[en]);const ia=ne=>{fs.clear(),an=!0,sa(!0),G&&!st&&G(ne)},tn=Dr(ne=>{fs.start(800+L,()=>{an=!1}),sa(!1),W&&st&&W(ne),Te.start(Ne.transitions.duration.shortest,()=>{Le.current=!1})}),Ln=ne=>{Le.current&&ne.type!=="touchstart"||(ke&&ke.removeAttribute("title"),zt.clear(),Tt.clear(),A||an&&H?zt.start(an?H:A,()=>{ia(ne)}):ia(ne))},la=ne=>{zt.clear(),Tt.start(L,()=>{tn(ne)})},{isFocusVisibleRef:ca,onBlur:Wl,onFocus:Xl,ref:Kl}=di(),[,pa]=T.useState(!1),da=ne=>{Wl(ne),ca.current===!1&&(pa(!1),la(ne))},ua=ne=>{ke||Nt(ne.currentTarget),Xl(ne),ca.current===!0&&(pa(!0),Ln(ne))},fa=ne=>{Le.current=!0;const Be=le.props;Be.onTouchStart&&Be.onTouchStart(ne)},ma=Ln,ha=la,Yl=ne=>{fa(ne),Tt.clear(),Te.clear(),en(),fr.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",ur.start(ee,()=>{document.body.style.WebkitUserSelect=fr.current,Ln(ne)})},Jl=ne=>{le.props.onTouchEnd&&le.props.onTouchEnd(ne),en(),Tt.start(q,()=>{tn(ne)})};T.useEffect(()=>{if(!st)return;function ne(Be){(Be.key==="Escape"||Be.key==="Esc")&&tn(Be)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[tn,st]);const Zl=We(le.ref,Kl,Nt,r);!ie&&ie!==0&&(st=!1);const Bn=T.useRef(),Ql=ne=>{const Be=le.props;Be.onMouseMove&&Be.onMouseMove(ne),xr={x:ne.clientX,y:ne.clientY},Bn.current&&Bn.current.update()},mr={},Fn=typeof ie=="string";$?(mr.title=!st&&Fn&&!O?ie:null,mr["aria-describedby"]=st?An:null):(mr["aria-label"]=Fn?ie:null,mr["aria-labelledby"]=st&&!Fn?An:null);const Ue=P({},mr,M,le.props,{className:Ce(M.className,le.props.className),onTouchStart:fa,ref:Zl},z?{onMouseMove:Ql}:{});process.env.NODE_ENV!=="production"&&(Ue["data-mui-internal-clone-element"]=!0,T.useEffect(()=>{ke&&!ke.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[ke]));const hr={};U||(Ue.onTouchStart=Yl,Ue.onTouchEnd=Jl),O||(Ue.onMouseOver=sn(ma,Ue.onMouseOver),Ue.onMouseLeave=sn(ha,Ue.onMouseLeave),at||(hr.onMouseOver=ma,hr.onMouseLeave=ha)),N||(Ue.onFocus=sn(ua,Ue.onFocus),Ue.onBlur=sn(da,Ue.onBlur),at||(hr.onFocus=ua,hr.onBlur=da)),process.env.NODE_ENV!=="production"&&le.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${le.props.title}\` or the Tooltip component.`].join(`
`));const ec=T.useMemo(()=>{var ne;let Be=[{name:"arrow",enabled:!!$e,options:{element:$e,padding:4}}];return(ne=Y.popperOptions)!=null&&ne.modifiers&&(Be=Be.concat(Y.popperOptions.modifiers)),P({},Y.popperOptions,{modifiers:Be})},[$e,Y]),gr=P({},S,{isRtl:Pe,arrow:C,disableInteractive:at,placement:X,PopperComponentProp:J,touch:Le.current}),Vn=dh(gr),ga=(n=(o=Q.popper)!=null?o:D.Popper)!=null?n:uh,ba=(a=(s=(c=Q.transition)!=null?c:D.Transition)!=null?s:F)!=null?a:wo,va=(p=(u=Q.tooltip)!=null?u:D.Tooltip)!=null?p:fh,ya=(m=(v=Q.arrow)!=null?v:D.Arrow)!=null?m:mh,tc=Cr(ga,P({},Y,(b=Z.popper)!=null?b:V.popper,{className:Ce(Vn.popper,Y==null?void 0:Y.className,(d=(h=Z.popper)!=null?h:V.popper)==null?void 0:d.className)}),gr),rc=Cr(ba,P({},te,(f=Z.transition)!=null?f:V.transition),gr),nc=Cr(va,P({},(g=Z.tooltip)!=null?g:V.tooltip,{className:Ce(Vn.tooltip,(x=(R=Z.tooltip)!=null?R:V.tooltip)==null?void 0:x.className)}),gr),oc=Cr(ya,P({},(w=Z.arrow)!=null?w:V.arrow,{className:Ce(Vn.arrow,(k=(y=Z.arrow)!=null?y:V.arrow)==null?void 0:k.className)}),gr);return l.jsxs(T.Fragment,{children:[T.cloneElement(le,Ue),l.jsx(ga,P({as:J??qi,placement:X,anchorEl:z?{getBoundingClientRect:()=>({top:xr.y,left:xr.x,right:xr.x,bottom:xr.y,width:0,height:0})}:ke,popperRef:Bn,open:ke?st:!1,id:An,transition:!0},hr,tc,{popperOptions:ec,children:({TransitionProps:ne})=>l.jsx(ba,P({timeout:Ne.transitions.duration.shorter},ne,rc,{children:l.jsxs(va,P({},nc,{children:[ie,C?l.jsx(ya,P({},oc,{ref:ot})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Wi.propTypes={arrow:i.bool,children:qr.isRequired,classes:i.object,className:i.string,components:i.shape({Arrow:i.elementType,Popper:i.elementType,Tooltip:i.elementType,Transition:i.elementType}),componentsProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),describeChild:i.bool,disableFocusListener:i.bool,disableHoverListener:i.bool,disableInteractive:i.bool,disableTouchListener:i.bool,enterDelay:i.number,enterNextDelay:i.number,enterTouchDelay:i.number,followCursor:i.bool,id:i.string,leaveDelay:i.number,leaveTouchDelay:i.number,onClose:i.func,onOpen:i.func,open:i.bool,placement:i.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:i.elementType,PopperProps:i.object,slotProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),slots:i.shape({arrow:i.elementType,popper:i.elementType,tooltip:i.elementType,transition:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),title:i.node,TransitionComponent:i.elementType,TransitionProps:i.object});const hh=Wi;function ms(e,t,r){return e?l.jsx(Se.ListItemIcon,{className:`papi-menu-icon-${r?"leading":"trailing"}`,children:l.jsx("img",{src:e,alt:`${r?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Zo(e){const{onClick:t,label:r,tooltip:n,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:s=void 0,hasAutoFocus:c=!1,className:p,isDisabled:u=!1,isDense:m=!0,isSubMenuParent:v=!1,hasDisabledGutters:b=!1,hasDivider:d=!1,focusVisibleClassName:h,id:f,children:g}=e,x=l.jsx(Se.MenuItem,{sx:{lineHeight:.8},autoFocus:c,className:p,disabled:u,dense:m,disableGutters:b,divider:d,focusVisibleClassName:h,onClick:t,id:f,children:r?l.jsxs(l.Fragment,{children:[ms(a,r,!0),l.jsx(Se.ListItemText,{primary:r,inset:!a&&o}),v?l.jsx(Se.ListItemIcon,{className:"papi-menu-icon-trailing",children:l.jsx(Si,{})}):ms(s,r,!1)]}):g});return n?l.jsx(hh,{title:n,placement:"right",children:l.jsx("div",{children:x})}):x}function Xi(e){return Object.entries(e.groups).map(([r,n])=>({id:r,group:n}))}function gh(e){const[t,r]=E.useState(void 0),{parentMenuItem:n,parentItemProps:o,menuDefinition:a}=e,s=u=>{r(u.currentTarget)},c=()=>{r(void 0)},p=()=>{let u=Xi(a).filter(m=>"menuItem"in m.group);if(!(n!=null&&n.id))throw new Error("A valid parent menu item is required for submenus.");return u=u.filter(m=>"menuItem"in m.group&&m.group.menuItem===n.id),l.jsx(Qo,{...e,includedGroups:u})};return l.jsxs(l.Fragment,{children:[l.jsx(Zo,{onClick:s,...o,isSubMenuParent:!0}),l.jsx(Se.Menu,{anchorEl:t,open:!!t,onClose:c,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:p()},n.id)]})}const bh=(e,t)=>t.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function Qo(e){const{menuDefinition:t,onClick:r,commandHandler:n,includedGroups:o}=e,{items:a,allowForLeadingIcons:s}=E.useMemo(()=>{const m=o&&o.length>0?o:Xi(t).filter(h=>!("menuItem"in h.group)),v=Object.values(m).sort((h,f)=>(h.group.order||0)-(f.group.order||0)),b=[];v.forEach(h=>{bh(h.id,t.items).forEach(f=>b.push({item:f,isLastItemInGroup:!1})),b.length>0&&(b[b.length-1].isLastItemInGroup=!0)}),b.length>0&&(b[b.length-1].isLastItemInGroup=!1);const d=b.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:b,allowForLeadingIcons:d}},[o,t]),c=({item:m,isLastItemInGroup:v})=>({className:"papi-menu-item",label:m.label,tooltip:m.tooltip,iconPathBefore:"iconPathBefore"in m?m.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in m?m.iconPathAfter:void 0,hasDivider:v,allowForLeadingIcons:s}),[p]=a;if(!p)return l.jsx("div",{});const u=p.item.group;return l.jsx("div",{role:"menu","aria-label":u,children:a.map((m,v)=>{const{item:b}=m,d=c(m);if("command"in b){const h=b.group+v;return l.jsx(Zo,{onClick:f=>{r==null||r(f),n(b)},...d},h)}return l.jsx(gh,{parentMenuItem:b,parentItemProps:d,...e},u+b.id)})},u)}function vh(e){const{menuDefinition:t,columnId:r}=e;let a=Object.entries(t.groups).map(([s,c])=>({id:s,group:c})).filter(s=>"column"in s.group);return r&&"columns"in t&&t.columns[r]&&(a=a.filter(s=>"column"in s.group&&s.group.column===r)),l.jsx(Qo,{...e,includedGroups:a})}function yh({commandHandler:e,menuDefinition:t,id:r,metadata:n,onClick:o,className:a}){return l.jsxs(Se.Grid,{id:r,item:!0,xs:"auto",role:"menu","aria-label":r,className:`papi-menu-column ${a??""}`,children:[l.jsx("h3",{"aria-label":n.label,className:`papi-menu-column-header ${a??""}`,children:n.label}),l.jsx(Se.List,{id:r,dense:!0,className:a??"",children:l.jsx(vh,{commandHandler:e,menuDefinition:t,columnId:r,onClick:o})})]})}function Ki({commandHandler:e,className:t,multiColumnMenu:r,id:n}){const{columns:o}=r,a=E.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(c=>{if(c==="isExtensible")return;const p=c,u=o[p];typeof u=="object"&&typeof u.order=="number"&&!Number.isNaN(u.order)?s.set(u.order,{id:p,metadata:u}):console.warn(`Property ${c} (${typeof u}) on menu ${n} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((c,p)=>(c.metadata.order||0)-(p.metadata.order||0))},[o,n]);return l.jsx(Se.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:n,children:a.map((s,c)=>l.jsx(yh,{commandHandler:e,menuDefinition:r,...s,className:t},c))})}const Yi=T.createContext({});process.env.NODE_ENV!=="production"&&(Yi.displayName="ListContext");const wh=Yi;function xh(e){return nt("MuiList",e)}xt("MuiList",["root","padding","dense","subheader"]);const kh=["children","className","component","dense","disablePadding","subheader"],Eh=e=>{const{classes:t,disablePadding:r,dense:n,subheader:o}=e;return ft({root:["root",!r&&"padding",n&&"dense",o&&"subheader"]},xh,t)},Nh=Re("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,!r.disablePadding&&t.padding,r.dense&&t.dense,r.subheader&&t.subheader]}})(({ownerState:e})=>P({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Ji=T.forwardRef(function(t,r){const n=mt({props:t,name:"MuiList"}),{children:o,className:a,component:s="ul",dense:c=!1,disablePadding:p=!1,subheader:u}=n,m=he(n,kh),v=T.useMemo(()=>({dense:c}),[c]),b=P({},n,{component:s,dense:c,disablePadding:p}),d=Eh(b);return l.jsx(wh.Provider,{value:v,children:l.jsxs(Nh,P({as:s,className:Ce(d.root,a),ref:r,ownerState:b},m,{children:[u,o]}))})});process.env.NODE_ENV!=="production"&&(Ji.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,dense:i.bool,disablePadding:i.bool,subheader:i.node,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const Th=Ji,Sh=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function eo(e,t,r){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:r?null:e.firstChild}function hs(e,t,r){return e===t?r?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:r?null:e.lastChild}function Zi(e,t){if(t===void 0)return!0;let r=e.innerText;return r===void 0&&(r=e.textContent),r=r.trim().toLowerCase(),r.length===0?!1:t.repeating?r[0]===t.keys[0]:r.indexOf(t.keys.join(""))===0}function kr(e,t,r,n,o,a){let s=!1,c=o(e,t,t?r:!1);for(;c;){if(c===e.firstChild){if(s)return!1;s=!0}const p=n?!1:c.disabled||c.getAttribute("aria-disabled")==="true";if(!c.hasAttribute("tabindex")||!Zi(c,a)||p)c=o(e,c,r);else return c.focus(),!0}return!1}const Qi=T.forwardRef(function(t,r){const{actions:n,autoFocus:o=!1,autoFocusItem:a=!1,children:s,className:c,disabledItemsFocusable:p=!1,disableListWrap:u=!1,onKeyDown:m,variant:v="selectedMenu"}=t,b=he(t,Sh),d=T.useRef(null),h=T.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Lt(()=>{o&&d.current.focus()},[o]),T.useImperativeHandle(n,()=>({adjustStyleForScrollbar:(w,k)=>{const y=!d.current.style.width;if(w.clientHeight<d.current.clientHeight&&y){const S=`${ui(Oe(w))}px`;d.current.style[k.direction==="rtl"?"paddingLeft":"paddingRight"]=S,d.current.style.width=`calc(100% + ${S})`}return d.current}}),[]);const f=w=>{const k=d.current,y=w.key,S=Oe(k).activeElement;if(y==="ArrowDown")w.preventDefault(),kr(k,S,u,p,eo);else if(y==="ArrowUp")w.preventDefault(),kr(k,S,u,p,hs);else if(y==="Home")w.preventDefault(),kr(k,null,u,p,eo);else if(y==="End")w.preventDefault(),kr(k,null,u,p,hs);else if(y.length===1){const C=h.current,_=y.toLowerCase(),D=performance.now();C.keys.length>0&&(D-C.lastTime>500?(C.keys=[],C.repeating=!0,C.previousKeyMatched=!0):C.repeating&&_!==C.keys[0]&&(C.repeating=!1)),C.lastTime=D,C.keys.push(_);const V=S&&!C.repeating&&Zi(S,C);C.previousKeyMatched&&(V||kr(k,S,!1,p,eo,C))?w.preventDefault():C.previousKeyMatched=!1}m&&m(w)},g=We(d,r);let x=-1;T.Children.forEach(s,(w,k)=>{if(!T.isValidElement(w)){x===k&&(x+=1,x>=s.length&&(x=-1));return}process.env.NODE_ENV!=="production"&&fn.isFragment(w)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),w.props.disabled||(v==="selectedMenu"&&w.props.selected||x===-1)&&(x=k),x===k&&(w.props.disabled||w.props.muiSkipListHighlight||w.type.muiSkipListHighlight)&&(x+=1,x>=s.length&&(x=-1))});const R=T.Children.map(s,(w,k)=>{if(k===x){const y={};return a&&(y.autoFocus=!0),w.props.tabIndex===void 0&&v==="selectedMenu"&&(y.tabIndex=0),T.cloneElement(w,y)}return w});return l.jsx(Th,P({role:"menu",ref:g,className:c,onKeyDown:f,tabIndex:o?0:-1},b,{children:R}))});process.env.NODE_ENV!=="production"&&(Qi.propTypes={autoFocus:i.bool,autoFocusItem:i.bool,children:i.node,className:i.string,disabledItemsFocusable:i.bool,disableListWrap:i.bool,onKeyDown:i.func,variant:i.oneOf(["menu","selectedMenu"])});const Ch=Qi,jh=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Oh={entering:{opacity:1},entered:{opacity:1}},el=T.forwardRef(function(t,r){const n=Zr(),o={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:a,appear:s=!0,children:c,easing:p,in:u,onEnter:m,onEntered:v,onEntering:b,onExit:d,onExited:h,onExiting:f,style:g,timeout:x=o,TransitionComponent:R=Ui}=t,w=he(t,jh),k=T.useRef(null),y=We(k,c.ref,r),S=I=>U=>{if(I){const A=k.current;U===void 0?I(A):I(A,U)}},C=S(b),_=S((I,U)=>{Gi(I);const A=wn({style:g,timeout:x,easing:p},{mode:"enter"});I.style.webkitTransition=n.transitions.create("opacity",A),I.style.transition=n.transitions.create("opacity",A),m&&m(I,U)}),D=S(v),V=S(f),$=S(I=>{const U=wn({style:g,timeout:x,easing:p},{mode:"exit"});I.style.webkitTransition=n.transitions.create("opacity",U),I.style.transition=n.transitions.create("opacity",U),d&&d(I)}),N=S(h),O=I=>{a&&a(k.current,I)};return l.jsx(R,P({appear:s,in:u,nodeRef:k,onEnter:_,onEntered:D,onEntering:C,onExit:$,onExited:N,onExiting:V,addEndListener:O,timeout:x},w,{children:(I,U)=>T.cloneElement(c,P({style:P({opacity:0,visibility:I==="exited"&&!u?"hidden":void 0},Oh[I],g,c.props.style),ref:y},U))}))});process.env.NODE_ENV!=="production"&&(el.propTypes={addEndListener:i.func,appear:i.bool,children:qr.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Rh=el;function Ph(e){return nt("MuiBackdrop",e)}xt("MuiBackdrop",["root","invisible"]);const $h=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Ih=e=>{const{classes:t,invisible:r}=e;return ft({root:["root",r&&"invisible"]},Ph,t)},_h=Re("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.invisible&&t.invisible]}})(({ownerState:e})=>P({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),tl=T.forwardRef(function(t,r){var n,o,a;const s=mt({props:t,name:"MuiBackdrop"}),{children:c,className:p,component:u="div",components:m={},componentsProps:v={},invisible:b=!1,open:d,slotProps:h={},slots:f={},TransitionComponent:g=Rh,transitionDuration:x}=s,R=he(s,$h),w=P({},s,{component:u,invisible:b}),k=Ih(w),y=(n=h.root)!=null?n:v.root;return l.jsx(g,P({in:d,timeout:x},R,{children:l.jsx(_h,P({"aria-hidden":!0},y,{as:(o=(a=f.root)!=null?a:m.Root)!=null?o:u,className:Ce(k.root,p,y==null?void 0:y.className),ownerState:P({},w,y==null?void 0:y.ownerState),classes:k,ref:r,children:c}))}))});process.env.NODE_ENV!=="production"&&(tl.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.object}),invisible:i.bool,open:i.bool.isRequired,slotProps:i.shape({root:i.object}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Mh=tl;function Dh(e){return nt("MuiModal",e)}xt("MuiModal",["root","hidden","backdrop"]);const Ah=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Lh=e=>{const{open:t,exited:r,classes:n}=e;return ft({root:["root",!t&&r&&"hidden"],backdrop:["backdrop"]},Dh,n)},Bh=Re("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,!r.open&&r.exited&&t.hidden]}})(({theme:e,ownerState:t})=>P({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Fh=Re(Mh,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),rl=T.forwardRef(function(t,r){var n,o,a,s,c,p;const u=mt({name:"MuiModal",props:t}),{BackdropComponent:m=Fh,BackdropProps:v,className:b,closeAfterTransition:d=!1,children:h,container:f,component:g,components:x={},componentsProps:R={},disableAutoFocus:w=!1,disableEnforceFocus:k=!1,disableEscapeKeyDown:y=!1,disablePortal:S=!1,disableRestoreFocus:C=!1,disableScrollLock:_=!1,hideBackdrop:D=!1,keepMounted:V=!1,onBackdropClick:$,open:N,slotProps:O,slots:I}=u,U=he(u,Ah),A=P({},u,{closeAfterTransition:d,disableAutoFocus:w,disableEnforceFocus:k,disableEscapeKeyDown:y,disablePortal:S,disableRestoreFocus:C,disableScrollLock:_,hideBackdrop:D,keepMounted:V}),{getRootProps:H,getBackdropProps:ee,getTransitionProps:z,portalRef:j,isTopModal:L,exited:q,hasTransition:W}=Lf(P({},A,{rootRef:r})),G=P({},A,{exited:q}),K=Lh(G),X={};if(h.props.tabIndex===void 0&&(X.tabIndex="-1"),W){const{onEnter:te,onExited:M}=z();X.onEnter=te,X.onExited=M}const J=(n=(o=I==null?void 0:I.root)!=null?o:x.Root)!=null?n:Bh,Y=(a=(s=I==null?void 0:I.backdrop)!=null?s:x.Backdrop)!=null?a:m,Z=(c=O==null?void 0:O.root)!=null?c:R.root,Q=(p=O==null?void 0:O.backdrop)!=null?p:R.backdrop,ie=Ft({elementType:J,externalSlotProps:Z,externalForwardedProps:U,getSlotProps:H,additionalProps:{ref:r,as:g},ownerState:G,className:Ce(b,Z==null?void 0:Z.className,K==null?void 0:K.root,!G.open&&G.exited&&(K==null?void 0:K.hidden))}),F=Ft({elementType:Y,externalSlotProps:Q,additionalProps:v,getSlotProps:te=>ee(P({},te,{onClick:M=>{$&&$(M),te!=null&&te.onClick&&te.onClick(M)}})),className:Ce(Q==null?void 0:Q.className,v==null?void 0:v.className,K==null?void 0:K.backdrop),ownerState:G});return!V&&!N&&(!W||q)?null:l.jsx(Lr,{ref:j,container:f,disablePortal:S,children:l.jsxs(J,P({},ie,{children:[!D&&m?l.jsx(Y,P({},F)):null,l.jsx(bn,{disableEnforceFocus:k,disableAutoFocus:w,disableRestoreFocus:C,isEnabled:L,open:N,children:T.cloneElement(h,X)})]}))})});process.env.NODE_ENV!=="production"&&(rl.propTypes={BackdropComponent:i.elementType,BackdropProps:i.object,children:qr.isRequired,classes:i.object,className:i.string,closeAfterTransition:i.bool,component:i.elementType,components:i.shape({Backdrop:i.elementType,Root:i.elementType}),componentsProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableEscapeKeyDown:i.bool,disablePortal:i.bool,disableRestoreFocus:i.bool,disableScrollLock:i.bool,hideBackdrop:i.bool,keepMounted:i.bool,onBackdropClick:i.func,onClose:i.func,onTransitionEnter:i.func,onTransitionExited:i.func,open:i.bool.isRequired,slotProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({backdrop:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const Vh=rl;function zh(e){return nt("MuiPaper",e)}xt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Uh=["className","component","elevation","square","variant"],Gh=e=>{const{square:t,elevation:r,variant:n,classes:o}=e,a={root:["root",n,!t&&"rounded",n==="elevation"&&`elevation${r}`]};return ft(a,zh,o)},Hh=Re("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],!r.square&&t.rounded,r.variant==="elevation"&&t[`elevation${r.elevation}`]]}})(({theme:e,ownerState:t})=>{var r;return P({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&P({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${gn("#fff",us(t.elevation))}, ${gn("#fff",us(t.elevation))})`},e.vars&&{backgroundImage:(r=e.vars.overlays)==null?void 0:r[t.elevation]}))}),nl=T.forwardRef(function(t,r){const n=mt({props:t,name:"MuiPaper"}),{className:o,component:a="div",elevation:s=1,square:c=!1,variant:p="elevation"}=n,u=he(n,Uh),m=P({},n,{component:a,elevation:s,square:c,variant:p}),v=Gh(m);return process.env.NODE_ENV!=="production"&&Zr().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),l.jsx(Hh,P({as:a,ownerState:m,className:Ce(v.root,o),ref:r},u))});process.env.NODE_ENV!=="production"&&(nl.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,elevation:pr(hi,e=>{const{elevation:t,variant:r}=e;return t>0&&r==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${r}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:i.bool,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),variant:i.oneOfType([i.oneOf(["elevation","outlined"]),i.string])});const qh=nl;function Wh(e){return nt("MuiPopover",e)}xt("MuiPopover",["root","paper"]);const Xh=["onEntering"],Kh=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Yh=["slotProps"];function gs(e,t){let r=0;return typeof t=="number"?r=t:t==="center"?r=e.height/2:t==="bottom"&&(r=e.height),r}function bs(e,t){let r=0;return typeof t=="number"?r=t:t==="center"?r=e.width/2:t==="right"&&(r=e.width),r}function vs(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function dn(e){return typeof e=="function"?e():e}const Jh=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"]},Wh,t)},Zh=Re(Vh,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),ol=Re(qh,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),al=T.forwardRef(function(t,r){var n,o,a;const s=mt({props:t,name:"MuiPopover"}),{action:c,anchorEl:p,anchorOrigin:u={vertical:"top",horizontal:"left"},anchorPosition:m,anchorReference:v="anchorEl",children:b,className:d,container:h,elevation:f=8,marginThreshold:g=16,open:x,PaperProps:R={},slots:w,slotProps:k,transformOrigin:y={vertical:"top",horizontal:"left"},TransitionComponent:S=wo,transitionDuration:C="auto",TransitionProps:{onEntering:_}={},disableScrollLock:D=!1}=s,V=he(s.TransitionProps,Xh),$=he(s,Kh),N=(n=k==null?void 0:k.paper)!=null?n:R,O=T.useRef(),I=We(O,N.ref),U=P({},s,{anchorOrigin:u,anchorReference:v,elevation:f,marginThreshold:g,externalPaperSlotProps:N,transformOrigin:y,TransitionComponent:S,transitionDuration:C,TransitionProps:V}),A=Jh(U),H=T.useCallback(()=>{if(v==="anchorPosition")return process.env.NODE_ENV!=="production"&&(m||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),m;const te=dn(p),M=te&&te.nodeType===1?te:Oe(O.current).body,le=M.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Ne=M.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Ne.top===0&&Ne.left===0&&Ne.right===0&&Ne.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:le.top+gs(le,u.vertical),left:le.left+bs(le,u.horizontal)}},[p,u.horizontal,u.vertical,m,v]),ee=T.useCallback(te=>({vertical:gs(te,y.vertical),horizontal:bs(te,y.horizontal)}),[y.horizontal,y.vertical]),z=T.useCallback(te=>{const M={width:te.offsetWidth,height:te.offsetHeight},le=ee(M);if(v==="none")return{top:null,left:null,transformOrigin:vs(le)};const Ne=H();let Pe=Ne.top-le.vertical,ke=Ne.left-le.horizontal;const Nt=Pe+M.height,$e=ke+M.width,ot=rr(dn(p)),Le=ot.innerHeight-g,at=ot.innerWidth-g;if(g!==null&&Pe<g){const Te=Pe-g;Pe-=Te,le.vertical+=Te}else if(g!==null&&Nt>Le){const Te=Nt-Le;Pe-=Te,le.vertical+=Te}if(process.env.NODE_ENV!=="production"&&M.height>Le&&M.height&&Le&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${M.height-Le}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),g!==null&&ke<g){const Te=ke-g;ke-=Te,le.horizontal+=Te}else if($e>at){const Te=$e-at;ke-=Te,le.horizontal+=Te}return{top:`${Math.round(Pe)}px`,left:`${Math.round(ke)}px`,transformOrigin:vs(le)}},[p,v,H,ee,g]),[j,L]=T.useState(x),q=T.useCallback(()=>{const te=O.current;if(!te)return;const M=z(te);M.top!==null&&(te.style.top=M.top),M.left!==null&&(te.style.left=M.left),te.style.transformOrigin=M.transformOrigin,L(!0)},[z]);T.useEffect(()=>(D&&window.addEventListener("scroll",q),()=>window.removeEventListener("scroll",q)),[p,D,q]);const W=(te,M)=>{_&&_(te,M),q()},G=()=>{L(!1)};T.useEffect(()=>{x&&q()}),T.useImperativeHandle(c,()=>x?{updatePosition:()=>{q()}}:null,[x,q]),T.useEffect(()=>{if(!x)return;const te=li(()=>{q()}),M=rr(p);return M.addEventListener("resize",te),()=>{te.clear(),M.removeEventListener("resize",te)}},[p,x,q]);let K=C;C==="auto"&&!S.muiSupportAuto&&(K=void 0);const X=h||(p?Oe(dn(p)).body:void 0),J=(o=w==null?void 0:w.root)!=null?o:Zh,Y=(a=w==null?void 0:w.paper)!=null?a:ol,Z=Ft({elementType:Y,externalSlotProps:P({},N,{style:j?N.style:P({},N.style,{opacity:0})}),additionalProps:{elevation:f,ref:I},ownerState:U,className:Ce(A.paper,N==null?void 0:N.className)}),Q=Ft({elementType:J,externalSlotProps:(k==null?void 0:k.root)||{},externalForwardedProps:$,additionalProps:{ref:r,slotProps:{backdrop:{invisible:!0}},container:X,open:x},ownerState:U,className:Ce(A.root,d)}),{slotProps:ie}=Q,F=he(Q,Yh);return l.jsx(J,P({},F,!Ci(J)&&{slotProps:ie,disableScrollLock:D},{children:l.jsx(S,P({appear:!0,in:x,onEntering:W,onExited:G,timeout:K},V,{children:l.jsx(Y,P({},Z,{children:b}))}))}))});process.env.NODE_ENV!=="production"&&(al.propTypes={action:_o,anchorEl:pr(i.oneOfType([pt,i.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=dn(e.anchorEl);if(t&&t.nodeType===1){const r=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&r.top===0&&r.left===0&&r.right===0&&r.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),anchorPosition:i.shape({left:i.number.isRequired,top:i.number.isRequired}),anchorReference:i.oneOf(["anchorEl","anchorPosition","none"]),children:i.node,classes:i.object,className:i.string,container:i.oneOfType([pt,i.func]),disableScrollLock:i.bool,elevation:hi,marginThreshold:i.number,onClose:i.func,open:i.bool.isRequired,PaperProps:i.shape({component:Op}),slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transformOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object});const Qh=al;function eg(e){return nt("MuiMenu",e)}xt("MuiMenu",["root","paper","list"]);const tg=["onEntering"],rg=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],ng={vertical:"top",horizontal:"right"},og={vertical:"top",horizontal:"left"},ag=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"],list:["list"]},eg,t)},sg=Re(Qh,{shouldForwardProp:e=>Ni(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),ig=Re(ol,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),lg=Re(Ch,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),sl=T.forwardRef(function(t,r){var n,o;const a=mt({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:c,className:p,disableAutoFocusItem:u=!1,MenuListProps:m={},onClose:v,open:b,PaperProps:d={},PopoverClasses:h,transitionDuration:f="auto",TransitionProps:{onEntering:g}={},variant:x="selectedMenu",slots:R={},slotProps:w={}}=a,k=he(a.TransitionProps,tg),y=he(a,rg),S=Zr(),C=S.direction==="rtl",_=P({},a,{autoFocus:s,disableAutoFocusItem:u,MenuListProps:m,onEntering:g,PaperProps:d,transitionDuration:f,TransitionProps:k,variant:x}),D=ag(_),V=s&&!u&&b,$=T.useRef(null),N=(z,j)=>{$.current&&$.current.adjustStyleForScrollbar(z,S),g&&g(z,j)},O=z=>{z.key==="Tab"&&(z.preventDefault(),v&&v(z,"tabKeyDown"))};let I=-1;T.Children.map(c,(z,j)=>{T.isValidElement(z)&&(process.env.NODE_ENV!=="production"&&fn.isFragment(z)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),z.props.disabled||(x==="selectedMenu"&&z.props.selected||I===-1)&&(I=j))});const U=(n=R.paper)!=null?n:ig,A=(o=w.paper)!=null?o:d,H=Ft({elementType:R.root,externalSlotProps:w.root,ownerState:_,className:[D.root,p]}),ee=Ft({elementType:U,externalSlotProps:A,ownerState:_,className:D.paper});return l.jsx(sg,P({onClose:v,anchorOrigin:{vertical:"bottom",horizontal:C?"right":"left"},transformOrigin:C?ng:og,slots:{paper:U,root:R.root},slotProps:{root:H,paper:ee},open:b,ref:r,transitionDuration:f,TransitionProps:P({onEntering:N},k),ownerState:_},y,{classes:h,children:l.jsx(lg,P({onKeyDown:O,actions:$,autoFocus:s&&(I===-1||u),autoFocusItem:V,variant:x},m,{className:Ce(D.list,m.className),children:c}))}))});process.env.NODE_ENV!=="production"&&(sl.propTypes={anchorEl:i.oneOfType([pt,i.func]),autoFocus:i.bool,children:i.node,classes:i.object,className:i.string,disableAutoFocusItem:i.bool,MenuListProps:i.object,onClose:i.func,open:i.bool.isRequired,PaperProps:i.object,PopoverClasses:i.object,slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object,variant:i.oneOf(["menu","selectedMenu"])});const cg=sl;function pg({className:e,commandHandler:t,menuDefinition:r,children:n}){var u;const[o,a]=E.useState(void 0),s=E.useCallback(m=>{m.preventDefault(),a(o===void 0?{mouseX:m.clientX+2,mouseY:m.clientY-6}:void 0)},[o]),c=E.useCallback(()=>{a(void 0)},[]),p=E.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((u=r==null?void 0:r.items)==null?void 0:u.length)??0)===0||!n?n:l.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[n,l.jsx(cg,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:c,anchorReference:"anchorPosition",anchorPosition:p,children:l.jsx(Qo,{menuDefinition:r,commandHandler:t,onClick:c})})]})}function dg(e){return{preserveValue:!0,...e}}const xn=(e,t,r={})=>{const n=E.useRef(t);n.current=t;const o=E.useRef(r);o.current=dg(o.current);const[a,s]=E.useState(()=>n.current),[c,p]=E.useState(!0);return E.useEffect(()=>{let u=!0;return p(!!e),(async()=>{if(e){const m=await e();u&&(s(()=>m),p(!1))}})(),()=>{u=!1,o.current.preserveValue||s(()=>n.current)}},[e]),[a,c]},ug=Ti(l.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function il({menuProvider:e,normalMenu:t,fullMenu:r,commandHandler:n,containerRef:o,className:a,ariaLabelPrefix:s,children:c}){const[p,u]=E.useState(!1),[m,v]=E.useState(!1),b=E.useCallback(()=>{p&&u(!1),v(!1)},[p]),d=E.useCallback(k=>{k.stopPropagation(),u(y=>{const S=!y;return S&&k.shiftKey?v(!0):S||v(!1),S})},[]),h=E.useCallback(k=>(b(),n(k)),[n,b]),[f,g]=E.useState({top:1,left:1});E.useEffect(()=>{if(p){const k=o==null?void 0:o.current;if(k){const y=k.getBoundingClientRect(),S=window.scrollY,C=window.scrollX,_=y.top+S+k.clientHeight,D=y.left+C;g({top:_,left:D})}}},[p,o]);const[x]=xn(E.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,p]),t),[R]=xn(E.useCallback(async()=>(e==null?void 0:e(!0))??r??x,[e,r,x,p]),r??x),w=m&&R?R:x;return l.jsxs(l.Fragment,{children:[l.jsx(Se.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:d,children:c??l.jsx(ug,{})}),l.jsx(Se.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:p,onClose:b,PaperProps:{className:"papi-menu-drawer-paper",style:{top:f.top,left:f.left}},children:w?l.jsx(Ki,{className:a,id:`${s??""} main menu`,commandHandler:h,multiColumnMenu:w}):void 0})]})}function fg({id:e,label:t,isDisabled:r=!1,tooltip:n,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:s="medium",className:c,onClick:p,children:u}){return l.jsx(Se.IconButton,{id:e,disabled:r,edge:a,size:s,"aria-label":t,title:o?void 0:n??t,className:`papi-icon-button ${c??""}`,onClick:p,children:u})}const yt="scrBook",mg="scrRef",Ot="source",hg="details",gg="Scripture Reference",bg="Scripture Book",ll="Type",vg="Details";function yg(e,t){const r=t??!1;return[{accessorFn:n=>`${me.bookNumberToId(n.start.bookNum)} ${n.start.chapterNum}:${n.start.verseNum}`,id:yt,header:(e==null?void 0:e.scriptureReferenceColumnName)??gg,cell:n=>{const o=n.row.original;return n.row.getIsGrouped()?me.bookNumberToEnglishName(o.start.bookNum):n.row.groupingColumnId===yt?re.formatScrRef(o.start):void 0},getGroupingValue:n=>n.start.bookNum,sortingFn:(n,o)=>re.compareScrRefs(n.original.start,o.original.start),enableGrouping:!0},{accessorFn:n=>re.formatScrRef(n.start),id:mg,header:void 0,cell:n=>{const o=n.row.original;return n.row.getIsGrouped()?void 0:re.formatScrRef(o.start)},sortingFn:(n,o)=>re.compareScrRefs(n.original.start,o.original.start),enableGrouping:!1},{accessorFn:n=>n.source.displayName,id:Ot,header:r?(e==null?void 0:e.typeColumnName)??ll:void 0,cell:n=>r||n.row.getIsGrouped()?n.getValue():void 0,getGroupingValue:n=>n.source.id,sortingFn:(n,o)=>n.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:n=>n.detail,id:hg,header:(e==null?void 0:e.detailsColumnName)??vg,cell:n=>n.getValue(),enableGrouping:!1}]}function wg({sources:e,showColumnHeaders:t=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:n,scriptureBookGroupName:o,typeColumnName:a,detailsColumnName:s,onRowSelected:c,direction:p="ltr"}){const[u,m]=E.useState([]),[v,b]=E.useState([{id:yt,desc:!1}]),[d,h]=E.useState(()=>e.flatMap(N=>{const O=N.source;return N.data.map(I=>({...I,source:O}))})),[f,g]=E.useState({});E.useEffect(()=>{h(()=>e.flatMap(N=>{const O=N.source;return N.data.map(I=>({...I,source:O}))}))},[e]);const x=E.useMemo(()=>yg({scriptureReferenceColumnName:n,typeColumnName:a,detailsColumnName:s},r),[n,a,s,r]);E.useEffect(()=>{u.includes(Ot)?b([{id:Ot,desc:!1},{id:yt,desc:!1}]):b([{id:yt,desc:!1}])},[u]);const R=E.useCallback((N,O)=>!O||re.compareScrRefs(N,O)===0?`${re.scrRefToBBBCCCVVV(N)}`:`${re.scrRefToBBBCCCVVV(N)}-${re.scrRefToBBBCCCVVV(O)}`,[]),w=E.useCallback(N=>`${R(N.start,N.end)} ${N.source} ${N.detail}`,[R]),k=je.useReactTable({data:d,columns:x,state:{grouping:u,sorting:v,rowSelection:f},onGroupingChange:m,onSortingChange:b,onRowSelectionChange:g,getExpandedRowModel:je.getExpandedRowModel(),getGroupedRowModel:je.getGroupedRowModel(),getCoreRowModel:je.getCoreRowModel(),getSortedRowModel:je.getSortedRowModel(),getRowId:w,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});E.useEffect(()=>{if(c){const N=k.getSelectedRowModel().rowsById,O=Object.keys(N);if(O.length===1){const I=d.find(U=>w(U)===O[0])||void 0;I&&c(I)}}},[f,d,w,c,k]);const y=o??bg,S=a??ll,C=[{label:"No Grouping",value:[]},{label:`Group by ${y}`,value:[yt]},{label:`Group by ${S}`,value:[Ot]},{label:`Group by ${y} and ${S}`,value:[yt,Ot]},{label:`Group by ${S} and ${y}`,value:[Ot,yt]}],_=N=>{m(JSON.parse(N))},D=(N,O)=>{!N.getIsGrouped()&&!N.getIsSelected()&&N.getToggleSelectedHandler()(O)},V=(N,O)=>N.getIsGrouped()?"":B("banded-row",O%2===0?"even":"odd"),$=(N,O,I)=>{if(!((N==null?void 0:N.length)===0||O.depth<I.column.getGroupedIndex())){if(O.getIsGrouped())switch(O.depth){case 1:return"pr-ps-4";default:return}switch(O.depth){case 1:return"pr-ps-8";case 2:return"pr-ps-12";default:return}}};return l.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-w-full pr-flex-col",children:[!t&&l.jsxs(Zt,{value:JSON.stringify(u),onValueChange:N=>{_(N)},children:[l.jsx(Mt,{className:"pr-mb-1 pr-mt-2",children:l.jsx(Qt,{})}),l.jsx(Dt,{position:"item-aligned",children:l.jsx(Fs,{children:C.map(N=>l.jsx(Ge,{value:JSON.stringify(N.value),children:N.label},N.label))})})]}),l.jsxs(Ur,{className:"pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0",children:[t&&l.jsx(Gr,{children:k.getHeaderGroups().map(N=>l.jsx(lt,{children:N.headers.filter(O=>O.column.columnDef.header).map(O=>l.jsx(er,{colSpan:O.colSpan,className:"top-0 pr-sticky",children:O.isPlaceholder?void 0:l.jsxs("div",{children:[O.column.getCanGroup()?l.jsx(ve,{variant:"ghost",title:`Toggle grouping by ${O.column.columnDef.header}`,onClick:O.column.getToggleGroupingHandler(),type:"button",children:O.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",je.flexRender(O.column.columnDef.header,O.getContext())]})},O.id))},N.id))}),l.jsx(Hr,{children:k.getRowModel().rows.map((N,O)=>l.jsx(lt,{"data-state":N.getIsSelected()?"selected":"",className:B(V(N,O)),onClick:I=>D(N,I),children:N.getVisibleCells().map(I=>{if(!(I.getIsPlaceholder()||I.column.columnDef.enableGrouping&&!I.getIsGrouped()&&(I.column.columnDef.id!==Ot||!r)))return l.jsx(At,{className:B(I.column.columnDef.id,"pr-p-[1px]",$(u,N,I)),children:(()=>I.getIsGrouped()?l.jsxs(ve,{variant:"link",onClick:N.getToggleExpandedHandler(),type:"button",children:[N.getIsExpanded()&&l.jsx(oe.ChevronDown,{}),!N.getIsExpanded()&&(p==="ltr"?l.jsx(oe.ChevronRight,{}):l.jsx(oe.ChevronLeft,{}))," ",je.flexRender(I.column.columnDef.cell,I.getContext())," (",N.subRows.length,")"]}):je.flexRender(I.column.columnDef.cell,I.getContext()))()},I.id)})},N.id))})]})]})}function cl({onSearch:e,placeholder:t,isFullWidth:r}){const[n,o]=E.useState(""),a=s=>{o(s),e(s)};return l.jsx(ir,{className:B("pr-flex pr-h-10 pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-[color:hsl(240,5%,64.9%)] focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",{"pr-w-full":r}),placeholder:t,value:n,onChange:s=>a(s.target.value)})}function xg({id:e,isDisabled:t=!1,orientation:r="horizontal",min:n=0,max:o=100,step:a=1,showMarks:s=!1,defaultValue:c,value:p,valueLabelDisplay:u="off",className:m,onChange:v,onChangeCommitted:b}){return l.jsx(Se.Slider,{id:e,disabled:t,orientation:r,min:n,max:o,step:a,marks:s,defaultValue:c,value:p,valueLabelDisplay:u,className:`papi-slider ${r} ${m??""}`,onChange:v,onChangeCommitted:b})}function kg({autoHideDuration:e=void 0,id:t,isOpen:r=!1,className:n,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:s,children:c}){const p={action:(s==null?void 0:s.action)||c,message:s==null?void 0:s.message,className:n};return l.jsx(Se.Snackbar,{autoHideDuration:e??void 0,open:r,onClose:o,anchorOrigin:a,id:t,ContentProps:p})}const ea=E.forwardRef(({className:e,...t},r)=>l.jsx(Ae.Root,{orientation:"vertical",ref:r,className:B("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));ea.displayName=Ae.List.displayName;const ta=E.forwardRef(({className:e,...t},r)=>l.jsx(Ae.List,{ref:r,className:B("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));ta.displayName=Ae.List.displayName;const pl=E.forwardRef(({className:e,...t},r)=>l.jsx(Ae.Trigger,{ref:r,...t,className:B("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),ra=E.forwardRef(({className:e,...t},r)=>l.jsx(Ae.Content,{ref:r,className:B("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));ra.displayName=Ae.Content.displayName;function Eg({tabList:e,onSearch:t,searchPlaceholder:r,headerTitle:n,isSearchBarFullWidth:o=!1}){return l.jsxs("div",{className:"pr-twp",children:[l.jsxs("div",{className:"pr-sticky pr-top-0 pr-space-y-2 pr-pb-2",children:[n?l.jsx("h1",{children:n}):"",l.jsx(cl,{isFullWidth:o,onSearch:t,placeholder:r})]}),l.jsxs(ea,{children:[l.jsx(ta,{children:e.map(a=>l.jsx(pl,{value:a.value,children:a.value},a.key))}),e.map(a=>l.jsx(ra,{value:a.value,children:a.content},a.key))]})]})}const na=E.forwardRef(({className:e,orientation:t="horizontal",decorative:r=!0,...n},o)=>l.jsx(js.Root,{ref:o,decorative:r,orientation:t,className:B("pr-twp pr-shrink-0 pr-bg-border",t==="horizontal"?"pr-h-[1px] pr-w-full":"pr-h-full pr-w-[1px]",e),...n}));na.displayName=js.Root.displayName;function Ng({children:e}){return l.jsx("div",{className:"pr-twp pr-grid",children:e})}function Tg({primary:e,secondary:t,children:r,isLoading:n=!1,loadingMessage:o}){return l.jsxs("div",{className:"pr-flex pr-items-center pr-justify-between pr-space-x-4 pr-py-2",children:[l.jsxs("div",{children:[l.jsx("p",{className:"pr-text-sm pr-font-medium pr-leading-none",children:e}),l.jsx("p",{className:"pr-whitespace-normal pr-break-words pr-text-sm pr-text-muted-foreground",children:t})]}),n?l.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:o}):l.jsx("div",{children:r})]})}function Sg({primary:e,secondary:t,includeSeparator:r=!1}){return l.jsxs("div",{className:"pr-space-y-4 pr-py-2",children:[l.jsxs("div",{children:[l.jsx("h3",{className:"pr-text-lg pr-font-medium",children:e}),l.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:t})]}),r?l.jsx(na,{}):""]})}const dr=E.forwardRef(({className:e,...t},r)=>l.jsx(oe.LoaderCircle,{size:35,className:B("pr-animate-spin",e),...t,ref:r}));dr.displayName="Spinner";function Cg({id:e,isChecked:t,isDisabled:r=!1,hasError:n=!1,className:o,onChange:a}){return l.jsx(Se.Switch,{id:e,checked:t,disabled:r,className:`papi-switch ${n?"error":""} ${o??""}`,onChange:a})}function jg({id:e,isDisabled:t=!1,hasError:r=!1,isFullWidth:n=!1,helperText:o,label:a,placeholder:s,isRequired:c=!1,className:p,defaultValue:u,value:m,onChange:v,onFocus:b,onBlur:d}){return l.jsxs("div",{className:B("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":n}),children:[l.jsx(Mr,{htmlFor:e,className:B({"pr-text-red-600":r,"pr-hidden":!a}),children:`${a}${c?"*":""}`}),l.jsx(ir,{id:e,disabled:t,placeholder:s,required:c,className:B(p,{"pr-border-red-600":r}),defaultValue:u,value:m,onChange:v,onFocus:b,onBlur:d}),l.jsx("p",{className:B({"pr-hidden":!o}),children:o})]})}function Og({menuProvider:e,commandHandler:t,className:r,id:n,children:o}){const a=E.useRef(void 0);return l.jsx("div",{ref:a,style:{position:"relative"},children:l.jsx(Se.AppBar,{position:"static",id:n,children:l.jsxs(Se.Toolbar,{className:`papi-toolbar ${r??""}`,variant:"dense",children:[e?l.jsx(il,{commandHandler:t,containerRef:a,menuProvider:e}):void 0,o?l.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Rg=Ae.Root,dl=E.forwardRef(({className:e,...t},r)=>l.jsx(Ae.List,{ref:r,className:B("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));dl.displayName=Ae.List.displayName;const ul=E.forwardRef(({className:e,...t},r)=>l.jsx(Ae.Trigger,{ref:r,className:B("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));ul.displayName=Ae.Trigger.displayName;const fl=E.forwardRef(({className:e,...t},r)=>l.jsx(Ae.Content,{ref:r,className:B("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));fl.displayName=Ae.Content.displayName;function Pg({isInstalling:e,handleClick:t,buttonText:r,className:n,...o}){return l.jsx(ve,{className:B("pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e,"pr-bg-blue-600":!e,"pr-bg-white pr-text-blue-600 hover:pr-text-white":!r,"pr-w-20":r},n),onClick:t,...o,children:e?l.jsx(dr,{size:15}):l.jsxs(l.Fragment,{children:[l.jsx(oe.Download,{size:25,className:B("pr-h-4 pr-w-4",{"pr-mr-1":r})}),r]})})}function $g({isEnabling:e,handleClick:t,className:r,...n}){return l.jsx(ve,{className:B("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e},r),onClick:t,...n,children:e?l.jsxs(l.Fragment,{children:[l.jsx(dr,{size:15,className:"pr-mr-1 pr-text-white"}),"Enabling..."]}):"Enable"})}function Ig({isDisabling:e,handleClick:t,className:r,...n}){return l.jsx(ve,{className:B("pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-gray-400",{"pr-cursor-not-allowed pr-bg-gray-400":e},r),onClick:t,...n,children:e?l.jsxs(l.Fragment,{children:[l.jsx(dr,{size:15,className:"pr-mr-1 pr-text-black"}),"Disabling..."]}):"Disable"})}function _g({isUpdating:e,handleClick:t,className:r,...n}){return l.jsx(ve,{className:B("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700 hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e},r),onClick:t,...n,children:e?l.jsxs(l.Fragment,{children:[l.jsx(dr,{size:15,className:"pr-mr-1 pr-text-white"}),"Updating..."]}):"Update"})}function $t(){return $t=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},$t.apply(this,arguments)}const Mg=["children","options"],ys=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,t)=>(e[t.toLowerCase()]=t,e),{for:"htmlFor"}),ws={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},Dg=["style","script"],Ag=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,Lg=/mailto:/i,Bg=/\n{2,}$/,ml=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,Fg=/^ *> ?/gm,Vg=/^ {2,}\n/,zg=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,hl=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,gl=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,Ug=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,Gg=/^(?:\n *)*\n/,Hg=/\r\n?/g,qg=/^\[\^([^\]]+)](:.*)\n/,Wg=/^\[\^([^\]]+)]/,Xg=/\f/g,Kg=/^\s*?\[(x|\s)\]/,bl=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,vl=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,yl=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,xo=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,Yg=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,wl=/^<!--[\s\S]*?(?:-->)/,Jg=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,ko=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,Zg=/^\{.*\}$/,Qg=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,eb=/^<([^ >]+@[^ >]+)>/,tb=/^<([^ >]+:\/[^ >]+)>/,rb=/-([a-z])?/gi,xl=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,nb=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,ob=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,ab=/^\[([^\]]*)\] ?\[([^\]]*)\]/,sb=/(\[|\])/g,ib=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,lb=/\t/g,cb=/^ *\| */,pb=/(^ *\||\| *$)/g,db=/ *$/,ub=/^ *:-+: *$/,fb=/^ *:-+ *$/,mb=/^ *-+: *$/,hb=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,gb=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,bb=/^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,vb=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,yb=/^\\([^0-9A-Za-z\s])/,wb=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,xb=/^\n+/,kb=/^([ \t]*)/,Eb=/\\([^\\])/g,xs=/ *\n+$/,Nb=/(?:^|\n)( *)$/,oa="(?:\\d+\\.)",aa="(?:[*+-])";function kl(e){return"( *)("+(e===1?oa:aa)+") +"}const El=kl(1),Nl=kl(2);function Tl(e){return new RegExp("^"+(e===1?El:Nl))}const Tb=Tl(1),Sb=Tl(2);function Sl(e){return new RegExp("^"+(e===1?El:Nl)+"[^\\n]*(?:\\n(?!\\1"+(e===1?oa:aa)+" )[^\\n]*)*(\\n|$)","gm")}const Cl=Sl(1),jl=Sl(2);function Ol(e){const t=e===1?oa:aa;return new RegExp("^( *)("+t+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+t+" (?!"+t+" ))\\n*|\\s*\\n*$)")}const Rl=Ol(1),Pl=Ol(2);function ks(e,t){const r=t===1,n=r?Rl:Pl,o=r?Cl:jl,a=r?Tb:Sb;return{t(s,c,p){const u=Nb.exec(p);return u&&(c.o||!c._&&!c.u)?n.exec(s=u[1]+s):null},i:se.HIGH,l(s,c,p){const u=r?+s[2]:void 0,m=s[0].replace(Bg,`
`).match(o);let v=!1;return{p:m.map(function(b,d){const h=a.exec(b)[0].length,f=new RegExp("^ {1,"+h+"}","gm"),g=b.replace(f,"").replace(a,""),x=d===m.length-1,R=g.indexOf(`

`)!==-1||x&&v;v=R;const w=p._,k=p.o;let y;p.o=!0,R?(p._=!1,y=g.replace(xs,`

`)):(p._=!0,y=g.replace(xs,""));const S=c(y,p);return p._=w,p.o=k,S}),m:r,g:u}},h:(s,c,p)=>e(s.m?"ol":"ul",{key:p.k,start:s.g},s.p.map(function(u,m){return e("li",{key:m},c(u,p))}))}}const Cb=/^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,jb=/^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,$l=[ml,hl,gl,bl,yl,vl,wl,xl,Cl,Rl,jl,Pl],Ob=[...$l,/^[^\n]+(?:  \n|\n{2,})/,xo,ko];function Rb(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function Pb(e){return mb.test(e)?"right":ub.test(e)?"center":fb.test(e)?"left":null}function Es(e,t,r){const n=r.$;r.$=!0;const o=t(e.trim(),r);r.$=n;let a=[[]];return o.forEach(function(s,c){s.type==="tableSeparator"?c!==0&&c!==o.length-1&&a.push([]):(s.type!=="text"||o[c+1]!=null&&o[c+1].type!=="tableSeparator"||(s.v=s.v.replace(db,"")),a[a.length-1].push(s))}),a}function $b(e,t,r){r._=!0;const n=Es(e[1],t,r),o=e[2].replace(pb,"").split("|").map(Pb),a=function(s,c,p){return s.trim().split(`
`).map(function(u){return Es(u,c,p)})}(e[3],t,r);return r._=!1,{S:o,A:a,L:n,type:"table"}}function Ns(e,t){return e.S[t]==null?{}:{textAlign:e.S[t]}}function bt(e){return function(t,r){return r._?e.exec(t):null}}function vt(e){return function(t,r){return r._||r.u?e.exec(t):null}}function it(e){return function(t,r){return r._||r.u?null:e.exec(t)}}function Er(e){return function(t){return e.exec(t)}}function Ib(e,t,r){if(t._||t.u||r&&!r.endsWith(`
`))return null;let n="";e.split(`
`).every(a=>!$l.some(s=>s.test(a))&&(n+=a+`
`,a.trim()));const o=n.trimEnd();return o==""?null:[n,o]}function Kt(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch{return null}return e}function Ts(e){return e.replace(Eb,"$1")}function un(e,t,r){const n=r._||!1,o=r.u||!1;r._=!0,r.u=!0;const a=e(t,r);return r._=n,r.u=o,a}function _b(e,t,r){const n=r._||!1,o=r.u||!1;r._=!1,r.u=!0;const a=e(t,r);return r._=n,r.u=o,a}function Mb(e,t,r){return r._=!1,e(t,r)}const to=(e,t,r)=>({v:un(t,e[1],r)});function ro(){return{}}function no(){return null}function Db(...e){return e.filter(Boolean).join(" ")}function oo(e,t,r){let n=e;const o=t.split(".");for(;o.length&&(n=n[o[0]],n!==void 0);)o.shift();return n||r}var se;function Ab(e,t={}){t.overrides=t.overrides||{},t.slugify=t.slugify||Rb,t.namedCodesToUnicode=t.namedCodesToUnicode?$t({},ws,t.namedCodesToUnicode):ws;const r=t.createElement||T.createElement;function n(d,h,...f){const g=oo(t.overrides,`${d}.props`,{});return r(function(x,R){const w=oo(R,x);return w?typeof w=="function"||typeof w=="object"&&"render"in w?w:oo(R,`${x}.component`,x):x}(d,t.overrides),$t({},h,g,{className:Db(h==null?void 0:h.className,g.className)||void 0}),...f)}function o(d){let h=!1;t.forceInline?h=!0:t.forceBlock||(h=ib.test(d)===!1);const f=m(u(h?d:`${d.trimEnd().replace(xb,"")}

`,{_:h}));for(;typeof f[f.length-1]=="string"&&!f[f.length-1].trim();)f.pop();if(t.wrapper===null)return f;const g=t.wrapper||(h?"span":"div");let x;if(f.length>1||t.forceWrapper)x=f;else{if(f.length===1)return x=f[0],typeof x=="string"?n("span",{key:"outer"},x):x;x=null}return T.createElement(g,{key:"outer"},x)}function a(d){const h=d.match(Ag);return h?h.reduce(function(f,g,x){const R=g.indexOf("=");if(R!==-1){const w=function(C){return C.indexOf("-")!==-1&&C.match(Jg)===null&&(C=C.replace(rb,function(_,D){return D.toUpperCase()})),C}(g.slice(0,R)).trim(),k=function(C){const _=C[0];return(_==='"'||_==="'")&&C.length>=2&&C[C.length-1]===_?C.slice(1,-1):C}(g.slice(R+1).trim()),y=ys[w]||w,S=f[y]=function(C,_){return C==="style"?_.split(/;\s?/).reduce(function(D,V){const $=V.slice(0,V.indexOf(":"));return D[$.replace(/(-[a-z])/g,N=>N[1].toUpperCase())]=V.slice($.length+1).trim(),D},{}):C==="href"?Kt(_):(_.match(Zg)&&(_=_.slice(1,_.length-1)),_==="true"||_!=="false"&&_)}(w,k);typeof S=="string"&&(xo.test(S)||ko.test(S))&&(f[y]=T.cloneElement(o(S.trim()),{key:x}))}else g!=="style"&&(f[ys[g]||g]=!0);return f},{}):null}const s=[],c={},p={blockQuote:{t:it(ml),i:se.HIGH,l:(d,h,f)=>({v:h(d[0].replace(Fg,""),f)}),h:(d,h,f)=>n("blockquote",{key:f.k},h(d.v,f))},breakLine:{t:Er(Vg),i:se.HIGH,l:ro,h:(d,h,f)=>n("br",{key:f.k})},breakThematic:{t:it(zg),i:se.HIGH,l:ro,h:(d,h,f)=>n("hr",{key:f.k})},codeBlock:{t:it(gl),i:se.MAX,l:d=>({v:d[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),M:void 0}),h:(d,h,f)=>n("pre",{key:f.k},n("code",$t({},d.O,{className:d.M?`lang-${d.M}`:""}),d.v))},codeFenced:{t:it(hl),i:se.MAX,l:d=>({O:a(d[3]||""),v:d[4],M:d[2]||void 0,type:"codeBlock"})},codeInline:{t:vt(Ug),i:se.LOW,l:d=>({v:d[2]}),h:(d,h,f)=>n("code",{key:f.k},d.v)},footnote:{t:it(qg),i:se.MAX,l:d=>(s.push({I:d[2],j:d[1]}),{}),h:no},footnoteReference:{t:bt(Wg),i:se.HIGH,l:d=>({v:d[1],B:`#${t.slugify(d[1])}`}),h:(d,h,f)=>n("a",{key:f.k,href:Kt(d.B)},n("sup",{key:f.k},d.v))},gfmTask:{t:bt(Kg),i:se.HIGH,l:d=>({R:d[1].toLowerCase()==="x"}),h:(d,h,f)=>n("input",{checked:d.R,key:f.k,readOnly:!0,type:"checkbox"})},heading:{t:it(t.enforceAtxHeadings?vl:bl),i:se.HIGH,l:(d,h,f)=>({v:un(h,d[2],f),T:t.slugify(d[2]),C:d[1].length}),h:(d,h,f)=>n(`h${d.C}`,{id:d.T,key:f.k},h(d.v,f))},headingSetext:{t:it(yl),i:se.MAX,l:(d,h,f)=>({v:un(h,d[1],f),C:d[2]==="="?1:2,type:"heading"})},htmlComment:{t:Er(wl),i:se.HIGH,l:()=>({}),h:no},image:{t:vt(jb),i:se.HIGH,l:d=>({D:d[1],B:Ts(d[2]),F:d[3]}),h:(d,h,f)=>n("img",{key:f.k,alt:d.D||void 0,title:d.F||void 0,src:Kt(d.B)})},link:{t:bt(Cb),i:se.LOW,l:(d,h,f)=>({v:_b(h,d[1],f),B:Ts(d[2]),F:d[3]}),h:(d,h,f)=>n("a",{key:f.k,href:Kt(d.B),title:d.F},h(d.v,f))},linkAngleBraceStyleDetector:{t:bt(tb),i:se.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],type:"link"})},linkBareUrlDetector:{t:(d,h)=>h.N?null:bt(Qg)(d,h),i:se.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],F:void 0,type:"link"})},linkMailtoDetector:{t:bt(eb),i:se.MAX,l(d){let h=d[1],f=d[1];return Lg.test(f)||(f="mailto:"+f),{v:[{v:h.replace("mailto:",""),type:"text"}],B:f,type:"link"}}},orderedList:ks(n,1),unorderedList:ks(n,2),newlineCoalescer:{t:it(Gg),i:se.LOW,l:ro,h:()=>`
`},paragraph:{t:Ib,i:se.LOW,l:to,h:(d,h,f)=>n("p",{key:f.k},h(d.v,f))},ref:{t:bt(nb),i:se.MAX,l:d=>(c[d[1]]={B:d[2],F:d[4]},{}),h:no},refImage:{t:vt(ob),i:se.MAX,l:d=>({D:d[1]||void 0,P:d[2]}),h:(d,h,f)=>n("img",{key:f.k,alt:d.D,src:Kt(c[d.P].B),title:c[d.P].F})},refLink:{t:bt(ab),i:se.MAX,l:(d,h,f)=>({v:h(d[1],f),Z:h(d[0].replace(sb,"\\$1"),f),P:d[2]}),h:(d,h,f)=>c[d.P]?n("a",{key:f.k,href:Kt(c[d.P].B),title:c[d.P].F},h(d.v,f)):n("span",{key:f.k},h(d.Z,f))},table:{t:it(xl),i:se.HIGH,l:$b,h:(d,h,f)=>n("table",{key:f.k},n("thead",null,n("tr",null,d.L.map(function(g,x){return n("th",{key:x,style:Ns(d,x)},h(g,f))}))),n("tbody",null,d.A.map(function(g,x){return n("tr",{key:x},g.map(function(R,w){return n("td",{key:w,style:Ns(d,w)},h(R,f))}))})))},tableSeparator:{t:function(d,h){return h.$?(h._=!0,cb.exec(d)):null},i:se.HIGH,l:function(){return{type:"tableSeparator"}},h:()=>" | "},text:{t:Er(wb),i:se.MIN,l:d=>({v:d[0].replace(Yg,(h,f)=>t.namedCodesToUnicode[f]?t.namedCodesToUnicode[f]:h)}),h:d=>d.v},textBolded:{t:vt(hb),i:se.MED,l:(d,h,f)=>({v:h(d[2],f)}),h:(d,h,f)=>n("strong",{key:f.k},h(d.v,f))},textEmphasized:{t:vt(gb),i:se.LOW,l:(d,h,f)=>({v:h(d[2],f)}),h:(d,h,f)=>n("em",{key:f.k},h(d.v,f))},textEscaped:{t:vt(yb),i:se.HIGH,l:d=>({v:d[1],type:"text"})},textMarked:{t:vt(bb),i:se.LOW,l:to,h:(d,h,f)=>n("mark",{key:f.k},h(d.v,f))},textStrikethroughed:{t:vt(vb),i:se.LOW,l:to,h:(d,h,f)=>n("del",{key:f.k},h(d.v,f))}};t.disableParsingRawHTML!==!0&&(p.htmlBlock={t:Er(xo),i:se.HIGH,l(d,h,f){const[,g]=d[3].match(kb),x=new RegExp(`^${g}`,"gm"),R=d[3].replace(x,""),w=(k=R,Ob.some(_=>_.test(k))?Mb:un);var k;const y=d[1].toLowerCase(),S=Dg.indexOf(y)!==-1;f.N=f.N||y==="a";const C=S?d[3]:w(h,R,f);return f.N=!1,{O:a(d[2]),v:C,G:S,H:S?y:d[1]}},h:(d,h,f)=>n(d.H,$t({key:f.k},d.O),d.G?d.v:h(d.v,f))},p.htmlSelfClosing={t:Er(ko),i:se.HIGH,l:d=>({O:a(d[2]||""),H:d[1]}),h:(d,h,f)=>n(d.H,$t({},d.O,{key:f.k}))});const u=function(d){let h=Object.keys(d);function f(g,x){let R=[],w="";for(;g;){let k=0;for(;k<h.length;){const y=h[k],S=d[y],C=S.t(g,x,w);if(C){const _=C[0];g=g.substring(_.length);const D=S.l(C,f,x);D.type==null&&(D.type=y),R.push(D),w=_;break}k++}}return R}return h.sort(function(g,x){let R=d[g].i,w=d[x].i;return R!==w?R-w:g<x?-1:1}),function(g,x){return f(function(R){return R.replace(Hg,`
`).replace(Xg,"").replace(lb,"    ")}(g),x)}}(p),m=(v=function(d){return function(h,f,g){return d[h.type].h(h,f,g)}}(p),function d(h,f={}){if(Array.isArray(h)){const g=f.k,x=[];let R=!1;for(let w=0;w<h.length;w++){f.k=w;const k=d(h[w],f),y=typeof k=="string";y&&R?x[x.length-1]+=k:k!==null&&x.push(k),R=y}return f.k=g,x}return v(h,d,f)});var v;const b=o(e);return s.length?n("div",null,b,n("footer",{key:"footer"},s.map(function(d){return n("div",{id:t.slugify(d.j),key:d.j},d.j,m(u(d.I,{_:!0})))}))):b}(function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"})(se||(se={}));const Lb=e=>{let{children:t,options:r}=e,n=function(o,a){if(o==null)return{};var s,c,p={},u=Object.keys(o);for(c=0;c<u.length;c++)a.indexOf(s=u[c])>=0||(p[s]=o[s]);return p}(e,Mg);return T.cloneElement(Ab(t,r),n)};function Bb({id:e,markdown:t}){return l.jsx("div",{id:e,className:"pr-prose",children:l.jsx(Lb,{children:t})})}const Il=E.forwardRef((e,t)=>l.jsxs(ve,{ref:t,className:"pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600",...e,children:[l.jsx(oe.Filter,{size:16,className:"pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"}),"Filter",l.jsx(oe.ChevronDown,{size:16,className:"pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"})]}));var _l=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(_l||{});function Fb({id:e,groups:t}){return l.jsx("div",{id:e,children:l.jsxs(kn,{children:[l.jsx(Co,{asChild:!0,children:l.jsx(Il,{})}),l.jsx(Vr,{children:t.map(r=>l.jsxs("div",{children:[l.jsx(cr,{children:r.label}),l.jsx(Ms,{children:r.items.map(n=>l.jsx("div",{children:n.itemType===0?l.jsx(En,{onClick:n.onClick,children:n.label}):l.jsx(Oo,{onClick:n.onClick,value:n.label,children:n.label})},n.label))}),l.jsx(zr,{})]},r.label))})]})})}function Vb({id:e,message:t}){return l.jsx("div",{id:e,className:"pr-mb-20 pr-mt-20 pr-flex pr-items-center pr-justify-center",children:l.jsx("div",{className:"pr-w-3/4 pr-rounded-lg pr-bg-gray-100 pr-p-8 pr-text-center",children:l.jsx("p",{className:"pr-text-lg pr-text-gray-800",children:t})})})}function zb({id:e,category:t,downloads:r,languages:n,moreInfoUrl:o}){const a=new re.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((c,p)=>c+p,0)),s=()=>{window.scrollTo(0,document.body.scrollHeight)};return l.jsxs("div",{id:e,className:"pr-flex pr-flex-wrap pr-items-start pr-space-x-4 pr-border-b pr-border-t pr-bg-white pr-pb-4 pr-pt-4",children:[l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsx("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:l.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:t})}),l.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"CATEGORY"})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsxs("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:[l.jsx(oe.User,{className:"pr-mr-1 pr-h-4 pr-w-4"}),l.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:a})]}),l.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"USERS"})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsx("div",{className:"pr-flex pr-items-center",children:n.slice(0,3).map(c=>l.jsx("span",{className:"pr-ml-1 pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1 pr-text-xs pr-font-semibold pr-text-gray-700",children:c.toUpperCase()},c))}),n.length>3&&l.jsxs("button",{type:"button",onClick:()=>s(),className:"pr-text-xs pr-text-gray-500 pr-underline",children:["+",n.length-3," more languages"]})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-ml-auto pr-flex pr-flex-col pr-space-y-2",children:[l.jsxs("a",{href:o,target:"_blank",rel:"noreferrer",className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Website",l.jsx(oe.Link,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]}),l.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Support",l.jsx(oe.CircleHelp,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]})]})]})}function Ml({id:e,versionHistory:t}){const[r,n]=E.useState(!1),o=new Date;function a(c){const p=new Date(c),u=new Date(o.getTime()-p.getTime()),m=u.getUTCFullYear()-1970,v=u.getUTCMonth(),b=u.getUTCDate()-1;let d="";return m>0?d=`${m.toString()} year${m===1?"":"s"} ago`:v>0?d=`${v.toString()} month${v===1?"":"s"} ago`:b===0?d="today":d=`${b.toString()} day${b===1?"":"s"} ago`,d}const s=Object.entries(t).sort((c,p)=>p[0].localeCompare(c[0]));return l.jsxs("div",{id:e,children:[l.jsx("h3",{className:"pr-text-md pr-font-semibold",children:"What`s New"}),l.jsx("ul",{className:"pr-list-disc pr-pl-5 pr-pr-4 pr-text-xs pr-text-gray-600",children:(r?s:s.slice(0,5)).map(c=>l.jsxs("div",{className:"pr-mt-3 pr-flex pr-justify-between",children:[l.jsx("div",{className:"pr-text-gray-600",children:l.jsx("li",{className:"pr-prose pr-text-xs",children:l.jsx("span",{children:c[1].description})})}),l.jsxs("div",{className:"pr-justify-end pr-text-right",children:[l.jsxs("div",{children:["Version ",c[0]]}),l.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),s.length>5&&l.jsx("button",{type:"button",onClick:()=>n(!r),className:"pr-text-xs pr-text-gray-500 pr-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Ub({id:e,publisherDisplayName:t,fileSize:r,locales:n,versionHistory:o}){const a=E.useMemo(()=>re.formatBytes(r),[r]),c=(p=>{const u=new Intl.DisplayNames(navigator.language,{type:"language"});return p.map(m=>u.of(m))})(n);return l.jsx("div",{id:e,className:"pr-border-t pr-pb-4 pr-pt-4",children:l.jsxs("div",{className:"pr-md:flex-row pr-md:space-x-8 pr-flex pr-flex-col pr-space-x-0",children:[l.jsx(Ml,{versionHistory:o}),l.jsx("div",{className:"pr-md:border-t-0 pr-md:border-l pr-md-h-auto pr-md-ml-8 pr-mt-4 pr-border-t pr-border-gray-300"}),l.jsxs("div",{className:"pr-md:mt-0 pr-mt-4 pr-flex-1 pr-space-y-3",children:[l.jsx("h2",{className:"pr-text-md pr-font-semibold",children:"Information"}),l.jsxs("div",{className:"pr-flex pr-items-start pr-justify-between pr-pr-4 pr-text-xs pr-text-gray-600",children:[l.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[l.jsx("span",{className:"pr-mb-2",children:"Publisher"}),l.jsx("span",{className:"pr-font-semibold",children:t}),l.jsx("span",{className:"pr-mb-2 pr-mt-4",children:"Size"}),l.jsx("span",{className:"pr-font-semibold",children:a})]}),l.jsx("div",{className:"pr-flex pr-w-3/4 pr-items-center pr-justify-between pr-text-xs pr-text-gray-600",children:l.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[l.jsx("span",{className:"pr-mb-2",children:"Languages"}),l.jsx("span",{className:"pr-font-semibold",children:c.join(", ")})]})})]})]})]})})}const Gb=(e,t)=>{E.useEffect(()=>{if(!e)return()=>{};const r=e(t);return()=>{r()}},[e,t])},ao=()=>!1,Hb=(e,t)=>{const[r]=xn(E.useCallback(async()=>{if(!e)return ao;const n=await Promise.resolve(e(t));return async()=>n()},[t,e]),ao,{preserveValue:!1});E.useEffect(()=>()=>{r!==ao&&r()},[r])},Dl=E.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:B("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));Dl.displayName="Card";const Al=E.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:B("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));Al.displayName="CardHeader";const Ll=E.forwardRef(({className:e,...t},r)=>l.jsx("h3",{ref:r,className:B("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));Ll.displayName="CardTitle";const Bl=E.forwardRef(({className:e,...t},r)=>l.jsx("p",{ref:r,className:B("pr-text-sm pr-text-muted-foreground",e),...t}));Bl.displayName="CardDescription";const Fl=E.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:B("pr-p-6 pr-pt-0",e),...t}));Fl.displayName="CardContent";const Vl=E.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:B("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));Vl.displayName="CardFooter";const qb=Eo.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),zl=E.forwardRef(({className:e,variant:t,...r},n)=>l.jsx("div",{ref:n,role:"alert",className:B(qb({variant:t}),e),...r}));zl.displayName="Alert";const Ul=E.forwardRef(({className:e,...t},r)=>l.jsxs("h5",{ref:r,className:B("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));Ul.displayName="AlertTitle";const Gl=E.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:B("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));Gl.displayName="AlertDescription";const Hl=E.forwardRef(({className:e,...t},r)=>l.jsxs(Tr.Root,{ref:r,className:B("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[l.jsx(Tr.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:l.jsx(Tr.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),l.jsx(Tr.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));Hl.displayName=Tr.Root.displayName;const ql=E.forwardRef(({className:e,...t},r)=>l.jsx(io.Root,{className:B("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:r,children:l.jsx(io.Thumb,{className:B("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));ql.displayName=io.Root.displayName;exports.Alert=zl;exports.AlertDescription=Gl;exports.AlertTitle=Ul;exports.BookChapterControl=Uc;exports.Button=ve;exports.Card=Dl;exports.CardContent=Fl;exports.CardDescription=Bl;exports.CardFooter=Vl;exports.CardHeader=Al;exports.CardTitle=Ll;exports.ChapterRangeSelector=up;exports.Checkbox=Qs;exports.Checklist=fp;exports.ComboBox=lo;exports.ContextMenu=pg;exports.DataTable=Hs;exports.DisableButton=Ig;exports.DropdownMenu=kn;exports.DropdownMenuCheckboxItem=En;exports.DropdownMenuContent=Vr;exports.DropdownMenuGroup=Ms;exports.DropdownMenuItem=jo;exports.DropdownMenuItemType=_l;exports.DropdownMenuLabel=cr;exports.DropdownMenuPortal=Rc;exports.DropdownMenuRadioGroup=$c;exports.DropdownMenuRadioItem=Oo;exports.DropdownMenuSeparator=zr;exports.DropdownMenuShortcut=Ls;exports.DropdownMenuSub=Pc;exports.DropdownMenuSubContent=As;exports.DropdownMenuSubTrigger=Ds;exports.DropdownMenuTrigger=Co;exports.EnableButton=$g;exports.FilterButton=Il;exports.FilterDropdown=Fb;exports.Footer=Ub;exports.GridMenu=Ki;exports.HamburgerMenuButton=il;exports.INVENTORY_STRING_KEYS=Xc;exports.IconButton=fg;exports.Input=ir;exports.InstallButton=Pg;exports.Inventory=Jc;exports.Label=Mr;exports.LabelPosition=Rt;exports.MarkdownRenderer=Bb;exports.MenuItem=Zo;exports.MoreInfo=zb;exports.NavigationContentSearch=Eg;exports.NoExtensionsFound=Vb;exports.ScriptureResultsViewer=wg;exports.ScrollGroupSelector=tp;exports.SearchBar=cl;exports.Select=Zt;exports.SelectContent=Dt;exports.SelectGroup=Fs;exports.SelectItem=Ge;exports.SelectLabel=Vs;exports.SelectScrollDownButton=Po;exports.SelectScrollUpButton=Ro;exports.SelectSeparator=zs;exports.SelectTrigger=Mt;exports.SelectValue=Qt;exports.Separator=na;exports.SettingsList=Ng;exports.SettingsListHeader=Sg;exports.SettingsListItem=Tg;exports.ShadCnSlider=Hl;exports.ShadCnSwitch=ql;exports.Slider=xg;exports.Snackbar=kg;exports.Spinner=dr;exports.Switch=Cg;exports.Table=Ur;exports.TableBody=Hr;exports.TableCaption=Gs;exports.TableCell=At;exports.TableFooter=Us;exports.TableHead=er;exports.TableHeader=Gr;exports.TableRow=lt;exports.Tabs=Rg;exports.TabsContent=fl;exports.TabsList=dl;exports.TabsTrigger=ul;exports.TextField=jg;exports.Toolbar=Og;exports.UpdateButton=_g;exports.VersionHistory=Ml;exports.VerticalTabs=ea;exports.VerticalTabsContent=ra;exports.VerticalTabsList=ta;exports.VerticalTabsTrigger=pl;exports.buttonVariants=Bs;exports.getSortingIcon=Nn;exports.inventoryCountColumn=Qc;exports.inventoryItemColumn=Zc;exports.inventoryStatusColumn=ep;exports.useEvent=Gb;exports.useEventAsync=Hb;exports.usePromise=xn;function Wb(e,t="top"){if(!e||typeof document>"u")return;const r=document.head||document.querySelector("head"),n=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&n?r.insertBefore(o,n):r.appendChild(o)}Wb(`/*
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
.pr-mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
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
.pr-box-content {
  box-sizing: content-box;
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
.pr-px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state="selected"]:hover {
  cursor: default;
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
  display: flex;
  gap: 8px;
}
`,"top");
//# sourceMappingURL=index.cjs.map
