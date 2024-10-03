"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const a=require("react/jsx-runtime"),y=require("react"),ne=require("lucide-react"),lt=require("clsx"),$l=require("tailwind-merge"),pa=require("@radix-ui/react-dropdown-menu"),Q=require("platform-bible-utils"),Ml=require("@radix-ui/react-slot"),ir=require("class-variance-authority"),Al=require("@radix-ui/react-label"),Dl=require("@radix-ui/react-radio-group"),Bl=require("@radix-ui/react-popover"),Oe=require("cmdk"),Ll=require("@radix-ui/react-dialog"),Ne=require("@tanstack/react-table"),Vl=require("@radix-ui/react-select"),Fl=require("@radix-ui/react-toggle-group"),zl=require("@radix-ui/react-toggle"),Gl=require("@radix-ui/react-tabs"),Hl=require("@radix-ui/react-separator"),Ul=require("@radix-ui/react-checkbox"),Xr=require("@mui/styled-engine"),$e=require("@mui/material"),fn=require("react-dom"),fa=require("sonner"),ql=require("@radix-ui/react-slider"),Xl=require("@radix-ui/react-switch");function Ee(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const M=Ee(y),fe=Ee(pa),wa=Ee(Al),Nn=Ee(Dl),En=Ee(Bl),We=Ee(Ll),ge=Ee(Vl),lr=Ee(Fl),ma=Ee(zl),Re=Ee(Gl),ha=Ee(Hl),Wr=Ee(Ul),Wl=Ee(fn),wn=Ee(ql),Yr=Ee(Xl);const Yl=$l.extendTailwindMerge({prefix:"tw-"});function O(...e){return Yl(lt.clsx(e))}const Jt=y.forwardRef(({className:e,type:t,...n},r)=>a.jsx("input",{type:t,className:O("pr-twp tw-flex tw-h-10 tw-rounded-md tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),ref:r,...n}));Jt.displayName="Input";const Kl=y.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},s)=>a.jsxs("div",{className:"tw-relative",children:[a.jsx(Jt,{...o,type:"text",className:"tw-box-border tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pl-4 tw-pr-3 tw-font-medium tw-shadow-none tw-outline-none",onChange:i=>e(i.target.value),onKeyDown:i=>{i.key==="Enter"&&r(),t(i)},onClick:n,ref:s}),a.jsx(ne.History,{className:"tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-muted-foreground",onClick:()=>{console.log("back in history")}})]}));var Jl=Object.defineProperty,Zl=(e,t,n)=>t in e?Jl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t,n)=>Zl(e,typeof t!="symbol"?t+"":t,n);const kt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],lo=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ga=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],cs=lc();function Zt(e,t=!0){return t&&(e=e.toUpperCase()),e in cs?cs[e]:0}function co(e){return Zt(e)>0}function Ql(e){const t=typeof e=="string"?Zt(e):e;return t>=40&&t<=66}function ec(e){return(typeof e=="string"?Zt(e):e)<=39}function ba(e){return e<=66}function tc(e){const t=typeof e=="string"?Zt(e):e;return xa(t)&&!ba(t)}function*nc(){for(let e=1;e<=kt.length;e++)yield e}const rc=1,va=kt.length;function oc(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function uo(e,t="***"){const n=e-1;return n<0||n>=kt.length?t:kt[n]}function ya(e){return e<=0||e>va?"******":ga[e-1]}function sc(e){return ya(Zt(e))}function xa(e){const t=typeof e=="number"?uo(e):e;return co(t)&&!lo.includes(t)}function ac(e){const t=typeof e=="number"?uo(e):e;return co(t)&&lo.includes(t)}function ic(e){return ga[e-1].includes("*obsolete*")}function lc(){const e={};for(let t=0;t<kt.length;t++)e[kt[t]]=t+1;return e}const ue={allBookIds:kt,nonCanonicalIds:lo,bookIdToNumber:Zt,isBookIdValid:co,isBookNT:Ql,isBookOT:ec,isBookOTNT:ba,isBookDC:tc,allBookNumbers:nc,firstBook:rc,lastBook:va,extraBooks:oc,bookNumberToId:uo,bookNumberToEnglishName:ya,bookIdToEnglishName:sc,isCanonical:xa,isExtraMaterial:ac,isObsolete:ic};var Ue=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ue||{});const Pe=class{constructor(t){if(re(this,"name"),re(this,"fullPath"),re(this,"isPresent"),re(this,"hasVerseSegments"),re(this,"isCustomized"),re(this,"baseVersification"),re(this,"scriptureBooks"),re(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Ue[t]):(this._type=t,this.name=Ue[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};re(Pe,"Original",new Pe(Ue.Original)),re(Pe,"Septuagint",new Pe(Ue.Septuagint)),re(Pe,"Vulgate",new Pe(Ue.Vulgate)),re(Pe,"English",new Pe(Ue.English)),re(Pe,"RussianProtestant",new Pe(Ue.RussianProtestant)),re(Pe,"RussianOrthodox",new Pe(Ue.RussianOrthodox));let mt=Pe;function ds(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var ka=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(ka||{});const Te=class se{constructor(t,n,r,o){if(re(this,"firstChapter"),re(this,"lastChapter"),re(this,"lastVerse"),re(this,"hasSegmentsDefined"),re(this,"text"),re(this,"BBBCCCVVVS"),re(this,"longHashCode"),re(this,"versification"),re(this,"rtlMark","‏"),re(this,"_bookNum",0),re(this,"_chapterNum",0),re(this,"_verseNum",0),re(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const s=t,i=n!=null&&n instanceof mt?n:void 0;this.setEmpty(i),this.parse(s)}else if(t!=null&&typeof t=="number"){const s=n!=null&&n instanceof mt?n:void 0;this.setEmpty(s),this._verseNum=t%se.chapterDigitShifter,this._chapterNum=Math.floor(t%se.bookDigitShifter/se.chapterDigitShifter),this._bookNum=Math.floor(t/se.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof se){const s=t;this._bookNum=s.bookNum,this._chapterNum=s.chapterNum,this._verseNum=s.verseNum,this._verse=s.verse,this.versification=s.versification}else{if(t==null)return;const s=t instanceof mt?t:se.defaultVersification;this.setEmpty(s)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??se.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new se(t),{success:!0,verseRef:n}}catch(r){if(r instanceof an)return n=new se,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%se.bcvMaxValue*se.bookDigitShifter+(n>=0?n%se.bcvMaxValue*se.chapterDigitShifter:0)+(r>=0?r%se.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:s,versificationStr:i}=t,l=s||o.toString();let c;return i&&(c=new mt(i)),n?new se(n,r.toString(),l,c):new se}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>se.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(se.verseRangeSeparator)||this._verse.includes(se.verseSequenceIndicator))}get book(){return ue.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=ue.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=se.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=se.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>ue.lastBook)throw new an("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new mt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(se.verseRangeSeparators,se.verseSequenceIndicators)}get BBBCCC(){return se.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return se.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const s=t.split("/");if(t=s[0],s.length>1)try{const i=+s[1].trim();this.versification=new mt(Ue[i])}catch{throw new an("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new an("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||ue.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!se.isVerseParseable(r[1]))throw new an("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new se(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete n.verse,n}equals(t){return t instanceof se?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=se.verseRangeSeparators,r=se.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],s=ds(this._verse,r);for(const i of s.map(l=>ds(l,n))){const l=this.clone();l.verse=i[0];const c=l.verseNum;if(o.push(l),i.length>1){const p=this.clone();if(p.verse=i[1],!t)for(let f=c+1;f<p.verseNum;f++){const b=new se(this._bookNum,this._chapterNum,f,this.versification);this.isExcluded||o.push(b)}o.push(p)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const s=o.internalValid;if(s!==0)return s;const i=o.BBBCCCVVV;if(r>i)return 3;if(r===i)return 4;r=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ue.lastBook?2:(ue.isCanonical(this._bookNum),0)}setEmpty(t=se.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=ue.bookIdToNumber(t),this.chapter=n,this.verse=r}};re(Te,"defaultVersification",mt.English),re(Te,"verseRangeSeparator","-"),re(Te,"verseSequenceIndicator",","),re(Te,"verseRangeSeparators",[Te.verseRangeSeparator]),re(Te,"verseSequenceIndicators",[Te.verseSequenceIndicator]),re(Te,"chapterDigitShifter",1e3),re(Te,"bookDigitShifter",Te.chapterDigitShifter*Te.chapterDigitShifter),re(Te,"bcvMaxValue",Te.chapterDigitShifter-1),re(Te,"ValidStatusType",ka);let an=class extends Error{};const cr=fe.Root,po=fe.Trigger,Na=fe.Group,cc=fe.Portal,dc=fe.Sub,uc=fe.RadioGroup,Ea=y.forwardRef(({className:e,inset:t,children:n,...r},o)=>a.jsxs(fe.SubTrigger,{ref:o,className:O("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",t&&"tw-pl-8",e),...r,children:[n,a.jsx(ne.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));Ea.displayName=fe.SubTrigger.displayName;const Sa=y.forwardRef(({className:e,...t},n)=>a.jsx(fe.SubContent,{ref:n,className:O("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));Sa.displayName=fe.SubContent.displayName;const On=y.forwardRef(({className:e,sideOffset:t=4,...n},r)=>a.jsx(fe.Portal,{children:a.jsx(fe.Content,{ref:r,sideOffset:t,className:O("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...n})}));On.displayName=fe.Content.displayName;const fo=y.forwardRef(({className:e,inset:t,...n},r)=>a.jsx(fe.Item,{ref:r,className:O("tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e),...n}));fo.displayName=fe.Item.displayName;const dr=y.forwardRef(({className:e,children:t,checked:n,...r},o)=>a.jsxs(fe.CheckboxItem,{ref:o,className:O("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),checked:n,...r,children:[a.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:a.jsx(fe.ItemIndicator,{children:a.jsx(ne.Check,{className:"tw-h-4 tw-w-4"})})}),t]}));dr.displayName=fe.CheckboxItem.displayName;const wo=y.forwardRef(({className:e,children:t,...n},r)=>a.jsxs(fe.RadioItem,{ref:r,className:O("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[a.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:a.jsx(fe.ItemIndicator,{children:a.jsx(ne.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]}));wo.displayName=fe.RadioItem.displayName;const Qt=y.forwardRef(({className:e,inset:t,...n},r)=>a.jsx(fe.Label,{ref:r,className:O("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...n}));Qt.displayName=fe.Label.displayName;const Rn=y.forwardRef(({className:e,...t},n)=>a.jsx(fe.Separator,{ref:n,className:O("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Rn.displayName=fe.Separator.displayName;function Ta({className:e,...t}){return a.jsx("span",{className:O("tw-ml-auto tw-text-xs tw-tracking-widest tw-opacity-60",e),...t})}Ta.displayName="DropdownMenuShortcut";const pc=y.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:s,children:i},l)=>a.jsxs(fo,{ref:l,textValue:e,className:O("tw-mx-1 tw-px-1 tw-font-normal tw-text-foreground/80",{"tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[a.jsx("span",{className:O("tw-border-b-0 tw-border-l-2 tw-border-r-0 tw-border-t-0 tw-border-solid tw-px-2",{"tw-font-bold":n,"tw-border-l-red-200":s.toLowerCase()==="ot","tw-border-l-purple-200":s.toLowerCase()==="nt","tw-border-l-indigo-200":s.toLowerCase()==="dc"}),children:ue.bookIdToEnglishName(e)}),n&&a.jsx("div",{children:i})]},e));function fc({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const s=Array.from({length:t},(l,c)=>c+1),i=y.useCallback(l=>{o(l)},[o]);return a.jsx("div",{className:O("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"),children:s.map(l=>a.jsx("div",{className:O("tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",{"tw-font-semibold tw-text-amber-900":l===n,"tw-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>i(l),children:l},l))})}function wc({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return a.jsxs(Qt,{className:"tw-flex tw-justify-between",children:[a.jsx("p",{className:"tw-inline-block tw-align-middle",children:"Go To"}),a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(ne.ArrowDownWideNarrow,{onClick:e,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"}),a.jsx(ne.Clock,{onClick:t,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"}),a.jsx(ne.Bookmark,{onClick:n,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"})]})]})}const bn=ue.allBookIds,mc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},us=["OT","NT","DC"],hc=32+32+32,gc=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],bc=e=>({OT:bn.filter(n=>ue.isBookOT(n)),NT:bn.filter(n=>ue.isBookNT(n)),DC:bn.filter(n=>ue.isBookDC(n))})[e],ln=e=>Q.getChaptersForBook(ue.bookIdToNumber(e));function vc(){return bn.map(t=>ue.bookIdToEnglishName(t))}function yc(e){return vc().includes(e)}function xc(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(yc(t))return bn.find(r=>ue.bookIdToEnglishName(r)===t)}function kc({scrRef:e,handleSubmit:t}){const[n,r]=y.useState(""),[o,s]=y.useState(ue.bookNumberToId(e.bookNum)),[i,l]=y.useState(e.chapterNum??0),[c,p]=y.useState(ue.bookNumberToId(e.bookNum)),[f,b]=y.useState(!1),[g,d]=y.useState(f),m=y.useRef(void 0),u=y.useRef(void 0),h=y.useRef(void 0),x=y.useCallback(E=>bc(E).filter(D=>{const B=ue.bookIdToEnglishName(D).toLowerCase(),J=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return B.includes(J)||D.toLowerCase().includes(J)}),[n]),C=E=>{r(E)},N=y.useRef(!1),k=y.useCallback(E=>{if(N.current){N.current=!1;return}b(E)},[]),v=y.useCallback((E,D,B,J)=>{if(l(ue.bookNumberToId(e.bookNum)!==E?1:e.chapterNum),D||ln(E)===-1){t({bookNum:ue.bookIdToNumber(E),chapterNum:B||1,verseNum:J||1}),b(!1),r("");return}s(o!==E?E:""),b(!D)},[t,e.bookNum,e.chapterNum,o]),j=E=>{E<=0||E>ln(o)||v(o,!0,E)},_=y.useCallback(()=>{gc.forEach(E=>{const D=n.match(E);if(D){const[B,J=void 0,Y=void 0]=D.slice(1),H=xc(B);(ue.isBookIdValid(B)||H)&&v(H??B,!0,J?parseInt(J,10):1,Y?parseInt(Y,10):1)}})},[v,n]),A=y.useCallback(E=>{f?(E.key==="ArrowDown"||E.key==="ArrowUp")&&(typeof h<"u"&&h.current!==null?h.current.focus():typeof u<"u"&&u.current!==null&&u.current.focus(),E.preventDefault()):b(!0)},[f]),T=E=>{const{key:D}=E;D==="ArrowRight"||D==="ArrowLeft"||D==="ArrowDown"||D==="ArrowUp"||D==="Enter"||(m.current.dispatchEvent(new KeyboardEvent("keydown",{key:D})),m.current.focus())},R=E=>{const{key:D}=E;if(c===o){if(D==="Enter"){E.preventDefault(),v(o,!0,i);return}let B=0;if(D==="ArrowRight")if(i<ln(c))B=1;else{E.preventDefault();return}else if(D==="ArrowLeft")if(i>1)B=-1;else{E.preventDefault();return}else D==="ArrowDown"?B=6:D==="ArrowUp"&&(B=-6);i+B<=0||i+B>ln(c)?l(0):B!==0&&(l(i+B),E.preventDefault())}};return y.useEffect(()=>{o===c?o===ue.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),y.useLayoutEffect(()=>{d(f)},[f]),y.useLayoutEffect(()=>{const E=setTimeout(()=>{if(g&&u.current&&h.current){const B=h.current.offsetTop-hc;u.current.scrollTo({top:B,behavior:"instant"})}},10);return()=>{clearTimeout(E)}},[g]),a.jsx("div",{className:"pr-twp tw-flex",children:a.jsxs(cr,{modal:!1,open:f,onOpenChange:k,children:[a.jsx(po,{asChild:!0,children:a.jsx(Kl,{ref:m,value:n,handleSearch:C,handleKeyDown:A,handleOnClick:()=>{s(ue.bookNumberToId(e.bookNum)),p(ue.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),b(!0),m.current.focus()},onFocus:()=>{N.current=!0},handleSubmit:_,placeholder:`${ue.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),a.jsxs(On,{className:"tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},onKeyDown:T,align:"start",ref:u,children:[a.jsx(wc,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),us.map((E,D)=>x(E).length>0&&a.jsxs("div",{children:[a.jsx(Qt,{className:"tw-font-semibold tw-text-foreground/80",children:mc[E]}),x(E).map(B=>a.jsx("div",{children:a.jsx(pc,{bookId:B,handleSelectBook:()=>v(B,!1),isSelected:o===B,handleHighlightBook:()=>p(B),handleKeyDown:R,bookType:E,ref:J=>{o===B&&(h.current=J)},children:a.jsx(fc,{handleSelectChapter:j,endChapter:ln(B),activeChapter:e.bookNum===ue.bookIdToNumber(B)?e.chapterNum:0,highlightedChapter:i,handleHighlightedChapter:J=>{l(J)}})})},B)),us.length-1!==D?a.jsx(Rn,{}):void 0]},E))]})]})})}const Ca=ir.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),be=y.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},s)=>{const i=r?Ml.Slot:"button";return a.jsx(i,{className:O(Ca({variant:t,size:n,className:e})),ref:s,...o})});be.displayName="Button";const Nc=ir.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),qe=y.forwardRef(({className:e,...t},n)=>a.jsx(wa.Root,{ref:n,className:O("pr-twp",Nc(),e),...t}));qe.displayName=wa.Root.displayName;const mo=y.forwardRef(({className:e,...t},n)=>a.jsx(Nn.Root,{className:O("pr-twp tw-grid tw-gap-2",e),...t,ref:n}));mo.displayName=Nn.Root.displayName;const Qn=y.forwardRef(({className:e,...t},n)=>a.jsx(Nn.Item,{ref:n,className:O("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t,children:a.jsx(Nn.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:a.jsx(ne.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Qn.displayName=Nn.Item.displayName;const Ec=En.Root,Sc=En.Trigger,ja=y.forwardRef(({className:e,align:t="center",sideOffset:n=4,...r},o)=>a.jsx(En.Portal,{children:a.jsx(En.Content,{ref:o,align:t,sideOffset:n,className:O("pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...r})}));ja.displayName=En.Content.displayName;const Tc=We.Portal,Oa=y.forwardRef(({className:e,...t},n)=>a.jsx(We.Overlay,{ref:n,className:O("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",e),...t}));Oa.displayName=We.Overlay.displayName;const Cc=y.forwardRef(({className:e,children:t,...n},r)=>a.jsxs(Tc,{children:[a.jsx(Oa,{}),a.jsxs(We.Content,{ref:r,className:O("tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",e),...n,children:[t,a.jsxs(We.Close,{className:"tw-absolute tw-right-4 tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",children:[a.jsx(ne.X,{className:"tw-h-4 tw-w-4"}),a.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]}));Cc.displayName=We.Content.displayName;const jc=y.forwardRef(({className:e,...t},n)=>a.jsx(We.Title,{ref:n,className:O("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));jc.displayName=We.Title.displayName;const Oc=y.forwardRef(({className:e,...t},n)=>a.jsx(We.Description,{ref:n,className:O("tw-text-sm tw-text-muted-foreground",e),...t}));Oc.displayName=We.Description.displayName;const Ra=y.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command,{ref:n,className:O("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",e),...t}));Ra.displayName=Oe.Command.displayName;const _a=y.forwardRef(({className:e,...t},n)=>a.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",children:[a.jsx(ne.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),a.jsx(Oe.Command.Input,{ref:n,className:O("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t})]}));_a.displayName=Oe.Command.Input.displayName;const Pa=y.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command.List,{ref:n,className:O("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",e),...t}));Pa.displayName=Oe.Command.List.displayName;const Ia=y.forwardRef((e,t)=>a.jsx(Oe.Command.Empty,{ref:t,className:"tw-py-6 tw-text-center tw-text-sm",...e}));Ia.displayName=Oe.Command.Empty.displayName;const Rc=y.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command.Group,{ref:n,className:O("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",e),...t}));Rc.displayName=Oe.Command.Group.displayName;const _c=y.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command.Separator,{ref:n,className:O("tw--mx-1 tw-h-px tw-bg-border",e),...t}));_c.displayName=Oe.Command.Separator.displayName;const $a=y.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command.Item,{ref:n,className:O("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",e),...t}));$a.displayName=Oe.Command.Item.displayName;function Pc(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function Kr({id:e,options:t=[],className:n,value:r,onChange:o=()=>{},getOptionLabel:s=Pc,buttonPlaceholder:i="",textPlaceholder:l="",commandEmptyMessage:c="No option found",buttonVariant:p="outline",dir:f="ltr",isDisabled:b=!1,...g}){const[d,m]=y.useState(!1);return a.jsxs(Ec,{open:d,onOpenChange:m,...g,children:[a.jsx(Sc,{asChild:!0,children:a.jsxs(be,{variant:p,role:"combobox","aria-expanded":d,id:e,className:O("tw-w-[200px] tw-justify-between",n),disabled:b,children:[a.jsx("span",{className:"tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:r?s(r):i}),a.jsx(ne.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),a.jsx(ja,{className:"tw-w-[200px] tw-p-0",dir:f,children:a.jsxs(Ra,{children:[a.jsx(_a,{dir:f,placeholder:l,className:"tw-text-inherit"}),a.jsx(Ia,{children:c}),a.jsx(Pa,{children:t.map(u=>a.jsxs($a,{value:s(u),onSelect:()=>{o(u),m(!1)},children:[a.jsx(ne.Check,{className:O("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!r||s(r)!==s(u)})}),s(u)]},s(u)))})]})})]})}function Ma({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o=!1,chapterCount:s}){const i=y.useMemo(()=>Array.from({length:s},(p,f)=>f+1),[s]),l=p=>{n(p),p>t&&r(p)},c=p=>{r(p),p<e&&n(p)};return a.jsxs(a.Fragment,{children:[a.jsx(qe,{htmlFor:"start-chapters-combobox",children:"Chapters"}),a.jsx(Kr,{isDisabled:o,onChange:l,className:"tw-ml-2 tw-mr-2 tw-w-20",options:i,getOptionLabel:p=>p.toString(),value:e},"start chapter"),a.jsx(qe,{htmlFor:"end-chapters-combobox",children:"to"}),a.jsx(Kr,{isDisabled:o,onChange:c,className:"tw-ml-2 tw-w-20",options:i,getOptionLabel:p=>p.toString(),value:t},"end chapter")]})}var Aa=(e=>(e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books",e))(Aa||{});const Ic=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Rr=(e,t)=>e[t]??t;function $c({handleBookSelectionModeChange:e,currentBookName:t,onSelectBooks:n,selectedBookIds:r,chapterCount:o,endChapter:s,handleSelectEndChapter:i,startChapter:l,handleSelectStartChapter:c,localizedStrings:p}){const f=Rr(p,"%webView_bookSelector_currentBook%"),b=Rr(p,"%webView_bookSelector_choose%"),g=Rr(p,"%webView_bookSelector_chooseBooks%"),[d,m]=y.useState("current book"),u=h=>{m(h),e(h)};return a.jsx(mo,{className:"pr-twp tw-flex",value:d,onValueChange:h=>u(h),children:a.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[a.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(Qn,{value:"current book"}),a.jsx(qe,{className:"tw-ml-1",children:f})]}),a.jsx(qe,{className:"tw-flex tw-items-center",children:t}),a.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:a.jsx(Ma,{isDisabled:d==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:i,chapterCount:o,startChapter:l,endChapter:s})})]}),a.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(Qn,{value:"choose books"}),a.jsx(qe,{className:"tw-ml-1",children:g})]}),a.jsx(qe,{className:"tw-flex tw-items-center",children:r.map(h=>ue.bookIdToEnglishName(h)).join(", ")}),a.jsx(be,{disabled:d==="current book",onClick:()=>n(),children:b})]})]})})}function Mc({table:e}){return a.jsxs(cr,{children:[a.jsx(pa.DropdownMenuTrigger,{asChild:!0,children:a.jsxs(be,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[a.jsx(ne.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),a.jsxs(On,{align:"end",className:"tw-w-[150px]",children:[a.jsx(Qt,{children:"Toggle columns"}),a.jsx(Rn,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>a.jsx(dr,{className:"tw-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}const zt=ge.Root,Da=ge.Group,Gt=ge.Value,Nt=y.forwardRef(({className:e,children:t,...n},r)=>a.jsxs(ge.Trigger,{ref:r,className:O("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",e),...n,children:[t,a.jsx(ge.Icon,{asChild:!0,children:a.jsx(ne.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]}));Nt.displayName=ge.Trigger.displayName;const ho=y.forwardRef(({className:e,...t},n)=>a.jsx(ge.ScrollUpButton,{ref:n,className:O("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:a.jsx(ne.ChevronUp,{className:"tw-h-4 tw-w-4"})}));ho.displayName=ge.ScrollUpButton.displayName;const go=y.forwardRef(({className:e,...t},n)=>a.jsx(ge.ScrollDownButton,{ref:n,className:O("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:a.jsx(ne.ChevronDown,{className:"tw-h-4 tw-w-4"})}));go.displayName=ge.ScrollDownButton.displayName;const Et=y.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>a.jsx(ge.Portal,{children:a.jsxs(ge.Content,{ref:o,className:O("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",e),position:n,...r,children:[a.jsx(ho,{}),a.jsx(ge.Viewport,{className:O("tw-p-1",n==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:t}),a.jsx(go,{})]})}));Et.displayName=ge.Content.displayName;const Ba=y.forwardRef(({className:e,...t},n)=>a.jsx(ge.Label,{ref:n,className:O("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",e),...t}));Ba.displayName=ge.Label.displayName;const De=y.forwardRef(({className:e,children:t,...n},r)=>a.jsxs(ge.Item,{ref:r,className:O("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[a.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:a.jsx(ge.ItemIndicator,{children:a.jsx(ne.Check,{className:"tw-h-4 tw-w-4"})})}),a.jsx(ge.ItemText,{children:t})]}));De.displayName=ge.Item.displayName;const La=y.forwardRef(({className:e,...t},n)=>a.jsx(ge.Separator,{ref:n,className:O("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));La.displayName=ge.Separator.displayName;function Ac({table:e}){return a.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[a.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[a.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),a.jsxs(zt,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[a.jsx(Nt,{className:"tw-h-8 tw-w-[70px]",children:a.jsx(Gt,{placeholder:e.getState().pagination.pageSize})}),a.jsx(Et,{side:"top",children:[10,20,30,40,50].map(t=>a.jsx(De,{value:`${t}`,children:t},t))})]})]}),a.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[a.jsxs(be,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),a.jsx(ne.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(be,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),a.jsx(ne.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(be,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),a.jsx(ne.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(be,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),a.jsx(ne.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const _n=y.forwardRef(({className:e,stickyHeader:t,...n},r)=>a.jsx("div",{className:O("pr-twp tw-relative tw-w-full",{"tw-overflow-auto":!t}),children:a.jsx("table",{ref:r,className:O("tw-w-full tw-caption-bottom tw-text-sm",e),...n})}));_n.displayName="Table";const Pn=y.forwardRef(({className:e,stickyHeader:t,...n},r)=>a.jsx("thead",{ref:r,className:O({"tw-sticky tw-top-0 tw-bg-muted":t},"[&_tr]:tw-border-b",e),...n}));Pn.displayName="TableHeader";const In=y.forwardRef(({className:e,...t},n)=>a.jsx("tbody",{ref:n,className:O("[&_tr:last-child]:tw-border-0",e),...t}));In.displayName="TableBody";const Va=y.forwardRef(({className:e,...t},n)=>a.jsx("tfoot",{ref:n,className:O("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",e),...t}));Va.displayName="TableFooter";const Qe=y.forwardRef(({className:e,...t},n)=>a.jsx("tr",{ref:n,className:O("tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",e),...t}));Qe.displayName="TableRow";const Ht=y.forwardRef(({className:e,...t},n)=>a.jsx("th",{ref:n,className:O("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",e),...t}));Ht.displayName="TableHead";const St=y.forwardRef(({className:e,...t},n)=>a.jsx("td",{ref:n,className:O("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",e),...t}));St.displayName="TableCell";const Fa=y.forwardRef(({className:e,...t},n)=>a.jsx("caption",{ref:n,className:O("tw-mt-4 tw-text-sm tw-text-muted-foreground",e),...t}));Fa.displayName="TableCaption";function za({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,stickyHeader:s=!1,onRowClickHandler:i=()=>{}}){var h;const[l,c]=y.useState([]),[p,f]=y.useState([]),[b,g]=y.useState({}),[d,m]=y.useState({}),u=Ne.useReactTable({data:t,columns:e,getCoreRowModel:Ne.getCoreRowModel(),...n&&{getPaginationRowModel:Ne.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:Ne.getSortedRowModel(),onColumnFiltersChange:f,getFilteredRowModel:Ne.getFilteredRowModel(),onColumnVisibilityChange:g,onRowSelectionChange:m,state:{sorting:l,columnFilters:p,columnVisibility:b,rowSelection:d}});return a.jsxs("div",{className:"pr-twp",children:[o&&a.jsx(Mc,{table:u}),a.jsxs(_n,{stickyHeader:s,children:[a.jsx(Pn,{stickyHeader:s,children:u.getHeaderGroups().map(x=>a.jsx(Qe,{children:x.headers.map(C=>a.jsx(Ht,{children:C.isPlaceholder?void 0:Ne.flexRender(C.column.columnDef.header,C.getContext())},C.id))},x.id))}),a.jsx(In,{children:(h=u.getRowModel().rows)!=null&&h.length?u.getRowModel().rows.map(x=>a.jsx(Qe,{onClick:()=>i(x,u),"data-state":x.getIsSelected()&&"selected",children:x.getVisibleCells().map(C=>a.jsx(St,{children:Ne.flexRender(C.column.columnDef.cell,C.getContext())},C.id))},x.id)):a.jsx(Qe,{children:a.jsx(St,{colSpan:e.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),n&&a.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[a.jsx(be,{variant:"outline",size:"sm",onClick:()=>u.previousPage(),disabled:!u.getCanPreviousPage(),children:"Previous"}),a.jsx(be,{variant:"outline",size:"sm",onClick:()=>u.nextPage(),disabled:!u.getCanNextPage(),children:"Next"})]}),n&&r&&a.jsx(Ac,{table:u})]})}const Dc=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),ps=e=>{const t=/^\\[vc]\s+(\d+)/,n=e.match(t);if(n)return+n[1]},fs=(e,t,n,r)=>{if(!e||e===""||t==="")return[];const o=[],s=Dc(e);let i=r.chapterNum,l=r.verseNum,c=0;return s.forEach(p=>{p.startsWith("\\id")&&(i=0,l=0),p.startsWith("\\c")&&(i=ps(p),l=0),p.startsWith("\\v")&&(l=ps(p),i===0&&(i=r.chapterNum));const f=n(p,t);for(let b=0;b<f.length;b++){const g={reference:{...r,chapterNum:i!==void 0?+i:-1,verseNum:l!==void 0?+l:-1},snippet:p,key:c};c+=1,o.push(g)}}),o};function Bc({selectedItem:e,text:t,extractItems:n,scriptureReference:r,setScriptureReference:o,localizedStrings:s}){const i=s["%webView_inventory_occurrences_table_header_reference%"],l=s["%webView_inventory_occurrences_table_header_occurrence%"],[c,p]=y.useState(fs(t,e,n,r));return y.useEffect(()=>p(fs(t,e,n,r)),[t,e,r,n]),a.jsxs(_n,{stickyHeader:!0,children:[a.jsx(Pn,{stickyHeader:!0,children:a.jsxs(Qe,{children:[a.jsx(Ht,{children:i}),a.jsx(Ht,{children:l})]})}),a.jsx(In,{children:c.map(f=>a.jsxs(Qe,{onClick:()=>{o(f.reference)},children:[a.jsx(St,{children:`${ue.bookNumberToEnglishName(f.reference.bookNum)} ${f.reference.chapterNum}:${f.reference.verseNum}`}),a.jsx(St,{children:f.snippet})]},f.key))})]})}const Lc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),ur=e=>e==="asc"?a.jsx(ne.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e==="desc"?a.jsx(ne.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):a.jsx(ne.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),Vc=(e,t,n)=>{let r=e;return t!=="all"&&(r=r.filter(o=>t==="approved"&&o.status==="approved"||t==="unapproved"&&o.status==="unapproved"||t==="unknown"&&o.status==="unknown")),n!==""&&(r=r.filter(o=>o.item.includes(n))),r},Fc=(e,t,n)=>{const r=[],o=t(e);for(let s=0;s<o.length;s++){const i=o[s],l=r.find(c=>c.item===i);if(l)l.count+=1;else{const c={item:i,count:1,status:n(i)};r.push(c)}}return r},ot=(e,t)=>e[t]??t;function zc({scriptureReference:e,setScriptureReference:t,localizedStrings:n,extractItems:r,approvedItems:o,onApprovedItemsChange:s,unapprovedItems:i,onUnapprovedItemsChange:l,text:c,scope:p,onScopeChange:f,getColumns:b}){const g=ot(n,"%webView_inventory_all%"),d=ot(n,"%webView_inventory_approved%"),m=ot(n,"%webView_inventory_unapproved%"),u=ot(n,"%webView_inventory_unknown%"),h=ot(n,"%webView_inventory_scope_currentBook%"),x=ot(n,"%webView_inventory_scope_chapter%"),C=ot(n,"%webView_inventory_scope_verse%"),N=ot(n,"%webView_inventory_filter_text%"),[k,v]=y.useState([]),[j,_]=y.useState("all"),[A,T]=y.useState(""),[R,E]=y.useState(""),D=y.useCallback((V,S)=>{v(z=>{let F=[];return V.forEach(X=>{F=z.map(G=>G.item===X&&G.status!==S?{...G,status:S}:G)}),F});let I=[...o];V.forEach(z=>{S==="approved"?I.includes(z)||I.push(z):I=I.filter(F=>F!==z)}),s(I);let U=[...i];V.forEach(z=>{S==="unapproved"?U.includes(z)||U.push(z):U=U.filter(F=>F!==z)}),l(U)},[o,s,i,l]),B=y.useCallback(V=>o.includes(V)?"approved":i.includes(V)?"unapproved":"unknown",[o,i]);y.useEffect(()=>{c&&v(Fc(c,r,B))},[r,c,B]);const J=y.useMemo(()=>Vc(k,j,A),[k,j,A]);y.useEffect(()=>{E("")},[J]);const Y=(V,S)=>{S.toggleAllRowsSelected(!1),V.toggleSelected(void 0),E(V.getValue("item"))},H=y.useMemo(()=>b(D),[b,D]),te=V=>{if(V==="book"||V==="chapter"||V==="verse")f(V);else throw new Error(`Invalid scope value: ${V}`)},ae=V=>{if(V==="all"||V==="approved"||V==="unapproved"||V==="unknown")_(V);else throw new Error(`Invalid status filter value: ${V}`)};return a.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[a.jsxs("div",{className:"tw-flex",children:[a.jsxs(zt,{onValueChange:V=>ae(V),defaultValue:j,children:[a.jsx(Nt,{className:"tw-m-1",children:a.jsx(Gt,{placeholder:"Select filter"})}),a.jsxs(Et,{children:[a.jsx(De,{value:"all",children:g}),a.jsx(De,{value:"approved",children:d}),a.jsx(De,{value:"unapproved",children:m}),a.jsx(De,{value:"unknown",children:u})]})]}),a.jsxs(zt,{onValueChange:V=>te(V),defaultValue:p,children:[a.jsx(Nt,{className:"tw-m-1",children:a.jsx(Gt,{placeholder:"Select scope"})}),a.jsxs(Et,{children:[a.jsx(De,{value:"book",children:h}),a.jsx(De,{value:"chapter",children:x}),a.jsx(De,{value:"verse",children:C})]})]}),a.jsx(Jt,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:N,value:A,onChange:V=>{T(V.target.value)}})]}),a.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:a.jsx(za,{columns:H,data:J,onRowClickHandler:Y,stickyHeader:!0})}),R!==""&&a.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:a.jsx(Bc,{selectedItem:R,text:c,extractItems:r,scriptureReference:e,setScriptureReference:V=>t(V),localizedStrings:n})})]})}const Ga=ir.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Gc=y.forwardRef(({className:e,variant:t,size:n,...r},o)=>a.jsx(ma.Root,{ref:o,className:O(Ga({variant:t,size:n,className:e})),...r}));Gc.displayName=ma.Root.displayName;const Ha=y.createContext({size:"default",variant:"default"}),bo=y.forwardRef(({className:e,variant:t,size:n,children:r,...o},s)=>a.jsx(lr.Root,{ref:s,className:O("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",e),...o,children:a.jsx(Ha.Provider,{value:{variant:t,size:n},children:r})}));bo.displayName=lr.Root.displayName;const vn=y.forwardRef(({className:e,children:t,variant:n,size:r,...o},s)=>{const i=y.useContext(Ha);return a.jsx(lr.Item,{ref:s,className:O(Ga({variant:i.variant||n,size:i.size||r}),e),...o,children:t})});vn.displayName=lr.Item.displayName;const Hc=e=>({accessorKey:"item",header:({column:t})=>a.jsxs(be,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,ur(t.getIsSorted())]})}),Uc=e=>({accessorKey:"count",header:({column:t})=>a.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:a.jsxs(be,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,ur(t.getIsSorted())]})}),cell:({row:t})=>a.jsx("div",{className:"tw-flex tw-justify-end",children:t.getValue("count")})}),qc=(e,t)=>({accessorKey:"status",header:({column:n})=>a.jsx("div",{className:"tw-flex tw-justify-center",children:a.jsxs(be,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[e,ur(n.getIsSorted())]})}),cell:({row:n})=>{const r=n.getValue("status"),o=n.getValue("item");return a.jsxs(bo,{value:r,variant:"outline",type:"single",children:[a.jsx(vn,{onClick:()=>t([o],"approved"),value:"approved",children:a.jsx(ne.CircleCheckIcon,{})}),a.jsx(vn,{onClick:()=>t([o],"unapproved"),value:"unapproved",children:a.jsx(ne.CircleXIcon,{})}),a.jsx(vn,{onClick:()=>t([o],"unknown"),value:"unknown",children:a.jsx(ne.CircleHelpIcon,{})})]})}});function Ua({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=y.useState(""),s=i=>{o(i),e(i)};return a.jsx(Jt,{className:O("tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-[color:hsl(240,5%,64.9%)] focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",{"tw-w-full":n}),placeholder:t,value:r,onChange:i=>s(i.target.value)})}const vo=y.forwardRef(({className:e,...t},n)=>a.jsx(Re.Root,{orientation:"vertical",ref:n,className:O("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",e),...t}));vo.displayName=Re.List.displayName;const yo=y.forwardRef(({className:e,...t},n)=>a.jsx(Re.List,{ref:n,className:O("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));yo.displayName=Re.List.displayName;const qa=y.forwardRef(({className:e,...t},n)=>a.jsx(Re.Trigger,{ref:n,...t,className:O("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e)})),xo=y.forwardRef(({className:e,...t},n)=>a.jsx(Re.Content,{ref:n,className:O("mt-2 tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));xo.displayName=Re.Content.displayName;function Xc({tabList:e,onSearch:t,searchPlaceholder:n,headerTitle:r,isSearchBarFullWidth:o=!1,direction:s="ltr"}){return a.jsxs("div",{className:"pr-twp",children:[a.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[r?a.jsx("h1",{children:r}):"",a.jsx(Ua,{isFullWidth:o,onSearch:t,placeholder:n})]}),a.jsxs(vo,{dir:s,children:[a.jsx(yo,{children:e.map(i=>a.jsx(qa,{value:i.value,children:i.value},i.key))}),e.map(i=>a.jsx(xo,{value:i.value,children:i.content},i.key))]})]})}const it="scrBook",Wc="scrRef",ht="source",Yc="details",Kc="Scripture Reference",Jc="Scripture Book",Xa="Type",Zc="Details";function Qc(e,t){const n=t??!1;return[{accessorFn:r=>`${ue.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:it,header:(e==null?void 0:e.scriptureReferenceColumnName)??Kc,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?ue.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===it?Q.formatScrRef(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>Q.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>Q.formatScrRef(r.start),id:Wc,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:Q.formatScrRef(o.start)},sortingFn:(r,o)=>Q.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:ht,header:n?(e==null?void 0:e.typeColumnName)??Xa:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:Yc,header:(e==null?void 0:e.detailsColumnName)??Zc,cell:r=>r.getValue(),enableGrouping:!1}]}const ed=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:t}=e.start;let n=0;return e.end&&({offset:n}=e.end),!e.end||Q.compareScrRefs(e.start,e.end)===0?`${Q.scrRefToBBBCCCVVV(e.start)}+${t}`:`${Q.scrRefToBBBCCCVVV(e.start)}+${t}-${Q.scrRefToBBBCCCVVV(e.end)}+${n}`},ws=e=>`${ed({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function td({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:s,detailsColumnName:i,onRowSelected:l,direction:c="ltr"}){const[p,f]=y.useState([]),[b,g]=y.useState([{id:it,desc:!1}]),[d,m]=y.useState({}),u=y.useMemo(()=>e.flatMap(T=>T.data.map(R=>({...R,source:T.source}))),[e]),h=y.useMemo(()=>Qc({scriptureReferenceColumnName:r,typeColumnName:s,detailsColumnName:i},n),[r,s,i,n]);y.useEffect(()=>{p.includes(ht)?g([{id:ht,desc:!1},{id:it,desc:!1}]):g([{id:it,desc:!1}])},[p]);const x=Ne.useReactTable({data:u,columns:h,state:{grouping:p,sorting:b,rowSelection:d},onGroupingChange:f,onSortingChange:g,onRowSelectionChange:m,getExpandedRowModel:Ne.getExpandedRowModel(),getGroupedRowModel:Ne.getGroupedRowModel(),getCoreRowModel:Ne.getCoreRowModel(),getSortedRowModel:Ne.getSortedRowModel(),getRowId:ws,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});y.useEffect(()=>{if(l){const T=x.getSelectedRowModel().rowsById,R=Object.keys(T);if(R.length===1){const E=u.find(D=>ws(D)===R[0])||void 0;E&&l(E)}}},[d,u,l,x]);const C=o??Jc,N=s??Xa,k=[{label:"No Grouping",value:[]},{label:`Group by ${C}`,value:[it]},{label:`Group by ${N}`,value:[ht]},{label:`Group by ${C} and ${N}`,value:[it,ht]},{label:`Group by ${N} and ${C}`,value:[ht,it]}],v=T=>{f(JSON.parse(T))},j=(T,R)=>{!T.getIsGrouped()&&!T.getIsSelected()&&T.getToggleSelectedHandler()(R)},_=(T,R)=>T.getIsGrouped()?"":O("banded-row",R%2===0?"even":"odd"),A=(T,R,E)=>{if(!((T==null?void 0:T.length)===0||R.depth<E.column.getGroupedIndex())){if(R.getIsGrouped())switch(R.depth){case 1:return"tw-ps-4";default:return}switch(R.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return a.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!t&&a.jsxs(zt,{value:JSON.stringify(p),onValueChange:T=>{v(T)},children:[a.jsx(Nt,{className:"tw-mb-1 tw-mt-2",children:a.jsx(Gt,{})}),a.jsx(Et,{position:"item-aligned",children:a.jsx(Da,{children:k.map(T=>a.jsx(De,{value:JSON.stringify(T.value),children:T.label},T.label))})})]}),a.jsxs(_n,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[t&&a.jsx(Pn,{children:x.getHeaderGroups().map(T=>a.jsx(Qe,{children:T.headers.filter(R=>R.column.columnDef.header).map(R=>a.jsx(Ht,{colSpan:R.colSpan,className:"top-0 tw-sticky",children:R.isPlaceholder?void 0:a.jsxs("div",{children:[R.column.getCanGroup()?a.jsx(be,{variant:"ghost",title:`Toggle grouping by ${R.column.columnDef.header}`,onClick:R.column.getToggleGroupingHandler(),type:"button",children:R.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Ne.flexRender(R.column.columnDef.header,R.getContext())]})},R.id))},T.id))}),a.jsx(In,{children:x.getRowModel().rows.map((T,R)=>a.jsx(Qe,{"data-state":T.getIsSelected()?"selected":"",className:O(_(T,R)),onClick:E=>j(T,E),children:T.getVisibleCells().map(E=>{if(!(E.getIsPlaceholder()||E.column.columnDef.enableGrouping&&!E.getIsGrouped()&&(E.column.columnDef.id!==ht||!n)))return a.jsx(St,{className:O(E.column.columnDef.id,"tw-p-[1px]",A(p,T,E)),children:(()=>E.getIsGrouped()?a.jsxs(be,{variant:"link",onClick:T.getToggleExpandedHandler(),type:"button",children:[T.getIsExpanded()&&a.jsx(ne.ChevronDown,{}),!T.getIsExpanded()&&(c==="ltr"?a.jsx(ne.ChevronRight,{}):a.jsx(ne.ChevronLeft,{}))," ",Ne.flexRender(E.column.columnDef.cell,E.getContext())," (",T.subRows.length,")"]}):Ne.flexRender(E.column.columnDef.cell,E.getContext()))()},E.id)})},T.id))})]})]})}const _r={[Q.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[Q.getLocalizeKeyForScrollGroupId(0)]:"A",[Q.getLocalizeKeyForScrollGroupId(1)]:"B",[Q.getLocalizeKeyForScrollGroupId(2)]:"C",[Q.getLocalizeKeyForScrollGroupId(3)]:"D",[Q.getLocalizeKeyForScrollGroupId(4)]:"E",[Q.getLocalizeKeyForScrollGroupId(5)]:"F",[Q.getLocalizeKeyForScrollGroupId(6)]:"G",[Q.getLocalizeKeyForScrollGroupId(7)]:"H",[Q.getLocalizeKeyForScrollGroupId(8)]:"I",[Q.getLocalizeKeyForScrollGroupId(9)]:"J",[Q.getLocalizeKeyForScrollGroupId(10)]:"K",[Q.getLocalizeKeyForScrollGroupId(11)]:"L",[Q.getLocalizeKeyForScrollGroupId(12)]:"M",[Q.getLocalizeKeyForScrollGroupId(13)]:"N",[Q.getLocalizeKeyForScrollGroupId(14)]:"O",[Q.getLocalizeKeyForScrollGroupId(15)]:"P",[Q.getLocalizeKeyForScrollGroupId(16)]:"Q",[Q.getLocalizeKeyForScrollGroupId(17)]:"R",[Q.getLocalizeKeyForScrollGroupId(18)]:"S",[Q.getLocalizeKeyForScrollGroupId(19)]:"T",[Q.getLocalizeKeyForScrollGroupId(20)]:"U",[Q.getLocalizeKeyForScrollGroupId(21)]:"V",[Q.getLocalizeKeyForScrollGroupId(22)]:"W",[Q.getLocalizeKeyForScrollGroupId(23)]:"X",[Q.getLocalizeKeyForScrollGroupId(24)]:"Y",[Q.getLocalizeKeyForScrollGroupId(25)]:"Z"};function nd({availableScrollGroupIds:e,scrollGroupId:t,onChangeScrollGroupId:n,localizedStrings:r={}}){const o={..._r,...Object.fromEntries(Object.entries(r).map(([s,i])=>[s,s===i&&s in _r?_r[s]:i]))};return a.jsxs(zt,{value:`${t}`,onValueChange:s=>n(s==="undefined"?void 0:parseInt(s,10)),children:[a.jsx(Nt,{className:"pr-twp tw-w-auto",children:a.jsx(Gt,{placeholder:o[Q.getLocalizeKeyForScrollGroupId(t)]??t})}),a.jsx(Et,{style:{zIndex:250},children:e.map(s=>a.jsx(De,{value:`${s}`,children:o[Q.getLocalizeKeyForScrollGroupId(s)]},`${s}`))})]})}const ko=y.forwardRef(({className:e,orientation:t="horizontal",decorative:n=!0,...r},o)=>a.jsx(ha.Root,{ref:o,decorative:n,orientation:t,className:O("pr-twp tw-shrink-0 tw-bg-border",t==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",e),...r}));ko.displayName=ha.Root.displayName;function rd({children:e}){return a.jsx("div",{className:"pr-twp tw-grid",children:e})}function od({primary:e,secondary:t,children:n,isLoading:r=!1,loadingMessage:o}){return a.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[a.jsxs("div",{children:[a.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:e}),a.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:t})]}),r?a.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):a.jsx("div",{children:n})]})}function sd({primary:e,secondary:t,includeSeparator:n=!1}){return a.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[a.jsxs("div",{children:[a.jsx("h3",{className:"tw-text-lg tw-font-medium",children:e}),a.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:t})]}),n?a.jsx(ko,{}):""]})}const No=y.forwardRef(({className:e,...t},n)=>a.jsx(Wr.Root,{ref:n,className:O("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",e),...t,children:a.jsx(Wr.Indicator,{className:O("tw-flex tw-items-center tw-justify-center tw-text-current"),children:a.jsx(ne.Check,{className:"tw-h-4 tw-w-4"})})}));No.displayName=Wr.Root.displayName;function ad({id:e,className:t,listItems:n,selectedListItems:r,handleSelectListItem:o,createLabel:s}){return a.jsx("div",{id:e,className:t,children:n.map(i=>a.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[a.jsx(No,{className:"tw-mr-2 tw-align-middle",checked:r.includes(i),onCheckedChange:l=>o(i,l)}),a.jsx(qe,{children:s?s(i):i})]},i))})}function id(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function ld(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Eo={},Wa={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Wa);var cd=Wa.exports,Pr={};function So(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},P.apply(this,arguments)}function vt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Ya(e){if(!vt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Ya(e[n])}),t}function et(e,t,n={clone:!0}){const r=n.clone?P({},e):e;return vt(e)&&vt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(vt(t[o])&&o in e&&vt(e[o])?r[o]=et(e[o],t[o],n):n.clone?r[o]=vt(t[o])?Ya(t[o]):t[o]:r[o]=t[o])}),r}var Jr={exports:{}},Hn={exports:{}},ie={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ms;function dd(){if(ms)return ie;ms=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,p=e?Symbol.for("react.concurrent_mode"):60111,f=e?Symbol.for("react.forward_ref"):60112,b=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,m=e?Symbol.for("react.lazy"):60116,u=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,C=e?Symbol.for("react.scope"):60119;function N(v){if(typeof v=="object"&&v!==null){var j=v.$$typeof;switch(j){case t:switch(v=v.type,v){case c:case p:case r:case s:case o:case b:return v;default:switch(v=v&&v.$$typeof,v){case l:case f:case m:case d:case i:return v;default:return j}}case n:return j}}}function k(v){return N(v)===p}return ie.AsyncMode=c,ie.ConcurrentMode=p,ie.ContextConsumer=l,ie.ContextProvider=i,ie.Element=t,ie.ForwardRef=f,ie.Fragment=r,ie.Lazy=m,ie.Memo=d,ie.Portal=n,ie.Profiler=s,ie.StrictMode=o,ie.Suspense=b,ie.isAsyncMode=function(v){return k(v)||N(v)===c},ie.isConcurrentMode=k,ie.isContextConsumer=function(v){return N(v)===l},ie.isContextProvider=function(v){return N(v)===i},ie.isElement=function(v){return typeof v=="object"&&v!==null&&v.$$typeof===t},ie.isForwardRef=function(v){return N(v)===f},ie.isFragment=function(v){return N(v)===r},ie.isLazy=function(v){return N(v)===m},ie.isMemo=function(v){return N(v)===d},ie.isPortal=function(v){return N(v)===n},ie.isProfiler=function(v){return N(v)===s},ie.isStrictMode=function(v){return N(v)===o},ie.isSuspense=function(v){return N(v)===b},ie.isValidElementType=function(v){return typeof v=="string"||typeof v=="function"||v===r||v===p||v===s||v===o||v===b||v===g||typeof v=="object"&&v!==null&&(v.$$typeof===m||v.$$typeof===d||v.$$typeof===i||v.$$typeof===l||v.$$typeof===f||v.$$typeof===h||v.$$typeof===x||v.$$typeof===C||v.$$typeof===u)},ie.typeOf=N,ie}var le={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hs;function ud(){return hs||(hs=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,p=e?Symbol.for("react.concurrent_mode"):60111,f=e?Symbol.for("react.forward_ref"):60112,b=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,m=e?Symbol.for("react.lazy"):60116,u=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,C=e?Symbol.for("react.scope"):60119;function N($){return typeof $=="string"||typeof $=="function"||$===r||$===p||$===s||$===o||$===b||$===g||typeof $=="object"&&$!==null&&($.$$typeof===m||$.$$typeof===d||$.$$typeof===i||$.$$typeof===l||$.$$typeof===f||$.$$typeof===h||$.$$typeof===x||$.$$typeof===C||$.$$typeof===u)}function k($){if(typeof $=="object"&&$!==null){var xe=$.$$typeof;switch(xe){case t:var L=$.type;switch(L){case c:case p:case r:case s:case o:case b:return L;default:var ye=L&&L.$$typeof;switch(ye){case l:case f:case m:case d:case i:return ye;default:return xe}}case n:return xe}}}var v=c,j=p,_=l,A=i,T=t,R=f,E=r,D=m,B=d,J=n,Y=s,H=o,te=b,ae=!1;function V($){return ae||(ae=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),S($)||k($)===c}function S($){return k($)===p}function I($){return k($)===l}function U($){return k($)===i}function z($){return typeof $=="object"&&$!==null&&$.$$typeof===t}function F($){return k($)===f}function X($){return k($)===r}function G($){return k($)===m}function W($){return k($)===d}function q($){return k($)===n}function K($){return k($)===s}function Z($){return k($)===o}function pe($){return k($)===b}le.AsyncMode=v,le.ConcurrentMode=j,le.ContextConsumer=_,le.ContextProvider=A,le.Element=T,le.ForwardRef=R,le.Fragment=E,le.Lazy=D,le.Memo=B,le.Portal=J,le.Profiler=Y,le.StrictMode=H,le.Suspense=te,le.isAsyncMode=V,le.isConcurrentMode=S,le.isContextConsumer=I,le.isContextProvider=U,le.isElement=z,le.isForwardRef=F,le.isFragment=X,le.isLazy=G,le.isMemo=W,le.isPortal=q,le.isProfiler=K,le.isStrictMode=Z,le.isSuspense=pe,le.isValidElementType=N,le.typeOf=k}()),le}var gs;function Ka(){return gs||(gs=1,process.env.NODE_ENV==="production"?Hn.exports=dd():Hn.exports=ud()),Hn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Ir,bs;function pd(){if(bs)return Ir;bs=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(s){if(s==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(s)}function o(){try{if(!Object.assign)return!1;var s=new String("abc");if(s[5]="de",Object.getOwnPropertyNames(s)[0]==="5")return!1;for(var i={},l=0;l<10;l++)i["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(i).map(function(f){return i[f]});if(c.join("")!=="0123456789")return!1;var p={};return"abcdefghijklmnopqrst".split("").forEach(function(f){p[f]=f}),Object.keys(Object.assign({},p)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Ir=o()?Object.assign:function(s,i){for(var l,c=r(s),p,f=1;f<arguments.length;f++){l=Object(arguments[f]);for(var b in l)t.call(l,b)&&(c[b]=l[b]);if(e){p=e(l);for(var g=0;g<p.length;g++)n.call(l,p[g])&&(c[p[g]]=l[p[g]])}}return c},Ir}var $r,vs;function To(){if(vs)return $r;vs=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return $r=e,$r}var Mr,ys;function Ja(){return ys||(ys=1,Mr=Function.call.bind(Object.prototype.hasOwnProperty)),Mr}var Ar,xs;function fd(){if(xs)return Ar;xs=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=To(),n={},r=Ja();e=function(s){var i="Warning: "+s;typeof console<"u"&&console.error(i);try{throw new Error(i)}catch{}}}function o(s,i,l,c,p){if(process.env.NODE_ENV!=="production"){for(var f in s)if(r(s,f)){var b;try{if(typeof s[f]!="function"){var g=Error((c||"React class")+": "+l+" type `"+f+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof s[f]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw g.name="Invariant Violation",g}b=s[f](i,f,c,l,null,t)}catch(m){b=m}if(b&&!(b instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+f+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof b+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),b instanceof Error&&!(b.message in n)){n[b.message]=!0;var d=p?p():"";e("Failed "+l+" type: "+b.message+(d??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Ar=o,Ar}var Dr,ks;function wd(){if(ks)return Dr;ks=1;var e=Ka(),t=pd(),n=To(),r=Ja(),o=fd(),s=function(){};process.env.NODE_ENV!=="production"&&(s=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function i(){return null}return Dr=function(l,c){var p=typeof Symbol=="function"&&Symbol.iterator,f="@@iterator";function b(S){var I=S&&(p&&S[p]||S[f]);if(typeof I=="function")return I}var g="<<anonymous>>",d={array:x("array"),bigint:x("bigint"),bool:x("boolean"),func:x("function"),number:x("number"),object:x("object"),string:x("string"),symbol:x("symbol"),any:C(),arrayOf:N,element:k(),elementType:v(),instanceOf:j,node:R(),objectOf:A,oneOf:_,oneOfType:T,shape:D,exact:B};function m(S,I){return S===I?S!==0||1/S===1/I:S!==S&&I!==I}function u(S,I){this.message=S,this.data=I&&typeof I=="object"?I:{},this.stack=""}u.prototype=Error.prototype;function h(S){if(process.env.NODE_ENV!=="production")var I={},U=0;function z(X,G,W,q,K,Z,pe){if(q=q||g,Z=Z||W,pe!==n){if(c){var $=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw $.name="Invariant Violation",$}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var xe=q+":"+W;!I[xe]&&U<3&&(s("You are manually calling a React.PropTypes validation function for the `"+Z+"` prop on `"+q+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),I[xe]=!0,U++)}}return G[W]==null?X?G[W]===null?new u("The "+K+" `"+Z+"` is marked as required "+("in `"+q+"`, but its value is `null`.")):new u("The "+K+" `"+Z+"` is marked as required in "+("`"+q+"`, but its value is `undefined`.")):null:S(G,W,q,K,Z)}var F=z.bind(null,!1);return F.isRequired=z.bind(null,!0),F}function x(S){function I(U,z,F,X,G,W){var q=U[z],K=H(q);if(K!==S){var Z=te(q);return new u("Invalid "+X+" `"+G+"` of type "+("`"+Z+"` supplied to `"+F+"`, expected ")+("`"+S+"`."),{expectedType:S})}return null}return h(I)}function C(){return h(i)}function N(S){function I(U,z,F,X,G){if(typeof S!="function")return new u("Property `"+G+"` of component `"+F+"` has invalid PropType notation inside arrayOf.");var W=U[z];if(!Array.isArray(W)){var q=H(W);return new u("Invalid "+X+" `"+G+"` of type "+("`"+q+"` supplied to `"+F+"`, expected an array."))}for(var K=0;K<W.length;K++){var Z=S(W,K,F,X,G+"["+K+"]",n);if(Z instanceof Error)return Z}return null}return h(I)}function k(){function S(I,U,z,F,X){var G=I[U];if(!l(G)){var W=H(G);return new u("Invalid "+F+" `"+X+"` of type "+("`"+W+"` supplied to `"+z+"`, expected a single ReactElement."))}return null}return h(S)}function v(){function S(I,U,z,F,X){var G=I[U];if(!e.isValidElementType(G)){var W=H(G);return new u("Invalid "+F+" `"+X+"` of type "+("`"+W+"` supplied to `"+z+"`, expected a single ReactElement type."))}return null}return h(S)}function j(S){function I(U,z,F,X,G){if(!(U[z]instanceof S)){var W=S.name||g,q=V(U[z]);return new u("Invalid "+X+" `"+G+"` of type "+("`"+q+"` supplied to `"+F+"`, expected ")+("instance of `"+W+"`."))}return null}return h(I)}function _(S){if(!Array.isArray(S))return process.env.NODE_ENV!=="production"&&(arguments.length>1?s("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):s("Invalid argument supplied to oneOf, expected an array.")),i;function I(U,z,F,X,G){for(var W=U[z],q=0;q<S.length;q++)if(m(W,S[q]))return null;var K=JSON.stringify(S,function(pe,$){var xe=te($);return xe==="symbol"?String($):$});return new u("Invalid "+X+" `"+G+"` of value `"+String(W)+"` "+("supplied to `"+F+"`, expected one of "+K+"."))}return h(I)}function A(S){function I(U,z,F,X,G){if(typeof S!="function")return new u("Property `"+G+"` of component `"+F+"` has invalid PropType notation inside objectOf.");var W=U[z],q=H(W);if(q!=="object")return new u("Invalid "+X+" `"+G+"` of type "+("`"+q+"` supplied to `"+F+"`, expected an object."));for(var K in W)if(r(W,K)){var Z=S(W,K,F,X,G+"."+K,n);if(Z instanceof Error)return Z}return null}return h(I)}function T(S){if(!Array.isArray(S))return process.env.NODE_ENV!=="production"&&s("Invalid argument supplied to oneOfType, expected an instance of array."),i;for(var I=0;I<S.length;I++){var U=S[I];if(typeof U!="function")return s("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ae(U)+" at index "+I+"."),i}function z(F,X,G,W,q){for(var K=[],Z=0;Z<S.length;Z++){var pe=S[Z],$=pe(F,X,G,W,q,n);if($==null)return null;$.data&&r($.data,"expectedType")&&K.push($.data.expectedType)}var xe=K.length>0?", expected one of type ["+K.join(", ")+"]":"";return new u("Invalid "+W+" `"+q+"` supplied to "+("`"+G+"`"+xe+"."))}return h(z)}function R(){function S(I,U,z,F,X){return J(I[U])?null:new u("Invalid "+F+" `"+X+"` supplied to "+("`"+z+"`, expected a ReactNode."))}return h(S)}function E(S,I,U,z,F){return new u((S||"React class")+": "+I+" type `"+U+"."+z+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+F+"`.")}function D(S){function I(U,z,F,X,G){var W=U[z],q=H(W);if(q!=="object")return new u("Invalid "+X+" `"+G+"` of type `"+q+"` "+("supplied to `"+F+"`, expected `object`."));for(var K in S){var Z=S[K];if(typeof Z!="function")return E(F,X,G,K,te(Z));var pe=Z(W,K,F,X,G+"."+K,n);if(pe)return pe}return null}return h(I)}function B(S){function I(U,z,F,X,G){var W=U[z],q=H(W);if(q!=="object")return new u("Invalid "+X+" `"+G+"` of type `"+q+"` "+("supplied to `"+F+"`, expected `object`."));var K=t({},U[z],S);for(var Z in K){var pe=S[Z];if(r(S,Z)&&typeof pe!="function")return E(F,X,G,Z,te(pe));if(!pe)return new u("Invalid "+X+" `"+G+"` key `"+Z+"` supplied to `"+F+"`.\nBad object: "+JSON.stringify(U[z],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(S),null,"  "));var $=pe(W,Z,F,X,G+"."+Z,n);if($)return $}return null}return h(I)}function J(S){switch(typeof S){case"number":case"string":case"undefined":return!0;case"boolean":return!S;case"object":if(Array.isArray(S))return S.every(J);if(S===null||l(S))return!0;var I=b(S);if(I){var U=I.call(S),z;if(I!==S.entries){for(;!(z=U.next()).done;)if(!J(z.value))return!1}else for(;!(z=U.next()).done;){var F=z.value;if(F&&!J(F[1]))return!1}}else return!1;return!0;default:return!1}}function Y(S,I){return S==="symbol"?!0:I?I["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&I instanceof Symbol:!1}function H(S){var I=typeof S;return Array.isArray(S)?"array":S instanceof RegExp?"object":Y(I,S)?"symbol":I}function te(S){if(typeof S>"u"||S===null)return""+S;var I=H(S);if(I==="object"){if(S instanceof Date)return"date";if(S instanceof RegExp)return"regexp"}return I}function ae(S){var I=te(S);switch(I){case"array":case"object":return"an "+I;case"boolean":case"date":case"regexp":return"a "+I;default:return I}}function V(S){return!S.constructor||!S.constructor.name?g:S.constructor.name}return d.checkPropTypes=o,d.resetWarningCache=o.resetWarningCache,d.PropTypes=d,d},Dr}var Br,Ns;function md(){if(Ns)return Br;Ns=1;var e=To();function t(){}function n(){}return n.resetWarningCache=t,Br=function(){function r(i,l,c,p,f,b){if(b!==e){var g=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw g.name="Invariant Violation",g}}r.isRequired=r;function o(){return r}var s={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return s.PropTypes=s,s},Br}if(process.env.NODE_ENV!=="production"){var hd=Ka(),gd=!0;Jr.exports=wd()(hd.isElement,gd)}else Jr.exports=md()();var bd=Jr.exports;const w=id(bd);function vd(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Za(e,t,n,r,o){const s=e[t],i=o||t;if(s==null||typeof window>"u")return null;let l;const c=s.type;return typeof c=="function"&&!vd(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Qa=So(w.element,Za);Qa.isRequired=So(w.element.isRequired,Za);const ei=Qa,yd="exact-prop: ​";function xd(e){return process.env.NODE_ENV==="production"?e:P({},e,{[yd]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Ut(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Zr={exports:{}},ce={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Es;function kd(){if(Es)return ce;Es=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),f=Symbol.for("react.suspense_list"),b=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),m;m=Symbol.for("react.module.reference");function u(h){if(typeof h=="object"&&h!==null){var x=h.$$typeof;switch(x){case e:switch(h=h.type,h){case n:case o:case r:case p:case f:return h;default:switch(h=h&&h.$$typeof,h){case l:case i:case c:case g:case b:case s:return h;default:return x}}case t:return x}}}return ce.ContextConsumer=i,ce.ContextProvider=s,ce.Element=e,ce.ForwardRef=c,ce.Fragment=n,ce.Lazy=g,ce.Memo=b,ce.Portal=t,ce.Profiler=o,ce.StrictMode=r,ce.Suspense=p,ce.SuspenseList=f,ce.isAsyncMode=function(){return!1},ce.isConcurrentMode=function(){return!1},ce.isContextConsumer=function(h){return u(h)===i},ce.isContextProvider=function(h){return u(h)===s},ce.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===e},ce.isForwardRef=function(h){return u(h)===c},ce.isFragment=function(h){return u(h)===n},ce.isLazy=function(h){return u(h)===g},ce.isMemo=function(h){return u(h)===b},ce.isPortal=function(h){return u(h)===t},ce.isProfiler=function(h){return u(h)===o},ce.isStrictMode=function(h){return u(h)===r},ce.isSuspense=function(h){return u(h)===p},ce.isSuspenseList=function(h){return u(h)===f},ce.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===n||h===o||h===r||h===p||h===f||h===d||typeof h=="object"&&h!==null&&(h.$$typeof===g||h.$$typeof===b||h.$$typeof===s||h.$$typeof===i||h.$$typeof===c||h.$$typeof===m||h.getModuleId!==void 0)},ce.typeOf=u,ce}var de={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ss;function Nd(){return Ss||(Ss=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),f=Symbol.for("react.suspense_list"),b=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),m=!1,u=!1,h=!1,x=!1,C=!1,N;N=Symbol.for("react.module.reference");function k(L){return!!(typeof L=="string"||typeof L=="function"||L===n||L===o||C||L===r||L===p||L===f||x||L===d||m||u||h||typeof L=="object"&&L!==null&&(L.$$typeof===g||L.$$typeof===b||L.$$typeof===s||L.$$typeof===i||L.$$typeof===c||L.$$typeof===N||L.getModuleId!==void 0))}function v(L){if(typeof L=="object"&&L!==null){var ye=L.$$typeof;switch(ye){case e:var Ge=L.type;switch(Ge){case n:case o:case r:case p:case f:return Ge;default:var pt=Ge&&Ge.$$typeof;switch(pt){case l:case i:case c:case g:case b:case s:return pt;default:return ye}}case t:return ye}}}var j=i,_=s,A=e,T=c,R=n,E=g,D=b,B=t,J=o,Y=r,H=p,te=f,ae=!1,V=!1;function S(L){return ae||(ae=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function I(L){return V||(V=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function U(L){return v(L)===i}function z(L){return v(L)===s}function F(L){return typeof L=="object"&&L!==null&&L.$$typeof===e}function X(L){return v(L)===c}function G(L){return v(L)===n}function W(L){return v(L)===g}function q(L){return v(L)===b}function K(L){return v(L)===t}function Z(L){return v(L)===o}function pe(L){return v(L)===r}function $(L){return v(L)===p}function xe(L){return v(L)===f}de.ContextConsumer=j,de.ContextProvider=_,de.Element=A,de.ForwardRef=T,de.Fragment=R,de.Lazy=E,de.Memo=D,de.Portal=B,de.Profiler=J,de.StrictMode=Y,de.Suspense=H,de.SuspenseList=te,de.isAsyncMode=S,de.isConcurrentMode=I,de.isContextConsumer=U,de.isContextProvider=z,de.isElement=F,de.isForwardRef=X,de.isFragment=G,de.isLazy=W,de.isMemo=q,de.isPortal=K,de.isProfiler=Z,de.isStrictMode=pe,de.isSuspense=$,de.isSuspenseList=xe,de.isValidElementType=k,de.typeOf=v}()),de}process.env.NODE_ENV==="production"?Zr.exports=kd():Zr.exports=Nd();var Ts=Zr.exports;const Ed=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Sd(e){const t=`${e}`.match(Ed);return t&&t[1]||""}function ti(e,t=""){return e.displayName||e.name||Sd(e)||t}function Cs(e,t,n){const r=ti(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Td(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return ti(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Ts.ForwardRef:return Cs(e,e.render,"ForwardRef");case Ts.Memo:return Cs(e,e.type,"memo");default:return}}}function Sn(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=e[t],i=o||t;return s==null?null:s&&s.nodeType!==1?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Cd=w.oneOfType([w.func,w.object]),ni=Cd;function Ye(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Ut(7));return e.charAt(0).toUpperCase()+e.slice(1)}function jd(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Od(e,t=166){let n;function r(...o){const s=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(s,t)}return r.clear=()=>{clearTimeout(n)},r}function Rd(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,s,i)=>{const l=o||"<<anonymous>>",c=i||r;return typeof n[r]<"u"?new Error(`The ${s} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function _d(e,t){var n,r;return M.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function er(e){return e&&e.ownerDocument||document}function Pd(e){return er(e).defaultView||window}function Id(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?P({},t.propTypes):null;return o=>(s,i,l,c,p,...f)=>{const b=p||i,g=n==null?void 0:n[b];if(g){const d=g(s,i,l,c,p,...f);if(d)return d}return typeof s[i]<"u"&&!s[o]?new Error(`The prop \`${b}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function tr(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const $d=typeof window<"u"?M.useLayoutEffect:M.useEffect,qt=$d;let js=0;function Md(e){const[t,n]=M.useState(e),r=e||t;return M.useEffect(()=>{t==null&&(js+=1,n(`mui-${js}`))},[t]),r}const Os=M["useId".toString()];function ri(e){if(Os!==void 0){const t=Os();return e??t}return Md(e)}function Ad(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=o||t;return typeof e[t]<"u"?new Error(`The prop \`${s}\` is not supported. Please remove it.`):null}function oi({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=M.useRef(e!==void 0),[s,i]=M.useState(t),l=o?e:s;if(process.env.NODE_ENV!=="production"){M.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:p}=M.useRef(t);M.useEffect(()=>{!o&&p!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=M.useCallback(p=>{o||i(p)},[]);return[l,c]}function Qr(e){const t=M.useRef(e);return qt(()=>{t.current=e}),M.useRef((...n)=>(0,t.current)(...n)).current}function Tt(...e){return M.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{tr(n,t)})},e)}const Rs={};function Dd(e,t){const n=M.useRef(Rs);return n.current===Rs&&(n.current=e(t)),n}const Bd=[];function Ld(e){M.useEffect(e,Bd)}class $n{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new $n}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function mn(){const e=Dd($n.create).current;return Ld(e.disposeEffect),e}let pr=!0,eo=!1;const Vd=new $n,Fd={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function zd(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Fd[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Gd(e){e.metaKey||e.altKey||e.ctrlKey||(pr=!0)}function Lr(){pr=!1}function Hd(){this.visibilityState==="hidden"&&eo&&(pr=!0)}function Ud(e){e.addEventListener("keydown",Gd,!0),e.addEventListener("mousedown",Lr,!0),e.addEventListener("pointerdown",Lr,!0),e.addEventListener("touchstart",Lr,!0),e.addEventListener("visibilitychange",Hd,!0)}function qd(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return pr||zd(t)}function si(){const e=M.useCallback(o=>{o!=null&&Ud(o.ownerDocument)},[]),t=M.useRef(!1);function n(){return t.current?(eo=!0,Vd.start(100,()=>{eo=!1}),t.current=!1,!0):!1}function r(o){return qd(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function ai(e,t){const n=P({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=P({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},s=t[r];n[r]={},!s||!Object.keys(s)?n[r]=o:!o||!Object.keys(o)?n[r]=s:(n[r]=P({},s),Object.keys(o).forEach(i=>{n[r][i]=ai(o[i],s[i])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function Co(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((s,i)=>{if(i){const l=t(i);l!==""&&s.push(l),n&&n[i]&&s.push(n[i])}return s},[]).join(" ")}),r}const _s=e=>e,Xd=()=>{let e=_s;return{configure(t){e=t},generate(t){return e(t)},reset(){e=_s}}},Wd=Xd(),ii=Wd,li={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function fr(e,t,n="Mui"){const r=li[t];return r?`${n}-${r}`:`${ii.generate(e)}-${t}`}function ci(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=fr(e,o,n)}),r}function Yd(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function ke(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,s;for(s=0;s<r.length;s++)o=r[s],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}const Kd=["values","unit","step"],Jd=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>P({},n,{[r.key]:r.val}),{})};function Zd(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=ke(e,Kd),s=Jd(t),i=Object.keys(s);function l(g){return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${n})`}function c(g){return`@media (max-width:${(typeof t[g]=="number"?t[g]:g)-r/100}${n})`}function p(g,d){const m=i.indexOf(d);return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${n}) and (max-width:${(m!==-1&&typeof t[i[m]]=="number"?t[i[m]]:d)-r/100}${n})`}function f(g){return i.indexOf(g)+1<i.length?p(g,i[i.indexOf(g)+1]):l(g)}function b(g){const d=i.indexOf(g);return d===0?l(i[1]):d===i.length-1?c(i[d]):p(g,i[i.indexOf(g)+1]).replace("@media","@media not all and")}return P({keys:i,values:s,up:l,down:c,between:p,only:f,not:b,unit:n},o)}const Qd={borderRadius:4},eu=Qd,tu=process.env.NODE_ENV!=="production"?w.oneOfType([w.number,w.string,w.object,w.array]):{},dt=tu;function yn(e,t){return t?et(e,t,{clone:!1}):e}const jo={xs:0,sm:600,md:900,lg:1200,xl:1536},Ps={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${jo[e]}px)`};function tt(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const s=r.breakpoints||Ps;return t.reduce((i,l,c)=>(i[s.up(s.keys[c])]=n(t[c]),i),{})}if(typeof t=="object"){const s=r.breakpoints||Ps;return Object.keys(t).reduce((i,l)=>{if(Object.keys(s.values||jo).indexOf(l)!==-1){const c=s.up(l);i[c]=n(t[l],l)}else{const c=l;i[c]=t[c]}return i},{})}return n(t)}function nu(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const s=e.up(o);return r[s]={},r},{}))||{}}function ru(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function wr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,s)=>o&&o[s]?o[s]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function nr(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=wr(e,n)||r,t&&(o=t(o,r,e)),o}function ve(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,s=i=>{if(i[t]==null)return null;const l=i[t],c=i.theme,p=wr(c,r)||{};return tt(i,l,b=>{let g=nr(p,o,b);return b===g&&typeof b=="string"&&(g=nr(p,o,`${t}${b==="default"?"":Ye(b)}`,b)),n===!1?g:{[n]:g}})};return s.propTypes=process.env.NODE_ENV!=="production"?{[t]:dt}:{},s.filterProps=[t],s}function ou(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const su={m:"margin",p:"padding"},au={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Is={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},iu=ou(e=>{if(e.length>2)if(Is[e])e=Is[e];else return[e];const[t,n]=e.split(""),r=su[t],o=au[n]||"";return Array.isArray(o)?o.map(s=>r+s):[r+o]}),mr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],hr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],lu=[...mr,...hr];function Mn(e,t,n,r){var o;const s=(o=wr(e,t,!1))!=null?o:n;return typeof s=="number"?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&typeof i!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`),s*i):Array.isArray(s)?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&(Number.isInteger(i)?i>s.length-1&&console.error([`MUI: The value provided (${i}) overflows.`,`The supported values are: ${JSON.stringify(s)}.`,`${i} > ${s.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),s[i]):typeof s=="function"?s:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${s}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function di(e){return Mn(e,"spacing",8,"spacing")}function An(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function cu(e,t){return n=>e.reduce((r,o)=>(r[o]=An(t,n),r),{})}function du(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=iu(n),s=cu(o,r),i=e[n];return tt(e,i,s)}function ui(e,t){const n=di(e.theme);return Object.keys(e).map(r=>du(e,t,r,n)).reduce(yn,{})}function me(e){return ui(e,mr)}me.propTypes=process.env.NODE_ENV!=="production"?mr.reduce((e,t)=>(e[t]=dt,e),{}):{};me.filterProps=mr;function he(e){return ui(e,hr)}he.propTypes=process.env.NODE_ENV!=="production"?hr.reduce((e,t)=>(e[t]=dt,e),{}):{};he.filterProps=hr;process.env.NODE_ENV!=="production"&&lu.reduce((e,t)=>(e[t]=dt,e),{});function uu(e=8){if(e.mui)return e;const t=di({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(s=>{const i=t(s);return typeof i=="number"?`${i}px`:i}).join(" "));return n.mui=!0,n}function gr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(s=>{r[s]=o}),r),{}),n=r=>Object.keys(r).reduce((o,s)=>t[s]?yn(o,t[s](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Be(e){return typeof e!="number"?e:`${e}px solid`}function ze(e,t){return ve({prop:e,themeKey:"borders",transform:t})}const pu=ze("border",Be),fu=ze("borderTop",Be),wu=ze("borderRight",Be),mu=ze("borderBottom",Be),hu=ze("borderLeft",Be),gu=ze("borderColor"),bu=ze("borderTopColor"),vu=ze("borderRightColor"),yu=ze("borderBottomColor"),xu=ze("borderLeftColor"),ku=ze("outline",Be),Nu=ze("outlineColor"),br=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Mn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:An(t,r)});return tt(e,e.borderRadius,n)}return null};br.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:dt}:{};br.filterProps=["borderRadius"];gr(pu,fu,wu,mu,hu,gu,bu,vu,yu,xu,br,ku,Nu);const vr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Mn(e.theme,"spacing",8,"gap"),n=r=>({gap:An(t,r)});return tt(e,e.gap,n)}return null};vr.propTypes=process.env.NODE_ENV!=="production"?{gap:dt}:{};vr.filterProps=["gap"];const yr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Mn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:An(t,r)});return tt(e,e.columnGap,n)}return null};yr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:dt}:{};yr.filterProps=["columnGap"];const xr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Mn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:An(t,r)});return tt(e,e.rowGap,n)}return null};xr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:dt}:{};xr.filterProps=["rowGap"];const Eu=ve({prop:"gridColumn"}),Su=ve({prop:"gridRow"}),Tu=ve({prop:"gridAutoFlow"}),Cu=ve({prop:"gridAutoColumns"}),ju=ve({prop:"gridAutoRows"}),Ou=ve({prop:"gridTemplateColumns"}),Ru=ve({prop:"gridTemplateRows"}),_u=ve({prop:"gridTemplateAreas"}),Pu=ve({prop:"gridArea"});gr(vr,yr,xr,Eu,Su,Tu,Cu,ju,Ou,Ru,_u,Pu);function Ft(e,t){return t==="grey"?t:e}const Iu=ve({prop:"color",themeKey:"palette",transform:Ft}),$u=ve({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Ft}),Mu=ve({prop:"backgroundColor",themeKey:"palette",transform:Ft});gr(Iu,$u,Mu);function Ie(e){return e<=1&&e!==0?`${e*100}%`:e}const Au=ve({prop:"width",transform:Ie}),Oo=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const s=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||jo[n];return s?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${s}${e.theme.breakpoints.unit}`}:{maxWidth:s}:{maxWidth:Ie(n)}};return tt(e,e.maxWidth,t)}return null};Oo.filterProps=["maxWidth"];const Du=ve({prop:"minWidth",transform:Ie}),Bu=ve({prop:"height",transform:Ie}),Lu=ve({prop:"maxHeight",transform:Ie}),Vu=ve({prop:"minHeight",transform:Ie});ve({prop:"size",cssProperty:"width",transform:Ie});ve({prop:"size",cssProperty:"height",transform:Ie});const Fu=ve({prop:"boxSizing"});gr(Au,Oo,Du,Bu,Lu,Vu,Fu);const zu={border:{themeKey:"borders",transform:Be},borderTop:{themeKey:"borders",transform:Be},borderRight:{themeKey:"borders",transform:Be},borderBottom:{themeKey:"borders",transform:Be},borderLeft:{themeKey:"borders",transform:Be},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Be},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:br},color:{themeKey:"palette",transform:Ft},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Ft},backgroundColor:{themeKey:"palette",transform:Ft},p:{style:he},pt:{style:he},pr:{style:he},pb:{style:he},pl:{style:he},px:{style:he},py:{style:he},padding:{style:he},paddingTop:{style:he},paddingRight:{style:he},paddingBottom:{style:he},paddingLeft:{style:he},paddingX:{style:he},paddingY:{style:he},paddingInline:{style:he},paddingInlineStart:{style:he},paddingInlineEnd:{style:he},paddingBlock:{style:he},paddingBlockStart:{style:he},paddingBlockEnd:{style:he},m:{style:me},mt:{style:me},mr:{style:me},mb:{style:me},ml:{style:me},mx:{style:me},my:{style:me},margin:{style:me},marginTop:{style:me},marginRight:{style:me},marginBottom:{style:me},marginLeft:{style:me},marginX:{style:me},marginY:{style:me},marginInline:{style:me},marginInlineStart:{style:me},marginInlineEnd:{style:me},marginBlock:{style:me},marginBlockStart:{style:me},marginBlockEnd:{style:me},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:vr},rowGap:{style:xr},columnGap:{style:yr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ie},maxWidth:{style:Oo},minWidth:{transform:Ie},height:{transform:Ie},maxHeight:{transform:Ie},minHeight:{transform:Ie},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Ro=zu;function Gu(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Hu(e,t){return typeof e=="function"?e(t):e}function Uu(){function e(n,r,o,s){const i={[n]:r,theme:o},l=s[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:p,transform:f,style:b}=l;if(r==null)return null;if(p==="typography"&&r==="inherit")return{[n]:r};const g=wr(o,p)||{};return b?b(i):tt(i,r,m=>{let u=nr(g,f,m);return m===u&&typeof m=="string"&&(u=nr(g,f,`${n}${m==="default"?"":Ye(m)}`,m)),c===!1?u:{[c]:u}})}function t(n){var r;const{sx:o,theme:s={}}=n||{};if(!o)return null;const i=(r=s.unstable_sxConfig)!=null?r:Ro;function l(c){let p=c;if(typeof c=="function")p=c(s);else if(typeof c!="object")return c;if(!p)return null;const f=nu(s.breakpoints),b=Object.keys(f);let g=f;return Object.keys(p).forEach(d=>{const m=Hu(p[d],s);if(m!=null)if(typeof m=="object")if(i[d])g=yn(g,e(d,m,s,i));else{const u=tt({theme:s},m,h=>({[d]:h}));Gu(u,m)?g[d]=t({sx:m,theme:s}):g=yn(g,u)}else g=yn(g,e(d,m,s,i))}),ru(b,g)}return Array.isArray(o)?o.map(l):l(o)}return t}const pi=Uu();pi.filterProps=["sx"];const _o=pi;function qu(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Xu=["breakpoints","palette","spacing","shape"];function Po(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:s={}}=e,i=ke(e,Xu),l=Zd(n),c=uu(o);let p=et({breakpoints:l,direction:"ltr",components:{},palette:P({mode:"light"},r),spacing:c,shape:P({},eu,s)},i);return p.applyStyles=qu,p=t.reduce((f,b)=>et(f,b),p),p.unstable_sxConfig=P({},Ro,i==null?void 0:i.unstable_sxConfig),p.unstable_sx=function(b){return _o({sx:b,theme:this})},p}function Wu(e){return Object.keys(e).length===0}function fi(e=null){const t=M.useContext(Xr.ThemeContext);return!t||Wu(t)?e:t}const Yu=Po();function wi(e=Yu){return fi(e)}const Ku=["ownerState"],Ju=["variants"],Zu=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Qu(e){return Object.keys(e).length===0}function ep(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Yn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const tp=Po(),$s=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Un({defaultTheme:e,theme:t,themeId:n}){return Qu(t)?e:t[n]||t}function np(e){return e?(t,n)=>n[e]:null}function Kn(e,t){let{ownerState:n}=t,r=ke(t,Ku);const o=typeof e=="function"?e(P({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(s=>Kn(s,P({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:s=[]}=o;let l=ke(o,Ju);return s.forEach(c=>{let p=!0;typeof c.props=="function"?p=c.props(P({ownerState:n},r,n)):Object.keys(c.props).forEach(f=>{(n==null?void 0:n[f])!==c.props[f]&&r[f]!==c.props[f]&&(p=!1)}),p&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(P({ownerState:n},r,n)):c.style))}),l}return o}function rp(e={}){const{themeId:t,defaultTheme:n=tp,rootShouldForwardProp:r=Yn,slotShouldForwardProp:o=Yn}=e,s=i=>_o(P({},i,{theme:Un(P({},i,{defaultTheme:n,themeId:t}))}));return s.__mui_systemSx=!0,(i,l={})=>{Xr.internal_processStyles(i,v=>v.filter(j=>!(j!=null&&j.__mui_systemSx)));const{name:c,slot:p,skipVariantsResolver:f,skipSx:b,overridesResolver:g=np($s(p))}=l,d=ke(l,Zu),m=f!==void 0?f:p&&p!=="Root"&&p!=="root"||!1,u=b||!1;let h;process.env.NODE_ENV!=="production"&&c&&(h=`${c}-${$s(p||"Root")}`);let x=Yn;p==="Root"||p==="root"?x=r:p?x=o:ep(i)&&(x=void 0);const C=Xr(i,P({shouldForwardProp:x,label:h},d)),N=v=>typeof v=="function"&&v.__emotion_real!==v||vt(v)?j=>Kn(v,P({},j,{theme:Un({theme:j.theme,defaultTheme:n,themeId:t})})):v,k=(v,...j)=>{let _=N(v);const A=j?j.map(N):[];c&&g&&A.push(E=>{const D=Un(P({},E,{defaultTheme:n,themeId:t}));if(!D.components||!D.components[c]||!D.components[c].styleOverrides)return null;const B=D.components[c].styleOverrides,J={};return Object.entries(B).forEach(([Y,H])=>{J[Y]=Kn(H,P({},E,{theme:D}))}),g(E,J)}),c&&!m&&A.push(E=>{var D;const B=Un(P({},E,{defaultTheme:n,themeId:t})),J=B==null||(D=B.components)==null||(D=D[c])==null?void 0:D.variants;return Kn({variants:J},P({},E,{theme:B}))}),u||A.push(s);const T=A.length-j.length;if(Array.isArray(v)&&T>0){const E=new Array(T).fill("");_=[...v,...E],_.raw=[...v.raw,...E]}const R=C(_,...A);if(process.env.NODE_ENV!=="production"){let E;c&&(E=`${c}${Ye(p||"")}`),E===void 0&&(E=`Styled(${Td(i)})`),R.displayName=E}return i.muiName&&(R.muiName=i.muiName),R};return C.withConfig&&(k.withConfig=C.withConfig),k}}function op(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:ai(t.components[n].defaultProps,r)}function sp({props:e,name:t,defaultTheme:n,themeId:r}){let o=wi(n);return r&&(o=o[r]||o),op({theme:o,name:t,props:e})}function Io(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Yd(e,t,n)}function ap(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Ct(e){if(e.type)return e;if(e.charAt(0)==="#")return Ct(ap(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Ut(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Ut(10,o))}else r=r.split(",");return r=r.map(s=>parseFloat(s)),{type:n,values:r,colorSpace:o}}function kr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,s)=>s<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function ip(e){e=Ct(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,s=r*Math.min(o,1-o),i=(p,f=(p+n/30)%12)=>o-s*Math.max(Math.min(f-3,9-f,1),-1);let l="rgb";const c=[Math.round(i(0)*255),Math.round(i(8)*255),Math.round(i(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),kr({type:l,values:c})}function Ms(e){e=Ct(e);let t=e.type==="hsl"||e.type==="hsla"?Ct(ip(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function As(e,t){const n=Ms(e),r=Ms(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function mi(e,t){return e=Ct(e),t=Io(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,kr(e)}function lp(e,t){if(e=Ct(e),t=Io(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return kr(e)}function cp(e,t){if(e=Ct(e),t=Io(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return kr(e)}function dp(e,t){return P({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const up={black:"#000",white:"#fff"},Tn=up,pp={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},fp=pp,wp={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},It=wp,mp={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},$t=mp,hp={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},cn=hp,gp={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Mt=gp,bp={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},At=bp,vp={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Dt=vp,yp=["mode","contrastThreshold","tonalOffset"],Ds={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Tn.white,default:Tn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Vr={text:{primary:Tn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Tn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Bs(e,t,n,r){const o=r.light||r,s=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=cp(e.main,o):t==="dark"&&(e.dark=lp(e.main,s)))}function xp(e="light"){return e==="dark"?{main:Mt[200],light:Mt[50],dark:Mt[400]}:{main:Mt[700],light:Mt[400],dark:Mt[800]}}function kp(e="light"){return e==="dark"?{main:It[200],light:It[50],dark:It[400]}:{main:It[500],light:It[300],dark:It[700]}}function Np(e="light"){return e==="dark"?{main:$t[500],light:$t[300],dark:$t[700]}:{main:$t[700],light:$t[400],dark:$t[800]}}function Ep(e="light"){return e==="dark"?{main:At[400],light:At[300],dark:At[700]}:{main:At[700],light:At[500],dark:At[900]}}function Sp(e="light"){return e==="dark"?{main:Dt[400],light:Dt[300],dark:Dt[700]}:{main:Dt[800],light:Dt[500],dark:Dt[900]}}function Tp(e="light"){return e==="dark"?{main:cn[400],light:cn[300],dark:cn[700]}:{main:"#ed6c02",light:cn[500],dark:cn[900]}}function Cp(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=ke(e,yp),s=e.primary||xp(t),i=e.secondary||kp(t),l=e.error||Np(t),c=e.info||Ep(t),p=e.success||Sp(t),f=e.warning||Tp(t);function b(u){const h=As(u,Vr.text.primary)>=n?Vr.text.primary:Ds.text.primary;if(process.env.NODE_ENV!=="production"){const x=As(u,h);x<3&&console.error([`MUI: The contrast ratio of ${x}:1 for ${h} on ${u}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return h}const g=({color:u,name:h,mainShade:x=500,lightShade:C=300,darkShade:N=700})=>{if(u=P({},u),!u.main&&u[x]&&(u.main=u[x]),!u.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.`:Ut(11,h?` (${h})`:"",x));if(typeof u.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(u.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Ut(12,h?` (${h})`:"",JSON.stringify(u.main)));return Bs(u,"light",C,r),Bs(u,"dark",N,r),u.contrastText||(u.contrastText=b(u.main)),u},d={dark:Vr,light:Ds};return process.env.NODE_ENV!=="production"&&(d[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),et(P({common:P({},Tn),mode:t,primary:g({color:s,name:"primary"}),secondary:g({color:i,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:g({color:l,name:"error"}),warning:g({color:f,name:"warning"}),info:g({color:c,name:"info"}),success:g({color:p,name:"success"}),grey:fp,contrastThreshold:n,getContrastText:b,augmentColor:g,tonalOffset:r},d[t]),o)}const jp=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Op(e){return Math.round(e*1e5)/1e5}const Ls={textTransform:"uppercase"},Vs='"Roboto", "Helvetica", "Arial", sans-serif';function Rp(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Vs,fontSize:o=14,fontWeightLight:s=300,fontWeightRegular:i=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:p=16,allVariants:f,pxToRem:b}=n,g=ke(n,jp);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof p!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const d=o/14,m=b||(x=>`${x/p*d}rem`),u=(x,C,N,k,v)=>P({fontFamily:r,fontWeight:x,fontSize:m(C),lineHeight:N},r===Vs?{letterSpacing:`${Op(k/C)}em`}:{},v,f),h={h1:u(s,96,1.167,-1.5),h2:u(s,60,1.2,-.5),h3:u(i,48,1.167,0),h4:u(i,34,1.235,.25),h5:u(i,24,1.334,0),h6:u(l,20,1.6,.15),subtitle1:u(i,16,1.75,.15),subtitle2:u(l,14,1.57,.1),body1:u(i,16,1.5,.15),body2:u(i,14,1.43,.15),button:u(l,14,1.75,.4,Ls),caption:u(i,12,1.66,.4),overline:u(i,12,2.66,1,Ls),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return et(P({htmlFontSize:p,pxToRem:m,fontFamily:r,fontSize:o,fontWeightLight:s,fontWeightRegular:i,fontWeightMedium:l,fontWeightBold:c},h),g,{clone:!1})}const _p=.2,Pp=.14,Ip=.12;function we(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${_p})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Pp})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ip})`].join(",")}const $p=["none",we(0,2,1,-1,0,1,1,0,0,1,3,0),we(0,3,1,-2,0,2,2,0,0,1,5,0),we(0,3,3,-2,0,3,4,0,0,1,8,0),we(0,2,4,-1,0,4,5,0,0,1,10,0),we(0,3,5,-1,0,5,8,0,0,1,14,0),we(0,3,5,-1,0,6,10,0,0,1,18,0),we(0,4,5,-2,0,7,10,1,0,2,16,1),we(0,5,5,-3,0,8,10,1,0,3,14,2),we(0,5,6,-3,0,9,12,1,0,3,16,2),we(0,6,6,-3,0,10,14,1,0,4,18,3),we(0,6,7,-4,0,11,15,1,0,4,20,3),we(0,7,8,-4,0,12,17,2,0,5,22,4),we(0,7,8,-4,0,13,19,2,0,5,24,4),we(0,7,9,-4,0,14,21,2,0,5,26,4),we(0,8,9,-5,0,15,22,2,0,6,28,5),we(0,8,10,-5,0,16,24,2,0,6,30,5),we(0,8,11,-5,0,17,26,2,0,6,32,5),we(0,9,11,-5,0,18,28,2,0,7,34,6),we(0,9,12,-6,0,19,29,2,0,7,36,6),we(0,10,13,-6,0,20,31,3,0,8,38,7),we(0,10,13,-6,0,21,33,3,0,8,40,7),we(0,10,14,-6,0,22,35,3,0,8,42,7),we(0,11,14,-7,0,23,36,3,0,9,44,8),we(0,11,15,-7,0,24,38,3,0,9,46,8)],Mp=$p,Ap=["duration","easing","delay"],Dp={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Bp={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Fs(e){return`${Math.round(e)}ms`}function Lp(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Vp(e){const t=P({},Dp,e.easing),n=P({},Bp,e.duration);return P({getAutoHeightDuration:Lp,create:(o=["all"],s={})=>{const{duration:i=n.standard,easing:l=t.easeInOut,delay:c=0}=s,p=ke(s,Ap);if(process.env.NODE_ENV!=="production"){const f=g=>typeof g=="string",b=g=>!isNaN(parseFloat(g));!f(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!b(i)&&!f(i)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`),f(l)||console.error('MUI: Argument "easing" must be a string.'),!b(c)&&!f(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof s!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(p).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(p).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(f=>`${f} ${typeof i=="string"?i:Fs(i)} ${l} ${typeof c=="string"?c:Fs(c)}`).join(",")}},e,{easing:t,duration:n})}const Fp={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},zp=Fp,Gp=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Hp(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:s={}}=e,i=ke(e,Gp);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Ut(18));const l=Cp(r),c=Po(e);let p=et(c,{mixins:dp(c.breakpoints,n),palette:l,shadows:Mp.slice(),typography:Rp(l,s),transitions:Vp(o),zIndex:P({},zp)});if(p=et(p,i),p=t.reduce((f,b)=>et(f,b),p),process.env.NODE_ENV!=="production"){const f=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],b=(g,d)=>{let m;for(m in g){const u=g[m];if(f.indexOf(m)!==-1&&Object.keys(u).length>0){if(process.env.NODE_ENV!=="production"){const h=fr("",m);console.error([`MUI: The \`${d}\` component increases the CSS specificity of the \`${m}\` internal state.`,"You can not override it like this: ",JSON.stringify(g,null,2),"",`Instead, you need to use the '&.${h}' syntax:`,JSON.stringify({root:{[`&.${h}`]:u}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}g[m]={}}}};Object.keys(p.components).forEach(g=>{const d=p.components[g].styleOverrides;d&&g.indexOf("Mui")===0&&b(d,g)})}return p.unstable_sxConfig=P({},Ro,i==null?void 0:i.unstable_sxConfig),p.unstable_sx=function(b){return _o({sx:b,theme:this})},p}const Up=Hp(),$o=Up,Mo="$$material";function Ao({props:e,name:t}){return sp({props:e,name:t,defaultTheme:$o,themeId:Mo})}const qp=e=>Yn(e)&&e!=="classes",Xp=rp({themeId:Mo,defaultTheme:$o,rootShouldForwardProp:qp}),Dn=Xp;function Wp(e){return fr("MuiSvgIcon",e)}ci("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Yp=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Kp=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Ye(t)}`,`fontSize${Ye(n)}`]};return Co(o,Wp,r)},Jp=Dn("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Ye(n.color)}`],t[`fontSize${Ye(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,s,i,l,c,p,f,b,g,d,m;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((s=e.typography)==null||(i=s.pxToRem)==null?void 0:i.call(s,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((p=e.typography)==null||(f=p.pxToRem)==null?void 0:f.call(p,35))||"2.1875rem"}[t.fontSize],color:(b=(g=(e.vars||e).palette)==null||(g=g[t.color])==null?void 0:g.main)!=null?b:{action:(d=(e.vars||e).palette)==null||(d=d.action)==null?void 0:d.active,disabled:(m=(e.vars||e).palette)==null||(m=m.action)==null?void 0:m.disabled,inherit:void 0}[t.color]}}),Do=M.forwardRef(function(t,n){const r=Ao({props:t,name:"MuiSvgIcon"}),{children:o,className:s,color:i="inherit",component:l="svg",fontSize:c="medium",htmlColor:p,inheritViewBox:f=!1,titleAccess:b,viewBox:g="0 0 24 24"}=r,d=ke(r,Yp),m=M.isValidElement(o)&&o.type==="svg",u=P({},r,{color:i,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:f,viewBox:g,hasSvgAsChild:m}),h={};f||(h.viewBox=g);const x=Kp(u);return a.jsxs(Jp,P({as:l,className:lt(x.root,s),focusable:"false",color:p,"aria-hidden":b?void 0:!0,role:b?"img":void 0,ref:n},h,d,m&&o.props,{ownerState:u,children:[m?o.props.children:o,b?a.jsx("title",{children:b}):null]}))});process.env.NODE_ENV!=="production"&&(Do.propTypes={children:w.node,classes:w.object,className:w.string,color:w.oneOfType([w.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),w.string]),component:w.elementType,fontSize:w.oneOfType([w.oneOf(["inherit","large","medium","small"]),w.string]),htmlColor:w.string,inheritViewBox:w.bool,shapeRendering:w.string,sx:w.oneOfType([w.arrayOf(w.oneOfType([w.func,w.object,w.bool])),w.func,w.object]),titleAccess:w.string,viewBox:w.string});Do.muiName="SvgIcon";const zs=Do;function hi(e,t){function n(r,o){return a.jsx(zs,P({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=zs.muiName,M.memo(M.forwardRef(n))}const Zp={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),ii.configure(e)}},Qp=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Ye,createChainedFunction:jd,createSvgIcon:hi,debounce:Od,deprecatedPropType:Rd,isMuiElement:_d,ownerDocument:er,ownerWindow:Pd,requirePropFactory:Id,setRef:tr,unstable_ClassNameGenerator:Zp,unstable_useEnhancedEffect:qt,unstable_useId:ri,unsupportedProp:Ad,useControlled:oi,useEventCallback:Qr,useForkRef:Tt,useIsFocusVisible:si},Symbol.toStringTag,{value:"Module"})),ef=ld(Qp);var Gs;function tf(){return Gs||(Gs=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=ef}(Pr)),Pr}var nf=cd;Object.defineProperty(Eo,"__esModule",{value:!0});var gi=Eo.default=void 0,rf=nf(tf()),of=a;gi=Eo.default=(0,rf.default)((0,of.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function sf(e){return typeof e=="string"}function hn(e,t,n){return e===void 0||sf(e)?t:P({},t,{ownerState:P({},t.ownerState,n)})}const af={disableDefaultClasses:!1},lf=M.createContext(af);function cf(e){const{disableDefaultClasses:t}=M.useContext(lf);return n=>t?"":e(n)}function df(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function uf(e,t,n){return typeof e=="function"?e(t,n):e}function Hs(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function pf(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:s}=e;if(!t){const d=lt(n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),m=P({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),u=P({},n,o,r);return d.length>0&&(u.className=d),Object.keys(m).length>0&&(u.style=m),{props:u,internalRef:void 0}}const i=df(P({},o,r)),l=Hs(r),c=Hs(o),p=t(i),f=lt(p==null?void 0:p.className,n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),b=P({},p==null?void 0:p.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),g=P({},p,n,c,l);return f.length>0&&(g.className=f),Object.keys(b).length>0&&(g.style=b),{props:g,internalRef:p.ref}}const ff=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function wf(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:s=!1}=e,i=ke(e,ff),l=s?{}:uf(r,o),{props:c,internalRef:p}=pf(P({},i,{externalSlotProps:l})),f=Tt(p,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return hn(n,P({},c,{ref:f}),o)}const bi="base";function mf(e){return`${bi}--${e}`}function hf(e,t){return`${bi}-${e}-${t}`}function vi(e,t){const n=li[t];return n?mf(n):hf(e,t)}function gf(e,t){const n={};return t.forEach(r=>{n[r]=vi(e,r)}),n}function bf(e){return typeof e=="function"?e():e}const rr=M.forwardRef(function(t,n){const{children:r,container:o,disablePortal:s=!1}=t,[i,l]=M.useState(null),c=Tt(M.isValidElement(r)?r.ref:null,n);if(qt(()=>{s||l(bf(o)||document.body)},[o,s]),qt(()=>{if(i&&!s)return tr(n,i),()=>{tr(n,null)}},[n,i,s]),s){if(M.isValidElement(r)){const p={ref:c};return M.cloneElement(r,p)}return a.jsx(M.Fragment,{children:r})}return a.jsx(M.Fragment,{children:i&&Wl.createPortal(r,i)})});process.env.NODE_ENV!=="production"&&(rr.propTypes={children:w.node,container:w.oneOfType([Sn,w.func]),disablePortal:w.bool});process.env.NODE_ENV!=="production"&&(rr["propTypes"]=xd(rr.propTypes));var Ce="top",Ve="bottom",Fe="right",je="left",Bo="auto",Bn=[Ce,Ve,Fe,je],Xt="start",Cn="end",vf="clippingParents",yi="viewport",dn="popper",yf="reference",Us=Bn.reduce(function(e,t){return e.concat([t+"-"+Xt,t+"-"+Cn])},[]),xi=[].concat(Bn,[Bo]).reduce(function(e,t){return e.concat([t,t+"-"+Xt,t+"-"+Cn])},[]),xf="beforeRead",kf="read",Nf="afterRead",Ef="beforeMain",Sf="main",Tf="afterMain",Cf="beforeWrite",jf="write",Of="afterWrite",Rf=[xf,kf,Nf,Ef,Sf,Tf,Cf,jf,Of];function Ke(e){return e?(e.nodeName||"").toLowerCase():null}function Me(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function jt(e){var t=Me(e).Element;return e instanceof t||e instanceof Element}function Le(e){var t=Me(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Lo(e){if(typeof ShadowRoot>"u")return!1;var t=Me(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function _f(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},s=t.elements[n];!Le(s)||!Ke(s)||(Object.assign(s.style,r),Object.keys(o).forEach(function(i){var l=o[i];l===!1?s.removeAttribute(i):s.setAttribute(i,l===!0?"":l)}))})}function Pf(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],s=t.attributes[r]||{},i=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=i.reduce(function(c,p){return c[p]="",c},{});!Le(o)||!Ke(o)||(Object.assign(o.style,l),Object.keys(s).forEach(function(c){o.removeAttribute(c)}))})}}const If={name:"applyStyles",enabled:!0,phase:"write",fn:_f,effect:Pf,requires:["computeStyles"]};function Xe(e){return e.split("-")[0]}var xt=Math.max,or=Math.min,Wt=Math.round;function to(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function ki(){return!/^((?!chrome|android).)*safari/i.test(to())}function Yt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,s=1;t&&Le(e)&&(o=e.offsetWidth>0&&Wt(r.width)/e.offsetWidth||1,s=e.offsetHeight>0&&Wt(r.height)/e.offsetHeight||1);var i=jt(e)?Me(e):window,l=i.visualViewport,c=!ki()&&n,p=(r.left+(c&&l?l.offsetLeft:0))/o,f=(r.top+(c&&l?l.offsetTop:0))/s,b=r.width/o,g=r.height/s;return{width:b,height:g,top:f,right:p+b,bottom:f+g,left:p,x:p,y:f}}function Vo(e){var t=Yt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Ni(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Lo(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function nt(e){return Me(e).getComputedStyle(e)}function $f(e){return["table","td","th"].indexOf(Ke(e))>=0}function ut(e){return((jt(e)?e.ownerDocument:e.document)||window.document).documentElement}function Nr(e){return Ke(e)==="html"?e:e.assignedSlot||e.parentNode||(Lo(e)?e.host:null)||ut(e)}function qs(e){return!Le(e)||nt(e).position==="fixed"?null:e.offsetParent}function Mf(e){var t=/firefox/i.test(to()),n=/Trident/i.test(to());if(n&&Le(e)){var r=nt(e);if(r.position==="fixed")return null}var o=Nr(e);for(Lo(o)&&(o=o.host);Le(o)&&["html","body"].indexOf(Ke(o))<0;){var s=nt(o);if(s.transform!=="none"||s.perspective!=="none"||s.contain==="paint"||["transform","perspective"].indexOf(s.willChange)!==-1||t&&s.willChange==="filter"||t&&s.filter&&s.filter!=="none")return o;o=o.parentNode}return null}function Ln(e){for(var t=Me(e),n=qs(e);n&&$f(n)&&nt(n).position==="static";)n=qs(n);return n&&(Ke(n)==="html"||Ke(n)==="body"&&nt(n).position==="static")?t:n||Mf(e)||t}function Fo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function xn(e,t,n){return xt(e,or(t,n))}function Af(e,t,n){var r=xn(e,t,n);return r>n?n:r}function Ei(){return{top:0,right:0,bottom:0,left:0}}function Si(e){return Object.assign({},Ei(),e)}function Ti(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Df=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Si(typeof t!="number"?t:Ti(t,Bn))};function Bf(e){var t,n=e.state,r=e.name,o=e.options,s=n.elements.arrow,i=n.modifiersData.popperOffsets,l=Xe(n.placement),c=Fo(l),p=[je,Fe].indexOf(l)>=0,f=p?"height":"width";if(!(!s||!i)){var b=Df(o.padding,n),g=Vo(s),d=c==="y"?Ce:je,m=c==="y"?Ve:Fe,u=n.rects.reference[f]+n.rects.reference[c]-i[c]-n.rects.popper[f],h=i[c]-n.rects.reference[c],x=Ln(s),C=x?c==="y"?x.clientHeight||0:x.clientWidth||0:0,N=u/2-h/2,k=b[d],v=C-g[f]-b[m],j=C/2-g[f]/2+N,_=xn(k,j,v),A=c;n.modifiersData[r]=(t={},t[A]=_,t.centerOffset=_-j,t)}}function Lf(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Ni(t.elements.popper,o)&&(t.elements.arrow=o))}const Vf={name:"arrow",enabled:!0,phase:"main",fn:Bf,effect:Lf,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Kt(e){return e.split("-")[1]}var Ff={top:"auto",right:"auto",bottom:"auto",left:"auto"};function zf(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Wt(n*o)/o||0,y:Wt(r*o)/o||0}}function Xs(e){var t,n=e.popper,r=e.popperRect,o=e.placement,s=e.variation,i=e.offsets,l=e.position,c=e.gpuAcceleration,p=e.adaptive,f=e.roundOffsets,b=e.isFixed,g=i.x,d=g===void 0?0:g,m=i.y,u=m===void 0?0:m,h=typeof f=="function"?f({x:d,y:u}):{x:d,y:u};d=h.x,u=h.y;var x=i.hasOwnProperty("x"),C=i.hasOwnProperty("y"),N=je,k=Ce,v=window;if(p){var j=Ln(n),_="clientHeight",A="clientWidth";if(j===Me(n)&&(j=ut(n),nt(j).position!=="static"&&l==="absolute"&&(_="scrollHeight",A="scrollWidth")),j=j,o===Ce||(o===je||o===Fe)&&s===Cn){k=Ve;var T=b&&j===v&&v.visualViewport?v.visualViewport.height:j[_];u-=T-r.height,u*=c?1:-1}if(o===je||(o===Ce||o===Ve)&&s===Cn){N=Fe;var R=b&&j===v&&v.visualViewport?v.visualViewport.width:j[A];d-=R-r.width,d*=c?1:-1}}var E=Object.assign({position:l},p&&Ff),D=f===!0?zf({x:d,y:u},Me(n)):{x:d,y:u};if(d=D.x,u=D.y,c){var B;return Object.assign({},E,(B={},B[k]=C?"0":"",B[N]=x?"0":"",B.transform=(v.devicePixelRatio||1)<=1?"translate("+d+"px, "+u+"px)":"translate3d("+d+"px, "+u+"px, 0)",B))}return Object.assign({},E,(t={},t[k]=C?u+"px":"",t[N]=x?d+"px":"",t.transform="",t))}function Gf(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,s=n.adaptive,i=s===void 0?!0:s,l=n.roundOffsets,c=l===void 0?!0:l,p={placement:Xe(t.placement),variation:Kt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Xs(Object.assign({},p,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Xs(Object.assign({},p,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Hf={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Gf,data:{}};var qn={passive:!0};function Uf(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,s=o===void 0?!0:o,i=r.resize,l=i===void 0?!0:i,c=Me(t.elements.popper),p=[].concat(t.scrollParents.reference,t.scrollParents.popper);return s&&p.forEach(function(f){f.addEventListener("scroll",n.update,qn)}),l&&c.addEventListener("resize",n.update,qn),function(){s&&p.forEach(function(f){f.removeEventListener("scroll",n.update,qn)}),l&&c.removeEventListener("resize",n.update,qn)}}const qf={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Uf,data:{}};var Xf={left:"right",right:"left",bottom:"top",top:"bottom"};function Jn(e){return e.replace(/left|right|bottom|top/g,function(t){return Xf[t]})}var Wf={start:"end",end:"start"};function Ws(e){return e.replace(/start|end/g,function(t){return Wf[t]})}function zo(e){var t=Me(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Go(e){return Yt(ut(e)).left+zo(e).scrollLeft}function Yf(e,t){var n=Me(e),r=ut(e),o=n.visualViewport,s=r.clientWidth,i=r.clientHeight,l=0,c=0;if(o){s=o.width,i=o.height;var p=ki();(p||!p&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:s,height:i,x:l+Go(e),y:c}}function Kf(e){var t,n=ut(e),r=zo(e),o=(t=e.ownerDocument)==null?void 0:t.body,s=xt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),i=xt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Go(e),c=-r.scrollTop;return nt(o||n).direction==="rtl"&&(l+=xt(n.clientWidth,o?o.clientWidth:0)-s),{width:s,height:i,x:l,y:c}}function Ho(e){var t=nt(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Ci(e){return["html","body","#document"].indexOf(Ke(e))>=0?e.ownerDocument.body:Le(e)&&Ho(e)?e:Ci(Nr(e))}function kn(e,t){var n;t===void 0&&(t=[]);var r=Ci(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),s=Me(r),i=o?[s].concat(s.visualViewport||[],Ho(r)?r:[]):r,l=t.concat(i);return o?l:l.concat(kn(Nr(i)))}function no(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Jf(e,t){var n=Yt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Ys(e,t,n){return t===yi?no(Yf(e,n)):jt(t)?Jf(t,n):no(Kf(ut(e)))}function Zf(e){var t=kn(Nr(e)),n=["absolute","fixed"].indexOf(nt(e).position)>=0,r=n&&Le(e)?Ln(e):e;return jt(r)?t.filter(function(o){return jt(o)&&Ni(o,r)&&Ke(o)!=="body"}):[]}function Qf(e,t,n,r){var o=t==="clippingParents"?Zf(e):[].concat(t),s=[].concat(o,[n]),i=s[0],l=s.reduce(function(c,p){var f=Ys(e,p,r);return c.top=xt(f.top,c.top),c.right=or(f.right,c.right),c.bottom=or(f.bottom,c.bottom),c.left=xt(f.left,c.left),c},Ys(e,i,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function ji(e){var t=e.reference,n=e.element,r=e.placement,o=r?Xe(r):null,s=r?Kt(r):null,i=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Ce:c={x:i,y:t.y-n.height};break;case Ve:c={x:i,y:t.y+t.height};break;case Fe:c={x:t.x+t.width,y:l};break;case je:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var p=o?Fo(o):null;if(p!=null){var f=p==="y"?"height":"width";switch(s){case Xt:c[p]=c[p]-(t[f]/2-n[f]/2);break;case Cn:c[p]=c[p]+(t[f]/2-n[f]/2);break}}return c}function jn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,s=n.strategy,i=s===void 0?e.strategy:s,l=n.boundary,c=l===void 0?vf:l,p=n.rootBoundary,f=p===void 0?yi:p,b=n.elementContext,g=b===void 0?dn:b,d=n.altBoundary,m=d===void 0?!1:d,u=n.padding,h=u===void 0?0:u,x=Si(typeof h!="number"?h:Ti(h,Bn)),C=g===dn?yf:dn,N=e.rects.popper,k=e.elements[m?C:g],v=Qf(jt(k)?k:k.contextElement||ut(e.elements.popper),c,f,i),j=Yt(e.elements.reference),_=ji({reference:j,element:N,strategy:"absolute",placement:o}),A=no(Object.assign({},N,_)),T=g===dn?A:j,R={top:v.top-T.top+x.top,bottom:T.bottom-v.bottom+x.bottom,left:v.left-T.left+x.left,right:T.right-v.right+x.right},E=e.modifiersData.offset;if(g===dn&&E){var D=E[o];Object.keys(R).forEach(function(B){var J=[Fe,Ve].indexOf(B)>=0?1:-1,Y=[Ce,Ve].indexOf(B)>=0?"y":"x";R[B]+=D[Y]*J})}return R}function ew(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,s=n.rootBoundary,i=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,p=c===void 0?xi:c,f=Kt(r),b=f?l?Us:Us.filter(function(m){return Kt(m)===f}):Bn,g=b.filter(function(m){return p.indexOf(m)>=0});g.length===0&&(g=b);var d=g.reduce(function(m,u){return m[u]=jn(e,{placement:u,boundary:o,rootBoundary:s,padding:i})[Xe(u)],m},{});return Object.keys(d).sort(function(m,u){return d[m]-d[u]})}function tw(e){if(Xe(e)===Bo)return[];var t=Jn(e);return[Ws(e),t,Ws(t)]}function nw(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,s=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!0:i,c=n.fallbackPlacements,p=n.padding,f=n.boundary,b=n.rootBoundary,g=n.altBoundary,d=n.flipVariations,m=d===void 0?!0:d,u=n.allowedAutoPlacements,h=t.options.placement,x=Xe(h),C=x===h,N=c||(C||!m?[Jn(h)]:tw(h)),k=[h].concat(N).reduce(function(F,X){return F.concat(Xe(X)===Bo?ew(t,{placement:X,boundary:f,rootBoundary:b,padding:p,flipVariations:m,allowedAutoPlacements:u}):X)},[]),v=t.rects.reference,j=t.rects.popper,_=new Map,A=!0,T=k[0],R=0;R<k.length;R++){var E=k[R],D=Xe(E),B=Kt(E)===Xt,J=[Ce,Ve].indexOf(D)>=0,Y=J?"width":"height",H=jn(t,{placement:E,boundary:f,rootBoundary:b,altBoundary:g,padding:p}),te=J?B?Fe:je:B?Ve:Ce;v[Y]>j[Y]&&(te=Jn(te));var ae=Jn(te),V=[];if(s&&V.push(H[D]<=0),l&&V.push(H[te]<=0,H[ae]<=0),V.every(function(F){return F})){T=E,A=!1;break}_.set(E,V)}if(A)for(var S=m?3:1,I=function(X){var G=k.find(function(W){var q=_.get(W);if(q)return q.slice(0,X).every(function(K){return K})});if(G)return T=G,"break"},U=S;U>0;U--){var z=I(U);if(z==="break")break}t.placement!==T&&(t.modifiersData[r]._skip=!0,t.placement=T,t.reset=!0)}}const rw={name:"flip",enabled:!0,phase:"main",fn:nw,requiresIfExists:["offset"],data:{_skip:!1}};function Ks(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Js(e){return[Ce,Fe,Ve,je].some(function(t){return e[t]>=0})}function ow(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,s=t.modifiersData.preventOverflow,i=jn(t,{elementContext:"reference"}),l=jn(t,{altBoundary:!0}),c=Ks(i,r),p=Ks(l,o,s),f=Js(c),b=Js(p);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:p,isReferenceHidden:f,hasPopperEscaped:b},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":f,"data-popper-escaped":b})}const sw={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:ow};function aw(e,t,n){var r=Xe(e),o=[je,Ce].indexOf(r)>=0?-1:1,s=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,i=s[0],l=s[1];return i=i||0,l=(l||0)*o,[je,Fe].indexOf(r)>=0?{x:l,y:i}:{x:i,y:l}}function iw(e){var t=e.state,n=e.options,r=e.name,o=n.offset,s=o===void 0?[0,0]:o,i=xi.reduce(function(f,b){return f[b]=aw(b,t.rects,s),f},{}),l=i[t.placement],c=l.x,p=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=p),t.modifiersData[r]=i}const lw={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:iw};function cw(e){var t=e.state,n=e.name;t.modifiersData[n]=ji({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const dw={name:"popperOffsets",enabled:!0,phase:"read",fn:cw,data:{}};function uw(e){return e==="x"?"y":"x"}function pw(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,s=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!1:i,c=n.boundary,p=n.rootBoundary,f=n.altBoundary,b=n.padding,g=n.tether,d=g===void 0?!0:g,m=n.tetherOffset,u=m===void 0?0:m,h=jn(t,{boundary:c,rootBoundary:p,padding:b,altBoundary:f}),x=Xe(t.placement),C=Kt(t.placement),N=!C,k=Fo(x),v=uw(k),j=t.modifiersData.popperOffsets,_=t.rects.reference,A=t.rects.popper,T=typeof u=="function"?u(Object.assign({},t.rects,{placement:t.placement})):u,R=typeof T=="number"?{mainAxis:T,altAxis:T}:Object.assign({mainAxis:0,altAxis:0},T),E=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,D={x:0,y:0};if(j){if(s){var B,J=k==="y"?Ce:je,Y=k==="y"?Ve:Fe,H=k==="y"?"height":"width",te=j[k],ae=te+h[J],V=te-h[Y],S=d?-A[H]/2:0,I=C===Xt?_[H]:A[H],U=C===Xt?-A[H]:-_[H],z=t.elements.arrow,F=d&&z?Vo(z):{width:0,height:0},X=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Ei(),G=X[J],W=X[Y],q=xn(0,_[H],F[H]),K=N?_[H]/2-S-q-G-R.mainAxis:I-q-G-R.mainAxis,Z=N?-_[H]/2+S+q+W+R.mainAxis:U+q+W+R.mainAxis,pe=t.elements.arrow&&Ln(t.elements.arrow),$=pe?k==="y"?pe.clientTop||0:pe.clientLeft||0:0,xe=(B=E==null?void 0:E[k])!=null?B:0,L=te+K-xe-$,ye=te+Z-xe,Ge=xn(d?or(ae,L):ae,te,d?xt(V,ye):V);j[k]=Ge,D[k]=Ge-te}if(l){var pt,Se=k==="x"?Ce:je,Vn=k==="x"?Ve:Fe,He=j[v],Ot=v==="y"?"height":"width",ft=He+h[Se],Rt=He-h[Vn],_t=[Ce,je].indexOf(x)!==-1,Pt=(pt=E==null?void 0:E[v])!=null?pt:0,wt=_t?ft:He-_[Ot]-A[Ot]-Pt+R.altAxis,tn=_t?He+_[Ot]+A[Ot]-Pt-R.altAxis:Rt,Fn=d&&_t?Af(wt,He,tn):xn(d?wt:ft,He,d?tn:Rt);j[v]=Fn,D[v]=Fn-He}t.modifiersData[r]=D}}const fw={name:"preventOverflow",enabled:!0,phase:"main",fn:pw,requiresIfExists:["offset"]};function ww(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function mw(e){return e===Me(e)||!Le(e)?zo(e):ww(e)}function hw(e){var t=e.getBoundingClientRect(),n=Wt(t.width)/e.offsetWidth||1,r=Wt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function gw(e,t,n){n===void 0&&(n=!1);var r=Le(t),o=Le(t)&&hw(t),s=ut(t),i=Yt(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((Ke(t)!=="body"||Ho(s))&&(l=mw(t)),Le(t)?(c=Yt(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):s&&(c.x=Go(s))),{x:i.left+l.scrollLeft-c.x,y:i.top+l.scrollTop-c.y,width:i.width,height:i.height}}function bw(e){var t=new Map,n=new Set,r=[];e.forEach(function(s){t.set(s.name,s)});function o(s){n.add(s.name);var i=[].concat(s.requires||[],s.requiresIfExists||[]);i.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(s)}return e.forEach(function(s){n.has(s.name)||o(s)}),r}function vw(e){var t=bw(e);return Rf.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function yw(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function xw(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var Zs={placement:"bottom",modifiers:[],strategy:"absolute"};function Qs(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function kw(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,s=o===void 0?Zs:o;return function(l,c,p){p===void 0&&(p=s);var f={placement:"bottom",orderedModifiers:[],options:Object.assign({},Zs,s),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},b=[],g=!1,d={state:f,setOptions:function(x){var C=typeof x=="function"?x(f.options):x;u(),f.options=Object.assign({},s,f.options,C),f.scrollParents={reference:jt(l)?kn(l):l.contextElement?kn(l.contextElement):[],popper:kn(c)};var N=vw(xw([].concat(r,f.options.modifiers)));return f.orderedModifiers=N.filter(function(k){return k.enabled}),m(),d.update()},forceUpdate:function(){if(!g){var x=f.elements,C=x.reference,N=x.popper;if(Qs(C,N)){f.rects={reference:gw(C,Ln(N),f.options.strategy==="fixed"),popper:Vo(N)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach(function(R){return f.modifiersData[R.name]=Object.assign({},R.data)});for(var k=0;k<f.orderedModifiers.length;k++){if(f.reset===!0){f.reset=!1,k=-1;continue}var v=f.orderedModifiers[k],j=v.fn,_=v.options,A=_===void 0?{}:_,T=v.name;typeof j=="function"&&(f=j({state:f,options:A,name:T,instance:d})||f)}}}},update:yw(function(){return new Promise(function(h){d.forceUpdate(),h(f)})}),destroy:function(){u(),g=!0}};if(!Qs(l,c))return d;d.setOptions(p).then(function(h){!g&&p.onFirstUpdate&&p.onFirstUpdate(h)});function m(){f.orderedModifiers.forEach(function(h){var x=h.name,C=h.options,N=C===void 0?{}:C,k=h.effect;if(typeof k=="function"){var v=k({state:f,name:x,instance:d,options:N}),j=function(){};b.push(v||j)}})}function u(){b.forEach(function(h){return h()}),b=[]}return d}}var Nw=[qf,dw,Hf,If,lw,rw,fw,Vf,sw],Ew=kw({defaultModifiers:Nw});const Oi="Popper";function Sw(e){return vi(Oi,e)}gf(Oi,["root"]);const Tw=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Cw=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function jw(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function sr(e){return typeof e=="function"?e():e}function Er(e){return e.nodeType!==void 0}function Ow(e){return!Er(e)}const Rw=()=>Co({root:["root"]},cf(Sw)),_w={},Pw=M.forwardRef(function(t,n){var r;const{anchorEl:o,children:s,direction:i,disablePortal:l,modifiers:c,open:p,placement:f,popperOptions:b,popperRef:g,slotProps:d={},slots:m={},TransitionProps:u}=t,h=ke(t,Tw),x=M.useRef(null),C=Tt(x,n),N=M.useRef(null),k=Tt(N,g),v=M.useRef(k);qt(()=>{v.current=k},[k]),M.useImperativeHandle(g,()=>N.current,[]);const j=jw(f,i),[_,A]=M.useState(j),[T,R]=M.useState(sr(o));M.useEffect(()=>{N.current&&N.current.forceUpdate()}),M.useEffect(()=>{o&&R(sr(o))},[o]),qt(()=>{if(!T||!p)return;const Y=ae=>{A(ae.placement)};if(process.env.NODE_ENV!=="production"&&T&&Er(T)&&T.nodeType===1){const ae=T.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ae.top===0&&ae.left===0&&ae.right===0&&ae.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let H=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ae})=>{Y(ae)}}];c!=null&&(H=H.concat(c)),b&&b.modifiers!=null&&(H=H.concat(b.modifiers));const te=Ew(T,x.current,P({placement:j},b,{modifiers:H}));return v.current(te),()=>{te.destroy(),v.current(null)}},[T,l,c,p,b,j]);const E={placement:_};u!==null&&(E.TransitionProps=u);const D=Rw(),B=(r=m.root)!=null?r:"div",J=wf({elementType:B,externalSlotProps:d.root,externalForwardedProps:h,additionalProps:{role:"tooltip",ref:C},ownerState:t,className:D.root});return a.jsx(B,P({},J,{children:typeof s=="function"?s(E):s}))}),Ri=M.forwardRef(function(t,n){const{anchorEl:r,children:o,container:s,direction:i="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:p,open:f,placement:b="bottom",popperOptions:g=_w,popperRef:d,style:m,transition:u=!1,slotProps:h={},slots:x={}}=t,C=ke(t,Cw),[N,k]=M.useState(!0),v=()=>{k(!1)},j=()=>{k(!0)};if(!c&&!f&&(!u||N))return null;let _;if(s)_=s;else if(r){const R=sr(r);_=R&&Er(R)?er(R).body:er(null).body}const A=!f&&c&&(!u||N)?"none":void 0,T=u?{in:f,onEnter:v,onExited:j}:void 0;return a.jsx(rr,{disablePortal:l,container:_,children:a.jsx(Pw,P({anchorEl:r,direction:i,disablePortal:l,modifiers:p,ref:n,open:u?!N:f,placement:b,popperOptions:g,popperRef:d,slotProps:h,slots:x},C,{style:P({position:"fixed",top:0,left:0,display:A},m),TransitionProps:T,children:o}))})});process.env.NODE_ENV!=="production"&&(Ri.propTypes={anchorEl:So(w.oneOfType([Sn,w.object,w.func]),e=>{if(e.open){const t=sr(e.anchorEl);if(t&&Er(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Ow(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:w.oneOfType([w.node,w.func]),container:w.oneOfType([Sn,w.func]),direction:w.oneOf(["ltr","rtl"]),disablePortal:w.bool,keepMounted:w.bool,modifiers:w.arrayOf(w.shape({data:w.object,effect:w.func,enabled:w.bool,fn:w.func,name:w.any,options:w.object,phase:w.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:w.arrayOf(w.string),requiresIfExists:w.arrayOf(w.string)})),open:w.bool.isRequired,placement:w.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:w.shape({modifiers:w.array,onFirstUpdate:w.func,placement:w.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:w.oneOf(["absolute","fixed"])}),popperRef:ni,slotProps:w.shape({root:w.oneOfType([w.func,w.object])}),slots:w.shape({root:w.elementType}),transition:w.bool});function _i(){const e=wi($o);return process.env.NODE_ENV!=="production"&&M.useDebugValue(e),e[Mo]||e}function ro(e,t){return ro=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},ro(e,t)}function Iw(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,ro(e,t)}const ea={disabled:!1};var $w=process.env.NODE_ENV!=="production"?w.oneOfType([w.number,w.shape({enter:w.number,exit:w.number,appear:w.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&w.oneOfType([w.string,w.shape({enter:w.string,exit:w.string,active:w.string}),w.shape({enter:w.string,enterDone:w.string,enterActive:w.string,exit:w.string,exitDone:w.string,exitActive:w.string})]);const Pi=y.createContext(null);var Mw=function(t){return t.scrollTop},gn="unmounted",gt="exited",bt="entering",Vt="entered",oo="exiting",rt=function(e){Iw(t,e);function t(r,o){var s;s=e.call(this,r,o)||this;var i=o,l=i&&!i.isMounting?r.enter:r.appear,c;return s.appearStatus=null,r.in?l?(c=gt,s.appearStatus=bt):c=Vt:r.unmountOnExit||r.mountOnEnter?c=gn:c=gt,s.state={status:c},s.nextCallback=null,s}t.getDerivedStateFromProps=function(o,s){var i=o.in;return i&&s.status===gn?{status:gt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var s=null;if(o!==this.props){var i=this.state.status;this.props.in?i!==bt&&i!==Vt&&(s=bt):(i===bt||i===Vt)&&(s=oo)}this.updateStatus(!1,s)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,s,i,l;return s=i=l=o,o!=null&&typeof o!="number"&&(s=o.exit,i=o.enter,l=o.appear!==void 0?o.appear:i),{exit:s,enter:i,appear:l}},n.updateStatus=function(o,s){if(o===void 0&&(o=!1),s!==null)if(this.cancelNextCallback(),s===bt){if(this.props.unmountOnExit||this.props.mountOnEnter){var i=this.props.nodeRef?this.props.nodeRef.current:fn.findDOMNode(this);i&&Mw(i)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===gt&&this.setState({status:gn})},n.performEnter=function(o){var s=this,i=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[fn.findDOMNode(this),l],p=c[0],f=c[1],b=this.getTimeouts(),g=l?b.appear:b.enter;if(!o&&!i||ea.disabled){this.safeSetState({status:Vt},function(){s.props.onEntered(p)});return}this.props.onEnter(p,f),this.safeSetState({status:bt},function(){s.props.onEntering(p,f),s.onTransitionEnd(g,function(){s.safeSetState({status:Vt},function(){s.props.onEntered(p,f)})})})},n.performExit=function(){var o=this,s=this.props.exit,i=this.getTimeouts(),l=this.props.nodeRef?void 0:fn.findDOMNode(this);if(!s||ea.disabled){this.safeSetState({status:gt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:oo},function(){o.props.onExiting(l),o.onTransitionEnd(i.exit,function(){o.safeSetState({status:gt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,s){s=this.setNextCallback(s),this.setState(o,s)},n.setNextCallback=function(o){var s=this,i=!0;return this.nextCallback=function(l){i&&(i=!1,s.nextCallback=null,o(l))},this.nextCallback.cancel=function(){i=!1},this.nextCallback},n.onTransitionEnd=function(o,s){this.setNextCallback(s);var i=this.props.nodeRef?this.props.nodeRef.current:fn.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!i||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[i,this.nextCallback],p=c[0],f=c[1];this.props.addEndListener(p,f)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===gn)return null;var s=this.props,i=s.children;s.in,s.mountOnEnter,s.unmountOnExit,s.appear,s.enter,s.exit,s.timeout,s.addEndListener,s.onEnter,s.onEntering,s.onEntered,s.onExit,s.onExiting,s.onExited,s.nodeRef;var l=ke(s,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return y.createElement(Pi.Provider,{value:null},typeof i=="function"?i(o,l):y.cloneElement(y.Children.only(i),l))},t}(y.Component);rt.contextType=Pi;rt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:w.shape({current:typeof Element>"u"?w.any:function(e,t,n,r,o,s){var i=e[t];return w.instanceOf(i&&"ownerDocument"in i?i.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,s)}}),children:w.oneOfType([w.func.isRequired,w.element.isRequired]).isRequired,in:w.bool,mountOnEnter:w.bool,unmountOnExit:w.bool,appear:w.bool,enter:w.bool,exit:w.bool,timeout:function(t){var n=$w;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),s=1;s<r;s++)o[s-1]=arguments[s];return n.apply(void 0,[t].concat(o))},addEndListener:w.func,onEnter:w.func,onEntering:w.func,onEntered:w.func,onExit:w.func,onExiting:w.func,onExited:w.func}:{};function Bt(){}rt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Bt,onEntering:Bt,onEntered:Bt,onExit:Bt,onExiting:Bt,onExited:Bt};rt.UNMOUNTED=gn;rt.EXITED=gt;rt.ENTERING=bt;rt.ENTERED=Vt;rt.EXITING=oo;const Aw=rt,Dw=e=>e.scrollTop;function ta(e,t){var n,r;const{timeout:o,easing:s,style:i={}}=e;return{duration:(n=i.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=i.transitionTimingFunction)!=null?r:typeof s=="object"?s[t.mode]:s,delay:i.transitionDelay}}const Bw=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function so(e){return`scale(${e}, ${e**2})`}const Lw={entering:{opacity:1,transform:so(1)},entered:{opacity:1,transform:"none"}},Fr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Uo=M.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:s,easing:i,in:l,onEnter:c,onEntered:p,onEntering:f,onExit:b,onExited:g,onExiting:d,style:m,timeout:u="auto",TransitionComponent:h=Aw}=t,x=ke(t,Bw),C=mn(),N=M.useRef(),k=_i(),v=M.useRef(null),j=Tt(v,s.ref,n),_=Y=>H=>{if(Y){const te=v.current;H===void 0?Y(te):Y(te,H)}},A=_(f),T=_((Y,H)=>{Dw(Y);const{duration:te,delay:ae,easing:V}=ta({style:m,timeout:u,easing:i},{mode:"enter"});let S;u==="auto"?(S=k.transitions.getAutoHeightDuration(Y.clientHeight),N.current=S):S=te,Y.style.transition=[k.transitions.create("opacity",{duration:S,delay:ae}),k.transitions.create("transform",{duration:Fr?S:S*.666,delay:ae,easing:V})].join(","),c&&c(Y,H)}),R=_(p),E=_(d),D=_(Y=>{const{duration:H,delay:te,easing:ae}=ta({style:m,timeout:u,easing:i},{mode:"exit"});let V;u==="auto"?(V=k.transitions.getAutoHeightDuration(Y.clientHeight),N.current=V):V=H,Y.style.transition=[k.transitions.create("opacity",{duration:V,delay:te}),k.transitions.create("transform",{duration:Fr?V:V*.666,delay:Fr?te:te||V*.333,easing:ae})].join(","),Y.style.opacity=0,Y.style.transform=so(.75),b&&b(Y)}),B=_(g),J=Y=>{u==="auto"&&C.start(N.current||0,Y),r&&r(v.current,Y)};return a.jsx(h,P({appear:o,in:l,nodeRef:v,onEnter:T,onEntered:R,onEntering:A,onExit:D,onExited:B,onExiting:E,addEndListener:J,timeout:u==="auto"?null:u},x,{children:(Y,H)=>M.cloneElement(s,P({style:P({opacity:0,transform:so(.75),visibility:Y==="exited"&&!l?"hidden":void 0},Lw[Y],m,s.props.style),ref:j},H))}))});process.env.NODE_ENV!=="production"&&(Uo.propTypes={addEndListener:w.func,appear:w.bool,children:ei.isRequired,easing:w.oneOfType([w.shape({enter:w.string,exit:w.string}),w.string]),in:w.bool,onEnter:w.func,onEntered:w.func,onEntering:w.func,onExit:w.func,onExited:w.func,onExiting:w.func,style:w.object,timeout:w.oneOfType([w.oneOf(["auto"]),w.number,w.shape({appear:w.number,enter:w.number,exit:w.number})])});Uo.muiSupportAuto=!0;const na=Uo,Vw=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Fw=Dn(Ri,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ii=M.forwardRef(function(t,n){var r;const o=fi(),s=Ao({props:t,name:"MuiPopper"}),{anchorEl:i,component:l,components:c,componentsProps:p,container:f,disablePortal:b,keepMounted:g,modifiers:d,open:m,placement:u,popperOptions:h,popperRef:x,transition:C,slots:N,slotProps:k}=s,v=ke(s,Vw),j=(r=N==null?void 0:N.root)!=null?r:c==null?void 0:c.Root,_=P({anchorEl:i,container:f,disablePortal:b,keepMounted:g,modifiers:d,open:m,placement:u,popperOptions:h,popperRef:x,transition:C},v);return a.jsx(Fw,P({as:l,direction:o==null?void 0:o.direction,slots:{root:j},slotProps:k??p},_,{ref:n}))});process.env.NODE_ENV!=="production"&&(Ii.propTypes={anchorEl:w.oneOfType([Sn,w.object,w.func]),children:w.oneOfType([w.node,w.func]),component:w.elementType,components:w.shape({Root:w.elementType}),componentsProps:w.shape({root:w.oneOfType([w.func,w.object])}),container:w.oneOfType([Sn,w.func]),disablePortal:w.bool,keepMounted:w.bool,modifiers:w.arrayOf(w.shape({data:w.object,effect:w.func,enabled:w.bool,fn:w.func,name:w.any,options:w.object,phase:w.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:w.arrayOf(w.string),requiresIfExists:w.arrayOf(w.string)})),open:w.bool.isRequired,placement:w.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:w.shape({modifiers:w.array,onFirstUpdate:w.func,placement:w.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:w.oneOf(["absolute","fixed"])}),popperRef:ni,slotProps:w.shape({root:w.oneOfType([w.func,w.object])}),slots:w.shape({root:w.elementType}),sx:w.oneOfType([w.arrayOf(w.oneOfType([w.func,w.object,w.bool])),w.func,w.object]),transition:w.bool});const $i=Ii;function zw(e){return fr("MuiTooltip",e)}const Gw=ci("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),ct=Gw,Hw=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Uw(e){return Math.round(e*1e5)/1e5}const qw=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:s}=e,i={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Ye(s.split("-")[0])}`],arrow:["arrow"]};return Co(i,zw,t)},Xw=Dn($i,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>P({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${ct.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${ct.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${ct.arrow}`]:P({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${ct.arrow}`]:P({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Ww=Dn("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Ye(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>P({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:mi(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Uw(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${ct.popper}[data-popper-placement*="left"] &`]:P({transformOrigin:"right center"},t.isRtl?P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):P({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${ct.popper}[data-popper-placement*="right"] &`]:P({transformOrigin:"left center"},t.isRtl?P({marginRight:"14px"},t.touch&&{marginRight:"24px"}):P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${ct.popper}[data-popper-placement*="top"] &`]:P({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${ct.popper}[data-popper-placement*="bottom"] &`]:P({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Yw=Dn("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:mi(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Xn=!1;const ra=new $n;let un={x:0,y:0};function Wn(e,t){return n=>{t&&t(n),e(n)}}const Mi=M.forwardRef(function(t,n){var r,o,s,i,l,c,p,f,b,g,d,m,u,h,x,C,N,k,v;const j=Ao({props:t,name:"MuiTooltip"}),{arrow:_=!1,children:A,components:T={},componentsProps:R={},describeChild:E=!1,disableFocusListener:D=!1,disableHoverListener:B=!1,disableInteractive:J=!1,disableTouchListener:Y=!1,enterDelay:H=100,enterNextDelay:te=0,enterTouchDelay:ae=700,followCursor:V=!1,id:S,leaveDelay:I=0,leaveTouchDelay:U=1500,onClose:z,onOpen:F,open:X,placement:G="bottom",PopperComponent:W,PopperProps:q={},slotProps:K={},slots:Z={},title:pe,TransitionComponent:$=na,TransitionProps:xe}=j,L=ke(j,Hw),ye=M.isValidElement(A)?A:a.jsx("span",{children:A}),Ge=_i(),pt=Ge.direction==="rtl",[Se,Vn]=M.useState(),[He,Ot]=M.useState(null),ft=M.useRef(!1),Rt=J||V,_t=mn(),Pt=mn(),wt=mn(),tn=mn(),[Fn,Yo]=oi({controlled:X,default:!1,name:"Tooltip",state:"open"});let Je=Fn;if(process.env.NODE_ENV!=="production"){const{current:ee}=M.useRef(X!==void 0);M.useEffect(()=>{Se&&Se.disabled&&!ee&&pe!==""&&Se.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[pe,Se,ee])}const Sr=ri(S),nn=M.useRef(),zn=Qr(()=>{nn.current!==void 0&&(document.body.style.WebkitUserSelect=nn.current,nn.current=void 0),tn.clear()});M.useEffect(()=>zn,[zn]);const Ko=ee=>{ra.clear(),Xn=!0,Yo(!0),F&&!Je&&F(ee)},Gn=Qr(ee=>{ra.start(800+I,()=>{Xn=!1}),Yo(!1),z&&Je&&z(ee),_t.start(Ge.transitions.duration.shortest,()=>{ft.current=!1})}),Tr=ee=>{ft.current&&ee.type!=="touchstart"||(Se&&Se.removeAttribute("title"),Pt.clear(),wt.clear(),H||Xn&&te?Pt.start(Xn?te:H,()=>{Ko(ee)}):Ko(ee))},Jo=ee=>{Pt.clear(),wt.start(I,()=>{Gn(ee)})},{isFocusVisibleRef:Zo,onBlur:kl,onFocus:Nl,ref:El}=si(),[,Qo]=M.useState(!1),es=ee=>{kl(ee),Zo.current===!1&&(Qo(!1),Jo(ee))},ts=ee=>{Se||Vn(ee.currentTarget),Nl(ee),Zo.current===!0&&(Qo(!0),Tr(ee))},ns=ee=>{ft.current=!0;const _e=ye.props;_e.onTouchStart&&_e.onTouchStart(ee)},rs=Tr,os=Jo,Sl=ee=>{ns(ee),wt.clear(),_t.clear(),zn(),nn.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",tn.start(ae,()=>{document.body.style.WebkitUserSelect=nn.current,Tr(ee)})},Tl=ee=>{ye.props.onTouchEnd&&ye.props.onTouchEnd(ee),zn(),wt.start(U,()=>{Gn(ee)})};M.useEffect(()=>{if(!Je)return;function ee(_e){(_e.key==="Escape"||_e.key==="Esc")&&Gn(_e)}return document.addEventListener("keydown",ee),()=>{document.removeEventListener("keydown",ee)}},[Gn,Je]);const Cl=Tt(ye.ref,El,Vn,n);!pe&&pe!==0&&(Je=!1);const Cr=M.useRef(),jl=ee=>{const _e=ye.props;_e.onMouseMove&&_e.onMouseMove(ee),un={x:ee.clientX,y:ee.clientY},Cr.current&&Cr.current.update()},rn={},jr=typeof pe=="string";E?(rn.title=!Je&&jr&&!B?pe:null,rn["aria-describedby"]=Je?Sr:null):(rn["aria-label"]=jr?pe:null,rn["aria-labelledby"]=Je&&!jr?Sr:null);const Ae=P({},rn,L,ye.props,{className:lt(L.className,ye.props.className),onTouchStart:ns,ref:Cl},V?{onMouseMove:jl}:{});process.env.NODE_ENV!=="production"&&(Ae["data-mui-internal-clone-element"]=!0,M.useEffect(()=>{Se&&!Se.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[Se]));const on={};Y||(Ae.onTouchStart=Sl,Ae.onTouchEnd=Tl),B||(Ae.onMouseOver=Wn(rs,Ae.onMouseOver),Ae.onMouseLeave=Wn(os,Ae.onMouseLeave),Rt||(on.onMouseOver=rs,on.onMouseLeave=os)),D||(Ae.onFocus=Wn(ts,Ae.onFocus),Ae.onBlur=Wn(es,Ae.onBlur),Rt||(on.onFocus=ts,on.onBlur=es)),process.env.NODE_ENV!=="production"&&ye.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ye.props.title}\` or the Tooltip component.`].join(`
`));const Ol=M.useMemo(()=>{var ee;let _e=[{name:"arrow",enabled:!!He,options:{element:He,padding:4}}];return(ee=q.popperOptions)!=null&&ee.modifiers&&(_e=_e.concat(q.popperOptions.modifiers)),P({},q.popperOptions,{modifiers:_e})},[He,q]),sn=P({},j,{isRtl:pt,arrow:_,disableInteractive:Rt,placement:G,PopperComponentProp:W,touch:ft.current}),Or=qw(sn),ss=(r=(o=Z.popper)!=null?o:T.Popper)!=null?r:Xw,as=(s=(i=(l=Z.transition)!=null?l:T.Transition)!=null?i:$)!=null?s:na,is=(c=(p=Z.tooltip)!=null?p:T.Tooltip)!=null?c:Ww,ls=(f=(b=Z.arrow)!=null?b:T.Arrow)!=null?f:Yw,Rl=hn(ss,P({},q,(g=K.popper)!=null?g:R.popper,{className:lt(Or.popper,q==null?void 0:q.className,(d=(m=K.popper)!=null?m:R.popper)==null?void 0:d.className)}),sn),_l=hn(as,P({},xe,(u=K.transition)!=null?u:R.transition),sn),Pl=hn(is,P({},(h=K.tooltip)!=null?h:R.tooltip,{className:lt(Or.tooltip,(x=(C=K.tooltip)!=null?C:R.tooltip)==null?void 0:x.className)}),sn),Il=hn(ls,P({},(N=K.arrow)!=null?N:R.arrow,{className:lt(Or.arrow,(k=(v=K.arrow)!=null?v:R.arrow)==null?void 0:k.className)}),sn);return a.jsxs(M.Fragment,{children:[M.cloneElement(ye,Ae),a.jsx(ss,P({as:W??$i,placement:G,anchorEl:V?{getBoundingClientRect:()=>({top:un.y,left:un.x,right:un.x,bottom:un.y,width:0,height:0})}:Se,popperRef:Cr,open:Se?Je:!1,id:Sr,transition:!0},on,Rl,{popperOptions:Ol,children:({TransitionProps:ee})=>a.jsx(as,P({timeout:Ge.transitions.duration.shorter},ee,_l,{children:a.jsxs(is,P({},Pl,{children:[pe,_?a.jsx(ls,P({},Il,{ref:Ot})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Mi.propTypes={arrow:w.bool,children:ei.isRequired,classes:w.object,className:w.string,components:w.shape({Arrow:w.elementType,Popper:w.elementType,Tooltip:w.elementType,Transition:w.elementType}),componentsProps:w.shape({arrow:w.object,popper:w.object,tooltip:w.object,transition:w.object}),describeChild:w.bool,disableFocusListener:w.bool,disableHoverListener:w.bool,disableInteractive:w.bool,disableTouchListener:w.bool,enterDelay:w.number,enterNextDelay:w.number,enterTouchDelay:w.number,followCursor:w.bool,id:w.string,leaveDelay:w.number,leaveTouchDelay:w.number,onClose:w.func,onOpen:w.func,open:w.bool,placement:w.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:w.elementType,PopperProps:w.object,slotProps:w.shape({arrow:w.object,popper:w.object,tooltip:w.object,transition:w.object}),slots:w.shape({arrow:w.elementType,popper:w.elementType,tooltip:w.elementType,transition:w.elementType}),sx:w.oneOfType([w.arrayOf(w.oneOfType([w.func,w.object,w.bool])),w.func,w.object]),title:w.node,TransitionComponent:w.elementType,TransitionProps:w.object});const Kw=Mi;function oa(e,t,n){return e?a.jsx($e.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:a.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function qo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:s=void 0,iconPathAfter:i=void 0,hasAutoFocus:l=!1,className:c,isDisabled:p=!1,isDense:f=!0,isSubMenuParent:b=!1,hasDisabledGutters:g=!1,hasDivider:d=!1,focusVisibleClassName:m,id:u,children:h}=e,x=a.jsx($e.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:p,dense:f,disableGutters:g,divider:d,focusVisibleClassName:m,onClick:t,id:u,children:n?a.jsxs(a.Fragment,{children:[oa(s,n,!0),a.jsx($e.ListItemText,{primary:n,inset:!s&&o}),b?a.jsx($e.ListItemIcon,{className:"papi-menu-icon-trailing",children:a.jsx(gi,{})}):oa(i,n,!1)]}):h});return r?a.jsx(Kw,{title:r,placement:"right",children:a.jsx("div",{children:x})}):x}function Ai(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Jw(e){const[t,n]=y.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:s}=e,i=p=>{n(p.currentTarget)},l=()=>{n(void 0)},c=()=>{let p=Ai(s).filter(f=>"menuItem"in f.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return p=p.filter(f=>"menuItem"in f.group&&f.group.menuItem===r.id),a.jsx(Di,{...e,includedGroups:p})};return a.jsxs(a.Fragment,{children:[a.jsx(qo,{onClick:i,...o,isSubMenuParent:!0}),a.jsx($e.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Zw=(e,t)=>t.filter(o=>o.group===e).sort((o,s)=>(o.order||0)-(s.order||0));function Di(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:s,allowForLeadingIcons:i}=y.useMemo(()=>{const f=o&&o.length>0?o:Ai(t).filter(m=>!("menuItem"in m.group)),b=Object.values(f).sort((m,u)=>(m.group.order||0)-(u.group.order||0)),g=[];b.forEach(m=>{Zw(m.id,t.items).forEach(u=>g.push({item:u,isLastItemInGroup:!1})),g.length>0&&(g[g.length-1].isLastItemInGroup=!0)}),g.length>0&&(g[g.length-1].isLastItemInGroup=!1);const d=g.some(m=>"iconPathBefore"in m.item&&m.item.iconPathBefore);return{items:g,allowForLeadingIcons:d}},[o,t]),l=({item:f,isLastItemInGroup:b})=>({className:"papi-menu-item",label:f.label,tooltip:f.tooltip,iconPathBefore:"iconPathBefore"in f?f.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in f?f.iconPathAfter:void 0,hasDivider:b,allowForLeadingIcons:i}),[c]=s;if(!c)return a.jsx("div",{});const p=c.item.group;return a.jsx("div",{role:"menu","aria-label":p,children:s.map((f,b)=>{const{item:g}=f,d=l(f);if("command"in g){const m=g.group+b;return a.jsx(qo,{onClick:u=>{n==null||n(u),r(g)},...d},m)}return a.jsx(Jw,{parentMenuItem:g,parentItemProps:d,...e},p+g.id)})},p)}function Qw(e){const{menuDefinition:t,columnId:n}=e;let s=Object.entries(t.groups).map(([i,l])=>({id:i,group:l})).filter(i=>"column"in i.group);return n&&"columns"in t&&t.columns[n]&&(s=s.filter(i=>"column"in i.group&&i.group.column===n)),a.jsx(Di,{...e,includedGroups:s})}function em({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:s}){return a.jsxs($e.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${s??""}`,children:[a.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${s??""}`,children:r.label}),a.jsx($e.List,{id:n,dense:!0,className:s??"",children:a.jsx(Qw,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Bi({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,s=y.useMemo(()=>{const i=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,p=o[c];typeof p=="object"&&typeof p.order=="number"&&!Number.isNaN(p.order)?i.set(p.order,{id:c,metadata:p}):console.warn(`Property ${l} (${typeof p}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(i.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return a.jsx($e.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:s.length,role:"menu","aria-label":"GridMenu",id:r,children:s.map((i,l)=>a.jsx(em,{commandHandler:e,menuDefinition:n,...i,className:t},l))})}function tm(e){return{preserveValue:!0,...e}}const ar=(e,t,n={})=>{const r=y.useRef(t);r.current=t;const o=y.useRef(n);o.current=tm(o.current);const[s,i]=y.useState(()=>r.current),[l,c]=y.useState(!0);return y.useEffect(()=>{let p=!0;return c(!!e),(async()=>{if(e){const f=await e();p&&(i(()=>f),c(!1))}})(),()=>{p=!1,o.current.preserveValue||i(()=>r.current)}},[e]),[s,l]},nm=hi(a.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Li({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:s,ariaLabelPrefix:i,children:l}){const[c,p]=y.useState(!1),[f,b]=y.useState(!1),g=y.useCallback(()=>{c&&p(!1),b(!1)},[c]),d=y.useCallback(k=>{k.stopPropagation(),p(v=>{const j=!v;return j&&k.shiftKey?b(!0):j||b(!1),j})},[]),m=y.useCallback(k=>(g(),r(k)),[r,g]),[u,h]=y.useState({top:1,left:1});y.useEffect(()=>{if(c){const k=o==null?void 0:o.current;if(k){const v=k.getBoundingClientRect(),j=window.scrollY,_=window.scrollX,A=v.top+j+k.clientHeight,T=v.left+_;h({top:A,left:T})}}},[c,o]);const[x]=ar(y.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[C]=ar(y.useCallback(async()=>(e==null?void 0:e(!0))??n??x,[e,n,x,c]),n??x),N=f&&C?C:x;return a.jsxs(a.Fragment,{children:[a.jsx($e.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${s??""}`,color:"inherit","aria-label":`${i??""} menu button`,onClick:d,children:l??a.jsx(nm,{})}),a.jsx($e.Drawer,{className:`papi-menu-drawer ${s??""}`,anchor:"left",variant:"temporary",open:c,onClose:g,PaperProps:{className:"papi-menu-drawer-paper",style:{top:u.top,left:u.left}},children:N?a.jsx(Bi,{className:s,id:`${i??""} main menu`,commandHandler:m,multiColumnMenu:N}):void 0})]})}function rm({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:s=!1,size:i="medium",className:l,onClick:c,children:p}){return a.jsx($e.IconButton,{id:e,disabled:n,edge:s,size:i,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:p})}const en=y.forwardRef(({className:e,...t},n)=>a.jsx(ne.LoaderCircle,{size:35,className:O("tw-animate-spin",e),...t,ref:n}));en.displayName="Spinner";function om({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:s,placeholder:i,isRequired:l=!1,className:c,defaultValue:p,value:f,onChange:b,onFocus:g,onBlur:d}){return a.jsxs("div",{className:O("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":r}),children:[a.jsx(qe,{htmlFor:e,className:O({"tw-text-red-600":n,"tw-hidden":!s}),children:`${s}${l?"*":""}`}),a.jsx(Jt,{id:e,disabled:t,placeholder:i,required:l,className:O(c,{"tw-border-red-600":n}),defaultValue:p,value:f,onChange:b,onFocus:g,onBlur:d}),a.jsx("p",{className:O({"tw-hidden":!o}),children:o})]})}function sm({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const s=y.useRef(void 0);return a.jsx("div",{ref:s,style:{position:"relative"},children:a.jsx($e.AppBar,{position:"static",id:r,children:a.jsxs($e.Toolbar,{className:O("tw-bg-muted tw-text-muted-foreground",n),variant:"dense",children:[e?a.jsx(Li,{commandHandler:t,containerRef:s,menuProvider:e}):void 0,o?a.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const am=ir.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Vi=y.forwardRef(({className:e,variant:t,...n},r)=>a.jsx("div",{ref:r,role:"alert",className:O(am({variant:t}),e),...n}));Vi.displayName="Alert";const Fi=y.forwardRef(({className:e,...t},n)=>a.jsxs("h5",{ref:n,className:O("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",e),...t,children:[t.children," "]}));Fi.displayName="AlertTitle";const zi=y.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:O("tw-text-sm [&_p]:tw-leading-relaxed",e),...t}));zi.displayName="AlertDescription";const Gi=y.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:O("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",e),...t}));Gi.displayName="Card";const Hi=y.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:O("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",e),...t}));Hi.displayName="CardHeader";const Ui=y.forwardRef(({className:e,...t},n)=>a.jsx("h3",{ref:n,className:O("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",e),...t,children:t.children}));Ui.displayName="CardTitle";const qi=y.forwardRef(({className:e,...t},n)=>a.jsx("p",{ref:n,className:O("pr-twp tw-text-sm tw-text-muted-foreground",e),...t}));qi.displayName="CardDescription";const Xi=y.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:O("pr-twp tw-p-6 tw-pt-0",e),...t}));Xi.displayName="CardContent";const Wi=y.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:O("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",e),...t}));Wi.displayName="CardFooter";function im({...e}){return a.jsx(fa.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const Yi=y.forwardRef(({className:e,...t},n)=>a.jsxs(wn.Root,{ref:n,className:O("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",e),...t,children:[a.jsx(wn.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:a.jsx(wn.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),a.jsx(wn.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]}));Yi.displayName=wn.Root.displayName;const Ki=y.forwardRef(({className:e,...t},n)=>a.jsx(Yr.Root,{className:O("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",e),...t,ref:n,children:a.jsx(Yr.Thumb,{className:O("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0")})}));Ki.displayName=Yr.Root.displayName;const lm=Re.Root,Ji=y.forwardRef(({className:e,...t},n)=>a.jsx(Re.List,{ref:n,className:O("tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));Ji.displayName=Re.List.displayName;const Zi=y.forwardRef(({className:e,...t},n)=>a.jsx(Re.Trigger,{ref:n,className:O("tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e),...t}));Zi.displayName=Re.Trigger.displayName;const Qi=y.forwardRef(({className:e,...t},n)=>a.jsx(Re.Content,{ref:n,className:O("tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));Qi.displayName=Re.Content.displayName;function cm({isInstalling:e,handleClick:t,buttonText:n,className:r,...o}){return a.jsx(be,{className:O("tw-h-8 tw-rounded-md tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":e,"tw-bg-blue-600":!e,"tw-bg-white tw-text-blue-600 hover:tw-text-white":!n,"tw-w-20":n},r),onClick:t,...o,children:e?a.jsx(en,{size:15}):a.jsxs(a.Fragment,{children:[a.jsx(ne.Download,{size:25,className:O("tw-h-4 tw-w-4",{"tw-mr-1":n})}),n]})})}function dm({isEnabling:e,handleClick:t,className:n,...r}){return a.jsx(be,{className:O("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":e},n),onClick:t,...r,children:e?a.jsxs(a.Fragment,{children:[a.jsx(en,{size:15,className:"tw-mr-1 tw-text-white"}),"Enabling..."]}):"Enable"})}function um({isDisabling:e,handleClick:t,className:n,...r}){return a.jsx(be,{className:O("tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",{"tw-cursor-not-allowed tw-bg-gray-400":e},n),onClick:t,...r,children:e?a.jsxs(a.Fragment,{children:[a.jsx(en,{size:15,className:"tw-mr-1 tw-text-black"}),"Disabling..."]}):"Disable"})}function pm({isUpdating:e,handleClick:t,className:n,...r}){return a.jsx(be,{className:O("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",{"tw-cursor-not-allowed tw-bg-blue-700":e},n),onClick:t,...r,children:e?a.jsxs(a.Fragment,{children:[a.jsx(en,{size:15,className:"tw-mr-1 tw-text-white"}),"Updating..."]}):"Update"})}function yt(){return yt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},yt.apply(this,arguments)}const fm=["children","options"],sa=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,t)=>(e[t.toLowerCase()]=t,e),{for:"htmlFor"}),aa={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},wm=["style","script"],mm=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,hm=/mailto:/i,gm=/\n{2,}$/,el=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,bm=/^ *> ?/gm,vm=/^ {2,}\n/,ym=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,tl=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,nl=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,xm=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,km=/^(?:\n *)*\n/,Nm=/\r\n?/g,Em=/^\[\^([^\]]+)](:.*)\n/,Sm=/^\[\^([^\]]+)]/,Tm=/\f/g,Cm=/^\s*?\[(x|\s)\]/,rl=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,ol=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,sl=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,ao=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,jm=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,al=/^<!--[\s\S]*?(?:-->)/,Om=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,io=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,Rm=/^\{.*\}$/,_m=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,Pm=/^<([^ >]+@[^ >]+)>/,Im=/^<([^ >]+:\/[^ >]+)>/,$m=/-([a-z])?/gi,il=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,Mm=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,Am=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,Dm=/^\[([^\]]*)\] ?\[([^\]]*)\]/,Bm=/(\[|\])/g,Lm=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,Vm=/\t/g,Fm=/^ *\| */,zm=/(^ *\||\| *$)/g,Gm=/ *$/,Hm=/^ *:-+: *$/,Um=/^ *:-+ *$/,qm=/^ *-+: *$/,Xm=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,Wm=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,Ym=/^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,Km=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,Jm=/^\\([^0-9A-Za-z\s])/,Zm=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,Qm=/^\n+/,eh=/^([ \t]*)/,th=/\\([^\\])/g,ia=/ *\n+$/,nh=/(?:^|\n)( *)$/,Xo="(?:\\d+\\.)",Wo="(?:[*+-])";function ll(e){return"( *)("+(e===1?Xo:Wo)+") +"}const cl=ll(1),dl=ll(2);function ul(e){return new RegExp("^"+(e===1?cl:dl))}const rh=ul(1),oh=ul(2);function pl(e){return new RegExp("^"+(e===1?cl:dl)+"[^\\n]*(?:\\n(?!\\1"+(e===1?Xo:Wo)+" )[^\\n]*)*(\\n|$)","gm")}const fl=pl(1),wl=pl(2);function ml(e){const t=e===1?Xo:Wo;return new RegExp("^( *)("+t+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+t+" (?!"+t+" ))\\n*|\\s*\\n*$)")}const hl=ml(1),gl=ml(2);function la(e,t){const n=t===1,r=n?hl:gl,o=n?fl:wl,s=n?rh:oh;return{t(i,l,c){const p=nh.exec(c);return p&&(l.o||!l._&&!l.u)?r.exec(i=p[1]+i):null},i:oe.HIGH,l(i,l,c){const p=n?+i[2]:void 0,f=i[0].replace(gm,`
`).match(o);let b=!1;return{p:f.map(function(g,d){const m=s.exec(g)[0].length,u=new RegExp("^ {1,"+m+"}","gm"),h=g.replace(u,"").replace(s,""),x=d===f.length-1,C=h.indexOf(`

`)!==-1||x&&b;b=C;const N=c._,k=c.o;let v;c.o=!0,C?(c._=!1,v=h.replace(ia,`

`)):(c._=!0,v=h.replace(ia,""));const j=l(v,c);return c._=N,c.o=k,j}),m:n,g:p}},h:(i,l,c)=>e(i.m?"ol":"ul",{key:c.k,start:i.g},i.p.map(function(p,f){return e("li",{key:f},l(p,c))}))}}const sh=/^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,ah=/^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,bl=[el,tl,nl,rl,sl,ol,al,il,fl,hl,wl,gl],ih=[...bl,/^[^\n]+(?:  \n|\n{2,})/,ao,io];function lh(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function ch(e){return qm.test(e)?"right":Hm.test(e)?"center":Um.test(e)?"left":null}function ca(e,t,n){const r=n.$;n.$=!0;const o=t(e.trim(),n);n.$=r;let s=[[]];return o.forEach(function(i,l){i.type==="tableSeparator"?l!==0&&l!==o.length-1&&s.push([]):(i.type!=="text"||o[l+1]!=null&&o[l+1].type!=="tableSeparator"||(i.v=i.v.replace(Gm,"")),s[s.length-1].push(i))}),s}function dh(e,t,n){n._=!0;const r=ca(e[1],t,n),o=e[2].replace(zm,"").split("|").map(ch),s=function(i,l,c){return i.trim().split(`
`).map(function(p){return ca(p,l,c)})}(e[3],t,n);return n._=!1,{S:o,A:s,L:r,type:"table"}}function da(e,t){return e.S[t]==null?{}:{textAlign:e.S[t]}}function st(e){return function(t,n){return n._?e.exec(t):null}}function at(e){return function(t,n){return n._||n.u?e.exec(t):null}}function Ze(e){return function(t,n){return n._||n.u?null:e.exec(t)}}function pn(e){return function(t){return e.exec(t)}}function uh(e,t,n){if(t._||t.u||n&&!n.endsWith(`
`))return null;let r="";e.split(`
`).every(s=>!bl.some(i=>i.test(s))&&(r+=s+`
`,s.trim()));const o=r.trimEnd();return o==""?null:[r,o]}function Lt(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch{return null}return e}function ua(e){return e.replace(th,"$1")}function Zn(e,t,n){const r=n._||!1,o=n.u||!1;n._=!0,n.u=!0;const s=e(t,n);return n._=r,n.u=o,s}function ph(e,t,n){const r=n._||!1,o=n.u||!1;n._=!1,n.u=!0;const s=e(t,n);return n._=r,n.u=o,s}function fh(e,t,n){return n._=!1,e(t,n)}const zr=(e,t,n)=>({v:Zn(t,e[1],n)});function Gr(){return{}}function Hr(){return null}function wh(...e){return e.filter(Boolean).join(" ")}function Ur(e,t,n){let r=e;const o=t.split(".");for(;o.length&&(r=r[o[0]],r!==void 0);)o.shift();return r||n}var oe;function mh(e,t={}){t.overrides=t.overrides||{},t.slugify=t.slugify||lh,t.namedCodesToUnicode=t.namedCodesToUnicode?yt({},aa,t.namedCodesToUnicode):aa;const n=t.createElement||M.createElement;function r(d,m,...u){const h=Ur(t.overrides,`${d}.props`,{});return n(function(x,C){const N=Ur(C,x);return N?typeof N=="function"||typeof N=="object"&&"render"in N?N:Ur(C,`${x}.component`,x):x}(d,t.overrides),yt({},m,h,{className:wh(m==null?void 0:m.className,h.className)||void 0}),...u)}function o(d){let m=!1;t.forceInline?m=!0:t.forceBlock||(m=Lm.test(d)===!1);const u=f(p(m?d:`${d.trimEnd().replace(Qm,"")}

`,{_:m}));for(;typeof u[u.length-1]=="string"&&!u[u.length-1].trim();)u.pop();if(t.wrapper===null)return u;const h=t.wrapper||(m?"span":"div");let x;if(u.length>1||t.forceWrapper)x=u;else{if(u.length===1)return x=u[0],typeof x=="string"?r("span",{key:"outer"},x):x;x=null}return M.createElement(h,{key:"outer"},x)}function s(d){const m=d.match(mm);return m?m.reduce(function(u,h,x){const C=h.indexOf("=");if(C!==-1){const N=function(_){return _.indexOf("-")!==-1&&_.match(Om)===null&&(_=_.replace($m,function(A,T){return T.toUpperCase()})),_}(h.slice(0,C)).trim(),k=function(_){const A=_[0];return(A==='"'||A==="'")&&_.length>=2&&_[_.length-1]===A?_.slice(1,-1):_}(h.slice(C+1).trim()),v=sa[N]||N,j=u[v]=function(_,A){return _==="style"?A.split(/;\s?/).reduce(function(T,R){const E=R.slice(0,R.indexOf(":"));return T[E.replace(/(-[a-z])/g,D=>D[1].toUpperCase())]=R.slice(E.length+1).trim(),T},{}):_==="href"?Lt(A):(A.match(Rm)&&(A=A.slice(1,A.length-1)),A==="true"||A!=="false"&&A)}(N,k);typeof j=="string"&&(ao.test(j)||io.test(j))&&(u[v]=M.cloneElement(o(j.trim()),{key:x}))}else h!=="style"&&(u[sa[h]||h]=!0);return u},{}):null}const i=[],l={},c={blockQuote:{t:Ze(el),i:oe.HIGH,l:(d,m,u)=>({v:m(d[0].replace(bm,""),u)}),h:(d,m,u)=>r("blockquote",{key:u.k},m(d.v,u))},breakLine:{t:pn(vm),i:oe.HIGH,l:Gr,h:(d,m,u)=>r("br",{key:u.k})},breakThematic:{t:Ze(ym),i:oe.HIGH,l:Gr,h:(d,m,u)=>r("hr",{key:u.k})},codeBlock:{t:Ze(nl),i:oe.MAX,l:d=>({v:d[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),M:void 0}),h:(d,m,u)=>r("pre",{key:u.k},r("code",yt({},d.O,{className:d.M?`lang-${d.M}`:""}),d.v))},codeFenced:{t:Ze(tl),i:oe.MAX,l:d=>({O:s(d[3]||""),v:d[4],M:d[2]||void 0,type:"codeBlock"})},codeInline:{t:at(xm),i:oe.LOW,l:d=>({v:d[2]}),h:(d,m,u)=>r("code",{key:u.k},d.v)},footnote:{t:Ze(Em),i:oe.MAX,l:d=>(i.push({I:d[2],j:d[1]}),{}),h:Hr},footnoteReference:{t:st(Sm),i:oe.HIGH,l:d=>({v:d[1],B:`#${t.slugify(d[1])}`}),h:(d,m,u)=>r("a",{key:u.k,href:Lt(d.B)},r("sup",{key:u.k},d.v))},gfmTask:{t:st(Cm),i:oe.HIGH,l:d=>({R:d[1].toLowerCase()==="x"}),h:(d,m,u)=>r("input",{checked:d.R,key:u.k,readOnly:!0,type:"checkbox"})},heading:{t:Ze(t.enforceAtxHeadings?ol:rl),i:oe.HIGH,l:(d,m,u)=>({v:Zn(m,d[2],u),T:t.slugify(d[2]),C:d[1].length}),h:(d,m,u)=>r(`h${d.C}`,{id:d.T,key:u.k},m(d.v,u))},headingSetext:{t:Ze(sl),i:oe.MAX,l:(d,m,u)=>({v:Zn(m,d[1],u),C:d[2]==="="?1:2,type:"heading"})},htmlComment:{t:pn(al),i:oe.HIGH,l:()=>({}),h:Hr},image:{t:at(ah),i:oe.HIGH,l:d=>({D:d[1],B:ua(d[2]),F:d[3]}),h:(d,m,u)=>r("img",{key:u.k,alt:d.D||void 0,title:d.F||void 0,src:Lt(d.B)})},link:{t:st(sh),i:oe.LOW,l:(d,m,u)=>({v:ph(m,d[1],u),B:ua(d[2]),F:d[3]}),h:(d,m,u)=>r("a",{key:u.k,href:Lt(d.B),title:d.F},m(d.v,u))},linkAngleBraceStyleDetector:{t:st(Im),i:oe.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],type:"link"})},linkBareUrlDetector:{t:(d,m)=>m.N?null:st(_m)(d,m),i:oe.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],F:void 0,type:"link"})},linkMailtoDetector:{t:st(Pm),i:oe.MAX,l(d){let m=d[1],u=d[1];return hm.test(u)||(u="mailto:"+u),{v:[{v:m.replace("mailto:",""),type:"text"}],B:u,type:"link"}}},orderedList:la(r,1),unorderedList:la(r,2),newlineCoalescer:{t:Ze(km),i:oe.LOW,l:Gr,h:()=>`
`},paragraph:{t:uh,i:oe.LOW,l:zr,h:(d,m,u)=>r("p",{key:u.k},m(d.v,u))},ref:{t:st(Mm),i:oe.MAX,l:d=>(l[d[1]]={B:d[2],F:d[4]},{}),h:Hr},refImage:{t:at(Am),i:oe.MAX,l:d=>({D:d[1]||void 0,P:d[2]}),h:(d,m,u)=>r("img",{key:u.k,alt:d.D,src:Lt(l[d.P].B),title:l[d.P].F})},refLink:{t:st(Dm),i:oe.MAX,l:(d,m,u)=>({v:m(d[1],u),Z:m(d[0].replace(Bm,"\\$1"),u),P:d[2]}),h:(d,m,u)=>l[d.P]?r("a",{key:u.k,href:Lt(l[d.P].B),title:l[d.P].F},m(d.v,u)):r("span",{key:u.k},m(d.Z,u))},table:{t:Ze(il),i:oe.HIGH,l:dh,h:(d,m,u)=>r("table",{key:u.k},r("thead",null,r("tr",null,d.L.map(function(h,x){return r("th",{key:x,style:da(d,x)},m(h,u))}))),r("tbody",null,d.A.map(function(h,x){return r("tr",{key:x},h.map(function(C,N){return r("td",{key:N,style:da(d,N)},m(C,u))}))})))},tableSeparator:{t:function(d,m){return m.$?(m._=!0,Fm.exec(d)):null},i:oe.HIGH,l:function(){return{type:"tableSeparator"}},h:()=>" | "},text:{t:pn(Zm),i:oe.MIN,l:d=>({v:d[0].replace(jm,(m,u)=>t.namedCodesToUnicode[u]?t.namedCodesToUnicode[u]:m)}),h:d=>d.v},textBolded:{t:at(Xm),i:oe.MED,l:(d,m,u)=>({v:m(d[2],u)}),h:(d,m,u)=>r("strong",{key:u.k},m(d.v,u))},textEmphasized:{t:at(Wm),i:oe.LOW,l:(d,m,u)=>({v:m(d[2],u)}),h:(d,m,u)=>r("em",{key:u.k},m(d.v,u))},textEscaped:{t:at(Jm),i:oe.HIGH,l:d=>({v:d[1],type:"text"})},textMarked:{t:at(Ym),i:oe.LOW,l:zr,h:(d,m,u)=>r("mark",{key:u.k},m(d.v,u))},textStrikethroughed:{t:at(Km),i:oe.LOW,l:zr,h:(d,m,u)=>r("del",{key:u.k},m(d.v,u))}};t.disableParsingRawHTML!==!0&&(c.htmlBlock={t:pn(ao),i:oe.HIGH,l(d,m,u){const[,h]=d[3].match(eh),x=new RegExp(`^${h}`,"gm"),C=d[3].replace(x,""),N=(k=C,ih.some(A=>A.test(k))?fh:Zn);var k;const v=d[1].toLowerCase(),j=wm.indexOf(v)!==-1;u.N=u.N||v==="a";const _=j?d[3]:N(m,C,u);return u.N=!1,{O:s(d[2]),v:_,G:j,H:j?v:d[1]}},h:(d,m,u)=>r(d.H,yt({key:u.k},d.O),d.G?d.v:m(d.v,u))},c.htmlSelfClosing={t:pn(io),i:oe.HIGH,l:d=>({O:s(d[2]||""),H:d[1]}),h:(d,m,u)=>r(d.H,yt({},d.O,{key:u.k}))});const p=function(d){let m=Object.keys(d);function u(h,x){let C=[],N="";for(;h;){let k=0;for(;k<m.length;){const v=m[k],j=d[v],_=j.t(h,x,N);if(_){const A=_[0];h=h.substring(A.length);const T=j.l(_,u,x);T.type==null&&(T.type=v),C.push(T),N=A;break}k++}}return C}return m.sort(function(h,x){let C=d[h].i,N=d[x].i;return C!==N?C-N:h<x?-1:1}),function(h,x){return u(function(C){return C.replace(Nm,`
`).replace(Tm,"").replace(Vm,"    ")}(h),x)}}(c),f=(b=function(d){return function(m,u,h){return d[m.type].h(m,u,h)}}(c),function d(m,u={}){if(Array.isArray(m)){const h=u.k,x=[];let C=!1;for(let N=0;N<m.length;N++){u.k=N;const k=d(m[N],u),v=typeof k=="string";v&&C?x[x.length-1]+=k:k!==null&&x.push(k),C=v}return u.k=h,x}return b(m,d,u)});var b;const g=o(e);return i.length?r("div",null,g,r("footer",{key:"footer"},i.map(function(d){return r("div",{id:t.slugify(d.j),key:d.j},d.j,f(p(d.I,{_:!0})))}))):g}(function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"})(oe||(oe={}));const hh=e=>{let{children:t,options:n}=e,r=function(o,s){if(o==null)return{};var i,l,c={},p=Object.keys(o);for(l=0;l<p.length;l++)s.indexOf(i=p[l])>=0||(c[i]=o[i]);return c}(e,fm);return M.cloneElement(mh(t,n),r)};function gh({id:e,markdown:t,className:n}){return a.jsx("div",{id:e,className:O("pr-twp tw-prose",n),children:a.jsx(hh,{children:t})})}const vl=y.forwardRef((e,t)=>a.jsxs(be,{ref:t,className:"tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",...e,children:[a.jsx(ne.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"}),"Filter",a.jsx(ne.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"})]}));var yl=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(yl||{});function bh({id:e,groups:t}){return a.jsx("div",{id:e,children:a.jsxs(cr,{children:[a.jsx(po,{asChild:!0,children:a.jsx(vl,{})}),a.jsx(On,{children:t.map(n=>a.jsxs("div",{children:[a.jsx(Qt,{children:n.label}),a.jsx(Na,{children:n.items.map(r=>a.jsx("div",{children:r.itemType===0?a.jsx(dr,{onClick:r.onClick,children:r.label}):a.jsx(wo,{onClick:r.onClick,value:r.label,children:r.label})},r.label))}),a.jsx(Rn,{})]},n.label))})]})})}function vh({id:e,message:t}){return a.jsx("div",{id:e,className:"tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center",children:a.jsx("div",{className:"tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center",children:a.jsx("p",{className:"tw-text-lg tw-text-gray-800",children:t})})})}function yh({id:e,category:t,downloads:n,languages:r,moreInfoUrl:o}){const s=new Q.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(n).reduce((l,c)=>l+c,0)),i=()=>{window.scrollTo(0,document.body.scrollHeight)};return a.jsxs("div",{id:e,className:"tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",children:[a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsx("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:a.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:t})}),a.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"CATEGORY"})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsxs("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:[a.jsx(ne.User,{className:"tw-mr-1 tw-h-4 tw-w-4"}),a.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:s})]}),a.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"USERS"})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsx("div",{className:"tw-flex tw-items-center",children:r.slice(0,3).map(l=>a.jsx("span",{className:"tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",children:l.toUpperCase()},l))}),r.length>3&&a.jsxs("button",{type:"button",onClick:()=>i(),className:"tw-text-xs tw-text-gray-500 tw-underline",children:["+",r.length-3," more languages"]})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-ml-auto tw-flex tw-flex-col tw-space-y-2",children:[a.jsxs("a",{href:o,target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Website",a.jsx(ne.Link,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]}),a.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Support",a.jsx(ne.CircleHelp,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]})]})]})}function xl({id:e,versionHistory:t}){const[n,r]=y.useState(!1),o=new Date;function s(l){const c=new Date(l),p=new Date(o.getTime()-c.getTime()),f=p.getUTCFullYear()-1970,b=p.getUTCMonth(),g=p.getUTCDate()-1;let d="";return f>0?d=`${f.toString()} year${f===1?"":"s"} ago`:b>0?d=`${b.toString()} month${b===1?"":"s"} ago`:g===0?d="today":d=`${g.toString()} day${g===1?"":"s"} ago`,d}const i=Object.entries(t).sort((l,c)=>c[0].localeCompare(l[0]));return a.jsxs("div",{id:e,children:[a.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),a.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600",children:(n?i:i.slice(0,5)).map(l=>a.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[a.jsx("div",{className:"tw-text-gray-600",children:a.jsx("li",{className:"tw-prose tw-text-xs",children:a.jsx("span",{children:l[1].description})})}),a.jsxs("div",{className:"tw-justify-end tw-text-right",children:[a.jsxs("div",{children:["Version ",l[0]]}),a.jsx("div",{children:s(l[1].date)})]})]},l[0]))}),i.length>5&&a.jsx("button",{type:"button",onClick:()=>r(!n),className:"tw-text-xs tw-text-gray-500 tw-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function xh({id:e,publisherDisplayName:t,fileSize:n,locales:r,versionHistory:o}){const s=y.useMemo(()=>Q.formatBytes(n),[n]),l=(c=>{const p=new Intl.DisplayNames(navigator.language,{type:"language"});return c.map(f=>p.of(f))})(r);return a.jsx("div",{id:e,className:"tw-border-t tw-pb-4 tw-pt-4",children:a.jsxs("div",{className:"tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0",children:[a.jsx(xl,{versionHistory:o}),a.jsx("div",{className:"tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300"}),a.jsxs("div",{className:"tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3",children:[a.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),a.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600",children:[a.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[a.jsx("span",{className:"tw-mb-2",children:"Publisher"}),a.jsx("span",{className:"tw-font-semibold",children:t}),a.jsx("span",{className:"tw-mb-2 tw-mt-4",children:"Size"}),a.jsx("span",{className:"tw-font-semibold",children:s})]}),a.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600",children:a.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[a.jsx("span",{className:"tw-mb-2",children:"Languages"}),a.jsx("span",{className:"tw-font-semibold",children:l.join(", ")})]})})]})]})]})})}const kh=(e,t)=>{y.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},qr=()=>!1,Nh=(e,t)=>{const[n]=ar(y.useCallback(async()=>{if(!e)return qr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),qr,{preserveValue:!1});y.useEffect(()=>()=>{n!==qr&&n()},[n])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>fa.toast});exports.Alert=Vi;exports.AlertDescription=zi;exports.AlertTitle=Fi;exports.BOOK_SELECTOR_STRING_KEYS=Ic;exports.BookChapterControl=kc;exports.BookSelectionMode=Aa;exports.BookSelector=$c;exports.Button=be;exports.Card=Gi;exports.CardContent=Xi;exports.CardDescription=qi;exports.CardFooter=Wi;exports.CardHeader=Hi;exports.CardTitle=Ui;exports.ChapterRangeSelector=Ma;exports.Checkbox=No;exports.Checklist=ad;exports.ComboBox=Kr;exports.DataTable=za;exports.DisableButton=um;exports.DropdownMenu=cr;exports.DropdownMenuCheckboxItem=dr;exports.DropdownMenuContent=On;exports.DropdownMenuGroup=Na;exports.DropdownMenuItem=fo;exports.DropdownMenuItemType=yl;exports.DropdownMenuLabel=Qt;exports.DropdownMenuPortal=cc;exports.DropdownMenuRadioGroup=uc;exports.DropdownMenuRadioItem=wo;exports.DropdownMenuSeparator=Rn;exports.DropdownMenuShortcut=Ta;exports.DropdownMenuSub=dc;exports.DropdownMenuSubContent=Sa;exports.DropdownMenuSubTrigger=Ea;exports.DropdownMenuTrigger=po;exports.EnableButton=dm;exports.FilterButton=vl;exports.FilterDropdown=bh;exports.Footer=xh;exports.GridMenu=Bi;exports.HamburgerMenuButton=Li;exports.INVENTORY_STRING_KEYS=Lc;exports.IconButton=rm;exports.Input=Jt;exports.InstallButton=cm;exports.Inventory=zc;exports.Label=qe;exports.MarkdownRenderer=gh;exports.MenuItem=qo;exports.MoreInfo=yh;exports.NavigationContentSearch=Xc;exports.NoExtensionsFound=vh;exports.RadioGroup=mo;exports.RadioGroupItem=Qn;exports.ScriptureResultsViewer=td;exports.ScrollGroupSelector=nd;exports.SearchBar=Ua;exports.Select=zt;exports.SelectContent=Et;exports.SelectGroup=Da;exports.SelectItem=De;exports.SelectLabel=Ba;exports.SelectScrollDownButton=go;exports.SelectScrollUpButton=ho;exports.SelectSeparator=La;exports.SelectTrigger=Nt;exports.SelectValue=Gt;exports.Separator=ko;exports.SettingsList=rd;exports.SettingsListHeader=sd;exports.SettingsListItem=od;exports.Slider=Yi;exports.Sonner=im;exports.Spinner=en;exports.Switch=Ki;exports.Table=_n;exports.TableBody=In;exports.TableCaption=Fa;exports.TableCell=St;exports.TableFooter=Va;exports.TableHead=Ht;exports.TableHeader=Pn;exports.TableRow=Qe;exports.Tabs=lm;exports.TabsContent=Qi;exports.TabsList=Ji;exports.TabsTrigger=Zi;exports.TextField=om;exports.ToggleGroup=bo;exports.ToggleGroupItem=vn;exports.Toolbar=sm;exports.UpdateButton=pm;exports.VersionHistory=xl;exports.VerticalTabs=vo;exports.VerticalTabsContent=xo;exports.VerticalTabsList=yo;exports.VerticalTabsTrigger=qa;exports.buttonVariants=Ca;exports.cn=O;exports.getSortingIcon=ur;exports.inventoryCountColumn=Uc;exports.inventoryItemColumn=Hc;exports.inventoryStatusColumn=qc;exports.useEvent=kh;exports.useEventAsync=Nh;exports.usePromise=ar;function Eh(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Eh(`.papi-icon-button {
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
.tw-left-2 {
  left: 0.5rem;
}
.tw-left-2\\.5 {
  left: 0.625rem;
}
.tw-left-\\[50\\%\\] {
  left: 50%;
}
.tw-right-3 {
  right: 0.75rem;
}
.tw-right-4 {
  right: 1rem;
}
.tw-top-0 {
  top: 0px;
}
.tw-top-1\\/2 {
  top: 50%;
}
.tw-top-2 {
  top: 0.5rem;
}
.tw-top-2\\.5 {
  top: 0.625rem;
}
.tw-top-4 {
  top: 1rem;
}
.tw-top-\\[50\\%\\] {
  top: 50%;
}
.tw-z-10 {
  z-index: 10;
}
.tw-z-30 {
  z-index: 30;
}
.tw-z-50 {
  z-index: 50;
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
.tw-ms-2 {
  margin-inline-start: 0.5rem;
}
.tw-ms-5 {
  margin-inline-start: 1.25rem;
}
.tw-ms-auto {
  margin-inline-start: auto;
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
.tw-h-\\[var\\(--radix-select-trigger-height\\)\\] {
  height: var(--radix-select-trigger-height);
}
.tw-h-full {
  height: 100%;
}
.tw-h-px {
  height: 1px;
}
.tw-max-h-96 {
  max-height: 24rem;
}
.tw-max-h-\\[300px\\] {
  max-height: 300px;
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
.tw-w-72 {
  width: 18rem;
}
.tw-w-8 {
  width: 2rem;
}
.tw-w-9 {
  width: 2.25rem;
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
.tw-w-\\[350px\\] {
  width: 350px;
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
.tw-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.tw-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
}
.tw-max-w-64 {
  max-width: 16rem;
}
.tw-max-w-lg {
  max-width: 32rem;
}
.tw-flex-1 {
  flex: 1 1 0%;
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
.tw-caption-bottom {
  caption-side: bottom;
}
.tw--translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-\\[-50\\%\\] {
  --tw-translate-x: -50%;
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
.tw-gap-0 {
  gap: 0px;
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
.tw-gap-x-4 {
  column-gap: 1rem;
}
.tw-space-x-0 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0px * var(--tw-space-x-reverse));
  margin-left: calc(0px * calc(1 - var(--tw-space-x-reverse)));
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
.tw-rounded-full {
  border-radius: 9999px;
}
.tw-rounded-lg {
  border-radius: var(--radius);
}
.tw-rounded-md {
  border-radius: calc(var(--radius) - 2px);
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
.tw-border-l {
  border-left-width: 1px;
}
.tw-border-l-2 {
  border-left-width: 2px;
}
.tw-border-r-0 {
  border-right-width: 0px;
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
.tw-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
}
.tw-border-blue-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity));
}
.tw-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.tw-border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
}
.tw-border-gray-400 {
  --tw-border-opacity: 1;
  border-color: rgb(156 163 175 / var(--tw-border-opacity));
}
.tw-border-input {
  border-color: hsl(var(--input));
}
.tw-border-primary {
  border-color: hsl(var(--primary));
}
.tw-border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity));
}
.tw-border-transparent {
  border-color: transparent;
}
.tw-border-l-indigo-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(199 210 254 / var(--tw-border-opacity));
}
.tw-border-l-purple-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(233 213 255 / var(--tw-border-opacity));
}
.tw-border-l-red-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(254 202 202 / var(--tw-border-opacity));
}
.tw-bg-accent {
  background-color: hsl(var(--accent));
}
.tw-bg-accent-foreground {
  background-color: hsl(var(--accent-foreground));
}
.tw-bg-amber-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
}
.tw-bg-amber-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(253 230 138 / var(--tw-bg-opacity));
}
.tw-bg-amber-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 251 235 / var(--tw-bg-opacity));
}
.tw-bg-background {
  background-color: hsl(var(--background));
}
.tw-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.tw-bg-blue-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity));
}
.tw-bg-blue-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
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
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}
.tw-bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity));
}
.tw-bg-gray-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity));
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
  background-color: rgb(212 212 212 / var(--tw-bg-opacity));
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
.tw-bg-transparent {
  background-color: transparent;
}
.tw-bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
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
.tw-pl-4 {
  padding-left: 1rem;
}
.tw-pl-5 {
  padding-left: 1.25rem;
}
.tw-pl-8 {
  padding-left: 2rem;
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
.tw-ps-4 {
  padding-inline-start: 1rem;
}
.tw-ps-8 {
  padding-inline-start: 2rem;
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
  color: rgb(146 64 14 / var(--tw-text-opacity));
}
.tw-text-amber-900 {
  --tw-text-opacity: 1;
  color: rgb(120 53 15 / var(--tw-text-opacity));
}
.tw-text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}
.tw-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
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
.tw-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
.tw-text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity));
}
.tw-text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
}
.tw-text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity));
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
  color: rgb(239 68 68 / var(--tw-text-opacity));
}
.tw-text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity));
}
.tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}
.tw-text-slate-900 {
  --tw-text-opacity: 1;
  color: rgb(15 23 42 / var(--tw-text-opacity));
}
.tw-text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.tw-text-yellow-900 {
  --tw-text-opacity: 1;
  color: rgb(113 63 18 / var(--tw-text-opacity));
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
.tw-opacity-50 {
  opacity: 0.5;
}
.tw-opacity-60 {
  opacity: 0.6;
}
.tw-opacity-70 {
  opacity: 0.7;
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
.tw-ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background));
}
.tw-transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
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
.tw-ease-in-out {
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
.tw-duration-200 {
  animation-duration: 200ms;
}
.tw-duration-300 {
  animation-duration: 300ms;
}
.tw-ease-in-out {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/tailwind.scss */

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

.placeholder\\:tw-text-muted-foreground::placeholder {
  color: hsl(var(--muted-foreground));
}

.hover\\:tw-border-blue-600:hover {
  --tw-border-opacity: 1;
  border-color: rgb(37 99 235 / var(--tw-border-opacity));
}

.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
}

.hover\\:tw-bg-blue-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
}

.hover\\:tw-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}

.hover\\:tw-bg-gray-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity));
}

.hover\\:tw-bg-muted:hover {
  background-color: hsl(var(--muted));
}

.hover\\:tw-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
}

.hover\\:tw-bg-primary\\/90:hover {
  background-color: hsl(var(--primary) / 0.9);
}

.hover\\:tw-bg-secondary\\/80:hover {
  background-color: hsl(var(--secondary) / 0.8);
}

.hover\\:tw-bg-white:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.hover\\:tw-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}

.hover\\:tw-text-blue-600:hover {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}

.hover\\:tw-text-foreground:hover {
  color: hsl(var(--foreground));
}

.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}

.hover\\:tw-text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.hover\\:tw-underline:hover {
  text-decoration-line: underline;
}

.hover\\:tw-opacity-100:hover {
  opacity: 1;
}

.focus\\:tw-bg-accent:focus {
  background-color: hsl(var(--accent));
}

.focus\\:tw-text-accent-foreground:focus {
  color: hsl(var(--accent-foreground));
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
  --tw-ring-color: hsl(240 5% 64.9% / var(--tw-ring-opacity));
}

.focus-visible\\:tw-ring-ring:focus-visible {
  --tw-ring-color: hsl(var(--ring));
}

.focus-visible\\:tw-ring-offset-2:focus-visible {
  --tw-ring-offset-width: 2px;
}

.focus-visible\\:tw-ring-offset-background:focus-visible {
  --tw-ring-offset-color: hsl(var(--background));
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

.tw-group:hover .group-hover\\:tw-opacity-100 {
  opacity: 1;
}

.tw-peer:disabled ~ .peer-disabled\\:tw-cursor-not-allowed {
  cursor: not-allowed;
}

.tw-peer:disabled ~ .peer-disabled\\:tw-opacity-70 {
  opacity: 0.7;
}

.data-\\[disabled\\=true\\]\\:tw-pointer-events-none[data-disabled=true] {
  pointer-events: none;
}

.data-\\[disabled\\]\\:tw-pointer-events-none[data-disabled] {
  pointer-events: none;
}

.data-\\[side\\=bottom\\]\\:tw-translate-y-1[data-side=bottom] {
  --tw-translate-y: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[side\\=left\\]\\:tw--translate-x-1[data-side=left] {
  --tw-translate-x: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[side\\=right\\]\\:tw-translate-x-1[data-side=right] {
  --tw-translate-x: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[side\\=top\\]\\:tw--translate-y-1[data-side=top] {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[state\\=checked\\]\\:tw-translate-x-5[data-state=checked] {
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[state\\=unchecked\\]\\:tw-translate-x-0[data-state=unchecked] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[highlighted\\]\\:tw-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
}

.data-\\[selected\\=true\\]\\:tw-bg-accent[data-selected=true] {
  background-color: hsl(var(--accent));
}

.data-\\[state\\=active\\]\\:tw-bg-background[data-state=active] {
  background-color: hsl(var(--background));
}

.data-\\[state\\=checked\\]\\:tw-bg-primary[data-state=checked] {
  background-color: hsl(var(--primary));
}

.data-\\[state\\=on\\]\\:tw-bg-accent[data-state=on] {
  background-color: hsl(var(--accent));
}

.data-\\[state\\=open\\]\\:tw-bg-accent[data-state=open] {
  background-color: hsl(var(--accent));
}

.data-\\[state\\=selected\\]\\:tw-bg-muted[data-state=selected] {
  background-color: hsl(var(--muted));
}

.data-\\[state\\=unchecked\\]\\:tw-bg-input[data-state=unchecked] {
  background-color: hsl(var(--input));
}

.data-\\[selected\\=true\\]\\:tw-text-accent-foreground[data-selected=true] {
  color: hsl(var(--accent-foreground));
}

.data-\\[state\\=active\\]\\:tw-text-foreground[data-state=active] {
  color: hsl(var(--foreground));
}

.data-\\[state\\=checked\\]\\:tw-text-primary-foreground[data-state=checked] {
  color: hsl(var(--primary-foreground));
}

.data-\\[state\\=on\\]\\:tw-text-accent-foreground[data-state=on] {
  color: hsl(var(--accent-foreground));
}

.data-\\[state\\=open\\]\\:tw-text-muted-foreground[data-state=open] {
  color: hsl(var(--muted-foreground));
}

.data-\\[disabled\\=true\\]\\:tw-opacity-50[data-disabled=true] {
  opacity: 0.5;
}

.data-\\[disabled\\]\\:tw-opacity-50[data-disabled] {
  opacity: 0.5;
}

.data-\\[state\\=active\\]\\:tw-shadow-sm[data-state=active] {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.data-\\[state\\=open\\]\\:tw-animate-in[data-state=open] {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}

.data-\\[state\\=closed\\]\\:tw-animate-out[data-state=closed] {
  animation-name: exit;
  animation-duration: 150ms;
  --tw-exit-opacity: initial;
  --tw-exit-scale: initial;
  --tw-exit-rotate: initial;
  --tw-exit-translate-x: initial;
  --tw-exit-translate-y: initial;
}

.data-\\[state\\=closed\\]\\:tw-fade-out-0[data-state=closed] {
  --tw-exit-opacity: 0;
}

.data-\\[state\\=open\\]\\:tw-fade-in-0[data-state=open] {
  --tw-enter-opacity: 0;
}

.data-\\[state\\=closed\\]\\:tw-zoom-out-95[data-state=closed] {
  --tw-exit-scale: .95;
}

.data-\\[state\\=open\\]\\:tw-zoom-in-95[data-state=open] {
  --tw-enter-scale: .95;
}

.data-\\[side\\=bottom\\]\\:tw-slide-in-from-top-2[data-side=bottom] {
  --tw-enter-translate-y: -0.5rem;
}

.data-\\[side\\=left\\]\\:tw-slide-in-from-right-2[data-side=left] {
  --tw-enter-translate-x: 0.5rem;
}

.data-\\[side\\=right\\]\\:tw-slide-in-from-left-2[data-side=right] {
  --tw-enter-translate-x: -0.5rem;
}

.data-\\[side\\=top\\]\\:tw-slide-in-from-bottom-2[data-side=top] {
  --tw-enter-translate-y: 0.5rem;
}

.data-\\[state\\=closed\\]\\:tw-slide-out-to-left-1\\/2[data-state=closed] {
  --tw-exit-translate-x: -50%;
}

.data-\\[state\\=closed\\]\\:tw-slide-out-to-top-\\[48\\%\\][data-state=closed] {
  --tw-exit-translate-y: -48%;
}

.data-\\[state\\=open\\]\\:tw-slide-in-from-left-1\\/2[data-state=open] {
  --tw-enter-translate-x: -50%;
}

.data-\\[state\\=open\\]\\:tw-slide-in-from-top-\\[48\\%\\][data-state=open] {
  --tw-enter-translate-y: -48%;
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

  .sm\\:tw-text-left {
    text-align: left;
  }
}

@media (min-width: 768px) {

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

.\\[\\&\\>svg\\]\\:tw-text-destructive>svg {
  color: hsl(var(--destructive));
}

.\\[\\&\\>svg\\]\\:tw-text-foreground>svg {
  color: hsl(var(--foreground));
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
