"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const S=require("react/jsx-runtime"),Z=require("@mui/material"),Y=require("react"),me=require("platform-bible-utils"),Bn=require("react-data-grid"),kn=require("@mui/styled-engine");function Br(e){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const r in e)if(r!=="default"){const t=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,t.get?t:{enumerable:!0,get:()=>e[r]})}}return n.default=e,Object.freeze(n)}const Ue=Br(Y);function Te({id:e,isDisabled:n=!1,className:r,onClick:t,onContextMenu:o,children:i}){return S.jsx(Z.Button,{id:e,disabled:n,className:`papi-button ${r??""}`,onClick:t,onContextMenu:o,children:i})}function Ze({id:e,title:n,isDisabled:r=!1,isClearable:t=!0,hasError:o=!1,isFullWidth:i=!1,width:a,options:l=[],className:c,value:s,onChange:u,onFocus:p,onBlur:d,getOptionLabel:v}){return S.jsx(Z.Autocomplete,{id:e,disablePortal:!0,disabled:r,disableClearable:!t,fullWidth:i,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:s,onChange:u,onFocus:p,onBlur:d,getOptionLabel:v,renderInput:b=>S.jsx(Z.TextField,{...b,error:o,fullWidth:i,disabled:r,label:n,style:{width:a}})})}function Dr({startChapter:e,endChapter:n,handleSelectStartChapter:r,handleSelectEndChapter:t,isDisabled:o,chapterCount:i}){const a=Y.useMemo(()=>Array.from({length:i},(s,u)=>u+1),[i]),l=(s,u)=>{r(u),u>n&&t(u)},c=(s,u)=>{t(u),u<e&&r(u)};return S.jsxs(S.Fragment,{children:[S.jsx(Z.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:S.jsx(Ze,{onChange:(s,u)=>l(s,u),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:s=>s.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),S.jsx(Z.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:S.jsx(Ze,{onChange:(s,u)=>c(s,u),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:s=>s.toString(),value:n,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var _e=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(_e||{});function hr({id:e,isChecked:n,labelText:r="",labelPosition:t=_e.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:a=!1,hasError:l=!1,className:c,onChange:s}){const u=S.jsx(Z.Checkbox,{id:e,checked:n,indeterminate:o,defaultChecked:i,disabled:a,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:s});let p;if(r){const d=t===_e.Before||t===_e.Above,v=S.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:r}),b=t===_e.Before||t===_e.After,h=b?v:S.jsx("div",{children:v}),f=b?u:S.jsx("div",{children:u});p=S.jsxs(Z.FormLabel,{className:`papi-checkbox ${t.toString()}`,disabled:a,error:l,children:[d&&h,f,!d&&h]})}else p=u;return p}function mr(e){const{onClick:n,name:r,hasAutoFocus:t=!1,className:o,isDense:i=!0,hasDisabledGutters:a=!1,hasDivider:l=!1,focusVisibleClassName:c,id:s,children:u}=e;return S.jsx(Z.MenuItem,{autoFocus:t,className:o,dense:i,disableGutters:a,divider:l,focusVisibleClassName:c,onClick:n,id:s,children:r||u})}function Vr({commandHandler:e,name:n,className:r,items:t,id:o}){return S.jsxs(Z.Grid,{id:o,item:!0,xs:"auto",className:`papi-menu-column ${r??""}`,children:[S.jsx("h3",{className:`papi-menu ${r??""}`,children:n}),t.map((i,a)=>S.jsx(mr,{className:`papi-menu-item ${i.className}`,onClick:()=>{e(i)},...i},a))]})}function gr({commandHandler:e,className:n,columns:r,id:t}){return S.jsx(Z.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${n??""}`,columns:r.length,id:t,children:r.map((o,i)=>S.jsx(Vr,{commandHandler:e,name:o.name,className:n,items:o.items},i))})}function zr({id:e,label:n,isDisabled:r=!1,tooltip:t,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:a="medium",className:l,onClick:c,children:s}){return S.jsx(Z.IconButton,{id:e,disabled:r,edge:i,size:a,"aria-label":n,title:o?void 0:t??n,className:`papi-icon-button ${l??""}`,onClick:c,children:s})}var Lr=Object.defineProperty,Fr=(e,n,r)=>n in e?Lr(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,P=(e,n,r)=>(Fr(e,typeof n!="symbol"?n+"":n,r),r);const Oe=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],wn=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],br=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Dn=Zr();function Ve(e,n=!0){return n&&(e=e.toUpperCase()),e in Dn?Dn[e]:0}function Tn(e){return Ve(e)>0}function Ur(e){const n=typeof e=="string"?Ve(e):e;return n>=40&&n<=66}function qr(e){return(typeof e=="string"?Ve(e):e)<=39}function yr(e){return e<=66}function Gr(e){const n=typeof e=="string"?Ve(e):e;return kr(n)&&!yr(n)}function*Wr(){for(let e=1;e<=Oe.length;e++)yield e}const Hr=1,vr=Oe.length;function Xr(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Cn(e,n="***"){const r=e-1;return r<0||r>=Oe.length?n:Oe[r]}function xr(e){return e<=0||e>vr?"******":br[e-1]}function Yr(e){return xr(Ve(e))}function kr(e){const n=typeof e=="number"?Cn(e):e;return Tn(n)&&!wn.includes(n)}function Kr(e){const n=typeof e=="number"?Cn(e):e;return Tn(n)&&wn.includes(n)}function Jr(e){return br[e-1].includes("*obsolete*")}function Zr(){const e={};for(let n=0;n<Oe.length;n++)e[Oe[n]]=n+1;return e}const ye={allBookIds:Oe,nonCanonicalIds:wn,bookIdToNumber:Ve,isBookIdValid:Tn,isBookNT:Ur,isBookOT:qr,isBookOTNT:yr,isBookDC:Gr,allBookNumbers:Wr,firstBook:Hr,lastBook:vr,extraBooks:Xr,bookNumberToId:Cn,bookNumberToEnglishName:xr,bookIdToEnglishName:Yr,isCanonical:kr,isExtraMaterial:Kr,isObsolete:Jr};var ke=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(ke||{});const Ce=class{constructor(e){if(P(this,"name"),P(this,"fullPath"),P(this,"isPresent"),P(this,"hasVerseSegments"),P(this,"isCustomized"),P(this,"baseVersification"),P(this,"scriptureBooks"),P(this,"_type"),e!=null)typeof e=="string"?this.name=e:this._type=e;else throw new Error("Argument null")}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};let ce=Ce;P(ce,"Original",new Ce(ke.Original)),P(ce,"Septuagint",new Ce(ke.Septuagint)),P(ce,"Vulgate",new Ce(ke.Vulgate)),P(ce,"English",new Ce(ke.English)),P(ce,"RussianProtestant",new Ce(ke.RussianProtestant)),P(ce,"RussianOrthodox",new Ce(ke.RussianOrthodox));function Vn(e,n){const r=n[0];for(let t=1;t<n.length;t++)e=e.split(n[t]).join(r);return e.split(r)}var Sr=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Sr||{});const N=class{constructor(n,r,t,o){if(P(this,"firstChapter"),P(this,"lastChapter"),P(this,"lastVerse"),P(this,"hasSegmentsDefined"),P(this,"text"),P(this,"BBBCCCVVVS"),P(this,"longHashCode"),P(this,"versification"),P(this,"rtlMark","‏"),P(this,"_bookNum",0),P(this,"_chapterNum",0),P(this,"_verseNum",0),P(this,"_verse"),t==null&&o==null)if(n!=null&&typeof n=="string"){const i=n,a=r!=null&&r instanceof ce?r:void 0;this.setEmpty(a),this.parse(i)}else if(n!=null&&typeof n=="number"){const i=r!=null&&r instanceof ce?r:void 0;this.setEmpty(i),this._verseNum=n%N.chapterDigitShifter,this._chapterNum=Math.floor(n%N.bookDigitShifter/N.chapterDigitShifter),this._bookNum=Math.floor(n/N.bookDigitShifter)}else if(r==null)if(n!=null&&n instanceof N){const i=n;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(n==null)return;const i=n instanceof ce?n:N.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(n!=null&&r!=null&&t!=null)if(typeof n=="string"&&typeof r=="string"&&typeof t=="string")this.setEmpty(o),this.updateInternal(n,r,t);else if(typeof n=="number"&&typeof r=="number"&&typeof t=="number")this._bookNum=n,this._chapterNum=r,this._verseNum=t,this.versification=o??N.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(n,r=N.defaultVersification){const t=new N(r);return t.parse(n),t}static isVerseParseable(n){return n.length>0&&"0123456789".includes(n[0])&&!n.endsWith(this.verseRangeSeparator)&&!n.endsWith(this.verseSequenceIndicator)}static tryParse(n){let r;try{return r=N.parse(n),{success:!0,verseRef:r}}catch(t){if(t instanceof ze)return r=new N,{success:!1,verseRef:r};throw t}}static getBBBCCCVVV(n,r,t){return n%N.bcvMaxValue*N.bookDigitShifter+(r>=0?r%N.bcvMaxValue*N.chapterDigitShifter:0)+(t>=0?t%N.bcvMaxValue:0)}static tryGetVerseNum(n){let r;if(!n)return r=-1,{success:!0,vNum:r};r=0;let t;for(let o=0;o<n.length;o++){if(t=n[o],t<"0"||t>"9")return o===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +t-+"0",r>N.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(N.verseRangeSeparator)||this._verse.includes(N.verseSequenceIndicator))}get book(){return ye.bookNumberToId(this.bookNum,"")}set book(n){this.bookNum=ye.bookIdToNumber(n)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(n){const r=+n;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(n){const{success:r,vNum:t}=N.tryGetVerseNum(n);this._verse=r?void 0:n.replace(this.rtlMark,""),this._verseNum=t,!(this._verseNum>=0)&&({vNum:this._verseNum}=N.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(n){if(n<=0||n>ye.lastBook)throw new ze("BookNum must be greater than zero and less than or equal to last book");this._bookNum=n}get chapterNum(){return this._chapterNum}set chapterNum(n){this.chapterNum=n}get verseNum(){return this._verseNum}set verseNum(n){this._verseNum=n}get versificationStr(){var n;return(n=this.versification)==null?void 0:n.name}set versificationStr(n){this.versification=this.versification!=null?new ce(n):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(N.verseRangeSeparators,N.verseSequenceIndicators)}get BBBCCC(){return N.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return N.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(n){if(n=n.replace(this.rtlMark,""),n.includes("/")){const i=n.split("/");if(n=i[0],i.length>1)try{const a=+i[1].trim();this.versification=new ce(ke[a])}catch{throw new ze("Invalid reference : "+n)}}const r=n.trim().split(" ");if(r.length!==2)throw new ze("Invalid reference : "+n);const t=r[1].split(":"),o=+t[0];if(t.length!==2||ye.bookIdToNumber(r[0])===0||!Number.isInteger(o)||o<0||!N.isVerseParseable(t[1]))throw new ze("Invalid reference : "+n);this.updateInternal(r[0],t[0],t[1])}simplify(){this._verse=void 0}clone(){return new N(this)}toString(){const n=this.book;return n===""?"":`${n} ${this.chapter}:${this.verse}`}equals(n){return n._bookNum===this._bookNum&&n._chapterNum===this._chapterNum&&n._verseNum===this._verseNum&&n._verse===this._verse&&n.versification!=null&&this.versification!=null&&n.versification.equals(this.versification)}allVerses(n=!1,r=N.verseRangeSeparators,t=N.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=Vn(this._verse,t);for(const a of i.map(l=>Vn(l,r))){const l=this.clone();l.verse=a[0];const c=l.verseNum;if(o.push(l),a.length>1){const s=this.clone();if(s.verse=a[1],!n)for(let u=c+1;u<s.verseNum;u++){const p=new N(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||o.push(p)}o.push(s)}}return o}validateVerse(n,r){if(!this.verse)return this.internalValid;let t=0;for(const o of this.allVerses(!0,n,r)){const i=o.internalValid;if(i!==0)return i;const a=o.BBBCCCVVV;if(t>a)return 3;if(t===a)return 4;t=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ye.lastBook?2:0}setEmpty(n=N.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=n}updateInternal(n,r,t){this.bookNum=ye.bookIdToNumber(n),this.chapter=r,this.verse=t}};let be=N;P(be,"defaultVersification",ce.English),P(be,"verseRangeSeparator","-"),P(be,"verseSequenceIndicator",","),P(be,"verseRangeSeparators",[N.verseRangeSeparator]),P(be,"verseSequenceIndicators",[N.verseSequenceIndicator]),P(be,"chapterDigitShifter",1e3),P(be,"bookDigitShifter",N.chapterDigitShifter*N.chapterDigitShifter),P(be,"bcvMaxValue",N.chapterDigitShifter-1),P(be,"ValidStatusType",Sr);class ze extends Error{}function qe({variant:e="outlined",id:n,isDisabled:r=!1,hasError:t=!1,isFullWidth:o=!1,helperText:i,label:a,placeholder:l,isRequired:c=!1,className:s,defaultValue:u,value:p,onChange:d,onFocus:v,onBlur:b}){return S.jsx(Z.TextField,{variant:e,id:n,disabled:r,error:t,fullWidth:o,helperText:i,label:a,placeholder:l,required:c,className:`papi-textfield ${s??""}`,defaultValue:u,value:p,onChange:d,onFocus:v,onBlur:b})}let dn;const fn=()=>(dn||(dn=ye.allBookIds.map(e=>({bookId:e,label:ye.bookIdToEnglishName(e)}))),dn);function Qr({scrRef:e,handleSubmit:n,id:r}){const t=c=>{n(c)},o=(c,s)=>{const p={bookNum:ye.bookIdToNumber(s.bookId),chapterNum:1,verseNum:1};t(p)},i=c=>{n({...e,chapterNum:+c.target.value})},a=c=>{n({...e,verseNum:+c.target.value})},l=Y.useMemo(()=>fn()[e.bookNum-1],[e.bookNum]);return S.jsxs("span",{id:r,children:[S.jsx(Ze,{title:"Book",className:"papi-ref-selector book",value:l,options:fn(),onChange:o,isClearable:!1,width:200}),S.jsx(Te,{onClick:()=>t(me.offsetBook(e,-1)),isDisabled:e.bookNum<=me.FIRST_SCR_BOOK_NUM,children:"<"}),S.jsx(Te,{onClick:()=>t(me.offsetBook(e,1)),isDisabled:e.bookNum>=fn().length,children:">"}),S.jsx(qe,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),S.jsx(Te,{onClick:()=>n(me.offsetChapter(e,-1)),isDisabled:e.chapterNum<=me.FIRST_SCR_CHAPTER_NUM,children:"<"}),S.jsx(Te,{onClick:()=>n(me.offsetChapter(e,1)),isDisabled:e.chapterNum>=me.getChaptersForBook(e.bookNum),children:">"}),S.jsx(qe,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:a}),S.jsx(Te,{onClick:()=>n(me.offsetVerse(e,-1)),isDisabled:e.verseNum<=me.FIRST_SCR_VERSE_NUM,children:"<"}),S.jsx(Te,{onClick:()=>n(me.offsetVerse(e,1)),children:">"})]})}function et({onSearch:e,placeholder:n,isFullWidth:r}){const[t,o]=Y.useState(""),i=a=>{o(a),e(a)};return S.jsx(Z.Paper,{component:"form",className:"search-bar-paper",children:S.jsx(qe,{isFullWidth:r,className:"search-bar-input",placeholder:n,value:t,onChange:a=>i(a.target.value)})})}function nt({id:e,isDisabled:n=!1,orientation:r="horizontal",min:t=0,max:o=100,step:i=1,showMarks:a=!1,defaultValue:l,value:c,valueLabelDisplay:s="off",className:u,onChange:p,onChangeCommitted:d}){return S.jsx(Z.Slider,{id:e,disabled:n,orientation:r,min:t,max:o,step:i,marks:a,defaultValue:l,value:c,valueLabelDisplay:s,className:`papi-slider ${r} ${u??""}`,onChange:p,onChangeCommitted:d})}function rt({autoHideDuration:e=void 0,id:n,isOpen:r=!1,className:t,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:a,children:l}){const c={action:(a==null?void 0:a.action)||l,message:a==null?void 0:a.message,className:t};return S.jsx(Z.Snackbar,{autoHideDuration:e??void 0,open:r,onClose:o,anchorOrigin:i,id:n,ContentProps:c})}function tt({id:e,isChecked:n,isDisabled:r=!1,hasError:t=!1,className:o,onChange:i}){return S.jsx(Z.Switch,{id:e,checked:n,disabled:r,className:`papi-switch ${t?"error":""} ${o??""}`,onChange:i})}function zn({onRowChange:e,row:n,column:r}){const t=o=>{e({...n,[r.key]:o.target.value})};return S.jsx(qe,{defaultValue:n[r.key],onChange:t})}const ot=({onChange:e,disabled:n,checked:r,...t})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return S.jsx(hr,{...t,isChecked:r,isDisabled:n,onChange:o})};function it({columns:e,sortColumns:n,onSortColumnsChange:r,onColumnResize:t,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:a,defaultColumnSortable:l=!0,defaultColumnResizable:c=!0,rows:s,enableSelectColumn:u,selectColumnWidth:p=50,rowKeyGetter:d,rowHeight:v=35,headerRowHeight:b=35,selectedRows:h,onSelectedRowsChange:f,onRowsChange:E,onCellClick:J,onCellDoubleClick:B,onCellContextMenu:T,onCellKeyDown:m,direction:ne="ltr",enableVirtualization:oe=!0,onCopy:he,onPaste:de,onScroll:C,className:G,id:ee}){const ie=Y.useMemo(()=>{const Q=e.map(W=>typeof W.editable=="function"?{...W,editable:fe=>!!W.editable(fe),renderEditCell:W.renderEditCell||zn}:W.editable&&!W.renderEditCell?{...W,renderEditCell:zn}:W.renderEditCell&&!W.editable?{...W,editable:!1}:W);return u?[{...Bn.SelectColumn,minWidth:p},...Q]:Q},[e,u,p]);return S.jsx(Bn,{columns:ie,defaultColumnOptions:{width:o,minWidth:i,maxWidth:a,sortable:l,resizable:c},sortColumns:n,onSortColumnsChange:r,onColumnResize:t,rows:s,rowKeyGetter:d,rowHeight:v,headerRowHeight:b,selectedRows:h,onSelectedRowsChange:f,onRowsChange:E,onCellClick:J,onCellDoubleClick:B,onCellContextMenu:T,onCellKeyDown:m,direction:ne,enableVirtualization:oe,onCopy:he,onPaste:de,onScroll:C,renderers:{renderCheckbox:ot},className:G??"rdg-light","data-testid":ee})}function j(){return j=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},j.apply(this,arguments)}function Se(e){if(typeof e!="object"||e===null)return!1;const n=Object.getPrototypeOf(e);return(n===null||n===Object.prototype||Object.getPrototypeOf(n)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Er(e){if(!Se(e))return e;const n={};return Object.keys(e).forEach(r=>{n[r]=Er(e[r])}),n}function pe(e,n,r={clone:!0}){const t=r.clone?j({},e):e;return Se(e)&&Se(n)&&Object.keys(n).forEach(o=>{o!=="__proto__"&&(Se(n[o])&&o in e&&Se(e[o])?t[o]=pe(e[o],n[o],r):r.clone?t[o]=Se(n[o])?Er(n[o]):n[o]:t[o]=n[o])}),t}function at(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Sn={exports:{}},Ye={exports:{}},V={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ln;function st(){if(Ln)return V;Ln=1;var e=typeof Symbol=="function"&&Symbol.for,n=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,t=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,s=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,b=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,f=e?Symbol.for("react.fundamental"):60117,E=e?Symbol.for("react.responder"):60118,J=e?Symbol.for("react.scope"):60119;function B(m){if(typeof m=="object"&&m!==null){var ne=m.$$typeof;switch(ne){case n:switch(m=m.type,m){case c:case s:case t:case i:case o:case p:return m;default:switch(m=m&&m.$$typeof,m){case l:case u:case b:case v:case a:return m;default:return ne}}case r:return ne}}}function T(m){return B(m)===s}return V.AsyncMode=c,V.ConcurrentMode=s,V.ContextConsumer=l,V.ContextProvider=a,V.Element=n,V.ForwardRef=u,V.Fragment=t,V.Lazy=b,V.Memo=v,V.Portal=r,V.Profiler=i,V.StrictMode=o,V.Suspense=p,V.isAsyncMode=function(m){return T(m)||B(m)===c},V.isConcurrentMode=T,V.isContextConsumer=function(m){return B(m)===l},V.isContextProvider=function(m){return B(m)===a},V.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===n},V.isForwardRef=function(m){return B(m)===u},V.isFragment=function(m){return B(m)===t},V.isLazy=function(m){return B(m)===b},V.isMemo=function(m){return B(m)===v},V.isPortal=function(m){return B(m)===r},V.isProfiler=function(m){return B(m)===i},V.isStrictMode=function(m){return B(m)===o},V.isSuspense=function(m){return B(m)===p},V.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===t||m===s||m===i||m===o||m===p||m===d||typeof m=="object"&&m!==null&&(m.$$typeof===b||m.$$typeof===v||m.$$typeof===a||m.$$typeof===l||m.$$typeof===u||m.$$typeof===f||m.$$typeof===E||m.$$typeof===J||m.$$typeof===h)},V.typeOf=B,V}var z={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fn;function ct(){return Fn||(Fn=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,n=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,t=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,s=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,b=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,f=e?Symbol.for("react.fundamental"):60117,E=e?Symbol.for("react.responder"):60118,J=e?Symbol.for("react.scope"):60119;function B(y){return typeof y=="string"||typeof y=="function"||y===t||y===s||y===i||y===o||y===p||y===d||typeof y=="object"&&y!==null&&(y.$$typeof===b||y.$$typeof===v||y.$$typeof===a||y.$$typeof===l||y.$$typeof===u||y.$$typeof===f||y.$$typeof===E||y.$$typeof===J||y.$$typeof===h)}function T(y){if(typeof y=="object"&&y!==null){var se=y.$$typeof;switch(se){case n:var k=y.type;switch(k){case c:case s:case t:case i:case o:case p:return k;default:var Re=k&&k.$$typeof;switch(Re){case l:case u:case b:case v:case a:return Re;default:return se}}case r:return se}}}var m=c,ne=s,oe=l,he=a,de=n,C=u,G=t,ee=b,ie=v,Q=r,W=i,te=o,fe=p,we=!1;function $e(y){return we||(we=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),g(y)||T(y)===c}function g(y){return T(y)===s}function x(y){return T(y)===l}function R(y){return T(y)===a}function O(y){return typeof y=="object"&&y!==null&&y.$$typeof===n}function w(y){return T(y)===u}function A(y){return T(y)===t}function _(y){return T(y)===b}function $(y){return T(y)===v}function I(y){return T(y)===r}function D(y){return T(y)===i}function M(y){return T(y)===o}function re(y){return T(y)===p}z.AsyncMode=m,z.ConcurrentMode=ne,z.ContextConsumer=oe,z.ContextProvider=he,z.Element=de,z.ForwardRef=C,z.Fragment=G,z.Lazy=ee,z.Memo=ie,z.Portal=Q,z.Profiler=W,z.StrictMode=te,z.Suspense=fe,z.isAsyncMode=$e,z.isConcurrentMode=g,z.isContextConsumer=x,z.isContextProvider=R,z.isElement=O,z.isForwardRef=w,z.isFragment=A,z.isLazy=_,z.isMemo=$,z.isPortal=I,z.isProfiler=D,z.isStrictMode=M,z.isSuspense=re,z.isValidElementType=B,z.typeOf=T}()),z}var Un;function wr(){return Un||(Un=1,process.env.NODE_ENV==="production"?Ye.exports=st():Ye.exports=ct()),Ye.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var pn,qn;function lt(){if(qn)return pn;qn=1;var e=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function t(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var a={},l=0;l<10;l++)a["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(a).map(function(u){return a[u]});if(c.join("")!=="0123456789")return!1;var s={};return"abcdefghijklmnopqrst".split("").forEach(function(u){s[u]=u}),Object.keys(Object.assign({},s)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return pn=o()?Object.assign:function(i,a){for(var l,c=t(i),s,u=1;u<arguments.length;u++){l=Object(arguments[u]);for(var p in l)n.call(l,p)&&(c[p]=l[p]);if(e){s=e(l);for(var d=0;d<s.length;d++)r.call(l,s[d])&&(c[s[d]]=l[s[d]])}}return c},pn}var hn,Gn;function _n(){if(Gn)return hn;Gn=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return hn=e,hn}var mn,Wn;function Tr(){return Wn||(Wn=1,mn=Function.call.bind(Object.prototype.hasOwnProperty)),mn}var gn,Hn;function ut(){if(Hn)return gn;Hn=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var n=_n(),r={},t=Tr();e=function(i){var a="Warning: "+i;typeof console<"u"&&console.error(a);try{throw new Error(a)}catch{}}}function o(i,a,l,c,s){if(process.env.NODE_ENV!=="production"){for(var u in i)if(t(i,u)){var p;try{if(typeof i[u]!="function"){var d=Error((c||"React class")+": "+l+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw d.name="Invariant Violation",d}p=i[u](a,u,c,l,null,n)}catch(b){p=b}if(p&&!(p instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+u+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof p+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),p instanceof Error&&!(p.message in r)){r[p.message]=!0;var v=s?s():"";e("Failed "+l+" type: "+p.message+(v??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(r={})},gn=o,gn}var bn,Xn;function dt(){if(Xn)return bn;Xn=1;var e=wr(),n=lt(),r=_n(),t=Tr(),o=ut(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function a(){return null}return bn=function(l,c){var s=typeof Symbol=="function"&&Symbol.iterator,u="@@iterator";function p(g){var x=g&&(s&&g[s]||g[u]);if(typeof x=="function")return x}var d="<<anonymous>>",v={array:E("array"),bigint:E("bigint"),bool:E("boolean"),func:E("function"),number:E("number"),object:E("object"),string:E("string"),symbol:E("symbol"),any:J(),arrayOf:B,element:T(),elementType:m(),instanceOf:ne,node:C(),objectOf:he,oneOf:oe,oneOfType:de,shape:ee,exact:ie};function b(g,x){return g===x?g!==0||1/g===1/x:g!==g&&x!==x}function h(g,x){this.message=g,this.data=x&&typeof x=="object"?x:{},this.stack=""}h.prototype=Error.prototype;function f(g){if(process.env.NODE_ENV!=="production")var x={},R=0;function O(A,_,$,I,D,M,re){if(I=I||d,M=M||$,re!==r){if(c){var y=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw y.name="Invariant Violation",y}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var se=I+":"+$;!x[se]&&R<3&&(i("You are manually calling a React.PropTypes validation function for the `"+M+"` prop on `"+I+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),x[se]=!0,R++)}}return _[$]==null?A?_[$]===null?new h("The "+D+" `"+M+"` is marked as required "+("in `"+I+"`, but its value is `null`.")):new h("The "+D+" `"+M+"` is marked as required in "+("`"+I+"`, but its value is `undefined`.")):null:g(_,$,I,D,M)}var w=O.bind(null,!1);return w.isRequired=O.bind(null,!0),w}function E(g){function x(R,O,w,A,_,$){var I=R[O],D=te(I);if(D!==g){var M=fe(I);return new h("Invalid "+A+" `"+_+"` of type "+("`"+M+"` supplied to `"+w+"`, expected ")+("`"+g+"`."),{expectedType:g})}return null}return f(x)}function J(){return f(a)}function B(g){function x(R,O,w,A,_){if(typeof g!="function")return new h("Property `"+_+"` of component `"+w+"` has invalid PropType notation inside arrayOf.");var $=R[O];if(!Array.isArray($)){var I=te($);return new h("Invalid "+A+" `"+_+"` of type "+("`"+I+"` supplied to `"+w+"`, expected an array."))}for(var D=0;D<$.length;D++){var M=g($,D,w,A,_+"["+D+"]",r);if(M instanceof Error)return M}return null}return f(x)}function T(){function g(x,R,O,w,A){var _=x[R];if(!l(_)){var $=te(_);return new h("Invalid "+w+" `"+A+"` of type "+("`"+$+"` supplied to `"+O+"`, expected a single ReactElement."))}return null}return f(g)}function m(){function g(x,R,O,w,A){var _=x[R];if(!e.isValidElementType(_)){var $=te(_);return new h("Invalid "+w+" `"+A+"` of type "+("`"+$+"` supplied to `"+O+"`, expected a single ReactElement type."))}return null}return f(g)}function ne(g){function x(R,O,w,A,_){if(!(R[O]instanceof g)){var $=g.name||d,I=$e(R[O]);return new h("Invalid "+A+" `"+_+"` of type "+("`"+I+"` supplied to `"+w+"`, expected ")+("instance of `"+$+"`."))}return null}return f(x)}function oe(g){if(!Array.isArray(g))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),a;function x(R,O,w,A,_){for(var $=R[O],I=0;I<g.length;I++)if(b($,g[I]))return null;var D=JSON.stringify(g,function(re,y){var se=fe(y);return se==="symbol"?String(y):y});return new h("Invalid "+A+" `"+_+"` of value `"+String($)+"` "+("supplied to `"+w+"`, expected one of "+D+"."))}return f(x)}function he(g){function x(R,O,w,A,_){if(typeof g!="function")return new h("Property `"+_+"` of component `"+w+"` has invalid PropType notation inside objectOf.");var $=R[O],I=te($);if(I!=="object")return new h("Invalid "+A+" `"+_+"` of type "+("`"+I+"` supplied to `"+w+"`, expected an object."));for(var D in $)if(t($,D)){var M=g($,D,w,A,_+"."+D,r);if(M instanceof Error)return M}return null}return f(x)}function de(g){if(!Array.isArray(g))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),a;for(var x=0;x<g.length;x++){var R=g[x];if(typeof R!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+we(R)+" at index "+x+"."),a}function O(w,A,_,$,I){for(var D=[],M=0;M<g.length;M++){var re=g[M],y=re(w,A,_,$,I,r);if(y==null)return null;y.data&&t(y.data,"expectedType")&&D.push(y.data.expectedType)}var se=D.length>0?", expected one of type ["+D.join(", ")+"]":"";return new h("Invalid "+$+" `"+I+"` supplied to "+("`"+_+"`"+se+"."))}return f(O)}function C(){function g(x,R,O,w,A){return Q(x[R])?null:new h("Invalid "+w+" `"+A+"` supplied to "+("`"+O+"`, expected a ReactNode."))}return f(g)}function G(g,x,R,O,w){return new h((g||"React class")+": "+x+" type `"+R+"."+O+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+w+"`.")}function ee(g){function x(R,O,w,A,_){var $=R[O],I=te($);if(I!=="object")return new h("Invalid "+A+" `"+_+"` of type `"+I+"` "+("supplied to `"+w+"`, expected `object`."));for(var D in g){var M=g[D];if(typeof M!="function")return G(w,A,_,D,fe(M));var re=M($,D,w,A,_+"."+D,r);if(re)return re}return null}return f(x)}function ie(g){function x(R,O,w,A,_){var $=R[O],I=te($);if(I!=="object")return new h("Invalid "+A+" `"+_+"` of type `"+I+"` "+("supplied to `"+w+"`, expected `object`."));var D=n({},R[O],g);for(var M in D){var re=g[M];if(t(g,M)&&typeof re!="function")return G(w,A,_,M,fe(re));if(!re)return new h("Invalid "+A+" `"+_+"` key `"+M+"` supplied to `"+w+"`.\nBad object: "+JSON.stringify(R[O],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(g),null,"  "));var y=re($,M,w,A,_+"."+M,r);if(y)return y}return null}return f(x)}function Q(g){switch(typeof g){case"number":case"string":case"undefined":return!0;case"boolean":return!g;case"object":if(Array.isArray(g))return g.every(Q);if(g===null||l(g))return!0;var x=p(g);if(x){var R=x.call(g),O;if(x!==g.entries){for(;!(O=R.next()).done;)if(!Q(O.value))return!1}else for(;!(O=R.next()).done;){var w=O.value;if(w&&!Q(w[1]))return!1}}else return!1;return!0;default:return!1}}function W(g,x){return g==="symbol"?!0:x?x["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&x instanceof Symbol:!1}function te(g){var x=typeof g;return Array.isArray(g)?"array":g instanceof RegExp?"object":W(x,g)?"symbol":x}function fe(g){if(typeof g>"u"||g===null)return""+g;var x=te(g);if(x==="object"){if(g instanceof Date)return"date";if(g instanceof RegExp)return"regexp"}return x}function we(g){var x=fe(g);switch(x){case"array":case"object":return"an "+x;case"boolean":case"date":case"regexp":return"a "+x;default:return x}}function $e(g){return!g.constructor||!g.constructor.name?d:g.constructor.name}return v.checkPropTypes=o,v.resetWarningCache=o.resetWarningCache,v.PropTypes=v,v},bn}var yn,Yn;function ft(){if(Yn)return yn;Yn=1;var e=_n();function n(){}function r(){}return r.resetWarningCache=n,yn=function(){function t(a,l,c,s,u,p){if(p!==e){var d=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw d.name="Invariant Violation",d}}t.isRequired=t;function o(){return t}var i={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:o,element:t,elementType:t,instanceOf:o,node:t,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:r,resetWarningCache:n};return i.PropTypes=i,i},yn}if(process.env.NODE_ENV!=="production"){var pt=wr(),ht=!0;Sn.exports=dt()(pt.isElement,ht)}else Sn.exports=ft()();var mt=Sn.exports;const U=at(mt);function Be(e){let n="https://mui.com/production-error/?code="+e;for(let r=1;r<arguments.length;r+=1)n+="&args[]="+encodeURIComponent(arguments[r]);return"Minified MUI error #"+e+"; visit "+n+" for the full message."}var En={exports:{}},L={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Kn;function gt(){if(Kn)return L;Kn=1;var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),t=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),s=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),b;b=Symbol.for("react.module.reference");function h(f){if(typeof f=="object"&&f!==null){var E=f.$$typeof;switch(E){case e:switch(f=f.type,f){case r:case o:case t:case s:case u:return f;default:switch(f=f&&f.$$typeof,f){case l:case a:case c:case d:case p:case i:return f;default:return E}}case n:return E}}}return L.ContextConsumer=a,L.ContextProvider=i,L.Element=e,L.ForwardRef=c,L.Fragment=r,L.Lazy=d,L.Memo=p,L.Portal=n,L.Profiler=o,L.StrictMode=t,L.Suspense=s,L.SuspenseList=u,L.isAsyncMode=function(){return!1},L.isConcurrentMode=function(){return!1},L.isContextConsumer=function(f){return h(f)===a},L.isContextProvider=function(f){return h(f)===i},L.isElement=function(f){return typeof f=="object"&&f!==null&&f.$$typeof===e},L.isForwardRef=function(f){return h(f)===c},L.isFragment=function(f){return h(f)===r},L.isLazy=function(f){return h(f)===d},L.isMemo=function(f){return h(f)===p},L.isPortal=function(f){return h(f)===n},L.isProfiler=function(f){return h(f)===o},L.isStrictMode=function(f){return h(f)===t},L.isSuspense=function(f){return h(f)===s},L.isSuspenseList=function(f){return h(f)===u},L.isValidElementType=function(f){return typeof f=="string"||typeof f=="function"||f===r||f===o||f===t||f===s||f===u||f===v||typeof f=="object"&&f!==null&&(f.$$typeof===d||f.$$typeof===p||f.$$typeof===i||f.$$typeof===a||f.$$typeof===c||f.$$typeof===b||f.getModuleId!==void 0)},L.typeOf=h,L}var F={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Jn;function bt(){return Jn||(Jn=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),t=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),s=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),b=!1,h=!1,f=!1,E=!1,J=!1,B;B=Symbol.for("react.module.reference");function T(k){return!!(typeof k=="string"||typeof k=="function"||k===r||k===o||J||k===t||k===s||k===u||E||k===v||b||h||f||typeof k=="object"&&k!==null&&(k.$$typeof===d||k.$$typeof===p||k.$$typeof===i||k.$$typeof===a||k.$$typeof===c||k.$$typeof===B||k.getModuleId!==void 0))}function m(k){if(typeof k=="object"&&k!==null){var Re=k.$$typeof;switch(Re){case e:var Xe=k.type;switch(Xe){case r:case o:case t:case s:case u:return Xe;default:var jn=Xe&&Xe.$$typeof;switch(jn){case l:case a:case c:case d:case p:case i:return jn;default:return Re}}case n:return Re}}}var ne=a,oe=i,he=e,de=c,C=r,G=d,ee=p,ie=n,Q=o,W=t,te=s,fe=u,we=!1,$e=!1;function g(k){return we||(we=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function x(k){return $e||($e=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function R(k){return m(k)===a}function O(k){return m(k)===i}function w(k){return typeof k=="object"&&k!==null&&k.$$typeof===e}function A(k){return m(k)===c}function _(k){return m(k)===r}function $(k){return m(k)===d}function I(k){return m(k)===p}function D(k){return m(k)===n}function M(k){return m(k)===o}function re(k){return m(k)===t}function y(k){return m(k)===s}function se(k){return m(k)===u}F.ContextConsumer=ne,F.ContextProvider=oe,F.Element=he,F.ForwardRef=de,F.Fragment=C,F.Lazy=G,F.Memo=ee,F.Portal=ie,F.Profiler=Q,F.StrictMode=W,F.Suspense=te,F.SuspenseList=fe,F.isAsyncMode=g,F.isConcurrentMode=x,F.isContextConsumer=R,F.isContextProvider=O,F.isElement=w,F.isForwardRef=A,F.isFragment=_,F.isLazy=$,F.isMemo=I,F.isPortal=D,F.isProfiler=M,F.isStrictMode=re,F.isSuspense=y,F.isSuspenseList=se,F.isValidElementType=T,F.typeOf=m}()),F}process.env.NODE_ENV==="production"?En.exports=gt():En.exports=bt();var Zn=En.exports;const yt=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function vt(e){const n=`${e}`.match(yt);return n&&n[1]||""}function Cr(e,n=""){return e.displayName||e.name||vt(e)||n}function Qn(e,n,r){const t=Cr(n);return e.displayName||(t!==""?`${r}(${t})`:r)}function xt(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Cr(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Zn.ForwardRef:return Qn(e,e.render,"ForwardRef");case Zn.Memo:return Qn(e,e.type,"memo");default:return}}}function ge(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Be(7));return e.charAt(0).toUpperCase()+e.slice(1)}function _r(e,n){const r=j({},n);return Object.keys(e).forEach(t=>{if(t.toString().match(/^(components|slots)$/))r[t]=j({},e[t],r[t]);else if(t.toString().match(/^(componentsProps|slotProps)$/)){const o=e[t]||{},i=n[t];r[t]={},!i||!Object.keys(i)?r[t]=o:!o||!Object.keys(o)?r[t]=i:(r[t]=j({},i),Object.keys(o).forEach(a=>{r[t][a]=_r(o[a],i[a])}))}else r[t]===void 0&&(r[t]=e[t])}),r}function kt(e,n,r=void 0){const t={};return Object.keys(e).forEach(o=>{t[o]=e[o].reduce((i,a)=>{if(a){const l=n(a);l!==""&&i.push(l),r&&r[a]&&i.push(r[a])}return i},[]).join(" ")}),t}const er=e=>e,St=()=>{let e=er;return{configure(n){e=n},generate(n){return e(n)},reset(){e=er}}},Et=St(),wt=Et,Tt={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function On(e,n,r="Mui"){const t=Tt[n];return t?`${r}-${t}`:`${wt.generate(e)}-${n}`}function Ct(e,n,r="Mui"){const t={};return n.forEach(o=>{t[o]=On(e,o,r)}),t}function _t(e,n=Number.MIN_SAFE_INTEGER,r=Number.MAX_SAFE_INTEGER){return Math.max(n,Math.min(e,r))}function xe(e,n){if(e==null)return{};var r={},t=Object.keys(e),o,i;for(i=0;i<t.length;i++)o=t[i],!(n.indexOf(o)>=0)&&(r[o]=e[o]);return r}function Or(e){var n,r,t="";if(typeof e=="string"||typeof e=="number")t+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(n=0;n<o;n++)e[n]&&(r=Or(e[n]))&&(t&&(t+=" "),t+=r)}else for(r in e)e[r]&&(t&&(t+=" "),t+=r);return t}function Ot(){for(var e,n,r=0,t="",o=arguments.length;r<o;r++)(e=arguments[r])&&(n=Or(e))&&(t&&(t+=" "),t+=n);return t}const $t=["values","unit","step"],Rt=e=>{const n=Object.keys(e).map(r=>({key:r,val:e[r]}))||[];return n.sort((r,t)=>r.val-t.val),n.reduce((r,t)=>j({},r,{[t.key]:t.val}),{})};function Nt(e){const{values:n={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:r="px",step:t=5}=e,o=xe(e,$t),i=Rt(n),a=Object.keys(i);function l(d){return`@media (min-width:${typeof n[d]=="number"?n[d]:d}${r})`}function c(d){return`@media (max-width:${(typeof n[d]=="number"?n[d]:d)-t/100}${r})`}function s(d,v){const b=a.indexOf(v);return`@media (min-width:${typeof n[d]=="number"?n[d]:d}${r}) and (max-width:${(b!==-1&&typeof n[a[b]]=="number"?n[a[b]]:v)-t/100}${r})`}function u(d){return a.indexOf(d)+1<a.length?s(d,a[a.indexOf(d)+1]):l(d)}function p(d){const v=a.indexOf(d);return v===0?l(a[1]):v===a.length-1?c(a[v]):s(d,a[a.indexOf(d)+1]).replace("@media","@media not all and")}return j({keys:a,values:i,up:l,down:c,between:s,only:u,not:p,unit:r},o)}const Pt={borderRadius:4},At=Pt,It=process.env.NODE_ENV!=="production"?U.oneOfType([U.number,U.string,U.object,U.array]):{},Ee=It;function Fe(e,n){return n?pe(e,n,{clone:!1}):e}const $n={xs:0,sm:600,md:900,lg:1200,xl:1536},nr={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${$n[e]}px)`};function ve(e,n,r){const t=e.theme||{};if(Array.isArray(n)){const i=t.breakpoints||nr;return n.reduce((a,l,c)=>(a[i.up(i.keys[c])]=r(n[c]),a),{})}if(typeof n=="object"){const i=t.breakpoints||nr;return Object.keys(n).reduce((a,l)=>{if(Object.keys(i.values||$n).indexOf(l)!==-1){const c=i.up(l);a[c]=r(n[l],l)}else{const c=l;a[c]=n[c]}return a},{})}return r(n)}function Mt(e={}){var n;return((n=e.keys)==null?void 0:n.reduce((t,o)=>{const i=e.up(o);return t[i]={},t},{}))||{}}function jt(e,n){return e.reduce((r,t)=>{const o=r[t];return(!o||Object.keys(o).length===0)&&delete r[t],r},n)}function rn(e,n,r=!0){if(!n||typeof n!="string")return null;if(e&&e.vars&&r){const t=`vars.${n}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(t!=null)return t}return n.split(".").reduce((t,o)=>t&&t[o]!=null?t[o]:null,e)}function Qe(e,n,r,t=r){let o;return typeof e=="function"?o=e(r):Array.isArray(e)?o=e[r]||t:o=rn(e,r)||t,n&&(o=n(o,t,e)),o}function K(e){const{prop:n,cssProperty:r=e.prop,themeKey:t,transform:o}=e,i=a=>{if(a[n]==null)return null;const l=a[n],c=a.theme,s=rn(c,t)||{};return ve(a,l,p=>{let d=Qe(s,o,p);return p===d&&typeof p=="string"&&(d=Qe(s,o,`${n}${p==="default"?"":ge(p)}`,p)),r===!1?d:{[r]:d}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[n]:Ee}:{},i.filterProps=[n],i}function Bt(e){const n={};return r=>(n[r]===void 0&&(n[r]=e(r)),n[r])}const Dt={m:"margin",p:"padding"},Vt={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},rr={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},zt=Bt(e=>{if(e.length>2)if(rr[e])e=rr[e];else return[e];const[n,r]=e.split(""),t=Dt[n],o=Vt[r]||"";return Array.isArray(o)?o.map(i=>t+i):[t+o]}),tn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],on=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Lt=[...tn,...on];function We(e,n,r,t){var o;const i=(o=rn(e,n,!1))!=null?o:r;return typeof i=="number"?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&typeof a!="number"&&console.error(`MUI: Expected ${t} argument to be a number or a string, got ${a}.`),i*a):Array.isArray(i)?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&(Number.isInteger(a)?a>i.length-1&&console.error([`MUI: The value provided (${a}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${a} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${n}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${n}\` as a number.`].join(`
`))),i[a]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${n}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function $r(e){return We(e,"spacing",8,"spacing")}function He(e,n){if(typeof n=="string"||n==null)return n;const r=Math.abs(n),t=e(r);return n>=0?t:typeof t=="number"?-t:`-${t}`}function Ft(e,n){return r=>e.reduce((t,o)=>(t[o]=He(n,r),t),{})}function Ut(e,n,r,t){if(n.indexOf(r)===-1)return null;const o=zt(r),i=Ft(o,t),a=e[r];return ve(e,a,i)}function Rr(e,n){const r=$r(e.theme);return Object.keys(e).map(t=>Ut(e,n,t,r)).reduce(Fe,{})}function H(e){return Rr(e,tn)}H.propTypes=process.env.NODE_ENV!=="production"?tn.reduce((e,n)=>(e[n]=Ee,e),{}):{};H.filterProps=tn;function X(e){return Rr(e,on)}X.propTypes=process.env.NODE_ENV!=="production"?on.reduce((e,n)=>(e[n]=Ee,e),{}):{};X.filterProps=on;process.env.NODE_ENV!=="production"&&Lt.reduce((e,n)=>(e[n]=Ee,e),{});function qt(e=8){if(e.mui)return e;const n=$r({spacing:e}),r=(...t)=>(process.env.NODE_ENV!=="production"&&(t.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${t.length}`)),(t.length===0?[1]:t).map(i=>{const a=n(i);return typeof a=="number"?`${a}px`:a}).join(" "));return r.mui=!0,r}function an(...e){const n=e.reduce((t,o)=>(o.filterProps.forEach(i=>{t[i]=o}),t),{}),r=t=>Object.keys(t).reduce((o,i)=>n[i]?Fe(o,n[i](t)):o,{});return r.propTypes=process.env.NODE_ENV!=="production"?e.reduce((t,o)=>Object.assign(t,o.propTypes),{}):{},r.filterProps=e.reduce((t,o)=>t.concat(o.filterProps),[]),r}function le(e){return typeof e!="number"?e:`${e}px solid`}function ue(e,n){return K({prop:e,themeKey:"borders",transform:n})}const Gt=ue("border",le),Wt=ue("borderTop",le),Ht=ue("borderRight",le),Xt=ue("borderBottom",le),Yt=ue("borderLeft",le),Kt=ue("borderColor"),Jt=ue("borderTopColor"),Zt=ue("borderRightColor"),Qt=ue("borderBottomColor"),eo=ue("borderLeftColor"),no=ue("outline",le),ro=ue("outlineColor"),sn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const n=We(e.theme,"shape.borderRadius",4,"borderRadius"),r=t=>({borderRadius:He(n,t)});return ve(e,e.borderRadius,r)}return null};sn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:Ee}:{};sn.filterProps=["borderRadius"];an(Gt,Wt,Ht,Xt,Yt,Kt,Jt,Zt,Qt,eo,sn,no,ro);const cn=e=>{if(e.gap!==void 0&&e.gap!==null){const n=We(e.theme,"spacing",8,"gap"),r=t=>({gap:He(n,t)});return ve(e,e.gap,r)}return null};cn.propTypes=process.env.NODE_ENV!=="production"?{gap:Ee}:{};cn.filterProps=["gap"];const ln=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const n=We(e.theme,"spacing",8,"columnGap"),r=t=>({columnGap:He(n,t)});return ve(e,e.columnGap,r)}return null};ln.propTypes=process.env.NODE_ENV!=="production"?{columnGap:Ee}:{};ln.filterProps=["columnGap"];const un=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const n=We(e.theme,"spacing",8,"rowGap"),r=t=>({rowGap:He(n,t)});return ve(e,e.rowGap,r)}return null};un.propTypes=process.env.NODE_ENV!=="production"?{rowGap:Ee}:{};un.filterProps=["rowGap"];const to=K({prop:"gridColumn"}),oo=K({prop:"gridRow"}),io=K({prop:"gridAutoFlow"}),ao=K({prop:"gridAutoColumns"}),so=K({prop:"gridAutoRows"}),co=K({prop:"gridTemplateColumns"}),lo=K({prop:"gridTemplateRows"}),uo=K({prop:"gridTemplateAreas"}),fo=K({prop:"gridArea"});an(cn,ln,un,to,oo,io,ao,so,co,lo,uo,fo);function je(e,n){return n==="grey"?n:e}const po=K({prop:"color",themeKey:"palette",transform:je}),ho=K({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:je}),mo=K({prop:"backgroundColor",themeKey:"palette",transform:je});an(po,ho,mo);function ae(e){return e<=1&&e!==0?`${e*100}%`:e}const go=K({prop:"width",transform:ae}),Rn=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const n=r=>{var t,o;const i=((t=e.theme)==null||(t=t.breakpoints)==null||(t=t.values)==null?void 0:t[r])||$n[r];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:ae(r)}};return ve(e,e.maxWidth,n)}return null};Rn.filterProps=["maxWidth"];const bo=K({prop:"minWidth",transform:ae}),yo=K({prop:"height",transform:ae}),vo=K({prop:"maxHeight",transform:ae}),xo=K({prop:"minHeight",transform:ae});K({prop:"size",cssProperty:"width",transform:ae});K({prop:"size",cssProperty:"height",transform:ae});const ko=K({prop:"boxSizing"});an(go,Rn,bo,yo,vo,xo,ko);const So={border:{themeKey:"borders",transform:le},borderTop:{themeKey:"borders",transform:le},borderRight:{themeKey:"borders",transform:le},borderBottom:{themeKey:"borders",transform:le},borderLeft:{themeKey:"borders",transform:le},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:le},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:sn},color:{themeKey:"palette",transform:je},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:je},backgroundColor:{themeKey:"palette",transform:je},p:{style:X},pt:{style:X},pr:{style:X},pb:{style:X},pl:{style:X},px:{style:X},py:{style:X},padding:{style:X},paddingTop:{style:X},paddingRight:{style:X},paddingBottom:{style:X},paddingLeft:{style:X},paddingX:{style:X},paddingY:{style:X},paddingInline:{style:X},paddingInlineStart:{style:X},paddingInlineEnd:{style:X},paddingBlock:{style:X},paddingBlockStart:{style:X},paddingBlockEnd:{style:X},m:{style:H},mt:{style:H},mr:{style:H},mb:{style:H},ml:{style:H},mx:{style:H},my:{style:H},margin:{style:H},marginTop:{style:H},marginRight:{style:H},marginBottom:{style:H},marginLeft:{style:H},marginX:{style:H},marginY:{style:H},marginInline:{style:H},marginInlineStart:{style:H},marginInlineEnd:{style:H},marginBlock:{style:H},marginBlockStart:{style:H},marginBlockEnd:{style:H},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:cn},rowGap:{style:un},columnGap:{style:ln},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:ae},maxWidth:{style:Rn},minWidth:{transform:ae},height:{transform:ae},maxHeight:{transform:ae},minHeight:{transform:ae},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Nn=So;function Eo(...e){const n=e.reduce((t,o)=>t.concat(Object.keys(o)),[]),r=new Set(n);return e.every(t=>r.size===Object.keys(t).length)}function wo(e,n){return typeof e=="function"?e(n):e}function To(){function e(r,t,o,i){const a={[r]:t,theme:o},l=i[r];if(!l)return{[r]:t};const{cssProperty:c=r,themeKey:s,transform:u,style:p}=l;if(t==null)return null;if(s==="typography"&&t==="inherit")return{[r]:t};const d=rn(o,s)||{};return p?p(a):ve(a,t,b=>{let h=Qe(d,u,b);return b===h&&typeof b=="string"&&(h=Qe(d,u,`${r}${b==="default"?"":ge(b)}`,b)),c===!1?h:{[c]:h}})}function n(r){var t;const{sx:o,theme:i={}}=r||{};if(!o)return null;const a=(t=i.unstable_sxConfig)!=null?t:Nn;function l(c){let s=c;if(typeof c=="function")s=c(i);else if(typeof c!="object")return c;if(!s)return null;const u=Mt(i.breakpoints),p=Object.keys(u);let d=u;return Object.keys(s).forEach(v=>{const b=wo(s[v],i);if(b!=null)if(typeof b=="object")if(a[v])d=Fe(d,e(v,b,i,a));else{const h=ve({theme:i},b,f=>({[v]:f}));Eo(h,b)?d[v]=n({sx:b,theme:i}):d=Fe(d,h)}else d=Fe(d,e(v,b,i,a))}),jt(p,d)}return Array.isArray(o)?o.map(l):l(o)}return n}const Nr=To();Nr.filterProps=["sx"];const Pn=Nr,Co=["breakpoints","palette","spacing","shape"];function An(e={},...n){const{breakpoints:r={},palette:t={},spacing:o,shape:i={}}=e,a=xe(e,Co),l=Nt(r),c=qt(o);let s=pe({breakpoints:l,direction:"ltr",components:{},palette:j({mode:"light"},t),spacing:c,shape:j({},At,i)},a);return s=n.reduce((u,p)=>pe(u,p),s),s.unstable_sxConfig=j({},Nn,a==null?void 0:a.unstable_sxConfig),s.unstable_sx=function(p){return Pn({sx:p,theme:this})},s}function _o(e){return Object.keys(e).length===0}function Oo(e=null){const n=Ue.useContext(kn.ThemeContext);return!n||_o(n)?e:n}const $o=An();function Ro(e=$o){return Oo(e)}const No=["variant"];function tr(e){return e.length===0}function Pr(e){const{variant:n}=e,r=xe(e,No);let t=n||"";return Object.keys(r).sort().forEach(o=>{o==="color"?t+=tr(t)?e[o]:ge(e[o]):t+=`${tr(t)?o:ge(o)}${ge(e[o].toString())}`}),t}const Po=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Ao(e){return Object.keys(e).length===0}function Io(e){return typeof e=="string"&&e.charCodeAt(0)>96}const Mo=(e,n)=>n.components&&n.components[e]&&n.components[e].styleOverrides?n.components[e].styleOverrides:null,en=e=>{let n=0;const r={};return e&&e.forEach(t=>{let o="";typeof t.props=="function"?(o=`callback${n}`,n+=1):o=Pr(t.props),r[o]=t.style}),r},jo=(e,n)=>{let r=[];return n&&n.components&&n.components[e]&&n.components[e].variants&&(r=n.components[e].variants),en(r)},nn=(e,n,r)=>{const{ownerState:t={}}=e,o=[];let i=0;return r&&r.forEach(a=>{let l=!0;if(typeof a.props=="function"){const c=j({},e,t);l=a.props(c)}else Object.keys(a.props).forEach(c=>{t[c]!==a.props[c]&&e[c]!==a.props[c]&&(l=!1)});l&&(typeof a.props=="function"?o.push(n[`callback${i}`]):o.push(n[Pr(a.props)])),typeof a.props=="function"&&(i+=1)}),o},Bo=(e,n,r,t)=>{var o;const i=r==null||(o=r.components)==null||(o=o[t])==null?void 0:o.variants;return nn(e,n,i)};function Ke(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Do=An(),or=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Je({defaultTheme:e,theme:n,themeId:r}){return Ao(n)?e:n[r]||n}function Vo(e){return e?(n,r)=>r[e]:null}const ir=({styledArg:e,props:n,defaultTheme:r,themeId:t})=>{const o=e(j({},n,{theme:Je(j({},n,{defaultTheme:r,themeId:t}))}));let i;if(o&&o.variants&&(i=o.variants,delete o.variants),i){const a=nn(n,en(i),i);return[o,...a]}return o};function zo(e={}){const{themeId:n,defaultTheme:r=Do,rootShouldForwardProp:t=Ke,slotShouldForwardProp:o=Ke}=e,i=a=>Pn(j({},a,{theme:Je(j({},a,{defaultTheme:r,themeId:n}))}));return i.__mui_systemSx=!0,(a,l={})=>{kn.internal_processStyles(a,T=>T.filter(m=>!(m!=null&&m.__mui_systemSx)));const{name:c,slot:s,skipVariantsResolver:u,skipSx:p,overridesResolver:d=Vo(or(s))}=l,v=xe(l,Po),b=u!==void 0?u:s&&s!=="Root"&&s!=="root"||!1,h=p||!1;let f;process.env.NODE_ENV!=="production"&&c&&(f=`${c}-${or(s||"Root")}`);let E=Ke;s==="Root"||s==="root"?E=t:s?E=o:Io(a)&&(E=void 0);const J=kn(a,j({shouldForwardProp:E,label:f},v)),B=(T,...m)=>{const ne=m?m.map(C=>{if(typeof C=="function"&&C.__emotion_real!==C)return G=>ir({styledArg:C,props:G,defaultTheme:r,themeId:n});if(Se(C)){let G=C,ee;return C&&C.variants&&(ee=C.variants,delete G.variants,G=ie=>{let Q=C;return nn(ie,en(ee),ee).forEach(te=>{Q=pe(Q,te)}),Q}),G}return C}):[];let oe=T;if(Se(T)){let C;T&&T.variants&&(C=T.variants,delete oe.variants,oe=G=>{let ee=T;return nn(G,en(C),C).forEach(Q=>{ee=pe(ee,Q)}),ee})}else typeof T=="function"&&T.__emotion_real!==T&&(oe=C=>ir({styledArg:T,props:C,defaultTheme:r,themeId:n}));c&&d&&ne.push(C=>{const G=Je(j({},C,{defaultTheme:r,themeId:n})),ee=Mo(c,G);if(ee){const ie={};return Object.entries(ee).forEach(([Q,W])=>{ie[Q]=typeof W=="function"?W(j({},C,{theme:G})):W}),d(C,ie)}return null}),c&&!b&&ne.push(C=>{const G=Je(j({},C,{defaultTheme:r,themeId:n}));return Bo(C,jo(c,G),G,c)}),h||ne.push(i);const he=ne.length-m.length;if(Array.isArray(T)&&he>0){const C=new Array(he).fill("");oe=[...T,...C],oe.raw=[...T.raw,...C]}const de=J(oe,...ne);if(process.env.NODE_ENV!=="production"){let C;c&&(C=`${c}${ge(s||"")}`),C===void 0&&(C=`Styled(${xt(a)})`),de.displayName=C}return a.muiName&&(de.muiName=a.muiName),de};return J.withConfig&&(B.withConfig=J.withConfig),B}}function Lo(e){const{theme:n,name:r,props:t}=e;return!n||!n.components||!n.components[r]||!n.components[r].defaultProps?t:_r(n.components[r].defaultProps,t)}function Fo({props:e,name:n,defaultTheme:r,themeId:t}){let o=Ro(r);return t&&(o=o[t]||o),Lo({theme:o,name:n,props:e})}function Ar(e,n=0,r=1){return process.env.NODE_ENV!=="production"&&(e<n||e>r)&&console.error(`MUI: The value provided ${e} is out of range [${n}, ${r}].`),_t(e,n,r)}function Uo(e){e=e.slice(1);const n=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let r=e.match(n);return r&&r[0].length===1&&(r=r.map(t=>t+t)),r?`rgb${r.length===4?"a":""}(${r.map((t,o)=>o<3?parseInt(t,16):Math.round(parseInt(t,16)/255*1e3)/1e3).join(", ")})`:""}function De(e){if(e.type)return e;if(e.charAt(0)==="#")return De(Uo(e));const n=e.indexOf("("),r=e.substring(0,n);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Be(9,e));let t=e.substring(n+1,e.length-1),o;if(r==="color"){if(t=t.split(" "),o=t.shift(),t.length===4&&t[3].charAt(0)==="/"&&(t[3]=t[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Be(10,o))}else t=t.split(",");return t=t.map(i=>parseFloat(i)),{type:r,values:t,colorSpace:o}}function In(e){const{type:n,colorSpace:r}=e;let{values:t}=e;return n.indexOf("rgb")!==-1?t=t.map((o,i)=>i<3?parseInt(o,10):o):n.indexOf("hsl")!==-1&&(t[1]=`${t[1]}%`,t[2]=`${t[2]}%`),n.indexOf("color")!==-1?t=`${r} ${t.join(" ")}`:t=`${t.join(", ")}`,`${n}(${t})`}function qo(e){e=De(e);const{values:n}=e,r=n[0],t=n[1]/100,o=n[2]/100,i=t*Math.min(o,1-o),a=(s,u=(s+r/30)%12)=>o-i*Math.max(Math.min(u-3,9-u,1),-1);let l="rgb";const c=[Math.round(a(0)*255),Math.round(a(8)*255),Math.round(a(4)*255)];return e.type==="hsla"&&(l+="a",c.push(n[3])),In({type:l,values:c})}function ar(e){e=De(e);let n=e.type==="hsl"||e.type==="hsla"?De(qo(e)).values:e.values;return n=n.map(r=>(e.type!=="color"&&(r/=255),r<=.03928?r/12.92:((r+.055)/1.055)**2.4)),Number((.2126*n[0]+.7152*n[1]+.0722*n[2]).toFixed(3))}function sr(e,n){const r=ar(e),t=ar(n);return(Math.max(r,t)+.05)/(Math.min(r,t)+.05)}function Go(e,n){if(e=De(e),n=Ar(n),e.type.indexOf("hsl")!==-1)e.values[2]*=1-n;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]*=1-n;return In(e)}function Wo(e,n){if(e=De(e),n=Ar(n),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*n;else if(e.type.indexOf("rgb")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(255-e.values[r])*n;else if(e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(1-e.values[r])*n;return In(e)}function Ho(e,n){return j({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},n)}const Xo={black:"#000",white:"#fff"},Ge=Xo,Yo={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Ko=Yo,Jo={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ne=Jo,Zo={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Pe=Zo,Qo={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Le=Qo,ei={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ae=ei,ni={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Ie=ni,ri={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Me=ri,ti=["mode","contrastThreshold","tonalOffset"],cr={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Ge.white,default:Ge.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},vn={text:{primary:Ge.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Ge.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function lr(e,n,r,t){const o=t.light||t,i=t.dark||t*1.5;e[n]||(e.hasOwnProperty(r)?e[n]=e[r]:n==="light"?e.light=Wo(e.main,o):n==="dark"&&(e.dark=Go(e.main,i)))}function oi(e="light"){return e==="dark"?{main:Ae[200],light:Ae[50],dark:Ae[400]}:{main:Ae[700],light:Ae[400],dark:Ae[800]}}function ii(e="light"){return e==="dark"?{main:Ne[200],light:Ne[50],dark:Ne[400]}:{main:Ne[500],light:Ne[300],dark:Ne[700]}}function ai(e="light"){return e==="dark"?{main:Pe[500],light:Pe[300],dark:Pe[700]}:{main:Pe[700],light:Pe[400],dark:Pe[800]}}function si(e="light"){return e==="dark"?{main:Ie[400],light:Ie[300],dark:Ie[700]}:{main:Ie[700],light:Ie[500],dark:Ie[900]}}function ci(e="light"){return e==="dark"?{main:Me[400],light:Me[300],dark:Me[700]}:{main:Me[800],light:Me[500],dark:Me[900]}}function li(e="light"){return e==="dark"?{main:Le[400],light:Le[300],dark:Le[700]}:{main:"#ed6c02",light:Le[500],dark:Le[900]}}function ui(e){const{mode:n="light",contrastThreshold:r=3,tonalOffset:t=.2}=e,o=xe(e,ti),i=e.primary||oi(n),a=e.secondary||ii(n),l=e.error||ai(n),c=e.info||si(n),s=e.success||ci(n),u=e.warning||li(n);function p(h){const f=sr(h,vn.text.primary)>=r?vn.text.primary:cr.text.primary;if(process.env.NODE_ENV!=="production"){const E=sr(h,f);E<3&&console.error([`MUI: The contrast ratio of ${E}:1 for ${f} on ${h}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return f}const d=({color:h,name:f,mainShade:E=500,lightShade:J=300,darkShade:B=700})=>{if(h=j({},h),!h.main&&h[E]&&(h.main=h[E]),!h.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${f?` (${f})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.`:Be(11,f?` (${f})`:"",E));if(typeof h.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${f?` (${f})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Be(12,f?` (${f})`:"",JSON.stringify(h.main)));return lr(h,"light",J,t),lr(h,"dark",B,t),h.contrastText||(h.contrastText=p(h.main)),h},v={dark:vn,light:cr};return process.env.NODE_ENV!=="production"&&(v[n]||console.error(`MUI: The palette mode \`${n}\` is not supported.`)),pe(j({common:j({},Ge),mode:n,primary:d({color:i,name:"primary"}),secondary:d({color:a,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:d({color:l,name:"error"}),warning:d({color:u,name:"warning"}),info:d({color:c,name:"info"}),success:d({color:s,name:"success"}),grey:Ko,contrastThreshold:r,getContrastText:p,augmentColor:d,tonalOffset:t},v[n]),o)}const di=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function fi(e){return Math.round(e*1e5)/1e5}const ur={textTransform:"uppercase"},dr='"Roboto", "Helvetica", "Arial", sans-serif';function pi(e,n){const r=typeof n=="function"?n(e):n,{fontFamily:t=dr,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:a=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:s=16,allVariants:u,pxToRem:p}=r,d=xe(r,di);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof s!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const v=o/14,b=p||(E=>`${E/s*v}rem`),h=(E,J,B,T,m)=>j({fontFamily:t,fontWeight:E,fontSize:b(J),lineHeight:B},t===dr?{letterSpacing:`${fi(T/J)}em`}:{},m,u),f={h1:h(i,96,1.167,-1.5),h2:h(i,60,1.2,-.5),h3:h(a,48,1.167,0),h4:h(a,34,1.235,.25),h5:h(a,24,1.334,0),h6:h(l,20,1.6,.15),subtitle1:h(a,16,1.75,.15),subtitle2:h(l,14,1.57,.1),body1:h(a,16,1.5,.15),body2:h(a,14,1.43,.15),button:h(l,14,1.75,.4,ur),caption:h(a,12,1.66,.4),overline:h(a,12,2.66,1,ur),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return pe(j({htmlFontSize:s,pxToRem:b,fontFamily:t,fontSize:o,fontWeightLight:i,fontWeightRegular:a,fontWeightMedium:l,fontWeightBold:c},f),d,{clone:!1})}const hi=.2,mi=.14,gi=.12;function q(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${hi})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${mi})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${gi})`].join(",")}const bi=["none",q(0,2,1,-1,0,1,1,0,0,1,3,0),q(0,3,1,-2,0,2,2,0,0,1,5,0),q(0,3,3,-2,0,3,4,0,0,1,8,0),q(0,2,4,-1,0,4,5,0,0,1,10,0),q(0,3,5,-1,0,5,8,0,0,1,14,0),q(0,3,5,-1,0,6,10,0,0,1,18,0),q(0,4,5,-2,0,7,10,1,0,2,16,1),q(0,5,5,-3,0,8,10,1,0,3,14,2),q(0,5,6,-3,0,9,12,1,0,3,16,2),q(0,6,6,-3,0,10,14,1,0,4,18,3),q(0,6,7,-4,0,11,15,1,0,4,20,3),q(0,7,8,-4,0,12,17,2,0,5,22,4),q(0,7,8,-4,0,13,19,2,0,5,24,4),q(0,7,9,-4,0,14,21,2,0,5,26,4),q(0,8,9,-5,0,15,22,2,0,6,28,5),q(0,8,10,-5,0,16,24,2,0,6,30,5),q(0,8,11,-5,0,17,26,2,0,6,32,5),q(0,9,11,-5,0,18,28,2,0,7,34,6),q(0,9,12,-6,0,19,29,2,0,7,36,6),q(0,10,13,-6,0,20,31,3,0,8,38,7),q(0,10,13,-6,0,21,33,3,0,8,40,7),q(0,10,14,-6,0,22,35,3,0,8,42,7),q(0,11,14,-7,0,23,36,3,0,9,44,8),q(0,11,15,-7,0,24,38,3,0,9,46,8)],yi=bi,vi=["duration","easing","delay"],xi={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},ki={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function fr(e){return`${Math.round(e)}ms`}function Si(e){if(!e)return 0;const n=e/36;return Math.round((4+15*n**.25+n/5)*10)}function Ei(e){const n=j({},xi,e.easing),r=j({},ki,e.duration);return j({getAutoHeightDuration:Si,create:(o=["all"],i={})=>{const{duration:a=r.standard,easing:l=n.easeInOut,delay:c=0}=i,s=xe(i,vi);if(process.env.NODE_ENV!=="production"){const u=d=>typeof d=="string",p=d=>!isNaN(parseFloat(d));!u(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!p(a)&&!u(a)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`),u(l)||console.error('MUI: Argument "easing" must be a string.'),!p(c)&&!u(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(s).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(s).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(u=>`${u} ${typeof a=="string"?a:fr(a)} ${l} ${typeof c=="string"?c:fr(c)}`).join(",")}},e,{easing:n,duration:r})}const wi={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Ti=wi,Ci=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function _i(e={},...n){const{mixins:r={},palette:t={},transitions:o={},typography:i={}}=e,a=xe(e,Ci);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Be(18));const l=ui(t),c=An(e);let s=pe(c,{mixins:Ho(c.breakpoints,r),palette:l,shadows:yi.slice(),typography:pi(l,i),transitions:Ei(o),zIndex:j({},Ti),applyDarkStyles(u){return this.vars?{[this.getColorSchemeSelector("dark").replace(/(\[[^\]]+\])/,":where($1)")]:u}:this.palette.mode==="dark"?u:{}}});if(s=pe(s,a),s=n.reduce((u,p)=>pe(u,p),s),process.env.NODE_ENV!=="production"){const u=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],p=(d,v)=>{let b;for(b in d){const h=d[b];if(u.indexOf(b)!==-1&&Object.keys(h).length>0){if(process.env.NODE_ENV!=="production"){const f=On("",b);console.error([`MUI: The \`${v}\` component increases the CSS specificity of the \`${b}\` internal state.`,"You can not override it like this: ",JSON.stringify(d,null,2),"",`Instead, you need to use the '&.${f}' syntax:`,JSON.stringify({root:{[`&.${f}`]:h}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}d[b]={}}}};Object.keys(s.components).forEach(d=>{const v=s.components[d].styleOverrides;v&&d.indexOf("Mui")===0&&p(v,d)})}return s.unstable_sxConfig=j({},Nn,a==null?void 0:a.unstable_sxConfig),s.unstable_sx=function(p){return Pn({sx:p,theme:this})},s}const Oi=_i(),Ir=Oi,Mr="$$material";function $i({props:e,name:n}){return Fo({props:e,name:n,defaultTheme:Ir,themeId:Mr})}const Ri=e=>Ke(e)&&e!=="classes",Ni=zo({themeId:Mr,defaultTheme:Ir,rootShouldForwardProp:Ri}),Pi=Ni;function Ai(e){return On("MuiSvgIcon",e)}Ct("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Ii=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Mi=e=>{const{color:n,fontSize:r,classes:t}=e,o={root:["root",n!=="inherit"&&`color${ge(n)}`,`fontSize${ge(r)}`]};return kt(o,Ai,t)},ji=Pi("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:r}=e;return[n.root,r.color!=="inherit"&&n[`color${ge(r.color)}`],n[`fontSize${ge(r.fontSize)}`]]}})(({theme:e,ownerState:n})=>{var r,t,o,i,a,l,c,s,u,p,d,v,b;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:n.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(r=e.transitions)==null||(t=r.create)==null?void 0:t.call(r,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(a=i.pxToRem)==null?void 0:a.call(i,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((s=e.typography)==null||(u=s.pxToRem)==null?void 0:u.call(s,35))||"2.1875rem"}[n.fontSize],color:(p=(d=(e.vars||e).palette)==null||(d=d[n.color])==null?void 0:d.main)!=null?p:{action:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.active,disabled:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.disabled,inherit:void 0}[n.color]}}),Mn=Ue.forwardRef(function(n,r){const t=$i({props:n,name:"MuiSvgIcon"}),{children:o,className:i,color:a="inherit",component:l="svg",fontSize:c="medium",htmlColor:s,inheritViewBox:u=!1,titleAccess:p,viewBox:d="0 0 24 24"}=t,v=xe(t,Ii),b=Ue.isValidElement(o)&&o.type==="svg",h=j({},t,{color:a,component:l,fontSize:c,instanceFontSize:n.fontSize,inheritViewBox:u,viewBox:d,hasSvgAsChild:b}),f={};u||(f.viewBox=d);const E=Mi(h);return S.jsxs(ji,j({as:l,className:Ot(E.root,i),focusable:"false",color:s,"aria-hidden":p?void 0:!0,role:p?"img":void 0,ref:r},f,v,b&&o.props,{ownerState:h,children:[b?o.props.children:o,p?S.jsx("title",{children:p}):null]}))});process.env.NODE_ENV!=="production"&&(Mn.propTypes={children:U.node,classes:U.object,className:U.string,color:U.oneOfType([U.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),U.string]),component:U.elementType,fontSize:U.oneOfType([U.oneOf(["inherit","large","medium","small"]),U.string]),htmlColor:U.string,inheritViewBox:U.bool,shapeRendering:U.string,sx:U.oneOfType([U.arrayOf(U.oneOfType([U.func,U.object,U.bool])),U.func,U.object]),titleAccess:U.string,viewBox:U.string});Mn.muiName="SvgIcon";const pr=Mn;function Bi(e,n){function r(t,o){return S.jsx(pr,j({"data-testid":`${n}Icon`,ref:o},t,{children:e}))}return process.env.NODE_ENV!=="production"&&(r.displayName=`${n}Icon`),r.muiName=pr.muiName,Ue.memo(Ue.forwardRef(r))}const Di=Bi(S.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Vi({menu:e,dataHandler:n,commandHandler:r,className:t,id:o,children:i}){const[a,l]=Y.useState(!1),[c,s]=Y.useState(!1),u=Y.useCallback(()=>{a&&l(!1),s(!1)},[a]),p=Y.useCallback(E=>{E.stopPropagation(),l(J=>{const B=!J;return B&&E.shiftKey?s(!0):B||s(!1),B})},[]),d=Y.useRef(void 0),[v,b]=Y.useState(0);Y.useEffect(()=>{a&&d.current&&b(d.current.clientHeight)},[a]);const h=Y.useCallback(E=>(u(),r(E)),[r,u]);let f=e;return!f&&n&&(f=n(c)),S.jsx("div",{ref:d,style:{position:"relative"},children:S.jsx(Z.AppBar,{position:"static",id:o,children:S.jsxs(Z.Toolbar,{className:`papi-toolbar ${t??""}`,variant:"dense",children:[f?S.jsx(Z.IconButton,{edge:"start",className:`papi-menuButton ${t??""}`,color:"inherit","aria-label":"open drawer",onClick:p,children:S.jsx(Di,{})}):void 0,i?S.jsx("div",{className:"papi-menu-children",children:i}):void 0,f?S.jsx(Z.Drawer,{className:`papi-menu-drawer ${t??""}`,anchor:"left",variant:"persistent",open:a,onClose:u,PaperProps:{className:"papi-menu-drawer-paper",style:{top:v}},children:S.jsx(gr,{commandHandler:h,columns:f.columns})}):void 0]})})})}const zi=(e,n)=>{Y.useEffect(()=>{if(!e)return()=>{};const r=e(n);return()=>{r()}},[e,n])};function Li(e){return{preserveValue:!0,...e}}const jr=(e,n,r={})=>{const t=Y.useRef(n);t.current=n;const o=Y.useRef(r);o.current=Li(o.current);const[i,a]=Y.useState(()=>t.current),[l,c]=Y.useState(!0);return Y.useEffect(()=>{let s=!0;return c(!!e),(async()=>{if(e){const u=await e();s&&(a(()=>u),c(!1))}})(),()=>{s=!1,o.current.preserveValue||a(()=>t.current)}},[e]),[i,l]},xn=()=>!1,Fi=(e,n)=>{const[r]=jr(Y.useCallback(async()=>{if(!e)return xn;const t=await Promise.resolve(e(n));return async()=>t()},[n,e]),xn,{preserveValue:!1});Y.useEffect(()=>()=>{r!==xn&&r()},[r])};exports.Button=Te;exports.ChapterRangeSelector=Dr;exports.Checkbox=hr;exports.ComboBox=Ze;exports.GridMenu=gr;exports.IconButton=zr;exports.LabelPosition=_e;exports.MenuItem=mr;exports.RefSelector=Qr;exports.SearchBar=et;exports.Slider=nt;exports.Snackbar=rt;exports.Switch=tt;exports.Table=it;exports.TextField=qe;exports.Toolbar=Vi;exports.useEvent=zi;exports.useEventAsync=Fi;exports.usePromise=jr;function Ui(e,n="top"){if(!e||typeof document>"u")return;const r=document.head||document.querySelector("head"),t=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),n==="top"&&t?r.insertBefore(o,t):r.appendChild(o)}Ui(`.papi-button {
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
  }

@layer rdg.Cell {

.cd0kgiy7-0-0-beta-34 {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1
}
  }

@layer rdg.Cell {

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
  }

@layer rdg.FocusSink {
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
  }

@layer rdg.Cell {

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
  }

@layer rdg.SummaryRow {
    .t1jijrjz7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      z-index: 1;
    }

    .t1jijrjz7-0-0-beta-34 > .cd0kgiy7-0-0-beta-34 {
      z-index: 2;
    }
  }

@layer rdg.SummaryRow {
    .t14bmecc7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
  }

@layer rdg.SummaryRow {
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

.paratext {
  background-color: darkgreen;
  color: greenyellow;
}
`,"top");
//# sourceMappingURL=index.cjs.map
