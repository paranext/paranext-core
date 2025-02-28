"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const a=require("react/jsx-runtime"),h=require("react"),ct=require("clsx"),Pl=require("tailwind-merge"),Ss=require("@radix-ui/react-dropdown-menu"),J=require("lucide-react"),K=require("platform-bible-utils"),Qt=require("@radix-ui/react-slot"),_t=require("class-variance-authority"),Il=require("@radix-ui/react-label"),Ml=require("@radix-ui/react-radio-group"),$l=require("@radix-ui/react-popover"),Pe=require("cmdk"),Dl=require("@radix-ui/react-dialog"),Ee=require("@tanstack/react-table"),Al=require("@radix-ui/react-select"),Bl=require("@radix-ui/react-checkbox"),zl=require("@radix-ui/react-toggle-group"),Vl=require("@radix-ui/react-toggle"),Fl=require("@radix-ui/react-tabs"),Ll=require("@radix-ui/react-separator"),Gl=require("@radix-ui/react-tooltip"),so=require("@mui/styled-engine"),Ye=require("@mui/material"),fn=require("react-dom"),Ul=require("@radix-ui/react-menubar"),Es=require("sonner"),ql=require("@radix-ui/react-slider"),Hl=require("@radix-ui/react-switch"),Xl=require("markdown-to-jsx");function Se(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const A=Se(h),fe=Se(Ss),Cs=Se(Il),Sn=Se(Ml),En=Se($l),Je=Se(Dl),ve=Se(Al),io=Se(Bl),br=Se(zl),Ts=Se(Vl),Ie=Se(Fl),Rs=Se(Ll),_n=Se(Gl),Yl=Se(fn),we=Se(Ul),mn=Se(ql),lo=Se(Hl),Wl=Pl.extendTailwindMerge({prefix:"tw-"});function y(...e){return Wl(ct.clsx(e))}const Pt=h.forwardRef(({className:e,type:t,...n},r)=>a.jsx("input",{type:t,className:y("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),ref:r,...n}));Pt.displayName="Input";const Kl=h.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,className:o,...s},i)=>a.jsx("div",{className:"tw-relative",children:a.jsx(Pt,{...s,type:"text",className:y("tw-box-border tw-w-[200px] tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-2 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none",o),onChange:l=>e(l.target.value),onKeyDown:l=>{l.key==="Enter"&&r(),t(l)},onClick:n,ref:i})})),Jl="layoutDirection";function Ne(){const e=localStorage.getItem(Jl);return e==="rtl"?e:"ltr"}const vr=fe.Root,ko=fe.Trigger,Os=fe.Group,Zl=fe.Portal,Ql=fe.Sub,ec=fe.RadioGroup,_s=h.forwardRef(({className:e,inset:t,children:n,...r},o)=>a.jsxs(fe.SubTrigger,{ref:o,className:y("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",t&&"tw-pl-8",e),...r,children:[n,a.jsx(J.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));_s.displayName=fe.SubTrigger.displayName;const Ps=h.forwardRef(({className:e,...t},n)=>a.jsx(fe.SubContent,{ref:n,className:y("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));Ps.displayName=fe.SubContent.displayName;const Pn=h.forwardRef(({className:e,sideOffset:t=4,children:n,...r},o)=>{const s=Ne();return a.jsx(fe.Portal,{children:a.jsx(fe.Content,{ref:o,sideOffset:t,className:y("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...r,children:a.jsx("div",{dir:s,children:n})})})});Pn.displayName=fe.Content.displayName;const So=h.forwardRef(({className:e,inset:t,...n},r)=>{const o=Ne();return a.jsx(fe.Item,{ref:r,className:y("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e),...n,dir:o})});So.displayName=fe.Item.displayName;const xr=h.forwardRef(({className:e,children:t,checked:n,...r},o)=>a.jsxs(fe.CheckboxItem,{ref:o,className:y("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),checked:n,...r,children:[a.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:a.jsx(fe.ItemIndicator,{children:a.jsx(J.Check,{className:"tw-h-4 tw-w-4"})})}),t]}));xr.displayName=fe.CheckboxItem.displayName;const Eo=h.forwardRef(({className:e,children:t,...n},r)=>a.jsxs(fe.RadioItem,{ref:r,className:y("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[a.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:a.jsx(fe.ItemIndicator,{children:a.jsx(J.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]}));Eo.displayName=fe.RadioItem.displayName;const In=h.forwardRef(({className:e,inset:t,...n},r)=>a.jsx(fe.Label,{ref:r,className:y("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...n}));In.displayName=fe.Label.displayName;const Mn=h.forwardRef(({className:e,...t},n)=>a.jsx(fe.Separator,{ref:n,className:y("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Mn.displayName=fe.Separator.displayName;function Is({className:e,...t}){return a.jsx("span",{className:y("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",e),...t})}Is.displayName="DropdownMenuShortcut";var tc=Object.defineProperty,nc=(e,t,n)=>t in e?tc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t,n)=>nc(e,typeof t!="symbol"?t+"":t,n);const kt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Co=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Ms=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Ca=pc();function en(e,t=!0){return t&&(e=e.toUpperCase()),e in Ca?Ca[e]:0}function To(e){return en(e)>0}function rc(e){const t=typeof e=="string"?en(e):e;return t>=40&&t<=66}function oc(e){return(typeof e=="string"?en(e):e)<=39}function $s(e){return e<=66}function ac(e){const t=typeof e=="string"?en(e):e;return Bs(t)&&!$s(t)}function*sc(){for(let e=1;e<=kt.length;e++)yield e}const ic=1,Ds=kt.length;function lc(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Ro(e,t="***"){const n=e-1;return n<0||n>=kt.length?t:kt[n]}function As(e){return e<=0||e>Ds?"******":Ms[e-1]}function cc(e){return As(en(e))}function Bs(e){const t=typeof e=="number"?Ro(e):e;return To(t)&&!Co.includes(t)}function dc(e){const t=typeof e=="number"?Ro(e):e;return To(t)&&Co.includes(t)}function uc(e){return Ms[e-1].includes("*obsolete*")}function pc(){const e={};for(let t=0;t<kt.length;t++)e[kt[t]]=t+1;return e}const se={allBookIds:kt,nonCanonicalIds:Co,bookIdToNumber:en,isBookIdValid:To,isBookNT:rc,isBookOT:oc,isBookOTNT:$s,isBookDC:ac,allBookNumbers:sc,firstBook:ic,lastBook:Ds,extraBooks:lc,bookNumberToId:Ro,bookNumberToEnglishName:As,bookIdToEnglishName:cc,isCanonical:Bs,isExtraMaterial:dc,isObsolete:uc};var We=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(We||{});const $e=class{constructor(t){if(re(this,"name"),re(this,"fullPath"),re(this,"isPresent"),re(this,"hasVerseSegments"),re(this,"isCustomized"),re(this,"baseVersification"),re(this,"scriptureBooks"),re(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=We[t]):(this._type=t,this.name=We[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};re($e,"Original",new $e(We.Original)),re($e,"Septuagint",new $e(We.Septuagint)),re($e,"Vulgate",new $e(We.Vulgate)),re($e,"English",new $e(We.English)),re($e,"RussianProtestant",new $e(We.RussianProtestant)),re($e,"RussianOrthodox",new $e(We.RussianOrthodox));let bt=$e;function Ta(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var zs=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(zs||{});const Te=class ae{constructor(t,n,r,o){if(re(this,"firstChapter"),re(this,"lastChapter"),re(this,"lastVerse"),re(this,"hasSegmentsDefined"),re(this,"text"),re(this,"BBBCCCVVVS"),re(this,"longHashCode"),re(this,"versification"),re(this,"rtlMark","‏"),re(this,"_bookNum",0),re(this,"_chapterNum",0),re(this,"_verseNum",0),re(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const s=t,i=n!=null&&n instanceof bt?n:void 0;this.setEmpty(i),this.parse(s)}else if(t!=null&&typeof t=="number"){const s=n!=null&&n instanceof bt?n:void 0;this.setEmpty(s),this._verseNum=t%ae.chapterDigitShifter,this._chapterNum=Math.floor(t%ae.bookDigitShifter/ae.chapterDigitShifter),this._bookNum=Math.floor(t/ae.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ae){const s=t;this._bookNum=s.bookNum,this._chapterNum=s.chapterNum,this._verseNum=s.verseNum,this._verse=s.verse,this.versification=s.versification}else{if(t==null)return;const s=t instanceof bt?t:ae.defaultVersification;this.setEmpty(s)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ae.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new ae(t),{success:!0,verseRef:n}}catch(r){if(r instanceof ln)return n=new ae,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ae.bcvMaxValue*ae.bookDigitShifter+(n>=0?n%ae.bcvMaxValue*ae.chapterDigitShifter:0)+(r>=0?r%ae.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:s,versificationStr:i}=t,l=s||o.toString();let c;return i&&(c=new bt(i)),n?new ae(n,r.toString(),l,c):new ae}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>ae.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ae.verseRangeSeparator)||this._verse.includes(ae.verseSequenceIndicator))}get book(){return se.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=se.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ae.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ae.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>se.lastBook)throw new ln("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new bt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ae.verseRangeSeparators,ae.verseSequenceIndicators)}get BBBCCC(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const s=t.split("/");if(t=s[0],s.length>1)try{const i=+s[1].trim();this.versification=new bt(We[i])}catch{throw new ln("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new ln("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||se.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ae.isVerseParseable(r[1]))throw new ln("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ae(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete n.verse,n}equals(t){return t instanceof ae?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=ae.verseRangeSeparators,r=ae.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],s=Ta(this._verse,r);for(const i of s.map(l=>Ta(l,n))){const l=this.clone();l.verse=i[0];const c=l.verseNum;if(o.push(l),i.length>1){const d=this.clone();if(d.verse=i[1],!t)for(let u=c+1;u<d.verseNum;u++){const f=new ae(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||o.push(f)}o.push(d)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const s=o.internalValid;if(s!==0)return s;const i=o.BBBCCCVVV;if(r>i)return 3;if(r===i)return 4;r=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>se.lastBook?2:(se.isCanonical(this._bookNum),0)}setEmpty(t=ae.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=se.bookIdToNumber(t),this.chapter=n,this.verse=r}};re(Te,"defaultVersification",bt.English),re(Te,"verseRangeSeparator","-"),re(Te,"verseSequenceIndicator",","),re(Te,"verseRangeSeparators",[Te.verseRangeSeparator]),re(Te,"verseSequenceIndicators",[Te.verseSequenceIndicator]),re(Te,"chapterDigitShifter",1e3),re(Te,"bookDigitShifter",Te.chapterDigitShifter*Te.chapterDigitShifter),re(Te,"bcvMaxValue",Te.chapterDigitShifter-1),re(Te,"ValidStatusType",zs);class ln extends Error{}const wc=h.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:s,children:i},l)=>a.jsxs(So,{ref:l,textValue:e,className:y("tw-mx-1 tw-flex-col tw-items-start tw-px-1 tw-font-normal tw-text-foreground/80",{"tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[a.jsx("span",{className:y("tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",{"tw-font-bold":n,"tw-border-s-red-200":s.toLowerCase()==="ot","tw-border-s-purple-200":s.toLowerCase()==="nt","tw-border-s-indigo-200":s.toLowerCase()==="dc"}),children:se.bookIdToEnglishName(e)}),n&&a.jsx("div",{children:i})]},e));function fc({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const s=Array.from({length:t},(l,c)=>c+1),i=h.useCallback(l=>{o(l)},[o]);return a.jsx("div",{className:y("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"),children:s.map(l=>a.jsx("div",{className:y("tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",{"tw-font-semibold tw-text-amber-900":l===n,"tw-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>i(l),children:l},l))})}const Oo=se.allBookIds.filter(e=>!se.isObsolete(se.bookIdToNumber(e))),mc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},Ra=["OT","NT","DC"],hc=96,gc=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],cn=e=>K.getChaptersForBook(se.bookIdToNumber(e));function bc(){return Oo.map(t=>se.bookIdToEnglishName(t))}function vc(e){return bc().includes(e)}function xc(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(vc(t))return Oo.find(r=>se.bookIdToEnglishName(r)===t)}function yc({scrRef:e,handleSubmit:t,className:n,getActiveBookIds:r}){const o=Ne(),[s,i]=h.useState(""),[l,c]=h.useState(se.bookNumberToId(e.bookNum)),[d,u]=h.useState(e.chapterNum??0),[f,w]=h.useState(se.bookNumberToId(e.bookNum)),[b,x]=h.useState(!1),[m,g]=h.useState(b),j=h.useRef(void 0),S=h.useRef(void 0),E=h.useRef(void 0),k=h.useCallback(D=>{const I=r?r():Oo;return{OT:I.filter(M=>se.isBookOT(M)),NT:I.filter(M=>se.isBookNT(M)),DC:I.filter(M=>se.isBookDC(M))}[D].filter(M=>{const L=se.bookIdToEnglishName(M).toLowerCase(),H=s.replace(/[^a-zA-Z]/g,"").toLowerCase();return L.includes(H)||M.toLowerCase().includes(H)})},[s,r]),v=D=>{i(D)},O=h.useRef(!1),V=h.useCallback(D=>{if(O.current){O.current=!1;return}x(D)},[]),C=h.useCallback((D,I,M,L)=>{if(u(se.bookNumberToId(e.bookNum)!==D?1:e.chapterNum),I||cn(D)===-1){t({bookNum:se.bookIdToNumber(D),chapterNum:M||1,verseNum:L||1}),x(!1),i("");return}c(l!==D?D:""),x(!I)},[t,e.bookNum,e.chapterNum,l]),_=D=>{D<=0||D>cn(l)||C(l,!0,D)},F=h.useCallback(()=>{gc.forEach(D=>{const I=s.match(D);if(I){const[M,L=void 0,H=void 0]=I.slice(1),oe=xc(M);(se.isBookIdValid(M)||oe)&&C(oe??M,!0,L?parseInt(L,10):1,H?parseInt(H,10):1)}})},[C,s]),$=h.useCallback(D=>{b?(D.key==="ArrowDown"||D.key==="ArrowUp")&&(typeof E<"u"&&E.current!==null?E.current.focus():typeof S<"u"&&S.current!==null&&S.current.focus(),D.preventDefault()):x(!0)},[b]),te=D=>{const{key:I}=D;I==="ArrowRight"||I==="ArrowLeft"||I==="ArrowDown"||I==="ArrowUp"||I==="Enter"||(j.current.dispatchEvent(new KeyboardEvent("keydown",{key:I})),j.current.focus())},Z=D=>{const{key:I}=D;if(f===l){if(I==="Enter"){D.preventDefault(),C(l,!0,d);return}const M=I==="ArrowRight"&&!o||I==="ArrowRight"&&o==="ltr"||I==="ArrowLeft"&&o==="rtl",L=I==="ArrowLeft"&&!o||I==="ArrowLeft"&&o==="ltr"||I==="ArrowRight"&&o==="rtl";let H=0;if(M)if(d<cn(f))H=1;else{D.preventDefault();return}else if(L)if(d>1)H=-1;else{D.preventDefault();return}else I==="ArrowDown"?H=6:I==="ArrowUp"&&(H=-6);d+H<=0||d+H>cn(f)?u(0):H!==0&&(u(d+H),D.preventDefault())}};return h.useEffect(()=>{l===f?l===se.bookNumberToId(e.bookNum)?u(e.chapterNum):u(1):u(0)},[f,e.bookNum,e.chapterNum,l]),h.useLayoutEffect(()=>{g(b)},[b]),h.useLayoutEffect(()=>{const D=setTimeout(()=>{if(m&&S.current&&E.current){const M=E.current.offsetTop-hc;S.current.scrollTo({top:M,behavior:"instant"})}},10);return()=>{clearTimeout(D)}},[m]),a.jsx("div",{className:"pr-twp tw-flex",children:a.jsxs(vr,{modal:!1,open:b,onOpenChange:V,children:[a.jsx(ko,{asChild:!0,children:a.jsx(Kl,{ref:j,value:s,handleSearch:v,handleKeyDown:$,handleOnClick:()=>{c(se.bookNumberToId(e.bookNum)),w(se.bookNumberToId(e.bookNum)),u(e.chapterNum>0?e.chapterNum:0),x(!0),j.current.focus()},onFocus:()=>{O.current=!0},handleSubmit:F,placeholder:`${se.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`,className:n})}),a.jsx(Pn,{className:"tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},onKeyDown:te,align:o==="ltr"?"start":"end",ref:S,children:a.jsx("div",{className:"rtl:tw-ps-2",children:Ra.map((D,I)=>{const M=k(D);return M.length>0&&a.jsxs("div",{children:[a.jsx(In,{className:"tw-font-semibold tw-text-foreground/80",children:mc[D]}),M.map(L=>a.jsx("div",{children:a.jsx(wc,{bookId:L,handleSelectBook:()=>C(L,!1),isSelected:l===L,handleHighlightBook:()=>w(L),handleKeyDown:Z,bookType:D,ref:H=>{l===L&&(E.current=H)},children:a.jsx(fc,{handleSelectChapter:_,endChapter:cn(L),activeChapter:e.bookNum===se.bookIdToNumber(L)?e.chapterNum:0,highlightedChapter:d,handleHighlightedChapter:H=>{u(H)}})})},L)),Ra.length-1!==I?a.jsx(Mn,{}):void 0]},D)})})})]})})}const Vs=_t.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),pe=h.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},s)=>{const i=r?Qt.Slot:"button";return a.jsx(i,{className:y(Vs({variant:t,size:n,className:e})),ref:s,...o})});pe.displayName="Button";const Nc=_t.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),Re=h.forwardRef(({className:e,...t},n)=>a.jsx(Cs.Root,{ref:n,className:y("pr-twp",Nc(),e),...t}));Re.displayName=Cs.Root.displayName;const _o=h.forwardRef(({className:e,...t},n)=>{const r=Ne();return a.jsx(Sn.Root,{className:y("pr-twp tw-grid tw-gap-2",e),...t,ref:n,dir:r})});_o.displayName=Sn.Root.displayName;const ir=h.forwardRef(({className:e,...t},n)=>a.jsx(Sn.Item,{ref:n,className:y("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t,children:a.jsx(Sn.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:a.jsx(J.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));ir.displayName=Sn.Item.displayName;const Po=En.Root,Io=En.Trigger,yr=h.forwardRef(({className:e,align:t="center",sideOffset:n=4,...r},o)=>{const s=Ne();return a.jsx(En.Portal,{children:a.jsx(En.Content,{ref:o,align:t,sideOffset:n,className:y("pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...r,dir:s})})});yr.displayName=En.Content.displayName;const jc=Je.Portal,Fs=h.forwardRef(({className:e,...t},n)=>a.jsx(Je.Overlay,{ref:n,className:y("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",e),...t}));Fs.displayName=Je.Overlay.displayName;const kc=h.forwardRef(({className:e,children:t,...n},r)=>{const o=Ne();return a.jsxs(jc,{children:[a.jsx(Fs,{}),a.jsxs(Je.Content,{ref:r,className:y("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",e),...n,dir:o,children:[t,a.jsxs(Je.Close,{className:y("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":o==="ltr"},{"tw-left-4":o==="rtl"}),children:[a.jsx(J.X,{className:"tw-h-4 tw-w-4"}),a.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});kc.displayName=Je.Content.displayName;const Sc=h.forwardRef(({className:e,...t},n)=>a.jsx(Je.Title,{ref:n,className:y("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));Sc.displayName=Je.Title.displayName;const Ec=h.forwardRef(({className:e,...t},n)=>a.jsx(Je.Description,{ref:n,className:y("tw-text-sm tw-text-muted-foreground",e),...t}));Ec.displayName=Je.Description.displayName;const Mo=h.forwardRef(({className:e,...t},n)=>a.jsx(Pe.Command,{ref:n,className:y("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",e),...t}));Mo.displayName=Pe.Command.displayName;const $o=h.forwardRef(({className:e,...t},n)=>{const r=Ne();return a.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:r,children:[a.jsx(J.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),a.jsx(Pe.Command.Input,{ref:n,className:y("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t})]})});$o.displayName=Pe.Command.Input.displayName;const Do=h.forwardRef(({className:e,...t},n)=>a.jsx(Pe.Command.List,{ref:n,className:y("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",e),...t}));Do.displayName=Pe.Command.List.displayName;const Ao=h.forwardRef((e,t)=>a.jsx(Pe.Command.Empty,{ref:t,className:"tw-py-6 tw-text-center tw-text-sm",...e}));Ao.displayName=Pe.Command.Empty.displayName;const Ls=h.forwardRef(({className:e,...t},n)=>a.jsx(Pe.Command.Group,{ref:n,className:y("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",e),...t}));Ls.displayName=Pe.Command.Group.displayName;const Cc=h.forwardRef(({className:e,...t},n)=>a.jsx(Pe.Command.Separator,{ref:n,className:y("tw--mx-1 tw-h-px tw-bg-border",e),...t}));Cc.displayName=Pe.Command.Separator.displayName;const Bo=h.forwardRef(({className:e,...t},n)=>a.jsx(Pe.Command.Item,{ref:n,className:y("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",e),...t}));Bo.displayName=Pe.Command.Item.displayName;function Tc(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function lr({id:e,options:t=[],className:n,buttonClassName:r,popoverContentClassName:o,value:s,onChange:i=()=>{},getOptionLabel:l=Tc,icon:c=void 0,buttonPlaceholder:d="",textPlaceholder:u="",commandEmptyMessage:f="No option found",buttonVariant:w="outline",alignDropDown:b="start",isDisabled:x=!1,...m}){const[g,j]=h.useState(!1);return a.jsxs(Po,{open:g,onOpenChange:j,...m,children:[a.jsx(Io,{asChild:!0,children:a.jsxs(pe,{variant:w,role:"combobox","aria-expanded":g,id:e,className:y("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",r??n),disabled:x,children:[a.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[c&&a.jsx("div",{className:"tw-pe-2",children:c}),a.jsx("span",{className:"tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:s?l(s):d})]}),a.jsx(J.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),a.jsx(yr,{align:b,className:y("tw-w-[200px] tw-p-0",o),children:a.jsxs(Mo,{children:[a.jsx($o,{placeholder:u,className:"tw-text-inherit"}),a.jsx(Ao,{children:f}),a.jsx(Do,{children:t.map(S=>a.jsxs(Bo,{value:l(S),onSelect:()=>{i(S),j(!1)},children:[a.jsx(J.Check,{className:y("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!s||l(s)!==l(S)})}),l(S)]},l(S)))})]})})]})}function Gs({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o=!1,chapterCount:s}){const i=h.useMemo(()=>Array.from({length:s},(d,u)=>u+1),[s]),l=d=>{n(d),d>t&&r(d)},c=d=>{r(d),d<e&&n(d)};return a.jsxs(a.Fragment,{children:[a.jsx(Re,{htmlFor:"start-chapters-combobox",children:"Chapters"}),a.jsx(lr,{isDisabled:o,onChange:l,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:e},"start chapter"),a.jsx(Re,{htmlFor:"end-chapters-combobox",children:"to"}),a.jsx(lr,{isDisabled:o,onChange:c,buttonClassName:"tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:t},"end chapter")]})}var Us=(e=>(e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books",e))(Us||{});const Rc=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),qr=(e,t)=>e[t]??t;function Oc({handleBookSelectionModeChange:e,currentBookName:t,onSelectBooks:n,selectedBookIds:r,chapterCount:o,endChapter:s,handleSelectEndChapter:i,startChapter:l,handleSelectStartChapter:c,localizedStrings:d}){const u=qr(d,"%webView_bookSelector_currentBook%"),f=qr(d,"%webView_bookSelector_choose%"),w=qr(d,"%webView_bookSelector_chooseBooks%"),[b,x]=h.useState("current book"),m=g=>{x(g),e(g)};return a.jsx(_o,{className:"pr-twp tw-flex",value:b,onValueChange:g=>m(g),children:a.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[a.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(ir,{value:"current book"}),a.jsx(Re,{className:"tw-ms-1",children:u})]}),a.jsx(Re,{className:"tw-flex tw-items-center",children:t}),a.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:a.jsx(Gs,{isDisabled:b==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:i,chapterCount:o,startChapter:l,endChapter:s})})]}),a.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(ir,{value:"choose books"}),a.jsx(Re,{className:"tw-ms-1",children:w})]}),a.jsx(Re,{className:"tw-flex tw-items-center",children:r.map(g=>se.bookIdToEnglishName(g)).join(", ")}),a.jsx(pe,{disabled:b==="current book",onClick:()=>n(),children:f})]})]})})}function _c({table:e}){return a.jsxs(vr,{children:[a.jsx(Ss.DropdownMenuTrigger,{asChild:!0,children:a.jsxs(pe,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[a.jsx(J.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),a.jsxs(Pn,{align:"end",className:"tw-w-[150px]",children:[a.jsx(In,{children:"Toggle columns"}),a.jsx(Mn,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>a.jsx(xr,{className:"tw-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}const St=ve.Root,qs=ve.Group,Et=ve.Value,ut=h.forwardRef(({className:e,children:t,...n},r)=>{const o=Ne();return a.jsxs(ve.Trigger,{ref:r,className:y("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",e),...n,dir:o,children:[t,a.jsx(ve.Icon,{asChild:!0,children:a.jsx(J.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});ut.displayName=ve.Trigger.displayName;const zo=h.forwardRef(({className:e,...t},n)=>a.jsx(ve.ScrollUpButton,{ref:n,className:y("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:a.jsx(J.ChevronUp,{className:"tw-h-4 tw-w-4"})}));zo.displayName=ve.ScrollUpButton.displayName;const Vo=h.forwardRef(({className:e,...t},n)=>a.jsx(ve.ScrollDownButton,{ref:n,className:y("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:a.jsx(J.ChevronDown,{className:"tw-h-4 tw-w-4"})}));Vo.displayName=ve.ScrollDownButton.displayName;const pt=h.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>{const s=Ne();return a.jsx(ve.Portal,{children:a.jsxs(ve.Content,{ref:o,className:y("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",e),position:n,...r,children:[a.jsx(zo,{}),a.jsx(ve.Viewport,{className:y("tw-p-1",n==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:a.jsx("div",{dir:s,children:t})}),a.jsx(Vo,{})]})})});pt.displayName=ve.Content.displayName;const Hs=h.forwardRef(({className:e,...t},n)=>a.jsx(ve.Label,{ref:n,className:y("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",e),...t}));Hs.displayName=ve.Label.displayName;const De=h.forwardRef(({className:e,children:t,...n},r)=>a.jsxs(ve.Item,{ref:r,className:y("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[a.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:a.jsx(ve.ItemIndicator,{children:a.jsx(J.Check,{className:"tw-h-4 tw-w-4"})})}),a.jsx(ve.ItemText,{children:t})]}));De.displayName=ve.Item.displayName;const Xs=h.forwardRef(({className:e,...t},n)=>a.jsx(ve.Separator,{ref:n,className:y("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Xs.displayName=ve.Separator.displayName;function Pc({table:e}){return a.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[a.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[a.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),a.jsxs(St,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[a.jsx(ut,{className:"tw-h-8 tw-w-[70px]",children:a.jsx(Et,{placeholder:e.getState().pagination.pageSize})}),a.jsx(pt,{side:"top",children:[10,20,30,40,50].map(t=>a.jsx(De,{value:`${t}`,children:t},t))})]})]}),a.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[a.jsxs(pe,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),a.jsx(J.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(pe,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),a.jsx(J.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(pe,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),a.jsx(J.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(pe,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),a.jsx(J.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const $n=h.forwardRef(({className:e,stickyHeader:t,...n},r)=>a.jsx("div",{className:y("pr-twp tw-relative tw-w-full",{"tw-overflow-auto":!t}),children:a.jsx("table",{ref:r,className:y("tw-w-full tw-caption-bottom tw-text-sm",e),...n})}));$n.displayName="Table";const Dn=h.forwardRef(({className:e,stickyHeader:t,...n},r)=>a.jsx("thead",{ref:r,className:y({"tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm":t},"[&_tr]:tw-border-b",e),...n}));Dn.displayName="TableHeader";const An=h.forwardRef(({className:e,...t},n)=>a.jsx("tbody",{ref:n,className:y("[&_tr:last-child]:tw-border-0",e),...t}));An.displayName="TableBody";const Ys=h.forwardRef(({className:e,...t},n)=>a.jsx("tfoot",{ref:n,className:y("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",e),...t}));Ys.displayName="TableFooter";const nt=h.forwardRef(({className:e,...t},n)=>a.jsx("tr",{ref:n,className:y("tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",e),...t}));nt.displayName="TableRow";const Ht=h.forwardRef(({className:e,...t},n)=>a.jsx("th",{ref:n,className:y("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",e),...t}));Ht.displayName="TableHead";const Ct=h.forwardRef(({className:e,...t},n)=>a.jsx("td",{ref:n,className:y("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",e),...t}));Ct.displayName="TableCell";const Ws=h.forwardRef(({className:e,...t},n)=>a.jsx("caption",{ref:n,className:y("tw-mt-4 tw-text-sm tw-text-muted-foreground",e),...t}));Ws.displayName="TableCaption";function Ks({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,stickyHeader:s=!1,onRowClickHandler:i=()=>{}}){var g;const[l,c]=h.useState([]),[d,u]=h.useState([]),[f,w]=h.useState({}),[b,x]=h.useState({}),m=Ee.useReactTable({data:t,columns:e,getCoreRowModel:Ee.getCoreRowModel(),...n&&{getPaginationRowModel:Ee.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:Ee.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:Ee.getFilteredRowModel(),onColumnVisibilityChange:w,onRowSelectionChange:x,state:{sorting:l,columnFilters:d,columnVisibility:f,rowSelection:b}});return a.jsxs("div",{className:"pr-twp",children:[o&&a.jsx(_c,{table:m}),a.jsxs($n,{stickyHeader:s,children:[a.jsx(Dn,{stickyHeader:s,children:m.getHeaderGroups().map(j=>a.jsx(nt,{children:j.headers.map(S=>a.jsx(Ht,{children:S.isPlaceholder?void 0:Ee.flexRender(S.column.columnDef.header,S.getContext())},S.id))},j.id))}),a.jsx(An,{children:(g=m.getRowModel().rows)!=null&&g.length?m.getRowModel().rows.map(j=>a.jsx(nt,{onClick:()=>i(j,m),"data-state":j.getIsSelected()&&"selected",children:j.getVisibleCells().map(S=>a.jsx(Ct,{children:Ee.flexRender(S.column.columnDef.cell,S.getContext())},S.id))},j.id)):a.jsx(nt,{children:a.jsx(Ct,{colSpan:e.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),n&&a.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[a.jsx(pe,{variant:"outline",size:"sm",onClick:()=>m.previousPage(),disabled:!m.getCanPreviousPage(),children:"Previous"}),a.jsx(pe,{variant:"outline",size:"sm",onClick:()=>m.nextPage(),disabled:!m.getCanNextPage(),children:"Next"})]}),n&&r&&a.jsx(Pc,{table:m})]})}function Ic({occurrenceData:e,setScriptureReference:t,localizedStrings:n}){const r=n["%webView_inventory_occurrences_table_header_reference%"],o=n["%webView_inventory_occurrences_table_header_occurrence%"],s=h.useMemo(()=>{const i=[];return e.forEach(l=>{i.some(c=>K.deepEqual(c,l))||i.push(l)}),i},[e]);return a.jsxs($n,{stickyHeader:!0,children:[a.jsx(Dn,{stickyHeader:!0,children:a.jsxs(nt,{children:[a.jsx(Ht,{children:r}),a.jsx(Ht,{children:o})]})}),a.jsx(An,{children:s.length>0&&s.map(i=>a.jsxs(nt,{onClick:()=>{t(i.reference)},children:[a.jsx(Ct,{children:`${se.bookNumberToEnglishName(i.reference.bookNum)} ${i.reference.chapterNum}:${i.reference.verseNum}`}),a.jsx(Ct,{children:i.text})]},`${i.reference.bookNum} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}const Nr=h.forwardRef(({className:e,...t},n)=>a.jsx(io.Root,{ref:n,className:y("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",e),...t,children:a.jsx(io.Indicator,{className:y("tw-flex tw-items-center tw-justify-center tw-text-current"),children:a.jsx(J.Check,{className:"tw-h-4 tw-w-4"})})}));Nr.displayName=io.Root.displayName;const Js=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),co=e=>{const t=/^\\[vc]\s+(\d+)/,n=e.match(t);if(n)return+n[1]},Zs=e=>{const t=e.match(/^\\id\s+([A-Za-z]+)/);return t?se.bookIdToNumber(t[1]):0},Qs=(e,t,n)=>n.includes(e)?"unapproved":t.includes(e)?"approved":"unknown",ei=_t.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Mc=h.forwardRef(({className:e,variant:t,size:n,...r},o)=>a.jsx(Ts.Root,{ref:o,className:y(ei({variant:t,size:n,className:e})),...r}));Mc.displayName=Ts.Root.displayName;const ti=h.createContext({size:"default",variant:"default"}),Fo=h.forwardRef(({className:e,variant:t,size:n,children:r,...o},s)=>{const i=Ne();return a.jsx(br.Root,{ref:s,className:y("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",e),...o,dir:i,children:a.jsx(ti.Provider,{value:{variant:t,size:n},children:r})})});Fo.displayName=br.Root.displayName;const yn=h.forwardRef(({className:e,children:t,variant:n,size:r,...o},s)=>{const i=h.useContext(ti);return a.jsx(br.Item,{ref:s,className:y(ei({variant:i.variant||n,size:i.size||r}),e),...o,children:t})});yn.displayName=br.Item.displayName;const jr=e=>e==="asc"?a.jsx(J.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e==="desc"?a.jsx(J.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):a.jsx(J.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),$c=e=>({accessorKey:"item",accessorFn:t=>t.items[0],header:({column:t})=>a.jsxs(pe,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,jr(t.getIsSorted())]})}),Dc=(e,t)=>({accessorKey:`item${t}`,accessorFn:n=>n.items[t],header:({column:n})=>a.jsxs(pe,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[e,jr(n.getIsSorted())]})}),Ac=e=>({accessorKey:"count",header:({column:t})=>a.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:a.jsxs(pe,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,jr(t.getIsSorted())]})}),cell:({row:t})=>a.jsx("div",{className:"tw-flex tw-justify-end",children:t.getValue("count")})}),Hr=(e,t,n,r,o,s)=>{let i=[...n];e.forEach(c=>{t==="approved"?i.includes(c)||i.push(c):i=i.filter(d=>d!==c)}),r(i);let l=[...o];e.forEach(c=>{t==="unapproved"?l.includes(c)||l.push(c):l=l.filter(d=>d!==c)}),s(l)},Bc=(e,t,n,r,o)=>({accessorKey:"status",header:({column:s})=>a.jsx("div",{className:"tw-flex tw-justify-center",children:a.jsxs(pe,{variant:"ghost",onClick:()=>s.toggleSorting(void 0),children:[e,jr(s.getIsSorted())]})}),cell:({row:s})=>{const i=s.getValue("status"),l=s.getValue("item");return a.jsxs(Fo,{value:i,variant:"outline",type:"single",children:[a.jsx(yn,{onClick:()=>Hr([l],"approved",t,n,r,o),value:"approved",children:a.jsx(J.CircleCheckIcon,{})}),a.jsx(yn,{onClick:()=>Hr([l],"unapproved",t,n,r,o),value:"unapproved",children:a.jsx(J.CircleXIcon,{})}),a.jsx(yn,{onClick:()=>Hr([l],"unknown",t,n,r,o),value:"unknown",children:a.jsx(J.CircleHelpIcon,{})})]})}}),zc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),Vc=(e,t,n)=>{let r=e;return t!=="all"&&(r=r.filter(o=>t==="approved"&&o.status==="approved"||t==="unapproved"&&o.status==="unapproved"||t==="unknown"&&o.status==="unknown")),n!==""&&(r=r.filter(o=>o.items[0].includes(n))),r},Fc=(e,t,n,r,o)=>{if(!e)return[];const s=[];let i=t.bookNum,l=t.chapterNum,c=t.verseNum;return Js(e).forEach(u=>{u.startsWith("\\id")&&(i=Zs(u),l=0,c=0),u.startsWith("\\c")&&(l=co(u),c=0),u.startsWith("\\v")&&(c=co(u),l===0&&(l=t.chapterNum));let f=o.exec(u)??void 0;for(;f;){const w=[];f.forEach(g=>w.push(g));const b=f.index,x=s.find(g=>K.deepEqual(g.items,w)),m={reference:{bookNum:i!==void 0?i:-1,chapterNum:l!==void 0?l:-1,verseNum:c!==void 0?c:-1},text:K.substring(u,Math.max(0,b-25),Math.min(b+25,u.length))};if(x)x.count+=1,x.occurrences.push(m);else{const g={items:w,count:1,status:Qs(w[0],n,r),occurrences:[m]};s.push(g)}f=o.exec(u)??void 0}}),s},tt=(e,t)=>e[t]??t;function Lc({scriptureReference:e,setScriptureReference:t,localizedStrings:n,extractItems:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:i,text:l,scope:c,onScopeChange:d,columns:u}){const f=tt(n,"%webView_inventory_all%"),w=tt(n,"%webView_inventory_approved%"),b=tt(n,"%webView_inventory_unapproved%"),x=tt(n,"%webView_inventory_unknown%"),m=tt(n,"%webView_inventory_scope_currentBook%"),g=tt(n,"%webView_inventory_scope_chapter%"),j=tt(n,"%webView_inventory_scope_verse%"),S=tt(n,"%webView_inventory_filter_text%"),E=tt(n,"%webView_inventory_show_additional_items%"),[k,v]=h.useState(!1),[O,V]=h.useState("all"),[C,_]=h.useState(""),[F,$]=h.useState([]),te=h.useMemo(()=>l?r instanceof RegExp?Fc(l,e,s,i,r):r(l,e,s,i):[],[l,r,e,s,i]),Z=h.useMemo(()=>{if(k)return te;const N=[];return te.forEach(T=>{const G=T.items[0],U=N.find(z=>z.items[0]===G);U?(U.count+=T.count,U.occurrences=U.occurrences.concat(T.occurrences)):N.push({items:[G],count:T.count,occurrences:T.occurrences,status:T.status})}),N},[k,te]),D=h.useMemo(()=>Vc(Z,O,C),[Z,O,C]),I=h.useMemo(()=>{var G,U;if(!k)return u;const N=(G=o==null?void 0:o.tableHeaders)==null?void 0:G.length;if(!N)return u;const T=[];for(let z=0;z<N;z++)T.push(Dc(((U=o==null?void 0:o.tableHeaders)==null?void 0:U[z])||"Additional Item",z+1));return[...T,...u]},[o==null?void 0:o.tableHeaders,u,k]);h.useEffect(()=>{$([])},[D]);const M=(N,T)=>{T.setRowSelection(()=>{const G={};return G[N.index]=!0,G}),$(N.original.items)},L=N=>{if(N==="book"||N==="chapter"||N==="verse")d(N);else throw new Error(`Invalid scope value: ${N}`)},H=N=>{if(N==="all"||N==="approved"||N==="unapproved"||N==="unknown")V(N);else throw new Error(`Invalid status filter value: ${N}`)},oe=h.useMemo(()=>{if(Z.length===0||F.length===0)return[];const N=Z.filter(T=>K.deepEqual(k?T.items:[T.items[0]],F));if(N.length>1)throw new Error("Selected item is not unique");return N[0].occurrences},[F,k,Z]);return a.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[a.jsxs("div",{className:"tw-flex tw-items-stretch",children:[a.jsxs(St,{onValueChange:N=>H(N),defaultValue:O,children:[a.jsx(ut,{className:"tw-m-1",children:a.jsx(Et,{placeholder:"Select filter"})}),a.jsxs(pt,{children:[a.jsx(De,{value:"all",children:f}),a.jsx(De,{value:"approved",children:w}),a.jsx(De,{value:"unapproved",children:b}),a.jsx(De,{value:"unknown",children:x})]})]}),a.jsxs(St,{onValueChange:N=>L(N),defaultValue:c,children:[a.jsx(ut,{className:"tw-m-1",children:a.jsx(Et,{placeholder:"Select scope"})}),a.jsxs(pt,{children:[a.jsx(De,{value:"book",children:m}),a.jsx(De,{value:"chapter",children:g}),a.jsx(De,{value:"verse",children:j})]})]}),a.jsx(Pt,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:S,value:C,onChange:N=>{_(N.target.value)}}),o&&a.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[a.jsx(Nr,{className:"tw-m-1",checked:k,onCheckedChange:N=>{$([]),v(N)}}),a.jsx(Re,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??E})]})]}),a.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:a.jsx(Ks,{columns:I,data:D,onRowClickHandler:M,stickyHeader:!0})}),oe.length>0&&a.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:a.jsx(Ic,{occurrenceData:oe,setScriptureReference:t,localizedStrings:n})})]})}function ni({entries:e,getEntriesCount:t=void 0,selected:n,onChange:r,placeholder:o,commandEmptyMessage:s="No entries found",customSelectedText:i,sortSelected:l=!1,icon:c=void 0,className:d=void 0}){const[u,f]=h.useState(!1),w=h.useCallback(m=>{var j;const g=(j=e.find(S=>S.label===m))==null?void 0:j.value;g&&r(n.includes(g)?n.filter(S=>S!==g):[...n,g])},[e,n,r]),b=()=>i||o,x=h.useMemo(()=>{if(!l)return e;const m=e.filter(j=>j.starred).sort((j,S)=>j.label.localeCompare(S.label)),g=e.filter(j=>!j.starred).sort((j,S)=>{const E=n.includes(j.value),k=n.includes(S.value);return E&&!k?-1:!E&&k?1:j.label.localeCompare(S.label)});return[...m,...g]},[e,n,l]);return a.jsx("div",{className:d,children:a.jsxs(Po,{open:u,onOpenChange:f,children:[a.jsx(Io,{asChild:!0,children:a.jsxs(pe,{variant:"ghost",role:"combobox","aria-expanded":u,className:y("tw-w-full tw-justify-between",n.length>0&&n.length<e.length&&"tw-border-primary","tw-group"),children:[a.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[a.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:a.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:c})}),a.jsx("div",{className:y({"tw-text-muted-foreground group-hover:tw-text-secondary-foreground":n.length===0||n.length===e.length}),children:a.jsx("div",{className:"tw-font-normal",children:b()})})]}),a.jsx(J.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),a.jsx(yr,{align:"start",className:"tw-w-full tw-p-0",children:a.jsxs(Mo,{children:[a.jsx($o,{placeholder:`Search ${o.toLowerCase()}...`}),a.jsxs(Do,{children:[a.jsx(Ao,{children:s}),a.jsx(Ls,{children:x.map(m=>{const g=t?t(m):void 0;return a.jsxs(Bo,{value:m.label,onSelect:w,className:"tw-flex tw-items-center tw-gap-2",children:[a.jsx("div",{className:"w-4",children:a.jsx(J.Check,{className:y("tw-h-4 tw-w-4",n.includes(m.value)?"tw-opacity-100":"tw-opacity-0")})}),a.jsx("div",{className:"tw-w-4",children:m.starred&&a.jsx(J.Star,{className:"tw-h-4 tw-w-4"})}),a.jsx("div",{className:"tw-flex-grow",children:m.label}),t&&a.jsx("div",{className:"tw-w-10 tw-text-end tw-text-muted-foreground",children:g})]},m.label)})})]})]})})]})})}function Lo({value:e,onSearch:t,placeholder:n,isFullWidth:r,className:o}){const s=Ne();return a.jsxs("div",{className:y("tw-relative",{"tw-w-full":r},o),children:[a.jsx(J.Search,{className:y("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":s==="rtl"},{"tw-left-3":s==="ltr"})}),a.jsx(Pt,{className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:n,value:e,onChange:i=>t(i.target.value)}),e&&a.jsxs(pe,{variant:"ghost",size:"icon",className:y("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":s==="rtl"},{"tw-right-0":s==="ltr"}),onClick:()=>{t("")},children:[a.jsx(J.X,{className:"tw-h-4 tw-w-4"}),a.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})}const Go=h.forwardRef(({className:e,...t},n)=>{const r=Ne();return a.jsx(Ie.Root,{orientation:"vertical",ref:n,className:y("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",e),...t,dir:r})});Go.displayName=Ie.List.displayName;const Uo=h.forwardRef(({className:e,...t},n)=>a.jsx(Ie.List,{ref:n,className:y("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));Uo.displayName=Ie.List.displayName;const ri=h.forwardRef(({className:e,...t},n)=>a.jsx(Ie.Trigger,{ref:n,...t,className:y("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e)})),qo=h.forwardRef(({className:e,...t},n)=>a.jsx(Ie.Content,{ref:n,className:y("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));qo.displayName=Ie.Content.displayName;function Gc({tabList:e,searchValue:t,onSearch:n,searchPlaceholder:r,headerTitle:o,searchClassName:s}){return a.jsxs("div",{className:"pr-twp",children:[a.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[o?a.jsx("h1",{children:o}):"",a.jsx(Lo,{className:s,value:t,onSearch:n,placeholder:r})]}),a.jsxs(Go,{children:[a.jsx(Uo,{children:e.map(i=>a.jsx(ri,{value:i.value,children:i.value},i.key))}),e.map(i=>a.jsx(qo,{value:i.value,children:i.content},i.key))]})]})}const kr=h.forwardRef(({className:e,orientation:t="horizontal",decorative:n=!0,...r},o)=>a.jsx(Rs.Root,{ref:o,decorative:n,orientation:t,className:y("pr-twp tw-shrink-0 tw-bg-border",t==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",e),...r}));kr.displayName=Rs.Root.displayName;function Oa({className:e,...t}){return a.jsx("div",{className:y("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",e),...t})}const Uc=_n.Provider,qc=_n.Root,Hc=_n.Trigger,oi=h.forwardRef(({className:e,sideOffset:t=4,...n},r)=>a.jsx(_n.Content,{ref:r,sideOffset:t,className:y("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...n}));oi.displayName=_n.Content.displayName;const Xc="16rem",Yc="3rem",ai=h.createContext(void 0);function Sr(){const e=h.useContext(ai);if(!e)throw new Error("useSidebar must be used within a SidebarProvider.");return e}const si=h.forwardRef(({defaultOpen:e=!0,open:t,onOpenChange:n,className:r,style:o,children:s,side:i="primary",...l},c)=>{const[d,u]=h.useState(e),f=t??d,w=h.useCallback(E=>{const k=typeof E=="function"?E(f):E;n?n(k):u(k)},[n,f]),b=h.useCallback(()=>w(E=>!E),[w]),x=f?"expanded":"collapsed",j=Ne()==="ltr"?i:i==="primary"?"secondary":"primary",S=h.useMemo(()=>({state:x,open:f,setOpen:w,toggleSidebar:b,side:j}),[x,f,w,b,j]);return a.jsx(ai.Provider,{value:S,children:a.jsx(Uc,{delayDuration:0,children:a.jsx("div",{style:{"--sidebar-width":Xc,"--sidebar-width-icon":Yc,...o},className:y("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",r),ref:c,...l,children:s})})})});si.displayName="SidebarProvider";const ii=h.forwardRef(({variant:e="sidebar",collapsible:t="offcanvas",className:n,children:r,...o},s)=>{const i=Sr();return t==="none"?a.jsx("div",{className:y("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",n),ref:s,...o,children:r}):a.jsxs("div",{ref:s,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?t:"","data-variant":e,"data-side":i.side,children:[a.jsx("div",{className:y("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",e==="floating"||e==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),a.jsx("div",{className:y("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",e==="floating"||e==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",n),...o,children:a.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:r})})]})});ii.displayName="Sidebar";const Wc=h.forwardRef(({className:e,onClick:t,...n},r)=>{const o=Sr();return a.jsxs(pe,{ref:r,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:y("tw-h-7 tw-w-7",e),onClick:s=>{t==null||t(s),o.toggleSidebar()},...n,children:[o.side==="primary"?a.jsx(J.PanelLeft,{}):a.jsx(J.PanelRight,{}),a.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});Wc.displayName="SidebarTrigger";const Kc=h.forwardRef(({className:e,...t},n)=>{const{toggleSidebar:r}=Sr();return a.jsx("button",{type:"button",ref:n,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:r,title:"Toggle Sidebar",className:y("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",e),...t})});Kc.displayName="SidebarRail";const li=h.forwardRef(({className:e,...t},n)=>a.jsx("main",{ref:n,className:y("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",e),...t}));li.displayName="SidebarInset";const Jc=h.forwardRef(({className:e,...t},n)=>a.jsx(Pt,{ref:n,"data-sidebar":"input",className:y("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",e),...t}));Jc.displayName="SidebarInput";const Zc=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"header",className:y("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));Zc.displayName="SidebarHeader";const Qc=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"footer",className:y("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));Qc.displayName="SidebarFooter";const ed=h.forwardRef(({className:e,...t},n)=>a.jsx(kr,{ref:n,"data-sidebar":"separator",className:y("tw-mx-2 tw-w-auto tw-bg-sidebar-border",e),...t}));ed.displayName="SidebarSeparator";const ci=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"content",className:y("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",e),...t}));ci.displayName="SidebarContent";const uo=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"group",className:y("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",e),...t}));uo.displayName="SidebarGroup";const po=h.forwardRef(({className:e,asChild:t=!1,...n},r)=>{const o=t?Qt.Slot:"div";return a.jsx(o,{ref:r,"data-sidebar":"group-label",className:y("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",e),...n})});po.displayName="SidebarGroupLabel";const td=h.forwardRef(({className:e,asChild:t=!1,...n},r)=>{const o=t?Qt.Slot:"button";return a.jsx(o,{ref:r,"data-sidebar":"group-action",className:y("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",e),...n})});td.displayName="SidebarGroupAction";const wo=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"group-content",className:y("tw-w-full tw-text-sm",e),...t}));wo.displayName="SidebarGroupContent";const di=h.forwardRef(({className:e,...t},n)=>a.jsx("ul",{ref:n,"data-sidebar":"menu",className:y("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",e),...t}));di.displayName="SidebarMenu";const ui=h.forwardRef(({className:e,...t},n)=>a.jsx("li",{ref:n,"data-sidebar":"menu-item",className:y("tw-group/menu-item tw-relative",e),...t}));ui.displayName="SidebarMenuItem";const nd=_t.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),pi=h.forwardRef(({asChild:e=!1,isActive:t=!1,variant:n="default",size:r="default",tooltip:o,className:s,...i},l)=>{const c=e?Qt.Slot:"button",{state:d}=Sr(),u=a.jsx(c,{ref:l,"data-sidebar":"menu-button","data-size":r,"data-active":t,className:y(nd({variant:n,size:r}),s),...i});return o?(typeof o=="string"&&(o={children:o}),a.jsxs(qc,{children:[a.jsx(Hc,{asChild:!0,children:u}),a.jsx(oi,{side:"right",align:"center",hidden:d!=="collapsed",...o})]})):u});pi.displayName="SidebarMenuButton";const rd=h.forwardRef(({className:e,asChild:t=!1,showOnHover:n=!1,...r},o)=>{const s=t?Qt.Slot:"button";return a.jsx(s,{ref:o,"data-sidebar":"menu-action",className:y("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",n&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",e),...r})});rd.displayName="SidebarMenuAction";const od=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"menu-badge",className:y("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));od.displayName="SidebarMenuBadge";const ad=h.forwardRef(({className:e,showIcon:t=!1,...n},r)=>{const o=h.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return a.jsxs("div",{ref:r,"data-sidebar":"menu-skeleton",className:y("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",e),...n,children:[t&&a.jsx(Oa,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),a.jsx(Oa,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":o}})]})});ad.displayName="SidebarMenuSkeleton";const sd=h.forwardRef(({className:e,...t},n)=>a.jsx("ul",{ref:n,"data-sidebar":"menu-sub",className:y("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));sd.displayName="SidebarMenuSub";const id=h.forwardRef(({...e},t)=>a.jsx("li",{ref:t,...e}));id.displayName="SidebarMenuSubItem";const ld=h.forwardRef(({asChild:e=!1,size:t="md",isActive:n,className:r,...o},s)=>{const i=e?Qt.Slot:"a";return a.jsx(i,{ref:s,"data-sidebar":"menu-sub-button","data-size":t,"data-active":n,className:y("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",t==="sm"&&"tw-text-xs",t==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",r),...o})});ld.displayName="SidebarMenuSubButton";function wi({id:e,extensionLabels:t,projectInfo:n,handleSelectSidebarItem:r,selectedSidebarItem:o,extensionsSidebarGroupLabel:s,projectsSidebarGroupLabel:i,buttonPlaceholderText:l}){const c=h.useCallback((f,w)=>{r(f,w)},[r]),d=h.useCallback(f=>{const w=n.find(b=>b.projectId===f);return w?w.projectName:f},[n]),u=h.useCallback(f=>!o.projectId&&f===o.label,[o]);return a.jsx(ii,{id:e,collapsible:"none",variant:"inset",className:"tw-w-96 tw-gap-2 tw-overflow-y-auto tw-rounded tw-bg-slate-100",children:a.jsxs(ci,{children:[a.jsxs(uo,{children:[a.jsx(po,{className:"tw-text-sm tw-text-gray-400",children:s}),a.jsx(wo,{children:a.jsx(di,{children:t.map(f=>a.jsx(ui,{children:a.jsx(pi,{className:y("tw-rounded tw-py-2 tw-text-sm tw-text-gray-500 hover:tw-bg-white hover:tw-text-gray-900 hover:tw-shadow-sm active:tw-bg-white",{"tw-bg-white tw-text-gray-900 tw-shadow-sm":u(f)}),onClick:()=>c(f),isActive:u(f),children:a.jsx("span",{className:"tw-pl-3",children:f})})},f))})})]}),a.jsxs(uo,{children:[a.jsx(po,{className:"tw-text-sm tw-text-gray-400",children:i}),a.jsx(wo,{className:"tw-pl-3",children:a.jsx(lr,{popoverContentClassName:"tw-z-[1000]",options:n.flatMap(f=>f.projectId),getOptionLabel:f=>d(f),buttonPlaceholder:l,onChange:f=>{const w=d(f);c(w,f)},value:(o==null?void 0:o.projectId)??void 0})})]})]})})}function cd({id:e,extensionLabels:t,projectInfo:n,children:r,handleSelectSidebarItem:o,selectedSidebarItem:s,searchValue:i,onSearch:l,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}){return a.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col tw-p-3",children:[a.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:a.jsx(Lo,{className:"tw-w-9/12",value:i,onSearch:l,placeholder:"Search app settings, extension settings, and project settings"})}),a.jsxs(si,{id:e,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto",children:[a.jsx(wi,{extensionLabels:t,projectInfo:n,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}),a.jsx(li,{className:"tw-overflow-y-auto",children:r})]})]})}const lt="scrBook",dd="scrRef",vt="source",ud="details",pd="Scripture Reference",wd="Scripture Book",fi="Type",fd="Details";function md(e,t){const n=t??!1;return[{accessorFn:r=>`${se.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:lt,header:(e==null?void 0:e.scriptureReferenceColumnName)??pd,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?se.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===lt?K.formatScrRef(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>K.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>K.formatScrRef(r.start),id:dd,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:K.formatScrRef(o.start)},sortingFn:(r,o)=>K.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:vt,header:n?(e==null?void 0:e.typeColumnName)??fi:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:ud,header:(e==null?void 0:e.detailsColumnName)??fd,cell:r=>r.getValue(),enableGrouping:!1}]}const hd=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:t}=e.start;let n=0;return e.end&&({offset:n}=e.end),!e.end||K.compareScrRefs(e.start,e.end)===0?`${K.scrRefToBBBCCCVVV(e.start)}+${t}`:`${K.scrRefToBBBCCCVVV(e.start)}+${t}-${K.scrRefToBBBCCCVVV(e.end)}+${n}`},_a=e=>`${hd({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function gd({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:s,detailsColumnName:i,onRowSelected:l}){const[c,d]=h.useState([]),[u,f]=h.useState([{id:lt,desc:!1}]),[w,b]=h.useState({}),x=h.useMemo(()=>e.flatMap(C=>C.data.map(_=>({..._,source:C.source}))),[e]),m=h.useMemo(()=>md({scriptureReferenceColumnName:r,typeColumnName:s,detailsColumnName:i},n),[r,s,i,n]);h.useEffect(()=>{c.includes(vt)?f([{id:vt,desc:!1},{id:lt,desc:!1}]):f([{id:lt,desc:!1}])},[c]);const g=Ee.useReactTable({data:x,columns:m,state:{grouping:c,sorting:u,rowSelection:w},onGroupingChange:d,onSortingChange:f,onRowSelectionChange:b,getExpandedRowModel:Ee.getExpandedRowModel(),getGroupedRowModel:Ee.getGroupedRowModel(),getCoreRowModel:Ee.getCoreRowModel(),getSortedRowModel:Ee.getSortedRowModel(),getRowId:_a,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});h.useEffect(()=>{if(l){const C=g.getSelectedRowModel().rowsById,_=Object.keys(C);if(_.length===1){const F=x.find($=>_a($)===_[0])||void 0;F&&l(F)}}},[w,x,l,g]);const j=o??wd,S=s??fi,E=[{label:"No Grouping",value:[]},{label:`Group by ${j}`,value:[lt]},{label:`Group by ${S}`,value:[vt]},{label:`Group by ${j} and ${S}`,value:[lt,vt]},{label:`Group by ${S} and ${j}`,value:[vt,lt]}],k=C=>{d(JSON.parse(C))},v=(C,_)=>{!C.getIsGrouped()&&!C.getIsSelected()&&C.getToggleSelectedHandler()(_)},O=(C,_)=>C.getIsGrouped()?"":y("banded-row",_%2===0?"even":"odd"),V=(C,_,F)=>{if(!((C==null?void 0:C.length)===0||_.depth<F.column.getGroupedIndex())){if(_.getIsGrouped())switch(_.depth){case 1:return"tw-ps-4";default:return}switch(_.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return a.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!t&&a.jsxs(St,{value:JSON.stringify(c),onValueChange:C=>{k(C)},children:[a.jsx(ut,{className:"tw-mb-1 tw-mt-2",children:a.jsx(Et,{})}),a.jsx(pt,{position:"item-aligned",children:a.jsx(qs,{children:E.map(C=>a.jsx(De,{value:JSON.stringify(C.value),children:C.label},C.label))})})]}),a.jsxs($n,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[t&&a.jsx(Dn,{children:g.getHeaderGroups().map(C=>a.jsx(nt,{children:C.headers.filter(_=>_.column.columnDef.header).map(_=>a.jsx(Ht,{colSpan:_.colSpan,className:"top-0 tw-sticky",children:_.isPlaceholder?void 0:a.jsxs("div",{children:[_.column.getCanGroup()?a.jsx(pe,{variant:"ghost",title:`Toggle grouping by ${_.column.columnDef.header}`,onClick:_.column.getToggleGroupingHandler(),type:"button",children:_.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Ee.flexRender(_.column.columnDef.header,_.getContext())]})},_.id))},C.id))}),a.jsx(An,{children:g.getRowModel().rows.map((C,_)=>{const F=Ne();return a.jsx(nt,{"data-state":C.getIsSelected()?"selected":"",className:y(O(C,_)),onClick:$=>v(C,$),children:C.getVisibleCells().map($=>{if(!($.getIsPlaceholder()||$.column.columnDef.enableGrouping&&!$.getIsGrouped()&&($.column.columnDef.id!==vt||!n)))return a.jsx(Ct,{className:y($.column.columnDef.id,"tw-p-[1px]",V(c,C,$)),children:$.getIsGrouped()?a.jsxs(pe,{variant:"link",onClick:C.getToggleExpandedHandler(),type:"button",children:[C.getIsExpanded()&&a.jsx(J.ChevronDown,{}),!C.getIsExpanded()&&(F==="ltr"?a.jsx(J.ChevronRight,{}):a.jsx(J.ChevronLeft,{}))," ",Ee.flexRender($.column.columnDef.cell,$.getContext())," (",C.subRows.length,")"]}):Ee.flexRender($.column.columnDef.cell,$.getContext())},$.id)})},C.id)})})]})]})}const Xr={[K.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[K.getLocalizeKeyForScrollGroupId(0)]:"A",[K.getLocalizeKeyForScrollGroupId(1)]:"B",[K.getLocalizeKeyForScrollGroupId(2)]:"C",[K.getLocalizeKeyForScrollGroupId(3)]:"D",[K.getLocalizeKeyForScrollGroupId(4)]:"E",[K.getLocalizeKeyForScrollGroupId(5)]:"F",[K.getLocalizeKeyForScrollGroupId(6)]:"G",[K.getLocalizeKeyForScrollGroupId(7)]:"H",[K.getLocalizeKeyForScrollGroupId(8)]:"I",[K.getLocalizeKeyForScrollGroupId(9)]:"J",[K.getLocalizeKeyForScrollGroupId(10)]:"K",[K.getLocalizeKeyForScrollGroupId(11)]:"L",[K.getLocalizeKeyForScrollGroupId(12)]:"M",[K.getLocalizeKeyForScrollGroupId(13)]:"N",[K.getLocalizeKeyForScrollGroupId(14)]:"O",[K.getLocalizeKeyForScrollGroupId(15)]:"P",[K.getLocalizeKeyForScrollGroupId(16)]:"Q",[K.getLocalizeKeyForScrollGroupId(17)]:"R",[K.getLocalizeKeyForScrollGroupId(18)]:"S",[K.getLocalizeKeyForScrollGroupId(19)]:"T",[K.getLocalizeKeyForScrollGroupId(20)]:"U",[K.getLocalizeKeyForScrollGroupId(21)]:"V",[K.getLocalizeKeyForScrollGroupId(22)]:"W",[K.getLocalizeKeyForScrollGroupId(23)]:"X",[K.getLocalizeKeyForScrollGroupId(24)]:"Y",[K.getLocalizeKeyForScrollGroupId(25)]:"Z"};function bd({availableScrollGroupIds:e,scrollGroupId:t,onChangeScrollGroupId:n,localizedStrings:r={},className:o}){const s={...Xr,...Object.fromEntries(Object.entries(r).map(([l,c])=>[l,l===c&&l in Xr?Xr[l]:c]))},i=Ne();return a.jsxs(St,{value:`${t}`,onValueChange:l=>n(l==="undefined"?void 0:parseInt(l,10)),children:[a.jsx(ut,{className:y("pr-twp tw-w-auto",o),children:a.jsx(Et,{placeholder:s[K.getLocalizeKeyForScrollGroupId(t)]??t})}),a.jsx(pt,{align:i==="rtl"?"end":"start",style:{zIndex:250},children:e.map(l=>a.jsx(De,{value:`${l}`,children:s[K.getLocalizeKeyForScrollGroupId(l)]},`${l}`))})]})}function vd({children:e}){return a.jsx("div",{className:"pr-twp tw-grid",children:e})}function xd({primary:e,secondary:t,children:n,isLoading:r=!1,loadingMessage:o}){return a.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[a.jsxs("div",{children:[a.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:e}),a.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:t})]}),r?a.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):a.jsx("div",{children:n})]})}function yd({primary:e,secondary:t,includeSeparator:n=!1}){return a.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[a.jsxs("div",{children:[a.jsx("h3",{className:"tw-text-lg tw-font-medium",children:e}),a.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:t})]}),n?a.jsx(kr,{}):""]})}function Nd({id:e,className:t,listItems:n,selectedListItems:r,handleSelectListItem:o,createLabel:s}){return a.jsx("div",{id:e,className:t,children:n.map(i=>a.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[a.jsx(Nr,{className:"tw-me-2 tw-align-middle",checked:r.includes(i),onCheckedChange:l=>o(i,l)}),a.jsx(Re,{children:s?s(i):i})]},i))})}function mi(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function jd(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var dn={},Yr={exports:{}},Pa;function kd(){return Pa||(Pa=1,function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}(Yr)),Yr.exports}var Wr={};function Ho(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function R(){return R=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},R.apply(this,arguments)}function Nt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function hi(e){if(!Nt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=hi(e[n])}),t}function rt(e,t,n={clone:!0}){const r=n.clone?R({},e):e;return Nt(e)&&Nt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Nt(t[o])&&o in e&&Nt(e[o])?r[o]=rt(e[o],t[o],n):n.clone?r[o]=Nt(t[o])?hi(t[o]):t[o]:r[o]=t[o])}),r}var Wn={exports:{}},Kn={exports:{}},ie={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ia;function Sd(){if(Ia)return ie;Ia=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,w=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,x=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,g=e?Symbol.for("react.fundamental"):60117,j=e?Symbol.for("react.responder"):60118,S=e?Symbol.for("react.scope"):60119;function E(v){if(typeof v=="object"&&v!==null){var O=v.$$typeof;switch(O){case t:switch(v=v.type,v){case c:case d:case r:case s:case o:case f:return v;default:switch(v=v&&v.$$typeof,v){case l:case u:case x:case b:case i:return v;default:return O}}case n:return O}}}function k(v){return E(v)===d}return ie.AsyncMode=c,ie.ConcurrentMode=d,ie.ContextConsumer=l,ie.ContextProvider=i,ie.Element=t,ie.ForwardRef=u,ie.Fragment=r,ie.Lazy=x,ie.Memo=b,ie.Portal=n,ie.Profiler=s,ie.StrictMode=o,ie.Suspense=f,ie.isAsyncMode=function(v){return k(v)||E(v)===c},ie.isConcurrentMode=k,ie.isContextConsumer=function(v){return E(v)===l},ie.isContextProvider=function(v){return E(v)===i},ie.isElement=function(v){return typeof v=="object"&&v!==null&&v.$$typeof===t},ie.isForwardRef=function(v){return E(v)===u},ie.isFragment=function(v){return E(v)===r},ie.isLazy=function(v){return E(v)===x},ie.isMemo=function(v){return E(v)===b},ie.isPortal=function(v){return E(v)===n},ie.isProfiler=function(v){return E(v)===s},ie.isStrictMode=function(v){return E(v)===o},ie.isSuspense=function(v){return E(v)===f},ie.isValidElementType=function(v){return typeof v=="string"||typeof v=="function"||v===r||v===d||v===s||v===o||v===f||v===w||typeof v=="object"&&v!==null&&(v.$$typeof===x||v.$$typeof===b||v.$$typeof===i||v.$$typeof===l||v.$$typeof===u||v.$$typeof===g||v.$$typeof===j||v.$$typeof===S||v.$$typeof===m)},ie.typeOf=E,ie}var le={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ma;function Ed(){return Ma||(Ma=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,w=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,x=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,g=e?Symbol.for("react.fundamental"):60117,j=e?Symbol.for("react.responder"):60118,S=e?Symbol.for("react.scope"):60119;function E(P){return typeof P=="string"||typeof P=="function"||P===r||P===d||P===s||P===o||P===f||P===w||typeof P=="object"&&P!==null&&(P.$$typeof===x||P.$$typeof===b||P.$$typeof===i||P.$$typeof===l||P.$$typeof===u||P.$$typeof===g||P.$$typeof===j||P.$$typeof===S||P.$$typeof===m)}function k(P){if(typeof P=="object"&&P!==null){var je=P.$$typeof;switch(je){case t:var B=P.type;switch(B){case c:case d:case r:case s:case o:case f:return B;default:var ye=B&&B.$$typeof;switch(ye){case l:case u:case x:case b:case i:return ye;default:return je}}case n:return je}}}var v=c,O=d,V=l,C=i,_=t,F=u,$=r,te=x,Z=b,D=n,I=s,M=o,L=f,H=!1;function oe(P){return H||(H=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),N(P)||k(P)===c}function N(P){return k(P)===d}function T(P){return k(P)===l}function G(P){return k(P)===i}function U(P){return typeof P=="object"&&P!==null&&P.$$typeof===t}function z(P){return k(P)===u}function W(P){return k(P)===r}function X(P){return k(P)===x}function Y(P){return k(P)===b}function q(P){return k(P)===n}function Q(P){return k(P)===s}function ee(P){return k(P)===o}function ue(P){return k(P)===f}le.AsyncMode=v,le.ConcurrentMode=O,le.ContextConsumer=V,le.ContextProvider=C,le.Element=_,le.ForwardRef=F,le.Fragment=$,le.Lazy=te,le.Memo=Z,le.Portal=D,le.Profiler=I,le.StrictMode=M,le.Suspense=L,le.isAsyncMode=oe,le.isConcurrentMode=N,le.isContextConsumer=T,le.isContextProvider=G,le.isElement=U,le.isForwardRef=z,le.isFragment=W,le.isLazy=X,le.isMemo=Y,le.isPortal=q,le.isProfiler=Q,le.isStrictMode=ee,le.isSuspense=ue,le.isValidElementType=E,le.typeOf=k}()),le}var $a;function gi(){return $a||($a=1,process.env.NODE_ENV==="production"?Kn.exports=Sd():Kn.exports=Ed()),Kn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Kr,Da;function Cd(){if(Da)return Kr;Da=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(s){if(s==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(s)}function o(){try{if(!Object.assign)return!1;var s=new String("abc");if(s[5]="de",Object.getOwnPropertyNames(s)[0]==="5")return!1;for(var i={},l=0;l<10;l++)i["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(i).map(function(u){return i[u]});if(c.join("")!=="0123456789")return!1;var d={};return"abcdefghijklmnopqrst".split("").forEach(function(u){d[u]=u}),Object.keys(Object.assign({},d)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Kr=o()?Object.assign:function(s,i){for(var l,c=r(s),d,u=1;u<arguments.length;u++){l=Object(arguments[u]);for(var f in l)t.call(l,f)&&(c[f]=l[f]);if(e){d=e(l);for(var w=0;w<d.length;w++)n.call(l,d[w])&&(c[d[w]]=l[d[w]])}}return c},Kr}var Jr,Aa;function Xo(){if(Aa)return Jr;Aa=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Jr=e,Jr}var Zr,Ba;function bi(){return Ba||(Ba=1,Zr=Function.call.bind(Object.prototype.hasOwnProperty)),Zr}var Qr,za;function Td(){if(za)return Qr;za=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Xo(),n={},r=bi();e=function(s){var i="Warning: "+s;typeof console<"u"&&console.error(i);try{throw new Error(i)}catch{}}}function o(s,i,l,c,d){if(process.env.NODE_ENV!=="production"){for(var u in s)if(r(s,u)){var f;try{if(typeof s[u]!="function"){var w=Error((c||"React class")+": "+l+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof s[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw w.name="Invariant Violation",w}f=s[u](i,u,c,l,null,t)}catch(x){f=x}if(f&&!(f instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+u+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in n)){n[f.message]=!0;var b=d?d():"";e("Failed "+l+" type: "+f.message+(b??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Qr=o,Qr}var eo,Va;function Rd(){if(Va)return eo;Va=1;var e=gi(),t=Cd(),n=Xo(),r=bi(),o=Td(),s=function(){};process.env.NODE_ENV!=="production"&&(s=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function i(){return null}return eo=function(l,c){var d=typeof Symbol=="function"&&Symbol.iterator,u="@@iterator";function f(N){var T=N&&(d&&N[d]||N[u]);if(typeof T=="function")return T}var w="<<anonymous>>",b={array:j("array"),bigint:j("bigint"),bool:j("boolean"),func:j("function"),number:j("number"),object:j("object"),string:j("string"),symbol:j("symbol"),any:S(),arrayOf:E,element:k(),elementType:v(),instanceOf:O,node:F(),objectOf:C,oneOf:V,oneOfType:_,shape:te,exact:Z};function x(N,T){return N===T?N!==0||1/N===1/T:N!==N&&T!==T}function m(N,T){this.message=N,this.data=T&&typeof T=="object"?T:{},this.stack=""}m.prototype=Error.prototype;function g(N){if(process.env.NODE_ENV!=="production")var T={},G=0;function U(W,X,Y,q,Q,ee,ue){if(q=q||w,ee=ee||Y,ue!==n){if(c){var P=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw P.name="Invariant Violation",P}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var je=q+":"+Y;!T[je]&&G<3&&(s("You are manually calling a React.PropTypes validation function for the `"+ee+"` prop on `"+q+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),T[je]=!0,G++)}}return X[Y]==null?W?X[Y]===null?new m("The "+Q+" `"+ee+"` is marked as required "+("in `"+q+"`, but its value is `null`.")):new m("The "+Q+" `"+ee+"` is marked as required in "+("`"+q+"`, but its value is `undefined`.")):null:N(X,Y,q,Q,ee)}var z=U.bind(null,!1);return z.isRequired=U.bind(null,!0),z}function j(N){function T(G,U,z,W,X,Y){var q=G[U],Q=M(q);if(Q!==N){var ee=L(q);return new m("Invalid "+W+" `"+X+"` of type "+("`"+ee+"` supplied to `"+z+"`, expected ")+("`"+N+"`."),{expectedType:N})}return null}return g(T)}function S(){return g(i)}function E(N){function T(G,U,z,W,X){if(typeof N!="function")return new m("Property `"+X+"` of component `"+z+"` has invalid PropType notation inside arrayOf.");var Y=G[U];if(!Array.isArray(Y)){var q=M(Y);return new m("Invalid "+W+" `"+X+"` of type "+("`"+q+"` supplied to `"+z+"`, expected an array."))}for(var Q=0;Q<Y.length;Q++){var ee=N(Y,Q,z,W,X+"["+Q+"]",n);if(ee instanceof Error)return ee}return null}return g(T)}function k(){function N(T,G,U,z,W){var X=T[G];if(!l(X)){var Y=M(X);return new m("Invalid "+z+" `"+W+"` of type "+("`"+Y+"` supplied to `"+U+"`, expected a single ReactElement."))}return null}return g(N)}function v(){function N(T,G,U,z,W){var X=T[G];if(!e.isValidElementType(X)){var Y=M(X);return new m("Invalid "+z+" `"+W+"` of type "+("`"+Y+"` supplied to `"+U+"`, expected a single ReactElement type."))}return null}return g(N)}function O(N){function T(G,U,z,W,X){if(!(G[U]instanceof N)){var Y=N.name||w,q=oe(G[U]);return new m("Invalid "+W+" `"+X+"` of type "+("`"+q+"` supplied to `"+z+"`, expected ")+("instance of `"+Y+"`."))}return null}return g(T)}function V(N){if(!Array.isArray(N))return process.env.NODE_ENV!=="production"&&(arguments.length>1?s("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):s("Invalid argument supplied to oneOf, expected an array.")),i;function T(G,U,z,W,X){for(var Y=G[U],q=0;q<N.length;q++)if(x(Y,N[q]))return null;var Q=JSON.stringify(N,function(ue,P){var je=L(P);return je==="symbol"?String(P):P});return new m("Invalid "+W+" `"+X+"` of value `"+String(Y)+"` "+("supplied to `"+z+"`, expected one of "+Q+"."))}return g(T)}function C(N){function T(G,U,z,W,X){if(typeof N!="function")return new m("Property `"+X+"` of component `"+z+"` has invalid PropType notation inside objectOf.");var Y=G[U],q=M(Y);if(q!=="object")return new m("Invalid "+W+" `"+X+"` of type "+("`"+q+"` supplied to `"+z+"`, expected an object."));for(var Q in Y)if(r(Y,Q)){var ee=N(Y,Q,z,W,X+"."+Q,n);if(ee instanceof Error)return ee}return null}return g(T)}function _(N){if(!Array.isArray(N))return process.env.NODE_ENV!=="production"&&s("Invalid argument supplied to oneOfType, expected an instance of array."),i;for(var T=0;T<N.length;T++){var G=N[T];if(typeof G!="function")return s("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+H(G)+" at index "+T+"."),i}function U(z,W,X,Y,q){for(var Q=[],ee=0;ee<N.length;ee++){var ue=N[ee],P=ue(z,W,X,Y,q,n);if(P==null)return null;P.data&&r(P.data,"expectedType")&&Q.push(P.data.expectedType)}var je=Q.length>0?", expected one of type ["+Q.join(", ")+"]":"";return new m("Invalid "+Y+" `"+q+"` supplied to "+("`"+X+"`"+je+"."))}return g(U)}function F(){function N(T,G,U,z,W){return D(T[G])?null:new m("Invalid "+z+" `"+W+"` supplied to "+("`"+U+"`, expected a ReactNode."))}return g(N)}function $(N,T,G,U,z){return new m((N||"React class")+": "+T+" type `"+G+"."+U+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+z+"`.")}function te(N){function T(G,U,z,W,X){var Y=G[U],q=M(Y);if(q!=="object")return new m("Invalid "+W+" `"+X+"` of type `"+q+"` "+("supplied to `"+z+"`, expected `object`."));for(var Q in N){var ee=N[Q];if(typeof ee!="function")return $(z,W,X,Q,L(ee));var ue=ee(Y,Q,z,W,X+"."+Q,n);if(ue)return ue}return null}return g(T)}function Z(N){function T(G,U,z,W,X){var Y=G[U],q=M(Y);if(q!=="object")return new m("Invalid "+W+" `"+X+"` of type `"+q+"` "+("supplied to `"+z+"`, expected `object`."));var Q=t({},G[U],N);for(var ee in Q){var ue=N[ee];if(r(N,ee)&&typeof ue!="function")return $(z,W,X,ee,L(ue));if(!ue)return new m("Invalid "+W+" `"+X+"` key `"+ee+"` supplied to `"+z+"`.\nBad object: "+JSON.stringify(G[U],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(N),null,"  "));var P=ue(Y,ee,z,W,X+"."+ee,n);if(P)return P}return null}return g(T)}function D(N){switch(typeof N){case"number":case"string":case"undefined":return!0;case"boolean":return!N;case"object":if(Array.isArray(N))return N.every(D);if(N===null||l(N))return!0;var T=f(N);if(T){var G=T.call(N),U;if(T!==N.entries){for(;!(U=G.next()).done;)if(!D(U.value))return!1}else for(;!(U=G.next()).done;){var z=U.value;if(z&&!D(z[1]))return!1}}else return!1;return!0;default:return!1}}function I(N,T){return N==="symbol"?!0:T?T["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&T instanceof Symbol:!1}function M(N){var T=typeof N;return Array.isArray(N)?"array":N instanceof RegExp?"object":I(T,N)?"symbol":T}function L(N){if(typeof N>"u"||N===null)return""+N;var T=M(N);if(T==="object"){if(N instanceof Date)return"date";if(N instanceof RegExp)return"regexp"}return T}function H(N){var T=L(N);switch(T){case"array":case"object":return"an "+T;case"boolean":case"date":case"regexp":return"a "+T;default:return T}}function oe(N){return!N.constructor||!N.constructor.name?w:N.constructor.name}return b.checkPropTypes=o,b.resetWarningCache=o.resetWarningCache,b.PropTypes=b,b},eo}var to,Fa;function Od(){if(Fa)return to;Fa=1;var e=Xo();function t(){}function n(){}return n.resetWarningCache=t,to=function(){function r(i,l,c,d,u,f){if(f!==e){var w=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw w.name="Invariant Violation",w}}r.isRequired=r;function o(){return r}var s={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return s.PropTypes=s,s},to}var La;function _d(){if(La)return Wn.exports;if(La=1,process.env.NODE_ENV!=="production"){var e=gi(),t=!0;Wn.exports=Rd()(e.isElement,t)}else Wn.exports=Od()();return Wn.exports}var Pd=_d();const p=mi(Pd);function Id(e){const{prototype:t={}}=e;return!!t.isReactComponent}function vi(e,t,n,r,o){const s=e[t],i=o||t;if(s==null||typeof window>"u")return null;let l;const c=s.type;return typeof c=="function"&&!Id(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Yo=Ho(p.element,vi);Yo.isRequired=Ho(p.element.isRequired,vi);const Md="exact-prop: ​";function $d(e){return process.env.NODE_ENV==="production"?e:R({},e,{[Md]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Xt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Jn={exports:{}},ce={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ga;function Dd(){if(Ga)return ce;Ga=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),x;x=Symbol.for("react.module.reference");function m(g){if(typeof g=="object"&&g!==null){var j=g.$$typeof;switch(j){case e:switch(g=g.type,g){case n:case o:case r:case d:case u:return g;default:switch(g=g&&g.$$typeof,g){case l:case i:case c:case w:case f:case s:return g;default:return j}}case t:return j}}}return ce.ContextConsumer=i,ce.ContextProvider=s,ce.Element=e,ce.ForwardRef=c,ce.Fragment=n,ce.Lazy=w,ce.Memo=f,ce.Portal=t,ce.Profiler=o,ce.StrictMode=r,ce.Suspense=d,ce.SuspenseList=u,ce.isAsyncMode=function(){return!1},ce.isConcurrentMode=function(){return!1},ce.isContextConsumer=function(g){return m(g)===i},ce.isContextProvider=function(g){return m(g)===s},ce.isElement=function(g){return typeof g=="object"&&g!==null&&g.$$typeof===e},ce.isForwardRef=function(g){return m(g)===c},ce.isFragment=function(g){return m(g)===n},ce.isLazy=function(g){return m(g)===w},ce.isMemo=function(g){return m(g)===f},ce.isPortal=function(g){return m(g)===t},ce.isProfiler=function(g){return m(g)===o},ce.isStrictMode=function(g){return m(g)===r},ce.isSuspense=function(g){return m(g)===d},ce.isSuspenseList=function(g){return m(g)===u},ce.isValidElementType=function(g){return typeof g=="string"||typeof g=="function"||g===n||g===o||g===r||g===d||g===u||g===b||typeof g=="object"&&g!==null&&(g.$$typeof===w||g.$$typeof===f||g.$$typeof===s||g.$$typeof===i||g.$$typeof===c||g.$$typeof===x||g.getModuleId!==void 0)},ce.typeOf=m,ce}var de={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ua;function Ad(){return Ua||(Ua=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),x=!1,m=!1,g=!1,j=!1,S=!1,E;E=Symbol.for("react.module.reference");function k(B){return!!(typeof B=="string"||typeof B=="function"||B===n||B===o||S||B===r||B===d||B===u||j||B===b||x||m||g||typeof B=="object"&&B!==null&&(B.$$typeof===w||B.$$typeof===f||B.$$typeof===s||B.$$typeof===i||B.$$typeof===c||B.$$typeof===E||B.getModuleId!==void 0))}function v(B){if(typeof B=="object"&&B!==null){var ye=B.$$typeof;switch(ye){case e:var qe=B.type;switch(qe){case n:case o:case r:case d:case u:return qe;default:var mt=qe&&qe.$$typeof;switch(mt){case l:case i:case c:case w:case f:case s:return mt;default:return ye}}case t:return ye}}}var O=i,V=s,C=e,_=c,F=n,$=w,te=f,Z=t,D=o,I=r,M=d,L=u,H=!1,oe=!1;function N(B){return H||(H=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function T(B){return oe||(oe=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function G(B){return v(B)===i}function U(B){return v(B)===s}function z(B){return typeof B=="object"&&B!==null&&B.$$typeof===e}function W(B){return v(B)===c}function X(B){return v(B)===n}function Y(B){return v(B)===w}function q(B){return v(B)===f}function Q(B){return v(B)===t}function ee(B){return v(B)===o}function ue(B){return v(B)===r}function P(B){return v(B)===d}function je(B){return v(B)===u}de.ContextConsumer=O,de.ContextProvider=V,de.Element=C,de.ForwardRef=_,de.Fragment=F,de.Lazy=$,de.Memo=te,de.Portal=Z,de.Profiler=D,de.StrictMode=I,de.Suspense=M,de.SuspenseList=L,de.isAsyncMode=N,de.isConcurrentMode=T,de.isContextConsumer=G,de.isContextProvider=U,de.isElement=z,de.isForwardRef=W,de.isFragment=X,de.isLazy=Y,de.isMemo=q,de.isPortal=Q,de.isProfiler=ee,de.isStrictMode=ue,de.isSuspense=P,de.isSuspenseList=je,de.isValidElementType=k,de.typeOf=v}()),de}var qa;function Bd(){return qa||(qa=1,process.env.NODE_ENV==="production"?Jn.exports=Dd():Jn.exports=Ad()),Jn.exports}var Ha=Bd();const zd=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Vd(e){const t=`${e}`.match(zd);return t&&t[1]||""}function xi(e,t=""){return e.displayName||e.name||Vd(e)||t}function Xa(e,t,n){const r=xi(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Fd(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return xi(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Ha.ForwardRef:return Xa(e,e.render,"ForwardRef");case Ha.Memo:return Xa(e,e.type,"memo");default:return}}}function Cn(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=e[t],i=o||t;return s==null?null:s&&s.nodeType!==1?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const yi=p.oneOfType([p.func,p.object]);function Ze(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Xt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Ld(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Gd(e,t=166){let n;function r(...o){const s=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(s,t)}return r.clear=()=>{clearTimeout(n)},r}function Ud(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,s,i)=>{const l=o||"<<anonymous>>",c=i||r;return typeof n[r]<"u"?new Error(`The ${s} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function qd(e,t){var n,r;return A.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function cr(e){return e&&e.ownerDocument||document}function Hd(e){return cr(e).defaultView||window}function Xd(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?R({},t.propTypes):null;return o=>(s,i,l,c,d,...u)=>{const f=d||i,w=n==null?void 0:n[f];if(w){const b=w(s,i,l,c,d,...u);if(b)return b}return typeof s[i]<"u"&&!s[o]?new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function dr(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Yt=typeof window<"u"?A.useLayoutEffect:A.useEffect;let Ya=0;function Yd(e){const[t,n]=A.useState(e),r=e||t;return A.useEffect(()=>{t==null&&(Ya+=1,n(`mui-${Ya}`))},[t]),r}const Wa=A.useId;function Ni(e){if(Wa!==void 0){const t=Wa();return e??t}return Yd(e)}function Wd(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=o||t;return typeof e[t]<"u"?new Error(`The prop \`${s}\` is not supported. Please remove it.`):null}function ji({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=A.useRef(e!==void 0),[s,i]=A.useState(t),l=o?e:s;if(process.env.NODE_ENV!=="production"){A.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:d}=A.useRef(t);A.useEffect(()=>{!o&&d!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=A.useCallback(d=>{o||i(d)},[]);return[l,c]}function fo(e){const t=A.useRef(e);return Yt(()=>{t.current=e}),A.useRef((...n)=>(0,t.current)(...n)).current}function Tt(...e){return A.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{dr(n,t)})},e)}const Ka={};function Kd(e,t){const n=A.useRef(Ka);return n.current===Ka&&(n.current=e(t)),n}const Jd=[];function Zd(e){A.useEffect(e,Jd)}class Bn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Bn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function hn(){const e=Kd(Bn.create).current;return Zd(e.disposeEffect),e}let Er=!0,mo=!1;const Qd=new Bn,eu={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function tu(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&eu[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function nu(e){e.metaKey||e.altKey||e.ctrlKey||(Er=!0)}function no(){Er=!1}function ru(){this.visibilityState==="hidden"&&mo&&(Er=!0)}function ou(e){e.addEventListener("keydown",nu,!0),e.addEventListener("mousedown",no,!0),e.addEventListener("pointerdown",no,!0),e.addEventListener("touchstart",no,!0),e.addEventListener("visibilitychange",ru,!0)}function au(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Er||tu(t)}function ki(){const e=A.useCallback(o=>{o!=null&&ou(o.ownerDocument)},[]),t=A.useRef(!1);function n(){return t.current?(mo=!0,Qd.start(100,()=>{mo=!1}),t.current=!1,!0):!1}function r(o){return au(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Si(e,t){const n=R({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=R({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},s=t[r];n[r]={},!s||!Object.keys(s)?n[r]=o:!o||!Object.keys(o)?n[r]=s:(n[r]=R({},s),Object.keys(o).forEach(i=>{n[r][i]=Si(o[i],s[i])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function Wo(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((s,i)=>{if(i){const l=t(i);l!==""&&s.push(l),n&&n[i]&&s.push(n[i])}return s},[]).join(" ")}),r}const Ja=e=>e,su=()=>{let e=Ja;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Ja}}},Ei=su(),Ci={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Cr(e,t,n="Mui"){const r=Ci[t];return r?`${n}-${r}`:`${Ei.generate(e)}-${t}`}function Ti(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=Cr(e,o,n)}),r}function iu(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function ke(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,s;for(s=0;s<r.length;s++)o=r[s],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}const lu=["values","unit","step"],cu=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>R({},n,{[r.key]:r.val}),{})};function du(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=ke(e,lu),s=cu(t),i=Object.keys(s);function l(w){return`@media (min-width:${typeof t[w]=="number"?t[w]:w}${n})`}function c(w){return`@media (max-width:${(typeof t[w]=="number"?t[w]:w)-r/100}${n})`}function d(w,b){const x=i.indexOf(b);return`@media (min-width:${typeof t[w]=="number"?t[w]:w}${n}) and (max-width:${(x!==-1&&typeof t[i[x]]=="number"?t[i[x]]:b)-r/100}${n})`}function u(w){return i.indexOf(w)+1<i.length?d(w,i[i.indexOf(w)+1]):l(w)}function f(w){const b=i.indexOf(w);return b===0?l(i[1]):b===i.length-1?c(i[b]):d(w,i[i.indexOf(w)+1]).replace("@media","@media not all and")}return R({keys:i,values:s,up:l,down:c,between:d,only:u,not:f,unit:n},o)}const uu={borderRadius:4},wt=process.env.NODE_ENV!=="production"?p.oneOfType([p.number,p.string,p.object,p.array]):{};function Nn(e,t){return t?rt(e,t,{clone:!1}):e}const Ko={xs:0,sm:600,md:900,lg:1200,xl:1536},Za={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Ko[e]}px)`};function ot(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const s=r.breakpoints||Za;return t.reduce((i,l,c)=>(i[s.up(s.keys[c])]=n(t[c]),i),{})}if(typeof t=="object"){const s=r.breakpoints||Za;return Object.keys(t).reduce((i,l)=>{if(Object.keys(s.values||Ko).indexOf(l)!==-1){const c=s.up(l);i[c]=n(t[l],l)}else{const c=l;i[c]=t[c]}return i},{})}return n(t)}function pu(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const s=e.up(o);return r[s]={},r},{}))||{}}function wu(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Tr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,s)=>o&&o[s]?o[s]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function ur(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Tr(e,n)||r,t&&(o=t(o,r,e)),o}function xe(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,s=i=>{if(i[t]==null)return null;const l=i[t],c=i.theme,d=Tr(c,r)||{};return ot(i,l,f=>{let w=ur(d,o,f);return f===w&&typeof f=="string"&&(w=ur(d,o,`${t}${f==="default"?"":Ze(f)}`,f)),n===!1?w:{[n]:w}})};return s.propTypes=process.env.NODE_ENV!=="production"?{[t]:wt}:{},s.filterProps=[t],s}function fu(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const mu={m:"margin",p:"padding"},hu={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Qa={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},gu=fu(e=>{if(e.length>2)if(Qa[e])e=Qa[e];else return[e];const[t,n]=e.split(""),r=mu[t],o=hu[n]||"";return Array.isArray(o)?o.map(s=>r+s):[r+o]}),Rr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Or=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],bu=[...Rr,...Or];function zn(e,t,n,r){var o;const s=(o=Tr(e,t,!1))!=null?o:n;return typeof s=="number"?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&typeof i!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`),s*i):Array.isArray(s)?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&(Number.isInteger(i)?i>s.length-1&&console.error([`MUI: The value provided (${i}) overflows.`,`The supported values are: ${JSON.stringify(s)}.`,`${i} > ${s.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),s[i]):typeof s=="function"?s:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${s}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Ri(e){return zn(e,"spacing",8,"spacing")}function Vn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function vu(e,t){return n=>e.reduce((r,o)=>(r[o]=Vn(t,n),r),{})}function xu(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=gu(n),s=vu(o,r),i=e[n];return ot(e,i,s)}function Oi(e,t){const n=Ri(e.theme);return Object.keys(e).map(r=>xu(e,t,r,n)).reduce(Nn,{})}function ge(e){return Oi(e,Rr)}ge.propTypes=process.env.NODE_ENV!=="production"?Rr.reduce((e,t)=>(e[t]=wt,e),{}):{};ge.filterProps=Rr;function be(e){return Oi(e,Or)}be.propTypes=process.env.NODE_ENV!=="production"?Or.reduce((e,t)=>(e[t]=wt,e),{}):{};be.filterProps=Or;process.env.NODE_ENV!=="production"&&bu.reduce((e,t)=>(e[t]=wt,e),{});function yu(e=8){if(e.mui)return e;const t=Ri({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(s=>{const i=t(s);return typeof i=="number"?`${i}px`:i}).join(" "));return n.mui=!0,n}function _r(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(s=>{r[s]=o}),r),{}),n=r=>Object.keys(r).reduce((o,s)=>t[s]?Nn(o,t[s](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Ve(e){return typeof e!="number"?e:`${e}px solid`}function Ue(e,t){return xe({prop:e,themeKey:"borders",transform:t})}const Nu=Ue("border",Ve),ju=Ue("borderTop",Ve),ku=Ue("borderRight",Ve),Su=Ue("borderBottom",Ve),Eu=Ue("borderLeft",Ve),Cu=Ue("borderColor"),Tu=Ue("borderTopColor"),Ru=Ue("borderRightColor"),Ou=Ue("borderBottomColor"),_u=Ue("borderLeftColor"),Pu=Ue("outline",Ve),Iu=Ue("outlineColor"),Pr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=zn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:Vn(t,r)});return ot(e,e.borderRadius,n)}return null};Pr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:wt}:{};Pr.filterProps=["borderRadius"];_r(Nu,ju,ku,Su,Eu,Cu,Tu,Ru,Ou,_u,Pr,Pu,Iu);const Ir=e=>{if(e.gap!==void 0&&e.gap!==null){const t=zn(e.theme,"spacing",8,"gap"),n=r=>({gap:Vn(t,r)});return ot(e,e.gap,n)}return null};Ir.propTypes=process.env.NODE_ENV!=="production"?{gap:wt}:{};Ir.filterProps=["gap"];const Mr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=zn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:Vn(t,r)});return ot(e,e.columnGap,n)}return null};Mr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:wt}:{};Mr.filterProps=["columnGap"];const $r=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=zn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:Vn(t,r)});return ot(e,e.rowGap,n)}return null};$r.propTypes=process.env.NODE_ENV!=="production"?{rowGap:wt}:{};$r.filterProps=["rowGap"];const Mu=xe({prop:"gridColumn"}),$u=xe({prop:"gridRow"}),Du=xe({prop:"gridAutoFlow"}),Au=xe({prop:"gridAutoColumns"}),Bu=xe({prop:"gridAutoRows"}),zu=xe({prop:"gridTemplateColumns"}),Vu=xe({prop:"gridTemplateRows"}),Fu=xe({prop:"gridTemplateAreas"}),Lu=xe({prop:"gridArea"});_r(Ir,Mr,$r,Mu,$u,Du,Au,Bu,zu,Vu,Fu,Lu);function qt(e,t){return t==="grey"?t:e}const Gu=xe({prop:"color",themeKey:"palette",transform:qt}),Uu=xe({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:qt}),qu=xe({prop:"backgroundColor",themeKey:"palette",transform:qt});_r(Gu,Uu,qu);function Ae(e){return e<=1&&e!==0?`${e*100}%`:e}const Hu=xe({prop:"width",transform:Ae}),Jo=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const s=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Ko[n];return s?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${s}${e.theme.breakpoints.unit}`}:{maxWidth:s}:{maxWidth:Ae(n)}};return ot(e,e.maxWidth,t)}return null};Jo.filterProps=["maxWidth"];const Xu=xe({prop:"minWidth",transform:Ae}),Yu=xe({prop:"height",transform:Ae}),Wu=xe({prop:"maxHeight",transform:Ae}),Ku=xe({prop:"minHeight",transform:Ae});xe({prop:"size",cssProperty:"width",transform:Ae});xe({prop:"size",cssProperty:"height",transform:Ae});const Ju=xe({prop:"boxSizing"});_r(Hu,Jo,Xu,Yu,Wu,Ku,Ju);const Zo={border:{themeKey:"borders",transform:Ve},borderTop:{themeKey:"borders",transform:Ve},borderRight:{themeKey:"borders",transform:Ve},borderBottom:{themeKey:"borders",transform:Ve},borderLeft:{themeKey:"borders",transform:Ve},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Ve},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Pr},color:{themeKey:"palette",transform:qt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:qt},backgroundColor:{themeKey:"palette",transform:qt},p:{style:be},pt:{style:be},pr:{style:be},pb:{style:be},pl:{style:be},px:{style:be},py:{style:be},padding:{style:be},paddingTop:{style:be},paddingRight:{style:be},paddingBottom:{style:be},paddingLeft:{style:be},paddingX:{style:be},paddingY:{style:be},paddingInline:{style:be},paddingInlineStart:{style:be},paddingInlineEnd:{style:be},paddingBlock:{style:be},paddingBlockStart:{style:be},paddingBlockEnd:{style:be},m:{style:ge},mt:{style:ge},mr:{style:ge},mb:{style:ge},ml:{style:ge},mx:{style:ge},my:{style:ge},margin:{style:ge},marginTop:{style:ge},marginRight:{style:ge},marginBottom:{style:ge},marginLeft:{style:ge},marginX:{style:ge},marginY:{style:ge},marginInline:{style:ge},marginInlineStart:{style:ge},marginInlineEnd:{style:ge},marginBlock:{style:ge},marginBlockStart:{style:ge},marginBlockEnd:{style:ge},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Ir},rowGap:{style:$r},columnGap:{style:Mr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ae},maxWidth:{style:Jo},minWidth:{transform:Ae},height:{transform:Ae},maxHeight:{transform:Ae},minHeight:{transform:Ae},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}};function Zu(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Qu(e,t){return typeof e=="function"?e(t):e}function ep(){function e(n,r,o,s){const i={[n]:r,theme:o},l=s[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:d,transform:u,style:f}=l;if(r==null)return null;if(d==="typography"&&r==="inherit")return{[n]:r};const w=Tr(o,d)||{};return f?f(i):ot(i,r,x=>{let m=ur(w,u,x);return x===m&&typeof x=="string"&&(m=ur(w,u,`${n}${x==="default"?"":Ze(x)}`,x)),c===!1?m:{[c]:m}})}function t(n){var r;const{sx:o,theme:s={}}=n||{};if(!o)return null;const i=(r=s.unstable_sxConfig)!=null?r:Zo;function l(c){let d=c;if(typeof c=="function")d=c(s);else if(typeof c!="object")return c;if(!d)return null;const u=pu(s.breakpoints),f=Object.keys(u);let w=u;return Object.keys(d).forEach(b=>{const x=Qu(d[b],s);if(x!=null)if(typeof x=="object")if(i[b])w=Nn(w,e(b,x,s,i));else{const m=ot({theme:s},x,g=>({[b]:g}));Zu(m,x)?w[b]=t({sx:x,theme:s}):w=Nn(w,m)}else w=Nn(w,e(b,x,s,i))}),wu(f,w)}return Array.isArray(o)?o.map(l):l(o)}return t}const Dr=ep();Dr.filterProps=["sx"];function tp(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const np=["breakpoints","palette","spacing","shape"];function Qo(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:s={}}=e,i=ke(e,np),l=du(n),c=yu(o);let d=rt({breakpoints:l,direction:"ltr",components:{},palette:R({mode:"light"},r),spacing:c,shape:R({},uu,s)},i);return d.applyStyles=tp,d=t.reduce((u,f)=>rt(u,f),d),d.unstable_sxConfig=R({},Zo,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(f){return Dr({sx:f,theme:this})},d}function rp(e){return Object.keys(e).length===0}function _i(e=null){const t=A.useContext(so.ThemeContext);return!t||rp(t)?e:t}const op=Qo();function Pi(e=op){return _i(e)}const ap=["ownerState"],sp=["variants"],ip=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function lp(e){return Object.keys(e).length===0}function cp(e){return typeof e=="string"&&e.charCodeAt(0)>96}function rr(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const dp=Qo(),es=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Zn({defaultTheme:e,theme:t,themeId:n}){return lp(t)?e:t[n]||t}function up(e){return e?(t,n)=>n[e]:null}function or(e,t){let{ownerState:n}=t,r=ke(t,ap);const o=typeof e=="function"?e(R({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(s=>or(s,R({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:s=[]}=o;let l=ke(o,sp);return s.forEach(c=>{let d=!0;typeof c.props=="function"?d=c.props(R({ownerState:n},r,n)):Object.keys(c.props).forEach(u=>{(n==null?void 0:n[u])!==c.props[u]&&r[u]!==c.props[u]&&(d=!1)}),d&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(R({ownerState:n},r,n)):c.style))}),l}return o}function pp(e={}){const{themeId:t,defaultTheme:n=dp,rootShouldForwardProp:r=rr,slotShouldForwardProp:o=rr}=e,s=i=>Dr(R({},i,{theme:Zn(R({},i,{defaultTheme:n,themeId:t}))}));return s.__mui_systemSx=!0,(i,l={})=>{so.internal_processStyles(i,v=>v.filter(O=>!(O!=null&&O.__mui_systemSx)));const{name:c,slot:d,skipVariantsResolver:u,skipSx:f,overridesResolver:w=up(es(d))}=l,b=ke(l,ip),x=u!==void 0?u:d&&d!=="Root"&&d!=="root"||!1,m=f||!1;let g;process.env.NODE_ENV!=="production"&&c&&(g=`${c}-${es(d||"Root")}`);let j=rr;d==="Root"||d==="root"?j=r:d?j=o:cp(i)&&(j=void 0);const S=so(i,R({shouldForwardProp:j,label:g},b)),E=v=>typeof v=="function"&&v.__emotion_real!==v||Nt(v)?O=>or(v,R({},O,{theme:Zn({theme:O.theme,defaultTheme:n,themeId:t})})):v,k=(v,...O)=>{let V=E(v);const C=O?O.map(E):[];c&&w&&C.push($=>{const te=Zn(R({},$,{defaultTheme:n,themeId:t}));if(!te.components||!te.components[c]||!te.components[c].styleOverrides)return null;const Z=te.components[c].styleOverrides,D={};return Object.entries(Z).forEach(([I,M])=>{D[I]=or(M,R({},$,{theme:te}))}),w($,D)}),c&&!x&&C.push($=>{var te;const Z=Zn(R({},$,{defaultTheme:n,themeId:t})),D=Z==null||(te=Z.components)==null||(te=te[c])==null?void 0:te.variants;return or({variants:D},R({},$,{theme:Z}))}),m||C.push(s);const _=C.length-O.length;if(Array.isArray(v)&&_>0){const $=new Array(_).fill("");V=[...v,...$],V.raw=[...v.raw,...$]}const F=S(V,...C);if(process.env.NODE_ENV!=="production"){let $;c&&($=`${c}${Ze(d||"")}`),$===void 0&&($=`Styled(${Fd(i)})`),F.displayName=$}return i.muiName&&(F.muiName=i.muiName),F};return S.withConfig&&(k.withConfig=S.withConfig),k}}function wp(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:Si(t.components[n].defaultProps,r)}function fp({props:e,name:t,defaultTheme:n,themeId:r}){let o=Pi(n);return o=o[r]||o,wp({theme:o,name:t,props:e})}function ea(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),iu(e,t,n)}function mp(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Rt(e){if(e.type)return e;if(e.charAt(0)==="#")return Rt(mp(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Xt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Xt(10,o))}else r=r.split(",");return r=r.map(s=>parseFloat(s)),{type:n,values:r,colorSpace:o}}function Ar(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,s)=>s<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function hp(e){e=Rt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,s=r*Math.min(o,1-o),i=(d,u=(d+n/30)%12)=>o-s*Math.max(Math.min(u-3,9-u,1),-1);let l="rgb";const c=[Math.round(i(0)*255),Math.round(i(8)*255),Math.round(i(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),Ar({type:l,values:c})}function ts(e){e=Rt(e);let t=e.type==="hsl"||e.type==="hsla"?Rt(hp(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function ns(e,t){const n=ts(e),r=ts(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function Ii(e,t){return e=Rt(e),t=ea(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Ar(e)}function gp(e,t){if(e=Rt(e),t=ea(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return Ar(e)}function bp(e,t){if(e=Rt(e),t=ea(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return Ar(e)}function vp(e,t){return R({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const Tn={black:"#000",white:"#fff"},xp={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Bt={50:"#f3e5f5",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",700:"#7b1fa2"},zt={300:"#e57373",400:"#ef5350",500:"#f44336",700:"#d32f2f",800:"#c62828"},un={300:"#ffb74d",400:"#ffa726",500:"#ff9800",700:"#f57c00",900:"#e65100"},Vt={50:"#e3f2fd",200:"#90caf9",400:"#42a5f5",700:"#1976d2",800:"#1565c0"},Ft={300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",700:"#0288d1",900:"#01579b"},Lt={300:"#81c784",400:"#66bb6a",500:"#4caf50",700:"#388e3c",800:"#2e7d32",900:"#1b5e20"},yp=["mode","contrastThreshold","tonalOffset"],rs={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Tn.white,default:Tn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},ro={text:{primary:Tn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Tn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function os(e,t,n,r){const o=r.light||r,s=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=bp(e.main,o):t==="dark"&&(e.dark=gp(e.main,s)))}function Np(e="light"){return e==="dark"?{main:Vt[200],light:Vt[50],dark:Vt[400]}:{main:Vt[700],light:Vt[400],dark:Vt[800]}}function jp(e="light"){return e==="dark"?{main:Bt[200],light:Bt[50],dark:Bt[400]}:{main:Bt[500],light:Bt[300],dark:Bt[700]}}function kp(e="light"){return e==="dark"?{main:zt[500],light:zt[300],dark:zt[700]}:{main:zt[700],light:zt[400],dark:zt[800]}}function Sp(e="light"){return e==="dark"?{main:Ft[400],light:Ft[300],dark:Ft[700]}:{main:Ft[700],light:Ft[500],dark:Ft[900]}}function Ep(e="light"){return e==="dark"?{main:Lt[400],light:Lt[300],dark:Lt[700]}:{main:Lt[800],light:Lt[500],dark:Lt[900]}}function Cp(e="light"){return e==="dark"?{main:un[400],light:un[300],dark:un[700]}:{main:"#ed6c02",light:un[500],dark:un[900]}}function Tp(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=ke(e,yp),s=e.primary||Np(t),i=e.secondary||jp(t),l=e.error||kp(t),c=e.info||Sp(t),d=e.success||Ep(t),u=e.warning||Cp(t);function f(m){const g=ns(m,ro.text.primary)>=n?ro.text.primary:rs.text.primary;if(process.env.NODE_ENV!=="production"){const j=ns(m,g);j<3&&console.error([`MUI: The contrast ratio of ${j}:1 for ${g} on ${m}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return g}const w=({color:m,name:g,mainShade:j=500,lightShade:S=300,darkShade:E=700})=>{if(m=R({},m),!m.main&&m[j]&&(m.main=m[j]),!m.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${g?` (${g})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${j}\` property.`:Xt(11,g?` (${g})`:"",j));if(typeof m.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${g?` (${g})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Xt(12,g?` (${g})`:"",JSON.stringify(m.main)));return os(m,"light",S,r),os(m,"dark",E,r),m.contrastText||(m.contrastText=f(m.main)),m},b={dark:ro,light:rs};return process.env.NODE_ENV!=="production"&&(b[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),rt(R({common:R({},Tn),mode:t,primary:w({color:s,name:"primary"}),secondary:w({color:i,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:w({color:l,name:"error"}),warning:w({color:u,name:"warning"}),info:w({color:c,name:"info"}),success:w({color:d,name:"success"}),grey:xp,contrastThreshold:n,getContrastText:f,augmentColor:w,tonalOffset:r},b[t]),o)}const Rp=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Op(e){return Math.round(e*1e5)/1e5}const as={textTransform:"uppercase"},ss='"Roboto", "Helvetica", "Arial", sans-serif';function _p(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=ss,fontSize:o=14,fontWeightLight:s=300,fontWeightRegular:i=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:d=16,allVariants:u,pxToRem:f}=n,w=ke(n,Rp);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof d!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const b=o/14,x=f||(j=>`${j/d*b}rem`),m=(j,S,E,k,v)=>R({fontFamily:r,fontWeight:j,fontSize:x(S),lineHeight:E},r===ss?{letterSpacing:`${Op(k/S)}em`}:{},v,u),g={h1:m(s,96,1.167,-1.5),h2:m(s,60,1.2,-.5),h3:m(i,48,1.167,0),h4:m(i,34,1.235,.25),h5:m(i,24,1.334,0),h6:m(l,20,1.6,.15),subtitle1:m(i,16,1.75,.15),subtitle2:m(l,14,1.57,.1),body1:m(i,16,1.5,.15),body2:m(i,14,1.43,.15),button:m(l,14,1.75,.4,as),caption:m(i,12,1.66,.4),overline:m(i,12,2.66,1,as),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return rt(R({htmlFontSize:d,pxToRem:x,fontFamily:r,fontSize:o,fontWeightLight:s,fontWeightRegular:i,fontWeightMedium:l,fontWeightBold:c},g),w,{clone:!1})}const Pp=.2,Ip=.14,Mp=.12;function me(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Pp})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Ip})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Mp})`].join(",")}const $p=["none",me(0,2,1,-1,0,1,1,0,0,1,3,0),me(0,3,1,-2,0,2,2,0,0,1,5,0),me(0,3,3,-2,0,3,4,0,0,1,8,0),me(0,2,4,-1,0,4,5,0,0,1,10,0),me(0,3,5,-1,0,5,8,0,0,1,14,0),me(0,3,5,-1,0,6,10,0,0,1,18,0),me(0,4,5,-2,0,7,10,1,0,2,16,1),me(0,5,5,-3,0,8,10,1,0,3,14,2),me(0,5,6,-3,0,9,12,1,0,3,16,2),me(0,6,6,-3,0,10,14,1,0,4,18,3),me(0,6,7,-4,0,11,15,1,0,4,20,3),me(0,7,8,-4,0,12,17,2,0,5,22,4),me(0,7,8,-4,0,13,19,2,0,5,24,4),me(0,7,9,-4,0,14,21,2,0,5,26,4),me(0,8,9,-5,0,15,22,2,0,6,28,5),me(0,8,10,-5,0,16,24,2,0,6,30,5),me(0,8,11,-5,0,17,26,2,0,6,32,5),me(0,9,11,-5,0,18,28,2,0,7,34,6),me(0,9,12,-6,0,19,29,2,0,7,36,6),me(0,10,13,-6,0,20,31,3,0,8,38,7),me(0,10,13,-6,0,21,33,3,0,8,40,7),me(0,10,14,-6,0,22,35,3,0,8,42,7),me(0,11,14,-7,0,23,36,3,0,9,44,8),me(0,11,15,-7,0,24,38,3,0,9,46,8)],Dp=["duration","easing","delay"],Ap={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Bp={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function is(e){return`${Math.round(e)}ms`}function zp(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Vp(e){const t=R({},Ap,e.easing),n=R({},Bp,e.duration);return R({getAutoHeightDuration:zp,create:(o=["all"],s={})=>{const{duration:i=n.standard,easing:l=t.easeInOut,delay:c=0}=s,d=ke(s,Dp);if(process.env.NODE_ENV!=="production"){const u=w=>typeof w=="string",f=w=>!isNaN(parseFloat(w));!u(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!f(i)&&!u(i)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`),u(l)||console.error('MUI: Argument "easing" must be a string.'),!f(c)&&!u(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof s!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(d).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(u=>`${u} ${typeof i=="string"?i:is(i)} ${l} ${typeof c=="string"?c:is(c)}`).join(",")}},e,{easing:t,duration:n})}const Fp={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Lp=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Gp(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:s={}}=e,i=ke(e,Lp);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Xt(18));const l=Tp(r),c=Qo(e);let d=rt(c,{mixins:vp(c.breakpoints,n),palette:l,shadows:$p.slice(),typography:_p(l,s),transitions:Vp(o),zIndex:R({},Fp)});if(d=rt(d,i),d=t.reduce((u,f)=>rt(u,f),d),process.env.NODE_ENV!=="production"){const u=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],f=(w,b)=>{let x;for(x in w){const m=w[x];if(u.indexOf(x)!==-1&&Object.keys(m).length>0){if(process.env.NODE_ENV!=="production"){const g=Cr("",x);console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${x}\` internal state.`,"You can not override it like this: ",JSON.stringify(w,null,2),"",`Instead, you need to use the '&.${g}' syntax:`,JSON.stringify({root:{[`&.${g}`]:m}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}w[x]={}}}};Object.keys(d.components).forEach(w=>{const b=d.components[w].styleOverrides;b&&w.indexOf("Mui")===0&&f(b,w)})}return d.unstable_sxConfig=R({},Zo,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(f){return Dr({sx:f,theme:this})},d}const ta=Gp(),na="$$material";function ra({props:e,name:t}){return fp({props:e,name:t,defaultTheme:ta,themeId:na})}const Up=e=>rr(e)&&e!=="classes",Fn=pp({themeId:na,defaultTheme:ta,rootShouldForwardProp:Up});function qp(e){return Cr("MuiSvgIcon",e)}Ti("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Hp=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Xp=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Ze(t)}`,`fontSize${Ze(n)}`]};return Wo(o,qp,r)},Yp=Fn("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Ze(n.color)}`],t[`fontSize${Ze(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,s,i,l,c,d,u,f,w,b,x;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((s=e.typography)==null||(i=s.pxToRem)==null?void 0:i.call(s,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((d=e.typography)==null||(u=d.pxToRem)==null?void 0:u.call(d,35))||"2.1875rem"}[t.fontSize],color:(f=(w=(e.vars||e).palette)==null||(w=w[t.color])==null?void 0:w.main)!=null?f:{action:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.active,disabled:(x=(e.vars||e).palette)==null||(x=x.action)==null?void 0:x.disabled,inherit:void 0}[t.color]}}),pr=A.forwardRef(function(t,n){const r=ra({props:t,name:"MuiSvgIcon"}),{children:o,className:s,color:i="inherit",component:l="svg",fontSize:c="medium",htmlColor:d,inheritViewBox:u=!1,titleAccess:f,viewBox:w="0 0 24 24"}=r,b=ke(r,Hp),x=A.isValidElement(o)&&o.type==="svg",m=R({},r,{color:i,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:u,viewBox:w,hasSvgAsChild:x}),g={};u||(g.viewBox=w);const j=Xp(m);return a.jsxs(Yp,R({as:l,className:ct(j.root,s),focusable:"false",color:d,"aria-hidden":f?void 0:!0,role:f?"img":void 0,ref:n},g,b,x&&o.props,{ownerState:m,children:[x?o.props.children:o,f?a.jsx("title",{children:f}):null]}))});process.env.NODE_ENV!=="production"&&(pr.propTypes={children:p.node,classes:p.object,className:p.string,color:p.oneOfType([p.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),p.string]),component:p.elementType,fontSize:p.oneOfType([p.oneOf(["inherit","large","medium","small"]),p.string]),htmlColor:p.string,inheritViewBox:p.bool,shapeRendering:p.string,sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),titleAccess:p.string,viewBox:p.string});pr.muiName="SvgIcon";function Mi(e,t){function n(r,o){return a.jsx(pr,R({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=pr.muiName,A.memo(A.forwardRef(n))}const Wp={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Ei.configure(e)}},Kp=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Ze,createChainedFunction:Ld,createSvgIcon:Mi,debounce:Gd,deprecatedPropType:Ud,isMuiElement:qd,ownerDocument:cr,ownerWindow:Hd,requirePropFactory:Xd,setRef:dr,unstable_ClassNameGenerator:Wp,unstable_useEnhancedEffect:Yt,unstable_useId:Ni,unsupportedProp:Wd,useControlled:ji,useEventCallback:fo,useForkRef:Tt,useIsFocusVisible:ki},Symbol.toStringTag,{value:"Module"})),Jp=jd(Kp);var ls;function Zp(){return ls||(ls=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Jp}(Wr)),Wr}var cs;function Qp(){if(cs)return dn;cs=1;var e=kd();Object.defineProperty(dn,"__esModule",{value:!0}),dn.default=void 0;var t=e(Zp()),n=a;return dn.default=(0,t.default)((0,n.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight"),dn}var ew=Qp();const tw=mi(ew);function nw(e){return typeof e=="string"}function gn(e,t,n){return e===void 0||nw(e)?t:R({},t,{ownerState:R({},t.ownerState,n)})}const rw={disableDefaultClasses:!1},ow=A.createContext(rw);function aw(e){const{disableDefaultClasses:t}=A.useContext(ow);return n=>t?"":e(n)}function sw(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function iw(e,t,n){return typeof e=="function"?e(t,n):e}function ds(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function lw(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:s}=e;if(!t){const b=ct(n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),x=R({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),m=R({},n,o,r);return b.length>0&&(m.className=b),Object.keys(x).length>0&&(m.style=x),{props:m,internalRef:void 0}}const i=sw(R({},o,r)),l=ds(r),c=ds(o),d=t(i),u=ct(d==null?void 0:d.className,n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),f=R({},d==null?void 0:d.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),w=R({},d,n,c,l);return u.length>0&&(w.className=u),Object.keys(f).length>0&&(w.style=f),{props:w,internalRef:d.ref}}const cw=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function dw(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:s=!1}=e,i=ke(e,cw),l=s?{}:iw(r,o),{props:c,internalRef:d}=lw(R({},i,{externalSlotProps:l})),u=Tt(d,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return gn(n,R({},c,{ref:u}),o)}const $i="base";function uw(e){return`${$i}--${e}`}function pw(e,t){return`${$i}-${e}-${t}`}function ww(e,t){const n=Ci[t];return n?uw(n):pw(e,t)}function fw(e){return typeof e=="function"?e():e}const wr=A.forwardRef(function(t,n){const{children:r,container:o,disablePortal:s=!1}=t,[i,l]=A.useState(null),c=Tt(A.isValidElement(r)?r.ref:null,n);if(Yt(()=>{s||l(fw(o)||document.body)},[o,s]),Yt(()=>{if(i&&!s)return dr(n,i),()=>{dr(n,null)}},[n,i,s]),s){if(A.isValidElement(r)){const d={ref:c};return A.cloneElement(r,d)}return a.jsx(A.Fragment,{children:r})}return a.jsx(A.Fragment,{children:i&&Yl.createPortal(r,i)})});process.env.NODE_ENV!=="production"&&(wr.propTypes={children:p.node,container:p.oneOfType([Cn,p.func]),disablePortal:p.bool});process.env.NODE_ENV!=="production"&&(wr.propTypes=$d(wr.propTypes));var Oe="top",Le="bottom",Ge="right",_e="left",oa="auto",Ln=[Oe,Le,Ge,_e],Wt="start",Rn="end",mw="clippingParents",Di="viewport",pn="popper",hw="reference",us=Ln.reduce(function(e,t){return e.concat([t+"-"+Wt,t+"-"+Rn])},[]),Ai=[].concat(Ln,[oa]).reduce(function(e,t){return e.concat([t,t+"-"+Wt,t+"-"+Rn])},[]),gw="beforeRead",bw="read",vw="afterRead",xw="beforeMain",yw="main",Nw="afterMain",jw="beforeWrite",kw="write",Sw="afterWrite",Ew=[gw,bw,vw,xw,yw,Nw,jw,kw,Sw];function Qe(e){return e?(e.nodeName||"").toLowerCase():null}function Be(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Ot(e){var t=Be(e).Element;return e instanceof t||e instanceof Element}function Fe(e){var t=Be(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function aa(e){if(typeof ShadowRoot>"u")return!1;var t=Be(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Cw(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},s=t.elements[n];!Fe(s)||!Qe(s)||(Object.assign(s.style,r),Object.keys(o).forEach(function(i){var l=o[i];l===!1?s.removeAttribute(i):s.setAttribute(i,l===!0?"":l)}))})}function Tw(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],s=t.attributes[r]||{},i=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=i.reduce(function(c,d){return c[d]="",c},{});!Fe(o)||!Qe(o)||(Object.assign(o.style,l),Object.keys(s).forEach(function(c){o.removeAttribute(c)}))})}}const Rw={name:"applyStyles",enabled:!0,phase:"write",fn:Cw,effect:Tw,requires:["computeStyles"]};function Ke(e){return e.split("-")[0]}var jt=Math.max,fr=Math.min,Kt=Math.round;function ho(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Bi(){return!/^((?!chrome|android).)*safari/i.test(ho())}function Jt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,s=1;t&&Fe(e)&&(o=e.offsetWidth>0&&Kt(r.width)/e.offsetWidth||1,s=e.offsetHeight>0&&Kt(r.height)/e.offsetHeight||1);var i=Ot(e)?Be(e):window,l=i.visualViewport,c=!Bi()&&n,d=(r.left+(c&&l?l.offsetLeft:0))/o,u=(r.top+(c&&l?l.offsetTop:0))/s,f=r.width/o,w=r.height/s;return{width:f,height:w,top:u,right:d+f,bottom:u+w,left:d,x:d,y:u}}function sa(e){var t=Jt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function zi(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&aa(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function at(e){return Be(e).getComputedStyle(e)}function Ow(e){return["table","td","th"].indexOf(Qe(e))>=0}function ft(e){return((Ot(e)?e.ownerDocument:e.document)||window.document).documentElement}function Br(e){return Qe(e)==="html"?e:e.assignedSlot||e.parentNode||(aa(e)?e.host:null)||ft(e)}function ps(e){return!Fe(e)||at(e).position==="fixed"?null:e.offsetParent}function _w(e){var t=/firefox/i.test(ho()),n=/Trident/i.test(ho());if(n&&Fe(e)){var r=at(e);if(r.position==="fixed")return null}var o=Br(e);for(aa(o)&&(o=o.host);Fe(o)&&["html","body"].indexOf(Qe(o))<0;){var s=at(o);if(s.transform!=="none"||s.perspective!=="none"||s.contain==="paint"||["transform","perspective"].indexOf(s.willChange)!==-1||t&&s.willChange==="filter"||t&&s.filter&&s.filter!=="none")return o;o=o.parentNode}return null}function Gn(e){for(var t=Be(e),n=ps(e);n&&Ow(n)&&at(n).position==="static";)n=ps(n);return n&&(Qe(n)==="html"||Qe(n)==="body"&&at(n).position==="static")?t:n||_w(e)||t}function ia(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function jn(e,t,n){return jt(e,fr(t,n))}function Pw(e,t,n){var r=jn(e,t,n);return r>n?n:r}function Vi(){return{top:0,right:0,bottom:0,left:0}}function Fi(e){return Object.assign({},Vi(),e)}function Li(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Iw=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Fi(typeof t!="number"?t:Li(t,Ln))};function Mw(e){var t,n=e.state,r=e.name,o=e.options,s=n.elements.arrow,i=n.modifiersData.popperOffsets,l=Ke(n.placement),c=ia(l),d=[_e,Ge].indexOf(l)>=0,u=d?"height":"width";if(!(!s||!i)){var f=Iw(o.padding,n),w=sa(s),b=c==="y"?Oe:_e,x=c==="y"?Le:Ge,m=n.rects.reference[u]+n.rects.reference[c]-i[c]-n.rects.popper[u],g=i[c]-n.rects.reference[c],j=Gn(s),S=j?c==="y"?j.clientHeight||0:j.clientWidth||0:0,E=m/2-g/2,k=f[b],v=S-w[u]-f[x],O=S/2-w[u]/2+E,V=jn(k,O,v),C=c;n.modifiersData[r]=(t={},t[C]=V,t.centerOffset=V-O,t)}}function $w(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||zi(t.elements.popper,o)&&(t.elements.arrow=o))}const Dw={name:"arrow",enabled:!0,phase:"main",fn:Mw,effect:$w,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Zt(e){return e.split("-")[1]}var Aw={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Bw(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Kt(n*o)/o||0,y:Kt(r*o)/o||0}}function ws(e){var t,n=e.popper,r=e.popperRect,o=e.placement,s=e.variation,i=e.offsets,l=e.position,c=e.gpuAcceleration,d=e.adaptive,u=e.roundOffsets,f=e.isFixed,w=i.x,b=w===void 0?0:w,x=i.y,m=x===void 0?0:x,g=typeof u=="function"?u({x:b,y:m}):{x:b,y:m};b=g.x,m=g.y;var j=i.hasOwnProperty("x"),S=i.hasOwnProperty("y"),E=_e,k=Oe,v=window;if(d){var O=Gn(n),V="clientHeight",C="clientWidth";if(O===Be(n)&&(O=ft(n),at(O).position!=="static"&&l==="absolute"&&(V="scrollHeight",C="scrollWidth")),O=O,o===Oe||(o===_e||o===Ge)&&s===Rn){k=Le;var _=f&&O===v&&v.visualViewport?v.visualViewport.height:O[V];m-=_-r.height,m*=c?1:-1}if(o===_e||(o===Oe||o===Le)&&s===Rn){E=Ge;var F=f&&O===v&&v.visualViewport?v.visualViewport.width:O[C];b-=F-r.width,b*=c?1:-1}}var $=Object.assign({position:l},d&&Aw),te=u===!0?Bw({x:b,y:m},Be(n)):{x:b,y:m};if(b=te.x,m=te.y,c){var Z;return Object.assign({},$,(Z={},Z[k]=S?"0":"",Z[E]=j?"0":"",Z.transform=(v.devicePixelRatio||1)<=1?"translate("+b+"px, "+m+"px)":"translate3d("+b+"px, "+m+"px, 0)",Z))}return Object.assign({},$,(t={},t[k]=S?m+"px":"",t[E]=j?b+"px":"",t.transform="",t))}function zw(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,s=n.adaptive,i=s===void 0?!0:s,l=n.roundOffsets,c=l===void 0?!0:l,d={placement:Ke(t.placement),variation:Zt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,ws(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,ws(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Vw={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:zw,data:{}};var Qn={passive:!0};function Fw(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,s=o===void 0?!0:o,i=r.resize,l=i===void 0?!0:i,c=Be(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return s&&d.forEach(function(u){u.addEventListener("scroll",n.update,Qn)}),l&&c.addEventListener("resize",n.update,Qn),function(){s&&d.forEach(function(u){u.removeEventListener("scroll",n.update,Qn)}),l&&c.removeEventListener("resize",n.update,Qn)}}const Lw={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Fw,data:{}};var Gw={left:"right",right:"left",bottom:"top",top:"bottom"};function ar(e){return e.replace(/left|right|bottom|top/g,function(t){return Gw[t]})}var Uw={start:"end",end:"start"};function fs(e){return e.replace(/start|end/g,function(t){return Uw[t]})}function la(e){var t=Be(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function ca(e){return Jt(ft(e)).left+la(e).scrollLeft}function qw(e,t){var n=Be(e),r=ft(e),o=n.visualViewport,s=r.clientWidth,i=r.clientHeight,l=0,c=0;if(o){s=o.width,i=o.height;var d=Bi();(d||!d&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:s,height:i,x:l+ca(e),y:c}}function Hw(e){var t,n=ft(e),r=la(e),o=(t=e.ownerDocument)==null?void 0:t.body,s=jt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),i=jt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+ca(e),c=-r.scrollTop;return at(o||n).direction==="rtl"&&(l+=jt(n.clientWidth,o?o.clientWidth:0)-s),{width:s,height:i,x:l,y:c}}function da(e){var t=at(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Gi(e){return["html","body","#document"].indexOf(Qe(e))>=0?e.ownerDocument.body:Fe(e)&&da(e)?e:Gi(Br(e))}function kn(e,t){var n;t===void 0&&(t=[]);var r=Gi(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),s=Be(r),i=o?[s].concat(s.visualViewport||[],da(r)?r:[]):r,l=t.concat(i);return o?l:l.concat(kn(Br(i)))}function go(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Xw(e,t){var n=Jt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function ms(e,t,n){return t===Di?go(qw(e,n)):Ot(t)?Xw(t,n):go(Hw(ft(e)))}function Yw(e){var t=kn(Br(e)),n=["absolute","fixed"].indexOf(at(e).position)>=0,r=n&&Fe(e)?Gn(e):e;return Ot(r)?t.filter(function(o){return Ot(o)&&zi(o,r)&&Qe(o)!=="body"}):[]}function Ww(e,t,n,r){var o=t==="clippingParents"?Yw(e):[].concat(t),s=[].concat(o,[n]),i=s[0],l=s.reduce(function(c,d){var u=ms(e,d,r);return c.top=jt(u.top,c.top),c.right=fr(u.right,c.right),c.bottom=fr(u.bottom,c.bottom),c.left=jt(u.left,c.left),c},ms(e,i,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function Ui(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ke(r):null,s=r?Zt(r):null,i=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Oe:c={x:i,y:t.y-n.height};break;case Le:c={x:i,y:t.y+t.height};break;case Ge:c={x:t.x+t.width,y:l};break;case _e:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var d=o?ia(o):null;if(d!=null){var u=d==="y"?"height":"width";switch(s){case Wt:c[d]=c[d]-(t[u]/2-n[u]/2);break;case Rn:c[d]=c[d]+(t[u]/2-n[u]/2);break}}return c}function On(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,s=n.strategy,i=s===void 0?e.strategy:s,l=n.boundary,c=l===void 0?mw:l,d=n.rootBoundary,u=d===void 0?Di:d,f=n.elementContext,w=f===void 0?pn:f,b=n.altBoundary,x=b===void 0?!1:b,m=n.padding,g=m===void 0?0:m,j=Fi(typeof g!="number"?g:Li(g,Ln)),S=w===pn?hw:pn,E=e.rects.popper,k=e.elements[x?S:w],v=Ww(Ot(k)?k:k.contextElement||ft(e.elements.popper),c,u,i),O=Jt(e.elements.reference),V=Ui({reference:O,element:E,placement:o}),C=go(Object.assign({},E,V)),_=w===pn?C:O,F={top:v.top-_.top+j.top,bottom:_.bottom-v.bottom+j.bottom,left:v.left-_.left+j.left,right:_.right-v.right+j.right},$=e.modifiersData.offset;if(w===pn&&$){var te=$[o];Object.keys(F).forEach(function(Z){var D=[Ge,Le].indexOf(Z)>=0?1:-1,I=[Oe,Le].indexOf(Z)>=0?"y":"x";F[Z]+=te[I]*D})}return F}function Kw(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,s=n.rootBoundary,i=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,d=c===void 0?Ai:c,u=Zt(r),f=u?l?us:us.filter(function(x){return Zt(x)===u}):Ln,w=f.filter(function(x){return d.indexOf(x)>=0});w.length===0&&(w=f);var b=w.reduce(function(x,m){return x[m]=On(e,{placement:m,boundary:o,rootBoundary:s,padding:i})[Ke(m)],x},{});return Object.keys(b).sort(function(x,m){return b[x]-b[m]})}function Jw(e){if(Ke(e)===oa)return[];var t=ar(e);return[fs(e),t,fs(t)]}function Zw(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,s=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!0:i,c=n.fallbackPlacements,d=n.padding,u=n.boundary,f=n.rootBoundary,w=n.altBoundary,b=n.flipVariations,x=b===void 0?!0:b,m=n.allowedAutoPlacements,g=t.options.placement,j=Ke(g),S=j===g,E=c||(S||!x?[ar(g)]:Jw(g)),k=[g].concat(E).reduce(function(z,W){return z.concat(Ke(W)===oa?Kw(t,{placement:W,boundary:u,rootBoundary:f,padding:d,flipVariations:x,allowedAutoPlacements:m}):W)},[]),v=t.rects.reference,O=t.rects.popper,V=new Map,C=!0,_=k[0],F=0;F<k.length;F++){var $=k[F],te=Ke($),Z=Zt($)===Wt,D=[Oe,Le].indexOf(te)>=0,I=D?"width":"height",M=On(t,{placement:$,boundary:u,rootBoundary:f,altBoundary:w,padding:d}),L=D?Z?Ge:_e:Z?Le:Oe;v[I]>O[I]&&(L=ar(L));var H=ar(L),oe=[];if(s&&oe.push(M[te]<=0),l&&oe.push(M[L]<=0,M[H]<=0),oe.every(function(z){return z})){_=$,C=!1;break}V.set($,oe)}if(C)for(var N=x?3:1,T=function(W){var X=k.find(function(Y){var q=V.get(Y);if(q)return q.slice(0,W).every(function(Q){return Q})});if(X)return _=X,"break"},G=N;G>0;G--){var U=T(G);if(U==="break")break}t.placement!==_&&(t.modifiersData[r]._skip=!0,t.placement=_,t.reset=!0)}}const Qw={name:"flip",enabled:!0,phase:"main",fn:Zw,requiresIfExists:["offset"],data:{_skip:!1}};function hs(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function gs(e){return[Oe,Ge,Le,_e].some(function(t){return e[t]>=0})}function ef(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,s=t.modifiersData.preventOverflow,i=On(t,{elementContext:"reference"}),l=On(t,{altBoundary:!0}),c=hs(i,r),d=hs(l,o,s),u=gs(c),f=gs(d);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:d,isReferenceHidden:u,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":f})}const tf={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:ef};function nf(e,t,n){var r=Ke(e),o=[_e,Oe].indexOf(r)>=0?-1:1,s=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,i=s[0],l=s[1];return i=i||0,l=(l||0)*o,[_e,Ge].indexOf(r)>=0?{x:l,y:i}:{x:i,y:l}}function rf(e){var t=e.state,n=e.options,r=e.name,o=n.offset,s=o===void 0?[0,0]:o,i=Ai.reduce(function(u,f){return u[f]=nf(f,t.rects,s),u},{}),l=i[t.placement],c=l.x,d=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=d),t.modifiersData[r]=i}const of={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:rf};function af(e){var t=e.state,n=e.name;t.modifiersData[n]=Ui({reference:t.rects.reference,element:t.rects.popper,placement:t.placement})}const sf={name:"popperOffsets",enabled:!0,phase:"read",fn:af,data:{}};function lf(e){return e==="x"?"y":"x"}function cf(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,s=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!1:i,c=n.boundary,d=n.rootBoundary,u=n.altBoundary,f=n.padding,w=n.tether,b=w===void 0?!0:w,x=n.tetherOffset,m=x===void 0?0:x,g=On(t,{boundary:c,rootBoundary:d,padding:f,altBoundary:u}),j=Ke(t.placement),S=Zt(t.placement),E=!S,k=ia(j),v=lf(k),O=t.modifiersData.popperOffsets,V=t.rects.reference,C=t.rects.popper,_=typeof m=="function"?m(Object.assign({},t.rects,{placement:t.placement})):m,F=typeof _=="number"?{mainAxis:_,altAxis:_}:Object.assign({mainAxis:0,altAxis:0},_),$=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,te={x:0,y:0};if(O){if(s){var Z,D=k==="y"?Oe:_e,I=k==="y"?Le:Ge,M=k==="y"?"height":"width",L=O[k],H=L+g[D],oe=L-g[I],N=b?-C[M]/2:0,T=S===Wt?V[M]:C[M],G=S===Wt?-C[M]:-V[M],U=t.elements.arrow,z=b&&U?sa(U):{width:0,height:0},W=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Vi(),X=W[D],Y=W[I],q=jn(0,V[M],z[M]),Q=E?V[M]/2-N-q-X-F.mainAxis:T-q-X-F.mainAxis,ee=E?-V[M]/2+N+q+Y+F.mainAxis:G+q+Y+F.mainAxis,ue=t.elements.arrow&&Gn(t.elements.arrow),P=ue?k==="y"?ue.clientTop||0:ue.clientLeft||0:0,je=(Z=$==null?void 0:$[k])!=null?Z:0,B=L+Q-je-P,ye=L+ee-je,qe=jn(b?fr(H,B):H,L,b?jt(oe,ye):oe);O[k]=qe,te[k]=qe-L}if(l){var mt,Ce=k==="x"?Oe:_e,qn=k==="x"?Le:Ge,He=O[v],Mt=v==="y"?"height":"width",ht=He+g[Ce],$t=He-g[qn],Dt=[Oe,_e].indexOf(j)!==-1,At=(mt=$==null?void 0:$[v])!=null?mt:0,gt=Dt?ht:He-V[Mt]-C[Mt]-At+F.altAxis,nn=Dt?He+V[Mt]+C[Mt]-At-F.altAxis:$t,Hn=b&&Dt?Pw(gt,He,nn):jn(b?gt:ht,He,b?nn:$t);O[v]=Hn,te[v]=Hn-He}t.modifiersData[r]=te}}const df={name:"preventOverflow",enabled:!0,phase:"main",fn:cf,requiresIfExists:["offset"]};function uf(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function pf(e){return e===Be(e)||!Fe(e)?la(e):uf(e)}function wf(e){var t=e.getBoundingClientRect(),n=Kt(t.width)/e.offsetWidth||1,r=Kt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function ff(e,t,n){n===void 0&&(n=!1);var r=Fe(t),o=Fe(t)&&wf(t),s=ft(t),i=Jt(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((Qe(t)!=="body"||da(s))&&(l=pf(t)),Fe(t)?(c=Jt(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):s&&(c.x=ca(s))),{x:i.left+l.scrollLeft-c.x,y:i.top+l.scrollTop-c.y,width:i.width,height:i.height}}function mf(e){var t=new Map,n=new Set,r=[];e.forEach(function(s){t.set(s.name,s)});function o(s){n.add(s.name);var i=[].concat(s.requires||[],s.requiresIfExists||[]);i.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(s)}return e.forEach(function(s){n.has(s.name)||o(s)}),r}function hf(e){var t=mf(e);return Ew.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function gf(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function bf(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var bs={placement:"bottom",modifiers:[],strategy:"absolute"};function vs(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function vf(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,s=o===void 0?bs:o;return function(l,c,d){d===void 0&&(d=s);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},bs,s),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},f=[],w=!1,b={state:u,setOptions:function(j){var S=typeof j=="function"?j(u.options):j;m(),u.options=Object.assign({},s,u.options,S),u.scrollParents={reference:Ot(l)?kn(l):l.contextElement?kn(l.contextElement):[],popper:kn(c)};var E=hf(bf([].concat(r,u.options.modifiers)));return u.orderedModifiers=E.filter(function(k){return k.enabled}),x(),b.update()},forceUpdate:function(){if(!w){var j=u.elements,S=j.reference,E=j.popper;if(vs(S,E)){u.rects={reference:ff(S,Gn(E),u.options.strategy==="fixed"),popper:sa(E)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(F){return u.modifiersData[F.name]=Object.assign({},F.data)});for(var k=0;k<u.orderedModifiers.length;k++){if(u.reset===!0){u.reset=!1,k=-1;continue}var v=u.orderedModifiers[k],O=v.fn,V=v.options,C=V===void 0?{}:V,_=v.name;typeof O=="function"&&(u=O({state:u,options:C,name:_,instance:b})||u)}}}},update:gf(function(){return new Promise(function(g){b.forceUpdate(),g(u)})}),destroy:function(){m(),w=!0}};if(!vs(l,c))return b;b.setOptions(d).then(function(g){!w&&d.onFirstUpdate&&d.onFirstUpdate(g)});function x(){u.orderedModifiers.forEach(function(g){var j=g.name,S=g.options,E=S===void 0?{}:S,k=g.effect;if(typeof k=="function"){var v=k({state:u,name:j,instance:b,options:E}),O=function(){};f.push(v||O)}})}function m(){f.forEach(function(g){return g()}),f=[]}return b}}var xf=[Lw,sf,Vw,Rw,of,Qw,df,Dw,tf],yf=vf({defaultModifiers:xf});const Nf="Popper";function jf(e){return ww(Nf,e)}const kf=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Sf=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Ef(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function mr(e){return typeof e=="function"?e():e}function zr(e){return e.nodeType!==void 0}function Cf(e){return!zr(e)}const Tf=()=>Wo({root:["root"]},aw(jf)),Rf={},Of=A.forwardRef(function(t,n){var r;const{anchorEl:o,children:s,direction:i,disablePortal:l,modifiers:c,open:d,placement:u,popperOptions:f,popperRef:w,slotProps:b={},slots:x={},TransitionProps:m}=t,g=ke(t,kf),j=A.useRef(null),S=Tt(j,n),E=A.useRef(null),k=Tt(E,w),v=A.useRef(k);Yt(()=>{v.current=k},[k]),A.useImperativeHandle(w,()=>E.current,[]);const O=Ef(u,i),[V,C]=A.useState(O),[_,F]=A.useState(mr(o));A.useEffect(()=>{E.current&&E.current.forceUpdate()}),A.useEffect(()=>{o&&F(mr(o))},[o]),Yt(()=>{if(!_||!d)return;const I=H=>{C(H.placement)};if(process.env.NODE_ENV!=="production"&&_&&zr(_)&&_.nodeType===1){const H=_.getBoundingClientRect();process.env.NODE_ENV!=="test"&&H.top===0&&H.left===0&&H.right===0&&H.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let M=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:H})=>{I(H)}}];c!=null&&(M=M.concat(c)),f&&f.modifiers!=null&&(M=M.concat(f.modifiers));const L=yf(_,j.current,R({placement:O},f,{modifiers:M}));return v.current(L),()=>{L.destroy(),v.current(null)}},[_,l,c,d,f,O]);const $={placement:V};m!==null&&($.TransitionProps=m);const te=Tf(),Z=(r=x.root)!=null?r:"div",D=dw({elementType:Z,externalSlotProps:b.root,externalForwardedProps:g,additionalProps:{role:"tooltip",ref:S},ownerState:t,className:te.root});return a.jsx(Z,R({},D,{children:typeof s=="function"?s($):s}))}),qi=A.forwardRef(function(t,n){const{anchorEl:r,children:o,container:s,direction:i="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:d,open:u,placement:f="bottom",popperOptions:w=Rf,popperRef:b,style:x,transition:m=!1,slotProps:g={},slots:j={}}=t,S=ke(t,Sf),[E,k]=A.useState(!0),v=()=>{k(!1)},O=()=>{k(!0)};if(!c&&!u&&(!m||E))return null;let V;if(s)V=s;else if(r){const F=mr(r);V=F&&zr(F)?cr(F).body:cr(null).body}const C=!u&&c&&(!m||E)?"none":void 0,_=m?{in:u,onEnter:v,onExited:O}:void 0;return a.jsx(wr,{disablePortal:l,container:V,children:a.jsx(Of,R({anchorEl:r,direction:i,disablePortal:l,modifiers:d,ref:n,open:m?!E:u,placement:f,popperOptions:w,popperRef:b,slotProps:g,slots:j},S,{style:R({position:"fixed",top:0,left:0,display:C},x),TransitionProps:_,children:o}))})});process.env.NODE_ENV!=="production"&&(qi.propTypes={anchorEl:Ho(p.oneOfType([Cn,p.object,p.func]),e=>{if(e.open){const t=mr(e.anchorEl);if(t&&zr(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Cf(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:p.oneOfType([p.node,p.func]),container:p.oneOfType([Cn,p.func]),direction:p.oneOf(["ltr","rtl"]),disablePortal:p.bool,keepMounted:p.bool,modifiers:p.arrayOf(p.shape({data:p.object,effect:p.func,enabled:p.bool,fn:p.func,name:p.any,options:p.object,phase:p.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:p.arrayOf(p.string),requiresIfExists:p.arrayOf(p.string)})),open:p.bool.isRequired,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:p.shape({modifiers:p.array,onFirstUpdate:p.func,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:p.oneOf(["absolute","fixed"])}),popperRef:yi,slotProps:p.shape({root:p.oneOfType([p.func,p.object])}),slots:p.shape({root:p.elementType}),transition:p.bool});function Hi(){const e=Pi(ta);return process.env.NODE_ENV!=="production"&&A.useDebugValue(e),e[na]||e}function bo(e,t){return bo=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},bo(e,t)}function _f(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,bo(e,t)}const xs={disabled:!1};var Pf=process.env.NODE_ENV!=="production"?p.oneOfType([p.number,p.shape({enter:p.number,exit:p.number,appear:p.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&p.oneOfType([p.string,p.shape({enter:p.string,exit:p.string,active:p.string}),p.shape({enter:p.string,enterDone:p.string,enterActive:p.string,exit:p.string,exitDone:p.string,exitActive:p.string})]);const Xi=h.createContext(null);var If=function(t){return t.scrollTop},bn="unmounted",xt="exited",yt="entering",Ut="entered",vo="exiting",st=function(e){_f(t,e);function t(r,o){var s;s=e.call(this,r,o)||this;var i=o,l=i&&!i.isMounting?r.enter:r.appear,c;return s.appearStatus=null,r.in?l?(c=xt,s.appearStatus=yt):c=Ut:r.unmountOnExit||r.mountOnEnter?c=bn:c=xt,s.state={status:c},s.nextCallback=null,s}t.getDerivedStateFromProps=function(o,s){var i=o.in;return i&&s.status===bn?{status:xt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var s=null;if(o!==this.props){var i=this.state.status;this.props.in?i!==yt&&i!==Ut&&(s=yt):(i===yt||i===Ut)&&(s=vo)}this.updateStatus(!1,s)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,s,i,l;return s=i=l=o,o!=null&&typeof o!="number"&&(s=o.exit,i=o.enter,l=o.appear!==void 0?o.appear:i),{exit:s,enter:i,appear:l}},n.updateStatus=function(o,s){if(o===void 0&&(o=!1),s!==null)if(this.cancelNextCallback(),s===yt){if(this.props.unmountOnExit||this.props.mountOnEnter){var i=this.props.nodeRef?this.props.nodeRef.current:fn.findDOMNode(this);i&&If(i)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===xt&&this.setState({status:bn})},n.performEnter=function(o){var s=this,i=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[fn.findDOMNode(this),l],d=c[0],u=c[1],f=this.getTimeouts(),w=l?f.appear:f.enter;if(!o&&!i||xs.disabled){this.safeSetState({status:Ut},function(){s.props.onEntered(d)});return}this.props.onEnter(d,u),this.safeSetState({status:yt},function(){s.props.onEntering(d,u),s.onTransitionEnd(w,function(){s.safeSetState({status:Ut},function(){s.props.onEntered(d,u)})})})},n.performExit=function(){var o=this,s=this.props.exit,i=this.getTimeouts(),l=this.props.nodeRef?void 0:fn.findDOMNode(this);if(!s||xs.disabled){this.safeSetState({status:xt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:vo},function(){o.props.onExiting(l),o.onTransitionEnd(i.exit,function(){o.safeSetState({status:xt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,s){s=this.setNextCallback(s),this.setState(o,s)},n.setNextCallback=function(o){var s=this,i=!0;return this.nextCallback=function(l){i&&(i=!1,s.nextCallback=null,o(l))},this.nextCallback.cancel=function(){i=!1},this.nextCallback},n.onTransitionEnd=function(o,s){this.setNextCallback(s);var i=this.props.nodeRef?this.props.nodeRef.current:fn.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!i||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[i,this.nextCallback],d=c[0],u=c[1];this.props.addEndListener(d,u)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===bn)return null;var s=this.props,i=s.children;s.in,s.mountOnEnter,s.unmountOnExit,s.appear,s.enter,s.exit,s.timeout,s.addEndListener,s.onEnter,s.onEntering,s.onEntered,s.onExit,s.onExiting,s.onExited,s.nodeRef;var l=ke(s,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return h.createElement(Xi.Provider,{value:null},typeof i=="function"?i(o,l):h.cloneElement(h.Children.only(i),l))},t}(h.Component);st.contextType=Xi;st.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:p.shape({current:typeof Element>"u"?p.any:function(e,t,n,r,o,s){var i=e[t];return p.instanceOf(i&&"ownerDocument"in i?i.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,s)}}),children:p.oneOfType([p.func.isRequired,p.element.isRequired]).isRequired,in:p.bool,mountOnEnter:p.bool,unmountOnExit:p.bool,appear:p.bool,enter:p.bool,exit:p.bool,timeout:function(t){var n=Pf;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),s=1;s<r;s++)o[s-1]=arguments[s];return n.apply(void 0,[t].concat(o))},addEndListener:p.func,onEnter:p.func,onEntering:p.func,onEntered:p.func,onExit:p.func,onExiting:p.func,onExited:p.func}:{};function Gt(){}st.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Gt,onEntering:Gt,onEntered:Gt,onExit:Gt,onExiting:Gt,onExited:Gt};st.UNMOUNTED=bn;st.EXITED=xt;st.ENTERING=yt;st.ENTERED=Ut;st.EXITING=vo;const Mf=e=>e.scrollTop;function ys(e,t){var n,r;const{timeout:o,easing:s,style:i={}}=e;return{duration:(n=i.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=i.transitionTimingFunction)!=null?r:typeof s=="object"?s[t.mode]:s,delay:i.transitionDelay}}const $f=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function xo(e){return`scale(${e}, ${e**2})`}const Df={entering:{opacity:1,transform:xo(1)},entered:{opacity:1,transform:"none"}},oo=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),hr=A.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:s,easing:i,in:l,onEnter:c,onEntered:d,onEntering:u,onExit:f,onExited:w,onExiting:b,style:x,timeout:m="auto",TransitionComponent:g=st}=t,j=ke(t,$f),S=hn(),E=A.useRef(),k=Hi(),v=A.useRef(null),O=Tt(v,s.ref,n),V=I=>M=>{if(I){const L=v.current;M===void 0?I(L):I(L,M)}},C=V(u),_=V((I,M)=>{Mf(I);const{duration:L,delay:H,easing:oe}=ys({style:x,timeout:m,easing:i},{mode:"enter"});let N;m==="auto"?(N=k.transitions.getAutoHeightDuration(I.clientHeight),E.current=N):N=L,I.style.transition=[k.transitions.create("opacity",{duration:N,delay:H}),k.transitions.create("transform",{duration:oo?N:N*.666,delay:H,easing:oe})].join(","),c&&c(I,M)}),F=V(d),$=V(b),te=V(I=>{const{duration:M,delay:L,easing:H}=ys({style:x,timeout:m,easing:i},{mode:"exit"});let oe;m==="auto"?(oe=k.transitions.getAutoHeightDuration(I.clientHeight),E.current=oe):oe=M,I.style.transition=[k.transitions.create("opacity",{duration:oe,delay:L}),k.transitions.create("transform",{duration:oo?oe:oe*.666,delay:oo?L:L||oe*.333,easing:H})].join(","),I.style.opacity=0,I.style.transform=xo(.75),f&&f(I)}),Z=V(w),D=I=>{m==="auto"&&S.start(E.current||0,I),r&&r(v.current,I)};return a.jsx(g,R({appear:o,in:l,nodeRef:v,onEnter:_,onEntered:F,onEntering:C,onExit:te,onExited:Z,onExiting:$,addEndListener:D,timeout:m==="auto"?null:m},j,{children:(I,M)=>A.cloneElement(s,R({style:R({opacity:0,transform:xo(.75),visibility:I==="exited"&&!l?"hidden":void 0},Df[I],x,s.props.style),ref:O},M))}))});process.env.NODE_ENV!=="production"&&(hr.propTypes={addEndListener:p.func,appear:p.bool,children:Yo.isRequired,easing:p.oneOfType([p.shape({enter:p.string,exit:p.string}),p.string]),in:p.bool,onEnter:p.func,onEntered:p.func,onEntering:p.func,onExit:p.func,onExited:p.func,onExiting:p.func,style:p.object,timeout:p.oneOfType([p.oneOf(["auto"]),p.number,p.shape({appear:p.number,enter:p.number,exit:p.number})])});hr.muiSupportAuto=!0;const Af=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Bf=Fn(qi,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),ua=A.forwardRef(function(t,n){var r;const o=_i(),s=ra({props:t,name:"MuiPopper"}),{anchorEl:i,component:l,components:c,componentsProps:d,container:u,disablePortal:f,keepMounted:w,modifiers:b,open:x,placement:m,popperOptions:g,popperRef:j,transition:S,slots:E,slotProps:k}=s,v=ke(s,Af),O=(r=E==null?void 0:E.root)!=null?r:c==null?void 0:c.Root,V=R({anchorEl:i,container:u,disablePortal:f,keepMounted:w,modifiers:b,open:x,placement:m,popperOptions:g,popperRef:j,transition:S},v);return a.jsx(Bf,R({as:l,direction:o==null?void 0:o.direction,slots:{root:O},slotProps:k??d},V,{ref:n}))});process.env.NODE_ENV!=="production"&&(ua.propTypes={anchorEl:p.oneOfType([Cn,p.object,p.func]),children:p.oneOfType([p.node,p.func]),component:p.elementType,components:p.shape({Root:p.elementType}),componentsProps:p.shape({root:p.oneOfType([p.func,p.object])}),container:p.oneOfType([Cn,p.func]),disablePortal:p.bool,keepMounted:p.bool,modifiers:p.arrayOf(p.shape({data:p.object,effect:p.func,enabled:p.bool,fn:p.func,name:p.any,options:p.object,phase:p.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:p.arrayOf(p.string),requiresIfExists:p.arrayOf(p.string)})),open:p.bool.isRequired,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:p.shape({modifiers:p.array,onFirstUpdate:p.func,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:p.oneOf(["absolute","fixed"])}),popperRef:yi,slotProps:p.shape({root:p.oneOfType([p.func,p.object])}),slots:p.shape({root:p.elementType}),sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),transition:p.bool});function zf(e){return Cr("MuiTooltip",e)}const dt=Ti("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),Vf=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Ff(e){return Math.round(e*1e5)/1e5}const Lf=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:s}=e,i={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Ze(s.split("-")[0])}`],arrow:["arrow"]};return Wo(i,zf,t)},Gf=Fn(ua,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>R({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${dt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${dt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${dt.arrow}`]:R({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${dt.arrow}`]:R({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Uf=Fn("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Ze(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>R({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:Ii(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Ff(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${dt.popper}[data-popper-placement*="left"] &`]:R({transformOrigin:"right center"},t.isRtl?R({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):R({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${dt.popper}[data-popper-placement*="right"] &`]:R({transformOrigin:"left center"},t.isRtl?R({marginRight:"14px"},t.touch&&{marginRight:"24px"}):R({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${dt.popper}[data-popper-placement*="top"] &`]:R({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${dt.popper}[data-popper-placement*="bottom"] &`]:R({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),qf=Fn("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:Ii(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let er=!1;const Ns=new Bn;let wn={x:0,y:0};function tr(e,t){return n=>{t&&t(n),e(n)}}const Yi=A.forwardRef(function(t,n){var r,o,s,i,l,c,d,u,f,w,b,x,m,g,j,S,E,k,v;const O=ra({props:t,name:"MuiTooltip"}),{arrow:V=!1,children:C,components:_={},componentsProps:F={},describeChild:$=!1,disableFocusListener:te=!1,disableHoverListener:Z=!1,disableInteractive:D=!1,disableTouchListener:I=!1,enterDelay:M=100,enterNextDelay:L=0,enterTouchDelay:H=700,followCursor:oe=!1,id:N,leaveDelay:T=0,leaveTouchDelay:G=1500,onClose:U,onOpen:z,open:W,placement:X="bottom",PopperComponent:Y,PopperProps:q={},slotProps:Q={},slots:ee={},title:ue,TransitionComponent:P=hr,TransitionProps:je}=O,B=ke(O,Vf),ye=A.isValidElement(C)?C:a.jsx("span",{children:C}),qe=Hi(),mt=qe.direction==="rtl",[Ce,qn]=A.useState(),[He,Mt]=A.useState(null),ht=A.useRef(!1),$t=D||oe,Dt=hn(),At=hn(),gt=hn(),nn=hn(),[Hn,wa]=ji({controlled:W,default:!1,name:"Tooltip",state:"open"});let et=Hn;if(process.env.NODE_ENV!=="production"){const{current:ne}=A.useRef(W!==void 0);A.useEffect(()=>{Ce&&Ce.disabled&&!ne&&ue!==""&&Ce.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ue,Ce,ne])}const Vr=Ni(N),rn=A.useRef(),Xn=fo(()=>{rn.current!==void 0&&(document.body.style.WebkitUserSelect=rn.current,rn.current=void 0),nn.clear()});A.useEffect(()=>Xn,[Xn]);const fa=ne=>{Ns.clear(),er=!0,wa(!0),z&&!et&&z(ne)},Yn=fo(ne=>{Ns.start(800+T,()=>{er=!1}),wa(!1),U&&et&&U(ne),Dt.start(qe.transitions.duration.shortest,()=>{ht.current=!1})}),Fr=ne=>{ht.current&&ne.type!=="touchstart"||(Ce&&Ce.removeAttribute("title"),At.clear(),gt.clear(),M||er&&L?At.start(er?L:M,()=>{fa(ne)}):fa(ne))},ma=ne=>{At.clear(),gt.start(T,()=>{Yn(ne)})},{isFocusVisibleRef:ha,onBlur:xl,onFocus:yl,ref:Nl}=ki(),[,ga]=A.useState(!1),ba=ne=>{xl(ne),ha.current===!1&&(ga(!1),ma(ne))},va=ne=>{Ce||qn(ne.currentTarget),yl(ne),ha.current===!0&&(ga(!0),Fr(ne))},xa=ne=>{ht.current=!0;const Me=ye.props;Me.onTouchStart&&Me.onTouchStart(ne)},ya=Fr,Na=ma,jl=ne=>{xa(ne),gt.clear(),Dt.clear(),Xn(),rn.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",nn.start(H,()=>{document.body.style.WebkitUserSelect=rn.current,Fr(ne)})},kl=ne=>{ye.props.onTouchEnd&&ye.props.onTouchEnd(ne),Xn(),gt.start(G,()=>{Yn(ne)})};A.useEffect(()=>{if(!et)return;function ne(Me){(Me.key==="Escape"||Me.key==="Esc")&&Yn(Me)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[Yn,et]);const Sl=Tt(ye.ref,Nl,qn,n);!ue&&ue!==0&&(et=!1);const Lr=A.useRef(),El=ne=>{const Me=ye.props;Me.onMouseMove&&Me.onMouseMove(ne),wn={x:ne.clientX,y:ne.clientY},Lr.current&&Lr.current.update()},on={},Gr=typeof ue=="string";$?(on.title=!et&&Gr&&!Z?ue:null,on["aria-describedby"]=et?Vr:null):(on["aria-label"]=Gr?ue:null,on["aria-labelledby"]=et&&!Gr?Vr:null);const ze=R({},on,B,ye.props,{className:ct(B.className,ye.props.className),onTouchStart:xa,ref:Sl},oe?{onMouseMove:El}:{});process.env.NODE_ENV!=="production"&&(ze["data-mui-internal-clone-element"]=!0,A.useEffect(()=>{Ce&&!Ce.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[Ce]));const an={};I||(ze.onTouchStart=jl,ze.onTouchEnd=kl),Z||(ze.onMouseOver=tr(ya,ze.onMouseOver),ze.onMouseLeave=tr(Na,ze.onMouseLeave),$t||(an.onMouseOver=ya,an.onMouseLeave=Na)),te||(ze.onFocus=tr(va,ze.onFocus),ze.onBlur=tr(ba,ze.onBlur),$t||(an.onFocus=va,an.onBlur=ba)),process.env.NODE_ENV!=="production"&&ye.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ye.props.title}\` or the Tooltip component.`].join(`
`));const Cl=A.useMemo(()=>{var ne;let Me=[{name:"arrow",enabled:!!He,options:{element:He,padding:4}}];return(ne=q.popperOptions)!=null&&ne.modifiers&&(Me=Me.concat(q.popperOptions.modifiers)),R({},q.popperOptions,{modifiers:Me})},[He,q]),sn=R({},O,{isRtl:mt,arrow:V,disableInteractive:$t,placement:X,PopperComponentProp:Y,touch:ht.current}),Ur=Lf(sn),ja=(r=(o=ee.popper)!=null?o:_.Popper)!=null?r:Gf,ka=(s=(i=(l=ee.transition)!=null?l:_.Transition)!=null?i:P)!=null?s:hr,Sa=(c=(d=ee.tooltip)!=null?d:_.Tooltip)!=null?c:Uf,Ea=(u=(f=ee.arrow)!=null?f:_.Arrow)!=null?u:qf,Tl=gn(ja,R({},q,(w=Q.popper)!=null?w:F.popper,{className:ct(Ur.popper,q==null?void 0:q.className,(b=(x=Q.popper)!=null?x:F.popper)==null?void 0:b.className)}),sn),Rl=gn(ka,R({},je,(m=Q.transition)!=null?m:F.transition),sn),Ol=gn(Sa,R({},(g=Q.tooltip)!=null?g:F.tooltip,{className:ct(Ur.tooltip,(j=(S=Q.tooltip)!=null?S:F.tooltip)==null?void 0:j.className)}),sn),_l=gn(Ea,R({},(E=Q.arrow)!=null?E:F.arrow,{className:ct(Ur.arrow,(k=(v=Q.arrow)!=null?v:F.arrow)==null?void 0:k.className)}),sn);return a.jsxs(A.Fragment,{children:[A.cloneElement(ye,ze),a.jsx(ja,R({as:Y??ua,placement:X,anchorEl:oe?{getBoundingClientRect:()=>({top:wn.y,left:wn.x,right:wn.x,bottom:wn.y,width:0,height:0})}:Ce,popperRef:Lr,open:Ce?et:!1,id:Vr,transition:!0},an,Tl,{popperOptions:Cl,children:({TransitionProps:ne})=>a.jsx(ka,R({timeout:qe.transitions.duration.shorter},ne,Rl,{children:a.jsxs(Sa,R({},Ol,{children:[ue,V?a.jsx(Ea,R({},_l,{ref:Mt})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Yi.propTypes={arrow:p.bool,children:Yo.isRequired,classes:p.object,className:p.string,components:p.shape({Arrow:p.elementType,Popper:p.elementType,Tooltip:p.elementType,Transition:p.elementType}),componentsProps:p.shape({arrow:p.object,popper:p.object,tooltip:p.object,transition:p.object}),describeChild:p.bool,disableFocusListener:p.bool,disableHoverListener:p.bool,disableInteractive:p.bool,disableTouchListener:p.bool,enterDelay:p.number,enterNextDelay:p.number,enterTouchDelay:p.number,followCursor:p.bool,id:p.string,leaveDelay:p.number,leaveTouchDelay:p.number,onClose:p.func,onOpen:p.func,open:p.bool,placement:p.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:p.elementType,PopperProps:p.object,slotProps:p.shape({arrow:p.object,popper:p.object,tooltip:p.object,transition:p.object}),slots:p.shape({arrow:p.elementType,popper:p.elementType,tooltip:p.elementType,transition:p.elementType}),sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),title:p.node,TransitionComponent:p.elementType,TransitionProps:p.object});function js(e,t,n){return e?a.jsx(Ye.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:a.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function pa(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:s=void 0,iconPathAfter:i=void 0,hasAutoFocus:l=!1,className:c,isDisabled:d=!1,isDense:u=!0,isSubMenuParent:f=!1,hasDisabledGutters:w=!1,hasDivider:b=!1,focusVisibleClassName:x,id:m,children:g}=e,j=a.jsx(Ye.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:d,dense:u,disableGutters:w,divider:b,focusVisibleClassName:x,onClick:t,id:m,children:n?a.jsxs(a.Fragment,{children:[js(s,n,!0),a.jsx(Ye.ListItemText,{primary:n,inset:!s&&o}),f?a.jsx(Ye.ListItemIcon,{className:"papi-menu-icon-trailing",children:a.jsx(tw,{})}):js(i,n,!1)]}):g});return r?a.jsx(Yi,{title:r,placement:"right",children:a.jsx("div",{children:j})}):j}function Wi(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Hf(e){const[t,n]=h.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:s}=e,i=d=>{n(d.currentTarget)},l=()=>{n(void 0)},c=()=>{let d=Wi(s).filter(u=>"menuItem"in u.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return d=d.filter(u=>"menuItem"in u.group&&u.group.menuItem===r.id),a.jsx(Ki,{...e,includedGroups:d})};return a.jsxs(a.Fragment,{children:[a.jsx(pa,{onClick:i,...o,isSubMenuParent:!0}),a.jsx(Ye.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Xf=(e,t)=>t.filter(o=>o.group===e).sort((o,s)=>(o.order||0)-(s.order||0));function Ki(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:s,allowForLeadingIcons:i}=h.useMemo(()=>{const u=o&&o.length>0?o:Wi(t).filter(x=>!("menuItem"in x.group)),f=Object.values(u).sort((x,m)=>(x.group.order||0)-(m.group.order||0)),w=[];f.forEach(x=>{Xf(x.id,t.items).forEach(m=>w.push({item:m,isLastItemInGroup:!1})),w.length>0&&(w[w.length-1].isLastItemInGroup=!0)}),w.length>0&&(w[w.length-1].isLastItemInGroup=!1);const b=w.some(x=>"iconPathBefore"in x.item&&x.item.iconPathBefore);return{items:w,allowForLeadingIcons:b}},[o,t]),l=({item:u,isLastItemInGroup:f})=>({className:"papi-menu-item",label:u.label,tooltip:u.tooltip,iconPathBefore:"iconPathBefore"in u?u.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in u?u.iconPathAfter:void 0,hasDivider:f,allowForLeadingIcons:i}),[c]=s;if(!c)return a.jsx("div",{});const d=c.item.group;return a.jsx("div",{role:"menu","aria-label":d,children:s.map((u,f)=>{const{item:w}=u,b=l(u);if("command"in w){const x=w.group+f;return a.jsx(pa,{onClick:m=>{n==null||n(m),r(w)},...b},x)}return a.jsx(Hf,{parentMenuItem:w,parentItemProps:b,...e},d+w.id)})},d)}function Yf(e){const{menuDefinition:t,columnId:n}=e;let s=Object.entries(t.groups).map(([i,l])=>({id:i,group:l})).filter(i=>"column"in i.group);return n&&"columns"in t&&t.columns[n]&&(s=s.filter(i=>"column"in i.group&&i.group.column===n)),a.jsx(Ki,{...e,includedGroups:s})}function Wf({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:s}){return a.jsxs(Ye.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${s??""}`,children:[a.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${s??""}`,children:r.label}),a.jsx(Ye.List,{id:n,dense:!0,className:s??"",children:a.jsx(Yf,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Ji({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,s=h.useMemo(()=>{const i=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,d=o[c];typeof d=="object"&&typeof d.order=="number"&&!Number.isNaN(d.order)?i.set(d.order,{id:c,metadata:d}):console.warn(`Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(i.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return a.jsx(Ye.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:s.length,role:"menu","aria-label":"GridMenu",id:r,children:s.map((i,l)=>a.jsx(Wf,{commandHandler:e,menuDefinition:n,...i,className:t},l))})}function Kf(e){return{preserveValue:!0,...e}}const gr=(e,t,n={})=>{const r=h.useRef(t);r.current=t;const o=h.useRef(n);o.current=Kf(o.current);const[s,i]=h.useState(()=>r.current),[l,c]=h.useState(!0);return h.useEffect(()=>{let d=!0;return c(!!e),(async()=>{if(e){const u=await e();d&&(i(()=>u),c(!1))}})(),()=>{d=!1,o.current.preserveValue||i(()=>r.current)}},[e]),[s,l]},Jf=Mi(a.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Zi({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:s,ariaLabelPrefix:i,children:l}){const[c,d]=h.useState(!1),[u,f]=h.useState(!1),w=h.useCallback(()=>{c&&d(!1),f(!1)},[c]),b=h.useCallback(k=>{k.stopPropagation(),d(v=>{const O=!v;return O&&k.shiftKey?f(!0):O||f(!1),O})},[]),x=h.useCallback(k=>(w(),r(k)),[r,w]),[m,g]=h.useState({top:1,left:1});h.useEffect(()=>{if(c){const k=o==null?void 0:o.current;if(k){const v=k.getBoundingClientRect(),O=window.scrollY,V=window.scrollX,C=v.top+O+k.clientHeight,_=v.left+V;g({top:C,left:_})}}},[c,o]);const[j]=gr(h.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[S]=gr(h.useCallback(async()=>(e==null?void 0:e(!0))??n??j,[e,n,j,c]),n??j),E=u&&S?S:j;return a.jsxs(a.Fragment,{children:[a.jsx(Ye.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${s??""}`,color:"inherit","aria-label":`${i??""} menu button`,onClick:b,children:l??a.jsx(Jf,{})}),a.jsx(Ye.Drawer,{className:`papi-menu-drawer ${s??""}`,anchor:"left",variant:"temporary",open:c,onClose:w,PaperProps:{className:"papi-menu-drawer-paper",style:{top:m.top,left:m.left}},children:E?a.jsx(Ji,{className:s,id:`${i??""} main menu`,commandHandler:x,multiColumnMenu:E}):void 0})]})}function Zf({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:s=!1,size:i="medium",className:l,onClick:c,children:d}){return a.jsx(Ye.IconButton,{id:e,disabled:n,edge:s,size:i,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:d})}const tn=h.forwardRef(({className:e,...t},n)=>a.jsx(J.LoaderCircle,{size:35,className:y("tw-animate-spin",e),...t,ref:n}));tn.displayName="Spinner";function Qf({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:s,placeholder:i,isRequired:l=!1,className:c,defaultValue:d,value:u,onChange:f,onFocus:w,onBlur:b}){return a.jsxs("div",{className:y("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":r}),children:[a.jsx(Re,{htmlFor:e,className:y({"tw-text-red-600":n,"tw-hidden":!s}),children:`${s}${l?"*":""}`}),a.jsx(Pt,{id:e,disabled:t,placeholder:i,required:l,className:y(c,{"tw-border-red-600":n}),defaultValue:d,value:u,onChange:f,onFocus:w,onBlur:b}),a.jsx("p",{className:y({"tw-hidden":!o}),children:o})]})}const Qi=h.createContext(void 0);function It(){const e=h.useContext(Qi);if(!e)throw new Error("useContext must be used within a MenubarProvider.");return e}const Un=_t.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}});function nr({...e}){return a.jsx(we.Menu,{...e})}function em({...e}){return a.jsx(we.RadioGroup,{...e})}function ks({...e}){return a.jsx(we.Sub,{"data-slot":"menubar-sub",...e})}const el=h.forwardRef(({className:e,variant:t="default",...n},r)=>{const o=h.useMemo(()=>({variant:t}),[t]);return a.jsx(Qi.Provider,{value:o,children:a.jsx(we.Root,{ref:r,className:y("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",e),...n})})});el.displayName=we.Root.displayName;const vn=h.forwardRef(({className:e,...t},n)=>{const r=It();return a.jsx(we.Trigger,{ref:n,className:y("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",Un({variant:r.variant,className:e})),...t})});vn.displayName=we.Trigger.displayName;const yo=h.forwardRef(({className:e,inset:t,children:n,...r},o)=>{const s=It();return a.jsxs(we.SubTrigger,{ref:o,className:y("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",t&&"tw-pl-8",Un({variant:s.variant,className:e}),e),...r,children:[n,a.jsx(J.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});yo.displayName=we.SubTrigger.displayName;const No=h.forwardRef(({className:e,...t},n)=>{const r=It();return a.jsx(we.SubContent,{ref:n,className:y("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":r.variant==="muted"},e),...t})});No.displayName=we.SubContent.displayName;const xn=h.forwardRef(({className:e,align:t="start",alignOffset:n=-4,sideOffset:r=8,...o},s)=>{const i=It();return a.jsx(we.Portal,{children:a.jsx(we.Content,{ref:s,align:t,alignOffset:n,sideOffset:r,className:y("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":i.variant==="muted"},e),...o})})});xn.displayName=we.Content.displayName;const he=h.forwardRef(({className:e,inset:t,...n},r)=>{const o=It();return a.jsx(we.Item,{ref:r,className:y("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",Un({variant:o.variant,className:e}),e),...n})});he.displayName=we.Item.displayName;const jo=h.forwardRef(({className:e,children:t,checked:n,...r},o)=>{const s=It();return a.jsxs(we.CheckboxItem,{ref:o,className:y("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Un({variant:s.variant,className:e}),e),checked:n,...r,children:[a.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:a.jsx(we.ItemIndicator,{children:a.jsx(J.Check,{className:"tw-h-4 tw-w-4"})})}),t]})});jo.displayName=we.CheckboxItem.displayName;const sr=h.forwardRef(({className:e,children:t,...n},r)=>{const o=It();return a.jsxs(we.RadioItem,{ref:r,className:y("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Un({variant:o.variant,className:e}),e),...n,children:[a.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:a.jsx(we.ItemIndicator,{children:a.jsx(J.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]})});sr.displayName=we.RadioItem.displayName;const tm=h.forwardRef(({className:e,inset:t,...n},r)=>a.jsx(we.Label,{ref:r,className:y("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...n}));tm.displayName=we.Label.displayName;const Xe=h.forwardRef(({className:e,...t},n)=>a.jsx(we.Separator,{ref:n,className:y("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Xe.displayName=we.Separator.displayName;function it({className:e,...t}){return a.jsx("span",{className:y("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",e),...t})}it.displayname="MenubarShortcut";function nm({variant:e}){return a.jsxs(el,{className:"pr-twp tw-border-0 tw-bg-transparent",variant:e,children:[a.jsxs(nr,{children:[a.jsx(vn,{children:"File"}),a.jsxs(xn,{children:[a.jsxs(he,{children:["New Tab ",a.jsx(it,{children:"⌘T"})]}),a.jsxs(he,{children:["New Window ",a.jsx(it,{children:"⌘N"})]}),a.jsx(he,{disabled:!0,children:"New Incognito Window"}),a.jsx(Xe,{}),a.jsxs(ks,{children:[a.jsx(yo,{children:"Share"}),a.jsxs(No,{children:[a.jsx(he,{children:"Email link"}),a.jsx(he,{children:"Messages"}),a.jsx(he,{children:"Notes"})]})]}),a.jsx(Xe,{}),a.jsxs(he,{children:["Print... ",a.jsx(it,{children:"⌘P"})]})]})]}),a.jsxs(nr,{children:[a.jsx(vn,{children:"Edit"}),a.jsxs(xn,{children:[a.jsxs(he,{children:["Undo ",a.jsx(it,{children:"⌘Z"})]}),a.jsxs(he,{children:["Redo ",a.jsx(it,{children:"⇧⌘Z"})]}),a.jsx(Xe,{}),a.jsxs(ks,{children:[a.jsx(yo,{children:"Find"}),a.jsxs(No,{children:[a.jsx(he,{children:"Search the web"}),a.jsx(Xe,{}),a.jsx(he,{children:"Find..."}),a.jsx(he,{children:"Find Next"}),a.jsx(he,{children:"Find Previous"})]})]}),a.jsx(Xe,{}),a.jsx(he,{children:"Cut"}),a.jsx(he,{children:"Copy"}),a.jsx(he,{children:"Paste"})]})]}),a.jsxs(nr,{children:[a.jsx(vn,{children:"View"}),a.jsxs(xn,{children:[a.jsx(jo,{children:"Always Show Bookmarks Bar"}),a.jsx(jo,{checked:!0,children:"Always Show Full URLs"}),a.jsx(Xe,{}),a.jsxs(he,{inset:!0,children:["Reload ",a.jsx(it,{children:"⌘R"})]}),a.jsxs(he,{disabled:!0,inset:!0,children:["Force Reload ",a.jsx(it,{children:"⇧⌘R"})]}),a.jsx(Xe,{}),a.jsx(he,{inset:!0,children:"Toggle Fullscreen"}),a.jsx(Xe,{}),a.jsx(he,{inset:!0,children:"Hide Sidebar"})]})]}),a.jsxs(nr,{children:[a.jsx(vn,{children:"Profiles"}),a.jsxs(xn,{children:[a.jsxs(em,{value:"benoit",children:[a.jsx(sr,{value:"andy",children:"Andy"}),a.jsx(sr,{value:"benoit",children:"Benoit"}),a.jsx(sr,{value:"Luis",children:"Luis"})]}),a.jsx(Xe,{}),a.jsx(he,{inset:!0,children:"Edit..."}),a.jsx(Xe,{}),a.jsx(he,{inset:!0,children:"Add Profile..."})]})]})]})}function rm({menuProvider:e,commandHandler:t,className:n,id:r,children:o,configAreaChildren:s,useAsAppDragArea:i,reserveOSSpecificSpace:l=void 0,menubarVariant:c="default"}){const d=h.useRef(void 0);return a.jsx("div",{className:y("tw-border tw-px-4 tw-text-foreground",{"tw-ps-[85px]":l==="darwin"},{"tw-pe-[calc(138px+1rem)]":l==="win32"||l==="linux"},n),ref:d,style:{position:"relative"},id:r,children:a.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:i?{WebkitAppRegion:"drag"}:void 0,children:[a.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:a.jsx("div",{className:"tw-flex tw-items-center",style:{WebkitAppRegion:"no-drag"},children:e?a.jsxs(a.Fragment,{children:[a.jsx(Zi,{commandHandler:t,containerRef:d,menuProvider:e}),a.jsx(nm,{variant:c})]}):void 0})}),a.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:{WebkitAppRegion:"no-drag"},children:o}),a.jsx("div",{className:"tw-flex tw-grow tw-basis-0 tw-justify-end",children:a.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",style:{WebkitAppRegion:"no-drag"},children:s})})]})})}const om=_t.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),tl=h.forwardRef(({className:e,variant:t,...n},r)=>a.jsx("div",{ref:r,role:"alert",className:y(om({variant:t}),e),...n}));tl.displayName="Alert";const nl=h.forwardRef(({className:e,...t},n)=>a.jsxs("h5",{ref:n,className:y("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",e),...t,children:[t.children," "]}));nl.displayName="AlertTitle";const rl=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:y("tw-text-sm [&_p]:tw-leading-relaxed",e),...t}));rl.displayName="AlertDescription";const ol=_t.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0"}},defaultVariants:{variant:"default"}});function al({className:e,variant:t,...n}){return a.jsx("div",{className:y("pr-twp",ol({variant:t}),e),...n})}const sl=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:y("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",e),...t}));sl.displayName="Card";const il=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:y("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",e),...t}));il.displayName="CardHeader";const ll=h.forwardRef(({className:e,...t},n)=>a.jsx("h3",{ref:n,className:y("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",e),...t,children:t.children}));ll.displayName="CardTitle";const cl=h.forwardRef(({className:e,...t},n)=>a.jsx("p",{ref:n,className:y("pr-twp tw-text-sm tw-text-muted-foreground",e),...t}));cl.displayName="CardDescription";const dl=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:y("pr-twp tw-p-6 tw-pt-0",e),...t}));dl.displayName="CardContent";const ul=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:y("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",e),...t}));ul.displayName="CardFooter";function am({...e}){return a.jsx(Es.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const pl=h.forwardRef(({className:e,...t},n)=>{const r=Ne();return a.jsxs(mn.Root,{ref:n,className:y("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",e),...t,dir:r,children:[a.jsx(mn.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:a.jsx(mn.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),a.jsx(mn.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});pl.displayName=mn.Root.displayName;const wl=h.forwardRef(({className:e,...t},n)=>{const r=Ne();return a.jsx(lo.Root,{className:y("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",e),...t,ref:n,children:a.jsx(lo.Thumb,{className:y("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":r==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":r==="rtl"})})})});wl.displayName=lo.Root.displayName;const sm=Ie.Root,fl=h.forwardRef(({className:e,...t},n)=>{const r=Ne();return a.jsx(Ie.List,{ref:n,className:y("tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t,dir:r})});fl.displayName=Ie.List.displayName;const ml=h.forwardRef(({className:e,...t},n)=>a.jsx(Ie.Trigger,{ref:n,className:y("tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e),...t}));ml.displayName=Ie.Trigger.displayName;const hl=h.forwardRef(({className:e,...t},n)=>a.jsx(Ie.Content,{ref:n,className:y("tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));hl.displayName=Ie.Content.displayName;function im({isInstalling:e,handleClick:t,buttonText:n,className:r,...o}){return a.jsx(pe,{className:y("tw-h-8 tw-rounded-md tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":e,"tw-bg-blue-600":!e,"tw-bg-white tw-text-blue-600 hover:tw-text-white":!n,"tw-w-20":n},r),onClick:t,...o,children:e?a.jsx(tn,{size:15}):a.jsxs(a.Fragment,{children:[a.jsx(J.Download,{size:25,className:y("tw-h-4 tw-w-4",{"tw-mr-1":n})}),n]})})}function lm({isEnabling:e,handleClick:t,className:n,...r}){return a.jsx(pe,{className:y("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":e},n),onClick:t,...r,children:e?a.jsxs(a.Fragment,{children:[a.jsx(tn,{size:15,className:"tw-mr-1 tw-text-white"}),"Enabling..."]}):"Enable"})}function cm({isDisabling:e,handleClick:t,className:n,...r}){return a.jsx(pe,{className:y("tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",{"tw-cursor-not-allowed tw-bg-gray-400":e},n),onClick:t,...r,children:e?a.jsxs(a.Fragment,{children:[a.jsx(tn,{size:15,className:"tw-mr-1 tw-text-black"}),"Disabling..."]}):"Disable"})}function dm({isUpdating:e,handleClick:t,className:n,...r}){return a.jsx(pe,{className:y("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",{"tw-cursor-not-allowed tw-bg-blue-700":e},n),onClick:t,...r,children:e?a.jsxs(a.Fragment,{children:[a.jsx(tn,{size:15,className:"tw-mr-1 tw-text-white"}),"Updating..."]}):"Update"})}function um({id:e,markdown:t,className:n,anchorTarget:r}){const o=h.useMemo(()=>({overrides:{a:{props:{target:r}}}}),[r]);return a.jsx("div",{id:e,className:y("pr-twp tw-prose",n),children:a.jsx(Xl,{options:o,children:t})})}const gl=h.forwardRef((e,t)=>a.jsxs(pe,{ref:t,className:"tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",...e,children:[a.jsx(J.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"}),"Filter",a.jsx(J.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"})]}));var bl=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(bl||{});function pm({id:e,groups:t}){return a.jsx("div",{id:e,children:a.jsxs(vr,{children:[a.jsx(ko,{asChild:!0,children:a.jsx(gl,{})}),a.jsx(Pn,{children:t.map(n=>a.jsxs("div",{children:[a.jsx(In,{children:n.label}),a.jsx(Os,{children:n.items.map(r=>a.jsx("div",{children:r.itemType===0?a.jsx(xr,{onClick:r.onClick,children:r.label}):a.jsx(Eo,{onClick:r.onClick,value:r.label,children:r.label})},r.label))}),a.jsx(Mn,{})]},n.label))})]})})}function wm({id:e,message:t}){return a.jsx("div",{id:e,className:"tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center",children:a.jsx("div",{className:"tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center",children:a.jsx("p",{className:"tw-text-lg tw-text-gray-800",children:t})})})}function fm({id:e,category:t,downloads:n,languages:r,moreInfoUrl:o}){const s=new K.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(n).reduce((l,c)=>l+c,0)),i=()=>{window.scrollTo(0,document.body.scrollHeight)};return a.jsxs("div",{id:e,className:"tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",children:[a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsx("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:a.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:t})}),a.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"CATEGORY"})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsxs("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:[a.jsx(J.User,{className:"tw-mr-1 tw-h-4 tw-w-4"}),a.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:s})]}),a.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"USERS"})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsx("div",{className:"tw-flex tw-items-center",children:r.slice(0,3).map(l=>a.jsx("span",{className:"tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",children:l.toUpperCase()},l))}),r.length>3&&a.jsxs("button",{type:"button",onClick:()=>i(),className:"tw-text-xs tw-text-gray-500 tw-underline",children:["+",r.length-3," more languages"]})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-ml-auto tw-flex tw-flex-col tw-space-y-2",children:[a.jsxs("a",{href:o,target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Website",a.jsx(J.Link,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]}),a.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Support",a.jsx(J.CircleHelp,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]})]})]})}function vl({id:e,versionHistory:t}){const[n,r]=h.useState(!1),o=new Date;function s(l){const c=new Date(l),d=new Date(o.getTime()-c.getTime()),u=d.getUTCFullYear()-1970,f=d.getUTCMonth(),w=d.getUTCDate()-1;let b="";return u>0?b=`${u.toString()} year${u===1?"":"s"} ago`:f>0?b=`${f.toString()} month${f===1?"":"s"} ago`:w===0?b="today":b=`${w.toString()} day${w===1?"":"s"} ago`,b}const i=Object.entries(t).sort((l,c)=>c[0].localeCompare(l[0]));return a.jsxs("div",{id:e,children:[a.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),a.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600",children:(n?i:i.slice(0,5)).map(l=>a.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[a.jsx("div",{className:"tw-text-gray-600",children:a.jsx("li",{className:"tw-prose tw-text-xs",children:a.jsx("span",{children:l[1].description})})}),a.jsxs("div",{className:"tw-justify-end tw-text-right",children:[a.jsxs("div",{children:["Version ",l[0]]}),a.jsx("div",{children:s(l[1].date)})]})]},l[0]))}),i.length>5&&a.jsx("button",{type:"button",onClick:()=>r(!n),className:"tw-text-xs tw-text-gray-500 tw-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function mm({id:e,publisherDisplayName:t,fileSize:n,locales:r,versionHistory:o}){const s=h.useMemo(()=>K.formatBytes(n),[n]),l=(c=>{const d=new Intl.DisplayNames(navigator.language,{type:"language"});return c.map(u=>d.of(u))})(r);return a.jsx("div",{id:e,className:"tw-border-t tw-pb-4 tw-pt-4",children:a.jsxs("div",{className:"tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0",children:[a.jsx(vl,{versionHistory:o}),a.jsx("div",{className:"tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300"}),a.jsxs("div",{className:"tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3",children:[a.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),a.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600",children:[a.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[a.jsx("span",{className:"tw-mb-2",children:"Publisher"}),a.jsx("span",{className:"tw-font-semibold",children:t}),a.jsx("span",{className:"tw-mb-2 tw-mt-4",children:"Size"}),a.jsx("span",{className:"tw-font-semibold",children:s})]}),a.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600",children:a.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[a.jsx("span",{className:"tw-mb-2",children:"Languages"}),a.jsx("span",{className:"tw-font-semibold",children:l.join(", ")})]})})]})]})]})})}function hm({entries:e,getEntriesCount:t,selected:n,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,sortSelected:l,icon:c,className:d,badgesPlaceholder:u}){return a.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[a.jsx(ni,{entries:e,getEntriesCount:t,selected:n,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,sortSelected:l,icon:c,className:d}),n.length>0?a.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:n.map(f=>{var w;return a.jsxs(al,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[a.jsx(pe,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(n.filter(b=>b!==f)),children:a.jsx(J.X,{className:"tw-h-3 tw-w-3"})}),(w=e.find(b=>b.value===f))==null?void 0:w.label]},f)})}):a.jsx(Re,{children:u})]})}const gm=(e,t)=>e[t]??t;function bm({knownUiLanguages:e,primaryLanguage:t="en",fallbackLanguages:n=[],onLanguagesChange:r,onPrimaryLanguageChange:o,onFallbackLanguagesChange:s,localizedStrings:i,className:l}){const c=gm(i,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[d,u]=h.useState(!1),f=b=>{o&&o(b),r&&r([b,...n.filter(x=>x!==b)]),s&&n.find(x=>x===b)&&s([...n.filter(x=>x!==b)]),u(!1)},w=(b,x)=>{var g,j,S,E,k,v;const m=x!==b?((j=(g=e[b])==null?void 0:g.uiNames)==null?void 0:j[x])??((E=(S=e[b])==null?void 0:S.uiNames)==null?void 0:E.en):void 0;return m?`${(k=e[b])==null?void 0:k.autonym} (${m})`:(v=e[b])==null?void 0:v.autonym};return a.jsxs("div",{className:y("pr-twp tw-max-w-sm",l),children:[a.jsxs(St,{name:"uiLanguage",value:t,onValueChange:f,open:d,onOpenChange:b=>u(b),children:[a.jsx(ut,{children:a.jsx(Et,{})}),a.jsx(pt,{className:"tw-z-[250]",children:Object.keys(e).map(b=>a.jsx(De,{value:b,children:w(b,t)},b))})]}),t!=="en"&&a.jsxs(a.Fragment,{children:[a.jsx(Re,{className:"tw-ms-3",children:c}),a.jsx("div",{className:"tw-ms-3",children:a.jsxs(Re,{children:["Currently:"," ",(n==null?void 0:n.length)>0?`${n.map(b=>w(b,t)).join(", ")}`:`default (${e.en.autonym})`]})})]})]})}const vm=(e,t)=>{h.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},ao=()=>!1,xm=(e,t)=>{const[n]=gr(h.useCallback(async()=>{if(!e)return ao;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),ao,{preserveValue:!1});h.useEffect(()=>()=>{n!==ao&&n()},[n])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Es.toast});exports.Alert=tl;exports.AlertDescription=rl;exports.AlertTitle=nl;exports.BOOK_SELECTOR_STRING_KEYS=Rc;exports.Badge=al;exports.BookChapterControl=yc;exports.BookSelectionMode=Us;exports.BookSelector=Oc;exports.Button=pe;exports.Card=sl;exports.CardContent=dl;exports.CardDescription=cl;exports.CardFooter=ul;exports.CardHeader=il;exports.CardTitle=ll;exports.ChapterRangeSelector=Gs;exports.Checkbox=Nr;exports.Checklist=Nd;exports.ComboBox=lr;exports.DataTable=Ks;exports.DisableButton=cm;exports.DropdownMenu=vr;exports.DropdownMenuCheckboxItem=xr;exports.DropdownMenuContent=Pn;exports.DropdownMenuGroup=Os;exports.DropdownMenuItem=So;exports.DropdownMenuItemType=bl;exports.DropdownMenuLabel=In;exports.DropdownMenuPortal=Zl;exports.DropdownMenuRadioGroup=ec;exports.DropdownMenuRadioItem=Eo;exports.DropdownMenuSeparator=Mn;exports.DropdownMenuShortcut=Is;exports.DropdownMenuSub=Ql;exports.DropdownMenuSubContent=Ps;exports.DropdownMenuSubTrigger=_s;exports.DropdownMenuTrigger=ko;exports.EnableButton=lm;exports.Filter=hm;exports.FilterButton=gl;exports.FilterDropdown=pm;exports.Footer=mm;exports.GridMenu=Ji;exports.HamburgerMenuButton=Zi;exports.INVENTORY_STRING_KEYS=zc;exports.IconButton=Zf;exports.Input=Pt;exports.InstallButton=im;exports.Inventory=Lc;exports.Label=Re;exports.MarkdownRenderer=um;exports.MenuItem=pa;exports.MoreInfo=fm;exports.MultiSelectComboBox=ni;exports.NavigationContentSearch=Gc;exports.NoExtensionsFound=wm;exports.Popover=Po;exports.PopoverContent=yr;exports.PopoverTrigger=Io;exports.RadioGroup=_o;exports.RadioGroupItem=ir;exports.ScriptureResultsViewer=gd;exports.ScrollGroupSelector=bd;exports.SearchBar=Lo;exports.Select=St;exports.SelectContent=pt;exports.SelectGroup=qs;exports.SelectItem=De;exports.SelectLabel=Hs;exports.SelectScrollDownButton=Vo;exports.SelectScrollUpButton=zo;exports.SelectSeparator=Xs;exports.SelectTrigger=ut;exports.SelectValue=Et;exports.Separator=kr;exports.SettingsList=vd;exports.SettingsListHeader=yd;exports.SettingsListItem=xd;exports.SettingsSidebar=wi;exports.SettingsSidebarContentSearch=cd;exports.Slider=pl;exports.Sonner=am;exports.Spinner=tn;exports.Switch=wl;exports.Table=$n;exports.TableBody=An;exports.TableCaption=Ws;exports.TableCell=Ct;exports.TableFooter=Ys;exports.TableHead=Ht;exports.TableHeader=Dn;exports.TableRow=nt;exports.Tabs=sm;exports.TabsContent=hl;exports.TabsList=fl;exports.TabsTrigger=ml;exports.TextField=Qf;exports.ToggleGroup=Fo;exports.ToggleGroupItem=yn;exports.Toolbar=rm;exports.UiLanguageSelector=bm;exports.UpdateButton=dm;exports.VersionHistory=vl;exports.VerticalTabs=Go;exports.VerticalTabsContent=qo;exports.VerticalTabsList=Uo;exports.VerticalTabsTrigger=ri;exports.badgeVariants=ol;exports.buttonVariants=Vs;exports.cn=y;exports.getBookNumFromId=Zs;exports.getLinesFromUSFM=Js;exports.getNumberFromUSFM=co;exports.getStatusForItem=Qs;exports.inventoryCountColumn=Ac;exports.inventoryItemColumn=$c;exports.inventoryStatusColumn=Bc;exports.useEvent=vm;exports.useEventAsync=xm;exports.usePromise=gr;function ym(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}ym(`*, ::before, ::after {
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
}/*
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
[hidden]:where(:not([hidden="until-found"])):where(.pr-twp,.pr-twp *) {
  display: none;
}
  /* Adding the preflight selector (pr-twp) to components was not changing the font as desired.
  So this piece of code adds tw-font-sans everywhere we include preflight. */
  .pr-twp {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
  @font-face {
    font-family: 'Inter';
    font-display: 'swap';
    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  }

  /*
   * Theme colors in Platform.Bible. These are applied in CSS properties using \`hsl(var(--varName))\`
   * or Tailwind classes like \`tw-bg-primary\`
   *
   * See the wiki's
   * [Matching Application Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
   * section for more information
   */
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 210 20% 98%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 90%;
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
    --popover: 40 20% 98%;
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
.tw-prose {
  color: var(--tw-prose-body);
  max-width: 65ch;
}
.tw-prose :where(p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.tw-prose :where([class~="lead"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-lead);
  font-size: 1.25em;
  line-height: 1.6;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
}
.tw-prose :where(a):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-links);
  text-decoration: underline;
  font-weight: 500;
}
.tw-prose :where(strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-bold);
  font-weight: 600;
}
.tw-prose :where(a strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(blockquote strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(thead th strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: decimal;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(ol[type="A"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-alpha;
}
.tw-prose :where(ol[type="a"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-alpha;
}
.tw-prose :where(ol[type="A" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-alpha;
}
.tw-prose :where(ol[type="a" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-alpha;
}
.tw-prose :where(ol[type="I"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-roman;
}
.tw-prose :where(ol[type="i"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-roman;
}
.tw-prose :where(ol[type="I" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-roman;
}
.tw-prose :where(ol[type="i" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-roman;
}
.tw-prose :where(ol[type="1"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: decimal;
}
.tw-prose :where(ul):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: disc;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::marker {
  font-weight: 400;
  color: var(--tw-prose-counters);
}
.tw-prose :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::marker {
  color: var(--tw-prose-bullets);
}
.tw-prose :where(dt):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  margin-top: 1.25em;
}
.tw-prose :where(hr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-color: var(--tw-prose-hr);
  border-top-width: 1px;
  margin-top: 3em;
  margin-bottom: 3em;
}
.tw-prose :where(blockquote):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 500;
  font-style: italic;
  color: var(--tw-prose-quotes);
  border-inline-start-width: 0.25rem;
  border-inline-start-color: var(--tw-prose-quote-borders);
  quotes: "0o201C""0o201D""0o2018""0o2019";
  margin-top: 1.6em;
  margin-bottom: 1.6em;
  padding-inline-start: 1em;
}
.tw-prose :where(blockquote p:first-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: open-quote;
}
.tw-prose :where(blockquote p:last-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: close-quote;
}
.tw-prose :where(h1):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 800;
  font-size: 2.25em;
  margin-top: 0;
  margin-bottom: 0.8888889em;
  line-height: 1.1111111;
}
.tw-prose :where(h1 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 900;
  color: inherit;
}
.tw-prose :where(h2):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 700;
  font-size: 1.5em;
  margin-top: 2em;
  margin-bottom: 1em;
  line-height: 1.3333333;
}
.tw-prose :where(h2 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 800;
  color: inherit;
}
.tw-prose :where(h3):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  font-size: 1.25em;
  margin-top: 1.6em;
  margin-bottom: 0.6em;
  line-height: 1.6;
}
.tw-prose :where(h3 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 700;
  color: inherit;
}
.tw-prose :where(h4):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: 1.5;
}
.tw-prose :where(h4 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 700;
  color: inherit;
}
.tw-prose :where(img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(picture):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  display: block;
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(video):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(kbd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 500;
  font-family: inherit;
  color: var(--tw-prose-kbd);
  box-shadow: 0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);
  font-size: 0.875em;
  border-radius: 0.3125rem;
  padding-top: 0.1875em;
  padding-inline-end: 0.375em;
  padding-bottom: 0.1875em;
  padding-inline-start: 0.375em;
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-code);
  font-weight: 600;
  font-size: 0.875em;
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: "\`";
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: "\`";
}
.tw-prose :where(a code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(h1 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(h2 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
  font-size: 0.875em;
}
.tw-prose :where(h3 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
  font-size: 0.9em;
}
.tw-prose :where(h4 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(blockquote code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(thead th code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(pre):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-pre-code);
  background-color: var(--tw-prose-pre-bg);
  overflow-x: auto;
  font-weight: 400;
  font-size: 0.875em;
  line-height: 1.7142857;
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
  border-radius: 0.375rem;
  padding-top: 0.8571429em;
  padding-inline-end: 1.1428571em;
  padding-bottom: 0.8571429em;
  padding-inline-start: 1.1428571em;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  background-color: transparent;
  border-width: 0;
  border-radius: 0;
  padding: 0;
  font-weight: inherit;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: none;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: none;
}
.tw-prose :where(table):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  width: 100%;
  table-layout: auto;
  margin-top: 2em;
  margin-bottom: 2em;
  font-size: 0.875em;
  line-height: 1.7142857;
}
.tw-prose :where(thead):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: var(--tw-prose-th-borders);
}
.tw-prose :where(thead th):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  vertical-align: bottom;
  padding-inline-end: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-inline-start: 0.5714286em;
}
.tw-prose :where(tbody tr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: var(--tw-prose-td-borders);
}
.tw-prose :where(tbody tr:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 0;
}
.tw-prose :where(tbody td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  vertical-align: baseline;
}
.tw-prose :where(tfoot):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-top-width: 1px;
  border-top-color: var(--tw-prose-th-borders);
}
.tw-prose :where(tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  vertical-align: top;
}
.tw-prose :where(th, td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  text-align: start;
}
.tw-prose :where(figure > *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose :where(figcaption):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-captions);
  font-size: 0.875em;
  line-height: 1.4285714;
  margin-top: 0.8571429em;
}
.tw-prose {
  --tw-prose-body: #374151;
  --tw-prose-headings: #111827;
  --tw-prose-lead: #4b5563;
  --tw-prose-links: #111827;
  --tw-prose-bold: #111827;
  --tw-prose-counters: #6b7280;
  --tw-prose-bullets: #d1d5db;
  --tw-prose-hr: #e5e7eb;
  --tw-prose-quotes: #111827;
  --tw-prose-quote-borders: #e5e7eb;
  --tw-prose-captions: #6b7280;
  --tw-prose-kbd: #111827;
  --tw-prose-kbd-shadows: 17 24 39;
  --tw-prose-code: #111827;
  --tw-prose-pre-code: #e5e7eb;
  --tw-prose-pre-bg: #1f2937;
  --tw-prose-th-borders: #d1d5db;
  --tw-prose-td-borders: #e5e7eb;
  --tw-prose-invert-body: #d1d5db;
  --tw-prose-invert-headings: #fff;
  --tw-prose-invert-lead: #9ca3af;
  --tw-prose-invert-links: #fff;
  --tw-prose-invert-bold: #fff;
  --tw-prose-invert-counters: #9ca3af;
  --tw-prose-invert-bullets: #4b5563;
  --tw-prose-invert-hr: #374151;
  --tw-prose-invert-quotes: #f3f4f6;
  --tw-prose-invert-quote-borders: #374151;
  --tw-prose-invert-captions: #9ca3af;
  --tw-prose-invert-kbd: #fff;
  --tw-prose-invert-kbd-shadows: 255 255 255;
  --tw-prose-invert-code: #fff;
  --tw-prose-invert-pre-code: #d1d5db;
  --tw-prose-invert-pre-bg: rgb(0 0 0 / 50%);
  --tw-prose-invert-th-borders: #4b5563;
  --tw-prose-invert-td-borders: #374151;
  font-size: 1rem;
  line-height: 1.75;
}
.tw-prose :where(picture > img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose :where(li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.tw-prose :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.375em;
}
.tw-prose :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.375em;
}
.tw-prose :where(.tw-prose > ul > li p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.tw-prose :where(.tw-prose > ul > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
}
.tw-prose :where(.tw-prose > ul > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.25em;
}
.tw-prose :where(.tw-prose > ol > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
}
.tw-prose :where(.tw-prose > ol > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.25em;
}
.tw-prose :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.tw-prose :where(dl):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.tw-prose :where(dd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(hr + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h2 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h3 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h4 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(thead th:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose :where(thead th:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose :where(tbody td, tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-top: 0.5714286em;
  padding-inline-end: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-inline-start: 0.5714286em;
}
.tw-prose :where(tbody td:first-child, tfoot td:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose :where(tbody td:last-child, tfoot td:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose :where(figure):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(.tw-prose > :first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(.tw-prose > :last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 0;
}
.tw-sr-only {
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
.tw-pointer-events-none {
  pointer-events: none;
}
.tw-fixed {
  position: fixed;
}
.tw-absolute {
  position: absolute;
}
.tw-relative {
  position: relative;
}
.tw-sticky {
  position: sticky;
}
.tw-inset-0 {
  inset: 0px;
}
.tw-inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.tw-bottom-2 {
  bottom: 0.5rem;
}
.tw-left-0 {
  left: 0px;
}
.tw-left-2 {
  left: 0.5rem;
}
.tw-left-3 {
  left: 0.75rem;
}
.tw-left-4 {
  left: 1rem;
}
.tw-left-\\[50\\%\\] {
  left: 50%;
}
.tw-right-0 {
  right: 0px;
}
.tw-right-1 {
  right: 0.25rem;
}
.tw-right-3 {
  right: 0.75rem;
}
.tw-right-4 {
  right: 1rem;
}
.tw-start-2 {
  inset-inline-start: 0.5rem;
}
.tw-top-0 {
  top: 0px;
}
.tw-top-1\\.5 {
  top: 0.375rem;
}
.tw-top-1\\/2 {
  top: 50%;
}
.tw-top-2\\.5 {
  top: 0.625rem;
}
.tw-top-3\\.5 {
  top: 0.875rem;
}
.tw-top-4 {
  top: 1rem;
}
.tw-top-\\[-1px\\] {
  top: -1px;
}
.tw-top-\\[50\\%\\] {
  top: 50%;
}
.tw-z-10 {
  z-index: 10;
}
.tw-z-20 {
  z-index: 20;
}
.tw-z-30 {
  z-index: 30;
}
.tw-z-50 {
  z-index: 50;
}
.tw-z-\\[1000\\] {
  z-index: 1000;
}
.tw-z-\\[250\\] {
  z-index: 250;
}
.tw-col-span-2 {
  grid-column: span 2 / span 2;
}
.tw-m-1 {
  margin: 0.25rem;
}
.tw-m-2 {
  margin: 0.5rem;
}
.tw-m-4 {
  margin: 1rem;
}
.tw--mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
.tw-mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.tw-mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.tw-mx-3\\.5 {
  margin-left: 0.875rem;
  margin-right: 0.875rem;
}
.tw-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.tw-my-2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.tw-my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.tw-mb-1 {
  margin-bottom: 0.25rem;
}
.tw-mb-2 {
  margin-bottom: 0.5rem;
}
.tw-mb-20 {
  margin-bottom: 5rem;
}
.tw-me-2 {
  margin-inline-end: 0.5rem;
}
.tw-me-4 {
  margin-inline-end: 1rem;
}
.tw-ml-1 {
  margin-left: 0.25rem;
}
.tw-ml-2 {
  margin-left: 0.5rem;
}
.tw-ml-auto {
  margin-left: auto;
}
.tw-mr-1 {
  margin-right: 0.25rem;
}
.tw-mr-2 {
  margin-right: 0.5rem;
}
.tw-ms-1 {
  margin-inline-start: 0.25rem;
}
.tw-ms-2 {
  margin-inline-start: 0.5rem;
}
.tw-ms-3 {
  margin-inline-start: 0.75rem;
}
.tw-ms-5 {
  margin-inline-start: 1.25rem;
}
.tw-ms-auto {
  margin-inline-start: auto;
}
.tw-mt-1 {
  margin-top: 0.25rem;
}
.tw-mt-2 {
  margin-top: 0.5rem;
}
.tw-mt-20 {
  margin-top: 5rem;
}
.tw-mt-3 {
  margin-top: 0.75rem;
}
.tw-mt-4 {
  margin-top: 1rem;
}
.tw-mt-auto {
  margin-top: auto;
}
.tw-box-border {
  box-sizing: border-box;
}
.tw-box-content {
  box-sizing: content-box;
}
.tw-block {
  display: block;
}
.tw-inline-block {
  display: inline-block;
}
.tw-inline {
  display: inline;
}
.tw-flex {
  display: flex;
}
.tw-inline-flex {
  display: inline-flex;
}
.tw-grid {
  display: grid;
}
.tw-inline-grid {
  display: inline-grid;
}
.tw-hidden {
  display: none;
}
.tw-aspect-square {
  aspect-ratio: 1 / 1;
}
.tw-size-4 {
  width: 1rem;
  height: 1rem;
}
.tw-h-1\\/2 {
  height: 50%;
}
.tw-h-10 {
  height: 2.5rem;
}
.tw-h-11 {
  height: 2.75rem;
}
.tw-h-12 {
  height: 3rem;
}
.tw-h-14 {
  height: 3.5rem;
}
.tw-h-2 {
  height: 0.5rem;
}
.tw-h-2\\.5 {
  height: 0.625rem;
}
.tw-h-20 {
  height: 5rem;
}
.tw-h-24 {
  height: 6rem;
}
.tw-h-3 {
  height: 0.75rem;
}
.tw-h-3\\.5 {
  height: 0.875rem;
}
.tw-h-4 {
  height: 1rem;
}
.tw-h-40 {
  height: 10rem;
}
.tw-h-5 {
  height: 1.25rem;
}
.tw-h-6 {
  height: 1.5rem;
}
.tw-h-7 {
  height: 1.75rem;
}
.tw-h-8 {
  height: 2rem;
}
.tw-h-9 {
  height: 2.25rem;
}
.tw-h-96 {
  height: 24rem;
}
.tw-h-\\[1\\.2rem\\] {
  height: 1.2rem;
}
.tw-h-\\[100\\%\\] {
  height: 100%;
}
.tw-h-\\[1px\\] {
  height: 1px;
}
.tw-h-\\[405px\\] {
  height: 405px;
}
.tw-h-\\[5px\\] {
  height: 5px;
}
.tw-h-\\[var\\(--radix-select-trigger-height\\)\\] {
  height: var(--radix-select-trigger-height);
}
.tw-h-full {
  height: 100%;
}
.tw-h-px {
  height: 1px;
}
.tw-h-screen {
  height: 100vh;
}
.tw-h-svh {
  height: 100svh;
}
.tw-max-h-80 {
  max-height: 20rem;
}
.tw-max-h-96 {
  max-height: 24rem;
}
.tw-max-h-\\[300px\\] {
  max-height: 300px;
}
.tw-min-h-0 {
  min-height: 0px;
}
.tw-min-h-svh {
  min-height: 100svh;
}
.tw-w-0 {
  width: 0px;
}
.tw-w-1\\/3 {
  width: 33.333333%;
}
.tw-w-10 {
  width: 2.5rem;
}
.tw-w-11 {
  width: 2.75rem;
}
.tw-w-14 {
  width: 3.5rem;
}
.tw-w-2 {
  width: 0.5rem;
}
.tw-w-2\\.5 {
  width: 0.625rem;
}
.tw-w-20 {
  width: 5rem;
}
.tw-w-3 {
  width: 0.75rem;
}
.tw-w-3\\.5 {
  width: 0.875rem;
}
.tw-w-3\\/4 {
  width: 75%;
}
.tw-w-4 {
  width: 1rem;
}
.tw-w-5 {
  width: 1.25rem;
}
.tw-w-6 {
  width: 1.5rem;
}
.tw-w-64 {
  width: 16rem;
}
.tw-w-7 {
  width: 1.75rem;
}
.tw-w-72 {
  width: 18rem;
}
.tw-w-8 {
  width: 2rem;
}
.tw-w-9 {
  width: 2.25rem;
}
.tw-w-9\\/12 {
  width: 75%;
}
.tw-w-96 {
  width: 24rem;
}
.tw-w-\\[--sidebar-width\\] {
  width: var(--sidebar-width);
}
.tw-w-\\[1\\.2rem\\] {
  width: 1.2rem;
}
.tw-w-\\[100px\\] {
  width: 100px;
}
.tw-w-\\[116px\\] {
  width: 116px;
}
.tw-w-\\[124px\\] {
  width: 124px;
}
.tw-w-\\[150px\\] {
  width: 150px;
}
.tw-w-\\[1px\\] {
  width: 1px;
}
.tw-w-\\[200px\\] {
  width: 200px;
}
.tw-w-\\[300px\\] {
  width: 300px;
}
.tw-w-\\[350px\\] {
  width: 350px;
}
.tw-w-\\[400px\\] {
  width: 400px;
}
.tw-w-\\[46px\\] {
  width: 46px;
}
.tw-w-\\[5px\\] {
  width: 5px;
}
.tw-w-\\[70px\\] {
  width: 70px;
}
.tw-w-auto {
  width: auto;
}
.tw-w-full {
  width: 100%;
}
.tw-min-w-0 {
  min-width: 0px;
}
.tw-min-w-5 {
  min-width: 1.25rem;
}
.tw-min-w-72 {
  min-width: 18rem;
}
.tw-min-w-\\[12rem\\] {
  min-width: 12rem;
}
.tw-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.tw-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
}
.tw-max-w-64 {
  max-width: 16rem;
}
.tw-max-w-\\[--skeleton-width\\] {
  max-width: var(--skeleton-width);
}
.tw-max-w-lg {
  max-width: 32rem;
}
.tw-max-w-sm {
  max-width: 24rem;
}
.tw-flex-1 {
  flex: 1 1 0%;
}
.tw-flex-shrink-0 {
  flex-shrink: 0;
}
.tw-shrink-0 {
  flex-shrink: 0;
}
.tw-flex-grow {
  flex-grow: 1;
}
.tw-grow {
  flex-grow: 1;
}
.tw-basis-0 {
  flex-basis: 0px;
}
.tw-caption-bottom {
  caption-side: bottom;
}
.tw--translate-x-1\\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-x-px {
  --tw-translate-x: -1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-\\[-50\\%\\] {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-px {
  --tw-translate-x: 1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-y-\\[-50\\%\\] {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-rotate-0 {
  --tw-rotate: 0deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-rotate-90 {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-scale-0 {
  --tw-scale-x: 0;
  --tw-scale-y: 0;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-scale-100 {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes tw-pulse {

  50% {
    opacity: .5;
  }
}
.tw-animate-pulse {
  animation: tw-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes tw-spin {

  to {
    transform: rotate(360deg);
  }
}
.tw-animate-spin {
  animation: tw-spin 1s linear infinite;
}
.tw-cursor-default {
  cursor: default;
}
.tw-cursor-not-allowed {
  cursor: not-allowed;
}
.tw-cursor-pointer {
  cursor: pointer;
}
.tw-touch-none {
  touch-action: none;
}
.tw-select-none {
  user-select: none;
}
.tw-resize {
  resize: both;
}
.tw-list-disc {
  list-style-type: disc;
}
.tw-columns-2 {
  columns: 2;
}
.tw-auto-rows-max {
  grid-auto-rows: max-content;
}
.tw-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.tw-grid-cols-\\[25\\%\\,25\\%\\,50\\%\\] {
  grid-template-columns: 25% 25% 50%;
}
.tw-grid-cols-\\[25\\%\\,50\\%\\,25\\%\\] {
  grid-template-columns: 25% 50% 25%;
}
.tw-flex-row {
  flex-direction: row;
}
.tw-flex-col {
  flex-direction: column;
}
.tw-flex-col-reverse {
  flex-direction: column-reverse;
}
.tw-flex-wrap {
  flex-wrap: wrap;
}
.tw-items-start {
  align-items: flex-start;
}
.tw-items-center {
  align-items: center;
}
.tw-items-stretch {
  align-items: stretch;
}
.tw-justify-start {
  justify-content: flex-start;
}
.tw-justify-end {
  justify-content: flex-end;
}
.tw-justify-center {
  justify-content: center;
}
.tw-justify-between {
  justify-content: space-between;
}
.tw-gap-0\\.5 {
  gap: 0.125rem;
}
.tw-gap-1 {
  gap: 0.25rem;
}
.tw-gap-1\\.5 {
  gap: 0.375rem;
}
.tw-gap-2 {
  gap: 0.5rem;
}
.tw-gap-2\\.5 {
  gap: 0.625rem;
}
.tw-gap-3 {
  gap: 0.75rem;
}
.tw-gap-4 {
  gap: 1rem;
}
.tw-gap-6 {
  gap: 1.5rem;
}
.tw-gap-x-2 {
  column-gap: 0.5rem;
}
.tw-gap-x-4 {
  column-gap: 1rem;
}
.tw-space-x-0 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0px * var(--tw-space-x-reverse));
  margin-left: calc(0px * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.25rem * var(--tw-space-x-reverse));
  margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1.5rem * var(--tw-space-x-reverse));
  margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}
.tw-space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.375rem * var(--tw-space-y-reverse));
}
.tw-space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.tw-space-y-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}
.tw-space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
.tw-self-stretch {
  align-self: stretch;
}
.tw-overflow-auto {
  overflow: auto;
}
.tw-overflow-hidden {
  overflow: hidden;
}
.tw-overflow-y-auto {
  overflow-y: auto;
}
.tw-overflow-x-hidden {
  overflow-x: hidden;
}
.tw-overflow-y-hidden {
  overflow-y: hidden;
}
.tw-text-ellipsis {
  text-overflow: ellipsis;
}
.tw-whitespace-normal {
  white-space: normal;
}
.tw-whitespace-nowrap {
  white-space: nowrap;
}
.tw-text-nowrap {
  text-wrap: nowrap;
}
.tw-text-balance {
  text-wrap: balance;
}
.tw-break-words {
  overflow-wrap: break-word;
}
.tw-rounded {
  border-radius: 0.25rem;
}
.tw-rounded-full {
  border-radius: 9999px;
}
.tw-rounded-lg {
  border-radius: var(--radius);
}
.tw-rounded-md {
  border-radius: calc(var(--radius) - 2px);
}
.tw-rounded-none {
  border-radius: 0px;
}
.tw-rounded-sm {
  border-radius: calc(var(--radius) - 4px);
}
.tw-rounded-s-md {
  border-start-start-radius: calc(var(--radius) - 2px);
  border-end-start-radius: calc(var(--radius) - 2px);
}
.tw-rounded-ee-none {
  border-end-end-radius: 0px;
}
.tw-rounded-se-md {
  border-start-end-radius: calc(var(--radius) - 2px);
}
.tw-rounded-ss-none {
  border-start-start-radius: 0px;
}
.tw-border {
  border-width: 1px;
}
.tw-border-0 {
  border-width: 0px;
}
.tw-border-2 {
  border-width: 2px;
}
.tw-border-b {
  border-bottom-width: 1px;
}
.tw-border-b-0 {
  border-bottom-width: 0px;
}
.tw-border-e {
  border-inline-end-width: 1px;
}
.tw-border-e-0 {
  border-inline-end-width: 0px;
}
.tw-border-l {
  border-left-width: 1px;
}
.tw-border-s-2 {
  border-inline-start-width: 2px;
}
.tw-border-t {
  border-top-width: 1px;
}
.tw-border-t-0 {
  border-top-width: 0px;
}
.tw-border-solid {
  border-style: solid;
}
.tw-border-dashed {
  border-style: dashed;
}
.tw-border-\\[\\#22ac32\\] {
  --tw-border-opacity: 1;
  border-color: rgb(34 172 50 / var(--tw-border-opacity, 1));
}
.tw-border-\\[\\#df4744\\] {
  --tw-border-opacity: 1;
  border-color: rgb(223 71 68 / var(--tw-border-opacity, 1));
}
.tw-border-\\[\\#e0a035\\] {
  --tw-border-opacity: 1;
  border-color: rgb(224 160 53 / var(--tw-border-opacity, 1));
}
.tw-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity, 1));
}
.tw-border-blue-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity, 1));
}
.tw-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.tw-border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));
}
.tw-border-gray-400 {
  --tw-border-opacity: 1;
  border-color: rgb(156 163 175 / var(--tw-border-opacity, 1));
}
.tw-border-input {
  border-color: hsl(var(--input));
}
.tw-border-primary {
  border-color: hsl(var(--primary));
}
.tw-border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity, 1));
}
.tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
.tw-border-transparent {
  border-color: transparent;
}
.tw-border-s-indigo-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(199 210 254 / var(--tw-border-opacity, 1));
}
.tw-border-s-purple-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(233 213 255 / var(--tw-border-opacity, 1));
}
.tw-border-s-red-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(254 202 202 / var(--tw-border-opacity, 1));
}
.tw-bg-\\[\\#36c84b\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(54 200 75 / var(--tw-bg-opacity, 1));
}
.tw-bg-\\[\\#f25450\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(242 84 80 / var(--tw-bg-opacity, 1));
}
.tw-bg-\\[\\#fdbb40\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(253 187 64 / var(--tw-bg-opacity, 1));
}
.tw-bg-accent {
  background-color: hsl(var(--accent));
}
.tw-bg-accent-foreground {
  background-color: hsl(var(--accent-foreground));
}
.tw-bg-amber-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity, 1));
}
.tw-bg-amber-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(253 230 138 / var(--tw-bg-opacity, 1));
}
.tw-bg-amber-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 251 235 / var(--tw-bg-opacity, 1));
}
.tw-bg-background {
  background-color: hsl(var(--background));
}
.tw-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.tw-bg-blue-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity, 1));
}
.tw-bg-border {
  background-color: hsl(var(--border));
}
.tw-bg-card {
  background-color: hsl(var(--card));
}
.tw-bg-card-foreground {
  background-color: hsl(var(--card-foreground));
}
.tw-bg-destructive {
  background-color: hsl(var(--destructive));
}
.tw-bg-destructive-foreground {
  background-color: hsl(var(--destructive-foreground));
}
.tw-bg-foreground {
  background-color: hsl(var(--foreground));
}
.tw-bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity, 1));
}
.tw-bg-input {
  background-color: hsl(var(--input));
}
.tw-bg-muted {
  background-color: hsl(var(--muted));
}
.tw-bg-muted-foreground {
  background-color: hsl(var(--muted-foreground));
}
.tw-bg-muted\\/40 {
  background-color: hsl(var(--muted) / 0.4);
}
.tw-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.tw-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity, 1));
}
.tw-bg-popover {
  background-color: hsl(var(--popover));
}
.tw-bg-popover-foreground {
  background-color: hsl(var(--popover-foreground));
}
.tw-bg-primary {
  background-color: hsl(var(--primary));
}
.tw-bg-primary-foreground {
  background-color: hsl(var(--primary-foreground));
}
.tw-bg-ring {
  background-color: hsl(var(--ring));
}
.tw-bg-secondary {
  background-color: hsl(var(--secondary));
}
.tw-bg-secondary-foreground {
  background-color: hsl(var(--secondary-foreground));
}
.tw-bg-sidebar {
  background-color: hsl(var(--sidebar-background));
}
.tw-bg-sidebar-border {
  background-color: hsl(var(--sidebar-border));
}
.tw-bg-slate-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(241 245 249 / var(--tw-bg-opacity, 1));
}
.tw-bg-transparent {
  background-color: transparent;
}
.tw-bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-zinc-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(161 161 170 / var(--tw-bg-opacity, 1));
}
.tw-bg-none {
  background-image: none;
}
.tw-fill-current {
  fill: currentColor;
}
.tw-p-0 {
  padding: 0px;
}
.tw-p-1 {
  padding: 0.25rem;
}
.tw-p-2 {
  padding: 0.5rem;
}
.tw-p-3 {
  padding: 0.75rem;
}
.tw-p-4 {
  padding: 1rem;
}
.tw-p-6 {
  padding: 1.5rem;
}
.tw-p-8 {
  padding: 2rem;
}
.tw-p-\\[1px\\] {
  padding: 1px;
}
.tw-px-0 {
  padding-left: 0px;
  padding-right: 0px;
}
.tw-px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
.tw-px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.tw-px-2\\.5 {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.tw-px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.tw-px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.tw-px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.tw-px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.tw-px-7 {
  padding-left: 1.75rem;
  padding-right: 1.75rem;
}
.tw-px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.tw-py-0\\.5 {
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
}
.tw-py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.tw-py-1\\.5 {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.tw-py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.tw-py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.tw-py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.tw-py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.tw-py-\\[1px\\] {
  padding-top: 1px;
  padding-bottom: 1px;
}
.tw-pb-2 {
  padding-bottom: 0.5rem;
}
.tw-pb-3 {
  padding-bottom: 0.75rem;
}
.tw-pb-4 {
  padding-bottom: 1rem;
}
.tw-pe-2 {
  padding-inline-end: 0.5rem;
}
.tw-pe-9 {
  padding-inline-end: 2.25rem;
}
.tw-pe-\\[calc\\(138px\\+1rem\\)\\] {
  padding-inline-end: calc(138px + 1rem);
}
.tw-pl-1 {
  padding-left: 0.25rem;
}
.tw-pl-3 {
  padding-left: 0.75rem;
}
.tw-pl-4 {
  padding-left: 1rem;
}
.tw-pl-5 {
  padding-left: 1.25rem;
}
.tw-pl-8 {
  padding-left: 2rem;
}
.tw-pr-0 {
  padding-right: 0px;
}
.tw-pr-2 {
  padding-right: 0.5rem;
}
.tw-pr-3 {
  padding-right: 0.75rem;
}
.tw-pr-4 {
  padding-right: 1rem;
}
.tw-ps-12 {
  padding-inline-start: 3rem;
}
.tw-ps-3 {
  padding-inline-start: 0.75rem;
}
.tw-ps-4 {
  padding-inline-start: 1rem;
}
.tw-ps-8 {
  padding-inline-start: 2rem;
}
.tw-ps-9 {
  padding-inline-start: 2.25rem;
}
.tw-ps-\\[85px\\] {
  padding-inline-start: 85px;
}
.tw-pt-0 {
  padding-top: 0px;
}
.tw-pt-3 {
  padding-top: 0.75rem;
}
.tw-pt-4 {
  padding-top: 1rem;
}
.tw-text-left {
  text-align: left;
}
.tw-text-center {
  text-align: center;
}
.tw-text-right {
  text-align: right;
}
.tw-text-start {
  text-align: start;
}
.tw-text-end {
  text-align: end;
}
.tw-align-middle {
  vertical-align: middle;
}
.tw-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.tw-text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.tw-text-5xl {
  font-size: 3rem;
  line-height: 1;
}
.tw-text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.tw-text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.tw-text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.tw-text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.tw-font-bold {
  font-weight: 700;
}
.tw-font-medium {
  font-weight: 500;
}
.tw-font-normal {
  font-weight: 400;
}
.tw-font-semibold {
  font-weight: 600;
}
.tw-uppercase {
  text-transform: uppercase;
}
.tw-capitalize {
  text-transform: capitalize;
}
.tw-not-italic {
  font-style: normal;
}
.tw-tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
.tw-leading-9 {
  line-height: 2.25rem;
}
.tw-leading-none {
  line-height: 1;
}
.tw-leading-relaxed {
  line-height: 1.625;
}
.tw-tracking-tight {
  letter-spacing: -0.025em;
}
.tw-tracking-widest {
  letter-spacing: 0.1em;
}
.tw-text-accent-foreground {
  color: hsl(var(--accent-foreground));
}
.tw-text-amber-800 {
  --tw-text-opacity: 1;
  color: rgb(146 64 14 / var(--tw-text-opacity, 1));
}
.tw-text-amber-900 {
  --tw-text-opacity: 1;
  color: rgb(120 53 15 / var(--tw-text-opacity, 1));
}
.tw-text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity, 1));
}
.tw-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}
.tw-text-card-foreground {
  color: hsl(var(--card-foreground));
}
.tw-text-current {
  color: currentColor;
}
.tw-text-destructive {
  color: hsl(var(--destructive));
}
.tw-text-destructive-foreground {
  color: hsl(var(--destructive-foreground));
}
.tw-text-foreground {
  color: hsl(var(--foreground));
}
.tw-text-foreground\\/80 {
  color: hsl(var(--foreground) / 0.8);
}
.tw-text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity, 1));
}
.tw-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
.tw-text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}
.tw-text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}
.tw-text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity, 1));
}
.tw-text-gray-900 {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity, 1));
}
.tw-text-inherit {
  color: inherit;
}
.tw-text-muted-foreground {
  color: hsl(var(--muted-foreground));
}
.tw-text-popover-foreground {
  color: hsl(var(--popover-foreground));
}
.tw-text-primary {
  color: hsl(var(--primary));
}
.tw-text-primary-foreground {
  color: hsl(var(--primary-foreground));
}
.tw-text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity, 1));
}
.tw-text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity, 1));
}
.tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}
.tw-text-sidebar-foreground {
  color: hsl(var(--sidebar-foreground));
}
.tw-text-sidebar-foreground\\/70 {
  color: hsl(var(--sidebar-foreground) / 0.7);
}
.tw-text-slate-900 {
  --tw-text-opacity: 1;
  color: rgb(15 23 42 / var(--tw-text-opacity, 1));
}
.tw-text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-900 {
  --tw-text-opacity: 1;
  color: rgb(113 63 18 / var(--tw-text-opacity, 1));
}
.tw-underline {
  text-decoration-line: underline;
}
.tw-underline-offset-4 {
  text-underline-offset: 4px;
}
.tw-opacity-0 {
  opacity: 0;
}
.tw-opacity-100 {
  opacity: 1;
}
.tw-opacity-50 {
  opacity: 0.5;
}
.tw-opacity-60 {
  opacity: 0.6;
}
.tw-opacity-70 {
  opacity: 0.7;
}
.tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-border\\)\\)\\] {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-border));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-none {
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.tw-ring-0 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.tw-ring-sidebar-ring {
  --tw-ring-color: hsl(var(--sidebar-ring));
}
.tw-ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background));
}
.tw-drop-shadow-sm {
  --tw-drop-shadow: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.tw-transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[left\\,right\\,width\\] {
  transition-property: left,right,width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[margin\\,opa\\] {
  transition-property: margin,opa;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[width\\,height\\,padding\\] {
  transition-property: width,height,padding;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[width\\] {
  transition-property: width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-duration-200 {
  transition-duration: 200ms;
}
.tw-duration-300 {
  transition-duration: 300ms;
}
.tw-duration-500 {
  transition-duration: 500ms;
}
.tw-ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.tw-ease-linear {
  transition-timing-function: linear;
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
.tw-animate-in {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.tw-fade-in-0 {
  --tw-enter-opacity: 0;
}
.tw-zoom-in-95 {
  --tw-enter-scale: .95;
}
.tw-duration-200 {
  animation-duration: 200ms;
}
.tw-duration-300 {
  animation-duration: 300ms;
}
.tw-duration-500 {
  animation-duration: 500ms;
}
.tw-ease-in-out {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.tw-ease-linear {
  animation-timing-function: linear;
}

/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css */

/* #endregion */

.\\*\\:tw-m-4 > * {
  margin: 1rem;
}

.file\\:tw-border-0::file-selector-button {
  border-width: 0px;
}

.file\\:tw-bg-transparent::file-selector-button {
  background-color: transparent;
}

.file\\:tw-text-sm::file-selector-button {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.file\\:tw-font-medium::file-selector-button {
  font-weight: 500;
}

.file\\:tw-text-foreground::file-selector-button {
  color: hsl(var(--foreground));
}

.placeholder\\:tw-text-muted-foreground::placeholder {
  color: hsl(var(--muted-foreground));
}

.after\\:tw-absolute::after {
  content: var(--tw-content);
  position: absolute;
}

.after\\:tw--inset-2::after {
  content: var(--tw-content);
  inset: -0.5rem;
}

.after\\:tw-inset-y-0::after {
  content: var(--tw-content);
  top: 0px;
  bottom: 0px;
}

.after\\:tw-left-1\\/2::after {
  content: var(--tw-content);
  left: 50%;
}

.after\\:tw-w-\\[2px\\]::after {
  content: var(--tw-content);
  width: 2px;
}

.hover\\:tw-border-blue-600:hover {
  --tw-border-opacity: 1;
  border-color: rgb(37 99 235 / var(--tw-border-opacity, 1));
}

.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
}

.hover\\:tw-bg-blue-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity, 1));
}

.hover\\:tw-bg-destructive\\/80:hover {
  background-color: hsl(var(--destructive) / 0.8);
}

.hover\\:tw-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}

.hover\\:tw-bg-gray-300:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity, 1));
}

.hover\\:tw-bg-gray-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity, 1));
}

