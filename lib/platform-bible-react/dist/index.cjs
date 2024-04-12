"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const y=require("react/jsx-runtime"),ee=require("react"),Ve=require("platform-bible-utils"),Gs=require("@radix-ui/react-dropdown-menu"),mt=require("lucide-react"),we=require("clsx"),Xs=require("tailwind-merge"),de=require("@mui/material"),vr=require("@mui/styled-engine"),Yt=require("react-dom"),vo=require("react-data-grid");function Nr(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const E=Nr(ee),be=Nr(Gs),Ks=Nr(Yt);var Ys=Object.defineProperty,Js=(e,t,n)=>t in e?Ys(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ne=(e,t,n)=>(Js(e,typeof t!="symbol"?t+"":t,n),n);const bt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],$r=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],gi=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],yo=aa();function Bt(e,t=!0){return t&&(e=e.toUpperCase()),e in yo?yo[e]:0}function Mr(e){return Bt(e)>0}function Zs(e){const t=typeof e=="string"?Bt(e):e;return t>=40&&t<=66}function Qs(e){return(typeof e=="string"?Bt(e):e)<=39}function bi(e){return e<=66}function ea(e){const t=typeof e=="string"?Bt(e):e;return xi(t)&&!bi(t)}function*ta(){for(let e=1;e<=bt.length;e++)yield e}const na=1,vi=bt.length;function ra(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function _r(e,t="***"){const n=e-1;return n<0||n>=bt.length?t:bt[n]}function yi(e){return e<=0||e>vi?"******":gi[e-1]}function oa(e){return yi(Bt(e))}function xi(e){const t=typeof e=="number"?_r(e):e;return Mr(t)&&!$r.includes(t)}function ia(e){const t=typeof e=="number"?_r(e):e;return Mr(t)&&$r.includes(t)}function sa(e){return gi[e-1].includes("*obsolete*")}function aa(){const e={};for(let t=0;t<bt.length;t++)e[bt[t]]=t+1;return e}const ge={allBookIds:bt,nonCanonicalIds:$r,bookIdToNumber:Bt,isBookIdValid:Mr,isBookNT:Zs,isBookOT:Qs,isBookOTNT:bi,isBookDC:ea,allBookNumbers:ta,firstBook:na,lastBook:vi,extraBooks:ra,bookNumberToId:_r,bookNumberToEnglishName:yi,bookIdToEnglishName:oa,isCanonical:xi,isExtraMaterial:ia,isObsolete:sa};var rt=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(rt||{});const $e=class{constructor(t){if(ne(this,"name"),ne(this,"fullPath"),ne(this,"isPresent"),ne(this,"hasVerseSegments"),ne(this,"isCustomized"),ne(this,"baseVersification"),ne(this,"scriptureBooks"),ne(this,"_type"),t!=null)typeof t=="string"?this.name=t:this._type=t;else throw new Error("Argument null")}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ne($e,"Original",new $e(rt.Original)),ne($e,"Septuagint",new $e(rt.Septuagint)),ne($e,"Vulgate",new $e(rt.Vulgate)),ne($e,"English",new $e(rt.English)),ne($e,"RussianProtestant",new $e(rt.RussianProtestant)),ne($e,"RussianOrthodox",new $e(rt.RussianOrthodox));let Rt=$e;function xo(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var wi=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(wi||{});const Se=class ie{constructor(t,n,r,o){if(ne(this,"firstChapter"),ne(this,"lastChapter"),ne(this,"lastVerse"),ne(this,"hasSegmentsDefined"),ne(this,"text"),ne(this,"BBBCCCVVVS"),ne(this,"longHashCode"),ne(this,"versification"),ne(this,"rtlMark","‏"),ne(this,"_bookNum",0),ne(this,"_chapterNum",0),ne(this,"_verseNum",0),ne(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,a=n!=null&&n instanceof Rt?n:void 0;this.setEmpty(a),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof Rt?n:void 0;this.setEmpty(i),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ie){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof Rt?t:ie.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(t,n=ie.defaultVersification){const r=new ie(n);return r.parse(t),r}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=ie.parse(t),{success:!0,verseRef:n}}catch(r){if(r instanceof Ht)return n=new ie,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ie.bcvMaxValue*ie.bookDigitShifter+(n>=0?n%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(r>=0?r%ie.bcvMaxValue:0)}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>ie.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return ge.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=ge.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ie.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>ge.lastBook)throw new Ht("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Rt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const a=+i[1].trim();this.versification=new Rt(rt[a])}catch{throw new Ht("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new Ht("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||ge.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(r[1]))throw new Ht("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification):!1}allVerses(t=!1,n=ie.verseRangeSeparators,r=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=xo(this._verse,r);for(const a of i.map(l=>xo(l,n))){const l=this.clone();l.verse=a[0];const c=l.verseNum;if(o.push(l),a.length>1){const u=this.clone();if(u.verse=a[1],!t)for(let d=c+1;d<u.verseNum;d++){const f=new ie(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(f)}o.push(u)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const a=o.BBBCCCVVV;if(r>a)return 3;if(r===a)return 4;r=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ge.lastBook?2:(ge.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=ge.bookIdToNumber(t),this.chapter=n,this.verse=r}};ne(Se,"defaultVersification",Rt.English),ne(Se,"verseRangeSeparator","-"),ne(Se,"verseSequenceIndicator",","),ne(Se,"verseRangeSeparators",[Se.verseRangeSeparator]),ne(Se,"verseSequenceIndicators",[Se.verseSequenceIndicator]),ne(Se,"chapterDigitShifter",1e3),ne(Se,"bookDigitShifter",Se.chapterDigitShifter*Se.chapterDigitShifter),ne(Se,"bcvMaxValue",Se.chapterDigitShifter-1),ne(Se,"ValidStatusType",wi);class Ht extends Error{}function Qe(...e){return Xs.twMerge(we.clsx(e))}const la=be.Root,ca=be.Trigger,ua=E.forwardRef(({className:e,inset:t,children:n,...r},o)=>y.jsxs(be.SubTrigger,{ref:o,className:Qe("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,y.jsx(mt.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));ua.displayName=be.SubTrigger.displayName;const da=E.forwardRef(({className:e,...t},n)=>y.jsx(be.SubContent,{ref:n,className:Qe("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));da.displayName=be.SubContent.displayName;const Ei=E.forwardRef(({className:e,sideOffset:t=4,...n},r)=>y.jsx(be.Portal,{children:y.jsx(be.Content,{ref:r,sideOffset:t,className:Qe("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));Ei.displayName=be.Content.displayName;const Ir=E.forwardRef(({className:e,inset:t,...n},r)=>y.jsx(be.Item,{ref:r,className:Qe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));Ir.displayName=be.Item.displayName;const pa=E.forwardRef(({className:e,children:t,checked:n,...r},o)=>y.jsxs(be.CheckboxItem,{ref:o,className:Qe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[y.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:y.jsx(be.ItemIndicator,{children:y.jsx(mt.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));pa.displayName=be.CheckboxItem.displayName;const fa=E.forwardRef(({className:e,children:t,...n},r)=>y.jsxs(be.RadioItem,{ref:r,className:Qe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[y.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:y.jsx(be.ItemIndicator,{children:y.jsx(mt.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));fa.displayName=be.RadioItem.displayName;const Ti=E.forwardRef(({className:e,inset:t,...n},r)=>y.jsx(be.Label,{ref:r,className:Qe("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));Ti.displayName=be.Label.displayName;const ki=E.forwardRef(({className:e,...t},n)=>y.jsx(be.Separator,{ref:n,className:Qe("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));ki.displayName=be.Separator.displayName;const Oi=E.forwardRef(({className:e,type:t,...n},r)=>y.jsx("input",{type:t,className:Qe("pr-flex pr-h-10 pr-w-full pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));Oi.displayName="Input";const ha=ee.forwardRef(({handleSearch:e,...t},n)=>y.jsxs("div",{children:[y.jsx(Oi,{...t,type:"text",className:"book-chapter-input",onChange:r=>e(r.target.value),ref:n}),y.jsx(mt.History,{style:{cursor:"pointer",height:"16px",width:"16px"},onClick:()=>{console.log("back in history")}})]}));function ma({endChapter:e,activeChapter:t,handleSelectChapter:n}){const r=Array.from({length:e},(o,i)=>i+1);return y.jsx("div",{className:"chapter-select",children:r.map(o=>y.jsx("div",{className:`chapter ${o===t?"active":void 0}`,onClick:()=>n(o),children:o},o))})}function ga({bookId:e,handleSelectBook:t,isSelected:n,bookType:r,children:o}){return y.jsxs("div",{children:[y.jsxs(Ir,{textValue:e,className:n?"selected-menu-item":"menu-item",onSelect:i=>{i.preventDefault(),t(e)},children:[n?y.jsx(mt.Tally1,{style:{marginRight:"10px"},className:`selected-book-color-label ${r.toLowerCase()}`}):y.jsx(mt.Tally1,{style:{marginRight:"10px"},className:`book-color-label ${r.toLowerCase()}`}),ge.bookIdToEnglishName(e),n&&y.jsx(mt.ChevronUp,{name:"chevron-up"})]},e),n&&o]})}const ba={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},va=["OT","NT","DC"];function ya({scrRef:e,handleSubmit:t}){const{allBookIds:n}=ge,[r,o]=ee.useState(""),[i,a]=ee.useState(""),l=ee.useRef(void 0),c=ee.useCallback(b=>({OT:n.filter(m=>ge.isBookOT(m)),NT:n.filter(m=>ge.isBookNT(m)),DC:n.filter(m=>ge.isBookDC(m))})[b],[n]),u=ee.useCallback(b=>c(b).filter(h=>ge.bookIdToEnglishName(h).toLowerCase().includes(r.toLowerCase())||h.toLowerCase().includes(r.toLowerCase())),[c,r]),d=b=>{o(b)},f=ee.useCallback(b=>Ve.getChaptersForBook(ge.bookIdToNumber(b)),[]),p=b=>{a(i!==b?b:""),f(b)===-1&&t({bookNum:ge.bookIdToNumber(b),chapterNum:1,verseNum:1})},v=b=>{t({bookNum:ge.bookIdToNumber(i),chapterNum:b,verseNum:1})};return y.jsxs("div",{children:[y.jsxs(la,{children:[y.jsx(ca,{asChild:!0,children:y.jsx(ha,{ref:l,value:r,handleSearch:d,placeholder:`${ge.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),y.jsxs(Ei,{style:{width:"300px",height:"500px",overflowY:"auto"},children:[y.jsx(Ir,{onSelect:b=>{b.preventDefault(),l.current.focus(),console.log("Attempt to give focus to input")},children:"Give focus to input"}),va.map(b=>y.jsxs("div",{children:[y.jsx(Ti,{children:ba[b]}),u(b).map(h=>y.jsx("div",{children:y.jsx(ga,{bookId:h,handleSelectBook:()=>p(h),isSelected:i===h,bookType:b,children:y.jsx(ma,{handleSelectChapter:v,endChapter:f(h),activeChapter:e.bookNum===ge.bookIdToNumber(h)?e.chapterNum:0})})},h)),b==="OT"||b==="NT"?y.jsx(ki,{}):void 0]},b))]})]}),y.jsx("button",{type:"button",onClick:()=>{l.current.focus()},children:"Focus input"})]})}function ut({id:e,isDisabled:t=!1,className:n,onClick:r,onContextMenu:o,children:i}){return y.jsx(de.Button,{id:e,disabled:t,className:`papi-button ${n??""}`,onClick:r,onContextMenu:o,children:i})}function Nn({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:a,options:l=[],className:c,value:u,onChange:d,onFocus:f,onBlur:p,getOptionLabel:v}){return y.jsx(de.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:i,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:u,onChange:d,onFocus:f,onBlur:p,getOptionLabel:v,renderInput:b=>y.jsx(de.TextField,{...b,error:o,fullWidth:i,disabled:n,label:t,style:{width:a}})})}function xa({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o,chapterCount:i}){const a=ee.useMemo(()=>Array.from({length:i},(u,d)=>d+1),[i]),l=(u,d)=>{n(d),d>t&&r(d)},c=(u,d)=>{r(d),d<e&&n(d)};return y.jsxs(y.Fragment,{children:[y.jsx(de.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:y.jsx(Nn,{onChange:(u,d)=>l(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),y.jsx(de.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:y.jsx(Nn,{onChange:(u,d)=>c(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:t,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var ft=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(ft||{});function Si({id:e,isChecked:t,labelText:n="",labelPosition:r=ft.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:a=!1,hasError:l=!1,className:c,onChange:u}){const d=y.jsx(de.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:a,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:u});let f;if(n){const p=r===ft.Before||r===ft.Above,v=y.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),b=r===ft.Before||r===ft.After,h=b?v:y.jsx("div",{children:v}),m=b?d:y.jsx("div",{children:d});f=y.jsxs(de.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:a,error:l,children:[p&&h,m,!p&&h]})}else f=d;return f}function ue(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},k.apply(this,arguments)}function wa(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Ea(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var yr={exports:{}},wn={exports:{}},se={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wo;function Ta(){if(wo)return se;wo=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,b=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,m=e?Symbol.for("react.fundamental"):60117,T=e?Symbol.for("react.responder"):60118,$=e?Symbol.for("react.scope"):60119;function x(g){if(typeof g=="object"&&g!==null){var S=g.$$typeof;switch(S){case t:switch(g=g.type,g){case c:case u:case r:case i:case o:case f:return g;default:switch(g=g&&g.$$typeof,g){case l:case d:case b:case v:case a:return g;default:return S}}case n:return S}}}function w(g){return x(g)===u}return se.AsyncMode=c,se.ConcurrentMode=u,se.ContextConsumer=l,se.ContextProvider=a,se.Element=t,se.ForwardRef=d,se.Fragment=r,se.Lazy=b,se.Memo=v,se.Portal=n,se.Profiler=i,se.StrictMode=o,se.Suspense=f,se.isAsyncMode=function(g){return w(g)||x(g)===c},se.isConcurrentMode=w,se.isContextConsumer=function(g){return x(g)===l},se.isContextProvider=function(g){return x(g)===a},se.isElement=function(g){return typeof g=="object"&&g!==null&&g.$$typeof===t},se.isForwardRef=function(g){return x(g)===d},se.isFragment=function(g){return x(g)===r},se.isLazy=function(g){return x(g)===b},se.isMemo=function(g){return x(g)===v},se.isPortal=function(g){return x(g)===n},se.isProfiler=function(g){return x(g)===i},se.isStrictMode=function(g){return x(g)===o},se.isSuspense=function(g){return x(g)===f},se.isValidElementType=function(g){return typeof g=="string"||typeof g=="function"||g===r||g===u||g===i||g===o||g===f||g===p||typeof g=="object"&&g!==null&&(g.$$typeof===b||g.$$typeof===v||g.$$typeof===a||g.$$typeof===l||g.$$typeof===d||g.$$typeof===m||g.$$typeof===T||g.$$typeof===$||g.$$typeof===h)},se.typeOf=x,se}var ae={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Eo;function ka(){return Eo||(Eo=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,b=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,m=e?Symbol.for("react.fundamental"):60117,T=e?Symbol.for("react.responder"):60118,$=e?Symbol.for("react.scope"):60119;function x(N){return typeof N=="string"||typeof N=="function"||N===r||N===u||N===i||N===o||N===f||N===p||typeof N=="object"&&N!==null&&(N.$$typeof===b||N.$$typeof===v||N.$$typeof===a||N.$$typeof===l||N.$$typeof===d||N.$$typeof===m||N.$$typeof===T||N.$$typeof===$||N.$$typeof===h)}function w(N){if(typeof N=="object"&&N!==null){var J=N.$$typeof;switch(J){case t:var P=N.type;switch(P){case c:case u:case r:case i:case o:case f:return P;default:var oe=P&&P.$$typeof;switch(oe){case l:case d:case b:case v:case a:return oe;default:return J}}case n:return J}}}var g=c,S=u,C=l,j=a,I=t,A=d,B=r,z=b,W=v,L=n,_=i,R=o,D=f,Q=!1;function Z(N){return Q||(Q=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),O(N)||w(N)===c}function O(N){return w(N)===u}function M(N){return w(N)===l}function V(N){return w(N)===a}function X(N){return typeof N=="object"&&N!==null&&N.$$typeof===t}function F(N){return w(N)===d}function U(N){return w(N)===r}function H(N){return w(N)===b}function G(N){return w(N)===v}function q(N){return w(N)===n}function K(N){return w(N)===i}function Y(N){return w(N)===o}function re(N){return w(N)===f}ae.AsyncMode=g,ae.ConcurrentMode=S,ae.ContextConsumer=C,ae.ContextProvider=j,ae.Element=I,ae.ForwardRef=A,ae.Fragment=B,ae.Lazy=z,ae.Memo=W,ae.Portal=L,ae.Profiler=_,ae.StrictMode=R,ae.Suspense=D,ae.isAsyncMode=Z,ae.isConcurrentMode=O,ae.isContextConsumer=M,ae.isContextProvider=V,ae.isElement=X,ae.isForwardRef=F,ae.isFragment=U,ae.isLazy=H,ae.isMemo=G,ae.isPortal=q,ae.isProfiler=K,ae.isStrictMode=Y,ae.isSuspense=re,ae.isValidElementType=x,ae.typeOf=w}()),ae}var To;function Ci(){return To||(To=1,process.env.NODE_ENV==="production"?wn.exports=Ta():wn.exports=ka()),wn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var rr,ko;function Oa(){if(ko)return rr;ko=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var a={},l=0;l<10;l++)a["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(a).map(function(d){return a[d]});if(c.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(d){u[d]=d}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return rr=o()?Object.assign:function(i,a){for(var l,c=r(i),u,d=1;d<arguments.length;d++){l=Object(arguments[d]);for(var f in l)t.call(l,f)&&(c[f]=l[f]);if(e){u=e(l);for(var p=0;p<u.length;p++)n.call(l,u[p])&&(c[u[p]]=l[u[p]])}}return c},rr}var or,Oo;function jr(){if(Oo)return or;Oo=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return or=e,or}var ir,So;function Pi(){return So||(So=1,ir=Function.call.bind(Object.prototype.hasOwnProperty)),ir}var sr,Co;function Sa(){if(Co)return sr;Co=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=jr(),n={},r=Pi();e=function(i){var a="Warning: "+i;typeof console<"u"&&console.error(a);try{throw new Error(a)}catch{}}}function o(i,a,l,c,u){if(process.env.NODE_ENV!=="production"){for(var d in i)if(r(i,d)){var f;try{if(typeof i[d]!="function"){var p=Error((c||"React class")+": "+l+" type `"+d+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[d]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw p.name="Invariant Violation",p}f=i[d](a,d,c,l,null,t)}catch(b){f=b}if(f&&!(f instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+d+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in n)){n[f.message]=!0;var v=u?u():"";e("Failed "+l+" type: "+f.message+(v??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},sr=o,sr}var ar,Po;function Ca(){if(Po)return ar;Po=1;var e=Ci(),t=Oa(),n=jr(),r=Pi(),o=Sa(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function a(){return null}return ar=function(l,c){var u=typeof Symbol=="function"&&Symbol.iterator,d="@@iterator";function f(O){var M=O&&(u&&O[u]||O[d]);if(typeof M=="function")return M}var p="<<anonymous>>",v={array:T("array"),bigint:T("bigint"),bool:T("boolean"),func:T("function"),number:T("number"),object:T("object"),string:T("string"),symbol:T("symbol"),any:$(),arrayOf:x,element:w(),elementType:g(),instanceOf:S,node:A(),objectOf:j,oneOf:C,oneOfType:I,shape:z,exact:W};function b(O,M){return O===M?O!==0||1/O===1/M:O!==O&&M!==M}function h(O,M){this.message=O,this.data=M&&typeof M=="object"?M:{},this.stack=""}h.prototype=Error.prototype;function m(O){if(process.env.NODE_ENV!=="production")var M={},V=0;function X(U,H,G,q,K,Y,re){if(q=q||p,Y=Y||G,re!==n){if(c){var N=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw N.name="Invariant Violation",N}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var J=q+":"+G;!M[J]&&V<3&&(i("You are manually calling a React.PropTypes validation function for the `"+Y+"` prop on `"+q+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),M[J]=!0,V++)}}return H[G]==null?U?H[G]===null?new h("The "+K+" `"+Y+"` is marked as required "+("in `"+q+"`, but its value is `null`.")):new h("The "+K+" `"+Y+"` is marked as required in "+("`"+q+"`, but its value is `undefined`.")):null:O(H,G,q,K,Y)}var F=X.bind(null,!1);return F.isRequired=X.bind(null,!0),F}function T(O){function M(V,X,F,U,H,G){var q=V[X],K=R(q);if(K!==O){var Y=D(q);return new h("Invalid "+U+" `"+H+"` of type "+("`"+Y+"` supplied to `"+F+"`, expected ")+("`"+O+"`."),{expectedType:O})}return null}return m(M)}function $(){return m(a)}function x(O){function M(V,X,F,U,H){if(typeof O!="function")return new h("Property `"+H+"` of component `"+F+"` has invalid PropType notation inside arrayOf.");var G=V[X];if(!Array.isArray(G)){var q=R(G);return new h("Invalid "+U+" `"+H+"` of type "+("`"+q+"` supplied to `"+F+"`, expected an array."))}for(var K=0;K<G.length;K++){var Y=O(G,K,F,U,H+"["+K+"]",n);if(Y instanceof Error)return Y}return null}return m(M)}function w(){function O(M,V,X,F,U){var H=M[V];if(!l(H)){var G=R(H);return new h("Invalid "+F+" `"+U+"` of type "+("`"+G+"` supplied to `"+X+"`, expected a single ReactElement."))}return null}return m(O)}function g(){function O(M,V,X,F,U){var H=M[V];if(!e.isValidElementType(H)){var G=R(H);return new h("Invalid "+F+" `"+U+"` of type "+("`"+G+"` supplied to `"+X+"`, expected a single ReactElement type."))}return null}return m(O)}function S(O){function M(V,X,F,U,H){if(!(V[X]instanceof O)){var G=O.name||p,q=Z(V[X]);return new h("Invalid "+U+" `"+H+"` of type "+("`"+q+"` supplied to `"+F+"`, expected ")+("instance of `"+G+"`."))}return null}return m(M)}function C(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),a;function M(V,X,F,U,H){for(var G=V[X],q=0;q<O.length;q++)if(b(G,O[q]))return null;var K=JSON.stringify(O,function(re,N){var J=D(N);return J==="symbol"?String(N):N});return new h("Invalid "+U+" `"+H+"` of value `"+String(G)+"` "+("supplied to `"+F+"`, expected one of "+K+"."))}return m(M)}function j(O){function M(V,X,F,U,H){if(typeof O!="function")return new h("Property `"+H+"` of component `"+F+"` has invalid PropType notation inside objectOf.");var G=V[X],q=R(G);if(q!=="object")return new h("Invalid "+U+" `"+H+"` of type "+("`"+q+"` supplied to `"+F+"`, expected an object."));for(var K in G)if(r(G,K)){var Y=O(G,K,F,U,H+"."+K,n);if(Y instanceof Error)return Y}return null}return m(M)}function I(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),a;for(var M=0;M<O.length;M++){var V=O[M];if(typeof V!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+Q(V)+" at index "+M+"."),a}function X(F,U,H,G,q){for(var K=[],Y=0;Y<O.length;Y++){var re=O[Y],N=re(F,U,H,G,q,n);if(N==null)return null;N.data&&r(N.data,"expectedType")&&K.push(N.data.expectedType)}var J=K.length>0?", expected one of type ["+K.join(", ")+"]":"";return new h("Invalid "+G+" `"+q+"` supplied to "+("`"+H+"`"+J+"."))}return m(X)}function A(){function O(M,V,X,F,U){return L(M[V])?null:new h("Invalid "+F+" `"+U+"` supplied to "+("`"+X+"`, expected a ReactNode."))}return m(O)}function B(O,M,V,X,F){return new h((O||"React class")+": "+M+" type `"+V+"."+X+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+F+"`.")}function z(O){function M(V,X,F,U,H){var G=V[X],q=R(G);if(q!=="object")return new h("Invalid "+U+" `"+H+"` of type `"+q+"` "+("supplied to `"+F+"`, expected `object`."));for(var K in O){var Y=O[K];if(typeof Y!="function")return B(F,U,H,K,D(Y));var re=Y(G,K,F,U,H+"."+K,n);if(re)return re}return null}return m(M)}function W(O){function M(V,X,F,U,H){var G=V[X],q=R(G);if(q!=="object")return new h("Invalid "+U+" `"+H+"` of type `"+q+"` "+("supplied to `"+F+"`, expected `object`."));var K=t({},V[X],O);for(var Y in K){var re=O[Y];if(r(O,Y)&&typeof re!="function")return B(F,U,H,Y,D(re));if(!re)return new h("Invalid "+U+" `"+H+"` key `"+Y+"` supplied to `"+F+"`.\nBad object: "+JSON.stringify(V[X],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(O),null,"  "));var N=re(G,Y,F,U,H+"."+Y,n);if(N)return N}return null}return m(M)}function L(O){switch(typeof O){case"number":case"string":case"undefined":return!0;case"boolean":return!O;case"object":if(Array.isArray(O))return O.every(L);if(O===null||l(O))return!0;var M=f(O);if(M){var V=M.call(O),X;if(M!==O.entries){for(;!(X=V.next()).done;)if(!L(X.value))return!1}else for(;!(X=V.next()).done;){var F=X.value;if(F&&!L(F[1]))return!1}}else return!1;return!0;default:return!1}}function _(O,M){return O==="symbol"?!0:M?M["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&M instanceof Symbol:!1}function R(O){var M=typeof O;return Array.isArray(O)?"array":O instanceof RegExp?"object":_(M,O)?"symbol":M}function D(O){if(typeof O>"u"||O===null)return""+O;var M=R(O);if(M==="object"){if(O instanceof Date)return"date";if(O instanceof RegExp)return"regexp"}return M}function Q(O){var M=D(O);switch(M){case"array":case"object":return"an "+M;case"boolean":case"date":case"regexp":return"a "+M;default:return M}}function Z(O){return!O.constructor||!O.constructor.name?p:O.constructor.name}return v.checkPropTypes=o,v.resetWarningCache=o.resetWarningCache,v.PropTypes=v,v},ar}var lr,Ro;function Pa(){if(Ro)return lr;Ro=1;var e=jr();function t(){}function n(){}return n.resetWarningCache=t,lr=function(){function r(a,l,c,u,d,f){if(f!==e){var p=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw p.name="Invariant Violation",p}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},lr}if(process.env.NODE_ENV!=="production"){var Ra=Ci(),Na=!0;yr.exports=Ca()(Ra.isElement,Na)}else yr.exports=Pa()();var $a=yr.exports;const s=wa($a);function Lt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function ht(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Ri(e){if(!ht(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Ri(e[n])}),t}function Ke(e,t,n={clone:!0}){const r=n.clone?k({},e):e;return ht(e)&&ht(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(ht(t[o])&&o in e&&ht(e[o])?r[o]=Ke(e[o],t[o],n):n.clone?r[o]=ht(t[o])?Ri(t[o]):t[o]:r[o]=t[o])}),r}function Ma(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ni(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let l;const c=i.type;return typeof c=="function"&&!Ma(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const $i=Lt(s.element,Ni);$i.isRequired=Lt(s.element.isRequired,Ni);const dn=$i;function _a(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ia(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let l;return typeof i=="function"&&!_a(i)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const ja=Lt(s.elementType,Ia),Aa="exact-prop: ​";function Mi(e){return process.env.NODE_ENV==="production"?e:k({},e,{[Aa]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Mt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var xr={exports:{}},le={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var No;function Da(){if(No)return le;No=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),b;b=Symbol.for("react.module.reference");function h(m){if(typeof m=="object"&&m!==null){var T=m.$$typeof;switch(T){case e:switch(m=m.type,m){case n:case o:case r:case u:case d:return m;default:switch(m=m&&m.$$typeof,m){case l:case a:case c:case p:case f:case i:return m;default:return T}}case t:return T}}}return le.ContextConsumer=a,le.ContextProvider=i,le.Element=e,le.ForwardRef=c,le.Fragment=n,le.Lazy=p,le.Memo=f,le.Portal=t,le.Profiler=o,le.StrictMode=r,le.Suspense=u,le.SuspenseList=d,le.isAsyncMode=function(){return!1},le.isConcurrentMode=function(){return!1},le.isContextConsumer=function(m){return h(m)===a},le.isContextProvider=function(m){return h(m)===i},le.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===e},le.isForwardRef=function(m){return h(m)===c},le.isFragment=function(m){return h(m)===n},le.isLazy=function(m){return h(m)===p},le.isMemo=function(m){return h(m)===f},le.isPortal=function(m){return h(m)===t},le.isProfiler=function(m){return h(m)===o},le.isStrictMode=function(m){return h(m)===r},le.isSuspense=function(m){return h(m)===u},le.isSuspenseList=function(m){return h(m)===d},le.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===n||m===o||m===r||m===u||m===d||m===v||typeof m=="object"&&m!==null&&(m.$$typeof===p||m.$$typeof===f||m.$$typeof===i||m.$$typeof===a||m.$$typeof===c||m.$$typeof===b||m.getModuleId!==void 0)},le.typeOf=h,le}var ce={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $o;function Ba(){return $o||($o=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),b=!1,h=!1,m=!1,T=!1,$=!1,x;x=Symbol.for("react.module.reference");function w(P){return!!(typeof P=="string"||typeof P=="function"||P===n||P===o||$||P===r||P===u||P===d||T||P===v||b||h||m||typeof P=="object"&&P!==null&&(P.$$typeof===p||P.$$typeof===f||P.$$typeof===i||P.$$typeof===a||P.$$typeof===c||P.$$typeof===x||P.getModuleId!==void 0))}function g(P){if(typeof P=="object"&&P!==null){var oe=P.$$typeof;switch(oe){case e:var ye=P.type;switch(ye){case n:case o:case r:case u:case d:return ye;default:var ke=ye&&ye.$$typeof;switch(ke){case l:case a:case c:case p:case f:case i:return ke;default:return oe}}case t:return oe}}}var S=a,C=i,j=e,I=c,A=n,B=p,z=f,W=t,L=o,_=r,R=u,D=d,Q=!1,Z=!1;function O(P){return Q||(Q=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function M(P){return Z||(Z=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function V(P){return g(P)===a}function X(P){return g(P)===i}function F(P){return typeof P=="object"&&P!==null&&P.$$typeof===e}function U(P){return g(P)===c}function H(P){return g(P)===n}function G(P){return g(P)===p}function q(P){return g(P)===f}function K(P){return g(P)===t}function Y(P){return g(P)===o}function re(P){return g(P)===r}function N(P){return g(P)===u}function J(P){return g(P)===d}ce.ContextConsumer=S,ce.ContextProvider=C,ce.Element=j,ce.ForwardRef=I,ce.Fragment=A,ce.Lazy=B,ce.Memo=z,ce.Portal=W,ce.Profiler=L,ce.StrictMode=_,ce.Suspense=R,ce.SuspenseList=D,ce.isAsyncMode=O,ce.isConcurrentMode=M,ce.isContextConsumer=V,ce.isContextProvider=X,ce.isElement=F,ce.isForwardRef=U,ce.isFragment=H,ce.isLazy=G,ce.isMemo=q,ce.isPortal=K,ce.isProfiler=Y,ce.isStrictMode=re,ce.isSuspense=N,ce.isSuspenseList=J,ce.isValidElementType=w,ce.typeOf=g}()),ce}process.env.NODE_ENV==="production"?xr.exports=Da():xr.exports=Ba();var $n=xr.exports;const La=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Fa(e){const t=`${e}`.match(La);return t&&t[1]||""}function _i(e,t=""){return e.displayName||e.name||Fa(e)||t}function Mo(e,t,n){const r=_i(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Va(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return _i(e,"Component");if(typeof e=="object")switch(e.$$typeof){case $n.ForwardRef:return Mo(e,e.render,"ForwardRef");case $n.Memo:return Mo(e,e.type,"memo");default:return}}}function Ye(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],a=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const za=s.oneOfType([s.func,s.object]),Ar=za;function Ue(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Mt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function wr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Ii(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function Ua(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,a)=>{const l=o||"<<anonymous>>",c=a||r;return typeof n[r]<"u"?new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function qa(e,t){var n,r;return E.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Ee(e){return e&&e.ownerDocument||document}function _t(e){return Ee(e).defaultView||window}function Ha(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?k({},t.propTypes):null;return o=>(i,a,l,c,u,...d)=>{const f=u||a,p=n==null?void 0:n[f];if(p){const v=p(i,a,l,c,u,...d);if(v)return v}return typeof i[a]<"u"&&!i[o]?new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Mn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Wa=typeof window<"u"?E.useLayoutEffect:E.useEffect,vt=Wa;let _o=0;function Ga(e){const[t,n]=E.useState(e),r=e||t;return E.useEffect(()=>{t==null&&(_o+=1,n(`mui-${_o}`))},[t]),r}const Io=E["useId".toString()];function ji(e){if(Io!==void 0){const t=Io();return e??t}return Ga(e)}function Xa(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function Ai({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=E.useRef(e!==void 0),[i,a]=E.useState(t),l=o?e:i;if(process.env.NODE_ENV!=="production"){E.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:u}=E.useRef(t);E.useEffect(()=>{!o&&u!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=E.useCallback(u=>{o||a(u)},[]);return[l,c]}function on(e){const t=E.useRef(e);return vt(()=>{t.current=e}),E.useRef((...n)=>(0,t.current)(...n)).current}function De(...e){return E.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Mn(n,t)})},e)}const jo={};function Ka(e,t){const n=E.useRef(jo);return n.current===jo&&(n.current=e(t)),n}const Ya=[];function Ja(e){E.useEffect(e,Ya)}class pn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new pn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function Jt(){const e=Ka(pn.create).current;return Ja(e.disposeEffect),e}let Fn=!0,Er=!1;const Za=new pn,Qa={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function el(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Qa[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function tl(e){e.metaKey||e.altKey||e.ctrlKey||(Fn=!0)}function cr(){Fn=!1}function nl(){this.visibilityState==="hidden"&&Er&&(Fn=!0)}function rl(e){e.addEventListener("keydown",tl,!0),e.addEventListener("mousedown",cr,!0),e.addEventListener("pointerdown",cr,!0),e.addEventListener("touchstart",cr,!0),e.addEventListener("visibilitychange",nl,!0)}function ol(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Fn||el(t)}function Di(){const e=E.useCallback(o=>{o!=null&&rl(o.ownerDocument)},[]),t=E.useRef(!1);function n(){return t.current?(Er=!0,Za.start(100,()=>{Er=!1}),t.current=!1,!0):!1}function r(o){return ol(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Bi(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function il(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function sl(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const al=Number.isInteger||sl;function Li(e,t,n,r){const o=e[t];if(o==null||!al(o)){const i=il(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function Fi(e,t,...n){return e[t]===void 0?null:Li(e,t,...n)}function Tr(){return null}Fi.isRequired=Li;Tr.isRequired=Tr;const Vi=process.env.NODE_ENV==="production"?Tr:Fi;function zi(e,t){const n=k({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=k({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=k({},i),Object.keys(o).forEach(a=>{n[r][a]=zi(o[a],i[a])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function et(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,a)=>{if(a){const l=t(a);l!==""&&i.push(l),n&&n[a]&&i.push(n[a])}return i},[]).join(" ")}),r}const Ao=e=>e,ll=()=>{let e=Ao;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Ao}}},cl=ll(),Ui=cl,qi={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function He(e,t,n="Mui"){const r=qi[t];return r?`${n}-${r}`:`${Ui.generate(e)}-${t}`}function it(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=He(e,o,n)}),r}function ul(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Hi(e){return typeof e=="string"}function Zt(e,t,n){return e===void 0||Hi(e)?t:k({},t,{ownerState:k({},t.ownerState,n)})}const dl={disableDefaultClasses:!1},pl=E.createContext(dl);function fl(e){const{disableDefaultClasses:t}=E.useContext(pl);return n=>t?"":e(n)}function Wi(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function hl(e,t,n){return typeof e=="function"?e(t,n):e}function Do(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function ml(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const v=we(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),b=k({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),h=k({},n,o,r);return v.length>0&&(h.className=v),Object.keys(b).length>0&&(h.style=b),{props:h,internalRef:void 0}}const a=Wi(k({},o,r)),l=Do(r),c=Do(o),u=t(a),d=we(u==null?void 0:u.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),f=k({},u==null?void 0:u.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),p=k({},u,n,c,l);return d.length>0&&(p.className=d),Object.keys(f).length>0&&(p.style=f),{props:p,internalRef:u.ref}}const gl=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function yt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,a=ue(e,gl),l=i?{}:hl(r,o),{props:c,internalRef:u}=ml(k({},a,{externalSlotProps:l})),d=De(u,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return Zt(n,k({},c,{ref:d}),o)}const Gi="base";function bl(e){return`${Gi}--${e}`}function vl(e,t){return`${Gi}-${e}-${t}`}function Xi(e,t){const n=qi[t];return n?bl(n):vl(e,t)}function yl(e,t){const n={};return t.forEach(r=>{n[r]=Xi(e,r)}),n}const xl=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function wl(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function El(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Tl(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||El(e))}function kl(e){const t=[],n=[];return Array.from(e.querySelectorAll(xl)).forEach((r,o)=>{const i=wl(r);i===-1||!Tl(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function Ol(){return!0}function _n(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=kl,isEnabled:a=Ol,open:l}=e,c=E.useRef(!1),u=E.useRef(null),d=E.useRef(null),f=E.useRef(null),p=E.useRef(null),v=E.useRef(!1),b=E.useRef(null),h=De(t.ref,b),m=E.useRef(null);E.useEffect(()=>{!l||!b.current||(v.current=!n)},[n,l]),E.useEffect(()=>{if(!l||!b.current)return;const x=Ee(b.current);return b.current.contains(x.activeElement)||(b.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),b.current.setAttribute("tabIndex","-1")),v.current&&b.current.focus()),()=>{o||(f.current&&f.current.focus&&(c.current=!0,f.current.focus()),f.current=null)}},[l]),E.useEffect(()=>{if(!l||!b.current)return;const x=Ee(b.current),w=C=>{m.current=C,!(r||!a()||C.key!=="Tab")&&x.activeElement===b.current&&C.shiftKey&&(c.current=!0,d.current&&d.current.focus())},g=()=>{const C=b.current;if(C===null)return;if(!x.hasFocus()||!a()||c.current){c.current=!1;return}if(C.contains(x.activeElement)||r&&x.activeElement!==u.current&&x.activeElement!==d.current)return;if(x.activeElement!==p.current)p.current=null;else if(p.current!==null)return;if(!v.current)return;let j=[];if((x.activeElement===u.current||x.activeElement===d.current)&&(j=i(b.current)),j.length>0){var I,A;const B=!!((I=m.current)!=null&&I.shiftKey&&((A=m.current)==null?void 0:A.key)==="Tab"),z=j[0],W=j[j.length-1];typeof z!="string"&&typeof W!="string"&&(B?W.focus():z.focus())}else C.focus()};x.addEventListener("focusin",g),x.addEventListener("keydown",w,!0);const S=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&g()},50);return()=>{clearInterval(S),x.removeEventListener("focusin",g),x.removeEventListener("keydown",w,!0)}},[n,r,o,a,l,i]);const T=x=>{f.current===null&&(f.current=x.relatedTarget),v.current=!0,p.current=x.target;const w=t.props.onFocus;w&&w(x)},$=x=>{f.current===null&&(f.current=x.relatedTarget),v.current=!0};return y.jsxs(E.Fragment,{children:[y.jsx("div",{tabIndex:l?0:-1,onFocus:$,ref:u,"data-testid":"sentinelStart"}),E.cloneElement(t,{ref:h,onFocus:T}),y.jsx("div",{tabIndex:l?0:-1,onFocus:$,ref:d,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(_n.propTypes={children:dn,disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableRestoreFocus:s.bool,getTabbable:s.func,isEnabled:s.func,open:s.bool.isRequired});process.env.NODE_ENV!=="production"&&(_n["propTypes"]=Mi(_n.propTypes));function Sl(e){return typeof e=="function"?e():e}const sn=E.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[a,l]=E.useState(null),c=De(E.isValidElement(r)?r.ref:null,n);if(vt(()=>{i||l(Sl(o)||document.body)},[o,i]),vt(()=>{if(a&&!i)return Mn(n,a),()=>{Mn(n,null)}},[n,a,i]),i){if(E.isValidElement(r)){const u={ref:c};return E.cloneElement(r,u)}return y.jsx(E.Fragment,{children:r})}return y.jsx(E.Fragment,{children:a&&Ks.createPortal(r,a)})});process.env.NODE_ENV!=="production"&&(sn.propTypes={children:s.node,container:s.oneOfType([Ye,s.func]),disablePortal:s.bool});process.env.NODE_ENV!=="production"&&(sn["propTypes"]=Mi(sn.propTypes));function Cl(e){const t=Ee(e);return t.body===e?_t(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function en(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Bo(e){return parseInt(_t(e).getComputedStyle(e).paddingRight,10)||0}function Pl(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Lo(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,a=>{const l=i.indexOf(a)===-1,c=!Pl(a);l&&c&&en(a,o)})}function ur(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function Rl(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(Cl(r)){const a=Bi(Ee(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Bo(r)+a}px`;const l=Ee(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${Bo(c)+a}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=Ee(r).body;else{const a=r.parentElement,l=_t(r);i=(a==null?void 0:a.nodeName)==="HTML"&&l.getComputedStyle(a).overflowY==="scroll"?a:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:a,property:l})=>{i?a.style.setProperty(l,i):a.style.removeProperty(l)})}}function Nl(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class $l{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&en(t.modalRef,!1);const o=Nl(n);Lo(n,t.mount,t.modalRef,o,!0);const i=ur(this.containers,a=>a.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=ur(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=Rl(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=ur(this.containers,a=>a.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&en(t.modalRef,n),Lo(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const a=i.modals[i.modals.length-1];a.modalRef&&en(a.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Ml(e){return typeof e=="function"?e():e}function _l(e){return e?e.props.hasOwnProperty("in"):!1}const Il=new $l;function jl(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Il,closeAfterTransition:i=!1,onTransitionEnter:a,onTransitionExited:l,children:c,onClose:u,open:d,rootRef:f}=e,p=E.useRef({}),v=E.useRef(null),b=E.useRef(null),h=De(b,f),[m,T]=E.useState(!d),$=_l(c);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const w=()=>Ee(v.current),g=()=>(p.current.modalRef=b.current,p.current.mount=v.current,p.current),S=()=>{o.mount(g(),{disableScrollLock:r}),b.current&&(b.current.scrollTop=0)},C=on(()=>{const R=Ml(t)||w().body;o.add(g(),R),b.current&&S()}),j=E.useCallback(()=>o.isTopModal(g()),[o]),I=on(R=>{v.current=R,R&&(d&&j()?S():b.current&&en(b.current,x))}),A=E.useCallback(()=>{o.remove(g(),x)},[x,o]);E.useEffect(()=>()=>{A()},[A]),E.useEffect(()=>{d?C():(!$||!i)&&A()},[d,A,$,i,C]);const B=R=>D=>{var Q;(Q=R.onKeyDown)==null||Q.call(R,D),!(D.key!=="Escape"||D.which===229||!j())&&(n||(D.stopPropagation(),u&&u(D,"escapeKeyDown")))},z=R=>D=>{var Q;(Q=R.onClick)==null||Q.call(R,D),D.target===D.currentTarget&&u&&u(D,"backdropClick")};return{getRootProps:(R={})=>{const D=Wi(e);delete D.onTransitionEnter,delete D.onTransitionExited;const Q=k({},D,R);return k({role:"presentation"},Q,{onKeyDown:B(Q),ref:h})},getBackdropProps:(R={})=>{const D=R;return k({"aria-hidden":!0},D,{onClick:z(D),open:d})},getTransitionProps:()=>{const R=()=>{T(!1),a&&a()},D=()=>{T(!0),l&&l(),i&&A()};return{onEnter:wr(R,c==null?void 0:c.props.onEnter),onExited:wr(D,c==null?void 0:c.props.onExited)}},rootRef:h,portalRef:I,isTopModal:j,exited:m,hasTransition:$}}var Ce="top",Be="bottom",Le="right",Pe="left",Dr="auto",fn=[Ce,Be,Le,Pe],It="start",an="end",Al="clippingParents",Ki="viewport",Wt="popper",Dl="reference",Fo=fn.reduce(function(e,t){return e.concat([t+"-"+It,t+"-"+an])},[]),Yi=[].concat(fn,[Dr]).reduce(function(e,t){return e.concat([t,t+"-"+It,t+"-"+an])},[]),Bl="beforeRead",Ll="read",Fl="afterRead",Vl="beforeMain",zl="main",Ul="afterMain",ql="beforeWrite",Hl="write",Wl="afterWrite",Gl=[Bl,Ll,Fl,Vl,zl,Ul,ql,Hl,Wl];function qe(e){return e?(e.nodeName||"").toLowerCase():null}function _e(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function xt(e){var t=_e(e).Element;return e instanceof t||e instanceof Element}function Ae(e){var t=_e(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Br(e){if(typeof ShadowRoot>"u")return!1;var t=_e(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Xl(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!Ae(i)||!qe(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(a){var l=o[a];l===!1?i.removeAttribute(a):i.setAttribute(a,l===!0?"":l)}))})}function Kl(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},a=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=a.reduce(function(c,u){return c[u]="",c},{});!Ae(o)||!qe(o)||(Object.assign(o.style,l),Object.keys(i).forEach(function(c){o.removeAttribute(c)}))})}}const Yl={name:"applyStyles",enabled:!0,phase:"write",fn:Xl,effect:Kl,requires:["computeStyles"]};function ze(e){return e.split("-")[0]}var gt=Math.max,In=Math.min,jt=Math.round;function kr(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ji(){return!/^((?!chrome|android).)*safari/i.test(kr())}function At(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&Ae(e)&&(o=e.offsetWidth>0&&jt(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&jt(r.height)/e.offsetHeight||1);var a=xt(e)?_e(e):window,l=a.visualViewport,c=!Ji()&&n,u=(r.left+(c&&l?l.offsetLeft:0))/o,d=(r.top+(c&&l?l.offsetTop:0))/i,f=r.width/o,p=r.height/i;return{width:f,height:p,top:d,right:u+f,bottom:d+p,left:u,x:u,y:d}}function Lr(e){var t=At(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Zi(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Br(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function Je(e){return _e(e).getComputedStyle(e)}function Jl(e){return["table","td","th"].indexOf(qe(e))>=0}function st(e){return((xt(e)?e.ownerDocument:e.document)||window.document).documentElement}function Vn(e){return qe(e)==="html"?e:e.assignedSlot||e.parentNode||(Br(e)?e.host:null)||st(e)}function Vo(e){return!Ae(e)||Je(e).position==="fixed"?null:e.offsetParent}function Zl(e){var t=/firefox/i.test(kr()),n=/Trident/i.test(kr());if(n&&Ae(e)){var r=Je(e);if(r.position==="fixed")return null}var o=Vn(e);for(Br(o)&&(o=o.host);Ae(o)&&["html","body"].indexOf(qe(o))<0;){var i=Je(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function hn(e){for(var t=_e(e),n=Vo(e);n&&Jl(n)&&Je(n).position==="static";)n=Vo(n);return n&&(qe(n)==="html"||qe(n)==="body"&&Je(n).position==="static")?t:n||Zl(e)||t}function Fr(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function tn(e,t,n){return gt(e,In(t,n))}function Ql(e,t,n){var r=tn(e,t,n);return r>n?n:r}function Qi(){return{top:0,right:0,bottom:0,left:0}}function es(e){return Object.assign({},Qi(),e)}function ts(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var ec=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,es(typeof t!="number"?t:ts(t,fn))};function tc(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,l=ze(n.placement),c=Fr(l),u=[Pe,Le].indexOf(l)>=0,d=u?"height":"width";if(!(!i||!a)){var f=ec(o.padding,n),p=Lr(i),v=c==="y"?Ce:Pe,b=c==="y"?Be:Le,h=n.rects.reference[d]+n.rects.reference[c]-a[c]-n.rects.popper[d],m=a[c]-n.rects.reference[c],T=hn(i),$=T?c==="y"?T.clientHeight||0:T.clientWidth||0:0,x=h/2-m/2,w=f[v],g=$-p[d]-f[b],S=$/2-p[d]/2+x,C=tn(w,S,g),j=c;n.modifiersData[r]=(t={},t[j]=C,t.centerOffset=C-S,t)}}function nc(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Zi(t.elements.popper,o)&&(t.elements.arrow=o))}const rc={name:"arrow",enabled:!0,phase:"main",fn:tc,effect:nc,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Dt(e){return e.split("-")[1]}var oc={top:"auto",right:"auto",bottom:"auto",left:"auto"};function ic(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:jt(n*o)/o||0,y:jt(r*o)/o||0}}function zo(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,a=e.offsets,l=e.position,c=e.gpuAcceleration,u=e.adaptive,d=e.roundOffsets,f=e.isFixed,p=a.x,v=p===void 0?0:p,b=a.y,h=b===void 0?0:b,m=typeof d=="function"?d({x:v,y:h}):{x:v,y:h};v=m.x,h=m.y;var T=a.hasOwnProperty("x"),$=a.hasOwnProperty("y"),x=Pe,w=Ce,g=window;if(u){var S=hn(n),C="clientHeight",j="clientWidth";if(S===_e(n)&&(S=st(n),Je(S).position!=="static"&&l==="absolute"&&(C="scrollHeight",j="scrollWidth")),S=S,o===Ce||(o===Pe||o===Le)&&i===an){w=Be;var I=f&&S===g&&g.visualViewport?g.visualViewport.height:S[C];h-=I-r.height,h*=c?1:-1}if(o===Pe||(o===Ce||o===Be)&&i===an){x=Le;var A=f&&S===g&&g.visualViewport?g.visualViewport.width:S[j];v-=A-r.width,v*=c?1:-1}}var B=Object.assign({position:l},u&&oc),z=d===!0?ic({x:v,y:h},_e(n)):{x:v,y:h};if(v=z.x,h=z.y,c){var W;return Object.assign({},B,(W={},W[w]=$?"0":"",W[x]=T?"0":"",W.transform=(g.devicePixelRatio||1)<=1?"translate("+v+"px, "+h+"px)":"translate3d("+v+"px, "+h+"px, 0)",W))}return Object.assign({},B,(t={},t[w]=$?h+"px":"",t[x]=T?v+"px":"",t.transform="",t))}function sc(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,a=i===void 0?!0:i,l=n.roundOffsets,c=l===void 0?!0:l,u={placement:ze(t.placement),variation:Dt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,zo(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,zo(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const ac={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:sc,data:{}};var En={passive:!0};function lc(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,a=r.resize,l=a===void 0?!0:a,c=_e(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&u.forEach(function(d){d.addEventListener("scroll",n.update,En)}),l&&c.addEventListener("resize",n.update,En),function(){i&&u.forEach(function(d){d.removeEventListener("scroll",n.update,En)}),l&&c.removeEventListener("resize",n.update,En)}}const cc={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:lc,data:{}};var uc={left:"right",right:"left",bottom:"top",top:"bottom"};function Sn(e){return e.replace(/left|right|bottom|top/g,function(t){return uc[t]})}var dc={start:"end",end:"start"};function Uo(e){return e.replace(/start|end/g,function(t){return dc[t]})}function Vr(e){var t=_e(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function zr(e){return At(st(e)).left+Vr(e).scrollLeft}function pc(e,t){var n=_e(e),r=st(e),o=n.visualViewport,i=r.clientWidth,a=r.clientHeight,l=0,c=0;if(o){i=o.width,a=o.height;var u=Ji();(u||!u&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:i,height:a,x:l+zr(e),y:c}}function fc(e){var t,n=st(e),r=Vr(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=gt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=gt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+zr(e),c=-r.scrollTop;return Je(o||n).direction==="rtl"&&(l+=gt(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:l,y:c}}function Ur(e){var t=Je(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function ns(e){return["html","body","#document"].indexOf(qe(e))>=0?e.ownerDocument.body:Ae(e)&&Ur(e)?e:ns(Vn(e))}function nn(e,t){var n;t===void 0&&(t=[]);var r=ns(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=_e(r),a=o?[i].concat(i.visualViewport||[],Ur(r)?r:[]):r,l=t.concat(a);return o?l:l.concat(nn(Vn(a)))}function Or(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function hc(e,t){var n=At(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function qo(e,t,n){return t===Ki?Or(pc(e,n)):xt(t)?hc(t,n):Or(fc(st(e)))}function mc(e){var t=nn(Vn(e)),n=["absolute","fixed"].indexOf(Je(e).position)>=0,r=n&&Ae(e)?hn(e):e;return xt(r)?t.filter(function(o){return xt(o)&&Zi(o,r)&&qe(o)!=="body"}):[]}function gc(e,t,n,r){var o=t==="clippingParents"?mc(e):[].concat(t),i=[].concat(o,[n]),a=i[0],l=i.reduce(function(c,u){var d=qo(e,u,r);return c.top=gt(d.top,c.top),c.right=In(d.right,c.right),c.bottom=In(d.bottom,c.bottom),c.left=gt(d.left,c.left),c},qo(e,a,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function rs(e){var t=e.reference,n=e.element,r=e.placement,o=r?ze(r):null,i=r?Dt(r):null,a=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Ce:c={x:a,y:t.y-n.height};break;case Be:c={x:a,y:t.y+t.height};break;case Le:c={x:t.x+t.width,y:l};break;case Pe:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var u=o?Fr(o):null;if(u!=null){var d=u==="y"?"height":"width";switch(i){case It:c[u]=c[u]-(t[d]/2-n[d]/2);break;case an:c[u]=c[u]+(t[d]/2-n[d]/2);break}}return c}function ln(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,a=i===void 0?e.strategy:i,l=n.boundary,c=l===void 0?Al:l,u=n.rootBoundary,d=u===void 0?Ki:u,f=n.elementContext,p=f===void 0?Wt:f,v=n.altBoundary,b=v===void 0?!1:v,h=n.padding,m=h===void 0?0:h,T=es(typeof m!="number"?m:ts(m,fn)),$=p===Wt?Dl:Wt,x=e.rects.popper,w=e.elements[b?$:p],g=gc(xt(w)?w:w.contextElement||st(e.elements.popper),c,d,a),S=At(e.elements.reference),C=rs({reference:S,element:x,strategy:"absolute",placement:o}),j=Or(Object.assign({},x,C)),I=p===Wt?j:S,A={top:g.top-I.top+T.top,bottom:I.bottom-g.bottom+T.bottom,left:g.left-I.left+T.left,right:I.right-g.right+T.right},B=e.modifiersData.offset;if(p===Wt&&B){var z=B[o];Object.keys(A).forEach(function(W){var L=[Le,Be].indexOf(W)>=0?1:-1,_=[Ce,Be].indexOf(W)>=0?"y":"x";A[W]+=z[_]*L})}return A}function bc(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,u=c===void 0?Yi:c,d=Dt(r),f=d?l?Fo:Fo.filter(function(b){return Dt(b)===d}):fn,p=f.filter(function(b){return u.indexOf(b)>=0});p.length===0&&(p=f);var v=p.reduce(function(b,h){return b[h]=ln(e,{placement:h,boundary:o,rootBoundary:i,padding:a})[ze(h)],b},{});return Object.keys(v).sort(function(b,h){return v[b]-v[h]})}function vc(e){if(ze(e)===Dr)return[];var t=Sn(e);return[Uo(e),t,Uo(t)]}function yc(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!0:a,c=n.fallbackPlacements,u=n.padding,d=n.boundary,f=n.rootBoundary,p=n.altBoundary,v=n.flipVariations,b=v===void 0?!0:v,h=n.allowedAutoPlacements,m=t.options.placement,T=ze(m),$=T===m,x=c||($||!b?[Sn(m)]:vc(m)),w=[m].concat(x).reduce(function(F,U){return F.concat(ze(U)===Dr?bc(t,{placement:U,boundary:d,rootBoundary:f,padding:u,flipVariations:b,allowedAutoPlacements:h}):U)},[]),g=t.rects.reference,S=t.rects.popper,C=new Map,j=!0,I=w[0],A=0;A<w.length;A++){var B=w[A],z=ze(B),W=Dt(B)===It,L=[Ce,Be].indexOf(z)>=0,_=L?"width":"height",R=ln(t,{placement:B,boundary:d,rootBoundary:f,altBoundary:p,padding:u}),D=L?W?Le:Pe:W?Be:Ce;g[_]>S[_]&&(D=Sn(D));var Q=Sn(D),Z=[];if(i&&Z.push(R[z]<=0),l&&Z.push(R[D]<=0,R[Q]<=0),Z.every(function(F){return F})){I=B,j=!1;break}C.set(B,Z)}if(j)for(var O=b?3:1,M=function(U){var H=w.find(function(G){var q=C.get(G);if(q)return q.slice(0,U).every(function(K){return K})});if(H)return I=H,"break"},V=O;V>0;V--){var X=M(V);if(X==="break")break}t.placement!==I&&(t.modifiersData[r]._skip=!0,t.placement=I,t.reset=!0)}}const xc={name:"flip",enabled:!0,phase:"main",fn:yc,requiresIfExists:["offset"],data:{_skip:!1}};function Ho(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Wo(e){return[Ce,Le,Be,Pe].some(function(t){return e[t]>=0})}function wc(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=ln(t,{elementContext:"reference"}),l=ln(t,{altBoundary:!0}),c=Ho(a,r),u=Ho(l,o,i),d=Wo(c),f=Wo(u);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:u,isReferenceHidden:d,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":d,"data-popper-escaped":f})}const Ec={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:wc};function Tc(e,t,n){var r=ze(e),o=[Pe,Ce].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,a=i[0],l=i[1];return a=a||0,l=(l||0)*o,[Pe,Le].indexOf(r)>=0?{x:l,y:a}:{x:a,y:l}}function kc(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,a=Yi.reduce(function(d,f){return d[f]=Tc(f,t.rects,i),d},{}),l=a[t.placement],c=l.x,u=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=u),t.modifiersData[r]=a}const Oc={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:kc};function Sc(e){var t=e.state,n=e.name;t.modifiersData[n]=rs({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Cc={name:"popperOffsets",enabled:!0,phase:"read",fn:Sc,data:{}};function Pc(e){return e==="x"?"y":"x"}function Rc(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!1:a,c=n.boundary,u=n.rootBoundary,d=n.altBoundary,f=n.padding,p=n.tether,v=p===void 0?!0:p,b=n.tetherOffset,h=b===void 0?0:b,m=ln(t,{boundary:c,rootBoundary:u,padding:f,altBoundary:d}),T=ze(t.placement),$=Dt(t.placement),x=!$,w=Fr(T),g=Pc(w),S=t.modifiersData.popperOffsets,C=t.rects.reference,j=t.rects.popper,I=typeof h=="function"?h(Object.assign({},t.rects,{placement:t.placement})):h,A=typeof I=="number"?{mainAxis:I,altAxis:I}:Object.assign({mainAxis:0,altAxis:0},I),B=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,z={x:0,y:0};if(S){if(i){var W,L=w==="y"?Ce:Pe,_=w==="y"?Be:Le,R=w==="y"?"height":"width",D=S[w],Q=D+m[L],Z=D-m[_],O=v?-j[R]/2:0,M=$===It?C[R]:j[R],V=$===It?-j[R]:-C[R],X=t.elements.arrow,F=v&&X?Lr(X):{width:0,height:0},U=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Qi(),H=U[L],G=U[_],q=tn(0,C[R],F[R]),K=x?C[R]/2-O-q-H-A.mainAxis:M-q-H-A.mainAxis,Y=x?-C[R]/2+O+q+G+A.mainAxis:V+q+G+A.mainAxis,re=t.elements.arrow&&hn(t.elements.arrow),N=re?w==="y"?re.clientTop||0:re.clientLeft||0:0,J=(W=B==null?void 0:B[w])!=null?W:0,P=D+K-J-N,oe=D+Y-J,ye=tn(v?In(Q,P):Q,D,v?gt(Z,oe):Z);S[w]=ye,z[w]=ye-D}if(l){var ke,me=w==="x"?Ce:Pe,lt=w==="x"?Be:Le,Oe=S[g],We=g==="y"?"height":"width",Re=Oe+m[me],Ge=Oe-m[lt],xe=[Ce,Pe].indexOf(T)!==-1,Et=(ke=B==null?void 0:B[g])!=null?ke:0,ct=xe?Re:Oe-C[We]-j[We]-Et+A.altAxis,Ft=xe?Oe+C[We]+j[We]-Et-A.altAxis:Ge,vn=v&&xe?Ql(ct,Oe,Ft):tn(v?ct:Re,Oe,v?Ft:Ge);S[g]=vn,z[g]=vn-Oe}t.modifiersData[r]=z}}const Nc={name:"preventOverflow",enabled:!0,phase:"main",fn:Rc,requiresIfExists:["offset"]};function $c(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Mc(e){return e===_e(e)||!Ae(e)?Vr(e):$c(e)}function _c(e){var t=e.getBoundingClientRect(),n=jt(t.width)/e.offsetWidth||1,r=jt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Ic(e,t,n){n===void 0&&(n=!1);var r=Ae(t),o=Ae(t)&&_c(t),i=st(t),a=At(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((qe(t)!=="body"||Ur(i))&&(l=Mc(t)),Ae(t)?(c=At(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):i&&(c.x=zr(i))),{x:a.left+l.scrollLeft-c.x,y:a.top+l.scrollTop-c.y,width:a.width,height:a.height}}function jc(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var a=[].concat(i.requires||[],i.requiresIfExists||[]);a.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function Ac(e){var t=jc(e);return Gl.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Dc(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Bc(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var Go={placement:"bottom",modifiers:[],strategy:"absolute"};function Xo(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Lc(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?Go:o;return function(l,c,u){u===void 0&&(u=i);var d={placement:"bottom",orderedModifiers:[],options:Object.assign({},Go,i),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},f=[],p=!1,v={state:d,setOptions:function(T){var $=typeof T=="function"?T(d.options):T;h(),d.options=Object.assign({},i,d.options,$),d.scrollParents={reference:xt(l)?nn(l):l.contextElement?nn(l.contextElement):[],popper:nn(c)};var x=Ac(Bc([].concat(r,d.options.modifiers)));return d.orderedModifiers=x.filter(function(w){return w.enabled}),b(),v.update()},forceUpdate:function(){if(!p){var T=d.elements,$=T.reference,x=T.popper;if(Xo($,x)){d.rects={reference:Ic($,hn(x),d.options.strategy==="fixed"),popper:Lr(x)},d.reset=!1,d.placement=d.options.placement,d.orderedModifiers.forEach(function(A){return d.modifiersData[A.name]=Object.assign({},A.data)});for(var w=0;w<d.orderedModifiers.length;w++){if(d.reset===!0){d.reset=!1,w=-1;continue}var g=d.orderedModifiers[w],S=g.fn,C=g.options,j=C===void 0?{}:C,I=g.name;typeof S=="function"&&(d=S({state:d,options:j,name:I,instance:v})||d)}}}},update:Dc(function(){return new Promise(function(m){v.forceUpdate(),m(d)})}),destroy:function(){h(),p=!0}};if(!Xo(l,c))return v;v.setOptions(u).then(function(m){!p&&u.onFirstUpdate&&u.onFirstUpdate(m)});function b(){d.orderedModifiers.forEach(function(m){var T=m.name,$=m.options,x=$===void 0?{}:$,w=m.effect;if(typeof w=="function"){var g=w({state:d,name:T,instance:v,options:x}),S=function(){};f.push(g||S)}})}function h(){f.forEach(function(m){return m()}),f=[]}return v}}var Fc=[cc,Cc,ac,Yl,Oc,xc,Nc,rc,Ec],Vc=Lc({defaultModifiers:Fc});const os="Popper";function zc(e){return Xi(os,e)}yl(os,["root"]);const Uc=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],qc=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Hc(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function jn(e){return typeof e=="function"?e():e}function zn(e){return e.nodeType!==void 0}function Wc(e){return!zn(e)}const Gc=()=>et({root:["root"]},fl(zc)),Xc={},Kc=E.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:a,disablePortal:l,modifiers:c,open:u,placement:d,popperOptions:f,popperRef:p,slotProps:v={},slots:b={},TransitionProps:h}=t,m=ue(t,Uc),T=E.useRef(null),$=De(T,n),x=E.useRef(null),w=De(x,p),g=E.useRef(w);vt(()=>{g.current=w},[w]),E.useImperativeHandle(p,()=>x.current,[]);const S=Hc(d,a),[C,j]=E.useState(S),[I,A]=E.useState(jn(o));E.useEffect(()=>{x.current&&x.current.forceUpdate()}),E.useEffect(()=>{o&&A(jn(o))},[o]),vt(()=>{if(!I||!u)return;const _=Q=>{j(Q.placement)};if(process.env.NODE_ENV!=="production"&&I&&zn(I)&&I.nodeType===1){const Q=I.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Q.top===0&&Q.left===0&&Q.right===0&&Q.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let R=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:Q})=>{_(Q)}}];c!=null&&(R=R.concat(c)),f&&f.modifiers!=null&&(R=R.concat(f.modifiers));const D=Vc(I,T.current,k({placement:S},f,{modifiers:R}));return g.current(D),()=>{D.destroy(),g.current(null)}},[I,l,c,u,f,S]);const B={placement:C};h!==null&&(B.TransitionProps=h);const z=Gc(),W=(r=b.root)!=null?r:"div",L=yt({elementType:W,externalSlotProps:v.root,externalForwardedProps:m,additionalProps:{role:"tooltip",ref:$},ownerState:t,className:z.root});return y.jsx(W,k({},L,{children:typeof i=="function"?i(B):i}))}),is=E.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:a="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:u,open:d,placement:f="bottom",popperOptions:p=Xc,popperRef:v,style:b,transition:h=!1,slotProps:m={},slots:T={}}=t,$=ue(t,qc),[x,w]=E.useState(!0),g=()=>{w(!1)},S=()=>{w(!0)};if(!c&&!d&&(!h||x))return null;let C;if(i)C=i;else if(r){const A=jn(r);C=A&&zn(A)?Ee(A).body:Ee(null).body}const j=!d&&c&&(!h||x)?"none":void 0,I=h?{in:d,onEnter:g,onExited:S}:void 0;return y.jsx(sn,{disablePortal:l,container:C,children:y.jsx(Kc,k({anchorEl:r,direction:a,disablePortal:l,modifiers:u,ref:n,open:h?!x:d,placement:f,popperOptions:p,popperRef:v,slotProps:m,slots:T},$,{style:k({position:"fixed",top:0,left:0,display:j},b),TransitionProps:I,children:o}))})});process.env.NODE_ENV!=="production"&&(is.propTypes={anchorEl:Lt(s.oneOfType([Ye,s.object,s.func]),e=>{if(e.open){const t=jn(e.anchorEl);if(t&&zn(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Wc(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:s.oneOfType([s.node,s.func]),container:s.oneOfType([Ye,s.func]),direction:s.oneOf(["ltr","rtl"]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:Ar,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),transition:s.bool});const Yc=["values","unit","step"],Jc=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>k({},n,{[r.key]:r.val}),{})};function Zc(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=ue(e,Yc),i=Jc(t),a=Object.keys(i);function l(p){return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n})`}function c(p){return`@media (max-width:${(typeof t[p]=="number"?t[p]:p)-r/100}${n})`}function u(p,v){const b=a.indexOf(v);return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n}) and (max-width:${(b!==-1&&typeof t[a[b]]=="number"?t[a[b]]:v)-r/100}${n})`}function d(p){return a.indexOf(p)+1<a.length?u(p,a[a.indexOf(p)+1]):l(p)}function f(p){const v=a.indexOf(p);return v===0?l(a[1]):v===a.length-1?c(a[v]):u(p,a[a.indexOf(p)+1]).replace("@media","@media not all and")}return k({keys:a,values:i,up:l,down:c,between:u,only:d,not:f,unit:n},o)}const Qc={borderRadius:4},eu=Qc,tu=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.string,s.object,s.array]):{},at=tu;function rn(e,t){return t?Ke(e,t,{clone:!1}):e}const qr={xs:0,sm:600,md:900,lg:1200,xl:1536},Ko={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${qr[e]}px)`};function Ze(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||Ko;return t.reduce((a,l,c)=>(a[i.up(i.keys[c])]=n(t[c]),a),{})}if(typeof t=="object"){const i=r.breakpoints||Ko;return Object.keys(t).reduce((a,l)=>{if(Object.keys(i.values||qr).indexOf(l)!==-1){const c=i.up(l);a[c]=n(t[l],l)}else{const c=l;a[c]=t[c]}return a},{})}return n(t)}function nu(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function ru(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Un(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function An(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Un(e,n)||r,t&&(o=t(o,r,e)),o}function ve(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=a=>{if(a[t]==null)return null;const l=a[t],c=a.theme,u=Un(c,r)||{};return Ze(a,l,f=>{let p=An(u,o,f);return f===p&&typeof f=="string"&&(p=An(u,o,`${t}${f==="default"?"":Ue(f)}`,f)),n===!1?p:{[n]:p}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:at}:{},i.filterProps=[t],i}function ou(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const iu={m:"margin",p:"padding"},su={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Yo={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},au=ou(e=>{if(e.length>2)if(Yo[e])e=Yo[e];else return[e];const[t,n]=e.split(""),r=iu[t],o=su[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),qn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Hn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],lu=[...qn,...Hn];function mn(e,t,n,r){var o;const i=(o=Un(e,t,!1))!=null?o:n;return typeof i=="number"?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&typeof a!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`),i*a):Array.isArray(i)?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&(Number.isInteger(a)?a>i.length-1&&console.error([`MUI: The value provided (${a}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${a} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[a]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function ss(e){return mn(e,"spacing",8,"spacing")}function gn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function cu(e,t){return n=>e.reduce((r,o)=>(r[o]=gn(t,n),r),{})}function uu(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=au(n),i=cu(o,r),a=e[n];return Ze(e,a,i)}function as(e,t){const n=ss(e.theme);return Object.keys(e).map(r=>uu(e,t,r,n)).reduce(rn,{})}function fe(e){return as(e,qn)}fe.propTypes=process.env.NODE_ENV!=="production"?qn.reduce((e,t)=>(e[t]=at,e),{}):{};fe.filterProps=qn;function he(e){return as(e,Hn)}he.propTypes=process.env.NODE_ENV!=="production"?Hn.reduce((e,t)=>(e[t]=at,e),{}):{};he.filterProps=Hn;process.env.NODE_ENV!=="production"&&lu.reduce((e,t)=>(e[t]=at,e),{});function du(e=8){if(e.mui)return e;const t=ss({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const a=t(i);return typeof a=="number"?`${a}px`:a}).join(" "));return n.mui=!0,n}function Wn(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?rn(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function je(e){return typeof e!="number"?e:`${e}px solid`}function Fe(e,t){return ve({prop:e,themeKey:"borders",transform:t})}const pu=Fe("border",je),fu=Fe("borderTop",je),hu=Fe("borderRight",je),mu=Fe("borderBottom",je),gu=Fe("borderLeft",je),bu=Fe("borderColor"),vu=Fe("borderTopColor"),yu=Fe("borderRightColor"),xu=Fe("borderBottomColor"),wu=Fe("borderLeftColor"),Eu=Fe("outline",je),Tu=Fe("outlineColor"),Gn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=mn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:gn(t,r)});return Ze(e,e.borderRadius,n)}return null};Gn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:at}:{};Gn.filterProps=["borderRadius"];Wn(pu,fu,hu,mu,gu,bu,vu,yu,xu,wu,Gn,Eu,Tu);const Xn=e=>{if(e.gap!==void 0&&e.gap!==null){const t=mn(e.theme,"spacing",8,"gap"),n=r=>({gap:gn(t,r)});return Ze(e,e.gap,n)}return null};Xn.propTypes=process.env.NODE_ENV!=="production"?{gap:at}:{};Xn.filterProps=["gap"];const Kn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=mn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:gn(t,r)});return Ze(e,e.columnGap,n)}return null};Kn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:at}:{};Kn.filterProps=["columnGap"];const Yn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=mn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:gn(t,r)});return Ze(e,e.rowGap,n)}return null};Yn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:at}:{};Yn.filterProps=["rowGap"];const ku=ve({prop:"gridColumn"}),Ou=ve({prop:"gridRow"}),Su=ve({prop:"gridAutoFlow"}),Cu=ve({prop:"gridAutoColumns"}),Pu=ve({prop:"gridAutoRows"}),Ru=ve({prop:"gridTemplateColumns"}),Nu=ve({prop:"gridTemplateRows"}),$u=ve({prop:"gridTemplateAreas"}),Mu=ve({prop:"gridArea"});Wn(Xn,Kn,Yn,ku,Ou,Su,Cu,Pu,Ru,Nu,$u,Mu);function $t(e,t){return t==="grey"?t:e}const _u=ve({prop:"color",themeKey:"palette",transform:$t}),Iu=ve({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:$t}),ju=ve({prop:"backgroundColor",themeKey:"palette",transform:$t});Wn(_u,Iu,ju);function Me(e){return e<=1&&e!==0?`${e*100}%`:e}const Au=ve({prop:"width",transform:Me}),Hr=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||qr[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:Me(n)}};return Ze(e,e.maxWidth,t)}return null};Hr.filterProps=["maxWidth"];const Du=ve({prop:"minWidth",transform:Me}),Bu=ve({prop:"height",transform:Me}),Lu=ve({prop:"maxHeight",transform:Me}),Fu=ve({prop:"minHeight",transform:Me});ve({prop:"size",cssProperty:"width",transform:Me});ve({prop:"size",cssProperty:"height",transform:Me});const Vu=ve({prop:"boxSizing"});Wn(Au,Hr,Du,Bu,Lu,Fu,Vu);const zu={border:{themeKey:"borders",transform:je},borderTop:{themeKey:"borders",transform:je},borderRight:{themeKey:"borders",transform:je},borderBottom:{themeKey:"borders",transform:je},borderLeft:{themeKey:"borders",transform:je},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:je},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Gn},color:{themeKey:"palette",transform:$t},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:$t},backgroundColor:{themeKey:"palette",transform:$t},p:{style:he},pt:{style:he},pr:{style:he},pb:{style:he},pl:{style:he},px:{style:he},py:{style:he},padding:{style:he},paddingTop:{style:he},paddingRight:{style:he},paddingBottom:{style:he},paddingLeft:{style:he},paddingX:{style:he},paddingY:{style:he},paddingInline:{style:he},paddingInlineStart:{style:he},paddingInlineEnd:{style:he},paddingBlock:{style:he},paddingBlockStart:{style:he},paddingBlockEnd:{style:he},m:{style:fe},mt:{style:fe},mr:{style:fe},mb:{style:fe},ml:{style:fe},mx:{style:fe},my:{style:fe},margin:{style:fe},marginTop:{style:fe},marginRight:{style:fe},marginBottom:{style:fe},marginLeft:{style:fe},marginX:{style:fe},marginY:{style:fe},marginInline:{style:fe},marginInlineStart:{style:fe},marginInlineEnd:{style:fe},marginBlock:{style:fe},marginBlockStart:{style:fe},marginBlockEnd:{style:fe},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Xn},rowGap:{style:Yn},columnGap:{style:Kn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Me},maxWidth:{style:Hr},minWidth:{transform:Me},height:{transform:Me},maxHeight:{transform:Me},minHeight:{transform:Me},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Wr=zu;function Uu(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function qu(e,t){return typeof e=="function"?e(t):e}function Hu(){function e(n,r,o,i){const a={[n]:r,theme:o},l=i[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:u,transform:d,style:f}=l;if(r==null)return null;if(u==="typography"&&r==="inherit")return{[n]:r};const p=Un(o,u)||{};return f?f(a):Ze(a,r,b=>{let h=An(p,d,b);return b===h&&typeof b=="string"&&(h=An(p,d,`${n}${b==="default"?"":Ue(b)}`,b)),c===!1?h:{[c]:h}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const a=(r=i.unstable_sxConfig)!=null?r:Wr;function l(c){let u=c;if(typeof c=="function")u=c(i);else if(typeof c!="object")return c;if(!u)return null;const d=nu(i.breakpoints),f=Object.keys(d);let p=d;return Object.keys(u).forEach(v=>{const b=qu(u[v],i);if(b!=null)if(typeof b=="object")if(a[v])p=rn(p,e(v,b,i,a));else{const h=Ze({theme:i},b,m=>({[v]:m}));Uu(h,b)?p[v]=t({sx:b,theme:i}):p=rn(p,h)}else p=rn(p,e(v,b,i,a))}),ru(f,p)}return Array.isArray(o)?o.map(l):l(o)}return t}const ls=Hu();ls.filterProps=["sx"];const Gr=ls;function Wu(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Gu=["breakpoints","palette","spacing","shape"];function Xr(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,a=ue(e,Gu),l=Zc(n),c=du(o);let u=Ke({breakpoints:l,direction:"ltr",components:{},palette:k({mode:"light"},r),spacing:c,shape:k({},eu,i)},a);return u.applyStyles=Wu,u=t.reduce((d,f)=>Ke(d,f),u),u.unstable_sxConfig=k({},Wr,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(f){return Gr({sx:f,theme:this})},u}function Xu(e){return Object.keys(e).length===0}function cs(e=null){const t=E.useContext(vr.ThemeContext);return!t||Xu(t)?e:t}const Ku=Xr();function us(e=Ku){return cs(e)}const Yu=["ownerState"],Ju=["variants"],Zu=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Qu(e){return Object.keys(e).length===0}function ed(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Cn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const td=Xr(),Jo=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Tn({defaultTheme:e,theme:t,themeId:n}){return Qu(t)?e:t[n]||t}function nd(e){return e?(t,n)=>n[e]:null}function Pn(e,t){let{ownerState:n}=t,r=ue(t,Yu);const o=typeof e=="function"?e(k({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>Pn(i,k({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let l=ue(o,Ju);return i.forEach(c=>{let u=!0;typeof c.props=="function"?u=c.props(k({ownerState:n},r,n)):Object.keys(c.props).forEach(d=>{(n==null?void 0:n[d])!==c.props[d]&&r[d]!==c.props[d]&&(u=!1)}),u&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(k({ownerState:n},r,n)):c.style))}),l}return o}function rd(e={}){const{themeId:t,defaultTheme:n=td,rootShouldForwardProp:r=Cn,slotShouldForwardProp:o=Cn}=e,i=a=>Gr(k({},a,{theme:Tn(k({},a,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(a,l={})=>{vr.internal_processStyles(a,g=>g.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:c,slot:u,skipVariantsResolver:d,skipSx:f,overridesResolver:p=nd(Jo(u))}=l,v=ue(l,Zu),b=d!==void 0?d:u&&u!=="Root"&&u!=="root"||!1,h=f||!1;let m;process.env.NODE_ENV!=="production"&&c&&(m=`${c}-${Jo(u||"Root")}`);let T=Cn;u==="Root"||u==="root"?T=r:u?T=o:ed(a)&&(T=void 0);const $=vr(a,k({shouldForwardProp:T,label:m},v)),x=g=>typeof g=="function"&&g.__emotion_real!==g||ht(g)?S=>Pn(g,k({},S,{theme:Tn({theme:S.theme,defaultTheme:n,themeId:t})})):g,w=(g,...S)=>{let C=x(g);const j=S?S.map(x):[];c&&p&&j.push(B=>{const z=Tn(k({},B,{defaultTheme:n,themeId:t}));if(!z.components||!z.components[c]||!z.components[c].styleOverrides)return null;const W=z.components[c].styleOverrides,L={};return Object.entries(W).forEach(([_,R])=>{L[_]=Pn(R,k({},B,{theme:z}))}),p(B,L)}),c&&!b&&j.push(B=>{var z;const W=Tn(k({},B,{defaultTheme:n,themeId:t})),L=W==null||(z=W.components)==null||(z=z[c])==null?void 0:z.variants;return Pn({variants:L},k({},B,{theme:W}))}),h||j.push(i);const I=j.length-S.length;if(Array.isArray(g)&&I>0){const B=new Array(I).fill("");C=[...g,...B],C.raw=[...g.raw,...B]}const A=$(C,...j);if(process.env.NODE_ENV!=="production"){let B;c&&(B=`${c}${Ue(u||"")}`),B===void 0&&(B=`Styled(${Va(a)})`),A.displayName=B}return a.muiName&&(A.muiName=a.muiName),A};return $.withConfig&&(w.withConfig=$.withConfig),w}}function od(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:zi(t.components[n].defaultProps,r)}function id({props:e,name:t,defaultTheme:n,themeId:r}){let o=us(n);return r&&(o=o[r]||o),od({theme:o,name:t,props:e})}function Kr(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),ul(e,t,n)}function sd(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function wt(e){if(e.type)return e;if(e.charAt(0)==="#")return wt(sd(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Mt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Mt(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function Jn(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function ad(e){e=wt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),a=(u,d=(u+n/30)%12)=>o-i*Math.max(Math.min(d-3,9-d,1),-1);let l="rgb";const c=[Math.round(a(0)*255),Math.round(a(8)*255),Math.round(a(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),Jn({type:l,values:c})}function Zo(e){e=wt(e);let t=e.type==="hsl"||e.type==="hsla"?wt(ad(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Qo(e,t){const n=Zo(e),r=Zo(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function Dn(e,t){return e=wt(e),t=Kr(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Jn(e)}function ld(e,t){if(e=wt(e),t=Kr(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return Jn(e)}function cd(e,t){if(e=wt(e),t=Kr(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return Jn(e)}function ud(e,t){return k({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const dd={black:"#000",white:"#fff"},cn=dd,pd={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},fd=pd,hd={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Tt=hd,md={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},kt=md,gd={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Gt=gd,bd={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ot=bd,vd={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},St=vd,yd={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Ct=yd,xd=["mode","contrastThreshold","tonalOffset"],ei={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:cn.white,default:cn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},dr={text:{primary:cn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:cn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function ti(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=cd(e.main,o):t==="dark"&&(e.dark=ld(e.main,i)))}function wd(e="light"){return e==="dark"?{main:Ot[200],light:Ot[50],dark:Ot[400]}:{main:Ot[700],light:Ot[400],dark:Ot[800]}}function Ed(e="light"){return e==="dark"?{main:Tt[200],light:Tt[50],dark:Tt[400]}:{main:Tt[500],light:Tt[300],dark:Tt[700]}}function Td(e="light"){return e==="dark"?{main:kt[500],light:kt[300],dark:kt[700]}:{main:kt[700],light:kt[400],dark:kt[800]}}function kd(e="light"){return e==="dark"?{main:St[400],light:St[300],dark:St[700]}:{main:St[700],light:St[500],dark:St[900]}}function Od(e="light"){return e==="dark"?{main:Ct[400],light:Ct[300],dark:Ct[700]}:{main:Ct[800],light:Ct[500],dark:Ct[900]}}function Sd(e="light"){return e==="dark"?{main:Gt[400],light:Gt[300],dark:Gt[700]}:{main:"#ed6c02",light:Gt[500],dark:Gt[900]}}function Cd(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=ue(e,xd),i=e.primary||wd(t),a=e.secondary||Ed(t),l=e.error||Td(t),c=e.info||kd(t),u=e.success||Od(t),d=e.warning||Sd(t);function f(h){const m=Qo(h,dr.text.primary)>=n?dr.text.primary:ei.text.primary;if(process.env.NODE_ENV!=="production"){const T=Qo(h,m);T<3&&console.error([`MUI: The contrast ratio of ${T}:1 for ${m} on ${h}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return m}const p=({color:h,name:m,mainShade:T=500,lightShade:$=300,darkShade:x=700})=>{if(h=k({},h),!h.main&&h[T]&&(h.main=h[T]),!h.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${m?` (${m})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${T}\` property.`:Mt(11,m?` (${m})`:"",T));if(typeof h.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${m?` (${m})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Mt(12,m?` (${m})`:"",JSON.stringify(h.main)));return ti(h,"light",$,r),ti(h,"dark",x,r),h.contrastText||(h.contrastText=f(h.main)),h},v={dark:dr,light:ei};return process.env.NODE_ENV!=="production"&&(v[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),Ke(k({common:k({},cn),mode:t,primary:p({color:i,name:"primary"}),secondary:p({color:a,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:p({color:l,name:"error"}),warning:p({color:d,name:"warning"}),info:p({color:c,name:"info"}),success:p({color:u,name:"success"}),grey:fd,contrastThreshold:n,getContrastText:f,augmentColor:p,tonalOffset:r},v[t]),o)}const Pd=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Rd(e){return Math.round(e*1e5)/1e5}const ni={textTransform:"uppercase"},ri='"Roboto", "Helvetica", "Arial", sans-serif';function Nd(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=ri,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:a=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:u=16,allVariants:d,pxToRem:f}=n,p=ue(n,Pd);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const v=o/14,b=f||(T=>`${T/u*v}rem`),h=(T,$,x,w,g)=>k({fontFamily:r,fontWeight:T,fontSize:b($),lineHeight:x},r===ri?{letterSpacing:`${Rd(w/$)}em`}:{},g,d),m={h1:h(i,96,1.167,-1.5),h2:h(i,60,1.2,-.5),h3:h(a,48,1.167,0),h4:h(a,34,1.235,.25),h5:h(a,24,1.334,0),h6:h(l,20,1.6,.15),subtitle1:h(a,16,1.75,.15),subtitle2:h(l,14,1.57,.1),body1:h(a,16,1.5,.15),body2:h(a,14,1.43,.15),button:h(l,14,1.75,.4,ni),caption:h(a,12,1.66,.4),overline:h(a,12,2.66,1,ni),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return Ke(k({htmlFontSize:u,pxToRem:b,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:a,fontWeightMedium:l,fontWeightBold:c},m),p,{clone:!1})}const $d=.2,Md=.14,_d=.12;function pe(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${$d})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Md})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${_d})`].join(",")}const Id=["none",pe(0,2,1,-1,0,1,1,0,0,1,3,0),pe(0,3,1,-2,0,2,2,0,0,1,5,0),pe(0,3,3,-2,0,3,4,0,0,1,8,0),pe(0,2,4,-1,0,4,5,0,0,1,10,0),pe(0,3,5,-1,0,5,8,0,0,1,14,0),pe(0,3,5,-1,0,6,10,0,0,1,18,0),pe(0,4,5,-2,0,7,10,1,0,2,16,1),pe(0,5,5,-3,0,8,10,1,0,3,14,2),pe(0,5,6,-3,0,9,12,1,0,3,16,2),pe(0,6,6,-3,0,10,14,1,0,4,18,3),pe(0,6,7,-4,0,11,15,1,0,4,20,3),pe(0,7,8,-4,0,12,17,2,0,5,22,4),pe(0,7,8,-4,0,13,19,2,0,5,24,4),pe(0,7,9,-4,0,14,21,2,0,5,26,4),pe(0,8,9,-5,0,15,22,2,0,6,28,5),pe(0,8,10,-5,0,16,24,2,0,6,30,5),pe(0,8,11,-5,0,17,26,2,0,6,32,5),pe(0,9,11,-5,0,18,28,2,0,7,34,6),pe(0,9,12,-6,0,19,29,2,0,7,36,6),pe(0,10,13,-6,0,20,31,3,0,8,38,7),pe(0,10,13,-6,0,21,33,3,0,8,40,7),pe(0,10,14,-6,0,22,35,3,0,8,42,7),pe(0,11,14,-7,0,23,36,3,0,9,44,8),pe(0,11,15,-7,0,24,38,3,0,9,46,8)],jd=Id,Ad=["duration","easing","delay"],Dd={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Bd={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function oi(e){return`${Math.round(e)}ms`}function Ld(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Fd(e){const t=k({},Dd,e.easing),n=k({},Bd,e.duration);return k({getAutoHeightDuration:Ld,create:(o=["all"],i={})=>{const{duration:a=n.standard,easing:l=t.easeInOut,delay:c=0}=i,u=ue(i,Ad);if(process.env.NODE_ENV!=="production"){const d=p=>typeof p=="string",f=p=>!isNaN(parseFloat(p));!d(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!f(a)&&!d(a)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`),d(l)||console.error('MUI: Argument "easing" must be a string.'),!f(c)&&!d(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(d=>`${d} ${typeof a=="string"?a:oi(a)} ${l} ${typeof c=="string"?c:oi(c)}`).join(",")}},e,{easing:t,duration:n})}const Vd={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},zd=Vd,Ud=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function qd(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,a=ue(e,Ud);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Mt(18));const l=Cd(r),c=Xr(e);let u=Ke(c,{mixins:ud(c.breakpoints,n),palette:l,shadows:jd.slice(),typography:Nd(l,i),transitions:Fd(o),zIndex:k({},zd)});if(u=Ke(u,a),u=t.reduce((d,f)=>Ke(d,f),u),process.env.NODE_ENV!=="production"){const d=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],f=(p,v)=>{let b;for(b in p){const h=p[b];if(d.indexOf(b)!==-1&&Object.keys(h).length>0){if(process.env.NODE_ENV!=="production"){const m=He("",b);console.error([`MUI: The \`${v}\` component increases the CSS specificity of the \`${b}\` internal state.`,"You can not override it like this: ",JSON.stringify(p,null,2),"",`Instead, you need to use the '&.${m}' syntax:`,JSON.stringify({root:{[`&.${m}`]:h}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}p[b]={}}}};Object.keys(u.components).forEach(p=>{const v=u.components[p].styleOverrides;v&&p.indexOf("Mui")===0&&f(v,p)})}return u.unstable_sxConfig=k({},Wr,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(f){return Gr({sx:f,theme:this})},u}const Hd=qd(),Yr=Hd,Jr="$$material",ds=e=>Cn(e)&&e!=="classes",Wd=rd({themeId:Jr,defaultTheme:Yr,rootShouldForwardProp:ds}),Te=Wd;function bn(){const e=us(Yr);return process.env.NODE_ENV!=="production"&&E.useDebugValue(e),e[Jr]||e}function tt({props:e,name:t}){return id({props:e,name:t,defaultTheme:Yr,themeId:Jr})}function Sr(e,t){return Sr=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},Sr(e,t)}function Gd(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Sr(e,t)}const ii={disabled:!1};var Xd=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.shape({enter:s.number,exit:s.number,appear:s.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&s.oneOfType([s.string,s.shape({enter:s.string,exit:s.string,active:s.string}),s.shape({enter:s.string,enterDone:s.string,enterActive:s.string,exit:s.string,exitDone:s.string,exitActive:s.string})]);const ps=ee.createContext(null);var Kd=function(t){return t.scrollTop},Qt="unmounted",dt="exited",pt="entering",Nt="entered",Cr="exiting",nt=function(e){Gd(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var a=o,l=a&&!a.isMounting?r.enter:r.appear,c;return i.appearStatus=null,r.in?l?(c=dt,i.appearStatus=pt):c=Nt:r.unmountOnExit||r.mountOnEnter?c=Qt:c=dt,i.state={status:c},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var a=o.in;return a&&i.status===Qt?{status:dt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var a=this.state.status;this.props.in?a!==pt&&a!==Nt&&(i=pt):(a===pt||a===Nt)&&(i=Cr)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,a,l;return i=a=l=o,o!=null&&typeof o!="number"&&(i=o.exit,a=o.enter,l=o.appear!==void 0?o.appear:a),{exit:i,enter:a,appear:l}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===pt){if(this.props.unmountOnExit||this.props.mountOnEnter){var a=this.props.nodeRef?this.props.nodeRef.current:Yt.findDOMNode(this);a&&Kd(a)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===dt&&this.setState({status:Qt})},n.performEnter=function(o){var i=this,a=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[Yt.findDOMNode(this),l],u=c[0],d=c[1],f=this.getTimeouts(),p=l?f.appear:f.enter;if(!o&&!a||ii.disabled){this.safeSetState({status:Nt},function(){i.props.onEntered(u)});return}this.props.onEnter(u,d),this.safeSetState({status:pt},function(){i.props.onEntering(u,d),i.onTransitionEnd(p,function(){i.safeSetState({status:Nt},function(){i.props.onEntered(u,d)})})})},n.performExit=function(){var o=this,i=this.props.exit,a=this.getTimeouts(),l=this.props.nodeRef?void 0:Yt.findDOMNode(this);if(!i||ii.disabled){this.safeSetState({status:dt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:Cr},function(){o.props.onExiting(l),o.onTransitionEnd(a.exit,function(){o.safeSetState({status:dt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,a=!0;return this.nextCallback=function(l){a&&(a=!1,i.nextCallback=null,o(l))},this.nextCallback.cancel=function(){a=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var a=this.props.nodeRef?this.props.nodeRef.current:Yt.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!a||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[a,this.nextCallback],u=c[0],d=c[1];this.props.addEndListener(u,d)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===Qt)return null;var i=this.props,a=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var l=ue(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return ee.createElement(ps.Provider,{value:null},typeof a=="function"?a(o,l):ee.cloneElement(ee.Children.only(a),l))},t}(ee.Component);nt.contextType=ps;nt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:s.shape({current:typeof Element>"u"?s.any:function(e,t,n,r,o,i){var a=e[t];return s.instanceOf(a&&"ownerDocument"in a?a.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:s.oneOfType([s.func.isRequired,s.element.isRequired]).isRequired,in:s.bool,mountOnEnter:s.bool,unmountOnExit:s.bool,appear:s.bool,enter:s.bool,exit:s.bool,timeout:function(t){var n=Xd;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:s.func,onEnter:s.func,onEntering:s.func,onEntered:s.func,onExit:s.func,onExiting:s.func,onExited:s.func}:{};function Pt(){}nt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Pt,onEntering:Pt,onEntered:Pt,onExit:Pt,onExiting:Pt,onExited:Pt};nt.UNMOUNTED=Qt;nt.EXITED=dt;nt.ENTERING=pt;nt.ENTERED=Nt;nt.EXITING=Cr;const fs=nt,hs=e=>e.scrollTop;function Bn(e,t){var n,r;const{timeout:o,easing:i,style:a={}}=e;return{duration:(n=a.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=a.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:a.transitionDelay}}const Yd=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function Pr(e){return`scale(${e}, ${e**2})`}const Jd={entering:{opacity:1,transform:Pr(1)},entered:{opacity:1,transform:"none"}},pr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Zr=E.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:a,in:l,onEnter:c,onEntered:u,onEntering:d,onExit:f,onExited:p,onExiting:v,style:b,timeout:h="auto",TransitionComponent:m=fs}=t,T=ue(t,Yd),$=Jt(),x=E.useRef(),w=bn(),g=E.useRef(null),S=De(g,i.ref,n),C=_=>R=>{if(_){const D=g.current;R===void 0?_(D):_(D,R)}},j=C(d),I=C((_,R)=>{hs(_);const{duration:D,delay:Q,easing:Z}=Bn({style:b,timeout:h,easing:a},{mode:"enter"});let O;h==="auto"?(O=w.transitions.getAutoHeightDuration(_.clientHeight),x.current=O):O=D,_.style.transition=[w.transitions.create("opacity",{duration:O,delay:Q}),w.transitions.create("transform",{duration:pr?O:O*.666,delay:Q,easing:Z})].join(","),c&&c(_,R)}),A=C(u),B=C(v),z=C(_=>{const{duration:R,delay:D,easing:Q}=Bn({style:b,timeout:h,easing:a},{mode:"exit"});let Z;h==="auto"?(Z=w.transitions.getAutoHeightDuration(_.clientHeight),x.current=Z):Z=R,_.style.transition=[w.transitions.create("opacity",{duration:Z,delay:D}),w.transitions.create("transform",{duration:pr?Z:Z*.666,delay:pr?D:D||Z*.333,easing:Q})].join(","),_.style.opacity=0,_.style.transform=Pr(.75),f&&f(_)}),W=C(p),L=_=>{h==="auto"&&$.start(x.current||0,_),r&&r(g.current,_)};return y.jsx(m,k({appear:o,in:l,nodeRef:g,onEnter:I,onEntered:A,onEntering:j,onExit:z,onExited:W,onExiting:B,addEndListener:L,timeout:h==="auto"?null:h},T,{children:(_,R)=>E.cloneElement(i,k({style:k({opacity:0,transform:Pr(.75),visibility:_==="exited"&&!l?"hidden":void 0},Jd[_],b,i.props.style),ref:S},R))}))});process.env.NODE_ENV!=="production"&&(Zr.propTypes={addEndListener:s.func,appear:s.bool,children:dn.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});Zr.muiSupportAuto=!0;const Rr=Zr,Zd=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},si=Zd,Qd=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],ep=Te(is,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),ms=E.forwardRef(function(t,n){var r;const o=cs(),i=tt({props:t,name:"MuiPopper"}),{anchorEl:a,component:l,components:c,componentsProps:u,container:d,disablePortal:f,keepMounted:p,modifiers:v,open:b,placement:h,popperOptions:m,popperRef:T,transition:$,slots:x,slotProps:w}=i,g=ue(i,Qd),S=(r=x==null?void 0:x.root)!=null?r:c==null?void 0:c.Root,C=k({anchorEl:a,container:d,disablePortal:f,keepMounted:p,modifiers:v,open:b,placement:h,popperOptions:m,popperRef:T,transition:$},g);return y.jsx(ep,k({as:l,direction:o==null?void 0:o.direction,slots:{root:S},slotProps:w??u},C,{ref:n}))});process.env.NODE_ENV!=="production"&&(ms.propTypes={anchorEl:s.oneOfType([Ye,s.object,s.func]),children:s.oneOfType([s.node,s.func]),component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Ye,s.func]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:Ar,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transition:s.bool});const gs=ms;function tp(e){return He("MuiTooltip",e)}const np=it("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),ot=np,rp=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function op(e){return Math.round(e*1e5)/1e5}const ip=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,a={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Ue(i.split("-")[0])}`],arrow:["arrow"]};return et(a,tp,t)},sp=Te(gs,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>k({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${ot.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${ot.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${ot.arrow}`]:k({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${ot.arrow}`]:k({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),ap=Te("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Ue(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>k({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:Dn(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${op(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${ot.popper}[data-popper-placement*="left"] &`]:k({transformOrigin:"right center"},t.isRtl?k({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):k({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${ot.popper}[data-popper-placement*="right"] &`]:k({transformOrigin:"left center"},t.isRtl?k({marginRight:"14px"},t.touch&&{marginRight:"24px"}):k({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${ot.popper}[data-popper-placement*="top"] &`]:k({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${ot.popper}[data-popper-placement*="bottom"] &`]:k({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),lp=Te("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:Dn(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let kn=!1;const ai=new pn;let Xt={x:0,y:0};function On(e,t){return n=>{t&&t(n),e(n)}}const bs=E.forwardRef(function(t,n){var r,o,i,a,l,c,u,d,f,p,v,b,h,m,T,$,x,w,g;const S=tt({props:t,name:"MuiTooltip"}),{arrow:C=!1,children:j,components:I={},componentsProps:A={},describeChild:B=!1,disableFocusListener:z=!1,disableHoverListener:W=!1,disableInteractive:L=!1,disableTouchListener:_=!1,enterDelay:R=100,enterNextDelay:D=0,enterTouchDelay:Q=700,followCursor:Z=!1,id:O,leaveDelay:M=0,leaveTouchDelay:V=1500,onClose:X,onOpen:F,open:U,placement:H="bottom",PopperComponent:G,PopperProps:q={},slotProps:K={},slots:Y={},title:re,TransitionComponent:N=Rr,TransitionProps:J}=S,P=ue(S,rp),oe=E.isValidElement(j)?j:y.jsx("span",{children:j}),ye=bn(),ke=ye.direction==="rtl",[me,lt]=E.useState(),[Oe,We]=E.useState(null),Re=E.useRef(!1),Ge=L||Z,xe=Jt(),Et=Jt(),ct=Jt(),Ft=Jt(),[vn,ro]=Ai({controlled:U,default:!1,name:"Tooltip",state:"open"});let Xe=vn;if(process.env.NODE_ENV!=="production"){const{current:te}=E.useRef(U!==void 0);E.useEffect(()=>{me&&me.disabled&&!te&&re!==""&&me.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[re,me,te])}const Zn=ji(O),Vt=E.useRef(),yn=on(()=>{Vt.current!==void 0&&(document.body.style.WebkitUserSelect=Vt.current,Vt.current=void 0),Ft.clear()});E.useEffect(()=>yn,[yn]);const oo=te=>{ai.clear(),kn=!0,ro(!0),F&&!Xe&&F(te)},xn=on(te=>{ai.start(800+M,()=>{kn=!1}),ro(!1),X&&Xe&&X(te),xe.start(ye.transitions.duration.shortest,()=>{Re.current=!1})}),Qn=te=>{Re.current&&te.type!=="touchstart"||(me&&me.removeAttribute("title"),Et.clear(),ct.clear(),R||kn&&D?Et.start(kn?D:R,()=>{oo(te)}):oo(te))},io=te=>{Et.clear(),ct.start(M,()=>{xn(te)})},{isFocusVisibleRef:so,onBlur:js,onFocus:As,ref:Ds}=Di(),[,ao]=E.useState(!1),lo=te=>{js(te),so.current===!1&&(ao(!1),io(te))},co=te=>{me||lt(te.currentTarget),As(te),so.current===!0&&(ao(!0),Qn(te))},uo=te=>{Re.current=!0;const Ne=oe.props;Ne.onTouchStart&&Ne.onTouchStart(te)},po=Qn,fo=io,Bs=te=>{uo(te),ct.clear(),xe.clear(),yn(),Vt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Ft.start(Q,()=>{document.body.style.WebkitUserSelect=Vt.current,Qn(te)})},Ls=te=>{oe.props.onTouchEnd&&oe.props.onTouchEnd(te),yn(),ct.start(V,()=>{xn(te)})};E.useEffect(()=>{if(!Xe)return;function te(Ne){(Ne.key==="Escape"||Ne.key==="Esc")&&xn(Ne)}return document.addEventListener("keydown",te),()=>{document.removeEventListener("keydown",te)}},[xn,Xe]);const Fs=De(oe.ref,Ds,lt,n);!re&&re!==0&&(Xe=!1);const er=E.useRef(),Vs=te=>{const Ne=oe.props;Ne.onMouseMove&&Ne.onMouseMove(te),Xt={x:te.clientX,y:te.clientY},er.current&&er.current.update()},zt={},tr=typeof re=="string";B?(zt.title=!Xe&&tr&&!W?re:null,zt["aria-describedby"]=Xe?Zn:null):(zt["aria-label"]=tr?re:null,zt["aria-labelledby"]=Xe&&!tr?Zn:null);const Ie=k({},zt,P,oe.props,{className:we(P.className,oe.props.className),onTouchStart:uo,ref:Fs},Z?{onMouseMove:Vs}:{});process.env.NODE_ENV!=="production"&&(Ie["data-mui-internal-clone-element"]=!0,E.useEffect(()=>{me&&!me.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[me]));const Ut={};_||(Ie.onTouchStart=Bs,Ie.onTouchEnd=Ls),W||(Ie.onMouseOver=On(po,Ie.onMouseOver),Ie.onMouseLeave=On(fo,Ie.onMouseLeave),Ge||(Ut.onMouseOver=po,Ut.onMouseLeave=fo)),z||(Ie.onFocus=On(co,Ie.onFocus),Ie.onBlur=On(lo,Ie.onBlur),Ge||(Ut.onFocus=co,Ut.onBlur=lo)),process.env.NODE_ENV!=="production"&&oe.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${oe.props.title}\` or the Tooltip component.`].join(`
`));const zs=E.useMemo(()=>{var te;let Ne=[{name:"arrow",enabled:!!Oe,options:{element:Oe,padding:4}}];return(te=q.popperOptions)!=null&&te.modifiers&&(Ne=Ne.concat(q.popperOptions.modifiers)),k({},q.popperOptions,{modifiers:Ne})},[Oe,q]),qt=k({},S,{isRtl:ke,arrow:C,disableInteractive:Ge,placement:H,PopperComponentProp:G,touch:Re.current}),nr=ip(qt),ho=(r=(o=Y.popper)!=null?o:I.Popper)!=null?r:sp,mo=(i=(a=(l=Y.transition)!=null?l:I.Transition)!=null?a:N)!=null?i:Rr,go=(c=(u=Y.tooltip)!=null?u:I.Tooltip)!=null?c:ap,bo=(d=(f=Y.arrow)!=null?f:I.Arrow)!=null?d:lp,Us=Zt(ho,k({},q,(p=K.popper)!=null?p:A.popper,{className:we(nr.popper,q==null?void 0:q.className,(v=(b=K.popper)!=null?b:A.popper)==null?void 0:v.className)}),qt),qs=Zt(mo,k({},J,(h=K.transition)!=null?h:A.transition),qt),Hs=Zt(go,k({},(m=K.tooltip)!=null?m:A.tooltip,{className:we(nr.tooltip,(T=($=K.tooltip)!=null?$:A.tooltip)==null?void 0:T.className)}),qt),Ws=Zt(bo,k({},(x=K.arrow)!=null?x:A.arrow,{className:we(nr.arrow,(w=(g=K.arrow)!=null?g:A.arrow)==null?void 0:w.className)}),qt);return y.jsxs(E.Fragment,{children:[E.cloneElement(oe,Ie),y.jsx(ho,k({as:G??gs,placement:H,anchorEl:Z?{getBoundingClientRect:()=>({top:Xt.y,left:Xt.x,right:Xt.x,bottom:Xt.y,width:0,height:0})}:me,popperRef:er,open:me?Xe:!1,id:Zn,transition:!0},Ut,Us,{popperOptions:zs,children:({TransitionProps:te})=>y.jsx(mo,k({timeout:ye.transitions.duration.shorter},te,qs,{children:y.jsxs(go,k({},Hs,{children:[re,C?y.jsx(bo,k({},Ws,{ref:We})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(bs.propTypes={arrow:s.bool,children:dn.isRequired,classes:s.object,className:s.string,components:s.shape({Arrow:s.elementType,Popper:s.elementType,Tooltip:s.elementType,Transition:s.elementType}),componentsProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),describeChild:s.bool,disableFocusListener:s.bool,disableHoverListener:s.bool,disableInteractive:s.bool,disableTouchListener:s.bool,enterDelay:s.number,enterNextDelay:s.number,enterTouchDelay:s.number,followCursor:s.bool,id:s.string,leaveDelay:s.number,leaveTouchDelay:s.number,onClose:s.func,onOpen:s.func,open:s.bool,placement:s.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:s.elementType,PopperProps:s.object,slotProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),slots:s.shape({arrow:s.elementType,popper:s.elementType,tooltip:s.elementType,transition:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),title:s.node,TransitionComponent:s.elementType,TransitionProps:s.object});const cp=bs;var Qr={},vs={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(vs);var up=vs.exports,fr={};function dp(e){return He("MuiSvgIcon",e)}it("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const pp=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],fp=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Ue(t)}`,`fontSize${Ue(n)}`]};return et(o,dp,r)},hp=Te("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Ue(n.color)}`],t[`fontSize${Ue(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,a,l,c,u,d,f,p,v,b;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(a=i.pxToRem)==null?void 0:a.call(i,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((u=e.typography)==null||(d=u.pxToRem)==null?void 0:d.call(u,35))||"2.1875rem"}[t.fontSize],color:(f=(p=(e.vars||e).palette)==null||(p=p[t.color])==null?void 0:p.main)!=null?f:{action:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.active,disabled:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.disabled,inherit:void 0}[t.color]}}),eo=E.forwardRef(function(t,n){const r=tt({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:a="inherit",component:l="svg",fontSize:c="medium",htmlColor:u,inheritViewBox:d=!1,titleAccess:f,viewBox:p="0 0 24 24"}=r,v=ue(r,pp),b=E.isValidElement(o)&&o.type==="svg",h=k({},r,{color:a,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:d,viewBox:p,hasSvgAsChild:b}),m={};d||(m.viewBox=p);const T=fp(h);return y.jsxs(hp,k({as:l,className:we(T.root,i),focusable:"false",color:u,"aria-hidden":f?void 0:!0,role:f?"img":void 0,ref:n},m,v,b&&o.props,{ownerState:h,children:[b?o.props.children:o,f?y.jsx("title",{children:f}):null]}))});process.env.NODE_ENV!=="production"&&(eo.propTypes={children:s.node,classes:s.object,className:s.string,color:s.oneOfType([s.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),s.string]),component:s.elementType,fontSize:s.oneOfType([s.oneOf(["inherit","large","medium","small"]),s.string]),htmlColor:s.string,inheritViewBox:s.bool,shapeRendering:s.string,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),titleAccess:s.string,viewBox:s.string});eo.muiName="SvgIcon";const li=eo;function ys(e,t){function n(r,o){return y.jsx(li,k({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=li.muiName,E.memo(E.forwardRef(n))}const mp={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Ui.configure(e)}},gp=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Ue,createChainedFunction:wr,createSvgIcon:ys,debounce:Ii,deprecatedPropType:Ua,isMuiElement:qa,ownerDocument:Ee,ownerWindow:_t,requirePropFactory:Ha,setRef:Mn,unstable_ClassNameGenerator:mp,unstable_useEnhancedEffect:vt,unstable_useId:ji,unsupportedProp:Xa,useControlled:Ai,useEventCallback:on,useForkRef:De,useIsFocusVisible:Di},Symbol.toStringTag,{value:"Module"})),bp=Ea(gp);var ci;function vp(){return ci||(ci=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=bp}(fr)),fr}var yp=up;Object.defineProperty(Qr,"__esModule",{value:!0});var xs=Qr.default=void 0,xp=yp(vp()),wp=y;xs=Qr.default=(0,xp.default)((0,wp.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function ui(e,t,n){return e?y.jsx(de.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:y.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function to(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:a=void 0,hasAutoFocus:l=!1,className:c,isDisabled:u=!1,isDense:d=!0,isSubMenuParent:f=!1,hasDisabledGutters:p=!1,hasDivider:v=!1,focusVisibleClassName:b,id:h,children:m}=e,T=y.jsx(de.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:u,dense:d,disableGutters:p,divider:v,focusVisibleClassName:b,onClick:t,id:h,children:n?y.jsxs(y.Fragment,{children:[ui(i,n,!0),y.jsx(de.ListItemText,{primary:n,inset:!i&&o}),f?y.jsx(de.ListItemIcon,{className:"papi-menu-icon-trailing",children:y.jsx(xs,{})}):ui(a,n,!1)]}):m});return r?y.jsx(cp,{title:r,placement:"right",children:y.jsx("div",{children:T})}):T}function ws(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Ep(e){const[t,n]=ee.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,a=u=>{n(u.currentTarget)},l=()=>{n(void 0)},c=()=>{let u=ws(i).filter(d=>"menuItem"in d.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return u=u.filter(d=>"menuItem"in d.group&&d.group.menuItem===r.id),y.jsx(no,{...e,includedGroups:u})};return y.jsxs(y.Fragment,{children:[y.jsx(to,{onClick:a,...o,isSubMenuParent:!0}),y.jsx(de.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Tp=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function no(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:a}=ee.useMemo(()=>{const d=o&&o.length>0?o:ws(t).filter(b=>!("menuItem"in b.group)),f=Object.values(d).sort((b,h)=>(b.group.order||0)-(h.group.order||0)),p=[];f.forEach(b=>{Tp(b.id,t.items).forEach(h=>p.push({item:h,isLastItemInGroup:!1})),p.length>0&&(p[p.length-1].isLastItemInGroup=!0)}),p.length>0&&(p[p.length-1].isLastItemInGroup=!1);const v=p.some(b=>"iconPathBefore"in b.item&&b.item.iconPathBefore);return{items:p,allowForLeadingIcons:v}},[o,t]),l=({item:d,isLastItemInGroup:f})=>({className:"papi-menu-item",label:d.label,tooltip:d.tooltip,iconPathBefore:"iconPathBefore"in d?d.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in d?d.iconPathAfter:void 0,hasDivider:f,allowForLeadingIcons:a}),[c]=i;if(!c)return y.jsx("div",{});const u=c.item.group;return y.jsx("div",{role:"menu","aria-label":u,children:i.map((d,f)=>{const{item:p}=d,v=l(d);if("command"in p){const b=p.group+f;return y.jsx(to,{onClick:h=>{n==null||n(h),r(p)},...v},b)}return y.jsx(Ep,{parentMenuItem:p,parentItemProps:v,...e},u+p.id)})},u)}function kp(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([a,l])=>({id:a,group:l})).filter(a=>"column"in a.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(a=>"column"in a.group&&a.group.column===n)),y.jsx(no,{...e,includedGroups:i})}function Op({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return y.jsxs(de.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[y.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),y.jsx(de.List,{id:n,dense:!0,className:i??"",children:y.jsx(kp,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Es({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=ee.useMemo(()=>{const a=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,u=o[c];typeof u=="object"&&typeof u.order=="number"&&!Number.isNaN(u.order)?a.set(u.order,{id:c,metadata:u}):console.warn(`Property ${l} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(a.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return y.jsx(de.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((a,l)=>y.jsx(Op,{commandHandler:e,menuDefinition:n,...a,className:t},l))})}const Ts=E.createContext({});process.env.NODE_ENV!=="production"&&(Ts.displayName="ListContext");const Sp=Ts;function Cp(e){return He("MuiList",e)}it("MuiList",["root","padding","dense","subheader"]);const Pp=["children","className","component","dense","disablePadding","subheader"],Rp=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return et({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},Cp,t)},Np=Te("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>k({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),ks=E.forwardRef(function(t,n){const r=tt({props:t,name:"MuiList"}),{children:o,className:i,component:a="ul",dense:l=!1,disablePadding:c=!1,subheader:u}=r,d=ue(r,Pp),f=E.useMemo(()=>({dense:l}),[l]),p=k({},r,{component:a,dense:l,disablePadding:c}),v=Rp(p);return y.jsx(Sp.Provider,{value:f,children:y.jsxs(Np,k({as:a,className:we(v.root,i),ref:n,ownerState:p},d,{children:[u,o]}))})});process.env.NODE_ENV!=="production"&&(ks.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,dense:s.bool,disablePadding:s.bool,subheader:s.node,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const $p=ks,Mp=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function hr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function di(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function Os(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function Kt(e,t,n,r,o,i){let a=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(a)return!1;a=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!Os(l,i)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const Ss=E.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:a,className:l,disabledItemsFocusable:c=!1,disableListWrap:u=!1,onKeyDown:d,variant:f="selectedMenu"}=t,p=ue(t,Mp),v=E.useRef(null),b=E.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});vt(()=>{o&&v.current.focus()},[o]),E.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(x,w)=>{const g=!v.current.style.width;if(x.clientHeight<v.current.clientHeight&&g){const S=`${Bi(Ee(x))}px`;v.current.style[w.direction==="rtl"?"paddingLeft":"paddingRight"]=S,v.current.style.width=`calc(100% + ${S})`}return v.current}}),[]);const h=x=>{const w=v.current,g=x.key,S=Ee(w).activeElement;if(g==="ArrowDown")x.preventDefault(),Kt(w,S,u,c,hr);else if(g==="ArrowUp")x.preventDefault(),Kt(w,S,u,c,di);else if(g==="Home")x.preventDefault(),Kt(w,null,u,c,hr);else if(g==="End")x.preventDefault(),Kt(w,null,u,c,di);else if(g.length===1){const C=b.current,j=g.toLowerCase(),I=performance.now();C.keys.length>0&&(I-C.lastTime>500?(C.keys=[],C.repeating=!0,C.previousKeyMatched=!0):C.repeating&&j!==C.keys[0]&&(C.repeating=!1)),C.lastTime=I,C.keys.push(j);const A=S&&!C.repeating&&Os(S,C);C.previousKeyMatched&&(A||Kt(w,S,!1,c,hr,C))?x.preventDefault():C.previousKeyMatched=!1}d&&d(x)},m=De(v,n);let T=-1;E.Children.forEach(a,(x,w)=>{if(!E.isValidElement(x)){T===w&&(T+=1,T>=a.length&&(T=-1));return}process.env.NODE_ENV!=="production"&&$n.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(f==="selectedMenu"&&x.props.selected||T===-1)&&(T=w),T===w&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(T+=1,T>=a.length&&(T=-1))});const $=E.Children.map(a,(x,w)=>{if(w===T){const g={};return i&&(g.autoFocus=!0),x.props.tabIndex===void 0&&f==="selectedMenu"&&(g.tabIndex=0),E.cloneElement(x,g)}return x});return y.jsx($p,k({role:"menu",ref:m,className:l,onKeyDown:h,tabIndex:o?0:-1},p,{children:$}))});process.env.NODE_ENV!=="production"&&(Ss.propTypes={autoFocus:s.bool,autoFocusItem:s.bool,children:s.node,className:s.string,disabledItemsFocusable:s.bool,disableListWrap:s.bool,onKeyDown:s.func,variant:s.oneOf(["menu","selectedMenu"])});const _p=Ss,Ip=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],jp={entering:{opacity:1},entered:{opacity:1}},Cs=E.forwardRef(function(t,n){const r=bn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:a=!0,children:l,easing:c,in:u,onEnter:d,onEntered:f,onEntering:p,onExit:v,onExited:b,onExiting:h,style:m,timeout:T=o,TransitionComponent:$=fs}=t,x=ue(t,Ip),w=E.useRef(null),g=De(w,l.ref,n),S=L=>_=>{if(L){const R=w.current;_===void 0?L(R):L(R,_)}},C=S(p),j=S((L,_)=>{hs(L);const R=Bn({style:m,timeout:T,easing:c},{mode:"enter"});L.style.webkitTransition=r.transitions.create("opacity",R),L.style.transition=r.transitions.create("opacity",R),d&&d(L,_)}),I=S(f),A=S(h),B=S(L=>{const _=Bn({style:m,timeout:T,easing:c},{mode:"exit"});L.style.webkitTransition=r.transitions.create("opacity",_),L.style.transition=r.transitions.create("opacity",_),v&&v(L)}),z=S(b),W=L=>{i&&i(w.current,L)};return y.jsx($,k({appear:a,in:u,nodeRef:w,onEnter:j,onEntered:I,onEntering:C,onExit:B,onExited:z,onExiting:A,addEndListener:W,timeout:T},x,{children:(L,_)=>E.cloneElement(l,k({style:k({opacity:0,visibility:L==="exited"&&!u?"hidden":void 0},jp[L],m,l.props.style),ref:g},_))}))});process.env.NODE_ENV!=="production"&&(Cs.propTypes={addEndListener:s.func,appear:s.bool,children:dn.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const Ap=Cs;function Dp(e){return He("MuiBackdrop",e)}it("MuiBackdrop",["root","invisible"]);const Bp=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Lp=e=>{const{classes:t,invisible:n}=e;return et({root:["root",n&&"invisible"]},Dp,t)},Fp=Te("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>k({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),Ps=E.forwardRef(function(t,n){var r,o,i;const a=tt({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:u="div",components:d={},componentsProps:f={},invisible:p=!1,open:v,slotProps:b={},slots:h={},TransitionComponent:m=Ap,transitionDuration:T}=a,$=ue(a,Bp),x=k({},a,{component:u,invisible:p}),w=Lp(x),g=(r=b.root)!=null?r:f.root;return y.jsx(m,k({in:v,timeout:T},$,{children:y.jsx(Fp,k({"aria-hidden":!0},g,{as:(o=(i=h.root)!=null?i:d.Root)!=null?o:u,className:we(w.root,c,g==null?void 0:g.className),ownerState:k({},x,g==null?void 0:g.ownerState),classes:w,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(Ps.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.object}),invisible:s.bool,open:s.bool.isRequired,slotProps:s.shape({root:s.object}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const Vp=Ps;function zp(e){return He("MuiModal",e)}it("MuiModal",["root","hidden","backdrop"]);const Up=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],qp=e=>{const{open:t,exited:n,classes:r}=e;return et({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},zp,r)},Hp=Te("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>k({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Wp=Te(Vp,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Rs=E.forwardRef(function(t,n){var r,o,i,a,l,c;const u=tt({name:"MuiModal",props:t}),{BackdropComponent:d=Wp,BackdropProps:f,className:p,closeAfterTransition:v=!1,children:b,container:h,component:m,components:T={},componentsProps:$={},disableAutoFocus:x=!1,disableEnforceFocus:w=!1,disableEscapeKeyDown:g=!1,disablePortal:S=!1,disableRestoreFocus:C=!1,disableScrollLock:j=!1,hideBackdrop:I=!1,keepMounted:A=!1,onBackdropClick:B,open:z,slotProps:W,slots:L}=u,_=ue(u,Up),R=k({},u,{closeAfterTransition:v,disableAutoFocus:x,disableEnforceFocus:w,disableEscapeKeyDown:g,disablePortal:S,disableRestoreFocus:C,disableScrollLock:j,hideBackdrop:I,keepMounted:A}),{getRootProps:D,getBackdropProps:Q,getTransitionProps:Z,portalRef:O,isTopModal:M,exited:V,hasTransition:X}=jl(k({},R,{rootRef:n})),F=k({},R,{exited:V}),U=qp(F),H={};if(b.props.tabIndex===void 0&&(H.tabIndex="-1"),X){const{onEnter:J,onExited:P}=Z();H.onEnter=J,H.onExited=P}const G=(r=(o=L==null?void 0:L.root)!=null?o:T.Root)!=null?r:Hp,q=(i=(a=L==null?void 0:L.backdrop)!=null?a:T.Backdrop)!=null?i:d,K=(l=W==null?void 0:W.root)!=null?l:$.root,Y=(c=W==null?void 0:W.backdrop)!=null?c:$.backdrop,re=yt({elementType:G,externalSlotProps:K,externalForwardedProps:_,getSlotProps:D,additionalProps:{ref:n,as:m},ownerState:F,className:we(p,K==null?void 0:K.className,U==null?void 0:U.root,!F.open&&F.exited&&(U==null?void 0:U.hidden))}),N=yt({elementType:q,externalSlotProps:Y,additionalProps:f,getSlotProps:J=>Q(k({},J,{onClick:P=>{B&&B(P),J!=null&&J.onClick&&J.onClick(P)}})),className:we(Y==null?void 0:Y.className,f==null?void 0:f.className,U==null?void 0:U.backdrop),ownerState:F});return!A&&!z&&(!X||V)?null:y.jsx(sn,{ref:O,container:h,disablePortal:S,children:y.jsxs(G,k({},re,{children:[!I&&d?y.jsx(q,k({},N)):null,y.jsx(_n,{disableEnforceFocus:w,disableAutoFocus:x,disableRestoreFocus:C,isEnabled:M,open:z,children:E.cloneElement(b,H)})]}))})});process.env.NODE_ENV!=="production"&&(Rs.propTypes={BackdropComponent:s.elementType,BackdropProps:s.object,children:dn.isRequired,classes:s.object,className:s.string,closeAfterTransition:s.bool,component:s.elementType,components:s.shape({Backdrop:s.elementType,Root:s.elementType}),componentsProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Ye,s.func]),disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableEscapeKeyDown:s.bool,disablePortal:s.bool,disableRestoreFocus:s.bool,disableScrollLock:s.bool,hideBackdrop:s.bool,keepMounted:s.bool,onBackdropClick:s.func,onClose:s.func,onTransitionEnter:s.func,onTransitionExited:s.func,open:s.bool.isRequired,slotProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({backdrop:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const Gp=Rs;function Xp(e){return He("MuiPaper",e)}it("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Kp=["className","component","elevation","square","variant"],Yp=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return et(i,Xp,o)},Jp=Te("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return k({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&k({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${Dn("#fff",si(t.elevation))}, ${Dn("#fff",si(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Ns=E.forwardRef(function(t,n){const r=tt({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:a=1,square:l=!1,variant:c="elevation"}=r,u=ue(r,Kp),d=k({},r,{component:i,elevation:a,square:l,variant:c}),f=Yp(d);return process.env.NODE_ENV!=="production"&&bn().shadows[a]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)),y.jsx(Jp,k({as:i,ownerState:d,className:we(f.root,o),ref:n},u))});process.env.NODE_ENV!=="production"&&(Ns.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,elevation:Lt(Vi,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:s.bool,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),variant:s.oneOfType([s.oneOf(["elevation","outlined"]),s.string])});const Zp=Ns;function Qp(e){return He("MuiPopover",e)}it("MuiPopover",["root","paper"]);const ef=["onEntering"],tf=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],nf=["slotProps"];function pi(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function fi(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function hi(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function Rn(e){return typeof e=="function"?e():e}const rf=e=>{const{classes:t}=e;return et({root:["root"],paper:["paper"]},Qp,t)},of=Te(Gp,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),$s=Te(Zp,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Ms=E.forwardRef(function(t,n){var r,o,i;const a=tt({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:u={vertical:"top",horizontal:"left"},anchorPosition:d,anchorReference:f="anchorEl",children:p,className:v,container:b,elevation:h=8,marginThreshold:m=16,open:T,PaperProps:$={},slots:x,slotProps:w,transformOrigin:g={vertical:"top",horizontal:"left"},TransitionComponent:S=Rr,transitionDuration:C="auto",TransitionProps:{onEntering:j}={},disableScrollLock:I=!1}=a,A=ue(a.TransitionProps,ef),B=ue(a,tf),z=(r=w==null?void 0:w.paper)!=null?r:$,W=E.useRef(),L=De(W,z.ref),_=k({},a,{anchorOrigin:u,anchorReference:f,elevation:h,marginThreshold:m,externalPaperSlotProps:z,transformOrigin:g,TransitionComponent:S,transitionDuration:C,TransitionProps:A}),R=rf(_),D=E.useCallback(()=>{if(f==="anchorPosition")return process.env.NODE_ENV!=="production"&&(d||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),d;const J=Rn(c),P=J&&J.nodeType===1?J:Ee(W.current).body,oe=P.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const ye=P.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ye.top===0&&ye.left===0&&ye.right===0&&ye.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:oe.top+pi(oe,u.vertical),left:oe.left+fi(oe,u.horizontal)}},[c,u.horizontal,u.vertical,d,f]),Q=E.useCallback(J=>({vertical:pi(J,g.vertical),horizontal:fi(J,g.horizontal)}),[g.horizontal,g.vertical]),Z=E.useCallback(J=>{const P={width:J.offsetWidth,height:J.offsetHeight},oe=Q(P);if(f==="none")return{top:null,left:null,transformOrigin:hi(oe)};const ye=D();let ke=ye.top-oe.vertical,me=ye.left-oe.horizontal;const lt=ke+P.height,Oe=me+P.width,We=_t(Rn(c)),Re=We.innerHeight-m,Ge=We.innerWidth-m;if(m!==null&&ke<m){const xe=ke-m;ke-=xe,oe.vertical+=xe}else if(m!==null&&lt>Re){const xe=lt-Re;ke-=xe,oe.vertical+=xe}if(process.env.NODE_ENV!=="production"&&P.height>Re&&P.height&&Re&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${P.height-Re}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),m!==null&&me<m){const xe=me-m;me-=xe,oe.horizontal+=xe}else if(Oe>Ge){const xe=Oe-Ge;me-=xe,oe.horizontal+=xe}return{top:`${Math.round(ke)}px`,left:`${Math.round(me)}px`,transformOrigin:hi(oe)}},[c,f,D,Q,m]),[O,M]=E.useState(T),V=E.useCallback(()=>{const J=W.current;if(!J)return;const P=Z(J);P.top!==null&&(J.style.top=P.top),P.left!==null&&(J.style.left=P.left),J.style.transformOrigin=P.transformOrigin,M(!0)},[Z]);E.useEffect(()=>(I&&window.addEventListener("scroll",V),()=>window.removeEventListener("scroll",V)),[c,I,V]);const X=(J,P)=>{j&&j(J,P),V()},F=()=>{M(!1)};E.useEffect(()=>{T&&V()}),E.useImperativeHandle(l,()=>T?{updatePosition:()=>{V()}}:null,[T,V]),E.useEffect(()=>{if(!T)return;const J=Ii(()=>{V()}),P=_t(c);return P.addEventListener("resize",J),()=>{J.clear(),P.removeEventListener("resize",J)}},[c,T,V]);let U=C;C==="auto"&&!S.muiSupportAuto&&(U=void 0);const H=b||(c?Ee(Rn(c)).body:void 0),G=(o=x==null?void 0:x.root)!=null?o:of,q=(i=x==null?void 0:x.paper)!=null?i:$s,K=yt({elementType:q,externalSlotProps:k({},z,{style:O?z.style:k({},z.style,{opacity:0})}),additionalProps:{elevation:h,ref:L},ownerState:_,className:we(R.paper,z==null?void 0:z.className)}),Y=yt({elementType:G,externalSlotProps:(w==null?void 0:w.root)||{},externalForwardedProps:B,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:H,open:T},ownerState:_,className:we(R.root,v)}),{slotProps:re}=Y,N=ue(Y,nf);return y.jsx(G,k({},N,!Hi(G)&&{slotProps:re,disableScrollLock:I},{children:y.jsx(S,k({appear:!0,in:T,onEntering:X,onExited:F,timeout:U},A,{children:y.jsx(q,k({},K,{children:p}))}))}))});process.env.NODE_ENV!=="production"&&(Ms.propTypes={action:Ar,anchorEl:Lt(s.oneOfType([Ye,s.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=Rn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),anchorPosition:s.shape({left:s.number.isRequired,top:s.number.isRequired}),anchorReference:s.oneOf(["anchorEl","anchorPosition","none"]),children:s.node,classes:s.object,className:s.string,container:s.oneOfType([Ye,s.func]),disableScrollLock:s.bool,elevation:Vi,marginThreshold:s.number,onClose:s.func,open:s.bool.isRequired,PaperProps:s.shape({component:ja}),slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transformOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object});const sf=Ms;function af(e){return He("MuiMenu",e)}it("MuiMenu",["root","paper","list"]);const lf=["onEntering"],cf=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],uf={vertical:"top",horizontal:"right"},df={vertical:"top",horizontal:"left"},pf=e=>{const{classes:t}=e;return et({root:["root"],paper:["paper"],list:["list"]},af,t)},ff=Te(sf,{shouldForwardProp:e=>ds(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),hf=Te($s,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),mf=Te(_p,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),_s=E.forwardRef(function(t,n){var r,o;const i=tt({props:t,name:"MuiMenu"}),{autoFocus:a=!0,children:l,className:c,disableAutoFocusItem:u=!1,MenuListProps:d={},onClose:f,open:p,PaperProps:v={},PopoverClasses:b,transitionDuration:h="auto",TransitionProps:{onEntering:m}={},variant:T="selectedMenu",slots:$={},slotProps:x={}}=i,w=ue(i.TransitionProps,lf),g=ue(i,cf),S=bn(),C=S.direction==="rtl",j=k({},i,{autoFocus:a,disableAutoFocusItem:u,MenuListProps:d,onEntering:m,PaperProps:v,transitionDuration:h,TransitionProps:w,variant:T}),I=pf(j),A=a&&!u&&p,B=E.useRef(null),z=(Z,O)=>{B.current&&B.current.adjustStyleForScrollbar(Z,S),m&&m(Z,O)},W=Z=>{Z.key==="Tab"&&(Z.preventDefault(),f&&f(Z,"tabKeyDown"))};let L=-1;E.Children.map(l,(Z,O)=>{E.isValidElement(Z)&&(process.env.NODE_ENV!=="production"&&$n.isFragment(Z)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Z.props.disabled||(T==="selectedMenu"&&Z.props.selected||L===-1)&&(L=O))});const _=(r=$.paper)!=null?r:hf,R=(o=x.paper)!=null?o:v,D=yt({elementType:$.root,externalSlotProps:x.root,ownerState:j,className:[I.root,c]}),Q=yt({elementType:_,externalSlotProps:R,ownerState:j,className:I.paper});return y.jsx(ff,k({onClose:f,anchorOrigin:{vertical:"bottom",horizontal:C?"right":"left"},transformOrigin:C?uf:df,slots:{paper:_,root:$.root},slotProps:{root:D,paper:Q},open:p,ref:n,transitionDuration:h,TransitionProps:k({onEntering:z},w),ownerState:j},g,{classes:b,children:y.jsx(mf,k({onKeyDown:W,actions:B,autoFocus:a&&(L===-1||u),autoFocusItem:A,variant:T},d,{className:we(I.list,d.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(_s.propTypes={anchorEl:s.oneOfType([Ye,s.func]),autoFocus:s.bool,children:s.node,classes:s.object,className:s.string,disableAutoFocusItem:s.bool,MenuListProps:s.object,onClose:s.func,open:s.bool.isRequired,PaperProps:s.object,PopoverClasses:s.object,slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object,variant:s.oneOf(["menu","selectedMenu"])});const gf=_s;function bf({className:e,commandHandler:t,menuDefinition:n,children:r}){var u;const[o,i]=ee.useState(void 0),a=ee.useCallback(d=>{d.preventDefault(),i(o===void 0?{mouseX:d.clientX+2,mouseY:d.clientY-6}:void 0)},[o]),l=ee.useCallback(()=>{i(void 0)},[]),c=ee.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((u=n==null?void 0:n.items)==null?void 0:u.length)??0)===0||!r?r:y.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:a,children:[r,y.jsx(gf,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:y.jsx(no,{menuDefinition:n,commandHandler:t,onClick:l})})]})}const vf=ys(y.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function yf(e){return{preserveValue:!0,...e}}const Ln=(e,t,n={})=>{const r=ee.useRef(t);r.current=t;const o=ee.useRef(n);o.current=yf(o.current);const[i,a]=ee.useState(()=>r.current),[l,c]=ee.useState(!0);return ee.useEffect(()=>{let u=!0;return c(!!e),(async()=>{if(e){const d=await e();u&&(a(()=>d),c(!1))}})(),()=>{u=!1,o.current.preserveValue||a(()=>r.current)}},[e]),[i,l]};function Is({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:i,ariaLabelPrefix:a,children:l}){const[c,u]=ee.useState(!1),[d,f]=ee.useState(!1),p=ee.useCallback(()=>{c&&u(!1),f(!1)},[c]),v=ee.useCallback(w=>{w.stopPropagation(),u(g=>{const S=!g;return S&&w.shiftKey?f(!0):S||f(!1),S})},[]),b=ee.useCallback(w=>(p(),r(w)),[r,p]),[h,m]=ee.useState({top:1,left:1});ee.useEffect(()=>{if(c){const w=o==null?void 0:o.current;if(w){const g=w.getBoundingClientRect(),S=window.scrollY,C=window.scrollX,j=g.top+S+w.clientHeight,I=g.left+C;m({top:j,left:I})}}},[c,o]);const[T]=Ln(ee.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[$]=Ln(ee.useCallback(async()=>(e==null?void 0:e(!0))??n??T,[e,n,T,c]),n??T),x=d&&$?$:T;return y.jsxs(y.Fragment,{children:[y.jsx(de.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${i??""}`,color:"inherit","aria-label":`${a??""} menu button`,onClick:v,children:l??y.jsx(vf,{})}),y.jsx(de.Drawer,{className:`papi-menu-drawer ${i??""}`,anchor:"left",variant:"temporary",open:c,onClose:p,PaperProps:{className:"papi-menu-drawer-paper",style:{top:h.top,left:h.left}},children:x?y.jsx(Es,{className:i,id:`${a??""} main menu`,commandHandler:b,multiColumnMenu:x}):void 0})]})}function xf({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:a="medium",className:l,onClick:c,children:u}){return y.jsx(de.IconButton,{id:e,disabled:n,edge:i,size:a,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:u})}function un({variant:e="outlined",id:t,isDisabled:n=!1,hasError:r=!1,isFullWidth:o=!1,helperText:i,label:a,placeholder:l,isRequired:c=!1,className:u,defaultValue:d,value:f,onChange:p,onFocus:v,onBlur:b}){return y.jsx(de.TextField,{variant:e,id:t,disabled:n,error:r,fullWidth:o,helperText:i,label:a,placeholder:l,required:c,className:`papi-textfield ${u??""}`,defaultValue:d,value:f,onChange:p,onFocus:v,onBlur:b})}let mr;const gr=()=>(mr||(mr=ge.allBookIds.map(e=>({bookId:e,label:ge.bookIdToEnglishName(e)}))),mr);function wf({scrRef:e,handleSubmit:t,id:n}){const r=c=>{t(c)},o=(c,u)=>{const f={bookNum:ge.bookIdToNumber(u.bookId),chapterNum:1,verseNum:1};r(f)},i=c=>{t({...e,chapterNum:+c.target.value})},a=c=>{t({...e,verseNum:+c.target.value})},l=ee.useMemo(()=>gr()[e.bookNum-1],[e.bookNum]);return y.jsxs("span",{id:n,children:[y.jsx(Nn,{title:"Book",className:"papi-ref-selector book",value:l,options:gr(),onChange:o,isClearable:!1,width:200}),y.jsx(ut,{onClick:()=>r(Ve.offsetBook(e,-1)),isDisabled:e.bookNum<=Ve.FIRST_SCR_BOOK_NUM,children:"<"}),y.jsx(ut,{onClick:()=>r(Ve.offsetBook(e,1)),isDisabled:e.bookNum>=gr().length,children:">"}),y.jsx(un,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),y.jsx(ut,{onClick:()=>t(Ve.offsetChapter(e,-1)),isDisabled:e.chapterNum<=Ve.FIRST_SCR_CHAPTER_NUM,children:"<"}),y.jsx(ut,{onClick:()=>t(Ve.offsetChapter(e,1)),isDisabled:e.chapterNum>=Ve.getChaptersForBook(e.bookNum),children:">"}),y.jsx(un,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:a}),y.jsx(ut,{onClick:()=>t(Ve.offsetVerse(e,-1)),isDisabled:e.verseNum<=Ve.FIRST_SCR_VERSE_NUM,children:"<"}),y.jsx(ut,{onClick:()=>t(Ve.offsetVerse(e,1)),children:">"})]})}function Ef({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=ee.useState(""),i=a=>{o(a),e(a)};return y.jsx(de.Paper,{component:"form",className:"search-bar-paper",children:y.jsx(un,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:a=>i(a.target.value)})})}function Tf({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:a=!1,defaultValue:l,value:c,valueLabelDisplay:u="off",className:d,onChange:f,onChangeCommitted:p}){return y.jsx(de.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:a,defaultValue:l,value:c,valueLabelDisplay:u,className:`papi-slider ${n} ${d??""}`,onChange:f,onChangeCommitted:p})}function kf({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:a,children:l}){const c={action:(a==null?void 0:a.action)||l,message:a==null?void 0:a.message,className:r};return y.jsx(de.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:c})}function Of({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return y.jsx(de.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function mi({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return y.jsx(un,{defaultValue:t[n.key],onChange:r})}const Sf=({onChange:e,disabled:t,checked:n,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return y.jsx(Si,{...r,isChecked:n,isDisabled:t,onChange:o})};function Cf({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:a,defaultColumnSortable:l=!0,defaultColumnResizable:c=!0,rows:u,enableSelectColumn:d,selectColumnWidth:f=50,rowKeyGetter:p,rowHeight:v=35,headerRowHeight:b=35,selectedRows:h,onSelectedRowsChange:m,onRowsChange:T,onCellClick:$,onCellDoubleClick:x,onCellContextMenu:w,onCellKeyDown:g,direction:S="ltr",enableVirtualization:C=!0,onCopy:j,onPaste:I,onScroll:A,className:B,"data-testid":z}){const W=ee.useMemo(()=>{const L=e.map(_=>typeof _.editable=="function"?{..._,editable:D=>!!_.editable(D),renderEditCell:_.renderEditCell||mi}:_.editable&&!_.renderEditCell?{..._,renderEditCell:mi}:_.renderEditCell&&!_.editable?{..._,editable:!1}:_);return d?[{...vo.SelectColumn,minWidth:f},...L]:L},[e,d,f]);return y.jsx(vo,{columns:W,defaultColumnOptions:{width:o,minWidth:i,maxWidth:a,sortable:l,resizable:c},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:u,rowKeyGetter:p,rowHeight:v,headerRowHeight:b,selectedRows:h,onSelectedRowsChange:m,onRowsChange:T,onCellClick:$,onCellDoubleClick:x,onCellContextMenu:w,onCellKeyDown:g,direction:S,enableVirtualization:C,onCopy:j,onPaste:I,onScroll:A,renderers:{renderCheckbox:Sf},className:`papi-table ${B??"rdg-light"}`,"data-testid":z})}function Pf({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const i=ee.useRef(void 0);return y.jsx("div",{ref:i,style:{position:"relative"},children:y.jsx(de.AppBar,{position:"static",id:r,children:y.jsxs(de.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?y.jsx(Is,{commandHandler:t,containerRef:i,menuProvider:e}):void 0,o?y.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Rf=(e,t)=>{ee.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},br=()=>!1,Nf=(e,t)=>{const[n]=Ln(ee.useCallback(async()=>{if(!e)return br;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),br,{preserveValue:!1});ee.useEffect(()=>()=>{n!==br&&n()},[n])};exports.BookChapterControl=ya;exports.Button=ut;exports.ChapterRangeSelector=xa;exports.Checkbox=Si;exports.ComboBox=Nn;exports.ContextMenu=bf;exports.GridMenu=Es;exports.HamburgerMenuButton=Is;exports.IconButton=xf;exports.LabelPosition=ft;exports.MenuItem=to;exports.RefSelector=wf;exports.SearchBar=Ef;exports.Slider=Tf;exports.Snackbar=kf;exports.Switch=Of;exports.Table=Cf;exports.TextField=un;exports.Toolbar=Pf;exports.useEvent=Rf;exports.useEventAsync=Nf;exports.usePromise=Ln;function $f(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}$f(`body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  background-color: #f9f9f9;
  color: black;
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
}
.book-chapter-input {
  width: 300px;
  height: 36px;
}

/* navigation menu item */
/*
box-sizing: border-box;

 Auto layout
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px 12px 8px 16px;
gap: 10px;

width: 153px;
height: 36px;

background: #FFFFFF;
border: 1px solid #000000;
border-radius: 6px;

/* Inside auto layout
flex: none;
order: 0;
flex-grow: 0; */
.chapter-select {
  display: flex;
  padding: 0 8px 0 24px;
  align-items: flex-start;
  align-content: flex-start;
  align-self: stretch;
  flex-wrap: wrap;
  background: hsl(0, 0%, 96%);
}

.chapter {
  display: flex;
  width: 16px;
  height: 16px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.chapter:hover {
  background: yellow;
}

.active {
  border-radius: 4px;
  background: yellow;
}

/* .chapterSelector {
  display: flex;
  padding: 0px 8px 0px 24px;
  align-items: flex-start;
  align-content: flex-start;
  align-self: stretch;
  flex-wrap: wrap;
  background-color: whitesmoke;
}
.chapterSelector.focus\\:bg-accent:focus {
  background-color: whitesmoke;
}
.chapterSelector > * {
  display: flex;
  width: 36px;
  padding: 8px 12px 8px 4px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}
.chapterSelector > *.active {
  background-color: #fef3c7;
}
.chapterSelector > *:hover {
  background-color: hsl(48 100% 96.1%);
} */

/* State=default, type=default */
.menu-item {
  font-size: 14px;
}

.selected-menu-item {
  font-size: 14px;
  background: #f9f9f9;
}

.tally-div {
  margin-right: 24px;
  margin-left: -24px;
}

.book-color-label {
  height: 16px;
  width: 2px;
}

.selected-book-color-label {
  height: 16px;
  width: 2px;
}

.book-color-label.ot {
  background-color: orange;
}

.selected-book-color-label.ot {
  background-color: orangered;
}

.book-color-label.nt {
  background-color: lightpink;
}

.selected-book-color-label.nt {
  background-color: pink;
}

.book-color-label.dc {
  background-color: lightskyblue;
}

.selected-book-color-label.dc {
  background-color: skyblue;
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
