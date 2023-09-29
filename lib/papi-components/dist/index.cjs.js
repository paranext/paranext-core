"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const S=require("react/jsx-runtime"),X=require("@mui/material"),ae=require("react"),Ar=require("react-data-grid"),mr=require("@mui/styled-engine");function Dn(e){const r=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const t=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(r,n,t.get?t:{enumerable:!0,get:()=>e[n]})}}return r.default=e,Object.freeze(r)}const Fe=Dn(ae);function Se({id:e,isDisabled:r=!1,className:n,onClick:t,onContextMenu:o,children:a}){return S.jsx(X.Button,{id:e,disabled:r,className:`papi-button ${n??""}`,onClick:t,onContextMenu:o,children:a})}function We({id:e,title:r,isDisabled:n=!1,isClearable:t=!0,hasError:o=!1,isFullWidth:a=!1,width:s,options:c=[],className:i,value:l,onChange:f,onFocus:p,onBlur:u}){return S.jsx(X.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!t,fullWidth:a,options:c,className:`papi-combo-box ${o?"error":""} ${i??""}`,value:l,onChange:f,onFocus:p,onBlur:u,renderInput:y=>S.jsx(X.TextField,{...y,error:o,fullWidth:a,disabled:n,label:r,style:{width:s}})})}function zn({startChapter:e,endChapter:r,onChangeStartChapter:n,onChangeEndChapter:t,isDisabled:o,chapterCount:a}){const s=ae.useMemo(()=>Array.from({length:a},(c,i)=>i+1),[a]);return S.jsxs(S.Fragment,{children:[S.jsx(X.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:S.jsx(We,{onChange:(c,i)=>n(c,i),className:"book-selection-chapter",isClearable:!1,options:s,value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),S.jsx(X.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:S.jsx(We,{onChange:(c,i)=>t(c,i),className:"book-selection-chapter",isClearable:!1,options:s,value:r,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var Ee=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Ee||{});function fn({id:e,isChecked:r,labelText:n="",labelPosition:t=Ee.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:s=!1,hasError:c=!1,className:i,onChange:l}){const f=S.jsx(X.Checkbox,{id:e,checked:r,indeterminate:o,defaultChecked:a,disabled:s,className:`papi-checkbox ${c?"error":""} ${i??""}`,onChange:l});let p;if(n){const u=t===Ee.Before||t===Ee.Above,y=S.jsx("span",{className:`papi-checkbox-label ${c?"error":""} ${i??""}`,children:n}),v=t===Ee.Before||t===Ee.After,h=v?y:S.jsx("div",{children:y}),d=v?f:S.jsx("div",{children:f});p=S.jsxs(X.FormLabel,{className:`papi-checkbox ${t.toString()}`,disabled:s,error:c,children:[u&&h,d,!u&&h]})}else p=f;return p}function pn(e){const{onClick:r,name:n,hasAutoFocus:t=!1,className:o,isDense:a=!0,hasDisabledGutters:s=!1,hasDivider:c=!1,focusVisibleClassName:i,id:l,children:f}=e;return S.jsx(X.MenuItem,{autoFocus:t,className:o,dense:a,disableGutters:s,divider:c,focusVisibleClassName:i,onClick:r,id:l,children:n||f})}function Vn({commandHandler:e,name:r,className:n,items:t,id:o}){return S.jsxs(X.Grid,{id:o,item:!0,xs:"auto",className:`papi-menu-column ${n??""}`,children:[S.jsx("h3",{className:`papi-menu ${n??""}`,children:r}),t.map((a,s)=>S.jsx(pn,{className:`papi-menu-item ${a.className}`,onClick:()=>{e(a)},...a},s))]})}function hn({commandHandler:e,className:r,columns:n,id:t}){return S.jsx(X.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${r??""}`,columns:n.length,id:t,children:n.map((o,a)=>S.jsx(Vn,{commandHandler:e,name:o.name,className:r,items:o.items},a))})}var Ln=Object.defineProperty,Fn=(e,r,n)=>r in e?Ln(e,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[r]=n,R=(e,r,n)=>(Fn(e,typeof r!="symbol"?r+"":r,n),n);const we=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],yr=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],mn=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Pr=Zn();function Be(e,r=!0){return r&&(e=e.toUpperCase()),e in Pr?Pr[e]:0}function vr(e){return Be(e)>0}function Hn(e){const r=typeof e=="string"?Be(e):e;return r>=40&&r<=66}function Un(e){return(typeof e=="string"?Be(e):e)<=39}function gn(e){return e<=66}function Gn(e){const r=typeof e=="string"?Be(e):e;return vn(r)&&!gn(r)}function*Jn(){for(let e=1;e<=we.length;e++)yield e}const qn=1,bn=we.length;function Kn(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function xr(e,r="***"){const n=e-1;return n<0||n>=we.length?r:we[n]}function yn(e){return e<=0||e>bn?"******":mn[e-1]}function Wn(e){return yn(Be(e))}function vn(e){const r=typeof e=="number"?xr(e):e;return vr(r)&&!yr.includes(r)}function Xn(e){const r=typeof e=="number"?xr(e):e;return vr(r)&&yr.includes(r)}function Yn(e){return mn[e-1].includes("*obsolete*")}function Zn(){const e={};for(let r=0;r<we.length;r++)e[we[r]]=r+1;return e}const me={allBookIds:we,nonCanonicalIds:yr,bookIdToNumber:Be,isBookIdValid:vr,isBookNT:Hn,isBookOT:Un,isBookOTNT:gn,isBookDC:Gn,allBookNumbers:Jn,firstBook:qn,lastBook:bn,extraBooks:Kn,bookNumberToId:xr,bookNumberToEnglishName:yn,bookIdToEnglishName:Wn,isCanonical:vn,isExtraMaterial:Xn,isObsolete:Yn};var ve=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(ve||{});const Ne=class{constructor(e){if(R(this,"name"),R(this,"fullPath"),R(this,"isPresent"),R(this,"hasVerseSegments"),R(this,"isCustomized"),R(this,"baseVersification"),R(this,"scriptureBooks"),R(this,"_type"),e!=null)typeof e=="string"?this.name=e:this._type=e;else throw new Error("Argument null")}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};let se=Ne;R(se,"Original",new Ne(ve.Original)),R(se,"Septuagint",new Ne(ve.Septuagint)),R(se,"Vulgate",new Ne(ve.Vulgate)),R(se,"English",new Ne(ve.English)),R(se,"RussianProtestant",new Ne(ve.RussianProtestant)),R(se,"RussianOrthodox",new Ne(ve.RussianOrthodox));function Mr(e,r){const n=r[0];for(let t=1;t<r.length;t++)e=e.split(r[t]).join(n);return e.split(n)}var xn=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(xn||{});const _=class{constructor(r,n,t,o){if(R(this,"firstChapter"),R(this,"lastChapter"),R(this,"lastVerse"),R(this,"hasSegmentsDefined"),R(this,"text"),R(this,"BBBCCCVVVS"),R(this,"longHashCode"),R(this,"versification"),R(this,"rtlMark","‏"),R(this,"_bookNum",0),R(this,"_chapterNum",0),R(this,"_verseNum",0),R(this,"_verse"),t==null&&o==null)if(r!=null&&typeof r=="string"){const a=r,s=n!=null&&n instanceof se?n:void 0;this.setEmpty(s),this.parse(a)}else if(r!=null&&typeof r=="number"){const a=n!=null&&n instanceof se?n:void 0;this.setEmpty(a),this._verseNum=r%_.chapterDigitShifter,this._chapterNum=Math.floor(r%_.bookDigitShifter/_.chapterDigitShifter),this._bookNum=Math.floor(r/_.bookDigitShifter)}else if(n==null)if(r!=null&&r instanceof _){const a=r;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(r==null)return;const a=r instanceof se?r:_.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(r!=null&&n!=null&&t!=null)if(typeof r=="string"&&typeof n=="string"&&typeof t=="string")this.setEmpty(o),this.updateInternal(r,n,t);else if(typeof r=="number"&&typeof n=="number"&&typeof t=="number")this._bookNum=r,this._chapterNum=n,this._verseNum=t,this.versification=o??_.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(r,n=_.defaultVersification){const t=new _(n);return t.parse(r),t}static isVerseParseable(r){return r.length>0&&"0123456789".includes(r[0])&&!r.endsWith(this.verseRangeSeparator)&&!r.endsWith(this.verseSequenceIndicator)}static tryParse(r){let n;try{return n=_.parse(r),{success:!0,verseRef:n}}catch(t){if(t instanceof De)return n=new _,{success:!1,verseRef:n};throw t}}static getBBBCCCVVV(r,n,t){return r%_.bcvMaxValue*_.bookDigitShifter+(n>=0?n%_.bcvMaxValue*_.chapterDigitShifter:0)+(t>=0?t%_.bcvMaxValue:0)}static tryGetVerseNum(r){let n;if(!r)return n=-1,{success:!0,vNum:n};n=0;let t;for(let o=0;o<r.length;o++){if(t=r[o],t<"0"||t>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +t-+"0",n>_.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(_.verseRangeSeparator)||this._verse.includes(_.verseSequenceIndicator))}get book(){return me.bookNumberToId(this.bookNum,"")}set book(r){this.bookNum=me.bookIdToNumber(r)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(r){const n=+r;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(r){const{success:n,vNum:t}=_.tryGetVerseNum(r);this._verse=n?void 0:r.replace(this.rtlMark,""),this._verseNum=t,!(this._verseNum>=0)&&({vNum:this._verseNum}=_.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(r){if(r<=0||r>me.lastBook)throw new De("BookNum must be greater than zero and less than or equal to last book");this._bookNum=r}get chapterNum(){return this._chapterNum}set chapterNum(r){this.chapterNum=r}get verseNum(){return this._verseNum}set verseNum(r){this._verseNum=r}get versificationStr(){var r;return(r=this.versification)==null?void 0:r.name}set versificationStr(r){this.versification=this.versification!=null?new se(r):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(_.verseRangeSeparators,_.verseSequenceIndicators)}get BBBCCC(){return _.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return _.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(r){if(r=r.replace(this.rtlMark,""),r.includes("/")){const a=r.split("/");if(r=a[0],a.length>1)try{const s=+a[1].trim();this.versification=new se(ve[s])}catch{throw new De("Invalid reference : "+r)}}const n=r.trim().split(" ");if(n.length!==2)throw new De("Invalid reference : "+r);const t=n[1].split(":"),o=+t[0];if(t.length!==2||me.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!_.isVerseParseable(t[1]))throw new De("Invalid reference : "+r);this.updateInternal(n[0],t[0],t[1])}simplify(){this._verse=void 0}clone(){return new _(this)}toString(){const r=this.book;return r===""?"":`${r} ${this.chapter}:${this.verse}`}equals(r){return r._bookNum===this._bookNum&&r._chapterNum===this._chapterNum&&r._verseNum===this._verseNum&&r._verse===this._verse&&r.versification!=null&&this.versification!=null&&r.versification.equals(this.versification)}allVerses(r=!1,n=_.verseRangeSeparators,t=_.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=Mr(this._verse,t);for(const s of a.map(c=>Mr(c,n))){const c=this.clone();c.verse=s[0];const i=c.verseNum;if(o.push(c),s.length>1){const l=this.clone();if(l.verse=s[1],!r)for(let f=i+1;f<l.verseNum;f++){const p=new _(this._bookNum,this._chapterNum,f,this.versification);this.isExcluded||o.push(p)}o.push(l)}}return o}validateVerse(r,n){if(!this.verse)return this.internalValid;let t=0;for(const o of this.allVerses(!0,r,n)){const a=o.internalValid;if(a!==0)return a;const s=o.BBBCCCVVV;if(t>s)return 3;if(t===s)return 4;t=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>me.lastBook?2:0}setEmpty(r=_.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=r}updateInternal(r,n,t){this.bookNum=me.bookIdToNumber(r),this.chapter=n,this.verse=t}};let he=_;R(he,"defaultVersification",se.English),R(he,"verseRangeSeparator","-"),R(he,"verseSequenceIndicator",","),R(he,"verseRangeSeparators",[_.verseRangeSeparator]),R(he,"verseSequenceIndicators",[_.verseSequenceIndicator]),R(he,"chapterDigitShifter",1e3),R(he,"bookDigitShifter",_.chapterDigitShifter*_.chapterDigitShifter),R(he,"bcvMaxValue",_.chapterDigitShifter-1),R(he,"ValidStatusType",xn);class De extends Error{}const kn=[{shortName:"ERR",fullNames:["ERROR"],chapters:-1},{shortName:"GEN",fullNames:["Genesis"],chapters:50},{shortName:"EXO",fullNames:["Exodus"],chapters:40},{shortName:"LEV",fullNames:["Leviticus"],chapters:27},{shortName:"NUM",fullNames:["Numbers"],chapters:36},{shortName:"DEU",fullNames:["Deuteronomy"],chapters:34},{shortName:"JOS",fullNames:["Joshua"],chapters:24},{shortName:"JDG",fullNames:["Judges"],chapters:21},{shortName:"RUT",fullNames:["Ruth"],chapters:4},{shortName:"1SA",fullNames:["1 Samuel"],chapters:31},{shortName:"2SA",fullNames:["2 Samuel"],chapters:24},{shortName:"1KI",fullNames:["1 Kings"],chapters:22},{shortName:"2KI",fullNames:["2 Kings"],chapters:25},{shortName:"1CH",fullNames:["1 Chronicles"],chapters:29},{shortName:"2CH",fullNames:["2 Chronicles"],chapters:36},{shortName:"EZR",fullNames:["Ezra"],chapters:10},{shortName:"NEH",fullNames:["Nehemiah"],chapters:13},{shortName:"EST",fullNames:["Esther"],chapters:10},{shortName:"JOB",fullNames:["Job"],chapters:42},{shortName:"PSA",fullNames:["Psalm","Psalms"],chapters:150},{shortName:"PRO",fullNames:["Proverbs"],chapters:31},{shortName:"ECC",fullNames:["Ecclesiastes"],chapters:12},{shortName:"SNG",fullNames:["Song of Solomon","Song of Songs"],chapters:8},{shortName:"ISA",fullNames:["Isaiah"],chapters:66},{shortName:"JER",fullNames:["Jeremiah"],chapters:52},{shortName:"LAM",fullNames:["Lamentations"],chapters:5},{shortName:"EZK",fullNames:["Ezekiel"],chapters:48},{shortName:"DAN",fullNames:["Daniel"],chapters:12},{shortName:"HOS",fullNames:["Hosea"],chapters:14},{shortName:"JOL",fullNames:["Joel"],chapters:3},{shortName:"AMO",fullNames:["Amos"],chapters:9},{shortName:"OBA",fullNames:["Obadiah"],chapters:1},{shortName:"JON",fullNames:["Jonah"],chapters:4},{shortName:"MIC",fullNames:["Micah"],chapters:7},{shortName:"NAM",fullNames:["Nahum"],chapters:3},{shortName:"HAB",fullNames:["Habakkuk"],chapters:3},{shortName:"ZEP",fullNames:["Zephaniah"],chapters:3},{shortName:"HAG",fullNames:["Haggai"],chapters:2},{shortName:"ZEC",fullNames:["Zechariah"],chapters:14},{shortName:"MAL",fullNames:["Malachi"],chapters:4},{shortName:"MAT",fullNames:["Matthew"],chapters:28},{shortName:"MRK",fullNames:["Mark"],chapters:16},{shortName:"LUK",fullNames:["Luke"],chapters:24},{shortName:"JHN",fullNames:["John"],chapters:21},{shortName:"ACT",fullNames:["Acts"],chapters:28},{shortName:"ROM",fullNames:["Romans"],chapters:16},{shortName:"1CO",fullNames:["1 Corinthians"],chapters:16},{shortName:"2CO",fullNames:["2 Corinthians"],chapters:13},{shortName:"GAL",fullNames:["Galatians"],chapters:6},{shortName:"EPH",fullNames:["Ephesians"],chapters:6},{shortName:"PHP",fullNames:["Philippians"],chapters:4},{shortName:"COL",fullNames:["Colossians"],chapters:4},{shortName:"1TH",fullNames:["1 Thessalonians"],chapters:5},{shortName:"2TH",fullNames:["2 Thessalonians"],chapters:3},{shortName:"1TI",fullNames:["1 Timothy"],chapters:6},{shortName:"2TI",fullNames:["2 Timothy"],chapters:4},{shortName:"TIT",fullNames:["Titus"],chapters:3},{shortName:"PHM",fullNames:["Philemon"],chapters:1},{shortName:"HEB",fullNames:["Hebrews"],chapters:13},{shortName:"JAS",fullNames:["James"],chapters:5},{shortName:"1PE",fullNames:["1 Peter"],chapters:5},{shortName:"2PE",fullNames:["2 Peter"],chapters:3},{shortName:"1JN",fullNames:["1 John"],chapters:5},{shortName:"2JN",fullNames:["2 John"],chapters:1},{shortName:"3JN",fullNames:["3 John"],chapters:1},{shortName:"JUD",fullNames:["Jude"],chapters:1},{shortName:"REV",fullNames:["Revelation"],chapters:22}];let sr;const ir=()=>(sr||(sr=me.allBookIds.map(e=>({bookId:e,label:me.bookIdToEnglishName(e)}))),sr),Sn=1,Qn=kn.length-1,Nn=1,En=1,kr=e=>{var r;return((r=kn[e])==null?void 0:r.chapters)??-1},Ir=(e,r)=>({bookNum:Math.max(Sn,Math.min(e.bookNum+r,Qn)),chapterNum:1,verseNum:1}),jr=(e,r)=>({...e,chapterNum:Math.min(Math.max(Nn,e.chapterNum+r),kr(e.bookNum)),verseNum:1}),Br=(e,r)=>({...e,verseNum:Math.max(En,e.verseNum+r)});function Xe({variant:e="outlined",id:r,isDisabled:n=!1,hasError:t=!1,isFullWidth:o=!1,helperText:a,label:s,placeholder:c,isRequired:i=!1,className:l,defaultValue:f,value:p,onChange:u,onFocus:y,onBlur:v}){return S.jsx(X.TextField,{variant:e,id:r,disabled:n,error:t,fullWidth:o,helperText:a,label:s,placeholder:c,required:i,className:`papi-textfield ${l??""}`,defaultValue:f,value:p,onChange:u,onFocus:y,onBlur:v})}function et({scrRef:e,handleSubmit:r,id:n}){const t=i=>{r(i)},o=(i,l)=>{const p={bookNum:me.bookIdToNumber(l.bookId),chapterNum:1,verseNum:1};t(p)},a=i=>{r({...e,chapterNum:+i.target.value})},s=i=>{r({...e,verseNum:+i.target.value})},c=ae.useMemo(()=>ir()[e.bookNum-1],[e.bookNum]);return S.jsxs("span",{id:n,children:[S.jsx(We,{title:"Book",className:"papi-ref-selector book",value:c,options:ir(),onChange:o,isClearable:!1,width:200}),S.jsx(Se,{onClick:()=>t(Ir(e,-1)),isDisabled:e.bookNum<=Sn,children:"<"}),S.jsx(Se,{onClick:()=>t(Ir(e,1)),isDisabled:e.bookNum>=ir().length,children:">"}),S.jsx(Xe,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:a}),S.jsx(Se,{onClick:()=>r(jr(e,-1)),isDisabled:e.chapterNum<=Nn,children:"<"}),S.jsx(Se,{onClick:()=>r(jr(e,1)),isDisabled:e.chapterNum>=kr(e.bookNum),children:">"}),S.jsx(Xe,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:s}),S.jsx(Se,{onClick:()=>r(Br(e,-1)),isDisabled:e.verseNum<=En,children:"<"}),S.jsx(Se,{onClick:()=>r(Br(e,1)),children:">"})]})}function rt({id:e,isDisabled:r=!1,orientation:n="horizontal",min:t=0,max:o=100,step:a=1,showMarks:s=!1,defaultValue:c,value:i,valueLabelDisplay:l="off",className:f,onChange:p,onChangeCommitted:u}){return S.jsx(X.Slider,{id:e,disabled:r,orientation:n,min:t,max:o,step:a,marks:s,defaultValue:c,value:i,valueLabelDisplay:l,className:`papi-slider ${n} ${f??""}`,onChange:p,onChangeCommitted:u})}function nt({autoHideDuration:e=null,id:r,isOpen:n=!1,className:t,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:s,children:c}){const i={action:(s==null?void 0:s.action)||c,message:s==null?void 0:s.message,className:t};return S.jsx(X.Snackbar,{autoHideDuration:e,open:n,onClose:o,anchorOrigin:a,id:r,ContentProps:i})}function tt({id:e,isChecked:r,isDisabled:n=!1,hasError:t=!1,className:o,onChange:a}){return S.jsx(X.Switch,{id:e,checked:r,disabled:n,className:`papi-switch ${t?"error":""} ${o??""}`,onChange:a})}function Dr({onRowChange:e,row:r,column:n}){const t=o=>{e({...r,[n.key]:o.target.value})};return S.jsx(Xe,{defaultValue:r[n.key],onChange:t})}const ot=({onChange:e,disabled:r,checked:n,...t})=>{const o=a=>{e(a.target.checked,a.nativeEvent.shiftKey)};return S.jsx(fn,{...t,isChecked:n,isDisabled:r,onChange:o})};function at({columns:e,sortColumns:r,onSortColumnsChange:n,onColumnResize:t,defaultColumnWidth:o,defaultColumnMinWidth:a,defaultColumnMaxWidth:s,defaultColumnSortable:c=!0,defaultColumnResizable:i=!0,rows:l,enableSelectColumn:f,selectColumnWidth:p=50,rowKeyGetter:u,rowHeight:y=35,headerRowHeight:v=35,selectedRows:h,onSelectedRowsChange:d,onRowsChange:N,onCellClick:W,onCellDoubleClick:j,onCellContextMenu:$,onCellKeyDown:m,direction:Y="ltr",enableVirtualization:te=!0,onCopy:le,onPaste:ie,onScroll:B,className:Z,id:ue}){const de=ae.useMemo(()=>{const ee=e.map(K=>typeof K.editable=="function"?{...K,editable:ce=>!!K.editable(ce),renderEditCell:K.renderEditCell||Dr}:K.editable&&!K.renderEditCell?{...K,renderEditCell:Dr}:K.renderEditCell&&!K.editable?{...K,editable:!1}:K);return f?[{...Ar.SelectColumn,minWidth:p},...ee]:ee},[e,f,p]);return S.jsx(Ar,{columns:de,defaultColumnOptions:{width:o,minWidth:a,maxWidth:s,sortable:c,resizable:i},sortColumns:r,onSortColumnsChange:n,onColumnResize:t,rows:l,rowKeyGetter:u,rowHeight:y,headerRowHeight:v,selectedRows:h,onSelectedRowsChange:d,onRowsChange:N,onCellClick:W,onCellDoubleClick:j,onCellContextMenu:$,onCellKeyDown:m,direction:Y,enableVirtualization:te,onCopy:le,onPaste:ie,onScroll:B,renderers:{renderCheckbox:ot},className:Z??"rdg-light",id:ue})}function A(){return A=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},A.apply(this,arguments)}function Pe(e){return e!==null&&typeof e=="object"&&e.constructor===Object}function wn(e){if(!Pe(e))return e;const r={};return Object.keys(e).forEach(n=>{r[n]=wn(e[n])}),r}function ge(e,r,n={clone:!0}){const t=n.clone?A({},e):e;return Pe(e)&&Pe(r)&&Object.keys(r).forEach(o=>{o!=="__proto__"&&(Pe(r[o])&&o in e&&Pe(e[o])?t[o]=ge(e[o],r[o],n):n.clone?t[o]=Pe(r[o])?wn(r[o]):r[o]:t[o]=r[o])}),t}function st(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var gr={exports:{}},qe={exports:{}},z={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zr;function it(){if(zr)return z;zr=1;var e=typeof Symbol=="function"&&Symbol.for,r=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,t=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,i=e?Symbol.for("react.async_mode"):60111,l=e?Symbol.for("react.concurrent_mode"):60111,f=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,u=e?Symbol.for("react.suspense_list"):60120,y=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,d=e?Symbol.for("react.fundamental"):60117,N=e?Symbol.for("react.responder"):60118,W=e?Symbol.for("react.scope"):60119;function j(m){if(typeof m=="object"&&m!==null){var Y=m.$$typeof;switch(Y){case r:switch(m=m.type,m){case i:case l:case t:case a:case o:case p:return m;default:switch(m=m&&m.$$typeof,m){case c:case f:case v:case y:case s:return m;default:return Y}}case n:return Y}}}function $(m){return j(m)===l}return z.AsyncMode=i,z.ConcurrentMode=l,z.ContextConsumer=c,z.ContextProvider=s,z.Element=r,z.ForwardRef=f,z.Fragment=t,z.Lazy=v,z.Memo=y,z.Portal=n,z.Profiler=a,z.StrictMode=o,z.Suspense=p,z.isAsyncMode=function(m){return $(m)||j(m)===i},z.isConcurrentMode=$,z.isContextConsumer=function(m){return j(m)===c},z.isContextProvider=function(m){return j(m)===s},z.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===r},z.isForwardRef=function(m){return j(m)===f},z.isFragment=function(m){return j(m)===t},z.isLazy=function(m){return j(m)===v},z.isMemo=function(m){return j(m)===y},z.isPortal=function(m){return j(m)===n},z.isProfiler=function(m){return j(m)===a},z.isStrictMode=function(m){return j(m)===o},z.isSuspense=function(m){return j(m)===p},z.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===t||m===l||m===a||m===o||m===p||m===u||typeof m=="object"&&m!==null&&(m.$$typeof===v||m.$$typeof===y||m.$$typeof===s||m.$$typeof===c||m.$$typeof===f||m.$$typeof===d||m.$$typeof===N||m.$$typeof===W||m.$$typeof===h)},z.typeOf=j,z}var V={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Vr;function ct(){return Vr||(Vr=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,r=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,t=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,i=e?Symbol.for("react.async_mode"):60111,l=e?Symbol.for("react.concurrent_mode"):60111,f=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,u=e?Symbol.for("react.suspense_list"):60120,y=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,d=e?Symbol.for("react.fundamental"):60117,N=e?Symbol.for("react.responder"):60118,W=e?Symbol.for("react.scope"):60119;function j(b){return typeof b=="string"||typeof b=="function"||b===t||b===l||b===a||b===o||b===p||b===u||typeof b=="object"&&b!==null&&(b.$$typeof===v||b.$$typeof===y||b.$$typeof===s||b.$$typeof===c||b.$$typeof===f||b.$$typeof===d||b.$$typeof===N||b.$$typeof===W||b.$$typeof===h)}function $(b){if(typeof b=="object"&&b!==null){var oe=b.$$typeof;switch(oe){case r:var k=b.type;switch(k){case i:case l:case t:case a:case o:case p:return k;default:var Ce=k&&k.$$typeof;switch(Ce){case c:case f:case v:case y:case s:return Ce;default:return oe}}case n:return oe}}}var m=i,Y=l,te=c,le=s,ie=r,B=f,Z=t,ue=v,de=y,ee=n,K=a,re=o,ce=p,ke=!1;function Te(b){return ke||(ke=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),g(b)||$(b)===i}function g(b){return $(b)===l}function x(b){return $(b)===c}function O(b){return $(b)===s}function T(b){return typeof b=="object"&&b!==null&&b.$$typeof===r}function E(b){return $(b)===f}function P(b){return $(b)===t}function w(b){return $(b)===v}function C(b){return $(b)===y}function M(b){return $(b)===n}function D(b){return $(b)===a}function I(b){return $(b)===o}function Q(b){return $(b)===p}V.AsyncMode=m,V.ConcurrentMode=Y,V.ContextConsumer=te,V.ContextProvider=le,V.Element=ie,V.ForwardRef=B,V.Fragment=Z,V.Lazy=ue,V.Memo=de,V.Portal=ee,V.Profiler=K,V.StrictMode=re,V.Suspense=ce,V.isAsyncMode=Te,V.isConcurrentMode=g,V.isContextConsumer=x,V.isContextProvider=O,V.isElement=T,V.isForwardRef=E,V.isFragment=P,V.isLazy=w,V.isMemo=C,V.isPortal=M,V.isProfiler=D,V.isStrictMode=I,V.isSuspense=Q,V.isValidElementType=j,V.typeOf=$}()),V}var Lr;function Tn(){return Lr||(Lr=1,process.env.NODE_ENV==="production"?qe.exports=it():qe.exports=ct()),qe.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var cr,Fr;function lt(){if(Fr)return cr;Fr=1;var e=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function t(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var s={},c=0;c<10;c++)s["_"+String.fromCharCode(c)]=c;var i=Object.getOwnPropertyNames(s).map(function(f){return s[f]});if(i.join("")!=="0123456789")return!1;var l={};return"abcdefghijklmnopqrst".split("").forEach(function(f){l[f]=f}),Object.keys(Object.assign({},l)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return cr=o()?Object.assign:function(a,s){for(var c,i=t(a),l,f=1;f<arguments.length;f++){c=Object(arguments[f]);for(var p in c)r.call(c,p)&&(i[p]=c[p]);if(e){l=e(c);for(var u=0;u<l.length;u++)n.call(c,l[u])&&(i[l[u]]=c[l[u]])}}return i},cr}var lr,Hr;function Sr(){if(Hr)return lr;Hr=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return lr=e,lr}var ur,Ur;function Cn(){return Ur||(Ur=1,ur=Function.call.bind(Object.prototype.hasOwnProperty)),ur}var dr,Gr;function ut(){if(Gr)return dr;Gr=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var r=Sr(),n={},t=Cn();e=function(a){var s="Warning: "+a;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(a,s,c,i,l){if(process.env.NODE_ENV!=="production"){for(var f in a)if(t(a,f)){var p;try{if(typeof a[f]!="function"){var u=Error((i||"React class")+": "+c+" type `"+f+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[f]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw u.name="Invariant Violation",u}p=a[f](s,f,i,c,null,r)}catch(v){p=v}if(p&&!(p instanceof Error)&&e((i||"React class")+": type specification of "+c+" `"+f+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof p+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),p instanceof Error&&!(p.message in n)){n[p.message]=!0;var y=l?l():"";e("Failed "+c+" type: "+p.message+(y??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},dr=o,dr}var fr,Jr;function dt(){if(Jr)return fr;Jr=1;var e=Tn(),r=lt(),n=Sr(),t=Cn(),o=ut(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(c){var i="Warning: "+c;typeof console<"u"&&console.error(i);try{throw new Error(i)}catch{}});function s(){return null}return fr=function(c,i){var l=typeof Symbol=="function"&&Symbol.iterator,f="@@iterator";function p(g){var x=g&&(l&&g[l]||g[f]);if(typeof x=="function")return x}var u="<<anonymous>>",y={array:N("array"),bigint:N("bigint"),bool:N("boolean"),func:N("function"),number:N("number"),object:N("object"),string:N("string"),symbol:N("symbol"),any:W(),arrayOf:j,element:$(),elementType:m(),instanceOf:Y,node:B(),objectOf:le,oneOf:te,oneOfType:ie,shape:ue,exact:de};function v(g,x){return g===x?g!==0||1/g===1/x:g!==g&&x!==x}function h(g,x){this.message=g,this.data=x&&typeof x=="object"?x:{},this.stack=""}h.prototype=Error.prototype;function d(g){if(process.env.NODE_ENV!=="production")var x={},O=0;function T(P,w,C,M,D,I,Q){if(M=M||u,I=I||C,Q!==n){if(i){var b=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw b.name="Invariant Violation",b}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var oe=M+":"+C;!x[oe]&&O<3&&(a("You are manually calling a React.PropTypes validation function for the `"+I+"` prop on `"+M+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),x[oe]=!0,O++)}}return w[C]==null?P?w[C]===null?new h("The "+D+" `"+I+"` is marked as required "+("in `"+M+"`, but its value is `null`.")):new h("The "+D+" `"+I+"` is marked as required in "+("`"+M+"`, but its value is `undefined`.")):null:g(w,C,M,D,I)}var E=T.bind(null,!1);return E.isRequired=T.bind(null,!0),E}function N(g){function x(O,T,E,P,w,C){var M=O[T],D=re(M);if(D!==g){var I=ce(M);return new h("Invalid "+P+" `"+w+"` of type "+("`"+I+"` supplied to `"+E+"`, expected ")+("`"+g+"`."),{expectedType:g})}return null}return d(x)}function W(){return d(s)}function j(g){function x(O,T,E,P,w){if(typeof g!="function")return new h("Property `"+w+"` of component `"+E+"` has invalid PropType notation inside arrayOf.");var C=O[T];if(!Array.isArray(C)){var M=re(C);return new h("Invalid "+P+" `"+w+"` of type "+("`"+M+"` supplied to `"+E+"`, expected an array."))}for(var D=0;D<C.length;D++){var I=g(C,D,E,P,w+"["+D+"]",n);if(I instanceof Error)return I}return null}return d(x)}function $(){function g(x,O,T,E,P){var w=x[O];if(!c(w)){var C=re(w);return new h("Invalid "+E+" `"+P+"` of type "+("`"+C+"` supplied to `"+T+"`, expected a single ReactElement."))}return null}return d(g)}function m(){function g(x,O,T,E,P){var w=x[O];if(!e.isValidElementType(w)){var C=re(w);return new h("Invalid "+E+" `"+P+"` of type "+("`"+C+"` supplied to `"+T+"`, expected a single ReactElement type."))}return null}return d(g)}function Y(g){function x(O,T,E,P,w){if(!(O[T]instanceof g)){var C=g.name||u,M=Te(O[T]);return new h("Invalid "+P+" `"+w+"` of type "+("`"+M+"` supplied to `"+E+"`, expected ")+("instance of `"+C+"`."))}return null}return d(x)}function te(g){if(!Array.isArray(g))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),s;function x(O,T,E,P,w){for(var C=O[T],M=0;M<g.length;M++)if(v(C,g[M]))return null;var D=JSON.stringify(g,function(Q,b){var oe=ce(b);return oe==="symbol"?String(b):b});return new h("Invalid "+P+" `"+w+"` of value `"+String(C)+"` "+("supplied to `"+E+"`, expected one of "+D+"."))}return d(x)}function le(g){function x(O,T,E,P,w){if(typeof g!="function")return new h("Property `"+w+"` of component `"+E+"` has invalid PropType notation inside objectOf.");var C=O[T],M=re(C);if(M!=="object")return new h("Invalid "+P+" `"+w+"` of type "+("`"+M+"` supplied to `"+E+"`, expected an object."));for(var D in C)if(t(C,D)){var I=g(C,D,E,P,w+"."+D,n);if(I instanceof Error)return I}return null}return d(x)}function ie(g){if(!Array.isArray(g))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var x=0;x<g.length;x++){var O=g[x];if(typeof O!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ke(O)+" at index "+x+"."),s}function T(E,P,w,C,M){for(var D=[],I=0;I<g.length;I++){var Q=g[I],b=Q(E,P,w,C,M,n);if(b==null)return null;b.data&&t(b.data,"expectedType")&&D.push(b.data.expectedType)}var oe=D.length>0?", expected one of type ["+D.join(", ")+"]":"";return new h("Invalid "+C+" `"+M+"` supplied to "+("`"+w+"`"+oe+"."))}return d(T)}function B(){function g(x,O,T,E,P){return ee(x[O])?null:new h("Invalid "+E+" `"+P+"` supplied to "+("`"+T+"`, expected a ReactNode."))}return d(g)}function Z(g,x,O,T,E){return new h((g||"React class")+": "+x+" type `"+O+"."+T+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+E+"`.")}function ue(g){function x(O,T,E,P,w){var C=O[T],M=re(C);if(M!=="object")return new h("Invalid "+P+" `"+w+"` of type `"+M+"` "+("supplied to `"+E+"`, expected `object`."));for(var D in g){var I=g[D];if(typeof I!="function")return Z(E,P,w,D,ce(I));var Q=I(C,D,E,P,w+"."+D,n);if(Q)return Q}return null}return d(x)}function de(g){function x(O,T,E,P,w){var C=O[T],M=re(C);if(M!=="object")return new h("Invalid "+P+" `"+w+"` of type `"+M+"` "+("supplied to `"+E+"`, expected `object`."));var D=r({},O[T],g);for(var I in D){var Q=g[I];if(t(g,I)&&typeof Q!="function")return Z(E,P,w,I,ce(Q));if(!Q)return new h("Invalid "+P+" `"+w+"` key `"+I+"` supplied to `"+E+"`.\nBad object: "+JSON.stringify(O[T],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(g),null,"  "));var b=Q(C,I,E,P,w+"."+I,n);if(b)return b}return null}return d(x)}function ee(g){switch(typeof g){case"number":case"string":case"undefined":return!0;case"boolean":return!g;case"object":if(Array.isArray(g))return g.every(ee);if(g===null||c(g))return!0;var x=p(g);if(x){var O=x.call(g),T;if(x!==g.entries){for(;!(T=O.next()).done;)if(!ee(T.value))return!1}else for(;!(T=O.next()).done;){var E=T.value;if(E&&!ee(E[1]))return!1}}else return!1;return!0;default:return!1}}function K(g,x){return g==="symbol"?!0:x?x["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&x instanceof Symbol:!1}function re(g){var x=typeof g;return Array.isArray(g)?"array":g instanceof RegExp?"object":K(x,g)?"symbol":x}function ce(g){if(typeof g>"u"||g===null)return""+g;var x=re(g);if(x==="object"){if(g instanceof Date)return"date";if(g instanceof RegExp)return"regexp"}return x}function ke(g){var x=ce(g);switch(x){case"array":case"object":return"an "+x;case"boolean":case"date":case"regexp":return"a "+x;default:return x}}function Te(g){return!g.constructor||!g.constructor.name?u:g.constructor.name}return y.checkPropTypes=o,y.resetWarningCache=o.resetWarningCache,y.PropTypes=y,y},fr}var pr,qr;function ft(){if(qr)return pr;qr=1;var e=Sr();function r(){}function n(){}return n.resetWarningCache=r,pr=function(){function t(s,c,i,l,f,p){if(p!==e){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}t.isRequired=t;function o(){return t}var a={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:o,element:t,elementType:t,instanceOf:o,node:t,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:r};return a.PropTypes=a,a},pr}if(process.env.NODE_ENV!=="production"){var pt=Tn(),ht=!0;gr.exports=dt()(pt.isElement,ht)}else gr.exports=ft()();var mt=gr.exports;const U=st(mt);function Ie(e){let r="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)r+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+r+" for the full message."}var br={exports:{}},L={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Kr;function gt(){if(Kr)return L;Kr=1;var e=Symbol.for("react.element"),r=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),t=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),i=Symbol.for("react.forward_ref"),l=Symbol.for("react.suspense"),f=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),u=Symbol.for("react.lazy"),y=Symbol.for("react.offscreen"),v;v=Symbol.for("react.module.reference");function h(d){if(typeof d=="object"&&d!==null){var N=d.$$typeof;switch(N){case e:switch(d=d.type,d){case n:case o:case t:case l:case f:return d;default:switch(d=d&&d.$$typeof,d){case c:case s:case i:case u:case p:case a:return d;default:return N}}case r:return N}}}return L.ContextConsumer=s,L.ContextProvider=a,L.Element=e,L.ForwardRef=i,L.Fragment=n,L.Lazy=u,L.Memo=p,L.Portal=r,L.Profiler=o,L.StrictMode=t,L.Suspense=l,L.SuspenseList=f,L.isAsyncMode=function(){return!1},L.isConcurrentMode=function(){return!1},L.isContextConsumer=function(d){return h(d)===s},L.isContextProvider=function(d){return h(d)===a},L.isElement=function(d){return typeof d=="object"&&d!==null&&d.$$typeof===e},L.isForwardRef=function(d){return h(d)===i},L.isFragment=function(d){return h(d)===n},L.isLazy=function(d){return h(d)===u},L.isMemo=function(d){return h(d)===p},L.isPortal=function(d){return h(d)===r},L.isProfiler=function(d){return h(d)===o},L.isStrictMode=function(d){return h(d)===t},L.isSuspense=function(d){return h(d)===l},L.isSuspenseList=function(d){return h(d)===f},L.isValidElementType=function(d){return typeof d=="string"||typeof d=="function"||d===n||d===o||d===t||d===l||d===f||d===y||typeof d=="object"&&d!==null&&(d.$$typeof===u||d.$$typeof===p||d.$$typeof===a||d.$$typeof===s||d.$$typeof===i||d.$$typeof===v||d.getModuleId!==void 0)},L.typeOf=h,L}var F={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wr;function bt(){return Wr||(Wr=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),r=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),t=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),i=Symbol.for("react.forward_ref"),l=Symbol.for("react.suspense"),f=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),u=Symbol.for("react.lazy"),y=Symbol.for("react.offscreen"),v=!1,h=!1,d=!1,N=!1,W=!1,j;j=Symbol.for("react.module.reference");function $(k){return!!(typeof k=="string"||typeof k=="function"||k===n||k===o||W||k===t||k===l||k===f||N||k===y||v||h||d||typeof k=="object"&&k!==null&&(k.$$typeof===u||k.$$typeof===p||k.$$typeof===a||k.$$typeof===s||k.$$typeof===i||k.$$typeof===j||k.getModuleId!==void 0))}function m(k){if(typeof k=="object"&&k!==null){var Ce=k.$$typeof;switch(Ce){case e:var Je=k.type;switch(Je){case n:case o:case t:case l:case f:return Je;default:var $r=Je&&Je.$$typeof;switch($r){case c:case s:case i:case u:case p:case a:return $r;default:return Ce}}case r:return Ce}}}var Y=s,te=a,le=e,ie=i,B=n,Z=u,ue=p,de=r,ee=o,K=t,re=l,ce=f,ke=!1,Te=!1;function g(k){return ke||(ke=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function x(k){return Te||(Te=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function O(k){return m(k)===s}function T(k){return m(k)===a}function E(k){return typeof k=="object"&&k!==null&&k.$$typeof===e}function P(k){return m(k)===i}function w(k){return m(k)===n}function C(k){return m(k)===u}function M(k){return m(k)===p}function D(k){return m(k)===r}function I(k){return m(k)===o}function Q(k){return m(k)===t}function b(k){return m(k)===l}function oe(k){return m(k)===f}F.ContextConsumer=Y,F.ContextProvider=te,F.Element=le,F.ForwardRef=ie,F.Fragment=B,F.Lazy=Z,F.Memo=ue,F.Portal=de,F.Profiler=ee,F.StrictMode=K,F.Suspense=re,F.SuspenseList=ce,F.isAsyncMode=g,F.isConcurrentMode=x,F.isContextConsumer=O,F.isContextProvider=T,F.isElement=E,F.isForwardRef=P,F.isFragment=w,F.isLazy=C,F.isMemo=M,F.isPortal=D,F.isProfiler=I,F.isStrictMode=Q,F.isSuspense=b,F.isSuspenseList=oe,F.isValidElementType=$,F.typeOf=m}()),F}process.env.NODE_ENV==="production"?br.exports=gt():br.exports=bt();var Xr=br.exports;const yt=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function vt(e){const r=`${e}`.match(yt);return r&&r[1]||""}function On(e,r=""){return e.displayName||e.name||vt(e)||r}function Yr(e,r,n){const t=On(r);return e.displayName||(t!==""?`${n}(${t})`:n)}function xt(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return On(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Xr.ForwardRef:return Yr(e,e.render,"ForwardRef");case Xr.Memo:return Yr(e,e.type,"memo");default:return}}}function pe(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Ie(7));return e.charAt(0).toUpperCase()+e.slice(1)}function _n(e,r){const n=A({},r);return Object.keys(e).forEach(t=>{if(t.toString().match(/^(components|slots)$/))n[t]=A({},e[t],n[t]);else if(t.toString().match(/^(componentsProps|slotProps)$/)){const o=e[t]||{},a=r[t];n[t]={},!a||!Object.keys(a)?n[t]=o:!o||!Object.keys(o)?n[t]=a:(n[t]=A({},a),Object.keys(o).forEach(s=>{n[t][s]=_n(o[s],a[s])}))}else n[t]===void 0&&(n[t]=e[t])}),n}function kt(e,r,n=void 0){const t={};return Object.keys(e).forEach(o=>{t[o]=e[o].reduce((a,s)=>{if(s){const c=r(s);c!==""&&a.push(c),n&&n[s]&&a.push(n[s])}return a},[]).join(" ")}),t}const Zr=e=>e,St=()=>{let e=Zr;return{configure(r){e=r},generate(r){return e(r)},reset(){e=Zr}}},Nt=St(),Et=Nt,wt={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Nr(e,r,n="Mui"){const t=wt[r];return t?`${n}-${t}`:`${Et.generate(e)}-${r}`}function Tt(e,r,n="Mui"){const t={};return r.forEach(o=>{t[o]=Nr(e,o,n)}),t}function ye(e,r){if(e==null)return{};var n={},t=Object.keys(e),o,a;for(a=0;a<t.length;a++)o=t[a],!(r.indexOf(o)>=0)&&(n[o]=e[o]);return n}function Rn(e){var r,n,t="";if(typeof e=="string"||typeof e=="number")t+=e;else if(typeof e=="object")if(Array.isArray(e))for(r=0;r<e.length;r++)e[r]&&(n=Rn(e[r]))&&(t&&(t+=" "),t+=n);else for(r in e)e[r]&&(t&&(t+=" "),t+=r);return t}function Ct(){for(var e,r,n=0,t="";n<arguments.length;)(e=arguments[n++])&&(r=Rn(e))&&(t&&(t+=" "),t+=r);return t}const Ot=["values","unit","step"],_t=e=>{const r=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return r.sort((n,t)=>n.val-t.val),r.reduce((n,t)=>A({},n,{[t.key]:t.val}),{})};function Rt(e){const{values:r={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:t=5}=e,o=ye(e,Ot),a=_t(r),s=Object.keys(a);function c(u){return`@media (min-width:${typeof r[u]=="number"?r[u]:u}${n})`}function i(u){return`@media (max-width:${(typeof r[u]=="number"?r[u]:u)-t/100}${n})`}function l(u,y){const v=s.indexOf(y);return`@media (min-width:${typeof r[u]=="number"?r[u]:u}${n}) and (max-width:${(v!==-1&&typeof r[s[v]]=="number"?r[s[v]]:y)-t/100}${n})`}function f(u){return s.indexOf(u)+1<s.length?l(u,s[s.indexOf(u)+1]):c(u)}function p(u){const y=s.indexOf(u);return y===0?c(s[1]):y===s.length-1?i(s[y]):l(u,s[s.indexOf(u)+1]).replace("@media","@media not all and")}return A({keys:s,values:a,up:c,down:i,between:l,only:f,not:p,unit:n},o)}const $t={borderRadius:4},At=$t,Pt=process.env.NODE_ENV!=="production"?U.oneOfType([U.number,U.string,U.object,U.array]):{},xe=Pt;function Le(e,r){return r?ge(e,r,{clone:!1}):e}const Er={xs:0,sm:600,md:900,lg:1200,xl:1536},Qr={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Er[e]}px)`};function be(e,r,n){const t=e.theme||{};if(Array.isArray(r)){const a=t.breakpoints||Qr;return r.reduce((s,c,i)=>(s[a.up(a.keys[i])]=n(r[i]),s),{})}if(typeof r=="object"){const a=t.breakpoints||Qr;return Object.keys(r).reduce((s,c)=>{if(Object.keys(a.values||Er).indexOf(c)!==-1){const i=a.up(c);s[i]=n(r[c],c)}else{const i=c;s[i]=r[i]}return s},{})}return n(r)}function Mt(e={}){var r;return((r=e.keys)==null?void 0:r.reduce((t,o)=>{const a=e.up(o);return t[a]={},t},{}))||{}}function It(e,r){return e.reduce((n,t)=>{const o=n[t];return(!o||Object.keys(o).length===0)&&delete n[t],n},r)}function Ze(e,r,n=!0){if(!r||typeof r!="string")return null;if(e&&e.vars&&n){const t=`vars.${r}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(t!=null)return t}return r.split(".").reduce((t,o)=>t&&t[o]!=null?t[o]:null,e)}function Ye(e,r,n,t=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||t:o=Ze(e,n)||t,r&&(o=r(o,t,e)),o}function H(e){const{prop:r,cssProperty:n=e.prop,themeKey:t,transform:o}=e,a=s=>{if(s[r]==null)return null;const c=s[r],i=s.theme,l=Ze(i,t)||{};return be(s,c,p=>{let u=Ye(l,o,p);return p===u&&typeof p=="string"&&(u=Ye(l,o,`${r}${p==="default"?"":pe(p)}`,p)),n===!1?u:{[n]:u}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[r]:xe}:{},a.filterProps=[r],a}function jt(e){const r={};return n=>(r[n]===void 0&&(r[n]=e(n)),r[n])}const Bt={m:"margin",p:"padding"},Dt={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},en={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},zt=jt(e=>{if(e.length>2)if(en[e])e=en[e];else return[e];const[r,n]=e.split(""),t=Bt[r],o=Dt[n]||"";return Array.isArray(o)?o.map(a=>t+a):[t+o]}),Qe=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],er=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Vt=[...Qe,...er];function Ue(e,r,n,t){var o;const a=(o=Ze(e,r,!1))!=null?o:n;return typeof a=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${t} argument to be a number or a string, got ${s}.`),a*s):Array.isArray(a)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>a.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${s} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${r}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${r}\` as a number.`].join(`
`))),a[s]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${r}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function $n(e){return Ue(e,"spacing",8,"spacing")}function Ge(e,r){if(typeof r=="string"||r==null)return r;const n=Math.abs(r),t=e(n);return r>=0?t:typeof t=="number"?-t:`-${t}`}function Lt(e,r){return n=>e.reduce((t,o)=>(t[o]=Ge(r,n),t),{})}function Ft(e,r,n,t){if(r.indexOf(n)===-1)return null;const o=zt(n),a=Lt(o,t),s=e[n];return be(e,s,a)}function An(e,r){const n=$n(e.theme);return Object.keys(e).map(t=>Ft(e,r,t,n)).reduce(Le,{})}function J(e){return An(e,Qe)}J.propTypes=process.env.NODE_ENV!=="production"?Qe.reduce((e,r)=>(e[r]=xe,e),{}):{};J.filterProps=Qe;function q(e){return An(e,er)}q.propTypes=process.env.NODE_ENV!=="production"?er.reduce((e,r)=>(e[r]=xe,e),{}):{};q.filterProps=er;process.env.NODE_ENV!=="production"&&Vt.reduce((e,r)=>(e[r]=xe,e),{});function Ht(e=8){if(e.mui)return e;const r=$n({spacing:e}),n=(...t)=>(process.env.NODE_ENV!=="production"&&(t.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${t.length}`)),(t.length===0?[1]:t).map(a=>{const s=r(a);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function rr(...e){const r=e.reduce((t,o)=>(o.filterProps.forEach(a=>{t[a]=o}),t),{}),n=t=>Object.keys(t).reduce((o,a)=>r[a]?Le(o,r[a](t)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((t,o)=>Object.assign(t,o.propTypes),{}):{},n.filterProps=e.reduce((t,o)=>t.concat(o.filterProps),[]),n}function fe(e){return typeof e!="number"?e:`${e}px solid`}const Ut=H({prop:"border",themeKey:"borders",transform:fe}),Gt=H({prop:"borderTop",themeKey:"borders",transform:fe}),Jt=H({prop:"borderRight",themeKey:"borders",transform:fe}),qt=H({prop:"borderBottom",themeKey:"borders",transform:fe}),Kt=H({prop:"borderLeft",themeKey:"borders",transform:fe}),Wt=H({prop:"borderColor",themeKey:"palette"}),Xt=H({prop:"borderTopColor",themeKey:"palette"}),Yt=H({prop:"borderRightColor",themeKey:"palette"}),Zt=H({prop:"borderBottomColor",themeKey:"palette"}),Qt=H({prop:"borderLeftColor",themeKey:"palette"}),nr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const r=Ue(e.theme,"shape.borderRadius",4,"borderRadius"),n=t=>({borderRadius:Ge(r,t)});return be(e,e.borderRadius,n)}return null};nr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:xe}:{};nr.filterProps=["borderRadius"];rr(Ut,Gt,Jt,qt,Kt,Wt,Xt,Yt,Zt,Qt,nr);const tr=e=>{if(e.gap!==void 0&&e.gap!==null){const r=Ue(e.theme,"spacing",8,"gap"),n=t=>({gap:Ge(r,t)});return be(e,e.gap,n)}return null};tr.propTypes=process.env.NODE_ENV!=="production"?{gap:xe}:{};tr.filterProps=["gap"];const or=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const r=Ue(e.theme,"spacing",8,"columnGap"),n=t=>({columnGap:Ge(r,t)});return be(e,e.columnGap,n)}return null};or.propTypes=process.env.NODE_ENV!=="production"?{columnGap:xe}:{};or.filterProps=["columnGap"];const ar=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const r=Ue(e.theme,"spacing",8,"rowGap"),n=t=>({rowGap:Ge(r,t)});return be(e,e.rowGap,n)}return null};ar.propTypes=process.env.NODE_ENV!=="production"?{rowGap:xe}:{};ar.filterProps=["rowGap"];const eo=H({prop:"gridColumn"}),ro=H({prop:"gridRow"}),no=H({prop:"gridAutoFlow"}),to=H({prop:"gridAutoColumns"}),oo=H({prop:"gridAutoRows"}),ao=H({prop:"gridTemplateColumns"}),so=H({prop:"gridTemplateRows"}),io=H({prop:"gridTemplateAreas"}),co=H({prop:"gridArea"});rr(tr,or,ar,eo,ro,no,to,oo,ao,so,io,co);function Me(e,r){return r==="grey"?r:e}const lo=H({prop:"color",themeKey:"palette",transform:Me}),uo=H({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Me}),fo=H({prop:"backgroundColor",themeKey:"palette",transform:Me});rr(lo,uo,fo);function ne(e){return e<=1&&e!==0?`${e*100}%`:e}const po=H({prop:"width",transform:ne}),wr=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const r=n=>{var t;return{maxWidth:((t=e.theme)==null||(t=t.breakpoints)==null||(t=t.values)==null?void 0:t[n])||Er[n]||ne(n)}};return be(e,e.maxWidth,r)}return null};wr.filterProps=["maxWidth"];const ho=H({prop:"minWidth",transform:ne}),mo=H({prop:"height",transform:ne}),go=H({prop:"maxHeight",transform:ne}),bo=H({prop:"minHeight",transform:ne});H({prop:"size",cssProperty:"width",transform:ne});H({prop:"size",cssProperty:"height",transform:ne});const yo=H({prop:"boxSizing"});rr(po,wr,ho,mo,go,bo,yo);const vo={border:{themeKey:"borders",transform:fe},borderTop:{themeKey:"borders",transform:fe},borderRight:{themeKey:"borders",transform:fe},borderBottom:{themeKey:"borders",transform:fe},borderLeft:{themeKey:"borders",transform:fe},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:nr},color:{themeKey:"palette",transform:Me},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Me},backgroundColor:{themeKey:"palette",transform:Me},p:{style:q},pt:{style:q},pr:{style:q},pb:{style:q},pl:{style:q},px:{style:q},py:{style:q},padding:{style:q},paddingTop:{style:q},paddingRight:{style:q},paddingBottom:{style:q},paddingLeft:{style:q},paddingX:{style:q},paddingY:{style:q},paddingInline:{style:q},paddingInlineStart:{style:q},paddingInlineEnd:{style:q},paddingBlock:{style:q},paddingBlockStart:{style:q},paddingBlockEnd:{style:q},m:{style:J},mt:{style:J},mr:{style:J},mb:{style:J},ml:{style:J},mx:{style:J},my:{style:J},margin:{style:J},marginTop:{style:J},marginRight:{style:J},marginBottom:{style:J},marginLeft:{style:J},marginX:{style:J},marginY:{style:J},marginInline:{style:J},marginInlineStart:{style:J},marginInlineEnd:{style:J},marginBlock:{style:J},marginBlockStart:{style:J},marginBlockEnd:{style:J},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:tr},rowGap:{style:ar},columnGap:{style:or},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:ne},maxWidth:{style:wr},minWidth:{transform:ne},height:{transform:ne},maxHeight:{transform:ne},minHeight:{transform:ne},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Tr=vo;function xo(...e){const r=e.reduce((t,o)=>t.concat(Object.keys(o)),[]),n=new Set(r);return e.every(t=>n.size===Object.keys(t).length)}function ko(e,r){return typeof e=="function"?e(r):e}function So(){function e(n,t,o,a){const s={[n]:t,theme:o},c=a[n];if(!c)return{[n]:t};const{cssProperty:i=n,themeKey:l,transform:f,style:p}=c;if(t==null)return null;if(l==="typography"&&t==="inherit")return{[n]:t};const u=Ze(o,l)||{};return p?p(s):be(s,t,v=>{let h=Ye(u,f,v);return v===h&&typeof v=="string"&&(h=Ye(u,f,`${n}${v==="default"?"":pe(v)}`,v)),i===!1?h:{[i]:h}})}function r(n){var t;const{sx:o,theme:a={}}=n||{};if(!o)return null;const s=(t=a.unstable_sxConfig)!=null?t:Tr;function c(i){let l=i;if(typeof i=="function")l=i(a);else if(typeof i!="object")return i;if(!l)return null;const f=Mt(a.breakpoints),p=Object.keys(f);let u=f;return Object.keys(l).forEach(y=>{const v=ko(l[y],a);if(v!=null)if(typeof v=="object")if(s[y])u=Le(u,e(y,v,a,s));else{const h=be({theme:a},v,d=>({[y]:d}));xo(h,v)?u[y]=r({sx:v,theme:a}):u=Le(u,h)}else u=Le(u,e(y,v,a,s))}),It(p,u)}return Array.isArray(o)?o.map(c):c(o)}return r}const Pn=So();Pn.filterProps=["sx"];const Cr=Pn,No=["breakpoints","palette","spacing","shape"];function Or(e={},...r){const{breakpoints:n={},palette:t={},spacing:o,shape:a={}}=e,s=ye(e,No),c=Rt(n),i=Ht(o);let l=ge({breakpoints:c,direction:"ltr",components:{},palette:A({mode:"light"},t),spacing:i,shape:A({},At,a)},s);return l=r.reduce((f,p)=>ge(f,p),l),l.unstable_sxConfig=A({},Tr,s==null?void 0:s.unstable_sxConfig),l.unstable_sx=function(p){return Cr({sx:p,theme:this})},l}function Eo(e){return Object.keys(e).length===0}function wo(e=null){const r=Fe.useContext(mr.ThemeContext);return!r||Eo(r)?e:r}const To=Or();function Co(e=To){return wo(e)}const Oo=["variant"];function rn(e){return e.length===0}function Mn(e){const{variant:r}=e,n=ye(e,Oo);let t=r||"";return Object.keys(n).sort().forEach(o=>{o==="color"?t+=rn(t)?e[o]:pe(e[o]):t+=`${rn(t)?o:pe(o)}${pe(e[o].toString())}`}),t}const _o=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Ro(e){return Object.keys(e).length===0}function $o(e){return typeof e=="string"&&e.charCodeAt(0)>96}const Ao=(e,r)=>r.components&&r.components[e]&&r.components[e].styleOverrides?r.components[e].styleOverrides:null,Po=(e,r)=>{let n=[];r&&r.components&&r.components[e]&&r.components[e].variants&&(n=r.components[e].variants);const t={};return n.forEach(o=>{const a=Mn(o.props);t[a]=o.style}),t},Mo=(e,r,n,t)=>{var o;const{ownerState:a={}}=e,s=[],c=n==null||(o=n.components)==null||(o=o[t])==null?void 0:o.variants;return c&&c.forEach(i=>{let l=!0;Object.keys(i.props).forEach(f=>{a[f]!==i.props[f]&&e[f]!==i.props[f]&&(l=!1)}),l&&s.push(r[Mn(i.props)])}),s};function Ke(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Io=Or(),nn=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function ze({defaultTheme:e,theme:r,themeId:n}){return Ro(r)?e:r[n]||r}function jo(e){return e?(r,n)=>n[e]:null}function Bo(e={}){const{themeId:r,defaultTheme:n=Io,rootShouldForwardProp:t=Ke,slotShouldForwardProp:o=Ke}=e,a=s=>Cr(A({},s,{theme:ze(A({},s,{defaultTheme:n,themeId:r}))}));return a.__mui_systemSx=!0,(s,c={})=>{mr.internal_processStyles(s,$=>$.filter(m=>!(m!=null&&m.__mui_systemSx)));const{name:i,slot:l,skipVariantsResolver:f,skipSx:p,overridesResolver:u=jo(nn(l))}=c,y=ye(c,_o),v=f!==void 0?f:l&&l!=="Root"&&l!=="root"||!1,h=p||!1;let d;process.env.NODE_ENV!=="production"&&i&&(d=`${i}-${nn(l||"Root")}`);let N=Ke;l==="Root"||l==="root"?N=t:l?N=o:$o(s)&&(N=void 0);const W=mr(s,A({shouldForwardProp:N,label:d},y)),j=($,...m)=>{const Y=m?m.map(B=>typeof B=="function"&&B.__emotion_real!==B?Z=>B(A({},Z,{theme:ze(A({},Z,{defaultTheme:n,themeId:r}))})):B):[];let te=$;i&&u&&Y.push(B=>{const Z=ze(A({},B,{defaultTheme:n,themeId:r})),ue=Ao(i,Z);if(ue){const de={};return Object.entries(ue).forEach(([ee,K])=>{de[ee]=typeof K=="function"?K(A({},B,{theme:Z})):K}),u(B,de)}return null}),i&&!v&&Y.push(B=>{const Z=ze(A({},B,{defaultTheme:n,themeId:r}));return Mo(B,Po(i,Z),Z,i)}),h||Y.push(a);const le=Y.length-m.length;if(Array.isArray($)&&le>0){const B=new Array(le).fill("");te=[...$,...B],te.raw=[...$.raw,...B]}else typeof $=="function"&&$.__emotion_real!==$&&(te=B=>$(A({},B,{theme:ze(A({},B,{defaultTheme:n,themeId:r}))})));const ie=W(te,...Y);if(process.env.NODE_ENV!=="production"){let B;i&&(B=`${i}${pe(l||"")}`),B===void 0&&(B=`Styled(${xt(s)})`),ie.displayName=B}return s.muiName&&(ie.muiName=s.muiName),ie};return W.withConfig&&(j.withConfig=W.withConfig),j}}function Do(e){const{theme:r,name:n,props:t}=e;return!r||!r.components||!r.components[n]||!r.components[n].defaultProps?t:_n(r.components[n].defaultProps,t)}function zo({props:e,name:r,defaultTheme:n,themeId:t}){let o=Co(n);return t&&(o=o[t]||o),Do({theme:o,name:r,props:e})}function In(e,r=0,n=1){return process.env.NODE_ENV!=="production"&&(e<r||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${r}, ${n}].`),Math.min(Math.max(r,e),n)}function Vo(e){e=e.slice(1);const r=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(r);return n&&n[0].length===1&&(n=n.map(t=>t+t)),n?`rgb${n.length===4?"a":""}(${n.map((t,o)=>o<3?parseInt(t,16):Math.round(parseInt(t,16)/255*1e3)/1e3).join(", ")})`:""}function je(e){if(e.type)return e;if(e.charAt(0)==="#")return je(Vo(e));const r=e.indexOf("("),n=e.substring(0,r);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Ie(9,e));let t=e.substring(r+1,e.length-1),o;if(n==="color"){if(t=t.split(" "),o=t.shift(),t.length===4&&t[3].charAt(0)==="/"&&(t[3]=t[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Ie(10,o))}else t=t.split(",");return t=t.map(a=>parseFloat(a)),{type:n,values:t,colorSpace:o}}function _r(e){const{type:r,colorSpace:n}=e;let{values:t}=e;return r.indexOf("rgb")!==-1?t=t.map((o,a)=>a<3?parseInt(o,10):o):r.indexOf("hsl")!==-1&&(t[1]=`${t[1]}%`,t[2]=`${t[2]}%`),r.indexOf("color")!==-1?t=`${n} ${t.join(" ")}`:t=`${t.join(", ")}`,`${r}(${t})`}function Lo(e){e=je(e);const{values:r}=e,n=r[0],t=r[1]/100,o=r[2]/100,a=t*Math.min(o,1-o),s=(l,f=(l+n/30)%12)=>o-a*Math.max(Math.min(f-3,9-f,1),-1);let c="rgb";const i=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(c+="a",i.push(r[3])),_r({type:c,values:i})}function tn(e){e=je(e);let r=e.type==="hsl"||e.type==="hsla"?je(Lo(e)).values:e.values;return r=r.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*r[0]+.7152*r[1]+.0722*r[2]).toFixed(3))}function on(e,r){const n=tn(e),t=tn(r);return(Math.max(n,t)+.05)/(Math.min(n,t)+.05)}function Fo(e,r){if(e=je(e),r=In(r),e.type.indexOf("hsl")!==-1)e.values[2]*=1-r;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-r;return _r(e)}function Ho(e,r){if(e=je(e),r=In(r),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*r;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*r;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*r;return _r(e)}function Uo(e,r){return A({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},r)}const Go={black:"#000",white:"#fff"},He=Go,Jo={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},qo=Jo,Ko={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Oe=Ko,Wo={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},_e=Wo,Xo={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Ve=Xo,Yo={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Re=Yo,Zo={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},$e=Zo,Qo={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Ae=Qo,ea=["mode","contrastThreshold","tonalOffset"],an={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:He.white,default:He.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},hr={text:{primary:He.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:He.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function sn(e,r,n,t){const o=t.light||t,a=t.dark||t*1.5;e[r]||(e.hasOwnProperty(n)?e[r]=e[n]:r==="light"?e.light=Ho(e.main,o):r==="dark"&&(e.dark=Fo(e.main,a)))}function ra(e="light"){return e==="dark"?{main:Re[200],light:Re[50],dark:Re[400]}:{main:Re[700],light:Re[400],dark:Re[800]}}function na(e="light"){return e==="dark"?{main:Oe[200],light:Oe[50],dark:Oe[400]}:{main:Oe[500],light:Oe[300],dark:Oe[700]}}function ta(e="light"){return e==="dark"?{main:_e[500],light:_e[300],dark:_e[700]}:{main:_e[700],light:_e[400],dark:_e[800]}}function oa(e="light"){return e==="dark"?{main:$e[400],light:$e[300],dark:$e[700]}:{main:$e[700],light:$e[500],dark:$e[900]}}function aa(e="light"){return e==="dark"?{main:Ae[400],light:Ae[300],dark:Ae[700]}:{main:Ae[800],light:Ae[500],dark:Ae[900]}}function sa(e="light"){return e==="dark"?{main:Ve[400],light:Ve[300],dark:Ve[700]}:{main:"#ed6c02",light:Ve[500],dark:Ve[900]}}function ia(e){const{mode:r="light",contrastThreshold:n=3,tonalOffset:t=.2}=e,o=ye(e,ea),a=e.primary||ra(r),s=e.secondary||na(r),c=e.error||ta(r),i=e.info||oa(r),l=e.success||aa(r),f=e.warning||sa(r);function p(h){const d=on(h,hr.text.primary)>=n?hr.text.primary:an.text.primary;if(process.env.NODE_ENV!=="production"){const N=on(h,d);N<3&&console.error([`MUI: The contrast ratio of ${N}:1 for ${d} on ${h}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return d}const u=({color:h,name:d,mainShade:N=500,lightShade:W=300,darkShade:j=700})=>{if(h=A({},h),!h.main&&h[N]&&(h.main=h[N]),!h.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${d?` (${d})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${N}\` property.`:Ie(11,d?` (${d})`:"",N));if(typeof h.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${d?` (${d})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Ie(12,d?` (${d})`:"",JSON.stringify(h.main)));return sn(h,"light",W,t),sn(h,"dark",j,t),h.contrastText||(h.contrastText=p(h.main)),h},y={dark:hr,light:an};return process.env.NODE_ENV!=="production"&&(y[r]||console.error(`MUI: The palette mode \`${r}\` is not supported.`)),ge(A({common:A({},He),mode:r,primary:u({color:a,name:"primary"}),secondary:u({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:u({color:c,name:"error"}),warning:u({color:f,name:"warning"}),info:u({color:i,name:"info"}),success:u({color:l,name:"success"}),grey:qo,contrastThreshold:n,getContrastText:p,augmentColor:u,tonalOffset:t},y[r]),o)}const ca=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function la(e){return Math.round(e*1e5)/1e5}const cn={textTransform:"uppercase"},ln='"Roboto", "Helvetica", "Arial", sans-serif';function ua(e,r){const n=typeof r=="function"?r(e):r,{fontFamily:t=ln,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:s=400,fontWeightMedium:c=500,fontWeightBold:i=700,htmlFontSize:l=16,allVariants:f,pxToRem:p}=n,u=ye(n,ca);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof l!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const y=o/14,v=p||(N=>`${N/l*y}rem`),h=(N,W,j,$,m)=>A({fontFamily:t,fontWeight:N,fontSize:v(W),lineHeight:j},t===ln?{letterSpacing:`${la($/W)}em`}:{},m,f),d={h1:h(a,96,1.167,-1.5),h2:h(a,60,1.2,-.5),h3:h(s,48,1.167,0),h4:h(s,34,1.235,.25),h5:h(s,24,1.334,0),h6:h(c,20,1.6,.15),subtitle1:h(s,16,1.75,.15),subtitle2:h(c,14,1.57,.1),body1:h(s,16,1.5,.15),body2:h(s,14,1.43,.15),button:h(c,14,1.75,.4,cn),caption:h(s,12,1.66,.4),overline:h(s,12,2.66,1,cn),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return ge(A({htmlFontSize:l,pxToRem:v,fontFamily:t,fontSize:o,fontWeightLight:a,fontWeightRegular:s,fontWeightMedium:c,fontWeightBold:i},d),u,{clone:!1})}const da=.2,fa=.14,pa=.12;function G(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${da})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${fa})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${pa})`].join(",")}const ha=["none",G(0,2,1,-1,0,1,1,0,0,1,3,0),G(0,3,1,-2,0,2,2,0,0,1,5,0),G(0,3,3,-2,0,3,4,0,0,1,8,0),G(0,2,4,-1,0,4,5,0,0,1,10,0),G(0,3,5,-1,0,5,8,0,0,1,14,0),G(0,3,5,-1,0,6,10,0,0,1,18,0),G(0,4,5,-2,0,7,10,1,0,2,16,1),G(0,5,5,-3,0,8,10,1,0,3,14,2),G(0,5,6,-3,0,9,12,1,0,3,16,2),G(0,6,6,-3,0,10,14,1,0,4,18,3),G(0,6,7,-4,0,11,15,1,0,4,20,3),G(0,7,8,-4,0,12,17,2,0,5,22,4),G(0,7,8,-4,0,13,19,2,0,5,24,4),G(0,7,9,-4,0,14,21,2,0,5,26,4),G(0,8,9,-5,0,15,22,2,0,6,28,5),G(0,8,10,-5,0,16,24,2,0,6,30,5),G(0,8,11,-5,0,17,26,2,0,6,32,5),G(0,9,11,-5,0,18,28,2,0,7,34,6),G(0,9,12,-6,0,19,29,2,0,7,36,6),G(0,10,13,-6,0,20,31,3,0,8,38,7),G(0,10,13,-6,0,21,33,3,0,8,40,7),G(0,10,14,-6,0,22,35,3,0,8,42,7),G(0,11,14,-7,0,23,36,3,0,9,44,8),G(0,11,15,-7,0,24,38,3,0,9,46,8)],ma=ha,ga=["duration","easing","delay"],ba={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},ya={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function un(e){return`${Math.round(e)}ms`}function va(e){if(!e)return 0;const r=e/36;return Math.round((4+15*r**.25+r/5)*10)}function xa(e){const r=A({},ba,e.easing),n=A({},ya,e.duration);return A({getAutoHeightDuration:va,create:(o=["all"],a={})=>{const{duration:s=n.standard,easing:c=r.easeInOut,delay:i=0}=a,l=ye(a,ga);if(process.env.NODE_ENV!=="production"){const f=u=>typeof u=="string",p=u=>!isNaN(parseFloat(u));!f(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!p(s)&&!f(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),f(c)||console.error('MUI: Argument "easing" must be a string.'),!p(i)&&!f(i)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(l).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(l).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(f=>`${f} ${typeof s=="string"?s:un(s)} ${c} ${typeof i=="string"?i:un(i)}`).join(",")}},e,{easing:r,duration:n})}const ka={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Sa=ka,Na=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Ea(e={},...r){const{mixins:n={},palette:t={},transitions:o={},typography:a={}}=e,s=ye(e,Na);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Ie(18));const c=ia(t),i=Or(e);let l=ge(i,{mixins:Uo(i.breakpoints,n),palette:c,shadows:ma.slice(),typography:ua(c,a),transitions:xa(o),zIndex:A({},Sa)});if(l=ge(l,s),l=r.reduce((f,p)=>ge(f,p),l),process.env.NODE_ENV!=="production"){const f=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],p=(u,y)=>{let v;for(v in u){const h=u[v];if(f.indexOf(v)!==-1&&Object.keys(h).length>0){if(process.env.NODE_ENV!=="production"){const d=Nr("",v);console.error([`MUI: The \`${y}\` component increases the CSS specificity of the \`${v}\` internal state.`,"You can not override it like this: ",JSON.stringify(u,null,2),"",`Instead, you need to use the '&.${d}' syntax:`,JSON.stringify({root:{[`&.${d}`]:h}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}u[v]={}}}};Object.keys(l.components).forEach(u=>{const y=l.components[u].styleOverrides;y&&u.indexOf("Mui")===0&&p(y,u)})}return l.unstable_sxConfig=A({},Tr,s==null?void 0:s.unstable_sxConfig),l.unstable_sx=function(p){return Cr({sx:p,theme:this})},l}const wa=Ea(),jn=wa,Bn="$$material";function Ta({props:e,name:r}){return zo({props:e,name:r,defaultTheme:jn,themeId:Bn})}const Ca=e=>Ke(e)&&e!=="classes",Oa=Bo({themeId:Bn,defaultTheme:jn,rootShouldForwardProp:Ca}),_a=Oa;function Ra(e){return Nr("MuiSvgIcon",e)}Tt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const $a=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Aa=e=>{const{color:r,fontSize:n,classes:t}=e,o={root:["root",r!=="inherit"&&`color${pe(r)}`,`fontSize${pe(n)}`]};return kt(o,Ra,t)},Pa=_a("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:n}=e;return[r.root,n.color!=="inherit"&&r[`color${pe(n.color)}`],r[`fontSize${pe(n.fontSize)}`]]}})(({theme:e,ownerState:r})=>{var n,t,o,a,s,c,i,l,f,p,u,y,v;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:r.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(t=n.create)==null?void 0:t.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((c=e.typography)==null||(i=c.pxToRem)==null?void 0:i.call(c,24))||"1.5rem",large:((l=e.typography)==null||(f=l.pxToRem)==null?void 0:f.call(l,35))||"2.1875rem"}[r.fontSize],color:(p=(u=(e.vars||e).palette)==null||(u=u[r.color])==null?void 0:u.main)!=null?p:{action:(y=(e.vars||e).palette)==null||(y=y.action)==null?void 0:y.active,disabled:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.disabled,inherit:void 0}[r.color]}}),Rr=Fe.forwardRef(function(r,n){const t=Ta({props:r,name:"MuiSvgIcon"}),{children:o,className:a,color:s="inherit",component:c="svg",fontSize:i="medium",htmlColor:l,inheritViewBox:f=!1,titleAccess:p,viewBox:u="0 0 24 24"}=t,y=ye(t,$a),v=Fe.isValidElement(o)&&o.type==="svg",h=A({},t,{color:s,component:c,fontSize:i,instanceFontSize:r.fontSize,inheritViewBox:f,viewBox:u,hasSvgAsChild:v}),d={};f||(d.viewBox=u);const N=Aa(h);return S.jsxs(Pa,A({as:c,className:Ct(N.root,a),focusable:"false",color:l,"aria-hidden":p?void 0:!0,role:p?"img":void 0,ref:n},d,y,v&&o.props,{ownerState:h,children:[v?o.props.children:o,p?S.jsx("title",{children:p}):null]}))});process.env.NODE_ENV!=="production"&&(Rr.propTypes={children:U.node,classes:U.object,className:U.string,color:U.oneOfType([U.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),U.string]),component:U.elementType,fontSize:U.oneOfType([U.oneOf(["inherit","large","medium","small"]),U.string]),htmlColor:U.string,inheritViewBox:U.bool,shapeRendering:U.string,sx:U.oneOfType([U.arrayOf(U.oneOfType([U.func,U.object,U.bool])),U.func,U.object]),titleAccess:U.string,viewBox:U.string});Rr.muiName="SvgIcon";const dn=Rr;function Ma(e,r){function n(t,o){return S.jsx(dn,A({"data-testid":`${r}Icon`,ref:o},t,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${r}Icon`),n.muiName=dn.muiName,Fe.memo(Fe.forwardRef(n))}const Ia=Ma(S.jsx("path",{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}),"Menu");function ja({menu:e,dataHandler:r,commandHandler:n,className:t,id:o,children:a}){const[s,c]=ae.useState(!1),[i,l]=ae.useState(!1),f=ae.useCallback(()=>{s&&c(!1),l(!1)},[s]),p=ae.useCallback(N=>{N.stopPropagation(),c(W=>{const j=!W;return j&&N.shiftKey?l(!0):j||l(!1),j})},[]),u=ae.useRef(null),[y,v]=ae.useState(0);ae.useEffect(()=>{s&&u.current&&v(u.current.clientHeight)},[s]);const h=ae.useCallback(N=>(f(),n(N)),[n,f]);let d=e;return!d&&r&&(d=r(i)),S.jsx("div",{ref:u,style:{position:"relative"},children:S.jsx(X.AppBar,{position:"static",id:o,children:S.jsxs(X.Toolbar,{className:`papi-toolbar ${t??""}`,variant:"dense",children:[d?S.jsx(X.IconButton,{edge:"start",className:`papi-menuButton ${t??""}`,color:"inherit","aria-label":"open drawer",onClick:p,children:S.jsx(Ia,{})}):null,a?S.jsx("div",{className:"papi-menu-children",children:a}):null,d?S.jsx(X.Drawer,{className:`papi-menu-drawer ${t??""}`,anchor:"left",variant:"persistent",open:s,onClose:f,PaperProps:{className:"papi-menu-drawer-paper",style:{top:y}},children:S.jsx(hn,{commandHandler:h,columns:d.columns})}):null]})})})}exports.Button=Se;exports.ChapterRangeSelector=zn;exports.Checkbox=fn;exports.ComboBox=We;exports.GridMenu=hn;exports.LabelPosition=Ee;exports.MenuItem=pn;exports.RefSelector=et;exports.Slider=rt;exports.Snackbar=nt;exports.Switch=tt;exports.Table=at;exports.TextField=Xe;exports.Toolbar=ja;exports.getChaptersForBook=kr;function Ba(e,r="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),t=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),r==="top"&&t?n.insertBefore(o,t):n.appendChild(o)}Ba(`.papi-button {
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
.papi-toolbar {
  background-color: rgb(245, 245, 245);
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
//# sourceMappingURL=index.cjs.js.map