.hover\\:tw-bg-muted:hover {
  background-color: hsl(var(--muted));
}

.hover\\:tw-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
}

.hover\\:tw-bg-muted\\/80:hover {
  background-color: hsl(var(--muted) / 0.8);
}

.hover\\:tw-bg-primary\\/80:hover {
  background-color: hsl(var(--primary) / 0.8);
}

.hover\\:tw-bg-primary\\/90:hover {
  background-color: hsl(var(--primary) / 0.9);
}

.hover\\:tw-bg-red-600:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(220 38 38 / var(--tw-bg-opacity, 1));
}

.hover\\:tw-bg-secondary\\/80:hover {
  background-color: hsl(var(--secondary) / 0.8);
}

.hover\\:tw-bg-sidebar-accent:hover {
  background-color: hsl(var(--sidebar-accent));
}

.hover\\:tw-bg-transparent:hover {
  background-color: transparent;
}

.hover\\:tw-bg-white:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}

.hover\\:tw-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}

.hover\\:tw-text-blue-600:hover {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}

.hover\\:tw-text-foreground:hover {
  color: hsl(var(--foreground));
}

.hover\\:tw-text-gray-900:hover {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity, 1));
}

.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}

.hover\\:tw-text-sidebar-accent-foreground:hover {
  color: hsl(var(--sidebar-accent-foreground));
}

