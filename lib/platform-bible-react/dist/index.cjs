"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const S=require("react/jsx-runtime"),J=require("@mui/material"),K=require("react"),fe=require("platform-bible-utils"),In=require("react-data-grid"),yn=require("@mui/styled-engine");function Pr(e){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const r in e)if(r!=="default"){const t=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,t.get?t:{enumerable:!0,get:()=>e[r]})}}return n.default=e,Object.freeze(n)}const Ue=Pr(K);function Ee({id:e,isDisabled:n=!1,className:r,onClick:t,onContextMenu:o,children:i}){return S.jsx(J.Button,{id:e,disabled:n,className:`papi-button ${r??""}`,onClick:t,onContextMenu:o,children:i})}function Je({id:e,title:n,isDisabled:r=!1,isClearable:t=!0,hasError:o=!1,isFullWidth:i=!1,width:a,options:u=[],className:c,value:s,onChange:l,onFocus:p,onBlur:d,getOptionLabel:v}){return S.jsx(J.Autocomplete,{id:e,disablePortal:!0,disabled:r,disableClearable:!t,fullWidth:i,options:u,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:s,onChange:l,onFocus:p,onBlur:d,getOptionLabel:v,renderInput:b=>S.jsx(J.TextField,{...b,error:o,fullWidth:i,disabled:r,label:n,style:{width:a}})})}function Ir({startChapter:e,endChapter:n,handleSelectStartChapter:r,handleSelectEndChapter:t,isDisabled:o,chapterCount:i}){const a=K.useMemo(()=>Array.from({length:i},(s,l)=>l+1),[i]),u=(s,l)=>{r(l),l>n&&t(l)},c=(s,l)=>{t(l),l<e&&r(l)};return S.jsxs(S.Fragment,{children:[S.jsx(J.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:S.jsx(Je,{onChange:(s,l)=>u(s,l),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:s=>s.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),S.jsx(J.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:S.jsx(Je,{onChange:(s,l)=>c(s,l),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:s=>s.toString(),value:n,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var Te=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Te||{});function ur({id:e,isChecked:n,labelText:r="",labelPosition:t=Te.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:a=!1,hasError:u=!1,className:c,onChange:s}){const l=S.jsx(J.Checkbox,{id:e,checked:n,indeterminate:o,defaultChecked:i,disabled:a,className:`papi-checkbox ${u?"error":""} ${c??""}`,onChange:s});let p;if(r){const d=t===Te.Before||t===Te.Above,v=S.jsx("span",{className:`papi-checkbox-label ${u?"error":""} ${c??""}`,children:r}),b=t===Te.Before||t===Te.After,h=b?v:S.jsx("div",{children:v}),f=b?l:S.jsx("div",{children:l});p=S.jsxs(J.FormLabel,{className:`papi-checkbox ${t.toString()}`,disabled:a,error:u,children:[d&&h,f,!d&&h]})}else p=l;return p}function dr(e){const{onClick:n,name:r,hasAutoFocus:t=!1,className:o,isDense:i=!0,hasDisabledGutters:a=!1,hasDivider:u=!1,focusVisibleClassName:c,id:s,children:l}=e;return S.jsx(J.MenuItem,{autoFocus:t,className:o,dense:i,disableGutters:a,divider:u,focusVisibleClassName:c,onClick:n,id:s,children:r||l})}function Mr({commandHandler:e,name:n,className:r,items:t,id:o}){return S.jsxs(J.Grid,{id:o,item:!0,xs:"auto",className:`papi-menu-column ${r??""}`,children:[S.jsx("h3",{className:`papi-menu ${r??""}`,children:n}),t.map((i,a)=>S.jsx(dr,{className:`papi-menu-item ${i.className}`,onClick:()=>{e(i)},...i},a))]})}function fr({commandHandler:e,className:n,columns:r,id:t}){return S.jsx(J.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${n??""}`,columns:r.length,id:t,children:r.map((o,i)=>S.jsx(Mr,{commandHandler:e,name:o.name,className:n,items:o.items},i))})}function jr({id:e,label:n,isDisabled:r=!1,tooltip:t,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:a="medium",className:u,onClick:c,children:s}){return S.jsx(J.IconButton,{id:e,disabled:r,edge:i,size:a,"aria-label":n,title:o?void 0:t??n,className:`papi-icon-button ${u??""}`,onClick:c,children:s})}var Br=Object.defineProperty,Dr=(e,n,r)=>n in e?Br(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,R=(e,n,r)=>(Dr(e,typeof n!="symbol"?n+"":n,r),r);const Ce=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],kn=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],pr=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Mn=Xr();function De(e,n=!0){return n&&(e=e.toUpperCase()),e in Mn?Mn[e]:0}function Sn(e){return De(e)>0}function zr(e){const n=typeof e=="string"?De(e):e;return n>=40&&n<=66}function Vr(e){return(typeof e=="string"?De(e):e)<=39}function hr(e){return e<=66}function Lr(e){const n=typeof e=="string"?De(e):e;return br(n)&&!hr(n)}function*Fr(){for(let e=1;e<=Ce.length;e++)yield e}const Ur=1,gr=Ce.length;function qr(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function En(e,n="***"){const r=e-1;return r<0||r>=Ce.length?n:Ce[r]}function mr(e){return e<=0||e>gr?"******":pr[e-1]}function Gr(e){return mr(De(e))}function br(e){const n=typeof e=="number"?En(e):e;return Sn(n)&&!kn.includes(n)}function Hr(e){const n=typeof e=="number"?En(e):e;return Sn(n)&&kn.includes(n)}function Wr(e){return pr[e-1].includes("*obsolete*")}function Xr(){const e={};for(let n=0;n<Ce.length;n++)e[Ce[n]]=n+1;return e}const me={allBookIds:Ce,nonCanonicalIds:kn,bookIdToNumber:De,isBookIdValid:Sn,isBookNT:zr,isBookOT:Vr,isBookOTNT:hr,isBookDC:Lr,allBookNumbers:Fr,firstBook:Ur,lastBook:gr,extraBooks:qr,bookNumberToId:En,bookNumberToEnglishName:mr,bookIdToEnglishName:Gr,isCanonical:br,isExtraMaterial:Hr,isObsolete:Wr};var xe=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(xe||{});const we=class{constructor(e){if(R(this,"name"),R(this,"fullPath"),R(this,"isPresent"),R(this,"hasVerseSegments"),R(this,"isCustomized"),R(this,"baseVersification"),R(this,"scriptureBooks"),R(this,"_type"),e!=null)typeof e=="string"?this.name=e:this._type=e;else throw new Error("Argument null")}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};let ae=we;R(ae,"Original",new we(xe.Original)),R(ae,"Septuagint",new we(xe.Septuagint)),R(ae,"Vulgate",new we(xe.Vulgate)),R(ae,"English",new we(xe.English)),R(ae,"RussianProtestant",new we(xe.RussianProtestant)),R(ae,"RussianOrthodox",new we(xe.RussianOrthodox));function jn(e,n){const r=n[0];for(let t=1;t<n.length;t++)e=e.split(n[t]).join(r);return e.split(r)}var yr=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(yr||{});const $=class{constructor(n,r,t,o){if(R(this,"firstChapter"),R(this,"lastChapter"),R(this,"lastVerse"),R(this,"hasSegmentsDefined"),R(this,"text"),R(this,"BBBCCCVVVS"),R(this,"longHashCode"),R(this,"versification"),R(this,"rtlMark","‏"),R(this,"_bookNum",0),R(this,"_chapterNum",0),R(this,"_verseNum",0),R(this,"_verse"),t==null&&o==null)if(n!=null&&typeof n=="string"){const i=n,a=r!=null&&r instanceof ae?r:void 0;this.setEmpty(a),this.parse(i)}else if(n!=null&&typeof n=="number"){const i=r!=null&&r instanceof ae?r:void 0;this.setEmpty(i),this._verseNum=n%$.chapterDigitShifter,this._chapterNum=Math.floor(n%$.bookDigitShifter/$.chapterDigitShifter),this._bookNum=Math.floor(n/$.bookDigitShifter)}else if(r==null)if(n!=null&&n instanceof $){const i=n;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(n==null)return;const i=n instanceof ae?n:$.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(n!=null&&r!=null&&t!=null)if(typeof n=="string"&&typeof r=="string"&&typeof t=="string")this.setEmpty(o),this.updateInternal(n,r,t);else if(typeof n=="number"&&typeof r=="number"&&typeof t=="number")this._bookNum=n,this._chapterNum=r,this._verseNum=t,this.versification=o??$.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(n,r=$.defaultVersification){const t=new $(r);return t.parse(n),t}static isVerseParseable(n){return n.length>0&&"0123456789".includes(n[0])&&!n.endsWith(this.verseRangeSeparator)&&!n.endsWith(this.verseSequenceIndicator)}static tryParse(n){let r;try{return r=$.parse(n),{success:!0,verseRef:r}}catch(t){if(t instanceof ze)return r=new $,{success:!1,verseRef:r};throw t}}static getBBBCCCVVV(n,r,t){return n%$.bcvMaxValue*$.bookDigitShifter+(r>=0?r%$.bcvMaxValue*$.chapterDigitShifter:0)+(t>=0?t%$.bcvMaxValue:0)}static tryGetVerseNum(n){let r;if(!n)return r=-1,{success:!0,vNum:r};r=0;let t;for(let o=0;o<n.length;o++){if(t=n[o],t<"0"||t>"9")return o===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +t-+"0",r>$.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes($.verseRangeSeparator)||this._verse.includes($.verseSequenceIndicator))}get book(){return me.bookNumberToId(this.bookNum,"")}set book(n){this.bookNum=me.bookIdToNumber(n)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(n){const r=+n;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(n){const{success:r,vNum:t}=$.tryGetVerseNum(n);this._verse=r?void 0:n.replace(this.rtlMark,""),this._verseNum=t,!(this._verseNum>=0)&&({vNum:this._verseNum}=$.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(n){if(n<=0||n>me.lastBook)throw new ze("BookNum must be greater than zero and less than or equal to last book");this._bookNum=n}get chapterNum(){return this._chapterNum}set chapterNum(n){this.chapterNum=n}get verseNum(){return this._verseNum}set verseNum(n){this._verseNum=n}get versificationStr(){var n;return(n=this.versification)==null?void 0:n.name}set versificationStr(n){this.versification=this.versification!=null?new ae(n):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse($.verseRangeSeparators,$.verseSequenceIndicators)}get BBBCCC(){return $.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return $.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(n){if(n=n.replace(this.rtlMark,""),n.includes("/")){const i=n.split("/");if(n=i[0],i.length>1)try{const a=+i[1].trim();this.versification=new ae(xe[a])}catch{throw new ze("Invalid reference : "+n)}}const r=n.trim().split(" ");if(r.length!==2)throw new ze("Invalid reference : "+n);const t=r[1].split(":"),o=+t[0];if(t.length!==2||me.bookIdToNumber(r[0])===0||!Number.isInteger(o)||o<0||!$.isVerseParseable(t[1]))throw new ze("Invalid reference : "+n);this.updateInternal(r[0],t[0],t[1])}simplify(){this._verse=void 0}clone(){return new $(this)}toString(){const n=this.book;return n===""?"":`${n} ${this.chapter}:${this.verse}`}equals(n){return n._bookNum===this._bookNum&&n._chapterNum===this._chapterNum&&n._verseNum===this._verseNum&&n._verse===this._verse&&n.versification!=null&&this.versification!=null&&n.versification.equals(this.versification)}allVerses(n=!1,r=$.verseRangeSeparators,t=$.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=jn(this._verse,t);for(const a of i.map(u=>jn(u,r))){const u=this.clone();u.verse=a[0];const c=u.verseNum;if(o.push(u),a.length>1){const s=this.clone();if(s.verse=a[1],!n)for(let l=c+1;l<s.verseNum;l++){const p=new $(this._bookNum,this._chapterNum,l,this.versification);this.isExcluded||o.push(p)}o.push(s)}}return o}validateVerse(n,r){if(!this.verse)return this.internalValid;let t=0;for(const o of this.allVerses(!0,n,r)){const i=o.internalValid;if(i!==0)return i;const a=o.BBBCCCVVV;if(t>a)return 3;if(t===a)return 4;t=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>me.lastBook?2:0}setEmpty(n=$.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=n}updateInternal(n,r,t){this.bookNum=me.bookIdToNumber(n),this.chapter=r,this.verse=t}};let ge=$;R(ge,"defaultVersification",ae.English),R(ge,"verseRangeSeparator","-"),R(ge,"verseSequenceIndicator",","),R(ge,"verseRangeSeparators",[$.verseRangeSeparator]),R(ge,"verseSequenceIndicators",[$.verseSequenceIndicator]),R(ge,"chapterDigitShifter",1e3),R(ge,"bookDigitShifter",$.chapterDigitShifter*$.chapterDigitShifter),R(ge,"bcvMaxValue",$.chapterDigitShifter-1),R(ge,"ValidStatusType",yr);class ze extends Error{}function qe({variant:e="outlined",id:n,isDisabled:r=!1,hasError:t=!1,isFullWidth:o=!1,helperText:i,label:a,placeholder:u,isRequired:c=!1,className:s,defaultValue:l,value:p,onChange:d,onFocus:v,onBlur:b}){return S.jsx(J.TextField,{variant:e,id:n,disabled:r,error:t,fullWidth:o,helperText:i,label:a,placeholder:u,required:c,className:`papi-textfield ${s??""}`,defaultValue:l,value:p,onChange:d,onFocus:v,onBlur:b})}let cn;const ln=()=>(cn||(cn=me.allBookIds.map(e=>({bookId:e,label:me.bookIdToEnglishName(e)}))),cn);function Kr({scrRef:e,handleSubmit:n,id:r}){const t=c=>{n(c)},o=(c,s)=>{const p={bookNum:me.bookIdToNumber(s.bookId),chapterNum:1,verseNum:1};t(p)},i=c=>{n({...e,chapterNum:+c.target.value})},a=c=>{n({...e,verseNum:+c.target.value})},u=K.useMemo(()=>ln()[e.bookNum-1],[e.bookNum]);return S.jsxs("span",{id:r,children:[S.jsx(Je,{title:"Book",className:"papi-ref-selector book",value:u,options:ln(),onChange:o,isClearable:!1,width:200}),S.jsx(Ee,{onClick:()=>t(fe.offsetBook(e,-1)),isDisabled:e.bookNum<=fe.FIRST_SCR_BOOK_NUM,children:"<"}),S.jsx(Ee,{onClick:()=>t(fe.offsetBook(e,1)),isDisabled:e.bookNum>=ln().length,children:">"}),S.jsx(qe,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),S.jsx(Ee,{onClick:()=>n(fe.offsetChapter(e,-1)),isDisabled:e.chapterNum<=fe.FIRST_SCR_CHAPTER_NUM,children:"<"}),S.jsx(Ee,{onClick:()=>n(fe.offsetChapter(e,1)),isDisabled:e.chapterNum>=fe.getChaptersForBook(e.bookNum),children:">"}),S.jsx(qe,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:a}),S.jsx(Ee,{onClick:()=>n(fe.offsetVerse(e,-1)),isDisabled:e.verseNum<=fe.FIRST_SCR_VERSE_NUM,children:"<"}),S.jsx(Ee,{onClick:()=>n(fe.offsetVerse(e,1)),children:">"})]})}function Yr({onSearch:e,placeholder:n,isFullWidth:r}){const[t,o]=K.useState(""),i=a=>{o(a),e(a)};return S.jsx(J.Paper,{component:"form",className:"search-bar-paper",children:S.jsx(qe,{isFullWidth:r,className:"search-bar-input",placeholder:n,value:t,onChange:a=>i(a.target.value)})})}function Jr({id:e,isDisabled:n=!1,orientation:r="horizontal",min:t=0,max:o=100,step:i=1,showMarks:a=!1,defaultValue:u,value:c,valueLabelDisplay:s="off",className:l,onChange:p,onChangeCommitted:d}){return S.jsx(J.Slider,{id:e,disabled:n,orientation:r,min:t,max:o,step:i,marks:a,defaultValue:u,value:c,valueLabelDisplay:s,className:`papi-slider ${r} ${l??""}`,onChange:p,onChangeCommitted:d})}function Zr({autoHideDuration:e=void 0,id:n,isOpen:r=!1,className:t,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:a,children:u}){const c={action:(a==null?void 0:a.action)||u,message:a==null?void 0:a.message,className:t};return S.jsx(J.Snackbar,{autoHideDuration:e??void 0,open:r,onClose:o,anchorOrigin:i,id:n,ContentProps:c})}function Qr({id:e,isChecked:n,isDisabled:r=!1,hasError:t=!1,className:o,onChange:i}){return S.jsx(J.Switch,{id:e,checked:n,disabled:r,className:`papi-switch ${t?"error":""} ${o??""}`,onChange:i})}function Bn({onRowChange:e,row:n,column:r}){const t=o=>{e({...n,[r.key]:o.target.value})};return S.jsx(qe,{defaultValue:n[r.key],onChange:t})}const et=({onChange:e,disabled:n,checked:r,...t})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return S.jsx(ur,{...t,isChecked:r,isDisabled:n,onChange:o})};function nt({columns:e,sortColumns:n,onSortColumnsChange:r,onColumnResize:t,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:a,defaultColumnSortable:u=!0,defaultColumnResizable:c=!0,rows:s,enableSelectColumn:l,selectColumnWidth:p=50,rowKeyGetter:d,rowHeight:v=35,headerRowHeight:b=35,selectedRows:h,onSelectedRowsChange:f,onRowsChange:E,onCellClick:Y,onCellDoubleClick:j,onCellContextMenu:N,onCellKeyDown:g,direction:Z="ltr",enableVirtualization:oe=!0,onCopy:le,onPaste:se,onScroll:B,className:Q,id:ue}){const de=K.useMemo(()=>{const ne=e.map(X=>typeof X.editable=="function"?{...X,editable:ce=>!!X.editable(ce),renderEditCell:X.renderEditCell||Bn}:X.editable&&!X.renderEditCell?{...X,renderEditCell:Bn}:X.renderEditCell&&!X.editable?{...X,editable:!1}:X);return l?[{...In.SelectColumn,minWidth:p},...ne]:ne},[e,l,p]);return S.jsx(In,{columns:de,defaultColumnOptions:{width:o,minWidth:i,maxWidth:a,sortable:u,resizable:c},sortColumns:n,onSortColumnsChange:r,onColumnResize:t,rows:s,rowKeyGetter:d,rowHeight:v,headerRowHeight:b,selectedRows:h,onSelectedRowsChange:f,onRowsChange:E,onCellClick:Y,onCellDoubleClick:j,onCellContextMenu:N,onCellKeyDown:g,direction:Z,enableVirtualization:oe,onCopy:le,onPaste:se,onScroll:B,renderers:{renderCheckbox:et},className:Q??"rdg-light",id:ue})}function A(){return A=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},A.apply(this,arguments)}function Ie(e){return e!==null&&typeof e=="object"&&e.constructor===Object}function vr(e){if(!Ie(e))return e;const n={};return Object.keys(e).forEach(r=>{n[r]=vr(e[r])}),n}function be(e,n,r={clone:!0}){const t=r.clone?A({},e):e;return Ie(e)&&Ie(n)&&Object.keys(n).forEach(o=>{o!=="__proto__"&&(Ie(n[o])&&o in e&&Ie(e[o])?t[o]=be(e[o],n[o],r):r.clone?t[o]=Ie(n[o])?vr(n[o]):n[o]:t[o]=n[o])}),t}function rt(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var vn={exports:{}},Ke={exports:{}},z={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dn;function tt(){if(Dn)return z;Dn=1;var e=typeof Symbol=="function"&&Symbol.for,n=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,t=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,u=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,s=e?Symbol.for("react.concurrent_mode"):60111,l=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,b=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,f=e?Symbol.for("react.fundamental"):60117,E=e?Symbol.for("react.responder"):60118,Y=e?Symbol.for("react.scope"):60119;function j(g){if(typeof g=="object"&&g!==null){var Z=g.$$typeof;switch(Z){case n:switch(g=g.type,g){case c:case s:case t:case i:case o:case p:return g;default:switch(g=g&&g.$$typeof,g){case u:case l:case b:case v:case a:return g;default:return Z}}case r:return Z}}}function N(g){return j(g)===s}return z.AsyncMode=c,z.ConcurrentMode=s,z.ContextConsumer=u,z.ContextProvider=a,z.Element=n,z.ForwardRef=l,z.Fragment=t,z.Lazy=b,z.Memo=v,z.Portal=r,z.Profiler=i,z.StrictMode=o,z.Suspense=p,z.isAsyncMode=function(g){return N(g)||j(g)===c},z.isConcurrentMode=N,z.isContextConsumer=function(g){return j(g)===u},z.isContextProvider=function(g){return j(g)===a},z.isElement=function(g){return typeof g=="object"&&g!==null&&g.$$typeof===n},z.isForwardRef=function(g){return j(g)===l},z.isFragment=function(g){return j(g)===t},z.isLazy=function(g){return j(g)===b},z.isMemo=function(g){return j(g)===v},z.isPortal=function(g){return j(g)===r},z.isProfiler=function(g){return j(g)===i},z.isStrictMode=function(g){return j(g)===o},z.isSuspense=function(g){return j(g)===p},z.isValidElementType=function(g){return typeof g=="string"||typeof g=="function"||g===t||g===s||g===i||g===o||g===p||g===d||typeof g=="object"&&g!==null&&(g.$$typeof===b||g.$$typeof===v||g.$$typeof===a||g.$$typeof===u||g.$$typeof===l||g.$$typeof===f||g.$$typeof===E||g.$$typeof===Y||g.$$typeof===h)},z.typeOf=j,z}var V={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zn;function ot(){return zn||(zn=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,n=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,t=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,u=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,s=e?Symbol.for("react.concurrent_mode"):60111,l=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,b=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,f=e?Symbol.for("react.fundamental"):60117,E=e?Symbol.for("react.responder"):60118,Y=e?Symbol.for("react.scope"):60119;function j(y){return typeof y=="string"||typeof y=="function"||y===t||y===s||y===i||y===o||y===p||y===d||typeof y=="object"&&y!==null&&(y.$$typeof===b||y.$$typeof===v||y.$$typeof===a||y.$$typeof===u||y.$$typeof===l||y.$$typeof===f||y.$$typeof===E||y.$$typeof===Y||y.$$typeof===h)}function N(y){if(typeof y=="object"&&y!==null){var ie=y.$$typeof;switch(ie){case n:var k=y.type;switch(k){case c:case s:case t:case i:case o:case p:return k;default:var Oe=k&&k.$$typeof;switch(Oe){case u:case l:case b:case v:case a:return Oe;default:return ie}}case r:return ie}}}var g=c,Z=s,oe=u,le=a,se=n,B=l,Q=t,ue=b,de=v,ne=r,X=i,re=o,ce=p,Se=!1;function _e(y){return Se||(Se=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),m(y)||N(y)===c}function m(y){return N(y)===s}function x(y){return N(y)===u}function O(y){return N(y)===a}function C(y){return typeof y=="object"&&y!==null&&y.$$typeof===n}function w(y){return N(y)===l}function P(y){return N(y)===t}function T(y){return N(y)===b}function _(y){return N(y)===v}function I(y){return N(y)===r}function D(y){return N(y)===i}function M(y){return N(y)===o}function ee(y){return N(y)===p}V.AsyncMode=g,V.ConcurrentMode=Z,V.ContextConsumer=oe,V.ContextProvider=le,V.Element=se,V.ForwardRef=B,V.Fragment=Q,V.Lazy=ue,V.Memo=de,V.Portal=ne,V.Profiler=X,V.StrictMode=re,V.Suspense=ce,V.isAsyncMode=_e,V.isConcurrentMode=m,V.isContextConsumer=x,V.isContextProvider=O,V.isElement=C,V.isForwardRef=w,V.isFragment=P,V.isLazy=T,V.isMemo=_,V.isPortal=I,V.isProfiler=D,V.isStrictMode=M,V.isSuspense=ee,V.isValidElementType=j,V.typeOf=N}()),V}var Vn;function xr(){return Vn||(Vn=1,process.env.NODE_ENV==="production"?Ke.exports=tt():Ke.exports=ot()),Ke.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var un,Ln;function it(){if(Ln)return un;Ln=1;var e=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function t(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var a={},u=0;u<10;u++)a["_"+String.fromCharCode(u)]=u;var c=Object.getOwnPropertyNames(a).map(function(l){return a[l]});if(c.join("")!=="0123456789")return!1;var s={};return"abcdefghijklmnopqrst".split("").forEach(function(l){s[l]=l}),Object.keys(Object.assign({},s)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return un=o()?Object.assign:function(i,a){for(var u,c=t(i),s,l=1;l<arguments.length;l++){u=Object(arguments[l]);for(var p in u)n.call(u,p)&&(c[p]=u[p]);if(e){s=e(u);for(var d=0;d<s.length;d++)r.call(u,s[d])&&(c[s[d]]=u[s[d]])}}return c},un}var dn,Fn;function wn(){if(Fn)return dn;Fn=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return dn=e,dn}var fn,Un;function kr(){return Un||(Un=1,fn=Function.call.bind(Object.prototype.hasOwnProperty)),fn}var pn,qn;function at(){if(qn)return pn;qn=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var n=wn(),r={},t=kr();e=function(i){var a="Warning: "+i;typeof console<"u"&&console.error(a);try{throw new Error(a)}catch{}}}function o(i,a,u,c,s){if(process.env.NODE_ENV!=="production"){for(var l in i)if(t(i,l)){var p;try{if(typeof i[l]!="function"){var d=Error((c||"React class")+": "+u+" type `"+l+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[l]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw d.name="Invariant Violation",d}p=i[l](a,l,c,u,null,n)}catch(b){p=b}if(p&&!(p instanceof Error)&&e((c||"React class")+": type specification of "+u+" `"+l+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof p+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),p instanceof Error&&!(p.message in r)){r[p.message]=!0;var v=s?s():"";e("Failed "+u+" type: "+p.message+(v??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(r={})},pn=o,pn}var hn,Gn;function st(){if(Gn)return hn;Gn=1;var e=xr(),n=it(),r=wn(),t=kr(),o=at(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(u){var c="Warning: "+u;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function a(){return null}return hn=function(u,c){var s=typeof Symbol=="function"&&Symbol.iterator,l="@@iterator";function p(m){var x=m&&(s&&m[s]||m[l]);if(typeof x=="function")return x}var d="<<anonymous>>",v={array:E("array"),bigint:E("bigint"),bool:E("boolean"),func:E("function"),number:E("number"),object:E("object"),string:E("string"),symbol:E("symbol"),any:Y(),arrayOf:j,element:N(),elementType:g(),instanceOf:Z,node:B(),objectOf:le,oneOf:oe,oneOfType:se,shape:ue,exact:de};function b(m,x){return m===x?m!==0||1/m===1/x:m!==m&&x!==x}function h(m,x){this.message=m,this.data=x&&typeof x=="object"?x:{},this.stack=""}h.prototype=Error.prototype;function f(m){if(process.env.NODE_ENV!=="production")var x={},O=0;function C(P,T,_,I,D,M,ee){if(I=I||d,M=M||_,ee!==r){if(c){var y=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw y.name="Invariant Violation",y}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var ie=I+":"+_;!x[ie]&&O<3&&(i("You are manually calling a React.PropTypes validation function for the `"+M+"` prop on `"+I+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),x[ie]=!0,O++)}}return T[_]==null?P?T[_]===null?new h("The "+D+" `"+M+"` is marked as required "+("in `"+I+"`, but its value is `null`.")):new h("The "+D+" `"+M+"` is marked as required in "+("`"+I+"`, but its value is `undefined`.")):null:m(T,_,I,D,M)}var w=C.bind(null,!1);return w.isRequired=C.bind(null,!0),w}function E(m){function x(O,C,w,P,T,_){var I=O[C],D=re(I);if(D!==m){var M=ce(I);return new h("Invalid "+P+" `"+T+"` of type "+("`"+M+"` supplied to `"+w+"`, expected ")+("`"+m+"`."),{expectedType:m})}return null}return f(x)}function Y(){return f(a)}function j(m){function x(O,C,w,P,T){if(typeof m!="function")return new h("Property `"+T+"` of component `"+w+"` has invalid PropType notation inside arrayOf.");var _=O[C];if(!Array.isArray(_)){var I=re(_);return new h("Invalid "+P+" `"+T+"` of type "+("`"+I+"` supplied to `"+w+"`, expected an array."))}for(var D=0;D<_.length;D++){var M=m(_,D,w,P,T+"["+D+"]",r);if(M instanceof Error)return M}return null}return f(x)}function N(){function m(x,O,C,w,P){var T=x[O];if(!u(T)){var _=re(T);return new h("Invalid "+w+" `"+P+"` of type "+("`"+_+"` supplied to `"+C+"`, expected a single ReactElement."))}return null}return f(m)}function g(){function m(x,O,C,w,P){var T=x[O];if(!e.isValidElementType(T)){var _=re(T);return new h("Invalid "+w+" `"+P+"` of type "+("`"+_+"` supplied to `"+C+"`, expected a single ReactElement type."))}return null}return f(m)}function Z(m){function x(O,C,w,P,T){if(!(O[C]instanceof m)){var _=m.name||d,I=_e(O[C]);return new h("Invalid "+P+" `"+T+"` of type "+("`"+I+"` supplied to `"+w+"`, expected ")+("instance of `"+_+"`."))}return null}return f(x)}function oe(m){if(!Array.isArray(m))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),a;function x(O,C,w,P,T){for(var _=O[C],I=0;I<m.length;I++)if(b(_,m[I]))return null;var D=JSON.stringify(m,function(ee,y){var ie=ce(y);return ie==="symbol"?String(y):y});return new h("Invalid "+P+" `"+T+"` of value `"+String(_)+"` "+("supplied to `"+w+"`, expected one of "+D+"."))}return f(x)}function le(m){function x(O,C,w,P,T){if(typeof m!="function")return new h("Property `"+T+"` of component `"+w+"` has invalid PropType notation inside objectOf.");var _=O[C],I=re(_);if(I!=="object")return new h("Invalid "+P+" `"+T+"` of type "+("`"+I+"` supplied to `"+w+"`, expected an object."));for(var D in _)if(t(_,D)){var M=m(_,D,w,P,T+"."+D,r);if(M instanceof Error)return M}return null}return f(x)}function se(m){if(!Array.isArray(m))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),a;for(var x=0;x<m.length;x++){var O=m[x];if(typeof O!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+Se(O)+" at index "+x+"."),a}function C(w,P,T,_,I){for(var D=[],M=0;M<m.length;M++){var ee=m[M],y=ee(w,P,T,_,I,r);if(y==null)return null;y.data&&t(y.data,"expectedType")&&D.push(y.data.expectedType)}var ie=D.length>0?", expected one of type ["+D.join(", ")+"]":"";return new h("Invalid "+_+" `"+I+"` supplied to "+("`"+T+"`"+ie+"."))}return f(C)}function B(){function m(x,O,C,w,P){return ne(x[O])?null:new h("Invalid "+w+" `"+P+"` supplied to "+("`"+C+"`, expected a ReactNode."))}return f(m)}function Q(m,x,O,C,w){return new h((m||"React class")+": "+x+" type `"+O+"."+C+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+w+"`.")}function ue(m){function x(O,C,w,P,T){var _=O[C],I=re(_);if(I!=="object")return new h("Invalid "+P+" `"+T+"` of type `"+I+"` "+("supplied to `"+w+"`, expected `object`."));for(var D in m){var M=m[D];if(typeof M!="function")return Q(w,P,T,D,ce(M));var ee=M(_,D,w,P,T+"."+D,r);if(ee)return ee}return null}return f(x)}function de(m){function x(O,C,w,P,T){var _=O[C],I=re(_);if(I!=="object")return new h("Invalid "+P+" `"+T+"` of type `"+I+"` "+("supplied to `"+w+"`, expected `object`."));var D=n({},O[C],m);for(var M in D){var ee=m[M];if(t(m,M)&&typeof ee!="function")return Q(w,P,T,M,ce(ee));if(!ee)return new h("Invalid "+P+" `"+T+"` key `"+M+"` supplied to `"+w+"`.\nBad object: "+JSON.stringify(O[C],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(m),null,"  "));var y=ee(_,M,w,P,T+"."+M,r);if(y)return y}return null}return f(x)}function ne(m){switch(typeof m){case"number":case"string":case"undefined":return!0;case"boolean":return!m;case"object":if(Array.isArray(m))return m.every(ne);if(m===null||u(m))return!0;var x=p(m);if(x){var O=x.call(m),C;if(x!==m.entries){for(;!(C=O.next()).done;)if(!ne(C.value))return!1}else for(;!(C=O.next()).done;){var w=C.value;if(w&&!ne(w[1]))return!1}}else return!1;return!0;default:return!1}}function X(m,x){return m==="symbol"?!0:x?x["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&x instanceof Symbol:!1}function re(m){var x=typeof m;return Array.isArray(m)?"array":m instanceof RegExp?"object":X(x,m)?"symbol":x}function ce(m){if(typeof m>"u"||m===null)return""+m;var x=re(m);if(x==="object"){if(m instanceof Date)return"date";if(m instanceof RegExp)return"regexp"}return x}function Se(m){var x=ce(m);switch(x){case"array":case"object":return"an "+x;case"boolean":case"date":case"regexp":return"a "+x;default:return x}}function _e(m){return!m.constructor||!m.constructor.name?d:m.constructor.name}return v.checkPropTypes=o,v.resetWarningCache=o.resetWarningCache,v.PropTypes=v,v},hn}var gn,Hn;function ct(){if(Hn)return gn;Hn=1;var e=wn();function n(){}function r(){}return r.resetWarningCache=n,gn=function(){function t(a,u,c,s,l,p){if(p!==e){var d=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw d.name="Invariant Violation",d}}t.isRequired=t;function o(){return t}var i={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:o,element:t,elementType:t,instanceOf:o,node:t,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:r,resetWarningCache:n};return i.PropTypes=i,i},gn}if(process.env.NODE_ENV!=="production"){var lt=xr(),ut=!0;vn.exports=st()(lt.isElement,ut)}else vn.exports=ct()();var dt=vn.exports;const q=rt(dt);function je(e){let n="https://mui.com/production-error/?code="+e;for(let r=1;r<arguments.length;r+=1)n+="&args[]="+encodeURIComponent(arguments[r]);return"Minified MUI error #"+e+"; visit "+n+" for the full message."}var xn={exports:{}},L={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wn;function ft(){if(Wn)return L;Wn=1;var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),t=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),u=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),s=Symbol.for("react.suspense"),l=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),b;b=Symbol.for("react.module.reference");function h(f){if(typeof f=="object"&&f!==null){var E=f.$$typeof;switch(E){case e:switch(f=f.type,f){case r:case o:case t:case s:case l:return f;default:switch(f=f&&f.$$typeof,f){case u:case a:case c:case d:case p:case i:return f;default:return E}}case n:return E}}}return L.ContextConsumer=a,L.ContextProvider=i,L.Element=e,L.ForwardRef=c,L.Fragment=r,L.Lazy=d,L.Memo=p,L.Portal=n,L.Profiler=o,L.StrictMode=t,L.Suspense=s,L.SuspenseList=l,L.isAsyncMode=function(){return!1},L.isConcurrentMode=function(){return!1},L.isContextConsumer=function(f){return h(f)===a},L.isContextProvider=function(f){return h(f)===i},L.isElement=function(f){return typeof f=="object"&&f!==null&&f.$$typeof===e},L.isForwardRef=function(f){return h(f)===c},L.isFragment=function(f){return h(f)===r},L.isLazy=function(f){return h(f)===d},L.isMemo=function(f){return h(f)===p},L.isPortal=function(f){return h(f)===n},L.isProfiler=function(f){return h(f)===o},L.isStrictMode=function(f){return h(f)===t},L.isSuspense=function(f){return h(f)===s},L.isSuspenseList=function(f){return h(f)===l},L.isValidElementType=function(f){return typeof f=="string"||typeof f=="function"||f===r||f===o||f===t||f===s||f===l||f===v||typeof f=="object"&&f!==null&&(f.$$typeof===d||f.$$typeof===p||f.$$typeof===i||f.$$typeof===a||f.$$typeof===c||f.$$typeof===b||f.getModuleId!==void 0)},L.typeOf=h,L}var F={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xn;function pt(){return Xn||(Xn=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),t=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),u=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),s=Symbol.for("react.suspense"),l=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),b=!1,h=!1,f=!1,E=!1,Y=!1,j;j=Symbol.for("react.module.reference");function N(k){return!!(typeof k=="string"||typeof k=="function"||k===r||k===o||Y||k===t||k===s||k===l||E||k===v||b||h||f||typeof k=="object"&&k!==null&&(k.$$typeof===d||k.$$typeof===p||k.$$typeof===i||k.$$typeof===a||k.$$typeof===c||k.$$typeof===j||k.getModuleId!==void 0))}function g(k){if(typeof k=="object"&&k!==null){var Oe=k.$$typeof;switch(Oe){case e:var Xe=k.type;switch(Xe){case r:case o:case t:case s:case l:return Xe;default:var Pn=Xe&&Xe.$$typeof;switch(Pn){case u:case a:case c:case d:case p:case i:return Pn;default:return Oe}}case n:return Oe}}}var Z=a,oe=i,le=e,se=c,B=r,Q=d,ue=p,de=n,ne=o,X=t,re=s,ce=l,Se=!1,_e=!1;function m(k){return Se||(Se=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function x(k){return _e||(_e=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function O(k){return g(k)===a}function C(k){return g(k)===i}function w(k){return typeof k=="object"&&k!==null&&k.$$typeof===e}function P(k){return g(k)===c}function T(k){return g(k)===r}function _(k){return g(k)===d}function I(k){return g(k)===p}function D(k){return g(k)===n}function M(k){return g(k)===o}function ee(k){return g(k)===t}function y(k){return g(k)===s}function ie(k){return g(k)===l}F.ContextConsumer=Z,F.ContextProvider=oe,F.Element=le,F.ForwardRef=se,F.Fragment=B,F.Lazy=Q,F.Memo=ue,F.Portal=de,F.Profiler=ne,F.StrictMode=X,F.Suspense=re,F.SuspenseList=ce,F.isAsyncMode=m,F.isConcurrentMode=x,F.isContextConsumer=O,F.isContextProvider=C,F.isElement=w,F.isForwardRef=P,F.isFragment=T,F.isLazy=_,F.isMemo=I,F.isPortal=D,F.isProfiler=M,F.isStrictMode=ee,F.isSuspense=y,F.isSuspenseList=ie,F.isValidElementType=N,F.typeOf=g}()),F}process.env.NODE_ENV==="production"?xn.exports=ft():xn.exports=pt();var Kn=xn.exports;const ht=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function gt(e){const n=`${e}`.match(ht);return n&&n[1]||""}function Sr(e,n=""){return e.displayName||e.name||gt(e)||n}function Yn(e,n,r){const t=Sr(n);return e.displayName||(t!==""?`${r}(${t})`:r)}function mt(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Sr(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Kn.ForwardRef:return Yn(e,e.render,"ForwardRef");case Kn.Memo:return Yn(e,e.type,"memo");default:return}}}function he(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":je(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Er(e,n){const r=A({},n);return Object.keys(e).forEach(t=>{if(t.toString().match(/^(components|slots)$/))r[t]=A({},e[t],r[t]);else if(t.toString().match(/^(componentsProps|slotProps)$/)){const o=e[t]||{},i=n[t];r[t]={},!i||!Object.keys(i)?r[t]=o:!o||!Object.keys(o)?r[t]=i:(r[t]=A({},i),Object.keys(o).forEach(a=>{r[t][a]=Er(o[a],i[a])}))}else r[t]===void 0&&(r[t]=e[t])}),r}function bt(e,n,r=void 0){const t={};return Object.keys(e).forEach(o=>{t[o]=e[o].reduce((i,a)=>{if(a){const u=n(a);u!==""&&i.push(u),r&&r[a]&&i.push(r[a])}return i},[]).join(" ")}),t}const Jn=e=>e,yt=()=>{let e=Jn;return{configure(n){e=n},generate(n){return e(n)},reset(){e=Jn}}},vt=yt(),xt=vt,kt={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Tn(e,n,r="Mui"){const t=kt[n];return t?`${r}-${t}`:`${xt.generate(e)}-${n}`}function St(e,n,r="Mui"){const t={};return n.forEach(o=>{t[o]=Tn(e,o,r)}),t}function ve(e,n){if(e==null)return{};var r={},t=Object.keys(e),o,i;for(i=0;i<t.length;i++)o=t[i],!(n.indexOf(o)>=0)&&(r[o]=e[o]);return r}function wr(e){var n,r,t="";if(typeof e=="string"||typeof e=="number")t+=e;else if(typeof e=="object")if(Array.isArray(e))for(n=0;n<e.length;n++)e[n]&&(r=wr(e[n]))&&(t&&(t+=" "),t+=r);else for(n in e)e[n]&&(t&&(t+=" "),t+=n);return t}function Et(){for(var e,n,r=0,t="";r<arguments.length;)(e=arguments[r++])&&(n=wr(e))&&(t&&(t+=" "),t+=n);return t}const wt=["values","unit","step"],Tt=e=>{const n=Object.keys(e).map(r=>({key:r,val:e[r]}))||[];return n.sort((r,t)=>r.val-t.val),n.reduce((r,t)=>A({},r,{[t.key]:t.val}),{})};function Ct(e){const{values:n={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:r="px",step:t=5}=e,o=ve(e,wt),i=Tt(n),a=Object.keys(i);function u(d){return`@media (min-width:${typeof n[d]=="number"?n[d]:d}${r})`}function c(d){return`@media (max-width:${(typeof n[d]=="number"?n[d]:d)-t/100}${r})`}function s(d,v){const b=a.indexOf(v);return`@media (min-width:${typeof n[d]=="number"?n[d]:d}${r}) and (max-width:${(b!==-1&&typeof n[a[b]]=="number"?n[a[b]]:v)-t/100}${r})`}function l(d){return a.indexOf(d)+1<a.length?s(d,a[a.indexOf(d)+1]):u(d)}function p(d){const v=a.indexOf(d);return v===0?u(a[1]):v===a.length-1?c(a[v]):s(d,a[a.indexOf(d)+1]).replace("@media","@media not all and")}return A({keys:a,values:i,up:u,down:c,between:s,only:l,not:p,unit:r},o)}const _t={borderRadius:4},Ot=_t,$t=process.env.NODE_ENV!=="production"?q.oneOfType([q.number,q.string,q.object,q.array]):{},ke=$t;function Fe(e,n){return n?be(e,n,{clone:!1}):e}const Cn={xs:0,sm:600,md:900,lg:1200,xl:1536},Zn={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Cn[e]}px)`};function ye(e,n,r){const t=e.theme||{};if(Array.isArray(n)){const i=t.breakpoints||Zn;return n.reduce((a,u,c)=>(a[i.up(i.keys[c])]=r(n[c]),a),{})}if(typeof n=="object"){const i=t.breakpoints||Zn;return Object.keys(n).reduce((a,u)=>{if(Object.keys(i.values||Cn).indexOf(u)!==-1){const c=i.up(u);a[c]=r(n[u],u)}else{const c=u;a[c]=n[c]}return a},{})}return r(n)}function Rt(e={}){var n;return((n=e.keys)==null?void 0:n.reduce((t,o)=>{const i=e.up(o);return t[i]={},t},{}))||{}}function Nt(e,n){return e.reduce((r,t)=>{const o=r[t];return(!o||Object.keys(o).length===0)&&delete r[t],r},n)}function Qe(e,n,r=!0){if(!n||typeof n!="string")return null;if(e&&e.vars&&r){const t=`vars.${n}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(t!=null)return t}return n.split(".").reduce((t,o)=>t&&t[o]!=null?t[o]:null,e)}function Ze(e,n,r,t=r){let o;return typeof e=="function"?o=e(r):Array.isArray(e)?o=e[r]||t:o=Qe(e,r)||t,n&&(o=n(o,t,e)),o}function U(e){const{prop:n,cssProperty:r=e.prop,themeKey:t,transform:o}=e,i=a=>{if(a[n]==null)return null;const u=a[n],c=a.theme,s=Qe(c,t)||{};return ye(a,u,p=>{let d=Ze(s,o,p);return p===d&&typeof p=="string"&&(d=Ze(s,o,`${n}${p==="default"?"":he(p)}`,p)),r===!1?d:{[r]:d}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[n]:ke}:{},i.filterProps=[n],i}function At(e){const n={};return r=>(n[r]===void 0&&(n[r]=e(r)),n[r])}const Pt={m:"margin",p:"padding"},It={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Qn={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Mt=At(e=>{if(e.length>2)if(Qn[e])e=Qn[e];else return[e];const[n,r]=e.split(""),t=Pt[n],o=It[r]||"";return Array.isArray(o)?o.map(i=>t+i):[t+o]}),en=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],nn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],jt=[...en,...nn];function He(e,n,r,t){var o;const i=(o=Qe(e,n,!1))!=null?o:r;return typeof i=="number"?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&typeof a!="number"&&console.error(`MUI: Expected ${t} argument to be a number or a string, got ${a}.`),i*a):Array.isArray(i)?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&(Number.isInteger(a)?a>i.length-1&&console.error([`MUI: The value provided (${a}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${a} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${n}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${n}\` as a number.`].join(`
`))),i[a]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${n}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Tr(e){return He(e,"spacing",8,"spacing")}function We(e,n){if(typeof n=="string"||n==null)return n;const r=Math.abs(n),t=e(r);return n>=0?t:typeof t=="number"?-t:`-${t}`}function Bt(e,n){return r=>e.reduce((t,o)=>(t[o]=We(n,r),t),{})}function Dt(e,n,r,t){if(n.indexOf(r)===-1)return null;const o=Mt(r),i=Bt(o,t),a=e[r];return ye(e,a,i)}function Cr(e,n){const r=Tr(e.theme);return Object.keys(e).map(t=>Dt(e,n,t,r)).reduce(Fe,{})}function H(e){return Cr(e,en)}H.propTypes=process.env.NODE_ENV!=="production"?en.reduce((e,n)=>(e[n]=ke,e),{}):{};H.filterProps=en;function W(e){return Cr(e,nn)}W.propTypes=process.env.NODE_ENV!=="production"?nn.reduce((e,n)=>(e[n]=ke,e),{}):{};W.filterProps=nn;process.env.NODE_ENV!=="production"&&jt.reduce((e,n)=>(e[n]=ke,e),{});function zt(e=8){if(e.mui)return e;const n=Tr({spacing:e}),r=(...t)=>(process.env.NODE_ENV!=="production"&&(t.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${t.length}`)),(t.length===0?[1]:t).map(i=>{const a=n(i);return typeof a=="number"?`${a}px`:a}).join(" "));return r.mui=!0,r}function rn(...e){const n=e.reduce((t,o)=>(o.filterProps.forEach(i=>{t[i]=o}),t),{}),r=t=>Object.keys(t).reduce((o,i)=>n[i]?Fe(o,n[i](t)):o,{});return r.propTypes=process.env.NODE_ENV!=="production"?e.reduce((t,o)=>Object.assign(t,o.propTypes),{}):{},r.filterProps=e.reduce((t,o)=>t.concat(o.filterProps),[]),r}function pe(e){return typeof e!="number"?e:`${e}px solid`}const Vt=U({prop:"border",themeKey:"borders",transform:pe}),Lt=U({prop:"borderTop",themeKey:"borders",transform:pe}),Ft=U({prop:"borderRight",themeKey:"borders",transform:pe}),Ut=U({prop:"borderBottom",themeKey:"borders",transform:pe}),qt=U({prop:"borderLeft",themeKey:"borders",transform:pe}),Gt=U({prop:"borderColor",themeKey:"palette"}),Ht=U({prop:"borderTopColor",themeKey:"palette"}),Wt=U({prop:"borderRightColor",themeKey:"palette"}),Xt=U({prop:"borderBottomColor",themeKey:"palette"}),Kt=U({prop:"borderLeftColor",themeKey:"palette"}),tn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const n=He(e.theme,"shape.borderRadius",4,"borderRadius"),r=t=>({borderRadius:We(n,t)});return ye(e,e.borderRadius,r)}return null};tn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:ke}:{};tn.filterProps=["borderRadius"];rn(Vt,Lt,Ft,Ut,qt,Gt,Ht,Wt,Xt,Kt,tn);const on=e=>{if(e.gap!==void 0&&e.gap!==null){const n=He(e.theme,"spacing",8,"gap"),r=t=>({gap:We(n,t)});return ye(e,e.gap,r)}return null};on.propTypes=process.env.NODE_ENV!=="production"?{gap:ke}:{};on.filterProps=["gap"];const an=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const n=He(e.theme,"spacing",8,"columnGap"),r=t=>({columnGap:We(n,t)});return ye(e,e.columnGap,r)}return null};an.propTypes=process.env.NODE_ENV!=="production"?{columnGap:ke}:{};an.filterProps=["columnGap"];const sn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const n=He(e.theme,"spacing",8,"rowGap"),r=t=>({rowGap:We(n,t)});return ye(e,e.rowGap,r)}return null};sn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:ke}:{};sn.filterProps=["rowGap"];const Yt=U({prop:"gridColumn"}),Jt=U({prop:"gridRow"}),Zt=U({prop:"gridAutoFlow"}),Qt=U({prop:"gridAutoColumns"}),eo=U({prop:"gridAutoRows"}),no=U({prop:"gridTemplateColumns"}),ro=U({prop:"gridTemplateRows"}),to=U({prop:"gridTemplateAreas"}),oo=U({prop:"gridArea"});rn(on,an,sn,Yt,Jt,Zt,Qt,eo,no,ro,to,oo);function Me(e,n){return n==="grey"?n:e}const io=U({prop:"color",themeKey:"palette",transform:Me}),ao=U({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Me}),so=U({prop:"backgroundColor",themeKey:"palette",transform:Me});rn(io,ao,so);function te(e){return e<=1&&e!==0?`${e*100}%`:e}const co=U({prop:"width",transform:te}),_n=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const n=r=>{var t;return{maxWidth:((t=e.theme)==null||(t=t.breakpoints)==null||(t=t.values)==null?void 0:t[r])||Cn[r]||te(r)}};return ye(e,e.maxWidth,n)}return null};_n.filterProps=["maxWidth"];const lo=U({prop:"minWidth",transform:te}),uo=U({prop:"height",transform:te}),fo=U({prop:"maxHeight",transform:te}),po=U({prop:"minHeight",transform:te});U({prop:"size",cssProperty:"width",transform:te});U({prop:"size",cssProperty:"height",transform:te});const ho=U({prop:"boxSizing"});rn(co,_n,lo,uo,fo,po,ho);const go={border:{themeKey:"borders",transform:pe},borderTop:{themeKey:"borders",transform:pe},borderRight:{themeKey:"borders",transform:pe},borderBottom:{themeKey:"borders",transform:pe},borderLeft:{themeKey:"borders",transform:pe},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:tn},color:{themeKey:"palette",transform:Me},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Me},backgroundColor:{themeKey:"palette",transform:Me},p:{style:W},pt:{style:W},pr:{style:W},pb:{style:W},pl:{style:W},px:{style:W},py:{style:W},padding:{style:W},paddingTop:{style:W},paddingRight:{style:W},paddingBottom:{style:W},paddingLeft:{style:W},paddingX:{style:W},paddingY:{style:W},paddingInline:{style:W},paddingInlineStart:{style:W},paddingInlineEnd:{style:W},paddingBlock:{style:W},paddingBlockStart:{style:W},paddingBlockEnd:{style:W},m:{style:H},mt:{style:H},mr:{style:H},mb:{style:H},ml:{style:H},mx:{style:H},my:{style:H},margin:{style:H},marginTop:{style:H},marginRight:{style:H},marginBottom:{style:H},marginLeft:{style:H},marginX:{style:H},marginY:{style:H},marginInline:{style:H},marginInlineStart:{style:H},marginInlineEnd:{style:H},marginBlock:{style:H},marginBlockStart:{style:H},marginBlockEnd:{style:H},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:on},rowGap:{style:sn},columnGap:{style:an},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:te},maxWidth:{style:_n},minWidth:{transform:te},height:{transform:te},maxHeight:{transform:te},minHeight:{transform:te},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},On=go;function mo(...e){const n=e.reduce((t,o)=>t.concat(Object.keys(o)),[]),r=new Set(n);return e.every(t=>r.size===Object.keys(t).length)}function bo(e,n){return typeof e=="function"?e(n):e}function yo(){function e(r,t,o,i){const a={[r]:t,theme:o},u=i[r];if(!u)return{[r]:t};const{cssProperty:c=r,themeKey:s,transform:l,style:p}=u;if(t==null)return null;if(s==="typography"&&t==="inherit")return{[r]:t};const d=Qe(o,s)||{};return p?p(a):ye(a,t,b=>{let h=Ze(d,l,b);return b===h&&typeof b=="string"&&(h=Ze(d,l,`${r}${b==="default"?"":he(b)}`,b)),c===!1?h:{[c]:h}})}function n(r){var t;const{sx:o,theme:i={}}=r||{};if(!o)return null;const a=(t=i.unstable_sxConfig)!=null?t:On;function u(c){let s=c;if(typeof c=="function")s=c(i);else if(typeof c!="object")return c;if(!s)return null;const l=Rt(i.breakpoints),p=Object.keys(l);let d=l;return Object.keys(s).forEach(v=>{const b=bo(s[v],i);if(b!=null)if(typeof b=="object")if(a[v])d=Fe(d,e(v,b,i,a));else{const h=ye({theme:i},b,f=>({[v]:f}));mo(h,b)?d[v]=n({sx:b,theme:i}):d=Fe(d,h)}else d=Fe(d,e(v,b,i,a))}),Nt(p,d)}return Array.isArray(o)?o.map(u):u(o)}return n}const _r=yo();_r.filterProps=["sx"];const $n=_r,vo=["breakpoints","palette","spacing","shape"];function Rn(e={},...n){const{breakpoints:r={},palette:t={},spacing:o,shape:i={}}=e,a=ve(e,vo),u=Ct(r),c=zt(o);let s=be({breakpoints:u,direction:"ltr",components:{},palette:A({mode:"light"},t),spacing:c,shape:A({},Ot,i)},a);return s=n.reduce((l,p)=>be(l,p),s),s.unstable_sxConfig=A({},On,a==null?void 0:a.unstable_sxConfig),s.unstable_sx=function(p){return $n({sx:p,theme:this})},s}function xo(e){return Object.keys(e).length===0}function ko(e=null){const n=Ue.useContext(yn.ThemeContext);return!n||xo(n)?e:n}const So=Rn();function Eo(e=So){return ko(e)}const wo=["variant"];function er(e){return e.length===0}function Or(e){const{variant:n}=e,r=ve(e,wo);let t=n||"";return Object.keys(r).sort().forEach(o=>{o==="color"?t+=er(t)?e[o]:he(e[o]):t+=`${er(t)?o:he(o)}${he(e[o].toString())}`}),t}const To=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Co(e){return Object.keys(e).length===0}function _o(e){return typeof e=="string"&&e.charCodeAt(0)>96}const Oo=(e,n)=>n.components&&n.components[e]&&n.components[e].styleOverrides?n.components[e].styleOverrides:null,$o=(e,n)=>{let r=[];n&&n.components&&n.components[e]&&n.components[e].variants&&(r=n.components[e].variants);const t={};return r.forEach(o=>{const i=Or(o.props);t[i]=o.style}),t},Ro=(e,n,r,t)=>{var o;const{ownerState:i={}}=e,a=[],u=r==null||(o=r.components)==null||(o=o[t])==null?void 0:o.variants;return u&&u.forEach(c=>{let s=!0;Object.keys(c.props).forEach(l=>{i[l]!==c.props[l]&&e[l]!==c.props[l]&&(s=!1)}),s&&a.push(n[Or(c.props)])}),a};function Ye(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const No=Rn(),nr=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Ve({defaultTheme:e,theme:n,themeId:r}){return Co(n)?e:n[r]||n}function Ao(e){return e?(n,r)=>r[e]:null}function Po(e={}){const{themeId:n,defaultTheme:r=No,rootShouldForwardProp:t=Ye,slotShouldForwardProp:o=Ye}=e,i=a=>$n(A({},a,{theme:Ve(A({},a,{defaultTheme:r,themeId:n}))}));return i.__mui_systemSx=!0,(a,u={})=>{yn.internal_processStyles(a,N=>N.filter(g=>!(g!=null&&g.__mui_systemSx)));const{name:c,slot:s,skipVariantsResolver:l,skipSx:p,overridesResolver:d=Ao(nr(s))}=u,v=ve(u,To),b=l!==void 0?l:s&&s!=="Root"&&s!=="root"||!1,h=p||!1;let f;process.env.NODE_ENV!=="production"&&c&&(f=`${c}-${nr(s||"Root")}`);let E=Ye;s==="Root"||s==="root"?E=t:s?E=o:_o(a)&&(E=void 0);const Y=yn(a,A({shouldForwardProp:E,label:f},v)),j=(N,...g)=>{const Z=g?g.map(B=>typeof B=="function"&&B.__emotion_real!==B?Q=>B(A({},Q,{theme:Ve(A({},Q,{defaultTheme:r,themeId:n}))})):B):[];let oe=N;c&&d&&Z.push(B=>{const Q=Ve(A({},B,{defaultTheme:r,themeId:n})),ue=Oo(c,Q);if(ue){const de={};return Object.entries(ue).forEach(([ne,X])=>{de[ne]=typeof X=="function"?X(A({},B,{theme:Q})):X}),d(B,de)}return null}),c&&!b&&Z.push(B=>{const Q=Ve(A({},B,{defaultTheme:r,themeId:n}));return Ro(B,$o(c,Q),Q,c)}),h||Z.push(i);const le=Z.length-g.length;if(Array.isArray(N)&&le>0){const B=new Array(le).fill("");oe=[...N,...B],oe.raw=[...N.raw,...B]}else typeof N=="function"&&N.__emotion_real!==N&&(oe=B=>N(A({},B,{theme:Ve(A({},B,{defaultTheme:r,themeId:n}))})));const se=Y(oe,...Z);if(process.env.NODE_ENV!=="production"){let B;c&&(B=`${c}${he(s||"")}`),B===void 0&&(B=`Styled(${mt(a)})`),se.displayName=B}return a.muiName&&(se.muiName=a.muiName),se};return Y.withConfig&&(j.withConfig=Y.withConfig),j}}function Io(e){const{theme:n,name:r,props:t}=e;return!n||!n.components||!n.components[r]||!n.components[r].defaultProps?t:Er(n.components[r].defaultProps,t)}function Mo({props:e,name:n,defaultTheme:r,themeId:t}){let o=Eo(r);return t&&(o=o[t]||o),Io({theme:o,name:n,props:e})}function $r(e,n=0,r=1){return process.env.NODE_ENV!=="production"&&(e<n||e>r)&&console.error(`MUI: The value provided ${e} is out of range [${n}, ${r}].`),Math.min(Math.max(n,e),r)}function jo(e){e=e.slice(1);const n=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let r=e.match(n);return r&&r[0].length===1&&(r=r.map(t=>t+t)),r?`rgb${r.length===4?"a":""}(${r.map((t,o)=>o<3?parseInt(t,16):Math.round(parseInt(t,16)/255*1e3)/1e3).join(", ")})`:""}function Be(e){if(e.type)return e;if(e.charAt(0)==="#")return Be(jo(e));const n=e.indexOf("("),r=e.substring(0,n);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:je(9,e));let t=e.substring(n+1,e.length-1),o;if(r==="color"){if(t=t.split(" "),o=t.shift(),t.length===4&&t[3].charAt(0)==="/"&&(t[3]=t[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:je(10,o))}else t=t.split(",");return t=t.map(i=>parseFloat(i)),{type:r,values:t,colorSpace:o}}function Nn(e){const{type:n,colorSpace:r}=e;let{values:t}=e;return n.indexOf("rgb")!==-1?t=t.map((o,i)=>i<3?parseInt(o,10):o):n.indexOf("hsl")!==-1&&(t[1]=`${t[1]}%`,t[2]=`${t[2]}%`),n.indexOf("color")!==-1?t=`${r} ${t.join(" ")}`:t=`${t.join(", ")}`,`${n}(${t})`}function Bo(e){e=Be(e);const{values:n}=e,r=n[0],t=n[1]/100,o=n[2]/100,i=t*Math.min(o,1-o),a=(s,l=(s+r/30)%12)=>o-i*Math.max(Math.min(l-3,9-l,1),-1);let u="rgb";const c=[Math.round(a(0)*255),Math.round(a(8)*255),Math.round(a(4)*255)];return e.type==="hsla"&&(u+="a",c.push(n[3])),Nn({type:u,values:c})}function rr(e){e=Be(e);let n=e.type==="hsl"||e.type==="hsla"?Be(Bo(e)).values:e.values;return n=n.map(r=>(e.type!=="color"&&(r/=255),r<=.03928?r/12.92:((r+.055)/1.055)**2.4)),Number((.2126*n[0]+.7152*n[1]+.0722*n[2]).toFixed(3))}function tr(e,n){const r=rr(e),t=rr(n);return(Math.max(r,t)+.05)/(Math.min(r,t)+.05)}function Do(e,n){if(e=Be(e),n=$r(n),e.type.indexOf("hsl")!==-1)e.values[2]*=1-n;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]*=1-n;return Nn(e)}function zo(e,n){if(e=Be(e),n=$r(n),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*n;else if(e.type.indexOf("rgb")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(255-e.values[r])*n;else if(e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(1-e.values[r])*n;return Nn(e)}function Vo(e,n){return A({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},n)}const Lo={black:"#000",white:"#fff"},Ge=Lo,Fo={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Uo=Fo,qo={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},$e=qo,Go={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Re=Go,Ho={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Le=Ho,Wo={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ne=Wo,Xo={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Ae=Xo,Ko={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Pe=Ko,Yo=["mode","contrastThreshold","tonalOffset"],or={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Ge.white,default:Ge.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},mn={text:{primary:Ge.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Ge.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function ir(e,n,r,t){const o=t.light||t,i=t.dark||t*1.5;e[n]||(e.hasOwnProperty(r)?e[n]=e[r]:n==="light"?e.light=zo(e.main,o):n==="dark"&&(e.dark=Do(e.main,i)))}function Jo(e="light"){return e==="dark"?{main:Ne[200],light:Ne[50],dark:Ne[400]}:{main:Ne[700],light:Ne[400],dark:Ne[800]}}function Zo(e="light"){return e==="dark"?{main:$e[200],light:$e[50],dark:$e[400]}:{main:$e[500],light:$e[300],dark:$e[700]}}function Qo(e="light"){return e==="dark"?{main:Re[500],light:Re[300],dark:Re[700]}:{main:Re[700],light:Re[400],dark:Re[800]}}function ei(e="light"){return e==="dark"?{main:Ae[400],light:Ae[300],dark:Ae[700]}:{main:Ae[700],light:Ae[500],dark:Ae[900]}}function ni(e="light"){return e==="dark"?{main:Pe[400],light:Pe[300],dark:Pe[700]}:{main:Pe[800],light:Pe[500],dark:Pe[900]}}function ri(e="light"){return e==="dark"?{main:Le[400],light:Le[300],dark:Le[700]}:{main:"#ed6c02",light:Le[500],dark:Le[900]}}function ti(e){const{mode:n="light",contrastThreshold:r=3,tonalOffset:t=.2}=e,o=ve(e,Yo),i=e.primary||Jo(n),a=e.secondary||Zo(n),u=e.error||Qo(n),c=e.info||ei(n),s=e.success||ni(n),l=e.warning||ri(n);function p(h){const f=tr(h,mn.text.primary)>=r?mn.text.primary:or.text.primary;if(process.env.NODE_ENV!=="production"){const E=tr(h,f);E<3&&console.error([`MUI: The contrast ratio of ${E}:1 for ${f} on ${h}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return f}const d=({color:h,name:f,mainShade:E=500,lightShade:Y=300,darkShade:j=700})=>{if(h=A({},h),!h.main&&h[E]&&(h.main=h[E]),!h.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${f?` (${f})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.`:je(11,f?` (${f})`:"",E));if(typeof h.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${f?` (${f})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:je(12,f?` (${f})`:"",JSON.stringify(h.main)));return ir(h,"light",Y,t),ir(h,"dark",j,t),h.contrastText||(h.contrastText=p(h.main)),h},v={dark:mn,light:or};return process.env.NODE_ENV!=="production"&&(v[n]||console.error(`MUI: The palette mode \`${n}\` is not supported.`)),be(A({common:A({},Ge),mode:n,primary:d({color:i,name:"primary"}),secondary:d({color:a,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:d({color:u,name:"error"}),warning:d({color:l,name:"warning"}),info:d({color:c,name:"info"}),success:d({color:s,name:"success"}),grey:Uo,contrastThreshold:r,getContrastText:p,augmentColor:d,tonalOffset:t},v[n]),o)}const oi=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function ii(e){return Math.round(e*1e5)/1e5}const ar={textTransform:"uppercase"},sr='"Roboto", "Helvetica", "Arial", sans-serif';function ai(e,n){const r=typeof n=="function"?n(e):n,{fontFamily:t=sr,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:a=400,fontWeightMedium:u=500,fontWeightBold:c=700,htmlFontSize:s=16,allVariants:l,pxToRem:p}=r,d=ve(r,oi);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof s!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const v=o/14,b=p||(E=>`${E/s*v}rem`),h=(E,Y,j,N,g)=>A({fontFamily:t,fontWeight:E,fontSize:b(Y),lineHeight:j},t===sr?{letterSpacing:`${ii(N/Y)}em`}:{},g,l),f={h1:h(i,96,1.167,-1.5),h2:h(i,60,1.2,-.5),h3:h(a,48,1.167,0),h4:h(a,34,1.235,.25),h5:h(a,24,1.334,0),h6:h(u,20,1.6,.15),subtitle1:h(a,16,1.75,.15),subtitle2:h(u,14,1.57,.1),body1:h(a,16,1.5,.15),body2:h(a,14,1.43,.15),button:h(u,14,1.75,.4,ar),caption:h(a,12,1.66,.4),overline:h(a,12,2.66,1,ar),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return be(A({htmlFontSize:s,pxToRem:b,fontFamily:t,fontSize:o,fontWeightLight:i,fontWeightRegular:a,fontWeightMedium:u,fontWeightBold:c},f),d,{clone:!1})}const si=.2,ci=.14,li=.12;function G(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${si})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${ci})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${li})`].join(",")}const ui=["none",G(0,2,1,-1,0,1,1,0,0,1,3,0),G(0,3,1,-2,0,2,2,0,0,1,5,0),G(0,3,3,-2,0,3,4,0,0,1,8,0),G(0,2,4,-1,0,4,5,0,0,1,10,0),G(0,3,5,-1,0,5,8,0,0,1,14,0),G(0,3,5,-1,0,6,10,0,0,1,18,0),G(0,4,5,-2,0,7,10,1,0,2,16,1),G(0,5,5,-3,0,8,10,1,0,3,14,2),G(0,5,6,-3,0,9,12,1,0,3,16,2),G(0,6,6,-3,0,10,14,1,0,4,18,3),G(0,6,7,-4,0,11,15,1,0,4,20,3),G(0,7,8,-4,0,12,17,2,0,5,22,4),G(0,7,8,-4,0,13,19,2,0,5,24,4),G(0,7,9,-4,0,14,21,2,0,5,26,4),G(0,8,9,-5,0,15,22,2,0,6,28,5),G(0,8,10,-5,0,16,24,2,0,6,30,5),G(0,8,11,-5,0,17,26,2,0,6,32,5),G(0,9,11,-5,0,18,28,2,0,7,34,6),G(0,9,12,-6,0,19,29,2,0,7,36,6),G(0,10,13,-6,0,20,31,3,0,8,38,7),G(0,10,13,-6,0,21,33,3,0,8,40,7),G(0,10,14,-6,0,22,35,3,0,8,42,7),G(0,11,14,-7,0,23,36,3,0,9,44,8),G(0,11,15,-7,0,24,38,3,0,9,46,8)],di=ui,fi=["duration","easing","delay"],pi={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},hi={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function cr(e){return`${Math.round(e)}ms`}function gi(e){if(!e)return 0;const n=e/36;return Math.round((4+15*n**.25+n/5)*10)}function mi(e){const n=A({},pi,e.easing),r=A({},hi,e.duration);return A({getAutoHeightDuration:gi,create:(o=["all"],i={})=>{const{duration:a=r.standard,easing:u=n.easeInOut,delay:c=0}=i,s=ve(i,fi);if(process.env.NODE_ENV!=="production"){const l=d=>typeof d=="string",p=d=>!isNaN(parseFloat(d));!l(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!p(a)&&!l(a)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`),l(u)||console.error('MUI: Argument "easing" must be a string.'),!p(c)&&!l(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(s).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(s).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(l=>`${l} ${typeof a=="string"?a:cr(a)} ${u} ${typeof c=="string"?c:cr(c)}`).join(",")}},e,{easing:n,duration:r})}const bi={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},yi=bi,vi=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function xi(e={},...n){const{mixins:r={},palette:t={},transitions:o={},typography:i={}}=e,a=ve(e,vi);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":je(18));const u=ti(t),c=Rn(e);let s=be(c,{mixins:Vo(c.breakpoints,r),palette:u,shadows:di.slice(),typography:ai(u,i),transitions:mi(o),zIndex:A({},yi)});if(s=be(s,a),s=n.reduce((l,p)=>be(l,p),s),process.env.NODE_ENV!=="production"){const l=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],p=(d,v)=>{let b;for(b in d){const h=d[b];if(l.indexOf(b)!==-1&&Object.keys(h).length>0){if(process.env.NODE_ENV!=="production"){const f=Tn("",b);console.error([`MUI: The \`${v}\` component increases the CSS specificity of the \`${b}\` internal state.`,"You can not override it like this: ",JSON.stringify(d,null,2),"",`Instead, you need to use the '&.${f}' syntax:`,JSON.stringify({root:{[`&.${f}`]:h}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}d[b]={}}}};Object.keys(s.components).forEach(d=>{const v=s.components[d].styleOverrides;v&&d.indexOf("Mui")===0&&p(v,d)})}return s.unstable_sxConfig=A({},On,a==null?void 0:a.unstable_sxConfig),s.unstable_sx=function(p){return $n({sx:p,theme:this})},s}const ki=xi(),Rr=ki,Nr="$$material";function Si({props:e,name:n}){return Mo({props:e,name:n,defaultTheme:Rr,themeId:Nr})}const Ei=e=>Ye(e)&&e!=="classes",wi=Po({themeId:Nr,defaultTheme:Rr,rootShouldForwardProp:Ei}),Ti=wi;function Ci(e){return Tn("MuiSvgIcon",e)}St("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const _i=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Oi=e=>{const{color:n,fontSize:r,classes:t}=e,o={root:["root",n!=="inherit"&&`color${he(n)}`,`fontSize${he(r)}`]};return bt(o,Ci,t)},$i=Ti("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:r}=e;return[n.root,r.color!=="inherit"&&n[`color${he(r.color)}`],n[`fontSize${he(r.fontSize)}`]]}})(({theme:e,ownerState:n})=>{var r,t,o,i,a,u,c,s,l,p,d,v,b;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:n.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(r=e.transitions)==null||(t=r.create)==null?void 0:t.call(r,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(a=i.pxToRem)==null?void 0:a.call(i,20))||"1.25rem",medium:((u=e.typography)==null||(c=u.pxToRem)==null?void 0:c.call(u,24))||"1.5rem",large:((s=e.typography)==null||(l=s.pxToRem)==null?void 0:l.call(s,35))||"2.1875rem"}[n.fontSize],color:(p=(d=(e.vars||e).palette)==null||(d=d[n.color])==null?void 0:d.main)!=null?p:{action:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.active,disabled:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.disabled,inherit:void 0}[n.color]}}),An=Ue.forwardRef(function(n,r){const t=Si({props:n,name:"MuiSvgIcon"}),{children:o,className:i,color:a="inherit",component:u="svg",fontSize:c="medium",htmlColor:s,inheritViewBox:l=!1,titleAccess:p,viewBox:d="0 0 24 24"}=t,v=ve(t,_i),b=Ue.isValidElement(o)&&o.type==="svg",h=A({},t,{color:a,component:u,fontSize:c,instanceFontSize:n.fontSize,inheritViewBox:l,viewBox:d,hasSvgAsChild:b}),f={};l||(f.viewBox=d);const E=Oi(h);return S.jsxs($i,A({as:u,className:Et(E.root,i),focusable:"false",color:s,"aria-hidden":p?void 0:!0,role:p?"img":void 0,ref:r},f,v,b&&o.props,{ownerState:h,children:[b?o.props.children:o,p?S.jsx("title",{children:p}):null]}))});process.env.NODE_ENV!=="production"&&(An.propTypes={children:q.node,classes:q.object,className:q.string,color:q.oneOfType([q.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),q.string]),component:q.elementType,fontSize:q.oneOfType([q.oneOf(["inherit","large","medium","small"]),q.string]),htmlColor:q.string,inheritViewBox:q.bool,shapeRendering:q.string,sx:q.oneOfType([q.arrayOf(q.oneOfType([q.func,q.object,q.bool])),q.func,q.object]),titleAccess:q.string,viewBox:q.string});An.muiName="SvgIcon";const lr=An;function Ri(e,n){function r(t,o){return S.jsx(lr,A({"data-testid":`${n}Icon`,ref:o},t,{children:e}))}return process.env.NODE_ENV!=="production"&&(r.displayName=`${n}Icon`),r.muiName=lr.muiName,Ue.memo(Ue.forwardRef(r))}const Ni=Ri(S.jsx("path",{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}),"Menu");function Ai({menu:e,dataHandler:n,commandHandler:r,className:t,id:o,children:i}){const[a,u]=K.useState(!1),[c,s]=K.useState(!1),l=K.useCallback(()=>{a&&u(!1),s(!1)},[a]),p=K.useCallback(E=>{E.stopPropagation(),u(Y=>{const j=!Y;return j&&E.shiftKey?s(!0):j||s(!1),j})},[]),d=K.useRef(void 0),[v,b]=K.useState(0);K.useEffect(()=>{a&&d.current&&b(d.current.clientHeight)},[a]);const h=K.useCallback(E=>(l(),r(E)),[r,l]);let f=e;return!f&&n&&(f=n(c)),S.jsx("div",{ref:d,style:{position:"relative"},children:S.jsx(J.AppBar,{position:"static",id:o,children:S.jsxs(J.Toolbar,{className:`papi-toolbar ${t??""}`,variant:"dense",children:[f?S.jsx(J.IconButton,{edge:"start",className:`papi-menuButton ${t??""}`,color:"inherit","aria-label":"open drawer",onClick:p,children:S.jsx(Ni,{})}):void 0,i?S.jsx("div",{className:"papi-menu-children",children:i}):void 0,f?S.jsx(J.Drawer,{className:`papi-menu-drawer ${t??""}`,anchor:"left",variant:"persistent",open:a,onClose:l,PaperProps:{className:"papi-menu-drawer-paper",style:{top:v}},children:S.jsx(fr,{commandHandler:h,columns:f.columns})}):void 0]})})})}const Pi=(e,n)=>{K.useEffect(()=>{if(!e)return()=>{};const r=e(n);return()=>{r()}},[e,n])};function Ii(e){return{preserveValue:!0,...e}}const Ar=(e,n,r={})=>{const t=K.useRef(n);t.current=n;const o=K.useRef(r);o.current=Ii(o.current);const[i,a]=K.useState(()=>t.current),[u,c]=K.useState(!0);return K.useEffect(()=>{let s=!0;return c(!!e),(async()=>{if(e){const l=await e();s&&(a(()=>l),c(!1))}})(),()=>{s=!1,o.current.preserveValue||a(()=>t.current)}},[e]),[i,u]},bn=()=>!1,Mi=(e,n)=>{const[r]=Ar(K.useCallback(async()=>{if(!e)return bn;const t=await Promise.resolve(e(n));return async()=>t()},[n,e]),bn,{preserveValue:!1});K.useEffect(()=>()=>{r!==bn&&r()},[r])};exports.Button=Ee;exports.ChapterRangeSelector=Ir;exports.Checkbox=ur;exports.ComboBox=Je;exports.GridMenu=fr;exports.IconButton=jr;exports.LabelPosition=Te;exports.MenuItem=dr;exports.RefSelector=Kr;exports.SearchBar=Yr;exports.Slider=Jr;exports.Snackbar=Zr;exports.Switch=Qr;exports.Table=nt;exports.TextField=qe;exports.Toolbar=Ai;exports.useEvent=Pi;exports.useEventAsync=Mi;exports.usePromise=Ar;function ji(e,n="top"){if(!e||typeof document>"u")return;const r=document.head||document.querySelector("head"),t=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),n==="top"&&t?r.insertBefore(o,t):r.appendChild(o)}ji(`.papi-button {
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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

`,"top");
//# sourceMappingURL=index.cjs.map
