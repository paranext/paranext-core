"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const x=require("react/jsx-runtime"),Q=require("react"),Ve=require("platform-bible-utils"),Gs=require("@radix-ui/react-dropdown-menu"),un=require("lucide-react"),we=require("clsx"),Ks=require("tailwind-merge"),de=require("@mui/material"),vr=require("@mui/styled-engine"),Xt=require("react-dom"),bo=require("react-data-grid");function Nr(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const E=Nr(Q),be=Nr(Gs),Xs=Nr(Xt);var Ys=Object.defineProperty,Js=(e,t,n)=>t in e?Ys(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ne=(e,t,n)=>(Js(e,typeof t!="symbol"?t+"":t,n),n);const gt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],$r=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],mi=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],vo=aa();function Dt(e,t=!0){return t&&(e=e.toUpperCase()),e in vo?vo[e]:0}function Mr(e){return Dt(e)>0}function Zs(e){const t=typeof e=="string"?Dt(e):e;return t>=40&&t<=66}function Qs(e){return(typeof e=="string"?Dt(e):e)<=39}function gi(e){return e<=66}function ea(e){const t=typeof e=="string"?Dt(e):e;return yi(t)&&!gi(t)}function*ta(){for(let e=1;e<=gt.length;e++)yield e}const na=1,bi=gt.length;function ra(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function _r(e,t="***"){const n=e-1;return n<0||n>=gt.length?t:gt[n]}function vi(e){return e<=0||e>bi?"******":mi[e-1]}function oa(e){return vi(Dt(e))}function yi(e){const t=typeof e=="number"?_r(e):e;return Mr(t)&&!$r.includes(t)}function ia(e){const t=typeof e=="number"?_r(e):e;return Mr(t)&&$r.includes(t)}function sa(e){return mi[e-1].includes("*obsolete*")}function aa(){const e={};for(let t=0;t<gt.length;t++)e[gt[t]]=t+1;return e}const ge={allBookIds:gt,nonCanonicalIds:$r,bookIdToNumber:Dt,isBookIdValid:Mr,isBookNT:Zs,isBookOT:Qs,isBookOTNT:gi,isBookDC:ea,allBookNumbers:ta,firstBook:na,lastBook:bi,extraBooks:ra,bookNumberToId:_r,bookNumberToEnglishName:vi,bookIdToEnglishName:oa,isCanonical:yi,isExtraMaterial:ia,isObsolete:sa};var rt=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(rt||{});const $e=class{constructor(t){if(ne(this,"name"),ne(this,"fullPath"),ne(this,"isPresent"),ne(this,"hasVerseSegments"),ne(this,"isCustomized"),ne(this,"baseVersification"),ne(this,"scriptureBooks"),ne(this,"_type"),t!=null)typeof t=="string"?this.name=t:this._type=t;else throw new Error("Argument null")}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ne($e,"Original",new $e(rt.Original)),ne($e,"Septuagint",new $e(rt.Septuagint)),ne($e,"Vulgate",new $e(rt.Vulgate)),ne($e,"English",new $e(rt.English)),ne($e,"RussianProtestant",new $e(rt.RussianProtestant)),ne($e,"RussianOrthodox",new $e(rt.RussianOrthodox));let Pt=$e;function yo(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var xi=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(xi||{});const Se=class ie{constructor(t,n,r,o){if(ne(this,"firstChapter"),ne(this,"lastChapter"),ne(this,"lastVerse"),ne(this,"hasSegmentsDefined"),ne(this,"text"),ne(this,"BBBCCCVVVS"),ne(this,"longHashCode"),ne(this,"versification"),ne(this,"rtlMark","‏"),ne(this,"_bookNum",0),ne(this,"_chapterNum",0),ne(this,"_verseNum",0),ne(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,a=n!=null&&n instanceof Pt?n:void 0;this.setEmpty(a),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof Pt?n:void 0;this.setEmpty(i),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ie){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof Pt?t:ie.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(t,n=ie.defaultVersification){const r=new ie(n);return r.parse(t),r}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=ie.parse(t),{success:!0,verseRef:n}}catch(r){if(r instanceof qt)return n=new ie,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ie.bcvMaxValue*ie.bookDigitShifter+(n>=0?n%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(r>=0?r%ie.bcvMaxValue:0)}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>ie.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return ge.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=ge.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ie.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>ge.lastBook)throw new qt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Pt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const a=+i[1].trim();this.versification=new Pt(rt[a])}catch{throw new qt("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new qt("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||ge.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(r[1]))throw new qt("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification):!1}allVerses(t=!1,n=ie.verseRangeSeparators,r=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=yo(this._verse,r);for(const a of i.map(l=>yo(l,n))){const l=this.clone();l.verse=a[0];const c=l.verseNum;if(o.push(l),a.length>1){const u=this.clone();if(u.verse=a[1],!t)for(let d=c+1;d<u.verseNum;d++){const f=new ie(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(f)}o.push(u)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const a=o.BBBCCCVVV;if(r>a)return 3;if(r===a)return 4;r=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ge.lastBook?2:(ge.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=ge.bookIdToNumber(t),this.chapter=n,this.verse=r}};ne(Se,"defaultVersification",Pt.English),ne(Se,"verseRangeSeparator","-"),ne(Se,"verseSequenceIndicator",","),ne(Se,"verseRangeSeparators",[Se.verseRangeSeparator]),ne(Se,"verseSequenceIndicators",[Se.verseSequenceIndicator]),ne(Se,"chapterDigitShifter",1e3),ne(Se,"bookDigitShifter",Se.chapterDigitShifter*Se.chapterDigitShifter),ne(Se,"bcvMaxValue",Se.chapterDigitShifter-1),ne(Se,"ValidStatusType",xi);class qt extends Error{}function Qe(...e){return Ks.twMerge(we.clsx(e))}const la=be.Root,ca=be.Trigger,ua=E.forwardRef(({className:e,inset:t,children:n,...r},o)=>x.jsxs(be.SubTrigger,{ref:o,className:Qe("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,x.jsx(un.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));ua.displayName=be.SubTrigger.displayName;const da=E.forwardRef(({className:e,...t},n)=>x.jsx(be.SubContent,{ref:n,className:Qe("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));da.displayName=be.SubContent.displayName;const wi=E.forwardRef(({className:e,sideOffset:t=4,...n},r)=>x.jsx(be.Portal,{children:x.jsx(be.Content,{ref:r,sideOffset:t,className:Qe("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));wi.displayName=be.Content.displayName;const Ei=E.forwardRef(({className:e,inset:t,...n},r)=>x.jsx(be.Item,{ref:r,className:Qe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));Ei.displayName=be.Item.displayName;const pa=E.forwardRef(({className:e,children:t,checked:n,...r},o)=>x.jsxs(be.CheckboxItem,{ref:o,className:Qe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[x.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:x.jsx(be.ItemIndicator,{children:x.jsx(un.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));pa.displayName=be.CheckboxItem.displayName;const fa=E.forwardRef(({className:e,children:t,...n},r)=>x.jsxs(be.RadioItem,{ref:r,className:Qe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[x.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:x.jsx(be.ItemIndicator,{children:x.jsx(un.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));fa.displayName=be.RadioItem.displayName;const Ti=E.forwardRef(({className:e,inset:t,...n},r)=>x.jsx(be.Label,{ref:r,className:Qe("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));Ti.displayName=be.Label.displayName;const ki=E.forwardRef(({className:e,...t},n)=>x.jsx(be.Separator,{ref:n,className:Qe("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));ki.displayName=be.Separator.displayName;const Oi=E.forwardRef(({className:e,type:t,...n},r)=>x.jsx("input",{type:t,className:Qe("pr-flex pr-h-10 pr-w-full pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));Oi.displayName="Input";const ha=Q.forwardRef(({handleSearch:e,handleKeyDown:t,...n},r)=>x.jsxs("div",{className:"input-container",children:[x.jsx(Oi,{...n,style:{outline:0},type:"text",className:"book-chapter-input",onChange:o=>e(o.target.value),onKeyUp:t,ref:r}),x.jsx("div",{className:"history-icon-container",children:x.jsx(un.History,{size:16,onClick:()=>{console.log("back in history")}})})]}));function ma({endChapter:e,activeChapter:t,handleSelectChapter:n}){const r=Array.from({length:e},(o,i)=>i+1);return x.jsx("div",{className:"chapter-select",children:r.map(o=>x.jsx("div",{className:`chapter ${o===t?"active":void 0}`,onClick:()=>n(o),children:o},o))})}function ga({bookId:e,handleSelectBook:t,isSelected:n,bookType:r,children:o}){return x.jsxs("div",{children:[x.jsx(Ei,{textValue:e,className:`menu-item ${n&&"selected"}`,onSelect:i=>{i.preventDefault(),t(e)},children:x.jsxs("div",{children:[x.jsx(un.Tally1,{className:`book-color-label ${r.toLowerCase()}`}),ge.bookIdToEnglishName(e)]})},e),n&&o]})}const ba={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},va=["OT","NT","DC"];function ya({scrRef:e,handleSubmit:t}){const{allBookIds:n}=ge,[r,o]=Q.useState(""),[i,a]=Q.useState(""),[l,c]=Q.useState(!1),u=Q.useRef(void 0),d=Q.useCallback(S=>({OT:n.filter(w=>ge.isBookOT(w)),NT:n.filter(w=>ge.isBookNT(w)),DC:n.filter(w=>ge.isBookDC(w))})[S],[n]),f=Q.useCallback(S=>d(S).filter(y=>ge.bookIdToEnglishName(y).toLowerCase().includes(r.toLowerCase())||y.toLowerCase().includes(r.toLowerCase())),[d,r]),p=S=>{o(S)},b=Q.useCallback(S=>Ve.getChaptersForBook(ge.bookIdToNumber(S)),[]),v=S=>{a(i!==S?S:""),b(S)===-1&&(t({bookNum:ge.bookIdToNumber(S),chapterNum:1,verseNum:1}),c(!1),o(""))},g=S=>{t({bookNum:ge.bookIdToNumber(i),chapterNum:S,verseNum:1}),c(!1),o("")},h=Q.useCallback(S=>{!S&&document.activeElement===u.current?c(!0):c(S)},[]),T=Q.useCallback(()=>u.current.focus(),[]);return x.jsx("div",{children:x.jsxs(la,{modal:!1,open:l,onOpenChange:h,children:[x.jsx(ca,{asChild:!0,children:x.jsx(ha,{ref:u,value:r,handleSearch:p,handleKeyDown:()=>c(!0),placeholder:`${ge.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),x.jsx(wi,{className:"menu-content",style:{overflowY:"auto"},onKeyDown:T,children:va.map(S=>x.jsxs("div",{children:[x.jsx(Ti,{className:"menu-label",children:ba[S]}),f(S).map(y=>x.jsx("div",{children:x.jsx(ga,{bookId:y,handleSelectBook:()=>v(y),isSelected:i===y,bookType:S,children:x.jsx(ma,{handleSelectChapter:g,endChapter:b(y),activeChapter:e.bookNum===ge.bookIdToNumber(y)?e.chapterNum:0})})},y)),S==="OT"||S==="NT"?x.jsx(ki,{}):void 0]},S))})]})})}function ut({id:e,isDisabled:t=!1,className:n,onClick:r,onContextMenu:o,children:i}){return x.jsx(de.Button,{id:e,disabled:t,className:`papi-button ${n??""}`,onClick:r,onContextMenu:o,children:i})}function Nn({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:a,options:l=[],className:c,value:u,onChange:d,onFocus:f,onBlur:p,getOptionLabel:b}){return x.jsx(de.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:i,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:u,onChange:d,onFocus:f,onBlur:p,getOptionLabel:b,renderInput:v=>x.jsx(de.TextField,{...v,error:o,fullWidth:i,disabled:n,label:t,style:{width:a}})})}function xa({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o,chapterCount:i}){const a=Q.useMemo(()=>Array.from({length:i},(u,d)=>d+1),[i]),l=(u,d)=>{n(d),d>t&&r(d)},c=(u,d)=>{r(d),d<e&&n(d)};return x.jsxs(x.Fragment,{children:[x.jsx(de.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:x.jsx(Nn,{onChange:(u,d)=>l(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),x.jsx(de.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:x.jsx(Nn,{onChange:(u,d)=>c(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:t,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var ft=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(ft||{});function Si({id:e,isChecked:t,labelText:n="",labelPosition:r=ft.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:a=!1,hasError:l=!1,className:c,onChange:u}){const d=x.jsx(de.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:a,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:u});let f;if(n){const p=r===ft.Before||r===ft.Above,b=x.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),v=r===ft.Before||r===ft.After,g=v?b:x.jsx("div",{children:b}),h=v?d:x.jsx("div",{children:d});f=x.jsxs(de.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:a,error:l,children:[p&&g,h,!p&&g]})}else f=d;return f}function ue(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},k.apply(this,arguments)}function wa(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Ea(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var yr={exports:{}},wn={exports:{}},se={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xo;function Ta(){if(xo)return se;xo=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,T=e?Symbol.for("react.responder"):60118,S=e?Symbol.for("react.scope"):60119;function y(m){if(typeof m=="object"&&m!==null){var C=m.$$typeof;switch(C){case t:switch(m=m.type,m){case c:case u:case r:case i:case o:case f:return m;default:switch(m=m&&m.$$typeof,m){case l:case d:case v:case b:case a:return m;default:return C}}case n:return C}}}function w(m){return y(m)===u}return se.AsyncMode=c,se.ConcurrentMode=u,se.ContextConsumer=l,se.ContextProvider=a,se.Element=t,se.ForwardRef=d,se.Fragment=r,se.Lazy=v,se.Memo=b,se.Portal=n,se.Profiler=i,se.StrictMode=o,se.Suspense=f,se.isAsyncMode=function(m){return w(m)||y(m)===c},se.isConcurrentMode=w,se.isContextConsumer=function(m){return y(m)===l},se.isContextProvider=function(m){return y(m)===a},se.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===t},se.isForwardRef=function(m){return y(m)===d},se.isFragment=function(m){return y(m)===r},se.isLazy=function(m){return y(m)===v},se.isMemo=function(m){return y(m)===b},se.isPortal=function(m){return y(m)===n},se.isProfiler=function(m){return y(m)===i},se.isStrictMode=function(m){return y(m)===o},se.isSuspense=function(m){return y(m)===f},se.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===r||m===u||m===i||m===o||m===f||m===p||typeof m=="object"&&m!==null&&(m.$$typeof===v||m.$$typeof===b||m.$$typeof===a||m.$$typeof===l||m.$$typeof===d||m.$$typeof===h||m.$$typeof===T||m.$$typeof===S||m.$$typeof===g)},se.typeOf=y,se}var ae={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wo;function ka(){return wo||(wo=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,T=e?Symbol.for("react.responder"):60118,S=e?Symbol.for("react.scope"):60119;function y($){return typeof $=="string"||typeof $=="function"||$===r||$===u||$===i||$===o||$===f||$===p||typeof $=="object"&&$!==null&&($.$$typeof===v||$.$$typeof===b||$.$$typeof===a||$.$$typeof===l||$.$$typeof===d||$.$$typeof===h||$.$$typeof===T||$.$$typeof===S||$.$$typeof===g)}function w($){if(typeof $=="object"&&$!==null){var J=$.$$typeof;switch(J){case t:var R=$.type;switch(R){case c:case u:case r:case i:case o:case f:return R;default:var oe=R&&R.$$typeof;switch(oe){case l:case d:case v:case b:case a:return oe;default:return J}}case n:return J}}}var m=c,C=u,P=l,j=a,I=t,A=d,B=r,z=v,W=b,L=n,_=i,N=o,D=f,ee=!1;function Z($){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),O($)||w($)===c}function O($){return w($)===u}function M($){return w($)===l}function V($){return w($)===a}function K($){return typeof $=="object"&&$!==null&&$.$$typeof===t}function F($){return w($)===d}function U($){return w($)===r}function H($){return w($)===v}function G($){return w($)===b}function q($){return w($)===n}function X($){return w($)===i}function Y($){return w($)===o}function re($){return w($)===f}ae.AsyncMode=m,ae.ConcurrentMode=C,ae.ContextConsumer=P,ae.ContextProvider=j,ae.Element=I,ae.ForwardRef=A,ae.Fragment=B,ae.Lazy=z,ae.Memo=W,ae.Portal=L,ae.Profiler=_,ae.StrictMode=N,ae.Suspense=D,ae.isAsyncMode=Z,ae.isConcurrentMode=O,ae.isContextConsumer=M,ae.isContextProvider=V,ae.isElement=K,ae.isForwardRef=F,ae.isFragment=U,ae.isLazy=H,ae.isMemo=G,ae.isPortal=q,ae.isProfiler=X,ae.isStrictMode=Y,ae.isSuspense=re,ae.isValidElementType=y,ae.typeOf=w}()),ae}var Eo;function Ci(){return Eo||(Eo=1,process.env.NODE_ENV==="production"?wn.exports=Ta():wn.exports=ka()),wn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var rr,To;function Oa(){if(To)return rr;To=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var a={},l=0;l<10;l++)a["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(a).map(function(d){return a[d]});if(c.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(d){u[d]=d}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return rr=o()?Object.assign:function(i,a){for(var l,c=r(i),u,d=1;d<arguments.length;d++){l=Object(arguments[d]);for(var f in l)t.call(l,f)&&(c[f]=l[f]);if(e){u=e(l);for(var p=0;p<u.length;p++)n.call(l,u[p])&&(c[u[p]]=l[u[p]])}}return c},rr}var or,ko;function Ir(){if(ko)return or;ko=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return or=e,or}var ir,Oo;function Pi(){return Oo||(Oo=1,ir=Function.call.bind(Object.prototype.hasOwnProperty)),ir}var sr,So;function Sa(){if(So)return sr;So=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Ir(),n={},r=Pi();e=function(i){var a="Warning: "+i;typeof console<"u"&&console.error(a);try{throw new Error(a)}catch{}}}function o(i,a,l,c,u){if(process.env.NODE_ENV!=="production"){for(var d in i)if(r(i,d)){var f;try{if(typeof i[d]!="function"){var p=Error((c||"React class")+": "+l+" type `"+d+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[d]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw p.name="Invariant Violation",p}f=i[d](a,d,c,l,null,t)}catch(v){f=v}if(f&&!(f instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+d+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in n)){n[f.message]=!0;var b=u?u():"";e("Failed "+l+" type: "+f.message+(b??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},sr=o,sr}var ar,Co;function Ca(){if(Co)return ar;Co=1;var e=Ci(),t=Oa(),n=Ir(),r=Pi(),o=Sa(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function a(){return null}return ar=function(l,c){var u=typeof Symbol=="function"&&Symbol.iterator,d="@@iterator";function f(O){var M=O&&(u&&O[u]||O[d]);if(typeof M=="function")return M}var p="<<anonymous>>",b={array:T("array"),bigint:T("bigint"),bool:T("boolean"),func:T("function"),number:T("number"),object:T("object"),string:T("string"),symbol:T("symbol"),any:S(),arrayOf:y,element:w(),elementType:m(),instanceOf:C,node:A(),objectOf:j,oneOf:P,oneOfType:I,shape:z,exact:W};function v(O,M){return O===M?O!==0||1/O===1/M:O!==O&&M!==M}function g(O,M){this.message=O,this.data=M&&typeof M=="object"?M:{},this.stack=""}g.prototype=Error.prototype;function h(O){if(process.env.NODE_ENV!=="production")var M={},V=0;function K(U,H,G,q,X,Y,re){if(q=q||p,Y=Y||G,re!==n){if(c){var $=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw $.name="Invariant Violation",$}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var J=q+":"+G;!M[J]&&V<3&&(i("You are manually calling a React.PropTypes validation function for the `"+Y+"` prop on `"+q+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),M[J]=!0,V++)}}return H[G]==null?U?H[G]===null?new g("The "+X+" `"+Y+"` is marked as required "+("in `"+q+"`, but its value is `null`.")):new g("The "+X+" `"+Y+"` is marked as required in "+("`"+q+"`, but its value is `undefined`.")):null:O(H,G,q,X,Y)}var F=K.bind(null,!1);return F.isRequired=K.bind(null,!0),F}function T(O){function M(V,K,F,U,H,G){var q=V[K],X=N(q);if(X!==O){var Y=D(q);return new g("Invalid "+U+" `"+H+"` of type "+("`"+Y+"` supplied to `"+F+"`, expected ")+("`"+O+"`."),{expectedType:O})}return null}return h(M)}function S(){return h(a)}function y(O){function M(V,K,F,U,H){if(typeof O!="function")return new g("Property `"+H+"` of component `"+F+"` has invalid PropType notation inside arrayOf.");var G=V[K];if(!Array.isArray(G)){var q=N(G);return new g("Invalid "+U+" `"+H+"` of type "+("`"+q+"` supplied to `"+F+"`, expected an array."))}for(var X=0;X<G.length;X++){var Y=O(G,X,F,U,H+"["+X+"]",n);if(Y instanceof Error)return Y}return null}return h(M)}function w(){function O(M,V,K,F,U){var H=M[V];if(!l(H)){var G=N(H);return new g("Invalid "+F+" `"+U+"` of type "+("`"+G+"` supplied to `"+K+"`, expected a single ReactElement."))}return null}return h(O)}function m(){function O(M,V,K,F,U){var H=M[V];if(!e.isValidElementType(H)){var G=N(H);return new g("Invalid "+F+" `"+U+"` of type "+("`"+G+"` supplied to `"+K+"`, expected a single ReactElement type."))}return null}return h(O)}function C(O){function M(V,K,F,U,H){if(!(V[K]instanceof O)){var G=O.name||p,q=Z(V[K]);return new g("Invalid "+U+" `"+H+"` of type "+("`"+q+"` supplied to `"+F+"`, expected ")+("instance of `"+G+"`."))}return null}return h(M)}function P(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),a;function M(V,K,F,U,H){for(var G=V[K],q=0;q<O.length;q++)if(v(G,O[q]))return null;var X=JSON.stringify(O,function(re,$){var J=D($);return J==="symbol"?String($):$});return new g("Invalid "+U+" `"+H+"` of value `"+String(G)+"` "+("supplied to `"+F+"`, expected one of "+X+"."))}return h(M)}function j(O){function M(V,K,F,U,H){if(typeof O!="function")return new g("Property `"+H+"` of component `"+F+"` has invalid PropType notation inside objectOf.");var G=V[K],q=N(G);if(q!=="object")return new g("Invalid "+U+" `"+H+"` of type "+("`"+q+"` supplied to `"+F+"`, expected an object."));for(var X in G)if(r(G,X)){var Y=O(G,X,F,U,H+"."+X,n);if(Y instanceof Error)return Y}return null}return h(M)}function I(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),a;for(var M=0;M<O.length;M++){var V=O[M];if(typeof V!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ee(V)+" at index "+M+"."),a}function K(F,U,H,G,q){for(var X=[],Y=0;Y<O.length;Y++){var re=O[Y],$=re(F,U,H,G,q,n);if($==null)return null;$.data&&r($.data,"expectedType")&&X.push($.data.expectedType)}var J=X.length>0?", expected one of type ["+X.join(", ")+"]":"";return new g("Invalid "+G+" `"+q+"` supplied to "+("`"+H+"`"+J+"."))}return h(K)}function A(){function O(M,V,K,F,U){return L(M[V])?null:new g("Invalid "+F+" `"+U+"` supplied to "+("`"+K+"`, expected a ReactNode."))}return h(O)}function B(O,M,V,K,F){return new g((O||"React class")+": "+M+" type `"+V+"."+K+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+F+"`.")}function z(O){function M(V,K,F,U,H){var G=V[K],q=N(G);if(q!=="object")return new g("Invalid "+U+" `"+H+"` of type `"+q+"` "+("supplied to `"+F+"`, expected `object`."));for(var X in O){var Y=O[X];if(typeof Y!="function")return B(F,U,H,X,D(Y));var re=Y(G,X,F,U,H+"."+X,n);if(re)return re}return null}return h(M)}function W(O){function M(V,K,F,U,H){var G=V[K],q=N(G);if(q!=="object")return new g("Invalid "+U+" `"+H+"` of type `"+q+"` "+("supplied to `"+F+"`, expected `object`."));var X=t({},V[K],O);for(var Y in X){var re=O[Y];if(r(O,Y)&&typeof re!="function")return B(F,U,H,Y,D(re));if(!re)return new g("Invalid "+U+" `"+H+"` key `"+Y+"` supplied to `"+F+"`.\nBad object: "+JSON.stringify(V[K],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(O),null,"  "));var $=re(G,Y,F,U,H+"."+Y,n);if($)return $}return null}return h(M)}function L(O){switch(typeof O){case"number":case"string":case"undefined":return!0;case"boolean":return!O;case"object":if(Array.isArray(O))return O.every(L);if(O===null||l(O))return!0;var M=f(O);if(M){var V=M.call(O),K;if(M!==O.entries){for(;!(K=V.next()).done;)if(!L(K.value))return!1}else for(;!(K=V.next()).done;){var F=K.value;if(F&&!L(F[1]))return!1}}else return!1;return!0;default:return!1}}function _(O,M){return O==="symbol"?!0:M?M["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&M instanceof Symbol:!1}function N(O){var M=typeof O;return Array.isArray(O)?"array":O instanceof RegExp?"object":_(M,O)?"symbol":M}function D(O){if(typeof O>"u"||O===null)return""+O;var M=N(O);if(M==="object"){if(O instanceof Date)return"date";if(O instanceof RegExp)return"regexp"}return M}function ee(O){var M=D(O);switch(M){case"array":case"object":return"an "+M;case"boolean":case"date":case"regexp":return"a "+M;default:return M}}function Z(O){return!O.constructor||!O.constructor.name?p:O.constructor.name}return b.checkPropTypes=o,b.resetWarningCache=o.resetWarningCache,b.PropTypes=b,b},ar}var lr,Po;function Pa(){if(Po)return lr;Po=1;var e=Ir();function t(){}function n(){}return n.resetWarningCache=t,lr=function(){function r(a,l,c,u,d,f){if(f!==e){var p=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw p.name="Invariant Violation",p}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},lr}if(process.env.NODE_ENV!=="production"){var Ra=Ci(),Na=!0;yr.exports=Ca()(Ra.isElement,Na)}else yr.exports=Pa()();var $a=yr.exports;const s=wa($a);function Bt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function ht(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Ri(e){if(!ht(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Ri(e[n])}),t}function Xe(e,t,n={clone:!0}){const r=n.clone?k({},e):e;return ht(e)&&ht(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(ht(t[o])&&o in e&&ht(e[o])?r[o]=Xe(e[o],t[o],n):n.clone?r[o]=ht(t[o])?Ri(t[o]):t[o]:r[o]=t[o])}),r}function Ma(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ni(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let l;const c=i.type;return typeof c=="function"&&!Ma(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const $i=Bt(s.element,Ni);$i.isRequired=Bt(s.element.isRequired,Ni);const dn=$i;function _a(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ia(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let l;return typeof i=="function"&&!_a(i)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const ja=Bt(s.elementType,Ia),Aa="exact-prop: ​";function Mi(e){return process.env.NODE_ENV==="production"?e:k({},e,{[Aa]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function $t(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var xr={exports:{}},le={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ro;function Da(){if(Ro)return le;Ro=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),v;v=Symbol.for("react.module.reference");function g(h){if(typeof h=="object"&&h!==null){var T=h.$$typeof;switch(T){case e:switch(h=h.type,h){case n:case o:case r:case u:case d:return h;default:switch(h=h&&h.$$typeof,h){case l:case a:case c:case p:case f:case i:return h;default:return T}}case t:return T}}}return le.ContextConsumer=a,le.ContextProvider=i,le.Element=e,le.ForwardRef=c,le.Fragment=n,le.Lazy=p,le.Memo=f,le.Portal=t,le.Profiler=o,le.StrictMode=r,le.Suspense=u,le.SuspenseList=d,le.isAsyncMode=function(){return!1},le.isConcurrentMode=function(){return!1},le.isContextConsumer=function(h){return g(h)===a},le.isContextProvider=function(h){return g(h)===i},le.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===e},le.isForwardRef=function(h){return g(h)===c},le.isFragment=function(h){return g(h)===n},le.isLazy=function(h){return g(h)===p},le.isMemo=function(h){return g(h)===f},le.isPortal=function(h){return g(h)===t},le.isProfiler=function(h){return g(h)===o},le.isStrictMode=function(h){return g(h)===r},le.isSuspense=function(h){return g(h)===u},le.isSuspenseList=function(h){return g(h)===d},le.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===n||h===o||h===r||h===u||h===d||h===b||typeof h=="object"&&h!==null&&(h.$$typeof===p||h.$$typeof===f||h.$$typeof===i||h.$$typeof===a||h.$$typeof===c||h.$$typeof===v||h.getModuleId!==void 0)},le.typeOf=g,le}var ce={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var No;function Ba(){return No||(No=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),v=!1,g=!1,h=!1,T=!1,S=!1,y;y=Symbol.for("react.module.reference");function w(R){return!!(typeof R=="string"||typeof R=="function"||R===n||R===o||S||R===r||R===u||R===d||T||R===b||v||g||h||typeof R=="object"&&R!==null&&(R.$$typeof===p||R.$$typeof===f||R.$$typeof===i||R.$$typeof===a||R.$$typeof===c||R.$$typeof===y||R.getModuleId!==void 0))}function m(R){if(typeof R=="object"&&R!==null){var oe=R.$$typeof;switch(oe){case e:var ye=R.type;switch(ye){case n:case o:case r:case u:case d:return ye;default:var ke=ye&&ye.$$typeof;switch(ke){case l:case a:case c:case p:case f:case i:return ke;default:return oe}}case t:return oe}}}var C=a,P=i,j=e,I=c,A=n,B=p,z=f,W=t,L=o,_=r,N=u,D=d,ee=!1,Z=!1;function O(R){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function M(R){return Z||(Z=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function V(R){return m(R)===a}function K(R){return m(R)===i}function F(R){return typeof R=="object"&&R!==null&&R.$$typeof===e}function U(R){return m(R)===c}function H(R){return m(R)===n}function G(R){return m(R)===p}function q(R){return m(R)===f}function X(R){return m(R)===t}function Y(R){return m(R)===o}function re(R){return m(R)===r}function $(R){return m(R)===u}function J(R){return m(R)===d}ce.ContextConsumer=C,ce.ContextProvider=P,ce.Element=j,ce.ForwardRef=I,ce.Fragment=A,ce.Lazy=B,ce.Memo=z,ce.Portal=W,ce.Profiler=L,ce.StrictMode=_,ce.Suspense=N,ce.SuspenseList=D,ce.isAsyncMode=O,ce.isConcurrentMode=M,ce.isContextConsumer=V,ce.isContextProvider=K,ce.isElement=F,ce.isForwardRef=U,ce.isFragment=H,ce.isLazy=G,ce.isMemo=q,ce.isPortal=X,ce.isProfiler=Y,ce.isStrictMode=re,ce.isSuspense=$,ce.isSuspenseList=J,ce.isValidElementType=w,ce.typeOf=m}()),ce}process.env.NODE_ENV==="production"?xr.exports=Da():xr.exports=Ba();var $n=xr.exports;const La=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Fa(e){const t=`${e}`.match(La);return t&&t[1]||""}function _i(e,t=""){return e.displayName||e.name||Fa(e)||t}function $o(e,t,n){const r=_i(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Va(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return _i(e,"Component");if(typeof e=="object")switch(e.$$typeof){case $n.ForwardRef:return $o(e,e.render,"ForwardRef");case $n.Memo:return $o(e,e.type,"memo");default:return}}}function Ye(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],a=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const za=s.oneOfType([s.func,s.object]),jr=za;function Ue(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":$t(7));return e.charAt(0).toUpperCase()+e.slice(1)}function wr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Ii(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function Ua(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,a)=>{const l=o||"<<anonymous>>",c=a||r;return typeof n[r]<"u"?new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function qa(e,t){var n,r;return E.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Ee(e){return e&&e.ownerDocument||document}function Mt(e){return Ee(e).defaultView||window}function Ha(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?k({},t.propTypes):null;return o=>(i,a,l,c,u,...d)=>{const f=u||a,p=n==null?void 0:n[f];if(p){const b=p(i,a,l,c,u,...d);if(b)return b}return typeof i[a]<"u"&&!i[o]?new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Mn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Wa=typeof window<"u"?E.useLayoutEffect:E.useEffect,bt=Wa;let Mo=0;function Ga(e){const[t,n]=E.useState(e),r=e||t;return E.useEffect(()=>{t==null&&(Mo+=1,n(`mui-${Mo}`))},[t]),r}const _o=E["useId".toString()];function ji(e){if(_o!==void 0){const t=_o();return e??t}return Ga(e)}function Ka(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function Ai({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=E.useRef(e!==void 0),[i,a]=E.useState(t),l=o?e:i;if(process.env.NODE_ENV!=="production"){E.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:u}=E.useRef(t);E.useEffect(()=>{!o&&u!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=E.useCallback(u=>{o||a(u)},[]);return[l,c]}function rn(e){const t=E.useRef(e);return bt(()=>{t.current=e}),E.useRef((...n)=>(0,t.current)(...n)).current}function De(...e){return E.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Mn(n,t)})},e)}const Io={};function Xa(e,t){const n=E.useRef(Io);return n.current===Io&&(n.current=e(t)),n}const Ya=[];function Ja(e){E.useEffect(e,Ya)}class pn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new pn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function Yt(){const e=Xa(pn.create).current;return Ja(e.disposeEffect),e}let Fn=!0,Er=!1;const Za=new pn,Qa={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function el(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Qa[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function tl(e){e.metaKey||e.altKey||e.ctrlKey||(Fn=!0)}function cr(){Fn=!1}function nl(){this.visibilityState==="hidden"&&Er&&(Fn=!0)}function rl(e){e.addEventListener("keydown",tl,!0),e.addEventListener("mousedown",cr,!0),e.addEventListener("pointerdown",cr,!0),e.addEventListener("touchstart",cr,!0),e.addEventListener("visibilitychange",nl,!0)}function ol(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Fn||el(t)}function Di(){const e=E.useCallback(o=>{o!=null&&rl(o.ownerDocument)},[]),t=E.useRef(!1);function n(){return t.current?(Er=!0,Za.start(100,()=>{Er=!1}),t.current=!1,!0):!1}function r(o){return ol(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Bi(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function il(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function sl(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const al=Number.isInteger||sl;function Li(e,t,n,r){const o=e[t];if(o==null||!al(o)){const i=il(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function Fi(e,t,...n){return e[t]===void 0?null:Li(e,t,...n)}function Tr(){return null}Fi.isRequired=Li;Tr.isRequired=Tr;const Vi=process.env.NODE_ENV==="production"?Tr:Fi;function zi(e,t){const n=k({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=k({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=k({},i),Object.keys(o).forEach(a=>{n[r][a]=zi(o[a],i[a])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function et(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,a)=>{if(a){const l=t(a);l!==""&&i.push(l),n&&n[a]&&i.push(n[a])}return i},[]).join(" ")}),r}const jo=e=>e,ll=()=>{let e=jo;return{configure(t){e=t},generate(t){return e(t)},reset(){e=jo}}},cl=ll(),Ui=cl,qi={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function He(e,t,n="Mui"){const r=qi[t];return r?`${n}-${r}`:`${Ui.generate(e)}-${t}`}function it(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=He(e,o,n)}),r}function ul(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Hi(e){return typeof e=="string"}function Jt(e,t,n){return e===void 0||Hi(e)?t:k({},t,{ownerState:k({},t.ownerState,n)})}const dl={disableDefaultClasses:!1},pl=E.createContext(dl);function fl(e){const{disableDefaultClasses:t}=E.useContext(pl);return n=>t?"":e(n)}function Wi(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function hl(e,t,n){return typeof e=="function"?e(t,n):e}function Ao(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function ml(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const b=we(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),v=k({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),g=k({},n,o,r);return b.length>0&&(g.className=b),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:void 0}}const a=Wi(k({},o,r)),l=Ao(r),c=Ao(o),u=t(a),d=we(u==null?void 0:u.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),f=k({},u==null?void 0:u.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),p=k({},u,n,c,l);return d.length>0&&(p.className=d),Object.keys(f).length>0&&(p.style=f),{props:p,internalRef:u.ref}}const gl=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function vt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,a=ue(e,gl),l=i?{}:hl(r,o),{props:c,internalRef:u}=ml(k({},a,{externalSlotProps:l})),d=De(u,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return Jt(n,k({},c,{ref:d}),o)}const Gi="base";function bl(e){return`${Gi}--${e}`}function vl(e,t){return`${Gi}-${e}-${t}`}function Ki(e,t){const n=qi[t];return n?bl(n):vl(e,t)}function yl(e,t){const n={};return t.forEach(r=>{n[r]=Ki(e,r)}),n}const xl=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function wl(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function El(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Tl(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||El(e))}function kl(e){const t=[],n=[];return Array.from(e.querySelectorAll(xl)).forEach((r,o)=>{const i=wl(r);i===-1||!Tl(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function Ol(){return!0}function _n(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=kl,isEnabled:a=Ol,open:l}=e,c=E.useRef(!1),u=E.useRef(null),d=E.useRef(null),f=E.useRef(null),p=E.useRef(null),b=E.useRef(!1),v=E.useRef(null),g=De(t.ref,v),h=E.useRef(null);E.useEffect(()=>{!l||!v.current||(b.current=!n)},[n,l]),E.useEffect(()=>{if(!l||!v.current)return;const y=Ee(v.current);return v.current.contains(y.activeElement)||(v.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),v.current.setAttribute("tabIndex","-1")),b.current&&v.current.focus()),()=>{o||(f.current&&f.current.focus&&(c.current=!0,f.current.focus()),f.current=null)}},[l]),E.useEffect(()=>{if(!l||!v.current)return;const y=Ee(v.current),w=P=>{h.current=P,!(r||!a()||P.key!=="Tab")&&y.activeElement===v.current&&P.shiftKey&&(c.current=!0,d.current&&d.current.focus())},m=()=>{const P=v.current;if(P===null)return;if(!y.hasFocus()||!a()||c.current){c.current=!1;return}if(P.contains(y.activeElement)||r&&y.activeElement!==u.current&&y.activeElement!==d.current)return;if(y.activeElement!==p.current)p.current=null;else if(p.current!==null)return;if(!b.current)return;let j=[];if((y.activeElement===u.current||y.activeElement===d.current)&&(j=i(v.current)),j.length>0){var I,A;const B=!!((I=h.current)!=null&&I.shiftKey&&((A=h.current)==null?void 0:A.key)==="Tab"),z=j[0],W=j[j.length-1];typeof z!="string"&&typeof W!="string"&&(B?W.focus():z.focus())}else P.focus()};y.addEventListener("focusin",m),y.addEventListener("keydown",w,!0);const C=setInterval(()=>{y.activeElement&&y.activeElement.tagName==="BODY"&&m()},50);return()=>{clearInterval(C),y.removeEventListener("focusin",m),y.removeEventListener("keydown",w,!0)}},[n,r,o,a,l,i]);const T=y=>{f.current===null&&(f.current=y.relatedTarget),b.current=!0,p.current=y.target;const w=t.props.onFocus;w&&w(y)},S=y=>{f.current===null&&(f.current=y.relatedTarget),b.current=!0};return x.jsxs(E.Fragment,{children:[x.jsx("div",{tabIndex:l?0:-1,onFocus:S,ref:u,"data-testid":"sentinelStart"}),E.cloneElement(t,{ref:g,onFocus:T}),x.jsx("div",{tabIndex:l?0:-1,onFocus:S,ref:d,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(_n.propTypes={children:dn,disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableRestoreFocus:s.bool,getTabbable:s.func,isEnabled:s.func,open:s.bool.isRequired});process.env.NODE_ENV!=="production"&&(_n["propTypes"]=Mi(_n.propTypes));function Sl(e){return typeof e=="function"?e():e}const on=E.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[a,l]=E.useState(null),c=De(E.isValidElement(r)?r.ref:null,n);if(bt(()=>{i||l(Sl(o)||document.body)},[o,i]),bt(()=>{if(a&&!i)return Mn(n,a),()=>{Mn(n,null)}},[n,a,i]),i){if(E.isValidElement(r)){const u={ref:c};return E.cloneElement(r,u)}return x.jsx(E.Fragment,{children:r})}return x.jsx(E.Fragment,{children:a&&Xs.createPortal(r,a)})});process.env.NODE_ENV!=="production"&&(on.propTypes={children:s.node,container:s.oneOfType([Ye,s.func]),disablePortal:s.bool});process.env.NODE_ENV!=="production"&&(on["propTypes"]=Mi(on.propTypes));function Cl(e){const t=Ee(e);return t.body===e?Mt(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function Qt(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Do(e){return parseInt(Mt(e).getComputedStyle(e).paddingRight,10)||0}function Pl(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Bo(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,a=>{const l=i.indexOf(a)===-1,c=!Pl(a);l&&c&&Qt(a,o)})}function ur(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function Rl(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(Cl(r)){const a=Bi(Ee(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Do(r)+a}px`;const l=Ee(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${Do(c)+a}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=Ee(r).body;else{const a=r.parentElement,l=Mt(r);i=(a==null?void 0:a.nodeName)==="HTML"&&l.getComputedStyle(a).overflowY==="scroll"?a:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:a,property:l})=>{i?a.style.setProperty(l,i):a.style.removeProperty(l)})}}function Nl(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class $l{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&Qt(t.modalRef,!1);const o=Nl(n);Bo(n,t.mount,t.modalRef,o,!0);const i=ur(this.containers,a=>a.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=ur(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=Rl(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=ur(this.containers,a=>a.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&Qt(t.modalRef,n),Bo(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const a=i.modals[i.modals.length-1];a.modalRef&&Qt(a.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Ml(e){return typeof e=="function"?e():e}function _l(e){return e?e.props.hasOwnProperty("in"):!1}const Il=new $l;function jl(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Il,closeAfterTransition:i=!1,onTransitionEnter:a,onTransitionExited:l,children:c,onClose:u,open:d,rootRef:f}=e,p=E.useRef({}),b=E.useRef(null),v=E.useRef(null),g=De(v,f),[h,T]=E.useState(!d),S=_l(c);let y=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(y=!1);const w=()=>Ee(b.current),m=()=>(p.current.modalRef=v.current,p.current.mount=b.current,p.current),C=()=>{o.mount(m(),{disableScrollLock:r}),v.current&&(v.current.scrollTop=0)},P=rn(()=>{const N=Ml(t)||w().body;o.add(m(),N),v.current&&C()}),j=E.useCallback(()=>o.isTopModal(m()),[o]),I=rn(N=>{b.current=N,N&&(d&&j()?C():v.current&&Qt(v.current,y))}),A=E.useCallback(()=>{o.remove(m(),y)},[y,o]);E.useEffect(()=>()=>{A()},[A]),E.useEffect(()=>{d?P():(!S||!i)&&A()},[d,A,S,i,P]);const B=N=>D=>{var ee;(ee=N.onKeyDown)==null||ee.call(N,D),!(D.key!=="Escape"||D.which===229||!j())&&(n||(D.stopPropagation(),u&&u(D,"escapeKeyDown")))},z=N=>D=>{var ee;(ee=N.onClick)==null||ee.call(N,D),D.target===D.currentTarget&&u&&u(D,"backdropClick")};return{getRootProps:(N={})=>{const D=Wi(e);delete D.onTransitionEnter,delete D.onTransitionExited;const ee=k({},D,N);return k({role:"presentation"},ee,{onKeyDown:B(ee),ref:g})},getBackdropProps:(N={})=>{const D=N;return k({"aria-hidden":!0},D,{onClick:z(D),open:d})},getTransitionProps:()=>{const N=()=>{T(!1),a&&a()},D=()=>{T(!0),l&&l(),i&&A()};return{onEnter:wr(N,c==null?void 0:c.props.onEnter),onExited:wr(D,c==null?void 0:c.props.onExited)}},rootRef:g,portalRef:I,isTopModal:j,exited:h,hasTransition:S}}var Ce="top",Be="bottom",Le="right",Pe="left",Ar="auto",fn=[Ce,Be,Le,Pe],_t="start",sn="end",Al="clippingParents",Xi="viewport",Ht="popper",Dl="reference",Lo=fn.reduce(function(e,t){return e.concat([t+"-"+_t,t+"-"+sn])},[]),Yi=[].concat(fn,[Ar]).reduce(function(e,t){return e.concat([t,t+"-"+_t,t+"-"+sn])},[]),Bl="beforeRead",Ll="read",Fl="afterRead",Vl="beforeMain",zl="main",Ul="afterMain",ql="beforeWrite",Hl="write",Wl="afterWrite",Gl=[Bl,Ll,Fl,Vl,zl,Ul,ql,Hl,Wl];function qe(e){return e?(e.nodeName||"").toLowerCase():null}function _e(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function yt(e){var t=_e(e).Element;return e instanceof t||e instanceof Element}function Ae(e){var t=_e(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Dr(e){if(typeof ShadowRoot>"u")return!1;var t=_e(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Kl(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!Ae(i)||!qe(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(a){var l=o[a];l===!1?i.removeAttribute(a):i.setAttribute(a,l===!0?"":l)}))})}function Xl(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},a=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=a.reduce(function(c,u){return c[u]="",c},{});!Ae(o)||!qe(o)||(Object.assign(o.style,l),Object.keys(i).forEach(function(c){o.removeAttribute(c)}))})}}const Yl={name:"applyStyles",enabled:!0,phase:"write",fn:Kl,effect:Xl,requires:["computeStyles"]};function ze(e){return e.split("-")[0]}var mt=Math.max,In=Math.min,It=Math.round;function kr(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ji(){return!/^((?!chrome|android).)*safari/i.test(kr())}function jt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&Ae(e)&&(o=e.offsetWidth>0&&It(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&It(r.height)/e.offsetHeight||1);var a=yt(e)?_e(e):window,l=a.visualViewport,c=!Ji()&&n,u=(r.left+(c&&l?l.offsetLeft:0))/o,d=(r.top+(c&&l?l.offsetTop:0))/i,f=r.width/o,p=r.height/i;return{width:f,height:p,top:d,right:u+f,bottom:d+p,left:u,x:u,y:d}}function Br(e){var t=jt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Zi(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Dr(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function Je(e){return _e(e).getComputedStyle(e)}function Jl(e){return["table","td","th"].indexOf(qe(e))>=0}function st(e){return((yt(e)?e.ownerDocument:e.document)||window.document).documentElement}function Vn(e){return qe(e)==="html"?e:e.assignedSlot||e.parentNode||(Dr(e)?e.host:null)||st(e)}function Fo(e){return!Ae(e)||Je(e).position==="fixed"?null:e.offsetParent}function Zl(e){var t=/firefox/i.test(kr()),n=/Trident/i.test(kr());if(n&&Ae(e)){var r=Je(e);if(r.position==="fixed")return null}var o=Vn(e);for(Dr(o)&&(o=o.host);Ae(o)&&["html","body"].indexOf(qe(o))<0;){var i=Je(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function hn(e){for(var t=_e(e),n=Fo(e);n&&Jl(n)&&Je(n).position==="static";)n=Fo(n);return n&&(qe(n)==="html"||qe(n)==="body"&&Je(n).position==="static")?t:n||Zl(e)||t}function Lr(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function en(e,t,n){return mt(e,In(t,n))}function Ql(e,t,n){var r=en(e,t,n);return r>n?n:r}function Qi(){return{top:0,right:0,bottom:0,left:0}}function es(e){return Object.assign({},Qi(),e)}function ts(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var ec=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,es(typeof t!="number"?t:ts(t,fn))};function tc(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,l=ze(n.placement),c=Lr(l),u=[Pe,Le].indexOf(l)>=0,d=u?"height":"width";if(!(!i||!a)){var f=ec(o.padding,n),p=Br(i),b=c==="y"?Ce:Pe,v=c==="y"?Be:Le,g=n.rects.reference[d]+n.rects.reference[c]-a[c]-n.rects.popper[d],h=a[c]-n.rects.reference[c],T=hn(i),S=T?c==="y"?T.clientHeight||0:T.clientWidth||0:0,y=g/2-h/2,w=f[b],m=S-p[d]-f[v],C=S/2-p[d]/2+y,P=en(w,C,m),j=c;n.modifiersData[r]=(t={},t[j]=P,t.centerOffset=P-C,t)}}function nc(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Zi(t.elements.popper,o)&&(t.elements.arrow=o))}const rc={name:"arrow",enabled:!0,phase:"main",fn:tc,effect:nc,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function At(e){return e.split("-")[1]}var oc={top:"auto",right:"auto",bottom:"auto",left:"auto"};function ic(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:It(n*o)/o||0,y:It(r*o)/o||0}}function Vo(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,a=e.offsets,l=e.position,c=e.gpuAcceleration,u=e.adaptive,d=e.roundOffsets,f=e.isFixed,p=a.x,b=p===void 0?0:p,v=a.y,g=v===void 0?0:v,h=typeof d=="function"?d({x:b,y:g}):{x:b,y:g};b=h.x,g=h.y;var T=a.hasOwnProperty("x"),S=a.hasOwnProperty("y"),y=Pe,w=Ce,m=window;if(u){var C=hn(n),P="clientHeight",j="clientWidth";if(C===_e(n)&&(C=st(n),Je(C).position!=="static"&&l==="absolute"&&(P="scrollHeight",j="scrollWidth")),C=C,o===Ce||(o===Pe||o===Le)&&i===sn){w=Be;var I=f&&C===m&&m.visualViewport?m.visualViewport.height:C[P];g-=I-r.height,g*=c?1:-1}if(o===Pe||(o===Ce||o===Be)&&i===sn){y=Le;var A=f&&C===m&&m.visualViewport?m.visualViewport.width:C[j];b-=A-r.width,b*=c?1:-1}}var B=Object.assign({position:l},u&&oc),z=d===!0?ic({x:b,y:g},_e(n)):{x:b,y:g};if(b=z.x,g=z.y,c){var W;return Object.assign({},B,(W={},W[w]=S?"0":"",W[y]=T?"0":"",W.transform=(m.devicePixelRatio||1)<=1?"translate("+b+"px, "+g+"px)":"translate3d("+b+"px, "+g+"px, 0)",W))}return Object.assign({},B,(t={},t[w]=S?g+"px":"",t[y]=T?b+"px":"",t.transform="",t))}function sc(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,a=i===void 0?!0:i,l=n.roundOffsets,c=l===void 0?!0:l,u={placement:ze(t.placement),variation:At(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Vo(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Vo(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const ac={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:sc,data:{}};var En={passive:!0};function lc(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,a=r.resize,l=a===void 0?!0:a,c=_e(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&u.forEach(function(d){d.addEventListener("scroll",n.update,En)}),l&&c.addEventListener("resize",n.update,En),function(){i&&u.forEach(function(d){d.removeEventListener("scroll",n.update,En)}),l&&c.removeEventListener("resize",n.update,En)}}const cc={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:lc,data:{}};var uc={left:"right",right:"left",bottom:"top",top:"bottom"};function Sn(e){return e.replace(/left|right|bottom|top/g,function(t){return uc[t]})}var dc={start:"end",end:"start"};function zo(e){return e.replace(/start|end/g,function(t){return dc[t]})}function Fr(e){var t=_e(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Vr(e){return jt(st(e)).left+Fr(e).scrollLeft}function pc(e,t){var n=_e(e),r=st(e),o=n.visualViewport,i=r.clientWidth,a=r.clientHeight,l=0,c=0;if(o){i=o.width,a=o.height;var u=Ji();(u||!u&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:i,height:a,x:l+Vr(e),y:c}}function fc(e){var t,n=st(e),r=Fr(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=mt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=mt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Vr(e),c=-r.scrollTop;return Je(o||n).direction==="rtl"&&(l+=mt(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:l,y:c}}function zr(e){var t=Je(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function ns(e){return["html","body","#document"].indexOf(qe(e))>=0?e.ownerDocument.body:Ae(e)&&zr(e)?e:ns(Vn(e))}function tn(e,t){var n;t===void 0&&(t=[]);var r=ns(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=_e(r),a=o?[i].concat(i.visualViewport||[],zr(r)?r:[]):r,l=t.concat(a);return o?l:l.concat(tn(Vn(a)))}function Or(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function hc(e,t){var n=jt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Uo(e,t,n){return t===Xi?Or(pc(e,n)):yt(t)?hc(t,n):Or(fc(st(e)))}function mc(e){var t=tn(Vn(e)),n=["absolute","fixed"].indexOf(Je(e).position)>=0,r=n&&Ae(e)?hn(e):e;return yt(r)?t.filter(function(o){return yt(o)&&Zi(o,r)&&qe(o)!=="body"}):[]}function gc(e,t,n,r){var o=t==="clippingParents"?mc(e):[].concat(t),i=[].concat(o,[n]),a=i[0],l=i.reduce(function(c,u){var d=Uo(e,u,r);return c.top=mt(d.top,c.top),c.right=In(d.right,c.right),c.bottom=In(d.bottom,c.bottom),c.left=mt(d.left,c.left),c},Uo(e,a,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function rs(e){var t=e.reference,n=e.element,r=e.placement,o=r?ze(r):null,i=r?At(r):null,a=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Ce:c={x:a,y:t.y-n.height};break;case Be:c={x:a,y:t.y+t.height};break;case Le:c={x:t.x+t.width,y:l};break;case Pe:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var u=o?Lr(o):null;if(u!=null){var d=u==="y"?"height":"width";switch(i){case _t:c[u]=c[u]-(t[d]/2-n[d]/2);break;case sn:c[u]=c[u]+(t[d]/2-n[d]/2);break}}return c}function an(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,a=i===void 0?e.strategy:i,l=n.boundary,c=l===void 0?Al:l,u=n.rootBoundary,d=u===void 0?Xi:u,f=n.elementContext,p=f===void 0?Ht:f,b=n.altBoundary,v=b===void 0?!1:b,g=n.padding,h=g===void 0?0:g,T=es(typeof h!="number"?h:ts(h,fn)),S=p===Ht?Dl:Ht,y=e.rects.popper,w=e.elements[v?S:p],m=gc(yt(w)?w:w.contextElement||st(e.elements.popper),c,d,a),C=jt(e.elements.reference),P=rs({reference:C,element:y,strategy:"absolute",placement:o}),j=Or(Object.assign({},y,P)),I=p===Ht?j:C,A={top:m.top-I.top+T.top,bottom:I.bottom-m.bottom+T.bottom,left:m.left-I.left+T.left,right:I.right-m.right+T.right},B=e.modifiersData.offset;if(p===Ht&&B){var z=B[o];Object.keys(A).forEach(function(W){var L=[Le,Be].indexOf(W)>=0?1:-1,_=[Ce,Be].indexOf(W)>=0?"y":"x";A[W]+=z[_]*L})}return A}function bc(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,u=c===void 0?Yi:c,d=At(r),f=d?l?Lo:Lo.filter(function(v){return At(v)===d}):fn,p=f.filter(function(v){return u.indexOf(v)>=0});p.length===0&&(p=f);var b=p.reduce(function(v,g){return v[g]=an(e,{placement:g,boundary:o,rootBoundary:i,padding:a})[ze(g)],v},{});return Object.keys(b).sort(function(v,g){return b[v]-b[g]})}function vc(e){if(ze(e)===Ar)return[];var t=Sn(e);return[zo(e),t,zo(t)]}function yc(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!0:a,c=n.fallbackPlacements,u=n.padding,d=n.boundary,f=n.rootBoundary,p=n.altBoundary,b=n.flipVariations,v=b===void 0?!0:b,g=n.allowedAutoPlacements,h=t.options.placement,T=ze(h),S=T===h,y=c||(S||!v?[Sn(h)]:vc(h)),w=[h].concat(y).reduce(function(F,U){return F.concat(ze(U)===Ar?bc(t,{placement:U,boundary:d,rootBoundary:f,padding:u,flipVariations:v,allowedAutoPlacements:g}):U)},[]),m=t.rects.reference,C=t.rects.popper,P=new Map,j=!0,I=w[0],A=0;A<w.length;A++){var B=w[A],z=ze(B),W=At(B)===_t,L=[Ce,Be].indexOf(z)>=0,_=L?"width":"height",N=an(t,{placement:B,boundary:d,rootBoundary:f,altBoundary:p,padding:u}),D=L?W?Le:Pe:W?Be:Ce;m[_]>C[_]&&(D=Sn(D));var ee=Sn(D),Z=[];if(i&&Z.push(N[z]<=0),l&&Z.push(N[D]<=0,N[ee]<=0),Z.every(function(F){return F})){I=B,j=!1;break}P.set(B,Z)}if(j)for(var O=v?3:1,M=function(U){var H=w.find(function(G){var q=P.get(G);if(q)return q.slice(0,U).every(function(X){return X})});if(H)return I=H,"break"},V=O;V>0;V--){var K=M(V);if(K==="break")break}t.placement!==I&&(t.modifiersData[r]._skip=!0,t.placement=I,t.reset=!0)}}const xc={name:"flip",enabled:!0,phase:"main",fn:yc,requiresIfExists:["offset"],data:{_skip:!1}};function qo(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Ho(e){return[Ce,Le,Be,Pe].some(function(t){return e[t]>=0})}function wc(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=an(t,{elementContext:"reference"}),l=an(t,{altBoundary:!0}),c=qo(a,r),u=qo(l,o,i),d=Ho(c),f=Ho(u);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:u,isReferenceHidden:d,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":d,"data-popper-escaped":f})}const Ec={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:wc};function Tc(e,t,n){var r=ze(e),o=[Pe,Ce].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,a=i[0],l=i[1];return a=a||0,l=(l||0)*o,[Pe,Le].indexOf(r)>=0?{x:l,y:a}:{x:a,y:l}}function kc(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,a=Yi.reduce(function(d,f){return d[f]=Tc(f,t.rects,i),d},{}),l=a[t.placement],c=l.x,u=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=u),t.modifiersData[r]=a}const Oc={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:kc};function Sc(e){var t=e.state,n=e.name;t.modifiersData[n]=rs({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Cc={name:"popperOffsets",enabled:!0,phase:"read",fn:Sc,data:{}};function Pc(e){return e==="x"?"y":"x"}function Rc(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!1:a,c=n.boundary,u=n.rootBoundary,d=n.altBoundary,f=n.padding,p=n.tether,b=p===void 0?!0:p,v=n.tetherOffset,g=v===void 0?0:v,h=an(t,{boundary:c,rootBoundary:u,padding:f,altBoundary:d}),T=ze(t.placement),S=At(t.placement),y=!S,w=Lr(T),m=Pc(w),C=t.modifiersData.popperOffsets,P=t.rects.reference,j=t.rects.popper,I=typeof g=="function"?g(Object.assign({},t.rects,{placement:t.placement})):g,A=typeof I=="number"?{mainAxis:I,altAxis:I}:Object.assign({mainAxis:0,altAxis:0},I),B=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,z={x:0,y:0};if(C){if(i){var W,L=w==="y"?Ce:Pe,_=w==="y"?Be:Le,N=w==="y"?"height":"width",D=C[w],ee=D+h[L],Z=D-h[_],O=b?-j[N]/2:0,M=S===_t?P[N]:j[N],V=S===_t?-j[N]:-P[N],K=t.elements.arrow,F=b&&K?Br(K):{width:0,height:0},U=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Qi(),H=U[L],G=U[_],q=en(0,P[N],F[N]),X=y?P[N]/2-O-q-H-A.mainAxis:M-q-H-A.mainAxis,Y=y?-P[N]/2+O+q+G+A.mainAxis:V+q+G+A.mainAxis,re=t.elements.arrow&&hn(t.elements.arrow),$=re?w==="y"?re.clientTop||0:re.clientLeft||0:0,J=(W=B==null?void 0:B[w])!=null?W:0,R=D+X-J-$,oe=D+Y-J,ye=en(b?In(ee,R):ee,D,b?mt(Z,oe):Z);C[w]=ye,z[w]=ye-D}if(l){var ke,me=w==="x"?Ce:Pe,lt=w==="x"?Be:Le,Oe=C[m],We=m==="y"?"height":"width",Re=Oe+h[me],Ge=Oe-h[lt],xe=[Ce,Pe].indexOf(T)!==-1,wt=(ke=B==null?void 0:B[m])!=null?ke:0,ct=xe?Re:Oe-P[We]-j[We]-wt+A.altAxis,Lt=xe?Oe+P[We]+j[We]-wt-A.altAxis:Ge,vn=b&&xe?Ql(ct,Oe,Lt):en(b?ct:Re,Oe,b?Lt:Ge);C[m]=vn,z[m]=vn-Oe}t.modifiersData[r]=z}}const Nc={name:"preventOverflow",enabled:!0,phase:"main",fn:Rc,requiresIfExists:["offset"]};function $c(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Mc(e){return e===_e(e)||!Ae(e)?Fr(e):$c(e)}function _c(e){var t=e.getBoundingClientRect(),n=It(t.width)/e.offsetWidth||1,r=It(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Ic(e,t,n){n===void 0&&(n=!1);var r=Ae(t),o=Ae(t)&&_c(t),i=st(t),a=jt(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((qe(t)!=="body"||zr(i))&&(l=Mc(t)),Ae(t)?(c=jt(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):i&&(c.x=Vr(i))),{x:a.left+l.scrollLeft-c.x,y:a.top+l.scrollTop-c.y,width:a.width,height:a.height}}function jc(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var a=[].concat(i.requires||[],i.requiresIfExists||[]);a.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function Ac(e){var t=jc(e);return Gl.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Dc(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Bc(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var Wo={placement:"bottom",modifiers:[],strategy:"absolute"};function Go(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Lc(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?Wo:o;return function(l,c,u){u===void 0&&(u=i);var d={placement:"bottom",orderedModifiers:[],options:Object.assign({},Wo,i),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},f=[],p=!1,b={state:d,setOptions:function(T){var S=typeof T=="function"?T(d.options):T;g(),d.options=Object.assign({},i,d.options,S),d.scrollParents={reference:yt(l)?tn(l):l.contextElement?tn(l.contextElement):[],popper:tn(c)};var y=Ac(Bc([].concat(r,d.options.modifiers)));return d.orderedModifiers=y.filter(function(w){return w.enabled}),v(),b.update()},forceUpdate:function(){if(!p){var T=d.elements,S=T.reference,y=T.popper;if(Go(S,y)){d.rects={reference:Ic(S,hn(y),d.options.strategy==="fixed"),popper:Br(y)},d.reset=!1,d.placement=d.options.placement,d.orderedModifiers.forEach(function(A){return d.modifiersData[A.name]=Object.assign({},A.data)});for(var w=0;w<d.orderedModifiers.length;w++){if(d.reset===!0){d.reset=!1,w=-1;continue}var m=d.orderedModifiers[w],C=m.fn,P=m.options,j=P===void 0?{}:P,I=m.name;typeof C=="function"&&(d=C({state:d,options:j,name:I,instance:b})||d)}}}},update:Dc(function(){return new Promise(function(h){b.forceUpdate(),h(d)})}),destroy:function(){g(),p=!0}};if(!Go(l,c))return b;b.setOptions(u).then(function(h){!p&&u.onFirstUpdate&&u.onFirstUpdate(h)});function v(){d.orderedModifiers.forEach(function(h){var T=h.name,S=h.options,y=S===void 0?{}:S,w=h.effect;if(typeof w=="function"){var m=w({state:d,name:T,instance:b,options:y}),C=function(){};f.push(m||C)}})}function g(){f.forEach(function(h){return h()}),f=[]}return b}}var Fc=[cc,Cc,ac,Yl,Oc,xc,Nc,rc,Ec],Vc=Lc({defaultModifiers:Fc});const os="Popper";function zc(e){return Ki(os,e)}yl(os,["root"]);const Uc=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],qc=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Hc(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function jn(e){return typeof e=="function"?e():e}function zn(e){return e.nodeType!==void 0}function Wc(e){return!zn(e)}const Gc=()=>et({root:["root"]},fl(zc)),Kc={},Xc=E.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:a,disablePortal:l,modifiers:c,open:u,placement:d,popperOptions:f,popperRef:p,slotProps:b={},slots:v={},TransitionProps:g}=t,h=ue(t,Uc),T=E.useRef(null),S=De(T,n),y=E.useRef(null),w=De(y,p),m=E.useRef(w);bt(()=>{m.current=w},[w]),E.useImperativeHandle(p,()=>y.current,[]);const C=Hc(d,a),[P,j]=E.useState(C),[I,A]=E.useState(jn(o));E.useEffect(()=>{y.current&&y.current.forceUpdate()}),E.useEffect(()=>{o&&A(jn(o))},[o]),bt(()=>{if(!I||!u)return;const _=ee=>{j(ee.placement)};if(process.env.NODE_ENV!=="production"&&I&&zn(I)&&I.nodeType===1){const ee=I.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ee.top===0&&ee.left===0&&ee.right===0&&ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let N=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ee})=>{_(ee)}}];c!=null&&(N=N.concat(c)),f&&f.modifiers!=null&&(N=N.concat(f.modifiers));const D=Vc(I,T.current,k({placement:C},f,{modifiers:N}));return m.current(D),()=>{D.destroy(),m.current(null)}},[I,l,c,u,f,C]);const B={placement:P};g!==null&&(B.TransitionProps=g);const z=Gc(),W=(r=v.root)!=null?r:"div",L=vt({elementType:W,externalSlotProps:b.root,externalForwardedProps:h,additionalProps:{role:"tooltip",ref:S},ownerState:t,className:z.root});return x.jsx(W,k({},L,{children:typeof i=="function"?i(B):i}))}),is=E.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:a="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:u,open:d,placement:f="bottom",popperOptions:p=Kc,popperRef:b,style:v,transition:g=!1,slotProps:h={},slots:T={}}=t,S=ue(t,qc),[y,w]=E.useState(!0),m=()=>{w(!1)},C=()=>{w(!0)};if(!c&&!d&&(!g||y))return null;let P;if(i)P=i;else if(r){const A=jn(r);P=A&&zn(A)?Ee(A).body:Ee(null).body}const j=!d&&c&&(!g||y)?"none":void 0,I=g?{in:d,onEnter:m,onExited:C}:void 0;return x.jsx(on,{disablePortal:l,container:P,children:x.jsx(Xc,k({anchorEl:r,direction:a,disablePortal:l,modifiers:u,ref:n,open:g?!y:d,placement:f,popperOptions:p,popperRef:b,slotProps:h,slots:T},S,{style:k({position:"fixed",top:0,left:0,display:j},v),TransitionProps:I,children:o}))})});process.env.NODE_ENV!=="production"&&(is.propTypes={anchorEl:Bt(s.oneOfType([Ye,s.object,s.func]),e=>{if(e.open){const t=jn(e.anchorEl);if(t&&zn(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Wc(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:s.oneOfType([s.node,s.func]),container:s.oneOfType([Ye,s.func]),direction:s.oneOf(["ltr","rtl"]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:jr,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),transition:s.bool});const Yc=["values","unit","step"],Jc=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>k({},n,{[r.key]:r.val}),{})};function Zc(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=ue(e,Yc),i=Jc(t),a=Object.keys(i);function l(p){return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n})`}function c(p){return`@media (max-width:${(typeof t[p]=="number"?t[p]:p)-r/100}${n})`}function u(p,b){const v=a.indexOf(b);return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n}) and (max-width:${(v!==-1&&typeof t[a[v]]=="number"?t[a[v]]:b)-r/100}${n})`}function d(p){return a.indexOf(p)+1<a.length?u(p,a[a.indexOf(p)+1]):l(p)}function f(p){const b=a.indexOf(p);return b===0?l(a[1]):b===a.length-1?c(a[b]):u(p,a[a.indexOf(p)+1]).replace("@media","@media not all and")}return k({keys:a,values:i,up:l,down:c,between:u,only:d,not:f,unit:n},o)}const Qc={borderRadius:4},eu=Qc,tu=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.string,s.object,s.array]):{},at=tu;function nn(e,t){return t?Xe(e,t,{clone:!1}):e}const Ur={xs:0,sm:600,md:900,lg:1200,xl:1536},Ko={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Ur[e]}px)`};function Ze(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||Ko;return t.reduce((a,l,c)=>(a[i.up(i.keys[c])]=n(t[c]),a),{})}if(typeof t=="object"){const i=r.breakpoints||Ko;return Object.keys(t).reduce((a,l)=>{if(Object.keys(i.values||Ur).indexOf(l)!==-1){const c=i.up(l);a[c]=n(t[l],l)}else{const c=l;a[c]=t[c]}return a},{})}return n(t)}function nu(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function ru(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Un(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function An(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Un(e,n)||r,t&&(o=t(o,r,e)),o}function ve(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=a=>{if(a[t]==null)return null;const l=a[t],c=a.theme,u=Un(c,r)||{};return Ze(a,l,f=>{let p=An(u,o,f);return f===p&&typeof f=="string"&&(p=An(u,o,`${t}${f==="default"?"":Ue(f)}`,f)),n===!1?p:{[n]:p}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:at}:{},i.filterProps=[t],i}function ou(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const iu={m:"margin",p:"padding"},su={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Xo={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},au=ou(e=>{if(e.length>2)if(Xo[e])e=Xo[e];else return[e];const[t,n]=e.split(""),r=iu[t],o=su[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),qn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Hn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],lu=[...qn,...Hn];function mn(e,t,n,r){var o;const i=(o=Un(e,t,!1))!=null?o:n;return typeof i=="number"?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&typeof a!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`),i*a):Array.isArray(i)?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&(Number.isInteger(a)?a>i.length-1&&console.error([`MUI: The value provided (${a}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${a} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[a]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function ss(e){return mn(e,"spacing",8,"spacing")}function gn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function cu(e,t){return n=>e.reduce((r,o)=>(r[o]=gn(t,n),r),{})}function uu(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=au(n),i=cu(o,r),a=e[n];return Ze(e,a,i)}function as(e,t){const n=ss(e.theme);return Object.keys(e).map(r=>uu(e,t,r,n)).reduce(nn,{})}function fe(e){return as(e,qn)}fe.propTypes=process.env.NODE_ENV!=="production"?qn.reduce((e,t)=>(e[t]=at,e),{}):{};fe.filterProps=qn;function he(e){return as(e,Hn)}he.propTypes=process.env.NODE_ENV!=="production"?Hn.reduce((e,t)=>(e[t]=at,e),{}):{};he.filterProps=Hn;process.env.NODE_ENV!=="production"&&lu.reduce((e,t)=>(e[t]=at,e),{});function du(e=8){if(e.mui)return e;const t=ss({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const a=t(i);return typeof a=="number"?`${a}px`:a}).join(" "));return n.mui=!0,n}function Wn(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?nn(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function je(e){return typeof e!="number"?e:`${e}px solid`}function Fe(e,t){return ve({prop:e,themeKey:"borders",transform:t})}const pu=Fe("border",je),fu=Fe("borderTop",je),hu=Fe("borderRight",je),mu=Fe("borderBottom",je),gu=Fe("borderLeft",je),bu=Fe("borderColor"),vu=Fe("borderTopColor"),yu=Fe("borderRightColor"),xu=Fe("borderBottomColor"),wu=Fe("borderLeftColor"),Eu=Fe("outline",je),Tu=Fe("outlineColor"),Gn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=mn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:gn(t,r)});return Ze(e,e.borderRadius,n)}return null};Gn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:at}:{};Gn.filterProps=["borderRadius"];Wn(pu,fu,hu,mu,gu,bu,vu,yu,xu,wu,Gn,Eu,Tu);const Kn=e=>{if(e.gap!==void 0&&e.gap!==null){const t=mn(e.theme,"spacing",8,"gap"),n=r=>({gap:gn(t,r)});return Ze(e,e.gap,n)}return null};Kn.propTypes=process.env.NODE_ENV!=="production"?{gap:at}:{};Kn.filterProps=["gap"];const Xn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=mn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:gn(t,r)});return Ze(e,e.columnGap,n)}return null};Xn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:at}:{};Xn.filterProps=["columnGap"];const Yn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=mn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:gn(t,r)});return Ze(e,e.rowGap,n)}return null};Yn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:at}:{};Yn.filterProps=["rowGap"];const ku=ve({prop:"gridColumn"}),Ou=ve({prop:"gridRow"}),Su=ve({prop:"gridAutoFlow"}),Cu=ve({prop:"gridAutoColumns"}),Pu=ve({prop:"gridAutoRows"}),Ru=ve({prop:"gridTemplateColumns"}),Nu=ve({prop:"gridTemplateRows"}),$u=ve({prop:"gridTemplateAreas"}),Mu=ve({prop:"gridArea"});Wn(Kn,Xn,Yn,ku,Ou,Su,Cu,Pu,Ru,Nu,$u,Mu);function Nt(e,t){return t==="grey"?t:e}const _u=ve({prop:"color",themeKey:"palette",transform:Nt}),Iu=ve({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Nt}),ju=ve({prop:"backgroundColor",themeKey:"palette",transform:Nt});Wn(_u,Iu,ju);function Me(e){return e<=1&&e!==0?`${e*100}%`:e}const Au=ve({prop:"width",transform:Me}),qr=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Ur[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:Me(n)}};return Ze(e,e.maxWidth,t)}return null};qr.filterProps=["maxWidth"];const Du=ve({prop:"minWidth",transform:Me}),Bu=ve({prop:"height",transform:Me}),Lu=ve({prop:"maxHeight",transform:Me}),Fu=ve({prop:"minHeight",transform:Me});ve({prop:"size",cssProperty:"width",transform:Me});ve({prop:"size",cssProperty:"height",transform:Me});const Vu=ve({prop:"boxSizing"});Wn(Au,qr,Du,Bu,Lu,Fu,Vu);const zu={border:{themeKey:"borders",transform:je},borderTop:{themeKey:"borders",transform:je},borderRight:{themeKey:"borders",transform:je},borderBottom:{themeKey:"borders",transform:je},borderLeft:{themeKey:"borders",transform:je},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:je},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Gn},color:{themeKey:"palette",transform:Nt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Nt},backgroundColor:{themeKey:"palette",transform:Nt},p:{style:he},pt:{style:he},pr:{style:he},pb:{style:he},pl:{style:he},px:{style:he},py:{style:he},padding:{style:he},paddingTop:{style:he},paddingRight:{style:he},paddingBottom:{style:he},paddingLeft:{style:he},paddingX:{style:he},paddingY:{style:he},paddingInline:{style:he},paddingInlineStart:{style:he},paddingInlineEnd:{style:he},paddingBlock:{style:he},paddingBlockStart:{style:he},paddingBlockEnd:{style:he},m:{style:fe},mt:{style:fe},mr:{style:fe},mb:{style:fe},ml:{style:fe},mx:{style:fe},my:{style:fe},margin:{style:fe},marginTop:{style:fe},marginRight:{style:fe},marginBottom:{style:fe},marginLeft:{style:fe},marginX:{style:fe},marginY:{style:fe},marginInline:{style:fe},marginInlineStart:{style:fe},marginInlineEnd:{style:fe},marginBlock:{style:fe},marginBlockStart:{style:fe},marginBlockEnd:{style:fe},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Kn},rowGap:{style:Yn},columnGap:{style:Xn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Me},maxWidth:{style:qr},minWidth:{transform:Me},height:{transform:Me},maxHeight:{transform:Me},minHeight:{transform:Me},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Hr=zu;function Uu(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function qu(e,t){return typeof e=="function"?e(t):e}function Hu(){function e(n,r,o,i){const a={[n]:r,theme:o},l=i[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:u,transform:d,style:f}=l;if(r==null)return null;if(u==="typography"&&r==="inherit")return{[n]:r};const p=Un(o,u)||{};return f?f(a):Ze(a,r,v=>{let g=An(p,d,v);return v===g&&typeof v=="string"&&(g=An(p,d,`${n}${v==="default"?"":Ue(v)}`,v)),c===!1?g:{[c]:g}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const a=(r=i.unstable_sxConfig)!=null?r:Hr;function l(c){let u=c;if(typeof c=="function")u=c(i);else if(typeof c!="object")return c;if(!u)return null;const d=nu(i.breakpoints),f=Object.keys(d);let p=d;return Object.keys(u).forEach(b=>{const v=qu(u[b],i);if(v!=null)if(typeof v=="object")if(a[b])p=nn(p,e(b,v,i,a));else{const g=Ze({theme:i},v,h=>({[b]:h}));Uu(g,v)?p[b]=t({sx:v,theme:i}):p=nn(p,g)}else p=nn(p,e(b,v,i,a))}),ru(f,p)}return Array.isArray(o)?o.map(l):l(o)}return t}const ls=Hu();ls.filterProps=["sx"];const Wr=ls;function Wu(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Gu=["breakpoints","palette","spacing","shape"];function Gr(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,a=ue(e,Gu),l=Zc(n),c=du(o);let u=Xe({breakpoints:l,direction:"ltr",components:{},palette:k({mode:"light"},r),spacing:c,shape:k({},eu,i)},a);return u.applyStyles=Wu,u=t.reduce((d,f)=>Xe(d,f),u),u.unstable_sxConfig=k({},Hr,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(f){return Wr({sx:f,theme:this})},u}function Ku(e){return Object.keys(e).length===0}function cs(e=null){const t=E.useContext(vr.ThemeContext);return!t||Ku(t)?e:t}const Xu=Gr();function us(e=Xu){return cs(e)}const Yu=["ownerState"],Ju=["variants"],Zu=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Qu(e){return Object.keys(e).length===0}function ed(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Cn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const td=Gr(),Yo=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Tn({defaultTheme:e,theme:t,themeId:n}){return Qu(t)?e:t[n]||t}function nd(e){return e?(t,n)=>n[e]:null}function Pn(e,t){let{ownerState:n}=t,r=ue(t,Yu);const o=typeof e=="function"?e(k({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>Pn(i,k({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let l=ue(o,Ju);return i.forEach(c=>{let u=!0;typeof c.props=="function"?u=c.props(k({ownerState:n},r,n)):Object.keys(c.props).forEach(d=>{(n==null?void 0:n[d])!==c.props[d]&&r[d]!==c.props[d]&&(u=!1)}),u&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(k({ownerState:n},r,n)):c.style))}),l}return o}function rd(e={}){const{themeId:t,defaultTheme:n=td,rootShouldForwardProp:r=Cn,slotShouldForwardProp:o=Cn}=e,i=a=>Wr(k({},a,{theme:Tn(k({},a,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(a,l={})=>{vr.internal_processStyles(a,m=>m.filter(C=>!(C!=null&&C.__mui_systemSx)));const{name:c,slot:u,skipVariantsResolver:d,skipSx:f,overridesResolver:p=nd(Yo(u))}=l,b=ue(l,Zu),v=d!==void 0?d:u&&u!=="Root"&&u!=="root"||!1,g=f||!1;let h;process.env.NODE_ENV!=="production"&&c&&(h=`${c}-${Yo(u||"Root")}`);let T=Cn;u==="Root"||u==="root"?T=r:u?T=o:ed(a)&&(T=void 0);const S=vr(a,k({shouldForwardProp:T,label:h},b)),y=m=>typeof m=="function"&&m.__emotion_real!==m||ht(m)?C=>Pn(m,k({},C,{theme:Tn({theme:C.theme,defaultTheme:n,themeId:t})})):m,w=(m,...C)=>{let P=y(m);const j=C?C.map(y):[];c&&p&&j.push(B=>{const z=Tn(k({},B,{defaultTheme:n,themeId:t}));if(!z.components||!z.components[c]||!z.components[c].styleOverrides)return null;const W=z.components[c].styleOverrides,L={};return Object.entries(W).forEach(([_,N])=>{L[_]=Pn(N,k({},B,{theme:z}))}),p(B,L)}),c&&!v&&j.push(B=>{var z;const W=Tn(k({},B,{defaultTheme:n,themeId:t})),L=W==null||(z=W.components)==null||(z=z[c])==null?void 0:z.variants;return Pn({variants:L},k({},B,{theme:W}))}),g||j.push(i);const I=j.length-C.length;if(Array.isArray(m)&&I>0){const B=new Array(I).fill("");P=[...m,...B],P.raw=[...m.raw,...B]}const A=S(P,...j);if(process.env.NODE_ENV!=="production"){let B;c&&(B=`${c}${Ue(u||"")}`),B===void 0&&(B=`Styled(${Va(a)})`),A.displayName=B}return a.muiName&&(A.muiName=a.muiName),A};return S.withConfig&&(w.withConfig=S.withConfig),w}}function od(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:zi(t.components[n].defaultProps,r)}function id({props:e,name:t,defaultTheme:n,themeId:r}){let o=us(n);return r&&(o=o[r]||o),od({theme:o,name:t,props:e})}function Kr(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),ul(e,t,n)}function sd(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function xt(e){if(e.type)return e;if(e.charAt(0)==="#")return xt(sd(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:$t(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:$t(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function Jn(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function ad(e){e=xt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),a=(u,d=(u+n/30)%12)=>o-i*Math.max(Math.min(d-3,9-d,1),-1);let l="rgb";const c=[Math.round(a(0)*255),Math.round(a(8)*255),Math.round(a(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),Jn({type:l,values:c})}function Jo(e){e=xt(e);let t=e.type==="hsl"||e.type==="hsla"?xt(ad(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Zo(e,t){const n=Jo(e),r=Jo(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function Dn(e,t){return e=xt(e),t=Kr(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Jn(e)}function ld(e,t){if(e=xt(e),t=Kr(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return Jn(e)}function cd(e,t){if(e=xt(e),t=Kr(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return Jn(e)}function ud(e,t){return k({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const dd={black:"#000",white:"#fff"},ln=dd,pd={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},fd=pd,hd={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Et=hd,md={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Tt=md,gd={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Wt=gd,bd={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},kt=bd,vd={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Ot=vd,yd={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},St=yd,xd=["mode","contrastThreshold","tonalOffset"],Qo={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:ln.white,default:ln.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},dr={text:{primary:ln.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:ln.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function ei(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=cd(e.main,o):t==="dark"&&(e.dark=ld(e.main,i)))}function wd(e="light"){return e==="dark"?{main:kt[200],light:kt[50],dark:kt[400]}:{main:kt[700],light:kt[400],dark:kt[800]}}function Ed(e="light"){return e==="dark"?{main:Et[200],light:Et[50],dark:Et[400]}:{main:Et[500],light:Et[300],dark:Et[700]}}function Td(e="light"){return e==="dark"?{main:Tt[500],light:Tt[300],dark:Tt[700]}:{main:Tt[700],light:Tt[400],dark:Tt[800]}}function kd(e="light"){return e==="dark"?{main:Ot[400],light:Ot[300],dark:Ot[700]}:{main:Ot[700],light:Ot[500],dark:Ot[900]}}function Od(e="light"){return e==="dark"?{main:St[400],light:St[300],dark:St[700]}:{main:St[800],light:St[500],dark:St[900]}}function Sd(e="light"){return e==="dark"?{main:Wt[400],light:Wt[300],dark:Wt[700]}:{main:"#ed6c02",light:Wt[500],dark:Wt[900]}}function Cd(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=ue(e,xd),i=e.primary||wd(t),a=e.secondary||Ed(t),l=e.error||Td(t),c=e.info||kd(t),u=e.success||Od(t),d=e.warning||Sd(t);function f(g){const h=Zo(g,dr.text.primary)>=n?dr.text.primary:Qo.text.primary;if(process.env.NODE_ENV!=="production"){const T=Zo(g,h);T<3&&console.error([`MUI: The contrast ratio of ${T}:1 for ${h} on ${g}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return h}const p=({color:g,name:h,mainShade:T=500,lightShade:S=300,darkShade:y=700})=>{if(g=k({},g),!g.main&&g[T]&&(g.main=g[T]),!g.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${T}\` property.`:$t(11,h?` (${h})`:"",T));if(typeof g.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(g.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:$t(12,h?` (${h})`:"",JSON.stringify(g.main)));return ei(g,"light",S,r),ei(g,"dark",y,r),g.contrastText||(g.contrastText=f(g.main)),g},b={dark:dr,light:Qo};return process.env.NODE_ENV!=="production"&&(b[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),Xe(k({common:k({},ln),mode:t,primary:p({color:i,name:"primary"}),secondary:p({color:a,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:p({color:l,name:"error"}),warning:p({color:d,name:"warning"}),info:p({color:c,name:"info"}),success:p({color:u,name:"success"}),grey:fd,contrastThreshold:n,getContrastText:f,augmentColor:p,tonalOffset:r},b[t]),o)}const Pd=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Rd(e){return Math.round(e*1e5)/1e5}const ti={textTransform:"uppercase"},ni='"Roboto", "Helvetica", "Arial", sans-serif';function Nd(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=ni,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:a=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:u=16,allVariants:d,pxToRem:f}=n,p=ue(n,Pd);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const b=o/14,v=f||(T=>`${T/u*b}rem`),g=(T,S,y,w,m)=>k({fontFamily:r,fontWeight:T,fontSize:v(S),lineHeight:y},r===ni?{letterSpacing:`${Rd(w/S)}em`}:{},m,d),h={h1:g(i,96,1.167,-1.5),h2:g(i,60,1.2,-.5),h3:g(a,48,1.167,0),h4:g(a,34,1.235,.25),h5:g(a,24,1.334,0),h6:g(l,20,1.6,.15),subtitle1:g(a,16,1.75,.15),subtitle2:g(l,14,1.57,.1),body1:g(a,16,1.5,.15),body2:g(a,14,1.43,.15),button:g(l,14,1.75,.4,ti),caption:g(a,12,1.66,.4),overline:g(a,12,2.66,1,ti),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return Xe(k({htmlFontSize:u,pxToRem:v,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:a,fontWeightMedium:l,fontWeightBold:c},h),p,{clone:!1})}const $d=.2,Md=.14,_d=.12;function pe(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${$d})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Md})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${_d})`].join(",")}const Id=["none",pe(0,2,1,-1,0,1,1,0,0,1,3,0),pe(0,3,1,-2,0,2,2,0,0,1,5,0),pe(0,3,3,-2,0,3,4,0,0,1,8,0),pe(0,2,4,-1,0,4,5,0,0,1,10,0),pe(0,3,5,-1,0,5,8,0,0,1,14,0),pe(0,3,5,-1,0,6,10,0,0,1,18,0),pe(0,4,5,-2,0,7,10,1,0,2,16,1),pe(0,5,5,-3,0,8,10,1,0,3,14,2),pe(0,5,6,-3,0,9,12,1,0,3,16,2),pe(0,6,6,-3,0,10,14,1,0,4,18,3),pe(0,6,7,-4,0,11,15,1,0,4,20,3),pe(0,7,8,-4,0,12,17,2,0,5,22,4),pe(0,7,8,-4,0,13,19,2,0,5,24,4),pe(0,7,9,-4,0,14,21,2,0,5,26,4),pe(0,8,9,-5,0,15,22,2,0,6,28,5),pe(0,8,10,-5,0,16,24,2,0,6,30,5),pe(0,8,11,-5,0,17,26,2,0,6,32,5),pe(0,9,11,-5,0,18,28,2,0,7,34,6),pe(0,9,12,-6,0,19,29,2,0,7,36,6),pe(0,10,13,-6,0,20,31,3,0,8,38,7),pe(0,10,13,-6,0,21,33,3,0,8,40,7),pe(0,10,14,-6,0,22,35,3,0,8,42,7),pe(0,11,14,-7,0,23,36,3,0,9,44,8),pe(0,11,15,-7,0,24,38,3,0,9,46,8)],jd=Id,Ad=["duration","easing","delay"],Dd={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Bd={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function ri(e){return`${Math.round(e)}ms`}function Ld(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Fd(e){const t=k({},Dd,e.easing),n=k({},Bd,e.duration);return k({getAutoHeightDuration:Ld,create:(o=["all"],i={})=>{const{duration:a=n.standard,easing:l=t.easeInOut,delay:c=0}=i,u=ue(i,Ad);if(process.env.NODE_ENV!=="production"){const d=p=>typeof p=="string",f=p=>!isNaN(parseFloat(p));!d(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!f(a)&&!d(a)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`),d(l)||console.error('MUI: Argument "easing" must be a string.'),!f(c)&&!d(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(d=>`${d} ${typeof a=="string"?a:ri(a)} ${l} ${typeof c=="string"?c:ri(c)}`).join(",")}},e,{easing:t,duration:n})}const Vd={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},zd=Vd,Ud=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function qd(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,a=ue(e,Ud);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":$t(18));const l=Cd(r),c=Gr(e);let u=Xe(c,{mixins:ud(c.breakpoints,n),palette:l,shadows:jd.slice(),typography:Nd(l,i),transitions:Fd(o),zIndex:k({},zd)});if(u=Xe(u,a),u=t.reduce((d,f)=>Xe(d,f),u),process.env.NODE_ENV!=="production"){const d=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],f=(p,b)=>{let v;for(v in p){const g=p[v];if(d.indexOf(v)!==-1&&Object.keys(g).length>0){if(process.env.NODE_ENV!=="production"){const h=He("",v);console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${v}\` internal state.`,"You can not override it like this: ",JSON.stringify(p,null,2),"",`Instead, you need to use the '&.${h}' syntax:`,JSON.stringify({root:{[`&.${h}`]:g}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}p[v]={}}}};Object.keys(u.components).forEach(p=>{const b=u.components[p].styleOverrides;b&&p.indexOf("Mui")===0&&f(b,p)})}return u.unstable_sxConfig=k({},Hr,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(f){return Wr({sx:f,theme:this})},u}const Hd=qd(),Xr=Hd,Yr="$$material",ds=e=>Cn(e)&&e!=="classes",Wd=rd({themeId:Yr,defaultTheme:Xr,rootShouldForwardProp:ds}),Te=Wd;function bn(){const e=us(Xr);return process.env.NODE_ENV!=="production"&&E.useDebugValue(e),e[Yr]||e}function tt({props:e,name:t}){return id({props:e,name:t,defaultTheme:Xr,themeId:Yr})}function Sr(e,t){return Sr=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},Sr(e,t)}function Gd(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Sr(e,t)}const oi={disabled:!1};var Kd=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.shape({enter:s.number,exit:s.number,appear:s.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&s.oneOfType([s.string,s.shape({enter:s.string,exit:s.string,active:s.string}),s.shape({enter:s.string,enterDone:s.string,enterActive:s.string,exit:s.string,exitDone:s.string,exitActive:s.string})]);const ps=Q.createContext(null);var Xd=function(t){return t.scrollTop},Zt="unmounted",dt="exited",pt="entering",Rt="entered",Cr="exiting",nt=function(e){Gd(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var a=o,l=a&&!a.isMounting?r.enter:r.appear,c;return i.appearStatus=null,r.in?l?(c=dt,i.appearStatus=pt):c=Rt:r.unmountOnExit||r.mountOnEnter?c=Zt:c=dt,i.state={status:c},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var a=o.in;return a&&i.status===Zt?{status:dt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var a=this.state.status;this.props.in?a!==pt&&a!==Rt&&(i=pt):(a===pt||a===Rt)&&(i=Cr)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,a,l;return i=a=l=o,o!=null&&typeof o!="number"&&(i=o.exit,a=o.enter,l=o.appear!==void 0?o.appear:a),{exit:i,enter:a,appear:l}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===pt){if(this.props.unmountOnExit||this.props.mountOnEnter){var a=this.props.nodeRef?this.props.nodeRef.current:Xt.findDOMNode(this);a&&Xd(a)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===dt&&this.setState({status:Zt})},n.performEnter=function(o){var i=this,a=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[Xt.findDOMNode(this),l],u=c[0],d=c[1],f=this.getTimeouts(),p=l?f.appear:f.enter;if(!o&&!a||oi.disabled){this.safeSetState({status:Rt},function(){i.props.onEntered(u)});return}this.props.onEnter(u,d),this.safeSetState({status:pt},function(){i.props.onEntering(u,d),i.onTransitionEnd(p,function(){i.safeSetState({status:Rt},function(){i.props.onEntered(u,d)})})})},n.performExit=function(){var o=this,i=this.props.exit,a=this.getTimeouts(),l=this.props.nodeRef?void 0:Xt.findDOMNode(this);if(!i||oi.disabled){this.safeSetState({status:dt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:Cr},function(){o.props.onExiting(l),o.onTransitionEnd(a.exit,function(){o.safeSetState({status:dt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,a=!0;return this.nextCallback=function(l){a&&(a=!1,i.nextCallback=null,o(l))},this.nextCallback.cancel=function(){a=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var a=this.props.nodeRef?this.props.nodeRef.current:Xt.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!a||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[a,this.nextCallback],u=c[0],d=c[1];this.props.addEndListener(u,d)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===Zt)return null;var i=this.props,a=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var l=ue(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return Q.createElement(ps.Provider,{value:null},typeof a=="function"?a(o,l):Q.cloneElement(Q.Children.only(a),l))},t}(Q.Component);nt.contextType=ps;nt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:s.shape({current:typeof Element>"u"?s.any:function(e,t,n,r,o,i){var a=e[t];return s.instanceOf(a&&"ownerDocument"in a?a.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:s.oneOfType([s.func.isRequired,s.element.isRequired]).isRequired,in:s.bool,mountOnEnter:s.bool,unmountOnExit:s.bool,appear:s.bool,enter:s.bool,exit:s.bool,timeout:function(t){var n=Kd;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:s.func,onEnter:s.func,onEntering:s.func,onEntered:s.func,onExit:s.func,onExiting:s.func,onExited:s.func}:{};function Ct(){}nt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Ct,onEntering:Ct,onEntered:Ct,onExit:Ct,onExiting:Ct,onExited:Ct};nt.UNMOUNTED=Zt;nt.EXITED=dt;nt.ENTERING=pt;nt.ENTERED=Rt;nt.EXITING=Cr;const fs=nt,hs=e=>e.scrollTop;function Bn(e,t){var n,r;const{timeout:o,easing:i,style:a={}}=e;return{duration:(n=a.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=a.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:a.transitionDelay}}const Yd=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function Pr(e){return`scale(${e}, ${e**2})`}const Jd={entering:{opacity:1,transform:Pr(1)},entered:{opacity:1,transform:"none"}},pr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Jr=E.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:a,in:l,onEnter:c,onEntered:u,onEntering:d,onExit:f,onExited:p,onExiting:b,style:v,timeout:g="auto",TransitionComponent:h=fs}=t,T=ue(t,Yd),S=Yt(),y=E.useRef(),w=bn(),m=E.useRef(null),C=De(m,i.ref,n),P=_=>N=>{if(_){const D=m.current;N===void 0?_(D):_(D,N)}},j=P(d),I=P((_,N)=>{hs(_);const{duration:D,delay:ee,easing:Z}=Bn({style:v,timeout:g,easing:a},{mode:"enter"});let O;g==="auto"?(O=w.transitions.getAutoHeightDuration(_.clientHeight),y.current=O):O=D,_.style.transition=[w.transitions.create("opacity",{duration:O,delay:ee}),w.transitions.create("transform",{duration:pr?O:O*.666,delay:ee,easing:Z})].join(","),c&&c(_,N)}),A=P(u),B=P(b),z=P(_=>{const{duration:N,delay:D,easing:ee}=Bn({style:v,timeout:g,easing:a},{mode:"exit"});let Z;g==="auto"?(Z=w.transitions.getAutoHeightDuration(_.clientHeight),y.current=Z):Z=N,_.style.transition=[w.transitions.create("opacity",{duration:Z,delay:D}),w.transitions.create("transform",{duration:pr?Z:Z*.666,delay:pr?D:D||Z*.333,easing:ee})].join(","),_.style.opacity=0,_.style.transform=Pr(.75),f&&f(_)}),W=P(p),L=_=>{g==="auto"&&S.start(y.current||0,_),r&&r(m.current,_)};return x.jsx(h,k({appear:o,in:l,nodeRef:m,onEnter:I,onEntered:A,onEntering:j,onExit:z,onExited:W,onExiting:B,addEndListener:L,timeout:g==="auto"?null:g},T,{children:(_,N)=>E.cloneElement(i,k({style:k({opacity:0,transform:Pr(.75),visibility:_==="exited"&&!l?"hidden":void 0},Jd[_],v,i.props.style),ref:C},N))}))});process.env.NODE_ENV!=="production"&&(Jr.propTypes={addEndListener:s.func,appear:s.bool,children:dn.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});Jr.muiSupportAuto=!0;const Rr=Jr,Zd=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},ii=Zd,Qd=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],ep=Te(is,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),ms=E.forwardRef(function(t,n){var r;const o=cs(),i=tt({props:t,name:"MuiPopper"}),{anchorEl:a,component:l,components:c,componentsProps:u,container:d,disablePortal:f,keepMounted:p,modifiers:b,open:v,placement:g,popperOptions:h,popperRef:T,transition:S,slots:y,slotProps:w}=i,m=ue(i,Qd),C=(r=y==null?void 0:y.root)!=null?r:c==null?void 0:c.Root,P=k({anchorEl:a,container:d,disablePortal:f,keepMounted:p,modifiers:b,open:v,placement:g,popperOptions:h,popperRef:T,transition:S},m);return x.jsx(ep,k({as:l,direction:o==null?void 0:o.direction,slots:{root:C},slotProps:w??u},P,{ref:n}))});process.env.NODE_ENV!=="production"&&(ms.propTypes={anchorEl:s.oneOfType([Ye,s.object,s.func]),children:s.oneOfType([s.node,s.func]),component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Ye,s.func]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:jr,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transition:s.bool});const gs=ms;function tp(e){return He("MuiTooltip",e)}const np=it("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),ot=np,rp=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function op(e){return Math.round(e*1e5)/1e5}const ip=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,a={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Ue(i.split("-")[0])}`],arrow:["arrow"]};return et(a,tp,t)},sp=Te(gs,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>k({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${ot.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${ot.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${ot.arrow}`]:k({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${ot.arrow}`]:k({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),ap=Te("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Ue(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>k({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:Dn(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${op(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${ot.popper}[data-popper-placement*="left"] &`]:k({transformOrigin:"right center"},t.isRtl?k({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):k({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${ot.popper}[data-popper-placement*="right"] &`]:k({transformOrigin:"left center"},t.isRtl?k({marginRight:"14px"},t.touch&&{marginRight:"24px"}):k({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${ot.popper}[data-popper-placement*="top"] &`]:k({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${ot.popper}[data-popper-placement*="bottom"] &`]:k({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),lp=Te("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:Dn(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let kn=!1;const si=new pn;let Gt={x:0,y:0};function On(e,t){return n=>{t&&t(n),e(n)}}const bs=E.forwardRef(function(t,n){var r,o,i,a,l,c,u,d,f,p,b,v,g,h,T,S,y,w,m;const C=tt({props:t,name:"MuiTooltip"}),{arrow:P=!1,children:j,components:I={},componentsProps:A={},describeChild:B=!1,disableFocusListener:z=!1,disableHoverListener:W=!1,disableInteractive:L=!1,disableTouchListener:_=!1,enterDelay:N=100,enterNextDelay:D=0,enterTouchDelay:ee=700,followCursor:Z=!1,id:O,leaveDelay:M=0,leaveTouchDelay:V=1500,onClose:K,onOpen:F,open:U,placement:H="bottom",PopperComponent:G,PopperProps:q={},slotProps:X={},slots:Y={},title:re,TransitionComponent:$=Rr,TransitionProps:J}=C,R=ue(C,rp),oe=E.isValidElement(j)?j:x.jsx("span",{children:j}),ye=bn(),ke=ye.direction==="rtl",[me,lt]=E.useState(),[Oe,We]=E.useState(null),Re=E.useRef(!1),Ge=L||Z,xe=Yt(),wt=Yt(),ct=Yt(),Lt=Yt(),[vn,no]=Ai({controlled:U,default:!1,name:"Tooltip",state:"open"});let Ke=vn;if(process.env.NODE_ENV!=="production"){const{current:te}=E.useRef(U!==void 0);E.useEffect(()=>{me&&me.disabled&&!te&&re!==""&&me.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[re,me,te])}const Zn=ji(O),Ft=E.useRef(),yn=rn(()=>{Ft.current!==void 0&&(document.body.style.WebkitUserSelect=Ft.current,Ft.current=void 0),Lt.clear()});E.useEffect(()=>yn,[yn]);const ro=te=>{si.clear(),kn=!0,no(!0),F&&!Ke&&F(te)},xn=rn(te=>{si.start(800+M,()=>{kn=!1}),no(!1),K&&Ke&&K(te),xe.start(ye.transitions.duration.shortest,()=>{Re.current=!1})}),Qn=te=>{Re.current&&te.type!=="touchstart"||(me&&me.removeAttribute("title"),wt.clear(),ct.clear(),N||kn&&D?wt.start(kn?D:N,()=>{ro(te)}):ro(te))},oo=te=>{wt.clear(),ct.start(M,()=>{xn(te)})},{isFocusVisibleRef:io,onBlur:js,onFocus:As,ref:Ds}=Di(),[,so]=E.useState(!1),ao=te=>{js(te),io.current===!1&&(so(!1),oo(te))},lo=te=>{me||lt(te.currentTarget),As(te),io.current===!0&&(so(!0),Qn(te))},co=te=>{Re.current=!0;const Ne=oe.props;Ne.onTouchStart&&Ne.onTouchStart(te)},uo=Qn,po=oo,Bs=te=>{co(te),ct.clear(),xe.clear(),yn(),Ft.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Lt.start(ee,()=>{document.body.style.WebkitUserSelect=Ft.current,Qn(te)})},Ls=te=>{oe.props.onTouchEnd&&oe.props.onTouchEnd(te),yn(),ct.start(V,()=>{xn(te)})};E.useEffect(()=>{if(!Ke)return;function te(Ne){(Ne.key==="Escape"||Ne.key==="Esc")&&xn(Ne)}return document.addEventListener("keydown",te),()=>{document.removeEventListener("keydown",te)}},[xn,Ke]);const Fs=De(oe.ref,Ds,lt,n);!re&&re!==0&&(Ke=!1);const er=E.useRef(),Vs=te=>{const Ne=oe.props;Ne.onMouseMove&&Ne.onMouseMove(te),Gt={x:te.clientX,y:te.clientY},er.current&&er.current.update()},Vt={},tr=typeof re=="string";B?(Vt.title=!Ke&&tr&&!W?re:null,Vt["aria-describedby"]=Ke?Zn:null):(Vt["aria-label"]=tr?re:null,Vt["aria-labelledby"]=Ke&&!tr?Zn:null);const Ie=k({},Vt,R,oe.props,{className:we(R.className,oe.props.className),onTouchStart:co,ref:Fs},Z?{onMouseMove:Vs}:{});process.env.NODE_ENV!=="production"&&(Ie["data-mui-internal-clone-element"]=!0,E.useEffect(()=>{me&&!me.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[me]));const zt={};_||(Ie.onTouchStart=Bs,Ie.onTouchEnd=Ls),W||(Ie.onMouseOver=On(uo,Ie.onMouseOver),Ie.onMouseLeave=On(po,Ie.onMouseLeave),Ge||(zt.onMouseOver=uo,zt.onMouseLeave=po)),z||(Ie.onFocus=On(lo,Ie.onFocus),Ie.onBlur=On(ao,Ie.onBlur),Ge||(zt.onFocus=lo,zt.onBlur=ao)),process.env.NODE_ENV!=="production"&&oe.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${oe.props.title}\` or the Tooltip component.`].join(`
`));const zs=E.useMemo(()=>{var te;let Ne=[{name:"arrow",enabled:!!Oe,options:{element:Oe,padding:4}}];return(te=q.popperOptions)!=null&&te.modifiers&&(Ne=Ne.concat(q.popperOptions.modifiers)),k({},q.popperOptions,{modifiers:Ne})},[Oe,q]),Ut=k({},C,{isRtl:ke,arrow:P,disableInteractive:Ge,placement:H,PopperComponentProp:G,touch:Re.current}),nr=ip(Ut),fo=(r=(o=Y.popper)!=null?o:I.Popper)!=null?r:sp,ho=(i=(a=(l=Y.transition)!=null?l:I.Transition)!=null?a:$)!=null?i:Rr,mo=(c=(u=Y.tooltip)!=null?u:I.Tooltip)!=null?c:ap,go=(d=(f=Y.arrow)!=null?f:I.Arrow)!=null?d:lp,Us=Jt(fo,k({},q,(p=X.popper)!=null?p:A.popper,{className:we(nr.popper,q==null?void 0:q.className,(b=(v=X.popper)!=null?v:A.popper)==null?void 0:b.className)}),Ut),qs=Jt(ho,k({},J,(g=X.transition)!=null?g:A.transition),Ut),Hs=Jt(mo,k({},(h=X.tooltip)!=null?h:A.tooltip,{className:we(nr.tooltip,(T=(S=X.tooltip)!=null?S:A.tooltip)==null?void 0:T.className)}),Ut),Ws=Jt(go,k({},(y=X.arrow)!=null?y:A.arrow,{className:we(nr.arrow,(w=(m=X.arrow)!=null?m:A.arrow)==null?void 0:w.className)}),Ut);return x.jsxs(E.Fragment,{children:[E.cloneElement(oe,Ie),x.jsx(fo,k({as:G??gs,placement:H,anchorEl:Z?{getBoundingClientRect:()=>({top:Gt.y,left:Gt.x,right:Gt.x,bottom:Gt.y,width:0,height:0})}:me,popperRef:er,open:me?Ke:!1,id:Zn,transition:!0},zt,Us,{popperOptions:zs,children:({TransitionProps:te})=>x.jsx(ho,k({timeout:ye.transitions.duration.shorter},te,qs,{children:x.jsxs(mo,k({},Hs,{children:[re,P?x.jsx(go,k({},Ws,{ref:We})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(bs.propTypes={arrow:s.bool,children:dn.isRequired,classes:s.object,className:s.string,components:s.shape({Arrow:s.elementType,Popper:s.elementType,Tooltip:s.elementType,Transition:s.elementType}),componentsProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),describeChild:s.bool,disableFocusListener:s.bool,disableHoverListener:s.bool,disableInteractive:s.bool,disableTouchListener:s.bool,enterDelay:s.number,enterNextDelay:s.number,enterTouchDelay:s.number,followCursor:s.bool,id:s.string,leaveDelay:s.number,leaveTouchDelay:s.number,onClose:s.func,onOpen:s.func,open:s.bool,placement:s.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:s.elementType,PopperProps:s.object,slotProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),slots:s.shape({arrow:s.elementType,popper:s.elementType,tooltip:s.elementType,transition:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),title:s.node,TransitionComponent:s.elementType,TransitionProps:s.object});const cp=bs;var Zr={},vs={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(vs);var up=vs.exports,fr={};function dp(e){return He("MuiSvgIcon",e)}it("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const pp=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],fp=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Ue(t)}`,`fontSize${Ue(n)}`]};return et(o,dp,r)},hp=Te("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Ue(n.color)}`],t[`fontSize${Ue(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,a,l,c,u,d,f,p,b,v;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(a=i.pxToRem)==null?void 0:a.call(i,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((u=e.typography)==null||(d=u.pxToRem)==null?void 0:d.call(u,35))||"2.1875rem"}[t.fontSize],color:(f=(p=(e.vars||e).palette)==null||(p=p[t.color])==null?void 0:p.main)!=null?f:{action:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.active,disabled:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.disabled,inherit:void 0}[t.color]}}),Qr=E.forwardRef(function(t,n){const r=tt({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:a="inherit",component:l="svg",fontSize:c="medium",htmlColor:u,inheritViewBox:d=!1,titleAccess:f,viewBox:p="0 0 24 24"}=r,b=ue(r,pp),v=E.isValidElement(o)&&o.type==="svg",g=k({},r,{color:a,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:d,viewBox:p,hasSvgAsChild:v}),h={};d||(h.viewBox=p);const T=fp(g);return x.jsxs(hp,k({as:l,className:we(T.root,i),focusable:"false",color:u,"aria-hidden":f?void 0:!0,role:f?"img":void 0,ref:n},h,b,v&&o.props,{ownerState:g,children:[v?o.props.children:o,f?x.jsx("title",{children:f}):null]}))});process.env.NODE_ENV!=="production"&&(Qr.propTypes={children:s.node,classes:s.object,className:s.string,color:s.oneOfType([s.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),s.string]),component:s.elementType,fontSize:s.oneOfType([s.oneOf(["inherit","large","medium","small"]),s.string]),htmlColor:s.string,inheritViewBox:s.bool,shapeRendering:s.string,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),titleAccess:s.string,viewBox:s.string});Qr.muiName="SvgIcon";const ai=Qr;function ys(e,t){function n(r,o){return x.jsx(ai,k({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=ai.muiName,E.memo(E.forwardRef(n))}const mp={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Ui.configure(e)}},gp=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Ue,createChainedFunction:wr,createSvgIcon:ys,debounce:Ii,deprecatedPropType:Ua,isMuiElement:qa,ownerDocument:Ee,ownerWindow:Mt,requirePropFactory:Ha,setRef:Mn,unstable_ClassNameGenerator:mp,unstable_useEnhancedEffect:bt,unstable_useId:ji,unsupportedProp:Ka,useControlled:Ai,useEventCallback:rn,useForkRef:De,useIsFocusVisible:Di},Symbol.toStringTag,{value:"Module"})),bp=Ea(gp);var li;function vp(){return li||(li=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=bp}(fr)),fr}var yp=up;Object.defineProperty(Zr,"__esModule",{value:!0});var xs=Zr.default=void 0,xp=yp(vp()),wp=x;xs=Zr.default=(0,xp.default)((0,wp.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function ci(e,t,n){return e?x.jsx(de.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:x.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function eo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:a=void 0,hasAutoFocus:l=!1,className:c,isDisabled:u=!1,isDense:d=!0,isSubMenuParent:f=!1,hasDisabledGutters:p=!1,hasDivider:b=!1,focusVisibleClassName:v,id:g,children:h}=e,T=x.jsx(de.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:u,dense:d,disableGutters:p,divider:b,focusVisibleClassName:v,onClick:t,id:g,children:n?x.jsxs(x.Fragment,{children:[ci(i,n,!0),x.jsx(de.ListItemText,{primary:n,inset:!i&&o}),f?x.jsx(de.ListItemIcon,{className:"papi-menu-icon-trailing",children:x.jsx(xs,{})}):ci(a,n,!1)]}):h});return r?x.jsx(cp,{title:r,placement:"right",children:x.jsx("div",{children:T})}):T}function ws(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Ep(e){const[t,n]=Q.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,a=u=>{n(u.currentTarget)},l=()=>{n(void 0)},c=()=>{let u=ws(i).filter(d=>"menuItem"in d.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return u=u.filter(d=>"menuItem"in d.group&&d.group.menuItem===r.id),x.jsx(to,{...e,includedGroups:u})};return x.jsxs(x.Fragment,{children:[x.jsx(eo,{onClick:a,...o,isSubMenuParent:!0}),x.jsx(de.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Tp=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function to(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:a}=Q.useMemo(()=>{const d=o&&o.length>0?o:ws(t).filter(v=>!("menuItem"in v.group)),f=Object.values(d).sort((v,g)=>(v.group.order||0)-(g.group.order||0)),p=[];f.forEach(v=>{Tp(v.id,t.items).forEach(g=>p.push({item:g,isLastItemInGroup:!1})),p.length>0&&(p[p.length-1].isLastItemInGroup=!0)}),p.length>0&&(p[p.length-1].isLastItemInGroup=!1);const b=p.some(v=>"iconPathBefore"in v.item&&v.item.iconPathBefore);return{items:p,allowForLeadingIcons:b}},[o,t]),l=({item:d,isLastItemInGroup:f})=>({className:"papi-menu-item",label:d.label,tooltip:d.tooltip,iconPathBefore:"iconPathBefore"in d?d.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in d?d.iconPathAfter:void 0,hasDivider:f,allowForLeadingIcons:a}),[c]=i;if(!c)return x.jsx("div",{});const u=c.item.group;return x.jsx("div",{role:"menu","aria-label":u,children:i.map((d,f)=>{const{item:p}=d,b=l(d);if("command"in p){const v=p.group+f;return x.jsx(eo,{onClick:g=>{n==null||n(g),r(p)},...b},v)}return x.jsx(Ep,{parentMenuItem:p,parentItemProps:b,...e},u+p.id)})},u)}function kp(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([a,l])=>({id:a,group:l})).filter(a=>"column"in a.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(a=>"column"in a.group&&a.group.column===n)),x.jsx(to,{...e,includedGroups:i})}function Op({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return x.jsxs(de.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[x.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),x.jsx(de.List,{id:n,dense:!0,className:i??"",children:x.jsx(kp,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Es({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=Q.useMemo(()=>{const a=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,u=o[c];typeof u=="object"&&typeof u.order=="number"&&!Number.isNaN(u.order)?a.set(u.order,{id:c,metadata:u}):console.warn(`Property ${l} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(a.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return x.jsx(de.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((a,l)=>x.jsx(Op,{commandHandler:e,menuDefinition:n,...a,className:t},l))})}const Ts=E.createContext({});process.env.NODE_ENV!=="production"&&(Ts.displayName="ListContext");const Sp=Ts;function Cp(e){return He("MuiList",e)}it("MuiList",["root","padding","dense","subheader"]);const Pp=["children","className","component","dense","disablePadding","subheader"],Rp=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return et({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},Cp,t)},Np=Te("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>k({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),ks=E.forwardRef(function(t,n){const r=tt({props:t,name:"MuiList"}),{children:o,className:i,component:a="ul",dense:l=!1,disablePadding:c=!1,subheader:u}=r,d=ue(r,Pp),f=E.useMemo(()=>({dense:l}),[l]),p=k({},r,{component:a,dense:l,disablePadding:c}),b=Rp(p);return x.jsx(Sp.Provider,{value:f,children:x.jsxs(Np,k({as:a,className:we(b.root,i),ref:n,ownerState:p},d,{children:[u,o]}))})});process.env.NODE_ENV!=="production"&&(ks.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,dense:s.bool,disablePadding:s.bool,subheader:s.node,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const $p=ks,Mp=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function hr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function ui(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function Os(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function Kt(e,t,n,r,o,i){let a=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(a)return!1;a=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!Os(l,i)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const Ss=E.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:a,className:l,disabledItemsFocusable:c=!1,disableListWrap:u=!1,onKeyDown:d,variant:f="selectedMenu"}=t,p=ue(t,Mp),b=E.useRef(null),v=E.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});bt(()=>{o&&b.current.focus()},[o]),E.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(y,w)=>{const m=!b.current.style.width;if(y.clientHeight<b.current.clientHeight&&m){const C=`${Bi(Ee(y))}px`;b.current.style[w.direction==="rtl"?"paddingLeft":"paddingRight"]=C,b.current.style.width=`calc(100% + ${C})`}return b.current}}),[]);const g=y=>{const w=b.current,m=y.key,C=Ee(w).activeElement;if(m==="ArrowDown")y.preventDefault(),Kt(w,C,u,c,hr);else if(m==="ArrowUp")y.preventDefault(),Kt(w,C,u,c,ui);else if(m==="Home")y.preventDefault(),Kt(w,null,u,c,hr);else if(m==="End")y.preventDefault(),Kt(w,null,u,c,ui);else if(m.length===1){const P=v.current,j=m.toLowerCase(),I=performance.now();P.keys.length>0&&(I-P.lastTime>500?(P.keys=[],P.repeating=!0,P.previousKeyMatched=!0):P.repeating&&j!==P.keys[0]&&(P.repeating=!1)),P.lastTime=I,P.keys.push(j);const A=C&&!P.repeating&&Os(C,P);P.previousKeyMatched&&(A||Kt(w,C,!1,c,hr,P))?y.preventDefault():P.previousKeyMatched=!1}d&&d(y)},h=De(b,n);let T=-1;E.Children.forEach(a,(y,w)=>{if(!E.isValidElement(y)){T===w&&(T+=1,T>=a.length&&(T=-1));return}process.env.NODE_ENV!=="production"&&$n.isFragment(y)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),y.props.disabled||(f==="selectedMenu"&&y.props.selected||T===-1)&&(T=w),T===w&&(y.props.disabled||y.props.muiSkipListHighlight||y.type.muiSkipListHighlight)&&(T+=1,T>=a.length&&(T=-1))});const S=E.Children.map(a,(y,w)=>{if(w===T){const m={};return i&&(m.autoFocus=!0),y.props.tabIndex===void 0&&f==="selectedMenu"&&(m.tabIndex=0),E.cloneElement(y,m)}return y});return x.jsx($p,k({role:"menu",ref:h,className:l,onKeyDown:g,tabIndex:o?0:-1},p,{children:S}))});process.env.NODE_ENV!=="production"&&(Ss.propTypes={autoFocus:s.bool,autoFocusItem:s.bool,children:s.node,className:s.string,disabledItemsFocusable:s.bool,disableListWrap:s.bool,onKeyDown:s.func,variant:s.oneOf(["menu","selectedMenu"])});const _p=Ss,Ip=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],jp={entering:{opacity:1},entered:{opacity:1}},Cs=E.forwardRef(function(t,n){const r=bn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:a=!0,children:l,easing:c,in:u,onEnter:d,onEntered:f,onEntering:p,onExit:b,onExited:v,onExiting:g,style:h,timeout:T=o,TransitionComponent:S=fs}=t,y=ue(t,Ip),w=E.useRef(null),m=De(w,l.ref,n),C=L=>_=>{if(L){const N=w.current;_===void 0?L(N):L(N,_)}},P=C(p),j=C((L,_)=>{hs(L);const N=Bn({style:h,timeout:T,easing:c},{mode:"enter"});L.style.webkitTransition=r.transitions.create("opacity",N),L.style.transition=r.transitions.create("opacity",N),d&&d(L,_)}),I=C(f),A=C(g),B=C(L=>{const _=Bn({style:h,timeout:T,easing:c},{mode:"exit"});L.style.webkitTransition=r.transitions.create("opacity",_),L.style.transition=r.transitions.create("opacity",_),b&&b(L)}),z=C(v),W=L=>{i&&i(w.current,L)};return x.jsx(S,k({appear:a,in:u,nodeRef:w,onEnter:j,onEntered:I,onEntering:P,onExit:B,onExited:z,onExiting:A,addEndListener:W,timeout:T},y,{children:(L,_)=>E.cloneElement(l,k({style:k({opacity:0,visibility:L==="exited"&&!u?"hidden":void 0},jp[L],h,l.props.style),ref:m},_))}))});process.env.NODE_ENV!=="production"&&(Cs.propTypes={addEndListener:s.func,appear:s.bool,children:dn.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const Ap=Cs;function Dp(e){return He("MuiBackdrop",e)}it("MuiBackdrop",["root","invisible"]);const Bp=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Lp=e=>{const{classes:t,invisible:n}=e;return et({root:["root",n&&"invisible"]},Dp,t)},Fp=Te("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>k({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),Ps=E.forwardRef(function(t,n){var r,o,i;const a=tt({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:u="div",components:d={},componentsProps:f={},invisible:p=!1,open:b,slotProps:v={},slots:g={},TransitionComponent:h=Ap,transitionDuration:T}=a,S=ue(a,Bp),y=k({},a,{component:u,invisible:p}),w=Lp(y),m=(r=v.root)!=null?r:f.root;return x.jsx(h,k({in:b,timeout:T},S,{children:x.jsx(Fp,k({"aria-hidden":!0},m,{as:(o=(i=g.root)!=null?i:d.Root)!=null?o:u,className:we(w.root,c,m==null?void 0:m.className),ownerState:k({},y,m==null?void 0:m.ownerState),classes:w,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(Ps.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.object}),invisible:s.bool,open:s.bool.isRequired,slotProps:s.shape({root:s.object}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const Vp=Ps;function zp(e){return He("MuiModal",e)}it("MuiModal",["root","hidden","backdrop"]);const Up=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],qp=e=>{const{open:t,exited:n,classes:r}=e;return et({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},zp,r)},Hp=Te("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>k({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Wp=Te(Vp,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Rs=E.forwardRef(function(t,n){var r,o,i,a,l,c;const u=tt({name:"MuiModal",props:t}),{BackdropComponent:d=Wp,BackdropProps:f,className:p,closeAfterTransition:b=!1,children:v,container:g,component:h,components:T={},componentsProps:S={},disableAutoFocus:y=!1,disableEnforceFocus:w=!1,disableEscapeKeyDown:m=!1,disablePortal:C=!1,disableRestoreFocus:P=!1,disableScrollLock:j=!1,hideBackdrop:I=!1,keepMounted:A=!1,onBackdropClick:B,open:z,slotProps:W,slots:L}=u,_=ue(u,Up),N=k({},u,{closeAfterTransition:b,disableAutoFocus:y,disableEnforceFocus:w,disableEscapeKeyDown:m,disablePortal:C,disableRestoreFocus:P,disableScrollLock:j,hideBackdrop:I,keepMounted:A}),{getRootProps:D,getBackdropProps:ee,getTransitionProps:Z,portalRef:O,isTopModal:M,exited:V,hasTransition:K}=jl(k({},N,{rootRef:n})),F=k({},N,{exited:V}),U=qp(F),H={};if(v.props.tabIndex===void 0&&(H.tabIndex="-1"),K){const{onEnter:J,onExited:R}=Z();H.onEnter=J,H.onExited=R}const G=(r=(o=L==null?void 0:L.root)!=null?o:T.Root)!=null?r:Hp,q=(i=(a=L==null?void 0:L.backdrop)!=null?a:T.Backdrop)!=null?i:d,X=(l=W==null?void 0:W.root)!=null?l:S.root,Y=(c=W==null?void 0:W.backdrop)!=null?c:S.backdrop,re=vt({elementType:G,externalSlotProps:X,externalForwardedProps:_,getSlotProps:D,additionalProps:{ref:n,as:h},ownerState:F,className:we(p,X==null?void 0:X.className,U==null?void 0:U.root,!F.open&&F.exited&&(U==null?void 0:U.hidden))}),$=vt({elementType:q,externalSlotProps:Y,additionalProps:f,getSlotProps:J=>ee(k({},J,{onClick:R=>{B&&B(R),J!=null&&J.onClick&&J.onClick(R)}})),className:we(Y==null?void 0:Y.className,f==null?void 0:f.className,U==null?void 0:U.backdrop),ownerState:F});return!A&&!z&&(!K||V)?null:x.jsx(on,{ref:O,container:g,disablePortal:C,children:x.jsxs(G,k({},re,{children:[!I&&d?x.jsx(q,k({},$)):null,x.jsx(_n,{disableEnforceFocus:w,disableAutoFocus:y,disableRestoreFocus:P,isEnabled:M,open:z,children:E.cloneElement(v,H)})]}))})});process.env.NODE_ENV!=="production"&&(Rs.propTypes={BackdropComponent:s.elementType,BackdropProps:s.object,children:dn.isRequired,classes:s.object,className:s.string,closeAfterTransition:s.bool,component:s.elementType,components:s.shape({Backdrop:s.elementType,Root:s.elementType}),componentsProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Ye,s.func]),disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableEscapeKeyDown:s.bool,disablePortal:s.bool,disableRestoreFocus:s.bool,disableScrollLock:s.bool,hideBackdrop:s.bool,keepMounted:s.bool,onBackdropClick:s.func,onClose:s.func,onTransitionEnter:s.func,onTransitionExited:s.func,open:s.bool.isRequired,slotProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({backdrop:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const Gp=Rs;function Kp(e){return He("MuiPaper",e)}it("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Xp=["className","component","elevation","square","variant"],Yp=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return et(i,Kp,o)},Jp=Te("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return k({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&k({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${Dn("#fff",ii(t.elevation))}, ${Dn("#fff",ii(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Ns=E.forwardRef(function(t,n){const r=tt({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:a=1,square:l=!1,variant:c="elevation"}=r,u=ue(r,Xp),d=k({},r,{component:i,elevation:a,square:l,variant:c}),f=Yp(d);return process.env.NODE_ENV!=="production"&&bn().shadows[a]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)),x.jsx(Jp,k({as:i,ownerState:d,className:we(f.root,o),ref:n},u))});process.env.NODE_ENV!=="production"&&(Ns.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,elevation:Bt(Vi,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:s.bool,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),variant:s.oneOfType([s.oneOf(["elevation","outlined"]),s.string])});const Zp=Ns;function Qp(e){return He("MuiPopover",e)}it("MuiPopover",["root","paper"]);const ef=["onEntering"],tf=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],nf=["slotProps"];function di(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function pi(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function fi(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function Rn(e){return typeof e=="function"?e():e}const rf=e=>{const{classes:t}=e;return et({root:["root"],paper:["paper"]},Qp,t)},of=Te(Gp,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),$s=Te(Zp,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Ms=E.forwardRef(function(t,n){var r,o,i;const a=tt({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:u={vertical:"top",horizontal:"left"},anchorPosition:d,anchorReference:f="anchorEl",children:p,className:b,container:v,elevation:g=8,marginThreshold:h=16,open:T,PaperProps:S={},slots:y,slotProps:w,transformOrigin:m={vertical:"top",horizontal:"left"},TransitionComponent:C=Rr,transitionDuration:P="auto",TransitionProps:{onEntering:j}={},disableScrollLock:I=!1}=a,A=ue(a.TransitionProps,ef),B=ue(a,tf),z=(r=w==null?void 0:w.paper)!=null?r:S,W=E.useRef(),L=De(W,z.ref),_=k({},a,{anchorOrigin:u,anchorReference:f,elevation:g,marginThreshold:h,externalPaperSlotProps:z,transformOrigin:m,TransitionComponent:C,transitionDuration:P,TransitionProps:A}),N=rf(_),D=E.useCallback(()=>{if(f==="anchorPosition")return process.env.NODE_ENV!=="production"&&(d||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),d;const J=Rn(c),R=J&&J.nodeType===1?J:Ee(W.current).body,oe=R.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const ye=R.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ye.top===0&&ye.left===0&&ye.right===0&&ye.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:oe.top+di(oe,u.vertical),left:oe.left+pi(oe,u.horizontal)}},[c,u.horizontal,u.vertical,d,f]),ee=E.useCallback(J=>({vertical:di(J,m.vertical),horizontal:pi(J,m.horizontal)}),[m.horizontal,m.vertical]),Z=E.useCallback(J=>{const R={width:J.offsetWidth,height:J.offsetHeight},oe=ee(R);if(f==="none")return{top:null,left:null,transformOrigin:fi(oe)};const ye=D();let ke=ye.top-oe.vertical,me=ye.left-oe.horizontal;const lt=ke+R.height,Oe=me+R.width,We=Mt(Rn(c)),Re=We.innerHeight-h,Ge=We.innerWidth-h;if(h!==null&&ke<h){const xe=ke-h;ke-=xe,oe.vertical+=xe}else if(h!==null&&lt>Re){const xe=lt-Re;ke-=xe,oe.vertical+=xe}if(process.env.NODE_ENV!=="production"&&R.height>Re&&R.height&&Re&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${R.height-Re}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),h!==null&&me<h){const xe=me-h;me-=xe,oe.horizontal+=xe}else if(Oe>Ge){const xe=Oe-Ge;me-=xe,oe.horizontal+=xe}return{top:`${Math.round(ke)}px`,left:`${Math.round(me)}px`,transformOrigin:fi(oe)}},[c,f,D,ee,h]),[O,M]=E.useState(T),V=E.useCallback(()=>{const J=W.current;if(!J)return;const R=Z(J);R.top!==null&&(J.style.top=R.top),R.left!==null&&(J.style.left=R.left),J.style.transformOrigin=R.transformOrigin,M(!0)},[Z]);E.useEffect(()=>(I&&window.addEventListener("scroll",V),()=>window.removeEventListener("scroll",V)),[c,I,V]);const K=(J,R)=>{j&&j(J,R),V()},F=()=>{M(!1)};E.useEffect(()=>{T&&V()}),E.useImperativeHandle(l,()=>T?{updatePosition:()=>{V()}}:null,[T,V]),E.useEffect(()=>{if(!T)return;const J=Ii(()=>{V()}),R=Mt(c);return R.addEventListener("resize",J),()=>{J.clear(),R.removeEventListener("resize",J)}},[c,T,V]);let U=P;P==="auto"&&!C.muiSupportAuto&&(U=void 0);const H=v||(c?Ee(Rn(c)).body:void 0),G=(o=y==null?void 0:y.root)!=null?o:of,q=(i=y==null?void 0:y.paper)!=null?i:$s,X=vt({elementType:q,externalSlotProps:k({},z,{style:O?z.style:k({},z.style,{opacity:0})}),additionalProps:{elevation:g,ref:L},ownerState:_,className:we(N.paper,z==null?void 0:z.className)}),Y=vt({elementType:G,externalSlotProps:(w==null?void 0:w.root)||{},externalForwardedProps:B,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:H,open:T},ownerState:_,className:we(N.root,b)}),{slotProps:re}=Y,$=ue(Y,nf);return x.jsx(G,k({},$,!Hi(G)&&{slotProps:re,disableScrollLock:I},{children:x.jsx(C,k({appear:!0,in:T,onEntering:K,onExited:F,timeout:U},A,{children:x.jsx(q,k({},X,{children:p}))}))}))});process.env.NODE_ENV!=="production"&&(Ms.propTypes={action:jr,anchorEl:Bt(s.oneOfType([Ye,s.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=Rn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),anchorPosition:s.shape({left:s.number.isRequired,top:s.number.isRequired}),anchorReference:s.oneOf(["anchorEl","anchorPosition","none"]),children:s.node,classes:s.object,className:s.string,container:s.oneOfType([Ye,s.func]),disableScrollLock:s.bool,elevation:Vi,marginThreshold:s.number,onClose:s.func,open:s.bool.isRequired,PaperProps:s.shape({component:ja}),slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transformOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object});const sf=Ms;function af(e){return He("MuiMenu",e)}it("MuiMenu",["root","paper","list"]);const lf=["onEntering"],cf=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],uf={vertical:"top",horizontal:"right"},df={vertical:"top",horizontal:"left"},pf=e=>{const{classes:t}=e;return et({root:["root"],paper:["paper"],list:["list"]},af,t)},ff=Te(sf,{shouldForwardProp:e=>ds(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),hf=Te($s,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),mf=Te(_p,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),_s=E.forwardRef(function(t,n){var r,o;const i=tt({props:t,name:"MuiMenu"}),{autoFocus:a=!0,children:l,className:c,disableAutoFocusItem:u=!1,MenuListProps:d={},onClose:f,open:p,PaperProps:b={},PopoverClasses:v,transitionDuration:g="auto",TransitionProps:{onEntering:h}={},variant:T="selectedMenu",slots:S={},slotProps:y={}}=i,w=ue(i.TransitionProps,lf),m=ue(i,cf),C=bn(),P=C.direction==="rtl",j=k({},i,{autoFocus:a,disableAutoFocusItem:u,MenuListProps:d,onEntering:h,PaperProps:b,transitionDuration:g,TransitionProps:w,variant:T}),I=pf(j),A=a&&!u&&p,B=E.useRef(null),z=(Z,O)=>{B.current&&B.current.adjustStyleForScrollbar(Z,C),h&&h(Z,O)},W=Z=>{Z.key==="Tab"&&(Z.preventDefault(),f&&f(Z,"tabKeyDown"))};let L=-1;E.Children.map(l,(Z,O)=>{E.isValidElement(Z)&&(process.env.NODE_ENV!=="production"&&$n.isFragment(Z)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Z.props.disabled||(T==="selectedMenu"&&Z.props.selected||L===-1)&&(L=O))});const _=(r=S.paper)!=null?r:hf,N=(o=y.paper)!=null?o:b,D=vt({elementType:S.root,externalSlotProps:y.root,ownerState:j,className:[I.root,c]}),ee=vt({elementType:_,externalSlotProps:N,ownerState:j,className:I.paper});return x.jsx(ff,k({onClose:f,anchorOrigin:{vertical:"bottom",horizontal:P?"right":"left"},transformOrigin:P?uf:df,slots:{paper:_,root:S.root},slotProps:{root:D,paper:ee},open:p,ref:n,transitionDuration:g,TransitionProps:k({onEntering:z},w),ownerState:j},m,{classes:v,children:x.jsx(mf,k({onKeyDown:W,actions:B,autoFocus:a&&(L===-1||u),autoFocusItem:A,variant:T},d,{className:we(I.list,d.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(_s.propTypes={anchorEl:s.oneOfType([Ye,s.func]),autoFocus:s.bool,children:s.node,classes:s.object,className:s.string,disableAutoFocusItem:s.bool,MenuListProps:s.object,onClose:s.func,open:s.bool.isRequired,PaperProps:s.object,PopoverClasses:s.object,slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object,variant:s.oneOf(["menu","selectedMenu"])});const gf=_s;function bf({className:e,commandHandler:t,menuDefinition:n,children:r}){var u;const[o,i]=Q.useState(void 0),a=Q.useCallback(d=>{d.preventDefault(),i(o===void 0?{mouseX:d.clientX+2,mouseY:d.clientY-6}:void 0)},[o]),l=Q.useCallback(()=>{i(void 0)},[]),c=Q.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((u=n==null?void 0:n.items)==null?void 0:u.length)??0)===0||!r?r:x.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:a,children:[r,x.jsx(gf,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:x.jsx(to,{menuDefinition:n,commandHandler:t,onClick:l})})]})}const vf=ys(x.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function yf(e){return{preserveValue:!0,...e}}const Ln=(e,t,n={})=>{const r=Q.useRef(t);r.current=t;const o=Q.useRef(n);o.current=yf(o.current);const[i,a]=Q.useState(()=>r.current),[l,c]=Q.useState(!0);return Q.useEffect(()=>{let u=!0;return c(!!e),(async()=>{if(e){const d=await e();u&&(a(()=>d),c(!1))}})(),()=>{u=!1,o.current.preserveValue||a(()=>r.current)}},[e]),[i,l]};function Is({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:i,ariaLabelPrefix:a,children:l}){const[c,u]=Q.useState(!1),[d,f]=Q.useState(!1),p=Q.useCallback(()=>{c&&u(!1),f(!1)},[c]),b=Q.useCallback(w=>{w.stopPropagation(),u(m=>{const C=!m;return C&&w.shiftKey?f(!0):C||f(!1),C})},[]),v=Q.useCallback(w=>(p(),r(w)),[r,p]),[g,h]=Q.useState({top:1,left:1});Q.useEffect(()=>{if(c){const w=o==null?void 0:o.current;if(w){const m=w.getBoundingClientRect(),C=window.scrollY,P=window.scrollX,j=m.top+C+w.clientHeight,I=m.left+P;h({top:j,left:I})}}},[c,o]);const[T]=Ln(Q.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[S]=Ln(Q.useCallback(async()=>(e==null?void 0:e(!0))??n??T,[e,n,T,c]),n??T),y=d&&S?S:T;return x.jsxs(x.Fragment,{children:[x.jsx(de.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${i??""}`,color:"inherit","aria-label":`${a??""} menu button`,onClick:b,children:l??x.jsx(vf,{})}),x.jsx(de.Drawer,{className:`papi-menu-drawer ${i??""}`,anchor:"left",variant:"temporary",open:c,onClose:p,PaperProps:{className:"papi-menu-drawer-paper",style:{top:g.top,left:g.left}},children:y?x.jsx(Es,{className:i,id:`${a??""} main menu`,commandHandler:v,multiColumnMenu:y}):void 0})]})}function xf({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:a="medium",className:l,onClick:c,children:u}){return x.jsx(de.IconButton,{id:e,disabled:n,edge:i,size:a,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:u})}function cn({variant:e="outlined",id:t,isDisabled:n=!1,hasError:r=!1,isFullWidth:o=!1,helperText:i,label:a,placeholder:l,isRequired:c=!1,className:u,defaultValue:d,value:f,onChange:p,onFocus:b,onBlur:v}){return x.jsx(de.TextField,{variant:e,id:t,disabled:n,error:r,fullWidth:o,helperText:i,label:a,placeholder:l,required:c,className:`papi-textfield ${u??""}`,defaultValue:d,value:f,onChange:p,onFocus:b,onBlur:v})}let mr;const gr=()=>(mr||(mr=ge.allBookIds.map(e=>({bookId:e,label:ge.bookIdToEnglishName(e)}))),mr);function wf({scrRef:e,handleSubmit:t,id:n}){const r=c=>{t(c)},o=(c,u)=>{const f={bookNum:ge.bookIdToNumber(u.bookId),chapterNum:1,verseNum:1};r(f)},i=c=>{t({...e,chapterNum:+c.target.value})},a=c=>{t({...e,verseNum:+c.target.value})},l=Q.useMemo(()=>gr()[e.bookNum-1],[e.bookNum]);return x.jsxs("span",{id:n,children:[x.jsx(Nn,{title:"Book",className:"papi-ref-selector book",value:l,options:gr(),onChange:o,isClearable:!1,width:200}),x.jsx(ut,{onClick:()=>r(Ve.offsetBook(e,-1)),isDisabled:e.bookNum<=Ve.FIRST_SCR_BOOK_NUM,children:"<"}),x.jsx(ut,{onClick:()=>r(Ve.offsetBook(e,1)),isDisabled:e.bookNum>=gr().length,children:">"}),x.jsx(cn,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),x.jsx(ut,{onClick:()=>t(Ve.offsetChapter(e,-1)),isDisabled:e.chapterNum<=Ve.FIRST_SCR_CHAPTER_NUM,children:"<"}),x.jsx(ut,{onClick:()=>t(Ve.offsetChapter(e,1)),isDisabled:e.chapterNum>=Ve.getChaptersForBook(e.bookNum),children:">"}),x.jsx(cn,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:a}),x.jsx(ut,{onClick:()=>t(Ve.offsetVerse(e,-1)),isDisabled:e.verseNum<=Ve.FIRST_SCR_VERSE_NUM,children:"<"}),x.jsx(ut,{onClick:()=>t(Ve.offsetVerse(e,1)),children:">"})]})}function Ef({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=Q.useState(""),i=a=>{o(a),e(a)};return x.jsx(de.Paper,{component:"form",className:"search-bar-paper",children:x.jsx(cn,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:a=>i(a.target.value)})})}function Tf({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:a=!1,defaultValue:l,value:c,valueLabelDisplay:u="off",className:d,onChange:f,onChangeCommitted:p}){return x.jsx(de.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:a,defaultValue:l,value:c,valueLabelDisplay:u,className:`papi-slider ${n} ${d??""}`,onChange:f,onChangeCommitted:p})}function kf({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:a,children:l}){const c={action:(a==null?void 0:a.action)||l,message:a==null?void 0:a.message,className:r};return x.jsx(de.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:c})}function Of({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return x.jsx(de.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function hi({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return x.jsx(cn,{defaultValue:t[n.key],onChange:r})}const Sf=({onChange:e,disabled:t,checked:n,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return x.jsx(Si,{...r,isChecked:n,isDisabled:t,onChange:o})};function Cf({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:a,defaultColumnSortable:l=!0,defaultColumnResizable:c=!0,rows:u,enableSelectColumn:d,selectColumnWidth:f=50,rowKeyGetter:p,rowHeight:b=35,headerRowHeight:v=35,selectedRows:g,onSelectedRowsChange:h,onRowsChange:T,onCellClick:S,onCellDoubleClick:y,onCellContextMenu:w,onCellKeyDown:m,direction:C="ltr",enableVirtualization:P=!0,onCopy:j,onPaste:I,onScroll:A,className:B,"data-testid":z}){const W=Q.useMemo(()=>{const L=e.map(_=>typeof _.editable=="function"?{..._,editable:D=>!!_.editable(D),renderEditCell:_.renderEditCell||hi}:_.editable&&!_.renderEditCell?{..._,renderEditCell:hi}:_.renderEditCell&&!_.editable?{..._,editable:!1}:_);return d?[{...bo.SelectColumn,minWidth:f},...L]:L},[e,d,f]);return x.jsx(bo,{columns:W,defaultColumnOptions:{width:o,minWidth:i,maxWidth:a,sortable:l,resizable:c},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:u,rowKeyGetter:p,rowHeight:b,headerRowHeight:v,selectedRows:g,onSelectedRowsChange:h,onRowsChange:T,onCellClick:S,onCellDoubleClick:y,onCellContextMenu:w,onCellKeyDown:m,direction:C,enableVirtualization:P,onCopy:j,onPaste:I,onScroll:A,renderers:{renderCheckbox:Sf},className:`papi-table ${B??"rdg-light"}`,"data-testid":z})}function Pf({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const i=Q.useRef(void 0);return x.jsx("div",{ref:i,style:{position:"relative"},children:x.jsx(de.AppBar,{position:"static",id:r,children:x.jsxs(de.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?x.jsx(Is,{commandHandler:t,containerRef:i,menuProvider:e}):void 0,o?x.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Rf=(e,t)=>{Q.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},br=()=>!1,Nf=(e,t)=>{const[n]=Ln(Q.useCallback(async()=>{if(!e)return br;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),br,{preserveValue:!1});Q.useEffect(()=>()=>{n!==br&&n()},[n])};exports.BookChapterControl=ya;exports.Button=ut;exports.ChapterRangeSelector=xa;exports.Checkbox=Si;exports.ComboBox=Nn;exports.ContextMenu=bf;exports.GridMenu=Es;exports.HamburgerMenuButton=Is;exports.IconButton=xf;exports.LabelPosition=ft;exports.MenuItem=eo;exports.RefSelector=wf;exports.SearchBar=Ef;exports.Slider=Tf;exports.Snackbar=kf;exports.Switch=Of;exports.Table=Cf;exports.TextField=cn;exports.Toolbar=Pf;exports.useEvent=Rf;exports.useEventAsync=Nf;exports.usePromise=Ln;function $f(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}$f(`body {
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
}

.menu-label {
  color: #334155;
  font-weight: 600;
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
.papi-button {
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
}
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
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
.chapter-select {
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
}

.mlln6zg7-0-0-beta-42 {
  @layer rdg.MeasuringCell {
    contain: strict;
    grid-row: 1;
    visibility: hidden;
  }
}


.cj343x07-0-0-beta-42 {
  @layer rdg.Cell {
    /* max-content does not work with size containment
     * dynamically switching between different containment styles incurs a heavy relayout penalty
     * Chromium bug: at odd zoom levels or subpixel positioning,
     * layout/paint/style containment can make cell borders disappear
     *   https://bugs.chromium.org/p/chromium/issues/detail?id=1326946
     */
    position: relative; /* needed for absolute positioning to work */
    padding-block: 0;
    padding-inline: 8px;
    border-inline-end: 1px solid var(--rdg-border-color);
    border-block-end: 1px solid var(--rdg-border-color);
    grid-row-start: var(--rdg-grid-row-start);
    background-color: inherit;

    white-space: nowrap;
    overflow: clip;
    text-overflow: ellipsis;
    outline: none;

    &[aria-selected='true'] {
      outline: 2px solid var(--rdg-selection-color);
      outline-offset: -2px;
    }
  }
}

.csofj7r7-0-0-beta-42 {
  @layer rdg.Cell {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1;
  }
}

.ch2wcw87-0-0-beta-42 {
  @layer rdg.Cell {
    box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3);
  }
}


.c1bn88vv7-0-0-beta-42 {
  @layer rdg.CheckboxLabel {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    margin-inline-end: 1px; /* align checkbox in row group cell */
  }
}

.c1qt073l7-0-0-beta-42 {
  @layer rdg.CheckboxInput {
    all: unset;
  }
}

.cf71kmq7-0-0-beta-42 {
  @layer rdg.CheckboxIcon {
    content: '';
    inline-size: 20px;
    block-size: 20px;
    border: 2px solid var(--rdg-border-color);
    background-color: var(--rdg-background-color);

    .c1qt073l7-0-0-beta-42:checked + & {
      background-color: var(--rdg-checkbox-color);
      outline: 4px solid var(--rdg-background-color);
      outline-offset: -6px;
    }

    .c1qt073l7-0-0-beta-42:focus + & {
      border-color: var(--rdg-checkbox-focus-color);
    }
  }
}

.c1lwve4p7-0-0-beta-42 {
  @layer rdg.CheckboxLabel {
    cursor: default;

    .cf71kmq7-0-0-beta-42 {
      border-color: var(--rdg-checkbox-disabled-border-color);
      background-color: var(--rdg-checkbox-disabled-background-color);
    }
  }
}


.g1s9ylgp7-0-0-beta-42 {
  @layer rdg.GroupCellContent {
    outline: none;
  }
}

.cz54e4y7-0-0-beta-42 {
  @layer rdg.GroupCellCaret {
    margin-inline-start: 4px;
    stroke: currentColor;
    stroke-width: 1.5px;
    fill: transparent;
    vertical-align: middle;

    > path {
      transition: d 0.1s;
    }
  }
}


.c1w9bbhr7-0-0-beta-42 {
  @layer rdg.DragHandle {
    --rdg-drag-handle-size: 8px;
    z-index: 0;
    cursor: move;
    inline-size: var(--rdg-drag-handle-size);
    block-size: var(--rdg-drag-handle-size);
    background-color: var(--rdg-selection-color);
    place-self: end;

    &:hover {
      --rdg-drag-handle-size: 16px;
      border: 2px solid var(--rdg-selection-color);
      background-color: var(--rdg-background-color);
    }
  }
}

.c1creorc7-0-0-beta-42 {
  @layer rdg.DragHandle {
    z-index: 1;
    position: sticky;
  }
}


.cis5rrm7-0-0-beta-42 {
  @layer rdg.EditCell {
    padding: 0;
  }
}


.h44jtk67-0-0-beta-42 {
  @layer rdg.SortableHeaderCell {
    display: flex;
  }
}

.hcgkhxz7-0-0-beta-42 {
  @layer rdg.SortableHeaderCellName {
    flex-grow: 1;
    overflow: clip;
    text-overflow: ellipsis;
  }
}


.c6l2wv17-0-0-beta-42 {
  @layer rdg.HeaderCell {
    cursor: pointer;
  }
}

.c1kqdw7y7-0-0-beta-42 {
  @layer rdg.HeaderCell {
    touch-action: none;
  }
}

.r1y6ywlx7-0-0-beta-42 {
  @layer rdg.HeaderCell {
    cursor: col-resize;
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    inset-block-end: 0;
    inline-size: 10px;
  }
}

.c1bezg5o7-0-0-beta-42 {
  opacity: 0.5;
}

.c1vc96037-0-0-beta-42 {
  background-color: var(--rdg-header-draggable-background-color);
}


.r1upfr807-0-0-beta-42 {
  @layer rdg.Row {
    display: contents;
    line-height: var(--rdg-row-height);
    background-color: var(--rdg-background-color);

    &:hover {
      background-color: var(--rdg-row-hover-background-color);
    }

    &[aria-selected='true'] {
      background-color: var(--rdg-row-selected-background-color);

      &:hover {
        background-color: var(--rdg-row-selected-hover-background-color);
      }
    }
  }
}

.r190mhd37-0-0-beta-42 {
  @layer rdg.FocusSink {
    outline: 2px solid var(--rdg-selection-color);
    outline-offset: -2px;
  }
}

.r139qu9m7-0-0-beta-42 {
  @layer rdg.FocusSink {
    &::before {
      content: '';
      display: inline-block;
      height: 100%;
      position: sticky;
      inset-inline-start: 0;
      border-inline-start: 2px solid var(--rdg-selection-color);
    }
  }
}


.h10tskcx7-0-0-beta-42 {
  @layer rdg.HeaderRow {
    display: contents;
    line-height: var(--rdg-header-row-height);
    background-color: var(--rdg-header-background-color);
    font-weight: bold;

    & > .cj343x07-0-0-beta-42 {
      /* Should have a higher value than 1 to show up above regular cells and the focus sink */
      z-index: 2;
      position: sticky;
    }

    & > .csofj7r7-0-0-beta-42 {
      z-index: 3;
    }
  }
}


.c6ra8a37-0-0-beta-42 {
  @layer rdg.Cell {
    background-color: #ccccff;
  }
}

.cq910m07-0-0-beta-42 {
  @layer rdg.Cell {
    background-color: #ccccff;

    &.c6ra8a37-0-0-beta-42 {
      background-color: #9999ff;
    }
  }
}


.a3ejtar7-0-0-beta-42 {
  @layer rdg.SortIcon {
    fill: currentColor;

    > path {
      transition: d 0.1s;
    }
  }
}


.rnvodz57-0-0-beta-42 {
  @layer rdg.Defaults {
    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
  }

  @layer rdg.Root {
    --rdg-color: #000;   --rdg-border-color: #ddd;   --rdg-summary-border-color: #aaa;   --rdg-background-color: hsl(0deg 0% 100%);   --rdg-header-background-color: hsl(0deg 0% 97.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 90.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 96%);   --rdg-row-selected-background-color: hsl(207deg 76% 92%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 88%);   --rdg-checkbox-color: hsl(207deg 100% 29%);   --rdg-checkbox-focus-color: hsl(207deg 100% 69%);   --rdg-checkbox-disabled-border-color: #ccc;   --rdg-checkbox-disabled-background-color: #ddd;
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
    font-size: var(--rdg-font-size);

    /* needed on Firefox to fix scrollbars */
    &::before {
      content: '';
      grid-column: 1/-1;
      grid-row: 1/-1;
    }

    &.rdg-dark {
      --rdg-color-scheme: dark;
      --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 17.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
    }

    &.rdg-light {
      --rdg-color-scheme: light;
    }

    @media (prefers-color-scheme: dark) {
      &:not(.rdg-light) {
        --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 17.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
      }
    }
  }
}

.vlqv91k7-0-0-beta-42 {
  @layer rdg.Root {
    user-select: none;

    & .r1upfr807-0-0-beta-42 {
      cursor: move;
    }
  }
}

.f1lsfrzw7-0-0-beta-42 {
  @layer rdg.FocusSink {
    grid-column: 1/-1;
    pointer-events: none;
    /* Should have a higher value than 1 to show up above regular frozen cells */
    z-index: 1;
  }
}

.f1cte0lg7-0-0-beta-42 {
  @layer rdg.FocusSink {
    /* Should have a higher value than 3 to show up above header and summary rows */
    z-index: 3;
  }
}


.s8wc6fl7-0-0-beta-42 {
  @layer rdg.SummaryCell {
    inset-block-start: var(--rdg-summary-row-top);
    inset-block-end: var(--rdg-summary-row-bottom);
  }
}


.skuhp557-0-0-beta-42 {
  @layer rdg.SummaryRow {
    line-height: var(--rdg-summary-row-height);

    > .cj343x07-0-0-beta-42 {
      position: sticky;
    }
  }
}

.tf8l5ub7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      z-index: 2;
    }

    > .csofj7r7-0-0-beta-42 {
      z-index: 3;
    }
  }
}

.tb9ughf7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
  }
}

.b1yssfnt7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      border-block-start: 2px solid var(--rdg-summary-border-color);
    }
  }
}


.g1yxluv37-0-0-beta-42 {
  @layer rdg.GroupedRow {
    &:not([aria-selected='true']) {
      background-color: var(--rdg-header-background-color);
    }

    > .cj343x07-0-0-beta-42:not(:last-child):not(.ch2wcw87-0-0-beta-42) {
      border-inline-end: none;
    }
  }
}


.t7vyx3i7-0-0-beta-42 {
  @layer rdg.TextEditor {
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
    font-size: var(--rdg-font-size);

    &:focus {
      border-color: var(--rdg-selection-color);
      outline: none;
    }

    &::placeholder {
      color: #999;
      opacity: 1;
    }
  }
}

`,"top");
//# sourceMappingURL=index.cjs.map
