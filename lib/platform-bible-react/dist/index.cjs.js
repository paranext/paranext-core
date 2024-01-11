"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const E=require("react/jsx-runtime"),Q=require("@mui/material"),Y=require("react"),Kr=require("react-data-grid"),Rr=require("@mui/styled-engine");function Nn(e){const r=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const t in e)if(t!=="default"){const n=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,n.get?n:{enumerable:!0,get:()=>e[t]})}}return r.default=e,Object.freeze(r)}const rr=Nn(Y);function Oe({id:e,isDisabled:r=!1,className:t,onClick:n,onContextMenu:o,children:s}){return E.jsx(Q.Button,{id:e,disabled:r,className:`papi-button ${t??""}`,onClick:n,onContextMenu:o,children:s})}function ur({id:e,title:r,isDisabled:t=!1,isClearable:n=!0,hasError:o=!1,isFullWidth:s=!1,width:a,options:l=[],className:u,value:i,onChange:c,onFocus:d,onBlur:f,getOptionLabel:b}){return E.jsx(Q.Autocomplete,{id:e,disablePortal:!0,disabled:t,disableClearable:!n,fullWidth:s,options:l,className:`papi-combo-box ${o?"error":""} ${u??""}`,value:i,onChange:c,onFocus:d,onBlur:f,getOptionLabel:b,renderInput:y=>E.jsx(Q.TextField,{...y,error:o,fullWidth:s,disabled:t,label:r,style:{width:a}})})}function En({startChapter:e,endChapter:r,handleSelectStartChapter:t,handleSelectEndChapter:n,isDisabled:o,chapterCount:s}){const a=Y.useMemo(()=>Array.from({length:s},(i,c)=>c+1),[s]),l=(i,c)=>{t(c),c>r&&n(c)},u=(i,c)=>{n(c),c<e&&t(c)};return E.jsxs(E.Fragment,{children:[E.jsx(Q.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:E.jsx(ur,{onChange:(i,c)=>l(i,c),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:i=>i.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),E.jsx(Q.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:E.jsx(ur,{onChange:(i,c)=>u(i,c),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:i=>i.toString(),value:r,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var Ae=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Ae||{});function Dt({id:e,isChecked:r,labelText:t="",labelPosition:n=Ae.After,isIndeterminate:o=!1,isDefaultChecked:s,isDisabled:a=!1,hasError:l=!1,className:u,onChange:i}){const c=E.jsx(Q.Checkbox,{id:e,checked:r,indeterminate:o,defaultChecked:s,disabled:a,className:`papi-checkbox ${l?"error":""} ${u??""}`,onChange:i});let d;if(t){const f=n===Ae.Before||n===Ae.Above,b=E.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${u??""}`,children:t}),y=n===Ae.Before||n===Ae.After,h=y?b:E.jsx("div",{children:b}),p=y?c:E.jsx("div",{children:c});d=E.jsxs(Q.FormLabel,{className:`papi-checkbox ${n.toString()}`,disabled:a,error:l,children:[f&&h,p,!f&&h]})}else d=c;return d}function Vt(e){const{onClick:r,name:t,hasAutoFocus:n=!1,className:o,isDense:s=!0,hasDisabledGutters:a=!1,hasDivider:l=!1,focusVisibleClassName:u,id:i,children:c}=e;return E.jsx(Q.MenuItem,{autoFocus:n,className:o,dense:s,disableGutters:a,divider:l,focusVisibleClassName:u,onClick:r,id:i,children:t||c})}function Sn({commandHandler:e,name:r,className:t,items:n,id:o}){return E.jsxs(Q.Grid,{id:o,item:!0,xs:"auto",className:`papi-menu-column ${t??""}`,children:[E.jsx("h3",{className:`papi-menu ${t??""}`,children:r}),n.map((s,a)=>E.jsx(Vt,{className:`papi-menu-item ${s.className}`,onClick:()=>{e(s)},...s},a))]})}function zt({commandHandler:e,className:r,columns:t,id:n}){return E.jsx(Q.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${r??""}`,columns:t.length,id:n,children:t.map((o,s)=>E.jsx(Sn,{commandHandler:e,name:o.name,className:r,items:o.items},s))})}function kn({id:e,label:r,isDisabled:t=!1,tooltip:n,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:s=!1,size:a="medium",className:l,onClick:u,children:i}){return E.jsx(Q.IconButton,{id:e,disabled:t,edge:s,size:a,"aria-label":r,title:o?void 0:n??r,className:`papi-icon-button ${l??""}`,onClick:u,children:i})}var wn=Object.defineProperty,Cn=(e,r,t)=>r in e?wn(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,$=(e,r,t)=>(Cn(e,typeof r!="symbol"?r+"":r,t),t);const Pe=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Pr=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Lt=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Wr=Bn();function Ge(e,r=!0){return r&&(e=e.toUpperCase()),e in Wr?Wr[e]:0}function Mr(e){return Ge(e)>0}function Tn(e){const r=typeof e=="string"?Ge(e):e;return r>=40&&r<=66}function On(e){return(typeof e=="string"?Ge(e):e)<=39}function qt(e){return e<=66}function _n(e){const r=typeof e=="string"?Ge(e):e;return Ht(r)&&!qt(r)}function*Rn(){for(let e=1;e<=Pe.length;e++)yield e}const $n=1,Xt=Pe.length;function An(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Ir(e,r="***"){const t=e-1;return t<0||t>=Pe.length?r:Pe[t]}function Jt(e){return e<=0||e>Xt?"******":Lt[e-1]}function Pn(e){return Jt(Ge(e))}function Ht(e){const r=typeof e=="number"?Ir(e):e;return Mr(r)&&!Pr.includes(r)}function Mn(e){const r=typeof e=="number"?Ir(e):e;return Mr(r)&&Pr.includes(r)}function In(e){return Lt[e-1].includes("*obsolete*")}function Bn(){const e={};for(let r=0;r<Pe.length;r++)e[Pe[r]]=r+1;return e}const _e={allBookIds:Pe,nonCanonicalIds:Pr,bookIdToNumber:Ge,isBookIdValid:Mr,isBookNT:Tn,isBookOT:On,isBookOTNT:qt,isBookDC:_n,allBookNumbers:Rn,firstBook:$n,lastBook:Xt,extraBooks:An,bookNumberToId:Ir,bookNumberToEnglishName:Jt,bookIdToEnglishName:Pn,isCanonical:Ht,isExtraMaterial:Mn,isObsolete:In};var Ee=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ee||{});const Re=class{constructor(e){if($(this,"name"),$(this,"fullPath"),$(this,"isPresent"),$(this,"hasVerseSegments"),$(this,"isCustomized"),$(this,"baseVersification"),$(this,"scriptureBooks"),$(this,"_type"),e!=null)typeof e=="string"?this.name=e:this._type=e;else throw new Error("Argument null")}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};let ce=Re;$(ce,"Original",new Re(Ee.Original)),$(ce,"Septuagint",new Re(Ee.Septuagint)),$(ce,"Vulgate",new Re(Ee.Vulgate)),$(ce,"English",new Re(Ee.English)),$(ce,"RussianProtestant",new Re(Ee.RussianProtestant)),$(ce,"RussianOrthodox",new Re(Ee.RussianOrthodox));function Yr(e,r){const t=r[0];for(let n=1;n<r.length;n++)e=e.split(r[n]).join(t);return e.split(t)}var Gt=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Gt||{});const _=class{constructor(r,t,n,o){if($(this,"firstChapter"),$(this,"lastChapter"),$(this,"lastVerse"),$(this,"hasSegmentsDefined"),$(this,"text"),$(this,"BBBCCCVVVS"),$(this,"longHashCode"),$(this,"versification"),$(this,"rtlMark","‏"),$(this,"_bookNum",0),$(this,"_chapterNum",0),$(this,"_verseNum",0),$(this,"_verse"),n==null&&o==null)if(r!=null&&typeof r=="string"){const s=r,a=t!=null&&t instanceof ce?t:void 0;this.setEmpty(a),this.parse(s)}else if(r!=null&&typeof r=="number"){const s=t!=null&&t instanceof ce?t:void 0;this.setEmpty(s),this._verseNum=r%_.chapterDigitShifter,this._chapterNum=Math.floor(r%_.bookDigitShifter/_.chapterDigitShifter),this._bookNum=Math.floor(r/_.bookDigitShifter)}else if(t==null)if(r!=null&&r instanceof _){const s=r;this._bookNum=s.bookNum,this._chapterNum=s.chapterNum,this._verseNum=s.verseNum,this._verse=s.verse,this.versification=s.versification}else{if(r==null)return;const s=r instanceof ce?r:_.defaultVersification;this.setEmpty(s)}else throw new Error("VerseRef constructor not supported.");else if(r!=null&&t!=null&&n!=null)if(typeof r=="string"&&typeof t=="string"&&typeof n=="string")this.setEmpty(o),this.updateInternal(r,t,n);else if(typeof r=="number"&&typeof t=="number"&&typeof n=="number")this._bookNum=r,this._chapterNum=t,this._verseNum=n,this.versification=o??_.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(r,t=_.defaultVersification){const n=new _(t);return n.parse(r),n}static isVerseParseable(r){return r.length>0&&"0123456789".includes(r[0])&&!r.endsWith(this.verseRangeSeparator)&&!r.endsWith(this.verseSequenceIndicator)}static tryParse(r){let t;try{return t=_.parse(r),{success:!0,verseRef:t}}catch(n){if(n instanceof Ke)return t=new _,{success:!1,verseRef:t};throw n}}static getBBBCCCVVV(r,t,n){return r%_.bcvMaxValue*_.bookDigitShifter+(t>=0?t%_.bcvMaxValue*_.chapterDigitShifter:0)+(n>=0?n%_.bcvMaxValue:0)}static tryGetVerseNum(r){let t;if(!r)return t=-1,{success:!0,vNum:t};t=0;let n;for(let o=0;o<r.length;o++){if(n=r[o],n<"0"||n>"9")return o===0&&(t=-1),{success:!1,vNum:t};if(t=t*10+ +n-+"0",t>_.bcvMaxValue)return t=-1,{success:!1,vNum:t}}return{success:!0,vNum:t}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(_.verseRangeSeparator)||this._verse.includes(_.verseSequenceIndicator))}get book(){return _e.bookNumberToId(this.bookNum,"")}set book(r){this.bookNum=_e.bookIdToNumber(r)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(r){const t=+r;this._chapterNum=Number.isInteger(t)?t:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(r){const{success:t,vNum:n}=_.tryGetVerseNum(r);this._verse=t?void 0:r.replace(this.rtlMark,""),this._verseNum=n,!(this._verseNum>=0)&&({vNum:this._verseNum}=_.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(r){if(r<=0||r>_e.lastBook)throw new Ke("BookNum must be greater than zero and less than or equal to last book");this._bookNum=r}get chapterNum(){return this._chapterNum}set chapterNum(r){this.chapterNum=r}get verseNum(){return this._verseNum}set verseNum(r){this._verseNum=r}get versificationStr(){var r;return(r=this.versification)==null?void 0:r.name}set versificationStr(r){this.versification=this.versification!=null?new ce(r):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(_.verseRangeSeparators,_.verseSequenceIndicators)}get BBBCCC(){return _.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return _.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(r){if(r=r.replace(this.rtlMark,""),r.includes("/")){const s=r.split("/");if(r=s[0],s.length>1)try{const a=+s[1].trim();this.versification=new ce(Ee[a])}catch{throw new Ke("Invalid reference : "+r)}}const t=r.trim().split(" ");if(t.length!==2)throw new Ke("Invalid reference : "+r);const n=t[1].split(":"),o=+n[0];if(n.length!==2||_e.bookIdToNumber(t[0])===0||!Number.isInteger(o)||o<0||!_.isVerseParseable(n[1]))throw new Ke("Invalid reference : "+r);this.updateInternal(t[0],n[0],n[1])}simplify(){this._verse=void 0}clone(){return new _(this)}toString(){const r=this.book;return r===""?"":`${r} ${this.chapter}:${this.verse}`}equals(r){return r._bookNum===this._bookNum&&r._chapterNum===this._chapterNum&&r._verseNum===this._verseNum&&r._verse===this._verse&&r.versification!=null&&this.versification!=null&&r.versification.equals(this.versification)}allVerses(r=!1,t=_.verseRangeSeparators,n=_.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],s=Yr(this._verse,n);for(const a of s.map(l=>Yr(l,t))){const l=this.clone();l.verse=a[0];const u=l.verseNum;if(o.push(l),a.length>1){const i=this.clone();if(i.verse=a[1],!r)for(let c=u+1;c<i.verseNum;c++){const d=new _(this._bookNum,this._chapterNum,c,this.versification);this.isExcluded||o.push(d)}o.push(i)}}return o}validateVerse(r,t){if(!this.verse)return this.internalValid;let n=0;for(const o of this.allVerses(!0,r,t)){const s=o.internalValid;if(s!==0)return s;const a=o.BBBCCCVVV;if(n>a)return 3;if(n===a)return 4;n=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>_e.lastBook?2:0}setEmpty(r=_.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=r}updateInternal(r,t,n){this.bookNum=_e.bookIdToNumber(r),this.chapter=t,this.verse=n}};let be=_;$(be,"defaultVersification",ce.English),$(be,"verseRangeSeparator","-"),$(be,"verseSequenceIndicator",","),$(be,"verseRangeSeparators",[_.verseRangeSeparator]),$(be,"verseSequenceIndicators",[_.verseSequenceIndicator]),$(be,"chapterDigitShifter",1e3),$(be,"bookDigitShifter",_.chapterDigitShifter*_.chapterDigitShifter),$(be,"bcvMaxValue",_.chapterDigitShifter-1),$(be,"ValidStatusType",Gt);class Ke extends Error{}var jn=Object.defineProperty,Dn=(e,r,t)=>r in e?jn(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,A=(e,r,t)=>(Dn(e,typeof r!="symbol"?r+"":r,t),t);const Me=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Br=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Ut=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Zr=Fn();function Ue(e,r=!0){return r&&(e=e.toUpperCase()),e in Zr?Zr[e]:0}function jr(e){return Ue(e)>0}function Vn(e){const r=typeof e=="string"?Ue(e):e;return r>=40&&r<=66}function zn(e){return(typeof e=="string"?Ue(e):e)<=39}function Ft(e){return e<=66}function Ln(e){const r=typeof e=="string"?Ue(e):e;return Yt(r)&&!Ft(r)}function*qn(){for(let e=1;e<=Me.length;e++)yield e}const Xn=1,Kt=Me.length;function Jn(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Dr(e,r="***"){const t=e-1;return t<0||t>=Me.length?r:Me[t]}function Wt(e){return e<=0||e>Kt?"******":Ut[e-1]}function Hn(e){return Wt(Ue(e))}function Yt(e){const r=typeof e=="number"?Dr(e):e;return jr(r)&&!Br.includes(r)}function Gn(e){const r=typeof e=="number"?Dr(e):e;return jr(r)&&Br.includes(r)}function Un(e){return Ut[e-1].includes("*obsolete*")}function Fn(){const e={};for(let r=0;r<Me.length;r++)e[Me[r]]=r+1;return e}const Se={allBookIds:Me,nonCanonicalIds:Br,bookIdToNumber:Ue,isBookIdValid:jr,isBookNT:Vn,isBookOT:zn,isBookOTNT:Ft,isBookDC:Ln,allBookNumbers:qn,firstBook:Xn,lastBook:Kt,extraBooks:Jn,bookNumberToId:Dr,bookNumberToEnglishName:Wt,bookIdToEnglishName:Hn,isCanonical:Yt,isExtraMaterial:Gn,isObsolete:Un};var ke=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(ke||{});const $e=class{constructor(e){if(A(this,"name"),A(this,"fullPath"),A(this,"isPresent"),A(this,"hasVerseSegments"),A(this,"isCustomized"),A(this,"baseVersification"),A(this,"scriptureBooks"),A(this,"_type"),e!=null)typeof e=="string"?this.name=e:this._type=e;else throw new Error("Argument null")}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};let le=$e;A(le,"Original",new $e(ke.Original)),A(le,"Septuagint",new $e(ke.Septuagint)),A(le,"Vulgate",new $e(ke.Vulgate)),A(le,"English",new $e(ke.English)),A(le,"RussianProtestant",new $e(ke.RussianProtestant)),A(le,"RussianOrthodox",new $e(ke.RussianOrthodox));function Qr(e,r){const t=r[0];for(let n=1;n<r.length;n++)e=e.split(r[n]).join(t);return e.split(t)}var Zt=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Zt||{});const R=class{constructor(e,r,t,n){if(A(this,"firstChapter"),A(this,"lastChapter"),A(this,"lastVerse"),A(this,"hasSegmentsDefined"),A(this,"text"),A(this,"BBBCCCVVVS"),A(this,"longHashCode"),A(this,"versification"),A(this,"rtlMark","‏"),A(this,"_bookNum",0),A(this,"_chapterNum",0),A(this,"_verseNum",0),A(this,"_verse"),t==null&&n==null)if(e!=null&&typeof e=="string"){const o=e,s=r!=null&&r instanceof le?r:void 0;this.setEmpty(s),this.parse(o)}else if(e!=null&&typeof e=="number"){const o=r!=null&&r instanceof le?r:void 0;this.setEmpty(o),this._verseNum=e%R.chapterDigitShifter,this._chapterNum=Math.floor(e%R.bookDigitShifter/R.chapterDigitShifter),this._bookNum=Math.floor(e/R.bookDigitShifter)}else if(r==null)if(e!=null&&e instanceof R){const o=e;this._bookNum=o.bookNum,this._chapterNum=o.chapterNum,this._verseNum=o.verseNum,this._verse=o.verse,this.versification=o.versification}else{if(e==null)return;const o=e instanceof le?e:R.defaultVersification;this.setEmpty(o)}else throw new Error("VerseRef constructor not supported.");else if(e!=null&&r!=null&&t!=null)if(typeof e=="string"&&typeof r=="string"&&typeof t=="string")this.setEmpty(n),this.updateInternal(e,r,t);else if(typeof e=="number"&&typeof r=="number"&&typeof t=="number")this._bookNum=e,this._chapterNum=r,this._verseNum=t,this.versification=n??R.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(e,r=R.defaultVersification){const t=new R(r);return t.parse(e),t}static isVerseParseable(e){return e.length>0&&"0123456789".includes(e[0])&&!e.endsWith(this.verseRangeSeparator)&&!e.endsWith(this.verseSequenceIndicator)}static tryParse(e){let r;try{return r=R.parse(e),{success:!0,verseRef:r}}catch(t){if(t instanceof We)return r=new R,{success:!1,verseRef:r};throw t}}static getBBBCCCVVV(e,r,t){return e%R.bcvMaxValue*R.bookDigitShifter+(r>=0?r%R.bcvMaxValue*R.chapterDigitShifter:0)+(t>=0?t%R.bcvMaxValue:0)}static tryGetVerseNum(e){let r;if(!e)return r=-1,{success:!0,vNum:r};r=0;let t;for(let n=0;n<e.length;n++){if(t=e[n],t<"0"||t>"9")return n===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +t-+"0",r>R.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(R.verseRangeSeparator)||this._verse.includes(R.verseSequenceIndicator))}get book(){return Se.bookNumberToId(this.bookNum,"")}set book(e){this.bookNum=Se.bookIdToNumber(e)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(e){const r=+e;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(e){const{success:r,vNum:t}=R.tryGetVerseNum(e);this._verse=r?void 0:e.replace(this.rtlMark,""),this._verseNum=t,!(this._verseNum>=0)&&({vNum:this._verseNum}=R.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(e){if(e<=0||e>Se.lastBook)throw new We("BookNum must be greater than zero and less than or equal to last book");this._bookNum=e}get chapterNum(){return this._chapterNum}set chapterNum(e){this.chapterNum=e}get verseNum(){return this._verseNum}set verseNum(e){this._verseNum=e}get versificationStr(){var e;return(e=this.versification)==null?void 0:e.name}set versificationStr(e){this.versification=this.versification!=null?new le(e):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(R.verseRangeSeparators,R.verseSequenceIndicators)}get BBBCCC(){return R.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return R.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(e){if(e=e.replace(this.rtlMark,""),e.includes("/")){const o=e.split("/");if(e=o[0],o.length>1)try{const s=+o[1].trim();this.versification=new le(ke[s])}catch{throw new We("Invalid reference : "+e)}}const r=e.trim().split(" ");if(r.length!==2)throw new We("Invalid reference : "+e);const t=r[1].split(":"),n=+t[0];if(t.length!==2||Se.bookIdToNumber(r[0])===0||!Number.isInteger(n)||n<0||!R.isVerseParseable(t[1]))throw new We("Invalid reference : "+e);this.updateInternal(r[0],t[0],t[1])}simplify(){this._verse=void 0}clone(){return new R(this)}toString(){const e=this.book;return e===""?"":`${e} ${this.chapter}:${this.verse}`}equals(e){return e._bookNum===this._bookNum&&e._chapterNum===this._chapterNum&&e._verseNum===this._verseNum&&e._verse===this._verse&&e.versification!=null&&this.versification!=null&&e.versification.equals(this.versification)}allVerses(e=!1,r=R.verseRangeSeparators,t=R.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const n=[],o=Qr(this._verse,t);for(const s of o.map(a=>Qr(a,r))){const a=this.clone();a.verse=s[0];const l=a.verseNum;if(n.push(a),s.length>1){const u=this.clone();if(u.verse=s[1],!e)for(let i=l+1;i<u.verseNum;i++){const c=new R(this._bookNum,this._chapterNum,i,this.versification);this.isExcluded||n.push(c)}n.push(u)}}return n}validateVerse(e,r){if(!this.verse)return this.internalValid;let t=0;for(const n of this.allVerses(!0,e,r)){const o=n.internalValid;if(o!==0)return o;const s=n.BBBCCCVVV;if(t>s)return 3;if(t===s)return 4;t=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>Se.lastBook?2:0}setEmpty(e=R.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=e}updateInternal(e,r,t){this.bookNum=Se.bookIdToNumber(e),this.chapter=r,this.verse=t}};let ye=R;A(ye,"defaultVersification",le.English),A(ye,"verseRangeSeparator","-"),A(ye,"verseSequenceIndicator",","),A(ye,"verseRangeSeparators",[R.verseRangeSeparator]),A(ye,"verseSequenceIndicators",[R.verseSequenceIndicator]),A(ye,"chapterDigitShifter",1e3),A(ye,"bookDigitShifter",R.chapterDigitShifter*R.chapterDigitShifter),A(ye,"bcvMaxValue",R.chapterDigitShifter-1),A(ye,"ValidStatusType",Zt);class We extends Error{}const Qt=[{shortName:"ERR",fullNames:["ERROR"],chapters:-1},{shortName:"GEN",fullNames:["Genesis"],chapters:50},{shortName:"EXO",fullNames:["Exodus"],chapters:40},{shortName:"LEV",fullNames:["Leviticus"],chapters:27},{shortName:"NUM",fullNames:["Numbers"],chapters:36},{shortName:"DEU",fullNames:["Deuteronomy"],chapters:34},{shortName:"JOS",fullNames:["Joshua"],chapters:24},{shortName:"JDG",fullNames:["Judges"],chapters:21},{shortName:"RUT",fullNames:["Ruth"],chapters:4},{shortName:"1SA",fullNames:["1 Samuel"],chapters:31},{shortName:"2SA",fullNames:["2 Samuel"],chapters:24},{shortName:"1KI",fullNames:["1 Kings"],chapters:22},{shortName:"2KI",fullNames:["2 Kings"],chapters:25},{shortName:"1CH",fullNames:["1 Chronicles"],chapters:29},{shortName:"2CH",fullNames:["2 Chronicles"],chapters:36},{shortName:"EZR",fullNames:["Ezra"],chapters:10},{shortName:"NEH",fullNames:["Nehemiah"],chapters:13},{shortName:"EST",fullNames:["Esther"],chapters:10},{shortName:"JOB",fullNames:["Job"],chapters:42},{shortName:"PSA",fullNames:["Psalm","Psalms"],chapters:150},{shortName:"PRO",fullNames:["Proverbs"],chapters:31},{shortName:"ECC",fullNames:["Ecclesiastes"],chapters:12},{shortName:"SNG",fullNames:["Song of Solomon","Song of Songs"],chapters:8},{shortName:"ISA",fullNames:["Isaiah"],chapters:66},{shortName:"JER",fullNames:["Jeremiah"],chapters:52},{shortName:"LAM",fullNames:["Lamentations"],chapters:5},{shortName:"EZK",fullNames:["Ezekiel"],chapters:48},{shortName:"DAN",fullNames:["Daniel"],chapters:12},{shortName:"HOS",fullNames:["Hosea"],chapters:14},{shortName:"JOL",fullNames:["Joel"],chapters:3},{shortName:"AMO",fullNames:["Amos"],chapters:9},{shortName:"OBA",fullNames:["Obadiah"],chapters:1},{shortName:"JON",fullNames:["Jonah"],chapters:4},{shortName:"MIC",fullNames:["Micah"],chapters:7},{shortName:"NAM",fullNames:["Nahum"],chapters:3},{shortName:"HAB",fullNames:["Habakkuk"],chapters:3},{shortName:"ZEP",fullNames:["Zephaniah"],chapters:3},{shortName:"HAG",fullNames:["Haggai"],chapters:2},{shortName:"ZEC",fullNames:["Zechariah"],chapters:14},{shortName:"MAL",fullNames:["Malachi"],chapters:4},{shortName:"MAT",fullNames:["Matthew"],chapters:28},{shortName:"MRK",fullNames:["Mark"],chapters:16},{shortName:"LUK",fullNames:["Luke"],chapters:24},{shortName:"JHN",fullNames:["John"],chapters:21},{shortName:"ACT",fullNames:["Acts"],chapters:28},{shortName:"ROM",fullNames:["Romans"],chapters:16},{shortName:"1CO",fullNames:["1 Corinthians"],chapters:16},{shortName:"2CO",fullNames:["2 Corinthians"],chapters:13},{shortName:"GAL",fullNames:["Galatians"],chapters:6},{shortName:"EPH",fullNames:["Ephesians"],chapters:6},{shortName:"PHP",fullNames:["Philippians"],chapters:4},{shortName:"COL",fullNames:["Colossians"],chapters:4},{shortName:"1TH",fullNames:["1 Thessalonians"],chapters:5},{shortName:"2TH",fullNames:["2 Thessalonians"],chapters:3},{shortName:"1TI",fullNames:["1 Timothy"],chapters:6},{shortName:"2TI",fullNames:["2 Timothy"],chapters:4},{shortName:"TIT",fullNames:["Titus"],chapters:3},{shortName:"PHM",fullNames:["Philemon"],chapters:1},{shortName:"HEB",fullNames:["Hebrews"],chapters:13},{shortName:"JAS",fullNames:["James"],chapters:5},{shortName:"1PE",fullNames:["1 Peter"],chapters:5},{shortName:"2PE",fullNames:["2 Peter"],chapters:3},{shortName:"1JN",fullNames:["1 John"],chapters:5},{shortName:"2JN",fullNames:["2 John"],chapters:1},{shortName:"3JN",fullNames:["3 John"],chapters:1},{shortName:"JUD",fullNames:["Jude"],chapters:1},{shortName:"REV",fullNames:["Revelation"],chapters:22}];let xr;const Nr=()=>(xr||(xr=Se.allBookIds.map(e=>({bookId:e,label:Se.bookIdToEnglishName(e)}))),xr),en=1,Kn=Qt.length-1,rn=1,tn=1,nn=e=>{var r;return((r=Qt[e])==null?void 0:r.chapters)??-1},et=(e,r)=>({bookNum:Math.max(en,Math.min(e.bookNum+r,Kn)),chapterNum:1,verseNum:1}),rt=(e,r)=>({...e,chapterNum:Math.min(Math.max(rn,e.chapterNum+r),nn(e.bookNum)),verseNum:1}),tt=(e,r)=>({...e,verseNum:Math.max(tn,e.verseNum+r)});var Wn=Object.getOwnPropertyNames,Yn=Object.getOwnPropertySymbols,Zn=Object.prototype.hasOwnProperty;function nt(e,r){return function(t,n,o){return e(t,n,o)&&r(t,n,o)}}function ir(e){return function(r,t,n){if(!r||!t||typeof r!="object"||typeof t!="object")return e(r,t,n);var o=n.cache,s=o.get(r),a=o.get(t);if(s&&a)return s===t&&a===r;o.set(r,t),o.set(t,r);var l=e(r,t,n);return o.delete(r),o.delete(t),l}}function ot(e){return Wn(e).concat(Yn(e))}var on=Object.hasOwn||function(e,r){return Zn.call(e,r)};function Fe(e,r){return e||r?e===r:e===r||e!==e&&r!==r}var sn="_owner",st=Object.getOwnPropertyDescriptor,at=Object.keys;function Qn(e,r,t){var n=e.length;if(r.length!==n)return!1;for(;n-- >0;)if(!t.equals(e[n],r[n],n,n,e,r,t))return!1;return!0}function eo(e,r){return Fe(e.getTime(),r.getTime())}function it(e,r,t){if(e.size!==r.size)return!1;for(var n={},o=e.entries(),s=0,a,l;(a=o.next())&&!a.done;){for(var u=r.entries(),i=!1,c=0;(l=u.next())&&!l.done;){var d=a.value,f=d[0],b=d[1],y=l.value,h=y[0],p=y[1];!i&&!n[c]&&(i=t.equals(f,h,s,c,e,r,t)&&t.equals(b,p,f,h,e,r,t))&&(n[c]=!0),c++}if(!i)return!1;s++}return!0}function ro(e,r,t){var n=at(e),o=n.length;if(at(r).length!==o)return!1;for(var s;o-- >0;)if(s=n[o],s===sn&&(e.$$typeof||r.$$typeof)&&e.$$typeof!==r.$$typeof||!on(r,s)||!t.equals(e[s],r[s],s,s,e,r,t))return!1;return!0}function Ye(e,r,t){var n=ot(e),o=n.length;if(ot(r).length!==o)return!1;for(var s,a,l;o-- >0;)if(s=n[o],s===sn&&(e.$$typeof||r.$$typeof)&&e.$$typeof!==r.$$typeof||!on(r,s)||!t.equals(e[s],r[s],s,s,e,r,t)||(a=st(e,s),l=st(r,s),(a||l)&&(!a||!l||a.configurable!==l.configurable||a.enumerable!==l.enumerable||a.writable!==l.writable)))return!1;return!0}function to(e,r){return Fe(e.valueOf(),r.valueOf())}function no(e,r){return e.source===r.source&&e.flags===r.flags}function ct(e,r,t){if(e.size!==r.size)return!1;for(var n={},o=e.values(),s,a;(s=o.next())&&!s.done;){for(var l=r.values(),u=!1,i=0;(a=l.next())&&!a.done;)!u&&!n[i]&&(u=t.equals(s.value,a.value,s.value,a.value,e,r,t))&&(n[i]=!0),i++;if(!u)return!1}return!0}function oo(e,r){var t=e.length;if(r.length!==t)return!1;for(;t-- >0;)if(e[t]!==r[t])return!1;return!0}var so="[object Arguments]",ao="[object Boolean]",io="[object Date]",co="[object Map]",lo="[object Number]",uo="[object Object]",fo="[object RegExp]",po="[object Set]",ho="[object String]",mo=Array.isArray,lt=typeof ArrayBuffer=="function"&&ArrayBuffer.isView?ArrayBuffer.isView:null,ut=Object.assign,go=Object.prototype.toString.call.bind(Object.prototype.toString);function bo(e){var r=e.areArraysEqual,t=e.areDatesEqual,n=e.areMapsEqual,o=e.areObjectsEqual,s=e.arePrimitiveWrappersEqual,a=e.areRegExpsEqual,l=e.areSetsEqual,u=e.areTypedArraysEqual;return function(i,c,d){if(i===c)return!0;if(i==null||c==null||typeof i!="object"||typeof c!="object")return i!==i&&c!==c;var f=i.constructor;if(f!==c.constructor)return!1;if(f===Object)return o(i,c,d);if(mo(i))return r(i,c,d);if(lt!=null&&lt(i))return u(i,c,d);if(f===Date)return t(i,c,d);if(f===RegExp)return a(i,c,d);if(f===Map)return n(i,c,d);if(f===Set)return l(i,c,d);var b=go(i);return b===io?t(i,c,d):b===fo?a(i,c,d):b===co?n(i,c,d):b===po?l(i,c,d):b===uo?typeof i.then!="function"&&typeof c.then!="function"&&o(i,c,d):b===so?o(i,c,d):b===ao||b===lo||b===ho?s(i,c,d):!1}}function yo(e){var r=e.circular,t=e.createCustomConfig,n=e.strict,o={areArraysEqual:n?Ye:Qn,areDatesEqual:eo,areMapsEqual:n?nt(it,Ye):it,areObjectsEqual:n?Ye:ro,arePrimitiveWrappersEqual:to,areRegExpsEqual:no,areSetsEqual:n?nt(ct,Ye):ct,areTypedArraysEqual:n?Ye:oo};if(t&&(o=ut({},o,t(o))),r){var s=ir(o.areArraysEqual),a=ir(o.areMapsEqual),l=ir(o.areObjectsEqual),u=ir(o.areSetsEqual);o=ut({},o,{areArraysEqual:s,areMapsEqual:a,areObjectsEqual:l,areSetsEqual:u})}return o}function vo(e){return function(r,t,n,o,s,a,l){return e(r,t,l)}}function xo(e){var r=e.circular,t=e.comparator,n=e.createState,o=e.equals,s=e.strict;if(n)return function(l,u){var i=n(),c=i.cache,d=c===void 0?r?new WeakMap:void 0:c,f=i.meta;return t(l,u,{cache:d,equals:o,meta:f,strict:s})};if(r)return function(l,u){return t(l,u,{cache:new WeakMap,equals:o,meta:void 0,strict:s})};var a={cache:void 0,equals:o,meta:void 0,strict:s};return function(l,u){return t(l,u,a)}}we();we({strict:!0});we({circular:!0});we({circular:!0,strict:!0});we({createInternalComparator:function(){return Fe}});we({strict:!0,createInternalComparator:function(){return Fe}});we({circular:!0,createInternalComparator:function(){return Fe}});we({circular:!0,createInternalComparator:function(){return Fe},strict:!0});function we(e){e===void 0&&(e={});var r=e.circular,t=r===void 0?!1:r,n=e.createInternalComparator,o=e.createState,s=e.strict,a=s===void 0?!1:s,l=yo(e),u=bo(l),i=n?n(u):vo(u);return xo({circular:t,comparator:u,createState:o,equals:i,strict:a})}function No(e,r="top"){if(!e||typeof document>"u")return;const t=document.head||document.querySelector("head"),n=t.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),r==="top"&&n?t.insertBefore(o,n):t.appendChild(o)}No("","top");function tr({variant:e="outlined",id:r,isDisabled:t=!1,hasError:n=!1,isFullWidth:o=!1,helperText:s,label:a,placeholder:l,isRequired:u=!1,className:i,defaultValue:c,value:d,onChange:f,onFocus:b,onBlur:y}){return E.jsx(Q.TextField,{variant:e,id:r,disabled:t,error:n,fullWidth:o,helperText:s,label:a,placeholder:l,required:u,className:`papi-textfield ${i??""}`,defaultValue:c,value:d,onChange:f,onFocus:b,onBlur:y})}function Eo({scrRef:e,handleSubmit:r,id:t}){const n=u=>{r(u)},o=(u,i)=>{const d={bookNum:_e.bookIdToNumber(i.bookId),chapterNum:1,verseNum:1};n(d)},s=u=>{r({...e,chapterNum:+u.target.value})},a=u=>{r({...e,verseNum:+u.target.value})},l=Y.useMemo(()=>Nr()[e.bookNum-1],[e.bookNum]);return E.jsxs("span",{id:t,children:[E.jsx(ur,{title:"Book",className:"papi-ref-selector book",value:l,options:Nr(),onChange:o,isClearable:!1,width:200}),E.jsx(Oe,{onClick:()=>n(et(e,-1)),isDisabled:e.bookNum<=en,children:"<"}),E.jsx(Oe,{onClick:()=>n(et(e,1)),isDisabled:e.bookNum>=Nr().length,children:">"}),E.jsx(tr,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:s}),E.jsx(Oe,{onClick:()=>r(rt(e,-1)),isDisabled:e.chapterNum<=rn,children:"<"}),E.jsx(Oe,{onClick:()=>r(rt(e,1)),isDisabled:e.chapterNum>=nn(e.bookNum),children:">"}),E.jsx(tr,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:a}),E.jsx(Oe,{onClick:()=>r(tt(e,-1)),isDisabled:e.verseNum<=tn,children:"<"}),E.jsx(Oe,{onClick:()=>r(tt(e,1)),children:">"})]})}function So({onSearch:e,placeholder:r,isFullWidth:t}){const[n,o]=Y.useState(""),s=a=>{o(a),e(a)};return E.jsx(Q.Paper,{component:"form",className:"search-bar-paper",children:E.jsx(tr,{isFullWidth:t,className:"search-bar-input",placeholder:r,value:n,onChange:a=>s(a.target.value)})})}function ko({id:e,isDisabled:r=!1,orientation:t="horizontal",min:n=0,max:o=100,step:s=1,showMarks:a=!1,defaultValue:l,value:u,valueLabelDisplay:i="off",className:c,onChange:d,onChangeCommitted:f}){return E.jsx(Q.Slider,{id:e,disabled:r,orientation:t,min:n,max:o,step:s,marks:a,defaultValue:l,value:u,valueLabelDisplay:i,className:`papi-slider ${t} ${c??""}`,onChange:d,onChangeCommitted:f})}function wo({autoHideDuration:e=void 0,id:r,isOpen:t=!1,className:n,onClose:o,anchorOrigin:s={vertical:"bottom",horizontal:"left"},ContentProps:a,children:l}){const u={action:(a==null?void 0:a.action)||l,message:a==null?void 0:a.message,className:n};return E.jsx(Q.Snackbar,{autoHideDuration:e??void 0,open:t,onClose:o,anchorOrigin:s,id:r,ContentProps:u})}function Co({id:e,isChecked:r,isDisabled:t=!1,hasError:n=!1,className:o,onChange:s}){return E.jsx(Q.Switch,{id:e,checked:r,disabled:t,className:`papi-switch ${n?"error":""} ${o??""}`,onChange:s})}function ft({onRowChange:e,row:r,column:t}){const n=o=>{e({...r,[t.key]:o.target.value})};return E.jsx(tr,{defaultValue:r[t.key],onChange:n})}const To=({onChange:e,disabled:r,checked:t,...n})=>{const o=s=>{e(s.target.checked,s.nativeEvent.shiftKey)};return E.jsx(Dt,{...n,isChecked:t,isDisabled:r,onChange:o})};function Oo({columns:e,sortColumns:r,onSortColumnsChange:t,onColumnResize:n,defaultColumnWidth:o,defaultColumnMinWidth:s,defaultColumnMaxWidth:a,defaultColumnSortable:l=!0,defaultColumnResizable:u=!0,rows:i,enableSelectColumn:c,selectColumnWidth:d=50,rowKeyGetter:f,rowHeight:b=35,headerRowHeight:y=35,selectedRows:h,onSelectedRowsChange:p,onRowsChange:S,onCellClick:Z,onCellDoubleClick:D,onCellContextMenu:P,onCellKeyDown:m,direction:ee="ltr",enableVirtualization:ae=!0,onCopy:de,onPaste:ue,onScroll:V,className:re,id:pe}){const he=Y.useMemo(()=>{const ne=e.map(W=>typeof W.editable=="function"?{...W,editable:fe=>!!W.editable(fe),renderEditCell:W.renderEditCell||ft}:W.editable&&!W.renderEditCell?{...W,renderEditCell:ft}:W.renderEditCell&&!W.editable?{...W,editable:!1}:W);return c?[{...Kr.SelectColumn,minWidth:d},...ne]:ne},[e,c,d]);return E.jsx(Kr,{columns:he,defaultColumnOptions:{width:o,minWidth:s,maxWidth:a,sortable:l,resizable:u},sortColumns:r,onSortColumnsChange:t,onColumnResize:n,rows:i,rowKeyGetter:f,rowHeight:b,headerRowHeight:y,selectedRows:h,onSelectedRowsChange:p,onRowsChange:S,onCellClick:Z,onCellDoubleClick:D,onCellContextMenu:P,onCellKeyDown:m,direction:ee,enableVirtualization:ae,onCopy:de,onPaste:ue,onScroll:V,renderers:{renderCheckbox:To},className:re??"rdg-light",id:pe})}function M(){return M=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},M.apply(this,arguments)}function qe(e){return e!==null&&typeof e=="object"&&e.constructor===Object}function an(e){if(!qe(e))return e;const r={};return Object.keys(e).forEach(t=>{r[t]=an(e[t])}),r}function ve(e,r,t={clone:!0}){const n=t.clone?M({},e):e;return qe(e)&&qe(r)&&Object.keys(r).forEach(o=>{o!=="__proto__"&&(qe(r[o])&&o in e&&qe(e[o])?n[o]=ve(e[o],r[o],t):t.clone?n[o]=qe(r[o])?an(r[o]):r[o]:n[o]=r[o])}),n}function _o(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var $r={exports:{}},cr={exports:{}},L={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dt;function Ro(){if(dt)return L;dt=1;var e=typeof Symbol=="function"&&Symbol.for,r=e?Symbol.for("react.element"):60103,t=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,u=e?Symbol.for("react.async_mode"):60111,i=e?Symbol.for("react.concurrent_mode"):60111,c=e?Symbol.for("react.forward_ref"):60112,d=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,p=e?Symbol.for("react.fundamental"):60117,S=e?Symbol.for("react.responder"):60118,Z=e?Symbol.for("react.scope"):60119;function D(m){if(typeof m=="object"&&m!==null){var ee=m.$$typeof;switch(ee){case r:switch(m=m.type,m){case u:case i:case n:case s:case o:case d:return m;default:switch(m=m&&m.$$typeof,m){case l:case c:case y:case b:case a:return m;default:return ee}}case t:return ee}}}function P(m){return D(m)===i}return L.AsyncMode=u,L.ConcurrentMode=i,L.ContextConsumer=l,L.ContextProvider=a,L.Element=r,L.ForwardRef=c,L.Fragment=n,L.Lazy=y,L.Memo=b,L.Portal=t,L.Profiler=s,L.StrictMode=o,L.Suspense=d,L.isAsyncMode=function(m){return P(m)||D(m)===u},L.isConcurrentMode=P,L.isContextConsumer=function(m){return D(m)===l},L.isContextProvider=function(m){return D(m)===a},L.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===r},L.isForwardRef=function(m){return D(m)===c},L.isFragment=function(m){return D(m)===n},L.isLazy=function(m){return D(m)===y},L.isMemo=function(m){return D(m)===b},L.isPortal=function(m){return D(m)===t},L.isProfiler=function(m){return D(m)===s},L.isStrictMode=function(m){return D(m)===o},L.isSuspense=function(m){return D(m)===d},L.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===n||m===i||m===s||m===o||m===d||m===f||typeof m=="object"&&m!==null&&(m.$$typeof===y||m.$$typeof===b||m.$$typeof===a||m.$$typeof===l||m.$$typeof===c||m.$$typeof===p||m.$$typeof===S||m.$$typeof===Z||m.$$typeof===h)},L.typeOf=D,L}var q={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pt;function $o(){return pt||(pt=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,r=e?Symbol.for("react.element"):60103,t=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,u=e?Symbol.for("react.async_mode"):60111,i=e?Symbol.for("react.concurrent_mode"):60111,c=e?Symbol.for("react.forward_ref"):60112,d=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,p=e?Symbol.for("react.fundamental"):60117,S=e?Symbol.for("react.responder"):60118,Z=e?Symbol.for("react.scope"):60119;function D(v){return typeof v=="string"||typeof v=="function"||v===n||v===i||v===s||v===o||v===d||v===f||typeof v=="object"&&v!==null&&(v.$$typeof===y||v.$$typeof===b||v.$$typeof===a||v.$$typeof===l||v.$$typeof===c||v.$$typeof===p||v.$$typeof===S||v.$$typeof===Z||v.$$typeof===h)}function P(v){if(typeof v=="object"&&v!==null){var ie=v.$$typeof;switch(ie){case r:var N=v.type;switch(N){case u:case i:case n:case s:case o:case d:return N;default:var Be=N&&N.$$typeof;switch(Be){case l:case c:case y:case b:case a:return Be;default:return ie}}case t:return ie}}}var m=u,ee=i,ae=l,de=a,ue=r,V=c,re=n,pe=y,he=b,ne=t,W=s,oe=o,fe=d,Te=!1;function Ie(v){return Te||(Te=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),g(v)||P(v)===u}function g(v){return P(v)===i}function x(v){return P(v)===l}function O(v){return P(v)===a}function C(v){return typeof v=="object"&&v!==null&&v.$$typeof===r}function k(v){return P(v)===c}function I(v){return P(v)===n}function w(v){return P(v)===y}function T(v){return P(v)===b}function B(v){return P(v)===t}function z(v){return P(v)===s}function j(v){return P(v)===o}function te(v){return P(v)===d}q.AsyncMode=m,q.ConcurrentMode=ee,q.ContextConsumer=ae,q.ContextProvider=de,q.Element=ue,q.ForwardRef=V,q.Fragment=re,q.Lazy=pe,q.Memo=he,q.Portal=ne,q.Profiler=W,q.StrictMode=oe,q.Suspense=fe,q.isAsyncMode=Ie,q.isConcurrentMode=g,q.isContextConsumer=x,q.isContextProvider=O,q.isElement=C,q.isForwardRef=k,q.isFragment=I,q.isLazy=w,q.isMemo=T,q.isPortal=B,q.isProfiler=z,q.isStrictMode=j,q.isSuspense=te,q.isValidElementType=D,q.typeOf=P}()),q}var ht;function cn(){return ht||(ht=1,process.env.NODE_ENV==="production"?cr.exports=Ro():cr.exports=$o()),cr.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Er,mt;function Ao(){if(mt)return Er;mt=1;var e=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable;function n(s){if(s==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(s)}function o(){try{if(!Object.assign)return!1;var s=new String("abc");if(s[5]="de",Object.getOwnPropertyNames(s)[0]==="5")return!1;for(var a={},l=0;l<10;l++)a["_"+String.fromCharCode(l)]=l;var u=Object.getOwnPropertyNames(a).map(function(c){return a[c]});if(u.join("")!=="0123456789")return!1;var i={};return"abcdefghijklmnopqrst".split("").forEach(function(c){i[c]=c}),Object.keys(Object.assign({},i)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Er=o()?Object.assign:function(s,a){for(var l,u=n(s),i,c=1;c<arguments.length;c++){l=Object(arguments[c]);for(var d in l)r.call(l,d)&&(u[d]=l[d]);if(e){i=e(l);for(var f=0;f<i.length;f++)t.call(l,i[f])&&(u[i[f]]=l[i[f]])}}return u},Er}var Sr,gt;function Vr(){if(gt)return Sr;gt=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Sr=e,Sr}var kr,bt;function ln(){return bt||(bt=1,kr=Function.call.bind(Object.prototype.hasOwnProperty)),kr}var wr,yt;function Po(){if(yt)return wr;yt=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var r=Vr(),t={},n=ln();e=function(s){var a="Warning: "+s;typeof console<"u"&&console.error(a);try{throw new Error(a)}catch{}}}function o(s,a,l,u,i){if(process.env.NODE_ENV!=="production"){for(var c in s)if(n(s,c)){var d;try{if(typeof s[c]!="function"){var f=Error((u||"React class")+": "+l+" type `"+c+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof s[c]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw f.name="Invariant Violation",f}d=s[c](a,c,u,l,null,r)}catch(y){d=y}if(d&&!(d instanceof Error)&&e((u||"React class")+": type specification of "+l+" `"+c+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof d+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),d instanceof Error&&!(d.message in t)){t[d.message]=!0;var b=i?i():"";e("Failed "+l+" type: "+d.message+(b??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(t={})},wr=o,wr}var Cr,vt;function Mo(){if(vt)return Cr;vt=1;var e=cn(),r=Ao(),t=Vr(),n=ln(),o=Po(),s=function(){};process.env.NODE_ENV!=="production"&&(s=function(l){var u="Warning: "+l;typeof console<"u"&&console.error(u);try{throw new Error(u)}catch{}});function a(){return null}return Cr=function(l,u){var i=typeof Symbol=="function"&&Symbol.iterator,c="@@iterator";function d(g){var x=g&&(i&&g[i]||g[c]);if(typeof x=="function")return x}var f="<<anonymous>>",b={array:S("array"),bigint:S("bigint"),bool:S("boolean"),func:S("function"),number:S("number"),object:S("object"),string:S("string"),symbol:S("symbol"),any:Z(),arrayOf:D,element:P(),elementType:m(),instanceOf:ee,node:V(),objectOf:de,oneOf:ae,oneOfType:ue,shape:pe,exact:he};function y(g,x){return g===x?g!==0||1/g===1/x:g!==g&&x!==x}function h(g,x){this.message=g,this.data=x&&typeof x=="object"?x:{},this.stack=""}h.prototype=Error.prototype;function p(g){if(process.env.NODE_ENV!=="production")var x={},O=0;function C(I,w,T,B,z,j,te){if(B=B||f,j=j||T,te!==t){if(u){var v=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw v.name="Invariant Violation",v}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var ie=B+":"+T;!x[ie]&&O<3&&(s("You are manually calling a React.PropTypes validation function for the `"+j+"` prop on `"+B+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),x[ie]=!0,O++)}}return w[T]==null?I?w[T]===null?new h("The "+z+" `"+j+"` is marked as required "+("in `"+B+"`, but its value is `null`.")):new h("The "+z+" `"+j+"` is marked as required in "+("`"+B+"`, but its value is `undefined`.")):null:g(w,T,B,z,j)}var k=C.bind(null,!1);return k.isRequired=C.bind(null,!0),k}function S(g){function x(O,C,k,I,w,T){var B=O[C],z=oe(B);if(z!==g){var j=fe(B);return new h("Invalid "+I+" `"+w+"` of type "+("`"+j+"` supplied to `"+k+"`, expected ")+("`"+g+"`."),{expectedType:g})}return null}return p(x)}function Z(){return p(a)}function D(g){function x(O,C,k,I,w){if(typeof g!="function")return new h("Property `"+w+"` of component `"+k+"` has invalid PropType notation inside arrayOf.");var T=O[C];if(!Array.isArray(T)){var B=oe(T);return new h("Invalid "+I+" `"+w+"` of type "+("`"+B+"` supplied to `"+k+"`, expected an array."))}for(var z=0;z<T.length;z++){var j=g(T,z,k,I,w+"["+z+"]",t);if(j instanceof Error)return j}return null}return p(x)}function P(){function g(x,O,C,k,I){var w=x[O];if(!l(w)){var T=oe(w);return new h("Invalid "+k+" `"+I+"` of type "+("`"+T+"` supplied to `"+C+"`, expected a single ReactElement."))}return null}return p(g)}function m(){function g(x,O,C,k,I){var w=x[O];if(!e.isValidElementType(w)){var T=oe(w);return new h("Invalid "+k+" `"+I+"` of type "+("`"+T+"` supplied to `"+C+"`, expected a single ReactElement type."))}return null}return p(g)}function ee(g){function x(O,C,k,I,w){if(!(O[C]instanceof g)){var T=g.name||f,B=Ie(O[C]);return new h("Invalid "+I+" `"+w+"` of type "+("`"+B+"` supplied to `"+k+"`, expected ")+("instance of `"+T+"`."))}return null}return p(x)}function ae(g){if(!Array.isArray(g))return process.env.NODE_ENV!=="production"&&(arguments.length>1?s("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):s("Invalid argument supplied to oneOf, expected an array.")),a;function x(O,C,k,I,w){for(var T=O[C],B=0;B<g.length;B++)if(y(T,g[B]))return null;var z=JSON.stringify(g,function(te,v){var ie=fe(v);return ie==="symbol"?String(v):v});return new h("Invalid "+I+" `"+w+"` of value `"+String(T)+"` "+("supplied to `"+k+"`, expected one of "+z+"."))}return p(x)}function de(g){function x(O,C,k,I,w){if(typeof g!="function")return new h("Property `"+w+"` of component `"+k+"` has invalid PropType notation inside objectOf.");var T=O[C],B=oe(T);if(B!=="object")return new h("Invalid "+I+" `"+w+"` of type "+("`"+B+"` supplied to `"+k+"`, expected an object."));for(var z in T)if(n(T,z)){var j=g(T,z,k,I,w+"."+z,t);if(j instanceof Error)return j}return null}return p(x)}function ue(g){if(!Array.isArray(g))return process.env.NODE_ENV!=="production"&&s("Invalid argument supplied to oneOfType, expected an instance of array."),a;for(var x=0;x<g.length;x++){var O=g[x];if(typeof O!="function")return s("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+Te(O)+" at index "+x+"."),a}function C(k,I,w,T,B){for(var z=[],j=0;j<g.length;j++){var te=g[j],v=te(k,I,w,T,B,t);if(v==null)return null;v.data&&n(v.data,"expectedType")&&z.push(v.data.expectedType)}var ie=z.length>0?", expected one of type ["+z.join(", ")+"]":"";return new h("Invalid "+T+" `"+B+"` supplied to "+("`"+w+"`"+ie+"."))}return p(C)}function V(){function g(x,O,C,k,I){return ne(x[O])?null:new h("Invalid "+k+" `"+I+"` supplied to "+("`"+C+"`, expected a ReactNode."))}return p(g)}function re(g,x,O,C,k){return new h((g||"React class")+": "+x+" type `"+O+"."+C+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+k+"`.")}function pe(g){function x(O,C,k,I,w){var T=O[C],B=oe(T);if(B!=="object")return new h("Invalid "+I+" `"+w+"` of type `"+B+"` "+("supplied to `"+k+"`, expected `object`."));for(var z in g){var j=g[z];if(typeof j!="function")return re(k,I,w,z,fe(j));var te=j(T,z,k,I,w+"."+z,t);if(te)return te}return null}return p(x)}function he(g){function x(O,C,k,I,w){var T=O[C],B=oe(T);if(B!=="object")return new h("Invalid "+I+" `"+w+"` of type `"+B+"` "+("supplied to `"+k+"`, expected `object`."));var z=r({},O[C],g);for(var j in z){var te=g[j];if(n(g,j)&&typeof te!="function")return re(k,I,w,j,fe(te));if(!te)return new h("Invalid "+I+" `"+w+"` key `"+j+"` supplied to `"+k+"`.\nBad object: "+JSON.stringify(O[C],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(g),null,"  "));var v=te(T,j,k,I,w+"."+j,t);if(v)return v}return null}return p(x)}function ne(g){switch(typeof g){case"number":case"string":case"undefined":return!0;case"boolean":return!g;case"object":if(Array.isArray(g))return g.every(ne);if(g===null||l(g))return!0;var x=d(g);if(x){var O=x.call(g),C;if(x!==g.entries){for(;!(C=O.next()).done;)if(!ne(C.value))return!1}else for(;!(C=O.next()).done;){var k=C.value;if(k&&!ne(k[1]))return!1}}else return!1;return!0;default:return!1}}function W(g,x){return g==="symbol"?!0:x?x["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&x instanceof Symbol:!1}function oe(g){var x=typeof g;return Array.isArray(g)?"array":g instanceof RegExp?"object":W(x,g)?"symbol":x}function fe(g){if(typeof g>"u"||g===null)return""+g;var x=oe(g);if(x==="object"){if(g instanceof Date)return"date";if(g instanceof RegExp)return"regexp"}return x}function Te(g){var x=fe(g);switch(x){case"array":case"object":return"an "+x;case"boolean":case"date":case"regexp":return"a "+x;default:return x}}function Ie(g){return!g.constructor||!g.constructor.name?f:g.constructor.name}return b.checkPropTypes=o,b.resetWarningCache=o.resetWarningCache,b.PropTypes=b,b},Cr}var Tr,xt;function Io(){if(xt)return Tr;xt=1;var e=Vr();function r(){}function t(){}return t.resetWarningCache=r,Tr=function(){function n(a,l,u,i,c,d){if(d!==e){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}}n.isRequired=n;function o(){return n}var s={array:n,bigint:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:o,element:n,elementType:n,instanceOf:o,node:n,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:t,resetWarningCache:r};return s.PropTypes=s,s},Tr}if(process.env.NODE_ENV!=="production"){var Bo=cn(),jo=!0;$r.exports=Mo()(Bo.isElement,jo)}else $r.exports=Io()();var Do=$r.exports;const G=_o(Do);function Je(e){let r="https://mui.com/production-error/?code="+e;for(let t=1;t<arguments.length;t+=1)r+="&args[]="+encodeURIComponent(arguments[t]);return"Minified MUI error #"+e+"; visit "+r+" for the full message."}var Ar={exports:{}},X={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Nt;function Vo(){if(Nt)return X;Nt=1;var e=Symbol.for("react.element"),r=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),u=Symbol.for("react.forward_ref"),i=Symbol.for("react.suspense"),c=Symbol.for("react.suspense_list"),d=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),y;y=Symbol.for("react.module.reference");function h(p){if(typeof p=="object"&&p!==null){var S=p.$$typeof;switch(S){case e:switch(p=p.type,p){case t:case o:case n:case i:case c:return p;default:switch(p=p&&p.$$typeof,p){case l:case a:case u:case f:case d:case s:return p;default:return S}}case r:return S}}}return X.ContextConsumer=a,X.ContextProvider=s,X.Element=e,X.ForwardRef=u,X.Fragment=t,X.Lazy=f,X.Memo=d,X.Portal=r,X.Profiler=o,X.StrictMode=n,X.Suspense=i,X.SuspenseList=c,X.isAsyncMode=function(){return!1},X.isConcurrentMode=function(){return!1},X.isContextConsumer=function(p){return h(p)===a},X.isContextProvider=function(p){return h(p)===s},X.isElement=function(p){return typeof p=="object"&&p!==null&&p.$$typeof===e},X.isForwardRef=function(p){return h(p)===u},X.isFragment=function(p){return h(p)===t},X.isLazy=function(p){return h(p)===f},X.isMemo=function(p){return h(p)===d},X.isPortal=function(p){return h(p)===r},X.isProfiler=function(p){return h(p)===o},X.isStrictMode=function(p){return h(p)===n},X.isSuspense=function(p){return h(p)===i},X.isSuspenseList=function(p){return h(p)===c},X.isValidElementType=function(p){return typeof p=="string"||typeof p=="function"||p===t||p===o||p===n||p===i||p===c||p===b||typeof p=="object"&&p!==null&&(p.$$typeof===f||p.$$typeof===d||p.$$typeof===s||p.$$typeof===a||p.$$typeof===u||p.$$typeof===y||p.getModuleId!==void 0)},X.typeOf=h,X}var J={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Et;function zo(){return Et||(Et=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),r=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),u=Symbol.for("react.forward_ref"),i=Symbol.for("react.suspense"),c=Symbol.for("react.suspense_list"),d=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),y=!1,h=!1,p=!1,S=!1,Z=!1,D;D=Symbol.for("react.module.reference");function P(N){return!!(typeof N=="string"||typeof N=="function"||N===t||N===o||Z||N===n||N===i||N===c||S||N===b||y||h||p||typeof N=="object"&&N!==null&&(N.$$typeof===f||N.$$typeof===d||N.$$typeof===s||N.$$typeof===a||N.$$typeof===u||N.$$typeof===D||N.getModuleId!==void 0))}function m(N){if(typeof N=="object"&&N!==null){var Be=N.$$typeof;switch(Be){case e:var ar=N.type;switch(ar){case t:case o:case n:case i:case c:return ar;default:var Fr=ar&&ar.$$typeof;switch(Fr){case l:case a:case u:case f:case d:case s:return Fr;default:return Be}}case r:return Be}}}var ee=a,ae=s,de=e,ue=u,V=t,re=f,pe=d,he=r,ne=o,W=n,oe=i,fe=c,Te=!1,Ie=!1;function g(N){return Te||(Te=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function x(N){return Ie||(Ie=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function O(N){return m(N)===a}function C(N){return m(N)===s}function k(N){return typeof N=="object"&&N!==null&&N.$$typeof===e}function I(N){return m(N)===u}function w(N){return m(N)===t}function T(N){return m(N)===f}function B(N){return m(N)===d}function z(N){return m(N)===r}function j(N){return m(N)===o}function te(N){return m(N)===n}function v(N){return m(N)===i}function ie(N){return m(N)===c}J.ContextConsumer=ee,J.ContextProvider=ae,J.Element=de,J.ForwardRef=ue,J.Fragment=V,J.Lazy=re,J.Memo=pe,J.Portal=he,J.Profiler=ne,J.StrictMode=W,J.Suspense=oe,J.SuspenseList=fe,J.isAsyncMode=g,J.isConcurrentMode=x,J.isContextConsumer=O,J.isContextProvider=C,J.isElement=k,J.isForwardRef=I,J.isFragment=w,J.isLazy=T,J.isMemo=B,J.isPortal=z,J.isProfiler=j,J.isStrictMode=te,J.isSuspense=v,J.isSuspenseList=ie,J.isValidElementType=P,J.typeOf=m}()),J}process.env.NODE_ENV==="production"?Ar.exports=Vo():Ar.exports=zo();var St=Ar.exports;const Lo=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function qo(e){const r=`${e}`.match(Lo);return r&&r[1]||""}function un(e,r=""){return e.displayName||e.name||qo(e)||r}function kt(e,r,t){const n=un(r);return e.displayName||(n!==""?`${t}(${n})`:t)}function Xo(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return un(e,"Component");if(typeof e=="object")switch(e.$$typeof){case St.ForwardRef:return kt(e,e.render,"ForwardRef");case St.Memo:return kt(e,e.type,"memo");default:return}}}function ge(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Je(7));return e.charAt(0).toUpperCase()+e.slice(1)}function fn(e,r){const t=M({},r);return Object.keys(e).forEach(n=>{if(n.toString().match(/^(components|slots)$/))t[n]=M({},e[n],t[n]);else if(n.toString().match(/^(componentsProps|slotProps)$/)){const o=e[n]||{},s=r[n];t[n]={},!s||!Object.keys(s)?t[n]=o:!o||!Object.keys(o)?t[n]=s:(t[n]=M({},s),Object.keys(o).forEach(a=>{t[n][a]=fn(o[a],s[a])}))}else t[n]===void 0&&(t[n]=e[n])}),t}function Jo(e,r,t=void 0){const n={};return Object.keys(e).forEach(o=>{n[o]=e[o].reduce((s,a)=>{if(a){const l=r(a);l!==""&&s.push(l),t&&t[a]&&s.push(t[a])}return s},[]).join(" ")}),n}const wt=e=>e,Ho=()=>{let e=wt;return{configure(r){e=r},generate(r){return e(r)},reset(){e=wt}}},Go=Ho(),Uo=Go,Fo={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function zr(e,r,t="Mui"){const n=Fo[r];return n?`${t}-${n}`:`${Uo.generate(e)}-${r}`}function Ko(e,r,t="Mui"){const n={};return r.forEach(o=>{n[o]=zr(e,o,t)}),n}function Ne(e,r){if(e==null)return{};var t={},n=Object.keys(e),o,s;for(s=0;s<n.length;s++)o=n[s],!(r.indexOf(o)>=0)&&(t[o]=e[o]);return t}function dn(e){var r,t,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e))for(r=0;r<e.length;r++)e[r]&&(t=dn(e[r]))&&(n&&(n+=" "),n+=t);else for(r in e)e[r]&&(n&&(n+=" "),n+=r);return n}function Wo(){for(var e,r,t=0,n="";t<arguments.length;)(e=arguments[t++])&&(r=dn(e))&&(n&&(n+=" "),n+=r);return n}const Yo=["values","unit","step"],Zo=e=>{const r=Object.keys(e).map(t=>({key:t,val:e[t]}))||[];return r.sort((t,n)=>t.val-n.val),r.reduce((t,n)=>M({},t,{[n.key]:n.val}),{})};function Qo(e){const{values:r={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:t="px",step:n=5}=e,o=Ne(e,Yo),s=Zo(r),a=Object.keys(s);function l(f){return`@media (min-width:${typeof r[f]=="number"?r[f]:f}${t})`}function u(f){return`@media (max-width:${(typeof r[f]=="number"?r[f]:f)-n/100}${t})`}function i(f,b){const y=a.indexOf(b);return`@media (min-width:${typeof r[f]=="number"?r[f]:f}${t}) and (max-width:${(y!==-1&&typeof r[a[y]]=="number"?r[a[y]]:b)-n/100}${t})`}function c(f){return a.indexOf(f)+1<a.length?i(f,a[a.indexOf(f)+1]):l(f)}function d(f){const b=a.indexOf(f);return b===0?l(a[1]):b===a.length-1?u(a[b]):i(f,a[a.indexOf(f)+1]).replace("@media","@media not all and")}return M({keys:a,values:s,up:l,down:u,between:i,only:c,not:d,unit:t},o)}const es={borderRadius:4},rs=es,ts=process.env.NODE_ENV!=="production"?G.oneOfType([G.number,G.string,G.object,G.array]):{},Ce=ts;function er(e,r){return r?ve(e,r,{clone:!1}):e}const Lr={xs:0,sm:600,md:900,lg:1200,xl:1536},Ct={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Lr[e]}px)`};function xe(e,r,t){const n=e.theme||{};if(Array.isArray(r)){const s=n.breakpoints||Ct;return r.reduce((a,l,u)=>(a[s.up(s.keys[u])]=t(r[u]),a),{})}if(typeof r=="object"){const s=n.breakpoints||Ct;return Object.keys(r).reduce((a,l)=>{if(Object.keys(s.values||Lr).indexOf(l)!==-1){const u=s.up(l);a[u]=t(r[l],l)}else{const u=l;a[u]=r[u]}return a},{})}return t(r)}function ns(e={}){var r;return((r=e.keys)==null?void 0:r.reduce((n,o)=>{const s=e.up(o);return n[s]={},n},{}))||{}}function os(e,r){return e.reduce((t,n)=>{const o=t[n];return(!o||Object.keys(o).length===0)&&delete t[n],t},r)}function dr(e,r,t=!0){if(!r||typeof r!="string")return null;if(e&&e.vars&&t){const n=`vars.${r}`.split(".").reduce((o,s)=>o&&o[s]?o[s]:null,e);if(n!=null)return n}return r.split(".").reduce((n,o)=>n&&n[o]!=null?n[o]:null,e)}function fr(e,r,t,n=t){let o;return typeof e=="function"?o=e(t):Array.isArray(e)?o=e[t]||n:o=dr(e,t)||n,r&&(o=r(o,n,e)),o}function H(e){const{prop:r,cssProperty:t=e.prop,themeKey:n,transform:o}=e,s=a=>{if(a[r]==null)return null;const l=a[r],u=a.theme,i=dr(u,n)||{};return xe(a,l,d=>{let f=fr(i,o,d);return d===f&&typeof d=="string"&&(f=fr(i,o,`${r}${d==="default"?"":ge(d)}`,d)),t===!1?f:{[t]:f}})};return s.propTypes=process.env.NODE_ENV!=="production"?{[r]:Ce}:{},s.filterProps=[r],s}function ss(e){const r={};return t=>(r[t]===void 0&&(r[t]=e(t)),r[t])}const as={m:"margin",p:"padding"},is={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Tt={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},cs=ss(e=>{if(e.length>2)if(Tt[e])e=Tt[e];else return[e];const[r,t]=e.split(""),n=as[r],o=is[t]||"";return Array.isArray(o)?o.map(s=>n+s):[n+o]}),pr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],hr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],ls=[...pr,...hr];function or(e,r,t,n){var o;const s=(o=dr(e,r,!1))!=null?o:t;return typeof s=="number"?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&typeof a!="number"&&console.error(`MUI: Expected ${n} argument to be a number or a string, got ${a}.`),s*a):Array.isArray(s)?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&(Number.isInteger(a)?a>s.length-1&&console.error([`MUI: The value provided (${a}) overflows.`,`The supported values are: ${JSON.stringify(s)}.`,`${a} > ${s.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${r}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${r}\` as a number.`].join(`
`))),s[a]):typeof s=="function"?s:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${r}\` value (${s}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function pn(e){return or(e,"spacing",8,"spacing")}function sr(e,r){if(typeof r=="string"||r==null)return r;const t=Math.abs(r),n=e(t);return r>=0?n:typeof n=="number"?-n:`-${n}`}function us(e,r){return t=>e.reduce((n,o)=>(n[o]=sr(r,t),n),{})}function fs(e,r,t,n){if(r.indexOf(t)===-1)return null;const o=cs(t),s=us(o,n),a=e[t];return xe(e,a,s)}function hn(e,r){const t=pn(e.theme);return Object.keys(e).map(n=>fs(e,r,n,t)).reduce(er,{})}function F(e){return hn(e,pr)}F.propTypes=process.env.NODE_ENV!=="production"?pr.reduce((e,r)=>(e[r]=Ce,e),{}):{};F.filterProps=pr;function K(e){return hn(e,hr)}K.propTypes=process.env.NODE_ENV!=="production"?hr.reduce((e,r)=>(e[r]=Ce,e),{}):{};K.filterProps=hr;process.env.NODE_ENV!=="production"&&ls.reduce((e,r)=>(e[r]=Ce,e),{});function ds(e=8){if(e.mui)return e;const r=pn({spacing:e}),t=(...n)=>(process.env.NODE_ENV!=="production"&&(n.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)),(n.length===0?[1]:n).map(s=>{const a=r(s);return typeof a=="number"?`${a}px`:a}).join(" "));return t.mui=!0,t}function mr(...e){const r=e.reduce((n,o)=>(o.filterProps.forEach(s=>{n[s]=o}),n),{}),t=n=>Object.keys(n).reduce((o,s)=>r[s]?er(o,r[s](n)):o,{});return t.propTypes=process.env.NODE_ENV!=="production"?e.reduce((n,o)=>Object.assign(n,o.propTypes),{}):{},t.filterProps=e.reduce((n,o)=>n.concat(o.filterProps),[]),t}function me(e){return typeof e!="number"?e:`${e}px solid`}const ps=H({prop:"border",themeKey:"borders",transform:me}),hs=H({prop:"borderTop",themeKey:"borders",transform:me}),ms=H({prop:"borderRight",themeKey:"borders",transform:me}),gs=H({prop:"borderBottom",themeKey:"borders",transform:me}),bs=H({prop:"borderLeft",themeKey:"borders",transform:me}),ys=H({prop:"borderColor",themeKey:"palette"}),vs=H({prop:"borderTopColor",themeKey:"palette"}),xs=H({prop:"borderRightColor",themeKey:"palette"}),Ns=H({prop:"borderBottomColor",themeKey:"palette"}),Es=H({prop:"borderLeftColor",themeKey:"palette"}),gr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const r=or(e.theme,"shape.borderRadius",4,"borderRadius"),t=n=>({borderRadius:sr(r,n)});return xe(e,e.borderRadius,t)}return null};gr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:Ce}:{};gr.filterProps=["borderRadius"];mr(ps,hs,ms,gs,bs,ys,vs,xs,Ns,Es,gr);const br=e=>{if(e.gap!==void 0&&e.gap!==null){const r=or(e.theme,"spacing",8,"gap"),t=n=>({gap:sr(r,n)});return xe(e,e.gap,t)}return null};br.propTypes=process.env.NODE_ENV!=="production"?{gap:Ce}:{};br.filterProps=["gap"];const yr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const r=or(e.theme,"spacing",8,"columnGap"),t=n=>({columnGap:sr(r,n)});return xe(e,e.columnGap,t)}return null};yr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:Ce}:{};yr.filterProps=["columnGap"];const vr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const r=or(e.theme,"spacing",8,"rowGap"),t=n=>({rowGap:sr(r,n)});return xe(e,e.rowGap,t)}return null};vr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:Ce}:{};vr.filterProps=["rowGap"];const Ss=H({prop:"gridColumn"}),ks=H({prop:"gridRow"}),ws=H({prop:"gridAutoFlow"}),Cs=H({prop:"gridAutoColumns"}),Ts=H({prop:"gridAutoRows"}),Os=H({prop:"gridTemplateColumns"}),_s=H({prop:"gridTemplateRows"}),Rs=H({prop:"gridTemplateAreas"}),$s=H({prop:"gridArea"});mr(br,yr,vr,Ss,ks,ws,Cs,Ts,Os,_s,Rs,$s);function Xe(e,r){return r==="grey"?r:e}const As=H({prop:"color",themeKey:"palette",transform:Xe}),Ps=H({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Xe}),Ms=H({prop:"backgroundColor",themeKey:"palette",transform:Xe});mr(As,Ps,Ms);function se(e){return e<=1&&e!==0?`${e*100}%`:e}const Is=H({prop:"width",transform:se}),qr=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const r=t=>{var n;return{maxWidth:((n=e.theme)==null||(n=n.breakpoints)==null||(n=n.values)==null?void 0:n[t])||Lr[t]||se(t)}};return xe(e,e.maxWidth,r)}return null};qr.filterProps=["maxWidth"];const Bs=H({prop:"minWidth",transform:se}),js=H({prop:"height",transform:se}),Ds=H({prop:"maxHeight",transform:se}),Vs=H({prop:"minHeight",transform:se});H({prop:"size",cssProperty:"width",transform:se});H({prop:"size",cssProperty:"height",transform:se});const zs=H({prop:"boxSizing"});mr(Is,qr,Bs,js,Ds,Vs,zs);const Ls={border:{themeKey:"borders",transform:me},borderTop:{themeKey:"borders",transform:me},borderRight:{themeKey:"borders",transform:me},borderBottom:{themeKey:"borders",transform:me},borderLeft:{themeKey:"borders",transform:me},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:gr},color:{themeKey:"palette",transform:Xe},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Xe},backgroundColor:{themeKey:"palette",transform:Xe},p:{style:K},pt:{style:K},pr:{style:K},pb:{style:K},pl:{style:K},px:{style:K},py:{style:K},padding:{style:K},paddingTop:{style:K},paddingRight:{style:K},paddingBottom:{style:K},paddingLeft:{style:K},paddingX:{style:K},paddingY:{style:K},paddingInline:{style:K},paddingInlineStart:{style:K},paddingInlineEnd:{style:K},paddingBlock:{style:K},paddingBlockStart:{style:K},paddingBlockEnd:{style:K},m:{style:F},mt:{style:F},mr:{style:F},mb:{style:F},ml:{style:F},mx:{style:F},my:{style:F},margin:{style:F},marginTop:{style:F},marginRight:{style:F},marginBottom:{style:F},marginLeft:{style:F},marginX:{style:F},marginY:{style:F},marginInline:{style:F},marginInlineStart:{style:F},marginInlineEnd:{style:F},marginBlock:{style:F},marginBlockStart:{style:F},marginBlockEnd:{style:F},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:br},rowGap:{style:vr},columnGap:{style:yr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:se},maxWidth:{style:qr},minWidth:{transform:se},height:{transform:se},maxHeight:{transform:se},minHeight:{transform:se},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Xr=Ls;function qs(...e){const r=e.reduce((n,o)=>n.concat(Object.keys(o)),[]),t=new Set(r);return e.every(n=>t.size===Object.keys(n).length)}function Xs(e,r){return typeof e=="function"?e(r):e}function Js(){function e(t,n,o,s){const a={[t]:n,theme:o},l=s[t];if(!l)return{[t]:n};const{cssProperty:u=t,themeKey:i,transform:c,style:d}=l;if(n==null)return null;if(i==="typography"&&n==="inherit")return{[t]:n};const f=dr(o,i)||{};return d?d(a):xe(a,n,y=>{let h=fr(f,c,y);return y===h&&typeof y=="string"&&(h=fr(f,c,`${t}${y==="default"?"":ge(y)}`,y)),u===!1?h:{[u]:h}})}function r(t){var n;const{sx:o,theme:s={}}=t||{};if(!o)return null;const a=(n=s.unstable_sxConfig)!=null?n:Xr;function l(u){let i=u;if(typeof u=="function")i=u(s);else if(typeof u!="object")return u;if(!i)return null;const c=ns(s.breakpoints),d=Object.keys(c);let f=c;return Object.keys(i).forEach(b=>{const y=Xs(i[b],s);if(y!=null)if(typeof y=="object")if(a[b])f=er(f,e(b,y,s,a));else{const h=xe({theme:s},y,p=>({[b]:p}));qs(h,y)?f[b]=r({sx:y,theme:s}):f=er(f,h)}else f=er(f,e(b,y,s,a))}),os(d,f)}return Array.isArray(o)?o.map(l):l(o)}return r}const mn=Js();mn.filterProps=["sx"];const Jr=mn,Hs=["breakpoints","palette","spacing","shape"];function Hr(e={},...r){const{breakpoints:t={},palette:n={},spacing:o,shape:s={}}=e,a=Ne(e,Hs),l=Qo(t),u=ds(o);let i=ve({breakpoints:l,direction:"ltr",components:{},palette:M({mode:"light"},n),spacing:u,shape:M({},rs,s)},a);return i=r.reduce((c,d)=>ve(c,d),i),i.unstable_sxConfig=M({},Xr,a==null?void 0:a.unstable_sxConfig),i.unstable_sx=function(d){return Jr({sx:d,theme:this})},i}function Gs(e){return Object.keys(e).length===0}function Us(e=null){const r=rr.useContext(Rr.ThemeContext);return!r||Gs(r)?e:r}const Fs=Hr();function Ks(e=Fs){return Us(e)}const Ws=["variant"];function Ot(e){return e.length===0}function gn(e){const{variant:r}=e,t=Ne(e,Ws);let n=r||"";return Object.keys(t).sort().forEach(o=>{o==="color"?n+=Ot(n)?e[o]:ge(e[o]):n+=`${Ot(n)?o:ge(o)}${ge(e[o].toString())}`}),n}const Ys=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Zs(e){return Object.keys(e).length===0}function Qs(e){return typeof e=="string"&&e.charCodeAt(0)>96}const ea=(e,r)=>r.components&&r.components[e]&&r.components[e].styleOverrides?r.components[e].styleOverrides:null,ra=(e,r)=>{let t=[];r&&r.components&&r.components[e]&&r.components[e].variants&&(t=r.components[e].variants);const n={};return t.forEach(o=>{const s=gn(o.props);n[s]=o.style}),n},ta=(e,r,t,n)=>{var o;const{ownerState:s={}}=e,a=[],l=t==null||(o=t.components)==null||(o=o[n])==null?void 0:o.variants;return l&&l.forEach(u=>{let i=!0;Object.keys(u.props).forEach(c=>{s[c]!==u.props[c]&&e[c]!==u.props[c]&&(i=!1)}),i&&a.push(r[gn(u.props)])}),a};function lr(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const na=Hr(),_t=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Ze({defaultTheme:e,theme:r,themeId:t}){return Zs(r)?e:r[t]||r}function oa(e){return e?(r,t)=>t[e]:null}function sa(e={}){const{themeId:r,defaultTheme:t=na,rootShouldForwardProp:n=lr,slotShouldForwardProp:o=lr}=e,s=a=>Jr(M({},a,{theme:Ze(M({},a,{defaultTheme:t,themeId:r}))}));return s.__mui_systemSx=!0,(a,l={})=>{Rr.internal_processStyles(a,P=>P.filter(m=>!(m!=null&&m.__mui_systemSx)));const{name:u,slot:i,skipVariantsResolver:c,skipSx:d,overridesResolver:f=oa(_t(i))}=l,b=Ne(l,Ys),y=c!==void 0?c:i&&i!=="Root"&&i!=="root"||!1,h=d||!1;let p;process.env.NODE_ENV!=="production"&&u&&(p=`${u}-${_t(i||"Root")}`);let S=lr;i==="Root"||i==="root"?S=n:i?S=o:Qs(a)&&(S=void 0);const Z=Rr(a,M({shouldForwardProp:S,label:p},b)),D=(P,...m)=>{const ee=m?m.map(V=>typeof V=="function"&&V.__emotion_real!==V?re=>V(M({},re,{theme:Ze(M({},re,{defaultTheme:t,themeId:r}))})):V):[];let ae=P;u&&f&&ee.push(V=>{const re=Ze(M({},V,{defaultTheme:t,themeId:r})),pe=ea(u,re);if(pe){const he={};return Object.entries(pe).forEach(([ne,W])=>{he[ne]=typeof W=="function"?W(M({},V,{theme:re})):W}),f(V,he)}return null}),u&&!y&&ee.push(V=>{const re=Ze(M({},V,{defaultTheme:t,themeId:r}));return ta(V,ra(u,re),re,u)}),h||ee.push(s);const de=ee.length-m.length;if(Array.isArray(P)&&de>0){const V=new Array(de).fill("");ae=[...P,...V],ae.raw=[...P.raw,...V]}else typeof P=="function"&&P.__emotion_real!==P&&(ae=V=>P(M({},V,{theme:Ze(M({},V,{defaultTheme:t,themeId:r}))})));const ue=Z(ae,...ee);if(process.env.NODE_ENV!=="production"){let V;u&&(V=`${u}${ge(i||"")}`),V===void 0&&(V=`Styled(${Xo(a)})`),ue.displayName=V}return a.muiName&&(ue.muiName=a.muiName),ue};return Z.withConfig&&(D.withConfig=Z.withConfig),D}}function aa(e){const{theme:r,name:t,props:n}=e;return!r||!r.components||!r.components[t]||!r.components[t].defaultProps?n:fn(r.components[t].defaultProps,n)}function ia({props:e,name:r,defaultTheme:t,themeId:n}){let o=Ks(t);return n&&(o=o[n]||o),aa({theme:o,name:r,props:e})}function bn(e,r=0,t=1){return process.env.NODE_ENV!=="production"&&(e<r||e>t)&&console.error(`MUI: The value provided ${e} is out of range [${r}, ${t}].`),Math.min(Math.max(r,e),t)}function ca(e){e=e.slice(1);const r=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let t=e.match(r);return t&&t[0].length===1&&(t=t.map(n=>n+n)),t?`rgb${t.length===4?"a":""}(${t.map((n,o)=>o<3?parseInt(n,16):Math.round(parseInt(n,16)/255*1e3)/1e3).join(", ")})`:""}function He(e){if(e.type)return e;if(e.charAt(0)==="#")return He(ca(e));const r=e.indexOf("("),t=e.substring(0,r);if(["rgb","rgba","hsl","hsla","color"].indexOf(t)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Je(9,e));let n=e.substring(r+1,e.length-1),o;if(t==="color"){if(n=n.split(" "),o=n.shift(),n.length===4&&n[3].charAt(0)==="/"&&(n[3]=n[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Je(10,o))}else n=n.split(",");return n=n.map(s=>parseFloat(s)),{type:t,values:n,colorSpace:o}}function Gr(e){const{type:r,colorSpace:t}=e;let{values:n}=e;return r.indexOf("rgb")!==-1?n=n.map((o,s)=>s<3?parseInt(o,10):o):r.indexOf("hsl")!==-1&&(n[1]=`${n[1]}%`,n[2]=`${n[2]}%`),r.indexOf("color")!==-1?n=`${t} ${n.join(" ")}`:n=`${n.join(", ")}`,`${r}(${n})`}function la(e){e=He(e);const{values:r}=e,t=r[0],n=r[1]/100,o=r[2]/100,s=n*Math.min(o,1-o),a=(i,c=(i+t/30)%12)=>o-s*Math.max(Math.min(c-3,9-c,1),-1);let l="rgb";const u=[Math.round(a(0)*255),Math.round(a(8)*255),Math.round(a(4)*255)];return e.type==="hsla"&&(l+="a",u.push(r[3])),Gr({type:l,values:u})}function Rt(e){e=He(e);let r=e.type==="hsl"||e.type==="hsla"?He(la(e)).values:e.values;return r=r.map(t=>(e.type!=="color"&&(t/=255),t<=.03928?t/12.92:((t+.055)/1.055)**2.4)),Number((.2126*r[0]+.7152*r[1]+.0722*r[2]).toFixed(3))}function $t(e,r){const t=Rt(e),n=Rt(r);return(Math.max(t,n)+.05)/(Math.min(t,n)+.05)}function ua(e,r){if(e=He(e),r=bn(r),e.type.indexOf("hsl")!==-1)e.values[2]*=1-r;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let t=0;t<3;t+=1)e.values[t]*=1-r;return Gr(e)}function fa(e,r){if(e=He(e),r=bn(r),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*r;else if(e.type.indexOf("rgb")!==-1)for(let t=0;t<3;t+=1)e.values[t]+=(255-e.values[t])*r;else if(e.type.indexOf("color")!==-1)for(let t=0;t<3;t+=1)e.values[t]+=(1-e.values[t])*r;return Gr(e)}function da(e,r){return M({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},r)}const pa={black:"#000",white:"#fff"},nr=pa,ha={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},ma=ha,ga={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},je=ga,ba={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},De=ba,ya={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Qe=ya,va={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ve=va,xa={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},ze=xa,Na={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Le=Na,Ea=["mode","contrastThreshold","tonalOffset"],At={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:nr.white,default:nr.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Or={text:{primary:nr.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:nr.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Pt(e,r,t,n){const o=n.light||n,s=n.dark||n*1.5;e[r]||(e.hasOwnProperty(t)?e[r]=e[t]:r==="light"?e.light=fa(e.main,o):r==="dark"&&(e.dark=ua(e.main,s)))}function Sa(e="light"){return e==="dark"?{main:Ve[200],light:Ve[50],dark:Ve[400]}:{main:Ve[700],light:Ve[400],dark:Ve[800]}}function ka(e="light"){return e==="dark"?{main:je[200],light:je[50],dark:je[400]}:{main:je[500],light:je[300],dark:je[700]}}function wa(e="light"){return e==="dark"?{main:De[500],light:De[300],dark:De[700]}:{main:De[700],light:De[400],dark:De[800]}}function Ca(e="light"){return e==="dark"?{main:ze[400],light:ze[300],dark:ze[700]}:{main:ze[700],light:ze[500],dark:ze[900]}}function Ta(e="light"){return e==="dark"?{main:Le[400],light:Le[300],dark:Le[700]}:{main:Le[800],light:Le[500],dark:Le[900]}}function Oa(e="light"){return e==="dark"?{main:Qe[400],light:Qe[300],dark:Qe[700]}:{main:"#ed6c02",light:Qe[500],dark:Qe[900]}}function _a(e){const{mode:r="light",contrastThreshold:t=3,tonalOffset:n=.2}=e,o=Ne(e,Ea),s=e.primary||Sa(r),a=e.secondary||ka(r),l=e.error||wa(r),u=e.info||Ca(r),i=e.success||Ta(r),c=e.warning||Oa(r);function d(h){const p=$t(h,Or.text.primary)>=t?Or.text.primary:At.text.primary;if(process.env.NODE_ENV!=="production"){const S=$t(h,p);S<3&&console.error([`MUI: The contrast ratio of ${S}:1 for ${p} on ${h}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return p}const f=({color:h,name:p,mainShade:S=500,lightShade:Z=300,darkShade:D=700})=>{if(h=M({},h),!h.main&&h[S]&&(h.main=h[S]),!h.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${p?` (${p})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${S}\` property.`:Je(11,p?` (${p})`:"",S));if(typeof h.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${p?` (${p})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Je(12,p?` (${p})`:"",JSON.stringify(h.main)));return Pt(h,"light",Z,n),Pt(h,"dark",D,n),h.contrastText||(h.contrastText=d(h.main)),h},b={dark:Or,light:At};return process.env.NODE_ENV!=="production"&&(b[r]||console.error(`MUI: The palette mode \`${r}\` is not supported.`)),ve(M({common:M({},nr),mode:r,primary:f({color:s,name:"primary"}),secondary:f({color:a,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:f({color:l,name:"error"}),warning:f({color:c,name:"warning"}),info:f({color:u,name:"info"}),success:f({color:i,name:"success"}),grey:ma,contrastThreshold:t,getContrastText:d,augmentColor:f,tonalOffset:n},b[r]),o)}const Ra=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function $a(e){return Math.round(e*1e5)/1e5}const Mt={textTransform:"uppercase"},It='"Roboto", "Helvetica", "Arial", sans-serif';function Aa(e,r){const t=typeof r=="function"?r(e):r,{fontFamily:n=It,fontSize:o=14,fontWeightLight:s=300,fontWeightRegular:a=400,fontWeightMedium:l=500,fontWeightBold:u=700,htmlFontSize:i=16,allVariants:c,pxToRem:d}=t,f=Ne(t,Ra);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof i!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const b=o/14,y=d||(S=>`${S/i*b}rem`),h=(S,Z,D,P,m)=>M({fontFamily:n,fontWeight:S,fontSize:y(Z),lineHeight:D},n===It?{letterSpacing:`${$a(P/Z)}em`}:{},m,c),p={h1:h(s,96,1.167,-1.5),h2:h(s,60,1.2,-.5),h3:h(a,48,1.167,0),h4:h(a,34,1.235,.25),h5:h(a,24,1.334,0),h6:h(l,20,1.6,.15),subtitle1:h(a,16,1.75,.15),subtitle2:h(l,14,1.57,.1),body1:h(a,16,1.5,.15),body2:h(a,14,1.43,.15),button:h(l,14,1.75,.4,Mt),caption:h(a,12,1.66,.4),overline:h(a,12,2.66,1,Mt),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return ve(M({htmlFontSize:i,pxToRem:y,fontFamily:n,fontSize:o,fontWeightLight:s,fontWeightRegular:a,fontWeightMedium:l,fontWeightBold:u},p),f,{clone:!1})}const Pa=.2,Ma=.14,Ia=.12;function U(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Pa})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Ma})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ia})`].join(",")}const Ba=["none",U(0,2,1,-1,0,1,1,0,0,1,3,0),U(0,3,1,-2,0,2,2,0,0,1,5,0),U(0,3,3,-2,0,3,4,0,0,1,8,0),U(0,2,4,-1,0,4,5,0,0,1,10,0),U(0,3,5,-1,0,5,8,0,0,1,14,0),U(0,3,5,-1,0,6,10,0,0,1,18,0),U(0,4,5,-2,0,7,10,1,0,2,16,1),U(0,5,5,-3,0,8,10,1,0,3,14,2),U(0,5,6,-3,0,9,12,1,0,3,16,2),U(0,6,6,-3,0,10,14,1,0,4,18,3),U(0,6,7,-4,0,11,15,1,0,4,20,3),U(0,7,8,-4,0,12,17,2,0,5,22,4),U(0,7,8,-4,0,13,19,2,0,5,24,4),U(0,7,9,-4,0,14,21,2,0,5,26,4),U(0,8,9,-5,0,15,22,2,0,6,28,5),U(0,8,10,-5,0,16,24,2,0,6,30,5),U(0,8,11,-5,0,17,26,2,0,6,32,5),U(0,9,11,-5,0,18,28,2,0,7,34,6),U(0,9,12,-6,0,19,29,2,0,7,36,6),U(0,10,13,-6,0,20,31,3,0,8,38,7),U(0,10,13,-6,0,21,33,3,0,8,40,7),U(0,10,14,-6,0,22,35,3,0,8,42,7),U(0,11,14,-7,0,23,36,3,0,9,44,8),U(0,11,15,-7,0,24,38,3,0,9,46,8)],ja=Ba,Da=["duration","easing","delay"],Va={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},za={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Bt(e){return`${Math.round(e)}ms`}function La(e){if(!e)return 0;const r=e/36;return Math.round((4+15*r**.25+r/5)*10)}function qa(e){const r=M({},Va,e.easing),t=M({},za,e.duration);return M({getAutoHeightDuration:La,create:(o=["all"],s={})=>{const{duration:a=t.standard,easing:l=r.easeInOut,delay:u=0}=s,i=Ne(s,Da);if(process.env.NODE_ENV!=="production"){const c=f=>typeof f=="string",d=f=>!isNaN(parseFloat(f));!c(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!d(a)&&!c(a)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`),c(l)||console.error('MUI: Argument "easing" must be a string.'),!d(u)&&!c(u)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof s!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(i).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(i).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(c=>`${c} ${typeof a=="string"?a:Bt(a)} ${l} ${typeof u=="string"?u:Bt(u)}`).join(",")}},e,{easing:r,duration:t})}const Xa={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Ja=Xa,Ha=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Ga(e={},...r){const{mixins:t={},palette:n={},transitions:o={},typography:s={}}=e,a=Ne(e,Ha);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Je(18));const l=_a(n),u=Hr(e);let i=ve(u,{mixins:da(u.breakpoints,t),palette:l,shadows:ja.slice(),typography:Aa(l,s),transitions:qa(o),zIndex:M({},Ja)});if(i=ve(i,a),i=r.reduce((c,d)=>ve(c,d),i),process.env.NODE_ENV!=="production"){const c=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],d=(f,b)=>{let y;for(y in f){const h=f[y];if(c.indexOf(y)!==-1&&Object.keys(h).length>0){if(process.env.NODE_ENV!=="production"){const p=zr("",y);console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${y}\` internal state.`,"You can not override it like this: ",JSON.stringify(f,null,2),"",`Instead, you need to use the '&.${p}' syntax:`,JSON.stringify({root:{[`&.${p}`]:h}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}f[y]={}}}};Object.keys(i.components).forEach(f=>{const b=i.components[f].styleOverrides;b&&f.indexOf("Mui")===0&&d(b,f)})}return i.unstable_sxConfig=M({},Xr,a==null?void 0:a.unstable_sxConfig),i.unstable_sx=function(d){return Jr({sx:d,theme:this})},i}const Ua=Ga(),yn=Ua,vn="$$material";function Fa({props:e,name:r}){return ia({props:e,name:r,defaultTheme:yn,themeId:vn})}const Ka=e=>lr(e)&&e!=="classes",Wa=sa({themeId:vn,defaultTheme:yn,rootShouldForwardProp:Ka}),Ya=Wa;function Za(e){return zr("MuiSvgIcon",e)}Ko("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Qa=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],ei=e=>{const{color:r,fontSize:t,classes:n}=e,o={root:["root",r!=="inherit"&&`color${ge(r)}`,`fontSize${ge(t)}`]};return Jo(o,Za,n)},ri=Ya("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.root,t.color!=="inherit"&&r[`color${ge(t.color)}`],r[`fontSize${ge(t.fontSize)}`]]}})(({theme:e,ownerState:r})=>{var t,n,o,s,a,l,u,i,c,d,f,b,y;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:r.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(t=e.transitions)==null||(n=t.create)==null?void 0:n.call(t,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((s=e.typography)==null||(a=s.pxToRem)==null?void 0:a.call(s,20))||"1.25rem",medium:((l=e.typography)==null||(u=l.pxToRem)==null?void 0:u.call(l,24))||"1.5rem",large:((i=e.typography)==null||(c=i.pxToRem)==null?void 0:c.call(i,35))||"2.1875rem"}[r.fontSize],color:(d=(f=(e.vars||e).palette)==null||(f=f[r.color])==null?void 0:f.main)!=null?d:{action:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.active,disabled:(y=(e.vars||e).palette)==null||(y=y.action)==null?void 0:y.disabled,inherit:void 0}[r.color]}}),Ur=rr.forwardRef(function(r,t){const n=Fa({props:r,name:"MuiSvgIcon"}),{children:o,className:s,color:a="inherit",component:l="svg",fontSize:u="medium",htmlColor:i,inheritViewBox:c=!1,titleAccess:d,viewBox:f="0 0 24 24"}=n,b=Ne(n,Qa),y=rr.isValidElement(o)&&o.type==="svg",h=M({},n,{color:a,component:l,fontSize:u,instanceFontSize:r.fontSize,inheritViewBox:c,viewBox:f,hasSvgAsChild:y}),p={};c||(p.viewBox=f);const S=ei(h);return E.jsxs(ri,M({as:l,className:Wo(S.root,s),focusable:"false",color:i,"aria-hidden":d?void 0:!0,role:d?"img":void 0,ref:t},p,b,y&&o.props,{ownerState:h,children:[y?o.props.children:o,d?E.jsx("title",{children:d}):null]}))});process.env.NODE_ENV!=="production"&&(Ur.propTypes={children:G.node,classes:G.object,className:G.string,color:G.oneOfType([G.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),G.string]),component:G.elementType,fontSize:G.oneOfType([G.oneOf(["inherit","large","medium","small"]),G.string]),htmlColor:G.string,inheritViewBox:G.bool,shapeRendering:G.string,sx:G.oneOfType([G.arrayOf(G.oneOfType([G.func,G.object,G.bool])),G.func,G.object]),titleAccess:G.string,viewBox:G.string});Ur.muiName="SvgIcon";const jt=Ur;function ti(e,r){function t(n,o){return E.jsx(jt,M({"data-testid":`${r}Icon`,ref:o},n,{children:e}))}return process.env.NODE_ENV!=="production"&&(t.displayName=`${r}Icon`),t.muiName=jt.muiName,rr.memo(rr.forwardRef(t))}const ni=ti(E.jsx("path",{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}),"Menu");function oi({menu:e,dataHandler:r,commandHandler:t,className:n,id:o,children:s}){const[a,l]=Y.useState(!1),[u,i]=Y.useState(!1),c=Y.useCallback(()=>{a&&l(!1),i(!1)},[a]),d=Y.useCallback(S=>{S.stopPropagation(),l(Z=>{const D=!Z;return D&&S.shiftKey?i(!0):D||i(!1),D})},[]),f=Y.useRef(null),[b,y]=Y.useState(0);Y.useEffect(()=>{a&&f.current&&y(f.current.clientHeight)},[a]);const h=Y.useCallback(S=>(c(),t(S)),[t,c]);let p=e;return!p&&r&&(p=r(u)),E.jsx("div",{ref:f,style:{position:"relative"},children:E.jsx(Q.AppBar,{position:"static",id:o,children:E.jsxs(Q.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[p?E.jsx(Q.IconButton,{edge:"start",className:`papi-menuButton ${n??""}`,color:"inherit","aria-label":"open drawer",onClick:d,children:E.jsx(ni,{})}):void 0,s?E.jsx("div",{className:"papi-menu-children",children:s}):void 0,p?E.jsx(Q.Drawer,{className:`papi-menu-drawer ${n??""}`,anchor:"left",variant:"persistent",open:a,onClose:c,PaperProps:{className:"papi-menu-drawer-paper",style:{top:b}},children:E.jsx(zt,{commandHandler:h,columns:p.columns})}):void 0]})})})}const si=(e,r)=>{Y.useEffect(()=>{if(!e)return()=>{};const t=e(r);return()=>{t()}},[e,r])};function ai(e){return{preserveValue:!0,...e}}const xn=(e,r,t={})=>{const n=Y.useRef(r);n.current=r;const o=Y.useRef(t);o.current=ai(o.current);const[s,a]=Y.useState(()=>n.current),[l,u]=Y.useState(!0);return Y.useEffect(()=>{let i=!0;return u(!!e),(async()=>{if(e){const c=await e();i&&(a(()=>c),u(!1))}})(),()=>{i=!1,o.current.preserveValue||a(()=>n.current)}},[e]),[s,l]},_r=()=>!1,ii=(e,r)=>{const[t]=xn(Y.useCallback(async()=>{if(!e)return _r;const n=await Promise.resolve(e(r));return async()=>n()},[r,e]),_r,{preserveValue:!1});Y.useEffect(()=>()=>{t!==_r&&t()},[t])};exports.Button=Oe;exports.ChapterRangeSelector=En;exports.Checkbox=Dt;exports.ComboBox=ur;exports.GridMenu=zt;exports.IconButton=kn;exports.LabelPosition=Ae;exports.MenuItem=Vt;exports.RefSelector=Eo;exports.SearchBar=So;exports.Slider=ko;exports.Snackbar=wo;exports.Switch=Co;exports.Table=Oo;exports.TextField=tr;exports.Toolbar=oi;exports.useEvent=si;exports.useEventAsync=ii;exports.usePromise=xn;function ci(e,r="top"){if(!e||typeof document>"u")return;const t=document.head||document.querySelector("head"),n=t.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),r==="top"&&n?t.insertBefore(o,n):t.appendChild(o)}ci(`.papi-combo-box {
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
//# sourceMappingURL=index.cjs.js.map
