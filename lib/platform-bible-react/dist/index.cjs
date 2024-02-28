"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const k=require("react/jsx-runtime"),Z=require("@mui/material"),Y=require("react"),ge=require("platform-bible-utils"),Bn=require("react-data-grid"),wn=require("@mui/styled-engine");function Bt(e){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const t in e)if(t!=="default"){const r=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(n,t,r.get?r:{enumerable:!0,get:()=>e[t]})}}return n.default=e,Object.freeze(n)}const Ue=Bt(Y);function Ce({id:e,isDisabled:n=!1,className:t,onClick:r,onContextMenu:o,children:i}){return k.jsx(Z.Button,{id:e,disabled:n,className:`papi-button ${t??""} text-3xl font-bold underline`,onClick:r,onContextMenu:o,children:i})}function Ze({id:e,title:n,isDisabled:t=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:a,options:l=[],className:c,value:s,onChange:u,onFocus:p,onBlur:d,getOptionLabel:v}){return k.jsx(Z.Autocomplete,{id:e,disablePortal:!0,disabled:t,disableClearable:!r,fullWidth:i,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:s,onChange:u,onFocus:p,onBlur:d,getOptionLabel:v,renderInput:b=>k.jsx(Z.TextField,{...b,error:o,fullWidth:i,disabled:t,label:n,style:{width:a}})})}function zt({startChapter:e,endChapter:n,handleSelectStartChapter:t,handleSelectEndChapter:r,isDisabled:o,chapterCount:i}){const a=Y.useMemo(()=>Array.from({length:i},(s,u)=>u+1),[i]),l=(s,u)=>{t(u),u>n&&r(u)},c=(s,u)=>{r(u),u<e&&t(u)};return k.jsxs(k.Fragment,{children:[k.jsx(Z.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:k.jsx(Ze,{onChange:(s,u)=>l(s,u),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:s=>s.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),k.jsx(Z.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:k.jsx(Ze,{onChange:(s,u)=>c(s,u),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:s=>s.toString(),value:n,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var _e=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(_e||{});function ht({id:e,isChecked:n,labelText:t="",labelPosition:r=_e.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:a=!1,hasError:l=!1,className:c,onChange:s}){const u=k.jsx(Z.Checkbox,{id:e,checked:n,indeterminate:o,defaultChecked:i,disabled:a,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:s});let p;if(t){const d=r===_e.Before||r===_e.Above,v=k.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:t}),b=r===_e.Before||r===_e.After,h=b?v:k.jsx("div",{children:v}),f=b?u:k.jsx("div",{children:u});p=k.jsxs(Z.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:a,error:l,children:[d&&h,f,!d&&h]})}else p=u;return p}function gt(e){const{onClick:n,name:t,hasAutoFocus:r=!1,className:o,isDense:i=!0,hasDisabledGutters:a=!1,hasDivider:l=!1,focusVisibleClassName:c,id:s,children:u}=e;return k.jsx(Z.MenuItem,{autoFocus:r,className:o,dense:i,disableGutters:a,divider:l,focusVisibleClassName:c,onClick:n,id:s,children:t||u})}function Dt({commandHandler:e,name:n,className:t,items:r,id:o}){return k.jsxs(Z.Grid,{id:o,item:!0,xs:"auto",className:`papi-menu-column ${t??""}`,children:[k.jsx("h3",{className:`papi-menu ${t??""}`,children:n}),r.map((i,a)=>k.jsx(gt,{className:`papi-menu-item ${i.className}`,onClick:()=>{e(i)},...i},a))]})}function mt({commandHandler:e,className:n,columns:t,id:r}){return k.jsx(Z.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${n??""}`,columns:t.length,id:r,children:t.map((o,i)=>k.jsx(Dt,{commandHandler:e,name:o.name,className:n,items:o.items},i))})}function Vt({id:e,label:n,isDisabled:t=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:a="medium",className:l,onClick:c,children:s}){return k.jsx(Z.IconButton,{id:e,disabled:t,edge:i,size:a,"aria-label":n,title:o?void 0:r??n,className:`papi-icon-button ${l??""}`,onClick:c,children:s})}var Ft=Object.defineProperty,Lt=(e,n,t)=>n in e?Ft(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,A=(e,n,t)=>(Lt(e,typeof n!="symbol"?n+"":n,t),t);const Oe=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],En=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],bt=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],zn=Zt();function De(e,n=!0){return n&&(e=e.toUpperCase()),e in zn?zn[e]:0}function Cn(e){return De(e)>0}function Ut(e){const n=typeof e=="string"?De(e):e;return n>=40&&n<=66}function qt(e){return(typeof e=="string"?De(e):e)<=39}function yt(e){return e<=66}function Gt(e){const n=typeof e=="string"?De(e):e;return wt(n)&&!yt(n)}function*Wt(){for(let e=1;e<=Oe.length;e++)yield e}const Ht=1,vt=Oe.length;function Xt(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Tn(e,n="***"){const t=e-1;return t<0||t>=Oe.length?n:Oe[t]}function xt(e){return e<=0||e>vt?"******":bt[e-1]}function Yt(e){return xt(De(e))}function wt(e){const n=typeof e=="number"?Tn(e):e;return Cn(n)&&!En.includes(n)}function Kt(e){const n=typeof e=="number"?Tn(e):e;return Cn(n)&&En.includes(n)}function Jt(e){return bt[e-1].includes("*obsolete*")}function Zt(){const e={};for(let n=0;n<Oe.length;n++)e[Oe[n]]=n+1;return e}const ye={allBookIds:Oe,nonCanonicalIds:En,bookIdToNumber:De,isBookIdValid:Cn,isBookNT:Ut,isBookOT:qt,isBookOTNT:yt,isBookDC:Gt,allBookNumbers:Wt,firstBook:Ht,lastBook:vt,extraBooks:Xt,bookNumberToId:Tn,bookNumberToEnglishName:xt,bookIdToEnglishName:Yt,isCanonical:wt,isExtraMaterial:Kt,isObsolete:Jt};var we=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(we||{});const Te=class{constructor(e){if(A(this,"name"),A(this,"fullPath"),A(this,"isPresent"),A(this,"hasVerseSegments"),A(this,"isCustomized"),A(this,"baseVersification"),A(this,"scriptureBooks"),A(this,"_type"),e!=null)typeof e=="string"?this.name=e:this._type=e;else throw new Error("Argument null")}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};let ce=Te;A(ce,"Original",new Te(we.Original)),A(ce,"Septuagint",new Te(we.Septuagint)),A(ce,"Vulgate",new Te(we.Vulgate)),A(ce,"English",new Te(we.English)),A(ce,"RussianProtestant",new Te(we.RussianProtestant)),A(ce,"RussianOrthodox",new Te(we.RussianOrthodox));function Dn(e,n){const t=n[0];for(let r=1;r<n.length;r++)e=e.split(n[r]).join(t);return e.split(t)}var kt=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(kt||{});const N=class{constructor(n,t,r,o){if(A(this,"firstChapter"),A(this,"lastChapter"),A(this,"lastVerse"),A(this,"hasSegmentsDefined"),A(this,"text"),A(this,"BBBCCCVVVS"),A(this,"longHashCode"),A(this,"versification"),A(this,"rtlMark","‏"),A(this,"_bookNum",0),A(this,"_chapterNum",0),A(this,"_verseNum",0),A(this,"_verse"),r==null&&o==null)if(n!=null&&typeof n=="string"){const i=n,a=t!=null&&t instanceof ce?t:void 0;this.setEmpty(a),this.parse(i)}else if(n!=null&&typeof n=="number"){const i=t!=null&&t instanceof ce?t:void 0;this.setEmpty(i),this._verseNum=n%N.chapterDigitShifter,this._chapterNum=Math.floor(n%N.bookDigitShifter/N.chapterDigitShifter),this._bookNum=Math.floor(n/N.bookDigitShifter)}else if(t==null)if(n!=null&&n instanceof N){const i=n;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(n==null)return;const i=n instanceof ce?n:N.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(n!=null&&t!=null&&r!=null)if(typeof n=="string"&&typeof t=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(n,t,r);else if(typeof n=="number"&&typeof t=="number"&&typeof r=="number")this._bookNum=n,this._chapterNum=t,this._verseNum=r,this.versification=o??N.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(n,t=N.defaultVersification){const r=new N(t);return r.parse(n),r}static isVerseParseable(n){return n.length>0&&"0123456789".includes(n[0])&&!n.endsWith(this.verseRangeSeparator)&&!n.endsWith(this.verseSequenceIndicator)}static tryParse(n){let t;try{return t=N.parse(n),{success:!0,verseRef:t}}catch(r){if(r instanceof Ve)return t=new N,{success:!1,verseRef:t};throw r}}static getBBBCCCVVV(n,t,r){return n%N.bcvMaxValue*N.bookDigitShifter+(t>=0?t%N.bcvMaxValue*N.chapterDigitShifter:0)+(r>=0?r%N.bcvMaxValue:0)}static tryGetVerseNum(n){let t;if(!n)return t=-1,{success:!0,vNum:t};t=0;let r;for(let o=0;o<n.length;o++){if(r=n[o],r<"0"||r>"9")return o===0&&(t=-1),{success:!1,vNum:t};if(t=t*10+ +r-+"0",t>N.bcvMaxValue)return t=-1,{success:!1,vNum:t}}return{success:!0,vNum:t}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(N.verseRangeSeparator)||this._verse.includes(N.verseSequenceIndicator))}get book(){return ye.bookNumberToId(this.bookNum,"")}set book(n){this.bookNum=ye.bookIdToNumber(n)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(n){const t=+n;this._chapterNum=Number.isInteger(t)?t:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(n){const{success:t,vNum:r}=N.tryGetVerseNum(n);this._verse=t?void 0:n.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=N.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(n){if(n<=0||n>ye.lastBook)throw new Ve("BookNum must be greater than zero and less than or equal to last book");this._bookNum=n}get chapterNum(){return this._chapterNum}set chapterNum(n){this.chapterNum=n}get verseNum(){return this._verseNum}set verseNum(n){this._verseNum=n}get versificationStr(){var n;return(n=this.versification)==null?void 0:n.name}set versificationStr(n){this.versification=this.versification!=null?new ce(n):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(N.verseRangeSeparators,N.verseSequenceIndicators)}get BBBCCC(){return N.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return N.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(n){if(n=n.replace(this.rtlMark,""),n.includes("/")){const i=n.split("/");if(n=i[0],i.length>1)try{const a=+i[1].trim();this.versification=new ce(we[a])}catch{throw new Ve("Invalid reference : "+n)}}const t=n.trim().split(" ");if(t.length!==2)throw new Ve("Invalid reference : "+n);const r=t[1].split(":"),o=+r[0];if(r.length!==2||ye.bookIdToNumber(t[0])===0||!Number.isInteger(o)||o<0||!N.isVerseParseable(r[1]))throw new Ve("Invalid reference : "+n);this.updateInternal(t[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new N(this)}toString(){const n=this.book;return n===""?"":`${n} ${this.chapter}:${this.verse}`}equals(n){return n._bookNum===this._bookNum&&n._chapterNum===this._chapterNum&&n._verseNum===this._verseNum&&n._verse===this._verse&&n.versification!=null&&this.versification!=null&&n.versification.equals(this.versification)}allVerses(n=!1,t=N.verseRangeSeparators,r=N.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=Dn(this._verse,r);for(const a of i.map(l=>Dn(l,t))){const l=this.clone();l.verse=a[0];const c=l.verseNum;if(o.push(l),a.length>1){const s=this.clone();if(s.verse=a[1],!n)for(let u=c+1;u<s.verseNum;u++){const p=new N(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||o.push(p)}o.push(s)}}return o}validateVerse(n,t){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,n,t)){const i=o.internalValid;if(i!==0)return i;const a=o.BBBCCCVVV;if(r>a)return 3;if(r===a)return 4;r=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ye.lastBook?2:0}setEmpty(n=N.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=n}updateInternal(n,t,r){this.bookNum=ye.bookIdToNumber(n),this.chapter=t,this.verse=r}};let be=N;A(be,"defaultVersification",ce.English),A(be,"verseRangeSeparator","-"),A(be,"verseSequenceIndicator",","),A(be,"verseRangeSeparators",[N.verseRangeSeparator]),A(be,"verseSequenceIndicators",[N.verseSequenceIndicator]),A(be,"chapterDigitShifter",1e3),A(be,"bookDigitShifter",N.chapterDigitShifter*N.chapterDigitShifter),A(be,"bcvMaxValue",N.chapterDigitShifter-1),A(be,"ValidStatusType",kt);class Ve extends Error{}function qe({variant:e="outlined",id:n,isDisabled:t=!1,hasError:r=!1,isFullWidth:o=!1,helperText:i,label:a,placeholder:l,isRequired:c=!1,className:s,defaultValue:u,value:p,onChange:d,onFocus:v,onBlur:b}){return k.jsx(Z.TextField,{variant:e,id:n,disabled:t,error:r,fullWidth:o,helperText:i,label:a,placeholder:l,required:c,className:`papi-textfield ${s??""}`,defaultValue:u,value:p,onChange:d,onFocus:v,onBlur:b})}let dn;const fn=()=>(dn||(dn=ye.allBookIds.map(e=>({bookId:e,label:ye.bookIdToEnglishName(e)}))),dn);function Qt({scrRef:e,handleSubmit:n,id:t}){const r=c=>{n(c)},o=(c,s)=>{const p={bookNum:ye.bookIdToNumber(s.bookId),chapterNum:1,verseNum:1};r(p)},i=c=>{n({...e,chapterNum:+c.target.value})},a=c=>{n({...e,verseNum:+c.target.value})},l=Y.useMemo(()=>fn()[e.bookNum-1],[e.bookNum]);return k.jsxs("span",{id:t,children:[k.jsx(Ze,{title:"Book",className:"papi-ref-selector book",value:l,options:fn(),onChange:o,isClearable:!1,width:200}),k.jsx(Ce,{onClick:()=>r(ge.offsetBook(e,-1)),isDisabled:e.bookNum<=ge.FIRST_SCR_BOOK_NUM,children:"<"}),k.jsx(Ce,{onClick:()=>r(ge.offsetBook(e,1)),isDisabled:e.bookNum>=fn().length,children:">"}),k.jsx(qe,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),k.jsx(Ce,{onClick:()=>n(ge.offsetChapter(e,-1)),isDisabled:e.chapterNum<=ge.FIRST_SCR_CHAPTER_NUM,children:"<"}),k.jsx(Ce,{onClick:()=>n(ge.offsetChapter(e,1)),isDisabled:e.chapterNum>=ge.getChaptersForBook(e.bookNum),children:">"}),k.jsx(qe,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:a}),k.jsx(Ce,{onClick:()=>n(ge.offsetVerse(e,-1)),isDisabled:e.verseNum<=ge.FIRST_SCR_VERSE_NUM,children:"<"}),k.jsx(Ce,{onClick:()=>n(ge.offsetVerse(e,1)),children:">"})]})}function er({onSearch:e,placeholder:n,isFullWidth:t}){const[r,o]=Y.useState(""),i=a=>{o(a),e(a)};return k.jsx(Z.Paper,{component:"form",className:"search-bar-paper",children:k.jsx(qe,{isFullWidth:t,className:"search-bar-input",placeholder:n,value:r,onChange:a=>i(a.target.value)})})}function nr({id:e,isDisabled:n=!1,orientation:t="horizontal",min:r=0,max:o=100,step:i=1,showMarks:a=!1,defaultValue:l,value:c,valueLabelDisplay:s="off",className:u,onChange:p,onChangeCommitted:d}){return k.jsx(Z.Slider,{id:e,disabled:n,orientation:t,min:r,max:o,step:i,marks:a,defaultValue:l,value:c,valueLabelDisplay:s,className:`papi-slider ${t} ${u??""}`,onChange:p,onChangeCommitted:d})}function tr({autoHideDuration:e=void 0,id:n,isOpen:t=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:a,children:l}){const c={action:(a==null?void 0:a.action)||l,message:a==null?void 0:a.message,className:r};return k.jsx(Z.Snackbar,{autoHideDuration:e??void 0,open:t,onClose:o,anchorOrigin:i,id:n,ContentProps:c})}function rr({id:e,isChecked:n,isDisabled:t=!1,hasError:r=!1,className:o,onChange:i}){return k.jsx(Z.Switch,{id:e,checked:n,disabled:t,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function Vn({onRowChange:e,row:n,column:t}){const r=o=>{e({...n,[t.key]:o.target.value})};return k.jsx(qe,{defaultValue:n[t.key],onChange:r})}const or=({onChange:e,disabled:n,checked:t,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return k.jsx(ht,{...r,isChecked:t,isDisabled:n,onChange:o})};function ir({columns:e,sortColumns:n,onSortColumnsChange:t,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:a,defaultColumnSortable:l=!0,defaultColumnResizable:c=!0,rows:s,enableSelectColumn:u,selectColumnWidth:p=50,rowKeyGetter:d,rowHeight:v=35,headerRowHeight:b=35,selectedRows:h,onSelectedRowsChange:f,onRowsChange:S,onCellClick:J,onCellDoubleClick:B,onCellContextMenu:C,onCellKeyDown:g,direction:ne="ltr",enableVirtualization:oe=!0,onCopy:he,onPaste:de,onScroll:T,className:G,id:ee}){const ie=Y.useMemo(()=>{const Q=e.map(W=>typeof W.editable=="function"?{...W,editable:fe=>!!W.editable(fe),renderEditCell:W.renderEditCell||Vn}:W.editable&&!W.renderEditCell?{...W,renderEditCell:Vn}:W.renderEditCell&&!W.editable?{...W,editable:!1}:W);return u?[{...Bn.SelectColumn,minWidth:p},...Q]:Q},[e,u,p]);return k.jsx(Bn,{columns:ie,defaultColumnOptions:{width:o,minWidth:i,maxWidth:a,sortable:l,resizable:c},sortColumns:n,onSortColumnsChange:t,onColumnResize:r,rows:s,rowKeyGetter:d,rowHeight:v,headerRowHeight:b,selectedRows:h,onSelectedRowsChange:f,onRowsChange:S,onCellClick:J,onCellDoubleClick:B,onCellContextMenu:C,onCellKeyDown:g,direction:ne,enableVirtualization:oe,onCopy:he,onPaste:de,onScroll:T,renderers:{renderCheckbox:or},className:G??"rdg-light",id:ee})}function j(){return j=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},j.apply(this,arguments)}function ke(e){if(typeof e!="object"||e===null)return!1;const n=Object.getPrototypeOf(e);return(n===null||n===Object.prototype||Object.getPrototypeOf(n)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function St(e){if(!ke(e))return e;const n={};return Object.keys(e).forEach(t=>{n[t]=St(e[t])}),n}function pe(e,n,t={clone:!0}){const r=t.clone?j({},e):e;return ke(e)&&ke(n)&&Object.keys(n).forEach(o=>{o!=="__proto__"&&(ke(n[o])&&o in e&&ke(e[o])?r[o]=pe(e[o],n[o],t):t.clone?r[o]=ke(n[o])?St(n[o]):n[o]:r[o]=n[o])}),r}function ar(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var kn={exports:{}},Ye={exports:{}},D={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fn;function sr(){if(Fn)return D;Fn=1;var e=typeof Symbol=="function"&&Symbol.for,n=e?Symbol.for("react.element"):60103,t=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,s=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,b=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,f=e?Symbol.for("react.fundamental"):60117,S=e?Symbol.for("react.responder"):60118,J=e?Symbol.for("react.scope"):60119;function B(g){if(typeof g=="object"&&g!==null){var ne=g.$$typeof;switch(ne){case n:switch(g=g.type,g){case c:case s:case r:case i:case o:case p:return g;default:switch(g=g&&g.$$typeof,g){case l:case u:case b:case v:case a:return g;default:return ne}}case t:return ne}}}function C(g){return B(g)===s}return D.AsyncMode=c,D.ConcurrentMode=s,D.ContextConsumer=l,D.ContextProvider=a,D.Element=n,D.ForwardRef=u,D.Fragment=r,D.Lazy=b,D.Memo=v,D.Portal=t,D.Profiler=i,D.StrictMode=o,D.Suspense=p,D.isAsyncMode=function(g){return C(g)||B(g)===c},D.isConcurrentMode=C,D.isContextConsumer=function(g){return B(g)===l},D.isContextProvider=function(g){return B(g)===a},D.isElement=function(g){return typeof g=="object"&&g!==null&&g.$$typeof===n},D.isForwardRef=function(g){return B(g)===u},D.isFragment=function(g){return B(g)===r},D.isLazy=function(g){return B(g)===b},D.isMemo=function(g){return B(g)===v},D.isPortal=function(g){return B(g)===t},D.isProfiler=function(g){return B(g)===i},D.isStrictMode=function(g){return B(g)===o},D.isSuspense=function(g){return B(g)===p},D.isValidElementType=function(g){return typeof g=="string"||typeof g=="function"||g===r||g===s||g===i||g===o||g===p||g===d||typeof g=="object"&&g!==null&&(g.$$typeof===b||g.$$typeof===v||g.$$typeof===a||g.$$typeof===l||g.$$typeof===u||g.$$typeof===f||g.$$typeof===S||g.$$typeof===J||g.$$typeof===h)},D.typeOf=B,D}var V={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ln;function cr(){return Ln||(Ln=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,n=e?Symbol.for("react.element"):60103,t=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,s=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,b=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,f=e?Symbol.for("react.fundamental"):60117,S=e?Symbol.for("react.responder"):60118,J=e?Symbol.for("react.scope"):60119;function B(y){return typeof y=="string"||typeof y=="function"||y===r||y===s||y===i||y===o||y===p||y===d||typeof y=="object"&&y!==null&&(y.$$typeof===b||y.$$typeof===v||y.$$typeof===a||y.$$typeof===l||y.$$typeof===u||y.$$typeof===f||y.$$typeof===S||y.$$typeof===J||y.$$typeof===h)}function C(y){if(typeof y=="object"&&y!==null){var se=y.$$typeof;switch(se){case n:var w=y.type;switch(w){case c:case s:case r:case i:case o:case p:return w;default:var $e=w&&w.$$typeof;switch($e){case l:case u:case b:case v:case a:return $e;default:return se}}case t:return se}}}var g=c,ne=s,oe=l,he=a,de=n,T=u,G=r,ee=b,ie=v,Q=t,W=i,re=o,fe=p,Ee=!1;function Re(y){return Ee||(Ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),m(y)||C(y)===c}function m(y){return C(y)===s}function x(y){return C(y)===l}function $(y){return C(y)===a}function O(y){return typeof y=="object"&&y!==null&&y.$$typeof===n}function E(y){return C(y)===u}function P(y){return C(y)===r}function _(y){return C(y)===b}function R(y){return C(y)===v}function I(y){return C(y)===t}function z(y){return C(y)===i}function M(y){return C(y)===o}function te(y){return C(y)===p}V.AsyncMode=g,V.ConcurrentMode=ne,V.ContextConsumer=oe,V.ContextProvider=he,V.Element=de,V.ForwardRef=T,V.Fragment=G,V.Lazy=ee,V.Memo=ie,V.Portal=Q,V.Profiler=W,V.StrictMode=re,V.Suspense=fe,V.isAsyncMode=Re,V.isConcurrentMode=m,V.isContextConsumer=x,V.isContextProvider=$,V.isElement=O,V.isForwardRef=E,V.isFragment=P,V.isLazy=_,V.isMemo=R,V.isPortal=I,V.isProfiler=z,V.isStrictMode=M,V.isSuspense=te,V.isValidElementType=B,V.typeOf=C}()),V}var Un;function Et(){return Un||(Un=1,process.env.NODE_ENV==="production"?Ye.exports=sr():Ye.exports=cr()),Ye.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var pn,qn;function lr(){if(qn)return pn;qn=1;var e=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var a={},l=0;l<10;l++)a["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(a).map(function(u){return a[u]});if(c.join("")!=="0123456789")return!1;var s={};return"abcdefghijklmnopqrst".split("").forEach(function(u){s[u]=u}),Object.keys(Object.assign({},s)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return pn=o()?Object.assign:function(i,a){for(var l,c=r(i),s,u=1;u<arguments.length;u++){l=Object(arguments[u]);for(var p in l)n.call(l,p)&&(c[p]=l[p]);if(e){s=e(l);for(var d=0;d<s.length;d++)t.call(l,s[d])&&(c[s[d]]=l[s[d]])}}return c},pn}var hn,Gn;function _n(){if(Gn)return hn;Gn=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return hn=e,hn}var gn,Wn;function Ct(){return Wn||(Wn=1,gn=Function.call.bind(Object.prototype.hasOwnProperty)),gn}var mn,Hn;function ur(){if(Hn)return mn;Hn=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var n=_n(),t={},r=Ct();e=function(i){var a="Warning: "+i;typeof console<"u"&&console.error(a);try{throw new Error(a)}catch{}}}function o(i,a,l,c,s){if(process.env.NODE_ENV!=="production"){for(var u in i)if(r(i,u)){var p;try{if(typeof i[u]!="function"){var d=Error((c||"React class")+": "+l+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw d.name="Invariant Violation",d}p=i[u](a,u,c,l,null,n)}catch(b){p=b}if(p&&!(p instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+u+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof p+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),p instanceof Error&&!(p.message in t)){t[p.message]=!0;var v=s?s():"";e("Failed "+l+" type: "+p.message+(v??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(t={})},mn=o,mn}var bn,Xn;function dr(){if(Xn)return bn;Xn=1;var e=Et(),n=lr(),t=_n(),r=Ct(),o=ur(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function a(){return null}return bn=function(l,c){var s=typeof Symbol=="function"&&Symbol.iterator,u="@@iterator";function p(m){var x=m&&(s&&m[s]||m[u]);if(typeof x=="function")return x}var d="<<anonymous>>",v={array:S("array"),bigint:S("bigint"),bool:S("boolean"),func:S("function"),number:S("number"),object:S("object"),string:S("string"),symbol:S("symbol"),any:J(),arrayOf:B,element:C(),elementType:g(),instanceOf:ne,node:T(),objectOf:he,oneOf:oe,oneOfType:de,shape:ee,exact:ie};function b(m,x){return m===x?m!==0||1/m===1/x:m!==m&&x!==x}function h(m,x){this.message=m,this.data=x&&typeof x=="object"?x:{},this.stack=""}h.prototype=Error.prototype;function f(m){if(process.env.NODE_ENV!=="production")var x={},$=0;function O(P,_,R,I,z,M,te){if(I=I||d,M=M||R,te!==t){if(c){var y=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw y.name="Invariant Violation",y}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var se=I+":"+R;!x[se]&&$<3&&(i("You are manually calling a React.PropTypes validation function for the `"+M+"` prop on `"+I+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),x[se]=!0,$++)}}return _[R]==null?P?_[R]===null?new h("The "+z+" `"+M+"` is marked as required "+("in `"+I+"`, but its value is `null`.")):new h("The "+z+" `"+M+"` is marked as required in "+("`"+I+"`, but its value is `undefined`.")):null:m(_,R,I,z,M)}var E=O.bind(null,!1);return E.isRequired=O.bind(null,!0),E}function S(m){function x($,O,E,P,_,R){var I=$[O],z=re(I);if(z!==m){var M=fe(I);return new h("Invalid "+P+" `"+_+"` of type "+("`"+M+"` supplied to `"+E+"`, expected ")+("`"+m+"`."),{expectedType:m})}return null}return f(x)}function J(){return f(a)}function B(m){function x($,O,E,P,_){if(typeof m!="function")return new h("Property `"+_+"` of component `"+E+"` has invalid PropType notation inside arrayOf.");var R=$[O];if(!Array.isArray(R)){var I=re(R);return new h("Invalid "+P+" `"+_+"` of type "+("`"+I+"` supplied to `"+E+"`, expected an array."))}for(var z=0;z<R.length;z++){var M=m(R,z,E,P,_+"["+z+"]",t);if(M instanceof Error)return M}return null}return f(x)}function C(){function m(x,$,O,E,P){var _=x[$];if(!l(_)){var R=re(_);return new h("Invalid "+E+" `"+P+"` of type "+("`"+R+"` supplied to `"+O+"`, expected a single ReactElement."))}return null}return f(m)}function g(){function m(x,$,O,E,P){var _=x[$];if(!e.isValidElementType(_)){var R=re(_);return new h("Invalid "+E+" `"+P+"` of type "+("`"+R+"` supplied to `"+O+"`, expected a single ReactElement type."))}return null}return f(m)}function ne(m){function x($,O,E,P,_){if(!($[O]instanceof m)){var R=m.name||d,I=Re($[O]);return new h("Invalid "+P+" `"+_+"` of type "+("`"+I+"` supplied to `"+E+"`, expected ")+("instance of `"+R+"`."))}return null}return f(x)}function oe(m){if(!Array.isArray(m))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),a;function x($,O,E,P,_){for(var R=$[O],I=0;I<m.length;I++)if(b(R,m[I]))return null;var z=JSON.stringify(m,function(te,y){var se=fe(y);return se==="symbol"?String(y):y});return new h("Invalid "+P+" `"+_+"` of value `"+String(R)+"` "+("supplied to `"+E+"`, expected one of "+z+"."))}return f(x)}function he(m){function x($,O,E,P,_){if(typeof m!="function")return new h("Property `"+_+"` of component `"+E+"` has invalid PropType notation inside objectOf.");var R=$[O],I=re(R);if(I!=="object")return new h("Invalid "+P+" `"+_+"` of type "+("`"+I+"` supplied to `"+E+"`, expected an object."));for(var z in R)if(r(R,z)){var M=m(R,z,E,P,_+"."+z,t);if(M instanceof Error)return M}return null}return f(x)}function de(m){if(!Array.isArray(m))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),a;for(var x=0;x<m.length;x++){var $=m[x];if(typeof $!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+Ee($)+" at index "+x+"."),a}function O(E,P,_,R,I){for(var z=[],M=0;M<m.length;M++){var te=m[M],y=te(E,P,_,R,I,t);if(y==null)return null;y.data&&r(y.data,"expectedType")&&z.push(y.data.expectedType)}var se=z.length>0?", expected one of type ["+z.join(", ")+"]":"";return new h("Invalid "+R+" `"+I+"` supplied to "+("`"+_+"`"+se+"."))}return f(O)}function T(){function m(x,$,O,E,P){return Q(x[$])?null:new h("Invalid "+E+" `"+P+"` supplied to "+("`"+O+"`, expected a ReactNode."))}return f(m)}function G(m,x,$,O,E){return new h((m||"React class")+": "+x+" type `"+$+"."+O+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+E+"`.")}function ee(m){function x($,O,E,P,_){var R=$[O],I=re(R);if(I!=="object")return new h("Invalid "+P+" `"+_+"` of type `"+I+"` "+("supplied to `"+E+"`, expected `object`."));for(var z in m){var M=m[z];if(typeof M!="function")return G(E,P,_,z,fe(M));var te=M(R,z,E,P,_+"."+z,t);if(te)return te}return null}return f(x)}function ie(m){function x($,O,E,P,_){var R=$[O],I=re(R);if(I!=="object")return new h("Invalid "+P+" `"+_+"` of type `"+I+"` "+("supplied to `"+E+"`, expected `object`."));var z=n({},$[O],m);for(var M in z){var te=m[M];if(r(m,M)&&typeof te!="function")return G(E,P,_,M,fe(te));if(!te)return new h("Invalid "+P+" `"+_+"` key `"+M+"` supplied to `"+E+"`.\nBad object: "+JSON.stringify($[O],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(m),null,"  "));var y=te(R,M,E,P,_+"."+M,t);if(y)return y}return null}return f(x)}function Q(m){switch(typeof m){case"number":case"string":case"undefined":return!0;case"boolean":return!m;case"object":if(Array.isArray(m))return m.every(Q);if(m===null||l(m))return!0;var x=p(m);if(x){var $=x.call(m),O;if(x!==m.entries){for(;!(O=$.next()).done;)if(!Q(O.value))return!1}else for(;!(O=$.next()).done;){var E=O.value;if(E&&!Q(E[1]))return!1}}else return!1;return!0;default:return!1}}function W(m,x){return m==="symbol"?!0:x?x["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&x instanceof Symbol:!1}function re(m){var x=typeof m;return Array.isArray(m)?"array":m instanceof RegExp?"object":W(x,m)?"symbol":x}function fe(m){if(typeof m>"u"||m===null)return""+m;var x=re(m);if(x==="object"){if(m instanceof Date)return"date";if(m instanceof RegExp)return"regexp"}return x}function Ee(m){var x=fe(m);switch(x){case"array":case"object":return"an "+x;case"boolean":case"date":case"regexp":return"a "+x;default:return x}}function Re(m){return!m.constructor||!m.constructor.name?d:m.constructor.name}return v.checkPropTypes=o,v.resetWarningCache=o.resetWarningCache,v.PropTypes=v,v},bn}var yn,Yn;function fr(){if(Yn)return yn;Yn=1;var e=_n();function n(){}function t(){}return t.resetWarningCache=n,yn=function(){function r(a,l,c,s,u,p){if(p!==e){var d=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw d.name="Invariant Violation",d}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:t,resetWarningCache:n};return i.PropTypes=i,i},yn}if(process.env.NODE_ENV!=="production"){var pr=Et(),hr=!0;kn.exports=dr()(pr.isElement,hr)}else kn.exports=fr()();var gr=kn.exports;const U=ar(gr);function Be(e){let n="https://mui.com/production-error/?code="+e;for(let t=1;t<arguments.length;t+=1)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified MUI error #"+e+"; visit "+n+" for the full message."}var Sn={exports:{}},F={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Kn;function mr(){if(Kn)return F;Kn=1;var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),s=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),b;b=Symbol.for("react.module.reference");function h(f){if(typeof f=="object"&&f!==null){var S=f.$$typeof;switch(S){case e:switch(f=f.type,f){case t:case o:case r:case s:case u:return f;default:switch(f=f&&f.$$typeof,f){case l:case a:case c:case d:case p:case i:return f;default:return S}}case n:return S}}}return F.ContextConsumer=a,F.ContextProvider=i,F.Element=e,F.ForwardRef=c,F.Fragment=t,F.Lazy=d,F.Memo=p,F.Portal=n,F.Profiler=o,F.StrictMode=r,F.Suspense=s,F.SuspenseList=u,F.isAsyncMode=function(){return!1},F.isConcurrentMode=function(){return!1},F.isContextConsumer=function(f){return h(f)===a},F.isContextProvider=function(f){return h(f)===i},F.isElement=function(f){return typeof f=="object"&&f!==null&&f.$$typeof===e},F.isForwardRef=function(f){return h(f)===c},F.isFragment=function(f){return h(f)===t},F.isLazy=function(f){return h(f)===d},F.isMemo=function(f){return h(f)===p},F.isPortal=function(f){return h(f)===n},F.isProfiler=function(f){return h(f)===o},F.isStrictMode=function(f){return h(f)===r},F.isSuspense=function(f){return h(f)===s},F.isSuspenseList=function(f){return h(f)===u},F.isValidElementType=function(f){return typeof f=="string"||typeof f=="function"||f===t||f===o||f===r||f===s||f===u||f===v||typeof f=="object"&&f!==null&&(f.$$typeof===d||f.$$typeof===p||f.$$typeof===i||f.$$typeof===a||f.$$typeof===c||f.$$typeof===b||f.getModuleId!==void 0)},F.typeOf=h,F}var L={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Jn;function br(){return Jn||(Jn=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),s=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),b=!1,h=!1,f=!1,S=!1,J=!1,B;B=Symbol.for("react.module.reference");function C(w){return!!(typeof w=="string"||typeof w=="function"||w===t||w===o||J||w===r||w===s||w===u||S||w===v||b||h||f||typeof w=="object"&&w!==null&&(w.$$typeof===d||w.$$typeof===p||w.$$typeof===i||w.$$typeof===a||w.$$typeof===c||w.$$typeof===B||w.getModuleId!==void 0))}function g(w){if(typeof w=="object"&&w!==null){var $e=w.$$typeof;switch($e){case e:var Xe=w.type;switch(Xe){case t:case o:case r:case s:case u:return Xe;default:var jn=Xe&&Xe.$$typeof;switch(jn){case l:case a:case c:case d:case p:case i:return jn;default:return $e}}case n:return $e}}}var ne=a,oe=i,he=e,de=c,T=t,G=d,ee=p,ie=n,Q=o,W=r,re=s,fe=u,Ee=!1,Re=!1;function m(w){return Ee||(Ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function x(w){return Re||(Re=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function $(w){return g(w)===a}function O(w){return g(w)===i}function E(w){return typeof w=="object"&&w!==null&&w.$$typeof===e}function P(w){return g(w)===c}function _(w){return g(w)===t}function R(w){return g(w)===d}function I(w){return g(w)===p}function z(w){return g(w)===n}function M(w){return g(w)===o}function te(w){return g(w)===r}function y(w){return g(w)===s}function se(w){return g(w)===u}L.ContextConsumer=ne,L.ContextProvider=oe,L.Element=he,L.ForwardRef=de,L.Fragment=T,L.Lazy=G,L.Memo=ee,L.Portal=ie,L.Profiler=Q,L.StrictMode=W,L.Suspense=re,L.SuspenseList=fe,L.isAsyncMode=m,L.isConcurrentMode=x,L.isContextConsumer=$,L.isContextProvider=O,L.isElement=E,L.isForwardRef=P,L.isFragment=_,L.isLazy=R,L.isMemo=I,L.isPortal=z,L.isProfiler=M,L.isStrictMode=te,L.isSuspense=y,L.isSuspenseList=se,L.isValidElementType=C,L.typeOf=g}()),L}process.env.NODE_ENV==="production"?Sn.exports=mr():Sn.exports=br();var Zn=Sn.exports;const yr=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function vr(e){const n=`${e}`.match(yr);return n&&n[1]||""}function Tt(e,n=""){return e.displayName||e.name||vr(e)||n}function Qn(e,n,t){const r=Tt(n);return e.displayName||(r!==""?`${t}(${r})`:t)}function xr(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Tt(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Zn.ForwardRef:return Qn(e,e.render,"ForwardRef");case Zn.Memo:return Qn(e,e.type,"memo");default:return}}}function me(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Be(7));return e.charAt(0).toUpperCase()+e.slice(1)}function _t(e,n){const t=j({},n);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))t[r]=j({},e[r],t[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=n[r];t[r]={},!i||!Object.keys(i)?t[r]=o:!o||!Object.keys(o)?t[r]=i:(t[r]=j({},i),Object.keys(o).forEach(a=>{t[r][a]=_t(o[a],i[a])}))}else t[r]===void 0&&(t[r]=e[r])}),t}function wr(e,n,t=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,a)=>{if(a){const l=n(a);l!==""&&i.push(l),t&&t[a]&&i.push(t[a])}return i},[]).join(" ")}),r}const et=e=>e,kr=()=>{let e=et;return{configure(n){e=n},generate(n){return e(n)},reset(){e=et}}},Sr=kr(),Er=Sr,Cr={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function On(e,n,t="Mui"){const r=Cr[n];return r?`${t}-${r}`:`${Er.generate(e)}-${n}`}function Tr(e,n,t="Mui"){const r={};return n.forEach(o=>{r[o]=On(e,o,t)}),r}function _r(e,n=Number.MIN_SAFE_INTEGER,t=Number.MAX_SAFE_INTEGER){return Math.max(n,Math.min(e,t))}function xe(e,n){if(e==null)return{};var t={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(n.indexOf(o)>=0)&&(t[o]=e[o]);return t}function Ot(e){var n,t,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(n=0;n<o;n++)e[n]&&(t=Ot(e[n]))&&(r&&(r+=" "),r+=t)}else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function Or(){for(var e,n,t=0,r="",o=arguments.length;t<o;t++)(e=arguments[t])&&(n=Ot(e))&&(r&&(r+=" "),r+=n);return r}const Rr=["values","unit","step"],$r=e=>{const n=Object.keys(e).map(t=>({key:t,val:e[t]}))||[];return n.sort((t,r)=>t.val-r.val),n.reduce((t,r)=>j({},t,{[r.key]:r.val}),{})};function Nr(e){const{values:n={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:t="px",step:r=5}=e,o=xe(e,Rr),i=$r(n),a=Object.keys(i);function l(d){return`@media (min-width:${typeof n[d]=="number"?n[d]:d}${t})`}function c(d){return`@media (max-width:${(typeof n[d]=="number"?n[d]:d)-r/100}${t})`}function s(d,v){const b=a.indexOf(v);return`@media (min-width:${typeof n[d]=="number"?n[d]:d}${t}) and (max-width:${(b!==-1&&typeof n[a[b]]=="number"?n[a[b]]:v)-r/100}${t})`}function u(d){return a.indexOf(d)+1<a.length?s(d,a[a.indexOf(d)+1]):l(d)}function p(d){const v=a.indexOf(d);return v===0?l(a[1]):v===a.length-1?c(a[v]):s(d,a[a.indexOf(d)+1]).replace("@media","@media not all and")}return j({keys:a,values:i,up:l,down:c,between:s,only:u,not:p,unit:t},o)}const Ar={borderRadius:4},Pr=Ar,Ir=process.env.NODE_ENV!=="production"?U.oneOfType([U.number,U.string,U.object,U.array]):{},Se=Ir;function Le(e,n){return n?pe(e,n,{clone:!1}):e}const Rn={xs:0,sm:600,md:900,lg:1200,xl:1536},nt={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Rn[e]}px)`};function ve(e,n,t){const r=e.theme||{};if(Array.isArray(n)){const i=r.breakpoints||nt;return n.reduce((a,l,c)=>(a[i.up(i.keys[c])]=t(n[c]),a),{})}if(typeof n=="object"){const i=r.breakpoints||nt;return Object.keys(n).reduce((a,l)=>{if(Object.keys(i.values||Rn).indexOf(l)!==-1){const c=i.up(l);a[c]=t(n[l],l)}else{const c=l;a[c]=n[c]}return a},{})}return t(n)}function Mr(e={}){var n;return((n=e.keys)==null?void 0:n.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function jr(e,n){return e.reduce((t,r)=>{const o=t[r];return(!o||Object.keys(o).length===0)&&delete t[r],t},n)}function tn(e,n,t=!0){if(!n||typeof n!="string")return null;if(e&&e.vars&&t){const r=`vars.${n}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return n.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function Qe(e,n,t,r=t){let o;return typeof e=="function"?o=e(t):Array.isArray(e)?o=e[t]||r:o=tn(e,t)||r,n&&(o=n(o,r,e)),o}function K(e){const{prop:n,cssProperty:t=e.prop,themeKey:r,transform:o}=e,i=a=>{if(a[n]==null)return null;const l=a[n],c=a.theme,s=tn(c,r)||{};return ve(a,l,p=>{let d=Qe(s,o,p);return p===d&&typeof p=="string"&&(d=Qe(s,o,`${n}${p==="default"?"":me(p)}`,p)),t===!1?d:{[t]:d}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[n]:Se}:{},i.filterProps=[n],i}function Br(e){const n={};return t=>(n[t]===void 0&&(n[t]=e(t)),n[t])}const zr={m:"margin",p:"padding"},Dr={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},tt={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Vr=Br(e=>{if(e.length>2)if(tt[e])e=tt[e];else return[e];const[n,t]=e.split(""),r=zr[n],o=Dr[t]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),rn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],on=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Fr=[...rn,...on];function We(e,n,t,r){var o;const i=(o=tn(e,n,!1))!=null?o:t;return typeof i=="number"?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&typeof a!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`),i*a):Array.isArray(i)?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&(Number.isInteger(a)?a>i.length-1&&console.error([`MUI: The value provided (${a}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${a} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${n}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${n}\` as a number.`].join(`
`))),i[a]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${n}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Rt(e){return We(e,"spacing",8,"spacing")}function He(e,n){if(typeof n=="string"||n==null)return n;const t=Math.abs(n),r=e(t);return n>=0?r:typeof r=="number"?-r:`-${r}`}function Lr(e,n){return t=>e.reduce((r,o)=>(r[o]=He(n,t),r),{})}function Ur(e,n,t,r){if(n.indexOf(t)===-1)return null;const o=Vr(t),i=Lr(o,r),a=e[t];return ve(e,a,i)}function $t(e,n){const t=Rt(e.theme);return Object.keys(e).map(r=>Ur(e,n,r,t)).reduce(Le,{})}function H(e){return $t(e,rn)}H.propTypes=process.env.NODE_ENV!=="production"?rn.reduce((e,n)=>(e[n]=Se,e),{}):{};H.filterProps=rn;function X(e){return $t(e,on)}X.propTypes=process.env.NODE_ENV!=="production"?on.reduce((e,n)=>(e[n]=Se,e),{}):{};X.filterProps=on;process.env.NODE_ENV!=="production"&&Fr.reduce((e,n)=>(e[n]=Se,e),{});function qr(e=8){if(e.mui)return e;const n=Rt({spacing:e}),t=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const a=n(i);return typeof a=="number"?`${a}px`:a}).join(" "));return t.mui=!0,t}function an(...e){const n=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),t=r=>Object.keys(r).reduce((o,i)=>n[i]?Le(o,n[i](r)):o,{});return t.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},t.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),t}function le(e){return typeof e!="number"?e:`${e}px solid`}function ue(e,n){return K({prop:e,themeKey:"borders",transform:n})}const Gr=ue("border",le),Wr=ue("borderTop",le),Hr=ue("borderRight",le),Xr=ue("borderBottom",le),Yr=ue("borderLeft",le),Kr=ue("borderColor"),Jr=ue("borderTopColor"),Zr=ue("borderRightColor"),Qr=ue("borderBottomColor"),eo=ue("borderLeftColor"),no=ue("outline",le),to=ue("outlineColor"),sn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const n=We(e.theme,"shape.borderRadius",4,"borderRadius"),t=r=>({borderRadius:He(n,r)});return ve(e,e.borderRadius,t)}return null};sn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:Se}:{};sn.filterProps=["borderRadius"];an(Gr,Wr,Hr,Xr,Yr,Kr,Jr,Zr,Qr,eo,sn,no,to);const cn=e=>{if(e.gap!==void 0&&e.gap!==null){const n=We(e.theme,"spacing",8,"gap"),t=r=>({gap:He(n,r)});return ve(e,e.gap,t)}return null};cn.propTypes=process.env.NODE_ENV!=="production"?{gap:Se}:{};cn.filterProps=["gap"];const ln=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const n=We(e.theme,"spacing",8,"columnGap"),t=r=>({columnGap:He(n,r)});return ve(e,e.columnGap,t)}return null};ln.propTypes=process.env.NODE_ENV!=="production"?{columnGap:Se}:{};ln.filterProps=["columnGap"];const un=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const n=We(e.theme,"spacing",8,"rowGap"),t=r=>({rowGap:He(n,r)});return ve(e,e.rowGap,t)}return null};un.propTypes=process.env.NODE_ENV!=="production"?{rowGap:Se}:{};un.filterProps=["rowGap"];const ro=K({prop:"gridColumn"}),oo=K({prop:"gridRow"}),io=K({prop:"gridAutoFlow"}),ao=K({prop:"gridAutoColumns"}),so=K({prop:"gridAutoRows"}),co=K({prop:"gridTemplateColumns"}),lo=K({prop:"gridTemplateRows"}),uo=K({prop:"gridTemplateAreas"}),fo=K({prop:"gridArea"});an(cn,ln,un,ro,oo,io,ao,so,co,lo,uo,fo);function je(e,n){return n==="grey"?n:e}const po=K({prop:"color",themeKey:"palette",transform:je}),ho=K({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:je}),go=K({prop:"backgroundColor",themeKey:"palette",transform:je});an(po,ho,go);function ae(e){return e<=1&&e!==0?`${e*100}%`:e}const mo=K({prop:"width",transform:ae}),$n=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const n=t=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[t])||Rn[t];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:ae(t)}};return ve(e,e.maxWidth,n)}return null};$n.filterProps=["maxWidth"];const bo=K({prop:"minWidth",transform:ae}),yo=K({prop:"height",transform:ae}),vo=K({prop:"maxHeight",transform:ae}),xo=K({prop:"minHeight",transform:ae});K({prop:"size",cssProperty:"width",transform:ae});K({prop:"size",cssProperty:"height",transform:ae});const wo=K({prop:"boxSizing"});an(mo,$n,bo,yo,vo,xo,wo);const ko={border:{themeKey:"borders",transform:le},borderTop:{themeKey:"borders",transform:le},borderRight:{themeKey:"borders",transform:le},borderBottom:{themeKey:"borders",transform:le},borderLeft:{themeKey:"borders",transform:le},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:le},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:sn},color:{themeKey:"palette",transform:je},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:je},backgroundColor:{themeKey:"palette",transform:je},p:{style:X},pt:{style:X},pr:{style:X},pb:{style:X},pl:{style:X},px:{style:X},py:{style:X},padding:{style:X},paddingTop:{style:X},paddingRight:{style:X},paddingBottom:{style:X},paddingLeft:{style:X},paddingX:{style:X},paddingY:{style:X},paddingInline:{style:X},paddingInlineStart:{style:X},paddingInlineEnd:{style:X},paddingBlock:{style:X},paddingBlockStart:{style:X},paddingBlockEnd:{style:X},m:{style:H},mt:{style:H},mr:{style:H},mb:{style:H},ml:{style:H},mx:{style:H},my:{style:H},margin:{style:H},marginTop:{style:H},marginRight:{style:H},marginBottom:{style:H},marginLeft:{style:H},marginX:{style:H},marginY:{style:H},marginInline:{style:H},marginInlineStart:{style:H},marginInlineEnd:{style:H},marginBlock:{style:H},marginBlockStart:{style:H},marginBlockEnd:{style:H},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:cn},rowGap:{style:un},columnGap:{style:ln},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:ae},maxWidth:{style:$n},minWidth:{transform:ae},height:{transform:ae},maxHeight:{transform:ae},minHeight:{transform:ae},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Nn=ko;function So(...e){const n=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),t=new Set(n);return e.every(r=>t.size===Object.keys(r).length)}function Eo(e,n){return typeof e=="function"?e(n):e}function Co(){function e(t,r,o,i){const a={[t]:r,theme:o},l=i[t];if(!l)return{[t]:r};const{cssProperty:c=t,themeKey:s,transform:u,style:p}=l;if(r==null)return null;if(s==="typography"&&r==="inherit")return{[t]:r};const d=tn(o,s)||{};return p?p(a):ve(a,r,b=>{let h=Qe(d,u,b);return b===h&&typeof b=="string"&&(h=Qe(d,u,`${t}${b==="default"?"":me(b)}`,b)),c===!1?h:{[c]:h}})}function n(t){var r;const{sx:o,theme:i={}}=t||{};if(!o)return null;const a=(r=i.unstable_sxConfig)!=null?r:Nn;function l(c){let s=c;if(typeof c=="function")s=c(i);else if(typeof c!="object")return c;if(!s)return null;const u=Mr(i.breakpoints),p=Object.keys(u);let d=u;return Object.keys(s).forEach(v=>{const b=Eo(s[v],i);if(b!=null)if(typeof b=="object")if(a[v])d=Le(d,e(v,b,i,a));else{const h=ve({theme:i},b,f=>({[v]:f}));So(h,b)?d[v]=n({sx:b,theme:i}):d=Le(d,h)}else d=Le(d,e(v,b,i,a))}),jr(p,d)}return Array.isArray(o)?o.map(l):l(o)}return n}const Nt=Co();Nt.filterProps=["sx"];const An=Nt,To=["breakpoints","palette","spacing","shape"];function Pn(e={},...n){const{breakpoints:t={},palette:r={},spacing:o,shape:i={}}=e,a=xe(e,To),l=Nr(t),c=qr(o);let s=pe({breakpoints:l,direction:"ltr",components:{},palette:j({mode:"light"},r),spacing:c,shape:j({},Pr,i)},a);return s=n.reduce((u,p)=>pe(u,p),s),s.unstable_sxConfig=j({},Nn,a==null?void 0:a.unstable_sxConfig),s.unstable_sx=function(p){return An({sx:p,theme:this})},s}function _o(e){return Object.keys(e).length===0}function Oo(e=null){const n=Ue.useContext(wn.ThemeContext);return!n||_o(n)?e:n}const Ro=Pn();function $o(e=Ro){return Oo(e)}const No=["variant"];function rt(e){return e.length===0}function At(e){const{variant:n}=e,t=xe(e,No);let r=n||"";return Object.keys(t).sort().forEach(o=>{o==="color"?r+=rt(r)?e[o]:me(e[o]):r+=`${rt(r)?o:me(o)}${me(e[o].toString())}`}),r}const Ao=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Po(e){return Object.keys(e).length===0}function Io(e){return typeof e=="string"&&e.charCodeAt(0)>96}const Mo=(e,n)=>n.components&&n.components[e]&&n.components[e].styleOverrides?n.components[e].styleOverrides:null,en=e=>{let n=0;const t={};return e&&e.forEach(r=>{let o="";typeof r.props=="function"?(o=`callback${n}`,n+=1):o=At(r.props),t[o]=r.style}),t},jo=(e,n)=>{let t=[];return n&&n.components&&n.components[e]&&n.components[e].variants&&(t=n.components[e].variants),en(t)},nn=(e,n,t)=>{const{ownerState:r={}}=e,o=[];let i=0;return t&&t.forEach(a=>{let l=!0;if(typeof a.props=="function"){const c=j({},e,r);l=a.props(c)}else Object.keys(a.props).forEach(c=>{r[c]!==a.props[c]&&e[c]!==a.props[c]&&(l=!1)});l&&(typeof a.props=="function"?o.push(n[`callback${i}`]):o.push(n[At(a.props)])),typeof a.props=="function"&&(i+=1)}),o},Bo=(e,n,t,r)=>{var o;const i=t==null||(o=t.components)==null||(o=o[r])==null?void 0:o.variants;return nn(e,n,i)};function Ke(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const zo=Pn(),ot=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Je({defaultTheme:e,theme:n,themeId:t}){return Po(n)?e:n[t]||n}function Do(e){return e?(n,t)=>t[e]:null}const it=({styledArg:e,props:n,defaultTheme:t,themeId:r})=>{const o=e(j({},n,{theme:Je(j({},n,{defaultTheme:t,themeId:r}))}));let i;if(o&&o.variants&&(i=o.variants,delete o.variants),i){const a=nn(n,en(i),i);return[o,...a]}return o};function Vo(e={}){const{themeId:n,defaultTheme:t=zo,rootShouldForwardProp:r=Ke,slotShouldForwardProp:o=Ke}=e,i=a=>An(j({},a,{theme:Je(j({},a,{defaultTheme:t,themeId:n}))}));return i.__mui_systemSx=!0,(a,l={})=>{wn.internal_processStyles(a,C=>C.filter(g=>!(g!=null&&g.__mui_systemSx)));const{name:c,slot:s,skipVariantsResolver:u,skipSx:p,overridesResolver:d=Do(ot(s))}=l,v=xe(l,Ao),b=u!==void 0?u:s&&s!=="Root"&&s!=="root"||!1,h=p||!1;let f;process.env.NODE_ENV!=="production"&&c&&(f=`${c}-${ot(s||"Root")}`);let S=Ke;s==="Root"||s==="root"?S=r:s?S=o:Io(a)&&(S=void 0);const J=wn(a,j({shouldForwardProp:S,label:f},v)),B=(C,...g)=>{const ne=g?g.map(T=>{if(typeof T=="function"&&T.__emotion_real!==T)return G=>it({styledArg:T,props:G,defaultTheme:t,themeId:n});if(ke(T)){let G=T,ee;return T&&T.variants&&(ee=T.variants,delete G.variants,G=ie=>{let Q=T;return nn(ie,en(ee),ee).forEach(re=>{Q=pe(Q,re)}),Q}),G}return T}):[];let oe=C;if(ke(C)){let T;C&&C.variants&&(T=C.variants,delete oe.variants,oe=G=>{let ee=C;return nn(G,en(T),T).forEach(Q=>{ee=pe(ee,Q)}),ee})}else typeof C=="function"&&C.__emotion_real!==C&&(oe=T=>it({styledArg:C,props:T,defaultTheme:t,themeId:n}));c&&d&&ne.push(T=>{const G=Je(j({},T,{defaultTheme:t,themeId:n})),ee=Mo(c,G);if(ee){const ie={};return Object.entries(ee).forEach(([Q,W])=>{ie[Q]=typeof W=="function"?W(j({},T,{theme:G})):W}),d(T,ie)}return null}),c&&!b&&ne.push(T=>{const G=Je(j({},T,{defaultTheme:t,themeId:n}));return Bo(T,jo(c,G),G,c)}),h||ne.push(i);const he=ne.length-g.length;if(Array.isArray(C)&&he>0){const T=new Array(he).fill("");oe=[...C,...T],oe.raw=[...C.raw,...T]}const de=J(oe,...ne);if(process.env.NODE_ENV!=="production"){let T;c&&(T=`${c}${me(s||"")}`),T===void 0&&(T=`Styled(${xr(a)})`),de.displayName=T}return a.muiName&&(de.muiName=a.muiName),de};return J.withConfig&&(B.withConfig=J.withConfig),B}}function Fo(e){const{theme:n,name:t,props:r}=e;return!n||!n.components||!n.components[t]||!n.components[t].defaultProps?r:_t(n.components[t].defaultProps,r)}function Lo({props:e,name:n,defaultTheme:t,themeId:r}){let o=$o(t);return r&&(o=o[r]||o),Fo({theme:o,name:n,props:e})}function Pt(e,n=0,t=1){return process.env.NODE_ENV!=="production"&&(e<n||e>t)&&console.error(`MUI: The value provided ${e} is out of range [${n}, ${t}].`),_r(e,n,t)}function Uo(e){e=e.slice(1);const n=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let t=e.match(n);return t&&t[0].length===1&&(t=t.map(r=>r+r)),t?`rgb${t.length===4?"a":""}(${t.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function ze(e){if(e.type)return e;if(e.charAt(0)==="#")return ze(Uo(e));const n=e.indexOf("("),t=e.substring(0,n);if(["rgb","rgba","hsl","hsla","color"].indexOf(t)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Be(9,e));let r=e.substring(n+1,e.length-1),o;if(t==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Be(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:t,values:r,colorSpace:o}}function In(e){const{type:n,colorSpace:t}=e;let{values:r}=e;return n.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):n.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),n.indexOf("color")!==-1?r=`${t} ${r.join(" ")}`:r=`${r.join(", ")}`,`${n}(${r})`}function qo(e){e=ze(e);const{values:n}=e,t=n[0],r=n[1]/100,o=n[2]/100,i=r*Math.min(o,1-o),a=(s,u=(s+t/30)%12)=>o-i*Math.max(Math.min(u-3,9-u,1),-1);let l="rgb";const c=[Math.round(a(0)*255),Math.round(a(8)*255),Math.round(a(4)*255)];return e.type==="hsla"&&(l+="a",c.push(n[3])),In({type:l,values:c})}function at(e){e=ze(e);let n=e.type==="hsl"||e.type==="hsla"?ze(qo(e)).values:e.values;return n=n.map(t=>(e.type!=="color"&&(t/=255),t<=.03928?t/12.92:((t+.055)/1.055)**2.4)),Number((.2126*n[0]+.7152*n[1]+.0722*n[2]).toFixed(3))}function st(e,n){const t=at(e),r=at(n);return(Math.max(t,r)+.05)/(Math.min(t,r)+.05)}function Go(e,n){if(e=ze(e),n=Pt(n),e.type.indexOf("hsl")!==-1)e.values[2]*=1-n;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let t=0;t<3;t+=1)e.values[t]*=1-n;return In(e)}function Wo(e,n){if(e=ze(e),n=Pt(n),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*n;else if(e.type.indexOf("rgb")!==-1)for(let t=0;t<3;t+=1)e.values[t]+=(255-e.values[t])*n;else if(e.type.indexOf("color")!==-1)for(let t=0;t<3;t+=1)e.values[t]+=(1-e.values[t])*n;return In(e)}function Ho(e,n){return j({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},n)}const Xo={black:"#000",white:"#fff"},Ge=Xo,Yo={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Ko=Yo,Jo={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ne=Jo,Zo={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Ae=Zo,Qo={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Fe=Qo,ei={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Pe=ei,ni={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Ie=ni,ti={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Me=ti,ri=["mode","contrastThreshold","tonalOffset"],ct={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Ge.white,default:Ge.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},vn={text:{primary:Ge.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Ge.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function lt(e,n,t,r){const o=r.light||r,i=r.dark||r*1.5;e[n]||(e.hasOwnProperty(t)?e[n]=e[t]:n==="light"?e.light=Wo(e.main,o):n==="dark"&&(e.dark=Go(e.main,i)))}function oi(e="light"){return e==="dark"?{main:Pe[200],light:Pe[50],dark:Pe[400]}:{main:Pe[700],light:Pe[400],dark:Pe[800]}}function ii(e="light"){return e==="dark"?{main:Ne[200],light:Ne[50],dark:Ne[400]}:{main:Ne[500],light:Ne[300],dark:Ne[700]}}function ai(e="light"){return e==="dark"?{main:Ae[500],light:Ae[300],dark:Ae[700]}:{main:Ae[700],light:Ae[400],dark:Ae[800]}}function si(e="light"){return e==="dark"?{main:Ie[400],light:Ie[300],dark:Ie[700]}:{main:Ie[700],light:Ie[500],dark:Ie[900]}}function ci(e="light"){return e==="dark"?{main:Me[400],light:Me[300],dark:Me[700]}:{main:Me[800],light:Me[500],dark:Me[900]}}function li(e="light"){return e==="dark"?{main:Fe[400],light:Fe[300],dark:Fe[700]}:{main:"#ed6c02",light:Fe[500],dark:Fe[900]}}function ui(e){const{mode:n="light",contrastThreshold:t=3,tonalOffset:r=.2}=e,o=xe(e,ri),i=e.primary||oi(n),a=e.secondary||ii(n),l=e.error||ai(n),c=e.info||si(n),s=e.success||ci(n),u=e.warning||li(n);function p(h){const f=st(h,vn.text.primary)>=t?vn.text.primary:ct.text.primary;if(process.env.NODE_ENV!=="production"){const S=st(h,f);S<3&&console.error([`MUI: The contrast ratio of ${S}:1 for ${f} on ${h}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return f}const d=({color:h,name:f,mainShade:S=500,lightShade:J=300,darkShade:B=700})=>{if(h=j({},h),!h.main&&h[S]&&(h.main=h[S]),!h.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${f?` (${f})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${S}\` property.`:Be(11,f?` (${f})`:"",S));if(typeof h.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${f?` (${f})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Be(12,f?` (${f})`:"",JSON.stringify(h.main)));return lt(h,"light",J,r),lt(h,"dark",B,r),h.contrastText||(h.contrastText=p(h.main)),h},v={dark:vn,light:ct};return process.env.NODE_ENV!=="production"&&(v[n]||console.error(`MUI: The palette mode \`${n}\` is not supported.`)),pe(j({common:j({},Ge),mode:n,primary:d({color:i,name:"primary"}),secondary:d({color:a,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:d({color:l,name:"error"}),warning:d({color:u,name:"warning"}),info:d({color:c,name:"info"}),success:d({color:s,name:"success"}),grey:Ko,contrastThreshold:t,getContrastText:p,augmentColor:d,tonalOffset:r},v[n]),o)}const di=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function fi(e){return Math.round(e*1e5)/1e5}const ut={textTransform:"uppercase"},dt='"Roboto", "Helvetica", "Arial", sans-serif';function pi(e,n){const t=typeof n=="function"?n(e):n,{fontFamily:r=dt,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:a=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:s=16,allVariants:u,pxToRem:p}=t,d=xe(t,di);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof s!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const v=o/14,b=p||(S=>`${S/s*v}rem`),h=(S,J,B,C,g)=>j({fontFamily:r,fontWeight:S,fontSize:b(J),lineHeight:B},r===dt?{letterSpacing:`${fi(C/J)}em`}:{},g,u),f={h1:h(i,96,1.167,-1.5),h2:h(i,60,1.2,-.5),h3:h(a,48,1.167,0),h4:h(a,34,1.235,.25),h5:h(a,24,1.334,0),h6:h(l,20,1.6,.15),subtitle1:h(a,16,1.75,.15),subtitle2:h(l,14,1.57,.1),body1:h(a,16,1.5,.15),body2:h(a,14,1.43,.15),button:h(l,14,1.75,.4,ut),caption:h(a,12,1.66,.4),overline:h(a,12,2.66,1,ut),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return pe(j({htmlFontSize:s,pxToRem:b,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:a,fontWeightMedium:l,fontWeightBold:c},f),d,{clone:!1})}const hi=.2,gi=.14,mi=.12;function q(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${hi})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${gi})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${mi})`].join(",")}const bi=["none",q(0,2,1,-1,0,1,1,0,0,1,3,0),q(0,3,1,-2,0,2,2,0,0,1,5,0),q(0,3,3,-2,0,3,4,0,0,1,8,0),q(0,2,4,-1,0,4,5,0,0,1,10,0),q(0,3,5,-1,0,5,8,0,0,1,14,0),q(0,3,5,-1,0,6,10,0,0,1,18,0),q(0,4,5,-2,0,7,10,1,0,2,16,1),q(0,5,5,-3,0,8,10,1,0,3,14,2),q(0,5,6,-3,0,9,12,1,0,3,16,2),q(0,6,6,-3,0,10,14,1,0,4,18,3),q(0,6,7,-4,0,11,15,1,0,4,20,3),q(0,7,8,-4,0,12,17,2,0,5,22,4),q(0,7,8,-4,0,13,19,2,0,5,24,4),q(0,7,9,-4,0,14,21,2,0,5,26,4),q(0,8,9,-5,0,15,22,2,0,6,28,5),q(0,8,10,-5,0,16,24,2,0,6,30,5),q(0,8,11,-5,0,17,26,2,0,6,32,5),q(0,9,11,-5,0,18,28,2,0,7,34,6),q(0,9,12,-6,0,19,29,2,0,7,36,6),q(0,10,13,-6,0,20,31,3,0,8,38,7),q(0,10,13,-6,0,21,33,3,0,8,40,7),q(0,10,14,-6,0,22,35,3,0,8,42,7),q(0,11,14,-7,0,23,36,3,0,9,44,8),q(0,11,15,-7,0,24,38,3,0,9,46,8)],yi=bi,vi=["duration","easing","delay"],xi={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},wi={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function ft(e){return`${Math.round(e)}ms`}function ki(e){if(!e)return 0;const n=e/36;return Math.round((4+15*n**.25+n/5)*10)}function Si(e){const n=j({},xi,e.easing),t=j({},wi,e.duration);return j({getAutoHeightDuration:ki,create:(o=["all"],i={})=>{const{duration:a=t.standard,easing:l=n.easeInOut,delay:c=0}=i,s=xe(i,vi);if(process.env.NODE_ENV!=="production"){const u=d=>typeof d=="string",p=d=>!isNaN(parseFloat(d));!u(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!p(a)&&!u(a)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`),u(l)||console.error('MUI: Argument "easing" must be a string.'),!p(c)&&!u(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(s).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(s).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(u=>`${u} ${typeof a=="string"?a:ft(a)} ${l} ${typeof c=="string"?c:ft(c)}`).join(",")}},e,{easing:n,duration:t})}const Ei={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Ci=Ei,Ti=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function _i(e={},...n){const{mixins:t={},palette:r={},transitions:o={},typography:i={}}=e,a=xe(e,Ti);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Be(18));const l=ui(r),c=Pn(e);let s=pe(c,{mixins:Ho(c.breakpoints,t),palette:l,shadows:yi.slice(),typography:pi(l,i),transitions:Si(o),zIndex:j({},Ci),applyDarkStyles(u){return this.vars?{[this.getColorSchemeSelector("dark").replace(/(\[[^\]]+\])/,":where($1)")]:u}:this.palette.mode==="dark"?u:{}}});if(s=pe(s,a),s=n.reduce((u,p)=>pe(u,p),s),process.env.NODE_ENV!=="production"){const u=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],p=(d,v)=>{let b;for(b in d){const h=d[b];if(u.indexOf(b)!==-1&&Object.keys(h).length>0){if(process.env.NODE_ENV!=="production"){const f=On("",b);console.error([`MUI: The \`${v}\` component increases the CSS specificity of the \`${b}\` internal state.`,"You can not override it like this: ",JSON.stringify(d,null,2),"",`Instead, you need to use the '&.${f}' syntax:`,JSON.stringify({root:{[`&.${f}`]:h}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}d[b]={}}}};Object.keys(s.components).forEach(d=>{const v=s.components[d].styleOverrides;v&&d.indexOf("Mui")===0&&p(v,d)})}return s.unstable_sxConfig=j({},Nn,a==null?void 0:a.unstable_sxConfig),s.unstable_sx=function(p){return An({sx:p,theme:this})},s}const Oi=_i(),It=Oi,Mt="$$material";function Ri({props:e,name:n}){return Lo({props:e,name:n,defaultTheme:It,themeId:Mt})}const $i=e=>Ke(e)&&e!=="classes",Ni=Vo({themeId:Mt,defaultTheme:It,rootShouldForwardProp:$i}),Ai=Ni;function Pi(e){return On("MuiSvgIcon",e)}Tr("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Ii=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Mi=e=>{const{color:n,fontSize:t,classes:r}=e,o={root:["root",n!=="inherit"&&`color${me(n)}`,`fontSize${me(t)}`]};return wr(o,Pi,r)},ji=Ai("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:t}=e;return[n.root,t.color!=="inherit"&&n[`color${me(t.color)}`],n[`fontSize${me(t.fontSize)}`]]}})(({theme:e,ownerState:n})=>{var t,r,o,i,a,l,c,s,u,p,d,v,b;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:n.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(t=e.transitions)==null||(r=t.create)==null?void 0:r.call(t,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(a=i.pxToRem)==null?void 0:a.call(i,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((s=e.typography)==null||(u=s.pxToRem)==null?void 0:u.call(s,35))||"2.1875rem"}[n.fontSize],color:(p=(d=(e.vars||e).palette)==null||(d=d[n.color])==null?void 0:d.main)!=null?p:{action:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.active,disabled:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.disabled,inherit:void 0}[n.color]}}),Mn=Ue.forwardRef(function(n,t){const r=Ri({props:n,name:"MuiSvgIcon"}),{children:o,className:i,color:a="inherit",component:l="svg",fontSize:c="medium",htmlColor:s,inheritViewBox:u=!1,titleAccess:p,viewBox:d="0 0 24 24"}=r,v=xe(r,Ii),b=Ue.isValidElement(o)&&o.type==="svg",h=j({},r,{color:a,component:l,fontSize:c,instanceFontSize:n.fontSize,inheritViewBox:u,viewBox:d,hasSvgAsChild:b}),f={};u||(f.viewBox=d);const S=Mi(h);return k.jsxs(ji,j({as:l,className:Or(S.root,i),focusable:"false",color:s,"aria-hidden":p?void 0:!0,role:p?"img":void 0,ref:t},f,v,b&&o.props,{ownerState:h,children:[b?o.props.children:o,p?k.jsx("title",{children:p}):null]}))});process.env.NODE_ENV!=="production"&&(Mn.propTypes={children:U.node,classes:U.object,className:U.string,color:U.oneOfType([U.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),U.string]),component:U.elementType,fontSize:U.oneOfType([U.oneOf(["inherit","large","medium","small"]),U.string]),htmlColor:U.string,inheritViewBox:U.bool,shapeRendering:U.string,sx:U.oneOfType([U.arrayOf(U.oneOfType([U.func,U.object,U.bool])),U.func,U.object]),titleAccess:U.string,viewBox:U.string});Mn.muiName="SvgIcon";const pt=Mn;function Bi(e,n){function t(r,o){return k.jsx(pt,j({"data-testid":`${n}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(t.displayName=`${n}Icon`),t.muiName=pt.muiName,Ue.memo(Ue.forwardRef(t))}const zi=Bi(k.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Di({menu:e,dataHandler:n,commandHandler:t,className:r,id:o,children:i}){const[a,l]=Y.useState(!1),[c,s]=Y.useState(!1),u=Y.useCallback(()=>{a&&l(!1),s(!1)},[a]),p=Y.useCallback(S=>{S.stopPropagation(),l(J=>{const B=!J;return B&&S.shiftKey?s(!0):B||s(!1),B})},[]),d=Y.useRef(void 0),[v,b]=Y.useState(0);Y.useEffect(()=>{a&&d.current&&b(d.current.clientHeight)},[a]);const h=Y.useCallback(S=>(u(),t(S)),[t,u]);let f=e;return!f&&n&&(f=n(c)),k.jsx("div",{ref:d,style:{position:"relative"},children:k.jsx(Z.AppBar,{position:"static",id:o,children:k.jsxs(Z.Toolbar,{className:`papi-toolbar ${r??""}`,variant:"dense",children:[f?k.jsx(Z.IconButton,{edge:"start",className:`papi-menuButton ${r??""}`,color:"inherit","aria-label":"open drawer",onClick:p,children:k.jsx(zi,{})}):void 0,i?k.jsx("div",{className:"papi-menu-children",children:i}):void 0,f?k.jsx(Z.Drawer,{className:`papi-menu-drawer ${r??""}`,anchor:"left",variant:"persistent",open:a,onClose:u,PaperProps:{className:"papi-menu-drawer-paper",style:{top:v}},children:k.jsx(mt,{commandHandler:h,columns:f.columns})}):void 0]})})})}const Vi=(e,n)=>{Y.useEffect(()=>{if(!e)return()=>{};const t=e(n);return()=>{t()}},[e,n])};function Fi(e){return{preserveValue:!0,...e}}const jt=(e,n,t={})=>{const r=Y.useRef(n);r.current=n;const o=Y.useRef(t);o.current=Fi(o.current);const[i,a]=Y.useState(()=>r.current),[l,c]=Y.useState(!0);return Y.useEffect(()=>{let s=!0;return c(!!e),(async()=>{if(e){const u=await e();s&&(a(()=>u),c(!1))}})(),()=>{s=!1,o.current.preserveValue||a(()=>r.current)}},[e]),[i,l]},xn=()=>!1,Li=(e,n)=>{const[t]=jt(Y.useCallback(async()=>{if(!e)return xn;const r=await Promise.resolve(e(n));return async()=>r()},[n,e]),xn,{preserveValue:!1});Y.useEffect(()=>()=>{t!==xn&&t()},[t])};exports.Button=Ce;exports.ChapterRangeSelector=zt;exports.Checkbox=ht;exports.ComboBox=Ze;exports.GridMenu=mt;exports.IconButton=Vt;exports.LabelPosition=_e;exports.MenuItem=gt;exports.RefSelector=Qt;exports.SearchBar=er;exports.Slider=nr;exports.Snackbar=tr;exports.Switch=rr;exports.Table=ir;exports.TextField=qe;exports.Toolbar=Di;exports.useEvent=Vi;exports.useEventAsync=Li;exports.usePromise=jt;function Ui(e,n="top"){if(!e||typeof document>"u")return;const t=document.head||document.querySelector("head"),r=t.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),n==="top"&&r?t.insertBefore(o,r):t.appendChild(o)}Ui(`.papi-button {
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
.paratext {
  background-color: darkgreen;
  color: greenyellow;
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
/*
! tailwindcss v3.4.1 | MIT License | https://tailwindcss.com
*//*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before,
::after {
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

html,
:host {
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

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden] {
  display: none;
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
.container {
  width: 100%;
}
@media (min-width: 640px) {

  .container {
    max-width: 640px;
  }
}
@media (min-width: 768px) {

  .container {
    max-width: 768px;
  }
}
@media (min-width: 1024px) {

  .container {
    max-width: 1024px;
  }
}
@media (min-width: 1280px) {

  .container {
    max-width: 1280px;
  }
}
@media (min-width: 1536px) {

  .container {
    max-width: 1536px;
  }
}
.static {
  position: static;
}
.relative {
  position: relative;
}
.table {
  display: table;
}
.grid {
  display: grid;
}
.contents {
  display: contents;
}
.border {
  border-width: 1px;
}
.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.font-bold {
  font-weight: 700;
}
.underline {
  text-decoration-line: underline;
}
`,"top");
//# sourceMappingURL=index.cjs.map
