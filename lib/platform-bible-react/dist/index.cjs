"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const y=require("react/jsx-runtime"),ee=require("react"),Ve=require("platform-bible-utils"),Ws=require("@radix-ui/react-dropdown-menu"),mt=require("lucide-react"),we=require("clsx"),Gs=require("tailwind-merge"),de=require("@mui/material"),br=require("@mui/styled-engine"),Yt=require("react-dom"),bo=require("react-data-grid");function Rr(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const w=Rr(ee),be=Rr(Ws),Ks=Rr(Yt);var Xs=Object.defineProperty,Ys=(e,t,n)=>t in e?Xs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ne=(e,t,n)=>(Ys(e,typeof t!="symbol"?t+"":t,n),n);const bt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Nr=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],mi=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],vo=sa();function Bt(e,t=!0){return t&&(e=e.toUpperCase()),e in vo?vo[e]:0}function $r(e){return Bt(e)>0}function Js(e){const t=typeof e=="string"?Bt(e):e;return t>=40&&t<=66}function Zs(e){return(typeof e=="string"?Bt(e):e)<=39}function gi(e){return e<=66}function Qs(e){const t=typeof e=="string"?Bt(e):e;return yi(t)&&!gi(t)}function*ea(){for(let e=1;e<=bt.length;e++)yield e}const ta=1,bi=bt.length;function na(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Mr(e,t="***"){const n=e-1;return n<0||n>=bt.length?t:bt[n]}function vi(e){return e<=0||e>bi?"******":mi[e-1]}function ra(e){return vi(Bt(e))}function yi(e){const t=typeof e=="number"?Mr(e):e;return $r(t)&&!Nr.includes(t)}function oa(e){const t=typeof e=="number"?Mr(e):e;return $r(t)&&Nr.includes(t)}function ia(e){return mi[e-1].includes("*obsolete*")}function sa(){const e={};for(let t=0;t<bt.length;t++)e[bt[t]]=t+1;return e}const ge={allBookIds:bt,nonCanonicalIds:Nr,bookIdToNumber:Bt,isBookIdValid:$r,isBookNT:Js,isBookOT:Zs,isBookOTNT:gi,isBookDC:Qs,allBookNumbers:ea,firstBook:ta,lastBook:bi,extraBooks:na,bookNumberToId:Mr,bookNumberToEnglishName:vi,bookIdToEnglishName:ra,isCanonical:yi,isExtraMaterial:oa,isObsolete:ia};var rt=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(rt||{});const $e=class{constructor(t){if(ne(this,"name"),ne(this,"fullPath"),ne(this,"isPresent"),ne(this,"hasVerseSegments"),ne(this,"isCustomized"),ne(this,"baseVersification"),ne(this,"scriptureBooks"),ne(this,"_type"),t!=null)typeof t=="string"?this.name=t:this._type=t;else throw new Error("Argument null")}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ne($e,"Original",new $e(rt.Original)),ne($e,"Septuagint",new $e(rt.Septuagint)),ne($e,"Vulgate",new $e(rt.Vulgate)),ne($e,"English",new $e(rt.English)),ne($e,"RussianProtestant",new $e(rt.RussianProtestant)),ne($e,"RussianOrthodox",new $e(rt.RussianOrthodox));let Rt=$e;function yo(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var xi=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(xi||{});const Se=class ie{constructor(t,n,r,o){if(ne(this,"firstChapter"),ne(this,"lastChapter"),ne(this,"lastVerse"),ne(this,"hasSegmentsDefined"),ne(this,"text"),ne(this,"BBBCCCVVVS"),ne(this,"longHashCode"),ne(this,"versification"),ne(this,"rtlMark","‏"),ne(this,"_bookNum",0),ne(this,"_chapterNum",0),ne(this,"_verseNum",0),ne(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,a=n!=null&&n instanceof Rt?n:void 0;this.setEmpty(a),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof Rt?n:void 0;this.setEmpty(i),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ie){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof Rt?t:ie.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(t,n=ie.defaultVersification){const r=new ie(n);return r.parse(t),r}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=ie.parse(t),{success:!0,verseRef:n}}catch(r){if(r instanceof qt)return n=new ie,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ie.bcvMaxValue*ie.bookDigitShifter+(n>=0?n%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(r>=0?r%ie.bcvMaxValue:0)}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>ie.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return ge.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=ge.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ie.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>ge.lastBook)throw new qt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Rt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const a=+i[1].trim();this.versification=new Rt(rt[a])}catch{throw new qt("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new qt("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||ge.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(r[1]))throw new qt("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification):!1}allVerses(t=!1,n=ie.verseRangeSeparators,r=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=yo(this._verse,r);for(const a of i.map(l=>yo(l,n))){const l=this.clone();l.verse=a[0];const c=l.verseNum;if(o.push(l),a.length>1){const u=this.clone();if(u.verse=a[1],!t)for(let d=c+1;d<u.verseNum;d++){const f=new ie(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(f)}o.push(u)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const a=o.BBBCCCVVV;if(r>a)return 3;if(r===a)return 4;r=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ge.lastBook?2:(ge.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=ge.bookIdToNumber(t),this.chapter=n,this.verse=r}};ne(Se,"defaultVersification",Rt.English),ne(Se,"verseRangeSeparator","-"),ne(Se,"verseSequenceIndicator",","),ne(Se,"verseRangeSeparators",[Se.verseRangeSeparator]),ne(Se,"verseSequenceIndicators",[Se.verseSequenceIndicator]),ne(Se,"chapterDigitShifter",1e3),ne(Se,"bookDigitShifter",Se.chapterDigitShifter*Se.chapterDigitShifter),ne(Se,"bcvMaxValue",Se.chapterDigitShifter-1),ne(Se,"ValidStatusType",xi);class qt extends Error{}function Qe(...e){return Gs.twMerge(we.clsx(e))}const aa=be.Root,la=be.Trigger,ca=w.forwardRef(({className:e,inset:t,children:n,...r},o)=>y.jsxs(be.SubTrigger,{ref:o,className:Qe("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,y.jsx(mt.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));ca.displayName=be.SubTrigger.displayName;const ua=w.forwardRef(({className:e,...t},n)=>y.jsx(be.SubContent,{ref:n,className:Qe("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));ua.displayName=be.SubContent.displayName;const wi=w.forwardRef(({className:e,sideOffset:t=4,...n},r)=>y.jsx(be.Portal,{children:y.jsx(be.Content,{ref:r,sideOffset:t,className:Qe("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));wi.displayName=be.Content.displayName;const _r=w.forwardRef(({className:e,inset:t,...n},r)=>y.jsx(be.Item,{ref:r,className:Qe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));_r.displayName=be.Item.displayName;const da=w.forwardRef(({className:e,children:t,checked:n,...r},o)=>y.jsxs(be.CheckboxItem,{ref:o,className:Qe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[y.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:y.jsx(be.ItemIndicator,{children:y.jsx(mt.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));da.displayName=be.CheckboxItem.displayName;const pa=w.forwardRef(({className:e,children:t,...n},r)=>y.jsxs(be.RadioItem,{ref:r,className:Qe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[y.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:y.jsx(be.ItemIndicator,{children:y.jsx(mt.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));pa.displayName=be.RadioItem.displayName;const Ei=w.forwardRef(({className:e,inset:t,...n},r)=>y.jsx(be.Label,{ref:r,className:Qe("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));Ei.displayName=be.Label.displayName;const Ti=w.forwardRef(({className:e,...t},n)=>y.jsx(be.Separator,{ref:n,className:Qe("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Ti.displayName=be.Separator.displayName;const ki=w.forwardRef(({className:e,type:t,...n},r)=>y.jsx("input",{type:t,className:Qe("pr-flex pr-h-10 pr-w-full pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));ki.displayName="Input";const fa=ee.forwardRef(({handleSearch:e,...t},n)=>y.jsxs("div",{children:[y.jsx(ki,{...t,type:"text",className:"book-chapter-input",onChange:r=>e(r.target.value),ref:n}),y.jsx(mt.History,{style:{cursor:"pointer",height:"16px",width:"16px"},onClick:()=>{console.log("back in history")}})]}));function ha({endChapter:e,activeChapter:t,handleSelectChapter:n}){const r=Array.from({length:e},(o,i)=>i+1);return y.jsx("div",{className:"chapter-select",children:r.map(o=>y.jsx("div",{className:`chapter ${o===t?"active":void 0}`,onClick:()=>n(o),children:o},o))})}function ma({bookId:e,handleSelectBook:t,isSelected:n,bookType:r,children:o}){return y.jsxs("div",{children:[y.jsxs(_r,{textValue:e,className:n?"selected-menu-item":"menu-item",onSelect:i=>{i.preventDefault(),t(e)},children:[n?y.jsx(mt.Tally1,{style:{marginRight:"10px"},className:`selected-book-color-label ${r.toLowerCase()}`}):y.jsx(mt.Tally1,{style:{marginRight:"10px"},className:`book-color-label ${r.toLowerCase()}`}),ge.bookIdToEnglishName(e),n&&y.jsx(mt.ChevronUp,{name:"chevron-up"})]},e),n&&o]})}const ga={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ba=["OT","NT","DC"];function va({scrRef:e,handleSubmit:t}){const{allBookIds:n}=ge,[r,o]=ee.useState(""),[i,a]=ee.useState(""),l=ee.useRef(void 0),c=ee.useCallback(g=>({OT:n.filter(h=>ge.isBookOT(h)),NT:n.filter(h=>ge.isBookNT(h)),DC:n.filter(h=>ge.isBookDC(h))})[g],[n]),u=ee.useCallback(g=>c(g).filter(m=>ge.bookIdToEnglishName(m).toLowerCase().includes(r.toLowerCase())||m.toLowerCase().includes(r.toLowerCase())),[c,r]),d=g=>{o(g)},f=ee.useCallback(g=>Ve.getChaptersForBook(ge.bookIdToNumber(g)),[]),p=g=>{a(i!==g?g:""),f(g)===-1&&t({bookNum:ge.bookIdToNumber(g),chapterNum:1,verseNum:1})},v=g=>{t({bookNum:ge.bookIdToNumber(i),chapterNum:g,verseNum:1})};return y.jsxs("div",{children:[y.jsxs(aa,{children:[y.jsx(la,{asChild:!0,children:y.jsx(fa,{ref:l,value:r,handleSearch:d,placeholder:`${ge.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),y.jsxs(wi,{style:{width:"300px",height:"500px",overflowY:"auto"},children:[y.jsx(_r,{onSelect:g=>{g.preventDefault(),l.current.focus(),console.log("Attempt to give focus to input")},children:"Give focus to input"}),ba.map(g=>y.jsxs("div",{children:[y.jsx(Ei,{children:ga[g]}),u(g).map(m=>y.jsx("div",{children:y.jsx(ma,{bookId:m,handleSelectBook:()=>p(m),isSelected:i===m,bookType:g,children:y.jsx(ha,{handleSelectChapter:v,endChapter:f(m),activeChapter:e.bookNum===ge.bookIdToNumber(m)?e.chapterNum:0})})},m)),g==="OT"||g==="NT"?y.jsx(Ti,{}):void 0]},g))]})]}),y.jsx("button",{type:"button",onClick:()=>{l.current.focus()},children:"Focus input"})]})}function ut({id:e,isDisabled:t=!1,className:n,onClick:r,onContextMenu:o,children:i}){return y.jsx(de.Button,{id:e,disabled:t,className:`papi-button ${n??""}`,onClick:r,onContextMenu:o,children:i})}function Nn({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:a,options:l=[],className:c,value:u,onChange:d,onFocus:f,onBlur:p,getOptionLabel:v}){return y.jsx(de.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:i,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:u,onChange:d,onFocus:f,onBlur:p,getOptionLabel:v,renderInput:g=>y.jsx(de.TextField,{...g,error:o,fullWidth:i,disabled:n,label:t,style:{width:a}})})}function ya({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o,chapterCount:i}){const a=ee.useMemo(()=>Array.from({length:i},(u,d)=>d+1),[i]),l=(u,d)=>{n(d),d>t&&r(d)},c=(u,d)=>{r(d),d<e&&n(d)};return y.jsxs(y.Fragment,{children:[y.jsx(de.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:y.jsx(Nn,{onChange:(u,d)=>l(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),y.jsx(de.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:y.jsx(Nn,{onChange:(u,d)=>c(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:t,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var ft=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(ft||{});function Oi({id:e,isChecked:t,labelText:n="",labelPosition:r=ft.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:a=!1,hasError:l=!1,className:c,onChange:u}){const d=y.jsx(de.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:a,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:u});let f;if(n){const p=r===ft.Before||r===ft.Above,v=y.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),g=r===ft.Before||r===ft.After,m=g?v:y.jsx("div",{children:v}),h=g?d:y.jsx("div",{children:d});f=y.jsxs(de.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:a,error:l,children:[p&&m,h,!p&&m]})}else f=d;return f}function ue(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},k.apply(this,arguments)}function xa(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function wa(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var vr={exports:{}},wn={exports:{}},se={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xo;function Ea(){if(xo)return se;xo=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,g=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,T=e?Symbol.for("react.responder"):60118,$=e?Symbol.for("react.scope"):60119;function x(b){if(typeof b=="object"&&b!==null){var S=b.$$typeof;switch(S){case t:switch(b=b.type,b){case c:case u:case r:case i:case o:case f:return b;default:switch(b=b&&b.$$typeof,b){case l:case d:case g:case v:case a:return b;default:return S}}case n:return S}}}function E(b){return x(b)===u}return se.AsyncMode=c,se.ConcurrentMode=u,se.ContextConsumer=l,se.ContextProvider=a,se.Element=t,se.ForwardRef=d,se.Fragment=r,se.Lazy=g,se.Memo=v,se.Portal=n,se.Profiler=i,se.StrictMode=o,se.Suspense=f,se.isAsyncMode=function(b){return E(b)||x(b)===c},se.isConcurrentMode=E,se.isContextConsumer=function(b){return x(b)===l},se.isContextProvider=function(b){return x(b)===a},se.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===t},se.isForwardRef=function(b){return x(b)===d},se.isFragment=function(b){return x(b)===r},se.isLazy=function(b){return x(b)===g},se.isMemo=function(b){return x(b)===v},se.isPortal=function(b){return x(b)===n},se.isProfiler=function(b){return x(b)===i},se.isStrictMode=function(b){return x(b)===o},se.isSuspense=function(b){return x(b)===f},se.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===r||b===u||b===i||b===o||b===f||b===p||typeof b=="object"&&b!==null&&(b.$$typeof===g||b.$$typeof===v||b.$$typeof===a||b.$$typeof===l||b.$$typeof===d||b.$$typeof===h||b.$$typeof===T||b.$$typeof===$||b.$$typeof===m)},se.typeOf=x,se}var ae={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wo;function Ta(){return wo||(wo=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,g=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,T=e?Symbol.for("react.responder"):60118,$=e?Symbol.for("react.scope"):60119;function x(N){return typeof N=="string"||typeof N=="function"||N===r||N===u||N===i||N===o||N===f||N===p||typeof N=="object"&&N!==null&&(N.$$typeof===g||N.$$typeof===v||N.$$typeof===a||N.$$typeof===l||N.$$typeof===d||N.$$typeof===h||N.$$typeof===T||N.$$typeof===$||N.$$typeof===m)}function E(N){if(typeof N=="object"&&N!==null){var J=N.$$typeof;switch(J){case t:var P=N.type;switch(P){case c:case u:case r:case i:case o:case f:return P;default:var oe=P&&P.$$typeof;switch(oe){case l:case d:case g:case v:case a:return oe;default:return J}}case n:return J}}}var b=c,S=u,C=l,A=a,j=t,I=d,B=r,z=g,q=v,_=n,L=i,R=o,D=f,Q=!1;function Z(N){return Q||(Q=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),O(N)||E(N)===c}function O(N){return E(N)===u}function M(N){return E(N)===l}function V(N){return E(N)===a}function K(N){return typeof N=="object"&&N!==null&&N.$$typeof===t}function F(N){return E(N)===d}function U(N){return E(N)===r}function W(N){return E(N)===g}function G(N){return E(N)===v}function H(N){return E(N)===n}function X(N){return E(N)===i}function Y(N){return E(N)===o}function re(N){return E(N)===f}ae.AsyncMode=b,ae.ConcurrentMode=S,ae.ContextConsumer=C,ae.ContextProvider=A,ae.Element=j,ae.ForwardRef=I,ae.Fragment=B,ae.Lazy=z,ae.Memo=q,ae.Portal=_,ae.Profiler=L,ae.StrictMode=R,ae.Suspense=D,ae.isAsyncMode=Z,ae.isConcurrentMode=O,ae.isContextConsumer=M,ae.isContextProvider=V,ae.isElement=K,ae.isForwardRef=F,ae.isFragment=U,ae.isLazy=W,ae.isMemo=G,ae.isPortal=H,ae.isProfiler=X,ae.isStrictMode=Y,ae.isSuspense=re,ae.isValidElementType=x,ae.typeOf=E}()),ae}var Eo;function Si(){return Eo||(Eo=1,process.env.NODE_ENV==="production"?wn.exports=Ea():wn.exports=Ta()),wn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var nr,To;function ka(){if(To)return nr;To=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var a={},l=0;l<10;l++)a["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(a).map(function(d){return a[d]});if(c.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(d){u[d]=d}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return nr=o()?Object.assign:function(i,a){for(var l,c=r(i),u,d=1;d<arguments.length;d++){l=Object(arguments[d]);for(var f in l)t.call(l,f)&&(c[f]=l[f]);if(e){u=e(l);for(var p=0;p<u.length;p++)n.call(l,u[p])&&(c[u[p]]=l[u[p]])}}return c},nr}var rr,ko;function Ir(){if(ko)return rr;ko=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return rr=e,rr}var or,Oo;function Ci(){return Oo||(Oo=1,or=Function.call.bind(Object.prototype.hasOwnProperty)),or}var ir,So;function Oa(){if(So)return ir;So=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Ir(),n={},r=Ci();e=function(i){var a="Warning: "+i;typeof console<"u"&&console.error(a);try{throw new Error(a)}catch{}}}function o(i,a,l,c,u){if(process.env.NODE_ENV!=="production"){for(var d in i)if(r(i,d)){var f;try{if(typeof i[d]!="function"){var p=Error((c||"React class")+": "+l+" type `"+d+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[d]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw p.name="Invariant Violation",p}f=i[d](a,d,c,l,null,t)}catch(g){f=g}if(f&&!(f instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+d+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in n)){n[f.message]=!0;var v=u?u():"";e("Failed "+l+" type: "+f.message+(v??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},ir=o,ir}var sr,Co;function Sa(){if(Co)return sr;Co=1;var e=Si(),t=ka(),n=Ir(),r=Ci(),o=Oa(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function a(){return null}return sr=function(l,c){var u=typeof Symbol=="function"&&Symbol.iterator,d="@@iterator";function f(O){var M=O&&(u&&O[u]||O[d]);if(typeof M=="function")return M}var p="<<anonymous>>",v={array:T("array"),bigint:T("bigint"),bool:T("boolean"),func:T("function"),number:T("number"),object:T("object"),string:T("string"),symbol:T("symbol"),any:$(),arrayOf:x,element:E(),elementType:b(),instanceOf:S,node:I(),objectOf:A,oneOf:C,oneOfType:j,shape:z,exact:q};function g(O,M){return O===M?O!==0||1/O===1/M:O!==O&&M!==M}function m(O,M){this.message=O,this.data=M&&typeof M=="object"?M:{},this.stack=""}m.prototype=Error.prototype;function h(O){if(process.env.NODE_ENV!=="production")var M={},V=0;function K(U,W,G,H,X,Y,re){if(H=H||p,Y=Y||G,re!==n){if(c){var N=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw N.name="Invariant Violation",N}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var J=H+":"+G;!M[J]&&V<3&&(i("You are manually calling a React.PropTypes validation function for the `"+Y+"` prop on `"+H+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),M[J]=!0,V++)}}return W[G]==null?U?W[G]===null?new m("The "+X+" `"+Y+"` is marked as required "+("in `"+H+"`, but its value is `null`.")):new m("The "+X+" `"+Y+"` is marked as required in "+("`"+H+"`, but its value is `undefined`.")):null:O(W,G,H,X,Y)}var F=K.bind(null,!1);return F.isRequired=K.bind(null,!0),F}function T(O){function M(V,K,F,U,W,G){var H=V[K],X=R(H);if(X!==O){var Y=D(H);return new m("Invalid "+U+" `"+W+"` of type "+("`"+Y+"` supplied to `"+F+"`, expected ")+("`"+O+"`."),{expectedType:O})}return null}return h(M)}function $(){return h(a)}function x(O){function M(V,K,F,U,W){if(typeof O!="function")return new m("Property `"+W+"` of component `"+F+"` has invalid PropType notation inside arrayOf.");var G=V[K];if(!Array.isArray(G)){var H=R(G);return new m("Invalid "+U+" `"+W+"` of type "+("`"+H+"` supplied to `"+F+"`, expected an array."))}for(var X=0;X<G.length;X++){var Y=O(G,X,F,U,W+"["+X+"]",n);if(Y instanceof Error)return Y}return null}return h(M)}function E(){function O(M,V,K,F,U){var W=M[V];if(!l(W)){var G=R(W);return new m("Invalid "+F+" `"+U+"` of type "+("`"+G+"` supplied to `"+K+"`, expected a single ReactElement."))}return null}return h(O)}function b(){function O(M,V,K,F,U){var W=M[V];if(!e.isValidElementType(W)){var G=R(W);return new m("Invalid "+F+" `"+U+"` of type "+("`"+G+"` supplied to `"+K+"`, expected a single ReactElement type."))}return null}return h(O)}function S(O){function M(V,K,F,U,W){if(!(V[K]instanceof O)){var G=O.name||p,H=Z(V[K]);return new m("Invalid "+U+" `"+W+"` of type "+("`"+H+"` supplied to `"+F+"`, expected ")+("instance of `"+G+"`."))}return null}return h(M)}function C(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),a;function M(V,K,F,U,W){for(var G=V[K],H=0;H<O.length;H++)if(g(G,O[H]))return null;var X=JSON.stringify(O,function(re,N){var J=D(N);return J==="symbol"?String(N):N});return new m("Invalid "+U+" `"+W+"` of value `"+String(G)+"` "+("supplied to `"+F+"`, expected one of "+X+"."))}return h(M)}function A(O){function M(V,K,F,U,W){if(typeof O!="function")return new m("Property `"+W+"` of component `"+F+"` has invalid PropType notation inside objectOf.");var G=V[K],H=R(G);if(H!=="object")return new m("Invalid "+U+" `"+W+"` of type "+("`"+H+"` supplied to `"+F+"`, expected an object."));for(var X in G)if(r(G,X)){var Y=O(G,X,F,U,W+"."+X,n);if(Y instanceof Error)return Y}return null}return h(M)}function j(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),a;for(var M=0;M<O.length;M++){var V=O[M];if(typeof V!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+Q(V)+" at index "+M+"."),a}function K(F,U,W,G,H){for(var X=[],Y=0;Y<O.length;Y++){var re=O[Y],N=re(F,U,W,G,H,n);if(N==null)return null;N.data&&r(N.data,"expectedType")&&X.push(N.data.expectedType)}var J=X.length>0?", expected one of type ["+X.join(", ")+"]":"";return new m("Invalid "+G+" `"+H+"` supplied to "+("`"+W+"`"+J+"."))}return h(K)}function I(){function O(M,V,K,F,U){return _(M[V])?null:new m("Invalid "+F+" `"+U+"` supplied to "+("`"+K+"`, expected a ReactNode."))}return h(O)}function B(O,M,V,K,F){return new m((O||"React class")+": "+M+" type `"+V+"."+K+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+F+"`.")}function z(O){function M(V,K,F,U,W){var G=V[K],H=R(G);if(H!=="object")return new m("Invalid "+U+" `"+W+"` of type `"+H+"` "+("supplied to `"+F+"`, expected `object`."));for(var X in O){var Y=O[X];if(typeof Y!="function")return B(F,U,W,X,D(Y));var re=Y(G,X,F,U,W+"."+X,n);if(re)return re}return null}return h(M)}function q(O){function M(V,K,F,U,W){var G=V[K],H=R(G);if(H!=="object")return new m("Invalid "+U+" `"+W+"` of type `"+H+"` "+("supplied to `"+F+"`, expected `object`."));var X=t({},V[K],O);for(var Y in X){var re=O[Y];if(r(O,Y)&&typeof re!="function")return B(F,U,W,Y,D(re));if(!re)return new m("Invalid "+U+" `"+W+"` key `"+Y+"` supplied to `"+F+"`.\nBad object: "+JSON.stringify(V[K],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(O),null,"  "));var N=re(G,Y,F,U,W+"."+Y,n);if(N)return N}return null}return h(M)}function _(O){switch(typeof O){case"number":case"string":case"undefined":return!0;case"boolean":return!O;case"object":if(Array.isArray(O))return O.every(_);if(O===null||l(O))return!0;var M=f(O);if(M){var V=M.call(O),K;if(M!==O.entries){for(;!(K=V.next()).done;)if(!_(K.value))return!1}else for(;!(K=V.next()).done;){var F=K.value;if(F&&!_(F[1]))return!1}}else return!1;return!0;default:return!1}}function L(O,M){return O==="symbol"?!0:M?M["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&M instanceof Symbol:!1}function R(O){var M=typeof O;return Array.isArray(O)?"array":O instanceof RegExp?"object":L(M,O)?"symbol":M}function D(O){if(typeof O>"u"||O===null)return""+O;var M=R(O);if(M==="object"){if(O instanceof Date)return"date";if(O instanceof RegExp)return"regexp"}return M}function Q(O){var M=D(O);switch(M){case"array":case"object":return"an "+M;case"boolean":case"date":case"regexp":return"a "+M;default:return M}}function Z(O){return!O.constructor||!O.constructor.name?p:O.constructor.name}return v.checkPropTypes=o,v.resetWarningCache=o.resetWarningCache,v.PropTypes=v,v},sr}var ar,Po;function Ca(){if(Po)return ar;Po=1;var e=Ir();function t(){}function n(){}return n.resetWarningCache=t,ar=function(){function r(a,l,c,u,d,f){if(f!==e){var p=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw p.name="Invariant Violation",p}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},ar}if(process.env.NODE_ENV!=="production"){var Pa=Si(),Ra=!0;vr.exports=Sa()(Pa.isElement,Ra)}else vr.exports=Ca()();var Na=vr.exports;const s=xa(Na);function Lt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function ht(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Pi(e){if(!ht(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Pi(e[n])}),t}function Xe(e,t,n={clone:!0}){const r=n.clone?k({},e):e;return ht(e)&&ht(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(ht(t[o])&&o in e&&ht(e[o])?r[o]=Xe(e[o],t[o],n):n.clone?r[o]=ht(t[o])?Pi(t[o]):t[o]:r[o]=t[o])}),r}function $a(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ri(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let l;const c=i.type;return typeof c=="function"&&!$a(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ni=Lt(s.element,Ri);Ni.isRequired=Lt(s.element.isRequired,Ri);const dn=Ni;function Ma(e){const{prototype:t={}}=e;return!!t.isReactComponent}function _a(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let l;return typeof i=="function"&&!Ma(i)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ia=Lt(s.elementType,_a),ja="exact-prop: ​";function $i(e){return process.env.NODE_ENV==="production"?e:k({},e,{[ja]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Mt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var yr={exports:{}},le={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ro;function Aa(){if(Ro)return le;Ro=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),g;g=Symbol.for("react.module.reference");function m(h){if(typeof h=="object"&&h!==null){var T=h.$$typeof;switch(T){case e:switch(h=h.type,h){case n:case o:case r:case u:case d:return h;default:switch(h=h&&h.$$typeof,h){case l:case a:case c:case p:case f:case i:return h;default:return T}}case t:return T}}}return le.ContextConsumer=a,le.ContextProvider=i,le.Element=e,le.ForwardRef=c,le.Fragment=n,le.Lazy=p,le.Memo=f,le.Portal=t,le.Profiler=o,le.StrictMode=r,le.Suspense=u,le.SuspenseList=d,le.isAsyncMode=function(){return!1},le.isConcurrentMode=function(){return!1},le.isContextConsumer=function(h){return m(h)===a},le.isContextProvider=function(h){return m(h)===i},le.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===e},le.isForwardRef=function(h){return m(h)===c},le.isFragment=function(h){return m(h)===n},le.isLazy=function(h){return m(h)===p},le.isMemo=function(h){return m(h)===f},le.isPortal=function(h){return m(h)===t},le.isProfiler=function(h){return m(h)===o},le.isStrictMode=function(h){return m(h)===r},le.isSuspense=function(h){return m(h)===u},le.isSuspenseList=function(h){return m(h)===d},le.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===n||h===o||h===r||h===u||h===d||h===v||typeof h=="object"&&h!==null&&(h.$$typeof===p||h.$$typeof===f||h.$$typeof===i||h.$$typeof===a||h.$$typeof===c||h.$$typeof===g||h.getModuleId!==void 0)},le.typeOf=m,le}var ce={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var No;function Da(){return No||(No=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),g=!1,m=!1,h=!1,T=!1,$=!1,x;x=Symbol.for("react.module.reference");function E(P){return!!(typeof P=="string"||typeof P=="function"||P===n||P===o||$||P===r||P===u||P===d||T||P===v||g||m||h||typeof P=="object"&&P!==null&&(P.$$typeof===p||P.$$typeof===f||P.$$typeof===i||P.$$typeof===a||P.$$typeof===c||P.$$typeof===x||P.getModuleId!==void 0))}function b(P){if(typeof P=="object"&&P!==null){var oe=P.$$typeof;switch(oe){case e:var ye=P.type;switch(ye){case n:case o:case r:case u:case d:return ye;default:var ke=ye&&ye.$$typeof;switch(ke){case l:case a:case c:case p:case f:case i:return ke;default:return oe}}case t:return oe}}}var S=a,C=i,A=e,j=c,I=n,B=p,z=f,q=t,_=o,L=r,R=u,D=d,Q=!1,Z=!1;function O(P){return Q||(Q=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function M(P){return Z||(Z=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function V(P){return b(P)===a}function K(P){return b(P)===i}function F(P){return typeof P=="object"&&P!==null&&P.$$typeof===e}function U(P){return b(P)===c}function W(P){return b(P)===n}function G(P){return b(P)===p}function H(P){return b(P)===f}function X(P){return b(P)===t}function Y(P){return b(P)===o}function re(P){return b(P)===r}function N(P){return b(P)===u}function J(P){return b(P)===d}ce.ContextConsumer=S,ce.ContextProvider=C,ce.Element=A,ce.ForwardRef=j,ce.Fragment=I,ce.Lazy=B,ce.Memo=z,ce.Portal=q,ce.Profiler=_,ce.StrictMode=L,ce.Suspense=R,ce.SuspenseList=D,ce.isAsyncMode=O,ce.isConcurrentMode=M,ce.isContextConsumer=V,ce.isContextProvider=K,ce.isElement=F,ce.isForwardRef=U,ce.isFragment=W,ce.isLazy=G,ce.isMemo=H,ce.isPortal=X,ce.isProfiler=Y,ce.isStrictMode=re,ce.isSuspense=N,ce.isSuspenseList=J,ce.isValidElementType=E,ce.typeOf=b}()),ce}process.env.NODE_ENV==="production"?yr.exports=Aa():yr.exports=Da();var $n=yr.exports;const Ba=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function La(e){const t=`${e}`.match(Ba);return t&&t[1]||""}function Mi(e,t=""){return e.displayName||e.name||La(e)||t}function $o(e,t,n){const r=Mi(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Fa(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Mi(e,"Component");if(typeof e=="object")switch(e.$$typeof){case $n.ForwardRef:return $o(e,e.render,"ForwardRef");case $n.Memo:return $o(e,e.type,"memo");default:return}}}function Ye(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],a=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Va=s.oneOfType([s.func,s.object]),jr=Va;function Ue(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Mt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function xr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function _i(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function za(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,a)=>{const l=o||"<<anonymous>>",c=a||r;return typeof n[r]<"u"?new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function Ua(e,t){var n,r;return w.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Ee(e){return e&&e.ownerDocument||document}function _t(e){return Ee(e).defaultView||window}function Ha(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?k({},t.propTypes):null;return o=>(i,a,l,c,u,...d)=>{const f=u||a,p=n==null?void 0:n[f];if(p){const v=p(i,a,l,c,u,...d);if(v)return v}return typeof i[a]<"u"&&!i[o]?new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Mn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const qa=typeof window<"u"?w.useLayoutEffect:w.useEffect,vt=qa;let Mo=0;function Wa(e){const[t,n]=w.useState(e),r=e||t;return w.useEffect(()=>{t==null&&(Mo+=1,n(`mui-${Mo}`))},[t]),r}const _o=w["useId".toString()];function Ii(e){if(_o!==void 0){const t=_o();return e??t}return Wa(e)}function Ga(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function ji({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=w.useRef(e!==void 0),[i,a]=w.useState(t),l=o?e:i;if(process.env.NODE_ENV!=="production"){w.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:u}=w.useRef(t);w.useEffect(()=>{!o&&u!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=w.useCallback(u=>{o||a(u)},[]);return[l,c]}function on(e){const t=w.useRef(e);return vt(()=>{t.current=e}),w.useRef((...n)=>(0,t.current)(...n)).current}function De(...e){return w.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Mn(n,t)})},e)}const Io={};function Ka(e,t){const n=w.useRef(Io);return n.current===Io&&(n.current=e(t)),n}const Xa=[];function Ya(e){w.useEffect(e,Xa)}class pn{constructor(){this.currentId=0,this.clear=()=>{this.currentId!==0&&(clearTimeout(this.currentId),this.currentId=0)},this.disposeEffect=()=>this.clear}static create(){return new pn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=0,n()},t)}}function Jt(){const e=Ka(pn.create).current;return Ya(e.disposeEffect),e}let Ln=!0,wr=!1;const Ja=new pn,Za={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Qa(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Za[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function el(e){e.metaKey||e.altKey||e.ctrlKey||(Ln=!0)}function lr(){Ln=!1}function tl(){this.visibilityState==="hidden"&&wr&&(Ln=!0)}function nl(e){e.addEventListener("keydown",el,!0),e.addEventListener("mousedown",lr,!0),e.addEventListener("pointerdown",lr,!0),e.addEventListener("touchstart",lr,!0),e.addEventListener("visibilitychange",tl,!0)}function rl(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Ln||Qa(t)}function Ai(){const e=w.useCallback(o=>{o!=null&&nl(o.ownerDocument)},[]),t=w.useRef(!1);function n(){return t.current?(wr=!0,Ja.start(100,()=>{wr=!1}),t.current=!1,!0):!1}function r(o){return rl(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Di(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function ol(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function il(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const sl=Number.isInteger||il;function Bi(e,t,n,r){const o=e[t];if(o==null||!sl(o)){const i=ol(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function Li(e,t,...n){return e[t]===void 0?null:Bi(e,t,...n)}function Er(){return null}Li.isRequired=Bi;Er.isRequired=Er;const Fi=process.env.NODE_ENV==="production"?Er:Li;function Vi(e,t){const n=k({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=k({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=k({},i),Object.keys(o).forEach(a=>{n[r][a]=Vi(o[a],i[a])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function et(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,a)=>{if(a){const l=t(a);l!==""&&i.push(l),n&&n[a]&&i.push(n[a])}return i},[]).join(" ")}),r}const jo=e=>e,al=()=>{let e=jo;return{configure(t){e=t},generate(t){return e(t)},reset(){e=jo}}},ll=al(),zi=ll,Ui={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function qe(e,t,n="Mui"){const r=Ui[t];return r?`${n}-${r}`:`${zi.generate(e)}-${t}`}function it(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=qe(e,o,n)}),r}function cl(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Hi(e){return typeof e=="string"}function Zt(e,t,n){return e===void 0||Hi(e)?t:k({},t,{ownerState:k({},t.ownerState,n)})}const ul={disableDefaultClasses:!1},dl=w.createContext(ul);function pl(e){const{disableDefaultClasses:t}=w.useContext(dl);return n=>t?"":e(n)}function qi(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function fl(e,t,n){return typeof e=="function"?e(t,n):e}function Ao(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function hl(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const v=we(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),g=k({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),m=k({},n,o,r);return v.length>0&&(m.className=v),Object.keys(g).length>0&&(m.style=g),{props:m,internalRef:void 0}}const a=qi(k({},o,r)),l=Ao(r),c=Ao(o),u=t(a),d=we(u==null?void 0:u.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),f=k({},u==null?void 0:u.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),p=k({},u,n,c,l);return d.length>0&&(p.className=d),Object.keys(f).length>0&&(p.style=f),{props:p,internalRef:u.ref}}const ml=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function yt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,a=ue(e,ml),l=i?{}:fl(r,o),{props:c,internalRef:u}=hl(k({},a,{externalSlotProps:l})),d=De(u,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return Zt(n,k({},c,{ref:d}),o)}const Wi="base";function gl(e){return`${Wi}--${e}`}function bl(e,t){return`${Wi}-${e}-${t}`}function Gi(e,t){const n=Ui[t];return n?gl(n):bl(e,t)}function vl(e,t){const n={};return t.forEach(r=>{n[r]=Gi(e,r)}),n}const yl=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function xl(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function wl(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function El(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||wl(e))}function Tl(e){const t=[],n=[];return Array.from(e.querySelectorAll(yl)).forEach((r,o)=>{const i=xl(r);i===-1||!El(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function kl(){return!0}function _n(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=Tl,isEnabled:a=kl,open:l}=e,c=w.useRef(!1),u=w.useRef(null),d=w.useRef(null),f=w.useRef(null),p=w.useRef(null),v=w.useRef(!1),g=w.useRef(null),m=De(t.ref,g),h=w.useRef(null);w.useEffect(()=>{!l||!g.current||(v.current=!n)},[n,l]),w.useEffect(()=>{if(!l||!g.current)return;const x=Ee(g.current);return g.current.contains(x.activeElement)||(g.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),g.current.setAttribute("tabIndex","-1")),v.current&&g.current.focus()),()=>{o||(f.current&&f.current.focus&&(c.current=!0,f.current.focus()),f.current=null)}},[l]),w.useEffect(()=>{if(!l||!g.current)return;const x=Ee(g.current),E=C=>{h.current=C,!(r||!a()||C.key!=="Tab")&&x.activeElement===g.current&&C.shiftKey&&(c.current=!0,d.current&&d.current.focus())},b=()=>{const C=g.current;if(C===null)return;if(!x.hasFocus()||!a()||c.current){c.current=!1;return}if(C.contains(x.activeElement)||r&&x.activeElement!==u.current&&x.activeElement!==d.current)return;if(x.activeElement!==p.current)p.current=null;else if(p.current!==null)return;if(!v.current)return;let A=[];if((x.activeElement===u.current||x.activeElement===d.current)&&(A=i(g.current)),A.length>0){var j,I;const B=!!((j=h.current)!=null&&j.shiftKey&&((I=h.current)==null?void 0:I.key)==="Tab"),z=A[0],q=A[A.length-1];typeof z!="string"&&typeof q!="string"&&(B?q.focus():z.focus())}else C.focus()};x.addEventListener("focusin",b),x.addEventListener("keydown",E,!0);const S=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&b()},50);return()=>{clearInterval(S),x.removeEventListener("focusin",b),x.removeEventListener("keydown",E,!0)}},[n,r,o,a,l,i]);const T=x=>{f.current===null&&(f.current=x.relatedTarget),v.current=!0,p.current=x.target;const E=t.props.onFocus;E&&E(x)},$=x=>{f.current===null&&(f.current=x.relatedTarget),v.current=!0};return y.jsxs(w.Fragment,{children:[y.jsx("div",{tabIndex:l?0:-1,onFocus:$,ref:u,"data-testid":"sentinelStart"}),w.cloneElement(t,{ref:m,onFocus:T}),y.jsx("div",{tabIndex:l?0:-1,onFocus:$,ref:d,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(_n.propTypes={children:dn,disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableRestoreFocus:s.bool,getTabbable:s.func,isEnabled:s.func,open:s.bool.isRequired});process.env.NODE_ENV!=="production"&&(_n["propTypes"]=$i(_n.propTypes));function Ol(e){return typeof e=="function"?e():e}const sn=w.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[a,l]=w.useState(null),c=De(w.isValidElement(r)?r.ref:null,n);if(vt(()=>{i||l(Ol(o)||document.body)},[o,i]),vt(()=>{if(a&&!i)return Mn(n,a),()=>{Mn(n,null)}},[n,a,i]),i){if(w.isValidElement(r)){const u={ref:c};return w.cloneElement(r,u)}return y.jsx(w.Fragment,{children:r})}return y.jsx(w.Fragment,{children:a&&Ks.createPortal(r,a)})});process.env.NODE_ENV!=="production"&&(sn.propTypes={children:s.node,container:s.oneOfType([Ye,s.func]),disablePortal:s.bool});process.env.NODE_ENV!=="production"&&(sn["propTypes"]=$i(sn.propTypes));function Sl(e){const t=Ee(e);return t.body===e?_t(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function en(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Do(e){return parseInt(_t(e).getComputedStyle(e).paddingRight,10)||0}function Cl(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Bo(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,a=>{const l=i.indexOf(a)===-1,c=!Cl(a);l&&c&&en(a,o)})}function cr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function Pl(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(Sl(r)){const a=Di(Ee(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Do(r)+a}px`;const l=Ee(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${Do(c)+a}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=Ee(r).body;else{const a=r.parentElement,l=_t(r);i=(a==null?void 0:a.nodeName)==="HTML"&&l.getComputedStyle(a).overflowY==="scroll"?a:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:a,property:l})=>{i?a.style.setProperty(l,i):a.style.removeProperty(l)})}}function Rl(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class Nl{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&en(t.modalRef,!1);const o=Rl(n);Bo(n,t.mount,t.modalRef,o,!0);const i=cr(this.containers,a=>a.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=cr(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=Pl(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=cr(this.containers,a=>a.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&en(t.modalRef,n),Bo(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const a=i.modals[i.modals.length-1];a.modalRef&&en(a.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function $l(e){return typeof e=="function"?e():e}function Ml(e){return e?e.props.hasOwnProperty("in"):!1}const _l=new Nl;function Il(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=_l,closeAfterTransition:i=!1,onTransitionEnter:a,onTransitionExited:l,children:c,onClose:u,open:d,rootRef:f}=e,p=w.useRef({}),v=w.useRef(null),g=w.useRef(null),m=De(g,f),[h,T]=w.useState(!d),$=Ml(c);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const E=()=>Ee(v.current),b=()=>(p.current.modalRef=g.current,p.current.mount=v.current,p.current),S=()=>{o.mount(b(),{disableScrollLock:r}),g.current&&(g.current.scrollTop=0)},C=on(()=>{const R=$l(t)||E().body;o.add(b(),R),g.current&&S()}),A=w.useCallback(()=>o.isTopModal(b()),[o]),j=on(R=>{v.current=R,R&&(d&&A()?S():g.current&&en(g.current,x))}),I=w.useCallback(()=>{o.remove(b(),x)},[x,o]);w.useEffect(()=>()=>{I()},[I]),w.useEffect(()=>{d?C():(!$||!i)&&I()},[d,I,$,i,C]);const B=R=>D=>{var Q;(Q=R.onKeyDown)==null||Q.call(R,D),!(D.key!=="Escape"||D.which===229||!A())&&(n||(D.stopPropagation(),u&&u(D,"escapeKeyDown")))},z=R=>D=>{var Q;(Q=R.onClick)==null||Q.call(R,D),D.target===D.currentTarget&&u&&u(D,"backdropClick")};return{getRootProps:(R={})=>{const D=qi(e);delete D.onTransitionEnter,delete D.onTransitionExited;const Q=k({},D,R);return k({role:"presentation"},Q,{onKeyDown:B(Q),ref:m})},getBackdropProps:(R={})=>{const D=R;return k({"aria-hidden":!0},D,{onClick:z(D),open:d})},getTransitionProps:()=>{const R=()=>{T(!1),a&&a()},D=()=>{T(!0),l&&l(),i&&I()};return{onEnter:xr(R,c==null?void 0:c.props.onEnter),onExited:xr(D,c==null?void 0:c.props.onExited)}},rootRef:m,portalRef:j,isTopModal:A,exited:h,hasTransition:$}}var Ce="top",Be="bottom",Le="right",Pe="left",Ar="auto",fn=[Ce,Be,Le,Pe],It="start",an="end",jl="clippingParents",Ki="viewport",Wt="popper",Al="reference",Lo=fn.reduce(function(e,t){return e.concat([t+"-"+It,t+"-"+an])},[]),Xi=[].concat(fn,[Ar]).reduce(function(e,t){return e.concat([t,t+"-"+It,t+"-"+an])},[]),Dl="beforeRead",Bl="read",Ll="afterRead",Fl="beforeMain",Vl="main",zl="afterMain",Ul="beforeWrite",Hl="write",ql="afterWrite",Wl=[Dl,Bl,Ll,Fl,Vl,zl,Ul,Hl,ql];function He(e){return e?(e.nodeName||"").toLowerCase():null}function _e(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function xt(e){var t=_e(e).Element;return e instanceof t||e instanceof Element}function Ae(e){var t=_e(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Dr(e){if(typeof ShadowRoot>"u")return!1;var t=_e(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Gl(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!Ae(i)||!He(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(a){var l=o[a];l===!1?i.removeAttribute(a):i.setAttribute(a,l===!0?"":l)}))})}function Kl(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},a=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=a.reduce(function(c,u){return c[u]="",c},{});!Ae(o)||!He(o)||(Object.assign(o.style,l),Object.keys(i).forEach(function(c){o.removeAttribute(c)}))})}}const Xl={name:"applyStyles",enabled:!0,phase:"write",fn:Gl,effect:Kl,requires:["computeStyles"]};function ze(e){return e.split("-")[0]}var gt=Math.max,In=Math.min,jt=Math.round;function Tr(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Yi(){return!/^((?!chrome|android).)*safari/i.test(Tr())}function At(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&Ae(e)&&(o=e.offsetWidth>0&&jt(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&jt(r.height)/e.offsetHeight||1);var a=xt(e)?_e(e):window,l=a.visualViewport,c=!Yi()&&n,u=(r.left+(c&&l?l.offsetLeft:0))/o,d=(r.top+(c&&l?l.offsetTop:0))/i,f=r.width/o,p=r.height/i;return{width:f,height:p,top:d,right:u+f,bottom:d+p,left:u,x:u,y:d}}function Br(e){var t=At(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Ji(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Dr(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function Je(e){return _e(e).getComputedStyle(e)}function Yl(e){return["table","td","th"].indexOf(He(e))>=0}function st(e){return((xt(e)?e.ownerDocument:e.document)||window.document).documentElement}function Fn(e){return He(e)==="html"?e:e.assignedSlot||e.parentNode||(Dr(e)?e.host:null)||st(e)}function Fo(e){return!Ae(e)||Je(e).position==="fixed"?null:e.offsetParent}function Jl(e){var t=/firefox/i.test(Tr()),n=/Trident/i.test(Tr());if(n&&Ae(e)){var r=Je(e);if(r.position==="fixed")return null}var o=Fn(e);for(Dr(o)&&(o=o.host);Ae(o)&&["html","body"].indexOf(He(o))<0;){var i=Je(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function hn(e){for(var t=_e(e),n=Fo(e);n&&Yl(n)&&Je(n).position==="static";)n=Fo(n);return n&&(He(n)==="html"||He(n)==="body"&&Je(n).position==="static")?t:n||Jl(e)||t}function Lr(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function tn(e,t,n){return gt(e,In(t,n))}function Zl(e,t,n){var r=tn(e,t,n);return r>n?n:r}function Zi(){return{top:0,right:0,bottom:0,left:0}}function Qi(e){return Object.assign({},Zi(),e)}function es(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Ql=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Qi(typeof t!="number"?t:es(t,fn))};function ec(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,l=ze(n.placement),c=Lr(l),u=[Pe,Le].indexOf(l)>=0,d=u?"height":"width";if(!(!i||!a)){var f=Ql(o.padding,n),p=Br(i),v=c==="y"?Ce:Pe,g=c==="y"?Be:Le,m=n.rects.reference[d]+n.rects.reference[c]-a[c]-n.rects.popper[d],h=a[c]-n.rects.reference[c],T=hn(i),$=T?c==="y"?T.clientHeight||0:T.clientWidth||0:0,x=m/2-h/2,E=f[v],b=$-p[d]-f[g],S=$/2-p[d]/2+x,C=tn(E,S,b),A=c;n.modifiersData[r]=(t={},t[A]=C,t.centerOffset=C-S,t)}}function tc(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Ji(t.elements.popper,o)&&(t.elements.arrow=o))}const nc={name:"arrow",enabled:!0,phase:"main",fn:ec,effect:tc,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Dt(e){return e.split("-")[1]}var rc={top:"auto",right:"auto",bottom:"auto",left:"auto"};function oc(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:jt(n*o)/o||0,y:jt(r*o)/o||0}}function Vo(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,a=e.offsets,l=e.position,c=e.gpuAcceleration,u=e.adaptive,d=e.roundOffsets,f=e.isFixed,p=a.x,v=p===void 0?0:p,g=a.y,m=g===void 0?0:g,h=typeof d=="function"?d({x:v,y:m}):{x:v,y:m};v=h.x,m=h.y;var T=a.hasOwnProperty("x"),$=a.hasOwnProperty("y"),x=Pe,E=Ce,b=window;if(u){var S=hn(n),C="clientHeight",A="clientWidth";if(S===_e(n)&&(S=st(n),Je(S).position!=="static"&&l==="absolute"&&(C="scrollHeight",A="scrollWidth")),S=S,o===Ce||(o===Pe||o===Le)&&i===an){E=Be;var j=f&&S===b&&b.visualViewport?b.visualViewport.height:S[C];m-=j-r.height,m*=c?1:-1}if(o===Pe||(o===Ce||o===Be)&&i===an){x=Le;var I=f&&S===b&&b.visualViewport?b.visualViewport.width:S[A];v-=I-r.width,v*=c?1:-1}}var B=Object.assign({position:l},u&&rc),z=d===!0?oc({x:v,y:m},_e(n)):{x:v,y:m};if(v=z.x,m=z.y,c){var q;return Object.assign({},B,(q={},q[E]=$?"0":"",q[x]=T?"0":"",q.transform=(b.devicePixelRatio||1)<=1?"translate("+v+"px, "+m+"px)":"translate3d("+v+"px, "+m+"px, 0)",q))}return Object.assign({},B,(t={},t[E]=$?m+"px":"",t[x]=T?v+"px":"",t.transform="",t))}function ic(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,a=i===void 0?!0:i,l=n.roundOffsets,c=l===void 0?!0:l,u={placement:ze(t.placement),variation:Dt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Vo(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Vo(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const sc={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:ic,data:{}};var En={passive:!0};function ac(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,a=r.resize,l=a===void 0?!0:a,c=_e(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&u.forEach(function(d){d.addEventListener("scroll",n.update,En)}),l&&c.addEventListener("resize",n.update,En),function(){i&&u.forEach(function(d){d.removeEventListener("scroll",n.update,En)}),l&&c.removeEventListener("resize",n.update,En)}}const lc={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:ac,data:{}};var cc={left:"right",right:"left",bottom:"top",top:"bottom"};function Sn(e){return e.replace(/left|right|bottom|top/g,function(t){return cc[t]})}var uc={start:"end",end:"start"};function zo(e){return e.replace(/start|end/g,function(t){return uc[t]})}function Fr(e){var t=_e(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Vr(e){return At(st(e)).left+Fr(e).scrollLeft}function dc(e,t){var n=_e(e),r=st(e),o=n.visualViewport,i=r.clientWidth,a=r.clientHeight,l=0,c=0;if(o){i=o.width,a=o.height;var u=Yi();(u||!u&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:i,height:a,x:l+Vr(e),y:c}}function pc(e){var t,n=st(e),r=Fr(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=gt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=gt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Vr(e),c=-r.scrollTop;return Je(o||n).direction==="rtl"&&(l+=gt(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:l,y:c}}function zr(e){var t=Je(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function ts(e){return["html","body","#document"].indexOf(He(e))>=0?e.ownerDocument.body:Ae(e)&&zr(e)?e:ts(Fn(e))}function nn(e,t){var n;t===void 0&&(t=[]);var r=ts(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=_e(r),a=o?[i].concat(i.visualViewport||[],zr(r)?r:[]):r,l=t.concat(a);return o?l:l.concat(nn(Fn(a)))}function kr(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function fc(e,t){var n=At(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Uo(e,t,n){return t===Ki?kr(dc(e,n)):xt(t)?fc(t,n):kr(pc(st(e)))}function hc(e){var t=nn(Fn(e)),n=["absolute","fixed"].indexOf(Je(e).position)>=0,r=n&&Ae(e)?hn(e):e;return xt(r)?t.filter(function(o){return xt(o)&&Ji(o,r)&&He(o)!=="body"}):[]}function mc(e,t,n,r){var o=t==="clippingParents"?hc(e):[].concat(t),i=[].concat(o,[n]),a=i[0],l=i.reduce(function(c,u){var d=Uo(e,u,r);return c.top=gt(d.top,c.top),c.right=In(d.right,c.right),c.bottom=In(d.bottom,c.bottom),c.left=gt(d.left,c.left),c},Uo(e,a,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function ns(e){var t=e.reference,n=e.element,r=e.placement,o=r?ze(r):null,i=r?Dt(r):null,a=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Ce:c={x:a,y:t.y-n.height};break;case Be:c={x:a,y:t.y+t.height};break;case Le:c={x:t.x+t.width,y:l};break;case Pe:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var u=o?Lr(o):null;if(u!=null){var d=u==="y"?"height":"width";switch(i){case It:c[u]=c[u]-(t[d]/2-n[d]/2);break;case an:c[u]=c[u]+(t[d]/2-n[d]/2);break}}return c}function ln(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,a=i===void 0?e.strategy:i,l=n.boundary,c=l===void 0?jl:l,u=n.rootBoundary,d=u===void 0?Ki:u,f=n.elementContext,p=f===void 0?Wt:f,v=n.altBoundary,g=v===void 0?!1:v,m=n.padding,h=m===void 0?0:m,T=Qi(typeof h!="number"?h:es(h,fn)),$=p===Wt?Al:Wt,x=e.rects.popper,E=e.elements[g?$:p],b=mc(xt(E)?E:E.contextElement||st(e.elements.popper),c,d,a),S=At(e.elements.reference),C=ns({reference:S,element:x,strategy:"absolute",placement:o}),A=kr(Object.assign({},x,C)),j=p===Wt?A:S,I={top:b.top-j.top+T.top,bottom:j.bottom-b.bottom+T.bottom,left:b.left-j.left+T.left,right:j.right-b.right+T.right},B=e.modifiersData.offset;if(p===Wt&&B){var z=B[o];Object.keys(I).forEach(function(q){var _=[Le,Be].indexOf(q)>=0?1:-1,L=[Ce,Be].indexOf(q)>=0?"y":"x";I[q]+=z[L]*_})}return I}function gc(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,u=c===void 0?Xi:c,d=Dt(r),f=d?l?Lo:Lo.filter(function(g){return Dt(g)===d}):fn,p=f.filter(function(g){return u.indexOf(g)>=0});p.length===0&&(p=f);var v=p.reduce(function(g,m){return g[m]=ln(e,{placement:m,boundary:o,rootBoundary:i,padding:a})[ze(m)],g},{});return Object.keys(v).sort(function(g,m){return v[g]-v[m]})}function bc(e){if(ze(e)===Ar)return[];var t=Sn(e);return[zo(e),t,zo(t)]}function vc(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!0:a,c=n.fallbackPlacements,u=n.padding,d=n.boundary,f=n.rootBoundary,p=n.altBoundary,v=n.flipVariations,g=v===void 0?!0:v,m=n.allowedAutoPlacements,h=t.options.placement,T=ze(h),$=T===h,x=c||($||!g?[Sn(h)]:bc(h)),E=[h].concat(x).reduce(function(F,U){return F.concat(ze(U)===Ar?gc(t,{placement:U,boundary:d,rootBoundary:f,padding:u,flipVariations:g,allowedAutoPlacements:m}):U)},[]),b=t.rects.reference,S=t.rects.popper,C=new Map,A=!0,j=E[0],I=0;I<E.length;I++){var B=E[I],z=ze(B),q=Dt(B)===It,_=[Ce,Be].indexOf(z)>=0,L=_?"width":"height",R=ln(t,{placement:B,boundary:d,rootBoundary:f,altBoundary:p,padding:u}),D=_?q?Le:Pe:q?Be:Ce;b[L]>S[L]&&(D=Sn(D));var Q=Sn(D),Z=[];if(i&&Z.push(R[z]<=0),l&&Z.push(R[D]<=0,R[Q]<=0),Z.every(function(F){return F})){j=B,A=!1;break}C.set(B,Z)}if(A)for(var O=g?3:1,M=function(U){var W=E.find(function(G){var H=C.get(G);if(H)return H.slice(0,U).every(function(X){return X})});if(W)return j=W,"break"},V=O;V>0;V--){var K=M(V);if(K==="break")break}t.placement!==j&&(t.modifiersData[r]._skip=!0,t.placement=j,t.reset=!0)}}const yc={name:"flip",enabled:!0,phase:"main",fn:vc,requiresIfExists:["offset"],data:{_skip:!1}};function Ho(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function qo(e){return[Ce,Le,Be,Pe].some(function(t){return e[t]>=0})}function xc(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=ln(t,{elementContext:"reference"}),l=ln(t,{altBoundary:!0}),c=Ho(a,r),u=Ho(l,o,i),d=qo(c),f=qo(u);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:u,isReferenceHidden:d,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":d,"data-popper-escaped":f})}const wc={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:xc};function Ec(e,t,n){var r=ze(e),o=[Pe,Ce].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,a=i[0],l=i[1];return a=a||0,l=(l||0)*o,[Pe,Le].indexOf(r)>=0?{x:l,y:a}:{x:a,y:l}}function Tc(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,a=Xi.reduce(function(d,f){return d[f]=Ec(f,t.rects,i),d},{}),l=a[t.placement],c=l.x,u=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=u),t.modifiersData[r]=a}const kc={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Tc};function Oc(e){var t=e.state,n=e.name;t.modifiersData[n]=ns({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Sc={name:"popperOffsets",enabled:!0,phase:"read",fn:Oc,data:{}};function Cc(e){return e==="x"?"y":"x"}function Pc(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!1:a,c=n.boundary,u=n.rootBoundary,d=n.altBoundary,f=n.padding,p=n.tether,v=p===void 0?!0:p,g=n.tetherOffset,m=g===void 0?0:g,h=ln(t,{boundary:c,rootBoundary:u,padding:f,altBoundary:d}),T=ze(t.placement),$=Dt(t.placement),x=!$,E=Lr(T),b=Cc(E),S=t.modifiersData.popperOffsets,C=t.rects.reference,A=t.rects.popper,j=typeof m=="function"?m(Object.assign({},t.rects,{placement:t.placement})):m,I=typeof j=="number"?{mainAxis:j,altAxis:j}:Object.assign({mainAxis:0,altAxis:0},j),B=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,z={x:0,y:0};if(S){if(i){var q,_=E==="y"?Ce:Pe,L=E==="y"?Be:Le,R=E==="y"?"height":"width",D=S[E],Q=D+h[_],Z=D-h[L],O=v?-A[R]/2:0,M=$===It?C[R]:A[R],V=$===It?-A[R]:-C[R],K=t.elements.arrow,F=v&&K?Br(K):{width:0,height:0},U=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Zi(),W=U[_],G=U[L],H=tn(0,C[R],F[R]),X=x?C[R]/2-O-H-W-I.mainAxis:M-H-W-I.mainAxis,Y=x?-C[R]/2+O+H+G+I.mainAxis:V+H+G+I.mainAxis,re=t.elements.arrow&&hn(t.elements.arrow),N=re?E==="y"?re.clientTop||0:re.clientLeft||0:0,J=(q=B==null?void 0:B[E])!=null?q:0,P=D+X-J-N,oe=D+Y-J,ye=tn(v?In(Q,P):Q,D,v?gt(Z,oe):Z);S[E]=ye,z[E]=ye-D}if(l){var ke,me=E==="x"?Ce:Pe,lt=E==="x"?Be:Le,Oe=S[b],We=b==="y"?"height":"width",Re=Oe+h[me],Ge=Oe-h[lt],xe=[Ce,Pe].indexOf(T)!==-1,Et=(ke=B==null?void 0:B[b])!=null?ke:0,ct=xe?Re:Oe-C[We]-A[We]-Et+I.altAxis,Ft=xe?Oe+C[We]+A[We]-Et-I.altAxis:Ge,vn=v&&xe?Zl(ct,Oe,Ft):tn(v?ct:Re,Oe,v?Ft:Ge);S[b]=vn,z[b]=vn-Oe}t.modifiersData[r]=z}}const Rc={name:"preventOverflow",enabled:!0,phase:"main",fn:Pc,requiresIfExists:["offset"]};function Nc(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function $c(e){return e===_e(e)||!Ae(e)?Fr(e):Nc(e)}function Mc(e){var t=e.getBoundingClientRect(),n=jt(t.width)/e.offsetWidth||1,r=jt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function _c(e,t,n){n===void 0&&(n=!1);var r=Ae(t),o=Ae(t)&&Mc(t),i=st(t),a=At(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((He(t)!=="body"||zr(i))&&(l=$c(t)),Ae(t)?(c=At(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):i&&(c.x=Vr(i))),{x:a.left+l.scrollLeft-c.x,y:a.top+l.scrollTop-c.y,width:a.width,height:a.height}}function Ic(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var a=[].concat(i.requires||[],i.requiresIfExists||[]);a.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function jc(e){var t=Ic(e);return Wl.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Ac(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Dc(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var Wo={placement:"bottom",modifiers:[],strategy:"absolute"};function Go(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Bc(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?Wo:o;return function(l,c,u){u===void 0&&(u=i);var d={placement:"bottom",orderedModifiers:[],options:Object.assign({},Wo,i),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},f=[],p=!1,v={state:d,setOptions:function(T){var $=typeof T=="function"?T(d.options):T;m(),d.options=Object.assign({},i,d.options,$),d.scrollParents={reference:xt(l)?nn(l):l.contextElement?nn(l.contextElement):[],popper:nn(c)};var x=jc(Dc([].concat(r,d.options.modifiers)));return d.orderedModifiers=x.filter(function(E){return E.enabled}),g(),v.update()},forceUpdate:function(){if(!p){var T=d.elements,$=T.reference,x=T.popper;if(Go($,x)){d.rects={reference:_c($,hn(x),d.options.strategy==="fixed"),popper:Br(x)},d.reset=!1,d.placement=d.options.placement,d.orderedModifiers.forEach(function(I){return d.modifiersData[I.name]=Object.assign({},I.data)});for(var E=0;E<d.orderedModifiers.length;E++){if(d.reset===!0){d.reset=!1,E=-1;continue}var b=d.orderedModifiers[E],S=b.fn,C=b.options,A=C===void 0?{}:C,j=b.name;typeof S=="function"&&(d=S({state:d,options:A,name:j,instance:v})||d)}}}},update:Ac(function(){return new Promise(function(h){v.forceUpdate(),h(d)})}),destroy:function(){m(),p=!0}};if(!Go(l,c))return v;v.setOptions(u).then(function(h){!p&&u.onFirstUpdate&&u.onFirstUpdate(h)});function g(){d.orderedModifiers.forEach(function(h){var T=h.name,$=h.options,x=$===void 0?{}:$,E=h.effect;if(typeof E=="function"){var b=E({state:d,name:T,instance:v,options:x}),S=function(){};f.push(b||S)}})}function m(){f.forEach(function(h){return h()}),f=[]}return v}}var Lc=[lc,Sc,sc,Xl,kc,yc,Rc,nc,wc],Fc=Bc({defaultModifiers:Lc});const rs="Popper";function Vc(e){return Gi(rs,e)}vl(rs,["root"]);const zc=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Uc=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Hc(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function jn(e){return typeof e=="function"?e():e}function Vn(e){return e.nodeType!==void 0}function qc(e){return!Vn(e)}const Wc=()=>et({root:["root"]},pl(Vc)),Gc={},Kc=w.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:a,disablePortal:l,modifiers:c,open:u,placement:d,popperOptions:f,popperRef:p,slotProps:v={},slots:g={},TransitionProps:m}=t,h=ue(t,zc),T=w.useRef(null),$=De(T,n),x=w.useRef(null),E=De(x,p),b=w.useRef(E);vt(()=>{b.current=E},[E]),w.useImperativeHandle(p,()=>x.current,[]);const S=Hc(d,a),[C,A]=w.useState(S),[j,I]=w.useState(jn(o));w.useEffect(()=>{x.current&&x.current.forceUpdate()}),w.useEffect(()=>{o&&I(jn(o))},[o]),vt(()=>{if(!j||!u)return;const L=Q=>{A(Q.placement)};if(process.env.NODE_ENV!=="production"&&j&&Vn(j)&&j.nodeType===1){const Q=j.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Q.top===0&&Q.left===0&&Q.right===0&&Q.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let R=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:Q})=>{L(Q)}}];c!=null&&(R=R.concat(c)),f&&f.modifiers!=null&&(R=R.concat(f.modifiers));const D=Fc(j,T.current,k({placement:S},f,{modifiers:R}));return b.current(D),()=>{D.destroy(),b.current(null)}},[j,l,c,u,f,S]);const B={placement:C};m!==null&&(B.TransitionProps=m);const z=Wc(),q=(r=g.root)!=null?r:"div",_=yt({elementType:q,externalSlotProps:v.root,externalForwardedProps:h,additionalProps:{role:"tooltip",ref:$},ownerState:t,className:z.root});return y.jsx(q,k({},_,{children:typeof i=="function"?i(B):i}))}),os=w.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:a="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:u,open:d,placement:f="bottom",popperOptions:p=Gc,popperRef:v,style:g,transition:m=!1,slotProps:h={},slots:T={}}=t,$=ue(t,Uc),[x,E]=w.useState(!0),b=()=>{E(!1)},S=()=>{E(!0)};if(!c&&!d&&(!m||x))return null;let C;if(i)C=i;else if(r){const I=jn(r);C=I&&Vn(I)?Ee(I).body:Ee(null).body}const A=!d&&c&&(!m||x)?"none":void 0,j=m?{in:d,onEnter:b,onExited:S}:void 0;return y.jsx(sn,{disablePortal:l,container:C,children:y.jsx(Kc,k({anchorEl:r,direction:a,disablePortal:l,modifiers:u,ref:n,open:m?!x:d,placement:f,popperOptions:p,popperRef:v,slotProps:h,slots:T},$,{style:k({position:"fixed",top:0,left:0,display:A},g),TransitionProps:j,children:o}))})});process.env.NODE_ENV!=="production"&&(os.propTypes={anchorEl:Lt(s.oneOfType([Ye,s.object,s.func]),e=>{if(e.open){const t=jn(e.anchorEl);if(t&&Vn(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||qc(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:s.oneOfType([s.node,s.func]),container:s.oneOfType([Ye,s.func]),direction:s.oneOf(["ltr","rtl"]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:jr,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),transition:s.bool});const Xc=["values","unit","step"],Yc=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>k({},n,{[r.key]:r.val}),{})};function Jc(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=ue(e,Xc),i=Yc(t),a=Object.keys(i);function l(p){return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n})`}function c(p){return`@media (max-width:${(typeof t[p]=="number"?t[p]:p)-r/100}${n})`}function u(p,v){const g=a.indexOf(v);return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n}) and (max-width:${(g!==-1&&typeof t[a[g]]=="number"?t[a[g]]:v)-r/100}${n})`}function d(p){return a.indexOf(p)+1<a.length?u(p,a[a.indexOf(p)+1]):l(p)}function f(p){const v=a.indexOf(p);return v===0?l(a[1]):v===a.length-1?c(a[v]):u(p,a[a.indexOf(p)+1]).replace("@media","@media not all and")}return k({keys:a,values:i,up:l,down:c,between:u,only:d,not:f,unit:n},o)}const Zc={borderRadius:4},Qc=Zc,eu=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.string,s.object,s.array]):{},at=eu;function rn(e,t){return t?Xe(e,t,{clone:!1}):e}const Ur={xs:0,sm:600,md:900,lg:1200,xl:1536},Ko={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Ur[e]}px)`};function Ze(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||Ko;return t.reduce((a,l,c)=>(a[i.up(i.keys[c])]=n(t[c]),a),{})}if(typeof t=="object"){const i=r.breakpoints||Ko;return Object.keys(t).reduce((a,l)=>{if(Object.keys(i.values||Ur).indexOf(l)!==-1){const c=i.up(l);a[c]=n(t[l],l)}else{const c=l;a[c]=t[c]}return a},{})}return n(t)}function tu(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function nu(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function zn(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function An(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=zn(e,n)||r,t&&(o=t(o,r,e)),o}function ve(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=a=>{if(a[t]==null)return null;const l=a[t],c=a.theme,u=zn(c,r)||{};return Ze(a,l,f=>{let p=An(u,o,f);return f===p&&typeof f=="string"&&(p=An(u,o,`${t}${f==="default"?"":Ue(f)}`,f)),n===!1?p:{[n]:p}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:at}:{},i.filterProps=[t],i}function ru(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const ou={m:"margin",p:"padding"},iu={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Xo={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},su=ru(e=>{if(e.length>2)if(Xo[e])e=Xo[e];else return[e];const[t,n]=e.split(""),r=ou[t],o=iu[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),Un=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Hn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],au=[...Un,...Hn];function mn(e,t,n,r){var o;const i=(o=zn(e,t,!1))!=null?o:n;return typeof i=="number"?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&typeof a!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`),i*a):Array.isArray(i)?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&(Number.isInteger(a)?a>i.length-1&&console.error([`MUI: The value provided (${a}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${a} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[a]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function is(e){return mn(e,"spacing",8,"spacing")}function gn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function lu(e,t){return n=>e.reduce((r,o)=>(r[o]=gn(t,n),r),{})}function cu(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=su(n),i=lu(o,r),a=e[n];return Ze(e,a,i)}function ss(e,t){const n=is(e.theme);return Object.keys(e).map(r=>cu(e,t,r,n)).reduce(rn,{})}function fe(e){return ss(e,Un)}fe.propTypes=process.env.NODE_ENV!=="production"?Un.reduce((e,t)=>(e[t]=at,e),{}):{};fe.filterProps=Un;function he(e){return ss(e,Hn)}he.propTypes=process.env.NODE_ENV!=="production"?Hn.reduce((e,t)=>(e[t]=at,e),{}):{};he.filterProps=Hn;process.env.NODE_ENV!=="production"&&au.reduce((e,t)=>(e[t]=at,e),{});function uu(e=8){if(e.mui)return e;const t=is({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const a=t(i);return typeof a=="number"?`${a}px`:a}).join(" "));return n.mui=!0,n}function qn(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?rn(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function je(e){return typeof e!="number"?e:`${e}px solid`}function Fe(e,t){return ve({prop:e,themeKey:"borders",transform:t})}const du=Fe("border",je),pu=Fe("borderTop",je),fu=Fe("borderRight",je),hu=Fe("borderBottom",je),mu=Fe("borderLeft",je),gu=Fe("borderColor"),bu=Fe("borderTopColor"),vu=Fe("borderRightColor"),yu=Fe("borderBottomColor"),xu=Fe("borderLeftColor"),wu=Fe("outline",je),Eu=Fe("outlineColor"),Wn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=mn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:gn(t,r)});return Ze(e,e.borderRadius,n)}return null};Wn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:at}:{};Wn.filterProps=["borderRadius"];qn(du,pu,fu,hu,mu,gu,bu,vu,yu,xu,Wn,wu,Eu);const Gn=e=>{if(e.gap!==void 0&&e.gap!==null){const t=mn(e.theme,"spacing",8,"gap"),n=r=>({gap:gn(t,r)});return Ze(e,e.gap,n)}return null};Gn.propTypes=process.env.NODE_ENV!=="production"?{gap:at}:{};Gn.filterProps=["gap"];const Kn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=mn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:gn(t,r)});return Ze(e,e.columnGap,n)}return null};Kn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:at}:{};Kn.filterProps=["columnGap"];const Xn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=mn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:gn(t,r)});return Ze(e,e.rowGap,n)}return null};Xn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:at}:{};Xn.filterProps=["rowGap"];const Tu=ve({prop:"gridColumn"}),ku=ve({prop:"gridRow"}),Ou=ve({prop:"gridAutoFlow"}),Su=ve({prop:"gridAutoColumns"}),Cu=ve({prop:"gridAutoRows"}),Pu=ve({prop:"gridTemplateColumns"}),Ru=ve({prop:"gridTemplateRows"}),Nu=ve({prop:"gridTemplateAreas"}),$u=ve({prop:"gridArea"});qn(Gn,Kn,Xn,Tu,ku,Ou,Su,Cu,Pu,Ru,Nu,$u);function $t(e,t){return t==="grey"?t:e}const Mu=ve({prop:"color",themeKey:"palette",transform:$t}),_u=ve({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:$t}),Iu=ve({prop:"backgroundColor",themeKey:"palette",transform:$t});qn(Mu,_u,Iu);function Me(e){return e<=1&&e!==0?`${e*100}%`:e}const ju=ve({prop:"width",transform:Me}),Hr=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Ur[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:Me(n)}};return Ze(e,e.maxWidth,t)}return null};Hr.filterProps=["maxWidth"];const Au=ve({prop:"minWidth",transform:Me}),Du=ve({prop:"height",transform:Me}),Bu=ve({prop:"maxHeight",transform:Me}),Lu=ve({prop:"minHeight",transform:Me});ve({prop:"size",cssProperty:"width",transform:Me});ve({prop:"size",cssProperty:"height",transform:Me});const Fu=ve({prop:"boxSizing"});qn(ju,Hr,Au,Du,Bu,Lu,Fu);const Vu={border:{themeKey:"borders",transform:je},borderTop:{themeKey:"borders",transform:je},borderRight:{themeKey:"borders",transform:je},borderBottom:{themeKey:"borders",transform:je},borderLeft:{themeKey:"borders",transform:je},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:je},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Wn},color:{themeKey:"palette",transform:$t},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:$t},backgroundColor:{themeKey:"palette",transform:$t},p:{style:he},pt:{style:he},pr:{style:he},pb:{style:he},pl:{style:he},px:{style:he},py:{style:he},padding:{style:he},paddingTop:{style:he},paddingRight:{style:he},paddingBottom:{style:he},paddingLeft:{style:he},paddingX:{style:he},paddingY:{style:he},paddingInline:{style:he},paddingInlineStart:{style:he},paddingInlineEnd:{style:he},paddingBlock:{style:he},paddingBlockStart:{style:he},paddingBlockEnd:{style:he},m:{style:fe},mt:{style:fe},mr:{style:fe},mb:{style:fe},ml:{style:fe},mx:{style:fe},my:{style:fe},margin:{style:fe},marginTop:{style:fe},marginRight:{style:fe},marginBottom:{style:fe},marginLeft:{style:fe},marginX:{style:fe},marginY:{style:fe},marginInline:{style:fe},marginInlineStart:{style:fe},marginInlineEnd:{style:fe},marginBlock:{style:fe},marginBlockStart:{style:fe},marginBlockEnd:{style:fe},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Gn},rowGap:{style:Xn},columnGap:{style:Kn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Me},maxWidth:{style:Hr},minWidth:{transform:Me},height:{transform:Me},maxHeight:{transform:Me},minHeight:{transform:Me},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},qr=Vu;function zu(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Uu(e,t){return typeof e=="function"?e(t):e}function Hu(){function e(n,r,o,i){const a={[n]:r,theme:o},l=i[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:u,transform:d,style:f}=l;if(r==null)return null;if(u==="typography"&&r==="inherit")return{[n]:r};const p=zn(o,u)||{};return f?f(a):Ze(a,r,g=>{let m=An(p,d,g);return g===m&&typeof g=="string"&&(m=An(p,d,`${n}${g==="default"?"":Ue(g)}`,g)),c===!1?m:{[c]:m}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const a=(r=i.unstable_sxConfig)!=null?r:qr;function l(c){let u=c;if(typeof c=="function")u=c(i);else if(typeof c!="object")return c;if(!u)return null;const d=tu(i.breakpoints),f=Object.keys(d);let p=d;return Object.keys(u).forEach(v=>{const g=Uu(u[v],i);if(g!=null)if(typeof g=="object")if(a[v])p=rn(p,e(v,g,i,a));else{const m=Ze({theme:i},g,h=>({[v]:h}));zu(m,g)?p[v]=t({sx:g,theme:i}):p=rn(p,m)}else p=rn(p,e(v,g,i,a))}),nu(f,p)}return Array.isArray(o)?o.map(l):l(o)}return t}const as=Hu();as.filterProps=["sx"];const Wr=as;function qu(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Wu=["breakpoints","palette","spacing","shape"];function Gr(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,a=ue(e,Wu),l=Jc(n),c=uu(o);let u=Xe({breakpoints:l,direction:"ltr",components:{},palette:k({mode:"light"},r),spacing:c,shape:k({},Qc,i)},a);return u.applyStyles=qu,u=t.reduce((d,f)=>Xe(d,f),u),u.unstable_sxConfig=k({},qr,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(f){return Wr({sx:f,theme:this})},u}function Gu(e){return Object.keys(e).length===0}function ls(e=null){const t=w.useContext(br.ThemeContext);return!t||Gu(t)?e:t}const Ku=Gr();function cs(e=Ku){return ls(e)}const Xu=["ownerState"],Yu=["variants"],Ju=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Zu(e){return Object.keys(e).length===0}function Qu(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Cn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const ed=Gr(),Yo=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Tn({defaultTheme:e,theme:t,themeId:n}){return Zu(t)?e:t[n]||t}function td(e){return e?(t,n)=>n[e]:null}function Pn(e,t){let{ownerState:n}=t,r=ue(t,Xu);const o=typeof e=="function"?e(k({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>Pn(i,k({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let l=ue(o,Yu);return i.forEach(c=>{let u=!0;typeof c.props=="function"?u=c.props(k({ownerState:n},r)):Object.keys(c.props).forEach(d=>{(n==null?void 0:n[d])!==c.props[d]&&r[d]!==c.props[d]&&(u=!1)}),u&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(k({ownerState:n},r)):c.style))}),l}return o}function nd(e={}){const{themeId:t,defaultTheme:n=ed,rootShouldForwardProp:r=Cn,slotShouldForwardProp:o=Cn}=e,i=a=>Wr(k({},a,{theme:Tn(k({},a,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(a,l={})=>{br.internal_processStyles(a,b=>b.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:c,slot:u,skipVariantsResolver:d,skipSx:f,overridesResolver:p=td(Yo(u))}=l,v=ue(l,Ju),g=d!==void 0?d:u&&u!=="Root"&&u!=="root"||!1,m=f||!1;let h;process.env.NODE_ENV!=="production"&&c&&(h=`${c}-${Yo(u||"Root")}`);let T=Cn;u==="Root"||u==="root"?T=r:u?T=o:Qu(a)&&(T=void 0);const $=br(a,k({shouldForwardProp:T,label:h},v)),x=b=>typeof b=="function"&&b.__emotion_real!==b||ht(b)?S=>Pn(b,k({},S,{theme:Tn({theme:S.theme,defaultTheme:n,themeId:t})})):b,E=(b,...S)=>{let C=x(b);const A=S?S.map(x):[];c&&p&&A.push(B=>{const z=Tn(k({},B,{defaultTheme:n,themeId:t}));if(!z.components||!z.components[c]||!z.components[c].styleOverrides)return null;const q=z.components[c].styleOverrides,_={};return Object.entries(q).forEach(([L,R])=>{_[L]=Pn(R,k({},B,{theme:z}))}),p(B,_)}),c&&!g&&A.push(B=>{var z;const q=Tn(k({},B,{defaultTheme:n,themeId:t})),_=q==null||(z=q.components)==null||(z=z[c])==null?void 0:z.variants;return Pn({variants:_},k({},B,{theme:q}))}),m||A.push(i);const j=A.length-S.length;if(Array.isArray(b)&&j>0){const B=new Array(j).fill("");C=[...b,...B],C.raw=[...b.raw,...B]}const I=$(C,...A);if(process.env.NODE_ENV!=="production"){let B;c&&(B=`${c}${Ue(u||"")}`),B===void 0&&(B=`Styled(${Fa(a)})`),I.displayName=B}return a.muiName&&(I.muiName=a.muiName),I};return $.withConfig&&(E.withConfig=$.withConfig),E}}function rd(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:Vi(t.components[n].defaultProps,r)}function od({props:e,name:t,defaultTheme:n,themeId:r}){let o=cs(n);return r&&(o=o[r]||o),rd({theme:o,name:t,props:e})}function Kr(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),cl(e,t,n)}function id(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function wt(e){if(e.type)return e;if(e.charAt(0)==="#")return wt(id(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Mt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Mt(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function Yn(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function sd(e){e=wt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),a=(u,d=(u+n/30)%12)=>o-i*Math.max(Math.min(d-3,9-d,1),-1);let l="rgb";const c=[Math.round(a(0)*255),Math.round(a(8)*255),Math.round(a(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),Yn({type:l,values:c})}function Jo(e){e=wt(e);let t=e.type==="hsl"||e.type==="hsla"?wt(sd(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Zo(e,t){const n=Jo(e),r=Jo(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function Dn(e,t){return e=wt(e),t=Kr(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Yn(e)}function ad(e,t){if(e=wt(e),t=Kr(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return Yn(e)}function ld(e,t){if(e=wt(e),t=Kr(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return Yn(e)}function cd(e,t){return k({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const ud={black:"#000",white:"#fff"},cn=ud,dd={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},pd=dd,fd={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Tt=fd,hd={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},kt=hd,md={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Gt=md,gd={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ot=gd,bd={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},St=bd,vd={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Ct=vd,yd=["mode","contrastThreshold","tonalOffset"],Qo={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:cn.white,default:cn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},ur={text:{primary:cn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:cn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function ei(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=ld(e.main,o):t==="dark"&&(e.dark=ad(e.main,i)))}function xd(e="light"){return e==="dark"?{main:Ot[200],light:Ot[50],dark:Ot[400]}:{main:Ot[700],light:Ot[400],dark:Ot[800]}}function wd(e="light"){return e==="dark"?{main:Tt[200],light:Tt[50],dark:Tt[400]}:{main:Tt[500],light:Tt[300],dark:Tt[700]}}function Ed(e="light"){return e==="dark"?{main:kt[500],light:kt[300],dark:kt[700]}:{main:kt[700],light:kt[400],dark:kt[800]}}function Td(e="light"){return e==="dark"?{main:St[400],light:St[300],dark:St[700]}:{main:St[700],light:St[500],dark:St[900]}}function kd(e="light"){return e==="dark"?{main:Ct[400],light:Ct[300],dark:Ct[700]}:{main:Ct[800],light:Ct[500],dark:Ct[900]}}function Od(e="light"){return e==="dark"?{main:Gt[400],light:Gt[300],dark:Gt[700]}:{main:"#ed6c02",light:Gt[500],dark:Gt[900]}}function Sd(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=ue(e,yd),i=e.primary||xd(t),a=e.secondary||wd(t),l=e.error||Ed(t),c=e.info||Td(t),u=e.success||kd(t),d=e.warning||Od(t);function f(m){const h=Zo(m,ur.text.primary)>=n?ur.text.primary:Qo.text.primary;if(process.env.NODE_ENV!=="production"){const T=Zo(m,h);T<3&&console.error([`MUI: The contrast ratio of ${T}:1 for ${h} on ${m}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return h}const p=({color:m,name:h,mainShade:T=500,lightShade:$=300,darkShade:x=700})=>{if(m=k({},m),!m.main&&m[T]&&(m.main=m[T]),!m.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${T}\` property.`:Mt(11,h?` (${h})`:"",T));if(typeof m.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Mt(12,h?` (${h})`:"",JSON.stringify(m.main)));return ei(m,"light",$,r),ei(m,"dark",x,r),m.contrastText||(m.contrastText=f(m.main)),m},v={dark:ur,light:Qo};return process.env.NODE_ENV!=="production"&&(v[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),Xe(k({common:k({},cn),mode:t,primary:p({color:i,name:"primary"}),secondary:p({color:a,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:p({color:l,name:"error"}),warning:p({color:d,name:"warning"}),info:p({color:c,name:"info"}),success:p({color:u,name:"success"}),grey:pd,contrastThreshold:n,getContrastText:f,augmentColor:p,tonalOffset:r},v[t]),o)}const Cd=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Pd(e){return Math.round(e*1e5)/1e5}const ti={textTransform:"uppercase"},ni='"Roboto", "Helvetica", "Arial", sans-serif';function Rd(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=ni,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:a=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:u=16,allVariants:d,pxToRem:f}=n,p=ue(n,Cd);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const v=o/14,g=f||(T=>`${T/u*v}rem`),m=(T,$,x,E,b)=>k({fontFamily:r,fontWeight:T,fontSize:g($),lineHeight:x},r===ni?{letterSpacing:`${Pd(E/$)}em`}:{},b,d),h={h1:m(i,96,1.167,-1.5),h2:m(i,60,1.2,-.5),h3:m(a,48,1.167,0),h4:m(a,34,1.235,.25),h5:m(a,24,1.334,0),h6:m(l,20,1.6,.15),subtitle1:m(a,16,1.75,.15),subtitle2:m(l,14,1.57,.1),body1:m(a,16,1.5,.15),body2:m(a,14,1.43,.15),button:m(l,14,1.75,.4,ti),caption:m(a,12,1.66,.4),overline:m(a,12,2.66,1,ti),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return Xe(k({htmlFontSize:u,pxToRem:g,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:a,fontWeightMedium:l,fontWeightBold:c},h),p,{clone:!1})}const Nd=.2,$d=.14,Md=.12;function pe(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Nd})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${$d})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Md})`].join(",")}const _d=["none",pe(0,2,1,-1,0,1,1,0,0,1,3,0),pe(0,3,1,-2,0,2,2,0,0,1,5,0),pe(0,3,3,-2,0,3,4,0,0,1,8,0),pe(0,2,4,-1,0,4,5,0,0,1,10,0),pe(0,3,5,-1,0,5,8,0,0,1,14,0),pe(0,3,5,-1,0,6,10,0,0,1,18,0),pe(0,4,5,-2,0,7,10,1,0,2,16,1),pe(0,5,5,-3,0,8,10,1,0,3,14,2),pe(0,5,6,-3,0,9,12,1,0,3,16,2),pe(0,6,6,-3,0,10,14,1,0,4,18,3),pe(0,6,7,-4,0,11,15,1,0,4,20,3),pe(0,7,8,-4,0,12,17,2,0,5,22,4),pe(0,7,8,-4,0,13,19,2,0,5,24,4),pe(0,7,9,-4,0,14,21,2,0,5,26,4),pe(0,8,9,-5,0,15,22,2,0,6,28,5),pe(0,8,10,-5,0,16,24,2,0,6,30,5),pe(0,8,11,-5,0,17,26,2,0,6,32,5),pe(0,9,11,-5,0,18,28,2,0,7,34,6),pe(0,9,12,-6,0,19,29,2,0,7,36,6),pe(0,10,13,-6,0,20,31,3,0,8,38,7),pe(0,10,13,-6,0,21,33,3,0,8,40,7),pe(0,10,14,-6,0,22,35,3,0,8,42,7),pe(0,11,14,-7,0,23,36,3,0,9,44,8),pe(0,11,15,-7,0,24,38,3,0,9,46,8)],Id=_d,jd=["duration","easing","delay"],Ad={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Dd={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function ri(e){return`${Math.round(e)}ms`}function Bd(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Ld(e){const t=k({},Ad,e.easing),n=k({},Dd,e.duration);return k({getAutoHeightDuration:Bd,create:(o=["all"],i={})=>{const{duration:a=n.standard,easing:l=t.easeInOut,delay:c=0}=i,u=ue(i,jd);if(process.env.NODE_ENV!=="production"){const d=p=>typeof p=="string",f=p=>!isNaN(parseFloat(p));!d(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!f(a)&&!d(a)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`),d(l)||console.error('MUI: Argument "easing" must be a string.'),!f(c)&&!d(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(d=>`${d} ${typeof a=="string"?a:ri(a)} ${l} ${typeof c=="string"?c:ri(c)}`).join(",")}},e,{easing:t,duration:n})}const Fd={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Vd=Fd,zd=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Ud(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,a=ue(e,zd);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Mt(18));const l=Sd(r),c=Gr(e);let u=Xe(c,{mixins:cd(c.breakpoints,n),palette:l,shadows:Id.slice(),typography:Rd(l,i),transitions:Ld(o),zIndex:k({},Vd)});if(u=Xe(u,a),u=t.reduce((d,f)=>Xe(d,f),u),process.env.NODE_ENV!=="production"){const d=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],f=(p,v)=>{let g;for(g in p){const m=p[g];if(d.indexOf(g)!==-1&&Object.keys(m).length>0){if(process.env.NODE_ENV!=="production"){const h=qe("",g);console.error([`MUI: The \`${v}\` component increases the CSS specificity of the \`${g}\` internal state.`,"You can not override it like this: ",JSON.stringify(p,null,2),"",`Instead, you need to use the '&.${h}' syntax:`,JSON.stringify({root:{[`&.${h}`]:m}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}p[g]={}}}};Object.keys(u.components).forEach(p=>{const v=u.components[p].styleOverrides;v&&p.indexOf("Mui")===0&&f(v,p)})}return u.unstable_sxConfig=k({},qr,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(f){return Wr({sx:f,theme:this})},u}const Hd=Ud(),Xr=Hd,Yr="$$material",us=e=>Cn(e)&&e!=="classes",qd=nd({themeId:Yr,defaultTheme:Xr,rootShouldForwardProp:us}),Te=qd;function bn(){const e=cs(Xr);return process.env.NODE_ENV!=="production"&&w.useDebugValue(e),e[Yr]||e}function tt({props:e,name:t}){return od({props:e,name:t,defaultTheme:Xr,themeId:Yr})}function Or(e,t){return Or=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},Or(e,t)}function Wd(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Or(e,t)}const oi={disabled:!1};var Gd=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.shape({enter:s.number,exit:s.number,appear:s.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&s.oneOfType([s.string,s.shape({enter:s.string,exit:s.string,active:s.string}),s.shape({enter:s.string,enterDone:s.string,enterActive:s.string,exit:s.string,exitDone:s.string,exitActive:s.string})]);const ds=ee.createContext(null);var Kd=function(t){return t.scrollTop},Qt="unmounted",dt="exited",pt="entering",Nt="entered",Sr="exiting",nt=function(e){Wd(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var a=o,l=a&&!a.isMounting?r.enter:r.appear,c;return i.appearStatus=null,r.in?l?(c=dt,i.appearStatus=pt):c=Nt:r.unmountOnExit||r.mountOnEnter?c=Qt:c=dt,i.state={status:c},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var a=o.in;return a&&i.status===Qt?{status:dt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var a=this.state.status;this.props.in?a!==pt&&a!==Nt&&(i=pt):(a===pt||a===Nt)&&(i=Sr)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,a,l;return i=a=l=o,o!=null&&typeof o!="number"&&(i=o.exit,a=o.enter,l=o.appear!==void 0?o.appear:a),{exit:i,enter:a,appear:l}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===pt){if(this.props.unmountOnExit||this.props.mountOnEnter){var a=this.props.nodeRef?this.props.nodeRef.current:Yt.findDOMNode(this);a&&Kd(a)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===dt&&this.setState({status:Qt})},n.performEnter=function(o){var i=this,a=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[Yt.findDOMNode(this),l],u=c[0],d=c[1],f=this.getTimeouts(),p=l?f.appear:f.enter;if(!o&&!a||oi.disabled){this.safeSetState({status:Nt},function(){i.props.onEntered(u)});return}this.props.onEnter(u,d),this.safeSetState({status:pt},function(){i.props.onEntering(u,d),i.onTransitionEnd(p,function(){i.safeSetState({status:Nt},function(){i.props.onEntered(u,d)})})})},n.performExit=function(){var o=this,i=this.props.exit,a=this.getTimeouts(),l=this.props.nodeRef?void 0:Yt.findDOMNode(this);if(!i||oi.disabled){this.safeSetState({status:dt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:Sr},function(){o.props.onExiting(l),o.onTransitionEnd(a.exit,function(){o.safeSetState({status:dt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,a=!0;return this.nextCallback=function(l){a&&(a=!1,i.nextCallback=null,o(l))},this.nextCallback.cancel=function(){a=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var a=this.props.nodeRef?this.props.nodeRef.current:Yt.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!a||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[a,this.nextCallback],u=c[0],d=c[1];this.props.addEndListener(u,d)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===Qt)return null;var i=this.props,a=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var l=ue(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return ee.createElement(ds.Provider,{value:null},typeof a=="function"?a(o,l):ee.cloneElement(ee.Children.only(a),l))},t}(ee.Component);nt.contextType=ds;nt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:s.shape({current:typeof Element>"u"?s.any:function(e,t,n,r,o,i){var a=e[t];return s.instanceOf(a&&"ownerDocument"in a?a.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:s.oneOfType([s.func.isRequired,s.element.isRequired]).isRequired,in:s.bool,mountOnEnter:s.bool,unmountOnExit:s.bool,appear:s.bool,enter:s.bool,exit:s.bool,timeout:function(t){var n=Gd;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:s.func,onEnter:s.func,onEntering:s.func,onEntered:s.func,onExit:s.func,onExiting:s.func,onExited:s.func}:{};function Pt(){}nt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Pt,onEntering:Pt,onEntered:Pt,onExit:Pt,onExiting:Pt,onExited:Pt};nt.UNMOUNTED=Qt;nt.EXITED=dt;nt.ENTERING=pt;nt.ENTERED=Nt;nt.EXITING=Sr;const ps=nt,fs=e=>e.scrollTop;function Bn(e,t){var n,r;const{timeout:o,easing:i,style:a={}}=e;return{duration:(n=a.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=a.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:a.transitionDelay}}const Xd=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function Cr(e){return`scale(${e}, ${e**2})`}const Yd={entering:{opacity:1,transform:Cr(1)},entered:{opacity:1,transform:"none"}},dr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Jr=w.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:a,in:l,onEnter:c,onEntered:u,onEntering:d,onExit:f,onExited:p,onExiting:v,style:g,timeout:m="auto",TransitionComponent:h=ps}=t,T=ue(t,Xd),$=Jt(),x=w.useRef(),E=bn(),b=w.useRef(null),S=De(b,i.ref,n),C=L=>R=>{if(L){const D=b.current;R===void 0?L(D):L(D,R)}},A=C(d),j=C((L,R)=>{fs(L);const{duration:D,delay:Q,easing:Z}=Bn({style:g,timeout:m,easing:a},{mode:"enter"});let O;m==="auto"?(O=E.transitions.getAutoHeightDuration(L.clientHeight),x.current=O):O=D,L.style.transition=[E.transitions.create("opacity",{duration:O,delay:Q}),E.transitions.create("transform",{duration:dr?O:O*.666,delay:Q,easing:Z})].join(","),c&&c(L,R)}),I=C(u),B=C(v),z=C(L=>{const{duration:R,delay:D,easing:Q}=Bn({style:g,timeout:m,easing:a},{mode:"exit"});let Z;m==="auto"?(Z=E.transitions.getAutoHeightDuration(L.clientHeight),x.current=Z):Z=R,L.style.transition=[E.transitions.create("opacity",{duration:Z,delay:D}),E.transitions.create("transform",{duration:dr?Z:Z*.666,delay:dr?D:D||Z*.333,easing:Q})].join(","),L.style.opacity=0,L.style.transform=Cr(.75),f&&f(L)}),q=C(p),_=L=>{m==="auto"&&$.start(x.current||0,L),r&&r(b.current,L)};return y.jsx(h,k({appear:o,in:l,nodeRef:b,onEnter:j,onEntered:I,onEntering:A,onExit:z,onExited:q,onExiting:B,addEndListener:_,timeout:m==="auto"?null:m},T,{children:(L,R)=>w.cloneElement(i,k({style:k({opacity:0,transform:Cr(.75),visibility:L==="exited"&&!l?"hidden":void 0},Yd[L],g,i.props.style),ref:S},R))}))});process.env.NODE_ENV!=="production"&&(Jr.propTypes={addEndListener:s.func,appear:s.bool,children:dn.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});Jr.muiSupportAuto=!0;const Pr=Jr,Jd=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},ii=Jd,Zd=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Qd=Te(os,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),hs=w.forwardRef(function(t,n){var r;const o=ls(),i=tt({props:t,name:"MuiPopper"}),{anchorEl:a,component:l,components:c,componentsProps:u,container:d,disablePortal:f,keepMounted:p,modifiers:v,open:g,placement:m,popperOptions:h,popperRef:T,transition:$,slots:x,slotProps:E}=i,b=ue(i,Zd),S=(r=x==null?void 0:x.root)!=null?r:c==null?void 0:c.Root,C=k({anchorEl:a,container:d,disablePortal:f,keepMounted:p,modifiers:v,open:g,placement:m,popperOptions:h,popperRef:T,transition:$},b);return y.jsx(Qd,k({as:l,direction:o==null?void 0:o.direction,slots:{root:S},slotProps:E??u},C,{ref:n}))});process.env.NODE_ENV!=="production"&&(hs.propTypes={anchorEl:s.oneOfType([Ye,s.object,s.func]),children:s.oneOfType([s.node,s.func]),component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Ye,s.func]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:jr,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transition:s.bool});const ms=hs;function ep(e){return qe("MuiTooltip",e)}const tp=it("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),ot=tp,np=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function rp(e){return Math.round(e*1e5)/1e5}const op=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,a={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Ue(i.split("-")[0])}`],arrow:["arrow"]};return et(a,ep,t)},ip=Te(ms,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>k({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${ot.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${ot.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${ot.arrow}`]:k({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${ot.arrow}`]:k({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),sp=Te("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Ue(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>k({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:Dn(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${rp(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${ot.popper}[data-popper-placement*="left"] &`]:k({transformOrigin:"right center"},t.isRtl?k({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):k({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${ot.popper}[data-popper-placement*="right"] &`]:k({transformOrigin:"left center"},t.isRtl?k({marginRight:"14px"},t.touch&&{marginRight:"24px"}):k({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${ot.popper}[data-popper-placement*="top"] &`]:k({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${ot.popper}[data-popper-placement*="bottom"] &`]:k({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),ap=Te("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:Dn(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let kn=!1;const si=new pn;let Kt={x:0,y:0};function On(e,t){return n=>{t&&t(n),e(n)}}const gs=w.forwardRef(function(t,n){var r,o,i,a,l,c,u,d,f,p,v,g,m,h,T,$,x,E,b;const S=tt({props:t,name:"MuiTooltip"}),{arrow:C=!1,children:A,components:j={},componentsProps:I={},describeChild:B=!1,disableFocusListener:z=!1,disableHoverListener:q=!1,disableInteractive:_=!1,disableTouchListener:L=!1,enterDelay:R=100,enterNextDelay:D=0,enterTouchDelay:Q=700,followCursor:Z=!1,id:O,leaveDelay:M=0,leaveTouchDelay:V=1500,onClose:K,onOpen:F,open:U,placement:W="bottom",PopperComponent:G,PopperProps:H={},slotProps:X={},slots:Y={},title:re,TransitionComponent:N=Pr,TransitionProps:J}=S,P=ue(S,np),oe=w.isValidElement(A)?A:y.jsx("span",{children:A}),ye=bn(),ke=ye.direction==="rtl",[me,lt]=w.useState(),[Oe,We]=w.useState(null),Re=w.useRef(!1),Ge=_||Z,xe=Jt(),Et=Jt(),ct=Jt(),Ft=Jt(),[vn,no]=ji({controlled:U,default:!1,name:"Tooltip",state:"open"});let Ke=vn;if(process.env.NODE_ENV!=="production"){const{current:te}=w.useRef(U!==void 0);w.useEffect(()=>{me&&me.disabled&&!te&&re!==""&&me.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[re,me,te])}const Jn=Ii(O),Vt=w.useRef(),yn=on(()=>{Vt.current!==void 0&&(document.body.style.WebkitUserSelect=Vt.current,Vt.current=void 0),Ft.clear()});w.useEffect(()=>yn,[yn]);const ro=te=>{si.clear(),kn=!0,no(!0),F&&!Ke&&F(te)},xn=on(te=>{si.start(800+M,()=>{kn=!1}),no(!1),K&&Ke&&K(te),xe.start(ye.transitions.duration.shortest,()=>{Re.current=!1})}),Zn=te=>{Re.current&&te.type!=="touchstart"||(me&&me.removeAttribute("title"),Et.clear(),ct.clear(),R||kn&&D?Et.start(kn?D:R,()=>{ro(te)}):ro(te))},oo=te=>{Et.clear(),ct.start(M,()=>{xn(te)})},{isFocusVisibleRef:io,onBlur:Is,onFocus:js,ref:As}=Ai(),[,so]=w.useState(!1),ao=te=>{Is(te),io.current===!1&&(so(!1),oo(te))},lo=te=>{me||lt(te.currentTarget),js(te),io.current===!0&&(so(!0),Zn(te))},co=te=>{Re.current=!0;const Ne=oe.props;Ne.onTouchStart&&Ne.onTouchStart(te)},uo=Zn,po=oo,Ds=te=>{co(te),ct.clear(),xe.clear(),yn(),Vt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Ft.start(Q,()=>{document.body.style.WebkitUserSelect=Vt.current,Zn(te)})},Bs=te=>{oe.props.onTouchEnd&&oe.props.onTouchEnd(te),yn(),ct.start(V,()=>{xn(te)})};w.useEffect(()=>{if(!Ke)return;function te(Ne){(Ne.key==="Escape"||Ne.key==="Esc")&&xn(Ne)}return document.addEventListener("keydown",te),()=>{document.removeEventListener("keydown",te)}},[xn,Ke]);const Ls=De(oe.ref,As,lt,n);!re&&re!==0&&(Ke=!1);const Qn=w.useRef(),Fs=te=>{const Ne=oe.props;Ne.onMouseMove&&Ne.onMouseMove(te),Kt={x:te.clientX,y:te.clientY},Qn.current&&Qn.current.update()},zt={},er=typeof re=="string";B?(zt.title=!Ke&&er&&!q?re:null,zt["aria-describedby"]=Ke?Jn:null):(zt["aria-label"]=er?re:null,zt["aria-labelledby"]=Ke&&!er?Jn:null);const Ie=k({},zt,P,oe.props,{className:we(P.className,oe.props.className),onTouchStart:co,ref:Ls},Z?{onMouseMove:Fs}:{});process.env.NODE_ENV!=="production"&&(Ie["data-mui-internal-clone-element"]=!0,w.useEffect(()=>{me&&!me.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[me]));const Ut={};L||(Ie.onTouchStart=Ds,Ie.onTouchEnd=Bs),q||(Ie.onMouseOver=On(uo,Ie.onMouseOver),Ie.onMouseLeave=On(po,Ie.onMouseLeave),Ge||(Ut.onMouseOver=uo,Ut.onMouseLeave=po)),z||(Ie.onFocus=On(lo,Ie.onFocus),Ie.onBlur=On(ao,Ie.onBlur),Ge||(Ut.onFocus=lo,Ut.onBlur=ao)),process.env.NODE_ENV!=="production"&&oe.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${oe.props.title}\` or the Tooltip component.`].join(`
`));const Vs=w.useMemo(()=>{var te;let Ne=[{name:"arrow",enabled:!!Oe,options:{element:Oe,padding:4}}];return(te=H.popperOptions)!=null&&te.modifiers&&(Ne=Ne.concat(H.popperOptions.modifiers)),k({},H.popperOptions,{modifiers:Ne})},[Oe,H]),Ht=k({},S,{isRtl:ke,arrow:C,disableInteractive:Ge,placement:W,PopperComponentProp:G,touch:Re.current}),tr=op(Ht),fo=(r=(o=Y.popper)!=null?o:j.Popper)!=null?r:ip,ho=(i=(a=(l=Y.transition)!=null?l:j.Transition)!=null?a:N)!=null?i:Pr,mo=(c=(u=Y.tooltip)!=null?u:j.Tooltip)!=null?c:sp,go=(d=(f=Y.arrow)!=null?f:j.Arrow)!=null?d:ap,zs=Zt(fo,k({},H,(p=X.popper)!=null?p:I.popper,{className:we(tr.popper,H==null?void 0:H.className,(v=(g=X.popper)!=null?g:I.popper)==null?void 0:v.className)}),Ht),Us=Zt(ho,k({},J,(m=X.transition)!=null?m:I.transition),Ht),Hs=Zt(mo,k({},(h=X.tooltip)!=null?h:I.tooltip,{className:we(tr.tooltip,(T=($=X.tooltip)!=null?$:I.tooltip)==null?void 0:T.className)}),Ht),qs=Zt(go,k({},(x=X.arrow)!=null?x:I.arrow,{className:we(tr.arrow,(E=(b=X.arrow)!=null?b:I.arrow)==null?void 0:E.className)}),Ht);return y.jsxs(w.Fragment,{children:[w.cloneElement(oe,Ie),y.jsx(fo,k({as:G??ms,placement:W,anchorEl:Z?{getBoundingClientRect:()=>({top:Kt.y,left:Kt.x,right:Kt.x,bottom:Kt.y,width:0,height:0})}:me,popperRef:Qn,open:me?Ke:!1,id:Jn,transition:!0},Ut,zs,{popperOptions:Vs,children:({TransitionProps:te})=>y.jsx(ho,k({timeout:ye.transitions.duration.shorter},te,Us,{children:y.jsxs(mo,k({},Hs,{children:[re,C?y.jsx(go,k({},qs,{ref:We})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(gs.propTypes={arrow:s.bool,children:dn.isRequired,classes:s.object,className:s.string,components:s.shape({Arrow:s.elementType,Popper:s.elementType,Tooltip:s.elementType,Transition:s.elementType}),componentsProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),describeChild:s.bool,disableFocusListener:s.bool,disableHoverListener:s.bool,disableInteractive:s.bool,disableTouchListener:s.bool,enterDelay:s.number,enterNextDelay:s.number,enterTouchDelay:s.number,followCursor:s.bool,id:s.string,leaveDelay:s.number,leaveTouchDelay:s.number,onClose:s.func,onOpen:s.func,open:s.bool,placement:s.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:s.elementType,PopperProps:s.object,slotProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),slots:s.shape({arrow:s.elementType,popper:s.elementType,tooltip:s.elementType,transition:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),title:s.node,TransitionComponent:s.elementType,TransitionProps:s.object});const lp=gs;var Zr={},bs={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(bs);var cp=bs.exports,pr={};function up(e){return qe("MuiSvgIcon",e)}it("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const dp=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],pp=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Ue(t)}`,`fontSize${Ue(n)}`]};return et(o,up,r)},fp=Te("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Ue(n.color)}`],t[`fontSize${Ue(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,a,l,c,u,d,f,p,v,g;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(a=i.pxToRem)==null?void 0:a.call(i,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((u=e.typography)==null||(d=u.pxToRem)==null?void 0:d.call(u,35))||"2.1875rem"}[t.fontSize],color:(f=(p=(e.vars||e).palette)==null||(p=p[t.color])==null?void 0:p.main)!=null?f:{action:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.active,disabled:(g=(e.vars||e).palette)==null||(g=g.action)==null?void 0:g.disabled,inherit:void 0}[t.color]}}),Qr=w.forwardRef(function(t,n){const r=tt({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:a="inherit",component:l="svg",fontSize:c="medium",htmlColor:u,inheritViewBox:d=!1,titleAccess:f,viewBox:p="0 0 24 24"}=r,v=ue(r,dp),g=w.isValidElement(o)&&o.type==="svg",m=k({},r,{color:a,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:d,viewBox:p,hasSvgAsChild:g}),h={};d||(h.viewBox=p);const T=pp(m);return y.jsxs(fp,k({as:l,className:we(T.root,i),focusable:"false",color:u,"aria-hidden":f?void 0:!0,role:f?"img":void 0,ref:n},h,v,g&&o.props,{ownerState:m,children:[g?o.props.children:o,f?y.jsx("title",{children:f}):null]}))});process.env.NODE_ENV!=="production"&&(Qr.propTypes={children:s.node,classes:s.object,className:s.string,color:s.oneOfType([s.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),s.string]),component:s.elementType,fontSize:s.oneOfType([s.oneOf(["inherit","large","medium","small"]),s.string]),htmlColor:s.string,inheritViewBox:s.bool,shapeRendering:s.string,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),titleAccess:s.string,viewBox:s.string});Qr.muiName="SvgIcon";const ai=Qr;function vs(e,t){function n(r,o){return y.jsx(ai,k({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=ai.muiName,w.memo(w.forwardRef(n))}const hp={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),zi.configure(e)}},mp=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Ue,createChainedFunction:xr,createSvgIcon:vs,debounce:_i,deprecatedPropType:za,isMuiElement:Ua,ownerDocument:Ee,ownerWindow:_t,requirePropFactory:Ha,setRef:Mn,unstable_ClassNameGenerator:hp,unstable_useEnhancedEffect:vt,unstable_useId:Ii,unsupportedProp:Ga,useControlled:ji,useEventCallback:on,useForkRef:De,useIsFocusVisible:Ai},Symbol.toStringTag,{value:"Module"})),gp=wa(mp);var li;function bp(){return li||(li=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=gp}(pr)),pr}var vp=cp;Object.defineProperty(Zr,"__esModule",{value:!0});var ys=Zr.default=void 0,yp=vp(bp()),xp=y;ys=Zr.default=(0,yp.default)((0,xp.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function ci(e,t,n){return e?y.jsx(de.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:y.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function eo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:a=void 0,hasAutoFocus:l=!1,className:c,isDisabled:u=!1,isDense:d=!0,isSubMenuParent:f=!1,hasDisabledGutters:p=!1,hasDivider:v=!1,focusVisibleClassName:g,id:m,children:h}=e,T=y.jsx(de.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:u,dense:d,disableGutters:p,divider:v,focusVisibleClassName:g,onClick:t,id:m,children:n?y.jsxs(y.Fragment,{children:[ci(i,n,!0),y.jsx(de.ListItemText,{primary:n,inset:!i&&o}),f?y.jsx(de.ListItemIcon,{className:"papi-menu-icon-trailing",children:y.jsx(ys,{})}):ci(a,n,!1)]}):h});return r?y.jsx(lp,{title:r,placement:"right",children:y.jsx("div",{children:T})}):T}function xs(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function wp(e){const[t,n]=ee.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,a=u=>{n(u.currentTarget)},l=()=>{n(void 0)},c=()=>{let u=xs(i).filter(d=>"menuItem"in d.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return u=u.filter(d=>"menuItem"in d.group&&d.group.menuItem===r.id),y.jsx(to,{...e,includedGroups:u})};return y.jsxs(y.Fragment,{children:[y.jsx(eo,{onClick:a,...o,isSubMenuParent:!0}),y.jsx(de.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Ep=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function to(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:a}=ee.useMemo(()=>{const d=o&&o.length>0?o:xs(t).filter(g=>!("menuItem"in g.group)),f=Object.values(d).sort((g,m)=>(g.group.order||0)-(m.group.order||0)),p=[];f.forEach(g=>{Ep(g.id,t.items).forEach(m=>p.push({item:m,isLastItemInGroup:!1})),p.length>0&&(p[p.length-1].isLastItemInGroup=!0)}),p.length>0&&(p[p.length-1].isLastItemInGroup=!1);const v=p.some(g=>"iconPathBefore"in g.item&&g.item.iconPathBefore);return{items:p,allowForLeadingIcons:v}},[o,t]),l=({item:d,isLastItemInGroup:f})=>({className:"papi-menu-item",label:d.label,tooltip:d.tooltip,iconPathBefore:"iconPathBefore"in d?d.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in d?d.iconPathAfter:void 0,hasDivider:f,allowForLeadingIcons:a}),[c]=i;if(!c)return y.jsx("div",{});const u=c.item.group;return y.jsx("div",{role:"menu","aria-label":u,children:i.map((d,f)=>{const{item:p}=d,v=l(d);if("command"in p){const g=p.group+f;return y.jsx(eo,{onClick:m=>{n==null||n(m),r(p)},...v},g)}return y.jsx(wp,{parentMenuItem:p,parentItemProps:v,...e},u+p.id)})},u)}function Tp(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([a,l])=>({id:a,group:l})).filter(a=>"column"in a.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(a=>"column"in a.group&&a.group.column===n)),y.jsx(to,{...e,includedGroups:i})}function kp({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return y.jsxs(de.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[y.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),y.jsx(de.List,{id:n,dense:!0,className:i??"",children:y.jsx(Tp,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function ws({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=ee.useMemo(()=>{const a=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,u=o[c];typeof u=="object"&&typeof u.order=="number"&&!Number.isNaN(u.order)?a.set(u.order,{id:c,metadata:u}):console.warn(`Property ${l} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(a.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return y.jsx(de.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((a,l)=>y.jsx(kp,{commandHandler:e,menuDefinition:n,...a,className:t},l))})}const Es=w.createContext({});process.env.NODE_ENV!=="production"&&(Es.displayName="ListContext");const Op=Es;function Sp(e){return qe("MuiList",e)}it("MuiList",["root","padding","dense","subheader"]);const Cp=["children","className","component","dense","disablePadding","subheader"],Pp=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return et({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},Sp,t)},Rp=Te("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>k({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Ts=w.forwardRef(function(t,n){const r=tt({props:t,name:"MuiList"}),{children:o,className:i,component:a="ul",dense:l=!1,disablePadding:c=!1,subheader:u}=r,d=ue(r,Cp),f=w.useMemo(()=>({dense:l}),[l]),p=k({},r,{component:a,dense:l,disablePadding:c}),v=Pp(p);return y.jsx(Op.Provider,{value:f,children:y.jsxs(Rp,k({as:a,className:we(v.root,i),ref:n,ownerState:p},d,{children:[u,o]}))})});process.env.NODE_ENV!=="production"&&(Ts.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,dense:s.bool,disablePadding:s.bool,subheader:s.node,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const Np=Ts,$p=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function fr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function ui(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function ks(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function Xt(e,t,n,r,o,i){let a=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(a)return!1;a=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!ks(l,i)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const Os=w.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:a,className:l,disabledItemsFocusable:c=!1,disableListWrap:u=!1,onKeyDown:d,variant:f="selectedMenu"}=t,p=ue(t,$p),v=w.useRef(null),g=w.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});vt(()=>{o&&v.current.focus()},[o]),w.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(x,E)=>{const b=!v.current.style.width;if(x.clientHeight<v.current.clientHeight&&b){const S=`${Di(Ee(x))}px`;v.current.style[E.direction==="rtl"?"paddingLeft":"paddingRight"]=S,v.current.style.width=`calc(100% + ${S})`}return v.current}}),[]);const m=x=>{const E=v.current,b=x.key,S=Ee(E).activeElement;if(b==="ArrowDown")x.preventDefault(),Xt(E,S,u,c,fr);else if(b==="ArrowUp")x.preventDefault(),Xt(E,S,u,c,ui);else if(b==="Home")x.preventDefault(),Xt(E,null,u,c,fr);else if(b==="End")x.preventDefault(),Xt(E,null,u,c,ui);else if(b.length===1){const C=g.current,A=b.toLowerCase(),j=performance.now();C.keys.length>0&&(j-C.lastTime>500?(C.keys=[],C.repeating=!0,C.previousKeyMatched=!0):C.repeating&&A!==C.keys[0]&&(C.repeating=!1)),C.lastTime=j,C.keys.push(A);const I=S&&!C.repeating&&ks(S,C);C.previousKeyMatched&&(I||Xt(E,S,!1,c,fr,C))?x.preventDefault():C.previousKeyMatched=!1}d&&d(x)},h=De(v,n);let T=-1;w.Children.forEach(a,(x,E)=>{if(!w.isValidElement(x)){T===E&&(T+=1,T>=a.length&&(T=-1));return}process.env.NODE_ENV!=="production"&&$n.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(f==="selectedMenu"&&x.props.selected||T===-1)&&(T=E),T===E&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(T+=1,T>=a.length&&(T=-1))});const $=w.Children.map(a,(x,E)=>{if(E===T){const b={};return i&&(b.autoFocus=!0),x.props.tabIndex===void 0&&f==="selectedMenu"&&(b.tabIndex=0),w.cloneElement(x,b)}return x});return y.jsx(Np,k({role:"menu",ref:h,className:l,onKeyDown:m,tabIndex:o?0:-1},p,{children:$}))});process.env.NODE_ENV!=="production"&&(Os.propTypes={autoFocus:s.bool,autoFocusItem:s.bool,children:s.node,className:s.string,disabledItemsFocusable:s.bool,disableListWrap:s.bool,onKeyDown:s.func,variant:s.oneOf(["menu","selectedMenu"])});const Mp=Os,_p=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Ip={entering:{opacity:1},entered:{opacity:1}},Ss=w.forwardRef(function(t,n){const r=bn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:a=!0,children:l,easing:c,in:u,onEnter:d,onEntered:f,onEntering:p,onExit:v,onExited:g,onExiting:m,style:h,timeout:T=o,TransitionComponent:$=ps}=t,x=ue(t,_p),E=w.useRef(null),b=De(E,l.ref,n),S=_=>L=>{if(_){const R=E.current;L===void 0?_(R):_(R,L)}},C=S(p),A=S((_,L)=>{fs(_);const R=Bn({style:h,timeout:T,easing:c},{mode:"enter"});_.style.webkitTransition=r.transitions.create("opacity",R),_.style.transition=r.transitions.create("opacity",R),d&&d(_,L)}),j=S(f),I=S(m),B=S(_=>{const L=Bn({style:h,timeout:T,easing:c},{mode:"exit"});_.style.webkitTransition=r.transitions.create("opacity",L),_.style.transition=r.transitions.create("opacity",L),v&&v(_)}),z=S(g),q=_=>{i&&i(E.current,_)};return y.jsx($,k({appear:a,in:u,nodeRef:E,onEnter:A,onEntered:j,onEntering:C,onExit:B,onExited:z,onExiting:I,addEndListener:q,timeout:T},x,{children:(_,L)=>w.cloneElement(l,k({style:k({opacity:0,visibility:_==="exited"&&!u?"hidden":void 0},Ip[_],h,l.props.style),ref:b},L))}))});process.env.NODE_ENV!=="production"&&(Ss.propTypes={addEndListener:s.func,appear:s.bool,children:dn.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const jp=Ss;function Ap(e){return qe("MuiBackdrop",e)}it("MuiBackdrop",["root","invisible"]);const Dp=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Bp=e=>{const{classes:t,invisible:n}=e;return et({root:["root",n&&"invisible"]},Ap,t)},Lp=Te("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>k({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),Cs=w.forwardRef(function(t,n){var r,o,i;const a=tt({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:u="div",components:d={},componentsProps:f={},invisible:p=!1,open:v,slotProps:g={},slots:m={},TransitionComponent:h=jp,transitionDuration:T}=a,$=ue(a,Dp),x=k({},a,{component:u,invisible:p}),E=Bp(x),b=(r=g.root)!=null?r:f.root;return y.jsx(h,k({in:v,timeout:T},$,{children:y.jsx(Lp,k({"aria-hidden":!0},b,{as:(o=(i=m.root)!=null?i:d.Root)!=null?o:u,className:we(E.root,c,b==null?void 0:b.className),ownerState:k({},x,b==null?void 0:b.ownerState),classes:E,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(Cs.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.object}),invisible:s.bool,open:s.bool.isRequired,slotProps:s.shape({root:s.object}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const Fp=Cs;function Vp(e){return qe("MuiModal",e)}it("MuiModal",["root","hidden","backdrop"]);const zp=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Up=e=>{const{open:t,exited:n,classes:r}=e;return et({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},Vp,r)},Hp=Te("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>k({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),qp=Te(Fp,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Ps=w.forwardRef(function(t,n){var r,o,i,a,l,c;const u=tt({name:"MuiModal",props:t}),{BackdropComponent:d=qp,BackdropProps:f,className:p,closeAfterTransition:v=!1,children:g,container:m,component:h,components:T={},componentsProps:$={},disableAutoFocus:x=!1,disableEnforceFocus:E=!1,disableEscapeKeyDown:b=!1,disablePortal:S=!1,disableRestoreFocus:C=!1,disableScrollLock:A=!1,hideBackdrop:j=!1,keepMounted:I=!1,onBackdropClick:B,open:z,slotProps:q,slots:_}=u,L=ue(u,zp),R=k({},u,{closeAfterTransition:v,disableAutoFocus:x,disableEnforceFocus:E,disableEscapeKeyDown:b,disablePortal:S,disableRestoreFocus:C,disableScrollLock:A,hideBackdrop:j,keepMounted:I}),{getRootProps:D,getBackdropProps:Q,getTransitionProps:Z,portalRef:O,isTopModal:M,exited:V,hasTransition:K}=Il(k({},R,{rootRef:n})),F=k({},R,{exited:V}),U=Up(F),W={};if(g.props.tabIndex===void 0&&(W.tabIndex="-1"),K){const{onEnter:J,onExited:P}=Z();W.onEnter=J,W.onExited=P}const G=(r=(o=_==null?void 0:_.root)!=null?o:T.Root)!=null?r:Hp,H=(i=(a=_==null?void 0:_.backdrop)!=null?a:T.Backdrop)!=null?i:d,X=(l=q==null?void 0:q.root)!=null?l:$.root,Y=(c=q==null?void 0:q.backdrop)!=null?c:$.backdrop,re=yt({elementType:G,externalSlotProps:X,externalForwardedProps:L,getSlotProps:D,additionalProps:{ref:n,as:h},ownerState:F,className:we(p,X==null?void 0:X.className,U==null?void 0:U.root,!F.open&&F.exited&&(U==null?void 0:U.hidden))}),N=yt({elementType:H,externalSlotProps:Y,additionalProps:f,getSlotProps:J=>Q(k({},J,{onClick:P=>{B&&B(P),J!=null&&J.onClick&&J.onClick(P)}})),className:we(Y==null?void 0:Y.className,f==null?void 0:f.className,U==null?void 0:U.backdrop),ownerState:F});return!I&&!z&&(!K||V)?null:y.jsx(sn,{ref:O,container:m,disablePortal:S,children:y.jsxs(G,k({},re,{children:[!j&&d?y.jsx(H,k({},N)):null,y.jsx(_n,{disableEnforceFocus:E,disableAutoFocus:x,disableRestoreFocus:C,isEnabled:M,open:z,children:w.cloneElement(g,W)})]}))})});process.env.NODE_ENV!=="production"&&(Ps.propTypes={BackdropComponent:s.elementType,BackdropProps:s.object,children:dn.isRequired,classes:s.object,className:s.string,closeAfterTransition:s.bool,component:s.elementType,components:s.shape({Backdrop:s.elementType,Root:s.elementType}),componentsProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Ye,s.func]),disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableEscapeKeyDown:s.bool,disablePortal:s.bool,disableRestoreFocus:s.bool,disableScrollLock:s.bool,hideBackdrop:s.bool,keepMounted:s.bool,onBackdropClick:s.func,onClose:s.func,onTransitionEnter:s.func,onTransitionExited:s.func,open:s.bool.isRequired,slotProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({backdrop:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const Wp=Ps;function Gp(e){return qe("MuiPaper",e)}it("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Kp=["className","component","elevation","square","variant"],Xp=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return et(i,Gp,o)},Yp=Te("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return k({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&k({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${Dn("#fff",ii(t.elevation))}, ${Dn("#fff",ii(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Rs=w.forwardRef(function(t,n){const r=tt({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:a=1,square:l=!1,variant:c="elevation"}=r,u=ue(r,Kp),d=k({},r,{component:i,elevation:a,square:l,variant:c}),f=Xp(d);return process.env.NODE_ENV!=="production"&&bn().shadows[a]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)),y.jsx(Yp,k({as:i,ownerState:d,className:we(f.root,o),ref:n},u))});process.env.NODE_ENV!=="production"&&(Rs.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,elevation:Lt(Fi,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:s.bool,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),variant:s.oneOfType([s.oneOf(["elevation","outlined"]),s.string])});const Jp=Rs;function Zp(e){return qe("MuiPopover",e)}it("MuiPopover",["root","paper"]);const Qp=["onEntering"],ef=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],tf=["slotProps"];function di(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function pi(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function fi(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function Rn(e){return typeof e=="function"?e():e}const nf=e=>{const{classes:t}=e;return et({root:["root"],paper:["paper"]},Zp,t)},rf=Te(Wp,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ns=Te(Jp,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),$s=w.forwardRef(function(t,n){var r,o,i;const a=tt({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:u={vertical:"top",horizontal:"left"},anchorPosition:d,anchorReference:f="anchorEl",children:p,className:v,container:g,elevation:m=8,marginThreshold:h=16,open:T,PaperProps:$={},slots:x,slotProps:E,transformOrigin:b={vertical:"top",horizontal:"left"},TransitionComponent:S=Pr,transitionDuration:C="auto",TransitionProps:{onEntering:A}={},disableScrollLock:j=!1}=a,I=ue(a.TransitionProps,Qp),B=ue(a,ef),z=(r=E==null?void 0:E.paper)!=null?r:$,q=w.useRef(),_=De(q,z.ref),L=k({},a,{anchorOrigin:u,anchorReference:f,elevation:m,marginThreshold:h,externalPaperSlotProps:z,transformOrigin:b,TransitionComponent:S,transitionDuration:C,TransitionProps:I}),R=nf(L),D=w.useCallback(()=>{if(f==="anchorPosition")return process.env.NODE_ENV!=="production"&&(d||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),d;const J=Rn(c),P=J&&J.nodeType===1?J:Ee(q.current).body,oe=P.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const ye=P.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ye.top===0&&ye.left===0&&ye.right===0&&ye.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:oe.top+di(oe,u.vertical),left:oe.left+pi(oe,u.horizontal)}},[c,u.horizontal,u.vertical,d,f]),Q=w.useCallback(J=>({vertical:di(J,b.vertical),horizontal:pi(J,b.horizontal)}),[b.horizontal,b.vertical]),Z=w.useCallback(J=>{const P={width:J.offsetWidth,height:J.offsetHeight},oe=Q(P);if(f==="none")return{top:null,left:null,transformOrigin:fi(oe)};const ye=D();let ke=ye.top-oe.vertical,me=ye.left-oe.horizontal;const lt=ke+P.height,Oe=me+P.width,We=_t(Rn(c)),Re=We.innerHeight-h,Ge=We.innerWidth-h;if(h!==null&&ke<h){const xe=ke-h;ke-=xe,oe.vertical+=xe}else if(h!==null&&lt>Re){const xe=lt-Re;ke-=xe,oe.vertical+=xe}if(process.env.NODE_ENV!=="production"&&P.height>Re&&P.height&&Re&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${P.height-Re}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),h!==null&&me<h){const xe=me-h;me-=xe,oe.horizontal+=xe}else if(Oe>Ge){const xe=Oe-Ge;me-=xe,oe.horizontal+=xe}return{top:`${Math.round(ke)}px`,left:`${Math.round(me)}px`,transformOrigin:fi(oe)}},[c,f,D,Q,h]),[O,M]=w.useState(T),V=w.useCallback(()=>{const J=q.current;if(!J)return;const P=Z(J);P.top!==null&&(J.style.top=P.top),P.left!==null&&(J.style.left=P.left),J.style.transformOrigin=P.transformOrigin,M(!0)},[Z]);w.useEffect(()=>(j&&window.addEventListener("scroll",V),()=>window.removeEventListener("scroll",V)),[c,j,V]);const K=(J,P)=>{A&&A(J,P),V()},F=()=>{M(!1)};w.useEffect(()=>{T&&V()}),w.useImperativeHandle(l,()=>T?{updatePosition:()=>{V()}}:null,[T,V]),w.useEffect(()=>{if(!T)return;const J=_i(()=>{V()}),P=_t(c);return P.addEventListener("resize",J),()=>{J.clear(),P.removeEventListener("resize",J)}},[c,T,V]);let U=C;C==="auto"&&!S.muiSupportAuto&&(U=void 0);const W=g||(c?Ee(Rn(c)).body:void 0),G=(o=x==null?void 0:x.root)!=null?o:rf,H=(i=x==null?void 0:x.paper)!=null?i:Ns,X=yt({elementType:H,externalSlotProps:k({},z,{style:O?z.style:k({},z.style,{opacity:0})}),additionalProps:{elevation:m,ref:_},ownerState:L,className:we(R.paper,z==null?void 0:z.className)}),Y=yt({elementType:G,externalSlotProps:(E==null?void 0:E.root)||{},externalForwardedProps:B,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:W,open:T},ownerState:L,className:we(R.root,v)}),{slotProps:re}=Y,N=ue(Y,tf);return y.jsx(G,k({},N,!Hi(G)&&{slotProps:re,disableScrollLock:j},{children:y.jsx(S,k({appear:!0,in:T,onEntering:K,onExited:F,timeout:U},I,{children:y.jsx(H,k({},X,{children:p}))}))}))});process.env.NODE_ENV!=="production"&&($s.propTypes={action:jr,anchorEl:Lt(s.oneOfType([Ye,s.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=Rn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),anchorPosition:s.shape({left:s.number.isRequired,top:s.number.isRequired}),anchorReference:s.oneOf(["anchorEl","anchorPosition","none"]),children:s.node,classes:s.object,className:s.string,container:s.oneOfType([Ye,s.func]),disableScrollLock:s.bool,elevation:Fi,marginThreshold:s.number,onClose:s.func,open:s.bool.isRequired,PaperProps:s.shape({component:Ia}),slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transformOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object});const of=$s;function sf(e){return qe("MuiMenu",e)}it("MuiMenu",["root","paper","list"]);const af=["onEntering"],lf=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],cf={vertical:"top",horizontal:"right"},uf={vertical:"top",horizontal:"left"},df=e=>{const{classes:t}=e;return et({root:["root"],paper:["paper"],list:["list"]},sf,t)},pf=Te(of,{shouldForwardProp:e=>us(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),ff=Te(Ns,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),hf=Te(Mp,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Ms=w.forwardRef(function(t,n){var r,o;const i=tt({props:t,name:"MuiMenu"}),{autoFocus:a=!0,children:l,className:c,disableAutoFocusItem:u=!1,MenuListProps:d={},onClose:f,open:p,PaperProps:v={},PopoverClasses:g,transitionDuration:m="auto",TransitionProps:{onEntering:h}={},variant:T="selectedMenu",slots:$={},slotProps:x={}}=i,E=ue(i.TransitionProps,af),b=ue(i,lf),S=bn(),C=S.direction==="rtl",A=k({},i,{autoFocus:a,disableAutoFocusItem:u,MenuListProps:d,onEntering:h,PaperProps:v,transitionDuration:m,TransitionProps:E,variant:T}),j=df(A),I=a&&!u&&p,B=w.useRef(null),z=(Z,O)=>{B.current&&B.current.adjustStyleForScrollbar(Z,S),h&&h(Z,O)},q=Z=>{Z.key==="Tab"&&(Z.preventDefault(),f&&f(Z,"tabKeyDown"))};let _=-1;w.Children.map(l,(Z,O)=>{w.isValidElement(Z)&&(process.env.NODE_ENV!=="production"&&$n.isFragment(Z)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Z.props.disabled||(T==="selectedMenu"&&Z.props.selected||_===-1)&&(_=O))});const L=(r=$.paper)!=null?r:ff,R=(o=x.paper)!=null?o:v,D=yt({elementType:$.root,externalSlotProps:x.root,ownerState:A,className:[j.root,c]}),Q=yt({elementType:L,externalSlotProps:R,ownerState:A,className:j.paper});return y.jsx(pf,k({onClose:f,anchorOrigin:{vertical:"bottom",horizontal:C?"right":"left"},transformOrigin:C?cf:uf,slots:{paper:L,root:$.root},slotProps:{root:D,paper:Q},open:p,ref:n,transitionDuration:m,TransitionProps:k({onEntering:z},E),ownerState:A},b,{classes:g,children:y.jsx(hf,k({onKeyDown:q,actions:B,autoFocus:a&&(_===-1||u),autoFocusItem:I,variant:T},d,{className:we(j.list,d.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(Ms.propTypes={anchorEl:s.oneOfType([Ye,s.func]),autoFocus:s.bool,children:s.node,classes:s.object,className:s.string,disableAutoFocusItem:s.bool,MenuListProps:s.object,onClose:s.func,open:s.bool.isRequired,PaperProps:s.object,PopoverClasses:s.object,slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object,variant:s.oneOf(["menu","selectedMenu"])});const mf=Ms;function gf({className:e,commandHandler:t,menuDefinition:n,children:r}){var u;const[o,i]=ee.useState(void 0),a=ee.useCallback(d=>{d.preventDefault(),i(o===void 0?{mouseX:d.clientX+2,mouseY:d.clientY-6}:void 0)},[o]),l=ee.useCallback(()=>{i(void 0)},[]),c=ee.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((u=n==null?void 0:n.items)==null?void 0:u.length)??0)===0||!r?r:y.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:a,children:[r,y.jsx(mf,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:y.jsx(to,{menuDefinition:n,commandHandler:t,onClick:l})})]})}function bf({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:a="medium",className:l,onClick:c,children:u}){return y.jsx(de.IconButton,{id:e,disabled:n,edge:i,size:a,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:u})}function un({variant:e="outlined",id:t,isDisabled:n=!1,hasError:r=!1,isFullWidth:o=!1,helperText:i,label:a,placeholder:l,isRequired:c=!1,className:u,defaultValue:d,value:f,onChange:p,onFocus:v,onBlur:g}){return y.jsx(de.TextField,{variant:e,id:t,disabled:n,error:r,fullWidth:o,helperText:i,label:a,placeholder:l,required:c,className:`papi-textfield ${u??""}`,defaultValue:d,value:f,onChange:p,onFocus:v,onBlur:g})}let hr;const mr=()=>(hr||(hr=ge.allBookIds.map(e=>({bookId:e,label:ge.bookIdToEnglishName(e)}))),hr);function vf({scrRef:e,handleSubmit:t,id:n}){const r=c=>{t(c)},o=(c,u)=>{const f={bookNum:ge.bookIdToNumber(u.bookId),chapterNum:1,verseNum:1};r(f)},i=c=>{t({...e,chapterNum:+c.target.value})},a=c=>{t({...e,verseNum:+c.target.value})},l=ee.useMemo(()=>mr()[e.bookNum-1],[e.bookNum]);return y.jsxs("span",{id:n,children:[y.jsx(Nn,{title:"Book",className:"papi-ref-selector book",value:l,options:mr(),onChange:o,isClearable:!1,width:200}),y.jsx(ut,{onClick:()=>r(Ve.offsetBook(e,-1)),isDisabled:e.bookNum<=Ve.FIRST_SCR_BOOK_NUM,children:"<"}),y.jsx(ut,{onClick:()=>r(Ve.offsetBook(e,1)),isDisabled:e.bookNum>=mr().length,children:">"}),y.jsx(un,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),y.jsx(ut,{onClick:()=>t(Ve.offsetChapter(e,-1)),isDisabled:e.chapterNum<=Ve.FIRST_SCR_CHAPTER_NUM,children:"<"}),y.jsx(ut,{onClick:()=>t(Ve.offsetChapter(e,1)),isDisabled:e.chapterNum>=Ve.getChaptersForBook(e.bookNum),children:">"}),y.jsx(un,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:a}),y.jsx(ut,{onClick:()=>t(Ve.offsetVerse(e,-1)),isDisabled:e.verseNum<=Ve.FIRST_SCR_VERSE_NUM,children:"<"}),y.jsx(ut,{onClick:()=>t(Ve.offsetVerse(e,1)),children:">"})]})}function yf({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=ee.useState(""),i=a=>{o(a),e(a)};return y.jsx(de.Paper,{component:"form",className:"search-bar-paper",children:y.jsx(un,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:a=>i(a.target.value)})})}function xf({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:a=!1,defaultValue:l,value:c,valueLabelDisplay:u="off",className:d,onChange:f,onChangeCommitted:p}){return y.jsx(de.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:a,defaultValue:l,value:c,valueLabelDisplay:u,className:`papi-slider ${n} ${d??""}`,onChange:f,onChangeCommitted:p})}function wf({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:a,children:l}){const c={action:(a==null?void 0:a.action)||l,message:a==null?void 0:a.message,className:r};return y.jsx(de.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:c})}function Ef({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return y.jsx(de.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function hi({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return y.jsx(un,{defaultValue:t[n.key],onChange:r})}const Tf=({onChange:e,disabled:t,checked:n,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return y.jsx(Oi,{...r,isChecked:n,isDisabled:t,onChange:o})};function kf({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:a,defaultColumnSortable:l=!0,defaultColumnResizable:c=!0,rows:u,enableSelectColumn:d,selectColumnWidth:f=50,rowKeyGetter:p,rowHeight:v=35,headerRowHeight:g=35,selectedRows:m,onSelectedRowsChange:h,onRowsChange:T,onCellClick:$,onCellDoubleClick:x,onCellContextMenu:E,onCellKeyDown:b,direction:S="ltr",enableVirtualization:C=!0,onCopy:A,onPaste:j,onScroll:I,className:B}){const z=ee.useMemo(()=>{const q=e.map(_=>typeof _.editable=="function"?{..._,editable:R=>!!_.editable(R),renderEditCell:_.renderEditCell||hi}:_.editable&&!_.renderEditCell?{..._,renderEditCell:hi}:_.renderEditCell&&!_.editable?{..._,editable:!1}:_);return d?[{...bo.SelectColumn,minWidth:f},...q]:q},[e,d,f]);return y.jsx(bo,{columns:z,defaultColumnOptions:{width:o,minWidth:i,maxWidth:a,sortable:l,resizable:c},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:u,rowKeyGetter:p,rowHeight:v,headerRowHeight:g,selectedRows:m,onSelectedRowsChange:h,onRowsChange:T,onCellClick:$,onCellDoubleClick:x,onCellContextMenu:E,onCellKeyDown:b,direction:S,enableVirtualization:C,onCopy:A,onPaste:j,onScroll:I,renderers:{renderCheckbox:Tf},className:`papi-table ${B??"rdg-light"}`})}const Of=vs(y.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Sf({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const[i,a]=ee.useState(!1),[l,c]=ee.useState(!1),u=ee.useCallback(()=>{i&&a(!1),c(!1)},[i]),d=ee.useCallback(h=>{h.stopPropagation(),a(T=>{const $=!T;return $&&h.shiftKey?c(!0):$||c(!1),$})},[]),f=ee.useRef(void 0),[p,v]=ee.useState(0);ee.useEffect(()=>{i&&f.current&&v(f.current.clientHeight)},[i]);const g=ee.useCallback(h=>(u(),t(h)),[t,u]),m=e==null?void 0:e(l);return y.jsx("div",{ref:f,style:{position:"relative"},children:y.jsx(de.AppBar,{position:"static",id:r,children:y.jsxs(de.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[m?y.jsx(de.IconButton,{edge:"start",className:`papi-menuButton ${n??""}`,color:"inherit","aria-label":"open drawer",onClick:d,children:y.jsx(Of,{})}):void 0,o?y.jsx("div",{className:"papi-menu-children",children:o}):void 0,m?y.jsx(de.Drawer,{className:`papi-menu-drawer ${n??""}`,anchor:"left",variant:"persistent",open:i,onClose:u,PaperProps:{className:"papi-menu-drawer-paper",style:{top:p}},children:y.jsx(ws,{className:n,commandHandler:g,multiColumnMenu:m})}):void 0]})})})}const Cf=(e,t)=>{ee.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])};function Pf(e){return{preserveValue:!0,...e}}const _s=(e,t,n={})=>{const r=ee.useRef(t);r.current=t;const o=ee.useRef(n);o.current=Pf(o.current);const[i,a]=ee.useState(()=>r.current),[l,c]=ee.useState(!0);return ee.useEffect(()=>{let u=!0;return c(!!e),(async()=>{if(e){const d=await e();u&&(a(()=>d),c(!1))}})(),()=>{u=!1,o.current.preserveValue||a(()=>r.current)}},[e]),[i,l]},gr=()=>!1,Rf=(e,t)=>{const[n]=_s(ee.useCallback(async()=>{if(!e)return gr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),gr,{preserveValue:!1});ee.useEffect(()=>()=>{n!==gr&&n()},[n])};exports.BookChapterControl=va;exports.Button=ut;exports.ChapterRangeSelector=ya;exports.Checkbox=Oi;exports.ComboBox=Nn;exports.ContextMenu=gf;exports.GridMenu=ws;exports.IconButton=bf;exports.LabelPosition=ft;exports.MenuItem=eo;exports.RefSelector=vf;exports.SearchBar=yf;exports.Slider=xf;exports.Snackbar=wf;exports.Switch=Ef;exports.Table=kf;exports.TextField=un;exports.Toolbar=Sf;exports.useEvent=Cf;exports.useEventAsync=Rf;exports.usePromise=_s;function Nf(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Nf(`.papi-context-menu-target {
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
body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  background-color: #f9f9f9;
  color: black;
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
}.papi-toolbar {
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