.hover\\:tw-text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}

.hover\\:tw-underline:hover {
  text-decoration-line: underline;
}

.hover\\:tw-opacity-100:hover {
  opacity: 1;
}

.hover\\:tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-accent\\)\\)\\]:hover {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-accent));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\\:tw-shadow-sm:hover {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\\:after\\:tw-bg-sidebar-border:hover::after {
  content: var(--tw-content);
  background-color: hsl(var(--sidebar-border));
}

.focus\\:tw-bg-accent:focus {
  background-color: hsl(var(--accent));
}

.focus\\:tw-bg-muted:focus {
  background-color: hsl(var(--muted));
}

.focus\\:tw-text-accent-foreground:focus {
  color: hsl(var(--accent-foreground));
}

.focus\\:tw-text-foreground:focus {
  color: hsl(var(--foreground));
}

.focus\\:tw-outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\\:tw-ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus\\:tw-ring-ring:focus {
  --tw-ring-color: hsl(var(--ring));
}

.focus\\:tw-ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}

.focus-visible\\:tw-outline-none:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus-visible\\:tw-ring-2:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus-visible\\:tw-ring-\\[color\\:hsl\\(2400o2c 5\\%0o2c 64\\.9\\%\\)\\]:focus-visible {
  --tw-ring-opacity: 1;
  --tw-ring-color: hsl(240 5% 64.9% / var(--tw-ring-opacity, 1));
}

