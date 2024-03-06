"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const m=require("react/jsx-runtime"),V=require("react"),me=require("platform-bible-utils"),Wr=require("@radix-ui/react-dropdown-menu"),Xe=require("lucide-react"),br=require("clsx"),Hr=require("tailwind-merge"),ee=require("@mui/material"),Vn=require("react-data-grid"),En=require("@mui/styled-engine");function yr(e){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const r in e)if(r!=="default"){const t=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,t.get?t:{enumerable:!0,get:()=>e[r]})}}return n.default=e,Object.freeze(n)}const se=yr(V),J=yr(Wr);var Xr=Object.defineProperty,Yr=(e,n,r)=>n in e?Xr(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,I=(e,n,r)=>(Yr(e,typeof n!="symbol"?n+"":n,r),r);const $e=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],_n=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],vr=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Fn=at();function Le(e,n=!0){return n&&(e=e.toUpperCase()),e in Fn?Fn[e]:0}function Nn(e){return Le(e)>0}function Kr(e){const n=typeof e=="string"?Le(e):e;return n>=40&&n<=66}function Jr(e){return(typeof e=="string"?Le(e):e)<=39}function xr(e){return e<=66}function Zr(e){const n=typeof e=="string"?Le(e):e;return Sr(n)&&!xr(n)}function*Qr(){for(let e=1;e<=$e.length;e++)yield e}const et=1,wr=$e.length;function nt(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function On(e,n="***"){const r=e-1;return r<0||r>=$e.length?n:$e[r]}function kr(e){return e<=0||e>wr?"******":vr[e-1]}function rt(e){return kr(Le(e))}function Sr(e){const n=typeof e=="number"?On(e):e;return Nn(n)&&!_n.includes(n)}function tt(e){const n=typeof e=="number"?On(e):e;return Nn(n)&&_n.includes(n)}function ot(e){return vr[e-1].includes("*obsolete*")}function at(){const e={};for(let n=0;n<$e.length;n++)e[$e[n]]=n+1;return e}const Q={allBookIds:$e,nonCanonicalIds:_n,bookIdToNumber:Le,isBookIdValid:Nn,isBookNT:Kr,isBookOT:Jr,isBookOTNT:xr,isBookDC:Zr,allBookNumbers:Qr,firstBook:et,lastBook:wr,extraBooks:nt,bookNumberToId:On,bookNumberToEnglishName:kr,bookIdToEnglishName:rt,isCanonical:Sr,isExtraMaterial:tt,isObsolete:ot};var Ee=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ee||{});const Ne=class{constructor(e){if(I(this,"name"),I(this,"fullPath"),I(this,"isPresent"),I(this,"hasVerseSegments"),I(this,"isCustomized"),I(this,"baseVersification"),I(this,"scriptureBooks"),I(this,"_type"),e!=null)typeof e=="string"?this.name=e:this._type=e;else throw new Error("Argument null")}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};let ue=Ne;I(ue,"Original",new Ne(Ee.Original)),I(ue,"Septuagint",new Ne(Ee.Septuagint)),I(ue,"Vulgate",new Ne(Ee.Vulgate)),I(ue,"English",new Ne(Ee.English)),I(ue,"RussianProtestant",new Ne(Ee.RussianProtestant)),I(ue,"RussianOrthodox",new Ne(Ee.RussianOrthodox));function Ln(e,n){const r=n[0];for(let t=1;t<n.length;t++)e=e.split(n[t]).join(r);return e.split(r)}var Er=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Er||{});const P=class{constructor(e,n,r,t){if(I(this,"firstChapter"),I(this,"lastChapter"),I(this,"lastVerse"),I(this,"hasSegmentsDefined"),I(this,"text"),I(this,"BBBCCCVVVS"),I(this,"longHashCode"),I(this,"versification"),I(this,"rtlMark","‏"),I(this,"_bookNum",0),I(this,"_chapterNum",0),I(this,"_verseNum",0),I(this,"_verse"),r==null&&t==null)if(e!=null&&typeof e=="string"){const o=e,a=n!=null&&n instanceof ue?n:void 0;this.setEmpty(a),this.parse(o)}else if(e!=null&&typeof e=="number"){const o=n!=null&&n instanceof ue?n:void 0;this.setEmpty(o),this._verseNum=e%P.chapterDigitShifter,this._chapterNum=Math.floor(e%P.bookDigitShifter/P.chapterDigitShifter),this._bookNum=Math.floor(e/P.bookDigitShifter)}else if(n==null)if(e!=null&&e instanceof P){const o=e;this._bookNum=o.bookNum,this._chapterNum=o.chapterNum,this._verseNum=o.verseNum,this._verse=o.verse,this.versification=o.versification}else{if(e==null)return;const o=e instanceof ue?e:P.defaultVersification;this.setEmpty(o)}else throw new Error("VerseRef constructor not supported.");else if(e!=null&&n!=null&&r!=null)if(typeof e=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(t),this.updateInternal(e,n,r);else if(typeof e=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=e,this._chapterNum=n,this._verseNum=r,this.versification=t??P.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(e,n=P.defaultVersification){const r=new P(n);return r.parse(e),r}static isVerseParseable(e){return e.length>0&&"0123456789".includes(e[0])&&!e.endsWith(this.verseRangeSeparator)&&!e.endsWith(this.verseSequenceIndicator)}static tryParse(e){let n;try{return n=P.parse(e),{success:!0,verseRef:n}}catch(r){if(r instanceof Ue)return n=new P,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(e,n,r){return e%P.bcvMaxValue*P.bookDigitShifter+(n>=0?n%P.bcvMaxValue*P.chapterDigitShifter:0)+(r>=0?r%P.bcvMaxValue:0)}static tryGetVerseNum(e){let n;if(!e)return n=-1,{success:!0,vNum:n};n=0;let r;for(let t=0;t<e.length;t++){if(r=e[t],r<"0"||r>"9")return t===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>P.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(P.verseRangeSeparator)||this._verse.includes(P.verseSequenceIndicator))}get book(){return Q.bookNumberToId(this.bookNum,"")}set book(e){this.bookNum=Q.bookIdToNumber(e)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(e){const n=+e;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(e){const{success:n,vNum:r}=P.tryGetVerseNum(e);this._verse=n?void 0:e.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=P.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(e){if(e<=0||e>Q.lastBook)throw new Ue("BookNum must be greater than zero and less than or equal to last book");this._bookNum=e}get chapterNum(){return this._chapterNum}set chapterNum(e){this.chapterNum=e}get verseNum(){return this._verseNum}set verseNum(e){this._verseNum=e}get versificationStr(){var e;return(e=this.versification)==null?void 0:e.name}set versificationStr(e){this.versification=this.versification!=null?new ue(e):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(P.verseRangeSeparators,P.verseSequenceIndicators)}get BBBCCC(){return P.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return P.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(e){if(e=e.replace(this.rtlMark,""),e.includes("/")){const o=e.split("/");if(e=o[0],o.length>1)try{const a=+o[1].trim();this.versification=new ue(Ee[a])}catch{throw new Ue("Invalid reference : "+e)}}const n=e.trim().split(" ");if(n.length!==2)throw new Ue("Invalid reference : "+e);const r=n[1].split(":"),t=+r[0];if(r.length!==2||Q.bookIdToNumber(n[0])===0||!Number.isInteger(t)||t<0||!P.isVerseParseable(r[1]))throw new Ue("Invalid reference : "+e);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new P(this)}toString(){const e=this.book;return e===""?"":`${e} ${this.chapter}:${this.verse}`}equals(e){return e._bookNum===this._bookNum&&e._chapterNum===this._chapterNum&&e._verseNum===this._verseNum&&e._verse===this._verse&&e.versification!=null&&this.versification!=null&&e.versification.equals(this.versification)}allVerses(e=!1,n=P.verseRangeSeparators,r=P.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const t=[],o=Ln(this._verse,r);for(const a of o.map(i=>Ln(i,n))){const i=this.clone();i.verse=a[0];const u=i.verseNum;if(t.push(i),a.length>1){const c=this.clone();if(c.verse=a[1],!e)for(let s=u+1;s<c.verseNum;s++){const l=new P(this._bookNum,this._chapterNum,s,this.versification);this.isExcluded||t.push(l)}t.push(c)}}return t}validateVerse(e,n){if(!this.verse)return this.internalValid;let r=0;for(const t of this.allVerses(!0,e,n)){const o=t.internalValid;if(o!==0)return o;const a=t.BBBCCCVVV;if(r>a)return 3;if(r===a)return 4;r=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>Q.lastBook?2:0}setEmpty(e=P.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=e}updateInternal(e,n,r){this.bookNum=Q.bookIdToNumber(e),this.chapter=n,this.verse=r}};let xe=P;I(xe,"defaultVersification",ue.English),I(xe,"verseRangeSeparator","-"),I(xe,"verseSequenceIndicator",","),I(xe,"verseRangeSeparators",[P.verseRangeSeparator]),I(xe,"verseSequenceIndicators",[P.verseSequenceIndicator]),I(xe,"chapterDigitShifter",1e3),I(xe,"bookDigitShifter",P.chapterDigitShifter*P.chapterDigitShifter),I(xe,"bcvMaxValue",P.chapterDigitShifter-1),I(xe,"ValidStatusType",Er);class Ue extends Error{}function ke(...e){return Hr.twMerge(br.clsx(e))}const it=J.Root,st=J.Trigger,ct=se.forwardRef(({className:e,inset:n,children:r,...t},o)=>m.jsxs(J.SubTrigger,{ref:o,className:ke("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",n&&"pr-pl-8",e),...t,children:[r,m.jsx(Xe.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));ct.displayName=J.SubTrigger.displayName;const lt=se.forwardRef(({className:e,...n},r)=>m.jsx(J.SubContent,{ref:r,className:ke("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n}));lt.displayName=J.SubContent.displayName;const Cr=se.forwardRef(({className:e,sideOffset:n=4,...r},t)=>m.jsx(J.Portal,{children:m.jsx(J.Content,{ref:t,sideOffset:n,className:ke("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r})}));Cr.displayName=J.Content.displayName;const Tr=se.forwardRef(({className:e,inset:n,...r},t)=>m.jsx(J.Item,{ref:t,className:ke("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",n&&"pr-pl-8",e),...r}));Tr.displayName=J.Item.displayName;const ut=se.forwardRef(({className:e,children:n,checked:r,...t},o)=>m.jsxs(J.CheckboxItem,{ref:o,className:ke("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:r,...t,children:[m.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:m.jsx(J.ItemIndicator,{children:m.jsx(Xe.Check,{className:"pr-h-4 pr-w-4"})})}),n]}));ut.displayName=J.CheckboxItem.displayName;const dt=se.forwardRef(({className:e,children:n,...r},t)=>m.jsxs(J.RadioItem,{ref:t,className:ke("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...r,children:[m.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:m.jsx(J.ItemIndicator,{children:m.jsx(Xe.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),n]}));dt.displayName=J.RadioItem.displayName;const _r=se.forwardRef(({className:e,inset:n,...r},t)=>m.jsx(J.Label,{ref:t,className:ke("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",n&&"pr-pl-8",e),...r}));_r.displayName=J.Label.displayName;const Nr=se.forwardRef(({className:e,...n},r)=>m.jsx(J.Separator,{ref:r,className:ke("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...n}));Nr.displayName=J.Separator.displayName;const Or=se.forwardRef(({className:e,type:n,...r},t)=>m.jsx("input",{type:n,className:ke("pr-flex pr-h-10 pr-w-full pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:t,...r}));Or.displayName="Input";const ft=V.forwardRef(({handleSearch:e,handleKeyDown:n,...r},t)=>m.jsxs("div",{className:"input-container",children:[m.jsx(Or,{...r,type:"text",className:"book-chapter-input",onChange:o=>e(o.target.value),onKeyUp:n,ref:t}),m.jsx("div",{className:"history-icon-container",children:m.jsx(Xe.History,{size:16,onClick:()=>{console.log("back in history")}})})]}));function pt({endChapter:e,activeChapter:n,handleSelectChapter:r}){const t=Array.from({length:e},(o,a)=>a+1);return m.jsx("div",{className:"chapter-select",children:t.map(o=>m.jsx("div",{className:`chapter ${o===n?"active":void 0}`,onClick:()=>r(o),children:o},o))})}function ht({bookId:e,handleSelectBook:n,isSelected:r,bookType:t,children:o}){return m.jsxs("div",{children:[m.jsx(Tr,{textValue:e,className:`menu-item ${r&&"selected"}`,onSelect:a=>{a.preventDefault(),n(e)},children:m.jsxs("div",{children:[m.jsx(Xe.Tally1,{className:`book-color-label ${t.toLowerCase()}`}),Q.bookIdToEnglishName(e)]})},e),r&&o]})}const mt={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},gt=["OT","NT","DC"];function bt({scrRef:e,handleSubmit:n}){const{allBookIds:r}=Q,[t,o]=V.useState(""),[a,i]=V.useState(""),[u,c]=V.useState(!1),s=V.useRef(void 0),l=V.useCallback(C=>({OT:r.filter(E=>Q.isBookOT(E)),NT:r.filter(E=>Q.isBookNT(E)),DC:r.filter(E=>Q.isBookDC(E))})[C],[r]),p=V.useCallback(C=>l(C).filter(T=>Q.bookIdToEnglishName(T).toLowerCase().includes(t.toLowerCase())||T.toLowerCase().includes(t.toLowerCase())),[l,t]),d=C=>{o(C)},v=V.useCallback(C=>me.getChaptersForBook(Q.bookIdToNumber(C)),[]),y=C=>{i(a!==C?C:""),v(C)===-1&&n({bookNum:Q.bookIdToNumber(C),chapterNum:1,verseNum:1})},h=C=>{n({bookNum:Q.bookIdToNumber(a),chapterNum:C,verseNum:1})},f=V.useCallback(C=>{!C&&document.activeElement===s.current?(console.log("trying to keep the menu open"),c(!0)):(console.log("controlling menu state"),c(C))},[]),S=V.useCallback(()=>s.current.focus(),[]);return m.jsx("div",{children:m.jsxs(it,{modal:!1,open:u,onOpenChange:f,children:[m.jsx(st,{asChild:!0,children:m.jsx(ft,{ref:s,value:t,handleSearch:d,handleKeyDown:()=>c(!0),placeholder:`${Q.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),m.jsx(Cr,{className:"menu-content",onKeyDown:S,children:gt.map(C=>m.jsxs("div",{children:[m.jsx(_r,{className:"menu-label",children:mt[C]}),p(C).map(T=>m.jsx("div",{children:m.jsx(ht,{bookId:T,handleSelectBook:()=>y(T),isSelected:a===T,bookType:C,children:m.jsx(pt,{handleSelectChapter:h,endChapter:v(T),activeChapter:e.bookNum===Q.bookIdToNumber(T)?e.chapterNum:0})})},T)),C==="OT"||C==="NT"?m.jsx(Nr,{}):void 0]},C))})]})})}function Oe({id:e,isDisabled:n=!1,className:r,onClick:t,onContextMenu:o,children:a}){return m.jsx(ee.Button,{id:e,disabled:n,className:`papi-button ${r??""}`,onClick:t,onContextMenu:o,children:a})}function nn({id:e,title:n,isDisabled:r=!1,isClearable:t=!0,hasError:o=!1,isFullWidth:a=!1,width:i,options:u=[],className:c,value:s,onChange:l,onFocus:p,onBlur:d,getOptionLabel:v}){return m.jsx(ee.Autocomplete,{id:e,disablePortal:!0,disabled:r,disableClearable:!t,fullWidth:a,options:u,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:s,onChange:l,onFocus:p,onBlur:d,getOptionLabel:v,renderInput:y=>m.jsx(ee.TextField,{...y,error:o,fullWidth:a,disabled:r,label:n,style:{width:i}})})}function yt({startChapter:e,endChapter:n,handleSelectStartChapter:r,handleSelectEndChapter:t,isDisabled:o,chapterCount:a}){const i=V.useMemo(()=>Array.from({length:a},(s,l)=>l+1),[a]),u=(s,l)=>{r(l),l>n&&t(l)},c=(s,l)=>{t(l),l<e&&r(l)};return m.jsxs(m.Fragment,{children:[m.jsx(ee.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:m.jsx(nn,{onChange:(s,l)=>u(s,l),className:"book-selection-chapter",isClearable:!1,options:i,getOptionLabel:s=>s.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),m.jsx(ee.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:m.jsx(nn,{onChange:(s,l)=>c(s,l),className:"book-selection-chapter",isClearable:!1,options:i,getOptionLabel:s=>s.toString(),value:n,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var Re=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Re||{});function Rr({id:e,isChecked:n,labelText:r="",labelPosition:t=Re.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:i=!1,hasError:u=!1,className:c,onChange:s}){const l=m.jsx(ee.Checkbox,{id:e,checked:n,indeterminate:o,defaultChecked:a,disabled:i,className:`papi-checkbox ${u?"error":""} ${c??""}`,onChange:s});let p;if(r){const d=t===Re.Before||t===Re.Above,v=m.jsx("span",{className:`papi-checkbox-label ${u?"error":""} ${c??""}`,children:r}),y=t===Re.Before||t===Re.After,h=y?v:m.jsx("div",{children:v}),f=y?l:m.jsx("div",{children:l});p=m.jsxs(ee.FormLabel,{className:`papi-checkbox ${t.toString()}`,disabled:i,error:u,children:[d&&h,f,!d&&h]})}else p=l;return p}function $r(e){const{onClick:n,name:r,hasAutoFocus:t=!1,className:o,isDense:a=!0,hasDisabledGutters:i=!1,hasDivider:u=!1,focusVisibleClassName:c,id:s,children:l}=e;return m.jsx(ee.MenuItem,{autoFocus:t,className:o,dense:a,disableGutters:i,divider:u,focusVisibleClassName:c,onClick:n,id:s,children:r||l})}function vt({commandHandler:e,name:n,className:r,items:t,id:o}){return m.jsxs(ee.Grid,{id:o,item:!0,xs:"auto",className:`papi-menu-column ${r??""}`,children:[m.jsx("h3",{className:`papi-menu ${r??""}`,children:n}),t.map((a,i)=>m.jsx($r,{className:`papi-menu-item ${a.className}`,onClick:()=>{e(a)},...a},i))]})}function Ar({commandHandler:e,className:n,columns:r,id:t}){return m.jsx(ee.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${n??""}`,columns:r.length,id:t,children:r.map((o,a)=>m.jsx(vt,{commandHandler:e,name:o.name,className:n,items:o.items},a))})}function xt({id:e,label:n,isDisabled:r=!1,tooltip:t,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:i="medium",className:u,onClick:c,children:s}){return m.jsx(ee.IconButton,{id:e,disabled:r,edge:a,size:i,"aria-label":n,title:o?void 0:t??n,className:`papi-icon-button ${u??""}`,onClick:c,children:s})}function We({variant:e="outlined",id:n,isDisabled:r=!1,hasError:t=!1,isFullWidth:o=!1,helperText:a,label:i,placeholder:u,isRequired:c=!1,className:s,defaultValue:l,value:p,onChange:d,onFocus:v,onBlur:y}){return m.jsx(ee.TextField,{variant:e,id:n,disabled:r,error:t,fullWidth:o,helperText:a,label:i,placeholder:u,required:c,className:`papi-textfield ${s??""}`,defaultValue:l,value:p,onChange:d,onFocus:v,onBlur:y})}let hn;const mn=()=>(hn||(hn=Q.allBookIds.map(e=>({bookId:e,label:Q.bookIdToEnglishName(e)}))),hn);function wt({scrRef:e,handleSubmit:n,id:r}){const t=c=>{n(c)},o=(c,s)=>{const p={bookNum:Q.bookIdToNumber(s.bookId),chapterNum:1,verseNum:1};t(p)},a=c=>{n({...e,chapterNum:+c.target.value})},i=c=>{n({...e,verseNum:+c.target.value})},u=V.useMemo(()=>mn()[e.bookNum-1],[e.bookNum]);return m.jsxs("span",{id:r,children:[m.jsx(nn,{title:"Book",className:"papi-ref-selector book",value:u,options:mn(),onChange:o,isClearable:!1,width:200}),m.jsx(Oe,{onClick:()=>t(me.offsetBook(e,-1)),isDisabled:e.bookNum<=me.FIRST_SCR_BOOK_NUM,children:"<"}),m.jsx(Oe,{onClick:()=>t(me.offsetBook(e,1)),isDisabled:e.bookNum>=mn().length,children:">"}),m.jsx(We,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:a}),m.jsx(Oe,{onClick:()=>n(me.offsetChapter(e,-1)),isDisabled:e.chapterNum<=me.FIRST_SCR_CHAPTER_NUM,children:"<"}),m.jsx(Oe,{onClick:()=>n(me.offsetChapter(e,1)),isDisabled:e.chapterNum>=me.getChaptersForBook(e.bookNum),children:">"}),m.jsx(We,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:i}),m.jsx(Oe,{onClick:()=>n(me.offsetVerse(e,-1)),isDisabled:e.verseNum<=me.FIRST_SCR_VERSE_NUM,children:"<"}),m.jsx(Oe,{onClick:()=>n(me.offsetVerse(e,1)),children:">"})]})}function kt({onSearch:e,placeholder:n,isFullWidth:r}){const[t,o]=V.useState(""),a=i=>{o(i),e(i)};return m.jsx(ee.Paper,{component:"form",className:"search-bar-paper",children:m.jsx(We,{isFullWidth:r,className:"search-bar-input",placeholder:n,value:t,onChange:i=>a(i.target.value)})})}function St({id:e,isDisabled:n=!1,orientation:r="horizontal",min:t=0,max:o=100,step:a=1,showMarks:i=!1,defaultValue:u,value:c,valueLabelDisplay:s="off",className:l,onChange:p,onChangeCommitted:d}){return m.jsx(ee.Slider,{id:e,disabled:n,orientation:r,min:t,max:o,step:a,marks:i,defaultValue:u,value:c,valueLabelDisplay:s,className:`papi-slider ${r} ${l??""}`,onChange:p,onChangeCommitted:d})}function Et({autoHideDuration:e=void 0,id:n,isOpen:r=!1,className:t,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:i,children:u}){const c={action:(i==null?void 0:i.action)||u,message:i==null?void 0:i.message,className:t};return m.jsx(ee.Snackbar,{autoHideDuration:e??void 0,open:r,onClose:o,anchorOrigin:a,id:n,ContentProps:c})}function Ct({id:e,isChecked:n,isDisabled:r=!1,hasError:t=!1,className:o,onChange:a}){return m.jsx(ee.Switch,{id:e,checked:n,disabled:r,className:`papi-switch ${t?"error":""} ${o??""}`,onChange:a})}function Un({onRowChange:e,row:n,column:r}){const t=o=>{e({...n,[r.key]:o.target.value})};return m.jsx(We,{defaultValue:n[r.key],onChange:t})}const Tt=({onChange:e,disabled:n,checked:r,...t})=>{const o=a=>{e(a.target.checked,a.nativeEvent.shiftKey)};return m.jsx(Rr,{...t,isChecked:r,isDisabled:n,onChange:o})};function _t({columns:e,sortColumns:n,onSortColumnsChange:r,onColumnResize:t,defaultColumnWidth:o,defaultColumnMinWidth:a,defaultColumnMaxWidth:i,defaultColumnSortable:u=!0,defaultColumnResizable:c=!0,rows:s,enableSelectColumn:l,selectColumnWidth:p=50,rowKeyGetter:d,rowHeight:v=35,headerRowHeight:y=35,selectedRows:h,onSelectedRowsChange:f,onRowsChange:S,onCellClick:C,onCellDoubleClick:T,onCellContextMenu:E,onCellKeyDown:g,direction:re="ltr",enableVirtualization:ae=!0,onCopy:be,onPaste:pe,onScroll:N,className:X}){const ne=V.useMemo(()=>{const ie=e.map(G=>typeof G.editable=="function"?{...G,editable:te=>!!G.editable(te),renderEditCell:G.renderEditCell||Un}:G.editable&&!G.renderEditCell?{...G,renderEditCell:Un}:G.renderEditCell&&!G.editable?{...G,editable:!1}:G);return l?[{...Vn.SelectColumn,minWidth:p},...ie]:ie},[e,l,p]);return m.jsx(Vn,{columns:ne,defaultColumnOptions:{width:o,minWidth:a,maxWidth:i,sortable:u,resizable:c},sortColumns:n,onSortColumnsChange:r,onColumnResize:t,rows:s,rowKeyGetter:d,rowHeight:v,headerRowHeight:y,selectedRows:h,onSelectedRowsChange:f,onRowsChange:S,onCellClick:C,onCellDoubleClick:T,onCellContextMenu:E,onCellKeyDown:g,direction:re,enableVirtualization:ae,onCopy:be,onPaste:pe,onScroll:N,renderers:{renderCheckbox:Tt},className:X??"rdg-light"})}function D(){return D=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},D.apply(this,arguments)}function Ce(e){if(typeof e!="object"||e===null)return!1;const n=Object.getPrototypeOf(e);return(n===null||n===Object.prototype||Object.getPrototypeOf(n)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Pr(e){if(!Ce(e))return e;const n={};return Object.keys(e).forEach(r=>{n[r]=Pr(e[r])}),n}function ge(e,n,r={clone:!0}){const t=r.clone?D({},e):e;return Ce(e)&&Ce(n)&&Object.keys(n).forEach(o=>{o!=="__proto__"&&(Ce(n[o])&&o in e&&Ce(e[o])?t[o]=ge(e[o],n[o],r):r.clone?t[o]=Ce(n[o])?Pr(n[o]):n[o]:t[o]=n[o])}),t}function Nt(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Cn={exports:{}},Ze={exports:{}},F={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qn;function Ot(){if(qn)return F;qn=1;var e=typeof Symbol=="function"&&Symbol.for,n=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,t=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,u=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,s=e?Symbol.for("react.concurrent_mode"):60111,l=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,f=e?Symbol.for("react.fundamental"):60117,S=e?Symbol.for("react.responder"):60118,C=e?Symbol.for("react.scope"):60119;function T(g){if(typeof g=="object"&&g!==null){var re=g.$$typeof;switch(re){case n:switch(g=g.type,g){case c:case s:case t:case a:case o:case p:return g;default:switch(g=g&&g.$$typeof,g){case u:case l:case y:case v:case i:return g;default:return re}}case r:return re}}}function E(g){return T(g)===s}return F.AsyncMode=c,F.ConcurrentMode=s,F.ContextConsumer=u,F.ContextProvider=i,F.Element=n,F.ForwardRef=l,F.Fragment=t,F.Lazy=y,F.Memo=v,F.Portal=r,F.Profiler=a,F.StrictMode=o,F.Suspense=p,F.isAsyncMode=function(g){return E(g)||T(g)===c},F.isConcurrentMode=E,F.isContextConsumer=function(g){return T(g)===u},F.isContextProvider=function(g){return T(g)===i},F.isElement=function(g){return typeof g=="object"&&g!==null&&g.$$typeof===n},F.isForwardRef=function(g){return T(g)===l},F.isFragment=function(g){return T(g)===t},F.isLazy=function(g){return T(g)===y},F.isMemo=function(g){return T(g)===v},F.isPortal=function(g){return T(g)===r},F.isProfiler=function(g){return T(g)===a},F.isStrictMode=function(g){return T(g)===o},F.isSuspense=function(g){return T(g)===p},F.isValidElementType=function(g){return typeof g=="string"||typeof g=="function"||g===t||g===s||g===a||g===o||g===p||g===d||typeof g=="object"&&g!==null&&(g.$$typeof===y||g.$$typeof===v||g.$$typeof===i||g.$$typeof===u||g.$$typeof===l||g.$$typeof===f||g.$$typeof===S||g.$$typeof===C||g.$$typeof===h)},F.typeOf=T,F}var L={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gn;function Rt(){return Gn||(Gn=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,n=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,t=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,u=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,s=e?Symbol.for("react.concurrent_mode"):60111,l=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,f=e?Symbol.for("react.fundamental"):60117,S=e?Symbol.for("react.responder"):60118,C=e?Symbol.for("react.scope"):60119;function T(x){return typeof x=="string"||typeof x=="function"||x===t||x===s||x===a||x===o||x===p||x===d||typeof x=="object"&&x!==null&&(x.$$typeof===y||x.$$typeof===v||x.$$typeof===i||x.$$typeof===u||x.$$typeof===l||x.$$typeof===f||x.$$typeof===S||x.$$typeof===C||x.$$typeof===h)}function E(x){if(typeof x=="object"&&x!==null){var le=x.$$typeof;switch(le){case n:var k=x.type;switch(k){case c:case s:case t:case a:case o:case p:return k;default:var Pe=k&&k.$$typeof;switch(Pe){case u:case l:case y:case v:case i:return Pe;default:return le}}case r:return le}}}var g=c,re=s,ae=u,be=i,pe=n,N=l,X=t,ne=y,ie=v,G=r,he=a,te=o,ve=p,_e=!1;function Ae(x){return _e||(_e=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),b(x)||E(x)===c}function b(x){return E(x)===s}function w(x){return E(x)===u}function A(x){return E(x)===i}function R(x){return typeof x=="object"&&x!==null&&x.$$typeof===n}function _(x){return E(x)===l}function j(x){return E(x)===t}function O(x){return E(x)===y}function $(x){return E(x)===v}function M(x){return E(x)===r}function z(x){return E(x)===a}function B(x){return E(x)===o}function oe(x){return E(x)===p}L.AsyncMode=g,L.ConcurrentMode=re,L.ContextConsumer=ae,L.ContextProvider=be,L.Element=pe,L.ForwardRef=N,L.Fragment=X,L.Lazy=ne,L.Memo=ie,L.Portal=G,L.Profiler=he,L.StrictMode=te,L.Suspense=ve,L.isAsyncMode=Ae,L.isConcurrentMode=b,L.isContextConsumer=w,L.isContextProvider=A,L.isElement=R,L.isForwardRef=_,L.isFragment=j,L.isLazy=O,L.isMemo=$,L.isPortal=M,L.isProfiler=z,L.isStrictMode=B,L.isSuspense=oe,L.isValidElementType=T,L.typeOf=E}()),L}var Wn;function Ir(){return Wn||(Wn=1,process.env.NODE_ENV==="production"?Ze.exports=Ot():Ze.exports=Rt()),Ze.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var gn,Hn;function $t(){if(Hn)return gn;Hn=1;var e=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function t(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var i={},u=0;u<10;u++)i["_"+String.fromCharCode(u)]=u;var c=Object.getOwnPropertyNames(i).map(function(l){return i[l]});if(c.join("")!=="0123456789")return!1;var s={};return"abcdefghijklmnopqrst".split("").forEach(function(l){s[l]=l}),Object.keys(Object.assign({},s)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return gn=o()?Object.assign:function(a,i){for(var u,c=t(a),s,l=1;l<arguments.length;l++){u=Object(arguments[l]);for(var p in u)n.call(u,p)&&(c[p]=u[p]);if(e){s=e(u);for(var d=0;d<s.length;d++)r.call(u,s[d])&&(c[s[d]]=u[s[d]])}}return c},gn}var bn,Xn;function Rn(){if(Xn)return bn;Xn=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return bn=e,bn}var yn,Yn;function jr(){return Yn||(Yn=1,yn=Function.call.bind(Object.prototype.hasOwnProperty)),yn}var vn,Kn;function At(){if(Kn)return vn;Kn=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var n=Rn(),r={},t=jr();e=function(a){var i="Warning: "+a;typeof console<"u"&&console.error(i);try{throw new Error(i)}catch{}}}function o(a,i,u,c,s){if(process.env.NODE_ENV!=="production"){for(var l in a)if(t(a,l)){var p;try{if(typeof a[l]!="function"){var d=Error((c||"React class")+": "+u+" type `"+l+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[l]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw d.name="Invariant Violation",d}p=a[l](i,l,c,u,null,n)}catch(y){p=y}if(p&&!(p instanceof Error)&&e((c||"React class")+": type specification of "+u+" `"+l+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof p+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),p instanceof Error&&!(p.message in r)){r[p.message]=!0;var v=s?s():"";e("Failed "+u+" type: "+p.message+(v??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(r={})},vn=o,vn}var xn,Jn;function Pt(){if(Jn)return xn;Jn=1;var e=Ir(),n=$t(),r=Rn(),t=jr(),o=At(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(u){var c="Warning: "+u;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function i(){return null}return xn=function(u,c){var s=typeof Symbol=="function"&&Symbol.iterator,l="@@iterator";function p(b){var w=b&&(s&&b[s]||b[l]);if(typeof w=="function")return w}var d="<<anonymous>>",v={array:S("array"),bigint:S("bigint"),bool:S("boolean"),func:S("function"),number:S("number"),object:S("object"),string:S("string"),symbol:S("symbol"),any:C(),arrayOf:T,element:E(),elementType:g(),instanceOf:re,node:N(),objectOf:be,oneOf:ae,oneOfType:pe,shape:ne,exact:ie};function y(b,w){return b===w?b!==0||1/b===1/w:b!==b&&w!==w}function h(b,w){this.message=b,this.data=w&&typeof w=="object"?w:{},this.stack=""}h.prototype=Error.prototype;function f(b){if(process.env.NODE_ENV!=="production")var w={},A=0;function R(j,O,$,M,z,B,oe){if(M=M||d,B=B||$,oe!==r){if(c){var x=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw x.name="Invariant Violation",x}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var le=M+":"+$;!w[le]&&A<3&&(a("You are manually calling a React.PropTypes validation function for the `"+B+"` prop on `"+M+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),w[le]=!0,A++)}}return O[$]==null?j?O[$]===null?new h("The "+z+" `"+B+"` is marked as required "+("in `"+M+"`, but its value is `null`.")):new h("The "+z+" `"+B+"` is marked as required in "+("`"+M+"`, but its value is `undefined`.")):null:b(O,$,M,z,B)}var _=R.bind(null,!1);return _.isRequired=R.bind(null,!0),_}function S(b){function w(A,R,_,j,O,$){var M=A[R],z=te(M);if(z!==b){var B=ve(M);return new h("Invalid "+j+" `"+O+"` of type "+("`"+B+"` supplied to `"+_+"`, expected ")+("`"+b+"`."),{expectedType:b})}return null}return f(w)}function C(){return f(i)}function T(b){function w(A,R,_,j,O){if(typeof b!="function")return new h("Property `"+O+"` of component `"+_+"` has invalid PropType notation inside arrayOf.");var $=A[R];if(!Array.isArray($)){var M=te($);return new h("Invalid "+j+" `"+O+"` of type "+("`"+M+"` supplied to `"+_+"`, expected an array."))}for(var z=0;z<$.length;z++){var B=b($,z,_,j,O+"["+z+"]",r);if(B instanceof Error)return B}return null}return f(w)}function E(){function b(w,A,R,_,j){var O=w[A];if(!u(O)){var $=te(O);return new h("Invalid "+_+" `"+j+"` of type "+("`"+$+"` supplied to `"+R+"`, expected a single ReactElement."))}return null}return f(b)}function g(){function b(w,A,R,_,j){var O=w[A];if(!e.isValidElementType(O)){var $=te(O);return new h("Invalid "+_+" `"+j+"` of type "+("`"+$+"` supplied to `"+R+"`, expected a single ReactElement type."))}return null}return f(b)}function re(b){function w(A,R,_,j,O){if(!(A[R]instanceof b)){var $=b.name||d,M=Ae(A[R]);return new h("Invalid "+j+" `"+O+"` of type "+("`"+M+"` supplied to `"+_+"`, expected ")+("instance of `"+$+"`."))}return null}return f(w)}function ae(b){if(!Array.isArray(b))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),i;function w(A,R,_,j,O){for(var $=A[R],M=0;M<b.length;M++)if(y($,b[M]))return null;var z=JSON.stringify(b,function(oe,x){var le=ve(x);return le==="symbol"?String(x):x});return new h("Invalid "+j+" `"+O+"` of value `"+String($)+"` "+("supplied to `"+_+"`, expected one of "+z+"."))}return f(w)}function be(b){function w(A,R,_,j,O){if(typeof b!="function")return new h("Property `"+O+"` of component `"+_+"` has invalid PropType notation inside objectOf.");var $=A[R],M=te($);if(M!=="object")return new h("Invalid "+j+" `"+O+"` of type "+("`"+M+"` supplied to `"+_+"`, expected an object."));for(var z in $)if(t($,z)){var B=b($,z,_,j,O+"."+z,r);if(B instanceof Error)return B}return null}return f(w)}function pe(b){if(!Array.isArray(b))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),i;for(var w=0;w<b.length;w++){var A=b[w];if(typeof A!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+_e(A)+" at index "+w+"."),i}function R(_,j,O,$,M){for(var z=[],B=0;B<b.length;B++){var oe=b[B],x=oe(_,j,O,$,M,r);if(x==null)return null;x.data&&t(x.data,"expectedType")&&z.push(x.data.expectedType)}var le=z.length>0?", expected one of type ["+z.join(", ")+"]":"";return new h("Invalid "+$+" `"+M+"` supplied to "+("`"+O+"`"+le+"."))}return f(R)}function N(){function b(w,A,R,_,j){return G(w[A])?null:new h("Invalid "+_+" `"+j+"` supplied to "+("`"+R+"`, expected a ReactNode."))}return f(b)}function X(b,w,A,R,_){return new h((b||"React class")+": "+w+" type `"+A+"."+R+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+_+"`.")}function ne(b){function w(A,R,_,j,O){var $=A[R],M=te($);if(M!=="object")return new h("Invalid "+j+" `"+O+"` of type `"+M+"` "+("supplied to `"+_+"`, expected `object`."));for(var z in b){var B=b[z];if(typeof B!="function")return X(_,j,O,z,ve(B));var oe=B($,z,_,j,O+"."+z,r);if(oe)return oe}return null}return f(w)}function ie(b){function w(A,R,_,j,O){var $=A[R],M=te($);if(M!=="object")return new h("Invalid "+j+" `"+O+"` of type `"+M+"` "+("supplied to `"+_+"`, expected `object`."));var z=n({},A[R],b);for(var B in z){var oe=b[B];if(t(b,B)&&typeof oe!="function")return X(_,j,O,B,ve(oe));if(!oe)return new h("Invalid "+j+" `"+O+"` key `"+B+"` supplied to `"+_+"`.\nBad object: "+JSON.stringify(A[R],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(b),null,"  "));var x=oe($,B,_,j,O+"."+B,r);if(x)return x}return null}return f(w)}function G(b){switch(typeof b){case"number":case"string":case"undefined":return!0;case"boolean":return!b;case"object":if(Array.isArray(b))return b.every(G);if(b===null||u(b))return!0;var w=p(b);if(w){var A=w.call(b),R;if(w!==b.entries){for(;!(R=A.next()).done;)if(!G(R.value))return!1}else for(;!(R=A.next()).done;){var _=R.value;if(_&&!G(_[1]))return!1}}else return!1;return!0;default:return!1}}function he(b,w){return b==="symbol"?!0:w?w["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&w instanceof Symbol:!1}function te(b){var w=typeof b;return Array.isArray(b)?"array":b instanceof RegExp?"object":he(w,b)?"symbol":w}function ve(b){if(typeof b>"u"||b===null)return""+b;var w=te(b);if(w==="object"){if(b instanceof Date)return"date";if(b instanceof RegExp)return"regexp"}return w}function _e(b){var w=ve(b);switch(w){case"array":case"object":return"an "+w;case"boolean":case"date":case"regexp":return"a "+w;default:return w}}function Ae(b){return!b.constructor||!b.constructor.name?d:b.constructor.name}return v.checkPropTypes=o,v.resetWarningCache=o.resetWarningCache,v.PropTypes=v,v},xn}var wn,Zn;function It(){if(Zn)return wn;Zn=1;var e=Rn();function n(){}function r(){}return r.resetWarningCache=n,wn=function(){function t(i,u,c,s,l,p){if(p!==e){var d=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw d.name="Invariant Violation",d}}t.isRequired=t;function o(){return t}var a={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:o,element:t,elementType:t,instanceOf:o,node:t,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:r,resetWarningCache:n};return a.PropTypes=a,a},wn}if(process.env.NODE_ENV!=="production"){var jt=Ir(),Mt=!0;Cn.exports=Pt()(jt.isElement,Mt)}else Cn.exports=It()();var Bt=Cn.exports;const W=Nt(Bt);function Ve(e){let n="https://mui.com/production-error/?code="+e;for(let r=1;r<arguments.length;r+=1)n+="&args[]="+encodeURIComponent(arguments[r]);return"Minified MUI error #"+e+"; visit "+n+" for the full message."}var Tn={exports:{}},U={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qn;function Dt(){if(Qn)return U;Qn=1;var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),t=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),i=Symbol.for("react.context"),u=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),s=Symbol.for("react.suspense"),l=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),y;y=Symbol.for("react.module.reference");function h(f){if(typeof f=="object"&&f!==null){var S=f.$$typeof;switch(S){case e:switch(f=f.type,f){case r:case o:case t:case s:case l:return f;default:switch(f=f&&f.$$typeof,f){case u:case i:case c:case d:case p:case a:return f;default:return S}}case n:return S}}}return U.ContextConsumer=i,U.ContextProvider=a,U.Element=e,U.ForwardRef=c,U.Fragment=r,U.Lazy=d,U.Memo=p,U.Portal=n,U.Profiler=o,U.StrictMode=t,U.Suspense=s,U.SuspenseList=l,U.isAsyncMode=function(){return!1},U.isConcurrentMode=function(){return!1},U.isContextConsumer=function(f){return h(f)===i},U.isContextProvider=function(f){return h(f)===a},U.isElement=function(f){return typeof f=="object"&&f!==null&&f.$$typeof===e},U.isForwardRef=function(f){return h(f)===c},U.isFragment=function(f){return h(f)===r},U.isLazy=function(f){return h(f)===d},U.isMemo=function(f){return h(f)===p},U.isPortal=function(f){return h(f)===n},U.isProfiler=function(f){return h(f)===o},U.isStrictMode=function(f){return h(f)===t},U.isSuspense=function(f){return h(f)===s},U.isSuspenseList=function(f){return h(f)===l},U.isValidElementType=function(f){return typeof f=="string"||typeof f=="function"||f===r||f===o||f===t||f===s||f===l||f===v||typeof f=="object"&&f!==null&&(f.$$typeof===d||f.$$typeof===p||f.$$typeof===a||f.$$typeof===i||f.$$typeof===c||f.$$typeof===y||f.getModuleId!==void 0)},U.typeOf=h,U}var q={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var er;function zt(){return er||(er=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),t=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),i=Symbol.for("react.context"),u=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),s=Symbol.for("react.suspense"),l=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),y=!1,h=!1,f=!1,S=!1,C=!1,T;T=Symbol.for("react.module.reference");function E(k){return!!(typeof k=="string"||typeof k=="function"||k===r||k===o||C||k===t||k===s||k===l||S||k===v||y||h||f||typeof k=="object"&&k!==null&&(k.$$typeof===d||k.$$typeof===p||k.$$typeof===a||k.$$typeof===i||k.$$typeof===c||k.$$typeof===T||k.getModuleId!==void 0))}function g(k){if(typeof k=="object"&&k!==null){var Pe=k.$$typeof;switch(Pe){case e:var Je=k.type;switch(Je){case r:case o:case t:case s:case l:return Je;default:var zn=Je&&Je.$$typeof;switch(zn){case u:case i:case c:case d:case p:case a:return zn;default:return Pe}}case n:return Pe}}}var re=i,ae=a,be=e,pe=c,N=r,X=d,ne=p,ie=n,G=o,he=t,te=s,ve=l,_e=!1,Ae=!1;function b(k){return _e||(_e=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function w(k){return Ae||(Ae=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function A(k){return g(k)===i}function R(k){return g(k)===a}function _(k){return typeof k=="object"&&k!==null&&k.$$typeof===e}function j(k){return g(k)===c}function O(k){return g(k)===r}function $(k){return g(k)===d}function M(k){return g(k)===p}function z(k){return g(k)===n}function B(k){return g(k)===o}function oe(k){return g(k)===t}function x(k){return g(k)===s}function le(k){return g(k)===l}q.ContextConsumer=re,q.ContextProvider=ae,q.Element=be,q.ForwardRef=pe,q.Fragment=N,q.Lazy=X,q.Memo=ne,q.Portal=ie,q.Profiler=G,q.StrictMode=he,q.Suspense=te,q.SuspenseList=ve,q.isAsyncMode=b,q.isConcurrentMode=w,q.isContextConsumer=A,q.isContextProvider=R,q.isElement=_,q.isForwardRef=j,q.isFragment=O,q.isLazy=$,q.isMemo=M,q.isPortal=z,q.isProfiler=B,q.isStrictMode=oe,q.isSuspense=x,q.isSuspenseList=le,q.isValidElementType=E,q.typeOf=g}()),q}process.env.NODE_ENV==="production"?Tn.exports=Dt():Tn.exports=zt();var nr=Tn.exports;const Vt=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Ft(e){const n=`${e}`.match(Vt);return n&&n[1]||""}function Mr(e,n=""){return e.displayName||e.name||Ft(e)||n}function rr(e,n,r){const t=Mr(n);return e.displayName||(t!==""?`${r}(${t})`:r)}function Lt(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Mr(e,"Component");if(typeof e=="object")switch(e.$$typeof){case nr.ForwardRef:return rr(e,e.render,"ForwardRef");case nr.Memo:return rr(e,e.type,"memo");default:return}}}function ye(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Ve(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Br(e,n){const r=D({},n);return Object.keys(e).forEach(t=>{if(t.toString().match(/^(components|slots)$/))r[t]=D({},e[t],r[t]);else if(t.toString().match(/^(componentsProps|slotProps)$/)){const o=e[t]||{},a=n[t];r[t]={},!a||!Object.keys(a)?r[t]=o:!o||!Object.keys(o)?r[t]=a:(r[t]=D({},a),Object.keys(o).forEach(i=>{r[t][i]=Br(o[i],a[i])}))}else r[t]===void 0&&(r[t]=e[t])}),r}function Ut(e,n,r=void 0){const t={};return Object.keys(e).forEach(o=>{t[o]=e[o].reduce((a,i)=>{if(i){const u=n(i);u!==""&&a.push(u),r&&r[i]&&a.push(r[i])}return a},[]).join(" ")}),t}const tr=e=>e,qt=()=>{let e=tr;return{configure(n){e=n},generate(n){return e(n)},reset(){e=tr}}},Gt=qt(),Wt=Gt,Ht={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function $n(e,n,r="Mui"){const t=Ht[n];return t?`${r}-${t}`:`${Wt.generate(e)}-${n}`}function Xt(e,n,r="Mui"){const t={};return n.forEach(o=>{t[o]=$n(e,o,r)}),t}function Yt(e,n=Number.MIN_SAFE_INTEGER,r=Number.MAX_SAFE_INTEGER){return Math.max(n,Math.min(e,r))}function Se(e,n){if(e==null)return{};var r={},t=Object.keys(e),o,a;for(a=0;a<t.length;a++)o=t[a],!(n.indexOf(o)>=0)&&(r[o]=e[o]);return r}const Kt=["values","unit","step"],Jt=e=>{const n=Object.keys(e).map(r=>({key:r,val:e[r]}))||[];return n.sort((r,t)=>r.val-t.val),n.reduce((r,t)=>D({},r,{[t.key]:t.val}),{})};function Zt(e){const{values:n={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:r="px",step:t=5}=e,o=Se(e,Kt),a=Jt(n),i=Object.keys(a);function u(d){return`@media (min-width:${typeof n[d]=="number"?n[d]:d}${r})`}function c(d){return`@media (max-width:${(typeof n[d]=="number"?n[d]:d)-t/100}${r})`}function s(d,v){const y=i.indexOf(v);return`@media (min-width:${typeof n[d]=="number"?n[d]:d}${r}) and (max-width:${(y!==-1&&typeof n[i[y]]=="number"?n[i[y]]:v)-t/100}${r})`}function l(d){return i.indexOf(d)+1<i.length?s(d,i[i.indexOf(d)+1]):u(d)}function p(d){const v=i.indexOf(d);return v===0?u(i[1]):v===i.length-1?c(i[v]):s(d,i[i.indexOf(d)+1]).replace("@media","@media not all and")}return D({keys:i,values:a,up:u,down:c,between:s,only:l,not:p,unit:r},o)}const Qt={borderRadius:4},eo=Qt,no=process.env.NODE_ENV!=="production"?W.oneOfType([W.number,W.string,W.object,W.array]):{},Te=no;function Ge(e,n){return n?ge(e,n,{clone:!1}):e}const An={xs:0,sm:600,md:900,lg:1200,xl:1536},or={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${An[e]}px)`};function we(e,n,r){const t=e.theme||{};if(Array.isArray(n)){const a=t.breakpoints||or;return n.reduce((i,u,c)=>(i[a.up(a.keys[c])]=r(n[c]),i),{})}if(typeof n=="object"){const a=t.breakpoints||or;return Object.keys(n).reduce((i,u)=>{if(Object.keys(a.values||An).indexOf(u)!==-1){const c=a.up(u);i[c]=r(n[u],u)}else{const c=u;i[c]=n[c]}return i},{})}return r(n)}function ro(e={}){var n;return((n=e.keys)==null?void 0:n.reduce((t,o)=>{const a=e.up(o);return t[a]={},t},{}))||{}}function to(e,n){return e.reduce((r,t)=>{const o=r[t];return(!o||Object.keys(o).length===0)&&delete r[t],r},n)}function an(e,n,r=!0){if(!n||typeof n!="string")return null;if(e&&e.vars&&r){const t=`vars.${n}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(t!=null)return t}return n.split(".").reduce((t,o)=>t&&t[o]!=null?t[o]:null,e)}function rn(e,n,r,t=r){let o;return typeof e=="function"?o=e(r):Array.isArray(e)?o=e[r]||t:o=an(e,r)||t,n&&(o=n(o,t,e)),o}function Z(e){const{prop:n,cssProperty:r=e.prop,themeKey:t,transform:o}=e,a=i=>{if(i[n]==null)return null;const u=i[n],c=i.theme,s=an(c,t)||{};return we(i,u,p=>{let d=rn(s,o,p);return p===d&&typeof p=="string"&&(d=rn(s,o,`${n}${p==="default"?"":ye(p)}`,p)),r===!1?d:{[r]:d}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[n]:Te}:{},a.filterProps=[n],a}function oo(e){const n={};return r=>(n[r]===void 0&&(n[r]=e(r)),n[r])}const ao={m:"margin",p:"padding"},io={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},ar={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},so=oo(e=>{if(e.length>2)if(ar[e])e=ar[e];else return[e];const[n,r]=e.split(""),t=ao[n],o=io[r]||"";return Array.isArray(o)?o.map(a=>t+a):[t+o]}),sn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],cn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],co=[...sn,...cn];function Ye(e,n,r,t){var o;const a=(o=an(e,n,!1))!=null?o:r;return typeof a=="number"?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&typeof i!="number"&&console.error(`MUI: Expected ${t} argument to be a number or a string, got ${i}.`),a*i):Array.isArray(a)?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&(Number.isInteger(i)?i>a.length-1&&console.error([`MUI: The value provided (${i}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${i} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${n}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${n}\` as a number.`].join(`
`))),a[i]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${n}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Dr(e){return Ye(e,"spacing",8,"spacing")}function Ke(e,n){if(typeof n=="string"||n==null)return n;const r=Math.abs(n),t=e(r);return n>=0?t:typeof t=="number"?-t:`-${t}`}function lo(e,n){return r=>e.reduce((t,o)=>(t[o]=Ke(n,r),t),{})}function uo(e,n,r,t){if(n.indexOf(r)===-1)return null;const o=so(r),a=lo(o,t),i=e[r];return we(e,i,a)}function zr(e,n){const r=Dr(e.theme);return Object.keys(e).map(t=>uo(e,n,t,r)).reduce(Ge,{})}function Y(e){return zr(e,sn)}Y.propTypes=process.env.NODE_ENV!=="production"?sn.reduce((e,n)=>(e[n]=Te,e),{}):{};Y.filterProps=sn;function K(e){return zr(e,cn)}K.propTypes=process.env.NODE_ENV!=="production"?cn.reduce((e,n)=>(e[n]=Te,e),{}):{};K.filterProps=cn;process.env.NODE_ENV!=="production"&&co.reduce((e,n)=>(e[n]=Te,e),{});function fo(e=8){if(e.mui)return e;const n=Dr({spacing:e}),r=(...t)=>(process.env.NODE_ENV!=="production"&&(t.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${t.length}`)),(t.length===0?[1]:t).map(a=>{const i=n(a);return typeof i=="number"?`${i}px`:i}).join(" "));return r.mui=!0,r}function ln(...e){const n=e.reduce((t,o)=>(o.filterProps.forEach(a=>{t[a]=o}),t),{}),r=t=>Object.keys(t).reduce((o,a)=>n[a]?Ge(o,n[a](t)):o,{});return r.propTypes=process.env.NODE_ENV!=="production"?e.reduce((t,o)=>Object.assign(t,o.propTypes),{}):{},r.filterProps=e.reduce((t,o)=>t.concat(o.filterProps),[]),r}function de(e){return typeof e!="number"?e:`${e}px solid`}function fe(e,n){return Z({prop:e,themeKey:"borders",transform:n})}const po=fe("border",de),ho=fe("borderTop",de),mo=fe("borderRight",de),go=fe("borderBottom",de),bo=fe("borderLeft",de),yo=fe("borderColor"),vo=fe("borderTopColor"),xo=fe("borderRightColor"),wo=fe("borderBottomColor"),ko=fe("borderLeftColor"),So=fe("outline",de),Eo=fe("outlineColor"),un=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const n=Ye(e.theme,"shape.borderRadius",4,"borderRadius"),r=t=>({borderRadius:Ke(n,t)});return we(e,e.borderRadius,r)}return null};un.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:Te}:{};un.filterProps=["borderRadius"];ln(po,ho,mo,go,bo,yo,vo,xo,wo,ko,un,So,Eo);const dn=e=>{if(e.gap!==void 0&&e.gap!==null){const n=Ye(e.theme,"spacing",8,"gap"),r=t=>({gap:Ke(n,t)});return we(e,e.gap,r)}return null};dn.propTypes=process.env.NODE_ENV!=="production"?{gap:Te}:{};dn.filterProps=["gap"];const fn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const n=Ye(e.theme,"spacing",8,"columnGap"),r=t=>({columnGap:Ke(n,t)});return we(e,e.columnGap,r)}return null};fn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:Te}:{};fn.filterProps=["columnGap"];const pn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const n=Ye(e.theme,"spacing",8,"rowGap"),r=t=>({rowGap:Ke(n,t)});return we(e,e.rowGap,r)}return null};pn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:Te}:{};pn.filterProps=["rowGap"];const Co=Z({prop:"gridColumn"}),To=Z({prop:"gridRow"}),_o=Z({prop:"gridAutoFlow"}),No=Z({prop:"gridAutoColumns"}),Oo=Z({prop:"gridAutoRows"}),Ro=Z({prop:"gridTemplateColumns"}),$o=Z({prop:"gridTemplateRows"}),Ao=Z({prop:"gridTemplateAreas"}),Po=Z({prop:"gridArea"});ln(dn,fn,pn,Co,To,_o,No,Oo,Ro,$o,Ao,Po);function ze(e,n){return n==="grey"?n:e}const Io=Z({prop:"color",themeKey:"palette",transform:ze}),jo=Z({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:ze}),Mo=Z({prop:"backgroundColor",themeKey:"palette",transform:ze});ln(Io,jo,Mo);function ce(e){return e<=1&&e!==0?`${e*100}%`:e}const Bo=Z({prop:"width",transform:ce}),Pn=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const n=r=>{var t,o;const a=((t=e.theme)==null||(t=t.breakpoints)==null||(t=t.values)==null?void 0:t[r])||An[r];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:ce(r)}};return we(e,e.maxWidth,n)}return null};Pn.filterProps=["maxWidth"];const Do=Z({prop:"minWidth",transform:ce}),zo=Z({prop:"height",transform:ce}),Vo=Z({prop:"maxHeight",transform:ce}),Fo=Z({prop:"minHeight",transform:ce});Z({prop:"size",cssProperty:"width",transform:ce});Z({prop:"size",cssProperty:"height",transform:ce});const Lo=Z({prop:"boxSizing"});ln(Bo,Pn,Do,zo,Vo,Fo,Lo);const Uo={border:{themeKey:"borders",transform:de},borderTop:{themeKey:"borders",transform:de},borderRight:{themeKey:"borders",transform:de},borderBottom:{themeKey:"borders",transform:de},borderLeft:{themeKey:"borders",transform:de},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:de},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:un},color:{themeKey:"palette",transform:ze},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:ze},backgroundColor:{themeKey:"palette",transform:ze},p:{style:K},pt:{style:K},pr:{style:K},pb:{style:K},pl:{style:K},px:{style:K},py:{style:K},padding:{style:K},paddingTop:{style:K},paddingRight:{style:K},paddingBottom:{style:K},paddingLeft:{style:K},paddingX:{style:K},paddingY:{style:K},paddingInline:{style:K},paddingInlineStart:{style:K},paddingInlineEnd:{style:K},paddingBlock:{style:K},paddingBlockStart:{style:K},paddingBlockEnd:{style:K},m:{style:Y},mt:{style:Y},mr:{style:Y},mb:{style:Y},ml:{style:Y},mx:{style:Y},my:{style:Y},margin:{style:Y},marginTop:{style:Y},marginRight:{style:Y},marginBottom:{style:Y},marginLeft:{style:Y},marginX:{style:Y},marginY:{style:Y},marginInline:{style:Y},marginInlineStart:{style:Y},marginInlineEnd:{style:Y},marginBlock:{style:Y},marginBlockStart:{style:Y},marginBlockEnd:{style:Y},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:dn},rowGap:{style:pn},columnGap:{style:fn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:ce},maxWidth:{style:Pn},minWidth:{transform:ce},height:{transform:ce},maxHeight:{transform:ce},minHeight:{transform:ce},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},In=Uo;function qo(...e){const n=e.reduce((t,o)=>t.concat(Object.keys(o)),[]),r=new Set(n);return e.every(t=>r.size===Object.keys(t).length)}function Go(e,n){return typeof e=="function"?e(n):e}function Wo(){function e(r,t,o,a){const i={[r]:t,theme:o},u=a[r];if(!u)return{[r]:t};const{cssProperty:c=r,themeKey:s,transform:l,style:p}=u;if(t==null)return null;if(s==="typography"&&t==="inherit")return{[r]:t};const d=an(o,s)||{};return p?p(i):we(i,t,y=>{let h=rn(d,l,y);return y===h&&typeof y=="string"&&(h=rn(d,l,`${r}${y==="default"?"":ye(y)}`,y)),c===!1?h:{[c]:h}})}function n(r){var t;const{sx:o,theme:a={}}=r||{};if(!o)return null;const i=(t=a.unstable_sxConfig)!=null?t:In;function u(c){let s=c;if(typeof c=="function")s=c(a);else if(typeof c!="object")return c;if(!s)return null;const l=ro(a.breakpoints),p=Object.keys(l);let d=l;return Object.keys(s).forEach(v=>{const y=Go(s[v],a);if(y!=null)if(typeof y=="object")if(i[v])d=Ge(d,e(v,y,a,i));else{const h=we({theme:a},y,f=>({[v]:f}));qo(h,y)?d[v]=n({sx:y,theme:a}):d=Ge(d,h)}else d=Ge(d,e(v,y,a,i))}),to(p,d)}return Array.isArray(o)?o.map(u):u(o)}return n}const Vr=Wo();Vr.filterProps=["sx"];const jn=Vr,Ho=["breakpoints","palette","spacing","shape"];function Mn(e={},...n){const{breakpoints:r={},palette:t={},spacing:o,shape:a={}}=e,i=Se(e,Ho),u=Zt(r),c=fo(o);let s=ge({breakpoints:u,direction:"ltr",components:{},palette:D({mode:"light"},t),spacing:c,shape:D({},eo,a)},i);return s=n.reduce((l,p)=>ge(l,p),s),s.unstable_sxConfig=D({},In,i==null?void 0:i.unstable_sxConfig),s.unstable_sx=function(p){return jn({sx:p,theme:this})},s}function Xo(e){return Object.keys(e).length===0}function Yo(e=null){const n=se.useContext(En.ThemeContext);return!n||Xo(n)?e:n}const Ko=Mn();function Jo(e=Ko){return Yo(e)}const Zo=["variant"];function ir(e){return e.length===0}function Fr(e){const{variant:n}=e,r=Se(e,Zo);let t=n||"";return Object.keys(r).sort().forEach(o=>{o==="color"?t+=ir(t)?e[o]:ye(e[o]):t+=`${ir(t)?o:ye(o)}${ye(e[o].toString())}`}),t}const Qo=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function ea(e){return Object.keys(e).length===0}function na(e){return typeof e=="string"&&e.charCodeAt(0)>96}const ra=(e,n)=>n.components&&n.components[e]&&n.components[e].styleOverrides?n.components[e].styleOverrides:null,tn=e=>{let n=0;const r={};return e&&e.forEach(t=>{let o="";typeof t.props=="function"?(o=`callback${n}`,n+=1):o=Fr(t.props),r[o]=t.style}),r},ta=(e,n)=>{let r=[];return n&&n.components&&n.components[e]&&n.components[e].variants&&(r=n.components[e].variants),tn(r)},on=(e,n,r)=>{const{ownerState:t={}}=e,o=[];let a=0;return r&&r.forEach(i=>{let u=!0;if(typeof i.props=="function"){const c=D({},e,t);u=i.props(c)}else Object.keys(i.props).forEach(c=>{t[c]!==i.props[c]&&e[c]!==i.props[c]&&(u=!1)});u&&(typeof i.props=="function"?o.push(n[`callback${a}`]):o.push(n[Fr(i.props)])),typeof i.props=="function"&&(a+=1)}),o},oa=(e,n,r,t)=>{var o;const a=r==null||(o=r.components)==null||(o=o[t])==null?void 0:o.variants;return on(e,n,a)};function Qe(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const aa=Mn(),sr=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function en({defaultTheme:e,theme:n,themeId:r}){return ea(n)?e:n[r]||n}function ia(e){return e?(n,r)=>r[e]:null}const cr=({styledArg:e,props:n,defaultTheme:r,themeId:t})=>{const o=e(D({},n,{theme:en(D({},n,{defaultTheme:r,themeId:t}))}));let a;if(o&&o.variants&&(a=o.variants,delete o.variants),a){const i=on(n,tn(a),a);return[o,...i]}return o};function sa(e={}){const{themeId:n,defaultTheme:r=aa,rootShouldForwardProp:t=Qe,slotShouldForwardProp:o=Qe}=e,a=i=>jn(D({},i,{theme:en(D({},i,{defaultTheme:r,themeId:n}))}));return a.__mui_systemSx=!0,(i,u={})=>{En.internal_processStyles(i,E=>E.filter(g=>!(g!=null&&g.__mui_systemSx)));const{name:c,slot:s,skipVariantsResolver:l,skipSx:p,overridesResolver:d=ia(sr(s))}=u,v=Se(u,Qo),y=l!==void 0?l:s&&s!=="Root"&&s!=="root"||!1,h=p||!1;let f;process.env.NODE_ENV!=="production"&&c&&(f=`${c}-${sr(s||"Root")}`);let S=Qe;s==="Root"||s==="root"?S=t:s?S=o:na(i)&&(S=void 0);const C=En(i,D({shouldForwardProp:S,label:f},v)),T=(E,...g)=>{const re=g?g.map(N=>{if(typeof N=="function"&&N.__emotion_real!==N)return X=>cr({styledArg:N,props:X,defaultTheme:r,themeId:n});if(Ce(N)){let X=N,ne;return N&&N.variants&&(ne=N.variants,delete X.variants,X=ie=>{let G=N;return on(ie,tn(ne),ne).forEach(te=>{G=ge(G,te)}),G}),X}return N}):[];let ae=E;if(Ce(E)){let N;E&&E.variants&&(N=E.variants,delete ae.variants,ae=X=>{let ne=E;return on(X,tn(N),N).forEach(G=>{ne=ge(ne,G)}),ne})}else typeof E=="function"&&E.__emotion_real!==E&&(ae=N=>cr({styledArg:E,props:N,defaultTheme:r,themeId:n}));c&&d&&re.push(N=>{const X=en(D({},N,{defaultTheme:r,themeId:n})),ne=ra(c,X);if(ne){const ie={};return Object.entries(ne).forEach(([G,he])=>{ie[G]=typeof he=="function"?he(D({},N,{theme:X})):he}),d(N,ie)}return null}),c&&!y&&re.push(N=>{const X=en(D({},N,{defaultTheme:r,themeId:n}));return oa(N,ta(c,X),X,c)}),h||re.push(a);const be=re.length-g.length;if(Array.isArray(E)&&be>0){const N=new Array(be).fill("");ae=[...E,...N],ae.raw=[...E.raw,...N]}const pe=C(ae,...re);if(process.env.NODE_ENV!=="production"){let N;c&&(N=`${c}${ye(s||"")}`),N===void 0&&(N=`Styled(${Lt(i)})`),pe.displayName=N}return i.muiName&&(pe.muiName=i.muiName),pe};return C.withConfig&&(T.withConfig=C.withConfig),T}}function ca(e){const{theme:n,name:r,props:t}=e;return!n||!n.components||!n.components[r]||!n.components[r].defaultProps?t:Br(n.components[r].defaultProps,t)}function la({props:e,name:n,defaultTheme:r,themeId:t}){let o=Jo(r);return t&&(o=o[t]||o),ca({theme:o,name:n,props:e})}function Lr(e,n=0,r=1){return process.env.NODE_ENV!=="production"&&(e<n||e>r)&&console.error(`MUI: The value provided ${e} is out of range [${n}, ${r}].`),Yt(e,n,r)}function ua(e){e=e.slice(1);const n=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let r=e.match(n);return r&&r[0].length===1&&(r=r.map(t=>t+t)),r?`rgb${r.length===4?"a":""}(${r.map((t,o)=>o<3?parseInt(t,16):Math.round(parseInt(t,16)/255*1e3)/1e3).join(", ")})`:""}function Fe(e){if(e.type)return e;if(e.charAt(0)==="#")return Fe(ua(e));const n=e.indexOf("("),r=e.substring(0,n);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Ve(9,e));let t=e.substring(n+1,e.length-1),o;if(r==="color"){if(t=t.split(" "),o=t.shift(),t.length===4&&t[3].charAt(0)==="/"&&(t[3]=t[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Ve(10,o))}else t=t.split(",");return t=t.map(a=>parseFloat(a)),{type:r,values:t,colorSpace:o}}function Bn(e){const{type:n,colorSpace:r}=e;let{values:t}=e;return n.indexOf("rgb")!==-1?t=t.map((o,a)=>a<3?parseInt(o,10):o):n.indexOf("hsl")!==-1&&(t[1]=`${t[1]}%`,t[2]=`${t[2]}%`),n.indexOf("color")!==-1?t=`${r} ${t.join(" ")}`:t=`${t.join(", ")}`,`${n}(${t})`}function da(e){e=Fe(e);const{values:n}=e,r=n[0],t=n[1]/100,o=n[2]/100,a=t*Math.min(o,1-o),i=(s,l=(s+r/30)%12)=>o-a*Math.max(Math.min(l-3,9-l,1),-1);let u="rgb";const c=[Math.round(i(0)*255),Math.round(i(8)*255),Math.round(i(4)*255)];return e.type==="hsla"&&(u+="a",c.push(n[3])),Bn({type:u,values:c})}function lr(e){e=Fe(e);let n=e.type==="hsl"||e.type==="hsla"?Fe(da(e)).values:e.values;return n=n.map(r=>(e.type!=="color"&&(r/=255),r<=.03928?r/12.92:((r+.055)/1.055)**2.4)),Number((.2126*n[0]+.7152*n[1]+.0722*n[2]).toFixed(3))}function ur(e,n){const r=lr(e),t=lr(n);return(Math.max(r,t)+.05)/(Math.min(r,t)+.05)}function fa(e,n){if(e=Fe(e),n=Lr(n),e.type.indexOf("hsl")!==-1)e.values[2]*=1-n;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]*=1-n;return Bn(e)}function pa(e,n){if(e=Fe(e),n=Lr(n),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*n;else if(e.type.indexOf("rgb")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(255-e.values[r])*n;else if(e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(1-e.values[r])*n;return Bn(e)}function ha(e,n){return D({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},n)}const ma={black:"#000",white:"#fff"},He=ma,ga={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},ba=ga,ya={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ie=ya,va={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},je=va,xa={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},qe=xa,wa={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Me=wa,ka={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Be=ka,Sa={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},De=Sa,Ea=["mode","contrastThreshold","tonalOffset"],dr={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:He.white,default:He.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},kn={text:{primary:He.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:He.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function fr(e,n,r,t){const o=t.light||t,a=t.dark||t*1.5;e[n]||(e.hasOwnProperty(r)?e[n]=e[r]:n==="light"?e.light=pa(e.main,o):n==="dark"&&(e.dark=fa(e.main,a)))}function Ca(e="light"){return e==="dark"?{main:Me[200],light:Me[50],dark:Me[400]}:{main:Me[700],light:Me[400],dark:Me[800]}}function Ta(e="light"){return e==="dark"?{main:Ie[200],light:Ie[50],dark:Ie[400]}:{main:Ie[500],light:Ie[300],dark:Ie[700]}}function _a(e="light"){return e==="dark"?{main:je[500],light:je[300],dark:je[700]}:{main:je[700],light:je[400],dark:je[800]}}function Na(e="light"){return e==="dark"?{main:Be[400],light:Be[300],dark:Be[700]}:{main:Be[700],light:Be[500],dark:Be[900]}}function Oa(e="light"){return e==="dark"?{main:De[400],light:De[300],dark:De[700]}:{main:De[800],light:De[500],dark:De[900]}}function Ra(e="light"){return e==="dark"?{main:qe[400],light:qe[300],dark:qe[700]}:{main:"#ed6c02",light:qe[500],dark:qe[900]}}function $a(e){const{mode:n="light",contrastThreshold:r=3,tonalOffset:t=.2}=e,o=Se(e,Ea),a=e.primary||Ca(n),i=e.secondary||Ta(n),u=e.error||_a(n),c=e.info||Na(n),s=e.success||Oa(n),l=e.warning||Ra(n);function p(h){const f=ur(h,kn.text.primary)>=r?kn.text.primary:dr.text.primary;if(process.env.NODE_ENV!=="production"){const S=ur(h,f);S<3&&console.error([`MUI: The contrast ratio of ${S}:1 for ${f} on ${h}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return f}const d=({color:h,name:f,mainShade:S=500,lightShade:C=300,darkShade:T=700})=>{if(h=D({},h),!h.main&&h[S]&&(h.main=h[S]),!h.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${f?` (${f})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${S}\` property.`:Ve(11,f?` (${f})`:"",S));if(typeof h.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${f?` (${f})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Ve(12,f?` (${f})`:"",JSON.stringify(h.main)));return fr(h,"light",C,t),fr(h,"dark",T,t),h.contrastText||(h.contrastText=p(h.main)),h},v={dark:kn,light:dr};return process.env.NODE_ENV!=="production"&&(v[n]||console.error(`MUI: The palette mode \`${n}\` is not supported.`)),ge(D({common:D({},He),mode:n,primary:d({color:a,name:"primary"}),secondary:d({color:i,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:d({color:u,name:"error"}),warning:d({color:l,name:"warning"}),info:d({color:c,name:"info"}),success:d({color:s,name:"success"}),grey:ba,contrastThreshold:r,getContrastText:p,augmentColor:d,tonalOffset:t},v[n]),o)}const Aa=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Pa(e){return Math.round(e*1e5)/1e5}const pr={textTransform:"uppercase"},hr='"Roboto", "Helvetica", "Arial", sans-serif';function Ia(e,n){const r=typeof n=="function"?n(e):n,{fontFamily:t=hr,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:i=400,fontWeightMedium:u=500,fontWeightBold:c=700,htmlFontSize:s=16,allVariants:l,pxToRem:p}=r,d=Se(r,Aa);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof s!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const v=o/14,y=p||(S=>`${S/s*v}rem`),h=(S,C,T,E,g)=>D({fontFamily:t,fontWeight:S,fontSize:y(C),lineHeight:T},t===hr?{letterSpacing:`${Pa(E/C)}em`}:{},g,l),f={h1:h(a,96,1.167,-1.5),h2:h(a,60,1.2,-.5),h3:h(i,48,1.167,0),h4:h(i,34,1.235,.25),h5:h(i,24,1.334,0),h6:h(u,20,1.6,.15),subtitle1:h(i,16,1.75,.15),subtitle2:h(u,14,1.57,.1),body1:h(i,16,1.5,.15),body2:h(i,14,1.43,.15),button:h(u,14,1.75,.4,pr),caption:h(i,12,1.66,.4),overline:h(i,12,2.66,1,pr),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return ge(D({htmlFontSize:s,pxToRem:y,fontFamily:t,fontSize:o,fontWeightLight:a,fontWeightRegular:i,fontWeightMedium:u,fontWeightBold:c},f),d,{clone:!1})}const ja=.2,Ma=.14,Ba=.12;function H(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${ja})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Ma})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ba})`].join(",")}const Da=["none",H(0,2,1,-1,0,1,1,0,0,1,3,0),H(0,3,1,-2,0,2,2,0,0,1,5,0),H(0,3,3,-2,0,3,4,0,0,1,8,0),H(0,2,4,-1,0,4,5,0,0,1,10,0),H(0,3,5,-1,0,5,8,0,0,1,14,0),H(0,3,5,-1,0,6,10,0,0,1,18,0),H(0,4,5,-2,0,7,10,1,0,2,16,1),H(0,5,5,-3,0,8,10,1,0,3,14,2),H(0,5,6,-3,0,9,12,1,0,3,16,2),H(0,6,6,-3,0,10,14,1,0,4,18,3),H(0,6,7,-4,0,11,15,1,0,4,20,3),H(0,7,8,-4,0,12,17,2,0,5,22,4),H(0,7,8,-4,0,13,19,2,0,5,24,4),H(0,7,9,-4,0,14,21,2,0,5,26,4),H(0,8,9,-5,0,15,22,2,0,6,28,5),H(0,8,10,-5,0,16,24,2,0,6,30,5),H(0,8,11,-5,0,17,26,2,0,6,32,5),H(0,9,11,-5,0,18,28,2,0,7,34,6),H(0,9,12,-6,0,19,29,2,0,7,36,6),H(0,10,13,-6,0,20,31,3,0,8,38,7),H(0,10,13,-6,0,21,33,3,0,8,40,7),H(0,10,14,-6,0,22,35,3,0,8,42,7),H(0,11,14,-7,0,23,36,3,0,9,44,8),H(0,11,15,-7,0,24,38,3,0,9,46,8)],za=Da,Va=["duration","easing","delay"],Fa={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},La={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function mr(e){return`${Math.round(e)}ms`}function Ua(e){if(!e)return 0;const n=e/36;return Math.round((4+15*n**.25+n/5)*10)}function qa(e){const n=D({},Fa,e.easing),r=D({},La,e.duration);return D({getAutoHeightDuration:Ua,create:(o=["all"],a={})=>{const{duration:i=r.standard,easing:u=n.easeInOut,delay:c=0}=a,s=Se(a,Va);if(process.env.NODE_ENV!=="production"){const l=d=>typeof d=="string",p=d=>!isNaN(parseFloat(d));!l(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!p(i)&&!l(i)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`),l(u)||console.error('MUI: Argument "easing" must be a string.'),!p(c)&&!l(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(s).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(s).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(l=>`${l} ${typeof i=="string"?i:mr(i)} ${u} ${typeof c=="string"?c:mr(c)}`).join(",")}},e,{easing:n,duration:r})}const Ga={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Wa=Ga,Ha=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Xa(e={},...n){const{mixins:r={},palette:t={},transitions:o={},typography:a={}}=e,i=Se(e,Ha);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Ve(18));const u=$a(t),c=Mn(e);let s=ge(c,{mixins:ha(c.breakpoints,r),palette:u,shadows:za.slice(),typography:Ia(u,a),transitions:qa(o),zIndex:D({},Wa),applyDarkStyles(l){return this.vars?{[this.getColorSchemeSelector("dark").replace(/(\[[^\]]+\])/,":where($1)")]:l}:this.palette.mode==="dark"?l:{}}});if(s=ge(s,i),s=n.reduce((l,p)=>ge(l,p),s),process.env.NODE_ENV!=="production"){const l=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],p=(d,v)=>{let y;for(y in d){const h=d[y];if(l.indexOf(y)!==-1&&Object.keys(h).length>0){if(process.env.NODE_ENV!=="production"){const f=$n("",y);console.error([`MUI: The \`${v}\` component increases the CSS specificity of the \`${y}\` internal state.`,"You can not override it like this: ",JSON.stringify(d,null,2),"",`Instead, you need to use the '&.${f}' syntax:`,JSON.stringify({root:{[`&.${f}`]:h}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}d[y]={}}}};Object.keys(s.components).forEach(d=>{const v=s.components[d].styleOverrides;v&&d.indexOf("Mui")===0&&p(v,d)})}return s.unstable_sxConfig=D({},In,i==null?void 0:i.unstable_sxConfig),s.unstable_sx=function(p){return jn({sx:p,theme:this})},s}const Ya=Xa(),Ur=Ya,qr="$$material";function Ka({props:e,name:n}){return la({props:e,name:n,defaultTheme:Ur,themeId:qr})}const Ja=e=>Qe(e)&&e!=="classes",Za=sa({themeId:qr,defaultTheme:Ur,rootShouldForwardProp:Ja}),Qa=Za;function ei(e){return $n("MuiSvgIcon",e)}Xt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const ni=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],ri=e=>{const{color:n,fontSize:r,classes:t}=e,o={root:["root",n!=="inherit"&&`color${ye(n)}`,`fontSize${ye(r)}`]};return Ut(o,ei,t)},ti=Qa("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:r}=e;return[n.root,r.color!=="inherit"&&n[`color${ye(r.color)}`],n[`fontSize${ye(r.fontSize)}`]]}})(({theme:e,ownerState:n})=>{var r,t,o,a,i,u,c,s,l,p,d,v,y;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:n.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(r=e.transitions)==null||(t=r.create)==null?void 0:t.call(r,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(i=a.pxToRem)==null?void 0:i.call(a,20))||"1.25rem",medium:((u=e.typography)==null||(c=u.pxToRem)==null?void 0:c.call(u,24))||"1.5rem",large:((s=e.typography)==null||(l=s.pxToRem)==null?void 0:l.call(s,35))||"2.1875rem"}[n.fontSize],color:(p=(d=(e.vars||e).palette)==null||(d=d[n.color])==null?void 0:d.main)!=null?p:{action:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.active,disabled:(y=(e.vars||e).palette)==null||(y=y.action)==null?void 0:y.disabled,inherit:void 0}[n.color]}}),Dn=se.forwardRef(function(n,r){const t=Ka({props:n,name:"MuiSvgIcon"}),{children:o,className:a,color:i="inherit",component:u="svg",fontSize:c="medium",htmlColor:s,inheritViewBox:l=!1,titleAccess:p,viewBox:d="0 0 24 24"}=t,v=Se(t,ni),y=se.isValidElement(o)&&o.type==="svg",h=D({},t,{color:i,component:u,fontSize:c,instanceFontSize:n.fontSize,inheritViewBox:l,viewBox:d,hasSvgAsChild:y}),f={};l||(f.viewBox=d);const S=ri(h);return m.jsxs(ti,D({as:u,className:br(S.root,a),focusable:"false",color:s,"aria-hidden":p?void 0:!0,role:p?"img":void 0,ref:r},f,v,y&&o.props,{ownerState:h,children:[y?o.props.children:o,p?m.jsx("title",{children:p}):null]}))});process.env.NODE_ENV!=="production"&&(Dn.propTypes={children:W.node,classes:W.object,className:W.string,color:W.oneOfType([W.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),W.string]),component:W.elementType,fontSize:W.oneOfType([W.oneOf(["inherit","large","medium","small"]),W.string]),htmlColor:W.string,inheritViewBox:W.bool,shapeRendering:W.string,sx:W.oneOfType([W.arrayOf(W.oneOfType([W.func,W.object,W.bool])),W.func,W.object]),titleAccess:W.string,viewBox:W.string});Dn.muiName="SvgIcon";const gr=Dn;function oi(e,n){function r(t,o){return m.jsx(gr,D({"data-testid":`${n}Icon`,ref:o},t,{children:e}))}return process.env.NODE_ENV!=="production"&&(r.displayName=`${n}Icon`),r.muiName=gr.muiName,se.memo(se.forwardRef(r))}const ai=oi(m.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function ii({menu:e,dataHandler:n,commandHandler:r,className:t,id:o,children:a}){const[i,u]=V.useState(!1),[c,s]=V.useState(!1),l=V.useCallback(()=>{i&&u(!1),s(!1)},[i]),p=V.useCallback(S=>{S.stopPropagation(),u(C=>{const T=!C;return T&&S.shiftKey?s(!0):T||s(!1),T})},[]),d=V.useRef(void 0),[v,y]=V.useState(0);V.useEffect(()=>{i&&d.current&&y(d.current.clientHeight)},[i]);const h=V.useCallback(S=>(l(),r(S)),[r,l]);let f=e;return!f&&n&&(f=n(c)),m.jsx("div",{ref:d,style:{position:"relative"},children:m.jsx(ee.AppBar,{position:"static",id:o,children:m.jsxs(ee.Toolbar,{className:`papi-toolbar ${t??""}`,variant:"dense",children:[f?m.jsx(ee.IconButton,{edge:"start",className:`papi-menuButton ${t??""}`,color:"inherit","aria-label":"open drawer",onClick:p,children:m.jsx(ai,{})}):void 0,a?m.jsx("div",{className:"papi-menu-children",children:a}):void 0,f?m.jsx(ee.Drawer,{className:`papi-menu-drawer ${t??""}`,anchor:"left",variant:"persistent",open:i,onClose:l,PaperProps:{className:"papi-menu-drawer-paper",style:{top:v}},children:m.jsx(Ar,{commandHandler:h,columns:f.columns})}):void 0]})})})}const si=(e,n)=>{V.useEffect(()=>{if(!e)return()=>{};const r=e(n);return()=>{r()}},[e,n])};function ci(e){return{preserveValue:!0,...e}}const Gr=(e,n,r={})=>{const t=V.useRef(n);t.current=n;const o=V.useRef(r);o.current=ci(o.current);const[a,i]=V.useState(()=>t.current),[u,c]=V.useState(!0);return V.useEffect(()=>{let s=!0;return c(!!e),(async()=>{if(e){const l=await e();s&&(i(()=>l),c(!1))}})(),()=>{s=!1,o.current.preserveValue||i(()=>t.current)}},[e]),[a,u]},Sn=()=>!1,li=(e,n)=>{const[r]=Gr(V.useCallback(async()=>{if(!e)return Sn;const t=await Promise.resolve(e(n));return async()=>t()},[n,e]),Sn,{preserveValue:!1});V.useEffect(()=>()=>{r!==Sn&&r()},[r])};exports.BookChapterControl=bt;exports.Button=Oe;exports.ChapterRangeSelector=yt;exports.Checkbox=Rr;exports.ComboBox=nn;exports.GridMenu=Ar;exports.IconButton=xt;exports.LabelPosition=Re;exports.MenuItem=$r;exports.RefSelector=wt;exports.SearchBar=kt;exports.Slider=St;exports.Snackbar=Et;exports.Switch=Ct;exports.Table=_t;exports.TextField=We;exports.Toolbar=ii;exports.useEvent=si;exports.useEventAsync=li;exports.usePromise=Gr;function ui(e,n="top"){if(!e||typeof document>"u")return;const r=document.head||document.querySelector("head"),t=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),n==="top"&&t?r.insertBefore(o,t):r.appendChild(o)}ui(`.papi-button {
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  line-height: 1;
}

.papi-button.primary {
  background-color: #1ea7fd;
  color: white;
}

.papi-button.secondary {
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.15) 0 0 0 1px inset;
  color: #333;
}

.papi-button.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-button.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}

.papi-button.video {
  background-color: red;
  color: white;
}

.papi-button.video a,
.papi-button.video a:visited {
  color: white;
  text-decoration: none;
}

.papi-button.video a:hover {
  color: white;
  text-decoration: underline;
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.papi-combo-box {
  background-color: transparent;
}

.papi-combo-box.fullwidth {
  width: 100%;
}

.papi-combo-box.error {
  background-color: #f00;
}

.papi-combo-box.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-combo-box.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-menu-item {
  line-height: 0.8;
}

.papi-menu-item.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-menu-item.paratext.bright {
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
.papi-multi-column-menu {
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  padding-left: 3px;
  padding-right: 3px;
}

.papi-menu {
  background-color: rgb(145, 145, 145);
  font-size: 11pt;
  font-weight: 600;
  margin-top: 1px;
  padding-bottom: 2px;
  padding-left: 24px;
  padding-top: 2px;
}
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
}
body {
  font-family: Inter, sans-serif;
  font-style: normal;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  background-color: #fff;
}

.menu-content {
  width: 300px;
  height: 500px;
  overflow-y: auto;
}

.menu-label {
  color: #334155;
  font-weight: 600;
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

.papi-menu-children {
  padding: 10px;
  position: relative;
}
.paratext {
  background-color: darkgreen;
  color: greenyellow;
}
/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

/*
Remove the default font size and weight for headings.
*/

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

/*
Add the correct font weight in Edge and Safari.
*/

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

/*
Add the correct font size in all browsers.
*/

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

/*
Use the modern Firefox focus style for all focusable elements.
*/

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

/*
Add the correct display in Chrome and Safari.
*/

/*
Removes the default spacing and border for appropriate elements.
*/

/*
Reset default styling for dialogs.
*/

/*
Prevent resizing textareas horizontally by default.
*/

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

/*
Set the default cursor for buttons.
*/

/*
Make sure disabled buttons don't get the pointer cursor.
*/

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

/* Make elements with the HTML hidden attribute stay hidden by default */
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
}
.pr-absolute {
    position: absolute;
}
.pr-relative {
    position: relative;
}
.pr-left-2 {
    left: 0.5rem;
}
.pr-z-50 {
    z-index: 50;
}
.pr--mx-1 {
    margin-left: -0.25rem;
    margin-right: -0.25rem;
}
.pr-my-1 {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
}
.pr-ml-auto {
    margin-left: auto;
}
.pr-flex {
    display: flex;
}
.pr-h-10 {
    height: 2.5rem;
}
.pr-h-2 {
    height: 0.5rem;
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
.pr-h-px {
    height: 1px;
}
.pr-w-2 {
    width: 0.5rem;
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
.pr-w-full {
    width: 100%;
}
.pr-min-w-\\[8rem\\] {
    min-width: 8rem;
}
.pr-cursor-default {
    cursor: default;
}
.pr-select-none {
    user-select: none;
}
.pr-items-center {
    align-items: center;
}
.pr-justify-center {
    justify-content: center;
}
.pr-overflow-hidden {
    overflow: hidden;
}
.pr-rounded-md {
    border-radius: calc(var(--radius) - 2px);
}
.pr-rounded-sm {
    border-radius: calc(var(--radius) - 4px);
}
.pr-border {
    border-width: 1px;
}
.pr-bg-background {
    background-color: hsl(var(--background));
}
.pr-bg-muted {
    background-color: hsl(var(--muted));
}
.pr-bg-popover {
    background-color: hsl(var(--popover));
}
.pr-fill-current {
    fill: currentColor;
}
.pr-p-1 {
    padding: 0.25rem;
}
.pr-px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}
.pr-px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
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
.pr-pl-8 {
    padding-left: 2rem;
}
.pr-pr-2 {
    padding-right: 0.5rem;
}
.pr-text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
}
.pr-text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
}
.pr-font-semibold {
    font-weight: 600;
}
.pr-tracking-widest {
    letter-spacing: 0.1em;
}
.pr-text-popover-foreground {
    color: hsl(var(--popover-foreground));
}
.pr-opacity-60 {
    opacity: 0.6;
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
.pr-outline-none {
    outline: 2px solid transparent;
    outline-offset: 2px;
}
.pr-ring-offset-background {
    --tw-ring-offset-color: hsl(var(--background));
}
.pr-transition-colors {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
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
.focus\\:pr-bg-accent:focus {
    background-color: hsl(var(--accent));
}
.focus\\:pr-text-accent-foreground:focus {
    color: hsl(var(--accent-foreground));
}
.disabled\\:pr-cursor-not-allowed:disabled {
    cursor: not-allowed;
}
.disabled\\:pr-opacity-50:disabled {
    opacity: 0.5;
}
.data-\\[disabled\\]\\:pr-pointer-events-none[data-disabled] {
    pointer-events: none;
}
.data-\\[state\\=open\\]\\:pr-bg-accent[data-state=open] {
    background-color: hsl(var(--accent));
}
.data-\\[disabled\\]\\:pr-opacity-50[data-disabled] {
    opacity: 0.5;
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
}.chapter-select {
  display: flex;
  padding: 0 8px 0 24px;
  align-items: flex-start;
  align-content: flex-start;
  align-self: stretch;
  flex-wrap: wrap;
  background: #FFFBEB;
}

.chapter {
  display: flex;
  width: 20px;
  height: 20px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #92400E;
  border-radius: 4px;
}

.chapter:hover {
  background: #FDE68A;
}

.active {
  background: #FDE68A;
  color: #78350F;
  font-weight: 600;
}
.input-container {
  position: relative;
  display: inline-block;
}

.book-chapter-input {
  width: 300px;
  height: 36px;
  padding: 8px 40px 8px 16px;
  color: #0f172a;
  background: #fff;
  border-radius: 6px;
  box-sizing: border-box;
}

.history-icon-container {
  position: absolute;
  top: 20px;
  transform: translateY(-50%);
  right: 16px;
  cursor: pointer;
}
.menu-item {
  color: #334155;
}

.menu-item.selected {
  color: #78350F;
  background-color: #FFFBEB;
}

.book-color-label {
  height: 16px;
  width: 2px;
  margin-right: 10px;
}

.book-color-label.ot {
  background-color: #FCA5A5;
}

.book-color-label.nt {
  background-color: #E9D5FF;
}

.book-color-label.dc {
  background-color: #C7D2FE;
}
@layer rdg.MeasuringCell {.m1l09lto7-0-0-beta-34 {
    contain: strict;
    grid-row: 1;
    visibility: hidden
}
  }


@layer rdg.Cell {.c1wupbe7-0-0-beta-34 {
    /* max-content does not work with size containment
     * dynamically switching between different containment styles incurs a heavy relayout penalty
     * Chromium bug: at odd zoom levels or subpixel positioning, layout/paint containment can make cell borders disappear
     *   https://bugs.chromium.org/p/chromium/issues/detail?id=1326946
     */
    contain: style;
    position: relative; /* needed for absolute positioning to work */
    padding-block: 0;
    padding-inline: 8px;
    border-inline-end: 1px solid var(--rdg-border-color);
    border-block-end: 1px solid var(--rdg-border-color);
    grid-row-start: var(--rdg-grid-row-start);
    background-color: inherit;

    white-space: nowrap;
    overflow: hidden;
    overflow: clip;
    text-overflow: ellipsis;
    outline: none
}

    .c1wupbe7-0-0-beta-34[aria-selected='true'] {
      outline: 2px solid var(--rdg-selection-color);
      outline-offset: -2px;
    }

.cd0kgiy7-0-0-beta-34 {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1
}

.c1730fa47-0-0-beta-34 {
    box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3)
}
  }


@layer rdg.CheckboxLabel {.c1hs68w07-0-0-beta-34 {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    margin-inline-end: 1px /* align checkbox in row group cell */
}
  }

@layer rdg.CheckboxInput {

.cojpd0n7-0-0-beta-34 {
    all: unset
}
  }

@layer rdg.CheckboxIcon {

.cwsfieb7-0-0-beta-34 {
    content: '';
    inline-size: 20px;
    block-size: 20px;
    border: 2px solid var(--rdg-border-color);
    background-color: var(--rdg-background-color)
}

    .cojpd0n7-0-0-beta-34:checked + .cwsfieb7-0-0-beta-34 {
      background-color: var(--rdg-checkbox-color);
      outline: 4px solid var(--rdg-background-color);
      outline-offset: -6px;
    }

    .cojpd0n7-0-0-beta-34:focus + .cwsfieb7-0-0-beta-34 {
      border-color: var(--rdg-checkbox-focus-color);
    }
  }

@layer rdg.CheckboxLabel {

.c1fgadbl7-0-0-beta-34 {
    cursor: default
}

    .c1fgadbl7-0-0-beta-34 .cwsfieb7-0-0-beta-34 {
      border-color: var(--rdg-checkbox-disabled-border-color);
      background-color: var(--rdg-checkbox-disabled-background-color);
    }
  }


@layer rdg.GroupCellContent {.g1w3c5217-0-0-beta-34 {
    outline: none
}
  }

@layer rdg.GroupCellCaret {

.cm5tyhw7-0-0-beta-34 {
    margin-inline-start: 4px;
    stroke: currentColor;
    stroke-width: 1.5px;
    fill: transparent;
    vertical-align: middle
}

    .cm5tyhw7-0-0-beta-34 > path {
      transition: d 0.1s;
    }
  }


@layer rdg.DragHandle {.cadd3bp7-0-0-beta-34 {
    cursor: move;
    position: absolute;
    inset-inline-end: 0;
    inset-block-end: 0;
    inline-size: 8px;
    block-size: 8px;
    background-color: var(--rdg-selection-color)
}

    .cadd3bp7-0-0-beta-34:hover {
      inline-size: 16px;
      block-size: 16px;
      border: 2px solid var(--rdg-selection-color);
      background-color: var(--rdg-background-color);
    }
  }


@layer rdg.EditCell {.c1tngyp17-0-0-beta-34 {
    padding: 0
}
  }


@layer rdg.Row {.r1otpg647-0-0-beta-34 {
    display: contents;
    line-height: var(--rdg-row-height);
    background-color: var(--rdg-background-color)
}

    .r1otpg647-0-0-beta-34:hover {
      background-color: var(--rdg-row-hover-background-color);
    }

    .r1otpg647-0-0-beta-34[aria-selected='true'] {
      background-color: var(--rdg-row-selected-background-color);
    }

      .r1otpg647-0-0-beta-34[aria-selected='true']:hover {
        background-color: var(--rdg-row-selected-hover-background-color);
      }
  }

@layer rdg.FocusSink {

.rel5gk27-0-0-beta-34 {
    outline: 2px solid var(--rdg-selection-color);
    outline-offset: -2px
}
    .r1qymf1z7-0-0-beta-34::before {
      content: '';
      display: inline-block;
      height: 100%;
      position: sticky;
      inset-inline-start: 0;
      border-inline-start: 2px solid var(--rdg-selection-color);
    }
  }


@layer rdg.GroupedRow {
    .gyxx7e97-0-0-beta-34:not([aria-selected='true']) {
      background-color: var(--rdg-header-background-color);
    }

    .gyxx7e97-0-0-beta-34 > .c1wupbe7-0-0-beta-34:not(:last-child):not(.c1730fa47-0-0-beta-34) {
      border-inline-end: none;
    }
  }


@layer rdg.SortableHeaderCell {.hizp7y17-0-0-beta-34 {
    cursor: pointer;
    display: flex
}

    .hizp7y17-0-0-beta-34:focus {
      outline: none;
    }
  }

@layer rdg.SortableHeaderCellName {

.h14cojrm7-0-0-beta-34 {
    flex-grow: 1;
    overflow: hidden;
    overflow: clip;
    text-overflow: ellipsis
}
  }


@layer rdg.HeaderCell {.celq7o97-0-0-beta-34 {
    touch-action: none
}

    .celq7o97-0-0-beta-34::after {
      content: '';
      cursor: col-resize;
      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      inset-block-end: 0;
      inline-size: 10px;
    }
  }


@layer rdg.HeaderRow {.h197vzie7-0-0-beta-34 {
    display: contents;
    line-height: var(--rdg-header-row-height);
    background-color: var(--rdg-header-background-color);
    font-weight: bold
}

    .h197vzie7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      /* Should have a higher value than 0 to show up above regular cells */
      z-index: 1;
      position: sticky;
      inset-block-start: 0;
    }

    .h197vzie7-0-0-beta-34 > .cd0kgiy7-0-0-beta-34 {
      z-index: 2;
    }
  }


@layer rdg.Cell {.ccpfvsn7-0-0-beta-34 {
    background-color: #ccccff
}

.c1bmg16t7-0-0-beta-34 {
    background-color: #ccccff
}

    .c1bmg16t7-0-0-beta-34.ccpfvsn7-0-0-beta-34 {
      background-color: #9999ff;
    }
  }


@layer rdg.SortIcon {.a1mygwml7-0-0-beta-34 {
    fill: currentColor
}

    .a1mygwml7-0-0-beta-34 > path {
      transition: d 0.1s;
    }
  }


@layer rdg {
    @layer Defaults,
      FocusSink,
      CheckboxInput,
      CheckboxIcon,
      CheckboxLabel,
      Cell,
      HeaderCell,
      SummaryCell,
      EditCell,
      Row,
      HeaderRow,
      SummaryRow,
      GroupedRow,
      Root;

    @layer Defaults {
      .r104f42s7-0-0-beta-34 *,
      .r104f42s7-0-0-beta-34 *::before,
      .r104f42s7-0-0-beta-34 *::after {
        box-sizing: inherit;
      }
    }

    @layer Root {.r104f42s7-0-0-beta-34 {
      --rdg-color: #000;   --rdg-border-color: #ddd;   --rdg-summary-border-color: #aaa;   --rdg-background-color: hsl(0deg 0% 100%);   --rdg-header-background-color: hsl(0deg 0% 97.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 96%);   --rdg-row-selected-background-color: hsl(207deg 76% 92%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 88%);   --rdg-checkbox-color: hsl(207deg 100% 29%);   --rdg-checkbox-focus-color: hsl(207deg 100% 69%);   --rdg-checkbox-disabled-border-color: #ccc;   --rdg-checkbox-disabled-background-color: #ddd;
      --rdg-selection-color: #66afe9;
      --rdg-font-size: 14px;

      display: grid;

      color-scheme: var(--rdg-color-scheme, light dark);

      /* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context */
      /* We set a stacking context so internal elements don't render on top of external elements. */
      /* size containment is not used as it could break "width: min-content" for example, and the grid would infinitely resize on Chromium browsers */
      contain: content;
      content-visibility: auto;
      block-size: 350px;
      border: 1px solid var(--rdg-border-color);
      box-sizing: border-box;
      overflow: auto;
      background-color: var(--rdg-background-color);
      color: var(--rdg-color);
      font-size: var(--rdg-font-size)

      /* needed on Firefox */
}
      .r104f42s7-0-0-beta-34::before {
        content: '';
        grid-column: 1/-1;
        grid-row: 1/-1;
      }

      .r104f42s7-0-0-beta-34.rdg-dark {
        --rdg-color-scheme: dark;
        --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
      }

      .r104f42s7-0-0-beta-34.rdg-light {
        --rdg-color-scheme: light;
      }

      @media (prefers-color-scheme: dark) {
        .r104f42s7-0-0-beta-34:not(.rdg-light) {
          --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
        }
      }
    }
  }

@layer rdg.Root {

.v7ly7s7-0-0-beta-34 {
    user-select: none
}

    .v7ly7s7-0-0-beta-34 .r1otpg647-0-0-beta-34 {
      cursor: move;
    }
  }

@layer rdg.FocusSink {

.fc4f4zb7-0-0-beta-34 {
    grid-column: 1/-1;
    pointer-events: none;
    /* Should have a higher value than 2 to show up above header row */
    z-index: 3
}
  }


@layer rdg.SummaryCell {.s1n3hxke7-0-0-beta-34 {
    inset-block-start: var(--rdg-summary-row-top);
    inset-block-end: var(--rdg-summary-row-bottom)
}
  }


@layer rdg.SummaryRow {.snfqesz7-0-0-beta-34 {
    line-height: var(--rdg-summary-row-height)
}

    .snfqesz7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      position: sticky;
    }
    .t1jijrjz7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      z-index: 1;
    }

    .t1jijrjz7-0-0-beta-34 > .cd0kgiy7-0-0-beta-34 {
      z-index: 2;
    }
    .t14bmecc7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
    .b1odhhml7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      border-block-start: 2px solid var(--rdg-summary-border-color);
    }
  }


@layer rdg.TextEditor {.tlmcuo07-0-0-beta-34 {
    appearance: none;

    box-sizing: border-box;
    inline-size: 100%;
    block-size: 100%;
    padding-block: 0;
    padding-inline: 6px;
    border: 2px solid #ccc;
    vertical-align: top;
    color: var(--rdg-color);
    background-color: var(--rdg-background-color);

    font-family: inherit;
    font-size: var(--rdg-font-size)
}

    .tlmcuo07-0-0-beta-34:focus {
      border-color: var(--rdg-selection-color);
      outline: none;
    }

    .tlmcuo07-0-0-beta-34::placeholder {
      color: #999;
      opacity: 1;
    }
  }

`,"top");
//# sourceMappingURL=index.cjs.map
