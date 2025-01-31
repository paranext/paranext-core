"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const a=require("react/jsx-runtime"),b=require("react"),K=require("lucide-react"),at=require("clsx"),vl=require("tailwind-merge"),ss=require("@radix-ui/react-dropdown-menu"),J=require("platform-bible-utils"),Xt=require("@radix-ui/react-slot"),Yt=require("class-variance-authority"),xl=require("@radix-ui/react-label"),yl=require("@radix-ui/react-radio-group"),Nl=require("@radix-ui/react-popover"),Oe=require("cmdk"),kl=require("@radix-ui/react-dialog"),Se=require("@tanstack/react-table"),Sl=require("@radix-ui/react-select"),jl=require("@radix-ui/react-checkbox"),El=require("@radix-ui/react-toggle-group"),Cl=require("@radix-ui/react-toggle"),Tl=require("@radix-ui/react-tabs"),Rl=require("@radix-ui/react-separator"),Ol=require("@radix-ui/react-tooltip"),Ur=require("@mui/styled-engine"),Ae=require("@mui/material"),cn=require("react-dom"),is=require("sonner"),_l=require("@radix-ui/react-slider"),Pl=require("@radix-ui/react-switch"),Il=require("markdown-to-jsx");function ke(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const A=ke(b),we=ke(ss),ls=ke(xl),vn=ke(yl),xn=ke(Nl),Ye=ke(kl),ge=ke(Sl),qr=ke(jl),or=ke(El),cs=ke(Cl),_e=ke(Tl),ds=ke(Rl),jn=ke(Ol),$l=ke(cn),dn=ke(_l),Hr=ke(Pl);const Ml=vl.extendTailwindMerge({prefix:"tw-"});function N(...e){return Ml(at.clsx(e))}const Ct=b.forwardRef(({className:e,type:t,...n},r)=>a.jsx("input",{type:t,className:N("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),ref:r,...n}));Ct.displayName="Input";const Al="layoutDirection";function xe(){const e=localStorage.getItem(Al);return e==="rtl"?e:"ltr"}const Dl=b.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},s)=>{const i=xe();return a.jsxs("div",{className:"tw-relative",children:[a.jsx(Ct,{...o,type:"text",className:N("tw-box-border tw-w-[200px] tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-9 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none"),onChange:l=>e(l.target.value),onKeyDown:l=>{l.key==="Enter"&&r(),t(l)},onClick:n,ref:s}),a.jsx(K.History,{className:N("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-muted-foreground",{"tw-right-3":i==="ltr"},{"tw-left-3 tw-right-auto":i==="rtl"}),onClick:()=>{console.log("back in history")}})]})}),ar=we.Root,so=we.Trigger,us=we.Group,Bl=we.Portal,zl=we.Sub,Vl=we.RadioGroup,ps=b.forwardRef(({className:e,inset:t,children:n,...r},o)=>a.jsxs(we.SubTrigger,{ref:o,className:N("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",t&&"tw-pl-8",e),...r,children:[n,a.jsx(K.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));ps.displayName=we.SubTrigger.displayName;const ws=b.forwardRef(({className:e,...t},n)=>a.jsx(we.SubContent,{ref:n,className:N("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));ws.displayName=we.SubContent.displayName;const En=b.forwardRef(({className:e,sideOffset:t=4,children:n,...r},o)=>{const s=xe();return a.jsx(we.Portal,{children:a.jsx(we.Content,{ref:o,sideOffset:t,className:N("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...r,children:a.jsx("div",{dir:s,children:n})})})});En.displayName=we.Content.displayName;const io=b.forwardRef(({className:e,inset:t,...n},r)=>{const o=xe();return a.jsx(we.Item,{ref:r,className:N("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e),...n,dir:o})});io.displayName=we.Item.displayName;const sr=b.forwardRef(({className:e,children:t,checked:n,...r},o)=>a.jsxs(we.CheckboxItem,{ref:o,className:N("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),checked:n,...r,children:[a.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:a.jsx(we.ItemIndicator,{children:a.jsx(K.Check,{className:"tw-h-4 tw-w-4"})})}),t]}));sr.displayName=we.CheckboxItem.displayName;const lo=b.forwardRef(({className:e,children:t,...n},r)=>a.jsxs(we.RadioItem,{ref:r,className:N("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[a.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:a.jsx(we.ItemIndicator,{children:a.jsx(K.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]}));lo.displayName=we.RadioItem.displayName;const Wt=b.forwardRef(({className:e,inset:t,...n},r)=>a.jsx(we.Label,{ref:r,className:N("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...n}));Wt.displayName=we.Label.displayName;const Cn=b.forwardRef(({className:e,...t},n)=>a.jsx(we.Separator,{ref:n,className:N("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Cn.displayName=we.Separator.displayName;function fs({className:e,...t}){return a.jsx("span",{className:N("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",e),...t})}fs.displayName="DropdownMenuShortcut";var Fl=Object.defineProperty,Ll=(e,t,n)=>t in e?Fl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ne=(e,t,n)=>Ll(e,typeof t!="symbol"?t+"":t,n);const xt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],co=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ms=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],ua=Zl();function Kt(e,t=!0){return t&&(e=e.toUpperCase()),e in ua?ua[e]:0}function uo(e){return Kt(e)>0}function Gl(e){const t=typeof e=="string"?Kt(e):e;return t>=40&&t<=66}function Ul(e){return(typeof e=="string"?Kt(e):e)<=39}function hs(e){return e<=66}function ql(e){const t=typeof e=="string"?Kt(e):e;return vs(t)&&!hs(t)}function*Hl(){for(let e=1;e<=xt.length;e++)yield e}const Xl=1,gs=xt.length;function Yl(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function po(e,t="***"){const n=e-1;return n<0||n>=xt.length?t:xt[n]}function bs(e){return e<=0||e>gs?"******":ms[e-1]}function Wl(e){return bs(Kt(e))}function vs(e){const t=typeof e=="number"?po(e):e;return uo(t)&&!co.includes(t)}function Kl(e){const t=typeof e=="number"?po(e):e;return uo(t)&&co.includes(t)}function Jl(e){return ms[e-1].includes("*obsolete*")}function Zl(){const e={};for(let t=0;t<xt.length;t++)e[xt[t]]=t+1;return e}const ae={allBookIds:xt,nonCanonicalIds:co,bookIdToNumber:Kt,isBookIdValid:uo,isBookNT:Gl,isBookOT:Ul,isBookOTNT:hs,isBookDC:ql,allBookNumbers:Hl,firstBook:Xl,lastBook:gs,extraBooks:Yl,bookNumberToId:po,bookNumberToEnglishName:bs,bookIdToEnglishName:Wl,isCanonical:vs,isExtraMaterial:Kl,isObsolete:Jl};var He=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(He||{});const Ie=class{constructor(t){if(ne(this,"name"),ne(this,"fullPath"),ne(this,"isPresent"),ne(this,"hasVerseSegments"),ne(this,"isCustomized"),ne(this,"baseVersification"),ne(this,"scriptureBooks"),ne(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=He[t]):(this._type=t,this.name=He[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ne(Ie,"Original",new Ie(He.Original)),ne(Ie,"Septuagint",new Ie(He.Septuagint)),ne(Ie,"Vulgate",new Ie(He.Vulgate)),ne(Ie,"English",new Ie(He.English)),ne(Ie,"RussianProtestant",new Ie(He.RussianProtestant)),ne(Ie,"RussianOrthodox",new Ie(He.RussianOrthodox));let ft=Ie;function pa(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var xs=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(xs||{});const Ee=class re{constructor(t,n,r,o){if(ne(this,"firstChapter"),ne(this,"lastChapter"),ne(this,"lastVerse"),ne(this,"hasSegmentsDefined"),ne(this,"text"),ne(this,"BBBCCCVVVS"),ne(this,"longHashCode"),ne(this,"versification"),ne(this,"rtlMark","‏"),ne(this,"_bookNum",0),ne(this,"_chapterNum",0),ne(this,"_verseNum",0),ne(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const s=t,i=n!=null&&n instanceof ft?n:void 0;this.setEmpty(i),this.parse(s)}else if(t!=null&&typeof t=="number"){const s=n!=null&&n instanceof ft?n:void 0;this.setEmpty(s),this._verseNum=t%re.chapterDigitShifter,this._chapterNum=Math.floor(t%re.bookDigitShifter/re.chapterDigitShifter),this._bookNum=Math.floor(t/re.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof re){const s=t;this._bookNum=s.bookNum,this._chapterNum=s.chapterNum,this._verseNum=s.verseNum,this._verse=s.verse,this.versification=s.versification}else{if(t==null)return;const s=t instanceof ft?t:re.defaultVersification;this.setEmpty(s)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??re.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new re(t),{success:!0,verseRef:n}}catch(r){if(r instanceof rn)return n=new re,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%re.bcvMaxValue*re.bookDigitShifter+(n>=0?n%re.bcvMaxValue*re.chapterDigitShifter:0)+(r>=0?r%re.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:s,versificationStr:i}=t,l=s||o.toString();let c;return i&&(c=new ft(i)),n?new re(n,r.toString(),l,c):new re}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>re.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(re.verseRangeSeparator)||this._verse.includes(re.verseSequenceIndicator))}get book(){return ae.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=ae.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=re.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=re.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>ae.lastBook)throw new rn("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new ft(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(re.verseRangeSeparators,re.verseSequenceIndicators)}get BBBCCC(){return re.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return re.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const s=t.split("/");if(t=s[0],s.length>1)try{const i=+s[1].trim();this.versification=new ft(He[i])}catch{throw new rn("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new rn("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||ae.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!re.isVerseParseable(r[1]))throw new rn("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new re(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete n.verse,n}equals(t){return t instanceof re?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=re.verseRangeSeparators,r=re.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],s=pa(this._verse,r);for(const i of s.map(l=>pa(l,n))){const l=this.clone();l.verse=i[0];const c=l.verseNum;if(o.push(l),i.length>1){const d=this.clone();if(d.verse=i[1],!t)for(let u=c+1;u<d.verseNum;u++){const f=new re(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||o.push(f)}o.push(d)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const s=o.internalValid;if(s!==0)return s;const i=o.BBBCCCVVV;if(r>i)return 3;if(r===i)return 4;r=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ae.lastBook?2:(ae.isCanonical(this._bookNum),0)}setEmpty(t=re.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=ae.bookIdToNumber(t),this.chapter=n,this.verse=r}};ne(Ee,"defaultVersification",ft.English),ne(Ee,"verseRangeSeparator","-"),ne(Ee,"verseSequenceIndicator",","),ne(Ee,"verseRangeSeparators",[Ee.verseRangeSeparator]),ne(Ee,"verseSequenceIndicators",[Ee.verseSequenceIndicator]),ne(Ee,"chapterDigitShifter",1e3),ne(Ee,"bookDigitShifter",Ee.chapterDigitShifter*Ee.chapterDigitShifter),ne(Ee,"bcvMaxValue",Ee.chapterDigitShifter-1),ne(Ee,"ValidStatusType",xs);class rn extends Error{}const Ql=b.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:s,children:i},l)=>a.jsxs(io,{ref:l,textValue:e,className:N("tw-mx-1 tw-flex-col tw-items-start tw-px-1 tw-font-normal tw-text-foreground/80",{"tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[a.jsx("span",{className:N("tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",{"tw-font-bold":n,"tw-border-s-red-200":s.toLowerCase()==="ot","tw-border-s-purple-200":s.toLowerCase()==="nt","tw-border-s-indigo-200":s.toLowerCase()==="dc"}),children:ae.bookIdToEnglishName(e)}),n&&a.jsx("div",{children:i})]},e));function ec({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const s=Array.from({length:t},(l,c)=>c+1),i=b.useCallback(l=>{o(l)},[o]);return a.jsx("div",{className:N("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"),children:s.map(l=>a.jsx("div",{className:N("tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",{"tw-font-semibold tw-text-amber-900":l===n,"tw-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>i(l),children:l},l))})}function tc({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return a.jsxs(Wt,{className:"tw-flex tw-justify-between",children:[a.jsx("p",{className:"tw-inline-block tw-align-middle",children:"Go To"}),a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(K.ArrowDownWideNarrow,{onClick:e,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"}),a.jsx(K.Clock,{onClick:t,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"}),a.jsx(K.Bookmark,{onClick:n,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"})]})]})}const fn=ae.allBookIds,nc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},wa=["OT","NT","DC"],rc=32+32+32,oc=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],ac=e=>({OT:fn.filter(n=>ae.isBookOT(n)),NT:fn.filter(n=>ae.isBookNT(n)),DC:fn.filter(n=>ae.isBookDC(n))})[e],on=e=>J.getChaptersForBook(ae.bookIdToNumber(e));function sc(){return fn.map(t=>ae.bookIdToEnglishName(t))}function ic(e){return sc().includes(e)}function lc(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(ic(t))return fn.find(r=>ae.bookIdToEnglishName(r)===t)}function cc({scrRef:e,handleSubmit:t}){const n=xe(),[r,o]=b.useState(""),[s,i]=b.useState(ae.bookNumberToId(e.bookNum)),[l,c]=b.useState(e.chapterNum??0),[d,u]=b.useState(ae.bookNumberToId(e.bookNum)),[f,w]=b.useState(!1),[g,x]=b.useState(f),m=b.useRef(void 0),h=b.useRef(void 0),k=b.useRef(void 0),j=b.useCallback(P=>ac(P).filter($=>{const q=ae.bookIdToEnglishName($).toLowerCase(),L=r.replace(/[^a-zA-Z]/g,"").toLowerCase();return q.includes(L)||$.toLowerCase().includes(L)}),[r]),E=P=>{o(P)},S=b.useRef(!1),v=b.useCallback(P=>{if(S.current){S.current=!1;return}w(P)},[]),R=b.useCallback((P,$,q,L)=>{if(c(ae.bookNumberToId(e.bookNum)!==P?1:e.chapterNum),$||on(P)===-1){t({bookNum:ae.bookIdToNumber(P),chapterNum:q||1,verseNum:L||1}),w(!1),o("");return}i(s!==P?P:""),w(!$)},[t,e.bookNum,e.chapterNum,s]),V=P=>{P<=0||P>on(s)||R(s,!0,P)},T=b.useCallback(()=>{oc.forEach(P=>{const $=r.match(P);if($){const[q,L=void 0,D=void 0]=$.slice(1),Q=lc(q);(ae.isBookIdValid(q)||Q)&&R(Q??q,!0,L?parseInt(L,10):1,D?parseInt(D,10):1)}})},[R,r]),_=b.useCallback(P=>{f?(P.key==="ArrowDown"||P.key==="ArrowUp")&&(typeof k<"u"&&k.current!==null?k.current.focus():typeof h<"u"&&h.current!==null&&h.current.focus(),P.preventDefault()):w(!0)},[f]),F=P=>{const{key:$}=P;$==="ArrowRight"||$==="ArrowLeft"||$==="ArrowDown"||$==="ArrowUp"||$==="Enter"||(m.current.dispatchEvent(new KeyboardEvent("keydown",{key:$})),m.current.focus())},M=P=>{const{key:$}=P;if(d===s){if($==="Enter"){P.preventDefault(),R(s,!0,l);return}const q=$==="ArrowRight"&&!n||$==="ArrowRight"&&n==="ltr"||$==="ArrowLeft"&&n==="rtl",L=$==="ArrowLeft"&&!n||$==="ArrowLeft"&&n==="ltr"||$==="ArrowRight"&&n==="rtl";let D=0;if(q)if(l<on(d))D=1;else{P.preventDefault();return}else if(L)if(l>1)D=-1;else{P.preventDefault();return}else $==="ArrowDown"?D=6:$==="ArrowUp"&&(D=-6);l+D<=0||l+D>on(d)?c(0):D!==0&&(c(l+D),P.preventDefault())}};return b.useEffect(()=>{s===d?s===ae.bookNumberToId(e.bookNum)?c(e.chapterNum):c(1):c(0)},[d,e.bookNum,e.chapterNum,s]),b.useLayoutEffect(()=>{x(f)},[f]),b.useLayoutEffect(()=>{const P=setTimeout(()=>{if(g&&h.current&&k.current){const q=k.current.offsetTop-rc;h.current.scrollTo({top:q,behavior:"instant"})}},10);return()=>{clearTimeout(P)}},[g]),a.jsx("div",{className:"pr-twp tw-flex",children:a.jsxs(ar,{modal:!1,open:f,onOpenChange:v,children:[a.jsx(so,{asChild:!0,children:a.jsx(Dl,{ref:m,value:r,handleSearch:E,handleKeyDown:_,handleOnClick:()=>{i(ae.bookNumberToId(e.bookNum)),u(ae.bookNumberToId(e.bookNum)),c(e.chapterNum>0?e.chapterNum:0),w(!0),m.current.focus()},onFocus:()=>{S.current=!0},handleSubmit:T,placeholder:`${ae.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),a.jsx(En,{className:"tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},onKeyDown:F,align:n==="ltr"?"start":"end",ref:h,children:a.jsxs("div",{className:"rtl:tw-ps-2",children:[a.jsx(tc,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),wa.map((P,$)=>j(P).length>0&&a.jsxs("div",{children:[a.jsx(Wt,{className:"tw-font-semibold tw-text-foreground/80",children:nc[P]}),j(P).map(q=>a.jsx("div",{children:a.jsx(Ql,{bookId:q,handleSelectBook:()=>R(q,!1),isSelected:s===q,handleHighlightBook:()=>u(q),handleKeyDown:M,bookType:P,ref:L=>{s===q&&(k.current=L)},children:a.jsx(ec,{handleSelectChapter:V,endChapter:on(q),activeChapter:e.bookNum===ae.bookIdToNumber(q)?e.chapterNum:0,highlightedChapter:l,handleHighlightedChapter:L=>{c(L)}})})},q)),wa.length-1!==$?a.jsx(Cn,{}):void 0]},P))]})})]})})}const ys=Yt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),pe=b.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},s)=>{const i=r?Xt.Slot:"button";return a.jsx(i,{className:N(ys({variant:t,size:n,className:e})),ref:s,...o})});pe.displayName="Button";const dc=Yt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),Ce=b.forwardRef(({className:e,...t},n)=>a.jsx(ls.Root,{ref:n,className:N("pr-twp",dc(),e),...t}));Ce.displayName=ls.Root.displayName;const wo=b.forwardRef(({className:e,...t},n)=>{const r=xe();return a.jsx(vn.Root,{className:N("pr-twp tw-grid tw-gap-2",e),...t,ref:n,dir:r})});wo.displayName=vn.Root.displayName;const Wn=b.forwardRef(({className:e,...t},n)=>a.jsx(vn.Item,{ref:n,className:N("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t,children:a.jsx(vn.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:a.jsx(K.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Wn.displayName=vn.Item.displayName;const fo=xn.Root,mo=xn.Trigger,ir=b.forwardRef(({className:e,align:t="center",sideOffset:n=4,...r},o)=>a.jsx(xn.Portal,{children:a.jsx(xn.Content,{ref:o,align:t,sideOffset:n,className:N("pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...r})}));ir.displayName=xn.Content.displayName;const uc=Ye.Portal,Ns=b.forwardRef(({className:e,...t},n)=>a.jsx(Ye.Overlay,{ref:n,className:N("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",e),...t}));Ns.displayName=Ye.Overlay.displayName;const pc=b.forwardRef(({className:e,children:t,...n},r)=>{const o=xe();return a.jsxs(uc,{children:[a.jsx(Ns,{}),a.jsxs(Ye.Content,{ref:r,className:N("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",e),...n,dir:o,children:[t,a.jsxs(Ye.Close,{className:N("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":o==="ltr"},{"tw-left-4":o==="rtl"}),children:[a.jsx(K.X,{className:"tw-h-4 tw-w-4"}),a.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});pc.displayName=Ye.Content.displayName;const wc=b.forwardRef(({className:e,...t},n)=>a.jsx(Ye.Title,{ref:n,className:N("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));wc.displayName=Ye.Title.displayName;const fc=b.forwardRef(({className:e,...t},n)=>a.jsx(Ye.Description,{ref:n,className:N("tw-text-sm tw-text-muted-foreground",e),...t}));fc.displayName=Ye.Description.displayName;const ho=b.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command,{ref:n,className:N("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",e),...t}));ho.displayName=Oe.Command.displayName;const go=b.forwardRef(({className:e,...t},n)=>{const r=xe();return a.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:r,children:[a.jsx(K.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),a.jsx(Oe.Command.Input,{ref:n,className:N("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t})]})});go.displayName=Oe.Command.Input.displayName;const bo=b.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command.List,{ref:n,className:N("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",e),...t}));bo.displayName=Oe.Command.List.displayName;const vo=b.forwardRef((e,t)=>a.jsx(Oe.Command.Empty,{ref:t,className:"tw-py-6 tw-text-center tw-text-sm",...e}));vo.displayName=Oe.Command.Empty.displayName;const ks=b.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command.Group,{ref:n,className:N("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",e),...t}));ks.displayName=Oe.Command.Group.displayName;const mc=b.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command.Separator,{ref:n,className:N("tw--mx-1 tw-h-px tw-bg-border",e),...t}));mc.displayName=Oe.Command.Separator.displayName;const xo=b.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command.Item,{ref:n,className:N("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",e),...t}));xo.displayName=Oe.Command.Item.displayName;function hc(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function Kn({id:e,options:t=[],className:n,buttonClassName:r,popoverContentClassName:o,value:s,onChange:i=()=>{},getOptionLabel:l=hc,icon:c=void 0,buttonPlaceholder:d="",textPlaceholder:u="",commandEmptyMessage:f="No option found",buttonVariant:w="outline",alignDropDown:g="start",isDisabled:x=!1,...m}){const[h,k]=b.useState(!1);return a.jsxs(fo,{open:h,onOpenChange:k,...m,children:[a.jsx(mo,{asChild:!0,children:a.jsxs(pe,{variant:w,role:"combobox","aria-expanded":h,id:e,className:N("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",r??n),disabled:x,children:[a.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[c&&a.jsx("div",{className:"tw-pe-2",children:c}),a.jsx("span",{className:"tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:s?l(s):d})]}),a.jsx(K.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),a.jsx(ir,{align:g,className:N("tw-w-[200px] tw-p-0",o),children:a.jsxs(ho,{children:[a.jsx(go,{placeholder:u,className:"tw-text-inherit"}),a.jsx(vo,{children:f}),a.jsx(bo,{children:t.map(j=>a.jsxs(xo,{value:l(j),onSelect:()=>{i(j),k(!1)},children:[a.jsx(K.Check,{className:N("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!s||l(s)!==l(j)})}),l(j)]},l(j)))})]})})]})}function Ss({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o=!1,chapterCount:s}){const i=b.useMemo(()=>Array.from({length:s},(d,u)=>u+1),[s]),l=d=>{n(d),d>t&&r(d)},c=d=>{r(d),d<e&&n(d)};return a.jsxs(a.Fragment,{children:[a.jsx(Ce,{htmlFor:"start-chapters-combobox",children:"Chapters"}),a.jsx(Kn,{isDisabled:o,onChange:l,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:e},"start chapter"),a.jsx(Ce,{htmlFor:"end-chapters-combobox",children:"to"}),a.jsx(Kn,{isDisabled:o,onChange:c,buttonClassName:"tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:t},"end chapter")]})}var js=(e=>(e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books",e))(js||{});const gc=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Or=(e,t)=>e[t]??t;function bc({handleBookSelectionModeChange:e,currentBookName:t,onSelectBooks:n,selectedBookIds:r,chapterCount:o,endChapter:s,handleSelectEndChapter:i,startChapter:l,handleSelectStartChapter:c,localizedStrings:d}){const u=Or(d,"%webView_bookSelector_currentBook%"),f=Or(d,"%webView_bookSelector_choose%"),w=Or(d,"%webView_bookSelector_chooseBooks%"),[g,x]=b.useState("current book"),m=h=>{x(h),e(h)};return a.jsx(wo,{className:"pr-twp tw-flex",value:g,onValueChange:h=>m(h),children:a.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[a.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(Wn,{value:"current book"}),a.jsx(Ce,{className:"tw-ms-1",children:u})]}),a.jsx(Ce,{className:"tw-flex tw-items-center",children:t}),a.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:a.jsx(Ss,{isDisabled:g==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:i,chapterCount:o,startChapter:l,endChapter:s})})]}),a.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(Wn,{value:"choose books"}),a.jsx(Ce,{className:"tw-ms-1",children:w})]}),a.jsx(Ce,{className:"tw-flex tw-items-center",children:r.map(h=>ae.bookIdToEnglishName(h)).join(", ")}),a.jsx(pe,{disabled:g==="current book",onClick:()=>n(),children:f})]})]})})}function vc({table:e}){return a.jsxs(ar,{children:[a.jsx(ss.DropdownMenuTrigger,{asChild:!0,children:a.jsxs(pe,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[a.jsx(K.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),a.jsxs(En,{align:"end",className:"tw-w-[150px]",children:[a.jsx(Wt,{children:"Toggle columns"}),a.jsx(Cn,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>a.jsx(sr,{className:"tw-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}const yt=ge.Root,Es=ge.Group,Nt=ge.Value,it=b.forwardRef(({className:e,children:t,...n},r)=>{const o=xe();return a.jsxs(ge.Trigger,{ref:r,className:N("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",e),...n,dir:o,children:[t,a.jsx(ge.Icon,{asChild:!0,children:a.jsx(K.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});it.displayName=ge.Trigger.displayName;const yo=b.forwardRef(({className:e,...t},n)=>a.jsx(ge.ScrollUpButton,{ref:n,className:N("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:a.jsx(K.ChevronUp,{className:"tw-h-4 tw-w-4"})}));yo.displayName=ge.ScrollUpButton.displayName;const No=b.forwardRef(({className:e,...t},n)=>a.jsx(ge.ScrollDownButton,{ref:n,className:N("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:a.jsx(K.ChevronDown,{className:"tw-h-4 tw-w-4"})}));No.displayName=ge.ScrollDownButton.displayName;const lt=b.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>{const s=xe();return a.jsx(ge.Portal,{children:a.jsxs(ge.Content,{ref:o,className:N("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",e),position:n,...r,children:[a.jsx(yo,{}),a.jsx(ge.Viewport,{className:N("tw-p-1",n==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:a.jsx("div",{dir:s,children:t})}),a.jsx(No,{})]})})});lt.displayName=ge.Content.displayName;const Cs=b.forwardRef(({className:e,...t},n)=>a.jsx(ge.Label,{ref:n,className:N("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",e),...t}));Cs.displayName=ge.Label.displayName;const $e=b.forwardRef(({className:e,children:t,...n},r)=>a.jsxs(ge.Item,{ref:r,className:N("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[a.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:a.jsx(ge.ItemIndicator,{children:a.jsx(K.Check,{className:"tw-h-4 tw-w-4"})})}),a.jsx(ge.ItemText,{children:t})]}));$e.displayName=ge.Item.displayName;const Ts=b.forwardRef(({className:e,...t},n)=>a.jsx(ge.Separator,{ref:n,className:N("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Ts.displayName=ge.Separator.displayName;function xc({table:e}){return a.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[a.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[a.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),a.jsxs(yt,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[a.jsx(it,{className:"tw-h-8 tw-w-[70px]",children:a.jsx(Nt,{placeholder:e.getState().pagination.pageSize})}),a.jsx(lt,{side:"top",children:[10,20,30,40,50].map(t=>a.jsx($e,{value:`${t}`,children:t},t))})]})]}),a.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[a.jsxs(pe,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),a.jsx(K.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(pe,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),a.jsx(K.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(pe,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),a.jsx(K.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(pe,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),a.jsx(K.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Tn=b.forwardRef(({className:e,stickyHeader:t,...n},r)=>a.jsx("div",{className:N("pr-twp tw-relative tw-w-full",{"tw-overflow-auto":!t}),children:a.jsx("table",{ref:r,className:N("tw-w-full tw-caption-bottom tw-text-sm",e),...n})}));Tn.displayName="Table";const Rn=b.forwardRef(({className:e,stickyHeader:t,...n},r)=>a.jsx("thead",{ref:r,className:N({"tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm":t},"[&_tr]:tw-border-b",e),...n}));Rn.displayName="TableHeader";const On=b.forwardRef(({className:e,...t},n)=>a.jsx("tbody",{ref:n,className:N("[&_tr:last-child]:tw-border-0",e),...t}));On.displayName="TableBody";const Rs=b.forwardRef(({className:e,...t},n)=>a.jsx("tfoot",{ref:n,className:N("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",e),...t}));Rs.displayName="TableFooter";const Qe=b.forwardRef(({className:e,...t},n)=>a.jsx("tr",{ref:n,className:N("tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",e),...t}));Qe.displayName="TableRow";const Vt=b.forwardRef(({className:e,...t},n)=>a.jsx("th",{ref:n,className:N("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",e),...t}));Vt.displayName="TableHead";const kt=b.forwardRef(({className:e,...t},n)=>a.jsx("td",{ref:n,className:N("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",e),...t}));kt.displayName="TableCell";const Os=b.forwardRef(({className:e,...t},n)=>a.jsx("caption",{ref:n,className:N("tw-mt-4 tw-text-sm tw-text-muted-foreground",e),...t}));Os.displayName="TableCaption";function _s({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,stickyHeader:s=!1,onRowClickHandler:i=()=>{}}){var h;const[l,c]=b.useState([]),[d,u]=b.useState([]),[f,w]=b.useState({}),[g,x]=b.useState({}),m=Se.useReactTable({data:t,columns:e,getCoreRowModel:Se.getCoreRowModel(),...n&&{getPaginationRowModel:Se.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:Se.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:Se.getFilteredRowModel(),onColumnVisibilityChange:w,onRowSelectionChange:x,state:{sorting:l,columnFilters:d,columnVisibility:f,rowSelection:g}});return a.jsxs("div",{className:"pr-twp",children:[o&&a.jsx(vc,{table:m}),a.jsxs(Tn,{stickyHeader:s,children:[a.jsx(Rn,{stickyHeader:s,children:m.getHeaderGroups().map(k=>a.jsx(Qe,{children:k.headers.map(j=>a.jsx(Vt,{children:j.isPlaceholder?void 0:Se.flexRender(j.column.columnDef.header,j.getContext())},j.id))},k.id))}),a.jsx(On,{children:(h=m.getRowModel().rows)!=null&&h.length?m.getRowModel().rows.map(k=>a.jsx(Qe,{onClick:()=>i(k,m),"data-state":k.getIsSelected()&&"selected",children:k.getVisibleCells().map(j=>a.jsx(kt,{children:Se.flexRender(j.column.columnDef.cell,j.getContext())},j.id))},k.id)):a.jsx(Qe,{children:a.jsx(kt,{colSpan:e.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),n&&a.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[a.jsx(pe,{variant:"outline",size:"sm",onClick:()=>m.previousPage(),disabled:!m.getCanPreviousPage(),children:"Previous"}),a.jsx(pe,{variant:"outline",size:"sm",onClick:()=>m.nextPage(),disabled:!m.getCanNextPage(),children:"Next"})]}),n&&r&&a.jsx(xc,{table:m})]})}function yc({occurrenceData:e,setScriptureReference:t,localizedStrings:n}){const r=n["%webView_inventory_occurrences_table_header_reference%"],o=n["%webView_inventory_occurrences_table_header_occurrence%"],s=b.useMemo(()=>{const i=[];return e.forEach(l=>{i.some(c=>J.deepEqual(c,l))||i.push(l)}),i},[e]);return a.jsxs(Tn,{stickyHeader:!0,children:[a.jsx(Rn,{stickyHeader:!0,children:a.jsxs(Qe,{children:[a.jsx(Vt,{children:r}),a.jsx(Vt,{children:o})]})}),a.jsx(On,{children:s.length>0&&s.map(i=>a.jsxs(Qe,{onClick:()=>{t(i.reference)},children:[a.jsx(kt,{children:`${ae.bookNumberToEnglishName(i.reference.bookNum)} ${i.reference.chapterNum}:${i.reference.verseNum}`}),a.jsx(kt,{children:i.text})]},`${i.reference.bookNum} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}const lr=b.forwardRef(({className:e,...t},n)=>a.jsx(qr.Root,{ref:n,className:N("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",e),...t,children:a.jsx(qr.Indicator,{className:N("tw-flex tw-items-center tw-justify-center tw-text-current"),children:a.jsx(K.Check,{className:"tw-h-4 tw-w-4"})})}));lr.displayName=qr.Root.displayName;const Ps=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Xr=e=>{const t=/^\\[vc]\s+(\d+)/,n=e.match(t);if(n)return+n[1]},Is=e=>{const t=e.match(/^\\id\s+([A-Za-z]+)/);return t?ae.bookIdToNumber(t[1]):0},$s=(e,t,n)=>n.includes(e)?"unapproved":t.includes(e)?"approved":"unknown",Ms=Yt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Nc=b.forwardRef(({className:e,variant:t,size:n,...r},o)=>a.jsx(cs.Root,{ref:o,className:N(Ms({variant:t,size:n,className:e})),...r}));Nc.displayName=cs.Root.displayName;const As=b.createContext({size:"default",variant:"default"}),ko=b.forwardRef(({className:e,variant:t,size:n,children:r,...o},s)=>{const i=xe();return a.jsx(or.Root,{ref:s,className:N("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",e),...o,dir:i,children:a.jsx(As.Provider,{value:{variant:t,size:n},children:r})})});ko.displayName=or.Root.displayName;const mn=b.forwardRef(({className:e,children:t,variant:n,size:r,...o},s)=>{const i=b.useContext(As);return a.jsx(or.Item,{ref:s,className:N(Ms({variant:i.variant||n,size:i.size||r}),e),...o,children:t})});mn.displayName=or.Item.displayName;const cr=e=>e==="asc"?a.jsx(K.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e==="desc"?a.jsx(K.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):a.jsx(K.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),kc=e=>({accessorKey:"item",accessorFn:t=>t.items[0],header:({column:t})=>a.jsxs(pe,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,cr(t.getIsSorted())]})}),Sc=(e,t)=>({accessorKey:`item${t}`,accessorFn:n=>n.items[t],header:({column:n})=>a.jsxs(pe,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[e,cr(n.getIsSorted())]})}),jc=e=>({accessorKey:"count",header:({column:t})=>a.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:a.jsxs(pe,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,cr(t.getIsSorted())]})}),cell:({row:t})=>a.jsx("div",{className:"tw-flex tw-justify-end",children:t.getValue("count")})}),_r=(e,t,n,r,o,s)=>{let i=[...n];e.forEach(c=>{t==="approved"?i.includes(c)||i.push(c):i=i.filter(d=>d!==c)}),r(i);let l=[...o];e.forEach(c=>{t==="unapproved"?l.includes(c)||l.push(c):l=l.filter(d=>d!==c)}),s(l)},Ec=(e,t,n,r,o)=>({accessorKey:"status",header:({column:s})=>a.jsx("div",{className:"tw-flex tw-justify-center",children:a.jsxs(pe,{variant:"ghost",onClick:()=>s.toggleSorting(void 0),children:[e,cr(s.getIsSorted())]})}),cell:({row:s})=>{const i=s.getValue("status"),l=s.getValue("item");return a.jsxs(ko,{value:i,variant:"outline",type:"single",children:[a.jsx(mn,{onClick:()=>_r([l],"approved",t,n,r,o),value:"approved",children:a.jsx(K.CircleCheckIcon,{})}),a.jsx(mn,{onClick:()=>_r([l],"unapproved",t,n,r,o),value:"unapproved",children:a.jsx(K.CircleXIcon,{})}),a.jsx(mn,{onClick:()=>_r([l],"unknown",t,n,r,o),value:"unknown",children:a.jsx(K.CircleHelpIcon,{})})]})}}),Cc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),Tc=(e,t,n)=>{let r=e;return t!=="all"&&(r=r.filter(o=>t==="approved"&&o.status==="approved"||t==="unapproved"&&o.status==="unapproved"||t==="unknown"&&o.status==="unknown")),n!==""&&(r=r.filter(o=>o.items[0].includes(n))),r},Rc=(e,t,n,r,o)=>{if(!e)return[];const s=[];let i=t.bookNum,l=t.chapterNum,c=t.verseNum;return Ps(e).forEach(u=>{u.startsWith("\\id")&&(i=Is(u),l=0,c=0),u.startsWith("\\c")&&(l=Xr(u),c=0),u.startsWith("\\v")&&(c=Xr(u),l===0&&(l=t.chapterNum));let f=o.exec(u)??void 0;for(;f;){const w=[];f.forEach(h=>w.push(h));const g=f.index,x=s.find(h=>J.deepEqual(h.items,w)),m={reference:{bookNum:i!==void 0?i:-1,chapterNum:l!==void 0?l:-1,verseNum:c!==void 0?c:-1},text:J.substring(u,Math.max(0,g-25),Math.min(g+25,u.length))};if(x)x.count+=1,x.occurrences.push(m);else{const h={items:w,count:1,status:$s(w[0],n,r),occurrences:[m]};s.push(h)}f=o.exec(u)??void 0}}),s},Ze=(e,t)=>e[t]??t;function Oc({scriptureReference:e,setScriptureReference:t,localizedStrings:n,extractItems:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:i,text:l,scope:c,onScopeChange:d,columns:u}){const f=Ze(n,"%webView_inventory_all%"),w=Ze(n,"%webView_inventory_approved%"),g=Ze(n,"%webView_inventory_unapproved%"),x=Ze(n,"%webView_inventory_unknown%"),m=Ze(n,"%webView_inventory_scope_currentBook%"),h=Ze(n,"%webView_inventory_scope_chapter%"),k=Ze(n,"%webView_inventory_scope_verse%"),j=Ze(n,"%webView_inventory_filter_text%"),E=Ze(n,"%webView_inventory_show_additional_items%"),[S,v]=b.useState(!1),[R,V]=b.useState("all"),[T,_]=b.useState(""),[F,M]=b.useState([]),P=b.useMemo(()=>l?r instanceof RegExp?Rc(l,e,s,i,r):r(l,e,s,i):[],[l,r,e,s,i]),$=b.useMemo(()=>{if(S)return P;const y=[];return P.forEach(C=>{const G=C.items[0],U=y.find(z=>z.items[0]===G);U?(U.count+=C.count,U.occurrences=U.occurrences.concat(C.occurrences)):y.push({items:[G],count:C.count,occurrences:C.occurrences,status:C.status})}),y},[S,P]),q=b.useMemo(()=>Tc($,R,T),[$,R,T]),L=b.useMemo(()=>{var G,U;if(!S)return u;const y=(G=o==null?void 0:o.tableHeaders)==null?void 0:G.length;if(!y)return u;const C=[];for(let z=0;z<y;z++)C.push(Sc(((U=o==null?void 0:o.tableHeaders)==null?void 0:U[z])||"Additional Item",z+1));return[...C,...u]},[o==null?void 0:o.tableHeaders,u,S]);b.useEffect(()=>{M([])},[q]);const D=(y,C)=>{C.setRowSelection(()=>{const G={};return G[y.index]=!0,G}),M(y.original.items)},Q=y=>{if(y==="book"||y==="chapter"||y==="verse")d(y);else throw new Error(`Invalid scope value: ${y}`)},se=y=>{if(y==="all"||y==="approved"||y==="unapproved"||y==="unknown")V(y);else throw new Error(`Invalid status filter value: ${y}`)},oe=b.useMemo(()=>{if($.length===0||F.length===0)return[];const y=$.filter(C=>J.deepEqual(S?C.items:[C.items[0]],F));if(y.length>1)throw new Error("Selected item is not unique");return y[0].occurrences},[F,S,$]);return a.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[a.jsxs("div",{className:"tw-flex tw-items-stretch",children:[a.jsxs(yt,{onValueChange:y=>se(y),defaultValue:R,children:[a.jsx(it,{className:"tw-m-1",children:a.jsx(Nt,{placeholder:"Select filter"})}),a.jsxs(lt,{children:[a.jsx($e,{value:"all",children:f}),a.jsx($e,{value:"approved",children:w}),a.jsx($e,{value:"unapproved",children:g}),a.jsx($e,{value:"unknown",children:x})]})]}),a.jsxs(yt,{onValueChange:y=>Q(y),defaultValue:c,children:[a.jsx(it,{className:"tw-m-1",children:a.jsx(Nt,{placeholder:"Select scope"})}),a.jsxs(lt,{children:[a.jsx($e,{value:"book",children:m}),a.jsx($e,{value:"chapter",children:h}),a.jsx($e,{value:"verse",children:k})]})]}),a.jsx(Ct,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:j,value:T,onChange:y=>{_(y.target.value)}}),o&&a.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[a.jsx(lr,{className:"tw-m-1",checked:S,onCheckedChange:y=>{M([]),v(y)}}),a.jsx(Ce,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??E})]})]}),a.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:a.jsx(_s,{columns:L,data:q,onRowClickHandler:D,stickyHeader:!0})}),oe.length>0&&a.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:a.jsx(yc,{occurrenceData:oe,setScriptureReference:t,localizedStrings:n})})]})}function Ds({entries:e,getEntriesCount:t=void 0,selected:n,onChange:r,placeholder:o,commandEmptyMessage:s="No entries found",customSelectedText:i,sortSelected:l=!1,icon:c=void 0,className:d=void 0}){const[u,f]=b.useState(!1),w=b.useCallback(m=>{var k;const h=(k=e.find(j=>j.label===m))==null?void 0:k.value;h&&r(n.includes(h)?n.filter(j=>j!==h):[...n,h])},[e,n,r]),g=()=>i||o,x=b.useMemo(()=>{if(!l)return e;const m=e.filter(k=>k.starred).sort((k,j)=>k.label.localeCompare(j.label)),h=e.filter(k=>!k.starred).sort((k,j)=>{const E=n.includes(k.value),S=n.includes(j.value);return E&&!S?-1:!E&&S?1:k.label.localeCompare(j.label)});return[...m,...h]},[e,n,l]);return a.jsx("div",{className:d,children:a.jsxs(fo,{open:u,onOpenChange:f,children:[a.jsx(mo,{asChild:!0,children:a.jsxs(pe,{variant:"ghost",role:"combobox","aria-expanded":u,className:N("tw-w-full tw-justify-between",n.length>0&&n.length<e.length&&"tw-border-primary","tw-group"),children:[a.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[a.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:a.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:c})}),a.jsx("div",{className:N({"tw-text-muted-foreground group-hover:tw-text-secondary-foreground":n.length===0||n.length===e.length}),children:a.jsx("div",{className:"tw-font-normal",children:g()})})]}),a.jsx(K.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),a.jsx(ir,{align:"start",className:"tw-w-full tw-p-0",children:a.jsxs(ho,{children:[a.jsx(go,{placeholder:`Search ${o.toLowerCase()}...`}),a.jsxs(bo,{children:[a.jsx(vo,{children:s}),a.jsx(ks,{children:x.map(m=>{const h=t?t(m):void 0;return a.jsxs(xo,{value:m.label,onSelect:w,className:"tw-flex tw-items-center tw-gap-2",children:[a.jsx("div",{className:"w-4",children:a.jsx(K.Check,{className:N("tw-h-4 tw-w-4",n.includes(m.value)?"tw-opacity-100":"tw-opacity-0")})}),a.jsx("div",{className:"tw-w-4",children:m.starred&&a.jsx(K.Star,{className:"tw-h-4 tw-w-4"})}),a.jsx("div",{className:"tw-flex-grow",children:m.label}),t&&a.jsx("div",{className:"tw-w-10 tw-text-end tw-text-muted-foreground",children:h})]},m.label)})})]})]})})]})})}function So({value:e,onSearch:t,placeholder:n,isFullWidth:r,className:o}){const s=xe();return a.jsxs("div",{className:N("tw-relative",{"tw-w-full":r},o),children:[a.jsx(K.Search,{className:N("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":s==="rtl"},{"tw-left-3":s==="ltr"})}),a.jsx(Ct,{className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:n,value:e,onChange:i=>t(i.target.value)}),e&&a.jsxs(pe,{variant:"ghost",size:"icon",className:N("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":s==="rtl"},{"tw-right-0":s==="ltr"}),onClick:()=>{t("")},children:[a.jsx(K.X,{className:"tw-h-4 tw-w-4"}),a.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})}const jo=b.forwardRef(({className:e,...t},n)=>{const r=xe();return a.jsx(_e.Root,{orientation:"vertical",ref:n,className:N("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",e),...t,dir:r})});jo.displayName=_e.List.displayName;const Eo=b.forwardRef(({className:e,...t},n)=>a.jsx(_e.List,{ref:n,className:N("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));Eo.displayName=_e.List.displayName;const Bs=b.forwardRef(({className:e,...t},n)=>a.jsx(_e.Trigger,{ref:n,...t,className:N("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e)})),Co=b.forwardRef(({className:e,...t},n)=>a.jsx(_e.Content,{ref:n,className:N("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));Co.displayName=_e.Content.displayName;function _c({tabList:e,searchValue:t,onSearch:n,searchPlaceholder:r,headerTitle:o,searchClassName:s}){return a.jsxs("div",{className:"pr-twp",children:[a.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[o?a.jsx("h1",{children:o}):"",a.jsx(So,{className:s,value:t,onSearch:n,placeholder:r})]}),a.jsxs(jo,{children:[a.jsx(Eo,{children:e.map(i=>a.jsx(Bs,{value:i.value,children:i.value},i.key))}),e.map(i=>a.jsx(Co,{value:i.value,children:i.content},i.key))]})]})}const dr=b.forwardRef(({className:e,orientation:t="horizontal",decorative:n=!0,...r},o)=>a.jsx(ds.Root,{ref:o,decorative:n,orientation:t,className:N("pr-twp tw-shrink-0 tw-bg-border",t==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",e),...r}));dr.displayName=ds.Root.displayName;function fa({className:e,...t}){return a.jsx("div",{className:N("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",e),...t})}const Pc=jn.Provider,Ic=jn.Root,$c=jn.Trigger,zs=b.forwardRef(({className:e,sideOffset:t=4,...n},r)=>a.jsx(jn.Content,{ref:r,sideOffset:t,className:N("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...n}));zs.displayName=jn.Content.displayName;const Mc="16rem",Ac="3rem",Vs=b.createContext(void 0);function ur(){const e=b.useContext(Vs);if(!e)throw new Error("useSidebar must be used within a SidebarProvider.");return e}const Fs=b.forwardRef(({defaultOpen:e=!0,open:t,onOpenChange:n,className:r,style:o,children:s,side:i="primary",...l},c)=>{const[d,u]=b.useState(e),f=t??d,w=b.useCallback(E=>{const S=typeof E=="function"?E(f):E;n?n(S):u(S)},[n,f]),g=b.useCallback(()=>w(E=>!E),[w]),x=f?"expanded":"collapsed",k=xe()==="ltr"?i:i==="primary"?"secondary":"primary",j=b.useMemo(()=>({state:x,open:f,setOpen:w,toggleSidebar:g,side:k}),[x,f,w,g,k]);return a.jsx(Vs.Provider,{value:j,children:a.jsx(Pc,{delayDuration:0,children:a.jsx("div",{style:{"--sidebar-width":Mc,"--sidebar-width-icon":Ac,...o},className:N("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",r),ref:c,...l,children:s})})})});Fs.displayName="SidebarProvider";const Ls=b.forwardRef(({variant:e="sidebar",collapsible:t="offcanvas",className:n,children:r,...o},s)=>{const i=ur();return t==="none"?a.jsx("div",{className:N("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",n),ref:s,...o,children:r}):a.jsxs("div",{ref:s,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?t:"","data-variant":e,"data-side":i.side,children:[a.jsx("div",{className:N("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",e==="floating"||e==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),a.jsx("div",{className:N("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",e==="floating"||e==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",n),...o,children:a.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:r})})]})});Ls.displayName="Sidebar";const Dc=b.forwardRef(({className:e,onClick:t,...n},r)=>{const o=ur();return a.jsxs(pe,{ref:r,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:N("tw-h-7 tw-w-7",e),onClick:s=>{t==null||t(s),o.toggleSidebar()},...n,children:[o.side==="primary"?a.jsx(K.PanelLeft,{}):a.jsx(K.PanelRight,{}),a.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});Dc.displayName="SidebarTrigger";const Bc=b.forwardRef(({className:e,...t},n)=>{const{toggleSidebar:r}=ur();return a.jsx("button",{type:"button",ref:n,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:r,title:"Toggle Sidebar",className:N("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",e),...t})});Bc.displayName="SidebarRail";const Gs=b.forwardRef(({className:e,...t},n)=>a.jsx("main",{ref:n,className:N("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",e),...t}));Gs.displayName="SidebarInset";const zc=b.forwardRef(({className:e,...t},n)=>a.jsx(Ct,{ref:n,"data-sidebar":"input",className:N("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",e),...t}));zc.displayName="SidebarInput";const Vc=b.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"header",className:N("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));Vc.displayName="SidebarHeader";const Fc=b.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"footer",className:N("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));Fc.displayName="SidebarFooter";const Lc=b.forwardRef(({className:e,...t},n)=>a.jsx(dr,{ref:n,"data-sidebar":"separator",className:N("tw-mx-2 tw-w-auto tw-bg-sidebar-border",e),...t}));Lc.displayName="SidebarSeparator";const Us=b.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"content",className:N("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",e),...t}));Us.displayName="SidebarContent";const Yr=b.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"group",className:N("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",e),...t}));Yr.displayName="SidebarGroup";const Wr=b.forwardRef(({className:e,asChild:t=!1,...n},r)=>{const o=t?Xt.Slot:"div";return a.jsx(o,{ref:r,"data-sidebar":"group-label",className:N("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",e),...n})});Wr.displayName="SidebarGroupLabel";const Gc=b.forwardRef(({className:e,asChild:t=!1,...n},r)=>{const o=t?Xt.Slot:"button";return a.jsx(o,{ref:r,"data-sidebar":"group-action",className:N("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",e),...n})});Gc.displayName="SidebarGroupAction";const Kr=b.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"group-content",className:N("tw-w-full tw-text-sm",e),...t}));Kr.displayName="SidebarGroupContent";const qs=b.forwardRef(({className:e,...t},n)=>a.jsx("ul",{ref:n,"data-sidebar":"menu",className:N("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",e),...t}));qs.displayName="SidebarMenu";const Hs=b.forwardRef(({className:e,...t},n)=>a.jsx("li",{ref:n,"data-sidebar":"menu-item",className:N("tw-group/menu-item tw-relative",e),...t}));Hs.displayName="SidebarMenuItem";const Uc=Yt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),Xs=b.forwardRef(({asChild:e=!1,isActive:t=!1,variant:n="default",size:r="default",tooltip:o,className:s,...i},l)=>{const c=e?Xt.Slot:"button",{state:d}=ur(),u=a.jsx(c,{ref:l,"data-sidebar":"menu-button","data-size":r,"data-active":t,className:N(Uc({variant:n,size:r}),s),...i});return o?(typeof o=="string"&&(o={children:o}),a.jsxs(Ic,{children:[a.jsx($c,{asChild:!0,children:u}),a.jsx(zs,{side:"right",align:"center",hidden:d!=="collapsed",...o})]})):u});Xs.displayName="SidebarMenuButton";const qc=b.forwardRef(({className:e,asChild:t=!1,showOnHover:n=!1,...r},o)=>{const s=t?Xt.Slot:"button";return a.jsx(s,{ref:o,"data-sidebar":"menu-action",className:N("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",n&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",e),...r})});qc.displayName="SidebarMenuAction";const Hc=b.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"menu-badge",className:N("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));Hc.displayName="SidebarMenuBadge";const Xc=b.forwardRef(({className:e,showIcon:t=!1,...n},r)=>{const o=b.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return a.jsxs("div",{ref:r,"data-sidebar":"menu-skeleton",className:N("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",e),...n,children:[t&&a.jsx(fa,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),a.jsx(fa,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":o}})]})});Xc.displayName="SidebarMenuSkeleton";const Yc=b.forwardRef(({className:e,...t},n)=>a.jsx("ul",{ref:n,"data-sidebar":"menu-sub",className:N("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));Yc.displayName="SidebarMenuSub";const Wc=b.forwardRef(({...e},t)=>a.jsx("li",{ref:t,...e}));Wc.displayName="SidebarMenuSubItem";const Kc=b.forwardRef(({asChild:e=!1,size:t="md",isActive:n,className:r,...o},s)=>{const i=e?Xt.Slot:"a";return a.jsx(i,{ref:s,"data-sidebar":"menu-sub-button","data-size":t,"data-active":n,className:N("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",t==="sm"&&"tw-text-xs",t==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",r),...o})});Kc.displayName="SidebarMenuSubButton";function Ys({id:e,extensionLabels:t,projectInfo:n,handleSelectSidebarItem:r,selectedSidebarItem:o,extensionsSidebarGroupLabel:s,projectsSidebarGroupLabel:i,buttonPlaceholderText:l}){const c=b.useCallback((f,w)=>{r(f,w)},[r]),d=b.useCallback(f=>{const w=n.find(g=>g.projectId===f);return w?w.projectName:f},[n]),u=b.useCallback(f=>!o.projectId&&f===o.label,[o]);return a.jsx(Ls,{id:e,collapsible:"none",variant:"inset",className:"tw-w-96 tw-gap-2 tw-overflow-y-auto tw-rounded tw-bg-slate-100",children:a.jsxs(Us,{children:[a.jsxs(Yr,{children:[a.jsx(Wr,{className:"tw-text-sm tw-text-gray-400",children:s}),a.jsx(Kr,{children:a.jsx(qs,{children:t.map(f=>a.jsx(Hs,{children:a.jsx(Xs,{className:N("tw-rounded tw-py-2 tw-text-sm tw-text-gray-500 hover:tw-bg-white hover:tw-text-gray-900 hover:tw-shadow-sm active:tw-bg-white",{"tw-bg-white tw-text-gray-900 tw-shadow-sm":u(f)}),onClick:()=>c(f),isActive:u(f),children:a.jsx("span",{className:"tw-pl-3",children:f})})},f))})})]}),a.jsxs(Yr,{children:[a.jsx(Wr,{className:"tw-text-sm tw-text-gray-400",children:i}),a.jsx(Kr,{className:"tw-pl-3",children:a.jsx(Kn,{popoverContentClassName:"tw-z-[1000]",options:n.flatMap(f=>f.projectId),getOptionLabel:f=>d(f),buttonPlaceholder:l,onChange:f=>{const w=d(f);c(w,f)},value:(o==null?void 0:o.projectId)??void 0})})]})]})})}function Jc({id:e,extensionLabels:t,projectInfo:n,children:r,handleSelectSidebarItem:o,selectedSidebarItem:s,searchValue:i,onSearch:l,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}){return a.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col tw-p-3",children:[a.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:a.jsx(So,{className:"tw-w-9/12",value:i,onSearch:l,placeholder:"Search app settings, extension settings, and project settings"})}),a.jsxs(Fs,{id:e,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto",children:[a.jsx(Ys,{extensionLabels:t,projectInfo:n,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}),a.jsx(Gs,{className:"tw-overflow-y-auto",children:r})]})]})}const ot="scrBook",Zc="scrRef",mt="source",Qc="details",ed="Scripture Reference",td="Scripture Book",Ws="Type",nd="Details";function rd(e,t){const n=t??!1;return[{accessorFn:r=>`${ae.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:ot,header:(e==null?void 0:e.scriptureReferenceColumnName)??ed,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?ae.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===ot?J.formatScrRef(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>J.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>J.formatScrRef(r.start),id:Zc,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:J.formatScrRef(o.start)},sortingFn:(r,o)=>J.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:mt,header:n?(e==null?void 0:e.typeColumnName)??Ws:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:Qc,header:(e==null?void 0:e.detailsColumnName)??nd,cell:r=>r.getValue(),enableGrouping:!1}]}const od=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:t}=e.start;let n=0;return e.end&&({offset:n}=e.end),!e.end||J.compareScrRefs(e.start,e.end)===0?`${J.scrRefToBBBCCCVVV(e.start)}+${t}`:`${J.scrRefToBBBCCCVVV(e.start)}+${t}-${J.scrRefToBBBCCCVVV(e.end)}+${n}`},ma=e=>`${od({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function ad({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:s,detailsColumnName:i,onRowSelected:l}){const[c,d]=b.useState([]),[u,f]=b.useState([{id:ot,desc:!1}]),[w,g]=b.useState({}),x=b.useMemo(()=>e.flatMap(T=>T.data.map(_=>({..._,source:T.source}))),[e]),m=b.useMemo(()=>rd({scriptureReferenceColumnName:r,typeColumnName:s,detailsColumnName:i},n),[r,s,i,n]);b.useEffect(()=>{c.includes(mt)?f([{id:mt,desc:!1},{id:ot,desc:!1}]):f([{id:ot,desc:!1}])},[c]);const h=Se.useReactTable({data:x,columns:m,state:{grouping:c,sorting:u,rowSelection:w},onGroupingChange:d,onSortingChange:f,onRowSelectionChange:g,getExpandedRowModel:Se.getExpandedRowModel(),getGroupedRowModel:Se.getGroupedRowModel(),getCoreRowModel:Se.getCoreRowModel(),getSortedRowModel:Se.getSortedRowModel(),getRowId:ma,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});b.useEffect(()=>{if(l){const T=h.getSelectedRowModel().rowsById,_=Object.keys(T);if(_.length===1){const F=x.find(M=>ma(M)===_[0])||void 0;F&&l(F)}}},[w,x,l,h]);const k=o??td,j=s??Ws,E=[{label:"No Grouping",value:[]},{label:`Group by ${k}`,value:[ot]},{label:`Group by ${j}`,value:[mt]},{label:`Group by ${k} and ${j}`,value:[ot,mt]},{label:`Group by ${j} and ${k}`,value:[mt,ot]}],S=T=>{d(JSON.parse(T))},v=(T,_)=>{!T.getIsGrouped()&&!T.getIsSelected()&&T.getToggleSelectedHandler()(_)},R=(T,_)=>T.getIsGrouped()?"":N("banded-row",_%2===0?"even":"odd"),V=(T,_,F)=>{if(!((T==null?void 0:T.length)===0||_.depth<F.column.getGroupedIndex())){if(_.getIsGrouped())switch(_.depth){case 1:return"tw-ps-4";default:return}switch(_.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return a.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!t&&a.jsxs(yt,{value:JSON.stringify(c),onValueChange:T=>{S(T)},children:[a.jsx(it,{className:"tw-mb-1 tw-mt-2",children:a.jsx(Nt,{})}),a.jsx(lt,{position:"item-aligned",children:a.jsx(Es,{children:E.map(T=>a.jsx($e,{value:JSON.stringify(T.value),children:T.label},T.label))})})]}),a.jsxs(Tn,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[t&&a.jsx(Rn,{children:h.getHeaderGroups().map(T=>a.jsx(Qe,{children:T.headers.filter(_=>_.column.columnDef.header).map(_=>a.jsx(Vt,{colSpan:_.colSpan,className:"top-0 tw-sticky",children:_.isPlaceholder?void 0:a.jsxs("div",{children:[_.column.getCanGroup()?a.jsx(pe,{variant:"ghost",title:`Toggle grouping by ${_.column.columnDef.header}`,onClick:_.column.getToggleGroupingHandler(),type:"button",children:_.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Se.flexRender(_.column.columnDef.header,_.getContext())]})},_.id))},T.id))}),a.jsx(On,{children:h.getRowModel().rows.map((T,_)=>{const F=xe();return a.jsx(Qe,{"data-state":T.getIsSelected()?"selected":"",className:N(R(T,_)),onClick:M=>v(T,M),children:T.getVisibleCells().map(M=>{if(!(M.getIsPlaceholder()||M.column.columnDef.enableGrouping&&!M.getIsGrouped()&&(M.column.columnDef.id!==mt||!n)))return a.jsx(kt,{className:N(M.column.columnDef.id,"tw-p-[1px]",V(c,T,M)),children:(()=>M.getIsGrouped()?a.jsxs(pe,{variant:"link",onClick:T.getToggleExpandedHandler(),type:"button",children:[T.getIsExpanded()&&a.jsx(K.ChevronDown,{}),!T.getIsExpanded()&&(F==="ltr"?a.jsx(K.ChevronRight,{}):a.jsx(K.ChevronLeft,{}))," ",Se.flexRender(M.column.columnDef.cell,M.getContext())," (",T.subRows.length,")"]}):Se.flexRender(M.column.columnDef.cell,M.getContext()))()},M.id)})},T.id)})})]})]})}const Pr={[J.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[J.getLocalizeKeyForScrollGroupId(0)]:"A",[J.getLocalizeKeyForScrollGroupId(1)]:"B",[J.getLocalizeKeyForScrollGroupId(2)]:"C",[J.getLocalizeKeyForScrollGroupId(3)]:"D",[J.getLocalizeKeyForScrollGroupId(4)]:"E",[J.getLocalizeKeyForScrollGroupId(5)]:"F",[J.getLocalizeKeyForScrollGroupId(6)]:"G",[J.getLocalizeKeyForScrollGroupId(7)]:"H",[J.getLocalizeKeyForScrollGroupId(8)]:"I",[J.getLocalizeKeyForScrollGroupId(9)]:"J",[J.getLocalizeKeyForScrollGroupId(10)]:"K",[J.getLocalizeKeyForScrollGroupId(11)]:"L",[J.getLocalizeKeyForScrollGroupId(12)]:"M",[J.getLocalizeKeyForScrollGroupId(13)]:"N",[J.getLocalizeKeyForScrollGroupId(14)]:"O",[J.getLocalizeKeyForScrollGroupId(15)]:"P",[J.getLocalizeKeyForScrollGroupId(16)]:"Q",[J.getLocalizeKeyForScrollGroupId(17)]:"R",[J.getLocalizeKeyForScrollGroupId(18)]:"S",[J.getLocalizeKeyForScrollGroupId(19)]:"T",[J.getLocalizeKeyForScrollGroupId(20)]:"U",[J.getLocalizeKeyForScrollGroupId(21)]:"V",[J.getLocalizeKeyForScrollGroupId(22)]:"W",[J.getLocalizeKeyForScrollGroupId(23)]:"X",[J.getLocalizeKeyForScrollGroupId(24)]:"Y",[J.getLocalizeKeyForScrollGroupId(25)]:"Z"};function sd({availableScrollGroupIds:e,scrollGroupId:t,onChangeScrollGroupId:n,localizedStrings:r={}}){const o={...Pr,...Object.fromEntries(Object.entries(r).map(([i,l])=>[i,i===l&&i in Pr?Pr[i]:l]))},s=xe();return a.jsxs(yt,{value:`${t}`,onValueChange:i=>n(i==="undefined"?void 0:parseInt(i,10)),children:[a.jsx(it,{className:"pr-twp tw-w-auto",children:a.jsx(Nt,{placeholder:o[J.getLocalizeKeyForScrollGroupId(t)]??t})}),a.jsx(lt,{align:s==="rtl"?"end":"start",style:{zIndex:250},children:e.map(i=>a.jsx($e,{value:`${i}`,children:o[J.getLocalizeKeyForScrollGroupId(i)]},`${i}`))})]})}function id({children:e}){return a.jsx("div",{className:"pr-twp tw-grid",children:e})}function ld({primary:e,secondary:t,children:n,isLoading:r=!1,loadingMessage:o}){return a.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[a.jsxs("div",{children:[a.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:e}),a.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:t})]}),r?a.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):a.jsx("div",{children:n})]})}function cd({primary:e,secondary:t,includeSeparator:n=!1}){return a.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[a.jsxs("div",{children:[a.jsx("h3",{className:"tw-text-lg tw-font-medium",children:e}),a.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:t})]}),n?a.jsx(dr,{}):""]})}function dd({id:e,className:t,listItems:n,selectedListItems:r,handleSelectListItem:o,createLabel:s}){return a.jsx("div",{id:e,className:t,children:n.map(i=>a.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[a.jsx(lr,{className:"tw-me-2 tw-align-middle",checked:r.includes(i),onCheckedChange:l=>o(i,l)}),a.jsx(Ce,{children:s?s(i):i})]},i))})}function ud(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function pd(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var To={},Ks={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Ks);var wd=Ks.exports,Ir={};function Ro(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function O(){return O=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},O.apply(this,arguments)}function bt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Js(e){if(!bt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Js(e[n])}),t}function et(e,t,n={clone:!0}){const r=n.clone?O({},e):e;return bt(e)&&bt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(bt(t[o])&&o in e&&bt(e[o])?r[o]=et(e[o],t[o],n):n.clone?r[o]=bt(t[o])?Js(t[o]):t[o]:r[o]=t[o])}),r}var Jr={exports:{}},Fn={exports:{}},ie={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ha;function fd(){if(ha)return ie;ha=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,w=e?Symbol.for("react.suspense_list"):60120,g=e?Symbol.for("react.memo"):60115,x=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,k=e?Symbol.for("react.responder"):60118,j=e?Symbol.for("react.scope"):60119;function E(v){if(typeof v=="object"&&v!==null){var R=v.$$typeof;switch(R){case t:switch(v=v.type,v){case c:case d:case r:case s:case o:case f:return v;default:switch(v=v&&v.$$typeof,v){case l:case u:case x:case g:case i:return v;default:return R}}case n:return R}}}function S(v){return E(v)===d}return ie.AsyncMode=c,ie.ConcurrentMode=d,ie.ContextConsumer=l,ie.ContextProvider=i,ie.Element=t,ie.ForwardRef=u,ie.Fragment=r,ie.Lazy=x,ie.Memo=g,ie.Portal=n,ie.Profiler=s,ie.StrictMode=o,ie.Suspense=f,ie.isAsyncMode=function(v){return S(v)||E(v)===c},ie.isConcurrentMode=S,ie.isContextConsumer=function(v){return E(v)===l},ie.isContextProvider=function(v){return E(v)===i},ie.isElement=function(v){return typeof v=="object"&&v!==null&&v.$$typeof===t},ie.isForwardRef=function(v){return E(v)===u},ie.isFragment=function(v){return E(v)===r},ie.isLazy=function(v){return E(v)===x},ie.isMemo=function(v){return E(v)===g},ie.isPortal=function(v){return E(v)===n},ie.isProfiler=function(v){return E(v)===s},ie.isStrictMode=function(v){return E(v)===o},ie.isSuspense=function(v){return E(v)===f},ie.isValidElementType=function(v){return typeof v=="string"||typeof v=="function"||v===r||v===d||v===s||v===o||v===f||v===w||typeof v=="object"&&v!==null&&(v.$$typeof===x||v.$$typeof===g||v.$$typeof===i||v.$$typeof===l||v.$$typeof===u||v.$$typeof===h||v.$$typeof===k||v.$$typeof===j||v.$$typeof===m)},ie.typeOf=E,ie}var le={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ga;function md(){return ga||(ga=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,w=e?Symbol.for("react.suspense_list"):60120,g=e?Symbol.for("react.memo"):60115,x=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,k=e?Symbol.for("react.responder"):60118,j=e?Symbol.for("react.scope"):60119;function E(I){return typeof I=="string"||typeof I=="function"||I===r||I===d||I===s||I===o||I===f||I===w||typeof I=="object"&&I!==null&&(I.$$typeof===x||I.$$typeof===g||I.$$typeof===i||I.$$typeof===l||I.$$typeof===u||I.$$typeof===h||I.$$typeof===k||I.$$typeof===j||I.$$typeof===m)}function S(I){if(typeof I=="object"&&I!==null){var ye=I.$$typeof;switch(ye){case t:var B=I.type;switch(B){case c:case d:case r:case s:case o:case f:return B;default:var ve=B&&B.$$typeof;switch(ve){case l:case u:case x:case g:case i:return ve;default:return ye}}case n:return ye}}}var v=c,R=d,V=l,T=i,_=t,F=u,M=r,P=x,$=g,q=n,L=s,D=o,Q=f,se=!1;function oe(I){return se||(se=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),y(I)||S(I)===c}function y(I){return S(I)===d}function C(I){return S(I)===l}function G(I){return S(I)===i}function U(I){return typeof I=="object"&&I!==null&&I.$$typeof===t}function z(I){return S(I)===u}function W(I){return S(I)===r}function X(I){return S(I)===x}function Y(I){return S(I)===g}function H(I){return S(I)===n}function Z(I){return S(I)===s}function ee(I){return S(I)===o}function ue(I){return S(I)===f}le.AsyncMode=v,le.ConcurrentMode=R,le.ContextConsumer=V,le.ContextProvider=T,le.Element=_,le.ForwardRef=F,le.Fragment=M,le.Lazy=P,le.Memo=$,le.Portal=q,le.Profiler=L,le.StrictMode=D,le.Suspense=Q,le.isAsyncMode=oe,le.isConcurrentMode=y,le.isContextConsumer=C,le.isContextProvider=G,le.isElement=U,le.isForwardRef=z,le.isFragment=W,le.isLazy=X,le.isMemo=Y,le.isPortal=H,le.isProfiler=Z,le.isStrictMode=ee,le.isSuspense=ue,le.isValidElementType=E,le.typeOf=S}()),le}var ba;function Zs(){return ba||(ba=1,process.env.NODE_ENV==="production"?Fn.exports=fd():Fn.exports=md()),Fn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var $r,va;function hd(){if(va)return $r;va=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(s){if(s==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(s)}function o(){try{if(!Object.assign)return!1;var s=new String("abc");if(s[5]="de",Object.getOwnPropertyNames(s)[0]==="5")return!1;for(var i={},l=0;l<10;l++)i["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(i).map(function(u){return i[u]});if(c.join("")!=="0123456789")return!1;var d={};return"abcdefghijklmnopqrst".split("").forEach(function(u){d[u]=u}),Object.keys(Object.assign({},d)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return $r=o()?Object.assign:function(s,i){for(var l,c=r(s),d,u=1;u<arguments.length;u++){l=Object(arguments[u]);for(var f in l)t.call(l,f)&&(c[f]=l[f]);if(e){d=e(l);for(var w=0;w<d.length;w++)n.call(l,d[w])&&(c[d[w]]=l[d[w]])}}return c},$r}var Mr,xa;function Oo(){if(xa)return Mr;xa=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Mr=e,Mr}var Ar,ya;function Qs(){return ya||(ya=1,Ar=Function.call.bind(Object.prototype.hasOwnProperty)),Ar}var Dr,Na;function gd(){if(Na)return Dr;Na=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Oo(),n={},r=Qs();e=function(s){var i="Warning: "+s;typeof console<"u"&&console.error(i);try{throw new Error(i)}catch{}}}function o(s,i,l,c,d){if(process.env.NODE_ENV!=="production"){for(var u in s)if(r(s,u)){var f;try{if(typeof s[u]!="function"){var w=Error((c||"React class")+": "+l+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof s[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw w.name="Invariant Violation",w}f=s[u](i,u,c,l,null,t)}catch(x){f=x}if(f&&!(f instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+u+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in n)){n[f.message]=!0;var g=d?d():"";e("Failed "+l+" type: "+f.message+(g??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Dr=o,Dr}var Br,ka;function bd(){if(ka)return Br;ka=1;var e=Zs(),t=hd(),n=Oo(),r=Qs(),o=gd(),s=function(){};process.env.NODE_ENV!=="production"&&(s=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function i(){return null}return Br=function(l,c){var d=typeof Symbol=="function"&&Symbol.iterator,u="@@iterator";function f(y){var C=y&&(d&&y[d]||y[u]);if(typeof C=="function")return C}var w="<<anonymous>>",g={array:k("array"),bigint:k("bigint"),bool:k("boolean"),func:k("function"),number:k("number"),object:k("object"),string:k("string"),symbol:k("symbol"),any:j(),arrayOf:E,element:S(),elementType:v(),instanceOf:R,node:F(),objectOf:T,oneOf:V,oneOfType:_,shape:P,exact:$};function x(y,C){return y===C?y!==0||1/y===1/C:y!==y&&C!==C}function m(y,C){this.message=y,this.data=C&&typeof C=="object"?C:{},this.stack=""}m.prototype=Error.prototype;function h(y){if(process.env.NODE_ENV!=="production")var C={},G=0;function U(W,X,Y,H,Z,ee,ue){if(H=H||w,ee=ee||Y,ue!==n){if(c){var I=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw I.name="Invariant Violation",I}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var ye=H+":"+Y;!C[ye]&&G<3&&(s("You are manually calling a React.PropTypes validation function for the `"+ee+"` prop on `"+H+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),C[ye]=!0,G++)}}return X[Y]==null?W?X[Y]===null?new m("The "+Z+" `"+ee+"` is marked as required "+("in `"+H+"`, but its value is `null`.")):new m("The "+Z+" `"+ee+"` is marked as required in "+("`"+H+"`, but its value is `undefined`.")):null:y(X,Y,H,Z,ee)}var z=U.bind(null,!1);return z.isRequired=U.bind(null,!0),z}function k(y){function C(G,U,z,W,X,Y){var H=G[U],Z=D(H);if(Z!==y){var ee=Q(H);return new m("Invalid "+W+" `"+X+"` of type "+("`"+ee+"` supplied to `"+z+"`, expected ")+("`"+y+"`."),{expectedType:y})}return null}return h(C)}function j(){return h(i)}function E(y){function C(G,U,z,W,X){if(typeof y!="function")return new m("Property `"+X+"` of component `"+z+"` has invalid PropType notation inside arrayOf.");var Y=G[U];if(!Array.isArray(Y)){var H=D(Y);return new m("Invalid "+W+" `"+X+"` of type "+("`"+H+"` supplied to `"+z+"`, expected an array."))}for(var Z=0;Z<Y.length;Z++){var ee=y(Y,Z,z,W,X+"["+Z+"]",n);if(ee instanceof Error)return ee}return null}return h(C)}function S(){function y(C,G,U,z,W){var X=C[G];if(!l(X)){var Y=D(X);return new m("Invalid "+z+" `"+W+"` of type "+("`"+Y+"` supplied to `"+U+"`, expected a single ReactElement."))}return null}return h(y)}function v(){function y(C,G,U,z,W){var X=C[G];if(!e.isValidElementType(X)){var Y=D(X);return new m("Invalid "+z+" `"+W+"` of type "+("`"+Y+"` supplied to `"+U+"`, expected a single ReactElement type."))}return null}return h(y)}function R(y){function C(G,U,z,W,X){if(!(G[U]instanceof y)){var Y=y.name||w,H=oe(G[U]);return new m("Invalid "+W+" `"+X+"` of type "+("`"+H+"` supplied to `"+z+"`, expected ")+("instance of `"+Y+"`."))}return null}return h(C)}function V(y){if(!Array.isArray(y))return process.env.NODE_ENV!=="production"&&(arguments.length>1?s("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):s("Invalid argument supplied to oneOf, expected an array.")),i;function C(G,U,z,W,X){for(var Y=G[U],H=0;H<y.length;H++)if(x(Y,y[H]))return null;var Z=JSON.stringify(y,function(ue,I){var ye=Q(I);return ye==="symbol"?String(I):I});return new m("Invalid "+W+" `"+X+"` of value `"+String(Y)+"` "+("supplied to `"+z+"`, expected one of "+Z+"."))}return h(C)}function T(y){function C(G,U,z,W,X){if(typeof y!="function")return new m("Property `"+X+"` of component `"+z+"` has invalid PropType notation inside objectOf.");var Y=G[U],H=D(Y);if(H!=="object")return new m("Invalid "+W+" `"+X+"` of type "+("`"+H+"` supplied to `"+z+"`, expected an object."));for(var Z in Y)if(r(Y,Z)){var ee=y(Y,Z,z,W,X+"."+Z,n);if(ee instanceof Error)return ee}return null}return h(C)}function _(y){if(!Array.isArray(y))return process.env.NODE_ENV!=="production"&&s("Invalid argument supplied to oneOfType, expected an instance of array."),i;for(var C=0;C<y.length;C++){var G=y[C];if(typeof G!="function")return s("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+se(G)+" at index "+C+"."),i}function U(z,W,X,Y,H){for(var Z=[],ee=0;ee<y.length;ee++){var ue=y[ee],I=ue(z,W,X,Y,H,n);if(I==null)return null;I.data&&r(I.data,"expectedType")&&Z.push(I.data.expectedType)}var ye=Z.length>0?", expected one of type ["+Z.join(", ")+"]":"";return new m("Invalid "+Y+" `"+H+"` supplied to "+("`"+X+"`"+ye+"."))}return h(U)}function F(){function y(C,G,U,z,W){return q(C[G])?null:new m("Invalid "+z+" `"+W+"` supplied to "+("`"+U+"`, expected a ReactNode."))}return h(y)}function M(y,C,G,U,z){return new m((y||"React class")+": "+C+" type `"+G+"."+U+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+z+"`.")}function P(y){function C(G,U,z,W,X){var Y=G[U],H=D(Y);if(H!=="object")return new m("Invalid "+W+" `"+X+"` of type `"+H+"` "+("supplied to `"+z+"`, expected `object`."));for(var Z in y){var ee=y[Z];if(typeof ee!="function")return M(z,W,X,Z,Q(ee));var ue=ee(Y,Z,z,W,X+"."+Z,n);if(ue)return ue}return null}return h(C)}function $(y){function C(G,U,z,W,X){var Y=G[U],H=D(Y);if(H!=="object")return new m("Invalid "+W+" `"+X+"` of type `"+H+"` "+("supplied to `"+z+"`, expected `object`."));var Z=t({},G[U],y);for(var ee in Z){var ue=y[ee];if(r(y,ee)&&typeof ue!="function")return M(z,W,X,ee,Q(ue));if(!ue)return new m("Invalid "+W+" `"+X+"` key `"+ee+"` supplied to `"+z+"`.\nBad object: "+JSON.stringify(G[U],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(y),null,"  "));var I=ue(Y,ee,z,W,X+"."+ee,n);if(I)return I}return null}return h(C)}function q(y){switch(typeof y){case"number":case"string":case"undefined":return!0;case"boolean":return!y;case"object":if(Array.isArray(y))return y.every(q);if(y===null||l(y))return!0;var C=f(y);if(C){var G=C.call(y),U;if(C!==y.entries){for(;!(U=G.next()).done;)if(!q(U.value))return!1}else for(;!(U=G.next()).done;){var z=U.value;if(z&&!q(z[1]))return!1}}else return!1;return!0;default:return!1}}function L(y,C){return y==="symbol"?!0:C?C["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&C instanceof Symbol:!1}function D(y){var C=typeof y;return Array.isArray(y)?"array":y instanceof RegExp?"object":L(C,y)?"symbol":C}function Q(y){if(typeof y>"u"||y===null)return""+y;var C=D(y);if(C==="object"){if(y instanceof Date)return"date";if(y instanceof RegExp)return"regexp"}return C}function se(y){var C=Q(y);switch(C){case"array":case"object":return"an "+C;case"boolean":case"date":case"regexp":return"a "+C;default:return C}}function oe(y){return!y.constructor||!y.constructor.name?w:y.constructor.name}return g.checkPropTypes=o,g.resetWarningCache=o.resetWarningCache,g.PropTypes=g,g},Br}var zr,Sa;function vd(){if(Sa)return zr;Sa=1;var e=Oo();function t(){}function n(){}return n.resetWarningCache=t,zr=function(){function r(i,l,c,d,u,f){if(f!==e){var w=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw w.name="Invariant Violation",w}}r.isRequired=r;function o(){return r}var s={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return s.PropTypes=s,s},zr}if(process.env.NODE_ENV!=="production"){var xd=Zs(),yd=!0;Jr.exports=bd()(xd.isElement,yd)}else Jr.exports=vd()();var Nd=Jr.exports;const p=ud(Nd);function kd(e){const{prototype:t={}}=e;return!!t.isReactComponent}function ei(e,t,n,r,o){const s=e[t],i=o||t;if(s==null||typeof window>"u")return null;let l;const c=s.type;return typeof c=="function"&&!kd(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const ti=Ro(p.element,ei);ti.isRequired=Ro(p.element.isRequired,ei);const ni=ti,Sd="exact-prop: ​";function jd(e){return process.env.NODE_ENV==="production"?e:O({},e,{[Sd]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Ft(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Zr={exports:{}},ce={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ja;function Ed(){if(ja)return ce;ja=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),g=Symbol.for("react.offscreen"),x;x=Symbol.for("react.module.reference");function m(h){if(typeof h=="object"&&h!==null){var k=h.$$typeof;switch(k){case e:switch(h=h.type,h){case n:case o:case r:case d:case u:return h;default:switch(h=h&&h.$$typeof,h){case l:case i:case c:case w:case f:case s:return h;default:return k}}case t:return k}}}return ce.ContextConsumer=i,ce.ContextProvider=s,ce.Element=e,ce.ForwardRef=c,ce.Fragment=n,ce.Lazy=w,ce.Memo=f,ce.Portal=t,ce.Profiler=o,ce.StrictMode=r,ce.Suspense=d,ce.SuspenseList=u,ce.isAsyncMode=function(){return!1},ce.isConcurrentMode=function(){return!1},ce.isContextConsumer=function(h){return m(h)===i},ce.isContextProvider=function(h){return m(h)===s},ce.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===e},ce.isForwardRef=function(h){return m(h)===c},ce.isFragment=function(h){return m(h)===n},ce.isLazy=function(h){return m(h)===w},ce.isMemo=function(h){return m(h)===f},ce.isPortal=function(h){return m(h)===t},ce.isProfiler=function(h){return m(h)===o},ce.isStrictMode=function(h){return m(h)===r},ce.isSuspense=function(h){return m(h)===d},ce.isSuspenseList=function(h){return m(h)===u},ce.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===n||h===o||h===r||h===d||h===u||h===g||typeof h=="object"&&h!==null&&(h.$$typeof===w||h.$$typeof===f||h.$$typeof===s||h.$$typeof===i||h.$$typeof===c||h.$$typeof===x||h.getModuleId!==void 0)},ce.typeOf=m,ce}var de={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ea;function Cd(){return Ea||(Ea=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),g=Symbol.for("react.offscreen"),x=!1,m=!1,h=!1,k=!1,j=!1,E;E=Symbol.for("react.module.reference");function S(B){return!!(typeof B=="string"||typeof B=="function"||B===n||B===o||j||B===r||B===d||B===u||k||B===g||x||m||h||typeof B=="object"&&B!==null&&(B.$$typeof===w||B.$$typeof===f||B.$$typeof===s||B.$$typeof===i||B.$$typeof===c||B.$$typeof===E||B.getModuleId!==void 0))}function v(B){if(typeof B=="object"&&B!==null){var ve=B.$$typeof;switch(ve){case e:var Ue=B.type;switch(Ue){case n:case o:case r:case d:case u:return Ue;default:var ut=Ue&&Ue.$$typeof;switch(ut){case l:case i:case c:case w:case f:case s:return ut;default:return ve}}case t:return ve}}}var R=i,V=s,T=e,_=c,F=n,M=w,P=f,$=t,q=o,L=r,D=d,Q=u,se=!1,oe=!1;function y(B){return se||(se=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function C(B){return oe||(oe=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function G(B){return v(B)===i}function U(B){return v(B)===s}function z(B){return typeof B=="object"&&B!==null&&B.$$typeof===e}function W(B){return v(B)===c}function X(B){return v(B)===n}function Y(B){return v(B)===w}function H(B){return v(B)===f}function Z(B){return v(B)===t}function ee(B){return v(B)===o}function ue(B){return v(B)===r}function I(B){return v(B)===d}function ye(B){return v(B)===u}de.ContextConsumer=R,de.ContextProvider=V,de.Element=T,de.ForwardRef=_,de.Fragment=F,de.Lazy=M,de.Memo=P,de.Portal=$,de.Profiler=q,de.StrictMode=L,de.Suspense=D,de.SuspenseList=Q,de.isAsyncMode=y,de.isConcurrentMode=C,de.isContextConsumer=G,de.isContextProvider=U,de.isElement=z,de.isForwardRef=W,de.isFragment=X,de.isLazy=Y,de.isMemo=H,de.isPortal=Z,de.isProfiler=ee,de.isStrictMode=ue,de.isSuspense=I,de.isSuspenseList=ye,de.isValidElementType=S,de.typeOf=v}()),de}process.env.NODE_ENV==="production"?Zr.exports=Ed():Zr.exports=Cd();var Ca=Zr.exports;const Td=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Rd(e){const t=`${e}`.match(Td);return t&&t[1]||""}function ri(e,t=""){return e.displayName||e.name||Rd(e)||t}function Ta(e,t,n){const r=ri(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Od(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return ri(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Ca.ForwardRef:return Ta(e,e.render,"ForwardRef");case Ca.Memo:return Ta(e,e.type,"memo");default:return}}}function yn(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=e[t],i=o||t;return s==null?null:s&&s.nodeType!==1?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const _d=p.oneOfType([p.func,p.object]),oi=_d;function We(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Ft(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Pd(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Id(e,t=166){let n;function r(...o){const s=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(s,t)}return r.clear=()=>{clearTimeout(n)},r}function $d(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,s,i)=>{const l=o||"<<anonymous>>",c=i||r;return typeof n[r]<"u"?new Error(`The ${s} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function Md(e,t){var n,r;return A.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Jn(e){return e&&e.ownerDocument||document}function Ad(e){return Jn(e).defaultView||window}function Dd(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?O({},t.propTypes):null;return o=>(s,i,l,c,d,...u)=>{const f=d||i,w=n==null?void 0:n[f];if(w){const g=w(s,i,l,c,d,...u);if(g)return g}return typeof s[i]<"u"&&!s[o]?new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Zn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Bd=typeof window<"u"?A.useLayoutEffect:A.useEffect,Lt=Bd;let Ra=0;function zd(e){const[t,n]=A.useState(e),r=e||t;return A.useEffect(()=>{t==null&&(Ra+=1,n(`mui-${Ra}`))},[t]),r}const Oa=A["useId".toString()];function ai(e){if(Oa!==void 0){const t=Oa();return e??t}return zd(e)}function Vd(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=o||t;return typeof e[t]<"u"?new Error(`The prop \`${s}\` is not supported. Please remove it.`):null}function si({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=A.useRef(e!==void 0),[s,i]=A.useState(t),l=o?e:s;if(process.env.NODE_ENV!=="production"){A.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:d}=A.useRef(t);A.useEffect(()=>{!o&&d!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=A.useCallback(d=>{o||i(d)},[]);return[l,c]}function Qr(e){const t=A.useRef(e);return Lt(()=>{t.current=e}),A.useRef((...n)=>(0,t.current)(...n)).current}function St(...e){return A.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Zn(n,t)})},e)}const _a={};function Fd(e,t){const n=A.useRef(_a);return n.current===_a&&(n.current=e(t)),n}const Ld=[];function Gd(e){A.useEffect(e,Ld)}class _n{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new _n}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function un(){const e=Fd(_n.create).current;return Gd(e.disposeEffect),e}let pr=!0,eo=!1;const Ud=new _n,qd={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Hd(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&qd[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Xd(e){e.metaKey||e.altKey||e.ctrlKey||(pr=!0)}function Vr(){pr=!1}function Yd(){this.visibilityState==="hidden"&&eo&&(pr=!0)}function Wd(e){e.addEventListener("keydown",Xd,!0),e.addEventListener("mousedown",Vr,!0),e.addEventListener("pointerdown",Vr,!0),e.addEventListener("touchstart",Vr,!0),e.addEventListener("visibilitychange",Yd,!0)}function Kd(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return pr||Hd(t)}function ii(){const e=A.useCallback(o=>{o!=null&&Wd(o.ownerDocument)},[]),t=A.useRef(!1);function n(){return t.current?(eo=!0,Ud.start(100,()=>{eo=!1}),t.current=!1,!0):!1}function r(o){return Kd(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function li(e,t){const n=O({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=O({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},s=t[r];n[r]={},!s||!Object.keys(s)?n[r]=o:!o||!Object.keys(o)?n[r]=s:(n[r]=O({},s),Object.keys(o).forEach(i=>{n[r][i]=li(o[i],s[i])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function _o(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((s,i)=>{if(i){const l=t(i);l!==""&&s.push(l),n&&n[i]&&s.push(n[i])}return s},[]).join(" ")}),r}const Pa=e=>e,Jd=()=>{let e=Pa;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Pa}}},Zd=Jd(),ci=Zd,di={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function wr(e,t,n="Mui"){const r=di[t];return r?`${n}-${r}`:`${ci.generate(e)}-${t}`}function ui(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=wr(e,o,n)}),r}function Qd(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Ne(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,s;for(s=0;s<r.length;s++)o=r[s],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}const eu=["values","unit","step"],tu=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>O({},n,{[r.key]:r.val}),{})};function nu(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=Ne(e,eu),s=tu(t),i=Object.keys(s);function l(w){return`@media (min-width:${typeof t[w]=="number"?t[w]:w}${n})`}function c(w){return`@media (max-width:${(typeof t[w]=="number"?t[w]:w)-r/100}${n})`}function d(w,g){const x=i.indexOf(g);return`@media (min-width:${typeof t[w]=="number"?t[w]:w}${n}) and (max-width:${(x!==-1&&typeof t[i[x]]=="number"?t[i[x]]:g)-r/100}${n})`}function u(w){return i.indexOf(w)+1<i.length?d(w,i[i.indexOf(w)+1]):l(w)}function f(w){const g=i.indexOf(w);return g===0?l(i[1]):g===i.length-1?c(i[g]):d(w,i[i.indexOf(w)+1]).replace("@media","@media not all and")}return O({keys:i,values:s,up:l,down:c,between:d,only:u,not:f,unit:n},o)}const ru={borderRadius:4},ou=ru,au=process.env.NODE_ENV!=="production"?p.oneOfType([p.number,p.string,p.object,p.array]):{},ct=au;function hn(e,t){return t?et(e,t,{clone:!1}):e}const Po={xs:0,sm:600,md:900,lg:1200,xl:1536},Ia={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Po[e]}px)`};function tt(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const s=r.breakpoints||Ia;return t.reduce((i,l,c)=>(i[s.up(s.keys[c])]=n(t[c]),i),{})}if(typeof t=="object"){const s=r.breakpoints||Ia;return Object.keys(t).reduce((i,l)=>{if(Object.keys(s.values||Po).indexOf(l)!==-1){const c=s.up(l);i[c]=n(t[l],l)}else{const c=l;i[c]=t[c]}return i},{})}return n(t)}function su(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const s=e.up(o);return r[s]={},r},{}))||{}}function iu(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function fr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,s)=>o&&o[s]?o[s]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function Qn(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=fr(e,n)||r,t&&(o=t(o,r,e)),o}function be(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,s=i=>{if(i[t]==null)return null;const l=i[t],c=i.theme,d=fr(c,r)||{};return tt(i,l,f=>{let w=Qn(d,o,f);return f===w&&typeof f=="string"&&(w=Qn(d,o,`${t}${f==="default"?"":We(f)}`,f)),n===!1?w:{[n]:w}})};return s.propTypes=process.env.NODE_ENV!=="production"?{[t]:ct}:{},s.filterProps=[t],s}function lu(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const cu={m:"margin",p:"padding"},du={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},$a={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},uu=lu(e=>{if(e.length>2)if($a[e])e=$a[e];else return[e];const[t,n]=e.split(""),r=cu[t],o=du[n]||"";return Array.isArray(o)?o.map(s=>r+s):[r+o]}),mr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],hr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],pu=[...mr,...hr];function Pn(e,t,n,r){var o;const s=(o=fr(e,t,!1))!=null?o:n;return typeof s=="number"?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&typeof i!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`),s*i):Array.isArray(s)?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&(Number.isInteger(i)?i>s.length-1&&console.error([`MUI: The value provided (${i}) overflows.`,`The supported values are: ${JSON.stringify(s)}.`,`${i} > ${s.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),s[i]):typeof s=="function"?s:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${s}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function pi(e){return Pn(e,"spacing",8,"spacing")}function In(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function wu(e,t){return n=>e.reduce((r,o)=>(r[o]=In(t,n),r),{})}function fu(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=uu(n),s=wu(o,r),i=e[n];return tt(e,i,s)}function wi(e,t){const n=pi(e.theme);return Object.keys(e).map(r=>fu(e,t,r,n)).reduce(hn,{})}function me(e){return wi(e,mr)}me.propTypes=process.env.NODE_ENV!=="production"?mr.reduce((e,t)=>(e[t]=ct,e),{}):{};me.filterProps=mr;function he(e){return wi(e,hr)}he.propTypes=process.env.NODE_ENV!=="production"?hr.reduce((e,t)=>(e[t]=ct,e),{}):{};he.filterProps=hr;process.env.NODE_ENV!=="production"&&pu.reduce((e,t)=>(e[t]=ct,e),{});function mu(e=8){if(e.mui)return e;const t=pi({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(s=>{const i=t(s);return typeof i=="number"?`${i}px`:i}).join(" "));return n.mui=!0,n}function gr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(s=>{r[s]=o}),r),{}),n=r=>Object.keys(r).reduce((o,s)=>t[s]?hn(o,t[s](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function ze(e){return typeof e!="number"?e:`${e}px solid`}function Ge(e,t){return be({prop:e,themeKey:"borders",transform:t})}const hu=Ge("border",ze),gu=Ge("borderTop",ze),bu=Ge("borderRight",ze),vu=Ge("borderBottom",ze),xu=Ge("borderLeft",ze),yu=Ge("borderColor"),Nu=Ge("borderTopColor"),ku=Ge("borderRightColor"),Su=Ge("borderBottomColor"),ju=Ge("borderLeftColor"),Eu=Ge("outline",ze),Cu=Ge("outlineColor"),br=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Pn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:In(t,r)});return tt(e,e.borderRadius,n)}return null};br.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:ct}:{};br.filterProps=["borderRadius"];gr(hu,gu,bu,vu,xu,yu,Nu,ku,Su,ju,br,Eu,Cu);const vr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Pn(e.theme,"spacing",8,"gap"),n=r=>({gap:In(t,r)});return tt(e,e.gap,n)}return null};vr.propTypes=process.env.NODE_ENV!=="production"?{gap:ct}:{};vr.filterProps=["gap"];const xr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Pn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:In(t,r)});return tt(e,e.columnGap,n)}return null};xr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:ct}:{};xr.filterProps=["columnGap"];const yr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Pn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:In(t,r)});return tt(e,e.rowGap,n)}return null};yr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:ct}:{};yr.filterProps=["rowGap"];const Tu=be({prop:"gridColumn"}),Ru=be({prop:"gridRow"}),Ou=be({prop:"gridAutoFlow"}),_u=be({prop:"gridAutoColumns"}),Pu=be({prop:"gridAutoRows"}),Iu=be({prop:"gridTemplateColumns"}),$u=be({prop:"gridTemplateRows"}),Mu=be({prop:"gridTemplateAreas"}),Au=be({prop:"gridArea"});gr(vr,xr,yr,Tu,Ru,Ou,_u,Pu,Iu,$u,Mu,Au);function zt(e,t){return t==="grey"?t:e}const Du=be({prop:"color",themeKey:"palette",transform:zt}),Bu=be({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:zt}),zu=be({prop:"backgroundColor",themeKey:"palette",transform:zt});gr(Du,Bu,zu);function Me(e){return e<=1&&e!==0?`${e*100}%`:e}const Vu=be({prop:"width",transform:Me}),Io=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const s=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Po[n];return s?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${s}${e.theme.breakpoints.unit}`}:{maxWidth:s}:{maxWidth:Me(n)}};return tt(e,e.maxWidth,t)}return null};Io.filterProps=["maxWidth"];const Fu=be({prop:"minWidth",transform:Me}),Lu=be({prop:"height",transform:Me}),Gu=be({prop:"maxHeight",transform:Me}),Uu=be({prop:"minHeight",transform:Me});be({prop:"size",cssProperty:"width",transform:Me});be({prop:"size",cssProperty:"height",transform:Me});const qu=be({prop:"boxSizing"});gr(Vu,Io,Fu,Lu,Gu,Uu,qu);const Hu={border:{themeKey:"borders",transform:ze},borderTop:{themeKey:"borders",transform:ze},borderRight:{themeKey:"borders",transform:ze},borderBottom:{themeKey:"borders",transform:ze},borderLeft:{themeKey:"borders",transform:ze},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:ze},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:br},color:{themeKey:"palette",transform:zt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:zt},backgroundColor:{themeKey:"palette",transform:zt},p:{style:he},pt:{style:he},pr:{style:he},pb:{style:he},pl:{style:he},px:{style:he},py:{style:he},padding:{style:he},paddingTop:{style:he},paddingRight:{style:he},paddingBottom:{style:he},paddingLeft:{style:he},paddingX:{style:he},paddingY:{style:he},paddingInline:{style:he},paddingInlineStart:{style:he},paddingInlineEnd:{style:he},paddingBlock:{style:he},paddingBlockStart:{style:he},paddingBlockEnd:{style:he},m:{style:me},mt:{style:me},mr:{style:me},mb:{style:me},ml:{style:me},mx:{style:me},my:{style:me},margin:{style:me},marginTop:{style:me},marginRight:{style:me},marginBottom:{style:me},marginLeft:{style:me},marginX:{style:me},marginY:{style:me},marginInline:{style:me},marginInlineStart:{style:me},marginInlineEnd:{style:me},marginBlock:{style:me},marginBlockStart:{style:me},marginBlockEnd:{style:me},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:vr},rowGap:{style:yr},columnGap:{style:xr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Me},maxWidth:{style:Io},minWidth:{transform:Me},height:{transform:Me},maxHeight:{transform:Me},minHeight:{transform:Me},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},$o=Hu;function Xu(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Yu(e,t){return typeof e=="function"?e(t):e}function Wu(){function e(n,r,o,s){const i={[n]:r,theme:o},l=s[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:d,transform:u,style:f}=l;if(r==null)return null;if(d==="typography"&&r==="inherit")return{[n]:r};const w=fr(o,d)||{};return f?f(i):tt(i,r,x=>{let m=Qn(w,u,x);return x===m&&typeof x=="string"&&(m=Qn(w,u,`${n}${x==="default"?"":We(x)}`,x)),c===!1?m:{[c]:m}})}function t(n){var r;const{sx:o,theme:s={}}=n||{};if(!o)return null;const i=(r=s.unstable_sxConfig)!=null?r:$o;function l(c){let d=c;if(typeof c=="function")d=c(s);else if(typeof c!="object")return c;if(!d)return null;const u=su(s.breakpoints),f=Object.keys(u);let w=u;return Object.keys(d).forEach(g=>{const x=Yu(d[g],s);if(x!=null)if(typeof x=="object")if(i[g])w=hn(w,e(g,x,s,i));else{const m=tt({theme:s},x,h=>({[g]:h}));Xu(m,x)?w[g]=t({sx:x,theme:s}):w=hn(w,m)}else w=hn(w,e(g,x,s,i))}),iu(f,w)}return Array.isArray(o)?o.map(l):l(o)}return t}const fi=Wu();fi.filterProps=["sx"];const Mo=fi;function Ku(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Ju=["breakpoints","palette","spacing","shape"];function Ao(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:s={}}=e,i=Ne(e,Ju),l=nu(n),c=mu(o);let d=et({breakpoints:l,direction:"ltr",components:{},palette:O({mode:"light"},r),spacing:c,shape:O({},ou,s)},i);return d.applyStyles=Ku,d=t.reduce((u,f)=>et(u,f),d),d.unstable_sxConfig=O({},$o,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(f){return Mo({sx:f,theme:this})},d}function Zu(e){return Object.keys(e).length===0}function mi(e=null){const t=A.useContext(Ur.ThemeContext);return!t||Zu(t)?e:t}const Qu=Ao();function hi(e=Qu){return mi(e)}const ep=["ownerState"],tp=["variants"],np=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function rp(e){return Object.keys(e).length===0}function op(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Hn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const ap=Ao(),Ma=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Ln({defaultTheme:e,theme:t,themeId:n}){return rp(t)?e:t[n]||t}function sp(e){return e?(t,n)=>n[e]:null}function Xn(e,t){let{ownerState:n}=t,r=Ne(t,ep);const o=typeof e=="function"?e(O({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(s=>Xn(s,O({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:s=[]}=o;let l=Ne(o,tp);return s.forEach(c=>{let d=!0;typeof c.props=="function"?d=c.props(O({ownerState:n},r,n)):Object.keys(c.props).forEach(u=>{(n==null?void 0:n[u])!==c.props[u]&&r[u]!==c.props[u]&&(d=!1)}),d&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(O({ownerState:n},r,n)):c.style))}),l}return o}function ip(e={}){const{themeId:t,defaultTheme:n=ap,rootShouldForwardProp:r=Hn,slotShouldForwardProp:o=Hn}=e,s=i=>Mo(O({},i,{theme:Ln(O({},i,{defaultTheme:n,themeId:t}))}));return s.__mui_systemSx=!0,(i,l={})=>{Ur.internal_processStyles(i,v=>v.filter(R=>!(R!=null&&R.__mui_systemSx)));const{name:c,slot:d,skipVariantsResolver:u,skipSx:f,overridesResolver:w=sp(Ma(d))}=l,g=Ne(l,np),x=u!==void 0?u:d&&d!=="Root"&&d!=="root"||!1,m=f||!1;let h;process.env.NODE_ENV!=="production"&&c&&(h=`${c}-${Ma(d||"Root")}`);let k=Hn;d==="Root"||d==="root"?k=r:d?k=o:op(i)&&(k=void 0);const j=Ur(i,O({shouldForwardProp:k,label:h},g)),E=v=>typeof v=="function"&&v.__emotion_real!==v||bt(v)?R=>Xn(v,O({},R,{theme:Ln({theme:R.theme,defaultTheme:n,themeId:t})})):v,S=(v,...R)=>{let V=E(v);const T=R?R.map(E):[];c&&w&&T.push(M=>{const P=Ln(O({},M,{defaultTheme:n,themeId:t}));if(!P.components||!P.components[c]||!P.components[c].styleOverrides)return null;const $=P.components[c].styleOverrides,q={};return Object.entries($).forEach(([L,D])=>{q[L]=Xn(D,O({},M,{theme:P}))}),w(M,q)}),c&&!x&&T.push(M=>{var P;const $=Ln(O({},M,{defaultTheme:n,themeId:t})),q=$==null||(P=$.components)==null||(P=P[c])==null?void 0:P.variants;return Xn({variants:q},O({},M,{theme:$}))}),m||T.push(s);const _=T.length-R.length;if(Array.isArray(v)&&_>0){const M=new Array(_).fill("");V=[...v,...M],V.raw=[...v.raw,...M]}const F=j(V,...T);if(process.env.NODE_ENV!=="production"){let M;c&&(M=`${c}${We(d||"")}`),M===void 0&&(M=`Styled(${Od(i)})`),F.displayName=M}return i.muiName&&(F.muiName=i.muiName),F};return j.withConfig&&(S.withConfig=j.withConfig),S}}function lp(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:li(t.components[n].defaultProps,r)}function cp({props:e,name:t,defaultTheme:n,themeId:r}){let o=hi(n);return r&&(o=o[r]||o),lp({theme:o,name:t,props:e})}function Do(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Qd(e,t,n)}function dp(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function jt(e){if(e.type)return e;if(e.charAt(0)==="#")return jt(dp(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Ft(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Ft(10,o))}else r=r.split(",");return r=r.map(s=>parseFloat(s)),{type:n,values:r,colorSpace:o}}function Nr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,s)=>s<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function up(e){e=jt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,s=r*Math.min(o,1-o),i=(d,u=(d+n/30)%12)=>o-s*Math.max(Math.min(u-3,9-u,1),-1);let l="rgb";const c=[Math.round(i(0)*255),Math.round(i(8)*255),Math.round(i(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),Nr({type:l,values:c})}function Aa(e){e=jt(e);let t=e.type==="hsl"||e.type==="hsla"?jt(up(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Da(e,t){const n=Aa(e),r=Aa(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function gi(e,t){return e=jt(e),t=Do(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Nr(e)}function pp(e,t){if(e=jt(e),t=Do(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return Nr(e)}function wp(e,t){if(e=jt(e),t=Do(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return Nr(e)}function fp(e,t){return O({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const mp={black:"#000",white:"#fff"},Nn=mp,hp={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},gp=hp,bp={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Pt=bp,vp={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},It=vp,xp={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},an=xp,yp={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},$t=yp,Np={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Mt=Np,kp={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},At=kp,Sp=["mode","contrastThreshold","tonalOffset"],Ba={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Nn.white,default:Nn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Fr={text:{primary:Nn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Nn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function za(e,t,n,r){const o=r.light||r,s=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=wp(e.main,o):t==="dark"&&(e.dark=pp(e.main,s)))}function jp(e="light"){return e==="dark"?{main:$t[200],light:$t[50],dark:$t[400]}:{main:$t[700],light:$t[400],dark:$t[800]}}function Ep(e="light"){return e==="dark"?{main:Pt[200],light:Pt[50],dark:Pt[400]}:{main:Pt[500],light:Pt[300],dark:Pt[700]}}function Cp(e="light"){return e==="dark"?{main:It[500],light:It[300],dark:It[700]}:{main:It[700],light:It[400],dark:It[800]}}function Tp(e="light"){return e==="dark"?{main:Mt[400],light:Mt[300],dark:Mt[700]}:{main:Mt[700],light:Mt[500],dark:Mt[900]}}function Rp(e="light"){return e==="dark"?{main:At[400],light:At[300],dark:At[700]}:{main:At[800],light:At[500],dark:At[900]}}function Op(e="light"){return e==="dark"?{main:an[400],light:an[300],dark:an[700]}:{main:"#ed6c02",light:an[500],dark:an[900]}}function _p(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=Ne(e,Sp),s=e.primary||jp(t),i=e.secondary||Ep(t),l=e.error||Cp(t),c=e.info||Tp(t),d=e.success||Rp(t),u=e.warning||Op(t);function f(m){const h=Da(m,Fr.text.primary)>=n?Fr.text.primary:Ba.text.primary;if(process.env.NODE_ENV!=="production"){const k=Da(m,h);k<3&&console.error([`MUI: The contrast ratio of ${k}:1 for ${h} on ${m}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return h}const w=({color:m,name:h,mainShade:k=500,lightShade:j=300,darkShade:E=700})=>{if(m=O({},m),!m.main&&m[k]&&(m.main=m[k]),!m.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${k}\` property.`:Ft(11,h?` (${h})`:"",k));if(typeof m.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Ft(12,h?` (${h})`:"",JSON.stringify(m.main)));return za(m,"light",j,r),za(m,"dark",E,r),m.contrastText||(m.contrastText=f(m.main)),m},g={dark:Fr,light:Ba};return process.env.NODE_ENV!=="production"&&(g[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),et(O({common:O({},Nn),mode:t,primary:w({color:s,name:"primary"}),secondary:w({color:i,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:w({color:l,name:"error"}),warning:w({color:u,name:"warning"}),info:w({color:c,name:"info"}),success:w({color:d,name:"success"}),grey:gp,contrastThreshold:n,getContrastText:f,augmentColor:w,tonalOffset:r},g[t]),o)}const Pp=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Ip(e){return Math.round(e*1e5)/1e5}const Va={textTransform:"uppercase"},Fa='"Roboto", "Helvetica", "Arial", sans-serif';function $p(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Fa,fontSize:o=14,fontWeightLight:s=300,fontWeightRegular:i=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:d=16,allVariants:u,pxToRem:f}=n,w=Ne(n,Pp);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof d!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const g=o/14,x=f||(k=>`${k/d*g}rem`),m=(k,j,E,S,v)=>O({fontFamily:r,fontWeight:k,fontSize:x(j),lineHeight:E},r===Fa?{letterSpacing:`${Ip(S/j)}em`}:{},v,u),h={h1:m(s,96,1.167,-1.5),h2:m(s,60,1.2,-.5),h3:m(i,48,1.167,0),h4:m(i,34,1.235,.25),h5:m(i,24,1.334,0),h6:m(l,20,1.6,.15),subtitle1:m(i,16,1.75,.15),subtitle2:m(l,14,1.57,.1),body1:m(i,16,1.5,.15),body2:m(i,14,1.43,.15),button:m(l,14,1.75,.4,Va),caption:m(i,12,1.66,.4),overline:m(i,12,2.66,1,Va),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return et(O({htmlFontSize:d,pxToRem:x,fontFamily:r,fontSize:o,fontWeightLight:s,fontWeightRegular:i,fontWeightMedium:l,fontWeightBold:c},h),w,{clone:!1})}const Mp=.2,Ap=.14,Dp=.12;function fe(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Mp})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Ap})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Dp})`].join(",")}const Bp=["none",fe(0,2,1,-1,0,1,1,0,0,1,3,0),fe(0,3,1,-2,0,2,2,0,0,1,5,0),fe(0,3,3,-2,0,3,4,0,0,1,8,0),fe(0,2,4,-1,0,4,5,0,0,1,10,0),fe(0,3,5,-1,0,5,8,0,0,1,14,0),fe(0,3,5,-1,0,6,10,0,0,1,18,0),fe(0,4,5,-2,0,7,10,1,0,2,16,1),fe(0,5,5,-3,0,8,10,1,0,3,14,2),fe(0,5,6,-3,0,9,12,1,0,3,16,2),fe(0,6,6,-3,0,10,14,1,0,4,18,3),fe(0,6,7,-4,0,11,15,1,0,4,20,3),fe(0,7,8,-4,0,12,17,2,0,5,22,4),fe(0,7,8,-4,0,13,19,2,0,5,24,4),fe(0,7,9,-4,0,14,21,2,0,5,26,4),fe(0,8,9,-5,0,15,22,2,0,6,28,5),fe(0,8,10,-5,0,16,24,2,0,6,30,5),fe(0,8,11,-5,0,17,26,2,0,6,32,5),fe(0,9,11,-5,0,18,28,2,0,7,34,6),fe(0,9,12,-6,0,19,29,2,0,7,36,6),fe(0,10,13,-6,0,20,31,3,0,8,38,7),fe(0,10,13,-6,0,21,33,3,0,8,40,7),fe(0,10,14,-6,0,22,35,3,0,8,42,7),fe(0,11,14,-7,0,23,36,3,0,9,44,8),fe(0,11,15,-7,0,24,38,3,0,9,46,8)],zp=Bp,Vp=["duration","easing","delay"],Fp={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Lp={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function La(e){return`${Math.round(e)}ms`}function Gp(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Up(e){const t=O({},Fp,e.easing),n=O({},Lp,e.duration);return O({getAutoHeightDuration:Gp,create:(o=["all"],s={})=>{const{duration:i=n.standard,easing:l=t.easeInOut,delay:c=0}=s,d=Ne(s,Vp);if(process.env.NODE_ENV!=="production"){const u=w=>typeof w=="string",f=w=>!isNaN(parseFloat(w));!u(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!f(i)&&!u(i)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`),u(l)||console.error('MUI: Argument "easing" must be a string.'),!f(c)&&!u(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof s!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(d).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(u=>`${u} ${typeof i=="string"?i:La(i)} ${l} ${typeof c=="string"?c:La(c)}`).join(",")}},e,{easing:t,duration:n})}const qp={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Hp=qp,Xp=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Yp(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:s={}}=e,i=Ne(e,Xp);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Ft(18));const l=_p(r),c=Ao(e);let d=et(c,{mixins:fp(c.breakpoints,n),palette:l,shadows:zp.slice(),typography:$p(l,s),transitions:Up(o),zIndex:O({},Hp)});if(d=et(d,i),d=t.reduce((u,f)=>et(u,f),d),process.env.NODE_ENV!=="production"){const u=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],f=(w,g)=>{let x;for(x in w){const m=w[x];if(u.indexOf(x)!==-1&&Object.keys(m).length>0){if(process.env.NODE_ENV!=="production"){const h=wr("",x);console.error([`MUI: The \`${g}\` component increases the CSS specificity of the \`${x}\` internal state.`,"You can not override it like this: ",JSON.stringify(w,null,2),"",`Instead, you need to use the '&.${h}' syntax:`,JSON.stringify({root:{[`&.${h}`]:m}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}w[x]={}}}};Object.keys(d.components).forEach(w=>{const g=d.components[w].styleOverrides;g&&w.indexOf("Mui")===0&&f(g,w)})}return d.unstable_sxConfig=O({},$o,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(f){return Mo({sx:f,theme:this})},d}const Wp=Yp(),Bo=Wp,zo="$$material";function Vo({props:e,name:t}){return cp({props:e,name:t,defaultTheme:Bo,themeId:zo})}const Kp=e=>Hn(e)&&e!=="classes",Jp=ip({themeId:zo,defaultTheme:Bo,rootShouldForwardProp:Kp}),$n=Jp;function Zp(e){return wr("MuiSvgIcon",e)}ui("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Qp=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],ew=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${We(t)}`,`fontSize${We(n)}`]};return _o(o,Zp,r)},tw=$n("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${We(n.color)}`],t[`fontSize${We(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,s,i,l,c,d,u,f,w,g,x;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((s=e.typography)==null||(i=s.pxToRem)==null?void 0:i.call(s,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((d=e.typography)==null||(u=d.pxToRem)==null?void 0:u.call(d,35))||"2.1875rem"}[t.fontSize],color:(f=(w=(e.vars||e).palette)==null||(w=w[t.color])==null?void 0:w.main)!=null?f:{action:(g=(e.vars||e).palette)==null||(g=g.action)==null?void 0:g.active,disabled:(x=(e.vars||e).palette)==null||(x=x.action)==null?void 0:x.disabled,inherit:void 0}[t.color]}}),Fo=A.forwardRef(function(t,n){const r=Vo({props:t,name:"MuiSvgIcon"}),{children:o,className:s,color:i="inherit",component:l="svg",fontSize:c="medium",htmlColor:d,inheritViewBox:u=!1,titleAccess:f,viewBox:w="0 0 24 24"}=r,g=Ne(r,Qp),x=A.isValidElement(o)&&o.type==="svg",m=O({},r,{color:i,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:u,viewBox:w,hasSvgAsChild:x}),h={};u||(h.viewBox=w);const k=ew(m);return a.jsxs(tw,O({as:l,className:at(k.root,s),focusable:"false",color:d,"aria-hidden":f?void 0:!0,role:f?"img":void 0,ref:n},h,g,x&&o.props,{ownerState:m,children:[x?o.props.children:o,f?a.jsx("title",{children:f}):null]}))});process.env.NODE_ENV!=="production"&&(Fo.propTypes={children:p.node,classes:p.object,className:p.string,color:p.oneOfType([p.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),p.string]),component:p.elementType,fontSize:p.oneOfType([p.oneOf(["inherit","large","medium","small"]),p.string]),htmlColor:p.string,inheritViewBox:p.bool,shapeRendering:p.string,sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),titleAccess:p.string,viewBox:p.string});Fo.muiName="SvgIcon";const Ga=Fo;function bi(e,t){function n(r,o){return a.jsx(Ga,O({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Ga.muiName,A.memo(A.forwardRef(n))}const nw={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),ci.configure(e)}},rw=Object.freeze(Object.defineProperty({__proto__:null,capitalize:We,createChainedFunction:Pd,createSvgIcon:bi,debounce:Id,deprecatedPropType:$d,isMuiElement:Md,ownerDocument:Jn,ownerWindow:Ad,requirePropFactory:Dd,setRef:Zn,unstable_ClassNameGenerator:nw,unstable_useEnhancedEffect:Lt,unstable_useId:ai,unsupportedProp:Vd,useControlled:si,useEventCallback:Qr,useForkRef:St,useIsFocusVisible:ii},Symbol.toStringTag,{value:"Module"})),ow=pd(rw);var Ua;function aw(){return Ua||(Ua=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=ow}(Ir)),Ir}var sw=wd;Object.defineProperty(To,"__esModule",{value:!0});var vi=To.default=void 0,iw=sw(aw()),lw=a;vi=To.default=(0,iw.default)((0,lw.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function cw(e){return typeof e=="string"}function pn(e,t,n){return e===void 0||cw(e)?t:O({},t,{ownerState:O({},t.ownerState,n)})}const dw={disableDefaultClasses:!1},uw=A.createContext(dw);function pw(e){const{disableDefaultClasses:t}=A.useContext(uw);return n=>t?"":e(n)}function ww(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function fw(e,t,n){return typeof e=="function"?e(t,n):e}function qa(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function mw(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:s}=e;if(!t){const g=at(n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),x=O({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),m=O({},n,o,r);return g.length>0&&(m.className=g),Object.keys(x).length>0&&(m.style=x),{props:m,internalRef:void 0}}const i=ww(O({},o,r)),l=qa(r),c=qa(o),d=t(i),u=at(d==null?void 0:d.className,n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),f=O({},d==null?void 0:d.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),w=O({},d,n,c,l);return u.length>0&&(w.className=u),Object.keys(f).length>0&&(w.style=f),{props:w,internalRef:d.ref}}const hw=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function gw(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:s=!1}=e,i=Ne(e,hw),l=s?{}:fw(r,o),{props:c,internalRef:d}=mw(O({},i,{externalSlotProps:l})),u=St(d,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return pn(n,O({},c,{ref:u}),o)}const xi="base";function bw(e){return`${xi}--${e}`}function vw(e,t){return`${xi}-${e}-${t}`}function yi(e,t){const n=di[t];return n?bw(n):vw(e,t)}function xw(e,t){const n={};return t.forEach(r=>{n[r]=yi(e,r)}),n}function yw(e){return typeof e=="function"?e():e}const er=A.forwardRef(function(t,n){const{children:r,container:o,disablePortal:s=!1}=t,[i,l]=A.useState(null),c=St(A.isValidElement(r)?r.ref:null,n);if(Lt(()=>{s||l(yw(o)||document.body)},[o,s]),Lt(()=>{if(i&&!s)return Zn(n,i),()=>{Zn(n,null)}},[n,i,s]),s){if(A.isValidElement(r)){const d={ref:c};return A.cloneElement(r,d)}return a.jsx(A.Fragment,{children:r})}return a.jsx(A.Fragment,{children:i&&$l.createPortal(r,i)})});process.env.NODE_ENV!=="production"&&(er.propTypes={children:p.node,container:p.oneOfType([yn,p.func]),disablePortal:p.bool});process.env.NODE_ENV!=="production"&&(er["propTypes"]=jd(er.propTypes));var Te="top",Fe="bottom",Le="right",Re="left",Lo="auto",Mn=[Te,Fe,Le,Re],Gt="start",kn="end",Nw="clippingParents",Ni="viewport",sn="popper",kw="reference",Ha=Mn.reduce(function(e,t){return e.concat([t+"-"+Gt,t+"-"+kn])},[]),ki=[].concat(Mn,[Lo]).reduce(function(e,t){return e.concat([t,t+"-"+Gt,t+"-"+kn])},[]),Sw="beforeRead",jw="read",Ew="afterRead",Cw="beforeMain",Tw="main",Rw="afterMain",Ow="beforeWrite",_w="write",Pw="afterWrite",Iw=[Sw,jw,Ew,Cw,Tw,Rw,Ow,_w,Pw];function Ke(e){return e?(e.nodeName||"").toLowerCase():null}function De(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Et(e){var t=De(e).Element;return e instanceof t||e instanceof Element}function Ve(e){var t=De(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Go(e){if(typeof ShadowRoot>"u")return!1;var t=De(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function $w(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},s=t.elements[n];!Ve(s)||!Ke(s)||(Object.assign(s.style,r),Object.keys(o).forEach(function(i){var l=o[i];l===!1?s.removeAttribute(i):s.setAttribute(i,l===!0?"":l)}))})}function Mw(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],s=t.attributes[r]||{},i=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=i.reduce(function(c,d){return c[d]="",c},{});!Ve(o)||!Ke(o)||(Object.assign(o.style,l),Object.keys(s).forEach(function(c){o.removeAttribute(c)}))})}}const Aw={name:"applyStyles",enabled:!0,phase:"write",fn:$w,effect:Mw,requires:["computeStyles"]};function Xe(e){return e.split("-")[0]}var vt=Math.max,tr=Math.min,Ut=Math.round;function to(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Si(){return!/^((?!chrome|android).)*safari/i.test(to())}function qt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,s=1;t&&Ve(e)&&(o=e.offsetWidth>0&&Ut(r.width)/e.offsetWidth||1,s=e.offsetHeight>0&&Ut(r.height)/e.offsetHeight||1);var i=Et(e)?De(e):window,l=i.visualViewport,c=!Si()&&n,d=(r.left+(c&&l?l.offsetLeft:0))/o,u=(r.top+(c&&l?l.offsetTop:0))/s,f=r.width/o,w=r.height/s;return{width:f,height:w,top:u,right:d+f,bottom:u+w,left:d,x:d,y:u}}function Uo(e){var t=qt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function ji(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Go(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function nt(e){return De(e).getComputedStyle(e)}function Dw(e){return["table","td","th"].indexOf(Ke(e))>=0}function dt(e){return((Et(e)?e.ownerDocument:e.document)||window.document).documentElement}function kr(e){return Ke(e)==="html"?e:e.assignedSlot||e.parentNode||(Go(e)?e.host:null)||dt(e)}function Xa(e){return!Ve(e)||nt(e).position==="fixed"?null:e.offsetParent}function Bw(e){var t=/firefox/i.test(to()),n=/Trident/i.test(to());if(n&&Ve(e)){var r=nt(e);if(r.position==="fixed")return null}var o=kr(e);for(Go(o)&&(o=o.host);Ve(o)&&["html","body"].indexOf(Ke(o))<0;){var s=nt(o);if(s.transform!=="none"||s.perspective!=="none"||s.contain==="paint"||["transform","perspective"].indexOf(s.willChange)!==-1||t&&s.willChange==="filter"||t&&s.filter&&s.filter!=="none")return o;o=o.parentNode}return null}function An(e){for(var t=De(e),n=Xa(e);n&&Dw(n)&&nt(n).position==="static";)n=Xa(n);return n&&(Ke(n)==="html"||Ke(n)==="body"&&nt(n).position==="static")?t:n||Bw(e)||t}function qo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function gn(e,t,n){return vt(e,tr(t,n))}function zw(e,t,n){var r=gn(e,t,n);return r>n?n:r}function Ei(){return{top:0,right:0,bottom:0,left:0}}function Ci(e){return Object.assign({},Ei(),e)}function Ti(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Vw=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Ci(typeof t!="number"?t:Ti(t,Mn))};function Fw(e){var t,n=e.state,r=e.name,o=e.options,s=n.elements.arrow,i=n.modifiersData.popperOffsets,l=Xe(n.placement),c=qo(l),d=[Re,Le].indexOf(l)>=0,u=d?"height":"width";if(!(!s||!i)){var f=Vw(o.padding,n),w=Uo(s),g=c==="y"?Te:Re,x=c==="y"?Fe:Le,m=n.rects.reference[u]+n.rects.reference[c]-i[c]-n.rects.popper[u],h=i[c]-n.rects.reference[c],k=An(s),j=k?c==="y"?k.clientHeight||0:k.clientWidth||0:0,E=m/2-h/2,S=f[g],v=j-w[u]-f[x],R=j/2-w[u]/2+E,V=gn(S,R,v),T=c;n.modifiersData[r]=(t={},t[T]=V,t.centerOffset=V-R,t)}}function Lw(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||ji(t.elements.popper,o)&&(t.elements.arrow=o))}const Gw={name:"arrow",enabled:!0,phase:"main",fn:Fw,effect:Lw,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Ht(e){return e.split("-")[1]}var Uw={top:"auto",right:"auto",bottom:"auto",left:"auto"};function qw(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Ut(n*o)/o||0,y:Ut(r*o)/o||0}}function Ya(e){var t,n=e.popper,r=e.popperRect,o=e.placement,s=e.variation,i=e.offsets,l=e.position,c=e.gpuAcceleration,d=e.adaptive,u=e.roundOffsets,f=e.isFixed,w=i.x,g=w===void 0?0:w,x=i.y,m=x===void 0?0:x,h=typeof u=="function"?u({x:g,y:m}):{x:g,y:m};g=h.x,m=h.y;var k=i.hasOwnProperty("x"),j=i.hasOwnProperty("y"),E=Re,S=Te,v=window;if(d){var R=An(n),V="clientHeight",T="clientWidth";if(R===De(n)&&(R=dt(n),nt(R).position!=="static"&&l==="absolute"&&(V="scrollHeight",T="scrollWidth")),R=R,o===Te||(o===Re||o===Le)&&s===kn){S=Fe;var _=f&&R===v&&v.visualViewport?v.visualViewport.height:R[V];m-=_-r.height,m*=c?1:-1}if(o===Re||(o===Te||o===Fe)&&s===kn){E=Le;var F=f&&R===v&&v.visualViewport?v.visualViewport.width:R[T];g-=F-r.width,g*=c?1:-1}}var M=Object.assign({position:l},d&&Uw),P=u===!0?qw({x:g,y:m},De(n)):{x:g,y:m};if(g=P.x,m=P.y,c){var $;return Object.assign({},M,($={},$[S]=j?"0":"",$[E]=k?"0":"",$.transform=(v.devicePixelRatio||1)<=1?"translate("+g+"px, "+m+"px)":"translate3d("+g+"px, "+m+"px, 0)",$))}return Object.assign({},M,(t={},t[S]=j?m+"px":"",t[E]=k?g+"px":"",t.transform="",t))}function Hw(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,s=n.adaptive,i=s===void 0?!0:s,l=n.roundOffsets,c=l===void 0?!0:l,d={placement:Xe(t.placement),variation:Ht(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Ya(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Ya(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Xw={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Hw,data:{}};var Gn={passive:!0};function Yw(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,s=o===void 0?!0:o,i=r.resize,l=i===void 0?!0:i,c=De(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return s&&d.forEach(function(u){u.addEventListener("scroll",n.update,Gn)}),l&&c.addEventListener("resize",n.update,Gn),function(){s&&d.forEach(function(u){u.removeEventListener("scroll",n.update,Gn)}),l&&c.removeEventListener("resize",n.update,Gn)}}const Ww={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Yw,data:{}};var Kw={left:"right",right:"left",bottom:"top",top:"bottom"};function Yn(e){return e.replace(/left|right|bottom|top/g,function(t){return Kw[t]})}var Jw={start:"end",end:"start"};function Wa(e){return e.replace(/start|end/g,function(t){return Jw[t]})}function Ho(e){var t=De(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Xo(e){return qt(dt(e)).left+Ho(e).scrollLeft}function Zw(e,t){var n=De(e),r=dt(e),o=n.visualViewport,s=r.clientWidth,i=r.clientHeight,l=0,c=0;if(o){s=o.width,i=o.height;var d=Si();(d||!d&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:s,height:i,x:l+Xo(e),y:c}}function Qw(e){var t,n=dt(e),r=Ho(e),o=(t=e.ownerDocument)==null?void 0:t.body,s=vt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),i=vt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Xo(e),c=-r.scrollTop;return nt(o||n).direction==="rtl"&&(l+=vt(n.clientWidth,o?o.clientWidth:0)-s),{width:s,height:i,x:l,y:c}}function Yo(e){var t=nt(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Ri(e){return["html","body","#document"].indexOf(Ke(e))>=0?e.ownerDocument.body:Ve(e)&&Yo(e)?e:Ri(kr(e))}function bn(e,t){var n;t===void 0&&(t=[]);var r=Ri(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),s=De(r),i=o?[s].concat(s.visualViewport||[],Yo(r)?r:[]):r,l=t.concat(i);return o?l:l.concat(bn(kr(i)))}function no(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function ef(e,t){var n=qt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Ka(e,t,n){return t===Ni?no(Zw(e,n)):Et(t)?ef(t,n):no(Qw(dt(e)))}function tf(e){var t=bn(kr(e)),n=["absolute","fixed"].indexOf(nt(e).position)>=0,r=n&&Ve(e)?An(e):e;return Et(r)?t.filter(function(o){return Et(o)&&ji(o,r)&&Ke(o)!=="body"}):[]}function nf(e,t,n,r){var o=t==="clippingParents"?tf(e):[].concat(t),s=[].concat(o,[n]),i=s[0],l=s.reduce(function(c,d){var u=Ka(e,d,r);return c.top=vt(u.top,c.top),c.right=tr(u.right,c.right),c.bottom=tr(u.bottom,c.bottom),c.left=vt(u.left,c.left),c},Ka(e,i,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function Oi(e){var t=e.reference,n=e.element,r=e.placement,o=r?Xe(r):null,s=r?Ht(r):null,i=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Te:c={x:i,y:t.y-n.height};break;case Fe:c={x:i,y:t.y+t.height};break;case Le:c={x:t.x+t.width,y:l};break;case Re:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var d=o?qo(o):null;if(d!=null){var u=d==="y"?"height":"width";switch(s){case Gt:c[d]=c[d]-(t[u]/2-n[u]/2);break;case kn:c[d]=c[d]+(t[u]/2-n[u]/2);break}}return c}function Sn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,s=n.strategy,i=s===void 0?e.strategy:s,l=n.boundary,c=l===void 0?Nw:l,d=n.rootBoundary,u=d===void 0?Ni:d,f=n.elementContext,w=f===void 0?sn:f,g=n.altBoundary,x=g===void 0?!1:g,m=n.padding,h=m===void 0?0:m,k=Ci(typeof h!="number"?h:Ti(h,Mn)),j=w===sn?kw:sn,E=e.rects.popper,S=e.elements[x?j:w],v=nf(Et(S)?S:S.contextElement||dt(e.elements.popper),c,u,i),R=qt(e.elements.reference),V=Oi({reference:R,element:E,strategy:"absolute",placement:o}),T=no(Object.assign({},E,V)),_=w===sn?T:R,F={top:v.top-_.top+k.top,bottom:_.bottom-v.bottom+k.bottom,left:v.left-_.left+k.left,right:_.right-v.right+k.right},M=e.modifiersData.offset;if(w===sn&&M){var P=M[o];Object.keys(F).forEach(function($){var q=[Le,Fe].indexOf($)>=0?1:-1,L=[Te,Fe].indexOf($)>=0?"y":"x";F[$]+=P[L]*q})}return F}function rf(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,s=n.rootBoundary,i=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,d=c===void 0?ki:c,u=Ht(r),f=u?l?Ha:Ha.filter(function(x){return Ht(x)===u}):Mn,w=f.filter(function(x){return d.indexOf(x)>=0});w.length===0&&(w=f);var g=w.reduce(function(x,m){return x[m]=Sn(e,{placement:m,boundary:o,rootBoundary:s,padding:i})[Xe(m)],x},{});return Object.keys(g).sort(function(x,m){return g[x]-g[m]})}function of(e){if(Xe(e)===Lo)return[];var t=Yn(e);return[Wa(e),t,Wa(t)]}function af(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,s=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!0:i,c=n.fallbackPlacements,d=n.padding,u=n.boundary,f=n.rootBoundary,w=n.altBoundary,g=n.flipVariations,x=g===void 0?!0:g,m=n.allowedAutoPlacements,h=t.options.placement,k=Xe(h),j=k===h,E=c||(j||!x?[Yn(h)]:of(h)),S=[h].concat(E).reduce(function(z,W){return z.concat(Xe(W)===Lo?rf(t,{placement:W,boundary:u,rootBoundary:f,padding:d,flipVariations:x,allowedAutoPlacements:m}):W)},[]),v=t.rects.reference,R=t.rects.popper,V=new Map,T=!0,_=S[0],F=0;F<S.length;F++){var M=S[F],P=Xe(M),$=Ht(M)===Gt,q=[Te,Fe].indexOf(P)>=0,L=q?"width":"height",D=Sn(t,{placement:M,boundary:u,rootBoundary:f,altBoundary:w,padding:d}),Q=q?$?Le:Re:$?Fe:Te;v[L]>R[L]&&(Q=Yn(Q));var se=Yn(Q),oe=[];if(s&&oe.push(D[P]<=0),l&&oe.push(D[Q]<=0,D[se]<=0),oe.every(function(z){return z})){_=M,T=!1;break}V.set(M,oe)}if(T)for(var y=x?3:1,C=function(W){var X=S.find(function(Y){var H=V.get(Y);if(H)return H.slice(0,W).every(function(Z){return Z})});if(X)return _=X,"break"},G=y;G>0;G--){var U=C(G);if(U==="break")break}t.placement!==_&&(t.modifiersData[r]._skip=!0,t.placement=_,t.reset=!0)}}const sf={name:"flip",enabled:!0,phase:"main",fn:af,requiresIfExists:["offset"],data:{_skip:!1}};function Ja(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Za(e){return[Te,Le,Fe,Re].some(function(t){return e[t]>=0})}function lf(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,s=t.modifiersData.preventOverflow,i=Sn(t,{elementContext:"reference"}),l=Sn(t,{altBoundary:!0}),c=Ja(i,r),d=Ja(l,o,s),u=Za(c),f=Za(d);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:d,isReferenceHidden:u,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":f})}const cf={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:lf};function df(e,t,n){var r=Xe(e),o=[Re,Te].indexOf(r)>=0?-1:1,s=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,i=s[0],l=s[1];return i=i||0,l=(l||0)*o,[Re,Le].indexOf(r)>=0?{x:l,y:i}:{x:i,y:l}}function uf(e){var t=e.state,n=e.options,r=e.name,o=n.offset,s=o===void 0?[0,0]:o,i=ki.reduce(function(u,f){return u[f]=df(f,t.rects,s),u},{}),l=i[t.placement],c=l.x,d=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=d),t.modifiersData[r]=i}const pf={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:uf};function wf(e){var t=e.state,n=e.name;t.modifiersData[n]=Oi({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const ff={name:"popperOffsets",enabled:!0,phase:"read",fn:wf,data:{}};function mf(e){return e==="x"?"y":"x"}function hf(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,s=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!1:i,c=n.boundary,d=n.rootBoundary,u=n.altBoundary,f=n.padding,w=n.tether,g=w===void 0?!0:w,x=n.tetherOffset,m=x===void 0?0:x,h=Sn(t,{boundary:c,rootBoundary:d,padding:f,altBoundary:u}),k=Xe(t.placement),j=Ht(t.placement),E=!j,S=qo(k),v=mf(S),R=t.modifiersData.popperOffsets,V=t.rects.reference,T=t.rects.popper,_=typeof m=="function"?m(Object.assign({},t.rects,{placement:t.placement})):m,F=typeof _=="number"?{mainAxis:_,altAxis:_}:Object.assign({mainAxis:0,altAxis:0},_),M=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,P={x:0,y:0};if(R){if(s){var $,q=S==="y"?Te:Re,L=S==="y"?Fe:Le,D=S==="y"?"height":"width",Q=R[S],se=Q+h[q],oe=Q-h[L],y=g?-T[D]/2:0,C=j===Gt?V[D]:T[D],G=j===Gt?-T[D]:-V[D],U=t.elements.arrow,z=g&&U?Uo(U):{width:0,height:0},W=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Ei(),X=W[q],Y=W[L],H=gn(0,V[D],z[D]),Z=E?V[D]/2-y-H-X-F.mainAxis:C-H-X-F.mainAxis,ee=E?-V[D]/2+y+H+Y+F.mainAxis:G+H+Y+F.mainAxis,ue=t.elements.arrow&&An(t.elements.arrow),I=ue?S==="y"?ue.clientTop||0:ue.clientLeft||0:0,ye=($=M==null?void 0:M[S])!=null?$:0,B=Q+Z-ye-I,ve=Q+ee-ye,Ue=gn(g?tr(se,B):se,Q,g?vt(oe,ve):oe);R[S]=Ue,P[S]=Ue-Q}if(l){var ut,je=S==="x"?Te:Re,Dn=S==="x"?Fe:Le,qe=R[v],Tt=v==="y"?"height":"width",pt=qe+h[je],Rt=qe-h[Dn],Ot=[Te,Re].indexOf(k)!==-1,_t=(ut=M==null?void 0:M[v])!=null?ut:0,wt=Ot?pt:qe-V[Tt]-T[Tt]-_t+F.altAxis,Zt=Ot?qe+V[Tt]+T[Tt]-_t-F.altAxis:Rt,Bn=g&&Ot?zw(wt,qe,Zt):gn(g?wt:pt,qe,g?Zt:Rt);R[v]=Bn,P[v]=Bn-qe}t.modifiersData[r]=P}}const gf={name:"preventOverflow",enabled:!0,phase:"main",fn:hf,requiresIfExists:["offset"]};function bf(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function vf(e){return e===De(e)||!Ve(e)?Ho(e):bf(e)}function xf(e){var t=e.getBoundingClientRect(),n=Ut(t.width)/e.offsetWidth||1,r=Ut(t.height)/e.offsetHeight||1;return n!==1||r!==1}function yf(e,t,n){n===void 0&&(n=!1);var r=Ve(t),o=Ve(t)&&xf(t),s=dt(t),i=qt(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((Ke(t)!=="body"||Yo(s))&&(l=vf(t)),Ve(t)?(c=qt(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):s&&(c.x=Xo(s))),{x:i.left+l.scrollLeft-c.x,y:i.top+l.scrollTop-c.y,width:i.width,height:i.height}}function Nf(e){var t=new Map,n=new Set,r=[];e.forEach(function(s){t.set(s.name,s)});function o(s){n.add(s.name);var i=[].concat(s.requires||[],s.requiresIfExists||[]);i.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(s)}return e.forEach(function(s){n.has(s.name)||o(s)}),r}function kf(e){var t=Nf(e);return Iw.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Sf(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function jf(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var Qa={placement:"bottom",modifiers:[],strategy:"absolute"};function es(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Ef(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,s=o===void 0?Qa:o;return function(l,c,d){d===void 0&&(d=s);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},Qa,s),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},f=[],w=!1,g={state:u,setOptions:function(k){var j=typeof k=="function"?k(u.options):k;m(),u.options=Object.assign({},s,u.options,j),u.scrollParents={reference:Et(l)?bn(l):l.contextElement?bn(l.contextElement):[],popper:bn(c)};var E=kf(jf([].concat(r,u.options.modifiers)));return u.orderedModifiers=E.filter(function(S){return S.enabled}),x(),g.update()},forceUpdate:function(){if(!w){var k=u.elements,j=k.reference,E=k.popper;if(es(j,E)){u.rects={reference:yf(j,An(E),u.options.strategy==="fixed"),popper:Uo(E)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(F){return u.modifiersData[F.name]=Object.assign({},F.data)});for(var S=0;S<u.orderedModifiers.length;S++){if(u.reset===!0){u.reset=!1,S=-1;continue}var v=u.orderedModifiers[S],R=v.fn,V=v.options,T=V===void 0?{}:V,_=v.name;typeof R=="function"&&(u=R({state:u,options:T,name:_,instance:g})||u)}}}},update:Sf(function(){return new Promise(function(h){g.forceUpdate(),h(u)})}),destroy:function(){m(),w=!0}};if(!es(l,c))return g;g.setOptions(d).then(function(h){!w&&d.onFirstUpdate&&d.onFirstUpdate(h)});function x(){u.orderedModifiers.forEach(function(h){var k=h.name,j=h.options,E=j===void 0?{}:j,S=h.effect;if(typeof S=="function"){var v=S({state:u,name:k,instance:g,options:E}),R=function(){};f.push(v||R)}})}function m(){f.forEach(function(h){return h()}),f=[]}return g}}var Cf=[Ww,ff,Xw,Aw,pf,sf,gf,Gw,cf],Tf=Ef({defaultModifiers:Cf});const _i="Popper";function Rf(e){return yi(_i,e)}xw(_i,["root"]);const Of=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],_f=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Pf(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function nr(e){return typeof e=="function"?e():e}function Sr(e){return e.nodeType!==void 0}function If(e){return!Sr(e)}const $f=()=>_o({root:["root"]},pw(Rf)),Mf={},Af=A.forwardRef(function(t,n){var r;const{anchorEl:o,children:s,direction:i,disablePortal:l,modifiers:c,open:d,placement:u,popperOptions:f,popperRef:w,slotProps:g={},slots:x={},TransitionProps:m}=t,h=Ne(t,Of),k=A.useRef(null),j=St(k,n),E=A.useRef(null),S=St(E,w),v=A.useRef(S);Lt(()=>{v.current=S},[S]),A.useImperativeHandle(w,()=>E.current,[]);const R=Pf(u,i),[V,T]=A.useState(R),[_,F]=A.useState(nr(o));A.useEffect(()=>{E.current&&E.current.forceUpdate()}),A.useEffect(()=>{o&&F(nr(o))},[o]),Lt(()=>{if(!_||!d)return;const L=se=>{T(se.placement)};if(process.env.NODE_ENV!=="production"&&_&&Sr(_)&&_.nodeType===1){const se=_.getBoundingClientRect();process.env.NODE_ENV!=="test"&&se.top===0&&se.left===0&&se.right===0&&se.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let D=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:se})=>{L(se)}}];c!=null&&(D=D.concat(c)),f&&f.modifiers!=null&&(D=D.concat(f.modifiers));const Q=Tf(_,k.current,O({placement:R},f,{modifiers:D}));return v.current(Q),()=>{Q.destroy(),v.current(null)}},[_,l,c,d,f,R]);const M={placement:V};m!==null&&(M.TransitionProps=m);const P=$f(),$=(r=x.root)!=null?r:"div",q=gw({elementType:$,externalSlotProps:g.root,externalForwardedProps:h,additionalProps:{role:"tooltip",ref:j},ownerState:t,className:P.root});return a.jsx($,O({},q,{children:typeof s=="function"?s(M):s}))}),Pi=A.forwardRef(function(t,n){const{anchorEl:r,children:o,container:s,direction:i="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:d,open:u,placement:f="bottom",popperOptions:w=Mf,popperRef:g,style:x,transition:m=!1,slotProps:h={},slots:k={}}=t,j=Ne(t,_f),[E,S]=A.useState(!0),v=()=>{S(!1)},R=()=>{S(!0)};if(!c&&!u&&(!m||E))return null;let V;if(s)V=s;else if(r){const F=nr(r);V=F&&Sr(F)?Jn(F).body:Jn(null).body}const T=!u&&c&&(!m||E)?"none":void 0,_=m?{in:u,onEnter:v,onExited:R}:void 0;return a.jsx(er,{disablePortal:l,container:V,children:a.jsx(Af,O({anchorEl:r,direction:i,disablePortal:l,modifiers:d,ref:n,open:m?!E:u,placement:f,popperOptions:w,popperRef:g,slotProps:h,slots:k},j,{style:O({position:"fixed",top:0,left:0,display:T},x),TransitionProps:_,children:o}))})});process.env.NODE_ENV!=="production"&&(Pi.propTypes={anchorEl:Ro(p.oneOfType([yn,p.object,p.func]),e=>{if(e.open){const t=nr(e.anchorEl);if(t&&Sr(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||If(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:p.oneOfType([p.node,p.func]),container:p.oneOfType([yn,p.func]),direction:p.oneOf(["ltr","rtl"]),disablePortal:p.bool,keepMounted:p.bool,modifiers:p.arrayOf(p.shape({data:p.object,effect:p.func,enabled:p.bool,fn:p.func,name:p.any,options:p.object,phase:p.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:p.arrayOf(p.string),requiresIfExists:p.arrayOf(p.string)})),open:p.bool.isRequired,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:p.shape({modifiers:p.array,onFirstUpdate:p.func,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:p.oneOf(["absolute","fixed"])}),popperRef:oi,slotProps:p.shape({root:p.oneOfType([p.func,p.object])}),slots:p.shape({root:p.elementType}),transition:p.bool});function Ii(){const e=hi(Bo);return process.env.NODE_ENV!=="production"&&A.useDebugValue(e),e[zo]||e}function ro(e,t){return ro=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},ro(e,t)}function Df(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,ro(e,t)}const ts={disabled:!1};var Bf=process.env.NODE_ENV!=="production"?p.oneOfType([p.number,p.shape({enter:p.number,exit:p.number,appear:p.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&p.oneOfType([p.string,p.shape({enter:p.string,exit:p.string,active:p.string}),p.shape({enter:p.string,enterDone:p.string,enterActive:p.string,exit:p.string,exitDone:p.string,exitActive:p.string})]);const $i=b.createContext(null);var zf=function(t){return t.scrollTop},wn="unmounted",ht="exited",gt="entering",Bt="entered",oo="exiting",rt=function(e){Df(t,e);function t(r,o){var s;s=e.call(this,r,o)||this;var i=o,l=i&&!i.isMounting?r.enter:r.appear,c;return s.appearStatus=null,r.in?l?(c=ht,s.appearStatus=gt):c=Bt:r.unmountOnExit||r.mountOnEnter?c=wn:c=ht,s.state={status:c},s.nextCallback=null,s}t.getDerivedStateFromProps=function(o,s){var i=o.in;return i&&s.status===wn?{status:ht}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var s=null;if(o!==this.props){var i=this.state.status;this.props.in?i!==gt&&i!==Bt&&(s=gt):(i===gt||i===Bt)&&(s=oo)}this.updateStatus(!1,s)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,s,i,l;return s=i=l=o,o!=null&&typeof o!="number"&&(s=o.exit,i=o.enter,l=o.appear!==void 0?o.appear:i),{exit:s,enter:i,appear:l}},n.updateStatus=function(o,s){if(o===void 0&&(o=!1),s!==null)if(this.cancelNextCallback(),s===gt){if(this.props.unmountOnExit||this.props.mountOnEnter){var i=this.props.nodeRef?this.props.nodeRef.current:cn.findDOMNode(this);i&&zf(i)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===ht&&this.setState({status:wn})},n.performEnter=function(o){var s=this,i=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[cn.findDOMNode(this),l],d=c[0],u=c[1],f=this.getTimeouts(),w=l?f.appear:f.enter;if(!o&&!i||ts.disabled){this.safeSetState({status:Bt},function(){s.props.onEntered(d)});return}this.props.onEnter(d,u),this.safeSetState({status:gt},function(){s.props.onEntering(d,u),s.onTransitionEnd(w,function(){s.safeSetState({status:Bt},function(){s.props.onEntered(d,u)})})})},n.performExit=function(){var o=this,s=this.props.exit,i=this.getTimeouts(),l=this.props.nodeRef?void 0:cn.findDOMNode(this);if(!s||ts.disabled){this.safeSetState({status:ht},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:oo},function(){o.props.onExiting(l),o.onTransitionEnd(i.exit,function(){o.safeSetState({status:ht},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,s){s=this.setNextCallback(s),this.setState(o,s)},n.setNextCallback=function(o){var s=this,i=!0;return this.nextCallback=function(l){i&&(i=!1,s.nextCallback=null,o(l))},this.nextCallback.cancel=function(){i=!1},this.nextCallback},n.onTransitionEnd=function(o,s){this.setNextCallback(s);var i=this.props.nodeRef?this.props.nodeRef.current:cn.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!i||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[i,this.nextCallback],d=c[0],u=c[1];this.props.addEndListener(d,u)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===wn)return null;var s=this.props,i=s.children;s.in,s.mountOnEnter,s.unmountOnExit,s.appear,s.enter,s.exit,s.timeout,s.addEndListener,s.onEnter,s.onEntering,s.onEntered,s.onExit,s.onExiting,s.onExited,s.nodeRef;var l=Ne(s,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return b.createElement($i.Provider,{value:null},typeof i=="function"?i(o,l):b.cloneElement(b.Children.only(i),l))},t}(b.Component);rt.contextType=$i;rt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:p.shape({current:typeof Element>"u"?p.any:function(e,t,n,r,o,s){var i=e[t];return p.instanceOf(i&&"ownerDocument"in i?i.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,s)}}),children:p.oneOfType([p.func.isRequired,p.element.isRequired]).isRequired,in:p.bool,mountOnEnter:p.bool,unmountOnExit:p.bool,appear:p.bool,enter:p.bool,exit:p.bool,timeout:function(t){var n=Bf;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),s=1;s<r;s++)o[s-1]=arguments[s];return n.apply(void 0,[t].concat(o))},addEndListener:p.func,onEnter:p.func,onEntering:p.func,onEntered:p.func,onExit:p.func,onExiting:p.func,onExited:p.func}:{};function Dt(){}rt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Dt,onEntering:Dt,onEntered:Dt,onExit:Dt,onExiting:Dt,onExited:Dt};rt.UNMOUNTED=wn;rt.EXITED=ht;rt.ENTERING=gt;rt.ENTERED=Bt;rt.EXITING=oo;const Vf=rt,Ff=e=>e.scrollTop;function ns(e,t){var n,r;const{timeout:o,easing:s,style:i={}}=e;return{duration:(n=i.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=i.transitionTimingFunction)!=null?r:typeof s=="object"?s[t.mode]:s,delay:i.transitionDelay}}const Lf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function ao(e){return`scale(${e}, ${e**2})`}const Gf={entering:{opacity:1,transform:ao(1)},entered:{opacity:1,transform:"none"}},Lr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Wo=A.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:s,easing:i,in:l,onEnter:c,onEntered:d,onEntering:u,onExit:f,onExited:w,onExiting:g,style:x,timeout:m="auto",TransitionComponent:h=Vf}=t,k=Ne(t,Lf),j=un(),E=A.useRef(),S=Ii(),v=A.useRef(null),R=St(v,s.ref,n),V=L=>D=>{if(L){const Q=v.current;D===void 0?L(Q):L(Q,D)}},T=V(u),_=V((L,D)=>{Ff(L);const{duration:Q,delay:se,easing:oe}=ns({style:x,timeout:m,easing:i},{mode:"enter"});let y;m==="auto"?(y=S.transitions.getAutoHeightDuration(L.clientHeight),E.current=y):y=Q,L.style.transition=[S.transitions.create("opacity",{duration:y,delay:se}),S.transitions.create("transform",{duration:Lr?y:y*.666,delay:se,easing:oe})].join(","),c&&c(L,D)}),F=V(d),M=V(g),P=V(L=>{const{duration:D,delay:Q,easing:se}=ns({style:x,timeout:m,easing:i},{mode:"exit"});let oe;m==="auto"?(oe=S.transitions.getAutoHeightDuration(L.clientHeight),E.current=oe):oe=D,L.style.transition=[S.transitions.create("opacity",{duration:oe,delay:Q}),S.transitions.create("transform",{duration:Lr?oe:oe*.666,delay:Lr?Q:Q||oe*.333,easing:se})].join(","),L.style.opacity=0,L.style.transform=ao(.75),f&&f(L)}),$=V(w),q=L=>{m==="auto"&&j.start(E.current||0,L),r&&r(v.current,L)};return a.jsx(h,O({appear:o,in:l,nodeRef:v,onEnter:_,onEntered:F,onEntering:T,onExit:P,onExited:$,onExiting:M,addEndListener:q,timeout:m==="auto"?null:m},k,{children:(L,D)=>A.cloneElement(s,O({style:O({opacity:0,transform:ao(.75),visibility:L==="exited"&&!l?"hidden":void 0},Gf[L],x,s.props.style),ref:R},D))}))});process.env.NODE_ENV!=="production"&&(Wo.propTypes={addEndListener:p.func,appear:p.bool,children:ni.isRequired,easing:p.oneOfType([p.shape({enter:p.string,exit:p.string}),p.string]),in:p.bool,onEnter:p.func,onEntered:p.func,onEntering:p.func,onExit:p.func,onExited:p.func,onExiting:p.func,style:p.object,timeout:p.oneOfType([p.oneOf(["auto"]),p.number,p.shape({appear:p.number,enter:p.number,exit:p.number})])});Wo.muiSupportAuto=!0;const rs=Wo,Uf=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],qf=$n(Pi,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Mi=A.forwardRef(function(t,n){var r;const o=mi(),s=Vo({props:t,name:"MuiPopper"}),{anchorEl:i,component:l,components:c,componentsProps:d,container:u,disablePortal:f,keepMounted:w,modifiers:g,open:x,placement:m,popperOptions:h,popperRef:k,transition:j,slots:E,slotProps:S}=s,v=Ne(s,Uf),R=(r=E==null?void 0:E.root)!=null?r:c==null?void 0:c.Root,V=O({anchorEl:i,container:u,disablePortal:f,keepMounted:w,modifiers:g,open:x,placement:m,popperOptions:h,popperRef:k,transition:j},v);return a.jsx(qf,O({as:l,direction:o==null?void 0:o.direction,slots:{root:R},slotProps:S??d},V,{ref:n}))});process.env.NODE_ENV!=="production"&&(Mi.propTypes={anchorEl:p.oneOfType([yn,p.object,p.func]),children:p.oneOfType([p.node,p.func]),component:p.elementType,components:p.shape({Root:p.elementType}),componentsProps:p.shape({root:p.oneOfType([p.func,p.object])}),container:p.oneOfType([yn,p.func]),disablePortal:p.bool,keepMounted:p.bool,modifiers:p.arrayOf(p.shape({data:p.object,effect:p.func,enabled:p.bool,fn:p.func,name:p.any,options:p.object,phase:p.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:p.arrayOf(p.string),requiresIfExists:p.arrayOf(p.string)})),open:p.bool.isRequired,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:p.shape({modifiers:p.array,onFirstUpdate:p.func,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:p.oneOf(["absolute","fixed"])}),popperRef:oi,slotProps:p.shape({root:p.oneOfType([p.func,p.object])}),slots:p.shape({root:p.elementType}),sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),transition:p.bool});const Ai=Mi;function Hf(e){return wr("MuiTooltip",e)}const Xf=ui("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),st=Xf,Yf=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Wf(e){return Math.round(e*1e5)/1e5}const Kf=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:s}=e,i={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${We(s.split("-")[0])}`],arrow:["arrow"]};return _o(i,Hf,t)},Jf=$n(Ai,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>O({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${st.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${st.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${st.arrow}`]:O({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${st.arrow}`]:O({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Zf=$n("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${We(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>O({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:gi(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Wf(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${st.popper}[data-popper-placement*="left"] &`]:O({transformOrigin:"right center"},t.isRtl?O({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):O({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${st.popper}[data-popper-placement*="right"] &`]:O({transformOrigin:"left center"},t.isRtl?O({marginRight:"14px"},t.touch&&{marginRight:"24px"}):O({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${st.popper}[data-popper-placement*="top"] &`]:O({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${st.popper}[data-popper-placement*="bottom"] &`]:O({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Qf=$n("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:gi(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Un=!1;const os=new _n;let ln={x:0,y:0};function qn(e,t){return n=>{t&&t(n),e(n)}}const Di=A.forwardRef(function(t,n){var r,o,s,i,l,c,d,u,f,w,g,x,m,h,k,j,E,S,v;const R=Vo({props:t,name:"MuiTooltip"}),{arrow:V=!1,children:T,components:_={},componentsProps:F={},describeChild:M=!1,disableFocusListener:P=!1,disableHoverListener:$=!1,disableInteractive:q=!1,disableTouchListener:L=!1,enterDelay:D=100,enterNextDelay:Q=0,enterTouchDelay:se=700,followCursor:oe=!1,id:y,leaveDelay:C=0,leaveTouchDelay:G=1500,onClose:U,onOpen:z,open:W,placement:X="bottom",PopperComponent:Y,PopperProps:H={},slotProps:Z={},slots:ee={},title:ue,TransitionComponent:I=rs,TransitionProps:ye}=R,B=Ne(R,Yf),ve=A.isValidElement(T)?T:a.jsx("span",{children:T}),Ue=Ii(),ut=Ue.direction==="rtl",[je,Dn]=A.useState(),[qe,Tt]=A.useState(null),pt=A.useRef(!1),Rt=q||oe,Ot=un(),_t=un(),wt=un(),Zt=un(),[Bn,Jo]=si({controlled:W,default:!1,name:"Tooltip",state:"open"});let Je=Bn;if(process.env.NODE_ENV!=="production"){const{current:te}=A.useRef(W!==void 0);A.useEffect(()=>{je&&je.disabled&&!te&&ue!==""&&je.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ue,je,te])}const jr=ai(y),Qt=A.useRef(),zn=Qr(()=>{Qt.current!==void 0&&(document.body.style.WebkitUserSelect=Qt.current,Qt.current=void 0),Zt.clear()});A.useEffect(()=>zn,[zn]);const Zo=te=>{os.clear(),Un=!0,Jo(!0),z&&!Je&&z(te)},Vn=Qr(te=>{os.start(800+C,()=>{Un=!1}),Jo(!1),U&&Je&&U(te),Ot.start(Ue.transitions.duration.shortest,()=>{pt.current=!1})}),Er=te=>{pt.current&&te.type!=="touchstart"||(je&&je.removeAttribute("title"),_t.clear(),wt.clear(),D||Un&&Q?_t.start(Un?Q:D,()=>{Zo(te)}):Zo(te))},Qo=te=>{_t.clear(),wt.start(C,()=>{Vn(te)})},{isFocusVisibleRef:ea,onBlur:il,onFocus:ll,ref:cl}=ii(),[,ta]=A.useState(!1),na=te=>{il(te),ea.current===!1&&(ta(!1),Qo(te))},ra=te=>{je||Dn(te.currentTarget),ll(te),ea.current===!0&&(ta(!0),Er(te))},oa=te=>{pt.current=!0;const Pe=ve.props;Pe.onTouchStart&&Pe.onTouchStart(te)},aa=Er,sa=Qo,dl=te=>{oa(te),wt.clear(),Ot.clear(),zn(),Qt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Zt.start(se,()=>{document.body.style.WebkitUserSelect=Qt.current,Er(te)})},ul=te=>{ve.props.onTouchEnd&&ve.props.onTouchEnd(te),zn(),wt.start(G,()=>{Vn(te)})};A.useEffect(()=>{if(!Je)return;function te(Pe){(Pe.key==="Escape"||Pe.key==="Esc")&&Vn(Pe)}return document.addEventListener("keydown",te),()=>{document.removeEventListener("keydown",te)}},[Vn,Je]);const pl=St(ve.ref,cl,Dn,n);!ue&&ue!==0&&(Je=!1);const Cr=A.useRef(),wl=te=>{const Pe=ve.props;Pe.onMouseMove&&Pe.onMouseMove(te),ln={x:te.clientX,y:te.clientY},Cr.current&&Cr.current.update()},en={},Tr=typeof ue=="string";M?(en.title=!Je&&Tr&&!$?ue:null,en["aria-describedby"]=Je?jr:null):(en["aria-label"]=Tr?ue:null,en["aria-labelledby"]=Je&&!Tr?jr:null);const Be=O({},en,B,ve.props,{className:at(B.className,ve.props.className),onTouchStart:oa,ref:pl},oe?{onMouseMove:wl}:{});process.env.NODE_ENV!=="production"&&(Be["data-mui-internal-clone-element"]=!0,A.useEffect(()=>{je&&!je.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[je]));const tn={};L||(Be.onTouchStart=dl,Be.onTouchEnd=ul),$||(Be.onMouseOver=qn(aa,Be.onMouseOver),Be.onMouseLeave=qn(sa,Be.onMouseLeave),Rt||(tn.onMouseOver=aa,tn.onMouseLeave=sa)),P||(Be.onFocus=qn(ra,Be.onFocus),Be.onBlur=qn(na,Be.onBlur),Rt||(tn.onFocus=ra,tn.onBlur=na)),process.env.NODE_ENV!=="production"&&ve.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ve.props.title}\` or the Tooltip component.`].join(`
`));const fl=A.useMemo(()=>{var te;let Pe=[{name:"arrow",enabled:!!qe,options:{element:qe,padding:4}}];return(te=H.popperOptions)!=null&&te.modifiers&&(Pe=Pe.concat(H.popperOptions.modifiers)),O({},H.popperOptions,{modifiers:Pe})},[qe,H]),nn=O({},R,{isRtl:ut,arrow:V,disableInteractive:Rt,placement:X,PopperComponentProp:Y,touch:pt.current}),Rr=Kf(nn),ia=(r=(o=ee.popper)!=null?o:_.Popper)!=null?r:Jf,la=(s=(i=(l=ee.transition)!=null?l:_.Transition)!=null?i:I)!=null?s:rs,ca=(c=(d=ee.tooltip)!=null?d:_.Tooltip)!=null?c:Zf,da=(u=(f=ee.arrow)!=null?f:_.Arrow)!=null?u:Qf,ml=pn(ia,O({},H,(w=Z.popper)!=null?w:F.popper,{className:at(Rr.popper,H==null?void 0:H.className,(g=(x=Z.popper)!=null?x:F.popper)==null?void 0:g.className)}),nn),hl=pn(la,O({},ye,(m=Z.transition)!=null?m:F.transition),nn),gl=pn(ca,O({},(h=Z.tooltip)!=null?h:F.tooltip,{className:at(Rr.tooltip,(k=(j=Z.tooltip)!=null?j:F.tooltip)==null?void 0:k.className)}),nn),bl=pn(da,O({},(E=Z.arrow)!=null?E:F.arrow,{className:at(Rr.arrow,(S=(v=Z.arrow)!=null?v:F.arrow)==null?void 0:S.className)}),nn);return a.jsxs(A.Fragment,{children:[A.cloneElement(ve,Be),a.jsx(ia,O({as:Y??Ai,placement:X,anchorEl:oe?{getBoundingClientRect:()=>({top:ln.y,left:ln.x,right:ln.x,bottom:ln.y,width:0,height:0})}:je,popperRef:Cr,open:je?Je:!1,id:jr,transition:!0},tn,ml,{popperOptions:fl,children:({TransitionProps:te})=>a.jsx(la,O({timeout:Ue.transitions.duration.shorter},te,hl,{children:a.jsxs(ca,O({},gl,{children:[ue,V?a.jsx(da,O({},bl,{ref:Tt})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Di.propTypes={arrow:p.bool,children:ni.isRequired,classes:p.object,className:p.string,components:p.shape({Arrow:p.elementType,Popper:p.elementType,Tooltip:p.elementType,Transition:p.elementType}),componentsProps:p.shape({arrow:p.object,popper:p.object,tooltip:p.object,transition:p.object}),describeChild:p.bool,disableFocusListener:p.bool,disableHoverListener:p.bool,disableInteractive:p.bool,disableTouchListener:p.bool,enterDelay:p.number,enterNextDelay:p.number,enterTouchDelay:p.number,followCursor:p.bool,id:p.string,leaveDelay:p.number,leaveTouchDelay:p.number,onClose:p.func,onOpen:p.func,open:p.bool,placement:p.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:p.elementType,PopperProps:p.object,slotProps:p.shape({arrow:p.object,popper:p.object,tooltip:p.object,transition:p.object}),slots:p.shape({arrow:p.elementType,popper:p.elementType,tooltip:p.elementType,transition:p.elementType}),sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),title:p.node,TransitionComponent:p.elementType,TransitionProps:p.object});const em=Di;function as(e,t,n){return e?a.jsx(Ae.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:a.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Ko(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:s=void 0,iconPathAfter:i=void 0,hasAutoFocus:l=!1,className:c,isDisabled:d=!1,isDense:u=!0,isSubMenuParent:f=!1,hasDisabledGutters:w=!1,hasDivider:g=!1,focusVisibleClassName:x,id:m,children:h}=e,k=a.jsx(Ae.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:d,dense:u,disableGutters:w,divider:g,focusVisibleClassName:x,onClick:t,id:m,children:n?a.jsxs(a.Fragment,{children:[as(s,n,!0),a.jsx(Ae.ListItemText,{primary:n,inset:!s&&o}),f?a.jsx(Ae.ListItemIcon,{className:"papi-menu-icon-trailing",children:a.jsx(vi,{})}):as(i,n,!1)]}):h});return r?a.jsx(em,{title:r,placement:"right",children:a.jsx("div",{children:k})}):k}function Bi(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function tm(e){const[t,n]=b.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:s}=e,i=d=>{n(d.currentTarget)},l=()=>{n(void 0)},c=()=>{let d=Bi(s).filter(u=>"menuItem"in u.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return d=d.filter(u=>"menuItem"in u.group&&u.group.menuItem===r.id),a.jsx(zi,{...e,includedGroups:d})};return a.jsxs(a.Fragment,{children:[a.jsx(Ko,{onClick:i,...o,isSubMenuParent:!0}),a.jsx(Ae.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const nm=(e,t)=>t.filter(o=>o.group===e).sort((o,s)=>(o.order||0)-(s.order||0));function zi(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:s,allowForLeadingIcons:i}=b.useMemo(()=>{const u=o&&o.length>0?o:Bi(t).filter(x=>!("menuItem"in x.group)),f=Object.values(u).sort((x,m)=>(x.group.order||0)-(m.group.order||0)),w=[];f.forEach(x=>{nm(x.id,t.items).forEach(m=>w.push({item:m,isLastItemInGroup:!1})),w.length>0&&(w[w.length-1].isLastItemInGroup=!0)}),w.length>0&&(w[w.length-1].isLastItemInGroup=!1);const g=w.some(x=>"iconPathBefore"in x.item&&x.item.iconPathBefore);return{items:w,allowForLeadingIcons:g}},[o,t]),l=({item:u,isLastItemInGroup:f})=>({className:"papi-menu-item",label:u.label,tooltip:u.tooltip,iconPathBefore:"iconPathBefore"in u?u.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in u?u.iconPathAfter:void 0,hasDivider:f,allowForLeadingIcons:i}),[c]=s;if(!c)return a.jsx("div",{});const d=c.item.group;return a.jsx("div",{role:"menu","aria-label":d,children:s.map((u,f)=>{const{item:w}=u,g=l(u);if("command"in w){const x=w.group+f;return a.jsx(Ko,{onClick:m=>{n==null||n(m),r(w)},...g},x)}return a.jsx(tm,{parentMenuItem:w,parentItemProps:g,...e},d+w.id)})},d)}function rm(e){const{menuDefinition:t,columnId:n}=e;let s=Object.entries(t.groups).map(([i,l])=>({id:i,group:l})).filter(i=>"column"in i.group);return n&&"columns"in t&&t.columns[n]&&(s=s.filter(i=>"column"in i.group&&i.group.column===n)),a.jsx(zi,{...e,includedGroups:s})}function om({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:s}){return a.jsxs(Ae.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${s??""}`,children:[a.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${s??""}`,children:r.label}),a.jsx(Ae.List,{id:n,dense:!0,className:s??"",children:a.jsx(rm,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Vi({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,s=b.useMemo(()=>{const i=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,d=o[c];typeof d=="object"&&typeof d.order=="number"&&!Number.isNaN(d.order)?i.set(d.order,{id:c,metadata:d}):console.warn(`Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(i.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return a.jsx(Ae.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:s.length,role:"menu","aria-label":"GridMenu",id:r,children:s.map((i,l)=>a.jsx(om,{commandHandler:e,menuDefinition:n,...i,className:t},l))})}function am(e){return{preserveValue:!0,...e}}const rr=(e,t,n={})=>{const r=b.useRef(t);r.current=t;const o=b.useRef(n);o.current=am(o.current);const[s,i]=b.useState(()=>r.current),[l,c]=b.useState(!0);return b.useEffect(()=>{let d=!0;return c(!!e),(async()=>{if(e){const u=await e();d&&(i(()=>u),c(!1))}})(),()=>{d=!1,o.current.preserveValue||i(()=>r.current)}},[e]),[s,l]},sm=bi(a.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Fi({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:s,ariaLabelPrefix:i,children:l}){const[c,d]=b.useState(!1),[u,f]=b.useState(!1),w=b.useCallback(()=>{c&&d(!1),f(!1)},[c]),g=b.useCallback(S=>{S.stopPropagation(),d(v=>{const R=!v;return R&&S.shiftKey?f(!0):R||f(!1),R})},[]),x=b.useCallback(S=>(w(),r(S)),[r,w]),[m,h]=b.useState({top:1,left:1});b.useEffect(()=>{if(c){const S=o==null?void 0:o.current;if(S){const v=S.getBoundingClientRect(),R=window.scrollY,V=window.scrollX,T=v.top+R+S.clientHeight,_=v.left+V;h({top:T,left:_})}}},[c,o]);const[k]=rr(b.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[j]=rr(b.useCallback(async()=>(e==null?void 0:e(!0))??n??k,[e,n,k,c]),n??k),E=u&&j?j:k;return a.jsxs(a.Fragment,{children:[a.jsx(Ae.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${s??""}`,color:"inherit","aria-label":`${i??""} menu button`,onClick:g,children:l??a.jsx(sm,{})}),a.jsx(Ae.Drawer,{className:`papi-menu-drawer ${s??""}`,anchor:"left",variant:"temporary",open:c,onClose:w,PaperProps:{className:"papi-menu-drawer-paper",style:{top:m.top,left:m.left}},children:E?a.jsx(Vi,{className:s,id:`${i??""} main menu`,commandHandler:x,multiColumnMenu:E}):void 0})]})}function im({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:s=!1,size:i="medium",className:l,onClick:c,children:d}){return a.jsx(Ae.IconButton,{id:e,disabled:n,edge:s,size:i,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:d})}const Jt=b.forwardRef(({className:e,...t},n)=>a.jsx(K.LoaderCircle,{size:35,className:N("tw-animate-spin",e),...t,ref:n}));Jt.displayName="Spinner";function lm({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:s,placeholder:i,isRequired:l=!1,className:c,defaultValue:d,value:u,onChange:f,onFocus:w,onBlur:g}){return a.jsxs("div",{className:N("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":r}),children:[a.jsx(Ce,{htmlFor:e,className:N({"tw-text-red-600":n,"tw-hidden":!s}),children:`${s}${l?"*":""}`}),a.jsx(Ct,{id:e,disabled:t,placeholder:i,required:l,className:N(c,{"tw-border-red-600":n}),defaultValue:d,value:u,onChange:f,onFocus:w,onBlur:g}),a.jsx("p",{className:N({"tw-hidden":!o}),children:o})]})}function cm({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const s=b.useRef(void 0);return a.jsx("div",{ref:s,style:{position:"relative"},children:a.jsx(Ae.AppBar,{position:"static",id:r,children:a.jsxs(Ae.Toolbar,{className:N("tw-bg-muted tw-text-muted-foreground",n),variant:"dense",children:[e?a.jsx(Fi,{commandHandler:t,containerRef:s,menuProvider:e}):void 0,o?a.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const dm=Yt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Li=b.forwardRef(({className:e,variant:t,...n},r)=>a.jsx("div",{ref:r,role:"alert",className:N(dm({variant:t}),e),...n}));Li.displayName="Alert";const Gi=b.forwardRef(({className:e,...t},n)=>a.jsxs("h5",{ref:n,className:N("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",e),...t,children:[t.children," "]}));Gi.displayName="AlertTitle";const Ui=b.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:N("tw-text-sm [&_p]:tw-leading-relaxed",e),...t}));Ui.displayName="AlertDescription";const qi=Yt.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0"}},defaultVariants:{variant:"default"}});function Hi({className:e,variant:t,...n}){return a.jsx("div",{className:N("pr-twp",qi({variant:t}),e),...n})}const Xi=b.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:N("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",e),...t}));Xi.displayName="Card";const Yi=b.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:N("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",e),...t}));Yi.displayName="CardHeader";const Wi=b.forwardRef(({className:e,...t},n)=>a.jsx("h3",{ref:n,className:N("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",e),...t,children:t.children}));Wi.displayName="CardTitle";const Ki=b.forwardRef(({className:e,...t},n)=>a.jsx("p",{ref:n,className:N("pr-twp tw-text-sm tw-text-muted-foreground",e),...t}));Ki.displayName="CardDescription";const Ji=b.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:N("pr-twp tw-p-6 tw-pt-0",e),...t}));Ji.displayName="CardContent";const Zi=b.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:N("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",e),...t}));Zi.displayName="CardFooter";function um({...e}){return a.jsx(is.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const Qi=b.forwardRef(({className:e,...t},n)=>{const r=xe();return a.jsxs(dn.Root,{ref:n,className:N("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",e),...t,dir:r,children:[a.jsx(dn.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:a.jsx(dn.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),a.jsx(dn.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});Qi.displayName=dn.Root.displayName;const el=b.forwardRef(({className:e,...t},n)=>{const r=xe();return a.jsx(Hr.Root,{className:N("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",e),...t,ref:n,children:a.jsx(Hr.Thumb,{className:N("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":r==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":r==="rtl"})})})});el.displayName=Hr.Root.displayName;const pm=_e.Root,tl=b.forwardRef(({className:e,...t},n)=>{const r=xe();return a.jsx(_e.List,{ref:n,className:N("tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t,dir:r})});tl.displayName=_e.List.displayName;const nl=b.forwardRef(({className:e,...t},n)=>a.jsx(_e.Trigger,{ref:n,className:N("tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e),...t}));nl.displayName=_e.Trigger.displayName;const rl=b.forwardRef(({className:e,...t},n)=>a.jsx(_e.Content,{ref:n,className:N("tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));rl.displayName=_e.Content.displayName;function wm({isInstalling:e,handleClick:t,buttonText:n,className:r,...o}){return a.jsx(pe,{className:N("tw-h-8 tw-rounded-md tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":e,"tw-bg-blue-600":!e,"tw-bg-white tw-text-blue-600 hover:tw-text-white":!n,"tw-w-20":n},r),onClick:t,...o,children:e?a.jsx(Jt,{size:15}):a.jsxs(a.Fragment,{children:[a.jsx(K.Download,{size:25,className:N("tw-h-4 tw-w-4",{"tw-mr-1":n})}),n]})})}function fm({isEnabling:e,handleClick:t,className:n,...r}){return a.jsx(pe,{className:N("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":e},n),onClick:t,...r,children:e?a.jsxs(a.Fragment,{children:[a.jsx(Jt,{size:15,className:"tw-mr-1 tw-text-white"}),"Enabling..."]}):"Enable"})}function mm({isDisabling:e,handleClick:t,className:n,...r}){return a.jsx(pe,{className:N("tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",{"tw-cursor-not-allowed tw-bg-gray-400":e},n),onClick:t,...r,children:e?a.jsxs(a.Fragment,{children:[a.jsx(Jt,{size:15,className:"tw-mr-1 tw-text-black"}),"Disabling..."]}):"Disable"})}function hm({isUpdating:e,handleClick:t,className:n,...r}){return a.jsx(pe,{className:N("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",{"tw-cursor-not-allowed tw-bg-blue-700":e},n),onClick:t,...r,children:e?a.jsxs(a.Fragment,{children:[a.jsx(Jt,{size:15,className:"tw-mr-1 tw-text-white"}),"Updating..."]}):"Update"})}function gm({id:e,markdown:t,className:n,anchorTarget:r}){const o=b.useMemo(()=>({overrides:{a:{props:{target:r}}}}),[r]);return a.jsx("div",{id:e,className:N("pr-twp tw-prose",n),children:a.jsx(Il,{options:o,children:t})})}const ol=b.forwardRef((e,t)=>a.jsxs(pe,{ref:t,className:"tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",...e,children:[a.jsx(K.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"}),"Filter",a.jsx(K.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"})]}));var al=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(al||{});function bm({id:e,groups:t}){return a.jsx("div",{id:e,children:a.jsxs(ar,{children:[a.jsx(so,{asChild:!0,children:a.jsx(ol,{})}),a.jsx(En,{children:t.map(n=>a.jsxs("div",{children:[a.jsx(Wt,{children:n.label}),a.jsx(us,{children:n.items.map(r=>a.jsx("div",{children:r.itemType===0?a.jsx(sr,{onClick:r.onClick,children:r.label}):a.jsx(lo,{onClick:r.onClick,value:r.label,children:r.label})},r.label))}),a.jsx(Cn,{})]},n.label))})]})})}function vm({id:e,message:t}){return a.jsx("div",{id:e,className:"tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center",children:a.jsx("div",{className:"tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center",children:a.jsx("p",{className:"tw-text-lg tw-text-gray-800",children:t})})})}function xm({id:e,category:t,downloads:n,languages:r,moreInfoUrl:o}){const s=new J.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(n).reduce((l,c)=>l+c,0)),i=()=>{window.scrollTo(0,document.body.scrollHeight)};return a.jsxs("div",{id:e,className:"tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",children:[a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsx("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:a.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:t})}),a.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"CATEGORY"})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsxs("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:[a.jsx(K.User,{className:"tw-mr-1 tw-h-4 tw-w-4"}),a.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:s})]}),a.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"USERS"})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsx("div",{className:"tw-flex tw-items-center",children:r.slice(0,3).map(l=>a.jsx("span",{className:"tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",children:l.toUpperCase()},l))}),r.length>3&&a.jsxs("button",{type:"button",onClick:()=>i(),className:"tw-text-xs tw-text-gray-500 tw-underline",children:["+",r.length-3," more languages"]})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-ml-auto tw-flex tw-flex-col tw-space-y-2",children:[a.jsxs("a",{href:o,target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Website",a.jsx(K.Link,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]}),a.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Support",a.jsx(K.CircleHelp,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]})]})]})}function sl({id:e,versionHistory:t}){const[n,r]=b.useState(!1),o=new Date;function s(l){const c=new Date(l),d=new Date(o.getTime()-c.getTime()),u=d.getUTCFullYear()-1970,f=d.getUTCMonth(),w=d.getUTCDate()-1;let g="";return u>0?g=`${u.toString()} year${u===1?"":"s"} ago`:f>0?g=`${f.toString()} month${f===1?"":"s"} ago`:w===0?g="today":g=`${w.toString()} day${w===1?"":"s"} ago`,g}const i=Object.entries(t).sort((l,c)=>c[0].localeCompare(l[0]));return a.jsxs("div",{id:e,children:[a.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),a.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600",children:(n?i:i.slice(0,5)).map(l=>a.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[a.jsx("div",{className:"tw-text-gray-600",children:a.jsx("li",{className:"tw-prose tw-text-xs",children:a.jsx("span",{children:l[1].description})})}),a.jsxs("div",{className:"tw-justify-end tw-text-right",children:[a.jsxs("div",{children:["Version ",l[0]]}),a.jsx("div",{children:s(l[1].date)})]})]},l[0]))}),i.length>5&&a.jsx("button",{type:"button",onClick:()=>r(!n),className:"tw-text-xs tw-text-gray-500 tw-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function ym({id:e,publisherDisplayName:t,fileSize:n,locales:r,versionHistory:o}){const s=b.useMemo(()=>J.formatBytes(n),[n]),l=(c=>{const d=new Intl.DisplayNames(navigator.language,{type:"language"});return c.map(u=>d.of(u))})(r);return a.jsx("div",{id:e,className:"tw-border-t tw-pb-4 tw-pt-4",children:a.jsxs("div",{className:"tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0",children:[a.jsx(sl,{versionHistory:o}),a.jsx("div",{className:"tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300"}),a.jsxs("div",{className:"tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3",children:[a.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),a.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600",children:[a.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[a.jsx("span",{className:"tw-mb-2",children:"Publisher"}),a.jsx("span",{className:"tw-font-semibold",children:t}),a.jsx("span",{className:"tw-mb-2 tw-mt-4",children:"Size"}),a.jsx("span",{className:"tw-font-semibold",children:s})]}),a.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600",children:a.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[a.jsx("span",{className:"tw-mb-2",children:"Languages"}),a.jsx("span",{className:"tw-font-semibold",children:l.join(", ")})]})})]})]})]})})}function Nm({entries:e,getEntriesCount:t,selected:n,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,sortSelected:l,icon:c,className:d,badgesPlaceholder:u}){return a.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[a.jsx(Ds,{entries:e,getEntriesCount:t,selected:n,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,sortSelected:l,icon:c,className:d}),n.length>0?a.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:n.map(f=>{var w;return a.jsxs(Hi,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[a.jsx(pe,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(n.filter(g=>g!==f)),children:a.jsx(K.X,{className:"tw-h-3 tw-w-3"})}),(w=e.find(g=>g.value===f))==null?void 0:w.label]},f)})}):a.jsx(Ce,{children:u})]})}const km=(e,t)=>e[t]??t;function Sm({knownUiLanguages:e,primaryLanguage:t="en",fallbackLanguages:n=[],onLanguagesChange:r,onPrimaryLanguageChange:o,onFallbackLanguagesChange:s,localizedStrings:i,className:l}){const c=km(i,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[d,u]=b.useState(!1),f=g=>{o&&o(g),r&&r([g,...n.filter(x=>x!==g)]),s&&n.find(x=>x===g)&&s([...n.filter(x=>x!==g)]),u(!1)},w=(g,x)=>{var h,k,j,E,S,v;const m=x!==g?((k=(h=e[g])==null?void 0:h.uiNames)==null?void 0:k[x])??((E=(j=e[g])==null?void 0:j.uiNames)==null?void 0:E.en):void 0;return m?`${(S=e[g])==null?void 0:S.autonym} (${m})`:(v=e[g])==null?void 0:v.autonym};return a.jsxs("div",{className:N("pr-twp tw-max-w-sm",l),children:[a.jsxs(yt,{name:"uiLanguage",value:t,onValueChange:f,open:d,onOpenChange:g=>u(g),children:[a.jsx(it,{children:a.jsx(Nt,{})}),a.jsx(lt,{className:"tw-z-[250]",children:Object.keys(e).map(g=>a.jsx($e,{value:g,children:w(g,t)},g))})]}),t!=="en"&&a.jsxs(a.Fragment,{children:[a.jsx(Ce,{className:"tw-ms-3",children:c}),a.jsx("div",{className:"tw-ms-3",children:a.jsxs(Ce,{children:["Currently:"," ",(n==null?void 0:n.length)>0?`${n.map(g=>w(g,t)).join(", ")}`:`default (${e.en.autonym})`]})})]})]})}const jm=(e,t)=>{b.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Gr=()=>!1,Em=(e,t)=>{const[n]=rr(b.useCallback(async()=>{if(!e)return Gr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Gr,{preserveValue:!1});b.useEffect(()=>()=>{n!==Gr&&n()},[n])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>is.toast});exports.Alert=Li;exports.AlertDescription=Ui;exports.AlertTitle=Gi;exports.BOOK_SELECTOR_STRING_KEYS=gc;exports.Badge=Hi;exports.BookChapterControl=cc;exports.BookSelectionMode=js;exports.BookSelector=bc;exports.Button=pe;exports.Card=Xi;exports.CardContent=Ji;exports.CardDescription=Ki;exports.CardFooter=Zi;exports.CardHeader=Yi;exports.CardTitle=Wi;exports.ChapterRangeSelector=Ss;exports.Checkbox=lr;exports.Checklist=dd;exports.ComboBox=Kn;exports.DataTable=_s;exports.DisableButton=mm;exports.DropdownMenu=ar;exports.DropdownMenuCheckboxItem=sr;exports.DropdownMenuContent=En;exports.DropdownMenuGroup=us;exports.DropdownMenuItem=io;exports.DropdownMenuItemType=al;exports.DropdownMenuLabel=Wt;exports.DropdownMenuPortal=Bl;exports.DropdownMenuRadioGroup=Vl;exports.DropdownMenuRadioItem=lo;exports.DropdownMenuSeparator=Cn;exports.DropdownMenuShortcut=fs;exports.DropdownMenuSub=zl;exports.DropdownMenuSubContent=ws;exports.DropdownMenuSubTrigger=ps;exports.DropdownMenuTrigger=so;exports.EnableButton=fm;exports.Filter=Nm;exports.FilterButton=ol;exports.FilterDropdown=bm;exports.Footer=ym;exports.GridMenu=Vi;exports.HamburgerMenuButton=Fi;exports.INVENTORY_STRING_KEYS=Cc;exports.IconButton=im;exports.Input=Ct;exports.InstallButton=wm;exports.Inventory=Oc;exports.Label=Ce;exports.MarkdownRenderer=gm;exports.MenuItem=Ko;exports.MoreInfo=xm;exports.MultiSelectComboBox=Ds;exports.NavigationContentSearch=_c;exports.NoExtensionsFound=vm;exports.Popover=fo;exports.PopoverContent=ir;exports.PopoverTrigger=mo;exports.RadioGroup=wo;exports.RadioGroupItem=Wn;exports.ScriptureResultsViewer=ad;exports.ScrollGroupSelector=sd;exports.SearchBar=So;exports.Select=yt;exports.SelectContent=lt;exports.SelectGroup=Es;exports.SelectItem=$e;exports.SelectLabel=Cs;exports.SelectScrollDownButton=No;exports.SelectScrollUpButton=yo;exports.SelectSeparator=Ts;exports.SelectTrigger=it;exports.SelectValue=Nt;exports.Separator=dr;exports.SettingsList=id;exports.SettingsListHeader=cd;exports.SettingsListItem=ld;exports.SettingsSidebar=Ys;exports.SettingsSidebarContentSearch=Jc;exports.Slider=Qi;exports.Sonner=um;exports.Spinner=Jt;exports.Switch=el;exports.Table=Tn;exports.TableBody=On;exports.TableCaption=Os;exports.TableCell=kt;exports.TableFooter=Rs;exports.TableHead=Vt;exports.TableHeader=Rn;exports.TableRow=Qe;exports.Tabs=pm;exports.TabsContent=rl;exports.TabsList=tl;exports.TabsTrigger=nl;exports.TextField=lm;exports.ToggleGroup=ko;exports.ToggleGroupItem=mn;exports.Toolbar=cm;exports.UiLanguageSelector=Sm;exports.UpdateButton=hm;exports.VersionHistory=sl;exports.VerticalTabs=jo;exports.VerticalTabsContent=Co;exports.VerticalTabsList=Eo;exports.VerticalTabsTrigger=Bs;exports.badgeVariants=qi;exports.buttonVariants=ys;exports.cn=N;exports.getBookNumFromId=Is;exports.getLinesFromUSFM=Ps;exports.getNumberFromUSFM=Xr;exports.getStatusForItem=$s;exports.inventoryCountColumn=jc;exports.inventoryItemColumn=kc;exports.inventoryStatusColumn=Ec;exports.useEvent=jm;exports.useEventAsync=Em;exports.usePromise=rr;function Cm(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Cm(`*, ::before, ::after {
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

    --popover: 0 0% 100%;
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
.tw-right-auto {
  right: auto;
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
.tw-ps-4 {
  padding-inline-start: 1rem;
}
.tw-ps-8 {
  padding-inline-start: 2rem;
}
.tw-ps-9 {
  padding-inline-start: 2.25rem;
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