.focus-visible\\:tw-ring-ring:focus-visible {
  --tw-ring-color: hsl(var(--ring));
}

.focus-visible\\:tw-ring-sidebar-ring:focus-visible {
  --tw-ring-color: hsl(var(--sidebar-ring));
}

.focus-visible\\:tw-ring-offset-2:focus-visible {
  --tw-ring-offset-width: 2px;
}

.focus-visible\\:tw-ring-offset-background:focus-visible {
  --tw-ring-offset-color: hsl(var(--background));
}

.active\\:tw-bg-sidebar-accent:active {
  background-color: hsl(var(--sidebar-accent));
}

.active\\:tw-bg-white:active {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}

.active\\:tw-text-sidebar-accent-foreground:active {
  color: hsl(var(--sidebar-accent-foreground));
}

.disabled\\:tw-pointer-events-none:disabled {
  pointer-events: none;
}

.disabled\\:tw-cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.disabled\\:tw-opacity-50:disabled {
  opacity: 0.5;
}

.tw-group:hover .group-hover\\:tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}

.tw-group:hover .group-hover\\:tw-opacity-100 {
  opacity: 1;
}

.tw-peer:disabled ~ .peer-disabled\\:tw-cursor-not-allowed {
  cursor: not-allowed;
}

.tw-peer:disabled ~ .peer-disabled\\:tw-opacity-70 {
  opacity: 0.7;
}

