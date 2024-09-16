"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=require("react/jsx-runtime"),k=require("react"),oe=require("lucide-react"),Ce=require("clsx"),ic=require("tailwind-merge"),Cs=require("@radix-ui/react-dropdown-menu"),re=require("platform-bible-utils"),je=require("@tanstack/react-table"),lc=require("@radix-ui/react-slot"),Eo=require("class-variance-authority"),cc=require("@radix-ui/react-select"),Ne=require("@mui/material"),pc=require("@radix-ui/react-popover"),De=require("cmdk"),dc=require("@radix-ui/react-dialog"),ao=require("@mui/styled-engine"),Nr=require("react-dom"),uc=require("@radix-ui/react-tabs"),fc=require("@radix-ui/react-separator"),mc=require("@radix-ui/react-label"),js=require("sonner"),hc=require("@radix-ui/react-slider"),gc=require("@radix-ui/react-switch");function Je(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const r in e)if(r!=="default"){const n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:()=>e[r]})}}return t.default=e,Object.freeze(t)}const T=Je(k),ge=Je(Cs),xe=Je(cc),_r=Je(pc),et=Je(dc),bc=Je(Nr),Ae=Je(uc),Os=Je(fc),Rs=Je(mc),Tr=Je(hc),so=Je(gc);const vc=ic.extendTailwindMerge({prefix:"pr-"});function B(...e){return vc(Ce.clsx(e))}const ir=k.forwardRef(({className:e,type:t,...r},n)=>l.jsx("input",{type:t,className:B("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:n,...r}));ir.displayName="Input";const yc=k.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:r,handleSubmit:n,...o},a)=>l.jsxs("div",{className:"pr-relative",children:[l.jsx(ir,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-bg-background pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&n(),t(s)},onClick:r,ref:a}),l.jsx(oe.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-muted-foreground",onClick:()=>{console.log("back in history")}})]}));var wc=Object.defineProperty,xc=(e,t,r)=>t in e?wc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,ae=(e,t,r)=>xc(e,typeof t!="symbol"?t+"":t,r);const _t=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],ko=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Ps=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],wa=Pc();function lr(e,t=!0){return t&&(e=e.toUpperCase()),e in wa?wa[e]:0}function No(e){return lr(e)>0}function Ec(e){const t=typeof e=="string"?lr(e):e;return t>=40&&t<=66}function kc(e){return(typeof e=="string"?lr(e):e)<=39}function $s(e){return e<=66}function Nc(e){const t=typeof e=="string"?lr(e):e;return Ms(t)&&!$s(t)}function*Tc(){for(let e=1;e<=_t.length;e++)yield e}const Sc=1,Is=_t.length;function Cc(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function To(e,t="***"){const r=e-1;return r<0||r>=_t.length?t:_t[r]}function _s(e){return e<=0||e>Is?"******":Ps[e-1]}function jc(e){return _s(lr(e))}function Ms(e){const t=typeof e=="number"?To(e):e;return No(t)&&!ko.includes(t)}function Oc(e){const t=typeof e=="number"?To(e):e;return No(t)&&ko.includes(t)}function Rc(e){return Ps[e-1].includes("*obsolete*")}function Pc(){const e={};for(let t=0;t<_t.length;t++)e[_t[t]]=t+1;return e}const me={allBookIds:_t,nonCanonicalIds:ko,bookIdToNumber:lr,isBookIdValid:No,isBookNT:Ec,isBookOT:kc,isBookOTNT:$s,isBookDC:Nc,allBookNumbers:Tc,firstBook:Sc,lastBook:Is,extraBooks:Cc,bookNumberToId:To,bookNumberToEnglishName:_s,bookIdToEnglishName:jc,isCanonical:Ms,isExtraMaterial:Oc,isObsolete:Rc};var Ze=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ze||{});const Fe=class{constructor(t){if(ae(this,"name"),ae(this,"fullPath"),ae(this,"isPresent"),ae(this,"hasVerseSegments"),ae(this,"isCustomized"),ae(this,"baseVersification"),ae(this,"scriptureBooks"),ae(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Ze[t]):(this._type=t,this.name=Ze[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ae(Fe,"Original",new Fe(Ze.Original)),ae(Fe,"Septuagint",new Fe(Ze.Septuagint)),ae(Fe,"Vulgate",new Fe(Ze.Vulgate)),ae(Fe,"English",new Fe(Ze.English)),ae(Fe,"RussianProtestant",new Fe(Ze.RussianProtestant)),ae(Fe,"RussianOrthodox",new Fe(Ze.RussianOrthodox));let St=Fe;function xa(e,t){const r=t[0];for(let n=1;n<t.length;n++)e=e.split(t[n]).join(r);return e.split(r)}var Ds=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Ds||{});const Ie=class ce{constructor(t,r,n,o){if(ae(this,"firstChapter"),ae(this,"lastChapter"),ae(this,"lastVerse"),ae(this,"hasSegmentsDefined"),ae(this,"text"),ae(this,"BBBCCCVVVS"),ae(this,"longHashCode"),ae(this,"versification"),ae(this,"rtlMark","‏"),ae(this,"_bookNum",0),ae(this,"_chapterNum",0),ae(this,"_verseNum",0),ae(this,"_verse"),n==null&&o==null)if(t!=null&&typeof t=="string"){const a=t,s=r!=null&&r instanceof St?r:void 0;this.setEmpty(s),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=r!=null&&r instanceof St?r:void 0;this.setEmpty(a),this._verseNum=t%ce.chapterDigitShifter,this._chapterNum=Math.floor(t%ce.bookDigitShifter/ce.chapterDigitShifter),this._bookNum=Math.floor(t/ce.bookDigitShifter)}else if(r==null)if(t!=null&&t instanceof ce){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof St?t:ce.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&r!=null&&n!=null)if(typeof t=="string"&&typeof r=="string"&&typeof n=="string")this.setEmpty(o),this.updateInternal(t,r,n);else if(typeof t=="number"&&typeof r=="number"&&typeof n=="number")this._bookNum=t,this._chapterNum=r,this._verseNum=n,this.versification=o??ce.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let r;try{return r=new ce(t),{success:!0,verseRef:r}}catch(n){if(n instanceof br)return r=new ce,{success:!1,verseRef:r};throw n}}static getBBBCCCVVV(t,r,n){return t%ce.bcvMaxValue*ce.bookDigitShifter+(r>=0?r%ce.bcvMaxValue*ce.chapterDigitShifter:0)+(n>=0?n%ce.bcvMaxValue:0)}static fromJSON(t){const{book:r,chapterNum:n,verseNum:o,verse:a,versificationStr:s}=t,c=a||o.toString();let p;return s&&(p=new St(s)),r?new ce(r,n.toString(),c,p):new ce}static tryGetVerseNum(t){let r;if(!t)return r=-1,{success:!0,vNum:r};r=0;let n;for(let o=0;o<t.length;o++){if(n=t[o],n<"0"||n>"9")return o===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +n-0,r>ce.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ce.verseRangeSeparator)||this._verse.includes(ce.verseSequenceIndicator))}get book(){return me.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=me.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const r=+t;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:r,vNum:n}=ce.tryGetVerseNum(t);this._verse=r?void 0:t.replace(this.rtlMark,""),this._verseNum=n,!(this._verseNum>=0)&&({vNum:this._verseNum}=ce.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>me.lastBook)throw new br("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new St(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ce.verseRangeSeparators,ce.verseSequenceIndicators)}get BBBCCC(){return ce.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ce.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const s=+a[1].trim();this.versification=new St(Ze[s])}catch{throw new br("Invalid reference : "+t)}}const r=t.trim().split(" ");if(r.length!==2)throw new br("Invalid reference : "+t);const n=r[1].split(":"),o=+n[0];if(n.length!==2||me.bookIdToNumber(r[0])===0||!Number.isInteger(o)||o<0||!ce.isVerseParseable(n[1]))throw new br("Invalid reference : "+t);this.updateInternal(r[0],n[0],n[1])}simplify(){this._verse=void 0}clone(){return new ce(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete r.verse,r}equals(t){return t instanceof ce?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,r=ce.verseRangeSeparators,n=ce.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=xa(this._verse,n);for(const s of a.map(c=>xa(c,r))){const c=this.clone();c.verse=s[0];const p=c.verseNum;if(o.push(c),s.length>1){const f=this.clone();if(f.verse=s[1],!t)for(let m=p+1;m<f.verseNum;m++){const v=new ce(this._bookNum,this._chapterNum,m,this.versification);this.isExcluded||o.push(v)}o.push(f)}}return o}validateVerse(t,r){if(!this.verse)return this.internalValid;let n=0;for(const o of this.allVerses(!0,t,r)){const a=o.internalValid;if(a!==0)return a;const s=o.BBBCCCVVV;if(n>s)return 3;if(n===s)return 4;n=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>me.lastBook?2:(me.isCanonical(this._bookNum),0)}setEmpty(t=ce.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,r,n){this.bookNum=me.bookIdToNumber(t),this.chapter=r,this.verse=n}};ae(Ie,"defaultVersification",St.English),ae(Ie,"verseRangeSeparator","-"),ae(Ie,"verseSequenceIndicator",","),ae(Ie,"verseRangeSeparators",[Ie.verseRangeSeparator]),ae(Ie,"verseSequenceIndicators",[Ie.verseSequenceIndicator]),ae(Ie,"chapterDigitShifter",1e3),ae(Ie,"bookDigitShifter",Ie.chapterDigitShifter*Ie.chapterDigitShifter),ae(Ie,"bcvMaxValue",Ie.chapterDigitShifter-1),ae(Ie,"ValidStatusType",Ds);let br=class extends Error{};const xn=ge.Root,So=ge.Trigger,As=ge.Group,$c=ge.Portal,Ic=ge.Sub,_c=ge.RadioGroup,Ls=k.forwardRef(({className:e,inset:t,children:r,...n},o)=>l.jsxs(ge.SubTrigger,{ref:o,className:B("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...n,children:[r,l.jsx(oe.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Ls.displayName=ge.SubTrigger.displayName;const Bs=k.forwardRef(({className:e,...t},r)=>l.jsx(ge.SubContent,{ref:r,className:B("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));Bs.displayName=ge.SubContent.displayName;const Fr=k.forwardRef(({className:e,sideOffset:t=4,...r},n)=>l.jsx(ge.Portal,{children:l.jsx(ge.Content,{ref:n,sideOffset:t,className:B("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r})}));Fr.displayName=ge.Content.displayName;const Co=k.forwardRef(({className:e,inset:t,...r},n)=>l.jsx(ge.Item,{ref:n,className:B("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...r}));Co.displayName=ge.Item.displayName;const En=k.forwardRef(({className:e,children:t,checked:r,...n},o)=>l.jsxs(ge.CheckboxItem,{ref:o,className:B("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:r,...n,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(ge.ItemIndicator,{children:l.jsx(oe.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));En.displayName=ge.CheckboxItem.displayName;const jo=k.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(ge.RadioItem,{ref:n,className:B("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...r,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(ge.ItemIndicator,{children:l.jsx(oe.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));jo.displayName=ge.RadioItem.displayName;const cr=k.forwardRef(({className:e,inset:t,...r},n)=>l.jsx(ge.Label,{ref:n,className:B("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...r}));cr.displayName=ge.Label.displayName;const Vr=k.forwardRef(({className:e,...t},r)=>l.jsx(ge.Separator,{ref:r,className:B("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Vr.displayName=ge.Separator.displayName;function Fs({className:e,...t}){return l.jsx("span",{className:B("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Fs.displayName="DropdownMenuShortcut";const Mc=k.forwardRef(({bookId:e,handleSelectBook:t,isSelected:r,handleHighlightBook:n,handleKeyDown:o,bookType:a,children:s},c)=>l.jsxs(Co,{ref:c,textValue:e,className:B("pr-mx-1 pr-px-1 pr-font-normal pr-text-foreground/80",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":r}),onSelect:p=>{p.preventDefault(),t()},onKeyDown:p=>{o(p)},onFocus:n,onMouseMove:n,children:[l.jsx("span",{className:B("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":r,"pr-border-l-red-200":a.toLowerCase()==="ot","pr-border-l-purple-200":a.toLowerCase()==="nt","pr-border-l-indigo-200":a.toLowerCase()==="dc"}),children:me.bookIdToEnglishName(e)}),r&&l.jsx("div",{children:s})]},e));function Dc({handleSelectChapter:e,endChapter:t,activeChapter:r,highlightedChapter:n,handleHighlightedChapter:o}){const a=Array.from({length:t},(c,p)=>p+1),s=k.useCallback(c=>{o(c)},[o]);return l.jsx("div",{className:B("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:a.map(c=>l.jsx("div",{className:B("pr-box-content pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":c===r,"pr-bg-amber-200":c===n}),onClick:p=>{p.preventDefault(),p.stopPropagation(),e(c)},role:"button",onKeyDown:p=>{p.key==="Enter"&&e(c)},tabIndex:0,onMouseMove:()=>s(c),children:c},c))})}function Ac({handleSort:e,handleLocationHistory:t,handleBookmarks:r}){return l.jsxs(cr,{className:"pr-flex pr-justify-between",children:[l.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),l.jsxs("div",{className:"pr-flex pr-items-center",children:[l.jsx(oe.ArrowDownWideNarrow,{onClick:e,className:"pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"}),l.jsx(oe.Clock,{onClick:t,className:"pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"}),l.jsx(oe.Bookmark,{onClick:r,className:"pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"})]})]})}const Or=me.allBookIds,Lc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},Ea=["OT","NT","DC"],Bc=32+32+32,Fc=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Vc=e=>({OT:Or.filter(r=>me.isBookOT(r)),NT:Or.filter(r=>me.isBookNT(r)),DC:Or.filter(r=>me.isBookDC(r))})[e],vr=e=>re.getChaptersForBook(me.bookIdToNumber(e));function zc(){return Or.map(t=>me.bookIdToEnglishName(t))}function Uc(e){return zc().includes(e)}function Gc(e){const t=e.toLowerCase().replace(/^\w/,r=>r.toUpperCase());if(Uc(t))return Or.find(n=>me.bookIdToEnglishName(n)===t)}function Hc({scrRef:e,handleSubmit:t}){const[r,n]=k.useState(""),[o,a]=k.useState(me.bookNumberToId(e.bookNum)),[s,c]=k.useState(e.chapterNum??0),[p,f]=k.useState(me.bookNumberToId(e.bookNum)),[m,v]=k.useState(!1),[g,d]=k.useState(m),h=k.useRef(void 0),u=k.useRef(void 0),b=k.useRef(void 0),w=k.useCallback(N=>Vc(N).filter(_=>{const D=me.bookIdToEnglishName(_).toLowerCase(),z=r.replace(/[^a-zA-Z]/g,"").toLowerCase();return D.includes(z)||_.toLowerCase().includes(z)}),[r]),O=N=>{n(N)},x=k.useRef(!1),E=k.useCallback(N=>{if(x.current){x.current=!1;return}v(N)},[]),y=k.useCallback((N,_,D,z)=>{if(c(me.bookNumberToId(e.bookNum)!==N?1:e.chapterNum),_||vr(N)===-1){t({bookNum:me.bookIdToNumber(N),chapterNum:D||1,verseNum:z||1}),v(!1),n("");return}a(o!==N?N:""),v(!_)},[t,e.bookNum,e.chapterNum,o]),S=N=>{N<=0||N>vr(o)||y(o,!0,N)},C=k.useCallback(()=>{Fc.forEach(N=>{const _=r.match(N);if(_){const[D,z=void 0,G=void 0]=_.slice(1),A=Gc(D);(me.isBookIdValid(D)||A)&&y(A??D,!0,z?parseInt(z,10):1,G?parseInt(G,10):1)}})},[y,r]),I=k.useCallback(N=>{m?(N.key==="ArrowDown"||N.key==="ArrowUp")&&(typeof b<"u"&&b.current!==null?b.current.focus():typeof u<"u"&&u.current!==null&&u.current.focus(),N.preventDefault()):v(!0)},[m]),R=N=>{const{key:_}=N;_==="ArrowRight"||_==="ArrowLeft"||_==="ArrowDown"||_==="ArrowUp"||_==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:_})),h.current.focus())},$=N=>{const{key:_}=N;if(p===o){if(_==="Enter"){N.preventDefault(),y(o,!0,s);return}let D=0;if(_==="ArrowRight")if(s<vr(p))D=1;else{N.preventDefault();return}else if(_==="ArrowLeft")if(s>1)D=-1;else{N.preventDefault();return}else _==="ArrowDown"?D=6:_==="ArrowUp"&&(D=-6);s+D<=0||s+D>vr(p)?c(0):D!==0&&(c(s+D),N.preventDefault())}};return k.useEffect(()=>{o===p?o===me.bookNumberToId(e.bookNum)?c(e.chapterNum):c(1):c(0)},[p,e.bookNum,e.chapterNum,o]),k.useLayoutEffect(()=>{d(m)},[m]),k.useLayoutEffect(()=>{const N=setTimeout(()=>{if(g&&u.current&&b.current){const D=b.current.offsetTop-Bc;u.current.scrollTo({top:D,behavior:"instant"})}},10);return()=>{clearTimeout(N)}},[g]),l.jsx("div",{className:"pr-twp pr-flex",children:l.jsxs(xn,{modal:!1,open:m,onOpenChange:E,children:[l.jsx(So,{asChild:!0,children:l.jsx(yc,{ref:h,value:r,handleSearch:O,handleKeyDown:I,handleOnClick:()=>{a(me.bookNumberToId(e.bookNum)),f(me.bookNumberToId(e.bookNum)),c(e.chapterNum>0?e.chapterNum:0),v(!0),h.current.focus()},onFocus:()=>{x.current=!0},handleSubmit:C,placeholder:`${me.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),l.jsxs(Fr,{className:"pr-m-1 pr-overflow-y-auto pr-p-0 pr-font-normal pr-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},onKeyDown:R,align:"start",ref:u,children:[l.jsx(Ac,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),Ea.map((N,_)=>w(N).length>0&&l.jsxs("div",{children:[l.jsx(cr,{className:"pr-font-semibold pr-text-foreground/80",children:Lc[N]}),w(N).map(D=>l.jsx("div",{children:l.jsx(Mc,{bookId:D,handleSelectBook:()=>y(D,!1),isSelected:o===D,handleHighlightBook:()=>f(D),handleKeyDown:$,bookType:N,ref:z=>{o===D&&(b.current=z)},children:l.jsx(Dc,{handleSelectChapter:S,endChapter:vr(D),activeChapter:e.bookNum===me.bookIdToNumber(D)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:z=>{c(z)}})})},D)),Ea.length-1!==_?l.jsx(Vr,{}):void 0]},N))]})]})})}const Vs=Eo.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),ve=k.forwardRef(({className:e,variant:t,size:r,asChild:n=!1,...o},a)=>{const s=n?lc.Slot:"button";return l.jsx(s,{className:B(Vs({variant:t,size:r,className:e})),ref:a,...o})});ve.displayName="Button";function qc({table:e}){return l.jsxs(xn,{children:[l.jsx(Cs.DropdownMenuTrigger,{asChild:!0,children:l.jsxs(ve,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[l.jsx(oe.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),l.jsxs(Fr,{align:"end",className:"pr-w-[150px]",children:[l.jsx(cr,{children:"Toggle columns"}),l.jsx(Vr,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>l.jsx(En,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:r=>t.toggleVisibility(!!r),children:t.id},t.id))]})]})}const Zt=xe.Root,zs=xe.Group,Qt=xe.Value,Mt=k.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(xe.Trigger,{ref:n,className:B("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...r,children:[t,l.jsx(xe.Icon,{asChild:!0,children:l.jsx(oe.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));Mt.displayName=xe.Trigger.displayName;const Oo=k.forwardRef(({className:e,...t},r)=>l.jsx(xe.ScrollUpButton,{ref:r,className:B("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:l.jsx(oe.ChevronUp,{className:"pr-h-4 pr-w-4"})}));Oo.displayName=xe.ScrollUpButton.displayName;const Ro=k.forwardRef(({className:e,...t},r)=>l.jsx(xe.ScrollDownButton,{ref:r,className:B("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:l.jsx(oe.ChevronDown,{className:"pr-h-4 pr-w-4"})}));Ro.displayName=xe.ScrollDownButton.displayName;const Dt=k.forwardRef(({className:e,children:t,position:r="popper",...n},o)=>l.jsx(xe.Portal,{children:l.jsxs(xe.Content,{ref:o,className:B("pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:r,...n,children:[l.jsx(Oo,{}),l.jsx(xe.Viewport,{className:B("pr-p-1",r==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),l.jsx(Ro,{})]})}));Dt.displayName=xe.Content.displayName;const Us=k.forwardRef(({className:e,...t},r)=>l.jsx(xe.Label,{ref:r,className:B("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));Us.displayName=xe.Label.displayName;const Ge=k.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(xe.Item,{ref:n,className:B("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...r,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(xe.ItemIndicator,{children:l.jsx(oe.Check,{className:"pr-h-4 pr-w-4"})})}),l.jsx(xe.ItemText,{children:t})]}));Ge.displayName=xe.Item.displayName;const Gs=k.forwardRef(({className:e,...t},r)=>l.jsx(xe.Separator,{ref:r,className:B("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Gs.displayName=xe.Separator.displayName;function Wc({table:e}){return l.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[l.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[l.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),l.jsxs(Zt,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[l.jsx(Mt,{className:"pr-h-8 pr-w-[70px]",children:l.jsx(Qt,{placeholder:e.getState().pagination.pageSize})}),l.jsx(Dt,{side:"top",children:[10,20,30,40,50].map(t=>l.jsx(Ge,{value:`${t}`,children:t},t))})]})]}),l.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[l.jsxs(ve,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),l.jsx(oe.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(ve,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),l.jsx(oe.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(ve,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),l.jsx(oe.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(ve,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),l.jsx(oe.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}const zr=k.forwardRef(({className:e,stickyHeader:t,...r},n)=>l.jsx("div",{className:B("pr-twp pr-relative pr-w-full",{"pr-overflow-auto":!t}),children:l.jsx("table",{ref:n,className:B("pr-w-full pr-caption-bottom pr-text-sm",e),...r})}));zr.displayName="Table";const Ur=k.forwardRef(({className:e,stickyHeader:t,...r},n)=>l.jsx("thead",{ref:n,className:B({"pr-sticky pr-top-0 pr-bg-muted":t},"[&_tr]:pr-border-b",e),...r}));Ur.displayName="TableHeader";const Gr=k.forwardRef(({className:e,...t},r)=>l.jsx("tbody",{ref:r,className:B("[&_tr:last-child]:pr-border-0",e),...t}));Gr.displayName="TableBody";const Hs=k.forwardRef(({className:e,...t},r)=>l.jsx("tfoot",{ref:r,className:B("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));Hs.displayName="TableFooter";const lt=k.forwardRef(({className:e,...t},r)=>l.jsx("tr",{ref:r,className:B("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));lt.displayName="TableRow";const er=k.forwardRef(({className:e,...t},r)=>l.jsx("th",{ref:r,className:B("pr-h-12 pr-px-4 pr-text-start pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pe-0",e),...t}));er.displayName="TableHead";const At=k.forwardRef(({className:e,...t},r)=>l.jsx("td",{ref:r,className:B("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pe-0",e),...t}));At.displayName="TableCell";const qs=k.forwardRef(({className:e,...t},r)=>l.jsx("caption",{ref:r,className:B("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));qs.displayName="TableCaption";function Ws({columns:e,data:t,enablePagination:r=!1,showPaginationControls:n=!1,showColumnVisibilityControls:o=!1,stickyHeader:a=!1,onRowClickHandler:s=()=>{}}){var b;const[c,p]=k.useState([]),[f,m]=k.useState([]),[v,g]=k.useState({}),[d,h]=k.useState({}),u=je.useReactTable({data:t,columns:e,getCoreRowModel:je.getCoreRowModel(),...r&&{getPaginationRowModel:je.getPaginationRowModel()},onSortingChange:p,getSortedRowModel:je.getSortedRowModel(),onColumnFiltersChange:m,getFilteredRowModel:je.getFilteredRowModel(),onColumnVisibilityChange:g,onRowSelectionChange:h,state:{sorting:c,columnFilters:f,columnVisibility:v,rowSelection:d}});return l.jsxs("div",{className:"pr-twp pr-font-sans",children:[o&&l.jsx(qc,{table:u}),l.jsxs(zr,{stickyHeader:a,children:[l.jsx(Ur,{stickyHeader:a,children:u.getHeaderGroups().map(w=>l.jsx(lt,{children:w.headers.map(O=>l.jsx(er,{children:O.isPlaceholder?void 0:je.flexRender(O.column.columnDef.header,O.getContext())},O.id))},w.id))}),l.jsx(Gr,{children:(b=u.getRowModel().rows)!=null&&b.length?u.getRowModel().rows.map(w=>l.jsx(lt,{onClick:()=>s(w,u),"data-state":w.getIsSelected()&&"selected",children:w.getVisibleCells().map(O=>l.jsx(At,{children:je.flexRender(O.column.columnDef.cell,O.getContext())},O.id))},w.id)):l.jsx(lt,{children:l.jsx(At,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]}),r&&l.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[l.jsx(ve,{variant:"outline",size:"sm",onClick:()=>u.previousPage(),disabled:!u.getCanPreviousPage(),children:"Previous"}),l.jsx(ve,{variant:"outline",size:"sm",onClick:()=>u.nextPage(),disabled:!u.getCanNextPage(),children:"Next"})]}),r&&n&&l.jsx(Wc,{table:u})]})}const Xc=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),ka=e=>{const t=/^\\[vc]\s+(\d+)/,r=e.match(t);if(r)return+r[1]},Na=(e,t,r,n)=>{if(!e||e===""||t==="")return[];const o=[],a=Xc(e);let s=n.chapterNum,c=n.verseNum,p=0;return a.forEach(f=>{f.startsWith("\\id")&&(s=0,c=0),f.startsWith("\\c")&&(s=ka(f),c=0),f.startsWith("\\v")&&(c=ka(f),s===0&&(s=n.chapterNum));const m=r(f,t);for(let v=0;v<m.length;v++){const g={reference:{...n,chapterNum:s!==void 0?+s:-1,verseNum:c!==void 0?+c:-1},snippet:f,key:p};p+=1,o.push(g)}}),o};function Kc({selectedItem:e,text:t,extractItems:r,scriptureReference:n,setScriptureReference:o,localizedStrings:a}){const s=a["%webView_inventory_occurrences_table_header_reference%"],c=a["%webView_inventory_occurrences_table_header_occurrence%"],[p,f]=k.useState(Na(t,e,r,n));return k.useEffect(()=>f(Na(t,e,r,n)),[t,e,n,r]),l.jsxs(zr,{stickyHeader:!0,children:[l.jsx(Ur,{stickyHeader:!0,children:l.jsxs(lt,{children:[l.jsx(er,{children:s}),l.jsx(er,{children:c})]})}),l.jsx(Gr,{children:p.map(m=>l.jsxs(lt,{onClick:()=>{o(m.reference)},children:[l.jsx(At,{children:`${me.bookNumberToEnglishName(m.reference.bookNum)} ${m.reference.chapterNum}:${m.reference.verseNum}`}),l.jsx(At,{children:m.snippet})]},m.key))})]})}const Yc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_book%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),kn=e=>e==="asc"?l.jsx(oe.ArrowUpIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}):e==="desc"?l.jsx(oe.ArrowDownIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}):l.jsx(oe.ArrowUpDownIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}),Jc=(e,t,r)=>{let n=e;return t!=="all"&&(n=n.filter(o=>t==="approved"&&o.status==="approved"||t==="unapproved"&&o.status==="unapproved"||t==="unknown"&&o.status==="unknown")),r!==""&&(n=n.filter(o=>o.item.includes(r))),n},Zc=(e,t,r)=>{const n=[],o=t(e);for(let a=0;a<o.length;a++){const s=o[a],c=n.find(p=>p.item===s);if(c)c.count+=1;else{const p={item:s,count:1,status:r(s)};n.push(p)}}return n},gt=(e,t)=>e[t]??t;function Qc({scriptureReference:e,setScriptureReference:t,localizedStrings:r,extractItems:n,approvedItems:o,onApprovedItemsChange:a,unapprovedItems:s,onUnapprovedItemsChange:c,text:p,scope:f,onScopeChange:m,getColumns:v}){const g=gt(r,"%webView_inventory_all%"),d=gt(r,"%webView_inventory_approved%"),h=gt(r,"%webView_inventory_unapproved%"),u=gt(r,"%webView_inventory_unknown%"),b=gt(r,"%webView_inventory_scope_book%"),w=gt(r,"%webView_inventory_scope_chapter%"),O=gt(r,"%webView_inventory_scope_verse%"),x=gt(r,"%webView_inventory_filter_text%"),[E,y]=k.useState([]),[S,C]=k.useState("all"),[I,R]=k.useState(""),[$,N]=k.useState(""),_=k.useCallback((V,j)=>{y(W=>{let U=[];return V.forEach(K=>{U=W.map(X=>X.item===K&&X.status!==j?{...X,status:j}:X)}),U});let L=[...o];V.forEach(W=>{j==="approved"?L.includes(W)||L.push(W):L=L.filter(U=>U!==W)}),a(L);let q=[...s];V.forEach(W=>{j==="unapproved"?q.includes(W)||q.push(W):q=q.filter(U=>U!==W)}),c(q)},[o,a,s,c]),D=k.useCallback(V=>o.includes(V)?"approved":s.includes(V)?"unapproved":"unknown",[o,s]);k.useEffect(()=>{p&&y(Zc(p,n,D))},[n,p,D]);const z=k.useMemo(()=>Jc(E,S,I),[E,S,I]);k.useEffect(()=>{N("")},[z]);const G=(V,j)=>{j.toggleAllRowsSelected(!1),V.toggleSelected(void 0),N(V.getValue("item"))},A=k.useMemo(()=>v(_),[v,_]),H=V=>{if(V==="book"||V==="chapter"||V==="verse")m(V);else throw new Error(`Invalid scope value: ${V}`)},ee=V=>{if(V==="all"||V==="approved"||V==="unapproved"||V==="unknown")C(V);else throw new Error(`Invalid status filter value: ${V}`)};return l.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-flex-col",children:[l.jsxs("div",{className:"pr-flex",children:[l.jsxs(Zt,{onValueChange:V=>ee(V),defaultValue:S,children:[l.jsx(Mt,{className:"pr-m-1",children:l.jsx(Qt,{placeholder:"Select filter"})}),l.jsxs(Dt,{className:"pr-font-sans",children:[l.jsx(Ge,{value:"all",children:g}),l.jsx(Ge,{value:"approved",children:d}),l.jsx(Ge,{value:"unapproved",children:h}),l.jsx(Ge,{value:"unknown",children:u})]})]}),l.jsxs(Zt,{onValueChange:V=>H(V),defaultValue:f,children:[l.jsx(Mt,{className:"pr-m-1",children:l.jsx(Qt,{placeholder:"Select scope"})}),l.jsxs(Dt,{className:"pr-font-sans",children:[l.jsx(Ge,{value:"book",children:b}),l.jsx(Ge,{value:"chapter",children:w}),l.jsx(Ge,{value:"verse",children:O})]})]}),l.jsx(ir,{className:"pr-m-1 pr-rounded-md pr-border",placeholder:x,value:I,onChange:V=>{R(V.target.value)}})]}),l.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:l.jsx(Ws,{columns:A,data:z,onRowClickHandler:G,stickyHeader:!0})}),$!==""&&l.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:l.jsx(Kc,{selectedItem:$,text:p,extractItems:n,scriptureReference:e,setScriptureReference:V=>t(V),localizedStrings:r})})]})}const ep=e=>({accessorKey:"item",header:({column:t})=>l.jsxs(ve,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,kn(t.getIsSorted())]})}),tp=e=>({accessorKey:"count",header:({column:t})=>l.jsxs(ve,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,kn(t.getIsSorted())]})}),rp=(e,t)=>({accessorKey:"status",header:({column:r,table:n})=>{const o=n.getSelectedRowModel().rows,a=[];return o.forEach(s=>{a.push(s.getValue("item"))}),l.jsxs("div",{className:"pr-flex pr-justify-start",children:[l.jsxs(ve,{className:"pr-mt-1",variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[e,kn(r.getIsSorted())]}),l.jsx(ve,{className:"pr-m-1",children:l.jsx(oe.CircleCheckIcon,{onClick:()=>{t(a,"approved")}})}),l.jsx(ve,{className:"pr-m-1",children:l.jsx(oe.CircleXIcon,{onClick:()=>{t(a,"unapproved")}})}),l.jsx(ve,{className:"pr-m-1",children:l.jsx(oe.CircleHelpIcon,{onClick:()=>{t(a,"unknown")}})})]})},cell:({row:r})=>{switch(r.getValue("status")){case"approved":return l.jsx(oe.CircleCheckIcon,{});case"unapproved":return l.jsx(oe.CircleXIcon,{});case"unknown":default:return l.jsx(oe.CircleHelpIcon,{})}}}),Vn={[re.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[re.getLocalizeKeyForScrollGroupId(0)]:"A",[re.getLocalizeKeyForScrollGroupId(1)]:"B",[re.getLocalizeKeyForScrollGroupId(2)]:"C",[re.getLocalizeKeyForScrollGroupId(3)]:"D",[re.getLocalizeKeyForScrollGroupId(4)]:"E",[re.getLocalizeKeyForScrollGroupId(5)]:"F",[re.getLocalizeKeyForScrollGroupId(6)]:"G",[re.getLocalizeKeyForScrollGroupId(7)]:"H",[re.getLocalizeKeyForScrollGroupId(8)]:"I",[re.getLocalizeKeyForScrollGroupId(9)]:"J",[re.getLocalizeKeyForScrollGroupId(10)]:"K",[re.getLocalizeKeyForScrollGroupId(11)]:"L",[re.getLocalizeKeyForScrollGroupId(12)]:"M",[re.getLocalizeKeyForScrollGroupId(13)]:"N",[re.getLocalizeKeyForScrollGroupId(14)]:"O",[re.getLocalizeKeyForScrollGroupId(15)]:"P",[re.getLocalizeKeyForScrollGroupId(16)]:"Q",[re.getLocalizeKeyForScrollGroupId(17)]:"R",[re.getLocalizeKeyForScrollGroupId(18)]:"S",[re.getLocalizeKeyForScrollGroupId(19)]:"T",[re.getLocalizeKeyForScrollGroupId(20)]:"U",[re.getLocalizeKeyForScrollGroupId(21)]:"V",[re.getLocalizeKeyForScrollGroupId(22)]:"W",[re.getLocalizeKeyForScrollGroupId(23)]:"X",[re.getLocalizeKeyForScrollGroupId(24)]:"Y",[re.getLocalizeKeyForScrollGroupId(25)]:"Z"};function np({availableScrollGroupIds:e,scrollGroupId:t,onChangeScrollGroupId:r,localizedStrings:n={}}){const o={...Vn,...Object.fromEntries(Object.entries(n).map(([a,s])=>[a,a===s&&a in Vn?Vn[a]:s]))};return l.jsxs(Zt,{value:`${t}`,onValueChange:a=>r(a==="undefined"?void 0:parseInt(a,10)),children:[l.jsx(Mt,{className:"pr-twp pr-w-auto",children:l.jsx(Qt,{placeholder:o[re.getLocalizeKeyForScrollGroupId(t)]??t})}),l.jsx(Dt,{style:{zIndex:250},children:e.map(a=>l.jsx(Ge,{value:`${a}`,children:o[re.getLocalizeKeyForScrollGroupId(a)]},`${a}`))})]})}const op=_r.Root,ap=_r.Trigger,Xs=k.forwardRef(({className:e,align:t="center",sideOffset:r=4,...n},o)=>l.jsx(_r.Portal,{children:l.jsx(_r.Content,{ref:o,align:t,sideOffset:r,className:B("pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));Xs.displayName=_r.Content.displayName;const sp=et.Portal,Ks=k.forwardRef(({className:e,...t},r)=>l.jsx(et.Overlay,{ref:r,className:B("pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",e),...t}));Ks.displayName=et.Overlay.displayName;const ip=k.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(sp,{children:[l.jsx(Ks,{}),l.jsxs(et.Content,{ref:n,className:B("pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",e),...r,children:[t,l.jsxs(et.Close,{className:"pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground",children:[l.jsx(oe.X,{className:"pr-h-4 pr-w-4"}),l.jsx("span",{className:"pr-sr-only",children:"Close"})]})]})]}));ip.displayName=et.Content.displayName;const lp=k.forwardRef(({className:e,...t},r)=>l.jsx(et.Title,{ref:r,className:B("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight",e),...t}));lp.displayName=et.Title.displayName;const cp=k.forwardRef(({className:e,...t},r)=>l.jsx(et.Description,{ref:r,className:B("pr-text-sm pr-text-muted-foreground",e),...t}));cp.displayName=et.Description.displayName;const Ys=k.forwardRef(({className:e,...t},r)=>l.jsx(De.Command,{ref:r,className:B("pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",e),...t}));Ys.displayName=De.Command.displayName;const Js=k.forwardRef(({className:e,...t},r)=>l.jsxs("div",{className:"pr-flex pr-items-center pr-border-b pr-px-3",children:[l.jsx(oe.Search,{className:"pr-me-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"}),l.jsx(De.Command.Input,{ref:r,className:B("pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...t})]}));Js.displayName=De.Command.Input.displayName;const Zs=k.forwardRef(({className:e,...t},r)=>l.jsx(De.Command.List,{ref:r,className:B("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden",e),...t}));Zs.displayName=De.Command.List.displayName;const Qs=k.forwardRef((e,t)=>l.jsx(De.Command.Empty,{ref:t,className:"pr-py-6 pr-text-center pr-text-sm",...e}));Qs.displayName=De.Command.Empty.displayName;const pp=k.forwardRef(({className:e,...t},r)=>l.jsx(De.Command.Group,{ref:r,className:B("pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",e),...t}));pp.displayName=De.Command.Group.displayName;const dp=k.forwardRef(({className:e,...t},r)=>l.jsx(De.Command.Separator,{ref:r,className:B("pr--mx-1 pr-h-px pr-bg-border",e),...t}));dp.displayName=De.Command.Separator.displayName;const ei=k.forwardRef(({className:e,...t},r)=>l.jsx(De.Command.Item,{ref:r,className:B("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",e),...t}));ei.displayName=De.Command.Item.displayName;function up(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function io({id:e,options:t=[],className:r,value:n,onChange:o=()=>{},getOptionLabel:a=up,buttonPlaceholder:s="",textPlaceholder:c="",commandEmptyMessage:p="No option found",buttonVariant:f="outline",dir:m="ltr",disabled:v=!1,...g}){const[d,h]=k.useState(!1);return l.jsxs(op,{open:d,onOpenChange:h,...g,children:[l.jsx(ap,{asChild:!0,children:l.jsxs(ve,{variant:f,role:"combobox","aria-expanded":d,id:e,className:B("pr-w-[200px] pr-justify-between",r),disabled:v,children:[n?a(n):s,l.jsx(oe.ChevronsUpDown,{className:"pr-ms-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"})]})}),l.jsx(Xs,{className:"pr-w-[200px] pr-p-0",dir:m,children:l.jsxs(Ys,{children:[l.jsx(Js,{dir:m,placeholder:c,className:"pr-text-inherit"}),l.jsx(Qs,{children:p}),l.jsx(Zs,{children:t.map(u=>l.jsxs(ei,{value:a(u),onSelect:()=>{o(u),h(!1)},children:[l.jsx(oe.Check,{className:B("pr-me-2 pr-h-4 pr-w-4",{"pr-opacity-0":!n||a(n)!==a(u)})}),a(u)]},a(u)))})]})})]})}function fp({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:r=!1,chapterCount:n}){const[o,a]=k.useState(1),[s,c]=k.useState(n),[p,f]=k.useState(Array.from({length:n},(g,d)=>d+1));k.useEffect(()=>{a(1),e(1),c(n),t(n),f(Array.from({length:n},(g,d)=>d+1))},[n,t,e]);const m=g=>{a(g),e(g),g>s&&(c(g),t(g))},v=g=>{c(g),t(g),g<o&&(a(g),e(g))};return l.jsxs(l.Fragment,{children:[l.jsx(Ne.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:r,control:l.jsx(io,{onChange:m,className:"book-selection-chapter",options:p,getOptionLabel:g=>g.toString(),value:o,disabled:r},"start chapter"),label:"Chapters",labelPlacement:"start"}),l.jsx(Ne.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:r,control:l.jsx(io,{onChange:v,className:"book-selection-chapter",options:p,getOptionLabel:g=>g.toString(),value:s,disabled:r},"end chapter"),label:"to",labelPlacement:"start"})]})}var Rt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Rt||{});function ti({id:e,isChecked:t,labelText:r="",labelPosition:n=Rt.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:s=!1,hasError:c=!1,className:p,onChange:f}){const m=l.jsx(Ne.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:a,disabled:s,className:`papi-checkbox ${c?"error":""} ${p??""}`,onChange:f});let v;if(r){const g=n===Rt.Before||n===Rt.Above,d=l.jsx("span",{className:`papi-checkbox-label ${c?"error":""} ${p??""}`,children:r}),h=n===Rt.Before||n===Rt.After,u=h?d:l.jsx("div",{children:d}),b=h?m:l.jsx("div",{children:m});v=l.jsxs(Ne.FormLabel,{className:`papi-checkbox ${n.toString()}`,disabled:s,error:c,children:[g&&u,b,!g&&u]})}else v=m;return v}function mp({id:e,className:t,legend:r,listItems:n,selectedListItems:o,handleSelectListItem:a,createLabel:s}){return l.jsxs("fieldset",{id:e,className:t,children:[r&&l.jsx("legend",{children:r}),n.map(c=>l.jsx(ti,{className:"check-item",isChecked:o.includes(c),labelText:s?s(c):c,onChange:p=>a(c,p.target.checked)},c))]})}function hp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function gp(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var r=function n(){return this instanceof n?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};r.prototype=t.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(e).forEach(function(n){var o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(r,n,o.get?o:{enumerable:!0,get:function(){return e[n]}})}),r}var Po={},ri={exports:{}};(function(e){function t(r){return r&&r.__esModule?r:{default:r}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(ri);var bp=ri.exports,zn={};function pr(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...n){return e(...n)||t(...n)}}function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},P.apply(this,arguments)}function Pt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function ni(e){if(!Pt(e))return e;const t={};return Object.keys(e).forEach(r=>{t[r]=ni(e[r])}),t}function ct(e,t,r={clone:!0}){const n=r.clone?P({},e):e;return Pt(e)&&Pt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Pt(t[o])&&o in e&&Pt(e[o])?n[o]=ct(e[o],t[o],r):r.clone?n[o]=Pt(t[o])?ni(t[o]):t[o]:n[o]=t[o])}),n}var lo={exports:{}},tn={exports:{}},pe={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ta;function vp(){if(Ta)return pe;Ta=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,f=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,u=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,O=e?Symbol.for("react.scope"):60119;function x(y){if(typeof y=="object"&&y!==null){var S=y.$$typeof;switch(S){case t:switch(y=y.type,y){case p:case f:case n:case a:case o:case v:return y;default:switch(y=y&&y.$$typeof,y){case c:case m:case h:case d:case s:return y;default:return S}}case r:return S}}}function E(y){return x(y)===f}return pe.AsyncMode=p,pe.ConcurrentMode=f,pe.ContextConsumer=c,pe.ContextProvider=s,pe.Element=t,pe.ForwardRef=m,pe.Fragment=n,pe.Lazy=h,pe.Memo=d,pe.Portal=r,pe.Profiler=a,pe.StrictMode=o,pe.Suspense=v,pe.isAsyncMode=function(y){return E(y)||x(y)===p},pe.isConcurrentMode=E,pe.isContextConsumer=function(y){return x(y)===c},pe.isContextProvider=function(y){return x(y)===s},pe.isElement=function(y){return typeof y=="object"&&y!==null&&y.$$typeof===t},pe.isForwardRef=function(y){return x(y)===m},pe.isFragment=function(y){return x(y)===n},pe.isLazy=function(y){return x(y)===h},pe.isMemo=function(y){return x(y)===d},pe.isPortal=function(y){return x(y)===r},pe.isProfiler=function(y){return x(y)===a},pe.isStrictMode=function(y){return x(y)===o},pe.isSuspense=function(y){return x(y)===v},pe.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===n||y===f||y===a||y===o||y===v||y===g||typeof y=="object"&&y!==null&&(y.$$typeof===h||y.$$typeof===d||y.$$typeof===s||y.$$typeof===c||y.$$typeof===m||y.$$typeof===b||y.$$typeof===w||y.$$typeof===O||y.$$typeof===u)},pe.typeOf=x,pe}var de={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sa;function yp(){return Sa||(Sa=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,f=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,u=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,O=e?Symbol.for("react.scope"):60119;function x(F){return typeof F=="string"||typeof F=="function"||F===n||F===f||F===a||F===o||F===v||F===g||typeof F=="object"&&F!==null&&(F.$$typeof===h||F.$$typeof===d||F.$$typeof===s||F.$$typeof===c||F.$$typeof===m||F.$$typeof===b||F.$$typeof===w||F.$$typeof===O||F.$$typeof===u)}function E(F){if(typeof F=="object"&&F!==null){var te=F.$$typeof;switch(te){case t:var M=F.type;switch(M){case p:case f:case n:case a:case o:case v:return M;default:var le=M&&M.$$typeof;switch(le){case c:case m:case h:case d:case s:return le;default:return te}}case r:return te}}}var y=p,S=f,C=c,I=s,R=t,$=m,N=n,_=h,D=d,z=r,G=a,A=o,H=v,ee=!1;function V(F){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),j(F)||E(F)===p}function j(F){return E(F)===f}function L(F){return E(F)===c}function q(F){return E(F)===s}function W(F){return typeof F=="object"&&F!==null&&F.$$typeof===t}function U(F){return E(F)===m}function K(F){return E(F)===n}function X(F){return E(F)===h}function J(F){return E(F)===d}function Y(F){return E(F)===r}function Z(F){return E(F)===a}function Q(F){return E(F)===o}function ie(F){return E(F)===v}de.AsyncMode=y,de.ConcurrentMode=S,de.ContextConsumer=C,de.ContextProvider=I,de.Element=R,de.ForwardRef=$,de.Fragment=N,de.Lazy=_,de.Memo=D,de.Portal=z,de.Profiler=G,de.StrictMode=A,de.Suspense=H,de.isAsyncMode=V,de.isConcurrentMode=j,de.isContextConsumer=L,de.isContextProvider=q,de.isElement=W,de.isForwardRef=U,de.isFragment=K,de.isLazy=X,de.isMemo=J,de.isPortal=Y,de.isProfiler=Z,de.isStrictMode=Q,de.isSuspense=ie,de.isValidElementType=x,de.typeOf=E}()),de}var Ca;function oi(){return Ca||(Ca=1,process.env.NODE_ENV==="production"?tn.exports=vp():tn.exports=yp()),tn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Un,ja;function wp(){if(ja)return Un;ja=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function n(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var s={},c=0;c<10;c++)s["_"+String.fromCharCode(c)]=c;var p=Object.getOwnPropertyNames(s).map(function(m){return s[m]});if(p.join("")!=="0123456789")return!1;var f={};return"abcdefghijklmnopqrst".split("").forEach(function(m){f[m]=m}),Object.keys(Object.assign({},f)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Un=o()?Object.assign:function(a,s){for(var c,p=n(a),f,m=1;m<arguments.length;m++){c=Object(arguments[m]);for(var v in c)t.call(c,v)&&(p[v]=c[v]);if(e){f=e(c);for(var g=0;g<f.length;g++)r.call(c,f[g])&&(p[f[g]]=c[f[g]])}}return p},Un}var Gn,Oa;function $o(){if(Oa)return Gn;Oa=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Gn=e,Gn}var Hn,Ra;function ai(){return Ra||(Ra=1,Hn=Function.call.bind(Object.prototype.hasOwnProperty)),Hn}var qn,Pa;function xp(){if(Pa)return qn;Pa=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=$o(),r={},n=ai();e=function(a){var s="Warning: "+a;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(a,s,c,p,f){if(process.env.NODE_ENV!=="production"){for(var m in a)if(n(a,m)){var v;try{if(typeof a[m]!="function"){var g=Error((p||"React class")+": "+c+" type `"+m+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[m]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw g.name="Invariant Violation",g}v=a[m](s,m,p,c,null,t)}catch(h){v=h}if(v&&!(v instanceof Error)&&e((p||"React class")+": type specification of "+c+" `"+m+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof v+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),v instanceof Error&&!(v.message in r)){r[v.message]=!0;var d=f?f():"";e("Failed "+c+" type: "+v.message+(d??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(r={})},qn=o,qn}var Wn,$a;function Ep(){if($a)return Wn;$a=1;var e=oi(),t=wp(),r=$o(),n=ai(),o=xp(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(c){var p="Warning: "+c;typeof console<"u"&&console.error(p);try{throw new Error(p)}catch{}});function s(){return null}return Wn=function(c,p){var f=typeof Symbol=="function"&&Symbol.iterator,m="@@iterator";function v(j){var L=j&&(f&&j[f]||j[m]);if(typeof L=="function")return L}var g="<<anonymous>>",d={array:w("array"),bigint:w("bigint"),bool:w("boolean"),func:w("function"),number:w("number"),object:w("object"),string:w("string"),symbol:w("symbol"),any:O(),arrayOf:x,element:E(),elementType:y(),instanceOf:S,node:$(),objectOf:I,oneOf:C,oneOfType:R,shape:_,exact:D};function h(j,L){return j===L?j!==0||1/j===1/L:j!==j&&L!==L}function u(j,L){this.message=j,this.data=L&&typeof L=="object"?L:{},this.stack=""}u.prototype=Error.prototype;function b(j){if(process.env.NODE_ENV!=="production")var L={},q=0;function W(K,X,J,Y,Z,Q,ie){if(Y=Y||g,Q=Q||J,ie!==r){if(p){var F=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw F.name="Invariant Violation",F}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var te=Y+":"+J;!L[te]&&q<3&&(a("You are manually calling a React.PropTypes validation function for the `"+Q+"` prop on `"+Y+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),L[te]=!0,q++)}}return X[J]==null?K?X[J]===null?new u("The "+Z+" `"+Q+"` is marked as required "+("in `"+Y+"`, but its value is `null`.")):new u("The "+Z+" `"+Q+"` is marked as required in "+("`"+Y+"`, but its value is `undefined`.")):null:j(X,J,Y,Z,Q)}var U=W.bind(null,!1);return U.isRequired=W.bind(null,!0),U}function w(j){function L(q,W,U,K,X,J){var Y=q[W],Z=A(Y);if(Z!==j){var Q=H(Y);return new u("Invalid "+K+" `"+X+"` of type "+("`"+Q+"` supplied to `"+U+"`, expected ")+("`"+j+"`."),{expectedType:j})}return null}return b(L)}function O(){return b(s)}function x(j){function L(q,W,U,K,X){if(typeof j!="function")return new u("Property `"+X+"` of component `"+U+"` has invalid PropType notation inside arrayOf.");var J=q[W];if(!Array.isArray(J)){var Y=A(J);return new u("Invalid "+K+" `"+X+"` of type "+("`"+Y+"` supplied to `"+U+"`, expected an array."))}for(var Z=0;Z<J.length;Z++){var Q=j(J,Z,U,K,X+"["+Z+"]",r);if(Q instanceof Error)return Q}return null}return b(L)}function E(){function j(L,q,W,U,K){var X=L[q];if(!c(X)){var J=A(X);return new u("Invalid "+U+" `"+K+"` of type "+("`"+J+"` supplied to `"+W+"`, expected a single ReactElement."))}return null}return b(j)}function y(){function j(L,q,W,U,K){var X=L[q];if(!e.isValidElementType(X)){var J=A(X);return new u("Invalid "+U+" `"+K+"` of type "+("`"+J+"` supplied to `"+W+"`, expected a single ReactElement type."))}return null}return b(j)}function S(j){function L(q,W,U,K,X){if(!(q[W]instanceof j)){var J=j.name||g,Y=V(q[W]);return new u("Invalid "+K+" `"+X+"` of type "+("`"+Y+"` supplied to `"+U+"`, expected ")+("instance of `"+J+"`."))}return null}return b(L)}function C(j){if(!Array.isArray(j))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),s;function L(q,W,U,K,X){for(var J=q[W],Y=0;Y<j.length;Y++)if(h(J,j[Y]))return null;var Z=JSON.stringify(j,function(ie,F){var te=H(F);return te==="symbol"?String(F):F});return new u("Invalid "+K+" `"+X+"` of value `"+String(J)+"` "+("supplied to `"+U+"`, expected one of "+Z+"."))}return b(L)}function I(j){function L(q,W,U,K,X){if(typeof j!="function")return new u("Property `"+X+"` of component `"+U+"` has invalid PropType notation inside objectOf.");var J=q[W],Y=A(J);if(Y!=="object")return new u("Invalid "+K+" `"+X+"` of type "+("`"+Y+"` supplied to `"+U+"`, expected an object."));for(var Z in J)if(n(J,Z)){var Q=j(J,Z,U,K,X+"."+Z,r);if(Q instanceof Error)return Q}return null}return b(L)}function R(j){if(!Array.isArray(j))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var L=0;L<j.length;L++){var q=j[L];if(typeof q!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ee(q)+" at index "+L+"."),s}function W(U,K,X,J,Y){for(var Z=[],Q=0;Q<j.length;Q++){var ie=j[Q],F=ie(U,K,X,J,Y,r);if(F==null)return null;F.data&&n(F.data,"expectedType")&&Z.push(F.data.expectedType)}var te=Z.length>0?", expected one of type ["+Z.join(", ")+"]":"";return new u("Invalid "+J+" `"+Y+"` supplied to "+("`"+X+"`"+te+"."))}return b(W)}function $(){function j(L,q,W,U,K){return z(L[q])?null:new u("Invalid "+U+" `"+K+"` supplied to "+("`"+W+"`, expected a ReactNode."))}return b(j)}function N(j,L,q,W,U){return new u((j||"React class")+": "+L+" type `"+q+"."+W+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+U+"`.")}function _(j){function L(q,W,U,K,X){var J=q[W],Y=A(J);if(Y!=="object")return new u("Invalid "+K+" `"+X+"` of type `"+Y+"` "+("supplied to `"+U+"`, expected `object`."));for(var Z in j){var Q=j[Z];if(typeof Q!="function")return N(U,K,X,Z,H(Q));var ie=Q(J,Z,U,K,X+"."+Z,r);if(ie)return ie}return null}return b(L)}function D(j){function L(q,W,U,K,X){var J=q[W],Y=A(J);if(Y!=="object")return new u("Invalid "+K+" `"+X+"` of type `"+Y+"` "+("supplied to `"+U+"`, expected `object`."));var Z=t({},q[W],j);for(var Q in Z){var ie=j[Q];if(n(j,Q)&&typeof ie!="function")return N(U,K,X,Q,H(ie));if(!ie)return new u("Invalid "+K+" `"+X+"` key `"+Q+"` supplied to `"+U+"`.\nBad object: "+JSON.stringify(q[W],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(j),null,"  "));var F=ie(J,Q,U,K,X+"."+Q,r);if(F)return F}return null}return b(L)}function z(j){switch(typeof j){case"number":case"string":case"undefined":return!0;case"boolean":return!j;case"object":if(Array.isArray(j))return j.every(z);if(j===null||c(j))return!0;var L=v(j);if(L){var q=L.call(j),W;if(L!==j.entries){for(;!(W=q.next()).done;)if(!z(W.value))return!1}else for(;!(W=q.next()).done;){var U=W.value;if(U&&!z(U[1]))return!1}}else return!1;return!0;default:return!1}}function G(j,L){return j==="symbol"?!0:L?L["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&L instanceof Symbol:!1}function A(j){var L=typeof j;return Array.isArray(j)?"array":j instanceof RegExp?"object":G(L,j)?"symbol":L}function H(j){if(typeof j>"u"||j===null)return""+j;var L=A(j);if(L==="object"){if(j instanceof Date)return"date";if(j instanceof RegExp)return"regexp"}return L}function ee(j){var L=H(j);switch(L){case"array":case"object":return"an "+L;case"boolean":case"date":case"regexp":return"a "+L;default:return L}}function V(j){return!j.constructor||!j.constructor.name?g:j.constructor.name}return d.checkPropTypes=o,d.resetWarningCache=o.resetWarningCache,d.PropTypes=d,d},Wn}var Xn,Ia;function kp(){if(Ia)return Xn;Ia=1;var e=$o();function t(){}function r(){}return r.resetWarningCache=t,Xn=function(){function n(s,c,p,f,m,v){if(v!==e){var g=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw g.name="Invariant Violation",g}}n.isRequired=n;function o(){return n}var a={array:n,bigint:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:o,element:n,elementType:n,instanceOf:o,node:n,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:r,resetWarningCache:t};return a.PropTypes=a,a},Xn}if(process.env.NODE_ENV!=="production"){var Np=oi(),Tp=!0;lo.exports=Ep()(Np.isElement,Tp)}else lo.exports=kp()();var Sp=lo.exports;const i=hp(Sp);function Cp(e){const{prototype:t={}}=e;return!!t.isReactComponent}function si(e,t,r,n,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let c;const p=a.type;return typeof p=="function"&&!Cp(p)&&(c="Did you accidentally use a plain function component for an element instead?"),c!==void 0?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const ii=pr(i.element,si);ii.isRequired=pr(i.element.isRequired,si);const Hr=ii;function jp(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Op(e,t,r,n,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let c;return typeof a=="function"&&!jp(a)&&(c="Did you accidentally provide a plain function component instead?"),c!==void 0?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Rp=pr(i.elementType,Op),Pp="exact-prop: ​";function li(e){return process.env.NODE_ENV==="production"?e:P({},e,{[Pp]:t=>{const r=Object.keys(t).filter(n=>!e.hasOwnProperty(n));return r.length>0?new Error(`The following props are not supported: ${r.map(n=>`\`${n}\``).join(", ")}. Please remove them.`):null}})}function tr(e){let t="https://mui.com/production-error/?code="+e;for(let r=1;r<arguments.length;r+=1)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var co={exports:{}},ue={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _a;function $p(){if(_a)return ue;_a=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function u(b){if(typeof b=="object"&&b!==null){var w=b.$$typeof;switch(w){case e:switch(b=b.type,b){case r:case o:case n:case f:case m:return b;default:switch(b=b&&b.$$typeof,b){case c:case s:case p:case g:case v:case a:return b;default:return w}}case t:return w}}}return ue.ContextConsumer=s,ue.ContextProvider=a,ue.Element=e,ue.ForwardRef=p,ue.Fragment=r,ue.Lazy=g,ue.Memo=v,ue.Portal=t,ue.Profiler=o,ue.StrictMode=n,ue.Suspense=f,ue.SuspenseList=m,ue.isAsyncMode=function(){return!1},ue.isConcurrentMode=function(){return!1},ue.isContextConsumer=function(b){return u(b)===s},ue.isContextProvider=function(b){return u(b)===a},ue.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===e},ue.isForwardRef=function(b){return u(b)===p},ue.isFragment=function(b){return u(b)===r},ue.isLazy=function(b){return u(b)===g},ue.isMemo=function(b){return u(b)===v},ue.isPortal=function(b){return u(b)===t},ue.isProfiler=function(b){return u(b)===o},ue.isStrictMode=function(b){return u(b)===n},ue.isSuspense=function(b){return u(b)===f},ue.isSuspenseList=function(b){return u(b)===m},ue.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===r||b===o||b===n||b===f||b===m||b===d||typeof b=="object"&&b!==null&&(b.$$typeof===g||b.$$typeof===v||b.$$typeof===a||b.$$typeof===s||b.$$typeof===p||b.$$typeof===h||b.getModuleId!==void 0)},ue.typeOf=u,ue}var fe={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ma;function Ip(){return Ma||(Ma=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h=!1,u=!1,b=!1,w=!1,O=!1,x;x=Symbol.for("react.module.reference");function E(M){return!!(typeof M=="string"||typeof M=="function"||M===r||M===o||O||M===n||M===f||M===m||w||M===d||h||u||b||typeof M=="object"&&M!==null&&(M.$$typeof===g||M.$$typeof===v||M.$$typeof===a||M.$$typeof===s||M.$$typeof===p||M.$$typeof===x||M.getModuleId!==void 0))}function y(M){if(typeof M=="object"&&M!==null){var le=M.$$typeof;switch(le){case e:var Te=M.type;switch(Te){case r:case o:case n:case f:case m:return Te;default:var Pe=Te&&Te.$$typeof;switch(Pe){case c:case s:case p:case g:case v:case a:return Pe;default:return le}}case t:return le}}}var S=s,C=a,I=e,R=p,$=r,N=g,_=v,D=t,z=o,G=n,A=f,H=m,ee=!1,V=!1;function j(M){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function L(M){return V||(V=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function q(M){return y(M)===s}function W(M){return y(M)===a}function U(M){return typeof M=="object"&&M!==null&&M.$$typeof===e}function K(M){return y(M)===p}function X(M){return y(M)===r}function J(M){return y(M)===g}function Y(M){return y(M)===v}function Z(M){return y(M)===t}function Q(M){return y(M)===o}function ie(M){return y(M)===n}function F(M){return y(M)===f}function te(M){return y(M)===m}fe.ContextConsumer=S,fe.ContextProvider=C,fe.Element=I,fe.ForwardRef=R,fe.Fragment=$,fe.Lazy=N,fe.Memo=_,fe.Portal=D,fe.Profiler=z,fe.StrictMode=G,fe.Suspense=A,fe.SuspenseList=H,fe.isAsyncMode=j,fe.isConcurrentMode=L,fe.isContextConsumer=q,fe.isContextProvider=W,fe.isElement=U,fe.isForwardRef=K,fe.isFragment=X,fe.isLazy=J,fe.isMemo=Y,fe.isPortal=Z,fe.isProfiler=Q,fe.isStrictMode=ie,fe.isSuspense=F,fe.isSuspenseList=te,fe.isValidElementType=E,fe.typeOf=y}()),fe}process.env.NODE_ENV==="production"?co.exports=$p():co.exports=Ip();var un=co.exports;const _p=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Mp(e){const t=`${e}`.match(_p);return t&&t[1]||""}function ci(e,t=""){return e.displayName||e.name||Mp(e)||t}function Da(e,t,r){const n=ci(t);return e.displayName||(n!==""?`${r}(${n})`:r)}function Dp(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return ci(e,"Component");if(typeof e=="object")switch(e.$$typeof){case un.ForwardRef:return Da(e,e.render,"ForwardRef");case un.Memo:return Da(e,e.type,"memo");default:return}}}function pt(e,t,r,n,o){if(process.env.NODE_ENV==="production")return null;const a=e[t],s=o||t;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an HTMLElement.`):null}const Ap=i.oneOfType([i.func,i.object]),Io=Ap;function tt(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":tr(7));return e.charAt(0).toUpperCase()+e.slice(1)}function po(...e){return e.reduce((t,r)=>r==null?t:function(...o){t.apply(this,o),r.apply(this,o)},()=>{})}function pi(e,t=166){let r;function n(...o){const a=()=>{e.apply(this,o)};clearTimeout(r),r=setTimeout(a,t)}return n.clear=()=>{clearTimeout(r)},n}function Lp(e,t){return process.env.NODE_ENV==="production"?()=>null:(r,n,o,a,s)=>{const c=o||"<<anonymous>>",p=s||n;return typeof r[n]<"u"?new Error(`The ${a} \`${p}\` of \`${c}\` is deprecated. ${t}`):null}}function Bp(e,t){var r,n;return T.isValidElement(e)&&t.indexOf((r=e.type.muiName)!=null?r:(n=e.type)==null||(n=n._payload)==null||(n=n.value)==null?void 0:n.muiName)!==-1}function Oe(e){return e&&e.ownerDocument||document}function rr(e){return Oe(e).defaultView||window}function Fp(e,t){if(process.env.NODE_ENV==="production")return()=>null;const r=t?P({},t.propTypes):null;return o=>(a,s,c,p,f,...m)=>{const v=f||s,g=r==null?void 0:r[v];if(g){const d=g(a,s,c,p,f,...m);if(d)return d}return typeof a[s]<"u"&&!a[o]?new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function fn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Vp=typeof window<"u"?T.useLayoutEffect:T.useEffect,Lt=Vp;let Aa=0;function zp(e){const[t,r]=T.useState(e),n=e||t;return T.useEffect(()=>{t==null&&(Aa+=1,r(`mui-${Aa}`))},[t]),n}const La=T["useId".toString()];function di(e){if(La!==void 0){const t=La();return e??t}return zp(e)}function Up(e,t,r,n,o){if(process.env.NODE_ENV==="production")return null;const a=o||t;return typeof e[t]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function ui({controlled:e,default:t,name:r,state:n="value"}){const{current:o}=T.useRef(e!==void 0),[a,s]=T.useState(t),c=o?e:a;if(process.env.NODE_ENV!=="production"){T.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${n} state of ${r} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${r} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[n,r,e]);const{current:f}=T.useRef(t);T.useEffect(()=>{!o&&f!==t&&console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join(`
`))},[JSON.stringify(t)])}const p=T.useCallback(f=>{o||s(f)},[]);return[c,p]}function Mr(e){const t=T.useRef(e);return Lt(()=>{t.current=e}),T.useRef((...r)=>(0,t.current)(...r)).current}function We(...e){return T.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(r=>{fn(r,t)})},e)}const Ba={};function Gp(e,t){const r=T.useRef(Ba);return r.current===Ba&&(r.current=e(t)),r}const Hp=[];function qp(e){T.useEffect(e,Hp)}class qr{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new qr}start(t,r){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,r()},t)}}function Sr(){const e=Gp(qr.create).current;return qp(e.disposeEffect),e}let Nn=!0,uo=!1;const Wp=new qr,Xp={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Kp(e){const{type:t,tagName:r}=e;return!!(r==="INPUT"&&Xp[t]&&!e.readOnly||r==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Yp(e){e.metaKey||e.altKey||e.ctrlKey||(Nn=!0)}function Kn(){Nn=!1}function Jp(){this.visibilityState==="hidden"&&uo&&(Nn=!0)}function Zp(e){e.addEventListener("keydown",Yp,!0),e.addEventListener("mousedown",Kn,!0),e.addEventListener("pointerdown",Kn,!0),e.addEventListener("touchstart",Kn,!0),e.addEventListener("visibilitychange",Jp,!0)}function Qp(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Nn||Kp(t)}function fi(){const e=T.useCallback(o=>{o!=null&&Zp(o.ownerDocument)},[]),t=T.useRef(!1);function r(){return t.current?(uo=!0,Wp.start(100,()=>{uo=!1}),t.current=!1,!0):!1}function n(o){return Qp(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:n,onBlur:r,ref:e}}function mi(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function ed(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function td(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const rd=Number.isInteger||td;function hi(e,t,r,n){const o=e[t];if(o==null||!rd(o)){const a=ed(o);return new RangeError(`Invalid ${n} \`${t}\` of type \`${a}\` supplied to \`${r}\`, expected \`integer\`.`)}return null}function gi(e,t,...r){return e[t]===void 0?null:hi(e,t,...r)}function fo(){return null}gi.isRequired=hi;fo.isRequired=fo;const bi=process.env.NODE_ENV==="production"?fo:gi;function vi(e,t){const r=P({},t);return Object.keys(e).forEach(n=>{if(n.toString().match(/^(components|slots)$/))r[n]=P({},e[n],r[n]);else if(n.toString().match(/^(componentsProps|slotProps)$/)){const o=e[n]||{},a=t[n];r[n]={},!a||!Object.keys(a)?r[n]=o:!o||!Object.keys(o)?r[n]=a:(r[n]=P({},a),Object.keys(o).forEach(s=>{r[n][s]=vi(o[s],a[s])}))}else r[n]===void 0&&(r[n]=e[n])}),r}function ft(e,t,r=void 0){const n={};return Object.keys(e).forEach(o=>{n[o]=e[o].reduce((a,s)=>{if(s){const c=t(s);c!==""&&a.push(c),r&&r[s]&&a.push(r[s])}return a},[]).join(" ")}),n}const Fa=e=>e,nd=()=>{let e=Fa;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Fa}}},od=nd(),yi=od,wi={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function nt(e,t,r="Mui"){const n=wi[t];return n?`${r}-${n}`:`${yi.generate(e)}-${t}`}function xt(e,t,r="Mui"){const n={};return t.forEach(o=>{n[o]=nt(e,o,r)}),n}function ad(e,t=Number.MIN_SAFE_INTEGER,r=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,r))}function he(e,t){if(e==null)return{};var r={},n=Object.keys(e),o,a;for(a=0;a<n.length;a++)o=n[a],!(t.indexOf(o)>=0)&&(r[o]=e[o]);return r}const sd=["values","unit","step"],id=e=>{const t=Object.keys(e).map(r=>({key:r,val:e[r]}))||[];return t.sort((r,n)=>r.val-n.val),t.reduce((r,n)=>P({},r,{[n.key]:n.val}),{})};function ld(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:r="px",step:n=5}=e,o=he(e,sd),a=id(t),s=Object.keys(a);function c(g){return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${r})`}function p(g){return`@media (max-width:${(typeof t[g]=="number"?t[g]:g)-n/100}${r})`}function f(g,d){const h=s.indexOf(d);return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${r}) and (max-width:${(h!==-1&&typeof t[s[h]]=="number"?t[s[h]]:d)-n/100}${r})`}function m(g){return s.indexOf(g)+1<s.length?f(g,s[s.indexOf(g)+1]):c(g)}function v(g){const d=s.indexOf(g);return d===0?c(s[1]):d===s.length-1?p(s[d]):f(g,s[s.indexOf(g)+1]).replace("@media","@media not all and")}return P({keys:s,values:a,up:c,down:p,between:f,only:m,not:v,unit:r},o)}const cd={borderRadius:4},pd=cd,dd=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.string,i.object,i.array]):{},Et=dd;function Rr(e,t){return t?ct(e,t,{clone:!1}):e}const _o={xs:0,sm:600,md:900,lg:1200,xl:1536},Va={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${_o[e]}px)`};function dt(e,t,r){const n=e.theme||{};if(Array.isArray(t)){const a=n.breakpoints||Va;return t.reduce((s,c,p)=>(s[a.up(a.keys[p])]=r(t[p]),s),{})}if(typeof t=="object"){const a=n.breakpoints||Va;return Object.keys(t).reduce((s,c)=>{if(Object.keys(a.values||_o).indexOf(c)!==-1){const p=a.up(c);s[p]=r(t[c],c)}else{const p=c;s[p]=t[p]}return s},{})}return r(t)}function ud(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((n,o)=>{const a=e.up(o);return n[a]={},n},{}))||{}}function fd(e,t){return e.reduce((r,n)=>{const o=r[n];return(!o||Object.keys(o).length===0)&&delete r[n],r},t)}function Tn(e,t,r=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&r){const n=`vars.${t}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(n!=null)return n}return t.split(".").reduce((n,o)=>n&&n[o]!=null?n[o]:null,e)}function mn(e,t,r,n=r){let o;return typeof e=="function"?o=e(r):Array.isArray(e)?o=e[r]||n:o=Tn(e,r)||n,t&&(o=t(o,n,e)),o}function ke(e){const{prop:t,cssProperty:r=e.prop,themeKey:n,transform:o}=e,a=s=>{if(s[t]==null)return null;const c=s[t],p=s.theme,f=Tn(p,n)||{};return dt(s,c,v=>{let g=mn(f,o,v);return v===g&&typeof v=="string"&&(g=mn(f,o,`${t}${v==="default"?"":tt(v)}`,v)),r===!1?g:{[r]:g}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[t]:Et}:{},a.filterProps=[t],a}function md(e){const t={};return r=>(t[r]===void 0&&(t[r]=e(r)),t[r])}const hd={m:"margin",p:"padding"},gd={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},za={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},bd=md(e=>{if(e.length>2)if(za[e])e=za[e];else return[e];const[t,r]=e.split(""),n=hd[t],o=gd[r]||"";return Array.isArray(o)?o.map(a=>n+a):[n+o]}),Sn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Cn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],vd=[...Sn,...Cn];function Wr(e,t,r,n){var o;const a=(o=Tn(e,t,!1))!=null?o:r;return typeof a=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${n} argument to be a number or a string, got ${s}.`),a*s):Array.isArray(a)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>a.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${s} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),a[s]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function xi(e){return Wr(e,"spacing",8,"spacing")}function Xr(e,t){if(typeof t=="string"||t==null)return t;const r=Math.abs(t),n=e(r);return t>=0?n:typeof n=="number"?-n:`-${n}`}function yd(e,t){return r=>e.reduce((n,o)=>(n[o]=Xr(t,r),n),{})}function wd(e,t,r,n){if(t.indexOf(r)===-1)return null;const o=bd(r),a=yd(o,n),s=e[r];return dt(e,s,a)}function Ei(e,t){const r=xi(e.theme);return Object.keys(e).map(n=>wd(e,t,n,r)).reduce(Rr,{})}function ye(e){return Ei(e,Sn)}ye.propTypes=process.env.NODE_ENV!=="production"?Sn.reduce((e,t)=>(e[t]=Et,e),{}):{};ye.filterProps=Sn;function we(e){return Ei(e,Cn)}we.propTypes=process.env.NODE_ENV!=="production"?Cn.reduce((e,t)=>(e[t]=Et,e),{}):{};we.filterProps=Cn;process.env.NODE_ENV!=="production"&&vd.reduce((e,t)=>(e[t]=Et,e),{});function xd(e=8){if(e.mui)return e;const t=xi({spacing:e}),r=(...n)=>(process.env.NODE_ENV!=="production"&&(n.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)),(n.length===0?[1]:n).map(a=>{const s=t(a);return typeof s=="number"?`${s}px`:s}).join(" "));return r.mui=!0,r}function jn(...e){const t=e.reduce((n,o)=>(o.filterProps.forEach(a=>{n[a]=o}),n),{}),r=n=>Object.keys(n).reduce((o,a)=>t[a]?Rr(o,t[a](n)):o,{});return r.propTypes=process.env.NODE_ENV!=="production"?e.reduce((n,o)=>Object.assign(n,o.propTypes),{}):{},r.filterProps=e.reduce((n,o)=>n.concat(o.filterProps),[]),r}function He(e){return typeof e!="number"?e:`${e}px solid`}function Ye(e,t){return ke({prop:e,themeKey:"borders",transform:t})}const Ed=Ye("border",He),kd=Ye("borderTop",He),Nd=Ye("borderRight",He),Td=Ye("borderBottom",He),Sd=Ye("borderLeft",He),Cd=Ye("borderColor"),jd=Ye("borderTopColor"),Od=Ye("borderRightColor"),Rd=Ye("borderBottomColor"),Pd=Ye("borderLeftColor"),$d=Ye("outline",He),Id=Ye("outlineColor"),On=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Wr(e.theme,"shape.borderRadius",4,"borderRadius"),r=n=>({borderRadius:Xr(t,n)});return dt(e,e.borderRadius,r)}return null};On.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:Et}:{};On.filterProps=["borderRadius"];jn(Ed,kd,Nd,Td,Sd,Cd,jd,Od,Rd,Pd,On,$d,Id);const Rn=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Wr(e.theme,"spacing",8,"gap"),r=n=>({gap:Xr(t,n)});return dt(e,e.gap,r)}return null};Rn.propTypes=process.env.NODE_ENV!=="production"?{gap:Et}:{};Rn.filterProps=["gap"];const Pn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Wr(e.theme,"spacing",8,"columnGap"),r=n=>({columnGap:Xr(t,n)});return dt(e,e.columnGap,r)}return null};Pn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:Et}:{};Pn.filterProps=["columnGap"];const $n=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Wr(e.theme,"spacing",8,"rowGap"),r=n=>({rowGap:Xr(t,n)});return dt(e,e.rowGap,r)}return null};$n.propTypes=process.env.NODE_ENV!=="production"?{rowGap:Et}:{};$n.filterProps=["rowGap"];const _d=ke({prop:"gridColumn"}),Md=ke({prop:"gridRow"}),Dd=ke({prop:"gridAutoFlow"}),Ad=ke({prop:"gridAutoColumns"}),Ld=ke({prop:"gridAutoRows"}),Bd=ke({prop:"gridTemplateColumns"}),Fd=ke({prop:"gridTemplateRows"}),Vd=ke({prop:"gridTemplateAreas"}),zd=ke({prop:"gridArea"});jn(Rn,Pn,$n,_d,Md,Dd,Ad,Ld,Bd,Fd,Vd,zd);function Jt(e,t){return t==="grey"?t:e}const Ud=ke({prop:"color",themeKey:"palette",transform:Jt}),Gd=ke({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Jt}),Hd=ke({prop:"backgroundColor",themeKey:"palette",transform:Jt});jn(Ud,Gd,Hd);function Ve(e){return e<=1&&e!==0?`${e*100}%`:e}const qd=ke({prop:"width",transform:Ve}),Mo=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=r=>{var n,o;const a=((n=e.theme)==null||(n=n.breakpoints)==null||(n=n.values)==null?void 0:n[r])||_o[r];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:Ve(r)}};return dt(e,e.maxWidth,t)}return null};Mo.filterProps=["maxWidth"];const Wd=ke({prop:"minWidth",transform:Ve}),Xd=ke({prop:"height",transform:Ve}),Kd=ke({prop:"maxHeight",transform:Ve}),Yd=ke({prop:"minHeight",transform:Ve});ke({prop:"size",cssProperty:"width",transform:Ve});ke({prop:"size",cssProperty:"height",transform:Ve});const Jd=ke({prop:"boxSizing"});jn(qd,Mo,Wd,Xd,Kd,Yd,Jd);const Zd={border:{themeKey:"borders",transform:He},borderTop:{themeKey:"borders",transform:He},borderRight:{themeKey:"borders",transform:He},borderBottom:{themeKey:"borders",transform:He},borderLeft:{themeKey:"borders",transform:He},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:He},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:On},color:{themeKey:"palette",transform:Jt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Jt},backgroundColor:{themeKey:"palette",transform:Jt},p:{style:we},pt:{style:we},pr:{style:we},pb:{style:we},pl:{style:we},px:{style:we},py:{style:we},padding:{style:we},paddingTop:{style:we},paddingRight:{style:we},paddingBottom:{style:we},paddingLeft:{style:we},paddingX:{style:we},paddingY:{style:we},paddingInline:{style:we},paddingInlineStart:{style:we},paddingInlineEnd:{style:we},paddingBlock:{style:we},paddingBlockStart:{style:we},paddingBlockEnd:{style:we},m:{style:ye},mt:{style:ye},mr:{style:ye},mb:{style:ye},ml:{style:ye},mx:{style:ye},my:{style:ye},margin:{style:ye},marginTop:{style:ye},marginRight:{style:ye},marginBottom:{style:ye},marginLeft:{style:ye},marginX:{style:ye},marginY:{style:ye},marginInline:{style:ye},marginInlineStart:{style:ye},marginInlineEnd:{style:ye},marginBlock:{style:ye},marginBlockStart:{style:ye},marginBlockEnd:{style:ye},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Rn},rowGap:{style:$n},columnGap:{style:Pn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ve},maxWidth:{style:Mo},minWidth:{transform:Ve},height:{transform:Ve},maxHeight:{transform:Ve},minHeight:{transform:Ve},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Do=Zd;function Qd(...e){const t=e.reduce((n,o)=>n.concat(Object.keys(o)),[]),r=new Set(t);return e.every(n=>r.size===Object.keys(n).length)}function eu(e,t){return typeof e=="function"?e(t):e}function tu(){function e(r,n,o,a){const s={[r]:n,theme:o},c=a[r];if(!c)return{[r]:n};const{cssProperty:p=r,themeKey:f,transform:m,style:v}=c;if(n==null)return null;if(f==="typography"&&n==="inherit")return{[r]:n};const g=Tn(o,f)||{};return v?v(s):dt(s,n,h=>{let u=mn(g,m,h);return h===u&&typeof h=="string"&&(u=mn(g,m,`${r}${h==="default"?"":tt(h)}`,h)),p===!1?u:{[p]:u}})}function t(r){var n;const{sx:o,theme:a={}}=r||{};if(!o)return null;const s=(n=a.unstable_sxConfig)!=null?n:Do;function c(p){let f=p;if(typeof p=="function")f=p(a);else if(typeof p!="object")return p;if(!f)return null;const m=ud(a.breakpoints),v=Object.keys(m);let g=m;return Object.keys(f).forEach(d=>{const h=eu(f[d],a);if(h!=null)if(typeof h=="object")if(s[d])g=Rr(g,e(d,h,a,s));else{const u=dt({theme:a},h,b=>({[d]:b}));Qd(u,h)?g[d]=t({sx:h,theme:a}):g=Rr(g,u)}else g=Rr(g,e(d,h,a,s))}),fd(v,g)}return Array.isArray(o)?o.map(c):c(o)}return t}const ki=tu();ki.filterProps=["sx"];const Ao=ki;function ru(e,t){const r=this;return r.vars&&typeof r.getColorSchemeSelector=="function"?{[r.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:r.palette.mode===e?t:{}}const nu=["breakpoints","palette","spacing","shape"];function Lo(e={},...t){const{breakpoints:r={},palette:n={},spacing:o,shape:a={}}=e,s=he(e,nu),c=ld(r),p=xd(o);let f=ct({breakpoints:c,direction:"ltr",components:{},palette:P({mode:"light"},n),spacing:p,shape:P({},pd,a)},s);return f.applyStyles=ru,f=t.reduce((m,v)=>ct(m,v),f),f.unstable_sxConfig=P({},Do,s==null?void 0:s.unstable_sxConfig),f.unstable_sx=function(v){return Ao({sx:v,theme:this})},f}function ou(e){return Object.keys(e).length===0}function Ni(e=null){const t=T.useContext(ao.ThemeContext);return!t||ou(t)?e:t}const au=Lo();function Ti(e=au){return Ni(e)}const su=["ownerState"],iu=["variants"],lu=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function cu(e){return Object.keys(e).length===0}function pu(e){return typeof e=="string"&&e.charCodeAt(0)>96}function sn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const du=Lo(),Ua=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function rn({defaultTheme:e,theme:t,themeId:r}){return cu(t)?e:t[r]||t}function uu(e){return e?(t,r)=>r[e]:null}function ln(e,t){let{ownerState:r}=t,n=he(t,su);const o=typeof e=="function"?e(P({ownerState:r},n)):e;if(Array.isArray(o))return o.flatMap(a=>ln(a,P({ownerState:r},n)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let c=he(o,iu);return a.forEach(p=>{let f=!0;typeof p.props=="function"?f=p.props(P({ownerState:r},n,r)):Object.keys(p.props).forEach(m=>{(r==null?void 0:r[m])!==p.props[m]&&n[m]!==p.props[m]&&(f=!1)}),f&&(Array.isArray(c)||(c=[c]),c.push(typeof p.style=="function"?p.style(P({ownerState:r},n,r)):p.style))}),c}return o}function fu(e={}){const{themeId:t,defaultTheme:r=du,rootShouldForwardProp:n=sn,slotShouldForwardProp:o=sn}=e,a=s=>Ao(P({},s,{theme:rn(P({},s,{defaultTheme:r,themeId:t}))}));return a.__mui_systemSx=!0,(s,c={})=>{ao.internal_processStyles(s,y=>y.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:p,slot:f,skipVariantsResolver:m,skipSx:v,overridesResolver:g=uu(Ua(f))}=c,d=he(c,lu),h=m!==void 0?m:f&&f!=="Root"&&f!=="root"||!1,u=v||!1;let b;process.env.NODE_ENV!=="production"&&p&&(b=`${p}-${Ua(f||"Root")}`);let w=sn;f==="Root"||f==="root"?w=n:f?w=o:pu(s)&&(w=void 0);const O=ao(s,P({shouldForwardProp:w,label:b},d)),x=y=>typeof y=="function"&&y.__emotion_real!==y||Pt(y)?S=>ln(y,P({},S,{theme:rn({theme:S.theme,defaultTheme:r,themeId:t})})):y,E=(y,...S)=>{let C=x(y);const I=S?S.map(x):[];p&&g&&I.push(N=>{const _=rn(P({},N,{defaultTheme:r,themeId:t}));if(!_.components||!_.components[p]||!_.components[p].styleOverrides)return null;const D=_.components[p].styleOverrides,z={};return Object.entries(D).forEach(([G,A])=>{z[G]=ln(A,P({},N,{theme:_}))}),g(N,z)}),p&&!h&&I.push(N=>{var _;const D=rn(P({},N,{defaultTheme:r,themeId:t})),z=D==null||(_=D.components)==null||(_=_[p])==null?void 0:_.variants;return ln({variants:z},P({},N,{theme:D}))}),u||I.push(a);const R=I.length-S.length;if(Array.isArray(y)&&R>0){const N=new Array(R).fill("");C=[...y,...N],C.raw=[...y.raw,...N]}const $=O(C,...I);if(process.env.NODE_ENV!=="production"){let N;p&&(N=`${p}${tt(f||"")}`),N===void 0&&(N=`Styled(${Dp(s)})`),$.displayName=N}return s.muiName&&($.muiName=s.muiName),$};return O.withConfig&&(E.withConfig=O.withConfig),E}}function mu(e){const{theme:t,name:r,props:n}=e;return!t||!t.components||!t.components[r]||!t.components[r].defaultProps?n:vi(t.components[r].defaultProps,n)}function hu({props:e,name:t,defaultTheme:r,themeId:n}){let o=Ti(r);return n&&(o=o[n]||o),mu({theme:o,name:t,props:e})}function Bo(e,t=0,r=1){return process.env.NODE_ENV!=="production"&&(e<t||e>r)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`),ad(e,t,r)}function gu(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let r=e.match(t);return r&&r[0].length===1&&(r=r.map(n=>n+n)),r?`rgb${r.length===4?"a":""}(${r.map((n,o)=>o<3?parseInt(n,16):Math.round(parseInt(n,16)/255*1e3)/1e3).join(", ")})`:""}function Bt(e){if(e.type)return e;if(e.charAt(0)==="#")return Bt(gu(e));const t=e.indexOf("("),r=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:tr(9,e));let n=e.substring(t+1,e.length-1),o;if(r==="color"){if(n=n.split(" "),o=n.shift(),n.length===4&&n[3].charAt(0)==="/"&&(n[3]=n[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:tr(10,o))}else n=n.split(",");return n=n.map(a=>parseFloat(a)),{type:r,values:n,colorSpace:o}}function In(e){const{type:t,colorSpace:r}=e;let{values:n}=e;return t.indexOf("rgb")!==-1?n=n.map((o,a)=>a<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(n[1]=`${n[1]}%`,n[2]=`${n[2]}%`),t.indexOf("color")!==-1?n=`${r} ${n.join(" ")}`:n=`${n.join(", ")}`,`${t}(${n})`}function bu(e){e=Bt(e);const{values:t}=e,r=t[0],n=t[1]/100,o=t[2]/100,a=n*Math.min(o,1-o),s=(f,m=(f+r/30)%12)=>o-a*Math.max(Math.min(m-3,9-m,1),-1);let c="rgb";const p=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(c+="a",p.push(t[3])),In({type:c,values:p})}function Ga(e){e=Bt(e);let t=e.type==="hsl"||e.type==="hsla"?Bt(bu(e)).values:e.values;return t=t.map(r=>(e.type!=="color"&&(r/=255),r<=.03928?r/12.92:((r+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Ha(e,t){const r=Ga(e),n=Ga(t);return(Math.max(r,n)+.05)/(Math.min(r,n)+.05)}function hn(e,t){return e=Bt(e),t=Bo(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,In(e)}function vu(e,t){if(e=Bt(e),t=Bo(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]*=1-t;return In(e)}function yu(e,t){if(e=Bt(e),t=Bo(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(255-e.values[r])*t;else if(e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(1-e.values[r])*t;return In(e)}function wu(e,t){return P({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const xu={black:"#000",white:"#fff"},Dr=xu,Eu={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},ku=Eu,Nu={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ut=Nu,Tu={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Gt=Tu,Su={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},yr=Su,Cu={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ht=Cu,ju={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},qt=ju,Ou={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Wt=Ou,Ru=["mode","contrastThreshold","tonalOffset"],qa={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Dr.white,default:Dr.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Yn={text:{primary:Dr.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Dr.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Wa(e,t,r,n){const o=n.light||n,a=n.dark||n*1.5;e[t]||(e.hasOwnProperty(r)?e[t]=e[r]:t==="light"?e.light=yu(e.main,o):t==="dark"&&(e.dark=vu(e.main,a)))}function Pu(e="light"){return e==="dark"?{main:Ht[200],light:Ht[50],dark:Ht[400]}:{main:Ht[700],light:Ht[400],dark:Ht[800]}}function $u(e="light"){return e==="dark"?{main:Ut[200],light:Ut[50],dark:Ut[400]}:{main:Ut[500],light:Ut[300],dark:Ut[700]}}function Iu(e="light"){return e==="dark"?{main:Gt[500],light:Gt[300],dark:Gt[700]}:{main:Gt[700],light:Gt[400],dark:Gt[800]}}function _u(e="light"){return e==="dark"?{main:qt[400],light:qt[300],dark:qt[700]}:{main:qt[700],light:qt[500],dark:qt[900]}}function Mu(e="light"){return e==="dark"?{main:Wt[400],light:Wt[300],dark:Wt[700]}:{main:Wt[800],light:Wt[500],dark:Wt[900]}}function Du(e="light"){return e==="dark"?{main:yr[400],light:yr[300],dark:yr[700]}:{main:"#ed6c02",light:yr[500],dark:yr[900]}}function Au(e){const{mode:t="light",contrastThreshold:r=3,tonalOffset:n=.2}=e,o=he(e,Ru),a=e.primary||Pu(t),s=e.secondary||$u(t),c=e.error||Iu(t),p=e.info||_u(t),f=e.success||Mu(t),m=e.warning||Du(t);function v(u){const b=Ha(u,Yn.text.primary)>=r?Yn.text.primary:qa.text.primary;if(process.env.NODE_ENV!=="production"){const w=Ha(u,b);w<3&&console.error([`MUI: The contrast ratio of ${w}:1 for ${b} on ${u}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return b}const g=({color:u,name:b,mainShade:w=500,lightShade:O=300,darkShade:x=700})=>{if(u=P({},u),!u.main&&u[w]&&(u.main=u[w]),!u.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${w}\` property.`:tr(11,b?` (${b})`:"",w));if(typeof u.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(u.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:tr(12,b?` (${b})`:"",JSON.stringify(u.main)));return Wa(u,"light",O,n),Wa(u,"dark",x,n),u.contrastText||(u.contrastText=v(u.main)),u},d={dark:Yn,light:qa};return process.env.NODE_ENV!=="production"&&(d[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),ct(P({common:P({},Dr),mode:t,primary:g({color:a,name:"primary"}),secondary:g({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:g({color:c,name:"error"}),warning:g({color:m,name:"warning"}),info:g({color:p,name:"info"}),success:g({color:f,name:"success"}),grey:ku,contrastThreshold:r,getContrastText:v,augmentColor:g,tonalOffset:n},d[t]),o)}const Lu=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Bu(e){return Math.round(e*1e5)/1e5}const Xa={textTransform:"uppercase"},Ka='"Roboto", "Helvetica", "Arial", sans-serif';function Fu(e,t){const r=typeof t=="function"?t(e):t,{fontFamily:n=Ka,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:s=400,fontWeightMedium:c=500,fontWeightBold:p=700,htmlFontSize:f=16,allVariants:m,pxToRem:v}=r,g=he(r,Lu);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof f!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const d=o/14,h=v||(w=>`${w/f*d}rem`),u=(w,O,x,E,y)=>P({fontFamily:n,fontWeight:w,fontSize:h(O),lineHeight:x},n===Ka?{letterSpacing:`${Bu(E/O)}em`}:{},y,m),b={h1:u(a,96,1.167,-1.5),h2:u(a,60,1.2,-.5),h3:u(s,48,1.167,0),h4:u(s,34,1.235,.25),h5:u(s,24,1.334,0),h6:u(c,20,1.6,.15),subtitle1:u(s,16,1.75,.15),subtitle2:u(c,14,1.57,.1),body1:u(s,16,1.5,.15),body2:u(s,14,1.43,.15),button:u(c,14,1.75,.4,Xa),caption:u(s,12,1.66,.4),overline:u(s,12,2.66,1,Xa),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return ct(P({htmlFontSize:f,pxToRem:h,fontFamily:n,fontSize:o,fontWeightLight:a,fontWeightRegular:s,fontWeightMedium:c,fontWeightBold:p},b),g,{clone:!1})}const Vu=.2,zu=.14,Uu=.12;function be(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Vu})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${zu})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Uu})`].join(",")}const Gu=["none",be(0,2,1,-1,0,1,1,0,0,1,3,0),be(0,3,1,-2,0,2,2,0,0,1,5,0),be(0,3,3,-2,0,3,4,0,0,1,8,0),be(0,2,4,-1,0,4,5,0,0,1,10,0),be(0,3,5,-1,0,5,8,0,0,1,14,0),be(0,3,5,-1,0,6,10,0,0,1,18,0),be(0,4,5,-2,0,7,10,1,0,2,16,1),be(0,5,5,-3,0,8,10,1,0,3,14,2),be(0,5,6,-3,0,9,12,1,0,3,16,2),be(0,6,6,-3,0,10,14,1,0,4,18,3),be(0,6,7,-4,0,11,15,1,0,4,20,3),be(0,7,8,-4,0,12,17,2,0,5,22,4),be(0,7,8,-4,0,13,19,2,0,5,24,4),be(0,7,9,-4,0,14,21,2,0,5,26,4),be(0,8,9,-5,0,15,22,2,0,6,28,5),be(0,8,10,-5,0,16,24,2,0,6,30,5),be(0,8,11,-5,0,17,26,2,0,6,32,5),be(0,9,11,-5,0,18,28,2,0,7,34,6),be(0,9,12,-6,0,19,29,2,0,7,36,6),be(0,10,13,-6,0,20,31,3,0,8,38,7),be(0,10,13,-6,0,21,33,3,0,8,40,7),be(0,10,14,-6,0,22,35,3,0,8,42,7),be(0,11,14,-7,0,23,36,3,0,9,44,8),be(0,11,15,-7,0,24,38,3,0,9,46,8)],Hu=Gu,qu=["duration","easing","delay"],Wu={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Xu={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Ya(e){return`${Math.round(e)}ms`}function Ku(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Yu(e){const t=P({},Wu,e.easing),r=P({},Xu,e.duration);return P({getAutoHeightDuration:Ku,create:(o=["all"],a={})=>{const{duration:s=r.standard,easing:c=t.easeInOut,delay:p=0}=a,f=he(a,qu);if(process.env.NODE_ENV!=="production"){const m=g=>typeof g=="string",v=g=>!isNaN(parseFloat(g));!m(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!v(s)&&!m(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),m(c)||console.error('MUI: Argument "easing" must be a string.'),!v(p)&&!m(p)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(f).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(f).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(m=>`${m} ${typeof s=="string"?s:Ya(s)} ${c} ${typeof p=="string"?p:Ya(p)}`).join(",")}},e,{easing:t,duration:r})}const Ju={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Zu=Ju,Qu=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function ef(e={},...t){const{mixins:r={},palette:n={},transitions:o={},typography:a={}}=e,s=he(e,Qu);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":tr(18));const c=Au(n),p=Lo(e);let f=ct(p,{mixins:wu(p.breakpoints,r),palette:c,shadows:Hu.slice(),typography:Fu(c,a),transitions:Yu(o),zIndex:P({},Zu)});if(f=ct(f,s),f=t.reduce((m,v)=>ct(m,v),f),process.env.NODE_ENV!=="production"){const m=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],v=(g,d)=>{let h;for(h in g){const u=g[h];if(m.indexOf(h)!==-1&&Object.keys(u).length>0){if(process.env.NODE_ENV!=="production"){const b=nt("",h);console.error([`MUI: The \`${d}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(g,null,2),"",`Instead, you need to use the '&.${b}' syntax:`,JSON.stringify({root:{[`&.${b}`]:u}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}g[h]={}}}};Object.keys(f.components).forEach(g=>{const d=f.components[g].styleOverrides;d&&g.indexOf("Mui")===0&&v(d,g)})}return f.unstable_sxConfig=P({},Do,s==null?void 0:s.unstable_sxConfig),f.unstable_sx=function(v){return Ao({sx:v,theme:this})},f}const tf=ef(),Fo=tf,Vo="$$material";function mt({props:e,name:t}){return hu({props:e,name:t,defaultTheme:Fo,themeId:Vo})}const Si=e=>sn(e)&&e!=="classes",rf=fu({themeId:Vo,defaultTheme:Fo,rootShouldForwardProp:Si}),Re=rf;function nf(e){return nt("MuiSvgIcon",e)}xt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const of=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],af=e=>{const{color:t,fontSize:r,classes:n}=e,o={root:["root",t!=="inherit"&&`color${tt(t)}`,`fontSize${tt(r)}`]};return ft(o,nf,n)},sf=Re("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.color!=="inherit"&&t[`color${tt(r.color)}`],t[`fontSize${tt(r.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var r,n,o,a,s,c,p,f,m,v,g,d,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(r=e.transitions)==null||(n=r.create)==null?void 0:n.call(r,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((c=e.typography)==null||(p=c.pxToRem)==null?void 0:p.call(c,24))||"1.5rem",large:((f=e.typography)==null||(m=f.pxToRem)==null?void 0:m.call(f,35))||"2.1875rem"}[t.fontSize],color:(v=(g=(e.vars||e).palette)==null||(g=g[t.color])==null?void 0:g.main)!=null?v:{action:(d=(e.vars||e).palette)==null||(d=d.action)==null?void 0:d.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),zo=T.forwardRef(function(t,r){const n=mt({props:t,name:"MuiSvgIcon"}),{children:o,className:a,color:s="inherit",component:c="svg",fontSize:p="medium",htmlColor:f,inheritViewBox:m=!1,titleAccess:v,viewBox:g="0 0 24 24"}=n,d=he(n,of),h=T.isValidElement(o)&&o.type==="svg",u=P({},n,{color:s,component:c,fontSize:p,instanceFontSize:t.fontSize,inheritViewBox:m,viewBox:g,hasSvgAsChild:h}),b={};m||(b.viewBox=g);const w=af(u);return l.jsxs(sf,P({as:c,className:Ce(w.root,a),focusable:"false",color:f,"aria-hidden":v?void 0:!0,role:v?"img":void 0,ref:r},b,d,h&&o.props,{ownerState:u,children:[h?o.props.children:o,v?l.jsx("title",{children:v}):null]}))});process.env.NODE_ENV!=="production"&&(zo.propTypes={children:i.node,classes:i.object,className:i.string,color:i.oneOfType([i.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),i.string]),component:i.elementType,fontSize:i.oneOfType([i.oneOf(["inherit","large","medium","small"]),i.string]),htmlColor:i.string,inheritViewBox:i.bool,shapeRendering:i.string,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),titleAccess:i.string,viewBox:i.string});zo.muiName="SvgIcon";const Ja=zo;function Ci(e,t){function r(n,o){return l.jsx(Ja,P({"data-testid":`${t}Icon`,ref:o},n,{children:e}))}return process.env.NODE_ENV!=="production"&&(r.displayName=`${t}Icon`),r.muiName=Ja.muiName,T.memo(T.forwardRef(r))}const lf={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),yi.configure(e)}},cf=Object.freeze(Object.defineProperty({__proto__:null,capitalize:tt,createChainedFunction:po,createSvgIcon:Ci,debounce:pi,deprecatedPropType:Lp,isMuiElement:Bp,ownerDocument:Oe,ownerWindow:rr,requirePropFactory:Fp,setRef:fn,unstable_ClassNameGenerator:lf,unstable_useEnhancedEffect:Lt,unstable_useId:di,unsupportedProp:Up,useControlled:ui,useEventCallback:Mr,useForkRef:We,useIsFocusVisible:fi},Symbol.toStringTag,{value:"Module"})),pf=gp(cf);var Za;function df(){return Za||(Za=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=pf}(zn)),zn}var uf=bp;Object.defineProperty(Po,"__esModule",{value:!0});var ji=Po.default=void 0,ff=uf(df()),mf=l;ji=Po.default=(0,ff.default)((0,mf.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function Oi(e){return typeof e=="string"}function Cr(e,t,r){return e===void 0||Oi(e)?t:P({},t,{ownerState:P({},t.ownerState,r)})}const hf={disableDefaultClasses:!1},gf=T.createContext(hf);function bf(e){const{disableDefaultClasses:t}=T.useContext(gf);return r=>t?"":e(r)}function Ri(e,t=[]){if(e===void 0)return{};const r={};return Object.keys(e).filter(n=>n.match(/^on[A-Z]/)&&typeof e[n]=="function"&&!t.includes(n)).forEach(n=>{r[n]=e[n]}),r}function vf(e,t,r){return typeof e=="function"?e(t,r):e}function Qa(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(r=>!(r.match(/^on[A-Z]/)&&typeof e[r]=="function")).forEach(r=>{t[r]=e[r]}),t}function yf(e){const{getSlotProps:t,additionalProps:r,externalSlotProps:n,externalForwardedProps:o,className:a}=e;if(!t){const d=Ce(r==null?void 0:r.className,a,o==null?void 0:o.className,n==null?void 0:n.className),h=P({},r==null?void 0:r.style,o==null?void 0:o.style,n==null?void 0:n.style),u=P({},r,o,n);return d.length>0&&(u.className=d),Object.keys(h).length>0&&(u.style=h),{props:u,internalRef:void 0}}const s=Ri(P({},o,n)),c=Qa(n),p=Qa(o),f=t(s),m=Ce(f==null?void 0:f.className,r==null?void 0:r.className,a,o==null?void 0:o.className,n==null?void 0:n.className),v=P({},f==null?void 0:f.style,r==null?void 0:r.style,o==null?void 0:o.style,n==null?void 0:n.style),g=P({},f,r,p,c);return m.length>0&&(g.className=m),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:f.ref}}const wf=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Ft(e){var t;const{elementType:r,externalSlotProps:n,ownerState:o,skipResolvingSlotProps:a=!1}=e,s=he(e,wf),c=a?{}:vf(n,o),{props:p,internalRef:f}=yf(P({},s,{externalSlotProps:c})),m=We(f,c==null?void 0:c.ref,(t=e.additionalProps)==null?void 0:t.ref);return Cr(r,P({},p,{ref:m}),o)}const Pi="base";function xf(e){return`${Pi}--${e}`}function Ef(e,t){return`${Pi}-${e}-${t}`}function $i(e,t){const r=wi[t];return r?xf(r):Ef(e,t)}function kf(e,t){const r={};return t.forEach(n=>{r[n]=$i(e,n)}),r}const Nf=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Tf(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function Sf(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=n=>e.ownerDocument.querySelector(`input[type="radio"]${n}`);let r=t(`[name="${e.name}"]:checked`);return r||(r=t(`[name="${e.name}"]`)),r!==e}function Cf(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Sf(e))}function jf(e){const t=[],r=[];return Array.from(e.querySelectorAll(Nf)).forEach((n,o)=>{const a=Tf(n);a===-1||!Cf(n)||(a===0?t.push(n):r.push({documentOrder:o,tabIndex:a,node:n}))}),r.sort((n,o)=>n.tabIndex===o.tabIndex?n.documentOrder-o.documentOrder:n.tabIndex-o.tabIndex).map(n=>n.node).concat(t)}function Of(){return!0}function gn(e){const{children:t,disableAutoFocus:r=!1,disableEnforceFocus:n=!1,disableRestoreFocus:o=!1,getTabbable:a=jf,isEnabled:s=Of,open:c}=e,p=T.useRef(!1),f=T.useRef(null),m=T.useRef(null),v=T.useRef(null),g=T.useRef(null),d=T.useRef(!1),h=T.useRef(null),u=We(t.ref,h),b=T.useRef(null);T.useEffect(()=>{!c||!h.current||(d.current=!r)},[r,c]),T.useEffect(()=>{if(!c||!h.current)return;const x=Oe(h.current);return h.current.contains(x.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),d.current&&h.current.focus()),()=>{o||(v.current&&v.current.focus&&(p.current=!0,v.current.focus()),v.current=null)}},[c]),T.useEffect(()=>{if(!c||!h.current)return;const x=Oe(h.current),E=C=>{b.current=C,!(n||!s()||C.key!=="Tab")&&x.activeElement===h.current&&C.shiftKey&&(p.current=!0,m.current&&m.current.focus())},y=()=>{const C=h.current;if(C===null)return;if(!x.hasFocus()||!s()||p.current){p.current=!1;return}if(C.contains(x.activeElement)||n&&x.activeElement!==f.current&&x.activeElement!==m.current)return;if(x.activeElement!==g.current)g.current=null;else if(g.current!==null)return;if(!d.current)return;let I=[];if((x.activeElement===f.current||x.activeElement===m.current)&&(I=a(h.current)),I.length>0){var R,$;const N=!!((R=b.current)!=null&&R.shiftKey&&(($=b.current)==null?void 0:$.key)==="Tab"),_=I[0],D=I[I.length-1];typeof _!="string"&&typeof D!="string"&&(N?D.focus():_.focus())}else C.focus()};x.addEventListener("focusin",y),x.addEventListener("keydown",E,!0);const S=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(S),x.removeEventListener("focusin",y),x.removeEventListener("keydown",E,!0)}},[r,n,o,s,c,a]);const w=x=>{v.current===null&&(v.current=x.relatedTarget),d.current=!0,g.current=x.target;const E=t.props.onFocus;E&&E(x)},O=x=>{v.current===null&&(v.current=x.relatedTarget),d.current=!0};return l.jsxs(T.Fragment,{children:[l.jsx("div",{tabIndex:c?0:-1,onFocus:O,ref:f,"data-testid":"sentinelStart"}),T.cloneElement(t,{ref:u,onFocus:w}),l.jsx("div",{tabIndex:c?0:-1,onFocus:O,ref:m,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(gn.propTypes={children:Hr,disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableRestoreFocus:i.bool,getTabbable:i.func,isEnabled:i.func,open:i.bool.isRequired});process.env.NODE_ENV!=="production"&&(gn["propTypes"]=li(gn.propTypes));function Rf(e){return typeof e=="function"?e():e}const Ar=T.forwardRef(function(t,r){const{children:n,container:o,disablePortal:a=!1}=t,[s,c]=T.useState(null),p=We(T.isValidElement(n)?n.ref:null,r);if(Lt(()=>{a||c(Rf(o)||document.body)},[o,a]),Lt(()=>{if(s&&!a)return fn(r,s),()=>{fn(r,null)}},[r,s,a]),a){if(T.isValidElement(n)){const f={ref:p};return T.cloneElement(n,f)}return l.jsx(T.Fragment,{children:n})}return l.jsx(T.Fragment,{children:s&&bc.createPortal(n,s)})});process.env.NODE_ENV!=="production"&&(Ar.propTypes={children:i.node,container:i.oneOfType([pt,i.func]),disablePortal:i.bool});process.env.NODE_ENV!=="production"&&(Ar["propTypes"]=li(Ar.propTypes));function Pf(e){const t=Oe(e);return t.body===e?rr(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function Pr(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function es(e){return parseInt(rr(e).getComputedStyle(e).paddingRight,10)||0}function $f(e){const r=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,n=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return r||n}function ts(e,t,r,n,o){const a=[t,r,...n];[].forEach.call(e.children,s=>{const c=a.indexOf(s)===-1,p=!$f(s);c&&p&&Pr(s,o)})}function Jn(e,t){let r=-1;return e.some((n,o)=>t(n)?(r=o,!0):!1),r}function If(e,t){const r=[],n=e.container;if(!t.disableScrollLock){if(Pf(n)){const s=mi(Oe(n));r.push({value:n.style.paddingRight,property:"padding-right",el:n}),n.style.paddingRight=`${es(n)+s}px`;const c=Oe(n).querySelectorAll(".mui-fixed");[].forEach.call(c,p=>{r.push({value:p.style.paddingRight,property:"padding-right",el:p}),p.style.paddingRight=`${es(p)+s}px`})}let a;if(n.parentNode instanceof DocumentFragment)a=Oe(n).body;else{const s=n.parentElement,c=rr(n);a=(s==null?void 0:s.nodeName)==="HTML"&&c.getComputedStyle(s).overflowY==="scroll"?s:n}r.push({value:a.style.overflow,property:"overflow",el:a},{value:a.style.overflowX,property:"overflow-x",el:a},{value:a.style.overflowY,property:"overflow-y",el:a}),a.style.overflow="hidden"}return()=>{r.forEach(({value:a,el:s,property:c})=>{a?s.style.setProperty(c,a):s.style.removeProperty(c)})}}function _f(e){const t=[];return[].forEach.call(e.children,r=>{r.getAttribute("aria-hidden")==="true"&&t.push(r)}),t}class Mf{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,r){let n=this.modals.indexOf(t);if(n!==-1)return n;n=this.modals.length,this.modals.push(t),t.modalRef&&Pr(t.modalRef,!1);const o=_f(r);ts(r,t.mount,t.modalRef,o,!0);const a=Jn(this.containers,s=>s.container===r);return a!==-1?(this.containers[a].modals.push(t),n):(this.containers.push({modals:[t],container:r,restore:null,hiddenSiblings:o}),n)}mount(t,r){const n=Jn(this.containers,a=>a.modals.indexOf(t)!==-1),o=this.containers[n];o.restore||(o.restore=If(o,r))}remove(t,r=!0){const n=this.modals.indexOf(t);if(n===-1)return n;const o=Jn(this.containers,s=>s.modals.indexOf(t)!==-1),a=this.containers[o];if(a.modals.splice(a.modals.indexOf(t),1),this.modals.splice(n,1),a.modals.length===0)a.restore&&a.restore(),t.modalRef&&Pr(t.modalRef,r),ts(a.container,t.mount,t.modalRef,a.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=a.modals[a.modals.length-1];s.modalRef&&Pr(s.modalRef,!1)}return n}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Df(e){return typeof e=="function"?e():e}function Af(e){return e?e.props.hasOwnProperty("in"):!1}const Lf=new Mf;function Bf(e){const{container:t,disableEscapeKeyDown:r=!1,disableScrollLock:n=!1,manager:o=Lf,closeAfterTransition:a=!1,onTransitionEnter:s,onTransitionExited:c,children:p,onClose:f,open:m,rootRef:v}=e,g=T.useRef({}),d=T.useRef(null),h=T.useRef(null),u=We(h,v),[b,w]=T.useState(!m),O=Af(p);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const E=()=>Oe(d.current),y=()=>(g.current.modalRef=h.current,g.current.mount=d.current,g.current),S=()=>{o.mount(y(),{disableScrollLock:n}),h.current&&(h.current.scrollTop=0)},C=Mr(()=>{const A=Df(t)||E().body;o.add(y(),A),h.current&&S()}),I=T.useCallback(()=>o.isTopModal(y()),[o]),R=Mr(A=>{d.current=A,A&&(m&&I()?S():h.current&&Pr(h.current,x))}),$=T.useCallback(()=>{o.remove(y(),x)},[x,o]);T.useEffect(()=>()=>{$()},[$]),T.useEffect(()=>{m?C():(!O||!a)&&$()},[m,$,O,a,C]);const N=A=>H=>{var ee;(ee=A.onKeyDown)==null||ee.call(A,H),!(H.key!=="Escape"||H.which===229||!I())&&(r||(H.stopPropagation(),f&&f(H,"escapeKeyDown")))},_=A=>H=>{var ee;(ee=A.onClick)==null||ee.call(A,H),H.target===H.currentTarget&&f&&f(H,"backdropClick")};return{getRootProps:(A={})=>{const H=Ri(e);delete H.onTransitionEnter,delete H.onTransitionExited;const ee=P({},H,A);return P({role:"presentation"},ee,{onKeyDown:N(ee),ref:u})},getBackdropProps:(A={})=>{const H=A;return P({"aria-hidden":!0},H,{onClick:_(H),open:m})},getTransitionProps:()=>{const A=()=>{w(!1),s&&s()},H=()=>{w(!0),c&&c(),a&&$()};return{onEnter:po(A,p==null?void 0:p.props.onEnter),onExited:po(H,p==null?void 0:p.props.onExited)}},rootRef:u,portalRef:R,isTopModal:I,exited:b,hasTransition:O}}var _e="top",Xe="bottom",Ke="right",Me="left",Uo="auto",Kr=[_e,Xe,Ke,Me],nr="start",Lr="end",Ff="clippingParents",Ii="viewport",wr="popper",Vf="reference",rs=Kr.reduce(function(e,t){return e.concat([t+"-"+nr,t+"-"+Lr])},[]),_i=[].concat(Kr,[Uo]).reduce(function(e,t){return e.concat([t,t+"-"+nr,t+"-"+Lr])},[]),zf="beforeRead",Uf="read",Gf="afterRead",Hf="beforeMain",qf="main",Wf="afterMain",Xf="beforeWrite",Kf="write",Yf="afterWrite",Jf=[zf,Uf,Gf,Hf,qf,Wf,Xf,Kf,Yf];function rt(e){return e?(e.nodeName||"").toLowerCase():null}function ze(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Vt(e){var t=ze(e).Element;return e instanceof t||e instanceof Element}function qe(e){var t=ze(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Go(e){if(typeof ShadowRoot>"u")return!1;var t=ze(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Zf(e){var t=e.state;Object.keys(t.elements).forEach(function(r){var n=t.styles[r]||{},o=t.attributes[r]||{},a=t.elements[r];!qe(a)||!rt(a)||(Object.assign(a.style,n),Object.keys(o).forEach(function(s){var c=o[s];c===!1?a.removeAttribute(s):a.setAttribute(s,c===!0?"":c)}))})}function Qf(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,r.popper),t.styles=r,t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach(function(n){var o=t.elements[n],a=t.attributes[n]||{},s=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:r[n]),c=s.reduce(function(p,f){return p[f]="",p},{});!qe(o)||!rt(o)||(Object.assign(o.style,c),Object.keys(a).forEach(function(p){o.removeAttribute(p)}))})}}const em={name:"applyStyles",enabled:!0,phase:"write",fn:Zf,effect:Qf,requires:["computeStyles"]};function Qe(e){return e.split("-")[0]}var It=Math.max,bn=Math.min,or=Math.round;function mo(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Mi(){return!/^((?!chrome|android).)*safari/i.test(mo())}function ar(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!1);var n=e.getBoundingClientRect(),o=1,a=1;t&&qe(e)&&(o=e.offsetWidth>0&&or(n.width)/e.offsetWidth||1,a=e.offsetHeight>0&&or(n.height)/e.offsetHeight||1);var s=Vt(e)?ze(e):window,c=s.visualViewport,p=!Mi()&&r,f=(n.left+(p&&c?c.offsetLeft:0))/o,m=(n.top+(p&&c?c.offsetTop:0))/a,v=n.width/o,g=n.height/a;return{width:v,height:g,top:m,right:f+v,bottom:m+g,left:f,x:f,y:m}}function Ho(e){var t=ar(e),r=e.offsetWidth,n=e.offsetHeight;return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:n}}function Di(e,t){var r=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(r&&Go(r)){var n=t;do{if(n&&e.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function ut(e){return ze(e).getComputedStyle(e)}function tm(e){return["table","td","th"].indexOf(rt(e))>=0}function kt(e){return((Vt(e)?e.ownerDocument:e.document)||window.document).documentElement}function _n(e){return rt(e)==="html"?e:e.assignedSlot||e.parentNode||(Go(e)?e.host:null)||kt(e)}function ns(e){return!qe(e)||ut(e).position==="fixed"?null:e.offsetParent}function rm(e){var t=/firefox/i.test(mo()),r=/Trident/i.test(mo());if(r&&qe(e)){var n=ut(e);if(n.position==="fixed")return null}var o=_n(e);for(Go(o)&&(o=o.host);qe(o)&&["html","body"].indexOf(rt(o))<0;){var a=ut(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function Yr(e){for(var t=ze(e),r=ns(e);r&&tm(r)&&ut(r).position==="static";)r=ns(r);return r&&(rt(r)==="html"||rt(r)==="body"&&ut(r).position==="static")?t:r||rm(e)||t}function qo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function $r(e,t,r){return It(e,bn(t,r))}function nm(e,t,r){var n=$r(e,t,r);return n>r?r:n}function Ai(){return{top:0,right:0,bottom:0,left:0}}function Li(e){return Object.assign({},Ai(),e)}function Bi(e,t){return t.reduce(function(r,n){return r[n]=e,r},{})}var om=function(t,r){return t=typeof t=="function"?t(Object.assign({},r.rects,{placement:r.placement})):t,Li(typeof t!="number"?t:Bi(t,Kr))};function am(e){var t,r=e.state,n=e.name,o=e.options,a=r.elements.arrow,s=r.modifiersData.popperOffsets,c=Qe(r.placement),p=qo(c),f=[Me,Ke].indexOf(c)>=0,m=f?"height":"width";if(!(!a||!s)){var v=om(o.padding,r),g=Ho(a),d=p==="y"?_e:Me,h=p==="y"?Xe:Ke,u=r.rects.reference[m]+r.rects.reference[p]-s[p]-r.rects.popper[m],b=s[p]-r.rects.reference[p],w=Yr(a),O=w?p==="y"?w.clientHeight||0:w.clientWidth||0:0,x=u/2-b/2,E=v[d],y=O-g[m]-v[h],S=O/2-g[m]/2+x,C=$r(E,S,y),I=p;r.modifiersData[n]=(t={},t[I]=C,t.centerOffset=C-S,t)}}function sm(e){var t=e.state,r=e.options,n=r.element,o=n===void 0?"[data-popper-arrow]":n;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Di(t.elements.popper,o)&&(t.elements.arrow=o))}const im={name:"arrow",enabled:!0,phase:"main",fn:am,effect:sm,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function sr(e){return e.split("-")[1]}var lm={top:"auto",right:"auto",bottom:"auto",left:"auto"};function cm(e,t){var r=e.x,n=e.y,o=t.devicePixelRatio||1;return{x:or(r*o)/o||0,y:or(n*o)/o||0}}function os(e){var t,r=e.popper,n=e.popperRect,o=e.placement,a=e.variation,s=e.offsets,c=e.position,p=e.gpuAcceleration,f=e.adaptive,m=e.roundOffsets,v=e.isFixed,g=s.x,d=g===void 0?0:g,h=s.y,u=h===void 0?0:h,b=typeof m=="function"?m({x:d,y:u}):{x:d,y:u};d=b.x,u=b.y;var w=s.hasOwnProperty("x"),O=s.hasOwnProperty("y"),x=Me,E=_e,y=window;if(f){var S=Yr(r),C="clientHeight",I="clientWidth";if(S===ze(r)&&(S=kt(r),ut(S).position!=="static"&&c==="absolute"&&(C="scrollHeight",I="scrollWidth")),S=S,o===_e||(o===Me||o===Ke)&&a===Lr){E=Xe;var R=v&&S===y&&y.visualViewport?y.visualViewport.height:S[C];u-=R-n.height,u*=p?1:-1}if(o===Me||(o===_e||o===Xe)&&a===Lr){x=Ke;var $=v&&S===y&&y.visualViewport?y.visualViewport.width:S[I];d-=$-n.width,d*=p?1:-1}}var N=Object.assign({position:c},f&&lm),_=m===!0?cm({x:d,y:u},ze(r)):{x:d,y:u};if(d=_.x,u=_.y,p){var D;return Object.assign({},N,(D={},D[E]=O?"0":"",D[x]=w?"0":"",D.transform=(y.devicePixelRatio||1)<=1?"translate("+d+"px, "+u+"px)":"translate3d("+d+"px, "+u+"px, 0)",D))}return Object.assign({},N,(t={},t[E]=O?u+"px":"",t[x]=w?d+"px":"",t.transform="",t))}function pm(e){var t=e.state,r=e.options,n=r.gpuAcceleration,o=n===void 0?!0:n,a=r.adaptive,s=a===void 0?!0:a,c=r.roundOffsets,p=c===void 0?!0:c,f={placement:Qe(t.placement),variation:sr(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,os(Object.assign({},f,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:p})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,os(Object.assign({},f,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:p})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const dm={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:pm,data:{}};var nn={passive:!0};function um(e){var t=e.state,r=e.instance,n=e.options,o=n.scroll,a=o===void 0?!0:o,s=n.resize,c=s===void 0?!0:s,p=ze(t.elements.popper),f=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&f.forEach(function(m){m.addEventListener("scroll",r.update,nn)}),c&&p.addEventListener("resize",r.update,nn),function(){a&&f.forEach(function(m){m.removeEventListener("scroll",r.update,nn)}),c&&p.removeEventListener("resize",r.update,nn)}}const fm={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:um,data:{}};var mm={left:"right",right:"left",bottom:"top",top:"bottom"};function cn(e){return e.replace(/left|right|bottom|top/g,function(t){return mm[t]})}var hm={start:"end",end:"start"};function as(e){return e.replace(/start|end/g,function(t){return hm[t]})}function Wo(e){var t=ze(e),r=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:r,scrollTop:n}}function Xo(e){return ar(kt(e)).left+Wo(e).scrollLeft}function gm(e,t){var r=ze(e),n=kt(e),o=r.visualViewport,a=n.clientWidth,s=n.clientHeight,c=0,p=0;if(o){a=o.width,s=o.height;var f=Mi();(f||!f&&t==="fixed")&&(c=o.offsetLeft,p=o.offsetTop)}return{width:a,height:s,x:c+Xo(e),y:p}}function bm(e){var t,r=kt(e),n=Wo(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=It(r.scrollWidth,r.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=It(r.scrollHeight,r.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),c=-n.scrollLeft+Xo(e),p=-n.scrollTop;return ut(o||r).direction==="rtl"&&(c+=It(r.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:c,y:p}}function Ko(e){var t=ut(e),r=t.overflow,n=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(r+o+n)}function Fi(e){return["html","body","#document"].indexOf(rt(e))>=0?e.ownerDocument.body:qe(e)&&Ko(e)?e:Fi(_n(e))}function Ir(e,t){var r;t===void 0&&(t=[]);var n=Fi(e),o=n===((r=e.ownerDocument)==null?void 0:r.body),a=ze(n),s=o?[a].concat(a.visualViewport||[],Ko(n)?n:[]):n,c=t.concat(s);return o?c:c.concat(Ir(_n(s)))}function ho(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function vm(e,t){var r=ar(e,!1,t==="fixed");return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}function ss(e,t,r){return t===Ii?ho(gm(e,r)):Vt(t)?vm(t,r):ho(bm(kt(e)))}function ym(e){var t=Ir(_n(e)),r=["absolute","fixed"].indexOf(ut(e).position)>=0,n=r&&qe(e)?Yr(e):e;return Vt(n)?t.filter(function(o){return Vt(o)&&Di(o,n)&&rt(o)!=="body"}):[]}function wm(e,t,r,n){var o=t==="clippingParents"?ym(e):[].concat(t),a=[].concat(o,[r]),s=a[0],c=a.reduce(function(p,f){var m=ss(e,f,n);return p.top=It(m.top,p.top),p.right=bn(m.right,p.right),p.bottom=bn(m.bottom,p.bottom),p.left=It(m.left,p.left),p},ss(e,s,n));return c.width=c.right-c.left,c.height=c.bottom-c.top,c.x=c.left,c.y=c.top,c}function Vi(e){var t=e.reference,r=e.element,n=e.placement,o=n?Qe(n):null,a=n?sr(n):null,s=t.x+t.width/2-r.width/2,c=t.y+t.height/2-r.height/2,p;switch(o){case _e:p={x:s,y:t.y-r.height};break;case Xe:p={x:s,y:t.y+t.height};break;case Ke:p={x:t.x+t.width,y:c};break;case Me:p={x:t.x-r.width,y:c};break;default:p={x:t.x,y:t.y}}var f=o?qo(o):null;if(f!=null){var m=f==="y"?"height":"width";switch(a){case nr:p[f]=p[f]-(t[m]/2-r[m]/2);break;case Lr:p[f]=p[f]+(t[m]/2-r[m]/2);break}}return p}function Br(e,t){t===void 0&&(t={});var r=t,n=r.placement,o=n===void 0?e.placement:n,a=r.strategy,s=a===void 0?e.strategy:a,c=r.boundary,p=c===void 0?Ff:c,f=r.rootBoundary,m=f===void 0?Ii:f,v=r.elementContext,g=v===void 0?wr:v,d=r.altBoundary,h=d===void 0?!1:d,u=r.padding,b=u===void 0?0:u,w=Li(typeof b!="number"?b:Bi(b,Kr)),O=g===wr?Vf:wr,x=e.rects.popper,E=e.elements[h?O:g],y=wm(Vt(E)?E:E.contextElement||kt(e.elements.popper),p,m,s),S=ar(e.elements.reference),C=Vi({reference:S,element:x,strategy:"absolute",placement:o}),I=ho(Object.assign({},x,C)),R=g===wr?I:S,$={top:y.top-R.top+w.top,bottom:R.bottom-y.bottom+w.bottom,left:y.left-R.left+w.left,right:R.right-y.right+w.right},N=e.modifiersData.offset;if(g===wr&&N){var _=N[o];Object.keys($).forEach(function(D){var z=[Ke,Xe].indexOf(D)>=0?1:-1,G=[_e,Xe].indexOf(D)>=0?"y":"x";$[D]+=_[G]*z})}return $}function xm(e,t){t===void 0&&(t={});var r=t,n=r.placement,o=r.boundary,a=r.rootBoundary,s=r.padding,c=r.flipVariations,p=r.allowedAutoPlacements,f=p===void 0?_i:p,m=sr(n),v=m?c?rs:rs.filter(function(h){return sr(h)===m}):Kr,g=v.filter(function(h){return f.indexOf(h)>=0});g.length===0&&(g=v);var d=g.reduce(function(h,u){return h[u]=Br(e,{placement:u,boundary:o,rootBoundary:a,padding:s})[Qe(u)],h},{});return Object.keys(d).sort(function(h,u){return d[h]-d[u]})}function Em(e){if(Qe(e)===Uo)return[];var t=cn(e);return[as(e),t,as(t)]}function km(e){var t=e.state,r=e.options,n=e.name;if(!t.modifiersData[n]._skip){for(var o=r.mainAxis,a=o===void 0?!0:o,s=r.altAxis,c=s===void 0?!0:s,p=r.fallbackPlacements,f=r.padding,m=r.boundary,v=r.rootBoundary,g=r.altBoundary,d=r.flipVariations,h=d===void 0?!0:d,u=r.allowedAutoPlacements,b=t.options.placement,w=Qe(b),O=w===b,x=p||(O||!h?[cn(b)]:Em(b)),E=[b].concat(x).reduce(function(U,K){return U.concat(Qe(K)===Uo?xm(t,{placement:K,boundary:m,rootBoundary:v,padding:f,flipVariations:h,allowedAutoPlacements:u}):K)},[]),y=t.rects.reference,S=t.rects.popper,C=new Map,I=!0,R=E[0],$=0;$<E.length;$++){var N=E[$],_=Qe(N),D=sr(N)===nr,z=[_e,Xe].indexOf(_)>=0,G=z?"width":"height",A=Br(t,{placement:N,boundary:m,rootBoundary:v,altBoundary:g,padding:f}),H=z?D?Ke:Me:D?Xe:_e;y[G]>S[G]&&(H=cn(H));var ee=cn(H),V=[];if(a&&V.push(A[_]<=0),c&&V.push(A[H]<=0,A[ee]<=0),V.every(function(U){return U})){R=N,I=!1;break}C.set(N,V)}if(I)for(var j=h?3:1,L=function(K){var X=E.find(function(J){var Y=C.get(J);if(Y)return Y.slice(0,K).every(function(Z){return Z})});if(X)return R=X,"break"},q=j;q>0;q--){var W=L(q);if(W==="break")break}t.placement!==R&&(t.modifiersData[n]._skip=!0,t.placement=R,t.reset=!0)}}const Nm={name:"flip",enabled:!0,phase:"main",fn:km,requiresIfExists:["offset"],data:{_skip:!1}};function is(e,t,r){return r===void 0&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function ls(e){return[_e,Ke,Xe,Me].some(function(t){return e[t]>=0})}function Tm(e){var t=e.state,r=e.name,n=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,s=Br(t,{elementContext:"reference"}),c=Br(t,{altBoundary:!0}),p=is(s,n),f=is(c,o,a),m=ls(p),v=ls(f);t.modifiersData[r]={referenceClippingOffsets:p,popperEscapeOffsets:f,isReferenceHidden:m,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":m,"data-popper-escaped":v})}const Sm={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Tm};function Cm(e,t,r){var n=Qe(e),o=[Me,_e].indexOf(n)>=0?-1:1,a=typeof r=="function"?r(Object.assign({},t,{placement:e})):r,s=a[0],c=a[1];return s=s||0,c=(c||0)*o,[Me,Ke].indexOf(n)>=0?{x:c,y:s}:{x:s,y:c}}function jm(e){var t=e.state,r=e.options,n=e.name,o=r.offset,a=o===void 0?[0,0]:o,s=_i.reduce(function(m,v){return m[v]=Cm(v,t.rects,a),m},{}),c=s[t.placement],p=c.x,f=c.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=p,t.modifiersData.popperOffsets.y+=f),t.modifiersData[n]=s}const Om={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:jm};function Rm(e){var t=e.state,r=e.name;t.modifiersData[r]=Vi({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Pm={name:"popperOffsets",enabled:!0,phase:"read",fn:Rm,data:{}};function $m(e){return e==="x"?"y":"x"}function Im(e){var t=e.state,r=e.options,n=e.name,o=r.mainAxis,a=o===void 0?!0:o,s=r.altAxis,c=s===void 0?!1:s,p=r.boundary,f=r.rootBoundary,m=r.altBoundary,v=r.padding,g=r.tether,d=g===void 0?!0:g,h=r.tetherOffset,u=h===void 0?0:h,b=Br(t,{boundary:p,rootBoundary:f,padding:v,altBoundary:m}),w=Qe(t.placement),O=sr(t.placement),x=!O,E=qo(w),y=$m(E),S=t.modifiersData.popperOffsets,C=t.rects.reference,I=t.rects.popper,R=typeof u=="function"?u(Object.assign({},t.rects,{placement:t.placement})):u,$=typeof R=="number"?{mainAxis:R,altAxis:R}:Object.assign({mainAxis:0,altAxis:0},R),N=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,_={x:0,y:0};if(S){if(a){var D,z=E==="y"?_e:Me,G=E==="y"?Xe:Ke,A=E==="y"?"height":"width",H=S[E],ee=H+b[z],V=H-b[G],j=d?-I[A]/2:0,L=O===nr?C[A]:I[A],q=O===nr?-I[A]:-C[A],W=t.elements.arrow,U=d&&W?Ho(W):{width:0,height:0},K=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Ai(),X=K[z],J=K[G],Y=$r(0,C[A],U[A]),Z=x?C[A]/2-j-Y-X-$.mainAxis:L-Y-X-$.mainAxis,Q=x?-C[A]/2+j+Y+J+$.mainAxis:q+Y+J+$.mainAxis,ie=t.elements.arrow&&Yr(t.elements.arrow),F=ie?E==="y"?ie.clientTop||0:ie.clientLeft||0:0,te=(D=N==null?void 0:N[E])!=null?D:0,M=H+Z-te-F,le=H+Q-te,Te=$r(d?bn(ee,M):ee,H,d?It(V,le):V);S[E]=Te,_[E]=Te-H}if(c){var Pe,Ee=E==="x"?_e:Me,Nt=E==="x"?Xe:Ke,$e=S[y],ot=y==="y"?"height":"width",Le=$e+b[Ee],at=$e-b[Nt],Se=[_e,Me].indexOf(w)!==-1,zt=(Pe=N==null?void 0:N[y])!=null?Pe:0,Tt=Se?Le:$e-C[ot]-I[ot]-zt+$.altAxis,ur=Se?$e+C[ot]+I[ot]-zt-$.altAxis:at,Zr=d&&Se?nm(Tt,$e,ur):$r(d?Tt:Le,$e,d?ur:at);S[y]=Zr,_[y]=Zr-$e}t.modifiersData[n]=_}}const _m={name:"preventOverflow",enabled:!0,phase:"main",fn:Im,requiresIfExists:["offset"]};function Mm(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Dm(e){return e===ze(e)||!qe(e)?Wo(e):Mm(e)}function Am(e){var t=e.getBoundingClientRect(),r=or(t.width)/e.offsetWidth||1,n=or(t.height)/e.offsetHeight||1;return r!==1||n!==1}function Lm(e,t,r){r===void 0&&(r=!1);var n=qe(t),o=qe(t)&&Am(t),a=kt(t),s=ar(e,o,r),c={scrollLeft:0,scrollTop:0},p={x:0,y:0};return(n||!n&&!r)&&((rt(t)!=="body"||Ko(a))&&(c=Dm(t)),qe(t)?(p=ar(t,!0),p.x+=t.clientLeft,p.y+=t.clientTop):a&&(p.x=Xo(a))),{x:s.left+c.scrollLeft-p.x,y:s.top+c.scrollTop-p.y,width:s.width,height:s.height}}function Bm(e){var t=new Map,r=new Set,n=[];e.forEach(function(a){t.set(a.name,a)});function o(a){r.add(a.name);var s=[].concat(a.requires||[],a.requiresIfExists||[]);s.forEach(function(c){if(!r.has(c)){var p=t.get(c);p&&o(p)}}),n.push(a)}return e.forEach(function(a){r.has(a.name)||o(a)}),n}function Fm(e){var t=Bm(e);return Jf.reduce(function(r,n){return r.concat(t.filter(function(o){return o.phase===n}))},[])}function Vm(e){var t;return function(){return t||(t=new Promise(function(r){Promise.resolve().then(function(){t=void 0,r(e())})})),t}}function zm(e){var t=e.reduce(function(r,n){var o=r[n.name];return r[n.name]=o?Object.assign({},o,n,{options:Object.assign({},o.options,n.options),data:Object.assign({},o.data,n.data)}):n,r},{});return Object.keys(t).map(function(r){return t[r]})}var cs={placement:"bottom",modifiers:[],strategy:"absolute"};function ps(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function Um(e){e===void 0&&(e={});var t=e,r=t.defaultModifiers,n=r===void 0?[]:r,o=t.defaultOptions,a=o===void 0?cs:o;return function(c,p,f){f===void 0&&(f=a);var m={placement:"bottom",orderedModifiers:[],options:Object.assign({},cs,a),modifiersData:{},elements:{reference:c,popper:p},attributes:{},styles:{}},v=[],g=!1,d={state:m,setOptions:function(w){var O=typeof w=="function"?w(m.options):w;u(),m.options=Object.assign({},a,m.options,O),m.scrollParents={reference:Vt(c)?Ir(c):c.contextElement?Ir(c.contextElement):[],popper:Ir(p)};var x=Fm(zm([].concat(n,m.options.modifiers)));return m.orderedModifiers=x.filter(function(E){return E.enabled}),h(),d.update()},forceUpdate:function(){if(!g){var w=m.elements,O=w.reference,x=w.popper;if(ps(O,x)){m.rects={reference:Lm(O,Yr(x),m.options.strategy==="fixed"),popper:Ho(x)},m.reset=!1,m.placement=m.options.placement,m.orderedModifiers.forEach(function($){return m.modifiersData[$.name]=Object.assign({},$.data)});for(var E=0;E<m.orderedModifiers.length;E++){if(m.reset===!0){m.reset=!1,E=-1;continue}var y=m.orderedModifiers[E],S=y.fn,C=y.options,I=C===void 0?{}:C,R=y.name;typeof S=="function"&&(m=S({state:m,options:I,name:R,instance:d})||m)}}}},update:Vm(function(){return new Promise(function(b){d.forceUpdate(),b(m)})}),destroy:function(){u(),g=!0}};if(!ps(c,p))return d;d.setOptions(f).then(function(b){!g&&f.onFirstUpdate&&f.onFirstUpdate(b)});function h(){m.orderedModifiers.forEach(function(b){var w=b.name,O=b.options,x=O===void 0?{}:O,E=b.effect;if(typeof E=="function"){var y=E({state:m,name:w,instance:d,options:x}),S=function(){};v.push(y||S)}})}function u(){v.forEach(function(b){return b()}),v=[]}return d}}var Gm=[fm,Pm,dm,em,Om,Nm,_m,im,Sm],Hm=Um({defaultModifiers:Gm});const zi="Popper";function qm(e){return $i(zi,e)}kf(zi,["root"]);const Wm=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Xm=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Km(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function vn(e){return typeof e=="function"?e():e}function Mn(e){return e.nodeType!==void 0}function Ym(e){return!Mn(e)}const Jm=()=>ft({root:["root"]},bf(qm)),Zm={},Qm=T.forwardRef(function(t,r){var n;const{anchorEl:o,children:a,direction:s,disablePortal:c,modifiers:p,open:f,placement:m,popperOptions:v,popperRef:g,slotProps:d={},slots:h={},TransitionProps:u}=t,b=he(t,Wm),w=T.useRef(null),O=We(w,r),x=T.useRef(null),E=We(x,g),y=T.useRef(E);Lt(()=>{y.current=E},[E]),T.useImperativeHandle(g,()=>x.current,[]);const S=Km(m,s),[C,I]=T.useState(S),[R,$]=T.useState(vn(o));T.useEffect(()=>{x.current&&x.current.forceUpdate()}),T.useEffect(()=>{o&&$(vn(o))},[o]),Lt(()=>{if(!R||!f)return;const G=ee=>{I(ee.placement)};if(process.env.NODE_ENV!=="production"&&R&&Mn(R)&&R.nodeType===1){const ee=R.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ee.top===0&&ee.left===0&&ee.right===0&&ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let A=[{name:"preventOverflow",options:{altBoundary:c}},{name:"flip",options:{altBoundary:c}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ee})=>{G(ee)}}];p!=null&&(A=A.concat(p)),v&&v.modifiers!=null&&(A=A.concat(v.modifiers));const H=Hm(R,w.current,P({placement:S},v,{modifiers:A}));return y.current(H),()=>{H.destroy(),y.current(null)}},[R,c,p,f,v,S]);const N={placement:C};u!==null&&(N.TransitionProps=u);const _=Jm(),D=(n=h.root)!=null?n:"div",z=Ft({elementType:D,externalSlotProps:d.root,externalForwardedProps:b,additionalProps:{role:"tooltip",ref:O},ownerState:t,className:_.root});return l.jsx(D,P({},z,{children:typeof a=="function"?a(N):a}))}),Ui=T.forwardRef(function(t,r){const{anchorEl:n,children:o,container:a,direction:s="ltr",disablePortal:c=!1,keepMounted:p=!1,modifiers:f,open:m,placement:v="bottom",popperOptions:g=Zm,popperRef:d,style:h,transition:u=!1,slotProps:b={},slots:w={}}=t,O=he(t,Xm),[x,E]=T.useState(!0),y=()=>{E(!1)},S=()=>{E(!0)};if(!p&&!m&&(!u||x))return null;let C;if(a)C=a;else if(n){const $=vn(n);C=$&&Mn($)?Oe($).body:Oe(null).body}const I=!m&&p&&(!u||x)?"none":void 0,R=u?{in:m,onEnter:y,onExited:S}:void 0;return l.jsx(Ar,{disablePortal:c,container:C,children:l.jsx(Qm,P({anchorEl:n,direction:s,disablePortal:c,modifiers:f,ref:r,open:u?!x:m,placement:v,popperOptions:g,popperRef:d,slotProps:b,slots:w},O,{style:P({position:"fixed",top:0,left:0,display:I},h),TransitionProps:R,children:o}))})});process.env.NODE_ENV!=="production"&&(Ui.propTypes={anchorEl:pr(i.oneOfType([pt,i.object,i.func]),e=>{if(e.open){const t=vn(e.anchorEl);if(t&&Mn(t)&&t.nodeType===1){const r=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&r.top===0&&r.left===0&&r.right===0&&r.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Ym(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:i.oneOfType([i.node,i.func]),container:i.oneOfType([pt,i.func]),direction:i.oneOf(["ltr","rtl"]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:Io,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),transition:i.bool});function Jr(){const e=Ti(Fo);return process.env.NODE_ENV!=="production"&&T.useDebugValue(e),e[Vo]||e}function go(e,t){return go=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,o){return n.__proto__=o,n},go(e,t)}function eh(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,go(e,t)}const ds={disabled:!1};var th=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.shape({enter:i.number,exit:i.number,appear:i.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&i.oneOfType([i.string,i.shape({enter:i.string,exit:i.string,active:i.string}),i.shape({enter:i.string,enterDone:i.string,enterActive:i.string,exit:i.string,exitDone:i.string,exitActive:i.string})]);const Gi=k.createContext(null);var rh=function(t){return t.scrollTop},jr="unmounted",Ct="exited",jt="entering",Yt="entered",bo="exiting",ht=function(e){eh(t,e);function t(n,o){var a;a=e.call(this,n,o)||this;var s=o,c=s&&!s.isMounting?n.enter:n.appear,p;return a.appearStatus=null,n.in?c?(p=Ct,a.appearStatus=jt):p=Yt:n.unmountOnExit||n.mountOnEnter?p=jr:p=Ct,a.state={status:p},a.nextCallback=null,a}t.getDerivedStateFromProps=function(o,a){var s=o.in;return s&&a.status===jr?{status:Ct}:null};var r=t.prototype;return r.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},r.componentDidUpdate=function(o){var a=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==jt&&s!==Yt&&(a=jt):(s===jt||s===Yt)&&(a=bo)}this.updateStatus(!1,a)},r.componentWillUnmount=function(){this.cancelNextCallback()},r.getTimeouts=function(){var o=this.props.timeout,a,s,c;return a=s=c=o,o!=null&&typeof o!="number"&&(a=o.exit,s=o.enter,c=o.appear!==void 0?o.appear:s),{exit:a,enter:s,appear:c}},r.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===jt){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:Nr.findDOMNode(this);s&&rh(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Ct&&this.setState({status:jr})},r.performEnter=function(o){var a=this,s=this.props.enter,c=this.context?this.context.isMounting:o,p=this.props.nodeRef?[c]:[Nr.findDOMNode(this),c],f=p[0],m=p[1],v=this.getTimeouts(),g=c?v.appear:v.enter;if(!o&&!s||ds.disabled){this.safeSetState({status:Yt},function(){a.props.onEntered(f)});return}this.props.onEnter(f,m),this.safeSetState({status:jt},function(){a.props.onEntering(f,m),a.onTransitionEnd(g,function(){a.safeSetState({status:Yt},function(){a.props.onEntered(f,m)})})})},r.performExit=function(){var o=this,a=this.props.exit,s=this.getTimeouts(),c=this.props.nodeRef?void 0:Nr.findDOMNode(this);if(!a||ds.disabled){this.safeSetState({status:Ct},function(){o.props.onExited(c)});return}this.props.onExit(c),this.safeSetState({status:bo},function(){o.props.onExiting(c),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:Ct},function(){o.props.onExited(c)})})})},r.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},r.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},r.setNextCallback=function(o){var a=this,s=!0;return this.nextCallback=function(c){s&&(s=!1,a.nextCallback=null,o(c))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},r.onTransitionEnd=function(o,a){this.setNextCallback(a);var s=this.props.nodeRef?this.props.nodeRef.current:Nr.findDOMNode(this),c=o==null&&!this.props.addEndListener;if(!s||c){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var p=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],f=p[0],m=p[1];this.props.addEndListener(f,m)}o!=null&&setTimeout(this.nextCallback,o)},r.render=function(){var o=this.state.status;if(o===jr)return null;var a=this.props,s=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var c=he(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return k.createElement(Gi.Provider,{value:null},typeof s=="function"?s(o,c):k.cloneElement(k.Children.only(s),c))},t}(k.Component);ht.contextType=Gi;ht.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:i.shape({current:typeof Element>"u"?i.any:function(e,t,r,n,o,a){var s=e[t];return i.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,r,n,o,a)}}),children:i.oneOfType([i.func.isRequired,i.element.isRequired]).isRequired,in:i.bool,mountOnEnter:i.bool,unmountOnExit:i.bool,appear:i.bool,enter:i.bool,exit:i.bool,timeout:function(t){var r=th;t.addEndListener||(r=r.isRequired);for(var n=arguments.length,o=new Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=arguments[a];return r.apply(void 0,[t].concat(o))},addEndListener:i.func,onEnter:i.func,onEntering:i.func,onEntered:i.func,onExit:i.func,onExiting:i.func,onExited:i.func}:{};function Xt(){}ht.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Xt,onEntering:Xt,onEntered:Xt,onExit:Xt,onExiting:Xt,onExited:Xt};ht.UNMOUNTED=jr;ht.EXITED=Ct;ht.ENTERING=jt;ht.ENTERED=Yt;ht.EXITING=bo;const Hi=ht,qi=e=>e.scrollTop;function yn(e,t){var r,n;const{timeout:o,easing:a,style:s={}}=e;return{duration:(r=s.transitionDuration)!=null?r:typeof o=="number"?o:o[t.mode]||0,easing:(n=s.transitionTimingFunction)!=null?n:typeof a=="object"?a[t.mode]:a,delay:s.transitionDelay}}const nh=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function vo(e){return`scale(${e}, ${e**2})`}const oh={entering:{opacity:1,transform:vo(1)},entered:{opacity:1,transform:"none"}},Zn=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Yo=T.forwardRef(function(t,r){const{addEndListener:n,appear:o=!0,children:a,easing:s,in:c,onEnter:p,onEntered:f,onEntering:m,onExit:v,onExited:g,onExiting:d,style:h,timeout:u="auto",TransitionComponent:b=Hi}=t,w=he(t,nh),O=Sr(),x=T.useRef(),E=Jr(),y=T.useRef(null),S=We(y,a.ref,r),C=G=>A=>{if(G){const H=y.current;A===void 0?G(H):G(H,A)}},I=C(m),R=C((G,A)=>{qi(G);const{duration:H,delay:ee,easing:V}=yn({style:h,timeout:u,easing:s},{mode:"enter"});let j;u==="auto"?(j=E.transitions.getAutoHeightDuration(G.clientHeight),x.current=j):j=H,G.style.transition=[E.transitions.create("opacity",{duration:j,delay:ee}),E.transitions.create("transform",{duration:Zn?j:j*.666,delay:ee,easing:V})].join(","),p&&p(G,A)}),$=C(f),N=C(d),_=C(G=>{const{duration:A,delay:H,easing:ee}=yn({style:h,timeout:u,easing:s},{mode:"exit"});let V;u==="auto"?(V=E.transitions.getAutoHeightDuration(G.clientHeight),x.current=V):V=A,G.style.transition=[E.transitions.create("opacity",{duration:V,delay:H}),E.transitions.create("transform",{duration:Zn?V:V*.666,delay:Zn?H:H||V*.333,easing:ee})].join(","),G.style.opacity=0,G.style.transform=vo(.75),v&&v(G)}),D=C(g),z=G=>{u==="auto"&&O.start(x.current||0,G),n&&n(y.current,G)};return l.jsx(b,P({appear:o,in:c,nodeRef:y,onEnter:R,onEntered:$,onEntering:I,onExit:_,onExited:D,onExiting:N,addEndListener:z,timeout:u==="auto"?null:u},w,{children:(G,A)=>T.cloneElement(a,P({style:P({opacity:0,transform:vo(.75),visibility:G==="exited"&&!c?"hidden":void 0},oh[G],h,a.props.style),ref:S},A))}))});process.env.NODE_ENV!=="production"&&(Yo.propTypes={addEndListener:i.func,appear:i.bool,children:Hr.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});Yo.muiSupportAuto=!0;const yo=Yo,ah=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},us=ah,sh=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],ih=Re(Ui,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Wi=T.forwardRef(function(t,r){var n;const o=Ni(),a=mt({props:t,name:"MuiPopper"}),{anchorEl:s,component:c,components:p,componentsProps:f,container:m,disablePortal:v,keepMounted:g,modifiers:d,open:h,placement:u,popperOptions:b,popperRef:w,transition:O,slots:x,slotProps:E}=a,y=he(a,sh),S=(n=x==null?void 0:x.root)!=null?n:p==null?void 0:p.Root,C=P({anchorEl:s,container:m,disablePortal:v,keepMounted:g,modifiers:d,open:h,placement:u,popperOptions:b,popperRef:w,transition:O},y);return l.jsx(ih,P({as:c,direction:o==null?void 0:o.direction,slots:{root:S},slotProps:E??f},C,{ref:r}))});process.env.NODE_ENV!=="production"&&(Wi.propTypes={anchorEl:i.oneOfType([pt,i.object,i.func]),children:i.oneOfType([i.node,i.func]),component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:Io,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transition:i.bool});const Xi=Wi;function lh(e){return nt("MuiTooltip",e)}const ch=xt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),wt=ch,ph=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function dh(e){return Math.round(e*1e5)/1e5}const uh=e=>{const{classes:t,disableInteractive:r,arrow:n,touch:o,placement:a}=e,s={popper:["popper",!r&&"popperInteractive",n&&"popperArrow"],tooltip:["tooltip",n&&"tooltipArrow",o&&"touch",`tooltipPlacement${tt(a.split("-")[0])}`],arrow:["arrow"]};return ft(s,lh,t)},fh=Re(Xi,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.popper,!r.disableInteractive&&t.popperInteractive,r.arrow&&t.popperArrow,!r.open&&t.popperClose]}})(({theme:e,ownerState:t,open:r})=>P({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!r&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${wt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${wt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${wt.arrow}`]:P({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${wt.arrow}`]:P({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),mh=Re("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.tooltip,r.touch&&t.touch,r.arrow&&t.tooltipArrow,t[`tooltipPlacement${tt(r.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>P({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:hn(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${dh(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${wt.popper}[data-popper-placement*="left"] &`]:P({transformOrigin:"right center"},t.isRtl?P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):P({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${wt.popper}[data-popper-placement*="right"] &`]:P({transformOrigin:"left center"},t.isRtl?P({marginRight:"14px"},t.touch&&{marginRight:"24px"}):P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${wt.popper}[data-popper-placement*="top"] &`]:P({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${wt.popper}[data-popper-placement*="bottom"] &`]:P({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),hh=Re("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:hn(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let on=!1;const fs=new qr;let xr={x:0,y:0};function an(e,t){return r=>{t&&t(r),e(r)}}const Ki=T.forwardRef(function(t,r){var n,o,a,s,c,p,f,m,v,g,d,h,u,b,w,O,x,E,y;const S=mt({props:t,name:"MuiTooltip"}),{arrow:C=!1,children:I,components:R={},componentsProps:$={},describeChild:N=!1,disableFocusListener:_=!1,disableHoverListener:D=!1,disableInteractive:z=!1,disableTouchListener:G=!1,enterDelay:A=100,enterNextDelay:H=0,enterTouchDelay:ee=700,followCursor:V=!1,id:j,leaveDelay:L=0,leaveTouchDelay:q=1500,onClose:W,onOpen:U,open:K,placement:X="bottom",PopperComponent:J,PopperProps:Y={},slotProps:Z={},slots:Q={},title:ie,TransitionComponent:F=yo,TransitionProps:te}=S,M=he(S,ph),le=T.isValidElement(I)?I:l.jsx("span",{children:I}),Te=Jr(),Pe=Te.direction==="rtl",[Ee,Nt]=T.useState(),[$e,ot]=T.useState(null),Le=T.useRef(!1),at=z||V,Se=Sr(),zt=Sr(),Tt=Sr(),ur=Sr(),[Zr,sa]=ui({controlled:K,default:!1,name:"Tooltip",state:"open"});let st=Zr;if(process.env.NODE_ENV!=="production"){const{current:ne}=T.useRef(K!==void 0);T.useEffect(()=>{Ee&&Ee.disabled&&!ne&&ie!==""&&Ee.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ie,Ee,ne])}const Dn=di(j),fr=T.useRef(),Qr=Mr(()=>{fr.current!==void 0&&(document.body.style.WebkitUserSelect=fr.current,fr.current=void 0),ur.clear()});T.useEffect(()=>Qr,[Qr]);const ia=ne=>{fs.clear(),on=!0,sa(!0),U&&!st&&U(ne)},en=Mr(ne=>{fs.start(800+L,()=>{on=!1}),sa(!1),W&&st&&W(ne),Se.start(Te.transitions.duration.shortest,()=>{Le.current=!1})}),An=ne=>{Le.current&&ne.type!=="touchstart"||(Ee&&Ee.removeAttribute("title"),zt.clear(),Tt.clear(),A||on&&H?zt.start(on?H:A,()=>{ia(ne)}):ia(ne))},la=ne=>{zt.clear(),Tt.start(L,()=>{en(ne)})},{isFocusVisibleRef:ca,onBlur:Kl,onFocus:Yl,ref:Jl}=fi(),[,pa]=T.useState(!1),da=ne=>{Kl(ne),ca.current===!1&&(pa(!1),la(ne))},ua=ne=>{Ee||Nt(ne.currentTarget),Yl(ne),ca.current===!0&&(pa(!0),An(ne))},fa=ne=>{Le.current=!0;const Be=le.props;Be.onTouchStart&&Be.onTouchStart(ne)},ma=An,ha=la,Zl=ne=>{fa(ne),Tt.clear(),Se.clear(),Qr(),fr.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",ur.start(ee,()=>{document.body.style.WebkitUserSelect=fr.current,An(ne)})},Ql=ne=>{le.props.onTouchEnd&&le.props.onTouchEnd(ne),Qr(),Tt.start(q,()=>{en(ne)})};T.useEffect(()=>{if(!st)return;function ne(Be){(Be.key==="Escape"||Be.key==="Esc")&&en(Be)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[en,st]);const ec=We(le.ref,Jl,Nt,r);!ie&&ie!==0&&(st=!1);const Ln=T.useRef(),tc=ne=>{const Be=le.props;Be.onMouseMove&&Be.onMouseMove(ne),xr={x:ne.clientX,y:ne.clientY},Ln.current&&Ln.current.update()},mr={},Bn=typeof ie=="string";N?(mr.title=!st&&Bn&&!D?ie:null,mr["aria-describedby"]=st?Dn:null):(mr["aria-label"]=Bn?ie:null,mr["aria-labelledby"]=st&&!Bn?Dn:null);const Ue=P({},mr,M,le.props,{className:Ce(M.className,le.props.className),onTouchStart:fa,ref:ec},V?{onMouseMove:tc}:{});process.env.NODE_ENV!=="production"&&(Ue["data-mui-internal-clone-element"]=!0,T.useEffect(()=>{Ee&&!Ee.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[Ee]));const hr={};G||(Ue.onTouchStart=Zl,Ue.onTouchEnd=Ql),D||(Ue.onMouseOver=an(ma,Ue.onMouseOver),Ue.onMouseLeave=an(ha,Ue.onMouseLeave),at||(hr.onMouseOver=ma,hr.onMouseLeave=ha)),_||(Ue.onFocus=an(ua,Ue.onFocus),Ue.onBlur=an(da,Ue.onBlur),at||(hr.onFocus=ua,hr.onBlur=da)),process.env.NODE_ENV!=="production"&&le.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${le.props.title}\` or the Tooltip component.`].join(`
`));const rc=T.useMemo(()=>{var ne;let Be=[{name:"arrow",enabled:!!$e,options:{element:$e,padding:4}}];return(ne=Y.popperOptions)!=null&&ne.modifiers&&(Be=Be.concat(Y.popperOptions.modifiers)),P({},Y.popperOptions,{modifiers:Be})},[$e,Y]),gr=P({},S,{isRtl:Pe,arrow:C,disableInteractive:at,placement:X,PopperComponentProp:J,touch:Le.current}),Fn=uh(gr),ga=(n=(o=Q.popper)!=null?o:R.Popper)!=null?n:fh,ba=(a=(s=(c=Q.transition)!=null?c:R.Transition)!=null?s:F)!=null?a:yo,va=(p=(f=Q.tooltip)!=null?f:R.Tooltip)!=null?p:mh,ya=(m=(v=Q.arrow)!=null?v:R.Arrow)!=null?m:hh,nc=Cr(ga,P({},Y,(g=Z.popper)!=null?g:$.popper,{className:Ce(Fn.popper,Y==null?void 0:Y.className,(d=(h=Z.popper)!=null?h:$.popper)==null?void 0:d.className)}),gr),oc=Cr(ba,P({},te,(u=Z.transition)!=null?u:$.transition),gr),ac=Cr(va,P({},(b=Z.tooltip)!=null?b:$.tooltip,{className:Ce(Fn.tooltip,(w=(O=Z.tooltip)!=null?O:$.tooltip)==null?void 0:w.className)}),gr),sc=Cr(ya,P({},(x=Z.arrow)!=null?x:$.arrow,{className:Ce(Fn.arrow,(E=(y=Z.arrow)!=null?y:$.arrow)==null?void 0:E.className)}),gr);return l.jsxs(T.Fragment,{children:[T.cloneElement(le,Ue),l.jsx(ga,P({as:J??Xi,placement:X,anchorEl:V?{getBoundingClientRect:()=>({top:xr.y,left:xr.x,right:xr.x,bottom:xr.y,width:0,height:0})}:Ee,popperRef:Ln,open:Ee?st:!1,id:Dn,transition:!0},hr,nc,{popperOptions:rc,children:({TransitionProps:ne})=>l.jsx(ba,P({timeout:Te.transitions.duration.shorter},ne,oc,{children:l.jsxs(va,P({},ac,{children:[ie,C?l.jsx(ya,P({},sc,{ref:ot})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Ki.propTypes={arrow:i.bool,children:Hr.isRequired,classes:i.object,className:i.string,components:i.shape({Arrow:i.elementType,Popper:i.elementType,Tooltip:i.elementType,Transition:i.elementType}),componentsProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),describeChild:i.bool,disableFocusListener:i.bool,disableHoverListener:i.bool,disableInteractive:i.bool,disableTouchListener:i.bool,enterDelay:i.number,enterNextDelay:i.number,enterTouchDelay:i.number,followCursor:i.bool,id:i.string,leaveDelay:i.number,leaveTouchDelay:i.number,onClose:i.func,onOpen:i.func,open:i.bool,placement:i.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:i.elementType,PopperProps:i.object,slotProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),slots:i.shape({arrow:i.elementType,popper:i.elementType,tooltip:i.elementType,transition:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),title:i.node,TransitionComponent:i.elementType,TransitionProps:i.object});const gh=Ki;function ms(e,t,r){return e?l.jsx(Ne.ListItemIcon,{className:`papi-menu-icon-${r?"leading":"trailing"}`,children:l.jsx("img",{src:e,alt:`${r?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Jo(e){const{onClick:t,label:r,tooltip:n,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:s=void 0,hasAutoFocus:c=!1,className:p,isDisabled:f=!1,isDense:m=!0,isSubMenuParent:v=!1,hasDisabledGutters:g=!1,hasDivider:d=!1,focusVisibleClassName:h,id:u,children:b}=e,w=l.jsx(Ne.MenuItem,{sx:{lineHeight:.8},autoFocus:c,className:p,disabled:f,dense:m,disableGutters:g,divider:d,focusVisibleClassName:h,onClick:t,id:u,children:r?l.jsxs(l.Fragment,{children:[ms(a,r,!0),l.jsx(Ne.ListItemText,{primary:r,inset:!a&&o}),v?l.jsx(Ne.ListItemIcon,{className:"papi-menu-icon-trailing",children:l.jsx(ji,{})}):ms(s,r,!1)]}):b});return n?l.jsx(gh,{title:n,placement:"right",children:l.jsx("div",{children:w})}):w}function Yi(e){return Object.entries(e.groups).map(([r,n])=>({id:r,group:n}))}function bh(e){const[t,r]=k.useState(void 0),{parentMenuItem:n,parentItemProps:o,menuDefinition:a}=e,s=f=>{r(f.currentTarget)},c=()=>{r(void 0)},p=()=>{let f=Yi(a).filter(m=>"menuItem"in m.group);if(!(n!=null&&n.id))throw new Error("A valid parent menu item is required for submenus.");return f=f.filter(m=>"menuItem"in m.group&&m.group.menuItem===n.id),l.jsx(Zo,{...e,includedGroups:f})};return l.jsxs(l.Fragment,{children:[l.jsx(Jo,{onClick:s,...o,isSubMenuParent:!0}),l.jsx(Ne.Menu,{anchorEl:t,open:!!t,onClose:c,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:p()},n.id)]})}const vh=(e,t)=>t.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function Zo(e){const{menuDefinition:t,onClick:r,commandHandler:n,includedGroups:o}=e,{items:a,allowForLeadingIcons:s}=k.useMemo(()=>{const m=o&&o.length>0?o:Yi(t).filter(h=>!("menuItem"in h.group)),v=Object.values(m).sort((h,u)=>(h.group.order||0)-(u.group.order||0)),g=[];v.forEach(h=>{vh(h.id,t.items).forEach(u=>g.push({item:u,isLastItemInGroup:!1})),g.length>0&&(g[g.length-1].isLastItemInGroup=!0)}),g.length>0&&(g[g.length-1].isLastItemInGroup=!1);const d=g.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:g,allowForLeadingIcons:d}},[o,t]),c=({item:m,isLastItemInGroup:v})=>({className:"papi-menu-item",label:m.label,tooltip:m.tooltip,iconPathBefore:"iconPathBefore"in m?m.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in m?m.iconPathAfter:void 0,hasDivider:v,allowForLeadingIcons:s}),[p]=a;if(!p)return l.jsx("div",{});const f=p.item.group;return l.jsx("div",{role:"menu","aria-label":f,children:a.map((m,v)=>{const{item:g}=m,d=c(m);if("command"in g){const h=g.group+v;return l.jsx(Jo,{onClick:u=>{r==null||r(u),n(g)},...d},h)}return l.jsx(bh,{parentMenuItem:g,parentItemProps:d,...e},f+g.id)})},f)}function yh(e){const{menuDefinition:t,columnId:r}=e;let a=Object.entries(t.groups).map(([s,c])=>({id:s,group:c})).filter(s=>"column"in s.group);return r&&"columns"in t&&t.columns[r]&&(a=a.filter(s=>"column"in s.group&&s.group.column===r)),l.jsx(Zo,{...e,includedGroups:a})}function wh({commandHandler:e,menuDefinition:t,id:r,metadata:n,onClick:o,className:a}){return l.jsxs(Ne.Grid,{id:r,item:!0,xs:"auto",role:"menu","aria-label":r,className:`papi-menu-column ${a??""}`,children:[l.jsx("h3",{"aria-label":n.label,className:`papi-menu-column-header ${a??""}`,children:n.label}),l.jsx(Ne.List,{id:r,dense:!0,className:a??"",children:l.jsx(yh,{commandHandler:e,menuDefinition:t,columnId:r,onClick:o})})]})}function Ji({commandHandler:e,className:t,multiColumnMenu:r,id:n}){const{columns:o}=r,a=k.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(c=>{if(c==="isExtensible")return;const p=c,f=o[p];typeof f=="object"&&typeof f.order=="number"&&!Number.isNaN(f.order)?s.set(f.order,{id:p,metadata:f}):console.warn(`Property ${c} (${typeof f}) on menu ${n} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((c,p)=>(c.metadata.order||0)-(p.metadata.order||0))},[o,n]);return l.jsx(Ne.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:n,children:a.map((s,c)=>l.jsx(wh,{commandHandler:e,menuDefinition:r,...s,className:t},c))})}const Zi=T.createContext({});process.env.NODE_ENV!=="production"&&(Zi.displayName="ListContext");const xh=Zi;function Eh(e){return nt("MuiList",e)}xt("MuiList",["root","padding","dense","subheader"]);const kh=["children","className","component","dense","disablePadding","subheader"],Nh=e=>{const{classes:t,disablePadding:r,dense:n,subheader:o}=e;return ft({root:["root",!r&&"padding",n&&"dense",o&&"subheader"]},Eh,t)},Th=Re("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,!r.disablePadding&&t.padding,r.dense&&t.dense,r.subheader&&t.subheader]}})(({ownerState:e})=>P({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Qi=T.forwardRef(function(t,r){const n=mt({props:t,name:"MuiList"}),{children:o,className:a,component:s="ul",dense:c=!1,disablePadding:p=!1,subheader:f}=n,m=he(n,kh),v=T.useMemo(()=>({dense:c}),[c]),g=P({},n,{component:s,dense:c,disablePadding:p}),d=Nh(g);return l.jsx(xh.Provider,{value:v,children:l.jsxs(Th,P({as:s,className:Ce(d.root,a),ref:r,ownerState:g},m,{children:[f,o]}))})});process.env.NODE_ENV!=="production"&&(Qi.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,dense:i.bool,disablePadding:i.bool,subheader:i.node,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const Sh=Qi,Ch=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Qn(e,t,r){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:r?null:e.firstChild}function hs(e,t,r){return e===t?r?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:r?null:e.lastChild}function el(e,t){if(t===void 0)return!0;let r=e.innerText;return r===void 0&&(r=e.textContent),r=r.trim().toLowerCase(),r.length===0?!1:t.repeating?r[0]===t.keys[0]:r.indexOf(t.keys.join(""))===0}function Er(e,t,r,n,o,a){let s=!1,c=o(e,t,t?r:!1);for(;c;){if(c===e.firstChild){if(s)return!1;s=!0}const p=n?!1:c.disabled||c.getAttribute("aria-disabled")==="true";if(!c.hasAttribute("tabindex")||!el(c,a)||p)c=o(e,c,r);else return c.focus(),!0}return!1}const tl=T.forwardRef(function(t,r){const{actions:n,autoFocus:o=!1,autoFocusItem:a=!1,children:s,className:c,disabledItemsFocusable:p=!1,disableListWrap:f=!1,onKeyDown:m,variant:v="selectedMenu"}=t,g=he(t,Ch),d=T.useRef(null),h=T.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Lt(()=>{o&&d.current.focus()},[o]),T.useImperativeHandle(n,()=>({adjustStyleForScrollbar:(x,E)=>{const y=!d.current.style.width;if(x.clientHeight<d.current.clientHeight&&y){const S=`${mi(Oe(x))}px`;d.current.style[E.direction==="rtl"?"paddingLeft":"paddingRight"]=S,d.current.style.width=`calc(100% + ${S})`}return d.current}}),[]);const u=x=>{const E=d.current,y=x.key,S=Oe(E).activeElement;if(y==="ArrowDown")x.preventDefault(),Er(E,S,f,p,Qn);else if(y==="ArrowUp")x.preventDefault(),Er(E,S,f,p,hs);else if(y==="Home")x.preventDefault(),Er(E,null,f,p,Qn);else if(y==="End")x.preventDefault(),Er(E,null,f,p,hs);else if(y.length===1){const C=h.current,I=y.toLowerCase(),R=performance.now();C.keys.length>0&&(R-C.lastTime>500?(C.keys=[],C.repeating=!0,C.previousKeyMatched=!0):C.repeating&&I!==C.keys[0]&&(C.repeating=!1)),C.lastTime=R,C.keys.push(I);const $=S&&!C.repeating&&el(S,C);C.previousKeyMatched&&($||Er(E,S,!1,p,Qn,C))?x.preventDefault():C.previousKeyMatched=!1}m&&m(x)},b=We(d,r);let w=-1;T.Children.forEach(s,(x,E)=>{if(!T.isValidElement(x)){w===E&&(w+=1,w>=s.length&&(w=-1));return}process.env.NODE_ENV!=="production"&&un.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(v==="selectedMenu"&&x.props.selected||w===-1)&&(w=E),w===E&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(w+=1,w>=s.length&&(w=-1))});const O=T.Children.map(s,(x,E)=>{if(E===w){const y={};return a&&(y.autoFocus=!0),x.props.tabIndex===void 0&&v==="selectedMenu"&&(y.tabIndex=0),T.cloneElement(x,y)}return x});return l.jsx(Sh,P({role:"menu",ref:b,className:c,onKeyDown:u,tabIndex:o?0:-1},g,{children:O}))});process.env.NODE_ENV!=="production"&&(tl.propTypes={autoFocus:i.bool,autoFocusItem:i.bool,children:i.node,className:i.string,disabledItemsFocusable:i.bool,disableListWrap:i.bool,onKeyDown:i.func,variant:i.oneOf(["menu","selectedMenu"])});const jh=tl,Oh=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Rh={entering:{opacity:1},entered:{opacity:1}},rl=T.forwardRef(function(t,r){const n=Jr(),o={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:a,appear:s=!0,children:c,easing:p,in:f,onEnter:m,onEntered:v,onEntering:g,onExit:d,onExited:h,onExiting:u,style:b,timeout:w=o,TransitionComponent:O=Hi}=t,x=he(t,Oh),E=T.useRef(null),y=We(E,c.ref,r),S=z=>G=>{if(z){const A=E.current;G===void 0?z(A):z(A,G)}},C=S(g),I=S((z,G)=>{qi(z);const A=yn({style:b,timeout:w,easing:p},{mode:"enter"});z.style.webkitTransition=n.transitions.create("opacity",A),z.style.transition=n.transitions.create("opacity",A),m&&m(z,G)}),R=S(v),$=S(u),N=S(z=>{const G=yn({style:b,timeout:w,easing:p},{mode:"exit"});z.style.webkitTransition=n.transitions.create("opacity",G),z.style.transition=n.transitions.create("opacity",G),d&&d(z)}),_=S(h),D=z=>{a&&a(E.current,z)};return l.jsx(O,P({appear:s,in:f,nodeRef:E,onEnter:I,onEntered:R,onEntering:C,onExit:N,onExited:_,onExiting:$,addEndListener:D,timeout:w},x,{children:(z,G)=>T.cloneElement(c,P({style:P({opacity:0,visibility:z==="exited"&&!f?"hidden":void 0},Rh[z],b,c.props.style),ref:y},G))}))});process.env.NODE_ENV!=="production"&&(rl.propTypes={addEndListener:i.func,appear:i.bool,children:Hr.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Ph=rl;function $h(e){return nt("MuiBackdrop",e)}xt("MuiBackdrop",["root","invisible"]);const Ih=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],_h=e=>{const{classes:t,invisible:r}=e;return ft({root:["root",r&&"invisible"]},$h,t)},Mh=Re("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.invisible&&t.invisible]}})(({ownerState:e})=>P({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),nl=T.forwardRef(function(t,r){var n,o,a;const s=mt({props:t,name:"MuiBackdrop"}),{children:c,className:p,component:f="div",components:m={},componentsProps:v={},invisible:g=!1,open:d,slotProps:h={},slots:u={},TransitionComponent:b=Ph,transitionDuration:w}=s,O=he(s,Ih),x=P({},s,{component:f,invisible:g}),E=_h(x),y=(n=h.root)!=null?n:v.root;return l.jsx(b,P({in:d,timeout:w},O,{children:l.jsx(Mh,P({"aria-hidden":!0},y,{as:(o=(a=u.root)!=null?a:m.Root)!=null?o:f,className:Ce(E.root,p,y==null?void 0:y.className),ownerState:P({},x,y==null?void 0:y.ownerState),classes:E,ref:r,children:c}))}))});process.env.NODE_ENV!=="production"&&(nl.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.object}),invisible:i.bool,open:i.bool.isRequired,slotProps:i.shape({root:i.object}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Dh=nl;function Ah(e){return nt("MuiModal",e)}xt("MuiModal",["root","hidden","backdrop"]);const Lh=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Bh=e=>{const{open:t,exited:r,classes:n}=e;return ft({root:["root",!t&&r&&"hidden"],backdrop:["backdrop"]},Ah,n)},Fh=Re("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,!r.open&&r.exited&&t.hidden]}})(({theme:e,ownerState:t})=>P({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Vh=Re(Dh,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),ol=T.forwardRef(function(t,r){var n,o,a,s,c,p;const f=mt({name:"MuiModal",props:t}),{BackdropComponent:m=Vh,BackdropProps:v,className:g,closeAfterTransition:d=!1,children:h,container:u,component:b,components:w={},componentsProps:O={},disableAutoFocus:x=!1,disableEnforceFocus:E=!1,disableEscapeKeyDown:y=!1,disablePortal:S=!1,disableRestoreFocus:C=!1,disableScrollLock:I=!1,hideBackdrop:R=!1,keepMounted:$=!1,onBackdropClick:N,open:_,slotProps:D,slots:z}=f,G=he(f,Lh),A=P({},f,{closeAfterTransition:d,disableAutoFocus:x,disableEnforceFocus:E,disableEscapeKeyDown:y,disablePortal:S,disableRestoreFocus:C,disableScrollLock:I,hideBackdrop:R,keepMounted:$}),{getRootProps:H,getBackdropProps:ee,getTransitionProps:V,portalRef:j,isTopModal:L,exited:q,hasTransition:W}=Bf(P({},A,{rootRef:r})),U=P({},A,{exited:q}),K=Bh(U),X={};if(h.props.tabIndex===void 0&&(X.tabIndex="-1"),W){const{onEnter:te,onExited:M}=V();X.onEnter=te,X.onExited=M}const J=(n=(o=z==null?void 0:z.root)!=null?o:w.Root)!=null?n:Fh,Y=(a=(s=z==null?void 0:z.backdrop)!=null?s:w.Backdrop)!=null?a:m,Z=(c=D==null?void 0:D.root)!=null?c:O.root,Q=(p=D==null?void 0:D.backdrop)!=null?p:O.backdrop,ie=Ft({elementType:J,externalSlotProps:Z,externalForwardedProps:G,getSlotProps:H,additionalProps:{ref:r,as:b},ownerState:U,className:Ce(g,Z==null?void 0:Z.className,K==null?void 0:K.root,!U.open&&U.exited&&(K==null?void 0:K.hidden))}),F=Ft({elementType:Y,externalSlotProps:Q,additionalProps:v,getSlotProps:te=>ee(P({},te,{onClick:M=>{N&&N(M),te!=null&&te.onClick&&te.onClick(M)}})),className:Ce(Q==null?void 0:Q.className,v==null?void 0:v.className,K==null?void 0:K.backdrop),ownerState:U});return!$&&!_&&(!W||q)?null:l.jsx(Ar,{ref:j,container:u,disablePortal:S,children:l.jsxs(J,P({},ie,{children:[!R&&m?l.jsx(Y,P({},F)):null,l.jsx(gn,{disableEnforceFocus:E,disableAutoFocus:x,disableRestoreFocus:C,isEnabled:L,open:_,children:T.cloneElement(h,X)})]}))})});process.env.NODE_ENV!=="production"&&(ol.propTypes={BackdropComponent:i.elementType,BackdropProps:i.object,children:Hr.isRequired,classes:i.object,className:i.string,closeAfterTransition:i.bool,component:i.elementType,components:i.shape({Backdrop:i.elementType,Root:i.elementType}),componentsProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([pt,i.func]),disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableEscapeKeyDown:i.bool,disablePortal:i.bool,disableRestoreFocus:i.bool,disableScrollLock:i.bool,hideBackdrop:i.bool,keepMounted:i.bool,onBackdropClick:i.func,onClose:i.func,onTransitionEnter:i.func,onTransitionExited:i.func,open:i.bool.isRequired,slotProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({backdrop:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const zh=ol;function Uh(e){return nt("MuiPaper",e)}xt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Gh=["className","component","elevation","square","variant"],Hh=e=>{const{square:t,elevation:r,variant:n,classes:o}=e,a={root:["root",n,!t&&"rounded",n==="elevation"&&`elevation${r}`]};return ft(a,Uh,o)},qh=Re("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],!r.square&&t.rounded,r.variant==="elevation"&&t[`elevation${r.elevation}`]]}})(({theme:e,ownerState:t})=>{var r;return P({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&P({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${hn("#fff",us(t.elevation))}, ${hn("#fff",us(t.elevation))})`},e.vars&&{backgroundImage:(r=e.vars.overlays)==null?void 0:r[t.elevation]}))}),al=T.forwardRef(function(t,r){const n=mt({props:t,name:"MuiPaper"}),{className:o,component:a="div",elevation:s=1,square:c=!1,variant:p="elevation"}=n,f=he(n,Gh),m=P({},n,{component:a,elevation:s,square:c,variant:p}),v=Hh(m);return process.env.NODE_ENV!=="production"&&Jr().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),l.jsx(qh,P({as:a,ownerState:m,className:Ce(v.root,o),ref:r},f))});process.env.NODE_ENV!=="production"&&(al.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,elevation:pr(bi,e=>{const{elevation:t,variant:r}=e;return t>0&&r==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${r}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:i.bool,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),variant:i.oneOfType([i.oneOf(["elevation","outlined"]),i.string])});const Wh=al;function Xh(e){return nt("MuiPopover",e)}xt("MuiPopover",["root","paper"]);const Kh=["onEntering"],Yh=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Jh=["slotProps"];function gs(e,t){let r=0;return typeof t=="number"?r=t:t==="center"?r=e.height/2:t==="bottom"&&(r=e.height),r}function bs(e,t){let r=0;return typeof t=="number"?r=t:t==="center"?r=e.width/2:t==="right"&&(r=e.width),r}function vs(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function pn(e){return typeof e=="function"?e():e}const Zh=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"]},Xh,t)},Qh=Re(zh,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),sl=Re(Wh,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),il=T.forwardRef(function(t,r){var n,o,a;const s=mt({props:t,name:"MuiPopover"}),{action:c,anchorEl:p,anchorOrigin:f={vertical:"top",horizontal:"left"},anchorPosition:m,anchorReference:v="anchorEl",children:g,className:d,container:h,elevation:u=8,marginThreshold:b=16,open:w,PaperProps:O={},slots:x,slotProps:E,transformOrigin:y={vertical:"top",horizontal:"left"},TransitionComponent:S=yo,transitionDuration:C="auto",TransitionProps:{onEntering:I}={},disableScrollLock:R=!1}=s,$=he(s.TransitionProps,Kh),N=he(s,Yh),_=(n=E==null?void 0:E.paper)!=null?n:O,D=T.useRef(),z=We(D,_.ref),G=P({},s,{anchorOrigin:f,anchorReference:v,elevation:u,marginThreshold:b,externalPaperSlotProps:_,transformOrigin:y,TransitionComponent:S,transitionDuration:C,TransitionProps:$}),A=Zh(G),H=T.useCallback(()=>{if(v==="anchorPosition")return process.env.NODE_ENV!=="production"&&(m||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),m;const te=pn(p),M=te&&te.nodeType===1?te:Oe(D.current).body,le=M.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Te=M.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Te.top===0&&Te.left===0&&Te.right===0&&Te.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:le.top+gs(le,f.vertical),left:le.left+bs(le,f.horizontal)}},[p,f.horizontal,f.vertical,m,v]),ee=T.useCallback(te=>({vertical:gs(te,y.vertical),horizontal:bs(te,y.horizontal)}),[y.horizontal,y.vertical]),V=T.useCallback(te=>{const M={width:te.offsetWidth,height:te.offsetHeight},le=ee(M);if(v==="none")return{top:null,left:null,transformOrigin:vs(le)};const Te=H();let Pe=Te.top-le.vertical,Ee=Te.left-le.horizontal;const Nt=Pe+M.height,$e=Ee+M.width,ot=rr(pn(p)),Le=ot.innerHeight-b,at=ot.innerWidth-b;if(b!==null&&Pe<b){const Se=Pe-b;Pe-=Se,le.vertical+=Se}else if(b!==null&&Nt>Le){const Se=Nt-Le;Pe-=Se,le.vertical+=Se}if(process.env.NODE_ENV!=="production"&&M.height>Le&&M.height&&Le&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${M.height-Le}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),b!==null&&Ee<b){const Se=Ee-b;Ee-=Se,le.horizontal+=Se}else if($e>at){const Se=$e-at;Ee-=Se,le.horizontal+=Se}return{top:`${Math.round(Pe)}px`,left:`${Math.round(Ee)}px`,transformOrigin:vs(le)}},[p,v,H,ee,b]),[j,L]=T.useState(w),q=T.useCallback(()=>{const te=D.current;if(!te)return;const M=V(te);M.top!==null&&(te.style.top=M.top),M.left!==null&&(te.style.left=M.left),te.style.transformOrigin=M.transformOrigin,L(!0)},[V]);T.useEffect(()=>(R&&window.addEventListener("scroll",q),()=>window.removeEventListener("scroll",q)),[p,R,q]);const W=(te,M)=>{I&&I(te,M),q()},U=()=>{L(!1)};T.useEffect(()=>{w&&q()}),T.useImperativeHandle(c,()=>w?{updatePosition:()=>{q()}}:null,[w,q]),T.useEffect(()=>{if(!w)return;const te=pi(()=>{q()}),M=rr(p);return M.addEventListener("resize",te),()=>{te.clear(),M.removeEventListener("resize",te)}},[p,w,q]);let K=C;C==="auto"&&!S.muiSupportAuto&&(K=void 0);const X=h||(p?Oe(pn(p)).body:void 0),J=(o=x==null?void 0:x.root)!=null?o:Qh,Y=(a=x==null?void 0:x.paper)!=null?a:sl,Z=Ft({elementType:Y,externalSlotProps:P({},_,{style:j?_.style:P({},_.style,{opacity:0})}),additionalProps:{elevation:u,ref:z},ownerState:G,className:Ce(A.paper,_==null?void 0:_.className)}),Q=Ft({elementType:J,externalSlotProps:(E==null?void 0:E.root)||{},externalForwardedProps:N,additionalProps:{ref:r,slotProps:{backdrop:{invisible:!0}},container:X,open:w},ownerState:G,className:Ce(A.root,d)}),{slotProps:ie}=Q,F=he(Q,Jh);return l.jsx(J,P({},F,!Oi(J)&&{slotProps:ie,disableScrollLock:R},{children:l.jsx(S,P({appear:!0,in:w,onEntering:W,onExited:U,timeout:K},$,{children:l.jsx(Y,P({},Z,{children:g}))}))}))});process.env.NODE_ENV!=="production"&&(il.propTypes={action:Io,anchorEl:pr(i.oneOfType([pt,i.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=pn(e.anchorEl);if(t&&t.nodeType===1){const r=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&r.top===0&&r.left===0&&r.right===0&&r.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),anchorPosition:i.shape({left:i.number.isRequired,top:i.number.isRequired}),anchorReference:i.oneOf(["anchorEl","anchorPosition","none"]),children:i.node,classes:i.object,className:i.string,container:i.oneOfType([pt,i.func]),disableScrollLock:i.bool,elevation:bi,marginThreshold:i.number,onClose:i.func,open:i.bool.isRequired,PaperProps:i.shape({component:Rp}),slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transformOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object});const eg=il;function tg(e){return nt("MuiMenu",e)}xt("MuiMenu",["root","paper","list"]);const rg=["onEntering"],ng=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],og={vertical:"top",horizontal:"right"},ag={vertical:"top",horizontal:"left"},sg=e=>{const{classes:t}=e;return ft({root:["root"],paper:["paper"],list:["list"]},tg,t)},ig=Re(eg,{shouldForwardProp:e=>Si(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),lg=Re(sl,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),cg=Re(jh,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),ll=T.forwardRef(function(t,r){var n,o;const a=mt({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:c,className:p,disableAutoFocusItem:f=!1,MenuListProps:m={},onClose:v,open:g,PaperProps:d={},PopoverClasses:h,transitionDuration:u="auto",TransitionProps:{onEntering:b}={},variant:w="selectedMenu",slots:O={},slotProps:x={}}=a,E=he(a.TransitionProps,rg),y=he(a,ng),S=Jr(),C=S.direction==="rtl",I=P({},a,{autoFocus:s,disableAutoFocusItem:f,MenuListProps:m,onEntering:b,PaperProps:d,transitionDuration:u,TransitionProps:E,variant:w}),R=sg(I),$=s&&!f&&g,N=T.useRef(null),_=(V,j)=>{N.current&&N.current.adjustStyleForScrollbar(V,S),b&&b(V,j)},D=V=>{V.key==="Tab"&&(V.preventDefault(),v&&v(V,"tabKeyDown"))};let z=-1;T.Children.map(c,(V,j)=>{T.isValidElement(V)&&(process.env.NODE_ENV!=="production"&&un.isFragment(V)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),V.props.disabled||(w==="selectedMenu"&&V.props.selected||z===-1)&&(z=j))});const G=(n=O.paper)!=null?n:lg,A=(o=x.paper)!=null?o:d,H=Ft({elementType:O.root,externalSlotProps:x.root,ownerState:I,className:[R.root,p]}),ee=Ft({elementType:G,externalSlotProps:A,ownerState:I,className:R.paper});return l.jsx(ig,P({onClose:v,anchorOrigin:{vertical:"bottom",horizontal:C?"right":"left"},transformOrigin:C?og:ag,slots:{paper:G,root:O.root},slotProps:{root:H,paper:ee},open:g,ref:r,transitionDuration:u,TransitionProps:P({onEntering:_},E),ownerState:I},y,{classes:h,children:l.jsx(cg,P({onKeyDown:D,actions:N,autoFocus:s&&(z===-1||f),autoFocusItem:$,variant:w},m,{className:Ce(R.list,m.className),children:c}))}))});process.env.NODE_ENV!=="production"&&(ll.propTypes={anchorEl:i.oneOfType([pt,i.func]),autoFocus:i.bool,children:i.node,classes:i.object,className:i.string,disableAutoFocusItem:i.bool,MenuListProps:i.object,onClose:i.func,open:i.bool.isRequired,PaperProps:i.object,PopoverClasses:i.object,slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object,variant:i.oneOf(["menu","selectedMenu"])});const pg=ll;function dg({className:e,commandHandler:t,menuDefinition:r,children:n}){var f;const[o,a]=k.useState(void 0),s=k.useCallback(m=>{m.preventDefault(),a(o===void 0?{mouseX:m.clientX+2,mouseY:m.clientY-6}:void 0)},[o]),c=k.useCallback(()=>{a(void 0)},[]),p=k.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((f=r==null?void 0:r.items)==null?void 0:f.length)??0)===0||!n?n:l.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[n,l.jsx(pg,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:c,anchorReference:"anchorPosition",anchorPosition:p,children:l.jsx(Zo,{menuDefinition:r,commandHandler:t,onClick:c})})]})}function ug(e){return{preserveValue:!0,...e}}const wn=(e,t,r={})=>{const n=k.useRef(t);n.current=t;const o=k.useRef(r);o.current=ug(o.current);const[a,s]=k.useState(()=>n.current),[c,p]=k.useState(!0);return k.useEffect(()=>{let f=!0;return p(!!e),(async()=>{if(e){const m=await e();f&&(s(()=>m),p(!1))}})(),()=>{f=!1,o.current.preserveValue||s(()=>n.current)}},[e]),[a,c]},fg=Ci(l.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function cl({menuProvider:e,normalMenu:t,fullMenu:r,commandHandler:n,containerRef:o,className:a,ariaLabelPrefix:s,children:c}){const[p,f]=k.useState(!1),[m,v]=k.useState(!1),g=k.useCallback(()=>{p&&f(!1),v(!1)},[p]),d=k.useCallback(E=>{E.stopPropagation(),f(y=>{const S=!y;return S&&E.shiftKey?v(!0):S||v(!1),S})},[]),h=k.useCallback(E=>(g(),n(E)),[n,g]),[u,b]=k.useState({top:1,left:1});k.useEffect(()=>{if(p){const E=o==null?void 0:o.current;if(E){const y=E.getBoundingClientRect(),S=window.scrollY,C=window.scrollX,I=y.top+S+E.clientHeight,R=y.left+C;b({top:I,left:R})}}},[p,o]);const[w]=wn(k.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,p]),t),[O]=wn(k.useCallback(async()=>(e==null?void 0:e(!0))??r??w,[e,r,w,p]),r??w),x=m&&O?O:w;return l.jsxs(l.Fragment,{children:[l.jsx(Ne.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:d,children:c??l.jsx(fg,{})}),l.jsx(Ne.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:p,onClose:g,PaperProps:{className:"papi-menu-drawer-paper",style:{top:u.top,left:u.left}},children:x?l.jsx(Ji,{className:a,id:`${s??""} main menu`,commandHandler:h,multiColumnMenu:x}):void 0})]})}function mg({id:e,label:t,isDisabled:r=!1,tooltip:n,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:s="medium",className:c,onClick:p,children:f}){return l.jsx(Ne.IconButton,{id:e,disabled:r,edge:a,size:s,"aria-label":t,title:o?void 0:n??t,className:`papi-icon-button ${c??""}`,onClick:p,children:f})}const yt="scrBook",hg="scrRef",Ot="source",gg="details",bg="Scripture Reference",vg="Scripture Book",pl="Type",yg="Details";function wg(e,t){const r=t??!1;return[{accessorFn:n=>`${me.bookNumberToId(n.start.bookNum)} ${n.start.chapterNum}:${n.start.verseNum}`,id:yt,header:(e==null?void 0:e.scriptureReferenceColumnName)??bg,cell:n=>{const o=n.row.original;return n.row.getIsGrouped()?me.bookNumberToEnglishName(o.start.bookNum):n.row.groupingColumnId===yt?re.formatScrRef(o.start):void 0},getGroupingValue:n=>n.start.bookNum,sortingFn:(n,o)=>re.compareScrRefs(n.original.start,o.original.start),enableGrouping:!0},{accessorFn:n=>re.formatScrRef(n.start),id:hg,header:void 0,cell:n=>{const o=n.row.original;return n.row.getIsGrouped()?void 0:re.formatScrRef(o.start)},sortingFn:(n,o)=>re.compareScrRefs(n.original.start,o.original.start),enableGrouping:!1},{accessorFn:n=>n.source.displayName,id:Ot,header:r?(e==null?void 0:e.typeColumnName)??pl:void 0,cell:n=>r||n.row.getIsGrouped()?n.getValue():void 0,getGroupingValue:n=>n.source.id,sortingFn:(n,o)=>n.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:n=>n.detail,id:gg,header:(e==null?void 0:e.detailsColumnName)??yg,cell:n=>n.getValue(),enableGrouping:!1}]}const xg=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:t}=e.start;let r=0;return e.end&&({offset:r}=e.end),!e.end||re.compareScrRefs(e.start,e.end)===0?`${re.scrRefToBBBCCCVVV(e.start)}+${t}`:`${re.scrRefToBBBCCCVVV(e.start)}+${t}-${re.scrRefToBBBCCCVVV(e.end)}+${r}`},ys=e=>`${xg({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function Eg({sources:e,showColumnHeaders:t=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:n,scriptureBookGroupName:o,typeColumnName:a,detailsColumnName:s,onRowSelected:c,direction:p="ltr"}){const[f,m]=k.useState([]),[v,g]=k.useState([{id:yt,desc:!1}]),[d,h]=k.useState({}),u=k.useMemo(()=>e.flatMap(R=>R.data.map($=>({...$,source:R.source}))),[e]),b=k.useMemo(()=>wg({scriptureReferenceColumnName:n,typeColumnName:a,detailsColumnName:s},r),[n,a,s,r]);k.useEffect(()=>{f.includes(Ot)?g([{id:Ot,desc:!1},{id:yt,desc:!1}]):g([{id:yt,desc:!1}])},[f]);const w=je.useReactTable({data:u,columns:b,state:{grouping:f,sorting:v,rowSelection:d},onGroupingChange:m,onSortingChange:g,onRowSelectionChange:h,getExpandedRowModel:je.getExpandedRowModel(),getGroupedRowModel:je.getGroupedRowModel(),getCoreRowModel:je.getCoreRowModel(),getSortedRowModel:je.getSortedRowModel(),getRowId:ys,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});k.useEffect(()=>{if(c){const R=w.getSelectedRowModel().rowsById,$=Object.keys(R);if($.length===1){const N=u.find(_=>ys(_)===$[0])||void 0;N&&c(N)}}},[d,u,c,w]);const O=o??vg,x=a??pl,E=[{label:"No Grouping",value:[]},{label:`Group by ${O}`,value:[yt]},{label:`Group by ${x}`,value:[Ot]},{label:`Group by ${O} and ${x}`,value:[yt,Ot]},{label:`Group by ${x} and ${O}`,value:[Ot,yt]}],y=R=>{m(JSON.parse(R))},S=(R,$)=>{!R.getIsGrouped()&&!R.getIsSelected()&&R.getToggleSelectedHandler()($)},C=(R,$)=>R.getIsGrouped()?"":B("banded-row",$%2===0?"even":"odd"),I=(R,$,N)=>{if(!((R==null?void 0:R.length)===0||$.depth<N.column.getGroupedIndex())){if($.getIsGrouped())switch($.depth){case 1:return"pr-ps-4";default:return}switch($.depth){case 1:return"pr-ps-8";case 2:return"pr-ps-12";default:return}}};return l.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-w-full pr-flex-col",children:[!t&&l.jsxs(Zt,{value:JSON.stringify(f),onValueChange:R=>{y(R)},children:[l.jsx(Mt,{className:"pr-mb-1 pr-mt-2",children:l.jsx(Qt,{})}),l.jsx(Dt,{position:"item-aligned",children:l.jsx(zs,{children:E.map(R=>l.jsx(Ge,{value:JSON.stringify(R.value),children:R.label},R.label))})})]}),l.jsxs(zr,{className:"pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0",children:[t&&l.jsx(Ur,{children:w.getHeaderGroups().map(R=>l.jsx(lt,{children:R.headers.filter($=>$.column.columnDef.header).map($=>l.jsx(er,{colSpan:$.colSpan,className:"top-0 pr-sticky",children:$.isPlaceholder?void 0:l.jsxs("div",{children:[$.column.getCanGroup()?l.jsx(ve,{variant:"ghost",title:`Toggle grouping by ${$.column.columnDef.header}`,onClick:$.column.getToggleGroupingHandler(),type:"button",children:$.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",je.flexRender($.column.columnDef.header,$.getContext())]})},$.id))},R.id))}),l.jsx(Gr,{children:w.getRowModel().rows.map((R,$)=>l.jsx(lt,{"data-state":R.getIsSelected()?"selected":"",className:B(C(R,$)),onClick:N=>S(R,N),children:R.getVisibleCells().map(N=>{if(!(N.getIsPlaceholder()||N.column.columnDef.enableGrouping&&!N.getIsGrouped()&&(N.column.columnDef.id!==Ot||!r)))return l.jsx(At,{className:B(N.column.columnDef.id,"pr-p-[1px]",I(f,R,N)),children:(()=>N.getIsGrouped()?l.jsxs(ve,{variant:"link",onClick:R.getToggleExpandedHandler(),type:"button",children:[R.getIsExpanded()&&l.jsx(oe.ChevronDown,{}),!R.getIsExpanded()&&(p==="ltr"?l.jsx(oe.ChevronRight,{}):l.jsx(oe.ChevronLeft,{}))," ",je.flexRender(N.column.columnDef.cell,N.getContext())," (",R.subRows.length,")"]}):je.flexRender(N.column.columnDef.cell,N.getContext()))()},N.id)})},R.id))})]})]})}function dl({onSearch:e,placeholder:t,isFullWidth:r}){const[n,o]=k.useState(""),a=s=>{o(s),e(s)};return l.jsx(ir,{className:B("pr-flex pr-h-10 pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-[color:hsl(240,5%,64.9%)] focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",{"pr-w-full":r}),placeholder:t,value:n,onChange:s=>a(s.target.value)})}function kg({id:e,isDisabled:t=!1,orientation:r="horizontal",min:n=0,max:o=100,step:a=1,showMarks:s=!1,defaultValue:c,value:p,valueLabelDisplay:f="off",className:m,onChange:v,onChangeCommitted:g}){return l.jsx(Ne.Slider,{id:e,disabled:t,orientation:r,min:n,max:o,step:a,marks:s,defaultValue:c,value:p,valueLabelDisplay:f,className:`papi-slider ${r} ${m??""}`,onChange:v,onChangeCommitted:g})}function Ng({autoHideDuration:e=void 0,id:t,isOpen:r=!1,className:n,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:s,children:c}){const p={action:(s==null?void 0:s.action)||c,message:s==null?void 0:s.message,className:n};return l.jsx(Ne.Snackbar,{autoHideDuration:e??void 0,open:r,onClose:o,anchorOrigin:a,id:t,ContentProps:p})}const Qo=k.forwardRef(({className:e,...t},r)=>l.jsx(Ae.Root,{orientation:"vertical",ref:r,className:B("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));Qo.displayName=Ae.List.displayName;const ea=k.forwardRef(({className:e,...t},r)=>l.jsx(Ae.List,{ref:r,className:B("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));ea.displayName=Ae.List.displayName;const ul=k.forwardRef(({className:e,...t},r)=>l.jsx(Ae.Trigger,{ref:r,...t,className:B("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),ta=k.forwardRef(({className:e,...t},r)=>l.jsx(Ae.Content,{ref:r,className:B("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));ta.displayName=Ae.Content.displayName;function Tg({tabList:e,onSearch:t,searchPlaceholder:r,headerTitle:n,isSearchBarFullWidth:o=!1,direction:a="ltr"}){return l.jsxs("div",{className:"pr-twp",children:[l.jsxs("div",{className:"pr-sticky pr-top-0 pr-space-y-2 pr-pb-2",children:[n?l.jsx("h1",{children:n}):"",l.jsx(dl,{isFullWidth:o,onSearch:t,placeholder:r})]}),l.jsxs(Qo,{dir:a,children:[l.jsx(ea,{children:e.map(s=>l.jsx(ul,{value:s.value,children:s.value},s.key))}),e.map(s=>l.jsx(ta,{value:s.value,children:s.content},s.key))]})]})}const ra=k.forwardRef(({className:e,orientation:t="horizontal",decorative:r=!0,...n},o)=>l.jsx(Os.Root,{ref:o,decorative:r,orientation:t,className:B("pr-twp pr-shrink-0 pr-bg-border",t==="horizontal"?"pr-h-[1px] pr-w-full":"pr-h-full pr-w-[1px]",e),...n}));ra.displayName=Os.Root.displayName;function Sg({children:e}){return l.jsx("div",{className:"pr-twp pr-grid",children:e})}function Cg({primary:e,secondary:t,children:r,isLoading:n=!1,loadingMessage:o}){return l.jsxs("div",{className:"pr-flex pr-items-center pr-justify-between pr-space-x-4 pr-py-2",children:[l.jsxs("div",{children:[l.jsx("p",{className:"pr-text-sm pr-font-medium pr-leading-none",children:e}),l.jsx("p",{className:"pr-whitespace-normal pr-break-words pr-text-sm pr-text-muted-foreground",children:t})]}),n?l.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:o}):l.jsx("div",{children:r})]})}function jg({primary:e,secondary:t,includeSeparator:r=!1}){return l.jsxs("div",{className:"pr-space-y-4 pr-py-2",children:[l.jsxs("div",{children:[l.jsx("h3",{className:"pr-text-lg pr-font-medium",children:e}),l.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:t})]}),r?l.jsx(ra,{}):""]})}const dr=k.forwardRef(({className:e,...t},r)=>l.jsx(oe.LoaderCircle,{size:35,className:B("pr-animate-spin",e),...t,ref:r}));dr.displayName="Spinner";function Og({id:e,isChecked:t,isDisabled:r=!1,hasError:n=!1,className:o,onChange:a}){return l.jsx(Ne.Switch,{id:e,checked:t,disabled:r,className:`papi-switch ${n?"error":""} ${o??""}`,onChange:a})}const Rg=Eo.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),na=k.forwardRef(({className:e,...t},r)=>l.jsx(Rs.Root,{ref:r,className:B(Rg(),e),...t}));na.displayName=Rs.Root.displayName;function Pg({id:e,isDisabled:t=!1,hasError:r=!1,isFullWidth:n=!1,helperText:o,label:a,placeholder:s,isRequired:c=!1,className:p,defaultValue:f,value:m,onChange:v,onFocus:g,onBlur:d}){return l.jsxs("div",{className:B("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":n}),children:[l.jsx(na,{htmlFor:e,className:B({"pr-text-red-600":r,"pr-hidden":!a}),children:`${a}${c?"*":""}`}),l.jsx(ir,{id:e,disabled:t,placeholder:s,required:c,className:B(p,{"pr-border-red-600":r}),defaultValue:f,value:m,onChange:v,onFocus:g,onBlur:d}),l.jsx("p",{className:B({"pr-hidden":!o}),children:o})]})}function $g({menuProvider:e,commandHandler:t,className:r,id:n,children:o}){const a=k.useRef(void 0);return l.jsx("div",{ref:a,style:{position:"relative"},children:l.jsx(Ne.AppBar,{position:"static",id:n,children:l.jsxs(Ne.Toolbar,{className:B("pr-bg-muted pr-text-muted-foreground",r),variant:"dense",children:[e?l.jsx(cl,{commandHandler:t,containerRef:a,menuProvider:e}):void 0,o?l.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Ig=Eo.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),fl=k.forwardRef(({className:e,variant:t,...r},n)=>l.jsx("div",{ref:n,role:"alert",className:B(Ig({variant:t}),e),...r}));fl.displayName="Alert";const ml=k.forwardRef(({className:e,...t},r)=>l.jsxs("h5",{ref:r,className:B("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));ml.displayName="AlertTitle";const hl=k.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:B("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));hl.displayName="AlertDescription";const gl=k.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:B("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));gl.displayName="Card";const bl=k.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:B("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));bl.displayName="CardHeader";const vl=k.forwardRef(({className:e,...t},r)=>l.jsx("h3",{ref:r,className:B("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));vl.displayName="CardTitle";const yl=k.forwardRef(({className:e,...t},r)=>l.jsx("p",{ref:r,className:B("pr-text-sm pr-text-muted-foreground",e),...t}));yl.displayName="CardDescription";const wl=k.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:B("pr-p-6 pr-pt-0",e),...t}));wl.displayName="CardContent";const xl=k.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:B("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));xl.displayName="CardFooter";function _g({...e}){return l.jsx(js.Toaster,{className:"pr-toaster pr-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const El=k.forwardRef(({className:e,...t},r)=>l.jsxs(Tr.Root,{ref:r,className:B("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[l.jsx(Tr.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:l.jsx(Tr.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),l.jsx(Tr.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));El.displayName=Tr.Root.displayName;const kl=k.forwardRef(({className:e,...t},r)=>l.jsx(so.Root,{className:B("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:r,children:l.jsx(so.Thumb,{className:B("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));kl.displayName=so.Root.displayName;const Mg=Ae.Root,Nl=k.forwardRef(({className:e,...t},r)=>l.jsx(Ae.List,{ref:r,className:B("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Nl.displayName=Ae.List.displayName;const Tl=k.forwardRef(({className:e,...t},r)=>l.jsx(Ae.Trigger,{ref:r,className:B("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));Tl.displayName=Ae.Trigger.displayName;const Sl=k.forwardRef(({className:e,...t},r)=>l.jsx(Ae.Content,{ref:r,className:B("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));Sl.displayName=Ae.Content.displayName;function Dg({isInstalling:e,handleClick:t,buttonText:r,className:n,...o}){return l.jsx(ve,{className:B("pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e,"pr-bg-blue-600":!e,"pr-bg-white pr-text-blue-600 hover:pr-text-white":!r,"pr-w-20":r},n),onClick:t,...o,children:e?l.jsx(dr,{size:15}):l.jsxs(l.Fragment,{children:[l.jsx(oe.Download,{size:25,className:B("pr-h-4 pr-w-4",{"pr-mr-1":r})}),r]})})}function Ag({isEnabling:e,handleClick:t,className:r,...n}){return l.jsx(ve,{className:B("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e},r),onClick:t,...n,children:e?l.jsxs(l.Fragment,{children:[l.jsx(dr,{size:15,className:"pr-mr-1 pr-text-white"}),"Enabling..."]}):"Enable"})}function Lg({isDisabling:e,handleClick:t,className:r,...n}){return l.jsx(ve,{className:B("pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-gray-400",{"pr-cursor-not-allowed pr-bg-gray-400":e},r),onClick:t,...n,children:e?l.jsxs(l.Fragment,{children:[l.jsx(dr,{size:15,className:"pr-mr-1 pr-text-black"}),"Disabling..."]}):"Disable"})}function Bg({isUpdating:e,handleClick:t,className:r,...n}){return l.jsx(ve,{className:B("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700 hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e},r),onClick:t,...n,children:e?l.jsxs(l.Fragment,{children:[l.jsx(dr,{size:15,className:"pr-mr-1 pr-text-white"}),"Updating..."]}):"Update"})}function $t(){return $t=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},$t.apply(this,arguments)}const Fg=["children","options"],ws=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,t)=>(e[t.toLowerCase()]=t,e),{for:"htmlFor"}),xs={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},Vg=["style","script"],zg=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,Ug=/mailto:/i,Gg=/\n{2,}$/,Cl=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,Hg=/^ *> ?/gm,qg=/^ {2,}\n/,Wg=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,jl=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,Ol=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,Xg=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,Kg=/^(?:\n *)*\n/,Yg=/\r\n?/g,Jg=/^\[\^([^\]]+)](:.*)\n/,Zg=/^\[\^([^\]]+)]/,Qg=/\f/g,eb=/^\s*?\[(x|\s)\]/,Rl=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,Pl=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,$l=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,wo=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,tb=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,Il=/^<!--[\s\S]*?(?:-->)/,rb=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,xo=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,nb=/^\{.*\}$/,ob=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,ab=/^<([^ >]+@[^ >]+)>/,sb=/^<([^ >]+:\/[^ >]+)>/,ib=/-([a-z])?/gi,_l=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,lb=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,cb=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,pb=/^\[([^\]]*)\] ?\[([^\]]*)\]/,db=/(\[|\])/g,ub=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,fb=/\t/g,mb=/^ *\| */,hb=/(^ *\||\| *$)/g,gb=/ *$/,bb=/^ *:-+: *$/,vb=/^ *:-+ *$/,yb=/^ *-+: *$/,wb=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,xb=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,Eb=/^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,kb=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,Nb=/^\\([^0-9A-Za-z\s])/,Tb=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,Sb=/^\n+/,Cb=/^([ \t]*)/,jb=/\\([^\\])/g,Es=/ *\n+$/,Ob=/(?:^|\n)( *)$/,oa="(?:\\d+\\.)",aa="(?:[*+-])";function Ml(e){return"( *)("+(e===1?oa:aa)+") +"}const Dl=Ml(1),Al=Ml(2);function Ll(e){return new RegExp("^"+(e===1?Dl:Al))}const Rb=Ll(1),Pb=Ll(2);function Bl(e){return new RegExp("^"+(e===1?Dl:Al)+"[^\\n]*(?:\\n(?!\\1"+(e===1?oa:aa)+" )[^\\n]*)*(\\n|$)","gm")}const Fl=Bl(1),Vl=Bl(2);function zl(e){const t=e===1?oa:aa;return new RegExp("^( *)("+t+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+t+" (?!"+t+" ))\\n*|\\s*\\n*$)")}const Ul=zl(1),Gl=zl(2);function ks(e,t){const r=t===1,n=r?Ul:Gl,o=r?Fl:Vl,a=r?Rb:Pb;return{t(s,c,p){const f=Ob.exec(p);return f&&(c.o||!c._&&!c.u)?n.exec(s=f[1]+s):null},i:se.HIGH,l(s,c,p){const f=r?+s[2]:void 0,m=s[0].replace(Gg,`
`).match(o);let v=!1;return{p:m.map(function(g,d){const h=a.exec(g)[0].length,u=new RegExp("^ {1,"+h+"}","gm"),b=g.replace(u,"").replace(a,""),w=d===m.length-1,O=b.indexOf(`

`)!==-1||w&&v;v=O;const x=p._,E=p.o;let y;p.o=!0,O?(p._=!1,y=b.replace(Es,`

`)):(p._=!0,y=b.replace(Es,""));const S=c(y,p);return p._=x,p.o=E,S}),m:r,g:f}},h:(s,c,p)=>e(s.m?"ol":"ul",{key:p.k,start:s.g},s.p.map(function(f,m){return e("li",{key:m},c(f,p))}))}}const $b=/^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Ib=/^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Hl=[Cl,jl,Ol,Rl,$l,Pl,Il,_l,Fl,Ul,Vl,Gl],_b=[...Hl,/^[^\n]+(?:  \n|\n{2,})/,wo,xo];function Mb(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function Db(e){return yb.test(e)?"right":bb.test(e)?"center":vb.test(e)?"left":null}function Ns(e,t,r){const n=r.$;r.$=!0;const o=t(e.trim(),r);r.$=n;let a=[[]];return o.forEach(function(s,c){s.type==="tableSeparator"?c!==0&&c!==o.length-1&&a.push([]):(s.type!=="text"||o[c+1]!=null&&o[c+1].type!=="tableSeparator"||(s.v=s.v.replace(gb,"")),a[a.length-1].push(s))}),a}function Ab(e,t,r){r._=!0;const n=Ns(e[1],t,r),o=e[2].replace(hb,"").split("|").map(Db),a=function(s,c,p){return s.trim().split(`
`).map(function(f){return Ns(f,c,p)})}(e[3],t,r);return r._=!1,{S:o,A:a,L:n,type:"table"}}function Ts(e,t){return e.S[t]==null?{}:{textAlign:e.S[t]}}function bt(e){return function(t,r){return r._?e.exec(t):null}}function vt(e){return function(t,r){return r._||r.u?e.exec(t):null}}function it(e){return function(t,r){return r._||r.u?null:e.exec(t)}}function kr(e){return function(t){return e.exec(t)}}function Lb(e,t,r){if(t._||t.u||r&&!r.endsWith(`
`))return null;let n="";e.split(`
`).every(a=>!Hl.some(s=>s.test(a))&&(n+=a+`
`,a.trim()));const o=n.trimEnd();return o==""?null:[n,o]}function Kt(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch{return null}return e}function Ss(e){return e.replace(jb,"$1")}function dn(e,t,r){const n=r._||!1,o=r.u||!1;r._=!0,r.u=!0;const a=e(t,r);return r._=n,r.u=o,a}function Bb(e,t,r){const n=r._||!1,o=r.u||!1;r._=!1,r.u=!0;const a=e(t,r);return r._=n,r.u=o,a}function Fb(e,t,r){return r._=!1,e(t,r)}const eo=(e,t,r)=>({v:dn(t,e[1],r)});function to(){return{}}function ro(){return null}function Vb(...e){return e.filter(Boolean).join(" ")}function no(e,t,r){let n=e;const o=t.split(".");for(;o.length&&(n=n[o[0]],n!==void 0);)o.shift();return n||r}var se;function zb(e,t={}){t.overrides=t.overrides||{},t.slugify=t.slugify||Mb,t.namedCodesToUnicode=t.namedCodesToUnicode?$t({},xs,t.namedCodesToUnicode):xs;const r=t.createElement||T.createElement;function n(d,h,...u){const b=no(t.overrides,`${d}.props`,{});return r(function(w,O){const x=no(O,w);return x?typeof x=="function"||typeof x=="object"&&"render"in x?x:no(O,`${w}.component`,w):w}(d,t.overrides),$t({},h,b,{className:Vb(h==null?void 0:h.className,b.className)||void 0}),...u)}function o(d){let h=!1;t.forceInline?h=!0:t.forceBlock||(h=ub.test(d)===!1);const u=m(f(h?d:`${d.trimEnd().replace(Sb,"")}

`,{_:h}));for(;typeof u[u.length-1]=="string"&&!u[u.length-1].trim();)u.pop();if(t.wrapper===null)return u;const b=t.wrapper||(h?"span":"div");let w;if(u.length>1||t.forceWrapper)w=u;else{if(u.length===1)return w=u[0],typeof w=="string"?n("span",{key:"outer"},w):w;w=null}return T.createElement(b,{key:"outer"},w)}function a(d){const h=d.match(zg);return h?h.reduce(function(u,b,w){const O=b.indexOf("=");if(O!==-1){const x=function(C){return C.indexOf("-")!==-1&&C.match(rb)===null&&(C=C.replace(ib,function(I,R){return R.toUpperCase()})),C}(b.slice(0,O)).trim(),E=function(C){const I=C[0];return(I==='"'||I==="'")&&C.length>=2&&C[C.length-1]===I?C.slice(1,-1):C}(b.slice(O+1).trim()),y=ws[x]||x,S=u[y]=function(C,I){return C==="style"?I.split(/;\s?/).reduce(function(R,$){const N=$.slice(0,$.indexOf(":"));return R[N.replace(/(-[a-z])/g,_=>_[1].toUpperCase())]=$.slice(N.length+1).trim(),R},{}):C==="href"?Kt(I):(I.match(nb)&&(I=I.slice(1,I.length-1)),I==="true"||I!=="false"&&I)}(x,E);typeof S=="string"&&(wo.test(S)||xo.test(S))&&(u[y]=T.cloneElement(o(S.trim()),{key:w}))}else b!=="style"&&(u[ws[b]||b]=!0);return u},{}):null}const s=[],c={},p={blockQuote:{t:it(Cl),i:se.HIGH,l:(d,h,u)=>({v:h(d[0].replace(Hg,""),u)}),h:(d,h,u)=>n("blockquote",{key:u.k},h(d.v,u))},breakLine:{t:kr(qg),i:se.HIGH,l:to,h:(d,h,u)=>n("br",{key:u.k})},breakThematic:{t:it(Wg),i:se.HIGH,l:to,h:(d,h,u)=>n("hr",{key:u.k})},codeBlock:{t:it(Ol),i:se.MAX,l:d=>({v:d[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),M:void 0}),h:(d,h,u)=>n("pre",{key:u.k},n("code",$t({},d.O,{className:d.M?`lang-${d.M}`:""}),d.v))},codeFenced:{t:it(jl),i:se.MAX,l:d=>({O:a(d[3]||""),v:d[4],M:d[2]||void 0,type:"codeBlock"})},codeInline:{t:vt(Xg),i:se.LOW,l:d=>({v:d[2]}),h:(d,h,u)=>n("code",{key:u.k},d.v)},footnote:{t:it(Jg),i:se.MAX,l:d=>(s.push({I:d[2],j:d[1]}),{}),h:ro},footnoteReference:{t:bt(Zg),i:se.HIGH,l:d=>({v:d[1],B:`#${t.slugify(d[1])}`}),h:(d,h,u)=>n("a",{key:u.k,href:Kt(d.B)},n("sup",{key:u.k},d.v))},gfmTask:{t:bt(eb),i:se.HIGH,l:d=>({R:d[1].toLowerCase()==="x"}),h:(d,h,u)=>n("input",{checked:d.R,key:u.k,readOnly:!0,type:"checkbox"})},heading:{t:it(t.enforceAtxHeadings?Pl:Rl),i:se.HIGH,l:(d,h,u)=>({v:dn(h,d[2],u),T:t.slugify(d[2]),C:d[1].length}),h:(d,h,u)=>n(`h${d.C}`,{id:d.T,key:u.k},h(d.v,u))},headingSetext:{t:it($l),i:se.MAX,l:(d,h,u)=>({v:dn(h,d[1],u),C:d[2]==="="?1:2,type:"heading"})},htmlComment:{t:kr(Il),i:se.HIGH,l:()=>({}),h:ro},image:{t:vt(Ib),i:se.HIGH,l:d=>({D:d[1],B:Ss(d[2]),F:d[3]}),h:(d,h,u)=>n("img",{key:u.k,alt:d.D||void 0,title:d.F||void 0,src:Kt(d.B)})},link:{t:bt($b),i:se.LOW,l:(d,h,u)=>({v:Bb(h,d[1],u),B:Ss(d[2]),F:d[3]}),h:(d,h,u)=>n("a",{key:u.k,href:Kt(d.B),title:d.F},h(d.v,u))},linkAngleBraceStyleDetector:{t:bt(sb),i:se.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],type:"link"})},linkBareUrlDetector:{t:(d,h)=>h.N?null:bt(ob)(d,h),i:se.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],F:void 0,type:"link"})},linkMailtoDetector:{t:bt(ab),i:se.MAX,l(d){let h=d[1],u=d[1];return Ug.test(u)||(u="mailto:"+u),{v:[{v:h.replace("mailto:",""),type:"text"}],B:u,type:"link"}}},orderedList:ks(n,1),unorderedList:ks(n,2),newlineCoalescer:{t:it(Kg),i:se.LOW,l:to,h:()=>`
`},paragraph:{t:Lb,i:se.LOW,l:eo,h:(d,h,u)=>n("p",{key:u.k},h(d.v,u))},ref:{t:bt(lb),i:se.MAX,l:d=>(c[d[1]]={B:d[2],F:d[4]},{}),h:ro},refImage:{t:vt(cb),i:se.MAX,l:d=>({D:d[1]||void 0,P:d[2]}),h:(d,h,u)=>n("img",{key:u.k,alt:d.D,src:Kt(c[d.P].B),title:c[d.P].F})},refLink:{t:bt(pb),i:se.MAX,l:(d,h,u)=>({v:h(d[1],u),Z:h(d[0].replace(db,"\\$1"),u),P:d[2]}),h:(d,h,u)=>c[d.P]?n("a",{key:u.k,href:Kt(c[d.P].B),title:c[d.P].F},h(d.v,u)):n("span",{key:u.k},h(d.Z,u))},table:{t:it(_l),i:se.HIGH,l:Ab,h:(d,h,u)=>n("table",{key:u.k},n("thead",null,n("tr",null,d.L.map(function(b,w){return n("th",{key:w,style:Ts(d,w)},h(b,u))}))),n("tbody",null,d.A.map(function(b,w){return n("tr",{key:w},b.map(function(O,x){return n("td",{key:x,style:Ts(d,x)},h(O,u))}))})))},tableSeparator:{t:function(d,h){return h.$?(h._=!0,mb.exec(d)):null},i:se.HIGH,l:function(){return{type:"tableSeparator"}},h:()=>" | "},text:{t:kr(Tb),i:se.MIN,l:d=>({v:d[0].replace(tb,(h,u)=>t.namedCodesToUnicode[u]?t.namedCodesToUnicode[u]:h)}),h:d=>d.v},textBolded:{t:vt(wb),i:se.MED,l:(d,h,u)=>({v:h(d[2],u)}),h:(d,h,u)=>n("strong",{key:u.k},h(d.v,u))},textEmphasized:{t:vt(xb),i:se.LOW,l:(d,h,u)=>({v:h(d[2],u)}),h:(d,h,u)=>n("em",{key:u.k},h(d.v,u))},textEscaped:{t:vt(Nb),i:se.HIGH,l:d=>({v:d[1],type:"text"})},textMarked:{t:vt(Eb),i:se.LOW,l:eo,h:(d,h,u)=>n("mark",{key:u.k},h(d.v,u))},textStrikethroughed:{t:vt(kb),i:se.LOW,l:eo,h:(d,h,u)=>n("del",{key:u.k},h(d.v,u))}};t.disableParsingRawHTML!==!0&&(p.htmlBlock={t:kr(wo),i:se.HIGH,l(d,h,u){const[,b]=d[3].match(Cb),w=new RegExp(`^${b}`,"gm"),O=d[3].replace(w,""),x=(E=O,_b.some(I=>I.test(E))?Fb:dn);var E;const y=d[1].toLowerCase(),S=Vg.indexOf(y)!==-1;u.N=u.N||y==="a";const C=S?d[3]:x(h,O,u);return u.N=!1,{O:a(d[2]),v:C,G:S,H:S?y:d[1]}},h:(d,h,u)=>n(d.H,$t({key:u.k},d.O),d.G?d.v:h(d.v,u))},p.htmlSelfClosing={t:kr(xo),i:se.HIGH,l:d=>({O:a(d[2]||""),H:d[1]}),h:(d,h,u)=>n(d.H,$t({},d.O,{key:u.k}))});const f=function(d){let h=Object.keys(d);function u(b,w){let O=[],x="";for(;b;){let E=0;for(;E<h.length;){const y=h[E],S=d[y],C=S.t(b,w,x);if(C){const I=C[0];b=b.substring(I.length);const R=S.l(C,u,w);R.type==null&&(R.type=y),O.push(R),x=I;break}E++}}return O}return h.sort(function(b,w){let O=d[b].i,x=d[w].i;return O!==x?O-x:b<w?-1:1}),function(b,w){return u(function(O){return O.replace(Yg,`
`).replace(Qg,"").replace(fb,"    ")}(b),w)}}(p),m=(v=function(d){return function(h,u,b){return d[h.type].h(h,u,b)}}(p),function d(h,u={}){if(Array.isArray(h)){const b=u.k,w=[];let O=!1;for(let x=0;x<h.length;x++){u.k=x;const E=d(h[x],u),y=typeof E=="string";y&&O?w[w.length-1]+=E:E!==null&&w.push(E),O=y}return u.k=b,w}return v(h,d,u)});var v;const g=o(e);return s.length?n("div",null,g,n("footer",{key:"footer"},s.map(function(d){return n("div",{id:t.slugify(d.j),key:d.j},d.j,m(f(d.I,{_:!0})))}))):g}(function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"})(se||(se={}));const Ub=e=>{let{children:t,options:r}=e,n=function(o,a){if(o==null)return{};var s,c,p={},f=Object.keys(o);for(c=0;c<f.length;c++)a.indexOf(s=f[c])>=0||(p[s]=o[s]);return p}(e,Fg);return T.cloneElement(zb(t,r),n)};function Gb({id:e,markdown:t}){return l.jsx("div",{id:e,className:"pr-prose",children:l.jsx(Ub,{children:t})})}const ql=k.forwardRef((e,t)=>l.jsxs(ve,{ref:t,className:"pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600",...e,children:[l.jsx(oe.Filter,{size:16,className:"pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"}),"Filter",l.jsx(oe.ChevronDown,{size:16,className:"pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"})]}));var Wl=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(Wl||{});function Hb({id:e,groups:t}){return l.jsx("div",{id:e,children:l.jsxs(xn,{children:[l.jsx(So,{asChild:!0,children:l.jsx(ql,{})}),l.jsx(Fr,{children:t.map(r=>l.jsxs("div",{children:[l.jsx(cr,{children:r.label}),l.jsx(As,{children:r.items.map(n=>l.jsx("div",{children:n.itemType===0?l.jsx(En,{onClick:n.onClick,children:n.label}):l.jsx(jo,{onClick:n.onClick,value:n.label,children:n.label})},n.label))}),l.jsx(Vr,{})]},r.label))})]})})}function qb({id:e,message:t}){return l.jsx("div",{id:e,className:"pr-mb-20 pr-mt-20 pr-flex pr-items-center pr-justify-center",children:l.jsx("div",{className:"pr-w-3/4 pr-rounded-lg pr-bg-gray-100 pr-p-8 pr-text-center",children:l.jsx("p",{className:"pr-text-lg pr-text-gray-800",children:t})})})}function Wb({id:e,category:t,downloads:r,languages:n,moreInfoUrl:o}){const a=new re.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((c,p)=>c+p,0)),s=()=>{window.scrollTo(0,document.body.scrollHeight)};return l.jsxs("div",{id:e,className:"pr-flex pr-flex-wrap pr-items-start pr-space-x-4 pr-border-b pr-border-t pr-bg-white pr-pb-4 pr-pt-4",children:[l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsx("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:l.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:t})}),l.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"CATEGORY"})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsxs("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:[l.jsx(oe.User,{className:"pr-mr-1 pr-h-4 pr-w-4"}),l.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:a})]}),l.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"USERS"})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsx("div",{className:"pr-flex pr-items-center",children:n.slice(0,3).map(c=>l.jsx("span",{className:"pr-ml-1 pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1 pr-text-xs pr-font-semibold pr-text-gray-700",children:c.toUpperCase()},c))}),n.length>3&&l.jsxs("button",{type:"button",onClick:()=>s(),className:"pr-text-xs pr-text-gray-500 pr-underline",children:["+",n.length-3," more languages"]})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-ml-auto pr-flex pr-flex-col pr-space-y-2",children:[l.jsxs("a",{href:o,target:"_blank",rel:"noreferrer",className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Website",l.jsx(oe.Link,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]}),l.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Support",l.jsx(oe.CircleHelp,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]})]})]})}function Xl({id:e,versionHistory:t}){const[r,n]=k.useState(!1),o=new Date;function a(c){const p=new Date(c),f=new Date(o.getTime()-p.getTime()),m=f.getUTCFullYear()-1970,v=f.getUTCMonth(),g=f.getUTCDate()-1;let d="";return m>0?d=`${m.toString()} year${m===1?"":"s"} ago`:v>0?d=`${v.toString()} month${v===1?"":"s"} ago`:g===0?d="today":d=`${g.toString()} day${g===1?"":"s"} ago`,d}const s=Object.entries(t).sort((c,p)=>p[0].localeCompare(c[0]));return l.jsxs("div",{id:e,children:[l.jsx("h3",{className:"pr-text-md pr-font-semibold",children:"What`s New"}),l.jsx("ul",{className:"pr-list-disc pr-pl-5 pr-pr-4 pr-text-xs pr-text-gray-600",children:(r?s:s.slice(0,5)).map(c=>l.jsxs("div",{className:"pr-mt-3 pr-flex pr-justify-between",children:[l.jsx("div",{className:"pr-text-gray-600",children:l.jsx("li",{className:"pr-prose pr-text-xs",children:l.jsx("span",{children:c[1].description})})}),l.jsxs("div",{className:"pr-justify-end pr-text-right",children:[l.jsxs("div",{children:["Version ",c[0]]}),l.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),s.length>5&&l.jsx("button",{type:"button",onClick:()=>n(!r),className:"pr-text-xs pr-text-gray-500 pr-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Xb({id:e,publisherDisplayName:t,fileSize:r,locales:n,versionHistory:o}){const a=k.useMemo(()=>re.formatBytes(r),[r]),c=(p=>{const f=new Intl.DisplayNames(navigator.language,{type:"language"});return p.map(m=>f.of(m))})(n);return l.jsx("div",{id:e,className:"pr-border-t pr-pb-4 pr-pt-4",children:l.jsxs("div",{className:"pr-md:flex-row pr-md:space-x-8 pr-flex pr-flex-col pr-space-x-0",children:[l.jsx(Xl,{versionHistory:o}),l.jsx("div",{className:"pr-md:border-t-0 pr-md:border-l pr-md-h-auto pr-md-ml-8 pr-mt-4 pr-border-t pr-border-gray-300"}),l.jsxs("div",{className:"pr-md:mt-0 pr-mt-4 pr-flex-1 pr-space-y-3",children:[l.jsx("h2",{className:"pr-text-md pr-font-semibold",children:"Information"}),l.jsxs("div",{className:"pr-flex pr-items-start pr-justify-between pr-pr-4 pr-text-xs pr-text-gray-600",children:[l.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[l.jsx("span",{className:"pr-mb-2",children:"Publisher"}),l.jsx("span",{className:"pr-font-semibold",children:t}),l.jsx("span",{className:"pr-mb-2 pr-mt-4",children:"Size"}),l.jsx("span",{className:"pr-font-semibold",children:a})]}),l.jsx("div",{className:"pr-flex pr-w-3/4 pr-items-center pr-justify-between pr-text-xs pr-text-gray-600",children:l.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[l.jsx("span",{className:"pr-mb-2",children:"Languages"}),l.jsx("span",{className:"pr-font-semibold",children:c.join(", ")})]})})]})]})]})})}const Kb=(e,t)=>{k.useEffect(()=>{if(!e)return()=>{};const r=e(t);return()=>{r()}},[e,t])},oo=()=>!1,Yb=(e,t)=>{const[r]=wn(k.useCallback(async()=>{if(!e)return oo;const n=await Promise.resolve(e(t));return async()=>n()},[t,e]),oo,{preserveValue:!1});k.useEffect(()=>()=>{r!==oo&&r()},[r])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>js.toast});exports.Alert=fl;exports.AlertDescription=hl;exports.AlertTitle=ml;exports.BookChapterControl=Hc;exports.Button=ve;exports.Card=gl;exports.CardContent=wl;exports.CardDescription=yl;exports.CardFooter=xl;exports.CardHeader=bl;exports.CardTitle=vl;exports.ChapterRangeSelector=fp;exports.Checkbox=ti;exports.Checklist=mp;exports.ComboBox=io;exports.ContextMenu=dg;exports.DataTable=Ws;exports.DisableButton=Lg;exports.DropdownMenu=xn;exports.DropdownMenuCheckboxItem=En;exports.DropdownMenuContent=Fr;exports.DropdownMenuGroup=As;exports.DropdownMenuItem=Co;exports.DropdownMenuItemType=Wl;exports.DropdownMenuLabel=cr;exports.DropdownMenuPortal=$c;exports.DropdownMenuRadioGroup=_c;exports.DropdownMenuRadioItem=jo;exports.DropdownMenuSeparator=Vr;exports.DropdownMenuShortcut=Fs;exports.DropdownMenuSub=Ic;exports.DropdownMenuSubContent=Bs;exports.DropdownMenuSubTrigger=Ls;exports.DropdownMenuTrigger=So;exports.EnableButton=Ag;exports.FilterButton=ql;exports.FilterDropdown=Hb;exports.Footer=Xb;exports.GridMenu=Ji;exports.HamburgerMenuButton=cl;exports.INVENTORY_STRING_KEYS=Yc;exports.IconButton=mg;exports.Input=ir;exports.InstallButton=Dg;exports.Inventory=Qc;exports.Label=na;exports.LabelPosition=Rt;exports.MarkdownRenderer=Gb;exports.MenuItem=Jo;exports.MoreInfo=Wb;exports.NavigationContentSearch=Tg;exports.NoExtensionsFound=qb;exports.ScriptureResultsViewer=Eg;exports.ScrollGroupSelector=np;exports.SearchBar=dl;exports.Select=Zt;exports.SelectContent=Dt;exports.SelectGroup=zs;exports.SelectItem=Ge;exports.SelectLabel=Us;exports.SelectScrollDownButton=Ro;exports.SelectScrollUpButton=Oo;exports.SelectSeparator=Gs;exports.SelectTrigger=Mt;exports.SelectValue=Qt;exports.Separator=ra;exports.SettingsList=Sg;exports.SettingsListHeader=jg;exports.SettingsListItem=Cg;exports.ShadCnSlider=El;exports.ShadCnSwitch=kl;exports.Slider=kg;exports.Snackbar=Ng;exports.Sonner=_g;exports.Spinner=dr;exports.Switch=Og;exports.Table=zr;exports.TableBody=Gr;exports.TableCaption=qs;exports.TableCell=At;exports.TableFooter=Hs;exports.TableHead=er;exports.TableHeader=Ur;exports.TableRow=lt;exports.Tabs=Mg;exports.TabsContent=Sl;exports.TabsList=Nl;exports.TabsTrigger=Tl;exports.TextField=Pg;exports.Toolbar=$g;exports.UpdateButton=Bg;exports.VersionHistory=Xl;exports.VerticalTabs=Qo;exports.VerticalTabsContent=ta;exports.VerticalTabsList=ea;exports.VerticalTabsTrigger=ul;exports.buttonVariants=Vs;exports.getSortingIcon=kn;exports.inventoryCountColumn=tp;exports.inventoryItemColumn=ep;exports.inventoryStatusColumn=rp;exports.useEvent=Kb;exports.useEventAsync=Yb;exports.usePromise=wn;function Jb(e,t="top"){if(!e||typeof document>"u")return;const r=document.head||document.querySelector("head"),n=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&n?r.insertBefore(o,n):r.appendChild(o)}Jb(`.papi-checkbox {
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
    --background: 0 0% 100%;
    --foreground: 0 0% 0%;
    --muted: 33.9 32.4% 86.1%;
    --muted-foreground: 15.5 13.2% 53.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 0%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 0%;
    --border: 220 13% 91%;
    --input: 161.3 26.7% 88.2%;
    --primary: 173.4 82.1% 15.3%;
    --primary-foreground: 40 85.7% 97.3%;
    --secondary: 161.3 26.7% 88.2%;
    --secondary-foreground: 173.4 82.1% 15.3%;
    --accent: 161.3 26.7% 88.2%;
    --accent-foreground: 173.4 82.1% 15.3%;
    --destructive: 0 60% 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5 13.2% 53.9%;
  }

  .paratext-dark {
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;
    --muted: 15.5 13.2% 53.9%;
    --muted-foreground: 33.9 32.4% 86.1%;
    --popover: 180 71.4% 5%;
    --popover-foreground: 0 0% 100%;
    --card: 0 0% 0%;
    --card-foreground: 0 0% 100%;
    --border: 220 13% 20%;
    --input: 220 13% 20%;
    --primary: 161.3 26.7% 88.2%;
    --primary-foreground: 173.4 82.1% 15.3%;
    --secondary: 180 71.4% 11%;
    --secondary-foreground: 161.3 26.7% 88.2%;
    --accent: 180 71.4% 11%;
    --accent-foreground: 161.3 26.7% 88.2%;
    --destructive: 0 60% 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5 13.2% 53.9%;
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
.pr-bottom-2 {
  bottom: 0.5rem;
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
.pr-pe-2 {
  padding-inline-end: 0.5rem;
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
.pr-leading-9 {
  line-height: 2.25rem;
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
.pr-text-foreground\\/80 {
  color: hsl(var(--foreground) / 0.8);
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state="selected"]:hover {
  cursor: default;
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
`,"top");
//# sourceMappingURL=index.cjs.map
