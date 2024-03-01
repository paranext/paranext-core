"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const b=require("react/jsx-runtime"),He=require("lucide-react"),Y=require("react"),Ur=require("@radix-ui/react-dropdown-menu"),br=require("clsx"),qr=require("tailwind-merge"),Q=require("@mui/material"),ge=require("platform-bible-utils"),Vn=require("react-data-grid"),En=require("@mui/styled-engine");function yr(e){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const r in e)if(r!=="default"){const t=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,t.get?t:{enumerable:!0,get:()=>e[r]})}}return n.default=e,Object.freeze(n)}const ie=yr(Y),K=yr(Ur);function ke(...e){return qr.twMerge(br.clsx(e))}const Gr=K.Root,Hr=K.Trigger,Wr=ie.forwardRef(({className:e,inset:n,children:r,...t},o)=>b.jsxs(K.SubTrigger,{ref:o,className:ke("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",n&&"pr-pl-8",e),...t,children:[r,b.jsx(He.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Wr.displayName=K.SubTrigger.displayName;const Xr=ie.forwardRef(({className:e,...n},r)=>b.jsx(K.SubContent,{ref:r,className:ke("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n}));Xr.displayName=K.SubContent.displayName;const vr=ie.forwardRef(({className:e,sideOffset:n=4,...r},t)=>b.jsx(K.Portal,{children:b.jsx(K.Content,{ref:t,sideOffset:n,className:ke("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r})}));vr.displayName=K.Content.displayName;const Yr=ie.forwardRef(({className:e,inset:n,...r},t)=>b.jsx(K.Item,{ref:t,className:ke("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",n&&"pr-pl-8",e),...r}));Yr.displayName=K.Item.displayName;const Kr=ie.forwardRef(({className:e,children:n,checked:r,...t},o)=>b.jsxs(K.CheckboxItem,{ref:o,className:ke("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:r,...t,children:[b.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:b.jsx(K.ItemIndicator,{children:b.jsx(He.Check,{className:"pr-h-4 pr-w-4"})})}),n]}));Kr.displayName=K.CheckboxItem.displayName;const Jr=ie.forwardRef(({className:e,children:n,...r},t)=>b.jsxs(K.RadioItem,{ref:t,className:ke("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...r,children:[b.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:b.jsx(K.ItemIndicator,{children:b.jsx(He.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),n]}));Jr.displayName=K.RadioItem.displayName;const Zr=ie.forwardRef(({className:e,inset:n,...r},t)=>b.jsx(K.Label,{ref:t,className:ke("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",n&&"pr-pl-8",e),...r}));Zr.displayName=K.Label.displayName;const Qr=ie.forwardRef(({className:e,...n},r)=>b.jsx(K.Separator,{ref:r,className:ke("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...n}));Qr.displayName=K.Separator.displayName;const xr=ie.forwardRef(({className:e,type:n,...r},t)=>b.jsx("input",{type:n,className:ke("pr-flex pr-h-10 pr-w-full pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:t,...r}));xr.displayName="Input";function et({value:e,placeholder:n}){return b.jsx(xr,{className:"book-chapter-input",placeholder:n,type:"text",value:e})}function nt({endChapter:e,activeChapter:n,handleSelectChapter:r}){const t=Array.from({length:e},(o,a)=>a+1);return b.jsx("div",{className:"chapter-select",children:t.map(o=>b.jsx("div",{className:`chapter ${o===n?"active":void 0}`,onClick:()=>r(o),children:o},o))})}function rt(){return b.jsx("div",{children:b.jsxs(Gr,{children:[b.jsx(He.Search,{style:{position:"absolute",left:"8px",top:"32px",color:"gray",width:"16px"}}),b.jsx(Hr,{style:{backgroundColor:"transparent",border:"none"},children:b.jsx(et,{value:"Hello",placeholder:"Hello"})}),b.jsx(He.History,{style:{position:"absolute",left:"276px",top:"32px",cursor:"pointer",width:"16px"},onClick:()=>{console.log("back in history")}}),b.jsx(vr,{children:b.jsx(nt,{endChapter:30,handleSelectChapter:e=>{throw new Error(`Function not implemented. ${e}`)},activeChapter:0})})]})})}function Oe({id:e,isDisabled:n=!1,className:r,onClick:t,onContextMenu:o,children:a}){return b.jsx(Q.Button,{id:e,disabled:n,className:`papi-button ${r??""}`,onClick:t,onContextMenu:o,children:a})}function nn({id:e,title:n,isDisabled:r=!1,isClearable:t=!0,hasError:o=!1,isFullWidth:a=!1,width:i,options:l=[],className:c,value:s,onChange:u,onFocus:p,onBlur:d,getOptionLabel:x}){return b.jsx(Q.Autocomplete,{id:e,disablePortal:!0,disabled:r,disableClearable:!t,fullWidth:a,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:s,onChange:u,onFocus:p,onBlur:d,getOptionLabel:x,renderInput:y=>b.jsx(Q.TextField,{...y,error:o,fullWidth:a,disabled:r,label:n,style:{width:i}})})}function tt({startChapter:e,endChapter:n,handleSelectStartChapter:r,handleSelectEndChapter:t,isDisabled:o,chapterCount:a}){const i=Y.useMemo(()=>Array.from({length:a},(s,u)=>u+1),[a]),l=(s,u)=>{r(u),u>n&&t(u)},c=(s,u)=>{t(u),u<e&&r(u)};return b.jsxs(b.Fragment,{children:[b.jsx(Q.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:b.jsx(nn,{onChange:(s,u)=>l(s,u),className:"book-selection-chapter",isClearable:!1,options:i,getOptionLabel:s=>s.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),b.jsx(Q.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:b.jsx(nn,{onChange:(s,u)=>c(s,u),className:"book-selection-chapter",isClearable:!1,options:i,getOptionLabel:s=>s.toString(),value:n,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var Re=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Re||{});function wr({id:e,isChecked:n,labelText:r="",labelPosition:t=Re.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:i=!1,hasError:l=!1,className:c,onChange:s}){const u=b.jsx(Q.Checkbox,{id:e,checked:n,indeterminate:o,defaultChecked:a,disabled:i,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:s});let p;if(r){const d=t===Re.Before||t===Re.Above,x=b.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:r}),y=t===Re.Before||t===Re.After,h=y?x:b.jsx("div",{children:x}),f=y?u:b.jsx("div",{children:u});p=b.jsxs(Q.FormLabel,{className:`papi-checkbox ${t.toString()}`,disabled:i,error:l,children:[d&&h,f,!d&&h]})}else p=u;return p}function kr(e){const{onClick:n,name:r,hasAutoFocus:t=!1,className:o,isDense:a=!0,hasDisabledGutters:i=!1,hasDivider:l=!1,focusVisibleClassName:c,id:s,children:u}=e;return b.jsx(Q.MenuItem,{autoFocus:t,className:o,dense:a,disableGutters:i,divider:l,focusVisibleClassName:c,onClick:n,id:s,children:r||u})}function ot({commandHandler:e,name:n,className:r,items:t,id:o}){return b.jsxs(Q.Grid,{id:o,item:!0,xs:"auto",className:`papi-menu-column ${r??""}`,children:[b.jsx("h3",{className:`papi-menu ${r??""}`,children:n}),t.map((a,i)=>b.jsx(kr,{className:`papi-menu-item ${a.className}`,onClick:()=>{e(a)},...a},i))]})}function Sr({commandHandler:e,className:n,columns:r,id:t}){return b.jsx(Q.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${n??""}`,columns:r.length,id:t,children:r.map((o,a)=>b.jsx(ot,{commandHandler:e,name:o.name,className:n,items:o.items},a))})}function at({id:e,label:n,isDisabled:r=!1,tooltip:t,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:i="medium",className:l,onClick:c,children:s}){return b.jsx(Q.IconButton,{id:e,disabled:r,edge:a,size:i,"aria-label":n,title:o?void 0:t??n,className:`papi-icon-button ${l??""}`,onClick:c,children:s})}var it=Object.defineProperty,st=(e,n,r)=>n in e?it(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,P=(e,n,r)=>(st(e,typeof n!="symbol"?n+"":n,r),r);const $e=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],_n=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Er=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Fn=bt();function Le(e,n=!0){return n&&(e=e.toUpperCase()),e in Fn?Fn[e]:0}function On(e){return Le(e)>0}function ct(e){const n=typeof e=="string"?Le(e):e;return n>=40&&n<=66}function lt(e){return(typeof e=="string"?Le(e):e)<=39}function Cr(e){return e<=66}function ut(e){const n=typeof e=="string"?Le(e):e;return Or(n)&&!Cr(n)}function*dt(){for(let e=1;e<=$e.length;e++)yield e}const ft=1,Tr=$e.length;function pt(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Nn(e,n="***"){const r=e-1;return r<0||r>=$e.length?n:$e[r]}function _r(e){return e<=0||e>Tr?"******":Er[e-1]}function ht(e){return _r(Le(e))}function Or(e){const n=typeof e=="number"?Nn(e):e;return On(n)&&!_n.includes(n)}function mt(e){const n=typeof e=="number"?Nn(e):e;return On(n)&&_n.includes(n)}function gt(e){return Er[e-1].includes("*obsolete*")}function bt(){const e={};for(let n=0;n<$e.length;n++)e[$e[n]]=n+1;return e}const xe={allBookIds:$e,nonCanonicalIds:_n,bookIdToNumber:Le,isBookIdValid:On,isBookNT:ct,isBookOT:lt,isBookOTNT:Cr,isBookDC:ut,allBookNumbers:dt,firstBook:ft,lastBook:Tr,extraBooks:pt,bookNumberToId:Nn,bookNumberToEnglishName:_r,bookIdToEnglishName:ht,isCanonical:Or,isExtraMaterial:mt,isObsolete:gt};var Ee=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ee||{});const Ne=class{constructor(e){if(P(this,"name"),P(this,"fullPath"),P(this,"isPresent"),P(this,"hasVerseSegments"),P(this,"isCustomized"),P(this,"baseVersification"),P(this,"scriptureBooks"),P(this,"_type"),e!=null)typeof e=="string"?this.name=e:this._type=e;else throw new Error("Argument null")}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};let le=Ne;P(le,"Original",new Ne(Ee.Original)),P(le,"Septuagint",new Ne(Ee.Septuagint)),P(le,"Vulgate",new Ne(Ee.Vulgate)),P(le,"English",new Ne(Ee.English)),P(le,"RussianProtestant",new Ne(Ee.RussianProtestant)),P(le,"RussianOrthodox",new Ne(Ee.RussianOrthodox));function Ln(e,n){const r=n[0];for(let t=1;t<n.length;t++)e=e.split(n[t]).join(r);return e.split(r)}var Nr=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Nr||{});const $=class{constructor(e,n,r,t){if(P(this,"firstChapter"),P(this,"lastChapter"),P(this,"lastVerse"),P(this,"hasSegmentsDefined"),P(this,"text"),P(this,"BBBCCCVVVS"),P(this,"longHashCode"),P(this,"versification"),P(this,"rtlMark","‏"),P(this,"_bookNum",0),P(this,"_chapterNum",0),P(this,"_verseNum",0),P(this,"_verse"),r==null&&t==null)if(e!=null&&typeof e=="string"){const o=e,a=n!=null&&n instanceof le?n:void 0;this.setEmpty(a),this.parse(o)}else if(e!=null&&typeof e=="number"){const o=n!=null&&n instanceof le?n:void 0;this.setEmpty(o),this._verseNum=e%$.chapterDigitShifter,this._chapterNum=Math.floor(e%$.bookDigitShifter/$.chapterDigitShifter),this._bookNum=Math.floor(e/$.bookDigitShifter)}else if(n==null)if(e!=null&&e instanceof $){const o=e;this._bookNum=o.bookNum,this._chapterNum=o.chapterNum,this._verseNum=o.verseNum,this._verse=o.verse,this.versification=o.versification}else{if(e==null)return;const o=e instanceof le?e:$.defaultVersification;this.setEmpty(o)}else throw new Error("VerseRef constructor not supported.");else if(e!=null&&n!=null&&r!=null)if(typeof e=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(t),this.updateInternal(e,n,r);else if(typeof e=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=e,this._chapterNum=n,this._verseNum=r,this.versification=t??$.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(e,n=$.defaultVersification){const r=new $(n);return r.parse(e),r}static isVerseParseable(e){return e.length>0&&"0123456789".includes(e[0])&&!e.endsWith(this.verseRangeSeparator)&&!e.endsWith(this.verseSequenceIndicator)}static tryParse(e){let n;try{return n=$.parse(e),{success:!0,verseRef:n}}catch(r){if(r instanceof Ue)return n=new $,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(e,n,r){return e%$.bcvMaxValue*$.bookDigitShifter+(n>=0?n%$.bcvMaxValue*$.chapterDigitShifter:0)+(r>=0?r%$.bcvMaxValue:0)}static tryGetVerseNum(e){let n;if(!e)return n=-1,{success:!0,vNum:n};n=0;let r;for(let t=0;t<e.length;t++){if(r=e[t],r<"0"||r>"9")return t===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>$.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes($.verseRangeSeparator)||this._verse.includes($.verseSequenceIndicator))}get book(){return xe.bookNumberToId(this.bookNum,"")}set book(e){this.bookNum=xe.bookIdToNumber(e)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(e){const n=+e;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(e){const{success:n,vNum:r}=$.tryGetVerseNum(e);this._verse=n?void 0:e.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=$.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(e){if(e<=0||e>xe.lastBook)throw new Ue("BookNum must be greater than zero and less than or equal to last book");this._bookNum=e}get chapterNum(){return this._chapterNum}set chapterNum(e){this.chapterNum=e}get verseNum(){return this._verseNum}set verseNum(e){this._verseNum=e}get versificationStr(){var e;return(e=this.versification)==null?void 0:e.name}set versificationStr(e){this.versification=this.versification!=null?new le(e):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse($.verseRangeSeparators,$.verseSequenceIndicators)}get BBBCCC(){return $.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return $.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(e){if(e=e.replace(this.rtlMark,""),e.includes("/")){const o=e.split("/");if(e=o[0],o.length>1)try{const a=+o[1].trim();this.versification=new le(Ee[a])}catch{throw new Ue("Invalid reference : "+e)}}const n=e.trim().split(" ");if(n.length!==2)throw new Ue("Invalid reference : "+e);const r=n[1].split(":"),t=+r[0];if(r.length!==2||xe.bookIdToNumber(n[0])===0||!Number.isInteger(t)||t<0||!$.isVerseParseable(r[1]))throw new Ue("Invalid reference : "+e);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new $(this)}toString(){const e=this.book;return e===""?"":`${e} ${this.chapter}:${this.verse}`}equals(e){return e._bookNum===this._bookNum&&e._chapterNum===this._chapterNum&&e._verseNum===this._verseNum&&e._verse===this._verse&&e.versification!=null&&this.versification!=null&&e.versification.equals(this.versification)}allVerses(e=!1,n=$.verseRangeSeparators,r=$.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const t=[],o=Ln(this._verse,r);for(const a of o.map(i=>Ln(i,n))){const i=this.clone();i.verse=a[0];const l=i.verseNum;if(t.push(i),a.length>1){const c=this.clone();if(c.verse=a[1],!e)for(let s=l+1;s<c.verseNum;s++){const u=new $(this._bookNum,this._chapterNum,s,this.versification);this.isExcluded||t.push(u)}t.push(c)}}return t}validateVerse(e,n){if(!this.verse)return this.internalValid;let r=0;for(const t of this.allVerses(!0,e,n)){const o=t.internalValid;if(o!==0)return o;const a=t.BBBCCCVVV;if(r>a)return 3;if(r===a)return 4;r=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>xe.lastBook?2:0}setEmpty(e=$.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=e}updateInternal(e,n,r){this.bookNum=xe.bookIdToNumber(e),this.chapter=n,this.verse=r}};let ve=$;P(ve,"defaultVersification",le.English),P(ve,"verseRangeSeparator","-"),P(ve,"verseSequenceIndicator",","),P(ve,"verseRangeSeparators",[$.verseRangeSeparator]),P(ve,"verseSequenceIndicators",[$.verseSequenceIndicator]),P(ve,"chapterDigitShifter",1e3),P(ve,"bookDigitShifter",$.chapterDigitShifter*$.chapterDigitShifter),P(ve,"bcvMaxValue",$.chapterDigitShifter-1),P(ve,"ValidStatusType",Nr);class Ue extends Error{}function We({variant:e="outlined",id:n,isDisabled:r=!1,hasError:t=!1,isFullWidth:o=!1,helperText:a,label:i,placeholder:l,isRequired:c=!1,className:s,defaultValue:u,value:p,onChange:d,onFocus:x,onBlur:y}){return b.jsx(Q.TextField,{variant:e,id:n,disabled:r,error:t,fullWidth:o,helperText:a,label:i,placeholder:l,required:c,className:`papi-textfield ${s??""}`,defaultValue:u,value:p,onChange:d,onFocus:x,onBlur:y})}let hn;const mn=()=>(hn||(hn=xe.allBookIds.map(e=>({bookId:e,label:xe.bookIdToEnglishName(e)}))),hn);function yt({scrRef:e,handleSubmit:n,id:r}){const t=c=>{n(c)},o=(c,s)=>{const p={bookNum:xe.bookIdToNumber(s.bookId),chapterNum:1,verseNum:1};t(p)},a=c=>{n({...e,chapterNum:+c.target.value})},i=c=>{n({...e,verseNum:+c.target.value})},l=Y.useMemo(()=>mn()[e.bookNum-1],[e.bookNum]);return b.jsxs("span",{id:r,children:[b.jsx(nn,{title:"Book",className:"papi-ref-selector book",value:l,options:mn(),onChange:o,isClearable:!1,width:200}),b.jsx(Oe,{onClick:()=>t(ge.offsetBook(e,-1)),isDisabled:e.bookNum<=ge.FIRST_SCR_BOOK_NUM,children:"<"}),b.jsx(Oe,{onClick:()=>t(ge.offsetBook(e,1)),isDisabled:e.bookNum>=mn().length,children:">"}),b.jsx(We,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:a}),b.jsx(Oe,{onClick:()=>n(ge.offsetChapter(e,-1)),isDisabled:e.chapterNum<=ge.FIRST_SCR_CHAPTER_NUM,children:"<"}),b.jsx(Oe,{onClick:()=>n(ge.offsetChapter(e,1)),isDisabled:e.chapterNum>=ge.getChaptersForBook(e.bookNum),children:">"}),b.jsx(We,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:i}),b.jsx(Oe,{onClick:()=>n(ge.offsetVerse(e,-1)),isDisabled:e.verseNum<=ge.FIRST_SCR_VERSE_NUM,children:"<"}),b.jsx(Oe,{onClick:()=>n(ge.offsetVerse(e,1)),children:">"})]})}function vt({onSearch:e,placeholder:n,isFullWidth:r}){const[t,o]=Y.useState(""),a=i=>{o(i),e(i)};return b.jsx(Q.Paper,{component:"form",className:"search-bar-paper",children:b.jsx(We,{isFullWidth:r,className:"search-bar-input",placeholder:n,value:t,onChange:i=>a(i.target.value)})})}function xt({id:e,isDisabled:n=!1,orientation:r="horizontal",min:t=0,max:o=100,step:a=1,showMarks:i=!1,defaultValue:l,value:c,valueLabelDisplay:s="off",className:u,onChange:p,onChangeCommitted:d}){return b.jsx(Q.Slider,{id:e,disabled:n,orientation:r,min:t,max:o,step:a,marks:i,defaultValue:l,value:c,valueLabelDisplay:s,className:`papi-slider ${r} ${u??""}`,onChange:p,onChangeCommitted:d})}function wt({autoHideDuration:e=void 0,id:n,isOpen:r=!1,className:t,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:i,children:l}){const c={action:(i==null?void 0:i.action)||l,message:i==null?void 0:i.message,className:t};return b.jsx(Q.Snackbar,{autoHideDuration:e??void 0,open:r,onClose:o,anchorOrigin:a,id:n,ContentProps:c})}function kt({id:e,isChecked:n,isDisabled:r=!1,hasError:t=!1,className:o,onChange:a}){return b.jsx(Q.Switch,{id:e,checked:n,disabled:r,className:`papi-switch ${t?"error":""} ${o??""}`,onChange:a})}function Un({onRowChange:e,row:n,column:r}){const t=o=>{e({...n,[r.key]:o.target.value})};return b.jsx(We,{defaultValue:n[r.key],onChange:t})}const St=({onChange:e,disabled:n,checked:r,...t})=>{const o=a=>{e(a.target.checked,a.nativeEvent.shiftKey)};return b.jsx(wr,{...t,isChecked:r,isDisabled:n,onChange:o})};function Et({columns:e,sortColumns:n,onSortColumnsChange:r,onColumnResize:t,defaultColumnWidth:o,defaultColumnMinWidth:a,defaultColumnMaxWidth:i,defaultColumnSortable:l=!0,defaultColumnResizable:c=!0,rows:s,enableSelectColumn:u,selectColumnWidth:p=50,rowKeyGetter:d,rowHeight:x=35,headerRowHeight:y=35,selectedRows:h,onSelectedRowsChange:f,onRowsChange:S,onCellClick:Z,onCellDoubleClick:B,onCellContextMenu:C,onCellKeyDown:m,direction:ne="ltr",enableVirtualization:oe=!0,onCopy:me,onPaste:fe,onScroll:T,className:H}){const ee=Y.useMemo(()=>{const ae=e.map(U=>typeof U.editable=="function"?{...U,editable:re=>!!U.editable(re),renderEditCell:U.renderEditCell||Un}:U.editable&&!U.renderEditCell?{...U,renderEditCell:Un}:U.renderEditCell&&!U.editable?{...U,editable:!1}:U);return u?[{...Vn.SelectColumn,minWidth:p},...ae]:ae},[e,u,p]);return b.jsx(Vn,{columns:ee,defaultColumnOptions:{width:o,minWidth:a,maxWidth:i,sortable:l,resizable:c},sortColumns:n,onSortColumnsChange:r,onColumnResize:t,rows:s,rowKeyGetter:d,rowHeight:x,headerRowHeight:y,selectedRows:h,onSelectedRowsChange:f,onRowsChange:S,onCellClick:Z,onCellDoubleClick:B,onCellContextMenu:C,onCellKeyDown:m,direction:ne,enableVirtualization:oe,onCopy:me,onPaste:fe,onScroll:T,renderers:{renderCheckbox:St},className:H??"rdg-light"})}function M(){return M=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},M.apply(this,arguments)}function Ce(e){if(typeof e!="object"||e===null)return!1;const n=Object.getPrototypeOf(e);return(n===null||n===Object.prototype||Object.getPrototypeOf(n)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Rr(e){if(!Ce(e))return e;const n={};return Object.keys(e).forEach(r=>{n[r]=Rr(e[r])}),n}function he(e,n,r={clone:!0}){const t=r.clone?M({},e):e;return Ce(e)&&Ce(n)&&Object.keys(n).forEach(o=>{o!=="__proto__"&&(Ce(n[o])&&o in e&&Ce(e[o])?t[o]=he(e[o],n[o],r):r.clone?t[o]=Ce(n[o])?Rr(n[o]):n[o]:t[o]=n[o])}),t}function Ct(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Cn={exports:{}},Ze={exports:{}},D={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qn;function Tt(){if(qn)return D;qn=1;var e=typeof Symbol=="function"&&Symbol.for,n=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,t=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,s=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,x=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,f=e?Symbol.for("react.fundamental"):60117,S=e?Symbol.for("react.responder"):60118,Z=e?Symbol.for("react.scope"):60119;function B(m){if(typeof m=="object"&&m!==null){var ne=m.$$typeof;switch(ne){case n:switch(m=m.type,m){case c:case s:case t:case a:case o:case p:return m;default:switch(m=m&&m.$$typeof,m){case l:case u:case y:case x:case i:return m;default:return ne}}case r:return ne}}}function C(m){return B(m)===s}return D.AsyncMode=c,D.ConcurrentMode=s,D.ContextConsumer=l,D.ContextProvider=i,D.Element=n,D.ForwardRef=u,D.Fragment=t,D.Lazy=y,D.Memo=x,D.Portal=r,D.Profiler=a,D.StrictMode=o,D.Suspense=p,D.isAsyncMode=function(m){return C(m)||B(m)===c},D.isConcurrentMode=C,D.isContextConsumer=function(m){return B(m)===l},D.isContextProvider=function(m){return B(m)===i},D.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===n},D.isForwardRef=function(m){return B(m)===u},D.isFragment=function(m){return B(m)===t},D.isLazy=function(m){return B(m)===y},D.isMemo=function(m){return B(m)===x},D.isPortal=function(m){return B(m)===r},D.isProfiler=function(m){return B(m)===a},D.isStrictMode=function(m){return B(m)===o},D.isSuspense=function(m){return B(m)===p},D.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===t||m===s||m===a||m===o||m===p||m===d||typeof m=="object"&&m!==null&&(m.$$typeof===y||m.$$typeof===x||m.$$typeof===i||m.$$typeof===l||m.$$typeof===u||m.$$typeof===f||m.$$typeof===S||m.$$typeof===Z||m.$$typeof===h)},D.typeOf=B,D}var V={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gn;function _t(){return Gn||(Gn=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,n=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,t=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,s=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,x=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,f=e?Symbol.for("react.fundamental"):60117,S=e?Symbol.for("react.responder"):60118,Z=e?Symbol.for("react.scope"):60119;function B(v){return typeof v=="string"||typeof v=="function"||v===t||v===s||v===a||v===o||v===p||v===d||typeof v=="object"&&v!==null&&(v.$$typeof===y||v.$$typeof===x||v.$$typeof===i||v.$$typeof===l||v.$$typeof===u||v.$$typeof===f||v.$$typeof===S||v.$$typeof===Z||v.$$typeof===h)}function C(v){if(typeof v=="object"&&v!==null){var ce=v.$$typeof;switch(ce){case n:var k=v.type;switch(k){case c:case s:case t:case a:case o:case p:return k;default:var Ae=k&&k.$$typeof;switch(Ae){case l:case u:case y:case x:case i:return Ae;default:return ce}}case r:return ce}}}var m=c,ne=s,oe=l,me=i,fe=n,T=u,H=t,ee=y,ae=x,U=r,pe=a,re=o,ye=p,_e=!1;function Pe(v){return _e||(_e=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),g(v)||C(v)===c}function g(v){return C(v)===s}function w(v){return C(v)===l}function R(v){return C(v)===i}function O(v){return typeof v=="object"&&v!==null&&v.$$typeof===n}function E(v){return C(v)===u}function A(v){return C(v)===t}function _(v){return C(v)===y}function N(v){return C(v)===x}function I(v){return C(v)===r}function z(v){return C(v)===a}function j(v){return C(v)===o}function te(v){return C(v)===p}V.AsyncMode=m,V.ConcurrentMode=ne,V.ContextConsumer=oe,V.ContextProvider=me,V.Element=fe,V.ForwardRef=T,V.Fragment=H,V.Lazy=ee,V.Memo=ae,V.Portal=U,V.Profiler=pe,V.StrictMode=re,V.Suspense=ye,V.isAsyncMode=Pe,V.isConcurrentMode=g,V.isContextConsumer=w,V.isContextProvider=R,V.isElement=O,V.isForwardRef=E,V.isFragment=A,V.isLazy=_,V.isMemo=N,V.isPortal=I,V.isProfiler=z,V.isStrictMode=j,V.isSuspense=te,V.isValidElementType=B,V.typeOf=C}()),V}var Hn;function $r(){return Hn||(Hn=1,process.env.NODE_ENV==="production"?Ze.exports=Tt():Ze.exports=_t()),Ze.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var gn,Wn;function Ot(){if(Wn)return gn;Wn=1;var e=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function t(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var i={},l=0;l<10;l++)i["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(i).map(function(u){return i[u]});if(c.join("")!=="0123456789")return!1;var s={};return"abcdefghijklmnopqrst".split("").forEach(function(u){s[u]=u}),Object.keys(Object.assign({},s)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return gn=o()?Object.assign:function(a,i){for(var l,c=t(a),s,u=1;u<arguments.length;u++){l=Object(arguments[u]);for(var p in l)n.call(l,p)&&(c[p]=l[p]);if(e){s=e(l);for(var d=0;d<s.length;d++)r.call(l,s[d])&&(c[s[d]]=l[s[d]])}}return c},gn}var bn,Xn;function Rn(){if(Xn)return bn;Xn=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return bn=e,bn}var yn,Yn;function Pr(){return Yn||(Yn=1,yn=Function.call.bind(Object.prototype.hasOwnProperty)),yn}var vn,Kn;function Nt(){if(Kn)return vn;Kn=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var n=Rn(),r={},t=Pr();e=function(a){var i="Warning: "+a;typeof console<"u"&&console.error(i);try{throw new Error(i)}catch{}}}function o(a,i,l,c,s){if(process.env.NODE_ENV!=="production"){for(var u in a)if(t(a,u)){var p;try{if(typeof a[u]!="function"){var d=Error((c||"React class")+": "+l+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw d.name="Invariant Violation",d}p=a[u](i,u,c,l,null,n)}catch(y){p=y}if(p&&!(p instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+u+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof p+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),p instanceof Error&&!(p.message in r)){r[p.message]=!0;var x=s?s():"";e("Failed "+l+" type: "+p.message+(x??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(r={})},vn=o,vn}var xn,Jn;function Rt(){if(Jn)return xn;Jn=1;var e=$r(),n=Ot(),r=Rn(),t=Pr(),o=Nt(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function i(){return null}return xn=function(l,c){var s=typeof Symbol=="function"&&Symbol.iterator,u="@@iterator";function p(g){var w=g&&(s&&g[s]||g[u]);if(typeof w=="function")return w}var d="<<anonymous>>",x={array:S("array"),bigint:S("bigint"),bool:S("boolean"),func:S("function"),number:S("number"),object:S("object"),string:S("string"),symbol:S("symbol"),any:Z(),arrayOf:B,element:C(),elementType:m(),instanceOf:ne,node:T(),objectOf:me,oneOf:oe,oneOfType:fe,shape:ee,exact:ae};function y(g,w){return g===w?g!==0||1/g===1/w:g!==g&&w!==w}function h(g,w){this.message=g,this.data=w&&typeof w=="object"?w:{},this.stack=""}h.prototype=Error.prototype;function f(g){if(process.env.NODE_ENV!=="production")var w={},R=0;function O(A,_,N,I,z,j,te){if(I=I||d,j=j||N,te!==r){if(c){var v=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw v.name="Invariant Violation",v}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var ce=I+":"+N;!w[ce]&&R<3&&(a("You are manually calling a React.PropTypes validation function for the `"+j+"` prop on `"+I+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),w[ce]=!0,R++)}}return _[N]==null?A?_[N]===null?new h("The "+z+" `"+j+"` is marked as required "+("in `"+I+"`, but its value is `null`.")):new h("The "+z+" `"+j+"` is marked as required in "+("`"+I+"`, but its value is `undefined`.")):null:g(_,N,I,z,j)}var E=O.bind(null,!1);return E.isRequired=O.bind(null,!0),E}function S(g){function w(R,O,E,A,_,N){var I=R[O],z=re(I);if(z!==g){var j=ye(I);return new h("Invalid "+A+" `"+_+"` of type "+("`"+j+"` supplied to `"+E+"`, expected ")+("`"+g+"`."),{expectedType:g})}return null}return f(w)}function Z(){return f(i)}function B(g){function w(R,O,E,A,_){if(typeof g!="function")return new h("Property `"+_+"` of component `"+E+"` has invalid PropType notation inside arrayOf.");var N=R[O];if(!Array.isArray(N)){var I=re(N);return new h("Invalid "+A+" `"+_+"` of type "+("`"+I+"` supplied to `"+E+"`, expected an array."))}for(var z=0;z<N.length;z++){var j=g(N,z,E,A,_+"["+z+"]",r);if(j instanceof Error)return j}return null}return f(w)}function C(){function g(w,R,O,E,A){var _=w[R];if(!l(_)){var N=re(_);return new h("Invalid "+E+" `"+A+"` of type "+("`"+N+"` supplied to `"+O+"`, expected a single ReactElement."))}return null}return f(g)}function m(){function g(w,R,O,E,A){var _=w[R];if(!e.isValidElementType(_)){var N=re(_);return new h("Invalid "+E+" `"+A+"` of type "+("`"+N+"` supplied to `"+O+"`, expected a single ReactElement type."))}return null}return f(g)}function ne(g){function w(R,O,E,A,_){if(!(R[O]instanceof g)){var N=g.name||d,I=Pe(R[O]);return new h("Invalid "+A+" `"+_+"` of type "+("`"+I+"` supplied to `"+E+"`, expected ")+("instance of `"+N+"`."))}return null}return f(w)}function oe(g){if(!Array.isArray(g))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),i;function w(R,O,E,A,_){for(var N=R[O],I=0;I<g.length;I++)if(y(N,g[I]))return null;var z=JSON.stringify(g,function(te,v){var ce=ye(v);return ce==="symbol"?String(v):v});return new h("Invalid "+A+" `"+_+"` of value `"+String(N)+"` "+("supplied to `"+E+"`, expected one of "+z+"."))}return f(w)}function me(g){function w(R,O,E,A,_){if(typeof g!="function")return new h("Property `"+_+"` of component `"+E+"` has invalid PropType notation inside objectOf.");var N=R[O],I=re(N);if(I!=="object")return new h("Invalid "+A+" `"+_+"` of type "+("`"+I+"` supplied to `"+E+"`, expected an object."));for(var z in N)if(t(N,z)){var j=g(N,z,E,A,_+"."+z,r);if(j instanceof Error)return j}return null}return f(w)}function fe(g){if(!Array.isArray(g))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),i;for(var w=0;w<g.length;w++){var R=g[w];if(typeof R!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+_e(R)+" at index "+w+"."),i}function O(E,A,_,N,I){for(var z=[],j=0;j<g.length;j++){var te=g[j],v=te(E,A,_,N,I,r);if(v==null)return null;v.data&&t(v.data,"expectedType")&&z.push(v.data.expectedType)}var ce=z.length>0?", expected one of type ["+z.join(", ")+"]":"";return new h("Invalid "+N+" `"+I+"` supplied to "+("`"+_+"`"+ce+"."))}return f(O)}function T(){function g(w,R,O,E,A){return U(w[R])?null:new h("Invalid "+E+" `"+A+"` supplied to "+("`"+O+"`, expected a ReactNode."))}return f(g)}function H(g,w,R,O,E){return new h((g||"React class")+": "+w+" type `"+R+"."+O+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+E+"`.")}function ee(g){function w(R,O,E,A,_){var N=R[O],I=re(N);if(I!=="object")return new h("Invalid "+A+" `"+_+"` of type `"+I+"` "+("supplied to `"+E+"`, expected `object`."));for(var z in g){var j=g[z];if(typeof j!="function")return H(E,A,_,z,ye(j));var te=j(N,z,E,A,_+"."+z,r);if(te)return te}return null}return f(w)}function ae(g){function w(R,O,E,A,_){var N=R[O],I=re(N);if(I!=="object")return new h("Invalid "+A+" `"+_+"` of type `"+I+"` "+("supplied to `"+E+"`, expected `object`."));var z=n({},R[O],g);for(var j in z){var te=g[j];if(t(g,j)&&typeof te!="function")return H(E,A,_,j,ye(te));if(!te)return new h("Invalid "+A+" `"+_+"` key `"+j+"` supplied to `"+E+"`.\nBad object: "+JSON.stringify(R[O],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(g),null,"  "));var v=te(N,j,E,A,_+"."+j,r);if(v)return v}return null}return f(w)}function U(g){switch(typeof g){case"number":case"string":case"undefined":return!0;case"boolean":return!g;case"object":if(Array.isArray(g))return g.every(U);if(g===null||l(g))return!0;var w=p(g);if(w){var R=w.call(g),O;if(w!==g.entries){for(;!(O=R.next()).done;)if(!U(O.value))return!1}else for(;!(O=R.next()).done;){var E=O.value;if(E&&!U(E[1]))return!1}}else return!1;return!0;default:return!1}}function pe(g,w){return g==="symbol"?!0:w?w["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&w instanceof Symbol:!1}function re(g){var w=typeof g;return Array.isArray(g)?"array":g instanceof RegExp?"object":pe(w,g)?"symbol":w}function ye(g){if(typeof g>"u"||g===null)return""+g;var w=re(g);if(w==="object"){if(g instanceof Date)return"date";if(g instanceof RegExp)return"regexp"}return w}function _e(g){var w=ye(g);switch(w){case"array":case"object":return"an "+w;case"boolean":case"date":case"regexp":return"a "+w;default:return w}}function Pe(g){return!g.constructor||!g.constructor.name?d:g.constructor.name}return x.checkPropTypes=o,x.resetWarningCache=o.resetWarningCache,x.PropTypes=x,x},xn}var wn,Zn;function $t(){if(Zn)return wn;Zn=1;var e=Rn();function n(){}function r(){}return r.resetWarningCache=n,wn=function(){function t(i,l,c,s,u,p){if(p!==e){var d=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw d.name="Invariant Violation",d}}t.isRequired=t;function o(){return t}var a={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:o,element:t,elementType:t,instanceOf:o,node:t,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:r,resetWarningCache:n};return a.PropTypes=a,a},wn}if(process.env.NODE_ENV!=="production"){var Pt=$r(),At=!0;Cn.exports=Rt()(Pt.isElement,At)}else Cn.exports=$t()();var It=Cn.exports;const q=Ct(It);function Ve(e){let n="https://mui.com/production-error/?code="+e;for(let r=1;r<arguments.length;r+=1)n+="&args[]="+encodeURIComponent(arguments[r]);return"Minified MUI error #"+e+"; visit "+n+" for the full message."}var Tn={exports:{}},F={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qn;function jt(){if(Qn)return F;Qn=1;var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),t=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),s=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),x=Symbol.for("react.offscreen"),y;y=Symbol.for("react.module.reference");function h(f){if(typeof f=="object"&&f!==null){var S=f.$$typeof;switch(S){case e:switch(f=f.type,f){case r:case o:case t:case s:case u:return f;default:switch(f=f&&f.$$typeof,f){case l:case i:case c:case d:case p:case a:return f;default:return S}}case n:return S}}}return F.ContextConsumer=i,F.ContextProvider=a,F.Element=e,F.ForwardRef=c,F.Fragment=r,F.Lazy=d,F.Memo=p,F.Portal=n,F.Profiler=o,F.StrictMode=t,F.Suspense=s,F.SuspenseList=u,F.isAsyncMode=function(){return!1},F.isConcurrentMode=function(){return!1},F.isContextConsumer=function(f){return h(f)===i},F.isContextProvider=function(f){return h(f)===a},F.isElement=function(f){return typeof f=="object"&&f!==null&&f.$$typeof===e},F.isForwardRef=function(f){return h(f)===c},F.isFragment=function(f){return h(f)===r},F.isLazy=function(f){return h(f)===d},F.isMemo=function(f){return h(f)===p},F.isPortal=function(f){return h(f)===n},F.isProfiler=function(f){return h(f)===o},F.isStrictMode=function(f){return h(f)===t},F.isSuspense=function(f){return h(f)===s},F.isSuspenseList=function(f){return h(f)===u},F.isValidElementType=function(f){return typeof f=="string"||typeof f=="function"||f===r||f===o||f===t||f===s||f===u||f===x||typeof f=="object"&&f!==null&&(f.$$typeof===d||f.$$typeof===p||f.$$typeof===a||f.$$typeof===i||f.$$typeof===c||f.$$typeof===y||f.getModuleId!==void 0)},F.typeOf=h,F}var L={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var er;function Mt(){return er||(er=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),t=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),s=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),x=Symbol.for("react.offscreen"),y=!1,h=!1,f=!1,S=!1,Z=!1,B;B=Symbol.for("react.module.reference");function C(k){return!!(typeof k=="string"||typeof k=="function"||k===r||k===o||Z||k===t||k===s||k===u||S||k===x||y||h||f||typeof k=="object"&&k!==null&&(k.$$typeof===d||k.$$typeof===p||k.$$typeof===a||k.$$typeof===i||k.$$typeof===c||k.$$typeof===B||k.getModuleId!==void 0))}function m(k){if(typeof k=="object"&&k!==null){var Ae=k.$$typeof;switch(Ae){case e:var Je=k.type;switch(Je){case r:case o:case t:case s:case u:return Je;default:var Dn=Je&&Je.$$typeof;switch(Dn){case l:case i:case c:case d:case p:case a:return Dn;default:return Ae}}case n:return Ae}}}var ne=i,oe=a,me=e,fe=c,T=r,H=d,ee=p,ae=n,U=o,pe=t,re=s,ye=u,_e=!1,Pe=!1;function g(k){return _e||(_e=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function w(k){return Pe||(Pe=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function R(k){return m(k)===i}function O(k){return m(k)===a}function E(k){return typeof k=="object"&&k!==null&&k.$$typeof===e}function A(k){return m(k)===c}function _(k){return m(k)===r}function N(k){return m(k)===d}function I(k){return m(k)===p}function z(k){return m(k)===n}function j(k){return m(k)===o}function te(k){return m(k)===t}function v(k){return m(k)===s}function ce(k){return m(k)===u}L.ContextConsumer=ne,L.ContextProvider=oe,L.Element=me,L.ForwardRef=fe,L.Fragment=T,L.Lazy=H,L.Memo=ee,L.Portal=ae,L.Profiler=U,L.StrictMode=pe,L.Suspense=re,L.SuspenseList=ye,L.isAsyncMode=g,L.isConcurrentMode=w,L.isContextConsumer=R,L.isContextProvider=O,L.isElement=E,L.isForwardRef=A,L.isFragment=_,L.isLazy=N,L.isMemo=I,L.isPortal=z,L.isProfiler=j,L.isStrictMode=te,L.isSuspense=v,L.isSuspenseList=ce,L.isValidElementType=C,L.typeOf=m}()),L}process.env.NODE_ENV==="production"?Tn.exports=jt():Tn.exports=Mt();var nr=Tn.exports;const Bt=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function zt(e){const n=`${e}`.match(Bt);return n&&n[1]||""}function Ar(e,n=""){return e.displayName||e.name||zt(e)||n}function rr(e,n,r){const t=Ar(n);return e.displayName||(t!==""?`${r}(${t})`:r)}function Dt(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Ar(e,"Component");if(typeof e=="object")switch(e.$$typeof){case nr.ForwardRef:return rr(e,e.render,"ForwardRef");case nr.Memo:return rr(e,e.type,"memo");default:return}}}function be(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Ve(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Ir(e,n){const r=M({},n);return Object.keys(e).forEach(t=>{if(t.toString().match(/^(components|slots)$/))r[t]=M({},e[t],r[t]);else if(t.toString().match(/^(componentsProps|slotProps)$/)){const o=e[t]||{},a=n[t];r[t]={},!a||!Object.keys(a)?r[t]=o:!o||!Object.keys(o)?r[t]=a:(r[t]=M({},a),Object.keys(o).forEach(i=>{r[t][i]=Ir(o[i],a[i])}))}else r[t]===void 0&&(r[t]=e[t])}),r}function Vt(e,n,r=void 0){const t={};return Object.keys(e).forEach(o=>{t[o]=e[o].reduce((a,i)=>{if(i){const l=n(i);l!==""&&a.push(l),r&&r[i]&&a.push(r[i])}return a},[]).join(" ")}),t}const tr=e=>e,Ft=()=>{let e=tr;return{configure(n){e=n},generate(n){return e(n)},reset(){e=tr}}},Lt=Ft(),Ut=Lt,qt={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function $n(e,n,r="Mui"){const t=qt[n];return t?`${r}-${t}`:`${Ut.generate(e)}-${n}`}function Gt(e,n,r="Mui"){const t={};return n.forEach(o=>{t[o]=$n(e,o,r)}),t}function Ht(e,n=Number.MIN_SAFE_INTEGER,r=Number.MAX_SAFE_INTEGER){return Math.max(n,Math.min(e,r))}function Se(e,n){if(e==null)return{};var r={},t=Object.keys(e),o,a;for(a=0;a<t.length;a++)o=t[a],!(n.indexOf(o)>=0)&&(r[o]=e[o]);return r}const Wt=["values","unit","step"],Xt=e=>{const n=Object.keys(e).map(r=>({key:r,val:e[r]}))||[];return n.sort((r,t)=>r.val-t.val),n.reduce((r,t)=>M({},r,{[t.key]:t.val}),{})};function Yt(e){const{values:n={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:r="px",step:t=5}=e,o=Se(e,Wt),a=Xt(n),i=Object.keys(a);function l(d){return`@media (min-width:${typeof n[d]=="number"?n[d]:d}${r})`}function c(d){return`@media (max-width:${(typeof n[d]=="number"?n[d]:d)-t/100}${r})`}function s(d,x){const y=i.indexOf(x);return`@media (min-width:${typeof n[d]=="number"?n[d]:d}${r}) and (max-width:${(y!==-1&&typeof n[i[y]]=="number"?n[i[y]]:x)-t/100}${r})`}function u(d){return i.indexOf(d)+1<i.length?s(d,i[i.indexOf(d)+1]):l(d)}function p(d){const x=i.indexOf(d);return x===0?l(i[1]):x===i.length-1?c(i[x]):s(d,i[i.indexOf(d)+1]).replace("@media","@media not all and")}return M({keys:i,values:a,up:l,down:c,between:s,only:u,not:p,unit:r},o)}const Kt={borderRadius:4},Jt=Kt,Zt=process.env.NODE_ENV!=="production"?q.oneOfType([q.number,q.string,q.object,q.array]):{},Te=Zt;function Ge(e,n){return n?he(e,n,{clone:!1}):e}const Pn={xs:0,sm:600,md:900,lg:1200,xl:1536},or={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Pn[e]}px)`};function we(e,n,r){const t=e.theme||{};if(Array.isArray(n)){const a=t.breakpoints||or;return n.reduce((i,l,c)=>(i[a.up(a.keys[c])]=r(n[c]),i),{})}if(typeof n=="object"){const a=t.breakpoints||or;return Object.keys(n).reduce((i,l)=>{if(Object.keys(a.values||Pn).indexOf(l)!==-1){const c=a.up(l);i[c]=r(n[l],l)}else{const c=l;i[c]=n[c]}return i},{})}return r(n)}function Qt(e={}){var n;return((n=e.keys)==null?void 0:n.reduce((t,o)=>{const a=e.up(o);return t[a]={},t},{}))||{}}function eo(e,n){return e.reduce((r,t)=>{const o=r[t];return(!o||Object.keys(o).length===0)&&delete r[t],r},n)}function an(e,n,r=!0){if(!n||typeof n!="string")return null;if(e&&e.vars&&r){const t=`vars.${n}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(t!=null)return t}return n.split(".").reduce((t,o)=>t&&t[o]!=null?t[o]:null,e)}function rn(e,n,r,t=r){let o;return typeof e=="function"?o=e(r):Array.isArray(e)?o=e[r]||t:o=an(e,r)||t,n&&(o=n(o,t,e)),o}function J(e){const{prop:n,cssProperty:r=e.prop,themeKey:t,transform:o}=e,a=i=>{if(i[n]==null)return null;const l=i[n],c=i.theme,s=an(c,t)||{};return we(i,l,p=>{let d=rn(s,o,p);return p===d&&typeof p=="string"&&(d=rn(s,o,`${n}${p==="default"?"":be(p)}`,p)),r===!1?d:{[r]:d}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[n]:Te}:{},a.filterProps=[n],a}function no(e){const n={};return r=>(n[r]===void 0&&(n[r]=e(r)),n[r])}const ro={m:"margin",p:"padding"},to={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},ar={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},oo=no(e=>{if(e.length>2)if(ar[e])e=ar[e];else return[e];const[n,r]=e.split(""),t=ro[n],o=to[r]||"";return Array.isArray(o)?o.map(a=>t+a):[t+o]}),sn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],cn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],ao=[...sn,...cn];function Ye(e,n,r,t){var o;const a=(o=an(e,n,!1))!=null?o:r;return typeof a=="number"?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&typeof i!="number"&&console.error(`MUI: Expected ${t} argument to be a number or a string, got ${i}.`),a*i):Array.isArray(a)?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&(Number.isInteger(i)?i>a.length-1&&console.error([`MUI: The value provided (${i}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${i} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${n}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${n}\` as a number.`].join(`
`))),a[i]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${n}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function jr(e){return Ye(e,"spacing",8,"spacing")}function Ke(e,n){if(typeof n=="string"||n==null)return n;const r=Math.abs(n),t=e(r);return n>=0?t:typeof t=="number"?-t:`-${t}`}function io(e,n){return r=>e.reduce((t,o)=>(t[o]=Ke(n,r),t),{})}function so(e,n,r,t){if(n.indexOf(r)===-1)return null;const o=oo(r),a=io(o,t),i=e[r];return we(e,i,a)}function Mr(e,n){const r=jr(e.theme);return Object.keys(e).map(t=>so(e,n,t,r)).reduce(Ge,{})}function W(e){return Mr(e,sn)}W.propTypes=process.env.NODE_ENV!=="production"?sn.reduce((e,n)=>(e[n]=Te,e),{}):{};W.filterProps=sn;function X(e){return Mr(e,cn)}X.propTypes=process.env.NODE_ENV!=="production"?cn.reduce((e,n)=>(e[n]=Te,e),{}):{};X.filterProps=cn;process.env.NODE_ENV!=="production"&&ao.reduce((e,n)=>(e[n]=Te,e),{});function co(e=8){if(e.mui)return e;const n=jr({spacing:e}),r=(...t)=>(process.env.NODE_ENV!=="production"&&(t.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${t.length}`)),(t.length===0?[1]:t).map(a=>{const i=n(a);return typeof i=="number"?`${i}px`:i}).join(" "));return r.mui=!0,r}function ln(...e){const n=e.reduce((t,o)=>(o.filterProps.forEach(a=>{t[a]=o}),t),{}),r=t=>Object.keys(t).reduce((o,a)=>n[a]?Ge(o,n[a](t)):o,{});return r.propTypes=process.env.NODE_ENV!=="production"?e.reduce((t,o)=>Object.assign(t,o.propTypes),{}):{},r.filterProps=e.reduce((t,o)=>t.concat(o.filterProps),[]),r}function ue(e){return typeof e!="number"?e:`${e}px solid`}function de(e,n){return J({prop:e,themeKey:"borders",transform:n})}const lo=de("border",ue),uo=de("borderTop",ue),fo=de("borderRight",ue),po=de("borderBottom",ue),ho=de("borderLeft",ue),mo=de("borderColor"),go=de("borderTopColor"),bo=de("borderRightColor"),yo=de("borderBottomColor"),vo=de("borderLeftColor"),xo=de("outline",ue),wo=de("outlineColor"),un=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const n=Ye(e.theme,"shape.borderRadius",4,"borderRadius"),r=t=>({borderRadius:Ke(n,t)});return we(e,e.borderRadius,r)}return null};un.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:Te}:{};un.filterProps=["borderRadius"];ln(lo,uo,fo,po,ho,mo,go,bo,yo,vo,un,xo,wo);const dn=e=>{if(e.gap!==void 0&&e.gap!==null){const n=Ye(e.theme,"spacing",8,"gap"),r=t=>({gap:Ke(n,t)});return we(e,e.gap,r)}return null};dn.propTypes=process.env.NODE_ENV!=="production"?{gap:Te}:{};dn.filterProps=["gap"];const fn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const n=Ye(e.theme,"spacing",8,"columnGap"),r=t=>({columnGap:Ke(n,t)});return we(e,e.columnGap,r)}return null};fn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:Te}:{};fn.filterProps=["columnGap"];const pn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const n=Ye(e.theme,"spacing",8,"rowGap"),r=t=>({rowGap:Ke(n,t)});return we(e,e.rowGap,r)}return null};pn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:Te}:{};pn.filterProps=["rowGap"];const ko=J({prop:"gridColumn"}),So=J({prop:"gridRow"}),Eo=J({prop:"gridAutoFlow"}),Co=J({prop:"gridAutoColumns"}),To=J({prop:"gridAutoRows"}),_o=J({prop:"gridTemplateColumns"}),Oo=J({prop:"gridTemplateRows"}),No=J({prop:"gridTemplateAreas"}),Ro=J({prop:"gridArea"});ln(dn,fn,pn,ko,So,Eo,Co,To,_o,Oo,No,Ro);function De(e,n){return n==="grey"?n:e}const $o=J({prop:"color",themeKey:"palette",transform:De}),Po=J({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:De}),Ao=J({prop:"backgroundColor",themeKey:"palette",transform:De});ln($o,Po,Ao);function se(e){return e<=1&&e!==0?`${e*100}%`:e}const Io=J({prop:"width",transform:se}),An=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const n=r=>{var t,o;const a=((t=e.theme)==null||(t=t.breakpoints)==null||(t=t.values)==null?void 0:t[r])||Pn[r];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:se(r)}};return we(e,e.maxWidth,n)}return null};An.filterProps=["maxWidth"];const jo=J({prop:"minWidth",transform:se}),Mo=J({prop:"height",transform:se}),Bo=J({prop:"maxHeight",transform:se}),zo=J({prop:"minHeight",transform:se});J({prop:"size",cssProperty:"width",transform:se});J({prop:"size",cssProperty:"height",transform:se});const Do=J({prop:"boxSizing"});ln(Io,An,jo,Mo,Bo,zo,Do);const Vo={border:{themeKey:"borders",transform:ue},borderTop:{themeKey:"borders",transform:ue},borderRight:{themeKey:"borders",transform:ue},borderBottom:{themeKey:"borders",transform:ue},borderLeft:{themeKey:"borders",transform:ue},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:ue},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:un},color:{themeKey:"palette",transform:De},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:De},backgroundColor:{themeKey:"palette",transform:De},p:{style:X},pt:{style:X},pr:{style:X},pb:{style:X},pl:{style:X},px:{style:X},py:{style:X},padding:{style:X},paddingTop:{style:X},paddingRight:{style:X},paddingBottom:{style:X},paddingLeft:{style:X},paddingX:{style:X},paddingY:{style:X},paddingInline:{style:X},paddingInlineStart:{style:X},paddingInlineEnd:{style:X},paddingBlock:{style:X},paddingBlockStart:{style:X},paddingBlockEnd:{style:X},m:{style:W},mt:{style:W},mr:{style:W},mb:{style:W},ml:{style:W},mx:{style:W},my:{style:W},margin:{style:W},marginTop:{style:W},marginRight:{style:W},marginBottom:{style:W},marginLeft:{style:W},marginX:{style:W},marginY:{style:W},marginInline:{style:W},marginInlineStart:{style:W},marginInlineEnd:{style:W},marginBlock:{style:W},marginBlockStart:{style:W},marginBlockEnd:{style:W},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:dn},rowGap:{style:pn},columnGap:{style:fn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:se},maxWidth:{style:An},minWidth:{transform:se},height:{transform:se},maxHeight:{transform:se},minHeight:{transform:se},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},In=Vo;function Fo(...e){const n=e.reduce((t,o)=>t.concat(Object.keys(o)),[]),r=new Set(n);return e.every(t=>r.size===Object.keys(t).length)}function Lo(e,n){return typeof e=="function"?e(n):e}function Uo(){function e(r,t,o,a){const i={[r]:t,theme:o},l=a[r];if(!l)return{[r]:t};const{cssProperty:c=r,themeKey:s,transform:u,style:p}=l;if(t==null)return null;if(s==="typography"&&t==="inherit")return{[r]:t};const d=an(o,s)||{};return p?p(i):we(i,t,y=>{let h=rn(d,u,y);return y===h&&typeof y=="string"&&(h=rn(d,u,`${r}${y==="default"?"":be(y)}`,y)),c===!1?h:{[c]:h}})}function n(r){var t;const{sx:o,theme:a={}}=r||{};if(!o)return null;const i=(t=a.unstable_sxConfig)!=null?t:In;function l(c){let s=c;if(typeof c=="function")s=c(a);else if(typeof c!="object")return c;if(!s)return null;const u=Qt(a.breakpoints),p=Object.keys(u);let d=u;return Object.keys(s).forEach(x=>{const y=Lo(s[x],a);if(y!=null)if(typeof y=="object")if(i[x])d=Ge(d,e(x,y,a,i));else{const h=we({theme:a},y,f=>({[x]:f}));Fo(h,y)?d[x]=n({sx:y,theme:a}):d=Ge(d,h)}else d=Ge(d,e(x,y,a,i))}),eo(p,d)}return Array.isArray(o)?o.map(l):l(o)}return n}const Br=Uo();Br.filterProps=["sx"];const jn=Br,qo=["breakpoints","palette","spacing","shape"];function Mn(e={},...n){const{breakpoints:r={},palette:t={},spacing:o,shape:a={}}=e,i=Se(e,qo),l=Yt(r),c=co(o);let s=he({breakpoints:l,direction:"ltr",components:{},palette:M({mode:"light"},t),spacing:c,shape:M({},Jt,a)},i);return s=n.reduce((u,p)=>he(u,p),s),s.unstable_sxConfig=M({},In,i==null?void 0:i.unstable_sxConfig),s.unstable_sx=function(p){return jn({sx:p,theme:this})},s}function Go(e){return Object.keys(e).length===0}function Ho(e=null){const n=ie.useContext(En.ThemeContext);return!n||Go(n)?e:n}const Wo=Mn();function Xo(e=Wo){return Ho(e)}const Yo=["variant"];function ir(e){return e.length===0}function zr(e){const{variant:n}=e,r=Se(e,Yo);let t=n||"";return Object.keys(r).sort().forEach(o=>{o==="color"?t+=ir(t)?e[o]:be(e[o]):t+=`${ir(t)?o:be(o)}${be(e[o].toString())}`}),t}const Ko=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Jo(e){return Object.keys(e).length===0}function Zo(e){return typeof e=="string"&&e.charCodeAt(0)>96}const Qo=(e,n)=>n.components&&n.components[e]&&n.components[e].styleOverrides?n.components[e].styleOverrides:null,tn=e=>{let n=0;const r={};return e&&e.forEach(t=>{let o="";typeof t.props=="function"?(o=`callback${n}`,n+=1):o=zr(t.props),r[o]=t.style}),r},ea=(e,n)=>{let r=[];return n&&n.components&&n.components[e]&&n.components[e].variants&&(r=n.components[e].variants),tn(r)},on=(e,n,r)=>{const{ownerState:t={}}=e,o=[];let a=0;return r&&r.forEach(i=>{let l=!0;if(typeof i.props=="function"){const c=M({},e,t);l=i.props(c)}else Object.keys(i.props).forEach(c=>{t[c]!==i.props[c]&&e[c]!==i.props[c]&&(l=!1)});l&&(typeof i.props=="function"?o.push(n[`callback${a}`]):o.push(n[zr(i.props)])),typeof i.props=="function"&&(a+=1)}),o},na=(e,n,r,t)=>{var o;const a=r==null||(o=r.components)==null||(o=o[t])==null?void 0:o.variants;return on(e,n,a)};function Qe(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const ra=Mn(),sr=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function en({defaultTheme:e,theme:n,themeId:r}){return Jo(n)?e:n[r]||n}function ta(e){return e?(n,r)=>r[e]:null}const cr=({styledArg:e,props:n,defaultTheme:r,themeId:t})=>{const o=e(M({},n,{theme:en(M({},n,{defaultTheme:r,themeId:t}))}));let a;if(o&&o.variants&&(a=o.variants,delete o.variants),a){const i=on(n,tn(a),a);return[o,...i]}return o};function oa(e={}){const{themeId:n,defaultTheme:r=ra,rootShouldForwardProp:t=Qe,slotShouldForwardProp:o=Qe}=e,a=i=>jn(M({},i,{theme:en(M({},i,{defaultTheme:r,themeId:n}))}));return a.__mui_systemSx=!0,(i,l={})=>{En.internal_processStyles(i,C=>C.filter(m=>!(m!=null&&m.__mui_systemSx)));const{name:c,slot:s,skipVariantsResolver:u,skipSx:p,overridesResolver:d=ta(sr(s))}=l,x=Se(l,Ko),y=u!==void 0?u:s&&s!=="Root"&&s!=="root"||!1,h=p||!1;let f;process.env.NODE_ENV!=="production"&&c&&(f=`${c}-${sr(s||"Root")}`);let S=Qe;s==="Root"||s==="root"?S=t:s?S=o:Zo(i)&&(S=void 0);const Z=En(i,M({shouldForwardProp:S,label:f},x)),B=(C,...m)=>{const ne=m?m.map(T=>{if(typeof T=="function"&&T.__emotion_real!==T)return H=>cr({styledArg:T,props:H,defaultTheme:r,themeId:n});if(Ce(T)){let H=T,ee;return T&&T.variants&&(ee=T.variants,delete H.variants,H=ae=>{let U=T;return on(ae,tn(ee),ee).forEach(re=>{U=he(U,re)}),U}),H}return T}):[];let oe=C;if(Ce(C)){let T;C&&C.variants&&(T=C.variants,delete oe.variants,oe=H=>{let ee=C;return on(H,tn(T),T).forEach(U=>{ee=he(ee,U)}),ee})}else typeof C=="function"&&C.__emotion_real!==C&&(oe=T=>cr({styledArg:C,props:T,defaultTheme:r,themeId:n}));c&&d&&ne.push(T=>{const H=en(M({},T,{defaultTheme:r,themeId:n})),ee=Qo(c,H);if(ee){const ae={};return Object.entries(ee).forEach(([U,pe])=>{ae[U]=typeof pe=="function"?pe(M({},T,{theme:H})):pe}),d(T,ae)}return null}),c&&!y&&ne.push(T=>{const H=en(M({},T,{defaultTheme:r,themeId:n}));return na(T,ea(c,H),H,c)}),h||ne.push(a);const me=ne.length-m.length;if(Array.isArray(C)&&me>0){const T=new Array(me).fill("");oe=[...C,...T],oe.raw=[...C.raw,...T]}const fe=Z(oe,...ne);if(process.env.NODE_ENV!=="production"){let T;c&&(T=`${c}${be(s||"")}`),T===void 0&&(T=`Styled(${Dt(i)})`),fe.displayName=T}return i.muiName&&(fe.muiName=i.muiName),fe};return Z.withConfig&&(B.withConfig=Z.withConfig),B}}function aa(e){const{theme:n,name:r,props:t}=e;return!n||!n.components||!n.components[r]||!n.components[r].defaultProps?t:Ir(n.components[r].defaultProps,t)}function ia({props:e,name:n,defaultTheme:r,themeId:t}){let o=Xo(r);return t&&(o=o[t]||o),aa({theme:o,name:n,props:e})}function Dr(e,n=0,r=1){return process.env.NODE_ENV!=="production"&&(e<n||e>r)&&console.error(`MUI: The value provided ${e} is out of range [${n}, ${r}].`),Ht(e,n,r)}function sa(e){e=e.slice(1);const n=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let r=e.match(n);return r&&r[0].length===1&&(r=r.map(t=>t+t)),r?`rgb${r.length===4?"a":""}(${r.map((t,o)=>o<3?parseInt(t,16):Math.round(parseInt(t,16)/255*1e3)/1e3).join(", ")})`:""}function Fe(e){if(e.type)return e;if(e.charAt(0)==="#")return Fe(sa(e));const n=e.indexOf("("),r=e.substring(0,n);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Ve(9,e));let t=e.substring(n+1,e.length-1),o;if(r==="color"){if(t=t.split(" "),o=t.shift(),t.length===4&&t[3].charAt(0)==="/"&&(t[3]=t[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Ve(10,o))}else t=t.split(",");return t=t.map(a=>parseFloat(a)),{type:r,values:t,colorSpace:o}}function Bn(e){const{type:n,colorSpace:r}=e;let{values:t}=e;return n.indexOf("rgb")!==-1?t=t.map((o,a)=>a<3?parseInt(o,10):o):n.indexOf("hsl")!==-1&&(t[1]=`${t[1]}%`,t[2]=`${t[2]}%`),n.indexOf("color")!==-1?t=`${r} ${t.join(" ")}`:t=`${t.join(", ")}`,`${n}(${t})`}function ca(e){e=Fe(e);const{values:n}=e,r=n[0],t=n[1]/100,o=n[2]/100,a=t*Math.min(o,1-o),i=(s,u=(s+r/30)%12)=>o-a*Math.max(Math.min(u-3,9-u,1),-1);let l="rgb";const c=[Math.round(i(0)*255),Math.round(i(8)*255),Math.round(i(4)*255)];return e.type==="hsla"&&(l+="a",c.push(n[3])),Bn({type:l,values:c})}function lr(e){e=Fe(e);let n=e.type==="hsl"||e.type==="hsla"?Fe(ca(e)).values:e.values;return n=n.map(r=>(e.type!=="color"&&(r/=255),r<=.03928?r/12.92:((r+.055)/1.055)**2.4)),Number((.2126*n[0]+.7152*n[1]+.0722*n[2]).toFixed(3))}function ur(e,n){const r=lr(e),t=lr(n);return(Math.max(r,t)+.05)/(Math.min(r,t)+.05)}function la(e,n){if(e=Fe(e),n=Dr(n),e.type.indexOf("hsl")!==-1)e.values[2]*=1-n;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]*=1-n;return Bn(e)}function ua(e,n){if(e=Fe(e),n=Dr(n),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*n;else if(e.type.indexOf("rgb")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(255-e.values[r])*n;else if(e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(1-e.values[r])*n;return Bn(e)}function da(e,n){return M({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},n)}const fa={black:"#000",white:"#fff"},Xe=fa,pa={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},ha=pa,ma={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ie=ma,ga={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},je=ga,ba={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},qe=ba,ya={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Me=ya,va={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Be=va,xa={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},ze=xa,wa=["mode","contrastThreshold","tonalOffset"],dr={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Xe.white,default:Xe.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},kn={text:{primary:Xe.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Xe.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function fr(e,n,r,t){const o=t.light||t,a=t.dark||t*1.5;e[n]||(e.hasOwnProperty(r)?e[n]=e[r]:n==="light"?e.light=ua(e.main,o):n==="dark"&&(e.dark=la(e.main,a)))}function ka(e="light"){return e==="dark"?{main:Me[200],light:Me[50],dark:Me[400]}:{main:Me[700],light:Me[400],dark:Me[800]}}function Sa(e="light"){return e==="dark"?{main:Ie[200],light:Ie[50],dark:Ie[400]}:{main:Ie[500],light:Ie[300],dark:Ie[700]}}function Ea(e="light"){return e==="dark"?{main:je[500],light:je[300],dark:je[700]}:{main:je[700],light:je[400],dark:je[800]}}function Ca(e="light"){return e==="dark"?{main:Be[400],light:Be[300],dark:Be[700]}:{main:Be[700],light:Be[500],dark:Be[900]}}function Ta(e="light"){return e==="dark"?{main:ze[400],light:ze[300],dark:ze[700]}:{main:ze[800],light:ze[500],dark:ze[900]}}function _a(e="light"){return e==="dark"?{main:qe[400],light:qe[300],dark:qe[700]}:{main:"#ed6c02",light:qe[500],dark:qe[900]}}function Oa(e){const{mode:n="light",contrastThreshold:r=3,tonalOffset:t=.2}=e,o=Se(e,wa),a=e.primary||ka(n),i=e.secondary||Sa(n),l=e.error||Ea(n),c=e.info||Ca(n),s=e.success||Ta(n),u=e.warning||_a(n);function p(h){const f=ur(h,kn.text.primary)>=r?kn.text.primary:dr.text.primary;if(process.env.NODE_ENV!=="production"){const S=ur(h,f);S<3&&console.error([`MUI: The contrast ratio of ${S}:1 for ${f} on ${h}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return f}const d=({color:h,name:f,mainShade:S=500,lightShade:Z=300,darkShade:B=700})=>{if(h=M({},h),!h.main&&h[S]&&(h.main=h[S]),!h.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${f?` (${f})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${S}\` property.`:Ve(11,f?` (${f})`:"",S));if(typeof h.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${f?` (${f})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Ve(12,f?` (${f})`:"",JSON.stringify(h.main)));return fr(h,"light",Z,t),fr(h,"dark",B,t),h.contrastText||(h.contrastText=p(h.main)),h},x={dark:kn,light:dr};return process.env.NODE_ENV!=="production"&&(x[n]||console.error(`MUI: The palette mode \`${n}\` is not supported.`)),he(M({common:M({},Xe),mode:n,primary:d({color:a,name:"primary"}),secondary:d({color:i,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:d({color:l,name:"error"}),warning:d({color:u,name:"warning"}),info:d({color:c,name:"info"}),success:d({color:s,name:"success"}),grey:ha,contrastThreshold:r,getContrastText:p,augmentColor:d,tonalOffset:t},x[n]),o)}const Na=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Ra(e){return Math.round(e*1e5)/1e5}const pr={textTransform:"uppercase"},hr='"Roboto", "Helvetica", "Arial", sans-serif';function $a(e,n){const r=typeof n=="function"?n(e):n,{fontFamily:t=hr,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:i=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:s=16,allVariants:u,pxToRem:p}=r,d=Se(r,Na);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof s!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const x=o/14,y=p||(S=>`${S/s*x}rem`),h=(S,Z,B,C,m)=>M({fontFamily:t,fontWeight:S,fontSize:y(Z),lineHeight:B},t===hr?{letterSpacing:`${Ra(C/Z)}em`}:{},m,u),f={h1:h(a,96,1.167,-1.5),h2:h(a,60,1.2,-.5),h3:h(i,48,1.167,0),h4:h(i,34,1.235,.25),h5:h(i,24,1.334,0),h6:h(l,20,1.6,.15),subtitle1:h(i,16,1.75,.15),subtitle2:h(l,14,1.57,.1),body1:h(i,16,1.5,.15),body2:h(i,14,1.43,.15),button:h(l,14,1.75,.4,pr),caption:h(i,12,1.66,.4),overline:h(i,12,2.66,1,pr),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return he(M({htmlFontSize:s,pxToRem:y,fontFamily:t,fontSize:o,fontWeightLight:a,fontWeightRegular:i,fontWeightMedium:l,fontWeightBold:c},f),d,{clone:!1})}const Pa=.2,Aa=.14,Ia=.12;function G(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Pa})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Aa})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ia})`].join(",")}const ja=["none",G(0,2,1,-1,0,1,1,0,0,1,3,0),G(0,3,1,-2,0,2,2,0,0,1,5,0),G(0,3,3,-2,0,3,4,0,0,1,8,0),G(0,2,4,-1,0,4,5,0,0,1,10,0),G(0,3,5,-1,0,5,8,0,0,1,14,0),G(0,3,5,-1,0,6,10,0,0,1,18,0),G(0,4,5,-2,0,7,10,1,0,2,16,1),G(0,5,5,-3,0,8,10,1,0,3,14,2),G(0,5,6,-3,0,9,12,1,0,3,16,2),G(0,6,6,-3,0,10,14,1,0,4,18,3),G(0,6,7,-4,0,11,15,1,0,4,20,3),G(0,7,8,-4,0,12,17,2,0,5,22,4),G(0,7,8,-4,0,13,19,2,0,5,24,4),G(0,7,9,-4,0,14,21,2,0,5,26,4),G(0,8,9,-5,0,15,22,2,0,6,28,5),G(0,8,10,-5,0,16,24,2,0,6,30,5),G(0,8,11,-5,0,17,26,2,0,6,32,5),G(0,9,11,-5,0,18,28,2,0,7,34,6),G(0,9,12,-6,0,19,29,2,0,7,36,6),G(0,10,13,-6,0,20,31,3,0,8,38,7),G(0,10,13,-6,0,21,33,3,0,8,40,7),G(0,10,14,-6,0,22,35,3,0,8,42,7),G(0,11,14,-7,0,23,36,3,0,9,44,8),G(0,11,15,-7,0,24,38,3,0,9,46,8)],Ma=ja,Ba=["duration","easing","delay"],za={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Da={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function mr(e){return`${Math.round(e)}ms`}function Va(e){if(!e)return 0;const n=e/36;return Math.round((4+15*n**.25+n/5)*10)}function Fa(e){const n=M({},za,e.easing),r=M({},Da,e.duration);return M({getAutoHeightDuration:Va,create:(o=["all"],a={})=>{const{duration:i=r.standard,easing:l=n.easeInOut,delay:c=0}=a,s=Se(a,Ba);if(process.env.NODE_ENV!=="production"){const u=d=>typeof d=="string",p=d=>!isNaN(parseFloat(d));!u(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!p(i)&&!u(i)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`),u(l)||console.error('MUI: Argument "easing" must be a string.'),!p(c)&&!u(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(s).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(s).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(u=>`${u} ${typeof i=="string"?i:mr(i)} ${l} ${typeof c=="string"?c:mr(c)}`).join(",")}},e,{easing:n,duration:r})}const La={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Ua=La,qa=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Ga(e={},...n){const{mixins:r={},palette:t={},transitions:o={},typography:a={}}=e,i=Se(e,qa);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Ve(18));const l=Oa(t),c=Mn(e);let s=he(c,{mixins:da(c.breakpoints,r),palette:l,shadows:Ma.slice(),typography:$a(l,a),transitions:Fa(o),zIndex:M({},Ua),applyDarkStyles(u){return this.vars?{[this.getColorSchemeSelector("dark").replace(/(\[[^\]]+\])/,":where($1)")]:u}:this.palette.mode==="dark"?u:{}}});if(s=he(s,i),s=n.reduce((u,p)=>he(u,p),s),process.env.NODE_ENV!=="production"){const u=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],p=(d,x)=>{let y;for(y in d){const h=d[y];if(u.indexOf(y)!==-1&&Object.keys(h).length>0){if(process.env.NODE_ENV!=="production"){const f=$n("",y);console.error([`MUI: The \`${x}\` component increases the CSS specificity of the \`${y}\` internal state.`,"You can not override it like this: ",JSON.stringify(d,null,2),"",`Instead, you need to use the '&.${f}' syntax:`,JSON.stringify({root:{[`&.${f}`]:h}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}d[y]={}}}};Object.keys(s.components).forEach(d=>{const x=s.components[d].styleOverrides;x&&d.indexOf("Mui")===0&&p(x,d)})}return s.unstable_sxConfig=M({},In,i==null?void 0:i.unstable_sxConfig),s.unstable_sx=function(p){return jn({sx:p,theme:this})},s}const Ha=Ga(),Vr=Ha,Fr="$$material";function Wa({props:e,name:n}){return ia({props:e,name:n,defaultTheme:Vr,themeId:Fr})}const Xa=e=>Qe(e)&&e!=="classes",Ya=oa({themeId:Fr,defaultTheme:Vr,rootShouldForwardProp:Xa}),Ka=Ya;function Ja(e){return $n("MuiSvgIcon",e)}Gt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Za=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Qa=e=>{const{color:n,fontSize:r,classes:t}=e,o={root:["root",n!=="inherit"&&`color${be(n)}`,`fontSize${be(r)}`]};return Vt(o,Ja,t)},ei=Ka("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:r}=e;return[n.root,r.color!=="inherit"&&n[`color${be(r.color)}`],n[`fontSize${be(r.fontSize)}`]]}})(({theme:e,ownerState:n})=>{var r,t,o,a,i,l,c,s,u,p,d,x,y;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:n.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(r=e.transitions)==null||(t=r.create)==null?void 0:t.call(r,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(i=a.pxToRem)==null?void 0:i.call(a,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((s=e.typography)==null||(u=s.pxToRem)==null?void 0:u.call(s,35))||"2.1875rem"}[n.fontSize],color:(p=(d=(e.vars||e).palette)==null||(d=d[n.color])==null?void 0:d.main)!=null?p:{action:(x=(e.vars||e).palette)==null||(x=x.action)==null?void 0:x.active,disabled:(y=(e.vars||e).palette)==null||(y=y.action)==null?void 0:y.disabled,inherit:void 0}[n.color]}}),zn=ie.forwardRef(function(n,r){const t=Wa({props:n,name:"MuiSvgIcon"}),{children:o,className:a,color:i="inherit",component:l="svg",fontSize:c="medium",htmlColor:s,inheritViewBox:u=!1,titleAccess:p,viewBox:d="0 0 24 24"}=t,x=Se(t,Za),y=ie.isValidElement(o)&&o.type==="svg",h=M({},t,{color:i,component:l,fontSize:c,instanceFontSize:n.fontSize,inheritViewBox:u,viewBox:d,hasSvgAsChild:y}),f={};u||(f.viewBox=d);const S=Qa(h);return b.jsxs(ei,M({as:l,className:br(S.root,a),focusable:"false",color:s,"aria-hidden":p?void 0:!0,role:p?"img":void 0,ref:r},f,x,y&&o.props,{ownerState:h,children:[y?o.props.children:o,p?b.jsx("title",{children:p}):null]}))});process.env.NODE_ENV!=="production"&&(zn.propTypes={children:q.node,classes:q.object,className:q.string,color:q.oneOfType([q.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),q.string]),component:q.elementType,fontSize:q.oneOfType([q.oneOf(["inherit","large","medium","small"]),q.string]),htmlColor:q.string,inheritViewBox:q.bool,shapeRendering:q.string,sx:q.oneOfType([q.arrayOf(q.oneOfType([q.func,q.object,q.bool])),q.func,q.object]),titleAccess:q.string,viewBox:q.string});zn.muiName="SvgIcon";const gr=zn;function ni(e,n){function r(t,o){return b.jsx(gr,M({"data-testid":`${n}Icon`,ref:o},t,{children:e}))}return process.env.NODE_ENV!=="production"&&(r.displayName=`${n}Icon`),r.muiName=gr.muiName,ie.memo(ie.forwardRef(r))}const ri=ni(b.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function ti({menu:e,dataHandler:n,commandHandler:r,className:t,id:o,children:a}){const[i,l]=Y.useState(!1),[c,s]=Y.useState(!1),u=Y.useCallback(()=>{i&&l(!1),s(!1)},[i]),p=Y.useCallback(S=>{S.stopPropagation(),l(Z=>{const B=!Z;return B&&S.shiftKey?s(!0):B||s(!1),B})},[]),d=Y.useRef(void 0),[x,y]=Y.useState(0);Y.useEffect(()=>{i&&d.current&&y(d.current.clientHeight)},[i]);const h=Y.useCallback(S=>(u(),r(S)),[r,u]);let f=e;return!f&&n&&(f=n(c)),b.jsx("div",{ref:d,style:{position:"relative"},children:b.jsx(Q.AppBar,{position:"static",id:o,children:b.jsxs(Q.Toolbar,{className:`papi-toolbar ${t??""}`,variant:"dense",children:[f?b.jsx(Q.IconButton,{edge:"start",className:`papi-menuButton ${t??""}`,color:"inherit","aria-label":"open drawer",onClick:p,children:b.jsx(ri,{})}):void 0,a?b.jsx("div",{className:"papi-menu-children",children:a}):void 0,f?b.jsx(Q.Drawer,{className:`papi-menu-drawer ${t??""}`,anchor:"left",variant:"persistent",open:i,onClose:u,PaperProps:{className:"papi-menu-drawer-paper",style:{top:x}},children:b.jsx(Sr,{commandHandler:h,columns:f.columns})}):void 0]})})})}const oi=(e,n)=>{Y.useEffect(()=>{if(!e)return()=>{};const r=e(n);return()=>{r()}},[e,n])};function ai(e){return{preserveValue:!0,...e}}const Lr=(e,n,r={})=>{const t=Y.useRef(n);t.current=n;const o=Y.useRef(r);o.current=ai(o.current);const[a,i]=Y.useState(()=>t.current),[l,c]=Y.useState(!0);return Y.useEffect(()=>{let s=!0;return c(!!e),(async()=>{if(e){const u=await e();s&&(i(()=>u),c(!1))}})(),()=>{s=!1,o.current.preserveValue||i(()=>t.current)}},[e]),[a,l]},Sn=()=>!1,ii=(e,n)=>{const[r]=Lr(Y.useCallback(async()=>{if(!e)return Sn;const t=await Promise.resolve(e(n));return async()=>t()},[n,e]),Sn,{preserveValue:!1});Y.useEffect(()=>()=>{r!==Sn&&r()},[r])};exports.BookChapterControl=rt;exports.Button=Oe;exports.ChapterRangeSelector=tt;exports.Checkbox=wr;exports.ComboBox=nn;exports.GridMenu=Sr;exports.IconButton=at;exports.LabelPosition=Re;exports.MenuItem=kr;exports.RefSelector=yt;exports.SearchBar=vt;exports.Slider=xt;exports.Snackbar=wt;exports.Switch=kt;exports.Table=Et;exports.TextField=We;exports.Toolbar=ti;exports.useEvent=oi;exports.useEventAsync=ii;exports.usePromise=Lr;function si(e,n="top"){if(!e||typeof document>"u")return;const r=document.head||document.querySelector("head"),t=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),n==="top"&&t?r.insertBefore(o,t):r.appendChild(o)}si(`.papi-combo-box {
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
.pr-border-input {
    border-color: hsl(var(--input));
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
.focus-visible\\:pr-outline-none:focus-visible {
    outline: 2px solid transparent;
    outline-offset: 2px;
}
.focus-visible\\:pr-ring-2:focus-visible {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus-visible\\:pr-ring-ring:focus-visible {
    --tw-ring-color: hsl(var(--ring));
}
.focus-visible\\:pr-ring-offset-2:focus-visible {
    --tw-ring-offset-width: 2px;
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
}.papi-snackbar {
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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

.papi-menu-children {
  padding: 10px;
  position: relative;
}
.paratext {
  background-color: darkgreen;
  color: greenyellow;
}
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
.book-chapter-input {
  width: 300px;
  height: 36px;
  padding: 0 12px 0 40px;
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