.has-\\[\\[data-variant\\=inset\\]\\]\\:tw-bg-sidebar:has([data-variant=inset]) {
  background-color: hsl(var(--sidebar-background));
}

.aria-disabled\\:tw-pointer-events-none[aria-disabled="true"] {
  pointer-events: none;
}

.aria-disabled\\:tw-opacity-50[aria-disabled="true"] {
  opacity: 0.5;
}

.data-\\[disabled\\=true\\]\\:tw-pointer-events-none[data-disabled="true"] {
  pointer-events: none;
}

.data-\\[disabled\\]\\:tw-pointer-events-none[data-disabled] {
  pointer-events: none;
}

.data-\\[side\\=bottom\\]\\:tw-translate-y-1[data-side="bottom"] {
  --tw-translate-y: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[side\\=left\\]\\:tw--translate-x-1[data-side="left"] {
  --tw-translate-x: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[side\\=right\\]\\:tw-translate-x-1[data-side="right"] {
  --tw-translate-x: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[side\\=top\\]\\:tw--translate-y-1[data-side="top"] {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[state\\=checked\\]\\:tw-translate-x-5[data-state="checked"] {
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[state\\=checked\\]\\:tw-translate-x-\\[-20px\\][data-state="checked"] {
  --tw-translate-x: -20px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[state\\=unchecked\\]\\:tw-translate-x-0[data-state="unchecked"] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[active\\=true\\]\\:tw-bg-sidebar-accent[data-active="true"] {
  background-color: hsl(var(--sidebar-accent));
}

.data-\\[highlighted\\]\\:tw-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity, 1));
}

.data-\\[selected\\=true\\]\\:tw-bg-accent[data-selected="true"] {
  background-color: hsl(var(--accent));
}

.data-\\[state\\=active\\]\\:tw-bg-background[data-state="active"] {
  background-color: hsl(var(--background));
}

.data-\\[state\\=checked\\]\\:tw-bg-primary[data-state="checked"] {
  background-color: hsl(var(--primary));
}

.data-\\[state\\=on\\]\\:tw-bg-accent[data-state="on"] {
  background-color: hsl(var(--accent));
}

.data-\\[state\\=open\\]\\:tw-bg-accent[data-state="open"] {
  background-color: hsl(var(--accent));
}

.data-\\[state\\=open\\]\\:tw-bg-muted[data-state="open"] {
  background-color: hsl(var(--muted));
}

.data-\\[state\\=selected\\]\\:tw-bg-muted[data-state="selected"] {
  background-color: hsl(var(--muted));
}

.data-\\[state\\=unchecked\\]\\:tw-bg-input[data-state="unchecked"] {
  background-color: hsl(var(--input));
}

.data-\\[active\\=true\\]\\:tw-font-medium[data-active="true"] {
  font-weight: 500;
}

.data-\\[active\\=true\\]\\:tw-text-sidebar-accent-foreground[data-active="true"] {
  color: hsl(var(--sidebar-accent-foreground));
}

.data-\\[selected\\=true\\]\\:tw-text-accent-foreground[data-selected="true"] {
  color: hsl(var(--accent-foreground));
}

.data-\\[state\\=active\\]\\:tw-text-foreground[data-state="active"] {
  color: hsl(var(--foreground));
}

.data-\\[state\\=checked\\]\\:tw-text-primary-foreground[data-state="checked"] {
  color: hsl(var(--primary-foreground));
}

.data-\\[state\\=on\\]\\:tw-text-accent-foreground[data-state="on"] {
  color: hsl(var(--accent-foreground));
}

.data-\\[state\\=open\\]\\:tw-text-accent-foreground[data-state="open"] {
  color: hsl(var(--accent-foreground));
}

.data-\\[state\\=open\\]\\:tw-text-foreground[data-state="open"] {
  color: hsl(var(--foreground));
}

.data-\\[state\\=open\\]\\:tw-text-muted-foreground[data-state="open"] {
  color: hsl(var(--muted-foreground));
}

.data-\\[disabled\\=true\\]\\:tw-opacity-50[data-disabled="true"] {
  opacity: 0.5;
}

.data-\\[disabled\\]\\:tw-opacity-50[data-disabled] {
  opacity: 0.5;
}

.data-\\[state\\=open\\]\\:tw-opacity-100[data-state="open"] {
  opacity: 1;
}

.data-\\[state\\=active\\]\\:tw-shadow-sm[data-state="active"] {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.data-\\[state\\=open\\]\\:tw-animate-in[data-state="open"] {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}

.data-\\[state\\=closed\\]\\:tw-animate-out[data-state="closed"] {
  animation-name: exit;
  animation-duration: 150ms;
  --tw-exit-opacity: initial;
  --tw-exit-scale: initial;
  --tw-exit-rotate: initial;
  --tw-exit-translate-x: initial;
  --tw-exit-translate-y: initial;
}

.data-\\[state\\=closed\\]\\:tw-fade-out-0[data-state="closed"] {
  --tw-exit-opacity: 0;
}

.data-\\[state\\=open\\]\\:tw-fade-in-0[data-state="open"] {
  --tw-enter-opacity: 0;
}

.data-\\[state\\=closed\\]\\:tw-zoom-out-95[data-state="closed"] {
  --tw-exit-scale: .95;
}

.data-\\[state\\=open\\]\\:tw-zoom-in-95[data-state="open"] {
  --tw-enter-scale: .95;
}

.data-\\[side\\=bottom\\]\\:tw-slide-in-from-top-2[data-side="bottom"] {
  --tw-enter-translate-y: -0.5rem;
}

.data-\\[side\\=left\\]\\:tw-slide-in-from-right-2[data-side="left"] {
  --tw-enter-translate-x: 0.5rem;
}

.data-\\[side\\=right\\]\\:tw-slide-in-from-left-2[data-side="right"] {
  --tw-enter-translate-x: -0.5rem;
}

.data-\\[side\\=top\\]\\:tw-slide-in-from-bottom-2[data-side="top"] {
  --tw-enter-translate-y: 0.5rem;
}

.data-\\[state\\=closed\\]\\:tw-slide-out-to-left-1\\/2[data-state="closed"] {
  --tw-exit-translate-x: -50%;
}

.data-\\[state\\=closed\\]\\:tw-slide-out-to-top-\\[48\\%\\][data-state="closed"] {
  --tw-exit-translate-y: -48%;
}

.data-\\[state\\=open\\]\\:tw-slide-in-from-left-1\\/2[data-state="open"] {
  --tw-enter-translate-x: -50%;
}

.data-\\[state\\=open\\]\\:tw-slide-in-from-top-\\[48\\%\\][data-state="open"] {
  --tw-enter-translate-y: -48%;
}

.data-\\[state\\=open\\]\\:hover\\:tw-bg-sidebar-accent:hover[data-state="open"] {
  background-color: hsl(var(--sidebar-accent));
}

.data-\\[state\\=open\\]\\:hover\\:tw-text-sidebar-accent-foreground:hover[data-state="open"] {
  color: hsl(var(--sidebar-accent-foreground));
}

.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  left: calc(var(--sidebar-width) * -1);
}

.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  right: calc(var(--sidebar-width) * -1);
}

.tw-group[data-side="primary"] .group-data-\\[side\\=primary\\]\\:tw--right-4 {
  right: -1rem;
}

.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-left-0 {
  left: 0px;
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw--mt-8 {
  margin-top: -2rem;
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-hidden {
  display: none;
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[--sidebar-width-icon\\] {
  width: var(--sidebar-width-icon);
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem);
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)_\\+2px\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem + 2px);
}

.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-w-0 {
  width: 0px;
}

.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-rotate-180 {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-overflow-hidden {
  overflow: hidden;
}

.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-rounded-lg {
  border-radius: var(--radius);
}

.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-border {
  border-width: 1px;
}

.tw-group[data-side="primary"] .group-data-\\[side\\=primary\\]\\:tw-border-r {
  border-right-width: 1px;
}

.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-border-l {
  border-left-width: 1px;
}

.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-opacity-0 {
  opacity: 0;
}

.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:after\\:tw-left-full::after {
  content: var(--tw-content);
  left: 100%;
}

.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:hover\\:tw-bg-sidebar:hover {
  background-color: hsl(var(--sidebar-background));
}

.tw-peer[data-variant="inset"] ~ .peer-data-\\[variant\\=inset\\]\\:tw-min-h-\\[calc\\(100svh-theme\\(spacing\\.4\\)\\)\\] {
  min-height: calc(100svh - 1rem);
}

@media (min-width: 640px) {

  .sm\\:tw-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .sm\\:tw-static {
    position: static;
  }

  .sm\\:tw-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .sm\\:tw-flex {
    display: flex;
  }

  .sm\\:tw-table-cell {
    display: table-cell;
  }

  .sm\\:tw-hidden {
    display: none;
  }

  .sm\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sm\\:tw-flex-row {
    flex-direction: row;
  }

  .sm\\:tw-justify-end {
    justify-content: flex-end;
  }

  .sm\\:tw-gap-4 {
    gap: 1rem;
  }

  .sm\\:tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:tw-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:tw-border-0 {
    border-width: 0px;
  }

  .sm\\:tw-bg-transparent {
    background-color: transparent;
  }

  .sm\\:tw-px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .sm\\:tw-py-0 {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .sm\\:tw-py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .sm\\:tw-py-5 {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .sm\\:tw-pl-14 {
    padding-left: 3.5rem;
  }

  .sm\\:tw-text-start {
    text-align: start;
  }
}

@media (min-width: 768px) {

  .md\\:tw-block {
    display: block;
  }

  .md\\:tw-inline {
    display: inline;
  }

  .md\\:tw-flex {
    display: flex;
  }

  .md\\:tw-table-cell {
    display: table-cell;
  }

  .md\\:tw-h-8 {
    height: 2rem;
  }

  .md\\:tw-w-8 {
    width: 2rem;
  }

  .md\\:tw-w-\\[200px\\] {
    width: 200px;
  }

  .md\\:tw-grow-0 {
    flex-grow: 0;
  }

  .md\\:tw-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .md\\:tw-gap-8 {
    gap: 2rem;
  }

  .md\\:tw-text-base {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .md\\:tw-opacity-0 {
    opacity: 0;
  }

  .after\\:md\\:tw-hidden::after {
    content: var(--tw-content);
    display: none;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-m-2 {
    margin: 0.5rem;
  }

  .tw-peer[data-state="collapsed"][data-variant="inset"] ~ .md\\:peer-data-\\[state\\=collapsed\\]\\:peer-data-\\[variant\\=inset\\]\\:tw-ml-2 {
    margin-left: 0.5rem;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-ml-0 {
    margin-left: 0px;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-rounded-xl {
    border-radius: 0.75rem;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-shadow {
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
}

@media (min-width: 1024px) {

  .lg\\:tw-sr-only {
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

  .lg\\:tw-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .lg\\:tw-flex {
    display: flex;
  }

  .lg\\:tw-w-\\[336px\\] {
    width: 336px;
  }

  .lg\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\\:tw-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lg\\:tw-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }
}

@media (min-width: 1280px) {

  .xl\\:tw-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .xl\\:tw-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .xl\\:tw-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .xl\\:tw-whitespace-nowrap {
    white-space: nowrap;
  }
}

.ltr\\:tw-left-2:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.5rem;
}

.ltr\\:tw-left-2\\.5:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.625rem;
}

.rtl\\:tw-right-2:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.5rem;
}

.rtl\\:tw-right-2\\.5:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.625rem;
}

.rtl\\:tw-ps-2:where([dir="rtl"], [dir="rtl"] *) {
  padding-inline-start: 0.5rem;
}

@media (prefers-color-scheme: dark) {

  .dark\\:tw--rotate-90 {
    --tw-rotate: -90deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-rotate-0 {
    --tw-rotate: 0deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-scale-0 {
    --tw-scale-x: 0;
    --tw-scale-y: 0;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-scale-100 {
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-border-destructive {
    border-color: hsl(var(--destructive));
  }
}

.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:tw-pe-0:has([role=checkbox]) {
  padding-inline-end: 0px;
}

.\\[\\&\\>span\\:last-child\\]\\:tw-truncate>span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.\\[\\&\\>span\\]\\:tw-line-clamp-1>span {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.\\[\\&\\>svg\\+div\\]\\:tw-translate-y-\\[-3px\\]>svg+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.\\[\\&\\>svg\\]\\:tw-absolute>svg {
  position: absolute;
}

.\\[\\&\\>svg\\]\\:tw-left-4>svg {
  left: 1rem;
}

.\\[\\&\\>svg\\]\\:tw-top-4>svg {
  top: 1rem;
}

.\\[\\&\\>svg\\]\\:tw-size-4>svg {
  width: 1rem;
  height: 1rem;
}

.\\[\\&\\>svg\\]\\:tw-shrink-0>svg {
  flex-shrink: 0;
}

.\\[\\&\\>svg\\]\\:tw-text-destructive>svg {
  color: hsl(var(--destructive));
}

.\\[\\&\\>svg\\]\\:tw-text-foreground>svg {
  color: hsl(var(--foreground));
}

.\\[\\&\\>svg\\]\\:tw-text-sidebar-accent-foreground>svg {
  color: hsl(var(--sidebar-accent-foreground));
}

.\\[\\&\\>svg\\~\\*\\]\\:tw-pl-7>svg~* {
  padding-left: 1.75rem;
}

.\\[\\&\\>tr\\]\\:last\\:tw-border-b-0:last-child>tr {
  border-bottom-width: 0px;
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-px-2 [cmdk-group-heading] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-py-1\\.5 [cmdk-group-heading] {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-text-xs [cmdk-group-heading] {
  font-size: 0.75rem;
  line-height: 1rem;
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-font-medium [cmdk-group-heading] {
  font-weight: 500;
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-text-muted-foreground [cmdk-group-heading] {
  color: hsl(var(--muted-foreground));
}

.\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:tw-pt-0 [cmdk-group]:not([hidden]) ~[cmdk-group] {
  padding-top: 0px;
}

.\\[\\&_\\[cmdk-group\\]\\]\\:tw-px-2 [cmdk-group] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:tw-h-5 [cmdk-input-wrapper] svg {
  height: 1.25rem;
}

.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:tw-w-5 [cmdk-input-wrapper] svg {
  width: 1.25rem;
}

.\\[\\&_\\[cmdk-input\\]\\]\\:tw-h-12 [cmdk-input] {
  height: 3rem;
}

.\\[\\&_\\[cmdk-item\\]\\]\\:tw-px-2 [cmdk-item] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.\\[\\&_\\[cmdk-item\\]\\]\\:tw-py-3 [cmdk-item] {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.\\[\\&_\\[cmdk-item\\]_svg\\]\\:tw-h-5 [cmdk-item] svg {
  height: 1.25rem;
}

.\\[\\&_\\[cmdk-item\\]_svg\\]\\:tw-w-5 [cmdk-item] svg {
  width: 1.25rem;
}

.\\[\\&_p\\]\\:tw-leading-relaxed p {
  line-height: 1.625;
}

.\\[\\&_tr\\:last-child\\]\\:tw-border-0 tr:last-child {
  border-width: 0px;
}

.\\[\\&_tr\\]\\:tw-border-b tr {
  border-bottom-width: 1px;
}

[data-side=primary][data-collapsible=offcanvas] .\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--right-2 {
  right: -0.5rem;
}

[data-side=primary][data-state=collapsed] .\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
}

[data-side=secondary][data-collapsible=offcanvas] .\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--left-2 {
  left: -0.5rem;
}

[data-side=secondary][data-state=collapsed] .\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
}

[data-side=secondary] .\\[\\[data-side\\=secondary\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
}

[data-side=secondary] .\\[\\[data-side\\=secondary\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
.papi-menu-drawer-paper {
  height: fit-content !important;
  position: absolute !important;
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
`,"top");
//# sourceMappingURL=index.cjs.map
